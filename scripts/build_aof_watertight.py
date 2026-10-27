import sys, os, json, time
import shapely
from shapely.geometry import shape, mapping, Polygon, MultiPolygon
from shapely.ops import unary_union
from shapely.validation import make_valid
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
    return polys[0] if len(polys) == 1 else MultiPolygon(polys)

def fill_small_holes(geom, max_hole_area=0.05):
    """Fill tiny coastal lagoons or sliver holes without touching real enclaves like Gambia (>0.8 area)."""
    if geom is None or geom.is_empty:
        return geom
    if geom.geom_type == 'Polygon':
        interiors = [h for h in geom.interiors if Polygon(h).area > max_hole_area]
        return clean_geometry(Polygon(geom.exterior, interiors))
    elif geom.geom_type == 'MultiPolygon':
        polys = []
        for p in geom.geoms:
            interiors = [h for h in p.interiors if Polygon(h).area > max_hole_area]
            polys.append(clean_geometry(Polygon(p.exterior, interiors)))
        return clean_geometry(MultiPolygon(polys))
    return geom

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

AOF_ENTITIES_CONFIG = {
    'CI': {
        'id': 'AOF_CI',
        'shapeISO': 'CI',
        'CNTR_CODE': 'CI',
        'NAME': "Côte d'Ivoire",
        'name': "Côte d'Ivoire",
        'country': 'French West Africa',
        'PARTOF': 'French West Africa',
        'SUBJECTO': 'France',
        '__layer': 'prov',
    },
    'GN': {
        'id': 'AOF_GN',
        'shapeISO': 'GN',
        'CNTR_CODE': 'GN',
        'NAME': 'Guinea',
        'name': 'Guinée française',
        'country': 'French West Africa',
        'PARTOF': 'French West Africa',
        'SUBJECTO': 'France',
        '__layer': 'prov',
    },
    'SN': {
        'id': 'AOF_SN',
        'shapeISO': 'SN',
        'CNTR_CODE': 'SN',
        'NAME': 'Senegal',
        'name': 'Sénégal',
        'country': 'French West Africa',
        'PARTOF': 'French West Africa',
        'SUBJECTO': 'France',
        '__layer': 'prov',
    },
    'MR': {
        'id': 'AOF_MR',
        'shapeISO': 'MR',
        'CNTR_CODE': 'MR',
        'NAME': 'Mauritania',
        'name': 'Mauritanie',
        'country': 'French West Africa',
        'PARTOF': 'French West Africa',
        'SUBJECTO': 'France',
        '__layer': 'prov',
    },
    'ML': {
        'id': 'AOF_ML',
        'shapeISO': 'ML',
        'CNTR_CODE': 'ML',
        'NAME': 'Mali',
        'name': 'Soudan français',
        'country': 'French West Africa',
        'PARTOF': 'French West Africa',
        'SUBJECTO': 'France',
        '__layer': 'prov',
    },
    'BJ': {
        'id': 'AOF_BJ',
        'shapeISO': 'BJ',
        'CNTR_CODE': 'BJ',
        'NAME': 'Benin',
        'name': 'Dahomey',
        'country': 'French West Africa',
        'PARTOF': 'French West Africa',
        'SUBJECTO': 'France',
        '__layer': 'prov',
    },
    'NER_HV': {
        'id': 'AOF_NER_HV',
        'shapeISO': 'NE-BF',
        'CNTR_CODE': 'NE',
        'NAME': 'French West Africa',
        'name': 'French West Africa (Niger & Haute-Volta)',
        'country': 'French West Africa',
        'PARTOF': 'French West Africa',
        'SUBJECTO': 'France',
        '__layer': 'hb',
    }
}

def main():
    print("=== STARTING WATERTIGHT INTEGRATION OF FRENCH WEST AFRICA (AOF) ===", flush=True)
    t0 = time.time()

    # 1. Load canonical unified database
    unified_path = 'public/data/world_historical_1938_unified.json'
    with open(unified_path, 'r', encoding='utf-8') as f:
        unified_db = json.load(f)

    f2262_raw = unified_db['features'][2262]
    f2262_geom = clean_geometry(shape(f2262_raw['geometry']))
    print(f"[1/7] Original French West Africa area: {f2262_geom.area:.6f}", flush=True)

    # External neighbors
    neighbor_indices = [
        2250, # Gambia
        2252, # Guinea-Bissau
        2157, # Sierra Leone
        2161, # Liberia
        2220, # Gold Coast
        2221, # Togo
        2244, # Nigeria
        2264, # Spanish Sahara
        2265, # Rio De Oro
        2032, # DZ37 Tindouf
        2039, # DZ52 Bordj Badji Mokhtar
        2040, # DZ01 Adrar
        2045, # DZ58 In Guezzam
        2356, # HB_ALGERIA
    ]

    neighbor_polys = []
    for idx in neighbor_indices:
        g = unified_db['features'][idx].get('geometry')
        if g:
            neighbor_polys.append(clean_geometry(shape(g)))

    neighbors_union = clean_geometry(unary_union(neighbor_polys))
    print(f"[2/7] External neighbors union area: {neighbors_union.area:.6f}", flush=True)

    # 2. Load attached state geometries
    files = {
        'CI': r'c:\Users\ziani\Downloads\ci.json',
        'GN': r'c:\Users\ziani\Downloads\gn.json',
        'SN': r'c:\Users\ziani\Downloads\sn.json',
        'MR': r'c:\Users\ziani\Downloads\mr.json',
        'ML': r'c:\Users\ziani\Downloads\ml.json',
        'BJ': r'c:\Users\ziani\Downloads\bj (1).json',
    }

    attached = {}
    for code, path in files.items():
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        attached[code] = clean_geometry(shape(data['features'][0]['geometry']))
        print(f"      Loaded {code} from {path} (raw area={attached[code].area:.4f})", flush=True)

    # 3. Trim attached states against external neighbors
    trimmed_attached = {}
    for code, g in attached.items():
        trimmed = clean_geometry(g.difference(neighbors_union))
        trimmed_attached[code] = trimmed

    u_trimmed = clean_geometry(unary_union(list(trimmed_attached.values())))

    # 4. Find all voids in f2262 not covered by trimmed attached states or external neighbors
    diff_f2262 = clean_geometry(f2262_geom.difference(unary_union([u_trimmed, neighbors_union])))
    diff_polys = []
    if diff_f2262.geom_type == 'Polygon':
        diff_polys = [diff_f2262]
    elif diff_f2262.geom_type == 'MultiPolygon':
        diff_polys = list(diff_f2262.geoms)

    rem_aof = None
    void_slivers = []
    for p in diff_polys:
        if p.area > 50.0:
            rem_aof = p
        elif p.area > 1e-12:
            void_slivers.append(p)

    print(f"[3/7] Identified remaining AOF (Niger & Haute-Volta, area={rem_aof.area:.4f}) and {len(void_slivers)} border void slivers.", flush=True)

    # Assign each void sliver to touching attached state with maximum boundary contact
    assigned_slivers = {code: [] for code in trimmed_attached}
    for s in void_slivers:
        best_code = None
        best_contact = 0.0
        for code, g in trimmed_attached.items():
            contact = g.boundary.intersection(s.buffer(1e-4)).length
            if contact > best_contact:
                best_contact = contact
                best_code = code
        if best_code and best_contact > 0:
            assigned_slivers[best_code].append(s)
        else:
            min_dist = 999.0
            for code, g in trimmed_attached.items():
                d = g.distance(s)
                if d < min_dist:
                    min_dist = d
                    best_code = code
            if best_code:
                assigned_slivers[best_code].append(s)

    # 5. Build final watertight states and fill tiny coastal lagoons
    final_states = {}
    for code, g in trimmed_attached.items():
        slist = assigned_slivers[code]
        if slist:
            g = clean_geometry(unary_union([g] + slist))
        g = fill_small_holes(g, max_hole_area=0.05)
        if g.intersects(neighbors_union):
            g = clean_geometry(g.difference(neighbors_union))
        if rem_aof and g.intersects(rem_aof):
            g = clean_geometry(g.difference(rem_aof))
        final_states[code] = clean_geometry(g)

    # Remaining AOF
    rem_aof = clean_geometry(rem_aof.difference(neighbors_union))
    u_finals = unary_union(list(final_states.values()))
    rem_aof = clean_geometry(rem_aof.difference(u_finals))
    final_states['NER_HV'] = clean_geometry(rem_aof)

    # 6. Quality Assurance & Topological Assertions
    print("[4/7] Performing strict QA checks (overlap, validity, area)...", flush=True)
    assert len(final_states) == 7, f"Expected 7 entities, got {len(final_states)}"

    for code, g in final_states.items():
        assert g is not None and not g.is_empty, f"{code} geometry is empty!"
        assert g.is_valid, f"{code} geometry is invalid!"
        assert g.area > 5.0, f"{code} area unexpectedly small: {g.area}"
        ov_n = g.intersection(neighbors_union).area
        assert ov_n < 1e-9, f"{code} overlaps external neighbors by {ov_n}!"

    # Mutual overlaps
    all_codes = list(final_states.keys())
    for i in range(len(all_codes)):
        for j in range(i + 1, len(all_codes)):
            c1, c2 = all_codes[i], all_codes[j]
            ov = final_states[c1].intersection(final_states[c2]).area
            assert ov < 1e-9, f"Mutual overlap between {c1} and {c2}: {ov}!"

    print("      All 7 entities have 0.0000000000 mutual overlap and 0.0000000000 neighbor overlap! PASS.", flush=True)

    # 7. Build GeoJSON feature collection for AOF
    print("[5/7] Assembling GeoJSON features with D3 winding and 6-decimal rounding...", flush=True)
    aof_features = []
    for code, g in final_states.items():
        conf = AOF_ENTITIES_CONFIG[code]
        feat = {
            'type': 'Feature',
            'id': conf['id'],
            'properties': {
                'id': conf['id'],
                'shapeISO': conf['shapeISO'],
                'CNTR_CODE': conf['CNTR_CODE'],
                'NAME': conf['NAME'],
                'name': conf['name'],
                'country': conf['country'],
                'PARTOF': conf['PARTOF'],
                'SUBJECTO': conf['SUBJECTO'],
                '__layer': conf['__layer'],
                'centroid': [round(g.centroid.x, 5), round(g.centroid.y, 5)],
                'area_deg2': round(g.area, 4)
            },
            'geometry': geom_to_geojson(g, precision=6)
        }
        aof_features.append(feat)

    aof_collection = {
        'type': 'FeatureCollection',
        'metadata': {
            'title': 'French West Africa (AOF) Provinces and Territories 1938',
            'entitiesCount': len(aof_features),
            'generatedAt': time.strftime('%Y-%m-%d %H:%M:%S')
        },
        'features': aof_features
    }

    # Save aof_provinces.geojson to public/data and dist/data
    out_aof_public = 'public/data/aof_provinces.geojson'
    out_aof_dist = 'dist/data/aof_provinces.geojson'
    with open(out_aof_public, 'w', encoding='utf-8') as f:
        json.dump(aof_collection, f, separators=(',', ':'))
    if os.path.exists('dist/data'):
        with open(out_aof_dist, 'w', encoding='utf-8') as f:
            json.dump(aof_collection, f, separators=(',', ':'))
    print(f"      Saved {out_aof_public} ({os.path.getsize(out_aof_public) / 1024:.1f} KB)", flush=True)

    # 8. Splice into world_historical_1938_unified.json (replace feature 2262)
    print("[6/7] Splicing 7 watertight AOF entities into unified database...", flush=True)
    orig_feats = unified_db['features']
    assert orig_feats[2262].get('properties', {}).get('NAME') == 'French West Africa', "Feature 2262 is not French West Africa!"

    # Replace 2262 with the 7 features
    new_features = orig_feats[:2262] + aof_features + orig_feats[2263:]
    unified_db['features'] = new_features
    if 'metadata' in unified_db:
        unified_db['metadata']['totalFeatures'] = len(new_features)
        unified_db['metadata']['generatedAt'] = time.strftime('%Y-%m-%d %H:%M:%S')

    with open(unified_path, 'w', encoding='utf-8') as f:
        json.dump(unified_db, f, separators=(',', ':'))
    print(f"      Updated {unified_path} (new feature count: {len(new_features)})", flush=True)

    dist_unified = 'dist/data/world_historical_1938_unified.json'
    if os.path.exists(dist_unified):
        with open(dist_unified, 'w', encoding='utf-8') as f:
            json.dump(unified_db, f, separators=(',', ':'))
        print(f"      Updated {dist_unified}", flush=True)

    t1 = time.time()
    print(f"[7/7] WATERTIGHT AOF INTEGRATION COMPLETED SUCCESSFULLY in {t1 - t0:.2f}s!", flush=True)

if __name__ == '__main__':
    main()
