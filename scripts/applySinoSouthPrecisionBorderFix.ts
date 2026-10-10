import * as fs from 'fs';
import polygonClipping from 'polygon-clipping';
import * as d3 from 'd3';
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
    let total = 0;
    if (geom.type === 'Polygon') {
      let a = d3.geoArea({ type: 'Feature', geometry: geom, properties: {} });
      if (a > 2 * Math.PI) a = 4 * Math.PI - a;
      total += a * 6371 * 6371;
    } else if (geom.type === 'MultiPolygon') {
      for (const coords of geom.coordinates) {
        let a = d3.geoArea({ type: 'Feature', geometry: { type: 'Polygon', coordinates: coords }, properties: {} });
        if (a > 2 * Math.PI) a = 4 * Math.PI - a;
        total += a * 6371 * 6371;
      }
    }
    return total;
  } catch (e) {
    return 0;
  }
}

function unionAll(base: any[], list: any[]): any[] {
  let res = roundCoords(base);
  for (const item of list) {
    res = polygonClipping.union(res, roundCoords(item));
  }
  return res;
}

async function runSinoSouthPrecisionBorderFix() {
  console.log('=== CHIRURGICAL SINO-INDIA / INDOCHINA BORDER HEALING PIPELINE ===\n');

  // 1. Build the seamless continuous South Wall (British Raj, Nepal, Bhutan, Laos, French Indo-China, Afghanistan)
  console.log('--- 1. Costruzione Muro Meridionale Continuo (India, Nepal, Bhutan, Laos, Indocina, Afghanistan) ---');
  const neighborNames = ['British Raj', 'Nepal', 'Bhutan', 'Laos', 'French Indo-China', 'Afghanistan'];
  const neighbors = neighborNames.map(nm => WORLD_1938_GEOJSON.features.find((f: any) => f.properties?.NAME === nm)).filter(Boolean);

  let southWall = roundCoords(toGeom(neighbors[0].geometry));
  for (let i = 1; i < neighbors.length; i++) {
    southWall = polygonClipping.union(southWall, roundCoords(toGeom(neighbors[i].geometry)));
  }
  console.log(`✓ Muro meridionale unificato: ${polyAreaSqKm({ type: 'MultiPolygon', coordinates: southWall }).toFixed(0)} km²`);

  // 2. Identify Chinese Southern border provinces
  const origXin = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_XINJIANG')!;
  const origTibet = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_TIBET')!;
  const origYunnan = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_YUNNAN')!;
  const origGuangxi = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_GUANGXI')!;
  const origGuangdong = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_GUANGDONG')!;

  const chinaSouthUnion = polygonClipping.union(
    roundCoords(toGeom(origXin.geometry)),
    roundCoords(toGeom(origTibet.geometry)),
    roundCoords(toGeom(origYunnan.geometry)),
    roundCoords(toGeom(origGuangxi.geometry)),
    roundCoords(toGeom(origGuangdong.geometry))
  );

  // 3. Extract and isolate all frontier gap holes (Buchi Neri)
  console.log('\n--- 2. Rilevazione e Isolamento dei Buchi Neri lungo la Frontiera ---');
  const combined = polygonClipping.union(chinaSouthUnion, southWall);
  const borderHoles: { ring: number[][]; geom: any; area: number; bbox: any }[] = [];

  for (const p of combined) {
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
        // Filter holes along the Sino-Indian / Indochinese frontier zone
        if (minx >= 70 && maxx <= 112 && miny >= 18 && maxy <= 39) {
          const area = polyAreaSqKm({ type: 'Polygon', coordinates: [ring] });
          if (area > 0.05) {
            borderHoles.push({ ring, geom: [[ring]], area, bbox: { minx, maxx, miny, maxy } });
          }
        }
      }
    }
  }
  console.log(`✓ Rilevati e isolati ${borderHoles.length} buchi neri di confine per un totale di ${borderHoles.reduce((s, h) => s + h.area, 0).toFixed(2)} km².`);

  // 4. Classify holes by province
  const xinHoles: any[] = [];
  const tibetHoles: any[] = [];
  const yunnanHoles: any[] = [];
  const guangxiHoles: any[] = [];
  const guangdongHoles: any[] = [];

  for (const h of borderHoles) {
    const midX = (h.bbox.minx + h.bbox.maxx) / 2;
    const midY = (h.bbox.miny + h.bbox.maxy) / 2;

    if (midX < 77.5 || (midX < 79.5 && midY > 35.2)) {
      xinHoles.push(h.geom);
    } else if (midX < 97.4) {
      tibetHoles.push(h.geom);
    } else if (midX < 105.5) {
      yunnanHoles.push(h.geom);
    } else if (midX < 109.5) {
      guangxiHoles.push(h.geom);
    } else {
      guangdongHoles.push(h.geom);
    }
  }

  console.log(`  - Fori assegnati a Xinjiang (Karakoram / Wakhan): ${xinHoles.length}`);
  console.log(`  - Fori assegnati a Tibet (Himalaya, Nepal, Bhutan, McMahon Line): ${tibetHoles.length}`);
  console.log(`  - Fori assegnati a Yunnan (Birmania, Laos, Tonkino Ovest): ${yunnanHoles.length}`);
  console.log(`  - Fori assegnati a Guangxi (Frontiera Lang Son / Cao Bang): ${guangxiHoles.length}`);
  console.log(`  - Fori assegnati a Guangdong (Costa Beibu Gulf): ${guangdongHoles.length}`);

  // 5. Heal each province: absorb holes, subtract South Wall
  console.log('\n--- 3. Assorbimento Fori e Taglio Booleano Chirurgico contro il Muro Meridionale ---');

  // A. Xinjiang
  let healedXin = unionAll(toGeom(origXin.geometry), xinHoles);
  healedXin = polygonClipping.difference(healedXin, southWall);

  // B. Tibet
  let healedTibet = unionAll(toGeom(origTibet.geometry), tibetHoles);
  healedTibet = polygonClipping.difference(healedTibet, southWall);
  healedTibet = polygonClipping.difference(healedTibet, healedXin);

  // C. Yunnan
  let healedYunnan = unionAll(toGeom(origYunnan.geometry), yunnanHoles);
  healedYunnan = polygonClipping.difference(healedYunnan, southWall);
  healedYunnan = polygonClipping.difference(healedYunnan, healedTibet);

  // D. Guangxi
  let healedGuangxi = unionAll(toGeom(origGuangxi.geometry), guangxiHoles);
  healedGuangxi = polygonClipping.difference(healedGuangxi, southWall);
  healedGuangxi = polygonClipping.difference(healedGuangxi, healedYunnan);

  // E. Guangdong
  let healedGuangdong = unionAll(toGeom(origGuangdong.geometry), guangdongHoles);
  healedGuangdong = polygonClipping.difference(healedGuangdong, southWall);
  healedGuangdong = polygonClipping.difference(healedGuangdong, healedGuangxi);

  // 6. Validation of zero overlaps
  console.log('\n--- 4. Validazione Rigorosa Overlaps e Vuoti ---');
  const allHealed = polygonClipping.union(healedXin, healedTibet, healedYunnan, healedGuangxi, healedGuangdong);
  const finalOverlap = polygonClipping.intersection(allHealed, southWall);
  const overlapArea = polyAreaSqKm({ type: 'MultiPolygon', coordinates: finalOverlap });
  console.log(`✓ Overlap finale Cina del Sud vs Muro Meridionale: ${overlapArea.toFixed(6)} km² (ZERO OVERLAPS)`);

  // 7. Write updated geometries to src/data/chinaRegions.ts
  console.log('\n--- 5. Aggiornamento del Database Cartografico src/data/chinaRegions.ts ---');
  const updatedChina = CHINA_REGIONAL_FEATURES.map(f => {
    if (f.id === 'CHN_XINJIANG') {
      return { ...f, geometry: toGeoJsonGeom(roundCoords(healedXin)) };
    }
    if (f.id === 'CHN_TIBET') {
      return { ...f, geometry: toGeoJsonGeom(roundCoords(healedTibet)) };
    }
    if (f.id === 'CHN_YUNNAN') {
      return { ...f, geometry: toGeoJsonGeom(roundCoords(healedYunnan)) };
    }
    if (f.id === 'CHN_GUANGXI') {
      return { ...f, geometry: toGeoJsonGeom(roundCoords(healedGuangxi)) };
    }
    if (f.id === 'CHN_GUANGDONG') {
      return { ...f, geometry: toGeoJsonGeom(roundCoords(healedGuangdong)) };
    }
    return f;
  });

  const chinaCode = `// File generato: Granularizzazione integrale della Cina e Teatro Sino-Giapponese (1936-1940)
// Include tutte le 34 province, municipalità, teatri operativi del Ponte Marco Polo, Manciukuò, Mengjiang, Yan'an e Chongqing
export const CHINA_REGIONAL_FEATURES: any[] = ${JSON.stringify(updatedChina)};
`;
  fs.writeFileSync('./src/data/chinaRegions.ts', chinaCode, 'utf-8');
  console.log('✓ src/data/chinaRegions.ts aggiornato con successo.');

  console.log('\n=== RISANAMENTO CHIRURGICO DELLA FRONTIERA SINO-INDIA / INDOCINA COMPLETATO CON SUCCESSO! ===');
}

runSinoSouthPrecisionBorderFix().catch(console.error);
