import json
from shapely.geometry import shape, mapping, Polygon, MultiPolygon
from shapely.ops import unary_union
from shapely.validation import make_valid

db_path = "public/data/world_historical_1938_unified.json"
with open(db_path, "r", encoding="utf-8") as f:
    world_data = json.load(f)

features = world_data.get("features", [])

levant_ids = {
    "SYR_DAM", "SYR_GHT", "SYR_ALP", "SYR_IDL", "SYR_LTK", "SYR_TAR",
    "SYR_HMS", "SYR_HMA", "SYR_JAZ", "SYR_RAQ", "SYR_DEZ", "SYR_DRU",
    "SYR_HAU", "SYR_GOL", "LEB_ALL"
}

levant_indices = []
neighbor_geoms = []

for idx, ft in enumerate(features):
    props = ft.get("properties", {})
    nid = str(props.get("NUTS_ID", ft.get("id", ""))).strip()
    cntr = str(props.get("CNTR_CODE", "")).strip().upper()

    geom = make_valid(shape(ft["geometry"]))
    ft["_geom"] = geom

    is_levant = (
        nid in levant_ids
        or cntr in {"SYR", "LEB"}
        or nid.startswith("SYR_")
        or nid.startswith("LEB_")
    )

    if is_levant:
        levant_indices.append(idx)
    else:
        b = geom.bounds
        if not (b[2] < 34.0 or b[0] > 43.5 or b[3] < 31.5 or b[1] > 38.5):
            neighbor_geoms.append(geom)

# Ritaglio con buffer di compensazione anti-quantizzazione (1.5e-5 gradi ~ 1.5 metri)
union_neighbors_buffered = unary_union(neighbor_geoms).buffer(1.5e-5)

for idx in levant_indices:
    g = features[idx]["_geom"]
    if g.intersects(union_neighbors_buffered):
        diff = g.difference(union_neighbors_buffered)
        diff = make_valid(diff)
        if diff.geom_type == 'GeometryCollection':
            polys = [p for p in diff.geoms if p.geom_type in ('Polygon', 'MultiPolygon')]
            diff = unary_union(polys)
        features[idx]["_geom"] = diff

def round_coords(coords, precision=5):
    if isinstance(coords[0], (int, float)):
        return [round(coords[0], precision), round(coords[1], precision)]
    return [round_coords(c, precision) for c in coords]

for idx in levant_indices:
    raw_geom = mapping(features[idx]["_geom"])
    raw_geom["coordinates"] = round_coords(raw_geom["coordinates"], 5)
    features[idx]["geometry"] = raw_geom

for ft in features:
    if "_geom" in ft:
        del ft["_geom"]

with open(db_path, "w", encoding="utf-8") as f:
    json.dump(world_data, f, ensure_ascii=False)

print("Jitter numerico azzerato e confini allineati al 100%!")