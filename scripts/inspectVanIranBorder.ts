import fs from 'fs';
import * as topojson from 'topojson-client';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';

const nutsRaw = JSON.parse(fs.readFileSync('public/data/nuts_10m.json', 'utf8'));
const k = Object.keys(nutsRaw.objects)[0];
const nutsFeats = (topojson.feature(nutsRaw, nutsRaw.objects[k]) as any).features;

const van = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRB21');
const agri = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRA21');
const hakkari = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRB24');
const iran = WORLD_1938_GEOJSON.features.find((f: any) => f.properties?.NAME === 'Iran');

console.log('--- VAN (TRB21) points in lat 38.0 - 39.5 ---');
van.geometry.coordinates[0].forEach((pt: any, i: number) => {
  if (pt[1] >= 38.3 && pt[1] <= 39.5 && pt[0] >= 43.8) {
    console.log(`van[${i}]: [${pt[0]}, ${pt[1]}]`);
  }
});

console.log('--- AGRI (TRA21) points in lat 39.0 - 39.5 ---');
agri.geometry.coordinates[0].forEach((pt: any, i: number) => {
  if (pt[1] >= 39.0 && pt[1] <= 39.5 && pt[0] >= 43.8) {
    console.log(`agri[${i}]: [${pt[0]}, ${pt[1]}]`);
  }
});

console.log('--- IRAN points in lat 38.0 - 39.5 ---');
iran.geometry.coordinates[0][0].forEach((pt: any, i: number) => {
  if (pt[1] >= 38.0 && pt[1] <= 39.5 && pt[0] <= 45.0) {
    console.log(`iran[${i}]: [${pt[0]}, ${pt[1]}]`);
  }
});
