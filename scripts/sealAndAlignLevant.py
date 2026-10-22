import json
import sys
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

    is_levant = (
        nid in levant_ids
        or cntr in {"SYR", "LEB"}
        or nid.startswith("SYR_")
        or nid.startswith("LEB_")
    )

    geom = make_valid(shape(ft["geometry"]))
    ft["_geom"] = geom

    if is_levant:
        levant_indices.append(idx)
    else:
        b = geom.bounds
        # Considera solo vicini nel quadrante del Vicino Oriente
        if not (b[2] < 34.0 or b[0] > 43.5 or b[3] < 31.5 or b[1] > 38.5):
            neighbor_geoms.append(geom)

print(f"Feature del Mandato da sigillare: {len(levant_indices)}")
print(f"Poligoni confinanti utilizzati come dima di ritaglio: {len(neighbor_geoms)}")

# 1. CHIUSURA DEI BUCHI INTERNI (SLIVER HEALING TRA SIRIA E LIBANO)
levant_geoms = [features[i]["_geom"] for i in levant_indices]
union_levant = unary_union(levant_geoms)

internal_holes = []
if isinstance(union_levant, Polygon):
    internal_holes = [Polygon(ring) for ring in union_levant.interiors]
elif isinstance(union_levant, MultiPolygon):
    for poly in union_levant.geoms:
        internal_holes.extend([Polygon(ring) for ring in poly.interiors])

print(f"\nFessure interne da assorbire: {len(internal_holes)}")
for hole in internal_holes:
    # Se il buco è un micro-sliver (< 0.05 deg²), lo fonde con la provincia confinante con cui condivide più perimetro
    if hole.area < 0.05:
        best_idx = None
        max_overlap = -1
        for idx in levant_indices:
            g = features[idx]["_geom"]
            shared_boundary = g.buffer(1e-5).intersection(hole).area
            if shared_boundary > max_overlap:
                max_overlap = shared_boundary
                best_idx = idx
        if best_idx is not None:
            features[best_idx]["_geom"] = make_valid(features[best_idx]["_geom"].union(hole))

# 2. RITAGLIO DEI CONFINI ESTERNI (CLIPPING VERSO HATAY, TURCHIA, TRANSGIORDANIA, IRAQ)
union_neighbors = unary_union(neighbor_geoms)

print("\nAllineamento e ritaglio rispetto ai confini internazionali storici...")
for idx in levant_indices:
    g = features[idx]["_geom"]
    if g.intersects(union_neighbors):
        inter = g.intersection(union_neighbors)
        if inter.area > 1e-7:
            diff = g.difference(union_neighbors)
            diff = make_valid(diff)
            # Conserva solo componenti poligonali
            if diff.geom_type == 'GeometryCollection':
                polys = [p for p in diff.geoms if p.geom_type in ('Polygon', 'MultiPolygon')]
                diff = unary_union(polys)
            features[idx]["_geom"] = diff

# 3. RIPRISTINO COORDINATE GEOJSON ARROTONDATE
def round_coords(coords, precision=5):
    if isinstance(coords[0], (int, float)):
        return [round(coords[0], precision), round(coords[1], precision)]
    return [round_coords(c, precision) for c in coords]

for idx in levant_indices:
    raw_geom = mapping(features[idx]["_geom"])
    raw_geom["coordinates"] = round_coords(raw_geom["coordinates"], 5)
    features[idx]["geometry"] = raw_geom
    if "_geom" in features[idx]:
        del features[idx]["_geom"]

for ft in features:
    if "_geom" in ft:
        del ft["_geom"]

with open(db_path, "w", encoding="utf-8") as f:
    json.dump(world_data, f, ensure_ascii=False)

print("\nworld_historical_1938_unified.json riallineato e sigillato con successo!")