import * as fs from 'fs';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';

const geoms = JSON.parse(fs.readFileSync('./src/data/updated_geoms.json', 'utf-8'));

let foundCrimea = false;
let foundSevastopol = false;

const updated = USSR_REGIONAL_FEATURES.map((f: any) => {
  if (f.id === 'SOV_ADM1_UKR_91_Autonomous_Republic_of_Crimea') {
    foundCrimea = true;
    return {
      ...f,
      properties: {
        ...f.properties,
        NUTS_NAME: 'RSSA di Crimea (Sinferopoli / Penisola Taurica)',
        HISTORICAL_NAME: 'RSSA di Crimea (Sinferopoli / Penisola Taurica)',
        ADMIN_TITLE: 'Repubblica Autonoma — RSFSR (Tracciato Satellitare di Precisione)',
      },
      geometry: geoms.neCrimea,
    };
  }
  if (f.id === 'SOV_ADM1_UKR_99_Sevastopol') {
    foundSevastopol = true;
    return {
      ...f,
      properties: {
        ...f.properties,
        NUTS_NAME: 'Sebastopoli (Base Navale e Fortezza)',
        HISTORICAL_NAME: 'Sebastopoli (Base Navale e Fortezza)',
        ADMIN_TITLE: 'Piazzaforte Navale e Quartier Generale Flotta del Mar Nero — RSFSR',
      },
      geometry: geoms.neSevastopol,
    };
  }
  return f;
});

if (!updated.some((f: any) => f.id === 'SOV_ADM1_UKR_195_Odessa_City')) {
  updated.push({
    type: 'Feature',
    id: 'SOV_ADM1_UKR_195_Odessa_City',
    properties: {
      id: 'SOV_ADM1_UKR_195_Odessa_City',
      NUTS_ID: 'SOV_ADM1_UKR_195_Odessa_City',
      CNTR_CODE: 'SU',
      NUTS_NAME: 'RSS Ucraina — Città e Base Navale di Odessa',
      HISTORICAL_NAME: 'RSS Ucraina — Città e Base Navale di Odessa',
      ADMIN_TITLE: 'Città Eroe e Porto Militare della Flotta del Mar Nero — RSS Ucraina/URSS',
      SOV_SSR: 'RSS Ucraina',
      MODERN_ADMIN: 'Odesa (UKR)',
      REGION_KIND: 'SOVIET_UNION_ADM1',
    },
    geometry: geoms.odesaCity,
  });
}

console.log('Crimea replaced:', foundCrimea);
console.log('Sevastopol replaced:', foundSevastopol);
console.log('Total USSR features count:', updated.length);

const header =
  "// File generato automaticamente: Granularizzazione integrale dell'URSS e Territori di Frontiera (1936-1940)\n// Include tutte le suddivisioni ADM1 e i distretti granulari di Leningrado, Carelia, Murmansk, Bessarabia e Crimea ad altissima precisione satellitare\nexport const USSR_REGIONAL_FEATURES: any[] = ";
fs.writeFileSync('./src/data/ussrRegions.ts', header + JSON.stringify(updated) + ';\n');
console.log('Successfully updated src/data/ussrRegions.ts!');
