import json
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
from generate_malaysia_provinces_ts import provinces

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
            p["id"] = m["id"]
            p["NUTS_ID"] = m["id"]
            p["ORIG_ID"] = m["id"]
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
            p["SOVEREIGN"] = "UK"
            p["CNTR_CODE"] = "SG" if fid == "SG01" else "MY"
            p["CNTR_NAME"] = "Singapore" if fid == "SG01" else "Malesia"
            p["ISO3_CODE"] = "SGP" if fid == "SG01" else "MYS"
            p["REGION_KIND"] = "SINGAPORE_SETTLEMENT" if fid == "SG01" else ("MALAYSIA_FEDERAL_TERRITORY" if fid in ["MY14", "MY15", "MY16"] else "MALAYSIA_STATE")
            count += 1
            
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False)
    print(f"Updated {count} features in {path}")

sync_geojson("public/data/malaysia_singapore_provinces.geojson")
sync_geojson("public/data/world_historical_1938_unified.json")
sync_geojson("dist/data/world_historical_1938_unified.json")
print("All files synchronized successfully!")
