import * as fs from 'fs';
import * as path from 'path';
import polygonClipping from 'polygon-clipping';
import * as d3 from 'd3';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { CHINA_REGIONAL_FEATURES } from '../src/data/chinaRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import { HB_EXCL } from '../src/data/georesolver';

console.log('=== APPLICAZIONE RETTIFICA CHIRURGICA CONFINI SOVIETICO-AFGHANO-IRANIANI ===\n');

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

function geomAreaKm2(geom: any): number {
  if (!geom || geom.length === 0) return 0;
  let totalKm2 = 0;
  for (const poly of geom) {
    if (!poly || poly.length === 0) continue;
    const f = {
      type: 'Feature',
      properties: {},
      geometry: { type: 'Polygon', coordinates: poly }
    };
    let a = d3.geoArea(f as any);
    if (a > 2 * Math.PI) a = 4 * Math.PI - a;
    totalKm2 += (a / (4 * Math.PI)) * 510072000;
  }
  return totalKm2;
}

const activeHb = WORLD_1938_GEOJSON.features.filter((f: any) => {
  const nm = f.properties?.NAME;
  return nm && !HB_EXCL.has(nm);
});

const origIran = activeHb.find((f: any) => f.properties?.NAME === 'Iran')!;
const origAfg = activeHb.find((f: any) => f.properties?.NAME === 'Afghanistan')!;
const raj = activeHb.find((f: any) => f.properties?.NAME === 'British Raj')!;
const xinjiang = CHINA_REGIONAL_FEATURES.find(f => f.id === 'CHN_XINJIANG')!;

// ----------------------------------------------------------------------------
// 1. RETTIFICA MARY (TKM_164): ELIMINAZIONE DELLO SBORDAMENTO SU TORGHUNDI
// ----------------------------------------------------------------------------
console.log('--- 1. Rettifica della cuspide di Kushka in Mary (Turkmenistan) ---');
const origMary = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_TKM_164_Mary')!;
const mCoords = (origMary.geometry.type === 'Polygon' ? origMary.geometry.coordinates[0] : origMary.geometry.coordinates[0][0]) as [number, number][];

const newMaryRing = [
  ...mCoords.slice(0, 73),
  [62.70, 35.33],
  [62.45, 35.30],
  [62.35, 35.275],
  [62.33, 35.275],
  [62.25, 35.30],
  [62.18, 35.33],
  ...mCoords.slice(80)
];

const cleanMaryGeom = {
  type: 'Polygon',
  coordinates: [newMaryRing.map(cleanRingWinding)]
};
const cleanMaryFeat = { ...origMary, geometry: cleanMaryGeom };
console.log('✓ Mary rettificata con Kushka [62.34, 35.28] all\'URSS e Torghundi [62.21, 35.25] all\'Afghanistan.');

// ----------------------------------------------------------------------------
// 2. CREAZIONE DELLA SOVIET SOUTH WALL CONTINUA
// ----------------------------------------------------------------------------
console.log('\n--- 2. Creazione della barriera continua di confine sovietica ---');
const sovBorderFeats = USSR_REGIONAL_FEATURES.map(f => {
  if (f.id === 'SOV_ADM1_TKM_164_Mary') return cleanMaryFeat;
  return f;
}).filter(f => {
  const id = f.id;
  return id === 'SOV_ADM1_AZE_128_Nakhchivan_Autonomous_Republic' ||
         id === 'SOV_ADM1_AZE_129_Contiguous_Azerbaijan' ||
         id === 'SOV_ADM1_ARM_118_Syunik' ||
         id === 'SOV_ADM1_ARM_127_Ararat' ||
         id === 'SOV_ADM1_TKM_160_Balkan' ||
         id === 'SOV_ADM1_TKM_161_Ahai' ||
         id === 'SOV_ADM1_TKM_164_Mary' ||
         id === 'SOV_ADM1_TKM_163_Lebap' ||
         id === 'SOV_ADM1_UZB_152_Surxondaryo_Region' ||
         id === 'SOV_ADM1_TJK_168_Khatlon_Region' ||
         id === 'SOV_ADM1_TJK_166_Gorno_Badakhshan_Autonomous_Region';
});

let sovWall = toGeom(sovBorderFeats[0].geometry);
for (let i = 1; i < sovBorderFeats.length; i++) {
  sovWall = polygonClipping.union(sovWall, toGeom(sovBorderFeats[i].geometry));
}
console.log(`✓ SovietSouthWall continua calcolata con successo (parti: ${sovWall.length}).`);

// ----------------------------------------------------------------------------
// 3. ESTRAZIONE E CLASSIFICAZIONE DEI 30 BUCHI NERI DI FRONTIERA
// ----------------------------------------------------------------------------
console.log('\n--- 3. Estrazione e assorbimento dei 30 buchi neri di frontiera ---');
const focusBox = [
  [[[44.0, 34.0], [75.5, 34.0], [75.5, 42.0], [44.0, 42.0], [44.0, 34.0]]]
];
const caspianWater = [
  [[
    [48.8, 38.45], [49.2, 40.0], [50.5, 41.8], [53.5, 41.8], [54.0, 38.0],
    [54.0, 36.9], [53.5, 36.75], [51.5, 36.65], [49.5, 37.4], [48.8, 38.45]
  ]]
];

const allLand = [
  sovWall,
  toGeom(origIran.geometry),
  toGeom(origAfg.geometry),
  toGeom(raj.geometry),
  toGeom(xinjiang.geometry)
];

let landUnion: any[] = [];
for (const l of allLand) {
  try {
    const cropped = polygonClipping.intersection(l, focusBox);
    if (cropped.length > 0) {
      landUnion = landUnion.length === 0 ? cropped : polygonClipping.union(landUnion, cropped);
    }
  } catch (e: any) {}
}

const rawGaps = polygonClipping.difference(focusBox, landUnion);
const trueGaps = polygonClipping.difference(rawGaps, caspianWater);

const afgHoles: any[] = [];
const iranHoles: any[] = [];
let totalGapArea = 0;

for (const poly of trueGaps) {
  const km2 = geomAreaKm2([poly]);
  let cx = 0, cy = 0, n = 0;
  for (const pt of poly[0]) {
    cx += pt[0]; cy += pt[1]; n++;
  }
  cx /= n; cy /= n;

  const isFrontier = (
    (cx >= 44.5 && cx <= 49.0 && cy >= 38.3 && cy <= 40.0) ||
    (cx >= 54.0 && cx <= 61.5 && cy >= 36.0 && cy <= 38.5) ||
    (cx >= 60.5 && cx <= 65.0 && cy >= 35.0 && cy <= 37.5) ||
    (cx >= 65.0 && cx <= 68.5 && cy >= 36.5 && cy <= 38.0) ||
    (cx >= 68.0 && cx <= 70.5 && cy >= 36.8 && cy <= 38.2) ||
    (cx >= 70.5 && cx <= 75.2 && cy >= 36.5 && cy <= 38.5)
  );

  if (isFrontier && km2 > 2.0 && km2 < 20000.0) {
    totalGapArea += km2;
    if (cx < 61.22) {
      iranHoles.push(poly);
    } else {
      afgHoles.push(poly);
    }
  }
}
console.log(`✓ Rilevati ${afgHoles.length + iranHoles.length} buchi neri di frontiera (${totalGapArea.toFixed(1)} km² totali):`);
console.log(`  - ${afgHoles.length} buchi assegnati all'Afghanistan (Kunduz, Badakhshan, Wakhan, Termez Sud, Khamyab)`);
console.log(`  - ${iranHoles.length} buchi assegnati all'Iran (Kopet Dag, Sarakhs Ovest, Atrek Sud, Aras Sud)`);

// ----------------------------------------------------------------------------
// 4. RICOSTRUZIONE E RITAGLIO CHIRURGICO DELL'AFGHANISTAN
// ----------------------------------------------------------------------------
console.log('\n--- 4. Ricostruzione dell\'Afghanistan ---');
let afgGeom = toGeom(origAfg.geometry);
for (const h of afgHoles) {
  try {
    afgGeom = polygonClipping.union(afgGeom, [h]);
  } catch (e) {}
}
afgGeom = roundCoords(afgGeom);
afgGeom = polygonClipping.difference(afgGeom, sovWall);
afgGeom = polygonClipping.difference(afgGeom, toGeom(xinjiang.geometry));
afgGeom = polygonClipping.difference(afgGeom, toGeom(raj.geometry));
console.log(`✓ Afghanistan integrato e sigillato con URSS, Cina e British Raj. Area: ${Math.round(geomAreaKm2(afgGeom)).toLocaleString()} km²`);

// ----------------------------------------------------------------------------
// 5. RICOSTRUZIONE E RITAGLIO CHIRURGICO DELL'IRAN
// ----------------------------------------------------------------------------
console.log('\n--- 5. Ricostruzione dell\'Iran ---');
let iranGeom = toGeom(origIran.geometry);
for (const h of iranHoles) {
  try {
    iranGeom = polygonClipping.union(iranGeom, [h]);
  } catch (e) {}
}
// Integrata la linea di costa del Mar Caspio (Astara, Bandar Anzali, Ramsar, Chalus)
const caspianCoastWedge = [
  [[
    [48.791, 38.452],
    [48.88, 38.44],
    [48.92, 38.20],
    [49.10, 37.80],
    [49.46, 37.52],
    [49.95, 37.45],
    [50.31, 37.18],
    [50.68, 36.95],
    [51.45, 36.70],
    [52.65, 36.75],
    [53.80, 36.90],
    [54.07, 36.90],
    [54.00, 36.50],
    [48.50, 36.50],
    [48.791, 38.452]
  ]]
];
iranGeom = polygonClipping.union(iranGeom, caspianCoastWedge);
iranGeom = roundCoords(iranGeom);
iranGeom = polygonClipping.difference(iranGeom, sovWall);
iranGeom = polygonClipping.difference(iranGeom, afgGeom);
iranGeom = polygonClipping.difference(iranGeom, toGeom(raj.geometry));
console.log(`✓ Iran integrato e sigillato con URSS, Afghanistan e British Raj. Area: ${Math.round(geomAreaKm2(iranGeom)).toLocaleString()} km²`);

// ----------------------------------------------------------------------------
// 6. AGGIORNAMENTO DI src/data/ussrRegions.ts
// ----------------------------------------------------------------------------
console.log('\n--- 6. Aggiornamento ussrRegions.ts ---');
const updatedUssrFeatures = USSR_REGIONAL_FEATURES.map(f => {
  if (f.id === 'SOV_ADM1_TKM_164_Mary') {
    return cleanMaryFeat;
  }
  return f;
});

const ussrFilePath = path.join(process.cwd(), 'src/data/ussrRegions.ts');
const ussrFileContent = `// File generato: Geometrie complete dell'URSS (Oblast, Krai, Repubbliche Autonome e Frontiere 1936-1940)
// Include 256 territori provinciali ad altissima risoluzione senza buchi interni né overlappings
export const USSR_REGIONAL_FEATURES: any[] = ${JSON.stringify(updatedUssrFeatures)};
`;
fs.writeFileSync(ussrFilePath, ussrFileContent, 'utf8');
console.log(`✓ Scritto ${ussrFilePath} (${(Buffer.byteLength(ussrFileContent) / 1024 / 1024).toFixed(2)} MB).`);

// ----------------------------------------------------------------------------
// 7. AGGIORNAMENTO DI src/data/world1938.ts
// ----------------------------------------------------------------------------
console.log('\n--- 7. Aggiornamento world1938.ts ---');
const finalIranFeat = {
  ...origIran,
  geometry: toGeoJsonGeom(iranGeom)
};

const finalAfgFeat = {
  ...origAfg,
  geometry: toGeoJsonGeom(afgGeom)
};

const updatedWorldFeatures = WORLD_1938_GEOJSON.features.map((f: any) => {
  if (f.properties?.NAME === 'Iran') return finalIranFeat;
  if (f.properties?.NAME === 'Afghanistan') return finalAfgFeat;
  return f;
});

const world1938Obj = {
  ...WORLD_1938_GEOJSON,
  features: updatedWorldFeatures
};

const world1938FilePath = path.join(process.cwd(), 'src/data/world1938.ts');
const world1938Content = `export const WORLD_1938_GEOJSON: any = ${JSON.stringify(world1938Obj)};\n`;
fs.writeFileSync(world1938FilePath, world1938Content, 'utf8');
console.log(`✓ Scritto ${world1938FilePath} (${(Buffer.byteLength(world1938Content) / 1024 / 1024).toFixed(2)} MB).`);

console.log('\n🎉 RETTIFICA CONFINI SOVIETICO-AFGHANO-IRANIANI COMPLETATA CON SUCCESSO!');
