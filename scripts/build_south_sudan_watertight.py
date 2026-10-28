import json
import os
import time
from shapely.geometry import shape, mapping, Polygon, MultiPolygon
from shapely.ops import unary_union
from shapely.validation import make_valid
from shapely.geometry.polygon import orient

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
    print("=== STARTING WATERTIGHT INTEGRATION OF SOUTH SUDAN ===", flush=True)
    t0 = time.time()

    # 1. Load data
    ss_path = r'c:\Users\ziani\Downloads\ss.json'
    with open(ss_path, 'r', encoding='utf-8') as f:
        ss_data = json.load(f)
    ss_geom = shape(ss_data['features'][0]['geometry'])

    unified_path = 'public/data/world_historical_1938_unified.json'
    with open(unified_path, 'r', encoding='utf-8') as f:
        unified_db = json.load(f)

    feats = unified_db['features']
    f2247 = feats[2247]
    assert f2247.get('properties', {}).get('NAME') == 'Sudan', f"Feature 2247 must be Sudan, got {f2247.get('properties')}"
    s2247 = shape(f2247['geometry'])
    sudan_poly = s2247.geoms[0] if s2247.geom_type == 'MultiPolygon' else s2247

    print(f"[1/6] Original Sudan area: {sudan_poly.area:.6f} deg²", flush=True)

    # 2. Split operation
    sudan_remaining = sudan_poly.difference(ss_geom)
    assert sudan_remaining.geom_type == 'MultiPolygon', f"Expected MultiPolygon, got {sudan_remaining.geom_type}"
    
    # Part 14 is North Sudan (centroid y > 15)
    north_parts = [g for g in sudan_remaining.geoms if g.centroid.y > 10.0]
    south_slivers = [g for g in sudan_remaining.geoms if g.centroid.y <= 10.0]
    assert len(north_parts) == 1, f"Expected 1 North Sudan main part, got {len(north_parts)}"
    
    north_sudan_poly = make_valid(north_parts[0])
    
    ss_inside = ss_geom.intersection(sudan_poly)
    south_sudan_poly = make_valid(unary_union([ss_inside] + south_slivers))

    print(f"[2/6] Split successful:", flush=True)
    print(f"      North Sudan type: {north_sudan_poly.geom_type}, area: {north_sudan_poly.area:.6f} deg²", flush=True)
    print(f"      South Sudan type: {south_sudan_poly.geom_type}, area: {south_sudan_poly.area:.6f} deg²", flush=True)

    # 3. Geometric & Topological Verification
    assert north_sudan_poly.is_valid, "North Sudan geometry invalid"
    assert south_sudan_poly.is_valid, "South Sudan geometry invalid"
    assert north_sudan_poly.geom_type == 'Polygon', f"Expected Polygon for North Sudan, got {north_sudan_poly.geom_type}"
    assert south_sudan_poly.geom_type == 'Polygon', f"Expected Polygon for South Sudan, got {south_sudan_poly.geom_type}"
    assert len(north_sudan_poly.interiors) == 0, "North Sudan has internal holes"
    assert len(south_sudan_poly.interiors) == 0, "South Sudan has internal holes"

    area_sum = north_sudan_poly.area + south_sudan_poly.area
    area_diff = abs(area_sum - sudan_poly.area)
    print(f"[3/6] Area conservation check: diff = {area_diff:.10f} deg²", flush=True)
    assert area_diff < 1e-7, f"Area conservation violation: {area_diff}"

    overlap_internal = north_sudan_poly.intersection(south_sudan_poly).area
    print(f"      Internal overlap check: {overlap_internal:.10f} deg²", flush=True)
    assert overlap_internal < 1e-9, f"Internal overlap violation: {overlap_internal}"

    # Check external neighbours
    eth_geom = shape(feats[2249]['geometry'])
    congo_geom = shape(feats[2162]['geometry'])
    uga_geom = shape(feats[2257]['geometry'])
    car_geom = shape(feats[2271]['geometry'])
    chad_geom = shape(feats[2270]['geometry'])
    
    assert north_sudan_poly.intersection(eth_geom).area < 1e-9, "North Sudan / Ethiopia overlap violation"
    assert south_sudan_poly.intersection(eth_geom).area < 1e-9, "South Sudan / Ethiopia overlap violation"
    assert north_sudan_poly.intersection(congo_geom).area < 1e-9, "North Sudan / Belgian Congo overlap violation"
    assert south_sudan_poly.intersection(congo_geom).area < 1e-9, "South Sudan / Belgian Congo overlap violation"
    assert north_sudan_poly.intersection(uga_geom).area < 1e-9, "North Sudan / Uganda overlap violation"
    assert south_sudan_poly.intersection(uga_geom).area < 1e-9, "South Sudan / Uganda overlap violation"

    print("      All external border overlaps with Ethiopia, Congo, Uganda = 0.00000000 deg²!", flush=True)

    # 4. Check Walvis Bay preservation
    wb_found = False
    for f in feats:
        p = f.get('properties', {})
        if p.get('id') == 'WALVIS_BAY' or 'Walvis' in p.get('NAME', '') or 'Walbis' in p.get('NAME', ''):
            wb_found = True
            break
    assert wb_found, "Walvis Bay feature must be preserved in dataset"
    print("      Walvis Bay feature confirmed intact in dataset!", flush=True)

    # 5. Build Features
    north_geojson_geom = geom_to_geojson(north_sudan_poly)
    south_geojson_geom = geom_to_geojson(south_sudan_poly)

    feat_north = {
        'type': 'Feature',
        'id': 'SUD',
        'properties': {
            'id': 'SUD',
            'NAME': 'Sudan',
            'ABBREVN': 'Sudan',
            'SUBJECTO': 'Sudan',
            'PARTOF': 'Sudan',
            'BORDERPRECISION': 3,
            'shapeISO': 'SD',
            'CNTR_CODE': 'SD',
            'CNTR_ID': 'SD',
            'ISO': 'SD',
            'modernName': 'Sudan',
            'area_deg2': round(north_sudan_poly.area, 4),
            'centroid': [round(north_sudan_poly.centroid.x, 5), round(north_sudan_poly.centroid.y, 5)],
            '__layer': 'hb',
            '__sanitized': True
        },
        'geometry': north_geojson_geom
    }

    feat_south = {
        'type': 'Feature',
        'id': 'SSD',
        'properties': {
            'id': 'SSD',
            'NAME': 'South Sudan',
            'ABBREVN': 'S. Sudan',
            'SUBJECTO': 'Sudan',
            'PARTOF': 'Sudan',
            'BORDERPRECISION': 3,
            'shapeISO': 'SS',
            'CNTR_CODE': 'SS',
            'CNTR_ID': 'SS',
            'ISO': 'SS',
            'modernName': 'South Sudan',
            'area_deg2': round(south_sudan_poly.area, 4),
            'centroid': [round(south_sudan_poly.centroid.x, 5), round(south_sudan_poly.centroid.y, 5)],
            '__layer': 'hb',
            '__sanitized': True
        },
        'geometry': south_geojson_geom
    }

    # 6. Save standalone public/data/south_sudan_provinces.geojson
    ss_collection = {
        'type': 'FeatureCollection',
        'name': 'South Sudan Historical Geometries (1938)',
        'crs': {'type': 'name', 'properties': {'name': 'urn:ogc:def:crs:OGC:1.3:CRS84'}},
        'features': [feat_south]
    }
    with open('public/data/south_sudan_provinces.geojson', 'w', encoding='utf-8') as f:
        json.dump(ss_collection, f, separators=(',', ':'))
    print("[4/6] Saved public/data/south_sudan_provinces.geojson", flush=True)

    dist_ss = 'dist/data/south_sudan_provinces.geojson'
    if os.path.exists('dist/data'):
        with open(dist_ss, 'w', encoding='utf-8') as f:
            json.dump(ss_collection, f, separators=(',', ':'))
        print(f"      Saved {dist_ss}", flush=True)

    # 7. Update world_historical_1938_unified.json
    feats[2247] = feat_north
    new_features = feats[:2248] + [feat_south] + feats[2248:]
    unified_db['features'] = new_features
    if 'metadata' in unified_db:
        unified_db['metadata']['totalFeatures'] = len(new_features)
        unified_db['metadata']['generatedAt'] = time.strftime('%Y-%m-%d %H:%M:%S')

    with open(unified_path, 'w', encoding='utf-8') as f:
        json.dump(unified_db, f, separators=(',', ':'))
    print(f"[5/6] Saved {unified_path} (new feature count: {len(new_features)})", flush=True)

    dist_unified = 'dist/data/world_historical_1938_unified.json'
    if os.path.exists(dist_unified):
        with open(dist_unified, 'w', encoding='utf-8') as f:
            json.dump(unified_db, f, separators=(',', ':'))
        print(f"      Saved {dist_unified}", flush=True)

    t1 = time.time()
    print(f"[6/6] === INTEGRATION COMPLETED SUCCESSFULLY IN {t1 - t0:.2f}s ===", flush=True)

if __name__ == '__main__':
    main()
