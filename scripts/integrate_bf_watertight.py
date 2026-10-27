import sys, os, json, time
import shapely
from shapely.geometry import shape, mapping, Polygon, MultiPolygon
from shapely.ops import unary_union
from shapely.validation import make_valid
from shapely.geometry.polygon import orient

def clean_geometry(geom):
    """Ensure geometry contains only valid Polygons/MultiPolygons and filter out micro-slivers."""
    if geom is None or geom.is_empty:
        return None
    geom = make_valid(geom)
    polys = []
    if geom.geom_type == 'Polygon':
        if geom.area > 1e-12:
            polys.append(geom)
    elif geom.geom_type == 'MultiPolygon':
        for p in geom.geoms:
            if p.area > 1e-12:
                polys.append(p)
    elif geom.geom_type == 'GeometryCollection':
        for g in geom.geoms:
            if g.geom_type == 'Polygon' and g.area > 1e-12:
                polys.append(g)
            elif g.geom_type == 'MultiPolygon':
                for p in g.geoms:
                    if p.area > 1e-12:
                        polys.append(p)
    if not polys:
        return None
    return polys[0] if len(polys) == 1 else MultiPolygon(polys)

def round_coords(coords, precision=6):
    if isinstance(coords[0], (int, float)):
        return [round(coords[0], precision), round(coords[1], precision)]
    return [round_coords(c, precision) for c in coords]

def ensure_d3_winding(geom):
    """Ensure exterior rings are CCW and interior rings are CW for D3 spherical rendering."""
    if geom.geom_type == 'Polygon':
        return orient(geom, sign=1.0)
    elif geom.geom_type == 'MultiPolygon':
        return MultiPolygon([orient(p, sign=1.0) for p in geom.geoms])
    return geom

def geom_to_geojson(geom, precision=6):
    geom = ensure_d3_winding(geom)
    m = mapping(geom)
    m['coordinates'] = round_coords(m['coordinates'], precision)
    return m

def main():
    print("=== STARTING WATERTIGHT INTEGRATION OF BURKINA FASO (HAUTE-VOLTA) ===", flush=True)
    t0 = time.time()

    unified_path = 'public/data/world_historical_1938_unified.json'
    with open(unified_path, 'r', encoding='utf-8') as f:
        unified_db = json.load(f)

    # 1. Locate current AOF features
    features = unified_db['features']
    aof_indices = {}
    for i, ft in enumerate(features):
        fid = ft.get('id')
        if fid in ['AOF_CI', 'AOF_GN', 'AOF_SN', 'AOF_MR', 'AOF_ML', 'AOF_BJ', 'AOF_NER_HV']:
            aof_indices[fid] = i

    print(f"Located AOF features in unified database: {aof_indices}")
    assert 'AOF_NER_HV' in aof_indices, "Missing AOF_NER_HV feature to split!"

    idx_ner_hv = aof_indices['AOF_NER_HV']
    g_ner_hv = clean_geometry(shape(features[idx_ner_hv]['geometry']))
    print(f"AOF_NER_HV area: {g_ner_hv.area:.6f}")

    # 2. Load Burkina Faso raw geometry from attached file
    bf_path = r'c:\Users\ziani\Downloads\bf.json'
    with open(bf_path, 'r', encoding='utf-8') as f:
        bf_data = json.load(f)
    g_bf_raw = clean_geometry(shape(bf_data['features'][0]['geometry']))
    print(f"Burkina Faso raw area: {g_bf_raw.area:.6f}")

    # 3. Partition g_ner_hv into g_bf and g_ner
    # g_bf is the exact intersection with g_ner_hv
    g_bf_cut = clean_geometry(g_ner_hv.intersection(g_bf_raw))
    g_ner_cut = clean_geometry(g_ner_hv.difference(g_bf_cut))

    # Separate major Niger polygon from micro-boundary slivers
    slivers = []
    major_ner = []
    if g_ner_cut.geom_type == 'MultiPolygon':
        for p in g_ner_cut.geoms:
            if p.area > 1.0:
                major_ner.append(p)
            else:
                slivers.append(p)
    else:
        major_ner = [g_ner_cut]

    assert len(major_ner) == 1, f"Expected 1 major Niger polygon, got {len(major_ner)}"
    g_ner_final = clean_geometry(major_ner[0])
    g_bf_final = clean_geometry(unary_union([g_bf_cut] + slivers))

    print(f"Resulting BF area: {g_bf_final.area:.6f}, geom_type: {g_bf_final.geom_type}")
    print(f"Resulting NER area: {g_ner_final.area:.6f}, geom_type: {g_ner_final.geom_type}")
    print(f"Area sum: {(g_bf_final.area + g_ner_final.area):.6f} (original: {g_ner_hv.area:.6f})")

    # Topological validations
    ov = g_bf_final.intersection(g_ner_final).area
    assert ov < 1e-9, f"Overlap between BF and NER: {ov}"
    assert g_bf_final.is_valid, "BF geometry is invalid!"
    assert g_ner_final.is_valid, "NER geometry is invalid!"

    # Check against all other AOF features
    for fid, idx in aof_indices.items():
        if fid == 'AOF_NER_HV':
            continue
        g_other = clean_geometry(shape(features[idx]['geometry']))
        ov_bf = g_bf_final.intersection(g_other).area
        ov_ner = g_ner_final.intersection(g_other).area
        assert ov_bf < 1e-9, f"Overlap between BF and {fid}: {ov_bf}"
        assert ov_ner < 1e-9, f"Overlap between NER and {fid}: {ov_ner}"

    print("All internal topological QA passed with 0.0000000000 overlap!")

    # 4. Construct Feature objects
    feat_bf = {
        'type': 'Feature',
        'id': 'AOF_BF',
        'properties': {
            'id': 'AOF_BF',
            'shapeISO': 'BF',
            'CNTR_CODE': 'BF',
            'NAME': 'Burkina Faso',
            'name': 'Haute-Volta',
            'country': 'French West Africa',
            'PARTOF': 'French West Africa',
            'SUBJECTO': 'France',
            'HISTORICAL_NAME': 'Colonie de la Haute-Volta (Démembrée 1932–1947)',
            'ADMIN_TITLE': "Gouvernement Général de l'AOF — Région de Haute-Volta (Ouagadougou)",
            'REGION_KIND': 'COLONIAL_TERRITORY',
            '__layer': 'prov'
        },
        'geometry': geom_to_geojson(g_bf_final)
    }

    feat_ner = {
        'type': 'Feature',
        'id': 'AOF_NER',
        'properties': {
            'id': 'AOF_NER',
            'shapeISO': 'NE',
            'CNTR_CODE': 'NE',
            'NAME': 'Niger',
            'name': 'Niger',
            'country': 'French West Africa',
            'PARTOF': 'French West Africa',
            'SUBJECTO': 'France',
            'HISTORICAL_NAME': 'Colonie du Niger (Territoires Sahariens & Niamey)',
            'ADMIN_TITLE': "Gouvernement Général de l'AOF — Colonie du Niger",
            'REGION_KIND': 'COLONIAL_TERRITORY',
            '__layer': 'prov'
        },
        'geometry': geom_to_geojson(g_ner_final)
    }

    # Replace AOF_NER_HV at idx_ner_hv with AOF_NER and insert AOF_BF right next to it
    features[idx_ner_hv] = feat_ner
    features.insert(idx_ner_hv, feat_bf)

    print(f"Replaced AOF_NER_HV with AOF_BF and AOF_NER. Total features: {len(features)}")

    # 5. Save updated world_historical_1938_unified.json
    with open('public/data/world_historical_1938_unified.json', 'w', encoding='utf-8') as f:
        json.dump(unified_db, f, separators=(',', ':'))
    with open('dist/data/world_historical_1938_unified.json', 'w', encoding='utf-8') as f:
        json.dump(unified_db, f, separators=(',', ':'))
    print("Saved public and dist world_historical_1938_unified.json")

    # 6. Save aof_provinces.geojson with all 8 entities
    aof_all_features = []
    for f in features:
        fid = f.get('id')
        if fid in ['AOF_CI', 'AOF_GN', 'AOF_SN', 'AOF_MR', 'AOF_ML', 'AOF_BJ', 'AOF_BF', 'AOF_NER']:
            aof_all_features.append(f)

    print(f"Collected {len(aof_all_features)} AOF features for dedicated GeoJSON layer")
    assert len(aof_all_features) == 8, f"Expected 8 features, got {len(aof_all_features)}"

    aof_collection = {
        'type': 'FeatureCollection',
        'features': aof_all_features
    }

    with open('public/data/aof_provinces.geojson', 'w', encoding='utf-8') as f:
        json.dump(aof_collection, f, separators=(',', ':'))
    with open('dist/data/aof_provinces.geojson', 'w', encoding='utf-8') as f:
        json.dump(aof_collection, f, separators=(',', ':'))
    print("Saved public/data/aof_provinces.geojson and dist/data/aof_provinces.geojson")

    dt = time.time() - t0
    print(f"=== COMPLETED IN {dt:.2f}s ===", flush=True)

if __name__ == '__main__':
    main()
