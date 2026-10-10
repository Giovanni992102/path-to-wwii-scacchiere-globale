import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import { HB_EXCL } from '../src/data/georesolver';
import * as d3 from 'd3';

console.log('--- Inspecting all features in WORLD_1938_GEOJSON near Europe/USSR/Middle East ---');
for (const f of WORLD_1938_GEOJSON.features) {
  const p = f.properties || {};
  const nm = p.NAME || '';
  const cent = d3.geoCentroid(f as any);
  const area = (d3.geoArea(f as any) / (4 * Math.PI)) * 510072000;
  
  // Check if subjecto is USSR or if centroid is in USSR/Caucasus/Near East
  if (p.SUBJECTO === 'USSR' || (cent[0] >= 20 && cent[0] <= 90 && cent[1] >= 35 && cent[1] <= 75)) {
    const isExcl = HB_EXCL.has(nm);
    console.log(`Feature: "${nm}", SUBJECTO="${p.SUBJECTO}", Centroid=[${cent[0].toFixed(2)}, ${cent[1].toFixed(2)}], Area=${Math.round(area)} km², Excluded=${isExcl}`);
  }
}
