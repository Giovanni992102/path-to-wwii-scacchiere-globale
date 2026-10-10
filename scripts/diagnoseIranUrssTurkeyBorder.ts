import fs from 'fs';
import * as topojson from 'topojson-client';
import { geoContains } from 'd3-geo';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import { HB_EXCL } from '../src/data/georesolver';

// 1. Load NUTS-3
const nutsRaw = JSON.parse(fs.readFileSync('public/data/nuts_10m.json', 'utf8'));
const k = Object.keys(nutsRaw.objects)[0];
const nutsFeats = (topojson.feature(nutsRaw, nutsRaw.objects[k]) as any).features;

// Filter features relevant to Turkey, USSR, Iran
const trFeats = nutsFeats.filter((f: any) => {
  const nid = f.properties && (f.properties.NUTS_ID || f.properties.id || '');
  return nid.startsWith('TR');
});

const armFeats = USSR_REGIONAL_FEATURES.filter((f: any) => {
  const nid = f.properties?.NUTS_ID || '';
  return nid.includes('ARM') || nid.includes('AZE') || nid.includes('GEO');
});

const hbFeats = WORLD_1938_GEOJSON.features.filter((f: any) => {
  const nm = f.properties?.NAME;
  return nm === 'Iran' || nm === 'Turkey' || nm === 'Armenia';
});

console.log('TR features:', trFeats.length);
console.log('Caucasus USSR features:', armFeats.length);
console.log('HB features matching Iran/Turkey/Armenia:', hbFeats.map(f => f.properties?.NAME));

// Let us check all features that cover points in the bounding box:
// lon: 43.0 to 45.5, lat: 38.5 to 41.0 (step 0.05)
// Check if any point is in neither TR, nor USSR, nor Iran (buco nero!)
const allCheckFeats: { name: string; feat: any }[] = [];

trFeats.forEach((f: any) => allCheckFeats.push({ name: 'TR: ' + (f.properties.NAME_LATN || f.properties.NUTS_ID), feat: f }));
armFeats.forEach((f: any) => allCheckFeats.push({ name: 'USSR: ' + (f.properties.NAME || f.properties.NUTS_ID), feat: f }));
WORLD_1938_GEOJSON.features.forEach((f: any) => {
  const nm = f.properties?.NAME;
  if (!HB_EXCL.has(nm) || nm === 'Iran') {
    if (nm === 'Iran' || nm === 'Iraq' || nm === 'Syria') {
      allCheckFeats.push({ name: 'HB: ' + nm, feat: f });
    }
  }
});

console.log('Total check features in area:', allCheckFeats.length);

const holes: [number, number][] = [];
const overlaps: { pt: [number, number]; feats: string[] }[] = [];

for (let lat = 38.5; lat <= 41.2; lat += 0.05) {
  for (let lon = 43.0; lon <= 45.5; lon += 0.05) {
    const pt: [number, number] = [Number(lon.toFixed(2)), Number(lat.toFixed(2))];
    const matching: string[] = [];
    for (const cf of allCheckFeats) {
      try {
        if (geoContains(cf.feat, pt)) {
          matching.push(cf.name);
        }
      } catch (e) {}
    }
    if (matching.length === 0) {
      holes.push(pt);
    } else if (matching.length > 1) {
      overlaps.push({ pt, feats: matching });
    }
  }
}

console.log(`Scan completed. Found ${holes.length} potential holes and ${overlaps.length} potential overlaps.`);
if (holes.length > 0) {
  console.log('Sample holes:');
  // Group holes by area or print first 30
  holes.slice(0, 30).forEach(h => console.log(`  [lon: ${h[0]}, lat: ${h[1]}]`));
}
if (overlaps.length > 0) {
  console.log('Sample overlaps:');
  overlaps.slice(0, 10).forEach(o => console.log(`  [${o.pt[0]}, ${o.pt[1]}]:`, o.feats.join(', ')));
}
