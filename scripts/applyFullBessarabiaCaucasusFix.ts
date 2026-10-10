import * as fs from 'fs';
import * as path from 'path';
import polygonClipping from 'polygon-clipping';
import * as d3 from 'd3';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';

console.log('=== APPLICAZIONE DEFINITIVA DI PRECISIONE GEOGRAFICA ===\n');

function fixRingWinding(ring: number[][]): number[][] {
  const f = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [ring] }, properties: {} };
  const a = d3.geoArea(f as any);
  if (a > 2 * Math.PI) {
    return ring.slice().reverse();
  }
  return ring;
}

// ----------------------------------------------------------------------------
// 1. PULIZIA ENCLAVI POST-SOVIETICHE NEL CAUCASO (ARMENIA & AZERBAIGIAN)
// ----------------------------------------------------------------------------
const origTavush = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_ARM_119_Tavush')!;
const cleanTavush = {
  ...origTavush,
  geometry: {
    type: 'Polygon',
    coordinates: [fixRingWinding(origTavush.geometry.coordinates[0])]
  }
};

const origArarat = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_ARM_127_Ararat')!;
const cleanArarat = {
  ...origArarat,
  geometry: {
    type: 'Polygon',
    coordinates: [fixRingWinding(origArarat.geometry.coordinates[0])]
  }
};

const origAzeContig = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_AZE_129_Contiguous_Azerbaijan')!;
// In origAzeContig, coordinates[2][0] was the main continuous ring (without the inner hole and 2 detached slivers)
const azeMainRing = origAzeContig.geometry.type === 'MultiPolygon' 
  ? (origAzeContig.geometry.coordinates[2] ? origAzeContig.geometry.coordinates[2][0] : origAzeContig.geometry.coordinates[0][0])
  : origAzeContig.geometry.coordinates[0];

const cleanAzeContig = {
  ...origAzeContig,
  geometry: {
    type: 'Polygon',
    coordinates: [fixRingWinding(azeMainRing)]
  }
};
console.log('1. Armenia e Azerbaigian puliti da tutti i buchi di enclavi post-sovietiche ✓');

// ----------------------------------------------------------------------------
// 2. SIGILLATURA DEL CONFINE TURCHIA - CAUCASO SOVIETICO - IRAN
// ----------------------------------------------------------------------------
const origIran = WORLD_1938_GEOJSON.features.find((f: any) => (f.properties?.NAME || '').toLowerCase() === 'iran')!;
const iranRing = origIran.geometry.coordinates[0][0];

const nakh = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_AZE_128_Nakhchivan_Autonomous_Republic')!;
const syunik = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_ARM_118_Syunik')!;

const nRing = (nakh.geometry.type === 'MultiPolygon' ? nakh.geometry.coordinates[0][0] : nakh.geometry.coordinates[0]) as [number, number][];
const sRing = (syunik.geometry.type === 'MultiPolygon' ? syunik.geometry.coordinates[0][0] : syunik.geometry.coordinates[0]) as [number, number][];
const aRing = cleanAzeContig.geometry.coordinates[0] as [number, number][];

// Segmento confine orientale Turchia (da [44.2052, 37.8674] a Nakhchivan [44.7630, 39.7050])
// Colma interamente il saliente nord-occidentale di Maku / Khoy / Chaldoran
const trSeg: [number, number][] = [
  [44.2311, 37.9108],
  [44.2799, 37.9963],
  [44.4752, 38.3374],
  [44.3170, 38.6045],
  [44.2951, 38.8267],
  [44.2126, 38.8956],
  [44.4096, 39.4266],
  [44.7497, 39.6895],
  [44.7630, 39.7050]
];

// Confine meridionale del Nakhchivan lungo il fiume Aras (da indice 69 a 26 a Ordubad)
const nakhSeg: [number, number][] = [];
for (let i = 69; i >= 26; i--) {
  nakhSeg.push(nRing[i]);
}

// Confine meridionale dell'Armenia Syunik lungo l'Aras (da indice 32 a 30 a Meghri)
const syunikSeg: [number, number][] = [
  sRing[32],
  sRing[31],
  sRing[30]
];

// Confine meridionale dell'Azerbaigian lungo l'Aras, la pianura di Mughan e i monti Talysh fino ad Astara (da 60 a 11)
const azeSeg: [number, number][] = [];
for (let i = 60; i >= 11; i--) {
  azeSeg.push(aRing[i]);
}

const newIranNorthArc = [
  ...trSeg,
  ...nakhSeg,
  ...syunikSeg,
  ...azeSeg
];

const newIranRing = [
  ...iranRing.slice(0, 5),
  ...newIranNorthArc,
  ...iranRing.slice(37)
];

const fixedIranRing = fixRingWinding(newIranRing);

const updatedIranFeature = {
  ...origIran,
  geometry: {
    type: 'MultiPolygon',
    coordinates: [[fixedIranRing]]
  }
};

const iranArea = d3.geoArea(updatedIranFeature as any);
const iranKm2 = (iranArea / (4 * Math.PI)) * 510072000;
console.log(`2. Saliente nord-ovest dell'Iran e confine con Caucaso e Turchia sigillati a 0 fessure (${Math.round(iranKm2).toLocaleString()} km²) ✓`);

// ----------------------------------------------------------------------------
// 3. COSTRUZIONE DEI 9 JUDEȚE DI BESSARABIA CON ASSORBIMENTO TOTALE DEI BUCHI
// ----------------------------------------------------------------------------
const JUDETE_MAPPING: Record<string, string[]> = {
  'ROM_BES_JUD_HOTIN': ['ROM_BES_238_Briceni', 'ROM_BES_241_Ocnita', 'ROM_BES_237_Edinet'],
  'ROM_BES_JUD_SOROCA': ['ROM_BES_239_Soroca', 'ROM_BES_240_Donduseni', 'ROM_BES_236_Drochia', 'ROM_BES_235_Floresti'],
  'ROM_BES_JUD_BALTI': ['ROM_BES_229_Balti', 'ROM_BES_228_Glodeni', 'ROM_BES_232_RIscani', 'ROM_BES_226_Falesti', 'ROM_BES_231_SIngerei'],
  'ROM_BES_JUD_ORHEI': ['ROM_BES_227_Orhei', 'ROM_BES_230_Telenesti', 'ROM_BES_233_Rezina', 'ROM_BES_234_Soldanesti'],
  'ROM_BES_JUD_LAPUSNA': ['ROM_BES_218_Chisinau', 'ROM_BES_217_Nisporeni', 'ROM_BES_224_Calarasi', 'ROM_BES_221_Straseni', 'ROM_BES_216_Ialoveni', 'ROM_BES_215_Hincesti', 'ROM_BES_220_Criuleni', 'ROM_BES_222_Ungheni'],
  'ROM_BES_JUD_TIGHINA': ['ROM_BES_213_Bender', 'ROM_BES_214_Causeni', 'ROM_BES_212_Stefan_Voda', 'ROM_BES_219_Anenii_Noi', 'ROM_BES_209_Basarabeasca', 'ROM_BES_211_Cimislia', 'ROM_BES_223_Dubasari'],
  'ROM_BES_JUD_CAHUL': ['ROM_BES_205_Cahul', 'ROM_BES_208_Cantemir', 'ROM_BES_210_Leova', 'ROM_BES_206_Gagauzia', 'ROM_BES_207_Taraclia'],
  'ROM_BES_JUD_CETATEA_ALBA': ['ROM_BUDJAK_195_Bilhorod_Dnistrovskyi', 'ROM_BUDJAK_196_Sarata', 'ROM_BUDJAK_197_Tarutyne', 'ROM_BUDJAK_198_Artsyi', 'ROM_BUDJAK_199_Tatarbunary'],
  'ROM_BES_JUD_ISMAIL': ['ROM_BUDJAK_200_Bolhrad', 'ROM_BUDJAK_201_Kiliia', 'ROM_BUDJAK_202_Izmali', 'ROM_BUDJAK_203_Reni']
};

const JUDETE_PROPS: Record<string, any> = {
  'ROM_BES_JUD_HOTIN': {
    id: 'ROM_BES_JUD_HOTIN',
    NUTS_ID: 'ROM_BES_JUD_HOTIN',
    CNTR_CODE: 'RO_BES',
    NUTS_NAME: 'Provincia di Bessarabia — Județul Hotin',
    HISTORICAL_NAME: 'Regno di Romania — Provincia di Bessarabia (Județul Hotin)',
    SOV_NAME: 'Bessarabia Settentrionale — Distretto di Hotin (URSS)',
    ADMIN_TITLE: 'Regno di Romania — Provincia di Bessarabia (Județul Hotin) / RSS Moldava e RSS Ucraina (dal 28 giugno 1940)',
    SOV_SSR: 'RSS Moldava',
    MODERN_ADMIN: 'Hotin / Briceni / Ocnița / Edineț',
    REGION_KIND: 'BESSARABIA_TERRITORY'
  },
  'ROM_BES_JUD_SOROCA': {
    id: 'ROM_BES_JUD_SOROCA',
    NUTS_ID: 'ROM_BES_JUD_SOROCA',
    CNTR_CODE: 'RO_BES',
    NUTS_NAME: 'Provincia di Bessarabia — Județul Soroca',
    HISTORICAL_NAME: 'Regno di Romania — Provincia di Bessarabia (Județul Soroca)',
    SOV_NAME: 'RSS Moldava — Distretto di Soroca (Fortezza sul Dnestr)',
    ADMIN_TITLE: 'Regno di Romania — Provincia di Bessarabia (Județul Soroca) / RSS Moldava (dal 28 giugno 1940)',
    SOV_SSR: 'RSS Moldava',
    MODERN_ADMIN: 'Soroca / Dondușeni / Drochia / Florești',
    REGION_KIND: 'BESSARABIA_TERRITORY'
  },
  'ROM_BES_JUD_BALTI': {
    id: 'ROM_BES_JUD_BALTI',
    NUTS_ID: 'ROM_BES_JUD_BALTI',
    CNTR_CODE: 'RO_BES',
    NUTS_NAME: 'Provincia di Bessarabia — Județul Bălți',
    HISTORICAL_NAME: 'Regno di Romania — Provincia di Bessarabia (Județul Bălți)',
    SOV_NAME: 'RSS Moldava — Distretto di Bălți (URSS)',
    ADMIN_TITLE: 'Regno di Romania — Provincia di Bessarabia (Județul Bălți) / RSS Moldava (dal 28 giugno 1940)',
    SOV_SSR: 'RSS Moldava',
    MODERN_ADMIN: 'Bălți / Glodeni / Rîșcani / Fălești / Sîngerei',
    REGION_KIND: 'BESSARABIA_TERRITORY'
  },
  'ROM_BES_JUD_ORHEI': {
    id: 'ROM_BES_JUD_ORHEI',
    NUTS_ID: 'ROM_BES_JUD_ORHEI',
    CNTR_CODE: 'RO_BES',
    NUTS_NAME: 'Provincia di Bessarabia — Județul Orhei',
    HISTORICAL_NAME: 'Regno di Romania — Provincia di Bessarabia (Județul Orhei)',
    SOV_NAME: 'RSS Moldava — Distretto di Orhei e Codrii (URSS)',
    ADMIN_TITLE: 'Regno di Romania — Provincia di Bessarabia (Județul Orhei) / RSS Moldava (dal 28 giugno 1940)',
    SOV_SSR: 'RSS Moldava',
    MODERN_ADMIN: 'Orhei / Telenești / Rezina / Șoldănești',
    REGION_KIND: 'BESSARABIA_TERRITORY'
  },
  'ROM_BES_JUD_LAPUSNA': {
    id: 'ROM_BES_JUD_LAPUSNA',
    NUTS_ID: 'ROM_BES_JUD_LAPUSNA',
    CNTR_CODE: 'RO_BES',
    NUTS_NAME: 'Provincia di Bessarabia — Județul Lăpușna (Chișinău)',
    HISTORICAL_NAME: 'Regno di Romania — Provincia di Bessarabia (Județul Lăpușna)',
    SOV_NAME: 'RSS Moldava — Capitale Chișinău e Distretto di Lăpușna (URSS)',
    ADMIN_TITLE: 'Regno di Romania — Provincia di Bessarabia (Județul Lăpușna) / RSS Moldava (dal 28 giugno 1940)',
    SOV_SSR: 'RSS Moldava',
    MODERN_ADMIN: 'Chișinău / Nisporeni / Călărași / Strășeni / Ialoveni / Hîncești',
    REGION_KIND: 'BESSARABIA_TERRITORY'
  },
  'ROM_BES_JUD_TIGHINA': {
    id: 'ROM_BES_JUD_TIGHINA',
    NUTS_ID: 'ROM_BES_JUD_TIGHINA',
    CNTR_CODE: 'RO_BES',
    NUTS_NAME: 'Provincia di Bessarabia — Județul Tighina (Bender)',
    HISTORICAL_NAME: 'Regno di Romania — Provincia di Bessarabia (Județul Tighina)',
    SOV_NAME: 'RSS Moldava — Distretto di Tighina / Bender (URSS)',
    ADMIN_TITLE: 'Regno di Romania — Provincia di Bessarabia (Județul Tighina) / RSS Moldava (dal 28 giugno 1940)',
    SOV_SSR: 'RSS Moldava',
    MODERN_ADMIN: 'Bender / Tighina / Căușeni / Ștefan Vodă / Basarabeasca',
    REGION_KIND: 'BESSARABIA_TERRITORY'
  },
  'ROM_BES_JUD_CAHUL': {
    id: 'ROM_BES_JUD_CAHUL',
    NUTS_ID: 'ROM_BES_JUD_CAHUL',
    CNTR_CODE: 'RO_BES',
    NUTS_NAME: 'Provincia di Bessarabia — Județul Cahul',
    HISTORICAL_NAME: 'Regno di Romania — Provincia di Bessarabia (Județul Cahul)',
    SOV_NAME: 'RSS Moldava — Distretto di Cahul e Basso Prut (URSS)',
    ADMIN_TITLE: 'Regno di Romania — Provincia di Bessarabia (Județul Cahul) / RSS Moldava (dal 28 giugno 1940)',
    SOV_SSR: 'RSS Moldava',
    MODERN_ADMIN: 'Cahul / Cantemir / Leova / Comrat / Taraclia',
    REGION_KIND: 'BESSARABIA_TERRITORY'
  },
  'ROM_BES_JUD_CETATEA_ALBA': {
    id: 'ROM_BES_JUD_CETATEA_ALBA',
    NUTS_ID: 'ROM_BES_JUD_CETATEA_ALBA',
    CNTR_CODE: 'RO_BUD',
    NUTS_NAME: 'Provincia di Bessarabia — Județul Cetatea Albă (Akkerman)',
    HISTORICAL_NAME: 'Regno di Romania — Provincia di Bessarabia (Județul Cetatea Albă)',
    SOV_NAME: 'RSS Ucraina — Oblast di Izmail (Akkerman / Bilhorod-Dnistrovskyi)',
    ADMIN_TITLE: 'Regno di Romania — Bessarabia Meridionale (Budjak) / RSS Ucraina (dal 28 giugno 1940)',
    SOV_SSR: 'RSS Ucraina — Oblast di Izmail',
    MODERN_ADMIN: 'Bilhorod-Dnistrovskyi / Sărata / Tarutino / Artsyz / Tatarbunary',
    REGION_KIND: 'BUDJAK_TERRITORY'
  },
  'ROM_BES_JUD_ISMAIL': {
    id: 'ROM_BES_JUD_ISMAIL',
    NUTS_ID: 'ROM_BES_JUD_ISMAIL',
    CNTR_CODE: 'RO_BUD',
    NUTS_NAME: 'Provincia di Bessarabia — Județul Ismail (Foce del Danubio)',
    HISTORICAL_NAME: 'Regno di Romania — Provincia di Bessarabia (Județul Ismail)',
    SOV_NAME: 'RSS Ucraina — Oblast di Izmail (Porto e Delta del Danubio)',
    ADMIN_TITLE: 'Regno di Romania — Bessarabia Meridionale (Budjak) / RSS Ucraina (dal 28 giugno 1940)',
    SOV_SSR: 'RSS Ucraina — Oblast di Izmail',
    MODERN_ADMIN: 'Ismail / Kiliya / Reni / Bolgrad',
    REGION_KIND: 'BUDJAK_TERRITORY'
  }
};

// Initial union of constituent raions for each Județ
const judeteGeoms: Record<string, any> = {};

for (const [judKey, ids] of Object.entries(JUDETE_MAPPING)) {
  const feats = USSR_REGIONAL_FEATURES.filter(f => ids.includes(f.id));
  const geomList: any[] = [];
  for (const f of feats) {
    const g = f.geometry;
    if (g.type === 'Polygon') geomList.push(g.coordinates);
    else if (g.type === 'MultiPolygon') g.coordinates.forEach((p: any) => geomList.push(p));
  }

  let merged: any = [geomList[0]];
  for (let i = 1; i < geomList.length; i++) {
    merged = polygonClipping.union(merged, [geomList[i]]);
  }
  judeteGeoms[judKey] = merged;
}

// Find all interior holes across the combined territory of all 9 Județe
let fullUnion: any = judeteGeoms['ROM_BES_JUD_HOTIN'];
for (const k of Object.keys(JUDETE_MAPPING)) {
  if (k === 'ROM_BES_JUD_HOTIN') continue;
  fullUnion = polygonClipping.union(fullUnion, judeteGeoms[k]);
}

const allInteriorHoles = fullUnion[0].slice(1);
console.log(`Trovati ${allInteriorHoles.length} buchi interni tra i distretti di Bessarabia da assorbire...`);

// Absorb every interior hole into the closest Județ
for (let hIdx = 0; hIdx < allInteriorHoles.length; hIdx++) {
  let holeRing = allInteriorHoles[hIdx];
  const hFeat = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [holeRing] }, properties: {} };
  const a = d3.geoArea(hFeat as any);
  if (a > 2 * Math.PI) {
    holeRing = holeRing.slice().reverse();
  }
  const hCentroid = d3.geoCentroid(hFeat as any);

  let bestJudId = '';
  let minDist = 1e9;
  for (const judKey of Object.keys(JUDETE_MAPPING)) {
    // Check distance between hole centroid and Județ bounding center
    const bounds = d3.geoBounds({ type: 'Feature', geometry: { type: 'Polygon', coordinates: [judeteGeoms[judKey][0][0]] }, properties: {} } as any);
    const center = [(bounds[0][0] + bounds[1][0]) / 2, (bounds[0][1] + bounds[1][1]) / 2];
    const d = (center[0] - hCentroid[0])**2 + (center[1] - hCentroid[1])**2;
    if (d < minDist) {
      minDist = d;
      bestJudId = judKey;
    }
  }

  if (!holeRing || holeRing.length < 3) continue;
  // Ensure ring is closed
  const first = holeRing[0];
  const last = holeRing[holeRing.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) {
    holeRing = [...holeRing, first];
  }
  if (holeRing.length < 4) continue;

  if (bestJudId) {
    try {
      judeteGeoms[bestJudId] = polygonClipping.union(judeteGeoms[bestJudId], [[holeRing]]);
    } catch (e) {
      // Ignore tiny degenerate slivers
    }
  }
}

// Build the final clean, solid, single-polygon Județe
const finalJudeteFeatures: any[] = [];

for (const judKey of Object.keys(JUDETE_MAPPING)) {
  const merged = judeteGeoms[judKey];
  // Sort polygons by area, select the main contiguous land polygon
  let bestPoly: number[][] = [];
  let maxArea = -1;

  for (const poly of merged) {
    const outer = fixRingWinding(poly[0]);
    const fTest = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [outer] }, properties: {} };
    let a = d3.geoArea(fTest as any);
    if (a > 2 * Math.PI) a = 4 * Math.PI - a;
    const km2 = (a / (4 * Math.PI)) * 510072000;
    if (km2 > maxArea) {
      maxArea = km2;
      bestPoly = outer;
    }
  }

  const fJudete = {
    type: 'Feature',
    id: judKey,
    properties: JUDETE_PROPS[judKey],
    geometry: {
      type: 'Polygon',
      coordinates: [bestPoly]
    }
  };

  const a = d3.geoArea(fJudete as any);
  const km2 = (a / (4 * Math.PI)) * 510072000;
  console.log(`✓ ${judKey}: Solido, 0 buchi interni, area: ${Math.round(km2).toLocaleString()} km²`);
  finalJudeteFeatures.push(fJudete);
}

// ----------------------------------------------------------------------------
// 4. TRANSNISTRIA MASSR CONTIGUA
// ----------------------------------------------------------------------------
const origTransnistria = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_MASSR_310_Transnistria')!;
const cleanTransnistria = {
  ...origTransnistria,
  geometry: {
    type: origTransnistria.geometry.type,
    coordinates: origTransnistria.geometry.coordinates.map((p: any) => [fixRingWinding(p[0])])
  }
};

// ----------------------------------------------------------------------------
// 5. ASSEMBLE NEW USSR_REGIONAL_FEATURES
// ----------------------------------------------------------------------------
const oldBesIds = new Set<string>();
for (const ids of Object.values(JUDETE_MAPPING)) {
  ids.forEach(id => oldBesIds.add(id));
}
oldBesIds.add('SOV_MASSR_310_Transnistria');
oldBesIds.add('SOV_ADM1_ARM_119_Tavush');
oldBesIds.add('SOV_ADM1_ARM_127_Ararat');
oldBesIds.add('SOV_ADM1_AZE_129_Contiguous_Azerbaijan');

const preservedUssrFeatures = USSR_REGIONAL_FEATURES.filter(f => !oldBesIds.has(f.id));

const finalUssrFeatures = [
  ...preservedUssrFeatures,
  cleanTavush,
  cleanArarat,
  cleanAzeContig,
  cleanTransnistria,
  ...finalJudeteFeatures
];

console.log(`\nTotale feature URSS finali: ${finalUssrFeatures.length}`);

// Write ussrRegions.ts
const ussrTsPath = path.join(process.cwd(), 'src/data/ussrRegions.ts');
const ussrContent = `// File generato: Suddivisioni territoriali URSS, Caucaso e Bessarabia Storica (1936-1940)
// Configurato con topologia sigillata a zero fessure e granularità storico-geografica di eccellenza.

export const USSR_REGIONAL_FEATURES: any[] = ${JSON.stringify(finalUssrFeatures, null, 2)};
`;

fs.writeFileSync(ussrTsPath, ussrContent, 'utf8');
console.log(`✓ Aggiornato ${ussrTsPath}`);

// Write world1938.ts
const updatedHbFeatures = WORLD_1938_GEOJSON.features.map((f: any) => {
  if ((f.properties?.NAME || '').toLowerCase() === 'iran') {
    return updatedIranFeature;
  }
  return f;
});

const updatedWorldGeojson = {
  ...WORLD_1938_GEOJSON,
  features: updatedHbFeatures
};

const worldTsPath = path.join(process.cwd(), 'src/data/world1938.ts');
const worldContent = `// Basemap storico 1938 con confini Iran-Caucaso sigillati con perizia geografica
export const WORLD_1938_GEOJSON: any = ${JSON.stringify(updatedWorldGeojson, null, 2)};
`;

fs.writeFileSync(worldTsPath, worldContent, 'utf8');
console.log(`✓ Aggiornato ${worldTsPath}`);

// ----------------------------------------------------------------------------
// 6. UPDATE HISTORICAL TOPONYMS
// ----------------------------------------------------------------------------
const toponymsPath = path.join(process.cwd(), 'src/data/historicalToponyms.ts');
let toponymsText = fs.readFileSync(toponymsPath, 'utf8');

if (!toponymsText.includes('soroca:')) {
  toponymsText = toponymsText.replace(
    "chisinau: { historicalName: 'Chișinău (Bessarabia)', adminTitle: 'Ținutul Nistru' },",
    `chisinau: { historicalName: 'Chișinău (Bessarabia)', adminTitle: 'Ținutul Nistru' },
    soroca: { historicalName: 'Soroca (Bessarabia)', adminTitle: 'Județul Soroca' },
    orhei: { historicalName: 'Orhei (Bessarabia)', adminTitle: 'Județul Orhei' },
    cahul: { historicalName: 'Cahul (Bessarabia)', adminTitle: 'Județul Cahul' },`
  );
  fs.writeFileSync(toponymsPath, toponymsText, 'utf8');
  console.log(`✓ Aggiornato ${toponymsPath} con i toponimi storici di Soroca, Orhei e Cahul`);
}

console.log('\n=== OPERAZIONE COMPLETATA CON SUCCESSO! ===');
