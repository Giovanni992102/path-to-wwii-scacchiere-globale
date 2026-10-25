from PIL import Image
import numpy as np
import json

img = Image.open(r"C:\Users\ziani\.gemini\antigravity\brain\3a990d33-0e75-4f0f-8c39-a9577aa89f88\.user_uploaded\media_1792875406126_275db42c.jpg")
arr = np.array(img)

def px_to_geo(x, y):
    lon = -75.166667 + (x - 373) * (0.0833333 / 289.5)
    lat = 20.000000 - (y - 385) * (0.0833333 / 308.0)
    return round(lon, 6), round(lat, 6)

# Trace the southern coast from x = 141 to x = 650:
# The sea is characterized by high blue and white breakers along the coast.
# In rows 700 to 790, find for each column the coastline point:
# Land is above (y < coast_y), sea is below (y > coast_y).
coast_pts = []
for x in range(141, 651, 3):
    # Find the transition from land to sea
    # Sea is blueish (B > 180, R < 170, or B - R > 20)
    # Let's inspect along column x in rows 710 to 780:
    coast_y = 750 # default
    for y in range(710, 785):
        r, g, b = arr[y, x, :3]
        # Look for sea: high blue/cyan water, typically R in [170-210], G in [195-225], B in [210-235] and B > R + 10
        if int(b) - int(r) > 12 and b > 185 and y > 720:
            coast_y = y
            break
    coast_pts.append((x, coast_y))

print(f"Sampled {len(coast_pts)} coastline points.")
print("First 3:", coast_pts[:3])
print("Last 3:", coast_pts[-3:])

# Construct full boundary ring (clockwise):
# 1. Start at southwest terminus on coast: (141, 747)
# 2. Go North along western vertical boundary to west corner: (141, 622)
# 3. Go North-East along diagonal boundary to northwest corner: (283, 480)
# 4. Go East along northern horizontal boundary to northeast corner: (650, 480)
# 5. Go South along eastern vertical boundary to southeast terminus on coast: (650, 748)
# 6. Follow coast westward from (650, 748) back to (141, 747)

ring_px = []
ring_px.append((141, 747))
ring_px.append((141, 622))
ring_px.append((283, 480))
ring_px.append((650, 480))
ring_px.append((650, 748))

# Add coast points in reverse (from east to west):
for x, y in reversed(coast_pts):
    ring_px.append((x, y))

# Close the ring:
ring_px.append((141, 747))

# Convert to geo coordinates [lon, lat]:
ring_geo = [list(px_to_geo(x, y)) for x, y in ring_px]

# Save as test GeoJSON
gtmo_feat = {
    "type": "Feature",
    "id": "US_GUANTANAMO",
    "properties": {
        "id": "US_GUANTANAMO",
        "name": "Guantanamo Bay Naval Base",
        "NAME": "Guantanamo Bay Naval Base (U.S. Navy — Cuba)",
        "HISTORICAL_NAME": "Guantanamo Bay Naval Base (U.S. Navy — Cuba)",
        "MODERN_NAME": "Base Navale di Guantanamo (Baia di Guantanamo, USA / Cuba)",
        "ADMIN": "U.S. Naval Operating Base Guantanamo Bay (Treaty of 1934)",
        "ADMIN_TITLE": "U.S. Naval Operating Base Guantanamo Bay (Treaty of 1934)",
        "SOVEREIGN": "USA",
        "CNTR_CODE": "USA",
        "CNTR_NAME": "Stati Uniti d'America",
        "ISO3_CODE": "USA",
        "REGION_KIND": "US_MILITARY_BASE",
        "__layer": "prov"
    },
    "geometry": {
        "type": "Polygon",
        "coordinates": [ring_geo]
    }
}

from shapely.geometry import shape
gtmo_shape = shape(gtmo_feat["geometry"])
print("Guantanamo shape area:", gtmo_shape.area)
print("Guantanamo shape bounds:", gtmo_shape.bounds)
print("Is valid:", gtmo_shape.is_valid)

# Save to scratch
with open("scripts/gtmo_test.geojson", "w", encoding="utf-8") as f:
    json.dump(gtmo_feat, f, indent=2)
