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
    print("=== STARTING WATERTIGHT INTEGRATION OF FRENCH CENTRAL AFRICA (AEF) ===", flush=True)
    t0 = time.time()

    # 1. Load canonical unified database
    unified_path = 'public/data/world_historical_1938_unified.json'
    with open(unified_path, 'r', encoding='utf-8') as f:
        unified_db = json.load(f)

    f2270_raw = unified_db['features'][2270]
    f2291_raw = unified_db['features'][2291]

    f2270_name = f2270_raw.get('properties', {}).get('NAME')
    f2291_name = f2291_raw.get('properties', {}).get('NAME')
    print(f"[1/7] Feature 2270: {f2270_name}", flush=True)
    print(f"      Feature 2291: {f2291_name}", flush=True)
    assert f2270_name == 'French Equatorial Africa', f"Unexpected feature 2270 name: {f2270_name}"
    assert f2291_name == 'Congo (France)', f"Unexpected feature 2291 name: {f2291_name}"

    geom2270 = clean_geometry(shape(f2270_raw['geometry']))
    geom2291 = clean_geometry(shape(f2291_raw['geometry']))
    print(f"      Original f2270 area: {geom2270.area:.6f} deg²", flush=True)
    print(f"      Original f2291 area: {geom2291.area:.6f} deg²", flush=True)

    # 2. Load attached state geometries
    ga_path = r'c:\Users\ziani\Downloads\ga.json'
    cf_path = r'c:\Users\ziani\Downloads\cf.json'

    with open(ga_path, 'r', encoding='utf-8') as f:
        ga_raw = clean_geometry(shape(json.load(f)['features'][0]['geometry']))
    with open(cf_path, 'r', encoding='utf-8') as f:
        cf_raw = clean_geometry(shape(json.load(f)['features'][0]['geometry']))

    print(f"[2/7] Loaded Gabon from {ga_path} (raw area={ga_raw.area:.4f} deg²)", flush=True)
    print(f"      Loaded Central African Rep. from {cf_path} (raw area={cf_raw.area:.4f} deg²)", flush=True)

    # 3. Intersect ga and cf with f2270
    ga_in = clean_geometry(ga_raw.intersection(geom2270))
    cf_in = clean_geometry(cf_raw.intersection(geom2270))
    print(f"[3/7] Inscribed Gabon area: {ga_in.area:.6f} deg²", flush=True)
    print(f"      Inscribed CAR/Oubangui area: {cf_in.area:.6f} deg²", flush=True)

    # 4. Partition f2270 without gaps or overlaps
    union_gacf = clean_geometry(unary_union([ga_in, cf_in]))
    rem = clean_geometry(geom2270.difference(union_gacf))

    rem_polys = [p for p in (rem.geoms if rem.geom_type == 'MultiPolygon' else [rem])]
    chad_base = [p for p in rem_polys if p.area > 50.0][0]
    slivers = [p for p in rem_polys if p.area <= 50.0]

    print(f"[4/7] Identified Chad base polygon (area={chad_base.area:.4f} deg²) and {len(slivers)} boundary slivers.", flush=True)

    assigned = {'GA': [], 'CF': [], 'TD': []}
    for s in slivers:
        b_s = s.buffer(1e-4)
        contact_ga = ga_in.boundary.intersection(b_s).length
        contact_cf = cf_in.boundary.intersection(b_s).length
        contact_td = chad_base.boundary.intersection(b_s).length
        contacts = [('GA', contact_ga), ('CF', contact_cf), ('TD', contact_td)]
        contacts.sort(key=lambda x: x[1], reverse=True)
        if contacts[0][1] > 0:
            assigned[contacts[0][0]].append(s)
        else:
            dists = [('GA', ga_in.distance(s)), ('CF', cf_in.distance(s)), ('TD', chad_base.distance(s))]
            dists.sort(key=lambda x: x[1])
            assigned[dists[0][0]].append(s)

    ga_final = clean_geometry(unary_union([ga_in] + assigned['GA']))
    cf_final = clean_geometry(unary_union([cf_in] + assigned['CF']))
    td_final = clean_geometry(unary_union([chad_base] + assigned['TD']))
    cg_final = geom2291

    print(f"      Final Gabon (GA) area: {ga_final.area:.6f} deg² (geom_type: {ga_final.geom_type})", flush=True)
    print(f"      Final Oubangui-Chari (CF) area: {cf_final.area:.6f} deg² (geom_type: {cf_final.geom_type})", flush=True)
    print(f"      Final Tchad (TD) area: {td_final.area:.6f} deg² (geom_type: {td_final.geom_type})", flush=True)
    print(f"      Moyen-Congo (CG) area: {cg_final.area:.6f} deg² (geom_type: {cg_final.geom_type})", flush=True)

    # 5. Quality control: Watertightness and Overlap audit
    print("[5/7] Executing rigorous mathematical topology & watertight audit...", flush=True)
    total_partition_area = ga_final.area + cf_final.area + td_final.area
    area_delta = abs(total_partition_area - geom2270.area)
    print(f"      Union area GA + CF + TD: {total_partition_area:.12f} deg²")
    print(f"      Original f2270 area:     {geom2270.area:.12f} deg²")
    print(f"      Discrepancy (void/gap):  {area_delta:.12f} deg²")
    assert area_delta < 1e-9, f"Partition is not watertight! Discrepancy={area_delta}"

    # Overlaps
    overlap_ga_cf = ga_final.intersection(cf_final).area
    overlap_ga_td = ga_final.intersection(td_final).area
    overlap_cf_td = cf_final.intersection(td_final).area
    overlap_ga_cg = ga_final.intersection(cg_final).area
    overlap_cf_cg = cf_final.intersection(cg_final).area
    overlap_td_cg = td_final.intersection(cg_final).area

    print(f"      Overlap GA - CF: {overlap_ga_cf:.12f} deg²")
    print(f"      Overlap GA - TD: {overlap_ga_td:.12f} deg²")
    print(f"      Overlap CF - TD: {overlap_cf_td:.12f} deg²")
    print(f"      Overlap GA - CG: {overlap_ga_cg:.12f} deg²")
    print(f"      Overlap CF - CG: {overlap_cf_cg:.12f} deg²")
    print(f"      Overlap TD - CG: {overlap_td_cg:.12f} deg²")

    assert overlap_ga_cf < 1e-10, f"Overlap GA-CF: {overlap_ga_cf}"
    assert overlap_ga_td < 1e-10, f"Overlap GA-TD: {overlap_ga_td}"
    assert overlap_cf_td < 1e-10, f"Overlap CF-TD: {overlap_cf_td}"
    assert overlap_ga_cg < 1e-10, f"Overlap GA-CG: {overlap_ga_cg}"
    assert overlap_cf_cg < 1e-10, f"Overlap CF-CG: {overlap_cf_cg}"
    assert overlap_td_cg < 1e-10, f"Overlap TD-CG: {overlap_td_cg}"
    print("      -> Topologia interna 100% watertight, zero sovrapposizioni e zero buchi neri!", flush=True)

    # 6. Build GeoJSON feature structures
    aef_entities_config = {
        'TD': {
            'id': 'AEF_TD',
            'shapeISO': 'TD',
            'CNTR_CODE': 'TD',
            'NAME': 'Chad',
            'name': 'Territoire du Tchad',
            'country': 'French Equatorial Africa',
            'PARTOF': 'French Equatorial Africa',
            'SUBJECTO': 'France',
            'ABBREVN': 'Tchad',
            'BORDERPRECISION': 3,
            '__layer': 'prov',
            '__sanitized': True,
            'geometry': td_final,
        },
        'CF': {
            'id': 'AEF_CF',
            'shapeISO': 'CF',
            'CNTR_CODE': 'CF',
            'NAME': 'Central African Republic',
            'name': 'Oubangui-Chari',
            'country': 'French Equatorial Africa',
            'PARTOF': 'French Equatorial Africa',
            'SUBJECTO': 'France',
            'ABBREVN': 'Oubangui-Chari',
            'BORDERPRECISION': 3,
            '__layer': 'prov',
            '__sanitized': True,
            'geometry': cf_final,
        },
        'GA': {
            'id': 'AEF_GA',
            'shapeISO': 'GA',
            'CNTR_CODE': 'GA',
            'NAME': 'Gabon',
            'name': 'Colonie du Gabon',
            'country': 'French Equatorial Africa',
            'PARTOF': 'French Equatorial Africa',
            'SUBJECTO': 'France',
            'ABBREVN': 'Gabon',
            'BORDERPRECISION': 3,
            '__layer': 'prov',
            '__sanitized': True,
            'geometry': ga_final,
        },
        'CG': {
            'id': 'AEF_CG',
            'shapeISO': 'CG',
            'CNTR_CODE': 'CG',
            'NAME': 'Congo (France)',
            'name': 'Moyen-Congo',
            'country': 'French Equatorial Africa',
            'PARTOF': 'French Equatorial Africa',
            'SUBJECTO': 'France',
            'ABBREVN': 'Moyen-Congo',
            'BORDERPRECISION': 3,
            '__layer': 'prov',
            '__sanitized': True,
            'geometry': cg_final,
        }
    }

    aef_features_list = []
    for code in ['TD', 'CF', 'GA', 'CG']:
        conf = aef_entities_config[code]
        g = conf['geometry']
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
                'ABBREVN': conf['ABBREVN'],
                'BORDERPRECISION': conf['BORDERPRECISION'],
                '__layer': conf['__layer'],
                '__sanitized': conf['__sanitized'],
                'centroid': [round(g.centroid.x, 5), round(g.centroid.y, 5)],
                'area_deg2': round(g.area, 4)
            },
            'geometry': geom_to_geojson(g, precision=6)
        }
        aef_features_list.append(feat)

    # 7. Write public/data/aef_provinces.geojson and dist/data/aef_provinces.geojson
    aef_collection = {
        'type': 'FeatureCollection',
        'metadata': {
            'title': 'French Equatorial Africa (AEF) Provinces and Territories 1938',
            'entitiesCount': len(aef_features_list),
            'generatedAt': time.strftime('%Y-%m-%d %H:%M:%S')
        },
        'features': aef_features_list
    }

    out_aef_public = 'public/data/aef_provinces.geojson'
    out_aef_dist = 'dist/data/aef_provinces.geojson'
    with open(out_aef_public, 'w', encoding='utf-8') as f:
        json.dump(aef_collection, f, separators=(',', ':'))
    print(f"[6/7] Generated {out_aef_public} ({os.path.getsize(out_aef_public) / 1024:.1f} KB)", flush=True)

    if os.path.exists('dist/data'):
        with open(out_aef_dist, 'w', encoding='utf-8') as f:
            json.dump(aef_collection, f, separators=(',', ':'))
        print(f"      Generated {out_aef_dist}", flush=True)

    # 8. Splice into world_historical_1938_unified.json
    # Replace feature 2270 with TD, CF, GA (3 features replacing 1)
    # Note: feature 2291 is currently at index 2291.
    # When we replace 1 feature with 3 features at index 2270:
    # 2 features are added, so feature 2291 will be shifted to index 2293.
    # We also update feature 2291 (Moyen-Congo) properties in place.
    orig_feats = unified_db['features']
    assert orig_feats[2270].get('properties', {}).get('NAME') == 'French Equatorial Africa'
    assert orig_feats[2291].get('properties', {}).get('NAME') == 'Congo (France)'

    cg_feat = aef_features_list[3] # CG
    orig_feats[2291]['properties'] = cg_feat['properties']
    orig_feats[2291]['id'] = cg_feat['id']

    # New list: feats 0..2269 + [TD, CF, GA] + feats 2271..end
    new_features = orig_feats[:2270] + aef_features_list[:3] + orig_feats[2271:]
    unified_db['features'] = new_features
    if 'metadata' in unified_db:
        unified_db['metadata']['totalFeatures'] = len(new_features)
        unified_db['metadata']['generatedAt'] = time.strftime('%Y-%m-%d %H:%M:%S')

    with open(unified_path, 'w', encoding='utf-8') as f:
        json.dump(unified_db, f, separators=(',', ':'))
    print(f"[7/7] Updated {unified_path} (new feature count: {len(new_features)})", flush=True)

    dist_unified = 'dist/data/world_historical_1938_unified.json'
    if os.path.exists(dist_unified):
        with open(dist_unified, 'w', encoding='utf-8') as f:
            json.dump(unified_db, f, separators=(',', ':'))
        print(f"      Updated {dist_unified}", flush=True)

    t1 = time.time()
    print(f"=== WATERTIGHT INTEGRATION OF AEF COMPLETED SUCCESSFULLY in {t1 - t0:.2f}s ===", flush=True)

if __name__ == '__main__':
    main()
