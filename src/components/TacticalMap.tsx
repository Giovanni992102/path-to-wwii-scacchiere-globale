import React, { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import { getOwnerMeta, FACTION_COLORS, formatHierarchyBadge } from '../data/owners';
import {
  HISTORICAL_FORTIFICATION_LINES,
  HISTORICAL_NAVAL_BASES,
  getDynamicNavalBaseStatus,
} from '../data/historicalFortifications';
import { HISTORICAL_BATTLES, type HistoricalBattle } from '../data/historicalBattles';
import { HISTORICAL_SEA_LANES, getDynamicSeaLaneStatus } from '../data/historicalSeaLanes';
import { LayerVisibilityState } from './MapLayerControls';
import { tacticalAudio } from '../data/audioSynthesizer';
import { getCountryFlagSvg } from '../data/historicalFlags';

interface TacticalMapProps {
  provFeatures: any[];
  hbFeatures: any[];
  cntrFeatures: any[];
  hbMode: boolean;
  currentStep: number;
  selectedFeature: any;
  layers?: LayerVisibilityState;
  focusCoords?: { coords: [number, number]; zoom: number; key: number } | null;
  onSelectFeature: (feature: any) => void;
  onClearSelection: () => void;
  onSelectBattle?: (battle: HistoricalBattle) => void;
}

// Major strategic oceanic islands and overseas naval stations
export const STRATEGIC_ISLAND_LABELS: Record<string, string> = {
  MV_MALDIVE: 'Maldive (UK)',
  PF_POLYNESIA: 'Polinesia Francese (FRA)',
  US_HAWAII: 'Hawaii (USA)',
  MU_MAURITIUS: 'Mauritius (UK)',
  SC_SEYCHELLES: 'Seychelles (UK)',
  RE_REUNION: 'La Réunion (FRA)',
  KM_COMOROS: 'Comore (FRA)',
  BM_BERMUDA: 'Bermuda (UK)',
  FK_FALKLAND: 'Falkland (UK)',
  SH_HELENA: "Sant'Elena (UK)",
  CV_CAPEVERDE: 'Capo Verde (POR)',
  ST_SAOTOME: 'São Tomé (POR)',
  GL_GREENLAND: 'Groenlandia (DEN)',
  CK_COOK: 'Cook (NZL)',
  NR_NAURU: 'Nauru (AUS)',
  TV_ELLICE: 'Tuvalu / Ellice (UK)',
  KI_GILBERT: 'Gilbert (UK)',
  GU_GUAM: 'Guam (USA)',
  WK_WAKE: 'Wake (USA)',
  NC_NEWCALEDONIA: 'Nuova Caledonia (FRA)',
  US_AK_ALEUTIANS_WEST: 'Attu & Kiska (USA)',
};

export function getStrategicIslandLabel(id: string, step: number): string {
  if (id === 'GU_GUAM') {
    return (step >= 9 && step < 15) ? 'Guam / Omiya Jima (JAP)' : 'Guam (USA)';
  }
  if (id === 'WK_WAKE') {
    return (step >= 9 && step < 18) ? 'Wake / Otori Jima (JAP)' : 'Wake (USA)';
  }
  if (id === 'KI_GILBERT') {
    if (step === 13) return 'Gilbert / Tarawa (USA)';
    return (step >= 9 && step < 13) ? 'Gilbert / Tarawa (JAP)' : 'Gilbert (UK)';
  }
  if (id === 'NR_NAURU') {
    return (step >= 10 && step < 18) ? 'Nauru (JAP)' : 'Nauru (AUS)';
  }
  if (id === 'US_AK_ALEUTIANS_WEST') {
    return (step >= 10 && step < 12) ? 'Attu & Kiska (JAP)' : 'Attu & Kiska (USA)';
  }
  if (id === 'RE_REUNION') {
    return step >= 6 && step <= 10 ? 'La Réunion (VIC)' : 'La Réunion (FRA)';
  }
  if (id === 'KM_COMOROS') {
    if (step >= 6 && step <= 10) return 'Comore (VIC)';
    return step === 11 ? 'Comore (Alleati / FRA)' : 'Comore (FRA)';
  }
  if (id === 'PF_POLYNESIA') {
    return step >= 7 && step < 14 ? 'Polinesia Francese (Francia Libera)' : 'Polinesia Francese (FRA)';
  }
  if (id === 'NC_NEWCALEDONIA' || id === 'NC_CALEDONIA') {
    return step >= 7 && step < 14 ? 'Nuova Caledonia (Francia Libera)' : 'Nuova Caledonia (FRA)';
  }
  return STRATEGIC_ISLAND_LABELS[id] || '';
}

function isSameFeature(d: any, target: any): boolean {
  if (!d || !target) return false;
  if (d === target) return true;
  const dId = d.id || d.properties?.id;
  const targetId = target.id || target.properties?.id;
  if (dId && targetId) {
    return dId === targetId;
  }
  if (!dId && !targetId) {
    const dName = d.properties?.NAME || d.properties?.name;
    const targetName = target.properties?.NAME || target.properties?.name;
    const dLayer = d.__layer || d.properties?.__layer;
    const targetLayer = target.__layer || target.properties?.__layer;
    return Boolean(dName && targetName && dName === targetName && (!dLayer || !targetLayer || dLayer === targetLayer));
  }
  return false;
}

// Helper to clean city map labels for refined, uncluttered UI/UX
function getCleanCityLabel(rawHistoricalName: string, fallbackName: string): { primary: string; subtitle: string; fullName: string } {
  const fullName = rawHistoricalName || fallbackName || '';
  if (!fullName) {
    return { primary: fallbackName || '', subtitle: '', fullName: fallbackName || '' };
  }

  let subtitle = '';
  let primary = fullName;

  const parenMatch = fullName.match(/\(([^)]+)\)/);
  if (parenMatch && parenMatch.index !== undefined) {
    subtitle = parenMatch[1].trim();
    primary = fullName.substring(0, parenMatch.index).trim();
  }

  // Refine known composite / historical prefixes on map faces
  if (primary.startsWith('Freie Stadt ')) {
    primary = primary.replace('Freie Stadt ', '').trim();
  } else if (primary.startsWith('Città di ')) {
    primary = primary.replace('Città di ', '').trim();
  } else if (primary.startsWith('Città del ')) {
    primary = primary.replace('Città del ', '').trim();
  } else if (primary.endsWith(' in Preußen')) {
    primary = primary.replace(' in Preußen', '').trim();
  }

  // Handle slashes like "Nice / Nizza" or "Shōnan-tō / Singapore" -> prefer concise localized / era name
  if (primary.includes(' / ')) {
    const parts = primary.split(' / ');
    primary = parts[0].trim();
  } else if (primary.includes(' & ')) {
    const parts = primary.split(' & ');
    primary = parts[0].trim();
  }

  return {
    primary: primary || fallbackName,
    subtitle,
    fullName,
  };
}

export interface HistoricalCity {
  id: string;
  name: string;
  coords: [number, number];
  isCapital: boolean | ((s: number) => boolean);
  ownerKey: string;
  owners?: Record<string, string>;
  historicalNames: Record<string, string>;
}

export function getCityIsCapital(city: HistoricalCity, step: number): boolean {
  if (typeof city.isCapital === 'function') {
    return city.isCapital(step);
  }
  return !!city.isCapital;
}

export function getCityOwner(city: HistoricalCity, step: number): string {
  if (city.owners) {
    for (let st = step; st >= 0; st--) {
      if (city.owners[`step${st}`]) return city.owners[`step${st}`];
    }
    if (city.owners.default) return city.owners.default;
  }
  return city.ownerKey || '';
}

// Major historical capitals & strategic cities (Dynamic Historico-Toponymic Database)
export const HISTORICAL_CITIES: HistoricalCity[] = [
  { id: 'berlin', name: 'Berlin', coords: [13.4, 52.52], isCapital: true, ownerKey: 'GER', owners: { default: 'GER', step17: 'SOV', step18: 'ACC', step19: 'ACC' }, historicalNames: { default: 'Berlin (Reichshauptstadt — Deutsches Reich)', step7: 'Berlin (Reichshauptstadt — Patto Tripartito Asse)', step12: 'Berlin (Reichshauptstadt — Emergenza Sconfitta di Kursk & Crisi Italiana)', step17: 'Berlin (Assedio e Battaglia Urbana di Berlino — Bandiera Rossa sul Reichstag / Morte di Hitler)', step18: 'Berlin (Consiglio di Controllo Alleato — Settori Quadripartiti)', step19: 'Berlin (Città Quadripartita — Tensioni Alleati/URSS, 1947)' } },
  { id: 'london', name: 'London', coords: [-0.12, 51.5], isCapital: true, ownerKey: 'UK', historicalNames: { default: 'London (Capital of the British Empire)', step7: 'London (The Blitz / RAF Fighter Command)', step19: 'London (Regno Unito — Governo Attlee & Decolonizzazione)' } },
  { id: 'roma', name: 'Roma', coords: [12.49, 41.9], isCapital: (s: number) => s !== 13, ownerKey: 'ITA', owners: { default: 'ITA', step13: 'GER', step14: 'ITA', step19: 'ITA_REP' }, historicalNames: { default: 'Roma (Capitale dell\'Impero — Regno d\'Italia)', step12: 'Roma (Governo Badoglio — "La guerra continua", Trattative Segrete di Cassibile)', step13: 'Roma (Città Aperta Occupata dalla Wehrmacht — Operazione Achse, 10 Settembre 1943)', step14: 'Roma (Capitale d\'Italia Liberata dalla 5ª Armata USA — 4-5 Giugno 1944 / Governo Bonomi)', step17: 'Roma (Capitale del Regno d\'Italia — Governo Bonomi / Vittoria Alleata)', step18: 'Roma (Capitale del Regno d\'Italia — Governo Parri)', step19: 'Roma (Capitale della Repubblica Italiana — Assemblea Costituente & Governo De Gasperi)' } },
  { id: 'brindisi', name: 'Brindisi', coords: [17.94, 40.63], isCapital: (s: number) => s === 13, ownerKey: 'ITA', owners: { default: 'ITA', step13: 'ITA', step19: 'ITA_REP' }, historicalNames: { default: 'Brindisi (Base Navale Basso Adriatico — Regia Marina)', step13: 'Brindisi (Capitale Provvisoria del Regno del Sud — Governo Badoglio & Re Vittorio Emanuele III, 9 Settembre 1943)', step14: 'Brindisi (Base Navale e Logistica Alleata del Basso Adriatico — Regno d\'Italia)', step19: 'Brindisi (Porto Adriatico — Repubblica Italiana)' } },
  { id: 'perugia', name: 'Perugia', coords: [12.39, 43.11], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step13: 'RSI', step14: 'ITA', step19: 'ITA_REP' }, historicalNames: { default: 'Perugia (Capoluogo dell\'Umbria)', step13: 'Perugia (Repubblica Sociale Italiana — Presidio Wehrmacht)', step14: 'Perugia (Liberata dall\'8ª Armata Britannica, 20 Giugno 1944)', step19: 'Perugia (Umbria — Repubblica Italiana)' } },
  { id: 'paris', name: 'Paris', coords: [2.35, 48.85], isCapital: (s: number) => s < 6 || s >= 15, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'GER', step15: 'FRA' }, historicalNames: { default: 'Paris (République Française)', step6: 'Paris (Militärbefehlshaber in Frankreich / Zone Occupée)', step15: 'Paris (Capitale de la France Libérée — GPRF & Général Leclerc, 25 Août 1944)', step19: 'Paris (Quatrième République Française — Union Française)' } },
  { id: 'vichy', name: 'Vichy', coords: [3.42, 46.12], isCapital: (s: number) => s >= 6 && s < 15, ownerKey: 'VIC', owners: { default: 'FRA', step6: 'VIC', step11: 'GER', step15: 'FRA' }, historicalNames: { default: 'Vichy (Station thermale — France)', step6: 'Vichy (Capitale de l\'État Français — Pétain)', step11: 'Vichy (Occupazione Wehrmacht — Op. Anton)', step15: 'Vichy (Liberata — Fine de facto del Regime di Vichy, Agosto 1944)' } },
  { id: 'moscow', name: 'Москва - Moskva', coords: [37.61, 55.75], isCapital: true, ownerKey: 'SOV', historicalNames: { default: 'Москва - Moskva (Capitale dell\'URSS — Cremlino)', step9: 'Москва - Moskva (Stato d\'Assedio / Controffensiva Invernale dell\'Armata Rossa)', step12: 'Москва - Moskva (Capitale dell\'URSS / Sede della Stavka — Ordine di Controffensiva Generale)', step18: 'Москва - Moskva (Capitale dell\'Unione Sovietica — Potenza Vincitrice)' } },
  { id: 'leningrad', name: 'Ленинград - Leningrad', coords: [30.33, 59.93], isCapital: false, ownerKey: 'SOV', historicalNames: { default: 'Ленинград - Leningrad (Polo Navale Baltico — URSS)', step9: 'Ленинград - Leningrad (Città Assediata / Strada della Vita sul Lago Ladoga)', step12: 'Ленинград - Leningrad (Blocco Terrestre Infranto — Operazione Iskra & Corridoio della Vittoria)', step18: 'Ленинград - Leningrad (Città Eroe — Ricostruzione Postbellica URSS)' } },
  { id: 'tokyo', name: '東京 - Tokyo', coords: [139.69, 35.68], isCapital: true, ownerKey: 'JAP', historicalNames: { default: '東京 - Tokyo (Dai Nippon Teikoku)', step9: '東京 - Tokyo (Dichiarazione di Guerra USA & UK — Grande Asia Orientale)', step18: '東京 - Tokyo (Occupazione Alleata SCAP — Firma della Resa su USS Missouri, 2 Settembre 1945)', step19: '東京 - Tokyo (Nihon-koku — Costituzione del 1947 & Comando Supremo SCAP)' } },
  { id: 'washington', name: 'Washington', coords: [-77.03, 38.9], isCapital: true, ownerKey: 'USA', historicalNames: { default: 'Washington, D.C. (United States of America)', step9: 'Washington, D.C. (Discorso dell\'Infamia / Arsenal of Democracy)', step19: 'Washington, D.C. (Presidenza Truman — Dottrina Truman & Piano Marshall, 1947)' } },
  { id: 'nanjing', name: '南京 - Nanjing', coords: [118.79, 32.06], isCapital: (s: number) => s < 2 || (s >= 6 && s < 18) || s >= 19, ownerKey: 'CHI', owners: { default: 'CHI', step1: 'JAP', step6: 'CHI_WANG', step18: 'CHI' }, historicalNames: { default: '南京 - Nanjing (Capitale della Repubblica di Cina)', step1: '南京 - Nanjing (Occupazione dell\'Armata Giapponese)', step6: '南京 - Nanjing (Capitale Governo Riorganizzato di Wang Jingwei)', step18: '南京 - Nanjing (Resa Giapponese di Okamura — Ritorno alla Repubblica di Cina)', step19: '南京 - Nanjing (Capitale Restaurata della Repubblica di Cina — Guerra Civile)' } },
  { id: 'chongqing', name: '重庆 - Chongqing', coords: [106.55, 29.56], isCapital: (s: number) => s >= 2 && s < 19, ownerKey: 'CHI', historicalNames: { default: '重庆 - Chongqing (Sichuan — Repubblica di Cina)', step2: '重庆 - Chongqing (Capitale di Guerra Nazionalista / Peidu Chiang Kai-shek)', step18: '重庆 - Chongqing (Negoziati di Pace KMT-PCC post-Resa Giapponese)', step19: '重庆 - Chongqing (Sichuan — Repubblica di Cina)' } },
  { id: 'beiping', name: '北平 - Beiping', coords: [116.4, 39.9], isCapital: false, ownerKey: 'CHI', owners: { default: 'CHI', step2: 'JAP', step18: 'CHI' }, historicalNames: { default: '北平 - Beiping (Repubblica di Cina — Nazionalisti)', step2: '北京 - Beijing (Governo Provvisorio Cinese / Impero Giapponese)', step6: '北京 - Beijing (Governo Riorganizzato di Wang Jingwei)', step18: '北平 - Beiping (Riconquista Nazionalista KMT — Settembre 1945)', step19: '北平 - Beiping (Roccaforte Nazionalista del Nord — Guerra Civile Cinese)' } },
  { id: 'kyzyl', name: 'Кызыл - Kyzyl', coords: [94.44, 51.72], isCapital: true, ownerKey: 'TUV', owners: { default: 'TUV', step16: 'SOV' }, historicalNames: { default: 'Кызыл - Kyzyl (Capitale della Repubblica Popolare di Tannu Tuva)', step16: 'Кызыл - Kyzyl (Oblast\' Autonoma di Tuva — Annessa alla RSFSR / URSS, Ottobre 1944)' } },
  { id: 'ghulja', name: 'غۇلجا - Ghulja (Yining)', coords: [81.33, 43.91], isCapital: (s: number) => s >= 16, ownerKey: 'ETR', owners: { default: 'XIN', step14: 'CHI', step16: 'ETR' }, historicalNames: { default: '伊寧 - Yining / Ghulja (Ili — Xinjiang / Sheng Shicai)', step14: '伊寧 - Yining (Distretto dell\'Ili — Repubblica di Cina)', step16: 'غۇلجا - Ghulja (Capitale della Seconda Repubblica del Turkestan Orientale — Nov 1944)', step18: 'غۇلجا - Ghulja (Seconda Repubblica del Turkestan Orientale — Fronte del Manas)', step19: 'غۇلجا - Ghulja (Seconda Repubblica del Turkestan Orientale / Tre Distretti — Ehmetjan Qasimi, 1947)' } },
  { id: 'urumqi', name: 'ئۈرۈمچی - Dihua (Ürümqi)', coords: [87.61, 43.82], isCapital: false, ownerKey: 'XIN', owners: { default: 'XIN', step14: 'CHI' }, historicalNames: { default: '迪化 - Dihua / Ürümqi (Xinjiang — Sheng Shicai)', step14: '迪化 - Dihua / Ürümqi (Governo Provinciale KMT dello Xinjiang)', step19: '迪化 - Dihua / Ürümqi (Presidio Nazionalista KMT — Crisi Coalizione con 2ª ETR, 1947)' } },
  { id: 'singapore', name: 'Singapore', coords: [103.82, 1.29], isCapital: false, ownerKey: 'UK', owners: { default: 'UK', step10: 'JAP', step18: 'UK' }, historicalNames: { default: 'Singapore (Straits Settlements — Impero Britannico)', step9: 'Singapore (Fortezza Navale Britannica sotto Assedio)', step10: '昭南島 - Shōnan-tō (Occupazione Militare Impero Giapponese)', step18: 'Singapore (Resa Giapponese al SEAC — Amministrazione Militare Britannica BMA, 12 Settembre 1945)', step19: 'Singapore (Colonia della Corona Britannica — British Far East Command)' } },
  { id: 'manila', name: 'Manila', coords: [120.98, 14.6], isCapital: true, ownerKey: 'USA', owners: { default: 'USA', step10: 'JAP', step17: 'USA', step19: 'PHL' }, historicalNames: { default: 'Manila (Commonwealth of the Philippines / USAFFE HQ)', step9: 'Manila (Open City, 26 Dicembre 1941)', step10: 'Manila (Occupazione 14ª Armata Giapponese / Repubblica Filippina di Laurel)', step17: 'Manila (Liberata dalle Forze Statunitensi e Filippine — Battaglia Urbana di Manila, Febbraio-Marzo 1945)', step19: 'Manila (Capitale della Repubblica delle Filippine — Indipendenza del 4 Luglio 1946)' } },
  { id: 'hong_kong', name: 'Hong Kong', coords: [114.16, 22.28], isCapital: true, ownerKey: 'UK', owners: { default: 'UK', step9: 'JAP', step18: 'UK' }, historicalNames: { default: 'Hong Kong (Colonia della Corona Britannica)', step9: '香港 - Shōkō (Occupazione Militare Giapponese)', step18: 'Hong Kong (Ripristino Sovranità Britannica — Amm. Harcourt, 30 Agosto 1945)', step19: 'Hong Kong (Crown Colony of Hong Kong — Gov. Sir Alexander Grantham)' } },
  { id: 'batavia', name: 'Batavia', coords: [106.85, -6.21], isCapital: true, ownerKey: 'HOL', owners: { default: 'HOL', step10: 'JAP', step18: 'IDN', step19: 'HOL' }, historicalNames: { default: 'Batavia (Capitale Nederlands-Indië)', step9: 'Batavia (Quartier Generale KNIL / Mobilitazione)', step10: 'Jakarta (Gunseikanbu — 16ª Armata Giapponese)', step18: 'Jakarta (Proclamazione d\'Indipendenza dell\'Indonesia — Sukarno & Hatta, 17 Agosto 1945)', step19: 'Batavia (Enclave Olandese dopo Operatie Product / Negoziati ONU)' } },
  { id: 'rangoon', name: 'Rangoon', coords: [96.16, 16.84], isCapital: true, ownerKey: 'UK', owners: { default: 'UK', step10: 'JAP', step17: 'UK' }, historicalNames: { default: 'Rangoon (Capitale della Birmania Britannica)', step9: 'Rangoon (Capolinea Burma Road — Attacchi Aerei Giapponesi)', step10: 'ရန်ကုန် - Yangon (Occupazione 15ª Armata Giapponese / Stato di Birmania)', step17: 'Rangoon (14ª Armata Britannica alle Porte della Città — Operazione Dracula, Maggio 1945)', step18: 'Rangoon (British Crown Colony of Burma — Amministrazione SEAC / Dorman-Smith)', step19: 'Rangoon (Birmania Britannica in Transizione — Governo Provvisorio di U Nu)' } },
  { id: 'bangkok', name: 'กรุงเทพฯ - Bangkok', coords: [100.5, 13.75], isCapital: true, ownerKey: 'SIA', historicalNames: { default: 'กรุงเทพฯ - Bangkok (Regno del Siam / Thailandia)', step9: 'กรุงเทพฯ - Bangkok (Alleanza con il Giappone / Phibunsongkhram)', step18: 'กรุงเทพฯ - Bangkok (Governo di Pace Seri Thai — Pridi Banomyong / Seni Pramoj)', step19: 'กรุงเทพฯ - Bangkok (Regno di Thailandia — Re Bhumibol Adulyadej Rama IX & ONU)' } },
  { id: 'saigon', name: 'Saigon', coords: [106.66, 10.76], isCapital: false, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'VIC', step9: 'JAP', step18: 'FRA' }, historicalNames: { default: 'Saigon (Capitale della Cocincina — Indocina Francese)', step7: 'Saigon (Vichy / FNEO)', step9: 'Saigon (Presidio 22ª Flottiglia Aerea Impero Giapponese)', step18: 'Saigon (Ritorno Francese & Resa della 38ª Armata Giapponese — Settembre 1945)', step19: 'Saigon (Repubblica Autonoma di Cocincina — Presidio CEFEO / Unione Francese)' } },
  { id: 'hanoi', name: 'Hanoi', coords: [105.85, 21.03], isCapital: true, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'VIC', step7: 'JAP', step18: 'VIE', step19: 'FRA' }, historicalNames: { default: 'Hanoi (Capitale dell\'Indocina Francese)', step7: 'Hanoi (Occupazione Militare Giapponese del Tonchino)', step18: 'Hà Nội (Proclamazione RDV — Hồ Chí Minh a Piazza Ba Đình, 2 Settembre 1945)', step19: 'Hà Nội (Presidio Francese CEFEO dopo la Battaglia di Hanoi — Guerra d\'Indocina)' } },
  { id: 'keijo', name: '京城 - Keijō', coords: [126.97, 37.56], isCapital: true, ownerKey: 'JAP', owners: { default: 'JAP', step18: 'USA' }, historicalNames: { default: '京城 - Keijō (Chōsen Sōtokufu / Governatorato Generale di Corea)', step18: '서울 - Seoul (Governo Militare Statunitense USAMGIK — Settembre 1945)', step19: '서울 - Seoul (Corea del Sud — Amministrazione USAMGIK a Sud del 38° Parallelo)' } },
  { id: 'hsinking', name: '新京 - Hsinking', coords: [125.32, 43.88], isCapital: true, ownerKey: 'MAN', owners: { default: 'MAN', step18: 'SOV', step19: 'CHI' }, historicalNames: { default: '新京 - Hsinking (Capitale Imperiale del Manchukuo)', step18: '長春 - Changchun (Occupazione Sovietica della Manciuria — Resa dell\'Armata del Kwantung)', step19: '長春 - Changchun (Presidio Nazionalista KMT Assediato dall\'EPL — Guerra Civile Cinese)' } },
  { id: 'dairen', name: '大連 - Dairen (Dalian)', coords: [121.62, 38.92], isCapital: false, ownerKey: 'JAP', owners: { default: 'JAP', step18: 'SOV' }, historicalNames: { default: '大連 - Dairen / Dalian (Sede del Governo del Kwantung & Polo Commerciale Mantetsu)', step16: '大連 - Dairen (Porto Commerciale del Kwantung — Impero Giapponese)', step18: 'Дальний - Dalian (Amministrazione & Controllo Navale Sovietico — Trattato Sino-Sovietico 1945)' } },
  { id: 'ryojun', name: '旅順 - Ryojun (Port Arthur)', coords: [121.26, 38.81], isCapital: false, ownerKey: 'JAP', owners: { default: 'JAP', step18: 'SOV' }, historicalNames: { default: '旅順 - Ryojun / Port Arthur (Distretto Navale di Guardia Ryojun Keibifu & Fortezza di Liaodong)', step16: '旅順 - Ryojun (Roccaforte Navale del Kwantung — Impero Giapponese)', step18: 'Порт-Артур - Port Arthur (Base Navale Sovietica della Flotta del Pacifico — Accordo di Yalta)' } },
  { id: 'wuhan', name: '武汉 - Wuhan', coords: [114.3, 30.59], isCapital: false, ownerKey: 'CHI', owners: { default: 'CHI', step2: 'JAP', step18: 'CHI' }, historicalNames: { default: '武汉 - Wuhan (Hubei — Repubblica di Cina)', step2: '武汉 - Wuhan (Presidio Militare Impero Giapponese)', step18: '武汉 - Wuhan (Ritorno alla Repubblica di Cina — Resa della 6ª Armata d\'Area Giapponese)' } },
  { id: 'hiroshima', name: '広島 - Hiroshima', coords: [132.45, 34.38], isCapital: false, ownerKey: 'JAP', historicalNames: { default: '広島 - Hiroshima (Polo Militare Esercito & Base Navale Kure)', step18: '広島 - Hiroshima (Devastazione Atomica 6 Agosto 1945 — Occupazione Alleata BCOF/SCAP)', step19: '広島 - Hiroshima (Ricostruzione Postbellica — Nihon-koku / SCAP)' } },
  { id: 'rabaul', name: 'Rabaul', coords: [152.18, -4.2], isCapital: false, ownerKey: 'AUS', owners: { default: 'AUS', step10: 'JAP', step18: 'AUS' }, historicalNames: { default: 'Rabaul (Territory of New Guinea — Mandato Australiano)', step10: 'ラバウル - Rabaul (Roccaforte Navale & Aerea Flotta Combinata Giapponese)', step12: 'ラバウル - Rabaul (Fortezza Nipponica Isolata dall\'Operazione Cartwheel)', step18: 'Rabaul (Resa dell\'8ª Armata Imamura sull\'HMS Glory — 6 Settembre 1945)', step19: 'Rabaul (Territory of Papua-New Guinea — Amministrazione Civile Australiana)' } },
  { id: 'guadalcanal', name: 'Guadalcanal', coords: [160.05, -9.43], isCapital: false, ownerKey: 'UK', owners: { default: 'UK', step10: 'USA', step18: 'UK' }, historicalNames: { default: 'Guadalcanal (British Solomon Islands Protectorate)', step10: 'Guadalcanal (Sbarco 1st Marine Division USA / Henderson Field)', step11: 'Guadalcanal (Vittoria Aeronavale USA / Consolidamento Perimetro)', step18: 'Honiara / Guadalcanal (Protettorato Britannico delle Salomone Restaurato)', step19: 'Honiara / Guadalcanal (Nuova Capitale del British Solomon Islands Protectorate)' } },
  { id: 'munda', name: 'Munda', coords: [157.26, -8.33], isCapital: false, ownerKey: 'UK', owners: { default: 'UK', step10: 'JAP', step12: 'USA', step18: 'UK' }, historicalNames: { default: 'Munda (New Georgia — Solomon Islands)', step10: 'Munda (Aerodromo Militare Giapponese)', step12: 'Munda (Operazione Cartwheel — Assalto 43ª Divisione USA)', step13: 'Munda (Base Aerea Alleata — Presa della Nuova Georgia e Isolamento di Kolombangara, Settembre 1943)', step18: 'Munda (Nuova Georgia — British Solomon Islands Protectorate)' } },
  { id: 'buna', name: 'Buna-Gona', coords: [148.40, -8.66], isCapital: false, ownerKey: 'AUS', owners: { default: 'AUS', step10: 'JAP', step12: 'AUS' }, historicalNames: { default: 'Buna (Territory of Papua — Australia)', step10: 'Buna-Gona (Testa di Ponte Giapponese / Inizio Sentiero di Kokoda)', step12: 'Buna-Dobodura (Liberata — Polo Aeronavale Alleato SWPA)', step19: 'Buna (Territory of Papua-New Guinea — Amministrazione Australiana)' } },
  { id: 'kiska', name: 'Kiska', coords: [177.48, 51.98], isCapital: false, ownerKey: 'USA', owners: { default: 'USA', step10: 'JAP', step12: 'USA' }, historicalNames: { default: 'Kiska (Aleutian Islands — Territory of Alaska)', step10: '鳴神島 - Narukami-tō / Kiska (Occupazione Militare Giapponese)', step12: 'Kiska (Evacuata Segretamente dai Giapponesi il 28 Luglio 1943)' } },
  { id: 'midway', name: 'Midway', coords: [-177.37, 28.21], isCapital: false, ownerKey: 'USA', historicalNames: { default: 'Midway (Naval Air Station Midway — US Navy)', step10: 'Midway (Vittoria Decisiva delle Portaerei Americane, 4 Giugno 1942)' } },
  { id: 'honolulu', name: 'Honolulu', coords: [-157.86, 21.31], isCapital: true, ownerKey: 'USA', historicalNames: { default: 'Honolulu (Territory of Hawaii / Pacific Fleet Headquarters)', step9: 'Honolulu (Pearl Harbor / Legge Marziale)', step18: 'Honolulu (Quartier Generale Pacifico USA — Dopoguerra)' } },
  { id: 'port_moresby', name: 'Port Moresby', coords: [147.18, -9.44], isCapital: true, ownerKey: 'AUS', historicalNames: { default: 'Port Moresby (Territory of Papua — Australia)', step10: 'Port Moresby (Base Alleata / Difesa Pista di Kokoda & Milne Bay)', step19: 'Port Moresby (Capitale Amministrativa del Territorio di Papua e Nuova Guinea)' } },
  { id: 'lae', name: 'Lae', coords: [146.99, -6.72], isCapital: false, ownerKey: 'AUS', owners: { default: 'AUS', step10: 'JAP', step13: 'AUS' }, historicalNames: { default: 'Lae (Territory of New Guinea — Golfo di Huon)', step10: 'Lae (Base Aerea e Navale Impero Giapponese)', step13: 'Lae (Liberata dalle Forze Congiunte Australiane e Statunitensi — Campagna di Salamaua-Lae, 16 Settembre 1943)', step19: 'Lae (Territory of Papua-New Guinea — Amministrazione Civile Australiana)' } },
  { id: 'darwin', name: 'Darwin', coords: [130.84, -12.46], isCapital: false, ownerKey: 'AUS', historicalNames: { default: 'Darwin (Northern Territory — Australia)', step10: 'Darwin (Base Navale Alleata / Bombardamento Giapponese Feb 1942)' } },
  { id: 'sydney', name: 'Sydney', coords: [151.21, -33.87], isCapital: false, ownerKey: 'AUS', historicalNames: { default: 'Sydney (Main Base Royal Australian Navy)' } },
  { id: 'canberra', name: 'Canberra', coords: [149.13, -35.28], isCapital: true, ownerKey: 'AUS', historicalNames: { default: 'Canberra (Commonwealth of Australia)' } },
  { id: 'new_delhi', name: 'New Delhi', coords: [77.21, 28.61], isCapital: true, ownerKey: 'IND', historicalNames: { default: 'New Delhi (Capital of the Indian Empire / British Raj)', step19: 'New Delhi (Capitale del Dominion dell\'India Indipendente — 15 Agosto 1947)' } },
  { id: 'calcutta', name: 'Calcutta', coords: [88.36, 22.57], isCapital: false, ownerKey: 'IND', historicalNames: { default: 'Calcutta (Port of Bengal / Rifornimenti)', step19: 'Calcutta (West Bengal — Dominion dell\'India Post-Partizione)' } },
  { id: 'ottawa', name: 'Ottawa', coords: [-75.7, 45.42], isCapital: true, ownerKey: 'CAN', historicalNames: { default: 'Ottawa (Dominion of Canada)' } },
  { id: 'tehran', name: 'تهران - Tehran', coords: [51.39, 35.69], isCapital: true, ownerKey: 'IRN', owners: { default: 'IRN', step9: 'UK', step19: 'IRN' }, historicalNames: { default: 'تهران - Tehran (Stato Imperiale dell\'Iran — Dinastia Pahlavi)', step9: 'تهران - Tehran (Occupazione Anglosovietica / Corridoio Persiano)', step19: 'تهران - Tehran (Stato Imperiale dell\'Iran — Sovranità Restaurata)' } },
  { id: 'baghdad', name: 'بغداد - Baghdad', coords: [44.36, 33.31], isCapital: true, ownerKey: 'IRQ', owners: { default: 'UK', step8: 'IRQ', step9: 'UK', step19: 'IRQ' }, historicalNames: { default: 'بغداد - Baghdad (Regno dell\'Iraq)', step8: 'بغداد - Baghdad (Guerra Anglo-Irachena / Golden Square di Rashid Ali)', step9: 'بغداد - Baghdad (Presidio Britannico Paiforce)', step19: 'بغداد - Baghdad (Regno dell\'Iraq — Sovranità Costituzionale)' } },
  { id: 'damascus', name: 'دمشق - Damas', coords: [36.29, 33.51], isCapital: true, ownerKey: 'SYR', owners: { default: 'SYR', step6: 'VIC', step9: 'FRA', step19: 'SYR' }, historicalNames: { default: 'دمشق - Damas (Mandat Français de Syrie)', step6: 'دمشق - Damas (Mandat de Syrie — Vichy)', step9: 'دمشق - Damas (Francia Libera & Gran Bretagna)', step19: 'دمشق - Damas (Repubblica Siriana — Indipendenza Sovrana)' } },
  { id: 'beirut', name: 'بيروت - Beyrouth', coords: [35.5, 33.89], isCapital: true, ownerKey: 'LEB', owners: { default: 'LEB', step6: 'VIC', step9: 'FRA', step19: 'LEB' }, historicalNames: { default: 'بيروت - Beyrouth (État du Grand Liban)', step6: 'بيروت - Beyrouth (Mandat du Liban — Vichy)', step9: 'بيروت - Beyrouth (Francia Libera & Gran Bretagna)', step19: 'بيروت - Beyrouth (Repubblica Libanese — Indipendenza Sovrana)' } },
  { id: 'munchen', name: 'München', coords: [11.58, 48.14], isCapital: false, ownerKey: 'GER', owners: { default: 'GER', step17: 'USA' }, historicalNames: { default: 'München (Hauptstadt der Bewegung — Deutsches Reich)', step17: 'München (Presa dalla 7ª Armata USA — 30 Aprile 1945)', step18: 'München (Zona d\'Occupazione Statunitense — Baviera / OMGUS)', step19: 'München (Zona Americana — Bizona Economica 1947)' } },
  { id: 'koln', name: 'Köln', coords: [6.96, 50.94], isCapital: false, ownerKey: 'GER', owners: { default: 'GER', step17: 'USA', step18: 'UK' }, historicalNames: { default: 'Köln (Rheinland — Deutsches Reich)', step17: 'Köln (Espugnata dalla 1ª Armata USA — 6 Marzo 1945)', step18: 'Köln (Zona d\'Occupazione Britannica — Renania Settentrionale)', step19: 'Köln (Zona Britannica / Nordrhein-Westfalen — Bizona 1947)' } },
  { id: 'hamburg', name: 'Hamburg', coords: [9.99, 53.55], isCapital: false, ownerKey: 'GER', owners: { default: 'GER', step18: 'UK' }, historicalNames: { default: 'Hamburg (Kriegsmarine Werft Blohm & Voss)', step12: 'Hamburg (Operazione Gomorrah — Tempesta di Fuoco RAF / USAAF, 24 Luglio 1943)', step17: 'Hamburg (Settore Nord del Reich Wehrmacht — Kampfkommandant Alwin Wolz)', step18: 'Hamburg (Zona d\'Occupazione Britannica — Resa del 3 Maggio 1945)', step19: 'Hamburg (Zona Britannica — Bizona Economica 1947)' } },
  { id: 'essen', name: 'Essen', coords: [7.01, 51.46], isCapital: false, ownerKey: 'GER', owners: { default: 'GER', step17: 'USA', step18: 'UK' }, historicalNames: { default: 'Essen (Krupp Werke / Arsenale della Ruhr)', step17: 'Essen (Sacca della Ruhr Cancellata — 9ª Armata USA, 10 Aprile 1945)', step18: 'Essen (Zona d\'Occupazione Britannica — Bacino della Ruhr)', step19: 'Essen (Zona Britannica — Bizona / Smantellamento Industriale Ruhr)' } },
  { id: 'nurnberg', name: 'Nürnberg', coords: [11.08, 49.45], isCapital: false, ownerKey: 'GER', owners: { default: 'GER', step17: 'USA' }, historicalNames: { default: 'Nürnberg (Stadt der Reichsparteitage)', step17: 'Nürnberg (Presa dalla 7ª Armata USA dopo Battaglia Urbana — 20 Aprile 1945)', step18: 'Nürnberg (Zona Statunitense — Preparazione Processo di Norimberga)', step19: 'Nürnberg (Zona Americana — Bizona 1947)' } },
  { id: 'konigsberg', name: 'Königsberg', coords: [20.51, 54.71], isCapital: false, ownerKey: 'GER', owners: { default: 'GER', step17: 'SOV' }, historicalNames: { default: 'Königsberg (Provinz Ostpreußen — Deutsches Reich)', step17: 'Königsberg (Espugnata dall\'Armata Rossa — 9 Aprile 1945)', step18: 'Кёнигсберг - Königsberg (Amministrazione Sovietica — Accordi di Potsdam 1945)', step19: 'Калининград - Kaliningrad (Oblast\' di Kaliningrad — RSFSR / URSS)' } },
  { id: 'breslau', name: 'Breslau', coords: [17.03, 51.1], isCapital: false, ownerKey: 'GER', owners: { default: 'GER', step18: 'POL' }, historicalNames: { default: 'Breslau (Provinz Niederschlesien — Deutsches Reich)', step17: 'Festung Breslau (Assediata dall\'Armata Rossa — Gauleiter Karl Hanke, Resistenza fino al 6 Maggio 1945)', step18: 'Wrocław (Territori Recuperati — Repubblica di Polonia, Potsdam 1945)' } },
  { id: 'wien', name: 'Wien', coords: [16.37, 48.2], isCapital: (s: number) => s < 1 || s >= 17, ownerKey: 'AUS', owners: { default: 'AUS', step1: 'GER', step17: 'SOV', step18: 'AUS' }, historicalNames: { default: 'Wien (Bundesstaat Österreich)', step1: 'Wien (Reichsgau Wien — Deutsches Reich)', step17: 'Wien (Liberata dal 3° Fronte Ucraino — 13 Aprile 1945 / Governo Provvisorio Karl Renner)', step18: 'Wien (Repubblica d\'Austria — Settori Quadripartiti Alleati / Governo Karl Renner)', step19: 'Wien (Capitale dell\'Austria Occupata — Commissione Alleata ACA)' } },
  { id: 'torgau', name: 'Torgau', coords: [13.0, 51.56], isCapital: false, ownerKey: 'USA', owners: { default: 'GER', step17: 'USA', step18: 'SOV' }, historicalNames: { default: 'Torgau (Sassonia — Deutsches Reich)', step17: 'Torgau sull\'Elba (Incontro Storico tra Truppe USA e Sovietiche — 25 Aprile 1945)', step18: 'Torgau (Zona d\'Occupazione Sovietica SBZ — Sassonia-Anhalt)' } },
  { id: 'milano', name: 'Milano', coords: [9.19, 45.46], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step13: 'RSI', step17: 'ITA', step19: 'ITA_REP' }, historicalNames: { default: 'Milano (Polo Industriale Aeronautico Breda/Caproni)', step13: 'Milano (Repubblica Sociale Italiana — Sede Ministeri RSI & GNR)', step17: 'Milano (Insurrezione Generale del 25 Aprile — Liberata dal CLNAI)', step19: 'Milano (Ricostruzione Postbellica — Repubblica Italiana)' } },
  { id: 'torino', name: 'Torino', coords: [7.68, 45.07], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step13: 'RSI', step17: 'ITA', step19: 'ITA_REP' }, historicalNames: { default: 'Torino (Polo Meccanico FIAT Grandi Motori)', step13: 'Torino (Repubblica Sociale Italiana — Produzione Bellica RSI / Wehrmacht)', step17: 'Torino (Insurrezione Operaia e Partigiana — Liberata dal CLN, 28 Aprile 1945)', step19: 'Torino (Polo Industriale — Repubblica Italiana)' } },
  { id: 'genova', name: 'Genova', coords: [8.93, 44.41], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step13: 'RSI', step17: 'ITA', step19: 'ITA_REP' }, historicalNames: { default: 'Genova (Cantieri Navali Ansaldo / Mar Ligure)', step13: 'Genova (Repubblica Sociale Italiana — Base Marina Nazionale Repubblicana & Xª MAS)', step17: 'Genova (Resa del Generale Tedesco Meinhold al CLN — 26 Aprile 1945)', step19: 'Genova (Porto Ligure — Repubblica Italiana)' } },
  { id: 'bologna', name: 'Bologna', coords: [11.34, 44.49], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step13: 'RSI', step17: 'ITA', step19: 'ITA_REP' }, historicalNames: { default: 'Bologna (Capoluogo Emilia)', step13: 'Bologna (Retrovie Linea Gotica — RSI / Wehrmacht)', step17: 'Bologna (Liberata dal 2° Corpo Polacco, Gruppo Friuli e 34ª USA — 21 Aprile 1945)', step19: 'Bologna (Emilia-Romagna — Repubblica Italiana)' } },
  { id: 'venezia', name: 'Venezia', coords: [12.33, 45.43], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step13: 'RSI', step17: 'ITA', step19: 'ITA_REP' }, historicalNames: { default: 'Venezia (Polo Navale Alto Adriatico)', step13: 'Venezia (Repubblica Sociale Italiana)', step17: 'Venezia (Insurrezione Partigiana del 28-29 Aprile — Ingresso Alleati 29-30 Aprile 1945)', step19: 'Venezia (Veneto — Repubblica Italiana)' } },
  { id: 'naha', name: 'Naha', coords: [127.68, 26.21], isCapital: false, ownerKey: 'JAP', owners: { default: 'JAP', step17: 'USA' }, historicalNames: { default: 'Naha (Prefettura di Okinawa — Giappone)', step17: 'Naha / Shuri (Battaglia di Okinawa — 10ª Armata USA contro 32ª Armata Giapponese, 1° Aprile 1945)', step18: 'Naha (Okinawa — Governo Militare Statunitense delle Isole Ryūkyū)' } },
  { id: 'taranto', name: 'Taranto', coords: [17.23, 40.47], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step13: 'UK', step14: 'ITA', step19: 'ITA_REP' }, historicalNames: { default: 'Taranto (Mar Piccolo — Base Navale Principale Regia Marina)', step7: 'Taranto (Notte di Taranto / Attacco Aerosiluranti Illustrious)', step13: 'Taranto (Operazione Slapstick — Sbarco 1ª Divisione Aviotrasportata Britannica, 9 Settembre 1943)', step14: 'Taranto (Base Navale del Regno del Sud / Cobelligeranza)', step19: 'Taranto (Arsenale della Marina Militare — Repubblica Italiana)' } },
  { id: 'napoli', name: 'Napoli', coords: [14.27, 40.85], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step13: 'ITA', step19: 'ITA_REP' }, historicalNames: { default: 'Napoli (Porto d\'Imbarco per l\'Oltremare e la Libia)', step13: 'Napoli (Liberata dall\'Insurrezione Popolare — Le Quattro Giornate di Napoli, 27-30 Settembre 1943)', step19: 'Napoli (Porto Principale del Mezzogiorno — Repubblica Italiana)' } },
  { id: 'salerno', name: 'Salerno', coords: [14.76, 40.68], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step13: 'USA', step14: 'ITA', step19: 'ITA_REP' }, historicalNames: { default: 'Salerno (Golfo di Salerno — Campania)', step13: 'Salerno (Operazione Avalanche — Sbarco della 5ª Armata USA del Gen. Clark, 9 Settembre 1943)', step14: 'Salerno (Sede Governo Badoglio Feb-Lug 1944 — Regno d\'Italia)', step19: 'Salerno (Campania — Repubblica Italiana)' } },
  { id: 'palermo', name: 'Palermo', coords: [13.36, 38.12], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step12: 'USA', step14: 'ITA', step19: 'ITA_REP' }, historicalNames: { default: 'Palermo (Comando Militare Marittimo Sicilia — Regia Marina)', step12: 'Palermo (Liberata dalla 7ª Armata USA di Patton, 22 Luglio 1943)', step14: 'Palermo (Sicilia Ritornata all\'Amministrazione del Regno d\'Italia, Feb 1944)', step19: 'Palermo (Regione Siciliana — Repubblica Italiana)' } },
  { id: 'catania', name: 'Catania', coords: [15.08, 37.5], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step12: 'ITA', step13: 'UK', step14: 'ITA', step19: 'ITA_REP' }, historicalNames: { default: 'Catania (Base Aerosiluranti Gerbini & X. Fliegerkorps)', step12: 'Catania (Linea Difensiva dell\'Etna — Presidio Italo-Tedesco Hermann Göring)', step13: 'Catania (Liberata dall\'8ª Armata Britannica di Montgomery, 5 Agosto 1943)', step14: 'Catania (Sicilia — Amministrazione del Regno d\'Italia)', step19: 'Catania (Sicilia — Repubblica Italiana)' } },
  { id: 'siracusa', name: 'Siracusa', coords: [15.28, 37.07], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step12: 'UK', step14: 'ITA', step19: 'ITA_REP' }, historicalNames: { default: 'Siracusa (Piazzaforte Marittima Augusta-Siracusa)', step12: 'Siracusa (Occupata dall\'8ª Armata Britannica di Montgomery, 10 Luglio 1943)', step14: 'Siracusa (Sicilia — Amministrazione del Regno d\'Italia)', step19: 'Siracusa (Sicilia — Repubblica Italiana)' } },
  { id: 'trieste', name: 'Trieste', coords: [13.78, 45.65], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step13: 'OZAK', step17: 'OZAK', step18: 'AMG' }, historicalNames: { default: 'Trieste (Cantieri Riuniti dell\'Adriatico)', step13: 'Trieste (Capoluogo Operationszone Adriatisches Küstenland — Gauleiter Rainer, 10 Settembre 1943)', step17: 'Trieste (Presidio OZAK Wehrmacht / Assedio delle Avanguardie del 4° Esercito Jugoslavo NOVJ)', step18: 'Trieste (Zona A — Governo Militare Alleato AMG / Accordo di Duino)', step19: 'Trieste (Capitale Zona A — Territorio Libero di Trieste, 15 Settembre 1947)' } },
  { id: 'bolzano', name: 'Bolzano / Bozen', coords: [11.35, 46.5], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step13: 'OZAV', step17: 'OZAV', step18: 'ITA', step19: 'ITA_REP' }, historicalNames: { default: 'Bolzano / Bozen (Capoluogo Alto Adige — Regno d\'Italia)', step13: 'Bozen / Bolzano (Capoluogo Operationszone Alpenvorland — Gauleiter Franz Hofer, 10 Settembre 1943)', step17: 'Bozen / Bolzano (Roccaforte Ridotto Alpino Wehrmacht & OZAV — Resa di Caserta, 2 Maggio 1945)', step18: 'Bolzano / Bozen (Ritorno sotto Sovranità Italiana — Venezia Tridentina)', step19: 'Bolzano / Bozen (Accordo De Gasperi–Gruber — Repubblica Italiana)' } },
  { id: 'rodi', name: 'Rodi', coords: [28.22, 36.43], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step13: 'GER', step17: 'GER', step18: 'UK', step19: 'GRE' }, historicalNames: { default: 'Rodi (Capoluogo Possedimenti Italiani dell\'Egeo)', step13: 'Rodi (Occupazione Militare Tedesca — Divisione Rhodos, Settembre 1943)', step17: 'Rodi (Festung Rhodos — Guarnigione Wehrmacht Isolata sotto Blocco Alleato del Gen. Wagener)', step18: 'Rodi (Amministrazione Militare Britannica BMA del Dodecaneso — Resa di Simi 8 Maggio 1945)', step19: 'Ρόδος - Ródos (Dodecaneso Annesso al Regno di Grecia — Trattato di Parigi 1947)' } },
  { id: 'laspezia', name: 'La Spezia', coords: [9.82, 44.1], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step13: 'RSI', step17: 'ITA', step19: 'ITA_REP' }, historicalNames: { default: 'La Spezia (Arsenale Militare Marittimo — Base Regia Marina)', step13: 'La Spezia (RSI / Kriegsmarine — Base Flottiglia MAS & U-Boot Tirreno)', step17: 'La Spezia (Liberata dalla IV Zona Operativa Partigiana e dalla 92ª Divisione Buffalo USA — 24-25 Aprile 1945)', step19: 'La Spezia (Arsenale Marittimo — Repubblica Italiana)' } },
  { id: 'san_marino', name: 'San Marino', coords: [12.4617, 43.9406], isCapital: true, ownerKey: 'SMR', historicalNames: { default: 'San Marino (Serenissima Repubblica — Stato Neutrale)' } },
  { id: 'vaticano', name: 'Città del Vaticano', coords: [12.4507, 41.9041], isCapital: true, ownerKey: 'VAT', historicalNames: { default: 'Vaticano (Stato della Città del Vaticano — Sovranità Papale Neutrale)' } },
  { id: 'andorra_la_vella', name: 'Andorra la Vella', coords: [1.5218, 42.5063], isCapital: true, ownerKey: 'AND', historicalNames: { default: 'Andorra la Vella (Principat d\'Andorra — Coprincipato Neutrale)' } },
  { id: 'monaco', name: 'Monaco', coords: [7.4233, 43.7367], isCapital: true, ownerKey: 'MCO', owners: { default: 'MCO', step11: 'ITA', step13: 'GER', step16: 'MCO' }, historicalNames: { default: 'Monaco (Principato dei Grimaldi — Monte-Carlo & SBM)', step2: 'Monaco (Neutralità Sovrana — Vigilia Bellica)', step6: 'Monaco (Neutralità tra Vichy e Occupazione di Mentone)', step10: 'Monaco (Oasi Neutrale della Costa Azzurra)', step11: 'Monaco (Presidio 4ª Armata Regio Esercito — Op. Anton)', step13: 'Monaco (Occupazione Militare Tedesca — Operazione Achse)', step16: 'Monaco (Principato Sovrano Restaurato — Settembre 1944)' } },
  { id: 'marseille', name: 'Marseille', coords: [5.37, 43.3], isCapital: false, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'VIC', step11: 'GER', step15: 'FRA' }, historicalNames: { default: 'Marseille (Grand Port de l\'Empire Français)', step6: 'Marseille (Zone Libre / Vichy)', step11: 'Marseille (Occupazione Militare Wehrmacht / Op. Anton)', step15: 'Marseille (Liberata dalla 1ère Armée Française — 28 Agosto 1944)', step18: 'Marseille (GPRF — Sminamento del Vieux-Port & Ponte Aereo Ricostruzione)', step19: 'Marseille (Quatrième République — Porto Franco Industriale, Plan Monnet & Étang de Berre 1947)' } },
  { id: 'toulon', name: 'Toulon', coords: [5.93, 43.12], isCapital: false, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'VIC', step11: 'ITA', step13: 'GER', step15: 'FRA' }, historicalNames: { default: 'Toulon (Port Militaire de la Méditerranée)', step6: 'Toulon (Forces de Haute Mer — Vichy)', step11: 'Tolone (Presidio Militare Italiano & Wehrmacht / Autoaffondamento Flotta)', step13: 'Toulon (Presidio Militare Esclusivo della Wehrmacht — Operazione Achse)', step15: 'Toulon (Grand Port Militaire Libéré — 1ère Armée Française, 26 Agosto 1944)', step18: 'Toulon (GPRF — Recupero Relitti della Flotta Autoaffondata)', step19: 'Toulon (Quatrième République — Riapertura Arsenale della Marine Nationale, 1947)' } },
  { id: 'lyon', name: 'Lyon', coords: [4.83, 45.76], isCapital: false, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'VIC', step11: 'GER', step15: 'FRA' }, historicalNames: { default: 'Lyon (Métropole du Rhône)', step6: 'Lyon (Zone Libre / Capitale della Resistenza)', step11: 'Lyon (Occupazione Wehrmacht / Gestapo Barbie)', step15: 'Lyon (Liberata dalla 1ère DFL e Resistenza — 3 Settembre 1944)', step18: 'Lyon (GPRF — Ripristino Ponti su Rodano e Saona, Commissario Yves Farge)', step19: 'Lyon (Quatrième République — Polo Chimico-Siderurgico del Rodano & Plan Monnet 1947)' } },
  { id: 'nice', name: 'Nice', coords: [7.26, 43.71], isCapital: false, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'VIC', step11: 'ITA', step13: 'GER', step15: 'FRA' }, historicalNames: { default: 'Nice (Département des Alpes-Maritimes)', step6: 'Nice (Zone Libre / Vichy)', step11: 'Nizza (Capoluogo Zona di Occupazione Italiana — 4ª Armata)', step13: 'Nice (Occupazione Militare Tedesca — Disarmo 4ª Armata Italiana, Operazione Achse)', step15: 'Nice (Insurrezione Popolare e Liberazione — 28 Agosto 1944)', step18: 'Nice (GPRF — Sminamento Riviera & Presidio Confine Alpino)', step19: 'Nice (Quatrième République — Annessione Briga e Tenda, Trattato di Parigi 15 Settembre 1947)' } },
  { id: 'bordeaux', name: 'Bordeaux', coords: [-0.58, 44.84], isCapital: false, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'GER', step15: 'FRA' }, historicalNames: { default: 'Bordeaux (Port Atlantique Français)', step6: 'Bordeaux (Base Sommergibili BETASOM & Kriegsmarine)', step15: 'Bordeaux (Port Atlantique Libéré — FFI & Forces Alliées, 28 Août 1944)', step18: 'Bordeaux (GPRF — Riapertura Estuario della Gironda dopo la Resa del Médoc)', step19: 'Bordeaux (Quatrième République — Porto Atlantico & Base Militare Chaban-Delmas 1947)' } },
  { id: 'strasbourg', name: 'Strasbourg', coords: [7.75, 48.57], isCapital: false, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'GER', step16: 'FRA' }, historicalNames: { default: 'Strasbourg (Département du Bas-Rhin — France)', step6: 'Straßburg (Gau Baden-Elsaß — Deutsches Reich)', step16: 'Strasbourg (Alsace Libérée — 2e DB du Général Leclerc, 23 Novembre 1944)', step18: 'Strasbourg (GPRF — Reintegrazione Amministrativa Alsaziana & Giuramento di Koufra)', step19: 'Strasbourg (Quatrième République — Porto Fluviale sul Reno & Ricostruzione Frontiera 1947)' } },
  { id: 'metz', name: 'Metz', coords: [6.18, 49.12], isCapital: false, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'GER', step16: 'FRA' }, historicalNames: { default: 'Metz (Fortificazioni Lorena — France)', step6: 'Metz (CdZ-Gebiet Lothringen — Deutsches Reich)', step16: 'Metz (Lorraine Libérée — US Third Army del Gen. Patton, Novembre 1944)', step18: 'Metz (GPRF — Smobilitazione Frontiera della Mosella & Epuration)', step19: 'Metz (Quatrième République — Siderurgia Lorenese, Carbone della Saar & Plan Monnet 1947)' } },
  { id: 'brest', name: 'Brest', coords: [-4.48, 48.39], isCapital: false, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'GER', step15: 'FRA' }, historicalNames: { default: 'Brest (Grand Port Militaire de l\'Atlantique)', step6: 'Brest (U-Boot-Bunker 1. & 9. Flottille — Kriegsmarine)', step15: 'Brest (Liberata — U.S. VIII Corps, 19 Settembre 1944)', step18: 'Brest (GPRF — Sminamento Arsenale & Città Rasa al Suolo dalle Bombe)', step19: 'Brest (Quatrième République — Piano di Ricostruzione Mathon & Arsenale Atlantico 1947)' } },
  { id: 'dunkerque', name: 'Dunkerque', coords: [2.38, 51.03], isCapital: false, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'GER', step17: 'GER', step18: 'FRA' }, historicalNames: { default: 'Dunkerque (Canale della Manica — France)', step6: 'Dünkirchen (Militärverwaltung Belgien-Nordfrankreich / Evacuazione Dynamo)', step17: 'Festung Dünkirchen (Tasca Atlantica Isolata — Assediata dalla 1ª Brigata Corazzata Cecoslovacca / Vizeadmiral Frisius)', step18: 'Dunkerque (Liberata — Resa del Vizeadmiral Frisius, 9 Maggio 1945)', step19: 'Dunkerque (Quatrième République — Ricostruzione Porto Nord & Acciaierie, Plan Monnet 1947)' } },
  { id: 'lorient', name: 'Lorient', coords: [-3.36, 47.74], isCapital: false, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'GER', step17: 'GER', step18: 'FRA' }, historicalNames: { default: 'Lorient (Arsenale Navale della Bretagna)', step6: 'Lorient (Base U-Boot Keroman — BdU Karl Dönitz)', step17: 'Festung Lorient (Tasca Atlantica Isolata — Gen. Fahrmbacher)', step18: 'Lorient (Liberata — Resa della Sacca Tedesca, 10 Maggio 1945)', step19: 'Lorient (Quatrième République — Ricostruzione Urbana & Arsenale di Keroman, 1947)' } },
  { id: 'saint_nazaire', name: 'Saint-Nazaire', coords: [-2.21, 47.27], isCapital: false, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'GER', step17: 'GER', step18: 'FRA' }, historicalNames: { default: 'Saint-Nazaire (Cantieri Navali & Bacino Joubert)', step6: 'Saint-Nazaire (Base U-Boot Atlantico)', step17: 'Festung Saint-Nazaire (Tasca Atlantica Isolata — Gen. Junck)', step18: 'Saint-Nazaire (Liberata — Resa della Sacca dell\'Estuario della Loira, 11 Maggio 1945)', step19: 'Saint-Nazaire (Quatrième République — Rilancio Cantieri di Penhoët & Plan Monnet, 1947)' } },
  { id: 'la_rochelle', name: 'La Rochelle', coords: [-1.15, 46.16], isCapital: false, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'GER', step17: 'GER', step18: 'FRA' }, historicalNames: { default: 'La Rochelle (Porto Storico & La Pallice)', step6: 'La Rochelle (Base U-Boot La Pallice)', step17: 'Festung La Rochelle (Tasca Atlantica Isolata — Vizeadmiral Schirlitz)', step18: 'La Rochelle (Liberata — Resa Tedesca de La Pallice, 8 Maggio 1945)', step19: 'La Rochelle (Quatrième République — Rilancio Porto Commerciale de La Pallice, 1947)' } },
  { id: 'portsmouth', name: 'Portsmouth', coords: [-1.09, 50.8], isCapital: false, ownerKey: 'UK', historicalNames: { default: 'Portsmouth (Royal Navy Dockyard / Spithead)', step14: 'Portsmouth & Southwick House (Cuore Marittimo Overlord / D-Day)', step18: 'Portsmouth (Smobilitazione Royal Navy Post-VE/VJ Day)', step19: 'Portsmouth (HMNB Portsmouth — Riconversione & Guerra Fredda)' } },
  { id: 'scapa_flow', name: 'Scapa Flow', coords: [-3.05, 58.89], isCapital: false, ownerKey: 'UK', historicalNames: { default: 'Scapa Flow (Home Fleet Anchorage / Orcadi)', step14: 'Scapa Flow (Home Fleet & Completamento Churchill Barriers)', step19: 'Scapa Flow (Riserva Navale Postbellica — Orcadi)' } },
  { id: 'gibraltar', name: 'Gibraltar', coords: [-5.352, 36.134], isCapital: true, ownerKey: 'GIB', historicalNames: { default: 'Gibraltar (The Rock / Force H — Stretto di Gibilterra)', step18: 'Gibraltar (Crown Colony — Rimpatrio Civili Postbellico)', step19: 'Gibraltar (Crown Colony & Royal Navy Strait Fortress — 1947)' } },
  { id: 'valletta', name: 'Valletta', coords: [14.51, 35.9], isCapital: true, ownerKey: 'UK', historicalNames: { default: 'Valletta (Fortezza Navale di Malta / Bastione del Mediterraneo)', step12: 'Valletta (George Cross Island — Trampolino Alleato Operazione Husky)', step19: 'Valletta (Malta — Costituzione MacMichael di Autogoverno, Set 1947)' } },
  { id: 'warszawa', name: 'Warszawa', coords: [21.01, 52.22], isCapital: (s: number) => s < 5 || s >= 17, ownerKey: 'POL', owners: { default: 'POL', step5: 'GER', step17: 'POL' }, historicalNames: { default: 'Warszawa (Rzeczpospolita Polska)', step5: 'Warschau (Generalgouvernement)', step17: 'Warszawa (Capitale Rasa al Suolo Liberata dall\'Armata Rossa e 1ª Armata Polacca — 17 Gennaio 1945)', step18: 'Warszawa (Capitale della Repubblica di Polonia — Ricostruzione)', step19: 'Warszawa (Rzeczpospolita Polska — Ricostruzione della Capitale, 1947)' } },
  { id: 'krakow', name: 'Kraków', coords: [19.94, 50.06], isCapital: (s: number) => s >= 5 && s < 17, ownerKey: 'POL', owners: { default: 'POL', step5: 'GER', step17: 'POL' }, historicalNames: { default: 'Kraków (Druga Rzeczpospolita)', step5: 'Krakau (Sitz des Generalgouverneurs — Frank)', step17: 'Kraków (Liberata dall\'Armata Rossa — 19 Gennaio 1945)', step18: 'Kraków (Repubblica di Polonia — Voivodato di Cracovia)', step19: 'Kraków (Repubblica di Polonia — Centro Culturale Postbellico, 1947)' } },
  { id: 'gdynia', name: 'Gdynia', coords: [18.53, 54.52], isCapital: false, ownerKey: 'POL', owners: { default: 'POL', step5: 'GER', step17: 'POL' }, historicalNames: { default: 'Gdynia (Porto del Corridoio — Druga Rzeczpospolita)', step5: 'Gotenhafen (Reichsgau Danzig-Westpreußen — Kriegsmarine)', step17: 'Gdynia (Liberata dal 2° Fronte Bielorusso — Marzo 1945)', step18: 'Gdynia (Porto sul Baltico — Repubblica di Polonia)' } },
  { id: 'danzig', name: 'Danzig', coords: [18.64, 54.35], isCapital: false, ownerKey: 'DANZIG', owners: { default: 'DANZIG', step5: 'GER', step17: 'POL' }, historicalNames: { default: 'Danzig (Freie Stadt Danzig)', step5: 'Danzig (Reichsgau Danzig-Westpreußen)', step17: 'Gdańsk / Danzica (Espugnata dall\'Armata Rossa — 30 Marzo 1945)', step18: 'Gdańsk (Porto di Danzica — Repubblica di Polonia)', step19: 'Gdańsk (Rzeczpospolita Polska — Cantieri Navali sul Baltico, 1947)' } },
  { id: 'lwow', name: 'Lwów', coords: [24.03, 49.84], isCapital: false, ownerKey: 'POL', owners: { default: 'POL', step5: 'SOV', step9: 'GER', step15: 'SOV' }, historicalNames: { default: 'Lwów (Kresy Południowo-Wschodnie — Polonia)', step5: 'Львов - Lvov (RSS Ucraina — URSS)', step9: 'Lemberg (Distrikt Galizien — Generalgouvernement)', step15: 'Львов - Lvov (Liberata dal 1° Fronte Ucraino — 27 Luglio 1944)' } },
  { id: 'wilno', name: 'Wilno', coords: [25.28, 54.69], isCapital: false, ownerKey: 'POL', owners: { default: 'POL', step5: 'LIT', step6: 'SOV', step9: 'GER', step15: 'SOV' }, historicalNames: { default: 'Wilno (Kresy Północno-Wschodnie — Polonia)', step5: 'Vilnius (Lietuvos Respublika)', step6: 'Вильнюс - Vilnius (RSS Lituana — URSS)', step9: 'Wilna (Generalbezirk Litauen — Reichskommissariat Ostland)', step15: 'Вильнюс - Vilnius (Liberata dal 3° Fronte Bielorusso — 13 Luglio 1944)' } },
  { id: 'praha', name: 'Praha', coords: [14.43, 50.07], isCapital: true, ownerKey: 'CZE', owners: { default: 'CZE', step3: 'GER', step18: 'CZE' }, historicalNames: { default: 'Praha (Československá republika)', step3: 'Prag (Protektorat Böhmen und Mähren)', step18: 'Praha (Terza Repubblica Cecoslovacca — Rivolta di Praga & Liberazione Maggio 1945)' } },
  { id: 'bratislava', name: 'Bratislava', coords: [17.11, 48.14], isCapital: (s: number) => s >= 3 && s < 17, ownerKey: 'SLO', owners: { default: 'CZE', step3: 'SLO', step17: 'CZE' }, historicalNames: { default: 'Bratislava (Československo)', step3: 'Bratislava (Slovenská republika — Tiso)', step17: 'Bratislava (Liberata dall\'Armata Rossa — 4 Aprile 1945 / Ritorno alla Repubblica Cecoslovacca)' } },
  { id: 'budapest', name: 'Budapest', coords: [19.04, 47.5], isCapital: true, ownerKey: 'HUN', owners: { default: 'HUN', step17: 'HUN' }, historicalNames: { default: 'Budapest (Magyar Királyság — Horthy)', step16: 'Budapest (Assedio di Festung Budapest — 70.000 Truppe Asse Accerchiate)', step17: 'Budapest (Liberata dall\'Armata Rossa — Febbraio 1945 / Governo Nazionale Provvisorio)', step19: 'Budapest (Seconda Repubblica d\'Ungheria — Tildy / Nagy, Trattato di Parigi 1947)' } },
  { id: 'cluj', name: 'Cluj', coords: [23.59, 46.77], isCapital: false, ownerKey: 'ROM', owners: { default: 'ROM', step7: 'HUN', step16: 'ROM' }, historicalNames: { default: 'Cluj (Regatul României — Transilvania)', step7: 'Kolozsvár (Magyar Királyság — Észak-Erdély)', step16: 'Cluj (Transilvania Settentrionale Liberata & Restituita alla Romania, Ottobre 1944)' } },
  { id: 'bucuresti', name: 'București', coords: [26.1, 44.43], isCapital: true, ownerKey: 'ROM', historicalNames: { default: 'București (România Mare)', step7: 'București (Statul Național Legionar — Antonescu)', step8: 'București (Regimul Antonescu / Patto Tripartito)', step15: 'București (Colpo di Stato Re Michele I — Romania Cobelligerante Alleata)', step19: 'București (Regno di Romania fino al Dic 1947 — Trattato di Parigi)' } },
  { id: 'ploiesti', name: 'Ploiești', coords: [26.02, 44.94], isCapital: false, ownerKey: 'ROM', historicalNames: { default: 'Ploiești (Campi Petroliferi Astra Română)', step7: 'Ploiești (Deutsche Heeresmission / Pozzi Strategici Asse)', step12: 'Ploiești (Campi Petroliferi Strategici Asse — Vigilia Operazione Tidal Wave)', step15: 'Ploiești (Liberata dall\'Armata Rossa e Truppe Romene — 30 Agosto 1944)' } },
  { id: 'beograd', name: 'Београд - Beograd', coords: [20.46, 44.82], isCapital: true, ownerKey: 'YUG', owners: { default: 'YUG', step8: 'GER', step16: 'DFJ' }, historicalNames: { default: 'Београд - Beograd (Regno di Jugoslavia)', step8: 'Belgrad (Militärverwaltung in Serbien / Wehrmacht)', step9: 'Београд - Beograd (Governo di Salvezza Nazionale del Gen. Nedić)', step16: 'Београд - Beograd (Liberata dall\'Armata Rossa e dai Partigiani di Tito — 20 Ottobre 1944)', step17: 'Београд - Beograd (Capitale della Demokratska Federativna Jugoslavija — Maresciallo Tito)', step19: 'Београд - Beograd (Capitale della Repubblica Federativa Popolare di Jugoslavia — Tito)' } },
  { id: 'zagreb', name: 'Zagreb', coords: [15.98, 45.81], isCapital: (s: number) => s >= 8 && s < 18, ownerKey: 'YUG', owners: { default: 'YUG', step8: 'CRO', step18: 'DFJ' }, historicalNames: { default: 'Zagreb (Savska Banovina — Jugoslavia)', step4: 'Zagreb (Banovina Hrvatska)', step8: 'Zagreb (Glavni grad Nezavisne Države Hrvatske — NDH)', step17: 'Zagreb (Ridotto Ustaša e Wehrmacht Heeresgruppe E sotto Assedio — Ante Pavelić)', step18: 'Zagreb (Liberata dalla 1ª e 2ª Armata Jugoslava — Maggio 1945 / RP Croazia)' } },
  { id: 'sarajevo', name: 'Sarajevo', coords: [18.41, 43.85], isCapital: false, ownerKey: 'YUG', owners: { default: 'YUG', step8: 'CRO', step17: 'DFJ' }, historicalNames: { default: 'Sarajevo (Drinska Banovina — Jugoslavia)', step8: 'Sarajevo (Velika župa Vrhbosna — Nezavisna Država Hrvatska)', step17: 'Sarajevo (Operazione Sarajevo — Liberata dal 2°, 3° e 5° Corpo NOVJ, 6 Aprile 1945)' } },
  { id: 'ljubljana', name: 'Ljubljana', coords: [14.51, 46.05], isCapital: false, ownerKey: 'YUG', owners: { default: 'YUG', step8: 'ITA', step13: 'OZAK', step18: 'DFJ' }, historicalNames: { default: 'Ljubljana (Dravska Banovina — Jugoslavia)', step8: 'Lubiana (Capoluogo Provincia di Lubiana — Regno d\'Italia)', step13: 'Laibach / Lubiana (Operationszone Adriatisches Küstenland — Leon Rupnik & Slovensko Domobranstvo)', step17: 'Laibach / Lubiana (Presidio OZAK Wehrmacht & Slovensko Domobranstvo)', step18: 'Ljubljana (Liberata il 9 Maggio 1945 — Repubblica Popolare di Slovenia / Jugoslavia)' } },
  { id: 'split', name: 'Split', coords: [16.44, 43.51], isCapital: false, ownerKey: 'YUG', owners: { default: 'YUG', step8: 'ITA', step13: 'CRO', step16: 'DFJ' }, historicalNames: { default: 'Split (Primorska Banovina — Jugoslavia)', step8: 'Spalato (Capoluogo Provincia di Spalato / Dalmazia — Regno d\'Italia)', step13: 'Spalato / Split (Annessione alla NDH Croata — Presidio Wehrmacht)', step16: 'Split (Liberata dall\'8° Corpo d\'Armata della NOVJ — 26 Ottobre 1944)', step17: 'Split (Base Navale e Logistica della NOVJ e della Mornarica Jugoslava)' } },
  { id: 'athina', name: 'Αθήνα - Athīna', coords: [23.73, 37.98], isCapital: true, ownerKey: 'GRE', owners: { default: 'GRE', step8: 'GER', step16: 'GRE' }, historicalNames: { default: 'Αθήνα - Athīna (Vasileion tīs Ellados)', step7: 'Αθήνα - Athīna ("OXI" — Belligerante Alleato)', step8: 'Αθήνα - Athīna (Ellīnikī Politeia / Occupazione Italo-Tedesca)', step13: 'Αθήνα - Athīna (Occupazione Militare Tedesca Esclusiva — Militärverwaltung Südgriechenland)', step16: 'Αθήνα - Athīna (Dekemvriana: Battaglia di Atene — Forze Britanniche Scobie vs ELAS)', step17: 'Αθήνα - Athīna (Post-Varkiza — Reggenza Damaskinos & Crisi Politica)', step18: 'Αθήνα - Athīna (Regno di Grecia — Terrore Bianco & Vigilia Guerra Civile)', step19: 'Αθήνα - Athīna (Regno di Grecia — Re Paolo I, PM Sofoulis & Dottrina Truman 1947)' } },
  { id: 'sofia', name: 'София - Sofia', coords: [23.32, 42.7], isCapital: true, ownerKey: 'BUL', owners: { default: 'BUL', step15: 'BUL' }, historicalNames: { default: 'София - Sofia (Zarato di Bulgaria)', step8: 'София - Sofia (Adesione al Patto Tripartito Asse)', step15: 'София - Sofia (Colpo di Stato del Fronte Patriottico & Ingresso Armata Rossa — 9 Settembre 1944)', step17: 'София - Sofia (Bulgaria Belligerante a Fianco degli Alleati — 1ª Armata Bulgara sul Fronte Austriaco)', step19: 'София - Sofia (Repubblica Popolare di Bulgaria — Georgi Dimitrov, 1947)' } },
  { id: 'tirana', name: 'Tirana', coords: [19.82, 41.33], isCapital: true, ownerKey: 'ALB', owners: { default: 'ALB', step4: 'ITA', step13: 'GER', step16: 'ALB' }, historicalNames: { default: 'Tirana (Regno d\'Albania — Re Zog I)', step4: 'Tirana (Mbretëria Shqiptare — Unione Personale Corona d\'Italia)', step13: 'Tirana (Occupazione Militare Tedesca — Wehrmacht Heeresgruppe E & Këshilli i Naltë i Regjencës)', step16: 'Tirana (Liberata dall\'Esercito di Liberazione Nazionale Albanese — 17 Novembre 1944)', step17: 'Tirana (Governo Democratico d\'Albania — Enver Hoxha)' } },
  { id: 'helsinki', name: 'Helsinki', coords: [24.93, 60.16], isCapital: true, ownerKey: 'FIN', historicalNames: { default: 'Helsinki (Suomen Tasavalta)', step5: 'Helsinki (Talvisota / Guerra d\'Inverno)', step9: 'Helsinki (Jatkosota / Guerra di Continuazione)', step18: 'Helsinki (Repubblica di Finlandia — Presidenza Mannerheim / Paasikivi, Post-Armistizio)' } },
  { id: 'mariehamn', name: 'Mariehamn', coords: [19.94, 60.1], isCapital: false, ownerKey: 'FIN', historicalNames: { default: 'Mariehamn (Åland / Demilitariserad Zon)' } },
  { id: 'stockholm', name: 'Stockholm', coords: [18.06, 59.33], isCapital: true, ownerKey: 'SWE', historicalNames: { default: 'Stockholm (Konungariket Sverige / Neutralitet)' } },
  { id: 'oslo', name: 'Oslo', coords: [10.75, 59.91], isCapital: true, ownerKey: 'NOR', owners: { default: 'NOR', step6: 'GER', step18: 'NOR' }, historicalNames: { default: 'Oslo (Kongeriket Norge)', step6: 'Oslo (Reichskommissariat Norwegen / Quisling & Terboven)', step18: 'Oslo (Norvegia Liberata — Ritorno di Re Haakon VII, Maggio 1945)' } },
  { id: 'reykjavik', name: 'Reykjavík', coords: [-21.94, 64.15], isCapital: true, ownerKey: 'ICE', owners: { default: 'ICE', step6: 'UK', step9: 'USA', step15: 'ICE' }, historicalNames: { default: 'Reykjavík (Konungsríkið Ísland / Neutralitet)', step6: 'Reykjavík (Operazione Fork — Occupazione Preventiva Britannica)', step9: 'Reykjavík (Iceland Base Command USA — Operazione Indigo & Blessað stríðið)', step14: 'Reykjavík (Vigilia Repubblica d\'Islanda — Plebiscito Maggio 1944 & Difesa USA)', step15: 'Reykjavík (Lýðveldið Ísland — Proclamazione Repubblica 17 Giugno 1944)', step18: 'Reykjavík (Lýðveldið Ísland — Smilitarizzazione Postbellica & Nýsköpun, 1945)', step19: 'Reykjavík (Lýðveldið Ísland — Ritiro Militare USA & Membro ONU, 1947)' } },
  { id: 'narvik', name: 'Narvik', coords: [17.43, 68.44], isCapital: false, ownerKey: 'NOR', owners: { default: 'NOR', step6: 'GER', step18: 'NOR' }, historicalNames: { default: 'Narvik (Terminale Ferroviario del Ferro Svedese)', step6: 'Narvik (Battaglie di Narvik / Presidio Gebirgsjäger Wehrmacht)', step18: 'Narvik (Porto Norvegese Liberato — Ricostruzione, Maggio 1945)' } },
  { id: 'kobenhavn', name: 'København', coords: [12.57, 55.68], isCapital: true, ownerKey: 'DEN', historicalNames: { default: 'København (Kongeriget Danmark)', step6: 'København (Militärbefehlshaber Dänemark / Occupazione Tedesca)', step18: 'København (Danimarca Liberata — Resa del Generale Lindemann, 5 Maggio 1945)' } },
  { id: 'tallinn', name: 'Tallinn', coords: [24.75, 59.44], isCapital: true, ownerKey: 'EST', owners: { default: 'EST', step6: 'SOV', step9: 'GER', step16: 'SOV' }, historicalNames: { default: 'Tallinn (Eesti Vabariik)', step6: 'Таллин - Tallinn (RSS Estone — URSS)', step9: 'Reval (Generalbezirk Estland — Reichskommissariat Ostland)', step16: 'Таллин - Tallinn (RSS Estone — Liberata dall\'Armata Rossa, 22 Settembre 1944)' } },
  { id: 'riga', name: 'Rīga', coords: [24.11, 56.95], isCapital: true, ownerKey: 'LAT', owners: { default: 'LAT', step6: 'SOV', step9: 'GER', step16: 'SOV' }, historicalNames: { default: 'Rīga (Latvijas Republika)', step6: 'Рига - Riga (RSS Lettone — URSS)', step9: 'Riga (Reichskommissariat Ostland)', step16: 'Рига - Riga (RSS Lettone — Liberata dall\'Armata Rossa, 13 Ottobre 1944)' } },
  { id: 'kaunas', name: 'Kaunas', coords: [23.9, 54.9], isCapital: true, ownerKey: 'LIT', owners: { default: 'LIT', step6: 'SOV', step9: 'GER', step15: 'SOV' }, historicalNames: { default: 'Kaunas (Capitale Provvisoria Lituana)', step6: 'Каунас - Kaunas (RSS Lituana — URSS)', step9: 'Kauen (Generalbezirk Litauen — Reichskommissariat Ostland)', step15: 'Каунас - Kaunas (RSS Lituana — Liberata dall\'Armata Rossa, 1° Agosto 1944)' } },
  { id: 'madrid', name: 'Madrid', coords: [-3.7, 40.41], isCapital: true, ownerKey: 'SPR', owners: { default: 'SPR', step4: 'SPA' }, historicalNames: { default: 'Madrid (República Española — No Pasarán)', step4: 'Madrid (Capital de España — Dictadura de Franco)' } },
  { id: 'barcelona', name: 'Barcelona', coords: [2.17, 41.38], isCapital: false, ownerKey: 'SPR', owners: { default: 'SPR', step4: 'SPA' }, historicalNames: { default: 'Barcelona (Generalitat de Catalunya / República Española)', step4: 'Barcelona (Capitanía General de Cataluña — Dictadura de Franco)' } },
  { id: 'burgos', name: 'Burgos', coords: [-3.7, 42.34], isCapital: (s: number) => s < 4, ownerKey: 'SPA', historicalNames: { default: 'Burgos (Junta de Defensa Nacional / Bando Nazionale)', step4: 'Burgos (Sede del Gobierno Nacional de Franco)' } },
  { id: 'sevilla', name: 'Sevilla', coords: [-5.99, 37.38], isCapital: false, ownerKey: 'SPA', historicalNames: { default: 'Sevilla (Bando Nazionale — Queipo de Llano)', step4: 'Sevilla (Región Militar Sur — España)' } },
  { id: 'lisboa', name: 'Lisboa', coords: [-9.14, 38.72], isCapital: true, ownerKey: 'POR', historicalNames: { default: 'Lisboa (Estado Novo — Salazar / Neutralidade)' } },
  { id: 'tripoli', name: 'Tripoli', coords: [13.19, 32.88], isCapital: true, ownerKey: 'ITA', owners: { default: 'ITA', step12: 'UK' }, historicalNames: { default: 'Tripoli (Governatorato Generale della Libia — Italia)', step12: 'Tripoli (British Military Administration of Tripolitania, Gennaio 1943)', step19: 'Tripoli (British Military Administration of Tripolitania — Post-Parigi 1947)' } },
  { id: 'benghazi', name: 'Bengasi', coords: [20.06, 32.11], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step9: 'UK', step10: 'ITA', step11: 'UK' }, historicalNames: { default: 'Bengasi (Comando Militare Cirenaica — Libia Italiana)', step9: 'Benghazi (Occupazione 8ª Armata Britannica — Crusader)', step10: 'Bengasi (Base Logistica Panzerarmee Afrika)', step11: 'Benghazi (Liberata dall\'8ª Armata di Montgomery, 20 Nov 1942)', step19: 'Benghazi (British Military Administration of Cyrenaica)' } },
  { id: 'tobruk', name: 'Tobruk', coords: [23.97, 32.08], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step8: 'UK', step10: 'GER', step11: 'UK' }, historicalNames: { default: 'Tobruk (Piazzaforte della Cirenaica — Libia Italiana)', step8: 'Tobruk (Assedio dell\'Afrikakorps / 9th Australian Division)', step9: 'Tobruk (Liberata dall\'Operazione Crusader)', step10: 'Tobruk (Conquistata da Rommel, 21 Giugno 1942)', step11: 'Tobruk (Liberata dall\'8ª Armata Britannica, 13 Nov 1942)', step19: 'Tobruk (British Military Administration of Cyrenaica)' } },
  { id: 'el_alamein', name: 'العلمين - El Alamein', coords: [28.95, 30.84], isCapital: false, ownerKey: 'EGY', historicalNames: { default: 'العلمين - El Alamein (Regno d\'Egitto)', step10: 'العلمين - El Alamein (Linea Difensiva 8ª Armata / Massima Penetrazione Asse)', step11: 'العلمين - El Alamein (Sfondamento Decisivo 8ª Armata Montgomery, 4 Nov 1942)', step19: 'العلمين - El Alamein (Regno d\'Egitto Sovrano)' } },
  { id: 'cairo', name: 'القاهرة - Al-Qahirah', coords: [31.23, 30.04], isCapital: true, ownerKey: 'EGY', historicalNames: { default: 'القاهرة - Al-Qahirah (Regno d\'Egitto / HQ Middle East Command Britannico)', step19: 'القاهرة - Al-Qahirah (Regno d\'Egitto Sovrano — Evacuazione Britannica, Marzo 1947)' } },
  { id: 'alexandria', name: 'الإسكندرية - Al-Iskandariyah', coords: [29.91, 31.2], isCapital: false, ownerKey: 'EGY', historicalNames: { default: 'الإسكندرية - Al-Iskandariyah (HQ Mediterranean Fleet — Royal Navy)', step19: 'الإسكندرية - Al-Iskandariyah (Porto Sovrano Egiziano — Post-Evacuazione Britannica)' } },
  { id: 'port_said', name: 'بور سعيد - Port Said', coords: [32.3, 31.26], isCapital: false, ownerKey: 'EGY', historicalNames: { default: 'بور سعيد - Port Said (Ingresso Canale di Suez)', step19: 'بور سعيد - Port Said (Zona del Canale di Suez — Presidio Britannico)' } },
  { id: 'suez', name: 'السويس - Suez', coords: [32.55, 29.97], isCapital: false, ownerKey: 'EGY', historicalNames: { default: 'السويس - Suez (Sbocco Canale di Suez / Mar Rosso)', step19: 'السويس - Suez (Zona del Canale di Suez — Presidio Britannico)' } },
  { id: 'mersa_matruh', name: 'مرسى مطروح - Mersa Matruh', coords: [27.24, 31.35], isCapital: false, ownerKey: 'EGY', owners: { default: 'EGY', step10: 'GER', step11: 'EGY', step19: 'EGY' }, historicalNames: { default: 'مرسى مطروح - Mersa Matruh (Piazzaforte Western Desert)', step7: 'مرسى مطروح - Mersa Matruh (Fronte Sidi Barrani / Western Desert Force)', step9: 'مرسى مطروح - Mersa Matruh (Base Avanzata VIII Armata — Crusader)', step10: 'Mersa Matruh (Presa da Rommel — Avanzata Panzerarmee)', step11: 'مرسى مطروح - Mersa Matruh (Riconquistata dall\'8ª Armata Montgomery)', step19: 'مرسى مطروح - Mersa Matruh (Regno d\'Egitto — Governatorato del Deserto Occidentale)' } },
  { id: 'khartoum', name: 'الخرطوم - Khartoum', coords: [32.55, 15.5], isCapital: true, ownerKey: 'UK', historicalNames: { default: 'الخرطوم - Khartoum (Sudan Anglo-Egiziano / Sudan Defence Force)', step19: 'الخرطوم - Khartoum (Condominio Anglo-Egiziano — Post-Conferenza di Juba 1947)' } },
  { id: 'algiers', name: 'Algeri', coords: [3.05, 36.75], isCapital: true, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'VIC', step11: 'USA', step14: 'FRA', step19: 'FRA' }, historicalNames: { default: 'Alger (Préfecture d\'Alger — France)', step6: 'Alger (Gouvernement Général — Vichy)', step11: 'Alger (Sbarco Alleato Torch / Amministrazione Darlan-Giraud)', step14: 'Alger (GPRF — Algérie Française)', step19: 'Alger (Statut Organique de l\'Algérie — Settembre 1947)' } },
  { id: 'oran', name: 'Oran', coords: [-0.63, 35.69], isCapital: false, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'VIC', step11: 'USA', step14: 'FRA', step19: 'FRA' }, historicalNames: { default: 'Oran (Département d\'Oran — France)', step6: 'Mers el-Kébir (Attacco Navale Britannico Catapult, 3 Luglio 1940)', step11: 'Oran (Sbarco Alleato Torch / Center Task Force USA)', step19: 'Oran (Département d\'Oran & Mers-el-Kébir — Union Française)' } },
  { id: 'tunis', name: 'Tunisi', coords: [10.18, 36.8], isCapital: true, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'VIC', step11: 'GER', step12: 'FRA', step19: 'FRA' }, historicalNames: { default: 'Tunis (Protectorat Français de Tunisie)', step6: 'Tunis (Protectorat de Tunisie — Vichy)', step11: 'Tunisi (Testa di Ponte dell\'Asse — Gen. Walther Nehring)', step12: 'Tunis (Liberazione Alleata — Sfilata della Vittoria 1ª e 8ª Armata, Maggio 1943)', step19: 'Tunis (Protectorat de Tunisie — Union Française / Lamine Bey)' } },
  { id: 'bizerte', name: 'Bizerte', coords: [9.87, 37.27], isCapital: false, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'VIC', step11: 'GER', step12: 'FRA', step19: 'FRA' }, historicalNames: { default: 'Bizerte (Base Navale della Marine Nationale — Tunisie)', step6: 'Bizerte (Protettorato di Tunisia — Vichy)', step11: 'Biserta (Occupazione Italo-Tedesca / Op. Anton)', step12: 'Bizerte (Base Navale Alleata nel Canale di Sicilia, Maggio 1943)', step19: 'Bizerte (Base Navale Francese — Quatrième République)' } },
  { id: 'casablanca', name: 'Casablanca', coords: [-7.58, 33.57], isCapital: false, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'VIC', step11: 'USA', step14: 'FRA', step19: 'FRA' }, historicalNames: { default: 'Casablanca (Port Atlantique du Maroc)', step6: 'Casablanca (Résidence Générale Vichy)', step11: 'Casablanca (Sbarco Alleato Torch / Western Task Force Patton)', step19: 'Casablanca (Protectorat Français du Maroc — Union Française)' } },
  { id: 'dakar', name: 'Dakar', coords: [-17.44, 14.69], isCapital: true, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'VIC', step11: 'FRA', step19: 'FRA' }, historicalNames: { default: 'Dakar (Capitale Afrique Occidentale Française)', step6: 'Dakar (Haut-Commissariat AOF — Vichy)', step7: 'Dakar (Operazione Menace Respinta — Boisson)', step11: 'Dakar (Ralliement agli Alleati — Boisson / Darlan)', step19: 'Dakar (Haut-Commissariat AOF — Union Française, René Barthes)' } },
  { id: 'brazzaville', name: 'Brazzaville', coords: [15.28, -4.26], isCapital: true, ownerKey: 'FRA', historicalNames: { default: 'Brazzaville (Capitale Afrique Équatoriale Française)', step6: 'Brazzaville (Capitale de la France Libre — De Gaulle / Éboué)', step19: 'Brazzaville (Capitale AEF — Union Française, Charles Luizet)' } },
  { id: 'leopoldville', name: 'Léopoldville', coords: [15.31, -4.32], isCapital: true, ownerKey: 'BEL', historicalNames: { default: 'Léopoldville (Congo Belge / Force Publique)' } },
  { id: 'addis_ababa', name: 'Addis Abeba', coords: [38.74, 9.02], isCapital: true, ownerKey: 'ITA', owners: { default: 'ETH', step1: 'ITA', step8: 'ETH', step19: 'ETH' }, historicalNames: { default: 'አዲስ አበባ - Addis Abeba (Impero d\'Etiopia)', step1: 'Addis Abeba (Capitale dell\'Africa Orientale Italiana — Sede Viceré)', step8: 'አዲስ አበባ - Addis Ababa (Liberazione Alleata / Rientro Trionfale del Negus)', step19: 'አዲስ አበባ - Addis Abeba (Impero Sovrano d\'Etiopia — Post-Parigi 1947)' } },
  { id: 'asmara', name: 'Asmara', coords: [38.92, 15.33], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step8: 'UK', step19: 'UK' }, historicalNames: { default: 'Asmara (Governatorato dell\'Eritrea — AOI)', step8: 'Asmara (Occupazione Militare Britannica — OETA)', step19: 'Asmara (British Military Administration of Eritrea — BMA)' } },
  { id: 'mogadishu', name: 'Mogadiscio', coords: [45.34, 2.04], isCapital: false, ownerKey: 'ITA', owners: { default: 'ITA', step8: 'UK', step19: 'UK' }, historicalNames: { default: 'Mogadiscio (Governatorato della Somalia — AOI)', step8: 'Mogadishu (Occupazione Militare Britannica — OETA)', step19: 'Mogadishu (British Military Administration of Somalia — BMA)' } },
  { id: 'nairobi', name: 'Nairobi', coords: [36.82, -1.29], isCapital: true, ownerKey: 'UK', historicalNames: { default: 'Nairobi (Colonia del Kenya / King\'s African Rifles)' } },
  { id: 'pretoria', name: 'Pretoria', coords: [28.18, -25.74], isCapital: true, ownerKey: 'SAF', historicalNames: { default: 'Pretoria (Unione Sudafricana — Union Buildings)' } },
  { id: 'cape_town', name: 'Città del Capo', coords: [18.42, -33.92], isCapital: false, ownerKey: 'SAF', historicalNames: { default: 'Cape Town (Rotta del Capo / Simon\'s Town Naval Yard)' } },
  { id: 'tangier', name: 'Tangeri', coords: [-5.8, 35.77], isCapital: false, ownerKey: 'TANGER', owners: { default: 'TANGER', step6: 'SPA', step18: 'TANGER', step19: 'TANGER' }, historicalNames: { default: 'Tánger (Zona de Control Internacional)', step6: 'Tánger (Ocupación Militar Española / Alto Comisariado)', step18: 'Tanger (Amministrazione Internazionale Restaurata — Ott 1945)', step19: 'Tanger (Zone Internationale de Tanger — Statut de 1923)' } },
  { id: 'kyiv', name: 'Киев - Kiev', coords: [30.52, 50.45], isCapital: false, ownerKey: 'SOV', owners: { default: 'SOV', step9: 'GER', step14: 'SOV' }, historicalNames: { default: 'Киев - Kiev (Capitale della RSS Ucraina — URSS)', step9: 'Kiew (Hauptstadt Reichskommissariat Ukraine — Koch)', step14: 'Киев - Kiev (Capitale della RSS Ucraina Liberata dall\'Armata Rossa, Novembre 1943)' } },
  { id: 'kharkiv', name: 'Харьков - Charkov', coords: [36.23, 50.0], isCapital: false, ownerKey: 'SOV', owners: { default: 'SOV', step9: 'GER', step13: 'SOV' }, historicalNames: { default: 'Харьков - Charkov (Fabbrica Carri KhPZ n. 183 — URSS)', step9: 'Charkow (Militärverwaltung Wehrmacht / Heeresgebiet Süd)', step13: 'Харьков - Charkov (Liberazione Sovietica Definitiva — Operazione Rumjancev, 23 Agosto 1943)' } },
  { id: 'stalingrad', name: 'Сталинград - Stalingrad', coords: [44.51, 48.71], isCapital: false, ownerKey: 'SOV', historicalNames: { default: 'Сталинград - Stalingrad (Fabbrica Trattori Dzeržinskij — URSS)', step10: 'Сталинград - Stalingrad (Battaglia Urbana sul Volga — Ordine N. 227)', step11: 'Сталинград - Stalingrad (Operazione Uranus — Kessel 6ª Armata Tedesca Accerchiato)', step12: 'Сталинград - Stalingrad (Vittoria Totale Sovietica — Resa della 6ª Armata di Paulus, 2 Feb 1943)' } },
  { id: 'kalac_na_donu', name: 'Калач-на-Дону - Kalač-na-Donu', coords: [43.52, 48.69], isCapital: false, ownerKey: 'SOV', owners: { default: 'SOV', step10: 'GER', step11: 'SOV' }, historicalNames: { default: 'Калач-на-Дону - Kalač-na-Donu (Ansa Strategica del Don)', step10: 'Kalatsch am Don (Brückenkopf 6. Armee Wehrmacht)', step11: 'Калач-на-Дону - Kalač-na-Donu (Saldatura Tenaglie Operazione Uranus, 23 Nov 1942)', step12: 'Калач-на-Дону - Kalač-na-Donu (Pienamente Ristabilita — Ansa del Don URSS)' } },
  { id: 'rzhev', name: 'Ржев - Ržev', coords: [34.33, 56.26], isCapital: false, ownerKey: 'GER', owners: { default: 'SOV', step9: 'GER', step12: 'SOV' }, historicalNames: { default: 'Ржев - Ržev (Alto Volga — URSS)', step9: 'Rschew (Militärverwaltung Wehrmacht)', step10: 'Rschew (Saliente Fortificato 9ª Armata Model)', step11: 'Rschew (Operazione Marte / Tritacarne di Ržev, 25 Nov 1942)', step12: 'Ржев - Ržev (Liberazione Sovietica — Evacuazione Operazione Büffel, Mar 1943)' } },
  { id: 'rostov', name: 'Ростов-на-Дону - Rostov-na-Donu', coords: [39.72, 47.23], isCapital: false, ownerKey: 'SOV', owners: { default: 'SOV', step9: 'SOV', step10: 'GER', step12: 'SOV' }, historicalNames: { default: 'Ростов-на-Дону - Rostov-na-Donu (Porta del Caucaso — URSS)', step9: 'Ростов-на-Дону - Rostov-na-Donu (Controffensiva Sovietica Timošenko, 29 Nov 1941)', step10: 'Rostow am Don (Heeresgruppe A / Avanzata nel Caucaso)', step11: 'Rostow am Don (Heeresgruppe Don / Minaccia di Isolamento Caucaso)', step12: 'Ростов-на-Дону - Rostov-na-Donu (Liberazione Sovietica Definitiva, 14 Feb 1943)' } },
  { id: 'kursk', name: 'Курск - Kursk', coords: [36.19, 51.73], isCapital: false, ownerKey: 'SOV', owners: { default: 'SOV', step9: 'GER', step12: 'SOV' }, historicalNames: { default: 'Курск - Kursk (Anomalia Magnetica — URSS)', step9: 'Kursk (Occupazione Militare Wehrmacht)', step12: 'Курск - Kursk (Saliente di Kursk — Vittoria Difensiva Prochorovka, Luglio 1943)' } },
  { id: 'orel', name: 'Орёл - Orël', coords: [36.08, 52.97], isCapital: false, ownerKey: 'SOV', owners: { default: 'SOV', step9: 'GER', step12: 'GER', step13: 'SOV' }, historicalNames: { default: 'Орёл - Orël (Snodo della Russia Centrale — URSS)', step9: 'Orel (Militärverwaltung Wehrmacht / HGr Mitte)', step12: 'Orel (Saliente di Orel sotto Controffensiva Sovietica Operazione Kutuzov)', step13: 'Орёл - Orël (Liberazione Sovietica — Operazione Kutuzov, 5 Agosto 1943)' } },
  { id: 'sevastopol', name: 'Севастополь - Sevastopol', coords: [33.52, 44.62], isCapital: false, ownerKey: 'SOV', owners: { default: 'SOV', step10: 'GER', step14: 'SOV' }, historicalNames: { default: 'Севастополь - Sevastopol (Fortezza Principale Mar Nero — URSS)', step9: 'Севастополь - Sevastopol (Eroica Difesa sotto Assedio Tedesco)', step10: 'Sewastopol (Occupata dalla Wehrmacht di Manstein, Luglio 1942)', step11: 'Sewastopol (Piazzaforte Mar Nero — Krim)', step14: 'Севастополь - Sevastopol (Città Eroe Liberata dall\'Armata Rossa — 9-12 Maggio 1944)' } },
  { id: 'odessa', name: 'Одесса - Odessa', coords: [30.73, 46.48], isCapital: false, ownerKey: 'SOV', owners: { default: 'SOV', step9: 'ROM', step14: 'SOV' }, historicalNames: { default: 'Одесса - Odessa (Base Navale Mar Nero — URSS)', step9: 'Odesa (Capitale del Governatorato di Transnistria — Romania)', step14: 'Одесса - Odessa (Città Eroe Liberata dal 3° Fronte Ucraino — 10 Aprile 1944)' } },
  { id: 'smolensk', name: 'Смоленск - Smolensk', coords: [32.05, 54.78], isCapital: false, ownerKey: 'SOV', owners: { default: 'SOV', step9: 'GER', step13: 'SOV' }, historicalNames: { default: 'Смоленск - Smolensk (Distretto Militare Occidentale — URSS)', step9: 'Smolensk (Militärverwaltung Wehrmacht / HGr Mitte)', step11: 'Smolensk (Heeresgruppe Mitte / Allarme Operazione Marte)', step13: 'Смоленск - Smolensk (Liberazione Sovietica — Operazione Suvorov, 25 Settembre 1943)' } },
  { id: 'minsk', name: 'Минск - Minsk', coords: [27.56, 53.9], isCapital: false, ownerKey: 'SOV', owners: { default: 'SOV', step9: 'GER', step15: 'SOV' }, historicalNames: { default: 'Минск - Minsk (Capitale della RSS Bielorussa — URSS)', step9: 'Minsk (Generalkommissariat Weißruthenien — Ostland)', step14: 'Минск - Minsk (Presidio Heeresgruppe Mitte — Accerchiamento Bagration Imminente)', step15: 'Минск - Minsk (Capitale RSS Bielorussa Liberata — Operazione Bagration, 3 Luglio 1944)' } },
  { id: 'cherbourg', name: 'Cherbourg', coords: [-1.62, 49.64], isCapital: false, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'GER', step14: 'USA', step18: 'FRA' }, historicalNames: { default: 'Cherbourg (Porto Militare della Manica)', step6: 'Festung Cherbourg (Kriegsmarine & Wehrmacht)', step14: 'Cherbourg (Porto Strategico Liberato dalla 1ª Armata USA, 27 Giugno 1944)', step18: 'Cherbourg (Arsenale della Marine Nationale — Francia)' } },
  { id: 'bayeux', name: 'Bayeux', coords: [-0.70, 49.28], isCapital: false, ownerKey: 'FRA', owners: { default: 'FRA', step6: 'GER', step14: 'UK', step15: 'FRA' }, historicalNames: { default: 'Bayeux (Normandie)', step6: 'Bayeux (Occupazione Tedesca)', step14: 'Bayeux (Prima Città di Francia Liberata — 7 Giugno 1944 & Discorso di De Gaulle)', step15: 'Bayeux (Calvados — Repubblica Francese)' } },
  { id: 'saipan', name: 'Saipan', coords: [145.75, 15.18], isCapital: false, ownerKey: 'JAP', owners: { default: 'JAP', step14: 'USA' }, historicalNames: { default: 'Saipan (Mandato Giapponese del Pacifico — Nan\'yō Cho)', step14: 'Saipan (Sbarco dei Marines USA & Battaglia del Mare delle Filippine, Giugno 1944)', step19: 'Saipan (Trust Territory of the Pacific Islands — Amministrazione USA 1947)' } },
  { id: 'kohima', name: 'Kohima', coords: [94.11, 25.67], isCapital: false, ownerKey: 'UK', owners: { default: 'UK', step19: 'IND' }, historicalNames: { default: 'Kohima (Naga Hills — Assam, India Britannica)', step14: 'Kohima (Assedio Rotto dalla 14th Army Britannica — Svolta sul Fronte Birmano, 22 Giugno 1944)', step19: 'Kohima (Naga Hills / Assam — Dominion dell\'India, 1947)' } },
  { id: 'kujbysev', name: 'Куйбышев - Kujbyšev', coords: [50.1, 53.2], isCapital: false, ownerKey: 'SOV', historicalNames: { default: 'Куйбышев - Kujbyšev (Samara sul Volga — URSS)', step9: 'Куйбышев - Kujbyšev (Seconda Capitale di Guerra URSS / Evacuazione Sovnarkom)', step18: 'Куйбышев - Kujbyšev (Polo Industriale sul Volga — URSS)' } },
  { id: 'lodz', name: 'Łódź', coords: [19.46, 51.76], isCapital: false, ownerKey: 'POL', owners: { default: 'POL', step5: 'GER', step17: 'POL' }, historicalNames: { default: 'Łódź (Druga Rzeczpospolita)', step5: 'Litzmannstadt (Reichsgau Wartheland — Deutsches Reich)', step17: 'Łódź (Liberata dal 1° Fronte Bielorusso — 19 Gennaio 1945)' } },
  { id: 'amsterdam', name: 'Amsterdam', coords: [4.9, 52.37], isCapital: true, ownerKey: 'HOL', owners: { default: 'HOL', step6: 'GER', step17: 'GER', step18: 'HOL' }, historicalNames: { default: 'Amsterdam (Koninkrijk der Nederlanden)', step6: 'Amsterdam (Reichskommissariat Niederlande / Seyss-Inquart)', step17: 'Amsterdam (Festung Holland — Assedio Wehrmacht, Hongerwinter & Operazione Manna)', step18: 'Amsterdam (Paesi Bassi Liberati — Resa di Wageningen, 5 Maggio 1945)' } },
  { id: 'bruxelles', name: 'Bruxelles', coords: [4.35, 50.85], isCapital: true, ownerKey: 'BEL', owners: { default: 'BEL', step6: 'GER', step15: 'BEL' }, historicalNames: { default: 'Bruxelles (Royaume de Belgique)', step6: 'Brüssel (Militärverwaltung in Belgien und Nordfrankreich)', step15: 'Bruxelles (Liberata dalla Guards Armoured Division Britannica — 3 Settembre 1944)' } },
  { id: 'rotterdam', name: 'Rotterdam', coords: [4.48, 51.92], isCapital: false, ownerKey: 'HOL', owners: { default: 'HOL', step6: 'GER', step17: 'GER', step18: 'HOL' }, historicalNames: { default: 'Rotterdam (Haven van Rotterdam)', step6: 'Rotterdam (Bombardamento Luftwaffe / Kriegsmarine Stützpunkt)', step17: 'Rotterdam (Festung Holland — Blocco della Nieuwe Waterweg & Tregua di Achterveld)', step18: 'Rotterdam (Porto Liberato — Ricostruzione Paesi Bassi, Maggio 1945)' } },
  { id: 'arnhem', name: 'Arnhem', coords: [5.89, 51.98], isCapital: false, ownerKey: 'HOL', owners: { default: 'HOL', step6: 'GER', step17: 'HOL' }, historicalNames: { default: 'Arnhem (Gelderland — Nederrijn)', step6: 'Arnhem (Reichskommissariat Niederlande)', step16: 'Arnhem (Operazione Market Garden — Un Ponte Troppo Lontano)', step17: 'Arnhem (Liberata dal I Corpo Canadese — Operazione Cannonshot, 14-15 Aprile 1945)' } },
  { id: 'groningen', name: 'Groningen', coords: [6.56, 53.22], isCapital: false, ownerKey: 'HOL', owners: { default: 'HOL', step6: 'GER', step17: 'HOL' }, historicalNames: { default: 'Groningen (Capoluogo Provinciale — Paesi Bassi)', step6: 'Groningen (Reichskommissariat Niederlande)', step17: 'Groningen (Liberata dalla 2ª Divisione Canadese dopo Battaglia Urbana — 16 Aprile 1945)' } },
  { id: 'bern', name: 'Bern', coords: [7.44, 46.95], isCapital: true, ownerKey: 'SWI', historicalNames: { default: 'Bern (Schweizerische Eidgenossenschaft / Neutralität)' } },
  { id: 'new_york', name: 'New York', coords: [-74.0, 40.71], isCapital: false, ownerKey: 'USA', historicalNames: { default: 'New York (Port of New York / Convoy Assembly Point)', step19: 'New York (Sede Provvisoria delle Nazioni Unite — 1947)' } },
  { id: 'rio_de_janeiro', name: 'Rio de Janeiro', coords: [-43.17, -22.9], isCapital: true, ownerKey: 'BRA', historicalNames: { default: 'Rio de Janeiro (Estado Novo — Getúlio Vargas)', step10: 'Rio de Janeiro (Dichiarazione di Guerra all\'Asse, Agosto 1942)', step19: 'Rio de Janeiro (Stati Uniti del Brasile — Trattato di Rio 1947)' } },
  { id: 'mexico_city', name: 'Ciudad de México', coords: [-99.13, 19.43], isCapital: true, ownerKey: 'MEX', historicalNames: { default: 'Ciudad de México (Estados Unidos Mexicanos — Cárdenas / Camacho)', step10: 'Ciudad de México (Dichiarazione di Guerra all\'Asse, Maggio 1942)', step19: 'Ciudad de México (Estados Unidos Mexicanos — Presidenza Alemán)' } },
];


export const TacticalMap: React.FC<TacticalMapProps> = ({
  provFeatures,
  hbFeatures,
  cntrFeatures,
  hbMode,
  currentStep,
  selectedFeature,
  layers = {
    fortifications: true,
    battles: true,
    navalBases: true,
    seaLanes: true,
    cityLabels: true,
    hatchPatterns: true,
    islandBeacons: false,
  },
  focusCoords,
  onSelectFeature,
  onClearSelection,
  onSelectBattle,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const pathGeneratorRef = useRef<d3.GeoPath<any, d3.GeoPermissibleObjects> | null>(null);
  const projectionRef = useRef<d3.GeoProjection | null>(null);
  const gRootRef = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
  const gCopiesRef = useRef<d3.Selection<SVGGElement, unknown, null, undefined>[]>([]);
  const currentCyclesRef = useRef<number[]>([0, 1, -1]);
  const hoverOverlayRef = useRef<SVGPathElement | null>(null);
  const selectOverlayRef = useRef<SVGPathElement | null>(null);
  const isZoomingRef = useRef<boolean>(false);
  const zoomEndTimeoutRef = useRef<any>(null);
  const rafZoomIdRef = useRef<number | null>(null);
  const pendingTransformRef = useRef<d3.ZoomTransform | null>(null);
  const lastTooltipHtmlRef = useRef<string>('');
  const tooltipDimensionsRef = useRef<{ w: number; h: number }>({ w: 260, h: 180 });

  // Sync currentStepRef synchronously so D3 event listeners always access the active timeline step
  const currentStepRef = useRef<number>(currentStep);
  currentStepRef.current = currentStep;

  // Track active hovered territory node and pointer coordinates for real-time tooltip updates across step transitions
  const hoveredInfoRef = useRef<{
    node: SVGPathElement;
    data: any;
    clientX: number;
    clientY: number;
  } | null>(null);

  const W = 1600;
  const H = 900;
  // World width in Mercator at scale 460: 2 * PI * 460 = 2890.2652413026093 px
  const WORLD_WIDTH = 2 * Math.PI * 460;

  const fillFor = useCallback((f: any, s: number) => {
    const r = f.__res ? f.__res[s] : null;
    return r ? getOwnerMeta(r.o, s).c : '#1c2026';
  }, []);

  const positionTooltip = useCallback((clientX: number, clientY: number, html: string) => {
    if (!tooltipRef.current) return;
    const tt = tooltipRef.current;
    if (lastTooltipHtmlRef.current !== html) {
      tt.innerHTML = html;
      lastTooltipHtmlRef.current = html;
      tt.style.display = 'block';
      tooltipDimensionsRef.current = {
        w: tt.offsetWidth || 260,
        h: tt.offsetHeight || 180,
      };
    } else {
      tt.style.display = 'block';
    }

    const pad = 16;
    const tw = tooltipDimensionsRef.current.w;
    const th = tooltipDimensionsRef.current.h;
    let x = clientX + pad;
    let y = clientY + pad;
    if (x + tw > window.innerWidth - 8) x = clientX - tw - pad;
    if (y + th > window.innerHeight - 8) y = clientY - th - pad;
    tt.style.left = `${x}px`;
    tt.style.top = `${y}px`;
  }, []);

  const hideTooltip = useCallback(() => {
    if (tooltipRef.current && tooltipRef.current.style.display !== 'none') {
      tooltipRef.current.style.display = 'none';
    }
    lastTooltipHtmlRef.current = '';
  }, []);

  const renderTerritoryTooltipHtml = useCallback((d: any, res: any, meta: any, fac: string, step: number) => {
    const p = d?.properties || {};
    const noteText = res.note || res.historicalContext;
    const hierarchyBadge = formatHierarchyBadge(res.o, step);
    const modernStr = p.NUTS_NAME || d?.__itname || '';
    return `<div class="font-oswald text-[15px] font-semibold text-[#f0e6c8] tracking-[0.5px] border-b border-[#3a3420] pb-1 mb-1 leading-tight flex items-center justify-between gap-3">
      <span>${res.name || d.__itname || 'Territorio'}</span>
      <span class="text-[10px] font-mono-tech px-1.5 py-0.2 bg-[#222a30] text-[#c9a557] border border-[#3d4852] rounded">${res.o}</span>
    </div>
    ${modernStr && modernStr !== res.name ? `<div class="text-[10px] text-[#8b9298] font-mono-tech mb-1 tracking-[0.2px]">Oggi: ${modernStr}${p.CNTR_NAME && !modernStr.includes(p.CNTR_NAME) ? ` (${p.CNTR_NAME})` : ''}</div>` : ''}
    ${hierarchyBadge ? `<div class="text-[9.5px] font-mono-tech tracking-wider uppercase text-[#fbbf24] px-1.5 py-0.5 bg-[#d97706]/15 border border-[#d97706]/35 rounded mb-1 flex items-center gap-1 leading-tight">👑 ${hierarchyBadge}</div>` : ''}
    ${res.adminEntity ? `<div class="text-[11px] text-[#c9a557] font-mono-tech mb-1 leading-tight tracking-[0.2px]">${res.adminEntity}</div>` : ''}
    <div class="flex items-center gap-2.5 text-[13px] text-[#cfd3d6] tracking-[0.3px] my-1">
      <div class="w-6 h-4 rounded-[1px] overflow-hidden border border-[#554d33] shadow-[0_1px_4px_rgba(0,0,0,0.7)] flex-none bg-black/60 flex items-center justify-center">
        ${getCountryFlagSvg(res.o, step)}
      </div>
      <span class="font-medium">${res.o === 'NEU' ? 'Indipendente / Neutrale' : meta.l(step)}</span>
    </div>
    <div class="text-[11.5px] text-[#8b9298] tracking-[1px] mt-1 font-oswald flex items-center justify-between">
      <span>FAZIONE: <b style="color:${FACTION_COLORS[fac] || '#ccc'}">${fac.toUpperCase()}</b></span>
      ${meta.leader ? `<span class="text-[10.5px] text-[#a0a8b0] font-sans font-normal italic">${meta.leader.split('/')[0].trim()}</span>` : ''}
    </div>
    ${noteText ? `<div class="mt-1 text-[11px] text-[#a08c52] italic leading-tight border-t border-[#2a2416] pt-1">${noteText}</div>` : ''}`;
  }, []);

  // Initialize Map & Layers
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Defs & Tactical Shaders
    const defs = svg.append('defs');

    // Ocean Gradient
    const og = defs
      .append('radialGradient')
      .attr('id', 'oceanGrad')
      .attr('cx', '50%')
      .attr('cy', '45%')
      .attr('r', '75%');
    og.append('stop').attr('offset', '0%').attr('stop-color', '#1a324b');
    og.append('stop').attr('offset', '55%').attr('stop-color', '#122437');
    og.append('stop').attr('offset', '100%').attr('stop-color', '#0c1826');

    // Glow Filter for Battles / Selected Items
    const filter = defs.append('filter').attr('id', 'glow-gold').attr('x', '-30%').attr('y', '-30%').attr('width', '160%').attr('height', '160%');
    filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    const battleGlow = defs.append('filter').attr('id', 'glow-battle').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
    battleGlow.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'blur');
    const battleMerge = battleGlow.append('feMerge');
    battleMerge.append('feMergeNode').attr('in', 'blur');
    battleMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Diagonal Military Hatch Pattern: Contested / Active War Front
    const patContested = defs
      .append('pattern')
      .attr('id', 'pattern-contested')
      .attr('width', '8')
      .attr('height', '8')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('patternTransform', 'rotate(45)');
    patContested.append('rect').attr('width', '4').attr('height', '8').attr('fill', 'rgba(217, 83, 79, 0.45)');
    patContested.append('rect').attr('x', '4').attr('width', '4').attr('height', '8').attr('fill', 'transparent');

    // Diagonal Military Hatch Pattern: Demilitarized Zone (Renania)
    const patDemil = defs
      .append('pattern')
      .attr('id', 'pattern-demil')
      .attr('width', '10')
      .attr('height', '10')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('patternTransform', 'rotate(-45)');
    patDemil.append('line').attr('x1', '0').attr('y1', '0').attr('x2', '0').attr('y2', '10').attr('stroke', '#e8c979').attr('stroke-width', '2.5').attr('opacity', '0.65');

    // Diagonal Cross-Hatch Pattern: Protectorates & Client States
    const patPuppet = defs
      .append('pattern')
      .attr('id', 'pattern-puppet')
      .attr('width', '10')
      .attr('height', '10')
      .attr('patternUnits', 'userSpaceOnUse');
    patPuppet.append('path').attr('d', 'M 0 0 L 10 10 M 10 0 L 0 10').attr('stroke', 'rgba(201, 165, 87, 0.22)').attr('stroke-width', '1');

    // Background rect
    svg
      .append('rect')
      .attr('width', W)
      .attr('height', H)
      .attr('fill', 'url(#oceanGrad)')
      .on('click', () => onClearSelection());

    // Classic Flat Political Mercator Projection
    const projection = d3
      .geoMercator()
      .center([15, 52])
      .scale(460)
      .translate([W / 2, H / 2 - 40]);

    const path = d3.geoPath(projection);
    pathGeneratorRef.current = path;
    projectionRef.current = projection;

    const gRoot = svg.append('g').attr('id', 'gRoot');
    gRootRef.current = gRoot;

    // Continuous Horizontal Conveyor Belt:
    // Slot 0 -> cycle 0 (center)
    // Slot 1 -> cycle 1 (east)
    // Slot 2 -> cycle -1 (west)
    const currentCycles = [0, 1, -1];
    currentCyclesRef.current = currentCycles;

    const gCopies = [
      gRoot.append('g').attr('class', 'world-copy world-copy-0').attr('transform', 'translate(0, 0)'),
      gRoot.append('g').attr('class', 'world-copy world-copy-1').attr('transform', `translate(${WORLD_WIDTH}, 0)`),
      gRoot.append('g').attr('class', 'world-copy world-copy-2').attr('transform', `translate(${-WORLD_WIDTH}, 0)`),
    ];
    gCopiesRef.current = gCopies;

    function renderWorldCopy(gCopy: d3.Selection<SVGGElement, unknown, null, undefined>) {
      // 1. Graticule Layer
      const graticule = d3.geoGraticule().extent([[-180, -80], [180, 80]]).step([15, 15]);
      gCopy
        .append('path')
        .datum(graticule())
        .attr('class', 'graticule')
        .attr('d', path as any);

      // Major Meridians Highlight
      const primeMeridian = d3.geoGraticule().extent([[0, -80], [0, 80]]).stepMinor([180, 180]);
      gCopy
        .append('path')
        .datum(primeMeridian.lines()[0])
        .attr('class', 'graticule-prime')
        .attr('d', path as any)
        .attr('stroke', 'rgba(201, 165, 87, 0.25)')
        .attr('stroke-width', '1')
        .attr('stroke-dasharray', '4 4')
        .attr('fill', 'none');

      // 2. Sea Lanes Layer (Subtle hairline oceanic convoy traces)
      const gSeaLanes = gCopy.append('g').attr('class', 'sea-lanes-layer');
      HISTORICAL_SEA_LANES.forEach((lane) => {
        const isMulti = lane.coordinates.length > 0 && Array.isArray(lane.coordinates[0][0]);
        const geoLine: any = {
          type: 'Feature',
          geometry: {
            type: isMulti ? 'MultiLineString' : 'LineString',
            coordinates: lane.coordinates,
          },
          lane,
        };
        const dyn = getDynamicSeaLaneStatus(lane, currentStep);
        const isLaneActive = !lane.activeSteps || lane.activeSteps.includes(currentStep);

        gSeaLanes
          .append('path')
          .datum(geoLine)
          .attr('class', `sea-lane sea-lane-${lane.id}`)
          .attr('d', path as any)
          .attr('fill', 'none')
          .attr('stroke', dyn.color || lane.color)
          .attr('stroke-width', dyn.isContested ? '0.95' : '0.8')
          .attr('stroke-dasharray', dyn.isContested ? '2.5 2' : '3 3')
          .attr('stroke-opacity', dyn.isContested ? '0.5' : '0.35')
          .attr('cursor', 'pointer')
          .attr('display', isLaneActive && layers.seaLanes ? 'inline' : 'none')
          .on('pointerenter', function (event) {
            hoveredInfoRef.current = null;
            svg.selectAll<SVGPathElement, any>(`.sea-lane-${lane.id}`).attr('stroke-width', '1.6').attr('stroke-opacity', '0.85');
            const currentDyn = getDynamicSeaLaneStatus(lane, currentStep);
            showTooltip(
              event,
              `<div class="font-oswald text-[13px] font-bold text-[#e8c979] uppercase border-b border-[#3a3420] pb-1 mb-1 flex items-center justify-between">
                <span>⚓ ${currentDyn.name || lane.name}</span>
                <span class="text-[9.5px] font-mono-tech ${currentDyn.isContested ? 'text-[#d9534f]' : 'text-[#5aa0c2]'}">${currentDyn.statusNote || 'ATTIVA'}</span>
              </div>
              <div class="text-[11.5px] text-[#cfd3d6] mb-0.5 font-semibold">${currentDyn.historicalName || lane.historicalName}</div>
              <div class="text-[11px] text-[#8b9298] leading-tight">${currentDyn.description}</div>`
            );
          })
          .on('pointerleave', function () {
            const currentDyn = getDynamicSeaLaneStatus(lane, currentStep);
            svg.selectAll<SVGPathElement, any>(`.sea-lane-${lane.id}`).attr('stroke-width', currentDyn.isContested ? '0.95' : '0.8').attr('stroke-opacity', currentDyn.isContested ? '0.5' : '0.35');
            hideTooltip();
          });
      });

      // 3. Continuous Land Underlay Layer (Prevents 0.5px sub-pixel vector seams from exposing ocean blue)
      const gUnderlay = gCopy.append('g').attr('class', 'land-underlay-layer pointer-events-none');
      const underlayFeatures = hbMode ? hbFeatures : cntrFeatures;
      gUnderlay
        .selectAll('path')
        .data(underlayFeatures)
        .join('path')
        .attr('d', path as any)
        .attr('fill', '#14171a')
        .attr('stroke', '#14171a')
        .attr('stroke-width', '1.4')
        .attr('stroke-linejoin', 'round')
        .attr('vector-effect', 'non-scaling-stroke');

      // 4. Base Cartography (HB or CNTR)
      if (hbMode) {
        gCopy
          .append('g')
          .attr('class', 'hb-layer')
          .selectAll('path')
          .data(hbFeatures)
          .join('path')
          .attr('class', 'hb')
          .attr('d', path as any)
          .attr('fill', (d) => fillFor(d, currentStep))
          .on('pointerenter', handlePointerEnter)
          .on('pointermove', handlePointerMove)
          .on('pointerleave', handlePointerLeave)
          .on('click', handleFeatureClick);
      } else {
        gCopy
          .append('g')
          .attr('class', 'cntr-layer')
          .selectAll('path')
          .data(cntrFeatures)
          .join('path')
          .attr('class', 'cty')
          .attr('d', path as any)
          .attr('fill', (d) => fillFor(d, currentStep))
          .on('pointerenter', handlePointerEnter)
          .on('pointermove', handlePointerMove)
          .on('pointerleave', handlePointerLeave)
          .on('click', handleFeatureClick);
      }

      // 5. Provincial Detailed Layer (Eurostat NUTS-3 + Precision Enclaves + Kresy + USSR + China)
      gCopy
        .append('g')
        .attr('class', 'prov-layer')
        .selectAll('path')
        .data(provFeatures)
        .join('path')
        .attr('class', 'prov')
        .attr('d', path as any)
        .attr('fill', (d) => fillFor(d, currentStep))
        .on('pointerenter', handlePointerEnter)
        .on('pointermove', handlePointerMove)
        .on('pointerleave', handlePointerLeave)
        .on('click', handleFeatureClick);

      // 5b. Strategic Oceanic Islands Tactical Beacons & Interactive Anchors
      const allIslandCandidates = (hbMode ? hbFeatures : cntrFeatures).concat(provFeatures);
      const islandFeatures = allIslandCandidates.filter((f: any) =>
        Boolean(f && f.id && STRATEGIC_ISLAND_LABELS[f.id])
      );

      const gIslands = gCopy
        .append('g')
        .attr('class', 'island-beacons-layer')
        .attr('display', layers?.islandBeacons ? 'inline' : 'none');
      const islandGroups = gIslands
        .selectAll('g.island-beacon')
        .data(islandFeatures)
        .join('g')
        .attr('class', 'island-beacon cursor-pointer')
        .attr('transform', (d: any) => {
          const pt = d.__cent ? projection(d.__cent) : null;
          return pt && !isNaN(pt[0]) && !isNaN(pt[1]) ? `translate(${pt[0]}, ${pt[1]})` : 'translate(0, 0)';
        })
        .on('pointerenter', handlePointerEnter)
        .on('pointermove', handlePointerMove)
        .on('pointerleave', handlePointerLeave)
        .on('click', handleFeatureClick);

      // Outer tactical pulse ring / halo
      islandGroups
        .append('circle')
        .attr('class', 'island-beacon-halo')
        .attr('r', '4.2')
        .attr('fill', (d: any) => {
          const color = fillFor(d, currentStep);
          return color === '#1c2026' ? 'rgba(232, 201, 121, 0.25)' : color;
        })
        .attr('fill-opacity', '0.25')
        .attr('stroke', (d: any) => {
          const color = fillFor(d, currentStep);
          return color === '#1c2026' ? '#e8c979' : color;
        })
        .attr('stroke-width', '0.85')
        .attr('stroke-dasharray', '2.5 1.5');

      // Inner tactical core dot
      islandGroups
        .append('circle')
        .attr('class', 'island-beacon-core')
        .attr('r', '1.8')
        .attr('fill', (d: any) => fillFor(d, currentStep))
        .attr('stroke', '#ffffff')
        .attr('stroke-width', '0.5');

      // Large invisible hit target (14px radius) for effortless mouse hovering & clicking on open sea!
      islandGroups
        .append('circle')
        .attr('class', 'island-hit-target')
        .attr('r', '14')
        .attr('fill', 'transparent')
        .attr('stroke', 'none');

      // Tactical Island Label with high-contrast text outline
      islandGroups
        .append('text')
        .attr('class', 'island-beacon-label font-oswald pointer-events-none select-none')
        .attr('x', 6)
        .attr('y', 2)
        .attr('fill', '#f0e6c8')
        .attr('font-size', '6.5px')
        .attr('letter-spacing', '0.4px')
        .attr('paint-order', 'stroke')
        .attr('stroke', '#07090c')
        .attr('stroke-width', '1.6px')
        .attr('stroke-linejoin', 'round')
        .text((d: any) => getStrategicIslandLabel(d.id, currentStep) || d.properties?.NAME || d.id);

      // 6. Fortifications Layer (Delicate, elegant historical defense lines)
      const gForts = gCopy.append('g').attr('class', 'fortifications-layer');
      HISTORICAL_FORTIFICATION_LINES.forEach((fline) => {
        const geoLine: any = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: fline.coordinates,
          },
          fline,
        };
        const isLineActive = fline.activeSteps.includes(currentStep);

        gForts
          .append('path')
          .datum(geoLine)
          .attr('class', `fort-line fort-${fline.id}`)
          .attr('d', path as any)
          .attr('fill', 'none')
          .attr('stroke', fline.color)
          .attr('stroke-width', '1.1')
          .attr('stroke-dasharray', '2.5 1.5')
          .attr('stroke-opacity', '0.85')
          .attr('cursor', 'pointer')
          .attr('display', isLineActive && layers.fortifications ? 'inline' : 'none')
          .on('pointerenter', function (event) {
            hoveredInfoRef.current = null;
            svg.selectAll<SVGPathElement, any>(`.fort-${fline.id}`).attr('stroke-width', '2').attr('stroke', '#e8c979');
            showTooltip(
              event,
              `<div class="font-oswald text-[13px] font-bold text-[#e8c979] uppercase border-b border-[#3a3420] pb-1 mb-1">
                🛡️ ${fline.name}
              </div>
              <div class="text-[11.5px] text-[#cfd3d6] mb-0.5 font-semibold">${fline.builder}</div>
              <div class="text-[11px] text-[#8b9298] leading-tight mb-1">${fline.description}</div>
              <div class="text-[9.5px] font-mono-tech text-[#c9a557] uppercase">Forti principali: ${fline.keyForts.map((k) => k.name).join(', ')}</div>`
            );
          })
          .on('pointerleave', function () {
            svg.selectAll<SVGPathElement, any>(`.fort-${fline.id}`).attr('stroke-width', '1.1').attr('stroke', fline.color);
            hideTooltip();
          });

        fline.keyForts.forEach((kfort) => {
          const pt = projection(kfort.coords);
          if (pt && !isNaN(pt[0]) && !isNaN(pt[1])) {
            const gNode = gForts
              .append('g')
              .datum({ ...kfort, activeSteps: fline.activeSteps, parentLine: fline })
              .attr('transform', `translate(${pt[0]}, ${pt[1]})`)
              .attr('class', 'fort-node cursor-pointer')
              .attr('display', isLineActive && layers.fortifications ? 'inline' : 'none')
              .on('pointerenter', (event) => {
                hoveredInfoRef.current = null;
                showTooltip(
                  event,
                  `<div class="font-oswald text-[12px] font-bold text-[#e8c979] uppercase">${kfort.name}</div>
                  <div class="text-[11px] text-[#cfd3d6]">${kfort.desc}</div>
                  <div class="text-[9.5px] text-[#8b9298] mt-0.5">Complesso: ${fline.name}</div>`
                );
              })
              .on('pointerleave', hideTooltip);

            gNode
              .append('circle')
              .attr('r', '1')
              .attr('fill', '#e8c979')
              .attr('stroke', 'none');
          }
        });
      });

      // 7. Naval Bases Layer (Delicate 3px micro-diamonds)
      const gNaval = gCopy.append('g').attr('class', 'naval-bases-layer');
      HISTORICAL_NAVAL_BASES.forEach((base) => {
        const pt = projection(base.coords);
        if (pt && !isNaN(pt[0]) && !isNaN(pt[1])) {
          const dyn = getDynamicNavalBaseStatus(base, currentStep);
          const gBase = gNaval
            .append('g')
            .datum(base)
            .attr('transform', `translate(${pt[0]}, ${pt[1]})`)
            .attr('class', `naval-base naval-base-${base.id} cursor-pointer`)
            .on('pointerenter', (event) => {
              hoveredInfoRef.current = null;
              const currentDyn = getDynamicNavalBaseStatus(base, currentStep);
              showTooltip(
                event,
                `<div class="font-oswald text-[13px] font-bold text-[#5aa0c2] uppercase border-b border-[#3a3420] pb-1 mb-1">
                  ⚓ ${base.name} (${currentDyn.nation})
                </div>
                <div class="text-[11.5px] text-[#cfd3d6] font-semibold mb-0.5">${currentDyn.historicalName || base.historicalName}</div>
                <div class="text-[11px] text-[#8b9298] leading-tight">${currentDyn.description}</div>
                <div class="text-[9.5px] font-mono-tech text-[#c9a557] mt-1 uppercase">Teatro: ${currentDyn.theater || base.theater} · ${base.type.replace('_', ' ')}</div>`
              );
            })
            .on('pointerleave', hideTooltip);

          gBase
            .append('rect')
            .attr('x', '-1.6')
            .attr('y', '-1.6')
            .attr('width', '3.2')
            .attr('height', '3.2')
            .attr('fill', dyn.fillColor)
            .attr('stroke', dyn.strokeColor)
            .attr('stroke-width', '0.7')
            .attr('transform', 'rotate(45)');
        }
      });

      // 8. Dynamic Battles Layer (Subtle 2px micro-target)
      const gBattles = gCopy.append('g').attr('class', 'battles-layer');
      HISTORICAL_BATTLES.forEach((battle) => {
        const pt = projection(battle.coords);
        if (pt && !isNaN(pt[0]) && !isNaN(pt[1])) {
          const gBat = gBattles
            .append('g')
            .attr('transform', `translate(${pt[0]}, ${pt[1]})`)
            .attr('class', `battle-marker battle-step-${battle.step} cursor-pointer`)
            .attr('display', battle.step === currentStep ? 'inline' : 'none')
            .on('pointerenter', (event) => {
              hoveredInfoRef.current = null;
              showTooltip(
                event,
                `<div class="font-oswald text-[13px] font-bold text-[#f0e6c8] uppercase border-b border-[#3a3420] pb-1 mb-1 flex items-center justify-between">
                  <span>⚔️ ${battle.name}</span>
                  <span class="text-[9.5px] text-[#e8c979] font-mono-tech">${battle.historicalDate}</span>
                </div>
                <div class="text-[11.5px] text-[#cfd3d6] font-semibold mb-0.5">${battle.belligerents}</div>
                <div class="text-[11px] text-[#8b9298] leading-snug mb-1">${battle.significance}</div>
                <div class="text-[10.5px] text-[#c9a557] italic">Esito: ${battle.result}</div>
                ${battle.commanderA ? `<div class="text-[9.5px] font-mono-tech text-[#a0a8b0] mt-0.5">Comandanti: ${battle.commanderA} vs ${battle.commanderB}</div>` : ''}`
              );
            })
            .on('pointerleave', hideTooltip)
            .on('click', (e) => {
              e.stopPropagation();
              tacticalAudio.playClick();
              if (onSelectBattle) onSelectBattle(battle);
            });

          gBat
            .append('circle')
            .attr('class', 'battle-pulse')
            .attr('r', '3.5')
            .attr('fill', 'none')
            .attr('stroke', '#d9534f')
            .attr('stroke-width', '0.6');

          gBat
            .append('circle')
            .attr('r', '1.6')
            .attr('fill', '#d9534f')
            .attr('stroke', '#ffffff')
            .attr('stroke-width', '0.5');
        }
      });

      // 9. City Labels Layer (Refined, tactical micro-typography with smart LOD)
      const gCities = gCopy
        .append('g')
        .attr('class', 'city-labels-layer')
        .attr('display', layers.cityLabels ? 'inline' : 'none');

      HISTORICAL_CITIES.forEach((city) => {
        const pt = projection(city.coords);
        if (pt && !isNaN(pt[0]) && !isNaN(pt[1])) {
          const step = currentStepRef.current;
          const isCap = getCityIsCapital(city, step);
          const currentOwner = getCityOwner(city, step);

          let rawName = '';
          for (let st = step; st >= 0; st--) {
            if (city.historicalNames[`step${st}`]) {
              rawName = city.historicalNames[`step${st}`];
              break;
            }
          }
          if (!rawName) rawName = city.historicalNames.default || city.name;
          const { primary, subtitle, fullName } = getCleanCityLabel(rawName, city.name);

          const gCity = gCities
            .append('g')
            .datum(city)
            .attr('transform', `translate(${pt[0]}, ${pt[1]})`)
            .attr('class', `city-marker cursor-pointer ${isCap ? 'city-capital' : 'city-minor'}`)
            .on('pointerenter', (event) => {
              hoveredInfoRef.current = null;
              const curStep = currentStepRef.current;
              const curCap = getCityIsCapital(city, curStep);
              const curOwn = getCityOwner(city, curStep);

              let activeRaw = '';
              for (let st = curStep; st >= 0; st--) {
                if (city.historicalNames[`step${st}`]) {
                  activeRaw = city.historicalNames[`step${st}`];
                  break;
                }
              }
              if (!activeRaw) activeRaw = city.historicalNames.default || city.name;
              const activeLabel = getCleanCityLabel(activeRaw, city.name);

              showTooltip(
                event,
                `<div class="font-oswald text-[12.5px] font-bold text-[#f0e6c8] uppercase border-b border-[#3a3420] pb-1 mb-1 flex items-center justify-between">
                  <span>🏛️ ${activeLabel.primary}</span>
                  <span class="text-[9px] font-mono-tech ${curCap ? 'text-[#e8c979]' : 'text-[#a0a8b0]'}">
                    ${curCap ? 'CAPITALE NAZIONALE' : 'CENTRO STRATEGICO'}
                  </span>
                </div>
                <div class="text-[11px] text-[#cfd3d6] font-semibold mb-0.5">${activeLabel.fullName}</div>
                ${activeLabel.subtitle ? `<div class="text-[10px] text-[#c9a557] italic leading-tight mb-1">${activeLabel.subtitle}</div>` : ''}
                <div class="text-[9px] font-mono-tech text-[#8b9298] mt-1">Controllo: <span class="text-[#cfd3d6] font-bold">${curOwn}</span> • Lat: ${city.coords[1].toFixed(2)}° Lon: ${city.coords[0].toFixed(2)}°</div>`
              );
            })
            .on('pointerleave', hideTooltip);

          // Invisible expanded hit area for effortless hover on micro-dots
          gCity
            .append('circle')
            .attr('class', 'city-hitbox')
            .attr('r', isCap ? '3.5' : '2.5')
            .attr('fill', 'transparent')
            .attr('stroke', 'none');

          // Tactical dot
          gCity
            .append('circle')
            .attr('class', `city-dot ${isCap ? 'city-dot-capital' : 'city-dot-minor'}`)
            .attr('r', isCap ? '0.85' : '0.55')
            .attr('fill', isCap ? '#e8c979' : '#cfd3d6')
            .attr('stroke', '#0c0e10')
            .attr('stroke-width', isCap ? '0.22' : '0.15');

          gCity
            .append('text')
            .attr('class', `city-label ${isCap ? 'city-label-capital' : 'city-label-minor'}`)
            .attr('dx', '0.85em')
            .attr('dy', '0.32em')
            .attr('fill', isCap ? '#f0e6c8' : '#b0b8c0')
            .attr('stroke', '#080a0c')
            .attr('stroke-width', isCap ? '0.36' : '0.28')
            .attr('paint-order', 'stroke fill')
            .style('font-family', "'Oswald', 'Noto Sans', 'Segoe UI', system-ui, -apple-system, sans-serif")
            .style('letter-spacing', '0.2px')
            .style('pointer-events', 'none')
            .text(primary);
        }
      });

      // 10. Tactical Highlight Overlay Layer      // 10. Tactical Highlight Overlay Layer (Guarantees crisp borders on top without mutating base DOM)
      const gOverlay = gCopy.append('g').attr('class', 'tactical-overlay-layer pointer-events-none');
      gOverlay
        .append('path')
        .attr('class', 'hov-overlay-path')
        .attr('fill', 'none')
        .attr('vector-effect', 'non-scaling-stroke');

      gOverlay
        .append('path')
        .attr('class', 'sel-overlay-path')
        .attr('fill', 'none')
        .attr('vector-effect', 'non-scaling-stroke');
    }

    // Render all 3 world copies
    gCopies.forEach((gCopy) => renderWorldCopy(gCopy));

    // Restore selected feature overlay across all copies if selectedFeature is active
    if (selectedFeature) {
      const selTarget = svg
        .selectAll<SVGPathElement, any>('.prov, .cty, .hb')
        .filter((d) => isSameFeature(d, selectedFeature));
      selTarget.classed('sel', true);
      const firstNode = selTarget.node();
      const dAttr = firstNode ? d3.select(firstNode).attr('d') : null;
      if (dAttr) {
        svg.selectAll('.sel-overlay-path').attr('d', dAttr);
      }
    }

    let currentHoveredNode: SVGPathElement | null = null;

    function clearAllHover() {
      if (currentHoveredNode !== null || hoveredInfoRef.current !== null) {
        currentHoveredNode = null;
        svg.selectAll('.hov-overlay-path').attr('d', null);
        hoveredInfoRef.current = null;
      }
    }

    const applyTransform = (t: d3.ZoomTransform) => {
      gRoot.attr('transform', t.toString());

      const k = t.k || 1;
      gRoot.classed('zoom-out', k < 0.95);
      gRoot.classed('zoom-deep', k < 0.6);
      gRoot.classed('zoom-in', k >= 2.5 && k < 4.5);
      gRoot.classed('zoom-close', k >= 4.5 && k < 9.0);
      gRoot.classed('zoom-macro', k >= 9.0);

      // Infinite conveyor belt update:
      // Position of camera center in world coordinates:
      const xCenter = (W / 2 - t.x) / k;
      const C = Math.round(xCenter / WORLD_WIDTH);
      const needed = [C - 1, C, C + 1];

      // Frustum / Viewport bounds in world coordinates:
      const xViewMin = -t.x / k;
      const xViewMax = (W - t.x) / k;

      for (const c of needed) {
        const slot = ((c % 3) + 3) % 3;
        if (currentCyclesRef.current[slot] !== c) {
          gCopiesRef.current[slot].attr('transform', `translate(${c * WORLD_WIDTH}, 0)`);
          currentCyclesRef.current[slot] = c;
        }
        // Viewport culling: each copy spans [c * WORLD_WIDTH, (c + 1) * WORLD_WIDTH]
        // A buffer margin of 250px prevents popping during fast pans
        const isVisible = (c + 1) * WORLD_WIDTH + 250 >= xViewMin && c * WORLD_WIDTH - 250 <= xViewMax;
        gCopiesRef.current[slot].style('display', isVisible ? null : 'none');
      }
    };

    // Zoom behavior with infinite horizontal wrapping & viewport culling
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.35, 25])
      .translateExtent([
        [-Infinity, -H * 1.5],
        [Infinity, H * 2.5],
      ])
      .wheelDelta((event) => {
        // Calibrated smooth stepping: eliminates wheel event flooding on high-polling mice & trackpads
        return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.0018) * (event.ctrlKey ? 10 : 1);
      })
      .on('start', (event) => {
        if (event.sourceEvent && event.sourceEvent.type === 'wheel') {
          clearAllHover();
          hideTooltip();
        }
      })
      .on('zoom', (event) => {
        isZoomingRef.current = true;
        if (zoomEndTimeoutRef.current) {
          clearTimeout(zoomEndTimeoutRef.current);
          zoomEndTimeoutRef.current = null;
        }
        clearAllHover();
        hideTooltip();

        // Coalesce zoom renders via requestAnimationFrame for locked 60-120 FPS
        pendingTransformRef.current = event.transform;
        if (!rafZoomIdRef.current) {
          rafZoomIdRef.current = requestAnimationFrame(() => {
            if (pendingTransformRef.current) {
              applyTransform(pendingTransformRef.current);
              pendingTransformRef.current = null;
            }
            rafZoomIdRef.current = null;
          });
        }
      })
      .on('end', () => {
        if (rafZoomIdRef.current) {
          cancelAnimationFrame(rafZoomIdRef.current);
          rafZoomIdRef.current = null;
        }
        if (pendingTransformRef.current) {
          applyTransform(pendingTransformRef.current);
          pendingTransformRef.current = null;
        }
        if (isZoomingRef.current) {
          if (zoomEndTimeoutRef.current) {
            clearTimeout(zoomEndTimeoutRef.current);
          }
          zoomEndTimeoutRef.current = setTimeout(() => {
            isZoomingRef.current = false;
          }, 60);
        }
      });

    svg.call(zoom).on('dblclick.zoom', null);
    zoomBehaviorRef.current = zoom;

    svg.on('pointerleave', () => {
      clearAllHover();
      hideTooltip();
    });

    svg.on('click', (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) return;
      if (
        target.closest('.prov, .cty, .hb, .island-beacon, .battle-marker, .naval-base, .fort-line, .sea-lane, .city-marker')
      ) {
        return;
      }
      onClearSelection();
    });

    function handlePointerEnter(this: any, event: MouseEvent, d: any) {
      if (isZoomingRef.current) return;
      currentHoveredNode = this;

      const dAttr = d3.select(this).attr('d');
      if (dAttr) {
        svg.selectAll('.hov-overlay-path').attr('d', dAttr);
      }

      hoveredInfoRef.current = {
        node: this,
        data: d,
        clientX: event.clientX,
        clientY: event.clientY,
      };

      const step = currentStepRef.current;
      const res = d.__res ? d.__res[step] : null;
      if (!res) {
        hideTooltip();
        return;
      }

      const meta = getOwnerMeta(res.o, step);
      const fac = res.fac || meta.f;

      positionTooltip(
        event.clientX,
        event.clientY,
        renderTerritoryTooltipHtml(d, res, meta, fac, step)
      );
    }

    function handlePointerMove(this: any, event: MouseEvent, d: any) {
      if (isZoomingRef.current) return;
      if (currentHoveredNode !== this) {
        currentHoveredNode = this;
        const dAttr = d3.select(this).attr('d');
        if (dAttr) {
          svg.selectAll('.hov-overlay-path').attr('d', dAttr);
        }
      }

      hoveredInfoRef.current = {
        node: this,
        data: d,
        clientX: event.clientX,
        clientY: event.clientY,
      };

      const step = currentStepRef.current;
      const res = d.__res ? d.__res[step] : null;
      if (!res) {
        hideTooltip();
        return;
      }

      const meta = getOwnerMeta(res.o, step);
      const fac = res.fac || meta.f;

      positionTooltip(
        event.clientX,
        event.clientY,
        renderTerritoryTooltipHtml(d, res, meta, fac, step)
      );
    }

    function handlePointerLeave(this: any) {
      if (currentHoveredNode === this) {
        clearAllHover();
      }
      hideTooltip();
    }

    function handleFeatureClick(this: any, event: MouseEvent, d: any) {
      event.stopPropagation();
      tacticalAudio.playClick();
      onSelectFeature(d);
    }

    function showTooltip(event: MouseEvent, html: string) {
      positionTooltip(event.clientX, event.clientY, html);
    }

    return () => {
      if (rafZoomIdRef.current) {
        cancelAnimationFrame(rafZoomIdRef.current);
        rafZoomIdRef.current = null;
      }
      if (zoomEndTimeoutRef.current) {
        clearTimeout(zoomEndTimeoutRef.current);
      }
    };
  }, [provFeatures, hbFeatures, cntrFeatures, hbMode]);

  // Update fills smoothly & toggle battle markers when currentStep changes
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    // Audio chime on step transition
    tacticalAudio.playRadarPing();

    svg
      .selectAll<SVGPathElement, any>('.prov, .cty, .hb')
      .transition()
      .duration(700)
      .ease(d3.easeCubicInOut)
      .attr('fill', function (d) {
        return fillFor(d, currentStep);
      });

    // Update island beacon colors smoothly across timeline steps
    svg
      .selectAll<SVGCircleElement, any>('.island-beacon-core')
      .transition()
      .duration(700)
      .ease(d3.easeCubicInOut)
      .attr('fill', function (d) {
        return fillFor(d, currentStep);
      });

    svg
      .selectAll<SVGCircleElement, any>('.island-beacon-halo')
      .transition()
      .duration(700)
      .ease(d3.easeCubicInOut)
      .attr('stroke', function (d) {
        const color = fillFor(d, currentStep);
        return color === '#1c2026' ? '#e8c979' : color;
      })
      .attr('fill', function (d) {
        const color = fillFor(d, currentStep);
        return color === '#1c2026' ? 'rgba(232, 201, 121, 0.25)' : color;
      });

    // Update battle markers visibility
    svg.selectAll<SVGGElement, any>('.battle-marker').each(function () {
      const el = d3.select(this);
      const isCurrent = el.classed(`battle-step-${currentStep}`);
      el.attr('display', isCurrent && layers.battles ? 'inline' : 'none');
    });

    // Update individual fortification lines and fort nodes dynamically based on current step
    svg.selectAll<SVGPathElement, any>('.fort-line').each(function (d: any) {
      const fline = d?.fline;
      if (fline && fline.activeSteps) {
        const isAct = fline.activeSteps.includes(currentStep);
        d3.select(this).attr('display', isAct && layers.fortifications ? 'inline' : 'none');
      }
    });

    svg.selectAll<SVGGElement, any>('.fort-node').each(function (d: any) {
      const isAct = d?.activeSteps ? d.activeSteps.includes(currentStep) : true;
      d3.select(this).attr('display', isAct && layers.fortifications ? 'inline' : 'none');
    });

    // Update naval bases diamond strokes and fills dynamically based on controller in currentStep
    svg.selectAll<SVGGElement, any>('.naval-base').each(function (base: any) {
      if (base) {
        const dyn = getDynamicNavalBaseStatus(base, currentStep);
        d3.select(this)
          .select('rect')
          .transition()
          .duration(600)
          .attr('fill', dyn.fillColor)
          .attr('stroke', dyn.strokeColor);
      }
    });

    // Update sea lanes visibility, dashed patterns, and strokes dynamically
    svg.selectAll<SVGPathElement, any>('.sea-lane').each(function (d: any) {
      const lane = d?.lane;
      if (lane) {
        const dyn = getDynamicSeaLaneStatus(lane, currentStep);
        const isLaneActive = !lane.activeSteps || lane.activeSteps.includes(currentStep);
        d3.select(this)
          .attr('display', isLaneActive && layers.seaLanes ? 'inline' : 'none')
          .attr('stroke-width', dyn.isContested ? '0.95' : '0.8')
          .attr('stroke-dasharray', dyn.isContested ? '2.5 2' : '3 3')
          .transition()
          .duration(600)
          .attr('stroke', dyn.color || lane.color)
          .attr('stroke-opacity', dyn.isContested ? '0.5' : '0.35');
      }
    });

    // Update island beacon text labels for current step
    svg.selectAll<SVGTextElement, any>('.island-beacon-label').text((d: any) => {
      return getStrategicIslandLabel(d.id, currentStep) || d.properties?.NAME || d.id;
    });

    // Update city labels text & dynamic capital styling for current step
    svg.selectAll<SVGGElement, any>('.city-marker').each(function (city) {
      if (city) {
        const isCap = getCityIsCapital(city, currentStep);
        let cityName = '';
        for (let st = currentStep; st >= 0; st--) {
          if (city.historicalNames[`step${st}`]) {
            cityName = city.historicalNames[`step${st}`];
            break;
          }
        }
        if (!cityName) cityName = city.historicalNames.default || city.name;
        const { primary } = getCleanCityLabel(cityName, city.name);

        const sel = d3.select(this);
        sel.classed('city-capital', isCap).classed('city-minor', !isCap);
        sel.select('.city-dot')
          .classed('city-dot-capital', isCap)
          .classed('city-dot-minor', !isCap)
          .attr('r', isCap ? '0.85' : '0.55')
          .attr('fill', isCap ? '#e8c979' : '#cfd3d6');
        sel.select('text')
          .classed('city-label-capital', isCap)
          .classed('city-label-minor', !isCap)
          .attr('fill', isCap ? '#f0e6c8' : '#b0b8c0')
          .text(primary);
      }
    });

    // Real-time update: If mouse is currently hovering over a territory, update its tooltip to the new step immediately!
    if (hoveredInfoRef.current && tooltipRef.current && tooltipRef.current.style.display !== 'none') {
      const { data, clientX, clientY } = hoveredInfoRef.current;
      const res = data.__res ? data.__res[currentStep] : null;
      if (res) {
        const meta = getOwnerMeta(res.o, currentStep);
        const fac = res.fac || meta.f;
        const html = renderTerritoryTooltipHtml(data, res, meta, fac, currentStep);
        positionTooltip(clientX, clientY, html);
      } else {
        hideTooltip();
      }
    }
  }, [currentStep, fillFor, layers.battles, layers.fortifications, layers.seaLanes, renderTerritoryTooltipHtml, positionTooltip, hideTooltip]);

  // Layer Visibility Updates across all synchronized world copies
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    svg.selectAll('.fortifications-layer').attr('display', layers.fortifications ? 'inline' : 'none');
    svg.selectAll<SVGPathElement, any>('.fort-line').each(function (d: any) {
      const fline = d?.fline;
      if (fline && fline.activeSteps) {
        const isAct = fline.activeSteps.includes(currentStep);
        d3.select(this).attr('display', isAct && layers.fortifications ? 'inline' : 'none');
      }
    });
    svg.selectAll<SVGGElement, any>('.fort-node').each(function (d: any) {
      const isAct = d?.activeSteps ? d.activeSteps.includes(currentStep) : true;
      d3.select(this).attr('display', isAct && layers.fortifications ? 'inline' : 'none');
    });

    svg.selectAll('.naval-bases-layer').attr('display', layers.navalBases ? 'inline' : 'none');

    svg.selectAll('.sea-lanes-layer').attr('display', layers.seaLanes ? 'inline' : 'none');
    svg.selectAll<SVGPathElement, any>('.sea-lane').each(function (d: any) {
      const lane = d?.lane;
      if (lane) {
        const isLaneActive = !lane.activeSteps || lane.activeSteps.includes(currentStep);
        d3.select(this).attr('display', isLaneActive && layers.seaLanes ? 'inline' : 'none');
      }
    });

    svg.selectAll('.city-labels-layer').attr('display', layers.cityLabels ? 'inline' : 'none');
    svg.selectAll('.island-beacons-layer').attr('display', layers.islandBeacons ? 'inline' : 'none');
    svg.selectAll('.island-beacon-label').attr('display', layers.cityLabels ? 'inline' : 'none');
    svg.selectAll('.battle-marker').attr('display', function () {
      const el = d3.select(this);
      const isCurrent = el.classed(`battle-step-${currentStep}`);
      return isCurrent && layers.battles ? 'inline' : 'none';
    });
  }, [layers, currentStep]);

  // Update selection highlight classes & overlay across all copies
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('.prov.sel, .cty.sel, .hb.sel').classed('sel', false);
    svg.selectAll('.island-beacon').classed('sel-beacon', false);

    if (selectedFeature) {
      const selTarget = svg
        .selectAll<SVGPathElement, any>('.prov, .cty, .hb')
        .filter((d) => isSameFeature(d, selectedFeature));

      selTarget.classed('sel', true);

      svg
        .selectAll<SVGGElement, any>('.island-beacon')
        .filter((d) => isSameFeature(d, selectedFeature))
        .classed('sel-beacon', true);

      const firstNode = selTarget.node();
      const dAttr = firstNode ? d3.select(firstNode).attr('d') : null;
      if (dAttr) {
        svg.selectAll('.sel-overlay-path').attr('d', dAttr);
      }
    } else {
      svg.selectAll('.sel-overlay-path').attr('d', null);
    }
  }, [selectedFeature]);

  // Programmatic focus coords with seamless nearest-cycle wrapping
  useEffect(() => {
    if (!focusCoords || !svgRef.current || !zoomBehaviorRef.current || !projectionRef.current) return;
    const pt = projectionRef.current(focusCoords.coords);
    if (!pt || isNaN(pt[0]) || isNaN(pt[1])) return;

    const k = focusCoords.zoom;
    // Calculate nearest cycle to current camera center to avoid spinning around the world
    const currentTransform = d3.zoomTransform(svgRef.current);
    const xCam = (W / 2 - currentTransform.x) / (currentTransform.k || 1);
    const n = Math.round((xCam - pt[0]) / WORLD_WIDTH);
    const targetX = pt[0] + n * WORLD_WIDTH;

    const tx = W / 2 - k * targetX;
    const ty = H / 2 - k * pt[1];

    d3.select(svgRef.current)
      .transition()
      .duration(950)
      .ease(d3.easeCubicOut)
      .call(zoomBehaviorRef.current.transform, d3.zoomIdentity.translate(tx, ty).scale(k));
  }, [focusCoords]);

  // Zoom handlers
  const zoomIn = () => {
    tacticalAudio.playClick();
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current).transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 1.6);
  };

  const zoomOut = () => {
    tacticalAudio.playClick();
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current).transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 1 / 1.6);
  };

  const resetView = () => {
    tacticalAudio.playClick();
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(850)
      .ease(d3.easeCubicOut)
      .call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
  };

  const zoomToBox = (
    coords: [number, number][] | [number, number],
    kTarget: number,
    preferredCycle?: number
  ) => {
    tacticalAudio.playClick();
    if (!svgRef.current || !zoomBehaviorRef.current || !projectionRef.current) return;

    let pt: [number, number];
    if (typeof coords[0] === 'number') {
      pt = projectionRef.current(coords as [number, number]) as [number, number];
    } else {
      pt = pathGeneratorRef.current?.centroid({
        type: 'Feature',
        geometry: { type: 'Polygon', coordinates: [coords] },
      } as any) as [number, number];
    }
    if (!pt || isNaN(pt[0]) || isNaN(pt[1])) return;

    let targetX = pt[0];
    if (preferredCycle !== undefined) {
      targetX = pt[0] + preferredCycle * WORLD_WIDTH;
    } else {
      const currentTransform = d3.zoomTransform(svgRef.current);
      const xCam = (W / 2 - currentTransform.x) / (currentTransform.k || 1);
      const n = Math.round((xCam - targetX) / WORLD_WIDTH);
      targetX += n * WORLD_WIDTH;
    }

    const k = kTarget;
    const tx = W / 2 - k * targetX;
    const ty = H / 2 - k * pt[1];
    d3.select(svgRef.current)
      .transition()
      .duration(950)
      .ease(d3.easeCubicOut)
      .call(zoomBehaviorRef.current.transform, d3.zoomIdentity.translate(tx, ty).scale(k));
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0c1826]">
      <svg
        ref={svgRef}
        id="map"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block cursor-grab active:cursor-grabbing"
      />

      {/* Floating Tactical Tooltip */}
      <div
        ref={tooltipRef}
        id="tooltip"
        className="fixed z-50 pointer-events-none hidden min-w-[220px] max-w-[340px] p-3 tactical-panel text-xs text-[#cfd3d6] shadow-2xl backdrop-blur-md"
      />

      {/* Preset Zoom & Strategic Theater Presets */}
      <div
        id="zoomctl"
        style={{ position: 'absolute' }}
        className="absolute right-3.5 bottom-[160px] sm:bottom-[180px] z-30 flex flex-col gap-1.5 pointer-events-auto"
      >
        <button
          onClick={zoomIn}
          title="Ingrandisci mappa (+)"
          className="w-10 h-10 font-oswald text-base text-[#e8c979] bg-gradient-to-b from-[#1b1f23] to-[#101316] border border-[#6a5a2f] hover:border-[#c9a557] hover:text-white transition-all shadow-md active:scale-95"
        >
          +
        </button>
        <button
          onClick={zoomOut}
          title="Riduci mappa (−)"
          className="w-10 h-10 font-oswald text-base text-[#e8c979] bg-gradient-to-b from-[#1b1f23] to-[#101316] border border-[#6a5a2f] hover:border-[#c9a557] hover:text-white transition-all shadow-md active:scale-95"
        >
          −
        </button>

        {/* Theater Presets */}
        <button
          onClick={() =>
            zoomToBox(
              [
                [-5, 42],
                [25, 42],
                [25, 58],
                [-5, 58],
                [-5, 42],
              ],
              2.2
            )
          }
          title="Teatro Europa Centrale (Maginot, Sigfrido, Polonia)"
          className="w-10 h-10 font-oswald text-[11px] tracking-wider text-[#e8c979] bg-gradient-to-b from-[#1b1f23] to-[#101316] border border-[#6a5a2f] hover:border-[#c9a557] hover:text-white transition-all shadow-md"
        >
          EUR
        </button>

        <button
          onClick={() =>
            zoomToBox(
              [
                [75, 10],
                [145, 10],
                [145, 50],
                [75, 50],
                [75, 10],
              ],
              1.2
            )
          }
          title="Teatro Asia & Fronte Pacifico (Cina, Giappone, Manciukuò)"
          className="w-10 h-10 font-oswald text-[10px] tracking-wider text-[#e8c979] bg-gradient-to-b from-[#1b1f23] to-[#101316] border border-[#6a5a2f] hover:border-[#c9a557] hover:text-white transition-all shadow-md"
        >
          ASIA
        </button>

        <button
          onClick={() => zoomToBox([-157, 10], 1.75, 1)}
          title="Teatro Pacifico & Hawaii (Pearl Harbor, Hawaii, Polinesia Francese)"
          className="w-10 h-10 font-oswald text-[10px] tracking-wider text-[#e8c979] bg-gradient-to-b from-[#1b1f23] to-[#101316] border border-[#6a5a2f] hover:border-[#c9a557] hover:text-white transition-all shadow-md"
        >
          PAC
        </button>

        <button
          onClick={() => zoomToBox([70, -2], 1.85, 0)}
          title="Teatro Oceano Indiano & Isole (Maldive, Seychelles, Mauritius)"
          className="w-10 h-10 font-oswald text-[10px] tracking-wider text-[#e8c979] bg-gradient-to-b from-[#1b1f23] to-[#101316] border border-[#6a5a2f] hover:border-[#c9a557] hover:text-white transition-all shadow-md"
        >
          IND
        </button>

        <button
          onClick={() =>
            zoomToBox(
              [
                [5, 0],
                [50, 0],
                [50, 45],
                [5, 45],
                [5, 0],
              ],
              1.85
            )
          }
          title="Teatro Mediterraneo & AOI (Italia, Grecia, Egitto, Corno d'Africa)"
          className="w-10 h-10 font-oswald text-[11px] tracking-wider text-[#e8c979] bg-gradient-to-b from-[#1b1f23] to-[#101316] border border-[#6a5a2f] hover:border-[#c9a557] hover:text-white transition-all shadow-md"
        >
          MED
        </button>

        <button
          onClick={() =>
            zoomToBox(
              [
                [-10, 34],
                [5, 34],
                [5, 44.5],
                [-10, 44.5],
                [-10, 34],
              ],
              2.2
            )
          }
          title="Teatro Guerra Civile Spagnola & Marocco"
          className="w-10 h-10 font-oswald text-[11px] tracking-wider text-[#e8c979] bg-gradient-to-b from-[#1b1f23] to-[#101316] border border-[#6a5a2f] hover:border-[#c9a557] hover:text-white transition-all shadow-md"
        >
          ESP
        </button>

        <button
          onClick={resetView}
          title="Vista Globale (Reset)"
          className="w-10 h-10 font-oswald text-base text-[#e8c979] bg-gradient-to-b from-[#1b1f23] to-[#101316] border border-[#6a5a2f] hover:border-[#c9a557] hover:text-white transition-all shadow-md"
        >
          ⌂
        </button>
      </div>
    </div>
  );
};
