import { FRENCH_INDOCHINA_PROVINCES_META } from './frenchIndochinaProvinces';
import { USA_PROVINCES_META, populateUSAToponyms } from './usaProvinces';
import { CANADA_PROVINCES_META, populateCanadaToponyms } from './canadaProvinces';
import { MEXICO_PROVINCES_META, populateMexicoToponyms } from './mexicoProvinces';
import { AOF_PROVINCES_META, populateAOFToponyms } from './aofProvinces';
import { AEF_PROVINCES_META, populateAEFToponyms } from './aefProvinces';
import { NAMIBIA_PROVINCES_META, populateNamibiaToponyms, resolveNamibiaProvince } from './namibiaProvinces';
import { SUDAN_PROVINCES_META, populateSudanToponyms, resolveSudanProvince } from './sudanProvinces';
import { AFGHANISTAN_PROVINCES_META, populateAfghanistanToponyms, resolveAfghanistanProvince } from './afghanistanProvinces';
/**
 * Motore Toponomastico Storico Esteso (1936-1940)
 * Dizionario multi-linguistico e geopolitico per la corretta attribuzione
 * dei toponimi contemporanei d'epoca in base al controllore politico e all'anno.
 */

import { ToponymMatch } from '../types';
import {
  resolveBalkansToponym,
  BALKAN_DISTRICTS_CATALOG,
  BalkanDistrictDef,
} from './balkanDistricts';
import { EGYPT_DISTRICTS_META } from './egyptProvinces';
import { ALGERIA_PROVINCES_META } from './algeriaProvinces';
import { MOROCCO_PROVINCES_META } from './moroccoProvinces';
import { TUNISIA_PROVINCES_META } from './tunisiaProvinces';
import { YEMEN_PROVINCES_META } from './yemenProvinces';
import {
  SCANDINAVIAN_DISTRICTS_CATALOG,
  type ScandinavianDistrictDef,
  resolveScandinavianToponym,
  populateScandinavianToponyms,
} from './scandinavianProvinces';

export {
  resolveBalkansToponym,
  BALKAN_DISTRICTS_CATALOG,
  type BalkanDistrictDef,
  EGYPT_DISTRICTS_META,
  ALGERIA_PROVINCES_META,
  MOROCCO_PROVINCES_META,
  TUNISIA_PROVINCES_META,
  YEMEN_PROVINCES_META,
  SCANDINAVIAN_DISTRICTS_CATALOG,
  type ScandinavianDistrictDef,
  resolveScandinavianToponym,
};

export const HISTORICAL_TOPONYM_DICT: Record<string, Record<string, ToponymMatch>> = {
  // ================= PRINCIPATO D'ANDORRA =================
  AND: {
    andorra: { historicalName: 'Andorra la Vella', adminTitle: 'Principat d\'Andorra' },
    andorra_la_vella: { historicalName: 'Andorra la Vella', adminTitle: 'Principat d\'Andorra' },
    canillo: { historicalName: 'Canillo', adminTitle: 'Parròquia de Canillo (Andorra)' },
    encamp: { historicalName: 'Encamp', adminTitle: 'Parròquia d\'Encamp (Andorra)' },
    ordino: { historicalName: 'Ordino', adminTitle: 'Parròquia d\'Ordino (Andorra)' },
    la_massana: { historicalName: 'La Massana', adminTitle: 'Parròquia de La Massana (Andorra)' },
    sant_julia: { historicalName: 'Sant Julià de Lòria', adminTitle: 'Parròquia de Sant Julià de Lòria (Andorra)' },
    escaldes: { historicalName: 'Escaldes-Engordany', adminTitle: 'Parròquia d\'Escaldes-Engordany (Andorra)' },
  },

  // ================= GERMAN REICH & AMMINISTRAZIONI =================
  GER: {
    // Polonia annessa e Governatorato Generale
    wroclaw: { historicalName: 'Breslau', adminTitle: 'Provinz Niederschlesien' },
    dolnoslaskie: { historicalName: 'Breslau (Niederschlesien)', adminTitle: 'Gau Schlesien' },
    szczecin: { historicalName: 'Stettin', adminTitle: 'Provinz Pommern' },
    zachodniopomorskie: { historicalName: 'Stettin (Pommern)', adminTitle: 'Gau Pommern' },
    gdansk: { historicalName: 'Danzig', adminTitle: 'Reichsgau Danzig-Westpreußen' },
    pomorskie: { historicalName: 'Danzig-Westpreußen', adminTitle: 'Reichsgau Danzig-Westpreußen' },
    poznan: { historicalName: 'Posen', adminTitle: 'Reichsgau Wartheland' },
    wielkopolskie: { historicalName: 'Posen (Wartheland)', adminTitle: 'Reichsgau Wartheland' },
    lodz: { historicalName: 'Litzmannstadt', adminTitle: 'Reichsgau Wartheland' },
    lodzkie: { historicalName: 'Litzmannstadt (Wartheland)', adminTitle: 'Reichsgau Wartheland' },
    katowice: { historicalName: 'Kattowitz', adminTitle: 'Provinz Oberschlesien' },
    slaskie: { historicalName: 'Kattowitz (Oberschlesien)', adminTitle: 'Gau Oberschlesien' },
    opole: { historicalName: 'Oppeln', adminTitle: 'Regierungsbezirk Oppeln' },
    krakow: { historicalName: 'Krakau', adminTitle: 'Distrikt Krakau — Generalgouvernement' },
    malopolskie: { historicalName: 'Krakau (Distrikt Galizien/Krakau)', adminTitle: 'Generalgouvernement' },
    warszawa: { historicalName: 'Warschau', adminTitle: 'Distrikt Warschau — Generalgouvernement' },
    mazowieckie: { historicalName: 'Warschau (Distrikt)', adminTitle: 'Generalgouvernement' },
    lublin: { historicalName: 'Lublin', adminTitle: 'Distrikt Lublin — Generalgouvernement' },
    lubelskie: { historicalName: 'Lublin (Generalgouvernement)', adminTitle: 'Generalgouvernement' },
    rzeszow: { historicalName: 'Reichshof', adminTitle: 'Distrikt Krakau — Generalgouvernement' },
    podkarpackie: { historicalName: 'Reichshof (Generalgouvernement)', adminTitle: 'Generalgouvernement' },
    bydgoszcz: { historicalName: 'Bromberg', adminTitle: 'Regierungsbezirk Bromberg (Danzig-Westpreußen)' },
    kujawsko: { historicalName: 'Bromberg (Westpreußen)', adminTitle: 'Reichsgau Danzig-Westpreußen' },
    olsztyn: { historicalName: 'Allenstein', adminTitle: 'Regierungsbezirk Allenstein (Ostpreußen)' },
    warminsko: { historicalName: 'Allenstein (Ostpreußen)', adminTitle: 'Provinz Ostpreußen' },
    zielona_gora: { historicalName: 'Grünberg in Schlesien', adminTitle: 'Provinz Niederschlesien' },
    gorzow: { historicalName: 'Landsberg an der Warthe', adminTitle: 'Provinz Brandenburg (Neumark)' },
    lubuskie: { historicalName: 'Schwerin/Landsberg (Mark Brandenburg)', adminTitle: 'Mark Brandenburg' },
    kielce: { historicalName: 'Kielce', adminTitle: 'Distrikt Radom — Generalgouvernement' },
    swietokrzyskie: { historicalName: 'Radom/Kielce', adminTitle: 'Generalgouvernement' },
    bialystok: { historicalName: 'Bialystok', adminTitle: 'Bezirk Bialystok' },
    podlaskie: { historicalName: 'Bezirk Bialystok', adminTitle: 'Chef der Zivilverwaltung' },
    kaliningrad: { historicalName: 'Königsberg in Preußen', adminTitle: 'Hauptstadt der Provinz Ostpreußen' },
    klaipeda: { historicalName: 'Memel', adminTitle: 'Memelland (Reichsgau Ostpreußen)' },
    suwalki: { historicalName: 'Sudauen', adminTitle: 'Regierungsbezirk Zichenau / Ostpreußen' },
    ciechanow: { historicalName: 'Zichenau', adminTitle: 'Regierungsbezirk Zichenau (Ostpreußen)' },
    plock: { historicalName: 'Schröttersburg', adminTitle: 'Regierungsbezirk Zichenau' },
    kalisz: { historicalName: 'Kalisch', adminTitle: 'Reichsgau Wartheland' },
    gniezno: { historicalName: 'Gnesen', adminTitle: 'Reichsgau Wartheland' },
    torun: { historicalName: 'Thorn', adminTitle: 'Regierungsbezirk Bromberg' },
    grudziadz: { historicalName: 'Graudenz', adminTitle: 'Reichsgau Danzig-Westpreußen' },
    gliwice: { historicalName: 'Gleiwitz', adminTitle: 'Provinz Oberschlesien' },
    bytom: { historicalName: 'Beuthen O.S.', adminTitle: 'Provinz Oberschlesien' },
    zabrze: { historicalName: 'Hindenburg O.S.', adminTitle: 'Provinz Oberschlesien' },

    // Cecoslovacchia: Sudetenland & Böhmen und Mähren
    praha: { historicalName: 'Prag', adminTitle: 'Protektorat Böhmen und Mähren' },
    prague: { historicalName: 'Prag', adminTitle: 'Protektorat Böhmen und Mähren' },
    brno: { historicalName: 'Brünn', adminTitle: 'Protektorat Böhmen und Mähren' },
    plzen: { historicalName: 'Pilsen', adminTitle: 'Protektorat Böhmen und Mähren' },
    ostrava: { historicalName: 'Mährisch-Ostrau', adminTitle: 'Protektorat Böhmen und Mähren' },
    olomouc: { historicalName: 'Olmütz', adminTitle: 'Protektorat Böhmen und Mähren' },
    ceske_budejovice: { historicalName: 'Budweis', adminTitle: 'Protektorat Böhmen und Mähren' },
    jihlava: { historicalName: 'Iglau', adminTitle: 'Protektorat Böhmen und Mähren' },
    pardubice: { historicalName: 'Pardubitz', adminTitle: 'Protektorat Böhmen und Mähren' },
    hradec_kralove: { historicalName: 'Königgrätz', adminTitle: 'Protektorat Böhmen und Mähren' },
    karlovy_vary: { historicalName: 'Karlsbad', adminTitle: 'Reichsgau Sudetenland (Regierungsbezirk Eger)' },
    liberec: { historicalName: 'Reichenberg', adminTitle: 'Reichsgau Sudetenland (Hauptstadt)' },
    usti_nad_labem: { historicalName: 'Aussig an der Elbe', adminTitle: 'Reichsgau Sudetenland' },
    cheb: { historicalName: 'Eger', adminTitle: 'Reichsgau Sudetenland' },
    opava: { historicalName: 'Troppau', adminTitle: 'Reichsgau Sudetenland' },
    jablonec: { historicalName: 'Gablonz an der Neiße', adminTitle: 'Reichsgau Sudetenland' },
    teplice: { historicalName: 'Teplitz-Schönau', adminTitle: 'Reichsgau Sudetenland' },
    chomutov: { historicalName: 'Komotau', adminTitle: 'Reichsgau Sudetenland' },

    // Austria / Ostmark
    wien: { historicalName: 'Wien (Groß-Wien)', adminTitle: 'Reichsgau Wien' },
    vienna: { historicalName: 'Wien', adminTitle: 'Reichsgau Wien' },
    niederosterreich: { historicalName: 'Niederdonau', adminTitle: 'Reichsgau Niederdonau' },
    oberosterreich: { historicalName: 'Oberdonau', adminTitle: 'Reichsgau Oberdonau' },
    linz: { historicalName: 'Linz (Oberdonau)', adminTitle: 'Reichsgau Oberdonau' },
    salzburg: { historicalName: 'Salzburg', adminTitle: 'Reichsgau Salzburg' },
    graz: { historicalName: 'Graz (Steiermark)', adminTitle: 'Reichsgau Steiermark' },
    steiermark: { historicalName: 'Steiermark', adminTitle: 'Reichsgau Steiermark' },
    innsbruck: { historicalName: 'Innsbruck (Tirol)', adminTitle: 'Reichsgau Tirol-Vorarlberg' },
    tirol: { historicalName: 'Tirol-Vorarlberg', adminTitle: 'Reichsgau Tirol-Vorarlberg' },
    kaernten: { historicalName: 'Kärnten', adminTitle: 'Reichsgau Kärnten' },
    carinthia: { historicalName: 'Kärnten', adminTitle: 'Reichsgau Kärnten' },
    burgenland: { historicalName: 'Burgenland', adminTitle: 'Reichsgaue Niederdonau und Steiermark' },

    // Francia annessa / occupata & Benelux
    bas_rhin: { historicalName: 'Straßburg (Elsass)', adminTitle: 'CdZ-Gebiet Elsass (Gau Baden-Elsass)' },
    haut_rhin: { historicalName: 'Kolmar/Mülhausen (Oberelsass)', adminTitle: 'CdZ-Gebiet Elsass' },
    strasbourg: { historicalName: 'Straßburg', adminTitle: 'Gau Baden-Elsass' },
    mulhouse: { historicalName: 'Mülhausen im Elsass', adminTitle: 'CdZ-Gebiet Elsass' },
    colmar: { historicalName: 'Kolmar', adminTitle: 'CdZ-Gebiet Elsass' },
    moselle: { historicalName: 'Lothringen (Metz)', adminTitle: 'CdZ-Gebiet Lothringen (Gau Westmark)' },
    metz: { historicalName: 'Metz', adminTitle: 'Gau Westmark' },
    luxembourg: { historicalName: 'Luxemburg', adminTitle: 'CdZ-Gebiet Luxemburg (Gau Moselland)' },
    eupen: { historicalName: 'Eupen-Malmedy', adminTitle: 'Rheinprovinz (Regierungsbezirk Aachen)' },
    brussel: { historicalName: 'Brüssel (Militärverwaltung)', adminTitle: 'Militärverwaltung in Belgien und Nordfrankreich' },
    bruxelles: { historicalName: 'Brüssel', adminTitle: 'Militärverwaltung Belgien' },
    antwerpen: { historicalName: 'Antwerpen', adminTitle: 'Militärverwaltung Belgien' },
    liege: { historicalName: 'Lüttich', adminTitle: 'Militärverwaltung Belgien' },
    amsterdam: { historicalName: 'Amsterdam', adminTitle: 'Reichskommissariat Niederlande' },
    den_haag: { historicalName: 'Den Haag', adminTitle: 'Reichskommissariat Niederlande' },
    rotterdam: { historicalName: 'Rotterdam', adminTitle: 'Reichskommissariat Niederlande' },
    paris: { historicalName: 'Paris (Besetzte Zone)', adminTitle: 'Militärbefehlshaber in Frankreich' },
    bordeaux: { historicalName: 'Bordeaux (Besetzte Zone)', adminTitle: 'Militärbefehlshaber in Frankreich' },
    brest: { historicalName: 'Brest (Kriegsmarine-Stützpunkt)', adminTitle: 'Militärbefehlshaber in Frankreich' },
    rouen: { historicalName: 'Rouen', adminTitle: 'Militärbefehlshaber in Frankreich' },
    nantes: { historicalName: 'Nantes', adminTitle: 'Militärbefehlshaber in Frankreich' },
    rennes: { historicalName: 'Rennes', adminTitle: 'Militärbefehlshaber in Frankreich' },
    lille: { historicalName: 'Lille (Militärverwaltung)', adminTitle: 'Militärverwaltung in Belgien und Nordfrankreich' },
    arras: { historicalName: 'Arras', adminTitle: 'Militärverwaltung in Belgien und Nordfrankreich' },
    oslo: { historicalName: 'Oslo', adminTitle: 'Reichskommissariat Norwegen' },
    bergen: { historicalName: 'Bergen', adminTitle: 'Reichskommissariat Norwegen' },
    trondheim: { historicalName: 'Trondheim', adminTitle: 'Reichskommissariat Norwegen' },
    narvik: { historicalName: 'Narvik', adminTitle: 'Reichskommissariat Norwegen' },
    stavanger: { historicalName: 'Stavanger', adminTitle: 'Reichskommissariat Norwegen' },
    tromso: { historicalName: 'Tromsø', adminTitle: 'Reichskommissariat Norwegen' },
    kobenhavn: { historicalName: 'Kopenhagen', adminTitle: 'Besetztes Dänemark' },
    aarhus: { historicalName: 'Aarhus', adminTitle: 'Besetztes Dänemark' },
    odense: { historicalName: 'Odense', adminTitle: 'Besetztes Dänemark' },
    aalborg: { historicalName: 'Aalborg', adminTitle: 'Besetztes Dänemark' },
    jersey: { historicalName: 'Jersey (Besetzte Kanalinseln)', adminTitle: 'Militärbefehlshaber in Frankreich (Inselkommandant)' },
    guernsey: { historicalName: 'Guernsey (Besetzte Kanalinseln)', adminTitle: 'Militärbefehlshaber in Frankreich (Inselkommandant)' },
    channel_islands: { historicalName: 'Kanalinseln (Besetzte Gebiete)', adminTitle: 'Militärbefehlshaber in Frankreich' },
  },

  // ================= REGNO D'ITALIA & IMPERO =================
  ITA: {
    // Terre redente / Confine orientale (1920-1940)
    trieste: { historicalName: 'Trieste', adminTitle: 'Capoluogo del Friuli-Venezia Giulia' },
    goriska: { historicalName: 'Gorizia (Venezia Giulia)', adminTitle: 'Provincia di Gorizia' },
    nova_gorica: { historicalName: 'Gorizia', adminTitle: 'Provincia di Gorizia' },
    pula: { historicalName: 'Pola (Istria)', adminTitle: 'Provincia di Pola (Istria Italiana)' },
    istarska: { historicalName: 'Pola (Istria)', adminTitle: 'Provincia dell\'Istria' },
    rijeka: { historicalName: 'Fiume (Carnaro)', adminTitle: 'Provincia del Carnaro' },
    primorsko_goranska: { historicalName: 'Fiume (Carnaro)', adminTitle: 'Provincia del Carnaro' },
    zadar: { historicalName: 'Zara (Dalmazia)', adminTitle: 'Provincia di Zara' },
    zadarska: { historicalName: 'Zara (Dalmazia)', adminTitle: 'Provincia di Zara' },
    obalno: { historicalName: 'Capodistria (Istria)', adminTitle: 'Provincia di Pola' },
    koper: { historicalName: 'Capodistria (Istria)', adminTitle: 'Provincia di Pola' },
    notranjska: { historicalName: 'Postumia (Carnaro)', adminTitle: 'Provincia di Trieste/Carnaro' },
    postojna: { historicalName: 'Postumia', adminTitle: 'Provincia di Trieste' },
    idrija: { historicalName: 'Idria', adminTitle: 'Provincia di Gorizia' },
    tolmin: { historicalName: 'Tolmino', adminTitle: 'Provincia di Gorizia' },
    piran: { historicalName: 'Pirano', adminTitle: 'Provincia di Pola' },
    umag: { historicalName: 'Umago', adminTitle: 'Provincia di Pola' },
    rovinj: { historicalName: 'Rovigno', adminTitle: 'Provincia di Pola' },
    porec: { historicalName: 'Parenzo', adminTitle: 'Provincia di Pola' },
    labin: { historicalName: 'Albona', adminTitle: 'Provincia di Pola' },
    losinj: { historicalName: 'Lussino', adminTitle: 'Provincia di Pola' },
    cres: { historicalName: 'Cherso', adminTitle: 'Provincia di Pola' },
    krk: { historicalName: 'Veglia', adminTitle: 'Provincia del Carnaro' },
    opatija: { historicalName: 'Abbazia', adminTitle: 'Provincia del Carnaro' },
    ljubljana: { historicalName: 'Lubiana (Provincia di Lubiana)', adminTitle: 'Provincia italiana (1941)' },
    split: { historicalName: 'Spalato (Dalmazia)', adminTitle: 'Governatorato della Dalmazia (1941)' },
    sibenik: { historicalName: 'Sebenico (Dalmazia)', adminTitle: 'Governatorato della Dalmazia (1941)' },
    dubrovnik: { historicalName: 'Ragusa di Dalmazia', adminTitle: 'Dalmazia' },
    kotor: { historicalName: 'Cattaro (Bocche di Cattaro)', adminTitle: 'Provincia di Cattaro (1941)' },

    // Albania (1939-1940)
    albania: { historicalName: 'Regno d\'Albania', adminTitle: 'Unione Personale sotto la Corona d\'Italia' },
    tirana: { historicalName: 'Tirana (Albania)', adminTitle: 'Capitale del Regno d\'Albania' },
    durres: { historicalName: 'Durazzo (Albania)', adminTitle: 'Prefettura di Durazzo' },
    vlore: { historicalName: 'Valona (Albania)', adminTitle: 'Prefettura di Valona (Saseno)' },
    shkoder: { historicalName: 'Scutari (Albania)', adminTitle: 'Prefettura di Scutari' },
    korce: { historicalName: 'Coriza (Albania)', adminTitle: 'Prefettura di Coriza' },
    gjirokaster: { historicalName: 'Argirocastro (Albania)', adminTitle: 'Prefettura di Argirocastro' },
    sarande: { historicalName: 'Porto Edda (Saranda)', adminTitle: 'Provincia di Argirocastro' },

    // Isole Italiane dell'Egeo (Dodecaneso)
    dodecanese: { historicalName: 'Rodi (Isole Italiane dell\'Egeo)', adminTitle: 'Provincia di Rodi' },
    rhodes: { historicalName: 'Rodi (Isole Italiane dell\'Egeo)', adminTitle: 'Provincia di Rodi' },
    rodos: { historicalName: 'Rodi (Isole Italiane dell\'Egeo)', adminTitle: 'Provincia di Rodi' },
    kos: { historicalName: 'Coo (Isole dell\'Egeo)', adminTitle: 'Possedimento dell\'Egeo' },
    leros: { historicalName: 'Lero (Base Navale Egeo)', adminTitle: 'Piazzaforte della Regia Marina' },
    kalymnos: { historicalName: 'Calino', adminTitle: 'Possedimento dell\'Egeo' },
    karpathos: { historicalName: 'Scarpanto', adminTitle: 'Possedimento dell\'Egeo' },
    astypalaia: { historicalName: 'Stampalia', adminTitle: 'Possedimento dell\'Egeo' },
    kastellorizo: { historicalName: 'Castelrosso', adminTitle: 'Possedimento dell\'Egeo' },

    // Quarta Sponda (Libia)
    libya: { historicalName: 'Libia Italiana', adminTitle: 'Governo Generale della Libia (Quarta Sponda)' },
    tripoli: { historicalName: 'Tripoli (Tripolitania)', adminTitle: 'Commissariato Generale di Tripoli' },
    benghazi: { historicalName: 'Bengasi (Cirenaica)', adminTitle: 'Commissariato Generale di Bengasi' },
    derna: { historicalName: 'Derna (Cirenaica)', adminTitle: 'Commissariato di Derna' },
    misrata: { historicalName: 'Misurata (Tripolitania)', adminTitle: 'Commissariato di Misurata' },
    tobruk: { historicalName: 'Tobruk (Cirenaica)', adminTitle: 'Piazzaforte di Tobruk' },
    fezzan: { historicalName: 'Territorio Militare del Sud (Fezzan)', adminTitle: 'Comando Militare Sahariano' },

    // Africa Orientale Italiana (AOI)
    eritrea: { historicalName: 'Colonia Eritrea', adminTitle: 'Governo dell\'Eritrea (AOI)' },
    asmara: { historicalName: 'Asmara', adminTitle: 'Capitale del Governo dell\'Eritrea' },
    massawa: { historicalName: 'Massaua', adminTitle: 'Porto principale dell\'Eritrea' },
    ethiopia: { historicalName: 'Africa Orientale Italiana (Etiopia)', adminTitle: 'Impero dell\'Africa Orientale Italiana' },
    abyssinia: { historicalName: 'Africa Orientale Italiana (Impero)', adminTitle: 'AOI — Viceré d\'Etiopia' },
    addis_ababa: { historicalName: 'Addis Abeba (Governo dello Scioa)', adminTitle: 'Capitale dell\'AOI' },
    harar: { historicalName: 'Governo dell\'Harar (AOI)', adminTitle: 'Governo dell\'Harar' },
    gondar: { historicalName: 'Governo dell\'Amhara (AOI)', adminTitle: 'Capoluogo Gondar' },
    jimma: { historicalName: 'Governo dei Galla e Sidama (AOI)', adminTitle: 'Capoluogo Gimma' },
    somalia: { historicalName: 'Governo della Somalia', adminTitle: 'Governo della Somalia (AOI)' },
    italian_somaliland: { historicalName: 'Governo della Somalia', adminTitle: 'Governo della Somalia (AOI)' },
    somaliland: { historicalName: 'Governo della Somalia', adminTitle: 'Governo della Somalia (AOI)' },
    somalia_italiana: { historicalName: 'Somalia Italiana', adminTitle: 'Colonia della Somalia Italiana' },
    mogadishu: { historicalName: 'Mogadiscio', adminTitle: 'Capitale della Somalia Italiana' },
    kismayo: { historicalName: 'Chisimaio (Oltregiuba)', adminTitle: 'Commissariato dell\'Oltregiuba' },

    // Rivendicazioni / Occupazioni
    savoie: { historicalName: 'Savoia', adminTitle: 'Zona di Occupazione Italiana (1940)' },
    nice: { historicalName: 'Nizza', adminTitle: 'Zona di Occupazione Italiana (1940)' },
    corsica: { historicalName: 'Corsica', adminTitle: 'Rivendicazione / Occupazione' },
    menton: { historicalName: 'Mentone', adminTitle: 'Annessa al Regno d\'Italia (giu 1940)' },
  },

  // ================= UNIONE SOVIETICA (SOV) =================
  SOV: {
    moscow: { historicalName: 'Moskva (Kreml)', adminTitle: 'Stolitsa SSSR i RSFSR (Moskovskaya oblast)', historicalNote: 'Centro nevralgico del potere sovietico, sede del Cremlino, del Sovnarkom e del Segretario Generale Iosif Stalin; immenso distretto per la produzione bellica.' },
    moskva: { historicalName: 'Moskva (Kreml)', adminTitle: 'Stolitsa SSSR i RSFSR (Moskovskaya oblast)', historicalNote: 'Centro nevralgico del potere sovietico, sede del Cremlino, del Sovnarkom e del Segretario Generale Iosif Stalin.' },
    saint_petersburg: { historicalName: 'Leningrad (Sankt-Peterburg)', adminTitle: 'Leningradskaya oblast (RSFSR)', historicalNote: 'Seconda capitale dell\'URSS e culla della Rivoluzione d\'Ottobre; colosso industriale militare (Officine Kirov, carri pesanti KV-1, cantieri navali del Baltico).' },
    peterburg: { historicalName: 'Leningrad (Sankt-Peterburg)', adminTitle: 'Leningradskaya oblast (RSFSR)', historicalNote: 'Seconda capitale dell\'URSS e colosso dell\'industria pesante bellica.' },
    leningrad: { historicalName: 'Leningrad', adminTitle: 'Leningradskaya oblast (Vtoraya Stolitsa SSSR)', historicalNote: 'Seconda capitale dell\'URSS, Officine Kirov e cantieri navali del Baltico.' },
    volgograd: { historicalName: 'Stalingrad (Volga)', adminTitle: 'Stalingradskaya oblast (RSFSR)', historicalNote: 'Polo industriale sul basso Volga: Fabbrica di Trattori (STZ, carri T-34), acciaierie Ottobre Rosso e officine Barrikady.' },
    stalingrad: { historicalName: 'Stalingrad (Volga)', adminTitle: 'Stalingradskaya oblast (RSFSR)', historicalNote: 'Polo industriale sul basso Volga: Fabbrica di Trattori (STZ, carri T-34), acciaierie Ottobre Rosso e officine Barrikady.' },
    yekaterinburg: { historicalName: 'Sverdlovsk (Uralmash)', adminTitle: 'Sverdlovskaya oblast (RSFSR)', historicalNote: 'Capitale industriale degli Urali: colosso metallurgico Uralmash, cannoni e scafi corazzati d\'artiglieria pesante.' },
    sverdlovsk: { historicalName: 'Sverdlovsk (Uralmash)', adminTitle: 'Sverdlovskaya oblast (RSFSR)', historicalNote: 'Capitale industriale degli Urali: colosso metallurgico Uralmash, cannoni e scafi corazzati d\'artiglieria pesante.' },
    samara: { historicalName: 'Kuybyshev (Samara)', adminTitle: 'Kuybyshevskaya oblast (RSFSR)', historicalNote: 'Capitale alternativa di evacuazione designata per il governo sovietico, polo aeronautico e snodo fluviale sul Volga.' },
    kuybyshev: { historicalName: 'Kuybyshev (Samara)', adminTitle: 'Kuybyshevskaya oblast (RSFSR)', historicalNote: 'Capitale alternativa di evacuazione designata per il governo sovietico, polo aeronautico e snodo fluviale sul Volga.' },
    nizhny_novgorod: { historicalName: 'Gorkiy (Nizhny Novgorod)', adminTitle: 'Gorkovskaya oblast (RSFSR)', historicalNote: 'Sede del complesso automobilistico GAZ (autocarri e blindati), cannoni ZiS e cantieri navali Krasnoye Sormovo.' },
    gorkiy: { historicalName: 'Gorkiy (Nizhny Novgorod)', adminTitle: 'Gorkovskaya oblast (RSFSR)', historicalNote: 'Sede del complesso automobilistico GAZ (autocarri e blindati), cannoni ZiS e cantieri navali Krasnoye Sormovo.' },
    tver: { historicalName: 'Kalinin (Tver)', adminTitle: 'Kalininskaya oblast (RSFSR)', historicalNote: 'Nodo ferroviario e industriale sulla direttrice strategica Mosca-Leningrado.' },
    kalinin: { historicalName: 'Kalinin (Tver)', adminTitle: 'Kalininskaya oblast (RSFSR)', historicalNote: 'Nodo ferroviario e industriale sulla direttrice strategica Mosca-Leningrado.' },
    tula: { historicalName: 'Tula (Arsenal)', adminTitle: 'Tulskaya oblast (RSFSR)', historicalNote: 'Capitale delle armi da fuoco della Russia: Fabbrica d\'Armi di Tula, fucili Mosin-Nagant e pistole Tokarev TT-33.' },
    smolensk: { historicalName: 'Smolensk (Dnepr)', adminTitle: 'Smolenskaya oblast (RSFSR)', historicalNote: 'Baluardo a presidio del varco occidentale verso Mosca sul fiume Dnepr e sede del Distretto Militare Occidentale.' },
    voronezh: { historicalName: 'Voronezh', adminTitle: 'Voronezhskaya oblast (RSFSR)', historicalNote: 'Polo aeronautico No. 18 (culla dell\'aereo d\'attacco al suolo Il-2 Šturmovik) e motoristica pesante.' },
    kursk: { historicalName: 'Kursk & Orel', adminTitle: 'Kurskaya oblast (RSFSR)', historicalNote: 'Epicentro dell\'Anomalia Magnetica di Kursk (KMA), il più ricco bacino ferrifero del pianeta.' },
    pskov: { historicalName: 'Pskov', adminTitle: 'Leningradskaya oblast (Pskovskiy UR)', historicalNote: 'Pilastro settentrionale del Distretto Fortificato di Pskov lungo la Linea Stalin.' },
    novgorod: { historicalName: 'Novgorod', adminTitle: 'Leningradskaya oblast (Novgorodskiy rayon)', historicalNote: 'Storico centro sul fiume Volkhov e snodo delle comunicazioni tra Mosca e Leningrado.' },
    luga: { historicalName: 'Luga', adminTitle: 'Leningradskaya oblast (Luzhskiy rayon)', historicalNote: 'Settore chiave a sud di Leningrado lungo il fiume Luga.' },
    gatchina: { historicalName: 'Krasnogvardeysk', adminTitle: 'Leningradskaya oblast', historicalNote: 'Città satellite meridionale di Leningrado ribattezzata Krasnogvardeysk (1929-1944).' },
    kingisepp: { historicalName: 'Kingisepp', adminTitle: 'Leningradskaya oblast', historicalNote: 'Piazzaforte confinaria sovietica affacciata sul confine con l\'Estonia.' },
    slantsy: { historicalName: 'Slantsy', adminTitle: 'Leningradskaya oblast', historicalNote: 'Bacino estrattivo degli scisti bituminosi della regione di Leningrado.' },
    tosno: { historicalName: 'Tosno', adminTitle: 'Leningradskaya oblast', historicalNote: 'Snodo ferroviario strategico della linea Mosca-Leningrado.' },
    perm: { historicalName: 'Molotov (Perm)', adminTitle: 'Molotovskaya oblast (RSFSR)', historicalNote: 'Ribattezzata Molotov nel 1940; polo chimico e motori aeronautici Švecov No. 19.' },
    chelyabinsk: { historicalName: 'Chelyabinsk (ChTZ)', adminTitle: 'Chelyabinskaya oblast (Kombinat Tankograd)', historicalNote: 'Sede della Fabbrica di Trattori di Čeljabinsk (ChTZ), polo pilota che diventerà il complesso "Tankograd" (carri pesanti KV).' },
    magnitogorsk: { historicalName: 'Magnitogorsk', adminTitle: 'Magnitogorskiy Metallurgicheskiy Kombinat (MMK)', historicalNote: 'Il più imponente combinato siderurgico del mondo; fornì l\'acciaio per la metà dei carri e proiettili sovietici.' },
    kazan: { historicalName: 'Kazan (Tatarskaya ASSR)', adminTitle: 'Tatarskaya ASSR (RSFSR)', historicalNote: 'Capitale della RSSA Tatara; fabbriche aeronautiche No. 124 (bombardieri Pe-8 e Pe-2) e polverifici.' },
    ufa: { historicalName: 'Ufa (Bashkirskaya ASSR)', adminTitle: 'Bashkirskaya ASSR (Vtoroy Baku)', historicalNote: 'Capitale della Baschiria e cuore del bacino petrolifero Volga-Urali ("Seconda Baku").' },
    kronshtadt: { historicalName: 'Kronshtadt (Kotlin)', adminTitle: 'Glavnaya Baza Baltiyskogo Flota', historicalNote: 'Fortezza navale insulare a sbarramento della Baia della Neva; quartier generale della Flotta del Baltico.' },
    murmansk: { historicalName: 'Murmansk & Polyarnyy', adminTitle: 'Glavnaya Baza Severnogo Flota (Murmanskaya oblast)', historicalNote: 'Unico porto artico libero dai ghiacci tutto l\'anno grazie alla Corrente del Golfo; base centrale della Flotta del Nord.' },
    arkhangelsk: { historicalName: 'Arkhangelsk (Severnaya Dvina)', adminTitle: 'Arkhangelskaya oblast (Severnyy Morskiy Put)', historicalNote: 'Porto sul Mar Bianco, centro dell\'industria forestale e testa di ponte della Rotta Marittima del Nord.' },
    vladivostok: { historicalName: 'Vladivostok (Zolotoy Rog)', adminTitle: 'Glavnaya Baza Tikhookeanskogo Flota', historicalNote: 'Capolinea della ferrovia Transiberiana e quartier generale della Flotta del Pacifico sovietica.' },
    kiev: { historicalName: 'Kiev (Ukrainskaya SSR)', adminTitle: 'Stolitsa Ukrainskoy SSR (Kiyevskiy UR)', historicalNote: 'Capitale della RSS Ucraina dal 1934 e perno del Distretto Fortificato di Kiev (KiUR) lungo la Linea Stalin.' },
    kharkov: { historicalName: 'Kharkov', adminTitle: 'KhPZ Zavod No. 183 (Malyshev)', historicalNote: 'Polo centrale dell\'ingegneria meccanica sovietica: culla dello sviluppo del carro armato medio T-34 (Koškin e Morozov).' },
    minsk: { historicalName: 'Minsk (Belorusskaya SSR)', adminTitle: 'Stolitsa Belorusskoy SSR (Minskiy UR)', historicalNote: 'Capitale della RSS Bielorussa e perno del Distretto Militare Speciale Occidentale lungo la Linea Stalin.' },
    dnepropetrovsk: { historicalName: 'Dnepropetrovsk', adminTitle: 'Dnepropetrovskaya oblast (Ukrainskaya SSR)', historicalNote: 'Polo metallurgico monumentale alimentato dalla centrale idroelettrica DneproGES.' },
    zaporozhye: { historicalName: 'Zaporozhye (DneproGES)', adminTitle: 'Zaporozhskaya oblast (Ukrainskaya SSR)', historicalNote: 'Sito della diga idroelettrica DneproGES, la più grande d\'Europa, e del combinato di acciai speciali Zaporozhstal.' },
    odessa: { historicalName: 'Odessa (Chernomorskaya Baza)', adminTitle: 'Odesskaya oblast (Ukrainskaya SSR)', historicalNote: 'Porto principale sul Mar Nero per l\'esportazione del grano e base ausiliaria della Flotta del Mar Nero.' },
    sevastopol: { historicalName: 'Sevastopol (Krymskaya ASSR)', adminTitle: 'Glavnaya Baza Chernomorskogo Flota (RSFSR)', historicalNote: 'Quartier generale e piazzaforte navale della Flotta del Mar Nero protetta dalle batterie costiere corazzate Maksim Gor\'kij.' },
    krivoy_rog: { historicalName: 'Krivoy Rog (Kryvbas)', adminTitle: 'Dnepropetrovskaya oblast (Krivorozhstal)', historicalNote: 'Il più ricco bacino ferrifero dell\'URSS; combinato minerario a cielo aperto integrato col Donbass.' },
    luhansk: { historicalName: 'Voroshilovgrad (Lugansk)', adminTitle: 'Voroshilovgradskaya oblast (Ukrainskaya SSR)', historicalNote: 'Ribattezzata nel 1935 in onore di Kliment Vorošilov; Fabbrica di Locomotive d\'Ottobre.' },
    donetsk: { historicalName: 'Stalino (Donetsk)', adminTitle: 'Stalinskaya oblast (Ukrainskaya SSR)', historicalNote: 'Capitale del bacino carbonifero del Donbass: carbone coke e altiforni siderurgici.' },
    rostov: { historicalName: 'Rostov-na-Donu', adminTitle: 'Rostovskaya oblast (Vorota Kavkaza)', historicalNote: 'La "Porta del Caucaso" sul fiume Don e sede della colossale fabbrica di macchine agricole Rostselmash.' },
    grozny: { historicalName: 'Grozny (Severnyy Kavkaz)', adminTitle: 'Checheno-Ingushskaya ASSR (Grozneft)', historicalNote: 'Secondo bacino petrolifero strategico della Russia sovietica con raffinerie collegate da oleodotto a Tuapse.' },
    baku: { historicalName: 'Baku (Neftyanoy Tsentr)', adminTitle: 'Stolitsa Azerbaydzhanskoy SSR', historicalNote: 'I campi petroliferi di Baku estraevano oltre il 70% del greggio dell\'intera URSS; bersaglio dell\'Operazione Pike (1940).' },
    tbilisi: { historicalName: 'Tbilisi (Gruzinskaya SSR)', adminTitle: 'Stolitsa Gruzinskoy SSR', historicalNote: 'Capitale storica della Georgia e perno amministrativo e culturale della Transcaucasia.' },
    yerevan: { historicalName: 'Yerevan (Armyanskaya SSR)', adminTitle: 'Stolitsa Armyanskoy SSR', historicalNote: 'Capitale della RSS Armena ai piedi del Monte Ararat, polo chimico sintetico ed estrattivo del rame.' },
    tashkent: { historicalName: 'Tashkent (Uzbekskaya SSR)', adminTitle: 'Stolitsa Uzbekskoy SSR', historicalNote: 'Capitale della RSS Uzbeka e quartier generale del Distretto Militare dell\'Asia Centrale; polo del cotone strategico.' },
    alma_ata: { historicalName: 'Alma-Ata (Kazakhskaya SSR)', adminTitle: 'Stolitsa Kazakhskoy SSR', historicalNote: 'Capitale della RSS Kazaka (elevata a repubblica dell\'Unione nel 1936), ricca di giacimenti di carbone e rame.' },
    vladikavkaz: { historicalName: 'Ordzhonikidze', adminTitle: 'Severo-Osetinskaya ASSR (RSFSR)', historicalNote: 'Capoluogo dell\'Ossezia Settentrionale lungo la Strada Militare Georgiana.' },
    vyatka: { historicalName: 'Kirov', adminTitle: 'Kirovskaya oblast (RSFSR)', historicalNote: 'Ribattezzata nel 1934 in onore di Sergej Kirov; polo manifatturiero e ferroviario.' },

    // Kresy orientali annesse (1939)
    lviv: { historicalName: 'Lvov (Lviv)', adminTitle: 'Lvovskaya oblast (Ukrainskaya SSR)', historicalNote: 'Storica capitale della Galizia orientale annessa all\'URSS nel settembre 1939.' },
    lwow: { historicalName: 'Lvov (Lviv)', adminTitle: 'Lvovskaya oblast (Ukrainskaya SSR)', historicalNote: 'Storica capitale della Galizia orientale annessa all\'URSS nel settembre 1939.' },
    vilnius: { historicalName: 'Vilnyus', adminTitle: 'Litovskaya SSR', historicalNote: 'Capitale della RSS Lituana (incorporata nel 1940).' },
    wilno: { historicalName: 'Vilnyus', adminTitle: 'Litovskaya SSR', historicalNote: 'Capitale della RSS Lituana (incorporata nel 1940).' },
    brest: { historicalName: 'Brest (Brest-Litovsk)', adminTitle: 'Brestskaya oblast (Belorusskaya SSR)', historicalNote: 'Fortezza di Brest e sito della parata congiunta tedesco-sovietica del 22 settembre 1939.' },
    bresckaja: { historicalName: 'Brest (Brest-Litovsk)', adminTitle: 'Brestskaya oblast (Belorusskaya SSR)', historicalNote: 'Fortezza di Brest e caposaldo fortificato sulla Linea Molotov.' },
    grodno: { historicalName: 'Grodno', adminTitle: 'Belostokskaya oblast (Belorusskaya SSR)', historicalNote: 'Nodo ferroviario e fortificato sul fiume Nemunas incorporato nella RSS Bielorussa.' },
    hrodna: { historicalName: 'Grodno', adminTitle: 'Belostokskaya oblast (Belorusskaya SSR)', historicalNote: 'Nodo ferroviario e fortificato incorporato nella RSS Bielorussa.' },
    volkovysk: { historicalName: 'Volkovysk', adminTitle: 'Belostokskaya oblast (Belorusskaya SSR)', historicalNote: 'Distretto della Bielorussia occidentale annesso nel 1939.' },
    vawkavysk: { historicalName: 'Volkovysk', adminTitle: 'Belostokskaya oblast (Belorusskaya SSR)', historicalNote: 'Distretto della Bielorussia occidentale annesso nel 1939.' },
    druskininkai: { historicalName: 'Druskininkai', adminTitle: 'Belorusskaya SSR / Litovskaya SSR', historicalNote: 'Area termale contesa al confine tra Bielorussia e Lituania.' },
    lida: { historicalName: 'Lida', adminTitle: 'Baranovitskaya oblast (Belorusskaya SSR)', historicalNote: 'Snodo ferroviario strategico annesso alla RSS Bielorussa.' },
    slonim: { historicalName: 'Slonim', adminTitle: 'Baranovitskaya oblast (Belorusskaya SSR)', historicalNote: 'Città storica annessa alla RSS Bielorussa nel 1939.' },
    nowogrodek: { historicalName: 'Novogrudok', adminTitle: 'Baranovitskaya oblast (Belorusskaya SSR)', historicalNote: 'Centro storico incorporato nella RSS Bielorussa.' },
    navahrudak: { historicalName: 'Novogrudok', adminTitle: 'Baranovitskaya oblast (Belorusskaya SSR)', historicalNote: 'Centro storico incorporato nella RSS Bielorussa.' },
    molodechno: { historicalName: 'Molodechno', adminTitle: 'Vileyskaya oblast (Belorusskaya SSR)', historicalNote: 'Nodo ferroviario della Bielorussia nord-occidentale.' },
    braslav: { historicalName: 'Braslav', adminTitle: 'Vileyskaya oblast (Belorusskaya SSR)', historicalNote: 'Regione dei laghi annessa alla RSS Bielorussa nel 1939.' },
    ternopil: { historicalName: 'Ternopol', adminTitle: 'Ternopolskaya oblast (Ukrainskaya SSR)', historicalNote: 'Capoluogo della Podolia occidentale annesso alla RSS Ucraina nel 1939.' },
    stanislav: { historicalName: 'Stanislav (Ivano-Frankivsk)', adminTitle: 'Stanislavskaya oblast (Ukrainskaya SSR)', historicalNote: 'Capoluogo della Galizia pedemontana annesso alla RSS Ucraina nel 1939.' },
    ivano_frankivsk: { historicalName: 'Stanislav', adminTitle: 'Stanislavskaya oblast (Ukrainskaya SSR)', historicalNote: 'Capoluogo annesso alla RSS Ucraina nel 1939.' },
    rivne: { historicalName: 'Rovno', adminTitle: 'Rovnenskaya oblast (Ukrainskaya SSR)', historicalNote: 'Centro principale della Volinia orientale annesso nel 1939.' },
    lutsk: { historicalName: 'Lutsk', adminTitle: 'Volynskaya oblast (Ukrainskaya SSR)', historicalNote: 'Capoluogo della Volinia occidentale annesso alla RSS Ucraina nel 1939.' },
    pinsk: { historicalName: 'Pinsk (Polessye)', adminTitle: 'Pinskaya oblast (Belorusskaya SSR)', historicalNote: 'Cuore delle paludi del Pryp\'jat\' e base della Flottiglia Fluviale di Pinsk.' },
    baranovichi: { historicalName: 'Baranovichi', adminTitle: 'Baranovitskaya oblast (Belorusskaya SSR)', historicalNote: 'Nodo ferroviario primario tra Varsavia, Mosca e Vilnius.' },
    drohobych: { historicalName: 'Drogobych (Borislav)', adminTitle: 'Drogobychskaya oblast (Ukrainskaya SSR)', historicalNote: 'Giacimenti petroliferi dei Carpazi annessi alla RSS Ucraina nel 1939.' },
    boryslav: { historicalName: 'Borislav', adminTitle: 'Drogobychskaya oblast (Ukrainskaya SSR)', historicalNote: 'Bacino estrattivo di petrolio e ozocerite della Galizia.' },

    // Bessarabia & Bucovina Settentrionale (1940)
    chisinau: { historicalName: 'Kishinev', adminTitle: 'Moldavskaya SSR', historicalNote: 'Capitale della RSS Moldava istituita nell\'agosto 1940.' },
    moldova: { historicalName: 'Kishinev (Bessarabiya)', adminTitle: 'Moldavskaya SSR', historicalNote: 'Bessarabia annessa all\'URSS a seguito dell\'ultimatum del giugno 1940.' },
    chernivtsi: { historicalName: 'Chernovtsy', adminTitle: 'Chernovitskaya oblast (Ukrainskaya SSR)', historicalNote: 'Bucovina settentrionale annessa all\'URSS nel giugno 1940.' },
    cernauti: { historicalName: 'Chernovtsy', adminTitle: 'Chernovitskaya oblast (Ukrainskaya SSR)', historicalNote: 'Capoluogo della Bucovina annesso alla RSS Ucraina.' },
    cetatea_alba: { historicalName: 'Akkerman (Bilhorod-Dnistrovskyi)', adminTitle: 'Akkermanskaya oblast (Ukrainskaya SSR)', historicalNote: 'Fortezza storica alla foce del Dnestr incorporata nell\'URSS nel 1940.' },
    izmail: { historicalName: 'Izmail (Danubio)', adminTitle: 'Akkermanskaya oblast (Ukrainskaya SSR)', historicalNote: 'Porto fortificato sul Delta del Danubio e base della Flottiglia del Danubio.' },
    balti: { historicalName: 'Beltsy', adminTitle: 'Moldavskaya SSR', historicalNote: 'Importante centro agricolo e manifatturiero della Moldavia settentrionale.' },

    // Stati Baltici annessi (1940)
    tallinn: { historicalName: 'Tallin (Estonskaya SSR)', adminTitle: 'Stolitsa Estonskoy SSR', historicalNote: 'Capitale dell\'Estonia sovietica e base avanzata della Flotta del Baltico.' },
    riga: { historicalName: 'Riga (Latviyskaya SSR)', adminTitle: 'Stolitsa Latviyskoy SSR', historicalNote: 'Capitale della Lettonia sovietica e grande porto alla foce della Daugava.' },
    kaunas: { historicalName: 'Kaunas (Litovskaya SSR)', adminTitle: 'Litovskaya SSR', historicalNote: 'Capitale provvisoria della Lituania fino all\'incorporazione nell\'URSS (estate 1940).' },
    klaipeda_sov: { historicalName: 'Klaypeda', adminTitle: 'Litovskaya SSR', historicalNote: 'Porto di Memel/Klaipeda rivendicato dalla Lituania sovietica.' },

    // Finlandia: Carelia & Petsamo (1940)
    karelia: { historicalName: 'Vyborg & Karelo-Finskaya SSR', adminTitle: 'Karelo-Finskaya SSR', historicalNote: 'Territori ceduti dalla Finlandia all\'URSS con il Trattato di Mosca (marzo 1940).' },
    viipuri: { historicalName: 'Vyborg (Viipuri)', adminTitle: 'Karelo-Finskaya SSR', historicalNote: 'Seconda città della Finlandia, annessa all\'URSS nel marzo 1940.' },
    petsamo: { historicalName: 'Pechenga (Petsamo)', adminTitle: 'Murmanskaya oblast (RSFSR)', historicalNote: 'Corridoio artico con ricche miniere di nichel strategico.' },
    sortavala: { historicalName: 'Sortavala (Lago Ladoga)', adminTitle: 'Karelo-Finskaya SSR', historicalNote: 'Porto settentrionale sul Lago Ladoga annesso all\'URSS nel 1940.' },
    petrozavodsk: { historicalName: 'Petrozavodsk', adminTitle: 'Stolitsa Karelo-Finskoy SSR', historicalNote: 'Capitale della Repubblica Karelo-Finlandese (12ª Repubblica dell\'URSS) sul Lago Onega.' },
  },

  // ================= REPUBBLICA DI POLONIA (POL) =================
  POL: {
    warszawa: {
      historicalName: 'Warszawa (Stolica Polski)',
      adminTitle: 'Stolica Rzeczypospolitej Polskiej',
      historicalNote: 'Capitale della Seconda Repubblica di Polonia, sede del Presidente Ignacy Mościcki, del Sejm e del Castello Reale; centro politico, culturale e strategico della nazione, martoriata dall\'assedio della Wehrmacht nel settembre 1939.',
    },
    krakow: {
      historicalName: 'Kraków (Wawel)',
      adminTitle: 'Województwo Krakowskie',
      historicalNote: 'Antica capitale reale sul fiume Vistola dominata dalla cattedrale e dal castello del Wawel; sede della prestigiosa Università Jagellonica e perno dell\'Armia Kraków.',
    },
    poznan: {
      historicalName: 'Poznań (Wielkopolska)',
      adminTitle: 'Województwo Poznańskie',
      historicalNote: 'Cuore storico della Grande Polonia e culla dello Stato polacco; polo industriale, agricolo e snodo ferroviario di prima grandezza, presidiato dall\'Armia Poznań del gen. Kutrzeba.',
    },
    gdansk: {
      historicalName: 'Gdynia / Wybrzeże',
      adminTitle: 'Województwo Pomorskie (Gdynia)',
      historicalNote: 'Il grande porto marittimo polacco sul Mar Baltico costruito dal nulla negli anni \'20 per aggirare la Città Libera di Danzica; quartier generale della marina da guerra (Marynarka Wojenna).',
    },
    puck: {
      historicalName: 'Puck (Mierzeja Helska)',
      adminTitle: 'Województwo Pomorskie (Rejon Umocniony Hel)',
      historicalNote: 'Base aeronavale e idroscalo della marina polacca; punto di controllo della penisola fortificata di Hel guidata dal contrammiraglio Józef Unrug, che resistette fino al 2 ottobre 1939.',
    },
    torun: {
      historicalName: 'Toruń',
      adminTitle: 'Stolica Województwa Pomorskiego',
      historicalNote: 'Capoluogo amministrativo del Corridoio di Pomerania sulle rive della Vistola, celebre piazzaforte storica e centro di mobilitazione dell\'Armia Pomorze.',
    },
    bydgoszcz: {
      historicalName: 'Bydgoszcz',
      adminTitle: 'Województwo Pomorskie',
      historicalNote: 'Grande polo industriale e manifatturiero sul canale Bydgoszcz; teatro della "Domenica di Sangue" (Krwawa niedziela) all\'inizio dell\'invasione tedesca nel settembre 1939.',
    },
    katowice: {
      historicalName: 'Katowice (Śląsk)',
      adminTitle: 'Autonomiczne Województwo Śląskie',
      historicalNote: 'Cuore minerario e siderurgico dell\'Alta Slesia polacca, dotato di parlamento autonomo (Sejm Śląski); vitale bacino carbo-siderurgico presidiato dall\'Armia Śląsk.',
    },
    cieszyn: {
      historicalName: 'Cieszyn Zachodni (Zaolzie)',
      adminTitle: 'Autonomiczne Województwo Śląskie (Zaolzie)',
      historicalNote: 'Regione transfrontaliera ricca di altiforni e bacini carboniferi di Karviná, riannessa dalla Polonia nell\'ottobre 1938 a seguito della crisi di Monaco.',
    },
    lviv: {
      historicalName: 'Lwów (Semper Fidelis / Kresy)',
      adminTitle: 'Województwo Lwowskie',
      historicalNote: 'Metropoli storica della Galizia orientale e capitale culturale dei Kresy; sede dell\'Università Jan Kazimierz e del Politecnico. Nel settembre 1939 respinse la Wehrmacht tedesca prima di arrendersi all\'Armata Rossa il 22 settembre, venendo annessa alla RSS Ucraina.',
    },
    lwow: {
      historicalName: 'Lwów (Semper Fidelis)',
      adminTitle: 'Województwo Lwowskie',
      historicalNote: 'Metropoli storica della Galizia orientale e capitale culturale dei Kresy; sede dell\'Università Jan Kazimierz e del Politecnico. Nel settembre 1939 respinse la Wehrmacht tedesca prima di arrendersi all\'Armata Rossa il 22 settembre, venendo annessa alla RSS Ucraina.',
    },
    vilnius: {
      historicalName: 'Wilno (Ostra Brama / Kresy Północne)',
      adminTitle: 'Województwo Wileńskie',
      historicalNote: 'Capitale settentrionale dei Kresy e santuario della Madonna di Ostra Brama; sede dell\'Università Stefan Batory. Occupata dall\'URSS il 19 settembre 1939, fu ceduta alla Lituania il 10 ottobre 1939 prima dell\'annessione totale sovietica del giugno 1940.',
    },
    wilno: {
      historicalName: 'Wilno (Ostra Brama / Kresy Północne)',
      adminTitle: 'Województwo Wileńskie',
      historicalNote: 'Capitale settentrionale dei Kresy e santuario della Madonna di Ostra Brama; sede dell\'Università Stefan Batory. Occupata dall\'URSS il 19 settembre 1939, fu ceduta alla Lituania il 10 ottobre 1939 prima dell\'annessione totale sovietica del giugno 1940.',
    },
    brest: {
      historicalName: 'Brześć nad Bugiem (Twierdza Brześć)',
      adminTitle: 'Województwo Poleskie',
      historicalNote: 'Capoluogo del Polesie e colossale fortezza ottocentesca sul Bug. Difesa strenuamente dal gen. Konstanty Plisowski contro il XIX Corpo corazzato di Guderian (14-17 settembre 1939), fu teatro della parata militare congiunta nazi-sovietica il 22 settembre 1939.',
    },
    pinsk: {
      historicalName: 'Pińsk (Polesie / Flotylla Pińska)',
      adminTitle: 'Województwo Poleskie',
      historicalNote: 'Capitale del labirinto fluviale delle Paludi del Prypeć e base navale della leggendaria Flottiglia Fluviale della marina polacca (Flotylla Pińska), dotata di monitori corazzati e cannoniere.',
    },
    grodno: {
      historicalName: 'Grodno (Niemen)',
      adminTitle: 'Województwo Białostockie',
      historicalNote: 'Storica città reale sul fiume Niemen; dal 20 al 22 settembre 1939 soldati polacchi, guardie di frontiera (KOP), boy-scout e civili opposero un\'eroica e disperata resistenza urbana contro i carri armati dell\'Armata Rossa sovietica.',
    },
    hrodna: {
      historicalName: 'Grodno (Niemen)',
      adminTitle: 'Województwo Białostockie',
      historicalNote: 'Storica città reale sul fiume Niemen; teatro dell\'eroica difesa urbana del settembre 1939 contro i blindati del XV Corpo Corazzato dell\'Armata Rossa.',
    },
    volkovysk: {
      historicalName: 'Wołkowysk',
      adminTitle: 'Województwo Białostockie',
      historicalNote: 'Importante nodo ferroviario strategico verso Bialystok, Brest e Vilnius; sede del Reggimento di Cavalleria Wołkowysk.',
    },
    wolkowysk: {
      historicalName: 'Wołkowysk',
      adminTitle: 'Województwo Białostockie',
      historicalNote: 'Importante nodo ferroviario strategico verso Bialystok, Brest e Vilnius; sede del Reggimento di Cavalleria Wołkowysk.',
    },
    vawkavysk: {
      historicalName: 'Wołkowysk',
      adminTitle: 'Województwo Białostockie',
      historicalNote: 'Importante nodo ferroviario strategico verso Bialystok, Brest e Vilnius; sede del Reggimento di Cavalleria Wołkowysk.',
    },
    druskininkai: {
      historicalName: 'Druskieniki (Niemen)',
      adminTitle: 'Województwo Białostockie',
      historicalNote: 'Celebre stazione termale sul fiume Niemen, residenza estiva del Maresciallo Józef Piłsudski nel periodo interbellico.',
    },
    druskieniki: {
      historicalName: 'Druskieniki (Niemen)',
      adminTitle: 'Województwo Białostockie',
      historicalNote: 'Celebre stazione termale sul fiume Niemen, residenza estiva del Maresciallo Józef Piłsudski nel periodo interbellico.',
    },
    swislocz: {
      historicalName: 'Świsłocz (Puszcza Białowieska)',
      adminTitle: 'Województwo Białostockie',
      historicalNote: 'Porta d\'accesso settentrionale alla foresta primordiale di Białowieża; centro forestale e artigianale del legno.',
    },
    braslaw: {
      historicalName: 'Brasław (Kraina Jezior Brasławskich)',
      adminTitle: 'Województwo Wileńskie',
      historicalNote: 'Regione pittoresca dei grandi laghi morenici al confine con la Lettonia e l\'URSS; presidiata dal Battaglione KOP "Brasław".',
    },
    dzisna: {
      historicalName: 'Dzisna (Dźwina)',
      adminTitle: 'Województwo Wileńskie',
      historicalNote: 'Città di frontiera sulla riva meridionale della Dvina Occidentale (Dźwina), di fronte al territorio sovietico; presidio di confine del KOP.',
    },
    molodeczno: {
      historicalName: 'Mołodeczno (Brama Mińska)',
      adminTitle: 'Województwo Wileńskie',
      historicalNote: 'Snodo ferroviario vitale lungo la direttrice Wilno-Minsk; porta orientale della Wileńszczyzna presidiata dall\'86° Reggimento Fanteria.',
    },
    glebokie: {
      historicalName: 'Głębokie',
      adminTitle: 'Województwo Wileńskie',
      historicalNote: 'Sede del comando del Reggimento KOP "Głębokie", con il convento carmelitano barocco e la guarnigione corazzata di frontiera.',
    },
    troki: {
      historicalName: 'Troki (Zamek na Wyspie)',
      adminTitle: 'Województwo Wileńskie',
      historicalNote: 'Antica capitale dei Granduchi di Lituania col celebre castello insulare sul lago Galvė; centro storico della comunità dei Karaiti.',
    },
    trakai: {
      historicalName: 'Troki (Zamek na Wyspie)',
      adminTitle: 'Województwo Wileńskie',
      historicalNote: 'Antica capitale dei Granduchi di Lituania col celebre castello insulare sul lago Galvė; centro storico della comunità dei Karaiti.',
    },
    tarnopol: {
      historicalName: 'Tarnopol (Podole Zachodnie)',
      adminTitle: 'Województwo Tarnopolskie',
      historicalNote: 'Capoluogo del Podole polacco sul fiume Seret; forte guarnigione della 12ª Divisione Fanteria e della Brigata di Cavalleria Podolska, a guardia del confine di Riga.',
    },
    stanislawow: {
      historicalName: 'Stanisławów (Pokucie / Karpaty)',
      adminTitle: 'Województwo Stanisławowskie',
      historicalNote: 'Capitale del Pokucie ai piedi dei monti Gorgany e Čornohora (Carpazi orientali); nodo strategico della "Testa di ponte rumena" (Przedmoście Rumuńskie) del settembre 1939.',
    },
    luck: {
      historicalName: 'Łuck (Wołyń / Zamek Lubarta)',
      adminTitle: 'Województwo Wołyńskie',
      historicalNote: 'Capoluogo della Volinia cinto dalle anse del fiume Styr e dominato dal castello medievale del principe Lubart; centro amministrativo ed episcopale.',
    },
    rowne: {
      historicalName: 'Równe (Wołyń Środkowy)',
      adminTitle: 'Województwo Wołyńskie',
      historicalNote: 'Il più grande centro commerciale e snodo ferroviario della Volinia verso Kiev; sede del comando del Settore KOP "Równe" e della guarnigione della 13ª Divisione Fanteria.',
    },
    sarny: {
      historicalName: 'Sarny (Rejon Umocniony Sarny)',
      adminTitle: 'Województwo Wołyńskie',
      historicalNote: 'Perno del Settore Fortificato di Sarny eretto lungo il fiume Słucz: oltre 170 bunker corazzati che opposero un\'eroica resistenza alla 60ª Divisione Fucilieri sovietica il 17-20 settembre 1939.',
    },
    nowogrodek: {
      historicalName: 'Nowogródek (Ziemia Nowogródzka)',
      adminTitle: 'Województwo Nowogródzkie',
      historicalNote: 'Capoluogo collinare dominato dalle rovine del castello medievale; patria del sommo poeta Adam Mickiewicz e sede della Brigata di Cavalleria Nowogródzka del gen. Anders.',
    },
    baranavichy: {
      historicalName: 'Baranowicze (Węzeł Kolejowy Kresów)',
      adminTitle: 'Województwo Nowogródzkie',
      historicalNote: 'Snodo ferroviario strategico e sede della potente stazione radiofonica Polskie Radio Baranowicze (1938); base logistica e di mobilitazione del KOP.',
    },
    baranowicze: {
      historicalName: 'Baranowicze (Węzeł Kolejowy Kresów)',
      adminTitle: 'Województwo Nowogródzkie',
      historicalNote: 'Snodo ferroviario strategico e sede della potente stazione radiofonica Polskie Radio Baranowicze (1938); base logistica e di mobilitazione del KOP.',
    },
    lida: {
      historicalName: 'Lida (Zamek Giedymina)',
      adminTitle: 'Województwo Nowogródzkie',
      historicalNote: 'Città fortezza trecentesca di Gedimino e aeroporto militare del 5° Reggimento Aereo della marina/aviazione polacca; snodo tra Wilno e la Volinia.',
    },
    slonim: {
      historicalName: 'Słonim (Szczara)',
      adminTitle: 'Województwo Nowogródzkie',
      historicalNote: 'Storica città dei principi Ogiński sul fiume Szczara; centro tessile, del legname e piazzaforte del KOP.',
    },
    drohobych: {
      historicalName: 'Drohobycz (Zagłębie Naftowe)',
      adminTitle: 'Województwo Lwowskie',
      historicalNote: 'Capitale amministrativa del bacino petrolifero galiziano; città natale di Bruno Schulz, con raffinerie all\'avanguardia ambite dal Terzo Reich e dall\'URSS.',
    },
    boryslav: {
      historicalName: 'Borysław (Polska Kalifornia)',
      adminTitle: 'Województwo Lwowskie',
      historicalNote: 'Epicentro dell\'estrazione petrolifera e del gas naturale della Galizia; forniva oltre il 70% dell\'oro nero della Seconda Repubblica di Polonia.',
    },
    sambir: {
      historicalName: 'Sambor (Dniestr Górny)',
      adminTitle: 'Województwo Lwowskie',
      historicalNote: 'Antica città fortificata sull\'alto Dnestr; nodo ferroviario verso la Rutenia e i valichi carpatici.',
    },
    rawaruska: {
      historicalName: 'Rawa Ruska (Roztocze)',
      adminTitle: 'Województwo Lwowskie',
      historicalNote: 'Grande nodo ferroviario e d\'interscambio al confine tra la Galizia e la regione di Lublino; teatro di aspri scontri nel settembre 1939.',
    },
    rawa_ruska: {
      historicalName: 'Rawa Ruska (Roztocze)',
      adminTitle: 'Województwo Lwowskie',
      historicalNote: 'Grande nodo ferroviario e d\'interscambio al confine tra la Galizia e la regione di Lublino; teatro di aspri scontri nel settembre 1939.',
    },
    brody: {
      historicalName: 'Brody (Brama Podolska)',
      adminTitle: 'Województwo Tarnopolskie',
      historicalNote: 'Storico emporio commerciale e baluardo di confine sulla linea del Trattato di Riga; base di reggimenti di cavalleria di frontiera.',
    },
    buczacz: {
      historicalName: 'Buczacz (Strypa)',
      adminTitle: 'Województwo Tarnopolskie',
      historicalNote: 'Splendida città barocca sul fiume Strypa col celebre municipio rococò di Meretyn e Pinzel; teatro di battaglie storiche tra polacchi, turchi e cosacchi.',
    },
    kremenets: {
      historicalName: 'Krzemieniec (Ateny Wołyńskie)',
      adminTitle: 'Województwo Wołyńskie',
      historicalNote: 'Celebre "Atene di Volinia" dominata dal monte della Regina Bona, con lo storico Liceo Krzemieniecki e il convento dei Gesuiti; rifugio temporaneo del Ministero degli Esteri polacco nel settembre 1939.',
    },
    dubno: {
      historicalName: 'Dubno (Zamek Ostrogskich)',
      adminTitle: 'Województwo Wołyńskie',
      historicalNote: 'Piazzaforte sull\'Ikva cinta dalle mura del castello dei duchi Ostrogski; snodo militare e depositi logistici della Volinia.',
    },
    kovel: {
      historicalName: 'Kowel (Polesie Wołyńskie)',
      adminTitle: 'Województwo Wołyńskie',
      historicalNote: 'Il più importante bivio ferroviario tra Varsavia, Kiev, Brest e Leopoli; quartier generale logistico delle armate orientali polacche.',
    },
    kolomyya: {
      historicalName: 'Kołomyja (Pokucie / Prut)',
      adminTitle: 'Województwo Stanisławowskie',
      historicalNote: 'Capitale del folklore e dell\'artigianato huculo sulla riva del Prut; snodo di transito strategico verso il confine romeno di Sniatyn.',
    },
    stryi: {
      historicalName: 'Stryj (Podkarpacie)',
      adminTitle: 'Województwo Stanisławowskie',
      historicalNote: 'Perno ferroviario dell\'avamposto carpatico verso il Passo di Užok e la Slovacchia; centro di produzione meccanica e concerie.',
    },
    chortkiv: {
      historicalName: 'Czortków (Podole)',
      adminTitle: 'Województwo Tarnopolskie',
      historicalNote: 'Baluardo podolico sul fiume Seret con il castello dei Goluchowski; nel gennaio 1940 fu teatro della prima insurrezione armata antisovietica clandestina in Polonia.',
    },
    zaleszczyki: {
      historicalName: 'Zaleszczyki (Dniestr / Przedmoście Rumuńskie)',
      adminTitle: 'Województwo Tarnopolskie',
      historicalNote: 'Celebre stazione climatica e balneare racchiusa nel meandro a canyon del fiume Dnestr al confine con la Romania; via di fuga ed evacuazione del governo polacco, del Presidente Mościcki e del gen. Rydz-Śmigły nel settembre 1939.',
    },
    bialystok: {
      historicalName: 'Białystok (Podlasie)',
      adminTitle: 'Województwo Białostockie',
      historicalNote: 'Grande polo tessile ("la Manchester del Nord") con il monumentale palazzo Branicki; occupata dalla Wehrmacht e poi ceduta ai sovietici che ne fecero il capoluogo dell\'oblast di Belostok.',
    },
    lublin: {
      historicalName: 'Lublin (Kozioróg)',
      adminTitle: 'Województwo Lubelskie',
      historicalNote: 'Antica capitale dell\'Unione di Polonia-Lituania (1569); sede dell\'Università Cattolica (KUL) e centro di convergenza delle riserve strategiche polacche nel settembre 1939.',
    },
    kielce: {
      historicalName: 'Kielce (Góry Świętokrzyskie)',
      adminTitle: 'Województwo Kieleckie',
      historicalNote: 'Capoluogo ai piedi dei Monti Świętokrzyskie; sede delle fabbriche d\'armamenti del Bacino Industriale Centrale (COP - Centralny Okręg Przemysłowy).',
    },
    lodz: {
      historicalName: 'Łódź (Miasto Fabryczne)',
      adminTitle: 'Województwo Łódzkie',
      historicalNote: 'La metropoli tessile per eccellenza della Polonia centrale, con colossali opifici in mattoni rossi; annessa direttamente al Reich nel 1939 e ribattezzata Litzmannstadt.',
    },
  },

  // ================= REGNO D'UNGHERIA (HUN) =================
  HUN: {
    budapest: { historicalName: 'Budapest', adminTitle: 'Magyar Királyság' },
    kosice: { historicalName: 'Kassa (Felvidék)', adminTitle: 'Abaúj-Torna vármegye (Első bécsi döntés, 1938)' },
    kosicky: { historicalName: 'Kassa (Felvidék)', adminTitle: 'Abaúj-Torna vármegye' },
    uzhhorod: { historicalName: 'Ungvár (Kárpátalja)', adminTitle: 'Ung vármegye — Kárpátalja' },
    zakarpatska: { historicalName: 'Kárpátalja', adminTitle: 'Kárpátaljai Kormányzóság (1939)' },
    carpathia: { historicalName: 'Kárpátalja', adminTitle: 'Kárpátaljai Kormányzóság' },
    mukacheve: { historicalName: 'Munkács (Kárpátalja)', adminTitle: 'Bereg vármegye' },
    mukachevo: { historicalName: 'Munkács (Kárpátalja)', adminTitle: 'Bereg vármegye' },
    berehove: { historicalName: 'Beregszász', adminTitle: 'Bereg vármegye' },
    khust: { historicalName: 'Huszt (Kárpátalja)', adminTitle: 'Máramaros vármegye' },
    nove_zamky: { historicalName: 'Érsekújvár (Felvidék)', adminTitle: 'Nyitra és Pozsony k.e.e. vármegye' },
    komarno: { historicalName: 'Komárom (Felvidék)', adminTitle: 'Komárom és Esztergom vármegye' },
    lucenec: { historicalName: 'Losonc (Felvidék)', adminTitle: 'Nógrád és Hont k.e.e. vármegye' },
    rimavska_sobota: { historicalName: 'Rimaszombat (Felvidék)', adminTitle: 'Gömör és Kishont vármegye' },
    roznava: { historicalName: 'Rozsnyó (Felvidék)', adminTitle: 'Gömör és Kishont vármegye' },
    dunaszerdahely: { historicalName: 'Dunaszerdahely (Csallóköz)', adminTitle: 'Komárom és Esztergom vármegye' },
    galanta: { historicalName: 'Galánta (Felvidék)', adminTitle: 'Nyitra és Pozsony vármegye' },
    filakovo: { historicalName: 'Fülek', adminTitle: 'Nógrád vármegye' },
    tornala: { historicalName: 'Tornalja', adminTitle: 'Gömör vármegye' },
    jelsava: { historicalName: 'Jolsva', adminTitle: 'Gömör vármegye' },
    moldava: { historicalName: 'Szepsi', adminTitle: 'Abaúj-Torna vármegye' },
    kralovsky_chlmec: { historicalName: 'Királyhelmec', adminTitle: 'Zemplén vármegye' },
    cluj: { historicalName: 'Kolozsvár (Észak-Erdély)', adminTitle: 'Kolozs vármegye (Második bécsi döntés, 1940)' },
    oradea: { historicalName: 'Nagyvárad (Partium)', adminTitle: 'Bihar vármegye' },
    bihor: { historicalName: 'Nagyvárad (Partium)', adminTitle: 'Bihar vármegye' },
    satu_mare: { historicalName: 'Szatmárnémeti', adminTitle: 'Szatmár vármegye' },
    targu_mures: { historicalName: 'Marosvásárhely (Székelyföld)', adminTitle: 'Maros-Torda vármegye' },
    mures: { historicalName: 'Marosvásárhely', adminTitle: 'Székelyföld' },
    maramures: { historicalName: 'Máramarossziget', adminTitle: 'Máramaros vármegye' },
    covasna: { historicalName: 'Sepsiszentgyörgy (Székelyföld)', adminTitle: 'Háromszék vármegye' },
    harghita: { historicalName: 'Csíkszereda (Székelyföld)', adminTitle: 'Csík vármegye' },
    novi_sad: { historicalName: 'Újvidék (Bácska/Délvidék)', adminTitle: 'Bács-Bodrog vármegye' },
    subotica: { historicalName: 'Szabadka (Délvidék)', adminTitle: 'Bács-Bodrog vármegye' },
    sombor: { historicalName: 'Zombor (Délvidék)', adminTitle: 'Bács-Bodrog vármegye' },
    senta: { historicalName: 'Zenta (Délvidék)', adminTitle: 'Bács-Bodrog vármegye' },
  },

  // ================= CECOSLOVACCHIA & SLOVACCHIA (CZE/SLO) =================
  CZE: {
    praha: { historicalName: 'Praha', adminTitle: 'Hlavní město Československé republiky' },
    brno: { historicalName: 'Brno (Morava)', adminTitle: 'Země Moravskoslezská' },
    plzen: { historicalName: 'Plzeň (Čechy)', adminTitle: 'Země Česká' },
    karlovy_vary: { historicalName: 'Karlovy Vary (Sudety)', adminTitle: 'Západní Čechy' },
    liberec: { historicalName: 'Liberec (Sudety)', adminTitle: 'Severní Čechy' },
    usti_nad_labem: { historicalName: 'Ústí nad Labem (Sudety)', adminTitle: 'Severní Čechy' },
    bratislava: { historicalName: 'Bratislava (Slovensko)', adminTitle: 'Krajina Slovenská' },
    kosice: { historicalName: 'Košice (Východné Slovensko)', adminTitle: 'Krajina Slovenská' },
    uzhhorod: { historicalName: 'Užhorod (Podkarpatská Rus)', adminTitle: 'Krajina Podkarpatoruská' },
    mukachevo: { historicalName: 'Mukačevo (Podkarpatská Rus)', adminTitle: 'Krajina Podkarpatoruská' },
    khust: { historicalName: 'Chust (Podkarpatská Rus)', adminTitle: 'Krajina Podkarpatoruská' },
  },
  SLO: {
    bratislava: { historicalName: 'Bratislava', adminTitle: 'Hlavné mesto Slovenskej republiky' },
    presov: { historicalName: 'Prešov', adminTitle: 'Šarišsko-zemplínska župa' },
    zilina: { historicalName: 'Žilina', adminTitle: 'Trenčianska župa' },
    banska_bystrica: { historicalName: 'Banská Bystrica', adminTitle: 'Pohronská župa' },
    nitra: { historicalName: 'Nitra', adminTitle: 'Nitrianska župa' },
    ruzomberok: { historicalName: 'Ružomberok', adminTitle: 'Tatranská župa' },
    trnava: { historicalName: 'Trnava', adminTitle: 'Považská župa' },
    trencin: { historicalName: 'Trenčín', adminTitle: 'Trenčianska župa' },
    poprad: { historicalName: 'Poprad', adminTitle: 'Tatranská župa' },
    martin: { historicalName: 'Turčiansky Svätý Martin', adminTitle: 'Tatranská župa' },
    zvolen: { historicalName: 'Zvolen', adminTitle: 'Pohronská župa' },
    bardejov: { historicalName: 'Bardejov', adminTitle: 'Šarišsko-zemplínska župa' },
    humenne: { historicalName: 'Humenné', adminTitle: 'Šarišsko-zemplínska župa' },
  },

  // ================= REGNO DI ROMANIA (ROM) =================
  ROM: {
    bucuresti: { historicalName: 'București', adminTitle: 'Capitala Regatului României' },
    chisinau: { historicalName: 'Chișinău (Bessarabia)', adminTitle: 'Ținutul Nistru' },
    cernauti: { historicalName: 'Cernăuți (Bucovina)', adminTitle: 'Ținutul Suceava' },
    cetatea_alba: { historicalName: 'Cetatea Albă (Bessarabia)', adminTitle: 'Județul Cetatea-Albă' },
    tighina: { historicalName: 'Tighina (Bender)', adminTitle: 'Județul Tighina' },
    ismail: { historicalName: 'Ismail (Bessarabia)', adminTitle: 'Județul Ismail' },
    balti: { historicalName: 'Bălți (Bessarabia)', adminTitle: 'Județul Bălți' },
    hotin: { historicalName: 'Hotin (Bessarabia)', adminTitle: 'Județul Hotin' },
    soroca: { historicalName: 'Soroca (Bessarabia)', adminTitle: 'Județul Soroca' },
    orhei: { historicalName: 'Orhei (Bessarabia)', adminTitle: 'Județul Orhei' },
    cahul: { historicalName: 'Cahul (Bessarabia)', adminTitle: 'Județul Cahul' },
    bazargic: { historicalName: 'Bazargic (Cadrilater / Dobrogea Nouă)', adminTitle: 'Județul Caliacra' },
    silistra: { historicalName: 'Silistra (Dârstor / Cadrilater)', adminTitle: 'Județul Durostor' },
    durostor: { historicalName: 'Silistra (Cadrilater)', adminTitle: 'Județul Durostor' },
    caliacra: { historicalName: 'Bazargic (Cadrilater)', adminTitle: 'Județul Caliacra' },
    balcic: { historicalName: 'Balcic (Caliacra)', adminTitle: 'Reședința Regală din Caliacra' },
    cavarna: { historicalName: 'Cavarna (Caliacra)', adminTitle: 'Județul Caliacra' },
    kavarna: { historicalName: 'Cavarna (Caliacra)', adminTitle: 'Județul Caliacra' },
    cluj: { historicalName: 'Cluj (Transilvania)', adminTitle: 'Ținutul Someș' },
    oradea: { historicalName: 'Oradea (Crișana)', adminTitle: 'Ținutul Crișuri' },
    timisoara: { historicalName: 'Timișoara (Banat)', adminTitle: 'Ținutul Timiș' },
    iasi: { historicalName: 'Iași (Moldova)', adminTitle: 'Ținutul Prut' },
    constanta: { historicalName: 'Constanța (Dobrogea)', adminTitle: 'Ținutul Mării' },
    craiova: { historicalName: 'Craiova (Oltenia)', adminTitle: 'Ținutul Olt' },
  },

  // ================= REGNO DI BULGARIA (BUL) =================
  BUL: {
    // Capitale & Bulgaria Occidentale
    sofia: { historicalName: 'Sofiya (Stolitsa)', adminTitle: 'Stolitsa na Tsarstvo Balgariya' },
    sofia_stolitsa: { historicalName: 'Sofiya (Stolitsa)', adminTitle: 'Stolitsa na Tsarstvo Balgariya' },
    pernik: { historicalName: 'Pernik', adminTitle: 'Sofiyska oblast' },
    kyustendil: { historicalName: 'Kyustendil', adminTitle: 'Kyustendilska oblast' },
    blagoevgrad: { historicalName: 'Gorna Dzhumaya', adminTitle: 'Pirinska Makedoniya' },
    gorna_dzhumaya: { historicalName: 'Gorna Dzhumaya', adminTitle: 'Pirinska Makedoniya' },
    dupnitsa: { historicalName: 'Dupnitsa', adminTitle: 'Sofiyska oblast' },

    // Bulgaria Danubiana & Nord-Ovest
    vidin: { historicalName: 'Vidin', adminTitle: 'Vidinska oblast' },
    lom: { historicalName: 'Lom', adminTitle: 'Vrachanska oblast' },
    montana: { historicalName: 'Ferdinand', adminTitle: 'Vrachanska oblast' },
    ferdinand: { historicalName: 'Ferdinand', adminTitle: 'Vrachanska oblast' },
    vratsa: { historicalName: 'Vratsa', adminTitle: 'Vrachanska oblast' },
    pleven: { historicalName: 'Pleven', adminTitle: 'Plevenska oblast' },
    lovech: { historicalName: 'Lovech', adminTitle: 'Plevenska oblast' },

    // Bulgaria Danubiana Centrale & Ludogorie
    ruse: { historicalName: 'Ruse', adminTitle: 'Rusenska oblast' },
    rustciuk: { historicalName: 'Ruse', adminTitle: 'Rusenska oblast' },
    veliko_tarnovo: { historicalName: 'Veliko Tărnovo', adminTitle: 'Tarnovska oblast' },
    tarnovo: { historicalName: 'Tărnovo', adminTitle: 'Tarnovska oblast' },
    gabrovo: { historicalName: 'Gabrovo', adminTitle: 'Tarnovska oblast' },
    razgrad: { historicalName: 'Razgrad', adminTitle: 'Shumenska oblast' },

    // Dobrugia Meridionale (Cadrilater — Trattato di Craiova 7 set 1940)
    silistra: { historicalName: 'Silistra', adminTitle: 'Tsarstvo Balgariya — Yuzhna Dobrudzha' },
    dobrich: { historicalName: 'Dobrich', adminTitle: 'Tsarstvo Balgariya — Yuzhna Dobrudzha' },
    kavarna: { historicalName: 'Kavarna', adminTitle: 'Tsarstvo Balgariya — Yuzhna Dobrudzha' },
    balchik: { historicalName: 'Balchik', adminTitle: 'Tsarstvo Balgariya — Yuzhna Dobrudzha' },

    // Bulgaria Nord-Orientale & Costa del Mar Nero
    varna: { historicalName: 'Varna', adminTitle: 'Varnenska oblast' },
    shumen: { historicalName: 'Shumen', adminTitle: 'Shumenska oblast' },
    targovishte: { historicalName: 'Tărgovište', adminTitle: 'Shumenska oblast' },

    // Tracia Settentrionale & Bulgaria Meridionale
    plovdiv: { historicalName: 'Plovdiv', adminTitle: 'Plovdivska oblast' },
    filippopoli: { historicalName: 'Plovdiv', adminTitle: 'Plovdivska oblast' },
    pazardzhik: { historicalName: 'Pazardzhik', adminTitle: 'Plovdivska oblast' },
    stara_zagora: { historicalName: 'Stara Zagora', adminTitle: 'Starozagorska oblast' },
    haskovo: { historicalName: 'Haskovo', adminTitle: 'Haskovska oblast' },
    smolyan: { historicalName: 'Smolyan', adminTitle: 'Plovdivska oblast' },
    kardzhali: { historicalName: 'Kărdzhali', adminTitle: 'Haskovska oblast' },
    burgas: { historicalName: 'Burgas', adminTitle: 'Burgaska oblast' },
    sliven: { historicalName: 'Sliven', adminTitle: 'Burgaska oblast' },
    yambol: { historicalName: 'Yambol', adminTitle: 'Burgaska oblast' },

    // Rivendicazioni ed Espansioni Storiche del 1941 (Macedonia Vardarska e Tracia Egea / Belomorie)
    skopje: { historicalName: 'Skopie', adminTitle: 'Skopska oblast (1941)' },
    bitola: { historicalName: 'Bitolya', adminTitle: 'Bitolska oblast (1941)' },
    prilep: { historicalName: 'Prilep', adminTitle: 'Bitolska oblast (1941)' },
    pirot: { historicalName: 'Pirot', adminTitle: 'Pomoravie (1941)' },
    kavala: { historicalName: 'Kavala', adminTitle: 'Belomorska oblast (1941)' },
    alexandroupoli: { historicalName: 'Dedeagach', adminTitle: 'Belomorska oblast (1941)' },
    drama: { historicalName: 'Drama', adminTitle: 'Belomorska oblast (1941)' },
    xanthi: { historicalName: 'Ksanti', adminTitle: 'Belomorska oblast (1941)' },
    serres: { historicalName: 'Serres (Syar)', adminTitle: 'Belomorska oblast (1941)' },
  },

  // ================= MBRETËRIA SHQIPTARE (ALB) =================
  ALB: {
    tirane: { historicalName: 'Tiranë', adminTitle: 'Kryeqyteti i Mbretërisë Shqiptare' },
    tirana: { historicalName: 'Tiranë', adminTitle: 'Kryeqyteti i Mbretërisë Shqiptare' },
    shkoder: { historicalName: 'Shkodër', adminTitle: 'Prefektura e Shkodrës' },
    shkodra: { historicalName: 'Shkodër', adminTitle: 'Prefektura e Shkodrës' },
    durres: { historicalName: 'Durrës', adminTitle: 'Prefektura e Durrësit' },
    durazzo: { historicalName: 'Durrës', adminTitle: 'Prefektura e Durrësit' },
    vlore: { historicalName: 'Vlorë', adminTitle: 'Prefektura e Vlorës' },
    valona: { historicalName: 'Vlorë', adminTitle: 'Prefektura e Vlorës' },
    korce: { historicalName: 'Korçë', adminTitle: 'Prefektura e Korçës' },
    corizza: { historicalName: 'Korçë', adminTitle: 'Prefektura e Korçës' },
    gjirokaster: { historicalName: 'Gjirokastër', adminTitle: 'Prefektura e Gjirokastrës' },
    argirocastro: { historicalName: 'Gjirokastër', adminTitle: 'Prefektura e Gjirokastrës' },
    berat: { historicalName: 'Berat', adminTitle: 'Prefektura e Beratit' },
    elbasan: { historicalName: 'Elbasan', adminTitle: 'Prefektura e Elbasanit' },
    kukes: { historicalName: 'Kukës', adminTitle: 'Prefektura e Kukësit' },
    dibra: { historicalName: 'Dibër (Peshkopi)', adminTitle: 'Prefektura e Dibrës' },
    albania: { historicalName: 'Mbretëria Shqiptare', adminTitle: 'Mbretëria Shqiptare (Mbreti Zog I)' },
    shqiperi: { historicalName: 'Mbretëria Shqiptare', adminTitle: 'Mbretëria Shqiptare (Mbreti Zog I)' },
  },

  // ================= REGNO DI JUGOSLAVIA (YUG) =================
  YUG: {
    // Capitale & Sedi di Banovina
    beograd: { historicalName: 'Beograd', adminTitle: 'Uprava grada Beograda' },
    belgrade: { historicalName: 'Beograd', adminTitle: 'Prestonica Kraljevine Jugoslavije' },
    zagreb: { historicalName: 'Zagreb (Savska Banovina)', adminTitle: 'Banovina Hrvatska (od 1939)' },
    ljubljana: { historicalName: 'Ljubljana (Dravska Banovina)', adminTitle: 'Dravska Banovina' },
    sarajevo: { historicalName: 'Sarajevo (Drinska Banovina)', adminTitle: 'Drinska Banovina' },
    split: { historicalName: 'Split (Primorska Banovina)', adminTitle: 'Banovina Hrvatska (od 1939)' },
    novi_sad: { historicalName: 'Novi Sad (Dunavska Banovina)', adminTitle: 'Dunavska Banovina' },
    banja_luka: { historicalName: 'Banja Luka (Vrbaska Banovina)', adminTitle: 'Vrbaska Banovina' },
    nis: { historicalName: 'Niš (Moravska Banovina)', adminTitle: 'Moravska Banovina' },
    cetinje: { historicalName: 'Cetinje (Zetska Banovina)', adminTitle: 'Zetska Banovina' },
    skopje: { historicalName: 'Skoplje (Vardarska Banovina)', adminTitle: 'Vardarska Banovina' },
    podgorica: { historicalName: 'Podgorica', adminTitle: 'Zetska Banovina' },
    mostar: { historicalName: 'Mostar (Primorska Banovina)', adminTitle: 'Banovina Hrvatska (od 1939)' },

    // Bosnia ed Erzegovina (1936-1940: Kraljevina Jugoslavija)
    bosnia: { historicalName: 'Bosna (Kraljevina Jugoslavija)', adminTitle: 'Drinska, Vrbaska i Primorska banovina' },
    bosna: { historicalName: 'Bosna (Kraljevina Jugoslavija)', adminTitle: 'Vrbaska i Drinska banovina' },
    herzegovina: { historicalName: 'Hercegovina (Kraljevina Jugoslavija)', adminTitle: 'Primorska i Zetska banovina' },
    hercegovina: { historicalName: 'Hercegovina', adminTitle: 'Primorska i Zetska banovina' },
    bosnia_and_herzegovina: { historicalName: 'Bosna i Hercegovina', adminTitle: 'Kraljevina Jugoslavija' },
    tuzla: { historicalName: 'Tuzla (Drinska Banovina)', adminTitle: 'Drinska Banovina' },
    zenica: { historicalName: 'Zenica (Drinska Banovina)', adminTitle: 'Drinska Banovina' },
    bihac: { historicalName: 'Bihać (Vrbaska Banovina)', adminTitle: 'Vrbaska Banovina' },
    travnik: { historicalName: 'Travnik (Drinska Banovina)', adminTitle: 'Banovina Hrvatska (od 1939)' },
    trebinje: { historicalName: 'Trebinje (Zetska Banovina)', adminTitle: 'Zetska Banovina' },
    bijeljina: { historicalName: 'Bijeljina (Drinska Banovina)', adminTitle: 'Drinska Banovina' },
    brcko: { historicalName: 'Brčko (Drinska Banovina)', adminTitle: 'Drinska Banovina' },
    doboj: { historicalName: 'Doboj (Vrbaska Banovina)', adminTitle: 'Vrbaska Banovina' },
    prijedor: { historicalName: 'Prijedor (Vrbaska Banovina)', adminTitle: 'Vrbaska Banovina' },
    nevesinje: { historicalName: 'Nevesinje (Zetska Banovina)', adminTitle: 'Zetska Banovina' },
    gorazde: { historicalName: 'Goražde (Drinska Banovina)', adminTitle: 'Drinska Banovina' },
    foca: { historicalName: 'Foča (Drinska Banovina)', adminTitle: 'Drinska Banovina' },
    livno: { historicalName: 'Livno (Primorska Banovina)', adminTitle: 'Banovina Hrvatska (od 1939)' },
    siroki_brijeg: { historicalName: 'Široki Brijeg', adminTitle: 'Primorska Banovina' },
    konjic: { historicalName: 'Konjic (Drinska Banovina)', adminTitle: 'Banovina Hrvatska (od 1939)' },
    visegrad: { historicalName: 'Višegrad (Drinska Banovina)', adminTitle: 'Drinska Banovina' },
    zvornik: { historicalName: 'Zvornik (Drinska Banovina)', adminTitle: 'Drinska Banovina' },
    jajce: { historicalName: 'Jajce (Vrbaska Banovina)', adminTitle: 'Vrbaska Banovina' },
    srpska: { historicalName: 'Bosanska Krajina i Podrinje (Banja Luka / Trebinje)', adminTitle: 'Vrbaska i Zetska banovina (Kraljevina Jugoslavija)' },
    republika_srpska: { historicalName: 'Bosanska Krajina i Podrinje (Banja Luka / Trebinje)', adminTitle: 'Vrbaska i Zetska banovina (Kraljevina Jugoslavija)' },
    basrp: { historicalName: 'Bosanska Krajina i Podrinje (Banja Luka / Trebinje)', adminTitle: 'Vrbaska i Zetska banovina (Kraljevina Jugoslavija)' },
    federacija: { historicalName: 'Bosna (Sarajevo, Mostar, Tuzla)', adminTitle: 'Drinska i Primorska banovina (Kraljevina Jugoslavija)' },
    federacija_bosne_i_hercegovine: { historicalName: 'Bosna (Sarajevo, Mostar, Tuzla)', adminTitle: 'Drinska i Primorska banovina (Kraljevina Jugoslavija)' },
    babih: { historicalName: 'Bosna (Sarajevo, Mostar, Tuzla)', adminTitle: 'Drinska i Primorska banovina (Kraljevina Jugoslavija)' },
    babrc: { historicalName: 'Posavina (Brčko)', adminTitle: 'Drinska banovina (Srez Brčko)' },
    brcko_distrikt: { historicalName: 'Posavina (Brčko)', adminTitle: 'Drinska banovina (Srez Brčko)' },

    // Kosovo e Metochia (1936-1940: Kraljevina Jugoslavija)
    kosovo: { historicalName: 'Kosovo i Metohija (Kraljevina Jugoslavija)', adminTitle: 'Vardarska, Zetska i Moravska banovina' },
    kosova: { historicalName: 'Kosovo (Kraljevina Jugoslavija)', adminTitle: 'Vardarska i Zetska banovina' },
    metohija: { historicalName: 'Metohija (Zetska Banovina)', adminTitle: 'Zetska Banovina' },
    pristina: { historicalName: 'Priština (Vardarska Banovina)', adminTitle: 'Vardarska Banovina' },
    prishtina: { historicalName: 'Priština (Vardarska Banovina)', adminTitle: 'Vardarska Banovina' },
    prizren: { historicalName: 'Prizren (Vardarska Banovina)', adminTitle: 'Vardarska Banovina' },
    pec: { historicalName: 'Peć (Zetska Banovina)', adminTitle: 'Zetska Banovina' },
    peja: { historicalName: 'Peć (Metohija)', adminTitle: 'Zetska Banovina' },
    mitrovica: { historicalName: 'Kosovska Mitrovica (Moravska Banovina)', adminTitle: 'Moravska Banovina' },
    kosovska_mitrovica: { historicalName: 'Kosovska Mitrovica', adminTitle: 'Moravska Banovina' },
    dakovica: { historicalName: 'Đakovica (Zetska Banovina)', adminTitle: 'Zetska Banovina' },
    gjakova: { historicalName: 'Đakovica (Zetska Banovina)', adminTitle: 'Zetska Banovina' },
    urosevac: { historicalName: 'Uroševac (Vardarska Banovina)', adminTitle: 'Vardarska Banovina' },
    ferizaj: { historicalName: 'Uroševac (Vardarska Banovina)', adminTitle: 'Vardarska Banovina' },
    gnjilane: { historicalName: 'Gnjilane (Vardarska Banovina)', adminTitle: 'Vardarska Banovina' },
    gjilan: { historicalName: 'Gnjilane (Vardarska Banovina)', adminTitle: 'Vardarska Banovina' },
    podujevo: { historicalName: 'Podujevo (Moravska Banovina)', adminTitle: 'Moravska Banovina' },
    podujeva: { historicalName: 'Podujevo (Moravska Banovina)', adminTitle: 'Moravska Banovina' },

    // Serbia, Vojvodina & Montenegro
    kragujevac: { historicalName: 'Kragujevac (Moravska Banovina)', adminTitle: 'Moravska Banovina' },
    subotica: { historicalName: 'Subotica (Dunavska Banovina)', adminTitle: 'Dunavska Banovina' },
    sombor: { historicalName: 'Sombor (Dunavska Banovina)', adminTitle: 'Dunavska Banovina' },
    zrenjanin: { historicalName: 'Petrovgrad (Dunavska Banovina)', adminTitle: 'Dunavska Banovina' },
    pancevo: { historicalName: 'Pančevo (Uprava grada Beograda)', adminTitle: 'Dunavska Banovina' },
    zemun: { historicalName: 'Zemun (Uprava grada Beograda)', adminTitle: 'Uprava grada Beograda' },
    krusevac: { historicalName: 'Kruševac (Moravska Banovina)', adminTitle: 'Moravska Banovina' },
    kraljevo: { historicalName: 'Kraljevo (Moravska Banovina)', adminTitle: 'Moravska Banovina' },
    valjevo: { historicalName: 'Valjevo (Drinska Banovina)', adminTitle: 'Drinska Banovina' },
    uzice: { historicalName: 'Užice (Drinska Banovina)', adminTitle: 'Drinska Banovina' },
    cacak: { historicalName: 'Čačak (Moravska Banovina)', adminTitle: 'Moravska Banovina' },
    novi_pazar: { historicalName: 'Novi Pazar (Zetska Banovina)', adminTitle: 'Zetska Banovina (Raška)' },
    vranje: { historicalName: 'Vranje (Vardarska Banovina)', adminTitle: 'Vardarska Banovina' },
    leskovac: { historicalName: 'Leskovac (Moravska Banovina)', adminTitle: 'Moravska Banovina' },
    zajecar: { historicalName: 'Zaječar (Moravska Banovina)', adminTitle: 'Moravska Banovina' },
    bor: { historicalName: 'Bor (Moravska Banovina)', adminTitle: 'Moravska Banovina' },
    pozarevac: { historicalName: 'Požarevac (Dunavska Banovina)', adminTitle: 'Dunavska Banovina' },
    smederevo: { historicalName: 'Smederevo (Dunavska Banovina)', adminTitle: 'Dunavska Banovina' },
    niksic: { historicalName: 'Nikšić (Zetska Banovina)', adminTitle: 'Zetska Banovina' },
    pljevlja: { historicalName: 'Pljevlja (Zetska Banovina)', adminTitle: 'Zetska Banovina' },
    bijelo_polje: { historicalName: 'Bijelo Polje (Zetska Banovina)', adminTitle: 'Zetska Banovina' },
    berane: { historicalName: 'Berane (Zetska Banovina)', adminTitle: 'Zetska Banovina' },
    bar: { historicalName: 'Bar (Zetska Banovina)', adminTitle: 'Zetska Banovina' },
    ulcinj: { historicalName: 'Ulcinj (Zetska Banovina)', adminTitle: 'Zetska Banovina' },
    herceg_novi: { historicalName: 'Herceg Novi (Zetska Banovina)', adminTitle: 'Zetska Banovina' },

    // Croazia e Slovenia (Kraljevina Jugoslavija)
    dubrovnik: { historicalName: 'Dubrovnik (Zetska Banovina)', adminTitle: 'Banovina Hrvatska (od 1939)' },
    sibenik: { historicalName: 'Šibenik (Primorska Banovina)', adminTitle: 'Banovina Hrvatska (od 1939)' },
    osijek: { historicalName: 'Osijek (Savska Banovina)', adminTitle: 'Banovina Hrvatska (od 1939)' },
    varazdin: { historicalName: 'Varaždin (Savska Banovina)', adminTitle: 'Banovina Hrvatska (od 1939)' },
    susak: { historicalName: 'Sušak (Savska Banovina)', adminTitle: 'Banovina Hrvatska (od 1939)' },
    karlovac: { historicalName: 'Karlovac (Savska Banovina)', adminTitle: 'Banovina Hrvatska (od 1939)' },
    bjelovar: { historicalName: 'Bjelovar (Savska Banovina)', adminTitle: 'Banovina Hrvatska (od 1939)' },
    maribor: { historicalName: 'Maribor (Dravska Banovina)', adminTitle: 'Dravska Banovina' },
    celje: { historicalName: 'Celje (Dravska Banovina)', adminTitle: 'Dravska Banovina' },
    kranj: { historicalName: 'Kranj (Dravska Banovina)', adminTitle: 'Dravska Banovina' },
    novo_mesto: { historicalName: 'Novo Mesto (Dravska Banovina)', adminTitle: 'Dravska Banovina' },

    // Macedonia (Vardarska Banovina)
    bitola: { historicalName: 'Bitolj (Vardarska Banovina)', adminTitle: 'Vardarska Banovina' },
    ohrid: { historicalName: 'Ohrid (Vardarska Banovina)', adminTitle: 'Vardarska Banovina' },
    tetovo: { historicalName: 'Tetovo (Vardarska Banovina)', adminTitle: 'Vardarska Banovina' },
    kumanovo: { historicalName: 'Kumanovo (Vardarska Banovina)', adminTitle: 'Vardarska Banovina' },
    prilep: { historicalName: 'Prilep (Vardarska Banovina)', adminTitle: 'Vardarska Banovina' },
    veles: { historicalName: 'Veles (Vardarska Banovina)', adminTitle: 'Vardarska Banovina' },
    stip: { historicalName: 'Štip (Vardarska Banovina)', adminTitle: 'Vardarska Banovina' },
    strumica: { historicalName: 'Strumica (Vardarska Banovina)', adminTitle: 'Vardarska Banovina' },
  },

  // ================= FRANCIA & REGIME DI VICHY (1940) =================
  FRA: {
    france: { historicalName: 'République française (Troisième République)', adminTitle: 'Gouvernement de la République française' },
    paris: { historicalName: 'Paris (Capitale)', adminTitle: 'Département de la Seine' },
    marseille: { historicalName: 'Marseille', adminTitle: 'Département des Bouches-du-Rhône' },
    lyon: { historicalName: 'Lyon', adminTitle: 'Département du Rhône' },
    bordeaux: { historicalName: 'Bordeaux', adminTitle: 'Département de la Gironde (Siège provisoire du gouvernement)' },
    toulouse: { historicalName: 'Toulouse', adminTitle: 'Département de la Haute-Garonne' },
    nantes: { historicalName: 'Nantes', adminTitle: 'Département de la Loire-Inférieure' },
    rennes: { historicalName: 'Rennes', adminTitle: 'Département d\'Ille-et-Vilaine' },
    brest: { historicalName: 'Brest', adminTitle: 'Département du Finistère (Port militaire)' },
    rouen: { historicalName: 'Rouen', adminTitle: 'Département de la Seine-Inférieure' },
    lille: { historicalName: 'Lille', adminTitle: 'Département du Nord' },
    strasbourg: { historicalName: 'Strasbourg (Alsace)', adminTitle: 'Département du Bas-Rhin' },
    metz: { historicalName: 'Metz (Lorraine)', adminTitle: 'Département de la Moselle' },
    corse: { historicalName: 'Corse (Ajaccio / Bastia)', adminTitle: 'Département de la Corse' },
    allier: { historicalName: 'Allier (Moulins / Vichy)', adminTitle: 'Département de l\'Allier' },
    clermont: { historicalName: 'Clermont-Ferrand', adminTitle: 'Département du Puy-de-Dôme' },
  },
  VIC: {
    vichy: {
      historicalName: 'Vichy (Siège du gouvernement)',
      adminTitle: 'État français (Zone libre)',
      historicalNote: 'Siège du gouvernement de l\'État français (Hôtel du Parc).',
    },
    allier: {
      historicalName: 'Allier (Vichy — Zone libre)',
      adminTitle: 'Département de l\'Allier (État français)',
      historicalNote: 'Le sud du département avec la ville de Vichy constituait le centre politique de l\'État français.',
    },
    clermont: {
      historicalName: 'Clermont-Ferrand (Zone libre)',
      adminTitle: 'Département du Puy-de-Dôme',
    },
    puy_de_dome: {
      historicalName: 'Puy-de-Dôme (Zone libre)',
      adminTitle: 'Département du Puy-de-Dôme',
    },
    cantal: {
      historicalName: 'Cantal (Aurillac — Zone libre)',
      adminTitle: 'Département du Cantal',
    },
    haute_loire: {
      historicalName: 'Haute-Loire (Le Puy — Zone libre)',
      adminTitle: 'Département de la Haute-Loire',
    },
    correze: {
      historicalName: 'Corrèze (Tulle — Zone libre)',
      adminTitle: 'Département de la Corrèze',
    },
    creuse: {
      historicalName: 'Creuse (Guéret — Zone libre)',
      adminTitle: 'Département de la Creuse',
    },
    haute_vienne: {
      historicalName: 'Haute-Vienne (Limoges — Zone libre)',
      adminTitle: 'Département de la Haute-Vienne',
    },
    dordogne: {
      historicalName: 'Dordogne (Périgueux — Zone libre)',
      adminTitle: 'Département de la Dordogne',
    },
    lot_et_garonne: {
      historicalName: 'Lot-et-Garonne (Agen — Zone libre)',
      adminTitle: 'Département de Lot-et-Garonne',
    },
    rhone: {
      historicalName: 'Rhône (Lyon — Zone libre)',
      adminTitle: 'Département du Rhône',
    },
    lyon: {
      historicalName: 'Lyon (Zone libre)',
      adminTitle: 'Département du Rhône (Métropole de Lyon)',
    },
    isere: {
      historicalName: 'Isère (Grenoble — Zone libre)',
      adminTitle: 'Département de l\'Isère',
    },
    loire: {
      historicalName: 'Loire (Saint-Étienne — Zone libre)',
      adminTitle: 'Département de la Loire',
    },
    ain: {
      historicalName: 'Ain (Bourg-en-Bresse — Zone libre)',
      adminTitle: 'Département de l\'Ain',
    },
    savoie: {
      historicalName: 'Savoie (Chambéry — Zone libre)',
      adminTitle: 'Département de la Savoie',
    },
    haute_savoie: {
      historicalName: 'Haute-Savoie (Annecy — Zone libre)',
      adminTitle: 'Département de la Haute-Savoie',
    },
    marseille: {
      historicalName: 'Marseille (Grand port — Zone libre)',
      adminTitle: 'Département des Bouches-du-Rhône',
    },
    bouches_du_rhone: {
      historicalName: 'Bouches-du-Rhône (Marseille — Zone libre)',
      adminTitle: 'Département des Bouches-du-Rhône',
    },
    toulon: {
      historicalName: 'Toulon (Base navale — Zone libre)',
      adminTitle: 'Département du Var (Marine nationale)',
    },
    var: {
      historicalName: 'Var (Toulon — Zone libre)',
      adminTitle: 'Département du Var',
    },
    nice: {
      historicalName: 'Nice (Zone libre)',
      adminTitle: 'Département des Alpes-Maritimes',
    },
    alpes_maritimes: {
      historicalName: 'Alpes-Maritimes (Nice — Zone libre)',
      adminTitle: 'Département des Alpes-Maritimes',
    },
    toulouse: {
      historicalName: 'Toulouse (Zone libre)',
      adminTitle: 'Département de la Haute-Garonne',
    },
    haute_garonne: {
      historicalName: 'Haute-Garonne (Toulouse — Zone libre)',
      adminTitle: 'Département de la Haute-Garonne',
    },
    herault: {
      historicalName: 'Hérault (Montpellier — Zone libre)',
      adminTitle: 'Département de l\'Hérault',
    },
    gard: {
      historicalName: 'Gard (Nîmes — Zone libre)',
      adminTitle: 'Département du Gard',
    },
    aude: {
      historicalName: 'Aude (Carcassonne — Zone libre)',
      adminTitle: 'Département de l\'Aude',
    },
    pyrenees_orientales: {
      historicalName: 'Pyrénées-Orientales (Perpignan — Zone libre)',
      adminTitle: 'Département des Pyrénées-Orientales',
    },
    corse: {
      historicalName: 'Corse (Ajaccio / Bastia — Zone libre)',
      adminTitle: 'Département de la Corse',
    },
  },
  F_NAF: {
    algeria: { historicalName: 'Départements Français d\'Algérie', adminTitle: 'Gouvernement Général de l\'Algérie (Alger)', historicalNote: 'Territoire constitutionnellement intégré à la République française, divisé en départements d\'Alger, d\'Oran, de Constantine et les Territoires du Sud sahariens.' },
    alger: { historicalName: 'Alger', adminTitle: 'Chef-lieu du Département d\'Alger & Siège du Gouverneur Général', historicalNote: 'Capitale administrative de l\'Algérie française et grand port de la Méditerranée occidentale.' },
    oran: { historicalName: 'Oran', adminTitle: 'Département d\'Oran (Préfecture)', historicalNote: 'Grand port commercial et base militaire à forte population européenne d\'origine espagnole et française.' },
    constantine: { historicalName: 'Constantine', adminTitle: 'Département de Constantine (Préfecture)', historicalNote: 'Cité séculaire des gorges du Rhummel, centre névralgique de l\'Est algérien.' },
    bone: { historicalName: 'Bône (Annaba)', adminTitle: 'Sous-préfecture du Département de Constantine', historicalNote: 'Grand débouché maritime des minerais de fer de l\'Ouenza et des phosphates de Tébessa.' },
    philippeville: { historicalName: 'Philippeville (Skikda)', adminTitle: 'Port du Département de Constantine', historicalNote: 'Port d\'embarquement agricole et céréalier du Constantinois.' },
    sidi_bel_abbes: { historicalName: 'Sidi Bel Abbès', adminTitle: 'Maison Mère de la Légion Étrangère (1er RE)', historicalNote: 'Quartier Viénot et berceau historique de la Légion Étrangère.' },
    blida: { historicalName: 'Blida', adminTitle: 'Sous-préfecture de la Mitidja (Département d\'Alger)', historicalNote: 'Cité des roses au pied de l\'Atlas blidéen et grande base aérienne de l\'Armée de l\'Air.' },
    territoires_du_sud: { historicalName: 'Territoires du Sud (Sahara)', adminTitle: 'Territoires Militaires du Sud Algérien', historicalNote: 'Régions sahariennes sous commandement des Affaires indigènes (Aïn Sefra, Ghardaïa, Touggourt, Oasis).' },
    maroc: { historicalName: 'Protectorat Français du Maroc', adminTitle: 'Résidence Générale de la République Française (Rabat)', historicalNote: 'Protectorat établi par le traité de Fès (1912). Souveraineté chérifienne sous le Sultan Sidi Mohammed ben Youssef.' },
    rabat: { historicalName: 'Rabat', adminTitle: 'Capitale du Protectorat & Siège de la Résidence Générale', historicalNote: 'Siège du Résident Général Charles Noguès et palais du Sultan Mohammed V.' },
    casablanca: { historicalName: 'Casablanca', adminTitle: 'Grand Port de l\'Atlantique & Poumon Économique', historicalNote: 'Plus grand port moderne du Maghreb et grand centre industriel atlantique.' },
    fes: { historicalName: 'Fès', adminTitle: 'Capitale Spirituelle et Religieuse du Maroc', historicalNote: 'Grande métropole historique, université Al Quaraouiyine et médina impériale.' },
    marrakech: { historicalName: 'Marrakech', adminTitle: 'Région Militaire du Sud Marocain', historicalNote: 'Cité impériale au pied du Haut-Atlas, commandée par le Pacha Thami El Glaoui.' },
    kenitra: { historicalName: 'Port-Lyautey (Kénitra)', adminTitle: 'Port Fluvial et Base Aéronavale du Gharb', historicalNote: 'Grand débouché de la plaine céréalière du Gharb sur l\'estuaire du Sebou.' },
    agadir: { historicalName: 'Agadir', adminTitle: 'Port du Souss et du Sud Marocain', historicalNote: 'Port de pêche et débouché stratégique de la vallée du Souss.' },
    tunisie: { historicalName: 'Protectorat Français de Tunisie', adminTitle: 'Résidence Générale de France (Tunis)', historicalNote: 'Protectorat établi par les traités du Bardo (1881) et de La Marsa (1883). Dynastie husseinite régnante (Ahmed II Bey).' },
    tunis: { historicalName: 'Tunis', adminTitle: 'Capitale de la Régence de Tunis & Siège du Résident Général', historicalNote: 'Capitale historique, siège du Bey et du Résident Général Eirik Labonne.' },
    bizerte: { historicalName: 'Bizerte', adminTitle: 'Base Navale Stratégique & Arsenal de Sidi Abdallah', historicalNote: 'Base navale majeure de la Marine Nationale verrouillant le détroit siculo-tunisien.' },
    sfax: { historicalName: 'Sfax', adminTitle: 'Grand Port Pétrolier et Minier du Centre', historicalNote: 'Grand centre d\'exportation des phosphates de Gafsa et de l\'huile d\'olive.' },
    sousse: { historicalName: 'Sousse', adminTitle: 'Capitale du Sahel Tunisien', historicalNote: 'Centre agricole et portuel majeur de la côte orientale.' },
    gabes: { historicalName: 'Gabès', adminTitle: 'Oasis Maritime & Ligne Mareth', historicalNote: 'Secteur fortifié d\'arrêt face à la Tripolitaine italienne (Ligne Mareth).' },
  },
  VIC_NAF: {
    algeria: { historicalName: 'Départements Français d\'Algérie (Vichy)', adminTitle: 'Gouvernement Général de l\'Algérie (Yves Châtel / Maxime Weygand)', historicalNote: 'Maintenus sous l\'autorité du régime de Vichy avec application stricte des lois antijuives du statut des juifs.' },
    alger: { historicalName: 'Alger (Vichy)', adminTitle: 'Chef-lieu du Département d\'Alger & Délégation Générale de Weygand', historicalNote: 'Siège du gouverneur Yves Châtel puis du général Maxime Weygand, Délégué général de Vichy en Afrique.' },
    oran: { historicalName: 'Oran (Vichy)', adminTitle: 'Département d\'Oran (Vichy)', historicalNote: 'Sous contrôle strict de Vichy ; baie voisine de Mers-el-Kébir bombardée par la Royal Navy le 3 juillet 1940.' },
    constantine: { historicalName: 'Constantine (Vichy)', adminTitle: 'Département de Constantine (Vichy)', historicalNote: 'Administration préfectorale fidèle au Maréchal Pétain.' },
    bone: { historicalName: 'Bône (Annaba — Vichy)', adminTitle: 'Sous-préfecture du Département de Constantine (Vichy)', historicalNote: 'Port sous surveillance armistice des commissions italo-allemandes.' },
    sidi_bel_abbes: { historicalName: 'Sidi Bel Abbès (Vichy)', adminTitle: 'Dépôt Central de la Légion Étrangère (Vichy)', historicalNote: 'Légion étrangère repliée sous contrôle de l\'Armée d\'Afrique de Vichy.' },
    blida: { historicalName: 'Blida (Vichy)', adminTitle: 'Base Aérienne de Vichy en Afrique du Nord', historicalNote: 'Groupes de chasse de l\'Armée de l\'Air de l\'armistice.' },
    maroc: { historicalName: 'Protectorat du Maroc (Vichy)', adminTitle: 'Résident Général Général Charles Noguès (Vichy)', historicalNote: 'Noguès renonce à la dissidence après l\'armistice et maintient le protectorat dans la fidélité à Pétain.' },
    rabat: { historicalName: 'Rabat (Maroc — Vichy)', adminTitle: 'Résidence Générale du Général Charles Noguès', historicalNote: 'Siège du commandement en chef des troupes de Vichy en Afrique du Nord.' },
    casablanca: { historicalName: 'Casablanca (Maroc — Vichy)', adminTitle: 'Base Navale Atlantique de Vichy', historicalNote: 'Base de stationnement de la puissante corazzata Jean Bart inachevée, évacuée de Saint-Nazaire en juin 1940.' },
    tunisie: { historicalName: 'Protectorat de Tunisie (Vichy)', adminTitle: 'Résident Général Amiral Jean-Pierre Esteva (Vichy)', historicalNote: 'L\'amiral Esteva prend ses fonctions en juillet 1940 et applique la politique de collaboration de Vichy.' },
    tunis: { historicalName: 'Tunis (Vichy)', adminTitle: 'Résidence Générale de l\'Amiral Jean-Pierre Esteva', historicalNote: 'Capitale du protectorat sous l\'étroite surveillance de la Commission d\'armistice italienne (CIAF).' },
    bizerte: { historicalName: 'Bizerte (Vichy)', adminTitle: 'Base Navale Stratégique de Vichy sous contrôle d\'armistice', historicalNote: 'Arsenal de Sidi Abdallah démobilisé sous contrôle de la Commission d\'armistice.' },
  },
  F_AOF: {
    dakar: { historicalName: 'Dakar (Sénégal / AOF)', adminTitle: 'Gouvernement Général de l\'AOF (Dakar)', historicalNote: 'Capitale fédérale de l\'Afrique Occidentale Française, grand port stratégique et escale maritime impériale.' },
    senegal: { historicalName: 'Sénégal (AOF)', adminTitle: 'Colonie du Sénégal (Gouverneur Parisot)', historicalNote: 'Berceau de la colonisation française en Afrique noire et foyer des Tirailleurs Sénégalais.' },
    saint_louis: { historicalName: 'Saint-Louis du Sénégal', adminTitle: 'Capitale Historique du Sénégal et de la Mauritanie', historicalNote: 'Ancienne capitale coloniale fluviale sur l\'embouchure du fleuve Sénégal.' },
    mauritanie: { historicalName: 'Mauritanie (AOF)', adminTitle: 'Colonie de Mauritanie', historicalNote: 'Territoire désertique s\'étendant de l\'Adrar au fleuve Sénégal.' },
    soudan: { historicalName: 'Soudan Français (Mali)', adminTitle: 'Colonie du Soudan Français (Bamako)', historicalNote: 'Vaste territoire sahélien traversé par la boucle du fleuve Niger.' },
    bamako: { historicalName: 'Bamako', adminTitle: 'Chef-lieu du Soudan Français', historicalNote: 'Grand centre administratif et terminus du chemin de fer Dakar-Niger.' },
    tombouctou: { historicalName: 'Tombouctou', adminTitle: 'Cercle Militaire de Tombouctou', historicalNote: 'Cité historique transsaharienne et poste militaire de surveillance du Sahara central.' },
    niger: { historicalName: 'Niger (AOF)', adminTitle: 'Colonie du Niger (Niamey)', historicalNote: 'Territoire bordant le lac Tchad et le Sahara, sous administration coloniale civile et militaire.' },
    niamey: { historicalName: 'Niamey', adminTitle: 'Chef-lieu de la Colonie du Niger', historicalNote: 'Centre administratif établi sur la rive gauche du fleuve Niger.' },
    haute_volta: { historicalName: 'Haute-Volta (Burkina Faso)', adminTitle: 'Territoire de Haute-Volta (AOF)', historicalNote: 'Région voltaïque rattachée principalement à la Côte d\'Ivoire, au Soudan et au Niger entre 1932 et 1947.' },
    ouagadougou: { historicalName: 'Ouagadougou', adminTitle: 'Cité du Mogho Naba (Royaume Mossi)', historicalNote: 'Capitale du puissant royaume traditionnel des Mossi.' },
    cote_ivoire: { historicalName: 'Côte d\'Ivoire (AOF)', adminTitle: 'Colonie de Côte d\'Ivoire (Abidjan)', historicalNote: 'Riche colonie forestière et cacaoyère tournée vers l\'Atlantique.' },
    abidjan: { historicalName: 'Abidjan', adminTitle: 'Chef-lieu de la Colonie de Côte d\'Ivoire', historicalNote: 'Métropole lagunaire et pôle économique majeur de l\'AOF.' },
    guinee: { historicalName: 'Guinée Française (AOF)', adminTitle: 'Colonie de Guinée Française (Conakry)', historicalNote: 'Château d\'eau de l\'Afrique occidentale (Fouta Djallon) et mines de bauxite.' },
    conakry: { historicalName: 'Conakry', adminTitle: 'Chef-lieu de la Guinée Française', historicalNote: 'Grand port bananier et minier de la presqu\'île de Kaloum.' },
    dahomey: { historicalName: 'Dahomey (Bénin / AOF)', adminTitle: 'Colonie du Dahomey (Porto-Novo)', historicalNote: 'Territoire côtier du golfe de Guinée, héritier du royaume d\'Abomey.' },
    porto_novo: { historicalName: 'Porto-Novo', adminTitle: 'Chef-lieu de la Colonie du Dahomey', historicalNote: 'Capitale administrative et port lagunaire.' },
    togo: { historicalName: 'Togo Français', adminTitle: 'Territoire sous Mandat de la Société des Nations (Lomé)', historicalNote: 'Ancienne colonie allemande administrée par la France sous mandat B de la SDN.' },
    lome: { historicalName: 'Lomé', adminTitle: 'Chef-lieu du Territoire du Togo', historicalNote: 'Port franc et capitale du Togo sous mandat.' },
  },
  VIC_AOF: {
    dakar: { historicalName: 'Dakar (Sénégal / AOF — Vichy)', adminTitle: 'Haut-Commissariat de Pierre Boisson pour l\'Afrique Noire (Vichy)', historicalNote: 'Pierre Boisson repousse l\'assaut anglo-gollista de l\'opération Menace (23-25 sept. 1940) avec le cuirassé Richelieu et garde l\'AOF pour Vichy.' },
    senegal: { historicalName: 'Sénégal (AOF — Vichy)', adminTitle: 'Colonie du Sénégal (Gouverneur sous Vichy)', historicalNote: 'Base arrière solide du régime de Vichy en Afrique atlantique.' },
    mauritanie: { historicalName: 'Mauritanie (AOF — Vichy)', adminTitle: 'Colonie de Mauritanie (Vichy)', historicalNote: 'Territoire maintenu sous obédience de Dakar et du Maréchal Pétain.' },
    soudan: { historicalName: 'Soudan Français (AOF — Vichy)', adminTitle: 'Colonie du Soudan Français (Vichy)', historicalNote: 'Administration coloniale fidèle au gouvernement de Vichy.' },
    niger: { historicalName: 'Niger (AOF — Vichy)', adminTitle: 'Colonie du Niger (Vichy)', historicalNote: 'Frontière orientale militarisée face au Tchad gaulliste de Félix Éboué.' },
    haute_volta: { historicalName: 'Haute-Volta (AOF — Vichy)', adminTitle: 'Territoire Voltaïque (Vichy)', historicalNote: 'Région sous l\'autorité stricte du gouverneur Boisson.' },
    cote_ivoire: { historicalName: 'Côte d\'Ivoire (AOF — Vichy)', adminTitle: 'Colonie de Côte d\'Ivoire (Vichy)', historicalNote: 'Plantations et ports sous embargo allié après l\'armistice.' },
    guinee: { historicalName: 'Guinée Française (AOF — Vichy)', adminTitle: 'Colonie de Guinée Française (Vichy)', historicalNote: 'Administration vichyste surveillant les frontières de la Sierra Leone britannique.' },
    dahomey: { historicalName: 'Dahomey (AOF — Vichy)', adminTitle: 'Colonie du Dahomey (Vichy)', historicalNote: 'Enclavée entre le Nigeria britannique et le Togo sous Vichy.' },
    togo: { historicalName: 'Togo Français (AOF — Vichy)', adminTitle: 'Territoire sous Mandat (Vichy)', historicalNote: 'Mandat sous surveillance britannique depuis la Côte-de-l\'Or voisine.' },
  },
  F_AEF: {
    brazzaville: { historicalName: 'Brazzaville (Moyen-Congo)', adminTitle: 'Capitale de l\'Afrique Équatoriale Française (AEF)', historicalNote: 'Siège du Gouvernement Général de l\'AEF sur la rive droite du Stanley Pool (fleuve Congo).' },
    tchad: { historicalName: 'Tchad (AEF)', adminTitle: 'Colonie du Tchad (Gouverneur Félix Éboué)', historicalNote: 'Félix Éboué prépare dès juillet 1940 le ralliement de l\'Afrique à la France Libre de De Gaulle.' },
    fort_lamy: { historicalName: 'Fort-Lamy (Tchad)', adminTitle: 'Chef-lieu du Territoire du Tchad', historicalNote: 'Carrefour stratégique aux portes du Sahara et base de surveillance de la Libye italienne.' },
    largeau: { historicalName: 'Largeau (Faya-Largeau)', adminTitle: 'Poste Militaire du Borkou-Ennedi-Tibesti (BET)', historicalNote: 'Poste saharien avancé qui servira de tremplin à la Colonne Leclerc vers Koufra et le Fezzan.' },
    cameroun: { historicalName: 'Cameroun Français', adminTitle: 'Commissariat de la République (Mandat SDN — Yaoundé / Douala)', historicalNote: "Mandat B de la Société des Nations confié à la France, avec capitale administrative à Yaoundé et port principal à Douala; cultures de cacao, café et bananes dans le Mungo, lutte contre la maladie du sommeil du Dr. Jamot." },
    douala: { historicalName: 'Douala (Cameroun)', adminTitle: 'Port Principal du Cameroun Français', historicalNote: 'Grand port de l\'estuaire du Wouri et capitale économique du Cameroun.' },
    yaounde: { historicalName: 'Yaoundé (Cameroun)', adminTitle: 'Siège du Commissaire de la République au Cameroun', historicalNote: 'Capitale administrative établie sur les hauts plateaux du Sud.' },
    oubangui: { historicalName: 'Oubangui-Chari (Centrafrique)', adminTitle: 'Colonie de l\'Oubangui-Chari (Bangui)', historicalNote: 'Colonie de savane et de forêt au cœur du continent africain.' },
    bangui: { historicalName: 'Bangui', adminTitle: 'Chef-lieu de l\'Oubangui-Chari', historicalNote: 'Port fluvial sur la rive droite de l\'Oubangui.' },
    gabon: { historicalName: 'Gabon (AEF)', adminTitle: 'Colonie du Gabon (Libreville)', historicalNote: 'Colonie équatoriale forestière et berceau de l\'influence française au Congo.' },
    libreville: { historicalName: 'Libreville', adminTitle: 'Chef-lieu de la Colonie du Gabon', historicalNote: 'Fondée en 1849 par des esclaves libérés, port de l\'estuaire du Komo.' },
    congo: { historicalName: 'Moyen-Congo (AEF)', adminTitle: 'Colonie du Moyen-Congo (Brazzaville)', historicalNote: 'Artère fluviale et ferroviaire essentielle reliant le fleuve Congo à l\'Atlantique.' },
    pointe_noire: { historicalName: 'Pointe-Noire', adminTitle: 'Port Océanique du Moyen-Congo', historicalNote: 'Terminus maritime du chemin de fer Congo-Océan inauguré en 1934.' },
  },
  FFL_AEF: {
    brazzaville: { historicalName: 'Brazzaville (Capitale de la France Libre)', adminTitle: 'Capitale de l\'Empire de la France Libre (Manifeste de Brazzaville)', historicalNote: 'Le 27 octobre 1940, le général de Gaulle crée à Brazzaville le Conseil de défense de l\'Empire. Brazzaville devient la capitale officielle de la France combattante.' },
    tchad: { historicalName: 'Tchad (Premier Territoire Rallié à la France Libre)', adminTitle: 'Gouverneur Général Félix Éboué (Ralliement du 26 août 1940)', historicalNote: 'Félix Éboué et le colonel Marchand proclament le ralliement du Tchad, offrant à la France Libre sa première assise territoriale souveraine.' },
    fort_lamy: { historicalName: 'Fort-Lamy (France Libre)', adminTitle: 'Quartier Général des Forces Françaises Libres d\'Afrique', historicalNote: 'Base de départ de la glorieuse Colonne Leclerc et des opérations contre les forces de l\'Axe dans le désert libyen.' },
    cameroun: { historicalName: 'Cameroun Français (Afrique Française Libre)', adminTitle: 'Colonel Philippe Leclerc (Ralliement du 27 août 1940)', historicalNote: "Philippe Leclerc débarque héroïquement à Douala en pirogue dans la nuit du 26 au 27 août 1940 et rallie l'ensemble du territoire camerounais sans effusion de sang à la France Libre, formant le socle atlantique du ralliement de l'AEF." },
    douala: { historicalName: 'Douala (Port de la France Libre)', adminTitle: 'Port de Débarquement et Base Logistique de Leclerc', historicalNote: 'Port stratégique par lequel transitent les armes et renforts des Forces Françaises Libres.' },
    oubangui: { historicalName: 'Oubangui-Chari (Rallié à la France Libre)', adminTitle: 'Gouverneur Pierre de Saint-Mart (29 août 1940)', historicalNote: 'Ralliement immédiat sous l\'impulsion des officiers et colons patriotes.' },
    gabon: { historicalName: 'Gabon (France Libre — Post-Campagne du Gabon)', adminTitle: 'Rallié à la France Libre (Novembre 1940)', historicalNote: 'Resté d\'abord fidèle à Vichy sous Masson, le Gabon est rallié après la brève campagne militaire de Leclerc et Koenig en novembre 1940.' },
    congo: { historicalName: 'Moyen-Congo (France Libre)', adminTitle: 'Gouverneur Général Edgard de Larminat (28 août 1940)', historicalNote: 'Le général de Larminat prend le contrôle de Brazzaville au nom du général de Gaulle.' },
  },
  F_IND: {
    indochine: { historicalName: 'Union Indochinoise (Indochine Française)', adminTitle: 'Gouvernement Général de l\'Indochine (Hanoï)', historicalNote: 'Fédération coloniale comprenant la colonie de Cochinchine et les quatre protectorats d\'Annam, du Tonkin, du Cambodge et du Laos, plus Kouang-Tchéou-Wan.' },
    hanoi: { historicalName: 'Hanoï (Tonkin)', adminTitle: 'Capitale Fédérale de l\'Union Indochinoise', historicalNote: 'Siège du Gouverneur Général et centre politique et universitaire d\'Indochine.' },
    tonkin: { historicalName: 'Tonkin (Protectorat Français)', adminTitle: 'Résidence Supérieure au Tonkin (Hanoï)', historicalNote: 'Région septentrionale du delta du fleuve Rouge, riche en mines de charbon d\'Along.' },
    haiphong: { historicalName: 'Haïphong (Tonkin)', adminTitle: 'Grand Port Maritime du Nord & Débouché du Yunnan', historicalNote: 'Port militaire et commercial, terminus du chemin de fer français vers le Yunnan (Chine).' },
    lang_son: { historicalName: 'Lạng Sơn (Tonkin)', adminTitle: 'Place Forte Frontalière de la Porte de Chine', historicalNote: 'Forteresse verrouillant la frontière chinoise face au Kouang-Si.' },
    annam: { historicalName: 'Annam (Protectorat Français)', adminTitle: 'Résidence Supérieure en Annam (Huế)', historicalNote: 'Empire traditionnel d\'Annam gouverné par la dynastie Nguyễn sous le protectorat français.' },
    hue: { historicalName: 'Huế (Annam)', adminTitle: 'Cité Impériale d\'Annam & Cour de Bảo Đại', historicalNote: 'Capitale impériale d\'Annam et résidence de l\'Empereur Bảo Đại.' },
    tourane: { historicalName: 'Tourane (Đà Nẵng)', adminTitle: 'Concession Française et Port d\'Annam', historicalNote: 'Grand port d\'escale au centre du littoral vietnamien.' },
    cochinchine: { historicalName: 'Cochinchine (Colonie Française)', adminTitle: 'Gouvernement de la Cochinchine (Saïgon)', historicalNote: 'Seule possession d\'Indochine jouissant du statut de colonie française directe, grand grenier à riz du Mékong.' },
    saigon: { historicalName: 'Saïgon (Cochinchine)', adminTitle: 'Capitale de la Cochinchine & "Perle de l\'Extrême-Orient"', historicalNote: 'Grand port fluvial, centre économique et siège des grandes maisons de négoce et de caoutchouc.' },
    cambodge: { historicalName: 'Protectorat Français du Cambodge', adminTitle: 'Résidence Supérieure au Cambodge (Phnom Penh)', historicalNote: 'Royaume khmer sous le roi Sisowath Monivong, célèbre pour les temples millénaires d\'Angkor.' },
    phnom_penh: { historicalName: 'Phnom Penh', adminTitle: 'Capitale Royale du Cambodge', historicalNote: 'Résidence du roi des Khmers au confluent des Quatre-Bras du Mékong.' },
    laos: { historicalName: 'Protectorat Français du Laos', adminTitle: 'Résidence Supérieure au Laos (Vientiane)', historicalNote: 'Royaume de Luang Prabang et principautés laotiennes sous le roi Sisavang Vong.' },
    vientiane: { historicalName: 'Vientiane', adminTitle: 'Chef-lieu Administratif du Laos', historicalNote: 'Centre de la présence française le long du haut Mékong.' },
    kouang_tcheou_wan: { historicalName: 'Territoire de Kouang-Tchéou-Wan (Chine)', adminTitle: 'Territoire à Bail Français (Fort-Bayard)', historicalNote: 'Territoire côtier en baie de Zhanjiang cédé à bail par la Chine en 1898, rattaché administrativement à l\'Indochine.' },
  },
  VIC_IND: {
    indochine: { historicalName: 'Indochine Française (Vichy / Présence Japonaise)', adminTitle: 'Gouvernement Général de l\'Amiral Jean Decoux (Vichy)', historicalNote: 'Sous la pression militaire de Tokyo, Decoux signe l\'accord de septembre 1940 autorisant le stationnement de troupes japonaises au Tonkin tout en maintenant la souveraineté de Vichy.' },
    hanoi: { historicalName: 'Hanoï (Tonkin — Vichy)', adminTitle: 'Gouvernement Général de Jean Decoux', historicalNote: 'Administration maintenue sous haute surveillance de la mission militaire nippone du général Nishihara.' },
    haiphong: { historicalName: 'Haïphong (Tonkin — Vichy)', adminTitle: 'Port de Débarquement des Troupes Japonaises (Sept. 1940)', historicalNote: 'Débarquement des troupes impériales nippones conformément aux accords franco-japonais.' },
    lang_son: { historicalName: 'Lạng Sơn (Tonkin — Invasion Japonaise)', adminTitle: 'Théâtre de la Bataille de Lạng Sơn (22-25 sept. 1940)', historicalNote: 'La 5e division japonaise attaque violemment la garnison française en violation des ordres avant un cessez-le-feu négocié.' },
    saigon: { historicalName: 'Saïgon (Cochinchine — Vichy)', adminTitle: 'Gouvernement de Cochinchine (Vichy)', historicalNote: 'Base navale et commerciale préservée temporairement des opérations directes.' },
    phnom_penh: { historicalName: 'Phnom Penh (Vichy)', adminTitle: 'Protectorat du Cambodge (Vichy)', historicalNote: 'Menacé sur sa frontière occidentale par les revendications territoriales de la Thaïlande de Phibun Songkhram.' },
    vientiane: { historicalName: 'Vientiane (Vichy)', adminTitle: 'Protectorat du Laos (Vichy)', historicalNote: 'Poste frontière sur le Mékong face aux incursions thaïlandaises.' },
  },
  F_SYR: {
    syrie: { historicalName: 'Mandat Français en Syrie et au Liban', adminTitle: 'Haut-Commissariat de la République Française au Levant (Beyrouth)', historicalNote: 'Mandat A de la Société des Nations (1920-1946). Haut-Commissaire Damien de Martel puis Gabriel Puaux.' },
    damas: { historicalName: 'Damas (Città di Damasco)', adminTitle: 'Capitale de l\'État de Syrie & Siège du Parlement', historicalNote: 'Cité millénaire, berceau de l\'arabisme et capitale de la République syrienne sous mandat.' },
    alep: { historicalName: 'Alep (Governatorato di Aleppo)', adminTitle: 'Métropole Commerciale du Nord Syrien & Base Aérienne de Nerab', historicalNote: 'Grand carrefour caravanier et ferroviaire au débouché de l\'Anatolie et de la Mésopotamie.' },
    homs: { historicalName: 'Homs (Governatorato di Homs)', adminTitle: 'Carrefour de l\'Oronte, Krak des Chevaliers & Palmyre', historicalNote: 'Verrou stratégique entre les monts Alaouites et le Liban; traversé par le double oléoduc IPC.' },
    hama: { historicalName: 'Hama (Governatorato di Hama)', adminTitle: 'Vallée de l\'Oronte & Norias Historiques', historicalNote: 'Cité aristocratique célèbre pour ses norias hydrauliques géantes et ses plaines céréalières.' },
    latakia: { historicalName: 'Lattaquié (Territoire des Alaouites)', adminTitle: 'Gouvernement de Lattaquié & Grand Port Méditerranéen', historicalNote: 'Région côtière côtoyant le Djebel Ansariyé, principal débouché maritime de la Syrie.' },
    tartus: { historicalName: 'Tartous (Territoire des Alaouites)', adminTitle: 'Port de Tartous & Île Fortifiée d\'Arwad', historicalNote: 'Ancienne Tortose franque avec la cathédrale templière et l\'île phénicienne d\'Arwad.' },
    idlib: { historicalName: 'Idlib (Distretto di Idlib)', adminTitle: 'Bassin Agricole du Djebel Zawiya', historicalNote: 'Centre oléicole et agricole stratégique entre la plaine d\'Alep et la côte de Lattaquié.' },
    hasaka: { historicalName: 'Al-Hassaké (Territoire de la Djézireh)', adminTitle: 'Haute-Mésopotamie Syrienne & Grenier Céréalier', historicalNote: 'Mosaïque ethnique et religieuse (Kurdes, Assyriens, Arméniens, Bédouins) entre Euphrate et Tigre.' },
    raqqa: { historicalName: 'Ar-Raqqa (Governatorato di Raqqa)', adminTitle: 'Moyen-Euphrate & Steppes Pastorales', historicalNote: 'Ancienne capitale abbasside d\'Haroun ar-Rachid et marché bédouin de la steppe semi-aride.' },
    deir_ez_zor: { historicalName: 'Deir ez-Zor (Governatorato di Deir ez-Zor)', adminTitle: 'Poste Frontière du Bas-Euphrate vers l\'Irak', historicalNote: 'Capitale fluviale dotée du célèbre pont suspendu français construit en 1927-1931.' },
    jebel_druze: { historicalName: 'Djebel Druze (Soueida)', adminTitle: 'Gouvernement du Djebel Druze (Famille al-Atrash)', historicalNote: 'Région volcanique montagneuse peuplée par la communauté druze autonome.' },
    hauran: { historicalName: 'Hauran (Deraa)', adminTitle: 'Plateau Céréalier du Hauran & Chemin de Fer du Hedjaz', historicalNote: 'Plaine basaltique fertile et frontière douanière vers l\'Émirat de Transjordanie.' },
    golan: { historicalName: 'Golan (Kouneitra)', adminTitle: 'Plateau du Golan, Mont Hermon & Sources du Jourdain', historicalNote: 'Verrou militaire basaltique dominant les sources du Jourdain et la Galilée.' },
    hatay: {
      historicalName: 'Sangiaccato di Alessandretta (Hatay)',
      adminTitle: 'Sanjak d\'Alexandrette · Statuto Autonomo nel Mandato di Siria',
      historicalNote: 'Distretto autonomo a forte componente turca, araba e armena amministrato dalla Francia fino alla nascita dello Stato di Hatay nel 1938.',
    },
    tr631: {
      historicalName: 'Sangiaccato di Alessandretta (Hatay)',
      adminTitle: 'Sanjak d\'Alexandrette · Statuto Autonomo nel Mandato di Siria',
      historicalNote: 'Sangiaccato di Alessandretta sotto amministrazione mandataria francese.',
    },
    alexandrette: { historicalName: 'Sandjak d\'Alexandrette (Hatay)', adminTitle: 'Territoire Cédé à la Turquie (Traité du 23 juin 1939)', historicalNote: 'Territoire autonome du Levant cédé par la France à la République de Turquie en juin 1939 en échange d\'un pacte de neutralité mutuelle.' },
    liban: { historicalName: 'Grand Liban (République Libanaise)', adminTitle: 'État du Grand Liban sous Mandat Français', historicalNote: 'République parlementaire multiconfessionnelle présidée par Émile Éddé.' },
    beyrouth: { historicalName: 'Beyrouth (Città e Porto di Beirut)', adminTitle: 'Siège du Haut-Commissariat au Levant & Capitale du Liban', historicalNote: 'Grande métropole culturelle, bancaire et portuaire de la Méditerranée orientale.' },
    mont_liban: { historicalName: 'Mont-Liban (Governatorato del Monte Libano)', adminTitle: 'Gouvernorat du Mont-Liban (Baabda, Kesrouan & Chouf)', historicalNote: 'Foyer historique montagnard maronite et druze aux villages de pinèdes et monastères.' },
    tripoli_liban: { historicalName: 'Tripoli (Libano Settentrionale)', adminTitle: 'Gouvernorat du Liban-Nord & Terminal Oléoduc IPC', historicalNote: 'Deuxième port du pays avec le château Saint-Gilles et la raffinerie du pétrole de Kirkouk.' },
    akkar: { historicalName: 'Akkar (Distretto dell\'Akkar)', adminTitle: 'Gouvernorat de l\'Akkar (Halba & Nahr al-Kabir)', historicalNote: 'Plaine agricole fertile bordant la frontière fluviale syrienne du Nahr al-Kabir.' },
    bekaa: { historicalName: 'Békaa (Governatorato della Beqaa)', adminTitle: 'Vallée de la Békaa, Zahlé & Base Aérienne de Rayak', historicalNote: 'Dépression alluviale fertile entre Mont-Liban et Anti-Liban arrosée par le Litani; vignobles de Ksara.' },
    baalbek: { historicalName: 'Baalbek (Distretto di Baalbek e Hermel)', adminTitle: 'Haute-Békaa & Cité Romaine d\'Héliopolis', historicalNote: 'Ruines romaines colossales du Temple de Jupiter et sources de l\'Oronte.' },
    sud_liban: { historicalName: 'Liban-Sud (Sidone e Tiro)', adminTitle: 'Gouvernorat du Liban-Sud (Saïda, Sour & Jezzine)', historicalNote: 'Ports phéniciens millénaires et côte d\'agrumeraies reliant la Palestine mandataire.' },
    nabatieh: { historicalName: 'Nabatieh (Distretto di Nabatieh)', adminTitle: 'Djebel Amel, Marjayoun & Forteresse de Beaufort', historicalNote: 'Région collinaire chiite et château croisé de Beaufort dominant le fleuve Litani.' },
  },
  VIC_SYR: {
    syrie: { historicalName: 'Mandat de Syrie (Vichy)', adminTitle: 'Haut-Commissaire Général Henri Dentz (Vichy)', historicalNote: 'Le général Henri Dentz prend le commandement au nom de Vichy en décembre 1940, préparant la défense du Levant contre les Britanniques.' },
    damas: { historicalName: 'Damas (Syrie — Vichy)', adminTitle: 'État de Syrie sous Administration de Vichy', historicalNote: 'Gouvernement local surveillé par les troupes spéciales du Levant fidèles à Vichy; aéroport de Mezzeh ouvert à l\'Axe.' },
    alep: { historicalName: 'Alep (Syrie — Vichy)', adminTitle: 'Base Aérienne de Nerab (Fliegerführer Irak)', historicalNote: 'Escale stratégique pour les bombardiers de la Luftwaffe et de la Regia Aeronautica soutenant l\'Irak de Rashid Ali.' },
    homs: { historicalName: 'Homs (Syrie — Vichy)', adminTitle: 'Base d\'Aviation de Palmyre & Ligne IPC Suspendue', historicalNote: 'Oasis et terrain d\'aviation bombardés par la RAF britannique lors de la crise d\'Irak.' },
    beyrouth: { historicalName: 'Beyrouth (Liban — Vichy)', adminTitle: 'Grand Sérail & Quartier Général du Général Henri Dentz', historicalNote: 'Port militaire et siège du commandement vichyste des forces du Levant sous blocus de la Royal Navy.' },
    liban: { historicalName: 'Grand Liban (Vichy)', adminTitle: 'République Libanaise sous Tutelle de Vichy', historicalNote: 'Sous strict blocus maritime imposé par la Royal Navy basée en Palestine; pénurie de farine et carburant.' },
    tripoli_liban: { historicalName: 'Tripoli (Liban — Vichy)', adminTitle: 'Port de Tripoli sous Blocus Allié', historicalNote: 'Raffinerie paralysée par l\'arrêt du pétrole irakien; patrouilles d\'hydravions vichystes.' },
    bekaa: { historicalName: 'Békaa (Liban — Vichy)', adminTitle: 'Base Aérienne de Rayak (Armée de l\'Air de Vichy)', historicalNote: 'Aérodrome militaire servant de relais technique pour les appareils de l\'Axe vers l\'Irak.' },
  },
  F_MAD: {
    madagascar: { historicalName: 'Colonie de Madagascar et Dépendances', adminTitle: 'Gouvernement Général de Madagascar (Tananarive)', historicalNote: 'Grande île de l\'océan Indien et dépendances (archipel des Comores, île Sainte-Marie, Glorieuses, Kerguelen, Crozet).' },
    tananarive: { historicalName: 'Tananarive (Antananarivo)', adminTitle: 'Chef-lieu de Madagascar & Palais de la Reine (Rova)', historicalNote: 'Capitale administrative établie sur les collines de l\'Imerina sur les hauts plateaux centraux.' },
    diego_suarez: { historicalName: 'Diego-Suarez (Antsiranana)', adminTitle: 'Base Navale Stratégique de l\'Océan Indien', historicalNote: 'Immense rade fortifiée naturelle verrouillant la pointe nord de l\'île et le canal de Mozambique.' },
    tamatave: { historicalName: 'Tamatave (Toamasina)', adminTitle: 'Grand Port de la Côte Orientale', historicalNote: 'Débouché maritime principal des hauts plateaux et terminus du chemin de fer Tananarive-Côte Est.' },
    majunga: { historicalName: 'Majunga (Mahajanga)', adminTitle: 'Port du Canal de Mozambique', historicalNote: 'Port commercial du nord-ouest sur l\'estuaire de la Betsiboka.' },
    comores: { historicalName: 'Archipel des Comores (Dépendance de Madagascar)', adminTitle: 'Territoire des Comores (Grande Comore, Anjouan, Mohéli, Mayotte)', historicalNote: 'Îles sultaniennes rattachées au gouvernement général de Madagascar.' },
    reunion: { historicalName: 'La Réunion (Saint-Denis)', adminTitle: 'Colonie de La Réunion', historicalNote: 'Île à sucre française des Mascareignes dans le sud-ouest de l\'océan Indien.' },
  },
  VIC_MAD: {
    madagascar: { historicalName: 'Madagascar (Vichy)', adminTitle: 'Gouvernement Général d\'Armand Annet (Vichy)', historicalNote: 'Le gouverneur Armand Annet refuse tout ralliement à De Gaulle et maintient Madagascar sous strict contrôle de Vichy jusqu\'à l\'invasion britannique de 1942 (Opération Ironclad).' },
    tananarive: { historicalName: 'Tananarive (Madagascar — Vichy)', adminTitle: 'Gouvernement Général d\'Armand Annet', historicalNote: 'Administration coloniale fidèle au Maréchal Pétain.' },
    diego_suarez: { historicalName: 'Diego-Suarez (Vichy)', adminTitle: 'Base Navale de Vichy dans l\'Océan Indien', historicalNote: 'Batteries côtières et flottille de sous-marins sous statut d\'armistice.' },
  },
  F_SOM: {
    djibouti: { historicalName: 'Côte Française des Somalis (Djibouti)', adminTitle: 'Colonie de Djibouti (Gouverneur Hubert Deschamps)', historicalNote: 'Territoire stratégique à l\'entrée de la mer Rouge et débouché ferroviaire unique de l\'Empire éthiopien.' },
    obock: { historicalName: 'Obock', adminTitle: 'Poste Historique du Golfe de Tadjourah', historicalNote: 'Premier point d\'ancrage français fondé en 1862.' },
  },
  VIC_SOM: {
    djibouti: { historicalName: 'Côte Française des Somalis (Gibuti — Vichy)', adminTitle: 'Gouverneur Pierre Nouailhetas (Régime de Vichy)', historicalNote: 'Pierre Nouailhetas instaure un régime autoritaire pétainiste rigoureux et résiste pendant plus de deux ans au blocus naval britannique total.' },
  },
  F_COL: {
    djibouti: { historicalName: 'Côte Française des Somalis (Djibouti)', adminTitle: 'Colonie de la Côte Française des Somalis', historicalNote: 'Port franc et base d\'escale stratégique de la mer Rouge.' },
    guyane: { historicalName: 'Guyane Française (Cayenne)', adminTitle: 'Colonie de la Guyane Française (Gouverneur René Veber)', historicalNote: 'Territoire sud-américain équatorial, extraction aurifère et bagne de Cayenne.' },
    cayenne: { historicalName: 'Cayenne', adminTitle: 'Chef-lieu de la Guyane Française', historicalNote: 'Centre administratif de la colonie de Guyane.' },
    guadeloupe: { historicalName: 'Guadeloupe (Basse-Terre / Pointe-à-Pitre)', adminTitle: 'Colonie de la Guadeloupe (Antilles françaises)', historicalNote: 'Archipel des Petites Antilles (Basse-Terre, Grande-Terre, Marie-Galante, Les Saintes, Saint-Barthélemy, Saint-Martin).' },
    martinique: { historicalName: 'Martinique (Fort-de-France)', adminTitle: 'Haut-Commissariat aux Antilles (Amiral Georges Robert)', historicalNote: 'Siège de l\'amiral Robert ; le porte-avions Béarn et le croiseur Émile Bertin y immobilisent 286 tonnes d\'or de la Banque de France.' },
    st_pierre: { historicalName: 'Saint-Pierre-et-Miquelon', adminTitle: 'Territoire Français de Saint-Pierre-et-Miquelon', historicalNote: 'Archipel nord-atlantique au large de Terre-Neuve, administré par Gilbert de Bournat.' },
    nouvelle_caledonie: { historicalName: 'Nouvelle-Calédonie (Nouméa)', adminTitle: 'Ralliée à la France Libre (19 septembre 1940)', historicalNote: 'Henri Sautot mène le ralliement de la Nouvelle-Calédonie à De Gaulle ; premier producteur mondial de nickel stratégique.' },
    noumea: { historicalName: 'Nouméa', adminTitle: 'Chef-lieu de la Nouvelle-Calédonie', historicalNote: 'Port du nickel et future grande base aéronavale des forces alliées dans le Pacifique.' },
    tahiti: { historicalName: 'Établissements Français de l\'Océanie (Tahiti / Papeete)', adminTitle: 'Ralliés à la France Libre (2 septembre 1940)', historicalNote: 'Par plébiscite populaire historique (5.564 voix contre 18), la Polynésie française se rallie au général de Gaulle.' },
    papeete: { historicalName: 'Papeete', adminTitle: 'Chef-lieu des Établissements Français de l\'Océanie', historicalNote: 'Port de ralliement des volontaires tahitiens du Bataillon du Pacifique.' },
    inde_francaise: { historicalName: 'Établissements Français dans l\'Inde (Pondichéry)', adminTitle: 'Comptoirs Français de l\'Inde (Gouverneur Louis Bonvin)', historicalNote: 'Ensemble de cinq comptoirs souverains enclavés dans les Indes britanniques (Pondichéry, Chandernagor, Karikal, Mahé, Yanaon), ralliés à la France Libre le 9 septembre 1940.' },
    pondichery: { historicalName: 'Pondichéry', adminTitle: 'Chef-lieu des Établissements Français dans l\'Inde', historicalNote: 'Capitale des comptoirs sur la côte de Coromandel, ralliée avec enthousiasme à la France Libre par Louis Bonvin.' },
    chandernagor: { historicalName: 'Chandernagor', adminTitle: 'Comptoir Français du Bengale (rive de l\'Hooghly)', historicalNote: 'Comptoir enclavé au nord de Calcutta.' },
    karikal: { historicalName: 'Karikal', adminTitle: 'Comptoir Français de la Côte de Coromandel', historicalNote: 'Comptoir dans le delta de la Cauvery.' },
    mahe: { historicalName: 'Mahé', adminTitle: 'Comptoir Français de la Côte de Malabar', historicalNote: 'Comptoir sur la mer d\'Arabie (côte sud-ouest de l\'Inde).' },
    yanaon: { historicalName: 'Yanaon', adminTitle: 'Comptoir Français du Delta de la Godavari', historicalNote: 'Comptoir sur la côte orientale de l\'Inde.' },
    nouvelles_hebrides: { historicalName: 'Nouvelles-Hébrides (Condominium Franco-Britannique)', adminTitle: 'Condominium des Nouvelles-Hébrides (Port-Vila)', historicalNote: 'Archipel océanien gouverné conjointement par la France et le Royaume-Uni ; premier territoire au monde à se rallier à la France Libre (20 juillet 1940) sous Henri Sautot.' },
  },

  // ================= IMPERO BRITANNICO & DOMINIONS =================
  UK: {
    london: { historicalName: 'London', adminTitle: 'Capital of the British Empire', historicalNote: 'Capitale metropolitana dell\'Impero Britannico, sede di Westminster e del Gabinetto di Guerra.' },
    edinburgh: { historicalName: 'Edinburgh & Lothian', adminTitle: 'Scottish Capital (Scottish Command)', historicalNote: 'Capitale storica della Scozia e difese costiere dell\'estuario del Forth.' },
    glasgow: { historicalName: 'Glasgow & Clydeside', adminTitle: 'Clyde Shipyards & Industrial Heartland', historicalNote: 'Cantieri navali John Brown & Co. e polo metallurgico pesante.' },
    scapa_flow: { historicalName: 'Scapa Flow (Orkney)', adminTitle: 'Home Fleet Primary Anchorage', historicalNote: 'Rada fortificata quartier generale della Home Fleet britannica.' },
    belfast: { historicalName: 'Belfast & County Antrim', adminTitle: 'Harland & Wolff Shipyards', historicalNote: 'Arsenale navale dell\'Irlanda del Nord costruttore della HMS Belfast.' },
    londonderry: { historicalName: 'Londonderry (Port of Foyle)', adminTitle: 'Western Approaches Escort Base', historicalNote: 'Base avanzata per le flottiglie di scorta ai convogli atlantici.' },
    cardiff: { historicalName: 'Cardiff & Glamorgan', adminTitle: 'South Wales Coalfield & Metallurgy', historicalNote: 'Esportatore di carbone navale Admiralty e polo siderurgico.' },
    swansea: { historicalName: 'Swansea & South Wales', adminTitle: 'Admiralty Coal & Tinplate Mills', historicalNote: 'Porto minerario e laminatoi del Galles meridionale.' },
    portsmouth: { historicalName: 'Portsmouth', adminTitle: 'HMNB Portsmouth (Major Naval Dockyard)', historicalNote: 'Base principale della flotta da battaglia nella Manica.' },
    southampton: { historicalName: 'Southampton', adminTitle: 'Transatlantic Terminal & Supermarine Works', historicalNote: 'Stabilimenti aeronautici costruttori del caccia Spitfire.' },
    plymouth: { historicalName: 'Plymouth & Devonport', adminTitle: 'HMNB Devonport (Western Approaches)', historicalNote: 'Il più esteso arsenale navale britannico in Europa.' },
    dover: { historicalName: 'Dover (Hellfire Corner)', adminTitle: 'Fortress Dover & Channel Command', historicalNote: 'Centro nevralgico dell\'Operazione Dynamo e della difesa della Manica.' },
    birmingham: { historicalName: 'Birmingham', adminTitle: 'Industrial Arsenal (BSA & Castle Bromwich)', historicalNote: 'Cuore della produzione di armi leggere e caccia Spitfire.' },
    coventry: { historicalName: 'Coventry', adminTitle: 'Aero Engines & Ordnance Heartland', historicalNote: 'Polo di motori aeronautici Armstrong Siddeley e veicoli militari.' },
    manchester: { historicalName: 'Manchester & Salford', adminTitle: 'Avro Aircraft Works & Industrial Basin', historicalNote: 'Stabilimenti A.V. Roe e polo industriale di Trafford Park.' },
    liverpool: { historicalName: 'Liverpool & Merseyside', adminTitle: 'Western Approaches Terminal', historicalNote: 'Snodo logistico primario per i convogli transatlantici e cantieri Cammell Laird.' },
    sheffield: { historicalName: 'Sheffield', adminTitle: 'Steel Capital of the Empire & Naval Armor', historicalNote: 'Acciaierie Hadfields e piastre di corazzatura per navi da battaglia.' },
    leeds: { historicalName: 'Leeds & Bradford', adminTitle: 'Military Textiles & Heavy Engineering', historicalNote: 'Polo tessile per uniformi e ingegneria pesante bellica.' },
    newcastle: { historicalName: 'Newcastle upon Tyne', adminTitle: 'Swan Hunter & Vickers-Armstrongs Yards', historicalNote: 'Cantieri navali costruttori della HMS King George V.' },
    bristol: { historicalName: 'Bristol & Avonmouth', adminTitle: 'Bristol Aeroplane Company & Western Docks', historicalNote: 'Stabilimenti aeronautici di Filton (Blenheim e Beaufighter).' },
    gibraltar: { historicalName: 'Gibraltar (The Rock)', adminTitle: 'Crown Colony & Fortress (Force H)', historicalNote: 'Baluardo strategico all\'imbocco del Mediterraneo e sede della Force H.' },
    malta: { historicalName: 'Malta (Valletta Grand Harbour)', adminTitle: 'Crown Colony & Naval Fortress', historicalNote: 'Base avanzata della Mediterranean Fleet nel Canale di Sicilia.' },
    cyprus: { historicalName: 'Cyprus (Nicosia)', adminTitle: 'Crown Colony of Cyprus', historicalNote: 'Colonia della Corona a presidio del Mediterraneo orientale.' },
    palestine: {
      historicalName: 'Mandato Britannico della Palestina',
      adminTitle: 'British Mandate for Palestine · League of Nations Class A Mandate',
      historicalNote: 'Mandato di Classe A della Società delle Nazioni sotto amministrazione civile britannica con sede a Gerusalemme.'
    },
    jerusalem: {
      historicalName: 'Mandato di Palestina — Distretto di Gerusalemme',
      adminTitle: "Jerusalem District · Sede dell'Alto Commissario Britannico (Government House)",
      historicalNote: 'Capitale mandataria, sede dell\'Alto Commissario al Government House e centro spirituale delle tre fedi monoteiste.'
    },
    pal_jrs: {
      historicalName: 'Mandato di Palestina — Distretto di Gerusalemme',
      adminTitle: "Jerusalem District · Sede dell'Alto Commissario Britannico (Government House)",
      historicalNote: 'Capitale mandataria e centro amministrativo, diplomatico e spirituale supremo.'
    },
    haifa: {
      historicalName: 'Mandato di Palestina — Distretto di Haifa',
      adminTitle: 'Haifa District · Base Navale della Royal Navy & Terminale Oleodotto Kirkuk-Haifa (IPC)',
      historicalNote: 'Porto principale in acque profonde, raffinerie CRL e terminale dell\'oleodotto petrolifero transdesertico dell\'Iraq.'
    },
    pal_hfa: {
      historicalName: 'Mandato di Palestina — Distretto di Haifa',
      adminTitle: 'Haifa District · Base Navale della Royal Navy & Terminale Oleodotto Kirkuk-Haifa (IPC)',
      historicalNote: 'Porto navale strategico alleato, raffinazione del greggio e capolinea ferroviario della costa.'
    },
    jaffa: {
      historicalName: 'Mandato di Palestina — Sottodistretto di Jaffa e Tel Aviv',
      adminTitle: "Jaffa & Tel Aviv Sub-District · Polo Economico dell'Yishuv & Porto Storico di Giaffa",
      historicalNote: 'Metropoli modernista di Tel Aviv affiancata all\'antico porto arabo di Giaffa.'
    },
    telaviv: {
      historicalName: 'Mandato di Palestina — Sottodistretto di Jaffa e Tel Aviv',
      adminTitle: "Jaffa & Tel Aviv Sub-District · Polo Economico dell'Yishuv & Porto Storico di Giaffa",
      historicalNote: 'La "Città Bianca" Bauhaus, centro vitale dell\'Yishuv, della stampa, finanza e industria.'
    },
    pal_tlv: {
      historicalName: 'Mandato di Palestina — Sottodistretto di Jaffa e Tel Aviv',
      adminTitle: "Jaffa & Tel Aviv Sub-District · Polo Economico dell'Yishuv & Porto Storico di Giaffa",
      historicalNote: 'Polo urbano ed economico principale con i porti gemelli di Giaffa e Tel Aviv.'
    },
    galilee: {
      historicalName: 'Mandato di Palestina — Distretto di Galilea',
      adminTitle: 'Galilee District (Nazareth, Acri & Safed) · Frontiera Settentrionale Mandataria',
      historicalNote: 'Regione settentrionale collinare (Nazareth, Safed, Tiberiade e Acri), linea fortificata Tegart sul confine con Siria e Libano.'
    },
    pal_gal: {
      historicalName: 'Mandato di Palestina — Distretto di Galilea',
      adminTitle: 'Galilee District (Nazareth, Acri & Safed) · Frontiera Settentrionale Mandataria',
      historicalNote: 'Frontiera settentrionale verso il Mandato francese; settore di radunata dell\'Operazione Exporter nel 1941.'
    },
    samaria: {
      historicalName: 'Mandato di Palestina — Samaria e Giudea',
      adminTitle: 'Samaria & Judea Districts (Nablus, Jenin & Hebron) · Roccaforte della Montagna',
      historicalNote: 'Dorsale montuosa centrale della Palestina (Cisgiordania), cuore rurale della coltivazione dell\'olivo e roccaforte della rivolta araba.'
    },
    pal_sam: {
      historicalName: 'Mandato di Palestina — Samaria e Giudea',
      adminTitle: 'Samaria & Judea Districts (Nablus, Jenin & Hebron) · Roccaforte della Montagna',
      historicalNote: 'Distretti montani di Nablus, Jenin, Tulkarm e Hebron presidiati da forti Tegart della polizia britannica.'
    },
    lydda: {
      historicalName: 'Mandato di Palestina — Distretto di Lydda e Sharon',
      adminTitle: 'Lydda District (Lod & Ramle) · Snodo Ferroviario Mandatario & Base Aerea RAF Lydda',
      historicalNote: 'Snodo ferroviario centrale della Palestina e aeroporto internazionale strategico della RAF.'
    },
    pal_lyd: {
      historicalName: 'Mandato di Palestina — Distretto di Lydda e Sharon',
      adminTitle: 'Lydda District (Lod & Ramle) · Snodo Ferroviario Mandatario & Base Aerea RAF Lydda',
      historicalNote: 'Piana costiera di Sharon, crocevia delle linee ferroviarie verso l\'Egitto e la Siria e base aerea di Lydda.'
    },
    gaza: {
      historicalName: 'Mandato di Palestina — Distretto di Gaza',
      adminTitle: "Gaza District · Corridoio Costiero verso il Sinai & Posto di Frontiera con l'Egitto",
      historicalNote: 'Antico varco costiero verso il deserto del Sinai e l\'Egitto, snodo doganale e ferroviario.'
    },
    pal_gaz: {
      historicalName: 'Mandato di Palestina — Distretto di Gaza',
      adminTitle: "Gaza District · Corridoio Costiero verso il Sinai & Posto di Frontiera con l'Egitto",
      historicalNote: 'Fascia litoranea meridionale a controllo della linea ferroviaria trans-sinaitica verso Il Cairo.'
    },
    beersheba: {
      historicalName: 'Mandato di Palestina — Distretto di Beersheba (Negev)',
      adminTitle: 'Beersheba Sub-District · Territorio Beduino del Negev & Sbocco sul Golfo di Aqaba',
      historicalNote: 'Vasto territorio semiarido e desertico del Negev esteso fino al Mar Rosso (Umm Rashrash / Aqaba).'
    },
    pal_beer: {
      historicalName: 'Mandato di Palestina — Distretto di Beersheba (Negev)',
      adminTitle: 'Beersheba Sub-District · Territorio Beduino del Negev & Sbocco sul Golfo di Aqaba',
      historicalNote: 'Distretto meridionale beduino pattugliato dalla Transjordan Frontier Force e accesso al Mar Rosso.'
    },
    transjordan: { historicalName: 'Emirate of Transjordan (Amman)', adminTitle: 'British Protectorate (Emir Abdullah)' },
    amman: { historicalName: 'Amman', adminTitle: 'Capital of Transjordan' },
    iraq: { historicalName: 'Kingdom of Iraq (Baghdad)', adminTitle: 'British Sphere of Influence (1930 Treaty)' },
    baghdad: { historicalName: 'Baghdad (Iraq)', adminTitle: 'Hashemite Kingdom of Iraq' },
    basra: { historicalName: 'Basra (Iraq)', adminTitle: 'RAF Shaibah & Oil Terminal' },
    aden: { historicalName: 'Aden Colony and Protectorate', adminTitle: 'Crown Colony of Aden' },
    egypt: { historicalName: 'Kingdom of Egypt (Cairo)', adminTitle: 'British Sphere (1936 Anglo-Egyptian Treaty)' },
    cairo: { historicalName: 'Cairo (Egypt)', adminTitle: 'HQ British Troops in Egypt / Middle East Command' },
    alexandria: { historicalName: 'Alexandria (Egypt)', adminTitle: 'Mediterranean Fleet HQ' },
    suez: { historicalName: 'Suez Canal Zone', adminTitle: 'British Military Protection Zone' },
    sudan: { historicalName: 'Anglo-Egyptian Sudan (Khartoum)', adminTitle: 'Condominium (Governor-General)' },
    south_sudan: { historicalName: 'Anglo-Egyptian Sudan — Southern Provinces (Juba)', adminTitle: 'Closed Districts Administration (Juba)' },
    khartoum: { historicalName: 'Khartoum (Sudan)', adminTitle: 'Governor-General Palace' },
    juba: { historicalName: 'Juba (Equatoria)', adminTitle: 'Southern Administration Headquarters' },
    kenya: { historicalName: 'Kenya Colony and Protectorate', adminTitle: 'British East Africa' },
    nairobi: { historicalName: 'Nairobi (Kenya)', adminTitle: 'Capital of Kenya Colony' },
    uganda: { historicalName: 'Uganda Protectorate (Entebbe)', adminTitle: 'British Protectorate' },
    tanganyika: { historicalName: 'Tanganyika Territory (Dar es Salaam)', adminTitle: 'British League of Nations Mandate' },
    zanzibar: { historicalName: 'Zanzibar Protectorate', adminTitle: 'British Resident' },
    somaliland: { historicalName: 'British Somaliland (Berbera)', adminTitle: 'Protectorate of British Somaliland' },
    nigeria: { historicalName: 'Colony and Protectorate of Nigeria', adminTitle: 'British West Africa (Lagos)' },
    lagos: { historicalName: 'Lagos (Nigeria)', adminTitle: 'Governor-General of Nigeria' },
    gold_coast: { historicalName: 'Gold Coast (Accra)', adminTitle: 'British Colony (Ghana)' },
    sierra_leone: { historicalName: 'Sierra Leone (Freetown)', adminTitle: 'Major Royal Navy Convoy Anchorage' },
    gambia: { historicalName: 'Gambia Colony (Bathurst)', adminTitle: 'British West Africa' },
    n_rhodesia: { historicalName: 'Northern Rhodesia (Lusaka)', adminTitle: 'Copperbelt Protectorate (Zambia)' },
    s_rhodesia: { historicalName: 'Southern Rhodesia (Salisbury)', adminTitle: 'Self-Governing Colony (Zimbabwe)' },
    nyasaland: { historicalName: 'Nyasaland Protectorate (Zomba)', adminTitle: 'British Protectorate (Malawi)' },
    bechuanaland: { historicalName: 'Bechuanaland Protectorate (Mafeking)', adminTitle: 'High Commission Territory (Botswana)' },
    basutoland: { historicalName: 'Basutoland (Maseru)', adminTitle: 'Crown Colony (Lesotho)' },
    swaziland: { historicalName: 'Swaziland (Mbabane)', adminTitle: 'High Commission Territory (Eswatini)' },
    hong_kong: { historicalName: 'Hong Kong (Victoria)', adminTitle: 'Crown Colony of Hong Kong' },
    singapore: { historicalName: 'Singapore (Straits Settlements)', adminTitle: 'Fortress Singapore / Royal Navy Eastern Base' },
    malaya: { historicalName: 'Federated Malay States (Kuala Lumpur)', adminTitle: 'British Malaya' },
    burma: { historicalName: 'British Burma (Rangoon)', adminTitle: 'Separated Crown Colony (from 1937)' },
    ceylon: { historicalName: 'Ceylon (Colombo)', adminTitle: 'Crown Colony of Ceylon (Sri Lanka)' },
    newfoundland: { historicalName: 'Dominion of Newfoundland (St. John\'s)', adminTitle: 'Commission of Government' },
    guyana: { historicalName: 'British Guiana (Georgetown)', adminTitle: 'Crown Colony' },
    trinidad: { historicalName: 'Trinidad and Tobago (Port of Spain)', adminTitle: 'British West Indies' },
    jamaica: { historicalName: 'Jamaica (Kingston)', adminTitle: 'British West Indies' },
    bahamas: { historicalName: 'Bahamas (Nassau)', adminTitle: 'Crown Colony' },
    bermuda: { historicalName: 'Bermuda (Hamilton)', adminTitle: 'Royal Navy Dockyard' },
    falkland: { historicalName: 'Falkland Islands (Stanley)', adminTitle: 'Crown Colony and Naval Base' },
    mesopotamia: { historicalName: 'Kingdom of Iraq (Mesopotamia)', adminTitle: 'British Sphere of Influence / Anglo-Iraqi Treaty' },
    british_mesopotamia: { historicalName: 'Kingdom of Iraq (British Mesopotamia)', adminTitle: 'British Sphere of Influence (Baghdad)' },
    mandate_of_mesopotamia: { historicalName: 'Kingdom of Iraq (Mandate of Mesopotamia)', adminTitle: 'League of Nations Mandate (United Kingdom)' },
    mosul: { historicalName: 'Mosul (Kingdom of Iraq)', adminTitle: 'Kingdom of Iraq (British Garrison)' },
    isle_of_man: { historicalName: 'Isle of Man (Douglas)', adminTitle: 'Crown Dependency of the Isle of Man' },
    isle_of_mann: { historicalName: 'Isle of Man (Douglas)', adminTitle: 'Crown Dependency of the Isle of Man' },
    man: { historicalName: 'Isle of Man (Douglas)', adminTitle: 'Crown Dependency of the Isle of Man' },
    mann: { historicalName: 'Isle of Man (Douglas)', adminTitle: 'Crown Dependency of the Isle of Man' },
    jersey: { historicalName: 'Bailiwick of Jersey (Saint Helier)', adminTitle: 'Crown Dependency of Jersey' },
    guernsey: { historicalName: 'Bailiwick of Guernsey (Saint Peter Port)', adminTitle: 'Crown Dependency of Guernsey' },
    channel_islands: { historicalName: 'Channel Islands', adminTitle: 'British Crown Dependencies' },
  },

  // ================= IMPERO GIAPPONESE (JAP) =================
  JAP: {
    tokyo: { historicalName: 'Tōkyō', adminTitle: 'Dai Nippon Teikoku' },
    osaka: { historicalName: 'Ōsaka', adminTitle: 'Naichi' },
    kyoto: { historicalName: 'Kyōto', adminTitle: 'Naichi' },
    korea: { historicalName: 'Chōsen', adminTitle: 'Chōsen Sōtokufu' },
    seoul: { historicalName: 'Keijō (Seoul)', adminTitle: 'Chōsen Sōtokufu' },
    pyongyang: { historicalName: 'Heijō (Pyongyang)', adminTitle: 'Heian-nandō' },
    busan: { historicalName: 'Fusan (Busan)', adminTitle: 'Chōsen Fusan-fu' },
    taiwan: { historicalName: 'Taiwan', adminTitle: 'Taiwan Sōtokufu (Taihoku)' },
    taipei: { historicalName: 'Taihoku (Taipei)', adminTitle: 'Taiwan Sōtokufu' },
    kaohsiung: { historicalName: 'Takao (Kaohsiung)', adminTitle: 'Takao-shū' },
    sakhalin: { historicalName: 'Karafuto', adminTitle: 'Karafuto-chō (Toyohara)' },
    toyohara: { historicalName: 'Toyohara (Yuzhno-Sakhalinsk)', adminTitle: 'Karafuto-chō' },
    kuril: { historicalName: 'Chishima Rettō', adminTitle: 'Hokkaidō-chō' },
    south_seas: { historicalName: 'Nan\'yō Guntō', adminTitle: 'Nan\'yō-chō (Saipan/Palau/Truk)' },
    saipan: { historicalName: 'Saipan (Nan\'yō Guntō)', adminTitle: 'Saipan Shichō' },
    palau: { historicalName: 'Koror / Palau (Nan\'yō Guntō)', adminTitle: 'Nan\'yō-chō Honchō' },
    kwantung: { historicalName: 'Kantō-shū', adminTitle: 'Kantō-chō (Ryojun / Dairen)' },
    dalian: { historicalName: 'Dairen (Dalian)', adminTitle: 'Kantō-shū' },
    port_arthur: { historicalName: 'Ryojun (Port Arthur)', adminTitle: 'Ryojun Keibifu' },
    beijing_occ: { historicalName: 'Peking (Chūka Minkoku Rinji Seifu)', adminTitle: 'Kitashina Haken-gun Shireibu' },
    shanghai_occ: { historicalName: 'Shanhai', adminTitle: 'Kaigun Tokubetsu Rikusentai' },
    nanjing_occ: { historicalName: 'Nankin (Chūka Minkoku Shinsei Seifu)', adminTitle: 'Shina Haken-gun Shireibu' },
    wuhan_occ: { historicalName: 'Kankō / Wuhan', adminTitle: 'Shina Haken-gun' },
    guangzhou_occ: { historicalName: 'Kanton / Guangzhou', adminTitle: 'Minamishina Haken-gun' },
    hainan_occ: { historicalName: 'Kainan-tō', adminTitle: 'Kaigun Kainan-tō Keibifu' },
  },

  // ================= REPUBBLICA DI CINA & STATI REGIONALI CINESI =================
  CHI: {
    nanjing: { historicalName: 'Nanjing', adminTitle: 'Zhōnghuá Mínguó Shǒudū (1936-37)' },
    chongqing: { historicalName: 'Chongqing (Péidū)', adminTitle: 'Zhōnghuá Mínguó Guómín Zhèngfǔ (Chiang Kai-shek)' },
    beiping: { historicalName: 'Beiping', adminTitle: 'Zhōnghuá Mínguó — Jì-Chá Zhèngwù Wěiyuánhuì' },
    shanghai: { historicalName: 'Shanghai', adminTitle: 'Zhōnghuá Mínguó — Shanghai Tebieshi' },
    guangzhou: { historicalName: 'Guangzhou (Canton)', adminTitle: 'Zhōnghuá Mínguó — Guangdong Sheng' },
    wuhan: { historicalName: 'Wuhan (Hankou)', adminTitle: 'Zhōnghuá Mínguó — Línshí Shǒudū' },
    changsha: { historicalName: 'Changsha', adminTitle: 'Zhōnghuá Mínguó — Xue Yue Dì-Jiǔ Zhànqū' },
    kunming: { historicalName: 'Kunming', adminTitle: 'Zhōnghuá Mínguó — Yunnan Sheng (Long Yun / Burma Road)' },
    lanzhou: { historicalName: 'Lanzhou', adminTitle: 'Zhōnghuá Mínguó — Gansu Sheng (Operazione Zet)' },
    xining: { historicalName: 'Xining', adminTitle: 'Zhōnghuá Mínguó — Qinghai Sheng (Ma Bufang)' },
    yinchuan: { historicalName: 'Yinchuan', adminTitle: 'Zhōnghuá Mínguó — Ningxia Sheng (Ma Hongkui)' },
    guilin: { historicalName: 'Guilin', adminTitle: 'Zhōnghuá Mínguó — Guangxi Sheng (Li Zongren / Bai Chongxi)' },
    fuzhou: { historicalName: 'Fuzhou', adminTitle: 'Zhōnghuá Mínguó — Fujian Sheng' },
    chengdu: { historicalName: 'Chengdu', adminTitle: 'Zhōnghuá Mínguó — Sichuan Sheng' },
    guiyang: { historicalName: 'Guiyang', adminTitle: 'Zhōnghuá Mínguó — Guizhou Sheng' },
    yanan: { historicalName: 'Yan\'an', adminTitle: 'Shaan-Gan-Ning Bianqu (Zhonggong)' },
    xinjiang: { historicalName: 'Xinjiang', adminTitle: 'Xinjiang Sheng (Sheng Shicai)' },
    xizang: { historicalName: 'Xizang (Lhasa)', adminTitle: 'Bod Gzhung (Dalai Lama)' },
    yunnan: { historicalName: 'Yunnan (Kunming)', adminTitle: 'Yunnan Sheng (Long Yun)' },
  },
  WJ_CHI: {
    nanjing: { historicalName: 'Nanjing (Wang Jingwei)', adminTitle: 'Zhōnghuá Mínguó Wěi Zhèngfǔ' },
    beiping: { historicalName: 'Beiping (Huáběi Wěiyuánhuì)', adminTitle: 'Zhōnghuá Mínguó Wěi Zhèngfǔ' },
    shanghai: { historicalName: 'Shanghai Tebieshi', adminTitle: 'Zhōnghuá Mínguó Wěi Zhèngfǔ' },
    hankou: { historicalName: 'Hankou / Wuhan', adminTitle: 'Zhōnghuá Mínguó Wěi Zhèngfǔ' },
    hangzhou: { historicalName: 'Hangzhou', adminTitle: 'Zhōnghuá Mínguó Wěi Zhèngfǔ (Zhejiang)' },
  },
  MAN: {
    changchun: { historicalName: 'Hsinking (Xinjing)', adminTitle: 'Damanzhoudiguo Shǒudū (Puyi / Kangde)' },
    hsinking: { historicalName: 'Hsinking (Xinjing)', adminTitle: 'Damanzhoudiguo Shǒudū (Puyi / Kangde)' },
    shenyang: { historicalName: 'Mukden (Fengtian)', adminTitle: 'Damanzhoudiguo — Fengtian Sheng (Mantetsu)' },
    mukden: { historicalName: 'Mukden (Fengtian)', adminTitle: 'Damanzhoudiguo — Fengtian Sheng (Mantetsu)' },
    harbin: { historicalName: 'Harbin (Binjiang)', adminTitle: 'Damanzhoudiguo — Binjiang Sheng' },
    jilin: { historicalName: 'Kirin (Jilin)', adminTitle: 'Damanzhoudiguo — Jilin Sheng' },
    qiqihar: { historicalName: 'Tsitsihar (Longjiang)', adminTitle: 'Damanzhoudiguo — Longjiang Sheng' },
    jehol: { historicalName: 'Chengde (Rehe)', adminTitle: 'Damanzhoudiguo — Rehe Sheng' },
    chengde: { historicalName: 'Chengde (Rehe)', adminTitle: 'Damanzhoudiguo — Rehe Sheng' },
    hailar: { historicalName: 'Hailar (Beixing\'an)', adminTitle: 'Damanzhoudiguo — Xingan Beisheng' },
  },
  MEJ: {
    kalgan: { historicalName: 'Kalgan (Zhangjiakou)', adminTitle: 'Mengjiang Lianhe Zizhi Zhengfu (De Wang)' },
    zhangjiakou: { historicalName: 'Kalgan (Zhangjiakou)', adminTitle: 'Mengjiang Lianhe Zizhi Zhengfu (De Wang)' },
    hohhot: { historicalName: 'Guisui (Hohhot)', adminTitle: 'Mengjiang Lianhe Zizhi Zhengfu' },
    guisui: { historicalName: 'Guisui (Hohhot)', adminTitle: 'Mengjiang Lianhe Zizhi Zhengfu' },
    chahar: { historicalName: 'Chahar', adminTitle: 'Mengjiang Lianhe Zizhi Zhengfu' },
    suiyuan: { historicalName: 'Suiyuan', adminTitle: 'Mengjiang Lianhe Zizhi Zhengfu' },
  },
  CCP_CHI: {
    yanan: { historicalName: 'Yan\'an', adminTitle: 'Shaan-Gan-Ning Bianqu (Mao Zedong / Zhu De)' },
    baoan: { historicalName: 'Bao\'an (Zhidan)', adminTitle: 'Shaan-Gan-Ning Bianqu (Zhonggong)' },
    shaanxi: { historicalName: 'Shaan-Gan-Ning Bianqu', adminTitle: 'Eighth Route Army (Dì-Bā Lù Jūn)' },
  },
  XIN: {
    urumqi: { historicalName: 'Dihua (Ürümqi)', adminTitle: 'Xinjiang Duban Gongshu (Sheng Shicai)' },
    dihua: { historicalName: 'Dihua (Ürümqi)', adminTitle: 'Xinjiang Duban Gongshu (Sheng Shicai)' },
    kashgar: { historicalName: 'Kashgar (Shufu)', adminTitle: 'Xinjiang Duban Gongshu' },
    hami: { historicalName: 'Kumul / Hami', adminTitle: 'Xinjiang Duban Gongshu (Distaccamento Armata Rossa)' },
  },
  TIB: {
    lhasa: { historicalName: 'Lhasa (Bod Gzhung)', adminTitle: 'Kashag — Ganden Phodrang (Dalai Lama / Reting)' },
    shigatse: { historicalName: 'Shigatse (Bod)', adminTitle: 'Kashag — Monastero Tashilhunpo' },
    chamdo: { historicalName: 'Chamdo (Kham)', adminTitle: 'Bod Gzhung (Tibet Orientale)' },
  },

  // ================= COMMONWEALTH DELLE FILIPPINE =================
  PHL: {
    philippines: {
      historicalName: 'Commonwealth of the Philippines',
      adminTitle: 'Commonwealth of the Philippines (Associated State of the USA)',
      historicalNote: 'Established under the 1935 Commonwealth Constitution with President Manuel L. Quezon.',
    },
    filippine: {
      historicalName: 'Commonwealth of the Philippines',
      adminTitle: 'Commonwealth of the Philippines (Associated State of the USA)',
      historicalNote: 'Established under the 1935 Commonwealth Constitution with President Manuel L. Quezon.',
    },
    manila: { historicalName: 'Manila', adminTitle: 'Capital of the Commonwealth of the Philippines' },
    luzon: { historicalName: 'Luzon', adminTitle: 'Luzon Island' },
    mindanao: { historicalName: 'Mindanao', adminTitle: 'Mindanao Island' },
    visayas: { historicalName: 'Visayas', adminTitle: 'Visayan Islands' },
    cebu: { historicalName: 'Cebu', adminTitle: 'Province of Cebu' },
    davao: { historicalName: 'Davao', adminTitle: 'Province of Davao' },
    iloilo: { historicalName: 'Iloilo', adminTitle: 'Province of Iloilo' },
  },

  // ================= TANNU TUVA =================
  TUV: {
    tannu_tuva: {
      historicalName: 'Tyva Arat Respublika (Tannu Tuva)',
      adminTitle: 'Tyva Arat Respublika',
      historicalNote: 'Tuvan People\'s Republic under Salchak Toka.',
    },
    tuva: {
      historicalName: 'Tyva Arat Respublika',
      adminTitle: 'Tyva Arat Respublika',
      historicalNote: 'Kyzyl (Khem-Beldir).',
    },
    kyzyl: { historicalName: 'Kyzyl (Khem-Beldir)', adminTitle: 'Tyva Arat Respublika Naislal' },
  },

  // ================= LIBERIA =================
  LBR: {
    liberia: {
      historicalName: 'Republic of Liberia',
      adminTitle: 'Republic of Liberia',
      historicalNote: 'Sovereign Republic under President Edwin Barclay.',
    },
    monrovia: { historicalName: 'Monrovia', adminTitle: 'Capital of the Republic of Liberia' },
  },

  // ================= PAESI BASSI & INDIE OLANDESI =================
  HOL: {
    amsterdam: { historicalName: 'Amsterdam', adminTitle: 'Koninkrijk der Nederlanden' },
    den_haag: { historicalName: 'Den Haag', adminTitle: 'Regeringszetel' },
    batavia: { historicalName: 'Batavia', adminTitle: 'Hoofdstad van Nederlands-Indië' },
    surabaya: { historicalName: 'Soerabaja (Java)', adminTitle: 'Marinebasis Soerabaja' },
    bandung: { historicalName: 'Bandoeng (Java)', adminTitle: 'Hoofdkwartier KNIL' },
    medan: { historicalName: 'Medan (Sumatra)', adminTitle: 'Gouvernement Sumatra' },
    makassar: { historicalName: 'Makassar (Celebes)', adminTitle: 'Gouvernement Groote Oost' },
    balikpapan: { historicalName: 'Balikpapan (Borneo)', adminTitle: 'Bataafsche Petroleum Maatschappij (BPM)' },
    palembang: { historicalName: 'Palembang (Sumatra)', adminTitle: 'Bataafsche Petroleum Maatschappij (BPM)' },
    papua_dutch: { historicalName: 'Nederlands Nieuw-Guinea (Hollandia)', adminTitle: 'Nieuw-Guinea' },
    paramaribo: { historicalName: 'Paramaribo (Suriname)', adminTitle: 'Nederlands Guyana (Bauxiet)' },
    curacao: { historicalName: 'Willemstad (Curaçao)', adminTitle: 'Gebiedsdeel Curaçao' },
    aruba: { historicalName: 'Oranjestad (Aruba)', adminTitle: 'Gebiedsdeel Curaçao (Lago Oil & Transport Co.)' },
  },

  // ================= BELGIO & CONGO BELGA =================
  BEL: {
    bruxelles: { historicalName: 'Bruxelles / Brussel', adminTitle: 'Royaume de Belgique' },
    antwerpen: { historicalName: 'Antwerpen', adminTitle: 'Port d\'Anvers' },
    leopoldville: { historicalName: 'Léopoldville (Kinshasa)', adminTitle: 'Gouvernement Général du Congo Belge' },
    elisabethville: { historicalName: 'Élisabethville (Lubumbashi)', adminTitle: 'Katanga (Mines de cuivre et d\'uranium Union Minière)' },
    stanleyville: { historicalName: 'Stanleyville (Kisangani)', adminTitle: 'Province Orientale du Congo Belge' },
    matadi: { historicalName: 'Matadi', adminTitle: 'Port maritime du Congo Belge' },
    ruanda_urundi: { historicalName: 'Ruanda-Urundi (Usumbura)', adminTitle: 'Territoire sous mandat de la Société des Nations' },
  },

  // ================= PORTOGALLO & COLONIE =================
  POR: {
    lisboa: { historicalName: 'Lisboa', adminTitle: 'República Portuguesa (Estado Novo)' },
    porto: { historicalName: 'Porto', adminTitle: 'Portugal Continental' },
    luanda: { historicalName: 'Luanda (Angola)', adminTitle: 'Governo-Geral de Angola (África Ocidental Portuguesa)' },
    lourenco_marques: { historicalName: 'Lourenço Marques (Maputo)', adminTitle: 'Governo-Geral de Moçambique (África Oriental Portuguesa)' },
    beira: { historicalName: 'Beira (Moçambique)', adminTitle: 'Companhia de Moçambique' },
    bissau: { historicalName: 'Bissau (Guiné Portuguesa)', adminTitle: 'Colónia da Guiné' },
    praia: { historicalName: 'Praia (Cabo Verde)', adminTitle: 'Província de Cabo Verde' },
    sao_tome: { historicalName: 'São Tomé e Príncipe', adminTitle: 'Colónia de São Tomé' },
    goa: { historicalName: 'Goa (Pangim)', adminTitle: 'Estado Português da Índia' },
    macau: { historicalName: 'Macau', adminTitle: 'Colónia Portuguesa de Macau' },
    dili: { historicalName: 'Díli (Timor Português)', adminTitle: 'Colónia de Timor' },
    acores: { historicalName: 'Açores (Ponta Delgada/Angra)', adminTitle: 'Ilhas Adjacentes' },
    madeira: { historicalName: 'Madeira (Funchal)', adminTitle: 'Ilhas Adjacentes' },
  },

  // ================= TURCHIA & HATAY =================
  TUR: {
    ankara: { historicalName: 'Ankara', adminTitle: 'Türkiye Cumhuriyeti Başkenti' },
    istanbul: { historicalName: 'İstanbul', adminTitle: 'İstanbul İli (Türkiye Cumhuriyeti)' },
    izmir: { historicalName: 'İzmir', adminTitle: 'İzmir İli' },
    adana: { historicalName: 'Adana (Seyhan)', adminTitle: 'Seyhan İli' },
    bursa: { historicalName: 'Bursa', adminTitle: 'Bursa İli' },
    konya: { historicalName: 'Konya', adminTitle: 'Konya İli' },
    antalya: { historicalName: 'Antalya', adminTitle: 'Antalya İli' },
    trabzon: { historicalName: 'Trabzon', adminTitle: 'Trabzon İli' },
    erzurum: { historicalName: 'Erzurum', adminTitle: 'Erzurum İli' },
    diyarbakir: { historicalName: 'Diyarbakır', adminTitle: 'Diyarbakır İli' },
    kars: { historicalName: 'Kars', adminTitle: 'Kars İli' },
    edirne: { historicalName: 'Edirne', adminTitle: 'Edirne İli (Doğu Trakya)' },
    canakkale: { historicalName: 'Çanakkale', adminTitle: 'Çanakkale Boğazı (Montrö Boğazlar Sözleşmesi)' },
        hatay: {
      historicalName: 'Hatay (Antakya / İskenderun)',
      adminTitle: 'Hatay İli (Valiliği) · 63ª Provincia della Repubblica di Turchia',
      historicalNote: 'Territorio annesso alla Turchia nel giugno 1939 in seguito all\'accordo franco-turco. Sede del Vali e porto strategico di İskenderun sul Golfo di Alessandretta.',
    },
    tr631: {
      historicalName: 'Hatay (Antakya / İskenderun)',
      adminTitle: 'Hatay İli (Valiliği) · 63ª Provincia della Repubblica di Turchia',
      historicalNote: 'Provincia di frontiera meridionale della Turchia con capoluogo Antakya.',
    },
    alexandretta: { historicalName: 'İskenderun', adminTitle: 'Hatay İli · Porto di İskenderun' },
    antakya: { historicalName: 'Antakya', adminTitle: 'Hatay İli Merkezi' },
  },
  HAT: {
    hatay: {
      historicalName: 'Hatay Devleti (Repubblica di Hatay)',
      adminTitle: 'Hatay Devleti · Governo Parlamentare di Antakya (1938-1939)',
      historicalNote: 'Stato sovrano di transizione proclamato il 2 settembre 1938 e guidato dal presidente Tayfur Sökmen e dal primo ministro Abdurrahman Melek prima dell\'incorporazione nella Repubblica di Turchia.',
    },
    tr631: {
      historicalName: 'Hatay Devleti (Repubblica di Hatay)',
      adminTitle: 'Hatay Devleti · Governo Parlamentare di Antakya (1938-1939)',
      historicalNote: 'Stato sovrano di transizione con capitale Antakya.',
    },
    alexandretta: { historicalName: 'İskenderun (Hatay Devleti)', adminTitle: 'Hatay Devleti Limanı' },
    antakya: { historicalName: 'Antakya (Hatay Devleti Başkenti)', adminTitle: 'Hatay Devleti Başkenti' },
    iskenderun: { historicalName: 'İskenderun', adminTitle: 'Hatay Devleti Limanı' },
  },
// ================= MESSICO =================
  MEX: {
    mexico: {
      historicalName: 'Estados Unidos Mexicanos (Ciudad de México)',
      adminTitle: 'Estados Unidos Mexicanos — Presidencia del Gral. Lázaro Cárdenas (1934-1940)',
      historicalNote: 'Governo progressista cardenista; espropriazione e nazionalizzazione delle compagnie petrolifere straniere il 18 marzo 1938 (nascita di PEMEX), riforma agraria degli ejidos e asilo diplomatico ai rifugiati antifascisti europei.',
    },
    ciudad_de_mexico: {
      historicalName: 'Ciudad de México (Distrito Federal)',
      adminTitle: 'Capital de los Estados Unidos Mexicanos',
      historicalNote: 'Sede della presidenza federale al Palacio Nacional; centro nevralgico della diplomazia panamericana e della politica estera fondata sulla Dottrina Estrada.',
    },
    distrito_federal: {
      historicalName: 'Distrito Federal (México, D.F.)',
      adminTitle: 'Distrito Federal de los Estados Unidos Mexicanos',
      historicalNote: 'Entità federale ospitante la capitale; a Coyoacán trovò asilo Lev Trockij fino al suo assassinio da parte di un sicario stalinista nell\'agosto 1940.',
    },
    veracruz: {
      historicalName: 'Veracruz (Llave del Golfo)',
      adminTitle: 'Estado de Veracruz de Ignacio de la Llave',
      historicalNote: 'Porto commerciale primario del Golfo del Messico e centro dell\'industria estrattiva e raffinazione del greggio (Poza Rica / Minatitlán).',
    },
    tampico: {
      historicalName: 'Tampico (Tamaulipas)',
      adminTitle: 'Puerto Petrolero de Tamaulipas',
      historicalNote: 'Grande polo di raffinazione e spedizione petrolifera sul Golfo del Messico, epicentro della contesa sindacale con i consorzi petroliferi anglo-olandesi (El Águila).',
    },
    guadalajara: {
      historicalName: 'Guadalajara (Jalisco)',
      adminTitle: 'Capital del Estado de Jalisco',
      historicalNote: 'Metropoli dell\'Occidente messicano, centro agricolo, commerciale e religioso di rilievo storico.',
    },
    monterrey: {
      historicalName: 'Monterrey (Nuevo León)',
      adminTitle: 'Capital del Estado de Nuevo León',
      historicalNote: 'Capitale industriale e siderurgica del Nord messicano (Fundidora de Fierro y Acero de Monterrey).',
    },
    merida: {
      historicalName: 'Mérida (Yucatán)',
      adminTitle: 'Capital del Estado de Yucatán',
      historicalNote: 'Polo centrale della penisola yucateca, motore mondiale dell\'esportazione di fibra di henequén (sisal) per cordami marittimi.',
    },
    puebla: {
      historicalName: 'Puebla de Zaragoza',
      adminTitle: 'Capital del Estado de Puebla',
      historicalNote: 'Polo tessile e manifatturiero dell\'altopiano centrale tra Città del Messico e Veracruz.',
    },
    oaxaca: {
      historicalName: 'Oaxaca de Juárez',
      adminTitle: 'Capital del Estado de Oaxaca',
      historicalNote: 'Stato meridionale a forte maggioranza indigena zapoteca e mixteca, ricco di risorse minerarie e forestali.',
    },
    chiapas: {
      historicalName: 'Chiapas (Tuxtla Gutiérrez / San Cristóbal)',
      adminTitle: 'Estado de Chiapas — Frontera Sur con Guatemala',
      historicalNote: 'Stato frontaliero meridionale con il Guatemala; terre alte del caffè del Soconusco e giungle della Selva Lacandona.',
    },
    sonora: {
      historicalName: 'Sonora (Hermosillo)',
      adminTitle: 'Estado de Sonora — Frontera con Estados Unidos',
      historicalNote: 'Stato nord-occidentale culla della fazione sonora della Rivoluzione Messicana, ricco di miniere di rame (Cananea).',
    },
    chihuahua: {
      historicalName: 'Chihuahua / Ciudad Juárez',
      adminTitle: 'Estado de Chihuahua',
      historicalNote: 'Il più esteso stato messicano, grande centro di allevamento e snodo di frontiera primaria verso il Texas (El Paso).',
    },
    baja_california: {
      historicalName: 'Territorio de Baja California (Tijuana / Mexicali)',
      adminTitle: 'Territorio Norte y Sur de Baja California',
      historicalNote: 'Penisola strategica del Pacifico nord-occidentale, sotto attenta vigilanza navale congiunta con gli Stati Uniti per la protezione della costa occidentale.',
    },
  },

  // ================= CENTRO AMERICA & CARAIBI =================
  GTM: {
    guatemala: {
      historicalName: 'República de Guatemala (Ciudad de Guatemala)',
      adminTitle: 'Presidencia Jorge Ubico (1931-1944)',
      historicalNote: 'Regime dittatoriale e militarizzato del generale Jorge Ubico; ordine centralizzato, Ley de Vagancia e forte dominio economico delle concessioni della United Fruit Company.',
    },
    ciudad_de_guatemala: {
      historicalName: 'Ciudad de Guatemala (Valle de la Ermita)',
      adminTitle: 'Capital de la República de Guatemala',
      historicalNote: 'Sede del governo presidenziale e del Palacio Nacional; centro amministrativo e militare della repubblica centroamericana.',
    },
    quetzaltenango: {
      historicalName: 'Quetzaltenango (Los Altos)',
      adminTitle: 'Departamento de Quetzaltenango',
      historicalNote: 'Seconda città della repubblica nelle terre alte occidentali, cuore della cultura maya K\'iche\' e della produzione cafetalera.',
    },
    puerto_barrios: {
      historicalName: 'Puerto Barrios (Caribe)',
      adminTitle: 'Terminal Ferroviario IRCA / United Fruit',
      historicalNote: 'Porto principale sul Mar dei Caraibi per l\'esportazione di banane e caffè, capolinea dell\'International Railways of Central America (IRCA).',
    },
    escuintla: {
      historicalName: 'Escuintla (Costa Sur)',
      adminTitle: 'Región Pacífica Guatemalteca',
      historicalNote: 'Vasta pianura alluvionale costiera sull\'Oceano Pacifico, dominata da estese piantagioni di canna da zucchero e cotone.',
    },
    peten: {
      historicalName: 'El Petén (Selva Maya)',
      adminTitle: 'Territorio de El Petén',
      historicalNote: 'Immensa foresta pluviale settentrionale confinante con Messico e Belize, ricca di siti archeologici maya e riserve di chicle e mogano.',
    },
  },
  SLV: {
    el_salvador: {
      historicalName: 'República de El Salvador (San Salvador)',
      adminTitle: 'Gobierno Maximiliano Hernández Martínez (1931-1944)',
      historicalNote: 'Regime autoritario del generale Martínez (Martiniato); repressione delle sollevazioni contadine del 1932 (La Matanza) e predominio dell\'oligarchia del caffè.',
    },
    san_salvador: {
      historicalName: 'San Salvador (Valle de las Hamacas)',
      adminTitle: 'Capital de la República de El Salvador',
      historicalNote: 'Capitale della repubblica situata ai piedi del vulcano San Salvador, centro finanziario e commerciale del commercio cafetalero.',
    },
    santa_ana: {
      historicalName: 'Santa Ana',
      adminTitle: 'Zona Cafetalera Occidental',
      historicalNote: 'Seconda città del paese e fulcro economico delle grandi famiglie proprietarie di piantagioni di caffè arabica (Catorce Familias).',
    },
    san_miguel: {
      historicalName: 'San Miguel (Oriente Salvadoreño)',
      adminTitle: 'Departamento de San Miguel',
      historicalNote: 'Principale centro urbano dell\'Oriente salvadoregno, polo agricolo cerealicolo e dell\'allevamento.',
    },
    acajutla: {
      historicalName: 'Puerto de Acajutla (Sonsonate)',
      adminTitle: 'Puerto Cafetalero del Pacífico',
      historicalNote: 'Scalo marittimo strategico sul Pacifico collegato per ferrovia a San Salvador per l\'imbarco delle esportazioni di caffè.',
    },
  },
  HND: {
    honduras: {
      historicalName: 'República de Honduras (Tegucigalpa)',
      adminTitle: 'Presidencia Tiburcio Carías Andino (El Cariato)',
      historicalNote: 'Dittatura patriarcale del generale Carías Andino; stabilità imposta dopo guerre intestine e controllo monopolistico delle compagnie bananiere statunitensi sulla costa nord.',
    },
    tegucigalpa: {
      historicalName: 'Tegucigalpa (Distrito Central)',
      adminTitle: 'Capital de la República de Honduras',
      historicalNote: 'Capitale arroccata tra le valli montuose centrali, sede del potere politico e militare ma storicamente isolata dalle reti ferroviarie.',
    },
    san_pedro_sula: {
      historicalName: 'San Pedro Sula (Valle de Sula)',
      adminTitle: 'Centro Industrial y Bananero',
      historicalNote: 'Motore economico e manifatturiero del paese, snodo ferroviario delle immense piantagioni di banane della United Fruit e Standard Fruit.',
    },
    la_ceiba: {
      historicalName: 'La Ceiba (Costa Norte)',
      adminTitle: 'Puerto Bananero — Standard Fruit Company',
      historicalNote: 'Quartier generale e porto marittimo della Standard Fruit Company sul Mar dei Caraibi.',
    },
    puerto_cortes: {
      historicalName: 'Puerto Cortés',
      adminTitle: 'Puerto Caribeño Hondureño',
      historicalNote: 'Principale porto naturale dell\'Honduras settentrionale affacciato sul Golfo di Honduras.',
    },
    comayagua: {
      historicalName: 'Comayagua',
      adminTitle: 'Región Central Hondureña',
      historicalNote: 'Antica capitale coloniale dell\'Honduras, ricca di architetture religiose barocche e centro agricolo vallivo.',
    },
    choluteca: {
      historicalName: 'Choluteca (Zona Sur)',
      adminTitle: 'Golfo de Fonseca / Zona Sur',
      historicalNote: 'Polo meridionale honduregno con sbocco sul Golfo di Fonseca, condiviso strategicamente con El Salvador e Nicaragua.',
    },
    islas_de_la_bahia: {
      historicalName: 'Islas de la Bahía (Bay Islands)',
      adminTitle: 'Departamento Insular de Honduras',
      historicalNote: 'Arcipelago caraibico (Roatán, Guanaja, Utila) di antica influenza e parlata inglese britannica, integrato nell\'Honduras nel XIX secolo.',
    },
  },
  NIC: {
    nicaragua: {
      historicalName: 'República de Nicaragua (Managua)',
      adminTitle: 'Gobierno de Anastasio Somoza García (Guardia Nacional)',
      historicalNote: 'Inizio dell\'egemonia dinastica della famiglia Somoza; controllo militare ferreo tramite la Guardia Nacional creata dagli USA e allineamento diplomatico con Washington.',
    },
    managua: {
      historicalName: 'Managua (Lago Xolotlán)',
      adminTitle: 'Capital de la República de Nicaragua',
      historicalNote: 'Capitale situata sulle rive del Lago Managua; sede del Palazzo Presidenziale sulla Loma de Tiscapa fortificata dalla Guardia Nacional.',
    },
    leon: {
      historicalName: 'León (Primera Capital)',
      adminTitle: 'Centro Liberal Universitario',
      historicalNote: 'Città storica e bastione intellettuale del Partito Liberale nicaraguense, custode della tomba del poeta Rubén Darío.',
    },
    granada: {
      historicalName: 'Granada (Lago Cocibolca)',
      adminTitle: 'Centro Conservador Histórico',
      historicalNote: 'Città aristocratica e roccaforte del Partito Conservatore sulle sponde del Gran Lago di Nicaragua (Cocibolca).',
    },
    corinto: {
      historicalName: 'Puerto de Corinto (Chinandega)',
      adminTitle: 'Puerto Principal del Pacífico',
      historicalNote: 'Terminale portuale e ferroviario per la quasi totalità delle esportazioni di caffè, zucchero e legname sul versante pacifico.',
    },
    bluefields: {
      historicalName: 'Bluefields (Mosquitia)',
      adminTitle: 'Costa Caribe / Departamento de Zelaya',
      historicalNote: 'Capitale della costa caraibica e dell\'antica riserva indigena miskita, caratterizzata da cultura afro-caraibica e legami marittimi atlantici.',
    },
    puerto_cabezas: {
      historicalName: 'Puerto Cabezas (Bilwi)',
      adminTitle: 'Terminal Maderero y Bananero del Caribe',
      historicalNote: 'Importante scalo atlantico della Mosquitia settentrionale per l\'estrazione e il trasporto di legnami pregiati (pino) e banane.',
    },
    matagalpa: {
      historicalName: 'Matagalpa (Tierras Altas)',
      adminTitle: 'Región Cafetalera del Norte',
      historicalNote: 'Regione montuosa settentrionale dedita alla coltivazione intensiva del caffè, teatro storico della guerriglia sandinista negli anni Venti.',
    },
  },
  CRI: {
    costa_rica: {
      historicalName: 'República de Costa Rica (San José)',
      adminTitle: 'Presidencia León Cortés (1936-40) / Rafael Calderón (1940)',
      historicalNote: 'Democrazia costituzionale stabile e civile dell\'America Centrale; riforme istituzionali progressive, elevato tasso di scolarizzazione ed economia fondata su caffè e banane.',
    },
    san_jose: {
      historicalName: 'San José (Valle Central)',
      adminTitle: 'Capital de la República de Costa Rica',
      historicalNote: 'Capitale politica e culturale nel fertile Altopiano Centrale, sede del Congresso Costituzionale e del Teatro Nacional.',
    },
    alajuela: {
      historicalName: 'Alajuela (Ciudad de los Mangos)',
      adminTitle: 'Provincia de Alajuela',
      historicalNote: 'Provincia centrale dell\'altopiano patria dell\'eroe nazionale Juan Santamaría, grande produttrice di caffè e canna da zucchero.',
    },
    heredia: {
      historicalName: 'Heredia (Ciudad de las Flores)',
      adminTitle: 'Zona Cafetalera de Heredia',
      historicalNote: 'Storica provincia cafetalera e polo educativo d\'eccellenza dell\'altopiano costarricense.',
    },
    cartago: {
      historicalName: 'Cartago (Basílica de los Ángeles)',
      adminTitle: 'Antigua Capital de Costa Rica',
      historicalNote: 'Prima capitale coloniale alle pendici del vulcano Irazú, cuore religioso del paese con il santuario della Virgen de los Ángeles.',
    },
    puerto_limon: {
      historicalName: 'Puerto Limón (Caribe)',
      adminTitle: 'Puerto Bananero y Cacaotero del Atlántico',
      historicalNote: 'Porto principale sull\'Oceano Atlantico, capolinea della ferrovia interoceanica e insediamento di una cospicua comunità afro-caraibica giamaicana.',
    },
    puntarenas: {
      historicalName: 'Puntarenas (Golfo de Nicoya)',
      adminTitle: 'Puerto Principal del Pacífico Costarricense',
      historicalNote: 'Penisola e scalo portuale commerciale sul Golfo di Nicoya, porta d\'accesso marittima alle esportazioni verso la California e l\'Asia.',
    },
    guanacaste: {
      historicalName: 'Guanacaste (Liberia / Nicoya)',
      adminTitle: 'Provincia Ganadera de Guanacaste',
      historicalNote: 'Vasta provincia nord-occidentale di savane e foreste tropicali secche, dedita al grande allevamento bovino e all\'agricoltura estensiva.',
    },
  },
  PAN: {
    panama: {
      historicalName: 'República de Panamá (Ciudad de Panamá)',
      adminTitle: 'Presidencia de Juan Demóstenes Arosemena / Arnulfo Arias (1940)',
      historicalNote: 'Repubblica istmica al centro del commercio marittimo mondiale; revisione dei trattati con gli USA (Trattato Hull-Alfaro 1936-39) e ascesa del nazionalismo panameñista di Arnulfo Arias.',
    },
    ciudad_de_panama: {
      historicalName: 'Ciudad de Panamá (Costa del Pacífico)',
      adminTitle: 'Capital de la República de Panamá',
      historicalNote: 'Metropoli cosmopolita terminale del Canale sul Pacifico, adiacente al porto e all\'amministrazione statunitense di Balboa.',
    },
    colon: {
      historicalName: 'Colón (Caribe Panameño)',
      adminTitle: 'Ciudad Terminal del Caribe Panameño',
      historicalNote: 'Città terminale atlantica della rotta interoceanica adiacente a Cristóbal, porto di transito commerciale strategico.',
    },
    david: {
      historicalName: 'David (Chiriquí)',
      adminTitle: 'Provincia de Chiriquí',
      historicalNote: 'Capoluogo della fertile provincia occidentale al confine con la Costa Rica, polo agroalimentare e dell\'allevamento.',
    },
    bocas_del_toro: {
      historicalName: 'Bocas del Toro (Almirante)',
      adminTitle: 'Enclave Bananero del Caribe Occidental',
      historicalNote: 'Arcipelago e fascia litoranea dominata dalle estese piantagioni e infrastrutture ferroviarie della United Fruit Company.',
    },
    darien: {
      historicalName: 'Darién (Selva del Darién)',
      adminTitle: 'Provincia del Darién — Frontera con Colombia',
      historicalNote: 'Provincia sud-orientale coperta dalla foresta pluviale incontaminata e impenetrabile del "Tapón del Darién" al confine colombiano.',
    },
    santiago: {
      historicalName: 'Santiago de Veraguas',
      adminTitle: 'Provincias Centrales Panameñas',
      historicalNote: 'Snodo terrestre e agricolo delle province centrali affacciato su entrambi gli oceani.',
    },
    panama_canal_zone: {
      historicalName: 'Panama Canal Zone (Balboa / Quarry Heights)',
      adminTitle: 'U.S. Strategic Outpost (Hay-Bunau-Varilla Treaty)',
      historicalNote: 'Striscia di territorio e acque interoceaniche di 10 miglia presidiata militarmente dalle Forze Armate degli Stati Uniti d\'America.',
    },
  },
  CUB: {
    cuba: {
      historicalName: 'República de Cuba (La Habana)',
      adminTitle: 'Presidencia Federico Laredo Brú / Jefatura Fulgencio Batista',
      historicalNote: 'Repubblica caraibica legata all\'economia zuccheriera statunitense; promulgazione della progressista Costituzione del 1940 ed elezione del colonnello Fulgencio Batista.',
    },
    la_habana: {
      historicalName: 'La Habana (Bahía de La Habana)',
      adminTitle: 'Capital de la República de Cuba',
      historicalNote: 'Grande metropoli portuale delle Antille, centro commerciale e turistico sorvegliato dalla storica fortezza del Morro.',
    },
    santiago_de_cuba: {
      historicalName: 'Santiago de Cuba (Oriente)',
      adminTitle: 'Provincia de Oriente',
      historicalNote: 'Capoluogo della montuosa provincia orientale ai piedi della Sierra Maestra, culla delle lotte d\'indipendenza e distretto minerario di manganese e rame.',
    },
    camaguey: {
      historicalName: 'Camagüey (Puerto Príncipe)',
      adminTitle: 'Región Ganadera e Ingenios Azucareros',
      historicalNote: 'Vasta pianura centrale cubana caratterizzata da grandi pascoli per l\'allevamento e imponenti zuccherifici (ingenios).',
    },
    santa_clara: {
      historicalName: 'Santa Clara (Las Villas)',
      adminTitle: 'Provincia de Las Villas',
      historicalNote: 'Importante snodo stradale e ferroviario al centro dell\'isola, polo agricolo di tabacco e canna da zucchero.',
    },
    matanzas: {
      historicalName: 'Matanzas (Atenas de Cuba)',
      adminTitle: 'Provincia de Matanzas',
      historicalNote: 'Città costiera e baia zuccheriera a est dell\'Avana, celebre per la sua vivace vita letteraria e culturale.',
    },
    pinar_del_rio: {
      historicalName: 'Pinar del Río (Vuelta Abajo)',
      adminTitle: 'Zona Tabacalera de Occidente',
      historicalNote: 'Provincia occidentale celebre a livello mondiale nella valle di Viñales per le piantagioni di tabacco nero da sigaro di Vuelta Abajo.',
    },
    cienfuegos: {
      historicalName: 'Cienfuegos (Bahía de Jagua)',
      adminTitle: 'Puerto Azucarero del Sur',
      historicalNote: 'Elegante porto marittimo neoclassico sulla costa caraibica meridionale di Cuba.',
    },
    holguin: {
      historicalName: 'Holguín (Oriente Norte)',
      adminTitle: 'Norte de Oriente',
      historicalNote: 'Centro commerciale e agricolo del nord-est cubano, con importanti riserve minerarie di nichel (Nicaro).',
    },
    isla_de_pinos: {
      historicalName: 'Isla de Pinos (Nueva Gerona)',
      adminTitle: 'Presidio Modelo de Cuba',
      historicalNote: 'Grande isola a sud di Cuba sede del gigantesco carcere panottico del "Presidio Modelo" fatto edificare da Gerardo Machado.',
    },
  },
  DOM: {
    dominican_republic: {
      historicalName: 'República Dominicana (Ciudad Trujillo)',
      adminTitle: 'Dictadura del Generalísimo Rafael L. Trujillo',
      historicalNote: 'Dittatura personale dispotica di Trujillo ("El Benefactor"); modernizzazione infrastrutturale unita a feroce terrore politico, massacro del Perejil nel 1937 e Trattato Trujillo-Hull del 1940.',
    },
    republica_dominicana: {
      historicalName: 'República Dominicana (Ciudad Trujillo)',
      adminTitle: 'Dictadura del Generalísimo Rafael L. Trujillo',
      historicalNote: 'Regime trujillista dominante sulla porzione orientale di Hispaniola; rigido nazionalismo antiaitiano e culto della personalità.',
    },
    ciudad_trujillo: {
      historicalName: 'Ciudad Trujillo (Santo Domingo)',
      adminTitle: 'Capital de la República Dominicana (1936-1961)',
      historicalNote: 'Denominazione imposta dal 1936 al 1961 alla più antica città europea delle Americhe in ossequio al dittatore Rafael Leónidas Trujillo.',
    },
    santo_domingo: {
      historicalName: 'Ciudad Trujillo (Santo Domingo)',
      adminTitle: 'Renombrada Ciudad Trujillo en 1936',
      historicalNote: 'Capitale della repubblica caraibica affacciata sul Mar dei Caraibi alla foce del fiume Ozama.',
    },
    santiago_de_los_caballeros: {
      historicalName: 'Santiago de los Caballeros (El Cibao)',
      adminTitle: 'Región del Cibao',
      historicalNote: 'Seconda città del paese e fulcro della fertile vallata del Cibao, cuore della produzione di tabacco, caffè e cacao.',
    },
    san_pedro_de_macoris: {
      historicalName: 'San Pedro de Macorís',
      adminTitle: 'Costa Este Azucarera',
      historicalNote: 'Capitale dell\'industria zuccheriera dominicana sulla costa sud-orientale, trainata da manodopera immigrata antillana (cocolos).',
    },
    puerto_plata: {
      historicalName: 'Puerto Plata (Costa Norte)',
      adminTitle: 'Costa Atlántica Dominicana',
      historicalNote: 'Scalo marittimo atlantico settentrionale protetto dalla fortezza coloniale di San Felipe.',
    },
    barahona: {
      historicalName: 'Barahona (Bahía de Neiba)',
      adminTitle: 'Región Suroeste Dominicana',
      historicalNote: 'Porto e polo agricolo del sud-ovest domenicano, area di canna da zucchero e accesso alla penisola di Pedernales.',
    },
    la_vega: {
      historicalName: 'La Vega Real (Cibao)',
      adminTitle: 'Provincia de La Vega',
      historicalNote: 'Provincia agricola storica al centro della valle del Cibao.',
    },
  },
  HAI: {
    haiti: {
      historicalName: 'République d\'Haïti (Port-au-Prince)',
      adminTitle: 'Présidence Sténio Vincent (1930-1941)',
      historicalNote: 'Repubblica caraibica francofona; fine dell\'occupazione militare dei Marines USA nel 1934, grave crisi finanziaria e trauma del massacro di migliaia di braccianti haitiani al confine dominicano nel 1937.',
    },
    port_au_prince: {
      historicalName: 'Port-au-Prince (Golfe de la Gonâve)',
      adminTitle: 'Capitale de la République d\'Haïti',
      historicalNote: 'Sede del governo presidenziale al Palais National; principale porto commerciale e polo della borghesia mulatta.',
    },
    cap_haitien: {
      historicalName: 'Cap-Haïtien (Le Cap)',
      adminTitle: 'Département du Nord',
      historicalNote: 'Storica capitale coloniale del nord haitiano, vicina alla monumentale Citadelle Laferrière e al palazzo Sans-Souci di Henri Christophe.',
    },
    les_cayes: {
      historicalName: 'Les Cayes (Aux Cayes)',
      adminTitle: 'Département du Sud',
      historicalNote: 'Porto principale della penisola meridionale di Tiburon, centro esportatore di caffè, vetiver e cacao.',
    },
    gonaives: {
      historicalName: 'Les Gonaïves',
      adminTitle: 'Cité de l\'Indépendance (Artibonite)',
      historicalNote: 'Città simbolo dove Jean-Jacques Dessalines proclamò l\'indipendenza di Haiti nel 1804; sbocco commerciale della fertile valle dell\'Artibonite.',
    },
    jacmel: {
      historicalName: 'Jacmel (Côte Sud)',
      adminTitle: 'Port Caféier du Sud-Est',
      historicalNote: 'Cittadina portuale costiera meridionale rinomata per l\'esportazione del caffè e le architetture prefabbricate in ghisa.',
    },
    port_de_paix: {
      historicalName: 'Port-de-Paix',
      adminTitle: 'Département du Nord-Ouest',
      historicalNote: 'Scalo marittimo settentrionale dirimpetto all\'isola di Tortuga (Île de la Tortue).',
    },
  },


  // ================= STATI UNITI D'AMERICA (USA) =================
  USA: {
    united_states: {
      historicalName: 'Stati Uniti d\'America',
      adminTitle: 'United States of America — Pres. Franklin D. Roosevelt (New Deal)',
      historicalNote: 'Repubblica presidenziale federale composta da 48 Stati e territori d\'oltremare; presidenza democratica di Franklin D. Roosevelt. Anni caratterizzati dalle riforme economico-sociali del New Deal, dalla Dottrina del Buon Vicinato nelle Americhe e dalla progressiva transizione dall\'isolazionismo al riarmo navale e industriale (Two-Ocean Navy Act del 1940 e legge Cash and Carry).',
    },
    united_states_of_america: {
      historicalName: 'United States of America',
      adminTitle: 'Federal Republic of the United States of America',
      historicalNote: 'Repubblica federale con capitale Washington, D.C.; motore industriale e finanziario mondiale impegnato nella mobilitazione produttiva dell\'Arsenale della Democrazia.',
    },
    stati_uniti: {
      historicalName: 'Stati Uniti d\'America',
      adminTitle: 'Presidenza Franklin Delano Roosevelt',
      historicalNote: 'Unione federale nordamericana al centro delle relazioni diplomatiche ed economiche panamericane ed emisferiche.',
    },
    washington_dc: {
      historicalName: 'Washington, D.C. (District of Columbia)',
      adminTitle: 'Federal Capital of the United States of America',
      historicalNote: 'Capitale federale sulle rive del fiume Potomac; sede della Casa Bianca, del Campidoglio e dei dipartimenti militari della Guerra e della Marina.',
    },
    district_of_columbia: {
      historicalName: 'District of Columbia (Washington)',
      adminTitle: 'Federal Capital District of the United States',
      historicalNote: 'Distretto federale autonomo istituito dalla Costituzione per ospitare la sede permanente del governo degli Stati Uniti.',
    },
    washington: {
      historicalName: 'Washington, D.C.',
      adminTitle: 'Federal Capital of the United States',
      historicalNote: 'Sede della presidenza di Franklin D. Roosevelt e dei vertici delle forze armate statunitensi.',
    },
    new_york: {
      historicalName: 'New York (Empire State — New York City)',
      adminTitle: 'State of New York (Gov. Herbert H. Lehman)',
      historicalNote: 'Stato più popoloso dell\'Unione e capitale finanziaria mondiale (Wall Street); sede del Brooklyn Navy Yard (New York Naval Shipyard) per la costruzione di corazzate e portaerei, e del porto commerciale oceanico primario.',
    },
    california: {
      historicalName: 'California (Pacific Coast — San Diego & San Francisco)',
      adminTitle: 'State of California (Gov. Frank Merriam / Culbert Olson)',
      historicalNote: 'Stato cerniera del Pacifico; base navale di San Diego per la Flotta del Pacifico, cantieri navali di Mare Island e Hunters Point a San Francisco, colossi dell\'industria aeronautica militare (Douglas a Santa Monica, Lockheed a Burbank, North American, Consolidated).',
    },
    texas: {
      historicalName: 'Texas (Lone Star State — Houston & Permian Basin)',
      adminTitle: 'State of Texas (Gov. James V. Allred / W. Lee O\'Daniel)',
      historicalNote: 'Primo produttore mondiale di petrolio (bacino dell\'East Texas e Permian Basin) e polo di raffinazione a Houston e Beaumont; centro dei grandi comandi dell\'Esercito a Fort Sam Houston e dell\'addestramento aeronautico a Randolph Field.',
    },
    pennsylvania: {
      historicalName: 'Pennsylvania (Keystone State — Pittsburgh & Philadelphia)',
      adminTitle: 'Commonwealth of Pennsylvania (Gov. George H. Earle / Arthur H. James)',
      historicalNote: 'Cuore della siderurgia mondiale con le acciaierie di Pittsburgh (U.S. Steel, Bethlehem Steel, Jones & Laughlin), miniere carbonifere degli Appalachi e Philadelphia Naval Shipyard a League Island.',
    },
    michigan: {
      historicalName: 'Michigan (Detroit — Motor City)',
      adminTitle: 'State of Michigan (Gov. Frank Murphy / Luren Dickinson)',
      historicalNote: 'Capitale mondiale dell\'industria automobilistica (Ford, General Motors, Chrysler); polo metalmeccanico che a partire dal 1940 converte le proprie linee nella produzione di massa di motori aerei, carri armati e bombardieri per gli Alleati.',
    },
    illinois: {
      historicalName: 'Illinois (Prairie State — Chicago)',
      adminTitle: 'State of Illinois (Gov. Henry Horner)',
      historicalNote: 'Metropoli di Chicago snodo ferroviario continentale primario, borsa merci e cerealicola mondiale (Chicago Board of Trade), macelli Union Stock Yards e polo manifatturiero e siderurgico dei Grandi Laghi.',
    },
    ohio: {
      historicalName: 'Ohio (Buckeye State — Cleveland, Cincinnati & Akron)',
      adminTitle: 'State of Ohio (Gov. Martin L. Davey / John W. Bricker)',
      historicalNote: 'Polo industriale dei Grandi Laghi; Akron capitale mondiale della gomma e pneumatici (Goodyear, Firestone), Cleveland gigante siderurgico e Wright Field a Dayton laboratorio sperimentale dell\'US Army Air Corps.',
    },
    virginia: {
      historicalName: 'Virginia (Old Dominion — Hampton Roads & Norfolk)',
      adminTitle: 'Commonwealth of Virginia (Gov. James H. Price)',
      historicalNote: 'Bicchiere della potenza navale atlantica con la base navale di Norfolk (Naval Station Norfolk a Hampton Roads) e i cantieri navali Newport News Shipbuilding specializzati nelle grandi portaerei di linea.',
    },
    massachusetts: {
      historicalName: 'Massachusetts (Bay State — Boston)',
      adminTitle: 'Commonwealth of Massachusetts (Gov. Leverett Saltonstall)',
      historicalNote: 'Polo storico, scientifico e cantieristico del New England; Boston Navy Yard a Charlestown, cantieri navali Bethlehem Fore River a Quincy, laboratori del MIT impegnati nella ricerca del radar e delle tecnologie belliche avanzate.',
    },
    washington_state: {
      historicalName: 'Washington (Evergreen State — Seattle & Puget Sound)',
      adminTitle: 'State of Washington (Gov. Clarence D. Martin)',
      historicalNote: 'Porta del Pacifico nord-occidentale; stabilimenti Boeing a Seattle per i bombardieri B-17 Flying Fortress e Puget Sound Naval Shipyard a Bremerton per la manutenzione e costruzione di corazzate.',
    },
    florida: {
      historicalName: 'Florida (Sunshine State — Pensacola & Key West)',
      adminTitle: 'State of Florida (Gov. Fred P. Cone)',
      historicalNote: 'Naval Air Station Pensacola culla dell\'aviazione navale statunitense, base sottomarini di Key West a presidio dello Stretto di Florida e snodo per le rotte aeronavali caraibiche.',
    },
    georgia: {
      historicalName: 'Georgia (Empire State of the South — Atlanta & Savannah)',
      adminTitle: 'State of Georgia (Gov. Eurith D. Rivers)',
      historicalNote: 'Snodo logistico ferroviario e militare del Sud ad Atlanta (Fort McPherson) e cantieri navali mercantili a Savannah e Brunswick.',
    },
    louisiana: {
      historicalName: 'Louisiana (Pelican State — New Orleans)',
      adminTitle: 'State of Louisiana (Gov. Richard W. Leche / Earl K. Long)',
      historicalNote: 'Grande porto fluviale e oceanico alla foce del Mississippi a New Orleans; cantieri navali Higgins Industries per lo sviluppo e produzione dei rivoluzionari mezzi da sbarco (LCVP Higgins Boat).',
    },
    indiana: {
      historicalName: 'Indiana (Hoosier State — Gary & Indianapolis)',
      adminTitle: 'State of Indiana (Gov. M. Clifford Townsend)',
      historicalNote: 'Imponenti acciaierie Gary Works della U.S. Steel sulle rive del Lago Michigan e industrie meccaniche e motoristiche di precisione di Indianapolis.',
    },
    wisconsin: {
      historicalName: 'Wisconsin (Badger State — Milwaukee & Manitowoc)',
      adminTitle: 'State of Wisconsin (Gov. Philip La Follette / Julius P. Heil)',
      historicalNote: 'Cantieri navali di Manitowoc sul Lago Michigan per la costruzione di sommergibili per la marina e industrie metalmeccaniche di Milwaukee.',
    },
    minnesota: {
      historicalName: 'Minnesota (North Star State — Mesabi Iron Range & Duluth)',
      adminTitle: 'State of Minnesota (Gov. Elmer Benson / Harold Stassen)',
      historicalNote: 'Miniere di minerale di ferro a cielo aperto della Mesabi Range nel nord e porto di Duluth sul Lago Superiore, essenziali per alimentare le acciaierie dell\'intera nazione.',
    },
    missouri: {
      historicalName: 'Missouri (Show Me State — St. Louis & Kansas City)',
      adminTitle: 'State of Missouri (Gov. Guy B. Park / Lloyd C. Stark)',
      historicalNote: 'Porta d\'accesso al West, crocevia fluviale e ferroviario continentale tra Mississippi e Missouri e nascenti stabilimenti aeronautici McDonnell a St. Louis.',
    },
    connecticut: {
      historicalName: 'Connecticut (Constitution State — Groton & Hartford)',
      adminTitle: 'State of Connecticut (Gov. Wilbur L. Cross / Raymond E. Baldwin)',
      historicalNote: 'Groton capitale mondiale della costruzione sottomarina (Electric Boat Company / General Dynamics) e fabbriche di armamenti leggeri e motori Pratt & Whitney e Colt ad Hartford.',
    },
    new_jersey: {
      historicalName: 'New Jersey (Garden State — Camden & Newark)',
      adminTitle: 'State of New Jersey (Gov. Harold G. Hoffman / A. Harry Moore)',
      historicalNote: 'Cantieri navali della New York Shipbuilding Corporation a Camden sul fiume Delaware per incrociatori e portaerei, e polo chimico ed elettronico di Newark.',
    },
    maryland: {
      historicalName: 'Maryland (Old Line State — Baltimore & Annapolis)',
      adminTitle: 'State of Maryland (Gov. Harry Nice / Herbert O\'Conor)',
      historicalNote: 'Porto industriale e cantieri Bethlehem Steel di Sparrows Point a Baltimora e sede della prestigiosa United States Naval Academy ad Annapolis.',
    },
    rhode_island: {
      historicalName: 'Rhode Island (Ocean State — Newport)',
      adminTitle: 'State of Rhode Island (Gov. Robert E. Quinn / William H. Vanderbilt III)',
      historicalNote: 'Sede della Naval Station Newport, del Naval War College e della stazione siluri U.S. Naval Torpedo Station di Goat Island.',
    },
    delaware: {
      historicalName: 'Delaware (First State — Wilmington)',
      adminTitle: 'State of Delaware (Gov. C. Douglass Buck / Richard McMullen)',
      historicalNote: 'Wilmington capitale mondiale della chimica industriale e polveri da sparo (E.I. du Pont de Nemours and Company).',
    },
    alabama: {
      historicalName: 'Alabama (Heart of Dixie — Birmingham & Mobile)',
      adminTitle: 'State of Alabama (Gov. Bibb Graves / Frank M. Dixon)',
      historicalNote: 'Polo metallurgico e siderurgico di Birmingham ("Pittsburgh del Sud") e porto commerciale e cantieristico di Mobile sul Golfo del Messico.',
    },
    tennessee: {
      historicalName: 'Tennessee (Volunteer State — TVA & Nashville)',
      adminTitle: 'State of Tennessee (Gov. Gordon Browning / Prentice Cooper)',
      historicalNote: 'Bacino idroelettrico della Tennessee Valley Authority (TVA), monumentale piano pubblico del New Deal che fornirà l\'energia per l\'elettrochimica e la futura produzione nucleare.',
    },
    kentucky: {
      historicalName: 'Kentucky (Bluegrass State — Fort Knox & Louisville)',
      adminTitle: 'Commonwealth of Kentucky (Gov. Happy Chandler / Keen Johnson)',
      historicalNote: 'Sede del deposito aureo federale di Fort Knox (United States Bullion Depository) inaugurato nel 1936 per custodire le riserve auree della nazione.',
    },
    colorado: {
      historicalName: 'Colorado (Centennial State — Denver & Climax)',
      adminTitle: 'State of Colorado (Gov. Edwin C. Johnson / Teller Ammons / Ralph Carr)',
      historicalNote: 'Polo montano delle Montagne Rocciose; miniere di molibdeno di Climax strategiche per le leghe d\'acciaio per corazze e canne d\'artiglieria.',
    },
    kansas: {
      historicalName: 'Kansas (Sunflower State — Wichita)',
      adminTitle: 'State of Kansas (Gov. Alf Landon / Walter A. Huxman / Payne Ratner)',
      historicalNote: 'Granaio della nazione e capitale dell\'aviazione a Wichita con gli stabilimenti Stearman/Boeing (addestratore Kaydet), Cessna e Beechcraft.',
    },
    utah: {
      historicalName: 'Utah (Beehive State — Salt Lake City & Bingham)',
      adminTitle: 'State of Utah (Gov. Henry H. Blood)',
      historicalNote: 'Miniere di rame a cielo aperto di Bingham Canyon (Kennecott Copper), il più grande scavo minerario della Terra e snodo transcontinentale ferroviario.',
    },
    arizona: {
      historicalName: 'Arizona (Grand Canyon State — Bisbee & Phoenix)',
      adminTitle: 'State of Arizona (Gov. Benjamin B. Moeur / Rawghlie C. Stanford / Robert T. Jones)',
      historicalNote: 'Giacimenti di rame di Bisbee, Morenci e Jerome, risorsa strategica metallurgica per munizioni e cavi elettrici della marina e dell\'esercito.',
    },
    new_mexico: {
      historicalName: 'New Mexico (Land of Enchantment — Albuquerque)',
      adminTitle: 'State of New Mexico (Gov. Clyde Tingley / John E. Miles)',
      historicalNote: 'Vasti altipiani e deserti con ricche miniere di potassio a Carlsbad e poligoni militari federali.',
    },
    nevada: {
      historicalName: 'Nevada (Silver State — Boulder Dam & Las Vegas)',
      adminTitle: 'State of Nevada (Gov. Richard Kirman Sr. / Edward P. Carville)',
      historicalNote: 'Diga di Hoover (Boulder Dam) inaugurata nel 1936 sul fiume Colorado, colosso ingegneristico fornitore di energia idroelettrica a basso costo per la California del Sud.',
    },
    montana: {
      historicalName: 'Montana (Treasure State — Butte & Anaconda)',
      adminTitle: 'State of Montana (Gov. Elmer Holt / Roy E. Ayers)',
      historicalNote: 'Miniere di rame di Butte della Anaconda Copper Mining Company ("la collina più ricca della Terra"), fonderie di Anaconda e legnami del nord.',
    },
    oregon: {
      historicalName: 'Oregon (Beaver State — Portland & Columbia River)',
      adminTitle: 'State of Oregon (Gov. Charles H. Martin / Charles A. Sprague)',
      historicalNote: 'Porto fluviale di Portland sul fiume Columbia, ricche foreste per legname da costruzione e bacino idroelettrico della Diga di Bonneville (1937).',
    },
    iowa: {
      historicalName: 'Iowa (Hawkeye State — Des Moines)',
      adminTitle: 'State of Iowa (Gov. Clyde L. Herring / Nelson G. Kraschel / George A. Wilson)',
      historicalNote: 'Cuore della Corn Belt agricola statunitense, primatista nella produzione di mais, soia e foraggio per l\'alimentazione nazionale.',
    },
    oklahoma: {
      historicalName: 'Oklahoma (Sooner State — Tulsa & Oklahoma City)',
      adminTitle: 'State of Oklahoma (Gov. E.W. Marland / Leon C. Phillips)',
      historicalNote: 'Tulsa "Capitale mondiale del petrolio" e bacini di estrazione idrocarburica dell\'Oklahoma centrale.',
    },
    arkansas: {
      historicalName: 'Arkansas (Natural State — Little Rock & Bauxite)',
      adminTitle: 'State of Arkansas (Gov. J. Marion Futrell / Carl E. Bailey)',
      historicalNote: 'Miniere di bauxite della Contea di Saline (Bauxite / Benton), quasi l\'intera produzione nazionale di minerale per l\'alluminio aeronautico bellico.',
    },
    nebraska: {
      historicalName: 'Nebraska (Cornhusker State — Omaha)',
      adminTitle: 'State of Nebraska (Gov. Robert L. Cochran)',
      historicalNote: 'Omaha quartier generale delle ferrovie transcontinentali Union Pacific e grande centro di lavorazione carni e cereali delle Grandi Pianure.',
    },
    north_carolina: {
      historicalName: 'North Carolina (Tar Heel State — Charlotte & Fort Bragg)',
      adminTitle: 'State of North Carolina (Gov. J.C.B. Ehringhaus / Clyde R. Hoey)',
      historicalNote: 'Polo tessile e del tabacco; base militare e campo d\'addestramento per artiglieria e paracadutisti di Fort Bragg.',
    },
    south_carolina: {
      historicalName: 'South Carolina (Palmetto State — Charleston)',
      adminTitle: 'State of South Carolina (Gov. Ibra C. Blackwood / Olin D. Johnston / Burnet R. Maybank)',
      historicalNote: 'Charleston Navy Yard polo di riparazione e costruzione navale per cacciatorpediniere e naviglio d\'appoggio della marina.',
    },
    maine: {
      historicalName: 'Maine (Pine Tree State — Bath Iron Works)',
      adminTitle: 'State of Maine (Gov. Louis J. Brann / Lewis O. Barrows)',
      historicalNote: 'Cantieri navali Bath Iron Works specializzati nella costruzione di cacciatorpediniere veloci della U.S. Navy sulle rive del fiume Kennebec.',
    },
    hawaii: {
      historicalName: 'Territory of Hawaii (Pearl Harbor / Oahu)',
      adminTitle: 'Territory of Hawaii — U.S. Pacific Fleet Headquarters (Gov. Joseph Poindexter)',
      historicalNote: 'Territorio incorporato degli Stati Uniti nel Pacifico centrale (capitale Honolulu). Nel maggio 1940 la United States Fleet viene formalmente trasferita in via permanente a Pearl Harbor (Oahu) come deterrente strategico contro l\'espansionismo dell\'Impero Giapponese. Presidiata da basi aeree (Hickam Field, Wheeler Field, Kaneohe Bay) e dalla guarnigione dell\'esercito a Schofield Barracks.',
    },
    pearl_harbor: {
      historicalName: 'Pearl Harbor Naval Base (Oahu, Hawaii)',
      adminTitle: 'U.S. Pacific Fleet Operating Base & Drydocks',
      historicalNote: 'Principale base aeronavale della marina statunitense nel Pacifico; bacini di carenaggio, depositi di carburante di Red Hill e ancoraggi per corazzate e portaerei a Battleship Row.',
    },
    honolulu: {
      historicalName: 'Honolulu (Oahu, Territory of Hawaii)',
      adminTitle: 'Capital of the Territory of Hawaii',
      historicalNote: 'Capitale e porto commerciale delle Isole Hawaii, centro amministrativo e snodo marittimo e postale transpacifico.',
    },
    alaska: {
      historicalName: 'Territory of Alaska (Dutch Harbor / Aleutine)',
      adminTitle: 'Territory of Alaska — North Pacific Defense Outpost (Gov. Ernest Gruening)',
      historicalNote: 'Vasto territorio incorporato affacciato sul Mare di Bering e sullo Stretto di Bering dirimpetto alla Siberia sovietica. Snodo strategico fondamentale dell\'emisfero settentrionale; negli anni 1939-1940 vengono avviati i lavori per la base navale e aeronavale di Dutch Harbor (isola di Unalaska) e gli aeroporti militari di Ladd Field e Fort Richardson per il pattugliamento delle rotte del Pacifico settentrionale.',
    },
    dutch_harbor: {
      historicalName: 'Dutch Harbor Naval Operating Base (Aleutian Islands)',
      adminTitle: 'U.S. Navy & Army Air Station — Unalaska Island',
      historicalNote: 'Base aeronavale avanzata della marina e dell\'esercito nelle Isole Aleutine a guardia dell\'accesso settentrionale al Mare di Bering.',
    },
    puerto_rico: {
      historicalName: 'Puerto Rico (Unincorporated U.S. Territory — San Juan)',
      adminTitle: 'Territory of Puerto Rico — U.S. Caribbean Gibraltar (Gov. Blanton Winship / Adm. William D. Leahy)',
      historicalNote: 'Territorio insulare non incorporato nelle Grandi Antille con capoluogo San Juan. Negli anni 1936-1939 teatro di forti tensioni nazionaliste guidate da Pedro Albizu Campos (Massacro di Ponce del 1937); nel 1939 Franklin D. Roosevelt nomina governatore l\'ammiraglio William D. Leahy per trasformare l\'isola in una formidabile base aeronavale fortificata ("la Gibilterra dei Caraibi" — Naval Air Station San Juan e base aerea di Borinquen) a guardia delle rotte d\'accesso al Canale di Panama.',
    },
    united_states_virgin_islands: {
      historicalName: 'United States Virgin Islands (Charlotte Amalie)',
      adminTitle: 'Territory of the Virgin Islands of the United States (Gov. Lawrence W. Cramer)',
      historicalNote: 'Arcipelago caraibico acquistato nel 1917 dalla Danimarca (ex Indie Occidentali Danesi) per scongiurare l\'installazione di basi sottomarine tedesche. Base navale sussidiaria per idrovolanti e sommergibili a Saint Thomas a protezione del Canale di Panama e del Canale di Anegada.',
    },
    virgin_islands: {
      historicalName: 'United States Virgin Islands (St. Thomas / St. Croix)',
      adminTitle: 'Territory of the Virgin Islands of the United States',
      historicalNote: 'Territorio insulare non incorporato statunitense a est di Puerto Rico, presidio navale della marina americana nelle Piccole Antille.',
    },
    guam: {
      historicalName: 'Island of Guam (Apra Harbor — U.S. Navy)',
      adminTitle: 'Guam Naval Station — Marianas Outpost (Gov. James T. Alexander / George J. McMillin)',
      historicalNote: 'Territorio insulare non incorporato in Micronesia (Arcipelago delle Marianne), acquisito nel 1898 dopo la guerra ispano-americana. Amministrato direttamente dalla U.S. Navy con capoluogo Agaña e base navale ad Apra Harbor; completamente circondato dalle isole del Mandato Giapponese del Pacifico (Nan\'yō Guntō: Saipan, Rota, Tinian), isolato a oltre 3.000 miglia dalle Hawaii e privo di difese pesanti a causa delle limitazioni del Trattato Navale di Washington.',
    },
    wake_island: {
      historicalName: 'Wake Island (U.S. Navy & Pan American Clipper)',
      adminTitle: 'Wake Island — U.S. Unorganized Territory & Naval Aviation Outpost',
      historicalNote: 'Atollo corallino isolato nel Pacifico settentrionale amministrato dalla U.S. Navy. Nel 1935 la Pan American Airways vi costruì una base idrovolanti e un albergo per la celebre rotta passeggeri e postale transpacifica San Francisco-Honolulu-Manila con i giganteschi idrovolanti Martin M-130 e Boeing 314 "China Clipper". Nel 1940 iniziano i lavori militari per la base aerea e sottomarina della marina.',
    },
    wake: {
      historicalName: 'Wake Island (U.S. Navy)',
      adminTitle: 'U.S. Naval Aviation Outpost',
      historicalNote: 'Atollo strategico e scalo di volo a metà strada tra le Hawaii e Guam.',
    },
    midway_islands: {
      historicalName: 'Midway Atoll (Sand & Eastern Islands)',
      adminTitle: 'Midway Islands Naval Air Station (U.S. Navy / 14th Naval District)',
      historicalNote: 'Atollo del Pacifico centrale a circa un terzo della distanza tra Honolulu e Tokyo, amministrato dalla marina statunitense. Scalo per i clipper aerei della Pan Am e stazione della Commercial Pacific Cable Company; dal 1939 convertito in piazzaforte aeronavale fortificata della U.S. Navy.',
    },
    midway: {
      historicalName: 'Midway Atoll (U.S. Navy)',
      adminTitle: 'Midway Islands Naval Air Station',
      historicalNote: 'Atollo fortificato e base di idrovolanti e sommergibili a nord-ovest delle Hawaii.',
    },
    american_samoa: {
      historicalName: 'American Samoa (Pago Pago / Tutuila)',
      adminTitle: 'U.S. Naval Station Tutuila — South Pacific Coaling Depot (Gov. Edward W. Hanson)',
      historicalNote: 'Territorio non incorporato della Polinesia meridionale (isole di Tutuila, Aunu\'u, Manu\'a e Rose Atoll), amministrato come stazione navale della U.S. Navy dal 1900. Il profondo porto naturale di Pago Pago costituisce una base di rifornimento strategica per le rotte navali verso l\'Australia e la Nuova Zelanda.',
    },
    pago_pago: {
      historicalName: 'Pago Pago (Tutuila, American Samoa)',
      adminTitle: 'U.S. Naval Station Tutuila',
      historicalNote: 'Profondo fiordo e ancoraggio navale protetto per il naviglio da guerra statunitense nel Pacifico meridionale.',
    },
    panama_canal_zone: {
      historicalName: 'Panama Canal Zone (Balboa Heights / Quarry Heights — USA)',
      adminTitle: 'Panama Canal Zone — U.S. Strategic Military Outpost (Governor Clarence S. Ridley / Glen E. Edgerton)',
      historicalNote: 'Fascia territoriale e idroviaria strategica di 553 miglia quadrate controllata in perpetuità dagli Stati Uniti d\'America in virtù del Trattato Hay-Bunau-Varilla del 1903. Chokepoint marittimo vitale della sicurezza emisferica e globale per il passaggio rapido delle flotte tra Atlantico e Pacifico (Two-Ocean Navy); difesa da massicce fortificazioni costiere, chiuse protette (Miraflores, Pedro Miguel, Gatun) e basi aeronavali (Albrook Field, Howard Field, Coco Solo).',
    },
    guantanamo: {
      historicalName: 'Guantanamo Bay Naval Base (U.S. Navy — Cuba)',
      adminTitle: 'U.S. Naval Operating Base Guantanamo Bay (Treaty of 1934)',
      historicalNote: 'Base navale permanente di 116 km² affittata in perpetuità dagli Stati Uniti sulla baia di Guantánamo nel sud-est di Cuba in virtù del trattato cubano-statunitense del 1903 (confermato dal trattato del 1934). Base navale operativa primaria per il controllo del Paso de los Vientos (Windward Passage) tra Cuba e Haiti e la sorveglianza delle rotte dei Caraibi.',
    },
  },

  // ================= ARABIA SAUDITA & PENISOLA ARABICA =================
  SAU: {
    saudi_arabia: {
      historicalName: 'Al-Mamlakah al-Arabiyyah as-Su\'udiyyah (Najd / Nejd wa-Mulhaqatuha)',
      adminTitle: 'Al-Mamlakah al-Arabiyyah as-Su\'udiyyah (Hukumat Malik Abd al-Aziz Al Su\'ud)',
      historicalNote: 'Sultanate of Najd and Kingdom of Hejaz unified under King Abdulaziz Ibn Saud.',
    },
    arabia_saudita: {
      historicalName: 'Al-Mamlakah al-Arabiyyah as-Su\'udiyyah (Najd / Nejd wa-l-Hijaz / Hejaz)',
      adminTitle: 'Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
      historicalNote: 'Unified Kingdom of Saudi Arabia under King Abdulaziz Ibn Saud.',
    },
    arabia: {
      historicalName: 'Al-Mamlakah al-Arabiyyah as-Su\'udiyyah (Najd / Nejd)',
      adminTitle: 'Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
    },
    nejd: {
      historicalName: 'Mintaqat Najd (Najd / Nejd)',
      adminTitle: 'Qalb al-Mamlakah (Ar-Riyad) — Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
      historicalNote: 'Historic heartland and royal capital of Riyadh.',
    },
    najd: {
      historicalName: 'Mintaqat Najd (Najd / Nejd)',
      adminTitle: 'Qalb al-Mamlakah (Ar-Riyad) — Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
      historicalNote: 'Historic heartland of the House of Saud.',
    },
    hejaz: {
      historicalName: 'Mintaqat al-Hijaz (Al-Hijaz / Hejaz)',
      adminTitle: 'Wilayat al-Haramayn ash-Sharifayn — Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
      historicalNote: 'Annexed in 1925 by Ibn Saud, home to Makkah, Madinah, and Jiddah.',
    },
    hedjaz: {
      historicalName: 'Mintaqat al-Hijaz (Al-Hijaz / Hejaz)',
      adminTitle: 'Wilayat al-Haramayn ash-Sharifayn — Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
    },
    hijaz: {
      historicalName: 'Mintaqat al-Hijaz (Al-Hijaz / Hejaz)',
      adminTitle: 'Wilayat al-Haramayn ash-Sharifayn — Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
    },
    hail: {
      historicalName: 'Ha\'il (Jabal Shammar / Nejd)',
      adminTitle: 'Imarat Jabal Shammar — Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
      historicalNote: 'Former Emirate of Jabal Shammar (Al Rashid), incorporated in 1921.',
    },
    jabal_shammar: {
      historicalName: 'Jabal Shammar (Ha\'il / Nejd)',
      adminTitle: 'Imarat Jabal Shammar — Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
    },
    emirate_of_bin_shalan: {
      historicalName: 'Imarat Ibn Sha\'lan (Wadi Sirhan / Al-Jawf)',
      adminTitle: 'Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
      historicalNote: 'Oasis realm of the Ruwallah confederation under Emir Nuri al-Sha\'lan.',
    },
    bin_shalan: {
      historicalName: 'Imarat Ibn Sha\'lan (Wadi Sirhan / Al-Jawf)',
      adminTitle: 'Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
    },
    bin_shal_an: {
      historicalName: 'Imarat Ibn Sha\'lan (Wadi Sirhan / Al-Jawf)',
      adminTitle: 'Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
    },
    shalan: {
      historicalName: 'Imarat Ibn Sha\'lan (Wadi Sirhan / Al-Jawf)',
      adminTitle: 'Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
    },
    al_jawf: {
      historicalName: 'Al-Jawf wa-Sakaka (Wadi Sirhan)',
      adminTitle: 'Imarat al-Jawf — Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
      historicalNote: 'Historic oasis crossroads on the northern frontier.',
    },
    sakaka: {
      historicalName: 'Sakaka (Al-Jawf)',
      adminTitle: 'Imarat al-Jawf — Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
    },
    riyadh: {
      historicalName: 'Ar-Riyad (Najd / Nejd)',
      adminTitle: 'Asimat al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
      historicalNote: 'Capital city and royal seat of King Abdulaziz Al Saud.',
    },
    ar_riyad: {
      historicalName: 'Ar-Riyad (Najd / Nejd)',
      adminTitle: 'Asimat al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
    },
    mecca: {
      historicalName: 'Makkah al-Mukarramah (Al-Hijaz / Hejaz)',
      adminTitle: 'Umm al-Qura (Al-Haram ash-Sharif)',
    },
    makkah: {
      historicalName: 'Makkah al-Mukarramah (Al-Hijaz / Hejaz)',
      adminTitle: 'Umm al-Qura (Al-Haram ash-Sharif)',
    },
    medina: {
      historicalName: 'Al-Madinah al-Munawwarah (Al-Hijaz / Hejaz)',
      adminTitle: 'Madinat ar-Rasul — Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
    },
    madinah: {
      historicalName: 'Al-Madinah al-Munawwarah (Al-Hijaz / Hejaz)',
      adminTitle: 'Madinat ar-Rasul — Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
    },
    jeddah: {
      historicalName: 'Jiddah (Al-Hijaz / Hejaz)',
      adminTitle: 'Mina\' al-Bahr al-Ahmar',
    },
    jidda: {
      historicalName: 'Jiddah (Al-Hijaz / Hejaz)',
      adminTitle: 'Mina\' al-Bahr al-Ahmar',
    },
    taif: {
      historicalName: 'At-Ta\'if (Al-Hijaz / Hejaz)',
      adminTitle: 'Muqarr al-Hukumah as-Sayfiyyah',
    },
    al_hasa: {
      historicalName: 'Al-Ahsa (Al-Mintaqah ash-Sharqiyyah)',
      adminTitle: 'Al-Mintaqah ash-Sharqiyyah (CASOC Concession)',
      historicalNote: 'Eastern oasis and petroleum basin.',
    },
    eastern_province: {
      historicalName: 'Al-Mintaqah ash-Sharqiyyah (Al-Ahsa)',
      adminTitle: 'Al-Mintaqah ash-Sharqiyyah — Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
    },
    ash_sharqiyah: {
      historicalName: 'Al-Mintaqah ash-Sharqiyyah (Al-Ahsa)',
      adminTitle: 'Al-Mintaqah ash-Sharqiyyah — Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
    },
    dhahran: {
      historicalName: 'Az-Zahran (Dammam No. 7)',
      adminTitle: 'CASOC / Arabian American Oil Company',
      historicalNote: 'Site of commercial oil discovery in March 1938.',
    },
    dammam: { historicalName: 'Ad-Dammam', adminTitle: 'Al-Mintaqah ash-Sharqiyyah' },
    al_khobar: { historicalName: 'Al-Khubar', adminTitle: 'Al-Mintaqah ash-Sharqiyyah' },
    jubail: { historicalName: 'Al-Jubayl', adminTitle: 'Al-Mintaqah ash-Sharqiyyah' },
    qatif: { historicalName: 'Al-Qatif', adminTitle: 'Al-Mintaqah ash-Sharqiyyah' },
    hofuf: { historicalName: 'Al-Hufuf (Al-Ahsa)', adminTitle: 'Al-Mintaqah ash-Sharqiyyah' },
    ras_tanura: { historicalName: 'Ra\'s Tannurah', adminTitle: 'Mina\' an-Naft' },
    asir: {
      historicalName: '\'Asir wa-Tihamah',
      adminTitle: 'Imarat \'Asir — Al-Mamlakah al-Arabiyyah as-Su\'udiyyah',
    },
    jizan: { historicalName: 'Jizan (Jazan)', adminTitle: 'Sahl Tihamah' },
    jazan: { historicalName: 'Jizan (Jazan)', adminTitle: 'Sahl Tihamah' },
    najran: { historicalName: 'Najran', adminTitle: 'Wadi Najran — Mu\'ahadat at-Ta\'if 1934' },
    tabuk: { historicalName: 'Tabuk', adminTitle: 'Khatt Hadid al-Hijaz' },
    qassim: { historicalName: 'Al-Qasim (Buraidah wa-\'Unaizah / Nejd)', adminTitle: 'Mintaqat al-Qasim — Najd' },
    buraidah: { historicalName: 'Buraidah (Al-Qasim)', adminTitle: 'Imarat al-Qasim' },
    unaizah: { historicalName: '\'Unaizah (Al-Qasim)', adminTitle: 'Mintaqat al-Qasim' },
    northern_borders: { historicalName: 'Al-Hudud ash-Shamaliyyah', adminTitle: 'Al-Mintaqah ash-Shamaliyyah' },
    al_hudud_ash_shamaliyah: { historicalName: 'Al-Hudud ash-Shamaliyyah', adminTitle: 'Al-Mintaqah ash-Shamaliyyah' },
    arar: { historicalName: '\'Ar\'ar', adminTitle: 'Al-Hudud ash-Shamaliyyah' },
    al_bahah: { historicalName: 'Al-Bahah (Jibal as-Sarawat)', adminTitle: 'Jibal as-Sarawat' },
    rub_al_khali: { historicalName: 'Ar-Rub\' al-Khali', adminTitle: 'Sahra\' ar-Rub\' al-Khali' },
    nafud: { historicalName: 'Sahra\' an-Nafud al-Kabir', adminTitle: 'An-Nafud (Najd)' },
    dahna: { historicalName: 'Sahra\' ad-Dahna\'', adminTitle: 'Ad-Dahna\' (Najd)' },
    neutral_zone_iraq: { historicalName: 'Al-Mintaqah al-Muhayadah bayna as-Su\'udiyyah wa-l-\'Iraq', adminTitle: 'Ittifaqiyyat al-\'Uqayr (1922)' },
    neutral_zone_kuwait: { historicalName: 'Al-Mintaqah al-Muhayadah bayna as-Su\'udiyyah wa-l-Kuwayt', adminTitle: 'Ittifaqiyyat al-\'Uqayr (1922)' },
    saudi_neutral_zone: { historicalName: 'Al-Mintaqah al-Muhayadah', adminTitle: 'Ittifaqiyyat al-\'Uqayr (1922)' },
  },
  YEM: {
    yemen: { historicalName: 'Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah', adminTitle: 'Imamat al-Yaman — Al-Imam Yahya Hamid ad-Din' },
    sanaa: { historicalName: 'San\'a\'', adminTitle: 'Asimat al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah' },
    hodeidah: { historicalName: 'Al-Hudaydah', adminTitle: 'Mina\' al-Bahr al-Ahmar' },
    taiz: { historicalName: 'Ta\'izz', adminTitle: 'Liwa\' Ta\'izz' },
    ibb: { historicalName: 'Ibb', adminTitle: 'Liwa\' Ibb' },
    saada: { historicalName: 'Sa\'dah', adminTitle: 'Liwa\' Sa\'dah' },
  },
  NEP: {
    nepal: { historicalName: 'Nepal Adhirajya', adminTitle: 'Nepal Adhirajya (Shah Vamsha / Rana)', historicalNote: 'Anglo-Nepalese Treaty of 1923; Prime Minister Juddha Shumsher Jung Bahadur Rana.' },
    kathmandu: { historicalName: 'Kathmandu', adminTitle: 'Rajdhani Nepal Adhirajya' },
    pokhara: { historicalName: 'Pokhara', adminTitle: 'Gandaki Kshetra' },
    biratnagar: { historicalName: 'Biratnagar', adminTitle: 'Purvi Terai Kshetra' },
  },
  BHU: {
    bhutan: { historicalName: 'Druk Yul', adminTitle: 'Druk Gyalpo Jigme Wangchuck (Punakha / Thimphu)', historicalNote: 'Treaty of Punakha (1910).' },
    punakha: { historicalName: 'Punakha', adminTitle: 'Druk Yul Gyalsa' },
    thimphu: { historicalName: 'Thimphu', adminTitle: 'Wang Chhu Dzongkhag' },
    paro: { historicalName: 'Paro', adminTitle: 'Rinpung Dzong' },
  },
  ETH: {
    ethiopia: { historicalName: 'Ye’Ityōṗṗyā Nigūsa Negest Mengist', adminTitle: 'Ye’Ityōṗṗyā Nigūsa Negest Mengist (Hailé Selassié I)', historicalNote: 'Solomonic Dynasty, Emperor Haile Selassie I.' },
    abyssinia: { historicalName: 'Ye’Ityōṗṗyā Nigūsa Negest Mengist', adminTitle: 'Ye’Ityōṗṗyā Nigūsa Negest Mengist (Hailé Selassié I)', historicalNote: 'Solomonic Dynasty, Emperor Haile Selassie I.' },
    addis_ababa: { historicalName: 'Finfinnee / Addis Abeba', adminTitle: 'Ye’Ityōṗṗyā Wanna Ketema' },
    harar: { historicalName: 'Harar Jugol', adminTitle: 'Hararghe Teklay Gizat' },
    gondar: { historicalName: 'Gonder', adminTitle: 'Begemder Teklay Gizat' },
    jimma: { historicalName: 'Jimma', adminTitle: 'Kaffa Teklay Gizat' },
    tigray: { historicalName: 'Tigray (Mek\'ele / Adwa)', adminTitle: 'Tigray Teklay Gizat' },
    amhara: { historicalName: 'Amhara', adminTitle: 'Ye-Ityop\'ya Teklay Gizat' },
    ogaden: { historicalName: 'Ogaden', adminTitle: 'Hararghe Teklay Gizat' },
  },

  // ================= SEGUNDA REPÚBLICA ESPAÑOLA (1931-1939) =================
  SPR: {
    a_coruna: { historicalName: 'La Coruña', adminTitle: 'Provincia de La Coruña (Segunda República Española)' },
    la_coruna: { historicalName: 'La Coruña', adminTitle: 'Provincia de La Coruña (Segunda República Española)' },
    coruna: { historicalName: 'La Coruña', adminTitle: 'Provincia de La Coruña (Segunda República Española)' },
    lugo: { historicalName: 'Lugo', adminTitle: 'Provincia de Lugo (Segunda República Española)' },
    ourense: { historicalName: 'Orense', adminTitle: 'Provincia de Orense (Segunda República Española)' },
    orense: { historicalName: 'Orense', adminTitle: 'Provincia de Orense (Segunda República Española)' },
    pontevedra: { historicalName: 'Pontevedra (Vigo)', adminTitle: 'Provincia de Pontevedra (Segunda República Española)' },
    asturias: { historicalName: 'Oviedo (Asturias)', adminTitle: 'Provincia de Oviedo — Asturias (Segunda República Española)' },
    oviedo: { historicalName: 'Oviedo (Asturias)', adminTitle: 'Provincia de Oviedo — Asturias (Segunda República Española)' },
    cantabria: { historicalName: 'Santander (Cantabria)', adminTitle: 'Provincia de Santander (Segunda República Española)' },
    santander: { historicalName: 'Santander (Cantabria)', adminTitle: 'Provincia de Santander (Segunda República Española)' },
    araba_alava: { historicalName: 'Álava', adminTitle: 'Provincia de Álava (Segunda República Española)' },
    alava: { historicalName: 'Álava', adminTitle: 'Provincia de Álava (Segunda República Española)' },
    gipuzkoa: { historicalName: 'Guipúzcoa', adminTitle: 'Provincia de Guipúzcoa (Segunda República Española)' },
    guipuzcoa: { historicalName: 'Guipúzcoa', adminTitle: 'Provincia de Guipúzcoa (Segunda República Española)' },
    bizkaia: { historicalName: 'Vizcaya', adminTitle: 'Provincia de Vizcaya (Gobierno de Euzkadi)' },
    vizcaya: { historicalName: 'Vizcaya', adminTitle: 'Provincia de Vizcaya (Gobierno de Euzkadi)' },
    navarra: { historicalName: 'Navarra', adminTitle: 'Provincia de Navarra (Segunda República Española)' },
    la_rioja: { historicalName: 'Logroño (La Rioja)', adminTitle: 'Provincia de Logroño (Segunda República Española)' },
    logrono: { historicalName: 'Logroño (La Rioja)', adminTitle: 'Provincia de Logroño (Segunda República Española)' },
    huesca: { historicalName: 'Huesca', adminTitle: 'Provincia de Huesca (Segunda República Española)' },
    teruel: { historicalName: 'Teruel', adminTitle: 'Provincia de Teruel (Segunda República Española)' },
    zaragoza: { historicalName: 'Zaragoza', adminTitle: 'Provincia de Zaragoza (Segunda República Española)' },
    madrid: { historicalName: 'Madrid', adminTitle: 'Segunda República Española — Capital de la República' },
    avila: { historicalName: 'Ávila', adminTitle: 'Provincia de Ávila (Segunda República Española)' },
    burgos: { historicalName: 'Burgos', adminTitle: 'Provincia de Burgos (Segunda República Española)' },
    leon: { historicalName: 'León', adminTitle: 'Provincia de León (Segunda República Española)' },
    palencia: { historicalName: 'Palencia', adminTitle: 'Provincia de Palencia (Segunda República Española)' },
    salamanca: { historicalName: 'Salamanca', adminTitle: 'Provincia de Salamanca (Segunda República Española)' },
    segovia: { historicalName: 'Segovia', adminTitle: 'Provincia de Segovia (Segunda República Española)' },
    soria: { historicalName: 'Soria', adminTitle: 'Provincia de Soria (Segunda República Española)' },
    valladolid: { historicalName: 'Valladolid', adminTitle: 'Provincia de Valladolid (Segunda República Española)' },
    zamora: { historicalName: 'Zamora', adminTitle: 'Provincia de Zamora (Segunda República Española)' },
    albacete: { historicalName: 'Albacete', adminTitle: 'Provincia de Albacete (Segunda República Española)' },
    ciudad_real: { historicalName: 'Ciudad Real', adminTitle: 'Provincia de Ciudad Real (Segunda República Española)' },
    cuenca: { historicalName: 'Cuenca', adminTitle: 'Provincia de Cuenca (Segunda República Española)' },
    guadalajara: { historicalName: 'Guadalajara', adminTitle: 'Provincia de Guadalajara (Segunda República Española)' },
    toledo: { historicalName: 'Toledo', adminTitle: 'Provincia de Toledo (Segunda República Española)' },
    badajoz: { historicalName: 'Badajoz', adminTitle: 'Provincia de Badajoz (Segunda República Española)' },
    caceres: { historicalName: 'Cáceres', adminTitle: 'Provincia de Cáceres (Segunda República Española)' },
    barcelona: { historicalName: 'Barcelona', adminTitle: 'Generalitat de Catalunya — Barcelona (Segunda República Española)' },
    girona: { historicalName: 'Gerona', adminTitle: 'Generalitat de Catalunya — Gerona (Segunda República Española)' },
    gerona: { historicalName: 'Gerona', adminTitle: 'Generalitat de Catalunya — Gerona (Segunda República Española)' },
    lleida: { historicalName: 'Lérida', adminTitle: 'Generalitat de Catalunya — Lérida (Segunda República Española)' },
    lerida: { historicalName: 'Lérida', adminTitle: 'Generalitat de Catalunya — Lérida (Segunda República Española)' },
    tarragona: { historicalName: 'Tarragona', adminTitle: 'Generalitat de Catalunya — Tarragona (Segunda República Española)' },
    alicante_alacant: { historicalName: 'Alicante', adminTitle: 'Provincia de Alicante (Segunda República Española)' },
    alicante: { historicalName: 'Alicante', adminTitle: 'Provincia de Alicante (Segunda República Española)' },
    castellon_castello: { historicalName: 'Castellón', adminTitle: 'Provincia de Castellón (Segunda República Española)' },
    castellon: { historicalName: 'Castellón', adminTitle: 'Provincia de Castellón (Segunda República Española)' },
    valencia_valencia: { historicalName: 'Valencia', adminTitle: 'Provincia de Valencia (Segunda República Española)' },
    valencia: { historicalName: 'Valencia', adminTitle: 'Provincia de Valencia (Segunda República Española)' },
    eivissa_y_formentera: { historicalName: 'Ibiza y Formentera', adminTitle: 'Islas Pitiusas (Segunda República Española)' },
    ibiza_y_formentera: { historicalName: 'Ibiza y Formentera', adminTitle: 'Islas Pitiusas (Segunda República Española)' },
    ibiza: { historicalName: 'Ibiza y Formentera', adminTitle: 'Islas Pitiusas (Segunda República Española)' },
    mallorca: { historicalName: 'Mallorca (Palma de Mallorca)', adminTitle: 'Mallorca — Islas Baleares (Segunda República Española)' },
    menorca: { historicalName: 'Menorca (Mahón)', adminTitle: 'Menorca — Base Naval de Mahón (Segunda República Española)' },
    almeria: { historicalName: 'Almería', adminTitle: 'Provincia de Almería (Segunda República Española)' },
    cadiz: { historicalName: 'Cádiz', adminTitle: 'Provincia de Cádiz (Segunda República Española)' },
    cordoba: { historicalName: 'Córdoba', adminTitle: 'Provincia de Córdoba (Segunda República Española)' },
    granada: { historicalName: 'Granada', adminTitle: 'Provincia de Granada (Segunda República Española)' },
    huelva: { historicalName: 'Huelva', adminTitle: 'Provincia de Huelva (Segunda República Española)' },
    jaen: { historicalName: 'Jaén', adminTitle: 'Provincia de Jaén (Segunda República Española)' },
    malaga: { historicalName: 'Málaga', adminTitle: 'Provincia de Málaga (Segunda República Española)' },
    sevilla: { historicalName: 'Sevilla', adminTitle: 'Provincia de Sevilla (Segunda República Española)' },
    murcia: { historicalName: 'Murcia (Cartagena)', adminTitle: 'Provincia de Murcia (Segunda República Española)' },
    ceuta: { historicalName: 'Ceuta (Plaza de Soberanía)', adminTitle: 'Ceuta — Plaza de Soberanía (Segunda República Española)' },
    melilla: { historicalName: 'Melilla (Plaza de Soberanía)', adminTitle: 'Melilla — Plaza de Soberanía (Segunda República Española)' },
    el_hierro: { historicalName: 'El Hierro', adminTitle: 'Provincia de Santa Cruz de Tenerife (Segunda República Española)' },
    fuerteventura: { historicalName: 'Fuerteventura', adminTitle: 'Provincia de Las Palmas (Segunda República Española)' },
    gran_canaria: { historicalName: 'Gran Canaria (Las Palmas)', adminTitle: 'Provincia de Las Palmas (Segunda República Española)' },
    la_gomera: { historicalName: 'La Gomera', adminTitle: 'Provincia de Santa Cruz de Tenerife (Segunda República Española)' },
    la_palma: { historicalName: 'La Palma', adminTitle: 'Provincia de Santa Cruz de Tenerife (Segunda República Española)' },
    lanzarote: { historicalName: 'Lanzarote', adminTitle: 'Provincia de Las Palmas (Segunda República Española)' },
    tenerife: { historicalName: 'Tenerife (Santa Cruz de Tenerife)', adminTitle: 'Provincia de Santa Cruz de Tenerife (Segunda República Española)' },
    bilbao: { historicalName: 'Bilbao (Gobierno Provisional de Euskadi)', adminTitle: 'Lehendakari José Antonio Aguirre' },
    gijon: { historicalName: 'Gijón (Asturias Republicana)', adminTitle: 'Consejo Soberano de Asturias y León' },
    cartagena: { historicalName: 'Cartagena (Base Naval Republicana)', adminTitle: 'Marina de Guerra de la República' },
    mahon: { historicalName: 'Mahón (Base Naval Republicana de Menorca)', adminTitle: 'Fortaleza de La Mola — Guarnición Fiel a la República' },
    rif: { historicalName: 'Protectorado Español de Marruecos (Tetuán y el Rif)', adminTitle: 'Segunda República Española — Alto Comisario Arturo Álvarez-Buylla' },
    tetuan: { historicalName: 'Tetuán (Capital del Protectorado Español)', adminTitle: 'Segunda República Española (hasta el 17 de julio de 1936)' },
  },

  // ================= BANDO NACIONAL / ESTADO ESPAÑOL =================
  SPA: {
    a_coruna: { historicalName: 'La Coruña', adminTitle: 'Bando Nacional — Capitanía General de Galicia' },
    la_coruna: { historicalName: 'La Coruña', adminTitle: 'Bando Nacional — Capitanía General de Galicia' },
    coruna: { historicalName: 'La Coruña', adminTitle: 'Bando Nacional — Capitanía General de Galicia' },
    lugo: { historicalName: 'Lugo', adminTitle: 'Bando Nacional — Galicia Interior' },
    ourense: { historicalName: 'Orense', adminTitle: 'Bando Nacional — Galicia Meridional' },
    orense: { historicalName: 'Orense', adminTitle: 'Bando Nacional — Galicia Meridional' },
    pontevedra: { historicalName: 'Pontevedra (Vigo)', adminTitle: 'Bando Nacional — Rías Baixas y Base de Vigo' },
    asturias: { historicalName: 'Oviedo (Asturias)', adminTitle: 'Bando Nacional — Frente Norte Conquistado' },
    oviedo: { historicalName: 'Oviedo (Asturias)', adminTitle: 'Bando Nacional — Frente Norte Conquistado' },
    cantabria: { historicalName: 'Santander (Cantabria)', adminTitle: 'Bando Nacional — Ofensiva de Santander' },
    santander: { historicalName: 'Santander (Cantabria)', adminTitle: 'Bando Nacional — Ofensiva de Santander' },
    araba_alava: { historicalName: 'Álava', adminTitle: 'Bando Nacional — Álava Foral' },
    alava: { historicalName: 'Álava', adminTitle: 'Bando Nacional — Álava Foral' },
    gipuzkoa: { historicalName: 'Guipúzcoa', adminTitle: 'Bando Nacional — Frente Norte' },
    guipuzcoa: { historicalName: 'Guipúzcoa', adminTitle: 'Bando Nacional — Frente Norte' },
    bizkaia: { historicalName: 'Vizcaya', adminTitle: 'Bando Nacional — Caída del Cinturón de Hierro' },
    vizcaya: { historicalName: 'Vizcaya', adminTitle: 'Bando Nacional — Caída del Cinturón de Hierro' },
    navarra: { historicalName: 'Navarra', adminTitle: 'Bando Nacional — Bastión Carlista y Requeté' },
    la_rioja: { historicalName: 'Logroño (La Rioja)', adminTitle: 'Bando Nacional — España Nacional' },
    logrono: { historicalName: 'Logroño (La Rioja)', adminTitle: 'Bando Nacional — España Nacional' },
    huesca: { historicalName: 'Huesca', adminTitle: 'Bando Nacional — Frente de Aragón' },
    teruel: { historicalName: 'Teruel', adminTitle: 'Bando Nacional — Batalla de Teruel' },
    zaragoza: { historicalName: 'Zaragoza', adminTitle: 'Bando Nacional — Capitanía General de Aragón' },
    madrid: { historicalName: 'Madrid', adminTitle: 'Estado Español — Capital de la Victoria' },
    avila: { historicalName: 'Ávila', adminTitle: 'Bando Nacional — Frente de Guadarrama' },
    burgos: { historicalName: 'Burgos (Capital Nacional)', adminTitle: 'Bando Nacional — Capital Provisional del Estado Nacional' },
    leon: { historicalName: 'León', adminTitle: 'Bando Nacional — Base de la Legión Cóndor' },
    palencia: { historicalName: 'Palencia', adminTitle: 'Bando Nacional — España Nacional' },
    salamanca: { historicalName: 'Salamanca (Cuartel General del Generalísimo)', adminTitle: 'Bando Nacional — Cuartel General de Franco' },
    segovia: { historicalName: 'Segovia', adminTitle: 'Bando Nacional — España Nacional' },
    soria: { historicalName: 'Soria', adminTitle: 'Bando Nacional — España Nacional' },
    valladolid: { historicalName: 'Valladolid', adminTitle: 'Bando Nacional — Bastión de Falange de las JONS' },
    zamora: { historicalName: 'Zamora', adminTitle: 'Bando Nacional — España Nacional' },
    albacete: { historicalName: 'Albacete', adminTitle: 'Estado Español — Provincia de Albacete' },
    ciudad_real: { historicalName: 'Ciudad Real', adminTitle: 'Estado Español — Provincia de Ciudad Real' },
    cuenca: { historicalName: 'Cuenca', adminTitle: 'Estado Español — Provincia de Cuenca' },
    guadalajara: { historicalName: 'Guadalajara', adminTitle: 'Estado Español — Provincia de Guadalajara' },
    toledo: { historicalName: 'Toledo', adminTitle: 'Bando Nacional — Alcázar de Toledo Liberado' },
    badajoz: { historicalName: 'Badajoz', adminTitle: 'Bando Nacional — Toma de Badajoz' },
    caceres: { historicalName: 'Cáceres', adminTitle: 'Bando Nacional — España Nacional' },
    barcelona: { historicalName: 'Barcelona', adminTitle: 'Estado Español — Capitanía General de Cataluña' },
    girona: { historicalName: 'Gerona', adminTitle: 'Estado Español — Provincia de Gerona' },
    gerona: { historicalName: 'Gerona', adminTitle: 'Estado Español — Provincia de Gerona' },
    lleida: { historicalName: 'Lérida', adminTitle: 'Estado Español — Provincia de Lérida' },
    lerida: { historicalName: 'Lérida', adminTitle: 'Estado Español — Provincia de Lérida' },
    tarragona: { historicalName: 'Tarragona', adminTitle: 'Estado Español — Provincia de Tarragona' },
    alicante_alacant: { historicalName: 'Alicante', adminTitle: 'Estado Español — Provincia de Alicante' },
    alicante: { historicalName: 'Alicante', adminTitle: 'Estado Español — Provincia de Alicante' },
    castellon_castello: { historicalName: 'Castellón', adminTitle: 'Bando Nacional — Llegada al Mediterráneo (Vinaròs)' },
    castellon: { historicalName: 'Castellón', adminTitle: 'Bando Nacional — Llegada al Mediterráneo (Vinaròs)' },
    valencia_valencia: { historicalName: 'Valencia', adminTitle: 'Estado Español — Capitanía General de Valencia' },
    valencia: { historicalName: 'Valencia', adminTitle: 'Estado Español — Capitanía General de Valencia' },
    eivissa_y_formentera: { historicalName: 'Ibiza y Formentera', adminTitle: 'Bando Nacional — Base de las Pitiusas' },
    ibiza_y_formentera: { historicalName: 'Ibiza y Formentera', adminTitle: 'Bando Nacional — Base de las Pitiusas' },
    ibiza: { historicalName: 'Ibiza y Formentera', adminTitle: 'Bando Nacional — Base de las Pitiusas' },
    mallorca: { historicalName: 'Mallorca (Palma de Mallorca)', adminTitle: 'Bando Nacional — Base de la Aviación Legionaria Italiana' },
    menorca: { historicalName: 'Menorca (Mahón)', adminTitle: 'Estado Español — Menorca (Rendición febrero 1939)' },
    almeria: { historicalName: 'Almería', adminTitle: 'Estado Español — Provincia de Almería' },
    cadiz: { historicalName: 'Cádiz', adminTitle: 'Bando Nacional — Base Naval de San Fernando y Paso del Estrecho' },
    cordoba: { historicalName: 'Córdoba', adminTitle: 'Bando Nacional — Frente de Córdoba' },
    granada: { historicalName: 'Granada', adminTitle: 'Bando Nacional — Granada Nacional' },
    huelva: { historicalName: 'Huelva', adminTitle: 'Bando Nacional — Minas de Riotinto' },
    jaen: { historicalName: 'Jaén', adminTitle: 'Estado Español — Provincia de Jaén' },
    malaga: { historicalName: 'Málaga', adminTitle: 'Bando Nacional — Toma de Málaga (Febrero 1937)' },
    sevilla: { historicalName: 'Sevilla', adminTitle: 'Bando Nacional — Capitanía General de Andalucía (Queipo de Llano)' },
    murcia: { historicalName: 'Murcia (Cartagena)', adminTitle: 'Estado Español — Provincia de Murcia y Arsenal de Cartagena' },
    ceuta: { historicalName: 'Ceuta (Plaza de Soberanía)', adminTitle: 'Bando Nacional — Base del Ejército de África' },
    melilla: { historicalName: 'Melilla (Plaza de Soberanía)', adminTitle: 'Bando Nacional — Cuna del Alzamiento Militar' },
    el_hierro: { historicalName: 'El Hierro', adminTitle: 'Bando Nacional — Capitanía General de Canarias' },
    fuerteventura: { historicalName: 'Fuerteventura', adminTitle: 'Bando Nacional — Capitanía General de Canarias' },
    gran_canaria: { historicalName: 'Gran Canaria (Las Palmas)', adminTitle: 'Bando Nacional — Capitanía General de Canarias' },
    la_gomera: { historicalName: 'La Gomera', adminTitle: 'Bando Nacional — Capitanía General de Canarias' },
    la_palma: { historicalName: 'La Palma', adminTitle: 'Bando Nacional — Capitanía General de Canarias' },
    lanzarote: { historicalName: 'Lanzarote', adminTitle: 'Bando Nacional — Capitanía General de Canarias' },
    tenerife: { historicalName: 'Tenerife (Santa Cruz de Tenerife)', adminTitle: 'Bando Nacional — Capitanía General de Canarias' },
    bilbao: { historicalName: 'Bilbao (Vizcaya)', adminTitle: 'Ocupada por los Nacionales (jun 1937)' },
    tetuan: { historicalName: 'Tetuán (Capital del Protectorado)', adminTitle: 'Alta Comisaría de España en Marruecos / Delegación Jalifiana' },
    rif: { historicalName: 'Protectorado Español de Marruecos (Zona del Rif / Tetuán)', adminTitle: 'Alta Comisaría de España en Marruecos' },
    marruecos: { historicalName: 'Protectorado Español de Marruecos (Zona del Rif / Tetuán)', adminTitle: 'Alta Comisaría de España en Marruecos' },
    larache: { historicalName: 'Larache (Territorio del Lucus)', adminTitle: 'Comandancia Militar del Lucus (Puerto Atlántico)' },
    alcazarquivir: { historicalName: 'Alcazarquivir (Ksar el-Kebir)', adminTitle: 'Territorio del Lucus — Frontera Sur' },
    arcila: { historicalName: 'Arcila (Asilah)', adminTitle: 'Territorio del Lucus' },
    xauen: { historicalName: 'Chefchaouen (Xauen / Chaouen)', adminTitle: 'Territorio del Gomara / Yebala' },
    villa_sanjurjo: { historicalName: 'Villa Sanjurjo (Alhucemas)', adminTitle: 'Territorio del Rif — Bahía de Alhucemas' },
    alhucemas: { historicalName: 'Villa Sanjurjo (Alhucemas / Al-Hoceima)', adminTitle: 'Territorio del Rif' },
    nador: { historicalName: 'Nador (Territorio del Kert)', adminTitle: 'Zona Oriental del Rif / Mar Chica' },
    cabo_de_agua: { historicalName: 'Cabo de Agua (Ras Kebdana)', adminTitle: 'Frontera Oriental del Río Muluya' },
    tanger: { historicalName: 'Tánger (Zona Ocupada por España)', adminTitle: 'Ocupación Militar Española (14 de junio de 1940)' },
    sahara: { historicalName: 'Sahara Español (Río de Oro)', adminTitle: 'África Occidental Española (Villa Cisneros)' },
    ifni: { historicalName: 'Territorio de Ifni (Sidi Ifni)', adminTitle: 'Gobierno Político-Militar de Ifni' },
    guinea_espanola: { historicalName: 'Guinea Española (Santa Isabel / Fernando Poo)', adminTitle: 'Territorios Españoles del Golfo de Guinea' },
    baleares: { historicalName: 'Islas Baleares (Palma de Mallorca)', adminTitle: 'Capitanía General de Baleares (Bando Nacional)' },
    canarias: { historicalName: 'Islas Canarias (Tenerife / Las Palmas)', adminTitle: 'Comandancia Militar de Canarias' },
  },
};

// Integrazione automatica toponomastica storica scandinava
populateScandinavianToponyms(HISTORICAL_TOPONYM_DICT);

// Integrazione automatica toponomastica e amministrazioni storiche Stati Uniti (50 Stati, DC, Territori)
populateUSAToponyms(HISTORICAL_TOPONYM_DICT);

// Integrazione automatica toponomastica e amministrazioni storiche Canada e Terranova (10 Province, 2 Territori, Nunavut, Dominion of Newfoundland)
populateCanadaToponyms(HISTORICAL_TOPONYM_DICT);

// Integrazione automatica toponomastica e amministrazioni storiche Messico (31 Stati, 2 Territori Federali, Distrito Federal)
populateMexicoToponyms(HISTORICAL_TOPONYM_DICT);

// Integrazione automatica toponomastica e amministrazioni storiche Africa Occidentale Francese (7 entità territoriali e federazione AOF)
populateAOFToponyms(HISTORICAL_TOPONYM_DICT);

// Integrazione automatica toponomastica e amministrazioni storiche Africa Equatoriale Francese (4 entità territoriali e federazione AEF)
populateAEFToponyms(HISTORICAL_TOPONYM_DICT);
populateNamibiaToponyms(HISTORICAL_TOPONYM_DICT);
populateSudanToponyms(HISTORICAL_TOPONYM_DICT);
populateAfghanistanToponyms(HISTORICAL_TOPONYM_DICT);

interface SpainProvDef {
  nuts: string;
  name: string;
  keys: string[];
  repAdminTitle: string;
  repNote?: string;
  civilWarRepAdminTitle?: string;
  civilWarRepNote?: string;
  civilWarNatAdminTitle?: string;
  civilWarNatNote?: string;
  postAdminTitle?: string;
  postNote?: string;
}

const SPAIN_PROVINCES_CATALOG: SpainProvDef[] = [
  // Galicia
  {
    nuts: 'ES111',
    name: 'La Coruña',
    keys: ['a_coruna', 'la_coruna', 'coruna', 'ferrol', 'santiago'],
    repAdminTitle: 'Provincia de La Coruña (Segunda República Española)',
    repNote: 'Comunidad histórica gallega y base naval de Ferrol.',
    civilWarNatAdminTitle: 'Bando Nacional — Capitanía General de Galicia (La Coruña)',
    civilWarNatNote: 'Bando Nacional desde julio de 1936. Base naval atlántica de Ferrol.',
    postAdminTitle: 'Estado Español — Provincia de La Coruña',
    postNote: 'Régimen Franquista. Base de aprovisionamiento de sumergibles alemanes (U-Boote).',
  },
  {
    nuts: 'ES112',
    name: 'Lugo',
    keys: ['lugo', 'monforte'],
    repAdminTitle: 'Provincia de Lugo (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Galicia Interior (Lugo)',
    postAdminTitle: 'Estado Español — Provincia de Lugo',
  },
  {
    nuts: 'ES113',
    name: 'Orense',
    keys: ['ourense', 'orense'],
    repAdminTitle: 'Provincia de Orense (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Galicia Meridional (Orense)',
    postAdminTitle: 'Estado Español — Provincia de Orense',
  },
  {
    nuts: 'ES114',
    name: 'Pontevedra',
    keys: ['pontevedra', 'vigo'],
    repAdminTitle: 'Provincia de Pontevedra (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Rías Baixas y Base de Vigo',
    civilWarNatNote: 'Puerto de Vigo y estación estratégica de comunicaciones por cable submarino.',
    postAdminTitle: 'Estado Español — Provincia de Pontevedra',
  },

  // Asturias & Cantabria
  {
    nuts: 'ES120',
    name: 'Oviedo (Asturias)',
    keys: ['asturias', 'oviedo', 'gijon', 'aviles'],
    repAdminTitle: 'Provincia de Oviedo — Asturias (Segunda República Española)',
    repNote: 'Cuenca minera asturiana y memoria obrera de la Revolución de Octubre de 1934.',
    civilWarNatAdminTitle: 'Bando Nacional — Conquista del Frente Norte (Octubre 1937)',
    civilWarNatNote: 'Conquistada por las tropas nacionales en octubre de 1937 tras la caída de Gijón.',
    postAdminTitle: 'Estado Español — Provincia de Oviedo',
    postNote: 'Régimen Franquista. Cuencas mineras e industria siderúrgica bajo estricta militarización.',
  },
  {
    nuts: 'ES130',
    name: 'Santander (Cantabria)',
    keys: ['cantabria', 'santander', 'torrelavega'],
    repAdminTitle: 'Provincia de Santander (Segunda República Española)',
    repNote: 'Zona leal a la República en el norte peninsular hasta el verano de 1937.',
    civilWarNatAdminTitle: 'Bando Nacional — Batalla de Santander (Agosto 1937)',
    civilWarNatNote: 'Tomada en agosto de 1937 por las Brigadas de Navarra y el Corpo Truppe Volontarie (CTV) italiano.',
    postAdminTitle: 'Estado Español — Provincia de Santander',
  },

  // País Vasco (Vascongadas) & Navarra
  {
    nuts: 'ES211',
    name: 'Álava',
    keys: ['araba_alava', 'alava', 'araba', 'vitoria'],
    repAdminTitle: 'Provincia de Álava (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Álava Foral (General García Escámez)',
    civilWarNatNote: 'Unida al Alzamiento desde el 18 de julio de 1936 bajo el general García Escámez.',
    postAdminTitle: 'Estado Español — Provincia de Álava (Régimen Foral mantenido)',
    postNote: 'Franco respetó el Concierto Económico foral de Álava por su temprana lealtad al Alzamiento.',
  },
  {
    nuts: 'ES212',
    name: 'Guipúzcoa',
    keys: ['gipuzkoa', 'guipuzcoa', 'san_sebastian', 'irun', 'eibar'],
    repAdminTitle: 'Provincia de Guipúzcoa (Segunda República Española)',
    repNote: 'Resistencia republicana y de gudaris nacionalistas vascos en Irún y San Sebastián.',
    civilWarNatAdminTitle: 'Bando Nacional — Frente Norte (Ocupada en septiembre 1936)',
    civilWarNatNote: 'Frontera de Irún tomada por los nacionales en septiembre de 1936, aislando el norte republicano.',
    postAdminTitle: 'Estado Español — Provincia de Guipúzcoa (Decreto de provincia traidora)',
    postNote: 'Franco abolió el Concierto Económico en junio de 1937 por su oposición al Alzamiento.',
  },
  {
    nuts: 'ES213',
    name: 'Vizcaya',
    keys: ['bizkaia', 'vizcaya', 'bilbao', 'guernica', 'gernika'],
    repAdminTitle: 'Provincia de Vizcaya (Gobierno de Euzkadi / José Antonio Aguirre)',
    repNote: 'Estatuto Vasco aprobado en octubre de 1936. Sede del lehendakari José Antonio Aguirre.',
    civilWarNatAdminTitle: 'Bando Nacional — Caída del Cinturón de Hierro (Junio 1937)',
    civilWarNatNote: 'Bilbao conquistada el 19 de junio de 1937. Bombardeo de Guernica por la Legión Cóndor el 26 de abril de 1937.',
    postAdminTitle: 'Estado Español — Provincia de Vizcaya (Decreto de provincia traidora)',
    postNote: 'Gran cuenca siderúrgica e industrial puesta al servicio de la autarquía económica franquista.',
  },
  {
    nuts: 'ES220',
    name: 'Navarra',
    keys: ['navarra', 'pamplona', 'tudela'],
    repAdminTitle: 'Provincia de Navarra (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Bastión Carlista y Requeté (General Mola)',
    civilWarNatNote: 'Cuna del Alzamiento militar en el norte organizada por el general Emilio Mola y los requetés carlistas.',
    postAdminTitle: 'Estado Español — Provincia de Navarra (Régimen Foral mantenido)',
    postNote: 'Condecorada con la Cruz Laureada de San Fernando y con su régimen foral íntegro.',
  },

  // La Rioja & Aragón
  {
    nuts: 'ES230',
    name: 'Logroño (La Rioja)',
    keys: ['la_rioja', 'logrono', 'rioja', 'calahorra'],
    repAdminTitle: 'Provincia de Logroño (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — España Nacional (Logroño)',
    postAdminTitle: 'Estado Español — Provincia de Logroño',
  },
  {
    nuts: 'ES241',
    name: 'Huesca',
    keys: ['huesca', 'jaca', 'barbastro', 'monzon'],
    repAdminTitle: 'Provincia de Huesca (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Frente de Aragón (Huesca)',
    civilWarNatNote: 'Sitio de Huesca por milicias confederales y del POUM; ofensiva franquista en marzo de 1938.',
    postAdminTitle: 'Estado Español — Provincia de Huesca',
  },
  {
    nuts: 'ES242',
    name: 'Teruel',
    keys: ['teruel', 'alcaniz'],
    repAdminTitle: 'Provincia de Teruel (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Batalla de Teruel (Reconquistada en febrero de 1938)',
    civilWarNatNote: 'Batalla invernal decisiva; reconquistada definitivamente por Franco en febrero de 1938.',
    postAdminTitle: 'Estado Español — Provincia de Teruel',
  },
  {
    nuts: 'ES243',
    name: 'Zaragoza',
    keys: ['zaragoza', 'belchite', 'calatayud'],
    repAdminTitle: 'Provincia de Zaragoza (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Capitanía General de Aragón (General Cabanellas)',
    civilWarNatNote: 'Baluarte nacionalista bajo Miguel Cabanellas. Escenario de la Batalla de Belchite (1937).',
    postAdminTitle: 'Estado Español — Provincia de Zaragoza',
  },

  // Madrid
  {
    nuts: 'ES300',
    name: 'Madrid',
    keys: ['madrid', 'alcala_de_henares', 'getafe', 'aranjuez'],
    repAdminTitle: 'Segunda República Española — Capital de la República',
    repNote: 'Sede de la Presidencia de la República (Manuel Azaña) y de las Cortes Generales.',
    civilWarRepAdminTitle: 'Segunda República Española — Frente de Madrid (¡No pasarán!)',
    civilWarRepNote: 'Defensa heroica de la capital bajo la Junta de Defensa (general Miaja) y las Brigadas Internacionales.',
    civilWarNatAdminTitle: 'Bando Nacional — Asedio de Madrid (General Varela)',
    civilWarNatNote: 'Frente estabilizado en la Ciudad Universitaria y la Casa de Campo durante más de dos años.',
    postAdminTitle: 'Estado Español — Capital de la Victoria (Entrada de Franco)',
    postNote: 'Entrada de las tropas nacionales el 28 de marzo de 1939 tras el golpe de Casado. Residencia oficial en El Pardo.',
  },

  // Castilla la Vieja & León
  {
    nuts: 'ES411',
    name: 'Ávila',
    keys: ['avila', 'arevalo'],
    repAdminTitle: 'Provincia de Ávila (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Frente de Guadarrama y Somosierra',
    postAdminTitle: 'Estado Español — Provincia de Ávila',
  },
  {
    nuts: 'ES412',
    name: 'Burgos (Capital Nacional)',
    keys: ['burgos', 'aranda_de_duero', 'miranda_de_ebro'],
    repAdminTitle: 'Provincia de Burgos (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Capital Provisional del Estado Nacional',
    civilWarNatNote: 'Sede de la Junta de Defensa Nacional, Junta Técnica del Estado y primer gobierno de Franco.',
    postAdminTitle: 'Estado Español — Provincia de Burgos',
    postNote: 'Lugar de emisión del último parte oficial de la Guerra Civil el 1 de abril de 1939.',
  },
  {
    nuts: 'ES413',
    name: 'León',
    keys: ['leon', 'ponferrada', 'astorga'],
    repAdminTitle: 'Provincia de León (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Base de la Legión Cóndor en La Virgen del Camino',
    postAdminTitle: 'Estado Español — Provincia de León',
  },
  {
    nuts: 'ES414',
    name: 'Palencia',
    keys: ['palencia'],
    repAdminTitle: 'Provincia de Palencia (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — España Nacional (Palencia)',
    postAdminTitle: 'Estado Español — Provincia de Palencia',
  },
  {
    nuts: 'ES415',
    name: 'Salamanca (Cuartel General del Generalísimo)',
    keys: ['salamanca', 'bejar', 'ciudad_rodrigo'],
    repAdminTitle: 'Provincia de Salamanca (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Cuartel General del Generalísimo Franco',
    civilWarNatNote: 'Franco proclamado Jefe del Estado y Generalísimo en Salamanca el 1 de octubre de 1936 (Palacio Episcopal).',
    postAdminTitle: 'Estado Español — Provincia de Salamanca',
  },
  {
    nuts: 'ES416',
    name: 'Segovia',
    keys: ['segovia'],
    repAdminTitle: 'Provincia de Segovia (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Frente de la Sierra de Guadarrama',
    postAdminTitle: 'Estado Español — Provincia de Segovia',
  },
  {
    nuts: 'ES417',
    name: 'Soria',
    keys: ['soria'],
    repAdminTitle: 'Provincia de Soria (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — España Nacional (Soria)',
    postAdminTitle: 'Estado Español — Provincia de Soria',
  },
  {
    nuts: 'ES418',
    name: 'Valladolid',
    keys: ['valladolid', 'medina_del_campo'],
    repAdminTitle: 'Provincia de Valladolid (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Bastión de Falange Española de las JONS',
    civilWarNatNote: 'Núcleo falangista de Onésimo Redondo y base de la 7ª División del general Saliquet.',
    postAdminTitle: 'Estado Español — Provincia de Valladolid',
  },
  {
    nuts: 'ES419',
    name: 'Zamora',
    keys: ['zamora', 'benavente'],
    repAdminTitle: 'Provincia de Zamora (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — España Nacional (Zamora)',
    postAdminTitle: 'Estado Español — Provincia de Zamora',
  },

  // Castilla la Nueva
  {
    nuts: 'ES421',
    name: 'Albacete',
    keys: ['albacete', 'hellin', 'almansa'],
    repAdminTitle: 'Provincia de Albacete (Segunda República Española)',
    civilWarRepAdminTitle: 'Segunda República Española — Base General de las Brigadas Internacionales',
    civilWarRepNote: 'Sede central, parque móvil y centro de instrucción de voluntarios internacionales en España (1936-1938).',
    postAdminTitle: 'Estado Español — Provincia de Albacete',
  },
  {
    nuts: 'ES422',
    name: 'Ciudad Real',
    keys: ['ciudad_real', 'puertollano', 'valdepenas'],
    repAdminTitle: 'Provincia de Ciudad Real (Segunda República Española)',
    civilWarRepAdminTitle: 'Segunda República Española — Frente de La Mancha',
    postAdminTitle: 'Estado Español — Provincia de Ciudad Real',
  },
  {
    nuts: 'ES423',
    name: 'Cuenca',
    keys: ['cuenca', 'tarancon'],
    repAdminTitle: 'Provincia de Cuenca (Segunda República Española)',
    civilWarRepAdminTitle: 'Segunda República Española — Zona Centro-Sur',
    postAdminTitle: 'Estado Español — Provincia de Cuenca',
  },
  {
    nuts: 'ES424',
    name: 'Guadalajara',
    keys: ['guadalajara', 'siguenza'],
    repAdminTitle: 'Provincia de Guadalajara (Segunda República Española)',
    civilWarRepAdminTitle: 'Segunda República Española — Frente de Guadalajara',
    civilWarRepNote: 'Batalla de Guadalajara (marzo de 1937): victoria del Ejército Popular republicano frente al CTV fascista italiano.',
    postAdminTitle: 'Estado Español — Provincia de Guadalajara',
  },
  {
    nuts: 'ES425',
    name: 'Toledo',
    keys: ['toledo', 'talavera_de_la_reina'],
    repAdminTitle: 'Provincia de Toledo (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Alcázar de Toledo (Liberado por Varela)',
    civilWarNatNote: 'El célebre Asedio del Alcázar de Toledo (julio-septiembre 1936) y su liberación por el general Varela.',
    postAdminTitle: 'Estado Español — Provincia de Toledo',
  },

  // Extremadura
  {
    nuts: 'ES431',
    name: 'Badajoz',
    keys: ['badajoz', 'merida', 'almendralejo'],
    repAdminTitle: 'Provincia de Badajoz (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Frente de Extremadura (Toma de Badajoz, agosto 1936)',
    civilWarNatNote: 'Conquista de Badajoz por la columna de Yagüe el 14 de agosto de 1936 uniendo los sectores norte y sur nacionalistas.',
    postAdminTitle: 'Estado Español — Provincia de Badajoz',
  },
  {
    nuts: 'ES432',
    name: 'Cáceres',
    keys: ['caceres', 'plasencia'],
    repAdminTitle: 'Provincia de Cáceres (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — España Nacional (Cáceres)',
    postAdminTitle: 'Estado Español — Provincia de Cáceres',
  },

  // Cataluña
  {
    nuts: 'ES511',
    name: 'Barcelona',
    keys: ['barcelona', 'badalona', 'sabadell', 'terrassa', 'hospitalet'],
    repAdminTitle: 'Generalitat de Catalunya — Barcelona (Segunda República Española)',
    repNote: 'Lluís Companys, presidente de la Generalitat de Catalunya. Gran metrópoli industrial y antifascista.',
    civilWarRepAdminTitle: 'Segunda República Española — Sede del Gobierno de la República y Generalitat',
    civilWarRepNote: 'Capital del gobierno de Juan Negrín (nov 1937 - ene 1939). Bombardeada por la aviación legionaria italiana.',
    postAdminTitle: 'Estado Español — Capitanía General de Cataluña (Barcelona franquista)',
    postNote: 'Entrada de las tropas nacionales el 26 de enero de 1939. Derogación del Estatuto de Autonomía de Cataluña.',
  },
  {
    nuts: 'ES512',
    name: 'Gerona',
    keys: ['girona', 'gerona', 'figueres', 'portbou'],
    repAdminTitle: 'Generalitat de Catalunya — Gerona (Segunda República Española)',
    civilWarRepAdminTitle: 'Segunda República Española — Retaguardia de Cataluña (Gerona)',
    postAdminTitle: 'Estado Español — Provincia de Gerona (Frontera de Portbou)',
    postNote: 'Caída el 4 de febrero de 1939. Paso fronterizo del gran éxodo de La Retirada hacia los campos de refugiados en Francia.',
  },
  {
    nuts: 'ES513',
    name: 'Lérida',
    keys: ['lleida', 'lerida', 'balaguer'],
    repAdminTitle: 'Generalitat de Catalunya — Lérida (Segunda República Española)',
    civilWarRepAdminTitle: 'Segunda República Española — Frente del Segre (Batalla de Lérida)',
    civilWarRepNote: 'Ofensiva de Aragón: Lérida tomada por Franco en abril de 1938; el río Segre quedó como línea de frente durante meses.',
    postAdminTitle: 'Estado Español — Provincia de Lérida',
  },
  {
    nuts: 'ES514',
    name: 'Tarragona',
    keys: ['tarragona', 'reus', 'tortosa'],
    repAdminTitle: 'Generalitat de Catalunya — Tarragona (Segunda República Española)',
    civilWarRepAdminTitle: 'Segunda República Española — Frente del Ebro y Tarragona',
    civilWarRepNote: 'Principal teatro de la Batalla del Ebro (julio-noviembre de 1938), el enfrentamiento decisivo de la contienda.',
    postAdminTitle: 'Estado Español — Provincia de Tarragona',
  },

  // Levante (Comunidad Valenciana)
  {
    nuts: 'ES521',
    name: 'Alicante',
    keys: ['alicante_alacant', 'alicante', 'alacant', 'elche', 'elx'],
    repAdminTitle: 'Provincia de Alicante (Segunda República Española)',
    civilWarRepAdminTitle: 'Segunda República Española — Puerto de Alicante (Levante)',
    civilWarRepNote: 'Último puerto continental republicano; evacuación desesperada de refugiados en el vapor Stanbrook (marzo 1939).',
    postAdminTitle: 'Estado Español — Provincia de Alicante',
    postNote: 'Escenario de la rendición final republicana en el puerto y campo de concentración de Los Almendros.',
  },
  {
    nuts: 'ES522',
    name: 'Castellón',
    keys: ['castellon_castello', 'castellon', 'castello', 'vinaros', 'vila_real'],
    repAdminTitle: 'Provincia de Castellón (Segunda República Española)',
    civilWarRepAdminTitle: 'Segunda República Española — Frente de Levante',
    civilWarRepNote: 'Zona republicana en marzo de 1938 antes de la ofensiva nacional de Aragón hacia la costa.',
    civilWarNatAdminTitle: 'Bando Nacional — Llegada al Mediterráneo (Vinaròs, abril 1938)',
    civilWarNatNote: 'El 15 de abril de 1938 la 4ª División navarra de Alonso Vega llegó al mar en Vinaròs partiendo a la República en dos.',
    postAdminTitle: 'Estado Español — Provincia de Castellón',
  },
  {
    nuts: 'ES523',
    name: 'Valencia',
    keys: ['valencia_valencia', 'valencia', 'sagunto', 'gandia'],
    repAdminTitle: 'Provincia de Valencia (Segunda República Española)',
    civilWarRepAdminTitle: 'Segunda República Española — Capital de la República (1936-1937) / Línea XYZ',
    civilWarRepNote: 'Sede del gobierno republicano de Largo Caballero y Negrín. Inexpugnable defensa de la Línea XYZ ante el avance franquista.',
    postAdminTitle: 'Estado Español — Capitanía General de Valencia',
    postNote: 'Entrada de las tropas del general Aranda el 30 de marzo de 1939 tras el colapso del frente republicano.',
  },

  // Islas Baleares
  {
    nuts: 'ES531',
    name: 'Ibiza y Formentera',
    keys: ['eivissa_y_formentera', 'ibiza_y_formentera', 'ibiza', 'formentera', 'eivissa'],
    repAdminTitle: 'Islas Pitiusas (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Base de las Pitiusas (Ibiza)',
    civilWarNatNote: 'Reconquistada por los nacionales en septiembre de 1936 tras el desembarco del capitán Alberto Bayo.',
    postAdminTitle: 'Estado Español — Ibiza y Formentera',
  },
  {
    nuts: 'ES532',
    name: 'Mallorca (Palma de Mallorca)',
    keys: ['mallorca', 'palma_de_mallorca', 'palma', 'manacor'],
    repAdminTitle: 'Mallorca — Islas Baleares (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Base de la Aviación Legionaria Italiana',
    civilWarNatNote: 'Principal base aeronaval nacionalista y aeródromos italianos del CTV para bombardear los puertos republicanos.',
    postAdminTitle: 'Estado Español — Capitanía General de Baleares (Mallorca)',
  },
  {
    nuts: 'ES533',
    name: 'Menorca (Mahón)',
    keys: ['menorca', 'mahon', 'ciutadella'],
    repAdminTitle: 'Menorca (Segunda República Española)',
    civilWarRepAdminTitle: 'Segunda República Española — Base Naval de Mahón (Isla Republicana)',
    civilWarRepNote: 'Única isla balear fiel a la República durante toda la guerra gracias a la base naval fortificada de Mahón.',
    postAdminTitle: 'Estado Español — Menorca (Rendición a bordo del HMS Devonshire, feb 1939)',
    postNote: 'Rendida pacíficamente el 9 de febrero de 1939 tras mediación británica para evitar represalias masivas.',
  },

  // Andalucía
  {
    nuts: 'ES611',
    name: 'Almería',
    keys: ['almeria', 'roquetas_de_mar', 'el_ejido'],
    repAdminTitle: 'Provincia de Almería (Segunda República Española)',
    civilWarRepAdminTitle: 'Segunda República Española — Base Naval de Almería',
    civilWarRepNote: 'Bombardeada por el acorazado de bolsillo alemán Admiral Scheer el 31 de mayo de 1937 tras el incidente del Deutschland.',
    postAdminTitle: 'Estado Español — Provincia de Almería',
  },
  {
    nuts: 'ES612',
    name: 'Cádiz',
    keys: ['cadiz', 'jerez_de_la_frontera', 'algeciras', 'san_fernando'],
    repAdminTitle: 'Provincia de Cádiz (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Base Naval de San Fernando y Paso del Estrecho',
    civilWarNatNote: 'Paso del Estrecho en agosto de 1936 ("Convoy de la Victoria") trasladando al Ejército de África a la península.',
    postAdminTitle: 'Estado Español — Provincia de Cádiz',
  },
  {
    nuts: 'ES613',
    name: 'Córdoba',
    keys: ['cordoba', 'lucena'],
    repAdminTitle: 'Provincia de Córdoba (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Frente de Córdoba (General Varela)',
    postAdminTitle: 'Estado Español — Provincia de Córdoba',
  },
  {
    nuts: 'ES614',
    name: 'Granada',
    keys: ['granada', 'motril'],
    repAdminTitle: 'Provincia de Granada (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Granada Nacional (Sector aislado 1936)',
    civilWarNatNote: 'Triunfo inicial de la sublevación y posterior fusilamiento del poeta Federico García Lorca en agosto de 1936.',
    postAdminTitle: 'Estado Español — Provincia de Granada',
  },
  {
    nuts: 'ES615',
    name: 'Huelva',
    keys: ['huelva', 'riotinto'],
    repAdminTitle: 'Provincia de Huelva (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Minas de Riotinto (Piritas de cobre para el Reich)',
    civilWarNatNote: 'Yacimientos de pirita y cobre explotados para abastecer de materias primas a la industria de guerra alemana.',
    postAdminTitle: 'Estado Español — Provincia de Huelva',
  },
  {
    nuts: 'ES616',
    name: 'Jaén',
    keys: ['jaen', 'linares', 'ubeda', 'baeza', 'andujar'],
    repAdminTitle: 'Provincia de Jaén (Segunda República Española)',
    civilWarRepAdminTitle: 'Segunda República Española — Frente de Jaén',
    civilWarRepNote: 'Foco republicano en Andalucía oriental; asedio del Santuario de Nuestra Señora de la Cabeza (1936-1937).',
    postAdminTitle: 'Estado Español — Provincia de Jaén',
  },
  {
    nuts: 'ES617',
    name: 'Málaga',
    keys: ['malaga', 'marbella', 'ronda'],
    repAdminTitle: 'Provincia de Málaga (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Toma de Málaga (Febrero 1937 / Desbandá)',
    civilWarNatNote: 'Conquistada en febrero de 1937 por tropas nacionalistas e italianas del CTV. Éxodo y masacre de civiles en la carretera a Almería.',
    postAdminTitle: 'Estado Español — Provincia de Málaga',
  },
  {
    nuts: 'ES618',
    name: 'Sevilla',
    keys: ['sevilla', 'dos_hermanas', 'alcala_de_guadaira'],
    repAdminTitle: 'Provincia de Sevilla (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Capitanía General de Andalucía (Queipo de Llano)',
    civilWarNatNote: 'Controlada por el general Gonzalo Queipo de Llano el 18 de julio de 1936. Cabecera del puente aéreo del Ejército de África.',
    postAdminTitle: 'Estado Español — Provincia de Sevilla',
  },

  // Región de Murcia
  {
    nuts: 'ES620',
    name: 'Murcia (Cartagena)',
    keys: ['murcia', 'cartagena', 'lorca'],
    repAdminTitle: 'Provincia de Murcia (Segunda República Española)',
    civilWarRepAdminTitle: 'Segunda República Española — Gran Base Naval de Cartagena',
    civilWarRepNote: 'Cartagena albergó el grueso de la Escuadra de la Marina de Guerra republicana durante toda la Guerra Civil.',
    postAdminTitle: 'Estado Español — Provincia de Murcia y Arsenal de Cartagena',
    postNote: 'Sublevación interna de la base naval en marzo de 1939 y huida de la flota hacia Bizerta antes de la entrada franquista.',
  },

  // Plazas de Soberanía
  {
    nuts: 'ES630',
    name: 'Ceuta (Plaza de Soberanía)',
    keys: ['ceuta'],
    repAdminTitle: 'Ceuta — Plaza de Soberanía (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Base del Ejército de África y Paso del Estrecho',
    civilWarNatNote: 'Plaza de soberanía española dominando el Estrecho de Gibraltar bajo control del Ejército de África.',
    postAdminTitle: 'Estado Español — Plaza de Soberanía de Ceuta',
  },
  {
    nuts: 'ES640',
    name: 'Melilla (Plaza de Soberanía)',
    keys: ['melilla'],
    repAdminTitle: 'Melilla — Plaza de Soberanía (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Cuna del Alzamiento Militar (17 de julio de 1936)',
    civilWarNatNote: 'Melilla fue la primera ciudad en sublevarse en la tarde del 17 de julio de 1936 iniciando la Guerra Civil Española.',
    postAdminTitle: 'Estado Español — Plaza de Soberanía de Melilla',
  },

  // Islas Canarias
  {
    nuts: 'ES703',
    name: 'El Hierro',
    keys: ['el_hierro', 'hierro'],
    repAdminTitle: 'Provincia de Santa Cruz de Tenerife — El Hierro (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Capitanía General de Canarias (El Hierro)',
    postAdminTitle: 'Estado Español — Provincia de Santa Cruz de Tenerife (El Hierro)',
  },
  {
    nuts: 'ES704',
    name: 'Fuerteventura',
    keys: ['fuerteventura'],
    repAdminTitle: 'Provincia de Las Palmas — Fuerteventura (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Capitanía General de Canarias (Fuerteventura)',
    postAdminTitle: 'Estado Español — Provincia de Las Palmas (Fuerteventura)',
  },
  {
    nuts: 'ES705',
    name: 'Gran Canaria (Las Palmas)',
    keys: ['gran_canaria', 'las_palmas', 'las_palmas_de_gran_canaria'],
    repAdminTitle: 'Provincia de Las Palmas (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Capitanía General de Canarias (Las Palmas)',
    postAdminTitle: 'Estado Español — Provincia de Las Palmas',
  },
  {
    nuts: 'ES706',
    name: 'La Gomera',
    keys: ['la_gomera', 'gomera'],
    repAdminTitle: 'Provincia de Santa Cruz de Tenerife — La Gomera (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Capitanía General de Canarias (La Gomera)',
    postAdminTitle: 'Estado Español — Provincia de Santa Cruz de Tenerife (La Gomera)',
  },
  {
    nuts: 'ES707',
    name: 'La Palma',
    keys: ['la_palma'],
    repAdminTitle: 'Provincia de Santa Cruz de Tenerife — La Palma (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Capitanía General de Canarias (La Palma)',
    postAdminTitle: 'Estado Español — Provincia de Santa Cruz de Tenerife (La Palma)',
  },
  {
    nuts: 'ES708',
    name: 'Lanzarote',
    keys: ['lanzarote', 'arrecife'],
    repAdminTitle: 'Provincia de Las Palmas — Lanzarote (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Capitanía General de Canarias (Lanzarote)',
    postAdminTitle: 'Estado Español — Provincia de Las Palmas (Lanzarote)',
  },
  {
    nuts: 'ES709',
    name: 'Tenerife (Santa Cruz de Tenerife)',
    keys: ['tenerife', 'santa_cruz_de_tenerife', 'la_laguna'],
    repAdminTitle: 'Provincia de Santa Cruz de Tenerife (Segunda República Española)',
    civilWarNatAdminTitle: 'Bando Nacional — Capitanía General de Canarias (Tenerife)',
    civilWarNatNote: 'Sede de la Comandancia Militar del general Francisco Franco antes de trasladarse a Marruecos el 18 de julio de 1936.',
    postAdminTitle: 'Estado Español — Provincia de Santa Cruz de Tenerife',
  },
];

/**
 * Risoluzione toponomastica, istituzionale e temporale dettagliata per le province spagnole (1936-1940)
 */
export function resolveSpainToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;

  // 1. Cerca match tra le 50 province (e isole / plazas de soberanía)
  let foundProv: SpainProvDef | undefined;

  if (id.startsWith('ES')) {
    // Exact or prefix NUTS match
    foundProv = SPAIN_PROVINCES_CATALOG.find((p) => p.nuts === id || id.startsWith(p.nuts));
  }

  if (!foundProv) {
    // Match per token / normKey
    const normTokens = normKey.split('_').filter(Boolean);
    for (const p of SPAIN_PROVINCES_CATALOG) {
      if (p.keys.some((k) => normKey === k || normTokens.includes(k) || (k.length >= 5 && normKey.includes(k)))) {
        foundProv = p;
        break;
      }
    }
  }

  if (foundProv) {
    const p = foundProv;

    // Determinazione del controllore territoriale al tempo step
    let isRepTerritory = false;
    if (step === 0) {
      isRepTerritory = true;
    } else if (step === 1) {
      // Step 1 (Mar 1938): Madrid, Catalogna, Levante (Valencia, Alicante, Castellón), Murcia, La Mancha, Jaén/Almería, Menorca
      isRepTerritory =
        p.nuts.startsWith('ES3') ||
        p.nuts.startsWith('ES51') ||
        p.nuts === 'ES521' ||
        p.nuts === 'ES522' ||
        p.nuts === 'ES523' ||
        p.nuts === 'ES620' ||
        p.nuts === 'ES421' ||
        p.nuts === 'ES422' ||
        p.nuts === 'ES423' ||
        p.nuts === 'ES424' ||
        p.nuts === 'ES611' ||
        p.nuts === 'ES616' ||
        p.nuts === 'ES533';
    } else if (step === 2) {
      // Step 2 (Ott 1938): Castellón (ES522) conquistata da Franco; Catalogna isolata ma ancora SPR
      isRepTerritory =
        p.nuts.startsWith('ES3') ||
        p.nuts.startsWith('ES51') ||
        p.nuts === 'ES521' ||
        p.nuts === 'ES523' ||
        p.nuts === 'ES620' ||
        p.nuts === 'ES421' ||
        p.nuts === 'ES422' ||
        p.nuts === 'ES423' ||
        p.nuts === 'ES424' ||
        p.nuts === 'ES611' ||
        p.nuts === 'ES616' ||
        p.nuts === 'ES533';
    } else {
      // Step >= 3 (Mar 1939+): Tutte le province sono sotto lo Estado Español Franquista (SPA)
      isRepTerritory = false;
    }

    // Se l'owner passato è 'SPR' o 'SPA', rispettiamo la fazione richiesta, altrimenti usiamo il controllore territoriale
    const useRep = (owner === 'SPR') || (owner !== 'SPA' && isRepTerritory);

    if (step === 0) {
      return {
        name: p.name,
        adminTitle: p.repAdminTitle,
        note: p.repNote || 'Provincia metropolitana de la Segunda República Española (1931-1939).',
      };
    }

    if (step < 3) {
      if (useRep) {
        return {
          name: p.name,
          adminTitle: p.civilWarRepAdminTitle || p.repAdminTitle,
          note: p.civilWarRepNote || p.repNote || 'Bando Republicano durante la Guerra Civil Española.',
        };
      } else {
        return {
          name: p.name,
          adminTitle: p.civilWarNatAdminTitle || `Bando Nacional — España Nacional (${p.name})`,
          note: p.civilWarNatNote || 'Bando Nacional bajo el mando del general Francisco Franco.',
        };
      }
    }

    // Step >= 3: Spagna unificata franchista
    return {
      name: p.name,
      adminTitle: p.postAdminTitle || `Estado Español — Provincia de ${p.name} (Régimen Franquista)`,
      note: p.postNote || 'España de posguerra bajo el régimen dictatorial del general Francisco Franco.',
    };
  }

  // 2. Entità generiche (Spagna, Isole, Territori coloniali)
  if (normKey.includes('canarias') || normKey.includes('canary')) {
    if (step === 0) {
      return {
        name: 'Islas Canarias',
        adminTitle: 'Provincia de Canarias (Segunda República Española)',
        note: 'Archipiélago atlántico español dividido en las provincias de Santa Cruz de Tenerife y Las Palmas.',
      };
    }
    if (step < 3) {
      return {
        name: 'Islas Canarias',
        adminTitle: 'Bando Nacional — Capitanía General de Canarias',
        note: 'Controladas por el general Franco desde el 18 de julio de 1936 como punto de partida del Alzamiento.',
      };
    }
    return {
      name: 'Islas Canarias',
      adminTitle: 'Estado Español — Capitanía General de Canarias',
      note: 'Archipiélago canario bajo el régimen franquista.',
    };
  }

  if (normKey.includes('baleares') || normKey.includes('balearic')) {
    if (step === 0) {
      return {
        name: 'Islas Baleares',
        adminTitle: 'Provincia de Baleares (Segunda República Española)',
      };
    }
    if (step < 3) {
      return {
        name: 'Islas Baleares (Mallorca e Ibiza)',
        adminTitle: 'Bando Nacional — Base de la Aviación Legionaria Italiana',
        note: 'Mallorca e Ibiza bajo control nacionalista e italiano; Menorca fiel a la República hasta febrero de 1939.',
      };
    }
    return {
      name: 'Islas Baleares',
      adminTitle: 'Estado Español — Capitanía General de Baleares',
    };
  }

  if (normKey.includes('espana') || normKey.includes('spain')) {
    if (step === 0) {
      return {
        name: 'España',
        adminTitle: 'Segunda República Española (Presidencia de Manuel Azaña)',
        note: 'República democrática española proclamada el 14 de abril de 1931.',
      };
    }
    if (step < 3) {
      if (owner === 'SPR') {
        return {
          name: 'España Republicana',
          adminTitle: 'Segunda República Española (Frente Popular)',
          note: 'Zona republicana durante la Guerra Civil Española.',
        };
      }
      return {
        name: 'España Nacional',
        adminTitle: 'Bando Nacional (Generalísimo Francisco Franco)',
        note: 'Zona bajo control militar de las fuerzas nacionales sublevadas.',
      };
    }
    return {
      name: 'España',
      adminTitle: 'Estado Español (Régimen Franquista)',
      note: 'Régimen autoritario del general Francisco Franco (1939-1975).',
    };
  }

  return null;
}

export interface FranceDeptDef {
  nuts: string;
  name: string;
  cheflieu: string;
  keys: string[];
  partition1940: 'alsace_moselle' | 'belgium_command' | 'zone_occupee' | 'zone_libre' | 'dom_tom';
  repAdminTitle?: string;
  repNote?: string;
  armisticeName?: string;
  armisticeAdminTitle?: string;
  armisticeNote?: string;
}

export const FRANCE_DEPARTMENTS_CATALOG: FranceDeptDef[] = [
  // Île-de-France (FR101 - FR108)
  {
    nuts: 'FR101',
    name: 'Seine (Paris)',
    cheflieu: 'Paris',
    keys: ['paris', 'seine', 'ville_de_paris'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Seine (Paris)',
    repNote: 'Capitale de la République française et siège des institutions gouvernementales.',
    armisticeName: 'Seine (Paris)',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Hôtel Majestic, Paris)',
    armisticeNote: 'Ville déclarée ouverte le 10 juin 1940, occupée par la Wehrmacht le 14 juin 1940. Siège du commandement militaire allemand en France.',
  },
  {
    nuts: 'FR102',
    name: 'Seine-et-Marne (Melun)',
    cheflieu: 'Melun',
    keys: ['seine_et_marne', 'melun', 'fontainebleau', 'meaux'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de Seine-et-Marne (Melun)',
    repNote: 'Département d\'Île-de-France. Chef-lieu Melun.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
    armisticeNote: 'Département sous administration militaire allemande après l\'armistice de juin 1940.',
  },
  {
    nuts: 'FR103',
    name: 'Seine-et-Oise (Versailles)',
    cheflieu: 'Versailles',
    keys: ['yvelines', 'versailles', 'seine_et_oise'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de Seine-et-Oise (Versailles)',
    repNote: 'Département historique de Seine-et-Oise entourant Paris. Chef-lieu Versailles.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
    armisticeNote: 'Château de Versailles et région parisienne ouest sous occupation militaire allemande.',
  },
  {
    nuts: 'FR104',
    name: 'Seine-et-Oise (Corbeil / Évry)',
    cheflieu: 'Corbeil',
    keys: ['essonne', 'corbeil', 'evry', 'etampes'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de Seine-et-Oise (Corbeil)',
    repNote: 'Partie méridionale du département historique de Seine-et-Oise.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FR105',
    name: 'Seine (Nanterre / Boulogne-Billancourt)',
    cheflieu: 'Nanterre',
    keys: ['hauts_de_seine', 'nanterre', 'boulogne_billancourt', 'neuilly_sur_seine'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Seine (Banlieue Ouest)',
    repNote: 'Bassin industriel de la proche banlieue parisienne (usines automobiles Renault, aviation).',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
    armisticeNote: 'Grand pôle industriel de l\'agglomération parisienne placé sous contrôle et réquisition militaire allemande.',
  },
  {
    nuts: 'FR106',
    name: 'Seine (Saint-Denis / Bobigny)',
    cheflieu: 'Bobigny',
    keys: ['seine_saint_denis', 'saint_denis', 'bobigny', 'aubervilliers'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Seine (Banlieue Nord)',
    repNote: 'Ceinture rouge industrielle et carrefour ferroviaire de la Plaine Saint-Denis.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FR107',
    name: 'Seine (Créteil / Vincennes)',
    cheflieu: 'Créteil',
    keys: ['val_de_marne', 'creteil', 'vincennes', 'saint_maur'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Seine (Banlieue Sud-Est)',
    repNote: 'Banlieue sud-est de Paris et forteresse de Vincennes (quartier général du général Maurice Gamelin en 1939-1940).',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FR108',
    name: 'Seine-et-Oise (Pontoise / Argenteuil)',
    cheflieu: 'Pontoise',
    keys: ['val_d_oise', 'val_doise', 'pontoise', 'argenteuil'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de Seine-et-Oise (Pontoise)',
    repNote: 'Partie septentrionale du département de Seine-et-Oise (Vexin français et vallée de l\'Oise).',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },

  // Centre-Val de Loire (FRB01 - FRB06)
  {
    nuts: 'FRB01',
    name: 'Cher (Bourges)',
    cheflieu: 'Bourges',
    keys: ['cher', 'bourges', 'vierzon'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département du Cher (Bourges)',
    repNote: 'Important centre d\'armement national (Manufacture d\'armes de Bourges, usines d\'aviation).',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Ligne de démarcation)',
    armisticeNote: 'Département traversé par la ligne de démarcation : Bourges et Vierzon en zone occupée, Saint-Amand-Montrond en zone libre.',
  },
  {
    nuts: 'FRB02',
    name: 'Eure-et-Loir (Chartres)',
    cheflieu: 'Chartres',
    keys: ['eure_et_loir', 'chartres', 'dreux', 'chateaudun'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département d\'Eure-et-Loir (Chartres)',
    repNote: 'Grenier à blé de la Beauce. Préfecture dirigée par Jean Moulin en juin 1940.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
    armisticeNote: 'Le préfet Jean Moulin y résiste héroïquement aux exigences allemandes en juin 1940 avant d\'être révoqué par Vichy.',
  },
  {
    nuts: 'FRB03',
    name: 'Indre (Châteauroux)',
    cheflieu: 'Châteauroux',
    keys: ['indre', 'chateauroux', 'issoudun'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de l\'Indre (Châteauroux)',
    repNote: 'Région du Berry. Chef-lieu Châteauroux.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FRB04',
    name: 'Indre-et-Loire (Tours)',
    cheflieu: 'Tours',
    keys: ['indre_et_loire', 'tours', 'chinon', 'loches'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département d\'Indre-et-Loire (Tours)',
    repNote: 'Châteaux de la Loire. Siège temporaire du gouvernement français du 10 au 14 juin 1940.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
    armisticeNote: 'Département traversé par la ligne de démarcation au Cher ; Tours sous occupation de la Wehrmacht.',
  },
  {
    nuts: 'FRB05',
    name: 'Loir-et-Cher (Blois)',
    cheflieu: 'Blois',
    keys: ['loir_et_cher', 'blois', 'romorantin', 'vendome'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de Loir-et-Cher (Blois)',
    repNote: 'Vallée de la Loire et Sologne. Chef-lieu Blois.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FRB06',
    name: 'Loiret (Orléans)',
    cheflieu: 'Orléans',
    keys: ['loiret', 'orleans', 'montargis', 'gien'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département du Loiret (Orléans)',
    repNote: 'Ponts stratégiques sur la Loire, durement bombardés en mai-juin 1940.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },

  // Bourgogne-Franche-Comté (FRC11 - FRC14, FRC21 - FRC24)
  {
    nuts: 'FRC11',
    name: 'Côte-d\'Or (Dijon)',
    cheflieu: 'Dijon',
    keys: ['cote_d_or', 'cote_dor', 'dijon', 'beaune'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Côte-d\'Or (Dijon)',
    repNote: 'Cœur historique de la Bourgogne et carrefour ferroviaire stratégique.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FRC12',
    name: 'Nièvre (Nevers)',
    cheflieu: 'Nevers',
    keys: ['nievre', 'nevers', 'cosne'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Nièvre (Nevers)',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FRC13',
    name: 'Saône-et-Loire (Mâcon)',
    cheflieu: 'Mâcon',
    keys: ['saone_et_loire', 'macon', 'chalon_sur_saone', 'autun', 'le_creusot'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de Saône-et-Loire (Mâcon)',
    repNote: 'Bassin industriel du Creusot (aciéries et usines d\'armement Schneider).',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Ligne de démarcation)',
    armisticeNote: 'Département coupé par la ligne de démarcation ; usines sidérurgiques Schneider du Creusot réquisitionnées par l\'occupant.',
  },
  {
    nuts: 'FRC14',
    name: 'Yonne (Auxerre)',
    cheflieu: 'Auxerre',
    keys: ['yonne', 'auxerre', 'sens'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de l\'Yonne (Auxerre)',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FRC21',
    name: 'Doubs (Besançon)',
    cheflieu: 'Besançon',
    keys: ['doubs', 'besancon', 'montbeliard', 'pontarlier'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département du Doubs (Besançon)',
    repNote: 'Frontière suisse, citadelle de Vauban à Besançon et forteresses du Jura.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)',
    armisticeNote: 'Inclus dans la Zone réservée (Zone interdite du Nord-Est), coupée du reste de la France pour colonisation agricole projetée par le Reich.',
  },
  {
    nuts: 'FRC22',
    name: 'Jura (Lons-le-Saunier)',
    cheflieu: 'Lons-le-Saunier',
    keys: ['jura', 'lons_le_saunier', 'dole', 'saint_claude'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département du Jura (Lons-le-Saunier)',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)',
  },
  {
    nuts: 'FRC23',
    name: 'Haute-Saône (Vesoul)',
    cheflieu: 'Vesoul',
    keys: ['haute_saone', 'vesoul', 'lure'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Haute-Saône (Vesoul)',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)',
  },
  {
    nuts: 'FRC24',
    name: 'Territoire de Belfort (Belfort)',
    cheflieu: 'Belfort',
    keys: ['territoire_de_belfort', 'belfort', 'trouee_de_belfort'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Territoire de Belfort (Trouée de Belfort)',
    repNote: 'Verrou stratégique de la trouée de Belfort entre les Vosges et le Jura.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)',
    armisticeNote: 'Placé en Zone réservée du Nord-Est sous surveillance militaire stricte; verrou stratégique de la trouée de Belfort entre les Vosges et le Jura tenu par la Wehrmacht.',
  },

  // Normandie (FRD11 - FRD13, FRD21, FRD22)
  {
    nuts: 'FRD11',
    name: 'Calvados (Caen)',
    cheflieu: 'Caen',
    keys: ['calvados', 'caen', 'bayeux', 'lisieux'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département du Calvados (Caen)',
    repNote: 'Plaines et côtes normandes de la Manche. Chef-lieu Caen.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Côte de la Manche)',
    armisticeNote: 'Bande côtière placée en zone d\'opérations militaires pour la préparation du débarquement en Angleterre (Opération Seelöwe).',
  },
  {
    nuts: 'FRD12',
    name: 'Manche (Saint-Lô / Cherbourg)',
    cheflieu: 'Saint-Lô',
    keys: ['manche', 'saint_lo', 'cherbourg', 'avranches', 'cotentin'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Manche (Cherbourg)',
    repNote: 'Péninsule du Cotentin et grand port militaire et arsenal de Cherbourg.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Kriegsmarine Cherbourg)',
    armisticeNote: 'Arsenal et rade de Cherbourg occupés et fortifiés par la Kriegsmarine allemande; base stratégique de première ligne pour vedettes lance-torpilles et U-Boote sur la Manche.',
  },
  {
    nuts: 'FRD13',
    name: 'Orne (Alençon)',
    cheflieu: 'Alençon',
    keys: ['orne', 'alencon', 'argentan'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de l\'Orne (Alençon)',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FRD21',
    name: 'Eure (Évreux)',
    cheflieu: 'Évreux',
    keys: ['eure', 'evreux', 'les_andelys', 'vernon'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de l\'Eure (Évreux)',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FRD22',
    name: 'Seine-Inférieure (Rouen / Le Havre)',
    cheflieu: 'Rouen',
    keys: ['seine_maritime', 'seine_inferieure', 'rouen', 'le_havre', 'dieppe'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Seine-Inférieure (Rouen)',
    repNote: 'Grand port transatlantique du Havre, estuaire de la Seine et port fluvial de Rouen. (Renommé Seine-Maritime en 1955).',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Kriegsmarine Le Havre)',
    armisticeNote: 'Ports du Havre et de Dieppe fortifiés par l\'occupant allemand face aux côtes britanniques.',
  },

  // Hauts-de-France (FRE11, FRE12, FRE21 - FRE23)
  {
    nuts: 'FRE11',
    name: 'Nord (Lille / Dunkerque)',
    cheflieu: 'Lille',
    keys: ['nord', 'lille', 'dunkerque', 'douai', 'valenciennes'],
    partition1940: 'belgium_command',
    repAdminTitle: 'Troisième République française — Département du Nord (Lille)',
    repNote: 'Grand bassin minier, sidérurgie et port stratégique de Dunkerque (évacuation alliée Dynamo, mai-juin 1940).',
    armisticeName: 'Nord (Lille / Dunkerque)',
    armisticeAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich (Alexander von Falkenhausen, Bruxelles)',
    armisticeNote: 'Département détaché du commandement de Paris et rattaché à l\'administration militaire allemande de Bruxelles (Zone interdite).',
  },
  {
    nuts: 'FRE12',
    name: 'Pas-de-Calais (Arras / Calais)',
    cheflieu: 'Arras',
    keys: ['pas_de_calais', 'arras', 'calais', 'boulogne_sur_mer', 'lens'],
    partition1940: 'belgium_command',
    repAdminTitle: 'Troisième République française — Département du Pas-de-Calais (Arras)',
    repNote: 'Détroit du Pas-de-Calais et ports de la Manche (Calais, Boulogne). Ligne côtière la plus proche de l\'Angleterre.',
    armisticeName: 'Pas-de-Calais (Arras / Calais)',
    armisticeAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich (Alexander von Falkenhausen, Bruxelles)',
    armisticeNote: 'Rattaché au commandement militaire allemand de Bruxelles ; base de déploiement des batteries côtières lourdes face à Douvres.',
  },
  {
    nuts: 'FRE21',
    name: 'Aisne (Laon)',
    cheflieu: 'Laon',
    keys: ['aisne', 'laon', 'saint_quentin', 'soissons'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de l\'Aisne (Laon)',
    repNote: 'Chemin des Dames et cours de l\'Aisne, théâtre de violents combats en mai-juin 1940.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)',
    armisticeNote: 'Inclus dans la Zone réservée (Zone interdite du Nord-Est) sous autorité militaire allemande; secteur de Laon et du Chemin des Dames sous contrôle strict.',
  },
  {
    nuts: 'FRE22',
    name: 'Oise (Beauvais)',
    cheflieu: 'Beauvais',
    keys: ['oise', 'beauvais', 'compiegne', 'senlis'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de l\'Oise (Beauvais)',
    repNote: 'Clairière de Rethondes en forêt de Compiègne, lieu de la signature des armistices du 11 novembre 1918 et du 22 juin 1940.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
    armisticeNote: 'Lieu de la signature de l\'armistice franco-allemand le 22 juin 1940 dans le wagon historique de Rethondes.',
  },
  {
    nuts: 'FRE23',
    name: 'Somme (Amiens)',
    cheflieu: 'Amiens',
    keys: ['somme', 'amiens', 'abbeville'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Somme (Amiens)',
    repNote: 'Ligne de front Weygand sur la Somme (mai-juin 1940) et cathédrale d\'Amiens.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)',
    armisticeNote: 'Partie septentrionale incluse dans la Zone réservée du Nord-Est; secteur stratégique de la Somme et d\'Amiens placé sous administration militaire d\'occupation.',
  },

  // Grand Est (FRF11, FRF12, FRF21 - FRF24, FRF31 - FRF34)
  {
    nuts: 'FRF11',
    name: 'Bas-Rhin (Strasbourg)',
    cheflieu: 'Strasbourg',
    keys: ['bas_rhin', 'strasbourg', 'haguenau', 'saverne'],
    partition1940: 'alsace_moselle',
    repAdminTitle: 'Troisième République française — Département du Bas-Rhin (Strasbourg)',
    repNote: 'Alsace du Nord, secteur fortifié du Bas-Rhin de la Ligne Maginot. Population civile évacuée vers le Sud-Ouest en septembre 1939.',
    armisticeName: 'Bas-Rhin (Straßburg)',
    armisticeAdminTitle: 'CdZ-Gebiet Elsass — Gau Baden-Elsass (Gauleiter Robert Wagner)',
    armisticeNote: 'Territoire annexé de facto au Reich allemand le 22 juin 1940. Germanisation et nazification intégrales (Chef der Zivilverwaltung).',
  },
  {
    nuts: 'FRF12',
    name: 'Haut-Rhin (Colmar / Mulhouse)',
    cheflieu: 'Colmar',
    keys: ['haut_rhin', 'colmar', 'mulhouse', 'altkirch'],
    partition1940: 'alsace_moselle',
    repAdminTitle: 'Troisième République française — Département du Haut-Rhin (Colmar)',
    repNote: 'Haute-Alsace, secteur fortifié d\'Altkirch et de Colmar de la Ligne Maginot.',
    armisticeName: 'Haut-Rhin (Kolmar / Mülhausen)',
    armisticeAdminTitle: 'CdZ-Gebiet Elsass — Gau Baden-Elsass (Gauleiter Robert Wagner)',
    armisticeNote: 'Territoire annexé de facto au Reich allemand le 22 juin 1940 (CdZ-Gebiet Elsass).',
  },
  {
    nuts: 'FRF21',
    name: 'Ardennes (Mézières / Charleville)',
    cheflieu: 'Mézières',
    keys: ['ardennes', 'mezieres', 'charleville', 'sedan'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département des Ardennes (Mézières)',
    repNote: 'Massif des Ardennes et percée de Sedan le 13 mai 1940 par les Panzers de Guderian.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)',
    armisticeNote: 'Département entièrement classé en Zone réservée (Zone interdite du Nord-Est) sous tutelle agricole de l\'Ostland.',
  },
  {
    nuts: 'FRF22',
    name: 'Aube (Troyes)',
    cheflieu: 'Troyes',
    keys: ['aube', 'troyes'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de l\'Aube (Troyes)',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FRF23',
    name: 'Marne (Châlons-sur-Marne / Reims)',
    cheflieu: 'Châlons-sur-Marne',
    keys: ['marne', 'chalons_sur_marne', 'chalons_en_champagne', 'reims', 'epernay'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Marne (Châlons-sur-Marne)',
    repNote: 'Vignoble de Champagne, cathédrale des sacres de Reims et camps militaires de Châlons-sur-Marne.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FRF24',
    name: 'Haute-Marne (Chaumont)',
    cheflieu: 'Chaumont',
    keys: ['haute_marne', 'chaumont', 'saint_dizier', 'langres'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Haute-Marne (Chaumont)',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)',
  },
  {
    nuts: 'FRF31',
    name: 'Meurthe-et-Moselle (Nancy)',
    cheflieu: 'Nancy',
    keys: ['meurthe_et_moselle', 'nancy', 'toul', 'luneville', 'briey'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de Meurthe-et-Moselle (Nancy)',
    repNote: 'Lorraine restée française en 1871, bassin sidérurgique de Briey et forteresse de Toul.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)',
    armisticeNote: 'Inclus dans la Zone réservée (Zone interdite du Nord-Est), coupée de Paris; centre industriel et administratif lorrain de Nancy sous strict contrôle militaire.',
  },
  {
    nuts: 'FRF32',
    name: 'Meuse (Bar-le-Duc / Verdun)',
    cheflieu: 'Bar-le-Duc',
    keys: ['meuse', 'bar_le_duc', 'verdun'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Meuse (Bar-le-Duc)',
    repNote: 'Champs de bataille de Verdun et secteur fortifié de Montmédy (Ligne Maginot).',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)',
    armisticeNote: 'Inclus dans la Zone réservée du Nord-Est sous commandement militaire allemand; secteur de Bar-le-Duc et de la forteresse de Verdun gardant la frontière orientale.',
  },
  {
    nuts: 'FRF33',
    name: 'Moselle (Metz)',
    cheflieu: 'Metz',
    keys: ['moselle', 'metz', 'thionville', 'sarreguemines'],
    partition1940: 'alsace_moselle',
    repAdminTitle: 'Troisième République française — Département de la Moselle (Metz)',
    repNote: 'Lorraine mosellane, puissants ouvrages fortifiés de la Ligne Maginot (Hackenberg, Simserhof).',
    armisticeName: 'Moselle (Metz)',
    armisticeAdminTitle: 'CdZ-Gebiet Lothringen — Gau Westmark (Gauleiter Josef Bürckel)',
    armisticeNote: 'Département annexé de facto au Troisième Reich (rattaché au Gau Westmark avec la Sarre et le Palatinat). Expulsion des francophones et germanisation forcée.',
  },
  {
    nuts: 'FRF34',
    name: 'Vosges (Épinal)',
    cheflieu: 'Épinal',
    keys: ['vosges', 'epinal', 'saint_die'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département des Vosges (Épinal)',
    repNote: 'Massif des Vosges et secteur fortifié des Vosges.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)',
  },

  // Pays de la Loire (FRG01 - FRG05)
  {
    nuts: 'FRG01',
    name: 'Loire-Inférieure (Nantes)',
    cheflieu: 'Nantes',
    keys: ['loire_atlantique', 'loire_inferieure', 'nantes', 'saint_nazaire'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Loire-Inférieure (Nantes)',
    repNote: 'Estuaire de la Loire et chantiers navals de Saint-Nazaire (cuirassé Jean Bart évacué le 19 juin 1940). (Renommé Loire-Atlantique en 1957).',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Kriegsmarine Saint-Nazaire)',
    armisticeNote: 'Saint-Nazaire devient une base stratégique majeure de sous-marins U-Boot de la Kriegsmarine protégée par d\'immenses bunkers.',
  },
  {
    nuts: 'FRG02',
    name: 'Maine-et-Loire (Angers)',
    cheflieu: 'Angers',
    keys: ['maine_et_loire', 'angers', 'cholet', 'saumur'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de Maine-et-Loire (Angers)',
    repNote: 'École de cavalerie de Saumur (résistance héroïque des Cadets de Saumur sur la Loire, juin 1940). Siège du gouvernement polonais en exil de 1939 à juin 1940.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FRG03',
    name: 'Mayenne (Laval)',
    cheflieu: 'Laval',
    keys: ['mayenne', 'laval'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Mayenne (Laval)',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FRG04',
    name: 'Sarthe (Le Mans)',
    cheflieu: 'Le Mans',
    keys: ['sarthe', 'le_mans', 'la_fleche'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Sarthe (Le Mans)',
    repNote: 'Important nœud ferroviaire de l\'Ouest.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FRG05',
    name: 'Vendée (La Roche-sur-Yon)',
    cheflieu: 'La Roche-sur-Yon',
    keys: ['vendee', 'la_roche_sur_yon', 'les_sables_d_olonne'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Vendée (La Roche-sur-Yon)',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },

  // Bretagne (FRH01 - FRH04)
  {
    nuts: 'FRH01',
    name: 'Côtes-du-Nord (Saint-Brieuc)',
    cheflieu: 'Saint-Brieuc',
    keys: ['cotes_d_armor', 'cotes_darmor', 'cotes_du_nord', 'saint_brieuc', 'dinan', 'lannion'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département des Côtes-du-Nord (Saint-Brieuc)',
    repNote: 'Bretagne septentrionale et côte d\'Émeraude. (Renommé Côtes-d\'Armor en 1990).',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FRH02',
    name: 'Finistère (Brest / Quimper)',
    cheflieu: 'Quimper',
    keys: ['finistere', 'quimper', 'brest', 'morlaix'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département du Finistère (Brest)',
    repNote: 'Grand port de guerre de l\'Atlantique, arsenal de Brest et base navale principale de la Marine Nationale.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Kriegsmarine Brest)',
    armisticeNote: 'Base navale de Brest réquisitionnée par la Kriegsmarine pour les croiseurs lourds et la 1re et 9e flottilles de U-Boote.',
  },
  {
    nuts: 'FRH03',
    name: 'Ille-et-Vilaine (Rennes)',
    cheflieu: 'Rennes',
    keys: ['ille_et_vilaine', 'rennes', 'saint_malo', 'fougeres'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département d\'Ille-et-Vilaine (Rennes)',
    repNote: 'Capitale historique de la Bretagne et port fortifié de Saint-Malo.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FRH04',
    name: 'Morbihan (Vannes / Lorient)',
    cheflieu: 'Vannes',
    keys: ['morbihan', 'vannes', 'lorient'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département du Morbihan (Vannes)',
    repNote: 'Arsenal naval de Lorient et golfe du Morbihan.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Kriegsmarine Lorient)',
    armisticeNote: 'Lorient devient le quartier général de l\'amiral Karl Dönitz (Befehlshaber der U-Boote) et la plus grande base de sous-marins de l\'Atlantique.',
  },

  // Nouvelle-Aquitaine (FRI11 - FRI15, FRI21 - FRI23, FRI31 - FRI34)
  {
    nuts: 'FRI11',
    name: 'Dordogne (Périgueux)',
    cheflieu: 'Périgueux',
    keys: ['dordogne', 'perigueux', 'bergerac', 'sarlat'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de la Dordogne (Périgueux)',
    repNote: 'Région du Périgord. Chef-lieu Périgueux.',
    armisticeAdminTitle: 'État français — Département de la Dordogne (Zone libre)',
    armisticeNote: 'Département de la Zone libre placé sous l\'autorité du régime de Vichy.',
  },
  {
    nuts: 'FRI12',
    name: 'Gironde (Bordeaux)',
    cheflieu: 'Bordeaux',
    keys: ['gironde', 'bordeaux', 'arcachon', 'libourne'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Gironde (Bordeaux)',
    repNote: 'Siège du gouvernement français replié du 14 au 29 juin 1940. Lieu de la démission de Paul Reynaud et constitution du cabinet Pétain.',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Base navale de Bordeaux)',
    armisticeNote: 'Grand port atlantique sous occupation allemande, base navale pour les sous-marins italiens (BETASOM) et allemands.',
  },
  {
    nuts: 'FRI13',
    name: 'Landes (Mont-de-Marsan)',
    cheflieu: 'Mont-de-Marsan',
    keys: ['landes', 'mont_de_marsan', 'dax'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département des Landes (Mont-de-Marsan)',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FRI14',
    name: 'Lot-et-Garonne (Agen)',
    cheflieu: 'Agen',
    keys: ['lot_et_garonne', 'agen', 'marmande', 'villeneuve_sur_lot'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de Lot-et-Garonne (Agen)',
    armisticeAdminTitle: 'État français — Département de Lot-et-Garonne (Zone libre)',
  },
  {
    nuts: 'FRI15',
    name: 'Basses-Pyrénées (Pau / Bayonne)',
    cheflieu: 'Pau',
    keys: ['pyrenees_atlantiques', 'basses_pyrenees', 'pau', 'bayonne', 'biarritz', 'hendaye'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département des Basses-Pyrénées (Pau)',
    repNote: 'Béarn et Pays basque français. Frontière espagnole à Hendaye. (Renommé Pyrénées-Atlantiques en 1969).',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Frontière d\'Hendaye)',
    armisticeNote: 'Contrôle militaire allemand du littoral basque et de la frontière espagnole (gare frontière d\'Hendaye).',
  },
  {
    nuts: 'FRI21',
    name: 'Corrèze (Tulle)',
    cheflieu: 'Tulle',
    keys: ['correze', 'tulle', 'brive_la_gaillarde', 'brive', 'ussel'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de la Corrèze (Tulle)',
    repNote: 'Manufacture d\'armes de Tulle et région du Limousin.',
    armisticeAdminTitle: 'État français — Département de la Corrèze (Zone libre)',
  },
  {
    nuts: 'FRI22',
    name: 'Creuse (Guéret)',
    cheflieu: 'Guéret',
    keys: ['creuse', 'gueret', 'aubusson'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de la Creuse (Guéret)',
    armisticeAdminTitle: 'État français — Département de la Creuse (Zone libre)',
  },
  {
    nuts: 'FRI23',
    name: 'Haute-Vienne (Limoges)',
    cheflieu: 'Limoges',
    keys: ['haute_vienne', 'limoges', 'bellac', 'rochechouart'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de la Haute-Vienne (Limoges)',
    repNote: 'Capitale limousine de la porcelaine et grand carrefour ferroviaire.',
    armisticeAdminTitle: 'État français — Département de la Haute-Vienne (Limoges, Zone libre)',
  },
  {
    nuts: 'FRI31',
    name: 'Charente (Angoulême)',
    cheflieu: 'Angoulême',
    keys: ['charente', 'angouleme', 'cognac'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Charente (Angoulême)',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FRI32',
    name: 'Charente-Inférieure (La Rochelle)',
    cheflieu: 'La Rochelle',
    keys: ['charente_maritime', 'charente_inferieure', 'la_rochelle', 'rochefort', 'saintes'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Charente-Inférieure (La Rochelle)',
    repNote: 'Port atlantique de La Rochelle-Pallice et arsenal de Rochefort. (Renommé Charente-Maritime le 4 septembre 1941).',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Kriegsmarine La Pallice)',
    armisticeNote: 'Port de La Rochelle-La Pallice réquisitionné par la Kriegsmarine pour la construction d\'une imposante base de sous-marins.',
  },
  {
    nuts: 'FRI33',
    name: 'Deux-Sèvres (Niort)',
    cheflieu: 'Niort',
    keys: ['deux_sevres', 'niort', 'parthenay'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département des Deux-Sèvres (Niort)',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },
  {
    nuts: 'FRI34',
    name: 'Vienne (Poitiers)',
    cheflieu: 'Poitiers',
    keys: ['vienne', 'poitiers', 'chatellerault'],
    partition1940: 'zone_occupee',
    repAdminTitle: 'Troisième République française — Département de la Vienne (Poitiers)',
    repNote: 'Manufacture d\'armes de Châtellerault (fusils-mitrailleurs 24/29).',
    armisticeAdminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich',
  },

  // Occitanie (FRJ11 - FRJ15, FRJ21 - FRJ28) - All 13 Zone libre
  {
    nuts: 'FRJ11',
    name: 'Aude (Carcassonne)',
    cheflieu: 'Carcassonne',
    keys: ['aude', 'carcassonne', 'narbonne'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de l\'Aude (Carcassonne)',
    armisticeAdminTitle: 'État français — Département de l\'Aude (Zone libre)',
  },
  {
    nuts: 'FRJ12',
    name: 'Gard (Nîmes)',
    cheflieu: 'Nîmes',
    keys: ['gard', 'nimes', 'ales'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département du Gard (Nîmes)',
    armisticeAdminTitle: 'État français — Département du Gard (Zone libre)',
  },
  {
    nuts: 'FRJ13',
    name: 'Hérault (Montpellier)',
    cheflieu: 'Montpellier',
    keys: ['herault', 'montpellier', 'beziers', 'sete'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de l\'Hérault (Montpellier)',
    repNote: 'Faculté de médecine historique de Montpellier et port marchand de Sète.',
    armisticeAdminTitle: 'État français — Département de l\'Hérault (Montpellier, Zone libre)',
  },
  {
    nuts: 'FRJ14',
    name: 'Lozère (Mende)',
    cheflieu: 'Mende',
    keys: ['lozere', 'mende'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de la Lozère (Mende)',
    armisticeAdminTitle: 'État français — Département de la Lozère (Zone libre)',
  },
  {
    nuts: 'FRJ15',
    name: 'Pyrénées-Orientales (Perpignan)',
    cheflieu: 'Perpignan',
    keys: ['pyrenees_orientales', 'perpignan', 'cerbere', 'prades'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département des Pyrénées-Orientales (Perpignan)',
    repNote: 'Roussillon et frontière espagnole à Cerbère. Camps d\'internement des réfugiés républicains espagnols (Argelès-sur-Mer, Rivesaltes).',
    armisticeAdminTitle: 'État français — Département des Pyrénées-Orientales (Perpignan, Zone libre)',
    armisticeNote: 'Frontière des Pyrénées catalanes face à l\'Espagne franquiste en zone libre.',
  },
  {
    nuts: 'FRJ21',
    name: 'Ariège (Foix)',
    cheflieu: 'Foix',
    keys: ['ariege', 'foix', 'pamiers'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de l\'Ariège (Foix)',
    armisticeAdminTitle: 'État français — Département de l\'Ariège (Zone libre)',
  },
  {
    nuts: 'FRJ22',
    name: 'Aveyron (Rodez)',
    cheflieu: 'Rodez',
    keys: ['aveyron', 'rodez', 'millau'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de l\'Aveyron (Rodez)',
    armisticeAdminTitle: 'État français — Département de l\'Aveyron (Zone libre)',
  },
  {
    nuts: 'FRJ23',
    name: 'Haute-Garonne (Toulouse)',
    cheflieu: 'Toulouse',
    keys: ['haute_garonne', 'toulouse', 'muret', 'saint_gaudens'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de la Haute-Garonne (Toulouse)',
    repNote: 'Métropole du Sud-Ouest, usines de la Société Nationale des Constructions Aéronautiques du Midi (SNCAM).',
    armisticeAdminTitle: 'État français — Département de la Haute-Garonne (Toulouse, Zone libre)',
    armisticeNote: 'Centre universitaire, industriel et refuge de premier plan de la zone libre.',
  },
  {
    nuts: 'FRJ24',
    name: 'Gers (Auch)',
    cheflieu: 'Auch',
    keys: ['gers', 'auch', 'condom'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département du Gers (Auch)',
    armisticeAdminTitle: 'État français — Département du Gers (Zone libre)',
  },
  {
    nuts: 'FRJ25',
    name: 'Lot (Cahors)',
    cheflieu: 'Cahors',
    keys: ['lot', 'cahors', 'figeac'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département du Lot (Cahors)',
    armisticeAdminTitle: 'État français — Département du Lot (Zone libre)',
  },
  {
    nuts: 'FRJ26',
    name: 'Hautes-Pyrénées (Tarbes)',
    cheflieu: 'Tarbes',
    keys: ['hautes_pyrenees', 'tarbes', 'lourdes'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département des Hautes-Pyrénées (Tarbes)',
    repNote: 'Arsenal d\'artillerie de Tarbes et sanctuaire de Lourdes.',
    armisticeAdminTitle: 'État français — Département des Hautes-Pyrénées (Zone libre)',
  },
  {
    nuts: 'FRJ27',
    name: 'Tarn (Albi)',
    cheflieu: 'Albi',
    keys: ['tarn', 'albi', 'castres'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département du Tarn (Albi)',
    armisticeAdminTitle: 'État français — Département du Tarn (Zone libre)',
  },
  {
    nuts: 'FRJ28',
    name: 'Tarn-et-Garonne (Montauban)',
    cheflieu: 'Montauban',
    keys: ['tarn_et_garonne', 'montauban', 'castelsarrasin'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de Tarn-et-Garonne (Montauban)',
    armisticeAdminTitle: 'État français — Département de Tarn-et-Garonne (Zone libre)',
  },

  // Auvergne-Rhône-Alpes (FRK11 - FRK14, FRK21 - FRK28) - All 12 Zone libre
  {
    nuts: 'FRK11',
    name: 'Allier (Vichy / Moulins)',
    cheflieu: 'Moulins',
    keys: ['allier', 'vichy', 'moulins', 'montlucon'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de l\'Allier (Moulins)',
    repNote: 'Région du Bourbonnais, ville thermale de Vichy et chef-lieu historique Moulins.',
    armisticeName: 'Allier (Vichy)',
    armisticeAdminTitle: 'État français — Vichy (Siège du gouvernement du Maréchal Pétain)',
    armisticeNote: 'Station thermale choisie comme capitale du gouvernement de l\'État français en juillet 1940 (Hôtel du Parc). Vote des pleins pouvoirs constituants à Pétain à l\'Opéra de Vichy le 10 juillet 1940.',
  },
  {
    nuts: 'FRK12',
    name: 'Cantal (Aurillac)',
    cheflieu: 'Aurillac',
    keys: ['cantal', 'aurillac', 'saint_flour'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département du Cantal (Aurillac)',
    armisticeAdminTitle: 'État français — Département du Cantal (Zone libre)',
  },
  {
    nuts: 'FRK13',
    name: 'Haute-Loire (Le Puy-en-Velay)',
    cheflieu: 'Le Puy-en-Velay',
    keys: ['haute_loire', 'le_puy_en_velay', 'le_puy', 'brioude'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de la Haute-Loire (Le Puy)',
    armisticeAdminTitle: 'État français — Département de la Haute-Loire (Zone libre)',
  },
  {
    nuts: 'FRK14',
    name: 'Puy-de-Dôme (Clermont-Ferrand)',
    cheflieu: 'Clermont-Ferrand',
    keys: ['puy_de_dome', 'clermont_ferrand', 'riom', 'issoire'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département du Puy-de-Dôme (Clermont-Ferrand)',
    repNote: 'Usines pneumatiques Michelin et université de Strasbourg repliée à Clermont-Ferrand en 1939-1940.',
    armisticeAdminTitle: 'État français — Département du Puy-de-Dôme (Zone libre)',
    armisticeNote: 'Clermont-Ferrand et cour d\'appel de Riom (lieu du futur procès de Riom intenté par Vichy contre les responsables républicains de 1940).',
  },
  {
    nuts: 'FRK21',
    name: 'Ain (Bourg-en-Bresse)',
    cheflieu: 'Bourg-en-Bresse',
    keys: ['ain', 'bourg_en_bresse', 'belley', 'gex'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de l\'Ain (Bourg-en-Bresse)',
    armisticeAdminTitle: 'État français — Département de l\'Ain (Zone libre)',
  },
  {
    nuts: 'FRK22',
    name: 'Ardèche (Privas)',
    cheflieu: 'Privas',
    keys: ['ardeche', 'privas', 'tournon'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de l\'Ardèche (Privas)',
    armisticeAdminTitle: 'État français — Département de l\'Ardèche (Zone libre)',
  },
  {
    nuts: 'FRK23',
    name: 'Drôme (Valence)',
    cheflieu: 'Valence',
    keys: ['drome', 'valence', 'montelimar', 'die'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de la Drôme (Valence)',
    armisticeAdminTitle: 'État français — Département de la Drôme (Zone libre)',
  },
  {
    nuts: 'FRK24',
    name: 'Isère (Grenoble)',
    cheflieu: 'Grenoble',
    keys: ['isere', 'grenoble', 'vienne'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de l\'Isère (Grenoble)',
    repNote: 'Capitale des Alpes françaises, place forte militaire et centre scientifique.',
    armisticeAdminTitle: 'État français — Département de l\'Isère (Grenoble, Zone libre)',
    armisticeNote: 'Secteur alpin sous contrôle des troupes de montagne de l\'Armée d\'armistice.',
  },
  {
    nuts: 'FRK25',
    name: 'Loire (Saint-Étienne)',
    cheflieu: 'Saint-Étienne',
    keys: ['loire', 'saint_etienne', 'roanne', 'montbrison'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de la Loire (Saint-Étienne)',
    repNote: 'Manufacture nationale d\'armes de Saint-Étienne (MAS) et bassin houiller stéphanois.',
    armisticeAdminTitle: 'État français — Département de la Loire (Saint-Étienne, Zone libre)',
  },
  {
    nuts: 'FRK26',
    name: 'Rhône (Lyon)',
    cheflieu: 'Lyon',
    keys: ['rhone', 'lyon', 'villefranche_sur_saone'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département du Rhône (Lyon)',
    repNote: 'Deuxième métropole de France, grande capitale de la soierie, de l\'industrie chimique et automobile.',
    armisticeName: 'Rhône (Lyon)',
    armisticeAdminTitle: 'État français — Département du Rhône (Lyon, capitale de la Zone libre)',
    armisticeNote: 'Capitale économique et administrative de la zone libre, plaque tournante des liaisons de l\'État français.',
  },
  {
    nuts: 'FRK27',
    name: 'Savoie (Chambéry)',
    cheflieu: 'Chambéry',
    keys: ['savoie', 'chambery', 'albertville', 'saint_jean_de_maurienne', 'maurienne'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de la Savoie (Chambéry)',
    repNote: 'Secteur fortifié de la Savoie (Ligne Maginot alpine), résistance victorieuse de l\'Armée des Alpes du général Olry contre l\'offensive italienne de juin 1940.',
    armisticeAdminTitle: 'État français — Département de la Savoie (Zone libre — Frontière alpine)',
    armisticeNote: 'Zone libre après l\'armistice franco-italien du 24 juin 1940. Zone frontalière démilitarisée sous commission italienne d\'armistice (CIAF).',
  },
  {
    nuts: 'FRK28',
    name: 'Haute-Savoie (Annecy)',
    cheflieu: 'Annecy',
    keys: ['haute_savoie', 'annecy', 'chamonix', 'bonneville', 'thonon'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de la Haute-Savoie (Annecy)',
    armisticeAdminTitle: 'État français — Département de la Haute-Savoie (Zone libre)',
  },

  // Provence-Alpes-Côte d'Azur (FRL01 - FRL06) - All 6 Zone libre
  {
    nuts: 'FRL01',
    name: 'Basses-Alpes (Digne)',
    cheflieu: 'Digne',
    keys: ['alpes_de_haute_provence', 'basses_alpes', 'digne', 'forcalquier', 'barcelonnette'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département des Basses-Alpes (Digne)',
    repNote: 'Vallée de l\'Ubaye et secteur fortifié du Dauphiné. (Renommé Alpes-de-Haute-Provence en 1970).',
    armisticeAdminTitle: 'État français — Département des Basses-Alpes (Zone libre)',
  },
  {
    nuts: 'FRL02',
    name: 'Hautes-Alpes (Gap)',
    cheflieu: 'Gap',
    keys: ['hautes_alpes', 'gap', 'briancon'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département des Hautes-Alpes (Gap)',
    repNote: 'Fortifications alpines de Briançon (Ligne Maginot alpine), défense victorieuse contre les divisions italiennes en juin 1940.',
    armisticeAdminTitle: 'État français — Département des Hautes-Alpes (Zone libre)',
  },
  {
    nuts: 'FRL03',
    name: 'Alpes-Maritimes (Nice / Menton)',
    cheflieu: 'Nice',
    keys: ['alpes_maritimes', 'nice', 'menton', 'grasse', 'cannes'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département des Alpes-Maritimes (Nice)',
    repNote: 'Secteur fortifié des Alpes-Maritimes et défense de Nice. Menton attaquée par les forces italiennes en juin 1940.',
    armisticeAdminTitle: 'État français — Département des Alpes-Maritimes (Zone libre — Occupation de Menton)',
    armisticeNote: 'Département en zone libre sous souveraineté de Vichy, à l\'exception de la bande frontalière de Menton occupée/annexée par l\'Italie fasciste après l\'armistice de Villa Incisa.',
  },
  {
    nuts: 'FRL04',
    name: 'Bouches-du-Rhône (Marseille)',
    cheflieu: 'Marseille',
    keys: ['bouches_du_rhone', 'marseille', 'aix_en_provence', 'arles'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département des Bouches-du-Rhône (Marseille)',
    repNote: 'Premier port maritime de la République et plaque tournante vers l\'Empire colonial d\'Afrique du Nord.',
    armisticeName: 'Bouches-du-Rhône (Marseille)',
    armisticeAdminTitle: 'État français — Département des Bouches-du-Rhône (Marseille, Zone libre)',
    armisticeNote: 'Grand port méditerranéen de la zone libre, reliant le gouvernement de Vichy à ses possessions coloniales nord-africaines.',
  },
  {
    nuts: 'FRL05',
    name: 'Var (Toulon)',
    cheflieu: 'Toulon',
    keys: ['var', 'toulon', 'draguignan', 'hyeres'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département du Var (Toulon)',
    repNote: 'Grand port militaire, arsenal et base principale de combat de la Marine Nationale.',
    armisticeName: 'Var (Toulon)',
    armisticeAdminTitle: 'État français — Département du Var (Toulon, Flotte de haute mer)',
    armisticeNote: 'Base principale de la Flotte de haute mer française (Amiral de Laborde) sous statut d\'armistice strict jusqu\'au sabordage de novembre 1942.',
  },
  {
    nuts: 'FRL06',
    name: 'Vaucluse (Avignon)',
    cheflieu: 'Avignon',
    keys: ['vaucluse', 'avignon', 'orange', 'carpentras'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de Vaucluse (Avignon)',
    repNote: 'Cité papale d\'Avignon, vallée du Rhône et base aérienne d\'Orange-Caritat.',
    armisticeAdminTitle: 'État français — Département de Vaucluse (Zone libre)',
  },

  // Corse (FRM01, FRM02) - All 2 Zone libre
  {
    nuts: 'FRM01',
    name: 'Corse (Ajaccio)',
    cheflieu: 'Ajaccio',
    keys: ['corse_du_sud', 'ajaccio', 'sartene', 'corse'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de la Corse (Ajaccio)',
    repNote: 'Département unifié de la Corse (1811-1975). Chef-lieu Ajaccio.',
    armisticeAdminTitle: 'État français — Département de la Corse (Ajaccio, Zone libre)',
    armisticeNote: 'Île sous autorité de Vichy en Méditerranée occidentale, convoitée et revendiquée par l\'Italie fasciste ("Corsica italiana").',
  },
  {
    nuts: 'FRM02',
    name: 'Corse (Bastia)',
    cheflieu: 'Bastia',
    keys: ['haute_corse', 'bastia', 'calvi', 'corte'],
    partition1940: 'zone_libre',
    repAdminTitle: 'Troisième République française — Département de la Corse (Bastia)',
    repNote: 'Partie septentrionale du département unifié de la Corse. Sous-préfecture Bastia.',
    armisticeAdminTitle: 'État français — Département de la Corse (Bastia, Zone libre)',
    armisticeNote: 'Port et sous-préfecture de Bastia en zone libre maritime.',
  },

  // DROM / Départements et territoires d'outre-mer (FRY10 - FRY50)
  {
    nuts: 'FRY10',
    name: 'Guadeloupe (Basse-Terre)',
    cheflieu: 'Basse-Terre',
    keys: ['guadeloupe', 'basse_terre', 'pointe_a_pitre'],
    partition1940: 'dom_tom',
    repAdminTitle: 'Troisième République française — Colonie de la Guadeloupe (Antilles françaises)',
    repNote: 'Colonie française des Petites Antilles. Chef-lieu Basse-Terre.',
    armisticeAdminTitle: 'Administration coloniale de l\'État français (Haut-commissariat aux Antilles, Amiral Robert)',
    armisticeNote: 'Placée sous l\'autorité du haut-commissaire de Vichy aux Antilles, l\'amiral Georges Robert.',
  },
  {
    nuts: 'FRY20',
    name: 'Martinique (Fort-de-France)',
    cheflieu: 'Fort-de-France',
    keys: ['martinique', 'fort_de_france'],
    partition1940: 'dom_tom',
    repAdminTitle: 'Troisième République française — Colonie de la Martinique (Fort-de-France)',
    repNote: 'Siège du haut-commissariat de la France aux Antilles. Base navale de Fort-de-France.',
    armisticeAdminTitle: 'Administration coloniale de l\'État français (Fort-de-France, Amiral Robert)',
    armisticeNote: 'Quartier général de l\'amiral Robert ; le porte-avions Béarn et le croiseur Émile Bertin y restent immobilisés avec l\'or de la Banque de France.',
  },
  {
    nuts: 'FRY30',
    name: 'Guyane française (Cayenne)',
    cheflieu: 'Cayenne',
    keys: ['guyane', 'french_guiana', 'cayenne', 'saint_laurent_du_maroni'],
    partition1940: 'dom_tom',
    repAdminTitle: 'Colonie de la Guyane française — Chef-lieu Cayenne',
    repNote: 'Territoire colonial français en Amérique du Sud et bagne de Cayenne.',
    armisticeAdminTitle: 'Colonie de la Guyane française — Gouverneur René Veber (Vichy)',
    armisticeNote: 'Colonie rattachée à l\'administration de Vichy sous la supervision de l\'amiral Robert.',
  },
  {
    nuts: 'FRY40',
    name: 'La Réunion (Saint-Denis)',
    cheflieu: 'La Réunion',
    keys: ['la_reunion', 'reunion', 'saint_denis_reunion'],
    partition1940: 'dom_tom',
    repAdminTitle: 'Troisième République française — Colonie de La Réunion (Saint-Denis)',
    repNote: 'Île de l\'océan Indien sous souveraineté française. Chef-lieu Saint-Denis.',
    armisticeAdminTitle: 'Administration coloniale de l\'État français — Colonie de La Réunion',
    armisticeNote: 'Restée fidèle au maréchal Pétain sous le gouverneur Pierre Aubert jusqu\'au ralliement à la France libre en 1942.',
  },
  {
    nuts: 'FRY50',
    name: 'Mayotte (Dzaoudzi)',
    cheflieu: 'Dzaoudzi',
    keys: ['mayotte', 'dzaoudzi', 'mamoudzou'],
    partition1940: 'dom_tom',
    repAdminTitle: 'Troisième République française — Colonie de Madagascar et dépendances (Mayotte)',
    repNote: 'Archipel des Comores, rattaché administrativement au gouvernement général de Madagascar.',
    armisticeAdminTitle: 'Administration coloniale de l\'État français — Mayotte (Madagascar, Vichy)',
    armisticeNote: 'Dépendance coloniale sous administration de Vichy dans le canal du Mozambique.',
  },
];

/**
 * Risoluzione toponomastica, istituzionale e temporale dettagliata per i dipartimenti francesi (1936-1940)
 */
export function resolveFranceToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;

  // 1. Cerca match tra i 101 dipartimenti/territori del catalogo
  let foundDept: FranceDeptDef | undefined;

  if (id.startsWith('FR')) {
    foundDept = FRANCE_DEPARTMENTS_CATALOG.find((d) => d.nuts === id || id.startsWith(d.nuts));
  }

  if (!foundDept) {
    const normTokens = normKey.split('_').filter(Boolean);
    for (const d of FRANCE_DEPARTMENTS_CATALOG) {
      if (d.keys.some((k) => normKey === k || normTokens.includes(k) || (k.length >= 5 && normKey.includes(k)))) {
        foundDept = d;
        break;
      }
    }
  }

  if (foundDept) {
    const d = foundDept;

    if (step < 6) {
      // 1936 - Maggio 1940: Terza Repubblica Francese
      return {
        name: d.name,
        adminTitle: d.repAdminTitle || `Troisième République française — Département de ${d.name}`,
        note: d.repNote || `Département français sous la Troisième République (1870-1940). Chef-lieu : ${d.cheflieu}.`,
      };
    }

    // Step >= 6: Giugno 1940 (Post-Armistizio del 22 giugno 1940)
    switch (d.partition1940) {
      case 'alsace_moselle':
        return {
          name: d.armisticeName || d.name,
          adminTitle: d.armisticeAdminTitle || 'CdZ-Gebiet (Annexion de facto au Troisième Reich)',
          note: d.armisticeNote || 'Territoire annexé de facto au Reich allemand après l\'armistice de juin 1940.',
        };

      case 'belgium_command':
        return {
          name: d.armisticeName || d.name,
          adminTitle: d.armisticeAdminTitle || 'Militärverwaltung in Belgien und Nordfrankreich (Alexander von Falkenhausen, Bruxelles)',
          note: d.armisticeNote || 'Zone rattachée au commandement militaire allemand de Bruxelles (Zone interdite).',
        };

      case 'zone_libre':
        return {
          name: d.armisticeName || d.name,
          adminTitle: d.armisticeAdminTitle || `État français — Département de ${d.name} (Zone libre)`,
          note: d.armisticeNote || `Département en Zone libre sous l\'autorité du gouvernement de Vichy. Chef-lieu : ${d.cheflieu}.`,
        };

      case 'zone_occupee':
        return {
          name: d.armisticeName || d.name,
          adminTitle: d.armisticeAdminTitle || 'Zone occupée — Militärbefehlshaber in Frankreich (Paris)',
          note: d.armisticeNote || `Département en Zone occupée sous administration militaire allemande (Militärbefehlshaber in Frankreich). Chef-lieu : ${d.cheflieu}.`,
        };

      case 'dom_tom':
        return {
          name: d.armisticeName || d.name,
          adminTitle: d.armisticeAdminTitle || 'Administration coloniale de l\'État français (Vichy)',
          note: d.armisticeNote || `Territoire d\'outre-mer français sous l\'autorité coloniale. Chef-lieu : ${d.cheflieu}.`,
        };
    }
  }

  // Fallback per entità nazionale 'France' / 'Francia' (metropolitana)
  const isNationalFrance =
    normKey === 'france' ||
    normKey === 'la_france' ||
    normKey === 'republique_francaise' ||
    normKey === 'french_republic' ||
    normKey === 'francia' ||
    normKey === 'france_metropolitaine' ||
    ((owner === 'FRA' || owner === 'VIC') && !id && (normKey === 'france' || normKey === 'vichy'));

  if (isNationalFrance) {
    if (step < 6) {
      return {
        name: 'France',
        adminTitle: 'Troisième République française (Présidence d\'Albert Lebrun)',
        note: 'République démocratique parlementaire française (1870-1940). Capitale Paris.',
      };
    }
    if (owner === 'VIC') {
      return {
        name: 'État français (Régime de Vichy)',
        adminTitle: 'État français (Maréchal Philippe Pétain — Chef de l\'État)',
        note: 'Régime autoritaire siégeant à Vichy et exerçant son autorité sur la Zone libre et l\'Empire colonial.',
      };
    }
    return {
      name: 'France occupée',
      adminTitle: 'Zone occupée — Militärbefehlshaber in Frankreich (Paris)',
      note: 'Territoire métropolitain français sous occupation militaire allemande après l\'armistice du 22 juin 1940.',
    };
  }

  return null;
}

/**
 * Risoluzione toponomastica, istituzionale e temporale dettagliata per l'Impero Coloniale Francese (1936-1940)
 */
export function resolveFrenchColonialToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;
  const isVichyStep = step >= 6;

  // Protezione contro collisioni con altri stati sovrani (URSS, Germania, Polonia, Paesi Nordici, ecc.)
  if (
    owner === 'SOV' ||
    owner === 'GER' ||
    owner === 'POL' ||
    owner === 'FIN' ||
    owner === 'SWE' ||
    owner === 'NOR' ||
    owner === 'SPR' ||
    owner === 'SPA' ||
    owner === 'ITA' ||
    owner === 'UK' ||
    owner === 'BEL' ||
    owner === 'TUR' ||
    id.startsWith('SOV_') ||
    id.startsWith('RUS_')
  ) {
    if (!normKey.includes('france') && !normKey.includes('french')) {
      return null;
    }
  }

  // 1. DÉPARTEMENTS FRANÇAIS D'ALGÉRIE (Alger, Oran, Constantine, Territoires du Sud)
  if (
    !normKey.includes('oranienbaum') &&
    (owner === 'FRA' ||
      owner === 'VIC' ||
      owner === 'F_NAF' ||
      owner === 'VIC_NAF' ||
      id.startsWith('DZ') ||
      normKey.includes('alger')) &&
    (normKey.includes('alger') ||
      (normKey.includes('oran') && !normKey.includes('oranienbaum')) ||
      normKey.includes('constantin') ||
      normKey.includes('sidi_bel') ||
      normKey.includes('blida') ||
      normKey.includes('territoires_du_sud') ||
      (owner === 'F_NAF' && normKey.includes('algeria')) ||
      (owner === 'VIC_NAF' && normKey.includes('algeria')))
  ) {
    if (normKey.includes('oran') && !normKey.includes('oranienbaum')) {
      return {
        name: isVichyStep ? 'Oran (Vichy)' : 'Oran',
        adminTitle: isVichyStep ? "Département d'Oran (Vichy)" : "Département d'Oran (Préfecture)",
        note: isVichyStep
          ? "Grand port commercial et base militaire sous autorité de Vichy ; baie voisine de Mers-el-Kébir théâtre de l'attaque britannique du 3 juillet 1940."
          : "Grand port commercial et base militaire à forte population européenne d'origine espagnole et française.",
      };
    }
    if (normKey.includes('constantin')) {
      return {
        name: isVichyStep ? 'Constantine (Vichy)' : 'Constantine',
        adminTitle: isVichyStep ? "Département de Constantine (Vichy)" : "Département de Constantine (Préfecture)",
        note: isVichyStep
          ? "Administration préfectorale d'Algérie orientale fidèle au Maréchal Pétain."
          : "Cité séculaire des gorges du Rhummel, centre névralgique de l'Est algérien.",
      };
    }
    if (normKey.includes('sidi_bel')) {
      return {
        name: isVichyStep ? 'Sidi Bel Abbès (Vichy)' : 'Sidi Bel Abbès',
        adminTitle: isVichyStep ? "Dépôt Central de la Légion Étrangère (Vichy)" : "Maison Mère de la Légion Étrangère (1er RE)",
        note: isVichyStep
          ? "Légion étrangère repliée sous contrôle de l'Armée d'Afrique de Vichy."
          : "Quartier Viénot et berceau historique de la Légion Étrangère.",
      };
    }
    return isVichyStep
      ? {
          name: "Départements Français d'Algérie (Vichy)",
          adminTitle: "Gouvernement Général de l'Algérie (Yves Châtel / Maxime Weygand — Vichy)",
          note: "Maintenus sous l'autorité du régime de Vichy avec application stricte des lois du statut des juifs jusqu'au débarquement allié de novembre 1942 (Opération Torch).",
        }
      : {
          name: "Départements Français d'Algérie",
          adminTitle: "Gouvernement Général de l'Algérie (Alger)",
          note: "Territoire constitutionnellement intégré à la République française, divisé en départements d'Alger, d'Oran, de Constantine et les Territoires du Sud sahariens. Gouverneur Général Georges Le Beau.",
        };
  }

  // 2. PROTECTORAT FRANÇAIS DU MAROC (Rabat, Casablanca, Fès, Marrakech)
  if (
    (normKey.includes('morocco') || normKey.includes('maroc') || normKey.includes('rabat') || normKey.includes('casablanca') || normKey.includes('marrakech')) &&
    !normKey.includes('spanish') && !normKey.includes('espana') && owner !== 'SPR' && owner !== 'SPA'
  ) {
    if (normKey.includes('casablanca')) {
      return {
        name: isVichyStep ? 'Casablanca (Maroc — Vichy)' : 'Casablanca',
        adminTitle: isVichyStep ? "Base Navale Atlantique de Vichy" : "Grand Port de l'Atlantique & Poumon Économique",
        note: isVichyStep
          ? "Base de stationnement du puissant cuirassé Jean Bart inachevé, évacué de Saint-Nazaire en juin 1940."
          : "Plus grand port moderne du Maghreb et grand centre industriel atlantique.",
      };
    }
    return isVichyStep
      ? {
          name: "Protectorat du Maroc (Vichy)",
          adminTitle: "Résidence Générale de France au Maroc (Général Charles Noguès — Vichy)",
          note: "Le Résident Général Charles Noguès renonce à la dissidence après l'armistice de juin 1940 et maintient le protectorat dans l'obéissance à Vichy jusqu'à Torch.",
        }
      : {
          name: "Protectorat Français du Maroc",
          adminTitle: "Résidence Générale de la République Française (Rabat)",
          note: "Protectorat établi par le traité de Fès (1912). Souveraineté chérifienne sous le Sultan Sidi Mohammed ben Youssef et le Résident Général Charles Noguès.",
        };
  }

  // 3. PROTECTORAT FRANÇAIS DE TUNISIE (Tunis, Bizerte, Sfax)
  if (
    normKey.includes('tunis') ||
    normKey.includes('bizerte') ||
    normKey.includes('sfax') ||
    normKey.includes('sousse') ||
    normKey.includes('gabes')
  ) {
    if (normKey.includes('bizerte')) {
      return {
        name: isVichyStep ? 'Bizerte (Vichy)' : 'Bizerte',
        adminTitle: isVichyStep ? "Base Navale Stratégique sous Contrôle d'Armistice" : "Base Navale Stratégique & Arsenal de Sidi Abdallah",
        note: isVichyStep
          ? "Arsenal et base navale démobilisés sous le contrôle de la Commission d'armistice italienne (CIAF)."
          : "Base navale majeure de la Marine Nationale verrouillant le détroit siculo-tunisien.",
      };
    }
    return isVichyStep
      ? {
          name: "Protectorat de Tunisie (Vichy)",
          adminTitle: "Résidence Générale de France en Tunisie (Amiral Jean-Pierre Esteva — Vichy)",
          note: "L'amiral Esteva prend ses fonctions en juillet 1940 et applique la politique de collaboration de Vichy sous la surveillance de la Commission d'armistice italienne.",
        }
      : {
          name: "Protectorat Français de Tunisie",
          adminTitle: "Résidence Générale de la République Française (Tunis)",
          note: "Protectorat établi par les traités du Bardo (1881) et de La Marsa (1883). Dynastie husseinite sous Ahmed II Bey. Base navale stratégique de Bizerte.",
        };
  }

  // 4. TOGO FRANÇAIS (Mandat SDN)
  if (normKey.includes('togo') || normKey.includes('lome')) {
    return isVichyStep
      ? {
          name: "Togo Français (AOF — Vichy)",
          adminTitle: "Territoire sous Mandat (Vichy — Gouverneur Léonce Jore)",
          note: "Mandat de la Société des Nations sous surveillance britannique depuis la Côte-de-l'Or voisine, maintenu temporairement sous l'autorité de Vichy.",
        }
      : {
          name: "Togo Français",
          adminTitle: "Territoire sous Mandat de la Société des Nations (Lomé)",
          note: "Ancienne colonie allemande administrée par la France sous mandat B de la Société des Nations, rattachée administrativement au gouverneur général de l'AOF.",
        };
  }

  // 5. AFRIQUE-OCCIDENTALE FRANÇAISE (AOF)
  if (
    normKey.includes('french_west_africa') ||
    normKey.includes('west_africa') ||
    normKey.includes('senegal') ||
    normKey.includes('dakar') ||
    normKey.includes('mauritani') ||
    normKey.includes('soudan') ||
    (normKey.includes('mali') && !normKey.includes('somali')) ||
    normKey.includes('bamako') ||
    (normKey.includes('niger') && !normKey.includes('nigeria')) ||
    normKey.includes('niamey') ||
    normKey.includes('haute_volta') ||
    normKey.includes('burkina') ||
    normKey.includes('ouagadougou') ||
    normKey.includes('cote_d_ivoire') ||
    normKey.includes('ivory_coast') ||
    normKey.includes('abidjan') ||
    (normKey.includes('guinee') && !normKey.includes('portuguese') && !normKey.includes('spanish') && !normKey.includes('papua')) ||
    (normKey.includes('guinea') && !normKey.includes('bissau') && !normKey.includes('portuguese') && !normKey.includes('spanish') && !normKey.includes('equatorial') && !normKey.includes('new_guinea') && !normKey.includes('papua')) ||
    normKey.includes('dahomey') ||
    normKey.includes('benin') ||
    normKey.includes('porto_novo') ||
    owner === 'F_AOF' ||
    owner === 'VIC_AOF'
  ) {
    if (normKey.includes('dakar')) {
      return {
        name: isVichyStep ? 'Dakar (Sénégal / AOF — Vichy)' : 'Dakar (Sénégal / AOF)',
        adminTitle: isVichyStep ? "Haut-Commissariat de Pierre Boisson pour l'Afrique Noire (Vichy)" : "Gouvernement Général de l'AOF (Dakar)",
        note: isVichyStep
          ? "Pierre Boisson repousse l'assaut anglo-gaulliste de l'opération Menace (23-25 sept. 1940) avec le cuirassé Richelieu et garde l'AOF sous l'autorité de Vichy."
          : "Capitale fédérale de l'Afrique Occidentale Française, grand port stratégique et escale maritime impériale.",
      };
    }
    return isVichyStep
      ? {
          name: "Afrique-Occidentale Française (AOF — Vichy)",
          adminTitle: "Haut-Commissariat de Pierre Boisson pour l'Afrique Noire (Dakar — Vichy)",
          note: "Fédération maintenue sous l'autorité du gouverneur général Pierre Boisson, resté fidèle au maréchal Pétain et opposé aux Forces françaises libres.",
        }
      : {
          name: "Afrique-Occidentale Française (AOF)",
          adminTitle: "Gouvernement Général de l'AOF (Dakar — Jules Marcel de Coppet)",
          note: "Fédération coloniale regroupant le Sénégal, la Mauritanie, le Soudan français, la Guinée, la Côte d'Ivoire, le Dahomey et le Niger. Grand port de Dakar et foyer des Tirailleurs sénégalais.",
        };
  }

  // 6. CAMEROUN FRANÇAIS (Mandat SDN & France Libre — Ralliement de Leclerc)
  if (
    (normKey.includes('cameroon') || normKey.includes('cameroun') || normKey.includes('douala') || normKey.includes('yaounde') || id === 'AEF_CM' || normKey === 'cm') &&
    owner !== 'UK'
  ) {
    const aefTop = resolveAEFToponym(id, rawName, normKey, owner, step);
    if (aefTop) return aefTop;
  }

  // 7. TCHAD (AEF)
  if (
    normKey.includes('tchad') ||
    (normKey.includes('chad') && !normKey.includes('richard')) ||
    normKey.includes('fort_lamy') ||
    normKey.includes('largeau')
  ) {
    return isVichyStep
      ? {
          name: "Tchad (Premier Territoire Rallié à la France Libre)",
          adminTitle: "Gouverneur Général Félix Éboué (Ralliement du 26 août 1940)",
          note: "Félix Éboué et le colonel Marchand proclament le ralliement du Tchad, offrant à la France Libre sa première assise territoriale souveraine et la base de départ de la Colonne Leclerc.",
        }
      : {
          name: "Colonie du Tchad (AEF)",
          adminTitle: "Gouvernement du Territoire du Tchad (Gouverneur Félix Éboué — Fort-Lamy)",
          note: "Territoire sahélo-saharien stratégique aux portes du désert libyen et du lac Tchad sous la direction clairvoyante de Félix Éboué.",
        };
  }

  // 8. AFRIQUE-ÉQUATORIALE FRANÇAISE (AEF: Moyen-Congo, Oubangui-Chari, Gabon)
  if (
    normKey.includes('french_equatorial_africa') ||
    normKey.includes('equatorial_africa') ||
    normKey.includes('brazzaville') ||
    normKey.includes('moyen_congo') ||
    (normKey.includes('congo') && (normKey.includes('france') || owner === 'F_AEF' || owner === 'FFL_AEF')) ||
    normKey.includes('oubangui') ||
    normKey.includes('bangui') ||
    normKey.includes('centrafrique') ||
    normKey.includes('gabon') ||
    normKey.includes('libreville') ||
    ((owner === 'F_AEF' || owner === 'FFL_AEF' || owner === 'VIC_AEF') &&
      !normKey.includes('caledon') &&
      !normKey.includes('hebrid') &&
      !normKey.includes('polynesi') &&
      !normKey.includes('tahiti') &&
      !normKey.includes('inde') &&
      !normKey.includes('indi') &&
      !normKey.includes('pondicher') &&
      !normKey.includes('wallis') &&
      !normKey.includes('guyane') &&
      !normKey.includes('martinique') &&
      !normKey.includes('guadel'))
  ) {
    if (normKey.includes('gabon') || normKey.includes('libreville')) {
      if (owner === 'VIC_AEF' || (step === 6 && owner !== 'FFL_AEF')) {
        return {
          name: "Colonie du Gabon (Vichy — Libreville)",
          adminTitle: "Gouverneur Georges Masson (Régime de Vichy — Libreville)",
          note: "Le gouverneur Georges Masson refuse le ralliement de l'AEF et maintient le Gabon sous l'autorité du maréchal Pétain et de Vichy, soutenu par l'aviso Bougainville.",
        };
      }
      return isVichyStep || step >= 7
        ? {
            name: "Gabon (France Libre — Libreville)",
            adminTitle: "Colonie du Gabon (Forces Françaises Libres — De Gaulle / Leclerc)",
            note: "Campagne du Gabon (octobre-novembre 1940) : les Forces Françaises Libres de Leclerc et Koenig rallient le Gabon, parachevant l'unité territoriale de la France Libre en Afrique équatoriale.",
          }
        : {
            name: "Colonie du Gabon (AEF — Libreville)",
            adminTitle: "Gouvernement de la Colonie du Gabon (Libreville)",
            note: "Colonie côtière de l'AEF sur l'estuaire du Komo et le golfe de Guinée, chef-lieu Libreville et port de Port-Gentil.",
          };
    }
    if (normKey.includes('brazzaville')) {
      return isVichyStep
        ? {
            name: "Brazzaville (Capitale de la France Libre)",
            adminTitle: "Capitale de l'Empire de la France Libre (Manifeste de Brazzaville)",
            note: "Le 27 octobre 1940, le général de Gaulle crée à Brazzaville le Conseil de défense de l'Empire. Brazzaville devient la capitale officielle de la France combattante.",
          }
        : {
            name: "Brazzaville (Moyen-Congo / AEF)",
            adminTitle: "Capitale de l'Afrique Équatoriale Française (AEF)",
            note: "Siège du Gouvernement Général de l'AEF sur la rive droite du Stanley Pool (fleuve Congo) et terminus du chemin de fer Congo-Océan.",
          };
    }
    return isVichyStep
      ? {
          name: "Afrique Française Libre (AEF — Brazzaville)",
          adminTitle: "Capitale de la France Libre (Félix Éboué & Edgard de Larminat — Brazzaville)",
          note: "L'Afrique-Équatoriale française se rallie massivement à la France Libre en août 1940 sous l'impulsion de Félix Éboué et d'Edgard de Larminat, constituant le sanctuaire territorial de De Gaulle.",
        }
      : {
          name: "Afrique-Équatoriale Française (AEF)",
          adminTitle: "Gouvernement Général de l'AEF (Brazzaville)",
          note: "Fédération de colonies équatoriales comprenant le Moyen-Congo, le Gabon, l'Oubangui-Chari et le Tchad. Capitale Brazzaville et port océanique de Pointe-Noire.",
        };
  }

  // 9. COCHINCHINE
  if (normKey.includes('cochin') || normKey.includes('saigon')) {
    return isVichyStep
      ? {
          name: "Cochinchine (Vichy — Saïgon)",
          adminTitle: "Gouvernement de la Cochinchine (Vichy — Saïgon)",
          note: "Territoire sous le contrôle de l'administration de Vichy de l'amiral Decoux, préservé temporairement des combats directs avant le déploiement japonais.",
        }
      : {
          name: "Cochinchine (Colonie Française — Saïgon)",
          adminTitle: "Gouvernement de la Cochinchine (Saïgon)",
          note: "Seule possession d'Indochine jouissant du statut de colonie française directe, grand grenier à riz du delta du Mékong et plantations d'hévéa. Saïgon, perle de l'Extrême-Orient.",
        };
  }

  // 10. CAMBODGE
  if (normKey.includes('cambod') || normKey.includes('phnom_penh')) {
    return isVichyStep
      ? {
          name: "Protectorat du Cambodge (Vichy)",
          adminTitle: "Résidence Supérieure de France au Cambodge (Vichy — Phnom Penh)",
          note: "Sous administration de Vichy, menacé sur sa frontière occidentale par les revendications territoriales et l'offensive armée de la Thaïlande de Phibun Songkhram.",
        }
      : {
          name: "Protectorat Français du Cambodge",
          adminTitle: "Résidence Supérieure au Cambodge (Phnom Penh)",
          note: "Royaume khmer sous le roi Sisowath Monivong et protectorat français. Capitale royale Phnom Penh et temples millénaires d'Angkor.",
        };
  }

  // 11. LAOS
  if (normKey.includes('laos') || normKey.includes('vientiane') || normKey.includes('luang_prabang')) {
    return isVichyStep
      ? {
          name: "Protectorat du Laos (Vichy)",
          adminTitle: "Résidence Supérieure de France au Laos (Vichy — Vientiane)",
          note: "Poste frontière sur le Mékong face aux incursions et revendications territoriales thaïlandaises sous l'administration de Vichy.",
        }
      : {
          name: "Protectorat Français du Laos",
          adminTitle: "Résidence Supérieure au Laos (Vientiane)",
          note: "Royaume de Luang Prabang et principautés laotiennes sous le roi Sisavang Vong le long du haut cours du Mékong.",
        };
  }

  // 12. UNION INDOCHINOISE (Indochine française générale / Tonkin / Annam / Cochinchine / Cambodge / Laos)
  if (
    normKey.includes('indo_china') ||
    normKey.includes('indochin') ||
    normKey.includes('vietnam') ||
    normKey.includes('tonkin') ||
    normKey.includes('annam') ||
    normKey.includes('cochinchin') ||
    normKey.includes('cambod') ||
    normKey.includes('laos') ||
    normKey.includes('hanoi') ||
    normKey.includes('haiphong') ||
    normKey.includes('hue') ||
    normKey.includes('tourane') ||
    normKey.includes('saigon') ||
    normKey.includes('lang_son') ||
    owner === 'F_IND' ||
    owner === 'VIC_IND' ||
    (id && (id.startsWith('KH') || id.startsWith('LA') || id.startsWith('VN')))
  ) {
    if (id && FRENCH_INDOCHINA_PROVINCES_META[id]) {
      const p = FRENCH_INDOCHINA_PROVINCES_META[id];
      return {
        name: p.getHistoricalName ? p.getHistoricalName(step) : p.historicalName,
        adminTitle: p.getAdminTitle ? p.getAdminTitle(step) : p.adminTitle,
        note: p.getNote(step),
      };
    }
    const cleanId = (id || '').replace(/[^A-Za-z0-9]/g, '');
    if (cleanId && FRENCH_INDOCHINA_PROVINCES_META[cleanId]) {
      const p = FRENCH_INDOCHINA_PROVINCES_META[cleanId];
      return {
        name: p.getHistoricalName ? p.getHistoricalName(step) : p.historicalName,
        adminTitle: p.getAdminTitle ? p.getAdminTitle(step) : p.adminTitle,
        note: p.getNote(step),
      };
    }
    for (const key of Object.keys(FRENCH_INDOCHINA_PROVINCES_META)) {
      const p = FRENCH_INDOCHINA_PROVINCES_META[key];
      const nrm = p.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const nrmTop = p.historicalToponym.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (normKey === nrm || normKey === nrmTop || (nrm.length >= 6 && normKey.includes(nrm))) {
        return {
          name: p.getHistoricalName ? p.getHistoricalName(step) : p.historicalName,
          adminTitle: p.getAdminTitle ? p.getAdminTitle(step) : p.adminTitle,
          note: p.getNote(step),
        };
      }
    }
    return isVichyStep
      ? {
          name: "Indochine Française (Vichy / Présence Japonaise)",
          adminTitle: "Gouvernement Général de l'Amiral Jean Decoux (Vichy — Hanoï)",
          note: "Sous la pression militaire de Tokyo, Decoux signe l'accord de septembre 1940 autorisant le stationnement de troupes japonaises au Tonkin tout en maintenant la souveraineté française.",
        }
      : {
          name: "Union Indochinoise (Indochine Française)",
          adminTitle: "Gouvernement Général de l'Indochine (Hanoï)",
          note: "Fédération coloniale comprenant la colonie de Cochinchine et les protectorats du Tonkin, d'Annam, du Cambodge et du Laos. Siège fédéral à Hanoï.",
        };
  }

  // 13. KOUANG-TCHÉOU-WAN (Chine)
  if (normKey.includes('kouang_tcheou') || normKey.includes('fort_bayard') || normKey.includes('guangzhouwan')) {
    return isVichyStep
      ? {
          name: "Territoire de Kouang-Tchéou-Wan (Vichy)",
          adminTitle: "Territoire Français à Bail (Vichy — Fort-Bayard)",
          note: "Enclave sous contrôle de l'administration de Vichy en mer de Chine méridionale.",
        }
      : {
          name: "Territoire de Kouang-Tchéou-Wan (Chine)",
          adminTitle: "Territoire à Bail Français (Fort-Bayard)",
          note: "Territoire côtier en baie de Zhanjiang cédé à bail par la Chine en 1898, rattaché administrativement à l'Indochine.",
        };
  }

  // 14. MADAGASCAR ET DÉPENDANCES
  if (
    normKey.includes('madagascar') ||
    normKey.includes('tananarive') ||
    normKey.includes('antananarivo') ||
    normKey.includes('diego_suarez') ||
    normKey.includes('tamatave') ||
    normKey.includes('majunga') ||
    normKey.includes('comor') ||
    owner === 'F_MAD' ||
    owner === 'VIC_MAD'
  ) {
    return isVichyStep
      ? {
          name: "Madagascar (Vichy)",
          adminTitle: "Gouvernement Général d'Armand Annet (Vichy — Tananarive)",
          note: "Le gouverneur Armand Annet refuse tout ralliement à De Gaulle et maintient Madagascar sous strict contrôle de Vichy jusqu'à l'attaque britannique de 1942 (Opération Ironclad).",
        }
      : {
          name: "Colonie de Madagascar et Dépendances",
          adminTitle: "Gouvernement Général de Madagascar (Tananarive)",
          note: "Grande île de l'océan Indien et dépendances (archipel des Comores, île Sainte-Marie). Capitale administrative Tananarive et puissante base navale de Diego-Suarez.",
        };
  }

  // 15. SYRIE ET LIBAN (Mandat du Levant)
  if (
    (normKey.includes('syria') ||
      normKey.includes('syrie') ||
      normKey.includes('damas') ||
      normKey.includes('alep') ||
      normKey.includes('lebanon') ||
      normKey.includes('liban') ||
      normKey.includes('beyrouth') ||
      normKey.includes('latakia') ||
      normKey.includes('jebel_druze') ||
      owner === 'F_SYR' ||
      owner === 'VIC_SYR') &&
    owner !== 'TUR'
  ) {
    if (normKey.includes('liban') || normKey.includes('lebanon') || normKey.includes('beyrouth')) {
      return isVichyStep
        ? {
            name: "Grand Liban (Vichy — Beyrouth)",
            adminTitle: "Quartier Général du Général Henri Dentz (Vichy — Beyrouth)",
            note: "Port militaire et siège du commandement vichyste des forces du Levant, placé sous blocus maritime par la Royal Navy.",
          }
        : {
            name: "Grand Liban (République Libanaise)",
            adminTitle: "État du Grand Liban sous Mandat Français (Beyrouth)",
            note: "République parlementaire multiconfessionnelle présidée par Émile Éddé sous mandat français de la Société des Nations.",
          };
    }
    return isVichyStep
      ? {
          name: "Mandat de Syrie (Vichy)",
          adminTitle: "Haut-Commissaire Général Henri Dentz (Vichy — Damas)",
          note: "Le général Henri Dentz assure le commandement au nom de Vichy, préparant la défense du Levant contre les forces alliées britanniques et françaises libres.",
        }
      : {
          name: "Mandat Français en Syrie et au Liban",
          adminTitle: "Haut-Commissariat de la République Française au Levant (Beyrouth / Damas)",
          note: "Mandat A de la Société des Nations confié à la France en 1920. Haut-Commissaire Gabriel Puaux.",
        };
  }

  // 16. CÔTE FRANÇAISE DES SOMALIS (Djibouti)
  if (
    normKey.includes('somaliland') ||
    normKey.includes('djibouti') ||
    normKey.includes('obock') ||
    owner === 'F_SOM' ||
    owner === 'VIC_SOM'
  ) {
    if (owner === 'ITA' || owner === 'UK') return null;
    return isVichyStep
      ? {
          name: "Côte Française des Somalis (Djibouti — Vichy)",
          adminTitle: "Administration de Pierre Nouailhetas (Régime de Vichy — Djibouti)",
          note: "Pierre Nouailhetas instaure un régime pétainiste rigoureux et résiste pendant plus de deux ans au blocus naval britannique total.",
        }
      : {
          name: "Côte Française des Somalis (Djibouti)",
          adminTitle: "Colonie de Djibouti (Gouverneur Hubert Deschamps)",
          note: "Territoire stratégique à l'entrée de la mer Rouge (Bab-el-Mandeb) et débouché ferroviaire unique de l'Empire éthiopien.",
        };
  }

  // 17. MARTINIQUE
  if (normKey.includes('martinique') || normKey.includes('fort_de_france')) {
    return isVichyStep
      ? {
          name: "Martinique (Fort-de-France — Vichy)",
          adminTitle: "Administration Coloniale de l'État Français (Fort-de-France, Amiral Robert)",
          note: "Quartier général de l'amiral Robert ; le porte-avions Béarn et les réserves d'or de la Banque de France y restent sous surveillance américaine.",
        }
      : {
          name: "Martinique (Fort-de-France)",
          adminTitle: "Haut-Commissariat aux Antilles (Amiral Georges Robert)",
          note: "Siège de l'amiral Robert ; le porte-avions Béarn et le croiseur Émile Bertin y immobilisent 286 tonnes d'or de la Banque de France.",
        };
  }

  // 18. GUADELOUPE
  if (normKey.includes('guadeloupe') || normKey.includes('basse_terre') || normKey.includes('pointe_a_pitre')) {
    return isVichyStep
      ? {
          name: "Guadeloupe (Basse-Terre — Vichy)",
          adminTitle: "Administration Coloniale de l'État Français (Haut-commissariat aux Antilles, Amiral Robert)",
          note: "Placée sous l'autorité du haut-commissaire de Vichy aux Antilles, l'amiral Robert, sous étroite surveillance maritime américaine.",
        }
      : {
          name: "Guadeloupe (Basse-Terre / Pointe-à-Pitre)",
          adminTitle: "Colonie de la Guadeloupe (Antilles Françaises)",
          note: "Archipel des Petites Antilles comprenant Basse-Terre, Grande-Terre, Marie-Galante, Les Saintes et dépendances.",
        };
  }

  // 19. SAINT-MARTIN & SAINT-BARTHÉLEMY
  if (
    normKey.includes('saint_martin') ||
    normKey.includes('st_martin') ||
    normKey.includes('saint_barthelemy') ||
    normKey.includes('st_barthelemy')
  ) {
    if (normKey.includes('barthelemy')) {
      return isVichyStep
        ? {
            name: "Saint-Barthélemy (Antilles — Vichy)",
            adminTitle: "Administration Coloniale des Antilles de Vichy (Amiral Robert)",
            note: "Île des Petites Antilles sous l'autorité du haut-commissariat de l'amiral Robert à Fort-de-France.",
          }
        : {
            name: "Saint-Barthélemy (Dépendance de la Guadeloupe)",
            adminTitle: "Antilles Françaises (Colonie de la Guadeloupe)",
            note: "Île des Petites Antilles rattachée administrativement à la colonie de la Guadeloupe.",
          };
    }
    return isVichyStep
      ? {
          name: "Saint-Martin (Antilles — Vichy)",
          adminTitle: "Administration Coloniale des Antilles de Vichy (Amiral Robert)",
          note: "Partie française de l'île de Saint-Martin sous l'autorité du haut-commissariat de l'amiral Robert à Fort-de-France.",
        }
      : {
          name: "Saint-Martin (Dépendance de la Guadeloupe)",
          adminTitle: "Antilles Françaises (Colonie de la Guadeloupe)",
          note: "Partie française des Petites Antilles rattachée administrativement à la colonie de la Guadeloupe.",
        };
  }

  // 20. GUYANE FRANÇAISE
  if (normKey.includes('guyane') || normKey.includes('french_guiana') || normKey.includes('cayenne')) {
    return isVichyStep
      ? {
          name: "Guyane Française (Vichy — Cayenne)",
          adminTitle: "Colonie de la Guyane Française (Gouverneur René Veber — Vichy)",
          note: "Colonie rattachée à l'administration de Vichy sous la supervision de l'amiral Robert jusqu'au ralliement à la France combattante en 1943.",
        }
      : {
          name: "Guyane Française (Cayenne)",
          adminTitle: "Colonie de la Guyane Française (Gouverneur René Veber)",
          note: "Territoire colonial équatorial en Amérique du Sud, richesses forestières, orpaillage et bagne de Cayenne.",
        };
  }

  // 21. NOUVELLE-CALÉDONIE
  if (normKey.includes('caledon') || normKey.includes('noumea')) {
    if (step >= 7 || owner === 'FFL_AEF' || owner === 'FFL') {
      return {
        name: "Nouvelle-Calédonie (France Libre — Nouméa)",
        adminTitle: "Ralliée à la France Libre (19 septembre 1940 — Henri Sautot)",
        note: "Henri Sautot mène le ralliement de la Nouvelle-Calédonie à de Gaulle ; premier producteur mondial de nickel stratégique et base alliée majeure dans le Pacifique.",
      };
    }
    if (step === 6 || owner === 'VIC') {
      return {
        name: "Nouvelle-Calédonie (Nouméa — Administration de Vichy)",
        adminTitle: "Colonie sous Contrôle d'Armistice (Gouverneur Denis — Vichy)",
        note: "Le gouverneur Denis tente de maintenir l'archipel sous l'obéissance de Vichy avant son renversement pacifique par la population et Henri Sautot.",
      };
    }
    return {
      name: "Nouvelle-Calédonie (Nouméa)",
      adminTitle: "Colonie de la Nouvelle-Calédonie et Dépendances (Nouméa)",
      note: "Archipel mélanésien d'Océanie sous administration française, producteur mondial stratégique de minerai de nickel.",
    };
  }

  // 22. NOUVELLES-HÉBRIDES (Condominium)
  if (normKey.includes('hebrid') || normKey.includes('port_vila')) {
    if (step >= 7 || owner === 'FFL_AEF' || owner === 'FFL') {
      return {
        name: "Nouvelles-Hébrides (Premier Ralliement à la France Libre)",
        adminTitle: "Condominium Rallié à la France Libre (20 juillet 1940 — Henri Sautot)",
        note: "Premier territoire français au monde à se rallier à la France Libre (20 juillet 1940) sous l'impulsion décisive du commissaire résident Henri Sautot.",
      };
    }
    if (step === 6) {
      return {
        name: "Nouvelles-Hébrides (Condominium Franco-Britannique — Armistice)",
        adminTitle: "Condominium des Nouvelles-Hébrides (Port-Vila)",
        note: "Archipel océanien gouverné conjointement par la France et le Royaume-Uni à la veille du ralliement historique du 20 juillet 1940.",
      };
    }
    return {
      name: "Nouvelles-Hébrides (Condominium Franco-Britannique)",
      adminTitle: "Condominium des Nouvelles-Hébrides (Port-Vila)",
      note: "Archipel océanien gouverné conjointement par la France et le Royaume-Uni (résident commissaire Henri Sautot).",
    };
  }

  // 23. WALLIS-ET-FUTUNA
  if (normKey.includes('wallis') || normKey.includes('futuna')) {
    return isVichyStep
      ? {
          name: "Wallis-et-Futuna (Vichy)",
          adminTitle: "Protectorat de Wallis-et-Futuna (Vichy — Résident Vrignaud)",
          note: "L'archipel est maintenu sous tutelle de Vichy jusqu'à son ralliement par la France Libre en mai 1942.",
        }
      : {
          name: "Protectorat des Îles Wallis et Futuna",
          adminTitle: "Protectorat Français de Wallis-et-Futuna (Mata-Utu)",
          note: "Royaumes coutumiers polynésiens d'Uvea, Sigave et Alo sous protectorat français rattaché à la Nouvelle-Calédonie.",
        };
  }

  // 24. ÉTABLISSEMENTS FRANÇAIS DE L'OCÉANIE (Tahiti / Polynésie)
  if (normKey.includes('tahiti') || normKey.includes('papeete') || normKey.includes('polynesi')) {
    if (step >= 7 || owner === 'FFL_AEF' || owner === 'FFL') {
      return {
        name: "Établissements Français de l'Océanie (France Libre — Tahiti)",
        adminTitle: "Ralliés à la France Libre par Plébiscite (2 septembre 1940)",
        note: "Par un plébiscite populaire écrasant (5.564 voix contre 18), la Polynésie se rallie à la France Libre, formant le vaillant Bataillon du Pacifique.",
      };
    }
    if (step === 6 || owner === 'VIC') {
      return {
        name: "Établissements Français de l'Océanie (Tahiti — Administration coloniale)",
        adminTitle: "Administration Coloniale d'Océanie (Papeete)",
        note: "Archipels polynésiens dans l'attente du plébiscite populaire de ralliement à De Gaulle de septembre 1940.",
      };
    }
    return {
      name: "Établissements Français de l'Océanie (Tahiti / Papeete)",
      adminTitle: "Colonie des Établissements Français de l'Océanie (Papeete)",
      note: "Archipels de la Société, des Tuamotu, des Gambier, des Marquises et des Australes. Chef-lieu Papeete.",
    };
  }

  // 25. ÉTABLISSEMENTS FRANÇAIS DANS L'INDE (Pondichéry)
  if (
    normKey.includes('inde_franc') ||
    normKey.includes('french_indi') ||
    normKey.includes('pondicher') ||
    normKey.includes('chandernagor') ||
    normKey.includes('karikal') ||
    normKey.includes('mahe') ||
    normKey.includes('yanaon')
  ) {
    if (step >= 7 || owner === 'FFL_AEF' || owner === 'FFL') {
      return {
        name: "Établissements Français dans l'Inde (France Libre)",
        adminTitle: "Ralliés à la France Libre (9 septembre 1940 — Louis Bonvin)",
        note: "Le gouverneur Louis Bonvin proclame le ralliement officiel des comptoirs à la France Libre de De Gaulle le 9 septembre 1940.",
      };
    }
    if (step === 6 || owner === 'VIC') {
      return {
        name: "Établissements Français dans l'Inde (Pondichéry — Armistice)",
        adminTitle: "Comptoirs Français de l'Inde (Gouverneur Louis Bonvin)",
        note: "Comptoirs souverains enclavés dans les Indes britanniques à la veille de leur adhésion à la France Libre.",
      };
    }
    return {
      name: "Établissements Français dans l'Inde (Pondichéry)",
      adminTitle: "Comptoirs Français de l'Inde (Gouverneur Louis Bonvin)",
      note: "Cinq comptoirs souverains enclavés dans les Indes britanniques (Pondichéry, Chandernagor, Karikal, Mahé, Yanaon).",
    };
  }

  // 26. SAINT-PIERRE-ET-MIQUELON
  if (normKey.includes('st_pierre') || normKey.includes('saint_pierre') || normKey.includes('miquelon')) {
    return isVichyStep
      ? {
          name: "Saint-Pierre-et-Miquelon (Vichy)",
          adminTitle: "Administration de Gilbert de Bournat (Régime de Vichy)",
          note: "L'administrateur de Bournat maintient l'archipel fidèle à Vichy jusqu'au ralliement par l'amiral Muselier en décembre 1941.",
        }
      : {
          name: "Saint-Pierre-et-Miquelon",
          adminTitle: "Territoire Français des Îles Saint-Pierre-et-Miquelon",
          note: "Archipel nord-atlantique au large de Terre-Neuve, administré par Gilbert de Bournat.",
        };
  }

  return null;
}

/**
 * Risoluzione toponomastica, istituzionale, militare e temporale dettagliata per l'Africa (1936-1940).
 * Copre esaustivamente a livello di singole province e territori: Quarta Sponda (Libia),
 * AOI (Etiopia, Eritrea, Somalia), AOF, AEF, Congo Belga, Colonie Portoghesi, Africa Britannica,
 * Sudafrica e Dominions, Possedimenti Spagnoli (Rif, Sahara, Guinea, Tangeri) e Liberia.
 */
export function resolveAfricanToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;

  // Protezione rigorosa contro entità chiaramente non africane (sovietiche, nordiche, esteuropee)
  if (
    owner === 'SOV' ||
    owner === 'GER' ||
    owner === 'POL' ||
    owner === 'FIN' ||
    owner === 'SWE' ||
    owner === 'NOR' ||
    owner === 'EST' ||
    owner === 'LAT' ||
    owner === 'LIT' ||
    id.startsWith('SOV_') ||
    id.startsWith('RUS_') ||
    id.startsWith('FIN_') ||
    id.startsWith('EST_') ||
    id.startsWith('LVA_') ||
    id.startsWith('LTU_') ||
    id.startsWith('POL_')
  ) {
    return null;
  }

  // 0. ALGERIA FRANCESE (58 Wilayas / Dipartimenti e Territori del Sud 1936-1940)
  const cleanDzId = id ? id.replace(/^DZ_/, 'DZ').toUpperCase() : '';
  if (cleanDzId && (ALGERIA_PROVINCES_META as any)[cleanDzId]) {
    const dz = (ALGERIA_PROVINCES_META as any)[cleanDzId];
    return {
      name: dz.historicalName,
      adminTitle: dz.adminTitle,
      note: dz.note,
    };
  }

  // 0. MAROCCO FRANCESE (9 Regioni e Territori 1936-1940)
  const cleanMaId = id ? id.replace(/^MA_/, 'MA').toUpperCase() : '';
  if (cleanMaId && (MOROCCO_PROVINCES_META as any)[cleanMaId]) {
    const ma = (MOROCCO_PROVINCES_META as any)[cleanMaId];
    return {
      name: ma.historicalName,
      adminTitle: ma.adminTitle,
      note: ma.note,
    };
  }

  // 0. TUNISIA FRANCESE (24 Governatorati e Territori del Sud 1936-1940)
  const cleanTnId = id ? id.replace(/^TN_/, 'TN').toUpperCase() : '';
  if (cleanTnId && (TUNISIA_PROVINCES_META as any)[cleanTnId]) {
    const tn = (TUNISIA_PROVINCES_META as any)[cleanTnId];
    return {
      name: tn.historicalName,
      adminTitle: tn.adminTitle,
      note: tn.note,
    };
  }

  // 0. REGNO D'EGITTO (27 Governatorati e Mudiriyat 1936-1941: Cairo, Alessandria, Canale di Suez, Delta, Oasi e Frontiere)
  const cleanEgId = id ? id.replace(/^EG_/, 'EG').toUpperCase() : '';
  if (cleanEgId === 'EGMT' && step === 7) {
    return {
      name: 'Sidi Barrani e Marmarica Egiziana (Avanzata della 10ª Armata Italiana)',
      adminTitle: "Zona d'Operazioni della 10ª Armata Italiana in Egitto (Maresciallo Rodolfo Graziani — Sidi Barrani)",
      note: 'Nel settembre 1940 la 10ª Armata italiana (Maresciallo Rodolfo Graziani) oltrepassa il confine libico-egiziano occupando Sollum, il Passo di Halfaya e Sidi Barrani, dove erige una catena di campi trincerati fortificati (Nibeiwa, Tummar, Maktila) di fronte alla Western Desert Force britannica attestata a Mersa Matruh.',
    };
  }
  if (cleanEgId === 'EGMT' && step >= 8) {
    return {
      name: 'Matruh, Sidi Barrani e Fronte di Sollum / Passo di Halfaya (Western Desert Force)',
      adminTitle: "Regno d'Egitto / British Western Desert Force (Mersa Matruh — Frontiera di Sollum / Halfaya)",
      note: "Dopo aver travolto la 10ª Armata italiana nell'Operazione Compass (dicembre 1940 - febbraio 1941), le forze imperiali britanniche sono state respinte dalla controffensiva lampo dell'Afrikakorps di Erwin Rommel fino alla frontiera egiziana (11 aprile 1941), dove il fronte si stabilizza lungo la scarpata di Sollum, Forte Capuzzo e il Passo di Halfaya mentre Tobruk resiste assediata.",
    };
  }
  if (cleanEgId && EGYPT_DISTRICTS_META[cleanEgId]) {
    const eg = EGYPT_DISTRICTS_META[cleanEgId];
    return {
      name: eg.historicalName,
      adminTitle: eg.adminTitle,
      note: eg.note,
    };
  }

  if (
    !normKey.includes('sudan') &&
    (cleanEgId.startsWith('EG') ||
      owner === 'EGY' ||
      normKey.includes('egypt') ||
      normKey.includes('egitto') ||
    normKey.includes('cairo') ||
    normKey.includes('qahirah') ||
    normKey.includes('alexandria') ||
    normKey.includes('alessandria') ||
    normKey.includes('iskandariyah') ||
    normKey.includes('matruh') ||
    normKey.includes('marmarica') ||
    normKey.includes('aswan') ||
    normKey.includes('assuan') ||
    normKey.includes('suez') ||
    normKey.includes('suways') ||
    normKey.includes('port_said') ||
    normKey.includes('bur_said') ||
    normKey.includes('ismailia') ||
    normKey.includes('sinai') ||
    normKey.includes('luxor') ||
    normKey.includes('qena') ||
    normKey.includes('asyut') ||
    normKey.includes('sohag') ||
    normKey.includes('suhaj') ||
    normKey.includes('minya') ||
    normKey.includes('fayyum') ||
    normKey.includes('faiyum') ||
    normKey.includes('beni_suef') ||
    normKey.includes('bani_suwayf') ||
    normKey.includes('giza') ||
    normKey.includes('jizah') ||
    normKey.includes('qalyubia') ||
    normKey.includes('qalyubiyah') ||
    normKey.includes('menoufia') ||
    normKey.includes('minufiyah') ||
    normKey.includes('gharbia') ||
    normKey.includes('gharbiyah') ||
    normKey.includes('beheira') ||
    normKey.includes('buhayrah') ||
    normKey.includes('kafr') ||
    normKey.includes('damietta') ||
    normKey.includes('dumyat') ||
    normKey.includes('daqahlia') ||
    normKey.includes('daqahliyah') ||
    normKey.includes('sharqia') ||
    normKey.includes('sharqiyah') ||
    normKey.includes('red_sea') ||
    normKey.includes('mar_rosso') ||
    normKey.includes('bahr_al_ahmar') ||
    normKey.includes('new_valley') ||
    normKey.includes('nuova_valle') ||
    normKey.includes('wadi_al_jadid'))
  ) {
    if (normKey.includes('cairo') || normKey.includes('qahirah') || cleanEgId === 'EGC') {
      const eg = EGYPT_DISTRICTS_META['EGC'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('alexandria') || normKey.includes('alessandria') || normKey.includes('iskandariyah') || cleanEgId === 'EGALX') {
      const eg = EGYPT_DISTRICTS_META['EGALX'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('matruh') || normKey.includes('marmarica') || cleanEgId === 'EGMT') {
      const eg = EGYPT_DISTRICTS_META['EGMT'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('aswan') || normKey.includes('assuan') || cleanEgId === 'EGASN') {
      const eg = EGYPT_DISTRICTS_META['EGASN'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('suez') || normKey.includes('suways') || cleanEgId === 'EGSUZ') {
      const eg = EGYPT_DISTRICTS_META['EGSUZ'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('port_said') || normKey.includes('bur_said') || cleanEgId === 'EGPTS') {
      const eg = EGYPT_DISTRICTS_META['EGPTS'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('ismailia') || cleanEgId === 'EGIS') {
      const eg = EGYPT_DISTRICTS_META['EGIS'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('sinai') || cleanEgId === 'EGSIN' || cleanEgId === 'EGJS') {
      const isSouth = normKey.includes('south') || normKey.includes('meridionale') || normKey.includes('janub') || cleanEgId === 'EGJS';
      const eg = isSouth ? EGYPT_DISTRICTS_META['EGJS'] : EGYPT_DISTRICTS_META['EGSIN'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('red_sea') || normKey.includes('mar_rosso') || normKey.includes('bahr_al_ahmar') || cleanEgId === 'EGBA') {
      const eg = EGYPT_DISTRICTS_META['EGBA'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('new_valley') || normKey.includes('nuova_valle') || normKey.includes('wadi_al_jadid') || normKey.includes('kharga') || cleanEgId === 'EGWAD') {
      const eg = EGYPT_DISTRICTS_META['EGWAD'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('luxor') || normKey.includes('uqsur') || cleanEgId === 'EGLX') {
      const eg = EGYPT_DISTRICTS_META['EGLX'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('qena') || normKey.includes('qina') || cleanEgId === 'EGKN') {
      const eg = EGYPT_DISTRICTS_META['EGKN'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('asyut') || normKey.includes('asiut') || cleanEgId === 'EGAST') {
      const eg = EGYPT_DISTRICTS_META['EGAST'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('sohag') || normKey.includes('suhaj') || cleanEgId === 'EGSHG') {
      const eg = EGYPT_DISTRICTS_META['EGSHG'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('minya') || normKey.includes('menia') || cleanEgId === 'EGMN') {
      const eg = EGYPT_DISTRICTS_META['EGMN'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('fayyum') || normKey.includes('faiyum') || cleanEgId === 'EGFYM') {
      const eg = EGYPT_DISTRICTS_META['EGFYM'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('beni_suef') || normKey.includes('bani_suwayf') || cleanEgId === 'EGBNS') {
      const eg = EGYPT_DISTRICTS_META['EGBNS'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('giza') || normKey.includes('jizah') || cleanEgId === 'EGGZ') {
      const eg = EGYPT_DISTRICTS_META['EGGZ'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('qalyubia') || normKey.includes('qalyubiyah') || cleanEgId === 'EGKB') {
      const eg = EGYPT_DISTRICTS_META['EGKB'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('menoufia') || normKey.includes('minufiyah') || cleanEgId === 'EGMNF') {
      const eg = EGYPT_DISTRICTS_META['EGMNF'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('gharbia') || normKey.includes('gharbiyah') || cleanEgId === 'EGGH') {
      const eg = EGYPT_DISTRICTS_META['EGGH'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('beheira') || normKey.includes('buhayrah') || cleanEgId === 'EGBH') {
      const eg = EGYPT_DISTRICTS_META['EGBH'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('kafr') || cleanEgId === 'EGKFS') {
      const eg = EGYPT_DISTRICTS_META['EGKFS'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('damietta') || normKey.includes('dumyat') || cleanEgId === 'EGDT') {
      const eg = EGYPT_DISTRICTS_META['EGDT'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('daqahlia') || normKey.includes('daqahliyah') || cleanEgId === 'EGDK') {
      const eg = EGYPT_DISTRICTS_META['EGDK'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    if (normKey.includes('sharqia') || normKey.includes('sharqiyah') || cleanEgId === 'EGSHR') {
      const eg = EGYPT_DISTRICTS_META['EGSHR'];
      return { name: eg.historicalName, adminTitle: eg.adminTitle, note: eg.note };
    }
    return {
      name: "Kingdom of Egypt (British Military Sphere — Cairo)",
      adminTitle: "Kingdom of Egypt (Anglo-Egyptian Treaty of 1936)",
      note: "Monarchia costituzionale guidata da Re Faruq I, formalmente indipendente ma vincolata dal Trattato Anglo-Egiziano del 1936 che autorizzava la Gran Bretagna a mantenere guarnigioni permanenti a difesa del Canale di Suez, la base navale di Alessandria e il controllo del Cairo per la difesa strategica imperiale.",
    };
  }

  // 1. QUARTA SPONDA & LIBIA ITALIANA (22 Province e Circondari 1936-1941: Tripoli, Bengasi, Derna, Misurata, Tobruk, Fezzan, Cufra, ecc.)
  if (
    id.startsWith('LY') ||
    normKey.includes('libya') ||
    normKey.includes('libia') ||
    normKey.includes('tripoli') ||
    normKey.includes('benghazi') ||
    normKey.includes('bengasi') ||
    normKey.includes('derna') ||
    normKey.includes('misrata') ||
    normKey.includes('misurata') ||
    normKey.includes('tobruk') ||
    normKey.includes('bardia') ||
    normKey.includes('fezzan') ||
    normKey.includes('cyrenaica') ||
    normKey.includes('cirenaica') ||
    normKey.includes('tripolitania') ||
    normKey.includes('nalut') ||
    normKey.includes('zuara') ||
    normKey.includes('nuqat') ||
    normKey.includes('kufra') ||
    normKey.includes('cufra') ||
    normKey.includes('murzuq') ||
    normKey.includes('murzuch') ||
    normKey.includes('butnan') ||
    normKey.includes('wahat') ||
    normKey.includes('oases') ||
    normKey.includes('shati') ||
    normKey.includes('sciati') ||
    normKey.includes('ghat') ||
    normKey.includes('surt') ||
    normKey.includes('sirte') ||
    normKey.includes('marqab') ||
    normKey.includes('homs') ||
    normKey.includes('zawiyah') ||
    normKey.includes('zawia') ||
    normKey.includes('akhdar') ||
    normKey.includes('marj') ||
    normKey.includes('barce') ||
    normKey.includes('jifarah') ||
    normKey.includes('jifara') ||
    normKey.includes('gefara') ||
    normKey.includes('gharbi') ||
    normKey.includes('nefusa') ||
    normKey.includes('jufrah') ||
    normKey.includes('jufra') ||
    normKey.includes('giofra') ||
    normKey.includes('sabha') ||
    normKey.includes('sebha') ||
    normKey.includes('hayaa') ||
    normKey.includes('agial') ||
    normKey.includes('ubari')
  ) {
    // Exact ID matching for the 22 Libyan districts
    if (id === 'LYTB') {
      if (step >= 8) {
        return {
          name: 'Tripoli (Sbarco del Deutsches Afrikakorps — Operazione Sonnenblume)',
          adminTitle: "Regno d'Italia — Comando Superiore FF.AA. Africa Settentrionale (Gen. Italo Gariboldi & Gen. Erwin Rommel)",
          note: "OPERAZIONE SONNENBLUME (febbraio-aprile 1941): Nel porto di Tripoli sbarcano i reparti corazzati del Deutsches Afrikakorps (5ª Divisione Leggera e 15ª Divisione Panzer) guidati dal generale Erwin Rommel, affiancati dalle divisioni italiane Ariete, Trento e Brescia. Il generale Italo Gariboldi subentra a Rodolfo Graziani quale Governatore Generale e Comandante Superiore in Africa Settentrionale.",
        };
      }
      return {
        name: 'Tripoli (Tripolitania Italiana)',
        adminTitle: step >= 6
          ? "Regno d'Italia — Commissariato Generale di Tripoli (Maresciallo Rodolfo Graziani)"
          : "Regno d'Italia — Commissariato Generale di Tripoli (Maresciallo dell'Aria Italo Balbo)",
        note: "Capoluogo della Tripolitania e sede del Governatore Generale della Libia. Con il R.D.L. 9 gennaio 1939 n. 70, la provincia fu formalmente annessa al territorio metropolitano nazionale italiano (Quarta Sponda); capolinea occidentale della litoranea Via Balbia e aeroscalo di Castel Benito.",
      };
    }
    if (id === 'LYBA') {
      if (step >= 8) {
        return {
          name: 'Bengasi (Riconquista Italo-Tedesca — Controffensiva di Rommel)',
          adminTitle: "Regno d'Italia / Deutsches Afrikakorps — Piazzaforte di Bengasi (Riconquistata il 4 aprile 1941)",
          note: "Occupata dagli australiani di Wavell il 6 febbraio 1941 dopo l'Operazione Compass, Bengasi viene riconquistata il 4 aprile 1941 dalle colonne corazzate di Erwin Rommel e del Regio Esercito scattate da El Agheila il 24 marzo, riaprendo il porto avanzato della Cirenaica per i rifornimenti dell'Asse.",
        };
      }
      return {
        name: 'Bengasi (Cirenaica Italiana)',
        adminTitle: "Regno d'Italia — Commissariato Generale Provinciale di Bengasi (Quarta Sponda)",
        note: "Capoluogo storico della Cirenaica e porto strategico sul Golfo della Sirte; incorporata nel territorio metropolitano del Regno d'Italia nel 1939. Base aerea di Berka e piazzaforte dell'Armata della Libia a presidio della costa orientale.",
      };
    }
    if (id === 'LYDR' || normKey.includes('derna')) {
      if (step >= 8) {
        return {
          name: "Derna e Mechili (Riconquista dell'Asse — Cattura dei Comandi Britannici)",
          adminTitle: "Regno d'Italia / Deutsches Afrikakorps — Commissariato di Derna (Riconquistata il 7-8 aprile 1941)",
          note: "Attraverso un'audace manovra a tenaglia sulle piste desertiche interne del Gebel fino a Mechili e Derna (7-8 aprile 1941), le forze italo-tedesche di Rommel e della Divisione Corazzata Ariete travolgono la 2ª Divisione Corazzata britannica catturando i generali Richard O'Connor e Philip Neame.",
        };
      }
      return {
        name: 'Derna (Cirenaica Orientale)',
        adminTitle: "Regno d'Italia — Commissariato Generale Provinciale di Derna (Quarta Sponda)",
        note: "Porto costiero e capoluogo della Cirenaica nord-orientale lungo la Via Balbia, base navale secondaria e perno logistico per le operazioni verso il confine egiziano.",
      };
    }
    if (id === 'LYMI' || normKey.includes('misrata') || normKey.includes('misurata')) {
      return {
        name: 'Misurata (Tripolitania Orientale)',
        adminTitle: "Regno d'Italia — Commissariato Generale Provinciale di Misurata (Quarta Sponda)",
        note: "Commissariato costiero della Libia metropolitana tra la Tripolitania e la Sirtica; polo dei villaggi agricoli di colonizzazione demografica fascista (Crispi e Gioda) e porto d'appoggio mercantile.",
      };
    }
    if (id === 'LYBU' || normKey.includes('tobruk') || normKey.includes('butnan') || normKey.includes('bardia')) {
      if (step >= 8) {
        return {
          name: 'Tobruk (Assedio Italo-Tedesco della Piazzaforte) & Bardia',
          adminTitle: "Fronte d'Assedio di Tobruk (DAK Gen. Erwin Rommel & Regio Esercito vs 9ª Divisione Australiana Gen. Leslie Morshead)",
          note: "ASSEDIO DI TOBRUK (dal 10-11 aprile 1941): Mentre Bardia e Sollum cadono in mano all'Asse, la piazzaforte costiera di Tobruk resta tenacemente difesa dai 'Ratti di Tobruk' della 9ª Divisione australiana del generale Leslie Morshead, riforniti via mare dalla Royal Navy. Gli assalti corazzati di Rommel del 14 aprile (Battaglia di Pasqua) e del 30 aprile (Quota 209 / Ras el-Medauar) vengono respinti, dando inizio a un assedio di 241 giorni che blocca l'avanzata dell'Asse verso Alessandria.",
        };
      }
      return {
        name: 'Tobruch e Bardia (Piazzaforte di Tobruk)',
        adminTitle: "Regno d'Italia — Comando Piazza Marittima di Tobruk / Settore Difensivo di Bardia",
        note: "Piazzaforte marittima fortificata della Regia Marina e del Regio Esercito con opere d'arresto a ridosso del confine egiziano (Ridotta Capuzzo, Bardia, Ridotta Maddalena). Teatro dell'abbattimento per fuoco amico del Governatore Generale Italo Balbo il 28 giugno 1940.",
      };
    }
    if (id === 'LYKF' || normKey.includes('kufra') || normKey.includes('cufra')) {
      if (step >= 8) {
        return {
          name: 'Cufra (Oasi di Cufra — Conquistata dalla Colonna Leclerc / Francia Libera)',
          adminTitle: "Forces Françaises Libres — Colonna del Colonnello Philippe Leclerc (Giuramento di Cufra, 1-2 marzo 1941)",
          note: "Partita da Fort-Lamy nel Ciad, la colonna motorizzata delle Forze Francesi Libere guidata dal colonnello Philippe Leclerc de Hauteclocque espugna il Forte El Tag nell'oasi di Cufra il 1° marzo 1941. Il 2 marzo Leclerc pronuncia il celebre 'Giuramento di Cufra' (Serment de Koufra), giurando di non deporre le armi finché il tricolore francese non sventolerà sulla cattedrale di Strasburgo.",
        };
      }
      return {
        name: 'Cufra (Oasi di Cufra / El Tag)',
        adminTitle: "Regno d'Italia — Territorio Militare del Sud (Comando Settore Sahariano di Cufra)",
        note: "Vasto comprensorio desertico sahariano comprendente l'oasi di Cufra, il santuario senussita espugnato nel 1931, Forte El Tag e aeroscalo per le rotte transahariane verso l'AOI.",
      };
    }
    if (id === 'LYMQ' || normKey.includes('murzuq') || normKey.includes('murzuch')) {
      return {
        name: 'Murzuch (Fezzan Meridionale)',
        adminTitle: "Regno d'Italia — Territorio Militare del Sud (Circondario del Fezzan Meridionale — Murzuch)",
        note: "Antica capitale carovaniera del Fezzan meridionale; piazzaforte sahariana del Regio Esercito a sbarramento delle piste verso il massiccio del Tibesti e il confine con l'Africa Equatoriale Francese (Ciad).",
      };
    }
    if (id === 'LYSB' || normKey.includes('sabha') || normKey.includes('sebha')) {
      return {
        name: 'Sebha (Forte Elena — Capoluogo del Fezzan)',
        adminTitle: "Regno d'Italia — Territorio Militare del Sud (Comando Militare del Fezzan — Forte Elena)",
        note: "Cuore politico e militare del Fezzan centrale dominato dal Forte Elena; perno operativo delle truppe mehariste cammellate e delle camionette sahariane armate.",
      };
    }
    if (id === 'LYWS' || normKey.includes('shati') || normKey.includes('sciati') || normKey.includes('brak')) {
      return {
        name: 'Uadi Sciati (Oasi di Brak)',
        adminTitle: "Regno d'Italia — Territorio Militare del Sud (Presidio Sahariano di Brak)",
        note: "Valle di oasi fossili nel nord del Fezzan con centro a Brak; fondamentale cerniera di approvvigionamento carovaniero tra la Tripolitania interna e Sebha.",
      };
    }
    if (id === 'LYWD' || normKey.includes('hayaa') || normKey.includes('agial') || normKey.includes('ubari')) {
      return {
        name: 'Uadi el-Agial (Ubari e Valle dei Garamanti)',
        adminTitle: "Regno d'Italia — Territorio Militare del Sud (Presidio Sahariano di Ubari)",
        note: "Valle storica dei Garamanti (antica capitale Germa / Garama) nel Fezzan occidentale; presidio sahariano di Ubari lungo la carovaniera che unisce Sebha all'oasi di Ghat al confine con l'Algeria.",
      };
    }
    if (id === 'LYGT' || normKey.includes('ghat')) {
      return {
        name: 'Ghat (Sahara Sud-Occidentale / Tassili)',
        adminTitle: "Regno d'Italia — Territorio Militare del Sud (Presidio di Frontiera di Ghat)",
        note: "Oasi fortezza all'estremità sud-occidentale della Libia, al triplice confine con Algeria (F_NAF) e Niger (F_AOF); presidiata dalla Compagnia Sahariana di Ghat nel Forte Saraceno a controllo delle rotte del Tassili n'Ajjer.",
      };
    }
    if (id === 'LYJU' || normKey.includes('jufrah') || normKey.includes('jufra') || normKey.includes('giofra') || normKey.includes('hon') || normKey.includes('socna') || normKey.includes('uaddan')) {
      return {
        name: 'Giofra (Hon, Socna e Uaddan)',
        adminTitle: "Regno d'Italia — Territorio Militare del Sud (Comando Superiore Sahariano — Hon)",
        note: "Oasi strategiche della Giofra nel cuore della Libia; capoluogo a Hon e sede del Quartier Generale del Comando Militare del Territorio del Sud; campo d'aviazione del deserto per le Compagnie Sahariane.",
      };
    }
    if (id === 'LYSR' || normKey.includes('surt') || normKey.includes('sirte') || normKey.includes('fileni') || normKey.includes('nofilia') || normKey.includes('agheila')) {
      if (step >= 8) {
        return {
          name: 'Sirte ed El Agheila (Trampolino della Controffensiva di Rommel)',
          adminTitle: "Regno d'Italia / Deutsches Afrikakorps — Stretta di El Agheila e Arco dei Fileni",
          note: "Il 24 marzo 1941 dalla stretta di El Agheila e dall'Arco dei Fileni il generale Erwin Rommel lancia la prima fulminea offensiva italo-tedesca riconquistando Mersa El Brega, Agedabia e l'intera Cirenaica in meno di due settimane.",
        };
      }
      return {
        name: 'Sirte (Sirtica e Arco dei Fileni)',
        adminTitle: "Regno d'Italia — Commissariato Generale di Misurata (Circondario della Sirtica)",
        note: "Snodo costiero lungo il Golfo della Sirte, cerniera tra Tripolitania e Cirenaica attraversata dalla Via Balbia; a Ras Lanuf sorgeva l'Arco dei Fileni (1937) al confine storico delle due regioni; basi di Nofilia ed El Agheila.",
      };
    }
    if (id === 'LYWA' || normKey.includes('oases') || normKey.includes('wahat') || normKey.includes('gialo') || normKey.includes('augila') || normKey.includes('giarabub')) {
      if (step >= 8) {
        return {
          name: 'Al Wahat — Giarabub (Eroica Resistenza del Magg. Castagna) e Gialo',
          adminTitle: "Regno d'Italia — Settore Sahariano di Gialo e Sacca di Giarabub (Dicembre 1940 – 21 Marzo 1941)",
          note: "L'oasi fortificata di Giarabub, completamente isolata nel deserto per oltre tre mesi dopo il crollo della 10ª Armata, fu difesa fino all'ultima cartuccia dal presidio italiano del maggiore Salvatore Castagna contro la 6ª Divisione australiana fino all'assalto finale del 21 marzo 1941.",
        };
      }
      return {
        name: 'Al Wahat (Oasi di Gialo, Augila e Giarabub)',
        adminTitle: "Regno d'Italia — Territorio Militare del Sud / Cirenaica (Oasi di Gialo e Giarabub)",
        note: "Arcipelago di oasi sahariane nel deserto cirenaico comprendente Gialo, Augila, Marada e la città santa di Giarabub; sede della confraternita senussita e della piazzaforte di Giarabub presidiata dal Regio Esercito.",
      };
    }
    if (id === 'LYJA' || normKey.includes('akhdar') || normKey.includes('cirene') || normKey.includes('cyrene') || normKey.includes('apollonia')) {
      return {
        name: 'Gebel el-Achdar (Cirene / Beda Littoria)',
        adminTitle: "Regno d'Italia — Commissariato Generale di Derna (Circondario del Gebel — Cirene)",
        note: "Altopiano fertile della Cirenaica settentrionale (Montagna Verde); culla archeologica di Cirene e Apollonia; sede di intensi insediamenti agricoli dell'Ente di Colonizzazione ('Beda Littoria', 'Luigi Razza', 'D'Annunzio').",
      };
    }
    if (id === 'LYMJ' || normKey.includes('marj') || normKey.includes('barce')) {
      return {
        name: 'Barce (Al Marj — Piana di Barce)',
        adminTitle: "Regno d'Italia — Commissariato Generale di Bengasi (Circondario di Barce)",
        note: "Conca cerealicola della Cirenaica occidentale servita dalla ferrovia per Bengasi; sede del villaggio coloniale 'Maddalena' e perno difensivo montano tra Bengasi e il Gebel.",
      };
    }
    if (id === 'LYMB' || normKey.includes('marqab') || normKey.includes('homs') || normKey.includes('leptis') || normKey.includes('tarhuna') || normKey.includes('cussabat')) {
      return {
        name: 'Homs e Leptis Magna (Tripolitania Settentrionale)',
        adminTitle: "Regno d'Italia — Commissariato Generale di Tripoli (Circondario di Homs)",
        note: "Provincia litoranea della Tripolitania settentrionale comprendente il porto di Homs, le grandiose rovine di Leptis Magna riscoperte dall'archeologia italiana e i villaggi olivicoli di Tarhuna e Cussabat.",
      };
    }
    if (id === 'LYZA' || normKey.includes('zawiyah') || normKey.includes('zawia') || normKey.includes('sabratha') || normKey.includes('sorman')) {
      return {
        name: 'Zawiya e Sabratha (Tripolitania Costiera)',
        adminTitle: "Regno d'Italia — Commissariato Generale di Tripoli (Circondario di Zawiya)",
        note: "Distretto agricolo e costiero a ovest di Tripoli comprendente le oasi di Zawiya, Sorman e gli scavi romani di Sabratha; attraversato dalla litoranea verso Zuara e sede del villaggio rurale 'Oliveti'.",
      };
    }
    if (id === 'LYNQ' || normKey.includes('nuqat') || normKey.includes('zuara') || normKey.includes('zuwarah') || normKey.includes('pisida')) {
      return {
        name: 'Zuara e Frontiera Tunisina (Pisida)',
        adminTitle: "Regno d'Italia — Commissariato Generale di Tripoli (Circondario di Frontiera di Zuara)",
        note: "Distretto costiero della Tripolitania all'estremo confine con la Tunisia francese (Ligne Mareth); comprende il porto berbero di Zuara, la laguna di Farwa, il caposaldo di Pisida e il capolinea della ferrovia per Tripoli.",
      };
    }
    if (id === 'LYNL' || normKey.includes('nalut') || normKey.includes('cabao') || normKey.includes('giado')) {
      return {
        name: 'Nalut e Gebel Nefusa Occidentale (Cabao / Giado)',
        adminTitle: "Regno d'Italia — Commissariato Generale di Tripoli (Circondario di Nalut)",
        note: "Bastione montano fortificato all'estremità occidentale del Gebel Nefusa a ridosso del confine tunisino; borgo berbero arroccato con il celebre Qasr fortificato; presidio di frontiera e nodo delle piste verso Gadames.",
      };
    }
    if (id === 'LYJG' || normKey.includes('gharbi') || normKey.includes('garian') || normKey.includes('nefusa') || normKey.includes('iefren') || normKey.includes('mizda')) {
      return {
        name: 'Gebel Nefusa (Garian, Mizda e Iefren)',
        adminTitle: "Regno d'Italia — Commissariato Generale di Tripoli (Circondario di Garian)",
        note: "Altopiano della Tripolitania interna con capoluogo a Garian (abitazioni trogloditiche); distretto delle coltivazioni olivicole, comando militare d'altura e via d'accesso alle oasi di Mizda e dell'Uadi Sofeggin.",
      };
    }
    if (id === 'LYJI' || normKey.includes('jifarah') || normKey.includes('jifara') || normKey.includes('gefara') || normKey.includes('azizia')) {
      return {
        name: 'Piana della Gefara (El-Azizia / Suani Ben Adem)',
        adminTitle: "Regno d'Italia — Commissariato Generale di Tripoli (Circondario della Gefara)",
        note: "Piana alluvionale suburbana immediatamente a sud di Tripoli; polo agricolo delle concessioni rurali e sede di El-Azizia (nota per i record mondiali di temperatura); snodo viario e ferroviario verso l'interno.",
      };
    }
    if (normKey.includes('tripoli') || normKey.includes('tripolitania')) {
      if (step >= 8) {
        return {
          name: 'Tripoli (Sbarco del Deutsches Afrikakorps — Operazione Sonnenblume)',
          adminTitle: "Regno d'Italia — Comando Superiore FF.AA. Africa Settentrionale (Gen. Italo Gariboldi & Gen. Erwin Rommel)",
          note: "OPERAZIONE SONNENBLUME (febbraio-aprile 1941): Nel porto di Tripoli sbarcano i reparti corazzati del Deutsches Afrikakorps guidati dal generale Erwin Rommel, avviando la riconquista della Cirenaica e l'assedio di Tobruk.",
        };
      }
      return {
        name: 'Tripoli (Tripolitania Italiana)',
        adminTitle: step >= 6
          ? "Regno d'Italia — Commissariato Generale di Tripoli (Maresciallo Rodolfo Graziani)"
          : "Regno d'Italia — Commissariato Generale di Tripoli (Maresciallo dell'Aria Italo Balbo)",
        note: "Capoluogo della Tripolitania e sede del Governatore Generale della Libia. Con il R.D.L. 9 gennaio 1939 n. 70, la provincia fu formalmente annessa al territorio metropolitano nazionale italiano (Quarta Sponda); capolinea occidentale della litoranea Via Balbia e aeroscalo di Castel Benito.",
      };
    }
    if (normKey.includes('benghazi') || normKey.includes('bengasi') || normKey.includes('cyrenaica') || normKey.includes('cirenaica')) {
      if (step >= 8) {
        return {
          name: 'Bengasi (Riconquista Italo-Tedesca — Controffensiva di Rommel)',
          adminTitle: "Regno d'Italia / Deutsches Afrikakorps — Piazzaforte di Bengasi (Riconquistata il 4 aprile 1941)",
          note: "Riconquistata il 4 aprile 1941 dalle colonne corazzate del generale Erwin Rommel e del Regio Esercito durante la fulminea controffensiva in Cirenaica.",
        };
      }
      return {
        name: 'Bengasi (Cirenaica Italiana)',
        adminTitle: "Regno d'Italia — Commissariato Generale Provinciale di Bengasi (Quarta Sponda)",
        note: "Capoluogo storico della Cirenaica e porto strategico sul Golfo della Sirte; incorporata nel territorio metropolitano del Regno d'Italia nel 1939. Base aerea di Berka e piazzaforte dell'Armata della Libia a presidio della costa orientale.",
      };
    }
    if (normKey.includes('fezzan')) {
      return {
        name: 'Territorio Militare del Sud (Fezzan / Sahara Libico)',
        adminTitle: "Regno d'Italia — Territorio Militare del Sud (Comando Militare Sahariano, Hon / Cufra)",
        note: "Vasto comprensorio desertico sahariano comprendente il Fezzan e le oasi di Murzuch, Sebha, Hon, Ghat e Cufra. Presidiato dalle Compagnie Sahariane per il pattugliamento delle piste transahariane verso il Ciad e il Niger.",
      };
    }
    return {
      name: step >= 8 ? 'Libia Italiana (Controffensiva dell\'Afrikakorps & Assedio di Tobruk)' : 'Libia Italiana (Quarta Sponda)',
      adminTitle: step >= 8
        ? "Regno d'Italia — Governo Generale della Libia (Gen. Italo Gariboldi & DAK Gen. Erwin Rommel)"
        : step >= 6
          ? "Regno d'Italia — Governo Generale della Libia (Maresciallo Rodolfo Graziani)"
          : "Regno d'Italia — Governo Generale della Libia (Maresciallo dell'Aria Italo Balbo)",
      note: step >= 8
        ? "In seguito allo sbarco a Tripoli del Deutsches Afrikakorps di Erwin Rommel (Operazione Sonnenblume, febbraio-marzo 1941), le forze dell'Asse riconquistano l'intera Cirenaica e stringono d'assedio la guarnigione australiana di Tobruk (10 aprile 1941)."
        : "Possedimento nordafricano unificato nel 1934 sotto Italo Balbo. Con il R.D.L. 9 gennaio 1939 n. 70, le quattro province costiere (Tripoli, Misurata, Bengasi, Derna) vennero incorporate come 19ª regione del territorio metropolitano del Regno d'Italia (Quarta Sponda), mantenendo il Territorio Militare del Sud a regime speciale.",
    };
  }

  // 2. AFRICA ORIENTALE ITALIANA (Eritrea, Etiopia, Somalia, AOI)
  if (normKey.includes('eritrea') && (owner === 'ITA' || owner === 'UK' || !normKey.includes('british'))) {
    if (step >= 8 || owner === 'UK') {
      return {
        name: 'Eritrea (Occupazione Militare Britannica — Caduta di Cheren, Asmara e Massaua)',
        adminTitle: 'British Military Administration in Eritrea (4ª e 5ª Divisione Indiana — Gen. William Platt)',
        note: "Al termine della sanguinosa Battaglia di Cheren (5 febbraio – 27 marzo 1941), dove le truppe coloniali e i granatieri italiani del generale Nicolangelo Carnimeo resistettero per 53 giorni contro la 4ª e 5ª Divisione indiana del generale William Platt, le forze britanniche occupano Asmara (1 aprile) e la base navale di Massaua (8 aprile 1941), ponendo l'Eritrea sotto amministrazione militare britannica (OETA).",
      };
    }
    return {
      name: step >= 1
        ? "Governo dell'Eritrea (Africa Orientale Italiana — Asmara / Massaua)"
        : "Colonia Eritrea (Regno d'Italia — Asmara / Massaua)",
      adminTitle: step >= 1
        ? "Governo Generale dell'AOI — Governo dell'Eritrea"
        : "Colonia del Regno d'Italia (Governatore Emilio De Bono / Pietro Badoglio)",
      note: "Colonia primogenita italiana fondata nel 1890. Capoluogo Asmara ('Piccola Roma') e base navale di Massaua sul Mar Rosso, sede del Comando Navale AOI e della flottiglia della Regia Marina (cacciatorpediniere e sommergibili); base logistica fondamentale per la campagna d'Etiopia del 1935-36.",
    };
  }

  if (
    normKey.includes('ethiopia') ||
    normKey.includes('etiopia') ||
    normKey.includes('abyssinia') ||
    normKey.includes('abissinia') ||
    normKey.includes('addis_ababa') ||
    normKey.includes('scioa') ||
    normKey.includes('amhara') ||
    normKey.includes('gondar') ||
    normKey.includes('harar') ||
    normKey.includes('galla_sidama') ||
    normKey.includes('jimma')
  ) {
    if (step >= 8 || (step >= 1 && owner === 'ETH')) {
      if (normKey.includes('amhara') || normKey.includes('gondar')) {
        return {
          name: 'Amhara e Gondar (Liberazione Etiope & Ridotta Italiana del Gen. Nasi)',
          adminTitle: "Impero d'Etiopia Restaurato (Gideon Force / Arbegnoch) & Ridotta Italiana di Gondar",
          note: "Nell'aprile 1941 l'Imperatore Haile Selassie e la Gideon Force di Orde Wingate avanzano attraverso il Gojjam verso Debra Marcos, mentre sull'Amba Alagi (Tigrai meridionale) il Viceré Amedeo di Savoia Duca d'Aosta guida l'ultima eroica resistenza prima dell'assedio finale, e a Gondar il generale Guglielmo Nasi prepara l'ultimo ridotto dell'AOI.",
        };
      }
      if (normKey.includes('galla_sidama') || normKey.includes('jimma')) {
        return {
          name: "Galla e Sidama — Gimma (Collasso dell'AOI e Avanzata Britannica da Sud)",
          adminTitle: "Impero d'Etiopia / Comando Alleato dell'Africa Orientale (Gen. Alan Cunningham)",
          note: 'Nel sud-ovest etiopico (Gimma, laghi della Rift Valley e fiume Omo) le divisioni residue italiane del generale Pietro Gazzera ripiegano sotto la pressione convergente delle colonne alleate di Cunningham e dei patrioti etiopi.',
        };
      }
      return {
        name: "Impero d'Etiopia Restaurato (Liberazione di Addis Abeba — 6 Aprile 1941)",
        adminTitle: "Ye’Ityōṗṗyā Nigūsa Negest Mengist — Negus Haile Selassie I & Gen. Alan Cunningham (OETA)",
        note: "CADUTA DI ADDIS ABEBA (6 aprile 1941): Dopo aver percorso oltre 2.700 km da Mogadiscio attraverso l'Ogaden, Jijiga, Harar (25 marzo) e Dire Dawa (29 marzo), l'11ª Divisione Africana del generale Alan Cunningham entra ad Addis Abeba il 6 aprile 1941. L'Imperatore Haile Selassie I fa ritorno sul trono salomonico (ingresso solenne il 5 maggio 1941), mentre il Viceré Amedeo di Savoia Duca d'Aosta si trincera con 7.000 uomini sull'Amba Alagi.",
      };
    }
    if (normKey.includes('amhara') || normKey.includes('gondar')) {
      return {
        name: "Governo dell'Amhara (AOI — Gondar)",
        adminTitle: "Africa Orientale Italiana — Governo dell'Amhara",
        note: "Regione montuosa settentrionale dell'AOI attorno al Lago Tana con capoluogo a Gondar, presidiata contro la guerriglia dei patrioti Arbegnoch.",
      };
    }
    if (normKey.includes('harar')) {
      return {
        name: "Governo dell'Harar (AOI — Harar)",
        adminTitle: "Africa Orientale Italiana — Governo dell'Harar",
        note: "Provincia orientale dell'altopiano etiope e nodo ferroviario di Dire Dawa sulla linea ferrata strategica Gibuti-Addis Abeba.",
      };
    }
    if (normKey.includes('galla_sidama') || normKey.includes('jimma')) {
      return {
        name: "Governo dei Galla e Sidama (AOI — Gimma)",
        adminTitle: "Africa Orientale Italiana — Governo dei Galla e Sidama",
        note: "Vasto governo meridionale dell'AOI solcato dai bacini del Nilo Azzurro e dell'Omo, ricco di risorse agricole e forestali.",
      };
    }
    if (normKey.includes('addis_ababa') || normKey.includes('scioa')) {
      return {
        name: "Governo dello Scioa (AOI — Addis Abeba)",
        adminTitle: "Africa Orientale Italiana — Capitale e Sede Vicereale",
        note: "Capitale dell'Impero dell'AOI e sede del Viceré e Governatore Generale, fulcro politico, militare e amministrativo dell'Africa Orientale.",
      };
    }
    return {
      name: step === 0
        ? "Impero d'Etiopia (Ye’Ityōṗṗyā Nigūsa Negest Mengist — Addis Abeba)"
        : "Africa Orientale Italiana (AOI — Addis Abeba / Scioa)",
      adminTitle: step === 0
        ? "Impero Sovrano d'Etiopia (Negus Haile Selassie I)"
        : (step < 3
            ? "AOI — Viceré d'Etiopia (Maresciallo Rodolfo Graziani)"
            : "AOI — Viceré d'Etiopia (Amedeo di Savoia, Duca d'Aosta)"),
      note: step === 0
        ? "Antico impero sovrano retto dal Negus Haile Selassie I, impegnato nella resistenza all'invasione coloniale italiana (Guerra d'Etiopia, 1935-1936)."
        : "Impero proclamato da Benito Mussolini il 9 maggio 1936 dal balcone di Palazzo Venezia, assegnando la corona imperiale al Re Vittorio Emanuele III. Sede del Viceré e Governatore Generale ad Addis Abeba; articolato nei governi di Scioa, Amhara, Harar, Galla e Sidama, Eritrea e Somalia.",
    };
  }

  if (
    (id === 'SO' ||
      id === 'SOM' ||
      id === '706' ||
      normKey === 'somalia' ||
      normKey.includes('mogadishu') ||
      normKey.includes('mogadiscio') ||
      (normKey.includes('somali') && (normKey.includes('ital') || owner === 'ITA'))) &&
    !normKey.includes('british') &&
    !normKey.includes('britannic') &&
    !normKey.includes('french') &&
    id !== 'UK_SOMALILAND' &&
    id !== 'BR_SOMALILAND'
  ) {
    if (step >= 8 || owner === 'UK') {
      return {
        name: 'Somalia Ex-Italiana (Occupazione Militare Britannica — Mogadiscio e Chisimaio)',
        adminTitle: 'British Military Administration in Somalia (11ª e 12ª Divisione Africana — Gen. Alan Cunningham)',
        note: "Partite dal Kenya nel gennaio-febbraio 1941, le forze del Commonwealth britannico guidate dal generale Alan Cunningham forzano la linea del fiume Giuba, occupano il porto di Chisimaio (14 febbraio) ed entrano a Mogadiscio il 25 febbraio 1941, ponendo l'intera Somalia italiana sotto amministrazione militare britannica.",
      };
    }
    return {
      name: step >= 1
        ? "Governo della Somalia (Africa Orientale Italiana — Mogadiscio)"
        : "Colonia della Somalia Italiana (Mogadiscio)",
      adminTitle: step >= 1
        ? "Governo Generale dell'AOI — Governo della Somalia"
        : "Colonia del Regno d'Italia (Capoluogo Mogadiscio)",
      note: "Possedimento italiano sull'Oceano Indiano unificato nel 1908 con l'incorporazione dell'Oltregiuba (Chisimaio) ceduto dalla Gran Bretagna nel 1924; organizzato come Governo della Somalia dell'AOI dal R.D.L. 1 giugno 1936.",
    };
  }

  // 3. SOMALIA BRITANNICA (British Somaliland)
  if (
    id === 'UK_SOMALILAND' ||
    id === 'BR_SOMALILAND' ||
    normKey.includes('british_somaliland') ||
    normKey.includes('somalia_britannica') ||
    normKey.includes('berbera') ||
    (normKey.includes('somaliland') && (owner === 'UK' || (!normKey.includes('italian') && !normKey.includes('french'))))
  ) {
    if (step >= 8) {
      return {
        name: 'British Somaliland Protectorate (Riconquista Britannica — Operazione Appearance, Berbera)',
        adminTitle: 'British Military Administration — British Somaliland Protectorate (Gov. Vincent Glenday / Brig. Arthur Chater)',
        note: "OPERAZIONE APPEARANCE (16 marzo 1941): Una forza anfibia britannica e indiana salpata da Aden sbarca a Berbera riconquistando in pochi giorni l'intero protettorato della Somalia Britannica (occupato dagli italiani nell'agosto 1940) e riaprendo i collegamenti logistici diretti verso Harar e Dire Dawa.",
      };
    }
    if (step === 7 || owner === 'ITA') {
      return {
        name: 'Somalia Britannica Occupata (Conquista Italiana — Berbera e Passo di Tug Argan)',
        adminTitle: 'Africa Orientale Italiana — Territorio Occupato della Somalia Britannica (Gen. Guglielmo Nasi)',
        note: "Conquistata dalle truppe coloniali e nazionali italiane del generale Guglielmo Nasi tra il 3 e il 19 agosto 1940 dopo lo sfondamento del Passo di Tug Argan e l'evacuazione navale britannica da Berbera; unica campagna vittoriosa dell'Asse contro un possedimento britannico senza supporto tedesco.",
      };
    }
    return {
      name: "British Somaliland Protectorate (Berbera)",
      adminTitle: step >= 6
        ? "British Crown Protectorate (Colonial Office / Governor Arthur Chater — Allerta Bellica)"
        : "British Crown Protectorate (Berbera)",
      note: step >= 6
        ? "Protettorato strategico della Corona britannica a guardia dell'accesso al Golfo di Aden e al Mar Rosso (capoluogo Berbera). A Giugno 1940, a seguito dell'entrata in guerra dell'Italia (10 giugno), il presidio britannico guidato dal tenente colonnello Arthur Chater (Somaliland Camel Corps e King's African Rifles) si trova in stato di massima allerta per la difesa delle rotte imperiali verso l'India. L'invasione italiana guidata dal Generale Guglielmo Nasi scatterà solo il 3 agosto 1940, culminando nella battaglia di Tug Argan e nella caduta di Berbera il 19 agosto."
        : "Protettorato strategico della Corona britannica a presidio dell'accesso meridionale al Golfo di Aden e al Mar Rosso (capoluogo Berbera).",
    };
  }

  // 4. CONGO BELGA & RUANDA-URUNDI
  if (
    normKey.includes('belgian_congo') ||
    normKey.includes('congo_belge') ||
    (normKey.includes('congo') && (owner === 'BEL' || normKey.includes('kinshasa') || normKey.includes('leopoldville') || normKey.includes('katanga')))
  ) {
    return {
      name: "Congo Belge (Léopoldville / Kinshasa)",
      adminTitle: "Gouvernement Général du Congo Belge (Gouverneur Général Pierre Ryckmans)",
      note: "Colossale impero coloniale belga (2,3 milioni di km²) guidato con fermezza dal Governatore Generale Pierre Ryckmans. Cuore minerario del mondo per la produzione di rame, cobalto, stagno, gomma, diamanti industriali e uranio a Shinkolobwe (Katanga). Nel maggio 1940, dopo la resa di re Leopoldo III a Bruxelles, Ryckmans rifiutò la capitolazione e mantenne il Congo saldamente alleato della Gran Bretagna e del governo belga in esilio a Londra, mobilitando la Force Publique.",
    };
  }

  if (
    normKey.includes('ruanda') ||
    normKey.includes('urundi') ||
    normKey.includes('rwanda') ||
    normKey.includes('burundi')
  ) {
    return {
      name: "Ruanda-Urundi (Mandat Belge de la Société des Nations — Usumbura)",
      adminTitle: "Territoire sous Mandat Belge de la Société des Nations (Usumbura / Kigali)",
      note: "Ex-possedimento dell'Africa Orientale Tedesca affidato al Belgio in mandato di Classe B nel 1919 e amministrato come vice-governatorato federato al Congo Belga.",
    };
  }

  // 5. COLONIE PORTOGHESI IN AFRICA (Angola, Mozambico, Guinea-Bissau, Capo Verde, São Tomé)
  if (normKey.includes('angola')) {
    return {
      name: "África Ocidental Portuguesa (Angola — Luanda)",
      adminTitle: "Império Colonial Português — Colónia de Angola (Luanda)",
      note: "Vasta colonia portoghese sull'Atlantico meridionale; ferrovia transcontinentale di Benguela (sbocco fondamentale per l'esportazione del rame e cobalto del Katanga), diamanti della Diamang nel Lunda, caffè e cotone sotto il regime dell'Estado Novo di Salazar.",
    };
  }

  if (normKey.includes('mozambique') || normKey.includes('mocambique')) {
    return {
      name: "África Oriental Portuguesa (Moçambique — Lourenço Marques / Maputo)",
      adminTitle: "Império Colonial Português — Colónia de Moçambique",
      note: "Colonia portoghese sull'Oceano Indiano con capitale Lourenço Marques e grande porto di Beira, sbocco marittimo fondamentale per le esportazioni della Rhodesia britannica e delle miniere del Transvaal sudafricano.",
    };
  }

  if (
    normKey.includes('guinea_bissau') ||
    normKey.includes('portuguese_guinea') ||
    normKey.includes('guine_portuguesa') ||
    normKey.includes('bissau')
  ) {
    return {
      name: "Guiné Portuguesa (Colónia da Guiné — Bissau)",
      adminTitle: "Império Colonial Português — Colónia da Guiné (Bissau)",
      note: "Colonia costiera portoghese in Africa occidentale incastonata tra Senegal e Guinea francese (capoluogo Bissau, porti di Bolama e Cacheu), centro di commercio dell'arachide e dell'olio di palma retto dall'Estado Novo di Salazar.",
    };
  }

  if (normKey.includes('cape_verde') || normKey.includes('cabo_verde')) {
    return {
      name: "Província de Cabo Verde (Praia / Mindelo)",
      adminTitle: "Império Colonial Português — Colónia de Cabo Verde",
      note: "Arcipelago atlantico strategico; porto carbonifero di Porto Grande a Mindelo (São Vicente) e stazione di cavi telegrafici transoceanici.",
    };
  }

  if (normKey.includes('sao_tome')) {
    return {
      name: "Província de São Tomé e Príncipe (São Tomé)",
      adminTitle: "Império Colonial Português — Colónia de São Tomé e Príncipe",
      note: "Arcipelago equatoriale nel Golfo di Guinea, piantagioni coloniali di cacao e caffè.",
    };
  }

  // 5.5 PROTETTORATO FRANCESE DEL MAROCCO (Maroc Français — Rabat, Casablanca, Fès, Marrakech, Meknès, Oujda, Agadir)
  // Territorio imperiale alawide (circa il 90% del Marocco geografico), nettamente distinto dal Protettorato Spagnolo del Marocco (Rif) a nord
  if (
    (normKey.includes('morocco') ||
     normKey.includes('maroc') ||
     normKey.includes('marocco') ||
     normKey.includes('rabat') ||
     normKey.includes('casablanca') ||
     normKey.includes('marrakech') ||
     normKey.includes('fez') ||
     normKey.includes('fes') ||
     normKey.includes('meknes') ||
     normKey.includes('oujda') ||
     normKey.includes('agadir') ||
     normKey.includes('souss') ||
     normKey.includes('cherifien')) &&
    !normKey.includes('spanish') &&
    !normKey.includes('espanol') &&
    !normKey.includes('spagnolo') &&
    !normKey.includes('rif') &&
    !normKey.includes('tetuan') &&
    !normKey.includes('tetouan') &&
    !normKey.includes('larache') &&
    !normKey.includes('xauen') &&
    !normKey.includes('chefchaouen') &&
    !normKey.includes('alhucemas') &&
    !normKey.includes('nador') &&
    owner !== 'SPR' &&
    owner !== 'SPA'
  ) {
    if (normKey.includes('casablanca')) {
      return {
        name: step >= 6 ? 'Casablanca (Maroc — Base Navale Vichy)' : 'Casablanca (Grand Port Atlantique du Maroc)',
        adminTitle: step >= 6
          ? "Protectorat du Maroc — Base Navale Atlantique de Vichy"
          : "Protectorat Français du Maroc — Grand Port de l'Atlantique & Poumon Économique",
        note: step >= 6
          ? "Metropoli atlantica e base navale di rifugio della corazzata Jean Bart (fuggita in extremis e incompleta dai cantieri di Saint-Nazaire il 19 giugno 1940); teatro del futuro scontro navale con la US Navy durante l'Operazione Torch (novembre 1942)."
          : "Principale porto commerciale e centro industriale ed economico del protettorato francese, collegato alla rete ferroviaria atlantica e alle linee minerarie dell'Office Chérifien des Phosphates.",
      };
    }
    if (normKey.includes('rabat')) {
      return {
        name: step >= 6 ? 'Rabat (Résidence Générale — Vichy)' : 'Rabat (Capitale Administrative du Protectorat)',
        adminTitle: step >= 6
          ? "Résidence Générale de France au Maroc (Général Charles Noguès — Vichy)"
          : "Résidence Générale de la République Française au Maroc (Général Charles Noguès)",
        note: "Capitale amministrativa del protettorato francese e sede della Résidence Générale nonché della corte imperiale del Sultano alawide Sidi Mohammed ben Youssef (futuro Re Mohammed V).",
      };
    }
    if (normKey.includes('fes') || normKey.includes('fez')) {
      return {
        name: 'Fès (Capitale Spirituelle et Historique du Maroc)',
        adminTitle: 'Région Civile et Militaire de Fès (Empire Chérifien / Protectorat Français)',
        note: 'Antica capitale imperiale e centro spirituale del Marocco con la storica moschea e università al-Qarawiyyin; sede della firma del Trattato di Fez del 30 marzo 1912 che istituì il protettorato francese.',
      };
    }
    if (normKey.includes('marrakech')) {
      return {
        name: 'Marrakech (Capitale du Sud Marocain)',
        adminTitle: 'Région Militaire de Marrakech (Pacha Thami El Glaoui / Protectorat Français)',
        note: "Grande città imperiale alle pendici dell'Alto Atlante; polo politico e militare del Marocco meridionale controllato dall'influente Pacha Thami El Glaoui, alleato dell'amministrazione coloniale francese.",
      };
    }
    return {
      name: step >= 6
        ? 'Protectorat du Maroc (Maroc Français — Vichy)'
        : 'Protectorat Français du Maroc (Maroc Français — Rabat)',
      adminTitle: step >= 6
        ? "Résidence Générale de France au Maroc (Général Charles Noguès — Vichy)"
        : "Résidence Générale de la République Française (Général Charles Noguès / Sultan Sidi Mohammed)",
      note: step >= 6
        ? "Protettorato francese (esteso sul 90% del territorio marocchino, distinto dal Rif spagnolo a nord). Il Résident Général Charles Noguès, comandante in capo del teatro dell'Africa del Nord, rifiutò di passare alla dissidenza con De Gaulle dopo l'armistizio del 22 giugno 1940 e mantenne il Marocco fedele al regime di Vichy sotto la sorveglianza delle commissioni d'armistizio tedesca e italiana, ospitando a Casablanca la corazzata Jean Bart fino allo sbarco alleato di Torch nel novembre 1942."
        : "Istituito con il Trattato di Fez del 30 marzo 1912 sotto sovranità imperiale alawide del Sultano Sidi Mohammed ben Youssef e tutela della Repubblica Francese (Résidence Générale a Rabat guidata dal generale Charles Noguès). Comprende la quasi totalità del territorio marocchino con le grandi città imperiali (Fès, Marrakech, Meknès), la capitale amministrativa Rabat, la metropoli industriale atlantica di Casablanca, la ferrovia dei fosfati e le divisioni coloniali dei Tirailleurs Marocains, Spahis e Goumiers dell'Armée d'Afrique.",
    };
  }

  // 5.6 DÉPARTEMENTS FRANÇAIS D'ALGÉRIE (Alger, Oran, Constantine, Territoires du Sud)
  if (
    !normKey.includes('oranienbaum') &&
    (id.startsWith('DZ') ||
      owner === 'FRA' ||
      owner === 'VIC' ||
      owner === 'F_NAF' ||
      owner === 'VIC_NAF' ||
      normKey.includes('alger') ||
      normKey.includes('mers_el_kebir')) &&
    (normKey.includes('algeria') ||
      normKey.includes('algerie') ||
      normKey.includes('algiers') ||
      (normKey.includes('oran') && !normKey.includes('oranienbaum')) ||
      normKey.includes('constantine') ||
      id.startsWith('DZ'))
  ) {
    if (normKey.includes('oran') && !normKey.includes('oranienbaum')) {
      return {
        name: step >= 6 ? 'Oran (Mers-el-Kébir — Base Navale Vichy)' : 'Oran (Département d\'Oran — Mers-el-Kébir)',
        adminTitle: step >= 6
          ? "Base Navale de Mers-el-Kébir / Préfecture d'Oran (Vichy)"
          : "Département d'Oran (République Française) — Base Navale de Mers-el-Kébir",
        note: step >= 6
          ? "Grande rada e base navale fortificata della Marine Nationale. Il 3 luglio 1940 la Royal Navy britannica (Force H dell'ammiraglio Somerville) scatenò l'Operazione Catapult affondando la corazzata Bretagne e danneggiando la Dunkerque e la Provence per impedire che la flotta cadesse in mano tedesca, causando 1.297 marinai francesi caduti."
          : "Dipartimento costiero occidentale dell'Algeria francese dotato della moderna base navale militare di Mers-el-Kébir e di un popoloso centro commerciale ed europeo.",
      };
    }
    return {
      name: step >= 6
        ? 'Départements Français d\'Algérie (Alger, Oran, Constantine — Vichy)'
        : 'Départements Français d\'Algérie (Alger, Oran, Constantine)',
      adminTitle: step >= 6
        ? "Gouvernement Général de l'Algérie (Yves Châtel / Maxime Weygand — Vichy)"
        : "Gouvernement Général de l'Algérie (Gouverneur Général Georges Le Beau — Alger)",
      note: step >= 6
        ? "Territorio metropolitano d'oltremare rimasto sotto il regime di Vichy dopo l'armistizio di Compiègne. Sotto il Governatore Yves Châtel e poi il Delegato Generale Maxime Weygand, vi vennero applicate rigidamente le leggi del governo di Vichy e l'abrogazione del decreto Crémieux fino all'Operazione Torch."
        : "Territorio metropolitano d'oltremare formalmente annesso alla Repubblica Francese e suddiviso nei tre dipartimenti di Alger (capitale Algeri), Oran e Constantine, oltre ai Territoires du Sud sahariani (XIX Corpo d'Armata). Popolazione di coloni europei (Pieds-Noirs) e truppe coloniali Zouaves, Tirailleurs Algériens e Chasseurs d'Afrique.",
    };
  }

  // 5.7 PROTETTORATO FRANCESE DI TUNISIA (Tunis, Bizerte, Sfax, Ligne Mareth)
  if (
    normKey.includes('tunisia') ||
    normKey.includes('tunisie') ||
    normKey.includes('bizerte') ||
    normKey.includes('sfax') ||
    normKey.includes('mareth')
  ) {
    if (normKey.includes('bizerte')) {
      return {
        name: step >= 6 ? 'Bizerte (Base Navale sous Contrôle d\'Armistice — Vichy)' : 'Bizerte (Base Navale Stratégique & Arsenal de Sidi Abdallah)',
        adminTitle: step >= 6
          ? "Marine Nationale à Bizerte (Commission d'Armistice Italienne CIAF)"
          : "Base Navale Majeure de la Marine Nationale dans le Détroit de Sicile",
        note: step >= 6
          ? "Arsenale e rada navale strategica sottoposta alla sorveglianza della Commissione Italiana d'Armistizio con la Francia (CIAF)."
          : "Piazzaforte e arsenale di Sidi Abdallah a presidio del canale di Sicilia di fronte alle coste italiane e a Pantelleria.",
      };
    }
    return {
      name: step >= 6
        ? 'Protectorat de Tunisie (Vichy — Tunis)'
        : 'Protectorat Français de Tunisie (Tunis)',
      adminTitle: step >= 6
        ? "Résidence Générale de France en Tunisie (Amiral Jean-Pierre Esteva — Vichy)"
        : "Résidence Générale de la République Française (Armand Guillon / Eirik Labonne — Tunis)",
      note: step >= 6
        ? "Protettorato francese sotto l'amministrazione dell'ammiraglio Jean-Pierre Esteva, fedele al maresciallo Pétain, sotto il controllo diretto della Commissione d'armistizio italiana (CIAF) e a ridosso del confine con la Libia italiana."
        : "Protettorato francese istituito con il Trattato del Bardo (1881) sotto la dinastia husseinite del Bey di Tunisi (Ahmad II Bey) e la guida del Résident Général. A sud, la Ligne Mareth fortificata presidiava il confine contro la Libia italiana.",
    };
  }

  // 5.8 AFRICA OCCIDENTALE FRANCESE (AOF — Dakar, Sénégal, Mauritanie, Soudan, Guinée, Côte d'Ivoire, Niger, Dahomey)
  if (
    normKey.includes('french_west_africa') ||
    normKey.includes('afrique_occidentale_francaise') ||
    normKey.includes('aof') ||
    normKey.includes('dakar') ||
    (normKey.includes('senegal') && !normKey.includes('british')) ||
    normKey.includes('mauritania') ||
    normKey.includes('soudan_francais') ||
    (normKey.includes('ivory_coast') && !normKey.includes('gold_coast')) ||
    normKey.includes('dahomey') ||
    normKey.includes('haute_volta')
  ) {
    const aofTop = resolveAOFToponym(id, rawName, normKey, owner, step);
    if (aofTop) return aofTop;
  }

  // 5.9 AFRICA EQUATORIALE FRANCESE & CAMERUN (AEF — Brazzaville, Tchad, Oubangui-Chari, Gabon, Moyen-Congo, Cameroun)
  if (
    normKey.includes('french_equatorial_africa') ||
    normKey.includes('afrique_equatoriale_francaise') ||
    normKey.includes('aef') ||
    normKey.includes('brazzaville') ||
    normKey.includes('tchad') ||
    normKey.includes('chad') ||
    normKey.includes('cameroun') ||
    normKey.includes('french_cameroon') ||
    normKey.includes('oubangui') ||
    normKey.includes('ubangi') ||
    (normKey.includes('congo') && (owner === 'F_AEF' || owner === 'FFL_AEF')) ||
    (normKey.includes('gabon') && (owner === 'F_AEF' || owner === 'FFL_AEF' || owner === 'VIC_AEF')) ||
    Boolean((AEF_PROVINCES_META as any)?.[id]) ||
    Boolean((AEF_PROVINCES_META as any)?.[normKey])
  ) {
    const aefTop = resolveAEFToponym(id, rawName, normKey, owner, step);
    if (aefTop) return aefTop;
  }

  if (false) {
    if (normKey.includes('gabon')) {
      if (owner === 'VIC_AEF' || (step === 6 && owner !== 'FFL_AEF')) {
        return {
          name: 'Colonie du Gabon (Vichy — Libreville)',
          adminTitle: "Gouverneur Georges Masson (Régime de Vichy — Libreville)",
          note: "Il governatore Georges Masson rifiuta il ralliement all'AEF e mantiene il Gabon fedele al regime di Vichy fino alla campagna militare condotta da Leclerc e Koenig.",
        };
      }
      return {
        name: step >= 7
          ? 'Gabon (France Libre — Libreville)'
          : 'Colonie du Gabon (AEF — Libreville)',
        adminTitle: step >= 7
          ? "Colonie du Gabon (Forces Françaises Libres — De Gaulle / Leclerc)"
          : "Gouvernement de la Colonie du Gabon (Libreville)",
        note: step >= 7
          ? "Campagna del Gabon (ottobre-novembre 1940): le Forze Francesi Libere di Leclerc e Koenig occupano Libreville e Port-Gentil, parachebrando l'unità territoriale dell'Africa Francese Libera."
          : "Colonia costiera dell'AEF affacciata sul golfo di Guinea (capoluogo Libreville e porto di Port-Gentil).",
      };
    }
    return {
      name: step >= 6
        ? 'Afrique Française Libre (AEF — Brazzaville / Tchad / Cameroun)'
        : 'Afrique-Équatoriale Française (AEF — Brazzaville)',
      adminTitle: step >= 6
        ? "Capitale de la France Libre (Félix Éboué & Edgard de Larminat — Brazzaville)"
        : "Gouvernement Général de l'AEF (Brazzaville)",
      note: step >= 6
        ? "Nell'agosto 1940 il governatore del Ciad Félix Éboué e il colonnello Leclerc compiono lo storico ralliement dell'AEF e del Camerun al generale De Gaulle; Brazzaville diviene la capitale ufficiale dell'Impero della Francia Libera, fornendo la base territoriale sovrana e le truppe coloniali per la riscossa alleata in Africa."
        : "Federazione coloniale francese dell'Africa equatoriale (capoluogo Brazzaville, affacciata sul fiume Congo di fronte a Léopoldville), comprendente Ciad, Ubanghi-Sciari, Medio Congo e Gabon, con il mandato di tutela sul Camerun.",
    };
  }

  // 5.10 MADAGASCAR & SOMALIA FRANCESE (Gibuti)
  if (normKey.includes('madagascar')) {
    return {
      name: step >= 6 ? 'Colonie de Madagascar (Vichy — Antananarivo)' : 'Colonie de Madagascar (Antananarivo)',
      adminTitle: step >= 6
        ? "Gouvernement Général de Madagascar (Armand Annet — Vichy)"
        : "Gouvernement Général de Madagascar (Antananarivo)",
      note: step >= 6
        ? "Grande isola dell'Oceano Indiano rimasta sotto il controllo di Vichy, sede della base navale fortificata di Diego Suarez (futuro teatro dell'Operazione Ironclad britannica del 1942)."
        : "Colonia francese nell'Oceano Indiano con capoluogo Antananarivo e grande base navale strategica a Diego Suarez (Antsiranana).",
    };
  }

  if (normKey.includes('french_somaliland') || normKey.includes('cote_francaise_des_somalis') || normKey.includes('djibouti') || normKey.includes('gibuti')) {
    return {
      name: step >= 6 ? 'Côte Française des Somalis (Vichy — Djibouti)' : 'Côte Française des Somalis (Djibouti)',
      adminTitle: step >= 6
        ? "Commandement de Djibouti (Général Paul Legentilhomme / Vichy)"
        : "Colonie de la Côte Française des Somalis (Djibouti)",
      note: step >= 6
        ? "Enclave strategica francese all'imbocco del Mar Rosso completamente circondata dall'Africa Orientale Italiana (AOI); rimasta leale a Vichy nonostante l'iniziale tentativo di dissidenza del generale Legentilhomme."
        : "Colonia francese sul Golfo di Tagiura e capolinea della vitale ferrovia franco-etiope verso Addis Abeba, nodo navale e mercantile cruciale per l'accesso al Mar Rosso.",
    };
  }

  // 6. POSSEDIMENTI SPAGNOLI IN AFRICA
  // 6.1 PROTETTORATO SPAGNOLO DEL MAROCCO (Zona del Rif, Yebala, Lucus, Xauen y Kert — Tetuán)
  // Striscia settentrionale costiera e montuosa, nettamente distinta dal Protettorato Francese del Marocco a sud
  if (
    normKey.includes('spanish_morocco') ||
    normKey.includes('marruecos_espanol') ||
    normKey.includes('marocco_spagnolo') ||
    (normKey.includes('rif') && !normKey.includes('tariff')) ||
    normKey.includes('tetuan') ||
    normKey.includes('tetouan') ||
    normKey.includes('larache') ||
    normKey.includes('xauen') ||
    normKey.includes('chefchaouen') ||
    normKey.includes('alhucemas') ||
    normKey.includes('nador') ||
    normKey.includes('yebala') ||
    normKey.includes('lucus') ||
    normKey.includes('kert')
  ) {
    return {
      name: "Protectorado Español de Marruecos (Zona del Rif — Tetuán)",
      adminTitle: step === 0
        ? "Segunda República Española — Alta Comisaría de España en Marruecos (Tetuán)"
        : "Bando Nacional / Estado Español — Alta Comisaría de España en Marruecos (Tetuán)",
      note: "Striscia costiera e montuosa settentrionale del Marocco (capitale Tetuán, suddivisa nei territori di Lucus, Yebala, Xauen, Rif e Kert), assegnata alla Spagna con il Trattato di Madrid del 1912 e distinta dal vasto protettorato francese. Nel luglio 1936 fu la culla dell'Alzamiento militare contro la Repubblica guidato dal generale Francisco Franco, quartier generale dell'Ejército de África e dei Regulares Indígenas che passarono lo Stretto verso la penisola iberica.",
    };
  }

  if (normKey.includes('ceuta')) {
    return {
      name: "Ceuta (Plaza de Soberanía Española)",
      adminTitle: step === 0
        ? "Segunda República Española — Plaza de Soberanía"
        : "Estado Español — Plaza de Soberanía (Base del Ejército de África)",
      note: "Città autonoma fortificata sullo Stretto di Gibilterra, perno navale e militare d'eccellenza sin dalla sovranità iberica del 1580.",
    };
  }

  if (normKey.includes('melilla')) {
    return {
      name: "Melilla (Plaza de Soberanía Española)",
      adminTitle: step === 0
        ? "Segunda República Española — Plaza de Soberanía"
        : "Estado Español — Cuna del Alzamiento del 17 de Julio de 1936",
      note: "Città fortificata sulla costa orientale del Rif dove il colonnello Seguí proclamò il primo atto della sollevazione militare nazionalista il 17 luglio 1936.",
    };
  }

  if (normKey.includes('tangier') || normKey.includes('tanger') || id === 'TANGER') {
    return {
      name: step >= 6
        ? "Tánger (Zona Ocupada Militarmente por España)"
        : "Zone Internationale de Tanger / Zona Internacional de Tánger",
      adminTitle: step >= 6
        ? "Ocupación Militar Española (Coronel Antonio Yuste — 14 de junio de 1940)"
        : "Administration Internationale de Tanger (Statut International de 1923)",
      note: step >= 6
        ? "Il 14 giugno 1940, in coincidenza con l'ingresso tedesco a Parigi, le truppe spagnole di Franco provenienti dal Rif invasero la zona internazionale smantellandone gli organi neutrali e annettendola di fatto al protettorato fino al 1945."
        : "Città e territorio a statuto speciale internazionale neutralizzato dal 1923, governato congiuntamente da Francia, Spagna, Regno Unito, Italia, Belgio, Paesi Bassi e Portogallo.",
    };
  }

  if (normKey.includes('ifni')) {
    return {
      name: "Territorio de Ifni (Sidi Ifni)",
      adminTitle: step === 0
        ? "Segunda República Española — Territorio de Ifni"
        : "Estado Español — Gobierno Político-Militar de Ifni",
      note: "Enclave costiera spagnola nel sud-ovest marocchino occupata militarmente nel 1934 dal colonnello Osvaldo Capaz, base d'appoggio per la sorveglianza delle rotte verso le Canarie.",
    };
  }

  if (
    normKey.includes('rio_de_oro') ||
    normKey.includes('spanish_sahara') ||
    normKey.includes('sahara_espanol')
  ) {
    return {
      name: "Sáhara Español (Río de Oro y Saguia el-Hamra — Villa Cisneros)",
      adminTitle: step === 0
        ? "Segunda República Española — África Occidental Española"
        : "Estado Español — África Occidental Española (Villa Cisneros / Cabo Juby)",
      note: "Possedimento coloniale sahariano spagnolo articolato in Saguia el-Hamra al nord e Río de Oro al sud (capitale Villa Cisneros, odierna Dakhla, e forte di Cabo Juby). Scalo aeropostale atlantico (Aéropostale di Saint-Exupéry).",
    };
  }

  if (
    normKey.includes('equatorial_guinea') ||
    normKey.includes('spanish_guinea') ||
    normKey.includes('guinea_espanola') ||
    normKey.includes('fernando_po') ||
    normKey.includes('rio_muni')
  ) {
    return {
      name: "Guinea Española (Territorios Españoles del Golfo de Guinea — Santa Isabel)",
      adminTitle: step === 0
        ? "Segunda República Española — Gobierno General de Guinea"
        : "Estado Español — Territorios Españoles del Golfo de Guinea",
      note: "Colonia spagnola nel Golfo di Guinea composta dall'isola di Fernando Poo (capoluogo Santa Isabel, odierna Malabo) e dal territorio continentale del Río Muni (Bata), produttrice di cacao e legnami tropicali.",
    };
  }

  // 7. LIBERIA
  if (normKey.includes('liberia') || normKey.includes('monrovia')) {
    return {
      name: "Republic of Liberia (Monrovia)",
      adminTitle: "Independent Republic of Liberia (President Edwin Barclay)",
      note: "Repubblica indipendente fondata nel 1847 da coloni afroamericani rimpatriati. Legata da stretti vincoli finanziari e strategici con gli Stati Uniti (Firestone Rubber Concession a Harbel, la più vasta piantagione di gomma naturale alleata) e sede di una fondamentale base di transito aereo per i velivoli statunitensi diretti in Europa e Medio Oriente.",
    };
  }

  return null;
}

export interface GermanyCityDef {
  nuts?: string;
  keys: string[];
  name: string;
  getAdminTitle?: (step: number) => string;
  adminTitle?: string;
  note: string;
  dynamicName?: (step: number) => string;
}

/**
 * Pulisce i toponimi tedeschi rimuovendo i suffissi e prefissi burocratici moderni
 * (es. ', Kreisfreie Stadt', ', Stadtkreis', ', Landkreis', ', Städteregion', ', Regionalverband').
 */
export function cleanGermanToponymName(raw: string): string {
  if (!raw) return '';
  let s = raw.trim();
  s = s.replace(/,\s*Kreisfreie\s+Stadt\b/i, '');
  s = s.replace(/,\s*kreisfreie\s+Stadt\b/i, '');
  s = s.replace(/,\s*Stadtkreis\b/i, '');
  s = s.replace(/,\s*Stadt\b/i, '');
  s = s.replace(/,\s*Städteregion\b/i, '');
  s = s.replace(/^Städteregion\s+/i, '');
  s = s.replace(/^Regionalverband\s+/i, '');
  s = s.replace(/,\s*Regionalverband\b/i, '');
  if (/,\s*Landkreis\b/i.test(s)) {
    s = s.replace(/,\s*Landkreis\b/i, '') + ' (Landkreis)';
  }
  return s.trim();
}

/**
 * Mappatura prefissi NUTS-3 tedeschi (DE11 - DEG0) al Gau storico e Land/Provinz d'epoca.
 */
export interface GauHistoricalInfo {
  gau: string;
  land: string;
  capital: string;
  gauleiter: string;
  role: string;
}

/**
 * Mappatura esaustiva prefissi NUTS-3 tedeschi (DE11 - DEG0) al Gau storico, Gauleiter e profilo geostorico del Terzo Reich.
 */
export function getGauAndLandByPrefix(id: string, step: number): GauHistoricalInfo {
  const p3 = id.substring(0, 3).toUpperCase();
  const p4 = id.substring(0, 4).toUpperCase();

  switch (p4) {
    case 'DE11':
      return {
        gau: 'Gau Württemberg-Hohenzollern',
        land: 'Land Württemberg (Neckarkreis)',
        capital: 'Stuttgart',
        gauleiter: 'Wilhelm Murr',
        role: "Polo mondiale della motoristica e dell'ingegneria di precisione per le forze armate del Terzo Reich (Daimler-Benz Untertürkheim e Sindelfingen, Robert Bosch GmbH, Mahle).",
      };
    case 'DE12':
      return {
        gau: step >= 6 ? 'Gau Baden-Elsass' : 'Gau Baden',
        land: 'Land Baden (Nordbaden)',
        capital: 'Karlsruhe',
        gauleiter: 'Robert Wagner',
        role: "Settore renano settentrionale fortificato dal Westwall (Linea Sigfrido). Sede di arsenali e officine motoristiche e meccaniche (Daimler-Benz Werk Mannheim, Heinrich Lanz AG trazione).",
      };
    case 'DE13':
      return {
        gau: step >= 6 ? 'Gau Baden-Elsass' : 'Gau Baden',
        land: 'Land Baden (Südbaden / Schwarzwald)',
        capital: 'Freiburg im Breisgau',
        gauleiter: 'Robert Wagner',
        role: "Baluardo meridionale del Westwall di fronte alla Linea Maginot francese e al confine svizzero (Weil am Rhein). Fabbriche d'armi Mauser a Oberndorf (fucili d'ordinanza Kar98k).",
      };
    case 'DE14':
      return {
        gau: 'Gau Württemberg-Hohenzollern',
        land: 'Land Württemberg & Hohenzollern',
        capital: 'Tübingen / Stuttgart',
        gauleiter: 'Wilhelm Murr',
        role: "Bacino strategico dell'Alta Svevia e del Lago di Costanza; polo d'eccellenza aeronavale a Friedrichshafen (Luftschiffbau Zeppelin, Maybach-Motorenbau per panzer, Dornier Flugzeugwerke, ZF Zahnradfabrik).",
      };
    case 'DE21':
      return {
        gau: 'Gau München-Oberbayern',
        land: 'Freistaat Bayern (Oberbayern)',
        capital: 'München ("Hauptstadt der Bewegung")',
        gauleiter: 'Adolf Wagner',
        role: "Centro politico ideologico della NSDAP e industria aeronautica BMW (Flugmotorenwerke Allach); rifugio montano del Führer sull'Obersalzberg (Berghof a Berchtesgaden); polo militare di Ingolstadt e truppe alpine a Garmisch.",
      };
    case 'DE22':
      return {
        gau: 'Gau Bayerische Ostmark',
        land: 'Freistaat Bayern (Niederbayern)',
        capital: 'Bayreuth / Regensburg',
        gauleiter: 'Fritz Wächtler',
        role: "Settore danubiano della Bassa Baviera a presidio della frontiera verso l'Austria e i territori boemi; snodo fluviale di Passau sul Danubio e centri logistici e agricoli.",
      };
    case 'DE23':
      return {
        gau: 'Gau Bayerische Ostmark',
        land: 'Freistaat Bayern (Oberpfalz)',
        capital: 'Regensburg',
        gauleiter: 'Fritz Wächtler',
        role: "Perno della produzione caccia della Luftwaffe (Messerschmitt AG Regensburg: montaggio in serie dei caccia Bf 109); acciaierie dell'Oberpfalz (Maxhütte) e grande poligono militare corazzato di Grafenwöhr.",
      };
    case 'DE24':
      return {
        gau: 'Gau Bayerische Ostmark',
        land: 'Freistaat Bayern (Oberfranken)',
        capital: 'Bayreuth',
        gauleiter: 'Fritz Wächtler',
        role: "Alta Franconia al confine con la Boemia e i Sudeti; sede del Gau della Bayerische Ostmark a Bayreuth (santuario wagneriano del regime), manifattura tecnica e snodi logistici.",
      };
    case 'DE25':
      return {
        gau: 'Gau Franken',
        land: 'Freistaat Bayern (Mittelfranken)',
        capital: 'Nürnberg ("Stadt der Reichsparteitage")',
        gauleiter: 'Julius Streicher',
        role: "Città dei raduni del partito NSDAP (Reichsparteitagsgelände); polo meccanico pesante MAN (motori diesel per sottomarini e panzer da combattimento), industria ottica a Fürth ed Erlangen.",
      };
    case 'DE26':
      return {
        gau: 'Gau Mainfranken',
        land: 'Freistaat Bayern (Unterfranken)',
        capital: 'Würzburg',
        gauleiter: 'Otto Hellmuth',
        role: "Epicentro strategico nazionale dei cuscinetti a sfera a Schweinfurt (Kugelfischer, Fichtel & Sachs, VKF), vitale per l'intera industria aerea e meccanica del Reich; snodo sul Meno a Würzburg.",
      };
    case 'DE27':
      return {
        gau: 'Gau Schwaben',
        land: 'Freistaat Bayern (Schwaben)',
        capital: 'Augsburg',
        gauleiter: 'Karl Wahl',
        role: "Culla dell'aviazione da caccia: stabilimenti madre della Messerschmitt AG ad Augusta (progettazione e collaudo dei Bf 109) e fabbriche di motori diesel pesanti MAN per sottomarini da guerra della Kriegsmarine.",
      };
    case 'DE30':
      return {
        gau: 'Gau Berlin',
        land: 'Reichshauptstadt Berlin',
        capital: 'Berlin',
        gauleiter: 'Joseph Goebbels',
        role: "Capitale politica e militare suprema del Terzo Reich: Cancelleria del Reich (Neue Reichskanzlei), comando OKW (Bendlerblock) e colossi industriali d'armamento ed elettrotecnica (Siemens, AEG, Borsig, Alkett).",
      };
    case 'DE40':
      return {
        gau: step >= 6 ? 'Gau Mark Brandenburg' : 'Gau Kurmark',
        land: 'Provinz Brandenburg',
        capital: 'Frankfurt an der Oder / Potsdam',
        gauleiter: 'Emil Stürtz',
        role: "Cintura industriale e difensiva di Berlino: stabilimenti aeronautici Arado e Heinkel a Oranienburg, acciaierie di Hennigsdorf e Brandenburg an der Havel, bacini minerari in Lusazia (Cottbus) e fortezze sull'Oder.",
      };
    case 'DE50':
      return {
        gau: 'Gau Weser-Ems',
        land: 'Freie Hansestadt Bremen',
        capital: 'Bremen',
        gauleiter: 'Carl Röver',
        role: "Arsenale aeronavale primario sul Weser: cantieri navali AG Weser Deschimag (costruzione di navi da battaglia e U-Boot) e stabilimenti Focke-Wulf Flugzeugbau (caccia Fw 190 e ricognitori oceanici Fw 200 Condor); porto di Wesermünde.",
      };
    case 'DE60':
      return {
        gau: 'Gau Hamburg',
        land: 'Freie und Hansestadt Hamburg',
        capital: 'Hamburg',
        gauleiter: 'Karl Kaufmann',
        role: "Massimo porto marittimo del Reich e cantiere navale d'altura Blohm & Voss (costruzione della corazzata Bismarck, incrociatori pesanti e sommergibili); raffinerie e commercio oceanico (Groß-Hamburg-Gesetz 1937).",
      };
    case 'DE71':
      return {
        gau: 'Gau Hessen-Nassau',
        land: 'Volksstaat Hessen (Darmstadt)',
        capital: 'Frankfurt am Main',
        gauleiter: 'Jakob Sprenger',
        role: "Quartier generale e stabilimenti chimici della I.G. Farben a Francoforte (polo chimico Höchst per farmaci ed esplosivi); stabilimenti automobilistici Adam Opel AG a Rüsselsheim (autocarri militari Opel Blitz).",
      };
    case 'DE72':
      return {
        gau: 'Gau Hessen-Nassau',
        land: 'Volksstaat Hessen (Gießen / Lahn)',
        capital: 'Frankfurt am Main',
        gauleiter: 'Jakob Sprenger',
        role: "Bacino metallurgico e ottico dell'Assia centrale (Ernst Leitz / Leica a Wetzlar), fucine siderurgiche di Buderus e snodo logistico dell'Assia.",
      };
    case 'DE73':
      return {
        gau: 'Gau Kurhessen',
        land: 'Provinz Hessen-Nassau (Kassel)',
        capital: 'Kassel',
        gauleiter: 'Karl Weinrich',
        role: "Polo dell'industria pesante bellica: stabilimenti Henschel & Sohn a Kassel (produzione carri armati Panzer e locomotive pesanti), officine aeronautiche Gerhard Fieseler (Fi 156 Storch) e munizionamento.",
      };
    case 'DE80':
      if (id === 'DE80L' || id === 'DE80N') {
        return {
          gau: 'Gau Pommern',
          land: 'Provinz Pommern (Vorpommern)',
          capital: 'Stettin',
          gauleiter: 'Franz Schwede-Coburg',
          role: "Provincia costiera prussiana baltica: presidio idrovolanti di Swinemünde, cantieri navali Stettiner Oderwerke, accesso all'Ostwall e basi d'addestramento navale.",
        };
      }
      return {
        gau: 'Gau Mecklenburg',
        land: 'Land Mecklenburg',
        capital: 'Schwerin',
        gauleiter: 'Friedrich Hildebrandt',
        role: "Basi costiere baltiche della Luftwaffe e cantieri navali: stabilimenti aeronautici Ernst Heinkel Flugzeugwerke a Rostock-Marienehe e Warnemünde (primi velivoli a reazione e idrovolanti).",
      };
    case 'DE91':
    case 'DE92':
      return {
        gau: 'Gau Süd-Hannover-Braunschweig',
        land: 'Land Braunschweig & Provinz Hannover',
        capital: 'Hannover',
        gauleiter: 'Hartmann Lauterbacher / Bernhard Rust',
        role: "Polo siderurgico e autarchico delle Reichswerke Hermann Göring a Salzgitter; fondazione della città industriale della Volkswagen a Fallersleben/Wolfsburg; stabilimenti Continental gomma e pneumatici ad Hannover.",
      };
    case 'DE93':
      return {
        gau: 'Gau Ost-Hannover',
        land: 'Provinz Hannover (Lüneburg)',
        capital: 'Lüneburg',
        gauleiter: 'Otto Telschow',
        role: "Brughiera di Lüneburg e polo d'addestramento corazzato della Wehrmacht di Bergen-Hohne; porto d'altura e controllo fluviale dell'Elba a Cuxhaven.",
      };
    case 'DE94':
      return {
        gau: 'Gau Weser-Ems',
        land: 'Land Oldenburg & Provinz Hannover',
        capital: 'Oldenburg',
        gauleiter: 'Carl Röver',
        role: "Piazzaforte navale primordiale del Mare del Nord: Arsenale navale della Kriegsmarine a Wilhelmshaven (cantiere Marinewerft, attracco navi da battaglia tascabili come la Graf Spee e corazzata Tirpitz); porto minerario di Emden.",
      };
    case 'DEA1':
      return {
        gau: 'Gau Essen / Gau Düsseldorf',
        land: 'Rheinprovinz (Ruhrgebiet)',
        capital: 'Essen / Düsseldorf',
        gauleiter: 'Josef Terboven (Essen) / Friedrich Karl Florian (Düsseldorf)',
        role: '"La Fucina del Terzo Reich": arsenali Krupp a Essen, acciaierie Thyssen a Duisburg (massimo porto fluviale interno), Rheinmetall-Borsig a Düsseldorf, polo chimico Bayer a Leverkusen e lame speciali a Solingen.',
      };
    case 'DEA2':
      return {
        gau: 'Gau Köln-Aachen',
        land: 'Rheinprovinz (Köln-Aachen)',
        capital: 'Köln',
        gauleiter: 'Josef Grohé',
        role: 'Fronte della Renania: baluardo fortificato del Westwall ad Aachen (Aquisgrana) a guardia delle frontiere occidentali; industria pesante lungo il Reno a Colonia (Ford-Werke, Klöckner-Humboldt-Deutz per motori diesel Deutz).',
      };
    case 'DEA3':
    case 'DEA4':
      return {
        gau: 'Gau Westfalen-Nord',
        land: 'Provinz Westfalen & Land Lippe (Münster / Detmold)',
        capital: 'Münster',
        gauleiter: 'Alfred Meyer',
        role: 'Cuore della sintesi autarchica dei carburanti per la Wehrmacht e la Luftwaffe: complessi di idrogenazione Scholven a Bottrop e Gelsenberg a Gelsenkirchen (benzina da carbone con processo Bergius-Pier).',
      };
    case 'DEA5':
      return {
        gau: 'Gau Westfalen-Süd',
        land: 'Provinz Westfalen (Arnsberg / Dortmund)',
        capital: 'Bochum / Dortmund',
        gauleiter: 'Josef Wagner',
        role: 'Siderurgia e armature pesanti: acciaierie Hoesch AG a Dortmund, corazzature del Bochumer Verein a Bochum, accumulatori speciali per sottomarini U-Boot VARTA/AFA ad Hagen.',
      };
    case 'DEB1':
    case 'DEB2':
      return {
        gau: 'Gau Moselland',
        land: 'Rheinprovinz (Koblenz / Trier)',
        capital: 'Koblenz',
        gauleiter: 'Gustav Simon',
        role: "Settore operativo della Mosella e dell'Eifel rimilitarizzato nel marzo 1936; fortezze e sbarramenti del Westwall (Treviri, Bitburg) a guardia del confine con Francia e Lussemburgo.",
      };
    case 'DEB3':
    case 'DEC0':
      return {
        gau: step >= 6 ? 'Gau Westmark' : 'Gau Saarpfalz',
        land: 'Saargebiet & Bayerische Pfalz',
        capital: 'Saarbrücken / Neustadt an der Weinstraße',
        gauleiter: 'Josef Bürckel',
        role: 'Bacino minerario carbonifero della Saar (riannesso nel 1935 al Reich); settore fortificato di Pirmasens-Zweibrücken del Westwall e colosso chimico I.G. Farben / BASF a Ludwigshafen.',
      };
    case 'DED2':
    case 'DED4':
    case 'DED5':
      return {
        gau: 'Gau Sachsen',
        land: 'Freistaat Sachsen',
        capital: 'Dresden',
        gauleiter: 'Martin Mutschmann',
        role: "Cuore industriale meccanico sassone: stabilimenti automobilistici Auto Union a Chemnitz e Zwickau (motori corazzati e aeronautici), polo meccanico di Lipsia e Dresda, miniere metallifere dell'Erzgebirge.",
      };
    case 'DEE0':
      return {
        gau: 'Gau Halle-Merseburg / Gau Magdeburg-Anhalt',
        land: 'Provinz Sachsen & Land Anhalt',
        capital: 'Dessau / Halle / Magdeburg',
        gauleiter: 'Rudolf Jordan / Rudolf Hartmann',
        role: "Centro mondiale della chimica sintetica e dei bombardieri d'assalto Junkers a Dessau (Ju 87 Stuka e Ju 88); complessi Leuna-Werke (carburante sintetico) e Buna-Werke a Schkopau (gomma sintetica); acciaierie Krupp Gruson a Magdeburgo.",
      };
    case 'DEF0':
      return {
        gau: 'Gau Schleswig-Holstein',
        land: 'Provinz Schleswig-Holstein',
        capital: 'Kiel',
        gauleiter: 'Hinrich Lohse',
        role: 'Quartier generale e piazzaforte navale della Kriegsmarine nel Baltico: arsenali Deutsche Werke Kiel e Germaniawerft (costruzione corazzate e sommergibili U-Boot), scuola navale di Mürwik a Flensburg e canale strategico di Kiel.',
      };
    case 'DEG0':
      return {
        gau: 'Gau Thüringen',
        land: 'Land Thüringen',
        capital: 'Weimar',
        gauleiter: 'Fritz Sauckel',
        role: "Polo mondiale dell'ottica militare Carl Zeiss a Jena (telemetri per corazzate e periscopi U-Boot), armi da fanteria C.G. Haenel (Schmeisser) e Sauer & Sohn a Suhl, motori aeronautici BMW a Eisenach.",
      };
    default:
      break;
  }

  // Fallback 3 caratteri
  switch (p3) {
    case 'DE1':
      return {
        gau: 'Gau Württemberg-Hohenzollern / Gau Baden',
        land: 'Südwestdeutschland',
        capital: 'Stuttgart / Karlsruhe',
        gauleiter: 'Murr / Wagner',
        role: 'Presidio industriale e difensivo del sud-ovest della Germania lungo il Reno e la Foresta Nera.',
      };
    case 'DE2':
      return {
        gau: 'Gau Bayern',
        land: 'Freistaat Bayern',
        capital: 'München / Nürnberg',
        gauleiter: 'Wagner / Streicher / Wächtler',
        role: 'Regione bavarese del Terzo Reich, industria pesante aeronavale Messerschmitt e MAN, rifugi alpini.',
      };
    case 'DE3':
      return {
        gau: 'Gau Berlin',
        land: 'Reichshauptstadt Berlin',
        capital: 'Berlin',
        gauleiter: 'Joseph Goebbels',
        role: 'Capitale e sede centrale di comando politico e militare del Terzo Reich.',
      };
    case 'DE4':
      return {
        gau: 'Gau Mark Brandenburg',
        land: 'Provinz Brandenburg',
        capital: 'Potsdam / Frankfurt (Oder)',
        gauleiter: 'Emil Stürtz',
        role: 'Cintura industriale e militare prussiana a difesa della capitale.',
      };
    case 'DE5':
      return {
        gau: 'Gau Weser-Ems',
        land: 'Freie Hansestadt Bremen',
        capital: 'Bremen',
        gauleiter: 'Carl Röver',
        role: "Cantieri navali d'alto mare Deschimag e industria aeronautica Focke-Wulf.",
      };
    case 'DE6':
      return {
        gau: 'Gau Hamburg',
        land: 'Freie und Hansestadt Hamburg',
        capital: 'Hamburg',
        gauleiter: 'Karl Kaufmann',
        role: "Grande porto commerciale ed arsenale navale d'altura Blohm & Voss.",
      };
    case 'DE7':
      return {
        gau: 'Gau Hessen-Nassau / Gau Kurhessen',
        land: 'Hessen',
        capital: 'Frankfurt / Kassel',
        gauleiter: 'Sprenger / Weinrich',
        role: "Polo dell'industria chimica I.G. Farben e degli armamenti pesanti corazzati Henschel.",
      };
    case 'DE8':
      return {
        gau: 'Gau Mecklenburg / Gau Pommern',
        land: 'Mecklenburg-Vorpommern',
        capital: 'Schwerin / Stettin',
        gauleiter: 'Hildebrandt / Schwede-Coburg',
        role: 'Basi aeree e navali baltiche e stabilimenti aeronautici Heinkel.',
      };
    case 'DE9':
      return {
        gau: 'Gau Süd-Hannover-Braunschweig / Gau Ost-Hannover / Gau Weser-Ems',
        land: 'Niedersachsen',
        capital: 'Hannover / Oldenburg',
        gauleiter: 'Lauterbacher / Telschow / Röver',
        role: "Acciaierie autarchiche Hermann Göring a Salzgitter, arsenale navale di Wilhelmshaven e poligoni d'addestramento corazzato.",
      };
    case 'DEA':
      return {
        gau: 'Gau Essen / Gau Düsseldorf / Gau Westfalen',
        land: 'Rheinland-Westfalen',
        capital: 'Essen / Düsseldorf / Münster / Dortmund',
        gauleiter: 'Terboven / Florian / Meyer / Wagner',
        role: 'Cuore minerario, siderurgico ed energetico della Ruhr (Krupp, Thyssen, benzina sintetica Scholven e Gelsenberg).',
      };
    case 'DEB':
      return {
        gau: 'Gau Moselland / Gau Saarpfalz',
        land: 'Rheinland-Pfalz',
        capital: 'Koblenz / Trier / Neustadt',
        gauleiter: 'Simon / Bürckel',
        role: 'Settore operativo della Mosella e del Westwall, polo chimico di Ludwigshafen.',
      };
    case 'DEC':
      return {
        gau: step >= 6 ? 'Gau Westmark' : 'Gau Saarpfalz',
        land: 'Saargebiet',
        capital: 'Saarbrücken',
        gauleiter: 'Josef Bürckel',
        role: 'Bacino carbonifero e siderurgico della Saar riannesso al Reich.',
      };
    case 'DED':
      return {
        gau: 'Gau Sachsen',
        land: 'Freistaat Sachsen',
        capital: 'Dresden / Leipzig',
        gauleiter: 'Martin Mutschmann',
        role: 'Polo industriale automobilistico Auto Union e meccanico della Sassonia.',
      };
    case 'DEE':
      return {
        gau: 'Gau Halle-Merseburg / Gau Magdeburg-Anhalt',
        land: 'Provinz Sachsen',
        capital: 'Dessau / Halle / Magdeburg',
        gauleiter: 'Jordan / Hartmann',
        role: 'Capitale chimica (Leuna e Buna) e bombardieri Junkers a Dessau.',
      };
    case 'DEF':
      return {
        gau: 'Gau Schleswig-Holstein',
        land: 'Provinz Schleswig-Holstein',
        capital: 'Kiel',
        gauleiter: 'Hinrich Lohse',
        role: 'Base navale principale della Kriegsmarine nel Baltico e cantieri sommergibili.',
      };
    case 'DEG':
      return {
        gau: 'Gau Thüringen',
        land: 'Land Thüringen',
        capital: 'Weimar',
        gauleiter: 'Fritz Sauckel',
        role: 'Ottica di precisione Carl Zeiss a Jena e armi da fuoco a Suhl.',
      };
    default:
      return {
        gau: 'Deutsches Reich',
        land: 'Deutsches Reich',
        capital: 'Berlin',
        gauleiter: 'Reichsleitung',
        role: 'Territorio metropolitano del Terzo Reich.',
      };
  }
}

/**
 * Catalogo delle principali città e centri industriali/militari della Germania (1936-1940)
 */
export const GERMANY_CITIES_CATALOG: GermanyCityDef[] = [
  {
    nuts: 'DE300',
    keys: ['berlin'],
    name: 'Reichshauptstadt Berlin',
    getAdminTitle: (s) => `Reichshauptstadt Berlin (Gau Berlin — ${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Regierungssitz des Deutschen Reiches — Reichskanzlei, Wilhelmstraße, Bendlerblock. Gauleiter Joseph Goebbels. Pläne für die "Welthauptstadt Germania".',
  },
  {
    nuts: 'DE212',
    keys: ['munchen', 'munich', 'monaco_di_baviera'],
    name: 'München (Hauptstadt der Bewegung)',
    getAdminTitle: (s) => `Gau München-Oberbayern — Hauptstadt der Bewegung (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Offizieller Ehrentitel seit 1935. NSDAP-Parteizentrale (Braunes Haus), Königsplatz, Führerbau. Gauleiter Adolf Wagner.',
  },
  {
    nuts: 'DE254',
    keys: ['nurnberg', 'nuremberg', 'norimberga'],
    name: 'Nürnberg (Stadt der Reichsparteitage)',
    getAdminTitle: (s) => `Gau Franken — Stadt der Reichsparteitage (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Offizieller Ehrentitel seit 1936. Austragungsort der Reichsparteitage (Zeppelinfeld, Luitpoldarena, Kongresshalle). Gauleiter Julius Streicher.',
  },
  {
    nuts: 'DE271',
    keys: ['augsburg'],
    name: 'Augsburg (Messerschmitt AG)',
    getAdminTitle: (s) => `Gau Schwaben — Regierungsbezirk Schwaben (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Zentrum der deutschen Luftrüstung (Messerschmitt AG Werk Haunstetten: Bf 109, Me 210) und MAN Dieselmotorenbau für U-Boote. Gauleiter Karl Wahl.',
  },
  {
    nuts: 'DE215',
    keys: ['berchtesgaden', 'obersalzberg', 'berchtesgadener_land'],
    name: 'Berchtesgaden (Obersalzberg)',
    getAdminTitle: (s) => `Gau München-Oberbayern — Führersperrgebiet (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Führersperrgebiet Obersalzberg: Berghof (Hitlers Privatsitz), Mooslahnerkopf und Kehlsteinhaus (Teehaus).',
  },
  {
    nuts: 'DEA13',
    keys: ['essen'],
    name: 'Essen (Krupp-Werke)',
    getAdminTitle: (s) => `Gau Essen — Waffenschmiede des Reiches (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Schwerpunkt der deutschen Rüstungs- und Artillerieproduktion (Friedrich Krupp AG). Gauleiter Josef Terboven.',
  },
  {
    nuts: 'DEA12',
    keys: ['duisburg'],
    name: 'Duisburg (Ruhrort)',
    getAdminTitle: (s) => `Gau Düsseldorf — Rheinprovinz (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Größter Binnenhafen der Welt und Montanzentrum (August-Thyssen-Hütte Hamborn).',
  },
  {
    nuts: 'DEA11',
    keys: ['dusseldorf'],
    name: 'Düsseldorf',
    getAdminTitle: (s) => `Gau Düsseldorf — Rheinprovinz (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Verwaltungszentrum der rheinisch-westfälischen Wirtschaft und Rüstungsindustrie (Rheinmetall-Borsig AG). Gauleiter Friedrich Karl Florian.',
  },
  {
    nuts: 'DEA23',
    keys: ['koln', 'cologne'],
    name: 'Köln',
    getAdminTitle: (s) => `Gau Köln-Aachen — Rheinprovinz (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Rheinische Metropole und Industriezentrum (Ford-Werke, Klöckner-Humboldt-Deutz Motorenbau). Gauleiter Josef Grohé.',
  },
  {
    nuts: 'DEA22',
    keys: ['bonn'],
    name: 'Bonn',
    getAdminTitle: (s) => `Gau Köln-Aachen — Rheinprovinz (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Universitäts- und Kulturstadt an der Rheinschiene.',
  },
  {
    nuts: 'DEA2D',
    keys: ['aachen', 'stadteregion_aachen'],
    name: 'Aachen',
    getAdminTitle: (s) => `Gau Köln-Aachen — Rheinprovinz (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Westwall-Frontstadt und historische Kaiserstadt Karls des Großen.',
  },
  {
    nuts: 'DEA52',
    keys: ['dortmund'],
    name: 'Dortmund (Hoesch-Werke)',
    getAdminTitle: (s) => `Gau Westfalen-Süd — Provinz Westfalen (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Montan- und Rüstungszentrum des östlichen Ruhrgebiets (Hoesch AG, Dortmunder Union).',
  },
  {
    nuts: 'DEA32',
    keys: ['gelsenkirchen'],
    name: 'Gelsenkirchen (Gelsenberg-Hydrierwerk)',
    getAdminTitle: (s) => `Gau Westfalen-Nord — Provinz Westfalen (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Zentrum der synthetischen Treibstoffproduktion aus Steinkohle (Gelsenberg Benzin AG).',
  },
  {
    nuts: 'DEA51',
    keys: ['bochum'],
    name: 'Bochum',
    getAdminTitle: (s) => `Gau Westfalen-Süd — Provinz Westfalen (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Bochumer Verein für Gussstahlfabrikation (Panzerfertigung und Schwerartillerie).',
  },
  {
    nuts: 'DEA1A',
    keys: ['wuppertal'],
    name: 'Wuppertal',
    getAdminTitle: (s) => `Gau Düsseldorf — Rheinprovinz (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Bergische Industriestadt, Chemie- und Pharmawerk der I.G. Farben (Bayer Elberfeld).',
  },
  {
    nuts: 'DEA19',
    keys: ['solingen'],
    name: 'Solingen (Klingenstadt)',
    getAdminTitle: (s) => `Gau Düsseldorf — Rheinprovinz (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Traditionelles Zentrum der Klingen-, Blankwaffen- und Schneidwarenindustrie.',
  },
  {
    nuts: 'DE600',
    keys: ['hamburg', 'amburgo'],
    name: 'Freie und Hansestadt Hamburg',
    getAdminTitle: (s) => `Gau Hamburg — Groß-Hamburg (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Führender deutscher Überseehafen und Werftstandort: Blohm & Voss (Schlachtschiff Bismarck, U-Boote). Groß-Hamburg-Gesetz vom 1. April 1937. Gauleiter Karl Kaufmann.',
  },
  {
    nuts: 'DE501',
    keys: ['bremen', 'brema'],
    name: 'Freie Hansestadt Bremen',
    getAdminTitle: (s) => `Gau Weser-Ems — Hansestadt Bremen (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Seehafen an der Weser, Deschimag AG Weser Werft, Focke-Wulf Flugzeugbau.',
  },
  {
    nuts: 'DE502',
    keys: ['bremerhaven', 'wesermunde'],
    name: 'Wesermünde (Bremerhaven)',
    getAdminTitle: (s) => `Gau Weser-Ems — Provinz Hannover (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: '1939 durch Zusammenlegung von Wesermünde und Bremerhaven gebildete preußische kreisfreie Hafenstadt.',
  },
  {
    nuts: 'DEF02',
    keys: ['kiel'],
    name: 'Kiel (Kriegsmarine-Hauptstützpunkt)',
    getAdminTitle: (s) => `Gau Schleswig-Holstein — Provinz Schleswig-Holstein (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Hauptstützpunkt und Marinestation der Ostsee der Kriegsmarine; Deutsche Werke Kiel und Germaniawerft (U-Boot- und Kriegsschiffbau).',
  },
  {
    nuts: 'DEF03',
    keys: ['lubeck', 'lubecca'],
    name: 'Hansestadt Lübeck',
    getAdminTitle: (s) => s === 0
      ? 'Freie und Hansestadt Lübeck (Deutsches Reich)'
      : 'Provinz Schleswig-Holstein (Groß-Hamburg-Gesetz 1937 — Großdeutsches Reich)',
    note: 'Bis zum Groß-Hamburg-Gesetz 1937 Freie und Hansestadt Lübeck, danach in die preußische Provinz Schleswig-Holstein eingegliedert.',
  },
  {
    nuts: 'DEF01',
    keys: ['flensburg'],
    name: 'Flensburg (Marineschule Mürwik)',
    getAdminTitle: (s) => `Gau Schleswig-Holstein — Provinz Schleswig-Holstein (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Kriegsmarine-Offiziersschule Mürwik und Torpedostation an der Flensburger Förde.',
  },
  {
    nuts: 'DE945',
    keys: ['wilhelmshaven'],
    name: 'Wilhelmshaven (Kriegsmarinewerft)',
    getAdminTitle: (s) => `Gau Weser-Ems — Land Oldenburg (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Hauptkriegshafen der Nordsee, Kriegsmarinewerft Wilhelmshaven (Schlachtschiffe Scharnhorst und Tirpitz).',
  },
  {
    nuts: 'DE803',
    keys: ['rostock'],
    name: 'Rostock (Heinkel-Flugzeugwerke)',
    getAdminTitle: (s) => `Gau Mecklenburg — Land Mecklenburg (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Hauptsitz der Ernst Heinkel Flugzeugwerke (He 111, Erstflug He 178 Turbostrahlflugzeug August 1939) und Arado-Flugzeugwerke.',
  },
  {
    nuts: 'DE804',
    keys: ['schwerin'],
    name: 'Schwerin',
    getAdminTitle: (s) => `Gau Mecklenburg — Landeshauptstadt (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Hauptstadt des Landes Mecklenburg, Sitz des Reichsstatthalters und Gauleiters Friedrich Hildebrandt.',
  },
  {
    nuts: 'DE80L',
    keys: ['vorpommern_rugen', 'stralsund', 'rugen'],
    name: 'Vorpommern (Stralsund / Rügen)',
    getAdminTitle: (s) => `Provinz Pommern — Gau Pommern (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Regierungsbezirk Stralsund / Stettin; Seebad Prora (KdF-Seebad Rügen).',
  },
  {
    nuts: 'DE80N',
    keys: ['vorpommern_greifswald', 'greifswald', 'peenemunde', 'usedom'],
    name: 'Vorpommern (Peenemünde / Usedom)',
    getAdminTitle: (s) => `Provinz Pommern — Gau Pommern (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Heeresversuchsanstalt Peenemünde auf Usedom (Wernher von Braun, Walter Dornberger, Entwicklung der A4/V2 Raketen ab 1936/1937).',
  },
  {
    nuts: 'DE929',
    keys: ['hannover'],
    name: 'Hannover',
    getAdminTitle: (s) => `Gau Süd-Hannover-Braunschweig — Provinz Hannover (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Hauptstadt der Provinz Hannover, Industriezentrum (Hanomag Lokomotiven/Militärfahrzeuge, Continental AG).',
  },
  {
    nuts: 'DE911',
    keys: ['braunschweig'],
    name: 'Braunschweig',
    getAdminTitle: (s) => `Gau Süd-Hannover-Braunschweig — Land Braunschweig (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Landeshauptstadt des Freistaates Braunschweig (MIAG Mühlenbau und Industrie AG, Flugzeugbau).',
  },
  {
    nuts: 'DE912',
    keys: ['salzgitter'],
    name: 'Salzgitter (Reichswerke Hermann Göring)',
    getAdminTitle: (s) => `Gau Süd-Hannover-Braunschweig (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Am 15. Juli 1937 gegründeter Großindustriekomplex der Reichswerke Hermann Göring zur Verhüttung heimischer Eisenerze.',
  },
  {
    nuts: 'DE913',
    keys: ['wolfsburg', 'stadt_des_kdf_wagens', 'kdf_wagen'],
    name: 'Stadt des KdF-Wagens (Wolfsburg)',
    getAdminTitle: (s) => `Gau Süd-Hannover-Braunschweig (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Am 26. Mai 1938 von Adolf Hitler gegründete Modellstadt bei Fallersleben zur Produktion des KdF-Wagens (Volkswagenwerk).',
  },
  {
    nuts: 'DE712',
    keys: ['frankfurt_am_main', 'frankfurt'],
    name: 'Frankfurt am Main',
    getAdminTitle: (s) => `Gau Hessen-Nassau — Provinz Hessen-Nassau (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Finanz- und Industriemetropole am Main, Hauptverwaltung der I.G. Farbenindustrie AG (I.G.-Farben-Haus).',
  },
  {
    nuts: 'DE403',
    keys: ['frankfurt_oder'],
    name: 'Frankfurt an der Oder',
    getAdminTitle: (s) => `Gau Mark Brandenburg — Provinz Brandenburg (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Regierungssitz des Regierungsbezirks Frankfurt an der Oder in der Neumark.',
  },
  {
    nuts: 'DE404',
    keys: ['potsdam'],
    name: 'Potsdam',
    getAdminTitle: (s) => `Gau Mark Brandenburg — Provinz Brandenburg (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Historische preußische Residenzstadt, Garnisonkirche (Schauplatz des "Tages von Potsdam" 1933).',
  },
  {
    nuts: 'DE711',
    keys: ['darmstadt'],
    name: 'Darmstadt',
    getAdminTitle: (s) => `Gau Hessen-Nassau — Volksstaat Hessen (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Landeshauptstadt des Volksstaates Hessen, Zentrum der Feinchemie und Pharmazeutik (Merck).',
  },
  {
    nuts: 'DE714',
    keys: ['wiesbaden'],
    name: 'Wiesbaden',
    getAdminTitle: (s) => `Gau Hessen-Nassau — Provinz Hessen-Nassau (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Regierungssitz des Regierungsbezirks Wiesbaden, Kurstadt.',
  },
  {
    nuts: 'DE731',
    keys: ['kassel'],
    name: 'Kassel (Henschel-Werke)',
    getAdminTitle: (s) => `Gau Kurhessen — Provinz Hessen-Nassau (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Rüstungs- und Lokomotivmetropole (Henschel & Sohn: Panzer, Flugmotoren, Lokomotiven). Gauleiter Karl Weinrich.',
  },
  {
    nuts: 'DE111',
    keys: ['stuttgart'],
    name: 'Stuttgart (Stadt der Auslandsdeutschen)',
    getAdminTitle: (s) => `Gau Württemberg-Hohenzollern — Land Württemberg (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Offizieller Ehrentitel 1936. Industriemetropole (Daimler-Benz Untertürkheim, Robert Bosch GmbH). Gauleiter Wilhelm Murr.',
  },
  {
    nuts: 'DE122',
    keys: ['karlsruhe'],
    name: 'Karlsruhe',
    getAdminTitle: (s) => s >= 6
      ? 'Gau Baden-Elsass — Land Baden (Großdeutsches Reich)'
      : `Gau Baden — Land Baden (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Hauptstadt des Landes Baden, Sitz des Reichsstatthalters Robert Wagner. Ab 1940 Gau Baden-Elsass.',
  },
  {
    nuts: 'DE126',
    keys: ['mannheim'],
    name: 'Mannheim',
    getAdminTitle: (s) => s >= 6
      ? 'Gau Baden-Elsass — Land Baden (Großdeutsches Reich)'
      : `Gau Baden — Land Baden (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Großer Industriehafen am Zusammenfluss von Rhein und Neckar (Daimler-Benz Werk Mannheim, Heinrich Lanz AG Traktorenbau).',
  },
  {
    nuts: 'DE147',
    keys: ['bodenseekreis', 'friedrichshafen'],
    name: 'Friedrichshafen am Bodensee',
    getAdminTitle: (s) => `Gau Württemberg-Hohenzollern — Land Württemberg (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Luftfahrt- und Hochpräzisionszentrum: Luftschiffbau Zeppelin, Maybach-Motorenbau, Dornier Flugzeugwerke, Zahnradfabrik Friedrichshafen.',
  },
  {
    nuts: 'DEB11',
    keys: ['koblenz'],
    name: 'Koblenz',
    getAdminTitle: (s) => `Gau Moselland — Rheinprovinz (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Sitz des Oberpräsidiums der Rheinprovinz. Remilitarisierung des Rheinlandes am 7. März 1936.',
  },
  {
    nuts: 'DEB21',
    keys: ['trier'],
    name: 'Trier',
    getAdminTitle: (s) => `Gau Moselland — Rheinprovinz (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Römerstadt an der Mosel im Vorfeld des Westwalls.',
  },
  {
    nuts: 'DEB34',
    keys: ['ludwigshafen'],
    name: 'Ludwigshafen am Rhein (I.G. Farben)',
    getAdminTitle: (s) => s >= 6
      ? 'Gau Westmark — Bayerische Pfalz (Großdeutsches Reich)'
      : `Gau Saarpfalz — Bayerische Pfalz (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Hauptwerk der I.G. Farbenindustrie (Werk Oppau und Ludwigshafen — Ammoniaksynthese Haber-Bosch, Buna-Kautschuk).',
  },
  {
    nuts: 'DEB35',
    keys: ['mainz'],
    name: 'Mainz',
    getAdminTitle: (s) => `Gau Hessen-Nassau — Volksstaat Hessen (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Gutenbergstadt am Rhein, Festungs- und Garnisonsstadt.',
  },
  {
    nuts: 'DEC01',
    keys: ['saarbrucken', 'saarland'],
    name: 'Saarbrücken (Saargebiet)',
    getAdminTitle: (s) => s >= 6
      ? 'Gau Westmark — Saargebiet (Großdeutsches Reich)'
      : `Gau Saarpfalz — Saargebiet (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Am 1. März 1935 nach dem Völkerbund-Plebiszit feierlich in das Deutsche Reich rückgegliedert. Völklinger Hütte und Saargruben.',
  },
  {
    nuts: 'DEC04',
    keys: ['saarlouis', 'saarlautern'],
    name: 'Saarlautern (Saarlouis)',
    getAdminTitle: (s) => s >= 6
      ? 'Gau Westmark — Saargebiet (Großdeutsches Reich)'
      : `Gau Saarpfalz — Saargebiet (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Am 13. Januar 1936 von den nationalsozialistischen Behörden in "Saarlautern" umbenannt, um französische Reminiszenzen an Ludwig XIV. zu tilgen.',
  },
  {
    nuts: 'DED21',
    keys: ['dresden', 'dresda'],
    name: 'Dresden',
    getAdminTitle: (s) => `Gau Sachsen — Freistaat Sachsen (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Landeshauptstadt Sachsen, "Elbflorenz", Kunst- und Kulturmetropole. Gauleiter Martin Mutschmann.',
  },
  {
    nuts: 'DED51',
    keys: ['leipzig', 'lipsia'],
    name: 'Leipzig',
    getAdminTitle: (s) => `Gau Sachsen — Freistaat Sachsen (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Sitz des Reichsgerichts, Internationale Mustermesse, Weltzentrum des Verlagswesens und Buchdrucks.',
  },
  {
    nuts: 'DED41',
    keys: ['chemnitz'],
    name: 'Chemnitz (Auto Union AG)',
    getAdminTitle: (s) => `Gau Sachsen — Freistaat Sachsen (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Sächsisches Industrie- und Maschinenbauzentrum, Konzernsitz der Auto Union AG.',
  },
  {
    nuts: 'DED45',
    keys: ['zwickau'],
    name: 'Zwickau (Horch / Audi)',
    getAdminTitle: (s) => `Gau Sachsen — Freistaat Sachsen (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Automobilproduktionsstandort der Auto Union (Horch- und Audi-Werke).',
  },
  {
    nuts: 'DEE02',
    keys: ['halle_saale', 'halle'],
    name: 'Halle an der Saale',
    getAdminTitle: (s) => `Gau Halle-Merseburg — Provinz Sachsen (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Gauhauptstadt und wirtschaftliches Drehkreuz des mitteldeutschen Braunkohle- und Chemiereviers.',
  },
  {
    nuts: 'DEE0B',
    keys: ['saalekreis', 'leuna', 'merseburg'],
    name: 'Leuna / Merseburg (Leuna-Werke)',
    getAdminTitle: (s) => `Gau Halle-Merseburg — Provinz Sachsen (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Leuna-Werke der I.G. Farben: Weltgrößtes Synthesewerk für Treibstoffe (Kohlehydrierung nach Bergius) und Stickstoffdünger.',
  },
  {
    nuts: 'DEE03',
    keys: ['magdeburg'],
    name: 'Magdeburg (Krupp Grusonwerk)',
    getAdminTitle: (s) => `Gau Magdeburg-Anhalt — Provinz Sachsen (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Großes Rüstungszentrum: Krupp Grusonwerk (Panzerproduktion) und Brabag Synthesewerk.',
  },
  {
    nuts: 'DEE01',
    keys: ['dessau_rosslau', 'dessau'],
    name: 'Dessau (Junkers Flugzeugwerke)',
    getAdminTitle: (s) => `Gau Magdeburg-Anhalt — Land Anhalt (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Hauptwerk der Junkers Flugzeug- und Motorenwerke AG: Serienbau der Ju 52, Ju 87 Stuka und Ju 88.',
  },
  {
    nuts: 'DEG05',
    keys: ['weimar'],
    name: 'Weimar',
    getAdminTitle: (s) => `Gau Thüringen — Landeshauptstadt (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Kultur- und Landeshauptstadt Thüringens, Sitz des Gauleiters Fritz Sauckel. Bau des monumentalen Gauforums Weimar.',
  },
  {
    nuts: 'DEG01',
    keys: ['erfurt'],
    name: 'Erfurt',
    getAdminTitle: (s) => `Gau Thüringen — Regierungsbezirk Erfurt (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Großstadt Thüringens, Maschinenbau- und Rüstungsbetriebe.',
  },
  {
    nuts: 'DEG03',
    keys: ['jena'],
    name: 'Jena (Carl Zeiss & Schott)',
    getAdminTitle: (s) => `Gau Thüringen — Land Thüringen (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Weltzentrum der Hochpräzisionsoptik und Feinmechanik: Carl Zeiss Werke und Jenaer Glaswerk Schott & Gen. (Militäroptik für die Wehrmacht).',
  },
  {
    nuts: 'DEG04',
    keys: ['suhl'],
    name: 'Suhl (Waffenstadt Suhl)',
    getAdminTitle: (s) => `Gau Thüringen — Provinz Sachsen (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Traditionelle "Waffenstadt": Fertigungszentrum für Handfeuerwaffen, Mauser-Karabiner und Maschinengewehre (Haenel, Sauer & Sohn, Walther, Krieghoff).',
  },
  {
    nuts: 'DE264',
    keys: ['schweinfurt'],
    name: 'Schweinfurt (Kugellager-Zentrum)',
    getAdminTitle: (s) => `Gau Mainfranken — Freistaat Bayern (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Weltzentrum der Wälzlager- und Präzisionskugellager-Industrie (Kugelfischer FAG, VKF/SKF, Fichtel & Sachs). Unverzichtbares Nadelöhr für Flugzeugmotoren und Panzer der Wehrmacht.',
  },
  {
    nuts: 'DE221',
    keys: ['regensburg'],
    name: 'Regensburg (Messerschmitt GmbH)',
    getAdminTitle: (s) => `Gau Bayerische Ostmark — Freistaat Bayern (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Produktionsschwerpunkt der Messerschmitt GmbH: Großserienbau des Standard-Jagdflugzeugs Messerschmitt Bf 109.',
  },
  {
    nuts: 'DE242',
    keys: ['bayreuth'],
    name: 'Bayreuth (Gauhauptstadt)',
    getAdminTitle: (s) => `Gau Bayerische Ostmark — Gauhauptstadt (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Gauhauptstadt der Bayerischen Ostmark, Sitz des Gauleiters Fritz Wächtler. Wagner-Festspielstadt unter persönlicher Schirmherrschaft Hitlers.',
  },
  {
    nuts: 'DEA53',
    keys: ['hagen'],
    name: 'Hagen (AFA U-Boot-Batterien)',
    getAdminTitle: (s) => `Gau Westfalen-Süd — Provinz Westfalen (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Stammsitz der Akkumulatoren-Fabrik AG (AFA / VARTA, Familie Quandt): Exklusiver Hersteller der Hochleistungs-Doppelzellenbatterien für die U-Boote der Kriegsmarine.',
  },
  {
    nuts: 'DEA31',
    keys: ['bottrop'],
    name: 'Bottrop (Hydrierwerk Scholven)',
    getAdminTitle: (s) => `Gau Westfalen-Nord — Ruhrgebiet (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Strategisches Großsynthesewerk zur Erzeugung von Flugbenzin aus Steinkohle nach dem Bergius-Pier-Verfahren.',
  },
  {
    nuts: 'DE211',
    keys: ['ingolstadt'],
    name: 'Ingolstadt (DKW / Auto Union)',
    getAdminTitle: (s) => `Gau München-Oberbayern — Freistaat Bayern (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Bayerisches Industrie- und Militärzentrum, Standorte der Heeres-Munitionsanstalten und Werkstätten der Auto Union.',
  },
  {
    nuts: 'DE402',
    keys: ['cottbus'],
    name: 'Cottbus (Chóśebuz)',
    getAdminTitle: (s) => s >= 6 ? 'Gau Mark Brandenburg — Niederlausitz' : 'Gau Kurmark — Provinz Brandenburg',
    note: 'Knotenpunkt der Niederlausitz mit Braunkohlengruben, Flugplatz der Luftwaffe und Textilmanufakturen.',
  },
  {
    nuts: 'DE933',
    keys: ['luneburg', 'lueneburg'],
    name: 'Lüneburg (Gauhauptstadt)',
    getAdminTitle: (s) => `Gau Ost-Hannover — Provinz Hannover (${s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich'})`,
    note: 'Gauhauptstadt des Gaus Ost-Hannover, Sitz des Gauleiters Otto Telschow. Historische Salz- und Garnisonsstadt.',
  },
];

/**
 * Risoluzione toponomastica, istituzionale e temporale dettagliata per la Germania e territori annessi (1936-1940)
 */
export function resolveGermanyToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;
  const nationalEntity = step === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich';

  // 1. Cerca match tra le città e centri catalogati
  let foundCity: GermanyCityDef | undefined;
  if (id.startsWith('DE')) {
    foundCity = GERMANY_CITIES_CATALOG.find((c) => c.nuts === id);
  }

  if (!foundCity) {
    const normTokens = normKey.split('_').filter(Boolean);
    for (const c of GERMANY_CITIES_CATALOG) {
      if (c.keys.some((k) => normKey === k || normTokens.includes(k) || (k.length >= 5 && normKey.includes(k)))) {
        foundCity = c;
        break;
      }
    }
  }

  if (foundCity) {
    const c = foundCity;
    const name = c.dynamicName ? c.dynamicName(step) : c.name;
    const adminTitle = c.getAdminTitle
      ? c.getAdminTitle(step)
      : (c.adminTitle || `${name} (Terzo Reich — ${nationalEntity})`);
    const note = c.note
      ? `${c.note} [Terzo Reich — ${nationalEntity}]`
      : `Polo strategico del Terzo Reich (${nationalEntity}).`;
    return {
      name,
      adminTitle,
      note,
    };
  }

  // 2. Se è un codice distrettuale tedesco NUTS-3 (DE101 - DEG0P), pulizia accurata e derivazione Gau
  if (id.startsWith('DE')) {
    const cleanedName = cleanGermanToponymName(rawName) || rawName;
    const gauInfo = getGauAndLandByPrefix(id, step);
    const regLabel = step === 0 ? 'Deutsches Reich (Terzo Reich)' : 'Großdeutsches Reich (Terzo Reich)';
    return {
      name: cleanedName,
      adminTitle: `${gauInfo.gau} — ${gauInfo.land} (${regLabel})`,
      note: `Distretto territoriale del Terzo Reich (${nationalEntity}) nel ${gauInfo.gau} [Capoluogo: ${gauInfo.capital}, Gauleiter: ${gauInfo.gauleiter}]. ${gauInfo.role}`,
    };
  }

  // 3. Austria annessa (Reichsgaue der Ostmark) da Step >= 1 (März 1938)
  if (owner === 'GER' && (id.startsWith('AT') || normKey.includes('osterreich') || normKey.includes('austria') || normKey.includes('wien') || normKey.includes('vienna'))) {
    if (id.startsWith('AT13') || normKey.includes('wien') || normKey.includes('vienna')) {
      return {
        name: 'Wien (Groß-Wien)',
        adminTitle: 'Reichsgau Wien (Alpen- und Donau-Reichsgaue)',
        note: 'Reichsgau Wien nach der Bildung von Groß-Wien 1938. Gauleiter Odilo Globocnik / Baldur von Schirach.',
      };
    }
    if (id.startsWith('AT12') || normKey.includes('niederosterreich') || normKey.includes('krems')) {
      return {
        name: 'Niederdonau',
        adminTitle: 'Reichsgau Niederdonau (Sitz Krems an der Donau)',
        note: 'Reichsgau Niederdonau (Alpen- und Donau-Reichsgaue). Gauleiter Hugo Jury.',
      };
    }
    if (id.startsWith('AT31') || normKey.includes('oberosterreich') || normKey.includes('linz')) {
      return {
        name: 'Oberdonau (Linz)',
        adminTitle: 'Reichsgau Oberdonau — Patenstadt des Führers',
        note: 'Reichsgau Oberdonau. Industriekomplex der Reichswerke Hermann Göring Linz. Gauleiter August Eigruber.',
      };
    }
    if (id.startsWith('AT22') || normKey.includes('steiermark') || normKey.includes('graz')) {
      return {
        name: 'Steiermark (Graz)',
        adminTitle: 'Reichsgau Steiermark (Alpen- und Donau-Reichsgaue)',
        note: 'Reichsgau Steiermark. Gauleiter Sigfried Uiberreither.',
      };
    }
    if (id.startsWith('AT21') || normKey.includes('karnten') || normKey.includes('klagenfurt')) {
      return {
        name: 'Kärnten (Klagenfurt)',
        adminTitle: 'Reichsgau Kärnten (Alpen- und Donau-Reichsgaue)',
        note: 'Reichsgau Kärnten. Gauleiter Franz Kutschera.',
      };
    }
    if (id.startsWith('AT32') || normKey.includes('salzburg')) {
      return {
        name: 'Salzburg',
        adminTitle: 'Reichsgau Salzburg (Alpen- und Donau-Reichsgaue)',
        note: 'Reichsgau Salzburg. Gauleiter Friedrich Rainer.',
      };
    }
    if (id.startsWith('AT33') || id.startsWith('AT34') || normKey.includes('tirol') || normKey.includes('innsbruck') || normKey.includes('vorarlberg')) {
      return {
        name: 'Tirol-Vorarlberg (Innsbruck)',
        adminTitle: 'Reichsgau Tirol-Vorarlberg (Alpen- und Donau-Reichsgaue)',
        note: 'Reichsgau Tirol-Vorarlberg. Gauleiter Franz Hofer.',
      };
    }
    if (id.startsWith('AT11') || normKey.includes('burgenland')) {
      return {
        name: 'Burgenland',
        adminTitle: 'Reichsgaue Niederdonau und Steiermark',
        note: 'Das Burgenland wurde 1938 aufgelöst und zwischen den Reichsgauen Niederdonau und Steiermark aufgeteilt.',
      };
    }
    return {
      name: rawName,
      adminTitle: 'Alpen- und Donau-Reichsgaue (Ostmark — Großdeutsches Reich)',
      note: 'Territorium der ehemaligen Republik Österreich nach dem Anschluss vom März 1938.',
    };
  }

  // 4. Memelland da Step >= 3 (März 1939)
  if (owner === 'GER' && (id === 'LT023' || normKey.includes('memel') || normKey.includes('klaipeda'))) {
    return {
      name: 'Kreis Memel',
      adminTitle: 'Provinz Ostpreußen (Großdeutsches Reich)',
      note: 'Am 22. März 1939 durch deutsch-litauischen Staatsvertrag an das Deutsche Reich rückgegliedert.',
    };
  }

  // 5. Entità nazionale 'Deutschland' / 'Germany'
  if (
    normKey.includes('deutschland') ||
    normKey.includes('germany') ||
    normKey === 'deutsches_reich' ||
    normKey === 'germania' ||
    normKey === 'allemagne'
  ) {
    if (step === 0) {
      return {
        name: 'Deutsches Reich',
        adminTitle: 'Deutsches Reich (Hauptstadt Berlin)',
        note: 'Deutsches Reich in den Grenzen von 1935 nach der Rückgliederung des Saargebiets. Reichskanzler Adolf Hitler.',
      };
    }
    return {
      name: 'Großdeutsches Reich',
      adminTitle: 'Großdeutsches Reich (Führer und Reichskanzler Adolf Hitler)',
      note: 'Deutsches Reich nach dem Anschluss Österreichs (März 1938) und der weiteren territorialen Expansion.',
    };
  }

  return null;
}

export interface ItalyProvDef {
  nuts: string;
  name: string;
  keys: string[];
  adminTitle?: string;
  note?: string;
  dynamicName?: (step: number) => string;
  dynamicAdminTitle?: (step: number) => string;
  dynamicNote?: (step: number) => string;
}

export const ITALY_PROVINCES_CATALOG: ItalyProvDef[] = [
  // ================= PIEMONTE (8) =================
  {
    nuts: 'ITC11',
    name: 'Provincia di Torino',
    keys: ['torino', 'turin', 'piemonte'],
    adminTitle: "Regno d'Italia — Provincia di Torino",
    note: "Capoluogo del Piemonte. Cuore dell'industria bellica, aeronautica e motoristica italiana (stabilimenti FIAT Lingotto e Mirafiori, Lancia, SNIA Viscosa).",
  },
  {
    nuts: 'ITC12',
    name: 'Provincia di Vercelli',
    keys: ['vercelli', 'sesia'],
    adminTitle: "Regno d'Italia — Provincia di Vercelli",
    note: "Provincia risicola delle Baragge vercellesi e snodo ferroviario strategico.",
  },
  {
    nuts: 'ITC13',
    name: 'Biella (Provincia di Vercelli)',
    keys: ['biella', 'cervo'],
    adminTitle: "Regno d'Italia — Circondario di Biella (Provincia di Vercelli)",
    note: "Storico distretto laniero e tessile del Piemonte settentrionale, aggregato alla Provincia di Vercelli fino al 1992.",
  },
  {
    nuts: 'ITC14',
    name: 'Verbania e Ossola (Provincia di Novara)',
    keys: ['verbano_cusio_ossola', 'verbano', 'cusio', 'ossola', 'domodossola', 'verbania', 'intra', 'pallanza'],
    adminTitle: "Regno d'Italia — Mandamenti di Verbania, Domodossola e Cusio (Provincia di Novara)",
    note: "Territorio alpino dell'alto novarese e valico strategico del Sempione, unito nella Provincia di Novara fino al 1992.",
  },
  {
    nuts: 'ITC15',
    name: 'Provincia di Novara',
    keys: ['novara', 'ticino'],
    adminTitle: "Regno d'Italia — Provincia di Novara",
    note: "Provincia agricola e industriale tra il Ticino e la Sesia.",
  },
  {
    nuts: 'ITC16',
    name: 'Provincia di Cuneo',
    keys: ['cuneo', 'saluzzo', 'mondovi', 'alba'],
    adminTitle: "Regno d'Italia — Provincia di Cuneo (Provincia Granda)",
    note: "Fronte alpino occidentale, alpi marittime e valichi del Col di Tenda e della Maddalena verso la Francia.",
  },
  {
    nuts: 'ITC17',
    name: 'Provincia di Asti',
    keys: ['asti', 'monferrato'],
    adminTitle: "Regno d'Italia — Provincia di Asti",
    note: "Provincia istituita con R.D. 1 aprile 1935 n. 297 staccandone il territorio da Alessandria.",
  },
  {
    nuts: 'ITC18',
    name: 'Provincia di Alessandria',
    keys: ['alessandria', 'casale_monferrato', 'tortona', 'novi_ligure', 'acqui'],
    adminTitle: "Regno d'Italia — Provincia di Alessandria",
    note: "Snodo logistico e ferroviario del triangolo industriale Milano-Torino-Genova.",
  },

  // ================= VALLE D'AOSTA (1) =================
  {
    nuts: 'ITC20',
    name: 'Provincia di Aosta',
    keys: ['aosta', 'valle_d_aosta', 'valle_daosta', 'vallee_daoste', 'vallee_d_aoste'],
    adminTitle: "Regno d'Italia — Provincia di Aosta",
    note: "Istituita con R.D. 2 gennaio 1927 n. 1 (sigla AO). Toponomastica italianizzata dal regime fascista e presidio della frontiera alpina nord-occidentale.",
  },

  // ================= LIGURIA (4) =================
  {
    nuts: 'ITC31',
    name: 'Provincia di Imperia',
    keys: ['imperia', 'sanremo', 'ventimiglia', 'oneglia', 'porto_maurizio'],
    adminTitle: "Regno d'Italia — Provincia di Imperia",
    note: "Creata nel 1923 dalla fusione di Porto Maurizio e Oneglia. Valico di frontiera di Ventimiglia con la Francia.",
  },
  {
    nuts: 'ITC32',
    name: 'Provincia di Savona',
    keys: ['savona', 'vado_ligure', 'albenga'],
    adminTitle: "Regno d'Italia — Provincia di Savona",
    note: "Istituita nel 1927. Polo portuale, industriale e siderurgico ligure.",
  },
  {
    nuts: 'ITC33',
    name: 'Provincia di Genova',
    keys: ['genova', 'genoa', 'liguria', 'chiavari'],
    adminTitle: "Regno d'Italia — Provincia di Genova",
    note: "Grande Genova (1926). Principale porto del Mediterraneo, cantieri navali Ansaldo e complessi siderurgici.",
  },
  {
    nuts: 'ITC34',
    name: 'Provincia di La Spezia',
    keys: ['la_spezia', 'spezia', 'sarzana'],
    adminTitle: "Regno d'Italia — Provincia di La Spezia",
    note: "Istituita nel 1923. Principale Base Navale e Arsenale Militare della Regia Marina nel Tirreno, stabilimenti OTO Melara.",
  },

  // ================= LOMBARDIA (12) =================
  {
    nuts: 'ITC41',
    name: 'Provincia di Varese',
    keys: ['varese', 'busto_arsizio', 'gallarate', 'saronno'],
    adminTitle: "Regno d'Italia — Provincia di Varese",
    note: "Istituita nel 1927. Polo aeronautico nazionale (Aeronautica Macchi, SIAI-Marchetti, Caproni).",
  },
  {
    nuts: 'ITC42',
    name: 'Provincia di Como',
    keys: ['como', 'cantù', 'cantu', 'erba'],
    adminTitle: "Regno d'Italia — Provincia di Como",
    note: "Distretto tessile serico e presidio del confine italo-svizzero (Chiasso).",
  },
  {
    nuts: 'ITC43',
    name: 'Lecco (Provincia di Como)',
    keys: ['lecco', 'valsassina'],
    adminTitle: "Regno d'Italia — Circondario di Lecco (Provincia di Como)",
    note: "Distretto siderurgico e metallurgico del ramo orientale del Lario, aggregato a Como fino al 1992.",
  },
  {
    nuts: 'ITC44',
    name: 'Provincia di Sondrio',
    keys: ['sondrio', 'valtellina', 'chiavenna', 'bormio', 'tirano'],
    adminTitle: "Regno d'Italia — Provincia di Sondrio",
    note: "Provincia alpina della Valtellina e Valchiavenna, presidio strategico dei passi dello Stelvio e Spluga.",
  },
  {
    nuts: 'ITC46',
    name: 'Provincia di Bergamo',
    keys: ['bergamo', 'dalmine', 'treviglio'],
    adminTitle: "Regno d'Italia — Provincia di Bergamo",
    note: "Polo industriale, tessile e siderurgico delle valli orobiche (stabilimenti Dalmine).",
  },
  {
    nuts: 'ITC47',
    name: 'Provincia di Brescia',
    keys: ['brescia', 'val_trompia', 'gardone', 'salo', 'desenzano'],
    adminTitle: "Regno d'Italia — Provincia di Brescia",
    note: "Centro dell'industria armiera e meccanica italiana (Fabbrica d'Armi Beretta in Val Trompia, Breda).",
  },
  {
    nuts: 'ITC48',
    name: 'Provincia di Pavia',
    keys: ['pavia', 'vigevano', 'voghera', 'lomellina', 'oltrepo'],
    adminTitle: "Regno d'Italia — Provincia di Pavia",
    note: "Lomellina e Oltrepò Pavese, storico ateneo e polo calzaturiero di Vigevano.",
  },
  {
    nuts: 'ITC49',
    name: 'Lodi (Provincia di Milano)',
    keys: ['lodi', 'lodigiano', 'codogno'],
    adminTitle: "Regno d'Italia — Circondario di Lodi (Provincia di Milano)",
    note: "Storico circondario agricolo e zootecnico della Bassa milanese, aggregato a Milano fino al 1992.",
  },
  {
    nuts: 'ITC4A',
    name: 'Provincia di Cremona',
    keys: ['cremona', 'crema', 'casalmaggiore'],
    adminTitle: "Regno d'Italia — Provincia di Cremona",
    note: "Provincia agricola padana, roccaforte del fascismo intransigente di Roberto Farinacci.",
  },
  {
    nuts: 'ITC4B',
    name: 'Provincia di Mantova',
    keys: ['mantova', 'mantua', 'viadana'],
    adminTitle: "Regno d'Italia — Provincia di Mantova",
    note: "Città fortezza virgiliana e snodo fluviale sul Mincio.",
  },
  {
    nuts: 'ITC4C',
    name: 'Provincia di Milano',
    keys: ['milano', 'milan', 'lombardia', 'sesto_san_giovanni', 'legnano'],
    adminTitle: "Regno d'Italia — Provincia di Milano",
    note: "Capitale economica, industriale e finanziaria d'Italia (Alfa Romeo, Pirelli, Breda, Magneti Marelli, Isotta Fraschini, Caproni).",
  },
  {
    nuts: 'ITC4D',
    name: 'Monza e Brianza (Provincia di Milano)',
    keys: ['monza', 'monza_e_della_brianza', 'brianza', 'seregno', 'desio'],
    adminTitle: "Regno d'Italia — Comprensorio di Monza e Brianza (Provincia di Milano)",
    note: "Distretto manifatturiero e meccanico della Brianza, aggregato a Milano fino al 2004.",
  },

  // ================= TRENTINO-ALTO ADIGE / VENEZIA TRIDENTINA (2) =================
  {
    nuts: 'ITH10',
    name: 'Provincia di Bolzano (Alto Adige)',
    keys: ['bolzano', 'bozen', 'bolzano_bozen', 'alto_adige', 'sudtirol', 'suedtirol', 'merano', 'bressanone', 'brunico'],
    adminTitle: "Regno d'Italia — Provincia di Bolzano (Venezia Tridentina)",
    note: "Istituita nel 1927. Italianizzazione toponomastica (Prontuario Tolomei). Accordo italo-tedesco sulle Opzioni del 1939.",
  },
  {
    nuts: 'ITH20',
    name: 'Provincia di Trento (Trentino)',
    keys: ['trento', 'trentino', 'rovereto', 'riva_del_garda', 'venezia_tridentina'],
    adminTitle: "Regno d'Italia — Provincia di Trento (Venezia Tridentina)",
    note: "Annessa col Trattato di Saint-Germain (1919), terra irredenta di Cesare Battisti.",
  },

  // ================= VENETO (7) =================
  {
    nuts: 'ITH31',
    name: 'Provincia di Verona',
    keys: ['verona', 'legnago', 'villafranca'],
    adminTitle: "Regno d'Italia — Provincia di Verona",
    note: "Perno difensivo dell'Adige e snodo ferroviario strategico verso il Brennero.",
  },
  {
    nuts: 'ITH32',
    name: 'Provincia di Vicenza',
    keys: ['vicenza', 'bassano_del_grappa', 'bassano', 'schio', 'valdagno'],
    adminTitle: "Regno d'Italia — Provincia di Vicenza",
    note: "Polo industriale tessile (Marzotto) e meccanico delle prealpi venete.",
  },
  {
    nuts: 'ITH33',
    name: 'Provincia di Belluno',
    keys: ['belluno', 'cadore', 'cortina', 'feltre', 'agordo'],
    adminTitle: "Regno d'Italia — Provincia di Belluno",
    note: "Provincia dolomitica e bacino idroelettrico del Piave.",
  },
  {
    nuts: 'ITH34',
    name: 'Provincia di Treviso',
    keys: ['treviso', 'conegliano', 'castelfranco_veneto', 'vittorio_veneto', 'montebelluna'],
    adminTitle: "Regno d'Italia — Provincia di Treviso",
    note: "Marca Trevigiana e memoria storica della Vittoria del 1918 a Vittorio Veneto.",
  },
  {
    nuts: 'ITH35',
    name: 'Provincia di Venezia',
    keys: ['venezia', 'venice', 'porto_marghera', 'chioggia', 'mestre', 'san_dona_di_piave'],
    adminTitle: "Regno d'Italia — Provincia di Venezia",
    note: "Grande Venezia e polo industriale-chimico di Porto Marghera, Arsenale della Regia Marina.",
  },
  {
    nuts: 'ITH36',
    name: 'Provincia di Padova',
    keys: ['padova', 'padua', 'cittadella', 'monselice', 'este'],
    adminTitle: "Regno d'Italia — Provincia di Padova",
    note: "Storico ateneo patavino, snodo della pianura veneta e bacino termale euganeo.",
  },
  {
    nuts: 'ITH37',
    name: 'Provincia di Rovigo',
    keys: ['rovigo', 'polesine', 'adria'],
    adminTitle: "Regno d'Italia — Provincia di Rovigo",
    note: "Territorio del Polesine compreso tra i fiumi Adige e Po.",
  },

  // ================= FRIULI-VENEZIA GIULIA / VENEZIA GIULIA (4) =================
  {
    nuts: 'ITH41',
    name: 'Pordenone (Provincia del Friuli / Udine)',
    keys: ['pordenone', 'friuli_occidentale', 'spilimbergo', 'sacile', 'maniago'],
    adminTitle: "Regno d'Italia — Circondario di Pordenone (Provincia del Friuli / Udine)",
    note: "Friuli occidentale oltre il Tagliamento, aggregato alla Provincia di Udine fino al 1968 (officine Zanussi).",
  },
  {
    nuts: 'ITH42',
    name: 'Provincia del Friuli (Udine)',
    keys: ['udine', 'friuli', 'cividale_del_friuli', 'tolmezzo', 'carnia'],
    adminTitle: "Regno d'Italia — Provincia del Friuli",
    note: "Capoluogo storico del Friuli, presidio della Carnia e della frontiera nord-orientale.",
  },
  {
    nuts: 'ITH43',
    name: 'Provincia di Gorizia (Venezia Giulia)',
    keys: ['gorizia', 'goriska', 'isonzo', 'monfalcone', 'gradisca', 'cormons'],
    adminTitle: "Regno d'Italia — Provincia di Gorizia (Venezia Giulia)",
    note: "Capoluogo dell'Isonzo annesso nel 1920 (Trattato di Rapallo), ricostituita come provincia nel 1927.",
  },
  {
    nuts: 'ITH44',
    name: 'Provincia di Trieste (Venezia Giulia)',
    keys: ['trieste', 'venezia_giulia', 'muggia', 'duino'],
    adminTitle: "Regno d'Italia — Provincia di Trieste (Capoluogo della Venezia Giulia)",
    note: "Porto Franco dell'Adriatico, polo cantieristico (Cantieri Riuniti dell'Adriatico CRDA) e centro simbolico dell'irredentismo giuliano.",
  },

  // ================= EMILIA-ROMAGNA (9) =================
  {
    nuts: 'ITH51',
    name: 'Provincia di Piacenza',
    keys: ['piacenza', 'fiorenzuola'],
    adminTitle: "Regno d'Italia — Provincia di Piacenza",
    note: "Porta dell'Emilia sul Po e arsenale militare terrestre.",
  },
  {
    nuts: 'ITH52',
    name: 'Provincia di Parma',
    keys: ['parma', 'fidenza', 'salsomaggiore'],
    adminTitle: "Regno d'Italia — Provincia di Parma",
    note: "Ducato storico e polo dell'industria alimentare padana.",
  },
  {
    nuts: 'ITH53',
    name: 'Provincia di Reggio Emilia',
    keys: ['reggio_nell_emilia', 'reggio_emilia', 'guastalla', 'correggio'],
    adminTitle: "Regno d'Italia — Provincia di Reggio Emilia",
    note: "Città del Tricolore, officine meccaniche Reggiane (aerei da caccia Re.2000, Re.2001).",
  },
  {
    nuts: 'ITH54',
    name: 'Provincia di Modena',
    keys: ['modena', 'carpi', 'sassuolo', 'mirandola'],
    adminTitle: "Regno d'Italia — Provincia di Modena",
    note: "Sede della Regia Accademia Militare di Fanteria e Cavalleria.",
  },
  {
    nuts: 'ITH55',
    name: 'Provincia di Bologna',
    keys: ['bologna', 'imola', 'san_lazzaro', 'casalecchio'],
    adminTitle: "Regno d'Italia — Provincia di Bologna",
    note: "Principale snodo ferroviario e strategico d'Italia tra Nord e Centro-Sud, fabbriche d'armi e meccanica.",
  },
  {
    nuts: 'ITH56',
    name: 'Provincia di Ferrara',
    keys: ['ferrara', 'comacchio', 'cento', 'copparo'],
    adminTitle: "Regno d'Italia — Provincia di Ferrara",
    note: "Roccaforte del fascismo agrario e feudo politico di Italo Balbo, bonifiche del delta del Po.",
  },
  {
    nuts: 'ITH57',
    name: 'Provincia di Ravenna',
    keys: ['ravenna', 'faenza', 'lugo'],
    adminTitle: "Regno d'Italia — Provincia di Ravenna",
    note: "Porto Corsini sull'Adriatico e distretto agricolo romagnolo.",
  },
  {
    nuts: 'ITH58',
    name: 'Provincia di Forlì',
    keys: ['forli_cesena', 'forli', 'cesena', 'predappio', 'castrocaro', 'cesenatico'],
    adminTitle: "Regno d'Italia — Provincia di Forlì",
    note: "Provincia natale di Benito Mussolini (Predappio / Rocca delle Camminate), centro monumentale del Regime.",
  },
  {
    nuts: 'ITH59',
    name: 'Rimini (Provincia di Forlì)',
    keys: ['rimini', 'riccione', 'cattolica', 'bellaria'],
    adminTitle: "Regno d'Italia — Circondario di Rimini (Provincia di Forlì)",
    note: "Polo balneare adriatico e snodo della via Emilia, aggregato a Forlì fino al 1992.",
  },

  // ================= TOSCANA (10) =================
  {
    nuts: 'ITI11',
    name: 'Provincia di Massa e Carrara',
    keys: ['massa_carrara', 'massa', 'carrara', 'apuania', 'pontremoli', 'aulla'],
    dynamicName: (s: number) => s >= 2 ? 'Provincia di Apuania' : 'Provincia di Massa e Carrara',
    dynamicAdminTitle: (s: number) => s >= 2 ? "Regno d'Italia — Provincia di Apuania" : "Regno d'Italia — Provincia di Massa e Carrara",
    dynamicNote: (s: number) => s >= 2
      ? "Istituita con R.D.L. 16 dicembre 1938 n. 1860 (sigla AU) fondendo i comuni di Massa, Carrara e Montignoso nel nuovo comune e provincia di Apuania."
      : "Distretto apuano dei marmi di Carrara e cantieristica ligure-tirrenica (R.D. 1923; ridenominata Apuania a fine 1938).",
  },
  {
    nuts: 'ITI12',
    name: 'Provincia di Lucca',
    keys: ['lucca', 'viareggio', 'versilia', 'garfagnana', 'pietrasanta'],
    adminTitle: "Regno d'Italia — Provincia di Lucca",
    note: "Cantieri navali di Viareggio, bacino cartario e presidio della Garfagnana.",
  },
  {
    nuts: 'ITI13',
    name: 'Provincia di Pistoia',
    keys: ['pistoia', 'montecatini_terme', 'montecatini', 'pescia'],
    adminTitle: "Regno d'Italia — Provincia di Pistoia",
    note: "Istituita nel 1927. Officine meccaniche e ferroviarie San Giorgio.",
  },
  {
    nuts: 'ITI14',
    name: 'Provincia di Firenze',
    keys: ['firenze', 'florence', 'toscana', 'empoli', 'sesto_fiorentino', 'scandicci'],
    adminTitle: "Regno d'Italia — Provincia di Firenze",
    note: "Capoluogo della Toscana, officine ottiche e di precisione Galileo, Scuola di Applicazione Aeronautica alle Cascine.",
  },
  {
    nuts: 'ITI15',
    name: 'Prato (Provincia di Firenze)',
    keys: ['prato', 'val_di_bisenzio'],
    adminTitle: "Regno d'Italia — Circondario di Prato (Provincia di Firenze)",
    note: "Grande distretto tessile e cardato d'Italia, aggregato a Firenze fino al 1992.",
  },
  {
    nuts: 'ITI16',
    name: 'Provincia di Livorno',
    keys: ['livorno', 'leghorn', 'elba', 'isola_d_elba', 'porto_ferraio', 'piombino', 'cecina'],
    adminTitle: "Regno d'Italia — Provincia di Livorno",
    note: "Sede della Regia Accademia Navale, Cantieri Navali fratelli Orlando, stabilimenti metallurgici di Piombino e Isola d'Elba (patria di Galeazzo Ciano).",
  },
  {
    nuts: 'ITI17',
    name: 'Provincia di Pisa',
    keys: ['pisa', 'pontedera', 'volterra', 'san_miniato'],
    adminTitle: "Regno d'Italia — Provincia di Pisa",
    note: "Polo aeronautico Piaggio a Pontedera e storico ateneo pisano.",
  },
  {
    nuts: 'ITI18',
    name: 'Provincia di Arezzo',
    keys: ['arezzo', 'casentino', 'valdarno', 'sansepolcro', 'cortona'],
    adminTitle: "Regno d'Italia — Provincia di Arezzo",
    note: "Polo serico e metallurgico del Valdarno e Casentino.",
  },
  {
    nuts: 'ITI19',
    name: 'Provincia di Siena',
    keys: ['siena', 'poggibonsi', 'chianciano', 'montepulciano', 'amiata'],
    adminTitle: "Regno d'Italia — Provincia di Siena",
    note: "Banca Monte dei Paschi, miniere di mercurio del Monte Amiata.",
  },
  {
    nuts: 'ITI1A',
    name: 'Provincia di Grosseto',
    keys: ['grosseto', 'maremma', 'orbetello', 'follonica', 'monte_argentario'],
    adminTitle: "Regno d'Italia — Provincia di Grosseto",
    note: "Maremma toscana, bonifiche integrali e idroscalo della Regia Aeronautica di Orbetello (punto di partenza delle crociere atlantiche di Italo Balbo).",
  },

  // ================= UMBRIA (2) =================
  {
    nuts: 'ITI21',
    name: 'Provincia di Perugia',
    keys: ['perugia', 'foligno', 'citta_di_castello', 'gubbio', 'spoleto', 'assisi'],
    adminTitle: "Regno d'Italia — Provincia di Perugia",
    note: "Capoluogo dell'Umbria e polo aeronautico Aeronautica Umbra a Foligno.",
  },
  {
    nuts: 'ITI22',
    name: 'Provincia di Terni',
    keys: ['terni', 'narni', 'orvieto', 'amelia'],
    adminTitle: "Regno d'Italia — Provincia di Terni",
    note: "Istituita nel 1927. Polo strategico nazionale per la produzione di corazze, cannoni e acciai speciali (Acciaierie e Fonderie di Terni) alimentato dalle centrali idroelettriche delle Marmore.",
  },

  // ================= MARCHE (5) =================
  {
    nuts: 'ITI31',
    name: 'Provincia di Pesaro e Urbino',
    keys: ['pesaro_e_urbino', 'pesaro', 'urbino', 'fano'],
    adminTitle: "Regno d'Italia — Provincia di Pesaro e Urbino",
    note: "Porta adriatica delle Marche e cantieristica peschereccia.",
  },
  {
    nuts: 'ITI32',
    name: 'Provincia di Ancona',
    keys: ['ancona', 'jesi', 'senigallia', 'loreto', 'fabriano', 'osimo'],
    adminTitle: "Regno d'Italia — Provincia di Ancona",
    note: "Piazzaforte militare marittima, Cantieri Navali del Tirreno e Riuniti e cantiere navale mercantile.",
  },
  {
    nuts: 'ITI33',
    name: 'Provincia di Macerata',
    keys: ['macerata', 'civitanova_marche', 'camerino', 'tolentino', 'recanati'],
    adminTitle: "Regno d'Italia — Provincia di Macerata",
    note: "Territorio collinare marchigiano e polo conciario-manifatturiero.",
  },
  {
    nuts: 'ITI34',
    name: 'Provincia di Ascoli Piceno',
    keys: ['ascoli_piceno', 'ascoli', 'san_benedetto_del_tronto'],
    adminTitle: "Regno d'Italia — Provincia di Ascoli Piceno",
    note: "Presidio del Tronto e porto peschereccio d'altura a San Benedetto.",
  },
  {
    nuts: 'ITI35',
    name: 'Fermo (Provincia di Ascoli Piceno)',
    keys: ['fermo', 'porto_san_giorgio', 'sant_elpidio_a_mare'],
    adminTitle: "Regno d'Italia — Circondario di Fermo (Provincia di Ascoli Piceno)",
    note: "Storico circondario marchigiano e distretto calzaturiero, aggregato ad Ascoli Piceno fino al 2004.",
  },

  // ================= LAZIO (5) =================
  {
    nuts: 'ITI41',
    name: 'Provincia di Viterbo',
    keys: ['viterbo', 'tuscia', 'tarquinia', 'civita_castellana', 'montefiascone'],
    adminTitle: "Regno d'Italia — Provincia di Viterbo",
    note: "Istituita nel 1927. Tuscia laziale e idroscalo di Vigna di Valle sul lago di Bracciano.",
  },
  {
    nuts: 'ITI42',
    name: 'Provincia di Rieti',
    keys: ['rieti', 'sabina', 'terminillo', 'cittaducale'],
    adminTitle: "Regno d'Italia — Provincia di Rieti",
    note: "Istituita nel 1927 riunendo territori abruzzesi e umbro-sabini. Sviluppo del Monte Terminillo come 'Montagna di Roma'.",
  },
  {
    nuts: 'ITI43',
    name: 'Governatorato di Roma',
    keys: ['roma', 'rome', 'lazio', 'ostia', 'tivoli', 'civitavecchia', 'velletri', 'frascati'],
    adminTitle: "Regno d'Italia — Governatorato di Roma (Capitale dell'Impero)",
    note: "Ente speciale istituito con R.D.L. 28 ottobre 1925 n. 1949 guidato dal Governatore di nomina regia. Centro politico, monumentale e militare del Fascismo e dell'Impero.",
  },
  {
    nuts: 'ITI44',
    name: 'Provincia di Littoria',
    keys: ['latina', 'littoria', 'agro_pontino', 'sabaudia', 'pontinia', 'aprilia', 'gaeta', 'formia', 'terracina'],
    adminTitle: "Regno d'Italia — Provincia di Littoria",
    note: "Capoluogo fondato nel 1932 nel cuore della bonifica integrale dell'Agro Pontino; elevata a Provincia con R.D.L. 18 dicembre 1934 n. 2001. Ridenominata Latina solo nel 1945.",
  },
  {
    nuts: 'ITI45',
    name: 'Provincia di Frosinone',
    keys: ['frosinone', 'ciociaria', 'cassino', 'sora', 'anagni', 'fiuggi', 'alatri'],
    adminTitle: "Regno d'Italia — Provincia di Frosinone",
    note: "Istituita nel 1927 riunendo il circondario di Sora (ex Terra di Lavoro) e la Valle del Sacco (Ciociaria).",
  },

  // ================= ABRUZZO & MOLISE (6) =================
  {
    nuts: 'ITF11',
    name: "Provincia dell'Aquila",
    keys: ['l_aquila', 'aquila', 'aquila_degli_abruzzi', 'sulmona', 'avezzano'],
    adminTitle: "Regno d'Italia — Provincia dell'Aquila",
    dynamicNote: (s: number) => s < 3
      ? "Denominata ufficialmente Aquila degli Abruzzi fino al 1939; snodo ferroviario di Sulmona e conca del Fucino."
      : "Ridenominata ufficialmente L'Aquila con R.D. 23 marzo 1939 n. 627; snodo ferroviario di Sulmona e conca del Fucino.",
  },
  {
    nuts: 'ITF12',
    name: 'Provincia di Teramo',
    keys: ['teramo', 'giulianova', 'atri', 'roseto_degli_abruzzi'],
    adminTitle: "Regno d'Italia — Provincia di Teramo",
    note: "Abruzzo Ulteriore I, dal Gran Sasso all'Adriatico.",
  },
  {
    nuts: 'ITF13',
    name: 'Provincia di Pescara',
    keys: ['pescara', 'castellammare_adriatico', 'penne', 'popoli'],
    adminTitle: "Regno d'Italia — Provincia di Pescara",
    note: "Istituita con R.D. 2 gennaio 1927 n. 1 fondendo Pescara e Castellammare Adriatico su proposta di Gabriele d'Annunzio e Giacomo Acerbo. Snodo logistico adriatico e industria chimica a Bussi.",
  },
  {
    nuts: 'ITF14',
    name: 'Provincia di Chieti',
    keys: ['chieti', 'ortona', 'lanciano', 'vasto'],
    adminTitle: "Regno d'Italia — Provincia di Chieti",
    note: "Abruzzo Citeriore, porto adriatico di Ortona e Val di Sangro.",
  },
  {
    nuts: 'ITF21',
    name: 'Isernia (Provincia di Campobasso)',
    keys: ['isernia', 'venafro', 'agnone'],
    adminTitle: "Regno d'Italia — Circondario di Isernia (Provincia di Campobasso)",
    note: "Alto Molise montano e Valle del Volturno, aggregato alla Provincia di Campobasso fino al 1970.",
  },
  {
    nuts: 'ITF22',
    name: 'Provincia di Campobasso',
    keys: ['campobasso', 'termoli', 'larino'],
    adminTitle: "Regno d'Italia — Provincia di Campobasso (Molise)",
    note: "Capoluogo del Molise e porto adriatico di Termoli.",
  },

  // ================= CAMPANIA (5) =================
  {
    nuts: 'ITF31',
    name: 'Caserta (Provincia di Napoli)',
    keys: ['caserta', 'terra_di_lavoro', 'aversa', 'santa_maria_capua_vetere', 'capua', 'maddaloni'],
    adminTitle: "Regno d'Italia — Caserta (Provincia di Napoli)",
    note: "La storica Provincia di Terra di Lavoro fu soppressa dal regime fascista con R.D. 2 gennaio 1927 n. 1 e il suo capoluogo Caserta aggregato alla Provincia di Napoli. La provincia autonoma fu ricostituita solo nel 1945.",
  },
  {
    nuts: 'ITF32',
    name: 'Provincia di Benevento',
    keys: ['benevento', 'sannio', 'montesarchio'],
    adminTitle: "Regno d'Italia — Provincia di Benevento",
    note: "Capoluogo del Sannio e snodo ferroviario appenninico tra Napoli e la Puglia.",
  },
  {
    nuts: 'ITF33',
    name: 'Provincia di Napoli',
    keys: ['napoli', 'naples', 'campania', 'pozzuoli', 'castellammare_di_stabia', 'torre_annunziata', 'torre_del_greco', 'ischia', 'capri'],
    adminTitle: "Regno d'Italia — Provincia di Napoli",
    note: "Grande metropoli del Mezzogiorno e porto di partenza per l'Impero (AOI e Libia); polo industriale e cantieristico navale (Navalmeccanica a Castellammare, Silurificio di Baia, Ilva di Bagnoli).",
  },
  {
    nuts: 'ITF34',
    name: 'Provincia di Avellino',
    keys: ['avellino', 'irpinia', 'ariano_irpino'],
    adminTitle: "Regno d'Italia — Provincia di Avellino",
    note: "Principato Ultra e dorsale montuosa dell'Irpinia.",
  },
  {
    nuts: 'ITF35',
    name: 'Provincia di Salerno',
    keys: ['salerno', 'cava_de_tirreni', 'nocera_inferiore', 'battipaglia', 'cilento', 'amalfi'],
    adminTitle: "Regno d'Italia — Provincia di Salerno",
    note: "Piana del Sele, bonifiche e costiera amalfitana-cilentana.",
  },

  // ================= PUGLIA (6) =================
  {
    nuts: 'ITF43',
    name: 'Provincia di Taranto (Provincia dello Jonio)',
    keys: ['taranto', 'jonio', 'grottaglie', 'martina_franca', 'manduria'],
    adminTitle: "Regno d'Italia — Provincia di Taranto (Provincia dello Jonio)",
    note: "Istituita nel 1923 (nota anche come Provincia dello Jonio). Sede della 1ª Squadra Navale, Arsenale Militare Marittimo e principale Base Navale d'altura della Regia Marina nel Mar Grande e Mar Piccolo.",
  },
  {
    nuts: 'ITF44',
    name: 'Provincia di Brindisi',
    keys: ['brindisi', 'ostuni', 'francavilla_fontana', 'mesagne'],
    adminTitle: "Regno d'Italia — Provincia di Brindisi",
    note: "Istituita nel 1927. Base navale adriatica, idroscalo e principale porto d'imbarco per le truppe e i rifornimenti diretti in Albania e nel Mediterraneo Orientale.",
  },
  {
    nuts: 'ITF45',
    name: 'Provincia di Lecce',
    keys: ['lecce', 'salento', 'gallipoli', 'otranto', 'maglie', 'nardo'],
    adminTitle: "Regno d'Italia — Provincia di Lecce",
    note: "Cuore del Salento (Terra d'Otranto) e base aeronavale di Gallipoli e Otranto sul canale d'Otranto.",
  },
  {
    nuts: 'ITF46',
    name: 'Provincia di Foggia',
    keys: ['foggia', 'tavoliere', 'cerignola', 'san_severo', 'manfredonia', 'gargano', 'lucera'],
    adminTitle: "Regno d'Italia — Provincia di Foggia",
    note: "Granaio d'Italia nel Tavoliere delle Puglie, promontorio del Gargano e polo aeroportuale militare della Regia Aeronautica (Gino Lisa).",
  },
  {
    nuts: 'ITF47',
    name: 'Provincia di Bari',
    keys: ['bari', 'puglia', 'apulia', 'altamura', 'molfetta', 'monopoli', 'bitonto', 'corato'],
    adminTitle: "Regno d'Italia — Provincia di Bari",
    note: "Capoluogo pugliese, sede della Fiera del Levante (fondata nel 1929 come testa di ponte commerciale e propagandistica verso l'Oriente).",
  },
  {
    nuts: 'ITF48',
    name: 'Barletta-Andria-Trani (Provincia di Bari)',
    keys: ['barletta_andria_trani', 'barletta', 'andria', 'trani', 'bisceglie', 'canosa_di_puglia'],
    adminTitle: "Regno d'Italia — Circondari di Barletta, Andria e Trani (Provincia di Bari)",
    note: "Territorio del Nord Barese, aggregato alla Provincia di Bari fino al 2004.",
  },

  // ================= BASILICATA (2) =================
  {
    nuts: 'ITF51',
    name: 'Provincia di Potenza (Lucania)',
    keys: ['potenza', 'lucania', 'melfi', 'maratea', 'venosa'],
    adminTitle: "Regno d'Italia — Provincia di Potenza (Lucania)",
    note: "Capoluogo dell'Appennino lucano; la regione fu ridenominata ufficialmente Lucania nel 1932.",
  },
  {
    nuts: 'ITF52',
    name: 'Provincia di Matera',
    keys: ['matera', 'pisticci', 'metaponto', 'montescaglioso'],
    adminTitle: "Regno d'Italia — Provincia di Matera",
    note: "Istituita con R.D. 2 gennaio 1927 n. 1 staccandone il territorio da Potenza. Città dei Sassi e piana ionica metapontina.",
  },

  // ================= CALABRIA (5) =================
  {
    nuts: 'ITF61',
    name: 'Provincia di Cosenza',
    keys: ['cosenza', 'sila', 'rossano', 'corigliano_calabro', 'castrovillari', 'paola'],
    adminTitle: "Regno d'Italia — Provincia di Cosenza",
    note: "Calabria Citeriore, altopiano della Sila e bacini idroelettrici Silani.",
  },
  {
    nuts: 'ITF62',
    name: 'Crotone (Provincia di Catanzaro)',
    keys: ['crotone', 'cotrone', 'ciro', 'isola_di_capo_rizzuto'],
    adminTitle: "Regno d'Italia — Circondario di Crotone (Provincia di Catanzaro)",
    note: "Ridenominata Crotone da Cotrone nel 1928; polo industriale chimico ed elettrochimico (Pertusola, Montecatini), aggregata a Catanzaro fino al 1992.",
  },
  {
    nuts: 'ITF63',
    name: 'Provincia di Catanzaro',
    keys: ['catanzaro', 'lamezia_terme', 'nicastro', 'soverato'],
    adminTitle: "Regno d'Italia — Provincia di Catanzaro",
    note: "Calabria Ulteriore II e istmo di Catanzaro tra Ionio e Tirreno.",
  },
  {
    nuts: 'ITF64',
    name: 'Vibo Valentia (Provincia di Catanzaro)',
    keys: ['vibo_valentia', 'monteleone', 'monteleone_di_calabria', 'tropea', 'pizzo'],
    adminTitle: "Regno d'Italia — Circondario di Vibo Valentia (Provincia di Catanzaro)",
    note: "Denominata Monteleone di Calabria fino al 1928, quando assunse l'antico toponimo romano di Vibo Valentia; porto di Vibo Marina, aggregata a Catanzaro fino al 1992.",
  },
  {
    nuts: 'ITF65',
    name: 'Provincia di Reggio Calabria',
    keys: ['reggio_di_calabria', 'reggio_calabria', 'palmi', 'locri', 'gioia_tauro', 'siderno'],
    adminTitle: "Regno d'Italia — Provincia di Reggio Calabria",
    note: "Calabria Ulteriore I, presidio dello Stretto di Messina e massiccio dell'Aspromonte.",
  },

  // ================= SICILIA (9) =================
  {
    nuts: 'ITG11',
    name: 'Provincia di Trapani',
    keys: ['trapani', 'marsala', 'pantelleria', 'mazara_del_vallo', 'alcamo', 'castelvetrano'],
    adminTitle: "Regno d'Italia — Provincia di Trapani",
    note: "Piazzaforte militare marittima della Sicilia occidentale, Isole Egadi e isola-fortezza di Pantelleria nel Canale di Sicilia.",
  },
  {
    nuts: 'ITG12',
    name: 'Provincia di Palermo',
    keys: ['palermo', 'sicilia', 'sicily', 'termini_imerese', 'bagheria', 'monreale'],
    adminTitle: "Regno d'Italia — Provincia di Palermo",
    note: "Capoluogo della Sicilia, Cantieri Navali Riuniti di Palermo e base navale tirrenica.",
  },
  {
    nuts: 'ITG13',
    name: 'Provincia di Messina',
    keys: ['messina', 'barcellona_pozzo_di_gotto', 'milazzo', 'taormina', 'isole_eolie', 'lipari'],
    adminTitle: "Regno d'Italia — Provincia di Messina",
    note: "Presidio strategico dello Stretto di Messina, base sommergibili e arcipelago delle Eolie.",
  },
  {
    nuts: 'ITG14',
    name: 'Provincia di Agrigento',
    keys: ['agrigento', 'girgenti', 'sciacca', 'licata', 'canicatti', 'lampedusa', 'linosa'],
    adminTitle: "Regno d'Italia — Provincia di Agrigento",
    note: "Ridenominata ufficialmente Agrigento nel 1927 abbandonando il toponimo storico di Girgenti; Isole Pelagie (Lampedusa e Linosa).",
  },
  {
    nuts: 'ITG15',
    name: 'Provincia di Caltanissetta',
    keys: ['caltanissetta', 'gela', 'terranova_di_sicilia', 'niscemi'],
    adminTitle: "Regno d'Italia — Provincia di Caltanissetta",
    note: "Centro del bacino solfifero siciliano; la città costiera di Terranova di Sicilia assunse il nome storico di Gela nel 1927.",
  },
  {
    nuts: 'ITG16',
    name: 'Provincia di Enna',
    keys: ['enna', 'castrogiovanni', 'piazza_armerina', 'nicosia'],
    adminTitle: "Regno d'Italia — Provincia di Enna",
    note: "La storica città di Castrogiovanni fu ridenominata Enna ed elevata a capoluogo di provincia nel dicembre 1926 col R.D. 2 gennaio 1927 n. 1 ('Belvedere della Sicilia').",
  },
  {
    nuts: 'ITG17',
    name: 'Provincia di Catania',
    keys: ['catania', 'acireale', 'caltagirone', 'paterno', 'adrano'],
    adminTitle: "Regno d'Italia — Provincia di Catania",
    note: "Porto ionico, fertile Piana di Catania e base aerea militare di Gerbini.",
  },
  {
    nuts: 'ITG18',
    name: 'Provincia di Ragusa',
    keys: ['ragusa', 'modica', 'vittoria', 'comiso'],
    adminTitle: "Regno d'Italia — Provincia di Ragusa",
    note: "Istituita con R.D. 2 gennaio 1927 n. 1 riunendo territori del circondario di Modica; bacino degli asfalti bituminosi e aeroporto militare di Comiso.",
  },
  {
    nuts: 'ITG19',
    name: 'Provincia di Siracusa',
    keys: ['siracusa', 'syracuse', 'augusta', 'noto', 'lentini', 'avola'],
    adminTitle: "Regno d'Italia — Provincia di Siracusa",
    note: "Base Navale di Augusta della Regia Marina, idroscalo e piazzaforte del canale di Sicilia.",
  },

  // ================= SARDEGNA (5) =================
  {
    nuts: 'ITG2D',
    name: 'Provincia di Sassari',
    keys: ['sassari', 'alghero', 'porto_torres', 'olbia', 'gallura', 'tempio_pausania', 'la_maddalena', 'maddalena'],
    adminTitle: "Regno d'Italia — Provincia di Sassari",
    note: "Capo di Sopra della Sardegna, porto di Olbia (Terranova Pausania fino al 1939) e arcipelago de La Maddalena (principale base navale fortificata della Regia Marina nel Tirreno settentrionale).",
  },
  {
    nuts: 'ITG2E',
    name: 'Provincia di Nuoro',
    keys: ['nuoro', 'barbagia', 'macomer', 'lanusei', 'tortoli', 'ogliastra', 'siniscola'],
    adminTitle: "Regno d'Italia — Provincia di Nuoro",
    note: "Istituita con R.D. 2 gennaio 1927 n. 1. Barbagia e massiccio del Gennargentu.",
  },
  {
    nuts: 'ITG2F',
    name: 'Provincia di Cagliari',
    keys: ['cagliari', 'sardegna', 'sardinia', 'quartu_sant_elena', 'iglesias'],
    adminTitle: "Regno d'Italia — Provincia di Cagliari",
    note: "Capoluogo della Sardegna e Capo di Sotto, base navale e aeroporto militare di Monserrato / Elmas.",
  },
  {
    nuts: 'ITG2G',
    name: 'Oristano (Provincia di Cagliari)',
    keys: ['oristano', 'arborea', 'mussolinia', 'mussolinia_di_sardegna', 'villaggio_mussolini', 'tirso', 'bosa'],
    adminTitle: "Regno d'Italia — Circondario di Oristano e Mussolinia di Sardegna (Provincia di Cagliari)",
    note: "Campidano settentrionale, bonifiche del Tirso e città di fondazione di Mussolinia di Sardegna (Arborea), aggregato a Cagliari fino al 1974.",
  },
  {
    nuts: 'ITG2H',
    name: 'Sulcis e Campidano (Provincia di Cagliari)',
    keys: ['sud_sardegna', 'sulcis', 'iglesiente', 'carbonia', 'sanluri', 'villacidro', 'carloforte', 'sant_antioco'],
    adminTitle: "Regno d'Italia — Bacino Minerario del Sulcis-Iglesiente (Provincia di Cagliari)",
    note: "Polo carbonifero e minerario autarchico della Regia Azienda Carboni Italiani (A.Ca.I.); fondazione della città mineraria di Carbonia (inaugurata nel dicembre 1938 da Mussolini).",
  },
];

/**
 * Pulisce e normalizza un toponimo italiano da formattazioni multilingue o caratteri speciali.
 */
export function cleanItalianToponymName(name: string): string {
  if (!name) return '';
  let cleaned = name.trim();
  // Rimuove la dicitura bilingue separata da slash (es. "Valle d’Aosta/Vallée d’Aoste" -> "Valle d'Aosta")
  if (cleaned.includes('/')) {
    cleaned = cleaned.split('/')[0].trim();
  }
  // Normalizza gli apostrofi tipografici (es. L’Aquila -> L'Aquila, Valle d’Aosta -> Valle d'Aosta)
  cleaned = cleaned.replace(/’/g, "'");
  return cleaned;
}

/**
 * Risoluzione toponomastica, istituzionale e temporale dettagliata per le province e i territori del Regno d'Italia (1936-1940).
 */
export function resolveItalyToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;

  // 1. Dodecaneso (Possedimento delle Isole Italiane dell'Egeo: Rodi, Coo, Lero, Calino, Scarpanto, Stampalia, Castelrosso)
  if (
    id === 'EL421' ||
    normKey.includes('dodecan') ||
    normKey.includes('rodos') ||
    normKey.includes('rhodes') ||
    normKey.includes('rodi') ||
    normKey.includes('kalymnos_karpathos')
  ) {
    return {
      name: "Rodi (Isole Italiane dell'Egeo)",
      adminTitle: "Regno d'Italia — Possedimento delle Isole Italiane dell'Egeo",
      note: "Possedimento delle Isole Italiane dell'Egeo (1912-1943). Capoluogo Rodi (Governatore Cesare Maria De Vecchi); piazzaforte navale di Lero, presidio di Coo, Calino, Scarpanto, Stampalia e Castelrosso.",
    };
  }

  // 2. Confine orientale italiano (Rapallo 1920 & Roma 1924): Pola, Gorizia, Fiume, Zara, Postumia
  if (id === 'HR036' || normKey.includes('istarska') || normKey.includes('pula') || normKey.includes('pola')) {
    return {
      name: 'Provincia di Pola (Istria Italiana)',
      adminTitle: "Regno d'Italia — Provincia di Pola",
      note: "Trattato di Rapallo (1920). Piazzaforte militare e base navale della Regia Marina a Pola, Rovigno, Parenzo, Pisino, Albona, Cherso e Lussino.",
    };
  }
  if (id === 'HR031' || normKey === 'fiume' || normKey.includes('carnaro') || normKey.includes('rijeka')) {
    return {
      name: 'Provincia del Carnaro (Fiume)',
      adminTitle: "Regno d'Italia — Provincia del Carnaro",
      note: "Trattato di Roma (1924). Comprende il capoluogo Fiume, Abbazia, Laurana e le isole quarnarine di Cherso e Lussino.",
    };
  }
  if (id === 'HR033' || normKey === 'zara' || normKey.includes('zadar')) {
    return {
      name: 'Provincia di Zara (Dalmazia)',
      adminTitle: "Regno d'Italia — Provincia di Zara",
      note: "Enclave italiana in Dalmazia annessa col Trattato di Rapallo (1920), comprendente il comune di Zara e le isole di Lagosta e Pelagosa.",
    };
  }
  if (id === 'SI043' || normKey.includes('goriska')) {
    return {
      name: 'Provincia di Gorizia (Venezia Giulia Orientale)',
      adminTitle: "Regno d'Italia — Provincia di Gorizia",
      note: "Trattato di Rapallo (1920): Isonzo, Caporetto, Tolmino, Idria, Aidussina e Canale d'Isonzo.",
    };
  }
  if (id === 'SI044' || normKey.includes('obalno') || normKey.includes('koper') || normKey.includes('capodistria')) {
    return {
      name: 'Capodistria e Carso (Venezia Giulia)',
      adminTitle: "Regno d'Italia — Province di Trieste e Pola",
      note: "Trattato di Rapallo (1920): Capodistria, Isola d'Istria, Pirano e Sesana.",
    };
  }
  if (id === 'SI038' || normKey.includes('postumia') || normKey.includes('postojna')) {
    return {
      name: 'Postumia e Bivio San Pietro (Venezia Giulia)',
      adminTitle: "Regno d'Italia — Provincia di Trieste",
      note: "Fascia confinaria del Carso e delle Grotte di Postumia, presidio della frontiera italo-jugoslava.",
    };
  }
  if (normKey.includes('saseno') || normKey.includes('sazan')) {
    return {
      name: 'Isolotto di Saseno (Piazzaforte Marittima)',
      adminTitle: "Regno d'Italia — Piazzaforte Militare di Saseno",
      note: "Isola fortificata all'ingresso della Baia di Valona, annessa all'Italia nel 1920 (Protocollo italo-albanese).",
    };
  }

  // 3. Francia occupata (Mentone, 1940)
  if (normKey.includes('menton') || normKey.includes('mentone')) {
    if (step >= 6) {
      return {
        name: 'Mentone (Zona di occupazione italiana)',
        adminTitle: "Regno d'Italia — Zona di occupazione italiana in Francia",
        note: "Occupata dal Regio Esercito durante la battaglia delle Alpi Occidentali e annessa de facto all'amministrazione della Provincia di Imperia (Armistizio di Villa Incisa, 24 giugno 1940).",
      };
    }
  }

  // 4. Match tra le 107 province del catalogo
  let foundProv: ItalyProvDef | undefined;
  if (id.startsWith('IT')) {
    foundProv = ITALY_PROVINCES_CATALOG.find((p) => p.nuts === id || id.startsWith(p.nuts));
  }

  if (!foundProv) {
    const normTokens = normKey.split('_').filter(Boolean);
    for (const p of ITALY_PROVINCES_CATALOG) {
      if (p.keys.some((k) => normKey === k || normTokens.includes(k) || (k.length >= 5 && normKey.includes(k)))) {
        foundProv = p;
        break;
      }
    }
  }

  if (foundProv) {
    const p = foundProv;
    const name = p.dynamicName ? p.dynamicName(step) : p.name;
    const adminTitle = p.dynamicAdminTitle ? p.dynamicAdminTitle(step) : (p.adminTitle || `Regno d'Italia — ${name}`);
    let note = p.dynamicNote ? p.dynamicNote(step) : p.note;
    if (owner === 'GER' && step >= 5 && (!note || note.length < 80)) {
      if (adminTitle.includes('Wartheland')) {
        note = 'Territorio della Polonia occidentale incorporato direttamente nel Reichsgau Wartheland (Gauleiter Arthur Greiser); sottoposto a spietate politiche di germanizzazione forzata, espropri e colonizzazione agricola.';
      } else if (adminTitle.includes('Danzig-Westpreußen')) {
        note = 'Territorio della Pomerania polacca annesso direttamente al Reichsgau Danzig-Westpreußen (Gauleiter Albert Forster); presidio strategico costiero e forestale sottoposto a germanizzazione e repressione dell\'Intelligenzaktion.';
      } else if (adminTitle.includes('Kattowitz') || adminTitle.includes('Oberschlesien')) {
        note = 'Bacino carbonifero e industriale dell\'Alta Slesia annesso direttamente al Terzo Reich (Regierungsbezirk Kattowitz, Gau Oberschlesien); polo siderurgico e minerario strategico integralmente asservito alle commesse belliche.';
      } else {
        note = 'Territorio polacco occupato incorporato nel Governatorato Generale (Generalgouvernement, Governatore Generale Hans Frank); soggetto a regime di sfruttamento economico totale, lavoro coatto, requisizioni e rigida sorveglianza militare.';
      }
    }
    return { name, adminTitle, note };
  }

  // 5. Se è un codice NUTS italiano non esplicitamente catalogato o toponimo generico
  if (id.startsWith('IT')) {
    const cleaned = cleanItalianToponymName(rawName) || rawName;
    return {
      name: cleaned.startsWith('Provincia') || cleaned.startsWith('Governatorato') ? cleaned : `Provincia di ${cleaned}`,
      adminTitle: "Regno d'Italia",
      note: "Provincia o circoscrizione amministrativa del Regno d'Italia.",
    };
  }

  return null;
}

export interface PolandProvDef {
  nuts: string;
  name: string;
  keys: string[];
  adminTitle?: string;
  note?: string;
  dynamicName?: (step: number) => string;
  dynamicAdminTitle?: (step: number) => string;
  dynamicNote?: (step: number) => string;
}

export const POLAND_PROVINCES_CATALOG: PolandProvDef[] = [
  // ================= 1. BASSA SLESIA TEDESCA PRE-1939 (Niederschlesien - 5) =================
  {
    nuts: 'PL514',
    name: 'Breslau (Niederschlesien)',
    keys: ['wroclaw', 'breslau', 'dolnoslaskie', 'miasto_wroclaw'],
    adminTitle: 'Deutsches Reich — Provinz Niederschlesien (Stadtkreis Breslau)',
    note: 'Capitale storica della Bassa Slesia (Niederschlesien), grande metropoli universitaria e industriale tedesca lungo il fiume Oder.',
  },
  {
    nuts: 'PL518',
    name: 'Breslau-Land und Brieg',
    keys: ['wroclawski', 'brieg', 'brzeg', 'olawa', 'ohlau', 'strzelin', 'strehlen'],
    adminTitle: 'Deutsches Reich — Provinz Niederschlesien (Landkreis Breslau)',
    note: 'Circondario rurale di Breslavia e città storica di Brieg (Brzeg) nella Bassa Slesia prussiana.',
  },
  {
    nuts: 'PL515',
    name: 'Hirschberg im Riesengebirge',
    keys: ['jeleniogorski', 'jelenia_gora', 'hirschberg', 'riesengebirge', 'karkonosze', 'bober'],
    adminTitle: 'Deutsches Reich — Provinz Niederschlesien (Regierungsbezirk Liegnitz)',
    note: 'Regione dei Monti dei Giganti (Riesengebirge) e della Bassa Slesia sud-occidentale lungo la frontiera con i Sudeti.',
  },
  {
    nuts: 'PL516',
    name: 'Liegnitz und Glogau',
    keys: ['legnicko_glogowski', 'legnica', 'glogow', 'liegnitz', 'glogau', 'lubin', 'luben'],
    adminTitle: 'Deutsches Reich — Provinz Niederschlesien (Regierungsbezirk Liegnitz)',
    note: 'Sede del Regierungsbezirk Liegnitz e fortezza fluviale di Glogau (Głogów) sull\'Oder.',
  },
  {
    nuts: 'PL517',
    name: 'Waldenburg und Glatz',
    keys: ['walbrzyski', 'walbrzych', 'waldenburg', 'glatz', 'klodzko', 'swidnica', 'schweidnitz', 'dzierzoniow', 'reichenbach'],
    adminTitle: 'Deutsches Reich — Provinz Niederschlesien (Regierungsbezirk Breslau)',
    note: 'Bacino carbonifero e industriale della Bassa Slesia (Waldenburger Bergland) e storica Contea montana di Glatz.',
  },

  // ================= 2. ALTA SLESIA TEDESCA PRE-1939 (Oberschlesien - 4) =================
  {
    nuts: 'PL524',
    name: 'Oppeln (Oberschlesien)',
    keys: ['opolski', 'opole', 'oppeln', 'brzeg', 'kluczbork', 'kreuzburg'],
    adminTitle: 'Deutsches Reich — Regierungsbezirk Oppeln (Provinz Oberschlesien)',
    note: 'Capitale amministrativa dell\'Alta Slesia rimasta alla Germania dopo il plebiscito del 1921.',
  },
  {
    nuts: 'PL523',
    name: 'Neisse (Oberschlesien)',
    keys: ['nyski', 'nysa', 'neisse', 'prudnik', 'neustadt_o_s', 'glucholazy', 'ziegenhals'],
    adminTitle: 'Deutsches Reich — Provinz Oberschlesien (Kreis Neisse)',
    note: 'Storico principato vescovile, piazzaforte militare e distretto montano dell\'Alta Slesia al confine con la Moravia.',
  },
  {
    nuts: 'PL228',
    name: 'Beuthen O.S.',
    keys: ['bytomski', 'bytom', 'beuthen', 'piekary', 'piekary_slaskie'],
    adminTitle: 'Deutsches Reich — Stadtkreis Beuthen (Provinz Oberschlesien)',
    note: 'Città mineraria e polo dell\'industria pesante dell\'Alta Slesia tedesca a ridosso del confine polacco.',
  },
  {
    nuts: 'PL229',
    name: 'Gleiwitz und Hindenburg O.S.',
    keys: ['gliwicki', 'gliwice', 'gleiwitz', 'zabrze', 'hindenburg'],
    adminTitle: 'Deutsches Reich — Stadtkreise Gleiwitz und Hindenburg (Provinz Oberschlesien)',
    note: 'Cuore industriale tedesco dell\'Alta Slesia. La stazione radio di Gleiwitz fu teatro della provocazione nazista (operazione Himmler, 31 agosto 1939) usata come pretesto per invadere la Polonia.',
  },

  // ================= 3. POMERANIA TEDESCA PRE-1939 (Pommern - 5) =================
  {
    nuts: 'PL424',
    name: 'Stettin (Pommern)',
    keys: ['szczecin', 'stettin', 'miasto_szczecin'],
    adminTitle: 'Deutsches Reich — Provinz Pommern (Stadtkreis Stettin)',
    note: 'Grande porto baltico e capitale della Provincia prussiana di Pomerania alla foce dell\'Oder.',
  },
  {
    nuts: 'PL428',
    name: 'Stettin-Land und Stargard',
    keys: ['szczecinski', 'stargard', 'goleniow', 'gollnow', 'gryfino', 'greifenhagen', 'police', 'poelitz'],
    adminTitle: 'Deutsches Reich — Provinz Pommern (Regierungsbezirk Stettin)',
    note: 'Circondario rurale di Stettino attorno alla laguna dell\'Oder e antica città anseatica di Stargard in Pommern.',
  },
  {
    nuts: 'PL426',
    name: 'Köslin (Pommern)',
    keys: ['koszalinski', 'koszalin', 'koeslin', 'koslin', 'kolobrzeg', 'kolberg', 'bialogard', 'belgard'],
    adminTitle: 'Deutsches Reich — Regierungsbezirk Köslin (Provinz Pommern)',
    note: 'Sede del Regierungsbezirk Köslin e costa baltica della Pomerania centrale con la piazzaforte costiera di Kolberg.',
  },
  {
    nuts: 'PL427',
    name: 'Neustettin und Pyritz',
    keys: ['szczecinecko_pyrzycki', 'szczecinek', 'neustettin', 'pyrzyce', 'pyritz', 'drawsko', 'dramburg', 'walcz', 'deutsch_krone'],
    adminTitle: 'Deutsches Reich — Provinz Pommern (Regierungsbezirk Grenzmark Posen-Westpreußen)',
    note: 'Pomerania orientale interna, laghi di Drawsko e settore meridionale della linea fortificata del Pommernwall.',
  },
  {
    nuts: 'PL636',
    name: 'Stolp in Pommern',
    keys: ['slupski', 'slupsk', 'stolp', 'lebork', 'lauenburg', 'bytow', 'buetow'],
    adminTitle: 'Deutsches Reich — Regierungsbezirk Köslin (Provinz Pommern)',
    note: 'Pomerania Orientale tedesca (Hinterpommern) confinante a est con il Corridoio Polacco.',
  },

  // ================= 4. BRANDENBURGO E GRENZMARK PRE-1939 (3) =================
  {
    nuts: 'PL431',
    name: 'Landsberg an der Warthe',
    keys: ['gorzowski', 'gorzow', 'gorzow_wielkopolski', 'landsberg', 'landsberg_an_der_warthe', 'miedzyrzecz', 'meseritz', 'slubice'],
    adminTitle: 'Deutsches Reich — Provinz Brandenburg (Regierungsbezirk Frankfurt / Neumark)',
    note: 'Storica regione della Neumark lungo la Warta e settore fortificato dell\'Oder-Warthe-Bogen (Festungsfront im Osten).',
  },
  {
    nuts: 'PL432',
    name: 'Grünberg in Schlesien',
    keys: ['zielonogorski', 'zielona_gora', 'gruenberg', 'grunberg', 'zagan', 'sagan', 'zary', 'sorau', 'krosno_odrzanskie', 'crossen'],
    adminTitle: 'Deutsches Reich — Provinz Niederschlesien (Regierungsbezirk Liegnitz)',
    note: 'Territorio storico tedesco della Bassa Slesia settentrionale (Regierungsbezirk Liegnitz) e della Bassa Lusazia orientale (Sorau e Sagan), importante centro vinicolo, tessile e manifatturiero solcato dal corso dell\'Oder.',
  },
  {
    nuts: 'PL411',
    name: 'Schneidemühl (Grenzmark Posen-Westpreußen)',
    keys: ['pilski', 'pila', 'schneidemuehl', 'schneidemuhl', 'grenzmark', 'chodziez', 'kolmar_in_posen', 'czarnkow'],
    adminTitle: 'Deutsches Reich — Grenzmark Posen-Westpreußen / Pommern',
    note: 'Capoluogo della provincia prussiana di frontiera Grenzmark Posen-Westpreußen istituita dopo Versailles (aggregata alla Pomerania nel 1938).',
  },

  // ================= 5. PRUSSIA ORIENTALE TEDESCA PRE-1939 (Ostpreußen - 3) =================
  {
    nuts: 'PL621',
    name: 'Elbing (Ostpreußen)',
    keys: ['elblaski', 'elblag', 'elbing', 'malbork', 'marienburg', 'braniewo', 'braunsberg', 'kwidzyn', 'marienwerder', 'sztum'],
    adminTitle: 'Deutsches Reich — Regierungsbezirk Westpreußen (Provinz Ostpreußen)',
    note: 'Porto industriale della Prussia Orientale (cantieri navali Schichau-Werke) e maestosa fortezza teutonica di Marienburg sul Nogat.',
  },
  {
    nuts: 'PL622',
    name: 'Allenstein (Ostpreußen)',
    keys: ['olsztynski', 'olsztyn', 'allenstein', 'ostroda', 'osterode', 'szczytno', 'ortelsburg', 'nidzica', 'neidenburg'],
    adminTitle: 'Deutsches Reich — Regierungsbezirk Allenstein (Provinz Ostpreußen)',
    note: 'Capoluogo del Regierungsbezirk Allenstein nella Prussia Orientale meridionale (Warmia e Masuria), presidio del Tannenberg-Denkmal.',
  },
  {
    nuts: 'PL623',
    name: 'Lyck (Ostpreußen / Masuren)',
    keys: ['elcki', 'elk', 'lyck', 'gizycko', 'loetzen', 'lotzen', 'pisz', 'johannisburg', 'olecko', 'treuburg', 'wegorzewo', 'angerburg'],
    adminTitle: 'Deutsches Reich — Regierungsbezirk Allenstein (Masuren)',
    note: 'Regione dei Grandi Laghi Masuri e piazzaforte fortificata di Feste Boyen a Lötzen, frontiera orientale del Reich.',
  },

  // ================= 6. CITTÀ LIBERA DI DANZICA (PL633) =================
  {
    nuts: 'PL633',
    name: 'Freie Stadt Danzig (Gdańsk / Danzica)',
    keys: ['trojmiejski', 'gdansk', 'danzig', 'danzica', 'sopot', 'zoppot'],
    dynamicName: (s: number) =>
      s < 5 ? 'Freie Stadt Danzig (Gdańsk / Danzica)' : 'Danzig (Reichsgau Danzig-Westpreußen)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Freie Stadt Danzig — Mandato della Società delle Nazioni (Völkerbundskommissar)'
        : 'Deutsches Reich — Reichsgau Danzig-Westpreußen (Gauleiter Albert Forster)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Città-Stato autonoma (1920-1939) sotto l\'egida della Società delle Nazioni con unione doganale polacca e ufficio postale polacco; penisola di Westerplatte presidio militare polacco.'
        : 'Annessa al Terzo Reich il 1 settembre 1939 per proclama di Albert Forster e proclamata capitale del Reichsgau Danzig-Westpreußen.',
  },

  // ================= 7. CORRIDOIO POLACCO E POMERANIA POLACCA (Województwo Pomorskie - 6) =================
  {
    nuts: 'PL634',
    name: 'Gdynia e Puck (Województwo Pomorskie)',
    keys: ['gdanski', 'gdynia', 'gotenhafen', 'puck', 'putzig', 'kartuzy', 'karthaus', 'wejherowo', 'neustadt_in_westpreussen', 'hel'],
    dynamicName: (s: number) =>
      s < 5 ? 'Gdynia e Puck (Województwo Pomorskie)' : 'Gotenhafen und Danzig-Land (Reichsgau Danzig-Westpreußen)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Pomorskie'
        : 'Deutsches Reich — Reichsgau Danzig-Westpreußen',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Finestra sovrana della Polonia sul Baltico (Corridoio Polacco), modernissimo porto marittimo di Gdynia e area fortificata di Hel difesa fino al 2 ottobre 1939.'
        : 'Annesso al Reichsgau Danzig-Westpreußen; Gdynia fu ribattezzata Gotenhafen e trasformata in base operativa avanzata della Kriegsmarine.',
  },
  {
    nuts: 'PL637',
    name: 'Chojnice (Województwo Pomorskie)',
    keys: ['chojnicki', 'chojnice', 'konitz', 'tuchola', 'tuchel', 'czluchow', 'schlochau'],
    dynamicName: (s: number) =>
      s < 5 ? 'Chojnice (Województwo Pomorskie)' : 'Konitz (Reichsgau Danzig-Westpreußen)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Pomorskie'
        : 'Deutsches Reich — Reichsgau Danzig-Westpreußen',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Corridoio Polacco occidentale, foresta di Tuchola e teatro dei primi scontri a Krojanty il 1 settembre 1939.'
        : 'Landkreis Konitz nel Regierungsbezirk Danzig (Reichsgau Danzig-Westpreußen); snodo ferroviario di prima linea della Pomerania e fulcro della viabilità verso la Prussia Orientale.',
  },
  {
    nuts: 'PL638',
    name: 'Tczew e Starogard (Województwo Pomorskie)',
    keys: ['starogardzki', 'starogard', 'starogard_gdanski', 'tczew', 'dirschau', 'preussisch_stargard', 'kociewie', 'pelplin'],
    dynamicName: (s: number) =>
      s < 5 ? 'Tczew e Starogard (Województwo Pomorskie)' : 'Dirschau und Preußisch Stargard (Reichsgau Danzig-Westpreußen)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Pomorskie'
        : 'Deutsches Reich — Reichsgau Danzig-Westpreußen',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Ponte ferroviario strategico sulla Vistola a Tczew (fatto saltare dai genieri polacchi all\'alba del 1 settembre 1939) e regione del Kociewie.'
        : 'Distretto di Dirschau e Preußisch Stargard annesso al Reichsgau Danzig-Westpreußen; fondamentale snodo ferroviario per i ponti sulla Vistola e l\'accesso al porto di Danzica.',
  },
  {
    nuts: 'PL613',
    name: 'Bydgoszcz e Toruń (Województwo Pomorskie)',
    keys: ['bydgosko_torunski', 'bydgoszcz', 'torun', 'bromberg', 'thorn', 'chelmno', 'culm'],
    dynamicName: (s: number) =>
      s < 5 ? 'Bydgoszcz e Toruń (Województwo Pomorskie)' : 'Bromberg und Thorn (Reichsgau Danzig-Westpreußen)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Pomorskie'
        : 'Deutsches Reich — Regierungsbezirk Bromberg (Reichsgau Danzig-Westpreußen)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Capoluogo amministrativo (Toruń) e principale polo industriale (Bydgoszcz) del Voivodato di Pomerania.'
        : 'Capoluogo del Regierungsbezirk Bromberg incorporato nel Reichsgau Danzig-Westpreußen.',
  },
  {
    nuts: 'PL616',
    name: 'Grudziądz (Województwo Pomorskie)',
    keys: ['grudziadzki', 'grudziadz', 'graudenz', 'brodnica', 'strasburg_in_westpreussen', 'wabrzezno', 'briesen'],
    dynamicName: (s: number) =>
      s < 5 ? 'Grudziądz (Województwo Pomorskie)' : 'Graudenz (Reichsgau Danzig-Westpreußen)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Pomorskie'
        : 'Deutsches Reich — Reichsgau Danzig-Westpreußen',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Storica fortezza sulla Vistola e sede della scuola di cavalleria (Centrum Wyszkolenia Kawalerii) dell\'Esercito Polacco.'
        : 'Landkreis Graudenz annesso direttamente al Reichsgau Danzig-Westpreußen; piazzaforte strategica fluviale sulla Vistola sottoposta alle ferree politiche del Gauleiter Forster.',
  },
  {
    nuts: 'PL618',
    name: 'Świecie (Województwo Pomorskie)',
    keys: ['swiecki', 'swiecie', 'schwetz', 'tuchola', 'sepolno', 'zempelburg'],
    dynamicName: (s: number) =>
      s < 5 ? 'Świecie (Województwo Pomorskie)' : 'Schwetz an der Weichsel (Reichsgau Danzig-Westpreußen)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Pomorskie'
        : 'Deutsches Reich — Reichsgau Danzig-Westpreußen',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Distretto fluviale della Pomerania polacca tra la Vistola e le foreste di Tuchola.'
        : 'Landkreis Schwetz sulla riva occidentale della Vistola, incorporato nel Regierungsbezirk Marienwerder (Reichsgau Danzig-Westpreußen); distretto forestale ed idraulico chiave.',
  },

  // ================= 8. GRANDE POLONIA (Wielkopolska / Województwo Poznańskie -> Reichsgau Wartheland - 7) =================
  {
    nuts: 'PL415',
    name: 'Miasto Poznań (Województwo Poznańskie)',
    keys: ['poznan', 'posen', 'miasto_poznan', 'wielkopolska'],
    dynamicName: (s: number) =>
      s < 5 ? 'Miasto Poznań (Województwo Poznańskie)' : 'Posen (Hauptstadt Reichsgau Wartheland)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Poznańskie'
        : 'Deutsches Reich — Reichsgau Wartheland (Reichsstatthalter Arthur Greiser)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Capitale storica della Grande Polonia (Wielkopolska), culla della Nazione polacca e dell\'insurrezione vittoriosa del 1918-1919.'
        : 'Capitale del Reichsgau Wartheland (istituito nell\'ottobre 1939 dal Reichsstatthalter Arthur Greiser con l\'obiettivo di totale germanizzazione).',
  },
  {
    nuts: 'PL418',
    name: 'Poznań-Land e Gniezno (Województwo Poznańskie)',
    keys: ['poznanski', 'gniezno', 'gnesen', 'srem', 'schrimm', 'sroda', 'wrzesnia', 'wreschen', 'szamotuly', 'samter'],
    dynamicName: (s: number) =>
      s < 5 ? 'Poznań-Land e Gniezno (Województwo Poznańskie)' : 'Posen-Land und Gnesen (Reichsgau Wartheland)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Poznańskie'
        : 'Deutsches Reich — Reichsgau Wartheland',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Circondario agricolo di Poznań e prima capitale ecclesiastica e reale della Polonia a Gniezno (cattedrale di San Adalberto).'
        : 'Sede del Regierungsbezirk Posen e distretto rurale circostante incorporati nel Reichsgau Wartheland; fulcro amministrativo e agricolo della colonizzazione germanica.',
  },
  {
    nuts: 'PL414',
    name: 'Konin e Koło (Województwo Łódzkie / Poznańskie)',
    keys: ['koninski', 'konin', 'kolo', 'turek', 'slupca'],
    dynamicName: (s: number) =>
      s < 5 ? 'Konin e Koło (Województwo Łódzkie / Poznańskie)' : 'Konin (Reichsgau Wartheland)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Łódzkie / Poznańskie'
        : 'Deutsches Reich — Regierungsbezirk Hohensalza (Reichsgau Wartheland)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Bacino centrale del fiume Warta nella Polonia centro-occidentale.'
        : 'Circondario di Konin annesso direttamente al Terzo Reich nel settembre 1939 come Landkreis Konin all\'interno del Regierungsbezirk Hohensalza (Reichsgau Wartheland).',
  },
  {
    nuts: 'PL416',
    name: 'Kalisz e Ostrów Wielkopolski (Województwo Poznańskie)',
    keys: ['kaliski', 'kalisz', 'kalisch', 'ostrow', 'ostrow_wielkopolski', 'ostrowo', 'jarocin', 'jarotschin', 'pleszew'],
    dynamicName: (s: number) =>
      s < 5 ? 'Kalisz e Ostrów Wielkopolski (Województwo Poznańskie)' : 'Kalisch (Reichsgau Wartheland)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Poznańskie'
        : 'Deutsches Reich — Regierungsbezirk Kalisch / Litzmannstadt (Reichsgau Wartheland)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Storica città mercantile sulla Prosna e strategico snodo ferroviario di Ostrów Wielkopolski.'
        : 'Capoluogo del Regierungsbezirk Kalisch incorporato direttamente nel Reichsgau Wartheland; importante centro manifatturiero e snodo logistico verso la Germania centrale.',
  },
  {
    nuts: 'PL417',
    name: 'Leszno e Rawicz (Województwo Poznańskie)',
    keys: ['leszczynski', 'leszno', 'lissa', 'rawicz', 'rawitsch', 'gostyn', 'gostynin', 'koscian', 'kosten'],
    dynamicName: (s: number) =>
      s < 5 ? 'Leszno e Rawicz (Województwo Poznańskie)' : 'Lissa (Reichsgau Wartheland)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Poznańskie'
        : 'Deutsches Reich — Reichsgau Wartheland',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Grande Polonia meridionale lungo la frontiera con la Slesia tedesca.'
        : 'Circondario di Lissa annesso direttamente al Terzo Reich come Landkreis Lissa nel Regierungsbezirk Posen (Reichsgau Wartheland), sottoposto a germanizzazione integrale.',
  },
  {
    nuts: 'PL617',
    name: 'Inowrocław (Województwo Pomorskie / Poznańskie)',
    keys: ['inowroclawski', 'inowroclaw', 'hohensalza', 'mogilno', 'znin', 'dietfurt'],
    dynamicName: (s: number) =>
      s < 5 ? 'Inowrocław (Województwo Pomorskie / Poznańskie)' : 'Hohensalza (Reichsgau Wartheland)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Pomorskie'
        : 'Deutsches Reich — Regierungsbezirk Hohensalza (Reichsgau Wartheland)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Cuore storico della Cuiavia (Kujawy), ricco distretto termale, salifero e agricolo.'
        : 'Capoluogo del Regierungsbezirk Hohensalza nel Reichsgau Wartheland; grande polo per l\'estrazione del salgemma e centro di raffinazione saccarifera d\'interesse bellico.',
  },
  {
    nuts: 'PL619',
    name: 'Włocławek (Województwo Pomorskie / Warszawskie)',
    keys: ['wloclawski', 'wloclawek', 'leslau', 'radziejow', 'lipno'],
    dynamicName: (s: number) =>
      s < 5 ? 'Włocławek (Województwo Pomorskie / Warszawskie)' : 'Leslau (Reichsgau Wartheland)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Pomorskie'
        : 'Deutsches Reich — Reichsgau Wartheland',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Storica sede vescovile cuiava e porto fluviale sulla riva sinistra della Vistola.'
        : 'Landkreis Leslau nel Regierungsbezirk Hohensalza (Reichsgau Wartheland); snodo industriale e portuale fluviale sulla Vistola riorganizzato per la produzione autarchica.',
  },

  // ================= 9. REGIONE DI ŁÓDŹ (Województwo Łódzkie -> Wartheland o Generalgouvernement - 5) =================
  {
    nuts: 'PL711',
    name: 'Miasto Łódź (Województwo Łódzkie)',
    keys: ['lodz', 'litzmannstadt', 'lodzkie', 'miasto_lodz'],
    dynamicName: (s: number) =>
      s < 5 ? 'Miasto Łódź (Województwo Łódzkie)' : 'Litzmannstadt (Reichsgau Wartheland)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Łódzkie'
        : 'Deutsches Reich — Reichsgau Wartheland (Stadtkreis Litzmannstadt)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Seconda città della Polonia e colossale polo industriale tessile (la "Manchester polacca").'
        : 'Annessa al Reich nell\'ottobre 1939; nell\'aprile 1940 ribattezzata Litzmannstadt (in onore del generale Karl Litzmann) e trasformata nella più popolosa città del Wartheland (ghetto di Litzmannstadt istituito nel febbraio 1940).',
  },
  {
    nuts: 'PL712',
    name: 'Łódź-Land e Pabianice (Województwo Łódzkie)',
    keys: ['lodzki', 'pabianice', 'zgierz', 'brzeziny', 'lowenstadt'],
    dynamicName: (s: number) =>
      s < 5 ? 'Łódź-Land e Pabianice (Województwo Łódzkie)' : 'Litzmannstadt-Land (Reichsgau Wartheland)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Łódzkie'
        : 'Deutsches Reich — Reichsgau Wartheland',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Cintura industriale tessile attorno a Łódź comprendente Pabianice, Zgierz e Aleksandrów.'
        : 'Landkreis Litzmannstadt nel Reichsgau Wartheland; imponente bacino tessile e industriale della Polonia centrale integralmente riconvertito alla fornitura di uniformi della Wehrmacht.',
  },
  {
    nuts: 'PL714',
    name: 'Sieradz e Wieluń (Województwo Łódzkie)',
    keys: ['sieradzki', 'sieradz', 'schieratz', 'wielun', 'zdunska_wola', 'freihaus', 'lask'],
    dynamicName: (s: number) =>
      s < 5 ? 'Sieradz e Wieluń (Województwo Łódzkie)' : 'Schieratz (Reichsgau Wartheland)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Łódzkie'
        : 'Deutsches Reich — Reichsgau Wartheland',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Confine occidentale della Polonia centrale lungo la Warta; la città inerme di Wieluń fu il primo bersaglio del devastante bombardamento terroristico della Luftwaffe all\'alba del 1 settembre 1939.'
        : 'Landkreis Schieratz nel Regierungsbezirk Kalisch (Reichsgau Wartheland); territorio agricolo lungo il fiume Warta sottoposto a requisizioni e redistribuzioni fondiarie ai coloni.',
  },
  {
    nuts: 'PL713',
    name: 'Piotrków Trybunalski e Tomaszów (Województwo Łódzkie)',
    keys: ['piotrkowski', 'piotrkow', 'piotrkow_trybunalski', 'petrikau', 'tomaszow', 'tomaszow_mazowiecki', 'belchatow', 'radomsko'],
    dynamicName: (s: number) =>
      s < 5 ? 'Piotrków Trybunalski e Tomaszów (Województwo Łódzkie)' : 'Petrikau und Tomaschow (Distrikt Radom — Generalgouvernement)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Łódzkie'
        : 'Generalgouvernement — Distrikt Radom (Kreishauptmannschaft Petrikau)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Storica sede del Tribunale della Corona della Polonia nobiliare e distretto industriale tessile-chimico di Tomaszów Mazowiecki.'
        : 'Kreishauptmannschaft Petrikau nel Distrikt Radom del Governatorato Generale; polo tessile, vetrario e ferroviario strategico sulle direttrici per Varsavia e Cracovia.',
  },
  {
    nuts: 'PL715',
    name: 'Skierniewice e Łowicz (Województwo Warszawskie / Łódzkie)',
    keys: ['skierniewicki', 'skierniewice', 'lowicz', 'rawa_mazowiecka', 'kutno'],
    dynamicName: (s: number) =>
      s < 5 ? 'Skierniewice e Łowicz (Województwo Warszawskie / Łódzkie)' : 'Skierniewice und Lowitsch (Distrikt Warschau — Generalgouvernement)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Warszawskie'
        : 'Generalgouvernement — Distrikt Warschau',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Snodo ferroviario strategico verso Varsavia; teatro della decisiva controffensiva polacca sul fiume Bzura (9-22 settembre 1939).'
        : 'Kreishauptmannschaft Skierniewice e Lowitsch nel Distrikt Warschau del Governatorato Generale; snodo ferroviario cruciale e riserva agricola per il presidio di Varsavia.',
  },

  // ================= 10. ALTA SLESIA POLACCA E ZAGŁĘBIE -> Regierungsbezirk Kattowitz (6) =================
  {
    nuts: 'PL22A',
    name: 'Katowice e Chorzów (Autonomiczne Województwo Śląskie)',
    keys: ['katowicki', 'katowice', 'kattowitz', 'chorzow', 'koenigshuette', 'slaskie', 'siemianowice', 'ruda_slaska'],
    dynamicName: (s: number) =>
      s < 5 ? 'Katowice e Chorzów (Autonomiczne Województwo Śląskie)' : 'Kattowitz (Regierungsbezirk Kattowitz — Gau Oberschlesien)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Autonomiczne Województwo Śląskie (Sejm Śląski)'
        : 'Deutsches Reich — Regierungsbezirk Kattowitz (Provinz Oberschlesien)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Capitale dell\'Autonomo Voivodato della Slesia (dotato di statuto organico, parlamento Sejm Śląski e tesoro autonomo), colossale centro siderurgico e carbonifero polacco.'
        : 'Annesso direttamente al Terzo Reich nell\'ottobre 1939 come capoluogo del nuovo Regierungsbezirk Kattowitz.',
  },
  {
    nuts: 'PL227',
    name: 'Rybnik e Wodzisław (Autonomiczne Województwo Śląskie)',
    keys: ['rybnicki', 'rybnik', 'wodzislaw', 'wodzislaw_slaski', 'zory', 'jastrzebie', 'jastrzebie_zdroj', 'raciborz'],
    dynamicName: (s: number) =>
      s < 5 ? 'Rybnik e Wodzisław (Autonomiczne Województwo Śląskie)' : 'Rybnik (Regierungsbezirk Kattowitz — Gau Oberschlesien)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Autonomiczne Województwo Śląskie'
        : 'Deutsches Reich — Landkreis Rybnik (Regierungsbezirk Kattowitz)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Distretto minerario dell\'Alta Slesia polacca meridionale lungo la frontiera dell\'Oder con Ratibor.'
        : 'Annesso direttamente al Terzo Reich come Landkreis Rybnik nel Regierungsbezirk Kattowitz.',
  },
  {
    nuts: 'PL22C',
    name: 'Pszczyna e Tychy (Autonomiczne Województwo Śląskie)',
    keys: ['tyski', 'tychy', 'pszczyna', 'pless', 'mikolow', 'bierun'],
    dynamicName: (s: number) =>
      s < 5 ? 'Pszczyna e Tychy (Autonomiczne Województwo Śląskie)' : 'Pless und Tichau (Regierungsbezirk Kattowitz)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Autonomiczne Województwo Śląskie'
        : 'Deutsches Reich — Landkreis Pless (Regierungsbezirk Kattowitz)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Storico principato di Pszczyna e bacino forestale-minerario della Slesia polacca.'
        : 'Distretto industriale e minerario dell\'Alta Slesia annesso direttamente al Terzo Reich nel settembre 1939 come Landkreis Pless (Regierungsbezirk Kattowitz, Gau Oberschlesien).',
  },
  {
    nuts: 'PL225',
    name: 'Bielsko e Biała (Autonomiczne Województwo Śląskie)',
    keys: ['bielski', 'bielsko', 'bielitz', 'biala', 'zywiec', 'saybusch', 'cieszyn'],
    dynamicName: (s: number) =>
      s < 5 ? 'Bielsko e Biała (Autonomiczne Województwo Śląskie)' : 'Bielitz (Regierungsbezirk Kattowitz — Gau Oberschlesien)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Autonomiczne Województwo Śląskie'
        : 'Deutsches Reich — Landkreis Bielitz (Regierungsbezirk Kattowitz)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Città gemelle ai piedi dei Beschidi Slesiani: Bielsko (Slesia) e Biała (Piccola Polonia), fiorente distretto laniero e industriale.'
        : 'Annesso direttamente al Reich come Landkreis Bielitz nel Regierungsbezirk Kattowitz.',
  },
  {
    nuts: 'PL22B',
    name: 'Sosnowiec e Dąbrowa Górnicza (Zagłębie Dąbrowskie)',
    keys: ['sosnowiecki', 'sosnowiec', 'sosnowitz', 'dabrowa_gornicza', 'bedzin', 'bendzin', 'zawiercie', 'zaglebie'],
    dynamicName: (s: number) =>
      s < 5 ? 'Sosnowiec e Dąbrowa Górnicza (Zagłębie Dąbrowskie)' : 'Sosnowitz (Regierungsbezirk Kattowitz — Gau Oberschlesien)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Kieleckie (Zagłębie Dąbrowskie)'
        : 'Deutsches Reich — Landkreis Sosnowitz (Regierungsbezirk Kattowitz)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Bacino industriale carbonifero e siderurgico del Zagłębie Dąbrowskie (già parte del Regno del Congresso zarista, assegnato nel 1919 al Voivodato di Kielce).'
        : 'Annesso direttamente al Terzo Reich nell\'ottobre 1939 e aggregato al Regierungsbezirk Kattowitz.',
  },
  {
    nuts: 'PL21A',
    name: 'Oświęcim e Chrzanów (Województwo Krakowskie)',
    keys: ['oswiecimski', 'oswiecim', 'auschwitz', 'chrzanow', 'krenau', 'wadowice', 'olpuch'],
    dynamicName: (s: number) =>
      s < 5 ? 'Oświęcim e Chrzanów (Województwo Krakowskie)' : 'Auschwitz und Krenau (Regierungsbezirk Kattowitz)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Krakowskie'
        : 'Deutsches Reich — Regierungsbezirk Kattowitz (Provinz Oberschlesien)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Snodo ferroviario strategico e distretto chimico-minerario tra Cracovia e la Slesia (Voivodato di Cracovia).'
        : 'Annesso direttamente al Terzo Reich nell\'ottobre 1939 come parte del Regierungsbezirk Kattowitz. Nella primavera del 1940 le SS insediarono nelle ex caserme dell\'esercito polacco il campo di concentramento di Auschwitz.',
  },

  // ================= 11. MAZOVIA SETTENTRIONALE -> Regierungsbezirk Zichenau / Ostpreußen (4) =================
  {
    nuts: 'PL922',
    name: 'Ciechanów e Mława (Województwo Warszawskie)',
    keys: ['ciechanowski', 'ciechanow', 'zichenau', 'mlawa', 'dzialdowo', 'soldau', 'pultusk'],
    dynamicName: (s: number) =>
      s < 5 ? 'Ciechanów e Mława (Województwo Warszawskie)' : 'Zichenau (Regierungsbezirk Zichenau — Ostpreußen)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Warszawskie'
        : 'Deutsches Reich — Regierungsbezirk Zichenau (Provinz Ostpreußen)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Mazovia settentrionale lungo la linea fortificata di Mława (teatro della feroce battaglia di frontiera dell\'1-3 settembre 1939).'
        : 'Annesso direttamente al Terzo Reich nell\'ottobre 1939 come capoluogo del nuovo Regierungsbezirk Zichenau incorporato nella provincia della Prussia Orientale.',
  },
  {
    nuts: 'PL923',
    name: 'Płock e Sierpc (Województwo Warszawskie)',
    keys: ['plocki', 'plock', 'schroettersburg', 'schrottersburg', 'sierpc', 'gostynin'],
    dynamicName: (s: number) =>
      s < 5 ? 'Płock e Sierpc (Województwo Warszawskie)' : 'Schröttersburg (Regierungsbezirk Zichenau — Ostpreußen)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Warszawskie'
        : 'Deutsches Reich — Regierungsbezirk Zichenau (Provinz Ostpreußen)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Antica capitale ducale di Mazovia sul ciglio alto della Vistola e sede vescovile millenaria.'
        : 'Landkreis Schröttersburg (Regierungsbezirk Zichenau) incorporato nella Prussia Orientale.',
  },
  {
    nuts: 'PL924',
    name: 'Ostrołęka e Przasnysz (Województwo Warszawskie / Białostockie)',
    keys: ['ostrolecki', 'ostroleka', 'scharfenwiese', 'przasnysz', 'makow', 'makow_mazowiecki', 'ostrow_mazowiecka'],
    dynamicName: (s: number) =>
      s < 5 ? 'Ostrołęka e Przasnysz (Województwo Warszawskie / Białostockie)' : 'Scharfenwiese (Regierungsbezirk Zichenau — Ostpreußen)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Warszawskie'
        : 'Deutsches Reich — Regierungsbezirk Zichenau (Provinz Ostpreußen)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Valle del fiume Narew e foresta storica dei Kurpie.'
        : 'Landkreis Scharfenwiese (Regierungsbezirk Zichenau) incorporato nella Prussia Orientale.',
  },
  {
    nuts: 'PL843',
    name: 'Suwałki e Augustów (Województwo Białostockie)',
    keys: ['suwalski', 'suwalki', 'sudauen', 'augustow', 'sejny'],
    dynamicName: (s: number) =>
      s < 5 ? 'Suwałki e Augustów (Województwo Białostockie)' : 'Sudauen (Regierungsbezirk Zichenau / Ostpreußen)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Białostockie'
        : 'Deutsches Reich — Landkreis Sudauen (Provinz Ostpreußen)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Regione dei laghi di Suwałki e Canale di Augustów lungo il confine con la Lituania.'
        : 'Il cosiddetto "Triangolo di Suwałki" fu incorporato direttamente nella Prussia Orientale come Landkreis Sudauen a seguito degli accordi segreti tedesco-sovietici del 28 settembre 1939.',
  },

  // ================= 12. POLONIA NORD-ORIENTALE ANNÙSSIA ALL'URSS (Belostokskaya oblast - 2) =================
  {
    nuts: 'PL841',
    name: 'Miasto Białystok (Województwo Białostockie)',
    keys: ['bialostocki', 'bialystok', 'belostok', 'podlaskie', 'miasto_bialystok'],
    dynamicName: (s: number) =>
      s < 5 ? 'Miasto Białystok (Województwo Białostockie)' : 'Belostok (Belostokskaya oblast — BSSR)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Białostockie'
        : 'SSSR — Belorusskaya SSR (Belostokskaya oblast)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Capoluogo del Voivodato di Białystok, grande polo industriale tessile e snodo ferroviario verso Grodno e Wilno.'
        : 'Occupato dall\'Armata Rossa nel settembre 1939 e annesso all\'Unione Sovietica (RSS Bielorussa) come Belostokskaya oblast a seguito del Patto Molotov-Ribbentrop.',
  },
  {
    nuts: 'PL842',
    name: 'Łomża e Grajewo (Województwo Białostockie)',
    keys: ['lomzynski', 'lomza', 'lomzha', 'grajewo', 'zambrow', 'kolno'],
    dynamicName: (s: number) =>
      s < 5 ? 'Łomża e Grajewo (Województwo Białostockie)' : 'Lomzha (Belostokskaya oblast — BSSR)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Białostockie'
        : 'SSSR — Belorusskaya SSR (Belostokskaya oblast)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Valle del Narew e settore fortificato di Nowogród e Wizna ("le Termopili polacche", 7-10 settembre 1939).'
        : 'Occupato dall\'Armata Rossa nel settembre 1939 e integrato nella Belostokskaya oblast della RSS Bielorussa.',
  },

  // ================= 13. GENERALGOUVERNEMENT: DISTRIKT WARSCHAU (5) =================
  {
    nuts: 'PL911',
    name: 'Miasto Stołeczne Warszawa (Polonia)',
    keys: ['warszawa', 'warsaw', 'warschau', 'mazowieckie', 'miasto_warszawa'],
    dynamicName: (s: number) =>
      s < 5 ? 'Miasto Stołeczne Warszawa (Polonia)' : 'Warschau (Distrikt Warschau — Generalgouvernement)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Miasto Stołeczne Warszawa (Prezydent Stefan Starzyński)'
        : 'Generalgouvernement — Distrikt Warschau (Gouverneur Ludwig Fischer)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Capitale della Seconda Repubblica di Polonia, sede del Presidente Ignacy Mościcki e del Castello Reale. Difesa strenuamente dall\'esercito e dalla popolazione civile sotto la guida del sindaco Stefan Starzyński fino alla capitolazione del 28 settembre 1939.'
        : 'Sede del Governatore del Distrikt Warschau nel Governatorato Generale. Nell\'ottobre 1940 le autorità naziste vi istituirono il più grande Ghetto ebraico d\'Europa.',
  },
  {
    nuts: 'PL912',
    name: 'Warszawa Wschód e Praga (Województwo Warszawskie)',
    keys: ['warszawski_wschodni', 'praga', 'otwock', 'wolomin', 'minsk_mazowiecki', 'legionowo'],
    dynamicName: (s: number) =>
      s < 5 ? 'Warszawa Wschód e Praga (Województwo Warszawskie)' : 'Warschau-Ost und Praga (Distrikt Warschau)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Warszawskie'
        : 'Generalgouvernement — Distrikt Warschau',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Riva destra della Vistola col sobborgo storico di Praga, Otwock e la linea ferroviaria verso Brześć nad Bugiem.'
        : 'Settore orientale di Varsavia e sobborgo di Praga (Distrikt Warschau del Governatorato Generale); testa di ponte fluviale sulla riva destra della Vistola sotto controllo militare.',
  },
  {
    nuts: 'PL913',
    name: 'Warszawa Zachód e Modlin (Województwo Warszawskie)',
    keys: ['warszawski_zachodni', 'modlin', 'pruszkow', 'piaseczno', 'grodzisk', 'grodzisk_mazowiecki', 'nowy_dwor'],
    dynamicName: (s: number) =>
      s < 5 ? 'Warszawa Zachód e Modlin (Województwo Warszawskie)' : 'Warschau-West und Modlin (Distrikt Warschau)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Warszawskie'
        : 'Generalgouvernement — Distrikt Warschau',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Circondario occidentale della capitale e possente fortezza fluviale di Modlin (eroica resistenza polacca fino al 29 settembre 1939).'
        : 'Settore occidentale suburbano di Varsavia e fortezza fluviale di Modlin (Distrikt Warschau); presidio militare tedesco a guardia della confluenza tra Vistola e Narew.',
  },
  {
    nuts: 'PL925',
    name: 'Siedlce e Podlasie (Województwo Lubelskie / Warszawskie)',
    keys: ['siedlecki', 'siedlce', 'wegrow', 'sokolow_podlaski', 'lukow', 'losice'],
    dynamicName: (s: number) =>
      s < 5 ? 'Siedlce e Podlasie (Województwo Lubelskie / Warszawskie)' : 'Siedlce (Distrikt Warschau — Generalgouvernement)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Lubelskie'
        : 'Generalgouvernement — Distrikt Warschau (Kreishauptmannschaft Siedlce)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Podlachia meridionale, snodo ferroviario strategico verso Brest e teatro degli scontri della battaglia di Kock (ottobre 1939).'
        : 'Kreishauptmannschaft Siedlce nel Distrikt Warschau del Governatorato Generale; snodo ferroviario strategico verso Brześć nad Bugiem e la nuova frontiera con l\'Unione Sovietica.',
  },
  {
    nuts: 'PL926',
    name: 'Żyrardów e Sochaczew (Województwo Warszawskie)',
    keys: ['zyrardowski', 'zyrardow', 'sochaczew', 'grojec', 'warka'],
    dynamicName: (s: number) =>
      s < 5 ? 'Żyrardów e Sochaczew (Województwo Warszawskie)' : 'Sochaczew und Zyrardow (Distrikt Warschau)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Warszawskie'
        : 'Generalgouvernement — Distrikt Warschau',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Polo manifatturiero del lino a Żyrardów e frutteti del Grójecki a sud-ovest di Varsavia.'
        : 'Kreishauptmannschaft Sochaczew e distretto industriale di Zyrardow nel Distrikt Warschau; grande polo per la filatura e tessitura del lino riconvertito alle commesse belliche.',
  },

  // ================= 14. GENERALGOUVERNEMENT: DISTRIKT KRAKAU (9) =================
  {
    nuts: 'PL213',
    name: 'Kraków (Województwo Krakowskie)',
    keys: ['krakow', 'cracovia', 'krakau', 'malopolskie', 'miasto_krakow', 'wawel'],
    dynamicName: (s: number) =>
      s < 5 ? 'Kraków (Województwo Krakowskie)' : 'Krakau (Hauptstadt des Generalgouvernements)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Krakowskie'
        : 'Generalgouvernement — Hauptstadt Krakau (Generalgouverneur Hans Frank)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Antica capitale reale della Polonia, sede dell\'Università Jagellonica e del Castello del Wawel.'
        : 'Capitale del Governatorato Generale (Generalgouvernement für die besetzten polnischen Gebiete); il castello reale del Wawel fu requisito come residenza ufficiale del governatore generale Hans Frank.',
  },
  {
    nuts: 'PL214',
    name: 'Kraków-Land e Wieliczka (Województwo Krakowskie)',
    keys: ['krakowski', 'wieliczka', 'bochnia', 'myslenice', 'proszowice'],
    dynamicName: (s: number) =>
      s < 5 ? 'Kraków-Land e Wieliczka (Województwo Krakowskie)' : 'Krakau-Land (Distrikt Krakau — Generalgouvernement)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Krakowskie'
        : 'Generalgouvernement — Distrikt Krakau',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Circondario rurale di Cracovia con le storiche miniere di sale di Wieliczka e Bochnia.'
        : 'Kreishauptmannschaft Krakau-Land nel Governatorato Generale (Generalgouvernement), territorio polacco occupato comprendente le miniere saline storiche e i distretti agricoli suburbani della capitale del Governatorato.',
  },
  {
    nuts: 'PL217',
    name: 'Tarnów e Brzesko (Województwo Krakowskie)',
    keys: ['tarnowski', 'tarnow', 'brzesko', 'dabrowa_tarnowska'],
    dynamicName: (s: number) =>
      s < 5 ? 'Tarnów e Brzesko (Województwo Krakowskie)' : 'Tarnow (Distrikt Krakau — Generalgouvernement)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Krakowskie'
        : 'Generalgouvernement — Distrikt Krakau (Kreishauptmannschaft Tarnow)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Piccola Polonia centrale, grande complesso chimico statale di Mościce e snodo sulla ferrovia galiziana.'
        : 'Kreishauptmannschaft Tarnow nel Distrikt Krakau del Governatorato Generale; importante polo per la produzione chimica azotata di Mościce asservito alla produzione bellica tedesca.',
  },
  {
    nuts: 'PL218',
    name: 'Nowy Sącz e Gorlice (Województwo Krakowskie)',
    keys: ['nowosadecki', 'nowy_sacz', 'neu_sandez', 'gorlice', 'krynica', 'limanowa'],
    dynamicName: (s: number) =>
      s < 5 ? 'Nowy Sącz e Gorlice (Województwo Krakowskie)' : 'Neu-Sandez (Distrikt Krakau — Generalgouvernement)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Krakowskie'
        : 'Generalgouvernement — Distrikt Krakau (Kreishauptmannschaft Neu-Sandez)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Regione dei Beschidi Sądecki, stazioni termali di Krynica e storico distretto petrolifero di Gorlice.'
        : 'Distrikt Krakau del Governatorato Generale al confine meridionale con la Slovacchia.',
  },
  {
    nuts: 'PL219',
    name: 'Podhale e Zakopane (Województwo Krakowskie)',
    keys: ['nowotarski', 'nowy_targ', 'zakopane', 'podhale', 'tatry', 'sucha_beskidzka'],
    dynamicName: (s: number) =>
      s < 5 ? 'Podhale e Zakopane (Województwo Krakowskie)' : 'Neumarkt am Dunajec und Zakopane (Distrikt Krakau)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Krakowskie'
        : 'Generalgouvernement — Distrikt Krakau (Kreishauptmannschaft Neumarkt)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Regione montana del Podhale e massiccio degli Alti Tatra (Zakopane), celebre centro alpinistico polacco.'
        : 'Kreishauptmannschaft Neumarkt nel Distrikt Krakau del Governatorato Generale, comprendente la roccaforte montano-alpina dei Tatra a Zakopane e il confine difensivo verso la Slovacchia.',
  },
  {
    nuts: 'PL821',
    name: 'Krosno e Sanok (Województwo Lwowskie)',
    keys: ['krosnienski', 'krosno', 'sanok', 'jaslo', 'bieszczady', 'lesko'],
    dynamicName: (s: number) =>
      s < 5 ? 'Krosno e Sanok (Województwo Lwowskie)' : 'Krosno und Sanok (Distrikt Krakau — Generalgouvernement)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Lwowskie'
        : 'Generalgouvernement — Distrikt Krakau (Kreishauptmannschaft Sanok)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Beschidi Orientali (Bieszczady) e culla dell\'industria petrolifera polacca a Krosno (Voivodato di Leopoli).'
        : 'Settore occidentale del Voivodato di Leopoli rimasto a ovest della linea di demarcazione del fiume San e annesso al Distrikt Krakau.',
  },
  {
    nuts: 'PL822',
    name: 'Przemyśl e Jarosław (Województwo Lwowskie)',
    keys: ['przemyski', 'przemysl', 'jaroslaw', 'lubaczow', 'przeworsk'],
    dynamicName: (s: number) =>
      s < 5 ? 'Przemyśl e Jarosław (Województwo Lwowskie)' : 'Przemysl (Distrikt Krakau — Generalgouvernement)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Lwowskie'
        : 'Generalgouvernement — Distrikt Krakau (Grenzstadt am San)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Fortezza storica e centro religioso sul fiume San nel Voivodato di Leopoli.'
        : 'Città di frontiera divisa dal fiume San tra la zona d\'occupazione tedesca (Distrikt Krakau) e quella sovietica fino al giugno 1941.',
  },
  {
    nuts: 'PL823',
    name: 'Rzeszów e Łańcut (Województwo Lwowskie)',
    keys: ['rzeszowski', 'rzeszow', 'reichshof', 'lancut', 'podkarpackie', 'strzyzow', 'kolbuszowa'],
    dynamicName: (s: number) =>
      s < 5 ? 'Rzeszów e Łańcut (Województwo Lwowskie)' : 'Reichshof (Distrikt Krakau — Generalgouvernement)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Lwowskie'
        : 'Generalgouvernement — Distrikt Krakau (Kreishauptmannschaft Reichshof)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Polo ingegneristico e aeronautico del Distretto Industriale Centrale polacco (COP - Centralny Okręg Przemysłowy, stabilimenti motori PZL).'
        : 'Distrikt Krakau del Governatorato Generale; ridenominato Reichshof dall\'amministrazione occupante.',
  },
  {
    nuts: 'PL824',
    name: 'Stalowa Wola e Tarnobrzeg (Województwo Lwowskie)',
    keys: ['tarnobrzeski', 'tarnobrzeg', 'stalowa_wola', 'mielec', 'nisko'],
    dynamicName: (s: number) =>
      s < 5 ? 'Stalowa Wola e Tarnobrzeg (Województwo Lwowskie)' : 'Stalowa Wola und Tarnobrzeg (Distrikt Krakau)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Lwowskie'
        : 'Generalgouvernement — Distrikt Krakau',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Cuore siderurgico, armiero e aeronautico del COP (fonderie di Stalowa Wola e fabbrica aerei PZL di Mielec, fondate nel 1937-1938).'
        : 'Distrikt Krakau del Governatorato Generale lungo la confluenza del San nella Vistola.',
  },

  // ================= 15. GENERALGOUVERNEMENT: DISTRIKT RADOM (4) =================
  {
    nuts: 'PL921',
    name: 'Miasto Radom (Województwo Kieleckie)',
    keys: ['radomski', 'radom', 'kozienice', 'pionki', 'szydlowiec'],
    dynamicName: (s: number) =>
      s < 5 ? 'Miasto Radom (Województwo Kieleckie)' : 'Radom (Hauptstadt Distrikt Radom — Generalgouvernement)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Kieleckie'
        : 'Generalgouvernement — Distrikt Radom (Gouverneur Karl Lasch)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Importante centro dell\'industria militare e armiera polacca (Fabbrica d\'Armi FB Radom, produttrice della celebre pistola Vis wz. 35) e polverificio di Pionki.'
        : 'Capitale amministrativa del Distrikt Radom nel Governatorato Generale; sede del Governatore Karl Lasch e fulcro della fabbricazione d\'armi portatili (fucili Mauser e pistole Vis).',
  },
  {
    nuts: 'PL721',
    name: 'Kielce e Starachowice (Województwo Kieleckie)',
    keys: ['kielecki', 'kielce', 'starachowice', 'ostrowiec', 'ostrowiec_swietokrzyski', 'swietokrzyskie', 'skarzysko'],
    dynamicName: (s: number) =>
      s < 5 ? 'Kielce e Starachowice (Województwo Kieleckie)' : 'Kielce (Distrikt Radom — Generalgouvernement)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Kieleckie'
        : 'Generalgouvernement — Distrikt Radom (Kreishauptmannschaft Kielce)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Capoluogo del Voivodato di Kielce, Monti Świętokrzyskie e polo siderurgico-bellico di Starachowice, Ostrowiec e Skarżysko-Kamienna.'
        : 'Kreishauptmannschaft Kielce nel Distrikt Radom del Governatorato Generale; distretto montuoso dei Monti Świętokrzyskie ricco di cave e miniere metallifere sfruttate dal Reich.',
  },
  {
    nuts: 'PL722',
    name: 'Sandomierz e Jędrzejów (Województwo Kieleckie)',
    keys: ['sandomiersko_jedrzejowski', 'sandomierz', 'sandomir', 'jedrzejow', 'busko', 'busko_zdroj', 'staszow', 'pinczow', 'kazimierza_wielka'],
    dynamicName: (s: number) =>
      s < 5 ? 'Sandomierz e Jędrzejów (Województwo Kieleckie)' : 'Sandomir und Jedrzejow (Distrikt Radom)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Kieleckie'
        : 'Generalgouvernement — Distrikt Radom',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Antica città sulla Vistola destinata nei piani polacchi pre-bellici a divenire capitale del nuovo Voivodato di Sandomierz come perno del COP.'
        : 'Kreishauptmannschaft Sandomir nel Distrikt Radom del Governatorato Generale; storico presidio sulla riva alta della Vistola e snodo di controllo fluviale e cerealicolo.',
  },
  {
    nuts: 'PL224',
    name: 'Częstochowa (Województwo Kieleckie)',
    keys: ['czestochowski', 'czestochowa', 'tschenstochau', 'jasna_gora', 'myszkow', 'klobuck'],
    dynamicName: (s: number) =>
      s < 5 ? 'Częstochowa (Województwo Kieleckie)' : 'Tschenstochau (Distrikt Radom — Generalgouvernement)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Kieleckie'
        : 'Generalgouvernement — Distrikt Radom (Kreishauptmannschaft Tschenstochau)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Santuario nazionale di Jasna Góra (Madonna Nera di Częstochowa), polo siderurgico e tessile al confine con la Slesia tedesca.'
        : 'Kreishauptmannschaft Tschenstochau nel Distrikt Radom del Governatorato Generale.',
  },

  // ================= 16. GENERALGOUVERNEMENT: DISTRIKT LUBLIN (4) =================
  {
    nuts: 'PL814',
    name: 'Miasto Lublin (Województwo Lubelskie)',
    keys: ['lubelski', 'lublin', 'lubelskie', 'miasto_lublin', 'swidnik'],
    dynamicName: (s: number) =>
      s < 5 ? 'Miasto Lublin (Województwo Lubelskie)' : 'Lublin (Hauptstadt Distrikt Lublin — Generalgouvernement)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Lubelskie'
        : 'Generalgouvernement — Distrikt Lublin (SS- und Polizeiführer Odilo Globocnik)',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Capoluogo del Voivodato di Lublino, sede dell\'Università Cattolica (KUL) e industria aeronautica (stabilimenti Plage i Laśkiewicz / LWS).'
        : 'Capitale del Distrikt Lublin nel Governatorato Generale; quartier generale del famigerato SS- und Polizeiführer Odilo Globocnik.',
  },
  {
    nuts: 'PL811',
    name: 'Biała Podlaska (Województwo Lubelskie)',
    keys: ['bialski', 'biala_podlaska', 'podlasie', 'radzyn', 'radzyn_podlaski', 'parczew'],
    dynamicName: (s: number) =>
      s < 5 ? 'Biała Podlaska (Województwo Lubelskie)' : 'Biala Podlaska (Distrikt Lublin — Generalgouvernement)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Lubelskie'
        : 'Generalgouvernement — Distrikt Lublin',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Podlasie meridionale lungo il corso del fiume Bug e sede della fabbrica aeronautica statale PWS (Podlaska Wytwórnia Samolotów).'
        : 'Distretto di frontiera del Governatorato Generale affacciato sulla linea di demarcazione fluviale del Bug con l\'URSS.',
  },
  {
    nuts: 'PL812',
    name: 'Chełm e Zamość (Województwo Lubelskie)',
    keys: ['chelmsko_zamojski', 'chelm', 'cholm', 'zamosc', 'zamosch', 'hrubieszow', 'tomaszow_lubelski', 'bilgoraj', 'krasnystaw'],
    dynamicName: (s: number) =>
      s < 5 ? 'Chełm e Zamość (Województwo Lubelskie)' : 'Cholm und Zamosch (Distrikt Lublin — Generalgouvernement)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Lubelskie'
        : 'Generalgouvernement — Distrikt Lublin',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Fortezza rinascimentale di Zamość e città storica di Chełm nella Polonia sud-orientale.'
        : 'Kreishauptmannschaft Cholm e Zamosch nel Distrikt Lublin del Governatorato Generale; retrovia orientale verso la frontiera sovietica e settore agricolo di primaria importanza.',
  },
  {
    nuts: 'PL815',
    name: 'Puławy e Kraśnik (Województwo Lubelskie)',
    keys: ['pulawski', 'pulawy', 'krasnik', 'lubartow', 'opole_lubelskie', 'janow_lubelski', 'ryki'],
    dynamicName: (s: number) =>
      s < 5 ? 'Puławy e Kraśnik (Województwo Lubelskie)' : 'Pulawy (Distrikt Lublin — Generalgouvernement)',
    dynamicAdminTitle: (s: number) =>
      s < 5
        ? 'Rzeczpospolita Polska — Województwo Lubelskie'
        : 'Generalgouvernement — Distrikt Lublin',
    dynamicNote: (s: number) =>
      s < 5
        ? 'Valle della Vistola a Puławy e moderna fabbrica di munizioni del COP a Kraśnik.'
        : 'Kreishauptmannschaft Pulawy nel Distrikt Lublin del Governatorato Generale; centro chimico e agricolo fluviale sulla Vistola occupato dalla Wehrmacht nel settembre 1939.',
  },
];

/**
 * Pulisce e normalizza un toponimo polacco.
 */
export function cleanPolishToponymName(name: string): string {
  if (!name) return '';
  let cleaned = name.trim();
  if (cleaned.startsWith('Miasto ')) {
    cleaned = cleaned.replace(/^Miasto\s+/, '');
  }
  return cleaned;
}

/**
 * Risoluzione toponomastica, istituzionale e temporale dettagliata per le province della Polonia (1936-1940).
 */
export function resolvePolandToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;

  // 0. I powiats dei Kresy Wschodnie (PL_KRESY_) sono gestiti dal loro handler dedicato ad altissima fedeltà
  if (id.startsWith('PL_KRESY_')) {
    return null;
  }

  // 1. Danzica (PL633)
  if (
    id === 'PL633' ||
    normKey === 'trojmiejski' ||
    normKey === 'danzig' ||
    normKey === 'gdansk' ||
    normKey.includes('danzig')
  ) {
    if (step < 5) {
      return {
        name: 'Freie Stadt Danzig (Gdańsk / Danzica)',
        adminTitle: 'Freie Stadt Danzig — Mandato della Società delle Nazioni (Völkerbundskommissar)',
        note: 'Città-Stato autonoma istituita dal Trattato di Versailles sotto la protezione della Società delle Nazioni e unione doganale polacca.',
      };
    }
    return {
      name: 'Danzig (Reichsgau Danzig-Westpreußen)',
      adminTitle: 'Deutsches Reich — Reichsgau Danzig-Westpreußen (Gauleiter Albert Forster)',
      note: 'Annessa al Terzo Reich il 1 settembre 1939 per proclama di Albert Forster come capitale del Reichsgau Danzig-Westpreußen.',
    };
  }

  // 1b. Corridoio Polacco / Gdynia (PL_HIST_CORRIDOR)
  if (
    id === 'PL_HIST_CORRIDOR' ||
    normKey === 'polish_corridor' ||
    normKey.includes('corridor') ||
    normKey.includes('korytarz')
  ) {
    if (step < 5) {
      return {
        name: 'Województwo Pomorskie (Gdynia / Hel)',
        adminTitle: 'Rzeczpospolita Polska — Województwo Pomorskie (Gdynia, Puck, Hel)',
        note: 'Corridoio Polacco (Polski Korytarz) — Accesso sovrano della Polonia al Mar Baltico con il porto strategico di Gdynia e la penisola di Hel.',
      };
    }
    return {
      name: 'Gotenhafen (Reichsgau Danzig-Westpreußen)',
      adminTitle: 'Deutsches Reich — Reichsgau Danzig-Westpreußen (Gotenhafen / Gdynia)',
      note: 'Occupazione e annessione tedesca della costa polacca; ribattezzata Gotenhafen e incorporata nel Reichsgau Danzig-Westpreußen.',
    };
  }

  // 2. Lookup nel catalogo delle 73 province (NUTS-3)
  let foundProv: PolandProvDef | undefined;
  if (id.startsWith('PL')) {
    foundProv = POLAND_PROVINCES_CATALOG.find((p) => p.nuts === id || id.startsWith(p.nuts));
  }

  if (!foundProv) {
    const normTokens = normKey.split('_').filter(Boolean);
    for (const p of POLAND_PROVINCES_CATALOG) {
      if (p.keys.some((k) => normKey === k || normTokens.includes(k) || (k.length >= 5 && normKey.includes(k)))) {
        foundProv = p;
        break;
      }
    }
  }

  if (foundProv) {
    const p = foundProv;
    const name = p.dynamicName ? p.dynamicName(step) : p.name;
    const adminTitle = p.dynamicAdminTitle ? p.dynamicAdminTitle(step) : (p.adminTitle || `Rzeczpospolita Polska — ${name}`);
    const note = p.dynamicNote ? p.dynamicNote(step) : p.note;
    return { name, adminTitle, note };
  }

  // 3. Fallback per codici PL non esplicitamente catalogati
  if (id.startsWith('PL')) {
    const cleaned = cleanPolishToponymName(rawName) || rawName;
    if (step < 5) {
      return {
        name: cleaned,
        adminTitle: 'Rzeczpospolita Polska',
        note: 'Circoscrizione o territorio della Seconda Repubblica di Polonia (1918-1939).',
      };
    }
    if (owner === 'SOV') {
      return {
        name: cleaned,
        adminTitle: 'SSSR — Belorusskaya SSR',
        note: 'Territorio della Polonia orientale annesso all\'Unione Sovietica (settembre 1939).',
      };
    }
    return {
      name: cleaned,
      adminTitle: 'Generalgouvernement / Deutsches Reich',
      note: 'Territorio polacco occupato o annesso dal Terzo Reich.',
    };
  }

  return null;
}

// =========================================================================================
// ================= IMPERO GIAPPONESE — PROVINCE, METROPOLI & COLONIE (1936-1940) ==========
// =========================================================================================

export interface JapanProvDef {
  id: string;
  name: string;
  keys: string[];
  dynamicName?: (s: number) => string;
  dynamicAdminTitle?: (s: number) => string;
  dynamicNote?: (s: number) => string;
  adminTitle?: string;
  note?: string;
}

export const JAPAN_PROVINCES_CATALOG: JapanProvDef[] = [
  {
    id: 'JP_TOKYO',
    name: 'Tōkyō (Dai Nippon Teikoku Shuto)',
    keys: ['tokyo', 'tokio', 'edo', 'tokyo_fu', 'kanto', 'jp_tokyo', '392'],
    adminTitle: 'Dai Nippon Teikoku — Tōkyō-fu (Kōkyo / Daihonei)',
    note: "Capitale dell'Impero Giapponese, residenza dell'Imperatore Shōwa (Hirohito) e sede del Gran Quartier Generale Imperiale (Daihonei).",
    dynamicNote: (s: number) =>
      s >= 8
        ? "Capitale dell'Impero Giapponese e sede del Gran Quartier Generale Imperiale (Daihonei). Il 13 aprile 1941 il Ministro degli Esteri Yōsuke Matsuoka firma a Mosca il Patto quinquennale di neutralità sovietico-giapponese, mettendo in sicurezza il fronte settentrionale mancese e consentendo a Tokyo di concentrare la pianificazione strategica sull'espansione verso il Sud-Est asiatico e il Pacifico (Nanshin-ron)."
        : "Capitale dell'Impero Giapponese, residenza dell'Imperatore Shōwa (Hirohito) e sede del Gran Quartier Generale Imperiale (Daihonei).",
  },
  {
    id: 'JP_KANSAI',
    name: 'Kansai / Kinki (Ōsaka, Kyōto & Kōbe)',
    keys: ['osaka', 'kyoto', 'kobe', 'kansai', 'kinki', 'hyogo', 'nara', 'shiga', 'wakayama'],
    adminTitle: 'Dai Nippon Teikoku — Ōsaka-fu & Kyōto-fu (Naichi)',
    note: "Cuore industriale, mercantile e culturale del Giappone; polo manifatturiero di Hanshin e antica capitale imperiale di Kyōto.",
  },
  {
    id: 'JP_CHUBU',
    name: 'Chūbu & Tōkai (Nagoya)',
    keys: ['nagoya', 'chubu', 'tokai', 'aichi', 'shizuoka', 'gifu', 'mie', 'nagano', 'niigata'],
    adminTitle: 'Dai Nippon Teikoku — Aichi-ken / Chūbu (Naichi)',
    note: "Centro nevralgico dell'industria aeronautica e motoristica bellica imperiale (stabilimenti Mitsubishi e Nakajima Kokuki a Nagoya).",
  },
  {
    id: 'JP_CHUGOKU',
    name: 'Chūgoku (Hiroshima & Arsenale Navale di Kure)',
    keys: ['hiroshima', 'kure', 'chugoku', 'okayama', 'yamaguchi', 'tottori', 'shimane'],
    adminTitle: 'Dai Nippon Teikoku — Distretto Navale di Kure (Chinjufu)',
    note: "Sede del Distretto Navale di Kure (Kure Chinjufu), cantiere segreto dell'Arsenale Navale per la costruzione delle super-corazzate classe Yamato.",
  },
  {
    id: 'JP_KYUSHU',
    name: 'Kyūshū (Fukuoka, Nagasaki & Base Navale di Sasebo)',
    keys: ['kyushu', 'fukuoka', 'nagasaki', 'sasebo', 'yawata', 'kagoshima', 'kumamoto', 'saga', 'oita', 'miyazaki'],
    adminTitle: 'Dai Nippon Teikoku — Distretto Navale di Sasebo & Acciaierie di Yawata',
    note: "Polo siderurgico delle acciaierie statali di Yawata, cantieri navali pesanti Mitsubishi a Nagasaki e arsenale navale fortificato di Sasebo (Sasebo Chinjufu).",
  },
  {
    id: 'JP_TOHOKU',
    name: 'Tōhoku (Sendai & Stretto di Tsugaru)',
    keys: ['tohoku', 'sendai', 'miyagi', 'aomori', 'iwate', 'akita', 'yamagata', 'fukushima'],
    adminTitle: 'Dai Nippon Teikoku — Tōhoku Chihō (2ª Divisione Sendai)',
    note: "Regione settentrionale dell'isola di Honshū, presidiata dalla 2ª Divisione fanteria di Sendai e cardine difensivo dello Stretto di Tsugaru.",
  },
  {
    id: 'JP_SHIKOKU',
    name: 'Shikoku (Matsuyama, Takamatsu & Kōchi)',
    keys: ['shikoku', 'matsuyama', 'takamatsu', 'kochi', 'tokushima', 'ehime', 'kagawa'],
    adminTitle: 'Dai Nippon Teikoku — Shikoku Chihō (Naichi)',
    note: "Quarta isola principale dell'arcipelago giapponese, affacciata sulle acque protette del Mare Interno di Seto.",
  },
  {
    id: 'JP_HOKKAIDO',
    name: 'Hokkaidō (Sapporo, Hakodate & Muroran)',
    keys: ['hokkaido', 'sapporo', 'hakodate', 'muroran', 'asahikawa', 'otaru', 'kushiro', 'ezo', 'yezo'],
    adminTitle: 'Dai Nippon Teikoku — Hokkaidō-chō (7ª Divisione Asahikawa)',
    note: "Prefettura speciale settentrionale ricca di risorse minerarie, acciaierie pesanti a Muroran e quartier generale della 7ª Divisione dell'Esercito Imperiale.",
  },
  {
    id: 'JP_CHOSEN',
    name: 'Chōsen (Corea — Governatorato Generale di Keijō)',
    keys: ['chosen', 'korea', 'corea', 'keijo', 'seoul', 'heijo', 'pyongyang', 'fusan', 'busan', 'chinkai', 'genzan', 'kr', 'kor', 'prk', 'kp', '410', '408'],
    adminTitle: 'Dai Nippon Teikoku — Chōsen Sōtokufu (Keijō)',
    note: "Colonia peninsulare annessa nel 1910, amministrata con ferreo controllo dal Chōsen Sōtokufu a Keijō (Seoul) sotto il Governatore Jirō Minami; base navale di Chinkai.",
  },
  {
    id: 'JP_TAIWAN',
    name: 'Taiwan (Formosa — Governatorato Generale di Taihoku)',
    keys: ['taiwan', 'formosa', 'taihoku', 'taipei', 'takao', 'kaohsiung', 'taichu', 'tainan', 'kiirun', 'keelung', 'tw', 'twn', '158'],
    adminTitle: 'Dai Nippon Teikoku — Taiwan Sōtokufu (Taihoku)',
    note: "Colonia modello dell'Impero Giapponese acquisita nel 1895 con il Trattato di Shimonoseki; base logistica, aerea e navale primaria per la dottrina d'espansione meridionale (Nanshin-ron).",
  },
  {
    id: 'JP_KARAFUTO',
    name: 'Karafuto (Sachalin Meridionale — Toyohara)',
    keys: ['karafuto', 'sakhalin', 'toyohara', 'otomari', 'maoka', 'yuzhno_sakhalinsk'],
    adminTitle: 'Dai Nippon Teikoku — Karafuto-chō (Toyohara)',
    note: "Sachalin a sud del 50° parallelo nord, ceduta dalla Russia nel 1905 col Trattato di Portsmouth; ricca di giacimenti di carbone, legname e stabilimenti di lavorazione cellulosa.",
  },
  {
    id: 'JP_KANTO_SHU',
    name: 'Kantō-shū (Territorio Affittato del Kwantung — Dairen & Ryojun)',
    keys: ['kwantung', 'kanto_shu', 'kanto_cho', 'dairen', 'dalian', 'ryojun', 'port_arthur', 'liaodong'],
    adminTitle: 'Dai Nippon Teikoku — Kantō-chō & Ryojun Keibifu',
    note: "Territorio in affitto all'estremità della penisola di Liaodong; porto commerciale d'acque profonde di Dairen e base navale fortificata di Ryojun (Port Arthur), culla della potente Armata del Kwantung (Kantō-gun).",
  },
  {
    id: 'JP_CHISHIMA',
    name: 'Chishima Rettō (Isole Curili — Paramushir & Etorofu)',
    keys: ['chishima', 'kuril', 'curili', 'paramushir', 'etorofu', 'shumshu', 'kunashiri'],
    adminTitle: 'Dai Nippon Teikoku — Chishima Rettō (Hokkaidō-chō)',
    note: "Catena di isole vulcaniche strategiche a guardia dell'accesso settentrionale al Mare di Ochotsk e alla penisola della Kamchatka.",
  },
  {
    id: 'JP_NANYO',
    name: "Nan'yō Guntō (Mandato del Pacifico Meridionale — Koror, Saipan & Truk)",
    keys: ['nanyo', 'south_seas', 'south_pacific', 'saipan', 'palau', 'parao', 'koror', 'truk', 'chuuk', 'ponape', 'pohnpei', 'jaluit', 'kwajalein', 'yap', 'marshall', 'caroline', 'mariana', 'mh', 'fm', 'pw', 'mp'],
    adminTitle: "Dai Nippon Teikoku — Nan'yō-chō (Mandato Società delle Nazioni)",
    note: "Mandato di Classe C della Società delle Nazioni assegnato al Giappone (ex possedimenti insulari tedeschi); sede a Koror (Palau), basi nelle Marianne e gigantesco ancoraggio navale della Flotta Combinata a Truk (Chuuk Lagoon).",
  },
  {
    id: 'JP_RYUKYU',
    name: 'Ryūkyū Rettō (Okinawa — Naha)',
    keys: ['ryukyu', 'okinawa', 'naha', 'amami', 'sakishima', 'miyako', 'yaeyama'],
    adminTitle: 'Dai Nippon Teikoku — Okinawa-ken (Naichi)',
    note: "Prefettura insulare meridionale integrata nell'Impero col capoluogo Naha.",
  },
  {
    id: 'JP_OGASAWARA',
    name: 'Isole Ogasawara & Iwo Jima (Bonin)',
    keys: ['ogasawara', 'bonin', 'iwo_jima', 'iwojima', 'chichi_jima', 'haha_jima'],
    adminTitle: 'Dai Nippon Teikoku — Tōkyō-fu Ogasawara-shichō',
    note: "Arcipelago d'alto mare a sud di Tokyo, avamposto aeronavale imperiale nel Pacifico occidentale.",
  },
  {
    id: 'JP_DEFAULT',
    name: 'Dai Nippon Teikoku (Giappone Metropolitano)',
    keys: ['japan', 'nippon', 'nihon', 'giappone', 'japon'],
    adminTitle: 'Dai Nippon Teikoku (Naichi)',
    note: "Impero del Giappone sotto il regno dell'Imperatore Shōwa (Hirohito).",
  },
];

export function resolveJapanToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;

  // 1. Direct ID match
  let foundProv: JapanProvDef | undefined;
  if (id.startsWith('JP_') || id === 'JP' || id === 'JPN' || id === '392') {
    foundProv = JAPAN_PROVINCES_CATALOG.find((p) => p.id === id);
  }

  // 2. Fuzzy key lookup
  if (!foundProv) {
    const normTokens = normKey.split('_').filter(Boolean);
    for (const p of JAPAN_PROVINCES_CATALOG) {
      if (p.keys.some((k) => normKey === k || normTokens.includes(k) || (k.length >= 4 && normKey.includes(k)))) {
        foundProv = p;
        break;
      }
    }
  }

  if (foundProv) {
    const p = foundProv;
    const name = p.dynamicName ? p.dynamicName(step) : p.name;
    const adminTitle = p.dynamicAdminTitle ? p.dynamicAdminTitle(step) : (p.adminTitle || `Dai Nippon Teikoku — ${name}`);
    const note = p.dynamicNote ? p.dynamicNote(step) : p.note;
    return { name, adminTitle, note };
  }

  if (owner === 'JAP') {
    return {
      name: rawName || 'Dai Nippon Teikoku',
      adminTitle: 'Dai Nippon Teikoku (Naichi)',
      note: 'Territorio metropolitano o possedimento dell\'Impero Giapponese (1936-1940).',
    };
  }

  return null;
}

// =========================================================================================
// ================= REPUBBLICA DI CINA & STATI REGIONALI CINESI (1936-1940) ================
// =========================================================================================

export interface ChinaProvDef {
  id: string;
  name: string;
  keys: string[];
  dynamicName?: (s: number) => string;
  dynamicAdminTitle?: (s: number) => string;
  dynamicNote?: (s: number) => string;
  adminTitle?: string;
  note?: string;
}

export const CHINA_PROVINCES_CATALOG: ChinaProvDef[] = [
  {
    id: 'CHN_BEIJING',
    name: 'Beiping (Pechino)',
    keys: ['beijing', 'beiping', 'peking', 'peiping', 'lugouqiao', 'marco_polo', 'chn_beijing'],
    dynamicName: (s: number) =>
      s === 0
        ? "Beiping (Pei-p'ing Zhuānshì)"
        : s <= 5
        ? "Beiping — Lugouqiao (Chūka Minkoku Rinji Seifu)"
        : "Beiping — Huáběi Zhèngwù Wěiyuánhuì",
    dynamicAdminTitle: (s: number) =>
      s === 0
        ? "Zhōnghuá Mínguó — Jì-Chá Zhèngwù Wěiyuánhuì"
        : s <= 5
        ? "Zhōnghuá Mínguó Línshí Zhèngfǔ (Wang Kemin — Peking)"
        : "Zhōnghuá Mínguó Wěi Zhèngfǔ — Huáběi Wěiyuánhuì (Wang Jingwei)",
    dynamicNote: (s: number) =>
      s === 0
        ? "Capitale culturale della Cina settentrionale sotto l'amministrazione del Consiglio Politico di Hebei-Chahar (Gen. Song Zheyuan)."
        : s <= 5
        ? "Teatro dell'Incidente del Ponte Marco Polo (7 luglio 1937) e sede del Governo Provvisorio collaborazionista di Wang Kemin sotto l'Armata giapponese della Cina del Nord."
        : "Sede della Commissione per gli Affari Politici della Cina Settentrionale nel Governo Nazionale Riorganizzato di Wang Jingwei.",
  },
  {
    id: 'CHN_TIANJIN',
    name: 'Tianjin (Tientsin)',
    keys: ['tianjin', 'tientsin', 'chn_tianjin'],
    dynamicName: (s: number) =>
      s === 0
        ? "Tianjin (T'ien-tsin Zhuānshì)"
        : s <= 5
        ? "Tianjin (Riben Zhànlǐng)"
        : "Tianjin Tebieshi (Wang Jingwei)",
    dynamicAdminTitle: (s: number) =>
      s === 0
        ? "Zhōnghuá Mínguó — Tianjin Tebieshi"
        : s <= 5
        ? "Zhōnghuá Mínguó Línshí Zhèngfǔ (Tianjin)"
        : "Zhōnghuá Mínguó Wěi Zhèngfǔ (Tianjin Tebieshi)",
    dynamicNote: (s: number) =>
      s === 0
        ? "Principale porto della Cina settentrionale e sede delle concessioni internazionali (britannica, francese, italiana e giapponese)."
        : s <= 5
        ? "Occupata dalle truppe imperiali giapponesi nel luglio 1937; teatro del blocco nipponico delle concessioni straniere nell'estate 1939."
        : "Municipalità speciale incorporata nel regime collaborazionista di Wang Jingwei.",
  },
  {
    id: 'CHN_HEBEI',
    name: 'Hebei (Hopei)',
    keys: ['hebei', 'hopei', 'chn_hebei', 'baoding', 'shijiazhuang'],
    dynamicName: (s: number) =>
      s === 0
        ? "Hebei Sheng (Hopei)"
        : s <= 5
        ? "Hebei Sheng (Hokushi Haken-gun)"
        : "Hebei Sheng (Wang Jingwei)",
    dynamicAdminTitle: (s: number) =>
      s === 0
        ? "Zhōnghuá Mínguó — Jì-Chá Zhèngwù Wěiyuánhuì"
        : s <= 5
        ? "Zhōnghuá Mínguó Línshí Zhèngfǔ (Hebei Sheng)"
        : "Zhōnghuá Mínguó Wěi Zhèngfǔ (Hebei Sheng)",
    dynamicNote: (s: number) =>
      s === 0
        ? "Pianura settentrionale attraversata dalle ferrovie Ping-Han e Jin-Pu, parzialmente smilitarizzata dagli accordi He-Umezu del 1935."
        : s <= 5
        ? "Area operativa dell'Armata giapponese della Cina del Nord (Hokushi Haken-gun), contesa dalle formazioni guerrigliere dell'8ª Armata di Strada."
        : "Provincia sotto il controllo del governo collaborazionista di Nanchino.",
  },
  {
    id: 'CHN_SHANXI',
    name: 'Shanxi (Shansi — Taiyuan)',
    keys: ['shanxi', 'shansi', 'taiyuan', 'datong', 'pingxingguan', 'xinkou', 'chn_shanxi'],
    dynamicName: (s: number) =>
      s === 0
        ? "Shanxi Sheng (Shansi — Taiyuan)"
        : s <= 5
        ? "Shanxi Sheng — Taiyuan Sakusen"
        : "Shanxi Sheng (Wang Jingwei / Yan Xishan)",
    dynamicAdminTitle: (s: number) =>
      s === 0
        ? "Zhōnghuá Mínguó — Yan Xishan Xíngzhèng"
        : s <= 5
        ? "Dai Nippon Teikoku Kōgun Senryōchi (Hokushi Haken-gun)"
        : "Zhōnghuá Mínguó Wěi Zhèngfǔ (Shanxi Sheng)",
    dynamicNote: (s: number) =>
      s === 0
        ? "Bastione montuoso fortificato e arsenale bellico governato dal 'Signore della Guerra Modello' Yan Xishan."
        : s <= 5
        ? "Occupata dalle forze giapponesi dopo la sanguinosa battaglia di Taiyuan e Xinkou (autunno 1937); teatro dell'imboscata di Pingxingguan ad opera dell'8ª Armata di Strada di Lin Biao."
        : "Provincia spartita tra i presidi fortificati giapponesi sulle ferrovie e la resistenza montana di Yan Xishan e del PCC.",
  },
  {
    id: 'CHN_SHANDONG',
    name: 'Shandong (Shantung — Jinan & Qingdao)',
    keys: ['shandong', 'shantung', 'jinan', 'qingdao', 'tsingtao', 'taierzhuang', 'chn_shandong'],
    dynamicName: (s: number) =>
      s === 0
        ? "Shandong Sheng (Han Fuju)"
        : s === 1
        ? "Shandong Sheng (Kōgun Senryō)"
        : s <= 5
        ? "Shandong Sheng — Tai'erzhuang Zhan"
        : "Shandong Sheng (Wang Jingwei)",
    dynamicAdminTitle: (s: number) =>
      s === 0
        ? "Zhōnghuá Mínguó — Shandong Sheng (Han Fuju)"
        : s === 1
        ? "Dai Nippon Teikoku Kōgun Senryōchi (Hokushi Haken-gun)"
        : s <= 5
        ? "Zhōnghuá Mínguó Línshí Zhèngfǔ (Shandong Sheng)"
        : "Zhōnghuá Mínguó Wěi Zhèngfǔ (Shandong Sheng)",
    dynamicNote: (s: number) =>
      s === 0
        ? "Penisola strategica dominata dal generale Han Fuju, con il porto oceanico di Qingdao e la ferrovia Jiaoji."
        : s === 1
        ? "Invasa dalle divisioni nipponiche a fine 1937; Han Fuju fu giustiziato dal Generalissimo Chiang Kai-shek per aver ritirato le truppe senza combattere."
        : s <= 5
        ? "Teatro della memorabile vittoria cinese nella Battaglia di Tai'erzhuang (marzo-aprile 1938) guidata dal generale Li Zongren."
        : "Amministrazione provinciale collaborazionista del regime di Wang Jingwei.",
  },
  {
    id: 'CHN_SHANGHAI',
    name: 'Shanghai (Shanghai Tebieshi)',
    keys: ['shanghai', 'shanhai', 'sihang', 'songhu', 'chn_shanghai'],
    dynamicName: (s: number) =>
      s === 0
        ? "Shanghai Shi (Shanghai Tebieshi)"
        : s <= 5
        ? "Shanghai — Shanhai Kaisen (1937)"
        : "Shanghai Tebieshi (Wang Jingwei)",
    dynamicAdminTitle: (s: number) =>
      s === 0
        ? "Zhōnghuá Mínguó — Shanghai Tebieshi"
        : s <= 5
        ? "Dai Nippon Teikoku Kōgun Senryōchi (Kaigun Tokubetsu Rikusentai)"
        : "Zhōnghuá Mínguó Wěi Zhèngfǔ (Shanghai Tebieshi)",
    dynamicNote: (s: number) =>
      s === 0
        ? "Metropoli economica e finanziaria della Cina, suddivisa tra la Municipalità cinese, l'International Settlement e la Concessione Francese."
        : s <= 5
        ? "Teatro dell'apocalittica Battaglia di Shanghai (agosto-novembre 1937, la 'Stalingrado sul Fiume Giallo') con 300.000 caduti e l'eroica difesa dei Magazzini Sihang."
        : "Municipalità speciale del Governo Nazionale Riorganizzato di Nanchino con porto controllato dalla marina imperiale nipponica.",
  },
  {
    id: 'CHN_JIANGSU',
    name: 'Jiangsu (Nanchino)',
    keys: ['jiangsu', 'kiangsu', 'nanjing', 'nanchino', 'nankin', 'xuzhou', 'chn_jiangsu'],
    dynamicName: (s: number) =>
      s === 0
        ? "Jiangsu Sheng — Shǒudū Nanjing"
        : s === 1
        ? "Jiangsu Sheng — Nanjing Xiànluò"
        : s <= 5
        ? "Jiangsu Sheng — Nanjing Wéixīn Zhèngfǔ"
        : "Nanjing — Zhōnghuá Mínguó Shǒudū (Wang Jingwei)",
    dynamicAdminTitle: (s: number) =>
      s === 0
        ? "Zhōnghuá Mínguó Guómín Zhèngfǔ (Nanjing)"
        : s === 1
        ? "Zhōnghuá Mínguó Wéixīn Zhèngfǔ (Liang Hongzhi)"
        : s <= 5
        ? "Zhōnghuá Mínguó Wéixīn Zhèngfǔ (Liang Hongzhi)"
        : "Zhōnghuá Mínguó Wěi Zhèngfǔ (Wang Jingwei Shǒudū)",
    dynamicNote: (s: number) =>
      s === 0
        ? "Capitale ufficiale della Repubblica di Cina sotto la presidenza del Generalissimo Chiang Kai-shek."
        : s === 1
        ? "Presa d'assalto e caduta il 13 dicembre 1937, seguita dal tragico Massacro di Nanchino perpetrato dall'Esercito Imperiale Giapponese."
        : s <= 5
        ? "Sede del Governo Riformato della Repubblica di Cina istituito dai giapponesi sotto Liang Hongzhi."
        : "Capitale del Governo Nazionale Riorganizzato di Nanchino inaugurato il 30 marzo 1940 sotto Wang Jingwei.",
  },
  {
    id: 'CHN_ANHUI',
    name: 'Anhui (Anhwei — Hefei)',
    keys: ['anhui', 'anhwei', 'hefei', 'anqing', 'bengbu', 'chn_anhui'],
    dynamicName: (s: number) =>
      s <= 1
        ? "Anhui Sheng (Anhwei — Hefei)"
        : s <= 5
        ? "Anhui Sheng (Kōgun Senryō)"
        : "Anhui Sheng (Wang Jingwei)",
    dynamicAdminTitle: (s: number) =>
      s <= 1
        ? "Zhōnghuá Mínguó — Anhui Sheng"
        : s <= 5
        ? "Zhōnghuá Mínguó Wéixīn Zhèngfǔ (Anhui Sheng)"
        : "Zhōnghuá Mínguó Wěi Zhèngfǔ (Anhui Sheng)",
    dynamicNote: (s: number) =>
      s <= 1
        ? "Bacino agricolo strategico attraversato dai fiumi Huai e Yangtze."
        : s <= 5
        ? "Occupata dalle armate nipponiche durante l'avanzata fluviale lungo lo Yangtze verso Wuhan."
        : "Provincia del governo collaborazionista di Nanchino.",
  },
  {
    id: 'CHN_HENAN',
    name: 'Henan (Honan — Kaifeng & Zhengzhou)',
    keys: ['henan', 'honan', 'kaifeng', 'zhengzhou', 'luoyang', 'huayuankou', 'chn_henan'],
    dynamicName: (s: number) =>
      s <= 1
        ? "Henan Sheng (Honan)"
        : "Henan Sheng — Kōkō Kekkai (Huayuankou)",
    dynamicAdminTitle: (s: number) =>
      s <= 1
        ? "Zhōnghuá Mínguó — Zhengzhou / Kaifeng"
        : "Dai Nippon Teikoku Kōgun Senryōchi (Kaifeng)",
    dynamicNote: (s: number) =>
      s <= 1
        ? "Cuore delle Pianure Centrali cinesi (Zhongyuan) e snodo delle ferrovie Longhai e Pinghan."
        : "Nel giugno 1938 Chiang Kai-shek ordinò la distruzione delle dighe del Fiume Giallo a Huayuankou: l'inondazione fermò l'avanzata giapponese ma causò centinaia di migliaia di vittime civili.",
  },
  {
    id: 'CHN_HUBEI',
    name: 'Hubei (Hupeh — Wuhan)',
    keys: ['hubei', 'hupeh', 'wuhan', 'hankou', 'wuchang', 'hanyang', 'yichang', 'zaoyang', 'chn_hubei'],
    dynamicName: (s: number) =>
      s <= 1
        ? "Hubei Sheng — Wuhan (Línshí Shǒudū)"
        : s <= 5
        ? "Hubei Sheng — Bukan Sakusen (1938)"
        : "Hubei Sheng — Zaoyang-Yichang Zhan",
    dynamicAdminTitle: (s: number) =>
      s <= 1
        ? "Zhōnghuá Mínguó Guómín Zhèngfǔ (Wuhan)"
        : s <= 5
        ? "Dai Nippon Teikoku Kōgun Senryōchi (Chūina Haken-gun)"
        : "Zhōnghuá Mínguó Wěi Zhèngfǔ (Hubei Sheng)",
    dynamicNote: (s: number) =>
      s <= 1
        ? "Sede del Governo Provvisorio della Repubblica di Cina dopo la caduta di Nanchino; centro politico, militare e diplomatico della resistenza cinese."
        : s <= 5
        ? "Conquistata dai giapponesi nell'ottobre 1938 al termine della colossale Battaglia di Wuhan durata 4 mesi con oltre un milione di soldati cinesi schierati."
        : "Teatro della Battaglia di Zaoyang-Yichang (maggio-giugno 1940) e porta d'accesso fluviale alle Tre Gole dello Yangtze e al Sichuan.",
  },
  {
    id: 'CHN_GUANGDONG',
    name: 'Guangdong (Kwangtung — Canton)',
    keys: ['guangdong', 'kwangtung', 'guangzhou', 'canton', 'shantou', 'swatow', 'chn_guangdong'],
    dynamicName: (s: number) =>
      s <= 1
        ? "Guangdong Sheng — Guangzhou (Canton)"
        : "Guangdong Sheng — Canton Kōraku",
    dynamicAdminTitle: (s: number) =>
      s <= 1
        ? "Zhōnghuá Mínguó — Guangdong Sheng"
        : "Dai Nippon Teikoku Kōgun Senryōchi (Nanshi Haken-gun)",
    dynamicNote: (s: number) =>
      s <= 1
        ? "Culla della Rivoluzione Repubblicana del 1911 e principale arteria di rifornimento estero per la Cina attraverso la ferrovia Canton-Hankou."
        : "Sbarco e occupazione dell'Armata giapponese della Cina del Sud nell'ottobre 1938, isolando Free China dall'accesso marittimo diretto.",
  },
  {
    id: 'CHN_HAINAN',
    name: 'Hainan (Isola di Hainan)',
    keys: ['hainan', 'qiongya', 'kainan', 'chn_hainan'],
    dynamicName: (s: number) =>
      s <= 2
        ? "Hainan Dao (Qiongya)"
        : "Hainan-tō (Kainan-tō Gunsei)",
    dynamicAdminTitle: (s: number) =>
      s <= 2
        ? "Zhōnghuá Mínguó — Qiongya Xíngzhèng"
        : "Dai Nippon Teikoku Kaigun Senryōchi (Kainan-tō Tokubetsu Konkyochitai)",
    dynamicNote: (s: number) =>
      s <= 2
        ? "Isola meridionale controllata dall'amministrazione speciale di Qiongya con basi guerrigliere comuniste di Feng Baiju nell'interno montuoso."
        : "Occupata nel febbraio 1939 dalla Marina Imperiale Giapponese per dominare il Mar Cinese Meridionale, bloccare l'Indocina e fungere da base d'attacco verso Sud.",
  },
  {
    id: 'CHN_JIANGXI',
    name: 'Jiangxi (Kiangsi — Nanchang)',
    keys: ['jiangxi', 'kiangsi', 'nanchang', 'jiujiang', 'ganzhou', 'chn_jiangxi'],
    dynamicName: (s: number) =>
      s <= 2
        ? "Jiangxi Sheng — Nanchang"
        : "Jiangxi Sheng — Nanchang Sakusen",
    dynamicAdminTitle: (s: number) =>
      s <= 2
        ? "Zhōnghuá Mínguó — Jiangxi Sheng"
        : "Dai Nippon Teikoku Kōgun Senryōchi (11ª Armata)",
    dynamicNote: (s: number) =>
      s <= 2
        ? "Base aeronavale e snodo ferroviario delle forze aeree cinesi e sovietiche volontarie."
        : "Occupata dall'11ª Armata giapponese nel marzo-maggio 1939 dopo la dura Battaglia di Nanchang.",
  },
  {
    id: 'CHN_HUNAN',
    name: 'Hunan (Changsha)',
    keys: ['hunan', 'changsha', 'xue_yue', 'hengyang', 'chn_hunan'],
    dynamicName: (s: number) => "Hunan Sheng — Changsha Baoweizhan",
    dynamicAdminTitle: (s: number) => "Zhōnghuá Mínguó — Xue Yue Dì-Jiǔ Zhànqū (Changsha)",
    dynamicNote: (s: number) =>
      "Bastione inespugnabile della 9ª Zona di Guerra del Generale Xue Yue ('La Piccola Tigre'); respinse con successo l'offensiva nipponica nella Prima Battaglia di Changsha (settembre-ottobre 1939).",
  },
  {
    id: 'CHN_ZHEJIANG',
    name: 'Zhejiang (Chekiang — Hangzhou & Ningbo)',
    keys: ['zhejiang', 'chekiang', 'hangzhou', 'ningbo', 'wenzhou', 'fenghua', 'chn_zhejiang'],
    dynamicName: (s: number) =>
      s <= 1
        ? "Zhejiang Sheng (Chekiang)"
        : "Zhejiang Sheng — Wang Jingwei",
    dynamicAdminTitle: (s: number) =>
      s <= 1
        ? "Zhōnghuá Mínguó — Hangzhou / Ningbo"
        : "Zhōnghuá Mínguó Wěi Zhèngfǔ (Zhejiang Sheng)",
    dynamicNote: (s: number) =>
      s <= 1
        ? "Provincia costiera natale di Chiang Kai-shek (Fenghua/Xikou), ricca di porti mercantili e piantagioni di tè e seta."
        : "Sotto il controllo delle guarnigioni giapponesi e del governo collaborazionista di Wang Jingwei.",
  },
  {
    id: 'CHN_GUANGXI',
    name: 'Guangxi (Kwangsi — Guilin, Nanning & Passo di Kunlun)',
    keys: ['guangxi', 'kwangsi', 'guilin', 'nanning', 'kunlunguan', 'kunlun_pass', 'li_zongren', 'bai_chongxi', 'chn_guangxi'],
    dynamicName: (s: number) =>
      s <= 4
        ? "Guangxi Sheng (Li Zongren / Bai Chongxi)"
        : "Guangxi Sheng — Kunlunguan Zhanyi",
    dynamicAdminTitle: (s: number) =>
      s <= 4
        ? "Zhōnghuá Mínguó — Nuova Cricca del Guangxi"
        : "Zhōnghuá Mínguó — Dì-Wǔ Jūn (Passo di Kunlun)",
    dynamicNote: (s: number) =>
      s <= 4
        ? "Roccaforte della Nuova Cricca del Guangxi guidata dai generali Li Zongren e Bai Chongxi; formidabili truppe d'assalto integrate nell'Esercito Rivoluzionario Nazionale."
        : "Teatro della celebre controffensiva vittoriosa cinese nella Battaglia del Passo di Kunlun (dicembre 1939 - gennaio 1940), guidata dal 5° Corpo d'Armata meccanizzato del Gen. Du Yuming.",
  },
  {
    id: 'CHN_FUJIAN',
    name: 'Fujian (Fukien — Fuzhou & Xiamen)',
    keys: ['fujian', 'fukien', 'fuzhou', 'xiamen', 'amoy', 'chn_fujian'],
    dynamicName: (s: number) => "Fujian Sheng (Fuzhou & Xiamen)",
    dynamicAdminTitle: (s: number) => "Zhōnghuá Mínguó — Fujian Sheng",
    dynamicNote: (s: number) =>
      "Provincia montuosa costiera affacciata sullo Stretto di Formosa; presidiata dalle divisioni fedeli al governo nazionalista e da milizie marittime.",
  },
  {
    id: 'CHN_INNER_MONGOLIA',
    name: 'Mengjiang (Mongolia Interna — Chahar & Suiyuan)',
    keys: ['inner_mongolia', 'mengjiang', 'menkyo', 'chahar', 'suiyuan', 'kalgan', 'zhangjiakou', 'hohhot', 'guisui', 'de_wang', 'demchugdongrub', 'chn_inner_mongolia'],
    dynamicName: (s: number) =>
      s === 0
        ? "Övör Mongol — Monggol Jūnzhèngfǔ"
        : "Mengjiang Lianhe Zizhi Zhengfu (Menkyo)",
    dynamicAdminTitle: (s: number) =>
      s === 0
        ? "Monggol Öbertegen Jasaqu Zöblel (Demchugdongrub)"
        : "Monggol Obog-un Nigenkeki Quriya (Principe De Wang — Kalgan)",
    dynamicNote: (s: number) =>
      s === 0
        ? "Governo Militare Mongolo istituito dal principe Demchugdongrub (De Wang) per preservare l'autonomia delle tribù nomadi da Nanchino."
        : "Governo Autonomo Unito del Mengjiang (stato cliente del Giappone con capitale Kalgan / Zhangjiakou), integrato nella sfera di co-prosperità imperiale nipponica.",
  },
  {
    id: 'CHN_LIAONING',
    name: 'Damanzhoudiguo — Fengtian Sheng (Mukden)',
    keys: ['liaoning', 'fengtian', 'mukden', 'shenyang', 'anzan', 'fushun', 'chn_liaoning'],
    dynamicName: (s: number) => "Damanzhoudiguo — Fengtian Sheng (Mukden)",
    dynamicAdminTitle: (s: number) => "Damanzhoudiguo — Fengtian Sheng (Ferrovia Mantetsu)",
    dynamicNote: (s: number) =>
      "Provincia più popolosa e industrializzata del Manciukuò, con l'arsenale militare di Mukden, le acciaierie di Anshan e i giacimenti carboniferi di Fushun.",
  },
  {
    id: 'CHN_JILIN',
    name: 'Damanzhoudiguo — Xinjing Tebieshi (Hsinking)',
    keys: ['jilin', 'kirin', 'xinjing', 'hsinking', 'changchun', 'puyi', 'kangde', 'chn_jilin'],
    dynamicName: (s: number) => "Damanzhoudiguo — Xinjing Tebieshi (Hsinking)",
    dynamicAdminTitle: (s: number) => "Damanzhoudiguo — Shǒudū Xinjing (Imperatore Puyi / Kangde)",
    dynamicNote: (s: number) =>
      "Capitale imperiale del Manciukuò sotto l'Imperatore Kangde (Aisin-Gioro Puyi, l'ultimo imperatore della dinastia Qing), retta dal consiglio di stato supervisionato dai consiglieri giapponesi della Mantetsu e dell'Armata del Kwantung.",
  },
  {
    id: 'CHN_HEILONGJIANG',
    name: 'Damanzhoudiguo — Binjiang Sheng (Harbin)',
    keys: ['heilongjiang', 'binjiang', 'harbin', 'qiqihar', 'tsitsihar', 'heihe', 'chn_heilongjiang'],
    dynamicName: (s: number) => "Damanzhoudiguo — Binjiang Sheng (Harbin)",
    dynamicAdminTitle: (s: number) => "Damanzhoudiguo — Binjiang Sheng (Fiume Amur / Confine Sovietico)",
    dynamicNote: (s: number) =>
      "Provincia settentrionale del Manciukuò con la cosmopolita Harbin (grande comunità di russi bianchi), affacciata sulla frontiera fluviale dell'Amur con l\'Unione Sovietica.",
  },
  {
    id: 'CHN_MANCHUKUO_XINGAN_NORTH',
    name: "Damanzhoudiguo — Beixing'an Sheng & Hulunbuir (Hailar)",
    keys: ['xingan_north', 'beixingan', 'hulunbuir', 'hailar', 'manzhouli', 'nomonhan', 'khalkhin_gol', 'chn_manchukuo_xingan_north'],
    dynamicName: (s: number) => "Damanzhoudiguo — Beixing'an Sheng (Hailar & Nomonhan)",
    dynamicAdminTitle: (s: number) => "Damanzhoudiguo — Xingan Beisheng (Fronte del Khalkhin Gol)",
    dynamicNote: (s: number) =>
      "Settore frontaliero delle steppe dell'Hulunbuir; teatro della furiosa Guerra di confine sovietico-giapponese a Nomonhan / Khalkhin Gol (maggio-settembre 1939) vinta dalle forze sovietico-mongole del generale Georgij Žukov.",
  },
  {
    id: 'CHN_MANCHUKUO_XINGAN_SOUTH',
    name: "Damanzhoudiguo — Nanxing'an Sheng & Rehe (Jehol)",
    keys: ['xingan_south', 'nanxingan', 'rehe', 'jehol', 'chengde', 'chifeng', 'tongliao', 'chn_manchukuo_xingan_south'],
    dynamicName: (s: number) => "Damanzhoudiguo — Nanxing'an Sheng & Rehe (Jehol)",
    dynamicAdminTitle: (s: number) => "Damanzhoudiguo — Xingan Nansheng (Rehe / Chifeng)",
    dynamicNote: (s: number) =>
      "Territori mongoli meridionali e la storica provincia montuosa di Rehe (Jehol con la residenza estiva imperiale di Chengde), annessi al Manciukuò dall'Armata del Kwantung nel 1933.",
  },
  {
    id: 'CHN_SHAANXI',
    name: "Shaanxi (Yan'an — Shaan-Gan-Ning Bianqu)",
    keys: ['shaanxi', 'shensi', 'yanan', 'xian', 'shaan_gan_ning', 'mao_zedong', 'zhu_de', 'chn_shaanxi'],
    dynamicName: (s: number) => "Shaan-Gan-Ning Bianqu (Yan'an)",
    dynamicAdminTitle: (s: number) => "Zhongguo Gongchandang — Shaan-Gan-Ning Bianqu Zhengfu (Mao Zedong / Zhu De)",
    dynamicNote: (s: number) =>
      "Capitale rossa del Partito Comunista Cinese e punto d'arrivo della Lunga Marcia; quartier generale di Mao Zedong, Zhou Enlai e Zhu De, comando dell'8ª Armata di Strada.",
  },
  {
    id: 'CHN_CHONGQING',
    name: 'Chongqing (Chungking — Péidū)',
    keys: ['chongqing', 'chungking', 'peidu', 'chiang_kai_shek', 'chn_chongqing'],
    dynamicName: (s: number) =>
      s <= 1
        ? "Chongqing Shi (Chungking Zhuānshì)"
        : "Chongqing (Chungking) — Péidū",
    dynamicAdminTitle: (s: number) =>
      s <= 1
        ? "Zhōnghuá Mínguó — Chongqing Tebieshi"
        : "Zhōnghuá Mínguó Guómín Zhèngfǔ (Péidū Chongqing — Chiang Kai-shek)",
    dynamicNote: (s: number) =>
      s <= 1
        ? "Porto fluviale dell'Alto Yangtze e municipalità speciale nel bacino del Sichuan."
        : "Capitale Provvisoria di Guerra (Péidū) della Repubblica di Cina da ottobre 1938; sede del Generalissimo Chiang Kai-shek e bersaglio di intensi bombardamenti aerei terroristici nipponici.",
  },
  {
    id: 'CHN_SICHUAN',
    name: 'Sichuan (Szechwan — Chengdu)',
    keys: ['sichuan', 'szechwan', 'chengdu', 'chn_sichuan'],
    dynamicName: (s: number) => "Sichuan Sheng (Chengdu)",
    dynamicAdminTitle: (s: number) => "Zhōnghuá Mínguó — Sichuan Sheng Zhengfu",
    dynamicNote: (s: number) =>
      "Il 'Bacino Rosso', inaccessibile fortezza geografica naturale e riserva inesauribile di derrate alimentari, risorse e reclute per l'esercito nazionalista.",
  },
  {
    id: 'CHN_GUIZHOU',
    name: 'Guizhou (Kweichow — Guiyang)',
    keys: ['guizhou', 'kweichow', 'guiyang', 'chn_guizhou'],
    dynamicName: (s: number) => "Guizhou Sheng (Guiyang)",
    dynamicAdminTitle: (s: number) => "Zhōnghuá Mínguó — Guizhou Sheng Zhengfu",
    dynamicNote: (s: number) =>
      "Altopiano montuoso carsico nel sud-ovest della Cina; snodo strategico di collegamento tra Sichuan, Yunnan e Guangxi.",
  },
  {
    id: 'CHN_YUNNAN',
    name: 'Yunnan (Kunming — Strada della Birmania)',
    keys: ['yunnan', 'kunming', 'long_yun', 'burma_road', 'strada_della_birmania', 'chn_yunnan'],
    dynamicName: (s: number) => "Yunnan Sheng (Kunming — Burma Road)",
    dynamicAdminTitle: (s: number) => "Zhōnghuá Mínguó — Long Yun (Burma Road)",
    dynamicNote: (s: number) =>
      "Governata dal potente signore della guerra Long Yun; capolinea della vitale Strada della Birmania (Burma Road) e della ferrovia dell'Indocina, arterie salvavita di aiuti alleati.",
  },
  {
    id: 'CHN_GANSU',
    name: 'Gansu (Kansu — Lanzhou)',
    keys: ['gansu', 'kansu', 'lanzhou', 'hexi', 'operazione_zet', 'chn_gansu'],
    dynamicName: (s: number) => "Gansu Sheng (Lanzhou)",
    dynamicAdminTitle: (s: number) => "Zhōnghuá Mínguó — Lanzhou (Operazione Zet)",
    dynamicNote: (s: number) =>
      "Corridoio di Hexi lungo l'antica Via della Seta; terminale logistico dei massicci rifornimenti di aerei, carri e armamenti dell'Unione Sovietica (Operazione Zet).",
  },
  {
    id: 'CHN_NINGXIA',
    name: 'Ningxia (Cricca Ma — Ma Hongkui)',
    keys: ['ningxia', 'ma_hongkui', 'yinchuan', 'chn_ningxia'],
    dynamicName: (s: number) => "Ningxia Sheng (Ma Hongkui)",
    dynamicAdminTitle: (s: number) => "Zhōnghuá Mínguó — Ma Juntuan (Ningxia)",
    dynamicNote: (s: number) =>
      "Dominio del generale musulmano Ma Hongkui, parte della confederazione Xibei San Ma fedele al governo di Chiang Kai-shek contro l'espansione nipponica.",
  },
  {
    id: 'CHN_QINGHAI',
    name: 'Qinghai (Chinghai — Ma Bufang)',
    keys: ['qinghai', 'chinghai', 'ma_bufang', 'xining', 'koko_nor', 'chn_qinghai'],
    dynamicName: (s: number) => "Qinghai Sheng (Ma Bufang)",
    dynamicAdminTitle: (s: number) => "Zhōnghuá Mínguó — Ma Juntuan (Xining)",
    dynamicNote: (s: number) =>
      "Altopiano tibetano-mongolo retto dal generale Ma Bufang; formidabili reparti di cavalleria musulmana Huí che combatterono valorosamente sul fronte orientale.",
  },
  {
    id: 'CHN_XINJIANG',
    name: 'Xinjiang (Sinkiang — Dihua / Ürümqi)',
    keys: ['xinjiang', 'sinkiang', 'dihua', 'urumqi', 'sheng_shicai', 'chn_xinjiang'],
    dynamicName: (s: number) => "Xinjiang Sheng (Dihua / Ürümqi)",
    dynamicAdminTitle: (s: number) => "Xinjiang Duban Gongshu (Sheng Shicai — Allineato all'URSS)",
    dynamicNote: (s: number) =>
      "Vasto territorio del Turkestan orientale governato con pugno di ferro dal signore della guerra Sheng Shicai sotto stretta protezione e influenza politica e militare dell'Unione Sovietica.",
  },
  {
    id: 'CHN_TIBET',
    name: 'Bod (Tibet — Lhasa & Ganden Phodrang)',
    keys: ['tibet', 'xizang', 'bod', 'lhasa', 'dalai_lama', 'reting_rinpoche', 'kashag', 'chn_tibet'],
    dynamicName: (s: number) => "Bod (Lhasa — Ganden Phodrang)",
    dynamicAdminTitle: (s: number) => "Kashag — Bod (14° Dalai Lama / Reggenza di Reting Rinpoche)",
    dynamicNote: (s: number) =>
      "Stato teocratico buddista de facto indipendente governato dal Kashag a Lhasa sotto la reggenza di Reting Rinpoche e la giovane reincarnazione del 14° Dalai Lama (Tenzin Gyatso).",
  },
  {
    id: 'CHN_TAIWAN',
    name: 'Taiwan (Formosa — Taiwan Sōtokufu)',
    keys: ['taiwan', 'formosa', 'taihoku', 'taipei', 'takao', 'kaohsiung', 'taichu', 'tainan', 'chn_taiwan'],
    dynamicName: (s: number) => "Taiwan (Formosa — Taiwan Sōtokufu)",
    dynamicAdminTitle: (s: number) => "Dai Nippon Teikoku — Taiwan Sōtokufu (Taihoku)",
    dynamicNote: (s: number) =>
      "Colonia imperiale giapponese dal 1895 (Trattato di Shimonoseki), guidata dal Governatore Generale a Taihoku; trampolino per le operazioni aeree e navali sulla Cina meridionale e il Pacifico.",
  },
  {
    id: 'CHN_HONGKONG',
    name: 'Hong Kong (Crown Colony of Hong Kong)',
    keys: ['hong_kong', 'hongkong', 'kowloon', 'victoria', 'northcote', 'chn_hongkong'],
    dynamicName: (s: number) => "Crown Colony of Hong Kong (Victoria)",
    dynamicAdminTitle: (s: number) => "British Empire — Crown Colony of Hong Kong (Gov. Sir Geoffry Northcote)",
    dynamicNote: (s: number) =>
      "Colonia della Corona Britannica comprendente l'Isola di Hong Kong, la penisola di Kowloon e i Nuovi Territori; snodo finanziario e d'intelligence con confini terrestri isolati dall'esercito giapponese.",
  },
  {
    id: 'CHN_MACAU',
    name: 'Macau (Província Ultramarina de Macau)',
    keys: ['macau', 'macao', 'porto_interior', 'tamagnini', 'chn_macau'],
    dynamicName: (s: number) => "Macau Português (Província Ultramarina)",
    dynamicAdminTitle: (s: number) => "República Portuguesa — Província Ultramarina de Macau (Gov. Tamagnini)",
    dynamicNote: (s: number) =>
      "Colonia portoghese neutrale guidata dal governatore Artur Tamagnini de Sousa Barbosa; rifugio pacifico per centinaia di migliaia di profughi dalla Cina continentale e da Hong Kong.",
  },
];

export function resolveChinaToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;

  // 1. Direct ID match
  let foundProv = CHINA_PROVINCES_CATALOG.find((p) => p.id === id);

  // 2. Fuzzy key lookup
  if (!foundProv) {
    const normTokens = normKey.split('_').filter(Boolean);
    for (const p of CHINA_PROVINCES_CATALOG) {
      if (p.keys.some((k) => normKey === k || normTokens.includes(k) || (k.length >= 4 && normKey.includes(k)))) {
        foundProv = p;
        break;
      }
    }
  }

  if (foundProv) {
    const p = foundProv;
    const name = p.dynamicName ? p.dynamicName(step) : p.name;
    const adminTitle = p.dynamicAdminTitle ? p.dynamicAdminTitle(step) : (p.adminTitle || `Zhōnghuá Mínguó — ${name}`);
    const note = p.dynamicNote ? p.dynamicNote(step) : p.note;
    return { name, adminTitle, note };
  }

  if (owner === 'CHI') {
    return {
      name: rawName || 'Zhōnghuá Mínguó',
      adminTitle: step >= 2 ? 'Zhōnghuá Mínguó Guómín Zhèngfǔ (Péidū Chongqing)' : 'Zhōnghuá Mínguó Guómín Zhèngfǔ (Nanjing)',
      note: 'Territorio della Repubblica di Cina sotto la guida del Kuomintang (Generalissimo Chiang Kai-shek).',
    };
  }

  if (owner === 'MAN') {
    return {
      name: rawName || 'Damanzhoudiguo',
      adminTitle: 'Damanzhoudiguo (Imperatore Puyi / Kangde)',
      note: 'Territorio dell\'Impero del Grande Manciukuò sotto protettorato giapponese dell\'Armata del Kwantung.',
    };
  }

  if (owner === 'MEJ') {
    return {
      name: rawName || 'Mengjiang',
      adminTitle: 'Mengjiang Lianhe Zizhi Zhengfu (Principe De Wang)',
      note: 'Governo Autonomo Unito del Mengjiang nella Mongolia Interna (Chahar e Suiyuan).',
    };
  }

  if (owner === 'CCP_CHI') {
    return {
      name: rawName || 'Shaan-Gan-Ning Bianqu',
      adminTitle: 'Zhongguo Gongchandang — Shaan-Gan-Ning Bianqu (Mao Zedong / Zhu De)',
      note: 'Base Rossa del Partito Comunista Cinese e dell\'8ª Armata di Strada a Yan\'an.',
    };
  }

  if (owner === 'XIN') {
    return {
      name: rawName || 'Xinjiang Sheng',
      adminTitle: 'Xinjiang Duban Gongshu (Generale Sheng Shicai)',
      note: 'Governo provinciale dello Xinjiang retto dal signore della guerra Sheng Shicai sotto influenza sovietica.',
    };
  }

  if (owner === 'TIB') {
    return {
      name: rawName || 'Bod (Tibet)',
      adminTitle: 'Kashag — Ganden Phodrang (14° Dalai Lama / Reting Rinpoche)',
      note: 'Stato teocratico buddista de facto indipendente a Lhasa.',
    };
  }

  if (owner === 'WJ_CHI') {
    return {
      name: rawName || 'Zhōnghuá Mínguó (Wang Jingwei)',
      adminTitle: step >= 6 ? 'Zhōnghuá Mínguó Wěi Zhèngfǔ (Nanjing — Wang Jingwei)' : 'Zhōnghuá Mínguó Línshí / Wéixīn Zhèngfǔ',
      note: 'Governo collaborazionista cinese filo-giapponese.',
    };
  }

  return null;
}

export function resolveCanadaToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;

  // 1. Livello Nazionale Canada
  const isNationalCanada =
    normKey === 'canada' ||
    normKey === 'dominion_of_canada' ||
    normKey === 'dominion_del_canada' ||
    ((id === 'CAN' || id === 'CA' || id === '124') &&
     (!normKey || normKey === 'unknown' || normKey === 'territorio_non_assegnato' || normKey === 'canada'));

  if (isNationalCanada) {
    if (step >= 8) {
      return {
        name: 'Dominion of Canada (Hyde Park Agreement & Arsenale Alleato)',
        adminTitle: 'Dominion of the British Commonwealth — Prime Minister W.L. Mackenzie King',
        note: "Dominion autonomo del Commonwealth britannico. Con la Dichiarazione di Hyde Park dell'aprile 1941, l'apparato industriale canadese è pienamente coordinato con il Lend-Lease statunitense; la Royal Canadian Navy assume oltre il 40% delle missioni di scorta ai convogli transatlantici e la miniera Eldorado a Port Radium (NWT) avvia le forniture segrete di uranio per il progetto Tube Alloys.",
      };
    }
    if (step >= 7) {
      return {
        name: 'Dominion of Canada (Accordo di Ogdensburg & Difesa Nordamericana)',
        adminTitle: 'Dominion of the British Commonwealth — Prime Minister W.L. Mackenzie King',
        note: "A seguito della caduta della Francia, il Canada diventa la seconda potenza bellica alleata dopo il Regno Unito. Nell'agosto 1940 Mackenzie King e Roosevelt siglano l'Accordo di Ogdensburg istituendo la Commissione Permanente di Difesa Congiunta (PJBD); mobilitazione totale dell'industria automobilistica (autocarri CMP) e aeronautica (Hawker Hurricane a Fort William).",
      };
    }
    if (step >= 5) {
      return {
        name: 'Dominion of Canada (Mobilitazione Bellica & BCATP)',
        adminTitle: 'Dominion of the British Commonwealth — Prime Minister W.L. Mackenzie King',
        note: "Il 10 settembre 1939, a seguito del voto sovrano del Parlamento di Ottawa, il Canada dichiara guerra alla Germania nazista. Viene istituito il Dipartimento delle Munizioni sotto C.D. Howe, salpano da Halifax i primi convogli atlantici (HX-1) e viene siglato il British Commonwealth Air Training Plan (BCATP) per addestrare decine di migliaia di piloti dell'Impero.",
      };
    }
    if (step >= 2) {
      return {
        name: 'Dominion of Canada (Riarmo Industriale & Visita Reale 1939)',
        adminTitle: 'Dominion of the British Commonwealth — Prime Minister W.L. Mackenzie King',
        note: "Dominion autonomo in fase di riarmo difensivo post-crisi di Monaco. Nel maggio-giugno 1939 la storica visita ufficiale di Re Giorgio VI e della Regina Elisabetta attraverso tutte le province consolida la coesione nazionale e la lealtà imperiale alla vigilia della guerra.",
      };
    }
    return {
      name: 'Dominion of Canada (Statuto di Westminster 1931 & Ottawa)',
      adminTitle: 'Dominion of the British Commonwealth — Prime Minister W.L. Mackenzie King',
      note: "Dominion pienamente autonomo del Commonwealth britannico sotto lo Statuto di Westminster (1931), guidato dal premier liberale William Lyon Mackenzie King. Cuore politico federale a Ottawa; economia in ripresa post-Grande Depressione con primati mondiali nell'esportazione di grano delle praterie, nichel di Sudbury, alluminio di Arvida e petrolio di Turner Valley.",
    };
  }

  // 2. Terranova e Labrador (Dominion of Newfoundland)
  if (
    id === 'CA_NL' ||
    id === 'NF' ||
    id === 'NFD' ||
    normKey.includes('newfoundland') ||
    normKey.includes('terranova') ||
    normKey.includes('labrador')
  ) {
    const nlMeta = CANADA_PROVINCES_META['CA_NL'];
    if (nlMeta) {
      return {
        name: nlMeta.getHistoricalName(step),
        adminTitle: nlMeta.getAdminTitle(step),
        note: nlMeta.getNote(step),
      };
    }
  }

  // 3. Risoluzione granulare Province e Territori da CANADA_PROVINCES_META
  const cleanId = id.toUpperCase().trim().replace('-', '_');
  const provMeta =
    CANADA_PROVINCES_META[cleanId] ||
    (cleanId.startsWith('CA_') ? undefined : CANADA_PROVINCES_META['CA_' + cleanId]);

  if (provMeta) {
    return {
      name: provMeta.getHistoricalName(step),
      adminTitle: provMeta.getAdminTitle(step),
      note: provMeta.getNote(step),
    };
  }

  for (const k of Object.keys(CANADA_PROVINCES_META)) {
    const item = CANADA_PROVINCES_META[k];
    const nrmItem = item.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    if (normKey === nrmItem || (nrmItem.length >= 5 && normKey.includes(nrmItem))) {
      return {
        name: item.getHistoricalName(step),
        adminTitle: item.getAdminTitle(step),
        note: item.getNote(step),
      };
    }
  }

  // 4. Ricerca nel dizionario storico di CAN
  const canDict = HISTORICAL_TOPONYM_DICT['CAN'];
  if (canDict && canDict[normKey]) {
    return {
      name: canDict[normKey].historicalName,
      adminTitle: canDict[normKey].adminTitle,
      note: canDict[normKey].historicalNote,
    };
  }

  return null;
}



export function resolveBritishColonialToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;
  const n = normKey || '';
  const nid = (id || '').toUpperCase();

  // 1. Dominions del Commonwealth Britannico
  // Canada & Terranova (Newfoundland)
  if (
    owner === 'CAN' ||
    nid === 'CA' ||
    nid === 'CAN' ||
    nid === '124' ||
    nid === 'NF' ||
    nid === 'NFD' ||
    nid === 'CA_NL' ||
    n.includes('canada') ||
    n.includes('newfoundland') ||
    n.includes('terranova') ||
    Boolean((CANADA_PROVINCES_META as any)?.[nid])
  ) {
    const canRes = resolveCanadaToponym(id, rawName, normKey, owner, step);
    if (canRes) return canRes;
  }

  // Australia
  if (
    owner === 'AST' ||
    nid === 'AU' ||
    nid === 'AST' ||
    nid === 'AUS' ||
    nid === '036' ||
    n.includes('australia')
  ) {
    return {
      name: 'Commonwealth of Australia (Canberra)',
      adminTitle: 'Dominion of the British Commonwealth',
      note: 'Federazione autonoma del Commonwealth britannico (Primo Ministro Robert Menzies). Entrata in guerra a fianco della Gran Bretagna il 3 settembre 1939, mobilitò la Second Australian Imperial Force (AIF) e la Royal Australian Air Force (RAAF), impegnate in Nord Africa, Grecia, Medio Oriente e a Singapore.',
    };
  }

  // Nuova Zelanda (New Zealand)
  if (
    (owner === 'NZL' && !n.includes('samoa') && !n.includes('niue')) ||
    nid === 'NZ' ||
    nid === 'NZL' ||
    nid === '554' ||
    n.includes('new_zealand') ||
    n.includes('nuova_zelanda')
  ) {
    return {
      name: 'Dominion of New Zealand (Wellington)',
      adminTitle: 'Dominion of the British Commonwealth',
      note: 'Dominion del Pacifico meridionale guidato dal Primo Ministro Michael Joseph Savage ("Where Britain goes, we go"). Schierò la 2ª Divisione di fanteria neozelandese in Medio Oriente e nel Mediterraneo, mentre la Royal New Zealand Navy partecipò alla caccia alla corazzata tascabile Graf Spee nel 1939 (HMS Achilles).',
    };
  }

  // Walvis Bay & South West Africa (Namibia)
  const resNamibia = resolveNamibiaProvince(nid || n, step);
  if (resNamibia) {
    return {
      name: resNamibia.name,
      adminTitle: resNamibia.adminEntity,
      note: resNamibia.note,
    };
  }

  // Unione Sudafricana (Union of South Africa)
  if (
    (owner === 'SAF' && !n.includes('south_west_africa') && !n.includes('south-west_africa') && !n.includes('namibia') && !n.includes('suidwes') && !n.includes('walvis') && !n.includes('walbis')) ||
    nid === 'ZA' ||
    nid === 'SAF' ||
    nid === 'ZAF' ||
    nid === '710' ||
    n.includes('union_of_south_africa') ||
    (n.includes('south_africa') && !n.includes('south_west')) ||
    (n.includes('sudafrica') && !n.includes('sudovest'))
  ) {
    return {
      name: 'Union of South Africa / Unie van Suid-Afrika (Pretoria / Cape Town)',
      adminTitle: 'Dominion of the British Commonwealth',
      note: 'Dominion bilingue anglo-afrikaner. Nel settembre 1939, in seguito alle dimissioni del neutralista J.B.M. Hertzog, il generale Jan Smuts assunse la guida del governo e dichiarò guerra il 6 settembre. La South African Union Defence Force (UDF) fu decisiva nella liberazione dell\'Africa Orientale Italiana (1940-1941).',
    };
  }

  // 2. Impero Indiano (British Raj) & Oceano Indiano
  // British Raj / India
  if (
    owner === 'RAJ' ||
    nid === 'IN' ||
    nid === 'IND' ||
    nid === 'RAJ' ||
    nid === '356' ||
    n.includes('british_raj') ||
    n.includes('india') ||
    n.includes('hindustan')
  ) {
    return {
      name: 'British Raj (Imperial Crown of India / Hindūstān — New Delhi)',
      adminTitle: 'Empire of India (British Crown / Viceroyalty)',
      note: 'Il Gioiello della Corona dell\'Impero Britannico retto dal Viceré Lord Linlithgow. Nel settembre 1939 la Gran Bretagna dichiarò la guerra a nome dell\'India senza consultare i leader nazionalisti, scatenando le dimissioni dei governi provinciali del Congresso Nazionale Indiano (Gandhi, Nehru). Mobilitò la British Indian Army, la più grande armata interamente volontaria della storia con oltre 2,5 milioni di uomini.',
    };
  }

  // Ceylon (Sri Lanka)
  if (
    nid === 'LK' ||
    nid === 'LKA' ||
    nid === '144' ||
    n.includes('ceylon') ||
    n.includes('sri_lanka')
  ) {
    return {
      name: 'Ceylon (Crown Colony of Ceylon — Colombo)',
      adminTitle: 'British Crown Colony',
      note: 'Colonia della Corona britannica dal 1802. Centro di produzione primaria di caucciù/gomma naturale vitale per le nazioni alleate e quartier generale navale della Eastern Fleet britannica (basi di Colombo e Trincomalee).',
    };
  }

  // Birmania Britannica (British Burma)
  if (
    nid === 'MM' ||
    nid === 'MMR' ||
    nid === '104' ||
    n.includes('burma') ||
    n.includes('birmania') ||
    n.includes('myanmar')
  ) {
    if (step === 0) {
      return {
        name: 'Burma (Province of the Indian Empire — Rangoon)',
        adminTitle: 'Province of the Indian Empire',
        note: 'Provincia dell\'Impero Anglo-Indiano fino al 1° aprile 1937, data in cui il Government of Burma Act 1935 la separò da Nuova Delhi erigendola a colonia della Corona autonoma.',
      };
    }
    return {
      name: 'British Burma (Crown Colony of Burma — Rangoon)',
      adminTitle: 'British Crown Colony',
      note: 'Colonia della Corona autonoma dal 1° aprile 1937. Capolinea meridionale della celebre Burma Road (Strada della Birmania) aperta nel 1938 per rifornire la Repubblica di Cina nazionalista contro l\'invasione nipponica; ricca di giacimenti di petrolio (BOC a Yenangyaung), piombo, tungsteno e riso.',
    };
  }

  // Isole Maldive (Maldive Islands)
  if (
    nid === 'MV' ||
    nid === 'MDV' ||
    nid === '462' ||
    n.includes('maldive') ||
    n.includes('maldives')
  ) {
    return {
      name: 'Sultanate of the Maldive Islands (British Protected State)',
      adminTitle: 'British Protected State (Ceylon Dependency)',
      note: 'Sultanato islamico protetto dalla Gran Bretagna sotto giurisdizione del Governatore di Ceylon (Sultano Hassan Nooraddeen II), avamposto per le rotte navali dell\'Oceano Indiano centrale.',
    };
  }

  // Mauritius
  if (
    nid === 'MU' ||
    nid === 'MUS' ||
    nid === '480' ||
    n.includes('mauritius')
  ) {
    return {
      name: 'Mauritius & Dependencies (Crown Colony — Port Louis)',
      adminTitle: 'British Crown Colony',
      note: 'Colonia della Corona nell\'Oceano Indiano, snodo telegrafico vitale e stazione di rifornimento per i convogli che doppiando il Capo di Buona Speranza risalivano verso il Medio Oriente e l\'India.',
    };
  }

  // Seychelles
  if (
    nid === 'SC' ||
    nid === 'SYC' ||
    nid === '690' ||
    n.includes('seychelles')
  ) {
    return {
      name: 'Seychelles (Crown Colony — Victoria)',
      adminTitle: 'British Crown Colony',
      note: 'Colonia della Corona nell\'Oceano Indiano occidentale, stazione idrovolanti e avamposto d\'avvistamento a presidio delle rotte tra Mombasa e Bombay.',
    };
  }

  // 3. Sud-Est Asiatico & Estremo Oriente
  // British Malaya
  if (
    nid === 'MY' ||
    nid === 'MYS' ||
    nid === '458' ||
    n.includes('malaya') ||
    n.includes('malese') ||
    n.includes('malaysia')
  ) {
    return {
      name: 'British Malaya (Federated & Unfederated Malay States — Kuala Lumpur)',
      adminTitle: 'British Protected States & Crown Colonies',
      note: 'Complesso coloniale costituito da Stati Malesi Federati (Perak, Selangor, Negeri Sembilan, Pahang) e Non Federati (Johor, Kedah, Kelantan, Perlis, Terengganu). Primo produttore mondiale di gomma naturale (40%) e stagno (60%), cardini dell\'economia imperiale e delle riserve valutarie di dollari.',
    };
  }

  // Straits Settlements / Singapore
  if (
    nid === 'SG' ||
    nid === 'SGP' ||
    nid === '702' ||
    n.includes('singapore') ||
    n.includes('straits_settlements')
  ) {
    return {
      name: 'Straits Settlements (Singapore, Penang & Malacca)',
      adminTitle: 'British Crown Colony — Singapore Naval Base',
      note: 'Colonia della Corona e perno della "Singapore Strategy" per la difesa dell\'Impero in Estremo Oriente. Sede della grandiosa base navale di Sembawang (inaugurata nel 1938) con il bacino galleggiante King George VI.',
    };
  }

  // Brunei
  if (
    nid === 'BN' ||
    nid === 'BRN' ||
    nid === '096' ||
    n.includes('brunei')
  ) {
    return {
      name: 'State of Brunei (British Protected State — Bandar Brunei)',
      adminTitle: 'British Protected State',
      note: 'Sultanato protetto britannico guidato dal Sultano Ahmad Tajuddin, sede dei floridi giacimenti petroliferi di Seria scoperti nel 1929 dalla British Malayan Petroleum Co. (Shell).',
    };
  }

  // North Borneo / Sabah
  if (
    n.includes('north_borneo') ||
    n.includes('borneo_del_nord') ||
    n.includes('sabah')
  ) {
    return {
      name: 'British North Borneo (Chartered Company — Sandakan)',
      adminTitle: 'British Protectorate (North Borneo Chartered Company)',
      note: 'Protettorato amministrato dalla British North Borneo Chartered Company sotto statuto reale della Corona, esportatore di caucciù e legname tropicale.',
    };
  }

  // Sarawak
  if (n.includes('sarawak')) {
    return {
      name: 'Kingdom of Sarawak (White Rajahs — Kuching)',
      adminTitle: 'British Protected State (Brooke Dynasty)',
      note: 'Stato protetto retto dal terzo "Rajah Bianco" Charles Vyner Brooke, dotato di giacimenti e raffinerie petrolifere strategiche a Miri e Lutong.',
    };
  }

  // Hong Kong
  if (
    nid === 'HK' ||
    nid === 'HKG' ||
    nid === '344' ||
    n.includes('hong_kong') ||
    n.includes('hongkong')
  ) {
    return {
      name: 'Crown Colony of Hong Kong (Victoria)',
      adminTitle: 'British Crown Colony',
      note: 'Colonia della Corona britannica (Isola di Hong Kong, Kowloon e Nuovi Territori in concessione di 99 anni). Avamposto commerciale e navale strategico in Cina, isolato e accerchiato dalle truppe giapponesi dopo la presa di Canton nell\'ottobre 1938.',
    };
  }

  // 4. Medio Oriente & Vicino Oriente
  // Mandato di Palestina (British Mandate for Palestine)
  if (
    nid === 'PS' ||
    nid === 'PSE' ||
    nid === 'IL' ||
    nid === 'ISR' ||
    nid === '275' ||
    nid === '376' ||
    n.includes('palestine') ||
    n.includes('palestina') ||
    n.includes('israel') ||
    n.includes('gerusalemme') ||
    n.includes('jerusalem')
  ) {
    return {
      name: 'British Mandate for Palestine (Jerusalem)',
      adminTitle: 'League of Nations Class A Mandate',
      note: 'Mandato di Classe A della Società delle Nazioni assegnato al Regno Unito. Teatro della Grande Rivolta Araba (1936-1939) repressa dalle forze britanniche e della pubblicazione del Libro Bianco del 1939 di Malcolm MacDonald. Porto terminale a Haifa per l\'oleodotto trans-iracheno di greggio Kirkuk-Haifa.',
    };
  }

  // Transgiordania (Transjordan)
  if (
    nid === 'JO' ||
    nid === 'JOR' ||
    nid === '400' ||
    n.includes('transjordan') ||
    n.includes('transgiordania') ||
    n.includes('jordan') ||
    n.includes('giordania')
  ) {
    return {
      name: 'Emirate of Transjordan (Amman)',
      adminTitle: 'British Protected Emirate / League of Nations Mandate',
      note: 'Emirato autonomo hashemita governato dall\'Emiro Abdullah I ibn Hussein con la celebre Arab Legion (Legione Araba) comandata dal brigadiere generale britannico John Bagot Glubb ("Glubb Pasha"), forza d\'élite disciplinata del Medio Oriente.',
    };
  }

  // Iraq (Mesopotamia)
  if (
    owner === 'IRQ' ||
    nid === 'IQ' ||
    nid === 'IRQ' ||
    nid === '368' ||
    n.includes('iraq') ||
    n.includes('mesopotam')
  ) {
    if (step >= 8) {
      return {
        name: "Regno dell'Iraq (Colpo di Stato Filo-Asse di Rashid Ali al-Kaylani — Baghdad & Habbaniya)",
        adminTitle: "Regno dell'Iraq — Governo di Difesa Nazionale (PM Rashid Ali al-Kaylani & 'Quadrato d'Oro')",
        note: "COLPO DI STATO NAZIONALISTA E GUERRA ANGLO-IRACHENA (aprile 1941): Il 1°-2 aprile 1941 l'ex Primo Ministro Rashid Ali al-Kaylani, appoggiato dai quattro colonnelli nazionalisti del 'Quadrato d'Oro' (Salah al-Din al-Sabbagh) e dal Gran Mufti Amin al-Husseini, rovescia il reggente filo-britannico 'Abd al-Ilah, istituisce un Governo di Difesa Nazionale filo-Asse e invia truppe e artiglieria ad assediare la base aerea britannica di RAF Habbaniya, mentre Londra fa sbarcare a Bassora la 10ª Divisione di Fanteria indiana (Operazione Sabine).",
      };
    }
    return {
      name: 'Kingdom of Iraq (Hashemite Monarchy — Baghdad)',
      adminTitle: 'Independent Kingdom under British Treaty Alliance',
      note: 'Regno hashemita governato dal reggente ‘Abd al-Ilah (per conto del giovane Re Faisal II), formalmente sovrano ma vincolato dal Trattato Anglo-Irakeno del 1930 che garantiva al Regno Unito basi militari della RAF (Habbaniya e Shaibah), il transito militare e il monopolio sui pozzi petroliferi dell\'Iraq Petroleum Company (Kirkuk e Mosul).',
    };
  }

  // Kuwait
  if (
    nid === 'KW' ||
    nid === 'KWT' ||
    nid === '414' ||
    n.includes('kuwait')
  ) {
    return {
      name: 'State of Kuwait (British Protected State — Al-Kuwait)',
      adminTitle: 'British Protected State (Al-Sabah Dynasty)',
      note: 'Sceiccato protetto britannico governato da Sheikh Ahmad Al-Jaber Al-Sabah. Nel 1938 la Kuwait Oil Company scoprì a Burgan uno dei più giganteschi bacini petroliferi del pianeta.',
    };
  }

  // Bahrain
  if (
    nid === 'BH' ||
    nid === 'BHR' ||
    nid === '048' ||
    n.includes('bahrain')
  ) {
    return {
      name: 'State of Bahrain (British Protected State — Manama)',
      adminTitle: 'British Protected State (Al-Khalifa Dynasty)',
      note: 'Protettorato britannico nel Golfo Persico, sede del Political Resident per il Golfo e prima nazione della penisola arabica a produrre ed esportare greggio raffinato (raffineria BAPCO di Sitra).',
    };
  }

  // Qatar
  if (
    nid === 'QA' ||
    nid === 'QAT' ||
    nid === '634' ||
    n.includes('qatar')
  ) {
    return {
      name: 'State of Qatar (British Protected State — Doha)',
      adminTitle: 'British Protected State (Al-Thani Dynasty)',
      note: 'Sceiccato protetto britannico legato dal trattato del 1916 (Sheikh Abdullah bin Jassim Al-Thani). Nel 1939 la Petroleum Development (Qatar) Ltd vi scoprì il primo giacimento petrolifero a Dukhan.',
    };
  }

  // Trucial States (Emirati della Tregua)
  if (
    nid === 'AE' ||
    nid === 'ARE' ||
    nid === '784' ||
    n.includes('trucial') ||
    n.includes('costa_dei_pirati') ||
    n.includes('emirati')
  ) {
    return {
      name: 'Trucial States (British Protected Sheikhdoms — Abu Dhabi, Dubai, etc.)',
      adminTitle: 'British Protected Sheikhdoms (Trucial Coast)',
      note: 'Insieme di sette sceiccati della costa del Golfo (Abu Dhabi, Dubai, Sharjah, Ajman, Umm al-Quwain, Ras al-Khaimah, Fujairah) legati a Whitehall da trattati di protezione esclusiva marittima e terrestre.',
    };
  }

  // Muscat & Oman
  if (
    nid === 'OM' ||
    nid === 'OMN' ||
    nid === '512' ||
    n.includes('muscat') ||
    n.includes('oman')
  ) {
    return {
      name: 'Sultanate of Muscat and Oman (British Protected State — Muscat)',
      adminTitle: 'British Protected Sultanate (Al-Busaid Dynasty)',
      note: 'Sultanato retto dalla dinastia Al-Busaid (Sultano Said bin Taimur), legato al Regno Unito da trattati di amicizia perpetua per la salvaguardia delle rotte del Mar Arabico e dello Stretto di Hormuz.',
    };
  }

  // 22 Governatorati dello Yemen (Regno dello Yemen, Protettorato di Aden, Porto di Aden)
  const cleanYeNid = nid ? nid.replace(/^YE_/, 'YE').toUpperCase() : '';
  if (cleanYeNid && (YEMEN_PROVINCES_META as any)[cleanYeNid]) {
    const ye = (YEMEN_PROVINCES_META as any)[cleanYeNid];
    if (cleanYeNid === 'YEAD') {
      if (step === 0) {
        return {
          name: "Aden (Porto dell'India Britannica — British Raj)",
          adminTitle: "Chief Commissioner's Province of British India (Port of Aden)",
          note: ye.note
        };
      }
      return {
        name: "Colonia di Aden (Crown Colony of Aden)",
        adminTitle: "British Crown Colony of Aden (Colonial Office)",
        note: ye.note
      };
    }
    return {
      name: ye.historicalName,
      adminTitle: ye.adminTitle,
      note: ye.note
    };
  }

  // Aden generico (perimetro storico o residuo toponomastico)
  if (n.includes('aden') || nid === '887') {
    if (step === 0) {
      return {
        name: "Aden (Porto dell'India Britannica — British Raj)",
        adminTitle: "Chief Commissioner's Province (British India)",
        note: "Amministrato come insediamento sotto il Governo dell'India Britannica (Chief Commissioner) fino al 31 marzo 1937."
      };
    }
    return {
      name: "Colonia di Aden (Crown Colony of Aden)",
      adminTitle: "British Crown Colony of Aden (Colonial Office)",
      note: "Colonia della Corona e porto di bunkeraggio dal 1° aprile 1937."
    };
  }

  // Regno dello Yemen generico
  if (nid === 'YE' || nid === 'YEM' || n.includes('yemen')) {
    return {
      name: "Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah (Sana'a)",
      adminTitle: "Regno Mutawakkilita dello Yemen (Imam Yahya Muhammad Hamid ed-Din)",
      note: "Stato sovrano e teocrazia zaidita retta dall'Imam Yahya, con capitale a Sana'a."
    };
  }

  // Algeria Francese (58 Wilayas)
  const cleanDzNid = nid ? nid.replace(/^DZ_/, 'DZ').toUpperCase() : '';
  if (cleanDzNid && (ALGERIA_PROVINCES_META as any)[cleanDzNid]) {
    const dz = (ALGERIA_PROVINCES_META as any)[cleanDzNid];
    return {
      name: dz.historicalName,
      adminTitle: dz.adminTitle,
      note: dz.note,
    };
  }

  // Marocco Francese (9 Regioni e Territori)
  const cleanMaNid = nid ? nid.replace(/^MA_/, 'MA').toUpperCase() : '';
  if (cleanMaNid && (MOROCCO_PROVINCES_META as any)[cleanMaNid]) {
    const ma = (MOROCCO_PROVINCES_META as any)[cleanMaNid];
    return {
      name: ma.historicalName,
      adminTitle: ma.adminTitle,
      note: ma.note,
    };
  }

  // Tunisia Francese (24 Governatorati e Territori del Sud)
  const cleanTnNid = nid ? nid.replace(/^TN_/, 'TN').toUpperCase() : '';
  if (cleanTnNid && (TUNISIA_PROVINCES_META as any)[cleanTnNid]) {
    const tn = (TUNISIA_PROVINCES_META as any)[cleanTnNid];
    return {
      name: tn.historicalName,
      adminTitle: tn.adminTitle,
      note: tn.note,
    };
  }

  // Egitto (Regno d'Egitto — Sfera Britannica)
  const cleanEgNid = nid ? nid.replace(/^EG_/, 'EG').toUpperCase() : '';
  if (cleanEgNid && EGYPT_DISTRICTS_META[cleanEgNid]) {
    const eg = EGYPT_DISTRICTS_META[cleanEgNid];
    return {
      name: eg.historicalName,
      adminTitle: eg.adminTitle,
      note: eg.note,
    };
  }
  if (
    !n.includes('sudan') &&
    (owner === 'EGY' ||
      nid === 'EG' ||
      nid === 'EGY' ||
      nid === '818' ||
      n.includes('egypt') ||
      n.includes('egitto'))
  ) {
    return {
      name: 'Kingdom of Egypt (British Military Sphere — Cairo)',
      adminTitle: 'Kingdom of Egypt (Anglo-Egyptian Treaty of 1936)',
      note: 'Monarchia costituzionale guidata da Re Faruq I, formalmente indipendente ma vincolata dal Trattato Anglo-Egiziano del 1936 che autorizzava la Gran Bretagna a mantenere guarnigioni permanenti a difesa del Canale di Suez, la base navale di Alessandria e il controllo del Cairo per la difesa strategica imperiale.',
    };
  }

  // Sudan Anglo-Egiziano (Anglo-Egyptian Sudan) & South Sudan (Southern Provinces)
  const resSudan = resolveSudanProvince(nid || n, step);
  if (resSudan) {
    return {
      name: resSudan.name,
      adminTitle: resSudan.adminEntity,
      note: resSudan.note,
    };
  }

  // Regno dell'Afghanistan (34 Province 1936-1941)
  const resAfg = resolveAfghanistanProvince(nid || n, step);
  if (resAfg) {
    return {
      name: resAfg.name,
      adminTitle: resAfg.adminEntity,
      note: resAfg.note,
    };
  }

  // 5. Africa Orientale, Centrale & Australe
  // Somalia Britannica (British Somaliland)
  if (
    n.includes('british_somaliland') ||
    n.includes('somalia_britannica') ||
    (n.includes('somaliland') && !n.includes('french') && !n.includes('italian'))
  ) {
    if (step >= 6) {
      return {
        name: 'British Somaliland Protectorate (Berbera)',
        adminTitle: 'British Crown Protectorate (Governor Arthur Chater / Somaliland Camel Corps — Allerta Bellica)',
        note: 'Protettorato della Corona britannica a Berbera sul Golfo di Aden. A Giugno 1940 è saldamente sotto controllo britannico (Governatore Arthur Chater); l\'invasione italiana delle forze dell\'AOI guidate dal Generale Guglielmo Nasi scattò solo successivamente, tra il 3 e il 19 agosto 1940.',
      };
    }
    return {
      name: 'British Somaliland Protectorate (Berbera)',
      adminTitle: 'British Protectorate',
      note: 'Protettorato della Corona britannica con capoluogo Berbera, a presidio del Golfo di Aden e delle comunicazioni marittime del Corno d\'Africa con l\'Oceano Indiano.',
    };
  }

  // Kenya
  if (
    nid === 'KE' ||
    nid === 'KEN' ||
    nid === '404' ||
    n.includes('kenya')
  ) {
    return {
      name: 'Kenya Colony and Protectorate (Nairobi & Mombasa)',
      adminTitle: 'British Crown Colony & Protectorate',
      note: 'Colonia della Corona dell\'interno e protettorato della fascia costiera di Mombasa. Snodo logistico primario per la ferrovia dell\'Uganda e base delle forze imperiali (King\'s African Rifles) schierate contro l\'Africa Orientale Italiana.',
    };
  }

  // Uganda
  if (
    nid === 'UG' ||
    nid === 'UGA' ||
    nid === '800' ||
    n.includes('uganda')
  ) {
    return {
      name: 'Uganda Protectorate (Entebbe & Buganda)',
      adminTitle: 'British Protectorate',
      note: 'Protettorato britannico attorno al Lago Vittoria con capitale a Entebbe, imperniato sull\'accordo del 1900 con il Regno tradizionale del Buganda (Kabaka Daudi Cwa II / Mutesa II) e fornitore di cotone.',
    };
  }

  // Tanganica (Tanganyika)
  if (
    nid === 'TZ' ||
    nid === 'TZA' ||
    nid === '834' ||
    n.includes('tanganyika') ||
    n.includes('tanganica') ||
    n.includes('tanzania')
  ) {
    return {
      name: 'Tanganyika Territory (League of Nations Mandate — Dar es Salaam)',
      adminTitle: 'League of Nations Class B Mandate',
      note: 'Ex-Africa Orientale Tedesca (Deutsch-Ostafrika) affidata al Regno Unito in mandato di Classe B nel 1919 (capitale Dar es Salaam). Maggior produttore mondiale di sisal, strategico per il cordame e l\'approvvigionamento navale alleato.',
    };
  }

  // Zanzibar
  if (n.includes('zanzibar')) {
    return {
      name: 'Sultanate of Zanzibar (British Protectorate — Stone Town)',
      adminTitle: 'British Protected State (Al-Busaid Dynasty)',
      note: 'Sultanato islamico protetto retto dal Sultano Khalifa bin Harub, perno storico del commercio di spezie (chiodi di garofano) e scalo marittimo dell\'Oceano Indiano occidentale.',
    };
  }

  // Nyasaland (Malawi)
  if (
    nid === 'MW' ||
    nid === 'MWI' ||
    nid === '454' ||
    n.includes('nyasaland') ||
    n.includes('nyassa') ||
    n.includes('malawi')
  ) {
    return {
      name: 'Nyasaland Protectorate (Zomba)',
      adminTitle: 'British Protectorate',
      note: 'Protettorato britannico esteso lungo la sponda occidentale del Lago Nyasa con capitale Zomba, fornitore di manodopera specializzata per l\'Africa australe e battaglioni d\'élite dei King\'s African Rifles.',
    };
  }

  // Rhodesia Settentrionale (Northern Rhodesia / Zambia)
  if (
    nid === 'ZM' ||
    nid === 'ZMB' ||
    nid === '894' ||
    n.includes('northern_rhodesia') ||
    n.includes('rhodesia_settentrionale') ||
    n.includes('zambia')
  ) {
    return {
      name: 'Northern Rhodesia (Crown Colony — Lusaka)',
      adminTitle: 'British Crown Colony',
      note: 'Colonia della Corona britannica dal 1924 con capitale trasferita a Lusaka nel 1935. Il suo ricchissimo bacino minerario del Copperbelt rappresentava la principale riserva di rame dell\'Impero Britannico per le munizioni e l\'industria elettrica.',
    };
  }

  // Rhodesia Meridionale (Southern Rhodesia / Zimbabwe)
  if (
    nid === 'ZW' ||
    nid === 'ZWE' ||
    nid === '716' ||
    n.includes('southern_rhodesia') ||
    n.includes('rhodesia_meridionale') ||
    n.includes('zimbabwe') ||
    (n.includes('rhodesia') && !n.includes('rhodes '))
  ) {
    return {
      name: 'Southern Rhodesia (Self-Governing Colony — Salisbury)',
      adminTitle: 'British Self-Governing Colony',
      note: 'Colonia dotata di autogoverno responsabile dal 1923 per i coloni bianchi guidati dal Primo Ministro Sir Godfrey Huggins. Schierò rapidamente squadroni aerei e truppe terrestri nei teatri d\'operazione in Nord Africa e nel Corno d\'Africa.',
    };
  }

  // Bechuanaland (Botswana)
  if (
    nid === 'BW' ||
    nid === 'BWA' ||
    nid === '072' ||
    n.includes('bechuanaland') ||
    n.includes('botswana')
  ) {
    return {
      name: 'Bechuanaland Protectorate (Mafeking)',
      adminTitle: 'High Commission Territory (British Protectorate)',
      note: 'Vasto protettorato semidesertico del Kalahari amministrato dall\'Alto Commissario britannico in Sudafrica, con capitale amministrativa situata esternamente a Mafeking (nella Provincia del Capo).',
    };
  }

  // Basutoland (Lesotho)
  if (
    nid === 'LS' ||
    nid === 'LSO' ||
    nid === '426' ||
    n.includes('basutoland') ||
    n.includes('lesotho')
  ) {
    return {
      name: 'Basutoland (Crown Colony — Maseru)',
      adminTitle: 'High Commission Territory (Crown Colony)',
      note: 'Colonia montuosa della Corona completamente circondata dal territorio sudafricano, governata da un Commissario Residente britannico a Maseru e dall\'autorità tradizionale del Paramount Chief dei Basotho.',
    };
  }

  // Swaziland (Eswatini)
  if (
    nid === 'SZ' ||
    nid === 'SWZ' ||
    nid === '748' ||
    n.includes('swaziland') ||
    n.includes('eswatini')
  ) {
    return {
      name: 'Swaziland Protectorate (Mbabane)',
      adminTitle: 'High Commission Territory (British Protectorate)',
      note: 'Protettorato dell\'Alto Commissariato britannico retto dal giovane Re (Ngwenyama) Sobhuza II, incastonato tra il Transvaal sudafricano e il Mozambico portoghese.',
    };
  }

  // 6. Africa Occidentale & Isole Atlantiche
  // Nigeria
  if (
    nid === 'NG' ||
    nid === 'NGA' ||
    nid === '566' ||
    n.includes('nigeria')
  ) {
    return {
      name: 'Colony and Protectorate of Nigeria (Lagos)',
      adminTitle: 'British Crown Colony & Protectorate',
      note: 'Il territorio coloniale più esteso e popoloso della Gran Bretagna in Africa, unificato nel 1914 sotto Sir Frederick Lugard con il modello dell\'Indirect Rule. Fornitore primario di stagno (altopiano di Jos), gomma, carbone e olio di palma; base operativa della Royal West African Frontier Force (RWAFF).',
    };
  }

  // Costa d'Oro & Togoland Britannico (Gold Coast / Ghana)
  if (
    nid === 'GH' ||
    nid === 'GHA' ||
    nid === '288' ||
    n.includes('gold_coast') ||
    n.includes('costa_d_oro') ||
    n.includes('ghana')
  ) {
    return {
      name: 'Gold Coast & British Togoland (Accra)',
      adminTitle: 'British Crown Colony & League of Nations Mandate',
      note: 'Colonia della Corona e mandato del Togoland occidentale con capitale Accra. Leader mondiale nell\'esportazione di cacao, dotata di ricche miniere d\'oro (Ashanti) e di bauxite vitale per la produzione d\'alluminio della RAF.',
    };
  }

  // Sierra Leone
  if (
    nid === 'SL' ||
    nid === 'SLE' ||
    nid === '694' ||
    n.includes('sierra_leone')
  ) {
    return {
      name: 'Sierra Leone Colony and Protectorate (Freetown)',
      adminTitle: 'British Crown Colony & Protectorate',
      note: 'Il magnifico porto naturale di Freetown fungeva da fulcro strategico supremo per il raduno e la scorta dei convogli atlantici alleati (rotte Sierra Leone - Regno Unito), oltre a estrarre diamanti e ferro (Marampa).',
    };
  }

  // Gambia
  if (
    nid === 'GM' ||
    nid === 'GMB' ||
    nid === '270' ||
    n.includes('gambia')
  ) {
    return {
      name: 'Gambia Colony and Protectorate (Bathurst)',
      adminTitle: 'British Crown Colony & Protectorate',
      note: 'Stretta enclave fluviale lungo il fiume Gambia e più antica colonia britannica in Africa (capitale Bathurst, odierna Banjul), impiegata per il pattugliamento aereo anti-sommergibile nell\'Atlantico.',
    };
  }

  // Camerun Britannico (British Cameroons)
  if (
    n.includes('british_cameroon') ||
    n.includes('camerun_britannico') ||
    n.includes('cameroons')
  ) {
    return {
      name: 'British Cameroons (Northern & Southern Cameroons — Mandate)',
      adminTitle: 'League of Nations Class B Mandate',
      note: 'Mandato di Classe B della Società delle Nazioni confinante con la Nigeria orientale, amministrato congiuntamente dalle autorità britanniche di Lagos.',
    };
  }

  // Sant'Elena, Ascensione e Tristan da Cunha
  if (
    nid === 'SH' ||
    nid === 'SHN' ||
    nid === '654' ||
    n.includes('saint_helena') ||
    n.includes('sant_elena') ||
    n.includes('ascension') ||
    n.includes('tristan_da_cunha')
  ) {
    return {
      name: 'Saint Helena, Ascension and Tristan da Cunha (Jamestown)',
      adminTitle: 'British Crown Colony',
      note: 'Colonia della Corona isolata nell\'Atlantico meridionale. Stazione per cavi telegrafici sottomarini e base aerea di rifornimento strategico (Ascension Island divenne scalo di transito aeronavale transatlantico primario).',
    };
  }

  // 7. Americhe, Caraibi & Atlantico Occidentale
  // Jamaica
  if (
    nid === 'JM' ||
    nid === 'JAM' ||
    nid === '388' ||
    n.includes('jamaica') ||
    n.includes('giamaica')
  ) {
    return {
      name: 'Jamaica & Dependencies (Crown Colony — Kingston)',
      adminTitle: 'British Crown Colony',
      note: 'Colonia della Corona britannica dal 1655 con giurisdizione sulle Cayman e Turks e Caicos. Produttrice di zucchero e banane, centro navale di sorveglianza per l\'accesso al Canale di Panama.',
    };
  }

  // Trinidad and Tobago
  if (
    nid === 'TT' ||
    nid === 'TTO' ||
    nid === '780' ||
    n.includes('trinidad') ||
    n.includes('tobago')
  ) {
    return {
      name: 'Trinidad and Tobago (Crown Colony — Port of Spain)',
      adminTitle: 'British Crown Colony',
      note: 'Colonia della Corona e maggior polo petrolifero dell\'Impero Britannico nell\'emisfero occidentale (giacimenti e raffinerie a Pointe-à-Pierre per benzina avio). Nel 1940 ospitò nuove basi navali e aeree statunitensi con l\'accordo Destroyers for Bases.',
    };
  }

  // Guiana Britannica (British Guiana)
  if (
    nid === 'GY' ||
    nid === 'GUY' ||
    nid === '328' ||
    n.includes('british_guiana') ||
    n.includes('guiana_britannica') ||
    (n.includes('guyana') && !n.includes('french') && !n.includes('dutch'))
  ) {
    return {
      name: 'British Guiana (Crown Colony — Georgetown)',
      adminTitle: 'British Crown Colony',
      note: 'Unica colonia britannica nel Sudamerica continentale, confinante con Venezuela e Brasile. Produttrice di bauxite di eccellente qualità chimica (Mackenzie) indispensabile per la fusione dell\'alluminio per gli aerei alleati.',
    };
  }

  // Honduras Britannico (British Honduras / Belize)
  if (
    nid === 'BZ' ||
    nid === 'BLZ' ||
    nid === '084' ||
    n.includes('british_honduras') ||
    n.includes('honduras_britannico') ||
    n.includes('belize')
  ) {
    return {
      name: 'British Honduras (Crown Colony — Belize City)',
      adminTitle: 'British Crown Colony',
      note: 'Colonia della Corona sulla costa caraibica dell\'America Centrale, produttrice di legname (mogano) e chicle; al centro di una secolare disputa confinaria con il Guatemala.',
    };
  }

  // Bahamas
  if (
    nid === 'BS' ||
    nid === 'BHS' ||
    nid === '044' ||
    n.includes('bahamas')
  ) {
    return {
      name: 'Bahamas (Crown Colony — Nassau)',
      adminTitle: 'British Crown Colony',
      note: 'Arcipelago atlantico e colonia della Corona britannica; nel 1940 il Duca di Windsor (l\'ex Re Edoardo VIII) vi fu assegnato come Governatore per ragioni di sicurezza e propaganda durante il conflitto.',
    };
  }

  // Bermuda
  if (
    nid === 'BM' ||
    nid === 'BMU' ||
    nid === '060' ||
    n.includes('bermuda')
  ) {
    return {
      name: 'Bermuda (Somer Isles — Crown Colony — Hamilton)',
      adminTitle: 'British Crown Colony',
      note: 'Colonia della Corona e base navale storica dell\'America and West Indies Station della Royal Navy. Centro imperiale di intelligence e censura postale transatlantica (Imperial Censorship a Hamilton).',
    };
  }

  // Barbados
  if (
    nid === 'BB' ||
    nid === 'BRB' ||
    nid === '052' ||
    n.includes('barbados')
  ) {
    return {
      name: 'Barbados (Crown Colony — Bridgetown)',
      adminTitle: 'British Crown Colony',
      note: 'Colonia della Corona nelle Piccole Antille con uno dei parlamenti più antichi dell\'Impero (House of Assembly fondata nel 1639), produttrice di canna da zucchero e rum.',
    };
  }

  // Isole Cayman (Cayman Islands)
  if (
    nid === 'KY' ||
    nid === 'CYM' ||
    nid === '136' ||
    n.includes('cayman')
  ) {
    return {
      name: 'Cayman Islands (Dependency of Jamaica — George Town)',
      adminTitle: 'British Crown Colony (Jamaica Dependency)',
      note: 'Gruppo di isole caraibiche amministrate come dipendenza della colonia della Corona della Giamaica.',
    };
  }

  // Turks e Caicos (Turks and Caicos Islands)
  if (
    nid === 'TC' ||
    nid === 'TCA' ||
    nid === '796' ||
    n.includes('turks') ||
    n.includes('caicos')
  ) {
    return {
      name: 'Turks and Caicos Islands (Grand Turk)',
      adminTitle: 'British Crown Colony (Jamaica Dependency)',
      note: 'Arcipelago caraibico amministrato dal Governatore della Giamaica attraverso un Commissario residente a Grand Turk, celebre per le saline marine.',
    };
  }

  // Leeward Islands (Isole Sottovento Britanniche)
  if (
    nid === 'AG' || nid === 'ATG' || nid === '028' || n.includes('antigua') || n.includes('barbuda')
  ) {
    return {
      name: 'Antigua and Barbuda (Leeward Islands Colony — St. John\'s)',
      adminTitle: 'Federal Colony of the Leeward Islands',
      note: 'Sede del Governatore della colonia federale delle Isole Sottovento britanniche (Leeward Islands).',
    };
  }

  if (
    nid === 'KN' || nid === 'KNA' || nid === '659' || n.includes('kitts') || n.includes('nevis') || n.includes('christopher')
  ) {
    return {
      name: 'Saint Christopher and Nevis (Leeward Islands — Basseterre)',
      adminTitle: 'Federal Colony of the Leeward Islands',
      note: 'Presidenza insulare della colonia federale delle Isole Sottovento britanniche, grande centro di produzione di canna da zucchero.',
    };
  }

  if (
    nid === 'MS' || nid === 'MSR' || nid === '500' || n.includes('montserrat')
  ) {
    return {
      name: 'Montserrat (Leeward Islands Colony — Plymouth)',
      adminTitle: 'Federal Colony of the Leeward Islands',
      note: 'Presidenza insulare della colonia federale delle Isole Sottovento britanniche (capitale Plymouth).',
    };
  }

  if (
    nid === 'AI' || nid === 'AIA' || nid === '660' || n.includes('anguilla')
  ) {
    return {
      name: 'Anguilla (Leeward Islands Colony — The Valley)',
      adminTitle: 'Federal Colony of the Leeward Islands',
      note: 'Territorio insulare collegato all\'amministrazione di Saint Kitts nelle Isole Sottovento britanniche.',
    };
  }

  if (
    nid === 'VG' || nid === 'VGB' || nid === '092' || n.includes('virgin_islands') || n.includes('vergini_britanniche')
  ) {
    return {
      name: 'British Virgin Islands (Road Town)',
      adminTitle: 'Federal Colony of the Leeward Islands',
      note: 'Arcipelago insulare britannico delle Isole Vergini con capoluogo a Road Town (Tortola).',
    };
  }

  // Windward Islands (Isole Sopravvento Britanniche)
  if (
    nid === 'DM' || nid === 'DMA' || nid === '212' || n.includes('dominica')
  ) {
    return {
      name: 'Dominica (Windward Islands Colony — Roseau)',
      adminTitle: 'Colony of the Windward Islands',
      note: 'Isola delle Piccole Antille trasferita nel 1940 dalle Isole Sottovento alla federazione delle Isole Sopravvento britanniche (capitale Roseau).',
    };
  }

  if (
    nid === 'LC' || nid === 'LCA' || nid === '662' || n.includes('lucia')
  ) {
    return {
      name: 'Saint Lucia (Windward Islands Colony — Castries)',
      adminTitle: 'Colony of the Windward Islands',
      note: 'Colonia delle Isole Sopravvento con il porto naturale fortificato di Castries, base di rifornimento navale strategica per la Royal Navy.',
    };
  }

  if (
    nid === 'VC' || nid === 'VCT' || nid === '670' || n.includes('vincent') || n.includes('grenadines')
  ) {
    return {
      name: 'Saint Vincent and the Grenadines (Kingstown)',
      adminTitle: 'Colony of the Windward Islands',
      note: 'Colonia delle Isole Sopravvento britanniche con capoluogo Kingstown, produttrice di fecola di maranta (arrowroot) e cotone Sea Island.',
    };
  }

  if (
    nid === 'GD' || nid === 'GRD' || nid === '308' || n.includes('grenada')
  ) {
    return {
      name: 'Grenada (Windward Islands Colony — St. George\'s)',
      adminTitle: 'Colony of the Windward Islands',
      note: 'Sede del Governatore delle Isole Sopravvento britanniche (St. George\'s), nota come "l\'Isola delle Spezie" per la massiccia esportazione di noce moscata.',
    };
  }

  // Falkland (Isole Falkland / Malvinas)
  if (
    nid === 'FK' ||
    nid === 'FLK' ||
    nid === '238' ||
    n.includes('falkland') ||
    n.includes('malvinas')
  ) {
    return {
      name: 'Falkland Islands and Dependencies (Port Stanley)',
      adminTitle: 'British Crown Colony',
      note: 'Colonia della Corona e base navale di controllo del passaggio di Capo Horn e dell\'Antartide. Stazione di supporto cruciale per la Royal Navy durante la battaglia di Rio de la Plata nel dicembre 1939.',
    };
  }

  // 8. Oceania & Pacifico
  // Papua & Nuova Guinea
  if (
    nid === 'PG' ||
    nid === 'PNG' ||
    nid === '598' ||
    n.includes('papua') ||
    (n.includes('new_guinea') && !n.includes('dutch')) ||
    (n.includes('nuova_guinea') && !n.includes('olandese'))
  ) {
    return {
      name: 'Territory of Papua and New Guinea (Port Moresby)',
      adminTitle: 'Australian External Territory & League of Nations Mandate',
      note: 'Territorio esterno australiano (Papua britannica al sud) e mandato di Classe C della Società delle Nazioni per l\'ex-Nuova Guinea Tedesca (a nord e isole dell\'arcipelago di Bismarck).',
    };
  }

  // Isole Salomone Britanniche (Solomon Islands)
  if (
    nid === 'SB' ||
    nid === 'SLB' ||
    nid === '090' ||
    n.includes('solomon') ||
    n.includes('salomone')
  ) {
    return {
      name: 'British Solomon Islands Protectorate (Tulagi)',
      adminTitle: 'British Protectorate (Western Pacific High Commission)',
      note: 'Protettorato britannico in Melanesia con capitale Tulagi, amministrato sotto la giurisdizione della Western Pacific High Commission.',
    };
  }

  // Fiji
  if (
    nid === 'FJ' ||
    nid === 'FJI' ||
    nid === '242' ||
    n.includes('fiji') ||
    n.includes('figi')
  ) {
    return {
      name: 'Colony of Fiji (Crown Colony — Suva)',
      adminTitle: 'British Crown Colony',
      note: 'Colonia della Corona britannica dal 1874 con capoluogo Suva, sede del Governatore e Alto Commissario per il Pacifico Occidentale. Snodo centrale delle comunicazioni marittime del Pacifico meridionale.',
    };
  }

  // Gilbert ed Ellice
  if (
    nid === 'KI' ||
    nid === 'KIR' ||
    nid === '296' ||
    nid === 'TV' ||
    nid === 'TUV' ||
    nid === '798' ||
    n.includes('gilbert') ||
    n.includes('ellice')
  ) {
    return {
      name: 'Gilbert and Ellice Islands Colony (Tarawa / Ocean Island)',
      adminTitle: 'British Crown Colony',
      note: 'Colonia della Corona comprendente gli arcipelaghi Gilbert (Kiribati) ed Ellice (Tuvalu) e l\'isola di Banaba (Ocean Island), celebre per le miniere di fosfati.',
    };
  }

  // Tonga
  if (
    nid === 'TO' ||
    nid === 'TON' ||
    nid === '776' ||
    n.includes('tonga')
  ) {
    return {
      name: 'Kingdom of Tonga (British Protected State — Nuku\'alofa)',
      adminTitle: 'British Protected State (Tupou Dynasty)',
      note: 'Regno polinesiano sovrano retto dalla Regina Salote Tupou III, legato alla Gran Bretagna da un trattato di amicizia e protezione del 1900 che manteneva la piena autonomia di autogoverno.',
    };
  }

  // Nuove Ebridi (Condominio Franco-Britannico)
  if (
    nid === 'VU' ||
    nid === 'VUT' ||
    nid === '548' ||
    n.includes('hebrides') ||
    n.includes('ebridi') ||
    n.includes('vanuatu')
  ) {
    return {
      name: 'Nouvelles-Hébrides / New Hebrides (Anglo-French Condominium — Port Vila)',
      adminTitle: 'Anglo-French Condominium',
      note: 'Condominio paritario franco-britannico istituito nel 1906 con doppia amministrazione a Port Vila. Nel luglio 1940 divenne il primo territorio francese del Pacifico a dichiararsi leale alla Francia Libera del generale de Gaulle.',
    };
  }

  // Samoa Occidentali (Western Samoa / Mandato NZL)
  if (
    nid === 'WS' ||
    nid === 'WSM' ||
    nid === '882' ||
    n.includes('samoa')
  ) {
    return {
      name: 'Western Samoa (New Zealand League of Nations Mandate — Apia)',
      adminTitle: 'League of Nations Mandate (Dominion of New Zealand)',
      note: 'Ex-Samoa Tedesca affidata in mandato di Classe C della Società delle Nazioni alla Nuova Zelanda nel 1920 con capitale Apia.',
    };
  }

  // Niue
  if (
    nid === 'NU' ||
    nid === 'NIU' ||
    nid === '570' ||
    n.includes('niue')
  ) {
    return {
      name: 'Niue (Territory of the Dominion of New Zealand — Alofi)',
      adminTitle: 'Territory of New Zealand',
      note: 'Territorio insulare polinesiano amministrato dal Dominion della Nuova Zelanda dal 1901.',
    };
  }

  // 9. Isole d'altura e avamposti delle Isole Britanniche (British Isles Islands)
  if (n.includes('british_isles_islands')) {
    return {
      name: 'British Isles Offshore Islands (Orkney, Shetland & Hebrides)',
      adminTitle: 'Territory of the United Kingdom (Naval & Coastal Outposts)',
      note: 'Isole d\'altura e arcipelaghi costieri britannici (Orcadi con la grande base navale di Scapa Flow, Shetland per il pattugliamento navale del Mare del Nord e le Isole Ebridi).',
    };
  }

  return null;
}

export function resolveUKToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;

  // 1. Dipendenze della Corona & Fortezze d'Oltremare Chokepoint
  if (
    id.startsWith('IM') ||
    normKey.includes('isle_of_man') ||
    normKey.includes('mann') ||
    normKey.includes('isola_di_man') ||
    normKey.includes('douglas')
  ) {
    return {
      name: 'Isle of Man (Douglas)',
      adminTitle: 'Crown Dependency of the Isle of Man',
      note: 'Dipendenza autonoma della Corona Britannica nel Mare d\'Irlanda, non soggetta alla coscrizione militare ma sede di centri radar e campi d\'internamento per cittadini nemici (Knockaloe, Mooragh).',
    };
  }

  if (
    id.startsWith('GG') ||
    id.startsWith('JE') ||
    (normKey.includes('jersey') && !normKey.includes('new_jersey')) ||
    normKey.includes('guernsey') ||
    normKey.includes('channel_islands') ||
    normKey.includes('isole_del_canale')
  ) {
    const isJersey = normKey.includes('jersey') || id.startsWith('JE');
    const isOccupied = step >= 6;
    if (isOccupied && owner === 'GER') {
      return {
        name: isJersey ? 'Jersey (Deutsche Besetzung)' : 'Guernsey (Deutsche Besetzung)',
        adminTitle: 'Befehlshaber der Kanalinseln (Festung Kanalinseln)',
        note: 'Isole della Manica occupate dalla Wehrmacht (giugno-luglio 1940) a seguito della smilitarizzazione britannica; unico territorio della Corona sotto occupazione tedesca, fortificato massicciamente dall\'Organizzazione Todt.',
      };
    }
    return {
      name: isJersey ? 'Bailiwick of Jersey (Saint Helier)' : 'Bailiwick of Guernsey (Saint Peter Port)',
      adminTitle: isOccupied
        ? 'Crown Dependency of the Channel Islands (German Occupation)'
        : 'Crown Dependency of the Channel Islands',
      note: 'Isole della Manica di pertinenza della Corona Britannica, smilitarizzate dal gabinetto Churchill nel giugno 1940 e successivamente occupate dalle forze tedesche.',
    };
  }

  if (id === 'GIB' || normKey === 'gibraltar' || normKey === 'gibilterra') {
    return {
      name: 'Gibraltar (The Rock)',
      adminTitle: 'Fortress & Naval Base of Gibraltar (Force H)',
      note: 'Baluardo strategico imperiale all\'imbocco del Mediterraneo e base operativa della Force H (Ammiraglio Sir James Somerville). Nodo insostituibile di controllo dello stretto e delle rotte atlantiche verso Suez.',
    };
  }

  if (id.startsWith('MT') || normKey.includes('malta') || normKey.includes('valletta')) {
    return {
      name: 'Malta (Valletta Grand Harbour)',
      adminTitle: 'Crown Colony of Malta (Mediterranean Fortress)',
      note: 'Isola fortezza e base avanzata della Mediterranean Fleet nel Canale di Sicilia, cardine per le operazioni di contrasto e siluramento dei convogli italo-tedeschi diretti in Libia.',
    };
  }

  if (id.startsWith('CY') || normKey.includes('cyprus') || normKey.includes('cipro')) {
    return {
      name: 'Cyprus (Nicosia)',
      adminTitle: 'Crown Colony of Cyprus',
      note: 'Colonia della Corona britannica nel bacino orientale del Mediterraneo, base aerea e navale ausiliaria a protezione del Canale di Suez e del mandato di Palestina.',
    };
  }

  // 2. Scozia (UKM)
  if (id.startsWith('UKM')) {
    if (id === 'UKM65' || normKey.includes('orkney') || normKey.includes('scapa_flow')) {
      return {
        name: 'Orkney Islands (Scapa Flow)',
        adminTitle: 'Main Anchorage of the Royal Navy Home Fleet',
        note: 'Rada naturale fortificata e quartier generale della Home Fleet britannica (Amm. Sir Charles Forbes). Teatro dell\'incursione del sommergibile U-47 di Günther Prien nell\'ottobre 1939 (affondamento della corazzata HMS Royal Oak).',
      };
    }
    if (id === 'UKM66' || normKey.includes('shetland')) {
      return {
        name: 'Shetland Islands (Lerwick)',
        adminTitle: 'Northern Patrol & North Sea Naval Station',
        note: 'Avamposto settentrionale della Royal Navy a cavallo tra il Mare del Nord e l\'Atlantico artico per il blocco marittimo delle navi corsare tedesche e corridoio marittimo per la resistenza norvegese (Shetland Bus).',
      };
    }
    if (id.startsWith('UKM75') || normKey.includes('edinburgh') || normKey.includes('edimburgo') || normKey.includes('lothian')) {
      return {
        name: 'Edinburgh & Lothian (Firth of Forth)',
        adminTitle: 'Scottish Capital & Forth Coastal Defenses',
        note: 'Capitale storica della Scozia e fulcro delle difese costiere e contraeree dell\'estuario del Forth a protezione dell\'arsenale navale di Rosyth.',
      };
    }
    if (id.startsWith('UKM72') || normKey.includes('fife') || normKey.includes('rosyth')) {
      return {
        name: 'Fife & Rosyth',
        adminTitle: 'HMNB Rosyth (Firth of Forth Naval Base)',
        note: 'Grande base navale della Royal Navy con bacini di carenaggio per corazzate; teatro del primo scontro aereo sopra i cieli britannici tra caccia Spitfire e bombardieri He 111 della Luftwaffe (16 ottobre 1939).',
      };
    }
    if (
      id.startsWith('UKM82') ||
      id.startsWith('UKM8') ||
      normKey.includes('glasgow') ||
      normKey.includes('clyde') ||
      normKey.includes('renfrew') ||
      normKey.includes('lanarkshire')
    ) {
      return {
        name: 'Glasgow & Clydeside',
        adminTitle: 'Clyde Shipyards & Heavy Industries Hub',
        note: 'Cuore pulsante dell\'industria cantieristica britannica: cantieri navali John Brown & Co. (costruttori dell\'incrociatore da battaglia HMS Hood e dei transatlantici Queen Mary ed Elizabeth) e rifugio profondo per la flotta atlantica.',
      };
    }
    if (id.startsWith('UKM5') || normKey.includes('aberdeen') || normKey.includes('grampian')) {
      return {
        name: 'Aberdeen & Grampian',
        adminTitle: 'North Sea Patrol & Minesweeping Base',
        note: 'Base della pattuglia del Mare del Nord e flottiglie di dragamine ausiliari della Royal Naval Reserve a presidio delle rotte commerciali orientali.',
      };
    }
    if (id.startsWith('UKM6') || normKey.includes('highland') || normKey.includes('inverness')) {
      return {
        name: 'Scottish Highlands (Loch Ewe / Invergordon)',
        adminTitle: 'Highland Anchorage & Training Area',
        note: 'Base navale riparata di Loch Ewe impiegata come ancoraggio alternativo per la Home Fleet e punto di raccolta protetto per i convogli oceanici.',
      };
    }
    return {
      name: `${rawName} (Scotland)`,
      adminTitle: 'Kingdom of Scotland (Scottish Command)',
      note: 'Territorio metropolitano scozzese integrato nel comando militare settentrionale della Corona Britannica.',
    };
  }

  // 3. Irlanda del Nord (UKN)
  if (id.startsWith('UKN')) {
    if (id.startsWith('UKN06') || normKey.includes('belfast') || normKey.includes('antrim')) {
      return {
        name: 'Belfast & County Antrim',
        adminTitle: 'Harland & Wolff Shipyards / Northern Ireland Command',
        note: 'Capitale dell\'Irlanda del Nord fedele alla Corona (a differenza dell\'Éire rimasta neutrale). Sede dei colossali cantieri Harland & Wolff (costruttori dell\'incrociatore HMS Belfast e di portaerei) e delle fabbriche aeronautiche Short Brothers.',
      };
    }
    if (id.startsWith('UKN10') || normKey.includes('derry') || normKey.includes('londonderry')) {
      return {
        name: 'Londonderry (Port of Foyle)',
        adminTitle: 'Western Approaches Advanced Escort Base',
        note: 'Porto fluviale strategico sul Lough Foyle trasformato nella base oceanica più avanzata per le fregate, cacciatorpediniere e corvette di scorta ai convogli della Battaglia dell\'Atlantico.',
      };
    }
    return {
      name: `${rawName} (Northern Ireland)`,
      adminTitle: 'Province of Northern Ireland (United Kingdom)',
      note: 'Baluardo strategico britannico nell\'isola d\'Irlanda a controllo del Canale del Nord e degli accessi marittimi occidentali.',
    };
  }

  // 4. Galles (UKL)
  if (id.startsWith('UKL')) {
    if (
      id.startsWith('UKL22') ||
      normKey.includes('cardiff') ||
      normKey.includes('glamorgan') ||
      normKey.includes('swansea') ||
      normKey.includes('newport')
    ) {
      return {
        name: 'Glamorgan (Cardiff & Swansea)',
        adminTitle: 'South Wales Coalfield & Heavy Metallurgy',
        note: 'Grande bacino carbonifero esportatore di carbone a vapore d\'alta qualità per le caldaie della Royal Navy (Admiralty Coal) e acciaierie pesanti a Port Talbot e Swansea.',
      };
    }
    if (id.startsWith('UKL1') || normKey.includes('gwynedd') || normKey.includes('clwyd') || normKey.includes('anglesey')) {
      return {
        name: 'North Wales (Anglesey & Snowdonia)',
        adminTitle: 'Western Command (Wales Sector)',
        note: 'Polo strategico per l\'estrazione dell\'ardesia, bacini idroelettrici e stazioni di rifugio per i depositi d\'arte nazionali di Londra (Manod Quarry).',
      };
    }
    return {
      name: `${rawName} (Wales)`,
      adminTitle: 'Principality of Wales (Western Command)',
      note: 'Territorio del Principato del Galles pienamente mobilitato nel sistema industriale ed energetico bellico britannico.',
    };
  }

  // 5. Inghilterra - Londra (UKI)
  if (id.startsWith('UKI')) {
    if (id === 'UKI31' || normKey.includes('city_of_london')) {
      return {
        name: 'City of London (The City)',
        adminTitle: 'Financial Heart of the British Empire',
        note: 'Centro finanziario globale e direzionale dell\'Impero: Banca d\'Inghilterra, Lloyd\'s di Londra e Borsa Valori; bersaglio primario dei bombardamenti aerei tedeschi (Blitz).',
      };
    }
    if (id === 'UKI32' || normKey.includes('westminster')) {
      return {
        name: 'Westminster & Whitehall',
        adminTitle: 'Seat of Government & Imperial War Cabinet',
        note: 'Centro del potere imperiale: 10 Downing Street, Palazzo di Westminster e le Cabinet War Rooms sotterranee da cui Winston Churchill e il gabinetto di guerra diressero il conflitto.',
      };
    }
    return {
      name: 'Greater London (Metropolis)',
      adminTitle: 'Capital of the British Empire',
      note: 'Capitale metropolitana dell\'Impero con oltre 8,6 milioni di abitanti; fulcro delle telecomunicazioni, dei comandi interforze e dei collegamenti con il Commonwealth.',
    };
  }

  // 6. Inghilterra - South East (UKJ)
  if (id.startsWith('UKJ')) {
    if (id.startsWith('UKJ4') || normKey.includes('kent') || normKey.includes('dover') || normKey.includes('medway')) {
      return {
        name: 'Kent (Fortress Dover & Canterbury)',
        adminTitle: 'Hellfire Corner / Dover Naval Command',
        note: 'Prima linea difensiva sulla Manica. Il castello di Dover ospitò il quartier generale del Viceammiraglio Ramsay per l\'Operazione Dynamo (evacuazione di Dunkerque, maggio-giugno 1940); epicentro della Battaglia d\'Inghilterra ("Hellfire Corner").',
      };
    }
    if (id.startsWith('UKJ31') || normKey.includes('portsmouth')) {
      return {
        name: 'Portsmouth & South Coast',
        adminTitle: 'HMNB Portsmouth (Major Naval Dockyard)',
        note: 'La storica e più importante base della Royal Navy sul Canale della Manica; arsenale principale per il supporto alla flotta da battaglia e imbarco del British Expeditionary Force (BEF).',
      };
    }
    if (id.startsWith('UKJ32') || normKey.includes('southampton')) {
      return {
        name: 'Southampton & Solent',
        adminTitle: 'Transatlantic Liner Docks & Supermarine Works',
        note: 'Porto principale dei grandi transatlantici e sede degli stabilimenti aeronautici Supermarine a Woolston, dove R.J. Mitchell progettò il leggendario caccia Supermarine Spitfire.',
      };
    }
    if (id.startsWith('UKJ2') || normKey.includes('sussex')) {
      return {
        name: 'Sussex (Brighton & Hastings)',
        adminTitle: 'Fighter Command 11 Group / Chain Home Radar Sector',
        note: 'Settore costiero chiave per l\'avvistamento preventivo delle incursioni della Luftwaffe grazie alla catena radar Chain Home (stazioni di Pevensey, Rye, Beachy Head).',
      };
    }
    if (id.startsWith('UKJ1') || normKey.includes('surrey') || normKey.includes('berkshire') || normKey.includes('buckinghamshire') || normKey.includes('oxford')) {
      return {
        name: `${rawName} (Home Counties)`,
        adminTitle: 'RAF Bomber Command HQ & Aviation Works',
        note: 'Cintura strategica circostante Londra: stabilimenti Brooklands (produzione caccia Hawker Hurricane e bombardieri Vickers Wellington) e comando del Bomber Command a High Wycombe.',
      };
    }
    return {
      name: `${rawName} (South East England)`,
      adminTitle: 'Home Counties & Coastal Defense Sector',
      note: 'Regione chiave per il contenimento aereo e costiero a protezione meridionale di Londra.',
    };
  }

  // 7. Inghilterra - South West (UKK)
  if (id.startsWith('UKK')) {
    if (id.startsWith('UKK41') || normKey.includes('plymouth') || normKey.includes('devonport')) {
      return {
        name: 'Plymouth & Devonport',
        adminTitle: 'HMNB Devonport (Western Approaches Base)',
        note: 'Il più grande arsenale navale d\'Europa occidentale, quartier generale marittimo per le rotte atlantiche e la protezione dei convogli oceanici contro gli U-Boot tedeschi.',
      };
    }
    if (id.startsWith('UKK3') || normKey.includes('cornwall')) {
      return {
        name: 'Cornwall (Falmouth & Truro)',
        adminTitle: 'Western Approaches Atlantic Outpost',
        note: 'Avamposto oceanico all\'estremità sud-occidentale della Gran Bretagna (Land\'s End) con la rada naturale di Falmouth usata come approdo protetto dai convogli atlantici.',
      };
    }
    if (id.startsWith('UKK1') || normKey.includes('bristol') || normKey.includes('bath')) {
      return {
        name: 'Bristol & Avonmouth',
        adminTitle: 'Bristol Aeroplane Company & Western Docks',
        note: 'Grande polo aeronautico britannico (stabilimenti di Filton, produttori dei bombardieri Bristol Blenheim e cacciapesanti Beaufighter) e porto atlantico riparato dai raid.',
      };
    }
    if (id.startsWith('UKK2') || normKey.includes('dorset') || normKey.includes('wiltshire')) {
      return {
        name: 'Dorset & Wiltshire',
        adminTitle: 'Portland Naval Base & Salisbury Plain Garrison',
        note: 'Base navale di Portland e vasta area militare di Salisbury Plain, centro primario per l\'addestramento dei reparti corazzati e dell\'artiglieria della British Army.',
      };
    }
    return {
      name: `${rawName} (South West England)`,
      adminTitle: 'Western Command (South West Sector)',
      note: 'Settore costiero occidentale a controllo degli approcci marittimi dall\'Oceano Atlantico.',
    };
  }

  // 8. Inghilterra - North West (UKD)
  if (id.startsWith('UKD')) {
    if (id.startsWith('UKD7') || normKey.includes('liverpool') || normKey.includes('merseyside') || normKey.includes('birkenhead')) {
      return {
        name: 'Liverpool & Merseyside',
        adminTitle: 'Western Approaches Command Terminal',
        note: 'Terminal vitale di scarico per i convogli transatlantici nord-americani e cantieri navali Cammell Laird a Birkenhead (costruzione della corazzata HMS Prince of Wales e della portaerei Ark Royal).',
      };
    }
    if (id.startsWith('UKD3') || normKey.includes('manchester') || normKey.includes('salford')) {
      return {
        name: 'Greater Manchester & Salford',
        adminTitle: 'Avro Aircraft Works & Trafford Park Industrial Basin',
        note: 'Polo industriale d\'eccellenza: stabilimenti A.V. Roe (Avro Manchester e Lancaster) e Trafford Park, la più vasta area industriale integrata d\'Europa, convertita alla produzione bellica.',
      };
    }
    if (id.startsWith('UKD4') || id.startsWith('UKD1') || normKey.includes('lancashire') || normKey.includes('cumbria') || normKey.includes('barrow')) {
      return {
        name: 'Lancashire & Cumbria (Barrow-in-Furness)',
        adminTitle: 'Vickers-Armstrongs Submarine Works & Naval Artillery',
        note: 'Culla dei cantieri sottomarini Vickers-Armstrongs a Barrow-in-Furness (costruzione della maggioranza dei sommergibili della Royal Navy) e fabbriche aeronautiche English Electric a Preston.',
      };
    }
    return {
      name: `${rawName} (North West England)`,
      adminTitle: 'North Western Maritime & Industrial Belt',
      note: 'Distretto industriale e cantieristico essenziale per la sopravvivenza logistica dell\'Impero.',
    };
  }

  // 9. Inghilterra - West Midlands (UKG)
  if (id.startsWith('UKG')) {
    if (id.startsWith('UKG31') || id.startsWith('UKG32') || normKey.includes('birmingham')) {
      return {
        name: 'Birmingham (West Midlands)',
        adminTitle: 'Industrial Arsenal of the Empire (BSA & Castle Bromwich)',
        note: 'Epicentro della produzione bellica britannica: Birmingham Small Arms (BSA, fucili e mitragliatrici) e colossale fabbrica ombra di Castle Bromwich per la produzione di massa dello Spitfire.',
      };
    }
    if (id.startsWith('UKG33') || normKey.includes('coventry') || normKey.includes('warwickshire')) {
      return {
        name: 'Coventry & Warwickshire',
        adminTitle: 'Aero Engines & Armoured Vehicle Heartland',
        note: 'Distretto ad altissima precisione per motori aeronautici (Armstrong Siddeley), veicoli corazzati e macchine utensili (bersaglio della devastante incursione aerea tedesca del novembre 1940).',
      };
    }
    return {
      name: `${rawName} (West Midlands)`,
      adminTitle: 'Midlands War Production District',
      note: 'Distretto manifatturiero pesante per la meccanica di precisione e gli armamenti leggeri.',
    };
  }

  // 10. Inghilterra - East Midlands (UKF)
  if (id.startsWith('UKF')) {
    if (id.startsWith('UKF11') || normKey.includes('derby') || normKey.includes('derbyshire')) {
      return {
        name: 'Derby & Derbyshire',
        adminTitle: 'Rolls-Royce Aero Engine Headquarters',
        note: 'Sede centrale degli stabilimenti Rolls-Royce a Derby, progettisti e costruttori del celebre motore V12 Rolls-Royce Merlin a 27 litri, equipaggiamento di Spitfire, Hurricane e Lancaster.',
      };
    }
    if (id.startsWith('UKF3') || normKey.includes('lincolnshire')) {
      return {
        name: 'Lincolnshire (Bomber County)',
        adminTitle: 'RAF Bomber Command Airfield Network',
        note: 'La contea dei bombardieri ("Bomber County"): densità record di basi aeree della RAF (Scampton, Waddington, Coningsby) per l\'offensiva strategica notturna contro la Germania.',
      };
    }
    if (id.startsWith('UKF1') || id.startsWith('UKF2') || normKey.includes('nottingham') || normKey.includes('leicester') || normKey.includes('northampton')) {
      return {
        name: `${rawName} (East Midlands)`,
        adminTitle: 'East Midlands Industrial & Ordnance Basin',
        note: 'Distretto integrato per la produzione di calzature militari per le forze armate imperiali, munizionamento pesante della Royal Ordnance Factory e miniere di carbone.',
      };
    }
    return {
      name: `${rawName} (East Midlands)`,
      adminTitle: 'East Midlands Industrial & Airfield Belt',
      note: 'Zona cardine per la produzione industriale di supporto e basi aeree della RAF.',
    };
  }

  // 11. Inghilterra - Yorkshire and the Humber (UKE)
  if (id.startsWith('UKE')) {
    if (id.startsWith('UKE3') || normKey.includes('sheffield')) {
      return {
        name: 'Sheffield & South Yorkshire',
        adminTitle: 'Steel Capital of the Empire & Naval Armor',
        note: 'Capitale mondiale degli acciai speciali: fonderie Hadfields e Firth Brown per la fabbricazione di piastre di corazzatura per navi da guerra e proiettili perforanti per la Royal Navy.',
      };
    }
    if (id.startsWith('UKE1') || normKey.includes('hull') || normKey.includes('humber')) {
      return {
        name: 'Kingston upon Hull & Humber',
        adminTitle: 'Humber Port & North Sea Escort Station',
        note: 'Terzo porto britannico, snodo cruciale per l\'importazione di legname e grano e base per le flottiglie di dragamine e torpediniere costiere nel Mare del Nord.',
      };
    }
    if (id.startsWith('UKE4') || normKey.includes('leeds') || normKey.includes('bradford')) {
      return {
        name: 'Leeds & Bradford (West Yorkshire)',
        adminTitle: 'Wool Textile Heartland & Heavy Engineering',
        note: 'Fornitore quasi esclusivo di uniformi di lana pettinata per i milioni di soldati del British Army e del Commonwealth britannico, oltre a fabbriche di carri armati e locomotive.',
      };
    }
    if (id.startsWith('UKE2') || normKey.includes('york') || normKey.includes('catterick')) {
      return {
        name: 'North Yorkshire (Catterick Garrison)',
        adminTitle: 'Northern Military Training Depot & Airfields',
        note: 'Catterick Garrison: il più esteso centro di addestramento militare permanente del Regno Unito, con le basi aeree settentrionali del Fighter Command.',
      };
    }
    return {
      name: `${rawName} (Yorkshire & Humber)`,
      adminTitle: 'Northern Industrial Belt',
      note: 'Grande bacino industriale metallurgico e tessile per il sostentamento dello sforzo bellico.',
    };
  }

  // 12. Inghilterra - North East (UKC)
  if (id.startsWith('UKC')) {
    if (id.startsWith('UKC2') || normKey.includes('newcastle') || normKey.includes('tyne') || normKey.includes('sunderland')) {
      return {
        name: 'Newcastle upon Tyne & Tyneside',
        adminTitle: 'Swan Hunter & Vickers-Armstrongs Naval Yards',
        note: 'Celeberrimi cantieri navali del Tyne e Wear: costruzione della corazzata HMS King George V e della portaerei Victorious, cannoni pesanti Vickers e vagoni ferroviari blindati.',
      };
    }
    if (id.startsWith('UKC1') || normKey.includes('tees') || normKey.includes('durham') || normKey.includes('middlesbrough')) {
      return {
        name: 'Teesside & County Durham',
        adminTitle: 'Imperial Chemical Industries (ICI) & Heavy Metallurgy',
        note: 'Impianti chimici giganti ICI a Billingham (produzione di ammoniaca sintetica, esplosivi e carburante sintetico) e acciaierie Dorman Long.',
      };
    }
    return {
      name: `${rawName} (North East England)`,
      adminTitle: 'Heavy Industry & Shipbuilding Belt',
      note: 'Distretto minerario e cantieristico navale del nord-est inglese.',
    };
  }

  // 13. Inghilterra - East of England (UKH)
  if (id.startsWith('UKH')) {
    if (normKey.includes('suffolk') || normKey.includes('bawdsey') || normKey.includes('norfolk')) {
      return {
        name: `${rawName} (East Anglia)`,
        adminTitle: 'Chain Home Radar Pioneer & RAF Airfields',
        note: 'Sede di Bawdsey Manor (Suffolk), dove Sir Robert Watson-Watt sviluppò il primo sistema radar operativo al mondo; costellata da decine di aeroporti per i caccia del Gruppo 12 della RAF.',
      };
    }
    if (normKey.includes('cambridge') || normKey.includes('bedford') || normKey.includes('hertford') || normKey.includes('essex') || normKey.includes('harwich')) {
      return {
        name: `${rawName} (East of England)`,
        adminTitle: 'Eastern Defense & Naval Harwich Sector',
        note: 'Base navale di Harwich a protezione dei convogli costieri del Mare del Nord e laboratori scientifici universitari convertiti alla ricerca bellica.',
      };
    }
    return {
      name: `${rawName} (East of England)`,
      adminTitle: 'RAF Airfields & Eastern Coastal Defenses',
      note: 'Regione pianeggiante ideale per gli aeroporti della RAF e sbarramenti costieri anti-invasione.',
    };
  }

  // Check if non-homeland or overseas colonial territory of the Empire
  const colonial = resolveBritishColonialToponym(id, rawName, normKey, owner, yearStep);
  if (colonial) return colonial;

  // Fallback se id è generico o appartenente a UK metropolitano
  if (owner === 'UK' || id.startsWith('UK')) {
    return {
      name: `${rawName} (United Kingdom)`,
      adminTitle: 'Metropolitan Division of the United Kingdom',
      note: 'Divisione amministrativa metropolitana del Regno Unito di Gran Bretagna e Irlanda del Nord.',
    };
  }

  return null;
}

export function resolveUSSRToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;

  // 0. I powiats dei Kresy Wschodnie (PL_KRESY_) sono gestiti dal loro handler dedicato ad altissima fedeltà
  if (id.startsWith('PL_KRESY_')) {
    return null;
  }

  // 1. Mosca e Centro RSFSR
  if (normKey.includes('moscow') || normKey.includes('moskva') || normKey.includes('moscow_city') || normKey === 'ru_mow') {
    return {
      name: 'Moskva (Kreml)',
      adminTitle: 'Stolitsa SSSR i RSFSR (Moskovskaya oblast)',
      note:
        step >= 8
          ? 'Centro nevralgico del potere sovietico e sede del Cremlino. Il 13 aprile 1941 vi viene firmato il Patto quinquennale di neutralità sovietico-giapponese (Molotov-Matsuoka) alla presenza di Iosif Stalin, che mette in sicurezza il confine siberiano-mancese alla vigilia dell\'attacco tedesco; immenso distretto per la produzione bellica (fabbriche ZiS, MiG e Yak).'
          : 'Centro nevralgico del potere sovietico, sede del Cremlino, del Consiglio dei Commissari del Popolo (Sovnarkom) e del Segretario Generale del PCUS(b) Iosif Stalin; immenso distretto per la produzione bellica (fabbriche automobilistiche ZiS, aeronautiche MiG e Yak).',
    };
  }
  if (normKey.includes('tula')) {
    return {
      name: 'Tula (Arsenal)',
      adminTitle: 'Tulskaya oblast (RSFSR)',
      note: 'Storica capitale delle armi da fuoco e munizioni della Russia (Fabbrica d\'Armi di Tula, fucili Mosin-Nagant, pistole Tokarev TT-33 e mitragliatrici Maxim).',
    };
  }
  if (normKey.includes('kalinin') || normKey.includes('tver')) {
    return {
      name: 'Kalinin (Tver)',
      adminTitle: 'Kalininskaya oblast (RSFSR)',
      note: 'Città ribattezzata nel 1931 in onore del capo formale dello Stato sovietico Michail Kalinin; nodo industriale e ferroviario strategico sulla direttrice Mosca-Leningrado.',
    };
  }
  if (normKey.includes('smolensk')) {
    return {
      name: 'Smolensk (Dnepr)',
      adminTitle: 'Smolenskaya oblast (RSFSR)',
      note: 'Storico bastione a guardia della direttrice d\'accesso occidentale a Mosca attraverso il varco tra la Dvina e il Dnepr; sede del Distretto Militare Bielorusso.',
    };
  }
  if (normKey.includes('voronezh')) {
    return {
      name: 'Voronezh',
      adminTitle: 'Voronezhskaya oblast (RSFSR)',
      note: 'Polo centrale dell\'industria aeronautica sovietica (Fabbrica Statale No. 18, culla del velivolo corazzato d\'attacco al suolo Ilyushin Il-2 Šturmovik) e motoristica.',
    };
  }
  if (normKey.includes('kursk') || normKey.includes('orel')) {
    return {
      name: 'Kursk & Orel',
      adminTitle: 'Kurskaya oblast (RSFSR)',
      note: 'Epicentro dell\'Anomalia Magnetica di Kursk (KMA), il più vasto bacino di minerale di ferro del pianeta, e snodo ferroviario nevralgico delle "Terre Nere".',
    };
  }
  if (normKey.includes('yaroslavl')) {
    return {
      name: 'Yaroslavl',
      adminTitle: 'Yaroslavskaya oblast (RSFSR)',
      note: 'Polo dell\'industria pesante automobilistica (autocarri YaAZ), gomma sintetica e raffinerie sul Volga.',
    };
  }
  if (normKey.includes('ivanovo')) {
    return {
      name: 'Ivanovo',
      adminTitle: 'Ivanovskaya oblast (RSFSR)',
      note: 'La capitale tessile della Russia sovietica, fornitrice primaria di panni e tessuti per le uniformi di milioni di soldati dell\'Armata Rossa.',
    };
  }

  // 2. Leningrado, Baltico e Nord Artico
  if (
    normKey.includes('leningrad') ||
    normKey.includes('saint_petersburg') ||
    normKey.includes('peterburg') ||
    normKey.includes('petrograd')
  ) {
    return {
      name: 'Leningrad (Sankt-Peterburg)',
      adminTitle: 'Leningradskaya oblast (Vtoraya Stolitsa SSSR)',
      note: 'Seconda capitale dell\'URSS e culla della Rivoluzione d\'Ottobre; colosso industriale e militare d\'eccellenza: Officine Kirov (carri pesanti KV-1), Cantieri Navali del Baltico e officine ottiche LOMO.',
    };
  }
  if (normKey.includes('kronstadt') || normKey.includes('kronshtadt')) {
    return {
      name: 'Kronshtadt (Kotlin)',
      adminTitle: 'Glavnaya Baza Krasnoznamennogo Baltiyskogo Flota',
      note: 'Fortezza navale insulare sull\'isola di Kotlin a sbarramento della Baia della Neva; quartier generale della Flotta del Baltico decorata con l\'Ordine della Bandiera Rossa.',
    };
  }
  if (normKey.includes('murmansk') || normKey.includes('polyarny') || normKey.includes('polyarnyy') || normKey.includes('kola')) {
    return {
      name: 'Murmansk & Polyarnyy',
      adminTitle: 'Glavnaya Baza Severnogo Flota (Murmanskaya oblast)',
      note: 'Unico porto artico sovietico libero dai ghiacci tutto l\'anno grazie alla Corrente del Golfo; base di comando della Flotta del Nord (istituita nel 1933/1937) e capolinea della ferrovia artica.',
    };
  }
  if (normKey.includes('arkhangelsk') || normKey.includes('archangel')) {
    return {
      name: 'Arkhangelsk (Severnaya Dvina)',
      adminTitle: 'Arkhangelskaya oblast (Severnyy Morskiy Put)',
      note: 'Grande porto fluviale e marittimo sul Mar Bianco, centro dell\'industria forestale e cantieristica e testa di ponte della Rotta Marittima del Nord artica.',
    };
  }
  if (normKey.includes('pskov')) {
    return {
      name: 'Pskov',
      adminTitle: 'Leningradskaya oblast (Pskovskiy UR)',
      note: 'Antica città fortificata al confine con Estonia e Lettonia; pilastro settentrionale del Distretto Fortificato di Pskov lungo la Linea Stalin.',
    };
  }
  if (normKey.includes('novgorod')) {
    return {
      name: 'Novgorod',
      adminTitle: 'Leningradskaya oblast (Novgorodskiy rayon)',
      note: 'Storico centro sul fiume Volkhov e punto di cerniera per le comunicazioni tra Leningrado e Mosca.',
    };
  }

  // 3. Volga e Urali (Cuore dell'Industrializzazione dei Piani Quinquennali)
  if (normKey.includes('stalingrad') || normKey.includes('volgograd') || normKey.includes('tsaritsyn')) {
    return {
      name: 'Stalingrad (Volga)',
      adminTitle: 'Stalingradskaya oblast (RSFSR)',
      note: 'Centro nevralgico della moderna industria pesante sul basso Volga: Fabbrica di Trattori di Stalingrado (STZ, convertita alla produzione di massa del carro T-34), acciaierie Ottobre Rosso e officine d\'artiglieria Barrikady.',
    };
  }
  if (normKey.includes('gorkiy') || normKey.includes('gorky') || normKey.includes('nizhny_novgorod')) {
    return {
      name: 'Gorkiy (Nizhny Novgorod)',
      adminTitle: 'Gorkovskaya oblast (RSFSR)',
      note: 'Intitolata a Maksim Gor\'kij nel 1932; sede del colossale complesso automobilistico GAZ (autocarri, blindati leggeri), cannoni d\'artiglieria ZiS e cantieri navali Krasnoye Sormovo (sommergibili).',
    };
  }
  if (normKey.includes('kuybyshev') || normKey.includes('samara')) {
    return {
      name: 'Kuybyshev (Samara)',
      adminTitle: 'Kuybyshevskaya oblast (RSFSR)',
      note: 'Ribattezzata nel 1935 in onore di Valerian Kujbyšev; snodo nevralgico sull\'ansa del Volga designato come capitale alternativa di evacuazione per il governo sovietico, il corpo diplomatico e le fabbriche aeronautiche.',
    };
  }
  if (normKey.includes('sverdlovsk') || normKey.includes('yekaterinburg')) {
    return {
      name: 'Sverdlovsk (Uralmash)',
      adminTitle: 'Sverdlovskaya oblast (RSFSR)',
      note: 'Capitale industriale degli Urali: colosso metallurgico Uralmash ("la fabbrica delle fabbriche"), fabbricazione di cannoni, scafi corazzati e macchine utensili giganti.',
    };
  }
  if (normKey.includes('chelyabinsk')) {
    return {
      name: 'Chelyabinsk (ChTZ)',
      adminTitle: 'Chelyabinskaya oblast (Kombinat Tankograd)',
      note: 'Sede della Fabbrica di Trattori di Čeljabinsk (ChTZ), polo pilota che nel 1941 diventerà il complesso unificato "Tankograd" per la produzione di carri armati pesanti KV e motori diesel V-2.',
    };
  }
  if (normKey.includes('magnitogorsk')) {
    return {
      name: 'Magnitogorsk (Magnitnaya Gora)',
      adminTitle: 'Magnitogorskiy Metallurgicheskiy Kombinat (MMK)',
      note: 'Il più imponente combinato siderurgico del mondo, edificato alla base della montagna di minerale di ferro puro durante il Primo Piano Quinquennale (1929-1932); fornirà l\'acciaio per la metà dei carri e proiettili sovietici.',
    };
  }
  if (normKey.includes('perm') || normKey.includes('molotov')) {
    return {
      name: 'Molotov (Perm)',
      adminTitle: 'Molotovskaya oblast (RSFSR)',
      note: 'Ribattezzata Molotov nel 1940 in onore del Primo Ministro Vjačeslav Molotov; polo chimico, polverifici e Fabbrica No. 19 per motori aeronautici Švecov M-25/M-62.',
    };
  }
  if (normKey.includes('kazan')) {
    return {
      name: 'Kazan (Tatarskaya ASSR)',
      adminTitle: 'Tatarskaya ASSR (RSFSR)',
      note: 'Capitale della Repubblica Autonoma Tatara; polo aeronautico No. 124 (bombardieri quadrimotori pesanti Pe-8 e bimotori Pe-2) e polverifici statali.',
    };
  }
  if (normKey.includes('ufa') || normKey.includes('bashkir')) {
    return {
      name: 'Ufa (Bashkirskaya ASSR)',
      adminTitle: 'Bashkirskaya ASSR (Vtoroy Baku)',
      note: 'Capitale della Baschiria e cuore dello sviluppo del bacino petrolifero Volga-Urali ("Seconda Baku") avviato negli anni \'30 per affiancare i pozzi caucasici.',
    };
  }
  if (normKey.includes('ulyanovsk') || normKey.includes('simbirsk')) {
    return {
      name: 'Ulyanovsk (Simbirsk)',
      adminTitle: 'Kuybyshevskaya oblast (RSFSR)',
      note: 'Città natale di Vladimir Lenin (Ul\'janov) e snodo industriale e fluviale sul medio Volga.',
    };
  }

  // 4. RSS Ucraina (Ukrainskaya SSR)
  if (normKey.includes('kiev') || normKey.includes('kyiv')) {
    return {
      name: 'Kiev (Ukrainskaya SSR)',
      adminTitle: 'Stolitsa Ukrainskoy SSR (Kiyevskiy UR)',
      note: 'Capitale della RSS Ucraina dal 1934 (trasferita da Charkiv), centro politico e culturale sul fiume Dnepr e caposaldo del Distretto Fortificato di Kiev (KiUR) lungo la Linea Stalin.',
    };
  }
  if (normKey.includes('kharkov') || normKey.includes('kharkiv')) {
    return {
      name: 'Kharkov (KhPZ Zavod No. 183)',
      adminTitle: 'Kharkovskaya oblast (Ukrainskaya SSR)',
      note: 'Gigantesco centro dell\'ingegneria meccanica sovietica: Fabbrica di Locomotive No. 183 (KhPZ) e bureau KB-24, dove Michail Koškin e Aleksandr Morozov progettarono il leggendario carro armato medio T-34.',
    };
  }
  if (normKey.includes('dnepropetrovsk') || normKey.includes('dnipropetrovsk') || normKey.includes('dnipro')) {
    return {
      name: 'Dnepropetrovsk (DneproGES Basin)',
      adminTitle: 'Dnepropetrovskaya oblast (Ukrainskaya SSR)',
      note: 'Grande polo della metallurgia dell\'acciaio e tubifici speciali, alimentato dall\'energia della colossale centrale idroelettrica DneproGES.',
    };
  }
  if (normKey.includes('zaporizhia') || normKey.includes('zaporozhye')) {
    return {
      name: 'Zaporozhye (DneproGES)',
      adminTitle: 'Zaporozhskaya oblast (Ukrainskaya SSR)',
      note: 'Sede della monumentale diga idroelettrica sul Dnepr (DneproGES), la più grande d\'Europa inaugurata nel 1932, e del combinato di acciai speciali e alluminio Zaporozhstal.',
    };
  }
  if (normKey.includes('donetsk') || normKey.includes('stalino') || normKey.includes('yuzovka')) {
    return {
      name: 'Stalino (Donetsk)',
      adminTitle: 'Stalinskaya oblast (Donbass)',
      note: 'Capitale industriale del bacino carbonifero del Donbass: pozzi di carbone coke ad alto rendimento, acciaierie pesanti e industria chimica di base.',
    };
  }
  if (normKey.includes('luhansk') || normKey.includes('voroshilovgrad') || normKey.includes('lugansk')) {
    return {
      name: 'Voroshilovgrad (Lugansk)',
      adminTitle: 'Voroshilovgradskaya oblast (Donbass)',
      note: 'Ribattezzata nel 1935 in onore del Commissario del Popolo alla Difesa Kliment Vorošilov; sede della monumentale Fabbrica di Locomotive Oktjabr\'skaja Revoljucija.',
    };
  }
  if (normKey.includes('krivoy_rog') || normKey.includes('kryvyi_rih')) {
    return {
      name: 'Krivoy Rog (Kryvbas)',
      adminTitle: 'Dnepropetrovskaya oblast (Krivorozhstal)',
      note: 'Il più ricco bacino ferrifero dell\'URSS; combinato minerario ed estrattivo a cielo aperto integrato con gli altiforni del Donbass.',
    };
  }
  if (normKey.includes('odessa')) {
    return {
      name: 'Odessa (Chernomorskaya Baza)',
      adminTitle: 'Odesskaya oblast (Ukrainskaya SSR)',
      note: 'Porto principale sul Mar Nero per l\'esportazione del grano ucraino e base navale ausiliaria per sommergibili e torpediniere della Flotta del Mar Nero.',
    };
  }
  if (normKey.includes('sevastopol') || normKey.includes('sebastopoli') || normKey.includes('crimea') || normKey.includes('krym')) {
    return {
      name: 'Sevastopol & Krym',
      adminTitle: 'Glavnaya Baza Chernomorskogo Flota (Krymskaya ASSR / RSFSR)',
      note: 'Quartier generale e piazzaforte navale della Flotta del Mar Nero della Marina Sovietica, protetta dalle batterie costiere corazzate Maksim Gor\'kij (Batteria 30 e 35). Territorio della RSFSR fino al 1954.',
    };
  }
  if (normKey.includes('poltava') || normKey.includes('cherkasy') || normKey.includes('sumy') || normKey.includes('chernihiv') || normKey.includes('zhytomyr') || normKey.includes('vinnitsa')) {
    return {
      name: `${rawName} (Ukraina)`,
      adminTitle: 'Ukrainskaya SSR',
      note: 'Granaio della nazione sovietica e corridoio agricolo e ferroviario strategico verso il confine occidentale.',
    };
  }

  // 5. RSS Bielorussa (Belorusskaya SSR)
  if (normKey.includes('minsk')) {
    return {
      name: 'Minsk (Belorusskaya SSR)',
      adminTitle: 'Stolitsa Belorusskoy SSR (Minskiy UR)',
      note: 'Capitale della RSS Bielorussa, quartier generale del Distretto Militare Speciale Occidentale e cardine del Distretto Fortificato di Minsk lungo la Linea Stalin.',
    };
  }
  if (normKey.includes('gomel') || normKey.includes('homel') || normKey.includes('mogilev') || normKey.includes('mahilyow') || normKey.includes('vitebsk') || normKey.includes('vitsebsk')) {
    return {
      name: `${rawName} (Belorussiya)`,
      adminTitle: 'Belorusskaya SSR',
      note: 'Settore orientale della Bielorussia a controllo delle valli del Dnepr e della Sozh sulle direttrici di rifornimento per Mosca.',
    };
  }

  // 6. Territori annessi post-1939 (Polonia Orientale / Kresy, Paesi Baltici, Bessarabia, Carelia)
  if (step >= 5) {
    if (normKey.includes('lviv') || normKey.includes('lwow')) {
      return {
        name: 'Lvov (Lviv)',
        adminTitle: 'Lvovskaya oblast (Ukrainskaya SSR)',
        note: 'Storica capitale della Galizia orientale, annessa all\'URSS a seguito della Campagna di Polonia del settembre 1939 e integrata nella RSS Ucraina.',
      };
    }
    if (normKey.includes('brest') || normKey.includes('brzesc')) {
      return {
        name: 'Brest (Brest-Litovsk)',
        adminTitle: 'Brestskaya oblast (Belorusskaya SSR)',
        note: 'Sito della celebre Fortezza di Brest e teatro della parata congiunta tedesco-sovietica del 22 settembre 1939 (Gen. Guderian e Krivoshein); caposaldo del Distretto Fortificato sulla Linea Molotov.',
      };
    }
    if (normKey.includes('grodno') || normKey.includes('bialystok') || normKey.includes('belostok')) {
      return {
        name: normKey.includes('bialystok') ? 'Belostok (Bialystok)' : 'Grodno',
        adminTitle: 'Belostokskaya oblast (Belorusskaya SSR)',
        note: 'Provincia industriale tessile e ferroviaria incorporata nella RSS Bielorussa nel 1939 in attuazione del Patto Molotov-Ribbentrop.',
      };
    }
    if (normKey.includes('stanislav') || normKey.includes('ivano_frankivsk') || normKey.includes('ternopol') || normKey.includes('drogobych')) {
      return {
        name: `${rawName} (Zapadnaya Ukraina)`,
        adminTitle: 'Ukrainskaya SSR (Prisoyedineniye 1939)',
        note: 'Territorio dell\'Ucraina occidentale annesso all\'URSS nell\'autunno 1939 con i giacimenti petroliferi di Boryslav e Drohobych.',
      };
    }
  }

  if (step >= 6) {
    if (normKey.includes('tallinn') || normKey.includes('reval') || normKey.includes('estonia') || normKey.includes('eesti')) {
      return {
        name: 'Tallin (Estonskaya SSR)',
        adminTitle: 'Stolitsa Estonskoy SSR (SSSR)',
        note: 'Repubblica Socialista Sovietica Estone costituita nel giugno-luglio 1940 a seguito dell\'ultimatum e occupazione dell\'Armata Rossa; base navale avanzata della Flotta del Baltico.',
      };
    }
    if (normKey.includes('riga') || normKey.includes('latvia') || normKey.includes('latvija')) {
      return {
        name: 'Riga (Latviyskaya SSR)',
        adminTitle: 'Stolitsa Latviyskoy SSR (SSSR)',
        note: 'Repubblica Socialista Sovietica Lettone proclamata nel giugno-luglio 1940; grande porto industriale alla foce della Daugava incorporato nell\'Unione Sovietica.',
      };
    }
    if (normKey.includes('vilnius') || normKey.includes('kaunas') || normKey.includes('lietuva') || normKey.includes('lithuania')) {
      return {
        name: normKey.includes('vilnius') ? 'Vilnyus (Litovskaya SSR)' : 'Kaunas (Litovskaya SSR)',
        adminTitle: 'Litovskaya SSR (SSSR)',
        note: 'Repubblica Socialista Sovietica Lituana proclamata nell\'estate 1940; Vilnius, ceduta all\'URSS dalla Polonia nel 1939 e temporaneamente trasferita alla Lituania, diviene capitale repubblicana.',
      };
    }
    if (normKey.includes('chisinau') || normKey.includes('kishinev') || normKey.includes('bessarabia') || normKey.includes('moldav')) {
      return {
        name: 'Kishinev (Moldavskaya SSR)',
        adminTitle: 'Stolitsa Moldavskoy SSR',
        note: 'RSS Moldava costituita nell\'agosto 1940 unendo la Bessarabia (ceduta dalla Romania sotto ultimatum sovietico) con la preesistente RSSA Moldava.',
      };
    }
    if (normKey.includes('chernivtsi') || normKey.includes('cernauti') || normKey.includes('bukovina')) {
      return {
        name: 'Chernovtsy (Severnaya Bukovina)',
        adminTitle: 'Chernovitskaya oblast (Ukrainskaya SSR)',
        note: 'Bucovina settentrionale annessa all\'URSS nel giugno 1940 e integrata nella RSS Ucraina.',
      };
    }
    if (normKey.includes('viipuri') || normKey.includes('vyborg') || normKey.includes('sortavala') || normKey.includes('karelo_finsk')) {
      return {
        name: 'Vyborg & Karelo-Finskaya SSR',
        adminTitle: 'Karelo-Finskaya SSR (12ª Respublika SSSR)',
        note: 'Istmo Careliano e città di Viipuri/Vyborg ceduti dalla Finlandia all\'URSS con il Trattato di pace di Mosca (12 marzo 1940); elevata a 12ª Repubblica dell\'Unione (Karelo-Finskaya SSR sotto Otto Kuusinen).',
      };
    }
  }

  // 7. Caucaso e Transcaucasia (Petrolio e Risorse Strategiche)
  if (normKey.includes('baku') || normKey.includes('azerbaijan') || normKey.includes('azerbaydzhan')) {
    return {
      name: 'Baku (Neftyanoy Tsentr)',
      adminTitle: 'Stolitsa Azerbaydzhanskoy SSR',
      note: 'Il pozzo vitale dell\'Unione Sovietica: i campi petroliferi della penisola di Abşeron estraevano oltre il 70% del greggio dell\'intera URSS; bersaglio dei piani segreti di bombardamento anglo-francesi (Operazione Pike, 1940).',
    };
  }
  if (normKey.includes('tbilisi') || normKey.includes('tiflis') || normKey.includes('georgia') || normKey.includes('gruzinsk')) {
    return {
      name: 'Tbilisi (Gruzinskaya SSR)',
      adminTitle: 'Stolitsa Gruzinskoy SSR',
      note: 'Capitale storica della Georgia, patria natale di Iosif Stalin e del Commissario del Popolo Lavrentij Beria; perno amministrativo e culturale della Transcaucasia.',
    };
  }
  if (normKey.includes('yerevan') || normKey.includes('erevan') || normKey.includes('armenia') || normKey.includes('armyansk')) {
    return {
      name: 'Yerevan (Armyanskaya SSR)',
      adminTitle: 'Stolitsa Armyanskoy SSR',
      note: 'Capitale della RSS Armena ai piedi del Monte Ararat, polo chimico sintetico (gomma Nairit) ed estrattivo del rame.',
    };
  }
  if (normKey.includes('grozny') || normKey.includes('chechen')) {
    return {
      name: 'Grozny (Severnyy Kavkaz)',
      adminTitle: 'Checheno-Ingushskaya ASSR (Grozneft)',
      note: 'Secondo bacino petrolifero strategico della Russia sovietica con raffinerie avanzate collegate da oleodotto diretto al porto di Tuapse sul Mar Nero.',
    };
  }
  if (normKey.includes('rostov') || normKey.includes('rostov_on_don')) {
    return {
      name: 'Rostov-na-Donu',
      adminTitle: 'Rostovskaya oblast (Vorota Kavkaza)',
      note: 'La "Porta del Caucaso" sul fiume Don e sede della gigantesca fabbrica Rostselmash, il più grande costruttore di mietitrebbiatrici e veicoli pesanti dell\'URSS.',
    };
  }

  // 8. Asia Centrale e Siberia
  if (normKey.includes('tashkent') || normKey.includes('uzbek')) {
    return {
      name: 'Tashkent (Uzbekskaya SSR)',
      adminTitle: 'Stolitsa Uzbekskoy SSR (Sredneaziatskiy VO)',
      note: 'Capitale della RSS Uzbeka e quartier generale del Distretto Militare dell\'Asia Centrale; polo primario per la coltivazione del cotone strategico per esplosivi e divise.',
    };
  }
  if (normKey.includes('almaty') || normKey.includes('alma_ata') || normKey.includes('kazakh')) {
    return {
      name: 'Alma-Ata (Kazakhskaya SSR)',
      adminTitle: 'Stolitsa Kazakhskoy SSR',
      note: 'Capitale della RSS Kazaka (elevata a Repubblica dell\'Unione con la Costituzione del 1936); immenso territorio ricco di carbone (Karaganda), rame (Balkhash) e piombo.',
    };
  }
  if (normKey.includes('frunze') || normKey.includes('bishkek') || normKey.includes('kirghiz')) {
    return {
      name: 'Frunze (Kirgizskaya SSR)',
      adminTitle: 'Stolitsa Kirgizskoy SSR',
      note: 'Capitale della RSS Kirghisa intitolata nel 1926 al comandante bolscevico Michail Frunze (elevata a repubblica dell\'Unione nel 1936).',
    };
  }
  if (normKey.includes('stalinabad') || normKey.includes('dushanbe') || normKey.includes('tajik')) {
    return {
      name: 'Stalinabad (Tadzhikskaya SSR)',
      adminTitle: 'Stolitsa Tadzhikskoy SSR',
      note: 'Capitale della RSS Tagika (ribattezzata Stalinabad dal 1929 al 1961 in onore di Stalin), situata a ridosso delle catene montuose del Pamir.',
    };
  }
  if (normKey.includes('ashgabat') || normKey.includes('turkmen')) {
    return {
      name: 'Ashkhabad (Turkmenskaya SSR)',
      adminTitle: 'Stolitsa Turkmenskoy SSR',
      note: 'Capitale della RSS Turkmena ai margini del deserto del Karakum e lungo la ferrovia Transcaspiana.',
    };
  }
  if (normKey.includes('novosibirsk') || normKey.includes('kuzbass') || normKey.includes('kemerovo')) {
    return {
      name: 'Novosibirsk & Kuzbass',
      adminTitle: 'Zapadno-Sibirskiy Kray (Kuznetskiy Basseyn)',
      note: 'Capitale della Siberia occidentale e colossale bacino carbonifero e metallurgico del Kuzbass, creato per alimentare il combinato Ural-Kuznetsk.',
    };
  }
  if (normKey.includes('vladivostok') || normKey.includes('primorsk')) {
    return {
      name: 'Vladivostok (Zolotoy Rog)',
      adminTitle: 'Glavnaya Baza Tikhookeanskogo Flota (Primorskiy Kray)',
      note: 'Capolinea della ferrovia Transiberiana e quartier generale della Flotta del Pacifico sovietica nella Baia del Corno d\'Oro; baluardo a contrasto dell\'espansionismo nipponico.',
    };
  }
  if (normKey.includes('khabarovsk') || normKey.includes('chabarovsk')) {
    return {
      name: 'Khabarovsk (Amur)',
      adminTitle: 'Khabarovskiy Kray (Dalnevostochnyy Front)',
      note: 'Centro di comando del Fronte dell\'Estremo Oriente dell\'Armata Rossa sulle rive del fiume Amur al confine con il Manciukuò.',
    };
  }

  // Fallback se appartiene a SOV
  if (owner === 'SOV' || id.startsWith('RU') || id.startsWith('BY') || id.startsWith('UA') || id.startsWith('MD') || id.startsWith('KZ') || id.startsWith('UZ') || id.startsWith('TM') || id.startsWith('TJ') || id.startsWith('KG') || id.startsWith('GE') || id.startsWith('AM') || id.startsWith('AZ')) {
    return {
      name: `${rawName} (SSSR)`,
      adminTitle: 'Territoriya Soyuza Sovetskikh Sotsialisticheskikh Respublik',
      note: 'Territorio dell\'Unione delle Repubbliche Socialiste Sovietiche sotto la guida del Partito Comunista di Tutta l\'Unione (Bolscevico).',
    };
  }

  return null;
}

export interface BeneluxDistrictDef {
  nuts: string;
  country: 'BE' | 'NL' | 'LU';
  name: string;
  capitalOrChefLieu: string;
  keys: string[];
  preAdminTitle: string;
  preNote: string;
  occName: string;
  occAdminTitle: string;
  occNote: string;
  isDirectAnnexation?: boolean;
}

export const BENELUX_DISTRICTS_CATALOG: BeneluxDistrictDef[] = [
  // =========================================================================
  // BELGIO (44 Arrondissements NUTS-3)
  // =========================================================================

  // --- Bruxelles-Capitale ---
  {
    nuts: 'BE100',
    country: 'BE',
    name: 'Bruxelles / Brussel',
    capitalOrChefLieu: 'Bruxelles',
    keys: ['bruxelles', 'brussel', 'brussels', 'bruxelles_capitale'],
    preAdminTitle: 'Royaume de Belgique / Koninkrijk België — Capitale',
    preNote: 'Capitale bilingue del Regno del Belgio e residenza reale di Re Leopoldo III. Sede del governo e del parlamento belga, fulcro della politica di neutralità armata proclamata nel 1936.',
    occName: 'Brüssel (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich (Alexander von Falkenhausen, Bruxelles)',
    occNote: 'Occupata dalla Wehrmacht il 18 maggio 1940 dopo il ripiegamento delle truppe alleate dalla Linea Dyle. Divenne sede del comando militare tedesco per il Belgio e il nord della Francia diretto dal generale Alexander von Falkenhausen.',
  },

  // --- Provincia di Anversa (Antwerpen) ---
  {
    nuts: 'BE211',
    country: 'BE',
    name: 'Arrondissement Antwerpen (Anversa)',
    capitalOrChefLieu: 'Antwerpen',
    keys: ['antwerpen', 'anvers', 'anversa'],
    preAdminTitle: 'Royaume de Belgique — Province d\'Anvers / Provincie Antwerpen',
    preNote: 'Grande metropoli portuale sulla Schelda e culla della Ridotta Nazionale belga (Nationaal Reduit). Centro vitale del commercio dei diamanti e testata occidentale del Canale Alberto.',
    occName: 'Antwerpen (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich — Oberfeldkommandantur 520 (Antwerpen)',
    occNote: 'Occupata il 18 maggio 1940; le sue banchine portuali e fortificazioni periferiche vennero requisite dalla Kriegsmarine per le operazioni nel Canale della Manica.',
  },
  {
    nuts: 'BE212',
    country: 'BE',
    name: 'Arrondissement Mechelen / Malines',
    capitalOrChefLieu: 'Mechelen',
    keys: ['mechelen', 'malines'],
    preAdminTitle: 'Royaume de Belgique — Province d\'Anvers (Mechelen)',
    preNote: 'Snodo ferroviario centrale del Belgio e sede arcivescovile primate. Cerniera settentrionale della linea fortificata KW (Koningshooikt-Wavre).',
    occName: 'Mecheln (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich (Kreiskommandantur Mechelen)',
    occNote: 'Occupata il 17 maggio 1940 dopo il crollo della Linea KW; nella vicina caserma Dossin i tedeschi istituiranno il principale campo di transito e deportazione per gli ebrei del Belgio.',
  },
  {
    nuts: 'BE213',
    country: 'BE',
    name: 'Arrondissement Turnhout',
    capitalOrChefLieu: 'Turnhout',
    keys: ['turnhout', 'kempen', 'campine'],
    preAdminTitle: 'Royaume de Belgique — Province d\'Anvers (Kempen)',
    preNote: 'Regione delle brughiere della Campine (Kempen), attraversata dal canale Dessel-Turnhout-Schoten e da fortificazioni di sbarramento anticarro.',
    occName: 'Turnhout (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Occupata dalle divisioni del 18º Esercito tedesco tra il 12 e il 14 maggio 1940 durante l\'avanzata verso Anversa.',
  },

  // --- Provincia del Limburgo Belga (Limburg) ---
  {
    nuts: 'BE224',
    country: 'BE',
    name: 'Arrondissement Hasselt',
    capitalOrChefLieu: 'Hasselt',
    keys: ['hasselt', 'limburg_be'],
    preAdminTitle: 'Royaume de Belgique — Provincie Limburg (Hasselt)',
    preNote: 'Capoluogo del Limburgo belga, snodo nodale sul Canale Alberto e centro del bacino carbonifero fiammingo di Genk e Beringen.',
    occName: 'Hasselt (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich — Feldkommandantur Hasselt',
    occNote: 'Attraversata dai panzer tedeschi l\'11-12 maggio 1940 subito dopo lo sfondamento della linea del Canale Alberto a Eben-Emael.',
  },
  {
    nuts: 'BE225',
    country: 'BE',
    name: 'Arrondissement Maaseik',
    capitalOrChefLieu: 'Maaseik',
    keys: ['maaseik', 'maasland'],
    preAdminTitle: 'Royaume de Belgique — Provincie Limburg (Maasland)',
    preNote: 'Fascia di confine lungo la Mosa prospiciente il Limburgo olandese; i ponti di confine furono predisposti per la distruzione immediata all\'alba del 10 maggio 1940.',
    occName: 'Maaseik (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Sotto occupazione dal primo giorno d\'invasione del 10 maggio 1940 da parte del 6º Esercito tedesco del generale Walter von Reichenau.',
  },
  {
    nuts: 'BE223',
    country: 'BE',
    name: 'Arrondissement Tongeren (Fort Eben-Emael)',
    capitalOrChefLieu: 'Tongeren',
    keys: ['tongeren', 'tongres', 'eben_emael', 'fort_eben_emael'],
    preAdminTitle: 'Royaume de Belgique — Provincie Limburg (Tongeren / Eben-Emael)',
    preNote: 'Cuore della frontiera orientale belga comprendente il leggendario Fort d\'Eben-Emael, la più formidabile fortezza d\'artiglieria sotterranea d\'Europa dominante la giunzione tra la Mosa e il Canale Alberto.',
    occName: 'Tongern / Fort Eben-Emael (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich — Festung Eben-Emael',
    occNote: 'Teatro del celebre colpo di mano all\'alba del 10 maggio 1940: 85 paracadutisti tedeschi della Sturmabteilung Koch a bordo di alianti DFS 230 neutralizzarono le cupole d\'acciaio del forte con cariche cave, costringendo la guarnigione alla resa l\'11 maggio.',
  },

  // --- Provincia delle Fiandre Orientali (Oost-Vlaanderen) ---
  {
    nuts: 'BE231',
    country: 'BE',
    name: 'Arrondissement Aalst / Alost',
    capitalOrChefLieu: 'Aalst',
    keys: ['aalst', 'alost'],
    preAdminTitle: 'Royaume de Belgique — Provincie Oost-Vlaanderen (Aalst)',
    preNote: 'Valle della Dendre, fiorente polo industriale e tessile a metà strada tra Bruxelles e Gand.',
    occName: 'Aalst (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Occupata il 19 maggio 1940 durante la ritirata alleata verso il fiume Schelda e il canale Terneuzen-Gand.',
  },
  {
    nuts: 'BE232',
    country: 'BE',
    name: 'Arrondissement Dendermonde / Termonde',
    capitalOrChefLieu: 'Dendermonde',
    keys: ['dendermonde', 'termonde'],
    preAdminTitle: 'Royaume de Belgique — Provincie Oost-Vlaanderen (Dendermonde)',
    preNote: 'Confluenza strategica della Schelda e della Dendre, dotata di chiuse per inondazioni difensive di campagna.',
    occName: 'Dendermonde (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Occupata dalle truppe tedesche il 20 maggio 1940 al termine dei combattimenti per il superamento della Schelda.',
  },
  {
    nuts: 'BE233',
    country: 'BE',
    name: 'Arrondissement Eeklo',
    capitalOrChefLieu: 'Eeklo',
    keys: ['eeklo', 'meetjesland'],
    preAdminTitle: 'Royaume de Belgique — Provincie Oost-Vlaanderen (Meetjesland)',
    preNote: 'Regione del Meetjesland al confine olandese dello Schelda occidentale, perno difensivo sul Canale Leopold.',
    occName: 'Eeklo (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Occupata il 24 maggio 1940 dalle forze tedesche che spingevano le truppe belghe verso la sacca della Lys.',
  },
  {
    nuts: 'BE234',
    country: 'BE',
    name: 'Arrondissement Gent / Gand',
    capitalOrChefLieu: 'Gent',
    keys: ['gent', 'gand'],
    preAdminTitle: 'Royaume de Belgique — Provincie Oost-Vlaanderen (Gent)',
    preNote: 'Capitale storica e polo universitario delle Fiandre orientali, fondamentale porto interno raccordato al mare dal Canale marittimo Gand-Terneuzen e snodo metallurgico e tessile.',
    occName: 'Gent (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich — Oberfeldkommandantur Gent',
    occNote: 'Occupata il 23 maggio 1940 dopo aspri combattimenti sulla linea della Schelda tra le divisioni di fanteria belghe e la Wehrmacht.',
  },
  {
    nuts: 'BE235',
    country: 'BE',
    name: 'Arrondissement Oudenaarde / Audenarde',
    capitalOrChefLieu: 'Oudenaarde',
    keys: ['oudenaarde', 'audenarde'],
    preAdminTitle: 'Royaume de Belgique — Provincie Oost-Vlaanderen (Oudenaarde)',
    preNote: 'Valle della Schelda superiore nelle Fiandre collinari (Vlaamse Ardennen), rinomata per la manifattura tessile e le difese d\'arresto fluviale.',
    occName: 'Oudenaarde (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Occupata il 21 maggio 1940 in seguito al forzamento della Schelda da parte del 6º Esercito tedesco.',
  },
  {
    nuts: 'BE236',
    country: 'BE',
    name: 'Arrondissement Sint-Niklaas',
    capitalOrChefLieu: 'Sint-Niklaas',
    keys: ['sint_niklaas', 'saint_nicolas', 'waasland'],
    preAdminTitle: 'Royaume de Belgique — Provincie Oost-Vlaanderen (Waasland)',
    preNote: 'Regione del Waasland sulla sponda sinistra della Schelda di fronte ad Anversa, area agricola e manifatturiera ad alta densità.',
    occName: 'Sint-Niklaas (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Occupata il 19 maggio 1940 a seguito dell\'evacuazione delle fortezze e del porto di Anversa.',
  },

  // --- Provincia delle Fiandre Occidentali (West-Vlaanderen) ---
  {
    nuts: 'BE251',
    country: 'BE',
    name: 'Arrondissement Brugge / Bruges (Zeebrugge)',
    capitalOrChefLieu: 'Brugge',
    keys: ['brugge', 'bruges', 'zeebrugge'],
    preAdminTitle: 'Royaume de Belgique — Provincie West-Vlaanderen (Brugge)',
    preNote: 'Capoluogo delle Fiandre marittime comprendente il porto canale d\'altura di Zeebrugge, base strategica sul Mare del Nord collegata alle rotte per la Gran Bretagna.',
    occName: 'Brügge / Zeebrugge (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich — Hafenkommandantur Zeebrugge',
    occNote: 'Occupata il 29 maggio 1940 all\'indomani della capitolazione dell\'esercito belga; il porto di Zeebrugge fu rapidamente fortificato con batterie costiere d\'artiglieria della Kriegsmarine.',
  },
  {
    nuts: 'BE252',
    country: 'BE',
    name: 'Arrondissement Diksmuide / Dixmude',
    capitalOrChefLieu: 'Diksmuide',
    keys: ['diksmuide', 'dixmude', 'ijzer', 'yser'],
    preAdminTitle: 'Royaume de Belgique — Provincie West-Vlaanderen (IJzer)',
    preNote: 'Baluardo fluviale sull\'Yser (IJzer), santuario della memoria nazionale belga per la disperata resistenza allagata della Prima Guerra Mondiale (1914-1918) e la Torre dell\'Yser.',
    occName: 'Diksmuide (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Occupata il 29 maggio 1940 durante l\'accerchiamento finale delle truppe alleate nel perimetro di Dunkerque.',
  },
  {
    nuts: 'BE253',
    country: 'BE',
    name: 'Arrondissement Ieper / Ypres',
    capitalOrChefLieu: 'Ieper',
    keys: ['ieper', 'ypres'],
    preAdminTitle: 'Royaume de Belgique — Provincie West-Vlaanderen (Ieper)',
    preNote: 'Città simbolo del Saliente di Ypres, ricostruita dopo le distruzioni della Grande Guerra; presidiata dalle retroguardie della British Expeditionary Force (BEF) nel maggio 1940.',
    occName: 'Ypern (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Teatro di duri scontri difensivi tra la BEF e le divisioni tedesche il 27-28 maggio 1940 per mantenere aperto il corridoio di fuga verso le spiagge di Dunkerque.',
  },
  {
    nuts: 'BE254',
    country: 'BE',
    name: 'Arrondissement Kortrijk / Courtrai',
    capitalOrChefLieu: 'Kortrijk',
    keys: ['kortrijk', 'courtrai', 'leie', 'lys'],
    preAdminTitle: 'Royaume de Belgique — Provincie West-Vlaanderen (Kortrijk)',
    preNote: 'Importante snodo sul fiume Lys (Leie) al confine francese presso Lilla e Tourcoing, centro dell\'industria del lino e dei filati.',
    occName: 'Kortrijk (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Epicentro della sanguinosa Battaglia della Lys (24-28 maggio 1940): l\'esercito belga guidato da Re Leopoldo III sostenne l\'urto di sette divisioni tedesche prima di esaurire munizioni e carburante.',
  },
  {
    nuts: 'BE255',
    country: 'BE',
    name: 'Arrondissement Oostende / Ostenda',
    capitalOrChefLieu: 'Oostende',
    keys: ['oostende', 'ostende', 'ostenda'],
    preAdminTitle: 'Royaume de Belgique — Provincie West-Vlaanderen (Oostende)',
    preNote: 'Principale stazione marittima e porto traghetti per Dover, capolinea dell\'arteria di collegamento marittimo con il Regno Unito e residenza estiva della famiglia reale.',
    occName: 'Ostende (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich — Seekommandantur Flandern',
    occNote: 'Occupata il 29 maggio 1940; le sue installazioni portuali divennero subito una base avanzata per i motosiluranti S-Boot e dragamine tedeschi diretti nel Canale della Manica.',
  },
  {
    nuts: 'BE256',
    country: 'BE',
    name: 'Arrondissement Roeselare / Roulers',
    capitalOrChefLieu: 'Roeselare',
    keys: ['roeselare', 'roulers'],
    preAdminTitle: 'Royaume de Belgique — Provincie West-Vlaanderen (Roeselare)',
    preNote: 'Centro agricolo e industriale della pianura fiamminga occidentale sul canale Roeselare-Leie.',
    occName: 'Roeselare (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Occupata il 27 maggio 1940 durante la rottura del fronte belga sulla Lys da parte del 6º Esercito tedesco.',
  },
  {
    nuts: 'BE257',
    country: 'BE',
    name: 'Arrondissement Tielt',
    capitalOrChefLieu: 'Tielt',
    keys: ['tielt', 'thielt'],
    preAdminTitle: 'Royaume de Belgique — Provincie West-Vlaanderen (Tielt)',
    preNote: 'Cuore geografico delle Fiandre occidentali; ospitò temporaneamente i comandi tattici delle divisioni belghe in ripiegamento.',
    occName: 'Tielt (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Caduta nelle mani tedesche il 27 maggio 1940 a poche ore dalla decisione di Re Leopoldo III di cessare il fuoco.',
  },
  {
    nuts: 'BE258',
    country: 'BE',
    name: 'Arrondissement Veurne / Furnes (De Panne)',
    capitalOrChefLieu: 'Veurne',
    keys: ['veurne', 'furnes', 'de_panne', 'la_panne'],
    preAdminTitle: 'Royaume de Belgique — Provincie West-Vlaanderen (Veurne / De Panne)',
    preNote: 'Fascia litoranea costiera estrema confinante con Dunkerque e la Francia. A De Panne Re Leopoldo III stabilì il suo ultimo quartier generale prima della resa.',
    occName: 'Veurne / De Panne (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Fianco orientale essenziale del perimetro d\'evacuazione di Dunkerque; le spiagge di De Panne e Bray-Dunes furono solcate da centinaia di imbarcazioni alleate durante l\'Operazione Dynamo prima della caduta il 31 maggio 1940.',
  },

  // --- Provincia del Brabante Fiammingo (Vlaams-Brabant) ---
  {
    nuts: 'BE241',
    country: 'BE',
    name: 'Arrondissement Halle-Vilvoorde / Hal-Vilvorde',
    capitalOrChefLieu: 'Vilvoorde',
    keys: ['halle_vilvoorde', 'hal_vilvorde', 'halle', 'vilvoorde'],
    preAdminTitle: 'Royaume de Belgique — Province de Brabant (Halle-Vilvoorde)',
    preNote: 'Cintura industriale e canale marittimo Bruxelles-Schelda, linea di raccordo strategico tra le Fiandre e la Vallonia.',
    occName: 'Halle-Vilvoorde (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Occupata il 18 maggio 1940 in concomitanza con la caduta di Bruxelles e lo sgombero delle retroguardie alleate.',
  },
  {
    nuts: 'BE242',
    country: 'BE',
    name: 'Arrondissement Leuven / Lovanio (KW-Stelling)',
    capitalOrChefLieu: 'Leuven',
    keys: ['leuven', 'lovanio', 'louvain', 'dyle', 'kw_stelling'],
    preAdminTitle: 'Royaume de Belgique — Province de Brabant (Leuven)',
    preNote: 'Storica città universitaria sulla Dyle e pilastro difensivo settentrionale della Linea KW (Koningshooikt-Wavre); presidiata dalla 3ª Divisione di Fanteria britannica del generale Bernard Montgomery.',
    occName: 'Löwen (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Teatro di violenti combattimenti il 14-16 maggio 1940: le truppe britanniche di Montgomery respinsero gli attacchi frontali tedeschi, ma dovettero ripiegare a causa dello sfondamento a Sedan nelle Ardenne.',
  },

  // --- Provincia del Brabante Vallone (Brabant wallon) ---
  {
    nuts: 'BE310',
    country: 'BE',
    name: 'Arrondissement Nivelles / Nijvel (Waterloo & Wavre)',
    capitalOrChefLieu: 'Nivelles',
    keys: ['nivelles', 'nijvel', 'waterloo', 'wavre'],
    preAdminTitle: 'Royaume de Belgique — Province de Brabant (Nivelles / Wavre)',
    preNote: 'Brabante vallone meridionale comprendente il campo storico di Waterloo e Wavre; perno centrale della Linea KW / Dyle a protezione del varco di Gembloux.',
    occName: 'Nivelles (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Occupata il 17 maggio 1940 dopo che le divisioni francesi e britanniche furono costrette a ritirarsi per non essere aggirate a sud.',
  },

  // --- Provincia dell'Hainaut ---
  {
    nuts: 'BE32A',
    country: 'BE',
    name: 'Arrondissement Ath',
    capitalOrChefLieu: 'Ath',
    keys: ['ath'],
    preAdminTitle: 'Royaume de Belgique — Province de Hainaut (Ath)',
    preNote: 'Valle della Dendre occidentale, snodo rurale e ferroviario tra Bruxelles e Tournai.',
    occName: 'Ath (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Occupata il 19 maggio 1940 nel corso dell\'avanzata tedesca verso la frontiera francese.',
  },
  {
    nuts: 'BE32B',
    country: 'BE',
    name: 'Arrondissement Charleroi',
    capitalOrChefLieu: 'Charleroi',
    keys: ['charleroi', 'pays_noir'],
    preAdminTitle: 'Royaume de Belgique — Province de Hainaut (Charleroi)',
    preNote: 'Il cuore industriale e minerario del Belgio (*Le Pays Noir*), imponente conurbazione siderurgica e carbonifera sulla Sambre.',
    occName: 'Charleroi (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich — Oberfeldkommandantur Charleroi',
    occNote: 'Occupata il 17 maggio 1940; le acciaierie e miniere di carbone furono immediatamente requisite dagli uffici degli armamenti tedeschi (Wi Rü Amt).',
  },
  {
    nuts: 'BE323',
    country: 'BE',
    name: 'Arrondissement Mons / Bergen',
    capitalOrChefLieu: 'Mons',
    keys: ['mons', 'bergen', 'borinage'],
    preAdminTitle: 'Royaume de Belgique — Province de Hainaut (Mons)',
    preNote: 'Capoluogo storico dell\'Hainaut e distretto minerario del Borinage; teatro della prima battaglia britannica del 1914.',
    occName: 'Bergen / Mons (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich — Feldkommandantur Mons',
    occNote: 'Occupata il 18 maggio 1940 dai reparti corazzati tedeschi che avanzavano verso Maubeuge e Valenciennes.',
  },
  {
    nuts: 'BE328',
    country: 'BE',
    name: 'Arrondissement Tournai-Mouscron',
    capitalOrChefLieu: 'Tournai',
    keys: ['tournai', 'mouscron', 'doornik'],
    preAdminTitle: 'Royaume de Belgique — Province de Hainaut (Tournai)',
    preNote: 'Tournai sulla Schelda, millenaria città d\'arte e cattedrale con 5 campanili, porta occidentale verso Lilla e la Francia settentrionale.',
    occName: 'Tournai (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Occupata il 21 maggio 1940 dopo intensi bombardamenti aerei che devastarono il centro storico monumentale.',
  },
  {
    nuts: 'BE32C',
    country: 'BE',
    name: 'Arrondissement Soignies / Zinnik',
    capitalOrChefLieu: 'Soignies',
    keys: ['soignies', 'zinnik'],
    preAdminTitle: 'Royaume de Belgique — Province de Hainaut (Soignies)',
    preNote: 'Distretto delle cave storiche di pietra blu (pierre bleue) e snodo tra Mons e Bruxelles.',
    occName: 'Soignies (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Caduta il 18 maggio 1940 durante la penetrazione tedesca nel bacino della Senne.',
  },
  {
    nuts: 'BE32D',
    country: 'BE',
    name: 'Arrondissement Thuin',
    capitalOrChefLieu: 'Thuin',
    keys: ['thuin', 'lobbes'],
    preAdminTitle: 'Royaume de Belgique — Province de Hainaut (Thuin)',
    preNote: 'Valle della Sambre superiore, comprendente Lobbes, Beaumont e le alture boscose al confine francese.',
    occName: 'Thuin (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Occupata il 16 maggio 1940 dopo il superamento delle fortificazioni di frontiera belga-francesi.',
  },
  {
    nuts: 'BE329',
    country: 'BE',
    name: 'Arrondissement La Louvière',
    capitalOrChefLieu: 'La Louvière',
    keys: ['la_louviere', 'centre'],
    preAdminTitle: 'Royaume de Belgique — Province de Hainaut (La Louvière)',
    preNote: 'Polo industriale del Centre, celebre per i quattro ascensori idraulici del Canal du Centre e gli stabilimenti siderurgici Boël.',
    occName: 'La Louvière (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Occupata il 17 maggio 1940, la sua industria pesante fu integrata nei piani di produzione dell\'Organizzazione Todt.',
  },

  // --- Provincia di Liegi (Liège) ---
  {
    nuts: 'BE331',
    country: 'BE',
    name: 'Arrondissement Huy',
    capitalOrChefLieu: 'Huy',
    keys: ['huy'],
    preAdminTitle: 'Royaume de Belgique — Province de Liège (Huy)',
    preNote: 'Valle della Mosa a metà strada tra Liegi e Namur, dominata dal formidabile Forte di Huy.',
    occName: 'Huy (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Occupata il 13 maggio 1940; il Forte di Huy fu trasformato dai tedeschi in campo di prigionia della Gestapo e centro d\'internamento.',
  },
  {
    nuts: 'BE332',
    country: 'BE',
    name: 'Arrondissement Liège / Luik (PFL)',
    capitalOrChefLieu: 'Liège',
    keys: ['liege', 'luik', 'luettich', 'pfl', 'battice'],
    preAdminTitle: 'Royaume de Belgique — Province de Liège (PFL - Position Fortifiée de Liège)',
    preNote: 'Grande metropoli industriale vallone sulla Mosa, protetta dalla Posizione Fortificata di Liegi (PFL 1 e 2): Fort de Battice, Fort d\'Aubin-Neufchâteau, Fort de Flémalle, Fort de Boncelles.',
    occName: 'Lüttich (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich — Oberfeldkommandantur Lüttich',
    occNote: 'La città cadde il 12 maggio 1940, ma i forti d\'arresto (Battice e Aubin-Neufchâteau) resistettero eroicamente sotto pesantissimi bombardamenti di Stuka fino al 21-22 maggio 1940 prima di capitolare con gli onori delle armi.',
  },
  {
    nuts: 'BE334',
    country: 'BE',
    name: 'Arrondissement Waremme (Battaglia di Hannut)',
    capitalOrChefLieu: 'Waremme',
    keys: ['waremme', 'hannut', 'hesbaye', 'haspengouw'],
    preAdminTitle: 'Royaume de Belgique — Province de Liège (Hesbaye / Hannut)',
    preNote: 'Pianura aperta della Hesbaye comprendente Hannut: teatro il 12-14 maggio 1940 della Battaglia di Hannut, il primo scontro su vasta scala tra divisioni corazzate della storia militare (3ª e 4ª Panzer-Division contro il Corpo di Cavalleria francese del gen. Prioux su Somua S35 e Hotchkiss H35).',
    occName: 'Waremme / Hannut (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Dopo aver subito gravi perdite ad Hannut, le forze corazzate tedesche spinsero i francesi verso la Linea Dyle, occupando il distretto il 15 maggio 1940.',
  },
  {
    nuts: 'BE335',
    country: 'BE',
    name: 'Arrondissement Verviers (communes francophones)',
    capitalOrChefLieu: 'Verviers',
    keys: ['verviers', 'vesdre', 'spa', 'francorchamps'],
    preAdminTitle: 'Royaume de Belgique — Province de Liège (Verviers francophone)',
    preNote: 'Valle della Vesdre e città termale di Spa (già sede del Gran Quartier Generale del Kaiser nel 1918), cerniera d\'accesso all\'altopiano delle Hautes Fagnes.',
    occName: 'Verviers (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Occupata il 10-11 maggio 1940 dalle colonne d\'avanzata tedesche dirette verso Liegi.',
  },
  {
    nuts: 'BE336',
    country: 'BE',
    name: 'Bezirk Verviers — Deutschsprachige Gemeinschaft (Eupen-Malmedy & St. Vith)',
    capitalOrChefLieu: 'Eupen',
    keys: ['eupen', 'malmedy', 'sankt_vith', 'saint_vith', 'ostkantone', 'eupen_malmedy'],
    preAdminTitle: 'Royaume de Belgique — Cantons de l\'Est / Ostkantone (Eupen-Malmedy)',
    preNote: 'Cantoni orientali di lingua tedesca (Eupen, Malmedy, Sankt Vith) e Moresnet neutrale, ceduti dalla Germania al Belgio in base al Trattato di Versailles (1920) e all\'accordo di confine del 1925.',
    occName: 'Kreis Eupen-Malmedy (Rheinprovinz / Gau Köln-Aachen)',
    occAdminTitle: 'Deutsches Reich — Rheinprovinz (Gau Köln-Aachen, Kreis Eupen-Malmedy)',
    occNote: 'ANNESSIONE DIRETTA AL TERZO REICH: Con decreto di Adolf Hitler del 18 maggio 1940, i cantoni di Eupen, Malmedy e Moresnet vennero ufficialmente riannessi al Reich tedesco e reintegrati nella Provincia Renana (Gau Köln-Aachen). La popolazione maschile fu sottoposta alla leva obbligatoria nella Wehrmacht.',
    isDirectAnnexation: true,
  },

  // --- Provincia del Lussemburgo Belga (Luxembourg) ---
  {
    nuts: 'BE341',
    country: 'BE',
    name: 'Arrondissement Arlon',
    capitalOrChefLieu: 'Arlon',
    keys: ['arlon', 'aarlen'],
    preAdminTitle: 'Royaume de Belgique — Province de Luxembourg (Arlon)',
    preNote: 'Capoluogo della provincia belga del Lussemburgo, al triplice confine tra Belgio, Granducato di Lussemburgo e Francia; presidiato dal 1º Reggimento dei Cacciatori delle Ardenne (Chasseurs Ardennais).',
    occName: 'Arel / Arlon (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Attraversata il 10 maggio 1940 dalle avanguardie corazzate della 1ª e 2ª Panzer-Division del XIX Corpo d\'Armata di Heinz Guderian.',
  },
  {
    nuts: 'BE342',
    country: 'BE',
    name: 'Arrondissement Bastogne',
    capitalOrChefLieu: 'Bastogne',
    keys: ['bastogne', 'bastenaken'],
    preAdminTitle: 'Royaume de Belgique — Province de Luxembourg (Bastogne)',
    preNote: 'Snodo stradale strategico a stella nel cuore dell\'altopiano delle Ardenne; a Bodange i Cacciatori delle Ardenne belgi opposero una tenace resistenza ritardante il 10 maggio 1940.',
    occName: 'Bastnach / Bastogne (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Attraversata il 10-11 maggio 1940 dalle colonne corazzate tedesche in marcia verso la Mosa; diverrà celebre 4 anni dopo durante l\'Offensiva delle Ardenne.',
  },
  {
    nuts: 'BE343',
    country: 'BE',
    name: 'Arrondissement Marche-en-Famenne',
    capitalOrChefLieu: 'Marche-en-Famenne',
    keys: ['marche_en_famenne', 'famenne'],
    preAdminTitle: 'Royaume de Belgique — Province de Luxembourg (Famenne)',
    preNote: 'Porta d\'accesso della regione della Famenne tra l\'Ourthe e la Lesse.',
    occName: 'Marche-en-Famenne (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Occupata il 12 maggio 1940 durante l\'avanzata del gruppo d\'armate A verso la Mosa.',
  },
  {
    nuts: 'BE344',
    country: 'BE',
    name: 'Arrondissement Neufchâteau',
    capitalOrChefLieu: 'Neufchâteau',
    keys: ['neufchateau'],
    preAdminTitle: 'Royaume de Belgique — Province de Luxembourg (Neufchâteau)',
    preNote: 'Fitte foreste delle Ardenne meridionali solcate dalla Semois; corridoio d\'infiltrazione primaria dei panzer di Guderian.',
    occName: 'Neufchâteau (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Superata dalle truppe corazzate tedesche già la sera dell\'11 maggio 1940 dirette su Bouillon e Sedan.',
  },
  {
    nuts: 'BE345',
    country: 'BE',
    name: 'Arrondissement Virton',
    capitalOrChefLieu: 'Virton',
    keys: ['virton', 'gaume'],
    preAdminTitle: 'Royaume de Belgique — Province de Luxembourg (Gaume)',
    preNote: 'Regione della Gaume a clima mite confinante con la Lorena francese e l\'estremità occidentale della Linea Maginot a Montmédy.',
    occName: 'Virton (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Occupata l\'11-12 maggio 1940 mentre le truppe francesi arretravano sulle posizioni fortificate di confine.',
  },

  // --- Provincia di Namur ---
  {
    nuts: 'BE351',
    country: 'BE',
    name: 'Arrondissement Dinant (Mosa & Rommel)',
    capitalOrChefLieu: 'Dinant',
    keys: ['dinant', 'bouvignes', 'houx'],
    preAdminTitle: 'Royaume de Belgique — Province de Namur (Dinant)',
    preNote: 'Suggestiva gola calcarea della Mosa dominata dalla cittadella; teatro di massacri di civili nella Grande Guerra.',
    occName: 'Dinant (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Teatro dell\'attraversamento decisivo della Mosa il 12-13 maggio 1940 da parte della 7ª Panzer-Division del generale Erwin Rommel a Bouvignes e Houx, che aprì la breccia per la corsa corazzata verso la Manica.',
  },
  {
    nuts: 'BE352',
    country: 'BE',
    name: 'Arrondissement Namur (PFN)',
    capitalOrChefLieu: 'Namur',
    keys: ['namur', 'namen', 'pfn'],
    preAdminTitle: 'Royaume de Belgique — Province de Namur (PFN - Position Fortifiée de Namur)',
    preNote: 'Confluenza strategica della Sambre e della Mosa, protetta dai 9 forti della Posizione Fortificata di Namur (PFN): Andenne, Maizeret, Marchovelette, Cognelée, Emines, Suarlée, Malonne, Saint-Héribert, Dave.',
    occName: 'Namur (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich — Feldkommandantur Namur',
    occNote: 'La città fu presa il 15 maggio 1940; i forti della cintura di Namur resistettero isolati fino al 21-23 maggio sotto intensi tiri d\'artiglieria pesante e bombardamenti della Luftwaffe prima di soccombere.',
  },
  {
    nuts: 'BE353',
    country: 'BE',
    name: 'Arrondissement Philippeville',
    capitalOrChefLieu: 'Philippeville',
    keys: ['philippeville', 'cerfontaine', 'florennes'],
    preAdminTitle: 'Royaume de Belgique — Province de Namur (Entre-Sambre-et-Meuse)',
    preNote: 'Altopiano fortificato tra Sambre e Mosa verso la frontiera francese di Givet e Rocroi.',
    occName: 'Philippeville (Militärverwaltung)',
    occAdminTitle: 'Militärverwaltung in Belgien und Nordfrankreich',
    occNote: 'Occupata il 15-16 maggio 1940 durante l\'inseguimento della 9ª Armata francese in rotta da parte della divisione di Rommel.',
  },

  // =========================================================================
  // PAESI BASSI (40 COROP / NUTS-3)
  // =========================================================================

  // --- Olanda Settentrionale (Noord-Holland) ---
  {
    nuts: 'NL321',
    country: 'NL',
    name: 'Kop van Noord-Holland (Den Helder & Kornwerderzand)',
    capitalOrChefLieu: 'Den Helder',
    keys: ['kop_van_noord_holland', 'den_helder', 'kornwerderzand', 'afsluitdijk', 'texel'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Noord-Holland (Den Helder / Marinebasis)',
    preNote: 'Base navale principale della Koninklijke Marine a Den Helder (Willemsoord); testata ovest dell\'Afsluitdijk e isola di Texel.',
    occName: 'Den Helder / Kornwerderzand (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete — Marinebefehlshaber in den Niederlanden',
    occNote: 'Occupata il 15 maggio 1940 dopo la capitolazione generale. La fortezza di Kornwerderzand sull\'Afsluitdijk respinse tutti gli assalti della Wehrmacht fino alla resa finale.',
  },
  {
    nuts: 'NL323',
    country: 'NL',
    name: 'IJmond (IJmuiden)',
    capitalOrChefLieu: 'IJmuiden',
    keys: ['ijmond', 'ijmuiden', 'velsen'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Noord-Holland (IJmond / IJmuiden)',
    preNote: 'Porto d\'accesso del Canale del Mare del Nord (Noordzeekanaal) verso Amsterdam, con le colossali chiuse marittime e gli altiforni Hoogovens.',
    occName: 'IJmuiden (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete — Stützpunkt IJmuiden',
    occNote: 'Occupata il 15 maggio 1940; porto convertito in base per dragamine e Schnellboot della Kriegsmarine.',
  },
  {
    nuts: 'NL324',
    country: 'NL',
    name: 'Agglomeratie Haarlem',
    capitalOrChefLieu: 'Haarlem',
    keys: ['haarlem', 'agglomeratie_haarlem', 'zandvoort'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Noord-Holland (Haarlem)',
    preNote: 'Capoluogo provinciale storico dell\'Olanda Settentrionale sul fiume Spaarne e litorale di Zandvoort.',
    occName: 'Haarlem (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Occupata il 15 maggio 1940 dal 18º Esercito tedesco del generale von Küchler; polo industriale e capoluogo dell\'Olanda Settentrionale sottoposto a rigido controllo d\'occupazione.',
  },
  {
    nuts: 'NL325',
    country: 'NL',
    name: 'Zaanstreek (Zaandam)',
    capitalOrChefLieu: 'Zaandam',
    keys: ['zaanstreek', 'zaandam'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Noord-Holland (Zaanstreek)',
    preNote: 'Cuore manifatturiero e mulini industriali lungo il fiume Zaan a nord di Amsterdam.',
    occName: 'Zaandam (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Occupata il 15 maggio 1940; le fabbriche alimentari e di legname furono poste sotto controllo economico tedesco.',
  },
  {
    nuts: 'NL327',
    country: 'NL',
    name: 'Het Gooi en Vechtstreek (Hilversum)',
    capitalOrChefLieu: 'Hilversum',
    keys: ['het_gooi', 'hilversum', 'naarden', 'bussum'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Noord-Holland (Het Gooi / Hilversum)',
    preNote: 'Centro delle trasmissioni radiofoniche nazionali olandesi a Hilversum e fortezza storica di Naarden sulla Waterlinie.',
    occName: 'Hilversum (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete — Sender Hilversum',
    occNote: 'Occupata il 15 maggio 1940; i potenti impianti di trasmissione radio vennero requisiti dal Ministero della Propaganda di Goebbels.',
  },
  {
    nuts: 'NL328',
    country: 'NL',
    name: 'Alkmaar en omgeving',
    capitalOrChefLieu: 'Alkmaar',
    keys: ['alkmaar'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Noord-Holland (Alkmaar)',
    preNote: 'Storico centro agricolo e di canali protetto dal sistema polder e dalle inondazioni della Waterlinie.',
    occName: 'Alkmaar (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Occupata il 15 maggio 1940 in seguito alla capitolazione delle forze armate olandesi.',
  },
  {
    nuts: 'NL329',
    country: 'NL',
    name: 'Groot-Amsterdam',
    capitalOrChefLieu: 'Amsterdam',
    keys: ['amsterdam', 'groot_amsterdam'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Capitale Reale (Amsterdam)',
    preNote: 'Capitale costituzionale del Regno dei Paesi Bassi, centro finanziario globale, porto fluviale e sede della De Nederlandsche Bank.',
    occName: 'Amsterdam (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete — Aussenstelle Amsterdam',
    occNote: 'Occupata il 15 maggio 1940 dalle truppe tedesche entrate senza combattere dopo la capitolazione. Sede di una vasta comunità ebraica presto colpita da persecuzioni.',
  },

  // --- Olanda Meridionale (Zuid-Holland) ---
  {
    nuts: 'NL332',
    country: 'NL',
    name: 'Agglomeratie ’s-Gravenhage (L\'Aia / Den Haag)',
    capitalOrChefLieu: '\'s-Gravenhage',
    keys: ['den_haag', 's_gravenhage', 'l_aia', 'the_hague'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Sede del Governo (Den Haag / L\'Aia)',
    preNote: 'Sede della monarchia della Regina Guglielmina, del Governo, del Parlamento (Binnenhof) e dei ministeri. Fulcro della neutralità olandese.',
    occName: 'Den Haag (Sitz des Reichskommissars)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete (Reichskommissar Arthur Seyß-Inquart, Sitz Den Haag)',
    occNote: 'Obiettivo dell\'aviosbarco del 10 maggio 1940 (Battaglia dell\'Aia): gli olandesi sconfissero i paracadutisti di von Sponeck a Ypenburg, salvando la Regina che riparò a Londra. Il 15 maggio fu occupata e divenne sede del Reichskommissar Arthur Seyß-Inquart.',
  },
  {
    nuts: 'NL333',
    country: 'NL',
    name: 'Delft en Westland',
    capitalOrChefLieu: 'Delft',
    keys: ['delft', 'westland'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Zuid-Holland (Delft)',
    preNote: 'Città d\'arte e sede dell\'Arsenale Storico d\'Artiglieria, e il distretto orticolo serricolo del Westland.',
    occName: 'Delft (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Occupata il 15 maggio 1940 durante l\'avanzata della 9ª Panzer-Division verso L\'Aia.',
  },
  {
    nuts: 'NL337',
    country: 'NL',
    name: 'Agglomeratie Leiden en Bollenstreek',
    capitalOrChefLieu: 'Leiden',
    keys: ['leiden', 'leida', 'bollenstreek', 'katwijk'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Zuid-Holland (Leiden)',
    preNote: 'Antica città universitaria e la regione floricola dei bulbi (Bollenstreek) con la base aerea navale di Valkenburg.',
    occName: 'Leiden (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'La base aerea di Valkenburg fu duramente contesa il 10 maggio 1940 tra i paracadutisti tedeschi e i fanti olandesi; occupata il 15 maggio.',
  },
  {
    nuts: 'NL33A',
    country: 'NL',
    name: 'Zuidoost-Zuid-Holland (Dordrecht & Moerdijk)',
    capitalOrChefLieu: 'Dordrecht',
    keys: ['dordrecht', 'moerdijk', 'zuidoost_zuid_holland'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Zuid-Holland (Dordrecht / Moerdijk)',
    preNote: 'Isola di Dordrecht e i monumentali ponti sul Moerdijk che collegano l\'Olanda al Brabante e al sud del paese.',
    occName: 'Dordrecht / Moerdijk (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'I ponti di Moerdijk furono conquistati intatti dai paracadutisti tedeschi il 10 maggio 1940, permettendo alla 9ª Panzer-Division di ricongiungersi con Student a Rotterdam.',
  },
  {
    nuts: 'NL33B',
    country: 'NL',
    name: 'Oost-Zuid-Holland (Gouda)',
    capitalOrChefLieu: 'Gouda',
    keys: ['gouda', 'oost_zuid_holland', 'alphen'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Zuid-Holland (Gouda)',
    preNote: 'Confluenza dell\'IJssel olandese e del Gouwe, snodo idraulico di vitale importanza per gli allagamenti difensivi.',
    occName: 'Gouda (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Occupata il 15 maggio 1940 dopo il crollo del sistema difensivo della Vesting Holland.',
  },
  {
    nuts: 'NL33C',
    country: 'NL',
    name: 'Groot-Rijnmond (Rotterdam)',
    capitalOrChefLieu: 'Rotterdam',
    keys: ['rotterdam', 'groot_rijnmond', 'hoek_van_holland'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Zuid-Holland (Rotterdam / Rijnmond)',
    preNote: 'Il più grande porto commerciale del continente europeo sulla Nuova Mosa; presidiato dal corpo d\'élite dei Mariniers olandesi.',
    occName: 'Rotterdam (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete — Hafenkommandantur Rotterdam',
    occNote: 'I Mariniers difesero i ponti Willemsbrug fino al 14 maggio 1940, quando il devastante bombardamento terroristico aereo della Luftwaffe rase al suolo il centro storico (850 morti, 80.000 senzatetto), costringendo il generale Winkelman alla resa immediata per evitare la distruzione di Utrecht.',
  },

  // --- Zelanda (Zeeland) ---
  {
    nuts: 'NL341',
    country: 'NL',
    name: 'Zeeuwsch-Vlaanderen (Fiandre Zelandesi)',
    capitalOrChefLieu: 'Terneuzen',
    keys: ['zeeuwsch_vlaanderen', 'terneuzen', 'hulst'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Zeeland (Zeeuwsch-Vlaanderen)',
    preNote: 'Sponda meridionale dello Schelda occidentale confinante con il Belgio; corridoio di raccordo tra le armate olandesi e francesi.',
    occName: 'Zeeuwsch-Vlaanderen (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Difesa congiunta da truppe olandesi e dalla 68ª Divisione francese; caduta nelle mani tedesche il 24 maggio 1940.',
  },
  {
    nuts: 'NL342',
    country: 'NL',
    name: 'Overig Zeeland (Walcheren & Vlissingen)',
    capitalOrChefLieu: 'Middelburg',
    keys: ['zeeland', 'walcheren', 'vlissingen', 'middelburg'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Zeeland (Walcheren / Vlissingen)',
    preNote: 'Isole di Walcheren, Zuid-Beveland e Schouwen-Duiveland, con la base navale di Vlissingen e i cantieri navali De Schelde.',
    occName: 'Vlissingen / Walcheren (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete — Marineartillerie Zeeland',
    occNote: 'La resistenza delle truppe olandesi e francesi sulla Linea Bath e Zanddijk continuò fino al 17 maggio 1940, quando Middelburg fu devastata dal fuoco d\'artiglieria tedesco.',
  },

  // --- Utrecht ---
  {
    nuts: 'NL310',
    country: 'NL',
    name: 'Utrecht (Grebbelinie & Waterlinie)',
    capitalOrChefLieu: 'Utrecht',
    keys: ['utrecht', 'amersfoort', 'soest', 'zeist'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Utrecht (Nieuwe Hollandse Waterlinie)',
    preNote: 'Cuore geografico della difesa nazionale, perno di cerniera tra la Grebbelinie a est e la Nieuwe Hollandse Waterlinie a ovest.',
    occName: 'Utrecht (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete — Oberfeldkommandantur Utrecht',
    occNote: 'Minacciata di bombardamento aereo immediato dalla Luftwaffe il 14 maggio 1940 subito dopo Rotterdam, evento che determinò la firma della resa a Rijsoord.',
  },

  // --- Gelderland ---
  {
    nuts: 'NL221',
    country: 'NL',
    name: 'Veluwe (Apeldoorn)',
    capitalOrChefLieu: 'Apeldoorn',
    keys: ['veluwe', 'apeldoorn', 'ede', 'barneveld'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Gelderland (Veluwe)',
    preNote: 'Altopiano collinare boscoso della Veluwe, residenza reale di Het Loo e dorsale della difesa tra l\'IJssel e la Grebbe.',
    occName: 'Veluwe (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Attraversata dal X Corpo d\'Armata tedesco tra l\'11 e il 13 maggio 1940 durante l\'assalto alla Linea Grebbe.',
  },
  {
    nuts: 'NL224',
    country: 'NL',
    name: 'Zuidwest-Gelderland (Betuwe)',
    capitalOrChefLieu: 'Tiel',
    keys: ['zuidwest_gelderland', 'betuwe', 'tiel'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Gelderland (Betuwe)',
    preNote: 'La fertile regione della Betuwe compresa tra il Reno inferiore e il Waal, solcata da canali e dighe fluviali.',
    occName: 'Betuwe (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Occupata il 14 maggio 1940 a seguito dello sfondamento a Rhenen e dell\'aggiramento delle posizioni del Waal.',
  },
  {
    nuts: 'NL225',
    country: 'NL',
    name: 'Achterhoek (Zutphen)',
    capitalOrChefLieu: 'Zutphen',
    keys: ['achterhoek', 'zutphen', 'winterswijk', 'doetinchem'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Gelderland (Achterhoek)',
    preNote: 'Frontiera orientale olandese verso la Vestfalia tedesca e valle dell\'IJssel.',
    occName: 'Achterhoek (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Invasa all\'alba del 10 maggio 1940 dalle divisioni del Gruppo d\'Armate B tedesco.',
  },
  {
    nuts: 'NL226',
    country: 'NL',
    name: 'Arnhem/Nijmegen (Grebbeberg)',
    capitalOrChefLieu: 'Arnhem',
    keys: ['arnhem', 'nijmegen', 'grebbeberg', 'rhenen'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Gelderland (Arnhem / Nijmegen)',
    preNote: 'Ponti monumentali di Arnhem sul Basso Reno e di Nimega sul Waal; baluardo del Grebbeberg a Rhenen fulcro della Grebbelinie.',
    occName: 'Arnhem / Nijmegen (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Teatro della cruenta Battaglia del Grebbeberg (11-13 maggio 1940): l\'8º Reggimento fanteria olandese resistette disperatamente alla divisione SS-Verfügungstruppe prima di cedere per mancanza di rinforzi.',
  },

  // --- Brabante Settentrionale (Noord-Brabant) ---
  {
    nuts: 'NL411',
    country: 'NL',
    name: 'West-Noord-Brabant (Breda)',
    capitalOrChefLieu: 'Breda',
    keys: ['west_noord_brabant', 'breda', 'bergen_op_zoom', 'roosendaal'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Noord-Brabant (Breda)',
    preNote: 'Pianura brabantina verso lo Schelda; obiettivo della marcia in avanti della 7ª Armata francese del generale Henri Giraud per soccorrere gli olandesi.',
    occName: 'Breda (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'I panzer della 9ª Divisione tedesca respinsero le avanguardie corazzate francesi a Breda e Roosendaal l\'11-13 maggio 1940, tagliando i collegamenti con la Vesting Holland.',
  },
  {
    nuts: 'NL412',
    country: 'NL',
    name: 'Midden-Noord-Brabant (Tilburg)',
    capitalOrChefLieu: 'Tilburg',
    keys: ['midden_noord_brabant', 'tilburg', 'waalwijk'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Noord-Brabant (Tilburg)',
    preNote: 'Grande polo manifatturiero e tessile del Brabante centrale lungo il canale Wilhelmina.',
    occName: 'Tilburg (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Occupata il 12 maggio 1940 dalle truppe del generale Schmidt in rotta verso Breda.',
  },
  {
    nuts: 'NL413',
    country: 'NL',
    name: 'Noordoost-Noord-Brabant (\'s-Hertogenbosch)',
    capitalOrChefLieu: '\'s-Hertogenbosch',
    keys: ['s_hertogenbosch', 'den_bosch', 'oss'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Noord-Brabant (\'s-Hertogenbosch)',
    preNote: 'Capoluogo provinciale storico protetto dalla confluenza della Dommel e della Mosa.',
    occName: '\'s-Hertogenbosch (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete — Feldkommandantur Den Bosch',
    occNote: 'Occupata l\'11 maggio 1940 dopo il superamento delle fortificazioni avanzate della Mosa.',
  },
  {
    nuts: 'NL414',
    country: 'NL',
    name: 'Zuidoost-Noord-Brabant (Eindhoven & Peel-Raam)',
    capitalOrChefLieu: 'Eindhoven',
    keys: ['eindhoven', 'peel_raam', 'helmond'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Noord-Brabant (Eindhoven / Peel-Raam)',
    preNote: 'Metropoli industriale e sede mondiale della Philips; linea difensiva campale Peel-Raamstellung a protezione del sud.',
    occName: 'Eindhoven (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'La linea Peel-Raam fu sfondata il 10-11 maggio a Mill e la 9ª Panzer-Division raggiunse Eindhoven il 12 maggio; le officine Philips vennero messe sotto tutela dell\'armamento tedesco.',
  },

  // --- Limburgo Olandese (Limburg) ---
  {
    nuts: 'NL421',
    country: 'NL',
    name: 'Noord-Limburg (Venlo - Venlo Incident)',
    capitalOrChefLieu: 'Venlo',
    keys: ['venlo', 'noord_limburg', 'venlo_incident'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Limburg (Venlo)',
    preNote: 'Porto fluviale sulla Mosa al confine renano; teatro nel novembre 1939 del celebre Incidente di Venlo orchestrato da Walter Schellenberg per incolpare i servizi britannici dell\'attentato di Elser a Hitler.',
    occName: 'Venlo (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Occupata nelle primissime ore del 10 maggio 1940 durante la traversata a sorpresa della Mosa.',
  },
  {
    nuts: 'NL422',
    country: 'NL',
    name: 'Midden-Limburg (Roermond)',
    capitalOrChefLieu: 'Roermond',
    keys: ['roermond', 'midden_limburg', 'weert'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Limburg (Roermond)',
    preNote: 'Confluenza della Roer e della Mosa, snodo ferroviario strategico verso Mönchengladbach e la Ruhr.',
    occName: 'Roermond (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Occupata il 10 maggio 1940 dalle colonne d\'invasione tedesche attraverso la Mosa; piazzaforte di frontiera del Limburgo e snodo ferroviario verso la Germania.',
  },
  {
    nuts: 'NL423',
    country: 'NL',
    name: 'Zuid-Limburg (Maastricht)',
    capitalOrChefLieu: 'Maastricht',
    keys: ['maastricht', 'zuid_limburg', 'heerlen', 'valkenburg_limburg'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Limburg (Maastricht)',
    preNote: 'Capitale storica del Limburgo sulla Mosa, porta d\'ingresso verso l\'Albertkanaal e il Belgio; bacino carbonifero di Heerlen.',
    occName: 'Maastricht (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete — Feldkommandantur Maastricht',
    occNote: 'Occupata il 10-11 maggio 1940: i genieri olandesi fecero saltare i ponti sulla Mosa tranne uno, ma i tedeschi gettarono ponti di barche consentendo ai panzer di raggiungere il Canale Alberto ed Eben-Emael.',
  },

  // --- Overijssel ---
  {
    nuts: 'NL211',
    country: 'NL',
    name: 'Noord-Overijssel (Zwolle)',
    capitalOrChefLieu: 'Zwolle',
    keys: ['zwolle', 'noord_overijssel'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Overijssel (Zwolle)',
    preNote: 'Capoluogo provinciale sull\'IJssel e canale dello Zwarte Water, porta d\'ingresso verso il nord.',
    occName: 'Zwolle (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Occupata l\'11 maggio 1940 dalla 1ª Divisione di Cavalleria della Wehrmacht; capoluogo della provincia dell\'Overijssel e sede di comando militare territoriale tedesco.',
  },
  {
    nuts: 'NL212',
    country: 'NL',
    name: 'Zuidwest-Overijssel (Deventer)',
    capitalOrChefLieu: 'Deventer',
    keys: ['deventer', 'zuidwest_overijssel'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Overijssel (Deventer)',
    preNote: 'Storica città anseatica sull\'IJssel; i ponti fluviali furono fatti saltare dai genieri olandesi il 10 maggio.',
    occName: 'Deventer (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Occupata l\'11 maggio 1940 dopo il guado dell\'IJssel da parte della fanteria tedesca.',
  },
  {
    nuts: 'NL213',
    country: 'NL',
    name: 'Twente (Enschede)',
    capitalOrChefLieu: 'Enschede',
    keys: ['twente', 'enschede', 'hengelo', 'almelo'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Overijssel (Twente)',
    preNote: 'Cuore industriale dell\'Olanda orientale (Enschede, Hengelo, Almelo), polo metallurgico di Stork e fabbriche tessili al confine tedesco.',
    occName: 'Enschede (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Invasa nelle primissime ore del 10 maggio 1940; le industrie pesanti di Hengelo furono convertite a supporto degli armamenti tedeschi.',
  },

  // --- Drenthe ---
  {
    nuts: 'NL131',
    country: 'NL',
    name: 'Noord-Drenthe (Assen)',
    capitalOrChefLieu: 'Assen',
    keys: ['assen', 'noord_drenthe'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Drenthe (Assen)',
    preNote: 'Capoluogo della provincia delle brughiere e dei dolmen (hunebedden).',
    occName: 'Assen (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Occupata l\'11 maggio 1940 durante la manovra a tenaglia verso Groninga e la Frisia.',
  },
  {
    nuts: 'NL132',
    country: 'NL',
    name: 'Zuidoost-Drenthe (Emmen)',
    capitalOrChefLieu: 'Emmen',
    keys: ['emmen', 'zuidoost_drenthe'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Drenthe (Emmen)',
    preNote: 'Vaste torbiere di confine verso la Bassa Sassonia.',
    occName: 'Emmen (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Occupata il 10 maggio 1940 dai reparti motorizzati della Wehrmacht avanzanti nel Drenthe; distretto torbiero e agricolo integrato nel sistema dei rifornimenti del Reich.',
  },
  {
    nuts: 'NL133',
    country: 'NL',
    name: 'Zuidwest-Drenthe (Meppel)',
    capitalOrChefLieu: 'Meppel',
    keys: ['meppel', 'zuidwest_drenthe'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Drenthe (Meppel)',
    preNote: 'Snodo di canali e ferrovia di raccordo tra Overijssel e Drenthe.',
    occName: 'Meppel (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Occupata l\'11 maggio 1940 durante la marcia tedesca verso l\'IJsselmeer; snodo ferroviario e fluviale strategico tra Overijssel e Drenthe nel Reichskommissariat Niederlande.',
  },

  // --- Groninga (Groningen) ---
  {
    nuts: 'NL111',
    country: 'NL',
    name: 'Oost-Groningen (Winschoten)',
    capitalOrChefLieu: 'Winschoten',
    keys: ['oost_groningen', 'winschoten'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Groningen (Oost-Groningen)',
    preNote: 'Campagne orientali di Groninga al confine con la Frisia Orientale tedesca.',
    occName: 'Winschoten (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Occupata la mattina del 10 maggio 1940 da reparti di frontiera della Wehrmacht durante l\'avanzata verso Groninga; presidio doganale orientale del Reichskommissariat Niederlande.',
  },
  {
    nuts: 'NL112',
    country: 'NL',
    name: 'Delfzijl en omgeving (Ems)',
    capitalOrChefLieu: 'Delfzijl',
    keys: ['delfzijl', 'eems'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Groningen (Delfzijl / Ems)',
    preNote: 'Porto marittimo sull\'estuario dell\'Ems di fronte al porto navale tedesco di Emden.',
    occName: 'Delfzijl (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Occupata l\'11 maggio 1940; le sue batterie di costa e il porto passarono sotto sorveglianza della Kriegsmarine.',
  },
  {
    nuts: 'NL113',
    country: 'NL',
    name: 'Overig Groningen (Groningen)',
    capitalOrChefLieu: 'Groningen',
    keys: ['groningen', 'overig_groningen'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Groningen (Groningen)',
    preNote: 'La metropoli e sede universitaria di riferimento di tutti i Paesi Bassi settentrionali.',
    occName: 'Groningen (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete — Feldkommandantur Groningen',
    occNote: 'Occupata l\'11 maggio 1940; divenne il centro amministrativo di controllo per le tre province settentrionali olandesi.',
  },

  // --- Frisia (Friesland) ---
  {
    nuts: 'NL124',
    country: 'NL',
    name: 'Noord-Friesland (Leeuwarden)',
    capitalOrChefLieu: 'Leeuwarden',
    keys: ['leeuwarden', 'noord_friesland'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Friesland (Leeuwarden)',
    preNote: 'Capitale storica e culturale della Frisia e base aerea della Koninklijke Luchtmacht.',
    occName: 'Leeuwarden (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete — Fliegerhorst Leeuwarden',
    occNote: 'Occupata l\'11 maggio 1940; l\'aeroporto di Leeuwarden fu trasformato dalla Luftwaffe in un\'importante base di caccia notturna e bombardieri.',
  },
  {
    nuts: 'NL125',
    country: 'NL',
    name: 'Zuidwest-Friesland (Wonsstelling)',
    capitalOrChefLieu: 'Sneek',
    keys: ['zuidwest_friesland', 'sneek', 'wonsstelling', 'wons'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Friesland (Wonsstelling / Sneek)',
    preNote: 'Comprende Sneek e la *Wonsstelling*, la linea fortificata trincerata olandese predisposta a protezione della testata orientale della grande diga dell\'Afsluitdijk.',
    occName: 'Zuidwest-Friesland (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Teatro della Battaglia della Wonsstelling (10-12 maggio 1940): i fanti olandesi ritardarono l\'avanzata della 1ª Divisione Cavalleria tedesca prima di ripiegare dentro la fortezza inespugnabile di Kornwerderzand.',
  },
  {
    nuts: 'NL126',
    country: 'NL',
    name: 'Zuidoost-Friesland (Heerenveen)',
    capitalOrChefLieu: 'Heerenveen',
    keys: ['zuidoost_friesland', 'heerenveen', 'drachten'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Provincie Friesland (Heerenveen)',
    preNote: 'Distretto agricolo e canali interni delle torbiere frisone.',
    occName: 'Heerenveen (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Occupata l\'11 maggio 1940 durante la rapida manovra tedesca verso lo Zuiderzee; centro agricolo e snodo fluviale della Frisia sotto amministrazione civile d\'occupazione.',
  },

  // --- Flevoland / Zuiderzee ---
  {
    nuts: 'NL230',
    country: 'NL',
    name: 'Flevoland / Zuiderzeewerken',
    capitalOrChefLieu: 'Noordoostpolder',
    keys: ['flevoland', 'zuiderzeewerken', 'noordoostpolder', 'ijsselmeer'],
    preAdminTitle: 'Koninkrijk der Nederlanden — Zuiderzeewerken (Noordoostpolder)',
    preNote: 'L\'epico piano ingegneristico di bonifica dello Zuiderzee trasformato in IJsselmeer; negli anni 1936-1940 era in corso il prosciugamento del Noordoostpolder (48.000 ettari), completato nel 1942.',
    occName: 'Zuiderzee / Noordoostpolder (Reichskommissariat Niederlande)',
    occAdminTitle: 'Reichskommissariat für die besetzten niederländischen Gebiete',
    occNote: 'Sotto occupazione dal 15 maggio 1940; le opere di prosciugamento e arginamento continuarono sotto supervisione tecnica controllata.',
  },

  // =========================================================================
  // LUSSEMBURGO (1 NUTS-3)
  // =========================================================================
  {
    nuts: 'LU000',
    country: 'LU',
    name: 'Grand-Duché de Luxembourg / Groussherzogtum Lëtzebuerg',
    capitalOrChefLieu: 'Luxembourg',
    keys: ['luxembourg', 'luxemburg', 'letzebuerg', 'grand_duche', 'lu000'],
    preAdminTitle: 'Grand-Duché de Luxembourg — Gouvernement Dupong-Krier',
    preNote: 'Stato sovrano neutrale disarmato in virtù del Trattato di Londra del 1867. Retto dalla Granduchessa Carlotta (Charlotte) e dal primo ministro Pierre Dupong; difeso unicamente dal piccolo Corpo dei Gendarmi e Volontari e dalla linea di sbarramenti d\'acciaio Schuster-Linn.',
    occName: 'Luxemburg (CdZ-Gebiet Moselland)',
    occAdminTitle: 'Deutsches Reich — Chef der Zivilverwaltung Luxemburg (Gauleiter Gustav Simon, Gau Moselland)',
    occNote: 'ANNESSIONE DE FACTO AL TERZO REICH: Invaso la mattina del 10 maggio 1940 senza preavviso. La Granduchessa e il governo ripararono all\'estero. Nell\'agosto 1940 il territorio fu sottoposto all\'amministrazione civile del Gauleiter Gustav Simon (CdZ-Gebiet Luxemburg), integrato nel Gau Moselland, germanizzato forzatamente e la sua gioventù costretta alla leva nella Wehrmacht.',
    isDirectAnnexation: true,
  },
];

/**
 * Risoluzione toponomastica, istituzionale e temporale dettagliata per Benelux (1936-1940)
 */
export function resolveBeneluxToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;

  // 1. Cerca match tra gli 85 distretti
  let found: BeneluxDistrictDef | undefined;

  if (id.startsWith('BE') || id.startsWith('NL') || id.startsWith('LU')) {
    found = BENELUX_DISTRICTS_CATALOG.find((d) => d.nuts === id);
  }

  if (!found) {
    const normTokens = normKey.split('_').filter(Boolean);
    for (const d of BENELUX_DISTRICTS_CATALOG) {
      if (d.keys.some((k) => normKey === k || normTokens.includes(k) || (k.length >= 5 && normKey.includes(k)))) {
        found = d;
        break;
      }
    }
  }

  if (found) {
    const d = found;
    // Step >= 6: Occupazione militare tedesca o annessione diretta
    if (step >= 6) {
      return {
        name: d.occName,
        adminTitle: d.occAdminTitle,
        note: d.occNote,
      };
    }

    // Step 0..5: Sovranità pre-invasione neutrale
    return {
      name: d.name,
      adminTitle: d.preAdminTitle,
      note: d.preNote,
    };
  }

  return null;
}


/**
 * Funzione di ricerca e normalizzazione toponimi con fuzzy matching e lookup NUTS-3/ISO.
 */
export interface SwissAustrianDistrictDef {
  nuts: string;
  country: 'CH' | 'AT' | 'LI';
  name: string;
  capitalOrChefLieu: string;
  keys: string[];
  preAdminTitle: string;
  preNote: string;
  postName?: string;
  postAdminTitle?: string;
  postNote?: string;
}

export const SWISS_AUSTRIAN_DISTRICTS_CATALOG: SwissAustrianDistrictDef[] = [
  {
    "nuts": "CH011",
    "country": "CH",
    "name": "Canton Vaud / Waadt (Lausanne)",
    "capitalOrChefLieu": "Lausanne",
    "keys": [
      "vaud",
      "waadt",
      "lausanne",
      "ch011"
    ],
    "preAdminTitle": "Confédération suisse — Canton de Vaud",
    "preNote": "Cantone francofono affacciato sul Lago Lemano (Lac Léman) e culla del vigneto di Lavaux. Cerniera nord-occidentale della linea fortificata di Saint-Maurice e della difesa delle Prealpi vodesi."
  },
  {
    "nuts": "CH012",
    "country": "CH",
    "name": "Canton du Valais / Kanton Wallis (Sion)",
    "capitalOrChefLieu": "Sion",
    "keys": [
      "valais",
      "wallis",
      "sion",
      "sitten",
      "ch012"
    ],
    "preAdminTitle": "Confédération suisse — Canton du Valais / Kanton Wallis",
    "preNote": "Cantone alpino bilingue lungo l'alta valle del Rodano dominato dalle cime del Cervino e del Monte Rosa. Settore cardine del Ridotto Nazionale (Schweizer Réduit) imperniato sulla formidabile Festung Saint-Maurice (Forti Cindey, Dailly e Savatan)."
  },
  {
    "nuts": "CH013",
    "country": "CH",
    "name": "République et Canton de Genève (Genf)",
    "capitalOrChefLieu": "Genève",
    "keys": [
      "geneve",
      "genf",
      "ginevra",
      "geneva",
      "ch013"
    ],
    "preAdminTitle": "Confédération suisse — Canton de Genève",
    "preNote": "Cantone francofono incastonato tra il Lago Lemano e il territorio francese. Sede del Palazzo delle Nazioni (Società delle Nazioni) e del Comitato Internazionale della Croce Rossa (CICR) guidato da Max Huber."
  },
  {
    "nuts": "CH021",
    "country": "CH",
    "name": "Kanton Bern / Canton de Berne (Berna)",
    "capitalOrChefLieu": "Bern",
    "keys": [
      "bern",
      "berne",
      "berna",
      "ch021"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Bundesstadt Bern (Kanton Bern)",
    "preNote": "Capitale federale della Confederazione Svizzera, sede del Consiglio Federale e del Parlamento (Bundeshaus). Nell'Oberland bernese (Thun, Interlaken, Meiringen) sorgevano i centri di comando sotterranei, gli arsenali e le basi aeree scavate nella roccia del Réduit National."
  },
  {
    "nuts": "CH022",
    "country": "CH",
    "name": "Canton de Fribourg / Kanton Freiburg",
    "capitalOrChefLieu": "Fribourg",
    "keys": [
      "fribourg",
      "freiburg",
      "ch022"
    ],
    "preAdminTitle": "Confédération suisse — Canton de Fribourg / Kanton Freiburg",
    "preNote": "Cantone bilingue a maggioranza cattolica tra l'Altopiano e le Prealpi friburghesi; prestigiosa sede universitaria cattolica e retrovia delle posizioni difensive delle Alpi occidentali."
  },
  {
    "nuts": "CH023",
    "country": "CH",
    "name": "Kanton Solothurn (Soletta)",
    "capitalOrChefLieu": "Solothurn",
    "keys": [
      "solothurn",
      "soletta",
      "soleure",
      "ch023"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Kanton Solothurn",
    "preNote": "Antica residenza degli ambasciatori di Francia lungo il fiume Aare; centro manifatturiero dell'orologeria e meccanica di precisione ai piedi del Giura."
  },
  {
    "nuts": "CH024",
    "country": "CH",
    "name": "République et Canton de Neuchâtel (Neuenburg)",
    "capitalOrChefLieu": "Neuchâtel",
    "keys": [
      "neuchatel",
      "neuenburg",
      "ch024"
    ],
    "preAdminTitle": "Confédération suisse — Canton de Neuchâtel",
    "preNote": "Cantone francofono sulle rive del lago omonimo; distretto mondiale dell'orologeria industriale di precisione (La Chaux-de-Fonds, Le Locle) e presidio confinaria sui valichi del Giura verso la Francia."
  },
  {
    "nuts": "CH025",
    "country": "CH",
    "name": "Canton du Jura (Berner Jura / Giura Bernese)",
    "capitalOrChefLieu": "Delémont",
    "keys": [
      "jura",
      "delemont",
      "delsberg",
      "berner_jura",
      "ch025"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Berner Jura (Kanton Bern)",
    "preNote": "Regione montuosa francofona all'epoca facente parte del Canton Berna (Giura bernese); controllava la stretta strategica della Porta di Borgogna (Trouée de Belfort) a ridosso del confine francese."
  },
  {
    "nuts": "CH031",
    "country": "CH",
    "name": "Kanton Basel-Stadt (Basilea Città)",
    "capitalOrChefLieu": "Basel",
    "keys": [
      "basel_stadt",
      "basel",
      "basilea",
      "bale",
      "ch031"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Kanton Basel-Stadt",
    "preNote": "Metropoli portuale sul Reno e fulcro della triplice frontiera Svizzera-Francia-Germania. Sede della Banca dei Regolamenti Internazionali (BRI) e dei colossi chimici Ciba, Sandoz e Geigy; direttamente esposta alle artiglierie tedesche e francesi."
  },
  {
    "nuts": "CH032",
    "country": "CH",
    "name": "Kanton Basel-Landschaft (Basilea Campagna)",
    "capitalOrChefLieu": "Liestal",
    "keys": [
      "basel_landschaft",
      "liestal",
      "ch032"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Kanton Basel-Landschaft",
    "preNote": "Fascia collinare del Giura tabulare a sud di Basilea; catena di sbarramenti d'arresto dell'Hauenstein munita di bunker e cavalli di frisia contro eventuali sfondamenti tedeschi verso Berna."
  },
  {
    "nuts": "CH033",
    "country": "CH",
    "name": "Kanton Aargau (Argovia)",
    "capitalOrChefLieu": "Aarau",
    "keys": [
      "aargau",
      "argovia",
      "aarau",
      "baden_ch",
      "ch033"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Kanton Aargau",
    "preNote": "Cantone dell'Acqua (Wasserschloss) alla confluenza di Aare, Reuss e Limmat. Sede degli stabilimenti elettromeccanici Brown Boveri (BBC) a Baden e perno occidentale della linea fortificata della Limmat (Limmatstellung)."
  },
  {
    "nuts": "CH040",
    "country": "CH",
    "name": "Kanton Zürich (Zurigo)",
    "capitalOrChefLieu": "Zürich",
    "keys": [
      "zurich",
      "zuerich",
      "zurigo",
      "ch040"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Kanton Zürich",
    "preNote": "Capitale economica, finanziaria e industriale della Svizzera. Sede del polo d'armamenti Werkzeugmaschinenfabrik Oerlikon-Bührle (cannoni antiaerei da 20 mm) e perno orientale della Limmatstellung a protezione dell'Altopiano."
  },
  {
    "nuts": "CH051",
    "country": "CH",
    "name": "Kanton Glarus (Glarona)",
    "capitalOrChefLieu": "Glarus",
    "keys": [
      "glarus",
      "glarona",
      "ch051"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Kanton Glarus",
    "preNote": "Cantone alpino imperniato sulla valle della Linth tra i laghi di Zurigo e Walen; via d'accesso montuosa settentrionale al massiccio del San Gottardo e al nucleo del Ridotto Nazionale."
  },
  {
    "nuts": "CH052",
    "country": "CH",
    "name": "Kanton Schaffhausen (Sciaffusa)",
    "capitalOrChefLieu": "Schaffhausen",
    "keys": [
      "schaffhausen",
      "sciaffusa",
      "ch052"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Kanton Schaffhausen",
    "preNote": "Unico cantone svizzero quasi interamente situato a nord del Reno, completamente circondato dal territorio tedesco (Baden). Centro siderurgico e meccanico (Georg Fischer) e sede delle celebri Cascate del Reno."
  },
  {
    "nuts": "CH053",
    "country": "CH",
    "name": "Kanton Appenzell Ausserrhoden (Herisau)",
    "capitalOrChefLieu": "Herisau",
    "keys": [
      "appenzell_ausserrhoden",
      "herisau",
      "ch053"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Kanton Appenzell Ausserrhoden",
    "preNote": "Cantone prealpino protestante di antica tradizione tessile e democratica; sede della storica Landsgemeinde popolare all'aperto."
  },
  {
    "nuts": "CH054",
    "country": "CH",
    "name": "Kanton Appenzell Innerrhoden (Appenzello)",
    "capitalOrChefLieu": "Appenzell",
    "keys": [
      "appenzell_innerrhoden",
      "appenzell",
      "ch054"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Kanton Appenzell Innerrhoden",
    "preNote": "Cantone alpino cattolico alle pendici del massiccio del Säntis; celebre per l'inalterata tradizione della democrazia diretta della Landsgemeinde."
  },
  {
    "nuts": "CH055",
    "country": "CH",
    "name": "Kanton St. Gallen (San Gallo & Sargans)",
    "capitalOrChefLieu": "St. Gallen",
    "keys": [
      "st_gallen",
      "sankt_gallen",
      "san_gallo",
      "sargans",
      "ch055"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Kanton St. Gallen",
    "preNote": "Esteso dal Lago di Costanza alla Valle del Reno alpino; sede dell'antica abbazia e soprattutto della Festung Sargans (Forti Magletsch, Schollberg, Furggels), perno difensivo est del Réduit National a guardia dei confini con Austria e Liechtenstein."
  },
  {
    "nuts": "CH056",
    "country": "CH",
    "name": "Kanton Graubünden / Chantun Grischun / Cantone dei Grigioni (Chur)",
    "capitalOrChefLieu": "Chur",
    "keys": [
      "graubunden",
      "graubuenden",
      "grischun",
      "grigioni",
      "chur",
      "coira",
      "davos",
      "engadin",
      "ch056"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Kanton Graubünden / Chantun Grischun",
    "preNote": "Il più esteso cantone della Svizzera, trilingue (tedesco, romancio, italiano). Presidio dei valichi alpini (Bernina, Spluga, San Bernardino, Julier); settore orientale del Réduit (Sbarramento di Trin) a sbarramento delle valli verso l'Italia e il Tirolo."
  },
  {
    "nuts": "CH057",
    "country": "CH",
    "name": "Kanton Thurgau (Turgovia)",
    "capitalOrChefLieu": "Frauenfeld",
    "keys": [
      "thurgau",
      "turgovia",
      "frauenfeld",
      "bodensee",
      "ch057"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Kanton Thurgau",
    "preNote": "Cantone agricolo e frutticolo affacciato sulla riva meridionale del Lago di Costanza (Bodensee) e del Basso Reno, dirimpetto al Baden e al Württemberg tedeschi."
  },
  {
    "nuts": "CH061",
    "country": "CH",
    "name": "Kanton Luzern (Lucerna)",
    "capitalOrChefLieu": "Luzern",
    "keys": [
      "luzern",
      "lucerna",
      "ch061"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Kanton Luzern",
    "preNote": "Cantone cattolico sulle rive del Lago dei Quattro Cantoni (Vierwaldstättersee); porta settentrionale verso le Prealpi e il massiccio del San Gottardo."
  },
  {
    "nuts": "CH062",
    "country": "CH",
    "name": "Kanton Uri (Massiccio del San Gottardo & Rütli)",
    "capitalOrChefLieu": "Altdorf",
    "keys": [
      "uri",
      "altdorf",
      "gotthard",
      "gottardo",
      "andermatt",
      "rutli",
      "ruetli",
      "ch062"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Kanton Uri",
    "preNote": "Cantone primitivo del Patto del 1291 e cuore sacro della nazione. Ospita il praticello del Rütli (teatro dello storico Rapporto di Henri Guisan del 25 luglio 1940) e la Festung Gotthard (Andermatt, Hospiz, Gütsch, Schöllenen), fortezza sotterranea centrale del Ridotto Nazionale."
  },
  {
    "nuts": "CH063",
    "country": "CH",
    "name": "Kanton Schwyz (Svitto)",
    "capitalOrChefLieu": "Schwyz",
    "keys": [
      "schwyz",
      "svitto",
      "ch063"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Kanton Schwyz",
    "preNote": "Cantone eponimo che dà il nome alla Svizzera; custode dell'Archivio federale dei Patti giurati e sbarramento montuoso d'accesso al San Gottardo tra i laghi di Zurigo e Lucerna."
  },
  {
    "nuts": "CH064",
    "country": "CH",
    "name": "Kanton Obwalden (Obvaldo)",
    "capitalOrChefLieu": "Sarnen",
    "keys": [
      "obwalden",
      "obvaldo",
      "sarnen",
      "engelberg",
      "alpnach",
      "ch064"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Kanton Obwalden",
    "preNote": "Cantone alpino della Svizzera centrale (Sarnen, Engelberg); ospitava la base aerea militare sotterranea e rifugio di comando per lo stato maggiore federale ad Alpnach."
  },
  {
    "nuts": "CH065",
    "country": "CH",
    "name": "Kanton Nidwalden (Nidvaldo)",
    "capitalOrChefLieu": "Stans",
    "keys": [
      "nidwalden",
      "nidvaldo",
      "stans",
      "ch065"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Kanton Nidwalden",
    "preNote": "Cantone lacustre ai piedi del monte Bürgenstock sul Lago dei Quattro Cantoni; sede degli stabilimenti aeronautici militari Pilatus Flugzeugwerke a Stans."
  },
  {
    "nuts": "CH066",
    "country": "CH",
    "name": "Kanton Zug (Zugo)",
    "capitalOrChefLieu": "Zug",
    "keys": [
      "zug",
      "zugo",
      "ch066"
    ],
    "preAdminTitle": "Schweizerische Eidgenossenschaft — Kanton Zug",
    "preNote": "Cantone cerniera tra l'Altopiano zurighese e i cantoni montani primitivi; nodo di traffici commerciali e agricoli attorno al Lago di Zugo."
  },
  {
    "nuts": "CH070",
    "country": "CH",
    "name": "Repubblica e Cantone Ticino (Bellinzona & Lugano)",
    "capitalOrChefLieu": "Bellinzona",
    "keys": [
      "ticino",
      "tessin",
      "bellinzona",
      "lugano",
      "locarno",
      "chiasso",
      "ch070"
    ],
    "preAdminTitle": "Confederazione Svizzera — Repubblica e Cantone Ticino",
    "preNote": "Unico cantone interamente di lingua e cultura italiana a sud delle Alpi. Attraversato dalla ferrovia strategica del San Gottardo; sbarramento fortificato della linea Lona a Lodrino e valico internazionale di Chiasso a guardia del confine con l'Italia fascista."
  },
  {
    "nuts": "LI000",
    "country": "LI",
    "name": "Fürstentum Liechtenstein (Vaduz)",
    "capitalOrChefLieu": "Vaduz",
    "keys": [
      "liechtenstein",
      "vaduz",
      "li000"
    ],
    "preAdminTitle": "Fürstentum Liechtenstein — Fürst Franz Josef II.",
    "preNote": "Principato sovrano alpino retto dal Principe Francesco Giuseppe II (Franz Josef II). Vincolato alla Svizzera da unione doganale e monetaria (1923-24); mantenne una rigorosa neutralità disarmata pur rimanendo completamente circondato dal Terzo Reich dopo l'Anschluss austriaco.",
    "postName": "Fürstentum Liechtenstein (Neutral / Zollunion Schweiz)",
    "postAdminTitle": "Fürstentum Liechtenstein (Souveränes Fürstentum)",
    "postNote": "Principato sovrano alpino neutrale nella valle del Reno; preservò la propria sovranità e indipendenza grazie all'unione doganale e monetaria con la Confederazione Svizzera."
  },
  {
    "nuts": "AT130",
    "country": "AT",
    "name": "Bundeshauptstadt Wien (Vienna)",
    "capitalOrChefLieu": "Wien",
    "keys": [
      "wien",
      "vienna",
      "at130"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Bundeshauptstadt Wien",
    "preNote": "Capitale federale dell'Austria (Ständestaat) sotto il cancelliere Kurt Schuschnigg e il presidente Wilhelm Miklas. Cuore politico, culturale e finanziario dell'Europa danubiana.",
    "postName": "Reichsgau Wien (Groß-Wien)",
    "postAdminTitle": "Deutsches Reich — Reichsgau Wien (Groß-Wien)",
    "postNote": "ANSCHLUSS (12-13 marzo 1938): Annessa al Terzo Reich ed espansa nell'ottobre 1938 a 26 distretti urbani (Groß-Wien). Amministrata dai Gauleiter Odilo Globocnik (1938-39), Josef Bürckel (1939-40) e Baldur von Schirach (1940-45)."
  },
  {
    "nuts": "AT121",
    "country": "AT",
    "name": "Mostviertel-Eisenwurzen (Amstetten)",
    "capitalOrChefLieu": "Amstetten",
    "keys": [
      "mostviertel",
      "amstetten",
      "waidhofen",
      "at121"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Niederösterreich (Mostviertel)",
    "preNote": "Regione sud-occidentale della Bassa Austria ricca di frutteti e officine di lavorazione del ferro lungo il fiume Ybbs.",
    "postName": "Reichsgau Niederdonau — Kreis Amstetten (Mostviertel)",
    "postAdminTitle": "Deutsches Reich — Reichsgau Niederdonau (Sitz Krems an der Donau)",
    "postNote": "Integrato nel Reichsgau Niederdonau retto dal Gauleiter Dr. Hugo Jury; produzione metallurgica convertita a scopi bellici."
  },
  {
    "nuts": "AT122",
    "country": "AT",
    "name": "Niederösterreich-Süd (Wiener Neustadt)",
    "capitalOrChefLieu": "Wiener Neustadt",
    "keys": [
      "wiener_neustadt",
      "neunkirchen",
      "at122"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Niederösterreich (Wiener Neustadt)",
    "preNote": "Polo industriale strategico della Bassa Austria meridionale; sede della storica Accademia Militare Teresiana e delle acciaierie e officine meccaniche.",
    "postName": "Reichsgau Niederdonau — Wiener Neustadt (WNF / Messerschmitt)",
    "postAdminTitle": "Deutsches Reich — Reichsgau Niederdonau",
    "postNote": "Convertito nel massimo polo aeronautico austriaco del Reich: le Wiener Neustädter Flugzeugwerke (WNF) vi producevano centinaia di caccia Messerschmitt Bf 109 al mese."
  },
  {
    "nuts": "AT123",
    "country": "AT",
    "name": "Sankt Pölten (St. Pölten)",
    "capitalOrChefLieu": "Sankt Pölten",
    "keys": [
      "sankt_polten",
      "st_polten",
      "at123"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Niederösterreich (Sankt Pölten)",
    "preNote": "Centro episcopale e primario snodo ferroviario sulla linea Vienna-Linz; insediamenti industriali e tessili nella valle della Traisen.",
    "postName": "Reichsgau Niederdonau — Kreis Sankt Pölten",
    "postAdminTitle": "Deutsches Reich — Reichsgau Niederdonau",
    "postNote": "Snodo di rifornimento e officine ferroviarie militarizzate della Deutsche Reichsbahn nel Reichsgau Niederdonau."
  },
  {
    "nuts": "AT124",
    "country": "AT",
    "name": "Waldviertel (Krems an der Donau)",
    "capitalOrChefLieu": "Krems an der Donau",
    "keys": [
      "waldviertel",
      "krems",
      "zwettl",
      "at124"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Niederösterreich (Waldviertel)",
    "preNote": "Altopiano granitico e boscoso a nord del Danubio al confine con la Boemia; Krems porto fluviale storico e centro vinicolo della Wachau.",
    "postName": "Reichsgau Niederdonau — Gauhauptstadt Krems an der Donau",
    "postAdminTitle": "Deutsches Reich — Gauhauptstadt des Reichsgaues Niederdonau",
    "postNote": "Kreisstadt e designata Gauhauptstadt del Reichsgau Niederdonau, sede del Gauleiter Dr. Hugo Jury; nell'area sorgeva il poligono militare di Döllersheim."
  },
  {
    "nuts": "AT125",
    "country": "AT",
    "name": "Weinviertel (Mistelbach & Zistersdorf)",
    "capitalOrChefLieu": "Mistelbach",
    "keys": [
      "weinviertel",
      "mistelbach",
      "hollabrunn",
      "zistersdorf",
      "at125"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Niederösterreich (Weinviertel)",
    "preNote": "Regione collinare nord-orientale; nel 1930 a Zistersdorf venne scoperto il primo grande giacimento petrolifero austriaco.",
    "postName": "Reichsgau Niederdonau — Erdölfeld Zistersdorf (Weinviertel)",
    "postAdminTitle": "Deutsches Reich — Reichsgau Niederdonau",
    "postNote": "I pozzi petroliferi di Zistersdorf divennero la principale fonte di petrolio greggio continentale del Terzo Reich, essenziale per lo sforzo bellico motorizzato."
  },
  {
    "nuts": "AT126",
    "country": "AT",
    "name": "Wiener Umland/Nordteil (Korneuburg & Marchfeld)",
    "capitalOrChefLieu": "Korneuburg",
    "keys": [
      "korneuburg",
      "ganserndorf",
      "marchfeld",
      "at126"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Niederösterreich (Korneuburg)",
    "preNote": "Piana agricola del Marchfeld e cantieri fluviali di Korneuburg sul Danubio; storico campo di battaglia imperiale lungo il fiume March.",
    "postName": "Reichsgau Niederdonau — Schiffswerft Korneuburg",
    "postAdminTitle": "Deutsches Reich — Reichsgau Niederdonau",
    "postNote": "I cantieri navali di Korneuburg vennero requisiti dalla Kriegsmarine per la produzione di chiatte da sbarco (Marinefährprahm) per il Danubio e il Mar Nero."
  },
  {
    "nuts": "AT127",
    "country": "AT",
    "name": "Wiener Umland/Südteil (Mödling & Baden)",
    "capitalOrChefLieu": "Mödling",
    "keys": [
      "modling",
      "moedling",
      "baden",
      "at127"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Niederösterreich (Baden/Mödling)",
    "preNote": "Elegante fascia suburbana termale e vinicola del Wienerwald; Baden sede di rappresentanza e ville storiche aristocratiche.",
    "postName": "Reichsgau Niederdonau — Mödling & Baden (Wienerwald)",
    "postAdminTitle": "Deutsches Reich — Reichsgau Niederdonau",
    "postNote": "Integrato parzialmente nell'area metropolitana della Groß-Wien e nel Reichsgau Niederdonau sotto occupazione nazista."
  },
  {
    "nuts": "AT111",
    "country": "AT",
    "name": "Mittelburgenland (Oberpullendorf)",
    "capitalOrChefLieu": "Oberpullendorf",
    "keys": [
      "mittelburgenland",
      "oberpullendorf",
      "at111"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Burgenland (Mittelburgenland)",
    "preNote": "Settore centrale del Burgenland a forte tradizione agricola e con presenza di minoranza croata del Burgenland.",
    "postName": "Reichsgau Niederdonau — Kreis Oberpullendorf (Burgenland)",
    "postAdminTitle": "Deutsches Reich — Reichsgau Niederdonau (Ostmarkgesetz 1938)",
    "postNote": "SOPPRESSIONE DEL BURGENLAND: Con la legge Ostmarkgesetz del 15 ottobre 1938 il Burgenland venne dissolto; il distretto di Oberpullendorf fu annesso al Reichsgau Niederdonau."
  },
  {
    "nuts": "AT112",
    "country": "AT",
    "name": "Nordburgenland (Eisenstadt & Neusiedler See)",
    "capitalOrChefLieu": "Eisenstadt",
    "keys": [
      "nordburgenland",
      "eisenstadt",
      "neusiedl",
      "at112"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Landeshauptstadt Eisenstadt (Burgenland)",
    "preNote": "Capoluogo del Burgenland austriaco (residenza storica dei principi Esterházy e di Haydn) affacciato sul Lago di Neusiedl al confine con l'Ungheria.",
    "postName": "Reichsgau Niederdonau — Eisenstadt (Ex-Burgenland)",
    "postAdminTitle": "Deutsches Reich — Reichsgau Niederdonau (Ostmarkgesetz 1938)",
    "postNote": "Burgenland soppresso nell'ottobre 1938: Eisenstadt e il circondario del lago furono smembrati e annessi al Reichsgau Niederdonau."
  },
  {
    "nuts": "AT113",
    "country": "AT",
    "name": "Südburgenland (Oberwart & Güssing)",
    "capitalOrChefLieu": "Oberwart",
    "keys": [
      "sudburgenland",
      "suedburgenland",
      "oberwart",
      "gussing",
      "jennersdorf",
      "at113"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Burgenland (Südburgenland)",
    "preNote": "Fascia meridionale del Burgenland al confine con Stiria, Ungheria e Jugoslavia; popolazione mista germanofona, magiara e rom.",
    "postName": "Reichsgau Steiermark — Kreise Oberwart & Güssing (Ex-Burgenland)",
    "postAdminTitle": "Deutsches Reich — Reichsgau Steiermark (Ostmarkgesetz 1938)",
    "postNote": "Burgenland soppresso nell'ottobre 1938: la parte meridionale (Oberwart, Güssing, Jennersdorf) venne annessa al Reichsgau Steiermark."
  },
  {
    "nuts": "AT311",
    "country": "AT",
    "name": "Innviertel (Braunau am Inn & Ried)",
    "capitalOrChefLieu": "Braunau am Inn",
    "keys": [
      "innviertel",
      "braunau",
      "ried",
      "scharding",
      "at311"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Oberösterreich (Innviertel)",
    "preNote": "Regione agricola e fluviale lungo il fiume Inn di fronte alla Baviera; Braunau am Inn città natale di Adolf Hitler.",
    "postName": "Reichsgau Oberdonau — Kreis Braunau am Inn",
    "postAdminTitle": "Deutsches Reich — Reichsgau Oberdonau",
    "postNote": "Distretto natale del Führer elevato a luogo di culto propagandistico dal partito nazista nel Reichsgau Oberdonau."
  },
  {
    "nuts": "AT312",
    "country": "AT",
    "name": "Linz-Wels (Linz an der Donau)",
    "capitalOrChefLieu": "Linz",
    "keys": [
      "linz",
      "wels",
      "mauthausen",
      "at312"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Landeshauptstadt Linz (Oberösterreich)",
    "preNote": "Capoluogo dell'Alta Austria sulle rive del Danubio; importante snodo ferroviario e porto commerciale tra Vienna e la Baviera.",
    "postName": "Reichsgau Oberdonau — Patenstadt Linz (Hermann-Göring-Werke & KZ Mauthausen)",
    "postAdminTitle": "Deutsches Reich — Gauhauptstadt des Reichsgaues Oberdonau",
    "postNote": "Designata Patenstadt des Führers da Hitler; insediato il titanico complesso industriale bellico delle Reichswerke Hermann Göring e il campo di concentramento di Mauthausen (agosto 1938). Gauleiter August Eigruber."
  },
  {
    "nuts": "AT313",
    "country": "AT",
    "name": "Mühlviertel (Freistadt & Rohrbach)",
    "capitalOrChefLieu": "Freistadt",
    "keys": [
      "muhlviertel",
      "muehlviertel",
      "freistadt",
      "rohrbach",
      "at313"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Oberösterreich (Mühlviertel)",
    "preNote": "Regione collinare e granitica a nord del Danubio estesa fino alla Selva Boema (Böhmerwald) al confine con la Cecoslovacchia.",
    "postName": "Reichsgau Oberdonau — Mühlviertel",
    "postAdminTitle": "Deutsches Reich — Reichsgau Oberdonau",
    "postNote": "Fascia di confine con il Protettorato di Boemia e Moravia e base d'avanzata per le divisioni della Wehrmacht nell'autunno 1938."
  },
  {
    "nuts": "AT314",
    "country": "AT",
    "name": "Steyr-Kirchdorf (Steyr)",
    "capitalOrChefLieu": "Steyr",
    "keys": [
      "steyr",
      "kirchdorf",
      "at314"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Oberösterreich (Steyr)",
    "preNote": "Storica città delle armi e fonderie alla confluenza dell'Enns e dello Steyr; colosso industriale della Steyr-Werke AG.",
    "postName": "Reichsgau Oberdonau — Rüstungszentrum Steyr-Daimler-Puch AG",
    "postAdminTitle": "Deutsches Reich — Reichsgau Oberdonau",
    "postNote": "Gli stabilimenti Steyr-Daimler-Puch AG divennero uno dei massimi centri di produzione di armi da fuoco leggere, munizioni, cuscinetti a sfera e autocarri militari della Wehrmacht."
  },
  {
    "nuts": "AT315",
    "country": "AT",
    "name": "Traunviertel (Gmunden & Salzkammergut)",
    "capitalOrChefLieu": "Gmunden",
    "keys": [
      "traunviertel",
      "gmunden",
      "vocklabruck",
      "salzkammergut",
      "at315"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Oberösterreich (Traunviertel)",
    "preNote": "Regione alpina e lacustre del Salzkammergut (Traunsee, Attersee); ricca di storiche miniere di salgemma e bacini chimici.",
    "postName": "Reichsgau Oberdonau — Salzkammergut (Traunviertel)",
    "postAdminTitle": "Deutsches Reich — Reichsgau Oberdonau",
    "postNote": "Bacino industriale e minerario integrato nel Reichsgau Oberdonau; in seguito rifugio di riserve auree e opere d'arte razziate dal regime."
  },
  {
    "nuts": "AT321",
    "country": "AT",
    "name": "Lungau (Tamsweg)",
    "capitalOrChefLieu": "Tamsweg",
    "keys": [
      "lungau",
      "tamsweg",
      "at321"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Salzburg (Bezirk Tamsweg)",
    "preNote": "Valle alpina interna protetta dalle vette dei Tauri; distretto agricolo montano e forestale del Salisburghese.",
    "postName": "Reichsgau Salzburg — Kreis Tamsweg (Lungau)",
    "postAdminTitle": "Deutsches Reich — Reichsgau Salzburg (Alpen- und Donau-Reichsgaue)",
    "postNote": "Distretto alpino d'alta quota del Lungau integrato nel Reichsgau Salzburg (Alpen- und Donau-Reichsgaue) sotto la guida del Gauleiter Friedrich Rainer; presidio strategico montano dei Tauri e riserva forestale."
  },
  {
    "nuts": "AT322",
    "country": "AT",
    "name": "Pinzgau-Pongau (Zell am See & Gastein)",
    "capitalOrChefLieu": "Zell am See",
    "keys": [
      "pinzgau",
      "pongau",
      "zell_am_see",
      "st_johann",
      "gastein",
      "at322"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Salzburg (Pinzgau & Pongau)",
    "preNote": "Regione alpina dominata dagli Alti Tauri (Großglockner) e dalla valle di Gastein; centri idroelettrici e stazioni climatiche alpine.",
    "postName": "Reichsgau Salzburg — Pinzgau & Pongau (Hohe Tauern)",
    "postAdminTitle": "Deutsches Reich — Reichsgau Salzburg",
    "postNote": "Bacino idroelettrico primario (costruzione dei bacini di Kaprun) e nodo ferroviario verso il Tirolo e la Carinzia."
  },
  {
    "nuts": "AT323",
    "country": "AT",
    "name": "Salzburg und Umgebung (Salisburgo)",
    "capitalOrChefLieu": "Salzburg",
    "keys": [
      "salzburg",
      "salisburgo",
      "flachgau",
      "at323"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Landeshauptstadt Salzburg",
    "preNote": "Città principesca vescovile dominata dalla fortezza Hohensalzburg; patria di Mozart e sede del prestigioso Festival di Salisburgo.",
    "postName": "Reichsgau Salzburg — Gauhauptstadt Salzburg",
    "postAdminTitle": "Deutsches Reich — Gauhauptstadt des Reichsgaues Salzburg",
    "postNote": "Capitale del Reichsgau Salzburg (Gauleiter Friedrich Rainer); contigua al complesso montano di Berchtesgaden e Obersalzberg (Kehlsteinhaus) residenza di Hitler al confine bavarese."
  },
  {
    "nuts": "AT221",
    "country": "AT",
    "name": "Graz (Steiermark)",
    "capitalOrChefLieu": "Graz",
    "keys": [
      "graz",
      "at221"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Landeshauptstadt Graz (Steiermark)",
    "preNote": "Capoluogo della Stiria e seconda città dell'Austria, sede universitaria e centro meccanico e automobilistico (Puch-Werke).",
    "postName": "Reichsgau Steiermark — Gauhauptstadt Graz (Stadt der Volkserhebung)",
    "postAdminTitle": "Deutsches Reich — Gauhauptstadt des Reichsgaues Steiermark",
    "postNote": "Denominata Stadt der Volkserhebung da Hitler per la precocità dei moti nazisti locali nel 1938. Sede del Gauleiter Sigfried Uiberreither e della produzione bellica Steyr-Daimler-Puch."
  },
  {
    "nuts": "AT222",
    "country": "AT",
    "name": "Liezen (Ennstal & Ausseerland)",
    "capitalOrChefLieu": "Liezen",
    "keys": [
      "liezen",
      "ennstal",
      "ausseerland",
      "at222"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Steiermark (Bezirk Liezen)",
    "preNote": "Il più esteso distretto della Stiria, imperniato sulla valle dell'Enns e sulle Alpi dell'Ennstal e dei Tauri.",
    "postName": "Reichsgau Steiermark — Kreis Liezen (Ennstal)",
    "postAdminTitle": "Deutsches Reich — Reichsgau Steiermark",
    "postNote": "Integrato nel Reichsgau Steiermark; zona montana di miniere e allevamento alpino."
  },
  {
    "nuts": "AT223",
    "country": "AT",
    "name": "Östliche Obersteiermark (Leoben & Erzberg)",
    "capitalOrChefLieu": "Leoben",
    "keys": [
      "leoben",
      "erzberg",
      "eisenerz",
      "bruck_an_der_mur",
      "at223"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Steiermark (Leoben & Erzberg)",
    "preNote": "Cuore minerario e siderurgico dell'Austria imperniato sul monte Erzberg (la Montagna di Ferro) a Eisenerz e sulle acciaierie di Donawitz/Leoben.",
    "postName": "Reichsgau Steiermark — Steirischer Erzberg & Donawitz (Eisenerz)",
    "postAdminTitle": "Deutsches Reich — Reichsgau Steiermark (Erzbergbau)",
    "postNote": "Il minerale di ferro purissimo dell'Erzberg a cielo aperto fu una delle prede economiche primarie dell'Anschluss per rifornire gli altiforni della Ruhr e del Reich."
  },
  {
    "nuts": "AT224",
    "country": "AT",
    "name": "Oststeiermark (Weiz, Hartberg & Fürstenfeld)",
    "capitalOrChefLieu": "Weiz",
    "keys": [
      "oststeiermark",
      "weiz",
      "hartberg",
      "furstenfeld",
      "at224"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Steiermark (Oststeiermark)",
    "preNote": "Regione collinare e agricola della Stiria orientale verso il confine ungherese; stabilimenti elettromeccanici a Weiz.",
    "postName": "Reichsgau Steiermark — Oststeiermark (ELIN Weiz)",
    "postAdminTitle": "Deutsches Reich — Reichsgau Steiermark",
    "postNote": "Produzione di trasformatori e generatori elettrici della ELIN a Weiz requisita per le esigenze infrastrutturali belliche del Reich."
  },
  {
    "nuts": "AT225",
    "country": "AT",
    "name": "West- und Südsteiermark (Leibnitz & Deutschlandsberg)",
    "capitalOrChefLieu": "Leibnitz",
    "keys": [
      "leibnitz",
      "deutschlandsberg",
      "sudsteiermark",
      "at225"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Steiermark (Südsteiermark)",
    "preNote": "Colline vinicole della Stiria meridionale al confine con il Regno di Jugoslavia (Slovenia); presenza storica di frizioni confinarie post-1919.",
    "postName": "Reichsgau Steiermark — Südsteiermark (Grenzland)",
    "postAdminTitle": "Deutsches Reich — Reichsgau Steiermark",
    "postNote": "Zona confinaria di tensione con la Jugoslavia; rampa di lancio della propaganda nazista verso la Bassa Stiria slovena (Untersteiermark)."
  },
  {
    "nuts": "AT226",
    "country": "AT",
    "name": "Westliche Obersteiermark (Judenburg & Knittelfeld)",
    "capitalOrChefLieu": "Judenburg",
    "keys": [
      "judenburg",
      "knittelfeld",
      "murau",
      "murtal",
      "at226"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Steiermark (Murtal)",
    "preNote": "Bacino industriale e metallurgico della valle del Mur; officine ferroviarie di Knittelfeld e fonderie di Judenburg.",
    "postName": "Reichsgau Steiermark — Industriekreis Judenburg & Knittelfeld",
    "postAdminTitle": "Deutsches Reich — Reichsgau Steiermark",
    "postNote": "Centri industriali pesanti e snodo ferroviario alpino della Stiria occidentale subordinati alle commesse belliche del Reich."
  },
  {
    "nuts": "AT211",
    "country": "AT",
    "name": "Klagenfurt-Villach (Kärnten)",
    "capitalOrChefLieu": "Klagenfurt",
    "keys": [
      "klagenfurt",
      "villach",
      "villaco",
      "karnten",
      "carinzia",
      "at211"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Landeshauptstadt Klagenfurt (Kärnten)",
    "preNote": "Capoluogo della Carinzia sul Wörthersee e nodo nodale ferroviario di Villach; cerniera delle comunicazioni alpine verso l'Italia fascista (Tarvisio) e la Jugoslavia.",
    "postName": "Reichsgau Kärnten — Gauhauptstadt Klagenfurt & Villach",
    "postAdminTitle": "Deutsches Reich — Gauhauptstadt des Reichsgaues Kärnten",
    "postNote": "Capitale del Reichsgau Kärnten retto dal Gauleiter Franz Kutschera (poi Friedrich Rainer); corridoio di transito e rifornimento dell'Asse Roma-Berlino."
  },
  {
    "nuts": "AT212",
    "country": "AT",
    "name": "Oberkärnten (Spittal an der Drau & Hermagor)",
    "capitalOrChefLieu": "Spittal an der Drau",
    "keys": [
      "spittal",
      "hermagor",
      "oberkarnten",
      "drau",
      "at212"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Kärnten (Oberkärnten)",
    "preNote": "Regione alpina della valle della Drava (Drautal) e della Gailtal al confine con le Alpi Carniche italiane.",
    "postName": "Reichsgau Kärnten — Kreis Spittal an der Drau (Oberkärnten)",
    "postAdminTitle": "Deutsches Reich — Reichsgau Kärnten",
    "postNote": "Distretto alpino di risorse idroelettriche e legname integrato nel Reichsgau Kärnten."
  },
  {
    "nuts": "AT213",
    "country": "AT",
    "name": "Unterkärnten (Wolfsberg & Völkermarkt)",
    "capitalOrChefLieu": "Wolfsberg",
    "keys": [
      "wolfsberg",
      "volkermarkt",
      "voelkermarkt",
      "unterkarnten",
      "at213"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Kärnten (Lavanttal & Jauntal)",
    "preNote": "Bacino della Lavanttal e pianura del Jauntal verso il confine jugoslavo; presenza di comunità bilingue carinziana slovena.",
    "postName": "Reichsgau Kärnten — Kreise Wolfsberg & Völkermarkt",
    "postAdminTitle": "Deutsches Reich — Reichsgau Kärnten",
    "postNote": "Area agricola e mineraria della Carinzia orientale sottoposta a dura politica di germanizzazione linguistica da parte del Gauleiter nazista."
  },
  {
    "nuts": "AT331",
    "country": "AT",
    "name": "Außerfern (Reutte)",
    "capitalOrChefLieu": "Reutte",
    "keys": [
      "reutte",
      "ausserfern",
      "at331"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Tirol (Bezirk Reutte)",
    "preNote": "Valle alpina del Lech collegata naturalmente alla Baviera tramite il passo di Fern; isolata dal resto del Tirolo durante l'inverno.",
    "postName": "Reichsgau Tirol-Vorarlberg — Kreis Reutte (Außerfern)",
    "postAdminTitle": "Deutsches Reich — Reichsgau Tirol-Vorarlberg",
    "postNote": "Integrato nel Reichsgau Tirol-Vorarlberg retto dal Gauleiter Franz Hofer con sede a Innsbruck."
  },
  {
    "nuts": "AT332",
    "country": "AT",
    "name": "Innsbruck (Nordtirol)",
    "capitalOrChefLieu": "Innsbruck",
    "keys": [
      "innsbruck",
      "tirol",
      "nordtirol",
      "tirolo",
      "at332"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Landeshauptstadt Innsbruck (Tirol)",
    "preNote": "Capoluogo del Tirolo nella valle dell'Inn, perno storico dell'asse del Brennero e snodo ferroviario transalpino tra Germania e Italia.",
    "postName": "Reichsgau Tirol-Vorarlberg — Gauhauptstadt Innsbruck (Brenner-Achse)",
    "postAdminTitle": "Deutsches Reich — Gauhauptstadt des Reichsgaues Tirol-Vorarlberg",
    "postNote": "Sede del Gauleiter Franz Hofer; centro nevralgico della linea ferroviaria del Brennero per i collegamenti militari e i vertici di Hitler e Mussolini."
  },
  {
    "nuts": "AT333",
    "country": "AT",
    "name": "Osttirol (Lienz)",
    "capitalOrChefLieu": "Lienz",
    "keys": [
      "lienz",
      "osttirol",
      "at333"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Tirol (Bezirk Lienz / Osttirol)",
    "preNote": "Tirolo Orientale, rimasto separato dal Tirolo del Nord in seguito alla perdita dell'Alto Adige / Südtirol nel Trattato di Saint-Germain (1919).",
    "postName": "Reichsgau Kärnten — Kreis Lienz (Osttirol)",
    "postAdminTitle": "Deutsches Reich — Reichsgau Kärnten (Anschluss 1938)",
    "postNote": "Nel 1938 il distretto di Lienz (Osttirol) venne scorporato dal Tirolo e aggregato amministrativamente al Reichsgau Kärnten per ragioni geografiche e logistiche."
  },
  {
    "nuts": "AT334",
    "country": "AT",
    "name": "Tiroler Oberland (Imst & Landeck)",
    "capitalOrChefLieu": "Imst",
    "keys": [
      "imst",
      "landeck",
      "tiroler_oberland",
      "arlberg",
      "at334"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Tirol (Oberland)",
    "preNote": "Alta valle dell'Inn e valli tributarie (Ötztal, Pitztal); sbarramento del Passo Resia verso l'Italia e traforo dell'Arlberg verso il Vorarlberg.",
    "postName": "Reichsgau Tirol-Vorarlberg — Kreise Imst & Landeck",
    "postAdminTitle": "Deutsches Reich — Reichsgau Tirol-Vorarlberg",
    "postNote": "Passo Resia e collegamenti transalpini alpini militarizzati sotto l'amministrazione nazista del Gauleiter Hofer."
  },
  {
    "nuts": "AT335",
    "country": "AT",
    "name": "Tiroler Unterland (Kufstein & Kitzbühel)",
    "capitalOrChefLieu": "Kufstein",
    "keys": [
      "kufstein",
      "kitzbuhel",
      "kitzbuehel",
      "schwaz",
      "tiroler_unterland",
      "at335"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Tirol (Unterland / Festung Kufstein)",
    "preNote": "Bassa valle dell'Inn dominata dalla storica Festung Kufstein a ridosso della frontiera bavarese; valli minerarie di Schwaz e centro alpino di Kitzbühel.",
    "postName": "Reichsgau Tirol-Vorarlberg — Festung Kufstein & Kitzbühel",
    "postAdminTitle": "Deutsches Reich — Reichsgau Tirol-Vorarlberg",
    "postNote": "Porta d'accesso d'invasione delle truppe bavaresi del generale Fedor von Bock durante l'Anschluss del 12 marzo 1938."
  },
  {
    "nuts": "AT341",
    "country": "AT",
    "name": "Bludenz-Bregenzer Wald (Bludenz)",
    "capitalOrChefLieu": "Bludenz",
    "keys": [
      "bludenz",
      "bregenzerwald",
      "bregenzer_wald",
      "montafon",
      "at341"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Land Vorarlberg (Bludenz)",
    "preNote": "Cantone alpino del Vorarlberg meridionale (Montafon, Klostertal); sbarramento occidentale del passo e ferrovia dell'Arlberg.",
    "postName": "Reichsgau Tirol-Vorarlberg — Kreis Bludenz (Montafon)",
    "postAdminTitle": "Deutsches Reich — Reichsgau Tirol-Vorarlberg",
    "postNote": "Vorarlberg aggregato al Tirolo nel Reichsgau Tirol-Vorarlberg; bacini idroelettrici del Montafon (Illwerke) sfruttati per la rete energetica del Reich."
  },
  {
    "nuts": "AT342",
    "country": "AT",
    "name": "Rheintal-Bodenseegebiet (Bregenz & Feldkirch)",
    "capitalOrChefLieu": "Bregenz",
    "keys": [
      "bregenz",
      "dornbirn",
      "feldkirch",
      "rheintal",
      "at342"
    ],
    "preAdminTitle": "Bundesstaat Österreich — Landeshauptstadt Bregenz (Vorarlberg)",
    "preNote": "Capoluogo del Vorarlberg affacciato sul Bodensee e popolosa valle del Reno alpino al confine con Svizzera e Liechtenstein.",
    "postName": "Reichsgau Tirol-Vorarlberg — Kreise Bregenz & Feldkirch",
    "postAdminTitle": "Deutsches Reich — Reichsgau Tirol-Vorarlberg",
    "postNote": "Fascia confinaria ad alta sorveglianza della Gestapo e guardie di frontiera per impedire fughe di perseguitati e oppositori verso la Svizzera neutrale (caso del capitano di polizia Paul Grüninger a St. Margrethen)."
  }
];

/**
 * Risoluzione toponomastica, istituzionale e temporale dettagliata per Svizzera, Austria e Liechtenstein (1936-1940)
 */
export function resolveSwissAustrianToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;

  // 1. Cerca match tra i 62 distretti alpini
  let found: SwissAustrianDistrictDef | undefined;

  if (id.startsWith('CH') || id.startsWith('AT') || id.startsWith('LI')) {
    found = SWISS_AUSTRIAN_DISTRICTS_CATALOG.find((d) => d.nuts === id);
  }

  if (!found) {
    const normTokens = normKey.split('_').filter(Boolean);
    for (const d of SWISS_AUSTRIAN_DISTRICTS_CATALOG) {
      if (d.keys.some((k) => normKey === k || normTokens.includes(k) || (k.length >= 5 && normKey.includes(k)))) {
        found = d;
        break;
      }
    }
  }

  if (found) {
    const d = found;
    // Austria post-Anschluss (Step >= 1: März 1938 - Juni 1940)
    if (d.country === 'AT') {
      if (step >= 1) {
        return {
          name: d.postName || d.name,
          adminTitle: d.postAdminTitle || 'Alpen- und Donau-Reichsgaue (Ostmark — Großdeutsches Reich)',
          note: d.postNote || 'Territorium der ehemaligen Republik Österreich nach dem Anschluss vom März 1938.',
        };
      }
      // Step 0: Bundesstaat Österreich (Ständestaat 1936-1938)
      return {
        name: d.name,
        adminTitle: d.preAdminTitle,
        note: d.preNote,
      };
    }

    // Liechtenstein: neutralità e unione doganale con la Svizzera
    if (d.country === 'LI') {
      return {
        name: step >= 1 && d.postName ? d.postName : d.name,
        adminTitle: step >= 1 && d.postAdminTitle ? d.postAdminTitle : d.preAdminTitle,
        note: step >= 1 && d.postNote ? d.postNote : d.preNote,
      };
    }

    // Svizzera: neutralità armata confederale (1936-1940)
    return {
      name: d.name,
      adminTitle: d.preAdminTitle,
      note: d.preNote,
    };
  }

  return null;
}

export function resolveUSAToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;
  const isPost1939 = step >= 4;

  // 1. Livello Nazionale USA — timeline-sensitive
  const isNationalName =
    normKey === 'united_states' ||
    normKey === 'united_states_of_america' ||
    normKey === 'usa' ||
    normKey === 'us' ||
    normKey === 'stati_uniti' ||
    normKey === 'stati_uniti_d_america' ||
    normKey === 'stati_uniti_damerica';

  const isNationalUSA =
    isNationalName ||
    ((id === 'USA' || id === 'US' || id === '840') &&
     (isNationalName || !normKey || normKey === 'unknown' || normKey === 'territorio_non_assegnato'));

  if (isNationalUSA) {
    if (isPost1939) {
      return {
        name: 'Stati Uniti d\'America (Arsenal of Democracy & Two-Ocean Navy)',
        adminTitle: 'United States of America — Pres. Franklin D. Roosevelt (Two-Ocean Navy & Terzo Mandato)',
        note: 'Di fronte alla caduta della Francia e all\'espansionismo dell\'Asse, gli Stati Uniti avviano una massiccia mobilitazione economico-militare. Il Congresso vara il Two-Ocean Navy Act (luglio 1940, espansione del 70% del tonnellaggio navale), il Selective Training and Service Act (prima leva obbligatoria in tempo di pace) e il Destroyers for Bases Agreement con Londra (settembre 1940). Nel novembre 1940 Roosevelt viene rieletto per uno storico terzo mandato presidenziale, proclamando gli USA "Arsenale della Democrazia".',
      };
    }
    return {
      name: 'Stati Uniti d\'America (New Deal & Dottrina di Neutralità)',
      adminTitle: 'United States of America — Pres. Franklin D. Roosevelt (New Deal)',
      note: 'Repubblica presidenziale federale composta da 48 Stati, il Distretto di Columbia e territori non incorporati. Sotto la presidenza di Franklin D. Roosevelt (trionfalmente rieletto nel 1936), il paese persegue la ripresa economica post-Grande Depressione con i programmi del New Deal (WPA, CCC, TVA, Social Security Act) e una politica estera formalmente isolazionista sancita dai Neutrality Acts (1935-1937), affiancata dalla Dottrina del Buon Vicinato nelle Americhe e dai primi stanziamenti navali difensivi (Vinson Naval Act del 1938).',
    };
  }

  // 2. Zona del Canale di Panama (Chokepoint Interoceanico)
  if (
    normKey.includes('canal_zone') ||
    normKey.includes('panama_canal') ||
    normKey.includes('canale_di_panama') ||
    id.includes('PCZ') ||
    id.includes('PZ') ||
    id === '590' ||
    normKey === 'balboa_heights' ||
    normKey === 'quarry_heights'
  ) {
    return {
      name: 'Panama Canal Zone (Balboa Heights / Quarry Heights — USA)',
      adminTitle: 'Panama Canal Zone — U.S. Strategic Military Outpost (Governor Clarence S. Ridley / Glen E. Edgerton)',
      note: 'Fascia territoriale e idroviaria strategica di 553 miglia quadrate controllata in perpetuità dagli Stati Uniti d\'America in virtù del Trattato Hay-Bunau-Varilla del 1903. Chokepoint marittimo vitale della sicurezza emisferica e globale per il passaggio rapido delle flotte tra Atlantico e Pacifico (Two-Ocean Navy); difesa da massicce fortificazioni costiere, chiuse protette (Miraflores, Pedro Miguel, Gatun) e basi aeronavali (Albrook Field, Howard Field, Coco Solo).',
    };
  }

  // 3. Base Navale di Guantanamo Bay (Cuba)
  if (normKey.includes('guantanamo')) {
    return {
      name: 'Guantanamo Bay Naval Base (U.S. Navy — Cuba)',
      adminTitle: 'U.S. Naval Operating Base Guantanamo Bay (Treaty of 1934)',
      note: 'Base navale permanente di 116 km² affittata in perpetuità dagli Stati Uniti sulla baia di Guantánamo nel sud-est di Cuba in virtù del trattato cubano-statunitense del 1903 (confermato dal trattato del 1934). Base navale operativa primaria per il controllo del Paso de los Vientos (Windward Passage) tra Cuba e Haiti e la sorveglianza delle rotte dei Caraibi.',
    };
  }

  // 4. Caraibi: Puerto Rico & Isole Vergini Americane
  if (normKey.includes('puerto_rico') || normKey.includes('porto_rico') || id.includes('PR') || id.includes('PRI') || id === '630') {
    return {
      name: 'Puerto Rico (Unincorporated U.S. Territory — San Juan)',
      adminTitle: 'Territory of Puerto Rico — U.S. Caribbean Gibraltar (Gov. Blanton Winship / Adm. William D. Leahy)',
      note: 'Territorio insulare non incorporato degli Stati Uniti d\'America nelle Grandi Antille con capoluogo San Juan. Negli anni 1936-1939 teatro di forti tensioni nazionaliste guidate da Pedro Albizu Campos (Massacro di Ponce del 1937); nel 1939 Franklin D. Roosevelt nomina governatore l\'ammiraglio William D. Leahy per trasformare l\'isola in una formidabile base aeronavale fortificata ("la Gibilterra dei Caraibi") a guardia delle rotte marittime per il Canale di Panama.',
    };
  }

  if (normKey.includes('virgin_islands') || normKey.includes('isole_vergini') || id.includes('VI') || id.includes('VIR') || id === '850') {
    return {
      name: 'United States Virgin Islands (Charlotte Amalie)',
      adminTitle: 'Territory of the Virgin Islands of the United States (Gov. Lawrence W. Cramer)',
      note: 'Arcipelago caraibico acquistato nel 1917 dalla Danimarca (Indie Occidentali Danesi) per proteggere gli accessi orientali al Canale di Panama. Territorio non incorporato governato da Lawrence William Cramer con capoluogo Charlotte Amalie sull\'isola di Saint Thomas, sede di una stazione aeronavale del corpo dei Marines (Bourne Field) e base logistica avanzata.',
    };
  }

  // 5. Presidi Strategici del Pacifico
  if (normKey.includes('pearl_harbor')) {
    return {
      name: 'Pearl Harbor Naval Base (Oahu, Hawaii)',
      adminTitle: 'U.S. Pacific Fleet Operating Base & Drydocks',
      note: 'Principale base aeronavale della marina statunitense nel Pacifico centrale sull\'isola di Oahu; sede dal maggio 1940 del quartier generale della Flotta del Pacifico dell\'ammiraglio James O. Richardson trasferita permanentemente da San Pedro/San Diego per volere di Roosevelt quale deterrente contro l\'espansionismo giapponese.',
    };
  }

  if (normKey.includes('hawaii') || normKey.includes('oahu') || normKey.includes('honolulu')) {
    return {
      name: 'Territory of Hawaii (Pearl Harbor / Oahu)',
      adminTitle: 'Territory of Hawaii — U.S. Pacific Fleet Headquarters (Gov. Joseph Poindexter)',
      note: 'Territorio incorporato degli Stati Uniti nel Pacifico centrale con capoluogo Honolulu; presidio insulare strategico di primissimo ordine ospitante la base navale di Pearl Harbor, i campi d\'aviazione dell\'esercito di Hickam Field e Wheeler Field, e il comando militare di Fort Shafter.',
    };
  }

  if (normKey.includes('dutch_harbor') || normKey.includes('unalaska')) {
    return {
      name: 'Dutch Harbor Naval Operating Base (Aleutian Islands)',
      adminTitle: 'U.S. Navy & Army Air Station — Unalaska Island',
      note: 'Base aeronavale avanzata della marina e dell\'esercito sull\'isola di Unalaska nell\'arcipelago delle Aleutine; perno settentrionale del dispositivo di difesa aeronavale del Pacifico del Nord per la sorveglianza delle rotte artiche verso la Kamčatka e il Giappone.',
    };
  }

  if (normKey.includes('alaska') || normKey.includes('aleutian') || normKey.includes('anchorage') || normKey.includes('juneau') || id.includes('AK')) {
    return {
      name: 'Territory of Alaska (Dutch Harbor / Aleutine)',
      adminTitle: 'Territory of Alaska — North Pacific Defense Outpost (Gov. Ernest Gruening)',
      note: 'Vasto territorio incorporato affacciato sul Mar di Bering e sul Pacifico settentrionale con capoluogo Juneau. Sotto la guida del governatore Ernest Gruening e del generale Simon Bolivar Buckner Jr., negli anni 1939-1940 divenne bastione di difesa artica con la costruzione di basi aeree (Elmendorf Field ad Anchorage, Ladd Field a Fairbanks) e stazioni navali nelle Aleutine.',
    };
  }

  if (normKey.includes('guam') || id.includes('GU') || id.includes('GUM') || id === '316') {
    return {
      name: 'Island of Guam (Apra Harbor — U.S. Navy)',
      adminTitle: 'Guam Naval Station — Marianas Outpost (Gov. James T. Alexander / George J. McMillin)',
      note: 'Territorio insulare non incorporato in Micronesia (Isole Marianne meridionali) sotto amministrazione navale diretta dell\'US Navy con capoluogo Hagåtña. Isolato e circondato dalle isole del Mandato Giapponese del Pacifico meridionale (Nan\'yō), ospitava la stazione navale di Apra Harbor e scalo idrovolanti dei famosi Pan American China Clipper.',
    };
  }

  if (normKey.includes('wake')) {
    return {
      name: 'Wake Island (U.S. Navy & Pan American Clipper)',
      adminTitle: 'Wake Island — U.S. Unorganized Territory & Naval Aviation Outpost',
      note: 'Atollo corallino isolato nel Pacifico settentrionale tra le Hawaii e Guam, annesso nel 1899. Negli anni \'30 trasformato in strategica stazione di rifornimento idrovolanti della Pan American Airways con albergo e officine, prima di essere militarizzato dalla marina nel 1940-1941 come aeroporto avanzato dei Marines.',
    };
  }

  if (normKey.includes('midway')) {
    return {
      name: 'Midway Atoll (U.S. Navy)',
      adminTitle: 'Midway Islands Naval Air Station',
      note: 'Atollo fortificato e base di idrovolanti e sottomarini della marina statunitense a nord-ovest delle Hawaii; anello fondamentale della catena di deterrenza e ricognizione aeronavale nel Pacifico centrale.',
    };
  }

  if (normKey.includes('american_samoa') || normKey.includes('samoa') || normKey.includes('pago_pago') || normKey.includes('tutuila') || id.includes('AS') || id.includes('ASM') || id === '016') {
    return {
      name: 'American Samoa (Pago Pago / Tutuila)',
      adminTitle: 'U.S. Naval Station Tutuila — South Pacific Coaling Depot (Gov. Edward W. Hanson)',
      note: 'Territorio non incorporato della Polinesia meridionale controllato dall\'US Navy; il porto naturale profondo di Pago Pago sull\'isola di Tutuila costituiva un deposito carbonifero e base navale di rifornimento strategico sulle rotte oceaniche tra la California, l\'Australia e la Nuova Zelanda.',
    };
  }

  // 6. Distretto Federale di Columbia vs Stato di Washington
  if (normKey.includes('district_of_columbia') || normKey === 'washington_dc' || normKey === 'washington_d_c' || normKey.includes('d_c') || normKey === 'dc') {
    return {
      name: 'Washington, D.C. (District of Columbia)',
      adminTitle: 'Federal Capital of the United States of America',
      note: 'Capitale federale sulle rive del fiume Potomac; sede della Casa Bianca, del Campidoglio e dei dipartimenti militari della Guerra e della Marina.',
    };
  }

  if (
    normKey === 'washington_state' ||
    id.includes('WA') ||
    (normKey.includes('washington') && (normKey.includes('state') || normKey.includes('seattle') || normKey.includes('olympia') || normKey.includes('puget')))
  ) {
    return {
      name: 'Washington (Evergreen State — Seattle & Puget Sound)',
      adminTitle: 'State of Washington (Gov. Clarence D. Martin)',
      note: 'Porta del Pacifico nord-occidentale; stabilimenti Boeing a Seattle per i bombardieri B-17 Flying Fortress e Puget Sound Naval Shipyard a Bremerton per la manutenzione e costruzione di corazzate.',
    };
  }

  // 7. Ricerca granulare e timeline-sensitive in USA_PROVINCES_META
  const cleanId = id.replace(/[^A-Za-z0-9_]/g, '');
  const provMeta = USA_PROVINCES_META[cleanId] || (cleanId.startsWith('US_') ? undefined : USA_PROVINCES_META['US_' + cleanId]);
  if (provMeta) {
    return {
      name: provMeta.getHistoricalName(step),
      adminTitle: provMeta.getAdminTitle(step),
      note: provMeta.getNote(step),
    };
  }

  for (const k of Object.keys(USA_PROVINCES_META)) {
    const item = USA_PROVINCES_META[k];
    const nrmItem = item.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    if (normKey === nrmItem || (nrmItem.length >= 5 && normKey.includes(nrmItem))) {
      return {
        name: item.getHistoricalName(step),
        adminTitle: item.getAdminTitle(step),
        note: item.getNote(step),
      };
    }
  }

  // 8. Ricerca granulare nel dizionario storico degli Stati Uniti
  const usaDict = HISTORICAL_TOPONYM_DICT['USA'];
  if (usaDict) {
    if (usaDict[normKey]) {
      return {
        name: usaDict[normKey].historicalName,
        adminTitle: usaDict[normKey].adminTitle,
        note: usaDict[normKey].historicalNote,
      };
    }
    const sortedKeys = Object.keys(usaDict).sort((a, b) => b.length - a.length);
    for (const k of sortedKeys) {
      if (k.length <= 3) continue;
      if (normKey === k || normKey.includes(k) || (k.length >= 6 && k.includes(normKey))) {
        return {
          name: usaDict[k].historicalName,
          adminTitle: usaDict[k].adminTitle,
          note: usaDict[k].historicalNote,
        };
      }
    }
  }

  return null;
}

/**
 * Risoluzione toponomastica, istituzionale e geostorica per l'Unione Sovietica (1936-1940),
 * focalizzata sull'Oblast di Leningrado, Kronštadt, Ingria, Carelia e Russia Nord-Occidentale.
 */
export function resolveMexicoToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;

  // 1. Livello Nazionale Messico (Estados Unidos Mexicanos) — timeline-sensitive step 0..8
  const isNationalName =
    normKey === 'mexico' ||
    normKey === 'messico' ||
    normKey === 'estados_unidos_mexicanos' ||
    normKey === 'stati_uniti_messicani' ||
    normKey === 'republica_mexicana';

  const isNationalMexico =
    isNationalName ||
    ((id === 'MEX' || id === 'MX' || id === '484') &&
     (isNationalName || !normKey || normKey === 'unknown' || normKey === 'territorio_non_assegnato' || normKey === 'mexico' || normKey === 'estados_unidos_mexicanos'));

  if (isNationalMexico) {
    if (step >= 8) {
      return {
        name: 'Estados Unidos Mexicanos / México (Presidenza Ávila Camacho & Cooperazione Emisferica)',
        adminTitle: 'Estados Unidos Mexicanos — Presidente Constitucional Gen. Manuel Ávila Camacho',
        note: 'Presidenza di Manuel Ávila Camacho ("El Presidente Caballero"), all\'insegna dell\'unità nazionale, della riconciliazione con la Chiesa cattolica e della distensione con gli Stati Uniti. Siglato l\'accordo globale di indennizzo petrolifero con Washington; nell\'aprile 1941 la Marina messicana procede al sequestro cautelare nei porti di Tampico e Veracruz di 12 navi mercantili e petroliere dell\'Asse bloccate dal blocco britannico. Negoziati per la Commissione Congiunta di Difesa Messico-USA e piena mobilitazione mineraria (rame di Cananea, piombo, zinco) per l\'Arsenale della Democrazia alleato.',
      };
    }
    if (step >= 7) {
      return {
        name: 'Estados Unidos Mexicanos / México (Transizione Ávila Camacho & Difesa Emisferica)',
        adminTitle: 'Estados Unidos Mexicanos — Presidente Eletto Gen. Manuel Ávila Camacho',
        note: 'Fase di transizione verso l\'insediamento presidenziale del moderato Manuel Ávila Camacho (1° dicembre 1940), successore designato di Cárdenas dopo le tese elezioni di luglio contro Almazán. Roosevelt invia il vicepresidente Henry Wallace alla cerimonia d\'insediamento a Città del Messico. Avvio di intensi colloqui strategici per la cooperazione di difesa emisferica, la sorveglianza delle coste del Pacifico e il contrasto alle reti di spionaggio dell\'Abwehr.',
      };
    }
    if (step >= 5) {
      return {
        name: 'Estados Unidos Mexicanos / México (Neutralità Armata & Solidarietà Panamericana)',
        adminTitle: 'Estados Unidos Mexicanos — Presidente Constitucional Gen. Lázaro Cárdenas del Río',
        note: 'Allo scoppio della Seconda Guerra Mondiale in Europa (settembre 1939), il Messico proclama la rigorosa neutralità armata e la difesa del diritto internazionale panamericano (Dichiarazione di Panama). Cessano le vendite di greggio alla Germania nazista. Il 21 agosto 1940 Leon Trotsky viene assassinato a Coyoacán dal sicario sovietico dell\'NKVD Ramón Mercader. Nelle elezioni di luglio 1940 la vittoria va al generale moderato Manuel Ávila Camacho.',
      };
    }
    if (step >= 2) {
      return {
        name: 'Estados Unidos Mexicanos / México (Espropriazione Petrolifera & Nascita di PEMEX 1938)',
        adminTitle: 'Estados Unidos Mexicanos — Presidente Constitucional Gen. Lázaro Cárdenas del Río',
        note: 'Il 18 marzo 1938 il presidente Lázaro Cárdenas decreta l\'espropriazione storica delle compagnie petrolifere straniere anglo-americane (Standard Oil, Royal Dutch Shell, El Águila). Il 7 giugno 1938 viene fondata la compagnia statale Petróleos Mexicanos (PEMEX). Di fronte al boicottaggio economico britannico e statunitense, il Messico ricorre ad accordi commerciali di baratto; viene soppressa la ribellione reazionaria del generale Saturnino Cedillo a San Luis Potosí e accolti oltre 25.000 esuli della Repubblica Spagnola.',
      };
    }
    return {
      name: 'Estados Unidos Mexicanos / México (Presidenza Lázaro Cárdenas & Riforme Sociali)',
      adminTitle: 'Estados Unidos Mexicanos — Presidente Constitucional Gen. Lázaro Cárdenas del Río',
      note: 'Repubblica federale democratica in profonda trasformazione socio-economica guidata dal generale Lázaro Cárdenas del Río. Emancipazione politica con l\'esilio dell\'ex "Jefe Máximo" Plutarco Elías Calles (1936), fondazione della Confederación de Trabajadores de México (CTM) con Vicente Lombardo Toledano, asilo politico a Leon Trotsky a Coyoacán (gennaio 1937), massicce distribuzioni di terre comunitarie (ejidos della Comarca Lagunera e henequén dello Yucatán) e nazionalizzazione delle Ferrovie Nazionali del Messico (FNM, giugno 1937). Territori Federali della Baja California e Quintana Roo direttamente amministrati dalla Federazione.',
    };
  }

  // 2. Ricerca granulare e timeline-sensitive in MEXICO_PROVINCES_META
  const cleanId = id.toUpperCase().trim().replace('-', '_');
  const provMeta =
    MEXICO_PROVINCES_META[cleanId] ||
    (cleanId.startsWith('MX_') ? undefined : MEXICO_PROVINCES_META['MX_' + cleanId]);

  if (provMeta) {
    return {
      name: provMeta.getHistoricalName(step),
      adminTitle: provMeta.getAdminTitle(step),
      note: provMeta.getNote(step),
    };
  }

  // Lookup per chiave o nome in MEXICO_PROVINCES_META
  const pNorm = normKey.replace(/[^a-z0-9]/g, '');
  for (const k of Object.keys(MEXICO_PROVINCES_META)) {
    const item = MEXICO_PROVINCES_META[k];
    const nrmItem = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const nrmMod = item.modernName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const nrmHist = item.historicalName.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (
      pNorm === nrmItem ||
      pNorm === nrmMod ||
      (nrmItem.length >= 4 && pNorm.includes(nrmItem)) ||
      (nrmItem.length >= 4 && nrmHist.includes(pNorm))
    ) {
      return {
        name: item.getHistoricalName(step),
        adminTitle: item.getAdminTitle(step),
        note: item.getNote(step),
      };
    }
  }

  // 3. Ricerca granulare nel dizionario storico del Messico (HISTORICAL_TOPONYM_DICT['MEX'])
  const mexDict = HISTORICAL_TOPONYM_DICT['MEX'];
  if (mexDict) {
    if (mexDict[normKey]) {
      return {
        name: mexDict[normKey].historicalName,
        adminTitle: mexDict[normKey].adminTitle,
        note: mexDict[normKey].historicalNote || mexDict[normKey].note,
      };
    }
    const sortedKeys = Object.keys(mexDict).sort((a, b) => b.length - a.length);
    for (const k of sortedKeys) {
      if (k.length <= 3) continue;
      if (normKey === k || normKey.includes(k) || (k.length >= 5 && k.includes(normKey))) {
        return {
          name: mexDict[k].historicalName,
          adminTitle: mexDict[k].adminTitle,
          note: mexDict[k].historicalNote || mexDict[k].note,
        };
      }
    }
  }

  return null;
}

/**
 * Risoluzione toponomastica, istituzionale e geostorica per l'Africa Occidentale Francese (AOF, 1936-1941),
 * comprendente la federazione coloniale (Dakar) e le sue 7 entità territoriali:
 * Sénégal, Mauritanie, Soudan Français, Guinée Française, Côte d'Ivoire (con Haute-Côte d'Ivoire),
 * Dahomey, Niger (con Haute-Volta Orientale).
 */
export function resolveAOFToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;

  // 1. Livello Nazionale / Federale Generale AOF (French West Africa / Afrique-Occidentale Française) - timeline-sensitive step 0..8
  const isNationalName =
    normKey === 'french_west_africa' ||
    normKey === 'afrique_occidentale_francaise' ||
    normKey === 'afrique_occidentale' ||
    normKey === 'africa_occidentale_francese' ||
    normKey === 'aof' ||
    normKey === 'f_aof' ||
    normKey === 'vic_aof';

  const isNationalAOF =
    isNationalName ||
    ((id === 'AOF' || id === 'F_AOF' || id === 'VIC_AOF' || id === 'FWA') &&
     (isNationalName || !normKey || normKey === 'unknown' || normKey === 'territorio_non_assegnato' || normKey === 'french_west_africa'));

  if (isNationalAOF) {
    if (step >= 8) {
      return {
        name: "Afrique-Occidentale Française / AOF (Blocco Navale Royal Navy & Vigilanza Pétainista)",
        adminTitle: "Haut-Commissariat de l'Afrique Française (Pierre Boisson — Vichy)",
        note: "Consolidamento del regime autoritario dell'Alto Commissario Pierre Boisson ed estensione della 'Révolution Nationale' pétainista all'intera federazione coloniale. La Royal Navy impone un asfissiante blocco aeronavale dalle basi atlantiche di Freetown (Sierra Leone), Gambia e Lagos; collasso dei commerci civili marittimi, requisizioni forzate di derrate alimentari e materie prime strategiche (arachidi, olio di palma, caucciù) convogliate verso la roccaforte fortificata di Dakar. Lungo le frontiere sahariane orientali vige uno stato di allerta permanente per sventare le incursioni delle forze golliste della Francia Libera del generale Leclerc, galvanizzate dalla recente presa dell'oasi libica di Kufra (marzo 1941).",
      };
    }
    if (step >= 7) {
      return {
        name: "Afrique-Occidentale Française / AOF (Vittoria a Dakar & Roccaforte di Vichy)",
        adminTitle: "Haut-Commissariat de l'Afrique Française (Pierre Boisson — Vichy)",
        note: "23-25 Settembre 1940: Battaglia di Dakar (Operazione Menace). Il tentativo aeronavale combinato anglo-gollista guidato dal generale Charles de Gaulle e dall'ammiraglio John Cunningham di impadronirsi della colonia viene respinto con fermezza dalle difese costiere, dalla corazzata Richelieu e dai sommergibili lealisti (la corazzata britannica HMS Resolution viene gravemente silurata dal sommergibile Bévéziers e la HMS Barham danneggiata). La vittoria difensiva dell'Alto Commissario Pierre Boisson consacra Dakar e l'AOF come il bastione inespugnabile della sovranità di Vichy in Africa, in netto contrappunto all'Africa Equatoriale Francese (AEF) controllata dalla Francia Libera.",
      };
    }
    if (step >= 6) {
      return {
        name: "Afrique-Occidentale Française / AOF (Haut-Commissariat de Dakar & Regime di Vichy)",
        adminTitle: "Haut-Commissariat de l'Afrique Française (Pierre Boisson — Vichy)",
        note: "A seguito dell'armistizio franco-tedesco del 22 giugno 1940, l'Alto Commissario per l'Africa Nera Pierre Boisson rifiuta fermamente gli appelli di Winston Churchill e Charles de Gaulle, proclamando la fedeltà assoluta al Regime di Vichy e al Maresciallo Philippe Pétain. L'8 luglio 1940 la Royal Navy sferra l'Operazione Catapult nella rada di Dakar: aerosiluranti Swordfish decollati dalla portaerei HMS Hermes danneggiano i timoni della corazzata Richelieu. Boisson instaura una rigida dittatura coloniale autoritaria, epurando i funzionari dissidenti e blindando l'intera federazione coloniale.",
      };
    }
    if (step >= 5) {
      return {
        name: "Afrique-Occidentale Française / AOF (Mobilitazione Bellica & Base Navale di Dakar)",
        adminTitle: "Gouvernement Général de l'AOF (Léon Cayla) — Sforzo Bellico Imperiale",
        note: "Piena mobilitazione bellica dell'Africa Occidentale Francese allo scoppio delle ostilità in Europa sotto il Governatore Generale Léon Cayla. Decine di reggimenti di Tirailleurs Sénégalais e Soudanais vengono inviati a presidiare i confini della madrepatria metropolitana; fornitura intensiva di riserve agricole e minerarie strategiche. Nella rada fortificata di Dakar vengono segretamente trasbordate ed evacuate via mare oltre 200 tonnellate di riserve auree della Banca di Francia, della Banca Nazionale di Polonia e della Banca Nazionale del Belgio; nel giugno 1940 approda la moderna corazzata Richelieu per sfuggire all'avanzata della Wehrmacht a Brest.",
      };
    }
    if (step >= 2) {
      return {
        name: "Afrique-Occidentale Française / AOF (Riarmo Navale Atlantico & Difese di Dakar)",
        adminTitle: "Gouvernement Général de l'AOF — Riarmo e Fortificazioni Coloniali",
        note: "Fase di riarmo accelerato post-Accordi di Monaco (autunno 1938 - 1939): il governo di Parigi stanzia cospicui fondi per modernizzare le infrastrutture militari dell'AOF, trasformando Dakar nella più potente base aeronavale della Marine Nationale nell'Atlantico meridionale. Vengono ampliate le batterie pesanti costiere di Cap Manuel e dell'isola di Gorée, allestito l'aerodromo militare di Ouakam e intensificato l'addestramento bellico delle truppe coloniali africane.",
      };
    }
    return {
      name: "Afrique-Occidentale Française / AOF (Governo Jules Marcel de Coppet & Riforme)",
      adminTitle: "Gouvernement Général de l'AOF (Dakar) — Front Populaire",
      note: "Federazione coloniale francese dell'Africa Occidentale (AOF), raggruppante 7 entità territoriali con sede amministrativa centrale a Dakar. Sotto la guida del Governatore Generale Jules Marcel de Coppet, espressione del governo metropolitano del Fronte Popolare di Léon Blum, vengono introdotte significative riforme sociali: attenuazione del codice dell'indigénat, riconoscimento del diritto sindacale per i lavoratori autoctoni e tutela della rappresentanza parlamentare a Parigi delle 'Quatre Communes' del Senegal (guidate dal deputato Galandou Diouf). Economia agricola dominata dall'arachide senegalese, dall'olio di palma del Dahomey e dai colossali cantieri idraulici dell'Office du Niger.",
    };
  }

  // 2. Ricerca granulare e timeline-sensitive in AOF_PROVINCES_META
  const cleanId = id.toUpperCase().trim().replace('-', '_');
  const provMeta =
    AOF_PROVINCES_META[cleanId] ||
    (cleanId.startsWith('AOF_') ? undefined : AOF_PROVINCES_META['AOF_' + cleanId]);

  if (provMeta) {
    return {
      name: provMeta.getHistoricalName(step),
      adminTitle: provMeta.getAdminTitle(step),
      note: provMeta.getNote(step),
    };
  }

  // Lookup per chiave o nome in AOF_PROVINCES_META
  const pNorm = normKey.replace(/[^a-z0-9]/g, '');
  for (const k of Object.keys(AOF_PROVINCES_META)) {
    const item = AOF_PROVINCES_META[k];
    const nrmItem = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const nrmMod = item.modernName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const nrmHist = item.historicalName.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (
      pNorm === nrmItem ||
      pNorm === nrmMod ||
      (nrmItem.length >= 4 && pNorm.includes(nrmItem)) ||
      (nrmItem.length >= 4 && nrmHist.includes(pNorm))
    ) {
      return {
        name: item.getHistoricalName(step),
        adminTitle: item.getAdminTitle(step),
        note: item.getNote(step),
      };
    }
  }

  // 3. Ricerca granulare nei dizionari storici AOF (HISTORICAL_TOPONYM_DICT['F_AOF'] o ['VIC_AOF'])
  const aofDict = (step >= 6 ? HISTORICAL_TOPONYM_DICT['VIC_AOF'] : HISTORICAL_TOPONYM_DICT['F_AOF']) || HISTORICAL_TOPONYM_DICT['F_AOF'];
  if (aofDict) {
    if (aofDict[normKey]) {
      return {
        name: aofDict[normKey].historicalName,
        adminTitle: aofDict[normKey].adminTitle,
        note: aofDict[normKey].historicalNote || aofDict[normKey].note,
      };
    }
    const sortedKeys = Object.keys(aofDict).sort((a, b) => b.length - a.length);
    for (const k of sortedKeys) {
      if (k.length <= 3) continue;
      if (normKey === k || normKey.includes(k) || (k.length >= 5 && k.includes(normKey))) {
        return {
          name: aofDict[k].historicalName,
          adminTitle: aofDict[k].adminTitle,
          note: aofDict[k].historicalNote || aofDict[k].note,
        };
      }
    }
  }

  return null;
}


export function resolveAEFToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;

  // 1. Livello Nazionale / Federale Generale AEF (French Equatorial Africa / Afrique-Équatoriale Française) - timeline-sensitive step 0..8
  const isNationalName =
    normKey === 'french_equatorial_africa' ||
    normKey === 'afrique_equatoriale_francaise' ||
    normKey === 'afrique_equatoriale' ||
    normKey === 'africa_equatoriale_francese' ||
    normKey === 'aef' ||
    normKey === 'f_aef' ||
    normKey === 'ffl_aef' ||
    normKey === 'vic_aef';

  const isNationalAEF =
    isNationalName ||
    ((id === 'AEF' || id === 'F_AEF' || id === 'FFL_AEF' || id === 'VIC_AEF' || id === 'FEA') &&
     (isNationalName || !normKey || normKey === 'unknown' || normKey === 'territorio_non_assegnato' || normKey === 'french_equatorial_africa'));

  if (isNationalAEF) {
    if (step >= 8) {
      return {
        name: "Afrique Française Libre / AEF (Base Strategica di Leclerc & Serment de Koufra)",
        adminTitle: "Gouvernement Général de l'AEF (Félix Éboué) & Forces Françaises Libres",
        note: "Consolidamento dell'AEF come trampolino di lancio militare della riscossa alleata. Il governatore generale Félix Éboué riorganizza l'amministrazione civile secondo la sua celebre circolare sulla politica indigena, valorizzando le autorità tradizionali e abolendo gli abusi dell'indigénat, mentre le truppe coloniali dell'AEF (Bataillons de Marche) combattono valorosamente in Eritrea, Siria e nel deserto libico. Dal Ciad, la colonna del colonnello Philippe Leclerc compie la leggendaria presa dell'oasi di Kufra (1º marzo 1941) pronunciando il giuramento che legherà il destino dell'Africa Equatoriale alla futura liberazione di Strasburgo e di Parigi.",
      };
    }
    if (step >= 7) {
      return {
        name: "Capitale de la France Libre (Brazzaville — Manifeste de Brazzaville & Unità dell'AEF)",
        adminTitle: "Conseil de Défense de l'Empire — Gouvernement Général de l'AEF (Félix Éboué)",
        note: "27 Ottobre 1940: Il Generale Charles de Gaulle stabilisce a Brazzaville la Capitale ufficiale dell'Impero della Francia Libera, emanando lo storico Manifeste de Brazzaville e istituendo il Conseil de Défense de l'Empire come primo organo di governo della resistenza. Félix Éboué viene nominato Governatore Generale dell'intera federazione AEF (primo nero a ricoprire la carica suprema coloniale). Con la Campagna del Gabon (ottobre-novembre 1940) condotta da Leclerc e Koenig, Libreville viene conquistata ponendo fine alla resistenza di Vichy: l'unità dell'Africa equatoriale gollista è totale. Da Brazzaville irradiano i messaggi di Radio Brazzaville, la voce libera della Francia nel mondo.",
      };
    }
    if (step >= 6) {
      return {
        name: "Afrique Française Libre (AEF — Ralliement Storico di Brazzaville, Ciad & Camerun)",
        adminTitle: "Délégation Générale de la France Libre (Félix Éboué & Edgard de Larminat)",
        note: "26-28 Agosto 1940: Lo storico Ralliement dell'Empire! Rifiutando l'armistizio di Vichy, il governatore del Ciad Félix Éboué (26 agosto) e il colonnello Edgard de Larminat a Brazzaville (28 agosto), affiancati da Leclerc in Camerun e Saint-Mart a Bangui, schierano l'intera Africa Equatoriale Francese con il Generale Charles de Gaulle. Il ralliement dell'AEF conferisce alla Francia Libera la prima base territoriale sovrana, un immenso bacino di truppe coloniali (Tirailleurs) e una cerniera geostrategica continua con l'Impero Britannico (Nigeria e Sudan). Soltanto il Gabon sotto il governatore Masson resta provvisoriamente legato a Vichy.",
      };
    }
    if (step >= 5) {
      return {
        name: "Afrique-Équatoriale Française / AEF (Mobilitazione Bellica Generale)",
        adminTitle: "Gouvernement Général de l'AEF (Pierre Husson) — Sforzo Bellico Imperiale",
        note: "Piena mobilitazione bellica dell'Africa Equatoriale Francese sotto il Governatore Generale Pierre Husson. Reclutamento e inquadramento di battaglioni coloniali (Tirailleurs del Ciad, Moyen-Congo e Oubangui-Chari) inviati sul fronte europeo; coordinamento con il Congo Belga e le colonie britanniche per la sicurezza delle rotte atlantiche e dell'Africa centrale; Pointe-Noire funge da porto di rifornimento navale per i convogli alleati.",
      };
    }
    if (step >= 2) {
      return {
        name: "Afrique-Équatoriale Française / AEF (Riarmo & Nomina di Félix Éboué in Ciad)",
        adminTitle: "Gouvernement Général de l'AEF (Brazzaville) — Difesa Coloniale",
        note: "Fase di riarmo post-Monaco e consolidamento dei confini: nomina storica di Félix Éboué a Governatore del Ciad (novembre 1938) per blindare la frontiera sahariana contro le minacce dell'Italia fascista in Libia (Striscia di Aouzou). Potenziamento del porto atlantico di Pointe-Noire, della ferrovia Congo-Océan (CFCO) e delle comunicazioni interne della federazione.",
      };
    }
    return {
      name: "Afrique-Équatoriale Française / AEF (Brazzaville — François-Joseph Reste de Roca)",
      adminTitle: "Gouvernement Général de l'AEF (Brazzaville)",
      note: "Federazione coloniale francese dell'Africa Equatoriale (AEF) con sede centrale a Brazzaville, comprendente le quattro colonie di Gabon, Moyen-Congo, Oubangui-Chari e Tchad, oltre al mandato SDN sul Camerun francese. Amministrazione riformista del Governatore Generale François-Joseph Reste de Roca (Fronte Popolare); infrastruttura strategica imperniata sulla ferrovia Congo-Océan (Pointe-Noire - Brazzaville) e sulla navigazione fluviale del bacino Congo-Ubangi; legname okoumé, cotone, olio di palma e diamanti.",
    };
  }

  // 2. Ricerca granulare e timeline-sensitive in AEF_PROVINCES_META
  const cleanId = id.toUpperCase().trim().replace('-', '_');
  const provMeta =
    AEF_PROVINCES_META[cleanId] ||
    (cleanId.startsWith('AEF_') ? undefined : AEF_PROVINCES_META['AEF_' + cleanId]);

  if (provMeta) {
    const isVichyGabon =
      provMeta.id === 'AEF_GA' &&
      step === 6 &&
      (rawName.includes('Vichy') || rawName.includes('(France)') || owner === 'VIC_AEF');

    return {
      name: isVichyGabon ? 'Colonie du Gabon (Vichy — Libreville)' : provMeta.getHistoricalName(step),
      adminTitle: isVichyGabon ? 'Gouverneur Georges Masson (Régime de Vichy — Libreville)' : provMeta.getAdminTitle(step),
      note: isVichyGabon
        ? "Il governatore Georges Masson rifiuta il ralliement all'AEF e mantiene il Gabon fedele al regime di Vichy fino alla campagna militare condotta da Leclerc e Koenig."
        : provMeta.getNote(step),
    };
  }

  // Lookup per chiave o nome in AEF_PROVINCES_META
  const pNorm = normKey.replace(/[^a-z0-9]/g, '');
  for (const k of ['AEF_TD', 'AEF_CF', 'AEF_CG', 'AEF_GA', 'AEF_CM']) {
    const item = AEF_PROVINCES_META[k];
    const nrmItem = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const nrmMod = item.modernName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const nrmHist = item.historicalName.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (
      pNorm === nrmItem ||
      pNorm === nrmMod ||
      (nrmItem.length >= 4 && pNorm.includes(nrmItem)) ||
      (nrmItem.length >= 4 && nrmHist.includes(pNorm))
    ) {
      const isVichyGabon =
        item.id === 'AEF_GA' &&
        step === 6 &&
        (rawName.includes('Vichy') || rawName.includes('(France)') || owner === 'VIC_AEF');

      return {
        name: isVichyGabon ? 'Colonie du Gabon (Vichy — Libreville)' : item.getHistoricalName(step),
        adminTitle: isVichyGabon ? 'Gouverneur Georges Masson (Régime de Vichy — Libreville)' : item.getAdminTitle(step),
        note: isVichyGabon
          ? "Il governatore Georges Masson rifiuta il ralliement all'AEF e mantiene il Gabon fedele al regime di Vichy fino alla campagna militare condotta da Leclerc e Koenig."
          : item.getNote(step),
      };
    }
  }

  // 3. Ricerca granulare nei dizionari storici AEF
  const aefDict = (step >= 6 ? HISTORICAL_TOPONYM_DICT['FFL_AEF'] : HISTORICAL_TOPONYM_DICT['F_AEF']) || HISTORICAL_TOPONYM_DICT['F_AEF'];
  if (aefDict) {
    if (aefDict[normKey]) {
      return {
        name: aefDict[normKey].historicalName,
        adminTitle: aefDict[normKey].adminTitle,
        note: aefDict[normKey].historicalNote || aefDict[normKey].note,
      };
    }
    const sortedKeys = Object.keys(aefDict).sort((a, b) => b.length - a.length);
    for (const k of sortedKeys) {
      if (k.length <= 3) continue;
      if (normKey === k || normKey.includes(k) || (k.length >= 5 && k.includes(normKey))) {
        return {
          name: aefDict[k].historicalName,
          adminTitle: aefDict[k].adminTitle,
          note: aefDict[k].historicalNote || aefDict[k].note,
        };
      }
    }
  }

  return null;
}

export function resolveSovietToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;

  // 1. ORANIENBAUM / KAAROSTA / LOMONOSOV (SOV_NW_RUS_256_Kaarosta_District)
  if (
    id === 'SOV_NW_RUS_256_Kaarosta_District' ||
    normKey.includes('kaarosta') ||
    normKey.includes('oranienbaum') ||
    (normKey.includes('lomonosov') && (owner === 'SOV' || id.startsWith('SOV_') || normKey.includes('leningrad')))
  ) {
    return {
      name: "Oranienbaum (Settore Fortificato di Kronštadt — Forti Krasnaja Gorka e Seraja Lošad')",
      adminTitle: "Oranienbaumskij Rajon — Oblast' di Leningrado (RSFSR / URSS)",
      note: "Distretto costiero meridionale del Golfo di Finlandia a presidio marittimo dell'isola-fortezza di Kronštadt e dell'accesso navale a Leningrado. Nel 1936-1940 sede dei formidabili forti corazzati Krasnaja Gorka (armato con possenti torri binate da 305 mm e batterie ferroviarie pesanti) e Seraja Lošad', caposaldi difensivi della Flotta del Baltico contro penetrazioni navali nemiche. Durante la Grande Guerra Patriottica diverrà la celebre sacca inespugnata della 'Testa di ponte di Oranienbaum' (Oranienbaumskij placdarm), difesa con tenacia dall'8ª Armata sovietica e rifornita via mare durante l'intero assedio di Leningrado. La città fu ribattezzata Lomonosov solo nel 1948 in onore dello scienziato Michail Lomonosov.",
    };
  }

  // 2. LENINGRADO / SAN PIETROBURGO (SOV_ADM1_RUS_49_Saint_Petersburg)
  if (
    id === 'SOV_ADM1_RUS_49_Saint_Petersburg' ||
    id === 'SOV_ADM1_RUS_49' ||
    (normKey.includes('saint_petersburg') && (owner === 'SOV' || id.startsWith('SOV_'))) ||
    (normKey.includes('leningrad') && !normKey.includes('oblast') && (owner === 'SOV' || id.startsWith('SOV_')))
  ) {
    return {
      name: "Leningrado (Città di Leningrado — Culla della Rivoluzione)",
      adminTitle: "Leningradskij Gorsovet & Distretto Militare di Leningrado (LVO — RSFSR / URSS)",
      note: "Seconda metropoli dell'URSS con oltre 3 milioni di abitanti, culla della Rivoluzione bolscevica del 1917, capitale navale della Flotta del Baltico (Bandiera Rossa), colosso dei cantieri navali (Baltijskij Zavod, Cantiere Ždanov) e dell'industria pesante (Stabilimenti Kirov). Sede del Comitato del Partito guidato da Andrej Ždanov e del comando del Distretto Militare di Leningrado affidato al generale Kirill Mereckov.",
    };
  }

  // 3. TOSNO / LJUSINA (SOV_NW_RUS_258_Tusina_District)
  if (
    id === 'SOV_NW_RUS_258_Tusina_District' ||
    normKey.includes('tusina') ||
    normKey.includes('tosno') ||
    normKey.includes('ljusina')
  ) {
    return {
      name: "Tosno (Corridoio Ferroviario Principale Mosca-Leningrado / Fiume Tosna)",
      adminTitle: "Tosnenskij Rajon — Oblast' di Leningrado (RSFSR / URSS)",
      note: "Distretto strategico a sud-est di Leningrado lungo il corso del fiume Tosna. Attraversato dall'arteria ferroviaria principale Oktjabr'skaja a doppio binario elettrificato che unisce Mosca a Leningrado, via logistica primaria per il transito delle divisioni dell'Armata Rossa e i rifornimenti industriali.",
    };
  }

  // 4. KRASNOGVARDEJSK / GATČINA (SOV_NW_RUS_263_Gatchinsky_District)
  if (
    id === 'SOV_NW_RUS_263_Gatchinsky_District' ||
    normKey.includes('gatchin') ||
    normKey.includes('gatcina') ||
    normKey.includes('krasnogvardeysk') ||
    normKey.includes('krasnogvardejsk')
  ) {
    return {
      name: "Krasnogvardejsk (Gatčina / Distretto Militare e Nodo Ferroviario)",
      adminTitle: "Krasnogvardejskij Rajon — Oblast' di Leningrado (RSFSR / URSS)",
      note: "Denominata ufficialmente Krasnogvardejsk ('Città della Guardia Rossa') tra il 1929 e il 1944. Primario snodo ferroviario delle linee radiali a sud di Leningrado verso Pskov, Narva e Novgorod, sede di grandi caserme della guarnigione militare dell'Armata Rossa e dell'aeroporto militare di Krasnogvardejsk.",
    };
  }

  // 5. KINGISEPP / JAMBURG (SOV_NW_RUS_306_Jaama_District)
  if (
    id === 'SOV_NW_RUS_306_Jaama_District' ||
    normKey.includes('jaama') ||
    normKey.includes('kingisepp') ||
    normKey.includes('jamburg')
  ) {
    return {
      name: "Kingisepp (Jamburg / Distretto di Frontiera sul Fiume Luga)",
      adminTitle: "Kingiseppskij Rajon — Oblast' di Leningrado (RSFSR / URSS)",
      note: "Storica città fortificata zarista di Jamburg, ribattezzata Kingisepp nel 1922 in onore del leader comunista estone Viktor Kingissepp. Distretto di frontiera militare dell'Armata Rossa sul fiume Luga a sbarramento del confine di stato con la Repubblica di Estonia stabilito dal Trattato di Tartu del 1920.",
    };
  }

  // 6. SLANCY / BACINO SCISTI BITUMINOSI (SOV_NW_RUS_260_Slantsevsky_District)
  if (
    id === 'SOV_NW_RUS_260_Slantsevsky_District' ||
    normKey.includes('slantsev') ||
    normKey.includes('slancy') ||
    normKey.includes('slantse')
  ) {
    return {
      name: "Slancy (Bacino degli Scisti Bituminosi del Narva)",
      adminTitle: "Slancevskij Rajon — Oblast' di Leningrado (RSFSR / URSS)",
      note: "Distretto industriale ed energetico fondato negli anni Trenta sotto i piani quinquennali sovietici per l'estrazione intensiva e la lavorazione degli scisti bituminosi combustibili lungo il fiume Pljussa, fornendo gas sintetico e combustibile alla centrale di Leningrado.",
    };
  }

  // 7. LUGA / LINEA DIFENSIVA FORTIFICATA (SOV_NW_RUS_307_Luzhsky_District)
  if (
    id === 'SOV_NW_RUS_307_Luzhsky_District' ||
    normKey.includes('luzhsky') ||
    (normKey.includes('luga') && (owner === 'SOV' || id.startsWith('SOV_') || normKey.includes('leningrad')))
  ) {
    return {
      name: "Luga (Linea Difensiva Fortificata di Luga / Lužskij Rubež)",
      adminTitle: "Lužskij Rajon — Oblast' di Leningrado (RSFSR / URSS)",
      note: "Baluardo meridionale dell'Oblast di Leningrado imperniato sul corso del fiume Luga; importante nodo di comunicazioni stradali e ferroviarie lungo l'asse Pskov-Leningrado, fulcro della futura linea fortificata campale (Lužskij Rubež) che nell'estate 1941 rallentò l'avanzata della 4ª Panzergruppe tedesca.",
    };
  }

  // 8. VOLOSOVO / INGRIA SUD-OCCIDENTALE (SOV_NW_RUS_293_Volosovsky_District)
  if (
    id === 'SOV_NW_RUS_293_Volosovsky_District' ||
    normKey.includes('volosovsky') ||
    normKey.includes('volosovo')
  ) {
    return {
      name: "Volosovo (Altopiano di Ižora / Ingria Sud-Occidentale)",
      adminTitle: "Volosovskij Rajon — Oblast' di Leningrado (RSFSR / URSS)",
      note: "Distretto agricolo e nodo ferroviario dell'altopiano calcareo di Ižora, situato a metà strada tra Krasnogvardejsk e Kingisepp lungo la linea ferroviaria Vejmarn-Gatčina.",
    };
  }

  // 9. VSEVOLOŽSK / INGRIA SETTENTRIONALE (SOV_NW_RUS_271_Vsevolozhsky_District)
  if (
    id === 'SOV_NW_RUS_271_Vsevolozhsky_District' ||
    normKey.includes('vsevolozh') ||
    normKey.includes('vsevolozsk')
  ) {
    return {
      name: "Vsevoložsk (Ingria Settentrionale / Sponda del Lago Ladoga)",
      adminTitle: "Vsevoložskij Rajon — Oblast' di Leningrado (RSFSR / URSS)",
      note: "Distretto compreso tra la periferia settentrionale di Leningrado, la riva destra della Neva e la costa sud-occidentale del Lago Ladoga (faro e pontile di Osinovec, futuro terminale costiero della leggendaria 'Strada della Vita').",
    };
  }

  // 10. SOSNOVYJ BOR / GOLFO DI KOPOR'E (SOV_NW_RUS_272_Sosnovy_Bor)
  if (
    id === 'SOV_NW_RUS_272_Sosnovy_Bor' ||
    normKey.includes('sosnovy_bor') ||
    normKey.includes('koporye') ||
    normKey.includes('kopore')
  ) {
    return {
      name: "Sosnovyj Bor (Golfo di Kopor'e / Baia di Lužskaja)",
      adminTitle: "Distretto Litoraneo Sud del Golfo di Finlandia — Oblast' di Leningrado (RSFSR / URSS)",
      note: "Fascia costiera sud-occidentale del Golfo di Finlandia comprendente la storica fortezza medievale di Kopor'e, le ampie baie di Kopor'e e Lužskaja e le postazioni di sorveglianza costiera della Flotta del Baltico.",
    };
  }

  // 11. KIROVSK E MGA / ŠLISSEL'BURG (SOV_NW_RUS_280_Korotka_District)
  if (
    id === 'SOV_NW_RUS_280_Korotka_District' ||
    normKey.includes('korotka') ||
    normKey.includes('slisselburg') ||
    normKey.includes('shlisselburg') ||
    normKey.includes('kirovsk') ||
    normKey.includes('mga')
  ) {
    return {
      name: "Kirovsk e Šlissel'burg (Mga / Sbocco della Neva sul Lago Ladoga)",
      adminTitle: "Kirovskij Rajon & Piazzaforte di Šlissel'burg — Oblast' di Leningrado (RSFSR / URSS)",
      note: "Punto geostrategico di primaria importanza dove il fiume Neva si origina dal Lago Ladoga. Include la secolare fortezza isolana di Šlissel'burg (Orešek), il nodo ferroviario cruciale di Mga (punto di convergenza delle linee per Vologda, Mosca e Murmansk) e la centrale termoelettrica Dubrovskaja.",
    };
  }

  // 12. VOLCHOV / CENTRALE VOLCHOVGES (SOV_NW_RUS_286_Olhava_District)
  if (
    id === 'SOV_NW_RUS_286_Olhava_District' ||
    normKey.includes('olhava') ||
    normKey.includes('volchov') ||
    normKey.includes('volkhov')
  ) {
    return {
      name: "Volchov (Centrale Idroelettrica VolchovGES e Industria dell'Alluminio)",
      adminTitle: "Volchovskij Rajon — Oblast' di Leningrado (RSFSR / URSS)",
      note: "Cuore idroelettrico dell'Oblast di Leningrado sul fiume Volchov: sede della prima grande centrale idroelettrica del piano leninista GOELRO (Volchovskaja GES, inaugurata nel 1926) e del primo impianto sovietico per la fusione dell'alluminio metallico.",
    };
  }

  // 13. TICHVIN (SOV_NW_RUS_291_Tihvin__District)
  if (
    id === 'SOV_NW_RUS_291_Tihvin__District' ||
    normKey.includes('tihvin') ||
    normKey.includes('tikhvin')
  ) {
    return {
      name: "Tichvin (Nodo Ferroviario Transcontinentale della Russia Nord-Orientale)",
      adminTitle: "Tichvinskij Rajon — Oblast' di Leningrado (RSFSR / URSS)",
      note: "Crocevia ferroviario vitale della Russia nord-occidentale che connette Leningrado con Vologda, Jaroslavl', gli Urali e le linee artiche per Arcangelo e Murmansk.",
    };
  }

  // 14. KIRIŠI (SOV_NW_RUS_304_Kirishsky_District)
  if (
    id === 'SOV_NW_RUS_304_Kirishsky_District' ||
    normKey.includes('kirish') ||
    normKey.includes('kirisi')
  ) {
    return {
      name: "Kiriši (Bacino Fluviale del Basso Volchov)",
      adminTitle: "Kirišskij Rajon — Oblast' di Leningrado (RSFSR / URSS)",
      note: "Distretto fluviale, forestale e ferroviario lungo il corso del fiume Volchov a sud-est di Leningrado, tra Mga e Čudovo.",
    };
  }

  // 15. PODPOROŽ'E / ALTO SVIR' (SOV_NW_RUS_267_Koskenala_District)
  if (
    id === 'SOV_NW_RUS_267_Koskenala_District' ||
    normKey.includes('koskenala') ||
    normKey.includes('podporozh')
  ) {
    return {
      name: "Podporož'e (Koskenala / Centrale Idroelettrica dell'Alto Svir')",
      adminTitle: "Podporožskij Rajon — Oblast' di Leningrado (RSFSR / URSS)",
      note: "Distretto sul corso superiore del fiume Svir' (emissario del Lago Onega verso il Lago Ladoga), sede della diga e centrale idroelettrica Verchne-Svirskaja lungo la via d'acqua Mar Baltico-Mar Bianco.",
    };
  }

  // 16. LODEJNOE POLE / BASSO SVIR' (SOV_NW_RUS_302_Lotinapelto_District)
  if (
    id === 'SOV_NW_RUS_302_Lotinapelto_District' ||
    normKey.includes('lotinapelto') ||
    normKey.includes('lodeynoye') ||
    normKey.includes('lodejnoe')
  ) {
    return {
      name: "Lodejnoe Pole (Fiume Svir' / Centrale Nizhne-Svirskaja)",
      adminTitle: "Lodejnopol'skij Rajon — Oblast' di Leningrado (RSFSR / URSS)",
      note: "Storica città cantieristica fluviale fondata da Pietro il Grande sul fiume Svir'; sede della centrale idroelettrica Nizhne-Svirskaja e snodo della ferrovia Murmansk-Leningrado.",
    };
  }

  // 17. VYBORG / TERIJOKI (FIN_HIST_259_Vyborgsky_District)
  if (
    id === 'FIN_HIST_259_Vyborgsky_District' ||
    id === 'FIN_HIST_259' ||
    normKey.includes('viipurin_laani') ||
    normKey.includes('vyborgsky')
  ) {
    if (step >= 6) {
      return {
        name: "Vyborg e Terijoki (Istmo Careliano — Annessione Sovietica 1940)",
        adminTitle: "Vyborgskij Rajon — RSS Carelo-Finlandese (URSS)",
        note: "Capoluogo dell'istmo careliano e antica Viipuri finlandese, ceduta all'URSS il 12 marzo 1940 a conclusione della Guerra d'Inverno (Trattato di Mosca) con la totale evacuazione della popolazione civile finlandese e incorporata nella neo-costituita Repubblica Socialista Sovietica Carelo-Finlandese.",
      };
    }
    return {
      name: "Viipurin lääni (Viipuri, Terijoki e Koivisto — Istmo Careliano)",
      adminTitle: "Viipurin lääni — Suomen tasavalta (Repubblica di Finlandia)",
      note: "Provincia sovrana della Repubblica di Finlandia comprendente la seconda città del paese (Viipuri / Viborg), il porto fortificato di Koivisto e l'istmo careliano sbarrato dalla Linea Mannerheim a presidio della frontiera stabilita dal Trattato di Tartu del 1920 con l'URSS a soli 32 km da Leningrado.",
    };
  }

  return null;
}



export function getExtendedToponym(
  rawName: string,
  owner: string,
  nid?: string,
  centroid?: [number, number],
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } {
  if (!rawName) return { name: 'Territorio non assegnato' };

  const normKey = rawName
    .replace(/[łŁ]/g, 'l')
    .replace(/[øØ]/g, 'o')
    .replace(/[æÆ]/g, 'ae')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_');

  const id = String(nid || '');

  // 0. Overrides prioritari per Andorra (AND / codici AD / toponimi andorrani)
  if (
    owner === 'AND' ||
    id === 'AND' ||
    id === 'AD' ||
    id === 'AND_HIST' ||
    normKey.includes('andorra') ||
    normKey.includes('vella')
  ) {
    return {
      name: 'Principato d\'Andorra',
      adminTitle: 'Principat d\'Andorra (Coprincipato Sovrano Neutrale)',
      note: 'Antico coprincipato sovrano neutrale incastonato tra i Pirenei catalani e francesi, retto congiuntamente dal Vescovo di Urgell e dal Presidente della Repubblica Francese. Durante la Guerra Civile Spagnola e la Seconda Guerra Mondiale mantenne una rigorosa neutralità; dal 1936 al 1940 un distaccamento di guardie mobili francesi (René Baulard) stazionò nel principato per garantirne l\'ordine e la sicurezza senza alterarne la sovranità. Fu rifugio per civili e via di fuga montuosa clandestina.',
    };
  }

  // 0.03 Overrides prioritari per le Isole Fær Øer (Færøerne / Føroyar — Danimarca / Occupazione Britannica 1940)
  if (
    id === 'FO001' ||
    id === 'FO_FAROE_HIST' ||
    id === 'FO' ||
    id === 'FRO' ||
    normKey.includes('faroe') ||
    normKey.includes('faeroe') ||
    normKey.includes('faeroes') ||
    normKey.includes('færø') ||
    normKey.includes('faerø') ||
    normKey.includes('føroyar') ||
    normKey.includes('foroyar') ||
    normKey.includes('torshavn') ||
    normKey.includes('tórshavn') ||
    normKey.includes('62_0') ||
    (centroid && centroid[0] >= -8 && centroid[0] <= -5 && centroid[1] >= 61 && centroid[1] <= 63)
  ) {
    const isBritishOcc = owner === 'UK' || (yearStep !== undefined && yearStep >= 6);
    if (isBritishOcc) {
      return {
        name: 'Isole Fær Øer (Occupazione Britannica — Operazione Valentine)',
        adminTitle: 'Military Administration of the Faroe Islands (British Garrison / Royal Navy Command, Tórshavn) & Løgting',
        note: 'A seguito dell\'invasione tedesca della Danimarca (aprile 1940), le forze britanniche occuparono preventivamente l\'arcipelago (Operazione Valentine) per negare alla Kriegsmarine basi navali strategiche nel Nord Atlantico. L\'amministrazione civile del Løgting e dell\'amtmand Carl Aage Hilbert fu preservata e l\'Ammiragliato riconobbe ufficialmente la bandiera faroese (Merkið) per la flotta peschereccia.',
      };
    }
    return {
      name: 'Isole Fær Øer (Færøerne / Føroyar)',
      adminTitle: 'Færø Amt (Amtmand Carl Aage Hilbert — Tórshavn) / Løgting',
      note: 'Contea insulare del Regno di Danimarca nell\'Atlantico settentrionale. Governata dall\'amtmand Carl Aage Hilbert con sede a Tórshavn (isola di Streymoy) e assemblea rappresentativa del Løgting, sotto la sovranità costituzionale di re Cristiano X.',
    };
  }

  // 0.031 Overrides prioritari per i Paesi Scandinavi (Danimarca, Svezia, Norvegia, Finlandia, Islanda)
  if (
    owner === 'DEN' ||
    owner === 'DK' ||
    owner === 'SWE' ||
    owner === 'SE' ||
    owner === 'NOR' ||
    owner === 'NO' ||
    owner === 'FIN' ||
    owner === 'FI' ||
    owner === 'ISL' ||
    owner === 'IS' ||
    id.startsWith('DK') ||
    id.startsWith('SE') ||
    id.startsWith('NO') ||
    id.startsWith('FI') ||
    id.startsWith('IS') ||
    id.startsWith('FIN_HIST_') ||
    id === 'FO_FAROE_HIST' ||
    normKey.includes('denmark') ||
    normKey.includes('danmark') ||
    normKey.includes('danimarca') ||
    normKey.includes('sweden') ||
    normKey.includes('sverige') ||
    normKey.includes('svezia') ||
    normKey.includes('norway') ||
    normKey.includes('norge') ||
    normKey.includes('norvegia') ||
    normKey.includes('finland') ||
    normKey.includes('suomi') ||
    normKey.includes('finlandia') ||
    normKey.includes('karelia') ||
    normKey.includes('carelia') ||
    normKey.includes('petsamo') ||
    normKey.includes('salla') ||
    normKey.includes('iceland') ||
    normKey.includes('island')
  ) {
    const scanTop = resolveScandinavianToponym(id, rawName, normKey, owner, yearStep);
    if (scanTop) return scanTop;
  }

  // 0.034 Overrides prioritari per URSS (Oblast di Leningrado, Kronštadt, Ingria, Carelia e Russia Nord-Occidentale)
  if (
    owner === 'SOV' ||
    owner === 'USSR' ||
    id.startsWith('SOV_') ||
    id.startsWith('RUS_') ||
    id.startsWith('FIN_HIST_259') ||
    normKey.includes('leningrad') ||
    normKey.includes('leningrado') ||
    normKey.includes('oranienbaum')
  ) {
    const sovTop = resolveSovietToponym(id, rawName, normKey, owner, yearStep);
    if (sovTop) return sovTop;
  }

  // 0.0349 Overrides prioritari per Africa Occidentale Francese (AOF / F_AOF / VIC_AOF / codici AOF_... / territori coloniali AOF)
  if (
    owner === 'F_AOF' ||
    owner === 'VIC_AOF' ||
    id.startsWith('AOF_') ||
    id.startsWith('AOF-') ||
    id === 'AOF' ||
    id === 'F_AOF' ||
    id === 'VIC_AOF' ||
    id === 'FWA' ||
    normKey.includes('french_west_africa') ||
    normKey.includes('afrique_occidentale') ||
    normKey.includes('africa_occidentale_francese') ||
    normKey.includes('senegal') ||
    normKey.includes('mauritanie') ||
    normKey.includes('mauritania') ||
    normKey.includes('soudan') ||
    normKey.includes('dakar') ||
    normKey.includes('dahomey') ||
    Boolean((AOF_PROVINCES_META as any)?.[id]) ||
    Boolean((AOF_PROVINCES_META as any)?.[normKey])
  ) {
    const aofTop = resolveAOFToponym(id, rawName, normKey, owner, yearStep);
    if (aofTop) return aofTop;
  }

  // 0.035 Overrides prioritari per AEF
  if (
    owner === 'F_AEF' ||
    owner === 'FFL_AEF' ||
    owner === 'VIC_AEF' ||
    id.startsWith('AEF_') ||
    normKey.includes('aef') ||
    Boolean((AEF_PROVINCES_META as any)?.[id]) ||
    Boolean((AEF_PROVINCES_META as any)?.[normKey])
  ) {
    const aefTop = resolveAEFToponym(id, rawName, normKey, owner, yearStep);
    if (aefTop) return aefTop;
  }

  // 0.035 Overrides prioritari esaustivi per Africa (AOI, Quarta Sponda, AOF, AEF, Congo Belga, Colonie Portoghesi, Africa Britannica, Africa Spagnola, Sudafrica, Liberia, Egitto, Sudan)
  const afTop = resolveAfricanToponym(id, rawName, normKey, owner, yearStep);
  if (afTop) return afTop;

  // 0.04 Overrides prioritari per Svizzera, Austria e Liechtenstein (62 distretti NUTS-3)
  if (
    owner === 'SWI' ||
    owner === 'AUS' ||
    owner === 'LIE' ||
    id.startsWith('CH') ||
    id.startsWith('AT') ||
    id.startsWith('LI') ||
    normKey.includes('schweiz') ||
    normKey.includes('suisse') ||
    normKey.includes('svizzera') ||
    normKey.includes('osterreich') ||
    normKey.includes('austria') ||
    normKey.includes('liechtenstein')
  ) {
    const swiAusTop = resolveSwissAustrianToponym(id, rawName, normKey, owner, yearStep);
    if (swiAusTop) return swiAusTop;
  }

  // 0.05 Overrides prioritari per Benelux (Belgio, Paesi Bassi, Lussemburgo - 85 distretti NUTS-3)
  if (
    owner === 'BEL' ||
    owner === 'HOL' ||
    owner === 'LUX' ||
    id.startsWith('BE') ||
    id.startsWith('NL') ||
    id.startsWith('LU') ||
    normKey.includes('belgi') ||
    normKey.includes('nederland') ||
    normKey.includes('holland') ||
    normKey.includes('luxembourg') ||
    normKey.includes('flanders') ||
    normKey.includes('wallonie')
  ) {
    const benTop = resolveBeneluxToponym(id, rawName, normKey, owner, yearStep);
    if (benTop) return benTop;
  }

  // 0.055 Overrides prioritari per i Balcani (Ungheria, Romania, Bulgaria, Grecia, Albania, Jugoslavia, NDH - 225 distretti NUTS-3)
  if (
    owner === 'HUN' ||
    owner === 'ROM' ||
    owner === 'BUL' ||
    owner === 'GRE' ||
    owner === 'ALB' ||
    owner === 'YUG' ||
    owner === 'CRO' ||
    owner === 'HU' ||
    owner === 'RO' ||
    owner === 'BG' ||
    owner === 'EL' ||
    owner === 'AL' ||
    owner === 'RS' ||
    owner === 'HR' ||
    owner === 'SI' ||
    owner === 'BA' ||
    owner === 'ME' ||
    owner === 'MK' ||
    owner === 'XK' ||
    id.startsWith('HU') ||
    id.startsWith('RO') ||
    id.startsWith('BG') ||
    id.startsWith('EL') ||
    id.startsWith('AL') ||
    id.startsWith('RS') ||
    id.startsWith('HR') ||
    id.startsWith('SI') ||
    id.startsWith('BA') ||
    id.startsWith('ME') ||
    id.startsWith('MK') ||
    id.startsWith('XK') ||
    id.startsWith('YUG') ||
    id === 'CROATIAN_LITTORAL' ||
    id === 'ZADAR_DALMATIA' ||
    id === 'KOSOVO_METOHIJA' ||
    normKey.includes('magyar') ||
    normKey.includes('hungar') ||
    normKey.includes('romani') ||
    normKey.includes('bulgar') ||
    normKey.includes('hellas') ||
    normKey.includes('greec') ||
    normKey.includes('alban') ||
    normKey.includes('jugoslav') ||
    normKey.includes('yugoslav') ||
    normKey.includes('serbi') ||
    normKey.includes('croat') ||
    normKey.includes('sloven') ||
    normKey.includes('bosn') ||
    normKey.includes('montenegr') ||
    normKey.includes('macedon') ||
    normKey.includes('kosovo') ||
    normKey.includes('dalmat')
  ) {
    const balkTop = resolveBalkansToponym(id, rawName, normKey, owner, yearStep);
    if (balkTop) {
      return {
        name: balkTop.name,
        adminTitle: balkTop.adminTitle,
        note: balkTop.note,
      };
    }
  }

  // 0. Overrides prioritari per Spagna (SPR / SPA / codici ES / toponimi spagnoli)
  if (
    owner === 'SPR' ||
    owner === 'SPA' ||
    id.startsWith('ES') ||
    normKey.includes('espana') ||
    normKey.includes('spain')
  ) {
    const spTop = resolveSpainToponym(id, rawName, normKey, owner, yearStep);
    if (spTop) return spTop;
  }

  // 0.048 Overrides prioritari per Colonie e Territori d'Oltremare francesi
  if (
    owner.startsWith('F_') ||
    owner.startsWith('VIC_') ||
    owner === 'FFL_AEF' ||
    normKey.includes('alger') ||
    normKey.includes('morocco') ||
    normKey.includes('maroc') ||
    normKey.includes('tunis') ||
    normKey.includes('aof') ||
    normKey.includes('aef') ||
    normKey.includes('indochin') ||
    normKey.includes('indo_chin') ||
    normKey.includes('madagascar') ||
    normKey.includes('syria') ||
    normKey.includes('syrie') ||
    normKey.includes('lebanon') ||
    normKey.includes('liban') ||
    normKey.includes('somaliland') ||
    normKey.includes('somali') ||
    normKey.includes('cambod') ||
    normKey.includes('laos') ||
    normKey.includes('cochin') ||
    normKey.includes('caledon') ||
    normKey.includes('hebrid') ||
    normKey.includes('wallis') ||
    normKey.includes('tahiti') ||
    normKey.includes('martinique') ||
    normKey.includes('guadeloupe') ||
    normKey.includes('saint_martin') ||
    normKey.includes('st_martin') ||
    normKey.includes('saint_barthelemy') ||
    normKey.includes('st_barthelemy') ||
    normKey.includes('guyane') ||
    normKey.includes('french_guiana') ||
    normKey.includes('cameroon') ||
    normKey.includes('cameroun') ||
    normKey.includes('togo') ||
    normKey.includes('congo') ||
    normKey.includes('chad') ||
    normKey.includes('tchad') ||
    normKey.includes('pondicher') ||
    normKey.includes('saint_pierre') ||
    normKey.includes('st_pierre') ||
    normKey.includes('kouang_tcheou') ||
    (owner === 'VIC' && (normKey.includes('martin') || normKey.includes('guadel') || normKey.includes('barthelemy') || normKey.includes('somali') || normKey.includes('guyane') || normKey.includes('caledon') || normKey.includes('hebrid') || normKey.includes('wallis')))
  ) {
    const colFrTop = resolveFrenchColonialToponym(id, rawName, normKey, owner, yearStep);
    if (colFrTop) return colFrTop;
  }

  // 0.05 Overrides prioritari per Francia Metropolitana (FRA / VIC / codici FR / toponimi francesi)
  if (
    owner === 'FRA' ||
    owner === 'VIC' ||
    id.startsWith('FR') ||
    normKey.includes('france') ||
    normKey.includes('french') ||
    normKey.includes('vichy')
  ) {
    const frTop = resolveFranceToponym(id, rawName, normKey, owner, yearStep);
    if (frTop) return frTop;
  }

  // 0.08 Overrides prioritari per Germania (GER / codici DE / toponimi tedeschi d'epoca)
  if (
    owner === 'GER' ||
    id.startsWith('DE') ||
    normKey.includes('deutschland') ||
    normKey.includes('germany') ||
    normKey.includes('reich')
  ) {
    const deTop = resolveGermanyToponym(id, rawName, normKey, owner, yearStep);
    if (deTop) return deTop;
  }

  // 0.09 Overrides prioritari per Italia (ITA / codici IT / toponimi italiani)
  if (
    owner === 'ITA' ||
    id.startsWith('IT') ||
    normKey.includes('italia') ||
    normKey.includes('italy')
  ) {
    const itTop = resolveItalyToponym(id, rawName, normKey, owner, yearStep);
    if (itTop) return itTop;
  }

  // 0.10 Overrides prioritari per Polonia (POL / DANZIG / codici PL / toponimi polacchi d'epoca)
  if (
    owner === 'POL' ||
    owner === 'DANZIG' ||
    id.startsWith('PL') ||
    normKey.includes('polska') ||
    normKey.includes('poland') ||
    normKey.includes('polonia')
  ) {
    const plTop = resolvePolandToponym(id, rawName, normKey, owner, yearStep);
    if (plTop) return plTop;
  }

  // 0.11 Overrides prioritari per Giappone e Colonie (JAP / codici JP / Chōsen / Taiwan / Karafuto / Kantō-shū / Nan'yō Guntō)
  if (
    owner === 'JAP' ||
    id.startsWith('JP') ||
    id.startsWith('KR') ||
    id.startsWith('TW') ||
    normKey.includes('japan') ||
    normKey.includes('nippon') ||
    normKey.includes('chosen') ||
    normKey.includes('taiwan') ||
    normKey.includes('formosa') ||
    normKey.includes('karafuto') ||
    normKey.includes('nanyo') ||
    normKey.includes('kwantung')
  ) {
    const jpTop = resolveJapanToponym(id, rawName, normKey, owner, yearStep);
    if (jpTop) return jpTop;
  }

  // 0.12 Overrides prioritari per Cina e Stati Regionali Cinesi (CHI / WJ_CHI / MAN / MEJ / CCP_CHI / XIN / TIB / CHN_...)
  if (
    owner === 'CHI' ||
    owner === 'WJ_CHI' ||
    owner === 'MAN' ||
    owner === 'MEJ' ||
    owner === 'CCP_CHI' ||
    owner === 'XIN' ||
    owner === 'TIB' ||
    id.startsWith('CHN_') ||
    id.startsWith('CN') ||
    normKey.includes('china') ||
    normKey.includes('manchukuo') ||
    normKey.includes('mengjiang') ||
    normKey.includes('xinjiang') ||
    normKey.includes('tibet')
  ) {
    const cnTop = resolveChinaToponym(id, rawName, normKey, owner, yearStep);
    if (cnTop) return cnTop;
  }

  // 0.13b Overrides prioritari per Canada e Terranova (CAN / CA / Dominion of Canada & Newfoundland)
  if (
    owner === 'CAN' ||
    owner === 'CA' ||
    id.startsWith('CA_') ||
    id.startsWith('CA-') ||
    id === 'CAN' ||
    id === 'CA' ||
    id === '124' ||
    id === 'CA_NL' ||
    normKey.includes('canada') ||
    normKey.includes('newfoundland') ||
    normKey.includes('terranova') ||
    normKey.includes('ontario') ||
    normKey.includes('quebec') ||
    normKey.includes('nova_scotia') ||
    normKey.includes('new_brunswick') ||
    normKey.includes('manitoba') ||
    normKey.includes('saskatchewan') ||
    normKey.includes('alberta') ||
    normKey.includes('british_columbia') ||
    normKey.includes('yukon') ||
    normKey.includes('nunavut')
  ) {
    const canTop = resolveCanadaToponym(id, rawName, normKey, owner, yearStep);
    if (canTop) return canTop;
  }

  // 0.13 Overrides prioritari per Regno Unito, Dominions e Territori della Corona (UK, CAN, AST, NZL, SAF, RAJ, EGY, IRQ / codici UK... / IM / GG / JE / GIB / MT / CY)
  if (
    owner === 'UK' ||
    owner === 'CAN' ||
    owner === 'AST' ||
    owner === 'NZL' ||
    owner === 'SAF' ||
    owner === 'RAJ' ||
    owner === 'EGY' ||
    owner === 'IRQ' ||
    id.startsWith('UK') ||
    id.startsWith('IM') ||
    id.startsWith('GG') ||
    id.startsWith('JE') ||
    id === 'GIB' ||
    id.startsWith('MT') ||
    id.startsWith('CY') ||
    normKey.includes('united_kingdom') ||
    normKey.includes('gran_bretagna')
  ) {
    const colonialTop = resolveBritishColonialToponym(id, rawName, normKey, owner, yearStep);
    if (colonialTop) return colonialTop;

    const ukTop = resolveUKToponym(id, rawName, normKey, owner, yearStep);
    if (ukTop) return ukTop;
  }

  // 0.135 Overrides prioritari per Stati Uniti d'America (USA / US / codici US_... / stati e territori statunitensi)
  if (
    owner === 'USA' ||
    owner === 'US' ||
    id.startsWith('US_') ||
    id === 'USA' ||
    id === 'US' ||
    id === '840' ||
    normKey.includes('united_states') ||
    normKey.includes('stati_uniti') ||
    normKey.includes('pearl_harbor') ||
    normKey.includes('panama_canal') ||
    normKey.includes('canal_zone')
  ) {
    const usaTop = resolveUSAToponym(id, rawName, normKey, owner, yearStep);
    if (usaTop) return usaTop;
  }


    // 0.136 Overrides prioritari per Stati Uniti Messicani (MEX / MX / codici MX_... / stati e territori messicani)
  if (
    owner === 'MEX' ||
    owner === 'MX' ||
    id.startsWith('MX_') ||
    id.startsWith('MX-') ||
    id === 'MEX' ||
    id === 'MX' ||
    id === '484' ||
    normKey.includes('mexico') ||
    normKey.includes('messico') ||
    normKey.includes('estados_unidos_mexicanos') ||
    Boolean((MEXICO_PROVINCES_META as any)?.[id])
  ) {
    const mexTop = resolveMexicoToponym(id, rawName, normKey, owner, yearStep);
    if (mexTop) return mexTop;
  }

  // 0.137 Overrides prioritari per Africa Occidentale Francese (AOF / F_AOF / VIC_AOF / codici AOF_... / territori coloniali AOF)
  if (
    owner === 'F_AOF' ||
    owner === 'VIC_AOF' ||
    id.startsWith('AOF_') ||
    id.startsWith('AOF-') ||
    id === 'AOF' ||
    id === 'F_AOF' ||
    id === 'VIC_AOF' ||
    id === 'FWA' ||
    normKey.includes('french_west_africa') ||
    normKey.includes('afrique_occidentale') ||
    normKey.includes('africa_occidentale_francese') ||
    normKey.includes('senegal') ||
    normKey.includes('mauritanie') ||
    normKey.includes('mauritania') ||
    normKey.includes('soudan') ||
    normKey.includes('dakar') ||
    normKey.includes('dahomey') ||
    Boolean((AOF_PROVINCES_META as any)?.[id]) ||
    Boolean((AOF_PROVINCES_META as any)?.[normKey])
  ) {
    const aofTop = resolveAOFToponym(id, rawName, normKey, owner, yearStep);
    if (aofTop) return aofTop;
  }

  // 0.14 Overrides prioritari per Unione Sovietica (SOV / codici RU, BY, UA, MD, KZ, UZ, TM, TJ, KG, GE, AM, AZ / toponimi sovietici)
  if (
    owner === 'SOV' ||
    id.startsWith('RU') ||
    id.startsWith('BY') ||
    id.startsWith('UA') ||
    id.startsWith('MD') ||
    id.startsWith('KZ') ||
    id.startsWith('UZ') ||
    id.startsWith('TM') ||
    id.startsWith('TJ') ||
    id.startsWith('KG') ||
    id.startsWith('GE') ||
    id.startsWith('AM') ||
    id.startsWith('AZ') ||
    normKey.includes('soviet') ||
    normKey.includes('russia') ||
    normKey.includes('moscow') ||
    normKey.includes('leningrad') ||
    normKey.includes('stalingrad') ||
    normKey.includes('sssr')
  ) {
    const sovTop = resolveUSSRToponym(id, rawName, normKey, owner, yearStep);
    if (sovTop) return sovTop;
  }

  // 0.1 Overrides prioritari per macro-entità insulari e codici NUTS specifici
  if (owner === 'ITA') {
    if (
      id === 'EL421' ||
      normKey.includes('dodecan') ||
      normKey.includes('rodos') ||
      normKey.includes('rhodes') ||
      normKey.includes('kalymnos_karpathos')
    ) {
      return {
        name: 'Rodi (Isole Italiane dell\'Egeo)',
        adminTitle: 'Provincia di Rodi',
        note: 'Possedimento delle Isole Italiane dell\'Egeo (1912-1943). Capoluogo Rodi.',
      };
    }

    // Somalia: distinzione tra Somalia Britannica occupata (agosto 1940, step >= 7) e Governo della Somalia (Mogadiscio)
    if (
      normKey.includes('somaliland') ||
      normKey.includes('somali') ||
      id.startsWith('SO') ||
      id.startsWith('SOM') ||
      id === 'UK_SOMALILAND' ||
      id === 'BR_SOMALILAND'
    ) {
      if (
        normKey.includes('british') ||
        normKey.includes('britannic') ||
        normKey.includes('berbera') ||
        id === 'UK_SOMALILAND' ||
        id === 'BR_SOMALILAND'
      ) {
        return {
          name: 'Somalia Britannica Occupata (Berbera — AOI)',
          adminTitle: 'Governo Militare della Somalia Britannica (AOI — Gen. Guglielmo Nasi)',
          note: 'Conquista italiana della Somalia Britannica (3-19 agosto 1940: Battaglia di Tug Argan e presa di Berbera) — Annessa all\'Africa Orientale Italiana.',
        };
      }
      const isPostAOI = yearStep === undefined || yearStep >= 1;
      return isPostAOI
        ? {
            name: 'Governo della Somalia',
            adminTitle: 'Governo della Somalia (AOI)',
            note: 'Africa Orientale Italiana (R.D.L. 1 giugno 1936 n. 1019) — Capoluogo Mogadiscio',
          }
        : {
            name: 'Colonia della Somalia Italiana',
            adminTitle: 'Colonia del Regno d\'Italia',
            note: 'Somalia Italiana pre-AOI (1908-1936) — Capoluogo Mogadiscio',
          };
    }
  }

  // 1. Gestione granulare prioritaria Powiat Kresy Wschodnie (1921-1939)
  const isKresyPowiat = id.startsWith('PL_KRESY_') || rawName.toLowerCase().startsWith('powiat ');
  if (isKresyPowiat) {
    if (owner === 'POL') {
      let voiv = 'Kresy Wschodnie';
      if (normKey.includes('wil') || normKey.includes('trok') || normKey.includes('swiec') || normKey.includes('bras') || normKey.includes('dzis') || normKey.includes('postaw') || normKey.includes('oszmi') || normKey.includes('wilej') || normKey.includes('molodec')) {
        voiv = 'Wileńskie';
      } else if (normKey.includes('nowogrod') || normKey.includes('baran') || normKey.includes('stolp') || normKey.includes('niez') || normKey.includes('nesvizh') || normKey.includes('slon') || normKey.includes('szczucz') || normKey.includes('lid')) {
        voiv = 'Nowogródzkie';
      } else if (normKey.includes('polesk') || normKey.includes('brzesc') || normKey.includes('pinsk') || normKey.includes('kobryn') || normKey.includes('drohicz') || normKey.includes('kosin') || normKey.includes('kamien') || normKey.includes('stolin') || normKey.includes('luni')) {
        voiv = 'Poleskie';
      } else if (normKey.includes('wolyn') || normKey.includes('luck') || normKey.includes('rowne') || normKey.includes('kowel') || normKey.includes('krzemieniec') || normKey.includes('dubn') || normKey.includes('kostop') || normKey.includes('sarn') || normKey.includes('horoch') || normKey.includes('lubom') || normKey.includes('vladimir') || normKey.includes('wlodzim') || normKey.includes('zdolbun')) {
        voiv = 'Wołyńskie';
      } else if (normKey.includes('tarnopol') || normKey.includes('czortkow') || normKey.includes('brzez') || normKey.includes('buczac') || normKey.includes('podhaj') || normKey.includes('trembow') || normKey.includes('zborow') || normKey.includes('zbaraz') || normKey.includes('kopycz') || normKey.includes('borszcz') || normKey.includes('skal') || normKey.includes('zlocz') || normKey.includes('zoloch') || normKey.includes('peremysh') || normKey.includes('przemyslany') || normKey.includes('zaleszcz') || normKey.includes('kamion') || normKey.includes('radziech') || normKey.includes('busk')) {
        voiv = 'Tarnopolskie';
      } else if (normKey.includes('stanislaw') || normKey.includes('kolomy') || normKey.includes('stryj') || normKey.includes('kalusz') || normKey.includes('horoden') || normKey.includes('sniat') || normKey.includes('nadwor') || normKey.includes('tlumac') || normKey.includes('turk') || normKey.includes('kosow') || normKey.includes('dolin') || normKey.includes('rohat') || normKey.includes('zydacz')) {
        voiv = 'Stanisławowskie';
      } else if (normKey.includes('lwow') || normKey.includes('drohob') || normKey.includes('borys') || normKey.includes('sambor') || normKey.includes('zolkiew') || normKey.includes('rawa') || normKey.includes('jawor') || normKey.includes('grodek') || normKey.includes('przemysl') || normKey.includes('jaroslaw') || normKey.includes('lubacz') || normKey.includes('sokal') || normKey.includes('moscisk') || normKey.includes('dobrom') || normKey.includes('rudk') || normKey.includes('bobrk') || normKey.includes('brody')) {
        voiv = 'Lwowskie';
      } else if (normKey.includes('bialystok') || normKey.includes('grodno') || normKey.includes('wolkow') || normKey.includes('sokol') || normKey.includes('august') || normKey.includes('suwal') || normKey.includes('lomz') || normKey.includes('bielsk') || normKey.includes('wysokie')) {
        voiv = 'Białostockie';
      }
      return {
        name: rawName,
        adminTitle: `Województwo ${voiv} (Rzeczpospolita Polska)`,
      };
    }

    if (owner === 'SOV') {
      const cleanName = rawName.replace(/^Powiat\s+/i, '');
      const isUkrSector = id.startsWith('PL_KRESY_UKR_');
      const isLtuSector = id.startsWith('PL_KRESY_LTU_');
      let ssr = isLtuSector ? 'Litovskaya SSR' : isUkrSector ? 'USSR' : 'BSSR';
      let oblast = isLtuSector ? 'Vilnyusskaya oblast' : isUkrSector ? 'Lvovskaya oblast' : 'Brestskaya oblast';

      if (normKey.includes('wil') || normKey.includes('trok') || normKey.includes('swiec') || isLtuSector) {
        oblast = 'Vilnyusskaya oblast';
        ssr = 'Litovskaya SSR';
      } else if (normKey.includes('bras') || normKey.includes('dzis') || normKey.includes('postaw') || normKey.includes('oszmi') || normKey.includes('viley') || normKey.includes('molodech') || normKey.includes('wilej')) {
        oblast = 'Vileyskaya oblast';
        ssr = 'BSSR';
      } else if (normKey.includes('nowogrod') || normKey.includes('baran') || normKey.includes('stolp') || normKey.includes('slon') || normKey.includes('lid') || normKey.includes('nesvizh') || normKey.includes('szczucz')) {
        oblast = 'Baranovitskaya oblast';
        ssr = 'BSSR';
      } else if (normKey.includes('pinsk') || normKey.includes('luni') || normKey.includes('stolin') || normKey.includes('drohicz')) {
        oblast = 'Pinskaya oblast';
        ssr = 'BSSR';
      } else if (normKey.includes('brzesc') || normKey.includes('brest') || normKey.includes('kobryn') || normKey.includes('pruzan')) {
        oblast = 'Brestskaya oblast';
        ssr = 'BSSR';
      } else if (normKey.includes('bialystok') || normKey.includes('grodno') || normKey.includes('wolkow') || normKey.includes('sokol') || normKey.includes('lomz') || normKey.includes('bielsk')) {
        oblast = 'Belostokskaya oblast';
        ssr = 'BSSR';
      } else if (normKey.includes('luck') || normKey.includes('kowel') || normKey.includes('horoch') || normKey.includes('lubom') || normKey.includes('vladimir') || normKey.includes('wlodzim')) {
        oblast = 'Volynskaya oblast';
        ssr = 'USSR';
      } else if (normKey.includes('rowne') || normKey.includes('dubn') || normKey.includes('kostop') || normKey.includes('sarn') || normKey.includes('zdolbun')) {
        oblast = 'Rovnenskaya oblast';
        ssr = 'USSR';
      } else if (normKey.includes('tarnopol') || normKey.includes('czortkow') || normKey.includes('brzez') || normKey.includes('buczac') || normKey.includes('podhaj') || normKey.includes('trembow') || normKey.includes('zborow') || normKey.includes('zbaraz') || normKey.includes('kopycz') || normKey.includes('borszcz') || normKey.includes('krzemieniec') || normKey.includes('zaleszcz') || normKey.includes('skal')) {
        oblast = 'Ternopolskaya oblast';
        ssr = 'USSR';
      } else if (normKey.includes('stanislaw') || normKey.includes('kolomy') || normKey.includes('kalusz') || normKey.includes('horoden') || normKey.includes('sniat') || normKey.includes('nadwor') || normKey.includes('tlumac') || normKey.includes('kosow') || normKey.includes('dolin') || normKey.includes('rohat') || normKey.includes('zydacz')) {
        oblast = 'Stanislavskaya oblast';
        ssr = 'USSR';
      } else if (normKey.includes('drohob') || normKey.includes('borys') || normKey.includes('sambor') || normKey.includes('stryj') || normKey.includes('turk')) {
        oblast = 'Drogobychskaya oblast';
        ssr = 'USSR';
      } else if (normKey.includes('lwow') || normKey.includes('zolkiew') || normKey.includes('rawa') || normKey.includes('jawor') || normKey.includes('grodek') || normKey.includes('przemysl') || normKey.includes('sokal') || normKey.includes('lubacz') || normKey.includes('zlocz') || normKey.includes('zoloch') || normKey.includes('peremysh') || normKey.includes('przemyslany') || normKey.includes('brody')) {
        oblast = 'Lvovskaya oblast';
        ssr = 'USSR';
      }

      const ssrTitle = ssr === 'BSSR' ? 'Belorusskaya SSR' : ssr === 'USSR' ? 'Ukrainskaya SSR' : 'Litovskaya SSR';
      return {
        name: `${cleanName} rayon / gorod`,
        adminTitle: `${oblast} (${ssrTitle})`,
      };
    }

    if (owner === 'LIT') {
      const cleanName = rawName.replace(/^Powiat\s+/i, '');
      return {
        name: `${cleanName} (Vilniaus kraštas)`,
        adminTitle: 'Lietuvos Respublika (Vilniaus kraštas)',
      };
    }
  }

  // 2. Match diretto dizionario per owner
  const ownerDict = HISTORICAL_TOPONYM_DICT[owner];
  if (ownerDict) {
    // Exact key
    if (ownerDict[normKey]) {
      return {
        name: ownerDict[normKey].historicalName,
        adminTitle: ownerDict[normKey].adminTitle,
        note: ownerDict[normKey].historicalNote,
      };
    }

    // Substring / token lookup (avoid false substring matches like 'ain' in 'saint')
    // Ordiniamo le chiavi per lunghezza decrescente affinché chiavi composte come 'bouches_du_rhone' abbiano priorità su 'rhone'
    const sortedKeys = Object.keys(ownerDict).sort((a, b) => b.length - a.length);
    const normTokens = normKey.split('_').filter(Boolean);
    for (const key of sortedKeys) {
      if (key.length <= 2) continue;
      // Single word key: require exact token match or key of length >= 5
      if (!key.includes('_')) {
        if (normTokens.includes(key)) {
          return {
            name: ownerDict[key].historicalName,
            adminTitle: ownerDict[key].adminTitle,
            note: ownerDict[key].historicalNote,
          };
        }
        if (key.length >= 6 && normKey.includes(key)) {
          return {
            name: ownerDict[key].historicalName,
            adminTitle: ownerDict[key].adminTitle,
            note: ownerDict[key].historicalNote,
          };
        }
      } else {
        // Multi-word key
        if (normKey.includes(key) || (normKey.length >= 6 && key.includes(normKey))) {
          return {
            name: ownerDict[key].historicalName,
            adminTitle: ownerDict[key].adminTitle,
            note: ownerDict[key].historicalNote,
          };
        }
      }
    }
  }

  // 3. Fallback regionali Kresy (non-powiat)
  if (owner === 'POL') {
    if (normKey.includes('wilen') || normKey.includes('wilno') || normKey.includes('vilnius')) return { name: 'Wilno', adminTitle: 'Województwo Wileńskie (Rzeczpospolita Polska)' };
    if (normKey.includes('nowogrod') || normKey.includes('navahrudak') || normKey.includes('baranov')) return { name: 'Nowogródek', adminTitle: 'Województwo Nowogródzkie (Rzeczpospolita Polska)' };
    if (normKey.includes('poles') || normKey.includes('pinsk') || normKey.includes('brest') || normKey.includes('brzesc')) return { name: 'Brześć nad Bugiem / Pińsk', adminTitle: 'Województwo Poleskie (Rzeczpospolita Polska)' };
    if (normKey.includes('wolyn') || normKey.includes('volyn') || normKey.includes('luck') || normKey.includes('rowne')) return { name: 'Łuck / Równe', adminTitle: 'Województwo Wołyńskie (Rzeczpospolita Polska)' };
    if (normKey.includes('tarnopol') || normKey.includes('ternopil') || normKey.includes('zbrucz') || normKey.includes('podol')) return { name: 'Tarnopol', adminTitle: 'Województwo Tarnopolskie (Rzeczpospolita Polska)' };
    if (normKey.includes('stanislaw') || normKey.includes('stanislav') || normKey.includes('pokuc') || normKey.includes('hoverla')) return { name: 'Stanisławów', adminTitle: 'Województwo Stanisławowskie (Rzeczpospolita Polska)' };
    if (normKey.includes('lwow') || normKey.includes('lviv') || normKey.includes('drohob') || normKey.includes('borysl')) return { name: 'Lwów', adminTitle: 'Województwo Lwowskie (Rzeczpospolita Polska)' };
  }

  if (owner === 'SOV') {
    if (normKey.includes('wilen') || normKey.includes('wilno') || normKey.includes('vilnius')) return { name: 'Vilnyus', adminTitle: 'Litovskaya SSR' };
    if (normKey.includes('nowogrod') || normKey.includes('navahrudak') || normKey.includes('baranov')) return { name: 'Baranovichi', adminTitle: 'Baranovitskaya oblast (BSSR)' };
    if (normKey.includes('poles') || normKey.includes('pinsk') || normKey.includes('brest') || normKey.includes('brzesc')) return { name: 'Brest / Pinsk', adminTitle: 'Brestskaya / Pinskaya oblast (BSSR)' };
    if (normKey.includes('wolyn') || normKey.includes('volyn') || normKey.includes('luck') || normKey.includes('rowne')) return { name: 'Lutsk / Rovno', adminTitle: 'Volynskaya / Rovnenskaya oblast (USSR)' };
    if (normKey.includes('tarnopol') || normKey.includes('ternopil') || normKey.includes('zbrucz')) return { name: 'Ternopol', adminTitle: 'Ternopolskaya oblast (USSR)' };
    if (normKey.includes('stanislaw') || normKey.includes('stanislav') || normKey.includes('pokuc')) return { name: 'Stanislav', adminTitle: 'Stanislavskaya oblast (USSR)' };
    if (normKey.includes('lwow') || normKey.includes('lviv') || normKey.includes('drohob')) return { name: 'Lvov', adminTitle: 'Lvovskaya oblast (USSR)' };
  }

  // 4. Specifiche per Reich Tedesco (GER)
  if (owner === 'GER') {
    // A. Territori austriaci (Ostmark / Reichsgaue alpini e danubiani)
    if (id.startsWith('AT')) {
      if (id === 'AT13' || normKey.includes('wien') || normKey.includes('vienna')) return { name: 'Wien', adminTitle: 'Reichsgau Wien' };
      if (id === 'AT12' || normKey.includes('niederoesterreich')) return { name: 'Niederdonau', adminTitle: 'Reichsgau Niederdonau' };
      if (id === 'AT11' || normKey.includes('burgenland')) return { name: 'Eisenstadt (Burgenland)', adminTitle: 'Alpen- und Donau-Reichsgaue' };
      if (id === 'AT21' || normKey.includes('kaernten')) return { name: 'Klagenfurt (Kärnten)', adminTitle: 'Reichsgau Kärnten' };
      if (id === 'AT22' || normKey.includes('steiermark')) return { name: 'Graz (Steiermark)', adminTitle: 'Reichsgau Steiermark' };
      if (id === 'AT31' || normKey.includes('oberoesterreich')) return { name: 'Linz (Oberdonau)', adminTitle: 'Reichsgau Oberdonau' };
      if (id === 'AT32' || normKey.includes('salzburg')) return { name: 'Salzburg', adminTitle: 'Reichsgau Salzburg' };
      if (id === 'AT33' || normKey.includes('tirol')) return { name: 'Innsbruck (Tirol)', adminTitle: 'Reichsgau Tirol-Vorarlberg' };
      if (id === 'AT34' || normKey.includes('vorarlberg')) return { name: 'Bregenz (Vorarlberg)', adminTitle: 'Reichsgau Tirol-Vorarlberg' };
      return { name: rawName, adminTitle: 'Alpen- und Donau-Reichsgaue (Ostmark)' };
    }

    // B. Sudetenland e Boemia-Moravia
    if (id === 'CZ041' || normKey.includes('cheb') || normKey.includes('eger') || normKey.includes('karlovy_vary') || normKey.includes('karlsbad')) {
      return { name: 'Karlsbad / Eger', adminTitle: 'Reichsgau Sudetenland (Regierungsbezirk Eger)' };
    }
    if (id === 'CZ042' || normKey.includes('usti') || normKey.includes('aussig')) {
      return { name: 'Aussig an der Elbe', adminTitle: 'Reichsgau Sudetenland (Regierungsbezirk Aussig)' };
    }
    if (id === 'CZ051' || normKey.includes('liberec') || normKey.includes('reichenberg')) {
      return { name: 'Reichenberg', adminTitle: 'Reichsgau Sudetenland (Hauptstadt Reichenberg)' };
    }
    if (id === 'CZ080' || normKey.includes('opava') || normKey.includes('troppau')) {
      return { name: 'Troppau', adminTitle: 'Reichsgau Sudetenland (Regierungsbezirk Troppau)' };
    }
    if (id.startsWith('CZ')) {
      if (id === 'CZ010' || normKey.includes('praha') || normKey.includes('prag')) return { name: 'Prag', adminTitle: 'Protektorat Böhmen und Mähren (Oberlandratsbezirk Prag)' };
      if (id === 'CZ020') return { name: 'Mittelböhmen (Prag-Land)', adminTitle: 'Protektorat Böhmen und Mähren' };
      if (id === 'CZ031' || normKey.includes('budejovice') || normKey.includes('budweis')) return { name: 'Budweis', adminTitle: 'Protektorat Böhmen und Mähren (Oberlandratsbezirk Budweis)' };
      if (id === 'CZ032' || normKey.includes('plzen') || normKey.includes('pilsen')) return { name: 'Pilsen', adminTitle: 'Protektorat Böhmen und Mähren (Oberlandratsbezirk Pilsen)' };
      if (id === 'CZ052' || normKey.includes('hradec') || normKey.includes('koeniggraetz')) return { name: 'Königgrätz', adminTitle: 'Protektorat Böhmen und Mähren (Oberlandratsbezirk Königgrätz)' };
      if (id === 'CZ053' || normKey.includes('pardubic')) return { name: 'Pardubitz', adminTitle: 'Protektorat Böhmen und Mähren (Oberlandratsbezirk Pardubitz)' };
      if (id === 'CZ064' || normKey.includes('brno') || normKey.includes('bruenn')) return { name: 'Brünn', adminTitle: 'Protektorat Böhmen und Mähren (Oberlandratsbezirk Brünn)' };
      if (id === 'CZ071' || normKey.includes('olomouc') || normKey.includes('olmuetz')) return { name: 'Olmütz', adminTitle: 'Protektorat Böhmen und Mähren (Oberlandratsbezirk Olmütz)' };
      if (id === 'CZ063' || normKey.includes('jihlava') || normKey.includes('iglau')) return { name: 'Iglau', adminTitle: 'Protektorat Böhmen und Mähren (Oberlandratsbezirk Iglau)' };
      return { name: rawName, adminTitle: 'Protektorat Böhmen und Mähren' };
    }

    // C. Polonia annessa e Generalgouvernement
    if (id.startsWith('PL51')) return { name: 'Breslau (Niederschlesien)', adminTitle: 'Provinz Niederschlesien' };
    if (id.startsWith('PL42')) return { name: 'Stettin (Pommern)', adminTitle: 'Provinz Pommern' };
    if (id.startsWith('PL41')) return { name: 'Posen (Wartheland)', adminTitle: 'Reichsgau Wartheland' };
    if (id.startsWith('PL71')) return { name: 'Litzmannstadt (Wartheland)', adminTitle: 'Reichsgau Wartheland' };
    if (id.startsWith('PL22')) return { name: 'Kattowitz (Oberschlesien)', adminTitle: 'Gau Oberschlesien' };
    if (id.startsWith('PL21')) return { name: 'Krakau (Generalgouvernement)', adminTitle: 'Distrikt Krakau' };
    if (id.startsWith('PL9')) return { name: 'Warschau (Generalgouvernement)', adminTitle: 'Distrikt Warschau' };
    if (id.startsWith('PL81')) return { name: 'Lublin (Generalgouvernement)', adminTitle: 'Distrikt Lublin' };
    if (id.startsWith('PL82')) return { name: 'Reichshof (Generalgouvernement)', adminTitle: 'Distrikt Krakau' };
    if (id.startsWith('PL61')) return { name: 'Bromberg (Danzig-Westpreußen)', adminTitle: 'Reichsgau Danzig-Westpreußen' };
    if (id.startsWith('PL62')) return { name: 'Allenstein (Ostpreußen)', adminTitle: 'Provinz Ostpreußen' };
    if (id.startsWith('PL52')) return { name: 'Oppeln (Oberschlesien)', adminTitle: 'Regierungsbezirk Oppeln' };
    if (id.startsWith('PL43')) return { name: 'Schwerin/Landsberg (Brandenburg)', adminTitle: 'Mark Brandenburg' };
    if (id.startsWith('PL72')) return { name: 'Kielce / Radom', adminTitle: 'Distrikt Radom' };
    if (id.startsWith('PL84')) return { name: 'Bialystok (Bezirk Bialystok)', adminTitle: 'Bezirk Bialystok' };
    if (id === 'LT023') return { name: 'Memel (Memelland)', adminTitle: 'Reichsgau Ostpreußen' };
    if (id === 'PL633') return { name: 'Danzig', adminTitle: 'Reichsgau Danzig-Westpreußen' };

    // D. Territori occidentali occupati (1940)
    if (id === 'LU000' || id.startsWith('LU') || normKey.includes('luxemb')) {
      return { name: 'Luxemburg', adminTitle: 'CdZ-Gebiet Luxemburg (Gau Moselland)' };
    }
    if (id.startsWith('FR41') || id.startsWith('FR42') || id.startsWith('FRF') || normKey.includes('strasbourg') || normKey.includes('strassburg') || normKey.includes('alsace') || normKey.includes('elsass') || normKey.includes('colmar') || normKey.includes('mulhouse')) {
      return { name: 'Straßburg (Elsass)', adminTitle: 'CdZ-Gebiet Elsass (Gau Baden-Elsass)' };
    }
    if (normKey.includes('metz') || normKey.includes('lorraine') || normKey.includes('lothringen') || normKey.includes('moselle')) {
      return { name: 'Metz (Lothringen)', adminTitle: 'CdZ-Gebiet Lothringen (Gau Westmark)' };
    }
    if (id.startsWith('BE') || id.startsWith('FR30') || id.startsWith('FRE')) {
      return { name: rawName, adminTitle: 'Militärverwaltung in Belgien und Nordfrankreich' };
    }
    if (id.startsWith('NL')) {
      return { name: rawName, adminTitle: 'Reichskommissariat Niederlande' };
    }
    if (id.startsWith('DK')) {
      return { name: rawName, adminTitle: 'Besetztes Dänemark' };
    }
    if (id.startsWith('NO')) {
      return { name: rawName, adminTitle: 'Reichskommissariat Norwegen' };
    }
  }

  // 5. Repubblica di Lituania (LIT)
  if (owner === 'LIT') {
    if (id === 'LT023') return { name: 'Klaipėdos apskritis (Žemaitijos pajūris ir Palanga)', adminTitle: 'Lietuvos Respublika' };
    if (id === 'LT022') return { name: 'Kauno apskritis (Laikinoji sostinė)', adminTitle: 'Lietuvos Respublika' };
    if (id === 'LT011' || normKey.includes('wilno') || normKey.includes('vilnius')) return { name: 'Vilniaus apskritis (Vilnius)', adminTitle: 'Lietuvos Respublika (1939 m. spalio 10 d. sutartis)' };
    if (id.startsWith('PL_KRESY_LTU_') || normKey.includes('svencion') || normKey.includes('trakai')) {
      return { name: `${rawName} (Vilniaus kraštas)`, adminTitle: 'Lietuvos Respublika (Perdavimas 1939)' };
    }
  }

  // 6. Regno d'Italia & Impero (ITA)
  if (owner === 'ITA') {
    if (id === 'HR031') return { name: 'Fiume (Carnaro)', adminTitle: 'Provincia del Carnaro' };
    if (id === 'HR033') return { name: 'Zara (Dalmazia)', adminTitle: 'Provincia di Zara' };
    if (id === 'HR036') return { name: 'Pola (Istria)', adminTitle: 'Provincia di Pola' };
    if (id === 'SI043') return { name: 'Gorizia (Venezia Giulia)', adminTitle: 'Provincia di Gorizia' };
    if (id === 'SI044') return { name: 'Capodistria (Istria)', adminTitle: 'Provincia di Pola' };
    if (id === 'SI038') return { name: 'Postumia (Carnaro)', adminTitle: 'Provincia di Trieste' };
    if (id === 'HR035') return { name: 'Spalato (Dalmazia)', adminTitle: 'Dalmazia' };
    if (id === 'SI041') return { name: 'Lubiana (Provincia di Lubiana)', adminTitle: 'Provincia di Lubiana' };
    if (id === 'EL421') return { name: 'Rodi (Isole Italiane dell\'Egeo)', adminTitle: 'Provincia di Rodi' };
    if (id.startsWith('AL') || normKey.includes('alban') || normKey.includes('tiran') || normKey.includes('shkod') || normKey.includes('durres') || normKey.includes('vlore') || normKey.includes('korce') || normKey.includes('gjirok')) {
      let albCity = rawName;
      if (normKey.includes('tiran')) albCity = 'Tirana (Tiranë)';
      else if (normKey.includes('shkod') || normKey.includes('scutar')) albCity = 'Scutari (Shkodër)';
      else if (normKey.includes('durr')) albCity = 'Durazzo (Durrës)';
      else if (normKey.includes('vlor') || normKey.includes('valon')) albCity = 'Valona (Vlorë)';
      else if (normKey.includes('korc') || normKey.includes('coriz')) albCity = 'Corizza (Korçë)';
      else if (normKey.includes('gjirok') || normKey.includes('argiro')) albCity = 'Argirocastro (Gjirokastër)';
      else if (normKey.includes('berat')) albCity = 'Berat';
      else if (normKey.includes('elbasan')) albCity = 'Elbasan';
      return {
        name: albCity,
        adminTitle: "Regno d'Albania (Unione Personale sotto la Corona d'Italia)",
      };
    }
  }

  // 7. Regno di Grecia (GRE)
  if (owner === 'GRE') {
    if (id === 'EL422' || normKey.includes('kyklad') || normKey.includes('cyclad') || normKey.includes('cicladi')) {
      return {
        name: 'Kyklades (Naxos, Andros, Paros, Milos, Santorini)',
        adminTitle: 'Vasileion tes Ellados — Nomos Kykladon (Ermoupolis)',
      };
    }
    if (id === 'EL411' || normKey.includes('lesvos') || normKey.includes('limnos')) {
      return { name: 'Lesvos kai Lemnos (Voreio Aigaio)', adminTitle: 'Vasileion tes Ellados — Nomos Lesvou' };
    }
    if (id === 'EL412' || normKey.includes('samos') || normKey.includes('ikaria')) {
      return { name: 'Samos kai Ikaria', adminTitle: 'Vasileion tes Ellados — Nomos Samou' };
    }
    if (id === 'EL413' || normKey.includes('chios')) {
      return { name: 'Chios', adminTitle: 'Vasileion tes Ellados — Nomos Chiou' };
    }
    if (id === 'EL622' || normKey.includes('kerkyra') || normKey.includes('corfu')) {
      return { name: 'Kerkyra (Ionioi Nisoi)', adminTitle: 'Vasileion tes Ellados — Nomos Kerkyras' };
    }
    if (id === 'EL621' || normKey.includes('zakynthos') || normKey.includes('zante')) {
      return { name: 'Zakynthos (Ionioi Nisoi)', adminTitle: 'Vasileion tes Ellados — Nomos Zakynthou' };
    }
    if (id === 'EL623' || normKey.includes('kefallinia') || normKey.includes('cefalonia')) {
      return { name: 'Kefallinia kai Ithaki', adminTitle: 'Vasileion tes Ellados — Nomos Kefallinias' };
    }
    if (id === 'EL624' || normKey.includes('lefkada')) {
      return { name: 'Lefkada (Ionioi Nisoi)', adminTitle: 'Vasileion tes Ellados — Nomos Lefkados' };
    }
    if (id === 'EL303' || normKey.includes('athin') || normKey.includes('atene') || normKey.includes('athens')) {
      return { name: 'Athina (Protevousa)', adminTitle: 'Vasileion tes Ellados — Nomos Attikis' };
    }
  }

  // 8. Regno di Jugoslavia (YUG)
  if (owner === 'YUG') {
    const isPostHrvatska = (yearStep !== undefined && yearStep >= 4);
    if (id.startsWith('BA') || normKey.includes('bosn') || normKey.includes('herzeg') || normKey.includes('herceg')) {
      const banovinaTitle = isPostHrvatska
        ? 'Kraljevina Jugoslavija (Drinska, Vrbaska i Banovina Hrvatska)'
        : 'Kraljevina Jugoslavija (Drinska, Vrbaska i Primorska banovina)';
      return { name: rawName ? `Bosna — ${rawName}` : 'Bosna i Hercegovina', adminTitle: banovinaTitle };
    }
    if (id.startsWith('XK') || id.startsWith('KO') || id.startsWith('KV') || normKey.includes('kosov') || normKey.includes('metohij')) {
      return { name: rawName ? `Kosovo — ${rawName}` : 'Kosovo i Metohija', adminTitle: 'Kraljevina Jugoslavija (Vardarska, Zetska i Moravska banovina)' };
    }
    if (id.startsWith('RS')) return { name: rawName, adminTitle: 'Kraljevina Jugoslavija (Dunavska i Moravska banovina)' };
    if (id.startsWith('ME')) return { name: rawName, adminTitle: 'Kraljevina Jugoslavija (Zetska banovina)' };
    if (id.startsWith('MK')) return { name: rawName, adminTitle: 'Kraljevina Jugoslavija (Vardarska banovina)' };
    if (id.startsWith('HR')) {
      return {
        name: rawName,
        adminTitle: isPostHrvatska ? 'Kraljevina Jugoslavija (Banovina Hrvatska)' : 'Kraljevina Jugoslavija (Savska i Primorska banovina)',
      };
    }
    if (id.startsWith('SI')) return { name: rawName, adminTitle: 'Kraljevina Jugoslavija (Dravska banovina)' };
  }

  // 9. Cecoslovacchia (CZE)
  if (owner === 'CZE') {
    if (id === 'CZ010' || normKey.includes('praha') || normKey.includes('prag')) {
      return { name: 'Praha (Praga)', adminTitle: 'Československá republika — Hlavní město Praha' };
    }
    if (id === 'CZ064' || normKey.includes('brno') || normKey.includes('bruenn')) {
      return { name: 'Brno (Brünn)', adminTitle: 'Československá republika — Země Moravskoslezská' };
    }
    if (id === 'CZ032' || normKey.includes('plzen') || normKey.includes('pilsen')) {
      return { name: 'Plzeň (Pilsen)', adminTitle: 'Československá republika — Země Česká' };
    }
    if (normKey.includes('ostrava')) {
      return { name: 'Moravská Ostrava', adminTitle: 'Československá republika — Země Moravskoslezská' };
    }
    if (id === 'CZ071' || normKey.includes('olomouc')) {
      return { name: 'Olomouc (Olmütz)', adminTitle: 'Československá republika — Země Moravskoslezská' };
    }
    if (id === 'CZ031' || normKey.includes('budejovice')) {
      return { name: 'České Budějovice', adminTitle: 'Československá republika — Země Česká' };
    }
    if (id === 'CZ052' || normKey.includes('hradec')) {
      return { name: 'Hradec Králové', adminTitle: 'Československá republika — Země Česká' };
    }
    if (id === 'CZ053' || normKey.includes('pardubic')) {
      return { name: 'Pardubice', adminTitle: 'Československá republika — Země Česká' };
    }
    if (id === 'CZ051' || normKey.includes('liberec') || normKey.includes('reichenberg')) {
      return { name: 'Liberec (Reichenberg)', adminTitle: 'Československá republika — Pohraničí (Sudety)' };
    }
    if (id === 'CZ041' || normKey.includes('karlovy_vary') || normKey.includes('karlsbad')) {
      return { name: 'Karlovy Vary (Karlsbad)', adminTitle: 'Československá republika — Pohraničí (Sudety)' };
    }
    if (normKey.includes('cheb') || normKey.includes('eger')) {
      return { name: 'Cheb (Eger)', adminTitle: 'Československá republika — Pohraničí (Sudety)' };
    }
    if (id === 'CZ042' || normKey.includes('usti') || normKey.includes('aussig')) {
      return { name: 'Ústí nad Labem (Aussig)', adminTitle: 'Československá republika — Pohraničí (Sudety)' };
    }
    if (id === 'CZ080' || normKey.includes('opava') || normKey.includes('troppau')) {
      return { name: 'Opava (Troppau)', adminTitle: 'Československá republika — Země Moravskoslezská' };
    }
    if (normKey.includes('tesin') || normKey.includes('cieszyn')) {
      return { name: 'Český Těšín', adminTitle: 'Československá republika — Slezsko' };
    }
    if (id.startsWith('SK01') || normKey.includes('bratislava') || normKey.includes('pressburg') || normKey.includes('pozsony')) {
      return { name: 'Bratislava (Presburgo)', adminTitle: 'Československá republika — Krajina Slovenská' };
    }
    if (normKey.includes('kosice') || normKey.includes('kassa')) {
      return { name: 'Košice (Kassa)', adminTitle: 'Československá republika — Krajina Slovenská' };
    }
    if (normKey.includes('uzhorod') || normKey.includes('ungvar')) {
      return { name: 'Užhorod (Ungvár)', adminTitle: 'Československá republika — Podkarpatská Rus' };
    }
    if (normKey.includes('chust') || normKey.includes('khust')) {
      return { name: 'Chust (Karpatska Ukrajina)', adminTitle: 'Československá republika — Podkarpatská Rus' };
    }
    if (id.startsWith('SK')) {
      return { name: rawName, adminTitle: 'Československá republika — Krajina Slovenská' };
    }
    if (id.startsWith('CZ')) {
      return { name: rawName, adminTitle: 'Československá republika — Země Česká a Moravskoslezská' };
    }
  }

  // 10. Prima Repubblica Slovacca (SLO)
  if (owner === 'SLO') {
    if (id.startsWith('SK01') || normKey.includes('bratislava')) {
      return { name: 'Bratislava (Hlavné mesto)', adminTitle: 'Slovenská republika — Bratislavská župa' };
    }
    if (normKey.includes('trnava')) return { name: 'Trnava', adminTitle: 'Slovenská republika — Bratislavská župa' };
    if (normKey.includes('nitra')) return { name: 'Nitra', adminTitle: 'Slovenská republika — Nitrianska župa' };
    if (normKey.includes('trencin')) return { name: 'Trenčín', adminTitle: 'Slovenská republika — Trenčianska župa' };
    if (normKey.includes('zilina')) return { name: 'Žilina', adminTitle: 'Slovenská republika — Trenčianska župa' };
    if (normKey.includes('banska_bystrica')) return { name: 'Banská Bystrica', adminTitle: 'Slovenská republika — Pohronská župa' };
    if (normKey.includes('presov')) return { name: 'Prešov', adminTitle: 'Slovenská republika — Šarišsko-zemplínska župa' };
    if (normKey.includes('ruzomberok')) return { name: 'Ružomberok', adminTitle: 'Slovenská republika — Tatranská župa' };
    if (normKey.includes('poprad')) return { name: 'Poprad', adminTitle: 'Slovenská republika — Tatranská župa' };
    if (normKey.includes('zvolen')) return { name: 'Zvolen', adminTitle: 'Slovenská republika — Pohronská župa' };
    if (id.startsWith('SK')) {
      return { name: rawName, adminTitle: 'Slovenská republika (Vláda Dr. Jozefa Tisa)' };
    }
  }

  if (owner === 'FIN') {
    if (
      id === 'FI200' ||
      normKey.includes('aland') ||
      normKey.includes('ahvenanmaa') ||
      normKey.includes('mariehamn') ||
      normKey.includes('maarianhamina') ||
      rawName.includes('Åland') ||
      rawName.includes('Ã…land')
    ) {
      return {
        name: 'Ahvenanmaa / Åland (Demilitarisoitu alue)',
        adminTitle: 'Ahvenanmaan itsehallintoalue / Landskapet Åland (Kansainliiton sopimus 1921)',
        note: 'Territorio autonomo e demilitarizzato garantito dalla Convenzione di Ginevra della Società delle Nazioni (1921). Sovranità: Suomen tasavalta. Divieto assoluto di fortificazioni e truppe stanziali.',
      };
    }
  }

  if (owner === 'UK') {
    if (
      id.startsWith('IM') ||
      normKey.includes('isle_of_man') ||
      normKey.includes('mann') ||
      normKey.includes('isola_di_man') ||
      normKey.includes('douglas')
    ) {
      return {
        name: 'Isle of Man (Douglas)',
        adminTitle: 'Crown Dependency of the Isle of Man',
      };
    }
    if (
      id.startsWith('IQ') ||
      normKey.includes('mesopotam') ||
      normKey.includes('iraq') ||
      normKey.includes('irak') ||
      normKey.includes('baghdad') ||
      normKey.includes('basra') ||
      normKey.includes('mosul')
    ) {
      return {
        name: rawName && !normKey.includes('country') ? `${rawName} (British Mesopotamia)` : 'Kingdom of Iraq (Mesopotamia)',
        adminTitle: 'British Sphere of Influence (Anglo-Iraqi Treaty)',
      };
    }
    if (
      id.startsWith('GG') ||
      id.startsWith('JE') ||
      (normKey.includes('jersey') && !normKey.includes('new_jersey')) ||
      normKey.includes('guernsey') ||
      normKey.includes('channel_islands') ||
      normKey.includes('isole_del_canale')
    ) {
      return {
        name: normKey.includes('jersey') ? 'Bailiwick of Jersey (Saint Helier)' : 'Bailiwick of Guernsey (Saint Peter Port)',
        adminTitle: 'Crown Dependency of the Channel Islands',
      };
    }
  }

  if (owner === 'ETH') {
    if (
      normKey.includes('ethiopia') ||
      normKey.includes('abyssinia') ||
      normKey.includes('etiopia') ||
      normKey.includes('abissinia')
    ) {
      return {
        name: 'Ye’Ityōṗṗyā Nigūsa Negest Mengist',
        adminTitle: 'Ye’Ityōṗṗyā Nigūsa Negest Mengist (Hailé Selassié I)',
        note: 'Solomonic Dynasty, Emperor Haile Selassie I',
      };
    }
  }

  if (owner === 'PHL' || owner === 'PH') {
    if (
      normKey.includes('philippin') ||
      normKey.includes('filippin') ||
      normKey.includes('manila') ||
      normKey.includes('luzon') ||
      normKey.includes('mindanao') ||
      normKey.includes('visayas') ||
      id.startsWith('PH')
    ) {
      return {
        name: rawName && !normKey.includes('country') ? `${rawName} (Commonwealth of the Philippines)` : 'Commonwealth of the Philippines',
        adminTitle: 'Commonwealth of the Philippines (Associated State of the USA)',
        note: 'President: Manuel L. Quezon',
      };
    }
  }

  if (owner === 'TUV' || owner === 'TANNU_TUVA' || owner === 'TUVA') {
    if (
      normKey.includes('tuva') ||
      normKey.includes('tannu') ||
      normKey.includes('kyzyl') ||
      normKey.includes('khem_beldir') ||
      id.includes('TUV')
    ) {
      return {
        name: rawName && !normKey.includes('country') ? `${rawName} (Tyva Arat Respublika)` : 'Tyva Arat Respublika',
        adminTitle: 'Tyva Arat Respublika (Tannu Tuva)',
        note: 'Salchak Toka',
      };
    }
  }

  if (owner === 'LBR' || owner === 'LR' || owner === 'LIBERIA') {
    if (
      normKey.includes('liberia') ||
      normKey.includes('monrovia') ||
      id.includes('LR') ||
      id.includes('LBR')
    ) {
      return {
        name: rawName && !normKey.includes('country') ? `${rawName} (Republic of Liberia)` : 'Republic of Liberia',
        adminTitle: 'Republic of Liberia',
        note: 'President Edwin Barclay',
      };
    }
  }

  if (owner === 'SMR' || owner === 'SM' || owner === 'SAN_MARINO') {
    if (normKey.includes('san_marino') || normKey.includes('titano') || id.includes('SMR') || id.includes('SM')) {
      return {
        name: 'Serenissima Repubblica di San Marino',
        adminTitle: 'Repubblica di San Marino (Stato Neutrale)',
        note: 'Capitani Reggenti — Rigorosa neutralità e rifugio di oltre 100.000 profughi durante il passaggio del fronte.',
      };
    }
  }

  if (owner === 'VAT' || owner === 'VA' || owner === 'VATICAN' || owner === 'VATICANO') {
    if (normKey.includes('vatican') || normKey.includes('santa_sede') || normKey.includes('holy_see') || normKey.includes('vaticano') || id.includes('VAT') || id.includes('VA')) {
      return {
        name: 'Stato della Città del Vaticano',
        adminTitle: 'Neutralità e Sovranità Papale (Patti Lateranensi 1929)',
        note: (yearStep !== undefined && yearStep < 4) ? 'Papa Pio XI (Achille Ratti, 1922-1939)' : 'Papa Pio XII (Eugenio Pacelli, 1939-1958)',
      };
    }
  }

  if (owner === 'GIB' || owner === 'GI' || owner === 'GIBRALTAR') {
    if (normKey.includes('gibraltar') || normKey.includes('gibilterra') || id.includes('GIB') || id.includes('GI')) {
      return {
        name: 'Gibraltar (Crown Colony and Fortress)',
        adminTitle: 'Gibilterra — Fortezza Aeronavale della Corona Britannica',
        note: 'Governatore britannico e base strategica della Force H a guardia dello Stretto.',
      };
    }
  }

  if (owner === 'LIE' || owner === 'LI' || owner === 'LIECHTENSTEIN') {
    if (normKey.includes('liechtenstein') || normKey.includes('vaduz') || id.includes('LIE') || id.includes('LI')) {
      return {
        name: 'Fürstentum Liechtenstein (Vaduz)',
        adminTitle: (yearStep !== undefined && yearStep < 2)
          ? 'Fürstentum Liechtenstein — Principe Franz I (Neutrale / Zollunion Schweiz)'
          : 'Fürstentum Liechtenstein — Principe Franz Josef II (Neutrale / Zollunion Schweiz)',
        note: 'Principato alpino sovrano neutrale incastonato tra Svizzera e Vorarlberg con capitale Vaduz; retto dal Principe Franz I (fino al 1938) e Franz Josef II (dal 1938) con il Capo del Governo Josef Hoop. Unione doganale e monetaria con la Svizzera dal 1923; bandiera ufficiale con corona principesca (Fürstenhut) adottata nel 1937.',
      };
    }
  }

  if (owner === 'BRA' || owner === 'BR' || owner === 'BRAZIL') {
    return {
      name: (normKey === 'brazil' || normKey === 'brasil' || normKey.includes('country'))
        ? 'Estados Unidos do Brasil (Rio de Janeiro)'
        : `${rawName} (Brasil)`,
      adminTitle: 'República dos Estados Unidos do Brasil — Regime do Estado Novo (Getúlio Vargas)',
      note: 'Repubblica federale retta dal presidente Getúlio Vargas; dopo il colpo di stato del novembre 1937 viene promulgata la costituzione autoritaria dell\'Estado Novo. Neutralità diplomatica e cooperazione panamericana ed economica (commercio di caffè, gomma e minerali strategici).',
    };
  }

  if (owner === 'ARG' || owner === 'AR' || owner === 'ARGENTINA') {
    return {
      name: (normKey === 'argentina' || normKey.includes('country'))
        ? 'República Argentina (Buenos Aires)'
        : `${rawName} (Argentina)`,
      adminTitle: 'República Argentina — Década Infame (Pres. Agustín P. Justo / Roberto M. Ortiz)',
      note: 'Periodo storico della Década Infame; presidenza di Agustín Pedro Justo (1932-38) e Roberto Marcelino Ortiz (1938-40). Rigorosa neutralità diplomatica accompagnata da un vitale legame commerciale agroalimentare con la Gran Bretagna e sorveglianza militare dell\'Atlantico meridionale.',
    };
  }

  if (owner === 'CHL' || owner === 'CL' || owner === 'CHILE') {
    return {
      name: (normKey === 'chile' || normKey === 'cile' || normKey.includes('country'))
        ? 'República de Chile (Santiago)'
        : `${rawName} (Chile)`,
      adminTitle: 'República de Chile — Frente Popular (Pres. Pedro Aguirre Cerda)',
      note: 'Repubblica democratica guidata dal 1938 dal Fronte Popolare (Frente Popular) del presidente Pedro Aguirre Cerda. Rigida neutralità diplomatica ed essenziale controllo geostrategico delle rotte oceaniche dello Stretto di Magellano e di Capo Horn.',
    };
  }

  if (owner === 'PRU' || owner === 'PE' || owner === 'PERU') {
    return {
      name: (normKey === 'peru' || normKey === 'perù' || normKey.includes('country'))
        ? 'República Peruana (Lima)'
        : `${rawName} (Perú)`,
      adminTitle: 'República Peruana — Pres. Óscar R. Benavides / Manuel Prado Ugarteche',
      note: 'Regime autoritario e conservatore con capitale Lima; governo del generale Óscar R. Benavides (fino al 1939) e di Manuel Prado Ugarteche (dal 1939). Tensioni di confine latenti e mai sopite con l\'Ecuador per il bacino amazzonico (fiume Marañón e regione di Maynas).',
    };
  }

  if (owner === 'COL' || owner === 'CO' || owner === 'COLOMBIA') {
    return {
      name: (normKey === 'colombia' || normKey.includes('country'))
        ? 'República de Colombia (Bogotá)'
        : `${rawName} (Colombia)`,
      adminTitle: 'República de Colombia — Pres. Alfonso López Pumarejo / Eduardo Santos',
      note: 'Repubblica liberale costituzionale; riforme della "Revolución en Marcha" di López Pumarejo e presidenza di Eduardo Santos. Stretta intesa strategica con Washington per la difesa del Canale di Panama e nazionalizzazione delle rotte aeree SCADTA (fondazione di Avianca nel 1940).',
    };
  }

  if (owner === 'VEN' || owner === 'VE' || owner === 'VENEZUELA') {
    return {
      name: (normKey === 'venezuela' || normKey.includes('country'))
        ? 'Estados Unidos de Venezuela (Caracas)'
        : `${rawName} (Venezuela)`,
      adminTitle: 'Estados Unidos de Venezuela — Pres. Eleazar López Contreras',
      note: 'Transizione istituzionale post-gomecista guidata dal generale Eleazar López Contreras. Primo esportatore mondiale di petrolio (giacimenti del Lago di Maracaibo raffinati ad Aruba e Curaçao), risorsa energetica strategica fondamentale per gli Alleati.',
    };
  }

  if (owner === 'ECU' || owner === 'EC' || owner === 'ECUADOR') {
    if (normKey.includes('oriente') || id.toLowerCase().includes('oriente') || (rawName && rawName.toLowerCase().includes('oriente'))) {
      return {
        name: 'Oriente Amazzònico Conteso (Ecuador / Perù)',
        adminTitle: 'Provincia del Oriente — Zona Contesa Ecuador-Perù (Maynas y Marañón)',
        note: 'Vasto bacino fluviale amazzonico dei fiumi Marañón, Pastaza, Napo e Curaray. Territorio rivendicato dall\'Ecuador in base alla Real Cédula del 1563 e conteso dal Perù, sfociato nel conflitto armato del 1941 e nel Protocollo di Rio de Janeiro del 1942.',
      };
    }
    return {
      name: (normKey === 'ecuador' || normKey.includes('country'))
        ? 'República del Ecuador (Quito)'
        : `${rawName} (Ecuador)`,
      adminTitle: 'República del Ecuador — Pres. Federico Páez / Carlos Arroyo del Río',
      note: 'Fase di instabilità politica ed economica; contesa confinaria secolare con il Perù sull\'Oriente amazzonico e presidio sovrano delle Isole Galápagos nell\'Oceano Pacifico.',
    };
  }

  if (owner === 'BOL' || owner === 'BO' || owner === 'BOLIVIA') {
    return {
      name: (normKey === 'bolivia' || normKey.includes('country'))
        ? 'República de Bolivia (La Paz / Sucre)'
        : `${rawName} (Bolivia)`,
      adminTitle: 'República de Bolivia — Socialismo Militare & Trattato di Pace del Chaco 1938',
      note: 'Difficile dopoguerra del Chaco; governi del "socialismo militare" di David Toro e Germán Busch (nazionalizzazione della Standard Oil nel 1937). Trattato di pace di Buenos Aires del luglio 1938 con il Paraguay; principale fornitore di stagno e tungsteno per gli Alleati.',
    };
  }

  if (owner === 'PAR' || owner === 'PY' || owner === 'PARAGUAY') {
    return {
      name: (normKey === 'paraguay' || normKey.includes('country'))
        ? 'República del Paraguay (Asunción)'
        : `${rawName} (Paraguay)`,
      adminTitle: 'República del Paraguay — Pres. Rafael Franco / Mar. José Félix Estigarribia',
      note: 'Uscito vittorioso ma dissanguato dalla Guerra del Chaco; Rivoluzione Febrerista del colonnello Rafael Franco (1936), transizione di Félix Paiva e presidenza del maresciallo José Félix Estigarribia (1939-40, Carta Costituzionale del 1940). Sovranità confermata sul Chaco Boreal nel 1938.',
    };
  }

  if (owner === 'URU' || owner === 'UY' || owner === 'URUGUAY') {
    return {
      name: (normKey === 'uruguay' || normKey.includes('country'))
        ? 'República Oriental del Uruguay (Montevideo)'
        : `${rawName} (Uruguay)`,
      adminTitle: 'República Oriental del Uruguay — Pres. Gabriel Terra / Gen. Alfredo Baldomir',
      note: 'Stato sovrano neutrale sulla riva settentrionale del Río de la Plata. Il porto neutrale di Montevideo fu al centro della crisi navale della corazzata tedesca Admiral Graf Spee nel dicembre 1939 dopo la battaglia contro gli incrociatori della Royal Navy.',
    };
  }

  if (
    (owner === 'HOL' || owner === 'NL') &&
    (normKey.includes('suriname') || normKey.includes('surinam') || normKey.includes('dutch guiana') || id === 'SR' || id === 'SUR' || id.startsWith('SR_') || id.startsWith('SUR'))
  ) {
    return {
      name: 'Suriname / Nederlands-Guyana (Paramaribo)',
      adminTitle: 'Gebiedsdeel Suriname — Kolonie van het Koninkrijk der Nederlanden',
      note: 'Territorio d\'oltremare olandese nei Caraibi meridionali; centro nevralgico della produzione mondiale di bauxite (miniere di Moengo e Paranam gestite da Alcoa/Suralco), vitale per l\'industria aeronautica bellica alleata.',
    };
  }

  // Messico
  if (owner === 'MEX' || owner === 'MX' || owner === 'MEXICO') {
    return {
      name: (normKey === 'mexico' || normKey === 'messico' || normKey.includes('country'))
        ? 'Estados Unidos Mexicanos (Ciudad de México)'
        : `${rawName} (México)`,
      adminTitle: 'Estados Unidos Mexicanos — Presidencia del Gral. Lázaro Cárdenas (1934-1940)',
      note: 'Repubblica federale sotto la presidenza progressista di Lázaro Cárdenas; periodo caratterizzato dall\'attuazione radicale della riforma agraria (ejidos), dalla nazionalizzazione delle ferrovie e dall\'espropriazione storica delle compagnie petrolifere straniere il 18 marzo 1938 con la fondazione di PEMEX. Asilo a Lev Trockij e a decine di migliaia di rifugiati repubblicani della Guerra Civile Spagnola; rigorosa neutralità diplomatica accompagnata dal supporto ai principi di non-intervento della Dottrina Estrada.',
    };
  }

  // Guatemala
  if (owner === 'GTM' || owner === 'GT' || owner === 'GUATEMALA') {
    return {
      name: (normKey === 'guatemala' || normKey.includes('country'))
        ? 'República de Guatemala (Ciudad de Guatemala)'
        : `${rawName} (Guatemala)`,
      adminTitle: 'República de Guatemala — Régimen del Gral. Jorge Ubico (1931-1944)',
      note: 'Dittatura centralista e paternalista del generale Jorge Ubico Castañeda; ordine pubblico inflessibile, militarizzazione delle scuole e lavoro coatto indigeno attraverso la "Ley contra la Vagancia". Enorme influenza economica della United Fruit Company (UFCO) e dell\'IRCA con monopolio su porti e ferrovie. Storica rivendicazione irredentista sull\'Honduras Britannico (Belize).',
    };
  }

  // El Salvador
  if (owner === 'SLV' || owner === 'SV' || owner === 'EL_SALVADOR' || owner === 'SALVADOR') {
    return {
      name: (normKey === 'el salvador' || normKey === 'el_salvador' || normKey === 'salvador' || normKey.includes('country'))
        ? 'República de El Salvador (San Salvador)'
        : `${rawName} (El Salvador)`,
      adminTitle: 'República de El Salvador — Dictadura del Gral. Maximiliano Hernández Martínez (1931-1944)',
      note: 'Regime autoritario del generale Martínez (il "Martiniato"), instauratosi dopo la sanguinosa repressione dell\'insurrezione contadina indigena del 1932 ("La Matanza"). Forte monopolio economico dell\'oligarchia cafetalera delle "Catorce Familias"; precoce riconoscimento diplomatico del Manchukuo (1934) e della Spagna franchista, temperato dal progressivo allineamento emisferico con Washington.',
    };
  }

  // Honduras
  if (owner === 'HND' || owner === 'HN' || owner === 'HONDURAS') {
    return {
      name: (normKey === 'honduras' || normKey.includes('country'))
        ? 'República de Honduras (Tegucigalpa)'
        : `${rawName} (Honduras)`,
      adminTitle: 'República de Honduras — El Cariato (Gral. Tiburcio Carías Andino, 1933-1949)',
      note: 'Lungo regime conservatore e autoritario del generale Tiburcio Carías Andino ("El Cariato"), caratterizzato dal motto "Paz, Unión y Trabajo" dopo decenni di conflitti civili. Il paese è il cuore della cosiddetta "Banana Republic", la cui fascia costiera caraibica e trasporti ferroviari sono dominati dalla United Fruit Company e dalla Standard Fruit Company; contesa di confine aperta con il Nicaragua per la Mosquitia.',
    };
  }

  // Nicaragua
  if (owner === 'NIC' || owner === 'NI' || owner === 'NICARAGUA') {
    return {
      name: (normKey === 'nicaragua' || normKey.includes('country'))
        ? 'República de Nicaragua (Managua)'
        : `${rawName} (Nicaragua)`,
      adminTitle: 'República de Nicaragua — Régimen de Anastasio Somoza García (Guardia Nacional)',
      note: 'Presidenza del generale Anastasio "Tacho" Somoza García, salito al potere assoluto dopo il golpe del 1936 e la destituzione di Juan Bautista Sacasa. Fondatore della dinastia Somoza e capo supremo della Guardia Nacional, creata sotto l\'occupazione dei Marines USA. Relazioni ferree di subordinazione geostrategica con Washington e diritti esclusivi concessi agli Stati Uniti sul Canale del Nicaragua (Trattato Bryan-Chamorro).',
    };
  }

  // Costa Rica
  if (owner === 'CRI' || owner === 'CR' || owner === 'COSTA_RICA') {
    return {
      name: (normKey === 'costa rica' || normKey === 'costa_rica' || normKey.includes('country'))
        ? 'República de Costa Rica (San José)'
        : `${rawName} (Costa Rica)`,
      adminTitle: (yearStep !== undefined && yearStep >= 6)
        ? 'República de Costa Rica — Pres. Rafael Ángel Calderón Guardia (1940)'
        : 'República de Costa Rica — Pres. León Cortés Castro (1936-1940)',
      note: 'Stabile democrazia costituzionale dell\'istmo centroamericano fondata sul suffragio, l\'istruzione primaria universale e una precoce tradizione pacifista civile. Mandato presidenziale di León Cortés Castro fino al maggio 1940, seguito dall\'insediamento riformista di Rafael Ángel Calderón Guardia. Economia imperniata sul caffè dell\'Altiplano Centrale e sulle piantagioni bananiere atlantiche e pacifiche (Golfito/Limón).',
    };
  }

  // Panama
  if (owner === 'PAN' || owner === 'PA' || owner === 'PANAMA') {
    return {
      name: (normKey === 'panama' || normKey === 'panamá' || normKey.includes('country'))
        ? 'República de Panamá (Ciudad de Panamá)'
        : `${rawName} (Panamá)`,
      adminTitle: (yearStep !== undefined && yearStep >= 6)
        ? 'República de Panamá — Pres. Arnulfo Arias Madrid (Doctrina Panameñista)'
        : 'República de Panamá — Pres. Juan Demóstenes Arosemena (Tratado Hull-Alfaro)',
      note: 'Stato istmico sovrano territorialmente bisecato dalla Zona del Canale sotto amministrazione militare statunitense. Nel 1936-1939 viene negoziato il Trattato Hull-Alfaro che abroga il diritto unilaterale d\'ingerenza armata USA sancito dal 1903 e riconosce maggiori compensazioni economiche. Nel 1940 sale alla presidenza il nazionalista panameñista Arnulfo Arias Madrid, promotore della dottrina del "panameñismo" e diffidente verso l\'influenza anglosassone.',
    };
  }

  // Cuba
  if (owner === 'CUB' || owner === 'CU' || owner === 'CUBA') {
    return {
      name: (normKey === 'cuba' || normKey.includes('country'))
        ? 'República de Cuba (La Habana)'
        : `${rawName} (Cuba)`,
      adminTitle: (yearStep !== undefined && yearStep >= 6)
        ? 'República de Cuba — Pres. Fulgencio Batista (Constitución Democrática de 1940)'
        : 'República de Cuba — Pres. Federico Laredo Brú / Jefatura Militar de Fulgencio Batista',
      note: 'Repubblica caraibica con capitale L\'Avana; presidenza civile di Federico Laredo Brú (1936-1940) con il vero centro del potere imperniato sull\'Esercito guidato dal colonnello Fulgencio Batista, che nel 1940 viene eletto presidente a seguito della promulgazione della progressista Costituzione del 1940. Monocoltura ed esportazione zuccheriera vitale verso gli Stati Uniti (Sugar Act); base navale USA permanente affittata nella baia di Guantánamo.',
    };
  }

  // Repubblica Dominicana
  if (owner === 'DOM' || owner === 'DO' || owner === 'DOMINICAN_REPUBLIC') {
    return {
      name: (normKey === 'dominican republic' || normKey === 'dominican_republic' || normKey === 'republica dominicana' || normKey === 'republica_dominicana' || normKey.includes('dominican') || normKey.includes('country'))
        ? 'República Dominicana (Ciudad Trujillo)'
        : `${rawName} (República Dominicana)`,
      adminTitle: 'República Dominicana — Era de Trujillo (Generalísimo Rafael Leónidas Trujillo)',
      note: 'Dittatura personale dispotica del "Benefactor de la Patria" Generalissimo Rafael Leónidas Trujillo Molina, che rinomina nel 1936 la capitale Santo Domingo in "Ciudad Trujillo". Nell\'ottobre 1937 ordina il massacro etnico e frontaliero di decine di migliaia di lavoratori haitiani lungo il fiume Dajabón (Masacre del Perejil). Nel settembre 1940 firma il Trattato Trujillo-Hull che restituisce al governo dominicano la riscossione diretta delle proprie dogane controllate da agenti USA dal 1905.',
    };
  }

  // Haiti
  if (owner === 'HAI' || owner === 'HT' || owner === 'HTI' || owner === 'HAITI') {
    return {
      name: (normKey === 'haiti' || normKey === 'haïti' || normKey.includes('country'))
        ? 'République d\'Haïti (Port-au-Prince)'
        : `${rawName} (Haïti)`,
      adminTitle: 'République d\'Haïti — Présidence Sténio Vincent (1930-1941)',
      note: 'Repubblica caraibica francofona con capitale Port-au-Prince; presidenza dell\'avvocato e nazionalista Sténio Vincent. Dopo il ritiro delle truppe d\'occupazione dei Marines USA nel 1934, il paese affronta gravissime difficoltà economiche e il trauma nazionale dell\'eccidio di migliaia di propri cittadini per mano dell\'esercito dominicano di Trujillo nel 1937, risolto con una controversa mediazione diplomatica panamericana.',
    };
  }

  // Panama Canal Zone (USA)
  if (
    (owner === 'USA' || owner === 'US') &&
    (normKey.includes('canal_zone') || normKey.includes('canal zone') || normKey.includes('panama_canal') || normKey.includes('canale_di_panama') || normKey.includes('canal') || id.includes('PCZ') || id.includes('PZ'))
  ) {
    return {
      name: 'Panama Canal Zone (Balboa Heights / Quarry Heights — USA)',
      adminTitle: 'Panama Canal Zone — U.S. Strategic Military Outpost (Governor Clarence S. Ridley / Glen E. Edgerton)',
      note: 'Fascia territoriale e idroviaria strategica di 553 miglia quadrate controllata in perpetuità dagli Stati Uniti d\'America in virtù del Trattato Hay-Bunau-Varilla del 1903. Chokepoint marittimo vitale della sicurezza emisferica e globale per il passaggio rapido delle flotte tra Atlantico e Pacifico (Two-Ocean Navy); difesa da massicce fortificazioni costiere, chiuse protette (Miraflores, Pedro Miguel, Gatun) e basi aeronavali (Albrook Field, Howard Field, Coco Solo).',
    };
  }

  // Puerto Rico (USA)
  if (
    (owner === 'USA' || owner === 'US') &&
    (normKey.includes('puerto_rico') || normKey.includes('puerto rico') || normKey.includes('porto_rico') || normKey.includes('porto rico') || normKey.includes('puerto') || id.includes('PR') || id.includes('PRI'))
  ) {
    return {
      name: 'Puerto Rico (Unincorporated U.S. Territory — San Juan)',
      adminTitle: 'Territory of Puerto Rico — U.S. Caribbean Gibraltar (Gov. Blanton Winship / Adm. William D. Leahy)',
      note: 'Territorio insulare non incorporato degli Stati Uniti d\'America nelle Grandi Antille con capoluogo San Juan. Negli anni 1936-1939 teatro di forti tensioni nazionaliste guidate da Pedro Albizu Campos (Massacro di Ponce del 1937); nel 1939 Franklin D. Roosevelt nomina governatore l\'ammiraglio William D. Leahy per trasformare l\'isola in una formidabile base aeronavale fortificata ("la Gibilterra dei Caraibi") a guardia delle rotte marittime per il Canale di Panama.',
    };
  }

  // 3. Fallback con formattazione pulita
  return { name: rawName };
}
