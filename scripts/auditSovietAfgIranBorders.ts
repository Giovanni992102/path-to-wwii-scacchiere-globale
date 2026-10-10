import polygonClipping from 'polygon-clipping';
import * as d3 from 'd3';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { CHINA_REGIONAL_FEATURES } from '../src/data/chinaRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import { HB_EXCL } from '../src/data/georesolver';

function toGeom(g: any): any[] {
  if (!g) return [];
  if (g.type === 'Polygon') return [g.coordinates];
  if (g.type === 'MultiPolygon') return g.coordinates;
  return [];
}

function geomAreaKm2(geom: any): number {
  if (!geom || geom.length === 0) return 0;
  let totalKm2 = 0;
  for (const poly of geom) {
    if (!poly || poly.length === 0) continue;
    // Calculate planar area or spherical area with inverted winding guard
    const f = {
      type: 'Feature',
      properties: {},
      geometry: { type: 'Polygon', coordinates: poly }
    };
    let a = d3.geoArea(f as any);
    if (a > 2 * Math.PI) {
      a = 4 * Math.PI - a;
    }
    totalKm2 += (a / (4 * Math.PI)) * 510072000;
  }
  return totalKm2;
}

function getBBox(g: any) {
  let minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
  const scan = (c: any) => {
    if (typeof c[0] === 'number') {
      minx = Math.min(minx, c[0]);
      maxx = Math.max(maxx, c[0]);
      miny = Math.min(miny, c[1]);
      maxy = Math.max(maxy, c[1]);
    } else c.forEach(scan);
  };
  scan(g.coordinates);
  return { minx, maxx, miny, maxy };
}

function bboxesIntersect(b1: any, b2: any, pad = 0.05) {
  return !(b1.maxx + pad < b2.minx || b1.minx - pad > b2.maxx || b1.maxy + pad < b2.miny || b1.miny - pad > b2.maxy);
}

console.log('=== AUDIT CONFINI URSS - AFGHANISTAN - IRAN ===\n');

const activeHb = WORLD_1938_GEOJSON.features.filter(f => {
  const nm = f.properties?.NAME;
  return nm && !HB_EXCL.has(nm);
});

const iran = activeHb.find(f => f.properties?.NAME === 'Iran')!;
const afghanistan = activeHb.find(f => f.properties?.NAME === 'Afghanistan')!;
const raj = activeHb.find(f => f.properties?.NAME === 'British Raj')!;
const xinjiang = CHINA_REGIONAL_FEATURES.find(f => f.id === 'CHN_XINJIANG')!;

console.log('Features trovate:');
console.log('Iran:', !!iran, 'area:', Math.round(geomAreaKm2(toGeom(iran.geometry))).toLocaleString(), 'km²');
console.log('Afghanistan:', !!afghanistan, 'area:', Math.round(geomAreaKm2(toGeom(afghanistan.geometry))).toLocaleString(), 'km²');
console.log('British Raj:', !!raj, 'area:', Math.round(geomAreaKm2(toGeom(raj.geometry))).toLocaleString(), 'km²');
console.log('Xinjiang:', !!xinjiang, 'area:', Math.round(geomAreaKm2(toGeom(xinjiang.geometry))).toLocaleString(), 'km²');

// Filter Soviet southern border republics:
const sovSouth = USSR_REGIONAL_FEATURES.filter(f => {
  const id = f.id || '';
  return id.includes('AZE') || id.includes('ARM') || id.includes('GEO') ||
         id.includes('TKM') || id.includes('UZB') || id.includes('TJK');
});
console.log('Regioni sovietiche meridionali:', sovSouth.length);

console.log('\n--- 1. OVERLAP AUDIT: URSS vs IRAN ---');
let totalSovIranOverlap = 0;
for (const sf of sovSouth) {
  const b1 = getBBox(sf.geometry);
  const b2 = getBBox(iran.geometry);
  if (!bboxesIntersect(b1, b2)) continue;
  try {
    const inter = polygonClipping.intersection(toGeom(sf.geometry), toGeom(iran.geometry));
    const km2 = geomAreaKm2(inter);
    if (km2 > 0.05) {
      console.log(`⚠️ Overlap: ${sf.id} (${sf.properties?.NUTS_NAME}) vs Iran: ${km2.toFixed(2)} km²`);
      totalSovIranOverlap += km2;
    }
  } catch (e: any) {
    console.error(`Errore clipping ${sf.id} vs Iran:`, e.message);
  }
}
console.log(`Totale Overlap URSS - Iran: ${totalSovIranOverlap.toFixed(2)} km²`);

console.log('\n--- 2. OVERLAP AUDIT: URSS vs AFGHANISTAN ---');
let totalSovAfgOverlap = 0;
for (const sf of sovSouth) {
  const b1 = getBBox(sf.geometry);
  const b2 = getBBox(afghanistan.geometry);
  if (!bboxesIntersect(b1, b2)) continue;
  try {
    const inter = polygonClipping.intersection(toGeom(sf.geometry), toGeom(afghanistan.geometry));
    const km2 = geomAreaKm2(inter);
    if (km2 > 0.05) {
      console.log(`⚠️ Overlap: ${sf.id} (${sf.properties?.NUTS_NAME}) vs Afghanistan: ${km2.toFixed(2)} km²`);
      totalSovAfgOverlap += km2;
    }
  } catch (e: any) {
    console.error(`Errore clipping ${sf.id} vs Afghanistan:`, e.message);
  }
}
console.log(`Totale Overlap URSS - Afghanistan: ${totalSovAfgOverlap.toFixed(2)} km²`);

console.log('\n--- 3. OVERLAP AUDIT: IRAN vs AFGHANISTAN ---');
try {
  const inter = polygonClipping.intersection(toGeom(iran.geometry), toGeom(afghanistan.geometry));
  const km2 = geomAreaKm2(inter);
  console.log(`Overlap Iran vs Afghanistan: ${km2.toFixed(2)} km²`);
} catch (e: any) {
  console.error('Errore clipping Iran vs Afghanistan:', e.message);
}

console.log('\n--- 4. OVERLAP AUDIT: AFGHANISTAN vs XINJIANG ---');
try {
  const inter = polygonClipping.intersection(toGeom(afghanistan.geometry), toGeom(xinjiang.geometry));
  const km2 = geomAreaKm2(inter);
  console.log(`Overlap Afghanistan vs Xinjiang: ${km2.toFixed(2)} km²`);
} catch (e: any) {
  console.error('Errore clipping Afghanistan vs Xinjiang:', e.message);
}

console.log('\n--- 5. OVERLAP AUDIT: AFGHANISTAN vs BRITISH RAJ ---');
try {
  const inter = polygonClipping.intersection(toGeom(afghanistan.geometry), toGeom(raj.geometry));
  const km2 = geomAreaKm2(inter);
  console.log(`Overlap Afghanistan vs British Raj: ${km2.toFixed(2)} km²`);
} catch (e: any) {
  console.error('Errore clipping Afghanistan vs British Raj:', e.message);
}

console.log('\n--- 6. OVERLAP AUDIT: IRAN vs BRITISH RAJ (Baluchistan) ---');
try {
  const inter = polygonClipping.intersection(toGeom(iran.geometry), toGeom(raj.geometry));
  const km2 = geomAreaKm2(inter);
  console.log(`Overlap Iran vs British Raj: ${km2.toFixed(2)} km²`);
} catch (e: any) {
  console.error('Errore clipping Iran vs British Raj:', e.message);
}

console.log('\n--- 7. ANALISI DEI BUCHI NERI / TERRA NULLIUS NELL\'AREA TRI-FRONTIERA ---');
// Bounding box of Soviet-Afghan-Iranian junction: lon [44, 76], lat [34, 42]
const triBox = [
  [[[44.0, 34.0], [76.0, 34.0], [76.0, 42.0], [44.0, 42.0], [44.0, 34.0]]]
];
// Union of all active features in this box
const featsInTri = [
  ...sovSouth.map(f => toGeom(f.geometry)),
  toGeom(iran.geometry),
  toGeom(afghanistan.geometry),
  toGeom(xinjiang.geometry),
  toGeom(raj.geometry)
];

console.log('Unione features nell\'area di frontiera...');
let activeUnion: any[] = [];
for (let i = 0; i < featsInTri.length; i++) {
  try {
    const cropped = polygonClipping.intersection(featsInTri[i], triBox);
    if (cropped.length > 0) {
      activeUnion = activeUnion.length === 0 ? cropped : polygonClipping.union(activeUnion, cropped);
    }
  } catch (e: any) {
    // continue
  }
}

// Gaps = triBox - activeUnion
const gaps = polygonClipping.difference(triBox, activeUnion);
console.log(`Numero di poligoni vuoti (gaps/buchi) nella regione: ${gaps.length}`);
let totalGapArea = 0;
const gapList: any[] = [];
for (const poly of gaps) {
  const km2 = geomAreaKm2([poly]);
  if (km2 > 5) {
    // Centroid of gap
    let cx = 0, cy = 0, n = 0;
    for (const pt of poly[0]) {
      cx += pt[0]; cy += pt[1]; n++;
    }
    cx /= n; cy /= n;
    gapList.push({ km2, cent: [Math.round(cx * 100) / 100, Math.round(cy * 100) / 100] });
    totalGapArea += km2;
  }
}
gapList.sort((a, b) => b.km2 - a.km2);
console.log(`Totale superficie buchi neri (> 5 km²): ${totalGapArea.toFixed(2)} km² in ${gapList.length} buchi principali:`);
for (const g of gapList.slice(0, 15)) {
  console.log(`  - Buco di ${g.km2.toFixed(1)} km² a coordinate [${g.cent[0]}, ${g.cent[1]}]`);
}
