/**
 * Motore Toponomastico Storico Esteso (1936-1940)
 * Dizionario multi-linguistico e geopolitico per la corretta attribuzione
 * dei toponimi contemporanei d'epoca in base al controllore politico e all'anno.
 */

import { ToponymMatch } from '../types';

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
    warszawa: { historicalName: 'Warszawa', adminTitle: 'Stolica Rzeczypospolitej Polskiej' },
    krakow: { historicalName: 'Kraków', adminTitle: 'Województwo Krakowskie' },
    poznan: { historicalName: 'Poznań', adminTitle: 'Województwo Poznańskie' },
    gdansk: { historicalName: 'Gdynia / Wybrzeże', adminTitle: 'Województwo Pomorskie' },
    puck: { historicalName: 'Puck (Mierzeja Helska)', adminTitle: 'Województwo Pomorskie' },
    torun: { historicalName: 'Toruń', adminTitle: 'Stolica Województwa Pomorskiego' },
    bydgoszcz: { historicalName: 'Bydgoszcz', adminTitle: 'Województwo Pomorskie' },
    katowice: { historicalName: 'Katowice (Śląsk)', adminTitle: 'Autonomiczne Województwo Śląskie' },
    cieszyn: { historicalName: 'Cieszyn Zachodni (Zaolzie)', adminTitle: 'Autonomiczne Województwo Śląskie (Zaolzie)' },
    lviv: { historicalName: 'Lwów (Kresy Wschodnie)', adminTitle: 'Województwo Lwowskie' },
    lwow: { historicalName: 'Lwów (Semper Fidelis)', adminTitle: 'Województwo Lwowskie' },
    vilnius: { historicalName: 'Wilno (Kresy Wschodnie)', adminTitle: 'Województwo Wileńskie' },
    wilno: { historicalName: 'Wilno (Ostra Brama)', adminTitle: 'Województwo Wileńskie' },
    brest: { historicalName: 'Brześć nad Bugiem', adminTitle: 'Województwo Poleskie' },
    pinsk: { historicalName: 'Pińsk (Polesie)', adminTitle: 'Województwo Poleskie' },
    grodno: { historicalName: 'Grodno', adminTitle: 'Województwo Białostockie' },
    hrodna: { historicalName: 'Grodno', adminTitle: 'Województwo Białostockie' },
    volkovysk: { historicalName: 'Wołkowysk', adminTitle: 'Województwo Białostockie' },
    wolkowysk: { historicalName: 'Wołkowysk', adminTitle: 'Województwo Białostockie' },
    vawkavysk: { historicalName: 'Wołkowysk', adminTitle: 'Województwo Białostockie' },
    druskininkai: { historicalName: 'Druskieniki', adminTitle: 'Województwo Białostockie' },
    druskieniki: { historicalName: 'Druskieniki', adminTitle: 'Województwo Białostockie' },
    swislocz: { historicalName: 'Świsłocz', adminTitle: 'Województwo Białostockie' },
    braslaw: { historicalName: 'Brasław (Kraina Jezior)', adminTitle: 'Województwo Wileńskie' },
    dzisna: { historicalName: 'Dzisna', adminTitle: 'Województwo Wileńskie' },
    molodeczno: { historicalName: 'Mołodeczno', adminTitle: 'Województwo Wileńskie' },
    glebokie: { historicalName: 'Głębokie', adminTitle: 'Województwo Wileńskie' },
    troki: { historicalName: 'Troki (Zamek na Wyspie)', adminTitle: 'Województwo Wileńskie' },
    trakai: { historicalName: 'Troki', adminTitle: 'Województwo Wileńskie' },
    tarnopol: { historicalName: 'Tarnopol (Podole)', adminTitle: 'Województwo Tarnopolskie' },
    stanislawow: { historicalName: 'Stanisławów (Pokucie)', adminTitle: 'Województwo Stanisławowskie' },
    luck: { historicalName: 'Łuck (Wołyń)', adminTitle: 'Województwo Wołyńskie' },
    rowne: { historicalName: 'Równe (Wołyń)', adminTitle: 'Województwo Wołyńskie' },
    sarny: { historicalName: 'Sarny (Polesie Wołyńskie)', adminTitle: 'Województwo Wołyńskie' },
    nowogrodek: { historicalName: 'Nowogródek (Ziemia Nowogródzka)', adminTitle: 'Województwo Nowogródzkie' },
    baranavichy: { historicalName: 'Baranowicze', adminTitle: 'Województwo Nowogródzkie' },
    baranowicze: { historicalName: 'Baranowicze', adminTitle: 'Województwo Nowogródzkie' },
    lida: { historicalName: 'Lida', adminTitle: 'Województwo Nowogródzkie' },
    slonim: { historicalName: 'Słonim', adminTitle: 'Województwo Nowogródzkie' },
    drohobych: { historicalName: 'Drohobycz (Zagłębie Naftowe)', adminTitle: 'Województwo Lwowskie' },
    boryslav: { historicalName: 'Borysław', adminTitle: 'Województwo Lwowskie' },
    sambir: { historicalName: 'Sambor', adminTitle: 'Województwo Lwowskie' },
    rawaruska: { historicalName: 'Rawa Ruska', adminTitle: 'Województwo Lwowskie' },
    rawa_ruska: { historicalName: 'Rawa Ruska', adminTitle: 'Województwo Lwowskie' },
    brody: { historicalName: 'Brody', adminTitle: 'Województwo Tarnopolskie' },
    buczacz: { historicalName: 'Buczacz', adminTitle: 'Województwo Tarnopolskie' },
    kremenets: { historicalName: 'Krzemieniec (Počajiv)', adminTitle: 'Województwo Wołyńskie' },
    dubno: { historicalName: 'Dubno', adminTitle: 'Województwo Wołyńskie' },
    kovel: { historicalName: 'Kowel', adminTitle: 'Województwo Wołyńskie' },
    kolomyya: { historicalName: 'Kołomyja', adminTitle: 'Województwo Stanisławowskie' },
    stryi: { historicalName: 'Stryj', adminTitle: 'Województwo Stanisławowskie' },
    chortkiv: { historicalName: 'Czortków', adminTitle: 'Województwo Tarnopolskie' },
    zaleszczyki: { historicalName: 'Zaleszczyki (Dniestr)', adminTitle: 'Województwo Tarnopolskie' },
    bialystok: { historicalName: 'Białystok', adminTitle: 'Województwo Białostockie' },
    lublin: { historicalName: 'Lublin', adminTitle: 'Województwo Lubelskie' },
    kielce: { historicalName: 'Kielce', adminTitle: 'Województwo Kieleckie' },
    lodz: { historicalName: 'Łódź', adminTitle: 'Województwo Łódzkie' },
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
    algeria: { historicalName: 'Départements Français d\'Algérie', adminTitle: 'Gouvernement Général de l\'Algérie' },
    alger: { historicalName: 'Alger', adminTitle: 'Chef-lieu du Département d\'Alger' },
    oran: { historicalName: 'Oran', adminTitle: 'Département d\'Oran' },
    constantine: { historicalName: 'Constantine', adminTitle: 'Département de Constantine' },
    maroc: { historicalName: 'Protectorat Français du Maroc', adminTitle: 'Résidence Générale (Rabat)' },
    rabat: { historicalName: 'Rabat (Maroc)', adminTitle: 'Résidence Générale de France' },
    casablanca: { historicalName: 'Casablanca (Maroc)', adminTitle: 'Grand Port de l\'Atlantique' },
    tunisie: { historicalName: 'Protectorat Français de Tunisie', adminTitle: 'Résidence Générale (Tunis)' },
    tunis: { historicalName: 'Tunis', adminTitle: 'Protectorat de Tunisie' },
    bizerte: { historicalName: 'Bizerte', adminTitle: 'Base Navale Stratégique' },
  },
  VIC_NAF: {
    algeria: { historicalName: 'Départements Français d\'Algérie (Vichy)', adminTitle: 'Gouvernement Général de l\'Algérie (Yves Châtel / Weygand)' },
    alger: { historicalName: 'Alger (Vichy)', adminTitle: 'Chef-lieu du Département d\'Alger' },
    oran: { historicalName: 'Oran (Vichy)', adminTitle: 'Département d\'Oran' },
    constantine: { historicalName: 'Constantine (Vichy)', adminTitle: 'Département de Constantine' },
    maroc: { historicalName: 'Protectorat du Maroc (Vichy)', adminTitle: 'Résident Général Charles Noguès' },
    rabat: { historicalName: 'Rabat (Maroc — Vichy)', adminTitle: 'Résidence Générale de France' },
    casablanca: { historicalName: 'Casablanca (Maroc — Vichy)', adminTitle: 'Base Navale Atlantique' },
    tunisie: { historicalName: 'Protectorat de Tunisie (Vichy)', adminTitle: 'Résident Général Jean-Pierre Esteva' },
    tunis: { historicalName: 'Tunis (Vichy)', adminTitle: 'Protectorat de Tunisie' },
    bizerte: { historicalName: 'Bizerte (Vichy)', adminTitle: 'Base Navale Stratégique' },
  },
  F_AOF: {
    dakar: { historicalName: 'Dakar (Sénégal / AOF)', adminTitle: 'Gouvernement Général de l\'AOF' },
    senegal: { historicalName: 'Sénégal (AOF)', adminTitle: 'Afrique Occidentale Française' },
    mauritanie: { historicalName: 'Mauritanie (AOF)', adminTitle: 'Colonie de la Mauritanie' },
    soudan: { historicalName: 'Soudan Français (Mali)', adminTitle: 'Afrique Occidentale Française' },
    niger: { historicalName: 'Niger (AOF)', adminTitle: 'Colonie du Niger' },
    haute_volta: { historicalName: 'Haute-Volta (Burkina Faso)', adminTitle: 'Afrique Occidentale Française' },
    cote_ivoire: { historicalName: 'Côte d\'Ivoire (AOF)', adminTitle: 'Colonie de Côte d\'Ivoire' },
    guinee: { historicalName: 'Guinée Française (AOF)', adminTitle: 'Colonie de Guinée Française' },
    dahomey: { historicalName: 'Dahomey (Bénin / AOF)', adminTitle: 'Colonie du Dahomey' },
    togo: { historicalName: 'Togo Français', adminTitle: 'Mandat de la Société des Nations' },
  },
  VIC_AOF: {
    dakar: { historicalName: 'Dakar (Sénégal / AOF — Vichy)', adminTitle: 'Haut-Commissariat de Pierre Boisson (AOF)' },
    senegal: { historicalName: 'Sénégal (AOF — Vichy)', adminTitle: 'Afrique Occidentale Française' },
    mauritanie: { historicalName: 'Mauritanie (AOF — Vichy)', adminTitle: 'Colonie de Mauritanie' },
    soudan: { historicalName: 'Soudan Français (AOF — Vichy)', adminTitle: 'Afrique Occidentale Française' },
    niger: { historicalName: 'Niger (AOF — Vichy)', adminTitle: 'Colonie du Niger' },
    haute_volta: { historicalName: 'Haute-Volta (AOF — Vichy)', adminTitle: 'Afrique Occidentale Française' },
    cote_ivoire: { historicalName: 'Côte d\'Ivoire (AOF — Vichy)', adminTitle: 'Colonie de Côte d\'Ivoire' },
    guinee: { historicalName: 'Guinée Française (AOF — Vichy)', adminTitle: 'Colonie de Guinée Française' },
    dahomey: { historicalName: 'Dahomey (AOF — Vichy)', adminTitle: 'Colonie du Dahomey' },
    togo: { historicalName: 'Togo Français (AOF — Vichy)', adminTitle: 'Territoire sous Mandat (Vichy)' },
  },
  F_AEF: {
    brazzaville: { historicalName: 'Brazzaville (Moyen-Congo)', adminTitle: 'Capitale de l\'Afrique Équatoriale Française' },
    tchad: { historicalName: 'Tchad (AEF)', adminTitle: 'Colonie du Tchad (Gouverneur Félix Éboué)' },
    fort_lamy: { historicalName: 'Fort-Lamy (Tchad)', adminTitle: 'Chef-lieu du Territoire du Tchad' },
    cameroun: { historicalName: 'Cameroun Français', adminTitle: 'Territoire sous Mandat de la SDN' },
    douala: { historicalName: 'Douala (Cameroun)', adminTitle: 'Port principal du Cameroun Français' },
    oubangui: { historicalName: 'Oubangui-Chari (Centrafrique)', adminTitle: 'Colonie de l\'Oubangui-Chari' },
    gabon: { historicalName: 'Gabon (AEF)', adminTitle: 'Colonie du Gabon' },
    congo: { historicalName: 'Moyen-Congo (AEF)', adminTitle: 'Colonie du Moyen-Congo' },
  },
  FFL_AEF: {
    brazzaville: { historicalName: 'Brazzaville (Moyen-Congo — Capitale France Libre)', adminTitle: 'Capitale de la France Libre (Manifeste de Brazzaville, 1940)' },
    tchad: { historicalName: 'Tchad (AEF — Rallié à la France Libre)', adminTitle: 'Gouverneur Félix Éboué (août 1940)' },
    fort_lamy: { historicalName: 'Fort-Lamy (Tchad — France Libre)', adminTitle: 'Territoire Militaire du Tchad (Point de départ Colonne Leclerc)' },
    cameroun: { historicalName: 'Cameroun Français (France Libre)', adminTitle: 'Rallié à De Gaulle sous Philippe Leclerc (août 1940)' },
    douala: { historicalName: 'Douala (Cameroun — France Libre)', adminTitle: 'Port de ralliement de la France Libre (27 août 1940)' },
    oubangui: { historicalName: 'Oubangui-Chari (Centrafrique — France Libre)', adminTitle: 'Rallié à De Gaulle (29 août 1940)' },
    gabon: { historicalName: 'Gabon (AEF — France Libre)', adminTitle: 'Rallié à la France Libre (nov 1940)' },
    congo: { historicalName: 'Moyen-Congo (AEF — France Libre)', adminTitle: 'Gouverneur Edgard de Larminat (août 1940)' },
  },
  F_IND: {
    indochine: { historicalName: 'Indochine Française', adminTitle: 'Gouvernement Général de l\'Indochine' },
    hanoi: { historicalName: 'Hanoï (Tonkin)', adminTitle: 'Capitale de l\'Indochine Française' },
    saigon: { historicalName: 'Saïgon (Cochinchine)', adminTitle: 'Colonie de Cochinchine' },
    phnom_penh: { historicalName: 'Phnom Penh (Cambodge)', adminTitle: 'Protectorat du Cambodge' },
    vientiane: { historicalName: 'Vientiane (Laos)', adminTitle: 'Protectorat du Laos' },
    hue: { historicalName: 'Huế (Annam)', adminTitle: 'Protectorat d\'Annam' },
    haiphong: { historicalName: 'Haïphong (Tonkin)', adminTitle: 'Grand port de l\'Indochine' },
  },
  VIC_IND: {
    indochine: { historicalName: 'Indochine Française (Vichy)', adminTitle: 'Gouvernement Général de l\'Amiral Jean Decoux' },
    hanoi: { historicalName: 'Hanoï (Tonkin — Vichy)', adminTitle: 'Capitale de l\'Indochine Française' },
    saigon: { historicalName: 'Saïgon (Cochinchine — Vichy)', adminTitle: 'Colonie de Cochinchine' },
    phnom_penh: { historicalName: 'Phnom Penh (Cambodge — Vichy)', adminTitle: 'Protectorat du Cambodge' },
    vientiane: { historicalName: 'Vientiane (Laos — Vichy)', adminTitle: 'Protectorat du Laos' },
    hue: { historicalName: 'Huế (Annam — Vichy)', adminTitle: 'Protectorat d\'Annam' },
    haiphong: { historicalName: 'Haïphong (Tonkin — Vichy)', adminTitle: 'Base sous accord franco-japonais (sept 1940)' },
  },
  F_SYR: {
    syrie: { historicalName: 'Mandat Français de Syrie', adminTitle: 'Haut-Commissariat au Levant' },
    damas: { historicalName: 'Damas (Syrie)', adminTitle: 'État de Syrie' },
    alep: { historicalName: 'Alep (Syrie)', adminTitle: 'État de Syrie' },
    liban: { historicalName: 'Grand Liban (Mandat Français)', adminTitle: 'République Libanaise sous Mandat' },
    beyrouth: { historicalName: 'Beyrouth (Liban)', adminTitle: 'Siège du Haut-Commissaire' },
    latakia: { historicalName: 'Lattaquié (État des Alaouites)', adminTitle: 'Mandat du Levant' },
  },
  VIC_SYR: {
    syrie: { historicalName: 'Mandat de Syrie (Vichy)', adminTitle: 'Haut-Commissaire Général Henri Dentz' },
    damas: { historicalName: 'Damas (Syrie — Vichy)', adminTitle: 'État de Syrie' },
    alep: { historicalName: 'Alep (Syrie — Vichy)', adminTitle: 'État de Syrie' },
    liban: { historicalName: 'Grand Liban (Vichy)', adminTitle: 'République Libanaise sous Mandat de Vichy' },
    beyrouth: { historicalName: 'Beyrouth (Liban — Vichy)', adminTitle: 'Siège du Haut-Commissaire Dentz' },
    latakia: { historicalName: 'Lattaquié (Alaouites — Vichy)', adminTitle: 'Mandat du Levant' },
  },
  F_MAD: {
    madagascar: { historicalName: 'Madagascar et Dépendances', adminTitle: 'Colonie Française de Madagascar' },
    tananarive: { historicalName: 'Tananarive (Madagascar)', adminTitle: 'Chef-lieu de Madagascar' },
    diego_suarez: { historicalName: 'Diego Suarez (Antsiranana)', adminTitle: 'Base Navale Stratégique de l\'Océan Indien' },
  },
  VIC_MAD: {
    madagascar: { historicalName: 'Madagascar (Vichy)', adminTitle: 'Colonie Française — Gouverneur Armand Annet' },
    tananarive: { historicalName: 'Tananarive (Madagascar — Vichy)', adminTitle: 'Chef-lieu de Madagascar' },
    diego_suarez: { historicalName: 'Diego Suarez (Vichy)', adminTitle: 'Base Navale de Vichy' },
  },
  F_SOM: {
    djibouti: { historicalName: 'Côte Française des Somalis (Djibouti)', adminTitle: 'Colonie de Djibouti' },
  },
  VIC_SOM: {
    djibouti: { historicalName: 'Côte Française des Somalis (Djibouti — Vichy)', adminTitle: 'Gouverneur Pierre Nouailhetas (Vichy)' },
  },
  F_COL: {
    djibouti: { historicalName: 'Côte Française des Somalis (Djibouti)', adminTitle: 'Colonie de Djibouti' },
    guyane: { historicalName: 'Guyane Française (Cayenne)', adminTitle: 'Colonie de Guyane' },
    guadeloupe: { historicalName: 'Guadeloupe (Pointe-à-Pitre)', adminTitle: 'Antilles Françaises' },
    martinique: { historicalName: 'Martinique (Fort-de-France)', adminTitle: 'Antilles Françaises (Amiral Robert)' },
    st_pierre: { historicalName: 'Saint-Pierre-et-Miquelon', adminTitle: 'Territoire Français' },
    nouvelle_caledonie: { historicalName: 'Nouvelle-Calédonie', adminTitle: 'Ralliée à la France Libre (1940)' },
    tahiti: { historicalName: 'Établissements Français de l\'Océanie (Tahiti)', adminTitle: 'France Libre (1940)' },
    inde_francaise: { historicalName: 'Établissements Français de l\'Inde (Pondichéry)', adminTitle: 'Pondichéry, Chandernagor, Mahé' },
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
    palestine: { historicalName: 'British Mandate for Palestine', adminTitle: 'League of Nations Mandate (High Commissioner)' },
    jerusalem: { historicalName: 'Jerusalem (Palestine)', adminTitle: 'Seat of the High Commissioner' },
    haifa: { historicalName: 'Haifa (Palestine)', adminTitle: 'Major Port and Oil Pipeline Terminal' },
    jaffa: { historicalName: 'Jaffa / Tel Aviv', adminTitle: 'Mandate of Palestine' },
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
    khartoum: { historicalName: 'Khartoum (Sudan)', adminTitle: 'Governor-General Palace' },
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
    hatay: { historicalName: 'Hatay (Antakya / İskenderun)', adminTitle: 'Hatay İli (Türkiye Cumhuriyeti)' },
    alexandretta: { historicalName: 'İskenderun', adminTitle: 'Hatay İli' },
    antakya: { historicalName: 'Antakya', adminTitle: 'Hatay İli Merkezi' },
  },
  HAT: {
    hatay: { historicalName: 'Hatay Devleti', adminTitle: 'Bağımsız Hatay Devleti (1938-1939)' },
    alexandretta: { historicalName: 'İskenderun (Hatay Devleti)', adminTitle: 'Hatay Devleti Limanı' },
    antakya: { historicalName: 'Antakya (Hatay Devleti Başkenti)', adminTitle: 'Hatay Devleti Başkenti' },
    iskenderun: { historicalName: 'İskenderun', adminTitle: 'Hatay Devleti' },
  },

  // ================= CENTRO AMERICA & CARAIBI =================
  GTM: {
    guatemala: { historicalName: 'República de Guatemala', adminTitle: 'Presidencia Jorge Ubico (1931-1944)' },
    ciudad_de_guatemala: { historicalName: 'Ciudad de Guatemala', adminTitle: 'Capital de la República de Guatemala' },
    quetzaltenango: { historicalName: 'Quetzaltenango (Los Altos)', adminTitle: 'Departamento de Quetzaltenango' },
    puerto_barrios: { historicalName: 'Puerto Barrios (Caribe)', adminTitle: 'Terminal Ferroviario IRCA / United Fruit' },
    escuintla: { historicalName: 'Escuintla', adminTitle: 'Región Pacífica Guatemalteca' },
    peten: { historicalName: 'El Petén (Selva Maya)', adminTitle: 'Territorio de El Petén' },
  },
  SLV: {
    el_salvador: { historicalName: 'República de El Salvador', adminTitle: 'Gobierno Maximiliano Hernández Martínez' },
    san_salvador: { historicalName: 'San Salvador', adminTitle: 'Capital de la República de El Salvador' },
    santa_ana: { historicalName: 'Santa Ana', adminTitle: 'Zona Cafetalera Occidental' },
    san_miguel: { historicalName: 'San Miguel', adminTitle: 'Departamento de San Miguel' },
    acajutla: { historicalName: 'Puerto de Acajutla', adminTitle: 'Puerto Cafetalero del Pacífico' },
  },
  HND: {
    honduras: { historicalName: 'República de Honduras', adminTitle: 'Presidencia Tiburcio Carías Andino (El Cariato)' },
    tegucigalpa: { historicalName: 'Tegucigalpa (Distrito Central)', adminTitle: 'Capital de la República de Honduras' },
    san_pedro_sula: { historicalName: 'San Pedro Sula (Valle de Sula)', adminTitle: 'Centro Industrial y Bananero' },
    la_ceiba: { historicalName: 'La Ceiba (Costa Norte)', adminTitle: 'Puerto Bananero — Standard Fruit Company' },
    puerto_cortes: { historicalName: 'Puerto Cortés', adminTitle: 'Puerto Caribeño Hondureño' },
    comayagua: { historicalName: 'Comayagua', adminTitle: 'Región Central Hondureña' },
    choluteca: { historicalName: 'Choluteca', adminTitle: 'Golfo de Fonseca / Zona Sur' },
    islas_de_la_bahia: { historicalName: 'Islas de la Bahía (Bay Islands)', adminTitle: 'Departamento Insular de Honduras' },
  },
  NIC: {
    nicaragua: { historicalName: 'República de Nicaragua', adminTitle: 'Gobierno de Anastasio Somoza García' },
    managua: { historicalName: 'Managua', adminTitle: 'Capital de la República de Nicaragua' },
    leon: { historicalName: 'León', adminTitle: 'Centro Liberal Universitario' },
    granada: { historicalName: 'Granada (Lago Cocibolca)', adminTitle: 'Centro Conservador Histórico' },
    corinto: { historicalName: 'Puerto de Corinto', adminTitle: 'Puerto Principal del Pacífico' },
    bluefields: { historicalName: 'Bluefields (Mosquitia)', adminTitle: 'Costa Caribe / Departamento de Zelaya' },
    puerto_cabezas: { historicalName: 'Puerto Cabezas (Bilwi)', adminTitle: 'Terminal Maderero y Bananero del Caribe' },
    matagalpa: { historicalName: 'Matagalpa (Tierras Altas)', adminTitle: 'Región Cafetalera del Norte' },
  },
  CRI: {
    costa_rica: { historicalName: 'República de Costa Rica', adminTitle: 'Presidencia León Cortés / Rafael Calderón' },
    san_jose: { historicalName: 'San José', adminTitle: 'Capital de la República de Costa Rica' },
    alajuela: { historicalName: 'Alajuela (Valle Central)', adminTitle: 'Provincia de Alajuela' },
    heredia: { historicalName: 'Heredia (Ciudad de las Flores)', adminTitle: 'Zona Cafetalera de Heredia' },
    cartago: { historicalName: 'Cartago', adminTitle: 'Antigua Capital de Costa Rica' },
    puerto_limon: { historicalName: 'Puerto Limón (Caribe)', adminTitle: 'Puerto Bananero y Cacaotero del Atlántico' },
    puntarenas: { historicalName: 'Puntarenas', adminTitle: 'Puerto Principal del Pacífico Costarricense' },
    guanacaste: { historicalName: 'Guanacaste (Nicoya)', adminTitle: 'Provincia Ganadera de Guanacaste' },
  },
  PAN: {
    panama: { historicalName: 'República de Panamá', adminTitle: 'Presidencia de Juan Demóstenes Arosemena / Arnulfo Arias' },
    ciudad_de_panama: { historicalName: 'Ciudad de Panamá', adminTitle: 'Capital de la República de Panamá' },
    colon: { historicalName: 'Colón (Caribe)', adminTitle: 'Ciudad Terminal del Caribe Panameño' },
    david: { historicalName: 'David (Chiriquí)', adminTitle: 'Provincia de Chiriquí' },
    bocas_del_toro: { historicalName: 'Bocas del Toro (Almirante)', adminTitle: 'Enclave Bananero del Caribe Occidental' },
    darien: { historicalName: 'Darién (Frontera con Colombia)', adminTitle: 'Provincia del Darién' },
    santiago: { historicalName: 'Santiago de Veraguas', adminTitle: 'Provincias Centrales Panameñas' },
  },
  CUB: {
    cuba: { historicalName: 'República de Cuba', adminTitle: 'Presidencia Federico Laredo Brú / Jefatura Fulgencio Batista' },
    la_habana: { historicalName: 'La Habana', adminTitle: 'Capital de la República de Cuba' },
    santiago_de_cuba: { historicalName: 'Santiago de Cuba (Oriente)', adminTitle: 'Provincia de Oriente' },
    camaguey: { historicalName: 'Camagüey (Puerto Príncipe)', adminTitle: 'Región Ganadera e Ingenios Azucareros' },
    santa_clara: { historicalName: 'Santa Clara (Las Villas)', adminTitle: 'Provincia de Las Villas' },
    matanzas: { historicalName: 'Matanzas (Atenas de Cuba)', adminTitle: 'Provincia de Matanzas' },
    pinar_del_rio: { historicalName: 'Pinar del Río (Vuelta Abajo)', adminTitle: 'Zona Tabacalera de Occidente' },
    cienfuegos: { historicalName: 'Cienfuegos (Bahía de Jagua)', adminTitle: 'Puerto Azucarero del Sur' },
    holguin: { historicalName: 'Holguín', adminTitle: 'Norte de Oriente' },
    isla_de_pinos: { historicalName: 'Isla de Pinos (Isla de la Juventud)', adminTitle: 'Presidio Modelo de Cuba' },
  },
  DOM: {
    dominican_republic: { historicalName: 'República Dominicana (Era de Trujillo)', adminTitle: 'Dictadura del Generalísimo Rafael L. Trujillo' },
    republica_dominicana: { historicalName: 'República Dominicana (Era de Trujillo)', adminTitle: 'Dictadura del Generalísimo Rafael L. Trujillo' },
    ciudad_trujillo: { historicalName: 'Ciudad Trujillo (Santo Domingo)', adminTitle: 'Capital de la República Dominicana (1936-1961)' },
    santo_domingo: { historicalName: 'Ciudad Trujillo (Santo Domingo)', adminTitle: 'Renombrada Ciudad Trujillo en 1936' },
    santiago_de_los_caballeros: { historicalName: 'Santiago de los Caballeros', adminTitle: 'Región del Cibao' },
    san_pedro_de_macoris: { historicalName: 'San Pedro de Macorís', adminTitle: 'Costa Este Azucarera' },
    puerto_plata: { historicalName: 'Puerto Plata', adminTitle: 'Costa Atlántica Dominicana' },
    barahona: { historicalName: 'Barahona', adminTitle: 'Región Suroeste Dominicana' },
    la_vega: { historicalName: 'La Vega Real (Cibao)', adminTitle: 'Provincia de La Vega' },
  },
  HAI: {
    haiti: { historicalName: 'République d\'Haïti', adminTitle: 'Présidence Sténio Vincent (1930-1941)' },
    port_au_prince: { historicalName: 'Port-au-Prince', adminTitle: 'Capitale de la République d\'Haïti' },
    cap_haitien: { historicalName: 'Cap-Haïtien (Le Cap)', adminTitle: 'Département du Nord' },
    les_cayes: { historicalName: 'Les Cayes (Aux Cayes)', adminTitle: 'Département du Sud' },
    gonaives: { historicalName: 'Les Gonaïves', adminTitle: 'Cité de l\'Indépendance (Artibonite)' },
    jacmel: { historicalName: 'Jacmel', adminTitle: 'Port Caféier du Sud-Est' },
    port_de_paix: { historicalName: 'Port-de-Paix', adminTitle: 'Département du Nord-Ouest' },
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
    armisticeNote: 'Placé en Zone réservée du Nord-Est sous surveillance militaire stricte.',
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
    armisticeNote: 'Arsenal et rade de Cherbourg occupés et utilisés par la Kriegsmarine allemande.',
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
    armisticeNote: 'Inclus dans la Zone réservée (Zone interdite du Nord-Est).',
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
    armisticeNote: 'Partie septentrionale incluse dans la Zone réservée du Nord-Est.',
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
    armisticeNote: 'Inclus dans la Zone réservée (Zone interdite du Nord-Est), coupée de Paris.',
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
    armisticeNote: 'Inclus dans la Zone réservée du Nord-Est.',
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

  // Fallback per entità nazionale 'France' / 'Francia'
  if (normKey.includes('france') || normKey.includes('french') || normKey.includes('vichy')) {
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
      note: 'Territoire métropolitain français sous occupation militaire allemande après l\'armistice de juin 1940.',
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
export function getGauAndLandByPrefix(id: string, step: number): { gau: string; land: string } {
  const p3 = id.substring(0, 3).toUpperCase();
  const p4 = id.substring(0, 4).toUpperCase();

  switch (p4) {
    case 'DE11':
      return { gau: 'Gau Württemberg-Hohenzollern', land: 'Land Württemberg (Stuttgart)' };
    case 'DE12':
      return { gau: step >= 6 ? 'Gau Baden-Elsass' : 'Gau Baden', land: 'Land Baden (Karlsruhe)' };
    case 'DE13':
      return { gau: step >= 6 ? 'Gau Baden-Elsass' : 'Gau Baden', land: 'Land Baden (Freiburg)' };
    case 'DE14':
      return { gau: 'Gau Württemberg-Hohenzollern', land: 'Land Württemberg & Hohenzollern (Tübingen)' };
    case 'DE21':
      return { gau: 'Gau München-Oberbayern', land: 'Freistaat Bayern (Oberbayern)' };
    case 'DE22':
      return { gau: 'Gau Bayerische Ostmark', land: 'Freistaat Bayern (Niederbayern)' };
    case 'DE23':
      return { gau: 'Gau Bayerische Ostmark', land: 'Freistaat Bayern (Oberpfalz)' };
    case 'DE24':
      return { gau: 'Gau Bayerische Ostmark', land: 'Freistaat Bayern (Oberfranken)' };
    case 'DE25':
      return { gau: 'Gau Franken', land: 'Freistaat Bayern (Mittelfranken)' };
    case 'DE26':
      return { gau: 'Gau Mainfranken', land: 'Freistaat Bayern (Unterfranken)' };
    case 'DE27':
      return { gau: 'Gau Schwaben', land: 'Freistaat Bayern (Schwaben)' };
    case 'DE30':
      return { gau: 'Gau Berlin', land: 'Reichshauptstadt Berlin' };
    case 'DE40':
      return { gau: step >= 6 ? 'Gau Mark Brandenburg' : 'Gau Kurmark', land: 'Provinz Brandenburg' };
    case 'DE50':
      return { gau: 'Gau Weser-Ems', land: 'Freie Hansestadt Bremen' };
    case 'DE60':
      return { gau: 'Gau Hamburg', land: 'Freie und Hansestadt Hamburg' };
    case 'DE71':
      return { gau: 'Gau Hessen-Nassau', land: 'Volksstaat Hessen (Darmstadt)' };
    case 'DE72':
      return { gau: 'Gau Hessen-Nassau', land: 'Volksstaat Hessen (Gießen)' };
    case 'DE73':
      return { gau: 'Gau Kurhessen', land: 'Provinz Hessen-Nassau (Kassel)' };
    case 'DE80':
      if (id === 'DE80L' || id === 'DE80N') {
        return { gau: 'Gau Pommern', land: 'Provinz Pommern (Vorpommern)' };
      }
      return { gau: 'Gau Mecklenburg', land: 'Land Mecklenburg' };
    case 'DE91':
      return { gau: 'Gau Süd-Hannover-Braunschweig', land: 'Land Braunschweig & Hannover' };
    case 'DE92':
      return { gau: 'Gau Süd-Hannover-Braunschweig', land: 'Provinz Hannover' };
    case 'DE93':
      return { gau: 'Gau Ost-Hannover', land: 'Provinz Hannover (Lüneburg)' };
    case 'DE94':
      return { gau: 'Gau Weser-Ems', land: 'Land Oldenburg & Provinz Hannover' };
    case 'DEA1':
      return { gau: 'Gau Düsseldorf / Gau Essen', land: 'Rheinprovinz (Ruhrgebiet)' };
    case 'DEA2':
      return { gau: 'Gau Köln-Aachen', land: 'Rheinprovinz (Köln-Aachen)' };
    case 'DEA3':
      return { gau: 'Gau Westfalen-Nord', land: 'Provinz Westfalen (Münster)' };
    case 'DEA4':
      return { gau: 'Gau Westfalen-Nord', land: 'Provinz Westfalen & Lippe (Detmold)' };
    case 'DEA5':
      return { gau: 'Gau Westfalen-Süd', land: 'Provinz Westfalen (Arnsberg/Dortmund)' };
    case 'DEB1':
      return { gau: 'Gau Moselland', land: 'Rheinprovinz (Koblenz)' };
    case 'DEB2':
      return { gau: 'Gau Moselland', land: 'Rheinprovinz (Trier)' };
    case 'DEB3':
      return { gau: step >= 6 ? 'Gau Westmark' : 'Gau Saarpfalz', land: 'Bayerische Pfalz & Rheinhessen' };
    case 'DEC0':
      return { gau: step >= 6 ? 'Gau Westmark' : 'Gau Saarpfalz', land: 'Saargebiet (Rückgliederung 1935)' };
    case 'DED2':
      return { gau: 'Gau Sachsen', land: 'Freistaat Sachsen (Dresden)' };
    case 'DED4':
      return { gau: 'Gau Sachsen', land: 'Freistaat Sachsen (Chemnitz-Zwickau)' };
    case 'DED5':
      return { gau: 'Gau Sachsen', land: 'Freistaat Sachsen (Leipzig)' };
    case 'DEE0':
      return { gau: 'Gau Halle-Merseburg / Gau Magdeburg-Anhalt', land: 'Provinz Sachsen & Anhalt' };
    case 'DEF0':
      return { gau: 'Gau Schleswig-Holstein', land: 'Provinz Schleswig-Holstein' };
    case 'DEG0':
      return { gau: 'Gau Thüringen', land: 'Land Thüringen' };
    default:
      break;
  }

  // Fallback 3 caratteri
  switch (p3) {
    case 'DE1':
      return { gau: 'Gau Württemberg-Hohenzollern / Gau Baden', land: 'Südwestdeutschland' };
    case 'DE2':
      return { gau: 'Gau Bayern', land: 'Freistaat Bayern' };
    case 'DE3':
      return { gau: 'Gau Berlin', land: 'Reichshauptstadt Berlin' };
    case 'DE4':
      return { gau: 'Gau Mark Brandenburg', land: 'Provinz Brandenburg' };
    case 'DE5':
      return { gau: 'Gau Weser-Ems', land: 'Freie Hansestadt Bremen' };
    case 'DE6':
      return { gau: 'Gau Hamburg', land: 'Freie und Hansestadt Hamburg' };
    case 'DE7':
      return { gau: 'Gau Hessen-Nassau / Gau Kurhessen', land: 'Hessen' };
    case 'DE8':
      return { gau: 'Gau Mecklenburg / Gau Pommern', land: 'Mecklenburg-Vorpommern' };
    case 'DE9':
      return { gau: 'Gau Süd-Hannover-Braunschweig / Gau Ost-Hannover', land: 'Niedersachsen' };
    case 'DEA':
      return { gau: 'Gau Essen / Gau Düsseldorf / Gau Westfalen', land: 'Rheinland-Westfalen' };
    case 'DEB':
      return { gau: 'Gau Moselland / Gau Saarpfalz', land: 'Rheinland-Pfalz' };
    case 'DEC':
      return { gau: step >= 6 ? 'Gau Westmark' : 'Gau Saarpfalz', land: 'Saargebiet' };
    case 'DED':
      return { gau: 'Gau Sachsen', land: 'Freistaat Sachsen' };
    case 'DEE':
      return { gau: 'Gau Halle-Merseburg / Gau Magdeburg-Anhalt', land: 'Provinz Sachsen' };
    case 'DEF':
      return { gau: 'Gau Schleswig-Holstein', land: 'Provinz Schleswig-Holstein' };
    case 'DEG':
      return { gau: 'Gau Thüringen', land: 'Land Thüringen' };
    default:
      return { gau: 'Deutsches Reich', land: 'Deutsches Reich' };
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
    const adminTitle = c.getAdminTitle ? c.getAdminTitle(step) : (c.adminTitle || `${name} (${nationalEntity})`);
    return {
      name,
      adminTitle,
      note: c.note,
    };
  }

  // 2. Se è un codice distrettuale tedesco NUTS-3 (DE101 - DEG0P), pulizia accurata e derivazione Gau
  if (id.startsWith('DE')) {
    const cleanedName = cleanGermanToponymName(rawName) || rawName;
    const gauInfo = getGauAndLandByPrefix(id, step);
    return {
      name: cleanedName,
      adminTitle: `${gauInfo.gau} — ${gauInfo.land} (${nationalEntity})`,
      note: `Verwaltungsbezirk des Deutschen Reiches im ${gauInfo.gau} (${gauInfo.land}).`,
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
    const note = p.dynamicNote ? p.dynamicNote(step) : p.note;
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
    adminTitle: 'Deutsches Reich — Provinz Niederschlesien / Mark Brandenburg',
    note: 'Bassa Slesia settentrionale e Bassa Lusazia orientale (Sorau e Sagan).',
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
        : 'Landkreis Konitz nel Reichsgau Danzig-Westpreußen.',
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
        : 'Annesso al Reichsgau Danzig-Westpreußen.',
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
        : 'Landkreis Graudenz nel Reichsgau Danzig-Westpreußen.',
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
        : 'Landkreis Schwetz nel Reichsgau Danzig-Westpreußen.',
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
        : 'Regierungsbezirk Posen nel Reichsgau Wartheland.',
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
        : 'Annesso direttamente al Reichsgau Wartheland.',
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
        : 'Sede del Regierungsbezirk Kalisch incorporato nel Reichsgau Wartheland.',
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
        : 'Landkreis Lissa nel Reichsgau Wartheland.',
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
        : 'Capoluogo del Regierungsbezirk Hohensalza nel Reichsgau Wartheland.',
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
        : 'Landkreis Leslau nel Reichsgau Wartheland.',
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
        : 'Landkreis Litzmannstadt nel Reichsgau Wartheland.',
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
        : 'Landkreis Schieratz nel Reichsgau Wartheland.',
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
        : 'Assegnato al Governatorato Generale all\'interno del Distrikt Radom.',
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
        : 'Incluso nel Distrikt Warschau del Governatorato Generale.',
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
        : 'Annesso al Reich come Landkreis Pless.',
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
        : 'Incluso nel Distrikt Warschau del Governatorato Generale.',
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
        : 'Incluso nel Distrikt Warschau del Governatorato Generale.',
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
        : 'Kreishauptmannschaft Siedlce nel Distrikt Warschau del Governatorato Generale.',
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
        : 'Incluso nel Distrikt Warschau del Governatorato Generale.',
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
        : 'Kreishauptmannschaft Krakau-Land nel Governatorato Generale.',
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
        : 'Distrikt Krakau del Governatorato Generale.',
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
        : 'Kreishauptmannschaft Neumarkt nel Distrikt Krakau del Governatorato Generale.',
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
        : 'Capitale del Distrikt Radom nel Governatorato Generale.',
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
        : 'Distrikt Radom del Governatorato Generale.',
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
        : 'Distrikt Radom del Governatorato Generale.',
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
        : 'Distrikt Lublin del Governatorato Generale.',
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
        : 'Distrikt Lublin del Governatorato Generale.',
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
      "Provincia settentrionale del Manciukuò con la cosmopolita Harbin (grande comunità di russi bianchi), affacciata sulla frontiera fluviale dell'Amur con l'Unione Sovietica.",
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
    normKey.includes('jersey') ||
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

  // Fallback se id è generico o appartenente a UK
  if (owner === 'UK' || id.startsWith('UK')) {
    return {
      name: `${rawName} (United Kingdom)`,
      adminTitle: 'Territory of the United Kingdom',
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

  // 1. Mosca e Centro RSFSR
  if (normKey.includes('moscow') || normKey.includes('moskva') || normKey.includes('moscow_city') || normKey === 'ru_mow') {
    return {
      name: 'Moskva (Kreml)',
      adminTitle: 'Stolitsa SSSR i RSFSR (Moskovskaya oblast)',
      note: 'Centro nevralgico del potere sovietico, sede del Cremlino, del Consiglio dei Commissari del Popolo (Sovnarkom) e del Segretario Generale del PCUS(b) Iosif Stalin; immenso distretto per la produzione bellica (fabbriche automobilistiche ZiS, aeronautiche MiG e Yak).',
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
    occNote: 'Occupata il 15 maggio 1940 dal 18º Esercito tedesco del generale von Küchler.',
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
    occNote: 'Occupata il 10 maggio 1940 dalle colonne d\'invasione tedesche.',
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
    occNote: 'Occupata l\'11 maggio 1940 dalla 1ª Divisione di Cavalleria tedesca.',
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
    occNote: 'Occupata il 10 maggio 1940 dai reparti motorizzati della Wehrmacht.',
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
    occNote: 'Occupata l\'11 maggio 1940 durante la marcia tedesca verso l\'IJsselmeer.',
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
    occNote: 'Occupata la mattina del 10 maggio 1940 da reparti di frontiera tedeschi.',
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
    occNote: 'Occupata l\'11 maggio 1940 durante la manovra tedesca verso lo Zuiderzee.',
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
    "postAdminTitle": "Deutsches Reich — Reichsgau Salzburg",
    "postNote": "Integrato nel Reichsgau Salzburg sotto la guida del Gauleiter Friedrich Rainer."
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


export function getExtendedToponym(
  rawName: string,
  owner: string,
  nid?: string,
  centroid?: [number, number],
  yearStep?: number
): { name: string; adminTitle?: string; note?: string } {
  if (!rawName) return { name: 'Territorio non assegnato' };

  const normKey = rawName
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

  // 0.05 Overrides prioritari per Francia (FRA / VIC / codici FR / toponimi francesi)
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

  // 0.13 Overrides prioritari per Regno Unito e Territori della Corona (UK / codici UK... / IM / GG / JE / GIB / MT / CY)
  if (
    owner === 'UK' ||
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
    const ukTop = resolveUKToponym(id, rawName, normKey, owner, yearStep);
    if (ukTop) return ukTop;
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

    // Somalia: "Governo della Somalia" solo dopo l'istituzione dell'AOI (1 giugno 1936 / step >= 1)
    if (
      normKey.includes('somaliland') ||
      normKey.includes('somali') ||
      id.startsWith('SO') ||
      id.startsWith('SOM')
    ) {
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

  // 1. Match diretto dizionario per owner
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

  // 2. Gestione granulare Powiat Kresy Wschodnie (1921-1939)
  const isKresyPowiat = id.startsWith('PL_KRESY_') || rawName.toLowerCase().startsWith('powiat ');
  if (isKresyPowiat) {
    if (owner === 'POL') {
      let voiv = 'Kresy Wschodnie';
      if (normKey.includes('wil') || normKey.includes('trok') || normKey.includes('swiec') || normKey.includes('bras') || normKey.includes('dzis') || normKey.includes('postaw') || normKey.includes('oszmi')) {
        voiv = 'Wileńskie';
      } else if (normKey.includes('nowogrod') || normKey.includes('baran') || normKey.includes('stolp') || normKey.includes('niez') || normKey.includes('slon') || normKey.includes('szczucz') || normKey.includes('lid')) {
        voiv = 'Nowogródzkie';
      } else if (normKey.includes('polesk') || normKey.includes('brzesc') || normKey.includes('pinsk') || normKey.includes('kobryn') || normKey.includes('drohicz') || normKey.includes('kosin') || normKey.includes('luni')) {
        voiv = 'Poleskie';
      } else if (normKey.includes('wolyn') || normKey.includes('luck') || normKey.includes('rowne') || normKey.includes('kowel') || normKey.includes('krzemieniec') || normKey.includes('dubn') || normKey.includes('kostop') || normKey.includes('sarn') || normKey.includes('horoch') || normKey.includes('lubom')) {
        voiv = 'Wołyńskie';
      } else if (normKey.includes('tarnopol') || normKey.includes('czortkow') || normKey.includes('brzez') || normKey.includes('buczac') || normKey.includes('podhaj') || normKey.includes('trembow') || normKey.includes('zborow') || normKey.includes('zbaraz') || normKey.includes('kopycz') || normKey.includes('borszcz') || normKey.includes('skal')) {
        voiv = 'Tarnopolskie';
      } else if (normKey.includes('stanislaw') || normKey.includes('kolomy') || normKey.includes('stryj') || normKey.includes('kalusz') || normKey.includes('horoden') || normKey.includes('sniat') || normKey.includes('nadwor') || normKey.includes('tlumac') || normKey.includes('turk') || normKey.includes('kosow') || normKey.includes('dolin') || normKey.includes('rohat')) {
        voiv = 'Stanisławowskie';
      } else if (normKey.includes('lwow') || normKey.includes('drohob') || normKey.includes('borys') || normKey.includes('sambor') || normKey.includes('zolkiew') || normKey.includes('rawa') || normKey.includes('jawor') || normKey.includes('grodek') || normKey.includes('przemysl') || normKey.includes('jaroslaw') || normKey.includes('lubacz') || normKey.includes('sokal') || normKey.includes('moscisk') || normKey.includes('dobrom') || normKey.includes('rudk') || normKey.includes('bobrk')) {
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
      let oblast = 'Brestskaya';
      let ssr = 'BSSR';

      if (normKey.includes('wil') || normKey.includes('trok') || normKey.includes('swiec')) {
        oblast = 'Vilnyusskaya oblast';
        ssr = 'Litovskaya SSR';
      } else if (normKey.includes('bras') || normKey.includes('dzis') || normKey.includes('postaw') || normKey.includes('oszmi') || normKey.includes('viley') || normKey.includes('molodech')) {
        oblast = 'Vileyskaya oblast';
        ssr = 'BSSR';
      } else if (normKey.includes('nowogrod') || normKey.includes('baran') || normKey.includes('stolp') || normKey.includes('slon') || normKey.includes('lid') || normKey.includes('nesvizh')) {
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
      } else if (normKey.includes('luck') || normKey.includes('kowel') || normKey.includes('horoch') || normKey.includes('lubom') || normKey.includes('vladimir')) {
        oblast = 'Volynskaya oblast';
        ssr = 'USSR';
      } else if (normKey.includes('rowne') || normKey.includes('dubn') || normKey.includes('kostop') || normKey.includes('sarn') || normKey.includes('zdolbun')) {
        oblast = 'Rovnenskaya oblast';
        ssr = 'USSR';
      } else if (normKey.includes('tarnopol') || normKey.includes('czortkow') || normKey.includes('brzez') || normKey.includes('buczac') || normKey.includes('podhaj') || normKey.includes('trembow') || normKey.includes('zborow') || normKey.includes('zbaraz') || normKey.includes('kopycz') || normKey.includes('borszcz') || normKey.includes('krzemieniec')) {
        oblast = 'Ternopolskaya oblast';
        ssr = 'USSR';
      } else if (normKey.includes('stanislaw') || normKey.includes('kolomy') || normKey.includes('kalusz') || normKey.includes('horoden') || normKey.includes('sniat') || normKey.includes('nadwor') || normKey.includes('tlumac') || normKey.includes('kosow') || normKey.includes('dolin') || normKey.includes('rohat')) {
        oblast = 'Stanislavskaya oblast';
        ssr = 'USSR';
      } else if (normKey.includes('drohob') || normKey.includes('borys') || normKey.includes('sambor') || normKey.includes('stryj') || normKey.includes('turk')) {
        oblast = 'Drogobychskaya oblast';
        ssr = 'USSR';
      } else if (normKey.includes('lwow') || normKey.includes('zolkiew') || normKey.includes('rawa') || normKey.includes('jawor') || normKey.includes('grodek') || normKey.includes('przemysl') || normKey.includes('sokal') || normKey.includes('lubacz')) {
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
      normKey.includes('jersey') ||
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

  // 3. Fallback con formattazione pulita
  return { name: rawName };
}
