/**
 * Dettaglio Geografico e Storico della Bosnia ed Erzegovina (1936-1940)
 * Costruito a partire dalla cartografia GeoJSON ad alta precisione (ba.json)
 *
 * Include le 3 entità storiche e regionali:
 * 1. Federacija Bosne i Hercegovine (Sarajevo, Mostar, Tuzla, Zenica, Bihać)
 * 2. Republika Srpska (Banja Luka, Trebinje, Bijeljina, Prijedor, Doboj, Foča)
 * 3. Brčko distrikt (Corridoio strategico fluviale della Posavina)
 */

import baData from './ba.json';
import { makeResult } from './georesolver';
import { ResolvedTerritory } from '../types';

const rawSrpska = baData.features.find((f: any) => f.properties.id === 'BASRP') || baData.features[0];
const rawBrcko = baData.features.find((f: any) => f.properties.id === 'BABRC') || baData.features[1];
const rawFederation = baData.features.find((f: any) => f.properties.id === 'BABIH') || baData.features[2];

// 1. Federazione di Bosnia ed Erzegovina (Sarajevo / Mostar / Tuzla)
export const BOSNIA_FEDERATION_FEATURE: any = {
  type: 'Feature',
  id: 'YUG_HIST_BOSNIA', // Mantenuto per compatibilità con test suite storici
  properties: {
    id: 'BABIH',
    NUTS_ID: 'BABIH',
    CNTR_ID: 'BA',
    CNTR_CODE: 'BA',
    NAME: 'Bosna (Sarajevo, Mostar, Tuzla)',
    NUTS_NAME: 'Bosna (Sarajevo / Mostar / Tuzla)',
    NAME_ENGL: 'Bosnia (Sarajevo, Mostar, Tuzla)',
    ADMIN: 'Drinska Banovina / Primorska Banovina',
    SOVEREIGNT: 'Kingdom of Yugoslavia',
    CAPITAL: 'Sarajevo',
    HISTORICAL_NOTE:
      'Regno di Jugoslavia — Territorio della Bosnia centrale ed Erzegovina (Sarajevo, Mostar, Tuzla, Zenica, Travnik, Bihać). Suddiviso storicamente tra la Banovina della Drina (Sarajevo) e la Primorska Banovina (Mostar, Livno). Nell\'agosto 1939 Mostar e la fascia occidentale confluirono nella Banovina di Croazia (Banovina Hrvatska).',
  },
  geometry: rawFederation.geometry,
  __layer: 'prov',
  __kind: 'BOSNIA',
};
BOSNIA_FEDERATION_FEATURE.__resolve = (s: number): ResolvedTerritory => {
  return makeResult(
    'YUG',
    s >= 4
      ? 'Bosna (Sarajevo, Mostar i Banovina Hrvatska)'
      : 'Bosna (Sarajevo, Mostar i Drinska banovina)',
    s >= 4
      ? 'Kraljevina Jugoslavija — Drinska banovina i Banovina Hrvatska (Sporazum Cvetković-Maček, avg 1939)'
      : 'Kraljevina Jugoslavija — Drinska banovina i Primorska banovina'
  );
};

// 2. Republika Srpska / Bosanska Krajina e Podrinje (Banja Luka / Trebinje / Bijeljina)
export const BOSNIA_SRPSKA_FEATURE: any = {
  type: 'Feature',
  id: 'BA_HIST_SRPSKA',
  properties: {
    id: 'BASRP',
    NUTS_ID: 'BASRP',
    CNTR_ID: 'BA',
    CNTR_CODE: 'BA',
    NAME: 'Bosanska Krajina e Podrinje (Banja Luka / Trebinje)',
    NUTS_NAME: 'Bosanska Krajina e Podrinje (Banja Luka / Trebinje / Bijeljina)',
    NAME_ENGL: 'Bosanska Krajina and Podrinje (Banja Luka / Trebinje)',
    ADMIN: 'Vrbaska Banovina / Zetska Banovina',
    SOVEREIGNT: 'Kingdom of Yugoslavia',
    CAPITAL: 'Banja Luka',
    HISTORICAL_NOTE:
      'Regno di Jugoslavia — Territorio della Bosanska Krajina settentrionale (Banja Luka, Prijedor, Doboj) lungo il bacino del Vrbas, dell\'alta Posavina e della Bosnia orientale / Erzegovina orientale (Trebinje, Foča, Višegrad, Bijeljina). Cuore della Vrbaska Banovina e della Zetska Banovina.',
  },
  geometry: rawSrpska.geometry,
  __layer: 'prov',
  __kind: 'BOSNIA',
};
BOSNIA_SRPSKA_FEATURE.__resolve = (_s: number): ResolvedTerritory => {
  return makeResult(
    'YUG',
    'Bosanska Krajina i Podrinje (Banja Luka i Trebinje)',
    'Kraljevina Jugoslavija — Vrbaska banovina (Banja Luka) i Zetska banovina (Trebinje)'
  );
};

// 3. Posavina (Brčko)
export const BOSNIA_BRCKO_FEATURE: any = {
  type: 'Feature',
  id: 'BA_HIST_BRCKO',
  properties: {
    id: 'BABRC',
    NUTS_ID: 'BABRC',
    CNTR_ID: 'BA',
    CNTR_CODE: 'BA',
    NAME: 'Posavina (Brčko)',
    NUTS_NAME: 'Posavina (Distretto di Brčko)',
    NAME_ENGL: 'Posavina (Brcko)',
    ADMIN: 'Drinska Banovina',
    SOVEREIGNT: 'Kingdom of Yugoslavia',
    CAPITAL: 'Brčko',
    HISTORICAL_NOTE:
      'Regno di Jugoslavia — Corridoio strategico della Posavina lungo il fiume Sava. Snodo fluviale, commerciale e ferroviario chiave di collegamento tra la Bosnia, la Slavonia e la Sirmia.',
  },
  geometry: rawBrcko.geometry,
  __layer: 'prov',
  __kind: 'BOSNIA',
};
BOSNIA_BRCKO_FEATURE.__resolve = (_s: number): ResolvedTerritory => {
  return makeResult(
    'YUG',
    'Posavina (Brčko)',
    'Kraljevina Jugoslavija — Drinska banovina (Srez Brčko)'
  );
};

// Esportazione aggregata per l'assemblaggio provinciale
export const BOSNIA_REGIONAL_FEATURES: any[] = [
  BOSNIA_FEDERATION_FEATURE,
  BOSNIA_SRPSKA_FEATURE,
  BOSNIA_BRCKO_FEATURE,
];

// Alias retrocompatibile
export const BOSNIA_HERZEGOVINA_FEATURE: any = BOSNIA_FEDERATION_FEATURE;
