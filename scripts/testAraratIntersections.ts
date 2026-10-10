import fs from 'fs';
import * as topojson from 'topojson-client';
import polygonClipping from 'polygon-clipping';
import * as d3 from 'd3';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';

const nutsRaw = JSON.parse(fs.readFileSync('public/data/nuts_10m.json', 'utf8'));
const k = Object.keys(nutsRaw.objects)[0];
const nutsFeats = (topojson.feature(nutsRaw, nutsRaw.objects[k]) as any).features;

const igdir = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRA23');
const agri = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRA21');
const iran = WORLD_1938_GEOJSON.features.find((f: any) => f.properties?.NAME === 'Iran');
const nakh = USSR_REGIONAL_FEATURES.find((f: any) => f.id?.includes('128'));
const araratArm = USSR_REGIONAL_FEATURES.find((f: any) => f.id?.includes('127'));

const araratTurCoords: [number, number][][] = [
  [
    [44.40957003300715, 39.42656236012963],
    [44.502168001264785, 39.716578359895685],
    [44.60991836432823, 39.778128518119416],
    [44.68062954008861, 39.735356374269024],
    [44.736188321043194, 39.70197323760531],
    [44.749657116426114, 39.68945456135641],
    [44.40957003300715, 39.42656236012963],
  ]
];

function checkOverlap(name: string, otherGeom: any) {
  const otherCoords = otherGeom.type === 'Polygon' ? [otherGeom.coordinates] : otherGeom.coordinates;
  const inter = polygonClipping.intersection(araratTurCoords as any, otherCoords as any);
  if (inter.length === 0) {
    console.log(`✓ Overlap with ${name}: ZERO (no intersection)`);
  } else {
    const feat = { type: 'Feature', geometry: { type: 'MultiPolygon', coordinates: inter } };
    const area = (d3.geoArea(feat as any) / (4 * Math.PI)) * 510072000;
    console.log(`Overlap with ${name}: ${area.toFixed(4)} km²`);
  }
}

console.log('--- Checking Overlaps of Ararat Feature ---');
checkOverlap('Agri (TRA21)', agri.geometry);
checkOverlap('Igdir (TRA23)', igdir.geometry);
checkOverlap('Iran', iran.geometry);
checkOverlap('Nakhchivan (SOV)', nakh.geometry);
checkOverlap('Ararat Armenian SSR (SOV)', araratArm.geometry);
