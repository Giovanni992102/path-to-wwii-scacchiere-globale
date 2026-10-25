import json
import os
from shapely.geometry import shape, mapping, Polygon, MultiPolygon
from shapely.ops import unary_union
from shapely.validation import make_valid

print("=== APPLICAZIONE RIPARAZIONE BUCHI NERI DI CONFINE SARAWAK - KALIMANTAN ===")

# 1. Carica il dataset unificato
unified_path = "public/data/world_historical_1938_unified.json"
with open(unified_path, "r", encoding="utf-8") as f:
    unified_data = json.load(f)

# 2. Carica il file originale my.json per recuperare i confini autentici di Sarawak
my_path = r"c:\Users\ziani\Downloads\my.json"
with open(my_path, "r", encoding="utf-8") as f:
    my_data = json.load(f)

raw_sarawak = make_valid(shape([f for f in my_data["features"] if f.get("id") == "MY13" or "Sarawak" in str(f.get("properties", {}))][0]["geometry"]))

# 3. Estrai le feature rilevanti di Borneo dal dataset unificato
current_sarawak = make_valid(shape([f for f in unified_data["features"] if (f.get("id") or f.get("properties", {}).get("id")) == "MY13"][0]["geometry"]))
current_sabah = make_valid(shape([f for f in unified_data["features"] if (f.get("id") or f.get("properties", {}).get("id")) == "MY12"][0]["geometry"]))
current_bru = make_valid(shape([f for f in unified_data["features"] if f.get("properties", {}).get("name") == "Brunei" or f.get("properties", {}).get("NAME") == "Brunei"][0]["geometry"]))

id_ids = ["IDKB", "IDKT", "IDKS", "IDKI", "IDKU"]
id_geoms = {fid: make_valid(shape([f for f in unified_data["features"] if (f.get("id") or f.get("properties", {}).get("id")) == fid][0]["geometry"])) for fid in id_ids}
id_union = make_valid(unary_union(list(id_geoms.values())))

print(f"Area Sarawak attuale: {current_sarawak.area:.6f} deg2")
print(f"Area Kalimantan totale: {id_union.area:.6f} deg2")

# 4. Fusione e allineamento ermetico: espansione di Sarawak fino al confine esatto con Kalimantan
sar = make_valid(unary_union([current_sarawak, raw_sarawak]))
sar = make_valid(sar.difference(id_union).difference(current_sabah).difference(current_bru))

# Calcolo buchi nell'unione totale di Borneo
tot = unary_union([sar, current_sabah, current_bru] + list(id_geoms.values()))

def get_holes(g):
    if isinstance(g, Polygon):
        return [Polygon(i) for i in g.interiors]
    elif isinstance(g, MultiPolygon):
        res = []
        for p in g.geoms:
            res.extend([Polygon(i) for i in p.interiors])
        return res
    return []

holes = get_holes(tot)
print(f"Buchi rilevati prima dell'assorbimento: {len(holes)} (area totale buchi = {sum(h.area for h in holes):.8f} deg2)")

sar_filled = make_valid(unary_union([sar] + holes))
sar_filled = make_valid(sar_filled.difference(id_union).difference(current_sabah).difference(current_bru))

# Se il risultato è un MultiPolygon, rimuovi micro-frammenti < 1e-10
if isinstance(sar_filled, MultiPolygon):
    valid_geoms = [g for g in sar_filled.geoms if g.area > 1e-10]
    sar_filled = make_valid(unary_union(valid_geoms))

# 5. Verifiche di integrità topologica
assert sar_filled.is_valid, "La geometria finale di Sarawak non e valida!"
ov_id = sar_filled.intersection(id_union).area
ov_sb = sar_filled.intersection(current_sabah).area
ov_br = sar_filled.intersection(current_bru).area

print(f"Area Sarawak dopo la riparazione: {sar_filled.area:.6f} deg2 (+{sar_filled.area - current_sarawak.area:.6f} deg2)")
print(f"Overlap con Kalimantan (IDKB/IDKT/IDKS/IDKI/IDKU): {ov_id:.14f} deg2")
print(f"Overlap con Sabah (MY12): {ov_sb:.14f} deg2")
print(f"Overlap con Brunei: {ov_br:.14f} deg2")

assert ov_id < 1e-12, f"Rilevata sovrapposizione con Kalimantan: {ov_id}"
assert ov_sb < 1e-12, f"Rilevata sovrapposizione con Sabah: {ov_sb}"
assert ov_br < 1e-12, f"Rilevata sovrapposizione con Brunei: {ov_br}"

# Verifica buchi visibili rimanenti
new_tot = unary_union([sar_filled, current_sabah, current_bru] + list(id_geoms.values()))
rem_visible_holes = [h for h in get_holes(new_tot) if h.area > 1e-8]
print(f"Buchi visibili rimanenti nel Borneo: {len(rem_visible_holes)}")
assert len(rem_visible_holes) == 0, f"Rilevati ancora {len(rem_visible_holes)} buchi visibili!"

# 6. Salvataggio nei file GeoJSON
target_files = [
    "public/data/world_historical_1938_unified.json",
    "dist/data/world_historical_1938_unified.json",
    "public/data/malaysia_singapore_provinces.geojson",
    "dist/data/malaysia_singapore_provinces.geojson"
]

sar_geojson = mapping(sar_filled)

for target in target_files:
    if not os.path.exists(target):
        print(f"File non trovato: {target}")
        continue
    with open(target, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    updated = False
    for feat in data.get("features", []):
        fid = str(feat.get("id") or feat.get("properties", {}).get("id") or "")
        name = str(feat.get("properties", {}).get("name") or feat.get("properties", {}).get("NAME") or "")
        if fid == "MY13" or name == "Sarawak":
            feat["geometry"] = sar_geojson
            updated = True
            break
            
    if updated:
        with open(target, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False)
        print(f"[OK] Aggiornato con successo: {target}")
    else:
        print(f"[WARN] Feature MY13 non trovata in: {target}")

print("=== RIPARAZIONE COMPLETATA CON SUCCESSO! ===")
