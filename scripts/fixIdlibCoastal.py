import json
from shapely.geometry import shape, mapping, Polygon, MultiPolygon
from shapely.ops import unary_union
from shapely.validation import make_valid

db_path = "public/data/world_historical_1938_unified.json"
with open(db_path, "r", encoding="utf-8") as f:
    world_data = json.load(f)

features = world_data.get("features", [])

idx_idl = None
idx_ltk = None
idx_tar = None
idx_hma = None
idx_alp = None
hatay_indices = []

for idx, ft in enumerate(features):
    p = ft.get("properties", {})
    nid = str(p.get("NUTS_ID", ft.get("id", ""))).strip()
    cntr = str(p.get("CNTR_CODE", "")).strip().upper()
    name = str(p.get("NAME", p.get("NAME_LATN", ""))).strip().lower()

    g = make_valid(shape(ft["geometry"]))
    ft["_geom"] = g

    if nid == "SYR_IDL": idx_idl = idx
    elif nid == "SYR_LTK": idx_ltk = idx
    elif nid == "SYR_TAR": idx_tar = idx
    elif nid == "SYR_HMA": idx_hma = idx
    elif nid == "SYR_ALP": idx_alp = idx
    elif "TR631" in nid or ("hatay" in name and cntr in {"TR", "TUR"}):
        hatay_indices.append(idx)

def extract_polys(g):
    if g.is_empty: return Polygon()
    if g.geom_type in ('Polygon', 'MultiPolygon'): return g
    if g.geom_type == 'GeometryCollection':
        polys = [p for p in g.geoms if p.geom_type in ('Polygon', 'MultiPolygon')]
        return unary_union(polys) if polys else Polygon()
    return Polygon()

g_idl = features[idx_idl]["_geom"]
g_ltk = features[idx_ltk]["_geom"]

print(f"Idlib iniziale: bounds={g_idl.bounds}, area={g_idl.area:.5f} deg², geom_type={g_idl.geom_type}")
print(f"Latakia iniziale: bounds={g_ltk.bounds}, area={g_ltk.area:.5f} deg²")

# 1. Separazione dei frammenti di Idlib
parts_idl = list(g_idl.geoms) if g_idl.geom_type == 'MultiPolygon' else [g_idl]
legit_idl_parts = []
coastal_spurious_parts = []

for p in parts_idl:
    c = p.centroid
    # Il distretto legittimo di Idlib ha il baricentro a est di lon 36.35°
    # Qualsiasi frammento a ovest (costa di Latakia / monte Ansariya settentrionale) è spurio
    if c.x < 36.20 or p.bounds[0] < 36.05:
        coastal_spurious_parts.append(p)
        print(f"  -> Frammento costiero spurio rilevato: area={p.area:.5f} deg², bounds={p.bounds}, centroid=[{c.x:.4f}, {c.y:.4f}]")
    else:
        legit_idl_parts.append(p)

# Se Idlib era un singolo Polygon con un cordone/corridoio continuo verso il mare:
if not coastal_spurious_parts and g_idl.bounds[0] < 36.0:
    from shapely.geometry import box
    # Maschera dell'entroterra legittimo di Idlib (lon >= 36.15)
    inland_box = box(36.15, 35.0, 37.5, 37.0)
    coastal_box = box(35.0, 35.0, 36.15, 37.0)
    legit_idl_parts = [extract_polys(make_valid(g_idl.intersection(inland_box)))]
    coastal_spurious_parts = [extract_polys(make_valid(g_idl.intersection(coastal_box)))]
    print(f"  -> Taglio chirurgico del corridoio costiero a lon 36.15° effettuato!")

# 2. Riassegnazione: lo scarto costiero viene fuso interamente in SYR_LTK (Latakia)
if coastal_spurious_parts:
    u_spurious = unary_union(coastal_spurious_parts)
    new_ltk = extract_polys(make_valid(g_ltk.union(u_spurious)))
    print(f"✓ Scarto costiero ({u_spurious.area:.5f} deg²) riassorbito con successo in SYR_LTK")
else:
    new_ltk = g_ltk

new_idl = extract_polys(make_valid(unary_union(legit_idl_parts)))

# 3. Ritaglio anti-overlap rigoroso
# Latakia non deve sovrapporsi a Idlib, né a Tartus a sud, né all'Hatay a nord
if new_idl.intersects(new_ltk):
    new_idl = extract_polys(make_valid(new_idl.difference(new_ltk)))

if idx_tar is not None and new_ltk.intersects(features[idx_tar]["_geom"]):
    new_ltk = extract_polys(make_valid(new_ltk.difference(features[idx_tar]["_geom"])))

if hatay_indices:
    u_hatay = unary_union([features[i]["_geom"] for i in hatay_indices])
    if new_ltk.intersects(u_hatay):
        new_ltk = extract_polys(make_valid(new_ltk.difference(u_hatay.buffer(1e-5))))

# 4. Assegnazione geometrie finali con coordinate native float
features[idx_idl]["geometry"] = mapping(new_idl)
features[idx_ltk]["geometry"] = mapping(new_ltk)

for ft in features:
    if "_geom" in ft: del ft["_geom"]

with open(db_path, "w", encoding="utf-8") as f:
    json.dump(world_data, f, ensure_ascii=False)

print(f"\nIdlib finale: bounds={new_idl.bounds}, area={new_idl.area:.5f} deg² (Zero sbocco sul mare)")
print(f"Latakia finale: bounds={new_ltk.bounds}, area={new_ltk.area:.5f} deg² (Copertura costiera continua)")
print("✓ world_historical_1938_unified.json aggiornato con successo!")