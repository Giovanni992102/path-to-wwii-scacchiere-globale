import * as d3 from 'd3';
import { FactionType, OwnerConfig, StatsStep } from '../types';
import { STEPS } from './historySteps';
import {
  canonicalizeOwnerCode,
  formatHierarchyBadge,
  getEmpireMembers,
  getOverlord,
  getOwnerMeta,
  getPoliticalTierLabel,
  getRootSovereign,
  getSubjects,
} from './owners';
import { resolveHistoricalFlag } from './historicalFlags';
import { HistoricalFlagMetadata } from './historicalFlagResolver';
import { getOwnerMembershipsAtStep, InternationalOrganization, MemberRole, ResolvedOrgState } from './internationalOrganizations';
import { HISTORICAL_BATTLES, HistoricalBattle } from './historicalBattles';
import { getCityIsCapital, getCityOwner, HISTORICAL_CITIES, HistoricalCity } from '../components/TacticalMap';
import { getChronologicalFactionLabel } from '../components/IntelligencePanel';

export interface StateFormSummary {
  regimeType: string;
  tierLabel: string;
  sovereigntyStatus: string;
}

export interface CountryKpiBlock {
  areaKm2: number;
  areaGlobalPct: number;
  popMillions: number;
  popGlobalPct: number;
  densityPerKm2: number;
  provincesCount: number;
  citiesCount: number;
  deltaAreaPct: number | null;
  deltaPopPct: number | null;
  globalAreaRank: number | null;
  globalPopRank: number | null;
}

export interface CountryEmpireKpis {
  areaKm2: number;
  areaGlobalPct: number;
  popMillions: number;
  popGlobalPct: number;
  provincesCount: number;
  citiesCount: number;
  subjectsCount: number;
}

export interface CountrySubjectSummary {
  code: string;
  name: string;
  tierLabel: string;
  areaKm2: number;
  popMillions: number;
  citiesCount: number;
}

export interface CountryTerritoryItem {
  id: string;
  name: string;
  modernName: string;
  adminEntity?: string;
  areaKm2: number;
  centroid?: [number, number];
  featureRef: any;
}

export interface CountryCityItem {
  id: string;
  name: string;
  historicalName: string;
  coords: [number, number];
  isCapital: boolean;
}

export interface CountryTimelinePoint {
  step: number;
  dateLabel: string;
  areaKm2: number;
  popMillions: number;
  citiesCount: number;
  label: string;
  faction: FactionType;
  flagEntityId: string | null;
}

export interface CountryTransitionItem {
  step: number;
  dateLabel: string;
  label: string;
  faction: FactionType;
  tierLabel: string;
  flagEntityId: string | null;
  reason: string;
}

export interface CountryProfileData {
  code: string;
  displayFlagCode: string;
  autonomousFlagTitle: string | null;
  meta: OwnerConfig;
  officialName: string;
  faction: FactionType;
  factionChronoLabel: { short: string; full: string };
  stateForm: StateFormSummary;
  hierarchyBadge: string | null;
  overlord: OwnerConfig | null;
  rootSovereign: OwnerConfig;
  flagMeta: HistoricalFlagMetadata | null;
  kpis: CountryKpiBlock;
  empireKpis: CountryEmpireKpis | null;
  subjects: CountrySubjectSummary[];
  topTerritories: CountryTerritoryItem[];
  cities: CountryCityItem[];
  primaryFocusCoords: [number, number] | null;
  orgs: { org: InternationalOrganization; state: ResolvedOrgState; role: MemberRole }[];
  battles: HistoricalBattle[];
  timelineSeries: CountryTimelinePoint[];
  transitions: CountryTransitionItem[];
}

const AUTONOMOUS_DISPLAY_ALIASES: Record<string, { sovereign: string; title: string }> = {
  EGY_LIB_1953: {
    sovereign: 'EGY',
    title: "Bandiera della Liberazione (Alam al-Tahrir — Repubblica d'Egitto)",
  },
  ERI_1952: {
    sovereign: 'ETH',
    title: "Bandiera della Regione Autonoma Federata dell'Eritrea",
  },
  PRI_1952: {
    sovereign: 'USA',
    title: 'Bandiera dello Stato Libero Associato di Porto Rico',
  },
  AX_1954: {
    sovereign: 'FIN',
    title: 'Bandiera Ufficiale della Provincia Autonoma delle Isole Åland (3 Aprile 1954)',
  },
  FO_1940: {
    sovereign: 'UK',
    title: 'Merkið — Bandiera delle Isole Fær Øer (Riconosciuta il 25 Aprile 1940)',
  },
  SYR_MANDATE_1932: {
    sovereign: 'F_SYR',
    title: 'Bandiera della Repubblica di Siria sotto Mandato Francese (1932–1946)',
  },
  LEB_MANDATE_1920: {
    sovereign: 'F_SYR',
    title: 'Bandiera dello Stato del Grande Libano (Mandato Francese, 1920–1943)',
  },
  MAR_1915: {
    sovereign: 'F_NAF',
    title: 'Bandiera del Protettorato Francese del Marocco (1915–1956)',
  },
  TUN_1831: {
    sovereign: 'F_NAF',
    title: 'Bandiera del Protettorato Francese di Tunisia (Reggenza di Tunisi)',
  },
  CAM_1863: {
    sovereign: 'F_IND',
    title: 'Bandiera del Protettorato Francese di Cambogia (1863–1953)',
  },
  LAO_1893: {
    sovereign: 'F_IND',
    title: 'Bandiera del Protettorato Francese del Laos (Regno di Luang Prabang, 1893–1953)',
  },
  ANNAM_1920: {
    sovereign: 'F_IND',
    title: "Bandiera del Protettorato dell'Annam — Long Tinh Kỳ (1920–1945)",
  },
  PAL_MANDATE_1927: {
    sovereign: 'UK',
    title: 'Palestina sotto Mandato Britannico — Red Ensign (1927–1948)',
  },
  JOR_1928: {
    sovereign: 'UK',
    title: 'Emirato di Transgiordania sotto Mandato Britannico (1928–1946)',
  },
  CYP_1922: {
    sovereign: 'UK',
    title: 'Colonia della Corona di Cipro — Blue Ensign (1922–1960)',
  },
  MLT_1923: {
    sovereign: 'UK',
    title: 'Colonia della Corona di Malta (1923–1943)',
  },
  HKG_1876: {
    sovereign: 'UK',
    title: 'Colonia della Corona di Hong Kong (1876–1955)',
  },
  STRAITS_1925: {
    sovereign: 'UK',
    title: 'Insediamenti dello Stretto — Straits Settlements (1925–1946)',
  },
  SARAWAK_1870: {
    sovereign: 'UK',
    title: 'Regno di Sarawak (Protettorato Britannico, Raja Brooke)',
  },
  NORTH_BORNEO_1902: {
    sovereign: 'UK',
    title: 'Borneo Settentrionale Britannico — BNBC (1902–1946)',
  },
  SRHOD_1924: {
    sovereign: 'UK',
    title: 'Colonia Autonoma della Rhodesia Meridionale (1924–1953)',
  },
  NFLD_1904: {
    sovereign: 'UK',
    title: 'Dominion di Terranova — Red Ensign (1904–1949)',
  },
};

function resolveCityHistoricalTitle(city: HistoricalCity, step: number): string {
  if (!city.historicalNames) return city.name;
  for (let s = step; s >= 0; s--) {
    const key = `step${s}`;
    if (city.historicalNames[key]) return city.historicalNames[key];
  }
  return city.historicalNames.default || city.name;
}

function getFeatureApproxAreaKm2(f: any): number {
  if (typeof f?.__areaKm2 === 'number' && Number.isFinite(f.__areaKm2)) {
    return f.__areaKm2;
  }
  let area = 0;
  try {
    area = Math.round(d3.geoArea(f) * 6371 * 6371);
  } catch {
    area = 0;
  }
  if (f && typeof f === 'object') {
    f.__areaKm2 = area;
  }
  return area;
}

/**
 * Classifies historical form of state and government using canonical tier,
 * chronological official denomination, and leader metadata.
 */
export function deriveStateFormSummary(
  _ownerCode: string,
  _step: number,
  meta: OwnerConfig
): StateFormSummary {
  const tierLabel = getPoliticalTierLabel(meta.tier);
  const official = `${meta.l(_step)} ${meta.leader || ''}`.toLowerCase();

  let regimeType = tierLabel;
  if (meta.tier === 'colony') {
    regimeType = 'Colonia / Possedimento Oltremare';
  } else if (meta.tier === 'protectorate') {
    regimeType = 'Protettorato sotto Tutela';
  } else if (meta.tier === 'mandate') {
    regimeType = 'Mandato Internazionale';
  } else if (meta.tier === 'dominion') {
    regimeType = 'Dominion Parlamentare del Commonwealth';
  } else if (meta.tier === 'condominium') {
    regimeType = 'Condominio Congiunto';
  } else if (meta.tier === 'international') {
    regimeType = official.includes('militare') || official.includes('amg') || official.includes('vuja')
      ? 'Zona d’Amministrazione Militare / TLT'
      : 'Territorio a Statuto Internazionale';
  } else if (meta.tier === 'puppet') {
    regimeType = official.includes('repubblica sociale') || official.includes('repubblica')
      ? 'Repubblica Collaborazionista / Satellite'
      : official.includes('impero') || official.includes('regno') || official.includes('manciukuò')
      ? 'Monarchia Cliente / Regime Collaborazionista'
      : 'Governo Collaborazionista / Stato Cliente';
  } else if (meta.tier === 'satellite') {
    regimeType = 'Repubblica Popolare / Stato Satellite';
  } else if (
    official.includes('urss') ||
    official.includes('repubblica popolare') ||
    official.includes('repubblica democratica tedesca') ||
    official.includes('demokratska federativna') ||
    official.includes('repubblica federativa popolare') ||
    official.includes('repubblica democratica del vietnam')
  ) {
    regimeType = 'Repubblica Socialista / Popolare';
  } else if (official.includes('reich') && official.includes('hitler')) {
    regimeType = 'Dittatura Totalitaria / Terzo Reich';
  } else if (
    official.includes('repubblica federale') ||
    official.includes('stati uniti d') ||
    official.includes('estados unidos') ||
    official.includes('confederazione')
  ) {
    regimeType = 'Repubblica Federale';
  } else if (official.includes('federazione')) {
    regimeType = 'Federazione Statuale';
  } else if (official.includes('repubblica')) {
    regimeType = official.includes('militare') || official.includes('colpo di stato') || official.includes('golpe')
      ? 'Repubblica sotto Regime Militare'
      : 'Repubblica Costituzionale / Parlamentare';
  } else if (official.includes('impero')) {
    regimeType = 'Impero / Monarchia Imperiale';
  } else if (official.includes('regno') || official.includes('granducato') || official.includes('principato') || official.includes('re ')) {
    regimeType = official.includes('zarato') || official.includes('scià') || official.includes('sultano')
      ? 'Monarchia / Corona Regnante'
      : 'Monarchia Costituzionale / Regno';
  } else if (official.includes('stato esp') || official.includes('estado novo') || official.includes('dittatura')) {
    regimeType = 'Stato Autoritario / Corporativo';
  } else if (official.includes('zona d') && official.includes('occupazione')) {
    regimeType = 'Amministrazione d’Occupazione Militare';
  }

  const sovereigntyStatus = meta.isSubject ? 'Entità Subordinata / Dipendente' : 'Sovranità Diretta';
  return {
    regimeType,
    tierLabel,
    sovereigntyStatus,
  };
}

function sumRecord(rec?: Record<string, number>): number {
  if (!rec) return 0;
  let total = 0;
  for (const v of Object.values(rec)) {
    total += Number(v) || 0;
  }
  return total;
}

function computeRank(rec: Record<string, number> | undefined, targetCode: string): number | null {
  if (!rec || (Number(rec[targetCode]) || 0) <= 0) return null;
  const targetVal = Number(rec[targetCode]) || 0;
  let rank = 1;
  for (const [k, v] of Object.entries(rec)) {
    if (k === 'NEU' || k === targetCode) continue;
    if ((Number(v) || 0) > targetVal) rank++;
  }
  return rank;
}

/**
 * Normalizes UI clicks (including autonomous ensign codes) into a canonical owner code
 * while keeping optional autonomous display flag info when applicable.
 */
export function resolveCanonicalCountryInput(rawCode: string, step: number): {
  code: string;
  displayFlagCode: string;
  autonomousFlagTitle: string | null;
} {
  const upper = (rawCode || 'NEU').trim().toUpperCase();
  const alias = AUTONOMOUS_DISPLAY_ALIASES[upper];
  if (alias) {
    return {
      code: canonicalizeOwnerCode(alias.sovereign, step),
      displayFlagCode: upper,
      autonomousFlagTitle: alias.title,
    };
  }
  const canon = canonicalizeOwnerCode(upper, step);
  return {
    code: canon,
    displayFlagCode: canon,
    autonomousFlagTitle: null,
  };
}

/**
 * Builds the complete Country Visualization dataset for a given entity at `step`.
 */
export function buildCountryProfile(
  rawCode: string,
  step: number,
  stats: StatsStep[],
  allFeatures: any[]
): CountryProfileData {
  const safeStep = Math.max(0, Math.min(STEPS.length - 1, step));
  const { code, displayFlagCode, autonomousFlagTitle } = resolveCanonicalCountryInput(rawCode, safeStep);
  const meta = getOwnerMeta(code, safeStep);
  const officialName = meta.l(safeStep);
  const faction = meta.f;
  const factionChronoLabel = getChronologicalFactionLabel(faction, safeStep);
  const stateForm = deriveStateFormSummary(code, safeStep, meta);
  const hierarchyBadge = formatHierarchyBadge(code, safeStep);
  const overlord = getOverlord(code, safeStep);
  const rootSovereign = getRootSovereign(code, safeStep);
  const flagMeta = resolveHistoricalFlag(displayFlagCode, safeStep) || resolveHistoricalFlag(code, safeStep);

  const curStats = stats[safeStep];
  const prevStats = safeStep > 0 ? stats[safeStep - 1] : undefined;

  const totalArea = curStats ? sumRecord(curStats.ownArea) : 148_940_000;
  const totalPop = curStats ? sumRecord(curStats.ownPop) : 2_000;

  const areaKm2 = curStats ? Number(curStats.ownArea?.[code]) || 0 : 0;
  const popMillions = curStats ? Number(curStats.ownPop?.[code]) || 0 : 0;
  const provincesCount = curStats ? Number(curStats.own?.[code]) || 0 : 0;
  const citiesCount = curStats ? Number(curStats.ownCities?.[code]) || 0 : 0;

  const prevArea = prevStats ? Number(prevStats.ownArea?.[code]) || 0 : 0;
  const prevPop = prevStats ? Number(prevStats.ownPop?.[code]) || 0 : 0;

  const deltaAreaPct =
    prevStats && prevArea > 0 ? ((areaKm2 - prevArea) / prevArea) * 100 : null;
  const deltaPopPct =
    prevStats && prevPop > 0 ? ((popMillions - prevPop) / prevPop) * 100 : null;

  const kpis: CountryKpiBlock = {
    areaKm2,
    areaGlobalPct: totalArea > 0 ? (areaKm2 / totalArea) * 100 : 0,
    popMillions,
    popGlobalPct: totalPop > 0 ? (popMillions / totalPop) * 100 : 0,
    densityPerKm2: areaKm2 > 0 ? (popMillions * 1_000_000) / areaKm2 : 0,
    provincesCount,
    citiesCount,
    deltaAreaPct,
    deltaPopPct,
    globalAreaRank: computeRank(curStats?.ownArea, code),
    globalPopRank: computeRank(curStats?.ownPop, code),
  };

  // Subordinate territories & combined imperial sphere
  const rawSubjects = getSubjects(code, safeStep);
  const subjects: CountrySubjectSummary[] = [];
  for (const subj of rawSubjects) {
    const sCode = subj.id || '';
    if (!sCode) continue;
    const sMeta = getOwnerMeta(sCode, safeStep);
    const sArea = curStats ? Number(curStats.ownArea?.[sCode]) || 0 : 0;
    const sPop = curStats ? Number(curStats.ownPop?.[sCode]) || 0 : 0;
    const sCities = curStats ? Number(curStats.ownCities?.[sCode]) || 0 : 0;
    const sProvs = curStats ? Number(curStats.own?.[sCode]) || 0 : 0;
    if (sArea <= 0 && sPop <= 0 && sProvs <= 0) continue;
    subjects.push({
      code: sCode,
      name: sMeta.l(safeStep),
      tierLabel: getPoliticalTierLabel(sMeta.tier),
      areaKm2: sArea,
      popMillions: sPop,
      citiesCount: sCities,
    });
  }
  subjects.sort((a, b) => b.areaKm2 - a.areaKm2);

  let empireKpis: CountryEmpireKpis | null = null;
  if (subjects.length > 0 && curStats) {
    const members = getEmpireMembers(code, safeStep);
    let impArea = 0;
    let impPop = 0;
    let impProvs = 0;
    let impCities = 0;
    for (const mCode of members) {
      impArea += Number(curStats.ownArea?.[mCode]) || 0;
      impPop += Number(curStats.ownPop?.[mCode]) || 0;
      impProvs += Number(curStats.own?.[mCode]) || 0;
      impCities += Number(curStats.ownCities?.[mCode]) || 0;
    }
    empireKpis = {
      areaKm2: impArea,
      areaGlobalPct: totalArea > 0 ? (impArea / totalArea) * 100 : 0,
      popMillions: impPop,
      popGlobalPct: totalPop > 0 ? (impPop / totalPop) * 100 : 0,
      provincesCount: impProvs,
      citiesCount: impCities,
      subjectsCount: subjects.length,
    };
  }

  // Provinces / territories owned at `safeStep`
  const matchedTerritories: CountryTerritoryItem[] = [];
  for (const f of allFeatures || []) {
    const res = f?.__res?.[safeStep];
    if (!res) continue;
    const rCode = canonicalizeOwnerCode(res.o, safeStep);
    if (rCode !== code) continue;
    const p = f.properties || {};
    const areaF = getFeatureApproxAreaKm2(f);
    matchedTerritories.push({
      id: String(f.id || p.id || p.NUTS_ID || p.CNTR_ID || ''),
      name: res.name || p.HISTORICAL_NAME || f.__itname || p.NAME || code,
      modernName: p.MODERN_NAME || p.NUTS_NAME || p.NAME_ENGL || p.CNTR_NAME || '',
      adminEntity: res.adminEntity,
      areaKm2: areaF,
      centroid: Array.isArray(f.__cent) ? f.__cent : undefined,
      featureRef: f,
    });
  }
  matchedTerritories.sort((a, b) => b.areaKm2 - a.areaKm2);
  const topTerritories = matchedTerritories.slice(0, 14);

  // Cities & capitals controlled at `safeStep`
  const cities: CountryCityItem[] = HISTORICAL_CITIES
    .filter((c) => canonicalizeOwnerCode(getCityOwner(c, safeStep), safeStep) === code)
    .map((c) => ({
      id: c.id,
      name: c.name,
      historicalName: resolveCityHistoricalTitle(c, safeStep),
      coords: c.coords,
      isCapital: getCityIsCapital(c, safeStep),
    }))
    .sort((a, b) => Number(b.isCapital) - Number(a.isCapital));

  const primaryFocusCoords: [number, number] | null =
    cities.find((c) => c.isCapital)?.coords ||
    cities[0]?.coords ||
    topTerritories[0]?.centroid ||
    null;

  // International organizations
  const orgs = getOwnerMembershipsAtStep(code, safeStep);

  // Related battles in current step (proximity to top territories/cities or explicit mention)
  const anchorPoints: [number, number][] = [
    ...cities.map((c) => c.coords),
    ...topTerritories.slice(0, 8).map((t) => t.centroid).filter((x): x is [number, number] => !!x),
  ];
  const shortLower = (meta.shortName || '').toLowerCase();
  const battles = HISTORICAL_BATTLES.filter((b) => {
    if (b.step !== safeStep) return false;
    const bText = `${b.name} ${b.belligerents} ${b.result}`.toLowerCase();
    if (shortLower && shortLower.length >= 4 && bText.includes(shortLower)) return true;
    return anchorPoints.some(
      (pt) => Math.abs(b.coords[0] - pt[0]) < 4.5 && Math.abs(b.coords[1] - pt[1]) < 4.0
    );
  }).slice(0, 6);

  // Chronological evolution series & key state/flag transitions across all steps
  const timelineSeries: CountryTimelinePoint[] = [];
  const transitions: CountryTransitionItem[] = [];
  let prevSig = '';

  for (let i = 0; i < STEPS.length; i++) {
    const sMeta = getOwnerMeta(code, i);
    const sFlag = resolveHistoricalFlag(code, i);
    const st = stats[i];
    const sArea = st ? Number(st.ownArea?.[code]) || 0 : 0;
    const sPop = st ? Number(st.ownPop?.[code]) || 0 : 0;
    const sCities = st ? Number(st.ownCities?.[code]) || 0 : 0;
    const sLabel = sMeta.l(i);
    const sTierLabel = getPoliticalTierLabel(sMeta.tier);
    const fId = sFlag?.entity_id || null;

    timelineSeries.push({
      step: i,
      dateLabel: STEPS[i].d,
      areaKm2: sArea,
      popMillions: sPop,
      citiesCount: sCities,
      label: sLabel,
      faction: sMeta.f,
      flagEntityId: fId,
    });

    const sig = `${sLabel}|${sMeta.f}|${sMeta.tier || ''}|${fId || ''}`;
    if (i === 0 || sig !== prevSig) {
      let reason = i === 0 ? 'Assetto Iniziale (Gen 1936)' : 'Evoluzione Storica';
      if (i > 0) {
        const prevMeta = getOwnerMeta(code, i - 1);
        const prevFlag = resolveHistoricalFlag(code, i - 1);
        const reasons: string[] = [];
        if ((prevFlag?.entity_id || null) !== fId) reasons.push('Cambio Bandiera');
        if (prevMeta.l(i - 1) !== sLabel || prevMeta.tier !== sMeta.tier) reasons.push('Assetto Statuale');
        if (prevMeta.f !== sMeta.f) reasons.push('Cambio Fazione');
        if (reasons.length > 0) reason = reasons.join(' · ');
      }
      transitions.push({
        step: i,
        dateLabel: STEPS[i].d,
        label: sLabel,
        faction: sMeta.f,
        tierLabel: sTierLabel,
        flagEntityId: fId,
        reason,
      });
    }
    prevSig = sig;
  }

  return {
    code,
    displayFlagCode,
    autonomousFlagTitle,
    meta,
    officialName,
    faction,
    factionChronoLabel,
    stateForm,
    hierarchyBadge,
    overlord,
    rootSovereign,
    flagMeta,
    kpis,
    empireKpis,
    subjects,
    topTerritories,
    cities,
    primaryFocusCoords,
    orgs,
    battles,
    timelineSeries,
    transitions,
  };
}
