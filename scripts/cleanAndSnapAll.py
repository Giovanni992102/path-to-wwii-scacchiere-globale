import json
from shapely.geometry import shape, mapping, Polygon, MultiPolygon, box
from shapely.ops import unary_union
from shapely.validation import make_valid

db_path = "public/data/world_historical_1938_unified.json"
with open(db_path, "r", encoding="utf-8") as f:
    world_data = json.load(f)

features = world_data.get("features", [])

idx_map = {}
leb_indices = []
syria_indices = []

for idx, ft in enumerate(features):
    p = ft.get("properties", {})
    nid = str(p.get("NUTS_ID", ft.get("id", ""))).strip()
    cntr = str(p.get("CNTR_CODE", "")).strip().upper()
    name = str(p.get("NAME", p.get("NAME_LATN", ""))).strip().lower()

    g = make_valid(shape(ft["geometry"]))
    ft["_geom"] = g
    idx_map[nid] = idx

    if nid.startswith("SYR_") or cntr == "SYR":
        syria_indices.append(idx)
    elif nid == "LEB_ALL" or cntr == "LEB" or "liban" in name:
        leb_indices.append(idx)

idx_jor = idx_map.get("HB_TRANSJORDAN")
idx_sam = idx_map.get("PAL_SAM")
idx_beer = idx_map.get("PAL_BEER")
idx_gal = idx_map.get("PAL_GAL")

union_syria = unary_union([features[i]["_geom"] for i in syria_indices])
union_leb = unary_union([features[i]["_geom"] for i in leb_indices])
union_french_mandate = unary_union([union_syria, union_leb])

# 1. RIMOZIONE OVERLAP TRANSGIORDANIA VERSO LA SIRIA
# La Transgiordania cede qualsiasi millimetro che sconfina nella Siria mandataria
if idx_jor is not None and features[idx_jor]["_geom"].intersects(union_syria):
    print("Ritaglio Transgiordania contro la Siria...")
    diff_jor = make_valid(features[idx_jor]["_geom"].difference(union_syria.buffer(1.5e-5)))
    if diff_jor.geom_type == 'GeometryCollection':
        polys = [p for p in diff_jor.geoms if p.geom_type in ('Polygon', 'MultiPolygon')]
        diff_jor = unary_union(polys)
    features[idx_jor]["_geom"] = diff_jor

# 2. RIMOZIONE OVERLAP PALESTINA (SAMARIA) VERSO IL LIBANO
# Samaria cede qualsiasi millimetro che sconfina nel Libano
if idx_sam is not None and features[idx_sam]["_geom"].intersects(union_leb):
    print("Ritaglio Samaria contro il Libano...")
    diff_sam = make_valid(features[idx_sam]["_geom"].difference(union_leb.buffer(1.5e-5)))
    if diff_sam.geom_type == 'GeometryCollection':
        polys = [p for p in diff_sam.geoms if p.geom_type in ('Polygon', 'MultiPolygon')]
        diff_sam = unary_union(polys)
    features[idx_sam]["_geom"] = diff_sam

# 3. CHIUSURA DELLA FAGLIA RESIDUA GALILEA / LIBANO (0.0975 deg²)
# La faglia a lat 33.30, lon 35.34 è il dito di Galilea (Metula / Hula / Safad)
if idx_gal is not None:
    box_gal = box(35.1, 32.8, 35.8, 33.45)
    u_gal_local = unary_union([features[idx_gal]["_geom"], union_leb, union_syria])
    gal_void = make_valid(box_gal.difference(u_gal_local))
    
    v_parts = []
    if gal_void.geom_type == 'Polygon':
        v_parts = [gal_void]
    elif gal_void.geom_type == 'MultiPolygon':
        v_parts = list(gal_void.geoms)
    elif gal_void.geom_type == 'GeometryCollection':
        v_parts = [p for p in gal_void.geoms if p.geom_type in ('Polygon', 'MultiPolygon')]

    for vp in v_parts:
        if vp.area > 1e-5 and vp.centroid.x > 35.25:
            # Assorbe nella Galilea mandataria
            features[idx_gal]["_geom"] = make_valid(features[idx_gal]["_geom"].union(vp))

    # Ritaglio pulito contro il Libano
    if features[idx_gal]["_geom"].intersects(union_leb):
        features[idx_gal]["_geom"] = make_valid(features[idx_gal]["_geom"].difference(union_leb.buffer(1.5e-5)))

# 4. CHIUSURA MICRO-FAGLIA GIORDANO (0.00005 deg²)
if idx_jor is not None and idx_sam is not None:
    box_deadsea = box(35.4, 31.7, 35.6, 32.0)
    void_deadsea = make_valid(box_deadsea.difference(features[idx_jor]["_geom"]).difference(features[idx_sam]["_geom"]))
    if void_deadsea.area > 1e-7:
        features[idx_jor]["_geom"] = make_valid(features[idx_jor]["_geom"].union(void_deadsea))
        if features[idx_sam]["_geom"].intersects(features[idx_jor]["_geom"]):
            features[idx_sam]["_geom"] = make_valid(features[idx_sam]["_geom"].difference(features[idx_jor]["_geom"].buffer(1.5e-5)))

# 5. SALVATAGGIO OTTIMIZZATO
def round_coords(coords, precision=5):
    if isinstance(coords[0], (int, float)):
        return [round(coords[0], precision), round(coords[1], precision)]
    return [round_coords(c, precision) for c in coords]

def to_mapping(g):
    if g.geom_type == 'GeometryCollection':
        polys = [p for p in g.geoms if p.geom_type in ('Polygon', 'MultiPolygon')]
        g = unary_union(polys) if polys else Polygon()
    raw = mapping(g)
    if "coordinates" in raw:
        raw["coordinates"] = round_coords(raw["coordinates"], 5)
    return raw

targets = [idx_jor, idx_sam, idx_gal, idx_beer]
for i in targets:
    if i is not None and "_geom" in features[i]:
        features[i]["geometry"] = to_mapping(features[i]["_geom"])

for ft in features:
    if "_geom" in ft:
        del ft["_geom"]

with open(db_path, "w", encoding="utf-8") as f:
    json.dump(world_data, f, ensure_ascii=False)

print("✓ Allineamento e ripulitura completati senza overlap!")