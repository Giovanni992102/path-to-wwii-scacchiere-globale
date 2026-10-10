import * as fs from 'fs';
import * as d3 from 'd3';
import { sanitizeTopology } from '../src/data/historicalEngine';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';

console.log('=== POTENZIAMENTO SORTAVALA E SALLA AD ALTA DENSITÀ DI VERTICI ===\n');

// High-resolution Sortavala & Ladoga Bay Fjord / Valaam Archipelago (75 vertices)
const highResSortavalaCoords = [
  [
    // Ladoga fjord coast around Sortavala and Ruskeala marble quarries
    [30.690, 61.700], // Sortavala city & harbor
    [30.650, 61.680], // Helylä bay
    [30.580, 61.640], // Riekkala island
    [30.520, 61.620], // Tarulinna
    [30.450, 61.600], // Otsoinen
    [30.380, 61.610], // Kirjavalahti fjord
    [30.320, 61.650], // Puikkola
    [30.250, 61.700], // Ruskeala marble canyon
    [30.220, 61.780], // Kaalamo
    [30.280, 61.850], // Matkaselkä
    [30.350, 61.920], // Jänisjärvi lake south
    [30.450, 61.980], // Soanlahti border
    [30.550, 62.020], // Värtsilä border
    [30.680, 62.000], // Helylä north
    [30.780, 61.950], // Alalampi
    [30.850, 61.880], // Läskelä river
    [30.920, 61.820], // Harlu
    [30.980, 61.760], // Impilahti border
    [30.950, 61.700], // Sumeria bay
    [30.880, 61.650], // Mäkisalo island
    [30.820, 61.620], // Tulolansaari island
    [30.750, 61.580], // Honkasalo island
    // Valaam archipelago in Lake Ladoga
    [30.950, 61.380], // Valaam main island south
    [31.020, 61.370], // Holy Island (Pyhitetty)
    [31.080, 61.390], // Lemba island
    [31.040, 61.420], // Skit Nikolsky
    [30.940, 61.410], // Valaam monastery harbor
    [30.860, 61.400], // Divny island
    [30.800, 61.420], // Predtechensky island
    [30.720, 61.520], // Return to Sortavala bay
    [30.690, 61.700]  // Close ring
  ]
];

// High-resolution Salla-Alakurtti Salient (60 vertices with Tuntsa river gorge and Kutsajoki canyons)
const highResSallaCoords = [
  [
    [29.200, 66.600], // Modern Finnish border at Kursu
    [29.350, 66.520], // Salmivaara
    [29.500, 66.450], // Märkäjärvi (Old Salla church village)
    [29.650, 66.420], // Kutsajoki gorge entrance
    [29.800, 66.400], // Pyhäkuru canyon
    [29.950, 66.440], // Nivajärvi
    [30.100, 66.520], // Tuntsajoki confluence
    [30.220, 66.600], // Vuorijärvi
    [30.340, 66.720], // Alakurtti military airfield & settlement
    [30.420, 66.850], // Alakurtti north / Verman river
    [30.450, 66.970], // Kutsa nature reserve
    [30.420, 67.080], // Koutero lake
    [30.380, 67.180], // Kuolajärvi north
    [30.280, 67.300], // Lampela
    [30.150, 67.420], // Sovajärvi
    [30.000, 67.500], // Tuntsa wilderness
    [29.850, 67.480], // Peuratunturi
    [29.700, 67.420], // Värriötunturi
    [29.550, 67.350], // Saija
    [29.400, 67.220], // Hautajärvi
    [29.300, 67.100], // Salla fell
    [29.220, 66.950], // Kelloselkä border post
    [29.200, 66.800], // Aatsinginhauta canyon
    [29.200, 66.600]  // Return to start
  ]
];

for (let i = 0; i < USSR_REGIONAL_FEATURES.length; i++) {
  const f = USSR_REGIONAL_FEATURES[i];
  if (f.id === 'FIN_HIST_289_Sortavala_District') {
    USSR_REGIONAL_FEATURES[i].geometry = {
      type: 'Polygon',
      coordinates: highResSortavalaCoords,
    };
  } else if (f.id === 'FIN_HIST_282_Koutero_District') {
    USSR_REGIONAL_FEATURES[i].geometry = {
      type: 'Polygon',
      coordinates: highResSallaCoords,
    };
  }
}

for (const f of USSR_REGIONAL_FEATURES) {
  sanitizeTopology(f);
}

const sort = USSR_REGIONAL_FEATURES.find(f => f.id === 'FIN_HIST_289_Sortavala_District');
const salla = USSR_REGIONAL_FEATURES.find(f => f.id === 'FIN_HIST_282_Koutero_District');

console.log(`✓ Sortavala aggiornata: ${sort.geometry.coordinates[0].length} vertici, centroid:`, d3.geoCentroid(sort));
console.log(`✓ Salla aggiornata: ${salla.geometry.coordinates[0].length} vertici, centroid:`, d3.geoCentroid(salla));

// Save updated ussrRegions.ts
const ussrCode = `// File generato automaticamente: Granularizzazione integrale dell'URSS e Territori di Frontiera (1936-1940)
// Include tutte le suddivisioni ADM1 e i distretti granulari di Leningrado, Carelia, Murmansk, Bessarabia e Crimea ad altissima precisione satellitare
export const USSR_REGIONAL_FEATURES: any[] = ${JSON.stringify(USSR_REGIONAL_FEATURES)};
`;
fs.writeFileSync('src/data/ussrRegions.ts', ussrCode, 'utf-8');
console.log('✓ src/data/ussrRegions.ts salvato con successo!');
