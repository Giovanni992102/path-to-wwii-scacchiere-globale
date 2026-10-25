# -*- coding: utf-8 -*-
"""
Script per sincronizzare i metadati toponomastici storici e moderni arricchiti
nei file GeoJSON:
1. public/data/world_historical_1938_unified.json
2. dist/data/world_historical_1938_unified.json
3. public/data/french_indochina_provinces.geojson
4. dist/data/french_indochina_provinces.geojson
"""

import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.abspath('.'))
sys.path.insert(0, os.path.abspath('scripts'))

try:
    from scripts.generate_french_indochina_module import PROVINCES_CONFIG
except ImportError:
    from generate_french_indochina_module import PROVINCES_CONFIG

cfg_by_id = {
    cfg[0]: {
        'id': cfg[0],
        'cntrCode': cfg[1],
        'cntrName': cfg[2],
        'rawName': cfg[3],
        'modernName': cfg[4],
        'historicalName': cfg[5],
        'historicalToponym': cfg[6],
        'capital': cfg[7],
        'subRegion': cfg[8],
        'specifics': cfg[9],
    }
    for cfg in PROVINCES_CONFIG
}

print(f"Caricate {len(cfg_by_id)} configurazioni per Indocina Francese.")

def sync_file(file_path):
    if not os.path.exists(file_path):
        print(f"File non trovato, salto: {file_path}")
        return
    
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    updated = 0
    for feat in data['features']:
        fid = feat.get('id') or feat.get('properties', {}).get('id')
        if fid in cfg_by_id:
            cfg = cfg_by_id[fid]
            p = feat.setdefault('properties', {})
            
            p['id'] = cfg['id']
            p['name'] = cfg['rawName']
            p['NAME'] = cfg['rawName']
            p['NAME_LATN'] = cfg['rawName']
            p['NAME_ENGL'] = f"{cfg['rawName']} ({cfg['cntrName']})"
            p['NUTS_NAME'] = cfg['modernName']
            p['MODERN_NAME'] = cfg['modernName']
            p['HISTORICAL_NAME'] = cfg['historicalName']
            p['HISTORICAL_TOPONYM'] = cfg['historicalToponym']
            p['CAPITAL'] = cfg['capital']
            p['SUBREGION'] = cfg['subRegion']
            p['CNTR_CODE'] = cfg['cntrCode']
            p['CNTR_NAME'] = cfg['cntrName']
            p['SOVEREIGN'] = 'F_IND'
            p['SOVEREIGNT'] = 'France'
            p['OVERLORD'] = 'FRA'
            p['REGION_KIND'] = 'INDOCHINA_PROVINCE'
            p['ADMIN'] = f"Union Indochinoise — {cfg['historicalName']}"
            p['ADMIN_TITLE'] = f"Union Indochinoise — {cfg['historicalName']}"
            p['HISTORICAL_NOTE'] = f"Protettorato/Colonia dell'Indocina Francese ({cfg['subRegion']} — Capoluogo {cfg['capital']}). {cfg['specifics']}"
            p['__layer'] = 'prov'
            
            updated += 1
            
    print(f"Aggiornate {updated} province in {file_path}")
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)

# Esegui sincronizzazione su tutti i file
sync_file('public/data/world_historical_1938_unified.json')
sync_file('dist/data/world_historical_1938_unified.json')
sync_file('public/data/french_indochina_provinces.geojson')
sync_file('dist/data/french_indochina_provinces.geojson')

print("Sincronizzazione completata con successo!")
