import * as fs from 'fs';
import polygonClipping from 'polygon-clipping';
import * as d3 from 'd3';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { CHINA_REGIONAL_FEATURES } from '../src/data/chinaRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';

function toGeom(g: any): any[] {
  if (!g) return [];
  if (g.type === 'Polygon') return [g.coordinates];
  if (g.type === 'MultiPolygon') return g.coordinates;
  return [];
}

function cleanRingWinding(ring: number[][]): number[][] {
  const f = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [ring] }, properties: {} };
  const a = d3.geoArea(f as any);
  if (a > 2 * Math.PI) {
    return ring.slice().reverse();
  }
  return ring;
}

function roundCoords(c: any): any {
  if (typeof c[0] === 'number') {
    return [Math.round(c[0] * 10000) / 10000, Math.round(c[1] * 10000) / 10000];
  }
  return c.map(roundCoords);
}

function toGeoJsonGeom(multiPoly: any[]): any {
  if (multiPoly.length === 1) {
    return {
      type: 'Polygon',
      coordinates: multiPoly[0].map(cleanRingWinding)
    };
  }
  return {
    type: 'MultiPolygon',
    coordinates: multiPoly.map((poly: any) => poly.map(cleanRingWinding))
  };
}

function polyAreaSqKm(geom: any): number {
  if (!geom) return 0;
  try {
    let a = d3.geoArea({ type: 'Feature', geometry: geom, properties: {} });
    if (a > 2 * Math.PI) a = 4 * Math.PI - a;
    return a * 6371 * 6371;
  } catch (e) {
    return 0;
  }
}

const monHb = WORLD_1938_GEOJSON.features.find((f: any) => f.properties?.NAME === 'Mongolia')!;
let monGeom = toGeom(monHb.geometry);

const sovMonFeats = USSR_REGIONAL_FEATURES.filter(u => /Altai_Republic|Tuva|Buryatia|Zabaykalsky/i.test(u.id));
let sovMonUnion = toGeom(sovMonFeats[0].geometry);
for (let i = 1; i < sovMonFeats.length; i++) {
  sovMonUnion = polygonClipping.union(sovMonUnion, toGeom(sovMonFeats[i].geometry));
}

const origXin = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_XINJIANG')!;
const origGansu = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_GANSU')!;
const origInnerMon = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_INNER_MONGOLIA')!;
const origXinganS = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_MANCHUKUO_XINGAN_SOUTH')!;
const origXinganN = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_MANCHUKUO_XINGAN_NORTH')!;

const allNeighbors = [
  sovMonUnion,
  toGeom(origXin.geometry),
  toGeom(origGansu.geometry),
  toGeom(origInnerMon.geometry),
  toGeom(origXinganN.geometry),
  toGeom(origXinganS.geometry)
];

let neighUnion = allNeighbors[0];
for (let i = 1; i < allNeighbors.length; i++) {
  neighUnion = polygonClipping.union(neighUnion, allNeighbors[i]);
}

const combined = polygonClipping.union(monGeom, neighUnion);
const holes: any[] = [];
for (const p of combined) {
  if (p.length > 1) {
    for (let r = 1; r < p.length; r++) {
      holes.push([[p[r]]]);
    }
  }
}
console.log(`Remaining boundary holes around Mongolia: ${holes.length}`);

for (const h of holes) {
  monGeom = polygonClipping.union(monGeom, h);
}
monGeom = polygonClipping.difference(monGeom, neighUnion);

const testCombined = polygonClipping.union(monGeom, neighUnion);
let finalHoles = 0;
let finalArea = 0;
for (const p of testCombined) {
  if (p.length > 1) {
    for (let r = 1; r < p.length; r++) {
      const a = polyAreaSqKm({ type: 'Polygon', coordinates: [p[r]] });
      if (a > 0.01) {
        finalHoles++;
        finalArea += a;
      }
    }
  }
}
console.log(`Final holes around Mongolia: ${finalHoles}, total area: ${finalArea.toFixed(4)} km²`);

// Update world1938.ts
const updatedHbFeatures = WORLD_1938_GEOJSON.features.map((f: any) => {
  if (f.properties?.NAME === 'Mongolia') {
    return {
      ...f,
      geometry: toGeoJsonGeom(roundCoords(monGeom))
    };
  }
  return f;
});

fs.writeFileSync('./src/data/world1938.ts', `export const WORLD_1938_GEOJSON: any = ${JSON.stringify({
  type: 'FeatureCollection',
  features: updatedHbFeatures
})};\n`, 'utf-8');
console.log('✓ Mongolia updated with zero holes!');
