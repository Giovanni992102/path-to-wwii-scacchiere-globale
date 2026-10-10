import polygonClipping from 'polygon-clipping';
import * as d3 from 'd3-geo';
import { KRESY_POWIAT_FEATURES } from '../src/data/kresyPowiats';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import fs from 'fs';
import path from 'path';
import * as topojson from 'topojson-client';

console.log('=== HEALING DNIESTER & ZBRUCH TRI-BORDER REGION ===');

const nutsRaw = fs.readFileSync('public/data/nuts_10m.json', 'utf8');
const topo = JSON.parse(nutsRaw);
const key = Object.keys(topo.objects)[0];
const nutsFeats = (topojson.feature(topo, topo.objects[key]) as any).features;

function toGeom(g: any): any[] {
  if (!g) return [];
  if (g.type === 'Polygon') return [g.coordinates];
  if (g.type === 'MultiPolygon') return g.coordinates;
  return [];
}

function cleanRingWinding(ring: number[][]): number[][] {
  const f = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [ring] }, properties: {} };
  const a = d3.geoArea(f as any);
  if (a > 2 * Math.PI) {
    return ring.slice().reverse();
  }
  return ring;
}

function roundCoords(c: any, decimals = 4): any {
  const factor = Math.pow(10, decimals);
  if (typeof c[0] === 'number') {
    return [Math.round(c[0] * factor) / factor, Math.round(c[1] * factor) / factor];
  }
  return c.map((x: any) => roundCoords(x, decimals));
}

function safeUnion(a: any[], b: any[]): any[] {
  try {
    return polygonClipping.union(a, b);
  } catch (e) {
    return polygonClipping.union(roundCoords(a, 4), roundCoords(b, 4));
  }
}

function safeDiff(a: any[], b: any[]): any[] {
  try {
    return polygonClipping.difference(a, b);
  } catch (e) {
    return polygonClipping.difference(roundCoords(a, 4), roundCoords(b, 4));
  }
}

const bor = KRESY_POWIAT_FEATURES.find(f => f.id.includes('Borschiv'))!;
const zal = KRESY_POWIAT_FEATURES.find(f => f.id.includes('Zalishchyky'))!;
const sni = KRESY_POWIAT_FEATURES.find(f => f.id.includes('Sniatyn'))!;
const cher = USSR_REGIONAL_FEATURES.find(f => f.id.includes('Chernivtsi'))!;
const khm = USSR_REGIONAL_FEATURES.find(f => f.id.includes('Khmelnytskyi'))!;
const vin = USSR_REGIONAL_FEATURES.find(f => f.id.includes('Vinnytsia'))!;
const hot = USSR_REGIONAL_FEATURES.find(f => f.id.includes('HOTIN'))!;
const ro212 = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'RO212');
const ro215 = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'RO215');

const features: Record<string, any[]> = {
  'Borschiv': toGeom(bor.geometry),
  'Zalishchyky': toGeom(zal.geometry),
  'Sniatyn': toGeom(sni.geometry),
  'Chernivtsi': toGeom(cher.geometry),
  'Hotin': toGeom(hot.geometry),
  'Khmelnytskyi': toGeom(khm.geometry),
  'Vinnytsia': toGeom(vin.geometry),
  'RO212': toGeom(ro212.geometry),
  'RO215': toGeom(ro215.geometry),
};

// 1. Union all
let unionAll = features['Borschiv'];
for (const k of Object.keys(features)) {
  if (k === 'Borschiv') continue;
  unionAll = safeUnion(unionAll, features[k]);
}

const BBOX: any = [[[
  [25.5, 48.0],
  [27.5, 48.0],
  [27.5, 49.0],
  [25.5, 49.0],
  [25.5, 48.0]
]]];

const clipped = polygonClipping.intersection(unionAll, BBOX);
const solidMask = clipped.map((p: any) => [p[0]]);
const allHolesPoly = polygonClipping.difference(solidMask, clipped);
console.log(`Found ${allHolesPoly.length} gaps/holes in tri-border BBOX to heal.`);

// Classify holes by geohistorical sector
const holesByRecipient: Record<string, any[]> = {
  'Borschiv': [],
  'Zalishchyky': [],
  'Khmelnytskyi': [],
  'Vinnytsia': [],
  'Chernivtsi': [],
  'Hotin': [],
};

for (const hp of allHolesPoly) {
  const outer = cleanRingWinding(hp[0]);
  const f = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [outer] }, properties: {} };
  let a = d3.geoArea(f as any);
  if (a > 2 * Math.PI) a = 4 * Math.PI - a;
  
  let c = d3.geoCentroid(f as any);
  if (d3.geoArea(f as any) > 2 * Math.PI) {
    c = [c[0] > 0 ? c[0] - 180 : c[0] + 180, -c[1]];
  }

  let target = 'Chernivtsi';
  if (c[1] >= 48.53 && c[0] <= 26.25) {
    if (c[0] < 26.0) target = 'Zalishchyky';
    else target = 'Borschiv';
  } else if (c[1] >= 48.53 && c[0] > 26.25) {
    if (c[0] >= 27.35) target = 'Vinnytsia';
    else target = 'Khmelnytskyi';
  } else {
    if (c[0] >= 26.65) target = 'Hotin';
    else target = 'Chernivtsi';
  }

  holesByRecipient[target].push([outer]);
}

// Pass 1: Union holes into designated regional recipient
const newFeatures: Record<string, any[]> = {};
for (const [k, origGeom] of Object.entries(features)) {
  const hList = holesByRecipient[k];
  if (hList && hList.length > 0) {
    let merged = origGeom;
    for (const hPoly of hList) {
      merged = safeUnion(merged, [hPoly]);
    }
    newFeatures[k] = merged;
  } else {
    newFeatures[k] = origGeom;
  }
}

// Pass 2: Absorb any micro-holes
let newUnion = newFeatures['Borschiv'];
for (const k of Object.keys(newFeatures)) {
  if (k === 'Borschiv') continue;
  newUnion = safeUnion(newUnion, newFeatures[k]);
}

const newClipped = polygonClipping.intersection(newUnion, BBOX);

for (const p of newClipped) {
  if (p.length > 1) {
    for (let h = 1; h < p.length; h++) {
      const ring = cleanRingWinding(p[h]);
      const f = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [ring] }, properties: {} };
      let c = d3.geoCentroid(f as any);
      if (d3.geoArea(f as any) > 2 * Math.PI) {
        c = [c[0] > 0 ? c[0] - 180 : c[0] + 180, -c[1]];
      }
      let target = 'Chernivtsi';
      if (c[0] >= 27.35) target = 'Vinnytsia';
      else if (c[1] >= 48.50 && c[0] > 26.3) target = 'Khmelnytskyi';
      else if (c[0] >= 26.65) target = 'Hotin';
      newFeatures[target] = safeUnion(newFeatures[target], [[ring]]);
    }
  }
}

// Pairwise Difference Resolution:
// Remove overlaps along international and administrative borders
newFeatures['Chernivtsi'] = safeDiff(newFeatures['Chernivtsi'], newFeatures['Khmelnytskyi']);
newFeatures['Chernivtsi'] = safeDiff(newFeatures['Chernivtsi'], newFeatures['Hotin']);
newFeatures['Chernivtsi'] = safeDiff(newFeatures['Chernivtsi'], newFeatures['Vinnytsia']);
newFeatures['Chernivtsi'] = safeDiff(newFeatures['Chernivtsi'], newFeatures['RO212']);
newFeatures['Chernivtsi'] = safeDiff(newFeatures['Chernivtsi'], newFeatures['RO215']);
newFeatures['Chernivtsi'] = safeDiff(newFeatures['Chernivtsi'], newFeatures['Borschiv']);
newFeatures['Chernivtsi'] = safeDiff(newFeatures['Chernivtsi'], newFeatures['Zalishchyky']);

newFeatures['Hotin'] = safeDiff(newFeatures['Hotin'], newFeatures['RO212']);
newFeatures['Hotin'] = safeDiff(newFeatures['Hotin'], newFeatures['Khmelnytskyi']);
newFeatures['Hotin'] = safeDiff(newFeatures['Hotin'], newFeatures['Vinnytsia']);

newFeatures['Vinnytsia'] = safeDiff(newFeatures['Vinnytsia'], newFeatures['Khmelnytskyi']);

// Reassign tiny detached river meander fragments (< 2.0 km²) to Chernivtsi
function cleanFragmentsToChernivtsi(geom: any[], minAreaKm2: number): any[] {
  const mainParts: any[] = [];
  for (const part of geom) {
    const f = { type: 'Feature', geometry: { type: 'Polygon', coordinates: part }, properties: {} };
    let a = d3.geoArea(f as any);
    if (a > 2 * Math.PI) a = 4 * Math.PI - a;
    const km2 = (a / (4 * Math.PI)) * 510072000;
    if (km2 >= minAreaKm2) {
      mainParts.push(part);
    } else {
      newFeatures['Chernivtsi'] = safeUnion(newFeatures['Chernivtsi'], [part]);
    }
  }
  return mainParts;
}

newFeatures['Hotin'] = cleanFragmentsToChernivtsi(newFeatures['Hotin'], 2.0);
newFeatures['Khmelnytskyi'] = cleanFragmentsToChernivtsi(newFeatures['Khmelnytskyi'], 2.0);

newFeatures['Chernivtsi'] = safeDiff(newFeatures['Chernivtsi'], newFeatures['Hotin']);
newFeatures['Chernivtsi'] = safeDiff(newFeatures['Chernivtsi'], newFeatures['Khmelnytskyi']);

// Pass 3: Absorb post-difference slivers into Chernivtsi / Vinnytsia
let uCheck3 = newFeatures['Borschiv'];
for (const k of Object.keys(newFeatures)) {
  if (k === 'Borschiv') continue;
  uCheck3 = safeUnion(uCheck3, newFeatures[k]);
}
let clCheck3 = polygonClipping.intersection(uCheck3, BBOX);

for (const p of clCheck3) {
  if (p.length > 1) {
    for (let h = 1; h < p.length; h++) {
      const ring = cleanRingWinding(p[h]);
      const f = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [ring] }, properties: {} };
      let c = d3.geoCentroid(f as any);
      if (d3.geoArea(f as any) > 2 * Math.PI) {
        c = [c[0] > 0 ? c[0] - 180 : c[0] + 180, -c[1]];
      }
      let target = 'Chernivtsi';
      if (c[0] >= 27.2) target = 'Vinnytsia';
      newFeatures[target] = safeUnion(newFeatures[target], [[ring]]);
    }
  }
}

// Final topological verification
let finalUnion = newFeatures['Borschiv'];
for (const k of Object.keys(newFeatures)) {
  if (k === 'Borschiv') continue;
  finalUnion = safeUnion(finalUnion, newFeatures[k]);
}

const finalClipped = polygonClipping.intersection(finalUnion, BBOX);

let finalHoles = 0;
for (const p of finalClipped) {
  if (p.length > 1) {
    finalHoles += p.length - 1;
  }
}

function checkOverlap(gA: any[], gB: any[]) {
  const inter = polygonClipping.intersection(gA, gB);
  let totalInterArea = 0;
  for (const p of inter) {
    const f = { type: 'Feature', geometry: { type: 'Polygon', coordinates: p }, properties: {} };
    let a = d3.geoArea(f as any);
    if (a > 2 * Math.PI) a = 4 * Math.PI - a;
    totalInterArea += (a / (4 * Math.PI)) * 510072000;
  }
  return totalInterArea;
}

let maxOverlap = 0;
const checkKeys = ['Borschiv', 'Zalishchyky', 'Chernivtsi', 'Hotin', 'Khmelnytskyi', 'Vinnytsia', 'RO212', 'RO215'];
for (let i = 0; i < checkKeys.length; i++) {
  for (let j = i + 1; j < checkKeys.length; j++) {
    const k1 = checkKeys[i];
    const k2 = checkKeys[j];
    const area = checkOverlap(newFeatures[k1], newFeatures[k2]);
    if (area > maxOverlap) maxOverlap = area;
  }
}

console.log(`\n=== TOPOLOGY AUDIT ===`);
console.log(`Total remaining holes in frontier BBOX: ${finalHoles}`);
console.log(`Max pairwise overlap: ${maxOverlap.toFixed(6)} km²`);
for (const k of ['Borschiv', 'Zalishchyky', 'Chernivtsi', 'Hotin', 'Khmelnytskyi', 'Vinnytsia']) {
  console.log(`  ${k}: parts = ${newFeatures[k].length}, outer vertices = ${newFeatures[k][0][0].length}`);
}

if (finalHoles > 0) {
  throw new Error(`Audit failed: ${finalHoles} holes remaining!`);
}
if (maxOverlap > 0.001) {
  throw new Error(`Audit failed: overlap ${maxOverlap} km² exceeds threshold!`);
}

// Convert to GeoJSON Polygon objects
const newGeoms: Record<string, any> = {
  'PL_KRESY_UKR_70_Borschiv': { type: 'Polygon', coordinates: newFeatures['Borschiv'][0] },
  'PL_KRESY_UKR_72_Zalishchyky': { type: 'Polygon', coordinates: newFeatures['Zalishchyky'][0] },
  'SOV_ADM1_UKR_89_Chernivtsi_Oblast': { type: 'Polygon', coordinates: newFeatures['Chernivtsi'][0] },
  'ROM_BES_JUD_HOTIN': { type: 'Polygon', coordinates: newFeatures['Hotin'][0] },
  'SOV_ADM1_UKR_93_Khmelnytskyi_Oblast': { type: 'Polygon', coordinates: newFeatures['Khmelnytskyi'][0] },
  'SOV_ADM1_UKR_92_Vinnytsia_Oblast': { type: 'Polygon', coordinates: newFeatures['Vinnytsia'][0] },
};

// 1. Update src/data/kresyPowiats.ts
console.log('\nWriting updated Kresy Powiats to src/data/kresyPowiats.ts...');
const updatedKresy = KRESY_POWIAT_FEATURES.map(f => {
  if (newGeoms[f.id]) {
    return { ...f, geometry: newGeoms[f.id] };
  }
  return f;
});

const kresyHeader =
  "// Generated Historical Polish Kresy Powiat Geometries (1938 Configuration)\n// Cleaned, healed, non-overlapping, and aligned with 1921 Peace of Riga line & 1920-1939 demarcation line.\n\nexport const KRESY_POWIAT_FEATURES: any[] = ";

fs.writeFileSync(
  path.join(process.cwd(), 'src/data/kresyPowiats.ts'),
  kresyHeader + JSON.stringify(updatedKresy, null, 2) + ';\n',
  'utf-8'
);
console.log('✓ src/data/kresyPowiats.ts updated successfully.');

// 2. Update src/data/ussrRegions.ts
console.log('Writing updated USSR Regions to src/data/ussrRegions.ts...');
const updatedUssr = USSR_REGIONAL_FEATURES.map(f => {
  if (newGeoms[f.id]) {
    return { ...f, geometry: newGeoms[f.id] };
  }
  return f;
});

const ussrHeader =
  "// Generated USSR Administrative Divisions (1938 Configuration)\n// Cleaned, healed, non-overlapping, and aligned with international borders.\n\nexport const USSR_REGIONAL_FEATURES: any[] = ";

fs.writeFileSync(
  path.join(process.cwd(), 'src/data/ussrRegions.ts'),
  ussrHeader + JSON.stringify(updatedUssr, null, 2) + ';\n',
  'utf-8'
);
console.log('✓ src/data/ussrRegions.ts updated successfully.');
console.log('=== ALL BORDERS SEAMLESSLY HEALED AND SAVED ===');
