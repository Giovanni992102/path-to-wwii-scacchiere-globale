
import { getExtendedToponym } from '../src/data/historicalToponyms';
import {
  NUTS_URLS,
  CNTR_URLS,
  HB_URL1,
  HB_EXCL,
  HB_NAME,
  METRO_FRAG,
  assignUnnamedHB,
  resolveFeature,
  resolveHB,
  makeResult,
} from '../src/data/georesolver';
import {
  PRECISION_HISTORICAL_FEATURES,
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
} from '../src/data/historicalBorders';
import { CZECHOSLOVAKIA_REGIONAL_FEATURES } from '../src/data/czechoslovakiaRegions';
import { getCountryFlagSvg } from '../src/data/historicalFlags';
import { getOwnerMeta } from '../src/data/owners';

const addLog = (text: string, type?: string) => {
  console.log('[LOG ' + type + ']: ' + text);
};
const useCallback = (fn: any, _deps?: any[]) => fn;

const runSelfTests = useCallback(() => {
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
          resolveHB({ properties: { NAME: 'Algeria (France)', SUBJECTO: 'France' } }, 0).o ===
            'F_NAF' &&
          resolveHB({ properties: { NAME: 'Algeria (France)', SUBJECTO: 'France' } }, 6).o ===
            'VIC_NAF',
      },
      {
        name: 'Integrità Territoriale Polonia (1936: POL -> 1939: GER)',
        run: () =>
          resolveFeature({ properties: { CNTR_CODE: 'PL', NUTS_ID: 'PL214' } }, 0).o === 'POL' &&
          resolveFeature({ properties: { CNTR_CODE: 'PL', NUTS_ID: 'PL214' } }, 5).o === 'GER',
      },
      {
        name: 'Integrità Territoriale Finlandia (1936: FIN)',
        run: () =>
          resolveHB({ properties: { NAME: 'Finland' } }, 0).o === 'FIN',
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
        run: () =>
          resolveHB({ properties: { NAME: 'Netherlands East Indies' } }, 0).o === 'HOL',
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
        name: 'Risoluzione Basemap d\'Epoca Jugoslavia (HB Yugoslavia -> YUG)',
        run: () =>
          resolveHB({ properties: { NAME: 'Yugoslavia' } }, 0).o === 'YUG' &&
          resolveHB({ properties: { NAME: 'Kingdom of Yugoslavia' } }, 0).o === 'YUG',
      },
      {
        name: 'Assegnazione Guinea Portoghese / Guinea-Bissau (GW/GNB -> POR)',
        run: () =>
          resolveFeature({ properties: { CNTR_CODE: 'GW', NAME: 'Guinea-Bissau' } }, 0).o === 'POR' &&
          resolveFeature({ properties: { CNTR_CODE: 'GNB', NAME: 'Guinea-Bissau' } }, 0).o === 'POR' &&
          resolveHB({ properties: { NAME: 'Guinea-Bissau' } }, 0).o === 'POR' &&
          resolveHB({ properties: { NAME: 'Portuguese Guinea' } }, 0).o === 'POR',
      },
      {
        name: 'Assegnazione Togo Francese (TG/TGO -> F_AOF)',
        run: () =>
          resolveFeature({ properties: { CNTR_CODE: 'TG', NAME: 'Togo' } }, 0).o === 'F_AOF' &&
          resolveFeature({ properties: { CNTR_CODE: 'TGO', NAME: 'Togo' } }, 0).o === 'F_AOF' &&
          resolveHB({ properties: { NAME: 'Togo' } }, 0).o === 'F_AOF' &&
          resolveHB({ properties: { NAME: 'French Togoland' } }, 0).o === 'F_AOF',
      },
      {
        name: 'Assegnazione Nyasaland / Malawi (MW/MWI -> UK)',
        run: () =>
          resolveFeature({ properties: { CNTR_CODE: 'MW', NAME: 'Malawi' } }, 0).o === 'UK' &&
          resolveFeature({ properties: { CNTR_CODE: 'MWI', NAME: 'Malawi' } }, 0).o === 'UK' &&
          resolveHB({ properties: { NAME: 'Malawi' } }, 0).o === 'UK' &&
          resolveHB({ properties: { NAME: 'Nyasaland' } }, 0).o === 'UK',
      },
      {
        name: 'Assegnazione Congo Belga & Ruanda-Urundi (CD/RW/BI -> BEL)',
        run: () =>
          resolveFeature({ properties: { CNTR_CODE: 'CD', NAME: 'Democratic Republic of the Congo' } }, 0).o === 'BEL' &&
          resolveHB({ properties: { NAME: 'Belgian Congo' } }, 0).o === 'BEL' &&
          resolveHB({ properties: { NAME: 'Ruanda-Urundi' } }, 0).o === 'BEL',
      },
      {
        name: 'Assegnazione Isola di Man & Channel Islands (IM/GG/JE -> UK)',
        run: () =>
          resolveFeature({ properties: { CNTR_CODE: 'IM', NAME: 'Isle of Man' } }, 0).o === 'UK' &&
          resolveFeature({ properties: { CNTR_CODE: 'IMN', NAME: 'Isle of Man' } }, 0).o === 'UK' &&
          resolveFeature({ properties: { NUTS_NAME: 'Isle of Man' } }, 0).o === 'UK' &&
          resolveFeature({ properties: {}, __cent: [-4.54, 54.23] }, 0).o === 'UK' &&
          resolveHB({ properties: { NAME: 'Isle of Man' } }, 0).o === 'UK' &&
          resolveHB({ properties: { NAME: 'Man' } }, 0).o === 'UK' &&
          resolveHB({ properties: {}, __cent: [-4.54, 54.23] }, 0).o === 'UK' &&
          resolveFeature({ properties: { CNTR_CODE: 'JE', NAME: 'Jersey' } }, 0).o === 'UK' &&
          resolveFeature({ properties: { CNTR_CODE: 'GG', NAME: 'Guernsey' } }, 0).o === 'UK',
      },
      {
        name: 'Assegnazione Mesopotamia Britannica & Integrità Turchia/Arabia Saudita',
        run: () =>
          // Iraq / Mesopotamia -> UK
          resolveFeature({ properties: { CNTR_CODE: 'IQ', NAME: 'Iraq' } }, 0).o === 'UK' &&
          resolveFeature({ properties: { CNTR_CODE: 'IRQ', NAME: 'Mesopotamia' } }, 0).o === 'UK' &&
          resolveFeature({ properties: { NAME: 'British Mesopotamia' } }, 0).o === 'UK' &&
          resolveFeature({ properties: { NAME: 'Mandate of Mesopotamia' } }, 0).o === 'UK' &&
          resolveHB({ properties: { NAME: 'Mesopotamia' } }, 0).o === 'UK' &&
          resolveHB({ properties: { NAME: 'British Mesopotamia' } }, 0).o === 'UK' &&
          resolveHB({ properties: { NAME: 'Mandate of Mesopotamia' } }, 0).o === 'UK' &&
          resolveHB({ properties: { NAME: 'Iraq' } }, 0).o === 'UK' &&
          resolveHB({ properties: { NAME: 'Kingdom of Iraq' } }, 0).o === 'UK' &&
          // Turchia -> TUR (non deve essere presa da Iraq)
          resolveFeature({ properties: { CNTR_CODE: 'TR', NAME: 'Turkey' } }, 0).o === 'TUR' &&
          resolveFeature({ properties: { CNTR_CODE: 'TUR', NAME: 'Diyarbakir' } }, 0).o === 'TUR' &&
          resolveHB({ properties: { NAME: 'Turkey' } }, 0).o === 'TUR' &&
          resolveHB({ properties: { NAME: 'Türkiye' } }, 0).o === 'TUR' &&
          // Arabia Saudita -> SAU (Nejd, Hejaz, Hail, Bin Sha'lan, territori desertici)
          resolveFeature({ properties: { CNTR_CODE: 'SA', NAME: 'Saudi Arabia' } }, 0).o === 'SAU' &&
          resolveFeature({ properties: { CNTR_CODE: 'SAU', NAME: 'Al-Jawf' } }, 0).o === 'SAU' &&
          resolveHB({ properties: { NAME: 'Saudi Arabia' } }, 0).o === 'SAU' &&
          resolveHB({ properties: { NAME: 'Saudi Arabia' } }, 0).name.includes('Nejd') &&
          resolveHB({ properties: { NAME: 'Nejd' } }, 0).o === 'SAU' &&
          resolveHB({ properties: { NAME: 'Nejd' } }, 0).name.includes('Nejd') &&
          resolveHB({ properties: { NAME: 'Hejaz' } }, 0).o === 'SAU' &&
          resolveHB({ properties: { NAME: 'Hejaz' } }, 0).name.includes('Hejaz') &&
          resolveHB({ properties: { NAME: 'Hail' } }, 0).o === 'SAU' &&
          resolveHB({ properties: { NAME: 'Hail' } }, 0).name.includes('Ha\'il') &&
          resolveHB({ properties: { NAME: "Emirate of Bin Shal'an" } }, 0).o === 'SAU' &&
          resolveHB({ properties: { NAME: 'Saudi Arabia (Northern Borders - Al-Jawf)' } }, 0).o === 'SAU' &&
          resolveHB({ properties: {}, __cent: [41.008, 29.236] }, 0).o === 'SAU',
      },
      {
        name: 'Evoluzione Storica Repubblica di Hatay (F_SYR 1936-38 -> HAT 1938-39 -> TUR dal 1939)',
        run: () =>
          // Step 0 (Gen 1936): Mandato Francese (F_SYR)
          resolveFeature({ properties: { NUTS_ID: 'TR631', NAME: 'Hatay' } }, 0).o === 'F_SYR' &&
          resolveHB({ properties: { NAME: 'Sanjak of Alexandretta' } }, 0).o === 'F_SYR' &&
          resolveHB({ properties: { NAME: 'Hatay' } }, 0).o === 'F_SYR' &&
          // Step 1 (Mar 1938): Mandato/Transizione (F_SYR)
          resolveFeature({ properties: { NUTS_ID: 'TR631', NAME: 'Hatay' } }, 1).o === 'F_SYR' &&
          resolveHB({ properties: { NAME: 'Alexandretta' } }, 1).o === 'F_SYR' &&
          // Step 2 (Ott 1938): Repubblica Indipendente di Hatay (HAT)
          resolveFeature({ properties: { NUTS_ID: 'TR631', NAME: 'Hatay' } }, 2).o === 'HAT' &&
          resolveHB({ properties: { NAME: 'Republic of Hatay' } }, 2).o === 'HAT' &&
          resolveHB({ properties: { NAME: 'Stato di Hatay' } }, 2).o === 'HAT' &&
          resolveHB({ properties: { NAME: 'Hatay' } }, 2).o === 'HAT' &&
          // Step 3 (Mar 1939): Repubblica di Hatay (HAT)
          resolveFeature({ properties: { NUTS_ID: 'TR631', NAME: 'Hatay' } }, 3).o === 'HAT' &&
          resolveHB({ properties: { NAME: 'Hatay' } }, 3).o === 'HAT' &&
          // Step 4 (Apr 1939 / Estate 1939): Annessione alla Turchia (TUR)
          resolveFeature({ properties: { NUTS_ID: 'TR631', NAME: 'Hatay' } }, 4).o === 'TUR' &&
          resolveHB({ properties: { NAME: 'Hatay' } }, 4).o === 'TUR' &&
          // Step 5 (Set 1939): Provincia di Hatay della Turchia (TUR)
          resolveFeature({ properties: { NUTS_ID: 'TR631', NAME: 'Hatay' } }, 5).o === 'TUR' &&
          resolveHB({ properties: { NAME: 'Hatay' } }, 5).o === 'TUR' &&
          // Step 6 (Giu 1940): Provincia di Hatay della Turchia (TUR)
          resolveFeature({ properties: { NUTS_ID: 'TR631', NAME: 'Hatay' } }, 6).o === 'TUR' &&
          resolveHB({ properties: { NAME: 'Hatay' } }, 6).o === 'TUR',
      },
      {
        name: 'Spartizione Francia 1940 (FRA 1936-39 -> Vichy / Zona Occupata / Alsazia-Mosella / Bruxelles dal giu 1940)',
        run: () =>
          // Step 0-5: Tutta la Francia Metropolitina è Repubblica Francese (FRA)
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FR101', NAME: 'Paris' } }, 0).o === 'FRA' &&
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRK11', NAME: 'Allier' } }, 0).o === 'FRA' &&
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRF11', NAME: 'Bas-Rhin' } }, 0).o === 'FRA' &&
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRE11', NAME: 'Nord' } }, 0).o === 'FRA' &&
          // Step 6 (Giu-Lug 1940): Partizione Storica
          // 1. Zone Libre (Stato Francese / Regime di Vichy)
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRK11', NAME: 'Allier' } }, 6).o === 'VIC' &&
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRK14', NAME: 'Puy-de-Dôme' } }, 6).o === 'VIC' &&
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRK26', NAME: 'Rhône' } }, 6).o === 'VIC' &&
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRL04', NAME: 'Bouches-du-Rhône' } }, 6).o === 'VIC' &&
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRL05', NAME: 'Var' } }, 6).o === 'VIC' &&
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRJ23', NAME: 'Haute-Garonne' } }, 6).o === 'VIC' &&
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRI21', NAME: 'Corrèze' } }, 6).o === 'VIC' &&
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRM01', NAME: 'Corse-du-Sud' } }, 6).o === 'VIC' &&
          // 2. Zone Occupée (Militärbefehlshaber in Frankreich - Parigi e Costa Atlantica)
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FR101', NAME: 'Paris' } }, 6).o === 'GER' &&
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FR106', NAME: 'Seine-Saint-Denis' } }, 6).o === 'GER' &&
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRH03', NAME: 'Ille-et-Vilaine' } }, 6).o === 'GER' &&
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRG02', NAME: 'Maine-et-Loire' } }, 6).o === 'GER' &&
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRI12', NAME: 'Gironde' } }, 6).o === 'GER' &&
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRI13', NAME: 'Landes' } }, 6).o === 'GER' &&
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRH02', NAME: 'Finistère' } }, 6).o === 'GER' &&
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRD22', NAME: 'Seine-Maritime' } }, 6).o === 'GER' &&
          // 3. Alsazia e Mosella (Annessione de facto al Terzo Reich)
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRF11', NAME: 'Bas-Rhin' } }, 6).o === 'GER' &&
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRF33', NAME: 'Moselle' } }, 6).o === 'GER' &&
          // 4. Nord e Pas-de-Calais (Comando di Bruxelles)
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRE11', NAME: 'Nord' } }, 6).o === 'GER' &&
          resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRE12', NAME: 'Pas-de-Calais' } }, 6).o === 'GER',
      },
      {
        name: 'Partizione Africa Francese 1940: Vichy (AOF/NAF) vs Francia Libera (AEF/Camerun)',
        run: () =>
          // Step 0: Anteguerra (Terza Repubblica Francese)
          resolveFeature({ properties: { CNTR_CODE: 'TD', NAME: 'Chad' } }, 0).o === 'F_AEF' &&
          resolveFeature({ properties: { CNTR_CODE: 'SN', NAME: 'Senegal' } }, 0).o === 'F_AOF' &&
          resolveFeature({ properties: { CNTR_CODE: 'DZ', NAME: 'Algeria' } }, 0).o === 'F_NAF' &&
          getOwnerMeta('F_AEF').c === getOwnerMeta('FRA').c &&
          // Step 6: 1. Africa Equatoriale Francese & Camerun -> Francia Libera (FFL_AEF / Alleati)
          resolveFeature({ properties: { CNTR_CODE: 'TD', NAME: 'Chad' } }, 6).o === 'FFL_AEF' &&
          resolveFeature({ properties: { CNTR_CODE: 'CM', NAME: 'Cameroon' } }, 6).o === 'FFL_AEF' &&
          resolveFeature({ properties: { CNTR_CODE: 'CG', NAME: 'Congo' } }, 6).o === 'FFL_AEF' &&
          resolveFeature({ properties: { CNTR_CODE: 'CF', NAME: 'Central African Republic' } }, 6).o === 'FFL_AEF' &&
          resolveFeature({ properties: { CNTR_CODE: 'GA', NAME: 'Gabon' } }, 6).o === 'FFL_AEF' &&
          resolveHB({ properties: { NAME: 'Chad' } }, 6).o === 'FFL_AEF' &&
          resolveHB({ properties: { NAME: 'French Equatorial Africa' } }, 6).o === 'FFL_AEF' &&
          resolveHB({ properties: { NAME: 'Cameroun' } }, 6).o === 'FFL_AEF' &&
          // Step 6: 2. Africa Occidentale Francese -> Regime di Vichy (VIC_AOF / Fantoccio)
          resolveFeature({ properties: { CNTR_CODE: 'SN', NAME: 'Senegal' } }, 6).o === 'VIC_AOF' &&
          resolveFeature({ properties: { CNTR_CODE: 'MR', NAME: 'Mauritania' } }, 6).o === 'VIC_AOF' &&
          resolveFeature({ properties: { CNTR_CODE: 'ML', NAME: 'Mali' } }, 6).o === 'VIC_AOF' &&
          resolveFeature({ properties: { CNTR_CODE: 'GN', NAME: 'Guinea' } }, 6).o === 'VIC_AOF' &&
          resolveFeature({ properties: { CNTR_CODE: 'CI', NAME: 'Ivory Coast' } }, 6).o === 'VIC_AOF' &&
          resolveFeature({ properties: { CNTR_CODE: 'NE', NAME: 'Niger' } }, 6).o === 'VIC_AOF' &&
          resolveFeature({ properties: { CNTR_CODE: 'BF', NAME: 'Burkina Faso' } }, 6).o === 'VIC_AOF' &&
          resolveFeature({ properties: { CNTR_CODE: 'BJ', NAME: 'Benin' } }, 6).o === 'VIC_AOF' &&
          resolveFeature({ properties: { CNTR_CODE: 'TG', NAME: 'Togo' } }, 6).o === 'VIC_AOF' &&
          resolveHB({ properties: { NAME: 'French West Africa' } }, 6).o === 'VIC_AOF' &&
          resolveHB({ properties: { NAME: 'Senegal' } }, 6).o === 'VIC_AOF' &&
          // Step 6: 3. Nordafrica Francese -> Regime di Vichy (VIC_NAF / Fantoccio)
          resolveFeature({ properties: { CNTR_CODE: 'DZ', NAME: 'Algeria' } }, 6).o === 'VIC_NAF' &&
          resolveFeature({ properties: { CNTR_CODE: 'MA', NAME: 'Morocco' } }, 6).o === 'VIC_NAF' &&
          resolveFeature({ properties: { CNTR_CODE: 'TN', NAME: 'Tunisia' } }, 6).o === 'VIC_NAF' &&
          resolveHB({ properties: { NAME: 'Algeria' } }, 6).o === 'VIC_NAF' &&
          resolveHB({ properties: { NAME: 'Morocco' } }, 6).o === 'VIC_NAF' &&
          resolveHB({ properties: { NAME: 'Tunisia' } }, 6).o === 'VIC_NAF' &&
          // Step 6: 4. Madagascar e Somalia Francese / Gibuti -> Vichy
          resolveFeature({ properties: { CNTR_CODE: 'MG', NAME: 'Madagascar' } }, 6).o === 'VIC_MAD' &&
          resolveFeature({ properties: { CNTR_CODE: 'DJ', NAME: 'Djibouti' } }, 6).o === 'VIC_SOM' &&
          resolveHB({ properties: { NAME: 'Madagascar' } }, 6).o === 'VIC_MAD',
      },
      {
        name: 'Integrità Bandiere Autentiche (Mengjiang, PCC/Cina Sovietica, Xinjiang, Indocina, Grecia, Filippine, Tannu Tuva, Liberia)',
        run: () =>
          getCountryFlagSvg('MEJ').includes('data:image/png;base64') &&
          getCountryFlagSvg('CCP_CHI').includes('data:image/png;base64') &&
          getCountryFlagSvg('XIN').includes('data:image/png;base64') &&
          getCountryFlagSvg('F_IND').includes('data:image/png;base64') &&
          getCountryFlagSvg('VIC_IND').includes('data:image/png;base64') &&
          getCountryFlagSvg('GRE').includes('data:image/png;base64') &&
          getCountryFlagSvg('PHL').includes('data:image/png;base64') &&
          getCountryFlagSvg('PH').includes('data:image/png;base64') &&
          getCountryFlagSvg('TUV').includes('data:image/png;base64') &&
          getCountryFlagSvg('TANNU_TUVA').includes('data:image/png;base64') &&
          getCountryFlagSvg('LBR').includes('data:image/png;base64') &&
          getCountryFlagSvg('LIBERIA').includes('data:image/png;base64'),
      },
      {
        name: 'Evoluzione Guerra Civile Spagnola: SPR vs SPA (Fronte, Baleari, Protettorato del Rif, Ceuta, Melilla, Tangeri)',
        run: () =>
          // Step 0 (1936): Tutto territorio metropolitano e coloniale sotto la Repubblica (SPR)
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES300', NAME: 'Madrid' } }, 0).o === 'SPR' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES511', NAME: 'Barcelona' } }, 0).o === 'SPR' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES111', NAME: 'A Coruña' } }, 0).o === 'SPR' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES532', NAME: 'Mallorca' } }, 0).o === 'SPR' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES533', NAME: 'Menorca' } }, 0).o === 'SPR' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES630', NAME: 'Ceuta' } }, 0).o === 'SPR' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES640', NAME: 'Melilla' } }, 0).o === 'SPR' &&
          resolveHB({ properties: { NAME: 'Spanish Morocco' } }, 0).o === 'SPR' &&
          resolveHB({ properties: { NAME: 'Protettorato Spagnolo del Marocco (Rif)' } }, 0).o === 'SPR' &&
          // Step 1 (Mar 1938): Divisione della guerra civile
          // - Zona Repubblicana: Madrid, Catalogna, Valencia, Cartagena/Murcia, Minorca (ES533)
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES300', NAME: 'Madrid' } }, 1).o === 'SPR' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES511', NAME: 'Barcelona' } }, 1).o === 'SPR' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES523', NAME: 'Valencia' } }, 1).o === 'SPR' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES620', NAME: 'Murcia' } }, 1).o === 'SPR' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES533', NAME: 'Menorca' } }, 1).o === 'SPR' &&
          resolveHB({ properties: { NAME: 'Menorca' } }, 1).o === 'SPR' &&
          // - Zona Franchista: Burgos (capitale), Galizia, Maiorca (ES532), Siviglia, Ceuta, Melilla, Marocco Spagnolo (Rif)
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES412', NAME: 'Burgos' } }, 1).o === 'SPA' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES111', NAME: 'A Coruña' } }, 1).o === 'SPA' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES532', NAME: 'Mallorca' } }, 1).o === 'SPA' &&
          resolveHB({ properties: { NAME: 'Mallorca' } }, 1).o === 'SPA' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES618', NAME: 'Sevilla' } }, 1).o === 'SPA' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES630', NAME: 'Ceuta' } }, 1).o === 'SPA' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES640', NAME: 'Melilla' } }, 1).o === 'SPA' &&
          resolveHB({ properties: { NAME: 'Spanish Morocco' } }, 1).o === 'SPA' &&
          resolveHB({ properties: { NAME: 'Protettorato Spagnolo del Marocco (Rif)' } }, 1).o === 'SPA' &&
          // Step 2 (Ott 1938): Castellón presa dai franchisti (Vinaròs/Levante); Catalogna, Madrid e Minorca ancora SPR; Rif SPA
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES522', NAME: 'Castellón' } }, 2).o === 'SPA' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES511', NAME: 'Barcelona' } }, 2).o === 'SPR' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES300', NAME: 'Madrid' } }, 2).o === 'SPR' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES533', NAME: 'Menorca' } }, 2).o === 'SPR' &&
          resolveHB({ properties: { NAME: 'Spanish Morocco' } }, 2).o === 'SPA' &&
          // Step 3 (Mar 1939): Vittoria di Franco, fine della guerra, unificazione SPA (Minorca cade a feb '39)
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES300', NAME: 'Madrid' } }, 3).o === 'SPA' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES511', NAME: 'Barcelona' } }, 3).o === 'SPA' &&
          resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES533', NAME: 'Menorca' } }, 3).o === 'SPA' &&
          resolveHB({ properties: { NAME: 'Menorca' } }, 3).o === 'SPA' &&
          resolveHB({ properties: { NAME: 'Spanish Morocco' } }, 3).o === 'SPA' &&
          // Step 6 (Giu 1940): Tangeri occupata militarmente dalle truppe coloniali spagnole di Franco
          resolveHB({ properties: { NAME: 'Tangier' } }, 0).o === 'NEU' &&
          resolveHB({ properties: { NAME: 'Tangier' } }, 6).o === 'SPA',
      },
      {
        name: 'Dinamica NUTS Slovacchia & Primo Arbitrato di Vienna',
        run: () =>
          // Step 0: Cecoslovacchia unita (Nitra SK023 e Košice SK042 cecoslovacche)
          resolveFeature({ properties: { CNTR_CODE: 'SK', NUTS_ID: 'SK023', NAME: 'Nitra' } }, 0).o === 'CZE' &&
          resolveFeature({ properties: { CNTR_CODE: 'SK', NUTS_ID: 'SK042', NAME: 'Košice' } }, 0).o === 'CZE' &&
          resolveFeature({ properties: { CNTR_CODE: 'SK', NUTS_ID: 'SK010', NAME: 'Bratislava' } }, 0).o === 'CZE' &&
          // Step 2 (Ott 1938 / Primo Arbitrato di Vienna nov 1938): Nitra e Košice all'Ungheria, Bratislava a CZE
          resolveFeature({ properties: { CNTR_CODE: 'SK', NUTS_ID: 'SK023', NAME: 'Nitra' } }, 2).o === 'HUN' &&
          resolveFeature({ properties: { CNTR_CODE: 'SK', NUTS_ID: 'SK042', NAME: 'Košice' } }, 2).o === 'HUN' &&
          resolveFeature({ properties: { CNTR_CODE: 'SK', NUTS_ID: 'SK010', NAME: 'Bratislava' } }, 2).o === 'CZE' &&
          // Step 3 (Mar 1939): Repubblica Slovacca di Tiso per Bratislava, Ungheria per le province meridionali
          resolveFeature({ properties: { CNTR_CODE: 'SK', NUTS_ID: 'SK010', NAME: 'Bratislava' } }, 3).o === 'SLO' &&
          resolveFeature({ properties: { CNTR_CODE: 'SK', NUTS_ID: 'SK023', NAME: 'Nitra' } }, 3).o === 'HUN' &&
          resolveFeature({ properties: { CNTR_CODE: 'SK', NUTS_ID: 'SK042', NAME: 'Košice' } }, 3).o === 'HUN',
      },
      {
        name: 'Geometrie di Precisione: Rutenia Subcarpatica (CZE -> HUN)',
        run: () =>
          CARPATHIAN_RUTHENIA_FEATURE.__resolve(0).o === 'CZE' &&
          CARPATHIAN_RUTHENIA_FEATURE.__resolve(1).o === 'CZE' &&
          CARPATHIAN_RUTHENIA_FEATURE.__resolve(2).o === 'CZE' &&
          CARPATHIAN_RUTHENIA_FEATURE.__resolve(3).o === 'HUN' &&
          CARPATHIAN_RUTHENIA_FEATURE.__resolve(6).o === 'HUN',
      },
      {
        name: 'Partizione Storica Cecoslovacchia 1938-1939 (Sudeti, Zaolzie, Protettorato, Slovacchia, Felvidék, Chust)',
        run: () => {
          const findF = (id: string) => CZECHOSLOVAKIA_REGIONAL_FEATURES.find((f: any) => f.id === id);
          const eger = findF('CZE_SUD_EGER');
          const trautenau = findF('CZE_SUD_TRAUTENAU');
          const boehmerwald = findF('CZE_SUD_BOEHMERWALD');
          const zaolzie = findF('CZE_ZAOLZIE');
          const praha = findF('CZE_PRAHA');
          const bratislava = findF('CZE_SLO_BRATISLAVA');
          const felKosice = findF('CZE_FEL_KOSICE');
          const ruthNorth = findF('CZE_RUTHENIA_NORTH');
          return (
            !!eger && !!trautenau && !!boehmerwald && !!zaolzie && !!praha && !!bratislava && !!felKosice && !!ruthNorth &&
            // Step 0: Tutti sotto Cecoslovacchia unita
            eger.__resolve(0).o === 'CZE' &&
            zaolzie.__resolve(0).o === 'CZE' &&
            praha.__resolve(0).o === 'CZE' &&
            bratislava.__resolve(0).o === 'CZE' &&
            felKosice.__resolve(0).o === 'CZE' &&
            ruthNorth.__resolve(0).o === 'CZE' &&
            // Step 2 (Patto di Monaco & Primo Arbitrato di Vienna): Sudeti a GER, Zaolzie a POL, Felvidék a HUN, Praga e Bratislava a CZE
            eger.__resolve(2).o === 'GER' &&
            trautenau.__resolve(2).o === 'GER' &&
            boehmerwald.__resolve(2).o === 'GER' &&
            zaolzie.__resolve(2).o === 'POL' &&
            felKosice.__resolve(2).o === 'HUN' &&
            praha.__resolve(2).o === 'CZE' &&
            bratislava.__resolve(2).o === 'CZE' &&
            ruthNorth.__resolve(2).o === 'CZE' &&
            // Step 3 (Marzo 1939): Protettorato a GER, Slovacchia a SLO, Rutenia intera a HUN, Zaolzie a POL
            praha.__resolve(3).o === 'GER' &&
            bratislava.__resolve(3).o === 'SLO' &&
            ruthNorth.__resolve(3).o === 'HUN' &&
            zaolzie.__resolve(3).o === 'POL' &&
            // Step 5 (Settembre 1939): Invasione Polonia -> Zaolzie a GER
            zaolzie.__resolve(5).o === 'GER'
          );
        },
      },
      {
        name: 'Geometrie di Precisione: Danzica, Memelland, Zara, Carnaro, Panama e Monte Ararat',
        run: () =>
          DANZIG_FREE_CITY_FEATURE.__resolve(0).o === 'DANZIG' &&
          DANZIG_FREE_CITY_FEATURE.__resolve(4).o === 'DANZIG' &&
          DANZIG_FREE_CITY_FEATURE.__resolve(5).o === 'GER' &&
          MEMEL_TERRITORY_FEATURE.__resolve(0).o === 'LIT' &&
          MEMEL_TERRITORY_FEATURE.__resolve(2).o === 'LIT' &&
          MEMEL_TERRITORY_FEATURE.__resolve(3).o === 'GER' &&
          ZARA_ENCLAVE_FEATURE.__resolve(0).o === 'ITA' &&
          ZADAR_DALMATIA_FEATURE.__resolve(0).o === 'YUG' &&
          FIUME_CARNARO_FEATURE.__resolve(0).o === 'ITA' &&
          CROATIAN_LITTORAL_FEATURE.__resolve(0).o === 'YUG' &&
          PANAMA_CANAL_ZONE_FEATURE.__resolve(0).o === 'USA' &&
          TURKEY_MOUNT_ARARAT_FEATURE.__resolve(0).o === 'TUR',
      },
      {
        name: 'Confine Italo-Jugoslavo (Trattati di Rapallo e Roma: Istria, Venezia Giulia, Zara e Carnaro)',
        run: () =>
          // Istria (Pola HR036) e Litorale Sloveno (Capodistria SI044, Gorizia SI043) -> ITA
          resolveFeature({ properties: { CNTR_CODE: 'HR', NUTS_ID: 'HR036', NAME: 'Istarska' } }, 0).o === 'ITA' &&
          resolveFeature({ properties: { CNTR_CODE: 'SI', NUTS_ID: 'SI044', NAME: 'Obalno-kraska' } }, 0).o === 'ITA' &&
          resolveFeature({ properties: { CNTR_CODE: 'SI', NUTS_ID: 'SI043', NAME: 'Goriska' } }, 0).o === 'ITA' &&
          resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITH44', NAME: 'Trieste' } }, 0).o === 'ITA' &&
          // Croazia continentale e Dalmazia -> YUG (con Fiume e Zara coperte dalle enclave dedicate)
          resolveFeature({ properties: { CNTR_CODE: 'HR', NUTS_ID: 'HR031', NAME: 'Primorsko-goranska' } }, 0).o === 'YUG' &&
          resolveFeature({ properties: { CNTR_CODE: 'HR', NUTS_ID: 'HR033', NAME: 'Zadarska' } }, 0).o === 'YUG' &&
          resolveFeature({ properties: { CNTR_CODE: 'HR', NUTS_ID: 'HR050', NAME: 'Grad Zagreb' } }, 0).o === 'YUG' &&
          resolveFeature({ properties: { CNTR_CODE: 'SI', NUTS_ID: 'SI041', NAME: 'Osrednjeslovenska' } }, 0).o === 'YUG' &&
          // Dinamica Banovina Hrvatska da agosto 1939 (Step 4+)
          resolveFeature({ properties: { CNTR_CODE: 'HR', NUTS_ID: 'HR050', NAME: 'Grad Zagreb' } }, 4).o === 'YUG',
      },
      {
        name: 'Confini Storici Finlandesi (Trattato di Tartu 1920 -> Trattato di Mosca 1940: Petsamo, Salla, Carelia)',
        run: () =>
          // Step 0-5 (1936 - Settembre 1939): Territori storici integralmente finlandesi (FIN)
          resolveFeature({ properties: { CNTR_CODE: 'FIN_PETSAMO', NAME: 'Petsamo District' } }, 0).o === 'FIN' &&
          resolveFeature({ properties: { CNTR_CODE: 'FIN_SALLA', NAME: 'Salla Alakurtti District' } }, 0).o === 'FIN' &&
          resolveFeature({ properties: { CNTR_CODE: 'FIN_SALLA', NAME: 'Koutero District' } }, 0).o === 'FIN' &&
          resolveFeature({ properties: { CNTR_CODE: 'FIN_KARELIA', NAME: 'Vyborgsky District' } }, 0).o === 'FIN' &&
          resolveFeature({ properties: { CNTR_CODE: 'FIN_KARELIA', NAME: 'Käkisalmi District' } }, 0).o === 'FIN' &&
          resolveFeature({ properties: { CNTR_CODE: 'FIN_KARELIA', NAME: 'Sortavala District' } }, 0).o === 'FIN' &&
          resolveFeature({ properties: { CNTR_CODE: 'FIN_PETSAMO', NAME: 'Petsamo District' } }, 5).o === 'FIN' &&
          resolveFeature({ properties: { CNTR_CODE: 'FIN_KARELIA', NAME: 'Vyborgsky District' } }, 5).o === 'FIN' &&
          // Step 6 (Giugno 1940 post-Trattato di Mosca marzo 1940): Carelia e Salla all'URSS (SOV), Petsamo alla Finlandia (FIN)
          resolveFeature({ properties: { CNTR_CODE: 'FIN_PETSAMO', NAME: 'Petsamo District' } }, 6).o === 'FIN' &&
          resolveFeature({ properties: { CNTR_CODE: 'FIN_KARELIA', NAME: 'Vyborgsky District' } }, 6).o === 'SOV' &&
          resolveFeature({ properties: { CNTR_CODE: 'FIN_KARELIA', NAME: 'Käkisalmi District' } }, 6).o === 'SOV' &&
          resolveFeature({ properties: { CNTR_CODE: 'FIN_SALLA', NAME: 'Salla Alakurtti District' } }, 6).o === 'SOV',
      },
      {
        name: 'Possedimento Isole Italiane dell\'Egeo (Dodecaneso EL421 -> ITA, Cicladi EL422 -> GRE)',
        run: () =>
          resolveFeature({ properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL421', NAME: 'Rodos' } }, 0).o === 'ITA' &&
          resolveFeature({ properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL421', NAME: 'Kalymnos' } }, 0).o === 'ITA' &&
          resolveFeature({ properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL422', NAME: 'Naxos' } }, 0).o === 'GRE' &&
          resolveFeature({ properties: { CNTR_CODE: 'GR', NUTS_ID: 'EL421', NAME: 'Dodecanese' } }, 0).o === 'ITA' &&
          resolveHB({ properties: { NAME: 'Dodecanese' } }, 0).o === 'ITA' &&
          resolveHB({ properties: { NAME: 'Rhodes' } }, 0).o === 'ITA',
      },
      {
        name: 'Annessione Sovietica Stati Baltici (EE, LV, LT 1936-39 Neutrali -> SOV nel Giu 1940)',
        run: () =>
          resolveFeature({ properties: { CNTR_CODE: 'EE', NUTS_ID: 'EE001', NAME: 'Tallinn' } }, 0).o === 'EST' &&
          resolveFeature({ properties: { CNTR_CODE: 'LV', NUTS_ID: 'LV001', NAME: 'Riga' } }, 0).o === 'LAT' &&
          resolveFeature({ properties: { CNTR_CODE: 'LT', NUTS_ID: 'LT021', NAME: 'Kaunas' } }, 0).o === 'LIT' &&
          resolveFeature({ properties: { CNTR_CODE: 'EE', NUTS_ID: 'EE001', NAME: 'Tallinn' } }, 6).o === 'SOV' &&
          resolveFeature({ properties: { CNTR_CODE: 'LV', NUTS_ID: 'LV001', NAME: 'Riga' } }, 6).o === 'SOV' &&
          resolveFeature({ properties: { CNTR_CODE: 'LT', NUTS_ID: 'LT021', NAME: 'Kaunas' } }, 6).o === 'SOV',
      },
      {
        name: 'Cessione Bessarabia e Bucovina Settentrionale (ROM 1936-39 -> SOV nel Giu 1940)',
        run: () =>
          resolveFeature({ properties: { CNTR_CODE: 'MD', NUTS_ID: 'MD', NAME: 'Chisinau' } }, 0).o === 'ROM' &&
          resolveFeature({ properties: { CNTR_CODE: 'RO_BES', NUTS_ID: 'RO_BES', NAME: 'Bessarabia' } }, 0).o === 'ROM' &&
          resolveFeature({ properties: { CNTR_CODE: 'RO_BUK', NUTS_ID: 'RO_BUK', NAME: 'Cernauti' } }, 0).o === 'ROM' &&
          resolveFeature({ properties: { CNTR_CODE: 'MD', NUTS_ID: 'MD', NAME: 'Chisinau' } }, 6).o === 'SOV' &&
          resolveFeature({ properties: { CNTR_CODE: 'RO_BES', NUTS_ID: 'RO_BES', NAME: 'Bessarabia' } }, 6).o === 'SOV' &&
          resolveFeature({ properties: { CNTR_CODE: 'RO_BUK', NUTS_ID: 'RO_BUK', NAME: 'Cernauti' } }, 6).o === 'SOV',
      },
      {
        name: 'Confine Romeno-Bulgaro: Dobrugia Meridionale / Cadrilater (ROM 1936-40)',
        run: () =>
          resolveFeature({ properties: { CNTR_CODE: 'BG', NUTS_ID: 'BG332', NAME: 'Dobrich' } }, 0).o === 'ROM' &&
          resolveFeature({ properties: { CNTR_CODE: 'BG', NUTS_ID: 'BG325', NAME: 'Silistra' } }, 0).o === 'ROM' &&
          resolveFeature({ properties: { CNTR_CODE: 'BG', NUTS_ID: 'BG323', NAME: 'Ruse' } }, 0).o === 'BUL' &&
          resolveFeature({ properties: { CNTR_CODE: 'BG', NUTS_ID: 'BG331', NAME: 'Varna' } }, 0).o === 'BUL' &&
          resolveFeature({ properties: { CNTR_CODE: 'BG', NUTS_ID: 'BG332', NAME: 'Dobrich' } }, 6).o === 'ROM' &&
          resolveFeature({ properties: { CNTR_CODE: 'BG', NUTS_ID: 'BG325', NAME: 'Silistra' } }, 6).o === 'ROM',
      },
      {
        name: 'Confini Polacchi Orientali (Kresy Wschodnie & Regione di Wilno)',
        run: () =>
          // Step 0-4: Kresy Powiats integralmente polacchi
          resolveFeature({ properties: { CNTR_CODE: 'PL', NUTS_ID: 'PL_KRESY_BREST', NAME: 'Brześć nad Bugiem', REGION_KIND: 'POLISH_EASTERN_POWIAT' } }, 0).o === 'POL' &&
          resolveFeature({ properties: { CNTR_CODE: 'PL', NUTS_ID: 'PL_KRESY_GRODNO', NAME: 'Grodno', REGION_KIND: 'POLISH_EASTERN_POWIAT' } }, 0).o === 'POL' &&
          resolveFeature({ properties: { CNTR_CODE: 'PL', NUTS_ID: 'PL_KRESY_LTU_VILNIUS', NAME: 'Wilno', REGION_KIND: 'POLISH_EASTERN_POWIAT' } }, 0).o === 'POL' &&
          // Step 5 (Settembre 1939): Wilno ceduta a Lituania, resto dei Kresy occupato da URSS
          resolveFeature({ properties: { CNTR_CODE: 'PL', NUTS_ID: 'PL_KRESY_LTU_VILNIUS', NAME: 'Wilno', REGION_KIND: 'POLISH_EASTERN_POWIAT' } }, 5).o === 'LIT' &&
          resolveFeature({ properties: { CNTR_CODE: 'PL', NUTS_ID: 'PL_KRESY_BREST', NAME: 'Brześć nad Bugiem', REGION_KIND: 'POLISH_EASTERN_POWIAT' } }, 5).o === 'SOV' &&
          // Step 6 (Giugno 1940): Tutta la Lituania e i Kresy annessi all'URSS
          resolveFeature({ properties: { CNTR_CODE: 'PL', NUTS_ID: 'PL_KRESY_LTU_VILNIUS', NAME: 'Wilno', REGION_KIND: 'POLISH_EASTERN_POWIAT' } }, 6).o === 'SOV' &&
          resolveFeature({ properties: { CNTR_CODE: 'PL', NUTS_ID: 'PL_KRESY_BREST', NAME: 'Brześć nad Bugiem', REGION_KIND: 'POLISH_EASTERN_POWIAT' } }, 6).o === 'SOV',
      },
      {
        name: 'Integrità Frontiera Sino-Sovietica e Manciukuò (1936-1940)',
        run: () =>
          resolveFeature({ properties: { NUTS_ID: 'CHN_XINJIANG', NAME: 'Xinjiang' } }, 0).o === 'XIN' &&
          resolveFeature({ properties: { NUTS_ID: 'CHN_HEILONGJIANG', NAME: 'Heilongjiang' } }, 0).o === 'MAN' &&
          resolveFeature({ properties: { NUTS_ID: 'CHN_MANCHUKUO_XINGAN_NORTH', NAME: 'Xing\'an North' } }, 0).o === 'MAN' &&
          resolveFeature({ properties: { NUTS_ID: 'SOV_ADM1_RUS_78_Primorsky_Krai', CNTR_CODE: 'SU', NAME: 'Primorsky Krai' } }, 0).o === 'SOV' &&
          resolveHB({ properties: { NAME: 'Mongolia' } }, 0).o === 'MON' &&
          resolveFeature({ properties: { id: 'SOV_ADM1_RUS_55_Tuva', NUTS_ID: 'SOV_ADM1_RUS_55_Tuva', CNTR_CODE: 'TUV', NAME: 'Tuva' } }, 0).o === 'TUV' &&
          resolveFeature({ properties: { id: 'SOV_ADM1_RUS_55_Tuva', NUTS_ID: 'SOV_ADM1_RUS_55_Tuva', CNTR_CODE: 'SU', NAME: 'Tuva' } }, 0).o === 'TUV' &&
          resolveHB({ properties: { NAME: 'Tannu Tuva' } }, 0).o === 'TUV',
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
    ];

    let passed = 0;
    tests.forEach((t) => {
      if (t.run()) passed++;
      else console.error('[TEST FALLITO]', t.name);
    });

    if (passed === tests.length) {
      addLog(`Diagnostica di sistema: ${passed}/${tests.length} test superati ✓`, 'ok');
    } else {
      addLog(
        `ATTENZIONE: ${tests.length - passed} test falliti! (Controlla i logs)`,
        'warn'
      );
    }
  }, [addLog]);



console.log('--- EXECUTING runSelfTests() FROM App.tsx ---');
runSelfTests();
