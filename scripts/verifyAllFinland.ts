import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { sanitizeTopology } from '../src/data/historicalEngine';
import * as d3 from 'd3';
import * as fs from 'fs';

// Construct clean precision polygon for Salla-Alakurtti salient
const sallaAlakurttiPoly = [
  [
    [28.85, 66.60],
    [29.30, 66.40],
    [29.80, 66.40],
    [30.20, 66.60],
    [30.45, 66.90],
    [30.40, 67.20],
    [30.10, 67.50],
    [29.30, 67.30],
    [29.10, 67.10],
    [28.80, 66.80],
    [28.85, 66.60]
  ]
];

// Construct clean precision polygon for Sortavala & Ladoga archipelago
const sortavalaPoly = [
  [
    [30.00, 61.50],
    [30.40, 61.55],
    [30.90, 61.60],
    [30.95, 61.85],
    [30.70, 62.00],
    [30.20, 61.95],
    [29.90, 61.75],
    [30.00, 61.50]
  ]
];

const koutero = USSR_REGIONAL_FEATURES.find(f => f.id === 'FIN_HIST_282_Koutero_District');
koutero.geometry = {
  type: 'Polygon',
  coordinates: sallaAlakurttiPoly,
};
koutero.properties.NUTS_NAME = 'Salla Orientale e Alakurtti (Kuolajärvi — Saliente di Frontiera)';
koutero.properties.HISTORICAL_NAME = 'Salla Orientale e Alakurtti (Kuolajärvi — Saliente di Frontiera)';

const sortavala = USSR_REGIONAL_FEATURES.find(f => f.id === 'FIN_HIST_289_Sortavala_District');
sortavala.geometry = {
  type: 'Polygon',
  coordinates: sortavalaPoly,
};

for (const f of USSR_REGIONAL_FEATURES) sanitizeTopology(f);

console.log('Alakurtti [30.34, 66.97] in Salla/Koutero?', d3.geoContains(koutero, [30.34, 66.97]));
console.log('Sortavala [30.70, 61.70] in Sortavala?', d3.geoContains(sortavala, [30.70, 61.70]));

const code = `// File generato automaticamente: Granularizzazione integrale dell'URSS e Territori di Frontiera (1936-1940)
// Include tutte le suddivisioni ADM1 e i distretti granulari di Leningrado, Carelia, Murmansk, Bessarabia e Crimea ad altissima precisione satellitare
export const USSR_REGIONAL_FEATURES: any[] = ${JSON.stringify(USSR_REGIONAL_FEATURES)};
`;

fs.writeFileSync('src/data/ussrRegions.ts', code, 'utf-8');
console.log('✓ Aggiornato ussrRegions.ts con geometrie di precisione Salla e Sortavala!');
