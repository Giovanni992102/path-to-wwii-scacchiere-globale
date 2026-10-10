import fs from 'fs';
import * as topojson from 'topojson-client';
import { geoContains } from 'd3-geo';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import { HB_EXCL } from '../src/data/georesolver';

// Load NUTS
const nutsRaw = JSON.parse(fs.readFileSync('public/data/nuts_10m.json', 'utf8'));
const k = Object.keys(nutsRaw.objects)[0];
const nutsFeats = (topojson.feature(nutsRaw, nutsRaw.objects[k]) as any).features;

// Fix winding for all features exactly like App.tsx / fixFeatureWinding
import * as d3 from 'd3';
function fixWinding(f: any) {
  if (!f || !f.geometry) return f;
  try {
    if (f.geometry.type === 'Polygon') {
      const area = d3.geoArea(f);
      if (area > 2 * Math.PI) {
        f.geometry.coordinates = f.geometry.coordinates.map((ring: any[]) => [...ring].reverse());
      }
    } else if (f.geometry.type === 'MultiPolygon') {
      f.geometry.coordinates = f.geometry.coordinates.map((poly: any[]) => {
        const singlePoly = { type: 'Polygon', coordinates: poly };
        const area = d3.geoArea(singlePoly as any);
        if (area > 2 * Math.PI) {
          return poly.map((ring: any[]) => [...ring].reverse());
        }
        return poly;
      });
    }
  } catch (e) {}
  return f;
}

const provs: any[] = [];
// 1. NUTS
nutsFeats.forEach((f: any) => {
  if (f.geometry) {
    provs.push(fixWinding(f));
  }
});

// 2. USSR
USSR_REGIONAL_FEATURES.forEach((f: any) => {
  if (f.geometry) {
    provs.push(fixWinding(f));
  }
});

// 3. HB
const hbs: any[] = [];
WORLD_1938_GEOJSON.features.forEach((f: any) => {
  const nm = f.properties?.NAME;
  if (!HB_EXCL.has(nm) && f.geometry) {
    hbs.push(fixWinding(f));
  }
});

console.log(`Loaded ${provs.length} prov features and ${hbs.length} hb features.`);

// Grid search in [lon: 44.4 to 45.2, lat: 39.3 to 40.0] with step 0.02
console.log('--- SCANNING FOR UNCOVERED HOLES (Black Hole) ---');
const holePts: { lon: number; lat: number }[] = [];

for (let lat = 39.3; lat <= 40.0; lat += 0.02) {
  for (let lon = 44.4; lon <= 45.2; lon += 0.02) {
    const pt: [number, number] = [Number(lon.toFixed(3)), Number(lat.toFixed(3))];
    let coveredBy: string | null = null;

    // Check provs first (layer 4)
    for (const p of provs) {
      if (geoContains(p, pt)) {
        coveredBy = 'PROV: ' + (p.properties?.NAME_LATN || p.properties?.NUTS_NAME || p.properties?.NAME || p.id);
        break;
      }
    }

    // If not in prov, check hb (layer 3)
    if (!coveredBy) {
      for (const h of hbs) {
        if (geoContains(h, pt)) {
          coveredBy = 'HB: ' + h.properties?.NAME;
          break;
        }
      }
    }

    if (!coveredBy) {
      holePts.push({ lon: pt[0], lat: pt[1] });
    }
  }
}

console.log(`Found ${holePts.length} uncovered points!`);
if (holePts.length > 0) {
  console.log('Hole points:');
  holePts.forEach(p => console.log(`  [lon: ${p.lon}, lat: ${p.lat}]`));
}
