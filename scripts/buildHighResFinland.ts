import * as fs from 'fs';
import * as d3 from 'd3';
import { sanitizeTopology } from '../src/data/historicalEngine';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';

console.log('=== VERIFICA E POTENZIAMENTO DISTRETTI FINLANDESI AD ALTA RISOLUZIONE ===\n');

const rusNW = JSON.parse(fs.readFileSync('scripts/rus_nw_10m.json', 'utf-8'));
const murmanskNE = rusNW.find((f: any) => f.properties?.name?.includes('Murmansk'));
const kareliaNE = rusNW.find((f: any) => f.properties?.name?.includes('Karelia'));
const leningradNE = rusNW.find((f: any) => f.properties?.name?.includes('Leningrad'));

console.log('Murmansk vertices:', countVertices(murmanskNE));
console.log('Karelia vertices:', countVertices(kareliaNE));
console.log('Leningrad vertices:', countVertices(leningradNE));

function countVertices(f: any): number {
  if (!f.geometry) return 0;
  const polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates];
  let count = 0;
  for (const p of polys) {
    for (const r of p) {
      count += r.length;
    }
  }
  return count;
}

// Check current Finnish features in ussrRegions
const finFeatures = USSR_REGIONAL_FEATURES.filter(f => f.id?.startsWith('FIN_'));
console.log(`\nDistretti finlandesi in ussrRegions (${finFeatures.length}):`);
finFeatures.forEach(f => {
  console.log(`- ${f.id}: ${f.properties?.NUTS_NAME} (Vertici: ${countVertices(f)})`);
});
