import React, { useState, useEffect, useRef, useCallback } from 'react';

import * as d3 from 'd3';

import { StatsStep } from './types';

import { STEPS } from './data/historySteps';

import {

  HB_NAME,

  resolveFeature,

  resolveHB,

} from './data/georesolver';

import { getOwnerMeta, getOverlord, isSubjectOf } from './data/owners';

import { getExtendedToponym } from './data/historicalToponyms';

import { getCountryFlagSvg, resolveHistoricalFlag, validateFlagAgainstAnachronism } from './data/historicalFlags';

import { loadUnifiedGeoDatabase } from './data/unifiedGeoDatabase';

import { RadarLoader } from './components/RadarLoader';

import { TopBar } from './components/TopBar';

import { OperationalFocusPanel } from './components/OperationalFocusPanel';

import { IntelligencePanel } from './components/IntelligencePanel';

import { TimelineController } from './components/TimelineController';

import { SearchModal } from './components/SearchModal';

import { InfoModal } from './components/InfoModal';



import { ToastNotice } from './components/ToastNotice';

import { TacticalMap } from './components/TacticalMap';

import { processHistoricalCartographyPipeline, resolveHistoricalTruth } from './data/historicalEngine';

import { MapLayerControls, LayerVisibilityState } from './components/MapLayerControls';

import { tacticalAudio } from './data/audioSynthesizer';

import { HistoricalBattle, HISTORICAL_BATTLES } from './data/historicalBattles';

import {

  HISTORICAL_FORTIFICATION_LINES,

  HISTORICAL_NAVAL_BASES,

  FortificationLine,

  NavalBase,

  getDynamicNavalBaseStatus,

} from './data/historicalFortifications';

import {

  HISTORICAL_SEA_LANES,

  getDynamicSeaLaneStatus,

} from './data/historicalSeaLanes';

import { getStrategicIslandLabel } from './components/TacticalMap';

import { resolveBalkansToponym, BALKAN_DISTRICTS_CATALOG } from './data/balkanDistricts';

import { FRANCE_PROVINCES_META, resolveFranceProvince } from './data/franceProvinces';

import { UK_PROVINCES_META, resolveUKProvince } from './data/ukProvinces';

import { IT_PROVINCES_META, resolveItalyProvince } from './data/italyProvinces';

import { SPAIN_PROVINCES_META, resolveSpainProvince } from './data/spainProvinces';

import { SOVIET_PROVINCES_META, resolveSovietProvince } from './data/sovietProvinces';



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

    islandBeacons: false,

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



  // Self-test diagnostic runner: esegue la suite di verifica sui dati caricati dal database unificato

  const runSelfTests = useCallback((loadedProvs: any[] = [], loadedHbs: any[] = []) => {

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

        run: () => {

          const a0 = resolveHB({ properties: { NAME: 'Algeria (France)', SUBJECTO: 'France' } }, 0);

          const a6 = resolveHB({ properties: { NAME: 'Algeria (France)', SUBJECTO: 'France' } }, 6);

          return (

            a0.o === 'F_NAF' &&

            a0.name.includes('Algérie') &&

            a6.o === 'VIC_NAF' &&

            a6.name.includes('Vichy') &&

            !a6.name.includes('France occupée')

          );

        },

      },

      {

        name: 'Toponomastica Coloniale Francese (Indocina & AEF)',

        run: () => {

          const ind0 = resolveHB({ properties: { NAME: 'French Indo-China' } }, 0);

          const ind6 = resolveHB({ properties: { NAME: 'French Indo-China' } }, 6);

          const aef6 = resolveHB({ properties: { NAME: 'French Equatorial Africa' } }, 6);

          return (

            ind0.name.includes('Indochine') &&

            ind6.name.includes('Vichy') &&

            aef6.o === 'FFL_AEF' &&

            aef6.name.includes('Française Libre')

          );

        },

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

          (resolveHB({ properties: { NAME: 'Tangier' } }, 0).o === 'TANGER' ||

            resolveHB({ properties: { NAME: 'Tangier' } }, 0).o === 'NEU') &&

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

        run: () => {

          const ruth = loadedProvs.find((f: any) => f.id === 'CZE_RUTHENIA_NORTH');

          if (!ruth || !ruth.__resolve) return false;

          return (

            ruth.__resolve(0).o === 'CZE' &&

            ruth.__resolve(1).o === 'CZE' &&

            ruth.__resolve(2).o === 'CZE' &&

            ruth.__resolve(3).o === 'HUN' &&

            ruth.__resolve(6).o === 'HUN'

          );

        },

      },

      {

        name: 'Partizione Storica Cecoslovacchia 1938-1939 (Sudeti, Zaolzie, Protettorato, Slovacchia, Felvidék, Chust)',

        run: () => {

          const findF = (id: string) => loadedProvs.find((f: any) => f.id === id);

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

            // Step 0: Tutti sotto Cecoslovacchia unita con entità amministrative autentiche

            eger.__resolve(0).o === 'CZE' &&

            eger.__resolve(0).adminEntity?.includes('Československá republika') &&

            zaolzie.__resolve(0).o === 'CZE' &&

            zaolzie.__resolve(0).adminEntity?.includes('Moravskoslezská') &&

            praha.__resolve(0).o === 'CZE' &&

            praha.__resolve(0).adminEntity?.includes('Česká') &&

            bratislava.__resolve(0).o === 'CZE' &&

            bratislava.__resolve(0).adminEntity?.includes('Krajina Slovenská') &&

            felKosice.__resolve(0).o === 'CZE' &&

            ruthNorth.__resolve(0).o === 'CZE' &&

            // Step 2 (Patto di Monaco & Primo Arbitrato di Vienna): Sudeti a GER, Zaolzie a POL, Felvidék a HUN, Praga e Bratislava a CZE

            eger.__resolve(2).o === 'GER' &&

            eger.__resolve(2).adminEntity?.includes('Reichsgau Sudetenland') &&

            trautenau.__resolve(2).o === 'GER' &&

            boehmerwald.__resolve(2).o === 'GER' &&

            zaolzie.__resolve(2).o === 'POL' &&

            zaolzie.__resolve(2).adminEntity?.includes('Województwo Śląskie') &&

            felKosice.__resolve(2).o === 'HUN' &&

            felKosice.__resolve(2).adminEntity?.includes('Felvidék') &&

            praha.__resolve(2).o === 'CZE' &&

            bratislava.__resolve(2).o === 'CZE' &&

            ruthNorth.__resolve(2).o === 'CZE' &&

            // Step 3 (Marzo 1939): Protettorato a GER, Slovacchia a SLO, Rutenia intera a HUN, Zaolzie a POL

            praha.__resolve(3).o === 'GER' &&

            praha.__resolve(3).adminEntity?.includes('Protektorat Böhmen und Mähren') &&

            bratislava.__resolve(3).o === 'SLO' &&

            bratislava.__resolve(3).adminEntity?.includes('Slovenská republika') &&

            ruthNorth.__resolve(3).o === 'HUN' &&

            zaolzie.__resolve(3).o === 'POL' &&

            // Step 5 (Settembre 1939): Invasione Polonia -> Zaolzie a GER

            zaolzie.__resolve(5).o === 'GER' &&

            zaolzie.__resolve(5).adminEntity?.includes('Kattowitz')

          );

        },

      },

      {

        name: 'Geometrie di Precisione: Danzica, Memelland, Zara, Carnaro, Panama e Monte Ararat',

        run: () => {

          const findF = (id: string) => loadedProvs.find((f: any) => f.id === id || f.properties?.NAME === id || f.properties?.__resolverId === id);

          const danzig = findF('Free City of Danzig');

          const memel = findF('Memel Territory');

          const zara = findF('Zara');

          const zadarDal = findF('HR_HIST_ZADAR');

          const carnaro = findF('Fiume and Carnaro');

          const croatLit = findF('HR_HIST_PRIMORJE');

          const panama = findF('Panama Canal Zone');

          const ararat = findF('TUR_HIST_ARARAT');

          return (

            !!danzig && !!memel && !!zara && !!zadarDal && !!carnaro && !!croatLit && !!panama && !!ararat &&

            danzig.__resolve(0).o === 'DANZIG' &&

            danzig.__resolve(4).o === 'DANZIG' &&

            danzig.__resolve(5).o === 'GER' &&

            memel.__resolve(0).o === 'LIT' &&

            memel.__resolve(2).o === 'LIT' &&

            memel.__resolve(3).o === 'GER' &&

            zara.__resolve(0).o === 'ITA' &&

            zadarDal.__resolve(0).o === 'YUG' &&

            carnaro.__resolve(0).o === 'ITA' &&

            croatLit.__resolve(0).o === 'YUG' &&

            panama.__resolve(0).o === 'USA' &&

            ararat.__resolve(0).o === 'TUR'

          );

        },

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

        name: 'Integrità Territoriale Guiana Francese (F_COL 1936-39 -> VIC_COL dal giu 1940)',

        run: () => {

          const frg = loadedProvs.find((f: any) => f.id === 'French Guiana' || f.properties?.NAME === 'French Guiana');

          const f6 = resolveFeature({ properties: { NUTS_ID: 'FRY30', NAME: 'French Guiana' } }, 6);

          return (

            resolveFeature({ properties: { NUTS_ID: 'FRY30', NAME: 'French Guiana' } }, 0).o === 'F_COL' &&

            (f6.o === 'VIC_COL' || f6.o === 'VIC') &&

            f6.fac === 'Fantoccio' &&

            resolveHB({ properties: { NAME: 'French Guiana' } }, 0).o === 'F_COL' &&

            (!frg || (frg.__resolve(0).o === 'F_COL' && (frg.__resolve(6).o === 'VIC_COL' || frg.__resolve(6).o === 'VIC')))

          );

        },

      },

      {

        name: 'Integrità Territoriale Marocco (Marocco Francese, Rif Spagnolo e Tangeri)',

        run: () => {

          const fr0 = resolveFeature({ id: 'FR_MOROCCO', properties: { id: 'FR_MOROCCO', CNTR_CODE: 'FR_MOROCCO', NAME: 'Morocco (France)' } }, 0);

          const fr6 = resolveFeature({ id: 'FR_MOROCCO', properties: { id: 'FR_MOROCCO', CNTR_CODE: 'FR_MOROCCO', NAME: 'Morocco (France)' } }, 6);

          const sp0 = resolveFeature({ id: 'ES_RIF', properties: { id: 'ES_RIF', CNTR_CODE: 'ES_RIF', NAME: 'Spanish Morocco' } }, 0);

          const sp2 = resolveFeature({ id: 'ES_RIF', properties: { id: 'ES_RIF', CNTR_CODE: 'ES_RIF', NAME: 'Spanish Morocco' } }, 2);

          const sp6 = resolveFeature({ id: 'ES_RIF', properties: { id: 'ES_RIF', CNTR_CODE: 'ES_RIF', NAME: 'Spanish Morocco' } }, 6);

          const tan0 = resolveHB({ properties: { NAME: 'Tangier' } }, 0);

          const tan6 = resolveHB({ properties: { NAME: 'Tangier' } }, 6);

          return (

            fr0.o === 'F_NAF' &&

            fr0.name.includes('Rabat') &&

            fr6.o === 'VIC_NAF' &&

            fr6.name.includes('Vichy') &&

            sp0.o === 'SPR' &&

            sp0.name.includes('Tetuán') &&

            sp2.o === 'SPA' &&

            sp6.o === 'SPA' &&

            (tan0.o === 'TANGER' || tan0.o === 'NEU') &&

            tan6.o === 'SPA'

          );

        },

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

          const memelFeat = loadedProvs.find((f: any) => f.id === 'Memel Territory' || f.properties?.NAME === 'Memel Territory');

          const memel3 = memelFeat ? memelFeat.__resolve(3) : { o: '' };

          // Danzica (Step 5)

          const danzigFeat = loadedProvs.find((f: any) => f.id === 'Free City of Danzig' || f.properties?.NAME === 'Free City of Danzig');

          const danzig5 = danzigFeat ? danzigFeat.__resolve(5) : { o: '' };



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

        name: 'Integrità Territoriale Microstati: San Marino (SMR Neutrale), Vaticano (VAT Neutrale), Gibilterra (GIB Alleati), Andorra (AND Neutrale) e Monaco (MCO Neutrale / ITA 1942)',

        run: () => {

          const findF = (id: string) => loadedProvs.find((f: any) => f.id === id || f.properties?.NAME === id);

          const smrFeat = findF('San Marino');

          const vatFeat = findF('Vatican City');

          const gibFeat = findF('Gibraltar');

          const andFeat = findF('Andorra');

          const mcoFeat = findF('Monaco');

          if (!smrFeat || !vatFeat || !gibFeat || !andFeat || !mcoFeat) return false;



          const smr = resolveFeature(smrFeat, 0);

          const vat0 = resolveFeature(vatFeat, 0);

          const vat5 = resolveFeature(vatFeat, 5);

          const gib = resolveFeature(gibFeat, 0);

          const and0 = resolveFeature(andFeat, 0);

          const mco0 = resolveFeature(mcoFeat, 0);

          const mco11 = resolveFeature(mcoFeat, 11);



          // Verifica anti-inglobamento: le province confinanti NON devono essere toccate

          const rimini = resolveFeature({ properties: { NUTS_ID: 'ITH59', CNTR_CODE: 'IT', NAME_LATN: 'Rimini' }, __cent: [12.43, 43.96] }, 0);

          const pesaro = resolveFeature({ properties: { NUTS_ID: 'ITI31', CNTR_CODE: 'IT', NAME_LATN: 'Pesaro e Urbino' }, __cent: [12.68, 43.70] }, 0);

          const roma = resolveFeature({ properties: { NUTS_ID: 'ITI43', CNTR_CODE: 'IT', NAME_LATN: 'Roma' }, __cent: [12.51, 41.85] }, 0);

          const cadiz = resolveFeature({ properties: { NUTS_ID: 'ES612', CNTR_CODE: 'ES', NAME_LATN: 'Cádiz' }, __cent: [-5.9, 36.5] }, 0);

          const alpesMaritimes = resolveFeature({ properties: { NUTS_ID: 'FRL03', CNTR_CODE: 'FR', NAME_LATN: 'Alpes-Maritimes' }, __cent: [7.12, 43.93] }, 0);



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

            mco0.o === 'MCO' &&

            mco0.fac === 'Neutrale' &&

            mco0.name.includes('Monaco') &&

            mco11.o === 'ITA' &&

            mco11.fac === 'Asse' &&

            rimini.o === 'ITA' &&

            pesaro.o === 'ITA' &&

            roma.o === 'ITA' &&

            (cadiz.o === 'SPR' || cadiz.o === 'SPA') &&

            alpesMaritimes.o === 'FRA'

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

          const lieFeat = loadedProvs.find((f: any) => f.id === 'Liechtenstein' || f.properties?.NAME === 'Liechtenstein');

          const lieFeat0 = lieFeat ? resolveFeature(lieFeat, 0) : { o: '', name: '' };

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

          const ess0 = resolveFeature({ properties: { id: 'DE113', NUTS_ID: 'DE113', CNTR_CODE: 'DE', NAME: 'Esslingen' } }, 0);

          return (

            ber0.o === 'GER' &&

            ber0.name.includes('Berlin') &&

            (ber0.adminEntity || '').includes('Deutsches Reich') &&

            ber6.o === 'GER' &&

            (ber6.adminEntity || '').includes('Großdeutsches Reich') &&

            schw0.name.includes('Schweinfurt') &&

            reg0.name.includes('Regensburg') &&

            (ess0.note || '').includes('Terzo Reich') &&

            (ess0.note || '').includes('Wilhelm Murr')

          );

        },

      },

      {

        name: 'Dinamica Geostorica Isole Fær Øer (Danimarca -> Occupazione Britannica 1940 / Operazione Valentine)',

        run: () => {

          const fo0 = resolveHB({ properties: { NAME: 'Faroe Islands' } }, 0);

          const fo6 = resolveHB({ properties: { NAME: 'Faroe Islands' } }, 6);

          const foFeat = loadedProvs.find((f: any) => f.id === 'Faroe Islands' || f.properties?.NAME === 'Faroe Islands');

          if (!foFeat || !foFeat.__resolve) return false;

          const foPrec0 = foFeat.__resolve(0);

          const foPrec6 = foFeat.__resolve(6);

          const foFeat0 = resolveFeature({ properties: { CNTR_CODE: 'FO', NAME: 'Faroe Islands' } }, 0);

          const foFeat6 = resolveFeature({ properties: { CNTR_CODE: 'FO', NAME: 'Faroe Islands' } }, 6);

          return (

            fo0.o === 'DEN' &&

            fo0.name.includes('Fær Øer') &&

            fo0.fac === 'Neutrale' &&

            fo6.o === 'UK' &&

            fo6.name.includes('Valentine') &&

            fo6.fac === 'Alleati' &&

            foPrec0.o === 'DEN' &&

            foPrec0.fac === 'Neutrale' &&

            foPrec6.o === 'UK' &&

            foPrec6.fac === 'Alleati' &&

            foFeat0.o === 'DEN' &&

            foFeat6.o === 'UK'

          );

        },

      },

      {

        name: 'Toponomastica e Statuto Geostorico Territori e Colonie Impero Britannico',

        run: () => {

          const jam = resolveHB({ properties: { NAME: 'Jamaica' } }, 0);

          const cey = resolveHB({ properties: { NAME: 'Ceylon' } }, 0);

          const guy = resolveHB({ properties: { NAME: 'Guyana' } }, 0);

          const bz = resolveHB({ properties: { NAME: 'Belize' } }, 0);

          const my = resolveHB({ properties: { NAME: 'Malaysia' } }, 0);

          const tz = resolveHB({ properties: { NAME: 'Tanzania, United Republic of' } }, 0);

          const nga = resolveHB({ properties: { NAME: 'Nigeria' } }, 0);

          const can = resolveHB({ properties: { NAME: 'Canada' } }, 0);

          const ast = resolveHB({ properties: { NAME: 'Australia' } }, 0);

          const nzl = resolveHB({ properties: { NAME: 'New Zealand' } }, 0);

          const saf = resolveHB({ properties: { NAME: 'Union of South Africa' } }, 0);

          const raj = resolveHB({ properties: { NAME: 'India' } }, 0);

          const burma0 = resolveFeature({ properties: { CNTR_CODE: 'MM', NAME: 'Burma' } }, 0);

          const burma2 = resolveFeature({ properties: { CNTR_CODE: 'MM', NAME: 'Burma' } }, 2);

          const som0 = resolveHB({ properties: { NAME: 'British Somaliland' } }, 0);

          const som6 = resolveHB({ properties: { NAME: 'British Somaliland' } }, 6);

          const man = resolveFeature({ properties: { CNTR_CODE: 'IM', NAME: 'Isle of Man' } }, 0);

          const jer0 = resolveFeature({ properties: { CNTR_CODE: 'JE', NAME: 'Jersey' } }, 0);

          const jer6 = resolveFeature({ properties: { CNTR_CODE: 'JE', NAME: 'Jersey' } }, 6);



          return (

            jam.o === 'UK' &&

            jam.name.includes('Jamaica') &&

            (jam.adminEntity || '').includes('Crown Colony') &&

            cey.o === 'UK' &&

            cey.name.includes('Ceylon') &&

            (cey.adminEntity || '').includes('Crown Colony') &&

            guy.o === 'UK' &&

            guy.name.includes('British Guiana') &&

            bz.o === 'UK' &&

            bz.name.includes('British Honduras') &&

            my.o === 'UK' &&

            my.name.includes('British Malaya') &&

            tz.o === 'UK' &&

            tz.name.includes('Tanganyika') &&

            nga.o === 'UK' &&

            nga.name.includes('Nigeria') &&

            can.o === 'CAN' &&

            can.name.includes('Dominion of Canada') &&

            ast.o === 'AST' &&

            ast.name.includes('Australia') &&

            nzl.o === 'NZL' &&

            nzl.name.includes('New Zealand') &&

            saf.o === 'SAF' &&

            saf.name.includes('South Africa') &&

            raj.o === 'RAJ' &&

            raj.name.includes('British Raj') &&

            burma0.name.includes('Indian Empire') &&

            burma2.name.includes('Crown Colony') &&

            som0.o === 'UK' &&

            som6.o === 'UK' &&

            man.o === 'UK' &&

            man.adminEntity === 'Crown Dependency of the Isle of Man' &&

            jer0.o === 'UK' &&

            jer6.o === 'GER'

          );

        },

      },

      {

        name: 'Toponomastica e Statuto Geostorico Territori URSS, Kresy Wschodnie e Annessioni 1939-1940',

        run: () => {

          // 1. Territori Metropolitani URSS

          const msk = resolveFeature({ properties: { id: 'RU_MOW', CNTR_CODE: 'RU', NAME: 'Moscow' } }, 0);

          const len = resolveFeature({ properties: { id: 'RU_SPE', CNTR_CODE: 'RU', NAME: 'Leningrad' } }, 0);

          const stg = resolveFeature({ properties: { id: 'RU_VGG', CNTR_CODE: 'RU', NAME: 'Stalingrad' } }, 0);

          const svr = resolveFeature({ properties: { id: 'RU_SVE', CNTR_CODE: 'RU', NAME: 'Sverdlovsk' } }, 0);

          const bku = resolveFeature({ properties: { id: 'AZ_BAK', CNTR_CODE: 'AZ', NAME: 'Baku' } }, 0);

          const iev = resolveFeature({ properties: { id: 'UA_KIE', CNTR_CODE: 'UA', NAME: 'Kiev' } }, 0);

          const khk = resolveFeature({ properties: { id: 'UA_KHA', CNTR_CODE: 'UA', NAME: 'Kharkov' } }, 0);

          const mskB = resolveFeature({ properties: { id: 'BY_MIN', CNTR_CODE: 'BY', NAME: 'Minsk' } }, 0);

          const tuv = resolveFeature({ properties: { id: 'SOV_ADM1_RUS_55_Tuva', CNTR_CODE: 'SU', NAME: 'Tuva' } }, 0);



          // 2. Kresy Polacchi (Step 0: POL -> Step 5: SOV)

          const lwow0 = resolveFeature({ id: 'PL_KRESY_LVO_1', properties: { NUTS_ID: 'PL_KRESY_LVO_1', CNTR_CODE: 'PL', NAME: 'Powiat Lwów', VOIVODESHIP: 'Lwowskie', SOV_SSR: 'Ukrainskaya SSR' } }, 0);

          const lwow5 = resolveFeature({ id: 'PL_KRESY_LVO_1', properties: { NUTS_ID: 'PL_KRESY_LVO_1', CNTR_CODE: 'PL', NAME: 'Powiat Lwów', VOIVODESHIP: 'Lwowskie', SOV_SSR: 'Ukrainskaya SSR' } }, 5);

          const brs0 = resolveFeature({ id: 'PL_KRESY_BLR_2_Brest', properties: { NUTS_ID: 'PL_KRESY_BLR_2_Brest', CNTR_CODE: 'PL', NAME: 'Powiat Brześć', VOIVODESHIP: 'Poleskie', SOV_SSR: 'Belorusskaya SSR' } }, 0);

          const brs5 = resolveFeature({ id: 'PL_KRESY_BLR_2_Brest', properties: { NUTS_ID: 'PL_KRESY_BLR_2_Brest', CNTR_CODE: 'PL', NAME: 'Powiat Brześć', VOIVODESHIP: 'Poleskie', SOV_SSR: 'Belorusskaya SSR' } }, 5);



          // 3. Annessioni 1940 (Step 0 vs Step 6: Paesi Baltici, Bessarabia)

          const tal0 = resolveFeature({ properties: { CNTR_CODE: 'EE', NAME: 'Tallinn' } }, 0);

          const tal6 = resolveFeature({ properties: { CNTR_CODE: 'EE', NAME: 'Tallinn' } }, 6);

          const rig0 = resolveFeature({ properties: { CNTR_CODE: 'LV', NAME: 'Riga' } }, 0);

          const rig6 = resolveFeature({ properties: { CNTR_CODE: 'LV', NAME: 'Riga' } }, 6);

          const chs0 = resolveFeature({ properties: { CNTR_CODE: 'MD', NAME: 'Chisinau' } }, 0);

          const chs6 = resolveFeature({ properties: { CNTR_CODE: 'MD', NAME: 'Chisinau' } }, 6);



          const conds = {

            msk: msk.o === 'SOV' && msk.name.includes('Moskva') && msk.fac === 'Comintern',

            len: len.o === 'SOV' && len.name.includes('Leningrad') && len.fac === 'Comintern',

            stg: stg.o === 'SOV' && stg.name.includes('Stalingrad') && stg.fac === 'Comintern',

            svr: svr.o === 'SOV' && svr.name.includes('Sverdlovsk') && svr.fac === 'Comintern',

            bku: bku.o === 'SOV' && bku.name.includes('Baku') && bku.fac === 'Comintern',

            iev: iev.o === 'SOV' && iev.name.includes('Kiev') && iev.fac === 'Comintern',

            khk: khk.o === 'SOV' && khk.name.includes('Kharkov') && khk.fac === 'Comintern',

            mskB: mskB.o === 'SOV' && mskB.name.includes('Minsk') && mskB.fac === 'Comintern',

            tuv: tuv.o === 'TUV' && tuv.fac === 'Comintern',

            lwow0: lwow0.o === 'POL' && (lwow0.adminEntity || '').includes('Lwowskie'),

            lwow5: lwow5.o === 'SOV' && (lwow5.adminEntity || '').includes('Ukrainskaya SSR'),

            brs0: brs0.o === 'POL' && (brs0.adminEntity || '').includes('Poleskie'),

            brs5: brs5.o === 'SOV' && (brs5.adminEntity || '').includes('Belorusskaya SSR'),

            tal0: tal0.o === 'EST',

            tal6: tal6.o === 'SOV',

            rig0: rig0.o === 'LAT',

            rig6: rig6.o === 'SOV',

            chs0: chs0.o === 'ROM',

            chs6: chs6.o === 'SOV'

          };

          return Object.values(conds).every(Boolean);

        },

      },

      {

        name: 'Architettura Gerarchica di Sovranità (Dominions, Colonie, Fantocci e Satelliti)',

        run: () => {

          const checks = [

            // Commonwealth britannico

            isSubjectOf('CAN', 'UK'),

            isSubjectOf('AST', 'UK'),

            isSubjectOf('NZL', 'UK'),

            isSubjectOf('SAF', 'UK'),

            isSubjectOf('RAJ', 'UK'),

            isSubjectOf('GIB', 'UK'),

            // Fantocci nipponici

            isSubjectOf('MAN', 'JAP'),

            isSubjectOf('MEJ', 'JAP'),

            isSubjectOf('WJ_CHI', 'JAP'),

            // Fantocci tedeschi

            isSubjectOf('SLO', 'GER'),

            // Dipendenze USA

            isSubjectOf('PHL', 'USA'),

            // Satelliti sovietici

            isSubjectOf('MON', 'SOV'),

            isSubjectOf('TUV', 'SOV'),

            // Impero coloniale francese

            isSubjectOf('F_NAF', 'FRA'),

            isSubjectOf('F_AOF', 'FRA'),

            isSubjectOf('F_AEF', 'FRA'),

            // Sovranità temporale dinamica (Etiopia e Albania)

            getOverlord('ETH', 0) === null,

            getOverlord('ETH', 1)?.id === 'ITA',

            getOverlord('ALB', 0) === null,

            getOverlord('ALB', 4)?.id === 'ITA',

            // Canonicalizzazione e alias

            getOwnerMeta('SWI').shortName === 'Svizzera',

            getOwnerMeta('CH').id === 'SWI',

            getOwnerMeta('AUS').shortName === 'Austria',

            getOwnerMeta('AT').id === 'AUS',

            getOwnerMeta('ROM').shortName === 'Romania',

            getOwnerMeta('ROU').id === 'ROM',

            getOwnerMeta('EGY').shortName === 'Egitto',

            getOwnerMeta('EG').id === 'EGY',

          ];

          return checks.every(Boolean);

        },

      },

      {

        name: 'Integrità Topologica Frontiera Bielorussia - Russia (Chiusura Buchi Neri Smolensk, Bryansk e Pskov)',

        run: () => {

          const findF = (id: string) => loadedProvs.find((f: any) => f.id === id);

          const smol = findF('SOV_ADM1_RUS_53_Smolensk_Oblast');

          const bry = findF('SOV_ADM1_RUS_29_Bryansk_Oblast');

          const psk = findF('SOV_ADM1_RUS_16_Pskov_Oblast');

          const vit = findF('SOV_ADM1_BLR_101_Vitebsk');

          const mog = findF('SOV_ADM1_BLR_102_Mogilev');

          const gom = findF('SOV_ADM1_BLR_100_Gomel');

          if (!smol || !bry || !psk || !vit || !mog || !gom) return false;



          const sRing = smol.geometry.coordinates[0];

          const bRing = bry.geometry.type === 'Polygon' ? bry.geometry.coordinates[0] : bry.geometry.coordinates[0][0];

          const pRing = psk.geometry.coordinates[0];



          // Verifica triple points condivisi ad incastro perfetto

          const hasVMS = sRing.some((p: number[]) => Math.abs(p[0] - 31.179017) < 1e-5 && Math.abs(p[1] - 54.453353) < 1e-5);

          const hasVPS = sRing.some((p: number[]) => Math.abs(p[0] - 30.886156) < 1e-5 && Math.abs(p[1] - 55.600483) < 1e-5);

          const hasMGB = bRing.some((p: number[]) => Math.abs(p[0] - 31.361573) < 1e-5 && Math.abs(p[1] - 53.120038) < 1e-5);

          const hasSouth = bRing.some((p: number[]) => Math.abs(p[0] - 31.47485) < 1e-5 && Math.abs(p[1] - 52.11778) < 1e-5);

          const hasPskovNorth = pRing.some((p: number[]) => Math.abs(p[0] - 30.886156) < 1e-5 && Math.abs(p[1] - 55.600483) < 1e-5);



          return hasVMS && hasVPS && hasMGB && hasSouth && hasPskovNorth;

        },

      },

      {

        name: 'Audit Geostorico Integrale dei Balcani (225 Distretti: YUG, ALB, GRE, ROM, BUL, HUN 1936-1940)',

        run: () => {

          // 1. Verifica catalogazione completa 225 distretti

          if (BALKAN_DISTRICTS_CATALOG.length !== 225) return false;



          // 2. Ungheria (HU): Budapest HU110, Debrecen HU321, Szeged HU333

          const huBud = resolveBalkansToponym('HU110', 'Budapest', 'budapest', 'HUN', 0);

          const huDeb = resolveBalkansToponym('HU321', 'Hajdú-Bihar', 'hajdu_bihar', 'HUN', 0);

          if (!huBud || huBud.owner !== 'HUN' || !huBud.name.includes('Budapest')) return false;

          if (!huDeb || huDeb.owner !== 'HUN' || !huDeb.name.includes('Debrecen')) return false;



          // 3. Romania (RO): Bucarest RO321, Cluj RO113, Constanța RO223

          const roBuc = resolveBalkansToponym('RO321', 'București', 'bucuresti', 'ROM', 0);

          const roCluj = resolveBalkansToponym('RO113', 'Cluj', 'cluj', 'ROM', 0);

          const roConst = resolveBalkansToponym('RO223', 'Constanța', 'constanta', 'ROM', 0);

          if (!roBuc || roBuc.owner !== 'ROM' || !roBuc.name.includes('București')) return false;

          if (!roCluj || roCluj.owner !== 'ROM' || !roCluj.name.includes('Cluj')) return false;

          if (!roConst || roConst.owner !== 'ROM' || !roConst.name.includes('Constanța')) return false;



          // 4. Bulgaria (BG): Sofia BG411, Plovdiv BG421, Varna BG331, Ruse BG323

          const bgSof = resolveBalkansToponym('BG411', 'Sofia', 'sofia', 'BUL', 0);

          const bgPlo = resolveBalkansToponym('BG421', 'Plovdiv', 'plovdiv', 'BUL', 0);

          const bgVar = resolveBalkansToponym('BG331', 'Varna', 'varna', 'BUL', 0);

          if (!bgSof || bgSof.owner !== 'BUL' || !bgSof.name.includes('Sofia')) return false;

          if (!bgPlo || bgPlo.owner !== 'BUL' || !bgPlo.name.includes('Plovdiv')) return false;

          if (!bgVar || bgVar.owner !== 'BUL' || !bgVar.name.includes('Varna')) return false;



          // 5. Grecia (EL): Atene EL303, Salonicco EL522, Creta EL431, Cicladi EL422

          const elAth = resolveBalkansToponym('EL303', 'Kentrikos Tomeas Athinon', 'athina', 'GRE', 0);

          const elThe = resolveBalkansToponym('EL522', 'Thessaloniki', 'thessaloniki', 'GRE', 0);

          const elCre = resolveBalkansToponym('EL431', 'Irakleio', 'heraklion', 'GRE', 0);

          const elCyc = resolveBalkansToponym('EL422', 'Kyklades', 'kyklades', 'GRE', 0);

          if (!elAth || elAth.owner !== 'GRE' || !elAth.name.includes('Atene')) return false;

          if (!elThe || elThe.owner !== 'GRE' || !elThe.name.includes('Salonicco')) return false;

          if (!elCre || elCre.owner !== 'GRE' || !elCre.name.includes('Irakleio')) return false;

          if (!elCyc || elCyc.owner !== 'GRE' || !elCyc.name.includes('Cicladi')) return false;



          // 6. Albania (AL): Dinamica Zog (Step 0) -> Unione Personale Italia (Step 4+)

          const alTir0 = resolveBalkansToponym('AL022', 'Tiranë', 'tirane', 'ALB', 0);

          const alTir4 = resolveBalkansToponym('AL022', 'Tiranë', 'tirane', 'ALB', 4);

          const alDur0 = resolveBalkansToponym('AL021', 'Durrës', 'durres', 'ALB', 0);

          const alDur4 = resolveBalkansToponym('AL021', 'Durrës', 'durres', 'ALB', 4);

          if (!alTir0 || alTir0.owner !== 'ALB' || !alTir0.adminTitle?.includes('Zog')) return false;

          if (!alTir4 || alTir4.owner !== 'ITA' || !alTir4.adminTitle?.includes('Luogotenenza Generale')) return false;

          if (!alDur0 || alDur0.owner !== 'ALB') return false;

          if (!alDur4 || alDur4.owner !== 'ITA') return false;



          // 7. Jugoslavia (YUG):

          // Belgrado RS110, Zagabria HR050, Lubiana SI041, Sarajevo BABIH, Skopje MK008, Cettigne ME000, Kosovo YUG_HIST_KOSOVO

          const yugBel = resolveBalkansToponym('RS110', 'Beograd', 'beograd', 'YUG', 0);

          const yugZag0 = resolveBalkansToponym('HR050', 'Grad Zagreb', 'zagreb', 'YUG', 0);

          const yugZag4 = resolveBalkansToponym('HR050', 'Grad Zagreb', 'zagreb', 'YUG', 4);

          const yugLjub = resolveBalkansToponym('SI041', 'Osrednjeslovenska', 'ljubljana', 'YUG', 0);

          const yugSar = resolveBalkansToponym('BABIH', 'Federacija Bosne i Hercegovine', 'sarajevo', 'YUG', 0);

          const yugSko = resolveBalkansToponym('MK008', 'Skopski', 'skopje', 'YUG', 0);

          const yugCet = resolveBalkansToponym('ME000', 'Crna Gora', 'cetinje', 'YUG', 0);

          const yugKos = resolveBalkansToponym('YUG_HIST_KOSOVO', 'Kosovo', 'kosovo', 'YUG', 0);

          if (!yugBel || yugBel.owner !== 'YUG' || !yugBel.name.includes('Beograd')) return false;

          if (!yugZag0 || yugZag0.owner !== 'YUG' || !yugZag0.adminTitle?.includes('Savska Banovina')) return false;

          if (!yugZag4 || yugZag4.owner !== 'YUG' || !yugZag4.adminTitle?.includes('Banovina Hrvatska')) return false;

          if (!yugLjub || yugLjub.owner !== 'YUG' || !yugLjub.name.includes('Ljubljana')) return false;

          if (!yugSar || yugSar.owner !== 'YUG' || !yugSar.name.includes('Sarajevo')) return false;

          if (!yugSko || yugSko.owner !== 'YUG' || !yugSko.name.includes('Skoplje')) return false;

          if (!yugCet || yugCet.owner !== 'YUG' || !yugCet.name.includes('Cetinje')) return false;

          if (!yugKos || yugKos.owner !== 'YUG' || !yugKos.name.includes('Kosovo')) return false;



          // 8. Enclavi e trattati italo-jugoslavi (Rapallo 1920)

          const istriaPola = resolveBalkansToponym('HR036', 'Istarska', 'pula', 'ITA', 0);

          const gorizia = resolveBalkansToponym('SI043', 'Goriška', 'gorizia', 'ITA', 0);

          const capodistria = resolveBalkansToponym('SI044', 'Obalno-kraška', 'koper', 'ITA', 0);

          if (!istriaPola || istriaPola.owner !== 'ITA') return false;

          if (!gorizia || gorizia.owner !== 'ITA') return false;

          if (!capodistria || capodistria.owner !== 'ITA') return false;



          // 9. Risoluzione tramite feature geospaziale

          const fHu = resolveFeature({ properties: { CNTR_CODE: 'HU', NUTS_ID: 'HU110', NAME: 'Budapest' } }, 0);

          const fRo = resolveFeature({ properties: { CNTR_CODE: 'RO', NUTS_ID: 'RO321', NAME: 'Bucuresti' } }, 0);

          const fBg = resolveFeature({ properties: { CNTR_CODE: 'BG', NUTS_ID: 'BG411', NAME: 'Sofia' } }, 0);

          const fEl = resolveFeature({ properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL303', NAME: 'Athina' } }, 0);

          const fAl0 = resolveFeature({ properties: { CNTR_CODE: 'AL', NUTS_ID: 'AL022', NAME: 'Tirane' } }, 0);

          const fAl4 = resolveFeature({ properties: { CNTR_CODE: 'AL', NUTS_ID: 'AL022', NAME: 'Tirane' } }, 4);

          const fYug = resolveFeature({ properties: { CNTR_CODE: 'RS', NUTS_ID: 'RS110', NAME: 'Beograd' } }, 0);



          return (

            fHu.o === 'HUN' &&

            fRo.o === 'ROM' &&

            fBg.o === 'BUL' &&

            fEl.o === 'GRE' &&

            fAl0.o === 'ALB' &&

            fAl4.o === 'ITA' &&

            fYug.o === 'YUG'

          );

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

        name: 'Audit Geostorico Esaustivo Province e Territori Africani (71 Entità: 27 Governatorati Regno d\'Egitto, 22 Province Quarta Sponda Libia Balbo/Graziani, AOI Etiopia/Eritrea/Somalia, Somaliland Chater, Congo Belga Ryckmans, Colonie Portoghesi, Africa Spagnola Rif/Tangeri Yuste, Vichy AOF vs FFL AEF Éboué, Liberia Barclay, Sudafrica Smuts)',

        run: () => {

          // 1. Quarta Sponda (Libia): 22 Province Storiche (Tripolitania, Cirenaica, Territorio Militare del Sud)

          const lyProvs = loadedProvs.filter((f: any) => f.properties?.CNTR_CODE === 'LY' || f.id?.startsWith('LY'));

          const featTB = lyProvs.find((f: any) => f.id === 'LYTB');

          const tb0 = resolveFeature(featTB, 0);

          const tb6 = resolveFeature(featTB, 6);

          const lib0 = resolveHB({ properties: { NAME: 'Libya' } }, 0);

          const lib6 = resolveHB({ properties: { NAME: 'Libya' } }, 6);

          const topLib0 = getExtendedToponym('Libya', lib0.o, undefined, undefined, 0);

          const topLib6 = getExtendedToponym('Libya', lib6.o, undefined, undefined, 6);



          // 1.1 Regno d'Egitto: 27 Governatorati e Mudiriyat (Delta, Medio/Alto Egitto, Canale, Frontiere Sinai e Mar Rosso)

          const egProvs = loadedProvs.filter((f: any) => f.properties?.CNTR_CODE === 'EG' || f.properties?.SOVEREIGN === 'EGY' || f.id?.startsWith('EG'));

          const featCairo = egProvs.find((f: any) => f.id === 'EGC');

          const cairo0 = resolveFeature(featCairo, 0);

          const featAlex = egProvs.find((f: any) => f.id === 'EGALX');

          const alex0 = resolveFeature(featAlex, 0);

          const featMatruh = egProvs.find((f: any) => f.id === 'EGMT');

          const matruh0 = resolveFeature(featMatruh, 0);

          const featSinai = egProvs.find((f: any) => f.id === 'EGSIN');

          const sinai0 = resolveFeature(featSinai, 0);

          const featAswan = egProvs.find((f: any) => f.id === 'EGASN');

          const aswan0 = resolveFeature(featAswan, 0);

          const featSuez = egProvs.find((f: any) => f.id === 'EGSUZ');

          const suez0 = resolveFeature(featSuez, 0);



          // 2. Corno d'Africa e AOI: Etiopia Sovrana Negus Haile Selassie (step 0) -> AOI Duca d'Aosta (step 6); Somaliland britannico sotto Arthur Chater (step 6 Giu 1940 UK, invasione italiana ad agosto 1940)

          const eth0 = resolveHB({ properties: { NAME: 'Ethiopia (Italy)' } }, 0);

          const eth6 = resolveHB({ properties: { NAME: 'Ethiopia (Italy)' } }, 6);

          const topEth0 = getExtendedToponym('Ethiopia (Italy)', eth0.o, undefined, undefined, 0);

          const topEth6 = getExtendedToponym('Ethiopia (Italy)', eth6.o, undefined, undefined, 6);

          const somBr0 = resolveHB({ properties: { NAME: 'British Somaliland' } }, 0);

          const somBr6 = resolveHB({ properties: { NAME: 'British Somaliland' } }, 6);

          const topSomBr6 = getExtendedToponym('British Somaliland', somBr6.o, undefined, undefined, 6);



          // 3. Congo Belga & Ruanda-Urundi: Pierre Ryckmans, continuità alleata e risorse strategiche Shinkolobwe/Katanga

          const congo0 = resolveHB({ properties: { NAME: 'Belgian Congo' } }, 0);

          const congo6 = resolveHB({ properties: { NAME: 'Belgian Congo' } }, 6);

          const topCongo = getExtendedToponym('Belgian Congo', congo6.o, undefined, undefined, 6);

          const ruanda0 = resolveHB({ properties: { NAME: 'Rwanda (Belgium)' } }, 0);



          // 4. Colonie Portoghesi: Angola (Luanda / Benguela) e Mozambico (Lourenço Marques)

          const ang0 = resolveHB({ properties: { NAME: 'Angola (Portugal)' } }, 0);

          const moz0 = resolveHB({ properties: { NAME: 'Mozambique (Portugal)' } }, 0);

          const topAng = getExtendedToponym('Angola (Portugal)', ang0.o, undefined, undefined, 0);

          const topMoz = getExtendedToponym('Mozambique (Portugal)', moz0.o, undefined, undefined, 0);



          // 5. Africa Spagnola & Tangeri: Rif culla Alzamiento 1936; Tangeri occupata da truppe coloniali spagnole giu 1940

          const rif0 = resolveHB({ properties: { NAME: 'Spanish Morocco' } }, 0);

          const rif6 = resolveHB({ properties: { NAME: 'Spanish Morocco' } }, 6);

          const topRif0 = getExtendedToponym('Spanish Morocco', rif0.o, undefined, undefined, 0);

          const topRif6 = getExtendedToponym('Spanish Morocco', rif6.o, undefined, undefined, 6);

          const tang0 = resolveHB({ properties: { NAME: 'Tangier' } }, 0);

          const tang6 = resolveHB({ properties: { NAME: 'Tangier' } }, 6);

          const topTang6 = getExtendedToponym('Tangier', tang6.o, undefined, undefined, 6);



          // 6. Spartizione Impero Coloniale Francese (1940): Vichy AOF (Dakar / Pierre Boisson) vs FFL AEF (Brazzaville / Félix Éboué)

          const aof0 = resolveHB({ properties: { NAME: 'French West Africa' } }, 0);

          const aof6 = resolveHB({ properties: { NAME: 'French West Africa' } }, 6);

          const topAof6 = getExtendedToponym('French West Africa', aof6.o, undefined, undefined, 6);

          const aef6 = resolveHB({ properties: { NAME: 'French Equatorial Africa' } }, 6);

          const topAef6 = getExtendedToponym('French Equatorial Africa', aef6.o, undefined, undefined, 6);



          // 7. Stati Indipendenti & Dominions: Liberia (Monrovia / Edwin Barclay), Sudafrica (Smuts / Simon's Town), Egitto (Cairo / Wafd)

          const lbr0 = resolveHB({ properties: { NAME: 'Liberia' } }, 0);

          const topLbr = getExtendedToponym('Liberia', lbr0.o, undefined, undefined, 0);

          const saf0 = resolveHB({ properties: { NAME: 'Union of South Africa' } }, 0);

          const topSaf = getExtendedToponym('Union of South Africa', saf0.o, undefined, undefined, 0);

          const egy0 = resolveHB({ properties: { NAME: 'Egypt' } }, 0);

          const topEgy = getExtendedToponym('Egypt', egy0.o, undefined, undefined, 0);



          return (

            // Libia

            lyProvs.length === 22 &&

            tb0.o === 'ITA' && (tb0.adminEntity || '').includes('Balbo') &&

            tb6.o === 'ITA' && (tb6.adminEntity || '').includes('Graziani') &&

            lib0.o === 'ITA' && (topLib0.adminTitle || '').includes('Balbo') &&

            lib6.o === 'ITA' && (topLib6.adminTitle || '').includes('Graziani') &&

            // Egitto (27 Governatorati se presenti)

            (egProvs.length === 0 || (

              egProvs.length === 27 &&

              cairo0?.o === 'EGY' && (cairo0?.name || '').includes('Cairo') &&

              alex0?.o === 'EGY' && (alex0?.name || '').includes('Alessandria') &&

              matruh0?.o === 'EGY' && (matruh0?.note || '').includes('O\'Connor') &&

              sinai0?.o === 'EGY' && (sinai0?.name || '').includes('Sinai') &&

              aswan0?.o === 'EGY' && (aswan0?.name || '').includes('Aswan') &&

              suez0?.o === 'EGY' && (suez0?.adminEntity || '').includes('Suez')

            )) &&

            // Corno d'Africa

            eth0.o === 'ETH' && (topEth0.adminTitle || '').includes('Haile Selassie') &&

            eth6.o === 'ITA' && (topEth6.adminTitle || '').includes('Duca d\'Aosta') &&

            somBr0.o === 'UK' && somBr6.o === 'UK' && (topSomBr6.adminTitle || '').includes('Chater') && (topSomBr6.note || '').includes('agosto') &&

            // Congo Belga

            congo0.o === 'BEL' && congo6.o === 'BEL' && (topCongo.adminTitle || '').includes('Ryckmans') &&

            ruanda0.o === 'BEL' &&

            // Colonie Portoghesi

            ang0.o === 'POR' && topAng.name.includes('Angola') &&

            moz0.o === 'POR' && topMoz.name.includes('Moçambique') &&

            // Africa Spagnola & Tangeri

            rif0.o === 'SPR' && rif6.o === 'SPA' && (topRif0.note || '').includes('Alzamiento') &&

            tang6.o === 'SPA' && (topTang6.adminTitle || '').includes('Yuste') &&

            // Vichy vs FFL

            aof0.o === 'F_AOF' && aof6.o === 'VIC_AOF' && (topAof6.adminTitle || '').includes('Boisson') &&

            aef6.o === 'FFL_AEF' && (topAef6.adminTitle || '').includes('Félix Éboué') &&

            // Liberia, Sudafrica, Egitto

            lbr0.o === 'LBR' && (topLbr.adminTitle || '').includes('Barclay') &&

            saf0.o === 'SAF' && (topSaf.note || '').includes('Smuts') &&

            (egy0.o === 'UK' || egy0.o === 'EGY') && (topEgy.note || '').includes('Trattato Anglo-Egiziano')

          );

        },

      },

      {

        name: 'Audit Geostorico Integrale del Sudamerica (14 Entità Sovrane e Coloniali 1936-1940)',

        run: () => {

          const bra = resolveHB({ properties: { NAME: 'Brazil' } }, 0);

          const arg = resolveHB({ properties: { NAME: 'Argentina' } }, 0);

          const chl = resolveHB({ properties: { NAME: 'Chile' } }, 0);

          const pru = resolveHB({ properties: { NAME: 'Peru' } }, 0);

          const col = resolveHB({ properties: { NAME: 'Colombia' } }, 0);

          const ven = resolveHB({ properties: { NAME: 'Venezuela' } }, 0);

          const ecu = resolveHB({ properties: { NAME: 'Ecuador' } }, 0);

          const bol = resolveHB({ properties: { NAME: 'Bolivia' } }, 0);

          const par = resolveHB({ properties: { NAME: 'Paraguay' } }, 0);

          const uru = resolveHB({ properties: { NAME: 'Uruguay' } }, 0);

          const guy = resolveHB({ properties: { NAME: 'Guyana' } }, 0);

          const sur = resolveHB({ properties: { NAME: 'Suriname' } }, 0);

          const gf0 = resolveHB({ properties: { NAME: 'French Guiana' } }, 0);

          const gf6 = resolveHB({ properties: { NAME: 'French Guiana' } }, 6);

          const tri = resolveHB({ properties: { NAME: 'Trinidad' } }, 0);



          const braMeta = getOwnerMeta(bra.o);

          const argMeta = getOwnerMeta(arg.o);

          const chlMeta = getOwnerMeta(chl.o);

          const bolMeta = getOwnerMeta(bol.o);

          const parMeta = getOwnerMeta(par.o);

          const uruMeta = getOwnerMeta(uru.o);

          const ecuMeta = getOwnerMeta(ecu.o);



          return (

            bra.o === 'BRA' && bra.name.includes('Brasil') && (braMeta.leader || '').includes('Getúlio Vargas') &&

            arg.o === 'ARG' && arg.name.includes('Argentina') && (arg.adminEntity || '').includes('Década Infame') &&

            chl.o === 'CHL' && chl.name.includes('Chile') && (chl.adminEntity || '').includes('Frente Popular') &&

            pru.o === 'PRU' && pru.name.includes('Peruana') &&

            col.o === 'COL' && col.name.includes('Colombia') &&

            ven.o === 'VEN' && ven.name.includes('Venezuela') && (ven.adminEntity || '').includes('López Contreras') &&

            ecu.o === 'ECU' && ecu.name.includes('Ecuador') && (ecuMeta.leader || '').includes('Federico Páez') &&

            bol.o === 'BOL' && bol.name.includes('Bolivia') && (bol.adminEntity || '').includes('Chaco') && (bolMeta.leader || '').includes('David Toro') &&

            par.o === 'PAR' && par.name.includes('Paraguay') && (parMeta.leader || '').includes('Estigarribia') &&

            uru.o === 'URU' && uru.name.includes('Uruguay') && (uruMeta.leader || '').includes('Terra') &&

            guy.o === 'UK' && guy.name.includes('British Guiana') &&

            sur.o === 'HOL' && sur.name.includes('Suriname') &&

            gf0.o === 'F_COL' && (gf6.o === 'VIC_COL' || gf6.o === 'VIC') && gf6.fac === 'Fantoccio' &&

            tri.o === 'UK' && tri.name.includes('Trinidad')

          );

        },

      },

      {

        name: 'Audit Geostorico Integrale del Centroamerica e Caraibi (14 Entità Sovrane e Territori Strategici 1936-1940: GTM Ubico, SLV Martínez, HND Carías Andino, NIC Somoza, CRI Cortés/Calderón, PAN Arosemena/Arias, PCZ Canale USA, BLZ Belize, MEX Cárdenas/PEMEX, CUB Batista, DOM Trujillo, HAI Vincent, PR Puerto Rico Leahy, JM Giamaica)',

        run: () => {

          const gtm = resolveHB({ properties: { NAME: 'Guatemala' } }, 0);

          const slv = resolveHB({ properties: { NAME: 'El Salvador' } }, 0);

          const hnd = resolveHB({ properties: { NAME: 'Honduras' } }, 0);

          const nic = resolveHB({ properties: { NAME: 'Nicaragua' } }, 0);

          const cri0 = resolveHB({ properties: { NAME: 'Costa Rica' } }, 0);

          const cri6 = resolveHB({ properties: { NAME: 'Costa Rica' } }, 6);

          const pan0 = resolveHB({ properties: { NAME: 'Panama' } }, 0);

          const pan6 = resolveHB({ properties: { NAME: 'Panama' } }, 6);

          const pcz = resolveHB({ properties: { NAME: 'Panama Canal Zone' } }, 0);

          const blz = resolveHB({ properties: { NAME: 'Belize' } }, 0);

          const mex0 = resolveHB({ properties: { NAME: 'Mexico' } }, 0);

          const mex6 = resolveHB({ properties: { NAME: 'Mexico' } }, 6);

          const cub0 = resolveHB({ properties: { NAME: 'Cuba' } }, 0);

          const cub6 = resolveHB({ properties: { NAME: 'Cuba' } }, 6);

          const dom = resolveHB({ properties: { NAME: 'Dominican Republic' } }, 0);

          const hai = resolveHB({ properties: { NAME: 'Haiti' } }, 0);

          const pr = resolveHB({ properties: { NAME: 'Puerto Rico' } }, 0);

          const jm = resolveHB({ properties: { NAME: 'Jamaica' } }, 0);



          const fMex = resolveFeature({ properties: { CNTR_CODE: 'MX', NAME: 'Mexico' } }, 0);

          const fPr = resolveFeature({ properties: { CNTR_CODE: 'PR', NAME: 'Puerto Rico' } }, 0);

          const fJm = resolveFeature({ properties: { CNTR_CODE: 'JM', NAME: 'Jamaica' } }, 0);



          const gtmMeta = getOwnerMeta(gtm.o);

          const slvMeta = getOwnerMeta(slv.o);

          const hndMeta = getOwnerMeta(hnd.o);

          const nicMeta = getOwnerMeta(nic.o);

          const mexMeta = getOwnerMeta(mex0.o);



          return (

            gtm.o === 'GTM' && gtm.name.includes('Guatemala') && (gtmMeta.leader || '').includes('Ubico') &&

            slv.o === 'SLV' && slv.name.includes('El Salvador') && (slvMeta.leader || '').includes('Martínez') &&

            hnd.o === 'HND' && hnd.name.includes('Honduras') && (hndMeta.leader || '').includes('Carías') &&

            nic.o === 'NIC' && nic.name.includes('Nicaragua') && (nicMeta.leader || '').includes('Somoza') &&

            cri0.o === 'CRI' && cri0.name.includes('Costa Rica') && (cri0.adminEntity || '').includes('Cortés') &&

            cri6.o === 'CRI' && (cri6.adminEntity || '').includes('Calderón') &&

            pan0.o === 'PAN' && pan0.name.includes('Panamá') && (pan0.adminEntity || '').includes('Arosemena') &&

            pan6.o === 'PAN' && (pan6.adminEntity || '').includes('Arnulfo Arias') &&

            pcz.o === 'USA' && pcz.name.includes('Panama Canal Zone') && (pcz.adminEntity || '').includes('Strategic') &&

            blz.o === 'UK' && blz.name.includes('British Honduras') &&

            mex0.o === 'MEX' && mex0.name.includes('México') && (mex0.adminEntity || '').includes('Cárdenas') &&

            mex6.o === 'MEX' && (mexMeta.leader || '').includes('Cárdenas') &&

            cub0.o === 'CUB' && cub0.name.includes('Cuba') && (cub0.adminEntity || '').includes('Laredo Brú') &&

            cub6.o === 'CUB' && (cub6.adminEntity || '').includes('Batista') &&

            dom.o === 'DOM' && dom.name.includes('República Dominicana') && (dom.adminEntity || '').includes('Trujillo') &&

            hai.o === 'HAI' && hai.name.includes('Haïti') && (hai.adminEntity || '').includes('Sténio Vincent') &&

            pr.o === 'USA' && pr.name.includes('Puerto Rico') && (pr.adminEntity || '').includes('Leahy') &&

            jm.o === 'UK' && jm.name.includes('Jamaica') &&

            fMex.o === 'MEX' && fPr.o === 'USA' && fJm.o === 'UK'

          );

        },

      },

      {

        name: '70. Audit Geostorico Integrale degli Stati Uniti d\'America 1936-1940 (New Deal, Arsenal of Democracy, Two-Ocean Navy, Stati, Basi Navali e Territori d\'Oltremare)',

        run: () => {

          // 1. Risoluzione feature continentale e timeline sensitivity (1936 New Deal vs 1940 Arsenal of Democracy)

          const usa0 = resolveHB({ properties: { NAME: 'United States' } }, 0);

          const usa6 = resolveHB({ properties: { NAME: 'United States' } }, 6);

          const meta0 = getOwnerMeta('USA', 0);

          const meta6 = getOwnerMeta('USA', 6);



          // 2. Territori strategici e chokepoints

          const pcz = resolveFeature({ properties: { CNTR_CODE: 'US_PCZ', NAME: 'Panama Canal Zone' } }, 0);

          const pr0 = resolveHB({ properties: { NAME: 'Puerto Rico' } }, 0);

          const vi = resolveHB({ properties: { NAME: 'United States Virgin Islands' } }, 0);

          const guam = resolveHB({ properties: { NAME: 'Guam' } }, 0);

          const samoa = resolveHB({ properties: { NAME: 'American Samoa' } }, 0);

          const wake = resolveHB({ properties: { NAME: 'Wake Island' } }, 0);

          const midway = resolveHB({ properties: { NAME: 'Midway Islands' } }, 0);



          // 3. Risoluzione toponomastica e amministrativa stati chiave, naval yards e outposts

          const topWashDC = getExtendedToponym('Washington, D.C.', 'USA');

          const topWashState = getExtendedToponym('Washington', 'USA', 'US_WA');

          const topNY = getExtendedToponym('New York', 'USA');

          const topCA = getExtendedToponym('California', 'USA');

          const topTX = getExtendedToponym('Texas', 'USA');

          const topPA = getExtendedToponym('Pennsylvania', 'USA');

          const topMI = getExtendedToponym('Michigan', 'USA');

          const topVA = getExtendedToponym('Virginia', 'USA');

          const topMA = getExtendedToponym('Massachusetts', 'USA');

          const topPearl = getExtendedToponym('Pearl Harbor', 'USA');

          const topDutch = getExtendedToponym('Dutch Harbor', 'USA');

          const topGuant = getExtendedToponym('Guantanamo', 'USA');



          // 4. Risoluzione federata di precisione e dinamica temporale (Step 0 New Deal vs Step 8 Lend-Lease)

          const ca0 = resolveFeature({ id: 'US_CA', properties: { id: 'US_CA', shapeName: 'California', country: 'United States' } }, 0);

          const ca8 = resolveFeature({ id: 'US_CA', properties: { id: 'US_CA', shapeName: 'California', country: 'United States' } }, 8);

          const mt0 = resolveFeature({ id: 'US_MT', properties: { id: 'US_MT', shapeName: 'Montana', country: 'United States' } }, 0);

          const mt8 = resolveFeature({ id: 'US_MT', properties: { id: 'US_MT', shapeName: 'Montana', country: 'United States' } }, 8);

          const ak0 = resolveFeature({ id: 'US_AK', properties: { id: 'US_AK', shapeName: 'Alaska', country: 'United States' } }, 0);

          const ak8 = resolveFeature({ id: 'US_AK', properties: { id: 'US_AK', shapeName: 'Alaska', country: 'United States' } }, 8);



          return (

            usa0.o === 'USA' && usa0.name.includes('New Deal') && (meta0.leader || '').includes('Roosevelt') &&

            usa6.o === 'USA' && usa6.name.includes('Two-Ocean Navy') && (meta6.leader || '').includes('Terzo Mandato') &&

            pcz.o === 'USA' && pcz.name.includes('Panama Canal Zone') && (pcz.adminEntity || '').includes('Strategic') &&

            pr0.o === 'USA' && pr0.name.includes('Puerto Rico') && (pr0.adminEntity || '').includes('Leahy') &&

            vi.o === 'USA' && vi.name.includes('Virgin Islands') && (vi.adminEntity || '').includes('Cramer') &&

            guam.o === 'USA' && guam.name.includes('Guam') && (guam.adminEntity || '').includes('Naval Station') &&

            samoa.o === 'USA' && samoa.name.includes('American Samoa') && (samoa.adminEntity || '').includes('Tutuila') &&

            wake.o === 'USA' && wake.name.includes('Wake') &&

            midway.o === 'USA' && midway.name.includes('Midway') &&

            topWashDC.name.includes('Washington, D.C.') &&

            topWashState.name.includes('Puget Sound') &&

            topNY.name.includes('Empire State') && (topNY.note || '').includes('Brooklyn Navy Yard') &&

            topCA.name.includes('Pacific Coast') && (topCA.note || '').includes('San Diego') &&

            topTX.name.includes('Lone Star State') && (topTX.note || '').includes('petrolio') &&

            topPA.name.includes('Keystone State') && (topPA.note || '').includes('acciaierie') &&

            topMI.name.includes('Motor City') && (topMI.note || '').includes('automobilistica') &&

            topVA.name.includes('Norfolk') &&

            topMA.name.includes('Boston') &&

            topPearl.name.includes('Pearl Harbor') && (topPearl.note || '').includes('Flotta del Pacifico') &&

            topDutch.name.includes('Dutch Harbor') && (topDutch.note || '').includes('Aleutine') &&

            topGuant.name.includes('Guantanamo') && (topGuant.adminTitle || '').includes('Treaty of 1934') &&

            ca0.o === 'USA' && ca0.name.includes('California') && (ca0.note || '').includes('New Deal') &&

            ca8.o === 'USA' && ca8.name.includes('Arsenale della Democrazia') && (ca8.note || '').includes('Lend-Lease') &&

            mt0.o === 'USA' && mt0.name.includes('Montana') && (mt0.note || '').includes('Fort Peck') &&

            mt8.o === 'USA' && (mt8.note || '').includes('ALSIB') &&

            ak0.o === 'USA' && ak0.name.includes('Territory of Alaska') &&

            ak8.o === 'USA' && (ak8.note || '').includes('Lend-Lease')

          );

        },

      },

      {

        name: 'Audit Geostorico Integrale Step 7 (OTT 1940: Secondo Arbitrato di Vienna Transilvania -> HUN, Trattato di Craiova Cadrilater -> BUL, Stato Nazionale Legionario ROM -> Asse, Giorno dell\'Oxi Grecia -> Alleati, Conquista Somalia Britannica -> ITA, Avanzata su Sidi Barrani EGMT, Stazionamento Giapponese nel Tonchino VIC_IND)',

        run: () => {

          // 1. Secondo Arbitrato di Vienna (30 agosto 1940): Transilvania Settentrionale e Terra dei Siculi da ROM (step 6) a HUN (step 7)

          const cluj6 = resolveFeature({ properties: { CNTR_CODE: 'RO', NUTS_ID: 'RO113', NAME: 'Cluj' } }, 6);

          const cluj7 = resolveFeature({ properties: { CNTR_CODE: 'RO', NUTS_ID: 'RO113', NAME: 'Cluj' } }, 7);

          const bihor7 = resolveFeature({ properties: { CNTR_CODE: 'RO', NUTS_ID: 'RO111', NAME: 'Bihor' } }, 7);

          const mures7 = resolveFeature({ properties: { CNTR_CODE: 'RO', NUTS_ID: 'RO125', NAME: 'Mureș' } }, 7);

          const harghita7 = resolveFeature({ properties: { CNTR_CODE: 'RO', NUTS_ID: 'RO124', NAME: 'Harghita' } }, 7);

          const covasna7 = resolveFeature({ properties: { CNTR_CODE: 'RO', NUTS_ID: 'RO123', NAME: 'Covasna' } }, 7);



          // 2. Romania residua (Bucarest RO321, Ploiești/Prahova RO316, Sibiu RO126): Stato Nazionale Legionario (Antonescu) -> Asse a Step 7

          const buc6 = resolveFeature({ properties: { CNTR_CODE: 'RO', NUTS_ID: 'RO321', NAME: 'București' } }, 6);

          const buc7 = resolveFeature({ properties: { CNTR_CODE: 'RO', NUTS_ID: 'RO321', NAME: 'București' } }, 7);

          const sibiu7 = resolveFeature({ properties: { CNTR_CODE: 'RO', NUTS_ID: 'RO126', NAME: 'Sibiu' } }, 7);



          // 3. Trattato di Craiova (7 settembre 1940): Cadrilater (Silistra BG325, Dobrich BG332) da ROM (step 6) a BUL (step 7)

          const sil6 = resolveFeature({ properties: { CNTR_CODE: 'BG', NUTS_ID: 'BG325', NAME: 'Silistra' } }, 6);

          const sil7 = resolveFeature({ properties: { CNTR_CODE: 'BG', NUTS_ID: 'BG325', NAME: 'Silistra' } }, 7);

          const dob6 = resolveFeature({ properties: { CNTR_CODE: 'BG', NUTS_ID: 'BG332', NAME: 'Dobrich' } }, 6);

          const dob7 = resolveFeature({ properties: { CNTR_CODE: 'BG', NUTS_ID: 'BG332', NAME: 'Dobrich' } }, 7);



          // 4. Guerra Greco-Italiana ("Giorno dell'Oxi", 28 ottobre 1940): Grecia da Neutrale (step 6) ad Alleati (step 7)

          const ath6 = resolveFeature({ properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL303', NAME: 'Athina' } }, 6);

          const ath7 = resolveFeature({ properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL303', NAME: 'Athina' } }, 7);

          const ioa7 = resolveFeature({ properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL543', NAME: 'Ioannina' } }, 7);



          // 5. Conquista Italiana della Somalia Britannica (agosto 1940): da UK (step 6) a ITA / AOI (step 7)

          const somHb6 = resolveHB({ properties: { NAME: 'British Somaliland' } }, 6);

          const somHb7 = resolveHB({ properties: { NAME: 'British Somaliland' } }, 7);

          const somFt6 = resolveFeature({ properties: { CNTR_CODE: 'UK_SOMALILAND', NAME: 'British Somaliland' } }, 6);

          const somFt7 = resolveFeature({ properties: { CNTR_CODE: 'UK_SOMALILAND', NAME: 'British Somaliland' } }, 7);



          // 6. Avanzata italiana in Egitto (Sidi Barrani, settembre 1940) e Indocina Francese (Accordo di Hanoi / Tonchino, settembre 1940)

          const egmt7 = resolveFeature({ id: 'EGMT', properties: { CNTR_CODE: 'EG', NUTS_ID: 'EGMT', NAME: 'Matrouh' } }, 7);

          const ind7 = resolveHB({ properties: { NAME: 'French Indo-China' } }, 7);



          return (

            STEPS.length >= 10 &&

            STEPS[7].d === 'OTT 1940' &&

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

            STEPS.length >= 10 &&

            STEPS[8].d === 'APR 1941' &&

            STEPS[9].d === 'DIC 1941' &&

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

          const atyrau = loadedProvs.find((f: any) => f.id === 'SOV_ADM1_KAZ_138_Atyrau_Region');

          const mangystau = loadedProvs.find((f: any) => f.id === 'SOV_ADM1_KAZ_133_Mangystau_Region');

          const aktobe = loadedProvs.find((f: any) => f.id === 'SOV_ADM1_KAZ_137_Aktobe_Region');

          const karakalpakstan = loadedProvs.find((f: any) => f.id === 'SOV_ADM1_UZB_149_Republic_of_Karakalpakstan');



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

          const fi1c4 = loadedProvs.find((f: any) => f.id === 'FI1C4' || f.properties?.NUTS_ID === 'FI1C4');

          const fi1c5 = loadedProvs.find((f: any) => f.id === 'FI1C5' || f.properties?.NUTS_ID === 'FI1C5');

          const fi1d3 = loadedProvs.find((f: any) => f.id === 'FI1D3' || f.properties?.NUTS_ID === 'FI1D3');



          const vyborg = loadedProvs.find((f: any) => f.id === 'FIN_HIST_259_Vyborgsky_District');

          const lahden = loadedProvs.find((f: any) => f.id === 'FIN_HIST_283_Lahdenpohja_District');

          const sorta = loadedProvs.find((f: any) => f.id === 'FIN_HIST_289_Sortavala_District');

          const suoj = loadedProvs.find((f: any) => f.id === 'FIN_HIST_290_Suoj_rvi_District');



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

      {

        name: '78. Audit Geostorico e Toponomastico Integrale di Canada e Terranova 1936-1941 (10 Province, 2 Territori, Nunavut, Dominion of Newfoundland, Timeline BCATP, Turner Valley, Arvida, Port Radium, NEF e Ogdensburg)',

        run: () => {

          // 1. Verifica che tutte le 13 entità canadesi e Terranova siano presenti nei feature caricati

          const canIds = [

            'CA_ON', 'CA_QC', 'CA_NS', 'CA_NB', 'CA_PE',

            'CA_MB', 'CA_SK', 'CA_AB', 'CA_BC', 'CA_NL',

            'CA_NT', 'CA_YT', 'CA_NU'

          ];

          const allCanadaFeatures = [...loadedProvs, ...loadedHbs];

          for (const cid of canIds) {

            const ft = allCanadaFeatures.find((f: any) => f.id === cid || f.properties?.shapeISO === cid.replace('_', '-'));

            if (!ft) {

              console.error(`Manca feature per ${cid}`);

              return false;

            }

          }



          // 2. Verifica risoluzione e attribuzione geostorica per Terranova (CA_NL) -> Sovrano UK, Dominion of Newfoundland

          const ftNL = allCanadaFeatures.find((f: any) => f.id === 'CA_NL');

          const resNL_s0 = resolveFeature(ftNL, 0);

          const resNL_s7 = resolveFeature(ftNL, 7);

          const resNL_s8 = resolveFeature(ftNL, 8);



          if (!resNL_s0 || resNL_s0.o !== 'UK' || !resNL_s0.name.includes('Newfoundland')) return false;

          if (!resNL_s0.note?.includes('Commission of Government') || !resNL_s0.note?.includes('Walwyn')) return false;

          if (!resNL_s7?.note?.includes('Destroyers for Bases') || !resNL_s7?.note?.includes('Argentia')) return false;

          if (!resNL_s8?.note?.includes('Newfoundland Escort Force') || !resNL_s8?.note?.includes('NEF')) return false;



          // 3. Verifica risoluzione Ontario (CA_ON) -> CAN, Heartland Industriale, CMP, BCATP, Hyde Park

          const ftON = loadedProvs.find((f: any) => f.id === 'CA_ON');

          const resON_s0 = resolveFeature(ftON, 0);

          const resON_s5 = resolveFeature(ftON, 5);

          const resON_s7 = resolveFeature(ftON, 7);

          const resON_s8 = resolveFeature(ftON, 8);



          if (!resON_s0 || resON_s0.o !== 'CAN' || !resON_s0.name.includes('Ontario')) return false;

          if (!resON_s0.note?.includes('Sudbury') || !resON_s0.note?.includes('nichel')) return false;

          if (!resON_s5?.note?.includes('CMP') || !resON_s5?.note?.includes('BCATP')) return false;

          if (!resON_s7?.note?.includes('Ogdensburg') || !resON_s7?.note?.includes('Hurricane')) return false;

          if (!resON_s8?.note?.includes('Hyde Park')) return false;



          // 4. Verifica risoluzione Québec (CA_QC) -> Arvida alluminio Alcan, corvette

          const ftQC = loadedProvs.find((f: any) => f.id === 'CA_QC');

          const resQC_s5 = resolveFeature(ftQC, 5);

          if (!resQC_s5 || resQC_s5.o !== 'CAN' || !resQC_s5.note?.includes('Arvida') || !resQC_s5.note?.includes('alluminio')) return false;



          // 5. Verifica risoluzione Alberta (CA_AB) -> Turner Valley petrolio

          const ftAB = loadedProvs.find((f: any) => f.id === 'CA_AB');

          const resAB_s0 = resolveFeature(ftAB, 0);

          const resAB_s8 = resolveFeature(ftAB, 8);

          if (!resAB_s0 || resAB_s0.o !== 'CAN' || !resAB_s0.note?.includes('Turner Valley')) return false;

          if (!resAB_s8?.note?.includes('Turner Valley')) return false;



          // 6. Verifica risoluzione Northwest Territories (CA_NT) -> Port Radium uranio Tube Alloys

          const ftNT = loadedProvs.find((f: any) => f.id === 'CA_NT');

          const resNT_s0 = resolveFeature(ftNT, 0);

          const resNT_s8 = resolveFeature(ftNT, 8);

          if (!resNT_s0 || resNT_s0.o !== 'CAN' || !resNT_s0.note?.includes('Port Radium')) return false;

          if (!resNT_s8?.note?.includes('Tube Alloys') || !resNT_s8?.note?.includes('uranio')) return false;



          // 7. Verifica risoluzione Nuova Scozia (CA_NS) -> Halifax convogli HX

          const ftNS = loadedProvs.find((f: any) => f.id === 'CA_NS');

          const resNS_s5 = resolveFeature(ftNS, 5);

          if (!resNS_s5 || resNS_s5.o !== 'CAN' || !resNS_s5.note?.includes('HX-1') || !resNS_s5.note?.includes('Halifax')) return false;



          // 8. Verifica risoluzione Columbia Britannica (CA_BC) -> Trail acqua pesante e Mosquito Sitka

          const ftBC = loadedProvs.find((f: any) => f.id === 'CA_BC');

          const resBC_s7 = resolveFeature(ftBC, 7);

          if (!resBC_s7 || resBC_s7.o !== 'CAN' || !resBC_s7.note?.includes('Trail') || !resBC_s7.note?.includes('acqua pesante')) return false;



          // 9. Verifica toponimi estesi da getExtendedToponym a livello nazionale e provinciale

          const topCan_s0 = getExtendedToponym('Canada', 'CAN', 'CAN', undefined, 0);

          const topCan_s5 = getExtendedToponym('Canada', 'CAN', 'CAN', undefined, 5);

          const topCan_s8 = getExtendedToponym('Canada', 'CAN', 'CAN', undefined, 8);



          if (!topCan_s0.name.includes('Statuto di Westminster') || !topCan_s0.note?.includes('Mackenzie King')) return false;

          if (!topCan_s5.name.includes('BCATP') || !topCan_s5.note?.includes('10 settembre 1939')) return false;

          if (!topCan_s8.name.includes('Hyde Park') || !topCan_s8.note?.includes('Lend-Lease')) return false;



          return true;

        },

      },

      {

        name: '79. Audit Geotopografico e Toponomastico Integrale degli Stati Uniti Messicani 1936-1941 (32 Stati e Territori, Denominazioni Moderne e Storiche, Watertightness con USA e Centroamerica, Dinamica Temporale Cárdenas - Ávila Camacho, PEMEX e Arsenale Alleato)',

        run: () => {

          // 1. Verifica presenza di tutti i 32 stati e territori messicani nei layer caricati

          const mxIds = [

            'MX_SON', 'MX_BCN', 'MX_CHH', 'MX_COA', 'MX_TAM', 'MX_NLE',

            'MX_ROO', 'MX_CAM', 'MX_TAB', 'MX_CHP', 'MX_COL', 'MX_NAY',

            'MX_BCS', 'MX_SIN', 'MX_YUC', 'MX_VER', 'MX_JAL', 'MX_MIC',

            'MX_GRO', 'MX_OAX', 'MX_MEX', 'MX_PUE', 'MX_MOR', 'MX_QUE',

            'MX_HID', 'MX_GUA', 'MX_SLP', 'MX_ZAC', 'MX_AGU', 'MX_DUR',

            'MX_TLA', 'MX_CMX'

          ];

          const allFeatures = [...loadedProvs, ...loadedHbs];

          for (const mid of mxIds) {

            const ft = allFeatures.find((f: any) => f.id === mid || f.properties?.shapeISO === mid.replace('_', '-'));

            if (!ft) {

              console.error(`Manca feature per ${mid}`);

              return false;

            }

            // Verifica risoluzione di base: sovrano MEX, fazione Neutrale

            const res = resolveFeature(ft, 0);

            if (!res || res.o !== 'MEX' || res.fac !== 'Neutrale') {

              console.error(`Risoluzione fallita per ${mid}:`, res);

              return false;

            }

          }



          // 2. Controllo coerenza nomi storici e toponimi per stati cardine

          const ftSon = allFeatures.find((f: any) => f.id === 'MX_SON');

          const resSon0 = resolveFeature(ftSon, 0);

          if (!resSon0 || !resSon0.name.includes('Sonora') || !resSon0.name.includes('Cananea') || !resSon0.note?.includes('Román Yocupicio')) return false;



          const ftBcn = allFeatures.find((f: any) => f.id === 'MX_BCN');

          const resBcn0 = resolveFeature(ftBcn, 0);

          if (!resBcn0 || !resBcn0.name.includes('Territorio Norte de la Baja California') || !resBcn0.note?.includes('Mexicali')) return false;



          const ftBcs = allFeatures.find((f: any) => f.id === 'MX_BCS');

          const resBcs0 = resolveFeature(ftBcs, 0);

          if (!resBcs0 || !resBcs0.name.includes('Territorio Sur de la Baja California') || !resBcs0.note?.includes('La Paz')) return false;



          const ftRoo = allFeatures.find((f: any) => f.id === 'MX_ROO');

          const resRoo0 = resolveFeature(ftRoo, 0);

          if (!resRoo0 || !resRoo0.name.includes('Territorio Federal de Quintana Roo') || !resRoo0.note?.includes('Chetumal')) return false;



          const ftCmx = allFeatures.find((f: any) => f.id === 'MX_CMX');

          const resCmx0 = resolveFeature(ftCmx, 0);

          if (!resCmx0 || !resCmx0.name.includes('Distrito Federal') || !resCmx0.note?.includes('Palacio Nacional') || !resCmx0.note?.includes('Trotsky')) return false;



          // 3. Verifica timeline-sensitive step 2 (18 Marzo 1938: Espropriazione Petrolifera & Fondazione PEMEX)

          const ftTam = allFeatures.find((f: any) => f.id === 'MX_TAM');

          const resTam2 = resolveFeature(ftTam, 2);

          if (!resTam2 || !resTam2.note?.includes('18 Marzo 1938') || !resTam2.note?.includes('Tampico') || !resTam2.note?.includes('PEMEX')) return false;



          const ftSlp = allFeatures.find((f: any) => f.id === 'MX_SLP');

          const resSlp2 = resolveFeature(ftSlp, 2);

          if (!resSlp2 || !resSlp2.note?.includes('Cedillo')) return false;



          // 4. Verifica timeline-sensitive step 5 (Settembre 1939 - Giugno 1940: Neutralità e Assassinio di Trotsky)

          const resCmx5 = resolveFeature(ftCmx, 5);

          if (!resCmx5 || !resCmx5.note?.includes('Trotsky') || !resCmx5.note?.includes('Mercader')) return false;



          // 5. Verifica timeline-sensitive step 7 (Ottobre 1940: Transizione Presidenziale Ávila Camacho & Reggente Rojo Gómez)

          const resCmx7 = resolveFeature(ftCmx, 7);

          if (!resCmx7 || !resCmx7.note?.includes('Javier Rojo Gómez') || !resCmx7.note?.includes('Ávila Camacho')) return false;



          // 6. Verifica timeline-sensitive step 8 (Aprile 1941: Sequestro navi dell'Asse nei porti e Arsenale della Democrazia)

          const resTam8 = resolveFeature(ftTam, 8);

          if (!resTam8 || !resTam8.note?.includes('Tampico') || !resTam8.note?.includes('sequestro') || !resTam8.note?.includes('petroliere')) return false;



          const resSon8 = resolveFeature(ftSon, 8);

          if (!resSon8 || !resSon8.note?.includes('Arsenale della Democrazia')) return false;



          // 7. Verifica toponimi estesi da getExtendedToponym a livello nazionale per il Messico (Step 0, 2, 5, 8)

          const topMex0 = getExtendedToponym('Mexico', 'MEX', 'MEX', undefined, 0);

          const topMex2 = getExtendedToponym('Mexico', 'MEX', 'MEX', undefined, 2);

          const topMex5 = getExtendedToponym('Mexico', 'MEX', 'MEX', undefined, 5);

          const topMex8 = getExtendedToponym('Mexico', 'MEX', 'MEX', undefined, 8);



          if (!topMex0.name.includes('Lázaro Cárdenas') || !topMex0.note?.includes('Calles') || !topMex0.note?.includes('ejidos')) return false;

          if (!topMex2.name.includes('PEMEX') || !topMex2.note?.includes('18 marzo 1938')) return false;

          if (!topMex5.name.includes('Neutralità Armata') || !topMex5.note?.includes('Dichiarazione di Panama')) return false;

          if (!topMex8.name.includes('Ávila Camacho') || !topMex8.note?.includes('Arsenale della Democrazia') || !topMex8.note?.includes('sequestro')) return false;



          return true;

        },

      },

      {

        name: '80. Audit Geotopografico, Storico ed Evolutivo Integrale dell\'Africa Occidentale Francese (AOF: Sénégal, Mauritanie, Soudan Français, Guinée, Côte d\'Ivoire, Dahomey, Burkina Faso / Haute-Volta e Niger, Watertightness, Denominazioni Storico-Moderne e Timeline 1936-1941)',

        run: () => {

          // 1. Verifica presenza di tutte le 8 entità AOF nei layer caricati

          const aofIds = [

            'AOF_CI', 'AOF_GN', 'AOF_SN', 'AOF_MR', 'AOF_ML', 'AOF_BJ', 'AOF_BF', 'AOF_NER'

          ];

          const allFeatures = [...loadedProvs, ...loadedHbs];

          for (const aid of aofIds) {

            const ft = allFeatures.find((f: any) => f.id === aid);

            if (!ft) {

              console.error(`Manca feature per ${aid}`);

              return false;

            }

            // Verifica risoluzione di base: step 0 -> F_AOF, fazione Alleati

            const res0 = resolveFeature(ft, 0);

            if (!res0 || res0.o !== 'F_AOF' || res0.fac !== 'Alleati') {

              console.error(`Risoluzione Step 0 fallita per ${aid}:`, res0);

              return false;

            }

            // Verifica evoluzione Vichy 1940: step 6 -> VIC_AOF, fazione Fantoccio

            const res6 = resolveFeature(ft, 6);

            if (!res6 || res6.o !== 'VIC_AOF' || res6.fac !== 'Fantoccio') {

              console.error(`Risoluzione Step 6 fallita per ${aid}:`, res6);

              return false;

            }

          }



          // 2. Controllo coerenza nomi storici e note delle 8 entità AOF

          const ftSn = allFeatures.find((f: any) => f.id === 'AOF_SN');

          const resSn0 = resolveFeature(ftSn, 0);

          if (!resSn0 || !resSn0.name.includes('Sénégal') || !resSn0.note?.includes('Jules Marcel de Coppet') || !resSn0.note?.includes('Quatre Communes') || !resSn0.adminEntity?.includes('Sénégal')) return false;



          const ftCi = allFeatures.find((f: any) => f.id === 'AOF_CI');

          const resCi0 = resolveFeature(ftCi, 0);

          if (!resCi0 || !resCi0.name.includes("Côte d'Ivoire") || !resCi0.note?.includes('Abidjan') || !resCi0.note?.includes("Alta Costa d'Avorio") || !resCi0.note?.includes('Ouagadougou')) return false;



          const ftGn = allFeatures.find((f: any) => f.id === 'AOF_GN');

          const resGn0 = resolveFeature(ftGn, 0);

          if (!resGn0 || !resGn0.name.includes('Guinée Française') || !resGn0.note?.includes('Conakry') || !resGn0.note?.includes('Fouta Djallon')) return false;



          const ftMr = allFeatures.find((f: any) => f.id === 'AOF_MR');

          const resMr0 = resolveFeature(ftMr, 0);

          if (!resMr0 || !resMr0.name.includes('Mauritanie') || !resMr0.note?.includes('Saint-Louis') || !resMr0.note?.includes('Port-Étienne')) return false;



          const ftMl = allFeatures.find((f: any) => f.id === 'AOF_ML');

          const resMl0 = resolveFeature(ftMl, 0);

          if (!resMl0 || !resMl0.name.includes('Soudan Français') || !resMl0.note?.includes('Bamako') || !resMl0.note?.includes('Office du Niger') || !resMl0.note?.includes('Sansanding')) return false;



          const ftBj = allFeatures.find((f: any) => f.id === 'AOF_BJ');

          const resBj0 = resolveFeature(ftBj, 0);

          if (!resBj0 || !resBj0.name.includes('Dahomey') || !resBj0.note?.includes('Porto-Novo') || !resBj0.note?.includes('Cotonou') || !resBj0.note?.includes('olio di palma')) return false;



          const ftBf = allFeatures.find((f: any) => f.id === 'AOF_BF');

          const resBf0 = resolveFeature(ftBf, 0);

          if (!resBf0 || !resBf0.name.includes('Haute-Volta') || !resBf0.note?.includes('Mogho Naba Kom II') || !resBf0.note?.includes('Bobo-Dioulasso') || !resBf0.adminEntity?.includes("Haute-Côte d'Ivoire")) return false;



          const ftNer = allFeatures.find((f: any) => f.id === 'AOF_NER');

          const resNer0 = resolveFeature(ftNer, 0);

          if (!resNer0 || !resNer0.name.includes('Niger') || !resNer0.note?.includes('Niamey') || !resNer0.note?.includes('Bilma') || !resNer0.note?.includes('Azalaï')) return false;



          // 3. Verifica timeline-sensitive step 5 (Settembre 1939 - Maggio 1940: Mobilitazione bellica, oro della Banca di Francia a Dakar)

          const resSn5 = resolveFeature(ftSn, 5);

          if (!resSn5 || !resSn5.note?.includes('Léon Cayla') || !resSn5.note?.includes('Richelieu') || !resSn5.note?.includes('Banca di Francia') || !resSn5.note?.includes('Polonia')) return false;



          const resMl5 = resolveFeature(ftMl, 5);

          if (!resMl5 || !resMl5.note?.toLowerCase().includes('soudanais') || !resMl5.note?.includes('cereali')) return false;



          const resBf5 = resolveFeature(ftBf, 5);

          if (!resBf5 || !resBf5.note?.includes('15.000 fanti mossi') || !resBf5.note?.includes('Somme') || !resBf5.note?.includes('miglio')) return false;



          // 4. Verifica timeline-sensitive step 6 (Giugno - Agosto 1940: Armistizio, Boisson, allineamento Vichy e Operazione Catapult)

          const resSn6 = resolveFeature(ftSn, 6);

          if (!resSn6 || resSn6.o !== 'VIC_AOF' || !resSn6.note?.includes('Pierre Boisson') || !resSn6.note?.includes('Pétain') || !resSn6.note?.includes('Catapult') || !resSn6.adminEntity?.includes('Pierre Boisson')) return false;



          const resBf6 = resolveFeature(ftBf, 6);

          if (!resBf6 || resBf6.o !== 'VIC_AOF' || !resBf6.note?.includes('Pierre Boisson') || !resBf6.note?.includes('lavoro forzato') || !resBf6.note?.includes('indigénat')) return false;



          // 5. Verifica timeline-sensitive step 7 (23-25 Settembre 1940: Battaglia di Dakar / Operazione Menace)

          const resSn7 = resolveFeature(ftSn, 7);

          if (!resSn7 || !resSn7.note?.includes('Battaglia di Dakar') || !resSn7.note?.includes('Operazione Menace') || !resSn7.note?.includes('Resolution') || !resSn7.note?.includes('Bévéziers')) return false;



          const resGn7 = resolveFeature(ftGn, 7);

          if (!resGn7 || !resGn7.note?.includes('Freetown') || !resGn7.note?.includes('britannici')) return false;



          const resBf7 = resolveFeature(ftBf, 7);

          if (!resBf7 || !resBf7.note?.includes('Mogho Naba Kom II') || !resBf7.note?.includes('Gold Coast') || !resBf7.note?.includes('boicottaggio passivo')) return false;



          // 6. Verifica timeline-sensitive step 8 (Aprile 1941: Blocco Navale Royal Navy e Allarme Sahariano Kufra / Leclerc)

          const resSn8 = resolveFeature(ftSn, 8);

          if (!resSn8 || !resSn8.note?.includes('blocco aeronavale') || !resSn8.note?.includes('Gambia')) return false;



          const resNer8 = resolveFeature(ftNer, 8);

          if (!resNer8 || !resNer8.note?.includes('Leclerc') || !resNer8.note?.includes('Kufra') || !resNer8.note?.includes('Agadez')) return false;



          const resCi8 = resolveFeature(ftCi, 8);

          if (!resCi8 || !resCi8.note?.includes('blocco navale') || !resCi8.note?.includes('cacao')) return false;



          const resBf8 = resolveFeature(ftBf, 8);

          if (!resBf8 || !resBf8.note?.includes('Gold Coast') || !resBf8.note?.includes('karité') || !resBf8.note?.includes('boscaglia')) return false;



          // 7. Verifica toponimi estesi da getExtendedToponym a livello federale per l'Africa Occidentale Francese (Step 0, 2, 5, 6, 7, 8)

          const topAOF0 = getExtendedToponym('French West Africa', 'F_AOF', 'F_AOF', undefined, 0);

          const topAOF2 = getExtendedToponym('French West Africa', 'F_AOF', 'F_AOF', undefined, 2);

          const topAOF5 = getExtendedToponym('French West Africa', 'F_AOF', 'F_AOF', undefined, 5);

          const topAOF6 = getExtendedToponym('French West Africa', 'VIC_AOF', 'VIC_AOF', undefined, 6);

          const topAOF7 = getExtendedToponym('French West Africa', 'VIC_AOF', 'VIC_AOF', undefined, 7);

          const topAOF8 = getExtendedToponym('French West Africa', 'VIC_AOF', 'VIC_AOF', undefined, 8);



          if (!topAOF0.name.includes('Jules Marcel de Coppet') || !topAOF0.note?.includes('Quatre Communes') || !topAOF0.adminTitle?.includes('Front Populaire')) return false;

          if (!topAOF2.name.includes('Riarmo') || !topAOF2.note?.includes('Cap Manuel') || !topAOF2.note?.includes('Gorée')) return false;

          if (!topAOF5.name.includes('Mobilitazione') || !topAOF5.note?.includes('Léon Cayla') || !topAOF5.note?.includes('Banca di Francia')) return false;

          if (!topAOF6.name.includes('Vichy') || !topAOF6.note?.includes('Pierre Boisson') || !topAOF6.note?.includes('Catapult')) return false;

          if (!topAOF7.name.includes('Dakar') || !topAOF7.note?.includes('Resolution') || !topAOF7.note?.includes('Menace')) return false;

          if (!topAOF8.name.includes('Blocco Navale') || !topAOF8.note?.includes('Freetown') || !topAOF8.note?.includes('Kufra')) return false;



          return true;

        },

      },

            {

        name: "81. Audit Geotopografico, Storico ed Evolutivo Integrale dell'Africa Equatoriale Francese e Mandato del Camerun (AEF: Gabon, Oubangui-Chari / Centrafrica, Moyen-Congo, Ciad e Cameroun Français, Watertightness, Denominazioni Storico-Moderne e Timeline 1936-1941)",

        run: () => {

          // 1. Verifica presenza di tutte le 5 entità AEF e Mandato del Camerun nei layer caricati

          const aefIds = ['AEF_GA', 'AEF_CF', 'AEF_TD', 'AEF_CG', 'AEF_CM'];

          const allFeatures = [...loadedProvs, ...loadedHbs];

          for (const aid of aefIds) {

            const ft = allFeatures.find((f: any) => f.id === aid || f.properties?.id === aid);

            if (!ft) {

              console.error(`Manca feature per ${aid}`);

              return false;

            }

            if (!ft.geometry || !ft.geometry.coordinates || ft.geometry.coordinates.length === 0) {

              console.error(`Geometria vuota o non valida per ${aid}`);

              return false;

            }

            // Verifica risoluzione di base: step 0 -> F_AEF

            const res0 = resolveFeature(ft, 0);

            if (!res0 || res0.o !== 'F_AEF') {

              console.error(`Risoluzione Step 0 fallita per ${aid}:`, res0);

              return false;

            }

          }



          // 2. Controllo specifico geotopografico delle entità AEF e Camerun

          const ftGa = allFeatures.find((f: any) => f.id === 'AEF_GA' || f.properties?.id === 'AEF_GA');

          const ftCf = allFeatures.find((f: any) => f.id === 'AEF_CF' || f.properties?.id === 'AEF_CF');

          const ftTd = allFeatures.find((f: any) => f.id === 'AEF_TD' || f.properties?.id === 'AEF_TD');

          const ftCg = allFeatures.find((f: any) => f.id === 'AEF_CG' || f.properties?.id === 'AEF_CG');

          const ftCm = allFeatures.find((f: any) => f.id === 'AEF_CM' || f.properties?.id === 'AEF_CM' || f.properties?.NAME === 'French Cameroons');



          if (!ftGa || !ftCf || !ftTd || !ftCg || !ftCm) return false;



          // Gabon: area ~ 20.7 deg²

          const gaArea = ftGa.properties?.area_deg2;

          if (typeof gaArea === 'number' && (gaArea < 19 || gaArea > 22)) return false;



          // Centrafrica / Oubangui-Chari: area ~ 51.5 deg²

          const cfArea = ftCf.properties?.area_deg2;

          if (typeof cfArea === 'number' && (cfArea < 50 || cfArea > 53)) return false;



          // Ciad: area ~ 106.6 deg²

          const tdArea = ftTd.properties?.area_deg2;

          if (typeof tdArea === 'number' && (tdArea < 104 || tdArea > 108)) return false;



          // 3. Controllo toponomastica storica e denominazioni moderne (Step 0)

          const resTd0 = resolveFeature(ftTd, 0);

          if (!resTd0 || !resTd0.name.includes('Tchad') || !resTd0.note?.includes('Fort-Lamy') || !resTd0.note?.includes('BET') || !resTd0.note?.includes('cotone')) return false;



          const resCf0 = resolveFeature(ftCf, 0);

          if (!resCf0 || !resCf0.name.includes('Oubangui-Chari') || !resCf0.note?.includes('Bangui') || !resCf0.note?.includes('Ubangi') || !resCf0.note?.includes('diamanti')) return false;



          const resCg0 = resolveFeature(ftCg, 0);

          if (!resCg0 || !resCg0.name.includes('Moyen-Congo') || !resCg0.note?.includes('Brazzaville') || !resCg0.note?.includes('Congo-Océan') || !resCg0.note?.includes('Pointe-Noire')) return false;



          const resGa0 = resolveFeature(ftGa, 0);

          if (!resGa0 || !resGa0.name.includes('Gabon') || !resGa0.note?.includes('Libreville') || !resGa0.note?.includes('okoumé') || !resGa0.note?.includes('Schweitzer')) return false;



          const resCm0 = resolveFeature(ftCm, 0);

          if (!resCm0 || !resCm0.name.includes('Cameroun') || !resCm0.adminEntity?.includes('Boisson') || !resCm0.note?.includes('Jamot') || !resCm0.note?.includes('Ayos') || !resCm0.note?.includes('Mungo') || !resCm0.note?.includes('cacao')) return false;



          // 4. Verifica timeline-sensitive step 2 (Riarmo post-Monaco 1938-1939: Félix Éboué governatore del Ciad, frontiera Aouzou, Brunot al Camerun e Koloniale Frage)

          const resTd2 = resolveFeature(ftTd, 2);

          if (!resTd2 || !resTd2.note?.includes('Félix Éboué') || !resTd2.note?.includes('Tibesti') || !resTd2.note?.includes('Aouzou')) return false;



          const resCg2 = resolveFeature(ftCg, 2);

          if (!resCg2 || !resCg2.note?.includes('CFCO') || !resCg2.note?.includes('Pointe-Noire')) return false;



          const resCm2 = resolveFeature(ftCm, 2);

          if (!resCm2 || !resCm2.adminEntity?.includes('Brunot') || !resCm2.note?.includes('Koloniale Frage') || !resCm2.note?.includes('Atangana') || !resCm2.note?.includes('BTC')) return false;



          // 5. Verifica timeline-sensitive step 5 (Mobilitazione bellica generale 1939-1940: RTST, BTOC, Pierre Husson, RTC ed internamento)

          const resTd5 = resolveFeature(ftTd, 5);

          if (!resTd5 || !resTd5.note?.includes('Félix Éboué') || !resTd5.note?.includes('RTST') || !resTd5.note?.includes('Marchand')) return false;



          const resCf5 = resolveFeature(ftCf, 5);

          if (!resCf5 || !resCf5.note?.includes('BTOC') || !resCf5.note?.includes('gomma')) return false;



          const resCg5 = resolveFeature(ftCg, 5);

          if (!resCg5 || !resCg5.note?.includes('Pierre Husson') || !resCg5.note?.includes('Moyen-Congo')) return false;



          const resCm5 = resolveFeature(ftCm, 5);

          if (!resCm5 || !resCm5.note?.includes('Brunot') || !resCm5.note?.includes('RTC') || !resCm5.note?.includes('tedeschi')) return false;



          // 6. Verifica timeline-sensitive step 6 (26-28 Agosto 1940: Ralliement del Ciad, Moyen-Congo e Camerun di Leclerc vs Gabon a Vichy)

          const resTd6 = resolveFeature(ftTd, 6);

          if (!resTd6 || resTd6.o !== 'FFL_AEF' || !resTd6.note?.includes('26 Agosto 1940') || !resTd6.note?.includes('Félix Éboué') || !resTd6.adminEntity?.includes('Marchand')) return false;



          const resCf6 = resolveFeature(ftCf, 6);

          if (!resCf6 || resCf6.o !== 'FFL_AEF' || !resCf6.note?.includes('Saint-Mart') || !resCf6.note?.includes('Robert de Roux')) return false;



          const resCg6 = resolveFeature(ftCg, 6);

          if (!resCg6 || resCg6.o !== 'FFL_AEF' || !resCg6.note?.includes('Edgard de Larminat') || !resCg6.adminEntity?.includes('Larminat')) return false;



          const resCm6 = resolveFeature(ftCm, 6);

          if (!resCm6 || resCm6.o !== 'FFL_AEF' || !resCm6.adminEntity?.includes('Leclerc') || !resCm6.note?.includes('26-27 Agosto 1940') || !resCm6.note?.includes('Douala') || !resCm6.note?.includes('Louis Dio')) return false;



          // Gabon: verifica enclave di Vichy sotto il governatore Georges Masson

          const resGaVichy = resolveHB({ properties: { NAME: 'Gabon (France)' } }, 6);

          if (!resGaVichy || resGaVichy.o !== 'VIC_AEF' || !resGaVichy.note?.includes('Georges Masson') || resGaVichy.fac !== 'Fantoccio') return false;



          // 7. Verifica timeline-sensitive step 7 (27 Ottobre 1940: Manifeste de Brazzaville, Capitale de la France Libre, Campagna del Gabon e Visita di De Gaulle)

          const resCg7 = resolveFeature(ftCg, 7);

          if (!resCg7 || resCg7.o !== 'FFL_AEF' || !resCg7.name.includes('Capitale de la France Libre') || !resCg7.note?.includes('Manifeste de Brazzaville') || !resCg7.note?.includes('Radio Brazzaville') || !resCg7.adminEntity?.includes('Félix Éboué')) return false;



          const resGa7 = resolveFeature(ftGa, 7);

          if (!resGa7 || resGa7.o !== 'FFL_AEF' || !resGa7.name.includes('Gabon (France Libre') || !resGa7.note?.includes('Campagna del Gabon') || !resGa7.note?.includes('Bougainville') || !resGa7.adminEntity?.includes('Forces Françaises Libres')) return false;



          const resCm7 = resolveFeature(ftCm, 7);

          if (!resCm7 || resCm7.o !== 'FFL_AEF' || !resCm7.adminEntity?.includes('Leclerc') || !resCm7.note?.includes('Campagna del Gabon') || !resCm7.note?.includes('De Gaulle') || !resCm7.note?.includes('Rennes')) return false;



          // 8. Verifica timeline-sensitive step 8 (1º Marzo 1941: Serment de Koufra di Leclerc, BM 1, BM 2, Colonne di Louis Dio e Fusiliers Marins)

          const resTd8 = resolveFeature(ftTd, 8);

          if (!resTd8 || resTd8.o !== 'FFL_AEF' || !resTd8.name.includes('Giuramento di Kufra') || !resTd8.note?.includes('Kufra') || !resTd8.note?.includes('Strasbourg') || !resTd8.adminEntity?.includes('Leclerc')) return false;



          const resCf8 = resolveFeature(ftCf, 8);

          if (!resCf8 || resCf8.o !== 'FFL_AEF' || !resCf8.name.includes('BM 2') || !resCf8.note?.includes('Bir Hakeim')) return false;



          const resCm8 = resolveFeature(ftCm, 8);

          if (!resCm8 || resCm8.o !== 'FFL_AEF' || !resCm8.adminEntity?.includes('Pierre Cournarie') || !resCm8.name.includes('Louis Dio') || !resCm8.note?.includes('BM 1') || !resCm8.note?.includes('Kufra')) return false;



          // 9. Verifica toponimi estesi da getExtendedToponym a livello federale per l'Africa Equatoriale Francese (Step 0, 2, 5, 6, 7, 8)

          const topAEF0 = getExtendedToponym('French Equatorial Africa', 'F_AEF', undefined, undefined, 0);

          const topAEF2 = getExtendedToponym('French Equatorial Africa', 'F_AEF', undefined, undefined, 2);

          const topAEF5 = getExtendedToponym('French Equatorial Africa', 'F_AEF', undefined, undefined, 5);

          const topAEF6 = getExtendedToponym('French Equatorial Africa', 'FFL_AEF', undefined, undefined, 6);

          const topAEF7 = getExtendedToponym('French Equatorial Africa', 'FFL_AEF', undefined, undefined, 7);

          const topAEF8 = getExtendedToponym('French Equatorial Africa', 'FFL_AEF', undefined, undefined, 8);



          if (!topAEF0.name.includes('Reste de Roca') || !topAEF0.note?.includes('Brazzaville') || !topAEF0.note?.includes('Congo-Océan')) return false;

          if (!topAEF2.name.includes('Riarmo') || !topAEF2.note?.includes('Félix Éboué') || !topAEF2.note?.includes('Aouzou')) return false;

          if (!topAEF5.name.includes('Mobilitazione') || !topAEF5.note?.includes('Pierre Husson') || !topAEF5.note?.includes('Tirailleurs')) return false;

          if (!topAEF6.name.includes('Ralliement') || !topAEF6.adminTitle?.includes('Félix Éboué') || !topAEF6.note?.includes('26-28 Agosto 1940')) return false;

          if (!topAEF7.name.includes('Capitale de la France Libre') || !topAEF7.note?.includes('Manifeste de Brazzaville') || !topAEF7.note?.includes('Radio Brazzaville')) return false;

          if (!topAEF8.name.includes('Koufra') || !topAEF8.note?.includes('Kufra') || !topAEF8.note?.includes('Strasburgo')) return false;



          return true;

        },

      },

      {

        name: "82. Audit Geotopografico e Storico Integrale Namibia / South West Africa & Walvis Bay (Timeline 1936-1941, Watertightness, Zero Overlap, Mandato Società delle Nazioni, Jan Smuts, Conradie e Walvis Bay Exclave)",

        run: () => {

          const allFeatures = [...loadedProvs, ...loadedHbs];

          const ftSwa = allFeatures.find((f: any) => f.id === 'SAF_SWA' || f.properties?.id === 'SAF_SWA' || f.properties?.NAME === 'South West Africa');

          const ftSaf = allFeatures.find((f: any) => f.id === 'SAF' || f.properties?.id === 'SAF' || f.properties?.NAME === 'Union of South Africa');

          const ftWb = allFeatures.find((f: any) => f.id === 'WALVIS_BAY' || f.properties?.id === 'WALVIS_BAY' || f.properties?.NAME === 'Walvis Bay' || f.properties?.NAME === 'Walbis Bay');



          if (!ftSwa || !ftSaf || !ftWb) {

            console.error('Feature mancanti per Namibia, Sudafrica o Walvis Bay:', { ftSwa: !!ftSwa, ftSaf: !!ftSaf, ftWb: !!ftWb });

            return false;

          }



          // 1. Controllo aree e geometrie

          const swaArea = ftSwa.properties?.area_deg2;

          if (typeof swaArea === 'number' && (swaArea < 69 || swaArea > 72)) return false;



          const safArea = ftSaf.properties?.area_deg2;

          if (typeof safArea === 'number' && (safArea < 111 || safArea > 115)) return false;



          const wbArea = ftWb.properties?.area_deg2;

          if (typeof wbArea === 'number' && (wbArea < 0.4 || wbArea > 0.6)) return false;



          // 2. Controllo timeline-sensitive South West Africa

          const resSwa0 = resolveHB(ftSwa, 0);

          if (!resSwa0 || resSwa0.o !== 'SAF' || resSwa0.fac !== 'Neutrale' || !resSwa0.name.includes('South West Africa') || !resSwa0.note?.includes('Deutscher Bund') || !resSwa0.adminEntity?.includes('Conradie')) return false;



          const resSwa3 = resolveHB(ftSwa, 3);

          if (!resSwa3 || resSwa3.o !== 'SAF' || !resSwa3.note?.includes('Jan Smuts') || !resSwa3.note?.includes('South African Police')) return false;



          const resSwa6 = resolveHB(ftSwa, 6);

          if (!resSwa6 || resSwa6.o !== 'SAF' || resSwa6.fac !== 'Alleati' || !resSwa6.note?.includes('11 giugno 1940') || !resSwa6.note?.includes('1st South African Infantry Division')) return false;



          const resSwa8 = resolveHB(ftSwa, 8);

          if (!resSwa8 || resSwa8.o !== 'SAF' || resSwa8.fac !== 'Alleati' || !resSwa8.note?.includes('Addis Abeba')) return false;



          // 3. Controllo timeline-sensitive Walvis Bay Exclave

          const resWb0 = resolveHB(ftWb, 0);

          if (!resWb0 || resWb0.o !== 'SAF' || resWb0.fac !== 'Neutrale' || !resWb0.name.includes('Walvis Bay') || !resWb0.note?.includes('1878') || !resWb0.adminEntity?.includes('Cape Province')) return false;



          const resWb6 = resolveHB(ftWb, 6);

          if (!resWb6 || resWb6.o !== 'SAF' || resWb6.fac !== 'Alleati' || !resWb6.note?.includes('Cape Route') || !resWb6.adminEntity?.includes('Seaward Defence Force')) return false;



          const resWb8 = resolveHB(ftWb, 8);

          if (!resWb8 || resWb8.o !== 'SAF' || resWb8.fac !== 'Alleati' || !resWb8.name.includes('Fortress')) return false;



          return true;

        },

      },

      {

        name: "83. Audit Geotopografico e Storico Integrale Sud Sudan & Sudan Anglo-Egiziano (Timeline 1936-1941, Watertightness, Zero Overlap, Conservazione Area, Southern Policy, Closed Districts Juba e Campagna d'Africa Orientale Platt)",

        run: () => {

          const allFeatures = [...loadedProvs, ...loadedHbs];

          const ftSud = allFeatures.find((f: any) => f.id === 'SUD' || f.properties?.id === 'SUD' || (f.properties?.NAME === 'Sudan' && f.properties?.shapeISO === 'SD'));

          const ftSsd = allFeatures.find((f: any) => f.id === 'SSD' || f.properties?.id === 'SSD' || f.properties?.NAME === 'South Sudan' || f.properties?.shapeISO === 'SS');



          if (!ftSud || !ftSsd) {

            console.error('Feature mancanti per Sudan o Sud Sudan:', { ftSud: !!ftSud, ftSsd: !!ftSsd });

            return false;

          }



          // 1. Controllo aree e geometrie

          const sudArea = ftSud.properties?.area_deg2;

          if (typeof sudArea === 'number' && (sudArea < 156 || sudArea > 160)) return false;



          const ssdArea = ftSsd.properties?.area_deg2;

          if (typeof ssdArea === 'number' && (ssdArea < 51 || ssdArea > 54)) return false;



          // 2. Controllo timeline-sensitive Sudan Settentrionale (Khartoum)

          const resSud0 = resolveHB(ftSud, 0);

          if (!resSud0 || resSud0.o !== 'UK' || resSud0.fac !== 'Neutrale' || !resSud0.name.includes('Sudan') || !resSud0.note?.includes('Trattato Anglo-Egiziano del 1936') || !resSud0.note?.includes('Sir George Stewart Symes')) return false;



          const resSud6 = resolveHB(ftSud, 6);

          if (!resSud6 || resSud6.o !== 'UK' || resSud6.fac !== 'Alleati' || !resSud6.note?.includes('Kassala') || !resSud6.note?.includes('William Platt')) return false;



          const resSud8 = resolveHB(ftSud, 8);

          if (!resSud8 || resSud8.o !== 'UK' || resSud8.fac !== 'Alleati' || !resSud8.name.includes('Victory in East Africa') || !resSud8.note?.includes('Keren') || !resSud8.note?.includes('Asmara')) return false;



          // 3. Controllo timeline-sensitive Sud Sudan (Southern Provinces / Juba)

          const resSsd0 = resolveHB(ftSsd, 0);

          if (!resSsd0 || resSsd0.o !== 'UK' || resSsd0.fac !== 'Neutrale' || !resSsd0.name.includes('Southern Provinces') || !resSsd0.name.includes('Juba') || !resSsd0.note?.includes('Closed Districts Ordinances') || !resSsd0.note?.includes('Southern Policy')) return false;



          const resSsd6 = resolveHB(ftSsd, 6);

          if (!resSsd6 || resSsd6.o !== 'UK' || resSsd6.fac !== 'Alleati' || !resSsd6.note?.includes('Kurmuk') || !resSsd6.note?.includes('Equatorial Corps') || !resSsd6.note?.includes('Torit')) return false;



          const resSsd8 = resolveHB(ftSsd, 8);

          if (!resSsd8 || resSsd8.o !== 'UK' || resSsd8.fac !== 'Alleati' || !resSsd8.note?.includes('Addis Abeba') || !resSsd8.note?.includes('Arbegnoch') || !resSsd8.name.includes('Allied Nile Front')) return false;



          return true;

        },

      },

      {

        name: "84. Audit Geotopografico, Storico ed Evolutivo Integrale del Regno dell'Afghanistan (34 Province, Watertightness, Denominazioni Storico-Moderne, Re Zahir Shah, Neutralità 1936-1941, Kunduz Spinzar, Wakhan e Transito Subhas Chandra Bose)",

        run: () => {

          if (!loadedHbs || loadedHbs.length === 0) return false;

          const afProvs = loadedHbs.filter(

            (f: any) => f.properties?.country === 'Afghanistan' || (f.id && String(f.id).startsWith('AF_'))

          );

          if (afProvs.length !== 34) return false;



          // 1. Somma area geotopografica e conservazione

          let sumArea = 0;

          for (const p of afProvs) {

            const a = p.properties?.area_deg2;

            if (typeof a === 'number') sumArea += a;

          }

          if (sumArea < 63.5 || sumArea > 63.8) return false;



          // 2. Controllo province e toponomastica storica chiave

          const pKabul = afProvs.find((f: any) => f.id === 'AF_KAB' || f.properties?.NAME === 'Kabul');

          const pHirat = afProvs.find((f: any) => f.id === 'AF_HER' || f.properties?.NAME === 'Hirat');

          const pBadakh = afProvs.find((f: any) => f.id === 'AF_BDS' || f.properties?.NAME === 'Badakhshan');

          const pKand = afProvs.find((f: any) => f.id === 'AF_KAN' || f.properties?.NAME === 'Kandahar');

          const pKunduz = afProvs.find((f: any) => f.id === 'AF_KDZ' || f.properties?.NAME === 'Kunduz');

          const pNangarhar = afProvs.find((f: any) => f.id === 'AF_NAN' || f.properties?.NAME === 'Nangarhar');

          const pKhost = afProvs.find((f: any) => f.id === 'AF_KHO' || f.properties?.NAME === 'Khost');

          const pBamyan = afProvs.find((f: any) => f.id === 'AF_BAM' || f.properties?.NAME === 'Bamyan');



          if (!pKabul || !pHirat || !pBadakh || !pKand || !pKunduz || !pNangarhar || !pKhost || !pBamyan) return false;



          // 3. Risoluzione sovrana e timeline step 0 (1936 - Status Quo, Saadabad & Dinastia Musahiban)

          const rKab0 = resolveHB(pKabul, 0);

          if (!rKab0 || rKab0.o !== 'AFG' || rKab0.fac !== 'Neutrale' || !rKab0.name.includes('Vilayat-e Kabul') || !rKab0.note?.includes('Zahir Shah') || !rKab0.note?.includes('Saadabad')) return false;



          const rKdz0 = resolveHB(pKunduz, 0);

          if (!rKdz0 || !rKdz0.name.includes('Qataghan') || !rKdz0.note?.includes('Spinzar') || !rKdz0.note?.includes('Sher Khan Nasher')) return false;



          const rBds0 = resolveHB(pBadakh, 0);

          if (!rBds0 || !rBds0.name.includes('Wakhan') || !rBds0.note?.includes('Sar-i Sang') || !rBds0.note?.includes('Great Game')) return false;



          const rNan0 = resolveHB(pNangarhar, 0);

          if (!rNan0 || !rNan0.name.includes('Mashriqi') || !rNan0.name.includes('Khyber') || !rNan0.note?.includes('Seraj-ul-Emarat')) return false;



          const rKho0 = resolveHB(pKhost, 0);

          if (!rKho0 || !rKho0.note?.includes('Waziristan') || !rKho0.note?.includes('Matun')) return false;



          const rKho6 = resolveHB(pKhost, 6);

          if (!rKho6 || !rKho6.name.includes('Waziristan') || !rKho6.note?.includes('Faqir di Ipi')) return false;



          const rBam0 = resolveHB(pBamyan, 0);

          if (!rBam0 || !rBam0.name.includes('Buddha') || !rBam0.note?.includes('DAFA') || !rBam0.note?.includes('Hackin')) return false;



          // 4. Timeline Step 5 (Settembre 1939 - Proclamazione Ufficiale Neutralità Reale)

          const rKab5 = resolveHB(pKabul, 5);

          if (!rKab5 || !rKab5.name.includes('Neutralità Reale') || !rKab5.note?.includes('6 settembre 1939') || !rKab5.note?.includes('rigorosa neutralità')) return false;



          // 5. Timeline Step 6 (Giugno 1940 - Pressioni dell'Asse e Isolamento Diplomatico)

          const rKab6 = resolveHB(pKabul, 6);

          if (!rKab6 || !rKab6.note?.includes('Quaroni') || !rKab6.note?.includes('Pilger')) return false;



          // 6. Timeline Step 8 (Aprile 1941 - Transito di Subhas Chandra Bose & Ferma Neutralità)

          const rKab8 = resolveHB(pKabul, 8);

          if (!rKab8 || !rKab8.note?.includes('Subhas Chandra Bose') || !rKab8.note?.includes('Mazzotta') || !rKab8.adminEntity?.includes('Hashim Khan')) return false;



          return true;

        },

      },

      {

        name: "85. Audit Geotopografico, Storico ed Evolutivo Integrale della Francia Metropolitana (101 Dipartimenti e Territori NUTS-3, Denominazioni Storico-Moderne, Armistizio di Compiègne 1940, Quadripartizione Territoriale e Timeline Dinamica 1936-1941)",

        run: () => {

          if (!loadedProvs || loadedProvs.length === 0) return false;



          // 1. Verifica censimento integrale (101 entità: 96 Metropolitani NUTS-3 + 5 Territori d'Oltremare)

          const allNuts = Object.keys(FRANCE_PROVINCES_META);

          if (allNuts.length !== 101) return false;



          // 2. Controllo integrità attributi per ogni dipartimento

          for (const key of allNuts) {

            const item = FRANCE_PROVINCES_META[key];

            if (!item.nuts || !item.name || !item.modernName || !item.historicalName || !item.cheflieu || !item.region || !item.deptNum) return false;

            if (!item.s0_1 || !item.s2_4 || !item.s5 || !item.s6 || !item.s7 || !item.s8) return false;

          }



          // 3. Toponomastica storica vs moderna comparata (Check dipartimenti rinominati postbellici)

          // Seine (Paris) [75]

          const pParis = resolveFranceProvince('FR101', 0);

          if (!pParis || pParis.name !== 'Seine (Paris)' || !FRANCE_PROVINCES_META['FR101'].modernName.includes('Paris (75')) return false;



          // Seine-Inférieure -> Seine-Maritime [76]

          const pSeineMar = resolveFranceProvince('FRD22', 0);

          if (!pSeineMar || pSeineMar.name !== 'Seine-Inférieure (Rouen / Le Havre)' || !FRANCE_PROVINCES_META['FRD22'].modernName.includes('Seine-Maritime (76')) return false;



          // Loire-Inférieure -> Loire-Atlantique [44]

          const pLoireAtl = resolveFranceProvince('FRG01', 0);

          if (!pLoireAtl || pLoireAtl.name !== 'Loire-Inférieure (Nantes)' || !FRANCE_PROVINCES_META['FRG01'].modernName.includes('Loire-Atlantique (44')) return false;



          // Basses-Pyrénées -> Pyrénées-Atlantiques [64]

          const pPyrAtl = resolveFranceProvince('FRI15', 0);

          if (!pPyrAtl || pPyrAtl.name !== 'Basses-Pyrénées (Pau / Bayonne)' || !FRANCE_PROVINCES_META['FRI15'].modernName.includes('Pyrénées-Atlantiques (64')) return false;



          // Basses-Alpes -> Alpes-de-Haute-Provence [04]

          const pBassesAlp = resolveFranceProvince('FRL01', 0);

          if (!pBassesAlp || pBassesAlp.name !== 'Basses-Alpes (Digne)' || !FRANCE_PROVINCES_META['FRL01'].modernName.includes('Alpes-de-Haute-Provence (04')) return false;



          // Côtes-du-Nord -> Côtes-d'Armor [22]

          const pCotesNord = resolveFranceProvince('FRH01', 0);

          if (!pCotesNord || pCotesNord.name !== "Côtes-du-Nord (Saint-Brieuc)" || !FRANCE_PROVINCES_META['FRH01'].modernName.includes("Côtes-d'Armor (22")) return false;



          // Charente-Inférieure -> Charente-Maritime [17]

          const pCharenteInf = resolveFranceProvince('FRI32', 0);

          if (!pCharenteInf || pCharenteInf.name !== 'Charente-Inférieure (La Rochelle)' || !FRANCE_PROVINCES_META['FRI32'].modernName.includes('Charente-Maritime (17')) return false;



          // 4. Timeline Step 0-1 (1936-1937 Terza Repubblica & Fronte Popolare Léon Blum)

          const rPar0 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FR101', NAME: 'Paris' } }, 0);

          if (!rPar0 || rPar0.o !== 'FRA' || !rPar0.note?.includes('Léon Blum') || !rPar0.note?.includes('Matignon') || !rPar0.adminEntity?.includes('Troisième République')) return false;



          // 5. Timeline Step 2-4 (1938-1939 Crisi di Monaco Daladier & La Retirada spagnola)

          const rGurs2 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRI15', NAME: 'Pyrénées-Atlantiques' } }, 2);

          if (!rGurs2 || rGurs2.o !== 'FRA' || !rGurs2.note?.includes('Retirada') || !rGurs2.note?.includes('Gurs')) return false;



          // 6. Timeline Step 5 (Settembre 1939 - Maggio 1940 Drôle de guerre & Evacuazione Strasburgo in Dordogna)

          const rStras5 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRF11', NAME: 'Bas-Rhin' } }, 5);

          const rDord5 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRI11', NAME: 'Dordogne' } }, 5);

          if (!rStras5 || !rStras5.note?.includes('evacuazione') || !rStras5.note?.includes('Dordogna')) return false;

          if (!rDord5 || !rDord5.note?.includes('Strasburgo') || !rDord5.note?.includes('Périgueux')) return false;



          // 7. Timeline Step 6 (Giugno-Agosto 1940: Armistizio di Compiègne & Quadripartizione Territoriale)

          // a) Alsace-Moselle (CdZ de facto annessa al Reich)

          const rAls6 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRF11', NAME: 'Bas-Rhin' } }, 6);

          const rMos6 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRF33', NAME: 'Moselle' } }, 6);

          if (!rAls6 || rAls6.o !== 'GER' || !rAls6.adminEntity?.includes('CdZ') || !rAls6.note?.includes('Schoenenbourg') || !rAls6.note?.includes('Gau Baden-Elsass')) return false;

          if (!rMos6 || rMos6.o !== 'GER' || !rMos6.adminEntity?.includes('CdZ') || !rMos6.note?.includes('Hackenberg') || !rMos6.note?.includes('Gau Westmark')) return false;



          // b) Comando Militare di Bruxelles (Nord e Pas-de-Calais)

          const rNord6 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRE11', NAME: 'Nord' } }, 6);

          const rPdc6 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRE12', NAME: 'Pas-de-Calais' } }, 6);

          if (!rNord6 || rNord6.o !== 'GER' || !rNord6.adminEntity?.includes('Bruxelles') || !rNord6.note?.includes('Dynamo') || !rNord6.note?.includes('Lille')) return false;

          if (!rPdc6 || rPdc6.o !== 'GER' || !rPdc6.adminEntity?.includes('Bruxelles') || !rPdc6.note?.includes('Arras') || !rPdc6.note?.includes('Falkenhausen')) return false;



          // c) Zone occupée (MBF Parigi, Basi U-Boot Atlantico)

          const rBrest6 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRH02', NAME: 'Finistère' } }, 6);

          const rBord6 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRI12', NAME: 'Gironde' } }, 6);

          if (!rBrest6 || rBrest6.o !== 'GER' || !rBrest6.note?.includes('Richelieu') || !rBrest6.note?.includes('Sein')) return false;

          if (!rBord6 || rBord6.o !== 'GER' || !rBord6.note?.includes('Sousa Mendes') || !rBord6.note?.includes('Bordeaux')) return false;



          // d) Zone libre (État Français / Vichy & Capitale de la Résistance Lyon)

          const rVichy6 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRK11', NAME: 'Allier' } }, 6);

          const rLyon6 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRK26', NAME: 'Rhône' } }, 6);

          const rMars6 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRL04', NAME: 'Bouches-du-Rhône' } }, 6);

          const rToulon6 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRL05', NAME: 'Var' } }, 6);

          if (!rVichy6 || rVichy6.o !== 'VIC' || !rVichy6.note?.includes('Grand Casino') || !rVichy6.note?.includes('Pétain')) return false;

          if (!rLyon6 || rLyon6.o !== 'VIC' || !rLyon6.note?.includes('Lione') || !rLyon6.note?.includes('Zone libre')) return false;

          if (!rMars6 || rMars6.o !== 'VIC' || !rMars6.note?.includes('rifugio') || !rMars6.note?.includes('Zone libre')) return false;

          if (!rToulon6 || rToulon6.o !== 'VIC' || !rToulon6.note?.includes('Flotte de Haute Mer') || !rToulon6.note?.includes('Laborde')) return false;



          // 8. Timeline Step 7 (Ottobre 1940: Montoire Hitler-Pétain, Statut des Juifs, Keroman Lorient, Betasom Bordeaux, Varian Fry Marsiglia)

          const rLorient7 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRH04', NAME: 'Morbihan' } }, 7);

          const rMars7 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRL04', NAME: 'Bouches-du-Rhône' } }, 7);

          const rBord7 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRI12', NAME: 'Gironde' } }, 7);

          if (!rLorient7 || !rLorient7.note?.includes('Keroman') || !rLorient7.note?.includes('Dönitz')) return false;

          if (!rMars7 || !rMars7.note?.includes('Varian Fry') || !rMars7.note?.includes('Emergency Rescue Committee')) return false;

          if (!rBord7 || !rBord7.note?.includes('BETASOM') || !rBord7.note?.includes('Regia Marina')) return false;



          // 9. Timeline Step 8 (Aprile 1941: Governo Darlan, Ligne de Démarcation, Combat Lyon, OCM Parigi, Sciopero Minatori Nord)

          const rLyon8 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRK26', NAME: 'Rhône' } }, 8);

          const rNord8 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRE11', NAME: 'Nord' } }, 8);

          const rPar8 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FR101', NAME: 'Paris' } }, 8);

          if (!rLyon8 || !rLyon8.note?.includes('Capitale de la Résistance') || !rLyon8.note?.includes('Combat')) return false;

          if (!rNord8 || !rNord8.note?.includes('Minatori') || !rNord8.note?.includes('sciopero')) return false;

          if (!rPar8 || !rPar8.note?.includes('OCM') || !rPar8.note?.includes('Étoile')) return false;



          // 10. Audit Geografico Database Unificato (tutti i 96 dipartimenti metropolitani in loadedProvs risolvono correttamente)

          const frProvs = loadedProvs.filter((f: any) => f.properties?.CNTR_CODE === 'FR' && f.id && String(f.id).startsWith('FR') && String(f.id).length === 5);

          if (frProvs.length !== 96) return false;

          for (const feat of frProvs) {

            const r0 = resolveFeature(feat, 0);

            if (!r0 || r0.o !== 'FRA') return false;

            const r6 = resolveFeature(feat, 6);

            if (!r6 || (r6.o !== 'GER' && r6.o !== 'VIC')) return false;

          }



          return true;

        },

      },

            {

        name: "86. Censimento Geocartografico, Toponomastico e Cronologico Integrale del Regno Unito di Gran Bretagna e Irlanda del Nord (179 Distretti NUTS-3, 3 Crown Dependencies: Isola di Man, Jersey, Guernsey; Denominazioni Storico-Moderne, Bletchley Park, Battaglia d'Inghilterra, The Blitz, Western Approaches, Shadow Factory Plan & Timeline Dinamica 1936-1941)",

        run: () => {

          if (!loadedProvs || loadedProvs.length === 0) return false;



          // 1. Verifica censimento integrale (182 entità: 179 Distretti Metropolitani NUTS-3 + 3 Crown Dependencies)

          const allNuts = Object.keys(UK_PROVINCES_META);

          if (allNuts.length !== 182) return false;



          // 2. Controllo completezza attributi per ciascuna delle 182 entità

          for (const key of allNuts) {

            const item = UK_PROVINCES_META[key];

            if (!item.nuts || !item.name || !item.modernName || !item.historicalName || !item.historicCounty || !item.country || !item.capital || !item.region) return false;

            if (!item.s0_1 || !item.s2_4 || !item.s5 || !item.s6 || !item.s7 || !item.s8) return false;

          }



          // 3. Toponomastica storica vs moderna comparata (Città e Contee tradizionali)

          const pWest = resolveUKProvince('UKI32', 0);

          if (!pWest || !pWest.name.includes('Westminster') || !UK_PROVINCES_META['UKI32'].modernName.includes('Inner London - West') || !UK_PROVINCES_META['UKI32'].historicalName.includes('County of London')) return false;



          const pBrum = resolveUKProvince('UKG31', 0);

          if (!pBrum || !pBrum.name.includes('Birmingham') || !UK_PROVINCES_META['UKG31'].historicalName.includes('Castle Bromwich')) return false;



          const pManc = resolveUKProvince('UKD33', 0);

          if (!pManc || !pManc.name.includes('Manchester') || !UK_PROVINCES_META['UKD33'].historicalName.includes('Trafford Park')) return false;



          const pLiv = resolveUKProvince('UKD72', 0);

          if (!pLiv || !pLiv.name.includes('Liverpool') || !UK_PROVINCES_META['UKD72'].historicalName.includes('Western Approaches')) return false;



          const pCov = resolveUKProvince('UKG33', 0);

          if (!pCov || !pCov.name.includes('Coventry') || !UK_PROVINCES_META['UKG33'].historicalName.includes('Polo Aeronautico')) return false;



          const pSheff = resolveUKProvince('UKE32', 0);

          if (!pSheff || !pSheff.name.includes('Sheffield') || !UK_PROVINCES_META['UKE32'].historicalName.includes('Acciai Speciali')) return false;



          const pGlas = resolveUKProvince('UKM82', 0);

          if (!pGlas || !pGlas.name.includes('Glasgow City') || !UK_PROVINCES_META['UKM82'].historicalName.includes("Seconda Città dell'Impero")) return false;



          const pBelf = resolveUKProvince('UKN06', 0);

          if (!pBelf || !pBelf.name.includes('Belfast') || !UK_PROVINCES_META['UKN06'].historicalName.includes('Harland & Wolff')) return false;



          const pMan = resolveUKProvince('IM', 0);

          if (!pMan || !pMan.name.includes('Isle of Man') || !UK_PROVINCES_META['IM'].modernName.includes('Crown Dependency')) return false;



          // 4. Timeline Step 0-1 (1936-marzo 1938: Re Giorgio VI, Chamberlain, Shadow Factory Plan & Supermarine Spitfire)

          const rSoton0 = resolveFeature({ properties: { CNTR_CODE: 'UK', NUTS_ID: 'UKJ32', NAME: 'Southampton' } }, 0);

          if (!rSoton0 || rSoton0.o !== 'UK' || !rSoton0.note?.includes('Spitfire') || !rSoton0.note?.includes('Mitchell')) return false;

          const rSuff0 = resolveFeature({ properties: { CNTR_CODE: 'UK', NUTS_ID: 'UKH14', NAME: 'Suffolk' } }, 0);

          if (!rSuff0 || !rSuff0.note?.includes('Bawdsey Manor') || !rSuff0.note?.includes('Chain Home')) return false;



          // 5. Timeline Step 2-4 (ottobre 1938 - aprile 1939: Accordi di Monaco, difesa passiva ARP & Bletchley Park)

          const rBletch2 = resolveFeature({ properties: { CNTR_CODE: 'UK', NUTS_ID: 'UKJ12', NAME: 'Milton Keynes' } }, 2);

          if (!rBletch2 || rBletch2.o !== 'UK' || !rBletch2.note?.includes('Bletchley') || !rBletch2.note?.includes('Turing')) return false;



          // 6. Timeline Step 5 (settembre 1939 - maggio 1940: Phoney War & Scapa Flow affondamento HMS Royal Oak)

          const rOrk5 = resolveFeature({ properties: { CNTR_CODE: 'UK', NUTS_ID: 'UKM65', NAME: 'Orkney Islands' } }, 5);

          if (!rOrk5 || !rOrk5.note?.includes('Royal Oak') || !rOrk5.note?.includes('Scapa Flow') || !rOrk5.note?.includes('Prien')) return false;



          // 7. Timeline Step 6 (giugno - agosto 1940: Churchill, Dunkerque Dynamo, Battaglia d'Inghilterra & Occupazione Isole del Canale)

          const rDover6 = resolveFeature({ properties: { CNTR_CODE: 'UK', NUTS_ID: 'UKJ44', NAME: 'East Kent' } }, 6);

          if (!rDover6 || !rDover6.note?.includes('Dynamo') || !rDover6.note?.includes('Dunkerque') || !rDover6.note?.includes('Ramsay')) return false;

          const rBiggin6 = resolveFeature({ properties: { CNTR_CODE: 'UK', NUTS_ID: 'UKI61', NAME: 'Bromley' } }, 6);

          if (!rBiggin6 || !rBiggin6.note?.includes('Biggin Hill') || !rBiggin6.note?.includes("Battaglia d'Inghilterra")) return false;



          // Occupazione tedesca Isole del Canale (Step >= 6 sovranità GER e fazione Asse)

          const rJer6 = resolveFeature({ properties: { CNTR_CODE: 'JE', NUTS_ID: 'JE', NAME: 'Jersey' } }, 6);

          const rGue6 = resolveFeature({ properties: { CNTR_CODE: 'GG', NUTS_ID: 'GG', NAME: 'Guernsey' } }, 6);

          if (!rJer6 || rJer6.o !== 'GER' || rJer6.fac !== 'Asse' || !rJer6.note?.includes('occupazione')) return false;

          if (!rGue6 || rGue6.o !== 'GER' || rGue6.fac !== 'Asse') return false;



          // 8. Timeline Step 7 (ottobre 1940: The Blitz, Coventry Mondscheinsonate, St Paul Second Great Fire & Liverpool Western Approaches)

          const rCov7 = resolveFeature({ properties: { CNTR_CODE: 'UK', NUTS_ID: 'UKG33', NAME: 'Coventry' } }, 7);

          if (!rCov7 || !rCov7.note?.includes('coventrizzazione') || !rCov7.note?.includes('Mondscheinsonate')) return false;

          const rCity7 = resolveFeature({ properties: { CNTR_CODE: 'UK', NUTS_ID: 'UKI31', NAME: 'City of London' } }, 7);

          if (!rCity7 || !rCity7.note?.includes('Second Great Fire') || !rCity7.note?.includes('St Paul')) return false;

          const rLiv7 = resolveFeature({ properties: { CNTR_CODE: 'UK', NUTS_ID: 'UKD72', NAME: 'Liverpool' } }, 7);

          if (!rLiv7 || !rLiv7.note?.includes('Western Approaches') || !rLiv7.note?.includes('Derby House')) return false;



          // 9. Timeline Step 8 (aprile 1941: Lend-Lease, Clydebank Blitz, Belfast Easter Blitz & Caccia alla Bismarck)

          const rClyde8 = resolveFeature({ properties: { CNTR_CODE: 'UK', NUTS_ID: 'UKM81', NAME: 'Clydebank' } }, 8);

          if (!rClyde8 || !rClyde8.note?.includes('Clydebank Blitz')) return false;

          const rBelf8 = resolveFeature({ properties: { CNTR_CODE: 'UK', NUTS_ID: 'UKN06', NAME: 'Belfast' } }, 8);

          if (!rBelf8 || !rBelf8.note?.includes('Belfast Blitz') || !rBelf8.note?.includes('Easter Raid')) return false;

          const rFerm8 = resolveFeature({ properties: { CNTR_CODE: 'UK', NUTS_ID: 'UKN0G', NAME: 'Fermanagh' } }, 8);

          if (!rFerm8 || !rFerm8.note?.includes('Bismarck') || !rFerm8.note?.includes('Castle Archdale')) return false;



          // 10. Audit Geografico Database Unificato (179 distretti NUTS-3)

          const ukProvs = loadedProvs.filter((f: any) => f.properties?.CNTR_CODE === 'UK' && f.id && String(f.id).startsWith('UK') && String(f.id).length === 5);

          if (ukProvs.length !== 179) return false;

          for (const feat of ukProvs) {

            const r0 = resolveFeature(feat, 0);

            if (!r0 || r0.o !== 'UK') return false;

            const r8 = resolveFeature(feat, 8);

            if (!r8 || r8.o !== 'UK') return false;

          }



          return true;

        },

      },

      {

        name: "87. Censimento Geocartografico, Toponomastico e Cronologico Integrale del Regno d'Italia e Possedimenti Speciali (107 Province Metropolitane NUTS-3, 8 Territori Storici: Zara, Carnaro/Fiume, Pola, Gorizia Orientale, Postumia, Rodi/Dodecaneso, Saseno, Albania; Denominazioni Storico-Fasciste: Littoria, Apuania, Aosta, Roma Capitale, Caserta, Carbonia; Autarchia, Sanzioni, Alpi Occidentali, Notte di Taranto, Campagna di Grecia, Capo Matapan e Timeline Dinamica 1936-1941)",

        run: () => {

          // 1. Audit Censimento Metadata (115 entita censite)

          if (!IT_PROVINCES_META || Object.keys(IT_PROVINCES_META).length !== 115) return false;



          // 2. Denominazioni storiche e rinominazioni dell'epoca fascista

          const rLit0 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITI44', NAME: 'Latina' } }, 0);

          if (!rLit0 || !rLit0.name.includes('Littoria') || (!rLit0.note?.includes('Paludi Pontine') && !rLit0.note?.includes('bonifica'))) return false;



          const rApu0 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITI11', NAME: 'Massa-Carrara' } }, 0);

          if (!rApu0 || !rApu0.name.includes('Massa e Carrara') || !rApu0.note?.includes('autarchia')) return false;



          const rApu2 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITI11', NAME: 'Massa-Carrara' } }, 2);

          if (!rApu2 || !rApu2.name.includes('Apuania')) return false;



          const rAos0 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITC20', NAME: "Valle d'Aosta" } }, 0);

          if (!rAos0 || !rAos0.name.includes('Aosta')) return false;



          const rRom0 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITI43', NAME: 'Roma' } }, 0);

          if (!rRom0 || !rRom0.name.includes('Roma') || !rRom0.note?.includes('Palazzo Venezia')) return false;



          const rCas0 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITF31', NAME: 'Caserta' } }, 0);

          if (!rCas0 || !rCas0.name.includes('Caserta') || !rCas0.note?.includes('Accademia Aeronautica')) return false;



          const rCar0 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITG2H', NAME: 'Sud Sardegna' } }, 0);

          if (!rCar0 || !rCar0.note?.includes('Sulcis')) return false;



          // 3. Territori Speciali e Possedimenti Storici

          const rZara = resolveItalyProvince('IT_ZARA', 0);

          if (!rZara || !rZara.name.includes('Zara') || !rZara.note?.includes('Dalmazia')) return false;



          const rFiume = resolveItalyProvince('IT_FIUME', 0);

          if (!rFiume || !rFiume.name.includes('Carnaro') || !rFiume.note?.includes('Silurificio Whitehead')) return false;



          const rPola = resolveItalyProvince('HR036', 0);

          if (!rPola || !rPola.name.includes('Pola') || !rPola.note?.includes('Sommergibilisti')) return false;



          const rRodi = resolveItalyProvince('EL421', 0);

          if (!rRodi || !rRodi.note?.includes("Isole Italiane dell'Egeo")) return false;



          const rSas = resolveItalyProvince('SASENO', 0);

          if (!rSas || !rSas.name.includes('Saseno') || !rSas.note?.includes('Valona')) return false;



          const rAlb = resolveItalyProvince('AL_ALBANIA', 2);

          if (!rAlb || !rAlb.note?.includes('Unione Personale') || !rAlb.note?.includes('Vittorio Emanuele III')) return false;



          // 4. Timeline Step 0-1 (1936-marzo 1938: Proclamazione Impero, Sanzioni SdN, Autarchia)

          const rMil0 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITC4C', NAME: 'Milano' } }, 0);

          if (!rMil0 || !rMil0.note?.includes('Caproni')) return false;

          const rTor0 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITC11', NAME: 'Torino' } }, 0);

          if (!rTor0 || !rTor0.note?.includes('Mirafiori')) return false;



          // 5. Timeline Step 2-4 (ottobre 1938-aprile 1939: Leggi Razziali, Inaugurazione Carbonia, Annessione Albania)

          const rRom2 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITI43', NAME: 'Roma' } }, 2);

          if (!rRom2 || !rRom2.note?.includes('leggi razziali') || !rRom2.note?.includes('Albania')) return false;

          const rCar2 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITG2H', NAME: 'Sud Sardegna' } }, 2);

          if (!rCar2 || !rCar2.note?.includes('Carbonia') || !rCar2.note?.includes('carbone')) return false;



          // 6. Timeline Step 5 (settembre 1939-maggio 1940: Non Belligeranza, Tessere Annonarie)

          const rTor5 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITC11', NAME: 'Torino' } }, 5);

          if (!rTor5 || !rTor5.note?.includes('non belligeranza')) return false;



          // 7. Timeline Step 6 (giugno-agosto 1940: Entrata in guerra, Alpi Occidentali, Punta Stilo)

          const rImp6 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITC31', NAME: 'Imperia' } }, 6);

          if (!rImp6 || !rImp6.note?.includes('Mentone')) return false;

          const rReg6 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITF65', NAME: 'Reggio di Calabria' } }, 6);

          if (!rReg6 || !rReg6.note?.includes('Punta Stilo') || !rReg6.note?.includes('Stretto')) return false;



          // 8. Timeline Step 7 (ottobre 1940: Campagna di Grecia, Julia, Notte di Taranto)

          const rTar7 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITF43', NAME: 'Taranto' } }, 7);

          if (!rTar7 || !rTar7.note?.includes('Notte di Taranto') || !rTar7.note?.includes('Swordfish')) return false;

          const rAqu7 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITF11', NAME: "L'Aquila" } }, 7);

          if (!rAqu7 || !rAqu7.note?.includes('Julia') || !rAqu7.note?.includes('Pindo')) return false;



          // 9. Timeline Step 8 (aprile 1941: Rommel DAK a Tripoli, Capo Matapan, Invasione Jugoslavia, caduta Addis Abeba)

          const rNap8 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITF33', NAME: 'Napoli' } }, 8);

          if (!rNap8 || !rNap8.note?.includes('Rommel') || !rNap8.note?.includes('Afrikakorps')) return false;

          const rMes8 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITG13', NAME: 'Messina' } }, 8);

          if (!rMes8 || !rMes8.note?.includes('Capo Matapan')) return false;

          const rZara8 = resolveItalyProvince('IT_ZARA', 8);

          if (!rZara8 || !rZara8.note?.includes('Governatorato di Dalmazia')) return false;



          // 10. Audit Geografico Database Unificato (107 distretti NUTS-3 italiani)

          const itProvs = loadedProvs.filter((f: any) => f.properties?.CNTR_CODE === 'IT' && f.id && String(f.id).startsWith('IT') && String(f.id).length === 5);

          if (itProvs.length !== 107) return false;

          for (const feat of itProvs) {

            const r0 = resolveFeature(feat, 0);

            if (!r0 || (r0.o !== 'IT' && r0.o !== 'ITA')) return false;

            const r8 = resolveFeature(feat, 8);

            if (!r8 || (r8.o !== 'IT' && r8.o !== 'ITA')) return false;

          }



          return true;

        }

      },

      {

        name: "88. Censimento Geocartografico, Toponomastico e Cronologico Integrale della Spagna e Territori d'Oltremare (59 Feature NUTS-3 Metropolitane/Insulari, 4 Territori Coloniali/Speciali: Marocco Spagnolo/Tetuán, Sahara Spagnolo, Golfo di Guinea, Ifni; Denominazioni Storiche: La Coruña, Guipúzcoa, Vizcaya, Álava, Logroño, Santander, Oviedo; Guerra Civile Spagnola SPR vs SPA, Fronte dell'Ebro, Retirada, Neutralità, Hendaye e Timeline Dinamica 1936-1941)",

        run: () => {

          // 1. Audit Censimento Metadata (63 entita censite)

          if (!SPAIN_PROVINCES_META || Object.keys(SPAIN_PROVINCES_META).length !== 63) return false;



          // 2. Denominazioni storiche e toponimi regionali/coloniali

          const rCor = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES111', NAME_LATN: 'A Coruña' } }, 0);

          if (!rCor || !rCor.name.includes('La Coruña')) return false;



          const rGuip = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES212', NAME_LATN: 'Gipuzkoa' } }, 0);

          if (!rGuip || !rGuip.name.includes('Guipúzcoa')) return false;



          const rLog = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES230', NAME_LATN: 'La Rioja' } }, 0);

          if (!rLog || !rLog.name.includes('Logroño')) return false;



          const rSant = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES130', NAME_LATN: 'Cantabria' } }, 0);

          if (!rSant || !rSant.name.includes('Santander')) return false;



          const rOvi = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES120', NAME_LATN: 'Asturias' } }, 0);

          if (!rOvi || !rOvi.name.includes('Oviedo')) return false;



          const rRif = resolveFeature({ properties: { id: 'ES_RIF', CNTR_CODE: 'ES_RIF', NAME: 'Spanish Morocco' } }, 0);

          if (!rRif || !rRif.name.includes('Tetuán')) return false;



          const rSah = resolveSpainProvince('ES_SAHARA', 0);

          if (!rSah || !rSah.name.includes('Sahara Español')) return false;



          const rGui = resolveSpainProvince('ES_GUINEA', 0);

          if (!rGui || !rGui.name.includes('Golfo de Guinea')) return false;



          const rIfn = resolveSpainProvince('ES_IFNI', 0);

          if (!rIfn || !rIfn.name.includes('Ifni')) return false;



          // 3. Step 0 (1936 pre-Alzamiento: Seconda Repubblica Spagnola SPR)

          const rMad0 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES300', NAME: 'Madrid' } }, 0);

          if (!rMad0 || rMad0.o !== 'SPR' || !rMad0.note?.includes('Azaña')) return false;



          const rBar0 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES511', NAME: 'Barcelona' } }, 0);

          if (!rBar0 || rBar0.o !== 'SPR' || !rBar0.note?.includes('Generalitat')) return false;



          // 4. Step 1 (Marzo 1938: Guerra Civile Spaccata tra SPR e SPA)

          const rMad1 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES300', NAME: 'Madrid' } }, 1);

          if (!rMad1 || rMad1.o !== 'SPR' || !rMad1.note?.includes('No pasarán')) return false;



          const rAlb1 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES421', NAME: 'Albacete' } }, 1);

          if (!rAlb1 || rAlb1.o !== 'SPR' || !rAlb1.note?.includes('Brigate Internazionali')) return false;



          const rBur1 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES412', NAME: 'Burgos' } }, 1);

          if (!rBur1 || rBur1.o !== 'SPA' || !rBur1.note?.includes('Bando Nacional')) return false;



          const rTol1 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES425', NAME: 'Toledo' } }, 1);

          if (!rTol1 || rTol1.o !== 'SPA' || !rTol1.note?.includes('Alcázar')) return false;



          const rMal1 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES532', NAME: 'Mallorca' } }, 1);

          if (!rMal1 || rMal1.o !== 'SPA' || !rMal1.note?.includes('Aviazione Legionaria')) return false;



          const rMen1 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES533', NAME: 'Menorca' } }, 1);

          if (!rMen1 || rMen1.o !== 'SPR' || !rMen1.note?.includes('Mahón')) return false;



          // 5. Step 2 (Ottobre 1938: Rottura a Vinaròs & Battaglia dell'Ebro)

          const rCas2 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES522', NAME: 'Castellón' } }, 2);

          if (!rCas2 || rCas2.o !== 'SPA' || (!rCas2.note?.includes('Ebro') && !rCas2.note?.includes('franchisti'))) return false;



          const rTar2 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES514', NAME: 'Tarragona' } }, 2);

          if (!rTar2 || rTar2.o !== 'SPR' || !rTar2.note?.includes('Ebro')) return false;



          const rBar2 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES511', NAME: 'Barcelona' } }, 2);

          if (!rBar2 || rBar2.o !== 'SPR' || !rBar2.note?.includes('Pasionaria')) return false;



          // 6. Step 3-4 (Marzo-Aprile 1939: Caduta Catalogna, Casado a Madrid, Vittoria Nazionalista SPA)

          const rBar3 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES511', NAME: 'Barcelona' } }, 3);

          if (!rBar3 || rBar3.o !== 'SPA' || !rBar3.note?.includes('Retirada')) return false;



          const rMad3 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES300', NAME: 'Madrid' } }, 3);

          if (!rMad3 || rMad3.o !== 'SPA' || !rMad3.note?.includes('Casado')) return false;



          const rAli3 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES521', NAME: 'Alicante' } }, 3);

          if (!rAli3 || rAli3.o !== 'SPA' || !rAli3.note?.includes('Stanbrook')) return false;



          // 7. Step 5 (Settembre 1939-Maggio 1940: Proclamazione Neutralità & Anni della Fame)

          const rMad5 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES300', NAME: 'Madrid' } }, 5);

          if (!rMad5 || rMad5.o !== 'SPA' || (!rMad5.note?.includes('fame nera') && !rMad5.note?.includes('Nuevo Estado'))) return false;



          const rCor5 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES111', NAME: 'A Coruña' } }, 5);

          if (!rCor5 || rCor5.o !== 'SPA' || !rCor5.note?.includes('U-Boot')) return false;



          // 8. Step 6 (Giugno 1940: Passaggio a Non Belligeranza, Operazione Felix & Tangeri)

          const rRif6 = resolveFeature({ properties: { id: 'ES_RIF', CNTR_CODE: 'ES_RIF', NAME: 'Spanish Morocco' } }, 6);

          if (!rRif6 || rRif6.o !== 'SPA' || !rRif6.note?.includes('Tangeri')) return false;



          const rCad6 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES612', NAME: 'Cádiz' } }, 6);

          if (!rCad6 || rCad6.o !== 'SPA' || !rCad6.note?.includes('Felix')) return false;



          // 9. Step 7 (Ottobre 1940: Incontro di Hendaye & Fucilazione Companys)

          const rGuip7 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES212', NAME: 'Gipuzkoa' } }, 7);

          if (!rGuip7 || rGuip7.o !== 'SPA' || !rGuip7.note?.includes('Hendaye')) return false;



          const rBar7 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES511', NAME: 'Barcelona' } }, 7);

          if (!rBar7 || rBar7.o !== 'SPA' || !rBar7.note?.includes('Companys')) return false;



          // 10. Step 8 (Aprile 1941: Carestia, Diplomazia Anglo-Spagnola Hoare, Wolframio & Abwehr)

          const rMad8 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES300', NAME: 'Madrid' } }, 8);

          if (!rMad8 || rMad8.o !== 'SPA' || (!rMad8.note?.includes('Hoare') && !rMad8.note?.includes('Abwehr'))) return false;



          const rVig8 = resolveFeature({ properties: { CNTR_CODE: 'ES', NUTS_ID: 'ES114', NAME: 'Pontevedra' } }, 8);

          if (!rVig8 || rVig8.o !== 'SPA' || !rVig8.note?.includes('wolframio')) return false;



          // 11. Audit Geografico Database Unificato (59 province metropolitane/insulari + Marocco Spagnolo)

          const esProvs = loadedProvs.filter((f: any) => f.properties?.CNTR_CODE === 'ES');

          if (esProvs.length !== 59) return false;

          for (const feat of esProvs) {

            const r0 = resolveFeature(feat, 0);

            if (!r0 || r0.o !== 'SPR') return false;

            const r8 = resolveFeature(feat, 8);

            if (!r8 || r8.o !== 'SPA') return false;

          }

          const rRif0 = resolveFeature({ properties: { id: 'ES_RIF', CNTR_CODE: 'ES_RIF' } }, 0);

          if (!rRif0 || rRif0.o !== 'SPR') return false;

          const rRif8 = resolveFeature({ properties: { id: 'ES_RIF', CNTR_CODE: 'ES_RIF' } }, 8);

          if (!rRif8 || rRif8.o !== 'SPA') return false;



          return true;

        }

      },

      {

        name: "89. Censimento Geocartografico, Toponomastico e Cronologico Integrale dell'Unione Sovietica (239 Entità Territoriali: RSFSR, RSS Ucraina, RSS Bielorussa, RSS Kazaka, RSS Uzbeka, RSS Turkmena, RSS Tagika, RSS Kirghisa, Transcaucasia & Tannu Tuva; Denominazioni Storico-Sovietiche: Stalingrado, Leningrado, Kujbyšev, Gor'kij, Sverdlovsk, Molotov, Čkalov, Kalinin, Kirov, Ordžonikidze, Stalino, Vorošilovgrad, Dnepropetrovsk, Stalinabad, Leninabad, Frunze, Krasnogvardejsk, Ostiachia-Vogulia; Timeline Dinamica 1936-1941: Costituzione 1936, Purghe 1938, Lago Chasan, Chalchin Gol, Patto Molotov-Ribbentrop, Guerra d'Inverno, Annessione Baltici e Bucovina Settentrionale, Patto Neutralità Giappone)",

        run: () => {

          // 1. Audit Censimento Metadata (239-240 entità territoriali censite inclusa la Sacca di Stalingrado Kessel)

          if (!SOVIET_PROVINCES_META || (Object.keys(SOVIET_PROVINCES_META).length !== 239 && Object.keys(SOVIET_PROVINCES_META).length !== 240)) return false;



          // 2. Denominazioni storiche sovietiche ufficiali dell'epoca

          const pStal = resolveSovietProvince('SOV_ADM1_RUS_13_Volgograd_Oblast', 0);

          if (!pStal || !pStal.name.includes('Stalingrado')) return false;



          const pLen = resolveSovietProvince('SOV_ADM1_RUS_49_Saint_Petersburg', 0);

          if (!pLen || !pLen.name.includes('Leningrado')) return false;



          const pKujb = resolveSovietProvince('SOV_ADM1_RUS_20_Samara_Oblast', 0);

          if (!pKujb || !pKujb.name.includes('Kujbyšev')) return false;



          const pGork = resolveSovietProvince('SOV_ADM1_RUS_25_Nizhny_Novgorod_Oblast', 0);

          if (!pGork || !pGork.name.includes("Gor'kij")) return false;



          const pSver = resolveSovietProvince('SOV_ADM1_RUS_12_Sverdlovsk_Oblast', 0);

          if (!pSver || !pSver.name.includes('Sverdlovsk')) return false;



          const pMolo = resolveSovietProvince('SOV_ADM1_RUS_15_Perm_Krai', 0);

          if (!pMolo || !pMolo.name.includes('Molotov')) return false;



          const pCkal = resolveSovietProvince('SOV_ADM1_RUS_77_Orenburg_Oblast', 0);

          if (!pCkal || !pCkal.name.includes('Čkalov')) return false;



          const pKali = resolveSovietProvince('SOV_ADM1_RUS_56_Tver_Oblast', 0);

          if (!pKali || !pKali.name.includes('Kalinin')) return false;



          const pKiro = resolveSovietProvince('SOV_ADM1_RUS_7_Kirov_Oblast', 0);

          if (!pKiro || !pKiro.name.includes('Kirov')) return false;



          const pOrdz = resolveSovietProvince('SOV_ADM1_RUS_35_North_Ossetia_Alania', 0);

          if (!pOrdz || !pOrdz.name.includes('Ordžonikidze')) return false;



          const pStalino = resolveSovietProvince('SOV_ADM1_UKR_87_Donetsk_Oblast', 0);

          if (!pStalino || !pStalino.name.includes('Stalino')) return false;



          const pVoro = resolveSovietProvince('SOV_ADM1_UKR_86_Luhansk_Oblast', 0);

          if (!pVoro || !pVoro.name.includes('Vorošilovgrad')) return false;



          const pDnep = resolveSovietProvince('SOV_ADM1_UKR_96_Dnipropetrovsk_Oblast', 0);

          if (!pDnep || !pDnep.name.includes('Dnepropetrovsk')) return false;



          const pStalinabad = resolveSovietProvince('SOV_ADM1_TJK_169_Dushanbe', 0);

          if (!pStalinabad || !pStalinabad.name.includes('Stalinabad')) return false;



          const pLeninabad = resolveSovietProvince('SOV_ADM1_TJK_165_Sughd_Region', 0);

          if (!pLeninabad || !pLeninabad.name.includes('Leninabad')) return false;



          const pFrunze = resolveSovietProvince('SOV_ADM1_KGZ_175_Chuy_Region', 0);

          if (!pFrunze || !pFrunze.name.includes('Frunze')) return false;



          // 3. Status Speciali: Tannu Tuva (TUV alleato Comintern), Bucovina Settentrionale (ROM -> SOV), Moldavia/Transnistria

          const pTuva = resolveSovietProvince('SOV_ADM1_RUS_55_Tuva', 0);

          if (!pTuva || pTuva.o !== 'TUV' || pTuva.fac !== 'Comintern') return false;



          const pBuko0 = resolveSovietProvince('SOV_ADM1_UKR_89_Chernivtsi_Oblast', 0);

          if (!pBuko0 || pBuko0.o !== 'ROM') return false;



          const pBuko6 = resolveSovietProvince('SOV_ADM1_UKR_89_Chernivtsi_Oblast', 6);

          if (!pBuko6 || pBuko6.o !== 'SOV') return false;



          const pMold0 = resolveSovietProvince('SOV_MASSR_310_Transnistria', 0);

          if (!pMold0 || !pMold0.name.includes('RSSA Moldava')) return false;



          const pMold6 = resolveSovietProvince('SOV_MASSR_310_Transnistria', 6);

          if (!pMold6 || !pMold6.name.includes('RSS Moldava')) return false;



          // 4. Timeline Dinamica (Step 0 - 8): Costituzione 1936, Purghe 1938, Chasan, Chalchin Gol, Patto Molotov-Ribbentrop, Guerra d'Inverno, Baltici, Neutralità Giappone

          const pMos0 = resolveSovietProvince('SOV_ADM1_RUS_42_Moscow', 0);

          if (!pMos0 || !pMos0.note?.includes('Costituzione')) return false;



          const pMos1 = resolveSovietProvince('SOV_ADM1_RUS_42_Moscow', 1);

          if (!pMos1 || !pMos1.note?.includes('Grande Terrore')) return false;



          const pVlad2 = resolveSovietProvince('SOV_ADM1_RUS_78_Primorsky_Krai', 2);

          if (!pVlad2 || !pVlad2.note?.includes('Lago Chasan')) return false;



          const pZaba3 = resolveSovietProvince('SOV_ADM1_RUS_11_Zabaykalsky_Krai', 3);

          if (!pZaba3 || !pZaba3.note?.includes('Chalchin Gol')) return false;



          const pMos5 = resolveSovietProvince('SOV_ADM1_RUS_42_Moscow', 5);

          if (!pMos5 || !pMos5.note?.includes('Patto di non aggressione')) return false;



          const pKarel5 = resolveSovietProvince('SOV_NW_RUS_261_Petroskoi_District', 5);

          if (!pKarel5 || !pKarel5.note?.includes("Guerra d'Inverno")) return false;



          const pMos6 = resolveSovietProvince('SOV_ADM1_RUS_42_Moscow', 6);

          if (!pMos6 || (!pMos6.note?.includes('baltici') && !pMos6.note?.includes('Trockij'))) return false;



          const pMos7 = resolveSovietProvince('SOV_ADM1_RUS_42_Moscow', 7);

          if (!pMos7 || !pMos7.note?.includes('Berlino')) return false;



          const pMos8 = resolveSovietProvince('SOV_ADM1_RUS_42_Moscow', 8);

          if (!pMos8 || !pMos8.note?.includes('Patto di Neutralità')) return false;



          // 5. Audit Geografico Database Unificato (239-240 feature del layer prov inclusa la Sacca di Stalingrado Kessel)

          const sovProvs = loadedProvs.filter((f: any) => String(f.id || '').startsWith('SOV_'));

          if (sovProvs.length !== 239 && sovProvs.length !== 240) return false;



          let s0Count = 0;

          let s8Count = 0;

          for (const feat of sovProvs) {

            const r0 = resolveFeature(feat, 0);

            if (!r0 || !r0.o || !r0.note) return false;

            if (r0.o === 'SOV') s0Count++;



            const r8 = resolveFeature(feat, 8);

            if (!r8 || !r8.o || !r8.note) return false;

            if (r8.o === 'SOV') s8Count++;

          }



          if (s0Count !== 237 && s0Count !== 238) return false;

          if (s8Count !== 238 && s8Count !== 239) return false;



          return true;

        }

      },

      {

        name: "90. Audit Geostorico Integrale Step 9 (DIC 1941 — Situazione al 31 dicembre 1941: Operazione Barbarossa, Assedio di Mosca e Leningrado, Reichskommissariat Ostland e Ukraine, Distrikt Galizien, Bezirk Bialystok, Governatorato della Transnistria, Riconquista Carelia e Jatkosota Finlandese, Controllo Congiunto Francia Libera/UK in Siria e Libano, Spartizione Anglo-Sovietica dell'Iran, Occupazione Integrale Giapponese dell'Indocina, Pearl Harbor, Conquista di Hong Kong, Guam e Wake, Invasione di Malesia e Filippine con Manila Città Aperta, Alleanza Militare Thailandia-Giappone)",

        run: () => {

          if (STEPS.length < 10 || STEPS[9].d !== 'DIC 1941') return false;



          // 1. Europa Orientale (Fronte dell'Est)

          // a) Reichskommissariat Ostland (Baltici e Bielorussia occidentale/centrale)

          const est9 = resolveFeature({ properties: { CNTR_CODE: 'EE', NUTS_ID: 'EE001', NAME: 'Tallinn' } }, 9);

          const lat9 = resolveFeature({ properties: { CNTR_CODE: 'LV', NUTS_ID: 'LV006', NAME: 'Riga' } }, 9);

          const lit9 = resolveFeature({ properties: { CNTR_CODE: 'LT', NUTS_ID: 'LT011', NAME: 'Vilnius' } }, 9);

          const minsk9 = resolveSovietProvince('SOV_ADM1_BLR_104_Minsk', 9);

          if (est9.o !== 'GER' || est9.fac !== 'Asse' || !est9.name.includes('Ostland')) return false;

          if (lat9.o !== 'GER' || lat9.fac !== 'Asse' || !lat9.name.includes('Ostland')) return false;

          if (lit9.o !== 'GER' || lit9.fac !== 'Asse' || !lit9.name.includes('Ostland')) return false;

          if (!minsk9 || minsk9.o !== 'GER' || minsk9.fac !== 'Asse' || !minsk9.adminEntity?.includes('Ostland')) return false;



          // b) Reichskommissariat Ukraine (sotto Erich Koch, capitale Rovno)

          const kiev9 = resolveSovietProvince('SOV_ADM1_UKR_98_Kyiv', 9);

          const volh9 = resolveFeature({ id: 'PL_KRESY_UKR_1_Luck', properties: { NUTS_ID: 'PL_KRESY_UKR_1_Luck', CNTR_CODE: 'PL', NAME: 'Powiat Łuck', VOIVODESHIP: 'Wołyńskie', SOV_SSR: 'Ukrainskaya SSR' } }, 9);

          if (!kiev9 || kiev9.o !== 'GER' || kiev9.fac !== 'Asse' || !kiev9.adminEntity?.includes('Reichskommissariat Ukraine')) return false;

          if (volh9.o !== 'GER' || volh9.fac !== 'Asse' || !volh9.name.includes('Reichskommissariat Ukraine')) return false;



          // c) Distretto di Galizia (scorporato dall'Ucraina e annesso al Governatorato Generale il 1° agosto 1941)

          const lwow9 = resolveFeature({ id: 'PL_KRESY_LVO_1', properties: { NUTS_ID: 'PL_KRESY_LVO_1', CNTR_CODE: 'PL', NAME: 'Powiat Lwów', VOIVODESHIP: 'Lwowskie', SOV_SSR: 'Ukrainskaya SSR' } }, 9);

          if (lwow9.o !== 'GER' || lwow9.fac !== 'Asse' || !lwow9.name.includes('Distrikt Galizien') || !lwow9.adminEntity?.includes('Generalgouvernement')) return false;



          // d) Bezirk Bialystok (sotto amministrazione civile tedesca aggregata alla Prussia Orientale, agosto 1941)

          const bial9 = resolveFeature({ properties: { CNTR_CODE: 'PL', NUTS_ID: 'PL841', NAME: 'Białystok' } }, 9);

          const grod9 = resolveFeature({ id: 'PL_KRESY_BLR_1_Grodno', properties: { NUTS_ID: 'PL_KRESY_BLR_1_Grodno', CNTR_CODE: 'PL', NAME: 'Powiat Grodno', VOIVODESHIP: 'Białostockie', SOV_SSR: 'Belorusskaya SSR' } }, 9);

          if (bial9.o !== 'GER' || bial9.fac !== 'Asse' || !bial9.name.includes('Bezirk Bialystok')) return false;

          if (grod9.o !== 'GER' || grod9.fac !== 'Asse' || !grod9.name.includes('Bezirk Bialystok')) return false;



          // e) Governatorato della Transnistria (Dnestr - Bug Meridionale ceduto alla Romania, Tighina 30 agosto 1941, caduta di Odessa a ottobre) + Bessarabia e Bucovina

          const trans9 = resolveSovietProvince('SOV_MASSR_310_Transnistria', 9);

          const odessa9 = resolveSovietProvince('SOV_ADM1_UKR_195_Odessa_City', 9);

          const bess9 = resolveFeature({ properties: { CNTR_CODE: 'RO_BES', NAME: 'Bessarabia' } }, 9);

          const buk9 = resolveSovietProvince('SOV_ADM1_UKR_89_Chernivtsi_Oblast', 9);

          if (!trans9 || trans9.o !== 'ROM' || trans9.fac !== 'Asse' || !trans9.adminEntity?.includes('Transnistriei')) return false;

          if (!odessa9 || odessa9.o !== 'ROM' || odessa9.fac !== 'Asse' || !odessa9.adminEntity?.includes('Transnistriei')) return false;

          if (bess9.o !== 'ROM' || bess9.fac !== 'Asse') return false;

          if (!buk9 || buk9.o !== 'ROM' || buk9.fac !== 'Asse') return false;



          // f) Finlandia: riconquista della Carelia perduta nel 1940 e occupazione della Carelia orientale sovietica (Petrozavodsk / Äänislinna)

          const viip9 = resolveFeature({ properties: { CNTR_CODE: 'FIN_KARELIA', NAME: 'Vyborgsky District' } }, 9);

          const salla9 = resolveFeature({ properties: { CNTR_CODE: 'FIN_SALLA', NAME: 'Salla Alakurtti District' } }, 9);

          const petro9 = resolveSovietProvince('SOV_NW_RUS_261_Petroskoi_District', 9);

          if (viip9.o !== 'FIN' || viip9.fac !== 'Asse') return false;

          if (salla9.o !== 'FIN' || salla9.fac !== 'Asse') return false;

          if (!petro9 || petro9.o !== 'FIN' || petro9.fac !== 'Asse' || !petro9.adminEntity?.includes('Itä-Karjalan')) return false;



          // g) Massima avanzata tedesca (Heeresgebiete) e tenuta sovietica a Mosca e Leningrado (controffensiva del 5 dicembre 1941)

          const smol9 = resolveSovietProvince('SOV_ADM1_RUS_53_Smolensk_Oblast', 9);

          const mos9 = resolveSovietProvince('SOV_ADM1_RUS_42_Moscow', 9);

          const len9 = resolveSovietProvince('SOV_ADM1_RUS_49_Saint_Petersburg', 9);

          if (!smol9 || smol9.o !== 'GER' || smol9.fac !== 'Asse') return false;

          if (!mos9 || mos9.o !== 'SOV' || mos9.fac !== 'Comintern' || !mos9.note?.includes('5 dicembre')) return false;

          if (!len9 || len9.o !== 'SOV' || len9.fac !== 'Comintern' || !len9.note?.toLowerCase().includes('assedio')) return false;



          // h) Palanga e costa baltica lituana (Operazione Barbarossa, 22 giugno 1941)

          const pal9 = resolveFeature({ id: 'LT_HIST_PALANGA', properties: { NUTS_ID: 'LT_HIST_PALANGA', CNTR_CODE: 'LIT', NAME: 'Palanga and Kretinga' } }, 9);

          if (!pal9 || pal9.o !== 'GER' || pal9.fac !== 'Asse' || !pal9.name.includes('Ostland')) return false;



          // i) Rostov sul Don (liberata dal contrattacco sovietico il 29 novembre 1941) e Sebastopoli (fortezza assediata)

          const rostov9 = resolveSovietProvince('SOV_ADM1_RUS_17_Rostov_Oblast', 9);

          const sevast9 = resolveSovietProvince('SOV_ADM1_UKR_99_Sevastopol', 9);

          if (!rostov9 || rostov9.o !== 'SOV' || rostov9.fac !== 'Comintern' || !rostov9.note?.includes('29 novembre 1941')) return false;

          if (!sevast9 || sevast9.o !== 'SOV' || sevast9.fac !== 'Comintern' || !sevast9.note?.includes('Sebastopoli')) return false;



          // 2. Medio Oriente e Asia Centrale

          // a) Siria e Libano: controllo congiunto Francia Libera e Gran Bretagna (Armistizio di Saint-Jean-d'Acre, 14 luglio 1941)

          const syrDam9 = resolveFeature({ id: 'SYR_DAM', properties: { CNTR_CODE: 'SYR', NUTS_ID: 'SYR_DAM', NAME: 'Damascus' } }, 9);

          const lebBei9 = resolveFeature({ id: 'LBBA', properties: { CNTR_CODE: 'LEB', NUTS_ID: 'LBBA', NAME: 'Beirut' } }, 9);

          if (syrDam9.o !== 'F_SYR' || syrDam9.fac !== 'Alleati' || !syrDam9.note?.includes("Saint-Jean-d'Acre")) return false;

          if (lebBei9.o !== 'F_SYR' || lebBei9.fac !== 'Alleati' || !lebBei9.adminEntity?.includes('France Libre')) return false;



          // b) Iran: spartito tra URSS (settore nord) e Regno Unito (settore sud) dopo l'invasione anglo-sovietica (agosto-settembre 1941)

          const irnNorth9 = resolveFeature({ id: 'IRN_EAZ', properties: { CNTR_CODE: 'IRN', NUTS_ID: 'IRN_EAZ', NAME: 'East Azerbaijan' } }, 9);

          const irnSouth9 = resolveFeature({ id: 'IRN_KHZ', properties: { CNTR_CODE: 'IRN', NUTS_ID: 'IRN_KHZ', NAME: 'Khuzestan' } }, 9);

          const irnCenter9 = resolveFeature({ id: 'IRN_TEH', properties: { CNTR_CODE: 'IRN', NUTS_ID: 'IRN_TEH', NAME: 'Tehran' } }, 9);

          if (irnNorth9.o !== 'SOV' || irnNorth9.fac !== 'Comintern') return false;

          if (irnSouth9.o !== 'UK' || irnSouth9.fac !== 'Alleati') return false;

          if (irnCenter9.o !== 'IRN' || irnCenter9.fac !== 'Alleati') return false;



          // 3. Asia e Pacifico (La Guerra Globale)

          // a) Indocina francese: interamente occupata dalle truppe giapponesi (completata a fine luglio 1941)

          const hanoi9 = resolveFeature({ id: 'VN26', properties: { CNTR_CODE: 'VN', NUTS_ID: 'VN26', NAME: 'Ha Noi' } }, 9);

          const saigon9 = resolveFeature({ id: 'VN61', properties: { CNTR_CODE: 'VN', NUTS_ID: 'VN61', NAME: 'Ho Chi Minh' } }, 9);

          if (hanoi9.o !== 'JAP' || hanoi9.fac !== 'Asse') return false;

          if (saigon9.o !== 'JAP' || saigon9.fac !== 'Asse') return false;



          // b) Attacco a Pearl Harbor (7 dicembre 1941)

          const haw9 = resolveFeature({ id: 'US_HI', properties: { CNTR_CODE: 'US', NUTS_ID: 'US_HI', NAME: 'Hawaii' } }, 9);

          if (haw9.o !== 'USA' || haw9.fac !== 'Alleati' || !haw9.note?.includes('Pearl Harbor')) return false;



          // c) Conquista di Hong Kong (resa britannica il 25 dicembre 1941)

          const hk9 = resolveFeature({ id: 'CHN_HONGKONG', properties: { CNTR_CODE: 'CN_PROV', NUTS_ID: 'CHN_HONGKONG', NAME: 'Hong Kong' } }, 9);

          if (hk9.o !== 'JAP' || hk9.fac !== 'Asse' || !hk9.note?.includes('25 dicembre 1941')) return false;



          // d) Conquista delle isole di Guam (10 dicembre) e Wake (23 dicembre)

          const guam9 = resolveFeature({ id: 'GU', properties: { CNTR_CODE: 'GU', NUTS_ID: 'GU', NAME: 'Guam' } }, 9);

          const wake9 = resolveFeature({ id: 'UM_WAKE', properties: { CNTR_CODE: 'UM', NUTS_ID: 'UM_WAKE', NAME: 'Wake Island' } }, 9);

          if (guam9.o !== 'JAP' || guam9.fac !== 'Asse' || !guam9.note?.includes('10 dicembre')) return false;

          if (wake9.o !== 'JAP' || wake9.fac !== 'Asse' || !wake9.note?.includes('23 dicembre')) return false;



          // e) Invasione in corso della Malesia britannica (sbarco a Kota Bharu l'8 dicembre, caduta di Penang a metà mese; Singapore ancora britannica)

          const kelantan9 = resolveFeature({ id: 'MY03', properties: { CNTR_CODE: 'MY', NUTS_ID: 'MY03', NAME: 'Kelantan' } }, 9);

          const penang9 = resolveFeature({ id: 'MY07', properties: { CNTR_CODE: 'MY', NUTS_ID: 'MY07', NAME: 'Pulau Pinang' } }, 9);

          const sing9 = resolveFeature({ id: 'SG01', properties: { CNTR_CODE: 'SG', NUTS_ID: 'SG01', NAME: 'Singapore' } }, 9);

          if (kelantan9.o !== 'JAP' || kelantan9.fac !== 'Asse' || !kelantan9.note?.includes('Kota Bharu')) return false;

          if (penang9.o !== 'JAP' || penang9.fac !== 'Asse' || !penang9.note?.includes('Penang')) return false;

          if (sing9.o !== 'UK' || sing9.fac !== 'Alleati') return false;



          // f) Invasione delle Filippine (sbarchi a Luzon e Davao a dicembre; Manila dichiarata città aperta il 26 dicembre; resistenza a Bataan e Corregidor)

          const ilocos9 = resolveFeature({ id: 'PH01', properties: { CNTR_CODE: 'PH', NUTS_ID: 'PH01', NAME: 'Ilocos' } }, 9);

          const davao9 = resolveFeature({ id: 'PH11', properties: { CNTR_CODE: 'PH', NUTS_ID: 'PH11', NAME: 'Davao' } }, 9);

          const manila9 = resolveFeature({ id: 'PH00', properties: { CNTR_CODE: 'PH', NUTS_ID: 'PH00', NAME: 'Metropolitan Manila' } }, 9);

          const bataan9 = resolveFeature({ id: 'PH03', properties: { CNTR_CODE: 'PH', NUTS_ID: 'PH03', NAME: 'Central Luzon' } }, 9);

          if (ilocos9.o !== 'JAP' || ilocos9.fac !== 'Asse') return false;

          if (davao9.o !== 'JAP' || davao9.fac !== 'Asse') return false;

          if (manila9.o !== 'PHL' || manila9.fac !== 'Alleati' || !manila9.note?.includes('26 dicembre')) return false;

          if (bataan9.o !== 'PHL' || bataan9.fac !== 'Alleati' || !bataan9.note?.includes('Bataan')) return false;



          // g) Thailandia: costretta all'armistizio l'8 dicembre e all'alleanza con Tokyo il 21 dicembre 1941

          const sia9 = resolveFeature({ properties: { CNTR_CODE: 'SIA', NAME: 'Thailand' } }, 9);

          const siaHb9 = resolveHB({ properties: { NAME: 'Thailand' } }, 9);

          if (sia9.o !== 'SIA' || sia9.fac !== 'Asse' || !sia9.note?.includes('21 dicembre')) return false;

          if (siaHb9.o !== 'SIA' || siaHb9.fac !== 'Asse') return false;



          // h) Gain territoriali thailandesi in Indocina (Trattato di Tokyo del 9 maggio 1941: Battambang, Sisophon, Sayaboury, Champasack)

          const batt9 = resolveFeature({ id: 'KH2', properties: { CNTR_CODE: 'KH', NUTS_ID: 'KH2', NAME: 'Battambang' } }, 9);

          const siso9 = resolveFeature({ id: 'KH1', properties: { CNTR_CODE: 'KH', NUTS_ID: 'KH1', NAME: 'Banteay Meanchey' } }, 9);

          const sayab9 = resolveFeature({ id: 'LAXA', properties: { CNTR_CODE: 'LA', NUTS_ID: 'LAXA', NAME: 'Xaignabouly' } }, 9);

          const champ9 = resolveFeature({ id: 'LACH', properties: { CNTR_CODE: 'LA', NUTS_ID: 'LACH', NAME: 'Champasack' } }, 9);

          const ratan9 = resolveFeature({ id: 'KH16', properties: { CNTR_CODE: 'KH', NUTS_ID: 'KH16', NAME: 'Ratanak Kiri' } }, 9);

          if (batt9.o !== 'SIA' || batt9.fac !== 'Asse' || !batt9.name.includes('Phra Tabong')) return false;

          if (siso9.o !== 'SIA' || siso9.fac !== 'Asse' || !siso9.name.includes('Phra Tabong')) return false;

          if (sayab9.o !== 'SIA' || sayab9.fac !== 'Asse' || !sayab9.name.includes('Lan Chang')) return false;

          if (champ9.o !== 'SIA' || champ9.fac !== 'Asse' || !champ9.name.includes('Nakhon Champassak')) return false;

          if (ratan9.o !== 'JAP' || ratan9.fac !== 'Asse') return false;



          return true;

        }

      },

      {

        name: '91. Audit Dinamismo Integrale dei Layer Tattici nella Timeline (Fortificazioni, Basi Navali, Rotte di Convoglio e Nuclei Insulari)',

        run: () => {

          // 1. Linee Difensive (Fortifications)

          const mozhaysk = HISTORICAL_FORTIFICATION_LINES.find((f) => f.id === 'mozhaysk_line');

          const kaur = HISTORICAL_FORTIFICATION_LINES.find((f) => f.id === 'kaur_leningrad_line');

          const siegfried = HISTORICAL_FORTIFICATION_LINES.find((f) => f.id === 'siegfried_line');

          const mannerheim = HISTORICAL_FORTIFICATION_LINES.find((f) => f.id === 'mannerheim_line');

          const molotov = HISTORICAL_FORTIFICATION_LINES.find((f) => f.id === 'molotov_line');

          const vallo = HISTORICAL_FORTIFICATION_LINES.find((f) => f.id === 'vallo_alpino');

          const salpa = HISTORICAL_FORTIFICATION_LINES.find((f) => f.id === 'salpa_line');



          if (!mozhaysk || !mozhaysk.activeSteps.includes(9)) return false;

          if (!kaur || !kaur.activeSteps.includes(9)) return false;

          if (!siegfried || !siegfried.activeSteps.includes(9)) return false;

          if (!vallo || !vallo.activeSteps.includes(9)) return false;

          if (!salpa || !salpa.activeSteps.includes(9)) return false;

          if (!mannerheim || mannerheim.activeSteps.includes(9)) return false; // Non attiva nel dic 1941

          if (!molotov || molotov.activeSteps.includes(9)) return false; // Travolta all'inizio di Barbarossa



          // 2. Basi Navali (Naval Bases) Dinamiche

          const brest = HISTORICAL_NAVAL_BASES.find((b) => b.id === 'brest')!;

          const hanko = HISTORICAL_NAVAL_BASES.find((b) => b.id === 'hanko')!;

          const massawa = HISTORICAL_NAVAL_BASES.find((b) => b.id === 'massawa')!;

          const tobruk = HISTORICAL_NAVAL_BASES.find((b) => b.id === 'tobruk_naval')!;

          const hongKong = HISTORICAL_NAVAL_BASES.find((b) => b.id === 'hong_kong_naval')!;

          const guam = HISTORICAL_NAVAL_BASES.find((b) => b.id === 'guam_naval')!;

          const cavite = HISTORICAL_NAVAL_BASES.find((b) => b.id === 'cavite_manila')!;

          const saigon = HISTORICAL_NAVAL_BASES.find((b) => b.id === 'saigon_naval')!;

          const odessa = HISTORICAL_NAVAL_BASES.find((b) => b.id === 'odessa')!;

          const toulon = HISTORICAL_NAVAL_BASES.find((b) => b.id === 'toulon')!;



          // Brest: Francia prima del 1940 -> Germania Kriegsmarine U-Boot dal giugno 1940

          const brest0 = getDynamicNavalBaseStatus(brest, 0);

          const brest6 = getDynamicNavalBaseStatus(brest, 6);

          const brest9 = getDynamicNavalBaseStatus(brest, 9);

          if (brest0.nation !== 'Francia') return false;

          if (!brest6.nation.includes('Germania') || !brest6.description.includes('U-Boot')) return false;

          if (!brest9.nation.includes('Germania')) return false;



          // Hanko: Finlandia (1936) -> URSS (1940-1941) -> Riconquistata dalla Finlandia (dic 1941)

          const hanko0 = getDynamicNavalBaseStatus(hanko, 0);

          const hanko6 = getDynamicNavalBaseStatus(hanko, 6);

          const hanko9 = getDynamicNavalBaseStatus(hanko, 9);

          if (hanko0.nation !== 'Finlandia') return false;

          if (hanko6.nation !== 'URSS') return false;

          if (hanko9.nation !== 'Finlandia' || !hanko9.historicalName?.includes('Riconquistata')) return false;



          // Massaua & Tobruk: Italia prima del 1941 -> Gran Bretagna / Commonwealth nel 1941

          const mass0 = getDynamicNavalBaseStatus(massawa, 0);

          const mass8 = getDynamicNavalBaseStatus(massawa, 8);

          const tobruk0 = getDynamicNavalBaseStatus(tobruk, 0);

          const tobruk8 = getDynamicNavalBaseStatus(tobruk, 8);

          if (!mass0.nation.includes('Italia') || !mass8.nation.includes('Regno Unito')) return false;

          if (!tobruk0.nation.includes('Italia') || !tobruk8.nation.includes('Commonwealth')) return false;



          // Hong Kong, Guam, Cavite nel dicembre 1941

          const hk0 = getDynamicNavalBaseStatus(hongKong, 0);

          const hk9 = getDynamicNavalBaseStatus(hongKong, 9);

          const guam0 = getDynamicNavalBaseStatus(guam, 0);

          const guam9 = getDynamicNavalBaseStatus(guam, 9);

          const cav0 = getDynamicNavalBaseStatus(cavite, 0);

          const cav9 = getDynamicNavalBaseStatus(cavite, 9);

          if (hk0.nation !== 'Regno Unito' || !hk9.nation.includes('Giappone')) return false;

          if (guam0.nation !== 'USA' || !guam9.nation.includes('Giappone')) return false;

          if (!cav0.nation.includes('USA') || !cav9.description.includes('Bataan') || !cav9.description.includes('Corregidor')) return false;



          // Tolone & Saigon & Odessa

          const toulon6 = getDynamicNavalBaseStatus(toulon, 6);

          const saigon9 = getDynamicNavalBaseStatus(saigon, 9);

          const odessa9 = getDynamicNavalBaseStatus(odessa, 9);

          if (toulon6.nation !== 'Francia di Vichy') return false;

          if (!saigon9.nation.includes('Giappone')) return false;

          if (!odessa9.nation.includes('Romania') || !odessa9.description.includes('Transnistria')) return false;



          // 3. Rotte Marittime (Sea Lanes)

          const arctic = HISTORICAL_SEA_LANES.find((s) => s.id === 'arctic_convoys');

          const axisLibya = HISTORICAL_SEA_LANES.find((s) => s.id === 'axis_libya_convoy');

          const persian = HISTORICAL_SEA_LANES.find((s) => s.id === 'persian_corridor_sealane');

          const med = HISTORICAL_SEA_LANES.find((s) => s.id === 'mediterranean_suez_lifeline')!;

          const pac = HISTORICAL_SEA_LANES.find((s) => s.id === 'transpacific_us_hawaii')!;



          if (!arctic || !arctic.activeSteps?.includes(9)) return false;

          if (!axisLibya || !axisLibya.activeSteps?.includes(6) || !axisLibya.activeSteps?.includes(9)) return false;

          if (!persian || !persian.activeSteps?.includes(9)) return false;



          const med0 = getDynamicSeaLaneStatus(med, 0);

          const med6 = getDynamicSeaLaneStatus(med, 6);

          if (med0.isContested) return false;

          if (!med6.isContested || !med6.description.includes('Rotta del Capo')) return false;



          const pac0 = getDynamicSeaLaneStatus(pac, 0);

          const pac9 = getDynamicSeaLaneStatus(pac, 9);

          if (pac0.isContested) return false;

          if (!pac9.isContested || !pac9.description.includes('Pearl Harbor')) return false;



          // 4. Nuclei Insulari Dinamici

          const guamLbl0 = getStrategicIslandLabel('GU_GUAM', 0);

          const guamLbl9 = getStrategicIslandLabel('GU_GUAM', 9);

          const wakeLbl0 = getStrategicIslandLabel('WK_WAKE', 0);

          const wakeLbl9 = getStrategicIslandLabel('WK_WAKE', 9);

          const reunLbl0 = getStrategicIslandLabel('RE_REUNION', 0);

          const reunLbl7 = getStrategicIslandLabel('RE_REUNION', 7);

          if (guamLbl0 !== 'Guam (USA)' || guamLbl9 !== 'Guam / Omiya Jima (JAP)') return false;

          if (wakeLbl0 !== 'Wake (USA)' || wakeLbl9 !== 'Wake / Otori Jima (JAP)') return false;

          if (reunLbl0 !== 'La Réunion (FRA)' || reunLbl7 !== 'La Réunion (VIC)') return false;



          return true;

        },

      },

      {

        name: "92. Audit Geostorico e Topologico Integrale Step 10 (AGO 1942 — Situazione al 31 agosto 1942: Fall Blau al Picco dell'Avanzata con Crimea/Sebastopoli, Rostov, Kuban', Majkop, Vetta dell'Elbrus e Arrivo sul Volga a Stalingrado; Avanzata di Rommel in Egitto fino a El Alamein / Alam el Halfa; Massima Estensione Storica dell'Impero Giapponese con Caduta di Singapore e Malesia, Resa delle Indie Orientali Olandesi, Capitolazione Americana a Bataan/Corregidor nelle Filippine, Conquista della Birmania e Taglio della Burma Road, Occupazione di Attu e Kiska nelle Aleutine e Perimetro Difensivo di Rabaul/Nuova Guinea/Salomone/Guadalcanal; Europa Occidentale e Nordafrica ancora divisi tra Zona Occupata e Vichy; Entrata in Guerra di Brasile e Messico)",

        run: () => {

          if (STEPS.length < 11 || STEPS[10].d !== 'AGO 1942') return false;



          // 1. Fronte Orientale al picco dell'avanzata (Fall Blau — Estate 1942)

          // a) Crimea completamente sotto controllo tedesco (Sebastopoli caduta il 4 luglio 1942)

          const sev9 = resolveSovietProvince('SOV_ADM1_UKR_99_Sevastopol', 9);

          const sev10 = resolveSovietProvince('SOV_ADM1_UKR_99_Sevastopol', 10);

          const crim10 = resolveSovietProvince('SOV_ADM1_UKR_91_Autonomous_Republic_of_Crimea', 10);

          if (!sev9 || sev9.o !== 'SOV' || !sev10 || sev10.o !== 'GER' || sev10.fac !== 'Asse' || !sev10.note?.includes('4 luglio 1942')) return false;

          if (!crim10 || crim10.o !== 'GER' || crim10.fac !== 'Asse') return false;



          // b) Gruppo d'Armate A: Rostov, steppa del Kuban' (Krasnodar), campi petroliferi di Majkop (Adygea) e vetta dell'Elbrus (Kabardino-Balkaria, 21 agosto 1942)

          const rostov10 = resolveSovietProvince('SOV_ADM1_RUS_17_Rostov_Oblast', 10);

          const kuban10 = resolveSovietProvince('SOV_ADM1_RUS_39_Krasnodar_Krai', 10);

          const maikop10 = resolveSovietProvince('SOV_ADM1_RUS_19_Adygea', 10);

          const elbrus10 = resolveSovietProvince('SOV_ADM1_RUS_38_Kabardino_Balkaria', 10);

          const stavr10 = resolveSovietProvince('SOV_ADM1_RUS_54_Stavropol_Krai', 10);

          const kalm10 = resolveSovietProvince('SOV_ADM1_RUS_70_Kalmykia', 10);

          const voro10 = resolveSovietProvince('SOV_ADM1_UKR_86_Luhansk_Oblast', 10);

          if (!rostov10 || rostov10.o !== 'GER' || rostov10.fac !== 'Asse' || !rostov10.note?.includes('24 luglio 1942')) return false;

          if (!kuban10 || kuban10.o !== 'GER' || kuban10.fac !== 'Asse' || !kuban10.note?.includes('Kuban')) return false;

          if (!maikop10 || maikop10.o !== 'GER' || maikop10.fac !== 'Asse' || !maikop10.note?.includes('Majkop')) return false;

          if (!elbrus10 || elbrus10.o !== 'GER' || elbrus10.fac !== 'Asse' || !elbrus10.note?.includes('Elbrus') || !elbrus10.note?.includes('21 agosto')) return false;

          if (!stavr10 || stavr10.o !== 'GER' || !kalm10 || kalm10.o !== 'GER' || !voro10 || voro10.o !== 'GER') return false;



          // c) Gruppo d'Armate B sul Volga a nord di Stalingrado il 23 agosto 1942 (città difesa dall'Armata Rossa)

          const stal10 = resolveSovietProvince('SOV_ADM1_RUS_13_Volgograd_Oblast', 10);

          if (!stal10 || stal10.o !== 'SOV' || stal10.fac !== 'Comintern' || !stal10.note?.includes('23 agosto 1942') || !stal10.note?.includes('227')) return false;



          // 2. Nordafrica: riconquista italo-tedesca della Cirenaica (Tobruk 21 giugno 1942) e massima penetrazione in Egitto fino alla linea di El Alamein / Alam el Halfa

          const tobruk9 = resolveFeature({ id: 'LYBU', properties: { CNTR_CODE: 'LY', NUTS_ID: 'LYBU', NAME: 'Al Butnan' } }, 9);

          const tobruk10 = resolveFeature({ id: 'LYBU', properties: { CNTR_CODE: 'LY', NUTS_ID: 'LYBU', NAME: 'Al Butnan' } }, 10);

          const matruh9 = resolveFeature({ id: 'EGMT', properties: { CNTR_CODE: 'EG', NUTS_ID: 'EGMT', NAME: 'Matrouh' } }, 9);

          const matruh10 = resolveFeature({ id: 'EGMT', properties: { CNTR_CODE: 'EG', NUTS_ID: 'EGMT', NAME: 'Matrouh' } }, 10);

          const alex10 = resolveFeature({ id: 'EGALX', properties: { CNTR_CODE: 'EG', NUTS_ID: 'EGALX', NAME: 'Alexandria' } }, 10);

          if (tobruk9.o !== 'UK' || tobruk10.o !== 'ITA' || tobruk10.fac !== 'Asse') return false;

          if (matruh9.o !== 'EGY' || matruh10.o !== 'ITA' || matruh10.fac !== 'Asse' || !matruh10.note?.includes('El Alamein') || !matruh10.note?.includes('Alam el Halfa')) return false;

          if (alex10.o !== 'EGY' || alex10.fac !== 'Alleati') return false;



          // 3. Impero Giapponese alla sua estensione storica massima

          // a) Caduta di Singapore e completamento della Malesia (15 febbraio 1942)

          const sing9 = resolveFeature({ id: 'SG01', properties: { CNTR_CODE: 'SG', NUTS_ID: 'SG01', NAME: 'Singapore' } }, 9);

          const sing10 = resolveFeature({ id: 'SG01', properties: { CNTR_CODE: 'SG', NUTS_ID: 'SG01', NAME: 'Singapore' } }, 10);

          const johor10 = resolveFeature({ id: 'MY01', properties: { CNTR_CODE: 'MY', NUTS_ID: 'MY01', NAME: 'Johor' } }, 10);

          if (sing9.o !== 'UK' || sing10.o !== 'JAP' || sing10.fac !== 'Asse' || !sing10.name.includes('Shōnan-tō') || !sing10.note?.includes('15 febbraio 1942')) return false;

          if (johor10.o !== 'JAP' || johor10.fac !== 'Asse') return false;



          // b) Resa delle Indie Orientali Olandesi (Kalijati, 8-9 marzo 1942) e Timor Portoghese

          const batavia9 = resolveFeature({ id: 'IDJK', properties: { CNTR_CODE: 'ID', NUTS_ID: 'IDJK', NAME: 'Jakarta' } }, 9);

          const batavia10 = resolveFeature({ id: 'IDJK', properties: { CNTR_CODE: 'ID', NUTS_ID: 'IDJK', NAME: 'Jakarta' } }, 10);

          const palembang10 = resolveFeature({ id: 'IDSS', properties: { CNTR_CODE: 'ID', NUTS_ID: 'IDSS', NAME: 'Sumatera Selatan' } }, 10);

          const timor10 = resolveFeature({ id: 'TL', properties: { CNTR_CODE: 'TL', NUTS_ID: 'TL', NAME: 'Timor-Leste' } }, 10);

          if (batavia9.o !== 'HOL' || batavia10.o !== 'JAP' || batavia10.fac !== 'Asse' || !batavia10.note?.includes('Kalijati')) return false;

          if (palembang10.o !== 'JAP' || timor10.o !== 'JAP') return false;



          // c) Capitolazione americana nelle Filippine (Bataan 9 aprile, Corregidor 6 maggio 1942)

          const manila9 = resolveFeature({ id: 'PH00', properties: { CNTR_CODE: 'PH', NUTS_ID: 'PH00', NAME: 'Metropolitan Manila' } }, 9);

          const manila10 = resolveFeature({ id: 'PH00', properties: { CNTR_CODE: 'PH', NUTS_ID: 'PH00', NAME: 'Metropolitan Manila' } }, 10);

          const bataan10 = resolveFeature({ id: 'PH03', properties: { CNTR_CODE: 'PH', NUTS_ID: 'PH03', NAME: 'Central Luzon' } }, 10);

          const correg10 = resolveFeature({ id: 'PH40', properties: { CNTR_CODE: 'PH', NUTS_ID: 'PH40', NAME: 'Calabarzon' } }, 10);

          if (manila9.o !== 'PHL' || manila10.o !== 'JAP' || manila10.fac !== 'Asse') return false;

          if (bataan10.o !== 'JAP' || !bataan10.note?.includes('9 aprile 1942')) return false;

          if (correg10.o !== 'JAP' || !correg10.note?.includes('6 maggio 1942')) return false;



          // d) Conquista della Birmania (maggio 1942) che taglia la Strada della Birmania, e occupazione delle Andamane e Nicobare

          const rangoon9 = resolveFeature({ id: 'MM_RAN', properties: { CNTR_CODE: 'MM', NUTS_ID: 'MM_RAN', NAME: 'Rangoon' } }, 9);

          const rangoon10 = resolveFeature({ id: 'MM_RAN', properties: { CNTR_CODE: 'MM', NUTS_ID: 'MM_RAN', NAME: 'Rangoon' } }, 10);

          const shan10 = resolveFeature({ id: 'MM_SHA', properties: { CNTR_CODE: 'MM', NUTS_ID: 'MM_SHA', NAME: 'Shan' } }, 10);

          const andaman10 = resolveFeature({ id: 'IN_ANI', properties: { CNTR_CODE: 'IN', NUTS_ID: 'IN_ANI', NAME: 'Andaman and Nicobar' } }, 10);

          const assam10 = resolveFeature({ id: 'IN_ASS', properties: { CNTR_CODE: 'IN', NUTS_ID: 'IN_ASS', NAME: 'Assam' } }, 10);

          if (rangoon9.o !== 'UK' || rangoon10.o !== 'JAP' || rangoon10.fac !== 'Asse') return false;

          if (shan10.o !== 'JAP' || !shan10.note?.includes('Lashio')) return false;

          if (andaman10.o !== 'JAP' || assam10.o !== 'RAJ' || !assam10.note?.includes('The Hump')) return false;



          // e) Territorio USA occupato: isole di Attu e Kiska nelle Aleutine occidentali (giugno 1942) — verifica anche la scissione topologica GeoJSON

          const aleutFeat = loadedProvs.find((f: any) => f.id === 'US_AK_ALEUTIANS_WEST');

          const akMainFeat = loadedProvs.find((f: any) => f.id === 'US_AK');

          if (!aleutFeat || !akMainFeat) return false;

          const aleut9 = resolveFeature(aleutFeat, 9);

          const aleut10 = resolveFeature(aleutFeat, 10);

          const akMain10 = resolveFeature(akMainFeat, 10);

          if (aleut9.o !== 'USA' || aleut10.o !== 'JAP' || aleut10.fac !== 'Asse' || !aleut10.name.includes('Attu e Kiska')) return false;

          if (akMain10.o !== 'USA' || akMain10.fac !== 'Alleati') return false;



          // f) Pacifico meridionale e centrale: Rabaul, Lae-Salamaua, Buna-Gona, Salomone/Guadalcanal e Nauru sotto presidio JAP; Port Moresby e Milne Bay alleate; Midway USA

          const rabaul10 = resolveFeature({ id: 'PGEBR', properties: { CNTR_CODE: 'PG', NUTS_ID: 'PGEBR', NAME: 'East New Britain' } }, 10);

          const buna10 = resolveFeature({ id: 'PGNPP', properties: { CNTR_CODE: 'PG', NUTS_ID: 'PGNPP', NAME: 'Northern' } }, 10);

          const moresby10 = resolveFeature({ id: 'PGNCD', properties: { CNTR_CODE: 'PG', NUTS_ID: 'PGNCD', NAME: 'National Capital District' } }, 10);

          const solom10 = resolveFeature({ id: 'SB', properties: { CNTR_CODE: 'SB', NUTS_ID: 'SB', NAME: 'Solomon Islands' } }, 10);

          const nauru10 = resolveFeature({ id: 'NR_NAURU', properties: { CNTR_CODE: 'NR', NUTS_ID: 'NR_NAURU', NAME: 'Nauru' } }, 10);

          const midway10 = resolveFeature({ id: 'UM_MIDWAY', properties: { CNTR_CODE: 'UM', NUTS_ID: 'UM_MIDWAY', NAME: 'Midway Atoll' } }, 10);

          if (rabaul10.o !== 'JAP' || buna10.o !== 'JAP' || moresby10.o !== 'AST') return false;

          if (solom10.o !== 'JAP' || !solom10.note?.includes('Guadalcanal')) return false;

          if (nauru10.o !== 'JAP' || midway10.o !== 'USA' || !midway10.note?.includes('Midway')) return false;



          // 4. Europa occidentale e Nordafrica francese ancora differenziati (Zona Occupata vs Zone libre di Vichy; Marocco, Algeria e Tunisia sotto Vichy)

          const paris10 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FR101', NAME: 'Paris' } }, 10);

          const dieppe10 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRD22', NAME: 'Seine-Maritime' } }, 10);

          const vichy10 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRK11', NAME: 'Allier' } }, 10);

          const marseille10 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRL04', NAME: 'Bouches-du-Rhône' } }, 10);

          const algiers10 = resolveFeature({ id: 'DZ_ALG', properties: { CNTR_CODE: 'DZ', NUTS_ID: 'DZ_ALG', NAME: 'Algiers' } }, 10);

          const morocco10 = resolveFeature({ id: 'FR_MOROCCO', properties: { id: 'FR_MOROCCO', CNTR_CODE: 'FR_MOROCCO', NAME: 'Morocco (France)' } }, 10);

          const tunis10 = resolveFeature({ id: 'TN', properties: { CNTR_CODE: 'TN', NUTS_ID: 'TN', NAME: 'Tunisia' } }, 10);

          if (paris10.o !== 'GER' || dieppe10.o !== 'GER') return false;

          if (vichy10.o !== 'VIC' || marseille10.o !== 'VIC') return false;

          if (algiers10.o !== 'VIC_NAF' || morocco10.o !== 'VIC_NAF' || tunis10.o !== 'VIC_NAF') return false;



          // 5. Nuovi belligeranti alleati in America Latina (Messico maggio 1942, Brasile agosto 1942)

          const mex9 = resolveFeature({ id: 'MX_DIF', properties: { CNTR_CODE: 'MX', NUTS_ID: 'MX_DIF', NAME: 'Ciudad de México' } }, 9);

          const mex10 = resolveFeature({ id: 'MX_DIF', properties: { CNTR_CODE: 'MX', NUTS_ID: 'MX_DIF', NAME: 'Ciudad de México' } }, 10);

          const bra9 = resolveFeature({ id: 'BR_RJ', properties: { CNTR_CODE: 'BR', NUTS_ID: 'BR_RJ', NAME: 'Rio de Janeiro' } }, 9);

          const bra10 = resolveFeature({ id: 'BR_RJ', properties: { CNTR_CODE: 'BR', NUTS_ID: 'BR_RJ', NAME: 'Rio de Janeiro' } }, 10);

          if (mex9.fac !== 'Neutrale' || mex10.fac !== 'Alleati') return false;

          if (bra9.fac !== 'Neutrale' || bra10.fac !== 'Alleati') return false;



          // 6. Layer Tattici Dinamici nello Step 10 (Fortificazioni, Basi Navali, Rotte Marittime, Isole)

          const elAlamein = HISTORICAL_FORTIFICATION_LINES.find((f) => f.id === 'el_alamein_line');

          const stalingradLine = HISTORICAL_FORTIFICATION_LINES.find((f) => f.id === 'stalingrad_volga_line');

          const atlanticWall = HISTORICAL_FORTIFICATION_LINES.find((f) => f.id === 'atlantic_wall_1942');

          if (!elAlamein || !elAlamein.activeSteps.includes(10)) return false;

          if (!stalingradLine || !stalingradLine.activeSteps.includes(10)) return false;

          if (!atlanticWall || !atlanticWall.activeSteps.includes(10)) return false;



          const singBase = getDynamicNavalBaseStatus(HISTORICAL_NAVAL_BASES.find((b) => b.id === 'singapore')!, 10);

          const sevBase = getDynamicNavalBaseStatus(HISTORICAL_NAVAL_BASES.find((b) => b.id === 'sevastopol')!, 10);

          const tobBase = getDynamicNavalBaseStatus(HISTORICAL_NAVAL_BASES.find((b) => b.id === 'tobruk_naval')!, 10);

          const cavBase = getDynamicNavalBaseStatus(HISTORICAL_NAVAL_BASES.find((b) => b.id === 'cavite_manila')!, 10);

          const diegoBase = getDynamicNavalBaseStatus(HISTORICAL_NAVAL_BASES.find((b) => b.id === 'diego_suarez')!, 10);

          if (!singBase.nation.includes('Giappone') || !singBase.historicalName?.includes('Shōnan-tō')) return false;

          if (!sevBase.nation.includes('Germania') || !sevBase.historicalName?.includes('4 Luglio 1942')) return false;

          if (!tobBase.nation.includes('Italia') || !tobBase.historicalName?.includes('21 Giugno 1942')) return false;

          if (!cavBase.nation.includes('Giappone') || !cavBase.historicalName?.includes('6 Maggio 1942')) return false;

          if (!diegoBase.nation.includes('Regno Unito') || !diegoBase.historicalName?.includes('Ironclad')) return false;



          if (getStrategicIslandLabel('US_AK_ALEUTIANS_WEST', 9) !== 'Attu & Kiska (USA)') return false;

          if (getStrategicIslandLabel('US_AK_ALEUTIANS_WEST', 10) !== 'Attu & Kiska (JAP)') return false;

          if (getStrategicIslandLabel('NR_NAURU', 10) !== 'Nauru (JAP)') return false;



          return true;

        },

      },

      {

        name: "93. Audit Geostorico e Topologico Integrale Step 11 (NOV 1942 · LA GRANDE SVOLTA — Uranus, Torch, El Alamein & Operazione Anton: Sacca di Stalingrado / Kessel accerchiato a Kalač-na-Donu; Sfondamento ad El Alamein e Cirenaica liberata con Tobruk e Bengasi fino ad El Agheila; Operazione Torch con Marocco e Algeria agli Alleati; Presa di Biserta e Tunisi come testa di ponte Asse; Collasso di Vichy metropolitana con Operazione Anton, occupazione italiana estesa di Nizza/Tolone/Corsica/Monaco e Wehrmacht nel resto della Francia; Autoaffondamento della Flotta a Tolone; Ralliement di AOF/Dakar e Resa di Madagascar; Vittoria Aeronavale USA a Guadalcanal; Fortificazioni Kessel e Rotte di Convoglio Dinamiche)",

        run: () => {

          if (STEPS.length < 12 || STEPS[11].d !== 'NOV 1942') return false;



          // 1. Fronte Orientale: Operazione Uranus e la Sacca di Stalingrado (Kessel)

          const kessel10 = resolveSovietProvince('SOV_STALINGRAD_KESSEL', 10);

          const kessel11 = resolveSovietProvince('SOV_STALINGRAD_KESSEL', 11);

          const stalOblast11 = resolveSovietProvince('SOV_ADM1_RUS_13_Volgograd_Oblast', 11);

          if (!kessel10 || kessel10.o !== 'SOV' || kessel10.fac !== 'Comintern') return false;

          if (!kessel11 || kessel11.o !== 'GER' || kessel11.fac !== 'Asse' || !kessel11.name.includes('Kessel')) return false;

          if (!stalOblast11 || stalOblast11.o !== 'SOV' || stalOblast11.fac !== 'Comintern' || !stalOblast11.name.includes('Uranus')) return false;



          const elbrus11 = resolveSovietProvince('SOV_ADM1_RUS_38_Kabardino_Balkaria', 11);

          const northOssetia11 = resolveSovietProvince('SOV_ADM1_RUS_35_North_Ossetia_Alania', 11);

          if (!elbrus11 || elbrus11.o !== 'GER' || !elbrus11.note?.includes('Nal\'čik')) return false;

          if (!northOssetia11 || northOssetia11.o !== 'SOV' || !northOssetia11.note?.includes('Gizel')) return false;



          // 2. Nordafrica & Mediterraneo: El Alamein infranta, Cirenaica liberata, Torch in Marocco e Algeria, Tunisia all'Asse

          const matruh10 = resolveFeature({ id: 'EGMT', properties: { CNTR_CODE: 'EG', NUTS_ID: 'EGMT', NAME: 'Matrouh' } }, 10);

          const matruh11 = resolveFeature({ id: 'EGMT', properties: { CNTR_CODE: 'EG', NUTS_ID: 'EGMT', NAME: 'Matrouh' } }, 11);

          const tobruk11 = resolveFeature({ id: 'LYBU', properties: { CNTR_CODE: 'LY', NUTS_ID: 'LYBU', NAME: 'Al Butnan' } }, 11);

          const benghazi11 = resolveFeature({ id: 'LYBA', properties: { CNTR_CODE: 'LY', NUTS_ID: 'LYBA', NAME: 'Benghazi' } }, 11);

          const sirte11 = resolveFeature({ id: 'LYSR', properties: { CNTR_CODE: 'LY', NUTS_ID: 'LYSR', NAME: 'Sirte' } }, 11);

          if (matruh10.o !== 'ITA' || matruh11.o !== 'EGY' || matruh11.fac !== 'Alleati') return false;

          if (tobruk11.o !== 'UK' || tobruk11.fac !== 'Alleati' || !tobruk11.name.includes('Liberata')) return false;

          if (benghazi11.o !== 'UK' || benghazi11.fac !== 'Alleati' || !benghazi11.name.includes('Liberata')) return false;

          if (sirte11.o !== 'ITA' || sirte11.fac !== 'Asse') return false;



          const algiers10 = resolveFeature({ id: 'DZ16', properties: { CNTR_CODE: 'DZ', NUTS_ID: 'DZ16', NAME: 'Alger' } }, 10);

          const algiers11 = resolveFeature({ id: 'DZ16', properties: { CNTR_CODE: 'DZ', NUTS_ID: 'DZ16', NAME: 'Alger' } }, 11);

          const casablanca10 = resolveFeature({ id: 'MA06', properties: { CNTR_CODE: 'MA', NUTS_ID: 'MA06', NAME: 'Casablanca' } }, 10);

          const casablanca11 = resolveFeature({ id: 'MA06', properties: { CNTR_CODE: 'MA', NUTS_ID: 'MA06', NAME: 'Casablanca' } }, 11);

          const tunis10 = resolveFeature({ id: 'TN11', properties: { CNTR_CODE: 'TN', NUTS_ID: 'TN11', NAME: 'Tunis' } }, 10);

          const tunis11 = resolveFeature({ id: 'TN11', properties: { CNTR_CODE: 'TN', NUTS_ID: 'TN11', NAME: 'Tunis' } }, 11);

          if (algiers10.o !== 'VIC_NAF' || algiers11.o !== 'FRA' || algiers11.fac !== 'Alleati') return false;

          if (casablanca10.o !== 'VIC_NAF' || casablanca11.o !== 'FRA' || casablanca11.fac !== 'Alleati') return false;

          if (tunis10.o !== 'VIC_NAF' || tunis11.o !== 'GER' || tunis11.fac !== 'Asse' || !tunis11.adminEntity?.includes('Nehring')) return false;



          // 3. Europa occidentale: Operazione Anton, occupazione italiana estesa a Nizza/Tolone/Corsica/Monaco e Wehrmacht nel resto della Francia

          const nice11 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRL03', NAME: 'Alpes-Maritimes' } }, 11);

          const toln11 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRL05', NAME: 'Var' } }, 11);

          const cors11 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRM01', NAME: 'Corse-du-Sud' } }, 11);

          const sav11 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRK27', NAME: 'Savoie' } }, 11);

          const monaco10 = resolveFeature({ properties: { CNTR_CODE: 'MC', NAME: 'Monaco' } }, 10);

          const monaco11 = resolveFeature({ properties: { CNTR_CODE: 'MC', NAME: 'Monaco' } }, 11);

          if (nice11.o !== 'ITA' || nice11.fac !== 'Asse') return false;

          if (toln11.o !== 'ITA' || toln11.fac !== 'Asse') return false;

          if (cors11.o !== 'ITA' || cors11.fac !== 'Asse') return false;

          if (sav11.o !== 'ITA' || sav11.fac !== 'Asse') return false;

          if ((monaco10.o !== 'MC' && monaco10.o !== 'MCO') || monaco11.o !== 'ITA' || monaco11.fac !== 'Asse') return false;



          const vichy10 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRK11', NAME: 'Allier' } }, 10);

          const vichy11 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRK11', NAME: 'Allier' } }, 11);

          const mars11 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRL04', NAME: 'Bouches-du-Rhône' } }, 11);

          const paris11 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FR101', NAME: 'Paris' } }, 11);

          if (vichy10.o !== 'VIC' || vichy11.o !== 'GER' || vichy11.fac !== 'Asse') return false;

          if (mars11.o !== 'GER' || mars11.fac !== 'Asse') return false;

          if (paris11.o !== 'GER' || paris11.fac !== 'Asse') return false;



          const reunion10 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRY40', NAME: 'La Réunion' } }, 10);

          const reunion11 = resolveFeature({ properties: { CNTR_CODE: 'FR', NUTS_ID: 'FRY40', NAME: 'La Réunion' } }, 11);

          if (reunion10.o !== 'VIC' || reunion11.o !== 'FRA' || reunion11.fac !== 'Alleati') return false;



          // 4. Africa Sub-sahariana & Madagascar

          const dakar10 = resolveFeature({ id: 'SN_DAK', properties: { CNTR_CODE: 'SN', NUTS_ID: 'SN_DAK', NAME: 'Dakar' } }, 10);

          const dakar11 = resolveFeature({ id: 'SN_DAK', properties: { CNTR_CODE: 'SN', NUTS_ID: 'SN_DAK', NAME: 'Dakar' } }, 11);

          const mad10 = resolveFeature({ id: 'MDG', properties: { CNTR_CODE: 'MG', NAME: 'Madagascar' } }, 10);

          const mad11 = resolveFeature({ id: 'MDG', properties: { CNTR_CODE: 'MG', NAME: 'Madagascar' } }, 11);

          if (dakar10.o !== 'VIC_AOF' || dakar11.o !== 'F_AOF' || dakar11.fac !== 'Alleati') return false;

          if (mad10.o !== 'VIC_MAD' || mad11.o !== 'UK' || mad11.fac !== 'Alleati') return false;



          const togo10 = resolveFeature({ properties: { CNTR_CODE: 'TG', NAME: 'Togo' } }, 10);

          const togo11 = resolveFeature({ properties: { CNTR_CODE: 'TG', NAME: 'Togo' } }, 11);

          if (togo10.o !== 'VIC_AOF' || togo11.o !== 'F_AOF' || togo11.fac !== 'Alleati' || !togo11.name.includes('Boisson')) return false;



          // 5. Pacifico: Svolta a Guadalcanal

          const solom10 = resolveFeature({ id: 'SB', properties: { CNTR_CODE: 'SB', NUTS_ID: 'SB', NAME: 'Solomon Islands' } }, 10);

          const solom11 = resolveFeature({ id: 'SB', properties: { CNTR_CODE: 'SB', NUTS_ID: 'SB', NAME: 'Solomon Islands' } }, 11);

          if (solom10.o !== 'JAP' || solom11.o !== 'USA' || solom11.fac !== 'Alleati') return false;



          // 6. Layer Tattici Dinamici Step 11

          const kesselLine = HISTORICAL_FORTIFICATION_LINES.find((f) => f.id === 'stalingrad_kessel_line');

          const elAgheila = HISTORICAL_FORTIFICATION_LINES.find((f) => f.id === 'el_agheila_line');

          if (!kesselLine || !kesselLine.activeSteps.includes(11)) return false;

          if (!elAgheila || !elAgheila.activeSteps.includes(11)) return false;



          const tolnBase = getDynamicNavalBaseStatus(HISTORICAL_NAVAL_BASES.find((b) => b.id === 'toulon')!, 11);

          const tobBase11 = getDynamicNavalBaseStatus(HISTORICAL_NAVAL_BASES.find((b) => b.id === 'tobruk_naval')!, 11);

          const bizBase11 = getDynamicNavalBaseStatus(HISTORICAL_NAVAL_BASES.find((b) => b.id === 'bizerte')!, 11);

          const dakBase11 = getDynamicNavalBaseStatus(HISTORICAL_NAVAL_BASES.find((b) => b.id === 'dakar_naval')!, 11);

          if (!tolnBase.historicalName?.includes('Autoaffondamento')) return false;

          if (!tobBase11.nation.includes('Regno Unito') || !tobBase11.historicalName?.includes('13 Novembre 1942')) return false;

          if (!bizBase11.nation.includes('Germania') || !bizBase11.historicalName?.includes('Biserta')) return false;

          if (!dakBase11.nation.includes('Alleati') || !dakBase11.historicalName?.includes('23 Novembre 1942')) return false;



          const medLane11 = getDynamicSeaLaneStatus(HISTORICAL_SEA_LANES.find((l) => l.id === 'mediterranean_suez_lifeline')!, 11);

          const axisLane11 = getDynamicSeaLaneStatus(HISTORICAL_SEA_LANES.find((l) => l.id === 'axis_libya_convoy')!, 11);

          const pacLane11 = getDynamicSeaLaneStatus(HISTORICAL_SEA_LANES.find((l) => l.id === 'transpacific_us_hawaii')!, 11);

          if (!medLane11.statusNote?.includes('Stoneage')) return false;

          if (!axisLane11.statusNote?.includes('Tunisia')) return false;

          if (!pacLane11.statusNote?.includes('Guadalcanal')) return false;



          return true;

        },

      },

      {

        name: "94. Audit Geostorico e Topologico Integrale Step 12 (LUG 1943 — La Fortezza Europa Assediata: Sbarco Alleato in Sicilia / Husky con Patton a Palermo, Montgomery a Siracusa, e Catania/Messina all'Asse; Italia Peninsulare sotto Governo Badoglio; Eliminazione Sacca di Tunisi e Nordafrica Interamente Alleato; Fronte Orientale con Cancellazione Sacca di Stalingrado, Liberazione Caucaso e Rostov, Gotenkopf del Kuban'/Taman', Saliente di Kursk e Controffensiva Kutuzov su Orel; Operazione Cartwheel nella Nuova Georgia / Munda ed Evacuazione Giapponese delle Aleutine ad Attu e Kiska)",

        run: () => {

          if (STEPS.length < 13 || STEPS[12].d !== 'LUG 1943') return false;

          if (!STEPS[12].t.includes('Husky') || !STEPS[12].t.includes('Kursk')) return false;



          // 1. Sicilia divisa in due: Zona Alleata (AMGOT / Patton & Montgomery) vs Zona Asse (Etna & Stretto di Messina)

          const trapani12 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITG11', NAME: 'Trapani' } }, 12);

          const palermo12 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITG12', NAME: 'Palermo' } }, 12);

          const agrigento12 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITG14', NAME: 'Agrigento' } }, 12);

          const caltanissetta12 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITG15', NAME: 'Caltanissetta' } }, 12);

          const enna12 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITG16', NAME: 'Enna' } }, 12);

          const ragusa12 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITG18', NAME: 'Ragusa' } }, 12);

          const siracusa12 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITG19', NAME: 'Siracusa' } }, 12);

          const messina12 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITG13', NAME: 'Messina' } }, 12);

          const catania12 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITG17', NAME: 'Catania' } }, 12);



          if (trapani12.o !== 'USA' || trapani12.fac !== 'Alleati') return false;

          if (palermo12.o !== 'USA' || palermo12.fac !== 'Alleati' || !palermo12.name.includes('Patton')) return false;

          if (agrigento12.o !== 'USA' || agrigento12.fac !== 'Alleati') return false;

          if (caltanissetta12.o !== 'USA' || caltanissetta12.fac !== 'Alleati') return false;

          if (enna12.o !== 'USA' || enna12.fac !== 'Alleati') return false;

          if (ragusa12.o !== 'UK' || ragusa12.fac !== 'Alleati') return false;

          if (siracusa12.o !== 'UK' || siracusa12.fac !== 'Alleati' || !siracusa12.name.includes('Montgomery')) return false;



          if (messina12.o !== 'ITA' || messina12.fac !== 'Asse' || !messina12.name.includes('Messina')) return false;

          if (catania12.o !== 'ITA' || catania12.fac !== 'Asse' || !catania12.name.includes('Etna')) return false;



          // 2. Italia Peninsulare: Governo Badoglio (formale continuità bellica nell'Asse prima dell'armistizio)

          const roma12 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITI43', NAME: 'Roma' } }, 12);

          const napoli12 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITF33', NAME: 'Napoli' } }, 12);

          const ravenna12 = resolveFeature({ properties: { CNTR_CODE: 'IT', NUTS_ID: 'ITH57', NAME: 'Ravenna' } }, 12);

          if (roma12.o !== 'ITA' || roma12.fac !== 'Asse' || !roma12.note?.includes('Badoglio')) return false;

          if (napoli12.o !== 'ITA' || napoli12.fac !== 'Asse') return false;

          if (ravenna12.o !== 'ITA' || ravenna12.fac !== 'Asse' || !ravenna12.name.includes('Ravenna')) return false;



          // 3. Nordafrica interamente Alleato: Sacca di Tunisi eliminata a metà maggio 1943

          const tunis12 = resolveFeature({ id: 'TN11', properties: { CNTR_CODE: 'TN', NUTS_ID: 'TN11', NAME: 'Tunis' } }, 12);

          const bizerte12 = resolveFeature({ id: 'TN_BIZ', properties: { CNTR_CODE: 'TN', NUTS_ID: 'TN_BIZ', NAME: 'Bizerte' } }, 12);

          const tripoli12 = resolveFeature({ id: 'LYTR', properties: { CNTR_CODE: 'LY', NUTS_ID: 'LYTR', NAME: 'Tripoli' } }, 12);

          const benghazi12 = resolveFeature({ id: 'LYBA', properties: { CNTR_CODE: 'LY', NUTS_ID: 'LYBA', NAME: 'Benghazi' } }, 12);

          if ((tunis12.o !== 'F_NAF' && tunis12.o !== 'FRA') || tunis12.fac !== 'Alleati') return false;

          if ((bizerte12.o !== 'F_NAF' && bizerte12.o !== 'FRA') || bizerte12.fac !== 'Alleati') return false;

          if (tripoli12.o !== 'UK' || tripoli12.fac !== 'Alleati') return false;

          if (benghazi12.o !== 'UK' || benghazi12.fac !== 'Alleati') return false;



          // 4. Fronte Orientale (URSS): Stalingrado cancellata, Caucaso & Rostov liberati, Kuban' testa di ponte, Kursk & Orel

          const kessel12 = resolveSovietProvince('SOV_STALINGRAD_KESSEL', 12);

          const rostov12 = resolveSovietProvince('SOV_ADM1_RUS_17_Rostov_Oblast', 12);

          const kursk12 = resolveSovietProvince('SOV_ADM1_RUS_40_Kursk_Oblast', 12);

          const orel12 = resolveSovietProvince('SOV_ADM1_RUS_48_Oryol_Oblast', 12);

          const krasnodar12 = resolveSovietProvince('SOV_ADM1_RUS_39_Krasnodar_Krai', 12);

          const kabardino12 = resolveSovietProvince('SOV_ADM1_RUS_38_Kabardino_Balkaria', 12);

          const stavropol12 = resolveSovietProvince('SOV_ADM1_RUS_54_Stavropol_Krai', 12);



          if (!kessel12 || kessel12.o !== 'SOV' || kessel12.fac !== 'Comintern' || !kessel12.name.includes('Cancellata')) return false;

          if (!rostov12 || rostov12.o !== 'SOV' || rostov12.fac !== 'Comintern' || !rostov12.name.includes('Liberata')) return false;

          if (!kursk12 || kursk12.o !== 'SOV' || kursk12.fac !== 'Comintern' || !kursk12.name.includes('Kursk')) return false;

          if (!orel12 || orel12.o !== 'GER' || orel12.fac !== 'Asse' || !orel12.note?.includes('Kutuzov')) return false;

          if (!krasnodar12 || krasnodar12.o !== 'GER' || krasnodar12.fac !== 'Asse' || !krasnodar12.name.includes('Kuban')) return false;

          if (!kabardino12 || kabardino12.o !== 'SOV' || kabardino12.fac !== 'Comintern') return false;

          if (!stavropol12 || stavropol12.o !== 'SOV' || stavropol12.fac !== 'Comintern') return false;



          // 5. Pacifico & Isole Aleutine: Riconquista di Attu ed Evacuazione di Kiska; Operazione Cartwheel (Munda / New Georgia)

          const aleutFeat = loadedProvs.find((f: any) => f.id === 'US_AK_ALEUTIANS_WEST');

          if (!aleutFeat) return false;

          const aleut12 = resolveFeature(aleutFeat, 12);

          if (aleut12.o !== 'USA' || aleut12.fac !== 'Alleati' || !aleut12.name.includes('Attu & Kiska')) return false;

          if (getStrategicIslandLabel('US_AK_ALEUTIANS_WEST', 12) !== 'Attu & Kiska (USA)') return false;



          const solom12 = resolveFeature({ id: 'SB', properties: { CNTR_CODE: 'SB', NUTS_ID: 'SB', NAME: 'Solomon Islands' } }, 12);

          if (solom12.o !== 'UK' || solom12.fac !== 'Alleati' || !solom12.note?.includes('Cartwheel')) return false;



          // 6. Battaglie Tattiche Step 12

          const huskyBattle = HISTORICAL_BATTLES.find((b: any) => b.id === 'operation_husky_sicily_1943');

          const kurskBattle = HISTORICAL_BATTLES.find((b: any) => b.id === 'battle_of_kursk_prokhorovka_1943');

          const cartwheelBattle = HISTORICAL_BATTLES.find((b: any) => b.id === 'operation_cartwheel_new_georgia_1943');

          const aleutBattle = HISTORICAL_BATTLES.find((b: any) => b.id === 'battle_of_attu_and_kiska_evacuation_1943');

          if (!huskyBattle || huskyBattle.step !== 12) return false;

          if (!kurskBattle || kurskBattle.step !== 12) return false;

          if (!cartwheelBattle || cartwheelBattle.step !== 12) return false;

          if (!aleutBattle || aleutBattle.step !== 12) return false;



          // 7. Linee di Fortificazione e Basi Navali Step 12

          const etnaLine = HISTORICAL_FORTIFICATION_LINES.find((f) => f.id === 'etna_quadrilateral_line');

          const kubanLine = HISTORICAL_FORTIFICATION_LINES.find((f) => f.id === 'gotenkopf_kuban_line');

          const kurskLine = HISTORICAL_FORTIFICATION_LINES.find((f) => f.id === 'kursk_salient_defenses');

          if (!etnaLine || !etnaLine.activeSteps.includes(12)) return false;

          if (!kubanLine || !kubanLine.activeSteps.includes(12)) return false;

          if (!kurskLine || !kurskLine.activeSteps.includes(12)) return false;



          const bizBase12 = getDynamicNavalBaseStatus(HISTORICAL_NAVAL_BASES.find((b) => b.id === 'bizerte')!, 12);

          const augBase12 = getDynamicNavalBaseStatus(HISTORICAL_NAVAL_BASES.find((b) => b.id === 'augusta_messina')!, 12);

          if (!bizBase12.nation.includes('Francia') || !bizBase12.historicalName?.includes('Maggio 1943')) return false;

          if (!augBase12.nation.includes('Regno Unito') || !augBase12.historicalName?.includes('Augusta')) return false;



          // 8. Rotte Marittime Step 12

          const medLane12 = getDynamicSeaLaneStatus(HISTORICAL_SEA_LANES.find((l) => l.id === 'mediterranean_suez_lifeline')!, 12);

          const axisLane12 = getDynamicSeaLaneStatus(HISTORICAL_SEA_LANES.find((l) => l.id === 'axis_libya_convoy')!, 12);

          const atlLane12 = getDynamicSeaLaneStatus(HISTORICAL_SEA_LANES.find((l) => l.id === 'north_atlantic_convoy')!, 12);

          const pacLane12 = getDynamicSeaLaneStatus(HISTORICAL_SEA_LANES.find((l) => l.id === 'transpacific_us_hawaii')!, 12);

          if (!medLane12.statusNote?.includes('Canale di Sicilia') || medLane12.isContested) return false;

          if (!axisLane12.statusNote?.includes('Interrotte') || axisLane12.isContested) return false;

          if (!atlLane12.statusNote?.includes('Maggio Nero') || atlLane12.isContested) return false;

          if (!pacLane12.statusNote?.includes('Cartwheel')) return false;



          return true;

        },

      },

      {

        name: '95. Audit Integrale Geostorico e Topologico Groenlandia (Zero Overlapping, Esclusione HB_FRAG_Denmark, Timeline Dinamica 1936-1943: Autogoverno Eske Brun / Dottrina Monroe 1940, Accordo di Difesa Kauffmann-Hull 1941, Basi USA Bluie West One/Two e Guerra del Meteo nell\'Artico)',

        run: () => {

          // 1. Zero Overlapping: la feature duplicata HB_FRAG_Denmark deve essere completamente assente

          const hasFragDenmark = loadedHbs.some((f: any) => f.id === 'HB_FRAG_Denmark');

          if (hasFragDenmark) return false;



          // 2. Presenza univoca della feature geografica autentica GL_GREENLAND

          const glFeat = loadedHbs.find((f: any) => f.id === 'GL_GREENLAND');

          if (!glFeat) return false;



          // 3. Step 0 (1936-1939): Colonia autonoma del Regno di Danimarca (DEN, Neutrale)

          const gl0 = resolveHB(glFeat, 0);

          if (gl0.o !== 'DEN' || gl0.fac !== 'Neutrale' || !gl0.name.includes('Landsfoged')) return false;



          // 4. Step 6-7 (Giu-Ott 1940): Invasione Danimarca, Autogoverno di Godhavn e Protezione Monroe USA

          const gl6 = resolveHB(glFeat, 6);

          const gl7 = resolveHB(glFeat, 7);

          if (gl6.o !== 'DEN' || gl6.fac !== 'Neutrale' || !gl6.name.includes('Autonoma')) return false;

          if (gl7.o !== 'DEN' || gl7.fac !== 'Neutrale') return false;



          // 5. Step 8 (Apr 1941): Accordo di Difesa Kauffmann-Hull (Protettorato Militare USA / Alleati)

          const gl8 = resolveHB(glFeat, 8);

          if (gl8.o !== 'USA' || gl8.fac !== 'Alleati' || !gl8.name.includes('Protettorato Militare USA')) return false;



          // 6. Step 9-12 (Dic 1941 - Lug 1943): Basi Aeronavali Alleate & Guerra del Meteo nell'Artico

          const gl9 = resolveHB(glFeat, 9);

          const gl12 = resolveHB(glFeat, 12);

          if (gl9.o !== 'USA' || gl9.fac !== 'Alleati' || !gl9.name.includes('Basi Aeronavali')) return false;

          if (gl12.o !== 'USA' || gl12.fac !== 'Alleati' || !gl12.name.includes('Pattuglia Slitte')) return false;



          // 7. Coerenza risoluzione resolveFeature con codice ISO / NUTS

          const glFeat0 = resolveFeature({ properties: { CNTR_CODE: 'GL', NAME: 'Greenland' } }, 0);

          const glFeat6 = resolveFeature({ properties: { CNTR_CODE: 'GL', NAME: 'Greenland' } }, 6);

          const glFeat8 = resolveFeature({ properties: { CNTR_CODE: 'GL', NAME: 'Greenland' } }, 8);

          const glFeat12 = resolveFeature({ properties: { CNTR_CODE: 'GL', NAME: 'Greenland' } }, 12);

          if (glFeat0.o !== 'DEN' || glFeat0.fac !== 'Neutrale') return false;

          if (glFeat6.o !== 'DEN' || glFeat6.fac !== 'Neutrale') return false;

          if (glFeat8.o !== 'USA' || glFeat8.fac !== 'Alleati') return false;

          if (glFeat12.o !== 'USA' || glFeat12.fac !== 'Alleati') return false;

          // 8. Step 18-19 (1945-1947 post-liberazione): Restaurazione piena sovranità della Danimarca (DEN, Alleati)
          const glFeat18 = resolveFeature({ properties: { CNTR_CODE: 'GL', NAME: 'Greenland' } }, 18);
          const glFeat19 = resolveFeature({ properties: { CNTR_CODE: 'GL', NAME: 'Greenland' } }, 19);
          if (glFeat18.o !== 'DEN' || glFeat18.fac !== 'Alleati' || !glFeat18.name.includes('Restaurazione')) return false;
          if (glFeat19.o !== 'DEN' || glFeat19.fac !== 'Alleati' || !glFeat19.name.includes('Federico IX')) return false;



          return true;

        },

      },

      {

        name: '96. Audit Integrale Geostorico e Topologico Svalbard & Jan Mayen (Zero Overlapping, Esclusione HB_FRAG_Norway, NUTS-3 NO0B2 & NO0B1, Timeline Dinamica 1936-1943: Autogoverno Civile Wolmer Marlow / Arktikugol 1940, Operazione Gauntlet 1941, Presidio Fritham & Gearbox a Barentsburg)',

        run: () => {

          // 1. Zero Overlapping: la feature duplicata HB_FRAG_Norway deve essere completamente assente

          const hasFragNorway = loadedHbs.some((f: any) => f.id === 'HB_FRAG_Norway');

          if (hasFragNorway) return false;



          // 2. Presenza univoca delle feature geografiche NUTS-3 NO0B2 (Svalbard) e NO0B1 (Jan Mayen)

          const svalbardFeat = loadedProvs.find((f: any) => f.id === 'NO0B2' || f.properties?.NUTS_ID === 'NO0B2');

          const janMayenFeat = loadedProvs.find((f: any) => f.id === 'NO0B1' || f.properties?.NUTS_ID === 'NO0B1');

          if (!svalbardFeat || !janMayenFeat) return false;



          // 3. Svalbard Step 0 (1936-1939): Sovranità norvegese e miniere (NOR, Neutrale)

          const sv0 = resolveFeature(svalbardFeat, 0);

          if (sv0.o !== 'NOR' || sv0.fac !== 'Neutrale' || !sv0.name.includes('Longyearbyen')) return false;



          // 4. Svalbard Step 6-8 (Giu 1940 - Apr 1941): Isolamento artico non occupato, cooperazione Arktikugol (NOR, Neutrale)

          const sv6 = resolveFeature(svalbardFeat, 6);

          const sv8 = resolveFeature(svalbardFeat, 8);

          if (sv6.o !== 'NOR' || sv6.fac !== 'Neutrale' || !sv6.name.includes('Autonoma')) return false;

          if (sv8.o !== 'NOR' || sv8.fac !== 'Neutrale') return false;



          // 5. Svalbard Step 9 (Dic 1941): Operazione Gauntlet ed evacuazione alleata (NOR, Alleati)

          const sv9 = resolveFeature(svalbardFeat, 9);

          if (sv9.o !== 'NOR' || sv9.fac !== 'Alleati' || !sv9.name.includes('Gauntlet')) return false;



          // 6. Svalbard Step 10-12 (Ago 1942 - Lug 1943): Guarnigione Norvegia Libera a Barentsburg (NOR, Alleati)

          const sv10 = resolveFeature(svalbardFeat, 10);

          const sv12 = resolveFeature(svalbardFeat, 12);

          if (sv10.o !== 'NOR' || sv10.fac !== 'Alleati' || !sv10.name.includes('Guarnigione della Norvegia Libera')) return false;

          if (sv12.o !== 'NOR' || sv12.fac !== 'Alleati') return false;



          // 7. Jan Mayen: Neutrale a Step 0-5, Presidio Norvegia Libera Alleati a Step 6-12

          const jm0 = resolveFeature(janMayenFeat, 0);

          const jm6 = resolveFeature(janMayenFeat, 6);

          const jm12 = resolveFeature(janMayenFeat, 12);

          if (jm0.o !== 'NOR' || jm0.fac !== 'Neutrale') return false;

          if (jm6.o !== 'NOR' || jm6.fac !== 'Alleati' || !jm6.name.includes('Norvegia Libera')) return false;

          if (jm12.o !== 'NOR' || jm12.fac !== 'Alleati') return false;



          return true;

        },

      },

      {

        name: '97. Audit Geostorico Integrale della Guerra Ecuador-Perù e Timeline dell\'Oriente Amazzonico (1936-1943: Status Quo di Washington a Step 0-8, Guerra di Zarumilla a Step 9 con occupazione militare PRU, Protocollo di Rio de Janeiro a Step 10-12 con sovranità peruviana confermata e concessione basi USA a Baltra/Salinas, battaglie e basi aeronavali geolocalizzate)',

        run: () => {

          // 1. Step 0 (1936): Status Quo di Washington — Ecuador (Oriente) a ECU, Ecuador a ECU, Perù a PRU

          const ecuMain0 = resolveHB({ properties: { NAME: 'Ecuador' } }, 0);

          const ecuOriente0 = resolveHB({ properties: { NAME: 'Ecuador (Oriente)' } }, 0);

          const pru0 = resolveHB({ properties: { NAME: 'Peru' } }, 0);

          if (ecuMain0.o !== 'ECU' || ecuMain0.fac !== 'Neutrale' || !ecuMain0.name.includes('Ecuador')) return false;

          if (ecuOriente0.o !== 'ECU' || ecuOriente0.fac !== 'Neutrale' || !ecuOriente0.name.includes('Oriente')) return false;

          if (pru0.o !== 'PRU' || pru0.fac !== 'Neutrale' || !pru0.name.includes('Peruana')) return false;



          // 2. Step 8 (Apr 1941): Vigilia del conflitto — Status Quo mantenuto

          const ecuOriente8 = resolveHB({ properties: { NAME: 'Ecuador (Oriente)' } }, 8);

          if (ecuOriente8.o !== 'ECU' || ecuOriente8.fac !== 'Neutrale') return false;



          // 3. Step 9 (Dic 1941): Guerra del 1941 — Battaglia di Zarumilla, occupazione peruviana dell'Oriente e di El Oro

          const ecuMain9 = resolveHB({ properties: { NAME: 'Ecuador' } }, 9);

          const ecuOriente9 = resolveHB({ properties: { NAME: 'Ecuador (Oriente)' } }, 9);

          const pru9 = resolveHB({ properties: { NAME: 'Peru' } }, 9);

          if (ecuMain9.o !== 'ECU' || !ecuMain9.name.includes('El Oro')) return false;

          if (ecuOriente9.o !== 'PRU' || !ecuOriente9.name.includes('Occupazione Militare')) return false;

          if (pru9.o !== 'PRU' || !pru9.name.includes('Zarumilla')) return false;



          // 4. Step 10 (Ago 1942): Protocollo di Rio de Janeiro (29 Gennaio 1942) — Sovranità PRU su Maynas/Loreto e Basi USA alle Galápagos

          const ecuMain10 = resolveHB({ properties: { NAME: 'Ecuador' } }, 10);

          const ecuOriente10 = resolveHB({ properties: { NAME: 'Ecuador (Oriente)' } }, 10);

          const pru10 = resolveHB({ properties: { NAME: 'Peru' } }, 10);

          if (ecuMain10.o !== 'ECU' || !ecuMain10.name.includes('Basi USA')) return false;

          if (ecuOriente10.o !== 'PRU' || !ecuOriente10.name.includes('Protocollo di Rio')) return false;

          if (pru10.o !== 'PRU' || !pru10.name.includes('Rio de Janeiro')) return false;



          // 5. Presenza e correttezza della Battaglia di Zarumilla geolocalizzata a Step 9

          const zarumilla = HISTORICAL_BATTLES.find((b) => b.id === 'zarumilla_1941');

          if (!zarumilla || zarumilla.step !== 9 || zarumilla.theater !== 'Americas' || !zarumilla.name.includes('Zarumilla')) return false;



          // 6. Presenza e dinamismo della Base Beta (Seymour Army Airfield / Baltra, Galápagos)

          const baseBeta = HISTORICAL_NAVAL_BASES.find((b) => b.id === 'base_beta_galapagos');

          if (!baseBeta || baseBeta.theater !== 'Pacific') return false;

          const statusBeta10 = getDynamicNavalBaseStatus(baseBeta, 10);

          if (!statusBeta10.historicalName.includes('Base Beta') || !statusBeta10.nation.includes('USA')) return false;



          return true;

        },

      },

      {

        name: 'Test 98: Dinamica Geostorica Territori Francesi in Guyana e Caraibi (Vichy vs CFLN 14 Luglio 1943)',

        run: () => {

          // 1. Step 0 (1936): Terza Repubblica Francese (F_COL / FRA, Alleati)

          const guiana0 = resolveFeature({ properties: { NUTS_ID: 'FRY30', CNTR_CODE: 'FR', NAME: 'French Guiana' } }, 0);

          const martinique0 = resolveFeature({ properties: { NUTS_ID: 'FRY20', CNTR_CODE: 'FR', NAME: 'Martinique' } }, 0);

          const guadeloupe0 = resolveFeature({ properties: { NUTS_ID: 'FRY10', CNTR_CODE: 'FR', NAME: 'Guadeloupe' } }, 0);

          if (guiana0.fac !== 'Alleati') return false;

          if (martinique0.fac !== 'Alleati' || martinique0.o !== 'FRA') return false;

          if (guadeloupe0.fac !== 'Alleati' || guadeloupe0.o !== 'FRA') return false;



          // 2. Step 6 (Giu 1940) e Step 10 (Ago 1942): Regime di Vichy (Fantoccio / Amiral Robert / Sorin / Veber)

          const guiana6 = resolveFeature({ properties: { NUTS_ID: 'FRY30', CNTR_CODE: 'FR', NAME: 'French Guiana' } }, 6);

          const martinique6 = resolveFeature({ properties: { NUTS_ID: 'FRY20', CNTR_CODE: 'FR', NAME: 'Martinique' } }, 6);

          const guadeloupe6 = resolveFeature({ properties: { NUTS_ID: 'FRY10', CNTR_CODE: 'FR', NAME: 'Guadeloupe' } }, 6);

          if (guiana6.o !== 'VIC_COL' || guiana6.fac !== 'Fantoccio') return false;

          if (martinique6.o !== 'VIC' || martinique6.fac !== 'Fantoccio' || !martinique6.name.includes('Amiral Georges Robert')) return false;

          if (guadeloupe6.o !== 'VIC' || guadeloupe6.fac !== 'Fantoccio' || !guadeloupe6.name.includes('Constant Sorin')) return false;



          // 3. Step 12 (Lug 1943): Ralliement solenne al CFLN (FRA, Alleati, Henri Hoppenot, 14 Luglio 1943)

          const guiana12 = resolveFeature({ properties: { NUTS_ID: 'FRY30', CNTR_CODE: 'FR', NAME: 'French Guiana' } }, 12);

          const martinique12 = resolveFeature({ properties: { NUTS_ID: 'FRY20', CNTR_CODE: 'FR', NAME: 'Martinique' } }, 12);

          const guadeloupe12 = resolveFeature({ properties: { NUTS_ID: 'FRY10', CNTR_CODE: 'FR', NAME: 'Guadeloupe' } }, 12);

          if (guiana12.o !== 'FRA' || guiana12.fac !== 'Alleati' || !guiana12.name.includes('CFLN')) return false;

          if (martinique12.o !== 'FRA' || martinique12.fac !== 'Alleati' || !martinique12.name.includes('14 Luglio 1943')) return false;

          if (guadeloupe12.o !== 'FRA' || guadeloupe12.fac !== 'Alleati' || !guadeloupe12.name.includes('CFLN')) return false;



          // 3.b Verifica sui layer storici HB (Martinique e Guadeloupe senza NUTS)

          const martHB12 = resolveHB({ properties: { NAME: 'Martinique' }, __layer: 'hb' }, 12);

          const guadHB12 = resolveHB({ properties: { NAME: 'Guadeloupe' }, __layer: 'hb' }, 12);

          const guianaHB6 = resolveHB({ properties: { NAME: 'French Guiana' }, __layer: 'hb' }, 6);

          if (martHB12.o !== 'FRA' || martHB12.fac !== 'Alleati') return false;

          if (guadHB12.o !== 'FRA' || guadHB12.fac !== 'Alleati') return false;

          if (guianaHB6.o !== 'VIC_COL' || guianaHB6.fac !== 'Fantoccio') return false;



          // 4. Base Navale di Fort-de-France (Riserve Auree Banque de France & Flotta)

          const fdfBase = HISTORICAL_NAVAL_BASES.find((b) => b.id === 'fort_de_france_base');

          if (!fdfBase || fdfBase.theater !== 'Atlantic') return false;

          const statusFdf6 = getDynamicNavalBaseStatus(fdfBase, 6);

          const statusFdf12 = getDynamicNavalBaseStatus(fdfBase, 12);

          if (!statusFdf6.historicalName.includes('Banque de France') || !statusFdf6.nation.includes('Vichy')) return false;

          if (!statusFdf12.historicalName.includes('CFLN') || !statusFdf12.nation.includes('CFLN')) return false;



          return true;

        },

      },

      {

        name: "99. Audit Geostorico e Topologico Integrale dell'Islanda (Zero Overlapping, NUTS-3 IS001 Höfuðborgarsvæði & IS002 Landsbyggð, Timeline Dinamica 1936-1943: Regno d'Islanda e Neutralità Costituzionale 1936-39, Invasione della Danimarca e Operazione Fork Britannica 1940 con Base Falcon a Hvalfjörður, Operazione Indigo e Presidio Militare USA 1941 con Task Force 24, Meeks Field Keflavík, Reggenza Sveinn Björnsson, Convogli Artici e Blessað stríðið)",

        run: () => {

          // 1. Risoluzione feature insulari e neutralità costituzionale (Step 0)

          const r0_1 = resolveFeature({ properties: { NUTS_ID: 'IS001', CNTR_CODE: 'IS', NAME: 'Höfuðborgarsvæði' } }, 0);

          const r0_2 = resolveFeature({ properties: { NUTS_ID: 'IS002', CNTR_CODE: 'IS', NAME: 'Landsbyggð' } }, 0);

          const hb0 = resolveHB({ properties: { NAME: 'Iceland' } }, 0);



          if (r0_1.o !== 'ICE' || r0_1.fac !== 'Neutrale' || !r0_1.name.includes('Reykjavík')) return false;

          if (r0_2.o !== 'ICE' || r0_2.fac !== 'Neutrale' || !r0_2.name.includes('Landsbyggð')) return false;

          if (hb0.o !== 'ICE' || hb0.fac !== 'Neutrale') return false;



          // 2. Timeline Step 6 (Giugno 1940: Operazione Fork — Occupazione preventiva britannica)

          const r6_1 = resolveFeature({ properties: { NUTS_ID: 'IS001', CNTR_CODE: 'IS', NAME: 'Höfuðborgarsvæði' } }, 6);

          const r6_2 = resolveFeature({ properties: { NUTS_ID: 'IS002', CNTR_CODE: 'IS', NAME: 'Landsbyggð' } }, 6);

          const hb6 = resolveHB({ properties: { NAME: 'Iceland' } }, 6);



          if (r6_1.o !== 'UK' || r6_1.fac !== 'Alleati' || !r6_1.name.includes('Fork') || !r6_1.note?.includes('Sturges')) return false;

          if (r6_2.o !== 'UK' || r6_2.fac !== 'Alleati' || !r6_2.name.includes('Hvalfjörður') || !r6_2.note?.includes('Falcon')) return false;

          if (hb6.o !== 'UK' || hb6.fac !== 'Alleati') return false;



          // 3. Timeline Step 9 (Dicembre 1941: Presidio e Difesa USA — Operazione Indigo, Reggenza Sveinn Björnsson)

          const r9_1 = resolveFeature({ properties: { NUTS_ID: 'IS001', CNTR_CODE: 'IS', NAME: 'Höfuðborgarsvæði' } }, 9);

          const r9_2 = resolveFeature({ properties: { NUTS_ID: 'IS002', CNTR_CODE: 'IS', NAME: 'Landsbyggð' } }, 9);

          const hb9 = resolveHB({ properties: { NAME: 'Iceland' } }, 9);



          if (r9_1.o !== 'USA' || r9_1.fac !== 'Alleati' || !r9_1.name.includes('Sveinn Björnsson') || !r9_1.note?.includes('Indigo')) return false;

          if (r9_2.o !== 'USA' || r9_2.fac !== 'Alleati' || !r9_2.name.includes('Meeks Field') || !r9_2.note?.includes('Task Force 24')) return false;

          if (hb9.o !== 'USA' || hb9.fac !== 'Alleati') return false;



          // 4. Timeline Step 12 (Luglio 1943: Scorta Convogli Artici, Keflavík & Blessað stríðið)

          const r12_1 = resolveFeature({ properties: { NUTS_ID: 'IS001', CNTR_CODE: 'IS', NAME: 'Höfuðborgarsvæði' } }, 12);

          const r12_2 = resolveFeature({ properties: { NUTS_ID: 'IS002', CNTR_CODE: 'IS', NAME: 'Landsbyggð' } }, 12);



          if (r12_1.o !== 'USA' || r12_1.fac !== 'Alleati' || !r12_1.note?.includes('Blessað stríðið')) return false;

          if (r12_2.o !== 'USA' || r12_2.fac !== 'Alleati' || !r12_2.name.includes('Keflavík')) return false;



          // 5. Presidio Base Navale Hvalfjörður (Base Falcon / Cacapon)

          const hvalBase = HISTORICAL_NAVAL_BASES.find((b) => b.id === 'hvalfjordur_base');

          if (!hvalBase || hvalBase.theater !== 'Atlantic') return false;

          if (hvalBase.getDynamicStatus && hvalBase.getDynamicStatus(0).fillColor !== '#b3c7d6') return false;

          if (hvalBase.getDynamicStatus && hvalBase.getDynamicStatus(6).fillColor !== '#8a4b38') return false;

          if (hvalBase.getDynamicStatus && hvalBase.getDynamicStatus(9).fillColor !== '#2b4c7e') return false;



          // 6. Eventi e Operazioni Militari Georeferenziate (Fork, Denmark Strait, Indigo)

          const forkBattle = HISTORICAL_BATTLES.find((b) => b.id === 'operation_fork_1940');

          const denmarkStrait = HISTORICAL_BATTLES.find((b) => b.id === 'denmark_strait_1941');

          const indigoEvent = HISTORICAL_BATTLES.find((b) => b.id === 'operation_indigo_1941');



          if (!forkBattle || forkBattle.step !== 6 || !forkBattle.coords) return false;

          if (!denmarkStrait || denmarkStrait.step !== 8 || !denmarkStrait.name.includes('Hood')) return false;

          if (!indigoEvent || indigoEvent.step !== 9 || !indigoEvent.significance.includes('Pearl Harbor')) return false;



          // 7. Vessillo Nazionale Islandese (autentica croce scandinava rossa e bianca su sfondo blu)

          const iceFlagSvg = getCountryFlagSvg('ICE', 0);

          if (!iceFlagSvg.includes('#02529c') || !iceFlagSvg.includes('#dc1e35')) return false;



          return true;

        },

      },

      {

        name: 'Test 100: Audit Geostorico e Topologico Integrale Step 13 (SET 1943 — Settembre 1943: Armistizio di Cassibile, Crollo Linea Panther-Wotan & Spaccatura d\'Italia)',

        run: () => {

          // 1. Validazione Step 13 e Cronologia Globale

          if (STEPS.length < 14) return false;

          const s13 = STEPS[13];

          if (s13.d !== 'SET 1943' || !s13.theaterEvents?.europe || !s13.theaterEvents?.asia || !s13.theaterEvents?.africa || !s13.theaterEvents?.americas) return false;



          // 2. Italia: Regno del Sud (Badoglio / Alleati)

          const palermo = resolveFeature({ properties: { NUTS_ID: 'ITG11', CNTR_CODE: 'IT', NAME: 'Palermo' } }, 13);

          const cagliari = resolveFeature({ properties: { NUTS_ID: 'ITG27', CNTR_CODE: 'IT', NAME: 'Cagliari' } }, 13);

          const brindisi = resolveFeature({ properties: { NUTS_ID: 'ITF44', CNTR_CODE: 'IT', NAME: 'Brindisi' } }, 13);

          const reggioCal = resolveFeature({ properties: { NUTS_ID: 'ITF65', CNTR_CODE: 'IT', NAME: 'Reggio Calabria' } }, 13);

          const matera = resolveFeature({ properties: { NUTS_ID: 'ITF52', CNTR_CODE: 'IT', NAME: 'Matera' } }, 13);

          const salerno = resolveFeature({ properties: { NUTS_ID: 'ITF35', CNTR_CODE: 'IT', NAME: 'Salerno' } }, 13);

          const napoli = resolveFeature({ properties: { NUTS_ID: 'ITF33', CNTR_CODE: 'IT', NAME: 'Napoli' } }, 13);



          if ((palermo.o !== 'ITA' && palermo.o !== 'USA') || palermo.fac !== 'Alleati') return false;

          if (cagliari.o !== 'ITA' || cagliari.fac !== 'Alleati' || !cagliari.note?.includes('Antonio Basso')) return false;

          if (brindisi.o !== 'ITA' || brindisi.fac !== 'Alleati' || !brindisi.name.includes('Capitale Provvisoria')) return false;

          if (reggioCal.o !== 'ITA' || reggioCal.fac !== 'Alleati' || !reggioCal.note?.includes('Baytown')) return false;

          if (matera.o !== 'ITA' || matera.fac !== 'Alleati' || !matera.name.includes('Insurrezione')) return false;

          if ((salerno.o !== 'ITA' && salerno.o !== 'USA') || salerno.fac !== 'Alleati' || !salerno.name.includes('Avalanche')) return false;

          if (napoli.o !== 'ITA' || napoli.fac !== 'Alleati' || !napoli.name.includes('Quattro Giornate')) return false;



          // 3. Italia Centro-Nord: Repubblica Sociale Italiana (RSI / Asse)

          const caserta = resolveFeature({ properties: { NUTS_ID: 'ITF31', CNTR_CODE: 'IT', NAME: 'Caserta' } }, 13);

          const roma = resolveFeature({ properties: { NUTS_ID: 'ITI43', CNTR_CODE: 'IT', NAME: 'Roma' } }, 13);

          const milano = resolveFeature({ properties: { NUTS_ID: 'ITC4C', CNTR_CODE: 'IT', NAME: 'Milano' } }, 13);

          const torino = resolveFeature({ properties: { NUTS_ID: 'ITC11', CNTR_CODE: 'IT', NAME: 'Torino' } }, 13);

          const ravenna = resolveFeature({ properties: { NUTS_ID: 'ITH57', CNTR_CODE: 'IT', NAME: 'Ravenna' } }, 13);



          if (caserta.o !== 'RSI' || caserta.fac !== 'Asse' || !caserta.name.includes('Volturno')) return false;

          if (roma.o !== 'RSI' || roma.fac !== 'Asse') return false;

          if (milano.o !== 'RSI' || milano.fac !== 'Asse') return false;

          if (torino.o !== 'RSI' || torino.fac !== 'Asse') return false;

          if (ravenna.o !== 'RSI' || ravenna.fac !== 'Asse') return false; // Verifica anti-regressione Ravenna



          // 4. Zone sottratte alla sovranità italiana: OZAV e OZAK

          const bolzano = resolveFeature({ properties: { NUTS_ID: 'ITH10', CNTR_CODE: 'IT', NAME: 'Bolzano' } }, 13);

          const trento = resolveFeature({ properties: { NUTS_ID: 'ITH20', CNTR_CODE: 'IT', NAME: 'Trento' } }, 13);

          const belluno = resolveFeature({ properties: { NUTS_ID: 'ITH37', CNTR_CODE: 'IT', NAME: 'Belluno' } }, 13);



          if (bolzano.o !== 'OZAV' || bolzano.fac !== 'Asse' || !bolzano.note?.includes('Franz Hofer')) return false;

          if (trento.o !== 'OZAV' || trento.fac !== 'Asse') return false;

          if (belluno.o !== 'OZAV' || belluno.fac !== 'Asse') return false;



          const udine = resolveFeature({ properties: { NUTS_ID: 'ITH42', CNTR_CODE: 'IT', NAME: 'Udine' } }, 13);

          const trieste = resolveFeature({ properties: { NUTS_ID: 'ITH44', CNTR_CODE: 'IT', NAME: 'Trieste' } }, 13);

          const goriziaSI = resolveFeature({ properties: { NUTS_ID: 'SI043', CNTR_CODE: 'SI', NAME: 'Goriška' } }, 13);

          const koperSI = resolveFeature({ properties: { NUTS_ID: 'SI044', CNTR_CODE: 'SI', NAME: 'Obalno-kraška' } }, 13);

          const ljubljanaSI = resolveFeature({ properties: { NUTS_ID: 'SI041', CNTR_CODE: 'SI', NAME: 'Osrednjeslovenska' } }, 13);

          const pulaHR = resolveFeature({ properties: { NUTS_ID: 'HR036', CNTR_CODE: 'HR', NAME: 'Istarska' } }, 13);

          const rijekaHR = resolveFeature({ properties: { NUTS_ID: 'HR031', CNTR_CODE: 'HR', NAME: 'Primorsko-goranska' } }, 13);



          if (udine.o !== 'OZAK' || udine.fac !== 'Asse') return false;

          if (trieste.o !== 'OZAK' || trieste.fac !== 'Asse' || !trieste.note?.includes('Friedrich Rainer')) return false;

          if (goriziaSI.o !== 'OZAK' || goriziaSI.fac !== 'Asse') return false;

          if (koperSI.o !== 'OZAK' || koperSI.fac !== 'Asse') return false;

          if (ljubljanaSI.o !== 'OZAK' || ljubljanaSI.fac !== 'Asse' || !ljubljanaSI.note?.includes('Domobranci')) return false;

          if (pulaHR.o !== 'OZAK' || pulaHR.fac !== 'Asse') return false;

          if (rijekaHR.o !== 'OZAK' || rijekaHR.fac !== 'Asse') return false;



          // 5. Corsica liberata (1er Département de France libéré) e Francia Continentale Wehrmacht

          const corseSud = resolveFeature({ properties: { NUTS_ID: 'FRM01', CNTR_CODE: 'FR', NAME: 'Corse-du-Sud' } }, 13);

          const corseHaute = resolveFeature({ properties: { NUTS_ID: 'FRM02', CNTR_CODE: 'FR', NAME: 'Haute-Corse' } }, 13);

          const nice = resolveFeature({ properties: { NUTS_ID: 'FRL03', CNTR_CODE: 'FR', NAME: 'Alpes-Maritimes' } }, 13);



          if (corseSud.o !== 'FRA' || corseSud.fac !== 'Alleati' || !corseSud.note?.includes('Casabianca')) return false;

          if (corseHaute.o !== 'FRA' || corseHaute.fac !== 'Alleati') return false;

          if (nice.o !== 'GER' || nice.fac !== 'Asse') return false;



          // 6. Balcani ed Egeo: Fine occupazione italiana & subentro germanico

          const cephalonia = resolveFeature({ properties: { NUTS_ID: 'EL622', CNTR_CODE: 'EL', NAME: 'Kefallinia' } }, 13);

          const dodecanese = resolveFeature({ properties: { NUTS_ID: 'EL421', CNTR_CODE: 'EL', NAME: 'Dodekanisos' } }, 13);

          const lasithi = resolveFeature({ properties: { NUTS_ID: 'EL432', CNTR_CODE: 'EL', NAME: 'Lasithi' } }, 13);

          const tirana = resolveFeature({ properties: { NUTS_ID: 'AL011', CNTR_CODE: 'AL', NAME: 'Tiranë' } }, 13);

          const montenegro = resolveFeature({ properties: { NUTS_ID: 'ME000', CNTR_CODE: 'ME', NAME: 'Crna Gora' } }, 13);

          const zara = resolveFeature({ properties: { NUTS_ID: 'HR033', CNTR_CODE: 'HR', NAME: 'Zadarska' } }, 13);

          const split = resolveFeature({ properties: { NUTS_ID: 'HR035', CNTR_CODE: 'HR', NAME: 'Splitsko-dalmatinska' } }, 13);



          if (cephalonia.o !== 'GER' || cephalonia.fac !== 'Asse' || !cephalonia.name.includes('Eccidio della Divisione Acqui')) return false;

          if (dodecanese.o !== 'GER' || dodecanese.fac !== 'Asse' || !dodecanese.name.includes('Campagna dell\'Egeo')) return false;

          if (lasithi.o !== 'GER' || lasithi.fac !== 'Asse') return false;

          if (tirana.o !== 'GER' || tirana.fac !== 'Asse') return false;

          if (montenegro.o !== 'GER' || montenegro.fac !== 'Asse') return false;

          if (zara.o !== 'GER' || zara.fac !== 'Asse') return false;

          if (split.o !== 'CRO' || split.fac !== 'Asse') return false;



          // 7. Fronte Orientale: Crollo della linea Panther-Wotan e liberazioni

          const smolensk = resolveFeature({ properties: { NUTS_ID: 'RU-SMO', CNTR_CODE: 'RU', NAME: 'Smolensk' } }, 13);

          const stalino = resolveFeature({ properties: { NUTS_ID: 'UA14', CNTR_CODE: 'UA', NAME: 'Donetsk' } }, 13);

          const zaporozhye = resolveFeature({ properties: { NUTS_ID: 'UA23', CNTR_CODE: 'UA', NAME: 'Zaporozhye' } }, 13);

          const poltava = resolveFeature({ properties: { NUTS_ID: 'UA53', CNTR_CODE: 'UA', NAME: 'Poltava' } }, 13);

          const krasnodar = resolveFeature({ properties: { NUTS_ID: 'RU-KDA', CNTR_CODE: 'RU', NAME: 'Krasnodar Krai' } }, 13);



          if (smolensk.o !== 'SOV' || smolensk.fac !== 'Comintern' || !smolensk.note?.includes('Suvorov')) return false;

          if (stalino.o !== 'SOV' || stalino.fac !== 'Comintern' || !stalino.note?.includes('Donbass')) return false;

          if (zaporozhye.o !== 'SOV' || zaporozhye.fac !== 'Comintern') return false;

          if (poltava.o !== 'SOV' || poltava.fac !== 'Comintern') return false;

          if (krasnodar.o !== 'GER' || krasnodar.fac !== 'Asse' || !krasnodar.note?.includes('Taman')) return false;



          // 8. Pacifico e Sud-Est Asiatico: Nuova Guinea (Lae e Salamaua ad AST)

          const morobe = resolveFeature({ properties: { NUTS_ID: 'PGMPL', CNTR_CODE: 'PG', NAME: 'Morobe' } }, 13);

          if (morobe.o !== 'AST' || morobe.fac !== 'Alleati' || !morobe.note?.includes('16 settembre 1943')) return false;



          // 9. Battaglie storiche georeferenziate di Step 13

          const bSalerno = HISTORICAL_BATTLES.find((b) => b.id === 'operation_avalanche_salerno_1943');

          const bNapoli = HISTORICAL_BATTLES.find((b) => b.id === 'four_days_of_naples_1943');

          const bAcqui = HISTORICAL_BATTLES.find((b) => b.id === 'cephalonia_massacre_1943');

          const bSuvorov = HISTORICAL_BATTLES.find((b) => b.id === 'smolensk_operation_suvorov_1943');

          const bDnieper = HISTORICAL_BATTLES.find((b) => b.id === 'battle_of_the_dnieper_1943');

          const bLae = HISTORICAL_BATTLES.find((b) => b.id === 'lae_salamaua_campaign_1943');



          if (!bSalerno || bSalerno.step !== 13 || !bSalerno.name.includes('Avalanche')) return false;

          if (!bNapoli || bNapoli.step !== 13 || !bNapoli.name.includes('Quattro Giornate')) return false;

          if (!bAcqui || bAcqui.step !== 13 || !bAcqui.name.includes('Cefalonia')) return false;

          if (!bSuvorov || bSuvorov.step !== 13 || !bSuvorov.name.includes('Suvorov')) return false;

          if (!bDnieper || bDnieper.step !== 13 || !bDnieper.name.includes('Dniepr')) return false;

          if (!bLae || bLae.step !== 13 || !bLae.name.includes('Lae')) return false;



          // 10. Fortificazioni, Linee Difensive e Basi Navali

          const lineVolturno = HISTORICAL_FORTIFICATION_LINES.find((l) => l.id === 'volturno_line_1943');

          const lineOstwall = HISTORICAL_FORTIFICATION_LINES.find((l) => l.id === 'panther_wotan_line_1943');

          const lineKuban = HISTORICAL_FORTIFICATION_LINES.find((l) => l.id === 'gotenkopf_kuban_line');



          if (!lineVolturno || !lineVolturno.activeSteps.includes(13)) return false;

          if (!lineOstwall || !lineOstwall.activeSteps.includes(13)) return false;

          if (!lineKuban || !lineKuban.activeSteps.includes(13)) return false;



          const baseTaranto = HISTORICAL_NAVAL_BASES.find((b) => b.id === 'taranto');

          const baseSpezia = HISTORICAL_NAVAL_BASES.find((b) => b.id === 'la_spezia');

          if (!baseTaranto || !baseSpezia) return false;

          const statusTaranto13 = getDynamicNavalBaseStatus(baseTaranto, 13);

          const statusSpezia13 = getDynamicNavalBaseStatus(baseSpezia, 13);

          if (!statusTaranto13.nation.includes('Alleati') || !statusTaranto13.historicalName.includes('Slapstick')) return false;

          if (!statusSpezia13.nation.includes('Wehrmacht') || !statusSpezia13.historicalName.includes('Occupazione Militare Tedesca')) return false;



          // 11. Araldica e Gerarchia Politica

          const rsiFlag = getCountryFlagSvg('RSI', 13);

          const ozavFlag = getCountryFlagSvg('OZAV', 13);

          const ozakFlag = getCountryFlagSvg('OZAK', 13);

          if (!rsiFlag || !ozavFlag || !ozakFlag) return false;



          if (getOverlord('RSI', 13)?.id !== 'GER') return false;

          if (getOverlord('OZAV', 13)?.id !== 'GER') return false;

          if (getOverlord('OZAK', 13)?.id !== 'GER') return false;

          if (getOverlord('ALB', 13)?.id !== 'GER') return false;



          return true;

        },

      },

      {

        name: 'Test 101: Audit Geostorico e Topologico Integrale Step 14 (GIU 1944 — D-Day in Normandia, Liberazione di Roma, Operazione Bagration & Battaglia del Mare delle Filippine)',

        run: () => {

          // 1. Validazione Step 14 e Cronologia Globale

          if (STEPS.length < 15) return false;

          const s14 = STEPS[14];

          if (s14.d !== 'GIU 1944' || !s14.theaterEvents?.europe || !s14.theaterEvents?.asia || !s14.theaterEvents?.africa || !s14.theaterEvents?.americas) return false;



          // 2. Fronte Occidentale (Francia): Sacca Costiera di Normandia (Manche a USA, Calvados a UK) e Wehrmacht nel resto della Francia continentale

          const mancheUSA = resolveFeature({ properties: { NUTS_ID: 'FRD12', CNTR_CODE: 'FR', NAME: 'Manche' } }, 14);

          const calvadosUK = resolveFeature({ properties: { NUTS_ID: 'FRD11', CNTR_CODE: 'FR', NAME: 'Calvados' } }, 14);

          const parisGER = resolveFeature({ properties: { NUTS_ID: 'FR101', CNTR_CODE: 'FR', NAME: 'Paris' } }, 14);

          const niceGER = resolveFeature({ properties: { NUTS_ID: 'FRL03', CNTR_CODE: 'FR', NAME: 'Alpes-Maritimes' } }, 14);

          const corseFRA = resolveFeature({ properties: { NUTS_ID: 'FRM01', CNTR_CODE: 'FR', NAME: 'Corse-du-Sud' } }, 14);



          if (mancheUSA.o !== 'USA' || mancheUSA.fac !== 'Alleati' || !mancheUSA.note?.includes('Cherbourg')) return false;

          if (calvadosUK.o !== 'UK' || calvadosUK.fac !== 'Alleati' || !calvadosUK.note?.includes('Bayeux')) return false;

          if (parisGER.o !== 'GER' || parisGER.fac !== 'Asse') return false;

          if (niceGER.o !== 'GER' || niceGER.fac !== 'Asse') return false;

          if (corseFRA.o !== 'FRA' || corseFRA.fac !== 'Alleati' || !corseFRA.note?.includes('GPRF')) return false;



          // 3. Fronte Italiano: Liberazione di Roma e avanzata fino alla Linea Albert/Trasimeno

          const romaITA = resolveFeature({ properties: { NUTS_ID: 'ITI43', CNTR_CODE: 'IT', NAME: 'Roma' } }, 14);

          const casertaITA = resolveFeature({ properties: { NUTS_ID: 'ITF31', CNTR_CODE: 'IT', NAME: 'Caserta' } }, 14);

          const perugiaITA = resolveFeature({ properties: { NUTS_ID: 'ITI21', CNTR_CODE: 'IT', NAME: 'Perugia' } }, 14);

          const terniITA = resolveFeature({ properties: { NUTS_ID: 'ITI22', CNTR_CODE: 'IT', NAME: 'Terni' } }, 14);

          const ascoliITA = resolveFeature({ properties: { NUTS_ID: 'ITI34', CNTR_CODE: 'IT', NAME: 'Ascoli Piceno' } }, 14);

          const macerataITA = resolveFeature({ properties: { NUTS_ID: 'ITI33', CNTR_CODE: 'IT', NAME: 'Macerata' } }, 14);

          const sienaRSI = resolveFeature({ properties: { NUTS_ID: 'ITI19', CNTR_CODE: 'IT', NAME: 'Siena' } }, 14);

          const anconaRSI = resolveFeature({ properties: { NUTS_ID: 'ITI32', CNTR_CODE: 'IT', NAME: 'Ancona' } }, 14);

          const firenzeRSI = resolveFeature({ properties: { NUTS_ID: 'ITI14', CNTR_CODE: 'IT', NAME: 'Firenze' } }, 14);

          const milanoRSI = resolveFeature({ properties: { NUTS_ID: 'ITC4C', CNTR_CODE: 'IT', NAME: 'Milano' } }, 14);

          const bolzanoOZAV = resolveFeature({ properties: { NUTS_ID: 'ITH10', CNTR_CODE: 'IT', NAME: 'Bolzano' } }, 14);

          const triesteOZAK = resolveFeature({ properties: { NUTS_ID: 'ITH44', CNTR_CODE: 'IT', NAME: 'Trieste' } }, 14);



          if (romaITA.o !== 'ITA' || romaITA.fac !== 'Alleati' || !romaITA.note?.includes('Mark Clark')) return false;

          if (casertaITA.o !== 'ITA' || casertaITA.fac !== 'Alleati' || !casertaITA.name.includes('AFHQ')) return false;

          if (perugiaITA.o !== 'ITA' || perugiaITA.fac !== 'Alleati' || !perugiaITA.name.includes('Perugia')) return false;

          if (terniITA.o !== 'ITA' || terniITA.fac !== 'Alleati') return false;

          if (ascoliITA.o !== 'ITA' || ascoliITA.fac !== 'Alleati' || !ascoliITA.name.includes('Corpo Italiano di Liberazione')) return false;

          if (macerataITA.o !== 'ITA' || macerataITA.fac !== 'Alleati') return false;

          if (sienaRSI.o !== 'RSI' || sienaRSI.fac !== 'Asse' || !sienaRSI.note?.toLowerCase().includes('3 luglio 1944')) return false;

          if (anconaRSI.o !== 'RSI' || anconaRSI.fac !== 'Asse' || !anconaRSI.name.includes('Albert')) return false;

          if (firenzeRSI.o !== 'RSI' || firenzeRSI.fac !== 'Asse') return false;

          if (milanoRSI.o !== 'RSI' || milanoRSI.fac !== 'Asse') return false;

          if (bolzanoOZAV.o !== 'OZAV' || bolzanoOZAV.fac !== 'Asse') return false;

          if (triesteOZAK.o !== 'OZAK' || triesteOZAK.fac !== 'Asse') return false;



          // 4. Fronte Orientale: Crimea interamente liberata, Ucraina della riva destra & Odessa, Operazione Bagration (Vitebsk e Bobrujsk distrutte, Minsk Asse) e Carelia (Viipuri SOV)

          const sevastopolSOV = resolveFeature({ properties: { NUTS_ID: 'SOV_ADM1_UKR_99_Sevastopol', CNTR_CODE: 'SOV', NAME: 'Sevastopol' } }, 14);

          const crimeaSOV = resolveFeature({ properties: { NUTS_ID: 'SOV_ADM1_UKR_91_Autonomous_Republic_of_Crimea', CNTR_CODE: 'SOV', NAME: 'Crimea' } }, 14);

          const krasnodarSOV = resolveFeature({ properties: { NUTS_ID: 'RU-KDA', CNTR_CODE: 'RU', NAME: 'Krasnodar Krai' } }, 14);

          const odessaSOV = resolveFeature({ properties: { NUTS_ID: 'SOV_ADM1_UKR_195_Odessa_City', CNTR_CODE: 'SOV', NAME: 'Odessa' } }, 14);

          const khersonSOV = resolveFeature({ properties: { NUTS_ID: 'SOV_ADM1_UKR_80_Kherson_Oblast', CNTR_CODE: 'SOV', NAME: 'Kherson' } }, 14);

          const vitebskSOV = resolveFeature({ properties: { NUTS_ID: 'SOV_ADM1_BLR_101_Vitebsk', CNTR_CODE: 'SOV', NAME: 'Vitebsk' } }, 14);

          const mogilevSOV = resolveFeature({ properties: { NUTS_ID: 'SOV_ADM1_BLR_102_Mogilev', CNTR_CODE: 'SOV', NAME: 'Mogilev' } }, 14);

          const minskGER = resolveFeature({ properties: { NUTS_ID: 'SOV_ADM1_BLR_103_Minsk', CNTR_CODE: 'SOV', NAME: 'Minsk' } }, 14);

          const petroskoiSOV = resolveFeature({ properties: { NUTS_ID: 'SOV_NW_RUS_261_Petroskoi_District', CNTR_CODE: 'SOV', NAME: 'Petroskoi' } }, 14);

          const viipuriSOV = resolveFeature({ properties: { __resolverId: 'FI_HIST_VIIPURI', CNTR_ID: 'FIN_HIST', NAME: 'Viipuri' } }, 14);



          if (sevastopolSOV.o !== 'SOV' || sevastopolSOV.fac !== 'Comintern' || !sevastopolSOV.note?.includes('Sebastopoli')) return false;

          if (crimeaSOV.o !== 'SOV' || crimeaSOV.fac !== 'Comintern') return false;

          if (krasnodarSOV.o !== 'SOV' || krasnodarSOV.fac !== 'Comintern') return false;

          if (odessaSOV.o !== 'SOV' || odessaSOV.fac !== 'Comintern' || !odessaSOV.note?.includes('10 aprile 1944')) return false;

          if (khersonSOV.o !== 'SOV' || khersonSOV.fac !== 'Comintern') return false;

          if (vitebskSOV.o !== 'SOV' || vitebskSOV.fac !== 'Comintern' || !vitebskSOV.note?.includes('27 giugno 1944')) return false;

          if (mogilevSOV.o !== 'SOV' || mogilevSOV.fac !== 'Comintern' || !mogilevSOV.note?.includes('29 giugno 1944')) return false;

          if (minskGER.o !== 'GER' || minskGER.fac !== 'Asse' || !minskGER.note?.includes('3 luglio 1944')) return false;

          if (petroskoiSOV.o !== 'SOV' || petroskoiSOV.fac !== 'Comintern') return false;

          if (viipuriSOV.o !== 'SOV' || viipuriSOV.fac !== 'Comintern' || !viipuriSOV.note?.includes('VKT')) return false;



          // 5. Pacifico e Asia Orientale: Saipan (USA), Mare delle Filippine, Birmania U-Go collassata

          const saipanUSA = resolveFeature({ properties: { CNTR_CODE: 'MP', NAME: 'Saipan' } }, 14);

          const burmaJAP = resolveFeature({ properties: { CNTR_CODE: 'MM', NAME: 'Burma' } }, 14);



          if (saipanUSA.o !== 'USA' || saipanUSA.fac !== 'Alleati' || !saipanUSA.note?.includes('15 giugno 1944')) return false;

          if (burmaJAP.o !== 'JAP' || burmaJAP.fac !== 'Asse' || !burmaJAP.note?.includes('Kohima')) return false;



          // 6. Battaglie storiche georeferenziate di Step 14

          const bOverlord = HISTORICAL_BATTLES.find((b) => b.id === 'operation_overlord_normandy_cherbourg_1944');

          const bRome = HISTORICAL_BATTLES.find((b) => b.id === 'liberation_of_rome_albert_line_1944');

          const bBagration = HISTORICAL_BATTLES.find((b) => b.id === 'operation_bagration_vitebsk_bobruisk_1944');

          const bVyborg = HISTORICAL_BATTLES.find((b) => b.id === 'vyborg_petrozavodsk_offensive_1944');

          const bSaipan = HISTORICAL_BATTLES.find((b) => b.id === 'battle_of_saipan_philippine_sea_1944');

          const bKohima = HISTORICAL_BATTLES.find((b) => b.id === 'battle_of_kohima_and_imphal_1944');



          if (!bOverlord || bOverlord.step !== 14 || !bOverlord.name.includes('Overlord')) return false;

          if (!bRome || bRome.step !== 14 || !bRome.name.includes('Roma')) return false;

          if (!bBagration || bBagration.step !== 14 || !bBagration.name.includes('Bagration')) return false;

          if (!bVyborg || bVyborg.step !== 14 || !bVyborg.name.includes('Viipuri')) return false;

          if (!bSaipan || bSaipan.step !== 14 || !bSaipan.name.includes('Saipan')) return false;

          if (!bKohima || bKohima.step !== 14 || !bKohima.name.includes('Kohima')) return false;



          // 7. Fortificazioni e Basi Navali di Step 14

          const lineAlbert = HISTORICAL_FORTIFICATION_LINES.find((l) => l.id === 'albert_trasimeno_line_1944');

          const lineVKT = HISTORICAL_FORTIFICATION_LINES.find((l) => l.id === 'vkt_line_finland_1944');



          if (!lineAlbert || !lineAlbert.activeSteps.includes(14)) return false;

          if (!lineVKT || !lineVKT.activeSteps.includes(14)) return false;



          const baseCherbourg = HISTORICAL_NAVAL_BASES.find((b) => b.id === 'cherbourg');

          const baseSevastopol = HISTORICAL_NAVAL_BASES.find((b) => b.id === 'sevastopol');

          const baseOdessa = HISTORICAL_NAVAL_BASES.find((b) => b.id === 'odessa');

          if (!baseCherbourg || !baseSevastopol || !baseOdessa) return false;



          const statusCherbourg14 = getDynamicNavalBaseStatus(baseCherbourg, 14);

          const statusSevastopol14 = getDynamicNavalBaseStatus(baseSevastopol, 14);

          const statusOdessa14 = getDynamicNavalBaseStatus(baseOdessa, 14);



          if (!statusCherbourg14.nation.includes('Stati Uniti') || !statusCherbourg14.historicalName.includes('Cherbourg')) return false;

          if (!statusSevastopol14.nation.includes('URSS') || !statusSevastopol14.historicalName.includes('Sevastopol')) return false;

          if (!statusOdessa14.nation.includes('URSS') || !statusOdessa14.historicalName.includes('Odessa')) return false;



          return true;

        },

      },

      {

        name: 'Test 102: Audit Geostorico e Topologico Integrale Step 15 (AGO 1944 — Liberazione di Parigi, Operazione Dragoon, Svolta della Romania, Rivolta di Varsavia, Insurrezione Slovacca & Marianne USA)',

        run: () => {

          // 1. Validazione Step 15 e Cronologia Globale

          if (STEPS.length < 16) return false;

          const s15 = STEPS[15];

          if (s15.d !== 'AGO 1944' || !s15.theaterEvents?.europe || !s15.theaterEvents?.asia || !s15.theaterEvents?.africa || !s15.theaterEvents?.americas) return false;



          // 2. Fronte Occidentale (Francia): Liberazione di Parigi, sbarco in Provenza (Operazione Dragoon), Belgio e Alsazia ancora sotto occupazione

          const parisFRA = resolveFeature({ properties: { NUTS_ID: 'FR101', CNTR_CODE: 'FR', NAME: 'Paris' } }, 15);

          const calvadosFRA = resolveFeature({ properties: { NUTS_ID: 'FRD11', CNTR_CODE: 'FR', NAME: 'Calvados' } }, 15);

          const marseilleFRA = resolveFeature({ properties: { NUTS_ID: 'FRL04', CNTR_CODE: 'FR', NAME: 'Bouches-du-Rhône' } }, 15);

          const toulonFRA = resolveFeature({ properties: { NUTS_ID: 'FRL05', CNTR_CODE: 'FR', NAME: 'Var' } }, 15);

          const alsaceGER = resolveFeature({ properties: { NUTS_ID: 'FRF11', CNTR_CODE: 'FR', NAME: 'Bas-Rhin' } }, 15);

          const bruxellesGER = resolveFeature({ properties: { NUTS_ID: 'BE100', CNTR_CODE: 'BE', NAME: 'Bruxelles' } }, 15);



          if (parisFRA.o !== 'FRA' || parisFRA.fac !== 'Alleati' || !parisFRA.note?.includes('Leclerc') || !parisFRA.note?.includes('Choltitz')) return false;

          if (calvadosFRA.o !== 'FRA' || calvadosFRA.fac !== 'Alleati' || !calvadosFRA.note?.includes('Falaise')) return false;

          if (marseilleFRA.o !== 'FRA' || marseilleFRA.fac !== 'Alleati' || !marseilleFRA.note?.includes('Provenza')) return false;

          if (toulonFRA.o !== 'FRA' || toulonFRA.fac !== 'Alleati') return false;

          if (alsaceGER.o !== 'GER' || alsaceGER.fac !== 'Asse') return false;

          if (bruxellesGER.o !== 'GER' || bruxellesGER.fac !== 'Asse' || !bruxellesGER.note?.includes('18 maggio 1940')) return false;



          // 3. Fronte Italiano: Liberazione di Firenze, Siena, Livorno, Ancona; Linea Gotica (Massa, Pesaro, Bologna, Milano)

          const firenzeITA = resolveFeature({ properties: { NUTS_ID: 'ITI14', CNTR_CODE: 'IT', NAME: 'Firenze' } }, 15);

          const sienaITA = resolveFeature({ properties: { NUTS_ID: 'ITI19', CNTR_CODE: 'IT', NAME: 'Siena' } }, 15);

          const livornoITA = resolveFeature({ properties: { NUTS_ID: 'ITI16', CNTR_CODE: 'IT', NAME: 'Livorno' } }, 15);

          const anconaITA = resolveFeature({ properties: { NUTS_ID: 'ITI32', CNTR_CODE: 'IT', NAME: 'Ancona' } }, 15);

          const massaRSI = resolveFeature({ properties: { NUTS_ID: 'ITI11', CNTR_CODE: 'IT', NAME: 'Massa-Carrara' } }, 15);

          const pesaroRSI = resolveFeature({ properties: { NUTS_ID: 'ITI31', CNTR_CODE: 'IT', NAME: 'Pesaro e Urbino' } }, 15);

          const bolognaRSI = resolveFeature({ properties: { NUTS_ID: 'ITH55', CNTR_CODE: 'IT', NAME: 'Bologna' } }, 15);

          const milanoRSI = resolveFeature({ properties: { NUTS_ID: 'ITC4C', CNTR_CODE: 'IT', NAME: 'Milano' } }, 15);



          if (firenzeITA.o !== 'ITA' || firenzeITA.fac !== 'Alleati' || !firenzeITA.name.includes('Firenze') || !firenzeITA.note?.includes('CTLN')) return false;

          if (sienaITA.o !== 'ITA' || sienaITA.fac !== 'Alleati') return false;

          if (livornoITA.o !== 'ITA' || livornoITA.fac !== 'Alleati') return false;

          if (anconaITA.o !== 'ITA' || anconaITA.fac !== 'Alleati' || !anconaITA.note?.includes('Anders')) return false;

          if (massaRSI.o !== 'RSI' || massaRSI.fac !== 'Asse' || !massaRSI.name.includes('Gotica')) return false;

          if (pesaroRSI.o !== 'RSI' || pesaroRSI.fac !== 'Asse' || !pesaroRSI.note?.includes('Olive')) return false;

          if (bolognaRSI.o !== 'RSI' || bolognaRSI.fac !== 'Asse') return false;

          if (milanoRSI.o !== 'RSI' || milanoRSI.fac !== 'Asse') return false;



          // 4. Balcani ed Europa Orientale: Svolta della Romania (Bucarest Alleata), Moldavia/Bessarabia liberata (SOV), Polonia (Varsavia insorta, Praga e Lublino SOV), Slovacchia (SNP a Banská Bystrica)

          const bucurestiROM = resolveFeature({ properties: { NUTS_ID: 'RO321', CNTR_CODE: 'RO', NAME: 'București' } }, 15);

          const prahovaROM = resolveFeature({ properties: { NUTS_ID: 'RO316', CNTR_CODE: 'RO', NAME: 'Prahova' } }, 15);

          const chisinauSOV = resolveFeature({ properties: { NUTS_ID: 'MD', CNTR_CODE: 'MD', NAME: 'Moldova' } }, 15);

          const lapusnaSOV = resolveFeature({ properties: { NUTS_ID: 'ROM_BES_JUD_LAPUSNA', CNTR_CODE: 'RO_BES', NAME: 'Lăpușna' } }, 15);

          const cetateaAlbaSOV = resolveFeature({ properties: { NUTS_ID: 'ROM_BES_JUD_CETATEA_ALBA', CNTR_CODE: 'RO_BUD', NAME: 'Cetatea Albă' } }, 15);

          const warsawCityPOL = resolveFeature({ properties: { NUTS_ID: 'PL127_WARSZAWA_CITY', CNTR_CODE: 'POL', NAME: 'Warszawa City' } }, 15);

          const warsawPragaSOV = resolveFeature({ properties: { NUTS_ID: 'PL127_WARSZAWA_PRAGA', CNTR_CODE: 'POL', NAME: 'Praga' } }, 15);

          const lublinSOV = resolveFeature({ properties: { NUTS_ID: 'PL31', CNTR_CODE: 'POL', NAME: 'Lubelskie' } }, 15);

          const lwowSOV = resolveFeature({ properties: { NUTS_ID: 'PL_KRESY_UKR_127_Pustomyty', CNTR_CODE: 'POL', NAME: 'Lwów' } }, 15);

          const minskSOV = resolveFeature({ properties: { NUTS_ID: 'SOV_ADM1_BLR_103_Minsk', CNTR_CODE: 'SOV', NAME: 'Minsk' } }, 15);

          const banskaCZE = resolveFeature({ properties: { NUTS_ID: 'SK032', CNTR_CODE: 'SK', NAME: 'Banskobystrický' } }, 15);

          const bratislavaGER = resolveFeature({ properties: { NUTS_ID: 'SK010', CNTR_CODE: 'SK', NAME: 'Bratislavský' } }, 15);



          if (bucurestiROM.o !== 'ROM' || bucurestiROM.fac !== 'Alleati' || !bucurestiROM.note?.includes('Michele I')) return false;

          if (prahovaROM.o !== 'ROM' || prahovaROM.fac !== 'Alleati') return false;

          if (chisinauSOV.o !== 'SOV' || chisinauSOV.fac !== 'Comintern' || !chisinauSOV.note?.includes('Chișinău')) return false;

          if (lapusnaSOV.o !== 'SOV' || lapusnaSOV.fac !== 'Comintern') return false;

          if (cetateaAlbaSOV.o !== 'SOV' || cetateaAlbaSOV.fac !== 'Comintern') return false;

          if (warsawCityPOL.o !== 'POL' || warsawCityPOL.fac !== 'Alleati' || !warsawCityPOL.note?.includes('Bór-Komorowski')) return false;

          if (warsawPragaSOV.o !== 'SOV' || warsawPragaSOV.fac !== 'Comintern' || !warsawPragaSOV.note?.includes('Rokossovskij')) return false;

          if (lublinSOV.o !== 'SOV' || lublinSOV.fac !== 'Comintern' || !lublinSOV.note?.includes('PKWN')) return false;

          if (lwowSOV.o !== 'SOV' || lwowSOV.fac !== 'Comintern' || !lwowSOV.note?.includes('Leopoli')) return false;

          if (minskSOV.o !== 'SOV' || minskSOV.fac !== 'Comintern' || !minskSOV.note?.includes('3 luglio 1944')) return false;

          if (banskaCZE.o !== 'CZE' || banskaCZE.fac !== 'Alleati' || !banskaCZE.note?.includes('Golian')) return false;

          if (bratislavaGER.o !== 'GER' || bratislavaGER.fac !== 'Asse' || (!bratislavaGER.name?.includes('Militärverwaltung') && !bratislavaGER.note?.includes('Militärverwaltung'))) return false;



          // 5. Pacifico e Marianne: Saipan e Guam 100% sotto controllo USA con basi per B-29 Superfortress

          const saipanUSA = resolveFeature({ properties: { CNTR_CODE: 'MP', NAME: 'Saipan' } }, 15);

          const guamUSA = resolveFeature({ properties: { CNTR_CODE: 'GU', NAME: 'Guam' } }, 15);



          if (saipanUSA.o !== 'USA' || saipanUSA.fac !== 'Alleati' || !saipanUSA.note?.includes('B-29')) return false;

          if (guamUSA.o !== 'USA' || guamUSA.fac !== 'Alleati' || !guamUSA.name?.includes('Liberazione') || !guamUSA.note?.includes('Nimitz')) return false;



          // 6. Battaglie storiche georeferenziate di Step 15

          const bParis = HISTORICAL_BATTLES.find((b) => b.id === 'liberation_of_paris_falaise_1944');

          const bDragoon = HISTORICAL_BATTLES.find((b) => b.id === 'operation_dragoon_provence_1944');

          const bJassy = HISTORICAL_BATTLES.find((b) => b.id === 'jassy_kishinev_bucharest_1944');

          const bWarsaw = HISTORICAL_BATTLES.find((b) => b.id === 'warsaw_uprising_vistula_1944');

          const bSlovakia = HISTORICAL_BATTLES.find((b) => b.id === 'slovak_national_uprising_1944');

          const bFlorence = HISTORICAL_BATTLES.find((b) => b.id === 'liberation_of_florence_gothic_line_1944');

          const bGuam = HISTORICAL_BATTLES.find((b) => b.id === 'battle_of_guam_and_tinian_1944');



          if (!bParis || bParis.step !== 15 || !bParis.name.includes('Parigi')) return false;

          if (!bDragoon || bDragoon.step !== 15 || !bDragoon.name.includes('Dragoon')) return false;

          if (!bJassy || bJassy.step !== 15 || !bJassy.name.includes('Bucarest')) return false;

          if (!bWarsaw || bWarsaw.step !== 15 || !bWarsaw.name.includes('Varsavia')) return false;

          if (!bSlovakia || bSlovakia.step !== 15 || !bSlovakia.name.includes('Slovacca')) return false;

          if (!bFlorence || bFlorence.step !== 15 || !bFlorence.name.includes('Firenze')) return false;

          if (!bGuam || bGuam.step !== 15 || !bGuam.name.includes('Guam')) return false;



          // 7. Fortificazioni di Step 15: Linea Gotica attiva in Step 15

          const lineGothic = HISTORICAL_FORTIFICATION_LINES.find((l) => l.id === 'gothic_line_1944');

          if (!lineGothic || !lineGothic.activeSteps.includes(15)) return false;



          return true;

        },

      },

      {

        name: 'Test 103: Audit Geostorico e Topologico Integrale Step 16 (DIC 1944 — Saliente delle Ardenne, Sacca di Colmar, Assedio di Budapest, Curlandia, Pausa sulla Vistola, Balcani, Linea Gotica e Filippine)',

        run: () => {

          // 1. Validazione Step 16 e Cronologia Globale

          if (STEPS.length < 17) return false;

          const s16 = STEPS[16];

          if (

            s16.d !== 'DIC 1944' ||

            !s16.theaterEvents?.europe ||

            !s16.theaterEvents?.asia ||

            !s16.theaterEvents?.africa ||

            !s16.theaterEvents?.americas

          )

            return false;



          // 2. Fronte Occidentale:

          // Saliente delle Ardenne (Bulge): Bastogne, Eupen-Malmedy, Dinant/Celles, Lussemburgo Wehrmacht (GER / Asse)

          const bastogneGER = resolveFeature({ properties: { NUTS_ID: 'BE342', CNTR_CODE: 'BE', NAME: 'Bastogne' } }, 16);

          const eupenGER = resolveFeature({ properties: { NUTS_ID: 'BE336', CNTR_CODE: 'BE', NAME: 'Bezirk Verviers' } }, 16);

          const dinantGER = resolveFeature({ properties: { NUTS_ID: 'BE351', CNTR_CODE: 'BE', NAME: 'Dinant' } }, 16);

          const luxGER = resolveFeature({ properties: { CNTR_CODE: 'LU', NAME: 'Luxembourg' } }, 16);

          const bruxellesBEL = resolveFeature({ properties: { NUTS_ID: 'BE100', CNTR_CODE: 'BE', NAME: 'Bruxelles' } }, 16);

          const antwerpenBEL = resolveFeature({ properties: { NUTS_ID: 'BE211', CNTR_CODE: 'BE', NAME: 'Antwerpen' } }, 16);



          if (bastogneGER.o !== 'GER' || bastogneGER.fac !== 'Asse' || !bastogneGER.name.includes('Ardenne')) return false;

          if (eupenGER.o !== 'GER' || eupenGER.fac !== 'Asse') return false;

          if (dinantGER.o !== 'GER' || dinantGER.fac !== 'Asse') return false;

          if (luxGER.o !== 'GER' || luxGER.fac !== 'Asse' || !luxGER.name.includes('Ardenne')) return false;

          if (bruxellesBEL.o !== 'BEL' || bruxellesBEL.fac !== 'Alleati') return false;

          if (antwerpenBEL.o !== 'BEL' || antwerpenBEL.fac !== 'Alleati' || !antwerpenBEL.note?.includes('Anversa')) return false;



          // Sacca di Colmar (Poche de Colmar): Haut-Rhin (FRF12) Wehrmacht vs Strasburgo (FRF11) e Lorena (FRF33) GPRF

          const colmarGER = resolveFeature({ properties: { NUTS_ID: 'FRF12', CNTR_CODE: 'FR', NAME: 'Haut-Rhin' } }, 16);

          const strasbourgFRA = resolveFeature({ properties: { NUTS_ID: 'FRF11', CNTR_CODE: 'FR', NAME: 'Bas-Rhin' } }, 16);

          const metzFRA = resolveFeature({ properties: { NUTS_ID: 'FRF33', CNTR_CODE: 'FR', NAME: 'Moselle' } }, 16);

          const parisFRA = resolveFeature({ properties: { NUTS_ID: 'FR101', CNTR_CODE: 'FR', NAME: 'Paris' } }, 16);

          const nordFRA = resolveFeature({ properties: { NUTS_ID: 'FRE11', CNTR_CODE: 'FR', NAME: 'Nord' } }, 16);



          if (colmarGER.o !== 'GER' || colmarGER.fac !== 'Asse' || !colmarGER.name.includes('Colmar')) return false;

          if (strasbourgFRA.o !== 'FRA' || strasbourgFRA.fac !== 'Alleati' || !strasbourgFRA.note?.includes('Leclerc')) return false;

          if (metzFRA.o !== 'FRA' || metzFRA.fac !== 'Alleati' || !metzFRA.note?.includes('Patton')) return false;

          if (parisFRA.o !== 'FRA' || parisFRA.fac !== 'Alleati') return false;

          if (nordFRA.o !== 'FRA' || nordFRA.fac !== 'Alleati') return false;



          // Paesi Bassi: Zelanda e Brabante liberati (HOL / Alleati) vs Olanda settentrionale occupata (GER / Hongerwinter)

          const zeelandHOL = resolveFeature({ properties: { NUTS_ID: 'NL341', CNTR_CODE: 'NL', NAME: 'Zeeuwsch-Vlaanderen' } }, 16);

          const brabantHOL = resolveFeature({ properties: { NUTS_ID: 'NL411', CNTR_CODE: 'NL', NAME: 'Noord-Brabant' } }, 16);

          const amsterdamGER = resolveFeature({ properties: { NUTS_ID: 'NL329', CNTR_CODE: 'NL', NAME: 'Amsterdam' } }, 16);



          if ((zeelandHOL.o !== 'HOL' && zeelandHOL.o !== 'NLD') || zeelandHOL.fac !== 'Alleati' || !zeelandHOL.note?.includes('Schelda')) return false;

          if ((brabantHOL.o !== 'HOL' && brabantHOL.o !== 'NLD') || brabantHOL.fac !== 'Alleati') return false;

          if (amsterdamGER.o !== 'GER' || amsterdamGER.fac !== 'Asse' || !amsterdamGER.note?.includes('Hongerwinter')) return false;



          // 3. Fronte Italiano: Linea Gotica congelata; Ravenna, Forlì, Rimini, Pesaro liberati vs Bologna e Massa RSI

          const ravennaITA = resolveFeature({ properties: { NUTS_ID: 'ITH57', CNTR_CODE: 'IT', NAME: 'Ravenna' } }, 16);

          const forliITA = resolveFeature({ properties: { NUTS_ID: 'ITH58', CNTR_CODE: 'IT', NAME: 'Forlì-Cesena' } }, 16);

          const riminiITA = resolveFeature({ properties: { NUTS_ID: 'ITH59', CNTR_CODE: 'IT', NAME: 'Rimini' } }, 16);

          const pesaroITA = resolveFeature({ properties: { NUTS_ID: 'ITI31', CNTR_CODE: 'IT', NAME: 'Pesaro e Urbino' } }, 16);

          const bolognaRSI = resolveFeature({ properties: { NUTS_ID: 'ITH55', CNTR_CODE: 'IT', NAME: 'Bologna' } }, 16);

          const massaRSI = resolveFeature({ properties: { NUTS_ID: 'ITI11', CNTR_CODE: 'IT', NAME: 'Massa-Carrara' } }, 16);



          if (ravennaITA.o !== 'ITA' || ravennaITA.fac !== 'Alleati' || !ravennaITA.note?.includes('Senio')) return false;

          if (forliITA.o !== 'ITA' || forliITA.fac !== 'Alleati') return false;

          if (riminiITA.o !== 'ITA' || riminiITA.fac !== 'Alleati') return false;

          if (pesaroITA.o !== 'ITA' || pesaroITA.fac !== 'Alleati') return false;

          if (bolognaRSI.o !== 'RSI' || bolognaRSI.fac !== 'Asse') return false;

          if (massaRSI.o !== 'RSI' || massaRSI.fac !== 'Asse') return false;



          // 4. Fronte Orientale e Balcani:

          // Sacca di Curlandia (LV003 GER) vs Riga, Estonia e Lituania liberate (SOV)

          const kurzemeGER = resolveFeature({ properties: { NUTS_ID: 'LV003', CNTR_CODE: 'LV', NAME: 'Kurzeme' } }, 16);

          const rigaSOV = resolveFeature({ properties: { NUTS_ID: 'LV006', CNTR_CODE: 'LV', NAME: 'Riga' } }, 16);

          const tallinnSOV = resolveFeature({ properties: { NUTS_ID: 'EE001', CNTR_CODE: 'EE', NAME: 'Tallinn' } }, 16);

          const vilniusSOV = resolveFeature({ properties: { NUTS_ID: 'LT011', CNTR_CODE: 'LT', NAME: 'Vilnius' } }, 16);

          const memelGER = resolveFeature({ properties: { NUTS_ID: 'LT023', CNTR_CODE: 'LT', NAME: 'Klaipėda' } }, 16);



          if (kurzemeGER.o !== 'GER' || kurzemeGER.fac !== 'Asse' || !kurzemeGER.name.includes('Curlandia')) return false;

          if (rigaSOV.o !== 'SOV' || rigaSOV.fac !== 'Comintern') return false;

          if (tallinnSOV.o !== 'SOV' || tallinnSOV.fac !== 'Comintern') return false;

          if (vilniusSOV.o !== 'SOV' || vilniusSOV.fac !== 'Comintern') return false;

          if (memelGER.o !== 'GER' || memelGER.fac !== 'Asse') return false;



          // Pskov liberata a step 15 e 16 (non più Wehrmacht)

          const pskovSOV = resolveFeature({ properties: { NUTS_ID: 'SOV_ADM1_RUS_16_Pskov_Oblast', CNTR_CODE: 'SOV', NAME: 'Pskov' } }, 16);

          if (pskovSOV.o !== 'SOV' || pskovSOV.fac !== 'Comintern') return false;



          // Cessione Petsamo e Carelia da Finlandia a URSS (Armistizio di Mosca 19 settembre 1944)

          const petsamoSOV = resolveFeature({ properties: { NUTS_ID: 'FIN_HIST_262_Petsamo_District', CNTR_CODE: 'FIN_HIST', NAME: 'Petsamo' } }, 16);

          const vyborgSOV = resolveFeature({ properties: { NUTS_ID: 'FIN_HIST_259_Vyborgsky_District', CNTR_CODE: 'FIN_HIST', NAME: 'Vyborg' } }, 16);

          if (petsamoSOV.o !== 'SOV' || petsamoSOV.fac !== 'Comintern') return false;

          if (vyborgSOV.o !== 'SOV' || vyborgSOV.fac !== 'Comintern') return false;



          // Rutenia Subcarpatica (Uzhhorod / Chust) liberata dall'Armata Rossa

          const ftRuthenia = loadedProvs.find((f: any) => f.id === 'CZE_RUTHENIA_SOUTH');

          const rutheniaSOV = ftRuthenia ? resolveFeature(ftRuthenia, 16) : null;

          if (!rutheniaSOV || rutheniaSOV.o !== 'SOV' || rutheniaSOV.fac !== 'Comintern') return false;



          // Polonia: Varsavia Centro macerie Wehrmacht vs Varsavia Praga e Lublino SOV

          const warsawCtrGER = resolveFeature({ properties: { NUTS_ID: 'PL911', CNTR_CODE: 'PL', NAME: 'Warszawa Śródmieście' } }, 16);

          const warsawPragaSOV = resolveFeature({ properties: { NUTS_ID: 'PL912', CNTR_CODE: 'PL', NAME: 'Warszawa Praga' } }, 16);

          const lublinSOV = resolveFeature({ properties: { NUTS_ID: 'PL811', CNTR_CODE: 'PL', NAME: 'Lublin' } }, 16);



          if (warsawCtrGER.o !== 'GER' || warsawCtrGER.fac !== 'Asse') return false;

          if (warsawPragaSOV.o !== 'SOV' || warsawPragaSOV.fac !== 'Comintern') return false;

          if (lublinSOV.o !== 'SOV' || lublinSOV.fac !== 'Comintern') return false;



          // Assedio di Budapest e Balcani

          const budapestHUN = resolveFeature({ properties: { NUTS_ID: 'HU110', CNTR_CODE: 'HU', NAME: 'Budapest' } }, 16);

          const debrecenSOV = resolveFeature({ properties: { NUTS_ID: 'HU321', CNTR_CODE: 'HU', NAME: 'Debrecen' } }, 16);

          const belgradeYUG = resolveFeature({ properties: { NUTS_ID: 'RS110', CNTR_CODE: 'RS', NAME: 'Beograd' } }, 16);

          const sofiaBUL = resolveFeature({ properties: { NUTS_ID: 'BG411', CNTR_CODE: 'BG', NAME: 'Sofia' } }, 16);

          const athensGRE = resolveFeature({ properties: { NUTS_ID: 'EL301', CNTR_CODE: 'EL', NAME: 'Athens' } }, 16);

          const creteGER = resolveFeature({ properties: { NUTS_ID: 'EL431', CNTR_CODE: 'EL', NAME: 'Crete' } }, 16);

          const tiranaALB = resolveFeature({ properties: { NUTS_ID: 'AL011', CNTR_CODE: 'AL', NAME: 'Tirana' } }, 16);



          if (budapestHUN.o !== 'HUN' || budapestHUN.fac !== 'Asse' || !budapestHUN.note?.includes('Budapest')) return false;

          if (debrecenSOV.o !== 'SOV' || debrecenSOV.fac !== 'Comintern') return false;

          if ((belgradeYUG.o !== 'DFJ' && belgradeYUG.o !== 'YUG') || belgradeYUG.fac !== 'Alleati') return false;

          if (sofiaBUL.o !== 'BUL' || sofiaBUL.fac !== 'Alleati') return false;

          if (athensGRE.o !== 'GRE' || athensGRE.fac !== 'Alleati') return false;

          if (creteGER.o !== 'GER' || creteGER.fac !== 'Asse') return false;

          if (tiranaALB.o !== 'ALB' || tiranaALB.fac !== 'Alleati') return false;



          // Finlandia (Guerra di Lapponia)

          const finlandFIN = resolveFeature({ properties: { NUTS_ID: 'FI1B1', CNTR_CODE: 'FI', NAME: 'Helsinki' } }, 16);

          if (finlandFIN.o !== 'FIN' || finlandFIN.fac !== 'Alleati' || !finlandFIN.note?.includes('Lapponia')) return false;



          // 5. Pacifico, Filippine e Fronte Asiatico:

          // Leyte e Mindoro USA vs Manila e Luzon JAP; Palau / Peleliu USA; Guangxi IJA (Corridoio Ichi-Go)

          const leyteUSA = resolveFeature({ properties: { id: 'PH08', CNTR_CODE: 'PH', NAME: 'Leyte' } }, 16);

          const mindoroUSA = resolveFeature({ properties: { id: 'PH41', CNTR_CODE: 'PH', NAME: 'Mindoro' } }, 16);

          const manilaJAP = resolveFeature({ properties: { id: 'PH00', CNTR_CODE: 'PH', NAME: 'Manila' } }, 16);

          const palauUSA = resolveFeature({ properties: { CNTR_CODE: 'PW', NAME: 'Palau' } }, 16);

          const guangxiJAP = resolveFeature({ properties: { NUTS_ID: 'CHN_GUANGXI', CNTR_CODE: 'CN_PROV', NAME: 'Guangxi' } }, 16);

          const hbPalau = loadedHbs.find((f: any) => {

            const c = f.__cent || f.properties?.centroid;

            return c && c[0] >= 134 && c[0] <= 135 && c[1] >= 6.8 && c[1] <= 8.2;

          });

          const resPalauHB = hbPalau ? resolveHB(hbPalau, 16) : null;



          if (leyteUSA.o !== 'USA' || leyteUSA.fac !== 'Alleati' || !leyteUSA.note?.includes('Leyte')) return false;

          if (mindoroUSA.o !== 'USA' || mindoroUSA.fac !== 'Alleati' || !mindoroUSA.note?.includes('Mindoro')) return false;

          if (manilaJAP.o !== 'JAP' || manilaJAP.fac !== 'Asse') return false;

          if (palauUSA.o !== 'USA' || palauUSA.fac !== 'Alleati' || !palauUSA.note?.includes('Peleliu')) return false;

          if (resPalauHB && (resPalauHB.o !== 'USA' || resPalauHB.fac !== 'Alleati')) return false;

          if (guangxiJAP.o !== 'JAP' || guangxiJAP.fac !== 'Asse' || !guangxiJAP.note?.includes('Ichi-Go')) return false;



          // 6. Battaglie storiche georeferenziate di Step 16

          const bBulge = HISTORICAL_BATTLES.find((b) => b.id === 'battle_of_the_bulge_ardennes_1944');

          const bColmar = HISTORICAL_BATTLES.find((b) => b.id === 'colmar_pocket_alsace_1944');

          const bBudapest = HISTORICAL_BATTLES.find((b) => b.id === 'siege_of_budapest_1944');

          const bCourland = HISTORICAL_BATTLES.find((b) => b.id === 'courland_pocket_1944');

          const bLeyte = HISTORICAL_BATTLES.find((b) => b.id === 'battle_of_leyte_gulf_philippines_1944');

          const bLapland = HISTORICAL_BATTLES.find((b) => b.id === 'lapland_war_rovaniemi_1944');



          if (!bBulge || bBulge.step !== 16 || !bBulge.name.includes('Ardenne')) return false;

          if (!bColmar || bColmar.step !== 16 || !bColmar.name.includes('Colmar')) return false;

          if (!bBudapest || bBudapest.step !== 16 || !bBudapest.name.includes('Budapest')) return false;

          if (!bCourland || bCourland.step !== 16 || !bCourland.name.includes('Curlandia')) return false;

          if (!bLeyte || bLeyte.step !== 16 || !bLeyte.name.includes('Leyte')) return false;

          if (!bLapland || bLapland.step !== 16 || !bLapland.name.includes('Lapponia')) return false;



          return true;

        },

      },

      {

        name: 'Test 104: Jugoslavia Federale Democratica (DFJ) — Metadati, bandiera e liberazione partigiana di Tito (Step 16)',

        run: () => {

          // 1. Metadati sovrani dell\'evoluzione titina

          const dfjMeta = getOwnerMeta('DFJ', 16);

          if (dfjMeta.id !== 'DFJ' || dfjMeta.f !== 'Alleati') return false;

          const label = typeof dfjMeta.l === 'function' ? dfjMeta.l(16) : dfjMeta.l;

          if (!label.includes('Jugoslavia Federale Democratica') || !label.includes('Tito')) return false;

          if (!dfjMeta.leader?.includes('Tito') || !dfjMeta.shortName?.includes('DFJ')) return false;



          // 2. Bandiera ufficiale partigiana (AVNOJ / Tito tricolore con stella rossa)

          const dfjFlagSvg = getCountryFlagSvg('DFJ', 16);

          if (!dfjFlagSvg.includes('data:image/png;base64') || !dfjFlagSvg.includes('<image')) return false;



          const yugFlag16 = getCountryFlagSvg('YUG', 16);

          if (!yugFlag16.includes('data:image/png;base64')) return false;



          // 3. Risoluzione geopolitica e toponomastica balcanica (Step 16)

          const beogradDFJ = resolveFeature({ properties: { NUTS_ID: 'RS110', CNTR_CODE: 'RS', NAME: 'Beograd' } }, 16);

          if (beogradDFJ.o !== 'DFJ' || beogradDFJ.fac !== 'Alleati' || !beogradDFJ.adminEntity?.includes('Demokratska Federativna Jugoslavija')) return false;



          const podgoricaDFJ = resolveFeature({ properties: { NUTS_ID: 'ME000', CNTR_CODE: 'ME', NAME: 'Podgorica' } }, 16);

          if (podgoricaDFJ.o !== 'DFJ' || podgoricaDFJ.fac !== 'Alleati') return false;



          const skopjeDFJ = resolveFeature({ properties: { NUTS_ID: 'MK008', CNTR_CODE: 'MK', NAME: 'Skopje' } }, 16);

          if (skopjeDFJ.o !== 'DFJ' || skopjeDFJ.fac !== 'Alleati') return false;



          // 4. Fronte Sirmiano (Srem/RS127) resta sbarramento NDH/Wehrmacht a ovest di Belgrado

          const sremCRO = resolveFeature({ properties: { NUTS_ID: 'RS127', CNTR_CODE: 'RS', NAME: 'Sremska Mitrovica' } }, 16);

          if (sremCRO.o !== 'CRO' || sremCRO.fac !== 'Fantoccio' || !sremCRO.name.includes('Srijem')) return false;



          return true;

        },

      },

      {

        name: 'Test 105: Audit Geostorico e Topologico Integrale Step 17 (APR 1945 — Crollo del Reich, Giunzione sull\'Elba a Torgau, Presa di Vienna, Insurrezione del 25 Aprile nel Nord Italia, Battaglia di Berlino e Sbarco a Okinawa)',

        run: () => {

          // 1. Validazione Step 17 e Cronologia Globale

          if (STEPS.length < 18) return false;

          const s17 = STEPS[17];

          if (

            s17.d !== 'APR 1945' ||

            !s17.theaterEvents?.europe ||

            !s17.theaterEvents?.asia ||

            !s17.theaterEvents?.africa ||

            !s17.theaterEvents?.americas

          )

            return false;



          // 2. Fronte Tedesco: Spezzamento del Reich

          // Giunzione sull'Elba a Torgau / Lipsia (1ª Armata USA)

          const leipzigUSA = resolveFeature({ properties: { NUTS_ID: 'DED51', CNTR_CODE: 'DE', NAME: 'Leipzig' } }, 17);

          if (leipzigUSA.o !== 'USA' || leipzigUSA.fac !== 'Alleati' || !leipzigUSA.name.includes('Torgau')) return false;



          // Berlino circondata e assalto urbano (Armata Rossa / SOV)

          const berlinSOV = resolveFeature({ properties: { NUTS_ID: 'DE300', CNTR_CODE: 'DE', NAME: 'Berlin' } }, 17);

          if (berlinSOV.o !== 'SOV' || berlinSOV.fac !== 'Comintern' || !berlinSOV.name.includes('Reichstag')) return false;



          // Sacca della Ruhr cancellata (Duisburg/Köln USA)

          const ruhrUSA = resolveFeature({ properties: { NUTS_ID: 'DEA12', CNTR_CODE: 'DE', NAME: 'Duisburg' } }, 17);

          if (ruhrUSA.o !== 'USA' || ruhrUSA.fac !== 'Alleati' || !ruhrUSA.name.includes('Ruhr')) return false;



          // Settore Nord (Amburgo e Schleswig-Holstein ancora Wehrmacht)

          const hamburgGER = resolveFeature({ properties: { NUTS_ID: 'DE600', CNTR_CODE: 'DE', NAME: 'Hamburg' } }, 17);

          const kielGER = resolveFeature({ properties: { NUTS_ID: 'DEF02', CNTR_CODE: 'DE', NAME: 'Kiel' } }, 17);

          if (hamburgGER.o !== 'GER' || hamburgGER.fac !== 'Asse' || !hamburgGER.name.includes('Hamburg')) return false;

          if (kielGER.o !== 'GER' || kielGER.fac !== 'Asse') return false;



          // Norimberga e Monaco liberate (7ª Armata USA) vs Baden-Württemberg (1ª Armata Francese)

          const munichUSA = resolveFeature({ properties: { NUTS_ID: 'DE212', CNTR_CODE: 'DE', NAME: 'München' } }, 17);

          const stuttgartFRA = resolveFeature({ properties: { NUTS_ID: 'DE111', CNTR_CODE: 'DE', NAME: 'Stuttgart' } }, 17);

          if (munichUSA.o !== 'USA' || munichUSA.fac !== 'Alleati') return false;

          if (stuttgartFRA.o !== 'FRA' || stuttgartFRA.fac !== 'Alleati' || !stuttgartFRA.name.includes('Baden-Württemberg')) return false;



          // 3. Austria e Ungheria

          // Vienna liberata dall'Armata Rossa (Tolbuchin) vs Tirolo USA

          const wienSOV = resolveFeature({ properties: { NUTS_ID: 'AT130', CNTR_CODE: 'AT', NAME: 'Wien' } }, 17);

          const tirolUSA = resolveFeature({ properties: { NUTS_ID: 'AT33', CNTR_CODE: 'AT', NAME: 'Tirol' } }, 17);

          const budapestSOV = resolveFeature({ properties: { NUTS_ID: 'HU110', CNTR_CODE: 'HU', NAME: 'Budapest' } }, 17);

          if (wienSOV.o !== 'SOV' || wienSOV.fac !== 'Comintern' || !wienSOV.name.includes('Wien')) return false;

          if (tirolUSA.o !== 'USA' || tirolUSA.fac !== 'Alleati') return false;

          if (budapestSOV.o !== 'SOV' || budapestSOV.fac !== 'Comintern') return false;



          // 4. Fronte Italiano: Crollo della RSI e Insurrezione del 25 Aprile

          // Milano, Torino, Genova, Bologna, Venezia liberate (CLNAI / ITA)

          const milanoITA = resolveFeature({ properties: { NUTS_ID: 'ITC4C', CNTR_CODE: 'IT', NAME: 'Milano' } }, 17);

          const torinoITA = resolveFeature({ properties: { NUTS_ID: 'ITC11', CNTR_CODE: 'IT', NAME: 'Torino' } }, 17);

          const genovaITA = resolveFeature({ properties: { NUTS_ID: 'ITC33', CNTR_CODE: 'IT', NAME: 'Genova' } }, 17);

          const bolognaITA = resolveFeature({ properties: { NUTS_ID: 'ITH55', CNTR_CODE: 'IT', NAME: 'Bologna' } }, 17);

          const veneziaITA = resolveFeature({ properties: { NUTS_ID: 'ITH35', CNTR_CODE: 'IT', NAME: 'Venezia' } }, 17);

          const bolzanoOZAV = resolveFeature({ properties: { NUTS_ID: 'ITH10', CNTR_CODE: 'IT', NAME: 'Bolzano' } }, 17);



          if (milanoITA.o !== 'ITA' || milanoITA.fac !== 'Alleati' || !milanoITA.name.includes('25 Aprile')) return false;

          if (torinoITA.o !== 'ITA' || torinoITA.fac !== 'Alleati') return false;

          if (genovaITA.o !== 'ITA' || genovaITA.fac !== 'Alleati') return false;

          if (bolognaITA.o !== 'ITA' || bolognaITA.fac !== 'Alleati') return false;

          if (veneziaITA.o !== 'ITA' || veneziaITA.fac !== 'Alleati') return false;

          if (bolzanoOZAV.o !== 'OZAV' || bolzanoOZAV.fac !== 'Asse') return false;



          // 5. Festungen e Sacche Isolate: Curlandia, Breslavia, Creta, Tasche Atlantiche Francesi

          const kurzemeGER = resolveFeature({ properties: { NUTS_ID: 'LV003', CNTR_CODE: 'LV', NAME: 'Kurzeme' } }, 17);

          const breslauGER = resolveFeature({ properties: { NUTS_ID: 'PL514', CNTR_CODE: 'PL', NAME: 'Wrocław' } }, 17);

          const creteGER = resolveFeature({ properties: { NUTS_ID: 'EL431', CNTR_CODE: 'EL', NAME: 'Crete' } }, 17);

          const lorientGER = resolveFeature({ properties: { NUTS_ID: 'FRH04', CNTR_CODE: 'FR', NAME: 'Morbihan' } }, 17);

          const rochelleGER = resolveFeature({ properties: { NUTS_ID: 'FRI32', CNTR_CODE: 'FR', NAME: 'Charente-Maritime' } }, 17);

          const parisFRA = resolveFeature({ properties: { NUTS_ID: 'FR101', CNTR_CODE: 'FR', NAME: 'Paris' } }, 17);



          if (kurzemeGER.o !== 'GER' || kurzemeGER.fac !== 'Asse' || !kurzemeGER.name.includes('Curlandia')) return false;

          if (breslauGER.o !== 'GER' || breslauGER.fac !== 'Asse' || !breslauGER.name.includes('Breslau')) return false;

          if (creteGER.o !== 'GER' || creteGER.fac !== 'Asse') return false;

          if (lorientGER.o !== 'GER' || lorientGER.fac !== 'Asse' || !lorientGER.name.includes('Festung Atlantica')) return false;

          if (rochelleGER.o !== 'GER' || rochelleGER.fac !== 'Asse') return false;

          if (parisFRA.o !== 'FRA' || parisFRA.fac !== 'Alleati') return false;



          // 5b. Paesi Bassi: Festung Holland vs Liberazione Canadese del Nord ed Est

          const amsterdamGER = resolveFeature({ properties: { NUTS_ID: 'NL329', CNTR_CODE: 'NL', NAME: 'Groot-Amsterdam' } }, 17);

          const groningenHOL = resolveFeature({ properties: { NUTS_ID: 'NL111', CNTR_CODE: 'NL', NAME: 'Oost-Groningen' } }, 17);

          if (amsterdamGER.o !== 'GER' || amsterdamGER.fac !== 'Asse' || !amsterdamGER.name.includes('Festung Holland')) return false;

          if (groningenHOL.o !== 'HOL' || groningenHOL.fac !== 'Alleati') return false;



          // 5c. Baltico e Prussia Orientale: Danzica (POL), Königsberg espugnata (SOV), Memelland liberato (SOV), Palanga e Litorale lituano (SOV)

          const danzigFeat = loadedProvs.find((f: any) => f.id === 'DANZIG' || f.properties?.NAME === 'Danzig');

          const konigsbergFeat = loadedProvs.find((f: any) => f.id === 'DE_HIST_KONIGSBERG' || f.properties?.CNTR_ID === 'GER_KONIGSBERG' || f.properties?.NAME === 'Königsberg');

          const memelFeat = loadedProvs.find((f: any) => f.id === 'MEMEL_HIST_TERRITORY' || f.properties?.NAME?.includes('Memel'));

          const palangaFeat = loadedProvs.find((f: any) => f.id === 'LT_HIST_PALANGA' || f.properties?.NAME?.includes('Palanga'));

          const danzigPOL = danzigFeat ? danzigFeat.__resolve(17) : resolveFeature({ properties: { CNTR_CODE: 'PL', NUTS_ID: 'PL633', NAME: 'Gdańsk' } }, 17);

          const konigsbergSOV = konigsbergFeat ? konigsbergFeat.__resolve(17) : resolveFeature({ properties: { CNTR_CODE: 'DE', id: 'DE_HIST_KONIGSBERG', NAME: 'Königsberg' } }, 17);

          const memelSOV = memelFeat ? memelFeat.__resolve(17) : resolveFeature({ properties: { CNTR_CODE: 'LT', NUTS_ID: 'LT023', NAME: 'Klaipėda' } }, 17);

          const palangaSOV = palangaFeat ? palangaFeat.__resolve(17) : resolveFeature({ properties: { CNTR_CODE: 'LT', id: 'LT_HIST_PALANGA', NAME: 'Palanga and Kretinga' } }, 17);



          if (danzigPOL.o !== 'POL' || danzigPOL.fac !== 'Alleati') return false;

          if (konigsbergSOV.o !== 'SOV' || konigsbergSOV.fac !== 'Comintern') return false;

          if (memelSOV.o !== 'SOV' || memelSOV.fac !== 'Comintern') return false;

          if (palangaSOV.o !== 'SOV' || palangaSOV.fac !== 'Comintern') return false;



          // Corridoio Polacco (Gdynia liberata -> POL) e Zara liberata (DFJ)

          const corridorFeat = loadedProvs.find((f: any) => f.id === 'PL_HIST_CORRIDOR' || f.properties?.CNTR_ID === 'POL_CORRIDOR');

          const corridorPOL = corridorFeat ? corridorFeat.__resolve(17) : resolveFeature({ properties: { CNTR_CODE: 'PL', id: 'PL_HIST_CORRIDOR', NAME: 'Polish Corridor' } }, 17);

          const zaraFeat = loadedProvs.find((f: any) => f.id === 'IT_ZARA' || f.properties?.CNTR_ID === 'IT_ZARA' || f.properties?.NAME === 'Zara');

          const zaraDFJ = zaraFeat ? zaraFeat.__resolve(17) : resolveFeature({ properties: { CNTR_CODE: 'IT', id: 'IT_ZARA', NAME: 'Zara' } }, 17);

          if (corridorPOL.o !== 'POL' || corridorPOL.fac !== 'Alleati') return false;

          if (zaraDFJ.o !== 'DFJ' || zaraDFJ.fac !== 'Alleati') return false;



          // 5d. Entità particolari europee armonizzate (Single Source of Truth)

          // Bosnia ed Erzegovina (DFJ), Dodecaneso (Festung Wehrmacht), Monaco (Liberata MCO), Albania (ALB)

          const bosniaFedFeat = loadedProvs.find((f: any) => f.id === 'YUG_HIST_BOSNIA' || f.properties?.id === 'BABIH');

          const bosniaFedDFJ = bosniaFedFeat ? bosniaFedFeat.__resolve(17) : resolveFeature({ properties: { CNTR_CODE: 'BA', id: 'YUG_HIST_BOSNIA', NAME: 'Bosna' } }, 17);

          const bosniaSrpFeat = loadedProvs.find((f: any) => f.id === 'BA_HIST_SRPSKA' || f.properties?.id === 'BASRP');

          const bosniaSrpDFJ = bosniaSrpFeat ? bosniaSrpFeat.__resolve(17) : resolveFeature({ properties: { CNTR_CODE: 'BA', id: 'BA_HIST_SRPSKA', NAME: 'Banja Luka' } }, 17);

          const dodecaneseGER = resolveFeature({ properties: { NUTS_ID: 'EL421', CNTR_CODE: 'EL', NAME: 'Rhodes' } }, 17);

          const monacoFeat = loadedProvs.find((f: any) => f.id === 'MCO_HIST' || f.properties?.CNTR_ID === 'MCO');

          const monacoMCO = monacoFeat ? monacoFeat.__resolve(17) : resolveFeature({ properties: { CNTR_CODE: 'MC', id: 'MCO_HIST', NAME: 'Monaco' } }, 17);

          const albaniaHB = resolveHB({ properties: { NAME: 'Albania' } }, 17);



          if (bosniaFedDFJ.o !== 'DFJ' || bosniaFedDFJ.fac !== 'Alleati') return false;

          if (bosniaSrpDFJ.o !== 'DFJ' || bosniaSrpDFJ.fac !== 'Alleati') return false;

          if (dodecaneseGER.o !== 'GER' || dodecaneseGER.fac !== 'Asse' || !dodecaneseGER.name.includes('Festung')) return false;

          if (monacoMCO.o !== 'MCO' || monacoMCO.fac !== 'Neutrale') return false;

          if (albaniaHB.o !== 'ALB' || albaniaHB.fac !== 'Alleati') return false;



          // 6. Pacifico e Asia Orientale: Okinawa (USA), Filippine (USA), Birmania (UK), Indocina Meigo (JAP), Cina (Zhijiang / Yan'an)

          const okinawaUSA = resolveFeature({ properties: { id: 'JP47', CNTR_CODE: 'JP', NAME: 'Okinawa' } }, 17);

          const manilaUSA = resolveFeature({ properties: { id: 'PH00', CNTR_CODE: 'PH', NAME: 'Manila' } }, 17);

          const burmaUK = resolveFeature({ properties: { CNTR_CODE: 'MM', NAME: 'Burma' } }, 17);

          const mandalayUK = resolveFeature({ properties: { id: 'MM_MDY', CNTR_CODE: 'MM', NAME: 'Mandalay' } }, 17);

          const tenasserimJAP = resolveFeature({ properties: { id: 'MM_TAN', CNTR_CODE: 'MM', NAME: 'Tenasserim' } }, 17);

          const indochinaJAP = resolveFeature({ properties: { id: 'VN1', CNTR_CODE: 'VN', NAME: 'Hanoi' } }, 17);

          const hunanJAP = resolveFeature({ properties: { id: 'CHN_HUNAN', CNTR_CODE: 'CN_PROV', NAME: 'Hunan' } }, 17);

          const shaanxiCCP = resolveFeature({ properties: { id: 'CHN_SHAANXI', CNTR_CODE: 'CN_PROV', NAME: 'Shaanxi' } }, 17);



          if (okinawaUSA.o !== 'USA' || okinawaUSA.fac !== 'Alleati' || !okinawaUSA.note?.includes('Iceberg')) return false;

          if (manilaUSA.o !== 'USA' || manilaUSA.fac !== 'Alleati') return false;

          if (burmaUK.o !== 'UK' || burmaUK.fac !== 'Alleati' || !burmaUK.note?.includes('Dracula')) return false;

          if (mandalayUK.o !== 'UK' || mandalayUK.fac !== 'Alleati') return false;

          if (tenasserimJAP.o !== 'JAP' || tenasserimJAP.fac !== 'Asse') return false;

          if (indochinaJAP.o !== 'JAP' || indochinaJAP.fac !== 'Asse' || !indochinaJAP.note?.includes('Meigo Sakusen')) return false;

          if (hunanJAP.o !== 'JAP' || hunanJAP.fac !== 'Asse' || !hunanJAP.note?.includes('Zhijiang')) return false;

          if (shaanxiCCP.o !== 'CCP_CHI' || shaanxiCCP.fac !== 'Comintern' || !shaanxiCCP.note?.includes('VII Congresso')) return false;



          // 6b. Togo Francese (GPRF / Verso Tutela ONU)

          const togo17 = resolveFeature({ properties: { CNTR_CODE: 'TG', NAME: 'Togo' } }, 17);

          if (togo17.o !== 'F_AOF' || togo17.fac !== 'Alleati' || !togo17.name.includes('GPRF') || !togo17.note?.includes('Tutela ONU')) return false;



          // 7. Battaglie storiche georeferenziate di Step 17

          const bBerlin = HISTORICAL_BATTLES.find((b) => b.id === 'battle_of_berlin_1945');

          const bTorgau = HISTORICAL_BATTLES.find((b) => b.id === 'elbe_junction_torgau_1945');

          const bRuhr = HISTORICAL_BATTLES.find((b) => b.id === 'ruhr_pocket_liquidation_1945');

          const bVienna = HISTORICAL_BATTLES.find((b) => b.id === 'vienna_offensive_1945');

          const bItalyIns = HISTORICAL_BATTLES.find((b) => b.id === 'italian_general_insurrection_1945');

          const bBreslau = HISTORICAL_BATTLES.find((b) => b.id === 'festung_breslau_siege_1945');

          const bOkinawa = HISTORICAL_BATTLES.find((b) => b.id === 'battle_of_okinawa_operation_iceberg_1945');

          const bBurma = HISTORICAL_BATTLES.find((b) => b.id === 'burma_campaign_dracula_1945');



          if (!bBerlin || bBerlin.step !== 17 || !bBerlin.name.includes('Berlino')) return false;

          if (!bTorgau || bTorgau.step !== 17 || !bTorgau.name.includes('Torgau')) return false;

          if (!bRuhr || bRuhr.step !== 17 || !bRuhr.name.includes('Ruhr')) return false;

          if (!bVienna || bVienna.step !== 17 || !bVienna.name.includes('Vienna')) return false;

          if (!bItalyIns || bItalyIns.step !== 17 || !bItalyIns.name.includes('Insurrezione')) return false;

          if (!bBreslau || bBreslau.step !== 17 || (!bBreslau.name.includes('Breslau') && !bBreslau.name.includes('Breslavia'))) return false;

          if (!bOkinawa || bOkinawa.step !== 17 || !bOkinawa.name.includes('Okinawa')) return false;

          if (!bBurma || bBurma.step !== 17 || !bBurma.name.includes('Rangoon')) return false;



          // 8. Fortificazioni di Step 17: Shuri Line a Okinawa, Berlin defense ring, Festung Breslau

          const lineShuri = HISTORICAL_FORTIFICATION_LINES.find((l) => l.id === 'shuri_line_okinawa_1945');

          const lineBerlin = HISTORICAL_FORTIFICATION_LINES.find((l) => l.id === 'berlin_defense_ring_1945');

          const lineBreslau = HISTORICAL_FORTIFICATION_LINES.find((l) => l.id === 'festung_breslau_perimeter_1945');



          if (!lineShuri || !lineShuri.activeSteps.includes(17)) return false;

          if (!lineBerlin || !lineBerlin.activeSteps.includes(17)) return false;

          if (!lineBreslau || !lineBreslau.activeSteps.includes(17)) return false;



          return true;

        },

      },

      {

        name: 'Test 106: Deep Dive Geostorico e Topologico Regni di Norvegia e Danimarca (NUTS-3, 1936-1945)',

        run: () => {

          // 1. Norvegia (13 entità NUTS-3):

          // Step 0: Oslo è capitale sovrana neutrale (NOR, Neutrale)

          const oslo_s0 = resolveFeature({ id: 'NO081', properties: { NUTS_ID: 'NO081', CNTR_CODE: 'NO', NAME: 'Oslo' } }, 0);

          if (oslo_s0.o !== 'NOR' || oslo_s0.fac !== 'Neutrale' || !oslo_s0.name.includes('Oslo')) return false;



          // Step 6: Occupazione tedesca & Reichskommissariat Terboven

          const oslo_s6 = resolveFeature({ id: 'NO081', properties: { NUTS_ID: 'NO081', CNTR_CODE: 'NO', NAME: 'Oslo' } }, 6);

          if (oslo_s6.o !== 'GER' || oslo_s6.fac !== 'Asse' || !oslo_s6.name.includes('Terboven')) return false;



          // Viken (NO082): Fortezza di Oscarsborg e affondamento del Blücher

          const viken_s6 = resolveFeature({ id: 'NO082', properties: { NUTS_ID: 'NO082', CNTR_CODE: 'NO', NAME: 'Viken' } }, 6);

          if (viken_s6.o !== 'GER' || !viken_s6.note?.includes('Blücher')) return false;



          // Vestfold og Telemark (NO091): Sabotaggio acqua pesante Vemork (Op. Gunnerside)

          const telemark_s10 = resolveFeature({ id: 'NO091', properties: { NUTS_ID: 'NO091', CNTR_CODE: 'NO', NAME: 'Vestfold og Telemark' } }, 10);

          if (telemark_s10.o !== 'GER' || !telemark_s10.name.includes('Gunnerside') || !telemark_s10.note?.includes('Vemork')) return false;



          // Nordland (NO071): Narvik e vittoria del Gen. Fleischer

          const narvik_s6 = resolveFeature({ id: 'NO071', properties: { NUTS_ID: 'NO071', CNTR_CODE: 'NO', NAME: 'Nordland' } }, 6);

          if (narvik_s6.o !== 'GER' || !narvik_s6.note?.includes('Fleischer')) return false;



          // Troms og Finnmark (NO074):

          // Step 16: Kirkenes e Finnmark orientale liberati dall'Armata Rossa -> NOR (Alleati)

          const finnmark_s16 = resolveFeature({ id: 'NO074', properties: { NUTS_ID: 'NO074', CNTR_CODE: 'NO', NAME: 'Troms og Finnmark' } }, 16);

          if (finnmark_s16.o !== 'NOR' || finnmark_s16.fac !== 'Alleati' || !finnmark_s16.name.includes('Finnmark Liberato')) return false;



          // Step 17: Sacca di Norvegia (GER Asse per Oslo, NOR Alleati per Finnmark)

          const oslo_s17 = resolveFeature({ id: 'NO081', properties: { NUTS_ID: 'NO081', CNTR_CODE: 'NO', NAME: 'Oslo' } }, 17);

          const finnmark_s17 = resolveFeature({ id: 'NO074', properties: { NUTS_ID: 'NO074', CNTR_CODE: 'NO', NAME: 'Troms og Finnmark' } }, 17);

          if (oslo_s17.o !== 'GER' || oslo_s17.fac !== 'Asse' || !oslo_s17.name.includes('Sacca di Norvegia')) return false;

          if (finnmark_s17.o !== 'NOR' || finnmark_s17.fac !== 'Alleati') return false;



          // 2. Danimarca (11 entità NUTS-3):

          // Step 0: Copenaghen neutrale (DEN, Neutrale)

          const cph_s0 = resolveFeature({ id: 'DK011', properties: { NUTS_ID: 'DK011', CNTR_CODE: 'DK', NAME: 'København' } }, 0);

          if (cph_s0.o !== 'DEN' || cph_s0.fac !== 'Neutrale' || !cph_s0.name.includes('København')) return false;



          // Step 6: Musterprotektorat sotto occupazione (GER, Asse)

          const cph_s6 = resolveFeature({ id: 'DK011', properties: { NUTS_ID: 'DK011', CNTR_CODE: 'DK', NAME: 'København' } }, 6);

          if (cph_s6.o !== 'GER' || cph_s6.fac !== 'Asse' || !cph_s6.name.includes('Musterprotektorat')) return false;



          // Step 13: Autoaffondamento della flotta (Op. Safari) e legge marziale

          const cph_s13 = resolveFeature({ id: 'DK011', properties: { NUTS_ID: 'DK011', CNTR_CODE: 'DK', NAME: 'København' } }, 13);

          if (cph_s13.o !== 'GER' || !cph_s13.note?.includes('Safari')) return false;



          // Nordsjælland (DK013): Salvataggio via mare dei 7.200 ebrei verso la Svezia

          const nordsj_s13 = resolveFeature({ id: 'DK013', properties: { NUTS_ID: 'DK013', CNTR_CODE: 'DK', NAME: 'Nordsjælland' } }, 13);

          if (nordsj_s13.o !== 'GER' || !nordsj_s13.name.includes('Salvataggio') || !nordsj_s13.note?.includes('Helsingør')) return false;



          // Sydjylland (DK032): Confine 1920 e difesa all'alba del 9 aprile 1940

          const sydj_s6 = resolveFeature({ id: 'DK032', properties: { NUTS_ID: 'DK032', CNTR_CODE: 'DK', NAME: 'Sydjylland' } }, 6);

          if (sydj_s6.o !== 'GER' || !sydj_s6.note?.includes('Haderslev')) return false;



          // Nordjylland (DK050): Basi aeree di Aalborg e Batteria pesante di Hanstholm

          const nordj_s6 = resolveFeature({ id: 'DK050', properties: { NUTS_ID: 'DK050', CNTR_CODE: 'DK', NAME: 'Nordjylland' } }, 6);

          if (nordj_s6.o !== 'GER' || !nordj_s6.note?.includes('Hanstholm')) return false;



          // Bornholm (DK014) a Step 17: Presidio Wehrmacht isolato prima del bombardamento e liberazione dell'Armata Rossa

          const bornh_s17 = resolveFeature({ id: 'DK014', properties: { NUTS_ID: 'DK014', CNTR_CODE: 'DK', NAME: 'Bornholm' } }, 17);

          if (bornh_s17.o !== 'GER' || bornh_s17.fac !== 'Asse' || !bornh_s17.name.includes('Bornholm')) return false;



          // Step 17: Copenaghen (Operazione Carthage sullo Shellhus)

          const cph_s17 = resolveFeature({ id: 'DK011', properties: { NUTS_ID: 'DK011', CNTR_CODE: 'DK', NAME: 'København' } }, 17);

          if (cph_s17.o !== 'GER' || !cph_s17.name.includes('Carthage') || !cph_s17.note?.includes('Shellhus')) return false;



          return true;

        },

      },

      {

        name: 'Test 107: Geostoria Eventi Minori & Allineamento Sovranità (Tannu Tuva, Monaco, Tunisia, Antille, Saint-Pierre e Unificazione Colori Francia GPRF)',

        run: () => {

          // 1. Tannu Tuva: Step 0..15 Repubblica Popolare Indipendente (TUV) -> Step 16..17 Oblast' Autonoma URSS (SOV, 11 Ottobre 1944)

          const tuv_s0 = resolveFeature({ id: 'TUV', properties: { NAME: 'Tannu Tuva', CNTR_CODE: 'RU' } }, 0);

          if (tuv_s0.o !== 'TUV' || tuv_s0.fac !== 'Comintern' || !tuv_s0.name.includes('Tyva')) return false;



          const tuv_s15 = resolveFeature({ id: 'TUV', properties: { NAME: 'Tannu Tuva', CNTR_CODE: 'RU' } }, 15);

          if (tuv_s15.o !== 'TUV' || tuv_s15.fac !== 'Comintern') return false;



          const tuv_s16 = resolveFeature({ id: 'TUV', properties: { NAME: 'Tannu Tuva', CNTR_CODE: 'RU' } }, 16);

          if (tuv_s16.o !== 'SOV' || tuv_s16.fac !== 'Comintern' || !tuv_s16.name.includes('Tuva')) return false;



          const tuv_s17 = resolveFeature({ id: 'TUV', properties: { NAME: 'Tannu Tuva', CNTR_CODE: 'RU' } }, 17);

          if (tuv_s17.o !== 'SOV' || tuv_s17.fac !== 'Comintern') return false;



          // Verifica feature autentica della mappa mondiale (SOV_ADM1_RUS_55_Tuva)

          const tuv_map_s0 = resolveFeature({ id: 'SOV_ADM1_RUS_55_Tuva', properties: { NUTS_ID: 'SOV_ADM1_RUS_55_Tuva', CNTR_CODE: 'TUV', NUTS_NAME: 'Repubblica Popolare di Tuva (Tannu Tuva)' } }, 0);

          if (tuv_map_s0.o !== 'TUV' || tuv_map_s0.fac !== 'Comintern') return false;



          const tuv_map_s17 = resolveFeature({ id: 'SOV_ADM1_RUS_55_Tuva', properties: { NUTS_ID: 'SOV_ADM1_RUS_55_Tuva', CNTR_CODE: 'TUV', NUTS_NAME: 'Repubblica Popolare di Tuva (Tannu Tuva)' } }, 17);

          if (tuv_map_s17.o !== 'SOV' || tuv_map_s17.fac !== 'Comintern' || !tuv_map_s17.name.includes('Tuva')) return false;



          // Verifica Pomurska / Prekmurje (SI031): YUG a s0 -> HUN a s8..16 -> DFJ a s17 (Liberata il 3 Aprile 1945)

          const si031_s0 = resolveFeature({ id: 'SI031', properties: { NUTS_ID: 'SI031', CNTR_CODE: 'SI', NAME: 'Pomurska' } }, 0);

          if (si031_s0.o !== 'YUG') return false;



          const si031_s8 = resolveFeature({ id: 'SI031', properties: { NUTS_ID: 'SI031', CNTR_CODE: 'SI', NAME: 'Pomurska' } }, 8);

          if (si031_s8.o !== 'HUN' || si031_s8.fac !== 'Asse') return false;



          const si031_s17 = resolveFeature({ id: 'SI031', properties: { NUTS_ID: 'SI031', CNTR_CODE: 'SI', NAME: 'Pomurska' } }, 17);

          if (si031_s17.o !== 'DFJ' || si031_s17.fac !== 'Alleati') return false;



          // 2. Principato di Monaco: Neutralità (s0..10) -> Occupazione Italiana (s11..12) -> Occupazione Tedesca (s13..15) -> Liberazione Sovrana (s16..17)

          const mco_s0 = resolveFeature({ id: 'MCO_HIST', properties: { NAME: 'Monaco', CNTR_CODE: 'MC' } }, 0);

          if (mco_s0.o !== 'MCO' || mco_s0.fac !== 'Neutrale') return false;



          const mco_s11 = resolveFeature({ id: 'MCO_HIST', properties: { NAME: 'Monaco', CNTR_CODE: 'MC' } }, 11);

          if (mco_s11.o !== 'ITA' || mco_s11.fac !== 'Asse') return false;



          const mco_s13 = resolveFeature({ id: 'MCO_HIST', properties: { NAME: 'Monaco', CNTR_CODE: 'MC' } }, 13);

          if (mco_s13.o !== 'GER' || mco_s13.fac !== 'Asse') return false;



          const mco_s16 = resolveFeature({ id: 'MCO_HIST', properties: { NAME: 'Monaco', CNTR_CODE: 'MC' } }, 16);

          if (mco_s16.o !== 'MCO' || mco_s16.fac !== 'Alleati' || !mco_s16.name.includes('Libérée')) return false;



          const mco_s17 = resolveFeature({ id: 'MCO_HIST', properties: { NAME: 'Monaco', CNTR_CODE: 'MC' } }, 17);

          if (mco_s17.o !== 'MCO' || mco_s17.fac !== 'Alleati') return false;



          // 3. Tunisia Post-Vichy: Asse a Step 11 -> Liberazione e Protettorato Alleato (F_NAF) da Step 12 in poi

          const tun_s11 = resolveFeature({ id: 'TN_TUNIS', properties: { NAME: 'Tunis', CNTR_CODE: 'TN' } }, 11);

          if (tun_s11.o !== 'GER' || tun_s11.fac !== 'Asse') return false;



          const tun_s12 = resolveFeature({ id: 'TN_TUNIS', properties: { NAME: 'Tunis', CNTR_CODE: 'TN' } }, 12);

          if (tun_s12.o !== 'F_NAF' || tun_s12.fac !== 'Alleati') return false;



          const tun_s17 = resolveFeature({ id: 'TN_TUNIS', properties: { NAME: 'Tunis', CNTR_CODE: 'TN' } }, 17);

          if (tun_s17.o !== 'F_NAF' || tun_s17.fac !== 'Alleati') return false;



          // 4. Antille Francesi (Martinica & Guadalupa) e Guyana: Vichy (s6..11) -> Ralliement CFLN (FRA) da Step 12 in poi

          const mq_s11 = resolveFeature({ id: 'MQ', properties: { NAME: 'Martinique', CNTR_CODE: 'MQ' } }, 11);

          if (mq_s11.o !== 'VIC' || mq_s11.fac !== 'Fantoccio') return false;



          const mq_s12 = resolveFeature({ id: 'MQ', properties: { NAME: 'Martinique', CNTR_CODE: 'MQ' } }, 12);

          if (mq_s12.o !== 'FRA' || mq_s12.fac !== 'Alleati') return false;



          const gp_s12 = resolveFeature({ id: 'GP', properties: { NAME: 'Guadeloupe', CNTR_CODE: 'GP' } }, 12);

          if (gp_s12.o !== 'FRA' || gp_s12.fac !== 'Alleati') return false;



          // 5. Saint-Pierre-et-Miquelon: Vichy (s6..8) -> Ralliement Francia Libera (FRA, 24 Dicembre 1941) da Step 9 in poi

          const spm_s6 = resolveFeature({ id: 'PM', properties: { NAME: 'Saint Pierre and Miquelon', CNTR_CODE: 'PM' } }, 6);

          if (spm_s6.o !== 'VIC' || spm_s6.fac !== 'Fantoccio') return false;



          const spm_s9 = resolveFeature({ id: 'PM', properties: { NAME: 'Saint Pierre and Miquelon', CNTR_CODE: 'PM' } }, 9);

          if (spm_s9.o !== 'FRA' || spm_s9.fac !== 'Alleati') return false;



          // 5b. La Réunion (RE_REUNION & FRY40): F_MAD (s0..5) -> Vichy (s6..10) -> Ralliement Francia Libera (FRA, 28 Nov 1942) da Step 11 in poi

          const reu_s6 = resolveFeature({ id: 'RE_REUNION', properties: { id: 'RE_REUNION', NAME: 'La Réunion', CNTR_CODE: 'F_COL', __layer: 'hb' } }, 6);

          if (reu_s6.o !== 'VIC' || reu_s6.fac !== 'Fantoccio') return false;



          const reu_s11 = resolveFeature({ id: 'RE_REUNION', properties: { id: 'RE_REUNION', NAME: 'La Réunion', CNTR_CODE: 'F_COL', __layer: 'hb' } }, 11);

          if (reu_s11.o !== 'FRA' || reu_s11.fac !== 'Alleati') return false;



          const reu_s17 = resolveFeature({ id: 'RE_REUNION', properties: { id: 'RE_REUNION', NAME: 'La Réunion', CNTR_CODE: 'F_COL', __layer: 'hb' } }, 17);

          if (reu_s17.o !== 'FRA' || reu_s17.fac !== 'Alleati') return false;



          const fry40_s17 = resolveFeature({ id: 'FRY40', properties: { NUTS_ID: 'FRY40', CNTR_CODE: 'FR' } }, 17);

          if (fry40_s17.o !== 'FRA' || fry40_s17.fac !== 'Alleati') return false;



          // 6. Allineamento Cromatico Francia GPRF (Step 14+): FFL_AEF e FFL unificati al blu nazionale (#4c6a9c)

          const ffl_s12 = getOwnerMeta('FFL_AEF', 12);

          if (ffl_s12.c !== '#2b5fa6') return false;



          const ffl_s14 = getOwnerMeta('FFL_AEF', 14);

          if (ffl_s14.c !== '#4c6a9c' || !ffl_s14.shortName?.includes('GPRF')) return false;



          const ffl_s17 = getOwnerMeta('FFL_AEF', 17);

          if (ffl_s17.c !== '#4c6a9c') return false;



          return true;

        },

      },

      {

        name: 'Test 108: Chirurgia Topografica e Territorio Libero di Trieste (Zone A ITH44, Zone B Nord SI_HIST_KOPER, Zone B Sud HR_HIST_BUIE, Carso SI044 e Pola HR036)',

        run: () => {

          // 1. Zone B Nord: SI_HIST_KOPER (Capodistria, Isola, Pirano)

          const koper_s0 = resolveFeature({ properties: { id: 'SI_HIST_KOPER', NUTS_ID: 'SI_HIST_KOPER', CNTR_CODE: 'SI', NAME_LATN: 'Koper (Capodistria)' } }, 0);

          if (koper_s0.o !== 'ITA' || !koper_s0.name.includes('Capodistria')) return false;



          const koper_s13 = resolveFeature({ properties: { id: 'SI_HIST_KOPER', NUTS_ID: 'SI_HIST_KOPER', CNTR_CODE: 'SI', NAME_LATN: 'Koper (Capodistria)' } }, 13);

          if (koper_s13.o !== 'OZAK' || koper_s13.fac !== 'Asse') return false;



          const koper_s17 = resolveFeature({ properties: { id: 'SI_HIST_KOPER', NUTS_ID: 'SI_HIST_KOPER', CNTR_CODE: 'SI', NAME_LATN: 'Koper (Capodistria)' } }, 17);

          if (koper_s17.o !== 'OZAK') return false;



          // 2. Zone B Sud: HR_HIST_BUIE (Buie, Umago, Cittanova, Grisignana)

          const buie_s0 = resolveFeature({ properties: { id: 'HR_HIST_BUIE', NUTS_ID: 'HR_HIST_BUIE', CNTR_CODE: 'HR', NAME_LATN: 'Buje (Buiese)' } }, 0);

          if (buie_s0.o !== 'ITA' || !buie_s0.name.includes('Buie')) return false;



          const buie_s13 = resolveFeature({ properties: { id: 'HR_HIST_BUIE', NUTS_ID: 'HR_HIST_BUIE', CNTR_CODE: 'HR', NAME_LATN: 'Buje (Buiese)' } }, 13);

          if (buie_s13.o !== 'OZAK' || buie_s13.fac !== 'Asse') return false;



          const buie_s17 = resolveFeature({ properties: { id: 'HR_HIST_BUIE', NUTS_ID: 'HR_HIST_BUIE', CNTR_CODE: 'HR', NAME_LATN: 'Buje (Buiese)' } }, 17);

          if (buie_s17.o !== 'OZAK') return false;



          // 3. Zone A: ITH44 (Trieste, Muggia, Duino-Aurisina)

          const tri_s0 = resolveFeature({ properties: { id: 'ITH44', NUTS_ID: 'ITH44', CNTR_CODE: 'IT', NAME_LATN: 'Trieste' } }, 0);

          if (tri_s0.o !== 'ITA') return false;



          const tri_s13 = resolveFeature({ properties: { id: 'ITH44', NUTS_ID: 'ITH44', CNTR_CODE: 'IT', NAME_LATN: 'Trieste' } }, 13);

          if (tri_s13.o !== 'OZAK') return false;



          const tri_s17 = resolveFeature({ properties: { id: 'ITH44', NUTS_ID: 'ITH44', CNTR_CODE: 'IT', NAME_LATN: 'Trieste' } }, 17);

          if (tri_s17.o !== 'ITA' || !tri_s17.name.includes('Trieste')) return false;



          // 4. Carso Sloveno: SI044 (Sesana, Comeno, Divaccia)

          const sez_s0 = resolveFeature({ properties: { id: 'SI044', NUTS_ID: 'SI044', CNTR_CODE: 'SI', NAME_LATN: 'Obalno-kraska' } }, 0);

          if (sez_s0.o !== 'ITA') return false;



          const sez_s13 = resolveFeature({ properties: { id: 'SI044', NUTS_ID: 'SI044', CNTR_CODE: 'SI', NAME_LATN: 'Obalno-kraska' } }, 13);

          if (sez_s13.o !== 'OZAK') return false;



          const sez_s17 = resolveFeature({ properties: { id: 'SI044', NUTS_ID: 'SI044', CNTR_CODE: 'SI', NAME_LATN: 'Obalno-kraska' } }, 17);

          if (sez_s17.o !== 'OZAK') return false;



          // 5. Pola e Istria Meridionale: HR036

          const pol_s0 = resolveFeature({ properties: { id: 'HR036', NUTS_ID: 'HR036', CNTR_CODE: 'HR', NAME_LATN: 'Istarska' } }, 0);

          if (pol_s0.o !== 'ITA') return false;



          const pol_s13 = resolveFeature({ properties: { id: 'HR036', NUTS_ID: 'HR036', CNTR_CODE: 'HR', NAME_LATN: 'Istarska' } }, 13);

          if (pol_s13.o !== 'OZAK') return false;



          const pol_s17 = resolveFeature({ properties: { id: 'HR036', NUTS_ID: 'HR036', CNTR_CODE: 'HR', NAME_LATN: 'Istarska' } }, 17);

          if (pol_s17.o !== 'OZAK') return false;



          // 6. Verifica presenza nel database geocartografico unificato

          const hasKoper = loadedProvs.some((p: any) => (p.id === 'SI_HIST_KOPER' || p.properties?.NUTS_ID === 'SI_HIST_KOPER'));

          const hasBuie = loadedProvs.some((p: any) => (p.id === 'HR_HIST_BUIE' || p.properties?.NUTS_ID === 'HR_HIST_BUIE'));

          if (!hasKoper || !hasBuie) return false;



          return true;

        },

      },

      {

        name: 'Test 109: Audit Geostorico e Topologico Integrale Step 18 (SET 1945 — Resa del Giappone, Quadripartizione di Germania e Austria, Linea Oder-Neisse, Morgan Line e Nuova Carta Mondiale Postbellica)',

        run: () => {

          // 1. Esistenza e integrità dello Step 18 nella cronologia

          if (STEPS.length < 19) return false;

          const s18 = STEPS[18];

          if (!s18 || s18.d !== 'SET 1945' || !s18.t.includes('Resa del Giappone')) return false;



          // 2. Germania Quadripartita

          // 2a. Berlino Quadripartita

          const berlin = resolveFeature({ properties: { id: 'DE300', NUTS_ID: 'DE300', CNTR_CODE: 'DE', NAME_LATN: 'Berlin' } }, 18);

          if (berlin.o !== 'SOV' || berlin.fac !== 'Alleati' || !berlin.name.includes('Groß-Berlin')) return false;



          // 2b. Zona Sovietica (SBZ): Dresda

          const dresden = resolveFeature({ properties: { id: 'DED21', NUTS_ID: 'DED21', CNTR_CODE: 'DE', NAME_LATN: 'Dresden' } }, 18);

          if (dresden.o !== 'SOV' || dresden.fac !== 'Comintern') return false;



          // 2c. Zona Britannica: Amburgo & Colonia

          const hamburg = resolveFeature({ properties: { id: 'DE600', NUTS_ID: 'DE600', CNTR_CODE: 'DE', NAME_LATN: 'Hamburg' } }, 18);

          const koln = resolveFeature({ properties: { id: 'DEA23', NUTS_ID: 'DEA23', CNTR_CODE: 'DE', NAME_LATN: 'Köln' } }, 18);

          if (hamburg.o !== 'UK' || koln.o !== 'UK' || hamburg.fac !== 'Alleati') return false;



          // 2d. Zona Statunitense: Monaco & Enclave di Brema

          const munchen = resolveFeature({ properties: { id: 'DE212', NUTS_ID: 'DE212', CNTR_CODE: 'DE', NAME_LATN: 'München' } }, 18);

          const bremen = resolveFeature({ properties: { id: 'DE501', NUTS_ID: 'DE501', CNTR_CODE: 'DE', NAME_LATN: 'Bremen' } }, 18);

          if (munchen.o !== 'USA' || bremen.o !== 'USA' || !bremen.name.includes('Brema')) return false;



          // 2e. Zona Francese: Magonza & Saarland

          const mainz = resolveFeature({ properties: { id: 'DEB35', NUTS_ID: 'DEB35', CNTR_CODE: 'DE', NAME_LATN: 'Mainz' } }, 18);

          const saar = resolveFeature({ properties: { id: 'DEC01', NUTS_ID: 'DEC01', CNTR_CODE: 'DE', NAME_LATN: 'Saarbrücken' } }, 18);

          if (mainz.o !== 'FRA' || saar.o !== 'FRA' || !saar.name.includes('Saar')) return false;



          // 2f. Linea Oder-Neisse & Territori Recuperati Polacchi (Ziemie Odzyskane)

          const wroclaw = resolveFeature({ properties: { id: 'PL514', NUTS_ID: 'PL514', CNTR_CODE: 'PL', NAME_LATN: 'Wrocław' } }, 18);

          const szczecin = resolveFeature({ properties: { id: 'PL424', NUTS_ID: 'PL424', CNTR_CODE: 'PL', NAME_LATN: 'Szczecin' } }, 18);

          const olsztyn = resolveFeature({ properties: { id: 'PL622', NUTS_ID: 'PL622', CNTR_CODE: 'PL', NAME_LATN: 'Olsztyn' } }, 18);

          if (wroclaw.o !== 'POL' || szczecin.o !== 'POL' || olsztyn.o !== 'POL') return false;



          // 2g. Königsberg / Kaliningrad annessa all'URSS

          const konigsberg = resolveFeature({ properties: { id: 'DE_HIST_KONIGSBERG', NUTS_ID: 'DE_HIST_KONIGSBERG', CNTR_CODE: 'DE', NAME_LATN: 'Königsberg' } }, 18);

          if (konigsberg.o !== 'SOV' || !konigsberg.name.includes('Kaliningrad')) return false;



          // 2h. Corridoio di Lindau (DE27A) assegnato alla Zona Francese per garantire la continuità territoriale con l'Austria (Vorarlberg)

          const lindau = resolveFeature({ properties: { id: 'DE27A', NUTS_ID: 'DE27A', CNTR_CODE: 'DE', NAME_LATN: 'Lindau (Bodensee)' } }, 18);

          if (lindau.o !== 'FRA' || !lindau.name.includes('Lindau')) return false;



          // 2i. Demarcazione Autobahn A8 nel Sud-Ovest: Baden-Baden (DE121 HQ francese) a FRA, Ulm (DE144) a USA

          const badenBaden = resolveFeature({ properties: { id: 'DE121', NUTS_ID: 'DE121', CNTR_CODE: 'DE', NAME_LATN: 'Baden-Baden, Stadtkreis' } }, 18);

          const ulm = resolveFeature({ properties: { id: 'DE144', NUTS_ID: 'DE144', CNTR_CODE: 'DE', NAME_LATN: 'Ulm, Stadtkreis' } }, 18);

          if (badenBaden.o !== 'FRA' || !badenBaden.name.includes('Baden-Baden') || ulm.o !== 'USA' || !ulm.name.includes('Ulm')) return false;



          // 3. Austria Quadripartita

          const wien = resolveFeature({ properties: { id: 'AT130', NUTS_ID: 'AT130', CNTR_CODE: 'AT', NAME_LATN: 'Wien' } }, 18);

          const salzburg = resolveFeature({ properties: { id: 'AT323', NUTS_ID: 'AT323', CNTR_CODE: 'AT', NAME_LATN: 'Salzburg' } }, 18);

          const graz = resolveFeature({ properties: { id: 'AT221', NUTS_ID: 'AT221', CNTR_CODE: 'AT', NAME_LATN: 'Graz' } }, 18);

          const innsbruck = resolveFeature({ properties: { id: 'AT332', NUTS_ID: 'AT332', CNTR_CODE: 'AT', NAME_LATN: 'Innsbruck' } }, 18);

          if (wien.o !== 'SOV' || salzburg.o !== 'USA' || graz.o !== 'UK' || innsbruck.o !== 'FRA') return false;



          // 4. Confine Orientale Italiano & Linea Morgan (Duino 1945)

          // Zona A (AMG): Trieste, Gorizia, Pola

          const trieste = resolveFeature({ properties: { id: 'ITH44', NUTS_ID: 'ITH44', CNTR_CODE: 'IT', NAME_LATN: 'Trieste' } }, 18);

          const gorizia = resolveFeature({ properties: { id: 'ITH43', NUTS_ID: 'ITH43', CNTR_CODE: 'IT', NAME_LATN: 'Gorizia' } }, 18);

          const pola = resolveFeature({ properties: { id: 'HR036', NUTS_ID: 'HR036', CNTR_CODE: 'HR', NAME_LATN: 'Pola' } }, 18);

          if (trieste.o !== 'AMG' || gorizia.o !== 'AMG' || pola.o !== 'AMG') return false;



          // Zona B (VUJA / Jugoslavia): Capodistria, Buie, Carso/Sesana

          const koper = resolveFeature({ properties: { id: 'SI_HIST_KOPER', NUTS_ID: 'SI_HIST_KOPER', CNTR_CODE: 'SI', NAME_LATN: 'Koper' } }, 18);

          const buie = resolveFeature({ properties: { id: 'HR_HIST_BUIE', NUTS_ID: 'HR_HIST_BUIE', CNTR_CODE: 'HR', NAME_LATN: 'Buje' } }, 18);

          const carso = resolveFeature({ properties: { id: 'SI044', NUTS_ID: 'SI044', CNTR_CODE: 'SI', NAME_LATN: 'Obalno-kraska' } }, 18);

          if (koper.o !== 'DFJ' || buie.o !== 'DFJ' || carso.o !== 'DFJ') return false;



          // 5. Asia & Pacifico

          // 5a. Corea al 38° Parallelo

          const pyongyang = resolveFeature({ properties: { id: 'KP01', NUTS_ID: 'KP01', CNTR_CODE: 'KP', NAME_LATN: 'Pyongyang' } }, 18);

          const seoul = resolveFeature({ properties: { id: 'KR11', NUTS_ID: 'KR11', CNTR_CODE: 'KR', NAME_LATN: 'Seoul' } }, 18);

          if (pyongyang.o !== 'SOV' || seoul.o !== 'USA') return false;



          // 5b. Giappone SCAP, Karafuto, Curili e Okinawa

          const tokyo = resolveFeature({ properties: { id: 'JP13', NUTS_ID: 'JP13', CNTR_CODE: 'JP', NAME_LATN: 'Tokyo' } }, 18);

          const karafuto = resolveFeature({ properties: { id: 'JP_KARAFUTO', NUTS_ID: 'JP_KARAFUTO', CNTR_CODE: 'JP', NAME_LATN: 'Karafuto' } }, 18);

          const curili = resolveFeature({ properties: { id: 'JP_CHISHIMA', NUTS_ID: 'JP_CHISHIMA', CNTR_CODE: 'JP', NAME_LATN: 'Chishima' } }, 18);

          const okinawa = resolveFeature({ properties: { id: 'JP47', NUTS_ID: 'JP47', CNTR_CODE: 'JP', NAME_LATN: 'Okinawa' } }, 18);

          if (tokyo.o !== 'JAP' || tokyo.fac !== 'Alleati' || !tokyo.name.includes('SCAP')) return false;

          if (karafuto.o !== 'SOV' || curili.o !== 'SOV' || okinawa.o !== 'USA') return false;



          // 5c. Ritorno di Taiwan alla Cina e Assetto Geopolitico Cinese a Settembre 1945

          const taiwan = resolveFeature({ properties: { id: 'TW', NUTS_ID: 'TW', CNTR_CODE: 'TW', NAME_LATN: 'Taiwan' } }, 18);

          const tibet = resolveFeature({ properties: { id: 'CHN_TIBET', NUTS_ID: 'CHN_TIBET', CNTR_CODE: 'CN_PROV', NAME_LATN: 'Tibet', REGION_KIND: 'CHINA_PROVINCE' } }, 18);

          const yanan = resolveFeature({ properties: { id: 'CHN_SHAANXI', NUTS_ID: 'CHN_SHAANXI', CNTR_CODE: 'CN_PROV', NAME_LATN: 'Shaanxi', REGION_KIND: 'CHINA_PROVINCE' } }, 18);

          const portArthur = resolveFeature({ properties: { id: 'JP_KANTO_SHU', NUTS_ID: 'JP_KANTO_SHU', CNTR_CODE: 'CN_PROV', NAME_LATN: 'Kantō-shū', REGION_KIND: 'CHINA_PROVINCE' } }, 18);

          const portArthurActual = resolveFeature({ properties: { id: 'JP_KANTO_SHU', NUTS_ID: 'JP_KANTO_SHU', CNTR_CODE: 'JP', NUTS_NAME: 'Kantō-shū (Dairen & Port Arthur)', REGION_KIND: 'HISTORICAL_ENCLAVE' } }, 18);

          const hongKong = resolveFeature({ properties: { id: 'CHN_HONGKONG', NUTS_ID: 'CHN_HONGKONG', CNTR_CODE: 'CN_PROV', NAME_LATN: 'Hong Kong', REGION_KIND: 'CHINA_PROVINCE' } }, 18);

          const macau = resolveFeature({ properties: { id: 'CHN_MACAU', NUTS_ID: 'CHN_MACAU', CNTR_CODE: 'CN_PROV', NAME_LATN: 'Macau', REGION_KIND: 'CHINA_PROVINCE' } }, 18);

          const chongqing = resolveFeature({ properties: { id: 'CHN_CHONGQING', NUTS_ID: 'CHN_CHONGQING', CNTR_CODE: 'CN_PROV', NAME_LATN: 'Chongqing', REGION_KIND: 'CHINA_PROVINCE' } }, 18);

          const nanjing = resolveFeature({ properties: { id: 'CHN_JIANGSU', NUTS_ID: 'CHN_JIANGSU', CNTR_CODE: 'CN_PROV', NAME_LATN: 'Jiangsu', REGION_KIND: 'CHINA_PROVINCE' } }, 18);

          if (taiwan.o !== 'CHI' || taiwan.fac !== 'Alleati') return false;

          if (tibet.o !== 'TIB' || tibet.fac !== 'Neutrale') return false;

          if (yanan.o !== 'CCP_CHI' || yanan.fac !== 'Comintern') return false;

          if (portArthur.o !== 'SOV' || portArthur.fac !== 'Comintern') return false;

          if (portArthurActual.o !== 'SOV' || portArthurActual.fac !== 'Comintern') return false;

          if (hongKong.o !== 'UK' || hongKong.fac !== 'Alleati') return false;

          if (macau.o !== 'POR' || macau.fac !== 'Neutrale') return false;

          if (chongqing.o !== 'CHI' || nanjing.o !== 'CHI') return false;



          // 5d. Sud-Est Asiatico & Pacifico Sud-Occidentale: DRV, Rivoluzione Indonesiana, NICA, Timor Portoghese e Resa Giapponese in Nuova Guinea

          const hanoi = resolveFeature({ properties: { id: 'VN_TONKIN', NUTS_ID: 'VN_TONKIN', CNTR_CODE: 'VN', NAME_LATN: 'Tonkin' } }, 18);

          const java = resolveFeature({ properties: { id: 'ID_HIST_WEST_JAVA', NUTS_ID: 'ID_HIST_WEST_JAVA', CNTR_CODE: 'ID', NAME_LATN: 'Java' } }, 18);

          const sumatra = resolveFeature({ properties: { id: 'IDAC', NUTS_ID: 'IDAC', CNTR_CODE: 'ID', NAME_LATN: 'Aceh' } }, 18);

          const borneoNICA = resolveFeature({ properties: { id: 'IDKB', NUTS_ID: 'IDKB', CNTR_CODE: 'ID', NAME_LATN: 'West Kalimantan' } }, 18);

          const celebesNICA = resolveFeature({ properties: { id: 'IDSN', NUTS_ID: 'IDSN', CNTR_CODE: 'ID', NAME_LATN: 'South Sulawesi' } }, 18);

          const papuaHOL = resolveFeature({ properties: { id: 'IDPA', NUTS_ID: 'IDPA', CNTR_CODE: 'ID', NAME_LATN: 'Papua' } }, 18);

          const timorPort = resolveFeature({ properties: { id: 'TLS', NUTS_ID: 'TLS', CNTR_CODE: 'TL', NAME_LATN: 'Timor-Leste' } }, 18);

          const brunei = resolveFeature({ properties: { id: 'BN', NUTS_ID: 'BN', CNTR_CODE: 'BN', NAME_LATN: 'Brunei' } }, 18);

          const wewakAST = resolveFeature({ properties: { id: 'PGESW', NUTS_ID: 'PGESW', CNTR_CODE: 'PG', NAME_LATN: 'East Sepik' } }, 18);

          const rabaulAST = resolveFeature({ properties: { id: 'PGEBR', NUTS_ID: 'PGEBR', CNTR_CODE: 'PG', NAME_LATN: 'East New Britain' } }, 18);

          const bougainvilleAST = resolveFeature({ properties: { id: 'PGNSB', NUTS_ID: 'PGNSB', CNTR_CODE: 'PG', NAME_LATN: 'Bougainville' } }, 18);



          if (hanoi.o !== 'VIE' || java.o !== 'IDN' || sumatra.o !== 'IDN') return false;

          if (borneoNICA.o !== 'HOL' || celebesNICA.o !== 'HOL' || papuaHOL.o !== 'HOL') return false;

          if (timorPort.o !== 'POR' || brunei.o !== 'UK') return false;

          if (wewakAST.o !== 'AST' || rabaulAST.o !== 'AST' || bougainvilleAST.o !== 'AST') return false;



          // 6. Bonifica Completa Sacche Anacronistiche & Normalizzazione Europa Centro-Occidentale

          // 6a. Paesi Bassi Interamente Liberati (No Festung Holland anacronistica)

          const utrecht = resolveFeature({ properties: { id: 'NL310', NUTS_ID: 'NL310', CNTR_CODE: 'NL', NAME_LATN: 'Utrecht' } }, 18);

          const amsterdam = resolveFeature({ properties: { id: 'NL329', NUTS_ID: 'NL329', CNTR_CODE: 'NL', NAME_LATN: 'Groot-Amsterdam' } }, 18);

          if (utrecht.o !== 'HOL' || amsterdam.o !== 'HOL') return false;



          // 6b. Francia: Tasche Atlantiche Liberate (Lorient, Saint-Nazaire, La Rochelle)

          const lorient = resolveFeature({ properties: { id: 'FRH04', NUTS_ID: 'FRH04', CNTR_CODE: 'FR', NAME_LATN: 'Morbihan' } }, 18);

          const stNazaire = resolveFeature({ properties: { id: 'FRG01', NUTS_ID: 'FRG01', CNTR_CODE: 'FR', NAME_LATN: 'Loire-Atlantique' } }, 18);

          const laRochelle = resolveFeature({ properties: { id: 'FRI32', NUTS_ID: 'FRI32', CNTR_CODE: 'FR', NAME_LATN: 'Charente-Maritime' } }, 18);

          if (lorient.o !== 'FRA' || stNazaire.o !== 'FRA' || laRochelle.o !== 'FRA') return false;



          // 6c. Italia: Trentino-Alto Adige Liberato (Fine OZAV)

          const bolzano = resolveFeature({ properties: { id: 'ITH10', NUTS_ID: 'ITH10', CNTR_CODE: 'IT', NAME_LATN: 'Bolzano-Bozen' } }, 18);

          const trento = resolveFeature({ properties: { id: 'ITH20', NUTS_ID: 'ITH20', CNTR_CODE: 'IT', NAME_LATN: 'Trento' } }, 18);

          if (bolzano.o !== 'ITA' || trento.o !== 'ITA') return false;



          // 6c-bis. Sacca di Curlandia (LV003 Kurzeme) resa incondizionata a maggio 1945 e reintegrata nella RSS Lettone / URSS (Zero Kurland-Kessel anacronistico a SET 1945)

          const kurzeme18 = resolveFeature({ properties: { id: 'LV003', NUTS_ID: 'LV003', CNTR_CODE: 'LV', NAME_LATN: 'Kurzeme' } }, 18);

          if (kurzeme18.o !== 'SOV' || kurzeme18.fac !== 'Comintern' || !kurzeme18.name.includes('Liberata')) return false;



          // 6d. Cecoslovacchia Restaurata (Terza Repubblica: Praga e Boemia non più Reichsgau/Protektorat né Moravia SOV)

          const praga = resolveFeature({ properties: { id: 'CZ010', NUTS_ID: 'CZ010', CNTR_CODE: 'CZ', NAME_LATN: 'Hlavní město Praha' } }, 18);

          const brno = resolveFeature({ properties: { id: 'CZ064', NUTS_ID: 'CZ064', CNTR_CODE: 'CZ', NAME_LATN: 'Brno-město' } }, 18);

          if (praga.o !== 'CZE' || brno.o !== 'CZE') return false;



          // 6e. Germania Baviera: Landsberg am Lech DE21E è Zona USA (nessuna cessione errata alla Polonia)

          const landsbergLech = resolveFeature({ properties: { id: 'DE21E', NUTS_ID: 'DE21E', CNTR_CODE: 'DE', NAME_LATN: 'Landsberg am Lech' } }, 18);

          if (landsbergLech.o !== 'USA') return false;



          // 6f. Austria: Mühlviertel AT313 a SOV e Osttirol AT333 a UK

          const muhlviertel = resolveFeature({ properties: { id: 'AT313', NUTS_ID: 'AT313', CNTR_CODE: 'AT', NAME_LATN: 'Mühlviertel' } }, 18);

          const osttirol = resolveFeature({ properties: { id: 'AT333', NUTS_ID: 'AT333', CNTR_CODE: 'AT', NAME_LATN: 'Osttirol' } }, 18);

          if (muhlviertel.o !== 'SOV' || osttirol.o !== 'UK') return false;



          // 6g. Danimarca Liberata (DEN) & Presidio Sovietico a Bornholm (SOV)

          const copenhagen = resolveFeature({ properties: { id: 'DK011', NUTS_ID: 'DK011', CNTR_CODE: 'DK', NAME_LATN: 'Byen København' } }, 18);

          const bornholm = resolveFeature({ properties: { id: 'DK014', NUTS_ID: 'DK014', CNTR_CODE: 'DK', NAME_LATN: 'Bornholm' } }, 18);

          if (copenhagen.o !== 'DEN' || bornholm.o !== 'SOV') return false;



          // 6h. Sud-Est Asiatico: Singapore e Malesia tornati all'Impero Britannico (BMA)

          const singapore = resolveFeature({ properties: { id: 'SG01', NUTS_ID: 'SG01', CNTR_CODE: 'SG', NAME_LATN: 'Singapore' } }, 18);

          if (singapore.o !== 'UK' || singapore.fac !== 'Alleati') return false;



          // 6i. Germania: Frankfurt an der Oder DE406 a SOV (SBZ) vs Frankfurt am Main DE712 a USA

          const fOder = resolveFeature({ properties: { id: 'DE406', NUTS_ID: 'DE406', CNTR_CODE: 'DE', NAME_LATN: 'Frankfurt (Oder)' } }, 18);

          const fMain = resolveFeature({ properties: { id: 'DE712', NUTS_ID: 'DE712', CNTR_CODE: 'DE', NAME_LATN: 'Frankfurt am Main' } }, 18);

          if (fOder.o !== 'SOV' || fMain.o !== 'USA') return false;



          // 6j. Slovenia & Croazia interamente liberate nella DFJ (Ljubljana, Maribor, Zagreb)

          const ljubljana = resolveFeature({ properties: { id: 'SI041', NUTS_ID: 'SI041', CNTR_CODE: 'SI', NAME_LATN: 'Ljubljana' } }, 18);

          const maribor = resolveFeature({ properties: { id: 'SI032', NUTS_ID: 'SI032', CNTR_CODE: 'SI', NAME_LATN: 'Maribor' } }, 18);

          const zagreb = resolveFeature({ properties: { id: 'HR050', NUTS_ID: 'HR050', CNTR_CODE: 'HR', NAME_LATN: 'Grad Zagreb' } }, 18);

          if (ljubljana.o !== 'DFJ' || maribor.o !== 'DFJ' || zagreb.o !== 'DFJ') return false;



          // 6k. Bonifica Toponomastica Benelux (Zero Reichskommissariat né Militärverwaltung post-liberazione)

          const topAmst18 = getExtendedToponym('Groot-Amsterdam', 'HOL', 'NL329', undefined, 18);

          const topBrux18 = getExtendedToponym('Bruxelles', 'BEL', 'BE100', undefined, 18);

          if (topAmst18.name.includes('Reichskommissariat') || (topAmst18.adminTitle || '').includes('Reichskommissariat')) return false;

          if (topBrux18.name.includes('Militärverwaltung') || (topBrux18.adminTitle || '').includes('Militärverwaltung')) return false;



          // 7. Bandiere storiche postbelliche

          const flagGer18 = getCountryFlagSvg('GER', 18);

          const flagVie18 = getCountryFlagSvg('VIE', 18);

          const flagIdn18 = getCountryFlagSvg('IDN', 18);

          const flagAmg18 = getCountryFlagSvg('AMG', 18);

          if (!flagGer18 || !flagVie18 || !flagIdn18 || !flagAmg18) return false;



          return true;

        },

      },

      {

        name: 'Test 110: Chirurgia Topografica e Territoriale di Cipro (11 Territori Autonomi di Precisione: Akrotiri, Dhekelia, Green Line ONU, TRNC Nord e Cipro Sud)',

        run: () => {

          const cyprusTerritories = [

            { id: 'UK_AKROTIRI', expName: 'Akrotiri', expAdmin: 'Akrotiri' },

            { id: 'UK_DHEKELIA', expName: 'Dhekelia', expAdmin: 'Dhekelia' },

            { id: 'CY_UN_BUFFER', expName: 'Cipro Centrale', expAdmin: 'Mesaoria' },

            { id: 'CY_KYRENIA', expName: 'Kyrenia', expAdmin: 'Kyrenia' },

            { id: 'CY_NICOSIA_N', expName: 'Nicosia Nord', expAdmin: 'Nicosia' },

            { id: 'CY_FAMAGUSTA_N', expName: 'Famagosta Nord', expAdmin: 'Famagusta' },

            { id: 'CY_NICOSIA_S', expName: 'Nicosia Sud', expAdmin: 'Nicosia' },

            { id: 'CY_FAMAGUSTA_S', expName: 'Famagosta Sud', expAdmin: 'Famagusta' },

            { id: 'CY_LARNACA', expName: 'Larnaca', expAdmin: 'Larnaca' },

            { id: 'CY_LIMASSOL', expName: 'Limassol', expAdmin: 'Limassol' },

            { id: 'CY_PAPHOS', expName: 'Paphos', expAdmin: 'Paphos' },

          ];



          for (const t of cyprusTerritories) {

            const feat = { id: t.id, properties: { id: t.id, NUTS_ID: t.id, CNTR_CODE: t.id.startsWith('UK_') ? 'UK' : 'CY', NAME_LATN: t.id } };

            // Step 0: 1936 (Neutrale)

            const r0 = resolveFeature(feat, 0);

            if (r0.o !== 'UK' || r0.fac !== 'Neutrale' || !r0.name.includes(t.expName) || !r0.adminEntity.includes(t.expAdmin)) {

              return false;

            }

            // Step 5: 1939 (Alleati)

            const r5 = resolveFeature(feat, 5);

            if (r5.o !== 'UK' || r5.fac !== 'Alleati') {

              return false;

            }

            // Step 18: 1945 (Alleati)

            const r18 = resolveFeature(feat, 18);

            if (r18.o !== 'UK' || r18.fac !== 'Alleati') {

              return false;

            }

          }



          return true;

        },

      },

      {

        name: 'Test 111: Censimento Geostorico e Toponomastico di Precisione del Pacifico Francese (EFO / Polinesia Francese, Nuova Caledonia, Nuove Ebridi, Wallis e Futuna)',

        run: () => {

          // 1. Polinesia Francese (PF_POLYNESIA):

          // Step 0: Colonia Terza Repubblica (Papeete / Tahiti)

          const pf0 = resolveHB({ id: 'PF_POLYNESIA', properties: { id: 'PF_POLYNESIA', NAME: 'French Polynesia', HISTORICAL_NAME: "Établissements français de l'Océanie", CNTR_CODE: 'F_COL', __layer: 'hb' } }, 0);

          if (pf0.o !== 'F_COL' || !pf0.name.includes("Établissements Français de l'Océanie") || !pf0.adminEntity?.includes('Papeete')) return false;



          // Step 6: Armistizio di Compiègne (Rifiuto di Vichy)

          const pf6 = resolveHB({ id: 'PF_POLYNESIA', properties: { id: 'PF_POLYNESIA', NAME: 'French Polynesia', HISTORICAL_NAME: "Établissements français de l'Océanie", CNTR_CODE: 'F_COL', __layer: 'hb' } }, 6);

          if (pf6.o !== 'VIC' || !pf6.name.includes("Crisi dell'Armistizio")) return false;



          // Step 7: Plebiscito democratico e Ralliement a De Gaulle

          const pf7 = resolveHB({ id: 'PF_POLYNESIA', properties: { id: 'PF_POLYNESIA', NAME: 'French Polynesia', HISTORICAL_NAME: "Établissements français de l'Océanie", CNTR_CODE: 'F_COL', __layer: 'hb' } }, 7);

          if (pf7.o !== 'FFL_AEF' || pf7.fac !== 'Alleati' || !pf7.name.includes('France Libre — Tahiti') || !pf7.note?.includes('5.564')) return false;



          // Step 10: Operazione Bobcat a Bora Bora (motu Mute, artiglieria costiera) & Bir Hakeim

          const pf10 = resolveHB({ id: 'PF_POLYNESIA', properties: { id: 'PF_POLYNESIA', NAME: 'French Polynesia', HISTORICAL_NAME: "Établissements français de l'Océanie", CNTR_CODE: 'F_COL', __layer: 'hb' } }, 10);

          if (pf10.o !== 'FFL_AEF' || !pf10.name.includes('Bobcat') || !pf10.name.includes('Bora Bora') || !pf10.note?.includes('Bir Hakeim')) return false;



          // Step 14: GPRF e avanzata europea del BIMP

          const pf14 = resolveHB({ id: 'PF_POLYNESIA', properties: { id: 'PF_POLYNESIA', NAME: 'French Polynesia', HISTORICAL_NAME: "Établissements français de l'Océanie", CNTR_CODE: 'F_COL', __layer: 'hb' } }, 14);

          if (pf14.o !== 'FRA' || pf14.fac !== 'Alleati' || !pf14.name.includes('GPRF') || !pf14.note?.includes('BIMP')) return false;



          // Step 18: Vittoria postbellica nel Pacifico (Zero Brazzaville, Zero AEF, Capitale Parigi per la Francia)

          const pf18 = resolveHB({ id: 'PF_POLYNESIA', properties: { id: 'PF_POLYNESIA', NAME: 'French Polynesia', HISTORICAL_NAME: "Établissements français de l'Océanie", CNTR_CODE: 'F_COL', __layer: 'hb' } }, 18);

          if (pf18.o !== 'FRA' || pf18.fac !== 'Alleati' || pf18.name.includes('Afrique') || pf18.name.includes('Brazzaville') || !pf18.name.includes('Vittoria nel Pacifico')) return false;



          // 2. Nuova Caledonia (NC_CALEDONIA):

          const nc18 = resolveHB({ id: 'NC_CALEDONIA', properties: { id: 'NC_CALEDONIA', NAME: 'New Caledonia', CNTR_CODE: 'F_COL', __layer: 'hb' } }, 18);

          if (nc18.o !== 'FRA' || !nc18.name.includes('Nouvelle-Calédonie')) return false;



          // 3. Nuove Ebridi (NH_HEBRIDES):

          const nh18 = resolveHB({ id: 'NH_HEBRIDES', properties: { id: 'NH_HEBRIDES', NAME: 'New Hebrides', CNTR_CODE: 'F_COL', __layer: 'hb' } }, 18);

          if (nh18.o !== 'FRA' || !nh18.name.includes('Nouvelles-Hébrides')) return false;



          // 4. Wallis e Futuna (WF_WALLIS_FUTUNA):

          const wf10 = resolveHB({ id: 'WF_WALLIS_FUTUNA', properties: { id: 'WF_WALLIS_FUTUNA', NAME: 'Wallis and Futuna Islands', CNTR_CODE: 'F_COL', __layer: 'hb' } }, 10);

          const wf18 = resolveHB({ id: 'WF_WALLIS_FUTUNA', properties: { id: 'WF_WALLIS_FUTUNA', NAME: 'Wallis and Futuna Islands', CNTR_CODE: 'F_COL', __layer: 'hb' } }, 18);

          if (wf10.o !== 'VIC' || wf18.o !== 'FRA' || !wf18.name.includes('Wallis')) return false;

          // 5. Anti-Collisione Geostorica: Penang (MY07 / Fort Cornwallis) non deve MAI essere confuso con Wallis (WF_WALLIS_FUTUNA)
          const penang0 = resolveFeature({ id: 'MY07', properties: { id: 'MY07', ISO2: 'MY', NUTS_ID: 'MY07', HISTORICAL_NAME: 'Straits Settlements — Penang (Prince of Wales Island & Fort Cornwallis)' } }, 0);
          const penang9 = resolveFeature({ id: 'MY07', properties: { id: 'MY07', ISO2: 'MY', NUTS_ID: 'MY07', HISTORICAL_NAME: 'Straits Settlements — Penang (Prince of Wales Island & Fort Cornwallis)' } }, 9);
          if (penang0.o !== 'UK' || penang0.adminEntity?.includes('Pacifique') || penang0.name.includes('Pacifique')) return false;
          if (penang9.o !== 'JAP' || penang9.fac !== 'Asse' || !penang9.note.includes('evacuata segretamente dal comando britannico')) return false;



          return true;

        },

      },

      {

        name: 'Test 112: Architettura e Validazione Storica Skill Historical Flag Resolver (Anti-Anacronismo, Finestre di Validità YYYY-MM-DD, Schema JSON e Fonti Autorevoli Commons/Wikidata/FOTW)',

        run: () => {

          // 1. Risoluzione Italia: Monarchia Sabauda (ante 19 giugno 1946) vs Repubblica (post 19 giugno 1946)

          const itaMonarchia = resolveHistoricalFlag('ITA', '1946-06-01');

          const itaRepubblica = resolveHistoricalFlag('IT_1947', '1947-09-30');

          if (!itaMonarchia || !itaRepubblica) return false;

          if (itaMonarchia.asset.file_name !== 'Flag_of_Italy_(1861-1946).svg') return false;

          if (itaRepubblica.asset.file_name !== 'Flag_of_Italy.svg') return false;

          if (!itaMonarchia.historical_rationale.includes('stemma sabaudo')) return false;

          if (!itaRepubblica.historical_rationale.includes('19 giugno 1946')) return false;



          // 2. Anti-Anacronismo Italia: Tricolore repubblicano nullo prima del 1946-06-19

          const itaRepPrecece = resolveHistoricalFlag('IT_1947', '1940-06-10');

          if (itaRepPrecece !== null) return false;



          // 3. Risoluzione Germania: Deutsches Reich (1935-1945) vs C-Pennant (Allied Control Council post-8 maggio 1945)

          const gerReich = resolveHistoricalFlag('GER', 16); // DIC 1944

          const gerAllied = resolveHistoricalFlag('ACC', 18); // SET 1945

          if (!gerReich || !gerAllied) return false;

          if (gerReich.asset.file_name !== 'Flag_of_Germany_(1935–1945).svg') return false;

          if (gerAllied.asset.file_name !== 'Merchant_flag_of_Germany_(1946–1949).svg') return false;

          if (!gerAllied.historical_rationale.includes('C-Pennant')) return false;



          // 4. Stati Uniti d'America: Bandiera a 48 stelle durante la Seconda Guerra Mondiale

          const usaWw2 = resolveHistoricalFlag('USA', '1944-06-06');

          if (!usaWw2 || usaWw2.asset.file_name !== 'Flag_of_the_United_States_(1912-1959).svg') return false;

          if (!usaWw2.historical_rationale.includes('48 stelle')) return false;



          // 5. Jugoslavia: Regno (1939) vs Jugoslavia Federale Democratica di Tito (1944)

          const yugRegno = resolveHistoricalFlag('YUG', 0); // 1936

          const yugTito = resolveHistoricalFlag('DFJ', 16); // DIC 1944

          if (!yugRegno || !yugTito) return false;

          if (yugRegno.asset.file_name !== 'Flag_of_the_Kingdom_of_Yugoslavia.svg') return false;

          if (yugTito.asset.file_name !== 'Flag_of_the_Democratic_Federal_Yugoslavia.svg') return false;

          if (!yugTito.historical_rationale.includes('AVNOJ')) return false;



          // 6. Proclamazioni d'Indipendenza Asia Settembre 1945: DRV (Vietnam) e Indonesia

          const drvFlag = resolveHistoricalFlag('DRV', 18);

          const idnFlag = resolveHistoricalFlag('IDN', 18);

          if (!drvFlag || !idnFlag) return false;

          if (drvFlag.asset.file_name !== 'Flag_of_North_Vietnam_(1945-1955).svg') return false;

          if (idnFlag.asset.file_name !== 'Flag_of_Indonesia.svg') return false;



          // 7. Conformità Schema JSON del Protocollo: entity_id, direct_svg_url, commons_page, flags_of_the_world_ref

          if (!itaRepubblica.asset.direct_svg_url.startsWith('https://commons.wikimedia.org/wiki/Special:FilePath/')) return false;

          if (!itaRepubblica.asset.commons_page.startsWith('https://commons.wikimedia.org/wiki/File:')) return false;

          if (!itaRepubblica.flags_of_the_world_ref.includes('crwflags.com')) return false;

          if (itaRepubblica.flag_status !== 'official' || itaRepubblica.flag_category !== 'state_and_national') return false;



          // 8. Validatore di Guardrail Anti-Anacronismo

          const valOk = validateFlagAgainstAnachronism(itaRepubblica, '1947-09-30');

          if (!valOk.isValid) return false;



          const valFail = validateFlagAgainstAnachronism(itaMonarchia, '1950-01-01');

          if (valFail.isValid) return false;



          return true;

        },

      },

      {

        name: 'Test 113: Audit Geostorico e Topologico Integrale Step 19 (SET 1947 — Partizione dell\'India, Trattati di Pace di Parigi, Territorio Libero di Trieste, Bizona e Nuovo Assetto Globale)',

        run: () => {

          // 1. Esistenza e integrità dello Step 19 nella timeline

          if (STEPS.length < 20) return false;

          const s19 = STEPS[19];

          if (!s19 || s19.d !== 'SET 1947' || !s19.t.includes('Partizione dell\'India')) return false;



          // 2. Partizione del British Raj (15 Agosto 1947)

          // 2a. Dominion del Pakistan (Pakistan Occidentale: Punjab Occidentale, Sindh, Baluchistan, NWFP, Rawalpindi)

          const pk_pun = resolveFeature({ id: 'PK_PUN', properties: { id: 'PK_PUN' } }, 19);

          const pk_sin = resolveFeature({ id: 'PK_SIN', properties: { id: 'PK_SIN' } }, 19);

          const pk_bal = resolveFeature({ id: 'PK_BAL', properties: { id: 'PK_BAL' } }, 19);

          const pk_kpk = resolveFeature({ id: 'PK_KPK', properties: { id: 'PK_KPK' } }, 19);

          if (pk_pun.o !== 'PAK' || pk_sin.o !== 'PAK' || pk_bal.o !== 'PAK' || pk_kpk.o !== 'PAK') return false;

          if (!pk_pun.name.includes('Pakistan') || !pk_sin.adminEntity?.includes('Governor-General M.A. Jinnah')) return false;



          // 2b. Dominion del Pakistan (Pakistan Orientale: Dacca & Sylhet Referendum Transfer)

          const bd_dha = resolveFeature({ id: 'BD_DHA', properties: { id: 'BD_DHA' } }, 19);

          const bd_syl = resolveFeature({ id: 'BD_SYL', properties: { id: 'BD_SYL' } }, 19);

          if (bd_dha.o !== 'PAK' || bd_syl.o !== 'PAK') return false;

          if (!bd_syl.note.includes('referendum') || !bd_dha.name.includes('Pakistan Orientale')) return false;



          // 2c. Dominion dell'India (Unione Indiana: Nuova Delhi, Punjab Orientale, Bengala Occidentale, Assam)

          const in_del = resolveFeature({ id: 'IN_DEL', properties: { id: 'IN_DEL' } }, 19);

          const in_pun = resolveFeature({ id: 'IN_PUN', properties: { id: 'IN_PUN' } }, 19);

          const in_ben = resolveFeature({ id: 'IN_BEN', properties: { id: 'IN_BEN' } }, 19);

          const in_ass = resolveFeature({ id: 'IN_ASS', properties: { id: 'IN_ASS' } }, 19);

          if (in_del.o !== 'IND' || in_pun.o !== 'IND' || in_ben.o !== 'IND' || in_ass.o !== 'IND') return false;

          if (!in_del.note.includes('Tryst with Destiny') || !in_ben.note.includes('Mahatma Gandhi')) return false;



          // 2d. I Tre Grandi Stati Principeschi Contesi al 30 Settembre 1947

          // - Jammu & Kashmir: Maharaja Hari Singh indipendente provvisorio (Standstill Agreement, neutral)

          const in_jk = resolveFeature({ id: 'IN_JK', properties: { id: 'IN_JK' } }, 19);

          const pk_gb = resolveFeature({ id: 'PK_GB', properties: { id: 'PK_GB' } }, 19);

          if (in_jk.o !== 'KAS' || pk_gb.o !== 'KAS' || in_jk.fac !== 'Neutrale') return false;

          if (!in_jk.note.includes('Hari Singh') || !in_jk.note.includes('Standstill')) return false;



          // - Hyderabad: Nizam Mir Osman Ali Khan sovrano indipendente (neutral)

          const in_hyd = resolveFeature({ id: 'IN_HYD', properties: { id: 'IN_HYD' } }, 19);

          if (in_hyd.o !== 'HYD' || in_hyd.fac !== 'Neutrale' || !in_hyd.note.includes('Asaf Jah VII')) return false;



          // - Junagadh nel Gujarat: Blocco indiano e governo provvisorio Aarzi Hukumat

          const in_guj = resolveFeature({ id: 'IN_GUJ', properties: { id: 'IN_GUJ' } }, 19);

          if (in_guj.o !== 'IND' || !in_guj.note.includes('Junagadh') || !in_guj.note.includes('Aarzi Hukumat')) return false;



          // 2e. Enclavi europee e Birmania

          const in_goa = resolveFeature({ id: 'IN_GOA', properties: { id: 'IN_GOA' } }, 19);

          const in_pon = resolveFeature({ id: 'IN_PON', properties: { id: 'IN_PON' } }, 19);

          const mm_ran = resolveFeature({ id: 'MM_RAN', properties: { id: 'MM_RAN' } }, 19);

          if (in_goa.o !== 'POR' || in_pon.o !== 'FRA' || mm_ran.o !== 'UK') return false;

          if (!mm_ran.note.includes('U Nu')) return false;



          // 3. Trattati di Pace di Parigi (15 Settembre 1947) & Confine Orientale Italiano

          // 3a. Gorizia: Restituita all'Italia (Repubblica Italiana) con taglio ferroviario a Nova Gorica

          const gorizia = resolveFeature({ properties: { id: 'ITH43', NUTS_ID: 'ITH43', CNTR_CODE: 'IT', NAME_LATN: 'Gorizia' } }, 19);

          if (gorizia.o !== 'ITA' || !gorizia.name.includes('Gorizia') || !gorizia.note.includes('Nova Gorica')) return false;



          // 3b. Territorio Libero di Trieste (TLT / FTT) — Zona A (AMG-FTT / TRUST + BETFOR)

          const trieste = resolveFeature({ properties: { id: 'ITH44', NUTS_ID: 'ITH44', CNTR_CODE: 'IT', NAME_LATN: 'Trieste' } }, 19);

          if (trieste.o !== 'AMG' || !trieste.name.includes('Territorio Libero di Trieste') || !trieste.adminEntity?.includes('Terence Airey')) return false;



          // 3c. Pola: Ceduta alla Jugoslavia a seguito dell'esodo sul piroscafo Toscana

          const pola = resolveFeature({ properties: { id: 'HR036', NUTS_ID: 'HR036', CNTR_CODE: 'HR', NAME_LATN: 'Pula' } }, 19);

          if (pola.o !== 'DFJ' || !pola.name.includes('Pula') || !pola.note.includes('Toscana')) return false;



          // 3d. Territorio Libero di Trieste (TLT / FTT) — Zona B (VUJA: Capodistria e Buiese)

          const koper = resolveFeature({ properties: { id: 'SI_HIST_KOPER', NUTS_ID: 'SI_HIST_KOPER', CNTR_CODE: 'SI', NAME_LATN: 'Koper' } }, 19);

          const buie = resolveFeature({ properties: { id: 'HR_HIST_BUIE', NUTS_ID: 'HR_HIST_BUIE', CNTR_CODE: 'HR', NAME_LATN: 'Buje' } }, 19);

          if (koper.o !== 'DFJ' || buie.o !== 'DFJ' || !koper.name.includes('Zona B') || !buie.name.includes('Zona B')) return false;



          // 4. Grecia e Dodecaneso

          // 4a. Dodecaneso: Passato formalmente al Regno di Grecia

          const dodecanese = resolveFeature({ properties: { id: 'EL421', NUTS_ID: 'EL421', CNTR_CODE: 'EL', NAME_LATN: 'Dodekanisos' } }, 19);

          if (dodecanese.o !== 'GRE' || !dodecanese.name.includes('Regno di Grecia')) return false;



          // 5. Germania e Protettorato della Saar

          // 5a. Protettorato della Saar distaccato con unione economica/doganale con la Francia (distretti DEC01-DEC06)
          const saar19 = resolveFeature({ properties: { id: 'DEC01', NUTS_ID: 'DEC01', CNTR_CODE: 'DE', NAME_LATN: 'Saarbrücken' } }, 19);
          const saarlouis19 = resolveFeature({ properties: { id: 'DEC04', NUTS_ID: 'DEC04', CNTR_CODE: 'DE', NAME_LATN: 'Saarlouis' } }, 19);
          if (saar19.o !== 'SAAR' || !saar19.name.includes('Saarbrücken') || !saar19.name.includes('Protettorato della Saar')) return false;
          if (saarlouis19.o !== 'SAAR' || !saarlouis19.name.includes('Saarlouis')) return false;

          // 5b. Integrità Confini Storici: Trier-Saarburg (DEB25) NON appartiene alla Saar ma alla Renania-Palatinato (Zona Francese GMZFO)
          const trierSaarburg19 = resolveFeature({ properties: { id: 'DEB25', NUTS_ID: 'DEB25', CNTR_CODE: 'DE', NAME_LATN: 'Trier-Saarburg' } }, 19);
          if (trierSaarburg19.o !== 'FRA' || !trierSaarburg19.name.includes('Zona di Occupazione Francese')) return false;



          // 6. Indocina: Retrocessione thailandese dei territori cambogiani e laotiani (Trattato di Washington nov 1946)

          const battambang = resolveFeature({ id: 'KH2', properties: { id: 'KH2', CNTR_CODE: 'KH', name: 'Battambang' } }, 19);

          if (battambang.o !== 'FRA' || !battambang.note.includes('Trattato di Washington')) return false;



          // 7. Risoluzione Bandiere Autentiche Step 19

          const flagPak = resolveHistoricalFlag('PAK', 19);

          const flagInd = resolveHistoricalFlag('IND', 19);

          const flagHyd = resolveHistoricalFlag('HYD', 19);

          const flagKas = resolveHistoricalFlag('KAS', 19);

          const flagSaar = resolveHistoricalFlag('SAAR', 19);

          const flagIta19 = resolveHistoricalFlag('ITA', 19);

          if (!flagPak || flagPak.asset.file_name !== 'Flag_of_Pakistan.svg') return false;

          if (!flagInd || flagInd.asset.file_name !== 'Flag_of_India.svg') return false;

          if (!flagHyd || flagHyd.asset.file_name !== 'Flag_of_Hyderabad.svg') return false;

          if (!flagKas || flagKas.asset.file_name !== 'Flag_of_Jammu_and_Kashmir_(princely_state).svg') return false;

          if (!flagSaar || flagSaar.asset.file_name !== 'Flag_of_Saar_(1947–1956).svg') return false;
          const flagSaarSvg = getCountryFlagSvg('SAAR', 19);
          if (!flagSaarSvg.includes('data:image/png;base64') || !flagSaarSvg.includes('#002654') || !flagSaarSvg.includes('#CE1126')) return false;

          if (!flagIta19 || flagIta19.asset.file_name !== 'Flag_of_Italy.svg') return false;



          // 8. Metadati Proprietari (owners.ts)

          const metaPak = getOwnerMeta('PAK', 19);

          const metaInd = getOwnerMeta('IND', 19);

          const metaHyd = getOwnerMeta('HYD', 19);

          const metaKas = getOwnerMeta('KAS', 19);

          const metaSaar = getOwnerMeta('SAAR', 19);

          if (metaPak.id !== 'PAK' || metaInd.id !== 'IND' || metaHyd.id !== 'HYD' || metaKas.id !== 'KAS' || metaSaar.id !== 'SAAR') return false;



          // 9. Repubblica Italiana (Post-Referendum 1946 & De Gasperi)

          const metaIta19 = getOwnerMeta('ITA', 19);

          if (!metaIta19.l(19).includes('Repubblica Italiana') || !metaIta19.leader?.includes('De Gasperi') || !metaIta19.leader?.includes('De Nicola')) return false;

          const flagItaSvg19 = getCountryFlagSvg('ITA', 19);

          if (flagItaSvg19.includes('image') || !flagItaSvg19.includes('#008C45')) return false;

          const ravenna19 = resolveFeature({ properties: { id: 'ITH57', NUTS_ID: 'ITH57', CNTR_CODE: 'IT', NAME_LATN: 'Ravenna' } }, 19);

          if (ravenna19.o !== 'ITA' || !ravenna19.name.includes('Repubblica Italiana') || !ravenna19.adminEntity?.includes('Prefettura')) return false;

          // 10. Focus Storico: Repubblica Federativa Popolare di Jugoslavia (FNRJ) & Territorio Libero di Trieste (TLT) Step 19
          // 10a. Metadati e Fazione FNRJ & TLT
          const metaDfj19 = getOwnerMeta('DFJ', 19);
          const metaAmg19 = getOwnerMeta('AMG', 19);
          if (!metaDfj19.l(19).includes('Repubblica Federativa Popolare di Jugoslavia') || metaDfj19.f !== 'Comintern' || !metaDfj19.leader?.includes('Tito')) return false;
          if (!metaAmg19.l(19).includes('Territorio Libero di Trieste') || !metaAmg19.leader?.includes('Airey')) return false;

          // 10b. Bandiere Autentiche fornite dall'utente (FNRJ e TLT Alabarda di San Giusto)
          const flagFnrjSvg = getCountryFlagSvg('DFJ', 19);
          const flagTltSvg = getCountryFlagSvg('AMG', 19);
          if (!flagFnrjSvg.includes('data:image/png;base64') || !flagTltSvg.includes('data:image/png;base64')) return false;

          // 10c. Territori e Città cedute dall'Italia alla Jugoslavia (Trattato di Parigi 15 settembre 1947)
          const fiume19 = resolveFeature({ properties: { id: 'HR031', NUTS_ID: 'HR031', CNTR_CODE: 'HR', NAME_LATN: 'Rijeka' } }, 19);
          const zara19 = resolveFeature({ properties: { id: 'HR033', NUTS_ID: 'HR033', CNTR_CODE: 'HR', NAME_LATN: 'Zadar' } }, 19);
          const goriska19 = resolveFeature({ properties: { id: 'SI043', NUTS_ID: 'SI043', CNTR_CODE: 'SI', NAME_LATN: 'Goriška' } }, 19);
          if (fiume19.o !== 'DFJ' || !fiume19.name.includes('Fiume / Rijeka') || !fiume19.note.includes('Trattato di Pace di Parigi')) return false;
          if (zara19.o !== 'DFJ' || !zara19.name.includes('Zara / Zadar') || !zara19.note.includes('Trattato di Pace di Parigi')) return false;
          if (goriska19.o !== 'DFJ' || !goriska19.name.includes('Goriška') || !goriska19.note.includes('Nova Gorica')) return false;

          // 10d. Repubbliche Federate FNRJ (Serbia, Bosnia, Slovenia, Montenegro, Macedonia)
          const beograd19 = resolveFeature({ properties: { id: 'RS110', NUTS_ID: 'RS110', CNTR_CODE: 'RS', NAME_LATN: 'Beograd' } }, 19);
          const bosnia19 = resolveFeature({ properties: { id: 'BA01', NUTS_ID: 'BA01', CNTR_CODE: 'BA', NAME_LATN: 'Sarajevo' } }, 19);
          const slovenia19 = resolveFeature({ properties: { id: 'SI041', NUTS_ID: 'SI041', CNTR_CODE: 'SI', NAME_LATN: 'Osrednjeslovenska' } }, 19);
          const montenegro19 = resolveFeature({ properties: { id: 'ME000', NUTS_ID: 'ME000', CNTR_CODE: 'ME', NAME_LATN: 'Crna Gora' } }, 19);
          const macedonia19 = resolveFeature({ properties: { id: 'MK001', NUTS_ID: 'MK001', CNTR_CODE: 'MK', NAME_LATN: 'Skopski' } }, 19);
          if (beograd19.o !== 'DFJ' || !beograd19.name.includes('Beograd') || !beograd19.adminEntity?.includes('NRS')) return false;
          if (bosnia19.o !== 'DFJ' || !bosnia19.adminEntity?.includes('NRBiH')) return false;
          if (slovenia19.o !== 'DFJ' || !slovenia19.adminEntity?.includes('LRS')) return false;
          if (montenegro19.o !== 'DFJ' || !montenegro19.adminEntity?.includes('NRCG')) return false;
          if (macedonia19.o !== 'DFJ' || !macedonia19.adminEntity?.includes('NRM')) return false;

          // 11. Focus Geostorico e Geopolitico Guerra Civile Cinese (Step 19 — SET 1947)
          // 11a. Manciuria Rossa (Lin Biao / Harbin capitale dell'EPL, Jilin, Xingan)
          const heilongjiang19 = resolveFeature({ id: 'CHN_HEILONGJIANG', properties: { id: 'CHN_HEILONGJIANG', NUTS_ID: 'CHN_HEILONGJIANG', CNTR_CODE: 'CN_PROV' } }, 19);
          const jilin19 = resolveFeature({ id: 'CHN_JILIN', properties: { id: 'CHN_JILIN', NUTS_ID: 'CHN_JILIN', CNTR_CODE: 'CN_PROV' } }, 19);
          const xinganN19 = resolveFeature({ id: 'CHN_MANCHUKUO_XINGAN_NORTH', properties: { id: 'CHN_MANCHUKUO_XINGAN_NORTH', NUTS_ID: 'CHN_MANCHUKUO_XINGAN_NORTH', CNTR_CODE: 'CN_PROV' } }, 19);
          const xinganS19 = resolveFeature({ id: 'CHN_MANCHUKUO_XINGAN_SOUTH', properties: { id: 'CHN_MANCHUKUO_XINGAN_SOUTH', NUTS_ID: 'CHN_MANCHUKUO_XINGAN_SOUTH', CNTR_CODE: 'CN_PROV' } }, 19);
          if (heilongjiang19.o !== 'CCP_CHI' || heilongjiang19.fac !== 'Comintern' || !heilongjiang19.name.includes('Harbin') || !heilongjiang19.note.includes('Lin Biao')) return false;
          if (jilin19.o !== 'CCP_CHI' || jilin19.fac !== 'Comintern' || !jilin19.note.includes('Changchun')) return false;
          if (xinganN19.o !== 'CCP_CHI' || !xinganN19.note.includes('Ulanhu')) return false;
          if (xinganS19.o !== 'CCP_CHI') return false;

          // 11b. Teatri della Svolta Strategica: Shandong (Menglianggu) e Shaanxi (Shajiadian)
          const shandong19 = resolveFeature({ id: 'CHN_SHANDONG', properties: { id: 'CHN_SHANDONG', NUTS_ID: 'CHN_SHANDONG', CNTR_CODE: 'CN_PROV' } }, 19);
          const shaanxi19 = resolveFeature({ id: 'CHN_SHAANXI', properties: { id: 'CHN_SHAANXI', NUTS_ID: 'CHN_SHAANXI', CNTR_CODE: 'CN_PROV' } }, 19);
          if (shandong19.o !== 'CCP_CHI' || shandong19.fac !== 'Comintern' || !shandong19.note.includes('Menglianggu') || !shandong19.adminEntity?.includes('Su Yu')) return false;
          if (shaanxi19.o !== 'CCP_CHI' || shaanxi19.fac !== 'Comintern' || !shaanxi19.note.includes('Shajiadian') || !shaanxi19.adminEntity?.includes('Peng Dehuai')) return false;

          // 11c. Base Navale Speciale Sovietica a Port Arthur e Dalian (Kantō-shū)
          const kantoShu19 = resolveFeature({ id: 'JP_KANTO_SHU', properties: { id: 'JP_KANTO_SHU', NUTS_ID: 'JP_KANTO_SHU', CNTR_CODE: 'CN_PROV' } }, 19);
          if (kantoShu19.o !== 'SOV' || kantoShu19.fac !== 'Comintern' || !kantoShu19.name.includes('Lüshun')) return false;

          // 11d. Sacche Nazionaliste Isolate: Liaoning (Shenyang e Jinzhou / Gen. Chen Cheng)
          const liaoning19 = resolveFeature({ id: 'CHN_LIAONING', properties: { id: 'CHN_LIAONING', NUTS_ID: 'CHN_LIAONING', CNTR_CODE: 'CN_PROV' } }, 19);
          if (liaoning19.o !== 'CHI' || liaoning19.fac !== 'Alleati' || !liaoning19.note.includes('Chen Cheng') || !liaoning19.note.includes('Shenyang')) return false;

          // 11e. Sfondamento di Liu-Deng nei Monti Dabie (Henan, Hubei, Anhui)
          const henan19 = resolveFeature({ id: 'CHN_HENAN', properties: { id: 'CHN_HENAN', NUTS_ID: 'CHN_HENAN', CNTR_CODE: 'CN_PROV' } }, 19);
          const hubei19 = resolveFeature({ id: 'CHN_HUBEI', properties: { id: 'CHN_HUBEI', NUTS_ID: 'CHN_HUBEI', CNTR_CODE: 'CN_PROV' } }, 19);
          const anhui19 = resolveFeature({ id: 'CHN_ANHUI', properties: { id: 'CHN_ANHUI', NUTS_ID: 'CHN_ANHUI', CNTR_CODE: 'CN_PROV' } }, 19);
          if (henan19.o !== 'CHI' || !henan19.note.includes('Liu Bocheng') || !henan19.note.includes('Dabie')) return false;
          if (hubei19.o !== 'CHI' || !hubei19.note.includes('Bai Chongxi')) return false;
          if (anhui19.o !== 'CHI' || !anhui19.note.includes('Dabie')) return false;

          // 11f. Centro Governativo del Kuomintang, Taiwan (228 Incident) e Xinjiang (ETR)
          const jiangsu19 = resolveFeature({ id: 'CHN_JIANGSU', properties: { id: 'CHN_JIANGSU', NUTS_ID: 'CHN_JIANGSU', CNTR_CODE: 'CN_PROV' } }, 19);
          const taiwan19 = resolveFeature({ id: 'CHN_TAIWAN', properties: { id: 'CHN_TAIWAN', NUTS_ID: 'CHN_TAIWAN', CNTR_CODE: 'CN_PROV' } }, 19);
          const xinjiang19 = resolveFeature({ id: 'CHN_XINJIANG', properties: { id: 'CHN_XINJIANG', NUTS_ID: 'CHN_XINJIANG', CNTR_CODE: 'CN_PROV' } }, 19);
          const tibet19 = resolveFeature({ id: 'CHN_TIBET', properties: { id: 'CHN_TIBET', NUTS_ID: 'CHN_TIBET', CNTR_CODE: 'CN_PROV' } }, 19);
          if (jiangsu19.o !== 'CHI' || !jiangsu19.name.includes('Nanjing') || !jiangsu19.note.includes('Fabi')) return false;
          if (taiwan19.o !== 'CHI' || !taiwan19.name.includes('Wei Tao-ming') || !taiwan19.note.includes('28 Febbraio')) return false;
          if (xinjiang19.o !== 'CHI' || !xinjiang19.note.includes('Turkestan Orientale') || !xinjiang19.note.includes('Ehmetjan Qasim')) return false;
          if (tibet19.o !== 'TIB' || tibet19.fac !== 'Neutrale') return false;

          // 11g. Metadati di Partito e Fazione per Cina Popolare e Kuomintang
          const metaCcp19 = getOwnerMeta('CCP_CHI', 19);
          const metaChi19 = getOwnerMeta('CHI', 19);
          if (!metaCcp19.l(19).includes('Esercito Popolare di Liberazione') || !metaCcp19.leader?.includes('Mao Zedong') || !metaCcp19.capital?.includes('Harbin')) return false;
          if (!metaChi19.l(19).includes('Repubblica di Cina') || !metaChi19.leader?.includes('Chiang Kai-shek') || metaChi19.capital !== 'Nanjing (Nanchino)') return false;

          // 12. Guerra d'Indipendenza Indonesiana (SET 1947 — Operatie Product, Linea Van Mook & NIT)
          // 12a. Cuore Rivoluzionario della Repubblica d'Indonesia (IDN, Neutrale): Yogyakarta, Giava Centrale, Banten
          const yogya19 = resolveFeature({ id: 'IDYO', properties: { id: 'IDYO', ISO2: 'ID', NUTS_ID: 'IDYO' } }, 19);
          const jateng19 = resolveFeature({ id: 'IDJT', properties: { id: 'IDJT', ISO2: 'ID', NUTS_ID: 'IDJT' } }, 19);
          const banten19 = resolveFeature({ id: 'IDBT', properties: { id: 'IDBT', ISO2: 'ID', NUTS_ID: 'IDBT' } }, 19);
          if (yogya19.o !== 'IDN' || yogya19.fac !== 'Neutrale' || !yogya19.name.includes('Yogyakarta') || !yogya19.note.includes('Hamengkubuwono IX') || !yogya19.note.includes('Soedirman')) return false;
          if (jateng19.o !== 'IDN' || jateng19.fac !== 'Neutrale' || !jateng19.note.includes('TNI')) return false;
          if (banten19.o !== 'IDN' || banten19.fac !== 'Neutrale' || !banten19.name.includes('Banten') || !banten19.note.includes('Achmad Chatib')) return false;

          // 12b. Roccaforti Repubblicane di Sumatra (IDN, Neutrale): Aceh (Daerah Modal), Sumatra Ovest (Bukittinggi), Jambi, Bengkulu, Riau
          const aceh19 = resolveFeature({ id: 'IDAC', properties: { id: 'IDAC', ISO2: 'ID', NUTS_ID: 'IDAC' } }, 19);
          const sumbar19 = resolveFeature({ id: 'IDSB', properties: { id: 'IDSB', ISO2: 'ID', NUTS_ID: 'IDSB' } }, 19);
          const jambi19 = resolveFeature({ id: 'IDJA', properties: { id: 'IDJA', ISO2: 'ID', NUTS_ID: 'IDJA' } }, 19);
          const bengkulu19 = resolveFeature({ id: 'IDBE', properties: { id: 'IDBE', ISO2: 'ID', NUTS_ID: 'IDBE' } }, 19);
          if (aceh19.o !== 'IDN' || aceh19.fac !== 'Neutrale' || !aceh19.note.includes('Daerah Modal') || !aceh19.note.includes('Daud Beureueh')) return false;
          if (sumbar19.o !== 'IDN' || sumbar19.fac !== 'Neutrale' || !sumbar19.name.includes('Bukittinggi') || !sumbar19.note.includes('Teuku Muhammad Hasan')) return false;
          if (jambi19.o !== 'IDN' || bengkulu19.o !== 'IDN') return false;

          // 12c. Occupazione Militare Olandese Post-Operatie Product (HOL, Alleati) su Risorse Economiche: Palembang (Raffinerie Plaju/Sungai Gerong), Sumatra Est/Deli (Medan), Lampung, Bangka
          const palembang19 = resolveFeature({ id: 'IDSS', properties: { id: 'IDSS', ISO2: 'ID', NUTS_ID: 'IDSS' } }, 19);
          const sumut19 = resolveFeature({ id: 'IDSU', properties: { id: 'IDSU', ISO2: 'ID', NUTS_ID: 'IDSU' } }, 19);
          const lampung19 = resolveFeature({ id: 'IDLA', properties: { id: 'IDLA', ISO2: 'ID', NUTS_ID: 'IDLA' } }, 19);
          const bangka19 = resolveFeature({ id: 'IDBB', properties: { id: 'IDBB', ISO2: 'ID', NUTS_ID: 'IDBB' } }, 19);
          if (palembang19.o !== 'HOL' || palembang19.fac !== 'Alleati' || !palembang19.note.includes('Operatie Product') || !palembang19.note.includes('Pladjoe')) return false;
          if (sumut19.o !== 'HOL' || sumut19.fac !== 'Alleati' || !sumut19.name.includes('Medan') || !sumut19.note.includes('Tengku Mansur')) return false;
          if (lampung19.o !== 'HOL' || bangka19.o !== 'HOL') return false;

          // 12d. Zone Occupate di Giava (HOL, Alleati): Batavia (Hubertus van Mook), Pasundan / Giava Ovest, Jawa Timur & Madura
          const batavia19 = resolveFeature({ id: 'IDJK', properties: { id: 'IDJK', ISO2: 'ID', NUTS_ID: 'IDJK' } }, 19);
          const jabar19 = resolveFeature({ id: 'IDJB', properties: { id: 'IDJB', ISO2: 'ID', NUTS_ID: 'IDJB' } }, 19);
          const jatim19 = resolveFeature({ id: 'IDJI', properties: { id: 'IDJI', ISO2: 'ID', NUTS_ID: 'IDJI' } }, 19);
          if (batavia19.o !== 'HOL' || batavia19.fac !== 'Alleati' || !batavia19.note.includes('van Mook')) return false;
          if (jabar19.o !== 'HOL' || !jabar19.note.includes('Pasundan') || !jabar19.note.includes('Siliwangi')) return false;
          if (jatim19.o !== 'HOL' || !jatim19.note.includes('Surabaya') || !jatim19.note.includes('Madura')) return false;

          // 12e. Stati Federali e Territori Esterni (HOL, Alleati): Negara Indonesia Timur (NIT, Makassar), Borneo Occidentale (Sultan Hamid II), Nuova Guinea Olandese
          const makassar19 = resolveFeature({ id: 'IDSN', properties: { id: 'IDSN', ISO2: 'ID', NUTS_ID: 'IDSN' } }, 19);
          const pontianak19 = resolveFeature({ id: 'IDKB', properties: { id: 'IDKB', ISO2: 'ID', NUTS_ID: 'IDKB' } }, 19);
          const papua19 = resolveFeature({ id: 'IDPA', properties: { id: 'IDPA', ISO2: 'ID', NUTS_ID: 'IDPA' } }, 19);
          if (makassar19.o !== 'HOL' || !makassar19.name.includes('Negara Indonesia Timur') || !makassar19.note.includes('Soekawati')) return false;
          if (pontianak19.o !== 'HOL' || !pontianak19.note.includes('Sultano Hamid II')) return false;
          if (papua19.o !== 'HOL' || !papua19.name.includes('Nederlands-Nieuw-Guinea')) return false;

          // 12f. Metadati Geopolitici Dinamici di IDN allo Step 19: Capitale a Yogyakarta e Leadership
          const metaIdn19 = getOwnerMeta('IDN', 19);
          if (metaIdn19.f !== 'Neutrale' || !metaIdn19.l(19).includes('Yogyakarta') || !metaIdn19.leader?.includes('Soedirman') || !metaIdn19.capital?.includes('Yogyakarta')) return false;

          // 13. Focus Geostorico e Geopolitico Sud-Est Asiatico (Step 19 — SET 1947: Filippine, Indocina, Malesia, Singapore)
          // 13a. Terza Repubblica delle Filippine (Indipendenza sovrana 4 luglio 1946, Manuel Roxas)
          const manila19 = resolveFeature({ id: 'PH00', properties: { id: 'PH00', ISO2: 'PH', NUTS_ID: 'PH00' } }, 19);
          const metaPhl19 = getOwnerMeta('PHL', 19);
          if (manila19.o !== 'PHL' || manila19.fac !== 'Alleati' || !manila19.note.includes('Manila') || !manila19.note.includes('Hukbalahap')) return false;
          if (metaPhl19.tier !== 'sovereign' || metaPhl19.overlordCode !== null || metaPhl19.isSubject || !metaPhl19.leader?.includes('Manuel Roxas') || metaPhl19.capital !== 'Manila') return false;

          // 13b. Repubblica Autonoma di Cocincina & Presidio Francese nel Sud (FRA, Alleati / Lê Văn Hoạch & Émile Bollaert)
          const saigon19 = resolveFeature({ id: 'VNSG', properties: { id: 'VNSG', ISO2: 'VN', NUTS_ID: 'VNSG' } }, 19);
          const cantho19 = resolveFeature({ id: 'VNCT', properties: { id: 'VNCT', ISO2: 'VN', NUTS_ID: 'VNCT' } }, 19);
          if (saigon19.o !== 'FRA' || saigon19.fac !== 'Alleati' || !saigon19.adminEntity?.includes('Lê Văn Hoạch') || !saigon19.adminEntity?.includes('Bollaert')) return false;
          if (cantho19.o !== 'FRA' || cantho19.fac !== 'Alleati') return false;

          // 13c. Delta del Fiume Rosso e Costa dell'Annam / Altopiani PMSI (FRA, Alleati / CEFEO & Salan)
          const hanoi19 = resolveFeature({ id: 'VNHN', properties: { id: 'VNHN', ISO2: 'VN', NUTS_ID: 'VNHN' } }, 19);
          const haiphong19 = resolveFeature({ id: 'VNHP', properties: { id: 'VNHP', ISO2: 'VN', NUTS_ID: 'VNHP' } }, 19);
          const hue19 = resolveFeature({ id: 'VN26', properties: { id: 'VN26', ISO2: 'VN', NUTS_ID: 'VN26' } }, 19);
          const dalat19 = resolveFeature({ id: 'VN35', properties: { id: 'VN35', ISO2: 'VN', NUTS_ID: 'VN35' } }, 19);
          if (hanoi19.o !== 'FRA' || !hanoi19.adminEntity?.includes('Raoul Salan')) return false;
          if (haiphong19.o !== 'FRA' || hue19.o !== 'FRA') return false;
          if (dalat19.o !== 'FRA' || !dalat19.note.includes('Bảo Đại')) return false;

          // 13d. Roccaforte del Việt Minh nel Việt Bắc & Interzona IV (VIE, Comintern / Hồ Chí Minh & Võ Nguyên Giáp)
          const backan19 = resolveFeature({ id: 'VN07', properties: { id: 'VN07', ISO2: 'VN', NUTS_ID: 'VN07' } }, 19);
          const thainguyen19 = resolveFeature({ id: 'VN69', properties: { id: 'VN69', ISO2: 'VN', NUTS_ID: 'VN69' } }, 19);
          const nghean19 = resolveFeature({ id: 'VN22', properties: { id: 'VN22', ISO2: 'VN', NUTS_ID: 'VN22' } }, 19);
          const metaVie19 = getOwnerMeta('VIE', 19);
          if (backan19.o !== 'VIE' || backan19.fac !== 'Comintern' || !backan19.note.includes('Việt Bắc') || !backan19.note.includes('Léa')) return false;
          if (thainguyen19.o !== 'VIE' || nghean19.o !== 'VIE' || !nghean19.note.includes('Interzona IV')) return false;
          if (metaVie19.f !== 'Comintern' || !metaVie19.capital?.includes('Việt Bắc') || !metaVie19.leader?.includes('Võ Nguyên Giáp')) return false;

          // 13e. Cambogia e Laos (FRA, Alleati / Sovranità Reale & Trattato di Washington 1946)
          const cambodiaRetroceded19 = resolveFeature({ id: 'KH1', properties: { id: 'KH1', ISO2: 'KH', NUTS_ID: 'KH1' } }, 19);
          const laos19 = resolveFeature({ id: 'LA01', properties: { id: 'LA01', ISO2: 'LA', NUTS_ID: 'LA01' } }, 19);
          if (cambodiaRetroceded19.o !== 'FRA' || !cambodiaRetroceded19.note.includes('Washington')) return false;
          if (laos19.o !== 'FRA' || !laos19.note.includes('Sisavang Vong')) return false;

          // 13f. Colonia della Corona di Singapore, Unione Malese e Borneo Britannico (UK, Alleati)
          const singapore19 = resolveFeature({ id: 'SG01', properties: { id: 'SG01', ISO2: 'SG', NUTS_ID: 'SG01' } }, 19);
          const kualaLumpur19 = resolveFeature({ id: 'MY10', properties: { id: 'MY10', ISO2: 'MY', NUTS_ID: 'MY10' } }, 19);
          const sarawak19 = resolveFeature({ id: 'MY13', properties: { id: 'MY13', ISO2: 'MY', NUTS_ID: 'MY13' } }, 19);
          if (singapore19.o !== 'UK' || !singapore19.note.includes('Franklin Gimson') || !singapore19.note.includes('Sembawang')) return false;
          if (kualaLumpur19.o !== 'UK' || !kualaLumpur19.note.includes('Edward Gent') || !kualaLumpur19.note.includes('UMNO')) return false;
          if (sarawak19.o !== 'UK' || !sarawak19.note.includes('Charles Arden-Clarke')) return false;

          // 14. Focus Geostorico Nordico (Step 19 — SET 1947: Groenlandia & Finlandia)
          // 14a. Groenlandia: Sovranità danese ripristinata (DEN, Alleati / Re Federico IX & Landsfoged Simony)
          const gl19 = resolveFeature({ id: 'GL_GREENLAND', properties: { id: 'GL_GREENLAND', CNTR_CODE: 'DEN', NAME: 'Greenland' } }, 19);
          const metaDen19 = getOwnerMeta('DEN', 19);
          if (gl19.o !== 'DEN' || gl19.fac !== 'Alleati' || !gl19.name.includes('Federico IX') || !gl19.note.includes('Narsarsuaq')) return false;
          if (metaDen19.tier !== 'sovereign' || !metaDen19.leader?.includes('Federico IX') || !metaDen19.leader?.includes('Knud Kristensen')) return false;

          // 14b. Finlandia: Trattato di Pace di Parigi (FIN, Neutrale / Paasikivi & Pekkala, Scioglimento ACC Ždanov)
          const helsinki19 = resolveFeature({ id: 'FI1B1', properties: { id: 'FI1B1', ISO2: 'FI', NUTS_ID: 'FI1B1' } }, 19);
          const metaFin19 = getOwnerMeta('FIN', 19);
          if (helsinki19.o !== 'FIN' || helsinki19.fac !== 'Neutrale' || !helsinki19.name.includes('Trattato di Pace di Parigi') || !helsinki19.note.includes('Porkkala')) return false;
          if (metaFin19.f !== 'Neutrale' || !metaFin19.leader?.includes('Paasikivi') || !metaFin19.leader?.includes('Pekkala')) return false;

          // 14c. Presidenza USA Postbellica: Harry S. Truman (non Roosevelt)
          const metaUsa19 = getOwnerMeta('USA', 19);
          if (!metaUsa19.leader?.includes('Harry S. Truman')) return false;

          // 15. Focus Geostorico Africa e Medio Oriente — SET 1947 (Step 19)
          // 15a. Iran post-ritiro alleato (1946) e crisi petrolifera
          const irnTeh19 = resolveFeature({ id: 'IRN_TEH', properties: { id: 'IRN_TEH', CNTR_CODE: 'IR', NAME_LATN: 'Tehran' } }, 19);
          const irnEaz19 = resolveFeature({ id: 'IRN_EAZ', properties: { id: 'IRN_EAZ', CNTR_CODE: 'IR', NAME_LATN: 'East Azerbaijan' } }, 19);
          if (irnTeh19.o !== 'IRN' || irnTeh19.fac !== 'Neutrale' || irnEaz19.o !== 'IRN') return false;

          // 15b. Stati Arabi Sovrani nel Medio Oriente: Iraq, Siria, Libano, Transgiordania, Arabia Saudita, Yemen (ONU 30 set 1947)
          const irq19 = resolveFeature({ id: 'IQ', properties: { CNTR_CODE: 'IQ', NAME_LATN: 'Iraq' } }, 19);
          const syr19 = resolveFeature({ id: 'SY', properties: { CNTR_CODE: 'SY', NAME_LATN: 'Syria' } }, 19);
          const leb19 = resolveFeature({ id: 'LB', properties: { CNTR_CODE: 'LB', NAME_LATN: 'Lebanon' } }, 19);
          const jor19 = resolveFeature({ id: 'JO', properties: { CNTR_CODE: 'JO', NAME_LATN: 'Jordan' } }, 19);
          const sau19 = resolveFeature({ id: 'SA', properties: { CNTR_CODE: 'SA', NAME_LATN: 'Saudi Arabia' } }, 19);
          const yem19 = resolveFeature({ id: 'YE', properties: { CNTR_CODE: 'YE', NAME_LATN: 'Yemen' } }, 19);
          const metaIrq19 = getOwnerMeta('IRQ', 19);
          if (irq19.o !== 'IRQ' || irq19.fac !== 'Neutrale' || metaIrq19.overlordCode !== null) return false;
          if (syr19.o !== 'SYR' || syr19.fac !== 'Neutrale' || leb19.o !== 'LEB' || leb19.fac !== 'Neutrale') return false;
          if (jor19.o !== 'JOR' || jor19.fac !== 'Neutrale' || sau19.o !== 'SAU' || yem19.o !== 'YEM') return false;

          // 15c. Mandato Britannico di Palestina (Rapporto UNSCOP & Remissione del Mandato) e Protettorati del Golfo
          const palJrs19 = resolveFeature({ id: 'PAL_JRS', properties: { id: 'PAL_JRS', CNTR_CODE: 'PS', NAME_LATN: 'Jerusalem' } }, 19);
          const palHfa19 = resolveFeature({ id: 'PAL_HFA', properties: { id: 'PAL_HFA', CNTR_CODE: 'PS', NAME_LATN: 'Haifa' } }, 19);
          const kw19 = resolveFeature({ id: 'KW', properties: { CNTR_CODE: 'KW', NAME_LATN: 'Kuwait' } }, 19);
          const bh19 = resolveFeature({ id: 'BH', properties: { CNTR_CODE: 'BH', NAME_LATN: 'Bahrain' } }, 19);
          if (palJrs19.o !== 'UK' || !palJrs19.note.includes('UNSCOP') || palHfa19.o !== 'UK') return false;
          if (kw19.o !== 'UK' || bh19.o !== 'UK') return false;

          // 15d. Egitto Sovrano Neutrale (Re Faruq I / Nukrashi) e Sudan Anglo-Egiziano (Conferenza di Giuba 1947)
          const egyCai19 = resolveFeature({ id: 'EGC', properties: { id: 'EGC', CNTR_CODE: 'EG', NAME_LATN: 'Cairo' } }, 19);
          const egyMat19 = resolveFeature({ id: 'EGMT', properties: { id: 'EGMT', CNTR_CODE: 'EG', NAME_LATN: 'Matrouh' } }, 19);
          const metaEgy19 = getOwnerMeta('EGY', 19);
          const sud19 = resolveFeature({ id: 'SD_KHR', properties: { id: 'SD_KHR', CNTR_CODE: 'SD', NAME_LATN: 'Khartoum' } }, 19);
          const ssd19 = resolveFeature({ id: 'SSD', properties: { id: 'SSD', CNTR_CODE: 'SS', NAME_LATN: 'Juba' } }, 19);
          if (egyCai19.o !== 'EGY' || egyCai19.fac !== 'Neutrale' || egyMat19.o !== 'EGY') return false;
          if (metaEgy19.c !== '#2f7d73' || metaEgy19.overlordCode !== null || metaEgy19.f !== 'Neutrale') return false;
          if (sud19.o !== 'UK' || ssd19.o !== 'UK') return false;

          // 15e. Libia (BMA Tripolitania/Cirenaica UK, Fezzan FRA) & Africa Orientale (Etiopia Neutrale; Eritrea/Somalia BMA UK)
          const lyTrp19 = resolveFeature({ id: 'LYNL', properties: { id: 'LYNL', CNTR_CODE: 'LY', NAME_LATN: 'Tripoli' } }, 19);
          const lyBen19 = resolveFeature({ id: 'LYBA', properties: { id: 'LYBA', CNTR_CODE: 'LY', NAME_LATN: 'Benghazi' } }, 19);
          const lyFez19 = resolveFeature({ id: 'LYSB', properties: { id: 'LYSB', CNTR_CODE: 'LY', NAME_LATN: 'Sebha' } }, 19);
          const eth19 = resolveFeature({ id: 'ET', properties: { CNTR_CODE: 'ET', NAME_LATN: 'Ethiopia' } }, 19);
          const eri19 = resolveFeature({ id: 'ER', properties: { CNTR_CODE: 'ER', NAME_LATN: 'Eritrea' } }, 19);
          const som19 = resolveFeature({ id: 'SO', properties: { CNTR_CODE: 'SO', NAME_LATN: 'Somalia' } }, 19);
          if (lyTrp19.o !== 'UK' || lyBen19.o !== 'UK' || lyFez19.o !== 'FRA') return false;
          if (eth19.o !== 'ETH' || eth19.fac !== 'Neutrale' || eri19.o !== 'UK' || som19.o !== 'UK') return false;

          // 15f. Nordafrica & Africa Equatoriale/Occidentale Francese (Union Française, AOF Alta Volta 4 set 1947, Comore/Mayotte TOM), Tangeri e Africa Spagnola
          const dz19 = resolveFeature({ id: 'DZ_ALGIERS', properties: { id: 'DZ_ALGIERS', CNTR_CODE: 'DZ', NAME_LATN: 'Algiers' } }, 19);
          const ma19 = resolveFeature({ id: 'MA', properties: { CNTR_CODE: 'MA', NAME_LATN: 'Morocco' } }, 19);
          const tn19 = resolveFeature({ id: 'TN_TUNIS', properties: { id: 'TN_TUNIS', CNTR_CODE: 'TN', NAME_LATN: 'Tunis' } }, 19);
          const bf19 = resolveFeature({ id: 'AOF_BF', properties: { id: 'AOF_BF', CNTR_CODE: 'BF', NAME_LATN: 'Upper Volta' } }, 19);
          const tg19 = resolveFeature({ id: 'AOF_TG', properties: { id: 'AOF_TG', CNTR_CODE: 'TG', NAME_LATN: 'Togo' } }, 19);
          const cm19 = resolveFeature({ id: 'AEF_CM', properties: { id: 'AEF_CM', CNTR_CODE: 'CM', NAME_LATN: 'Cameroon' } }, 19);
          const fry50_19 = resolveFeature({ id: 'FRY50', properties: { id: 'FRY50', CNTR_CODE: 'FR', NAME_LATN: 'Mayotte' } }, 19);
          const tang19 = resolveFeature({ id: 'TANGER', properties: { id: 'TANGER', NAME_LATN: 'Tangier' } }, 19);
          const esRif19 = resolveFeature({ id: 'ES_RIF', properties: { id: 'ES_RIF', CNTR_CODE: 'ES_RIF', NAME_LATN: 'Tetuán' } }, 19);
          const lbr19 = resolveFeature({ id: 'LR', properties: { CNTR_CODE: 'LR', NAME_LATN: 'Liberia' } }, 19);
          const swa19 = resolveFeature({ id: 'SAF_SWA', properties: { id: 'SAF_SWA', CNTR_CODE: 'NA', NAME_LATN: 'South West Africa' } }, 19);
          if (dz19.o !== 'FRA' || ma19.o !== 'FRA' || tn19.o !== 'FRA') return false;
          if (bf19.o !== 'FRA' || tg19.o !== 'FRA' || cm19.o !== 'FRA' || fry50_19.o !== 'FRA') return false;
          if (tang19.o !== 'TANGER' || tang19.fac !== 'Neutrale' || esRif19.o !== 'SPA' || esRif19.fac !== 'Neutrale') return false;
          if (lbr19.o !== 'LBR' || lbr19.fac !== 'Neutrale' || swa19.o !== 'SAF') return false;

          // 15g. Bandiere Storiche Autentiche Africa & Medio Oriente — SET 1947
          const flagEgy19 = resolveHistoricalFlag('EGY', 19);
          const flagSyr19 = resolveHistoricalFlag('SYR', 19);
          const flagLeb19 = resolveHistoricalFlag('LEB', 19);
          const flagIrq19 = resolveHistoricalFlag('IRQ', 19);
          const flagIrn19 = resolveHistoricalFlag('IRN', 19);
          const flagTang19 = resolveHistoricalFlag('TANGER', 19);
          const flagSpa19 = resolveHistoricalFlag('SPA', 19);
          const flagFra19 = resolveHistoricalFlag('FRA', 19);
          if (!flagEgy19 || flagEgy19.asset.file_name !== 'Flag_of_Egypt_(1922-1958).svg') return false;
          if (!flagSyr19 || !flagSyr19.asset.file_name.includes('1930')) return false;
          if (!flagLeb19 || flagLeb19.asset.file_name !== 'Flag_of_Lebanon.svg') return false;
          if (!flagIrq19 || !flagIrq19.asset.file_name.includes('1924')) return false;
          if (!flagIrn19 || !flagIrn19.asset.file_name.includes('1933')) return false;
          if (!flagTang19 || flagTang19.asset.file_name !== 'Flag_of_the_Tangier_International_Zone.svg') return false;
          if (!flagSpa19 || !flagSpa19.asset.file_name.includes('1945')) return false;
          if (!flagFra19 || flagFra19.asset.file_name !== 'Flag_of_France.svg') return false;

          return true;

        },

      },

      {

        name: 'Test 114: Audit Geostorico Integrale per Provincia d\'Italia su Tutti i 20 Step (GEN 1936 – SET 1947: 107 NUTS-3, 8 Territori Storici & Bandiere Anti-Anacronismo)',

        run: () => {

          const metropolitanIds = Object.keys(IT_PROVINCES_META).filter(

            (k) => k.startsWith('IT') && !['IT_FIUME', 'IT_ZARA'].includes(k)

          );

          if (metropolitanIds.length !== 107) return false;



          // 1. Nessun nome/nota vuoti (compresa L'Aquila ITF11) e unicità delle note per provincia sugli step critici

          for (const step of [0, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]) {

            const notesSet = new Set<string>();

            for (const nuts of metropolitanIds) {

              const res = resolveFeature({ properties: { id: nuts, NUTS_ID: nuts, CNTR_CODE: 'IT', NAME_LATN: IT_PROVINCES_META[nuts].modernName || IT_PROVINCES_META[nuts].name } }, step);

              if (!res.name || !res.note || res.note.trim().length < 25) return false;

              notesSet.add(res.note);

            }

            if (notesSet.size < 95) return false;

          }



          // 2. Fix topologici chiave: Belluno (ITH33) in OZAV vs Rovigo (ITH37) in RSI (Step 13-16)

          const belluno13 = resolveFeature({ properties: { NUTS_ID: 'ITH33', CNTR_CODE: 'IT', NAME_LATN: 'Belluno' } }, 13);

          const rovigo13 = resolveFeature({ properties: { NUTS_ID: 'ITH37', CNTR_CODE: 'IT', NAME_LATN: 'Rovigo' } }, 13);

          const rovigo16 = resolveFeature({ properties: { NUTS_ID: 'ITH37', CNTR_CODE: 'IT', NAME_LATN: 'Rovigo' } }, 16);

          if (belluno13.o !== 'OZAV' || rovigo13.o !== 'RSI' || rovigo16.o !== 'RSI') return false;



          // 3. Linea di Liberazione giugno-agosto 1944: Grosseto (ITI1A) liberata 15 giugno; Lucca/Pistoia/Prato ancora RSI al 31 ago 1944

          const grosseto14 = resolveFeature({ properties: { NUTS_ID: 'ITI1A', CNTR_CODE: 'IT', NAME_LATN: 'Grosseto' } }, 14);

          const lucca15 = resolveFeature({ properties: { NUTS_ID: 'ITI12', CNTR_CODE: 'IT', NAME_LATN: 'Lucca' } }, 15);

          const lucca16 = resolveFeature({ properties: { NUTS_ID: 'ITI12', CNTR_CODE: 'IT', NAME_LATN: 'Lucca' } }, 16);

          if (grosseto14.o !== 'ITA' || grosseto14.fac !== 'Alleati' || !grosseto14.note.includes('15 giugno')) return false;

          if (lucca15.o !== 'RSI' || lucca16.o !== 'ITA' || !lucca15.note.includes('Stazzema')) return false;



          // 4. Primavera 1945 (Step 17): distinzione tra insurrezione CLNAI del Nord e Centro-Sud già liberato

          const napoli17 = resolveFeature({ properties: { NUTS_ID: 'ITF33', CNTR_CODE: 'IT', NAME_LATN: 'Napoli' } }, 17);

          const palermo17 = resolveFeature({ properties: { NUTS_ID: 'ITG12', CNTR_CODE: 'IT', NAME_LATN: 'Palermo' } }, 17);

          const genova17 = resolveFeature({ properties: { NUTS_ID: 'ITC33', CNTR_CODE: 'IT', NAME_LATN: 'Genova' } }, 17);

          if (napoli17.name.includes('25 Aprile') || palermo17.name.includes('25 Aprile')) return false;

          if (!genova17.name.includes('25 Aprile') || !genova17.note.includes('Meinhold')) return false;



          // 5. Trattati di Pace di Parigi 1947 (Step 19): Cuneo (Briga/Tenda), Torino (Moncenisio), Gorizia (Nova Gorica), Bolzano (De Gasperi-Gruber), Palermo (Portella della Ginestra)

          const cuneo19 = resolveFeature({ properties: { NUTS_ID: 'ITC16', CNTR_CODE: 'IT', NAME_LATN: 'Cuneo' } }, 19);

          const torino19 = resolveFeature({ properties: { NUTS_ID: 'ITC11', CNTR_CODE: 'IT', NAME_LATN: 'Torino' } }, 19);

          const bolzano19 = resolveFeature({ properties: { NUTS_ID: 'ITH10', CNTR_CODE: 'IT', NAME_LATN: 'Bolzano' } }, 19);

          const palermo19 = resolveFeature({ properties: { NUTS_ID: 'ITG12', CNTR_CODE: 'IT', NAME_LATN: 'Palermo' } }, 19);

          if (!cuneo19.note.includes('Briga') || !torino19.note.includes('Moncenisio')) return false;

          if (!bolzano19.note.includes('De Gasperi-Gruber') || !palermo19.note.includes('Portella della Ginestra')) return false;



          // 6. Vessillologia storica anti-anacronistica sull'intera timeline

          const fIta18 = resolveHistoricalFlag('ITA', 18);

          const fIta19 = resolveHistoricalFlag('ITA', 19);

          const fRsi13 = resolveHistoricalFlag('RSI', 13);

          const fRsi16 = resolveHistoricalFlag('RSI', 16);

          const fOzav15 = resolveHistoricalFlag('OZAV', 15);

          const fOzak16 = resolveHistoricalFlag('OZAK', 16);

          if (!fIta18 || fIta18.asset.file_name !== 'Flag_of_Italy_(1861-1946).svg') return false;

          if (!fIta19 || fIta19.asset.file_name !== 'Flag_of_Italy.svg') return false;

          if (!fRsi13 || !fRsi16 || fRsi16.asset.file_name !== 'Flag_of_the_Italian_Social_Republic.svg') return false;

          if (!fOzav15 || fOzav15.asset.file_name !== 'Flag_of_Germany_(1935–1945).svg') return false;

          if (!fOzak16 || fOzak16.asset.file_name !== 'Flag_of_Germany_(1935–1945).svg') return false;



          return true;

        },

      },

      {

        name: 'Test 115: Ripristino Integrale Zone di Occupazione della Germania (Step 18–19: Meclemburgo DE8* a SBZ/SOV, Berlino Partita, Württemberg-Baden USA sull\'A8, Lindau & GMZFO FRA, Brema USA, Bizona & Saar)',

        run: () => {

          const checkZone = (id: string, name: string, step: number, expectedO: string, expectedFac?: string) => {

            const res = resolveFeature({ properties: { id, NUTS_ID: id, CNTR_CODE: 'DE', NAME_LATN: name } }, step);

            if (res.o !== expectedO) return false;

            if (expectedFac && res.fac !== expectedFac) return false;

            return true;

          };

          // 1a. Meclemburgo-Pomerania Anteriore (DE8* -> SOV / SBZ, mai GER)
          for (const [id, nm] of [
            ['DE803', 'Rostock'],
            ['DE804', 'Schwerin'],
            ['DE80J', 'Mecklenburgische Seenplatte'],
            ['DE80K', 'Landkreis Rostock'],
            ['DE80L', 'Vorpommern-Rügen'],
            ['DE80M', 'Nordwestmecklenburg'],
            ['DE80N', 'Vorpommern-Greifswald'],
            ['DE80O', 'Ludwigslust-Parchim'],
          ]) {
            if (!checkZone(id, nm, 18, 'SOV', 'Comintern')) return false;
            if (!checkZone(id, nm, 19, 'SOV', 'Comintern')) return false;
          }

          // 1b. Berlino Partita (DE300_WEST Settori Occidentali vs DE300_EAST Settore Sovietico SOV)
          const berWest18 = resolveFeature({ properties: { id: 'DE300_WEST', NUTS_ID: 'DE300_WEST', CNTR_CODE: 'DE', NAME_LATN: 'Berlin (West)' } }, 18);
          const berEast18 = resolveFeature({ properties: { id: 'DE300_EAST', NUTS_ID: 'DE300_EAST', CNTR_CODE: 'DE', NAME_LATN: 'Berlin (Ost)' } }, 18);
          const berWest19 = resolveFeature({ properties: { id: 'DE300_WEST', NUTS_ID: 'DE300_WEST', CNTR_CODE: 'DE', NAME_LATN: 'Berlin (West)' } }, 19);
          const berEast19 = resolveFeature({ properties: { id: 'DE300_EAST', NUTS_ID: 'DE300_EAST', CNTR_CODE: 'DE', NAME_LATN: 'Berlin (Ost)' } }, 19);
          if (berWest18.o !== 'USA' || berWest18.fac !== 'Alleati' || !berWest18.name.includes('West-Berlin')) return false;
          if (berEast18.o !== 'SOV' || berEast18.fac !== 'Alleati' || !berEast18.name.includes('Ost-Berlin')) return false;
          if (berWest19.o !== 'USA' || berEast19.o !== 'SOV' || berEast19.fac !== 'Comintern') return false;

          // 1c. Baden-Württemberg storico lungo Autobahn A8: Württemberg-Baden (USA) vs Südbaden/Hohenzollern (FRA)
          for (const [id, nm] of [
            ['DE111', 'Stuttgart'],
            ['DE117', 'Heilbronn'],
            ['DE122', 'Karlsruhe'],
            ['DE125', 'Heidelberg'],
            ['DE126', 'Mannheim'],
            ['DE129', 'Pforzheim'],
            ['DE144', 'Ulm'],
            ['DE145', 'Alb-Donau-Kreis'],
          ]) {
            if (!checkZone(id, nm, 18, 'USA', 'Alleati')) return false;
            if (!checkZone(id, nm, 19, 'USA', 'Alleati')) return false;
          }
          for (const [id, nm] of [
            ['DE121', 'Baden-Baden'],
            ['DE124', 'Rastatt'],
            ['DE131', 'Freiburg im Breisgau'],
            ['DE138', 'Konstanz'],
            ['DE142', 'Tübingen'],
            ['DE149', 'Sigmaringen'],
            ['DE27A', 'Lindau (Bodensee)'],
          ]) {
            if (!checkZone(id, nm, 18, 'FRA', 'Alleati')) return false;
            if (!checkZone(id, nm, 19, 'FRA', 'Alleati')) return false;
          }

          // 1d. Step 19 (SET 1947): Bizona (UK + USA), GMZFO (FRA), Protettorato della Saar (SAAR) e SBZ (SOV)
          if (!checkZone('DE600', 'Hamburg', 19, 'UK', 'Alleati')) return false;
          if (!checkZone('DEA13', 'Essen', 19, 'UK', 'Alleati')) return false;
          if (!checkZone('DEF02', 'Kiel', 19, 'UK', 'Alleati')) return false;
          if (!checkZone('DE929', 'Region Hannover', 19, 'UK', 'Alleati')) return false;
          if (!checkZone('DE501', 'Bremen', 19, 'USA', 'Alleati')) return false;
          if (!checkZone('DE502', 'Bremerhaven', 19, 'USA', 'Alleati')) return false;
          if (!checkZone('DE712', 'Frankfurt am Main', 19, 'USA', 'Alleati')) return false;
          if (!checkZone('DE212', 'München', 19, 'USA', 'Alleati')) return false;
          if (!checkZone('DED21', 'Dresden', 19, 'SOV', 'Comintern')) return false;
          if (!checkZone('DEE03', 'Magdeburg', 19, 'SOV', 'Comintern')) return false;
          if (!checkZone('DEG01', 'Erfurt', 19, 'SOV', 'Comintern')) return false;
          if (!checkZone('DE404', 'Potsdam', 19, 'SOV', 'Comintern')) return false;
          if (!checkZone('DE_HIST_KONIGSBERG', 'Königsberg', 19, 'SOV', 'Comintern')) return false;
          if (!checkZone('DEB25', 'Trier-Saarburg', 19, 'FRA', 'Alleati')) return false;
          if (!checkZone('DEC01', 'Saarbrücken', 19, 'SAAR', 'Neutrale')) return false;
          if (!resolveFeature({ properties: { NUTS_ID: 'DE600', CNTR_CODE: 'DE', NAME_LATN: 'Hamburg' } }, 19).note.includes('Bizona')) return false;
          if (!resolveFeature({ properties: { NUTS_ID: 'DE712', CNTR_CODE: 'DE', NAME_LATN: 'Frankfurt am Main' } }, 19).note.includes('Bizona')) return false;

          // 1e. Nessun distretto tedesco caricato rimane 'GER' a Step 18 o Step 19
          for (const ft of loadedProvs) {
            const p = ft.properties || {};
            const cid = String(ft.id || p.NUTS_ID || p.id || '');
            if (p.CNTR_CODE === 'DE' || cid.startsWith('DE')) {
              for (const s of [18, 19]) {
                if (resolveFeature(ft, s).o === 'GER') return false;
              }
            }
          }

          // 2. Bandiere C-Pennant (ACC) per Germania occupata & Bandiera Saar (Step 18-19)
          const accFlag18 = resolveHistoricalFlag('ACC', 18);
          const accFlag19 = resolveHistoricalFlag('ACC', 19);
          const saarFlag19 = resolveHistoricalFlag('SAAR', 19);
          if (!accFlag18 || !accFlag19 || accFlag18.asset.file_name !== 'Merchant_flag_of_Germany_(1946–1949).svg') return false;
          if (!saarFlag19 || saarFlag19.asset.file_name !== 'Flag_of_Saar_(1947–1956).svg') return false;

          return true;

        },

      },

      {

        name: 'Test 116: Audit Zero Overlapping & Topologia Watertight della Libia (Esclusione HB_LIBYA, 22 Province Storiche e Step 18–19)',

        run: () => {

          // 1. La feature duplicata paese HB_LIBYA non deve essere presente nei layer caricati (zero overlap)

          if (loadedHbs.some((f: any) => f.id === 'HB_LIBYA') || loadedProvs.some((f: any) => f.id === 'HB_LIBYA')) {

            return false;

          }

          // 2. Esatta presenza di tutte le 22 province storiche della Libia (Tripolitania, Cirenaica, Fezzan)

          const lyProvs = loadedProvs.filter((f: any) => f.properties?.CNTR_CODE === 'LY' || String(f.id || '').startsWith('LY'));

          if (loadedProvs.length > 0 && lyProvs.length !== 22) return false;

          // 3. Partizione postbellica a Step 18–19: BMA Tripolitania/Cirenaica (UK) vs Territorio Militare del Fezzan (FRA)

          const tripoli19 = resolveFeature({ id: 'LYTB', properties: { id: 'LYTB', CNTR_CODE: 'LY', NAME_LATN: 'Tripoli' } }, 19);

          const bengasi19 = resolveFeature({ id: 'LYBA', properties: { id: 'LYBA', CNTR_CODE: 'LY', NAME_LATN: 'Benghazi' } }, 19);

          const sebha19 = resolveFeature({ id: 'LYSB', properties: { id: 'LYSB', CNTR_CODE: 'LY', NAME_LATN: 'Sebha' } }, 19);

          const murzuch19 = resolveFeature({ id: 'LYMQ', properties: { id: 'LYMQ', CNTR_CODE: 'LY', NAME_LATN: 'Murzuk' } }, 19);

          if (tripoli19.o !== 'UK' || bengasi19.o !== 'UK' || sebha19.o !== 'FRA' || murzuch19.o !== 'FRA') return false;

          return true;

        },

      },

      {

        name: 'Test 117: Sud-Est Asiatico & Pacifico Occidentale (Step 18–19 — Rimozione Occupazioni Giapponesi 1945/1947, Thailandia Neutrale, Interzona V, Micronesia & Bandiere)',

        run: () => {

          // 1. Nessuna occupazione militare giapponese o fazione Asse residua nei confini storici (hb) a Step 18 e 19

          const hbNames = [

            'Brunei',

            'Sarawak',

            'Guam',

            'Wake Island',

            'Saipan',

            'South Seas Mandate (Japan)',

            'Gilbert and Elice Islands',

            'Nauru',

            'Hong Kong',

            'Singapore',

            'British Malaya',

            'Dutch East Indies',

            'Portuguese Timor',

            'Philippines',

            'French Indochina',

            'Solomon Islands (UK)',

          ];

          for (const s of [18, 19]) {

            for (const name of hbNames) {

              const res = resolveHB({ properties: { NAME: name } }, s);

              if (res.o === 'JAP' || res.fac === 'Asse') return false;

              if (name === 'Solomon Islands (UK)' && (res.name.includes('1943') || res.name.includes('Cartwheel'))) return false;

            }

            // Aleutine (Attu) già liberate dagli USA dallo Step 12

            const attu = resolveHB({ properties: { NAME: 'Attu Island', SUBJECTO: 'United States' } }, s);

            const attuProv = resolveFeature({ id: 'US_AK_ALEUTIANS_WEST', properties: { id: 'US_AK_ALEUTIANS_WEST', CNTR_CODE: 'US', NAME: 'Attu & Kiska (Western Aleutian Islands)' } }, s);

            if (attu.o !== 'USA' || attu.fac !== 'Alleati' || attuProv.o !== 'USA' || attuProv.fac !== 'Alleati') return false;

          }

          // 2. Thailandia (SIA): alleanza bellica a Step 9..17 -> Neutrale Seri Thai (Step 18) e Post-Trattato di Washington / ONU (Step 19)

          const siam18 = resolveHB({ properties: { NAME: 'Siam' } }, 18);

          const siam19hb = resolveHB({ properties: { NAME: 'Siam' } }, 19);

          const siam19prov = resolveFeature({ properties: { CNTR_CODE: 'TH', NAME_LATN: 'Thailand' } }, 19);

          if (siam18.o !== 'SIA' || siam18.fac !== 'Neutrale') return false;

          if (siam19hb.o !== 'SIA' || siam19hb.fac !== 'Neutrale') return false;

          if (siam19prov.o !== 'SIA' || siam19prov.fac !== 'Neutrale') return false;

          // 3. Province critiche Step 18–19: Gilbert (UK), Nauru (AST), Wake (USA), Shan Burma (UK senza Armata Giapponese), Giappone 1947 (Nihon-koku), PNG 1947 (post-ANGAU), Timor 1947 (POR), Interzona V Vietnam (VIE)

          const gilbert19 = resolveFeature({ id: 'KI_GILBERT', properties: { id: 'KI_GILBERT', CNTR_CODE: 'KI', NAME_LATN: 'Gilbert Islands' } }, 19);

          const nauru19 = resolveFeature({ id: 'NR_NAURU', properties: { id: 'NR_NAURU', CNTR_CODE: 'NR', NAME_LATN: 'Nauru' } }, 19);

          const wake19 = resolveFeature({ id: 'UM_WAKE', properties: { id: 'UM_WAKE', CNTR_CODE: 'UM', NAME_LATN: 'Wake Island' } }, 19);

          const shan18 = resolveFeature({ id: 'MM_SHA', properties: { id: 'MM_SHA', CNTR_CODE: 'MM', NAME_LATN: 'Shan State' } }, 18);

          const tokyo19 = resolveFeature({ id: 'JP13', properties: { id: 'JP13', CNTR_CODE: 'JP', NAME_LATN: 'Tokyo' } }, 19);

          const boug19 = resolveFeature({ id: 'PGNSB', properties: { id: 'PGNSB', CNTR_CODE: 'PG', NAME_LATN: 'Bougainville' } }, 19);

          const timor19 = resolveFeature({ id: 'TLS', properties: { id: 'TLS', CNTR_CODE: 'TL', NAME_LATN: 'Timor-Leste' } }, 19);

          const binhDinh19 = resolveFeature({ id: 'VN31', properties: { id: 'VN31', CNTR_CODE: 'VN', NAME_LATN: 'Binh Dinh' } }, 19);

          const hue19 = resolveFeature({ id: 'VN26', properties: { id: 'VN26', CNTR_CODE: 'VN', NAME_LATN: 'Thua Thien Hue' } }, 19);

          if (gilbert19.o !== 'UK' || nauru19.o !== 'AST' || wake19.o !== 'USA') return false;

          if (shan18.o !== 'UK' || shan18.fac !== 'Alleati' || shan18.adminEntity?.includes('Armata Regionale Birmana')) return false;

          if (tokyo19.o !== 'JAP' || tokyo19.fac !== 'Alleati' || !tokyo19.name.includes('Nihon-koku')) return false;

          if (boug19.o !== 'AST' || boug19.adminEntity?.includes('ANGAU')) return false;

          if (timor19.o !== 'POR' || timor19.fac !== 'Neutrale' || timor19.name.includes('1945')) return false;

          if (binhDinh19.o !== 'VIE' || hue19.o !== 'FRA') return false;

          // 4. Bandiere storiche al SET 1947 (Step 19)

          if (resolveHistoricalFlag('SIA', 19)?.asset.file_name !== 'Flag_of_Thailand.svg') return false;

          if (resolveHistoricalFlag('POR', 19)?.asset.file_name !== 'Flag_of_Portugal.svg') return false;

          if (resolveHistoricalFlag('AST', 19)?.asset.file_name !== 'Flag_of_Australia.svg') return false;

          if (resolveHistoricalFlag('JAP', 19)?.asset.file_name !== 'Flag_of_Japan.svg') return false;

          if (resolveHistoricalFlag('PHL', 19)?.asset.file_name !== 'Flag_of_the_Philippines.svg') return false;

          if (resolveHistoricalFlag('VIE', 19)?.asset.file_name !== 'Flag_of_North_Vietnam_(1945-1955).svg') return false;

          if (resolveHistoricalFlag('IDN', 19)?.asset.file_name !== 'Flag_of_Indonesia.svg') return false;

          return true;

        },

      },

      {

        name: 'Test 118: Aggiornamento Integrale di Tutti i Layer Tattici lungo la Timeline (Steps 0–19: Fortificazioni, Basi Navali, Rotte Marittime, Battaglie, Città e Nuclei Isole)',

        run: () => {

          // 1. Ogni step della timeline (0..19) deve avere battaglie e linee di demarcazione/fortificazione coerenti e nessun ID battaglia duplicato

          const battleIds = new Set<string>();

          for (const b of HISTORICAL_BATTLES) {

            if (battleIds.has(b.id)) return false;

            battleIds.add(b.id);

          }

          for (let s = 0; s < STEPS.length; s++) {

            if (HISTORICAL_BATTLES.filter((b) => b.step === s).length < 3) return false;

            if (HISTORICAL_FORTIFICATION_LINES.filter((fl) => fl.activeSteps.includes(s)).length === 0) return false;

            if (HISTORICAL_SEA_LANES.filter((sl) => !sl.activeSteps || sl.activeSteps.includes(s)).length === 0) return false;

          }

          // 2. Step 19 (1947): presenza di crisi globali europee/asiatiche/mediorientali e linee postbelliche dedicate

          const b19Ids = new Set(HISTORICAL_BATTLES.filter((b) => b.step === 19).map((b) => b.id));

          if (!b19Ids.has('paris_peace_treaties_trieste_1947') || !b19Ids.has('greek_civil_war_truman_1947') || !b19Ids.has('punjab_kashmir_partition_1947') || !b19Ids.has('unscop_palestine_1947')) return false;

          const f19Ids = new Set(HISTORICAL_FORTIFICATION_LINES.filter((fl) => fl.activeSteps.includes(19)).map((fl) => fl.id));

          if (!f19Ids.has('oder_neisse_line_1945') || !f19Ids.has('ftt_trieste_line_1947') || !f19Ids.has('korea_38th_parallel_1945') || !f19Ids.has('van_mook_line_1947') || !f19Ids.has('radcliffe_kashmir_line_1947')) return false;

          if (f19Ids.has('morgan_line_1945')) return false;

          // 3. Basi Navali (Steps 18 & 19): nessuna base ex-alleata/liberata ancora sotto Kriegsmarine, OZAK o Marina Imperiale Giapponese

          const liberatedBases = ['singapore', 'saigon_naval', 'hong_kong_naval', 'cavite_manila', 'lorient', 'brest', 'cherbourg', 'toulon', 'den_helder', 'rotterdam_hoek', 'copenhagen_holmen_base', 'bergen_naval_base', 'narvik_naval_base', 'horten_karljohansvern_base', 'pola_naval', 'leros_aegean', 'wilhelmshaven', 'kiel', 'helgoland', 'swinemunde', 'kure', 'yokosuka', 'ryojun_naval'];

          for (const s of [18, 19]) {

            for (const bid of liberatedBases) {

              const bObj = HISTORICAL_NAVAL_BASES.find((nb) => nb.id === bid);

              if (!bObj) return false;

              const st = getDynamicNavalBaseStatus(bObj, s);

              if (st.nation.includes('Kriegsmarine') || st.nation.includes('Marina Imperiale') || st.nation.includes('Giappone') || st.nation.includes('OZAK') || st.nation.includes('Wehrmacht')) return false;

            }

          }

          const pola18 = getDynamicNavalBaseStatus(HISTORICAL_NAVAL_BASES.find((nb) => nb.id === 'pola_naval')!, 18);

          const pola19 = getDynamicNavalBaseStatus(HISTORICAL_NAVAL_BASES.find((nb) => nb.id === 'pola_naval')!, 19);

          const leros19 = getDynamicNavalBaseStatus(HISTORICAL_NAVAL_BASES.find((nb) => nb.id === 'leros_aegean')!, 19);

          const ryojun18 = getDynamicNavalBaseStatus(HISTORICAL_NAVAL_BASES.find((nb) => nb.id === 'ryojun_naval')!, 18);

          if (!pola18.nation.includes('AMG') || !pola19.nation.includes('Jugoslavia') || !leros19.nation.includes('Grecia') || !ryojun18.nation.includes('URSS')) return false;

          // 4. Rotte Marittime (Steps 14–19): rotte alleate attive e non più contestate nel dopoguerra (Steps 18–19); rotte belliche chiuse

          for (const laneId of ['north_atlantic_convoy', 'mediterranean_suez_lifeline', 'cape_route', 'transpacific_us_hawaii']) {

            const lane = HISTORICAL_SEA_LANES.find((l) => l.id === laneId);

            if (!lane || !lane.activeSteps?.includes(14) || !lane.activeSteps?.includes(19)) return false;

            if (laneId !== 'cape_route' && (getDynamicSeaLaneStatus(lane, 18).isContested || getDynamicSeaLaneStatus(lane, 19).isContested)) return false;

          }

          const s19Lanes = new Set(HISTORICAL_SEA_LANES.filter((l) => !l.activeSteps || l.activeSteps.includes(19)).map((l) => l.id));

          if (s19Lanes.has('pacific_singapore_tokyo') || s19Lanes.has('arctic_convoys') || s19Lanes.has('axis_libya_convoy') || s19Lanes.has('persian_corridor_sealane')) return false;

          // 5. Nuclei Luminosi Isole (islandBeacons) al 1945–1947: nessuna etichetta JAP o VIC anacronistica

          for (const s of [18, 19]) {

            if (getStrategicIslandLabel('WK_WAKE', s) !== 'Wake (USA)') return false;

            if (getStrategicIslandLabel('KI_GILBERT', s) !== 'Gilbert (UK)') return false;

            if (getStrategicIslandLabel('NR_NAURU', s) !== 'Nauru (AUS)') return false;

            if (getStrategicIslandLabel('GU_GUAM', s) !== 'Guam (USA)') return false;

            if (getStrategicIslandLabel('US_AK_ALEUTIANS_WEST', s) !== 'Attu & Kiska (USA)') return false;

            if (getStrategicIslandLabel('RE_REUNION', s) !== 'La Réunion (FRA)' || getStrategicIslandLabel('KM_COMOROS', s) !== 'Comore (FRA)') return false;

          }

          return true;

        },

      },

      {

        name: '119. Ammodernamento Province Britanniche & Crown Dependencies nelle Ultime Tabbe della Timeline (Steps 9–19: Overlord/SHAEF/Bletchley/V-1/V-2, Liberazione Channel Islands 9 Maggio 1945, Governo Attlee, NCB/NHS/New Towns/Nucleare 1947, Malta & Gibilterra)',

        run: () => {

          // 1. Governo Attlee in owners.ts e continuità bandiera UK senza anacronismi

          if (!getOwnerMeta('UK').l(17).includes('Churchill')) return false;

          if (!getOwnerMeta('UK').l(18).includes('Attlee') || !getOwnerMeta('UK').l(19).includes('Attlee')) return false;

          const flag19 = resolveHistoricalFlag('UK', '1947-09-30');

          if (!flag19 || flag19.asset?.file_name !== 'Flag_of_the_United_Kingdom.svg') return false;



          // 2. Crown Dependencies (GG/JE liberate il 9 maggio 1945 -> GER fino a Step 17, UK da Step 18–19; IM sempre UK con TT 1947)

          const gg17 = resolveFeature({ id: 'GG', properties: { CNTR_CODE: 'GG', NUTS_ID: 'GG', NAME: 'Guernsey' } }, 17);

          const je17 = resolveFeature({ id: 'JE', properties: { CNTR_CODE: 'JE', NUTS_ID: 'JE', NAME: 'Jersey' } }, 17);

          const gg18 = resolveFeature({ id: 'GG', properties: { CNTR_CODE: 'GG', NUTS_ID: 'GG', NAME: 'Guernsey' } }, 18);

          const je19 = resolveFeature({ id: 'JE', properties: { CNTR_CODE: 'JE', NUTS_ID: 'JE', NAME: 'Jersey' } }, 19);

          const im19 = resolveFeature({ id: 'IM', properties: { CNTR_CODE: 'IM', NUTS_ID: 'IM', NAME: 'Isle of Man' } }, 19);

          if (!gg17 || gg17.o !== 'GER' || gg17.fac !== 'Asse' || !gg17.note?.includes('Starvation Winter')) return false;

          if (!je17 || je17.o !== 'GER' || je17.fac !== 'Asse') return false;

          if (!gg18 || gg18.o !== 'UK' || gg18.fac !== 'Alleati' || !gg18.note?.includes('9 maggio 1945')) return false;

          if (!je19 || je19.o !== 'UK' || je19.fac !== 'Alleati' || !je19.note?.includes('Stati di Jersey')) return false;

          if (!im19 || im19.o !== 'UK' || !im19.name.includes('Tourist Trophy 1947')) return false;



          // 3. Verifica che TUTTI i 179 distretti NUTS-3 evolvano oltre Step 8 agli Step 14, 18 e 19

          const ukProvs = loadedProvs.filter((f: any) => f.properties?.CNTR_CODE === 'UK' && f.id && String(f.id).length === 5);

          if (ukProvs.length !== 179) return false;

          for (const feat of ukProvs) {

            const r8 = resolveFeature(feat, 8);

            const r14 = resolveFeature(feat, 14);

            const r18 = resolveFeature(feat, 18);

            const r19 = resolveFeature(feat, 19);

            if (!r8 || !r14 || !r18 || !r19) return false;

            if (r18.o !== 'UK' || r19.o !== 'UK') return false;

            if (!r18.adminEntity?.includes('Attlee') || !r19.adminEntity?.includes('Attlee')) return false;

            if (r18.note === r8.note || r19.note === r18.note) return false;

          }



          // 4. Campioni strategici Overlord / V-1 & V-2 / Attlee 1945 / Welfare, Carbone & Nucleare 1947

          const hamp14 = resolveUKProvince('UKJ36', 14);

          const port14 = resolveUKProvince('UKJ31', 14);

          const iow14 = resolveUKProvince('UKJ34', 14);

          const bletch14 = resolveUKProvince('UKJ12', 14);

          const brom16 = resolveUKProvince('UKI61', 16);

          const clyde16 = resolveUKProvince('UKM81', 16);

          const west18 = resolveUKProvince('UKI32', 18);

          const brum18 = resolveUKProvince('UKG31', 18);

          const derry18 = resolveUKProvince('UKN0A', 18);

          const oxf19 = resolveUKProvince('UKJ14', 19);

          const cumb19 = resolveUKProvince('UKD11', 19);

          const syork19 = resolveUKProvince('UKE31', 19);

          const gwent19 = resolveUKProvince('UKL16', 19);

          const herts19 = resolveUKProvince('UKH23', 19);

          const edin19 = resolveUKProvince('UKM75', 19);



          if (!hamp14 || !hamp14.note?.includes('Southwick House') || !hamp14.note?.includes('SHAEF')) return false;

          if (!port14 || !port14.note?.includes('Overlord')) return false;

          if (!iow14 || !iow14.note?.includes('PLUTO')) return false;

          if (!bletch14 || !bletch14.note?.includes('Colossus')) return false;

          if (!brom16 || !brom16.note?.includes('Orpington') || !brom16.note?.includes('V-2')) return false;

          if (!clyde16 || !clyde16.note?.includes('HMS Vanguard')) return false;

          if (!west18 || !west18.note?.includes('Clement Attlee')) return false;

          if (!brum18 || !brum18.note?.includes('Spitfire')) return false;

          if (!derry18 || !derry18.note?.includes('Lisahally') || !derry18.note?.includes('U-Boot')) return false;

          if (!oxf19 || !oxf19.note?.includes('Harwell') || !oxf19.note?.includes('GLEEP')) return false;

          if (!cumb19 || !cumb19.note?.includes('Windscale')) return false;

          if (!syork19 || !syork19.note?.includes('National Coal Board')) return false;

          if (!gwent19 || !gwent19.note?.includes('Bevan') || !gwent19.note?.includes('National Health Service')) return false;

          if (!herts19 || !herts19.note?.includes('Stevenage')) return false;

          if (!edin19 || !edin19.note?.includes('Edinburgh International Festival')) return false;



          // 5. Malta & Gibilterra nelle tabbe postbelliche

          const gib19 = resolveFeature({ id: 'GIB_HIST', properties: { CNTR_CODE: 'GI', NAME: 'Gibraltar' } }, 19);

          const malta19 = getExtendedToponym('Malta', 'UK', 'MT001', undefined, 19);

          if (!gib19 || !gib19.note?.includes('1947')) return false;

          if (!malta19 || !malta19.name.includes('MacMichael') || !malta19.note?.includes('1947')) return false;



          return true;

        },

      },

      {

        name: '120. Copertura Integrale della Guerra Civile Greca (1943–1947: PEEA Prima Fase, Dekemvriana Dic 1944, Varkiza/Terrore Bianco 1945, DSE Grammos-Vitsi-Pindo-Agrafa vs Regno di Grecia/Dottrina Truman 1947 & Bandiere ELAS/DSE)',

        run: () => {

          // 1. Entità canoniche GRE & DSE e verifica anti-anacronismo bandiere ELAS (1944) vs DSE (1946–1947)

          const metaGre19 = getOwnerMeta('GRE');

          const metaDse = getOwnerMeta('DSE');

          if (!metaGre19.l(19).includes('Dottrina Truman') || !metaDse.l(19).includes('Grammos') || !metaDse.l(16).includes('Dekemvriana')) return false;

          if (metaDse.c === metaGre19.c) return false;

          const flagElas16 = resolveHistoricalFlag('DSE', 16);

          const flagDse19 = resolveHistoricalFlag('DSE', 19);

          if (!flagElas16 || flagElas16.asset.file_name !== 'ELAS_flag.svg') return false;

          if (!flagDse19 || flagDse19.asset.file_name !== 'Flag_of_the_Democratic_Army_of_Greece.svg') return false;

          if (!getCountryFlagSvg('DSE', 16).includes('ΕΛΑΣ') || !getCountryFlagSvg('DSE', 19).includes('Δ')) return false;

          if (!getCountryFlagSvg('GRE', 19).includes('data:image/png;base64')) return false;



          // 2. Copertura integrale delle 52 province NUTS-3 greche nel GeoDB

          const elProvs = loadedProvs.filter((f: any) => String(f.id || '').startsWith('EL'));

          if (elProvs.length !== 52) return false;



          // 3. Prima Fase & PEEA (Step 14): Evritania (Viniani PEEA) e Epiro (ELAS vs EDES) con contesto civile sotto occupazione Wehrmacht

          const evryt14 = resolveFeature({ id: 'EL643', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL643', NAME: 'Evrytania' } }, 14);

          const ioan14 = resolveFeature({ id: 'EL543', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL543', NAME: 'Ioannina' } }, 14);

          if (!evryt14 || evryt14.o !== 'GER' || !evryt14.note?.includes('PEEA')) return false;

          if (!ioan14 || ioan14.o !== 'GER' || !ioan14.note?.includes('EDES')) return false;



          // 4. Seconda Fase — Dekemvriana (Step 16 DIC 1944): Atene/Salonicco/Patrasso/Isole GRE vs Entroterra ELAS (DSE) & Creta GER

          const athNorth16 = resolveFeature({ id: 'EL301', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL301', NAME: 'Athens' } }, 16);

          const athCtr16 = resolveFeature({ id: 'EL303', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL303', NAME: 'Athina' } }, 16);

          const sal16 = resolveFeature({ id: 'EL522', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL522', NAME: 'Thessaloniki' } }, 16);

          const corfu16 = resolveFeature({ id: 'EL622', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL622', NAME: 'Kerkyra' } }, 16);

          const thessaly16 = resolveFeature({ id: 'EL611', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL611', NAME: 'Trikala' } }, 16);

          const gram16 = resolveFeature({ id: 'EL532', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL532', NAME: 'Kastoria' } }, 16);

          const epirus16 = resolveFeature({ id: 'EL543', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL543', NAME: 'Ioannina' } }, 16);

          const crete16 = resolveFeature({ id: 'EL431', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL431', NAME: 'Irakleio' } }, 16);

          if (athNorth16.o !== 'GRE' || athNorth16.fac !== 'Alleati') return false;

          if (athCtr16.o !== 'GRE' || !athCtr16.note?.includes('DEKEMVRIANA') || !athCtr16.note?.includes('Scobie')) return false;

          if (sal16.o !== 'GRE' || corfu16.o !== 'GRE' || crete16.o !== 'GER') return false;

          if (thessaly16.o !== 'DSE' || thessaly16.fac !== 'Comintern' || !thessaly16.note?.includes('ELAS')) return false;

          if (gram16.o !== 'DSE' || epirus16.o !== 'DSE' || !epirus16.note?.includes('EDES')) return false;



          // 5. Varkiza & Terrore Bianco (Step 17–18): riunificazione formale GRE, Creta liberata a Step 18, Dodecaneso UK BMA

          const thessaly17 = resolveFeature({ id: 'EL611', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL611', NAME: 'Trikala' } }, 17);

          const pelop18 = resolveFeature({ id: 'EL653', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL653', NAME: 'Lakonia' } }, 18);

          const crete18 = resolveFeature({ id: 'EL431', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL431', NAME: 'Irakleio' } }, 18);

          if (thessaly17.o !== 'GRE' || !thessaly17.note?.includes('Varkiza')) return false;

          if (pelop18.o !== 'GRE' || !pelop18.note?.includes('Terrore Bianco')) return false;

          if (crete18.o !== 'GRE' || !crete18.note?.includes('Callander')) return false;



          // 6. Terza Fase — Guerra Civile Greca (Step 19 SET 1947): Bastioni DSE (Grammos, Vitsi, Pindo, Agrafa) vs Regno di Grecia / AMAG

          const gram19 = resolveFeature({ id: 'EL532', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL532', NAME: 'Kastoria' } }, 19);

          const vitsi19 = resolveFeature({ id: 'EL533', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL533', NAME: 'Florina' } }, 19);

          const pindus19 = resolveFeature({ id: 'EL531', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL531', NAME: 'Grevena' } }, 19);

          const agrafa19 = resolveFeature({ id: 'EL643', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL643', NAME: 'Evrytania' } }, 19);

          const ath19 = resolveFeature({ id: 'EL303', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL303', NAME: 'Athina' } }, 19);

          const konitsa19 = resolveFeature({ id: 'EL543', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL543', NAME: 'Ioannina' } }, 19);

          const olympus19 = resolveFeature({ id: 'EL525', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL525', NAME: 'Pieria' } }, 19);

          const rodos19 = resolveFeature({ id: 'EL421', properties: { CNTR_CODE: 'EL', NUTS_ID: 'EL421', NAME: 'Rodos' } }, 19);



          if (gram19.o !== 'DSE' || gram19.fac !== 'Comintern' || !gram19.note?.includes('Grammos')) return false;

          if (vitsi19.o !== 'DSE' || vitsi19.fac !== 'Comintern' || !vitsi19.note?.includes('Vitsi')) return false;

          if (pindus19.o !== 'DSE' || agrafa19.o !== 'DSE') return false;

          if (ath19.o !== 'GRE' || ath19.fac !== 'Alleati' || !ath19.note?.includes('Truman') || !ath19.adminEntity?.includes('Paolo I')) return false;

          if (konitsa19.o !== 'GRE' || !konitsa19.note?.includes('Konitsa')) return false;

          if (olympus19.o !== 'GRE' || !olympus19.note?.includes('Litochoro')) return false;

          if (rodos19.o !== 'GRE') return false;



          // 7. Layer Tattici: Battaglie e Linee di Fronte (Step 16 & 19)

          const dekBat = HISTORICAL_BATTLES.find((b) => b.id === 'dekemvriana_battle_of_athens_1944');

          const trumanBat = HISTORICAL_BATTLES.find((b) => b.id === 'greek_civil_war_truman_1947');

          const termBat = HISTORICAL_BATTLES.find((b) => b.id === 'operation_terminus_peloponnese_dse_1947');

          const dekLine = HISTORICAL_FORTIFICATION_LINES.find((l) => l.id === 'dekemvriana_athens_perimeter_1944');

          const gvLine = HISTORICAL_FORTIFICATION_LINES.find((l) => l.id === 'grammos_vitsi_civil_war_front_1947');

          if (!dekBat || dekBat.step !== 16 || !trumanBat || trumanBat.step !== 19 || !termBat || termBat.step !== 19) return false;

          if (!dekLine || !dekLine.activeSteps.includes(16) || !gvLine || !gvLine.activeSteps.includes(19)) return false;

          return true;

        },

      },

      {

        name: '121. Approfondimento Storico Provincia per Provincia della Francia nelle Ultime Tappe (Steps 9–19: 96 Dipartimenti Metropolitani + 5 DOM-TOM + Guiana, Corsica, Overlord, Dragoon, Colmar/Tasche Atlantiche, GPRF 1945 & Quatrième République / Plan Monnet / Briga-Tenda 1947)',

        run: () => {

          // 1. Governo Quatrième République in owners.ts & continuità bandiera FRA 1947 senza anacronismi

          if (!getOwnerMeta('FRA').l(19).includes('Quatrième République') || !getOwnerMeta('FRA').l(19).includes('Ramadier')) return false;

          const flag19 = resolveHistoricalFlag('FRA', '1947-09-30');

          if (!flag19 || flag19.asset?.file_name !== 'Flag_of_France.svg') return false;



          // 2. Verifica su TUTTI i 96 dipartimenti NUTS-3 metropolitani nel GeoDB + assenza boilerplate unico

          const frMetroProvs = loadedProvs.filter((f: any) => {

            const fid = String(f.id || f.properties?.NUTS_ID || '');

            return f.properties?.CNTR_CODE === 'FR' && fid.startsWith('FR') && fid !== 'FR_HIST_GUIANA' && !fid.startsWith('FRY');

          });

          if (frMetroProvs.length !== 96) return false;

          const notes14 = new Set<string>();

          const notes15 = new Set<string>();

          const notes18 = new Set<string>();

          const notes19 = new Set<string>();

          for (const feat of frMetroProvs) {

            const r14 = resolveFeature(feat, 14);

            const r15 = resolveFeature(feat, 15);

            const r18 = resolveFeature(feat, 18);

            const r19 = resolveFeature(feat, 19);

            if (!r14?.note || !r15?.note || !r18?.note || !r19?.note) return false;

            if (r18.o !== 'FRA' || r18.fac !== 'Alleati' || !r18.adminEntity?.includes('GPRF')) return false;

            if (r19.o !== 'FRA' || r19.fac !== 'Alleati' || !r19.adminEntity?.includes('Quatrième République')) return false;

            if (r19.note === r18.note || r18.note === r15.note) return false;

            notes14.add(r14.note);

            notes15.add(r15.note);

            notes18.add(r18.note);

            notes19.add(r19.note);

          }

          if (notes14.size < 90 || notes15.size < 90 || notes18.size !== 96 || notes19.size !== 96) return false;



          // 3. Fasi storiche mirate Steps 11–19 su dipartimenti chiave

          // Step 11 (Nov 1942 Anton) & Step 13 (Set 1943 Achse & Liberazione Corsica)

          const corsica13 = resolveFranceProvince('FRM01', 13);

          const isere13 = resolveFranceProvince('FRK24', 13);

          const nice13 = resolveFranceProvince('FRL03', 13);

          if (!corsica13 || corsica13.o !== 'FRA' || !corsica13.note?.includes('Casabianca')) return false;

          if (!isere13 || isere13.o !== 'GER' || !isere13.note?.includes('Vercors')) return false;

          if (!nice13 || nice13.o !== 'GER' || !nice13.note?.includes('Brunner')) return false;



          // Step 14 (Giu 1944 Overlord, USS Corsica, Maquis Vercors & Oradour-sur-Glane)

          const calv14 = resolveFranceProvince('FRD11', 14);

          const manc14 = resolveFranceProvince('FRD12', 14);

          const corsica14 = resolveFranceProvince('FRM01', 14);

          const oradour14 = resolveFranceProvince('FRI23', 14);

          if (!calv14 || calv14.o !== 'UK' || !calv14.note?.includes('Bayeux')) return false;

          if (!manc14 || manc14.o !== 'USA' || !manc14.note?.includes('Cherbourg')) return false;

          if (!corsica14 || corsica14.o !== 'FRA' || !corsica14.note?.includes('USS Corsica')) return false;

          if (!oradour14 || oradour14.o !== 'GER' || !oradour14.note?.includes('Oradour')) return false;



          // Step 15 (Ago–Set 1944 Liberazione Parigi, Dragoon Marsiglia/Tolone, Sacche & Alsazia ancora tedesca)

          const paris15 = resolveFranceProvince('FR101', 15);

          const mars15 = resolveFranceProvince('FRL04', 15);

          const toul15 = resolveFranceProvince('FRL05', 15);

          const basRhin15 = resolveFranceProvince('FRF11', 15);

          if (!paris15 || paris15.o !== 'FRA' || !paris15.note?.includes('Leclerc') || !paris15.note?.includes('Choltitz')) return false;

          if (!mars15 || mars15.o !== 'FRA' || !mars15.note?.includes('Dragoon')) return false;

          if (!toul15 || toul15.o !== 'FRA' || !toul15.note?.includes('Dragoon')) return false;

          if (!basRhin15 || basRhin15.o !== 'GER' || basRhin15.fac !== 'Asse') return false;



          // Step 16 (Dic 1944 Sacca di Colmar vs Strasburgo/Metz liberate) & Step 17 (Apr 1945 Colmar liberata vs Tasche Atlantiche)

          const colmar16 = resolveFranceProvince('FRF12', 16);

          const stras16 = resolveFranceProvince('FRF11', 16);

          const colmar17 = resolveFranceProvince('FRF12', 17);

          const lorient17 = resolveFranceProvince('FRH04', 17);

          if (!colmar16 || colmar16.o !== 'GER' || !colmar16.name.includes('Colmar')) return false;

          if (!stras16 || stras16.o !== 'FRA' || !stras16.note?.includes('Leclerc')) return false;

          if (!colmar17 || colmar17.o !== 'FRA' || !colmar17.note?.includes('Colmar')) return false;

          if (!lorient17 || lorient17.o !== 'GER' || !lorient17.name.includes('Festung Atlantica')) return false;



          // Step 19 (Set 1947 Quatrième République: Trattato di Parigi Briga-Tenda & Loi de départementalisation 1946 DOM/Guiana)

          const nice19 = resolveFranceProvince('FRL03', 19);

          const guiana19 = resolveFranceProvince('FRY30', 19);

          const guianaFeat19 = resolveFeature({ id: 'FR_HIST_GUIANA', properties: { CNTR_CODE: 'FR', NAME: 'French Guiana' } }, 19);

          const mart19 = resolveFranceProvince('FRY20', 19);

          if (!nice19 || !nice19.note?.includes('Briga') || !nice19.note?.includes('Tenda')) return false;

          if (!guiana19 || guiana19.o !== 'FRA' || !guiana19.note?.includes('973') || !guiana19.adminEntity?.includes('Quatrième République')) return false;

          if (!guianaFeat19 || guianaFeat19.o !== 'FRA' || !guianaFeat19.adminEntity?.includes('Quatrième République')) return false;

          if (!mart19 || mart19.o !== 'FRA' || !mart19.note?.includes('972')) return false;



          return true;

        },

      },

      {

        name: '122. Ripristino Integrale Timeline Islanda nelle Ultime Tappe (Steps 14–19: Referendum Maggio 1944, Proclamazione Repubblica 17 Giugno 1944, Smobilitazione Hvalfjörður 1945, Accordo di Keflavík & Ritiro Militare USA 1947, Bandiere Anti-Anacronismo & Zero Overlap)',

        run: () => {

          // 1. Verifica assenza di overlap GeoDB: esattamente IS001 + IS002 in loadedProvs

          const isProvs = loadedProvs.filter((f: any) => f.properties?.CNTR_CODE === 'IS' || String(f.id || '').startsWith('IS00'));

          if (isProvs.length !== 2) return false;



          // 2. Step 14 (6 Giugno 1944): Overlord + Plebiscito del 20–23 maggio alla vigilia della Repubblica (ancora difesa USA)

          const is14_1 = resolveFeature({ properties: { NUTS_ID: 'IS001', CNTR_CODE: 'IS', NAME: 'Höfuðborgarsvæði' } }, 14);

          const is14_2 = resolveFeature({ properties: { NUTS_ID: 'IS002', CNTR_CODE: 'IS', NAME: 'Landsbyggð' } }, 14);

          if (is14_1.o !== 'USA' || is14_1.fac !== 'Alleati' || !is14_1.note?.includes('17 giugno 1944')) return false;

          if (is14_2.o !== 'USA' || is14_2.fac !== 'Alleati' || !is14_2.note?.includes('Overlord')) return false;



          // 3. Steps 15–17 (Ago 1944 – Apr 1945): Repubblica d'Islanda (Lýðveldið Ísland — 17 Giugno 1944) sovrana neutrale

          for (const step of [15, 16, 17]) {

            const r1 = resolveFeature({ properties: { NUTS_ID: 'IS001', CNTR_CODE: 'IS', NAME: 'Höfuðborgarsvæði' } }, step);

            const r2 = resolveFeature({ properties: { NUTS_ID: 'IS002', CNTR_CODE: 'IS', NAME: 'Landsbyggð' } }, step);

            const rHb = resolveHB({ properties: { NAME: 'Iceland' } }, step);

            if (r1.o !== 'ICE' || r1.fac !== 'Neutrale' || !r1.name.includes('Repubblica d\'Islanda')) return false;

            if (r2.o !== 'ICE' || r2.fac !== 'Neutrale' || !r2.name.includes('Lýðveldið Ísland')) return false;

            if (rHb.o !== 'ICE' || rHb.fac !== 'Neutrale') return false;

          }



          // 4. Step 18 (Set 1945): Fine WWII, smobilitazione di Hvalfjörður & rifiuto basi permanenti

          const is18_1 = resolveFeature({ properties: { NUTS_ID: 'IS001', CNTR_CODE: 'IS', NAME: 'Höfuðborgarsvæði' } }, 18);

          const is18_2 = resolveFeature({ properties: { NUTS_ID: 'IS002', CNTR_CODE: 'IS', NAME: 'Landsbyggð' } }, 18);

          if (is18_1.o !== 'ICE' || is18_1.fac !== 'Neutrale' || !is18_1.note?.includes('99 anni')) return false;

          if (is18_2.o !== 'ICE' || is18_2.fac !== 'Neutrale' || !is18_2.note?.includes('Hvalfjörður')) return false;



          // 5. Step 19 (Set 1947): Accordo di Keflavík, ritiro integrale forze USA (aprile 1947), aeroporto civile & ONU (NON più USA!)

          const is19_1 = resolveFeature({ properties: { NUTS_ID: 'IS001', CNTR_CODE: 'IS', NAME: 'Höfuðborgarsvæði' } }, 19);

          const is19_2 = resolveFeature({ properties: { NUTS_ID: 'IS002', CNTR_CODE: 'IS', NAME: 'Landsbyggð' } }, 19);

          const hb19 = resolveHB({ properties: { NAME: 'Iceland' } }, 19);

          if (is19_1.o !== 'ICE' || is19_1.fac !== 'Neutrale' || !is19_1.note?.includes('Keflavík')) return false;

          if (is19_2.o !== 'ICE' || is19_2.fac !== 'Neutrale' || !is19_2.note?.includes('Accordo di Keflavík')) return false;

          if (hb19.o !== 'ICE' || hb19.fac !== 'Neutrale') return false;

          if (!getOwnerMeta('ICE').l(19).includes('Accordo di Keflavík')) return false;



          // 6. Base Navale Hvalfjörður smilitarizzata agli Steps 18–19

          const hvalBase = HISTORICAL_NAVAL_BASES.find((b) => b.id === 'hvalfjordur_base');

          if (!hvalBase) return false;

          if (getDynamicNavalBaseStatus(hvalBase, 18).fillColor !== '#b3c7d6') return false;

          if (getDynamicNavalBaseStatus(hvalBase, 19).fillColor !== '#b3c7d6') return false;



          // 7. Bandiere anti-anacronismo (Regno 1918–1944 vs Repubblica 1944+)

          const fKingdom = resolveHistoricalFlag('ICE', '1936-01-01');

          const fPreRep = resolveHistoricalFlag('ICE', '1944-06-06');

          const fRep44 = resolveHistoricalFlag('ICE', '1944-08-25');

          const fRep47 = resolveHistoricalFlag('ICE', '1947-09-30');

          if (!fKingdom || fKingdom.entity_id !== 'ICE_KINGDOM') return false;

          if (!fPreRep || fPreRep.entity_id !== 'ICE_KINGDOM') return false;

          if (!fRep44 || fRep44.entity_id !== 'ICE_REP') return false;

          if (!fRep47 || fRep47.entity_id !== 'ICE_REP') return false;



          return true;

        },

      },

      {

        name: '123. Seconda Repubblica del Turkestan Orientale (1944–1949) & Spartizione Topologica dello Xinjiang (Tre Distretti Ili, Tarbagatay & Altay vs Dihua/Tarim)',

        run: () => {

          // 1. Verifica esistenza delle due feature distinte nel GeoDB senza duplicati

          const xjAll = loadedProvs.filter((f: any) => f.id === 'CHN_XINJIANG' || f.id === 'CHN_XINJIANG_ETR');

          if (xjAll.length !== 2) return false;



          const fEtr = xjAll.find((f: any) => f.id === 'CHN_XINJIANG_ETR');

          const fXin = xjAll.find((f: any) => f.id === 'CHN_XINJIANG');

          if (!fEtr || !fXin) return false;



          // 2. Steps 0-13: regime filo-sovietico unitario di Sheng Shicai (XIN / Comintern)

          const etr0 = resolveFeature(fEtr, 0);

          const xin0 = resolveFeature(fXin, 0);

          if (etr0.o !== 'XIN' || etr0.fac !== 'Comintern') return false;

          if (xin0.o !== 'XIN' || xin0.fac !== 'Comintern') return false;



          // 3. Steps 14-15 (Giu-Ago 1944): transizione sotto governo KMT prima della rivolta del 12 nov 1944

          const etr15 = resolveFeature(fEtr, 15);

          const xin15 = resolveFeature(fXin, 15);

          if (etr15.o !== 'CHI' || xin15.o !== 'CHI') return false;



          // 4. Steps 16-18 (Dic 1944 - Set 1945): Rivolta dei Tre Distretti -> ETR vs Dihua/Tarim KMT

          for (const step of [16, 17, 18]) {

            const rEtr = resolveFeature(fEtr, step);

            const rXin = resolveFeature(fXin, step);

            if (rEtr.o !== 'ETR' || rEtr.fac !== 'Comintern' || !rEtr.name.includes('Turkestan Orientale')) return false;

            if (rXin.o !== 'CHI' || rXin.fac !== 'Alleati') return false;

          }



          // 5. Step 19 (Settembre 1947): Tre Distretti (Ili, Tarbagatay, Altay) secessionisti filo-sovietici indipendenti da Nanchino

          const etr19 = resolveFeature(fEtr, 19);

          const xin19 = resolveFeature(fXin, 19);

          if (etr19.o !== 'ETR' || etr19.fac !== 'Comintern') return false;

          if (!etr19.note?.includes('Ili') || !etr19.note?.includes('Tarbagatay') || !etr19.note?.includes('Altay')) return false;

          if (!etr19.note?.includes('Ehmetjan Qasimi')) return false;

          if (xin19.o !== 'CHI' || xin19.fac !== 'Alleati' || !xin19.name.includes('Ürümqi')) return false;



          // 6. Metadati & Bandiere anti-anacronismo 2ª ETR (mezzaluna e stella in campo verde)

          if (!getOwnerMeta('ETR').l(19).includes('Seconda Repubblica del Turkestan Orientale')) return false;

          const etrFlag19 = resolveHistoricalFlag('ETR', '1947-09-30');

          const etrFlagPre = resolveHistoricalFlag('ETR', '1943-09-08');

          if (!etrFlag19 || etrFlag19.entity_id !== 'SECOND_ETR' || etrFlag19.asset?.file_name !== 'Flag_of_the_Second_East_Turkestan_Republic.svg') return false;

          if (etrFlagPre !== null) return false;

          const svgEtr = getCountryFlagSvg('ETR', 19);

          if (!svgEtr.includes('#0d7a3e') || !svgEtr.includes('etrCrescent')) return false;



          return true;

        },

      },

      {

        name: '124. Rimozione Integrale Riferimenti al Terzo Reich, Wehrmacht & Occupazione Nazista nel Dopoguerra (Steps 18–19: Polonia, Danimarca, Norvegia, URSS, Cechia, Austria & Leader Postbellici)',

        run: () => {

          const REICH_POSTWAR_LEAK = /\b(general\s*gouvernement|distrikt\s+(?:warschau|krakau|radom|lublin|galizien)|reichsgau|wartheland|warthegau|danzig-westpreu(?:ß|ss)en|ostpreu(?:ß|ss)en|sudetengau|protektorat|böhmen\s+und\s+mähren|ostmark|reichskommissariat|heeresgebiet|cdz-gebiet|gauleiter|führer|adolf hitler|wehrmacht|oberkommando|militärbefehlshaber|militärverwaltung|gestapo|third reich|terzo reich|deutsches reich|großdeutsches|drittes reich|und lowitsch|litzmannstadt|gotenhafen|musterprotektorat|besat af|besatzung|operationsgebiet ost|kreishauptmannschaft)\b/i;



          for (const step of [18, 19]) {

            for (const f of loadedProvs) {

              const r = resolveFeature(f, step);

              const dyn = getExtendedToponym(f.properties?.NAME || f.properties?.NAME_LATN || f.properties?.NUTS_NAME || '', r.o, String(f.id || ''), (f as any).__cent, step);

              const headerAndAdmin = [r.name, r.adminEntity, dyn?.name, dyn?.adminTitle].filter(Boolean).join(' || ');

              if (REICH_POSTWAR_LEAK.test(headerAndAdmin)) return false;

            }

          }



          // Verifiche mirate sui casi chiave (incluso PL715 dello screenshot utente)

          const p715 = loadedProvs.find((f: any) => f.id === 'PL715');

          const p22a = loadedProvs.find((f: any) => f.id === 'PL22A');

          const d11 = loadedProvs.find((f: any) => f.id === 'DK011');

          const n81 = loadedProvs.find((f: any) => f.id === 'NO081');

          const bel19 = loadedProvs.find((f: any) => f.id === 'SOV_ADM1_RUS_28_Belgorod_Oblast');

          const kyiv19 = loadedProvs.find((f: any) => f.id === 'SOV_ADM1_UKR_82_Kyiv_Oblast');

          if (!p715 || !p22a || !d11 || !n81 || !bel19 || !kyiv19) return false;



          const r715 = resolveFeature(p715, 19);

          const dyn715 = getExtendedToponym(p715.properties?.NAME || p715.properties?.NUTS_NAME || 'Skierniewicki', r715.o, 'PL715', undefined, 19);

          const r22a = resolveFeature(p22a, 19);

          const rd11 = resolveFeature(d11, 19);

          const rn81 = resolveFeature(n81, 19);

          const rbel = resolveFeature(bel19, 19);

          const rkyiv = resolveFeature(kyiv19, 19);



          if (r715.o !== 'POL' || !dyn715.name.includes('Skierniewice') || !dyn715.name.includes('Polonia') || dyn715.adminTitle !== 'Rzeczpospolita Polska') return false;

          if (r22a.o !== 'POL' || !r22a.name.includes('Katowic') || !r22a.name.includes('Polonia')) return false;

          if (rd11.o !== 'DEN' || !rd11.name.includes('København')) return false;

          if (rn81.o !== 'NOR' || !rn81.name.includes('Oslo')) return false;

          if (rbel.o !== 'SOV' || !rbel.name.includes('Belgorod') || !rbel.adminEntity?.includes('RSFSR')) return false;

          if (rkyiv.o !== 'SOV' || rkyiv.adminEntity?.includes('Reichskommissariat')) return false;



          // Metadati leader e stati postbellici (niente Mościcki/Rydz-Śmigły o Großdeutsches Reich / Hitler nel 1945–1947)

          const polMeta19 = getOwnerMeta('POL', 19);

          const gerMeta19 = getOwnerMeta('GER', 19);

          const sloMeta19 = getOwnerMeta('SLO', 19);

          if (!polMeta19.leader?.includes('Bierut') || polMeta19.leader?.includes('Mościcki')) return false;

          if (!gerMeta19.l(19).includes('Controllo Alleato') || gerMeta19.leader?.includes('Hitler')) return false;

          if (sloMeta19.l(19).includes('Reich') || sloMeta19.leader?.includes('Tiso')) return false;



          return true;

        },

      },

    ];



    let passed = 0;

    tests.forEach((t) => {

      try {

        if (t.run()) passed++;

        else console.error('[TEST FALLITO]', t.name);

      } catch (err: any) {

        console.error('[TEST ECCEZIONE]', t.name, err);

      }

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



  // Bootstrapping Engine: Caricamento Database Geospaziale Unificato 1938

  const loadGeoData = useCallback(async () => {

    try {

      setLoadError(null);

      setLoadProgress(15);

      addLog('Inizializzazione sala operativa globale (Cartografia Storica 1936-1940)…', 'ok');



      addLog('Caricamento database geospaziale unificato 1938 ad alta definizione...', 'info');

      const { provFeatures: provs, hbFeatures: hbs } = await loadUnifiedGeoDatabase((pct) => {

        setLoadProgress(20 + Math.round(pct * 0.60));

      });



      setLoadProgress(80);

      addLog(`Database unificato caricato: ${provs.length} province e ${hbs.length} territori globali ✓`, 'ok');



      // Esecuzione pipeline di risoluzione storica su tutti i 9 passaggi temporali

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



      runSelfTests(provs, hbs);



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

    <div id="app" className="fixed inset-0 w-full h-full bg-[#0c1826] text-[#cfd3d6] select-none overflow-hidden">

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

              if (f && f.__cent) {

                setFocusCoords({

                  coords: f.__cent,

                  zoom: 4.8,

                  key: Date.now(),

                });

              }

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

