import json
import sys
from shapely.geometry import shape, MultiPolygon, Polygon
from shapely.ops import unary_union
from shapely.validation import make_valid

db_path = "public/data/world_historical_1938_unified.json"
with open(db_path, "r", encoding="utf-8") as f:
    data = json.load(f)

features = data.get("features", [])

levant_ids = {
    "SYR_DAM", "SYR_GHT", "SYR_ALP", "SYR_IDL", "SYR_LTK", "SYR_TAR",
    "SYR_HMS", "SYR_HMA", "SYR_JAZ", "SYR_RAQ", "SYR_DEZ", "SYR_DRU",
    "SYR_HAU", "SYR_GOL", "LEB_ALL"
}

levant_list = []
neighbor_list = []

for i, ft in enumerate(features):
    props = ft.get("properties", {})
    nid = str(props.get("NUTS_ID", ft.get("id", ""))).strip()
    cntr = str(props.get("CNTR_CODE", "")).strip().upper()
    name = str(props.get("NAME", props.get("HISTORICAL_NAME", f"feat_{i}"))).strip()
    orig = str(props.get("ORIG_ID", "")).strip()

    geom = shape(ft["geometry"])
    if not geom.is_valid:
        geom = make_valid(geom)

    is_levant = (
        nid in levant_ids
        or cntr in {"SYR", "LEB"}
        or nid.startswith("SYR_")
        or nid.startswith("LEB_")
    )

    label = f"{nid or cntr} [{orig or name}] (#{i})"
    if is_levant:
        levant_list.append((label, geom))
    else:
        # Pre-filtro: scansiona solo vicini nel quadrante levantino (lat 31-38.5, lon 34-43.5)
        b = geom.bounds
        if not (b[2] < 34.0 or b[0] > 43.5 or b[3] < 31.5 or b[1] > 38.5):
            neighbor_list.append((label, geom))

print(f"=== AUDIT WATERTIGHTNESS & GEOSTORIA LEVANTE ===")
print(f"Feature Mandato identificate (Siria + Libano): {len(levant_list)} (attese: 22)")
print(f"Poligoni confinanti scansionati nel quadrante: {len(neighbor_list)}")

# 1. Overlap interni tra le 22 province
print("\n--- 1. OVERLAP INTERNI TRA LE 22 PROVINCE DEL MANDATO ---")
internal_overlaps = 0
for i in range(len(levant_list)):
    l1, g1 = levant_list[i]
    b1 = g1.bounds
    for j in range(i + 1, len(levant_list)):
        l2, g2 = levant_list[j]
        b2 = g2.bounds
        if not (b1[2] < b2[0] or b1[0] > b2[2] or b1[3] < b2[1] or b1[1] > b2[3]):
            if g1.intersects(g2):
                inter = g1.intersection(g2)
                if inter.area > 1e-7:
                    print(f"  [CRITICO] Overlap interno tra {l1} e {l2}: {inter.area:.8f} deg²")
                    internal_overlaps += 1

if internal_overlaps == 0:
    print("  ✓ Zero overlap interni tra tutte le 22 province del Mandato.")

# 2. Overlap esterni con i territori confinanti
print("\n--- 2. OVERLAP CON I TERRITORI CONFINANTI NEL DATABASE UNIFICATO ---")
external_overlaps = 0
for l_lbl, l_geom in levant_list:
    lb = l_geom.bounds
    for n_lbl, n_geom in neighbor_list:
        nb = n_geom.bounds
        if not (lb[2] < nb[0] or lb[0] > nb[2] or lb[3] < nb[1] or lb[1] > nb[3]):
            if l_geom.intersects(n_geom):
                inter = l_geom.intersection(n_geom)
                if inter.area > 1e-7:
                    print(f"  [ATTENZIONE] Overlap esterno: {l_lbl} con {n_lbl}: {inter.area:.8f} deg²")
                    external_overlaps += 1

if external_overlaps == 0:
    print("  ✓ Zero overlap con i territori confinanti (Hatay, Turchia, Iraq, Transgiordania, Palestina).")

# 3. Chiusura ermetica dell'unione (watertightness / assenza buchi interni)
print("\n--- 3. VERIFICA TENUTA STAGNA (WATERTIGHTNESS) DELL'INSIEME ---")
union_levant = unary_union([g for _, g in levant_list])

holes = 0
if isinstance(union_levant, Polygon):
    holes = len(union_levant.interiors)
elif isinstance(union_levant, MultiPolygon):
    for p in union_levant.geoms:
        holes += len(p.interiors)

if holes > 0:
    print(f"  [ATTENZIONE] Rilevati {holes} buchi/crepe interne nell'unione del Mandato.")
else:
    print("  ✓ Blocco Mandato continuo e sigillato: zero fessure o buchi interni (*watertight* al 100%).")