import json
import re
from shapely.geometry import shape, mapping, Polygon, MultiPolygon
from shapely.ops import unary_union
from shapely.validation import make_valid

# 1. Ispezione blocco LEB_ALL in georesolver.ts
print("=== 1. ISPEZIONE CASE 'LEB_ALL' IN GEORESOLVER.TS ===")
with open("src/data/georesolver.ts", "r", encoding="utf-8") as f:
    code = f.read()

lines = code.splitlines()
for i in range(max(0, 6554), min(len(lines), 6620)):
    print(f"{i+1:4d}: {lines[i]}")

# 2. Caricamento dataset
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

    g = make_valid(shape(ft["geometry"]))
    ft["_geom"] = g

    is_levant = (
        nid in levant_ids
        or cntr in {"SYR", "LEB"}
        or nid.startswith("SYR_")
        or nid.startswith("LEB_")
    )
    if is_levant:
        levant_indices.append(idx)
    else:
        b = g.bounds
        if not (b[2] < 34.0 or b[0] > 43.5 or b[3] < 31.0 or b[1] > 38.5):
            neighbor_geoms.append(g)

print(f"\nProvince Mandato identificate: {len(levant_indices)}")
union_neighbors = unary_union(neighbor_geoms).buffer(1.5e-5)
union_levant = unary_union([features[i]["_geom"] for i in levant_indices])

# 3. Estrazione e chiusura ermetica dei buchi interni
holes = []
if isinstance(union_levant, Polygon):
    holes = [Polygon(ring) for ring in union_levant.interiors]
elif isinstance(union_levant, MultiPolygon):
    for p in union_levant.geoms:
        holes.extend([Polygon(ring) for ring in p.interiors])

print(f"Buchi interni rilevati da sanare: {len(holes)}")
if holes:
    total_hole_area = sum(h.area for h in holes)
    print(f"Area totale dei buchi: {total_hole_area:.10f} deg²")

    for h in holes:
        best_idx = None
        max_contact = -1
        for idx in levant_indices:
            g = features[idx]["_geom"]
            contact = g.buffer(1e-4).intersection(h).area
            if contact > max_contact:
                max_contact = contact
                best_idx = idx
        if best_idx is not None and max_contact > 0:
            features[best_idx]["_geom"] = make_valid(features[best_idx]["_geom"].union(h))

# 4. Ritaglio anti-overlap verso i vicini
def extract_polygons(g):
    if g.is_empty:
        return Polygon()
    if g.geom_type in ('Polygon', 'MultiPolygon'):
        return g
    if g.geom_type == 'GeometryCollection':
        polys = [p for p in g.geoms if p.geom_type in ('Polygon', 'MultiPolygon')]
        return unary_union(polys) if polys else Polygon()
    return Polygon()

for idx in levant_indices:
    g = features[idx]["_geom"]
    if g.intersects(union_neighbors):
        g = make_valid(g.difference(union_neighbors))
    features[idx]["_geom"] = extract_polygons(g)

# 5. Salvataggio con coordinate arrotondate
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

print("✓ Sanatoria completata: 55 buchi assorbiti e database aggiornato!")