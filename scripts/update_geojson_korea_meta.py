import json
from src_meta import get_korea_meta

def update_geojson_korea_meta():
    meta = get_korea_meta()
    print(f"Loaded metadata for {len(meta)} provinces.")

    files = [
        'public/data/korea_provinces.geojson',
        'public/data/world_historical_1938_unified.json',
        'dist/data/world_historical_1938_unified.json'
    ]

    for fpath in files:
        print(f"Updating {fpath}...")
        with open(fpath, 'r', encoding='utf-8') as f:
            data = json.load(f)

        updated_count = 0
        for feat in data['features']:
            p = feat.setdefault('properties', {})
            cid = feat.get('id') or p.get('id') or p.get('cartodb_id')
            if cid in meta:
                m = meta[cid]
                p['id'] = m['id']
                p['NUTS_ID'] = m['id']
                p['ORIG_ID'] = m['id']
                p['CNTR_CODE'] = m['cntrCode']
                p['CNTR_NAME'] = m['cntrName']
                p['ISO3_CODE'] = 'KOR' if m['cntrCode'] == 'KR' else 'PRK'
                p['SOVEREIGN'] = 'JAP'
                p['REGION_KIND'] = 'KOREA_PROVINCE'
                p['__layer'] = 'prov'
                p['name'] = m['name']
                p['NAME'] = m['historicalName']
                p['HISTORICAL_NAME'] = m['historicalName']
                p['HISTORICAL_NOTE'] = m['s0_1']
                p['NUTS_NAME'] = m['nutsName']
                p['NAME_LATN'] = m['nameLatn']
                p['NAME_ENGL'] = m['nameEngl']
                p['MODERN_NAME'] = m['modernName']
                p['ADMIN'] = m['adminTitle']
                updated_count += 1

        print(f"  Updated {updated_count} features in {fpath}")
        with open(fpath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False)
        print(f"  Saved {fpath}")

if __name__ == '__main__':
    update_geojson_korea_meta()
