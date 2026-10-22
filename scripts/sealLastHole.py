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
for idx, ft in enumerate(features):
    props = ft.get("properties", {})
    nid = str(props.get("NUTS_ID", ft.get("id", ""))).strip()
    cntr = str(props.get("CNTR_CODE", "")).strip().upper()
    g = make_valid(shape(ft["geometry"]))
    ft["_geom"] = g
    if nid in levant_ids or cntr in {"SYR", "LEB"} or nid.startswith("SYR_") or nid.startswith("LEB_"):
        levant_indices.append(idx)

union_levant = unary_union([features[i]["_geom"] for i in levant_indices])

holes = []
if isinstance(union_levant, Polygon):
    holes = [Polygon(ring) for ring in union_levant.interiors]
elif isinstance(union_levant, MultiPolygon):
    for p in union_levant.geoms:
        holes.extend([Polygon(ring) for ring in p.interiors])

print(f"Buchi residui rilevati: {len(holes)}")
for i, h in enumerate(holes):
    c = h.centroid
    print(f"  Buco #{i+1}: area = {h.area:.10f} deg² | coordinate baricentro = [lon: {c.x:.4f}, lat: {c.y:.4f}]")
    # Trova la provincia confinante più vicina
    best_idx = None
    max_contact = -1
    for idx in levant_indices:
        g = features[idx]["_geom"]
        contact = g.buffer(1e-3).intersection(h).area
        if contact > max_contact:
            max_contact = contact
            best_idx = idx
    if best_idx is not None:
        features[best_idx]["_geom"] = make_valid(features[best_idx]["_geom"].union(h.buffer(1e-6)))
        print(f"  -> Assorbito nella provincia {features[best_idx]['properties'].get('NUTS_ID')}")

def round_coords(coords, precision=5):
    if isinstance(coords[0], (int, float)):
        return [round(coords[0], precision), round(coords[1], precision)]
    return [round_coords(c, precision) for c in coords]

for idx in levant_indices:
    raw_geom = mapping(features[idx]["_geom"])
    if "coordinates" in raw_geom:
        raw_geom["coordinates"] = round_coords(raw_geom["coordinates"], 5)
    features[idx]["geometry"] = raw_geom

for ft in features:
    if "_geom" in ft:
        del ft["_geom"]

with open(db_path, "w", encoding="utf-8") as f:
    json.dump(world_data, f, ensure_ascii=False)

print("✓ Ultimo buco assorbito con successo!")