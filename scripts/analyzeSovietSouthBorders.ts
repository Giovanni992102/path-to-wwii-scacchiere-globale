import polygonClipping from 'polygon-clipping';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { CHINA_REGIONAL_FEATURES } from '../src/data/chinaRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import { HB_EXCL } from '../src/data/georesolver';

// Convert GeoJSON geometry to polygonClipping Geom format
function toClippingGeom(g: any): any {
  if (!g) return [];
  if (g.type === 'Polygon') {
    return [g.coordinates];
  } else if (g.type === 'MultiPolygon') {
    return g.coordinates;
  }
  return [];
}

// Compute area in approx degrees^2
function geomArea(geom: any): number {
  let total = 0;
  for (const poly of geom) {
    for (let r = 0; r < poly.length; r++) {
      const ring = poly[r];
      let a = 0;
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        a += (ring[j][0] * ring[i][1]) - (ring[i][0] * ring[j][1]);
      }
      const sign = r === 0 ? 1 : -1;
      total += sign * Math.abs(a) / 2;
    }
  }
  return total;
}

// Bounding box of geometry
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

function bboxesIntersect(b1: any, b2: any, pad = 0.01) {
  return !(b1.maxx + pad < b2.minx || b1.minx - pad > b2.maxx || b1.maxy + pad < b2.miny || b1.miny - pad > b2.maxy);
}

console.log('=== ANALISI CONFINI MERIDIONALI SOVIETICI E STATI CONFINANTI ===\n');

// 1. Gather all active entities along USSR southern border
const activeUssr = USSR_REGIONAL_FEATURES;
const activeChina = CHINA_REGIONAL_FEATURES;
const activeHb = WORLD_1938_GEOJSON.features.filter(f => {
  const nm = f.properties?.NAME;
  return nm && !HB_EXCL.has(nm);
});

// Neighboring countries in HB:
const iran = activeHb.find(f => f.properties?.NAME === 'Iran');
const afghanistan = activeHb.find(f => f.properties?.NAME === 'Afghanistan');
const mongolia = activeHb.find(f => f.properties?.NAME === 'Mongolia');
const xinjiangHB = activeHb.find(f => f.properties?.NAME === 'Xinjiang');
const tibetHB = activeHb.find(f => f.properties?.NAME === 'Tibet');

console.log('Iran HB present:', !!iran);
console.log('Afghanistan HB present:', !!afghanistan);
console.log('Mongolia HB present:', !!mongolia);
console.log('Xinjiang HB present (DUPLICATE?):', !!xinjiangHB);
console.log('Tibet HB present (DUPLICATE?):', !!tibetHB);

// Neighboring entities in China:
const xinjiangProv = activeChina.find(f => f.id === 'CHN_XINJIANG');
const tibetProv = activeChina.find(f => f.id === 'CHN_TIBET');
const innerMongolia = activeChina.find(f => f.id === 'CHN_INNER_MONGOLIA');
const gansu = activeChina.find(f => f.id === 'CHN_GANSU');
const qinghai = activeChina.find(f => f.id === 'CHN_QINGHAI');
const manchuriaXinganN = activeChina.find(f => f.id === 'CHN_MANCHUKUO_XINGAN_NORTH');
const manchuriaHeilongjiang = activeChina.find(f => f.id === 'CHN_HEILONGJIANG');

console.log('\n--- 1. OVERLAP CHECK: HB vs CHINA PROVINCES ---');
if (xinjiangHB && xinjiangProv) {
  try {
    const inter = polygonClipping.intersection(toClippingGeom(xinjiangHB.geometry), toClippingGeom(xinjiangProv.geometry));
    console.log('OVERLAP xinjiangHB vs CHN_XINJIANG area:', geomArea(inter).toFixed(4), 'deg^2');
  } catch (e: any) {
    console.log('Error clipping xinjiang:', e.message);
  }
}

if (tibetHB && tibetProv) {
  try {
    const inter = polygonClipping.intersection(toClippingGeom(tibetHB.geometry), toClippingGeom(tibetProv.geometry));
    console.log('OVERLAP tibetHB vs CHN_TIBET area:', geomArea(inter).toFixed(4), 'deg^2');
  } catch (e: any) {
    console.log('Error clipping tibet:', e.message);
  }
}

console.log('\n--- 2. OVERLAP CHECK: USSR vs IRAN, AFGHANISTAN, MONGOLIA, XINJIANG ---');
const checkOverlap = (name1: string, f1: any, name2: string, f2: any) => {
  if (!f1 || !f2) return;
  const b1 = getBBox(f1.geometry);
  const b2 = getBBox(f2.geometry);
  if (!bboxesIntersect(b1, b2)) return;
  try {
    const inter = polygonClipping.intersection(toClippingGeom(f1.geometry), toClippingGeom(f2.geometry));
    const area = geomArea(inter);
    if (area > 0.001) {
      console.log(`OVERLAP between ${name1} and ${name2}: ${area.toFixed(4)} deg^2 (bbox [${b1.minx.toFixed(1)}, ${b1.miny.toFixed(1)}]-[${b1.maxx.toFixed(1)}, ${b1.maxy.toFixed(1)}])`);
    }
  } catch (e: any) {
    console.log(`Error clipping ${name1} vs ${name2}:`, e.message);
  }
};

// Check USSR features against neighbors
for (const uf of activeUssr) {
  const uName = uf.properties?.HISTORICAL_NAME || uf.id;
  checkOverlap(uName, uf, 'Iran', iran);
  checkOverlap(uName, uf, 'Afghanistan', afghanistan);
  checkOverlap(uName, uf, 'Mongolia', mongolia);
  checkOverlap(uName, uf, 'CHN_XINJIANG', xinjiangProv);
  checkOverlap(uName, uf, 'CHN_HEILONGJIANG', manchuriaHeilongjiang);
  checkOverlap(uName, uf, 'CHN_MANCHUKUO_XINGAN_NORTH', manchuriaXinganN);
}

console.log('\n--- 3. OVERLAP CHECK: MONGOLIA vs NEIGHBORS ---');
checkOverlap('Mongolia', mongolia, 'CHN_XINJIANG', xinjiangProv);
checkOverlap('Mongolia', mongolia, 'CHN_INNER_MONGOLIA', innerMongolia);
checkOverlap('Mongolia', mongolia, 'CHN_GANSU', gansu);
checkOverlap('Mongolia', mongolia, 'CHN_MANCHUKUO_XINGAN_NORTH', manchuriaXinganN);

console.log('\n--- 4. OVERLAP CHECK: XINJIANG vs NEIGHBORS ---');
checkOverlap('CHN_XINJIANG', xinjiangProv, 'Afghanistan', afghanistan);
checkOverlap('CHN_XINJIANG', xinjiangProv, 'CHN_TIBET', tibetProv);
checkOverlap('CHN_XINJIANG', xinjiangProv, 'CHN_QINGHAI', qinghai);
checkOverlap('CHN_XINJIANG', xinjiangProv, 'CHN_GANSU', gansu);

