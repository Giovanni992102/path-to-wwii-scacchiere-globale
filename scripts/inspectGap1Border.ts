import { KRESY_POWIAT_FEATURES } from '../src/data/kresyPowiats';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import * as topojson from 'topojson-client';
import * as fs from 'fs';
import * as path from 'path';
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

  // Let's find all features touching or near Gap #1:
  // bbox: Lon 26.5..28.5, Lat 55.0..56.2
  console.log('Features near Gap #1 (Brasław, Dzisna, Vitebsk, Polotsk, Daugavpils):');

  // Kresy powiats in this area:
  for (const f of KRESY_POWIAT_FEATURES) {
    const poly = toMultiPoly(f.geometry);
    const cleaned = poly.map(part => part.map(cleanRing));
    const feat = { type: 'Feature', geometry: { type: poly.length > 1 ? 'MultiPolygon' : 'Polygon', coordinates: poly.length > 1 ? cleaned : cleaned[0] } };
    const bb = d3.geoBounds(feat as any);
    if (bb[1][0] >= 26.0 && bb[0][0] <= 28.5 && bb[1][1] >= 55.0 && bb[0][1] <= 56.2) {
      console.log(`- Kresy: ${f.id} (${f.properties?.name || f.properties?.NUTS_NAME}) bbox: [${bb[0].map(v => v.toFixed(2))}] to [${bb[1].map(v => v.toFixed(2))}]`);
    }
  }

  // USSR features in this area:
  for (const f of USSR_REGIONAL_FEATURES) {
    const bb = d3.geoBounds(f);
    if (bb[1][0] >= 26.0 && bb[0][0] <= 29.0 && bb[1][1] >= 55.0 && bb[0][1] <= 56.5) {
      console.log(`- USSR: ${f.id} (${f.properties?.NUTS_NAME}) bbox: [${bb[0].map(v => v.toFixed(2))}] to [${bb[1].map(v => v.toFixed(2))}]`);
    }
  }

  // Latvian NUTS-3 features in this area:
  for (const f of nuts) {
    const nid = f.properties && (f.properties.NUTS_ID || f.properties.NUTS_CODE || f.id || '');
    if (nid.startsWith('LV')) {
      const bb = d3.geoBounds(f);
      if (bb[1][0] >= 26.0 && bb[0][0] <= 28.5 && bb[1][1] >= 55.0 && bb[0][1] <= 56.5) {
        console.log(`- Latvia: ${nid} (${f.properties?.NUTS_NAME}) bbox: [${bb[0].map(v => v.toFixed(2))}] to [${bb[1].map(v => v.toFixed(2))}]`);
      }
    }
  }
}

main().catch(console.error);
