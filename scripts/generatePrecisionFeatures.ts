import * as fs from 'fs';
import * as topojson from 'topojson-client';
import * as d3 from 'd3';
import polygonClipping from 'polygon-clipping';
import { ensureClockwiseForClipping, ensureCounterClockwise } from './windingUtils';

const rawNuts = JSON.parse(fs.readFileSync('public/data/nuts_10m.json', 'utf8'));
const k = Object.keys(rawNuts.objects)[0];
const nuts = (topojson.feature(rawNuts, rawNuts.objects[k]) as any).features;

const pl633 = nuts.find((f: any) => f.properties?.NUTS_ID === 'PL633');
const pl634 = nuts.find((f: any) => f.properties?.NUTS_ID === 'PL634');
const lt023 = nuts.find((f: any) => f.properties?.NUTS_ID === 'LT023');

const prepGeom = (geom: any): any => {
  const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
  return polys.map((poly: any[]) => poly.map((ring: any[], idx: number) => {
    if (idx === 0) return ensureClockwiseForClipping(ring);
    return ensureCounterClockwise(ring);
  }));
};

// 1. Danzig & Polish Corridor partition
const c633 = prepGeom(pl633.geometry);
const c634 = prepGeom(pl634.geometry);
const unionLand = polygonClipping.union(c633, c634);

const danzigBoxCutter = [
  [
    [18.555, 54.462],
    [18.52, 54.44],
    [18.48, 54.41],
    [18.44, 54.37],
    [18.50, 54.28],
    [18.60, 54.18],
    [18.72, 54.10],
    [18.72, 53.50],
    [20.50, 53.50],
    [20.50, 54.60],
    [18.555, 54.462]
  ]
];
const cDanzCutter = prepGeom({ type: 'Polygon', coordinates: danzigBoxCutter });
const danzigGeom = polygonClipping.intersection(unionLand, cDanzCutter);
const corridorGeom = polygonClipping.difference(unionLand, cDanzCutter);

// 2. Memel & Palanga partition
const northMemelCutter = [
  [
    [20.5, 55.82],
    [21.06, 55.82],
    [21.20, 55.81],
    [21.30, 55.78],
    [21.43, 55.70],
    [21.55, 55.58],
    [21.65, 55.50],
    [21.75, 55.35],
    [22.5, 55.35],
    [22.5, 57.0],
    [20.5, 57.0],
    [20.5, 55.82]
  ]
];
const cMemelCutter = prepGeom({ type: 'Polygon', coordinates: northMemelCutter });
const cLt023 = prepGeom(lt023.geometry);
const palangaGeom = polygonClipping.intersection(cLt023, cMemelCutter);
const memelGeom = polygonClipping.difference(cLt023, cMemelCutter);

const toGeoJsonGeom = (clippingResult: any[]) => {
  const normPolys = clippingResult.map((poly: any) =>
    poly.map((ring: any[], idx: number) =>
      idx === 0 ? ensureCounterClockwise(ring) : ensureClockwiseForClipping(ring)
    )
  );
  if (normPolys.length === 1) {
    return { type: 'Polygon', coordinates: normPolys[0] };
  }
  return { type: 'MultiPolygon', coordinates: normPolys };
};

const output = {
  danzig: toGeoJsonGeom(danzigGeom),
  corridor: toGeoJsonGeom(corridorGeom),
  palanga: toGeoJsonGeom(palangaGeom),
  memel: toGeoJsonGeom(memelGeom)
};

fs.writeFileSync('scripts/generatedPrecisionFeatures.json', JSON.stringify(output, null, 2));
console.log('Successfully generated precision features in scripts/generatedPrecisionFeatures.json');
console.log('Danzig type:', output.danzig.type);
console.log('Corridor type:', output.corridor.type);
console.log('Palanga type:', output.palanga.type);
console.log('Memel type:', output.memel.type);
