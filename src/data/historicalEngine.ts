import { HISTORICAL_CITIES, getCityOwner } from '../components/TacticalMap';
import * as d3 from 'd3';
import { ResolvedTerritory, StatsStep } from '../types';
import { resolveFeature, resolveHB } from './georesolver';
import { isFrenchPacificProvince } from './frenchPacificProvinces';
import { getOwnerMeta } from './owners';
import { getExtendedToponym } from './historicalToponyms';
import { STEPS } from './historySteps';

/**
 * HISTORICAL CARTOGRAPHY BACKEND ENGINE
 * 
 * Pipeline automatizzata di elaborazione, normalizzazione geospaziale,
 * applicazione dei trattati storici (1936-1940), sanificazione topologica
 * ed eliminazione rigorosa di buchi neri e anomalie di sbordamento oceanico.
 */

// Heuristic lookup table for ISO / Country codes fallback to guarantee zero unassigned territories
export const ISO_COUNTRY_FALLBACKS: Record<string, { o: string; n: string }> = {
  GER: { o: 'GER', n: 'Reich Tedesco' },
  DEU: { o: 'GER', n: 'Reich Tedesco' },
  ITA: { o: 'ITA', n: 'Regno d\'Italia' },
  FRA: { o: 'FRA', n: 'Repubblica Francese' },
  GBR: { o: 'UK', n: 'Regno Unito' },
  POL: { o: 'POL', n: 'Polonia' },
  CZE: { o: 'CZE', n: 'Cecoslovacchia' },
  HUN: { o: 'HUN', n: 'Ungheria' },
  ROM: { o: 'ROM', n: 'Romania' },
  BUL: { o: 'BUL', n: 'Bulgaria' },
  GRE: { o: 'GRE', n: 'Grecia' },
  ALB: { o: 'ALB', n: 'Albania' },
  TUR: { o: 'TUR', n: 'Turchia' },
  SOV: { o: 'SOV', n: 'Unione Sovietica' },
  FIN: { o: 'FIN', n: 'Finlandia' },
  SWE: { o: 'SWE', n: 'Svezia' },
  NOR: { o: 'NOR', n: 'Norvegia' },
  DEN: { o: 'DEN', n: 'Danimarca' },
  HOL: { o: 'HOL', n: 'Paesi Bassi' },
  BEL: { o: 'BEL', n: 'Belgio' },
  LUX: { o: 'LUX', n: 'Lussemburgo' },
  IRE: { o: 'IRE', n: 'Irlanda' },
  ICE: { o: 'ICE', n: 'Islanda' },
  EST: { o: 'EST', n: 'Estonia' },
  LAT: { o: 'LAT', n: 'Lettonia' },
  LIT: { o: 'LIT', n: 'Lituania' },
  SWI: { o: 'SWI', n: 'Svizzera' },
  AUS: { o: 'AUS', n: 'Austria' },
  POR: { o: 'POR', n: 'Portogallo' },
  ESP: { o: 'SPR', n: 'Repubblica Spagnola' },
  SMR: { o: 'SMR', n: 'Serenissima Repubblica di San Marino' },
  VAT: { o: 'VAT', n: 'Stato della Città del Vaticano' },
  GIB: { o: 'GIB', n: 'Gibilterra' },
  LIE: { o: 'LIE', n: 'Principato del Liechtenstein' },
  IT: { o: 'ITA', n: 'Regno d\'Italia' },
  DE: { o: 'GER', n: 'Reich Tedesco' },
  FR: { o: 'FRA', n: 'Repubblica Francese' },
  GB: { o: 'UK', n: 'Regno Unito' },
  UK: { o: 'UK', n: 'Regno Unito' },
  ES: { o: 'SPR', n: 'Repubblica Spagnola' },
  PT: { o: 'POR', n: 'Portogallo' },
  CH: { o: 'SWI', n: 'Svizzera' },
  AT: { o: 'AUS', n: 'Austria' },
  PL: { o: 'POL', n: 'Polonia' },
  CS: { o: 'CZE', n: 'Cecoslovacchia' },
  CZ: { o: 'CZE', n: 'Cecoslovacchia' },
  SK: { o: 'CZE', n: 'Cecoslovacchia' },
  HU: { o: 'HUN', n: 'Ungheria' },
  RO: { o: 'ROM', n: 'Romania' },
  BG: { o: 'BUL', n: 'Bulgaria' },
  GR: { o: 'GRE', n: 'Grecia' },
  EL: { o: 'GRE', n: 'Grecia' },
  AL: { o: 'ALB', n: 'Albania' },
  YU: { o: 'YUG', n: 'Regno di Jugoslavia' },
  YUG: { o: 'YUG', n: 'Regno di Jugoslavia' },
  HR: { o: 'YUG', n: 'Jugoslavia (Croazia)' },
  SI: { o: 'YUG', n: 'Jugoslavia (Slovenia)' },
  BA: { o: 'YUG', n: 'Jugoslavia (Bosnia)' },
  ME: { o: 'YUG', n: 'Jugoslavia (Montenegro)' },
  RS: { o: 'YUG', n: 'Jugoslavia (Serbia)' },
  MK: { o: 'YUG', n: 'Jugoslavia (Macedonia)' },
  TR: { o: 'TUR', n: 'Turchia' },
  RU: { o: 'SOV', n: 'Unione Sovietica' },
  SU: { o: 'SOV', n: 'Unione Sovietica' },
  UA: { o: 'SOV', n: 'Unione Sovietica' },
  BY: { o: 'SOV', n: 'Unione Sovietica' },
  MD: { o: 'ROM', n: 'Romania (Bessarabia)' },
  FI: { o: 'FIN', n: 'Finlandia' },
  SE: { o: 'SWE', n: 'Svezia' },
  NO: { o: 'NOR', n: 'Norvegia' },
  DK: { o: 'DEN', n: 'Danimarca' },
  NL: { o: 'HOL', n: 'Paesi Bassi' },
  BE: { o: 'BEL', n: 'Belgio' },
  LU: { o: 'LUX', n: 'Lussemburgo' },
  IE: { o: 'IRE', n: 'Irlanda' },
  IS: { o: 'ICE', n: 'Islanda' },
  EE: { o: 'EST', n: 'Estonia' },
  LV: { o: 'LAT', n: 'Lettonia' },
  LT: { o: 'LIT', n: 'Lituania' },
  US: { o: 'USA', n: 'Stati Uniti d\'America' },
  USA: { o: 'USA', n: 'Stati Uniti d\'America' },
  CA: { o: 'CAN', n: 'Dominion del Canada' },
  CAN: { o: 'CAN', n: 'Dominion del Canada' },
  AU: { o: 'AST', n: 'Australia' },
  NZ: { o: 'NZL', n: 'Nuova Zelanda' },
  ZA: { o: 'SAF', n: 'Unione Sudafricana' },
  IN: { o: 'RAJ', n: 'Raj Britannico' },
  CN: { o: 'CHI', n: 'Repubblica di Cina' },
  JP: { o: 'JAP', n: 'Impero del Giappone' },
  BR: { o: 'BRA', n: 'Brasile' },
  AR: { o: 'ARG', n: 'Argentina' },
  CL: { o: 'CHL', n: 'Cile' },
  PE: { o: 'PRU', n: 'Perù' },
  CO: { o: 'COL', n: 'Colombia' },
  VE: { o: 'VEN', n: 'Venezuela' },
  MX: { o: 'MEX', n: 'Messico' },
  DZ: { o: 'F_NAF', n: 'Algeria Francese' },
  MA: { o: 'F_NAF', n: 'Marocco Francese' },
  TN: { o: 'F_NAF', n: 'Tunisia Francese' },
  EG: { o: 'EGY', n: 'Regno d\'Egitto' },
  LY: { o: 'ITA', n: 'Libia Italiana' },
  ET: { o: 'ETH', n: 'Impero d\'Etiopia' },
  SO: { o: 'ITA', n: 'Somalia Italiana' },
  IQ: { o: 'IRQ', n: 'Regno dell\'Iraq' },
  SA: { o: 'SAU', n: 'Arabia Saudita' },
  IR: { o: 'IRN', n: 'Impero dell\'Iran' },
  SY: { o: 'F_SYR', n: 'Mandato di Siria' },
  LB: { o: 'F_SYR', n: 'Grande Libano' },
  IL: { o: 'UK', n: 'Mandato di Palestina' },
  JO: { o: 'UK', n: 'Transgiordania' },
  AD: { o: 'AND', n: 'Principato d\'Andorra' },
  AND: { o: 'AND', n: 'Principato d\'Andorra' },
};

/**
 * 1. SANIFICAZIONE TOPOLOGICA E CONTROLLO SFERICO (Anti-Sbordamento Oceani)
 * Assicura che l'orientamento dei vertici (winding order) sia conforme e che
 * nessun poligono superi l'emisfero terrestre invertendo accidentalmente la terraferma col mare.
 */
export function sanitizeTopology(feature: any): void {
  if (!feature || !feature.geometry) return;
  const geom = feature.geometry;

  try {
    if (geom.type === 'Polygon') {
      const area = d3.geoArea(feature);
      if (area > 2 * Math.PI) {
        geom.coordinates = geom.coordinates.map((ring: any[]) => [...ring].reverse());
      }
    } else if (geom.type === 'MultiPolygon') {
      geom.coordinates = geom.coordinates.map((poly: any[]) => {
        const singlePoly = { type: 'Polygon', coordinates: poly };
        const area = d3.geoArea(singlePoly as any);
        if (area > 2 * Math.PI) {
          return poly.map((ring: any[]) => [...ring].reverse());
        }
        return poly;
      });
    }
  } catch (err) {
    // ignore
  }
}

/**
 * 2. MOTORE DI GUARIGIONE BUCHI NERI (Anti-Black Hole Heuristic Solver)
 * Interviene nel caso in cui una feature non trovi corrispondenza diretta nel georesolver
 * assegnandole il legittimo proprietario storico in base a coordinate, codici NUTS o affinità geopolitica.
 */
export function healOrphanTerritory(feature: any, step: number): ResolvedTerritory {
  const props = feature.properties || {};
  const nutsId = String(props.NUTS_ID || props.id || '').toUpperCase();
  const cntrCode = String(props.CNTR_CODE || props.CNTR_ID || props.country_code || '').toUpperCase();
  const name = String(props.NAME || props.NUTS_NAME || props.NAME_ENGL || props.NAME_LATN || '').trim();

  // Heuristic A: Prefix NUTS ID
  if (nutsId.length >= 2) {
    const prefix = nutsId.substring(0, 2);
    if (ISO_COUNTRY_FALLBACKS[prefix]) {
      const fb = ISO_COUNTRY_FALLBACKS[prefix];
      return {
        o: fb.o,
        name: name || fb.n,
        historicalContext: `${fb.n} (Riconciliazione Topologica NUTS ${prefix})`,
        fac: getOwnerMeta(fb.o).f,
      };
    }
  }

  // Heuristic B: ISO Country Code
  if (cntrCode && ISO_COUNTRY_FALLBACKS[cntrCode]) {
    const fb = ISO_COUNTRY_FALLBACKS[cntrCode];
    return {
      o: fb.o,
      name: name || fb.n,
      historicalContext: `${fb.n} (Riconciliazione ISO ${cntrCode})`,
      fac: getOwnerMeta(fb.o).f,
    };
  }

  // Heuristic C: Centroid spatial matching
  let cent = feature.__cent;
  if (!cent && feature.geometry) {
    try {
      cent = d3.geoCentroid(feature);
    } catch (e) {
      cent = [0, 0];
    }
  }

  if (cent && (cent[0] !== 0 || cent[1] !== 0)) {
    const [lon, lat] = cent;
    // Area Penisola Balcanica / Jugoslavia
    if (lon >= 13.5 && lon <= 23.0 && lat >= 40.5 && lat <= 46.8) {
      return { o: 'YUG', name: name || 'Jugoslavija', historicalContext: 'Kraljevina Jugoslavija', fac: 'Neutrale' };
    }
    // Penisola Iberica
    if (lon >= -10.0 && lon <= 3.5 && lat >= 35.8 && lat <= 44.0) {
      const isSpain = lon >= -9.0;
      return isSpain
        ? {
            o: step >= 3 ? 'SPA' : 'SPR',
            name: name || 'España',
            historicalContext: step >= 3 ? 'Estado Español (Franquista)' : 'Segunda República Española',
            fac: step >= 3 ? 'Neutrale' : 'Alleati',
          }
        : { o: 'POR', name: name || 'Portugal', historicalContext: 'República Portuguesa (Estado Novo)', fac: 'Neutrale' };
    }
    // Scandinavia
    if (lat >= 55.0 && lat <= 71.0) {
      if (lon >= 4.0 && lon <= 13.0) return { o: 'NOR', name: name || 'Norge', historicalContext: 'Kongeriket Norge', fac: 'Neutrale' };
      if (lon >= 11.0 && lon <= 24.0) return { o: 'SWE', name: name || 'Sverige', historicalContext: 'Konungariket Sverige', fac: 'Neutrale' };
      if (lon >= 20.0 && lon <= 32.0) return { o: 'FIN', name: name || 'Suomi', historicalContext: 'Suomen tasavalta', fac: 'Neutrale' };
    }
    // Europa Centro-Orientale / URSS
    if (lon >= 28.0 && lat >= 45.0 && lat <= 68.0) {
      return { o: 'SOV', name: name || 'SSSR', historicalContext: 'SSSR (Sojuz Sovetskih Socialističeskih Respublik)', fac: 'Comintern' };
    }
  }

  // Ultima ratio: Neutrale con toponimo originale
  return {
    o: 'NEU',
    name: name || 'Territorio Neutrale',
    historicalContext: 'Territorio sovrano non allineato',
    fac: 'Neutrale',
  };
}

/**
 * 3. RISOLUZIONE INTEGRATA DELLA VERITÀ STORICA
 * Combina georesolver, precisione geometrica e toponomastica dinamica con zero tolleranza per i buchi neri.
 */
export function resolveHistoricalTruth(feature: any, step: number): ResolvedTerritory {
  if (!feature) {
    return { o: 'NEU', name: 'Territorio Sconosciuto', fac: 'Neutrale' };
  }
  let resolved: ResolvedTerritory | null = null;

  // A. Funzione di risoluzione personalizzata (es. enclave di precisione)
  if (feature.__resolve) {
    resolved = feature.__resolve(step);
  }
  // B. Basemap storico HB
  else if (feature.__layer === 'hb') {
    resolved = resolveHB(feature, step);
  }
  // C. NUTS-3 / CNTR
  else {
    resolved = resolveFeature(feature, step);
  }

  // D. Verifica assenza buchi neri: se non risolto o non valido, guarisci automaticamente
  if (!resolved || !resolved.o || resolved.o === 'UNKNOWN' || resolved.o === '') {
    resolved = healOrphanTerritory(feature, step);
  }

  // E. Arricchimento toponomastico dinamico rigoroso (lingua dell'occupante/sovrano al tempo t)
  const p = feature.properties || {};
  const rawBaseName =
    p.HISTORICAL_NAME ||
    p.NAME_LATN ||
    p.NUTS_NAME ||
    p.CNTR_NAME ||
    p.NAME_ENGL ||
    p.NAME ||
    p.NAME_LONG ||
    p.ADMIN ||
    p.name ||
    feature.id ||
    resolved.name ||
    '';
  const nid = String(p.NUTS_ID || feature.id || p.CNTR_CODE || p.ISO_A2 || '');
  const cleanId = String(feature.id || p.id || nid || '').toUpperCase().trim();
  let cent = feature.__cent;
  if (!cent && feature.geometry) {
    try {
      cent = d3.geoCentroid(feature);
    } catch {
      cent = [0, 0];
    }
  }

  const isAlreadyGranular =
    Boolean(feature.__resolve) ||
    nid.startsWith('EE') ||
    nid.startsWith('LV') ||
    nid.startsWith('LT') ||
    p.CNTR_CODE === 'EE' ||
    p.CNTR_CODE === 'LV' ||
    p.CNTR_CODE === 'LT' ||
    nid.startsWith('PL_KRESY_') ||
    p.REGION_KIND === 'POLISH_EASTERN_POWIAT' ||
    nid.startsWith('EG') ||
    p.CNTR_CODE === 'EG' ||
    p.REGION_KIND === 'EGYPT_PROVINCE' ||
    p.SOVEREIGN === 'EGY' ||
    nid.startsWith('SYR_') ||
    p.CNTR_CODE === 'SYR' ||
    p.CNTR_CODE === 'SY' ||
    nid.startsWith('LB') ||
    p.CNTR_CODE === 'LEB' ||
    p.CNTR_CODE === 'LB' ||
    p.REGION_KIND === 'SYRIA_MANDATE_PROVINCE' ||
    p.REGION_KIND === 'LEBANON_MANDATE_PROVINCE' ||
    nid === 'TR631' ||
    p.NUTS_ID === 'TR631' ||
    p.ORIG_ID === 'TR631' ||
    p.REGION_KIND === 'HATAY_PROVINCE' ||
    nid === 'HAT' ||
    p.CNTR_CODE === 'HAT' ||
    p.NAME_LATN === 'Hatay' ||
    p.NUTS_NAME === 'Hatay' ||
    nid.startsWith('PAL_') ||
    p.CNTR_CODE === 'PAL' ||
    p.CNTR_CODE === 'PSE' ||
    p.CNTR_CODE === 'ISR' ||
    p.ORIG_ID === 'PSGZZ' ||
    p.ORIG_ID === 'PSWBK' ||
    p.ORIG_ID === 'ILD' ||
    p.ORIG_ID === 'ILZ' ||
    p.ORIG_ID === 'ILHA' ||
    p.ORIG_ID === 'ILM' ||
    p.ORIG_ID === 'ILJM' ||
    p.ORIG_ID === 'ILTA' ||
    p.REGION_KIND === 'PALESTINE_MANDATE_DISTRICT' ||

    nid.startsWith('IRN_') ||

    p.CNTR_CODE === 'IR' ||

    p.SOVEREIGN === 'IRN' ||

    p.REGION_KIND === 'IRAN_PROVINCE' ||
    p.REGION_KIND === 'PHILIPPINES_PROVINCE' ||
    p.REGION_KIND === 'INDONESIA_PROVINCE' ||
    p.REGION_KIND === 'TIMOR_LESTE' ||
    p.REGION_KIND === 'PNG_PROVINCE' ||
    p.REGION_KIND === 'MALAYSIA_STATE' ||
    p.REGION_KIND === 'MALAYSIA_PROVINCE' ||
    p.REGION_KIND === 'MALAYSIA_FEDERAL_TERRITORY' ||
    p.REGION_KIND === 'SINGAPORE_SETTLEMENT' ||
    p.REGION_KIND === 'JAPAN_PREFECTURE' ||
    p.REGION_KIND === 'KOREA_PROVINCE' ||
    p.REGION_KIND === 'RAJ_PROVINCE' ||
    p.REGION_KIND === 'ALGERIA_PROVINCE' ||
    p.REGION_KIND === 'US_MILITARY_BASE' ||
    p.REGION_KIND === 'GERMANY_PROVINCE' ||
    p.REGION_KIND === 'INDOCHINA_PROVINCE' ||
    p.REGION_KIND === 'FRENCH_PACIFIC_TERRITORY' ||
    cleanId === 'PF_POLYNESIA' ||
    cleanId.startsWith('PF_') ||
    cleanId === 'NC_CALEDONIA' ||
    cleanId === 'NH_HEBRIDES' ||
    cleanId === 'WF_WALLIS_FUTUNA' ||
    isFrenchPacificProvince(cleanId, rawBaseName) ||
    nid.startsWith('KH') ||
    nid.startsWith('LA') ||
    nid.startsWith('VN') ||
    p.CNTR_CODE === 'KH' ||
    p.CNTR_CODE === 'LA' ||
    p.CNTR_CODE === 'VN' ||
    nid.startsWith('DE') ||
    p.CNTR_CODE === 'GER' ||
    p.CNTR_CODE === 'DE' ||
    nid === 'DE_HIST_KONIGSBERG' ||
    nid === 'GER_KONIGSBERG' ||
    Boolean(p.HISTORICAL_NOTE);

  if (rawBaseName && !isAlreadyGranular) {
    const dynToponym = getExtendedToponym(rawBaseName, resolved.o, nid, cent, step);
    if (dynToponym && dynToponym.name && dynToponym.name !== rawBaseName) {
      resolved.name = dynToponym.name;
      if (dynToponym.adminTitle && !resolved.adminEntity) {
        resolved.adminEntity = dynToponym.adminTitle;
      }
      if (dynToponym.note && !resolved.note) {
        resolved.note = dynToponym.note;
        resolved.historicalContext = dynToponym.note;
      }
    }
  } else if (rawBaseName && (!resolved.adminEntity || !resolved.note)) {
    const dynToponym = getExtendedToponym(rawBaseName, resolved.o, nid, cent, step);
    if (dynToponym) {
      if (dynToponym.adminTitle && !resolved.adminEntity) {
        resolved.adminEntity = dynToponym.adminTitle;
      }
      if (dynToponym.note && !resolved.note) {
        resolved.note = dynToponym.note;
        resolved.historicalContext = dynToponym.note;
      }
    }
  }

  // Ensure note and historicalContext are synced
  if (!resolved.note && resolved.historicalContext) {
    resolved.note = resolved.historicalContext;
  }
  if (!resolved.historicalContext && resolved.note) {
    resolved.historicalContext = resolved.note;
  }

  // F. Assegnazione fazione coerente
  if (!resolved.fac) {
    resolved.fac = getOwnerMeta(resolved.o).f;
  }

  return resolved;
}

export interface PipelineResult {
  allFeatures: any[];
  provFeatures: any[];
  hbFeatures: any[];
  cntrFeatures: any[];
  stats: StatsStep[];
  diagnostics: {
    totalFeatures: number;
    blackHolesFixed: number;
    topologiesSanitized: number;
    stepsAnalyzed: number;
  };
}

/**
 * 4. PIPELINE GENERALE DI ELABORAZIONE E VERIFICA BACKEND
 * Esegue su tutti i layer geospaziali la sanitizzazione topologica, il calcolo del baricentro,
 * la risoluzione della verità storica sui 7 step e l'aggregazione statistica.
 */

// Funzione per il calcolo dell'area geodetica sferica in km² (formula di Girard / integrale di linea su ellissoide sferico)
function ringArea(coords: number[][]): number {
  const n = coords.length;
  if (n < 3) return 0.0;
  let area = 0.0;
  const d2r = Math.PI / 180.0;
  for (let i = 0; i < n - 1; i++) {
    const p1 = coords[i];
    const p2 = coords[i + 1];
    const lam1 = p1[0] * d2r;
    const phi1 = p1[1] * d2r;
    const lam2 = p2[0] * d2r;
    const phi2 = p2[1] * d2r;
    area += (lam2 - lam1) * (2.0 + Math.sin(phi1) + Math.sin(phi2));
  }
  area = Math.abs(area) / 2.0;
  if (area > 2 * Math.PI) area = 4 * Math.PI - area;
  return area;
}

export function calculateGeodesicAreaKm2(geom: any): number {
  if (!geom) return 0;
  const gtype = geom.type;
  const coords = geom.coordinates;
  const R = 6371.0;
  let steradians = 0;
  if (gtype === 'Polygon') {
    if (coords && coords.length > 0) {
      const ext = ringArea(coords[0]);
      let holes = 0;
      for (let i = 1; i < coords.length; i++) holes += ringArea(coords[i]);
      steradians = Math.max(0, ext - holes);
    }
  } else if (gtype === 'MultiPolygon') {
    if (coords) {
      for (const poly of coords) {
        if (poly && poly.length > 0) {
          const ext = ringArea(poly[0]);
          let holes = 0;
          for (let i = 1; i < poly.length; i++) holes += ringArea(poly[i]);
          steradians += Math.max(0, ext - holes);
        }
      }
    }
  }
  return steradians * R * R;
}

// Stime demografiche storiche autentiche 1938-1942 (in milioni di abitanti)
export const HISTORICAL_POP_MILLIONS: Record<string, number> = {
  GER: 79.5,
  SOV: 188.0,
  USA: 132.1,
  UK: 47.8,
  JAP: 72.8,
  FRA: 41.9,
  ITA: 44.4,
  CHI: 260.0,
  CHI_WANG: 160.0,
  CCP_CHI: 25.0,
  MAN: 38.0,
  MEN: 5.5,
  KOR: 24.0,
  TWN: 5.8,
  RAJ: 382.0,
  CAN: 11.5,
  AST: 7.0,
  NZL: 1.6,
  SAF: 10.2,
  EGY: 16.5,
  IRQ: 4.2,
  IRN: 14.5,
  PER: 14.5,
  TUR: 17.5,
  BRA: 42.0,
  MEX: 19.8,
  ARG: 14.0,
  SPA: 25.5,
  SPR: 25.5,
  POR: 7.6,
  SWE: 6.3,
  SWI: 4.2,
  IRE: 3.0,
  POL: 35.1,
  FIN: 3.7,
  ROM: 19.9,
  HUN: 9.1,
  BUL: 6.3,
  YUG: 15.4,
  GRE: 7.2,
  ALB: 1.1,
  BEL: 8.4,
  HOL: 8.7,
  DEN: 3.8,
  NOR: 3.0,
  THA: 15.0,
  SIA: 15.0,
  BUR: 16.0,
  PHL: 16.0,
  HOL_IND: 68.5,
  F_INDO: 24.5,
  F_AOF: 15.0,
  VIC_AOF: 15.0,
  F_AEF: 3.5,
  VIC_AEF: 3.5,
  FFL_AEF: 3.5,
  F_NAF: 16.5,
  VIC_NAF: 16.5,
  VIC: 40.0,
  ETH: 14.0,
  AOI: 16.0,
  LIBYA: 0.9,
  BEL_CONGO: 10.5,
  MALAYA: 5.5,
  MON: 0.8,
  TUV: 0.1,
  AFG: 11.0,
  SAU: 3.5,
  YEM: 3.0,
  CHL: 5.0,
  COL: 8.7,
  PERU: 6.9,
  VEN: 3.8,
  BOL: 2.7,
  PRY: 1.0,
  URY: 2.1,
  ECU: 2.4,
  CUB: 4.2,
  DOM: 1.6,
  HAI: 2.7,
  GTM: 2.2,
  HND: 1.1,
  SLV: 1.7,
  NIC: 0.9,
  CRI: 0.6,
  PAN: 0.6,
  OMN: 0.6,
  TIB: 2.5,
  SUD: 6.5,
  KEN: 4.5,
  UGA: 3.8,
  TZA: 5.2,
  NGA: 20.0,
  GHA: 3.7,
  ANG: 3.7,
  MOZ: 5.0,
  MDG: 3.9,
  SMR: 0.01,
  VAT: 0.001,
  AND: 0.005,
  MCO: 0.02,
  LIE: 0.01,
  DANZIG: 0.4,
};

export function processHistoricalCartographyPipeline(
  provs: any[],
  hbs: any[],
  cntrs: any[],
  isHB: boolean
): PipelineResult {
  let blackHolesFixed = 0;
  let topologiesSanitized = 0;

  const all = provs.concat(isHB ? hbs : cntrs);
  const newStats: StatsStep[] = [];
  for (let s = 0; s < STEPS.length; s++) {
    newStats.push({
      own: {},
      fac: {},
      ownArea: {},
      facArea: {},
      ownPop: {},
      facPop: {},
      ownCities: {},
      facCities: {},
    });
  }

  for (const f of all) {
    const p = f.properties || (f.properties = {});

    // 1. Sanificazione Topologica di sicurezza
    sanitizeTopology(f);
    topologiesSanitized++;

    // 2. Baricentro geospaziale (O(1) da metadata precalcolati)
    if (p.centroid && Array.isArray(p.centroid)) {
      f.__cent = p.centroid;
    } else {
      try {
        f.__cent = d3.geoCentroid(f);
        if (isNaN(f.__cent[0]) || isNaN(f.__cent[1])) {
          f.__cent = [0, 0];
        }
      } catch (e) {
        f.__cent = [0, 0];
      }
    }

    // 3. Risoluzione Verità Storica per tutti gli 11 passaggi
    const area = calculateGeodesicAreaKm2(f.geometry);
    f.__areaKm2 = area;
    f.__res = [];
    for (let s = 0; s < STEPS.length; s++) {
      const r = resolveHistoricalTruth(f, s);
      f.__res.push(r);

      if (r) {
        newStats[s].own[r.o] = (newStats[s].own[r.o] || 0) + 1;
        const fac = r.fac || getOwnerMeta(r.o).f;
        newStats[s].fac[fac] = (newStats[s].fac[fac] || 0) + 1;

        newStats[s].ownArea[r.o] = (newStats[s].ownArea[r.o] || 0) + area;
        newStats[s].facArea[fac] = (newStats[s].facArea[fac] || 0) + area;
      } else {
        blackHolesFixed++;
      }
    }
  }

  // Calcolo demografia e centri strategici per ciascuno step temporale
  for (let s = 0; s < STEPS.length; s++) {
    for (const o in newStats[s].ownArea) {
      const pop = HISTORICAL_POP_MILLIONS[o] || 1.5;
      newStats[s].ownPop[o] = pop;
      const fac = getOwnerMeta(o).f;
      newStats[s].facPop[fac] = (newStats[s].facPop[fac] || 0) + pop;
    }
  }

  HISTORICAL_CITIES.forEach((city) => {
    for (let s = 0; s < STEPS.length; s++) {
      const owner = getCityOwner(city, s);
      if (owner) {
        newStats[s].ownCities![owner] = (newStats[s].ownCities![owner] || 0) + 1;
        const fac = getOwnerMeta(owner).f;
        newStats[s].facCities![fac] = (newStats[s].facCities![fac] || 0) + 1;
      }
    }
  });

  return {
    allFeatures: all,
    provFeatures: provs,
    hbFeatures: hbs,
    cntrFeatures: cntrs,
    stats: newStats,
    diagnostics: {
      totalFeatures: all.length,
      blackHolesFixed,
      topologiesSanitized,
      stepsAnalyzed: STEPS.length,
    },
  };
}
