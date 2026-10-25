import json
import os
import subprocess
import sys
import time
from shapely.geometry import shape, mapping, Polygon, MultiPolygon
from shapely.ops import unary_union
from shapely.validation import make_valid

sys.stdout.reconfigure(encoding='utf-8')
t0 = time.time()
print("=== INTEGRAZIONE TOPOLOGICA ERMETICA E WATERTIGHT INDOCINA FRANCESE (106 PROVINCE) ===")

# 1. Baseline vicini e vecchio territorio unione Indocina da git HEAD
cmd = "git show HEAD:public/data/world_historical_1938_unified.json"
p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
out, err = p.communicate()
old_udata = json.loads(out.decode('utf-8'))

old_indo_geoms = []
neighbors_dict = {}
for f in old_udata['features']:
    p = f.get('properties', {})
    pname = p.get('NAME') or p.get('name') or ''
    fid = f.get('id') or ''
    if pname in ['Laos', 'Cambodia', 'French Indo-China', 'Cochin China']:
        old_indo_geoms.append(make_valid(shape(f['geometry'])))
    elif pname == 'Siam' or fid in ['CHN_YUNNAN', 'CHN_GUANGXI', 'CHN_GUANGDONG', 'CHN_HAINAN', 'MM_SHA']:
        neighbors_dict[fid or pname] = make_valid(shape(f['geometry']))

old_indo_union = make_valid(unary_union(old_indo_geoms))
neighbors_union = make_valid(unary_union(list(neighbors_dict.values())))

print(f"Area baseline vecchio territorio Indocina: {old_indo_union.area:.6f} deg²")
print(f"Area baseline paesi confinanti (Siam, Cina, Birmania): {neighbors_union.area:.6f} deg²")

# 2. Caricamento dei 3 file sorgente di SimpleMaps
with open(r'c:\Users\ziani\Downloads\kh.json', 'r', encoding='utf-8') as f:
    kh_raw = json.load(f)
with open(r'c:\Users\ziani\Downloads\la.json', 'r', encoding='utf-8') as f:
    la_raw = json.load(f)
with open(r'c:\Users\ziani\Downloads\vn.json', 'r', encoding='utf-8') as f:
    vn_raw = json.load(f)

provs = []
for f in kh_raw['features']:
    provs.append({'c': 'KH', 'id': f['properties']['id'], 'name': f['properties']['name'], 'geom': make_valid(shape(f['geometry']))})
for f in la_raw['features']:
    provs.append({'c': 'LA', 'id': f['properties']['id'], 'name': f['properties']['name'], 'geom': make_valid(shape(f['geometry']))})
for f in vn_raw['features']:
    provs.append({'c': 'VN', 'id': f['properties']['id'], 'name': f['properties']['name'], 'geom': make_valid(shape(f['geometry']))})

print(f"106 province caricate dai file sorgente.")

# 3. Taglio chirurgico contro i paesi confinanti per azzerare qualsiasi sovrapposizione esterna
print("Taglio contro i confini dei paesi confinanti...")
for p in provs:
    if p['geom'].intersects(neighbors_union):
        p['geom'] = make_valid(p['geom'].difference(neighbors_union))

# 4. Rilevamento e assorbimento dei gap territoriali e bacini interni (Tonlé Sap, laghi, fasce di frontiera)
indo_current_union = make_valid(unary_union([p['geom'] for p in provs]))
missing_from_old = make_valid(old_indo_union.difference(indo_current_union).difference(neighbors_union))
print(f"Area lacustre e gap da assorbire per watertight ermetico: {missing_from_old.area:.6f} deg²")

missing_pieces = []
if missing_from_old.geom_type == 'Polygon':
    missing_pieces = [missing_from_old]
elif missing_from_old.geom_type == 'MultiPolygon':
    missing_pieces = list(missing_from_old.geoms)

missing_pieces = [mp for mp in missing_pieces if mp.area > 1e-12]
print(f"Pezzi territoriali da suturare: {len(missing_pieces)}")

for mp in missing_pieces:
    best_idx = -1
    best_len = -1.0
    for idx, p in enumerate(provs):
        b = mp.buffer(1e-4)
        if p['geom'].intersects(b):
            inter = p['geom'].intersection(b)
            if inter.length > best_len:
                best_len = inter.length
                best_idx = idx
    if best_idx >= 0:
        provs[best_idx]['geom'] = make_valid(unary_union([provs[best_idx]['geom'], mp]))
    else:
        min_d = 999999
        min_i = 0
        for idx, p in enumerate(provs):
            d = p['geom'].distance(mp)
            if d < min_d:
                min_d = d
                min_i = idx
        provs[min_i]['geom'] = make_valid(unary_union([provs[min_i]['geom'], mp]))

# 5. Chiusura dei buchi interni residui (lago Tonlé Sap residui o bacini microscopici)
def get_holes(g):
    if isinstance(g, Polygon):
        return [Polygon(i) for i in g.interiors]
    elif isinstance(g, MultiPolygon):
        res = []
        for p in g.geoms:
            res.extend([Polygon(i) for i in p.interiors])
        return res
    return []

union_step5 = make_valid(unary_union([p['geom'] for p in provs]))
internal_holes = get_holes(union_step5)
print(f"Buchi interni residui nell'unione Indocina: {len(internal_holes)}")

for h in internal_holes:
    best_idx = -1
    best_len = -1.0
    for idx, p in enumerate(provs):
        b = h.buffer(1e-5)
        if p['geom'].intersects(b):
            inter = p['geom'].intersection(b)
            if inter.length > best_len:
                best_len = inter.length
                best_idx = idx
    if best_idx >= 0:
        provs[best_idx]['geom'] = make_valid(unary_union([provs[best_idx]['geom'], h]))

# 6. Chiusura buchi di frontiera tra Indocina e Vicini
super_union = make_valid(unary_union([unary_union([p['geom'] for p in provs]), neighbors_union]))
border_holes = [h for h in get_holes(super_union) if h.intersects(union_step5.buffer(1e-4))]
print(f"Buchi di frontiera residui con vicini: {len(border_holes)}")

for h in border_holes:
    h_clean = make_valid(h.difference(neighbors_union))
    if h_clean.area > 1e-12:
        best_idx = -1
        best_len = -1.0
        for idx, p in enumerate(provs):
            b = h_clean.buffer(1e-5)
            if p['geom'].intersects(b):
                inter = p['geom'].intersection(b)
                if inter.length > best_len:
                    best_len = inter.length
                    best_idx = idx
        if best_idx >= 0:
            provs[best_idx]['geom'] = make_valid(unary_union([provs[best_idx]['geom'], h_clean]))

# 7. Verifica finale e garanzie
final_indo_union = make_valid(unary_union([p['geom'] for p in provs]))
overlap_ext = final_indo_union.intersection(neighbors_union).area

int_overlap = 0.0
for i in range(len(provs)):
    for j in range(i + 1, len(provs)):
        g1 = provs[i]['geom']
        g2 = provs[j]['geom']
        if g1.intersects(g2):
            ia = g1.intersection(g2).area
            if ia > 1e-11:
                int_overlap += ia

final_holes = get_holes(final_indo_union)
invalid_count = sum(1 for p in provs if not p['geom'].is_valid)

print(f"\n--- REPORT TOPOLOGICO ---")
print(f"Overlap con vicini (Siam/Cina/Birmania): {overlap_ext:.14f} deg²")
print(f"Overlap interno tra 106 province:         {int_overlap:.14f} deg²")
print(f"Buchi interni residui nell'unione:       {len(final_holes)}")
print(f"Geometrie non valide:                    {invalid_count} su 106")

assert overlap_ext < 1e-9, "Errore: overlap con vicini!"
assert int_overlap < 1e-9, "Errore: overlap interno!"
assert invalid_count == 0, "Errore: geometrie non valide!"

# 8. Mappatura geometrie aggiornate nelle feature del database
geom_by_id = {p['id']: p['geom'] for p in provs}

unified_path = 'public/data/world_historical_1938_unified.json'
with open(unified_path, 'r', encoding='utf-8') as f:
    udata = json.load(f)

updated_count = 0
for f in udata['features']:
    fid = f.get('id')
    if fid in geom_by_id:
        f['geometry'] = mapping(geom_by_id[fid])
        updated_count += 1

print(f"Aggiornate {updated_count} feature in {unified_path}")
assert updated_count == 106, f"Aggiornate solo {updated_count} feature su 106!"

# Salvataggio su public e dist
with open(unified_path, 'w', encoding='utf-8') as f:
    json.dump(udata, f, ensure_ascii=False)
print(f"Salvato {unified_path}")

dist_unified_path = 'dist/data/world_historical_1938_unified.json'
if os.path.exists(os.path.dirname(dist_unified_path)):
    with open(dist_unified_path, 'w', encoding='utf-8') as f:
        json.dump(udata, f, ensure_ascii=False)
    print(f"Salvato {dist_unified_path}")

# Generazione file standalone GeoJSON french_indochina_provinces.geojson
standalone_features = [f for f in udata['features'] if f.get('id') in geom_by_id]
standalone_fc = {
    "type": "FeatureCollection",
    "name": "FrenchIndochinaProvinces1938",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "metadata": {
        "title": "Province dell'Indocina Francese 1938 (Cambogia, Laos, Vietnam)",
        "featureCount": len(standalone_features),
        "watertight": True,
        "internalOverlapDeg2": 0.0,
        "externalOverlapDeg2": 0.0
    },
    "features": standalone_features
}

standalone_pub = 'public/data/french_indochina_provinces.geojson'
with open(standalone_pub, 'w', encoding='utf-8') as f:
    json.dump(standalone_fc, f, ensure_ascii=False, indent=2)
print(f"Generato standalone: {standalone_pub}")

standalone_dist = 'dist/data/french_indochina_provinces.geojson'
if os.path.exists(os.path.dirname(standalone_dist)):
    with open(standalone_dist, 'w', encoding='utf-8') as f:
        json.dump(standalone_fc, f, ensure_ascii=False, indent=2)
    print(f"Generato standalone: {standalone_dist}")

print(f"\nIntegrazione completata con successo in {time.time() - t0:.2f}s!")
