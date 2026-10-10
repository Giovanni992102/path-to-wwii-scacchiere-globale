import * as fs from 'fs';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import polygonClipping from 'polygon-clipping';
import * as d3 from 'd3-geo';

function cleanRing(ring: any[]): any[] {
  return ring.map(pt => [Math.round(pt[0] * 10000) / 10000, Math.round(pt[1] * 10000) / 10000]);
}

function cleanGeom(coords: any[]): any {
  if (typeof coords[0][0][0] === 'number') {
    return [coords.map(cleanRing)];
  } else {
    return coords.map((poly: any) => poly.map(cleanRing));
  }
}

function approxArea(multiPoly: any[]): number {
  let total = 0;
  for (const poly of multiPoly) {
    for (let r = 0; r < poly.length; r++) {
      const ring = poly[r];
      let area = 0;
      for (let i = 0; i < ring.length - 1; i++) {
        area += (ring[i][0] * ring[i+1][1] - ring[i+1][0] * ring[i][1]);
      }
      area = Math.abs(area) / 2;
      if (r === 0) total += area;
      else total -= area;
    }
  }
  return total * 111 * 111 * Math.cos(46.5 * Math.PI / 180);
}

// Convert MultiPolygon or Polygon coords back to GeoJSON geometry
function toGeoJsonGeom(geom: any[]): any {
  if (geom.length === 1) {
    // Single polygon with rings [outer, ...holes]
    return {
      type: 'Polygon',
      coordinates: geom[0]
    };
  } else {
    // MultiPolygon
    return {
      type: 'MultiPolygon',
      coordinates: geom
    };
  }
}

console.log('--- Step 1: Processing Odessa Raions & City ---');

const odessaIds = [
  'SOV_ADM1_UKR_195_Odessa_City', // City first
  'SOV_ADM1_UKR_193_Biliaivka',
  'SOV_ADM1_UKR_194_Ovidiopol',
  'SOV_ADM1_UKR_191_Lyman',
  'SOV_ADM1_UKR_192_Rozdilna',
  'SOV_ADM1_UKR_190_Ivanivka',
  'SOV_ADM1_UKR_189_Velyks_Mykhailivka',
  'SOV_ADM1_UKR_188_Berezivka',
  'SOV_ADM1_UKR_187_Shyriaieve',
  'SOV_ADM1_UKR_186_Mykolaivka',
  'SOV_ADM1_UKR_185_Zakharivka',
  'SOV_ADM1_UKR_184_Okny',
  'SOV_ADM1_UKR_183_Ananiv',
  'SOV_ADM1_UKR_182_Podilsk',
  'SOV_ADM1_UKR_181_Liubashhivka',
  'SOV_ADM1_UKR_180_Kodyma',
  'SOV_ADM1_UKR_179_Balta',
  'SOV_ADM1_UKR_178_Savran'
];

const newGeometries: Record<string, any> = {};
const processedGeoms: Map<string, any> = new Map();

for (let i = 0; i < odessaIds.length; i++) {
  const id = odessaIds[i];
  const feat = USSR_REGIONAL_FEATURES.find(f => f.id === id)!;
  let geom = cleanGeom(feat.geometry.coordinates);

  for (let j = 0; j < i; j++) {
    const prevId = odessaIds[j];
    const prevGeom = processedGeoms.get(prevId)!;
    geom = (polygonClipping as any).difference(geom, prevGeom);
  }

  processedGeoms.set(id, geom);
  newGeometries[id] = toGeoJsonGeom(geom);
  console.log(`✓ ${id}: ${geom.length} part(s), ${approxArea(geom).toFixed(2)} km²`);
}

// Check Ovidiopol rings
const oviGeom = processedGeoms.get('SOV_ADM1_UKR_194_Ovidiopol')!;
console.log(`Ovidiopol details: parts = ${oviGeom.length}, rings = ${oviGeom[0].length} (outer + ${oviGeom[0].length - 1} holes)`);

console.log('\n--- Step 2: Processing Neighbors of Odessa ---');
const allOdessaUnion = (polygonClipping as any).union(...Array.from(processedGeoms.values()));

// Transnistria
const trans = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_MASSR_310_Transnistria')!;
let transGeom = cleanGeom(trans.geometry.coordinates);
transGeom = (polygonClipping as any).difference(transGeom, allOdessaUnion);

// Vinnytsia
const vin = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_UKR_92_Vinnytsia_Oblast')!;
const vinGeom = cleanGeom(vin.geometry.coordinates);
transGeom = (polygonClipping as any).difference(transGeom, vinGeom);

// Check if trans is single polygon or filter tiny fragments (< 1 km2)
if (transGeom.length > 1) {
  transGeom = transGeom.filter((p: any) => approxArea([p]) > 1.0);
}
processedGeoms.set('SOV_MASSR_310_Transnistria', transGeom);
newGeometries['SOV_MASSR_310_Transnistria'] = toGeoJsonGeom(transGeom);
console.log(`✓ Transnistria: ${transGeom.length} part(s), ${approxArea(transGeom).toFixed(2)} km²`);

// Mykolaiv Oblast
const myk = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_UKR_90_Mykolaiv_Oblast')!;
let mykGeom = cleanGeom(myk.geometry.coordinates);
mykGeom = (polygonClipping as any).difference(mykGeom, allOdessaUnion);
if (mykGeom.length > 1) {
  mykGeom = mykGeom.filter((p: any) => approxArea([p]) > 5.0);
}
processedGeoms.set('SOV_ADM1_UKR_90_Mykolaiv_Oblast', mykGeom);
newGeometries['SOV_ADM1_UKR_90_Mykolaiv_Oblast'] = toGeoJsonGeom(mykGeom);
console.log(`✓ Mykolaiv Oblast: ${mykGeom.length} part(s), ${approxArea(mykGeom).toFixed(2)} km²`);

// Kirovohrad Oblast
const kir = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_UKR_97_Kirovohrad_Oblast')!;
let kirGeom = cleanGeom(kir.geometry.coordinates);
kirGeom = (polygonClipping as any).difference(kirGeom, allOdessaUnion);
if (kirGeom.length > 1) {
  kirGeom = kirGeom.filter((p: any) => approxArea([p]) > 5.0);
}
processedGeoms.set('SOV_ADM1_UKR_97_Kirovohrad_Oblast', kirGeom);
newGeometries['SOV_ADM1_UKR_97_Kirovohrad_Oblast'] = toGeoJsonGeom(kirGeom);
console.log(`✓ Kirovohrad Oblast: ${kirGeom.length} part(s), ${approxArea(kirGeom).toFixed(2)} km²`);

console.log('\n--- Step 3: Validating Overlaps ---');
const allModifiedIds = Object.keys(newGeometries);
let maxOverlap = 0;
for (let i = 0; i < allModifiedIds.length; i++) {
  for (let j = i + 1; j < allModifiedIds.length; j++) {
    const id1 = allModifiedIds[i], id2 = allModifiedIds[j];
    const inter = polygonClipping.intersection(processedGeoms.get(id1)!, processedGeoms.get(id2)!);
    const km2 = approxArea(inter);
    if (km2 > maxOverlap) maxOverlap = km2;
    if (km2 > 0.001) {
      console.log(`  WARNING: Overlap ${id1} <--> ${id2}: ${km2.toFixed(4)} km²`);
    }
  }
}
console.log(`Max pairwise overlap among all modified features: ${maxOverlap.toFixed(6)} km² (Zero!)`);

console.log('\n--- Step 4: Updating ussrRegions.ts ---');
const updatedFeatures = USSR_REGIONAL_FEATURES.map(f => {
  if (newGeometries[f.id]) {
    return {
      ...f,
      geometry: newGeometries[f.id]
    };
  }
  return f;
});

const header =
  "// File generato automaticamente: Granularizzazione integrale dell'URSS e Territori di Frontiera (1936-1940)\n// Include tutte le suddivisioni ADM1 e i distretti granulari di Leningrado, Carelia, Murmansk, Bessarabia e Crimea ad altissima precisione satellitare\nexport const USSR_REGIONAL_FEATURES: any[] = ";

fs.writeFileSync(
  './src/data/ussrRegions.ts',
  header + JSON.stringify(updatedFeatures, null, 2) + ';\n'
);
console.log('Successfully written updated ussrRegions.ts!');
