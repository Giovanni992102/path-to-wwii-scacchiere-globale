import React, { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import { getOwnerMeta, FACTION_COLORS, formatHierarchyBadge } from '../data/owners';
import {
  HISTORICAL_FORTIFICATION_LINES,
  HISTORICAL_NAVAL_BASES,
} from '../data/historicalFortifications';
import { HISTORICAL_BATTLES, type HistoricalBattle } from '../data/historicalBattles';
import { HISTORICAL_SEA_LANES } from '../data/historicalSeaLanes';
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
};

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

// Major historical capitals & strategic cities
const HISTORICAL_CITIES: {
  id: string;
  name: string;
  historicalNames: Record<string, string>; // By step or owner
  coords: [number, number];
  isCapital: boolean;
  ownerKey: string;
}[] = [
  // Grandi Capitali e Metropoli Mondiali
  { id: 'berlin', name: 'Berlin', historicalNames: { step7: 'Berlin (Patto Tripartito)', default: 'Berlin (Reichshauptstadt)' }, coords: [13.40, 52.52], isCapital: true, ownerKey: 'GER' },
  { id: 'london', name: 'London', historicalNames: { step7: 'London (The Blitz / RAF HQ)', default: 'London (Whitehall)' }, coords: [-0.12, 51.50], isCapital: true, ownerKey: 'UK' },
  { id: 'roma', name: 'Roma', historicalNames: { default: 'Roma (Capitale dell\'Impero)' }, coords: [12.49, 41.90], isCapital: true, ownerKey: 'ITA' },
  { id: 'paris', name: 'Paris', historicalNames: { default: 'Paris', step6: 'Paris (Zone Occupée)' }, coords: [2.35, 48.85], isCapital: true, ownerKey: 'FRA' },
  { id: 'vichy', name: 'Vichy', historicalNames: { default: 'Vichy (État Français)' }, coords: [3.42, 46.12], isCapital: true, ownerKey: 'VIC' },
  { id: 'moscow', name: 'Moskva', historicalNames: { default: 'Mosca (Kremlino)' }, coords: [37.61, 55.75], isCapital: true, ownerKey: 'SOV' },
  { id: 'leningrad', name: 'Leningrad', historicalNames: { default: 'Leningrado (Kirov / Baltico)' }, coords: [30.33, 59.93], isCapital: false, ownerKey: 'SOV' },
  { id: 'tokyo', name: 'Tokyo', historicalNames: { default: 'Tokyo (Impero Giapponese)' }, coords: [139.69, 35.68], isCapital: true, ownerKey: 'JAP' },
  { id: 'nanjing', name: 'Nanjing', historicalNames: { step0: 'Nanchino (Capitale Nazionale)', step1: 'Nanchino (Nanjing)', step6: 'Nanchino (Wang Jingwei)', default: 'Nanchino (Nanjing)' }, coords: [118.79, 32.06], isCapital: true, ownerKey: 'CHI' },
  { id: 'chongqing', name: 'Chongqing', historicalNames: { default: 'Chongqing (Capitale di Guerra)' }, coords: [106.55, 29.56], isCapital: true, ownerKey: 'CHI' },
  { id: 'beiping', name: 'Beiping', historicalNames: { default: 'Beiping (Pechino)' }, coords: [116.40, 39.90], isCapital: false, ownerKey: 'CHI' },
  { id: 'kyzyl', name: 'Kyzyl', historicalNames: { default: 'Kyzyl (Khem-Beldir — Capitale di Tannu Tuva)' }, coords: [94.44, 51.72], isCapital: true, ownerKey: 'TUV' },
  { id: 'washington', name: 'Washington', historicalNames: { default: 'Washington, D.C.' }, coords: [-77.03, 38.90], isCapital: true, ownerKey: 'USA' },

  // Città e Centri Strategici Tedeschi / Ostmark / Sudetenland
  { id: 'munchen', name: 'München', historicalNames: { default: 'München (Hauptstadt der Bewegung)' }, coords: [11.58, 48.14], isCapital: false, ownerKey: 'GER' },
  { id: 'koln', name: 'Köln', historicalNames: { default: 'Köln (Rheinland)' }, coords: [6.96, 50.94], isCapital: false, ownerKey: 'GER' },
  { id: 'hamburg', name: 'Hamburg', historicalNames: { default: 'Hamburg (Kriegsmarine Werft)' }, coords: [9.99, 53.55], isCapital: false, ownerKey: 'GER' },
  { id: 'essen', name: 'Essen', historicalNames: { default: 'Essen (Krupp Werke / Ruhr)' }, coords: [7.01, 51.46], isCapital: false, ownerKey: 'GER' },
  { id: 'konigsberg', name: 'Königsberg', historicalNames: { default: 'Königsberg in Preußen' }, coords: [20.51, 54.71], isCapital: false, ownerKey: 'GER' },
  { id: 'breslau', name: 'Breslau', historicalNames: { default: 'Breslau (Schlesien)' }, coords: [17.03, 51.10], isCapital: false, ownerKey: 'GER' },
  { id: 'wien', name: 'Wien', historicalNames: { step0: 'Wien (Österreich)', step1: 'Wien (Ostmark)', default: 'Wien (Ostmark)' }, coords: [16.37, 48.20], isCapital: true, ownerKey: 'AUS' },

  // Città e Poli Strategici Italiani & Microstati
  { id: 'milano', name: 'Milano', historicalNames: { default: 'Milano (Polo Industriale Breda/Alfa)' }, coords: [9.19, 45.46], isCapital: false, ownerKey: 'ITA' },
  { id: 'torino', name: 'Torino', historicalNames: { default: 'Torino (FIAT Grandi Motori)' }, coords: [7.68, 45.07], isCapital: false, ownerKey: 'ITA' },
  { id: 'genova', name: 'Genova', historicalNames: { default: 'Genova (Cantieri Ansaldo)' }, coords: [8.93, 44.41], isCapital: false, ownerKey: 'ITA' },
  { id: 'taranto', name: 'Taranto', historicalNames: { default: 'Taranto (Mar Piccolo — Base Flotta)' }, coords: [17.23, 40.47], isCapital: false, ownerKey: 'ITA' },
  { id: 'napoli', name: 'Napoli', historicalNames: { default: 'Napoli (Porto d\'Imbarco Oltremare)' }, coords: [14.27, 40.85], isCapital: false, ownerKey: 'ITA' },
  { id: 'trieste', name: 'Trieste', historicalNames: { default: 'Trieste (Adriatico / Cantieri S. Marco)' }, coords: [13.78, 45.65], isCapital: false, ownerKey: 'ITA' },
  { id: 'san_marino', name: 'San Marino', historicalNames: { default: 'Città di San Marino (Titano)' }, coords: [12.4617, 43.9406], isCapital: true, ownerKey: 'SMR' },
  { id: 'vaticano', name: 'Città del Vaticano', historicalNames: { default: 'Città del Vaticano (San Pietro)' }, coords: [12.4507, 41.9041], isCapital: true, ownerKey: 'VAT' },
  { id: 'andorra_la_vella', name: 'Andorra la Vella', historicalNames: { default: 'Andorra la Vella (Valls d\'Andorra)' }, coords: [1.5218, 42.5063], isCapital: true, ownerKey: 'AND' },

  // Centri Francesi e Linee Difensive
  { id: 'marseille', name: 'Marseille', historicalNames: { default: 'Marseille (Grand Port de l\'Empire)' }, coords: [5.37, 43.30], isCapital: false, ownerKey: 'FRA' },
  { id: 'lyon', name: 'Lyon', historicalNames: { default: 'Lyon (Zone Libre)' }, coords: [4.83, 45.76], isCapital: false, ownerKey: 'FRA' },
  { id: 'bordeaux', name: 'Bordeaux', historicalNames: { default: 'Bordeaux (Base Sommergibili BETASOM)' }, coords: [-0.58, 44.84], isCapital: false, ownerKey: 'FRA' },
  { id: 'strasbourg', name: 'Strasbourg', historicalNames: { step6: 'Straßburg (Gau Baden-Elsass)', default: 'Strasbourg (Alsazia)' }, coords: [7.75, 48.57], isCapital: false, ownerKey: 'FRA' },
  { id: 'metz', name: 'Metz', historicalNames: { step6: 'Metz (CdZ-Gebiet Lothringen)', default: 'Metz (Fortificazioni Lorena)' }, coords: [6.18, 49.12], isCapital: false, ownerKey: 'FRA' },
  { id: 'dunkerque', name: 'Dunkerque', historicalNames: { default: 'Dunkerque (Canale della Manica)' }, coords: [2.38, 51.03], isCapital: false, ownerKey: 'FRA' },

  // Roccaforti Britanniche
  { id: 'portsmouth', name: 'Portsmouth', historicalNames: { default: 'Portsmouth (Royal Navy Dockyard)' }, coords: [-1.09, 50.80], isCapital: false, ownerKey: 'UK' },
  { id: 'scapa_flow', name: 'Scapa Flow', historicalNames: { default: 'Scapa Flow (Home Fleet Anchorage)' }, coords: [-3.05, 58.89], isCapital: false, ownerKey: 'UK' },
  { id: 'gibraltar', name: 'Gibraltar', historicalNames: { default: 'Gibraltar (The Rock / Stretto)' }, coords: [-5.352, 36.134], isCapital: true, ownerKey: 'GIB' },
  { id: 'valletta', name: 'Valletta', historicalNames: { default: 'Valletta (Fortezza di Malta)' }, coords: [14.51, 35.90], isCapital: false, ownerKey: 'UK' },

  // Regno d'Egitto
  { id: 'cairo', name: 'Al-Qahirah', historicalNames: { default: 'Il Cairo (Capitale Reale — Palazzo Abdin)' }, coords: [31.2357, 30.0444], isCapital: true, ownerKey: 'EGY' },
  { id: 'alexandria', name: 'Al-Iskandariyah', historicalNames: { default: 'Alessandria (Base Navale Mediterranean Fleet)' }, coords: [29.9187, 31.2001], isCapital: false, ownerKey: 'EGY' },
  { id: 'portsaid', name: 'Port Said', historicalNames: { default: 'Port Said (Imbocco Canale di Suez)' }, coords: [32.3019, 31.2653], isCapital: false, ownerKey: 'EGY' },

  // Polonia e Balcani
  { id: 'warszawa', name: 'Warszawa', historicalNames: { step5: 'Warschau (Generalgouvernement)', default: 'Warszawa (Varsavia)' }, coords: [21.01, 52.22], isCapital: true, ownerKey: 'POL' },
  { id: 'krakow', name: 'Kraków', historicalNames: { step5: 'Krakau (Sitz des Generalgouverneurs)', default: 'Kraków (Cracovia)' }, coords: [19.94, 50.06], isCapital: false, ownerKey: 'POL' },
  { id: 'gdynia', name: 'Gdynia', historicalNames: { step5: 'Gotenhafen (Kriegsmarine)', default: 'Gdynia (Porto del Corridoio)' }, coords: [18.53, 54.52], isCapital: false, ownerKey: 'POL' },
  { id: 'danzig', name: 'Danzig', historicalNames: { step5: 'Danzig (Reichsgau Danzig-Westpreußen)', default: 'Freie Stadt Danzig' }, coords: [18.64, 54.35], isCapital: false, ownerKey: 'DANZIG' },
  { id: 'lwow', name: 'Lwów', historicalNames: { step5: 'Lvov (RSS Ucraina)', default: 'Lwów (Kresy Południowo-Wschodnie)' }, coords: [24.03, 49.84], isCapital: false, ownerKey: 'POL' },
  { id: 'wilno', name: 'Wilno', historicalNames: { step5: 'Vilnius (Lietuva)', step6: 'Vilnius (RSS Lituana)', default: 'Wilno (Kresy Północno-Wschodnie)' }, coords: [25.28, 54.69], isCapital: false, ownerKey: 'POL' },
  { id: 'praha', name: 'Praha', historicalNames: { step3: 'Prag (Protektorat Böhmen-Mähren)', default: 'Praha (Praga)' }, coords: [14.43, 50.07], isCapital: true, ownerKey: 'CZE' },
  { id: 'bratislava', name: 'Bratislava', historicalNames: { step3: 'Bratislava (Slovenská republika)', default: 'Bratislava (Pressburg)' }, coords: [17.11, 48.14], isCapital: true, ownerKey: 'SLO' },
  { id: 'budapest', name: 'Budapest', historicalNames: { default: 'Budapest (Regno d\'Ungheria)' }, coords: [19.04, 47.50], isCapital: true, ownerKey: 'HUN' },
  { id: 'cluj', name: 'Cluj', historicalNames: { step7: 'Kolozsvár (Észak-Erdély — Ungheria)', default: 'Cluj (Transilvania)' }, coords: [23.59, 46.77], isCapital: false, ownerKey: 'ROM' },
  { id: 'bucuresti', name: 'București', historicalNames: { step7: 'București (Stato Nazionale Legionario — Antonescu)', default: 'București (România Mare)' }, coords: [26.10, 44.43], isCapital: true, ownerKey: 'ROM' },
  { id: 'ploiesti', name: 'Ploiești', historicalNames: { step7: 'Ploiești (Pozzi Petroliferi / Deutsche Heeresmission)', default: 'Ploiești (Pozzi Petroliferi Astra Română)' }, coords: [26.02, 44.94], isCapital: false, ownerKey: 'ROM' },
  { id: 'beograd', name: 'Beograd', historicalNames: { default: 'Beograd (Regno di Jugoslavia)' }, coords: [20.46, 44.82], isCapital: true, ownerKey: 'YUG' },
  { id: 'zagreb', name: 'Zagreb', historicalNames: { step4: 'Zagreb (Banovina Hrvatska)', default: 'Zagreb (Savska Banovina)' }, coords: [15.98, 45.81], isCapital: false, ownerKey: 'YUG' },
  { id: 'athina', name: 'Athina', historicalNames: { step7: 'Atene ("OXI" — Belligerante Alleato)', default: 'Atene (Regno di Grecia)' }, coords: [23.73, 37.98], isCapital: true, ownerKey: 'GRE' },
  { id: 'sofia', name: 'Sofia', historicalNames: { default: 'Sofia (Zarato di Bulgaria)' }, coords: [23.32, 42.70], isCapital: true, ownerKey: 'BUL' },

  // Europa Settentrionale e Baltici
  { id: 'helsinki', name: 'Helsinki', historicalNames: { default: 'Helsinki (Suomi)' }, coords: [24.93, 60.16], isCapital: true, ownerKey: 'FIN' },
  { id: 'mariehamn', name: 'Mariehamn', historicalNames: { default: 'Mariehamn / Maarianhamina (Åland)' }, coords: [19.94, 60.10], isCapital: false, ownerKey: 'FIN' },
  { id: 'stockholm', name: 'Stockholm', historicalNames: { default: 'Stockholm (Sverige)' }, coords: [18.06, 59.33], isCapital: true, ownerKey: 'SWE' },
  { id: 'oslo', name: 'Oslo', historicalNames: { step6: 'Oslo (Quisling / Terboven)', default: 'Oslo (Norge)' }, coords: [10.75, 59.91], isCapital: true, ownerKey: 'NOR' },
  { id: 'narvik', name: 'Narvik', historicalNames: { default: 'Narvik (Terminale Ferroviario del Ferro)' }, coords: [17.43, 68.44], isCapital: false, ownerKey: 'NOR' },
  { id: 'kobenhavn', name: 'København', historicalNames: { default: 'København (Danmark)' }, coords: [12.57, 55.68], isCapital: true, ownerKey: 'DEN' },
  { id: 'tallinn', name: 'Tallinn', historicalNames: { step6: 'Tallinn (RSS Estone)', default: 'Tallinn (Reval)' }, coords: [24.75, 59.44], isCapital: true, ownerKey: 'EST' },
  { id: 'riga', name: 'Riga', historicalNames: { step6: 'Riga (RSS Lettone)', default: 'Riga (Latvija)' }, coords: [24.11, 56.95], isCapital: true, ownerKey: 'LAT' },
  { id: 'kaunas', name: 'Kaunas', historicalNames: { default: 'Kaunas (Capitale Provvisoria Lituana)' }, coords: [23.90, 54.90], isCapital: true, ownerKey: 'LIT' },

  // Teatri Iberico, Nordafricano e Continentale Africano
  { id: 'madrid', name: 'Madrid', historicalNames: { default: 'Madrid (No Pasarán)' }, coords: [-3.70, 40.41], isCapital: true, ownerKey: 'SPR' },
  { id: 'burgos', name: 'Burgos', historicalNames: { default: 'Burgos (Junta de Defensa Nacional)' }, coords: [-3.70, 42.34], isCapital: false, ownerKey: 'SPA' },
  { id: 'barcelona', name: 'Barcelona', historicalNames: { default: 'Barcelona (Generalitat de Catalunya)' }, coords: [2.17, 41.38], isCapital: false, ownerKey: 'SPR' },
  { id: 'sevilla', name: 'Sevilla', historicalNames: { default: 'Sevilla (Queipo de Llano)' }, coords: [-5.99, 37.38], isCapital: false, ownerKey: 'SPA' },
  { id: 'tripoli', name: 'Tripoli', historicalNames: { default: 'Tripoli (Governatorato Generale Libia)' }, coords: [13.19, 32.88], isCapital: true, ownerKey: 'ITA' },
  { id: 'benghazi', name: 'Bengasi', historicalNames: { default: 'Bengasi (Comando Cirenaica)' }, coords: [20.06, 32.11], isCapital: false, ownerKey: 'ITA' },
  { id: 'cairo', name: 'Il Cairo', historicalNames: { default: 'Il Cairo (Regno d\'Egitto / HQ Middle East)' }, coords: [31.23, 30.04], isCapital: true, ownerKey: 'EGY' },
  { id: 'alexandria', name: 'Alessandria', historicalNames: { default: 'Alessandria d\'Egitto (HQ Mediterranean Fleet)' }, coords: [29.91, 31.20], isCapital: false, ownerKey: 'EGY' },
  { id: 'port_said', name: 'Porto Said', historicalNames: { default: 'Port Said (Ingresso Canale di Suez)' }, coords: [32.30, 31.26], isCapital: false, ownerKey: 'EGY' },
  { id: 'suez', name: 'Suez', historicalNames: { default: 'Suez (Sbocco Mar Rosso Canale)' }, coords: [32.55, 29.97], isCapital: false, ownerKey: 'EGY' },
  { id: 'mersa_matruh', name: 'Mersa Matruh', historicalNames: { step7: 'Mersa Matruh (Fronte Sidi Barrani / Western Desert Force)', default: 'Mersa Matruh (Piazzaforte Western Desert)' }, coords: [27.24, 31.35], isCapital: false, ownerKey: 'EGY' },
  { id: 'aswan', name: 'Aswan', historicalNames: { default: 'Aswan (Diga e Confine Nubiano)' }, coords: [32.90, 24.09], isCapital: false, ownerKey: 'EGY' },
  { id: 'khartoum', name: 'Khartoum', historicalNames: { default: 'Khartoum (Sudan Anglo-Egiziano)' }, coords: [32.55, 15.50], isCapital: true, ownerKey: 'UK' },
  { id: 'algiers', name: 'Algeri', historicalNames: { step6: 'Alger (Gouvernement Général — Vichy)', default: 'Alger (Préfecture d\'Alger / AFN)' }, coords: [3.05, 36.75], isCapital: true, ownerKey: 'FRA' },
  { id: 'tunis', name: 'Tunisi', historicalNames: { step6: 'Tunis (Protectorat de Tunisie — Vichy)', default: 'Tunis (Protectorat de Tunisie)' }, coords: [10.18, 36.80], isCapital: true, ownerKey: 'FRA' },
  { id: 'casablanca', name: 'Casablanca', historicalNames: { step6: 'Casablanca (Maroc — Résidence Générale Vichy)', default: 'Casablanca (Port Atlantique du Maroc)' }, coords: [-7.58, 33.57], isCapital: false, ownerKey: 'FRA' },
  { id: 'dakar', name: 'Dakar', historicalNames: { step6: 'Dakar (Haut-Commissariat AOF — Vichy)', step7: 'Dakar (AOF Vichy — Operazione Menace Respinta)', default: 'Dakar (Capitale Afrique Occidentale Française)' }, coords: [-17.44, 14.69], isCapital: true, ownerKey: 'FRA' },
  { id: 'brazzaville', name: 'Brazzaville', historicalNames: { step6: 'Brazzaville (Capitale Afrique Française Libre — De Gaulle / Éboué)', default: 'Brazzaville (Capitale Afrique Équatoriale)' }, coords: [15.28, -4.26], isCapital: true, ownerKey: 'FRA' },
  { id: 'leopoldville', name: 'Léopoldville', historicalNames: { default: 'Léopoldville (Congo Belge / Force Publique)' }, coords: [15.31, -4.32], isCapital: true, ownerKey: 'BEL' },
  { id: 'addis_ababa', name: 'Addis Ababa', historicalNames: { default: 'Addis Abeba (AOI — Sede Viceré)' }, coords: [38.74, 9.02], isCapital: true, ownerKey: 'ITA' },
  { id: 'asmara', name: 'Asmara', historicalNames: { default: 'Asmara (Governatorato dell\'Eritrea)' }, coords: [38.92, 15.33], isCapital: false, ownerKey: 'ITA' },
  { id: 'massawa', name: 'Massaua', historicalNames: { default: 'Massaua (Base Navale Regia Marina Mar Rosso)' }, coords: [39.46, 15.60], isCapital: false, ownerKey: 'ITA' },
  { id: 'mogadishu', name: 'Mogadiscio', historicalNames: { default: 'Mogadiscio (Somalia Italiana)' }, coords: [45.34, 2.04], isCapital: false, ownerKey: 'ITA' },
  { id: 'nairobi', name: 'Nairobi', historicalNames: { default: 'Nairobi (Colonia del Kenya / KAR)' }, coords: [36.82, -1.29], isCapital: true, ownerKey: 'UK' },
  { id: 'pretoria', name: 'Pretoria', historicalNames: { default: 'Pretoria (Unione Sudafricana)' }, coords: [28.18, -25.74], isCapital: true, ownerKey: 'SAF' },
  { id: 'cape_town', name: 'Città del Capo', historicalNames: { default: 'Cape Town / Simon\'s Town (Rotta del Capo)' }, coords: [18.42, -33.92], isCapital: false, ownerKey: 'SAF' },
  { id: 'freetown', name: 'Freetown', historicalNames: { default: 'Freetown (Stazione Navale e Convogli Sierra Leone)' }, coords: [-13.23, 8.48], isCapital: true, ownerKey: 'UK' },
  { id: 'monrovia', name: 'Monrovia', historicalNames: { default: 'Monrovia (Repubblica di Liberia)' }, coords: [-10.79, 6.30], isCapital: true, ownerKey: 'LBR' },
  { id: 'tangier', name: 'Tangeri', historicalNames: { default: 'Tanger (Zone Internationale / Occupazione Spagnola 1940)' }, coords: [-5.80, 35.77], isCapital: false, ownerKey: 'TANGER' },

  // Teatri URSS Occidentale
  { id: 'kyiv', name: 'Kyiv', historicalNames: { default: 'Kiev (Capitale della RSS Ucraina)' }, coords: [30.52, 50.45], isCapital: false, ownerKey: 'SOV' },
  { id: 'kharkiv', name: 'Kharkiv', historicalNames: { default: 'Charkiv (Fabbrica Carri KhPZ n. 183)' }, coords: [36.23, 50.00], isCapital: false, ownerKey: 'SOV' },
  { id: 'stalingrad', name: 'Stalingrad', historicalNames: { default: 'Stalingrado (Fabbrica Trattori Dzeržinskij)' }, coords: [44.51, 48.71], isCapital: false, ownerKey: 'SOV' },
  { id: 'sevastopol', name: 'Sevastopol', historicalNames: { default: 'Sebastopoli (Fortezza Principale Mar Nero)' }, coords: [33.52, 44.62], isCapital: false, ownerKey: 'SOV' },
  { id: 'smolensk', name: 'Smolensk', historicalNames: { default: 'Smolensk (Distretto Militare Occidentale)' }, coords: [32.05, 54.78], isCapital: false, ownerKey: 'SOV' },
  { id: 'minsk', name: 'Minsk', historicalNames: { default: 'Minsk (Capitale della RSS Bielorussa)' }, coords: [27.56, 53.90], isCapital: false, ownerKey: 'SOV' },
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
    return r ? getOwnerMeta(r.o).c : '#1c2026';
  }, []);

  const positionTooltip = useCallback((clientX: number, clientY: number, html: string) => {
    if (!tooltipRef.current) return;
    const tt = tooltipRef.current;
    tt.innerHTML = html;
    tt.style.display = 'block';

    const pad = 16;
    const tw = tt.offsetWidth;
    const th = tt.offsetHeight;
    let x = clientX + pad;
    let y = clientY + pad;
    if (x + tw > window.innerWidth - 8) x = clientX - tw - pad;
    if (y + th > window.innerHeight - 8) y = clientY - th - pad;
    tt.style.left = `${x}px`;
    tt.style.top = `${y}px`;
  }, []);

  const hideTooltip = useCallback(() => {
    if (tooltipRef.current) tooltipRef.current.style.display = 'none';
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
    og.append('stop').attr('offset', '0%').attr('stop-color', '#0e1620');
    og.append('stop').attr('offset', '60%').attr('stop-color', '#090d14');
    og.append('stop').attr('offset', '100%').attr('stop-color', '#040609');

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
        };
        gSeaLanes
          .append('path')
          .datum(geoLine)
          .attr('class', `sea-lane sea-lane-${lane.id}`)
          .attr('d', path as any)
          .attr('fill', 'none')
          .attr('stroke', lane.color)
          .attr('stroke-width', '0.8')
          .attr('stroke-dasharray', '3 3')
          .attr('stroke-opacity', '0.35')
          .attr('cursor', 'pointer')
          .on('pointerenter', function (event) {
            hoveredInfoRef.current = null;
            svg.selectAll<SVGPathElement, any>(`.sea-lane-${lane.id}`).attr('stroke-width', '1.6').attr('stroke-opacity', '0.85');
            showTooltip(
              event,
              `<div class="font-oswald text-[13px] font-bold text-[#e8c979] uppercase border-b border-[#3a3420] pb-1 mb-1">
                ⚓ ${lane.name}
              </div>
              <div class="text-[11.5px] text-[#cfd3d6] mb-0.5 font-semibold">${lane.historicalName}</div>
              <div class="text-[11px] text-[#8b9298] leading-tight">${lane.description}</div>`
            );
          })
          .on('pointerleave', function () {
            svg.selectAll<SVGPathElement, any>(`.sea-lane-${lane.id}`).attr('stroke-width', '0.8').attr('stroke-opacity', '0.35');
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
        .text((d: any) => STRATEGIC_ISLAND_LABELS[d.id] || d.properties?.NAME || d.id);

      // 6. Fortifications Layer (Delicate, elegant historical defense lines)
      const gForts = gCopy.append('g').attr('class', 'fortifications-layer');
      HISTORICAL_FORTIFICATION_LINES.forEach((fline) => {
        const geoLine: any = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: fline.coordinates,
          },
        };

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
              .attr('transform', `translate(${pt[0]}, ${pt[1]})`)
              .attr('class', 'fort-node cursor-pointer')
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
          const gBase = gNaval
            .append('g')
            .attr('transform', `translate(${pt[0]}, ${pt[1]})`)
            .attr('class', `naval-base naval-base-${base.id} cursor-pointer`)
            .on('pointerenter', (event) => {
              hoveredInfoRef.current = null;
              showTooltip(
                event,
                `<div class="font-oswald text-[13px] font-bold text-[#5aa0c2] uppercase border-b border-[#3a3420] pb-1 mb-1">
                  ⚓ ${base.name} (${base.nation})
                </div>
                <div class="text-[11.5px] text-[#cfd3d6] font-semibold mb-0.5">${base.historicalName}</div>
                <div class="text-[11px] text-[#8b9298] leading-tight">${base.description}</div>
                <div class="text-[9.5px] font-mono-tech text-[#c9a557] mt-1 uppercase">Teatro: ${base.theater} · ${base.type.replace('_', ' ')}</div>`
              );
            })
            .on('pointerleave', hideTooltip);

          gBase
            .append('rect')
            .attr('x', '-1.6')
            .attr('y', '-1.6')
            .attr('width', '3.2')
            .attr('height', '3.2')
            .attr('fill', '#102434')
            .attr('stroke', '#5aa0c2')
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

      // 9. City Labels Layer (Hidden by default, ultra-clean if enabled)
      const gCities = gCopy
        .append('g')
        .attr('class', 'city-labels-layer')
        .attr('display', layers.cityLabels ? 'inline' : 'none');

      HISTORICAL_CITIES.forEach((city) => {
        const pt = projection(city.coords);
        if (pt && !isNaN(pt[0]) && !isNaN(pt[1])) {
          const gCity = gCities
            .append('g')
            .datum(city)
            .attr('transform', `translate(${pt[0]}, ${pt[1]})`)
            .attr('class', `city-marker pointer-events-none ${city.isCapital ? 'city-capital' : 'city-minor'}`);

          gCity
            .append('circle')
            .attr('r', city.isCapital ? '1.2' : '0.8')
            .attr('fill', city.isCapital ? '#e8c979' : '#cfd3d6')
            .attr('stroke', 'none');

          let cityName = '';
          for (let st = currentStep; st >= 0; st--) {
            if (city.historicalNames[`step${st}`]) {
              cityName = city.historicalNames[`step${st}`];
              break;
            }
          }
          if (!cityName) cityName = city.historicalNames.default || city.name;
          gCity
            .append('text')
            .attr('x', '3')
            .attr('y', '2')
            .attr('fill', city.isCapital ? '#f0e6c8' : '#a0a8b0')
            .attr('stroke', '#000000')
            .attr('stroke-width', '0.6')
            .attr('paint-order', 'stroke fill')
            .style('font-family', 'Oswald, sans-serif')
            .style('font-size', '6.5px')
            .style('font-weight', city.isCapital ? '600' : '400')
            .style('letter-spacing', '0.2px')
            .style('pointer-events', 'none')
            .text(cityName);
        }
      });

      // 10. Tactical Highlight Overlay Layer (Guarantees crisp borders on top without mutating base DOM)
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
      currentHoveredNode = null;
      svg.selectAll('.hov-overlay-path').attr('d', null);
      hoveredInfoRef.current = null;
    }

    // Zoom behavior with infinite horizontal wrapping & viewport culling
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.35, 25])
      .translateExtent([
        [-Infinity, -H * 1.5],
        [Infinity, H * 2.5],
      ])
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

        gRoot.attr('transform', event.transform);

        const k = event.transform.k || 1;
        gRoot.classed('zoom-out', k < 0.95);
        gRoot.classed('zoom-deep', k < 0.6);

        // Infinite conveyor belt update:
        // Position of camera center in world coordinates:
        const xCenter = (W / 2 - event.transform.x) / k;
        const C = Math.round(xCenter / WORLD_WIDTH);
        const needed = [C - 1, C, C + 1];

        // Frustum / Viewport bounds in world coordinates:
        const xViewMin = -event.transform.x / k;
        const xViewMax = (W - event.transform.x) / k;

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
      })
      .on('end', () => {
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
        target.closest('.prov, .cty, .hb, .island-beacon, .battle-marker, .naval-base, .fort-line, .sea-lane')
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

      const meta = getOwnerMeta(res.o);
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

      const meta = getOwnerMeta(res.o);
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

    // Update city labels text for current step
    svg.selectAll<SVGGElement, any>('.city-marker').each(function (city) {
      if (city) {
        let cityName = '';
        for (let st = currentStep; st >= 0; st--) {
          if (city.historicalNames[`step${st}`]) {
            cityName = city.historicalNames[`step${st}`];
            break;
          }
        }
        if (!cityName) cityName = city.historicalNames.default || city.name;
        d3.select(this).select('text').text(cityName);
      }
    });

    // Real-time update: If mouse is currently hovering over a territory, update its tooltip to the new step immediately!
    if (hoveredInfoRef.current && tooltipRef.current && tooltipRef.current.style.display !== 'none') {
      const { data, clientX, clientY } = hoveredInfoRef.current;
      const res = data.__res ? data.__res[currentStep] : null;
      if (res) {
        const meta = getOwnerMeta(res.o);
        const fac = res.fac || meta.f;
        const html = renderTerritoryTooltipHtml(data, res, meta, fac, currentStep);
        positionTooltip(clientX, clientY, html);
      } else {
        hideTooltip();
      }
    }
  }, [currentStep, fillFor, layers.battles, renderTerritoryTooltipHtml, positionTooltip, hideTooltip]);

  // Layer Visibility Updates across all synchronized world copies
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    svg.selectAll('.fortifications-layer').attr('display', layers.fortifications ? 'inline' : 'none');
    svg.selectAll('.naval-bases-layer').attr('display', layers.navalBases ? 'inline' : 'none');
    svg.selectAll('.sea-lanes-layer').attr('display', layers.seaLanes ? 'inline' : 'none');
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
    <div className="absolute inset-0 overflow-hidden bg-[#07090c]">
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
