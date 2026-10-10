import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { sanitizeTopology } from '../src/data/historicalEngine';
import * as d3 from 'd3';
import * as fs from 'fs';

console.log('=== RIGENERAZIONE E PERFEZIONAMENTO DATASET URSS, BIELORUSSIA E FINLANDIA ===\n');

// 1. Sanitize all features first
for (const f of USSR_REGIONAL_FEATURES) {
  sanitizeTopology(f);
}

// 2. Fix Terijoki / Saint Petersburg:
// In SPB, find any polygon ring with latitude > 60.15 and longitude < 30.15 (Terijoki / Kurortny)
// Move it from SPB to FIN_HIST_259_Vyborgsky_District!
const spb = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_RUS_49_Saint_Petersburg');
const vyborg = USSR_REGIONAL_FEATURES.find(f => f.id === 'FIN_HIST_259_Vyborgsky_District');

const spbPolys = spb.geometry.type === 'MultiPolygon' ? spb.geometry.coordinates : [spb.geometry.coordinates];
const spbKeep: any[] = [];
const terijokiPolys: any[] = [];

for (const poly of spbPolys) {
  let minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
  for (const ring of poly) {
    for (const pt of ring) {
      if (pt[0] < minx) minx = pt[0];
      if (pt[0] > maxx) maxx = pt[0];
      if (pt[1] < miny) miny = pt[1];
      if (pt[1] > maxy) maxy = pt[1];
    }
  }
  // Kurortny / Terijoki polygon sits north of 60.05 and west of 30.25 on the northern shore of Gulf of Finland
  if (miny > 60.05 && minx < 30.25 && maxy > 60.12) {
    terijokiPolys.push(poly);
  } else {
    spbKeep.push(poly);
  }
}

console.log(`Poligoni Terijoki estratti da SPB: ${terijokiPolys.length}`);
spb.geometry = {
  type: spbKeep.length > 1 ? 'MultiPolygon' : 'Polygon',
  coordinates: spbKeep.length > 1 ? spbKeep : spbKeep[0],
};

const vyborgPolys = vyborg.geometry.type === 'MultiPolygon' ? vyborg.geometry.coordinates : [vyborg.geometry.coordinates];
const newVyborgPolys = [...vyborgPolys, ...terijokiPolys];
vyborg.geometry = {
  type: 'MultiPolygon',
  coordinates: newVyborgPolys,
};
vyborg.properties.NUTS_NAME = 'Viipurin lääni — Viipuri, Terijoki e Koivisto (Istmo Careliano)';
vyborg.properties.HISTORICAL_NAME = 'Viipurin lääni — Viipuri, Terijoki e Koivisto (Istmo Careliano)';

// 3. Clip Vitebsk and Minsk
const vitebsk = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_BLR_101_Vitebsk');
const minsk = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_BLR_103_Minsk');

function clipPolygonWest(geom: any, minXCut: number) {
  const polys = geom.type === 'MultiPolygon' ? geom.coordinates : [geom.coordinates];
  const newPolys: any[] = [];
  for (const poly of polys) {
    const newRings: any[] = [];
    for (const ring of poly) {
      const clippedRing = ring.filter((pt: number[]) => pt[0] >= minXCut);
      if (clippedRing.length >= 4) {
        if (clippedRing[0][0] !== clippedRing[clippedRing.length - 1][0] || clippedRing[0][1] !== clippedRing[clippedRing.length - 1][1]) {
          clippedRing.push([...clippedRing[0]]);
        }
        newRings.push(clippedRing);
      }
    }
    if (newRings.length) newPolys.push(newRings);
  }
  return {
    type: newPolys.length > 1 ? 'MultiPolygon' : 'Polygon',
    coordinates: newPolys.length > 1 ? newPolys : newPolys[0],
  };
}

vitebsk.geometry = clipPolygonWest(vitebsk.geometry, 28.25);
minsk.geometry = clipPolygonWest(minsk.geometry, 27.50);

// Re-sanitize all
for (const f of USSR_REGIONAL_FEATURES) {
  sanitizeTopology(f);
}

// Verify Terijoki now in Vyborg
console.log('Terijoki [29.70, 60.19] in Vyborg?', d3.geoContains(vyborg, [29.70, 60.19]));
console.log('Terijoki [29.70, 60.19] in SPB?', d3.geoContains(spb, [29.70, 60.19]));

// Write back to ussrRegions.ts
const code = `// File generato automaticamente: Granularizzazione integrale dell'URSS e Territori di Frontiera (1936-1940)
// Include tutte le suddivisioni ADM1 e i distretti granulari di Leningrado, Carelia, Murmansk, Bessarabia e Crimea ad altissima precisione satellitare
export const USSR_REGIONAL_FEATURES: any[] = ${JSON.stringify(USSR_REGIONAL_FEATURES)};
`;

fs.writeFileSync('src/data/ussrRegions.ts', code, 'utf-8');
console.log('✓ src/data/ussrRegions.ts aggiornato con successo!');
