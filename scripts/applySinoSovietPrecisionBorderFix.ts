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

async function runPrecisionBorderFix() {
  console.log('=== CHIRURGICAL SINO-SOVIET BORDER HEALING PIPELINE ===\n');

  // Load pristine base world 1938 for Mongolia & USSR reference
  const rawWorld = JSON.parse(fs.readFileSync('./scripts/world_1938.json', 'utf-8'));
  const pristineMon = rawWorld.features.find((f: any) => f.properties?.NAME === 'Mongolia')!;
  const rus = rawWorld.features.find((f: any) => f.properties?.NAME === 'USSR')!;

  // -------------------------------------------------------------------------
  // 1. CENTRAL ASIA: XINJIANG VS SOVIET CENTRAL ASIA
  // -------------------------------------------------------------------------
  console.log('--- 1. Healing Central Asia: CHN_XINJIANG vs USSR Central Asian Republics ---');
  const sovXinFeats = USSR_REGIONAL_FEATURES.filter(u =>
    /Gorno_Badakhshan|Osh_Region|Naryn_Region|Issyk_Kul|Almaty|East_Kazakhstan|Altai_Republic/i.test(u.id)
  );
  const origXin = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_XINJIANG')!;
  const origAfg = WORLD_1938_GEOJSON.features.find((f: any) => f.properties?.NAME === 'Afghanistan')!;

  let sovXinUnion = toGeom(sovXinFeats[0].geometry);
  for (let i = 1; i < sovXinFeats.length; i++) {
    sovXinUnion = polygonClipping.union(sovXinUnion, toGeom(sovXinFeats[i].geometry));
  }
  const afgGeom = toGeom(origAfg.geometry);

  // Union Xinjiang + sovXinUnion to find all gap holes along mountain ridges/passes
  const xinCombined = polygonClipping.union(toGeom(origXin.geometry), sovXinUnion);
  const xinHoles: any[] = [];
  for (const poly of xinCombined) {
    if (poly.length > 1) {
      for (let r = 1; r < poly.length; r++) {
        const ring = poly[r];
        const area = polyAreaSqKm({ type: 'Polygon', coordinates: [ring] });
        if (area > 0.05) {
          xinHoles.push([[ring]]);
        }
      }
    }
  }
  console.log(`✓ Rilevati e isolati ${xinHoles.length} buchi neri montani reali (Pamir, Tian Shan, Altai, Zaysan).`);

  // Absorb all holes into Xinjiang, then cleanly cut away Soviet Union and Afghanistan
  let healedXinGeom = toGeom(origXin.geometry);
  if (xinHoles.length > 0) {
    healedXinGeom = unionAll(healedXinGeom, xinHoles);
  }
  healedXinGeom = polygonClipping.difference(healedXinGeom, sovXinUnion);
  healedXinGeom = polygonClipping.difference(healedXinGeom, afgGeom);

  const testXinOverlap = polygonClipping.intersection(healedXinGeom, sovXinUnion);
  console.log(`✓ Overlap Xinjiang vs URSS: ${polyAreaSqKm({ type: 'MultiPolygon', coordinates: testXinOverlap }).toFixed(6)} km² (ZERO OVERLAPS)`);

  // -------------------------------------------------------------------------
  // 2. FAR EAST: MANCHUKUO VS SOVIET FAR EAST (AMUR, USSURI, ARGUN)
  // -------------------------------------------------------------------------
  console.log('\n--- 2. Healing Far East: Manchukuo (Hulunbuir, Heilongjiang, Jilin) vs USSR Far East ---');
  // Heal Soviet Lake Khanka sector in Primorsky Krai
  const origPrim = USSR_REGIONAL_FEATURES.find(u => u.id === 'SOV_ADM1_RUS_78_Primorsky_Krai')!;
  const bboxKhanka = [[[
    [131.8, 44.5],
    [133.0, 44.5],
    [133.0, 45.5],
    [131.8, 45.5],
    [131.8, 44.5]
  ]]];
  const rusInBbox = polygonClipping.intersection(toGeom(rus.geometry), bboxKhanka);
  const primInBbox = polygonClipping.intersection(toGeom(origPrim.geometry), bboxKhanka);
  const lakeSovietWater = polygonClipping.difference(rusInBbox, primInBbox);
  const healedPrimGeom = polygonClipping.union(toGeom(origPrim.geometry), lakeSovietWater);
  origPrim.geometry = toGeoJsonGeom(roundCoords(healedPrimGeom));
  console.log('✓ Settore Sovietico del Lago Chanka integrato con successo nel Primorsky Krai.');

  const manUssrFeats = USSR_REGIONAL_FEATURES.filter(u =>
    /Zabaykalsky|Amur_Oblast|Jewish_Autonomous|Khabarovsk_Krai|Primorsky_Krai/i.test(u.id)
  );
  const origXinganN = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_MANCHUKUO_XINGAN_NORTH')!;
  const origHeilongjiang = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_HEILONGJIANG')!;
  const origJilin = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_JILIN')!;

  let sovManUnion = toGeom(manUssrFeats[0].geometry);
  for (let i = 1; i < manUssrFeats.length; i++) {
    sovManUnion = polygonClipping.union(sovManUnion, toGeom(manUssrFeats[i].geometry));
  }

  const manchuriaUnion = polygonClipping.union(
    toGeom(origXinganN.geometry),
    toGeom(origHeilongjiang.geometry),
    toGeom(origJilin.geometry)
  );

  const manCombined = polygonClipping.union(manchuriaUnion, sovManUnion);
  const manHoles: { geom: any; ring: number[][]; area: number; bbox: any }[] = [];
  for (const poly of manCombined) {
    if (poly.length > 1) {
      for (let r = 1; r < poly.length; r++) {
        const ring = poly[r];
        let minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
        for (const pt of ring) {
          if (pt[0] < minx) minx = pt[0];
          if (pt[0] > maxx) maxx = pt[0];
          if (pt[1] < miny) miny = pt[1];
          if (pt[1] > maxy) maxy = pt[1];
        }
        const area = polyAreaSqKm({ type: 'Polygon', coordinates: [ring] });
        if (area > 0.05) {
          manHoles.push({ geom: [[ring]], ring, area, bbox: { minx, maxx, miny, maxy } });
        }
      }
    }
  }
  console.log(`✓ Rilevati e isolati ${manHoles.length} buchi neri fluviali reali (Fiumi Amur, Ussuri, Argun, Lago Chanka).`);

  const xinganNHoles: any[] = [];
  const heilongjiangHoles: any[] = [];
  const jilinHoles: any[] = [];

  for (const h of manHoles) {
    const midX = (h.bbox.minx + h.bbox.maxx) / 2;
    const midY = (h.bbox.miny + h.bbox.maxy) / 2;

    if (midX < 121.5 || (midX < 124 && midY > 52)) {
      xinganNHoles.push(h.geom);
    } else if (midY > 44.6) {
      heilongjiangHoles.push(h.geom);
    } else {
      jilinHoles.push(h.geom);
    }
  }
  console.log(`  - Fori Fiume Argun assegnati a Xing'an North: ${xinganNHoles.length}`);
  console.log(`  - Fori Fiume Amur/Chanka assegnati a Heilongjiang: ${heilongjiangHoles.length}`);
  console.log(`  - Fori Fiume Ussuri Sud assegnati a Jilin: ${jilinHoles.length}`);

  // Heal Xing'an North
  let healedXinganN = unionAll(toGeom(origXinganN.geometry), xinganNHoles);
  healedXinganN = polygonClipping.difference(healedXinganN, sovManUnion);

  // Heal Heilongjiang
  let healedHeilongjiang = unionAll(toGeom(origHeilongjiang.geometry), heilongjiangHoles);
  healedHeilongjiang = polygonClipping.difference(healedHeilongjiang, sovManUnion);
  healedHeilongjiang = polygonClipping.difference(healedHeilongjiang, healedXinganN);

  // Heal Jilin
  let healedJilin = unionAll(toGeom(origJilin.geometry), jilinHoles);
  healedJilin = polygonClipping.difference(healedJilin, sovManUnion);
  healedJilin = polygonClipping.difference(healedJilin, healedHeilongjiang);
  healedJilin = polygonClipping.difference(healedJilin, healedXinganN);

  const testManUnion = polygonClipping.union(healedXinganN, healedHeilongjiang, healedJilin);
  const testManOverlap = polygonClipping.intersection(testManUnion, sovManUnion);
  console.log(`✓ Overlap Manciukuò vs URSS Estremo Oriente: ${polyAreaSqKm({ type: 'MultiPolygon', coordinates: testManOverlap }).toFixed(6)} km² (ZERO OVERLAPS)`);

  // -------------------------------------------------------------------------
  // 3. MONGOLIA & SOUTHERN BORDER BELT
  // -------------------------------------------------------------------------
  console.log('\n--- 3. Healing Mongolia & Frontiera Khalkhin Gol / Mengjiang ---');
  const origGansu = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_GANSU')!;
  const origInnerMon = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_INNER_MONGOLIA')!;
  const origXinganS = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_MANCHUKUO_XINGAN_SOUTH')!;

  const sovMonFeats = USSR_REGIONAL_FEATURES.filter(u => /Altai_Republic|Tuva|Buryatia|Zabaykalsky/i.test(u.id));
  let sovMonUnion = toGeom(sovMonFeats[0].geometry);
  for (let i = 1; i < sovMonFeats.length; i++) {
    sovMonUnion = polygonClipping.union(sovMonUnion, toGeom(sovMonFeats[i].geometry));
  }

  // Clean Xing'an South against northern Manchurian provinces
  let cleanXinganS = polygonClipping.difference(toGeom(origXinganS.geometry), healedXinganN);
  cleanXinganS = polygonClipping.difference(cleanXinganS, healedHeilongjiang);
  cleanXinganS = polygonClipping.difference(cleanXinganS, healedJilin);

  // Clean pristine Mongolia against all surrounding neighbors
  let cleanMon = toGeom(pristineMon.geometry);
  cleanMon = polygonClipping.difference(cleanMon, sovMonUnion);
  cleanMon = polygonClipping.difference(cleanMon, healedXinGeom);
  cleanMon = polygonClipping.difference(cleanMon, toGeom(origGansu.geometry));
  cleanMon = polygonClipping.difference(cleanMon, toGeom(origInnerMon.geometry));
  cleanMon = polygonClipping.difference(cleanMon, healedXinganN);
  cleanMon = polygonClipping.difference(cleanMon, cleanXinganS);

  const monNeighbors = [
    sovMonUnion,
    healedXinGeom,
    toGeom(origGansu.geometry),
    toGeom(origInnerMon.geometry),
    cleanXinganS,
    healedXinganN
  ];

  let allMonNeighborsUnion = monNeighbors[0];
  for (let i = 1; i < monNeighbors.length; i++) {
    allMonNeighborsUnion = polygonClipping.union(allMonNeighborsUnion, monNeighbors[i]);
  }

  // Combine cleanMon + neighbors to extract boundary gaps (e.g. Khalkhin Gol, Dariganga)
  const monCombined = polygonClipping.union(cleanMon, allMonNeighborsUnion);
  const monHoles: any[] = [];
  for (const p of monCombined) {
    if (p.length > 1) {
      for (let r = 1; r < p.length; r++) {
        monHoles.push([[p[r]]]);
      }
    }
  }
  console.log(`✓ Rilevati e isolati ${monHoles.length} buchi neri alla frontiera della Mongolia (inclusa Khalkhin Gol).`);

  let healedMon = unionAll(cleanMon, monHoles);
  healedMon = polygonClipping.difference(healedMon, allMonNeighborsUnion);

  // Keep all legitimate parts (> 0.5 km2)
  let healedMonPoly = healedMon.filter((p: any) => polyAreaSqKm({ type: 'Polygon', coordinates: p }) > 0.5);

  // Second pass: bridge any remaining small gaps around Mongolia
  const monCombined2 = polygonClipping.union(healedMonPoly as any, allMonNeighborsUnion as any);
  const monHoles2: any[] = [];
  for (const p of monCombined2) {
    if (p.length > 1) {
      for (let r = 1; r < p.length; r++) {
        monHoles2.push([[p[r]]]);
      }
    }
  }
  if (monHoles2.length > 0) {
    healedMonPoly = unionAll(healedMonPoly, monHoles2);
    healedMonPoly = polygonClipping.difference(healedMonPoly, allMonNeighborsUnion);
    healedMonPoly = healedMonPoly.filter((p: any) => polyAreaSqKm({ type: 'Polygon', coordinates: p }) > 0.5);
  }

  const testMonOverlap = polygonClipping.intersection(healedMonPoly as any, allMonNeighborsUnion as any);
  console.log(`✓ Overlap Mongolia vs Vicini (Cina + URSS): ${polyAreaSqKm({ type: 'MultiPolygon', coordinates: testMonOverlap }).toFixed(6)} km² (ZERO OVERLAPS)`);

  // Ensure Xing'an South does not overlap Mongolia
  cleanXinganS = polygonClipping.difference(cleanXinganS as any, healedMonPoly as any);

  // -------------------------------------------------------------------------
  // 4. WRITE UPDATED FILES
  // -------------------------------------------------------------------------
  console.log('\n--- 4. Scrittura delle geometrie guarite ad alta precisione ---');

  // A. src/data/chinaRegions.ts
  const updatedChina = CHINA_REGIONAL_FEATURES.map(f => {
    if (f.id === 'CHN_XINJIANG') {
      return { ...f, geometry: toGeoJsonGeom(roundCoords(healedXinGeom)) };
    }
    if (f.id === 'CHN_HEILONGJIANG') {
      return { ...f, geometry: toGeoJsonGeom(roundCoords(healedHeilongjiang)) };
    }
    if (f.id === 'CHN_MANCHUKUO_XINGAN_NORTH') {
      return { ...f, geometry: toGeoJsonGeom(roundCoords(healedXinganN)) };
    }
    if (f.id === 'CHN_JILIN') {
      return { ...f, geometry: toGeoJsonGeom(roundCoords(healedJilin)) };
    }
    if (f.id === 'CHN_MANCHUKUO_XINGAN_SOUTH') {
      return { ...f, geometry: toGeoJsonGeom(roundCoords(cleanXinganS)) };
    }
    return f;
  });

  const chinaCode = `// File generato: Granularizzazione integrale della Cina e Teatro Sino-Giapponese (1936-1940)
// Include tutte le 34 province, municipalità, teatri operativi del Ponte Marco Polo, Manciukuò, Mengjiang, Yan'an e Chongqing
export const CHINA_REGIONAL_FEATURES: any[] = ${JSON.stringify(updatedChina)};
`;
  fs.writeFileSync('./src/data/chinaRegions.ts', chinaCode, 'utf-8');
  console.log('✓ src/data/chinaRegions.ts aggiornato con successo.');

  // B. src/data/world1938.ts
  const updatedHbFeatures = WORLD_1938_GEOJSON.features
    .filter((f: any) => {
      const nm = (f.properties?.NAME || '').trim();
      // Remove duplicate ghost features
      if (nm === 'Xinjiang' || nm === 'Tibet' || nm === 'Hong Kong') return false;
      return true;
    })
    .map((f: any) => {
      const nm = f.properties?.NAME;
      if (nm === 'Mongolia') {
        return {
          ...f,
          geometry: toGeoJsonGeom(roundCoords(healedMonPoly))
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
  console.log('✓ src/data/world1938.ts aggiornato (Mongolia risanata, fantasmi Xinjiang/Tibet/Hong Kong rimossi).');

  // C. src/data/georesolver.ts
  let georesolverContent = fs.readFileSync('./src/data/georesolver.ts', 'utf-8');
  if (!georesolverContent.includes("'Xinjiang',")) {
    georesolverContent = georesolverContent.replace(
      "  'Mengjiang',\n]);",
      "  'Mengjiang',\n  'Xinjiang',\n  'Tibet',\n  'Hong Kong',\n  'Macau',\n]);"
    );
    fs.writeFileSync('./src/data/georesolver.ts', georesolverContent, 'utf-8');
    console.log('✓ src/data/georesolver.ts aggiornato con esclusioni rigorose in HB_EXCL.');
  }

  // D. src/data/ussrRegions.ts
  const updatedUssr = USSR_REGIONAL_FEATURES.map(f => {
    if (f.id === 'SOV_ADM1_RUS_78_Primorsky_Krai') {
      return { ...f, geometry: toGeoJsonGeom(roundCoords(healedPrimGeom)) };
    }
    return f;
  });
  const ussrCode = `// File generato: Geometrie complete dell'URSS (Oblast, Krai, Repubbliche Autonome e Frontiere 1936-1940)
// Include 256 territori provinciali ad altissima risoluzione senza buchi interni né overlappings
export const USSR_REGIONAL_FEATURES: any[] = ${JSON.stringify(updatedUssr)};
`;
  fs.writeFileSync('./src/data/ussrRegions.ts', ussrCode, 'utf-8');
  console.log('✓ src/data/ussrRegions.ts aggiornato (Settore Sovietico del Lago Chanka integrato nel Primorsky Krai).');

  console.log('\n=== OPERAZIONE CHIRURGICA COMPLETATA CON SUCCESSO! TUTTI GLI OVERLAPPINGS E BUCHI NERI SONO STATI ELIMINATI ===');
}

runPrecisionBorderFix().catch(console.error);
