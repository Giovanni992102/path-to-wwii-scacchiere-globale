import fs from 'fs';
import * as topojson from 'topojson-client';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';

const nutsRaw = JSON.parse(fs.readFileSync('public/data/nuts_10m.json', 'utf8'));
const k = Object.keys(nutsRaw.objects)[0];
const nutsFeats = (topojson.feature(nutsRaw, nutsRaw.objects[k]) as any).features;

const igdir = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRA23');
const agri = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRA21');
const ararat = USSR_REGIONAL_FEATURES.find((f: any) => f.id?.includes('127'));
const nakh = USSR_REGIONAL_FEATURES.find((f: any) => f.id?.includes('128'));
const iran = WORLD_1938_GEOJSON.features.find((f: any) => f.properties?.NAME === 'Iran');

console.log('--- Inspecting borders of the void ---');

// 1. Where does Iğdır end on the south?
console.log('Igdir ring:');
igdir.geometry.coordinates[0].forEach((pt: any, i: number) => {
  console.log(`  igdir[${i}]: [${pt[0].toFixed(4)}, ${pt[1].toFixed(4)}]`);
});

// 2. Where does Ararat ARM end on the south?
console.log('Ararat ARM ring:');
ararat.geometry.coordinates[0].forEach((pt: any, i: number) => {
  if (pt[1] <= 39.85 && pt[0] >= 44.5) {
    console.log(`  ararat[${i}]: [${pt[0].toFixed(4)}, ${pt[1].toFixed(4)}]`);
  }
});

// 3. Where does Nakhchivan end on the west?
console.log('Nakhchivan ring west points:');
nakh.geometry.coordinates[0].forEach((pt: any, i: number) => {
  if (pt[0] <= 45.0 && pt[1] >= 39.5) {
    console.log(`  nakh[${i}]: [${pt[0].toFixed(4)}, ${pt[1].toFixed(4)}]`);
  }
});

// 4. Where does Iran run?
console.log('Iran points:');
iran.geometry.coordinates[0][0].slice(6, 12).forEach((pt: any, i: number) => {
  console.log(`  iran[${i + 6}]: [${pt[0].toFixed(4)}, ${pt[1].toFixed(4)}]`);
});
