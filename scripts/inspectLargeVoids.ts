import * as fs from 'fs';
import * as path from 'path';
import * as topojson from 'topojson-client';
import { KRESY_POWIAT_FEATURES } from '../src/data/kresyPowiats';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { PRECISION_HISTORICAL_FEATURES } from '../src/data/historicalBorders';
import * as d3 from 'd3';
import polygonClipping from 'polygon-clipping';

function toMultiPoly(geom: any): polygonClipping.Polygon[] {
  if (geom.type === 'Polygon') return [geom.coordinates];
  if (geom.type === 'MultiPolygon') return geom.coordinates;
  return [];
}

function cleanRing(ring: number[][]): number[][] {
  let r = ring.slice();
  if (r[0][0] !== r[r.length - 1][0] || r[0][1] !== r[r.length - 1][1]) {
    r.push([r[0][0], r[0][1]]);
  }
  const f = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [r] } };
  const a = d3.geoArea(f as any);
  if (a > 2 * Math.PI) {
    r = r.slice().reverse();
  }
  return r;
}

async function main() {
  const nutsPath = path.resolve('public/data/nuts_10m.json');
  const topoNuts = JSON.parse(fs.readFileSync(nutsPath, 'utf8'));
  const nutsK = Object.keys(topoNuts.objects)[0];
  const nuts = (topojson.feature(topoNuts, topoNuts.objects[nutsK]) as any).features;

  const provs: any[] = [];
  for (const f of nuts) {
    if (!f.geometry) continue;
    const nid = f.properties && (f.properties.NUTS_ID || f.properties.NUTS_CODE);
    if (nid === 'PL633' || nid === 'PL634' || nid === 'LT023' || nid === 'FRY30' || nid === 'HR031' || nid === 'HR033' || nid?.startsWith('FRY')) continue;
    provs.push(f);
  }
  for (const hf of PRECISION_HISTORICAL_FEATURES) provs.push(hf);
  for (const kf of KRESY_POWIAT_FEATURES) provs.push(kf);
  for (const uf of USSR_REGIONAL_FEATURES) provs.push(uf);

  // Focus on the area in image 1:
  // Lon: 21.5..30.0, Lat: 53.0..56.5
  const boxFeatures = provs.filter(f => {
    const bb = d3.geoBounds(f);
    return !(bb[1][0] < 21.5 || bb[0][0] > 30.0 || bb[1][1] < 53.0 || bb[0][1] > 56.5);
  });

  console.log(`Features in target region: ${boxFeatures.length}`);

  // Create bounding box for difference
  const focusBox: polygonClipping.Polygon = [[
    [21.5, 53.0],
    [30.0, 53.0],
    [30.0, 56.5],
    [21.5, 56.5],
    [21.5, 53.0]
  ]];

  // Union of features inside target region
  // Batch union by grouping to speed up
  const geoms = boxFeatures.map(f => toMultiPoly(f.geometry));
  
  // Use polygonClipping.union with array
  const occupied = (polygonClipping as any).union(...geoms);
  console.log('Occupied geometry parts:', occupied.length);

  const voids = polygonClipping.difference([focusBox], occupied);
  console.log('Total voids found:', voids.length);

  const significantVoids: any[] = [];
  for (const p of voids) {
    const ring = cleanRing(p[0]);
    const area = d3.geoArea({ type: 'Polygon', coordinates: [ring] } as any) * 6371 * 6371;
    if (area > 0.1) { // > 0.1 km²
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      ring.forEach(pt => {
        minX = Math.min(minX, pt[0]);
        minY = Math.min(minY, pt[1]);
        maxX = Math.max(maxX, pt[0]);
        maxY = Math.max(maxY, pt[1]);
      });
      significantVoids.push({ area, bbox: [minX, minY, maxX, maxY], pts: ring.length, ring });
    }
  }

  significantVoids.sort((a, b) => b.area - a.area);
  console.log(`\nSignificant voids (> 0.1 km²): ${significantVoids.length}`);
  significantVoids.forEach((v, idx) => {
    console.log(`Void #${idx}: area = ${v.area.toFixed(2)} km², bbox = [${v.bbox[0].toFixed(3)}, ${v.bbox[1].toFixed(3)}] to [${v.bbox[2].toFixed(3)}, ${v.bbox[3].toFixed(3)}], pts = ${v.pts}`);
  });
}

main().catch(console.error);
