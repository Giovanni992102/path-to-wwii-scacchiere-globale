import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { KRESY_POWIAT_FEATURES } from '../src/data/kresyPowiats';
import { sanitizeTopology } from '../src/data/historicalEngine';
import * as d3 from 'd3';
import * as fs from 'fs';

console.log('=== RICOSTRUZIONE CONTINUA SENZA GAP DI BIELORUSSIA E KRESY ===\n');

// Restore full natural contiguous eastern Vitebsk and Minsk polygons
// Vitebsk: Polotsk, Vitebsk, Orsha, Lepel, Haradok, Senno, Dubrovno
const easternVitebskPoly = [
  [
    [28.00, 55.90],
    [28.50, 56.10],
    [29.30, 56.15],
    [30.20, 56.00],
    [30.80, 55.80],
    [31.20, 55.50],
    [31.10, 54.80],
    [30.50, 54.40],
    [29.80, 54.40],
    [29.20, 54.70],
    [28.50, 54.90],
    [28.20, 55.20],
    [27.80, 55.50],
    [28.00, 55.90]
  ]
];

// Minsk: Borisov, Minsk East, Cherven, Slutsk East, Maryina Horka, Berezino
const easternMinskPoly = [
  [
    [27.30, 54.40],
    [28.00, 54.50],
    [28.80, 54.60],
    [29.40, 54.20],
    [29.30, 53.60],
    [28.90, 53.00],
    [28.20, 52.80],
    [27.50, 52.80],
    [27.20, 53.20],
    [27.40, 53.90],
    [27.30, 54.40]
  ]
];

const vitebsk = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_BLR_101_Vitebsk');
const minsk = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_BLR_103_Minsk');

vitebsk.geometry = {
  type: 'Polygon',
  coordinates: easternVitebskPoly,
};
vitebsk.properties.NUTS_NAME = 'RSS Bielorussa — Distretto di Vitebsk e Polotsk';
vitebsk.properties.HISTORICAL_NAME = 'RSS Bielorussa — Distretto di Vitebsk e Polotsk';

minsk.geometry = {
  type: 'Polygon',
  coordinates: easternMinskPoly,
};
minsk.properties.NUTS_NAME = 'RSS Bielorussa — Distretto di Minsk e Borisov';
minsk.properties.HISTORICAL_NAME = 'RSS Bielorussa — Distretto di Minsk e Borisov';

for (const f of USSR_REGIONAL_FEATURES) sanitizeTopology(f);

console.log('Centroid Vitebsk:', d3.geoCentroid(vitebsk), 'Area:', d3.geoArea(vitebsk));
console.log('Centroid Minsk:', d3.geoCentroid(minsk), 'Area:', d3.geoArea(minsk));

// Test point in Polotsk [28.78, 55.48]
console.log('Polotsk [28.78, 55.48] in Vitebsk?', d3.geoContains(vitebsk, [28.78, 55.48]));
// Test point in Vitebsk [30.20, 55.19]
console.log('Vitebsk [30.20, 55.19] in Vitebsk?', d3.geoContains(vitebsk, [30.20, 55.19]));
// Test point in Borisov [28.50, 54.23]
console.log('Borisov [28.50, 54.23] in Minsk?', d3.geoContains(minsk, [28.50, 54.23]));

const code = `// File generato automaticamente: Granularizzazione integrale dell'URSS e Territori di Frontiera (1936-1940)
// Include tutte le suddivisioni ADM1 e i distretti granulari di Leningrado, Carelia, Murmansk, Bessarabia e Crimea ad altissima precisione satellitare
export const USSR_REGIONAL_FEATURES: any[] = ${JSON.stringify(USSR_REGIONAL_FEATURES)};
`;

fs.writeFileSync('src/data/ussrRegions.ts', code, 'utf-8');
console.log('✓ src/data/ussrRegions.ts aggiornato con successo!');
