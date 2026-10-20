import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
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
  FRENCH_GUIANA_FEATURE,
  POLISH_CORRIDOR_GDYNIA_FEATURE
} from '../src/data/historicalBorders';
import { CZECHOSLOVAKIA_REGIONAL_FEATURES } from '../src/data/czechoslovakiaRegions';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { getCountryFlagSvg } from '../src/data/historicalFlags';
import { STRATEGIC_ISLAND_LABELS } from '../src/components/TacticalMap';
import { ISLAND_SEARCH_ALIASES } from '../src/components/SearchModal';

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
      resolveHB({ properties: { NAME: 'Ethiopia (Italy)' } }, 0).o === 'ETH' &&
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
    run: () => resolveHB({ properties: { NAME: 'Liberia' } }, 0).o === 'LBR',
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
      (resolveHB({ properties: { NAME: 'Tangier' } }, 0).o === 'TANGER' ||
        resolveHB({ properties: { NAME: 'Tangier' } }, 0).o === 'NEU') &&
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
  },
  {
    name: 'Integrità Geostorica e Topologica Frontiera Romania - Moldavia / Bessarabia / Bucovina (Chiusura Totale Buchi Neri sul Prut e Danubio)',
    run: () => {
      const lap0 = resolveFeature({ id: 'ROM_BES_JUD_LAPUSNA', properties: { NUTS_ID: 'ROM_BES_JUD_LAPUSNA', CNTR_CODE: 'RO_BES' } }, 0);
      const lap6 = resolveFeature({ id: 'ROM_BES_JUD_LAPUSNA', properties: { NUTS_ID: 'ROM_BES_JUD_LAPUSNA', CNTR_CODE: 'RO_BES' } }, 6);
      const cah0 = resolveFeature({ id: 'ROM_BES_JUD_CAHUL', properties: { NUTS_ID: 'ROM_BES_JUD_CAHUL', CNTR_CODE: 'RO_BES' } }, 0);
      const cah6 = resolveFeature({ id: 'ROM_BES_JUD_CAHUL', properties: { NUTS_ID: 'ROM_BES_JUD_CAHUL', CNTR_CODE: 'RO_BES' } }, 6);
      return lap0.o === 'ROM' && lap6.o === 'SOV' && cah0.o === 'ROM' && cah6.o === 'SOV';
    },
  },
  {
    name: 'Audit Geostorico Integrale della Cecoslovacchia (42 Distretti 1936, Sudeti, Zaolzie, Protettorato, Slovacchia, Felvidék e Rutenia)',
    run: () => {
      if (CZECHOSLOVAKIA_REGIONAL_FEATURES.length !== 42) return false;

      // 1. All 42 districts must be CZE in 1936 (step 0)
      for (const f of CZECHOSLOVAKIA_REGIONAL_FEATURES) {
        const res0 = f.__resolve(0);
        if (res0.o !== 'CZE') return false;
      }

      // 2. Check key dynamic shifts across timeline
      const eger = CZECHOSLOVAKIA_REGIONAL_FEATURES.find((f: any) => f.id === 'CZE_SUD_EGER');
      const troppau = CZECHOSLOVAKIA_REGIONAL_FEATURES.find((f: any) => f.id === 'CZE_SUD_TROPPAU');
      const zaolzie = CZECHOSLOVAKIA_REGIONAL_FEATURES.find((f: any) => f.id === 'CZE_ZAOLZIE');
      const praha = CZECHOSLOVAKIA_REGIONAL_FEATURES.find((f: any) => f.id === 'CZE_PRAHA');
      const brno = CZECHOSLOVAKIA_REGIONAL_FEATURES.find((f: any) => f.id === 'CZE_BRNO');
      const bratislava = CZECHOSLOVAKIA_REGIONAL_FEATURES.find((f: any) => f.id === 'CZE_SLO_BRATISLAVA');
      const kosice = CZECHOSLOVAKIA_REGIONAL_FEATURES.find((f: any) => f.id === 'CZE_FEL_KOSICE');
      const chust = CZECHOSLOVAKIA_REGIONAL_FEATURES.find((f: any) => f.id === 'CZE_RUTHENIA_NORTH');

      return (
        // Step 2 (Ottobre/Novembre 1938)
        eger.__resolve(2).o === 'GER' &&
        troppau.__resolve(2).o === 'GER' &&
        zaolzie.__resolve(2).o === 'POL' &&
        kosice.__resolve(2).o === 'HUN' &&
        praha.__resolve(2).o === 'CZE' &&
        brno.__resolve(2).o === 'CZE' &&
        bratislava.__resolve(2).o === 'CZE' &&
        chust.__resolve(2).o === 'CZE' &&
        // Step 3 (Marzo 1939)
        praha.__resolve(3).o === 'GER' &&
        brno.__resolve(3).o === 'GER' &&
        bratislava.__resolve(3).o === 'SLO' &&
        chust.__resolve(3).o === 'HUN' &&
        zaolzie.__resolve(3).o === 'POL' &&
        // Step 5 (Settembre 1939)
        zaolzie.__resolve(5).o === 'GER'
      );
    },
  },
  {
    name: 'Toponomastica Geostorica: Distretto di Oranienbaum vs Oran Algeria & Dintorni di Leningrado',
    run: () => {
      // Verifica 1: Distretto di Oranienbaum (SOV_NW_RUS_256) NON deve contenere Oran/Algeria/Mers-el-Kébir
      const oranienbaum = getExtendedToponym(
        'Oblast di Leningrado — Lomonosov (Oranienbaum)',
        'SOV',
        'SOV_NW_RUS_256_Kaarosta_District'
      );
      const isOranienbaumOk =
        oranienbaum.name.includes('Oranienbaum') &&
        !oranienbaum.name.includes('Mers-el-Kébir') &&
        !oranienbaum.name.includes("Département d'Oran") &&
        oranienbaum.adminTitle?.includes("Oblast' di Leningrado") &&
        oranienbaum.note?.includes('Krasnaja Gorka');

      // Verifica 2: Dipartimento di Oran algerino (F_NAF / DZ) deve rimanere autentico francese
      const oranAlgeria = getExtendedToponym('Oran', 'F_NAF', 'DZ_ORAN', [-0.63, 35.69], 0);
      const isAlgeriaOk =
        oranAlgeria.name.includes('Oran') &&
        oranAlgeria.adminTitle?.includes("Département d'Oran") &&
        oranAlgeria.note?.includes('Algeria');

      // Verifica 3: Gatčina / Krasnogvardejsk (SOV_NW_RUS_263)
      const krasnogvardeysk = getExtendedToponym(
        'Oblast di Leningrado — Gatčina (Krasnogvardejsk)',
        'SOV',
        'SOV_NW_RUS_263_Gatchinsky_District'
      );
      const isGatchinaOk =
        krasnogvardeysk.name.includes('Krasnogvardejsk') &&
        krasnogvardeysk.adminTitle?.includes("Oblast' di Leningrado");

      // Verifica 4: Kingisepp / Jamburg (SOV_NW_RUS_306)
      const kingisepp = getExtendedToponym(
        'Oblast di Leningrado — Kingisepp (Jamburg)',
        'SOV',
        'SOV_NW_RUS_306_Jaama_District'
      );
      const isKingiseppOk =
        kingisepp.name.includes('Kingisepp') &&
        kingisepp.adminTitle?.includes("Oblast' di Leningrado");

      return isOranienbaumOk && isAlgeriaOk && isGatchinaOk && isKingiseppOk;
    },
  },
  {
    name: 'Audit Geostorico Integrale Step 7 (OTT 1940: Secondo Arbitrato di Vienna Transilvania -> HUN, Trattato di Craiova Cadrilater -> BUL, Stato Nazionale Legionario ROM -> Asse, Giorno dell\'Oxi Grecia -> Alleati, Conquista Somalia Britannica -> ITA, Avanzata su Sidi Barrani EGMT, Stazionamento Giapponese nel Tonchino VIC_IND)',
    run: () => {
      const cluj6 = resolveFeature({ properties: { CNTR_CODE: 'RO', NUTS_ID: 'RO113', NAME: 'Cluj' } }, 6);
      const cluj7 = resolveFeature({ properties: { CNTR_CODE: 'RO', NUTS_ID: 'RO113', NAME: 'Cluj' } }, 7);
      const bihor7 = resolveFeature({ properties: { CNTR_CODE: 'RO', NUTS_ID: 'RO111', NAME: 'Bihor' } }, 7);
      const mures7 = resolveFeature({ properties: { CNTR_CODE: 'RO', NUTS_ID: 'RO125', NAME: 'Mureș' } }, 7);
      const harghita7 = resolveFeature({ properties: { CNTR_CODE: 'RO', NUTS_ID: 'RO124', NAME: 'Harghita' } }, 7);
      const covasna7 = resolveFeature({ properties: { CNTR_CODE: 'RO', NUTS_ID: 'RO123', NAME: 'Covasna' } }, 7);

      const buc6 = resolveFeature({ properties: { CNTR_CODE: 'RO', NUTS_ID: 'RO321', NAME: 'București' } }, 6);
      const buc7 = resolveFeature({ properties: { CNTR_CODE: 'RO', NUTS_ID: 'RO321', NAME: 'București' } }, 7);
      const sibiu7 = resolveFeature({ properties: { CNTR_CODE: 'RO', NUTS_ID: 'RO126', NAME: 'Sibiu' } }, 7);

      const sil6 = resolveFeature({ properties: { CNTR_CODE: 'BG', NUTS_ID: 'BG325', NAME: 'Silistra' } }, 6);
      const sil7 = resolveFeature({ properties: { CNTR_CODE: 'BG', NUTS_ID: 'BG325', NAME: 'Silistra' } }, 7);
      const dob6 = resolveFeature({ properties: { CNTR_CODE: 'BG', NUTS_ID: 'BG332', NAME: 'Dobrich' } }, 6);
      const dob7 = resolveFeature({ properties: { CNTR_CODE: 'BG', NUTS_ID: 'BG332', NAME: 'Dobrich' } }, 7);

      const ath6 = resolveFeature({ properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL303', NAME: 'Athina' } }, 6);
      const ath7 = resolveFeature({ properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL303', NAME: 'Athina' } }, 7);
      const ioa7 = resolveFeature({ properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL543', NAME: 'Ioannina' } }, 7);

      const somHb6 = resolveHB({ properties: { NAME: 'British Somaliland' } }, 6);
      const somHb7 = resolveHB({ properties: { NAME: 'British Somaliland' } }, 7);
      const somFt6 = resolveFeature({ properties: { CNTR_CODE: 'UK_SOMALILAND', NAME: 'British Somaliland' } }, 6);
      const somFt7 = resolveFeature({ properties: { CNTR_CODE: 'UK_SOMALILAND', NAME: 'British Somaliland' } }, 7);

      const egmt7 = resolveFeature({ id: 'EGMT', properties: { CNTR_CODE: 'EG', NUTS_ID: 'EGMT', NAME: 'Matrouh' } }, 7);
      const ind7 = resolveHB({ properties: { NAME: 'French Indo-China' } }, 7);

      return (
        cluj6.o === 'ROM' &&
        cluj7.o === 'HUN' &&
        cluj7.name.includes('Kolozsvár') &&
        bihor7.o === 'HUN' &&
        mures7.o === 'HUN' &&
        harghita7.o === 'HUN' &&
        covasna7.o === 'HUN' &&
        buc6.o === 'ROM' &&
        buc6.fac === 'Neutrale' &&
        buc7.o === 'ROM' &&
        buc7.fac === 'Asse' &&
        (buc7.adminEntity || '').includes('Statul Național-Legionar') &&
        sibiu7.o === 'ROM' &&
        sil6.o === 'ROM' &&
        sil7.o === 'BUL' &&
        dob6.o === 'ROM' &&
        dob7.o === 'BUL' &&
        ath6.o === 'GRE' &&
        ath6.fac === 'Neutrale' &&
        ath7.o === 'GRE' &&
        ath7.fac === 'Alleati' &&
        ioa7.o === 'GRE' &&
        ioa7.fac === 'Alleati' &&
        (ioa7.note || '').includes('Kalpaki') &&
        somHb6.o === 'UK' &&
        somHb7.o === 'ITA' &&
        somHb7.name.includes('Berbera') &&
        somFt6.o === 'UK' &&
        somFt7.o === 'ITA' &&
        egmt7.o === 'EGY' &&
        egmt7.name.includes('Sidi Barrani') &&
        ind7.o === 'VIC_IND' &&
        (ind7.note || '').includes('Hanoi')
      );
    },
  },
  {
    name: 'Audit Geostorico e Topologico Split Provincia Ecuador (Border 2026 tra Ecuador e Perù, Integrità Watertight, Zero Gap, Zero Overlap, Riconoscimento Oriente Amazzonico Conteso e Risoluzione ECU)',
    run: () => {
      const ecuMain = resolveHB({ properties: { NAME: 'Ecuador' } }, 0);
      const ecuOriente = resolveHB({ properties: { NAME: 'Ecuador (Oriente)' } }, 0);
      const topMain = getExtendedToponym('Ecuador', 'ECU');
      const topOriente = getExtendedToponym('Ecuador (Oriente)', 'ECU', 'ECU_ORIENTE');

      const isOwnerOk = ecuMain.o === 'ECU' && ecuOriente.o === 'ECU';
      const isTopMainOk = topMain.name.includes('Ecuador') && (topMain.note || '').includes('Galápagos');
      const isTopOrienteOk = topOriente.name.includes('Oriente') && (topOriente.note || '').includes('Marañón');

      return isOwnerOk && isTopMainOk && isTopOrienteOk;
    },
  },
  {
    name: 'Audit Geostorico Ralliement de l\'Empire alla Francia Libera (De Gaulle / Brazzaville OTT 1940: AEF, Camerun, Gabon, Nuova Caledonia, Nuove Ebridi, Polinesia Francese, India Francese -> FFL_AEF / Alleati; AOF/Dakar, Madagascar, Siria, Somaliland -> VIC / Fantoccio)',
    run: () => {
      // 1. Step 0 (Anteguerra 1936-1938): Terza Repubblica Francese
      const aef0 = resolveHB({ properties: { NAME: 'French Equatorial Africa' } }, 0);
      const gab0 = resolveHB({ properties: { NAME: 'Gabon (France)' } }, 0);
      const nc0 = resolveHB({ properties: { NAME: 'New Caledonia' } }, 0);
      const vu0 = resolveHB({ properties: { NAME: 'New Hebrides' } }, 0);
      const pf0 = resolveHB({ properties: { NAME: 'French Polynesia' } }, 0);
      const indFr0 = resolveHB({ properties: { NAME: 'French India' } }, 0);

      // 2. Step 6 (GIU 1940: Armistizio): AEF e Camerun si schierano con FFL, mentre Gabon resta a Vichy sotto Masson
      const aef6 = resolveHB({ properties: { NAME: 'French Equatorial Africa' } }, 6);
      const gab6 = resolveHB({ properties: { NAME: 'Gabon (France)' } }, 6);
      const nc6 = resolveHB({ properties: { NAME: 'New Caledonia' } }, 6);
      const vu6 = resolveHB({ properties: { NAME: 'New Hebrides' } }, 6);
      const pf6 = resolveHB({ properties: { NAME: 'French Polynesia' } }, 6);
      const indFr6 = resolveHB({ properties: { NAME: 'French India' } }, 6);
      const aof6 = resolveHB({ properties: { NAME: 'French West Africa' } }, 6);
      const mad6 = resolveHB({ properties: { NAME: 'Madagascar (France)' } }, 6);

      // 3. Step 7 (OTT 1940: Manifeste de Brazzaville & Ralliement):
      // De Gaulle a Brazzaville (Capitale della Francia Libera, Conseil de défense de l'Empire)
      // Gabon, Nuova Caledonia, Nuove Ebridi, Polinesia e India Francese -> FFL_AEF (Alleati)
      // AOF (Dakar — Battaglia di Dakar/Operazione Menace), Madagascar, Siria, Indocina -> VIC (Fantoccio)
      const aef7 = resolveHB({ properties: { NAME: 'French Equatorial Africa' } }, 7);
      const gab7 = resolveHB({ properties: { NAME: 'Gabon (France)' } }, 7);
      const nc7 = resolveHB({ properties: { NAME: 'New Caledonia' } }, 7);
      const vu7 = resolveHB({ properties: { NAME: 'New Hebrides' } }, 7);
      const pf7 = resolveHB({ properties: { NAME: 'French Polynesia' } }, 7);
      const indFr7 = resolveHB({ properties: { NAME: 'French India' } }, 7);
      const aof7 = resolveHB({ properties: { NAME: 'French West Africa' } }, 7);
      const mad7 = resolveHB({ properties: { NAME: 'Madagascar (France)' } }, 7);

      return (
        aef0.o === 'F_AEF' &&
        gab0.o === 'F_AEF' &&
        nc0.o === 'F_COL' &&
        vu0.o === 'F_COL' &&
        pf0.o === 'F_COL' &&
        indFr0.o === 'F_COL' &&
        aef6.o === 'FFL_AEF' &&
        aef6.fac === 'Alleati' &&
        gab6.o === 'VIC_AEF' &&
        gab6.fac === 'Fantoccio' &&
        nc6.o === 'VIC' &&
        vu6.o === 'VIC' &&
        pf6.o === 'VIC' &&
        indFr6.o === 'VIC' &&
        aof6.o === 'VIC_AOF' &&
        mad6.o === 'VIC_MAD' &&
        aef7.o === 'FFL_AEF' &&
        aef7.fac === 'Alleati' &&
        gab7.o === 'FFL_AEF' &&
        gab7.fac === 'Alleati' &&
        gab7.name.includes('Gabon (France Libre') &&
        nc7.o === 'FFL_AEF' &&
        nc7.fac === 'Alleati' &&
        nc7.name.includes('Nouvelle-Calédonie (France Libre') &&
        vu7.o === 'FFL_AEF' &&
        vu7.fac === 'Alleati' &&
        vu7.name.includes('Nouvelles-Hébrides') &&
        pf7.o === 'FFL_AEF' &&
        pf7.fac === 'Alleati' &&
        pf7.name.includes('France Libre — Tahiti') &&
        indFr7.o === 'FFL_AEF' &&
        indFr7.fac === 'Alleati' &&
        indFr7.name.includes('France Libre') &&
        aof7.o === 'VIC_AOF' &&
        aof7.fac === 'Fantoccio' &&
        mad7.o === 'VIC_MAD' &&
        mad7.fac === 'Fantoccio'
      );
    },
  },
  {
    name: 'Audit Geostorico Estensione Bandiere di Vichy e della Francia Libera a tutti i Tag e Amministrazioni Coloniali (VIC, VIC_NAF, VIC_AOF, VIC_AEF, VIC_MAD, VIC_SOM, VIC_SYR, VIC_IND, ETAT_FRANCAIS, VICHY, FFL, FFL_AEF, FRANCE_LIBRE, FRANCIA_LIBERA, FORCES_FRANCAISES_LIBRES, F_AEF, F_COL, Dinamica Temporale 1936 vs 1940)',
    run: () => {
      // 1. Tag diretti ed amministrativi di Vichy (bandiera ufficiale dello Stato Francese / Pétain)
      const vicDirectTags = [
        'VIC', 'VIC_NAF', 'VIC_AOF', 'VIC_AEF', 'VIC_MAD', 'VIC_SOM', 'VIC_SYR', 'VIC_IND',
        'AEF_VICHY', 'ETAT_FRANCAIS', 'ETAT FRANCAIS', 'STATO_FRANCESE', 'STATO FRANCESE',
        'FRANCIA_DI_VICHY', 'FRANCIA DI VICHY', 'VICHY', 'REGIME_DI_VICHY', 'REGIME DI VICHY',
        'VICHY_FRANCE', 'PETAIN', 'PÉTAIN'
      ];
      for (const tag of vicDirectTags) {
        const svg = getCountryFlagSvg(tag, 6);
        if (!svg.includes('data:image/png;base64') || !svg.includes('1024') || !svg.includes('682')) {
          console.error(`Bandiera Vichy mancante o non conforme per tag: ${tag}`);
          return false;
        }
      }

      // 2. Colonie Francesi ad amministrazione temporale Vichy:
      // A step 0-5 (Terza Repubblica): Tricolore Francese (#002395, #ffffff, #ed2939) senza stemma Pétain
      // A step 6-7 (Vichy): Bandiera ufficiale dello Stato Francese (data:image/png;base64)
      const vicColonyTags = ['F_NAF', 'F_AOF', 'F_MAD', 'F_SOM', 'F_SYR', 'F_COL'];
      for (const tag of vicColonyTags) {
        const svgPre = getCountryFlagSvg(tag, 0);
        const svgPost = getCountryFlagSvg(tag, 6);
        const svgOct = getCountryFlagSvg(tag, 7);
        if (svgPre.includes('data:image/png;base64') || !svgPre.includes('#002395') || !svgPre.includes('#ed2939')) {
          console.error(`Bandiera pre-1940 non conforme per colonia: ${tag}`);
          return false;
        }
        if (!svgPost.includes('data:image/png;base64') || !svgOct.includes('data:image/png;base64')) {
          console.error(`Bandiera Vichy post-giugno 1940 mancante per colonia: ${tag}`);
          return false;
        }
      }

      // 3. Tag ed entità della Francia Libera (Tricolore con Croce di Lorena Rossa #ce2b37)
      const fflTags = [
        'FFL', 'FFL_AEF', 'FRANCE_LIBRE', 'FRANCE LIBRE', 'FRANCIA_LIBERA', 'FRANCIA LIBERA',
        'FORCES_FRANCAISES_LIBRES', 'FORCES FRANCAISES LIBRES', 'FORZE_FRANCESI_LIBERE', 'FREE_FRANCE',
        'FREE FRANCE', 'FREE_FRENCH', 'AFRICA_FRANCESE_LIBERA', 'AFRIQUE_FRANCAISE_LIBRE',
        'CONSEIL_DEFENSE_EMPIRE', 'DE_GAULLE', 'DE GAULLE'
      ];
      for (const tag of fflTags) {
        const svg = getCountryFlagSvg(tag, 7);
        if (!svg.includes('#ce2b37') || !svg.includes('#002395') || !svg.includes('#ed2939')) {
          console.error(`Bandiera Francia Libera (Croce di Lorena) mancante per tag: ${tag}`);
          return false;
        }
      }

      // 4. Africa Equatoriale Francese (F_AEF): step 0 = Tricolore Repubblicano; step 6+ = Croce di Lorena (Ralliement)
      const fAefPre = getCountryFlagSvg('F_AEF', 0);
      const fAefArm = getCountryFlagSvg('F_AEF', 6);
      const fAefOct = getCountryFlagSvg('F_AEF', 7);
      if (fAefPre.includes('#ce2b37') || !fAefPre.includes('#002395')) {
        console.error('F_AEF anteguerra non deve avere la Croce di Lorena');
        return false;
      }
      if (!fAefArm.includes('#ce2b37') || !fAefOct.includes('#ce2b37')) {
        console.error('F_AEF post-giugno 1940 deve avere la Croce di Lorena della Francia Libera');
        return false;
      }

      return true;
    },
  },
  {
    name: 'Audit Geostorico Integrale Step 8 (APR 1941: Smembramento Jugoslavia e Nascita NDH Croazia CRO, Operazione Marita in Grecia e Resistenza a Creta, Afrikakorps e Assedio di Tobruk, Caduta di Addis Abeba e Collasso AOI, Colpo di Stato di Rashid Ali in Iraq, Patto di Neutralità Sovietico-Giapponese)',
    run: () => {
      // 1. Europa: Smembramento della Jugoslavia (Operazione 25) e nascita NDH (CRO)
      const zag8 = resolveFeature({ properties: { CNTR_CODE: 'HR', NUTS_ID: 'HR050', NAME: 'Grad Zagreb' } }, 8);
      const bos8 = resolveFeature({ properties: { CNTR_CODE: 'BA', NUTS_NAME: 'Sarajevo' } }, 8);
      const syr8 = resolveFeature({ properties: { CNTR_CODE: 'RS', NUTS_ID: 'RS127', NAME: 'Srem' } }, 8);
      const spl8 = resolveFeature({ properties: { CNTR_CODE: 'HR', NUTS_ID: 'HR035', NAME: 'Splitsko-dalmatinska' } }, 8);
      const lub8 = resolveFeature({ properties: { CNTR_CODE: 'SI', NUTS_ID: 'SI041', NAME: 'Osrednjeslovenska' } }, 8);
      const mar8 = resolveFeature({ properties: { CNTR_CODE: 'SI', NUTS_ID: 'SI032', NAME: 'Podravska' } }, 8);
      const mto8 = resolveFeature({ properties: { CNTR_CODE: 'ME', NUTS_ID: 'ME000', NAME: 'Crna Gora' } }, 8);
      const kos8 = resolveFeature({ properties: { CNTR_CODE: 'XK', NUTS_NAME: 'Pristina' } }, 8);
      const beg8 = resolveFeature({ properties: { CNTR_CODE: 'RS', NUTS_ID: 'RS110', NAME: 'Beograd' } }, 8);
      const nsad8 = resolveFeature({ properties: { CNTR_CODE: 'RS', NUTS_ID: 'RS123', NAME: 'Južnobačka' } }, 8);
      const banat8 = resolveFeature({ properties: { CNTR_CODE: 'RS', NUTS_ID: 'RS122', NAME: 'Južnobanatska' } }, 8);
      const med8 = resolveFeature({ properties: { CNTR_CODE: 'HR', NUTS_ID: 'HR061', NAME: 'Međimurska' } }, 8);
      const prek8 = resolveFeature({ properties: { CNTR_CODE: 'SI', NUTS_ID: 'SI031', NAME: 'Pomurska' } }, 8);
      const sko8 = resolveFeature({ properties: { CNTR_CODE: 'MK', NUTS_ID: 'MK001', NAME: 'Vardarski' } }, 8);
      const bud8 = resolveFeature({ properties: { CNTR_CODE: 'HU', NUTS_ID: 'HU110', NAME: 'Budapest' } }, 8);
      const sof8 = resolveFeature({ properties: { CNTR_CODE: 'BG', NUTS_ID: 'BG411', NAME: 'Sofia' } }, 8);

      // 2. Europa: Invasione e occupazione tripartita della Grecia (Operazione Marita) e resistenza a Creta
      const ath8 = resolveFeature({ properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL303', NAME: 'Athina' } }, 8);
      const sal8 = resolveFeature({ properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL522', NAME: 'Thessaloniki' } }, 8);
      const kav8 = resolveFeature({ properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL515', NAME: 'Kavala' } }, 8);
      const evros8 = resolveFeature({ properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL511', NAME: 'Evros' } }, 8);
      const ioa8 = resolveFeature({ properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL543', NAME: 'Ioannina' } }, 8);
      const cre8 = resolveFeature({ properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL431', NAME: 'Irakleio' } }, 8);
      const rodi8 = resolveFeature({ properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL421', NAME: 'Rodos' } }, 8);

      // 3. Africa: Afrikakorps (Operazione Sonnenblume), Assedio di Tobruk e Collasso AOI (Caduta di Addis Abeba)
      const trp8 = resolveFeature({ id: 'LYTB', properties: { CNTR_CODE: 'LY', NUTS_ID: 'LYTB', NAME: 'Tripoli' } }, 8);
      const tob8 = resolveFeature({ id: 'LYBU', properties: { CNTR_CODE: 'LY', NUTS_ID: 'LYBU', NAME: 'Al Butnan' } }, 8);
      const egmt8 = resolveFeature({ id: 'EGMT', properties: { CNTR_CODE: 'EG', NUTS_ID: 'EGMT', NAME: 'Matrouh' } }, 8);
      const eth8 = resolveFeature({ properties: { CNTR_CODE: 'ET', NAME: 'Ethiopia' } }, 8);
      const eri8 = resolveFeature({ properties: { CNTR_CODE: 'ER', NAME: 'Eritrea' } }, 8);
      const somIt8 = resolveFeature({ properties: { CNTR_CODE: 'SO', NAME: 'Italian Somaliland' } }, 8);
      const somUk8 = resolveFeature({ properties: { CNTR_CODE: 'UK_SOMALILAND', NAME: 'British Somaliland' } }, 8);

      // 4. Asia / Medio Oriente: Colpo di Stato filo-Asse in Iraq e Patto di Neutralità Sovietico-Giapponese
      const irq8 = resolveFeature({ properties: { CNTR_CODE: 'IQ', NAME: 'Iraq' } }, 8);
      const tok8 = resolveFeature({ id: 'JP_TOKYO', properties: { CNTR_CODE: 'JP', NUTS_ID: 'JP_TOKYO', NAME: 'Tokyo' } }, 8);
      const mos8 = resolveFeature({ properties: { CNTR_CODE: 'SU', NAME: 'Moskva' } }, 8);
      const croFlag = getCountryFlagSvg('CRO', 8);
      const irqFlag = getCountryFlagSvg('IRQ', 8);

      // 5. Non-regressione: lo Step 7 (OTT 1940) resta invariato
      const zag7 = resolveFeature({ properties: { CNTR_CODE: 'HR', NUTS_ID: 'HR050', NAME: 'Grad Zagreb' } }, 7);
      const eth7 = resolveFeature({ properties: { CNTR_CODE: 'ET', NAME: 'Ethiopia' } }, 7);
      const irq7 = resolveFeature({ properties: { CNTR_CODE: 'IQ', NAME: 'Iraq' } }, 7);

      return (
        zag8.o === 'CRO' &&
        zag8.fac === 'Fantoccio' &&
        zag8.name.includes('Zagreb') &&
        bos8.o === 'CRO' &&
        bos8.fac === 'Fantoccio' &&
        syr8.o === 'CRO' &&
        spl8.o === 'ITA' &&
        spl8.name.includes('Spalato') &&
        lub8.o === 'ITA' &&
        lub8.name.includes('Lubiana') &&
        mar8.o === 'GER' &&
        mto8.o === 'ITA' &&
        kos8.o === 'ITA' &&
        beg8.o === 'GER' &&
        beg8.name.includes('Militärbefehlshabers in Serbien') &&
        nsad8.o === 'HUN' &&
        nsad8.name.includes('Újvidék') &&
        banat8.o === 'GER' &&
        med8.o === 'HUN' &&
        prek8.o === 'HUN' &&
        sko8.o === 'BUL' &&
        bud8.o === 'HUN' &&
        bud8.fac === 'Asse' &&
        sof8.o === 'BUL' &&
        sof8.fac === 'Asse' &&
        ath8.o === 'GER' &&
        ath8.name.includes('Tsolakoglou') &&
        sal8.o === 'GER' &&
        kav8.o === 'BUL' &&
        evros8.o === 'GER' &&
        ioa8.o === 'ITA' &&
        cre8.o === 'GRE' &&
        cre8.fac === 'Alleati' &&
        rodi8.o === 'ITA' &&
        (trp8.note || '').includes('Afrikakorps') &&
        (tob8.note || '').includes('Ratti di Tobruk') &&
        (egmt8.note || '').includes('Halfaya') &&
        eth8.o === 'ETH' &&
        eth8.fac === 'Alleati' &&
        eth8.name.includes('6 Aprile 1941') &&
        (eth8.note || '').includes('Haile Selassie') &&
        eri8.o === 'UK' &&
        somIt8.o === 'UK' &&
        somUk8.o === 'UK' &&
        irq8.o === 'IRQ' &&
        irq8.fac === 'Asse' &&
        irq8.name.includes('Rashid Ali') &&
        tok8.o === 'JAP' &&
        (tok8.note || '').includes('13 aprile 1941') &&
        (mos8.note || '').includes('13 aprile 1941') &&
        croFlag.includes('data:image/png;base64') &&
        croFlag.includes('1024') &&
        croFlag.includes('412') &&
        irqFlag.includes('#ce1126') &&
        irqFlag.includes('#007a3d') &&
        zag7.o === 'YUG' &&
        eth7.o === 'ITA' &&
        irq7.o === 'UK'
      );
    },
  },
  {
    name: 'Audit Geostorico e Topologico Cucitura Kazakhstan (Chiusura Crepe Nere Mertvyi Kultuk / Kaidak e Triangolo Ustyurt tra Atyrau, Mangystau, Aktobe e Karakalpakstan)',
    run: () => {
      const atyrau = USSR_REGIONAL_FEATURES.find((f: any) => f.id === 'SOV_ADM1_KAZ_138_Atyrau_Region');
      const mangystau = USSR_REGIONAL_FEATURES.find((f: any) => f.id === 'SOV_ADM1_KAZ_133_Mangystau_Region');
      const aktobe = USSR_REGIONAL_FEATURES.find((f: any) => f.id === 'SOV_ADM1_KAZ_137_Aktobe_Region');
      const karakalpakstan = USSR_REGIONAL_FEATURES.find((f: any) => f.id === 'SOV_ADM1_UZB_149_Republic_of_Karakalpakstan');

      if (!atyrau || !mangystau || !aktobe || !karakalpakstan) return false;

      const aRing = atyrau.geometry.type === 'MultiPolygon' ? atyrau.geometry.coordinates[0][0] : atyrau.geometry.coordinates[0];
      const mRing = mangystau.geometry.coordinates[4][0];
      const aktRing = aktobe.geometry.coordinates[1][0];
      const kRing = karakalpakstan.geometry.coordinates[0];

      // 1. Mertvyi Kultuk / Kaidak (Atyrau - Mangystau)
      const hasCaspianCoast1 = mRing.some((p: number[]) => Math.abs(p[0] - 50.6) < 1e-4 && Math.abs(p[1] - 45.8) < 1e-4);
      const hasCaspianCoast2 = mRing.some((p: number[]) => Math.abs(p[0] - 50.2) < 1e-4 && Math.abs(p[1] - 46.2) < 1e-4);
      const hasTripointUstyurt = mRing.some((p: number[]) => Math.abs(p[0] - 55.999) < 1e-3 && Math.abs(p[1] - 45.0) < 1e-3);
      const hasAtyrauMangystauTripoint = mRing.some((p: number[]) => Math.abs(p[0] - 56.467) < 1e-3 && Math.abs(p[1] - 46.132) < 1e-3);

      let sharedAtyrauMangystau = 0;
      for (const pA of aRing) {
        if (mRing.some((pM: number[]) => Math.abs(pM[0] - pA[0]) < 1e-4 && Math.abs(pM[1] - pA[1]) < 1e-4)) {
          sharedAtyrauMangystau++;
        }
      }

      // 2. Triangolo Ustyurt (Aktobe - Mangystau - Karakalpakstan)
      const hasAktobeMeridian = aktRing.some((p: number[]) => Math.abs(p[0] - 55.999) < 1e-3 && Math.abs(p[1] - 45.0) < 1e-3);
      const hasAktobeAralShore = aktRing.some((p: number[]) => Math.abs(p[0] - 58.588) < 1e-3 && Math.abs(p[1] - 45.590) < 1e-3);
      const hasKaraTripoint = kRing.some((p: number[]) => Math.abs(p[0] - 55.999) < 1e-3 && Math.abs(p[1] - 45.0) < 1e-3);
      const hasKaraAralShore = kRing.some((p: number[]) => Math.abs(p[0] - 58.588) < 1e-3 && Math.abs(p[1] - 45.590) < 1e-3);

      return (
        hasCaspianCoast1 &&
        hasCaspianCoast2 &&
        hasTripointUstyurt &&
        hasAtyrauMangystauTripoint &&
        sharedAtyrauMangystau >= 100 &&
        hasAktobeMeridian &&
        hasAktobeAralShore &&
        hasKaraTripoint &&
        hasKaraAralShore
      );
    },
  },
  {
    name: 'Audit Geostorico e Topologico Cucitura Finlandia Meridionale e Carelia (Chiusura Crepe Nere tra Kymenlaakso, Etelä-Karjala, Pohjois-Karjala, Viipuri, Käkisalmi, Lahdenpohja, Sortavala e Suojärvi)',
    run: () => {
      const jsonPath = fileURLToPath(new URL('../public/data/world_historical_1938_unified.json', import.meta.url));
      const unifiedData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      const provs = unifiedData.features;

      const fi1c4 = provs.find((f: any) => f.id === 'FI1C4' || f.properties?.NUTS_ID === 'FI1C4');
      const fi1c5 = provs.find((f: any) => f.id === 'FI1C5' || f.properties?.NUTS_ID === 'FI1C5');
      const fi1d3 = provs.find((f: any) => f.id === 'FI1D3' || f.properties?.NUTS_ID === 'FI1D3');

      const vyborg = USSR_REGIONAL_FEATURES.find((f: any) => f.id === 'FIN_HIST_259_Vyborgsky_District');
      const lahden = USSR_REGIONAL_FEATURES.find((f: any) => f.id === 'FIN_HIST_283_Lahdenpohja_District');
      const sorta = USSR_REGIONAL_FEATURES.find((f: any) => f.id === 'FIN_HIST_289_Sortavala_District');
      const suoj = USSR_REGIONAL_FEATURES.find((f: any) => f.id === 'FIN_HIST_290_Suoj_rvi_District');

      if (!fi1c4 || !fi1c5 || !fi1d3 || !vyborg || !lahden || !sorta || !suoj) return false;

      const hasPt = (coords: any, lon: number, lat: number): boolean => {
        if (typeof coords[0] === 'number') {
          return Math.abs(coords[0] - lon) < 1e-3 && Math.abs(coords[1] - lat) < 1e-3;
        }
        return coords.some((sub: any) => hasPt(sub, lon, lat));
      };

      const vGeom = vyborg.geometry.coordinates;
      const lGeom = lahden.geometry.coordinates;
      const sGeom = sorta.geometry.coordinates;
      const sjGeom = suoj.geometry.coordinates;

      // 1. Linea costiera e tripoint FI1C4 / Viipuri / FI1C5
      const okCoast = hasPt(vGeom, 27.7419, 60.5654) && hasPt(fi1c4.geometry.coordinates, 27.7419, 60.5654);
      const okTri1 = hasPt(vGeom, 27.9911, 60.6687) && hasPt(fi1c4.geometry.coordinates, 27.9911, 60.6687) && hasPt(fi1c5.geometry.coordinates, 27.9911, 60.6687);

      // 2. Confine Etelä-Karjala / Viipuri / Lahdenpohja
      const okTri2 = hasPt(vGeom, 29.2370, 61.2696) && hasPt(lGeom, 29.2370, 61.2696) && hasPt(fi1c5.geometry.coordinates, 29.2370, 61.2696);
      const okVyborgKakisalmi = hasPt(vGeom, 29.5700, 61.1820);

      // 3. Confine Etelä-Karjala / Pohjois-Karjala / Lahdenpohja / Sortavala
      const okTri3 = hasPt(lGeom, 30.1444, 61.8527) && hasPt(sGeom, 30.1444, 61.8527) && hasPt(fi1c5.geometry.coordinates, 30.1444, 61.8527) && hasPt(fi1d3.geometry.coordinates, 30.1444, 61.8527);
      const okLahdenSorta = hasPt(lGeom, 30.0190, 61.7560) && hasPt(sGeom, 30.0190, 61.7560);

      // 4. Confine Pohjois-Karjala / Sortavala / Suojärvi
      const okTri4 = hasPt(sGeom, 30.6546, 62.2001) && hasPt(sjGeom, 30.6546, 62.2001) && hasPt(fi1d3.geometry.coordinates, 30.6546, 62.2001);
      const okSortaSuojPitk = hasPt(sGeom, 31.0760, 61.9090) && hasPt(sjGeom, 31.0760, 61.9090);

      // 5. Confine settentrionale Suojärvi / Pohjois-Karjala
      const okSuojNorth = hasPt(sjGeom, 31.2775, 63.1088) && hasPt(fi1d3.geometry.coordinates, 31.2775, 63.1088);

      return okCoast && okTri1 && okTri2 && okVyborgKakisalmi && okTri3 && okLahdenSorta && okTri4 && okSortaSuojPitk && okSuojNorth;
    },
  },
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
