import json
from shapely.geometry import shape, mapping, Polygon, MultiPolygon, box
from shapely.ops import unary_union
from shapely.validation import make_valid

db_path = "public/data/world_historical_1938_unified.json"
with open(db_path, "r", encoding="utf-8") as f:
    world_data = json.load(f)

features = world_data.get("features", [])

levant_syria_ids = {
    "SYR_DAM", "SYR_GHT", "SYR_ALP", "SYR_IDL", "SYR_LTK", "SYR_TAR",
    "SYR_HMS", "SYR_HMA", "SYR_JAZ", "SYR_RAQ", "SYR_DEZ", "SYR_DRU",
    "SYR_HAU", "SYR_GOL"
}

syria_indices = []
leb_indices = []
neighbor_indices = []

for idx, ft in enumerate(features):
    p = ft.get("properties", {})
    nid = str(p.get("NUTS_ID", ft.get("id", ""))).strip()
    cntr = str(p.get("CNTR_CODE", "")).strip().upper()
    name = str(p.get("NAME", p.get("NAME_LATN", ""))).strip().lower()

    g = make_valid(shape(ft["geometry"]))
    ft["_geom"] = g

    if nid in levant_syria_ids or (cntr == "SYR" and not nid.startswith("TR") and not nid.startswith("IQ")):
        syria_indices.append(idx)
    elif nid == "LEB_ALL" or cntr == "LEB" or "liban" in name:
        leb_indices.append(idx)
    else:
        b = g.bounds
        if not (b[2] < 34.0 or b[0] > 43.5 or b[3] < 31.0 or b[1] > 38.5):
            neighbor_indices.append(idx)

print(f"Province siriane: {len(syria_indices)} | Distretti libanesi: {len(leb_indices)}")
print(f"Vicini di confine scansionati: {len(neighbor_indices)}")

# Costruzione telai
union_neighbors = unary_union([features[i]["_geom"] for i in neighbor_indices])
union_syria = unary_union([features[i]["_geom"] for i in syria_indices])
union_leb = unary_union([features[i]["_geom"] for i in leb_indices])
union_mandate = unary_union([union_syria, union_leb])

# Spazio target e vuoto effettivo
buffer_mandate = union_mandate.buffer(0.32)
target_space = make_valid(buffer_mandate.difference(union_neighbors))
total_void = make_valid(target_space.difference(union_mandate))

# Tassellatura del vuoto a griglia (step 0.04 deg ~ 4 km)
vb = total_void.bounds
step = 0.04
assigned_cells = {idx: [] for idx in syria_indices}

cur_x = vb[0]
while cur_x < vb[2]:
    cur_y = vb[1]
    while cur_y < vb[3]:
        cell_box = box(cur_x, cur_y, cur_x + step, cur_y + step)
        if total_void.intersects(cell_box):
            inter = total_void.intersection(cell_box)
            if not inter.is_empty and inter.area > 1e-7:
                c = inter.centroid
                # Esclude mare aperto a ovest
                if not (c.x < 35.6 and c.y < 35.5):
                    # Trova la provincia siriana autentica più vicina
                    closest_idx = min(
                        syria_indices,
                        key=lambda s_idx: features[s_idx]["_geom"].distance(c)
                    )
                    assigned_cells[closest_idx].append(inter)
        cur_y += step
    cur_x += step

print("Fusione geostorica delle tessere nelle rispettive province...")
for s_idx in syria_indices:
    cells = assigned_cells[s_idx]
    if cells:
        nid = features[s_idx]["properties"].get("NUTS_ID", "PROV")
        u_cells = unary_union(cells)
        features[s_idx]["_geom"] = make_valid(features[s_idx]["_geom"].union(u_cells))
        print(f"  + {nid}: aggregate {len(cells)} tessere di confine ({u_cells.area:.4f} deg²)")

# Ritaglio con compensazione anti-quantizzazione contro i vicini
neighbors_buffered = union_neighbors.buffer(1.5e-5)

def extract_polygons(g):
    if g.is_empty:
        return Polygon()
    if g.geom_type in ('Polygon', 'MultiPolygon'):
        return g
    if g.geom_type == 'GeometryCollection':
        polys = [p for p in g.geoms if p.geom_type in ('Polygon', 'MultiPolygon')]
        return unary_union(polys) if polys else Polygon()
    return Polygon()

for s_idx in syria_indices:
    g = features[s_idx]["_geom"]
    if g.intersects(neighbors_buffered):
        g = make_valid(g.difference(neighbors_buffered))
    features[s_idx]["_geom"] = extract_polygons(g)

def round_coords(coords, precision=5):
    if isinstance(coords[0], (int, float)):
        return [round(coords[0], precision), round(coords[1], precision)]
    return [round_coords(c, precision) for c in coords]

for s_idx in syria_indices:
    raw_geom = mapping(features[s_idx]["_geom"])
    if "coordinates" in raw_geom:
        raw_geom["coordinates"] = round_coords(raw_geom["coordinates"], 5)
    features[s_idx]["geometry"] = raw_geom

for ft in features:
    if "_geom" in ft:
        del ft["_geom"]

with open(db_path, "w", encoding="utf-8") as f:
    json.dump(world_data, f, ensure_ascii=False)

print("\n✓ world_historical_1938_unified.json riallineato con partizionamento geostorico perfetto!")