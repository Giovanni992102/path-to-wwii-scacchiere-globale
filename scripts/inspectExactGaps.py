import json
from shapely.geometry import shape, box, Polygon, MultiPolygon
from shapely.ops import unary_union
from shapely.validation import make_valid

db_path = "public/data/world_historical_1938_unified.json"
with open(db_path, "r", encoding="utf-8") as f:
    world_data = json.load(f)

features = world_data.get("features", [])

palestine_geoms = []
jordan_geoms = []
syria_leb_geoms = []

for ft in features:
    p = ft.get("properties", {})
    nid = str(p.get("NUTS_ID", ft.get("id", ""))).strip()
    cntr = str(p.get("CNTR_CODE", "")).strip().upper()
    g = make_valid(shape(ft["geometry"]))
    ft["_geom"] = g

    if nid.startswith("PAL_") or cntr in {"PAL", "ISR", "PSE"}:
        palestine_geoms.append((nid, g))
    elif "TRANSJORDAN" in nid or cntr in {"JOR", "JO", "HB_TRANSJORDAN"}:
        jordan_geoms.append((nid, g))
    elif nid.startswith("SYR_") or nid == "LEB_ALL" or cntr in {"SYR", "LEB"}:
        syria_leb_geoms.append((nid, g))

u_pal = unary_union([g for _, g in palestine_geoms])
u_jor = unary_union([g for _, g in jordan_geoms])
u_mand = unary_union([g for _, g in syria_leb_geoms])

bbox = box(35.0, 32.0, 36.2, 33.6)
all_solid = unary_union([u_pal, u_jor, u_mand])
voids = make_valid(bbox.difference(all_solid))

v_list = []
if voids.geom_type == 'Polygon':
    v_list = [voids]
elif voids.geom_type == 'MultiPolygon':
    v_list = list(voids.geoms)
elif voids.geom_type == 'GeometryCollection':
    v_list = [g for g in voids.geoms if g.geom_type in ('Polygon', 'MultiPolygon')]

real_voids = [v for v in v_list if v.area > 0.001 and v.centroid.x > 35.2]
print(f"Faglie individuate: {len(real_voids)}")

for i, v in enumerate(real_voids):
    c = v.centroid
    print(f"\n--- FAGLIA #{i+1} (Area: {v.area:.6f} deg², Centroid: [{c.x:.4f}, {c.y:.4f}]) ---")
    # Quali entità toccano questa faglia?
    border_buf = v.buffer(1e-4)
    touching = []
    for nid, g in palestine_geoms:
        if g.intersects(border_buf):
            touching.append(f"Palestina: {nid} (contatto: {g.intersection(border_buf).area:.6f})")
    for nid, g in jordan_geoms:
        if g.intersects(border_buf):
            touching.append(f"Giordania: {nid} (contatto: {g.intersection(border_buf).area:.6f})")
    for nid, g in syria_leb_geoms:
        if g.intersects(border_buf):
            touching.append(f"Mandato Francese: {nid} (contatto: {g.intersection(border_buf).area:.6f})")
    for t in touching:
        print(f"  * {t}")