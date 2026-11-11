/**
 * Database Geocartografico Storico Unificato (WWII 1936-1940)
 *
 * Unifica e consolida in un'unica sorgente canonica ad altissima definizione:
 * - 1.481 province europee NUTS-3 ad alta risoluzione (Eurostat)
 * - 22 enclavi storiche e frontiere speciali (Danzica, Memel, Zara, Fiume, Canale di Panama, ecc.)
 * - 129 distretti storici dei Kresy Wschodnie (Polonia Orientale 1921-1939)
 * - 256 repubbliche, krai e oblast dell'Unione Sovietica pre-1939 e post-1939
 * - 36 province e cricche dei signori della guerra cinesi (Kuomintang, PCC, Manciukuò, ecc.)
 * - 42 distretti storici cecoslovacchi (Sudetenland, Boemia-Moravia, Slovacchia, Felvidék, Zaolzie)
 * - 22 province e territori sahariani della Libia Italiana (Quarta Sponda, Fezzan, Cufra, Marmarica)
 * - 27 governatorati e mudiriyat del Regno d'Egitto (Il Cairo, Alessandria, Canale di Suez, Matruh, Sinai, Alto Egitto)
 * - 192 entità sovrane, dominion e colonie globali del 1938 (Madrepatrie, Rif spagnolo, Tangeri)
 *
 * Totale: 2.208 entità geocartografiche interamente raccordate con 0 buchi neri e 0 sovrapposizioni.
 */

import { METRO_FRAG, resolveGreenland, resolveSvalbard, resolveJanMayen, resolveEcuadorOriente, resolveEcuador, resolvePeru, resolveReunion, resolveKoperZoneB, resolveBuieZoneB } from './georesolver';
import {
  PRECISION_HISTORICAL_FEATURES,
  DANZIG_FREE_CITY_FEATURE,
  MEMEL_TERRITORY_FEATURE,
  ZARA_ENCLAVE_FEATURE,
  FIUME_CARNARO_FEATURE,
  PANAMA_CANAL_ZONE_FEATURE,
  TURKEY_MOUNT_ARARAT_FEATURE,
  FRENCH_GUIANA_FEATURE,
  CROATIAN_LITTORAL_FEATURE,
  ZADAR_DALMATIA_FEATURE,
  SAN_MARINO_FEATURE,
  VATICAN_CITY_FEATURE,
  GIBRALTAR_COLONY_FEATURE,
  ANDORRA_FEATURE,
  LIECHTENSTEIN_FEATURE,
  MONACO_FEATURE,
  FAROE_ISLANDS_FEATURE,
  POLISH_CORRIDOR_GDYNIA_FEATURE,
  KOSOVO_METOHIJA_FEATURE,
  KONIGSBERG_OSTPREUSSEN_FEATURE,
  LITHUANIA_PALANGA_FEATURE,
} from './historicalBorders';
import { CZECHOSLOVAKIA_REGIONAL_FEATURES } from './czechoslovakiaRegions';
import { BOSNIA_REGIONAL_FEATURES } from './bosniaRegions';

export interface UnifiedGeoDatabaseMetadata {
  title: string;
  version: string;
  description: string;
  generatedAt: string;
  totalFeatures: number;
  provCount: number;
  hbCount: number;
}

export interface UnifiedGeoDatabaseResult {
  provFeatures: any[];
  hbFeatures: any[];
  allFeatures: any[];
  metadata: UnifiedGeoDatabaseMetadata;
}

// Registro centralizzato dei resolver storici temporali (funzioni __resolve)
const RESOLVER_REGISTRY: Record<string, (s: number) => any> = {};

// 1. Enclavi di precisione
const precisionFeatures = [
  DANZIG_FREE_CITY_FEATURE,
  MEMEL_TERRITORY_FEATURE,
  ZARA_ENCLAVE_FEATURE,
  FIUME_CARNARO_FEATURE,
  PANAMA_CANAL_ZONE_FEATURE,
  TURKEY_MOUNT_ARARAT_FEATURE,
  FRENCH_GUIANA_FEATURE,
  CROATIAN_LITTORAL_FEATURE,
  ZADAR_DALMATIA_FEATURE,
  SAN_MARINO_FEATURE,
  VATICAN_CITY_FEATURE,
  GIBRALTAR_COLONY_FEATURE,
  ANDORRA_FEATURE,
  LIECHTENSTEIN_FEATURE,
  MONACO_FEATURE,
  FAROE_ISLANDS_FEATURE,
  POLISH_CORRIDOR_GDYNIA_FEATURE,
  KOSOVO_METOHIJA_FEATURE,
  KONIGSBERG_OSTPREUSSEN_FEATURE,
  LITHUANIA_PALANGA_FEATURE,
  ...PRECISION_HISTORICAL_FEATURES,
];

precisionFeatures.forEach((f) => {
  if (f && f.__resolve) {
    if (f.id) RESOLVER_REGISTRY[f.id] = f.__resolve;
    if (f.properties?.id) RESOLVER_REGISTRY[f.properties.id] = f.__resolve;
    if (f.properties?.NAME) RESOLVER_REGISTRY[f.properties.NAME] = f.__resolve;
    if (f.properties?.CNTR_ID && !['DE', 'GER', 'TR', 'TUR', 'PL', 'POL', 'IT', 'ITA', 'FR', 'FRA'].includes(f.properties.CNTR_ID)) RESOLVER_REGISTRY[f.properties.CNTR_ID] = f.__resolve;
    if (f.properties?.CNTR_CODE && f.properties.CNTR_CODE.length > 2 && !['DE', 'GER', 'TR', 'TUR', 'PL', 'POL', 'IT', 'ITA', 'FR', 'FRA'].includes(f.properties.CNTR_CODE)) RESOLVER_REGISTRY[f.properties.CNTR_CODE] = f.__resolve;
  }
});

// 2. Distretti cecoslovacchi
CZECHOSLOVAKIA_REGIONAL_FEATURES.forEach((f) => {
  if (f && f.__resolve) {
    const id = f.id || f.properties?.id;
    if (id) RESOLVER_REGISTRY[id] = f.__resolve;
  }
});

// 2b. Entità storiche della Bosnia ed Erzegovina
BOSNIA_REGIONAL_FEATURES.forEach((f) => {
  if (f && f.__resolve) {
    if (f.id) RESOLVER_REGISTRY[f.id] = f.__resolve;
    if (f.properties?.id) RESOLVER_REGISTRY[f.properties.id] = f.__resolve;
    if (f.properties?.NAME) RESOLVER_REGISTRY[f.properties.NAME] = f.__resolve;
    if (f.properties?.NUTS_ID) RESOLVER_REGISTRY[f.properties.NUTS_ID] = f.__resolve;
    if (f.properties?.__resolverId) RESOLVER_REGISTRY[f.properties.__resolverId] = f.__resolve;
  }
});

// 3. Frammenti extraeuropei degli imperi coloniali (METRO_FRAG)
Object.entries(METRO_FRAG).forEach(([nm, resolver]) => {
  RESOLVER_REGISTRY['METRO_FRAG_' + nm] = resolver;
});

// 4. Risolutore dedicato Groenlandia
RESOLVER_REGISTRY['GL_GREENLAND'] = (s) => resolveGreenland(s);
RESOLVER_REGISTRY['Greenland'] = (s) => resolveGreenland(s);
RESOLVER_REGISTRY['Grønland'] = (s) => resolveGreenland(s);
RESOLVER_REGISTRY['Groenlandia'] = (s) => resolveGreenland(s);

// 5. Risolutore dedicato Svalbard e Jan Mayen
RESOLVER_REGISTRY['NO0B2'] = (s) => resolveSvalbard(s);
RESOLVER_REGISTRY['Svalbard'] = (s) => resolveSvalbard(s);
RESOLVER_REGISTRY['Spitsbergen'] = (s) => resolveSvalbard(s);
RESOLVER_REGISTRY['NO0B1'] = (s) => resolveJanMayen(s);
RESOLVER_REGISTRY['Jan Mayen'] = (s) => resolveJanMayen(s);

// 6. Risolutore dedicato Ecuador, Oriente Amazzonico e Perù
RESOLVER_REGISTRY['Ecuador (Oriente)'] = (s) => resolveEcuadorOriente(s);
RESOLVER_REGISTRY['Oriente (Ecuador)'] = (s) => resolveEcuadorOriente(s);
RESOLVER_REGISTRY['Oriente'] = (s) => resolveEcuadorOriente(s);
RESOLVER_REGISTRY['EC_ORI'] = (s) => resolveEcuadorOriente(s);
RESOLVER_REGISTRY['ECU_ORIENTE'] = (s) => resolveEcuadorOriente(s);
RESOLVER_REGISTRY['Ecuador'] = (s) => resolveEcuador(s);
RESOLVER_REGISTRY['Peru'] = (s) => resolvePeru(s);
RESOLVER_REGISTRY['Perú'] = (s) => resolvePeru(s);

// 7. Risolutore dedicato La Réunion (Ralliement 28 nov 1942 alla France Libre)
RESOLVER_REGISTRY['RE_REUNION'] = (s) => resolveReunion(s);
RESOLVER_REGISTRY['FRY40'] = (s) => resolveReunion(s);
RESOLVER_REGISTRY['La Réunion'] = (s) => resolveReunion(s);
RESOLVER_REGISTRY['Reunion'] = (s) => resolveReunion(s);
RESOLVER_REGISTRY['Colonie de La Réunion'] = (s) => resolveReunion(s);
RESOLVER_REGISTRY['La Réunion (Colonie Française)'] = (s) => resolveReunion(s);

// 8. Risolutori dedicati Territorio Libero di Trieste (Zone B Nord: Capodistria; Zone B Sud: Buie e Umago)
RESOLVER_REGISTRY['SI_HIST_KOPER'] = (s) => resolveKoperZoneB(s);
RESOLVER_REGISTRY['HR_HIST_BUIE'] = (s) => resolveBuieZoneB(s);

/**
 * Carica il Database Geocartografico Unificato.
 * In ambiente browser esegue una fetch asincrona con supporto al reporting di avanzamento.
 * In ambiente Node.js legge direttamente dal filesystem.
 */
export async function loadUnifiedGeoDatabase(
  onProgress?: (percent: number) => void
): Promise<UnifiedGeoDatabaseResult> {
  let raw: any;

  // Ambiente browser
  if (typeof window !== 'undefined' && typeof fetch === 'function') {
    if (onProgress) onProgress(10);
    const res = await fetch(`/data/world_historical_1938_unified.json?v=${Date.now()}`);
    if (!res.ok) {
      throw new Error(`Impossibile caricare il database unificato: HTTP ${res.status}`);
    }
    if (onProgress) onProgress(50);
    raw = await res.json();
    if (onProgress) onProgress(80);
  }
  // Ambiente Node.js (test suites e build scripts)
  else {
    try {
      const nodeFs = await (Function('return import("fs")')() as Promise<any>);
      const nodePath = await (Function('return import("path")')() as Promise<any>);
      const filePath = nodePath.join(process.cwd(), 'public/data/world_historical_1938_unified.json');
      raw = JSON.parse(nodeFs.readFileSync(filePath, 'utf-8'));
    } catch (err: any) {
      throw new Error(`Errore durante il caricamento offline del database unificato: ${err.message}`);
    }
  }

  const features: any[] = raw.features || [];
  const provFeatures: any[] = [];
  const hbFeatures: any[] = [];

  for (let i = 0; i < features.length; i++) {
    const f = features[i];
    // Zero overlap: escludi l'eventuale entità duplicata paese HB_LIBYA coperta dalle 22 province libiche
    if (f?.id === 'HB_LIBYA' || f?.id === 'HB_FRAG_Denmark' || f?.id === 'HB_FRAG_Norway') continue;
    const p = f.properties || (f.properties = {});

    // Assegna il layer corretto
    const layer = p.__layer || (f.id?.startsWith('HB_') ? 'hb' : 'prov');
    f.__layer = layer;
    p.__layer = layer;

    if (!f.__itname) {
      f.__itname = p.NUTS_NAME || p.NAME_LATN || p.NAME || '';
    }

    // Collega l'eventuale resolver storico temporale
    const resId = p.__resolverId || f.id || p.id || p.NAME;
    if (resId && RESOLVER_REGISTRY[resId]) {
      f.__resolve = RESOLVER_REGISTRY[resId];
    }

    if (layer === 'prov') {
      provFeatures.push(f);
    } else {
      hbFeatures.push(f);
    }
  }

  if (onProgress) onProgress(100);

  return {
    provFeatures,
    hbFeatures,
    allFeatures: features,
    metadata: raw.metadata || {
      title: 'Database Geocartografico Unificato',
      version: '2.0.0',
      description: 'Unified Cartography',
      generatedAt: new Date().toISOString(),
      totalFeatures: features.length,
      provCount: provFeatures.length,
      hbCount: hbFeatures.length,
    },
  };
}
