# -*- coding: utf-8 -*-
"""
Script per precalcolare i baricentri geospaziali (centroid) e il flag __sanitized
su tutte le feature del database geocartografico unificato.
Elimina la necessità di calcolare d3.geoCentroid e d3.geoArea a runtime sul client.
"""

import json
import time
import os
import sys
from shapely.geometry import shape

sys.stdout.reconfigure(encoding='utf-8')
t0 = time.time()
print("=== OTTIMIZZAZIONE E PRECALCOLO CENTROIDI DATABASE UNIFICATO ===")

for ppath in ['public/data/world_historical_1938_unified.json', 'dist/data/world_historical_1938_unified.json']:
    if not os.path.exists(ppath):
        continue
    with open(ppath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    count = 0
    for feat in data['features']:
        p = feat.setdefault('properties', {})
        if 'centroid' not in p or not p.get('__sanitized'):
            g = shape(feat['geometry'])
            c = g.centroid
            p['centroid'] = [round(c.x, 5), round(c.y, 5)]
            p['__sanitized'] = True
            count += 1
            
    with open(ppath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)
    print(f"Aggiornate {count} feature con baricentro geospaziale O(1) in {ppath}")

print(f"Completato in {time.time() - t0:.2f}s!")
