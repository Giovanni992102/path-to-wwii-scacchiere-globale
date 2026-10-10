import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import polygonClipping from 'polygon-clipping';
import * as d3 from 'd3';

console.log('=== VERIFICA QUALITÀ POST-RICOSTRUZIONE ===\n');

// 1. Verify Bessarabia
const bes = USSR_REGIONAL_FEATURES.filter(f => f.id && f.id.startsWith('ROM_BES_JUD_'));
console.log(`Bessarabia Județe count: ${bes.length}`);

const geomList: any[] = [];
for (const f of bes) {
  const g = f.geometry;
  if (g.type === 'Polygon') geomList.push(g.coordinates);
  else if (g.type === 'MultiPolygon') g.coordinates.forEach((p: any) => geomList.push(p));
}

let merged: any = [geomList[0]];
for (let i = 1; i < geomList.length; i++) {
  merged = polygonClipping.union(merged, [geomList[i]]);
}

let totalHoles = 0;
merged.forEach((poly: any, idx: number) => {
  const numHoles = poly.length - 1;
  totalHoles += numHoles;
  console.log(`  Bessarabia Union Part ${idx}: outer ring ${poly[0].length} pts, inner holes: ${numHoles}`);
});
console.log(`\nTOTALE BUCHI NERI RESIDUI IN BESSARABIA: ${totalHoles} (Prima erano 88!)`);

// 2. Verify Caucasus inner holes
const arm = USSR_REGIONAL_FEATURES.filter(f => f.id && f.id.includes('ARM'));
const aze = USSR_REGIONAL_FEATURES.filter(f => f.id && f.id.includes('AZE'));

let caucHoles = 0;
[...arm, ...aze].forEach(f => {
  const g = f.geometry;
  if (g.type === 'Polygon') {
    if (g.coordinates.length > 1) {
      console.log(`Hole in ${f.id}: ${g.coordinates.length - 1}`);
      caucHoles += g.coordinates.length - 1;
    }
  } else if (g.type === 'MultiPolygon') {
    g.coordinates.forEach((p: any) => {
      if (p.length > 1) {
        console.log(`Hole in ${f.id}: ${p.length - 1}`);
        caucHoles += p.length - 1;
      }
    });
  }
});
console.log(`\nTOTALE BUCHI NERI RESIDUI NEL CAUCASO: ${caucHoles} (Prima erano 4!)`);

// 3. Verify Iran border alignment
const iran = WORLD_1938_GEOJSON.features.find((f: any) => (f.properties?.NAME || '').toLowerCase() === 'iran')!;
const ib = d3.geoBounds(iran as any);
console.log(`\nIran bounding box: Lon [${ib[0][0].toFixed(2)}, ${ib[1][0].toFixed(2)}], Lat [${ib[0][1].toFixed(2)}, ${ib[1][1].toFixed(2)}]`);
const nakh = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_AZE_128_Nakhchivan_Autonomous_Republic')!;
const nb = d3.geoBounds(nakh as any);
console.log(`Nakhchivan bounding box: Lon [${nb[0][0].toFixed(2)}, ${nb[1][0].toFixed(2)}], Lat [${nb[0][1].toFixed(2)}, ${nb[1][1].toFixed(2)}]`);
