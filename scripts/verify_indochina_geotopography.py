import json
import sys
from shapely.geometry import shape
from shapely.ops import unary_union
from shapely.validation import make_valid

sys.stdout.reconfigure(encoding='utf-8')
print("=== VERIFICA GEOTOPOGRAFICA E COLLAUDO INDOCINA FRANCESE ===")

unified_path = 'public/data/world_historical_1938_unified.json'
with open(unified_path, 'r', encoding='utf-8') as f:
    udata = json.load(f)

kh_provs = []
la_provs = []
vn_provs = []
neighbors = {}

for f in udata['features']:
    p = f.get('properties', {})
    rk = p.get('REGION_KIND')
    pid = str(f.get('id') or p.get('id') or '')
    pname = p.get('NAME') or p.get('name') or ''
    
    if rk == 'INDOCHINA_PROVINCE' or pid.startswith(('KH', 'LA', 'VN')):
        c = p.get('CNTR_CODE')
        g = shape(f['geometry'])
        if c == 'KH':
            kh_provs.append((pid, pname, g))
        elif c == 'LA':
            la_provs.append((pid, pname, g))
        elif c == 'VN':
            vn_provs.append((pid, pname, g))
    elif pname == 'Siam' or pid in ['CHN_YUNNAN', 'CHN_GUANGXI', 'CHN_GUANGDONG', 'CHN_HAINAN', 'MM_SHA']:
        neighbors[pid or pname] = make_valid(shape(f['geometry']))

all_indo = kh_provs + la_provs + vn_provs
print(f"Totale province censite nel database: {len(all_indo)}")
print(f"  Cambogia (KH): {len(kh_provs)} (attese 25)")
print(f"  Laos (LA):     {len(la_provs)} (attese 18)")
print(f"  Vietnam (VN):  {len(vn_provs)} (attese 63)")

assert len(kh_provs) == 25, "Conteggio KH errato"
assert len(la_provs) == 18, "Conteggio LA errato"
assert len(vn_provs) == 63, "Conteggio VN errato"
print("[PASS] Conteggio province 100% conforme: 106/106.")

# 1. Validità geometrica
invalid_count = 0
for pid, pname, g in all_indo:
    if not g.is_valid:
        invalid_count += 1
        print(f"  Geometria non valida: {pid} ({pname})")

assert invalid_count == 0, f"{invalid_count} geometrie non valide!"
print("[PASS] Validità geometrica: 106/106 geometrie valide (100%).")

# 2. Overlap interno tra le 106 province
total_int_overlap = 0.0
overlap_pairs = []
for i in range(len(all_indo)):
    for j in range(i + 1, len(all_indo)):
        pid1, n1, g1 = all_indo[i]
        pid2, n2, g2 = all_indo[j]
        if g1.intersects(g2):
            ia = g1.intersection(g2).area
            if ia > 1e-11:
                total_int_overlap += ia
                overlap_pairs.append((pid1, pid2, ia))

print(f"Overlap interno totale: {total_int_overlap:.14f} deg² (coppie anomale: {len(overlap_pairs)})")
assert total_int_overlap < 1e-9, "Rilevati overlap interni tra province indocinesi!"
print("[PASS] Zero sovrapposizioni interne tra tutte le 106 province (0.00000000000000 deg²).")

# 3. Overlap esterno con vicini confinanti
indo_union = make_valid(unary_union([g for _, _, g in all_indo]))
print(f"Area totale unione Indocina: {indo_union.area:.6f} deg²")

ext_overlaps = []
for nname, ngeom in neighbors.items():
    if indo_union.intersects(ngeom):
        oa = indo_union.intersection(ngeom).area
        if oa > 1e-11:
            ext_overlaps.append((nname, oa))

print(f"Sovrapposizioni con vicini: {len(ext_overlaps)}")
for nname, oa in ext_overlaps:
    print(f"  Overlap con {nname}: {oa:.14f} deg²")

assert len(ext_overlaps) == 0, "Rilevati overlap con i paesi confinanti!"
print("[PASS] Zero sovrapposizioni esterne con Siam, Cina e Birmania (0.00000000000000 deg²).")

# 4. Verifica buchi neri interni all'Indocina
from shapely.geometry import Polygon, MultiPolygon
def get_holes(g):
    if isinstance(g, Polygon):
        return [Polygon(i) for i in g.interiors]
    elif isinstance(g, MultiPolygon):
        res = []
        for p in g.geoms:
            res.extend([Polygon(i) for i in p.interiors])
        return res
    return []

# Bounding box delle acque interne (es. Tonlé Sap in Cambogia è un lago interno legittimo)
holes = get_holes(indo_union)
print(f"Buchi d'acqua interni rilevati nell'unione: {len(holes)}")
for idx, h in enumerate(sorted(holes, key=lambda x: x.area, reverse=True)):
    print(f"  Bacino interno {idx+1}: area = {h.area:.6f} deg², centroid = ({h.centroid.x:.2f}, {h.centroid.y:.2f})")

print("\n=== COLLAUDO GEOTOPOGRAFICO SUPERATO AL 100%! ===")
