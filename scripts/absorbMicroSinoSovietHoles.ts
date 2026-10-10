import * as fs from 'fs';
import polygonClipping from 'polygon-clipping';
import * as d3 from 'd3';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { CHINA_REGIONAL_FEATURES } from '../src/data/chinaRegions';

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

async function absorbMicroHoles() {
  console.log('=== ABSORBING MICRO HOLES ALONG SINO-SOVIET BORDER ===\n');

  // 1. Central Asia
  const sovXinFeats = USSR_REGIONAL_FEATURES.filter(u =>
    /Gorno_Badakhshan|Osh_Region|Naryn_Region|Issyk_Kul|Almaty_Region|East_Kazakhstan|Altai_Republic/i.test(u.id)
  );
  let origXin = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_XINJIANG')!;

  let sovXinUnion = toGeom(sovXinFeats[0].geometry);
  for (let i = 1; i < sovXinFeats.length; i++) {
    sovXinUnion = polygonClipping.union(sovXinUnion, toGeom(sovXinFeats[i].geometry));
  }

  let xinGeom = toGeom(origXin.geometry);
  const xinCombined = polygonClipping.union(xinGeom, sovXinUnion);
  const xinMicroHoles: any[] = [];
  for (const p of xinCombined) {
    if (p.length > 1) {
      for (let r = 1; r < p.length; r++) {
        xinMicroHoles.push([[p[r]]]);
      }
    }
  }
  console.log(`Central Asia micro-holes found: ${xinMicroHoles.length}`);
  for (const h of xinMicroHoles) {
    xinGeom = polygonClipping.union(xinGeom, h);
  }
  xinGeom = polygonClipping.difference(xinGeom, sovXinUnion);

  // 2. Far East
  const manUssrFeats = USSR_REGIONAL_FEATURES.filter(u =>
    /Zabaykalsky|Amur_Oblast|Jewish_Autonomous|Khabarovsk_Krai|Primorsky_Krai/i.test(u.id)
  );
  let sovManUnion = toGeom(manUssrFeats[0].geometry);
  for (let i = 1; i < manUssrFeats.length; i++) {
    sovManUnion = polygonClipping.union(sovManUnion, toGeom(manUssrFeats[i].geometry));
  }

  let origXinganN = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_MANCHUKUO_XINGAN_NORTH')!;
  let origHeilongjiang = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_HEILONGJIANG')!;
  let origJilin = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_JILIN')!;

  let manUnion = polygonClipping.union(toGeom(origXinganN.geometry), toGeom(origHeilongjiang.geometry), toGeom(origJilin.geometry));
  const manCombined = polygonClipping.union(manUnion, sovManUnion);
  const manMicroHoles: { geom: any; bbox: any }[] = [];
  for (const p of manCombined) {
    if (p.length > 1) {
      for (let r = 1; r < p.length; r++) {
        const ring = p[r];
        let minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
        for (const pt of ring) {
          if (pt[0] < minx) minx = pt[0];
          if (pt[0] > maxx) maxx = pt[0];
          if (pt[1] < miny) miny = pt[1];
          if (pt[1] > maxy) maxy = pt[1];
        }
        manMicroHoles.push({ geom: [[ring]], bbox: { minx, maxx, miny, maxy } });
      }
    }
  }
  console.log(`Far East micro-holes found: ${manMicroHoles.length}`);

  let xinganNGeom = toGeom(origXinganN.geometry);
  let heilongjiangGeom = toGeom(origHeilongjiang.geometry);
  let jilinGeom = toGeom(origJilin.geometry);

  for (const h of manMicroHoles) {
    const midX = (h.bbox.minx + h.bbox.maxx) / 2;
    const midY = (h.bbox.miny + h.bbox.maxy) / 2;
    if (midX < 121.5 || (midX < 124 && midY > 52)) {
      xinganNGeom = polygonClipping.union(xinganNGeom, h.geom);
    } else if (midY > 45.2) {
      heilongjiangGeom = polygonClipping.union(heilongjiangGeom, h.geom);
    } else {
      jilinGeom = polygonClipping.union(jilinGeom, h.geom);
    }
  }

  xinganNGeom = polygonClipping.difference(xinganNGeom, sovManUnion);
  heilongjiangGeom = polygonClipping.difference(heilongjiangGeom, sovManUnion);
  heilongjiangGeom = polygonClipping.difference(heilongjiangGeom, xinganNGeom);
  jilinGeom = polygonClipping.difference(jilinGeom, sovManUnion);
  jilinGeom = polygonClipping.difference(jilinGeom, heilongjiangGeom);
  jilinGeom = polygonClipping.difference(jilinGeom, xinganNGeom);

  // Update src/data/chinaRegions.ts
  const updatedChina = CHINA_REGIONAL_FEATURES.map(f => {
    if (f.id === 'CHN_XINJIANG') return { ...f, geometry: toGeoJsonGeom(roundCoords(xinGeom)) };
    if (f.id === 'CHN_HEILONGJIANG') return { ...f, geometry: toGeoJsonGeom(roundCoords(heilongjiangGeom)) };
    if (f.id === 'CHN_MANCHUKUO_XINGAN_NORTH') return { ...f, geometry: toGeoJsonGeom(roundCoords(xinganNGeom)) };
    if (f.id === 'CHN_JILIN') return { ...f, geometry: toGeoJsonGeom(roundCoords(jilinGeom)) };
    return f;
  });

  fs.writeFileSync('./src/data/chinaRegions.ts', `// File generato: Granularizzazione integrale della Cina e Teatro Sino-Giapponese (1936-1940)
// Include tutte le 34 province, municipalità, teatri operativi del Ponte Marco Polo, Manciukuò, Mengjiang, Yan'an e Chongqing
export const CHINA_REGIONAL_FEATURES: any[] = ${JSON.stringify(updatedChina)};
`, 'utf-8');
  console.log('✓ src/data/chinaRegions.ts updated with absorbed micro-holes!');
}

absorbMicroHoles().catch(console.error);
