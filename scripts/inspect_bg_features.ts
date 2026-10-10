import * as fs from 'fs';
import * as path from 'path';
import * as topojson from 'topojson-client';
import { resolveFeature } from '../src/data/georesolver';

const nutsPath = path.resolve('public/data/nuts_10m.json');
const topoNuts = JSON.parse(fs.readFileSync(nutsPath, 'utf8'));
const nutsK = Object.keys(topoNuts.objects)[0];
const nuts = (topojson.feature(topoNuts, topoNuts.objects[nutsK]) as any).features;

const bgFeatures = nuts.filter((f: any) => {
  const nid = f.properties?.NUTS_ID || f.properties?.NUTS_CODE;
  const cntr = f.properties?.CNTR_CODE;
  return nid?.startsWith('BG') || cntr === 'BG';
});

console.log(`Found ${bgFeatures.length} Bulgarian features:`);
bgFeatures.forEach((f: any) => {
  const res0 = resolveFeature(f, 0);
  console.log(`ID: ${f.properties.NUTS_ID} | Name: ${f.properties.NUTS_NAME} | CNTR_CODE: ${f.properties.CNTR_CODE} | Owner step 0: ${res0.o} (${res0.name})`);
});
