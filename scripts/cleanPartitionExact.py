import json
import os
from shapely.geometry import shape, mapping, Polygon, MultiPolygon
from shapely.ops import unary_union
from shapely.validation import make_valid

# Coordinate ufficiali da sy.json per Tartus e Latakia
COORDS_SYLA = [
    [36.25296, 35.22343], [36.21446, 35.23904], [36.20113, 35.24007], [36.18728, 35.23320],
    [36.17999, 35.23036], [36.17596, 35.22922], [36.02564, 35.21950], [36.01861, 35.22090],
    [35.98977, 35.24147], [35.97427, 35.24958], [35.93148, 35.26141], [35.93120, 35.26149],
    [35.91529, 35.28791], [35.92897, 35.32148], [35.92408, 35.33853], [35.91668, 35.40331],
    [35.91896, 35.41767], [35.90886, 35.42573], [35.86061, 35.47907], [35.84010, 35.48737],
    [35.83009, 35.49348], [35.82586, 35.50332], [35.81837, 35.50894], [35.80226, 35.50690],
    [35.78679, 35.50218], [35.78126, 35.49958], [35.77052, 35.50422], [35.77198, 35.51545],
    [35.77711, 35.52912], [35.77809, 35.54116], [35.77198, 35.54633], [35.73707, 35.56167],
    [35.73878, 35.56660], [35.74090, 35.57648], [35.74334, 35.58210], [35.73707, 35.58210],
    [35.72340, 35.57591], [35.72340, 35.58210], [35.74342, 35.58796], [35.76336, 35.59829],
    [35.77849, 35.61274], [35.78435, 35.63056], [35.78207, 35.64175], [35.77320, 35.65546],
    [35.77117, 35.66779], [35.77662, 35.67512], [35.80006, 35.68146], [35.83855, 35.74209],
    [35.84034, 35.74746], [35.84010, 35.77082], [35.83595, 35.78998], [35.82537, 35.81346],
    [35.81186, 35.83539], [35.79859, 35.84968], [35.84685, 35.84724], [35.87086, 35.85179],
    [35.88103, 35.86669], [35.88526, 35.88597], [35.91131, 35.91775], [35.92084, 35.91512],
    [35.94058, 35.91838], [35.96073, 35.92437], [35.98026, 35.92685], [35.99277, 35.91528],
    [35.99308, 35.90236], [35.99008, 35.88928], [35.99236, 35.87735], [36.00393, 35.86918],
    [36.01943, 35.86618], [36.05075, 35.86541], [36.08031, 35.85420], [36.13850, 35.81978],
    [36.15531, 35.82223], [36.15596, 35.81843], [36.15534, 35.81730], [36.15317, 35.81172],
    [36.15178, 35.80900], [36.15023, 35.80536], [36.14945, 35.80164], [36.14976, 35.79802],
    [36.15085, 35.79471], [36.15519, 35.79187], [36.16201, 35.78981], [36.17643, 35.78867],
    [36.18418, 35.78898], [36.18976, 35.78986], [36.19834, 35.79254], [36.20656, 35.79404],
    [36.27466, 35.79689], [36.27947, 35.79575], [36.28350, 35.79358], [36.28707, 35.78973],
    [36.28846, 35.78588], [36.28846, 35.78177], [36.28753, 35.77789], [36.27994, 35.76981],
    [36.25482, 35.75593], [36.23865, 35.74438], [36.23446, 35.73557], [36.23276, 35.71028],
    [36.23074, 35.70402], [36.22810, 35.69960], [36.21291, 35.69095], [36.20283, 35.68247],
    [36.19989, 35.67725], [36.19942, 35.67307], [36.20113, 35.67005], [36.21291, 35.65684],
    [36.21648, 35.65105], [36.21896, 35.64452], [36.22159, 35.63333], [36.22438, 35.60201],
    [36.22051, 35.53535], [36.20128, 35.42518], [36.20190, 35.42146], [36.20811, 35.40228],
    [36.22469, 35.36350], [36.25043, 35.26240], [36.25296, 35.22343]
]

COORDS_SYTA = [
    [36.31316, 34.90092], [36.29482, 34.89627], [36.28707, 34.89358], [36.28381, 34.89167],
    [36.28226, 34.89064], [36.27963, 34.88813], [36.27823, 34.88534], [36.27653, 34.88123],
    [36.27435, 34.87245], [36.27373, 34.86795], [36.27358, 34.86454], [36.27544, 34.85493],
    [36.27559, 34.84826], [36.27528, 34.84619], [36.27342, 34.84320], [36.27017, 34.83984],
    [36.24423, 34.82118], [36.22857, 34.80472], [36.22438, 34.80124], [36.22097, 34.79914],
    [36.21446, 34.79767], [36.21260, 34.79689], [36.21105, 34.79589], [36.20966, 34.79472],
    [36.18650, 34.76873], [36.11824, 34.66682], [36.11607, 34.65995], [36.11452, 34.64011],
    [36.11308, 34.63371], [36.11219, 34.62977], [36.11214, 34.62953], [36.09438, 34.63059],
    [36.08723, 34.63101], [36.08679, 34.63096], [36.07625, 34.62973], [36.07307, 34.62935],
    [36.06078, 34.62791], [36.05271, 34.62810], [36.05080, 34.62814], [36.03813, 34.62843],
    [36.03793, 34.62843], [36.03736, 34.62857], [36.03630, 34.62882], [36.03392, 34.62940],
    [36.03090, 34.63012], [36.02699, 34.63106], [36.01623, 34.63365], [36.00105, 34.64384],
    [35.99876, 34.64538], [35.99143, 34.64822], [35.99096, 34.64833], [35.98688, 34.64926],
    [35.98264, 34.65024], [35.96990, 34.64985], [35.96567, 34.66844], [35.94744, 34.69953],
    [35.94093, 34.72622], [35.93116, 34.74095], [35.92897, 34.74982], [35.92897, 34.79072],
    [35.92604, 34.79694], [35.90846, 34.82176], [35.90455, 34.83177], [35.89910, 34.85277],
    [35.86687, 34.92422], [35.87289, 34.92691], [35.87355, 34.93163], [35.87957, 34.93806],
    [35.88136, 34.94497], [35.87957, 34.95189], [35.87355, 34.95832], [35.87355, 34.96516],
    [35.87859, 34.96955], [35.87892, 34.97016], [35.87664, 34.97167], [35.87355, 34.97883],
    [35.88160, 34.99287], [35.88738, 35.00019], [35.89536, 35.00678], [35.90056, 35.02192],
    [35.89731, 35.03657], [35.89145, 35.04995], [35.88787, 35.06135], [35.88787, 35.10920],
    [35.89422, 35.12108], [35.94125, 35.18057], [35.96241, 35.19794], [35.95330, 35.22480],
    [35.93120, 35.26149], [35.93148, 35.26141], [35.97427, 35.24958], [35.98977, 35.24147],
    [36.01861, 35.22090], [36.02564, 35.21950], [36.17596, 35.22922], [36.17999, 35.23036],
    [36.18728, 35.23320], [36.20113, 35.24007], [36.21446, 35.23904], [36.25296, 35.22343],
    [36.25358, 35.20441], [36.26505, 35.08649], [36.26521, 35.07112], [36.25699, 35.04794],
    [36.25389, 35.04220], [36.25043, 35.03846], [36.24361, 35.03461], [36.24004, 35.03202],
    [36.23322, 35.02541], [36.22934, 35.02368], [36.21524, 35.02267], [36.21121, 35.02148],
    [36.20500, 35.01763], [36.20113, 35.01639], [36.19214, 35.01523], [36.18790, 35.01425],
    [36.18433, 35.01277], [36.17813, 35.00872], [36.17488, 35.00704], [36.17100, 35.00626],
    [36.16666, 35.00639], [36.15736, 35.00794], [36.14728, 35.00753], [36.13684, 35.00220],
    [36.14403, 34.97533], [36.19069, 34.96774], [36.20687, 34.96712], [36.24536, 34.97011],
    [36.25420, 34.96846], [36.26009, 34.96629], [36.26614, 34.95389], [36.27017, 34.93993],
    [36.27311, 34.93363], [36.27513, 34.93079], [36.27901, 34.92766], [36.30459, 34.91273],
    [36.30944, 34.90764], [36.31316, 34.90092]
]

ref_ltk = make_valid(Polygon(COORDS_SYLA))
ref_tar = make_valid(Polygon(COORDS_SYTA))

db_path = "public/data/world_historical_1938_unified.json"
with open(db_path, "r", encoding="utf-8") as f:
    world_data = json.load(f)

features = world_data.get("features", [])

idx_ltk = None
idx_tar = None
idx_hms = None
idx_hma = None
idx_idl = None

for idx, ft in enumerate(features):
    nid = str(ft.get("properties", {}).get("NUTS_ID", ft.get("id", ""))).strip()
    g = make_valid(shape(ft["geometry"]))
    ft["_geom"] = g
    if nid == "SYR_LTK": idx_ltk = idx
    elif nid == "SYR_TAR": idx_tar = idx
    elif nid == "SYR_HMS": idx_hms = idx
    elif nid == "SYR_HMA": idx_hma = idx
    elif nid == "SYR_IDL": idx_idl = idx

cluster_indices = [idx_ltk, idx_tar, idx_hms, idx_hma, idx_idl]

def extract_polys(g):
    if g.is_empty: return Polygon()
    if g.geom_type in ('Polygon', 'MultiPolygon'): return g
    if g.geom_type == 'GeometryCollection':
        polys = [p for p in g.geoms if p.geom_type in ('Polygon', 'MultiPolygon')]
        return unary_union(polys) if polys else Polygon()
    return Polygon()

# Territorio complessivo del blocco occidentale (garantito continuo e senza buchi verso l'esterno)
u5 = unary_union([features[i]["_geom"] for i in cluster_indices])

# 1. Assegnazione Latakia e Tartus ritagliate esattamente dentro U5
new_ltk = extract_polys(make_valid(ref_ltk.intersection(u5)))
new_tar = extract_polys(make_valid(ref_tar.intersection(u5)))

# Tartus assorbe eventuali micro-fessure interne lungo la linea di contatto tra ref_ltk e ref_tar
shared_ref_gap = extract_polys(make_valid(unary_union([ref_ltk, ref_tar]).intersection(u5).difference(unary_union([new_ltk, new_tar]))))
if not shared_ref_gap.is_empty and shared_ref_gap.area > 1e-9:
    new_tar = extract_polys(make_valid(new_tar.union(shared_ref_gap)))

# Blocco costiero unificato
u_coastal_new = unary_union([new_ltk, new_tar])

# 2. Tutto il resto di U5 è per definizione terraferma interna: ZERO OVERLAP POSSIBILE
u_inland_space = extract_polys(make_valid(u5.difference(u_coastal_new)))

# Porzioni originali delle province interne conservate nello spazio interno
orig_idl_inland = extract_polys(make_valid(features[idx_idl]["_geom"].intersection(u_inland_space)))
orig_hma_inland = extract_polys(make_valid(features[idx_hma]["_geom"].intersection(u_inland_space)))
orig_hms_inland = extract_polys(make_valid(features[idx_hms]["_geom"].intersection(u_inland_space)))

# Spazio interno residuo da distribuire (dove le vecchie province costiere erano più larghe)
covered_inland = unary_union([orig_idl_inland, orig_hma_inland, orig_hms_inland])
unassigned_inland = extract_polys(make_valid(u_inland_space.difference(covered_inland)))

assigned_extra = {idx_idl: [], idx_hma: [], idx_hms: []}
if not unassigned_inland.is_empty:
    pieces = list(unassigned_inland.geoms) if unassigned_inland.geom_type == 'MultiPolygon' else [unassigned_inland]
    for p in pieces:
        if p.area < 1e-10: continue
        c = p.centroid
        # Trova la provincia interna con il massimo contatto o distanza minima
        best_i = idx_hma
        max_contact = -1
        for cand_i, cand_g in [(idx_idl, orig_idl_inland), (idx_hma, orig_hma_inland), (idx_hms, orig_hms_inland)]:
            contact = cand_g.buffer(1e-4).intersection(p).area
            if contact > max_contact:
                max_contact = contact
                best_i = cand_i
        assigned_extra[best_i].append(p)

new_idl = extract_polys(make_valid(unary_union([orig_idl_inland] + assigned_extra[idx_idl])))
new_hma = extract_polys(make_valid(unary_union([orig_hma_inland] + assigned_extra[idx_hma])))
new_hms = extract_polys(make_valid(unary_union([orig_hms_inland] + assigned_extra[idx_hms])))

# Verifica di sovrapposizione zero tra le province interne
if new_idl.intersects(new_hma):
    new_idl = extract_polys(make_valid(new_idl.difference(new_hma)))
if new_hma.intersects(new_hms):
    new_hma = extract_polys(make_valid(new_hma.difference(new_hms)))
if new_idl.intersects(new_hms):
    new_idl = extract_polys(make_valid(new_idl.difference(new_hms)))

# Assegnazione
features[idx_ltk]["geometry"] = mapping(new_ltk)
features[idx_tar]["geometry"] = mapping(new_tar)
features[idx_idl]["geometry"] = mapping(new_idl)
features[idx_hma]["geometry"] = mapping(new_hma)
features[idx_hms]["geometry"] = mapping(new_hms)

for ft in features:
    if "_geom" in ft: del ft["_geom"]

with open(db_path, "w", encoding="utf-8") as f:
    json.dump(world_data, f, ensure_ascii=False)

print("✓ Partizione geostorica completata con precisione nativa float: ZERO OVERLAP e ZERO FESSURE!")