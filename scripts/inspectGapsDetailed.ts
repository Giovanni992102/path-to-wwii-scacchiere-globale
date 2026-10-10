import * as fs from 'fs';
import * as path from 'path';
import * as topojson from 'topojson-client';
import { KRESY_POWIAT_FEATURES } from '../src/data/kresyPowiats';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { PRECISION_HISTORICAL_FEATURES } from '../src/data/historicalBorders';
import * as d3 from 'd3';
import polygonClipping from 'polygon-clipping';

function toMultiPoly(geom: any): polygonClipping.Polygon[] {
  if (geom.type === 'Polygon') return [geom.coordinates];
  if (geom.type === 'MultiPolygon') return geom.coordinates;
  return [];
}

function cleanRing(ring: number[][]): number[][] {
  let r = ring.slice();
  if (r[0][0] !== r[r.length - 1][0] || r[0][1] !== r[r.length - 1][1]) {
    r.push([r[0][0], r[0][1]]);
  }
  const f = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [r] } };
  const a = d3.geoArea(f as any);
  if (a > 2 * Math.PI) {
    r = r.slice().reverse();
  }
  return r;
}

async function main() {
  const nutsPath = path.resolve('public/data/nuts_10m.json');
  const topoNuts = JSON.parse(fs.readFileSync(nutsPath, 'utf8'));
  const nutsK = Object.keys(topoNuts.objects)[0];
  const nuts = (topojson.feature(topoNuts, topoNuts.objects[nutsK]) as any).features;

  const provs: any[] = [];
  for (const f of nuts) {
    if (!f.geometry) continue;
    const nid = f.properties && (f.properties.NUTS_ID || f.properties.NUTS_CODE);
    if (nid === 'PL633' || nid === 'PL634' || nid === 'LT023' || nid === 'FRY30' || nid === 'HR031' || nid === 'HR033' || nid?.startsWith('FRY')) continue;
    provs.push(f);
  }
  for (const hf of PRECISION_HISTORICAL_FEATURES) provs.push(hf);
  for (const kf of KRESY_POWIAT_FEATURES) provs.push(kf);
  for (const uf of USSR_REGIONAL_FEATURES) provs.push(uf);

  // 1. Check the triangle between East Prussia, Lithuania, and Poland:
  // bbox around [22.5, 53.8] to [24.0, 54.5]
  console.log('--- 1. BORDER TRIANGLE LT - DE - PL ---');
  const triangleBox: polygonClipping.Polygon = [[
    [22.5, 53.5],
    [24.0, 53.5],
    [24.0, 54.5],
    [22.5, 54.5],
    [22.5, 53.5]
  ]];

  const triangleFeatures = provs.filter(f => {
    const bb = d3.geoBounds(f);
    return !(bb[1][0] < 22.5 || bb[0][0] > 24.0 || bb[1][1] < 53.5 || bb[0][1] > 54.5);
  });

  console.log('Features in triangle area:');
  triangleFeatures.forEach(f => {
    console.log(`- ${f.id || f.properties?.NUTS_ID}: ${f.properties?.name || f.properties?.NUTS_NAME}`);
  });

  let occTri: any = [];
  triangleFeatures.forEach(f => {
    occTri = polygonClipping.union(occTri, toMultiPoly(f.geometry));
  });

  const triVoids = polygonClipping.difference([triangleBox], occTri);
  console.log(`Voids in triangle box: ${triVoids.length}`);
  triVoids.forEach((p, i) => {
    const ring = cleanRing(p[0]);
    const area = d3.geoArea({ type: 'Polygon', coordinates: [ring] } as any) * 6371 * 6371;
    if (area > 1.0) {
      console.log(`Void #${i}: area = ${area.toFixed(2)} km², bbox = [${d3.geoBounds({ type: 'Polygon', coordinates: [ring] } as any)}]`);
    }
  });

  // 2. Check Lithuania vs Poland Kresy
  console.log('\n--- 2. LITHUANIA AND KRESY INTERACTION ---');
  const ltFeats = provs.filter(f => (f.properties?.NUTS_ID || f.id || '').startsWith('LT'));
  const ltVilnius = ltFeats.find(f => (f.properties?.NUTS_ID || f.id) === 'LT011');
  console.log('LT011 (Vilniaus apskritis) present in provs?', !!ltVilnius);
  if (ltVilnius) {
    const a = d3.geoArea(ltVilnius) * 6371 * 6371;
    console.log(`LT011 area: ${a.toFixed(2)} km², bbox: [${d3.geoBounds(ltVilnius)}]`);
  }

  // Which Kresy powiats overlap with Lithuania?
  let ltUnion: any = [];
  ltFeats.forEach(f => { ltUnion = polygonClipping.union(ltUnion, toMultiPoly(f.geometry)); });

  const kresyInLtArea = KRESY_POWIAT_FEATURES.filter(f => {
    const inter = polygonClipping.intersection(ltUnion, toMultiPoly(f.geometry));
    return inter.length > 0;
  });
  console.log(`Kresy powiats overlapping with Lithuania: ${kresyInLtArea.length}`);
  kresyInLtArea.forEach(f => {
    const inter = polygonClipping.intersection(ltUnion, toMultiPoly(f.geometry));
    let totA = 0;
    inter.forEach(p => {
      totA += d3.geoArea({ type: 'Polygon', coordinates: [cleanRing(p[0])] } as any) * 6371 * 6371;
    });
    console.log(`- ${f.id} (${f.properties?.name || f.properties?.NUTS_NAME}): overlap = ${totA.toFixed(2)} km²`);
  });
}

main().catch(console.error);
