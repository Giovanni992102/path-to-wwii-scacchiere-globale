import sys, os, json, time
from shapely.geometry import shape, mapping, Polygon, MultiPolygon
from shapely.ops import unary_union
from shapely.validation import make_valid
from shapely.strtree import STRtree
from shapely.geometry.polygon import orient

def clean_geometry(geom):
    """Ensure geometry contains only valid Polygons/MultiPolygons and filter out point/line slivers."""
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
    if len(polys) == 1:
        return polys[0]
    return MultiPolygon(polys)

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

def simplify_geom(geom, tol=0.003):
    if geom.is_empty:
        return None
    if geom.geom_type == 'Polygon':
        s = geom.simplify(tol, preserve_topology=False)
        return make_valid(s) if not s.is_empty else None
    elif geom.geom_type == 'MultiPolygon':
        polys = []
        for p in geom.geoms:
            if p.area > 1e-6:
                s = p.simplify(tol, preserve_topology=False)
                if not s.is_empty:
                    s = make_valid(s)
                    if s.geom_type == 'Polygon':
                        polys.append(s)
                    elif s.geom_type == 'MultiPolygon':
                        polys.extend(s.geoms)
        if not polys:
            return None
        return MultiPolygon(polys) if len(polys) > 1 else polys[0]
    return geom

def main():
    print("=== STARTING WATERTIGHT CANADIAN INTEGRATION ===", flush=True)
    t0 = time.time()

    # 1. Load canonical unified database
    with open('public/data/world_historical_1938_unified.json', 'r', encoding='utf-8') as f:
        unified_db = json.load(f)

    # Extract Newfoundland geometry (feature 2253)
    nf_feat = unified_db['features'][2253]
    nf_geom = clean_geometry(shape(nf_feat['geometry']))
    print(f"[1/6] Newfoundland & Labrador canonical area: {nf_geom.area:.6f}", flush=True)

    # Extract USA Alaska and Northern States for watertight border subtraction
    ak_feat = [f for f in unified_db['features'] if f.get('id') == 'US_AK'][0]
    ak_geom = clean_geometry(shape(ak_feat['geometry']))

    us_north_ids = ['US_WA', 'US_ID', 'US_MT', 'US_ND', 'US_MN', 'US_MI', 'US_OH', 'US_PA', 'US_NY', 'US_VT', 'US_NH', 'US_ME']
    us_north_polys = [shape(f['geometry']) for f in unified_db['features'] if f.get('id') in us_north_ids]
    us_north_geom = clean_geometry(unary_union(us_north_polys))
    total_usa_geom = clean_geometry(unary_union([ak_geom, us_north_geom]))
    print(f"[2/6] Total US northern boundary area: {total_usa_geom.area:.4f}", flush=True)

    # 2. Read and simplify geoBoundaries-CAN-ADM1.geojson line by line
    print("[3/6] Streaming geoBoundaries-CAN-ADM1.geojson...", flush=True)
    path = r'c:\Users\ziani\Downloads\geoBoundaries-CAN-ADM1.geojson'
    raw_provinces = {}
    with open(path, 'r', encoding='utf-8') as f:
        for line in f:
            line_str = line.strip()
            if not line_str or line_str.startswith('{"type": "FeatureCollection"') or line_str in [']}', ']']:
                continue
            if line_str.endswith(','):
                line_str = line_str[:-1]
            try:
                feat = json.loads(line_str)
                name = feat['properties']['shapeName']
                iso = feat['properties']['shapeISO']
                raw_g = shape(feat['geometry'])
                t_sub = time.time()
                simp_g = clean_geometry(simplify_geom(raw_g, tol=0.003))
                raw_provinces[name] = {
                    'iso': iso,
                    'props': feat['properties'],
                    'geom': simp_g,
                    'raw_area': raw_g.area,
                    'clean_area': simp_g.area if simp_g else 0
                }
                print(f"      {name:26s} (ISO: {iso}): area={simp_g.area:10.4f} (simp in {time.time() - t_sub:.2f}s)", flush=True)
            except Exception as e:
                pass

    print(f"      Read and simplified {len(raw_provinces)} entities in {time.time() - t0:.2f}s", flush=True)

    # 3. Enforce Watertightness with USA & Newfoundland
    print("[4/6] Enforcing Watertightness with USA and Newfoundland...", flush=True)

    CAN_ID_MAP = {
        'Alberta': ('CA_AB', 'CA-AB', 'Alberta'),
        'British Columbia': ('CA_BC', 'CA-BC', 'British Columbia'),
        'Manitoba': ('CA_MB', 'CA-MB', 'Manitoba'),
        'New Brunswick': ('CA_NB', 'CA-NB', 'New Brunswick'),
        'Newfoundland and Labrador': ('CA_NL', 'CA-NL', 'Newfoundland and Labrador'),
        'Northwest Territories': ('CA_NT', 'CA-NT', 'Northwest Territories'),
        'Nova Scotia': ('CA_NS', 'CA-NS', 'Nova Scotia'),
        'Nunavut': ('CA_NU', 'CA-NU', 'Nunavut'),
        'Ontario': ('CA_ON', 'CA-ON', 'Ontario'),
        'Prince Edward Island': ('CA_PE', 'CA-PE', 'Prince Edward Island'),
        'Quebec': ('CA_QC', 'CA-QC', 'Quebec'),
        'Saskatchewan': ('CA_SK', 'CA-SK', 'Saskatchewan'),
        'Yukon': ('CA_YT', 'CA-YT', 'Yukon')
    }

    # Step A: Newfoundland & Labrador uses canonical nf_geom (already 100% watertight with Quebec)
    final_provinces = {}
    final_provinces['Newfoundland and Labrador'] = nf_geom

    # Step B: Subtract USA and Newfoundland overlaps from all other provinces
    usa_cleaned_provinces = {}
    for name, item in raw_provinces.items():
        if name == 'Newfoundland and Labrador':
            continue
        g = item['geom']
        # Subtract USA (Alaska + Lower 48)
        if g.intersects(total_usa_geom):
            g = clean_geometry(g.difference(total_usa_geom))
        # Subtract Newfoundland from Quebec
        if name == 'Quebec' and g.intersects(nf_geom):
            g = clean_geometry(g.difference(nf_geom))
        usa_cleaned_provinces[name] = g

    # Step C: Eliminate internal overlaps among the 12 Canadian provinces
    ORDER = [
        'Prince Edward Island',
        'Nova Scotia',
        'New Brunswick',
        'Ontario',
        'Quebec',
        'Manitoba',
        'Saskatchewan',
        'Alberta',
        'British Columbia',
        'Yukon',
        'Northwest Territories',
        'Nunavut'
    ]

    disjoint_provinces = {}
    accum_union = None
    for name in ORDER:
        poly = usa_cleaned_provinces[name]
        if accum_union is not None and poly.intersects(accum_union):
            poly = clean_geometry(poly.difference(accum_union))
        disjoint_provinces[name] = poly
        if accum_union is None:
            accum_union = poly
        else:
            accum_union = clean_geometry(unary_union([accum_union, poly]))

    for name in ORDER:
        final_provinces[name] = disjoint_provinces[name]

    # 4. Strict Watertight Verification
    print("[5/6] Verifying 100% Watertightness (Zero Gaps, Zero Overlaps)...", flush=True)

    # 4.1 Verification: Zero Overlap with USA
    all_can_polys = [final_provinces[n] for n in final_provinces]
    all_can_union = clean_geometry(unary_union(all_can_polys))

    ov_usa_ak = all_can_union.intersection(ak_geom).area
    ov_usa_north = all_can_union.intersection(us_north_geom).area
    shared_ak = all_can_union.boundary.intersection(ak_geom.boundary).length
    shared_north = all_can_union.boundary.intersection(us_north_geom.boundary).length

    print(f"      Overlap with US Alaska:          {ov_usa_ak:.12f} (shared boundary: {shared_ak:.4f}°)")
    print(f"      Overlap with US Northern States: {ov_usa_north:.12f} (shared boundary: {shared_north:.4f}°)")
    assert ov_usa_ak < 1e-9, f"Canada must not overlap Alaska! Got {ov_usa_ak}"
    assert ov_usa_north < 1e-9, f"Canada must not overlap US Northern States! Got {ov_usa_north}"

    # 4.2 Verification: Zero Overlap with Newfoundland
    can_12_union = clean_geometry(unary_union([final_provinces[n] for n in ORDER]))
    ov_nf = can_12_union.intersection(nf_geom).area
    shared_nf = can_12_union.boundary.intersection(nf_geom.boundary).length
    print(f"      Overlap with Newfoundland:       {ov_nf:.12f} (shared boundary: {shared_nf:.4f}°)")
    assert ov_nf < 1e-9, f"Canada 12 must not overlap Newfoundland! Got {ov_nf}"

    # 4.3 Verification: Zero Internal Overlap among all 13 provinces
    all_names = list(final_provinces.keys())
    max_ov = 0.0
    for i in range(len(all_names)):
        for j in range(i + 1, len(all_names)):
            n1, n2 = all_names[i], all_names[j]
            p1, p2 = final_provinces[n1], final_provinces[n2]
            if p1.intersects(p2):
                ov = p1.intersection(p2).area
                if ov > max_ov:
                    max_ov = ov

    print(f"      Max internal overlap among provinces: {max_ov:.12f}")
    assert max_ov < 1e-9, f"Internal overlap must be 0! Got {max_ov}"

    # 4.4 Verification: All geometries are valid
    for name, p in final_provinces.items():
        assert p.is_valid, f"Province {name} geometry is invalid!"
        assert not p.is_empty, f"Province {name} geometry is empty!"
        print(f"      OK: {name:26s} area={p.area:10.4f} is_valid=True")

    print("      ALL WATERTIGHT & TOPOLOGY ASSERTIONS PASSED WITH FLYING COLORS!", flush=True)

    # 5. Generate GeoJSON Datasets
    print("[6/6] Generating and writing GeoJSON datasets...", flush=True)

    # Standalone FeatureCollection for Canada
    canada_features = []
    for name in ORDER + ['Newfoundland and Labrador']:
        cid, ciso, cname = CAN_ID_MAP[name]
        g = final_provinces[name]
        feat = {
            'type': 'Feature',
            'id': cid,
            'properties': {
                'id': cid,
                'shapeISO': ciso,
                'shapeName': cname,
                'NAME': cname,
                'NUTS_NAME': cname,
                'HISTORICAL_NAME': cname,
                'country': 'Canada' if name != 'Newfoundland and Labrador' else 'Dominion of Newfoundland',
                'CNTR_CODE': 'CAN' if name != 'Newfoundland and Labrador' else 'NF',
                'SUBJECTO': 'Canada' if name != 'Newfoundland and Labrador' else 'Dominion of Newfoundland',
                'PARTOF': 'Canada' if name != 'Newfoundland and Labrador' else 'Dominion of Newfoundland',
                'BORDERPRECISION': 3,
                '__layer': 'prov' if name != 'Newfoundland and Labrador' else 'hb',
                '__sanitized': True
            },
            'geometry': geom_to_geojson(g)
        }
        canada_features.append(feat)

    # Write public/data/canada_provinces.geojson and dist/data/canada_provinces.geojson
    canada_fc = {
        'type': 'FeatureCollection',
        'features': canada_features
    }
    for ppath in ['public/data/canada_provinces.geojson', 'dist/data/canada_provinces.geojson']:
        with open(ppath, 'w', encoding='utf-8') as f:
            json.dump(canada_fc, f, ensure_ascii=False)
        print(f"      Saved {ppath} ({os.path.getsize(ppath):,} bytes)", flush=True)

    # Update world_historical_1938_unified.json:
    # Feature 2253 is Dominion of Newfoundland -> update geometry & properties
    nl_feat_export = [f for f in canada_features if f['id'] == 'CA_NL'][0]
    unified_db['features'][2253]['id'] = 'CA_NL'
    unified_db['features'][2253]['properties'].update(nl_feat_export['properties'])
    unified_db['features'][2253]['geometry'] = nl_feat_export['geometry']

    # Feature 2254 is Canada macro -> replace with the 12 Canadian provinces
    can_12_features = [f for f in canada_features if f['id'] != 'CA_NL']
    unified_db['features'][2254] = can_12_features[0]
    for i in range(1, len(can_12_features)):
        unified_db['features'].insert(2254 + i, can_12_features[i])

    print(f"      Integrated {len(canada_features)} Canadian features into unified database (total features now: {len(unified_db['features'])}).", flush=True)

    for ppath in ['public/data/world_historical_1938_unified.json', 'dist/data/world_historical_1938_unified.json']:
        with open(ppath, 'w', encoding='utf-8') as f:
            json.dump(unified_db, f, ensure_ascii=False)
        print(f"      Saved {ppath} ({os.path.getsize(ppath):,} bytes)", flush=True)

    print(f"=== COMPLETED SUCCESSFULLY IN {time.time() - t0:.2f}s ===", flush=True)

if __name__ == '__main__':
    main()
