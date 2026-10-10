import fs from 'fs';
import * as topojson from 'topojson-client';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import * as d3 from 'd3';

const nutsRaw = JSON.parse(fs.readFileSync('public/data/nuts_10m.json', 'utf8'));
const k = Object.keys(nutsRaw.objects)[0];
const nutsFeats = (topojson.feature(nutsRaw, nutsRaw.objects[k]) as any).features;

const van = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRB21');
const agri = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRA21');

// In Van, points from 5 down to 0:
// van[5]: [44.212588900531806, 38.89556184257235]
// van[4]: [44.17554971322874, 38.975890015169426]
// van[3]: [44.21090530110893, 39.13341669130135]
// van[2]: [44.11662373342843, 39.276338245142895]
// van[1]: [44.07453374785677, 39.3347587343044]
// van[0]: [44.049279756513776, 39.36292575586441]
const vanArc: [number, number][] = [];
for (let i = 5; i >= 0; i--) {
  vanArc.push(van.geometry.coordinates[0][i]);
}

// In Agri, points from 11 down to 8:
// agri[11]: [44.049279756513776, 39.36292575586441] (same as van[0])
// agri[10]: [44.0880025432397, 39.409870791797765]
// agri[9]: [44.31023766705804, 39.39213600044517]
// agri[8]: [44.40957003300715, 39.42656236012963]
const agriArc: [number, number][] = [];
for (let i = 10; i >= 8; i--) {
  agriArc.push(agri.geometry.coordinates[0][i]);
}

const detailedTrIranArc = [...vanArc, ...agriArc];
console.log('Detailed TR-Iran arc points:', detailedTrIranArc.length);
detailedTrIranArc.forEach((pt, i) => console.log(`  [${i}]: [${pt[0].toFixed(4)}, ${pt[1].toFixed(4)}]`));

// In Iran:
const iran = WORLD_1938_GEOJSON.features.find((f: any) => f.properties?.NAME === 'Iran');
const iranRing = iran.geometry.coordinates[0][0];

console.log('Iran point 6:', iranRing[6]);
console.log('Iran point 7:', iranRing[7]);

// Replacing the segment between point 6 and point 7 with detailedTrIranArc:
// iranRing.slice(0, 6) + detailedTrIranArc + iranRing.slice(8)
const newIranRing = [
  ...iranRing.slice(0, 6),
  ...detailedTrIranArc,
  ...iranRing.slice(8)
];

console.log('Old Iran ring length:', iranRing.length);
console.log('New Iran ring length:', newIranRing.length);

const testFeat = {
  type: 'Feature',
  geometry: {
    type: 'MultiPolygon',
    coordinates: [[newIranRing]]
  }
};

const area = d3.geoArea(testFeat as any);
console.log('Area:', area, 'Is inverted?', area > 2 * Math.PI);
