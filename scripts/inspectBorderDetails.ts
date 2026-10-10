import fs from 'fs';
import * as topojson from 'topojson-client';
import { geoDistance, geoContains } from 'd3-geo';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';

const nutsRaw = JSON.parse(fs.readFileSync('public/data/nuts_10m.json', 'utf8'));
const k = Object.keys(nutsRaw.objects)[0];
const nutsFeats = (topojson.feature(nutsRaw, nutsRaw.objects[k]) as any).features;

// Let's inspect point [44.25, 39.3]
// What is [44.25, 39.3]?
// Doğubayazıt, Mount Ararat, Ağrı, Maku!
// Let's check which Turkish provinces border this area:
// Ağrı (TRA22), Iğdır (TRA24), Van (TRB23)
console.log('Inspecting point [44.25, 39.3] and surroundings:');

const trNear = nutsFeats.filter((f: any) => {
  const nid = f.properties?.NUTS_ID || '';
  return nid.startsWith('TR');
});

const iranFeat = WORLD_1938_GEOJSON.features.find(f => f.properties?.NAME === 'Iran');

// Let's print the bounding boxes of Ağrı, Iğdır, Van, and Iran in that region:
for (const f of trNear) {
  const nid = f.properties.NUTS_ID;
  const name = f.properties.NAME_LATN;
  if (['TRA22', 'TRA24', 'TRB23', 'TRA23', 'TRB24'].includes(nid)) {
    console.log(`TR: ${nid} (${name}) type: ${f.geometry.type}`);
  }
}

// Let's inspect where Iran's border coordinates are in the range lon [43.5, 45.5], lat [38.0, 40.5]:
if (iranFeat) {
  const coords = iranFeat.geometry.coordinates;
  const rings = iranFeat.geometry.type === 'Polygon' ? coords : coords.flat(1);
  const ptsInArea: [number, number][] = [];
  rings.forEach((ring: any) => {
    ring.forEach((pt: any) => {
      if (Array.isArray(pt) && typeof pt[0] === 'number') {
        if (pt[0] >= 43.5 && pt[0] <= 45.5 && pt[1] >= 38.0 && pt[1] <= 40.5) {
          ptsInArea.push([pt[0], pt[1]]);
        }
      }
    });
  });
  console.log(`Iran points in area (${ptsInArea.length} pts):`);
  console.log(ptsInArea);
}

// And what was that old Armenia polygon? Where was it?
// Let's check git history of world1938.ts or check what Armenia had!
