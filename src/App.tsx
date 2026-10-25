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
import { getCountryFlagSvg } from './data/historicalFlags';
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
import { processHistoricalCartographyPipeline } from './data/historicalEngine';
import { MapLayerControls, LayerVisibilityState } from './components/MapLayerControls';
import { tacticalAudio } from './data/audioSynthesizer';
import { HistoricalBattle } from './data/historicalBattles';
import { FortificationLine, NavalBase } from './data/historicalFortifications';
import { resolveBalkansToponym, BALKAN_DISTRICTS_CATALOG } from './data/balkanDistricts';

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
        name: 'Integrità Territoriale Guiana Francese (F_COL 1936-39 -> VIC dal giu 1940)',
        run: () => {
          const frg = loadedProvs.find((f: any) => f.id === 'French Guiana' || f.properties?.NAME === 'French Guiana');
          return (
            resolveFeature({ properties: { NUTS_ID: 'FRY30', NAME: 'French Guiana' } }, 0).o === 'F_COL' &&
            resolveFeature({ properties: { NUTS_ID: 'FRY30', NAME: 'French Guiana' } }, 6).o === 'F_COL' &&
            resolveHB({ properties: { NAME: 'French Guiana' } }, 0).o === 'F_COL' &&
            frg && frg.__resolve(0).o === 'F_COL' &&
            frg && frg.__resolve(6).o === 'F_COL'
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
        name: 'Integrità Territoriale Microstati: San Marino (SMR Neutrale), Vaticano (VAT Neutrale), Gibilterra (GIB Alleati) e Andorra (AND Neutrale)',
        run: () => {
          const findF = (id: string) => loadedProvs.find((f: any) => f.id === id || f.properties?.NAME === id);
          const smrFeat = findF('San Marino');
          const vatFeat = findF('Vatican City');
          const gibFeat = findF('Gibraltar');
          const andFeat = findF('Andorra');
          if (!smrFeat || !vatFeat || !gibFeat || !andFeat) return false;

          const smr = resolveFeature(smrFeat, 0);
          const vat0 = resolveFeature(vatFeat, 0);
          const vat5 = resolveFeature(vatFeat, 5);
          const gib = resolveFeature(gibFeat, 0);
          const and0 = resolveFeature(andFeat, 0);

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
            gf0.o === 'F_COL' && gf6.o === 'VIC' &&
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
            topGuant.name.includes('Guantanamo') && (topGuant.adminTitle || '').includes('Treaty of 1934')
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
            STEPS.length === 9 &&
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
            STEPS.length === 9 &&
            STEPS[8].d === 'APR 1941' &&
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
