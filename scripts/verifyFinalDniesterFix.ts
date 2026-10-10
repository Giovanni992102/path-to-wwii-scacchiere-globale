import polygonClipping from 'polygon-clipping';
import * as d3 from 'd3-geo';
import { KRESY_POWIAT_FEATURES } from '../src/data/kresyPowiats';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import fs from 'fs';
import * as topojson from 'topojson-client';

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

const bor = KRESY_POWIAT_FEATURES.find(f => f.id === 'PL_KRESY_UKR_70_Borschiv')!;
const zal = KRESY_POWIAT_FEATURES.find(f => f.id === 'PL_KRESY_UKR_72_Zalishchyky')!;
const sni = KRESY_POWIAT_FEATURES.find(f => f.id.includes('Sniatyn'))!;
const cher = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_UKR_89_Chernivtsi_Oblast')!;
const khm = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_UKR_93_Khmelnytskyi_Oblast')!;
const vin = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_UKR_92_Vinnytsia_Oblast')!;
const hot = USSR_REGIONAL_FEATURES.find(f => f.id === 'ROM_BES_JUD_HOTIN')!;
const ro212 = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'RO212')!;
const ro215 = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'RO215')!;

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

let unionAll = features['Borschiv'];
for (const k of Object.keys(features)) {
  if (k === 'Borschiv') continue;
  unionAll = polygonClipping.union(unionAll, features[k]);
}

const BBOX: any = [[[
  [25.5, 48.0],
  [27.5, 48.0],
  [27.5, 49.0],
  [25.5, 49.0],
  [25.5, 48.0]
]]];

const clipped = polygonClipping.intersection(unionAll, BBOX);

let holeCount = 0;
for (const p of clipped) {
  if (p.length > 1) {
    holeCount += p.length - 1;
  }
}

console.log(`=== LIVE DATA VERIFICATION ===`);
console.log(`HOLES IN BBOX: ${holeCount}`);

let maxOverlap = 0;
const checkKeys = ['Borschiv', 'Zalishchyky', 'Chernivtsi', 'Hotin', 'Khmelnytskyi', 'Vinnytsia', 'RO212', 'RO215'];
for (let i = 0; i < checkKeys.length; i++) {
  for (let j = i + 1; j < checkKeys.length; j++) {
    const k1 = checkKeys[i];
    const k2 = checkKeys[j];
    const inter = polygonClipping.intersection(features[k1], features[k2]);
    let totalInterArea = 0;
    for (const p of inter) {
      const f = { type: 'Feature', geometry: { type: 'Polygon', coordinates: p }, properties: {} };
      let a = d3.geoArea(f as any);
      if (a > 2 * Math.PI) a = 4 * Math.PI - a;
      totalInterArea += (a / (4 * Math.PI)) * 510072000;
    }
    if (totalInterArea > maxOverlap) maxOverlap = totalInterArea;
  }
}
console.log(`MAX OVERLAP: ${maxOverlap.toFixed(6)} km²`);
for (const k of ['Borschiv', 'Zalishchyky', 'Chernivtsi', 'Hotin', 'Khmelnytskyi', 'Vinnytsia']) {
  console.log(`  ${k}: Polygon, outer vertices = ${features[k][0][0].length}`);
}
