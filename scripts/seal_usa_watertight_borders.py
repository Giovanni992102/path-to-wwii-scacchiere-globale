import sys, os, json, subprocess, time
from shapely.geometry import shape, mapping, Polygon, MultiPolygon
from shapely.ops import unary_union
from shapely.validation import make_valid
from shapely.strtree import STRtree

def clean_geometry(geom):
    """Ensure geometry contains only valid Polygons/MultiPolygons and filter out point/line slivers."""
    if geom.is_empty:
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

def geom_to_geojson(geom, precision=6):
    m = mapping(geom)
    m['coordinates'] = round_coords(m['coordinates'], precision)
    return m

def main():
    print("=== STARTING WATERTIGHT USA BORDER SEALING ===")
    t0 = time.time()

    # 1. Load current unified database
    with open('public/data/world_historical_1938_unified.json', 'r', encoding='utf-8') as f:
        unified_db = json.load(f)

    # Find Canada and Mexico features
    can_feat = None
    mex_feat = None
    for feat in unified_db['features']:
        p = feat.get('properties', {})
        name = str(p.get('NAME') or p.get('name') or '')
        cntr = str(p.get('country') or '')
        fid = str(feat.get('id', ''))
        if name == 'Canada' and can_feat is None:
            can_feat = feat
        elif name == 'Mexico' and mex_feat is None:
            mex_feat = feat

    if not can_feat or not mex_feat:
        raise ValueError("Could not find Canada or Mexico in unified database!")

    can_geom = make_valid(shape(can_feat['geometry']))
    mex_geom = make_valid(shape(mex_feat['geometry']))
    print(f"[1/6] Canada area: {can_geom.area:.4f}, Mexico area: {mex_geom.area:.4f}")

    # 2. Extract canonical old US geometry from git commit 9bde13c
    print("[2/6] Extracting canonical old US envelope from commit 9bde13c...")
    raw = subprocess.check_output(['git', 'show', '9bde13c:public/data/world_historical_1938_unified.json'], text=True, encoding='utf-8')
    old_data = json.loads(raw)
    old_us_feat = old_data['features'][2255] # United States
    old_us_geom = make_valid(shape(old_us_feat['geometry']))

    old_ak_polys = []
    old_48_polys = []
    for p in (old_us_geom.geoms if hasattr(old_us_geom, 'geoms') else [old_us_geom]):
        minx, miny, maxx, maxy = p.bounds
        if minx < -129 and miny > 50:
            old_ak_polys.append(p)
        else:
            old_48_polys.append(p)

    old_ak = clean_geometry(unary_union(old_ak_polys))
    old_48 = clean_geometry(unary_union(old_48_polys))
    print(f"      Canonical Old Alaska area: {old_ak.area:.6f}")
    print(f"      Canonical Old Lower 48 area: {old_48.area:.6f}")

    # 3. Load geoBoundaries dataset
    print("[3/6] Loading geoBoundaries-USA-ADM1.geojson...")
    with open('c:/Users/ziani/Downloads/geoBoundaries-USA-ADM1.geojson', 'r', encoding='utf-8') as f:
        gb_data = json.load(f)

    # 4. Process Alaska (watertight with Canada + complete Aleutians)
    print("[4/6] Processing Alaska watertight geometry...")
    gb_ak_feat = [f for f in gb_data['features'] if f['properties'].get('shapeName') == 'Alaska'][0]
    gb_ak_geom = make_valid(shape(gb_ak_feat['geometry']))

    aleutians = []
    for p in (gb_ak_geom.geoms if hasattr(gb_ak_geom, 'geoms') else [gb_ak_geom]):
        minx, miny, maxx, maxy = p.bounds
        if minx < -170 or maxx > 0:
            aleutians.append(p)

    ak_sealed = clean_geometry(unary_union([old_ak] + aleutians))
    ak_sealed = clean_geometry(ak_sealed.difference(can_geom))
    ak_overlap_can = ak_sealed.intersection(can_geom).area
    ak_shared_can = ak_sealed.boundary.intersection(can_geom.boundary).length
    print(f"      Alaska overlap with Canada: {ak_overlap_can:.10f}")
    print(f"      Alaska shared border with Canada: {ak_shared_can:.6f} degrees")
    assert ak_overlap_can < 1e-9, "Alaska must not overlap Canada!"
    assert ak_shared_can > 20.0, "Alaska must share continuous boundary with Canada!"

    # 5. Process Lower 48 States + DC
    print("[5/6] Processing Lower 48 States + DC watertight geometries...")
    EXCLUDED = {
        'Alaska', 'Hawaii', 'American Samoa', 'Guam', 'Puerto Rico',
        'Commonwealth of the Northern Mariana Islands', 'United States Virgin Islands'
    }

    state_geoms = {}
    for feat in gb_data['features']:
        name = feat['properties'].get('shapeName')
        if name in EXCLUDED:
            continue
        g = make_valid(shape(feat['geometry']))
        clipped = clean_geometry(g.intersection(old_48))
        if clipped is not None:
            state_geoms[name] = clipped

    print(f"      Clipped {len(state_geoms)} states to old_48 envelope.")
    assert len(state_geoms) == 49, f"Expected 49 entities (48 states + DC), got {len(state_geoms)}"

    union_clipped = clean_geometry(unary_union(list(state_geoms.values())))
    residual = clean_geometry(old_48.difference(union_clipped))
    residual_polys = [p for p in (residual.geoms if hasattr(residual, 'geoms') else [residual]) if p.area > 1e-12]
    print(f"      Residual gap area to seal: {residual.area:.6f} across {len(residual_polys)} slivers.")

    # Spatial index for allocating residual pieces to touching state
    state_names = list(state_geoms.keys())
    state_list = [state_geoms[n] for n in state_names]
    tree = STRtree(state_list)

    assignments = {name: [] for name in state_names}
    for poly in residual_polys:
        candidates = tree.query(poly)
        best_cand = None
        max_shared_len = -1.0
        if len(candidates) > 0:
            for idx in candidates:
                cand_geom = state_list[idx]
                shared_len = cand_geom.intersection(poly.buffer(1e-5)).length
                if shared_len > max_shared_len:
                    max_shared_len = shared_len
                    best_cand = idx
        if best_cand is None:
            best_cand = tree.nearest(poly)
        assignments[state_names[best_cand]].append(poly)

    # Merge residual into states
    final_states = {}
    for name, base_geom in state_geoms.items():
        extras = assignments[name]
        if extras:
            merged = clean_geometry(unary_union([base_geom] + extras))
        else:
            merged = base_geom
        final_states[name] = merged

    # Verification of Lower 48 envelope
    final_48_union = clean_geometry(unary_union(list(final_states.values())))
    gap_with_envelope = old_48.difference(final_48_union).area
    excess_with_envelope = final_48_union.difference(old_48).area
    overlap_can = final_48_union.intersection(can_geom).area
    overlap_mex = final_48_union.intersection(mex_geom).area
    shared_can = final_48_union.boundary.intersection(can_geom.boundary).length
    shared_mex = final_48_union.boundary.intersection(mex_geom.boundary).length

    print(f"      Gap with old_48: {gap_with_envelope:.10f}")
    print(f"      Excess outside old_48: {excess_with_envelope:.10f}")
    print(f"      Overlap with Canada: {overlap_can:.10f} (shared border: {shared_can:.4f}°)")
    print(f"      Overlap with Mexico: {overlap_mex:.10f} (shared border: {shared_mex:.4f}°)")

    assert gap_with_envelope < 1e-9, f"Gap with envelope must be 0, got {gap_with_envelope}"
    assert overlap_can < 1e-9, f"Overlap with Canada must be 0, got {overlap_can}"
    assert overlap_mex < 1e-9, f"Overlap with Mexico must be 0, got {overlap_mex}"

    # Add Alaska to final dictionary
    final_states['Alaska'] = ak_sealed

    # 6. Apply to datasets
    print("[6/6] Applying watertight geometries to unified dataset and USA provinces...")

    # Map state name to shapeISO / id
    iso_map = {}
    for feat in gb_data['features']:
        sname = feat['properties'].get('shapeName')
        siso = feat['properties'].get('shapeISO', '')
        if sname and siso:
            iso_map[sname] = siso.replace('-', '_')

    # Update unified database features
    updated_count = 0
    for feat in unified_db['features']:
        fid = feat.get('id')
        p = feat.get('properties', {})
        sname = p.get('shapeName')
        if sname in final_states:
            feat['geometry'] = geom_to_geojson(final_states[sname])
            feat['properties']['__sanitized'] = True
            feat['properties']['BORDERPRECISION'] = 3
            updated_count += 1
        elif fid and fid.startswith('US_'):
            # Match by fid
            for sn, iso in iso_map.items():
                if iso == fid and sn in final_states:
                    feat['geometry'] = geom_to_geojson(final_states[sn])
                    feat['properties']['__sanitized'] = True
                    feat['properties']['BORDERPRECISION'] = 3
                    updated_count += 1
                    break

    print(f"      Updated {updated_count} US features in unified database.")

    # Save to public/data and dist/data
    paths_to_save = [
        'public/data/world_historical_1938_unified.json',
        'dist/data/world_historical_1938_unified.json'
    ]
    for path in paths_to_save:
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(unified_db, f, ensure_ascii=False)
        print(f"      Saved {path} ({os.path.getsize(path):,} bytes)")

    # Also update usa_provinces.geojson
    usa_prov_paths = [
        'public/data/usa_provinces.geojson',
        'dist/data/usa_provinces.geojson'
    ]
    for ppath in usa_prov_paths:
        if os.path.exists(ppath):
            with open(ppath, 'r', encoding='utf-8') as f:
                usa_prov = json.load(f)
            u_count = 0
            for feat in usa_prov['features']:
                sn = feat.get('properties', {}).get('shapeName')
                if sn in final_states:
                    feat['geometry'] = geom_to_geojson(final_states[sn])
                    u_count += 1
            with open(ppath, 'w', encoding='utf-8') as f:
                json.dump(usa_prov, f, ensure_ascii=False)
            print(f"      Updated {u_count} features in {ppath}")

    print(f"=== COMPLETED SUCCESSFULLY IN {time.time() - t0:.2f}s ===")

if __name__ == '__main__':
    main()
