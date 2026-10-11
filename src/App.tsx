import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as topojson from 'topojson-client';
import * as d3 from 'd3';
import { StepInfo, StatsStep } from './types';
import { STEPS } from './data/historySteps';
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
} from './data/georesolver';
import { getOwnerMeta } from './data/owners';
import { getExtendedToponym } from './data/historicalToponyms';
import { getCountryFlagSvg } from './data/historicalFlags';
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
  SAN_MARINO_FEATURE,
  VATICAN_CITY_FEATURE,
  GIBRALTAR_COLONY_FEATURE,
  ANDORRA_FEATURE,
  LIECHTENSTEIN_FEATURE,
} from './data/historicalBorders';
import { KRESY_POWIAT_FEATURES } from './data/kresyPowiats';
import { USSR_REGIONAL_FEATURES } from './data/ussrRegions';
import { CHINA_REGIONAL_FEATURES } from './data/chinaRegions';
import { CZECHOSLOVAKIA_REGIONAL_FEATURES } from './data/czechoslovakiaRegions';
import { RadarLoader } from './components/RadarLoader';
import { TopBar } from './components/TopBar';
import { OperationalFocusPanel } from './components/OperationalFocusPanel';
import { IntelligencePanel } from './components/IntelligencePanel';
import { TimelineController } from './components/TimelineController';
import { SearchModal } from './components/SearchModal';
import { InfoModal } from './components/InfoModal';
import { ToastNotice } from './components/ToastNotice';
import { TacticalMap } from './components/TacticalMap';
import { WORLD_1938_GEOJSON } from './data/world1938';
import { processHistoricalCartographyPipeline } from './data/historicalEngine';
import { MapLayerControls, LayerVisibilityState } from './components/MapLayerControls';
import { tacticalAudio } from './data/audioSynthesizer';
import { HistoricalBattle } from './data/historicalBattles';
import { FortificationLine, NavalBase } from './data/historicalFortifications';

// Historical Geometries: Protettorato Spagnolo del Marocco (Rif & Yebala) and Zona Internazionale di Tangeri
const SPANISH_RIF_FEATURE: any = {
  type: 'Feature',
  properties: {
    NAME: 'Spanish Morocco',
    NUTS_NAME: 'Protettorato Spagnolo del Marocco (Rif)',
    NAME_ENGL: 'Spanish Morocco (Rif)',
    CNTR_NAME: 'Protettorato Spagnolo del Marocco',
    CNTR_ID: 'ES_RIF',
    CNTR_CODE: 'ES_RIF',
    ADMIN: 'Spanish Morocco',
    SOVEREIGNT: 'Spain',
    CAPITAL: 'Tetuán',
    HISTORICAL_NOTE:
      'Alta Comisaría de España en Marruecos (Tetuán) — Comprende i territori del Rif, Yebala, Gomara, Kert e Lucus (Larache, Alcazarquivir, Xauen, Villa Sanjurjo, Nador). Base dell\'Ejército de África e culla dell\'Alzamiento del 17-18 Luglio 1936.',
  },
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-6.302049, 34.861438],
        [-5.928758, 35.727859],
        [-5.750, 35.760],
        [-5.750, 35.80374892997155],
        [-5.565000, 35.862342],
        [-5.479359, 35.805205],
        [-5.171789, 35.423762],
        [-5.109631, 35.379314],
        [-4.592977, 35.151187],
        [-4.295350, 35.151786],
        [-4.027887, 35.133235],
        [-3.440804, 35.166278],
        [-3.205772, 35.268607],
        [-3.009028, 35.389979],
        [-2.829877, 35.142058],
        [-2.714807, 35.097743],
        [-2.355662, 35.053916],
        [-2.192973, 35.054248],
        [-2.500, 34.750],
        [-3.200, 34.650],
        [-3.800, 34.700],
        [-4.500, 34.780],
        [-5.200, 34.850],
        [-5.700, 35.000],
        [-6.150, 35.100],
        [-6.302049, 34.861438],
      ],
    ],
  },
  __layer: 'hb',
  __kind: 'SPANISH_RIF',
};

const TANGIER_FEATURE: any = {
  type: 'Feature',
  properties: {
    NAME: 'Tangier',
    NUTS_NAME: 'Zona Internazionale di Tangeri',
    NAME_ENGL: 'Tangier International Zone',
    CNTR_NAME: 'Tangeri',
    CNTR_ID: 'TANGIER',
    CNTR_CODE: 'TANGIER',
    ADMIN: 'International Zone of Tangier',
    SOVEREIGNT: 'International',
    CAPITAL: 'Tangeri',
    HISTORICAL_NOTE:
      'Statuto di Tangeri (1923) — Neutralità e smilitarizzazione internazionale. Occupata militarmente dalle truppe coloniali spagnole del generale Franco il 14 giugno 1940.',
  },
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-5.928758, 35.727859],
        [-5.807887, 35.785415],
        [-5.750, 35.835],
        [-5.750, 35.760],
        [-5.928758, 35.727859],
      ],
    ],
  },
  __layer: 'hb',
  __kind: 'TANGIER',
};

function fixFeatureWinding(f: any) {
  if (!f || !f.geometry) return f;
  try {
    if (f.geometry.type === 'Polygon') {
      const area = d3.geoArea(f);
      if (area > 2 * Math.PI) {
        f.geometry.coordinates = f.geometry.coordinates.map((ring: any[]) => [...ring].reverse());
      }
    } else if (f.geometry.type === 'MultiPolygon') {
      f.geometry.coordinates = f.geometry.coordinates.map((poly: any[]) => {
        const singlePoly = { type: 'Polygon', coordinates: poly };
        const area = d3.geoArea(singlePoly as any);
        if (area > 2 * Math.PI) {
          return poly.map((ring: any[]) => [...ring].reverse());
        }
        return poly;
      });
    }
  } catch (e) {
    // ignore
  }
  return f;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [logs, setLogs] = useState<{ text: string; type?: 'ok' | 'warn' | 'info' }[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [focusCoords, setFocusCoords] = useState<{
    coords: [number, number];
    zoom: number;
    key: number;
  } | null>(null);

  const [provFeatures, setProvFeatures] = useState<any[]>([]);
  const [hbFeatures, setHbFeatures] = useState<any[]>([]);
  const [cntrFeatures, setCntrFeatures] = useState<any[]>([]);
  const [hbMode, setHbMode] = useState(false);
  const [allFeatures, setAllFeatures] = useState<any[]>([]);
  const [stats, setStats] = useState<StatsStep[]>([]);

  const [toastData, setToastData] = useState<{ date: string; title: string; key: number } | null>(
    null
  );

  const [layers, setLayers] = useState<LayerVisibilityState>({
    fortifications: true,
    battles: true,
    navalBases: true,
    seaLanes: true,
    cityLabels: false,
    hatchPatterns: true,
  });

  const [isMuted, setIsMuted] = useState(tacticalAudio.getMuted());

  const handleToggleLayer = (key: keyof LayerVisibilityState) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggleAudio = () => {
    const nextMuted = tacticalAudio.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleSelectBattle = (battle: HistoricalBattle) => {
    handleSelectStep(battle.step, true);
    setFocusCoords({
      coords: battle.coords,
      zoom: 4.2,
      key: Date.now(),
    });
  };

  const handleSelectFortification = (fort: FortificationLine) => {
    if (fort.coordinates && fort.coordinates.length > 0) {
      const mid = fort.coordinates[Math.floor(fort.coordinates.length / 2)];
      setFocusCoords({
        coords: mid,
        zoom: 3.8,
        key: Date.now(),
      });
    }
  };

  const handleSelectNavalBase = (base: NavalBase) => {
    setFocusCoords({
      coords: base.coords,
      zoom: 4.5,
      key: Date.now(),
    });
  };

  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  const addLog = useCallback((text: string, type?: 'ok' | 'warn' | 'info') => {
    setLogs((prev) => [...prev.slice(-15), { text, type }]);
  }, []);

  // Self-test diagnostic runner
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
        name: 'Integrità Bandiere Autentiche (Mengjiang, PCC/Cina Sovietica, Xinjiang, Indocina, Grecia, Filippine, Tannu Tuva, Liberia, Andorra, San Marino, Vaticano, Gibilterra, Albania, Arabia Saudita, Yemen)',
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
          getCountryFlagSvg('LIBERIA').includes('data:image/png;base64') &&
          getCountryFlagSvg('AND').includes('data:image/png;base64') &&
          getCountryFlagSvg('SMR').includes('data:image/png;base64') &&
          getCountryFlagSvg('VAT').includes('data:image/png;base64') &&
          getCountryFlagSvg('GIB').includes('data:image/png;base64') &&
          getCountryFlagSvg('ALB').includes('data:image/png;base64') &&
          getCountryFlagSvg('SAU').includes('data:image/png;base64') &&
          getCountryFlagSvg('YEM').includes('data:image/png;base64'),
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
      {
        name: 'Integrità Territoriale Francia e Dipartimenti Storici (1936 vs 1940)',
        run: () =>
          // Step 0 (1936 Terza Repubblica)
          resolveFeature({ properties: { NUTS_ID: 'FR101', CNTR_CODE: 'FR', NAME: 'Paris' } }, 0).o === 'FRA' &&
          resolveFeature({ properties: { NUTS_ID: 'FR101', CNTR_CODE: 'FR', NAME: 'Paris' } }, 0).name === 'Seine (Paris)' &&
          resolveFeature({ properties: { NUTS_ID: 'FRG01', CNTR_CODE: 'FR', NAME: 'Loire-Atlantique' } }, 0).name === 'Loire-Inférieure (Nantes)' &&
          resolveFeature({ properties: { NUTS_ID: 'FRD22', CNTR_CODE: 'FR', NAME: 'Seine-Maritime' } }, 0).name === 'Seine-Inférieure (Rouen / Le Havre)' &&
          resolveFeature({ properties: { NUTS_ID: 'FRL01', CNTR_CODE: 'FR', NAME: 'Alpes-de-Haute-Provence' } }, 0).name === 'Basses-Alpes (Digne)' &&
          resolveFeature({ properties: { NUTS_ID: 'FRI15', CNTR_CODE: 'FR', NAME: 'Pyrénées-Atlantiques' } }, 0).name === 'Basses-Pyrénées (Pau / Bayonne)' &&
          resolveFeature({ properties: { NUTS_ID: 'FRH01', CNTR_CODE: 'FR', NAME: 'Côtes-d\'Armor' } }, 0).name === 'Côtes-du-Nord (Saint-Brieuc)' &&
          resolveFeature({ properties: { NUTS_ID: 'FRI32', CNTR_CODE: 'FR', NAME: 'Charente-Maritime' } }, 0).name === 'Charente-Inférieure (La Rochelle)' &&
          // Step 6 (Giugno 1940: Armistizio, Alsazia-Mosella al Reich, Vichy in Zone Libre)
          resolveFeature({ properties: { NUTS_ID: 'FRF11', CNTR_CODE: 'FR', NAME: 'Bas-Rhin' } }, 6).o === 'GER' &&
          resolveFeature({ properties: { NUTS_ID: 'FRF33', CNTR_CODE: 'FR', NAME: 'Moselle' } }, 6).o === 'GER' &&
          resolveFeature({ properties: { NUTS_ID: 'FRE11', CNTR_CODE: 'FR', NAME: 'Nord' } }, 6).o === 'GER' &&
          resolveFeature({ properties: { NUTS_ID: 'FRK11', CNTR_CODE: 'FR', NAME: 'Allier' } }, 6).o === 'VIC' &&
          resolveFeature({ properties: { NUTS_ID: 'FRK26', CNTR_CODE: 'FR', NAME: 'Rhône' } }, 6).o === 'VIC' &&
          resolveFeature({ properties: { NUTS_ID: 'FRL05', CNTR_CODE: 'FR', NAME: 'Var' } }, 6).o === 'VIC' &&
          resolveFeature({ properties: { NUTS_ID: 'FRL01', CNTR_CODE: 'FR', NAME: 'Alpes-de-Haute-Provence' } }, 6).o === 'VIC' &&
          resolveFeature({ properties: { NUTS_ID: 'FR101', CNTR_CODE: 'FR', NAME: 'Paris' } }, 6).o === 'GER',
      },
      {
        name: 'Integrità Territoriale Germania e Toponimi Storici (1936 vs 1940: Berlin, München, Nürnberg, Essen, Kiel, Saarbrücken, Sudetenland, Danzig, Memel)',
        run: () => {
          const b0 = resolveFeature({ properties: { NUTS_ID: 'DE300', CNTR_CODE: 'DE', NAME: 'Berlin' } }, 0);
          const m0 = resolveFeature({ properties: { NUTS_ID: 'DE212', CNTR_CODE: 'DE', NAME: 'München, Kreisfreie Stadt' } }, 0);
          const n0 = resolveFeature({ properties: { NUTS_ID: 'DE254', CNTR_CODE: 'DE', NAME: 'Nürnberg, Kreisfreie Stadt' } }, 0);
          const e0 = resolveFeature({ properties: { NUTS_ID: 'DEA13', CNTR_CODE: 'DE', NAME: 'Essen, Kreisfreie Stadt' } }, 0);
          const k0 = resolveFeature({ properties: { NUTS_ID: 'DEF02', CNTR_CODE: 'DE', NAME: 'Kiel, Kreisfreie Stadt' } }, 0);
          const s0 = resolveFeature({ properties: { NUTS_ID: 'DEC01', CNTR_CODE: 'DE', NAME: 'Regionalverband Saarbrücken' } }, 0);
          const sl0 = resolveFeature({ properties: { NUTS_ID: 'DEC04', CNTR_CODE: 'DE', NAME: 'Saarlouis' } }, 0);
          const ro0 = resolveFeature({ properties: { NUTS_ID: 'DE803', CNTR_CODE: 'DE', NAME: 'Rostock, Kreisfreie Stadt' } }, 0);
          const wh0 = resolveFeature({ properties: { NUTS_ID: 'DE945', CNTR_CODE: 'DE', NAME: 'Wilhelmshaven, Kreisfreie Stadt' } }, 0);
          const pe0 = resolveFeature({ properties: { NUTS_ID: 'DE80N', CNTR_CODE: 'DE', NAME: 'Vorpommern-Greifswald' } }, 0);

          // Austria all'Anschluss (Step 1)
          const wien1 = resolveFeature({ properties: { NUTS_ID: 'AT130', CNTR_CODE: 'AT', NAME: 'Wien' } }, 1);
          // Sudeti al Patto di Monaco (Step 2)
          const sudet2 = resolveFeature({ properties: { NUTS_ID: 'CZ051', CNTR_CODE: 'CZ', NAME: 'Liberecký kraj' } }, 2);
          // Memelland (Step 3)
          const memel3 = MEMEL_TERRITORY_FEATURE.__resolve(3);
          // Danzica (Step 5)
          const danzig5 = DANZIG_FREE_CITY_FEATURE.__resolve(5);

          return (
            b0.o === 'GER' && b0.name.includes('Berlin') && (b0.adminEntity || '').includes('Gau Berlin') &&
            m0.o === 'GER' && m0.name.includes('Hauptstadt der Bewegung') &&
            n0.o === 'GER' && n0.name.includes('Stadt der Reichsparteitage') &&
            e0.o === 'GER' && e0.name.includes('Krupp-Werke') &&
            k0.o === 'GER' && k0.name.includes('Kriegsmarine') &&
            s0.o === 'GER' && s0.name.includes('Saarbrücken') &&
            sl0.o === 'GER' && sl0.name.includes('Saarlautern') &&
            ro0.o === 'GER' && ro0.name.includes('Heinkel') &&
            wh0.o === 'GER' && wh0.name.includes('Wilhelmshaven') &&
            pe0.o === 'GER' && pe0.name.includes('Peenemünde') &&
            wien1.o === 'GER' && (wien1.adminEntity || '').includes('Reichsgau Wien') &&
            sudet2.o === 'GER' && (sudet2.adminEntity || '').includes('Reichsgau Sudetenland') &&
            memel3.o === 'GER' &&
            danzig5.o === 'GER'
          );
        },
      },
      {
        name: 'Integrità Territoriale Italia e Province Storiche (1936 vs 1940: Littoria, Apuania, Caserta/Napoli, Aosta, Bolzano, Roma Governatorato, Trieste, Pola, Zara, Rodi)',
        run: () => {
          // 1. Littoria (ITI44): fondata nel 1932, provincia 1934, rinominata Latina solo nel 1945
          const lit0 = resolveFeature({ properties: { NUTS_ID: 'ITI44', CNTR_CODE: 'IT', NAME_LATN: 'Latina' } }, 0);
          const lit6 = resolveFeature({ properties: { NUTS_ID: 'ITI44', CNTR_CODE: 'IT', NAME_LATN: 'Latina' } }, 6);

          // 2. Apuania (ITI11): Massa e Carrara per step < 2, Apuania da fine 1938 (step >= 2)
          const apu0 = resolveFeature({ properties: { NUTS_ID: 'ITI11', CNTR_CODE: 'IT', NAME_LATN: 'Massa-Carrara' } }, 0);
          const apu2 = resolveFeature({ properties: { NUTS_ID: 'ITI11', CNTR_CODE: 'IT', NAME_LATN: 'Massa-Carrara' } }, 2);
          const apu6 = resolveFeature({ properties: { NUTS_ID: 'ITI11', CNTR_CODE: 'IT', NAME_LATN: 'Massa-Carrara' } }, 6);

          // 3. Caserta (ITF31): soppressa nel 1927 e aggregata a Napoli fino al 1945
          const cas0 = resolveFeature({ properties: { NUTS_ID: 'ITF31', CNTR_CODE: 'IT', NAME_LATN: 'Caserta' } }, 0);

          // 4. Aosta (ITC20): Provincia di Aosta (istituita 1927, sigla AO)
          const aos0 = resolveFeature({ properties: { NUTS_ID: 'ITC20', CNTR_CODE: 'IT', NAME_LATN: 'Valle d’Aosta/Vallée d’Aoste' } }, 0);

          // 5. Bolzano (ITH10): Provincia di Bolzano (Alto Adige)
          const bol0 = resolveFeature({ properties: { NUTS_ID: 'ITH10', CNTR_CODE: 'IT', NAME_LATN: 'Bolzano-Bozen' } }, 0);

          // 6. Trento (ITH20): Provincia di Trento (Trentino)
          const tre0 = resolveFeature({ properties: { NUTS_ID: 'ITH20', CNTR_CODE: 'IT', NAME_LATN: 'Trento' } }, 0);

          // 7. Roma (ITI43): Governatorato di Roma (Capitale dell'Impero)
          const rom0 = resolveFeature({ properties: { NUTS_ID: 'ITI43', CNTR_CODE: 'IT', NAME_LATN: 'Roma' } }, 0);

          // 8. Forlì (ITH58): Provincia di Forlì
          const for0 = resolveFeature({ properties: { NUTS_ID: 'ITH58', CNTR_CODE: 'IT', NAME_LATN: 'Forlì-Cesena' } }, 0);

          // 9. Reggio Emilia (ITH53) & Reggio Calabria (ITF65)
          const rem0 = resolveFeature({ properties: { NUTS_ID: 'ITH53', CNTR_CODE: 'IT', NAME_LATN: 'Reggio nell’Emilia' } }, 0);
          const rcb0 = resolveFeature({ properties: { NUTS_ID: 'ITF65', CNTR_CODE: 'IT', NAME_LATN: 'Reggio di Calabria' } }, 0);

          // 10. Province moderne aggregate alle province madri dell'epoca
          const pord0 = resolveFeature({ properties: { NUTS_ID: 'ITH41', CNTR_CODE: 'IT', NAME_LATN: 'Pordenone' } }, 0);
          const bie0 = resolveFeature({ properties: { NUTS_ID: 'ITC13', CNTR_CODE: 'IT', NAME_LATN: 'Biella' } }, 0);
          const vco0 = resolveFeature({ properties: { NUTS_ID: 'ITC14', CNTR_CODE: 'IT', NAME_LATN: 'Verbano-Cusio-Ossola' } }, 0);
          const lec0 = resolveFeature({ properties: { NUTS_ID: 'ITC43', CNTR_CODE: 'IT', NAME_LATN: 'Lecco' } }, 0);
          const lod0 = resolveFeature({ properties: { NUTS_ID: 'ITC49', CNTR_CODE: 'IT', NAME_LATN: 'Lodi' } }, 0);
          const monz0 = resolveFeature({ properties: { NUTS_ID: 'ITC4D', CNTR_CODE: 'IT', NAME_LATN: 'Monza e della Brianza' } }, 0);
          const rim0 = resolveFeature({ properties: { NUTS_ID: 'ITH59', CNTR_CODE: 'IT', NAME_LATN: 'Rimini' } }, 0);
          const pra0 = resolveFeature({ properties: { NUTS_ID: 'ITI15', CNTR_CODE: 'IT', NAME_LATN: 'Prato' } }, 0);
          const fer0 = resolveFeature({ properties: { NUTS_ID: 'ITI35', CNTR_CODE: 'IT', NAME_LATN: 'Fermo' } }, 0);
          const ise0 = resolveFeature({ properties: { NUTS_ID: 'ITF21', CNTR_CODE: 'IT', NAME_LATN: 'Isernia' } }, 0);
          const bat0 = resolveFeature({ properties: { NUTS_ID: 'ITF48', CNTR_CODE: 'IT', NAME_LATN: 'Barletta-Andria-Trani' } }, 0);
          const cro0 = resolveFeature({ properties: { NUTS_ID: 'ITF62', CNTR_CODE: 'IT', NAME_LATN: 'Crotone' } }, 0);
          const vib0 = resolveFeature({ properties: { NUTS_ID: 'ITF64', CNTR_CODE: 'IT', NAME_LATN: 'Vibo Valentia' } }, 0);
          const ori0 = resolveFeature({ properties: { NUTS_ID: 'ITG2G', CNTR_CODE: 'IT', NAME_LATN: 'Oristano' } }, 0);
          const sud0 = resolveFeature({ properties: { NUTS_ID: 'ITG2H', CNTR_CODE: 'IT', NAME_LATN: 'Sud Sardegna' } }, 0);

          // 11. Confine Orientale & Isole dell'Egeo
          const tri0 = resolveFeature({ properties: { NUTS_ID: 'ITH44', CNTR_CODE: 'IT', NAME_LATN: 'Trieste' } }, 0);
          const pol0 = resolveFeature({ properties: { NUTS_ID: 'HR036', CNTR_CODE: 'HR', NAME_LATN: 'Istarska' } }, 0);
          const rod0 = resolveFeature({ properties: { NUTS_ID: 'EL421', CNTR_CODE: 'EL', NAME_LATN: 'Rodos' } }, 0);

          return (
            lit0.o === 'ITA' && lit0.name === 'Provincia di Littoria' && (lit0.adminEntity || '').includes("Regno d'Italia") &&
            lit6.name === 'Provincia di Littoria' &&
            apu0.o === 'ITA' && apu0.name === 'Provincia di Massa e Carrara' &&
            apu2.o === 'ITA' && apu2.name === 'Provincia di Apuania' &&
            apu6.o === 'ITA' && apu6.name === 'Provincia di Apuania' &&
            cas0.o === 'ITA' && cas0.name === 'Caserta (Provincia di Napoli)' &&
            aos0.o === 'ITA' && aos0.name === 'Provincia di Aosta' &&
            bol0.o === 'ITA' && bol0.name === 'Provincia di Bolzano (Alto Adige)' &&
            tre0.o === 'ITA' && tre0.name === 'Provincia di Trento (Trentino)' &&
            rom0.o === 'ITA' && rom0.name === 'Governatorato di Roma' && (rom0.adminEntity || '').includes("Capitale dell'Impero") &&
            for0.o === 'ITA' && for0.name === 'Provincia di Forlì' &&
            rem0.o === 'ITA' && rem0.name === 'Provincia di Reggio Emilia' &&
            rcb0.o === 'ITA' && rcb0.name === 'Provincia di Reggio Calabria' &&
            pord0.name.includes('Provincia del Friuli / Udine') &&
            bie0.name.includes('Provincia di Vercelli') &&
            vco0.name.includes('Provincia di Novara') &&
            lec0.name.includes('Provincia di Como') &&
            lod0.name.includes('Provincia di Milano') &&
            monz0.name.includes('Provincia di Milano') &&
            rim0.name.includes('Provincia di Forlì') &&
            pra0.name.includes('Provincia di Firenze') &&
            fer0.name.includes('Provincia di Ascoli Piceno') &&
            ise0.name.includes('Provincia di Campobasso') &&
            bat0.name.includes('Provincia di Bari') &&
            cro0.name.includes('Provincia di Catanzaro') &&
            vib0.name.includes('Provincia di Catanzaro') &&
            ori0.name.includes('Provincia di Cagliari') &&
            sud0.name.includes('Provincia di Cagliari') &&
            tri0.o === 'ITA' && tri0.name.includes('Provincia di Trieste') &&
            pol0.o === 'ITA' && pol0.name.includes('Provincia di Pola') &&
            rod0.o === 'ITA' && rod0.name.includes('Rodi')
          );
        },
      },
      {
        name: 'Integrità Territoriale Polonia e Province Storiche (1936 vs 1940: Druga Rzeczpospolita, Danzica, Slesia Breslau/Oppeln, Wartheland Posen/Łódź, Generalgouvernement Warszawa/Kraków/Radom/Lublin, Białystok URSS)',
        run: () => {
          // 1. Territori tedeschi pre-1939 (sempre GER per ogni step): Breslau, Oppeln, Beuthen, Gleiwitz, Stettin, Allenstein
          const bres0 = resolveFeature({ properties: { NUTS_ID: 'PL514', CNTR_CODE: 'PL', NUTS_NAME: 'Miasto Wrocław' } }, 0);
          const opp0 = resolveFeature({ properties: { NUTS_ID: 'PL524', CNTR_CODE: 'PL', NUTS_NAME: 'Opolski' } }, 0);
          const beu0 = resolveFeature({ properties: { NUTS_ID: 'PL228', CNTR_CODE: 'PL', NUTS_NAME: 'Bytomski' } }, 0);
          const gle0 = resolveFeature({ properties: { NUTS_ID: 'PL229', CNTR_CODE: 'PL', NUTS_NAME: 'Gliwicki' } }, 0);
          const ste0 = resolveFeature({ properties: { NUTS_ID: 'PL424', CNTR_CODE: 'PL', NUTS_NAME: 'Miasto Szczecin' } }, 0);
          const all0 = resolveFeature({ properties: { NUTS_ID: 'PL622', CNTR_CODE: 'PL', NUTS_NAME: 'Olsztyński' } }, 0);

          // 2. Danzica (PL633): DANZIG a step 0-4 -> GER a step 5+
          const dan0 = resolveFeature({ properties: { NUTS_ID: 'PL633', CNTR_CODE: 'PL', NUTS_NAME: 'Trójmiejski' } }, 0);
          const dan5 = resolveFeature({ properties: { NUTS_ID: 'PL633', CNTR_CODE: 'PL', NUTS_NAME: 'Trójmiejski' } }, 5);

          // 3. Seconda Repubblica Polacca pre-settembre 1939 (POL a step 0):
          // Warszawa (PL911), Kraków (PL213), Poznań (PL415), Łódź (PL711), Gdynia (PL634), Katowice (PL22A), Radom (PL921), Lublin (PL814), Białystok (PL841)
          const war0 = resolveFeature({ properties: { NUTS_ID: 'PL911', CNTR_CODE: 'PL', NUTS_NAME: 'Miasto Warszawa' } }, 0);
          const kra0 = resolveFeature({ properties: { NUTS_ID: 'PL213', CNTR_CODE: 'PL', NUTS_NAME: 'Miasto Kraków' } }, 0);
          const poz0 = resolveFeature({ properties: { NUTS_ID: 'PL415', CNTR_CODE: 'PL', NUTS_NAME: 'Miasto Poznań' } }, 0);
          const lod0 = resolveFeature({ properties: { NUTS_ID: 'PL711', CNTR_CODE: 'PL', NUTS_NAME: 'Miasto Łódź' } }, 0);
          const gdy0 = resolveFeature({ properties: { NUTS_ID: 'PL634', CNTR_CODE: 'PL', NUTS_NAME: 'Gdański' } }, 0);
          const kat0 = resolveFeature({ properties: { NUTS_ID: 'PL22A', CNTR_CODE: 'PL', NUTS_NAME: 'Katowicki' } }, 0);
          const rad0 = resolveFeature({ properties: { NUTS_ID: 'PL921', CNTR_CODE: 'PL', NUTS_NAME: 'Radomski' } }, 0);
          const lub0 = resolveFeature({ properties: { NUTS_ID: 'PL814', CNTR_CODE: 'PL', NUTS_NAME: 'Lubelski' } }, 0);
          const bia0 = resolveFeature({ properties: { NUTS_ID: 'PL841', CNTR_CODE: 'PL', NUTS_NAME: 'Białostocki' } }, 0);

          // 4. Settembre 1939+ (Step 5):
          // Annessioni dirette al Reich:
          // Danzig-Westpreußen: Gdynia (Gotenhafen PL634), Toruń/Bydgoszcz (PL613)
          // Wartheland: Poznań (Posen PL415), Łódź (Litzmannstadt PL711)
          // Zichenau: Ciechanów (PL922), Suwałki (Sudauen PL843)
          // Kattowitz: Katowice (Kattowitz PL22A), Oświęcim (Auschwitz PL21A)
          const gdy5 = resolveFeature({ properties: { NUTS_ID: 'PL634', CNTR_CODE: 'PL', NUTS_NAME: 'Gdański' } }, 5);
          const byd5 = resolveFeature({ properties: { NUTS_ID: 'PL613', CNTR_CODE: 'PL', NUTS_NAME: 'Bydgosko-toruński' } }, 5);
          const poz5 = resolveFeature({ properties: { NUTS_ID: 'PL415', CNTR_CODE: 'PL', NUTS_NAME: 'Miasto Poznań' } }, 5);
          const lod5 = resolveFeature({ properties: { NUTS_ID: 'PL711', CNTR_CODE: 'PL', NUTS_NAME: 'Miasto Łódź' } }, 5);
          const cie5 = resolveFeature({ properties: { NUTS_ID: 'PL922', CNTR_CODE: 'PL', NUTS_NAME: 'Ciechanowski' } }, 5);
          const suw5 = resolveFeature({ properties: { NUTS_ID: 'PL843', CNTR_CODE: 'PL', NUTS_NAME: 'Suwalski' } }, 5);
          const kat5 = resolveFeature({ properties: { NUTS_ID: 'PL22A', CNTR_CODE: 'PL', NUTS_NAME: 'Katowicki' } }, 5);
          const osw5 = resolveFeature({ properties: { NUTS_ID: 'PL21A', CNTR_CODE: 'PL', NUTS_NAME: 'Oświęcimski' } }, 5);

          // Generalgouvernement:
          // Distrikt Warschau: Warszawa (PL911)
          // Distrikt Krakau: Kraków (PL213), Rzeszów (Reichshof PL823)
          // Distrikt Radom: Radom (PL921)
          // Distrikt Lublin: Lublin (PL814)
          const war5 = resolveFeature({ properties: { NUTS_ID: 'PL911', CNTR_CODE: 'PL', NUTS_NAME: 'Miasto Warszawa' } }, 5);
          const kra5 = resolveFeature({ properties: { NUTS_ID: 'PL213', CNTR_CODE: 'PL', NUTS_NAME: 'Miasto Kraków' } }, 5);
          const rze5 = resolveFeature({ properties: { NUTS_ID: 'PL823', CNTR_CODE: 'PL', NUTS_NAME: 'Rzeszowski' } }, 5);
          const rad5 = resolveFeature({ properties: { NUTS_ID: 'PL921', CNTR_CODE: 'PL', NUTS_NAME: 'Radomski' } }, 5);
          const lub5 = resolveFeature({ properties: { NUTS_ID: 'PL814', CNTR_CODE: 'PL', NUTS_NAME: 'Lubelski' } }, 5);

          // Annessione all'URSS: Białystok (PL841) e Łomża (PL842)
          const bia5 = resolveFeature({ properties: { NUTS_ID: 'PL841', CNTR_CODE: 'PL', NUTS_NAME: 'Białostocki' } }, 5);
          const lom5 = resolveFeature({ properties: { NUTS_ID: 'PL842', CNTR_CODE: 'PL', NUTS_NAME: 'Łomżyński' } }, 5);

          return (
            // 1. Pre-war German
            bres0.o === 'GER' && bres0.name.includes('Breslau') &&
            opp0.o === 'GER' && opp0.name.includes('Oppeln') &&
            beu0.o === 'GER' && beu0.name.includes('Beuthen') &&
            gle0.o === 'GER' && gle0.name.includes('Gleiwitz') &&
            ste0.o === 'GER' && ste0.name.includes('Stettin') &&
            all0.o === 'GER' && all0.name.includes('Allenstein') &&
            // 2. Danzig
            dan0.o === 'DANZIG' && dan0.name.includes('Freie Stadt Danzig') &&
            dan5.o === 'GER' && dan5.name.includes('Danzig') &&
            // 3. Poland pre-war (step 0)
            war0.o === 'POL' && war0.name.includes('Warszawa') && (war0.adminEntity || '').includes('Warszawa') &&
            kra0.o === 'POL' && kra0.name.includes('Kraków') && (kra0.adminEntity || '').includes('Krakowskie') &&
            poz0.o === 'POL' && poz0.name.includes('Poznań') && (poz0.adminEntity || '').includes('Poznańskie') &&
            lod0.o === 'POL' && lod0.name.includes('Łódź') && (lod0.adminEntity || '').includes('Łódzkie') &&
            gdy0.o === 'POL' && gdy0.name.includes('Gdynia') && (gdy0.adminEntity || '').includes('Pomorskie') &&
            kat0.o === 'POL' && kat0.name.includes('Katowice') && (kat0.adminEntity || '').includes('Śląskie') &&
            rad0.o === 'POL' && rad0.name.includes('Radom') && (rad0.adminEntity || '').includes('Kieleckie') &&
            lub0.o === 'POL' && lub0.name.includes('Lublin') && (lub0.adminEntity || '').includes('Lubelskie') &&
            bia0.o === 'POL' && bia0.name.includes('Białystok') && (bia0.adminEntity || '').includes('Białostockie') &&
            // 4. Partition post-Sept 1939 (step 5)
            gdy5.o === 'GER' && gdy5.name.includes('Gotenhafen') && (gdy5.adminEntity || '').includes('Danzig-Westpreußen') &&
            byd5.o === 'GER' && byd5.name.includes('Bromberg') &&
            poz5.o === 'GER' && poz5.name.includes('Posen') && (poz5.adminEntity || '').includes('Wartheland') &&
            lod5.o === 'GER' && lod5.name.includes('Litzmannstadt') && (lod5.adminEntity || '').includes('Wartheland') &&
            cie5.o === 'GER' && cie5.name.includes('Zichenau') && (cie5.adminEntity || '').includes('Zichenau') &&
            suw5.o === 'GER' && suw5.name.includes('Sudauen') &&
            kat5.o === 'GER' && kat5.name.includes('Kattowitz') && (kat5.adminEntity || '').includes('Kattowitz') &&
            osw5.o === 'GER' && osw5.name.includes('Auschwitz') &&
            war5.o === 'GER' && war5.name.includes('Warschau') && (war5.adminEntity || '').includes('Distrikt Warschau') &&
            kra5.o === 'GER' && kra5.name.includes('Krakau') && (kra5.adminEntity || '').includes('Generalgouvernement') &&
            rze5.o === 'GER' && rze5.name.includes('Reichshof') &&
            rad5.o === 'GER' && rad5.name.includes('Radom') && (rad5.adminEntity || '').includes('Distrikt Radom') &&
            lub5.o === 'GER' && lub5.name.includes('Lublin') && (lub5.adminEntity || '').includes('Distrikt Lublin') &&
            bia5.o === 'SOV' && bia5.name.includes('Belostok') && (bia5.adminEntity || '').includes('Belorusskaya SSR') &&
            lom5.o === 'SOV' && lom5.name.includes('Lomzha')
          );
        },
      },
      {
        name: 'Integrità Territoriale e Toponimi Storici Giappone e Stati Cinesi (1936-1940: Naichi, Chōsen, Taiwan, Nan\'yō, Beiping, Nanjing, Wuhan, Peidu Chongqing, Changsha, Yan\'an, Manciukuò, Mengjiang, Xinjiang, Tibet)',
        run: () => {
          // --- GIAPPONE E COLONIE ---
          // 1. Territorio metropolitano (Naichi): Tokyo, Kansai, Hokkaido, Kyushu
          const tyo0 = resolveFeature({ properties: { NUTS_ID: 'JP_TOKYO', CNTR_CODE: 'JP', NAME: 'Tokyo' } }, 0);
          const kns0 = resolveFeature({ properties: { NUTS_ID: 'JP_KANSAI', CNTR_CODE: 'JP', NAME: 'Kansai' } }, 0);
          const hok0 = resolveFeature({ properties: { NUTS_ID: 'JP_HOKKAIDO', CNTR_CODE: 'JP', NAME: 'Hokkaido' } }, 0);
          const kyu0 = resolveFeature({ properties: { NUTS_ID: 'JP_KYUSHU', CNTR_CODE: 'JP', NAME: 'Kyushu' } }, 0);

          // 2. Territori esterni (Gaichi):
          // Chōsen / Corea -> Keijō / Chōsen Sōtokufu
          const kor0 = resolveFeature({ properties: { NUTS_ID: 'JP_CHOSEN', CNTR_CODE: 'KR', NAME: 'Korea' } }, 0);
          const korCnt = resolveFeature({ properties: { CNTR_CODE: 'KR', NAME: 'Korea' } }, 0);
          // Taiwan / Formosa -> Taihoku / Taiwan Sōtokufu
          const tai0 = resolveFeature({ properties: { NUTS_ID: 'JP_TAIWAN', CNTR_CODE: 'TW', NAME: 'Taiwan' } }, 0);
          // Nan'yō Guntō (Mandato del Pacifico meridionale) -> Nan'yō-chō
          const nyo0 = resolveFeature({ properties: { NUTS_ID: 'JP_NANYO', CNTR_CODE: 'MH', NAME: 'South Seas Mandate' } }, 0);
          const nyoHb = resolveHB({ properties: { NAME: 'South Seas Mandate' } }, 0);
          // Karafuto (Sakhalin meridionale) -> Toyohara
          const kar0 = resolveFeature({ properties: { NUTS_ID: 'JP_KARAFUTO', CNTR_CODE: 'JP', NAME: 'Karafuto' } }, 0);
          // Kantō-shū (Kwantung Leased Territory) -> Ryojun / Dairen
          const ksh0 = resolveFeature({ properties: { NUTS_ID: 'JP_KANTO_SHU', CNTR_CODE: 'JP', NAME: 'Kwantung Leased Territory' } }, 0);

          // --- STATI CINESI E REGIONI (1936 vs 1937-1939 vs 1940) ---
          // 3. Beiping (Pechino CHN_BEIJING):
          // Step 0: KMT / Ji-Cha (CHI)
          // Step 1: Caduta e Governo Provvisorio Linshi Zhengfu (WJ_CHI)
          // Step 6: Wang Jingwei (WJ_CHI)
          const bei0 = resolveFeature({ properties: { NUTS_ID: 'CHN_BEIJING', NAME: 'Beiping' } }, 0);
          const bei1 = resolveFeature({ properties: { NUTS_ID: 'CHN_BEIJING', NAME: 'Beiping' } }, 1);
          const bei6 = resolveFeature({ properties: { NUTS_ID: 'CHN_BEIJING', NAME: 'Beiping' } }, 6);

          // 4. Jiangsu / Nanchino (CHN_JIANGSU):
          // Step 0: Capitale Nazionale KMT (CHI)
          // Step 1: Caduta, Massacro di Nanchino, Governo Riformato Weixin Zhengfu (WJ_CHI)
          // Step 6: Capitale del Governo Nazionale Riorganizzato di Wang Jingwei (WJ_CHI)
          const nan0 = resolveFeature({ properties: { NUTS_ID: 'CHN_JIANGSU', NAME: 'Jiangsu' } }, 0);
          const nan1 = resolveFeature({ properties: { NUTS_ID: 'CHN_JIANGSU', NAME: 'Jiangsu' } }, 1);
          const nan6 = resolveFeature({ properties: { NUTS_ID: 'CHN_JIANGSU', NAME: 'Jiangsu' } }, 6);

          // 5. Shanghai (CHN_SHANGHAI):
          // Step 0: Municipalità KMT (CHI)
          // Step 1-5: Occupazione militare giapponese dopo la Battaglia di Shanghai (JAP)
          // Step 6: Wang Jingwei (WJ_CHI)
          const sha0 = resolveFeature({ properties: { NUTS_ID: 'CHN_SHANGHAI', NAME: 'Shanghai' } }, 0);
          const sha1 = resolveFeature({ properties: { NUTS_ID: 'CHN_SHANGHAI', NAME: 'Shanghai' } }, 1);
          const sha6 = resolveFeature({ properties: { NUTS_ID: 'CHN_SHANGHAI', NAME: 'Shanghai' } }, 6);

          // 6. Wuhan / Hubei (CHN_HUBEI):
          // Step 0-1: Capitale di Guerra Provvisoria KMT (CHI)
          // Step 2-5: Occupazione militare giapponese dopo la Battaglia di Wuhan (JAP)
          // Step 6: Wang Jingwei (WJ_CHI)
          const wuh0 = resolveFeature({ properties: { NUTS_ID: 'CHN_HUBEI', NAME: 'Hubei' } }, 0);
          const wuh1 = resolveFeature({ properties: { NUTS_ID: 'CHN_HUBEI', NAME: 'Hubei' } }, 1);
          const wuh2 = resolveFeature({ properties: { NUTS_ID: 'CHN_HUBEI', NAME: 'Hubei' } }, 2);
          const wuh6 = resolveFeature({ properties: { NUTS_ID: 'CHN_HUBEI', NAME: 'Hubei' } }, 6);

          // 7. Chongqing (CHN_CHONGQING):
          // Step 0-1: Municipalità speciale dell'Alto Yangtze (CHI)
          // Step 2-6: Capitale Provvisoria di Guerra (Péidū) di Chiang Kai-shek (CHI)
          const chq0 = resolveFeature({ properties: { NUTS_ID: 'CHN_CHONGQING', NAME: 'Chongqing' } }, 0);
          const chq2 = resolveFeature({ properties: { NUTS_ID: 'CHN_CHONGQING', NAME: 'Chongqing' } }, 2);
          const chq6 = resolveFeature({ properties: { NUTS_ID: 'CHN_CHONGQING', NAME: 'Chongqing' } }, 6);

          // 8. Hunan / Changsha (CHN_HUNAN):
          // 9ª Zona di Guerra di Xue Yue, difesa vittoriosa contro i giapponesi (sempre CHI)
          const cha0 = resolveFeature({ properties: { NUTS_ID: 'CHN_HUNAN', NAME: 'Hunan' } }, 0);
          const cha4 = resolveFeature({ properties: { NUTS_ID: 'CHN_HUNAN', NAME: 'Hunan' } }, 4);

          // 9. Shaanxi / Yan'an (CHN_SHAANXI):
          // Capitale rossa del PCC e Shaan-Gan-Ning Bianqu sotto Mao Zedong (sempre CCP_CHI / Comintern)
          const yan0 = resolveFeature({ properties: { NUTS_ID: 'CHN_SHAANXI', NAME: 'Shaanxi' } }, 0);
          const yan6 = resolveFeature({ properties: { NUTS_ID: 'CHN_SHAANXI', NAME: 'Shaanxi' } }, 6);

          // 10. Manciukuò (CHN_LIAONING, CHN_JILIN, CHN_MANCHUKUO_XINGAN_NORTH):
          // Impero del Grande Manciukuò sotto l'Imperatore Puyi / Kangde (sempre MAN / Fantoccio)
          const manLia = resolveFeature({ properties: { NUTS_ID: 'CHN_LIAONING', NAME: 'Liaoning' } }, 0);
          const manJil = resolveFeature({ properties: { NUTS_ID: 'CHN_JILIN', NAME: 'Jilin' } }, 0);
          const manXing = resolveFeature({ properties: { NUTS_ID: 'CHN_MANCHUKUO_XINGAN_NORTH', NAME: 'Xingan North' } }, 0);

          // 11. Mengjiang / Mongolia Interna (CHN_INNER_MONGOLIA):
          // Governo Autonomo Mongolo del Principe Demchugdongrub a Kalgan (sempre MEJ / Fantoccio)
          const mej0 = resolveFeature({ properties: { NUTS_ID: 'CHN_INNER_MONGOLIA', NAME: 'Inner Mongolia' } }, 0);
          const mej2 = resolveFeature({ properties: { NUTS_ID: 'CHN_INNER_MONGOLIA', NAME: 'Inner Mongolia' } }, 2);

          // 12. Xinjiang (CHN_XINJIANG): Sheng Shicai / Allineato all'URSS (sempre XIN / Comintern)
          const xin0 = resolveFeature({ properties: { NUTS_ID: 'CHN_XINJIANG', NAME: 'Xinjiang' } }, 0);

          // 13. Tibet (CHN_TIBET): Kashag a Lhasa sotto il 14° Dalai Lama (sempre TIB / Neutrale)
          const tib0 = resolveFeature({ properties: { NUTS_ID: 'CHN_TIBET', NAME: 'Tibet' } }, 0);

          // 14. Yunnan (CHN_YUNNAN) & Guangxi (CHN_GUANGXI): Burma Road e Passo di Kunlun
          const yun0 = resolveFeature({ properties: { NUTS_ID: 'CHN_YUNNAN', NAME: 'Yunnan' } }, 0);
          const gxi5 = resolveFeature({ properties: { NUTS_ID: 'CHN_GUANGXI', NAME: 'Guangxi' } }, 5);

          return (
            // Giappone metropolitano
            tyo0.o === 'JAP' && (tyo0.name.includes('Tōkyō') || tyo0.name.includes('Tokyo')) && (tyo0.adminEntity || '').includes('Dai Nippon Teikoku') &&
            kns0.o === 'JAP' && kns0.name.includes('Kansai') &&
            hok0.o === 'JAP' && (hok0.name.includes('Hokkaidō') || hok0.name.includes('Hokkaido')) &&
            kyu0.o === 'JAP' && (kyu0.name.includes('Kyūshū') || kyu0.name.includes('Kyushu')) &&
            // Colonie e possedimenti nipponici
            kor0.o === 'JAP' && kor0.name.includes('Chōsen') && (kor0.adminEntity || '').includes('Chōsen Sōtokufu') &&
            korCnt.o === 'JAP' && korCnt.name.includes('Chōsen') &&
            tai0.o === 'JAP' && tai0.name.includes('Taiwan') && (tai0.adminEntity || '').includes('Taiwan Sōtokufu') &&
            nyo0.o === 'JAP' && nyo0.name.includes('Nan\'yō') && (nyo0.adminEntity || '').includes('Nan\'yō-chō') &&
            nyoHb.o === 'JAP' && nyoHb.name.includes('Nan\'yō') &&
            kar0.o === 'JAP' && kar0.name.includes('Karafuto') &&
            ksh0.o === 'JAP' && ksh0.name.includes('Kantō-shū') &&
            // Cina: Beiping
            bei0.o === 'CHI' && bei0.name.includes('Beiping') && (bei0.adminEntity || '').includes('Jì-Chá') &&
            bei1.o === 'WJ_CHI' && bei1.name.includes('Lugouqiao') && (bei1.adminEntity || '').includes('Línshí Zhèngfǔ') &&
            bei6.o === 'WJ_CHI' && (bei6.adminEntity || '').includes('Wang Jingwei') &&
            // Cina: Nanchino
            nan0.o === 'CHI' && nan0.name.includes('Nanjing') && (nan0.adminEntity || '').includes('Zhōnghuá Mínguó Guómín Zhèngfǔ (Nanjing)') &&
            nan1.o === 'WJ_CHI' && (nan1.adminEntity || '').includes('Wéixīn Zhèngfǔ') &&
            nan6.o === 'WJ_CHI' && (nan6.adminEntity || '').includes('Wang Jingwei') &&
            // Cina: Shanghai
            sha0.o === 'CHI' && sha0.name.includes('Shanghai') &&
            sha1.o === 'JAP' && sha1.name.includes('Shanhai Kaisen') &&
            sha6.o === 'WJ_CHI' && sha6.name.includes('Shanghai') &&
            // Cina: Wuhan
            wuh0.o === 'CHI' && wuh0.name.includes('Wuhan') &&
            wuh1.o === 'CHI' && (wuh1.adminEntity || '').includes('Wuhan') &&
            wuh2.o === 'JAP' && wuh2.name.includes('Bukan') &&
            wuh6.o === 'WJ_CHI' &&
            // Cina: Chongqing
            chq0.o === 'CHI' && chq0.name.includes('Chongqing') &&
            chq2.o === 'CHI' && chq2.name.includes('Péidū') && (chq2.adminEntity || '').includes('Chiang Kai-shek') &&
            chq6.o === 'CHI' && chq6.name.includes('Péidū') &&
            // Cina: Changsha, Yan'an, Manchukuo, Mengjiang, Xinjiang, Tibet, Yunnan, Guangxi
            cha0.o === 'CHI' && cha0.name.includes('Changsha') &&
            cha4.o === 'CHI' && (cha4.adminEntity || '').includes('Xue Yue') &&
            yan0.o === 'CCP_CHI' && yan0.name.includes('Yan\'an') && (yan0.adminEntity || '').includes('Mao Zedong') &&
            yan6.o === 'CCP_CHI' &&
            manLia.o === 'MAN' && manLia.name.includes('Mukden') &&
            manJil.o === 'MAN' && manJil.name.includes('Xinjing') && (manJil.adminEntity || '').includes('Puyi') &&
            manXing.o === 'MAN' && manXing.name.includes('Nomonhan') &&
            mej0.o === 'MEJ' && mej0.name.includes('Mongol') &&
            mej2.o === 'MEJ' && mej2.name.includes('Mengjiang') && (mej2.adminEntity || '').includes('De Wang') &&
            xin0.o === 'XIN' && (xin0.adminEntity || '').includes('Sheng Shicai') &&
            tib0.o === 'TIB' && (tib0.adminEntity || '').includes('Dalai Lama') &&
            yun0.o === 'CHI' && yun0.name.includes('Burma Road') &&
            gxi5.o === 'CHI' && gxi5.name.includes('Kunlunguan')
          );
        },
      },
      {
        name: 'Isole Åland: Zero overlap, provincia autonoma demilitarizzata della Finlandia (1921)',
        run: () => {
          const aland0 = resolveFeature({ properties: { NUTS_ID: 'FI200', NAME: 'Åland', CNTR_CODE: 'FI' } }, 0);
          const aland6 = resolveFeature({ properties: { NUTS_ID: 'FI200', NAME: 'Åland', CNTR_CODE: 'FI' } }, 6);
          return (
            aland0.o === 'FIN' &&
            aland0.fac === 'Neutrale' &&
            aland0.name.includes('Ahvenanmaa') &&
            aland0.name.includes('Åland') &&
            aland0.name.includes('Demilitarisoitu') &&
            (aland0.adminEntity || '').includes('Ahvenanmaan itsehallintoalue') &&
            (aland0.note || '').includes('1921') &&
            aland6.o === 'FIN' &&
            aland6.fac === 'Neutrale'
          );
        },
      },
      {
        name: 'Integrità Territoriale Microstati: San Marino (SMR Neutrale), Vaticano (VAT Neutrale), Gibilterra (GIB Alleati) e Andorra (AND Neutrale)',
        run: () => {
          const smr = resolveFeature(SAN_MARINO_FEATURE, 0);
          const vat0 = resolveFeature(VATICAN_CITY_FEATURE, 0);
          const vat5 = resolveFeature(VATICAN_CITY_FEATURE, 5);
          const gib = resolveFeature(GIBRALTAR_COLONY_FEATURE, 0);
          const and0 = resolveFeature(ANDORRA_FEATURE, 0);

          // Verifica anti-inglobamento: le province confinanti NON devono essere toccate
          const rimini = resolveFeature({ properties: { NUTS_ID: 'ITH59', CNTR_CODE: 'IT', NAME_LATN: 'Rimini' }, __cent: [12.43, 43.96] }, 0);
          const pesaro = resolveFeature({ properties: { NUTS_ID: 'ITI31', CNTR_CODE: 'IT', NAME_LATN: 'Pesaro e Urbino' }, __cent: [12.68, 43.70] }, 0);
          const roma = resolveFeature({ properties: { NUTS_ID: 'ITI43', CNTR_CODE: 'IT', NAME_LATN: 'Roma' }, __cent: [12.51, 41.85] }, 0);
          const cadiz = resolveFeature({ properties: { NUTS_ID: 'ES612', CNTR_CODE: 'ES', NAME_LATN: 'Cádiz' }, __cent: [-5.9, 36.5] }, 0);

          return (
            smr.o === 'SMR' &&
            smr.fac === 'Neutrale' &&
            smr.name.includes('San Marino') &&
            vat0.o === 'VAT' &&
            vat0.fac === 'Neutrale' &&
            (vat0.adminEntity || '').includes('Pio XI') &&
            vat5.o === 'VAT' &&
            (vat5.adminEntity || '').includes('Pio XII') &&
            gib.o === 'GIB' &&
            gib.fac === 'Alleati' &&
            gib.name.includes('Gibraltar') &&
            and0.o === 'AND' &&
            and0.fac === 'Neutrale' &&
            and0.name.includes('Andorra') &&
            rimini.o === 'ITA' &&
            pesaro.o === 'ITA' &&
            roma.o === 'ITA' &&
            (cadiz.o === 'SPR' || cadiz.o === 'SPA')
          );
        },
      },
      {
        name: 'Integrità Geostorica Benelux (85 Distretti NUTS-3): Neutralità 1936-39, Campagna 1940, Militärverwaltung Belgien, Reichskommissariat Niederlande, CdZ Luxemburg, Annessione Eupen-Malmedy (BE336)',
        run: () => {
          // Pre-1940 (Step 0): Neutralità armata/disarmata di Belgio, Paesi Bassi e Lussemburgo
          const brux0 = resolveFeature({ properties: { CNTR_CODE: 'BE', NUTS_ID: 'BE100', NAME_LATN: 'Arrondissement de Bruxelles-Capitale' } }, 0);
          const eupen0 = resolveFeature({ properties: { CNTR_CODE: 'BE', NUTS_ID: 'BE336', NAME_LATN: 'Bezirk Verviers' } }, 0);
          const liege0 = resolveFeature({ properties: { CNTR_CODE: 'BE', NUTS_ID: 'BE332', NAME_LATN: 'Arrondissement de Liège' } }, 0);
          const amst0 = resolveFeature({ properties: { CNTR_CODE: 'NL', NUTS_ID: 'NL329', NAME_LATN: 'Groot-Amsterdam' } }, 0);
          const rott0 = resolveFeature({ properties: { CNTR_CODE: 'NL', NUTS_ID: 'NL33C', NAME_LATN: 'Groot-Rijnmond' } }, 0);
          const dheld0 = resolveFeature({ properties: { CNTR_CODE: 'NL', NUTS_ID: 'NL321', NAME_LATN: 'Kop van Noord-Holland' } }, 0);
          const lux0 = resolveFeature({ properties: { CNTR_CODE: 'LU', NUTS_ID: 'LU000', NAME_LATN: 'Luxembourg' } }, 0);

          // Post-1940 (Step 6): Occupazione militare tedesca, Reichskommissariat e Annessione Diretta
          const brux6 = resolveFeature({ properties: { CNTR_CODE: 'BE', NUTS_ID: 'BE100', NAME_LATN: 'Arrondissement de Bruxelles-Capitale' } }, 6);
          const eupen6 = resolveFeature({ properties: { CNTR_CODE: 'BE', NUTS_ID: 'BE336', NAME_LATN: 'Bezirk Verviers' } }, 6);
          const liege6 = resolveFeature({ properties: { CNTR_CODE: 'BE', NUTS_ID: 'BE332', NAME_LATN: 'Arrondissement de Liège' } }, 6);
          const amst6 = resolveFeature({ properties: { CNTR_CODE: 'NL', NUTS_ID: 'NL329', NAME_LATN: 'Groot-Amsterdam' } }, 6);
          const rott6 = resolveFeature({ properties: { CNTR_CODE: 'NL', NUTS_ID: 'NL33C', NAME_LATN: 'Groot-Rijnmond' } }, 6);
          const dheld6 = resolveFeature({ properties: { CNTR_CODE: 'NL', NUTS_ID: 'NL321', NAME_LATN: 'Kop van Noord-Holland' } }, 6);
          const lux6 = resolveFeature({ properties: { CNTR_CODE: 'LU', NUTS_ID: 'LU000', NAME_LATN: 'Luxembourg' } }, 6);

          return (
            // Pre-invasione (Step 0)
            brux0.o === 'BEL' &&
            brux0.fac === 'Neutrale' &&
            brux0.name.includes('Bruxelles') &&
            (brux0.adminEntity || '').includes('Belgique') &&
            eupen0.o === 'BEL' &&
            eupen0.fac === 'Neutrale' &&
            liege0.o === 'BEL' &&
            liege0.fac === 'Neutrale' &&
            liege0.name.includes('Liège') &&
            amst0.o === 'HOL' &&
            amst0.fac === 'Neutrale' &&
            amst0.name.includes('Amsterdam') &&
            rott0.o === 'HOL' &&
            rott0.fac === 'Neutrale' &&
            rott0.name.includes('Rotterdam') &&
            dheld0.o === 'HOL' &&
            dheld0.name.includes('Den Helder') &&
            lux0.o === 'LUX' &&
            lux0.fac === 'Neutrale' &&
            lux0.name.includes('Luxembourg') &&
            // Post-invasione (Step 6)
            brux6.o === 'GER' &&
            brux6.fac === 'Asse' &&
            (brux6.adminEntity || '').includes('Militärverwaltung') &&
            brux6.name.includes('Brüssel') &&
            // Eupen-Malmedy (BE336): annessione diretta al Reich (Gau Köln-Aachen)
            eupen6.o === 'GER' &&
            eupen6.fac === 'Asse' &&
            (eupen6.adminEntity || '').includes('Köln-Aachen') &&
            eupen6.name.includes('Kreis Eupen-Malmedy') &&
            // Liegi: Militärverwaltung
            liege6.o === 'GER' &&
            liege6.fac === 'Asse' &&
            liege6.name.includes('Lüttich') &&
            // Paesi Bassi: Reichskommissariat Niederlande
            amst6.o === 'GER' &&
            amst6.fac === 'Asse' &&
            (amst6.adminEntity || '').includes('Reichskommissariat') &&
            rott6.o === 'GER' &&
            rott6.fac === 'Asse' &&
            dheld6.o === 'GER' &&
            dheld6.fac === 'Asse' &&
            // Lussemburgo: CdZ-Gebiet Moselland
            lux6.o === 'GER' &&
            lux6.fac === 'Asse' &&
            ((lux6.adminEntity || '').includes('Moselland') || (lux6.adminEntity || '').includes('CdZ-Gebiet')) &&
            lux6.name.includes('Luxemburg')
          );
        },
      },
      {
        name: 'Integrità Geostorica Svizzera, Austria e Liechtenstein (62 Distretti NUTS-3): Neutralità Armata Elvetica (Schweizer Réduit, San Gottardo, Sargans, Saint-Maurice, Berna, Zurigo, Ginevra, Ticino), Evoluzione Austria (Bundesstaat Österreich 1936-38 -> Ostmark / Alpen- und Donau-Reichsgaue dal marzo 1938: Wien, Niederdonau, Oberdonau, Steiermark Erzberg, Salzburg, Kärnten, Tirol-Vorarlberg), Liechtenstein (Vaduz Neutrale)',
        run: () => {
          // 1. Svizzera (Step 0 e Step 6: Confederazione Svizzera, Neutrale, Schweizer Réduit)
          const bern0 = resolveFeature({ properties: { CNTR_CODE: 'CH', NUTS_ID: 'CH021', NAME_LATN: 'Bern' } }, 0);
          const zur0 = resolveFeature({ properties: { CNTR_CODE: 'CH', NUTS_ID: 'CH040', NAME_LATN: 'Zürich' } }, 0);
          const gen0 = resolveFeature({ properties: { CNTR_CODE: 'CH', NUTS_ID: 'CH013', NAME_LATN: 'Genève' } }, 0);
          const tic0 = resolveFeature({ properties: { CNTR_CODE: 'CH', NUTS_ID: 'CH070', NAME_LATN: 'Ticino' } }, 0);
          const uri0 = resolveFeature({ properties: { CNTR_CODE: 'CH', NUTS_ID: 'CH062', NAME_LATN: 'Uri' } }, 0);
          const val0 = resolveFeature({ properties: { CNTR_CODE: 'CH', NUTS_ID: 'CH012', NAME_LATN: 'Valais' } }, 0);
          const bern6 = resolveFeature({ properties: { CNTR_CODE: 'CH', NUTS_ID: 'CH021', NAME_LATN: 'Bern' } }, 6);
          const tic6 = resolveFeature({ properties: { CNTR_CODE: 'CH', NUTS_ID: 'CH070', NAME_LATN: 'Ticino' } }, 6);

          // 2. Liechtenstein (Souveränes Fürstentum Liechtenstein - Step 0 e Step 6: Neutrale)
          const lie0 = resolveFeature({ properties: { CNTR_CODE: 'LI', NUTS_ID: 'LI000', NAME_LATN: 'Liechtenstein' } }, 0);
          const lie6 = resolveFeature({ properties: { CNTR_CODE: 'LI', NUTS_ID: 'LI000', NAME_LATN: 'Liechtenstein' } }, 6);
          const lieFeat0 = resolveFeature(LIECHTENSTEIN_FEATURE, 0);
          const lieFlag = getCountryFlagSvg('LIE');
          const lieOwner = getOwnerMeta('LIE');

          // 3. Austria pre-Anschluss (Step 0: Bundesstaat Österreich, Neutrale, 9 Bundesländer)
          const wien0 = resolveFeature({ properties: { CNTR_CODE: 'AT', NUTS_ID: 'AT130', NAME_LATN: 'Wien' } }, 0);
          const linz0 = resolveFeature({ properties: { CNTR_CODE: 'AT', NUTS_ID: 'AT312', NAME_LATN: 'Linz-Wels' } }, 0);
          const graz0 = resolveFeature({ properties: { CNTR_CODE: 'AT', NUTS_ID: 'AT221', NAME_LATN: 'Graz' } }, 0);
          const inns0 = resolveFeature({ properties: { CNTR_CODE: 'AT', NUTS_ID: 'AT332', NAME_LATN: 'Innsbruck' } }, 0);
          const salz0 = resolveFeature({ properties: { CNTR_CODE: 'AT', NUTS_ID: 'AT323', NAME_LATN: 'Salzburg und Umgebung' } }, 0);
          const klag0 = resolveFeature({ properties: { CNTR_CODE: 'AT', NUTS_ID: 'AT211', NAME_LATN: 'Klagenfurt-Villach' } }, 0);
          const eisen0 = resolveFeature({ properties: { CNTR_CODE: 'AT', NUTS_ID: 'AT112', NAME_LATN: 'Nordburgenland' } }, 0);

          // 4. Austria post-Anschluss (Step 1..6: Ostmark / Alpen- und Donau-Reichsgaue, GER, Asse)
          const wien1 = resolveFeature({ properties: { NUTS_ID: 'AT130', CNTR_CODE: 'AT', NAME_LATN: 'Wien' } }, 1);
          const linz1 = resolveFeature({ properties: { NUTS_ID: 'AT312', CNTR_CODE: 'AT', NAME_LATN: 'Linz-Wels' } }, 1);
          const erz1 = resolveFeature({ properties: { NUTS_ID: 'AT223', CNTR_CODE: 'AT', NAME_LATN: 'Östliche Obersteiermark' } }, 1);
          const eisen1 = resolveFeature({ properties: { NUTS_ID: 'AT112', CNTR_CODE: 'AT', NAME_LATN: 'Nordburgenland' } }, 1);
          const inns1 = resolveFeature({ properties: { NUTS_ID: 'AT332', CNTR_CODE: 'AT', NAME_LATN: 'Innsbruck' } }, 1);
          const klag1 = resolveFeature({ properties: { NUTS_ID: 'AT211', CNTR_CODE: 'AT', NAME_LATN: 'Klagenfurt-Villach' } }, 1);
          const salz1 = resolveFeature({ properties: { NUTS_ID: 'AT323', CNTR_CODE: 'AT', NAME_LATN: 'Salzburg und Umgebung' } }, 1);

          return (
            // Svizzera
            bern0.o === 'SWI' &&
            bern0.fac === 'Neutrale' &&
            bern0.name.includes('Bern') &&
            ((bern0.adminEntity || '').includes('Schweizerische Eidgenossenschaft') || (bern0.adminEntity || '').includes('Confédération suisse')) &&
            zur0.o === 'SWI' &&
            zur0.fac === 'Neutrale' &&
            zur0.name.includes('Zürich') &&
            gen0.o === 'SWI' &&
            gen0.fac === 'Neutrale' &&
            gen0.name.includes('Genève') &&
            tic0.o === 'SWI' &&
            tic0.fac === 'Neutrale' &&
            tic0.name.includes('Ticino') &&
            uri0.o === 'SWI' &&
            uri0.fac === 'Neutrale' &&
            uri0.name.includes('Uri') &&
            val0.o === 'SWI' &&
            val0.fac === 'Neutrale' &&
            val0.name.includes('Valais') &&
            bern6.o === 'SWI' &&
            bern6.fac === 'Neutrale' &&
            tic6.o === 'SWI' &&
            tic6.fac === 'Neutrale' &&
            // Liechtenstein (Souveränes Fürstentum Liechtenstein)
            lie0.o === 'LIE' &&
            lie0.fac === 'Neutrale' &&
            lie0.name.includes('Liechtenstein') &&
            (lie0.adminEntity || '').includes('Liechtenstein') &&
            lie6.o === 'LIE' &&
            lie6.fac === 'Neutrale' &&
            lieFeat0.o === 'LIE' &&
            lieFeat0.name.includes('Liechtenstein') &&
            lieFlag.includes('data:image/png;base64') &&
            lieOwner.shortName === 'Liechtenstein' &&
            lieOwner.capital === 'Vaduz' &&
            // Austria Step 0
            wien0.o === 'AUS' &&
            wien0.fac === 'Neutrale' &&
            wien0.name.includes('Wien') &&
            (wien0.adminEntity || '').includes('Bundesstaat Österreich') &&
            linz0.o === 'AUS' &&
            linz0.fac === 'Neutrale' &&
            linz0.name.includes('Linz') &&
            graz0.o === 'AUS' &&
            graz0.fac === 'Neutrale' &&
            graz0.name.includes('Steiermark') &&
            inns0.o === 'AUS' &&
            inns0.fac === 'Neutrale' &&
            inns0.name.includes('Innsbruck') &&
            salz0.o === 'AUS' &&
            salz0.fac === 'Neutrale' &&
            salz0.name.includes('Salzburg') &&
            klag0.o === 'AUS' &&
            klag0.fac === 'Neutrale' &&
            klag0.name.includes('Kärnten') &&
            eisen0.o === 'AUS' &&
            eisen0.fac === 'Neutrale' &&
            eisen0.name.includes('Nordburgenland') &&
            // Austria Step 1 (post-Anschluss)
            wien1.o === 'GER' &&
            wien1.fac === 'Asse' &&
            (wien1.adminEntity || '').includes('Reichsgau Wien') &&
            wien1.name.includes('Groß-Wien') &&
            linz1.o === 'GER' &&
            linz1.fac === 'Asse' &&
            (linz1.adminEntity || '').includes('Oberdonau') &&
            linz1.name.includes('Oberdonau') &&
            erz1.o === 'GER' &&
            erz1.fac === 'Asse' &&
            (erz1.adminEntity || '').includes('Steiermark') &&
            erz1.name.includes('Erzberg') &&
            eisen1.o === 'GER' &&
            eisen1.fac === 'Asse' &&
            (eisen1.adminEntity || '').includes('Niederdonau') &&
            inns1.o === 'GER' &&
            inns1.fac === 'Asse' &&
            (inns1.adminEntity || '').includes('Tirol-Vorarlberg') &&
            klag1.o === 'GER' &&
            klag1.fac === 'Asse' &&
            (klag1.adminEntity || '').includes('Kärnten') &&
            salz1.o === 'GER' &&
            salz1.fac === 'Asse' &&
            (salz1.adminEntity || '').includes('Salzburg')
          );
        },
      },
      {
        name: 'Taiwan Sōtokufu (CHN_TAIWAN: JAP/Asse, Sovranità Coloniale Gaichi e Zero-Overlap con Naichi)',
        run: () => {
          const tw0 = resolveFeature({ properties: { id: 'CHN_TAIWAN', NUTS_ID: 'CHN_TAIWAN', CNTR_CODE: 'CN_PROV' } }, 0);
          const tw2 = resolveFeature({ properties: { id: 'CHN_TAIWAN', NUTS_ID: 'CHN_TAIWAN', CNTR_CODE: 'CN_PROV' } }, 2);
          const tw6 = resolveFeature({ properties: { id: 'CHN_TAIWAN', NUTS_ID: 'CHN_TAIWAN', CNTR_CODE: 'CN_PROV' } }, 6);
          return (
            tw0.o === 'JAP' &&
            tw0.fac === 'Asse' &&
            tw0.name.includes('Taiwan') &&
            (tw0.adminEntity || '').includes('Taiwan Sōtokufu') &&
            tw2.o === 'JAP' &&
            tw6.o === 'JAP'
          );
        },
      },
      {
        name: 'Governi Collaborazionisti Cinesi (WJ_CHI: Bandiera dei Cinque Colori / Wǔzú gōnghé qí)',
        run: () => {
          const flag = getCountryFlagSvg('WJ_CHI');
          const ownerMeta = getOwnerMeta('WJ_CHI');
          return (
            flag.includes('image') &&
            flag.includes('1024') &&
            ownerMeta.f === 'Fantoccio' &&
            ownerMeta.shortName === 'Cina Collaborazionista'
          );
        },
      },
      {
        name: 'Terzo Reich (Deutsches Reich: Gaue, Centri Industriali Strategici e Linee Fortificate Ostwall / Heilsberg)',
        run: () => {
          const ber0 = resolveFeature({ properties: { id: 'DE300', NUTS_ID: 'DE300', CNTR_CODE: 'DE', NAME: 'Berlin' } }, 0);
          const ber6 = resolveFeature({ properties: { id: 'DE300', NUTS_ID: 'DE300', CNTR_CODE: 'DE', NAME: 'Berlin' } }, 6);
          const schw0 = resolveFeature({ properties: { id: 'DE264', NUTS_ID: 'DE264', CNTR_CODE: 'DE', NAME: 'Schweinfurt' } }, 0);
          const reg0 = resolveFeature({ properties: { id: 'DE221', NUTS_ID: 'DE221', CNTR_CODE: 'DE', NAME: 'Regensburg' } }, 0);
          return (
            ber0.o === 'GER' &&
            ber0.name.includes('Berlin') &&
            (ber0.adminEntity || '').includes('Deutsches Reich') &&
            ber6.o === 'GER' &&
            (ber6.adminEntity || '').includes('Großdeutsches Reich') &&
            schw0.name.includes('Schweinfurt') &&
            reg0.name.includes('Regensburg')
          );
        },
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

  // Data fetching helper
  const fetchWithFallback = async (urls: string[], onProg?: (got: number, tot: number) => void) => {
    let lastErr: any = null;
    for (const url of urls) {
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 90000);
        const res = await fetch(url, { signal: ctrl.signal });
        clearTimeout(timer);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const total = parseInt(res.headers.get('content-length') || '0', 10);
        const reader = res.body!.getReader();
        const chunks: Uint8Array[] = [];
        let got = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          got += value.length;
          if (onProg) onProg(got, total);
        }
        const buf = new Uint8Array(got);
        let off = 0;
        for (const c of chunks) {
          buf.set(c, off);
          off += c.length;
        }
        const data = JSON.parse(new TextDecoder().decode(buf));
        let feats;
        if (data.type === 'Topology') {
          const k = Object.keys(data.objects)[0];
          feats = (topojson.feature(data, data.objects[k]) as any).features;
        } else {
          feats = data.features;
        }
        return feats;
      } catch (err: any) {
        lastErr = err;
        addLog('Fallback sorgente geospaziale...', 'warn');
      }
    }
    throw lastErr;
  };

  const fetchPlain = async (url: string) => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 60000);
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(timer);
    return (await res.json()).features;
  };

  // Bootstrapping Engine
  const loadGeoData = useCallback(async () => {
    try {
      setLoadError(null);
      setLoadProgress(15);
      addLog('Inizializzazione sala operativa globale (Cartografia Storica 1936-1940)…', 'ok');

      // 1. Carica le province ad alta risoluzione NUTS-3 (stile Hearts of Iron: Darkest Hour)
      setLoadProgress(30);
      addLog('Caricamento province NUTS-3 ad alta definizione per l\'Europa...', 'info');

      let nuts: any[] = [];
      try {
        const localRes = await fetch('/data/nuts_10m.json');
        if (localRes.ok) {
          const topoNuts = await localRes.json();
          const nutsK = Object.keys(topoNuts.objects)[0];
          nuts = (topojson.feature(topoNuts, topoNuts.objects[nutsK]) as any).features;
          addLog(`Province europee NUTS-3 caricate (${nuts.length} distretti) ✓`, 'ok');
        } else {
          throw new Error('Local NUTS not found');
        }
      } catch (err) {
        addLog('Caricamento NUTS da rete GISCO...', 'info');
        nuts = await fetchWithFallback(NUTS_URLS);
      }

      setLoadProgress(55);

      // 2. Assemblaggio Prov Features (Granularità Provinciaria Darkest Hour)
      const provs: any[] = [];

      // A. Tutte le province NUTS-3 europee
      for (const f of nuts) {
        if (!f.geometry) continue;
        // Escludi province NUTS rimpiazzate da partizioni storiche di precisione o DOM extraeuropei:
        // - PL633 (Trójmiasto) & PL634 (Gdański): rimpiazzate da Danzica e Corridoio Polacco
        // - LT023 (Klaipėdos apskritis): rimpiazzata da Territorio di Memel e Litorale di Palanga
        // - FRY30 (Guyane): rimpiazzata da French Guiana di precisione con 0 overlap
        // - HR031 (Primorsko-goranska): rimpiazzata da Provincia del Carnaro (Fiume) e Litorale Croato (Sušak / Krk / Rab)
        // - HR033 (Zadarska): rimpiazzata da Enclave di Zara e Dalmazia Settentrionale (Benkovac / Nin / Pag / Dugi Otok)
        // - FRY10..FRY50 (Dipartimenti d'Oltremare): gestiti come colonie extraeuropee
        // - CZ* (Cechia) & SK* (Slovacchia): rimpiazzate dalla partizione storica chirurgica a 44 distretti (Freytag & Berndt 1938)
        // - LI000 (Liechtenstein): rimpiazzata dal profilo storico di precisione ad alta definizione (Fürstentum Liechtenstein)
        const nid = f.properties && (f.properties.NUTS_ID || f.properties.NUTS_CODE);
        if (nid === 'PL633' || nid === 'PL634' || nid === 'LT023' || nid === 'FRY30' || nid === 'HR031' || nid === 'HR033' || nid === 'LI000' || f.properties?.CNTR_CODE === 'LI' || nid?.startsWith('FRY') || nid?.startsWith('CZ') || nid?.startsWith('SK')) continue;

        // Escludi Pelagosa (Palagruža) da HR035 (Split) e Lagosta (Lastovo) da HR037 (Dubrovnik) in quanto appartenenti all'enclave italiana di Zara
        if (nid === 'HR035' && f.geometry.type === 'MultiPolygon') {
          f.geometry.coordinates = f.geometry.coordinates.filter((_: any, idx: number) => idx !== 7);
        }
        if (nid === 'HR037' && f.geometry.type === 'MultiPolygon') {
          f.geometry.coordinates = f.geometry.coordinates.filter((_: any, idx: number) => idx !== 3);
        }
        f.__layer = 'prov';
        provs.push(f);
      }

      // B. Enclavi Storiche e Geometrie di Precisione (Danzica, Memel, Zara, Carnaro, Panama, Kosovo, ecc.)
      for (const hf of PRECISION_HISTORICAL_FEATURES) {
        if (hf === CARPATHIAN_RUTHENIA_FEATURE || hf?.properties?.NAME === 'Carpathian Ruthenia') continue;
        provs.push({ ...hf, __layer: 'prov' });
      }

      // C. Powiati dei Kresy Wschodnie (132 distretti polacchi orientali)
      for (const kf of KRESY_POWIAT_FEATURES) {
        provs.push({ ...kf, __layer: 'prov' });
      }

      // D. Regioni e Suddivisioni URSS (293 Oblast, Krai, Repubbliche e frontiere)
      for (const uf of USSR_REGIONAL_FEATURES) {
        provs.push({ ...uf, __layer: 'prov' });
      }

      // E. Suddivisioni Regionali Cina (Cricche e province)
      for (const cf of CHINA_REGIONAL_FEATURES) {
        provs.push({ ...cf, __layer: 'prov' });
      }

      // F. Province Cecoslovacche Storiche (44 distretti di precisione millimetrica: Sudeti, Zaolzie, Rest-Tschechei, Slovacchia e Felvidék)
      for (const czf of CZECHOSLOVAKIA_REGIONAL_FEATURES) {
        provs.push({ ...czf, __layer: 'prov' });
      }

      setLoadProgress(70);
      addLog(`Rete provinciale dettagliata attiva: ${provs.length} province europee ed asiatiche ✓`, 'ok');

      // 3. Basemap Globale Storico (HB per il resto del mondo, escludendo i blocchi nazione europei già provincializzati)
      const rawHb = WORLD_1938_GEOJSON;
      const hbs: any[] = [];
      for (const f of rawHb.features) {
        if (!f.geometry) continue;
        const rawNm = (f.properties || {}).NAME;
        if (!rawNm) continue;
        const nm = String(rawNm).trim();
        if (!nm || nm === 'null' || nm === 'None') continue;
        if (nm.toLowerCase().includes('antarctica')) continue;

        const isExcludedAlandOrIsland =
          HB_EXCL.has(nm) ||
          nm.includes('land Islands (Finland)') ||
          nm.includes('Ã…land') ||
          nm.includes('Åland') ||
          nm.includes('Saaremaa and Hiiumaa') ||
          nm.includes('British Isles Islands') ||
          nm.includes('RÃ¼gen') ||
          nm.includes('Rügen');

        if (isExcludedAlandOrIsland) {
          // Territori d'oltremare degli imperi coloniali europei (Francia, UK, Italia, Olanda, Belgio, Portogallo, Spagna)
          if (METRO_FRAG[nm]) {
            const polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates];
            const out: any[] = [];
            for (const poly of polys) {
              let minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
              for (const ring of poly) {
                for (const pt of ring) {
                  if (pt[0] < minx) minx = pt[0];
                  if (pt[0] > maxx) maxx = pt[0];
                  if (pt[1] < miny) miny = pt[1];
                  if (pt[1] > maxy) maxy = pt[1];
                }
              }
              // Taglia fuori solo la madrepatria europea (Lon: -32..45, Lat: 27..72)
              if (!(minx >= -32 && maxx <= 45 && miny >= 27 && maxy <= 72)) {
                out.push(poly);
              }
            }
            if (out.length) {
              hbs.push({
                type: 'Feature',
                properties: f.properties,
                geometry: {
                  type: out.length > 1 ? 'MultiPolygon' : 'Polygon',
                  coordinates: out.length > 1 ? out : out[0],
                },
                __layer: 'hb',
                __resolve: METRO_FRAG[nm],
              });
            }
          }
        } else if (nm === 'Empire of Japan' && f.geometry && f.geometry.type === 'MultiPolygon') {
          // Geostoricamente, Taiwan / Formosa (Governo Generale di Taiwan — Gaichi) è modellata
          // in modo autonomo e ad alta definizione tramite CHN_TAIWAN in CHINA_REGIONAL_FEATURES.
          // Rimuoviamo il poligono di Formosa dal blocco metropolitano Naichi per eliminare l'overlapping.
          const cleanCoords = f.geometry.coordinates.filter((poly: any) => {
            const ring = poly[0];
            let minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
            for (const pt of ring) {
              if (pt[0] < minx) minx = pt[0];
              if (pt[0] > maxx) maxx = pt[0];
              if (pt[1] < miny) miny = pt[1];
              if (pt[1] > maxy) maxy = pt[1];
            }
            const isTaiwanIsland = minx >= 119.5 && maxx <= 122.5 && miny >= 21.8 && maxy <= 25.5;
            return !isTaiwanIsland;
          });
          hbs.push({
            ...f,
            geometry: {
              ...f.geometry,
              coordinates: cleanCoords,
            },
            __layer: 'hb',
          });
        } else {
          hbs.push({ ...f, __layer: 'hb' });
        }
      }

      // Aggiungi enclavi storiche speciali
      hbs.push({ ...SPANISH_RIF_FEATURE, __layer: 'hb' });
      hbs.push({ ...TANGIER_FEATURE, __layer: 'hb' });

      setLoadProgress(85);

      // Esecuzione pipeline di risoluzione storica su tutti i 7 passaggi temporali
      addLog('Esecuzione motore cartografico e risoluzione storica...', 'info');
      const pipeline = processHistoricalCartographyPipeline(provs, hbs, [], true);

      setProvFeatures(pipeline.provFeatures);
      setHbFeatures(pipeline.hbFeatures);
      setCntrFeatures(pipeline.cntrFeatures);
      setHbMode(true);
      setAllFeatures(pipeline.allFeatures);
      setStats(pipeline.stats);

      setLoadProgress(100);
      addLog(
        `Scacchiere Globale pronto: ${pipeline.diagnostics.totalFeatures} province e territori sovrani operativi ✓`,
        'ok'
      );

      runSelfTests();

      setTimeout(() => {
        setLoading(false);
        setToastData({ date: STEPS[0].d, title: STEPS[0].t, key: Date.now() });
      }, 600);
    } catch (err: any) {
      addLog('ERRORE: ' + err.message, 'warn');
      setLoadError(err.message || 'Errore nel caricamento dei dati geospaziali');
    }
  }, [addLog, runSelfTests]);

  useEffect(() => {
    loadGeoData();
  }, [loadGeoData]);

  // Timeline Step change
  const handleSelectStep = useCallback((stepIndex: number, announce: boolean = true) => {
    setCurrentStep(stepIndex);
    if (announce) {
      setToastData({
        date: STEPS[stepIndex].d,
        title: STEPS[stepIndex].t,
        key: Date.now(),
      });
    }
  }, []);

  // Play / Pause Cycle
  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) {
        if (currentStep >= STEPS.length - 1) {
          handleSelectStep(0, true);
        }
      }
      return next;
    });
  }, [currentStep, handleSelectStep]);

  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= STEPS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          const next = prev + 1;
          setToastData({
            date: STEPS[next].d,
            title: STEPS[next].t,
            key: Date.now(),
          });
          return next;
        });
      }, 4000);
    } else {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    }

    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid hotkeys when in input fields
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleSelectStep(Math.min(STEPS.length - 1, currentStep + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleSelectStep(Math.max(0, currentStep - 1));
      } else if (e.key === 'Escape') {
        setSelectedFeature(null);
        setSearchOpen(false);
        setInfoOpen(false);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, handleSelectStep, togglePlay]);

  return (
    <div id="app" className="fixed inset-0 w-full h-full bg-[#07090c] text-[#cfd3d6] select-none overflow-hidden">
      {/* Radar Loading Screen */}
      <RadarLoader
        progress={loadProgress}
        logs={logs}
        error={loadError}
        onRetry={loadGeoData}
        isVisible={loading}
      />

      {!loading && (
        <>
          {/* Main Map */}
          <TacticalMap
            provFeatures={provFeatures}
            hbFeatures={hbFeatures}
            cntrFeatures={cntrFeatures}
            hbMode={hbMode}
            currentStep={currentStep}
            selectedFeature={selectedFeature}
            layers={layers}
            focusCoords={focusCoords}
            onSelectFeature={(f) => setSelectedFeature(f)}
            onClearSelection={() => setSelectedFeature(null)}
            onSelectBattle={handleSelectBattle}
          />

          {/* Map Layer Controls HUD */}
          <MapLayerControls
            layers={layers}
            onToggleLayer={handleToggleLayer}
            isMuted={isMuted}
            onToggleAudio={handleToggleAudio}
          />

          {/* Top Bar Header */}
          <TopBar
            currentStep={currentStep}
            isMuted={isMuted}
            onToggleAudio={handleToggleAudio}
            onOpenSearch={() => setSearchOpen(true)}
            onToggleInfo={() => setInfoOpen((prev) => !prev)}
          />

          {/* Operational Focus Dossier (Left Panel) */}
          <OperationalFocusPanel
            feature={selectedFeature}
            currentStep={currentStep}
            onClose={() => setSelectedFeature(null)}
            onZoomTo={() => {
              if (selectedFeature && selectedFeature.__cent) {
                setFocusCoords({
                  coords: selectedFeature.__cent,
                  zoom: 4.8,
                  key: Date.now(),
                });
              }
            }}
            onSelectStep={(s) => handleSelectStep(s, true)}
          />

          {/* Intelligence Statistics (Right Panel) */}
          <IntelligencePanel stats={stats} currentStep={currentStep} />

          {/* Toast Notification */}
          {toastData && (
            <ToastNotice
              date={toastData.date}
              title={toastData.title}
              triggerKey={toastData.key}
            />
          )}

          {/* Chronological Timeline Bar (Bottom) */}
          <TimelineController
            currentStep={currentStep}
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
            onSelectStep={(s) => handleSelectStep(s, true)}
          />

          {/* Search & Toponym Finder Modal */}
          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            allFeatures={allFeatures}
            currentStep={currentStep}
            onSelectFeature={(f) => {
              setSelectedFeature(f);
            }}
            onSelectBattle={handleSelectBattle}
            onSelectFortification={handleSelectFortification}
            onSelectNavalBase={handleSelectNavalBase}
          />

          {/* Methodological & Info Modal */}
          <InfoModal isOpen={infoOpen} onClose={() => setInfoOpen(false)} />

          {/* Background CRT Scanlines & Vignette */}
          <div
            id="vign"
            className="fixed inset-0 pointer-events-none z-[28]"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.6) 100%)',
            }}
          />
          <div
            id="scan"
            className="fixed inset-0 pointer-events-none z-[29] opacity-40 mix-blend-multiply"
            style={{
              background:
                'repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0 1px, transparent 1px 3px)',
            }}
          />

          {/* Footer Credits */}
          <div className="absolute left-3.5 bottom-1.5 z-20 text-[10px] text-[#5c6268] tracking-[0.5px] font-mono-tech hidden sm:block">
            DATI: EUROSTAT NUTS-3 + HISTORICAL-BASEMAPS · RICOSTRUZIONE TOPONOMASTICA DINAMICA 1936-1940
          </div>
        </>
      )}
    </div>
  );
}
