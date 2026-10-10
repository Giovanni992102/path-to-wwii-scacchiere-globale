import fs from 'fs';
import * as topojson from 'topojson-client';
import { geoContains } from 'd3-geo';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';

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

console.log('Testing who covers these points:');
testPts.forEach(pt => {
  const matchUssr = USSR_REGIONAL_FEATURES.filter((f: any) => geoContains(f, pt)).map((f: any) => f.properties?.NAME || f.properties?.NUTS_ID);
  console.log(`Pt [${pt[0]}, ${pt[1]}]: USSR matches =`, matchUssr);
});
