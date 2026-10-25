import json
import re

target_files = [
    "public/data/world_historical_1938_unified.json",
    "dist/data/world_historical_1938_unified.json",
    "public/data/papua_new_guinea_provinces.geojson",
    "dist/data/papua_new_guinea_provinces.geojson"
]

with open("src/data/papuaNewGuineaProvinces.ts", "r", encoding="utf-8") as f:
    ts_code = f.read()

# Match each province block: "PGXXX": { ... getFaction: ... }
prov_blocks = re.findall(r'"(PG[A-Z]{3})":\s*\{(.*?)\n\s*\},?', ts_code, re.DOTALL)
print(f"Estratti {len(prov_blocks)} blocchi provincia da papuaNewGuineaProvinces.ts")

meta_dict = {}
for pid, block in prov_blocks:
    d = {}
    for line in block.splitlines():
        line = line.strip()
        m = re.match(r'([a-zA-Z0-9_]+):\s*"([^"]*)"', line)
        if m:
            d[m.group(1)] = m.group(2)
        m_num = re.match(r'origId:\s*([0-9]+)', line)
        if m_num:
            d['origId'] = int(m_num.group(1))
    meta_dict[pid] = d

print(f"Mappati {len(meta_dict)} metadati (attesi 22)")
assert len(meta_dict) == 22, f"Attesi 22, trovati {len(meta_dict)}"

for filepath in target_files:
    print(f"Aggiornamento metadati in {filepath}...")
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    updated_count = 0
    for feat in data["features"]:
        fid = feat.get("id") or feat.get("properties", {}).get("id")
        if fid in meta_dict:
            m = meta_dict[fid]
            p = feat.setdefault("properties", {})
            p["id"] = fid
            p["name"] = m.get("name", p.get("name"))
            p["NAME"] = m.get("historicalName", p.get("NAME"))
            p["HISTORICAL_NAME"] = m.get("historicalName", p.get("HISTORICAL_NAME"))
            p["MODERN_NAME"] = m.get("modernName", p.get("MODERN_NAME"))
            p["NUTS_NAME"] = m.get("nutsName", p.get("NUTS_NAME"))
            p["NAME_LATN"] = m.get("nameLatn", p.get("NAME_LATN"))
            p["NAME_ENGL"] = m.get("nameEngl", p.get("NAME_ENGL"))
            p["ADMIN"] = m.get("adminTitle", p.get("ADMIN"))
            p["ADMIN_TITLE"] = m.get("adminTitle", p.get("ADMIN_TITLE"))
            p["SOVEREIGN"] = "AST"
            p["SOVEREIGNT"] = "Commonwealth of Australia"
            p["CNTR_CODE"] = "PG"
            p["CNTR_NAME"] = "Papua Nuova Guinea"
            p["ISO2"] = "PG"
            p["ISO3_CODE"] = "PNG"
            p["REGION_KIND"] = "PNG_PROVINCE"
            p["HISTORICAL_NOTE"] = m.get("s0_1", "")
            p["CAPITAL"] = m.get("capital", "")
            p["__layer"] = "prov"
            feat["id"] = fid
            updated_count += 1

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False)
    print(f"Aggiornate {updated_count} feature in {filepath}")

print("Tutti i 22 metadati sincronizzati con successo in tutti i file!")
