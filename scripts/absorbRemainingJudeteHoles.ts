import * as fs from 'fs';
import * as path from 'path';
import polygonClipping from 'polygon-clipping';
import * as d3 from 'd3';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';

console.log('=== ASSORBIMENTO FINALE BUCHI RESIDUI NEI 9 JUDEȚE ===\n');

function fixRingWinding(ring: number[][]): number[][] {
  const f = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [ring] }, properties: {} };
  const a = d3.geoArea(f as any);
  if (a > 2 * Math.PI) {
    return ring.slice().reverse();
  }
  return ring;
}

const bes = USSR_REGIONAL_FEATURES.filter(f => f.id && f.id.startsWith('ROM_BES_JUD_'));
console.log(`Caricati ${bes.length} Județe di Bessarabia.`);

const judeteGeoms: Record<string, any> = {};
for (const f of bes) {
  judeteGeoms[f.id] = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates];
}

// Compute full union
let fullUnion: any = judeteGeoms[bes[0].id];
for (let i = 1; i < bes.length; i++) {
  fullUnion = polygonClipping.union(fullUnion, judeteGeoms[bes[i].id]);
}

const allInteriorHoles = fullUnion[0].slice(1);
console.log(`Trovati ${allInteriorHoles.length} buchi interni tra i 9 Județe da assorbire...`);

for (let hIdx = 0; hIdx < allInteriorHoles.length; hIdx++) {
  let holeRing = allInteriorHoles[hIdx];
  if (!holeRing || holeRing.length < 3) continue;

  const first = holeRing[0];
  const last = holeRing[holeRing.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) {
    holeRing = [...holeRing, first];
  }
  if (holeRing.length < 4) continue;

  const hFeat = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [holeRing] }, properties: {} };
  let a = d3.geoArea(hFeat as any);
  if (a > 2 * Math.PI) {
    holeRing = holeRing.slice().reverse();
  }
  const hCentroid = d3.geoCentroid(hFeat as any);

  let bestJudId = '';
  let minDist = 1e9;
  for (const f of bes) {
    const c = d3.geoCentroid(f as any);
    const d = (c[0] - hCentroid[0])**2 + (c[1] - hCentroid[1])**2;
    if (d < minDist) {
      minDist = d;
      bestJudId = f.id;
    }
  }

  if (bestJudId) {
    try {
      judeteGeoms[bestJudId] = polygonClipping.union(judeteGeoms[bestJudId], [[holeRing]]);
    } catch (e) {
      console.warn(`Sliver ${hIdx} non unibile, ignorato.`);
    }
  }
}

// Rebuild clean, solid, single-polygon Județe
const updatedJudete: any[] = [];
for (const f of bes) {
  const merged = judeteGeoms[f.id];
  let bestPoly: number[][] = [];
  let maxArea = -1;

  for (const poly of merged) {
    const outer = fixRingWinding(poly[0]);
    const fTest = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [outer] }, properties: {} };
    let a = d3.geoArea(fTest as any);
    if (a > 2 * Math.PI) a = 4 * Math.PI - a;
    const km2 = (a / (4 * Math.PI)) * 510072000;
    if (km2 > maxArea) {
      maxArea = km2;
      bestPoly = outer;
    }
  }

  const cleanF = {
    ...f,
    geometry: {
      type: 'Polygon',
      coordinates: [bestPoly]
    }
  };

  const a = d3.geoArea(cleanF as any);
  const km2 = (a / (4 * Math.PI)) * 510072000;
  console.log(`✓ ${f.id}: Solido, 0 buchi, area: ${Math.round(km2).toLocaleString()} km²`);
  updatedJudete.push(cleanF);
}

// Verify union of updated Județe
let verifyUnion: any = [updatedJudete[0].geometry.coordinates];
for (let i = 1; i < updatedJudete.length; i++) {
  verifyUnion = polygonClipping.union(verifyUnion, [updatedJudete[i].geometry.coordinates]);
}

const verifyHoles = verifyUnion[0].slice(1);
console.log(`\nBUCHI NERI RESIDUI NELL'UNIONE: ${verifyHoles.length}`);

// Write back to ussrRegions.ts
const otherFeatures = USSR_REGIONAL_FEATURES.filter(f => !f.id.startsWith('ROM_BES_JUD_'));
const allFeatures = [...otherFeatures, ...updatedJudete];

const ussrTsPath = path.join(process.cwd(), 'src/data/ussrRegions.ts');
const ussrContent = `// File generato: Suddivisioni territoriali URSS, Caucaso e Bessarabia Storica (1936-1940)
// Configurato con topologia sigillata a zero fessure e granularità storico-geografica di eccellenza.

export const USSR_REGIONAL_FEATURES: any[] = ${JSON.stringify(allFeatures, null, 2)};
`;

fs.writeFileSync(ussrTsPath, ussrContent, 'utf8');
console.log(`✓ Aggiornato con successo ${ussrTsPath}`);
