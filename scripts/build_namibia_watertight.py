import json
import os
import time
from shapely.geometry import shape, mapping, Polygon, MultiPolygon, LineString
from shapely.ops import split, snap, unary_union
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
    print("=== STARTING WATERTIGHT INTEGRATION OF NAMIBIA / SOUTH WEST AFRICA ===", flush=True)
    t0 = time.time()

    # 1. Load data
    with open(r'c:\Users\ziani\Downloads\na.json', 'r', encoding='utf-8') as f:
        na_data = json.load(f)
    na_geom = shape(na_data['features'][0]['geometry'])
    na_coords = list(na_geom.exterior.coords)

    unified_path = 'public/data/world_historical_1938_unified.json'
    with open(unified_path, 'r', encoding='utf-8') as f:
        unified_db = json.load(f)

    feats = unified_db['features']
    f2308 = feats[2308]
    f2275 = feats[2275]
    f2166 = feats[2166] # Angola
    f2174 = feats[2174] # Botswana
    f2167 = feats[2167] # N Rhodesia

    s2308 = shape(f2308['geometry'])
    s2275 = shape(f2275['geometry'])
    s2166 = shape(f2166['geometry'])
    s2174 = shape(f2174['geometry'])
    s2167 = shape(f2167['geometry'])

    assert f2308.get('properties', {}).get('NAME') == 'Union of South Africa', "Feature 2308 must be Union of South Africa"
    assert 'Walbis' in f2275.get('properties', {}).get('NAME') or 'Walvis' in f2275.get('properties', {}).get('NAME'), "Feature 2275 must be Walvis Bay"

    print(f"[1/6] Original s2308 area: {s2308.area:.6f} deg²", flush=True)

    # 2. Extract border line from na_coords (index 911 to 1182)
    border_coords = na_coords[911:1183]
    mouth_pt = (16.2, -28.560795225187498)
    tripoint_pt = (19.839869532195312, -24.5)
    full_cut_coords = [tripoint_pt] + border_coords + [mouth_pt]
    cut_line = LineString(full_cut_coords)

    # 3. Snap and split
    snapped_cut_line = snap(cut_line, s2308, tolerance=0.05)
    split_res = split(s2308, snapped_cut_line)
    print(f"[2/6] Split produced {len(split_res.geoms)} polygons", flush=True)
    assert len(split_res.geoms) == 2, f"Expected 2 polygons from split, got {len(split_res.geoms)}"

    namibia_geoms = [g for g in split_res.geoms if g.centroid.y > -26.0]
    safrica_geoms = [g for g in split_res.geoms if g.centroid.y <= -26.0]

    namibia_poly = make_valid(unary_union(namibia_geoms))
    safrica_poly = make_valid(unary_union(safrica_geoms))

    # 4. Strict Quality Assurance
    print(f"[3/6] Namibia area: {namibia_poly.area:.6f} deg²", flush=True)
    print(f"      South Africa area: {safrica_poly.area:.6f} deg²", flush=True)
    area_diff = abs((namibia_poly.area + safrica_poly.area) - s2308.area)
    print(f"      Area difference: {area_diff:.10f} deg²", flush=True)
    assert area_diff < 1e-7, f"Area conservation failed: {area_diff}"

    overlap_internal = namibia_poly.intersection(safrica_poly).area
    print(f"      Namibia & South Africa overlap: {overlap_internal:.10f} deg²", flush=True)
    assert overlap_internal < 1e-9, f"Internal overlap violation: {overlap_internal}"

    wb_inter = namibia_poly.intersection(s2275).area
    print(f"      Namibia & Walvis Bay overlap: {wb_inter:.10f} deg²", flush=True)
    assert wb_inter < 1e-9, f"Walvis Bay overlap violation: {wb_inter}"

    angola_inter = namibia_poly.intersection(s2166).area
    botswana_inter = namibia_poly.intersection(s2174).area
    nrhodesia_inter = namibia_poly.intersection(s2167).area
    print(f"      Namibia & Angola overlap: {angola_inter:.10f} deg²", flush=True)
    print(f"      Namibia & Botswana overlap: {botswana_inter:.10f} deg²", flush=True)
    print(f"      Namibia & Northern Rhodesia overlap: {nrhodesia_inter:.10f} deg²", flush=True)
    assert angola_inter < 1e-9, "Angola overlap violation"
    assert botswana_inter < 1e-9, "Botswana overlap violation"
    assert nrhodesia_inter < 1e-9, "Northern Rhodesia overlap violation"

    assert namibia_poly.is_valid, "Namibia geometry is invalid"
    assert safrica_poly.is_valid, "South Africa geometry is invalid"

    # 5. Build Features
    namibia_geojson_geom = geom_to_geojson(namibia_poly)
    safrica_geojson_geom = geom_to_geojson(safrica_poly)
    walvis_geojson_geom = geom_to_geojson(s2275)

    feat_saf = {
        'type': 'Feature',
        'id': 'SAF',
        'properties': {
            'id': 'SAF',
            'NAME': 'Union of South Africa',
            'ABBREVN': 'S Africa',
            'SUBJECTO': 'Union of South Africa',
            'PARTOF': 'Union of South Africa',
            'BORDERPRECISION': 3,
            'shapeISO': 'ZA',
            'CNTR_CODE': 'ZA',
            'CNTR_ID': 'ZA',
            'ISO': 'ZA',
            'modernName': 'South Africa',
            'area_deg2': round(safrica_poly.area, 4),
            'centroid': [round(safrica_poly.centroid.x, 5), round(safrica_poly.centroid.y, 5)],
            '__layer': 'hb',
            '__sanitized': True
        },
        'geometry': safrica_geojson_geom
    }

    feat_swa = {
        'type': 'Feature',
        'id': 'SAF_SWA',
        'properties': {
            'id': 'SAF_SWA',
            'NAME': 'South West Africa',
            'ABBREVN': 'SWA',
            'SUBJECTO': 'Union of South Africa',
            'PARTOF': 'South West Africa',
            'BORDERPRECISION': 3,
            'shapeISO': 'NA',
            'CNTR_CODE': 'NA',
            'CNTR_ID': 'NA',
            'ISO': 'NA',
            'modernName': 'Namibia',
            'area_deg2': round(namibia_poly.area, 4),
            'centroid': [round(namibia_poly.centroid.x, 5), round(namibia_poly.centroid.y, 5)],
            '__layer': 'hb',
            '__sanitized': True
        },
        'geometry': namibia_geojson_geom
    }

    feat_walvis = {
        'type': 'Feature',
        'id': 'WALVIS_BAY',
        'properties': {
            'id': 'WALVIS_BAY',
            'NAME': 'Walvis Bay',
            'ABBREVN': 'Walvis Bay',
            'SUBJECTO': 'Union of South Africa',
            'PARTOF': 'Union of South Africa',
            'BORDERPRECISION': 3,
            'shapeISO': 'ZA',
            'CNTR_CODE': 'ZA',
            'CNTR_ID': 'ZA',
            'ISO': 'ZA',
            'modernName': 'Walvis Bay (Namibia)',
            'area_deg2': round(s2275.area, 4),
            'centroid': [14.71095, -23.02039],
            '__layer': 'hb',
            '__sanitized': True
        },
        'geometry': walvis_geojson_geom
    }

    # 6. Generate public/data/namibia_provinces.geojson
    namibia_collection = {
        'type': 'FeatureCollection',
        'name': 'Namibia and Walvis Bay Historical Geometries (1938)',
        'crs': {'type': 'name', 'properties': {'name': 'urn:ogc:def:crs:OGC:1.3:CRS84'}},
        'features': [feat_swa, feat_walvis]
    }
    with open('public/data/namibia_provinces.geojson', 'w', encoding='utf-8') as f:
        json.dump(namibia_collection, f, separators=(',', ':'))
    print("[4/6] Saved public/data/namibia_provinces.geojson", flush=True)

    dist_namibia = 'dist/data/namibia_provinces.geojson'
    if os.path.exists('dist/data'):
        with open(dist_namibia, 'w', encoding='utf-8') as f:
            json.dump(namibia_collection, f, separators=(',', ':'))
        print(f"      Saved {dist_namibia}", flush=True)

    # 7. Update world_historical_1938_unified.json
    # Replace feature 2275 with updated Walvis Bay
    feats[2275] = feat_walvis
    # Replace feature 2308 with South Africa proper, and insert South West Africa right after it
    feats[2308] = feat_saf
    new_features = feats[:2309] + [feat_swa] + feats[2309:]
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
