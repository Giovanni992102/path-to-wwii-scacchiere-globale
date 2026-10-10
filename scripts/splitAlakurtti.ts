import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { sanitizeTopology } from '../src/data/historicalEngine';
import * as d3 from 'd3';
import * as fs from 'fs';

for (const f of USSR_REGIONAL_FEATURES) sanitizeTopology(f);

const kantalahti = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_NW_RUS_308_Kantalahti_District');
const koutero = USSR_REGIONAL_FEATURES.find(f => f.id === 'FIN_HIST_282_Koutero_District');

const polys = kantalahti.geometry.type === 'MultiPolygon' ? kantalahti.geometry.coordinates : [kantalahti.geometry.coordinates];

const kandalakshaKeep: any[] = [];
const alakurttiPolys: any[] = [];

for (const poly of polys) {
  for (const ring of poly) {
    const alakurttiRing = ring.filter((pt: number[]) => pt[0] <= 30.45);
    const kandalakshaRing = ring.filter((pt: number[]) => pt[0] >= 30.40);

    if (alakurttiRing.length >= 4) {
      if (alakurttiRing[0][0] !== alakurttiRing[alakurttiRing.length - 1][0] || alakurttiRing[0][1] !== alakurttiRing[alakurttiRing.length - 1][1]) {
        alakurttiRing.push([...alakurttiRing[0]]);
      }
      alakurttiPolys.push([alakurttiRing]);
    }
    if (kandalakshaRing.length >= 4) {
      if (kandalakshaRing[0][0] !== kandalakshaRing[kandalakshaRing.length - 1][0] || kandalakshaRing[0][1] !== kandalakshaRing[kandalakshaRing.length - 1][1]) {
        kandalakshaRing.push([...kandalakshaRing[0]]);
      }
      kandalakshaKeep.push([kandalakshaRing]);
    }
  }
}

kantalahti.geometry = {
  type: kandalakshaKeep.length > 1 ? 'MultiPolygon' : 'Polygon',
  coordinates: kandalakshaKeep.length > 1 ? kandalakshaKeep : kandalakshaKeep[0],
};

const kouteroPolys = koutero.geometry.type === 'MultiPolygon' ? koutero.geometry.coordinates : [koutero.geometry.coordinates];
koutero.geometry = {
  type: 'MultiPolygon',
  coordinates: [...kouteroPolys, ...alakurttiPolys],
};
koutero.properties.NUTS_NAME = 'Salla Orientale e Alakurtti (Kuolajärvi — Saliente di Frontiera)';
koutero.properties.HISTORICAL_NAME = 'Salla Orientale e Alakurtti (Kuolajärvi — Saliente di Frontiera)';

sanitizeTopology(kantalahti);
sanitizeTopology(koutero);

console.log('Alakurtti [30.34, 66.97] in Salla/Koutero?', d3.geoContains(koutero, [30.34, 66.97]));
console.log('Alakurtti [30.34, 66.97] in Kantalahti?', d3.geoContains(kantalahti, [30.34, 66.97]));
console.log('Kandalaksha City [32.41, 67.15] in Kantalahti?', d3.geoContains(kantalahti, [32.41, 67.15]));

const code = `// File generato automaticamente: Granularizzazione integrale dell'URSS e Territori di Frontiera (1936-1940)
// Include tutte le suddivisioni ADM1 e i distretti granulari di Leningrado, Carelia, Murmansk, Bessarabia e Crimea ad altissima precisione satellitare
export const USSR_REGIONAL_FEATURES: any[] = ${JSON.stringify(USSR_REGIONAL_FEATURES)};
`;

fs.writeFileSync('src/data/ussrRegions.ts', code, 'utf-8');
console.log('✓ Aggiornato ussrRegions.ts con split Alakurtti/Kandalaksha!');
