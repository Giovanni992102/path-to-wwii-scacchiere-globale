import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import fs from 'fs';
import * as topojson from 'topojson-client';
import polygonClipping from 'polygon-clipping';
import * as d3 from 'd3';
import { HB_EXCL, METRO_FRAG } from '../src/data/georesolver';

const nutsData = JSON.parse(fs.readFileSync('./public/data/nuts_10m.json', 'utf8'));
const nutsK = Object.keys(nutsData.objects)[0];
const nutsFeatures = topojson.feature(nutsData, nutsData.objects[nutsK]).features;

function toGeom(f: any): any[] {
  if (!f || !f.geometry) return [];
  if (f.geometry.type === 'Polygon') return [f.geometry.coordinates];
  if (f.geometry.type === 'MultiPolygon') return f.geometry.coordinates;
  return [];
}

function getBBox(geom: any): [number, number, number, number] {
  let minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
  function walk(coords: any) {
    if (typeof coords[0] === 'number') {
      if (coords[0] < minx) minx = coords[0];
      if (coords[0] > maxx) maxx = coords[0];
      if (coords[1] < miny) miny = coords[1];
      if (coords[1] > maxy) maxy = coords[1];
    } else coords.forEach(walk);
  }
  walk(geom.coordinates);
  return [minx, miny, maxx, maxy];
}

function bboxesOverlap(b1: [number, number, number, number], b2: [number, number, number, number]): boolean {
  return !(b1[2] < b2[0] || b1[0] > b2[2] || b1[3] < b2[1] || b1[1] > b2[3]);
}

const targetBbox: [number, number, number, number] = [-60, 0, -50, 10];

console.log('=== AUDITING ALL LOADED FEATURES IN GUIANA REGION ===');

// All features that App.tsx loads in this region:
const provs: any[] = [];
for (const f of nutsFeatures) {
  if (!f.geometry) continue;
  const nid = f.properties?.NUTS_ID;
  if (nid === 'PL633' || nid === 'PL634' || nid === 'LT023') continue;
  const b = getBBox(f.geometry);
  if (bboxesOverlap(b, targetBbox)) {
    provs.push({ ...f, __layer: 'prov' });
  }
}

const hbs: any[] = [];
for (const f of WORLD_1938_GEOJSON.features) {
  if (!f.geometry) continue;
  const nm = String(f.properties?.NAME || '').trim();
  if (HB_EXCL.has(nm)) {
    if (METRO_FRAG[nm]) {
      // not in targetBbox
    }
  } else {
    const b = getBBox(f.geometry);
    if (bboxesOverlap(b, targetBbox)) {
      hbs.push({ ...f, __layer: 'hb' });
    }
  }
}

console.log(`Found ${provs.length} prov features in Guiana region:`);
provs.forEach(p => console.log(`  - PROV: ${p.properties?.NUTS_ID} (${p.properties?.NAME_LATN})`));

console.log(`Found ${hbs.length} hb features in Guiana region:`);
hbs.forEach(h => console.log(`  - HB: ${h.properties?.NAME}`));

// Check all pair-wise intersections
const all = [...provs, ...hbs];
console.log('\nPairwise overlaps:');
for (let i = 0; i < all.length; i++) {
  for (let j = i + 1; j < all.length; j++) {
    const f1 = all[i], f2 = all[j];
    const b1 = getBBox(f1.geometry), b2 = getBBox(f2.geometry);
    if (!bboxesOverlap(b1, b2)) continue;
    try {
      const inter = polygonClipping.intersection(toGeom(f1) as any, toGeom(f2) as any);
      if (inter.length > 0) {
        let a = 0;
        for (const poly of inter) {
          for (let r = 0; r < poly.length; r++) {
            const ring = poly[r];
            let ra = 0;
            for (let k = 0, l = ring.length - 1; k < ring.length; l = k++) {
              ra += (ring[l][0] * ring[k][1]) - (ring[k][0] * ring[l][1]);
            }
            if (r === 0) a += 0.5 * Math.abs(ra);
            else a -= 0.5 * Math.abs(ra);
          }
        }
        if (a > 1e-6) {
          const name1 = f1.__layer + ':' + (f1.properties?.NUTS_ID || f1.properties?.NAME);
          const name2 = f2.__layer + ':' + (f2.properties?.NUTS_ID || f2.properties?.NAME);
          console.log(`OVERLAP between [${name1}] and [${name2}]: ${a.toFixed(5)} sq deg`);
        }
      }
    } catch (e: any) {
      console.log(`Error checking: ${e.message}`);
    }
  }
}
