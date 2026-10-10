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

function unionAll(base: any[], list: any[]): any[] {
  let res = base;
  for (const item of list) {
    res = polygonClipping.union(res, item);
  }
  return res;
}

async function healMongolia() {
  console.log('=== HEALING MONGOLIA IN WORLD 1938 ===\n');

  // Load pristine base world 1938
  const rawWorld = JSON.parse(fs.readFileSync('./scripts/world_1938.json', 'utf-8'));
  const origMon = rawWorld.features.find((f: any) => f.properties?.NAME === 'Mongolia')!;

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

  // 1. Subtract all neighbors from pristine Mongolia
  let cleanMon = toGeom(origMon.geometry);
  cleanMon = polygonClipping.difference(cleanMon, sovMonUnion);
  cleanMon = polygonClipping.difference(cleanMon, toGeom(origXin.geometry));
  cleanMon = polygonClipping.difference(cleanMon, toGeom(origGansu.geometry));
  cleanMon = polygonClipping.difference(cleanMon, toGeom(origInnerMon.geometry));
  cleanMon = polygonClipping.difference(cleanMon, toGeom(origXinganN.geometry));
  cleanMon = polygonClipping.difference(cleanMon, toGeom(origXinganS.geometry));

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

  // 2. Extract boundary holes between cleanMon and neighbors
  const combined = polygonClipping.union(cleanMon, neighUnion);
  const holes: any[] = [];
  for (const p of combined) {
    if (p.length > 1) {
      for (let r = 1; r < p.length; r++) {
        holes.push([[p[r]]]);
      }
    }
  }
  console.log(`Found ${holes.length} boundary holes around Mongolia.`);

  // 3. Add all holes to cleanMon
  let healedMon = unionAll(cleanMon, holes);
  // Subtract neighbors to guarantee 0 overlap
  healedMon = polygonClipping.difference(healedMon, neighUnion);

  // Keep all legitimate parts (> 0.5 km2)
  const healedMonPolys = healedMon.filter((p: any) => polyAreaSqKm({ type: 'Polygon', coordinates: p }) > 0.5);

  const testOverlap = polygonClipping.intersection(healedMonPolys as any, neighUnion as any);
  console.log(`✓ Mongolia vs Neighbors Overlap: ${polyAreaSqKm({ type: 'MultiPolygon', coordinates: testOverlap }).toFixed(6)} km²`);

  const testCombined = polygonClipping.union(healedMonPolys as any, neighUnion as any);
  let remHoles = 0;
  let remArea = 0;
  for (const p of testCombined) {
    if (p.length > 1) {
      for (let r = 1; r < p.length; r++) {
        const a = polyAreaSqKm({ type: 'Polygon', coordinates: [p[r]] });
        if (a > 0.1) {
          remHoles++;
          remArea += a;
        }
      }
    }
  }
  console.log(`✓ Mongolia remaining holes (>0.1 km²): ${remHoles}, area: ${remArea.toFixed(4)} km²`);

  // 4. Update world1938.ts
  const updatedHbFeatures = WORLD_1938_GEOJSON.features
    .filter((f: any) => {
      const nm = (f.properties?.NAME || '').trim();
      if (nm === 'Xinjiang' || nm === 'Tibet' || nm === 'Hong Kong') return false;
      return true;
    })
    .map((f: any) => {
      const nm = f.properties?.NAME;
      if (nm === 'Mongolia') {
        return {
          ...f,
          geometry: toGeoJsonGeom(roundCoords(healedMonPolys))
        };
      }
      return f;
    });

  const world1938Code = `export const WORLD_1938_GEOJSON: any = ${JSON.stringify({
    type: 'FeatureCollection',
    features: updatedHbFeatures
  })};
`;
  fs.writeFileSync('./src/data/world1938.ts', world1938Code, 'utf-8');
  console.log('✓ src/data/world1938.ts successfully updated with healed Mongolia!');
}

healMongolia().catch(console.error);
