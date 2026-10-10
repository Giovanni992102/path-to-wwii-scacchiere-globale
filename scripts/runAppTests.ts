import { getExtendedToponym } from '../src/data/historicalToponyms';
import { HB_NAME, resolveHB, resolveFeature } from '../src/data/georesolver';
import {
  CARPATHIAN_RUTHENIA_FEATURE,
  DANZIG_FREE_CITY_FEATURE,
  MEMEL_TERRITORY_FEATURE,
  ZARA_ENCLAVE_FEATURE,
  ZADAR_DALMATIA_FEATURE,
  FIUME_CARNARO_FEATURE,
  CROATIAN_LITTORAL_FEATURE,
  PANAMA_CANAL_ZONE_FEATURE,
  TURKEY_MOUNT_ARARAT_FEATURE,
  FRENCH_GUIANA_FEATURE
} from '../src/data/historicalBorders';

console.log('=== RUNNING ALL APP.TSX SELF-TESTS ===\n');

const tests = [
  {
    name: 'Toponomastica Dinamica (Danzica)',
    run: () => getExtendedToponym('gdansk', 'GER').name.includes('Danzig'),
  },
  {
    name: 'Toponomastica Dinamica (Breslau)',
    run: () => getExtendedToponym('wroclaw', 'GER').name.includes('Breslau'),
  },
  {
    name: 'Toponomastica Dinamica (Königsberg)',
    run: () => getExtendedToponym('kaliningrad', 'GER').name.includes('Königsberg'),
  },
  {
    name: 'Integrità Imperi Globali (Brasile)',
    run: () => HB_NAME['Brazil'] && HB_NAME['Brazil'].o === 'BRA',
  },
  {
    name: 'Evoluzione Guerra Civile Spagnola (Marocco)',
    run: () =>
      resolveHB({ properties: { NAME: 'Spanish Morocco' } }, 0).o === 'SPR' &&
      resolveHB({ properties: { NAME: 'Spanish Morocco' } }, 2).o === 'SPA',
  },
  {
    name: 'Dinamica Coloniale Vichy/Libera (Algeria)',
    run: () =>
      resolveHB({ properties: { NAME: 'Algeria (France)', SUBJECTO: 'France' } }, 0).o === 'F_NAF' &&
      resolveHB({ properties: { NAME: 'Algeria (France)', SUBJECTO: 'France' } }, 6).o === 'VIC_NAF',
  },
  {
    name: 'Integrità Territoriale Polonia (1936: POL -> 1939: GER)',
    run: () =>
      resolveHB({ properties: { NAME: 'Poland' } }, 0).o === 'POL' &&
      resolveHB({ properties: { NAME: 'Poland' } }, 5).o === 'SOV',
  },
  {
    name: 'Integrità Territoriale Finlandia (1936: FIN)',
    run: () => resolveHB({ properties: { NAME: 'Finland' } }, 0).o === 'FIN',
  },
  {
    name: 'Guerra d\'Etiopia (Indipendente -> AOI)',
    run: () =>
      resolveHB({ properties: { NAME: 'Ethiopia (Italy)' } }, 0).o === 'NEU' &&
      resolveHB({ properties: { NAME: 'Ethiopia (Italy)' } }, 1).o === 'ITA',
  },
  {
    name: 'Annessione Albania',
    run: () =>
      resolveFeature({ properties: { CNTR_CODE: 'AL', NUTS_ID: 'AL' } }, 0).o === 'ALB' &&
      resolveFeature({ properties: { CNTR_CODE: 'AL', NUTS_ID: 'AL' } }, 4).o === 'ITA',
  },
  {
    name: 'Impero Britannico in Africa (Sudan)',
    run: () => resolveHB({ properties: { NAME: 'Anglo-Egyptian Sudan' } }, 0).o === 'UK',
  },
  {
    name: 'Indipendenza Liberia (1936)',
    run: () => resolveHB({ properties: { NAME: 'Liberia' } }, 0).o === 'NEU',
  },
  {
    name: 'Mandato Sudafricano (SWA)',
    run: () => resolveHB({ properties: { NAME: 'South West Africa' } }, 0).o === 'SAF',
  },
  {
    name: 'Fix Buco Nero Rutenia (Cecoslovacchia Est)',
    run: () =>
      resolveHB({ properties: { NAME: 'Czechoslovakia' } }, 0).o === 'CZE' &&
      resolveHB({ properties: { NAME: 'Czechoslovakia' } }, 3).o === 'HUN',
  },
  {
    name: 'Integrità Territoriale Ungherese (NUTS-3 & HB -> HUN)',
    run: () =>
      resolveFeature({ properties: { CNTR_CODE: 'HU', NUTS_NAME: 'Budapest' } }, 0).o === 'HUN' &&
      resolveHB({ properties: { NAME: 'Hungary' } }, 0).o === 'HUN',
  },
  {
    name: 'Coerenza Indie Orientali Olandesi',
    run: () => resolveHB({ properties: { NAME: 'Netherlands East Indies' } }, 0).o === 'HOL',
  },
  {
    name: 'Integrità Storica Jugoslavia — Bosnia ed Erzegovina (BA -> YUG)',
    run: () =>
      resolveFeature({ properties: { CNTR_CODE: 'BA', NUTS_NAME: 'Sarajevo' } }, 0).o === 'YUG' &&
      resolveHB({ properties: { NAME: 'Bosnia and Herzegovina' } }, 0).o === 'YUG',
  },
  {
    name: 'Integrità Storica Jugoslavia — Kosovo e Metochia (XK -> YUG)',
    run: () =>
      resolveFeature({ properties: { CNTR_CODE: 'XK', NUTS_NAME: 'Pristina' } }, 0).o === 'YUG' &&
      resolveHB({ properties: { NAME: 'Kosovo' } }, 0).o === 'YUG',
  },
  {
    name: 'Geometrie di Precisione: Rutenia Subcarpatica (CZE -> HUN)',
    run: () =>
      CARPATHIAN_RUTHENIA_FEATURE.__resolve(0).o === 'CZE' &&
      CARPATHIAN_RUTHENIA_FEATURE.__resolve(3).o === 'HUN',
  },
  {
    name: 'Geometrie di Precisione: Danzica, Memelland, Zara, Carnaro, Panama e Monte Ararat',
    run: () =>
      DANZIG_FREE_CITY_FEATURE.__resolve(0).o === 'DANZIG' &&
      DANZIG_FREE_CITY_FEATURE.__resolve(5).o === 'GER' &&
      MEMEL_TERRITORY_FEATURE.__resolve(0).o === 'LIT' &&
      MEMEL_TERRITORY_FEATURE.__resolve(3).o === 'GER' &&
      ZARA_ENCLAVE_FEATURE.__resolve(0).o === 'ITA' &&
      ZADAR_DALMATIA_FEATURE.__resolve(0).o === 'YUG' &&
      FIUME_CARNARO_FEATURE.__resolve(0).o === 'ITA' &&
      CROATIAN_LITTORAL_FEATURE.__resolve(0).o === 'YUG' &&
      PANAMA_CANAL_ZONE_FEATURE.__resolve(0).o === 'USA' &&
      TURKEY_MOUNT_ARARAT_FEATURE.__resolve(0).o === 'TUR',
  },
  {
    name: 'Confini Storici Finlandesi (Tartu -> Mosca)',
    run: () =>
      resolveFeature({ properties: { CNTR_CODE: 'FIN_PETSAMO', NAME: 'Petsamo District' } }, 0).o === 'FIN' &&
      resolveFeature({ properties: { CNTR_CODE: 'FIN_KARELIA', NAME: 'Vyborgsky District' } }, 6).o === 'SOV',
  },
  {
    name: 'Integrità Frontiera Sino-Sovietica e Manciukuò (1936-1940)',
    run: () =>
      resolveFeature({ properties: { NUTS_ID: 'CHN_XINJIANG', NAME: 'Xinjiang' } }, 0).o === 'XIN' &&
      resolveFeature({ properties: { NUTS_ID: 'CHN_HEILONGJIANG', NAME: 'Heilongjiang' } }, 0).o === 'MAN' &&
      resolveFeature({ properties: { NUTS_ID: 'CHN_MANCHUKUO_XINGAN_NORTH', NAME: 'Xing\'an North' } }, 0).o === 'MAN' &&
      resolveFeature({ properties: { NUTS_ID: 'SOV_ADM1_RUS_78_Primorsky_Krai', CNTR_CODE: 'SU', NAME: 'Primorsky Krai' } }, 0).o === 'SOV' &&
      resolveHB({ properties: { NAME: 'Mongolia' } }, 0).o === 'MON',
  },
  {
    name: 'Integrità Frontiera Sino-India e Indocina (1936-1940)',
    run: () =>
      resolveFeature({ properties: { NUTS_ID: 'CHN_TIBET', NAME: 'Tibet' } }, 0).o === 'TIB' &&
      resolveFeature({ properties: { NUTS_ID: 'CHN_YUNNAN', NAME: 'Yunnan' } }, 0).o === 'CHI' &&
      resolveFeature({ properties: { NUTS_ID: 'CHN_GUANGXI', NAME: 'Guangxi' } }, 0).o === 'CHI' &&
      resolveHB({ properties: { NAME: 'British Raj' } }, 0).o === 'RAJ' &&
      resolveHB({ properties: { NAME: 'Nepal' } }, 0).o === 'NEP' &&
      resolveHB({ properties: { NAME: 'Bhutan' } }, 0).o === 'BHU' &&
      resolveHB({ properties: { NAME: 'French Indo-China' } }, 0).o === 'F_IND' &&
      resolveHB({ properties: { NAME: 'Laos' } }, 0).o === 'F_IND',
  },
  {
    name: 'Integrità Frontiera URSS - Afghanistan - Iran (1936-1940)',
    run: () =>
      resolveFeature({ properties: { NUTS_ID: 'SOV_ADM1_TKM_164_Mary', CNTR_CODE: 'SU', NAME: 'Mary' } }, 0).o === 'SOV' &&
      resolveFeature({ properties: { NUTS_ID: 'SOV_ADM1_TJK_166_Gorno_Badakhshan_Autonomous_Region', CNTR_CODE: 'SU', NAME: 'Gorno-Badakhshan' } }, 0).o === 'SOV' &&
      resolveFeature({ properties: { NUTS_ID: 'SOV_ADM1_UZB_152_Surxondaryo_Region', CNTR_CODE: 'SU', NAME: 'Surxondaryo' } }, 0).o === 'SOV' &&
      resolveFeature({ properties: { NUTS_ID: 'SOV_ADM1_AZE_128_Nakhchivan_Autonomous_Republic', CNTR_CODE: 'SU', NAME: 'Nakhchivan' } }, 0).o === 'SOV' &&
      resolveHB({ properties: { NAME: 'Afghanistan' } }, 0).o === 'AFG' &&
      resolveHB({ properties: { NAME: 'Iran' } }, 0).o === 'IRN',
  },
  {
    name: 'Integrità Territoriale Guiana Francese (F_COL 1936-39 -> VIC dal giu 1940)',
    run: () =>
      resolveFeature({ properties: { NUTS_ID: 'FRY30', NAME: 'French Guiana' } }, 0).o === 'F_COL' &&
      resolveFeature({ properties: { NUTS_ID: 'FRY30', NAME: 'French Guiana' } }, 6).o === 'F_COL' &&
      resolveHB({ properties: { NAME: 'French Guiana' } }, 0).o === 'F_COL' &&
      FRENCH_GUIANA_FEATURE.__resolve(0).o === 'F_COL' &&
      FRENCH_GUIANA_FEATURE.__resolve(6).o === 'F_COL',
  },
  {
    name: 'Integrità Territoriale Marocco (Marocco Francese, Rif Spagnolo e Tangeri)',
    run: () =>
      resolveHB({ properties: { NAME: 'Morocco (France)', SUBJECTO: 'France' } }, 0).o === 'F_NAF' &&
      resolveHB({ properties: { NAME: 'Morocco (France)', SUBJECTO: 'France' } }, 6).o === 'VIC_NAF' &&
      resolveHB({ properties: { NAME: 'Spanish Morocco' } }, 0).o === 'SPR' &&
      resolveHB({ properties: { NAME: 'Spanish Morocco' } }, 2).o === 'SPA' &&
      resolveHB({ properties: { NAME: 'Tangier' } }, 0).o === 'NEU' &&
      resolveHB({ properties: { NAME: 'Tangier' } }, 6).o === 'SPA',
  },
  {
    name: 'Integrità Geostorica Frontiera Iraq - Turchia (Linea di Bruxelles 1926 e Mandato Britannico)',
    run: () =>
      resolveHB({ properties: { NAME: 'Mesopotamia (GB)', SUBJECTO: 'United Kingdom of Great Britain and Ireland' } }, 0).o === 'UK' &&
      resolveHB({ properties: { NAME: 'Mesopotamia (GB)', SUBJECTO: 'United Kingdom of Great Britain and Ireland' } }, 6).o === 'UK' &&
      resolveHB({ properties: { NAME: 'Iraq' } }, 0).o === 'UK',
  },
  {
    name: 'Integrità Territoriale Odessa e Distretto di Ovidiopol (Zero Overlap e Risoluzione SOV)',
    run: () =>
      resolveFeature({ properties: { NUTS_ID: 'SOV_ADM1_UKR_194_Ovidiopol', CNTR_CODE: 'SU' } }, 0).o === 'SOV' &&
      resolveFeature({ properties: { NUTS_ID: 'SOV_ADM1_UKR_195_Odessa_City', CNTR_CODE: 'SU' } }, 0).o === 'SOV',
  },
  {
    name: 'Integrità Geostorica Confini Baltico - Polonia - URSS (Trattato di Riga 1921, Linea di Demarcazione e Chiusura Buchi Neri)',
    run: () => {
      const lt011 = resolveFeature({ properties: { NUTS_ID: 'LT011', CNTR_CODE: 'LT' } }, 0);
      const grodno = resolveFeature({ properties: { NUTS_ID: 'PL_KRESY_BLR_1_Grodno', CNTR_CODE: 'PL' } }, 0);
      const vitebsk = resolveFeature({ properties: { NUTS_ID: 'SOV_ADM1_BLR_101_Vitebsk', CNTR_CODE: 'SU' } }, 0);
      return lt011.o === 'POL' && grodno.o === 'POL' && vitebsk.o === 'SOV';
    },
  }
];

let passed = 0;
for (const t of tests) {
  try {
    const ok = t.run();
    if (ok) {
      console.log(`✓ ${t.name}`);
      passed++;
    } else {
      console.error(`❌ FALLITO: ${t.name}`);
    }
  } catch (err: any) {
    console.error(`💥 ERRORE: ${t.name} -> ${err.message}`);
  }
}

console.log(`\nEsito finale: ${passed}/${tests.length} test superati con successo!`);
if (passed === tests.length) {
  console.log('TUTTI I TEST SUPERATI AL 100%! ✓');
} else {
  process.exit(1);
}
