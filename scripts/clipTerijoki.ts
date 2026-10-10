import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { sanitizeTopology } from '../src/data/historicalEngine';
import * as d3 from 'd3';
import * as fs from 'fs';

for (const f of USSR_REGIONAL_FEATURES) sanitizeTopology(f);

const spb = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_RUS_49_Saint_Petersburg');
const vyborg = USSR_REGIONAL_FEATURES.find(f => f.id === 'FIN_HIST_259_Vyborgsky_District');

const p2 = spb.geometry.coordinates[2][0]; // Ring 0 of polygon 2

// Separate points into SPB mainland and Terijoki
// The 1920 border starts at [29.98, 60.18] on Gulf of Finland and goes north-east
const terijokiRing: number[][] = [];
const spbRing: number[][] = [];

for (const pt of p2) {
  // If in Terijoki / Kurortny sector (north of 60.05 and west of 30.15 on north shore of Gulf)
  if (pt[1] >= 60.10 && pt[0] <= 30.20) {
    terijokiRing.push(pt);
  } else {
    spbRing.push(pt);
  }
}

console.log(`Punti Terijoki: ${terijokiRing.length} | Punti SPB: ${spbRing.length}`);

// Close rings
if (terijokiRing.length >= 3) {
  terijokiRing.push([...terijokiRing[0]]);
}
if (spbRing.length >= 3) {
  spbRing.push([...spbRing[0]]);
}

spb.geometry.coordinates[2] = [spbRing];
vyborg.geometry.coordinates.push([terijokiRing]);

sanitizeTopology(spb);
sanitizeTopology(vyborg);

console.log('Terijoki [29.70, 60.19] in Vyborg?', d3.geoContains(vyborg, [29.70, 60.19]));
console.log('Terijoki [29.70, 60.19] in SPB?', d3.geoContains(spb, [29.70, 60.19]));
console.log('Leningrad [30.33, 59.93] in SPB?', d3.geoContains(spb, [30.33, 59.93]));

const code = `// File generato automaticamente: Granularizzazione integrale dell'URSS e Territori di Frontiera (1936-1940)
// Include tutte le suddivisioni ADM1 e i distretti granulari di Leningrado, Carelia, Murmansk, Bessarabia e Crimea ad altissima precisione satellitare
export const USSR_REGIONAL_FEATURES: any[] = ${JSON.stringify(USSR_REGIONAL_FEATURES)};
`;

fs.writeFileSync('src/data/ussrRegions.ts', code, 'utf-8');
console.log('✓ Aggiornato ussrRegions.ts!');
