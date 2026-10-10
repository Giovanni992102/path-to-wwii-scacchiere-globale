import fs from 'fs';
import * as topojson from 'topojson-client';
import { geoContains } from 'd3-geo';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';

const nutsRaw = JSON.parse(fs.readFileSync('public/data/nuts_10m.json', 'utf8'));
const k = Object.keys(nutsRaw.objects)[0];
const nutsFeats = (topojson.feature(nutsRaw, nutsRaw.objects[k]) as any).features;

const agri = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRA21');
const igdir = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRA23');
const van = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRB21');
const hakkari = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRB24');
const iran = WORLD_1938_GEOJSON.features.find((f: any) => f.properties?.NAME === 'Iran');

console.log('Agri geometry type:', agri?.geometry?.type);
console.log('Igdir geometry type:', igdir?.geometry?.type);
console.log('Van geometry type:', van?.geometry?.type);
console.log('Iran geometry type:', iran?.geometry?.type);

// Let's check bounding boxes of Agri, Igdir, Van, and Iran
function getBBox(feat: any) {
  let minx = 180, maxx = -180, miny = 90, maxy = -90;
  function walk(c: any) {
    if (typeof c[0] === 'number') {
      if (c[0] < minx) minx = c[0];
      if (c[0] > maxx) maxx = c[0];
      if (c[1] < miny) miny = c[1];
      if (c[1] > maxy) maxy = c[1];
    } else {
      c.forEach(walk);
    }
  }
  walk(feat.geometry.coordinates);
  return { minx, maxx, miny, maxy };
}

console.log('Agri (TRA21) bbox:', getBBox(agri));
console.log('Igdir (TRA23) bbox:', getBBox(igdir));
console.log('Van (TRB21) bbox:', getBBox(van));
console.log('Hakkari (TRB24) bbox:', getBBox(hakkari));

// Now let us inspect points in the hole: e.g. [44.25, 39.3], [44.2, 39.0], [44.3, 38.7]
const testPts: [number, number][] = [
  [44.25, 39.3],
  [44.2, 39.0],
  [44.3, 38.7],
  [44.35, 38.5],
  [44.4, 39.4],
  [44.5, 39.5],
  [44.6, 39.6],
  [44.7, 39.7],
  [44.8, 39.75],
  [44.6, 39.9],
  [44.5, 40.0],
];

console.log('\nChecking test points:');
testPts.forEach(pt => {
  const inAgri = geoContains(agri, pt);
  const inIgdir = geoContains(igdir, pt);
  const inVan = geoContains(van, pt);
  const inHakkari = geoContains(hakkari, pt);
  const inIran = geoContains(iran as any, pt);
  console.log(`Pt [${pt[0]}, ${pt[1]}]: Agri=${inAgri}, Igdir=${inIgdir}, Van=${inVan}, Hakkari=${inHakkari}, Iran=${inIran}`);
});
