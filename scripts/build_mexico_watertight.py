import sys, os, json, time
import shapely
from shapely.geometry import shape, mapping, Polygon, MultiPolygon
from shapely.ops import unary_union
from shapely.validation import make_valid
from shapely.geometry.polygon import orient

CLEAN_STATE_NAMES = {
    'MXSON': 'Sonora',
    'MXBCN': 'Baja California',
    'MXCHH': 'Chihuahua',
    'MXCOA': 'Coahuila',
    'MXTAM': 'Tamaulipas',
    'MXNLE': 'Nuevo León',
    'MXROO': 'Quintana Roo',
    'MXCAM': 'Campeche',
    'MXTAB': 'Tabasco',
    'MXCHP': 'Chiapas',
    'MXCOL': 'Colima',
    'MXNAY': 'Nayarit',
    'MXBCS': 'Baja California Sur',
    'MXSIN': 'Sinaloa',
    'MXYUC': 'Yucatán',
    'MXVER': 'Veracruz',
    'MXJAL': 'Jalisco',
    'MXMIC': 'Michoacán',
    'MXGRO': 'Guerrero',
    'MXOAX': 'Oaxaca',
    'MXMEX': 'México',
    'MXPUE': 'Puebla',
    'MXMOR': 'Morelos',
    'MXQUE': 'Querétaro',
    'MXHID': 'Hidalgo',
    'MXGUA': 'Guanajuato',
    'MXSLP': 'San Luis Potosí',
    'MXZAC': 'Zacatecas',
    'MXAGU': 'Aguascalientes',
    'MXDUR': 'Durango',
    'MXTLA': 'Tlaxcala',
    'MXCMX': 'Ciudad de México',
}

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
    print("=== STARTING RIGOROUS WATERTIGHT INTEGRATION OF MEXICAN STATES ===", flush=True)
    t0 = time.time()

    # 1. Load canonical unified database
    unified_path = 'public/data/world_historical_1938_unified.json'
    with open(unified_path, 'r', encoding='utf-8') as f:
        unified_db = json.load(f)

    # US Southern Border states (California, Arizona, New Mexico, Texas)
    us_south_ids = ['US_CA', 'US_AZ', 'US_NM', 'US_TX']
    us_polys = [shape(f['geometry']) for f in unified_db['features'] if f.get('id') in us_south_ids]
    us_south_geom = clean_geometry(unary_union(us_polys))
    print(f"[1/6] US southern boundary area: {us_south_geom.area:.6f}", flush=True)

    # Central America (Guatemala & Belize)
    gtm_feat = unified_db['features'][2185]
    blz_feat = unified_db['features'][2184]
    gtm_geom = clean_geometry(shape(gtm_feat['geometry']))
    blz_geom = clean_geometry(shape(blz_feat['geometry']))
    ca_geom = clean_geometry(unary_union([gtm_geom, blz_geom]))
    print(f"[2/6] Central America boundary area: {ca_geom.area:.6f}", flush=True)

    neighbors_union = clean_geometry(unary_union([us_south_geom, ca_geom]))

    # 2. Load Mexican states from mx.json
    mx_input_path = r'c:\Users\ziani\Downloads\mx.json'
    print(f"[3/6] Reading Mexican states from {mx_input_path}...", flush=True)
    with open(mx_input_path, 'r', encoding='utf-8') as f:
        mx_raw = json.load(f)

    features = mx_raw['features']
    print(f"      Loaded {len(features)} states from mx.json.", flush=True)

    state_geoms = {}
    state_meta = {}
    for ft in features:
        raw_id = ft['properties']['id']
        name = CLEAN_STATE_NAMES.get(raw_id, ft['properties']['name'])
        std_id = raw_id[:2] + '_' + raw_id[2:]
        iso = raw_id[:2] + '-' + raw_id[2:]
        g = clean_geometry(shape(ft['geometry']))
        state_geoms[raw_id] = g
        state_meta[raw_id] = {
            'raw_id': raw_id,
            'id': std_id,
            'shapeISO': iso,
            'name': name
        }

    # 3. Detect and close all boundary voids/holes along frontiers
    print("[4/6] Sealing boundary voids along US and Central America borders...", flush=True)
    mx_union = clean_geometry(unary_union(list(state_geoms.values())))
    combined_all = clean_geometry(unary_union([mx_union, neighbors_union]))

    holes = []
    if combined_all.geom_type == 'Polygon':
        holes.extend(combined_all.interiors)
    elif combined_all.geom_type == 'MultiPolygon':
        for p in combined_all.geoms:
            holes.extend(p.interiors)

    hole_polys = [clean_geometry(Polygon(h)) for h in holes if clean_geometry(Polygon(h)) and Polygon(h).area > 1e-12]
    print(f"      Detected {len(hole_polys)} boundary void polygons.", flush=True)

    # Assign each void to the touching Mexican state with the highest boundary contact
    assigned_holes = {raw_id: [] for raw_id in state_geoms}
    for hp in hole_polys:
        best_rid = None
        best_contact = 0.0
        for raw_id, g in state_geoms.items():
            contact = g.boundary.intersection(hp.buffer(1e-4)).length
            if contact > best_contact:
                best_contact = contact
                best_rid = raw_id
        if best_rid and best_contact > 0:
            assigned_holes[best_rid].append(hp)
        else:
            # Fallback to minimum distance
            min_dist = 999.0
            for raw_id, g in state_geoms.items():
                d = g.distance(hp)
                if d < min_dist:
                    min_dist = d
                    best_rid = raw_id
            if best_rid:
                assigned_holes[best_rid].append(hp)

    # For each state, add assigned voids, then cleanly cut with exact neighbor boundaries
    final_states = {}
    for raw_id, g in state_geoms.items():
        hlist = assigned_holes[raw_id]
        if hlist:
            g = clean_geometry(unary_union([g] + hlist))
        if g.intersects(neighbors_union):
            g = clean_geometry(g.difference(neighbors_union))
        final_states[raw_id] = g

    # 4. Strict Quality Assurance & Topology Verification
    print("[5/6] Performing strict topological, area and watertight assertions...", flush=True)
    assert len(final_states) == 32, f"Expected 32 states, got {len(final_states)}"

    # Check each state
    for raw_id, g in final_states.items():
        name = state_meta[raw_id]['name']
        assert g is not None and not g.is_empty, f"State {name} is empty!"
        assert g.is_valid, f"State {name} geometry is invalid!"
        assert g.area > 0.05, f"State {name} area suspiciously small: {g.area}"

        # Overlap with US
        us_ov = g.intersection(us_south_geom).area
        assert us_ov < 1e-9, f"State {name} overlaps US by {us_ov}!"

        # Overlap with Central America
        ca_ov = g.intersection(ca_geom).area
        assert ca_ov < 1e-9, f"State {name} overlaps Central America by {ca_ov}!"

    # Internal overlaps among Mexican states
    raw_ids = list(final_states.keys())
    for i in range(len(raw_ids)):
        for j in range(i + 1, len(raw_ids)):
            r1, r2 = raw_ids[i], raw_ids[j]
            g1, g2 = final_states[r1], final_states[r2]
            if g1.intersects(g2):
                ov = g1.intersection(g2).area
                assert ov < 1e-9, f"Internal overlap between {r1} and {r2}: {ov}"

    # Frontier void check
    final_mx_union = clean_geometry(unary_union(list(final_states.values())))
    final_combined = clean_geometry(unary_union([final_mx_union, neighbors_union]))
    final_holes = []
    if final_combined.geom_type == 'Polygon':
        final_holes.extend(final_combined.interiors)
    elif final_combined.geom_type == 'MultiPolygon':
        for p in final_combined.geoms:
            final_holes.extend(p.interiors)
    significant_holes = [Polygon(h) for h in final_holes if Polygon(h).area > 1e-8]
    assert len(significant_holes) == 0, f"Found {len(significant_holes)} significant remaining voids!"

    print("      ALL WATERTIGHT & ZERO-OVERLAP ASSERTIONS PASSED WITH 100% SUCCESS!", flush=True)

    # 5. Generate GeoJSON Datasets
    print("[6/6] Generating and writing GeoJSON datasets...", flush=True)

    mexico_features = []
    for raw_id in raw_ids:
        meta = state_meta[raw_id]
        g = final_states[raw_id]
        feat = {
            'type': 'Feature',
            'id': meta['id'],
            'properties': {
                'id': meta['id'],
                'shapeISO': meta['shapeISO'],
                'shapeName': meta['name'],
                'NAME': meta['name'],
                'NUTS_NAME': meta['name'],
                'HISTORICAL_NAME': meta['name'],
                'country': 'Mexico',
                'CNTR_CODE': 'MEX',
                'SUBJECTO': 'Mexico',
                'PARTOF': 'Mexico',
                'BORDERPRECISION': 3,
                '__layer': 'prov',
                '__sanitized': True
            },
            'geometry': geom_to_geojson(g)
        }
        mexico_features.append(feat)

    mexico_fc = {
        'type': 'FeatureCollection',
        'features': mexico_features
    }

    # Save standalone mexico_provinces.geojson to public and dist
    for ppath in ['public/data/mexico_provinces.geojson', 'dist/data/mexico_provinces.geojson']:
        with open(ppath, 'w', encoding='utf-8') as f:
            json.dump(mexico_fc, f, ensure_ascii=False)
        print(f"      Saved {ppath} ({os.path.getsize(ppath):,} bytes)", flush=True)

    # Update world_historical_1938_unified.json:
    # Feature 2182 is the old macro Mexico -> replace with the 32 Mexican states
    canon_idx = [i for i, f in enumerate(unified_db['features']) if f.get('properties', {}).get('NAME') == 'Mexico'][0]
    print(f"      Replacing macro Mexico at feature index {canon_idx} with 32 Mexican states...", flush=True)

    unified_db['features'][canon_idx] = mexico_features[0]
    for i in range(1, len(mexico_features)):
        unified_db['features'].insert(canon_idx + i, mexico_features[i])

    print(f"      Integrated {len(mexico_features)} Mexican state features into unified database (total features now: {len(unified_db['features'])}).", flush=True)

    for ppath in ['public/data/world_historical_1938_unified.json', 'dist/data/world_historical_1938_unified.json']:
        with open(ppath, 'w', encoding='utf-8') as f:
            json.dump(unified_db, f, ensure_ascii=False)
        print(f"      Saved {ppath} ({os.path.getsize(ppath):,} bytes)", flush=True)

    print(f"=== COMPLETED SUCCESSFULLY IN {time.time() - t0:.2f}s ===", flush=True)

if __name__ == '__main__':
    main()
