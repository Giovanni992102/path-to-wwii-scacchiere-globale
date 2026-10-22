import json
from shapely.geometry import shape, box, Polygon, MultiPolygon
from shapely.ops import unary_union
from shapely.validation import make_valid

db_path = "public/data/world_historical_1938_unified.json"
with open(db_path, "r", encoding="utf-8") as f:
    world = json.load(f)

features = world.get("features", [])

feats_by_id = {}
palestine_feats = []
jordan_feats = []

for idx, ft in enumerate(features):
    p = ft.get("properties", {})
    nid = str(p.get("NUTS_ID", ft.get("id", ""))).strip()
    cntr = str(p.get("CNTR_CODE", "")).strip().upper()
    name = str(p.get("NAME", p.get("NAME_LATN", ""))).strip()

    g = make_valid(shape(ft["geometry"]))
    ft["_geom"] = g
    feats_by_id[nid] = (idx, ft, g)

    # Identifica Palestina / Israele
    if nid.startswith("PAL_") or cntr in {"PAL", "ISR", "PSE"} or "palestin" in name.lower():
        palestine_feats.append(g)
    elif "TRANSJORDAN" in nid or cntr in {"JOR", "JO", "HB_TRANSJORDAN"}:
        jordan_feats.append(g)

print("=== 1. VERIFICA ESCRESCENZE SYR_GHT, SYR_LTK, SYR_TAR ===")
leb_geom = unary_union([feats_by_id[k][2] for k in feats_by_id if "LEB" in k or feats_by_id[k][1].get("properties", {}).get("CNTR_CODE") == "LEB"])

for sid in ["SYR_GHT", "SYR_LTK", "SYR_TAR"]:
    if sid in feats_by_id:
        sg = feats_by_id[sid][2]
        # Intersezione col rettangolo del Libano (lat 33.0 - 34.7, lon 35.1 - 36.6)
        inter_leb = sg.intersection(leb_geom)
        print(f"{sid}:")
        print(f"  - Bounds: {sg.bounds}")
        print(f"  - Overlap con Libano: {inter_leb.area:.8f} deg²")
        if sg.geom_type == 'MultiPolygon':
            print(f"  - Numero frammenti separati: {len(sg.geoms)}")
            for j, part in enumerate(sg.geoms):
                print(f"    * Frammento #{j+1}: area={part.area:.6f}, centroid=[lon: {part.centroid.x:.4f}, lat: {part.centroid.y:.4f}]")

print("\n=== 2. ANALISI FAGLIA PALESTINA / ISRAELE <-> TRANSGIORDANIA ===")
if palestine_feats and jordan_feats:
    u_pal = unary_union(palestine_feats)
    u_jor = unary_union(jordan_feats)
    # Area della Valle del Giordano / Mar Morto / Arava (lon 35.2 - 35.8, lat 29.4 - 33.4)
    bbox_rift = box(35.1, 29.3, 36.0, 33.4)
    rift_void = bbox_rift.difference(u_pal).difference(u_jor)
    rift_void = make_valid(rift_void)
    
    void_polys = []
    if rift_void.geom_type == 'Polygon':
        void_polys = [rift_void]
    elif rift_void.geom_type == 'MultiPolygon':
        void_polys = list(rift_void.geoms)
    elif rift_void.geom_type == 'GeometryCollection':
        void_polys = [g for g in rift_void.geoms if g.geom_type in ('Polygon', 'MultiPolygon')]

    real_rift_voids = [v for v in void_polys if v.area > 1e-5 and 35.3 < v.centroid.x < 35.75]
    print(f"Faglie vuote rilevate lungo il Giordano / Mar Morto: {len(real_rift_voids)}")
    total_rift_area = sum(v.area for v in real_rift_voids)
    print(f"Area totale buco nero tra Palestina e Transgiordania: {total_rift_area:.6f} deg² (~{total_rift_area * 12321:.1f} km²)")
    for i, v in enumerate(sorted(real_rift_voids, key=lambda x: -x.area)[:5]):
        c = v.centroid
        print(f"  Faglia #{i+1}: area={v.area:.6f} deg² | Baricentro=[lon: {c.x:.4f}, lat: {c.y:.4f}]")