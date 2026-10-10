import { KRESY_POWIAT_FEATURES } from '../src/data/kresyPowiats';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
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
  console.log('--- AUDIT FRONTIERA POLONIA (KRESY) - URSS (BIELORUSSIA / RUSSIA) ---');

  // Find all Kresy powiats on the eastern border (Lon > 26.5, Lat: 51..56)
  const eastKresy = KRESY_POWIAT_FEATURES.filter(f => {
    // Invert winding if needed to get correct bounds
    const poly = toMultiPoly(f.geometry);
    const cleaned = poly.map(part => part.map(cleanRing));
    const feat = { type: 'Feature', geometry: { type: poly.length > 1 ? 'MultiPolygon' : 'Polygon', coordinates: poly.length > 1 ? cleaned : cleaned[0] } };
    const bb = d3.geoBounds(feat as any);
    return bb[1][0] > 26.5 && bb[1][1] >= 51.0 && bb[0][1] <= 56.5;
  });

  console.log(`Eastern Kresy powiats count: ${eastKresy.length}`);

  // Find USSR features on the western border (Belarus / Pskov)
  const westUssr = USSR_REGIONAL_FEATURES.filter(f => {
    const id = f.id || '';
    if (id.startsWith('SOV_ADM1_BLR') || id === 'SOV_ADM1_RUS_16_Pskov_Oblast') return true;
    return false;
  });

  console.log(`Western USSR features count: ${westUssr.length}`);
  westUssr.forEach(f => {
    console.log(`- ${f.id} (${f.properties?.NUTS_NAME})`);
  });

  // Check union of eastKresy and westUssr
  let kresyUnion: any = [];
  eastKresy.forEach(f => {
    const poly = toMultiPoly(f.geometry);
    const cleaned = poly.map(part => part.map(cleanRing));
    kresyUnion = polygonClipping.union(kresyUnion, cleaned);
  });

  let ussrUnion: any = [];
  westUssr.forEach(f => {
    ussrUnion = polygonClipping.union(ussrUnion, toMultiPoly(f.geometry));
  });

  // Overlap
  const inter = polygonClipping.intersection(kresyUnion, ussrUnion);
  console.log(`\nOverlap Kresy & USSR: ${inter.length} poligoni`);
  let totOverlap = 0;
  inter.forEach(p => {
    totOverlap += d3.geoArea({ type: 'Polygon', coordinates: [cleanRing(p[0])] } as any) * 6371 * 6371;
  });
  console.log(`Total overlap area: ${totOverlap.toFixed(2)} km²`);

  // Gaps / Voids between Kresy and USSR in the strip Lon: 26.5..30.0, Lat: 52.0..56.0
  const borderStrip: polygonClipping.Polygon = [[
    [26.5, 52.0],
    [30.0, 52.0],
    [30.0, 56.0],
    [26.5, 56.0],
    [26.5, 52.0]
  ]];

  const occ = polygonClipping.union(kresyUnion, ussrUnion);
  const gaps = polygonClipping.difference([borderStrip], occ);
  console.log(`\nGaps in border strip: ${gaps.length}`);
  const bigGaps = gaps.filter(p => {
    const a = d3.geoArea({ type: 'Polygon', coordinates: [cleanRing(p[0])] } as any) * 6371 * 6371;
    return a > 0.5;
  });
  console.log(`Big gaps (> 0.5 km²): ${bigGaps.length}`);
  bigGaps.forEach((p, i) => {
    const ring = cleanRing(p[0]);
    const a = d3.geoArea({ type: 'Polygon', coordinates: [ring] } as any) * 6371 * 6371;
    console.log(`Gap #${i}: ${a.toFixed(2)} km², bbox: [${d3.geoBounds({ type: 'Polygon', coordinates: [ring] } as any)}]`);
  });
}

main().catch(console.error);
