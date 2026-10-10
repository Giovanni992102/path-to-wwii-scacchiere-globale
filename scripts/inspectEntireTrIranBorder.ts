import fs from 'fs';
import * as topojson from 'topojson-client';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';

const nutsRaw = JSON.parse(fs.readFileSync('public/data/nuts_10m.json', 'utf8'));
const k = Object.keys(nutsRaw.objects)[0];
const nutsFeats = (topojson.feature(nutsRaw, nutsRaw.objects[k]) as any).features;

const hakkari = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRB24');
const van = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRB21');
const agri = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRA21');
const igdir = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRA23');

console.log('Hakkari points count:', hakkari.geometry.coordinates[0].length);
console.log('Van points count:', van.geometry.coordinates[0].length);
console.log('Agri points count:', agri.geometry.coordinates[0].length);
console.log('Igdir points count:', igdir.geometry.coordinates[0].length);

// Where does Hakkari meet Iraq and Iran?
// Iran border in world1938 starts at point 355 / point 0: [44.2052, 37.8674]
// Let's see what points Iran currently has from Iraq tripoint to Nakhchivan:
const iran = WORLD_1938_GEOJSON.features.find((f: any) => f.properties?.NAME === 'Iran');
const iranRing = iran.geometry.coordinates[0][0];

console.log('Iran points 350 to 355, 0 to 12:');
for (let i = 350; i < iranRing.length; i++) {
  console.log(`  iran[${i}]: [${iranRing[i][0]}, ${iranRing[i][1]}]`);
}
for (let i = 0; i <= 12; i++) {
  console.log(`  iran[${i}]: [${iranRing[i][0]}, ${iranRing[i][1]}]`);
}
