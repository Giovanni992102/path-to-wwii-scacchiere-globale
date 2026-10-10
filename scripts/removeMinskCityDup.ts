import * as fs from 'fs';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { sanitizeTopology } from '../src/data/historicalEngine';

const filtered = USSR_REGIONAL_FEATURES.filter(f => f.id !== 'SOV_ADM1_BLR_104_Minsk_City');

for (const f of filtered) {
  sanitizeTopology(f);
}

const ussrCode = `// File generato automaticamente: Granularizzazione integrale dell'URSS e Territori di Frontiera (1936-1940)
// Include tutte le suddivisioni ADM1 e i distretti granulari di Leningrado, Carelia, Murmansk, Bessarabia e Crimea ad altissima precisione satellitare
export const USSR_REGIONAL_FEATURES: any[] = ${JSON.stringify(filtered)};
`;
fs.writeFileSync('src/data/ussrRegions.ts', ussrCode, 'utf-8');
console.log('✓ Rimosso Minsk_City duplicato e aggiornato ussrRegions.ts!');
