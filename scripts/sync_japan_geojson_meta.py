import json
import sys
import os

# Add scripts directory to path to import provinces
sys.path.insert(0, os.path.dirname(__file__))
from generate_japan_provinces_ts import provinces

meta_by_id = {p["id"]: p for p in provinces}
print(f"Loaded {len(meta_by_id)} province definitions.")

def sync_geojson(path):
    if not os.path.exists(path):
        print(f"Skipping non-existent path: {path}")
        return
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    count = 0
    for feat in data.get("features", []):
        p = feat.setdefault("properties", {})
        fid = str(feat.get("id") or p.get("id") or p.get("NUTS_ID") or "").strip()
        if fid in meta_by_id:
            m = meta_by_id[fid]
            p["name"] = m["name"]
            p["NAME"] = m["historicalName"]
            p["HISTORICAL_NAME"] = m["historicalName"]
            p["MODERN_NAME"] = m["modernName"]
            p["ADMIN"] = m["adminTitle"]
            p["ADMIN_TITLE"] = m["adminTitle"]
            p["NUTS_NAME"] = m["nutsName"]
            p["NAME_LATN"] = m["nameLatn"]
            p["NAME_ENGL"] = m["nameEngl"]
            p["HISTORICAL_NOTE"] = m["s0_1"]
            p["SOVEREIGN"] = "JAP"
            p["CNTR_CODE"] = "JP"
            p["CNTR_NAME"] = "Giappone"
            p["ISO3_CODE"] = "JPN"
            p["REGION_KIND"] = "JAPAN_TERRITORY" if fid in ["JP_KARAFUTO", "JP_CHISHIMA"] else "JAPAN_PREFECTURE"
            count += 1
            
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False)
    print(f"Updated {count} features in {path}")

sync_geojson("public/data/japan_provinces.geojson")
sync_geojson("public/data/world_historical_1938_unified.json")
sync_geojson("dist/data/world_historical_1938_unified.json")
print("All files synchronized successfully!")
