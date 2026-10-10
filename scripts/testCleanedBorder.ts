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

function cleanFeatureGeom(geom: any): any {
  if (geom.type === 'Polygon') {
    return {
      type: 'Polygon',
      coordinates: geom.coordinates.map((ring: any[], i: number) => {
        let r = cleanRing(ring);
        // If it's a hole (i > 0), hole must be reversed so standalone area > 2*PI (CW)
        if (i > 0) {
          const a = d3.geoArea({ type: 'Polygon', coordinates: [r] } as any);
          if (a < 2 * Math.PI) r = r.slice().reverse();
        }
        return r;
      })
    };
  }
  if (geom.type === 'MultiPolygon') {
    return {
      type: 'MultiPolygon',
      coordinates: geom.coordinates.map((poly: any[][]) => {
        return poly.map((ring: any[], i: number) => {
          let r = cleanRing(ring);
          if (i > 0) {
            const a = d3.geoArea({ type: 'Polygon', coordinates: [r] } as any);
            if (a < 2 * Math.PI) r = r.slice().reverse();
          }
          return r;
        });
      })
    };
  }
  return geom;
}

async function main() {
  const nutsPath = path.resolve('public/data/nuts_10m.json');
  const topoNuts = JSON.parse(fs.readFileSync(nutsPath, 'utf8'));
  const nutsK = Object.keys(topoNuts.objects)[0];
  const nuts = (topojson.feature(topoNuts, topoNuts.objects[nutsK]) as any).features;

  // Let's test the border between Kresy and USSR when cleaned:
  const kresyCleaned = KRESY_POWIAT_FEATURES.map(f => ({
    ...f,
    geometry: cleanFeatureGeom(f.geometry)
  }));

  const ussrCleaned = USSR_REGIONAL_FEATURES.map(f => ({
    ...f,
    geometry: cleanFeatureGeom(f.geometry)
  }));

  const eastKresy = kresyCleaned.filter(f => {
    const bb = d3.geoBounds(f);
    return bb[1][0] > 26.5 && bb[1][1] >= 51.0 && bb[0][1] <= 56.5;
  });

  const westUssr = ussrCleaned.filter(f => {
    const id = f.id || '';
    if (id.startsWith('SOV_ADM1_BLR') || id === 'SOV_ADM1_RUS_16_Pskov_Oblast') return true;
    return false;
  });

  console.log(`Testing with cleaned geometries: ${eastKresy.length} Kresy powiats, ${westUssr.length} USSR regions`);

  let kresyUnion: any = [];
  eastKresy.forEach(f => {
    kresyUnion = polygonClipping.union(kresyUnion, toMultiPoly(f.geometry));
  });

  let ussrUnion: any = [];
  westUssr.forEach(f => {
    ussrUnion = polygonClipping.union(ussrUnion, toMultiPoly(f.geometry));
  });

  // Overlap
  const inter = polygonClipping.intersection(kresyUnion, ussrUnion);
  console.log(`Overlap Kresy & USSR: ${inter.length} poligoni`);
  let totOverlap = 0;
  inter.forEach(p => {
    totOverlap += d3.geoArea({ type: 'Polygon', coordinates: [cleanRing(p[0])] } as any) * 6371 * 6371;
  });
  console.log(`Total overlap: ${totOverlap.toFixed(4)} km²`);

  // Gaps in border strip [26.5, 52.0] to [30.0, 56.0]
  const borderStrip: polygonClipping.Polygon = [[
    [26.5, 52.0],
    [30.0, 52.0],
    [30.0, 56.0],
    [26.5, 56.0],
    [26.5, 52.0]
  ]];

  const occ = polygonClipping.union(kresyUnion, ussrUnion);
  const gaps = polygonClipping.difference([borderStrip], occ);
  console.log(`Gaps in border strip: ${gaps.length}`);
  
  // Filter gaps that are actually on the seam between Kresy and USSR
  let bigGapsCount = 0;
  gaps.forEach((p, i) => {
    const ring = cleanRing(p[0]);
    const a = d3.geoArea({ type: 'Polygon', coordinates: [ring] } as any) * 6371 * 6371;
    const bb = d3.geoBounds({ type: 'Polygon', coordinates: [ring] } as any);
    // Ignore gaps that are outside the shared border (e.g. north of Lat 55.8, south of Lat 52.5)
    if (a > 0.1) {
      bigGapsCount++;
      console.log(`Gap #${i}: ${a.toFixed(2)} km², bbox: [${bb[0].map(v => v.toFixed(3))}] to [${bb[1].map(v => v.toFixed(3))}]`);
    }
  });
  console.log(`Big gaps count: ${bigGapsCount}`);
}

main().catch(console.error);
