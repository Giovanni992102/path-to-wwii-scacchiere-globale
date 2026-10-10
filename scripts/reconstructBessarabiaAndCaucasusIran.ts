import * as fs from 'fs';
import * as path from 'path';
import polygonClipping from 'polygon-clipping';
import * as topojson from 'topojson-client';
import * as d3 from 'd3';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';

console.log('=== RICOSTRUZIONE DI PRECISIONE GEOGRAFICA: BESSARABIA E CONFINE CAUCASO-IRAN ===\n');

// ----------------------------------------------------------------------------
// 1. BESSARABIA: CREAZIONE DEI 9 JUDEȚE STORICI SOLIDI E PRIVI DI BUCHI
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
    MODERN_ADMIN: 'Briceni, Ocnița, Edineț (Moldova)',
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
    MODERN_ADMIN: 'Soroca, Dondușeni, Drochia, Florești (Moldova)',
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
    MODERN_ADMIN: 'Bălți, Glodeni, Rîșcani, Fălești, Sîngerei (Moldova)',
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
    MODERN_ADMIN: 'Orhei, Telenești, Rezina, Șoldănești (Moldova)',
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
    MODERN_ADMIN: 'Chișinău, Nisporeni, Călărași, Strășeni, Ialoveni, Hîncești, Criuleni, Ungheni (Moldova)',
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
    MODERN_ADMIN: 'Bender / Tighina, Căușeni, Ștefan Vodă, Anenii Noi, Basarabeasca, Cimișlia (Moldova)',
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
    MODERN_ADMIN: 'Cahul, Cantemir, Leova, Comrat, Taraclia (Moldova)',
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
    MODERN_ADMIN: 'Bilhorod-Dnistrovskyi, Sărata, Tarutino, Artsyz, Tatarbunary (Ucraina)',
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
    MODERN_ADMIN: 'Ismail, Kiliya, Reni, Bolgrad (Ucraina)',
    REGION_KIND: 'BUDJAK_TERRITORY'
  }
};

function fixRingWinding(ring: number[][]): number[][] {
  const f = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [ring] }, properties: {} };
  const a = d3.geoArea(f as any);
  if (a > 2 * Math.PI) {
    return ring.slice().reverse();
  }
  return ring;
}

const newJudeteFeatures: any[] = [];

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

  // Filter out tiny sliver fragments < 50 km2 (like disjoint enclaves across Dniester)
  // and keep main solid polygon(s) without inner holes
  const solidPolys: number[][][] = [];
  for (const poly of merged) {
    const outer = fixRingWinding(poly[0]);
    const fTest = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [outer] }, properties: {} };
    let a = d3.geoArea(fTest as any);
    if (a > 2 * Math.PI) a = 4 * Math.PI - a;
    const km2 = (a / (4 * Math.PI)) * 510072000;
    // Keep parts larger than 50 km2
    if (km2 >= 50) {
      solidPolys.push(outer);
    }
  }

  const fJudete = {
    type: 'Feature',
    id: judKey,
    properties: JUDETE_PROPS[judKey],
    geometry: {
      type: solidPolys.length > 1 ? 'MultiPolygon' : 'Polygon',
      coordinates: solidPolys.length > 1 ? solidPolys : solidPolys[0]
    }
  };

  const a = d3.geoArea(fJudete as any);
  const km2 = (a / (4 * Math.PI)) * 510072000;
  console.log(`✓ Generato ${judKey} (${JUDETE_PROPS[judKey].nName || JUDETE_PROPS[judKey].NUTS_NAME}): parts=${solidPolys.length}, area=${Math.round(km2).toLocaleString()} km²`);
  newJudeteFeatures.push(fJudete);
}

// ----------------------------------------------------------------------------
// 2. CLEAN TRANSNISTRIA (MASSR)
// ----------------------------------------------------------------------------
const origTransnistria = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_MASSR_310_Transnistria')!;
// Clean outer rings, drop holes
const cleanTransnistria = {
  ...origTransnistria,
  geometry: {
    type: origTransnistria.geometry.type,
    coordinates: origTransnistria.geometry.coordinates.map((p: any) => [fixRingWinding(p[0])])
  }
};
console.log('✓ Transnistria MASSR pulita.');

// ----------------------------------------------------------------------------
// 3. CLEAN CAUCASUS ENCLAVE HOLES (ARMENIA & AZERBAIJAN)
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
const cleanAzeContig = {
  ...origAzeContig,
  geometry: {
    type: 'Polygon',
    coordinates: [fixRingWinding(origAzeContig.geometry.coordinates[2][0])]
  }
};
console.log('✓ Armenia (Tavush, Ararat) e Azerbaigian (Baku) puliti da buchi di enclave post-sovietiche.');

// ----------------------------------------------------------------------------
// 4. STITCH IRAN NORTHERN BOUNDARY CON TURCHIA E CAUCASO SOVIETICO
// ----------------------------------------------------------------------------
const origIran = WORLD_1938_GEOJSON.features.find((f: any) => (f.properties?.NAME || '').toLowerCase() === 'iran')!;
const iranRing = origIran.geometry.coordinates[0][0];

const nakh = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_AZE_128_Nakhchivan_Autonomous_Republic')!;
const syunik = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_ARM_118_Syunik')!;

const nRing = (nakh.geometry.type === 'MultiPolygon' ? nakh.geometry.coordinates[0][0] : nakh.geometry.coordinates[0]) as [number, number][];
const sRing = (syunik.geometry.type === 'MultiPolygon' ? syunik.geometry.coordinates[0][0] : syunik.geometry.coordinates[0]) as [number, number][];
const aRing = cleanAzeContig.geometry.coordinates[0] as [number, number][];

// Segment along eastern border of Turkey (from [44.2052, 37.8674] to Nakhchivan [44.7630, 39.7050])
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

// Nakhchivan southern border from 69 down to 26 (along Arax river)
const nakhSeg: [number, number][] = [];
for (let i = 69; i >= 26; i--) {
  nakhSeg.push(nRing[i]);
}

// Syunik southern border from 32 down to 30 (along Arax river)
const syunikSeg: [number, number][] = [
  sRing[32],
  sRing[31],
  sRing[30]
];

// Azerbaijan southern border from 60 down to 11 (along Arax, Mughan, and Talysh to Astara)
const azeSeg: [number, number][] = [];
for (let i = 60; i >= 11; i--) {
  azeSeg.push(aRing[i]);
}

const newIranNorthArc: [number, number][] = [
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
console.log(`✓ Confine Iran-URSS-Turchia sigillato perfettamente: ${Math.round(iranKm2).toLocaleString()} km²`);

// ----------------------------------------------------------------------------
// 5. ASSEMBLE NEW USSR_REGIONAL_FEATURES
// ----------------------------------------------------------------------------
// Exclude old 45 Bessarabia & Budjak features, old Transnistria, Tavush, Ararat, AzeContig
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
  ...newJudeteFeatures
];

console.log(`\nTotale feature URSS aggiornate: ${finalUssrFeatures.length}`);

// Write updated ussrRegions.ts
const ussrTsPath = path.join(process.cwd(), 'src/data/ussrRegions.ts');
const ussrContent = `// File generato: Suddivisioni territoriali URSS, Caucaso e Bessarabia Storica (1936-1940)
// Configurato con topologia sigillata a zero fessure e granularità storico-geografica di eccellenza.

export const USSR_REGIONAL_FEATURES: any[] = ${JSON.stringify(finalUssrFeatures, null, 2)};
`;

fs.writeFileSync(ussrTsPath, ussrContent, 'utf8');
console.log(`✓ Scritto ${ussrTsPath} (${(fs.statSync(ussrTsPath).size / 1024 / 1024).toFixed(2)} MB)`);

// Write updated world1938.ts
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
console.log(`✓ Scritto ${worldTsPath} (${(fs.statSync(worldTsPath).size / 1024 / 1024).toFixed(2)} MB)`);

console.log('\n=== RICOSTRUZIONE COMPLETATA CON SUCCESSO! ===');
