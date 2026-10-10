import * as fs from 'fs';
import * as topojson from 'topojson-client';
import { MEMEL_TERRITORY_FEATURE } from '../src/data/historicalBorders';
import * as d3 from 'd3';

const rawNuts = JSON.parse(fs.readFileSync('public/data/nuts_10m.json', 'utf8'));
const k = Object.keys(rawNuts.objects)[0];
const nuts = (topojson.feature(rawNuts, rawNuts.objects[k]) as any).features;

const ltFeatures = nuts.filter((f: any) => f.properties?.CNTR_CODE === 'LT');
console.log('Lithuanian NUTS features:');
for (const f of ltFeatures) {
  const areaKm2 = d3.geoArea(f) * 6371 * 6371;
  const bounds = d3.geoBounds(f);
  console.log(`${f.properties?.NUTS_ID} (${f.properties?.NUTS_NAME}): Area ~${Math.round(areaKm2)} km2, Bounds: [${bounds[0].map(v => v.toFixed(2))}] to [${bounds[1].map(v => v.toFixed(2))}]`);
}

const memelAreaKm2 = d3.geoArea(MEMEL_TERRITORY_FEATURE) * 6371 * 6371;
const memelBounds = d3.geoBounds(MEMEL_TERRITORY_FEATURE);
console.log(`\nMEMEL_TERRITORY_FEATURE: Area ~${Math.round(memelAreaKm2)} km2, Bounds: [${memelBounds[0].map(v => v.toFixed(2))}] to [${memelBounds[1].map(v => v.toFixed(2))}]`);
console.log('Real historical Memelland area in 1923-1939 was 2,657 km2.');
console.log(`MEMEL_TERRITORY_FEATURE is ${Math.round(memelAreaKm2 / 2657 * 100)}% of the real historical area!`);
