/**
 * Historical Flag Resolver & Verification Engine
 * Implements the Historical Flag Resolution & Verification Protocol (SKILL: historical-flag-resolver)
 *
 * Ensures deterministic, anti-anachronistic resolution of state and war flags, civil flags,
 * and naval ensigns across calendar dates (YYYY-MM-DD) and timeline steps.
 */

export interface FlagValidityWindow {
  valid_from: string; // YYYY-MM-DD
  valid_to: string;   // YYYY-MM-DD
}

export interface FlagAsset {
  file_name: string;
  source_repository: 'Wikimedia Commons' | 'Wikidata' | 'Flags of the World' | 'Constitutional Archive' | 'Local SVG';
  direct_svg_url: string;
  commons_page: string;
  license: string;
}

export interface HistoricalFlagMetadata {
  entity_id: string;
  common_name: string;
  historical_name_at_date: string;
  query_date: string;
  flag_status: 'official' | 'de_facto' | 'civil' | 'war_state';
  flag_category: 'state_and_national' | 'state_war' | 'civil_merchant' | 'transitional';
  validity_window: FlagValidityWindow;
  asset: FlagAsset;
  historical_rationale: string;
  flags_of_the_world_ref: string;
  wikidata_item_id?: string;
}

/**
 * Mapping of app timeline step index (0-18) to canonical calendar date (YYYY-MM-DD)
 */
export const STEP_CHRONOLOGICAL_DATES: Record<number, string> = {
  0: '1936-01-01',  // GEN 1936: Status quo Versailles
  1: '1938-03-12',  // MAR 1938: Anschluss d'Austria
  2: '1938-10-01',  // OTT 1938: Accordo di Monaco e Sudeti
  3: '1939-03-15',  // MAR 1939: Fine della Cecoslovacchia e Memel
  4: '1939-04-07',  // APR 1939: Invasione italiana dell'Albania
  5: '1939-09-01',  // SET 1939: Invasione della Polonia (Scoppio WWII)
  6: '1940-06-22',  // GIU 1940: Armistizio di Compiègne e caduta della Francia
  7: '1940-10-28',  // OTT 1940: Invasione italiana della Grecia
  8: '1941-04-06',  // APR 1941: Operazione 25 e Marita (Balcani e Grecia)
  9: '1941-12-07',  // DIC 1941: Attacco a Pearl Harbor
  10: '1942-08-07', // AGO 1942: Sbarco a Guadalcanal e Battaglia del Caucaso
  11: '1942-11-08', // NOV 1942: Operazione Torch e Sacca di Stalingrado (Urano)
  12: '1943-07-10', // LUG 1943: Sbarco in Sicilia (Husky) e Battaglia di Kursk
  13: '1943-09-08', // SET 1943: Armistizio di Cassibile e proclamazione della RSI
  14: '1944-06-06', // GIU 1944: D-Day in Normandia e Operazione Bagration
  15: '1944-08-25', // AGO 1944: Liberazione di Parigi e Rivolta di Varsavia
  16: '1944-12-16', // DIC 1944: Offensiva delle Ardenne, Budapest e Curlandia
  17: '1945-04-25', // APR 1945: Insurrezione 25 Aprile in Italia, Elbe Day e Berlino
  18: '1945-09-02', // SET 1945: Resa del Giappone USS Missouri e nuovo ordine postbellico
  19: '1947-09-30', // SET 1947: Partizione dell'India, Trattati di Parigi, FTT Trieste, Dottrina Truman
  20: '1947-12-31', // DIC 1947: Controffensiva PCC in Cina, Prima Guerra del Kashmir, Risoluzione ONU 181, RPR Romania, Costituzione Dimitrov Bulgaria, Governo Provvisorio DSE
  21: '1948-06-30', // GIU 1948: Indipendenza di Birmania e Ceylon, Proclamazione di Israele e Prima Tregua ONU, Colpo di Stato di Praga, Rottura Tito-Stalin, Blocco di Berlino e Trizona, Accordo di Renville
  22: '1948-12-31', // DIC 1948: Due Coree (ROK/PRK), Fine Campagna di Liaoshen & Huaihai/Pingjin in Cina, Operazione Polo a Hyderabad, Cessate il Fuoco Kashmir, Yoav/Horev/Hiram, Tutto-Palestina (Gaza), Gerico, Operatie Kraai & PDRI
  23: '1949-06-30', // GIU 1949: Proclamazione RFT/BRD (23 mag), Fine Blocco Berlino (12 mag), Stato del Vietnam (14 giu), Terranova in Canada (31 mar), Irlanda Repubblica (18 apr), Attraversamento Yangtze, Linea Verde & Evacuazione Yogyakarta
  24: '1949-12-31', // DIC 1949: Proclamazione RPC a Pechino (1° ott), Ritiro ROC a Taipei (7 dic), Nascita RDT/DDR (7 ott), Stati Uniti d'Indonesia RIS (27 dic), Costituzione Rep. Pop. Ungherese (20 ago), Fine Guerra Civile Greca (16 ott), Laos & Cambogia Stati Associati, Armistizio Israele-Siria
  25: '1950-06-30', // GIU 1950: Scoppio Guerra di Corea (Caduta di Seul 28 giu), Repubblica dell'India (26 gen), AFIS in Somalia (1° apr), Annessione Giordana della Cisgiordania (24 apr), Presa RPC di Hainan/Zhoushan/Xichang, Centralizzazione RIS & Insurrezione RMS ad Ambon, Bandiera Malesia a 11 strisce (26 mag)
  26: '1950-12-31', // DIC 1950: Controffensiva PVA in Corea al 38° Parallelo & Comando ONU (UNC), Stato Unitario Repubblica d'Indonesia (17 ago), Disfatta Francese sulla RC4 in Vietnam, Battaglia di Chamdo in Tibet & Risoluzione ONU 390 A(V) sull'Eritrea
};

/**
 * Builds direct raw Wikimedia Commons file path
 */
export function buildWikimediaCommonsSvgUrl(fileName: string): string {
  const cleanName = fileName.replace(/\s+/g, '_');
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(cleanName)}`;
}

export function buildWikimediaCommonsPageUrl(fileName: string): string {
  const cleanName = fileName.replace(/\s+/g, '_');
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(cleanName)}`;
}

/**
 * Check if a date string is chronologically between valid_from and valid_to (inclusive)
 */
export function isDateInWindow(dateStr: string, from: string, to: string): boolean {
  return dateStr >= from && dateStr <= to;
}

export function getStepExactDate(step: number): string {
  return STEP_CHRONOLOGICAL_DATES[step] || '1939-09-01';
}

interface FlagDefinition {
  entity_id: string;
  match_codes: string[];
  common_name: string;
  historical_name: string;
  valid_from: string;
  valid_to: string;
  flag_status: 'official' | 'de_facto' | 'civil' | 'war_state';
  flag_category: 'state_and_national' | 'state_war' | 'civil_merchant' | 'transitional';
  file_name: string;
  wikidata_item_id?: string;
  license: string;
  historical_rationale: string;
  fotw_url: string;
}

/**
 * Registry of authoritative historical flags with temporal validity windows
 */
const HISTORICAL_FLAG_REGISTRY: FlagDefinition[] = [
  // ITALIA
  {
    entity_id: 'ITA_MONARCHY',
    match_codes: ['ITA', 'IT', 'ITALIA', 'REGNO_D_ITALIA', 'REGNO_DITALIA'],
    common_name: "Regno d'Italia",
    historical_name: "Regno d'Italia (Monarchia Sabauda)",
    valid_from: '1861-03-17',
    valid_to: '1946-06-18',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Italy_(1861-1946).svg',
    wikidata_item_id: 'Q172579',
    license: 'Public Domain',
    historical_rationale: "Tricolore verde, bianco e rosso con stemma sabaudo sormontato dalla corona reale, istituito con la proclamazione del Regno d'Italia e mantenuto fino al Decreto Presidenziale del 19 giugno 1946.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/it-hist.html',
  },
  {
    entity_id: 'IT_1947',
    match_codes: ['ITA_REP', 'IT_REP', 'REPUBBLICA_ITALIANA', 'ITA', 'IT', 'ITALIA'],
    common_name: 'Repubblica Italiana',
    historical_name: 'Repubblica Italiana',
    valid_from: '1946-06-19',
    valid_to: '2003-01-16',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Italy_(1946–2003).svg',
    wikidata_item_id: 'Q38',
    license: 'Public Domain',
    historical_rationale: "Tricolore repubblicano a bande verticali privo dello stemma sabaudo, introdotto con Decreto Presidenziale del 19 giugno 1946 a seguito dell'esito del referendum del 2 giugno e confermato dall'Art. 12 della Costituzione del 1947.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/it-hist.html',
  },
  {
    entity_id: 'RSI_1943_PROVISIONAL',
    match_codes: ['RSI', 'REPUBBLICA_SOCIALE_ITALIANA', 'SALO'],
    common_name: 'Repubblica Sociale Italiana (Fase Costitutiva)',
    historical_name: 'Repubblica Sociale Italiana (Proclamazione di settembre 1943 — Tricolore privo di stemma sabaudo)',
    valid_from: '1943-09-08',
    valid_to: '1944-01-27',
    flag_status: 'de_facto',
    flag_category: 'transitional',
    file_name: 'Flag_of_Italy.svg',
    wikidata_item_id: 'Q153660',
    license: 'Public Domain',
    historical_rationale: "Alla proclamazione della Repubblica Sociale Italiana nel settembre 1943 e nei primi mesi del governo di Salò fu impiegato il tricolore nazionale privo dello scudo sabaudo, prima del D.Lgs. n. 141 del 28 gennaio 1944 che istituì l'aquila repubblicana.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/it_rsi.html',
  },
  {
    entity_id: 'RSI',
    match_codes: ['RSI', 'REPUBBLICA_SOCIALE_ITALIANA', 'SALO'],
    common_name: 'Repubblica Sociale Italiana',
    historical_name: 'Repubblica Sociale Italiana (RSI — Governo di Salò)',
    valid_from: '1944-01-28',
    valid_to: '1945-04-25',
    flag_status: 'official',
    flag_category: 'state_war',
    file_name: 'Flag_of_the_Italian_Social_Republic.svg',
    wikidata_item_id: 'Q153660',
    license: 'Public Domain',
    historical_rationale: "Tricolore con aquila repubblicana nera rostrata ad ali spiegate che ghermisce il fascio repubblicano orizzontale, formalizzato dal Decreto Legislativo del Duce n. 141 del 28 gennaio 1944 come bandiera di combattimento delle Forze Armate Repubblicane.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/it_rsi.html',
  },
  {
    entity_id: 'OZAV_OZAK_REICH',
    match_codes: ['OZAV', 'OZAK', 'ALPENVORLAND', 'ADRIATISCHES_KUSTENLAND', 'OPERATIONSZONE_ALPENVORLAND', 'OPERATIONSZONE_ADRIATISCHES_KUSTENLAND'],
    common_name: "Zone d'Operazione Tedesche in Italia (OZAV / OZAK)",
    historical_name: 'Operationszonen Alpenvorland & Adriatisches Küstenland (Deutsches Reich)',
    valid_from: '1943-09-08',
    valid_to: '1945-05-08',
    flag_status: 'de_facto',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Germany_(1935–1945).svg',
    wikidata_item_id: 'Q7318',
    license: 'Public Domain',
    historical_rationale: "Le province nord-orientali sottratte alla RSI con le ordinanze del 10 settembre 1943 (OZAV sotto Franz Hofer e OZAK sotto Friedrich Rainer) dipesero direttamente dai commissari supremi nazionalsocialisti del Grande Reich.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/de1935.html',
  },

  // GERMANIA
  {
    entity_id: 'GER_REICH',
    match_codes: ['GER', 'DE', 'DEUTSCHES_REICH', 'GERMANY', 'NAZI_GERMANY'],
    common_name: 'Deutsches Reich',
    historical_name: 'Deutsches Reich (1935–1945)',
    valid_from: '1935-09-15',
    valid_to: '1945-05-08',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Germany_(1935–1945).svg',
    wikidata_item_id: 'Q7318',
    license: 'Public Domain',
    historical_rationale: "Drappo rosso con disco bianco e svastica nera (Hakenkreuzfahne) ruotata di 45 gradi e decentrata verso l'asta, istituita dal Reichsflaggengesetz del 15 settembre 1935 come unica bandiera nazionale del Reich tedesco fino alla capitolazione dell'8 maggio 1945.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/de1935.html',
  },
  {
    entity_id: 'GER_ALLIED_CONTROL',
    match_codes: ['ACC', 'ALLIED_CONTROL_COUNCIL', 'GER_1945', 'GER_OCCUPIED', 'ALLIIERTER_KONTROLLRAT', 'GER', 'DE', 'GERMANY'],
    common_name: 'Germania (Consiglio di Controllo Alleato)',
    historical_name: 'Alliierter Kontrollrat (Germania Occupata 1945–1949)',
    valid_from: '1945-05-09',
    valid_to: '1949-05-23',
    flag_status: 'official',
    flag_category: 'civil_merchant',
    file_name: 'Merchant_flag_of_Germany_(1946–1949).svg',
    wikidata_item_id: 'Q151414',
    license: 'Public Domain',
    historical_rationale: "Gagliardetto marittimo C-Pennant (C-Doppelstander) a coda di rondine con 5 bande orizzontali blu-bianco-rosso-bianco-blu (bandiera Charlie del Codice Internazionale dei Segnali), istituito dalla Legge n. 39 del Consiglio di Controllo Alleato come unica insegna legale per evitare l'uso di simboli nazisti prima della nascita della RFT e della RDT.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/de1945.html',
  },

  // STATI UNITI D'AMERICA
  {
    entity_id: 'USA_48',
    match_codes: ['USA', 'US', 'UNITED_STATES', 'AMERICA'],
    common_name: 'Stati Uniti d\'America',
    historical_name: 'United States of America (48-Star Flag)',
    valid_from: '1912-07-04',
    valid_to: '1959-07-03',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_United_States_(1912-1959).svg',
    wikidata_item_id: 'Q30',
    license: 'Public Domain',
    historical_rationale: "Bandiera a stelle e strisce con cantone blu contenente esattamente 48 stelle bianche a cinque punte ordinate in griglia 6x8 (a seguito dell'ammissione dell'Arizona nel 1912). Rimasta in vigore per tutta la Seconda Guerra Mondiale fino all'ingresso di Alaska e Hawaii nel 1959.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/us-1912.html',
  },

  // UNIONE SOVIETICA
  {
    entity_id: 'SOV_1936',
    match_codes: ['SOV', 'USSR', 'SSSR', 'SOVIET_UNION', 'URSS'],
    common_name: 'Unione Sovietica',
    historical_name: 'Unione delle Repubbliche Socialiste Sovietiche (Costituzione 1936)',
    valid_from: '1936-12-05',
    valid_to: '1955-08-19',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Soviet_Union_(1936-1955).svg',
    wikidata_item_id: 'Q15180',
    license: 'Public Domain',
    historical_rationale: "Drappo rosso con stella rossa a cinque punte bordata d'oro sopra la falce e martello incrociati nel cantone superiore, conformata all'Art. 144 della Costituzione Sovietica del 1936 con la curvatura araldica classica di epoca staliniana.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/su.html',
  },

  // GIAPPONE
  {
    entity_id: 'JAP_EMPIRE',
    match_codes: ['JAP', 'JP', 'JAPAN', 'DAI_NIPPON_TEIKOKU'],
    common_name: 'Impero del Giappone',
    historical_name: 'Dai Nippon Teikoku (Impero del Grande Giappone)',
    valid_from: '1870-02-27',
    valid_to: '1945-09-02',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Japan.svg',
    wikidata_item_id: 'Q188712',
    license: 'Public Domain',
    historical_rationale: "Nisshōki (disco solare rosso Hi no Maru su campo bianco) bandiera di stato e nazionale dell'Impero del Giappone, affiancata dalla Kyokujitsuki (insegna navale a 16 raggi) della Marina Imperiale Giapponese.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/jp.html',
  },
  {
    entity_id: 'JAP_SCAP',
    match_codes: ['JAP', 'JP', 'JAPAN', 'JAP_OCCUPIED', 'JAP_1945', 'SCAP_JAPAN'],
    common_name: 'Giappone (Occupazione Alleata SCAP)',
    historical_name: 'Occupazione Alleata del Giappone — SCAP (Douglas MacArthur)',
    valid_from: '1945-09-03',
    valid_to: '1952-04-28',
    flag_status: 'de_facto',
    flag_category: 'transitional',
    file_name: 'Flag_of_Japan.svg',
    wikidata_item_id: 'Q207869',
    license: 'Public Domain',
    historical_rationale: "Giappone metropolitano sotto l'autorità suprema del Comandante Supremo delle Potenze Alleate (SCAP). L'esposizione del Nisshōki fu inizialmente contingentata e le imbarcazioni mercantili utilizzarono la bandiera modificata SCAJAP (pennone E modificato) fino al Trattato di San Francisco.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/jp_scap.html',
  },

  // REGNO UNITO
  {
    entity_id: 'UK_UNION_JACK',
    match_codes: ['UK', 'GB', 'BRITAIN', 'UNITED_KINGDOM', 'GREAT_BRITAIN'],
    common_name: 'Regno Unito',
    historical_name: 'United Kingdom of Great Britain and Northern Ireland',
    valid_from: '1801-01-01',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_United_Kingdom.svg',
    wikidata_item_id: 'Q145',
    license: 'Public Domain',
    historical_rationale: "Union Flag (Union Jack) combinante le croci di San Giorgio (Inghilterra), Sant'Andrea (Scozia) e San Patrizio (Irlanda), immutata dal 1801.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/gb.html',
  },

  // FRANCIA
  {
    entity_id: 'FRA_THIRD_REP',
    match_codes: ['FRA', 'FR', 'FRANCE', 'TROISIEME_REPUBLIQUE'],
    common_name: 'Repubblica Francese',
    historical_name: 'Troisième République Française',
    valid_from: '1870-09-04',
    valid_to: '1940-06-22',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_France.svg',
    wikidata_item_id: 'Q7080',
    license: 'Public Domain',
    historical_rationale: "Tricolore blu, bianco e rosso della Terza Repubblica Francese, adottato nel 1870 e rimasto in vigore fino all'armistizio di Compiègne del 22 giugno 1940.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/fr.html',
  },
  {
    entity_id: 'VIC_FRANCE',
    match_codes: ['VIC', 'VICHY', 'ETAT_FRANCAIS', 'VIC_AOF', 'VIC_MAD', 'VIC_COL'],
    common_name: 'Stato Francese (Vichy)',
    historical_name: 'État Français (Régime de Vichy — Maréchal Pétain)',
    valid_from: '1940-06-22',
    valid_to: '1944-08-25',
    flag_status: 'official',
    flag_category: 'state_war',
    file_name: 'Flag_of_Vichy_France.svg',
    wikidata_item_id: 'Q69808',
    license: 'Public Domain',
    historical_rationale: "Tricolore francese con al centro l'insegna personale del Capo dello Stato Philippe Pétain: ascia bipenne gallica (Francisque) a lame smaltate tricolori con manico a bastone da Maresciallo di Francia ornato da 7 stelle dorate.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/fr_vichy.html',
  },
  {
    entity_id: 'FFL_FRANCE',
    match_codes: ['FFL', 'FRANCE_LIBRE', 'FFL_AEF', 'GPRF'],
    common_name: 'Francia Libera',
    historical_name: 'France Libre / Forces Françaises Libres (Général De Gaulle)',
    valid_from: '1940-07-01',
    valid_to: '1944-08-25',
    flag_status: 'official',
    flag_category: 'state_war',
    file_name: 'Flag_of_Free_France_(1940-1944).svg',
    wikidata_item_id: 'Q151198',
    license: 'Public Domain',
    historical_rationale: "Tricolore francese caricato al centro della striscia bianca con la Croce di Lorena rossa a due bracci, istituita dal Viceammiraglio Émile Muselier il 3 luglio 1940 come simbolo di combattimento contro la croce uncinata nazista.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/fr_ffl.html',
  },
  {
    entity_id: 'FRA_FOURTH_REP',
    match_codes: ['FRA', 'FR', 'FRANCE', 'GPRF', 'QUATRIEME_REPUBLIQUE', 'FOURTH_REPUBLIC', 'F_NAF', 'F_AOF', 'FFL_AEF'],
    common_name: 'Repubblica Francese',
    historical_name: 'GPRF / Quatrième République Française (Union Française)',
    valid_from: '1944-08-26',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_France.svg',
    wikidata_item_id: 'Q69829',
    license: 'Public Domain',
    historical_rationale: "Con la Liberazione di Parigi (25 agosto 1944), il Governo Provvisorio (GPRF) e poi la Quarta Repubblica Francese (Costituzione del 27 ottobre 1946) ripristinano ufficialmente il Tricolore repubblicano blu-bianco-rosso privo della Croce di Lorena per tutta la Repubblica e l'Union Française.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/fr.html',
  },

  // JUGOSLAVIA
  {
    entity_id: 'YUG_KINGDOM',
    match_codes: ['YUG', 'KRALJEVINA_JUGOSLAVIJA', 'YUGOSLAVIA'],
    common_name: 'Regno di Jugoslavia',
    historical_name: 'Kraljevina Jugoslavija (Regno dei Serbi, Croati e Sloveni / Jugoslavia)',
    valid_from: '1918-12-01',
    valid_to: '1941-04-17',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Kingdom_of_Yugoslavia.svg',
    wikidata_item_id: 'Q191077',
    license: 'Public Domain',
    historical_rationale: "Tricolore orizzontale panslavo blu, bianco e rosso senza emblemi centrali per l'uso civile, con stemma regio delle tre tribù jugoslave per l'uso di stato.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/yu_shs.html',
  },
  {
    entity_id: 'DFJ',
    match_codes: ['DFJ', 'DEMOKRATSKA_FEDERATIVNA_JUGOSLAVIJA', 'TITO_JUGOSLAVIA'],
    common_name: 'Jugoslavia Federale Democratica',
    historical_name: 'Demokratska Federativna Jugoslavija (DFJ — Maresciallo Tito)',
    valid_from: '1943-11-29',
    valid_to: '1945-11-29',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Democratic_Federal_Yugoslavia.svg',
    wikidata_item_id: 'Q1668884',
    license: 'Public Domain',
    historical_rationale: "Tricolore panslavo blu-bianco-rosso caricato al centro della grande stella rossa partigiana a cinque punte bordata d'oro (proclamata alla II Sessione dell'AVNOJ a Jajce nel novembre 1943 e ratificata dal governo Tito-Šubašić).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/yu_dfj.html',
  },
  {
    entity_id: 'FNRJ',
    match_codes: [
      'FNRJ',
      'SFRJ',
      'DFJ',
      'YUG',
      'JUGOSLAVIA',
      'YUGOSLAVIA',
      'FEDERATIVE_PEOPLES_REPUBLIC_OF_YUGOSLAVIA',
      'REPUBBLICA_FEDERATIVA_POPOLARE_DI_JUGOSLAVIA',
      'REPUBBLICA_SOCIALISTA_FEDERALE_DI_JUGOSLAVIA',
    ],
    common_name: 'Repubblica Federativa Popolare di Jugoslavia',
    historical_name: 'Federativna Narodna Republika Jugoslavija (FNRJ — Maresciallo Tito)',
    valid_from: '1945-11-29',
    valid_to: '1992-04-27',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Yugoslavia_(1946-1992).svg',
    wikidata_item_id: 'Q83286',
    license: 'Public Domain',
    historical_rationale: "Tricolore panslavo blu, bianco e rosso caricato al centro della grande stella rossa a cinque punte bordata d'oro che si estende nelle fasce blu e rossa, adottata ufficialmente con la Costituzione della FNRJ del 31 gennaio 1946.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/yu_fed.html',
  },
  {
    entity_id: 'VUJA_TLT_B',
    match_codes: ['VUJA', 'VUJA_FTT', 'TLT_B', 'FTT_B', 'STT_B', 'ZONA_B_TLT'],
    common_name: 'Territorio Libero di Trieste — Zona B (VUJA)',
    historical_name: 'Zona B del Territorio Libero di Trieste (Vojna Uprava Jugoslovenske Armije)',
    valid_from: '1947-09-15',
    valid_to: '1954-10-26',
    flag_status: 'de_facto',
    flag_category: 'transitional',
    file_name: 'Flag_of_Yugoslavia_(1946-1992).svg',
    wikidata_item_id: 'Q83286',
    license: 'Public Domain',
    historical_rationale: "La Zona B del TLT (Capodistria e Buie), posta sotto amministrazione militare dell'Armata Popolare Jugoslava (VUJA) ai sensi dell'Allegato VII del Trattato di Parigi del 1947, non ebbe mai una propria bandiera territoriale separata né adottò l'alabarda rossa triestina della Zona A: sugli edifici pubblici e doganali veniva esposta de facto la bandiera ufficiale della FNRJ.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/yu_fed.html',
  },

  // SPAGNA
  {
    entity_id: 'SPR',
    match_codes: ['SPR', 'SEGUNDA_REPUBLICA', 'REPUBLICA_ESPANOLA'],
    common_name: 'Repubblica Spagnola',
    historical_name: 'Segunda República Española (Governo del Fronte Popolare)',
    valid_from: '1931-04-14',
    valid_to: '1939-04-01',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Second_Spanish_Republic.svg',
    wikidata_item_id: 'Q8828',
    license: 'Public Domain',
    historical_rationale: "Tricolore orizzontale rosso, giallo e porpora (viola) caricato dello stemma murale repubblicano privo di corona reale, adottato il 27 aprile 1931 dalla Seconda Repubblica Spagnola.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/es_rep.html',
  },
  {
    entity_id: 'SPA',
    match_codes: ['SPA', 'ESPANA_FRANQUISTA', 'ESTADO_ESPANOL'],
    common_name: 'Spagna Franchista',
    historical_name: 'Estado Español (Bando Nacional / Generalísimo Franco)',
    valid_from: '1938-02-02',
    valid_to: '1945-10-11',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Spain_(1938–1945).svg',
    wikidata_item_id: 'Q171416',
    license: 'Public Domain',
    historical_rationale: "Bicolore rosso-giallo-rosso caricato dell'Águila de San Juan nera con motto 'Una Grande Libre', fascio di frecce e giogo dei Re Cattolici e Colonne d'Ercole, formalizzata dal Decreto di Burgos del 2 febbraio 1938.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/es1938.html',
  },
  {
    entity_id: 'SPA_1945',
    match_codes: ['SPA', 'ESPANA_FRANQUISTA', 'ESTADO_ESPANOL', 'ESP', 'ES'],
    common_name: 'Spagna (Estado Español)',
    historical_name: 'Estado Español (Regime Franchista — Decreto dell\'11 Ottobre 1945)',
    valid_from: '1945-10-12',
    valid_to: '1977-01-20',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Spain_(1945–1977).svg',
    wikidata_item_id: 'Q171416',
    license: 'Public Domain',
    historical_rationale: "Regolamento sulle bandiere emanato l'11 ottobre 1945 dall'Estado Español: stemma dell'Aquila di San Giovanni stilizzato e centrato sulla fascia gialla senza modifiche cromatiche alla 'Rojigualda', rimasto ufficiale fino al 1977.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/es1945.html',
  },

  // VIETNAM
  {
    entity_id: 'VIE_DRV',
    match_codes: ['VIE', 'DRV', 'VIET_MINH', 'DEMOCRATIC_REPUBLIC_VIETNAM'],
    common_name: 'Repubblica Democratica del Vietnam',
    historical_name: 'Việt Nam Dân chủ Cộng hòa (Hồ Chí Minh — 1945)',
    valid_from: '1945-09-02',
    valid_to: '1955-11-30',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_North_Vietnam_(1945-1955).svg',
    wikidata_item_id: 'Q172640',
    license: 'Public Domain',
    historical_rationale: "Drappo rosso con al centro la grande stella dorata a cinque punte a braccia piene e spesse, adottata solennemente ad Hanoi il 2 settembre 1945 con la Proclamazione d'Indipendenza da Hồ Chí Minh.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/vn-hist.html',
  },
  {
    entity_id: 'PHL_COMMONWEALTH',
    match_codes: ['PHL', 'PH', 'PHI', 'PHILIPPINES', 'FILIPPINE', 'COMMONWEALTH_OF_THE_PHILIPPINES'],
    common_name: 'Commonwealth delle Filippine',
    historical_name: 'Commonwealth of the Philippines (Sergio Osmeña — 1935–1946)',
    valid_from: '1935-11-15',
    valid_to: '1946-07-03',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Philippines_(1936–1985,_1986–1998).svg',
    wikidata_item_id: 'Q1467198',
    license: 'Public Domain',
    historical_rationale: "Bandiera del Commonwealth delle Filippine associato agli USA (blu marino scuro nella fascia superiore, codificata con l'Ordine Esecutivo n. 23 del 25 marzo 1936), restaurata nel 1945 fino all'indipendenza del 4 luglio 1946.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ph-hist.html',
  },
  {
    entity_id: 'PHL_REP',
    match_codes: ['PHL', 'PH', 'PHI', 'PHILIPPINES', 'FILIPPINE', 'REPUBLIC_OF_THE_PHILIPPINES'],
    common_name: 'Repubblica delle Filippine',
    historical_name: 'Republika ng Pilipinas (Terza Repubblica — Manuel Roxas, 4 Luglio 1946)',
    valid_from: '1946-07-04',
    valid_to: '1985-02-25',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Philippines.svg',
    wikidata_item_id: 'Q134627',
    license: 'Public Domain',
    historical_rationale: "Bandiera nazionale e di stato della Repubblica indipendente delle Filippine con triangolo bianco all'asta, sole aureo a otto raggi e tre stelle dorate, banda superiore blu e inferiore rossa, in vigore dal giorno dell'indipendenza (4 luglio 1946).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ph.html',
  },

  // INDONESIA
  {
    entity_id: 'IDN_REP',
    match_codes: ['IDN', 'INDONESIA', 'REPUBLIK_INDONESIA'],
    common_name: 'Repubblica d\'Indonesia',
    historical_name: 'Republik Indonesia (Sukarno-Hatta — 17 Agosto 1945)',
    valid_from: '1945-08-17',
    valid_to: '1949-12-26',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Indonesia.svg',
    wikidata_item_id: 'Q252',
    license: 'Public Domain',
    historical_rationale: "Sang Saka Merah-Putih (bicolore rosso e bianco) cucita da Fatmawati Sukarno e issata a Giacarta il 17 agosto 1945 alla proclamazione d'indipendenza, richiamante i vessilli dell'antico Impero Majapahit.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/id.html',
  },

  // CINA
  {
    entity_id: 'CHI_ROC',
    match_codes: ['CHI', 'ROC', 'CHINA', 'REPUBLIC_OF_CHINA', 'KUOMINTANG'],
    common_name: 'Repubblica di Cina',
    historical_name: 'Zhonghua Minguo (Repubblica di Cina — Governo Nazionalista di Chiang Kai-shek)',
    valid_from: '1928-10-08',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Republic_of_China.svg',
    wikidata_item_id: 'Q13426199',
    license: 'Public Domain',
    historical_rationale: "Cielo blu con un sole bianco a dodici raggi nel cantone superiore su campo interamente rosso (Qingtian Bairi Manshidihong), bandiera ufficiale della Repubblica di Cina.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/tw.html',
  },
  {
    entity_id: 'CCP_CHI',
    match_codes: ['CCP', 'CCP_CHI', 'CHINESE_SOVIET_REPUBLIC', 'YANAN'],
    common_name: 'Partito Comunista Cinese (Yan\'an)',
    historical_name: 'Regione Autonoma Shaan-Gan-Ning & 8ª Armata di Strada (PCC — Mao Zedong)',
    valid_from: '1931-11-07',
    valid_to: '1949-09-30',
    flag_status: 'official',
    flag_category: 'state_war',
    file_name: 'Flag_of_the_Chinese_Soviet_Republic.svg',
    wikidata_item_id: 'Q736936',
    license: 'Public Domain',
    historical_rationale: "Drappo rosso con stella gialla a cinque punte nel cantone caricata della falce e martello incrociati, insegna dell'Armata Rossa Cinese e delle Basi Rosse di Yan'an fino alla fondazione della RPC nel 1949.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/cn-sov.html',
  },

  // ISLANDA
  {
    entity_id: 'ICE_KINGDOM',
    match_codes: ['ICE', 'IS', 'ICELAND', 'ICE_K', 'KINGDOM_OF_ICELAND'],
    common_name: 'Regno d\'Islanda',
    historical_name: 'Konungsríkið Ísland (Regno d\'Islanda in unione personale con la Corona danese)',
    valid_from: '1918-12-01',
    valid_to: '1944-06-16',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Iceland_(1918–1944).svg',
    wikidata_item_id: 'Q1393',
    license: 'Public Domain',
    historical_rationale: "Croce scandinava rossa bordata di bianco su campo azzurro cielo (ultramarine sky-blue), con tonalità celeste più chiara rispetto alla bandiera repubblicana post-1944.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/is-hist.html',
  },
  {
    entity_id: 'ICE_REP',
    match_codes: ['ICE', 'IS', 'ICELAND', 'REPUBLIC_OF_ICELAND', 'LYDVELDID_ISLAND'],
    common_name: 'Repubblica d\'Islanda',
    historical_name: 'Lýðveldið Ísland (Repubblica d\'Islanda — Proclamazione di Þingvellir)',
    valid_from: '1944-06-17',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Iceland.svg',
    wikidata_item_id: 'Q189',
    license: 'Public Domain',
    historical_rationale: "Croce scandinava rossa bordata di bianco su campo blu scuro oceanico, formalizzata il 17 giugno 1944 con la proclamazione della Repubblica e la rescissione del trattato con la Danimarca.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/is.html',
  },

  // TRIESTE (GOVERNO MILITARE ALLEATO / MORGAN LINE)
  {
    entity_id: 'AMG_TRIESTE',
    match_codes: ['AMG', 'AMG_VG', 'AMG_FTT', 'TRIESTE_ZONE_A', 'TLT', 'FTT', 'STO', 'TERRITORIO_LIBERO_DI_TRIESTE', 'FREE_TERRITORY_OF_TRIESTE'],
    common_name: 'Governo Militare Alleato (Zona A — Trieste)',
    historical_name: 'Allied Military Government Free Territory of Trieste (Zona A — AMG-FTT)',
    valid_from: '1945-06-09',
    valid_to: '1954-10-26',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Free_Territory_of_Trieste.svg',
    wikidata_item_id: 'Q378772',
    license: 'Public Domain',
    historical_rationale: "Alabarda bianca gigliata di San Sergio in campo rosso vermiglio, stemma civico millenario di Trieste elevato a bandiera ufficiale del Territorio Libero di Trieste sotto amministrazione alleata.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/it-ts-ft.html',
  },

  // DOMINION DEL PAKISTAN (1947)
  {
    entity_id: 'PAK',
    match_codes: ['PAK', 'PK', 'PAKISTAN', 'DOMINION_OF_PAKISTAN'],
    common_name: 'Pakistan',
    historical_name: 'Dominion del Pakistan (Dominion of Pakistan)',
    valid_from: '1947-08-14',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Pakistan.svg',
    wikidata_item_id: 'Q843',
    license: 'Public Domain',
    historical_rationale: "Drappo verde scuro con crescente di luna e stella a cinque punte bianca, con una striscia bianca verticale all'asta a simboleggiare le minoranze religiose, disegnato da Amiruddin Kidwai e adottato dall'Assemblea Costituente dell'11 agosto 1947 con entrata in vigore il 14 agosto 1947.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/pk.html',
  },

  // DOMINION DELL'INDIA (1947–1950)
  {
    entity_id: 'IND',
    match_codes: ['IND', 'IN', 'INDIA', 'DOMINION_OF_INDIA', 'INDIAN_UNION', 'UNIONE_INDIANA'],
    common_name: 'India',
    historical_name: 'Dominion dell\'India (Tiranga)',
    valid_from: '1947-07-22',
    valid_to: '1950-01-25',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_India.svg',
    wikidata_item_id: 'Q668',
    license: 'Public Domain',
    historical_rationale: "Tricolore orizzontale zafferano, bianco e verde con al centro la ruota della legge (Ashoka Chakra) a 24 raggi in blu marino, adottato dall'Assemblea Costituente il 22 luglio 1947 e divenuto la bandiera ufficiale del Dominion dell'India il 15 agosto 1947.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/in.html',
  },

  // REPUBBLICA DELL'INDIA (26 gennaio 1950)
  {
    entity_id: 'IND_REP_1950',
    match_codes: ['IND', 'IN', 'INDIA', 'REPUBLIC_OF_INDIA', 'REPUBBLICA_DELL_INDIA', 'BHARAT'],
    common_name: 'Repubblica dell\'India',
    historical_name: 'Republic of India / Bhārat Gaṇarājya (Tiranga — Costituzione del 26 Gennaio 1950)',
    valid_from: '1950-01-26',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_India.svg',
    wikidata_item_id: 'Q668',
    license: 'Public Domain',
    historical_rationale: "Con l'entrata in vigore della Costituzione il 26 gennaio 1950, la Tiranga (zafferano intenso #FF9933, bianco e verde con Ashoka Chakra blu navy a 24 raggi) viene confermata quale bandiera nazionale della sovrana Repubblica dell'India (Presidente Rajendra Prasad).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/in.html',
  },

  // STATO PRINCIPESCO DI HYDERABAD (1724-1948)
  {
    entity_id: 'HYD',
    match_codes: ['HYD', 'HYDERABAD', 'NIZAM'],
    common_name: 'Hyderabad',
    historical_name: 'Stato Principesco di Hyderabad (Asaf Jahi)',
    valid_from: '1724-01-01',
    valid_to: '1948-09-17',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Asafia_flag_of_Hyderabad_State.svg',
    wikidata_item_id: 'Q1248037',
    license: 'Public Domain',
    historical_rationale: "Insegna di stato Asafia dei Nizam di Hyderabad con campo giallo oro, bande verdi e bianche e scudo Asaf Jahi, in uso fino all'annessione militare indiana (Operazione Polo) nel settembre 1948.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/in-hyd.html',
  },

  // STATO PRINCIPESCO DI JAMMU E KASHMIR (1846-1952)
  {
    entity_id: 'KAS',
    match_codes: ['KAS', 'KASHMIR', 'JAMMU_KASHMIR'],
    common_name: 'Jammu e Kashmir',
    historical_name: 'Stato Principesco di Jammu e Kashmir',
    valid_from: '1846-03-16',
    valid_to: '1952-11-17',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Jammu_and_Kashmir_(1936-1953).svg',
    wikidata_item_id: 'Q118544',
    license: 'Public Domain',
    historical_rationale: "Bandiera di stato del Principato di Jammu e Kashmir (1936–1953) con drappo rosso cremisi, tre strisce verticali bianche all'asta e aratro bianco al centro sotto il Maharaja Hari Singh.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/in-jk.html',
  },

  // PROTETTORATO DELLA SAAR (1947-1956)
  {
    entity_id: 'SAAR',
    match_codes: ['SAAR', 'SAARLAND', 'PROTECTORATE_OF_THE_SAAR'],
    common_name: 'Protettorato della Saar',
    historical_name: 'Protettorato della Saar (Saarland 1947–1956)',
    valid_from: '1947-06-06',
    valid_to: '1956-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Saar_(1947–1956).svg',
    wikidata_item_id: 'Q83011',
    license: 'Public Domain',
    historical_rationale: "Croce scandinava bianca su drappo 2:3 con i due quarti all'asta in blu e i due quarti al battente in rosso, a simboleggiare i colori della Francia tutelare combinati con la croce tradizionale della Saar (adottata ufficialmente con la Costituzione del 15 dicembre 1947 ed entrata in uso de facto sin dalla separazione economica dell'estate 1947).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/de-sa_hi.html',
  },

  // REGNO HASCEMITA DI TRANSGIORDANIA
  {
    entity_id: 'JOR',
    match_codes: ['JOR', 'TRANSJORDAN', 'JORDAN', 'HASHEMITE_KINGDOM_OF_TRANSJORDAN'],
    common_name: 'Transgiordania',
    historical_name: 'Regno Hascemita di Transgiordania',
    valid_from: '1928-04-16',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Jordan.svg',
    wikidata_item_id: 'Q810',
    license: 'Public Domain',
    historical_rationale: "Bandiera a tre bande orizzontali nera, bianca e verde con triangolo rosso all'asta caricato di una stella bianca a sette punte a simboleggiare i sette versetti della prima sura del Corano.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/jo.html',
  },
  // AFRICA & MEDIO ORIENTE (1936–1947)
  {
    entity_id: 'EGY',
    match_codes: ['EGY', 'EG', 'EGYPT', 'EGITTO'],
    common_name: "Regno d'Egitto",
    historical_name: "Al-Mamlakah al-Miṣriyyah (Regno d'Egitto)",
    valid_from: '1923-12-10',
    valid_to: '1958-02-22',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Egypt_(1922-1958).svg',
    wikidata_item_id: 'Q124943',
    license: 'Public Domain',
    historical_rationale: "Drappo verde reale con mezzaluna bianca e tre stelle bianche a cinque punte rappresentanti le regioni storiche di Egitto, Nubia e Sudan (in vigore dal 1923 al 1958).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/eg-1922.html',
  },
  {
    entity_id: 'SYR',
    match_codes: ['SYR', 'SY', 'SYRIA', 'SIRIA'],
    common_name: 'Repubblica Siriana',
    historical_name: 'Repubblica Siriana (Indipendenza)',
    valid_from: '1932-01-01',
    valid_to: '1958-02-22',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Syria_(1930–1958,_1961–1963).svg',
    wikidata_item_id: 'Q858',
    license: 'Public Domain',
    historical_rationale: "Tricolore verde-bianco-nero della Prima Repubblica Siriana adottato dalla Costituzione del 1930 (issato nel 1932) con tre stelle rosse a cinque punte per Damasco, Aleppo e Deir ez-Zor.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/sy-1932.html',
  },
  {
    entity_id: 'LEB',
    match_codes: ['LEB', 'LBN', 'LB', 'LEBANON', 'LIBANO'],
    common_name: 'Repubblica Libanese',
    historical_name: 'Repubblica Libanese (1943)',
    valid_from: '1943-12-07',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Lebanon.svg',
    wikidata_item_id: 'Q822',
    license: 'Public Domain',
    historical_rationale: "Adottata dal Parlamento libanese nel dicembre 1943 dopo la crisi dell'indipendenza: due fasce rosse orizzontali con fascia bianca centrale doppia (1:2:1) caricata del Cedro verde del Libano.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/lb.html',
  },
  {
    entity_id: 'IRQ',
    match_codes: ['IRQ', 'IQ', 'IRAQ', 'IRAK'],
    common_name: "Regno dell'Iraq",
    historical_name: "Al-Mamlakah al-‘Irāqiyyah (Monarchia Hashemita)",
    valid_from: '1924-03-22',
    valid_to: '1959-07-14',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Iraq_(1924–1959).svg',
    wikidata_item_id: 'Q149805',
    license: 'Public Domain',
    historical_rationale: "Bandiera del Regno Hashemita dell'Iraq in vigore dal 1924 al 1959: tricolore panarabo nero-bianco-verde con trapezio rosso all'asta recante due stelle bianche a sette punte.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/iq_1924.html',
  },
  {
    entity_id: 'IRN',
    match_codes: ['IRN', 'IR', 'IRAN', 'PERSIA', 'PER_IR'],
    common_name: "Stato Imperiale dell'Iran",
    historical_name: "Keshvar-e Shāhanshāhi-ye Irān (Dinastia Pahlavi)",
    valid_from: '1933-01-01',
    valid_to: '1964-08-01',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'State_flag_of_Iran_(1933–1964).svg',
    wikidata_item_id: 'Q207991',
    license: 'Public Domain',
    historical_rationale: "Bandiera di Stato dell'Iran Pahlavi (1933–1964): tricolore verde-bianco-rosso allungato con emblema centrale dorato del Leone e del Sole (Shir-o-Khorshid) con scimitarra.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ir-1925.html',
  },
  {
    entity_id: 'SAU',
    match_codes: ['SAU', 'SA', 'SAUDI_ARABIA', 'ARABIA_SAUDITA'],
    common_name: 'Arabia Saudita',
    historical_name: "Regno dell'Arabia Saudita (Abdulaziz Al Saud)",
    valid_from: '1938-03-15',
    valid_to: '1973-03-14',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Saudi_Arabia_(1938–1973).svg',
    wikidata_item_id: 'Q851',
    license: 'Public Domain',
    historical_rationale: "Drappo verde con la Shahada bianca in calligrafia Thuluth e la spada ricurva sottostante nella versione codificata nel 1938 e in uso fino al 1973.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/sa1938.html',
  },
  {
    entity_id: 'YEM',
    match_codes: ['YEM', 'YE', 'YEMEN'],
    common_name: 'Regno Mutawakkilita dello Yemen',
    historical_name: 'Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah',
    valid_from: '1927-01-01',
    valid_to: '1962-09-26',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Mutawakkilite_Kingdom_of_Yemen.svg',
    wikidata_item_id: 'Q193065',
    license: 'Public Domain',
    historical_rationale: "Bandiera ufficiale del Regno Mutawakkilita dell'Imam Yahya (1927–1962): campo rosso intenso con scimitarra bianca orizzontale e cinque stelle bianche a cinque punte.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ye-king.html',
  },
  {
    entity_id: 'ETH',
    match_codes: ['ETH', 'ET', 'ETHIOPIA', 'ABYSSINIA', 'ETIOPIA'],
    common_name: "Impero d'Etiopia",
    historical_name: "Impero d'Etiopia (Negus Hailé Selassié I)",
    valid_from: '1897-10-06',
    valid_to: '1974-09-12',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Ethiopia_(1897–1974).svg',
    wikidata_item_id: 'Q207521',
    license: 'Public Domain',
    historical_rationale: "Tricolore imperiale etiopico verde-giallo-rosso caricato del Leone di Giuda coronato con stendardo crociato, restaurato con il ritorno di Hailé Selassié I (1941) e pienamente confermato al 1947.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/et-imp.html',
  },
  {
    entity_id: 'LBR',
    match_codes: ['LBR', 'LR', 'LIBERIA'],
    common_name: 'Repubblica di Liberia',
    historical_name: 'Republic of Liberia',
    valid_from: '1847-08-24',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Liberia.svg',
    wikidata_item_id: 'Q1014',
    license: 'Public Domain',
    historical_rationale: "Bandiera nazionale della Repubblica di Liberia (11 strisce orizzontali bianco-rosse e cantone blu con stella bianca a cinque punte), ininterrottamente ufficiale dal 1847.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/lr.html',
  },
  {
    entity_id: 'SAF',
    match_codes: ['SAF', 'ZA', 'ZAF', 'SOUTH_AFRICA', 'SUDAFRICA'],
    common_name: 'Unione Sudafricana',
    historical_name: 'Union of South Africa / Unie van Suid-Afrika',
    valid_from: '1928-05-31',
    valid_to: '1994-04-26',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_South_Africa_(1928–1994,_dark_colors).svg',
    wikidata_item_id: 'Q193619',
    license: 'Public Domain',
    historical_rationale: "Prinsenvlag arancio-bianco-blu dell'Unione Sudafricana recante al centro le tre bandiere miniaturizzate dell'Union Jack, dello Stato Libero d'Orange e del Transvaal (ufficiale dal 1928 al 1994).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/za1928.html',
  },
  {
    entity_id: 'TANGER_INT_PREWAR',
    match_codes: ['TANGER', 'TANGIER', 'TANGERI', 'INT_TANGER'],
    common_name: 'Zona Internazionale di Tangeri',
    historical_name: 'Zone Internationale de Tanger (Statuto del 1923)',
    valid_from: '1923-12-18',
    valid_to: '1940-06-13',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Tangier_International_Zone.svg',
    wikidata_item_id: 'Q1138534',
    license: 'Public Domain',
    historical_rationale: "Bandiera della Zona Internazionale di Tangeri (campo rosso con stella verde a cinque punte e stemma civico di Tingis), sostituita dall'occupazione militare spagnola nel giugno 1940.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ma-tng.html',
  },
  {
    entity_id: 'TANGER_SPA_OCC',
    match_codes: ['TANGER', 'TANGIER', 'TANGERI', 'INT_TANGER'],
    common_name: 'Tangeri (Occupazione Spagnola)',
    historical_name: 'Tánger — Zona Ocupada por España',
    valid_from: '1940-06-14',
    valid_to: '1945-10-10',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Spain_(1938–1945).svg',
    wikidata_item_id: 'Q1138534',
    license: 'Public Domain',
    historical_rationale: "Dal 14 giugno 1940 all'11 ottobre 1945 la Zona Internazionale di Tangeri è occupata militarmente dalle truppe dell'Estado Español sotto il governo franchista.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ma-tng.html',
  },
  {
    entity_id: 'TANGER_INT_RESTORED',
    match_codes: ['TANGER', 'TANGIER', 'TANGERI', 'INT_TANGER'],
    common_name: 'Zona Internazionale di Tangeri',
    historical_name: 'Zone Internationale de Tanger (Statuto Restaurato)',
    valid_from: '1945-10-11',
    valid_to: '1956-10-29',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Tangier_International_Zone.svg',
    wikidata_item_id: 'Q1138534',
    license: 'Public Domain',
    historical_rationale: "Con l'evacuazione spagnola dell'11 ottobre 1945 e l'Accordo di Parigi, è ripristinata l'amministrazione internazionale e l'insegna della Zona Internazionale di Tangeri fino all'unificazione marocchina del 1956.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ma-tng.html',
  },

  // THAILANDIA / SIAM
  {
    entity_id: 'SIA_TRAIRANGA',
    match_codes: ['SIA', 'TH', 'THA', 'SIAM', 'THAILAND', 'THAILANDIA'],
    common_name: 'Thailandia / Siam',
    historical_name: 'Ratcha-anachak Thai (Regno di Thailandia)',
    valid_from: '1917-09-28',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Thailand.svg',
    wikidata_item_id: 'Q134885',
    license: 'Public Domain',
    historical_rationale: "Trairanga (Thong Trairong a cinque bande orizzontali rosso-bianco-blu-bianco-rosso), bandiera nazionale e di stato adottata dal Regno del Siam con decreto reale del 28 settembre 1917 e mantenuta senza interruzioni nel periodo bellico e postbellico.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/th.html',
  },

  // PORTOGALLO (e Timor Portoghese / Macao / colonie lusitane)
  {
    entity_id: 'POR_REPUBLIC',
    match_codes: ['POR', 'PRT', 'PT', 'PORTUGAL', 'PORTOGALLO'],
    common_name: 'Portogallo',
    historical_name: 'República Portuguesa (Império Colonial Português)',
    valid_from: '1911-06-30',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Portugal.svg',
    wikidata_item_id: 'Q128812',
    license: 'Public Domain',
    historical_rationale: "Bicolore verde e rosso caricato dello scudo delle cinque quinas e della sfera armillare, adottata ufficialmente dalla Repubblica Portoghese il 30 giugno 1911 e utilizzata nella metropoli e nei possedimenti ultramarini (Timor Português, Macao, Angola, Mozambico).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/pt.html',
  },

  // AUSTRALIA (Commonwealth of Australia & Papua-New Guinea / Nauru)
  {
    entity_id: 'AST_COMMONWEALTH',
    match_codes: ['AST', 'AU', 'AUSTRALIA'],
    common_name: 'Australia',
    historical_name: 'Commonwealth of Australia',
    valid_from: '1908-12-08',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Australia.svg',
    wikidata_item_id: 'Q81676',
    license: 'Public Domain',
    historical_rationale: "Blue Ensign del Commonwealth d'Australia con Union Jack nel cantone, Stella del Commonwealth a sette punte e Croce del Sud, emblema ufficiale nel Pacifico sud-occidentale e sui territori amministrati (Papua, Nuova Guinea, Nauru).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/au.html',
  },

  // GUERRA CIVILE GRECA — ELAS (1942-1945) & DSE (1946-1949)
  {
    entity_id: 'ELAS_1944',
    match_codes: ['ELAS', 'EAM', 'EAM_ELAS', 'DSE', 'PEEA'],
    common_name: 'EAM-ELAS (Grecia)',
    historical_name: 'Esercito Popolare di Liberazione Greco (ELAS — Dekemvriana)',
    valid_from: '1942-02-16',
    valid_to: '1945-02-12',
    flag_status: 'de_facto',
    flag_category: 'state_war',
    file_name: 'ELAS_flag.svg',
    wikidata_item_id: 'Q712257',
    license: 'Public Domain',
    historical_rationale: "Vessillo storico dell'Esercito Popolare di Liberazione Greco (ELAS): croce bianca ellenica in campo blu caricata al centro dalle iniziali 'ΕΛΑΣ', in uso dalla fondazione resistenziale fino allo scioglimento con l'Accordo di Varkiza del 12 febbraio 1945.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/gr%7Delas.html',
  },
  {
    entity_id: 'DSE_1946',
    match_codes: ['DSE', 'DIMOKRATIKOS_STRATOS'],
    common_name: 'Esercito Democratico di Grecia (DSE)',
    historical_name: 'Dimokratikos Stratos Elladas (DSE — "Grecia Libera" / Grammos–Vitsi)',
    valid_from: '1946-10-28',
    valid_to: '1949-10-16',
    flag_status: 'de_facto',
    flag_category: 'state_war',
    file_name: 'Flag_of_the_Democratic_Army_of_Greece.svg',
    wikidata_item_id: 'Q1185950',
    license: 'Public Domain',
    historical_rationale: "Insegna ufficiale dell'Esercito Democratico di Grecia (DSE) istituito il 28 ottobre 1946 dal KKE sotto comando di Markos Vafiadis: croce ellenica bianca su sfondo azzurro caricata al centro dallo stemma Δ (Dimokratia) con triangolo/stella rossa.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/gr-civil.html',
  },

  // SECONDA REPUBBLICA DEL TURKESTAN ORIENTALE (1944-1949)
  {
    entity_id: 'SECOND_ETR',
    match_codes: ['ETR', 'SECOND_ETR', 'EAST_TURKESTAN', 'EAST_TURKISTAN', 'THREE_DISTRICTS', 'TURKESTAN_ORIENTALE'],
    common_name: 'Seconda Repubblica del Turkestan Orientale',
    historical_name: 'Shärqiy Türkistan Jumhuriyiti (Tre Distretti: Ili, Tarbagatay, Altay)',
    valid_from: '1944-11-12',
    valid_to: '1949-12-22',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Second_East_Turkestan_Republic.svg',
    wikidata_item_id: 'Q1049172',
    license: 'Public Domain',
    historical_rationale: "Vessillo ufficiale della Seconda Repubblica del Turkestan Orientale proclamata il 12 novembre 1944 a Ghulja (Yining) nella Rivoluzione dei Tre Distretti (Ili, Tarbagatay e Altay): mezzaluna e stella a cinque punte bianche in campo verde.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/cn-etr2.html',
  },

  // ROMANIA — REGNO DI ROMANIA (fino al 29 dicembre 1947) & REPUBBLICA POPOLARE ROMENA (dal 30 dicembre 1947)
  {
    entity_id: 'ROM_KINGDOM',
    match_codes: ['ROM', 'RO', 'ROU', 'ROMANIA', 'KINGDOM_OF_ROMANIA', 'REGNO_DI_ROMANIA'],
    common_name: 'Regno di Romania',
    historical_name: 'Regatul României (Monarchia Hohenzollern-Sigmaringen)',
    valid_from: '1881-03-26',
    valid_to: '1947-12-29',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Romania.svg',
    wikidata_item_id: 'Q203493',
    license: 'Public Domain',
    historical_rationale: "Tricolore verticale blu, giallo e rosso del Regno di Romania (con stemma reale Hohenzollern-Sigmaringen sull'insegna di Stato), in vigore fino all'abdicazione forzata di Re Michele I il 30 dicembre 1947.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ro-king.html',
  },
  {
    entity_id: 'ROM_RPR_1947',
    match_codes: ['ROM', 'RO', 'ROU', 'ROMANIA', 'RPR', 'REPUBLICA_POPULARA_ROMANA'],
    common_name: 'Repubblica Popolare Romena',
    historical_name: 'Republica Populară Română (RPR — Proclamazione del 30 Dicembre 1947)',
    valid_from: '1947-12-30',
    valid_to: '1948-04-12',
    flag_status: 'official',
    flag_category: 'transitional',
    file_name: 'Flag_of_Romania.svg',
    wikidata_item_id: 'Q842794',
    license: 'Public Domain',
    historical_rationale: "Con l'abdicazione forzata di Re Michele I e la proclamazione della Repubblica Popolare Romena (Legge n. 363 del 30 dicembre 1947), il tricolore verticale blu-giallo-rosso viene mantenuto rimuovendo immediatamente lo stemma reale monarchico fino all'adozione della Costituzione del 13 aprile 1948.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ro-rpr.html',
  },
  {
    entity_id: 'ROM_RPR_1948',
    match_codes: ['ROM', 'RO', 'ROU', 'ROMANIA', 'RPR', 'REPUBLICA_POPULARA_ROMANA'],
    common_name: 'Repubblica Popolare Romena (Costituzione 13 Aprile 1948)',
    historical_name: 'Republica Populară Română (RPR — Costituzione del 13 Aprile 1948)',
    valid_from: '1948-04-13',
    valid_to: '1952-09-24',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Romania_(1948–1952).svg',
    wikidata_item_id: 'Q842794',
    license: 'Public Domain',
    historical_rationale: "Bandiera di Stato della Repubblica Popolare Romena sancita dalla Costituzione del 13 aprile 1948: tricolore verticale blu, giallo e rosso caricato al centro del nuovo emblema socialista RPR (montagne boschive, torre petrolifera, sole nascente e corona di spighe di grano con nastro 'RPR', privo della stella rossa aggiunta nel 1952).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ro-rpr.html',
  },

  // BULGARIA — ZARATO E REPUBBLICA POPOLARE DI BULGARIA (Costituzione Dimitrov del 4 dicembre 1947)
  {
    entity_id: 'BUL_KINGDOM',
    match_codes: ['BUL', 'BG', 'BGR', 'BULGARIA', 'KINGDOM_OF_BULGARIA'],
    common_name: 'Regno di Bulgaria',
    historical_name: 'Tsarstvo Bălgariya (Zarato di Bulgaria)',
    valid_from: '1879-04-16',
    valid_to: '1946-09-14',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Bulgaria.svg',
    wikidata_item_id: 'Q147909',
    license: 'Public Domain',
    historical_rationale: "Tricolore orizzontale bianco, verde e rosso adottato dalla Costituzione di Tărnovo del 1879 per il Principato e poi Regno di Bulgaria.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/bg-king.html',
  },
  {
    entity_id: 'BUL_PR_1946',
    match_codes: ['BUL', 'BG', 'BGR', 'BULGARIA', 'NRB'],
    common_name: 'Repubblica Popolare di Bulgaria',
    historical_name: 'Narodna Republika Bălgariya (Proclamazione del 15 Settembre 1946)',
    valid_from: '1946-09-15',
    valid_to: '1947-12-03',
    flag_status: 'official',
    flag_category: 'transitional',
    file_name: 'Flag_of_Bulgaria_(1946–1948).svg',
    wikidata_item_id: 'Q121932',
    license: 'Public Domain',
    historical_rationale: "Tricolore bianco-verde-rosso della Repubblica Popolare di Bulgaria proclamata il 15 settembre 1946 dopo il referendum antimonarchico, in attesa della nuova Costituzione repubblicana.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/bg-1947.html',
  },
  {
    entity_id: 'BUL_NRB_1947',
    match_codes: ['BUL', 'BG', 'BGR', 'BULGARIA', 'NRB', 'NARODNA_REPUBLIKA_BALGARIYA'],
    common_name: 'Repubblica Popolare di Bulgaria (Costituzione Dimitrov)',
    historical_name: 'Narodna Republika Bălgariya (Costituzione Dimitrov del 4 Dicembre 1947)',
    valid_from: '1947-12-04',
    valid_to: '1967-05-18',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Bulgaria_(1946–1948).svg',
    wikidata_item_id: 'Q121932',
    license: 'Public Domain',
    historical_rationale: "Bandiera della Repubblica Popolare di Bulgaria ai sensi della Costituzione Dimitrov entrata in vigore il 4 dicembre 1947: tricolore bianco-verde-rosso con il nuovo emblema del leone rampante circondato da spighe di grano, ruota dentata e stella rossa con la data '9 IX 1944' nel cantone superiore sinistro.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/bg-1947.html',
  },

  // UNIONE DELLA BIRMANIA (4 gennaio 1948)
  {
    entity_id: 'BUR_1948',
    match_codes: ['BUR', 'MM', 'MMR', 'BURMA', 'BIRMANIA', 'MYANMAR', 'UNION_OF_BURMA', 'UNIONE_DELLA_BIRMANIA'],
    common_name: 'Unione della Birmania',
    historical_name: 'Pyidaungzu Myanma Naingngandaw (Union of Burma — Indipendenza del 4 Gennaio 1948)',
    valid_from: '1948-01-04',
    valid_to: '1974-01-02',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Burma_(1948–1974).svg',
    wikidata_item_id: 'Q836',
    license: 'Public Domain',
    historical_rationale: "Bandiera dell'Unione della Birmania issata a Rangoon il 4 gennaio 1948: campo rosso con cantone blu scuro caricato di una grande stella bianca a cinque punte circondata da cinque stelle bianche più piccole (simbolo dell'unione tra Bamar, Shan, Kachin, Chin, Karen e Kayah).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/mm-1948.html',
  },

  // DOMINION DI CEYLON (4 febbraio 1948 – 1951)
  {
    entity_id: 'CEY_1948',
    match_codes: ['CEY', 'LK', 'LKA', 'CEYLON', 'DOMINION_OF_CEYLON', 'DOMINION_DI_CEYLON', 'SRI_LANKA'],
    common_name: 'Dominion di Ceylon',
    historical_name: 'Dominion of Ceylon (Bandiera del Leone — 4 Febbraio 1948 – 1951)',
    valid_from: '1948-02-04',
    valid_to: '1951-03-01',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Ceylon_(1948–1951).svg',
    wikidata_item_id: 'Q1456619',
    license: 'Public Domain',
    historical_rationale: "Prima bandiera del Dominion di Ceylon indipendente (1948–1951): stendardo reale dell'ultimo re di Kandy (Sri Vikrama Rajasinha) con il Leone passante dorato che brandisce la spada kastane su campo cremisi e quattro foglie dorate di Bo agli angoli, privo delle due bande verticali verde e arancione aggiunte solo nel marzo 1951.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/lk-hist.html',
  },

  // STATO DI ISRAELE (14 maggio 1948)
  {
    entity_id: 'ISR_1948',
    match_codes: ['ISR', 'IL', 'ISRAEL', 'ISRAELE', 'STATE_OF_ISRAEL', 'STATO_DI_ISRAELE', 'MEDINAT_YISRAEL'],
    common_name: 'Stato di Israele',
    historical_name: 'Medinat Yisrael (Proclamazione d\'Indipendenza del 14 Maggio 1948)',
    valid_from: '1948-05-14',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Israel.svg',
    wikidata_item_id: 'Q801',
    license: 'Public Domain',
    historical_rationale: "Bandiera dello Stato di Israele proclamato da David Ben-Gurion a Tel Aviv il 14 maggio 1948 (5 Iyar 5708): campo bianco con due fasce orizzontali blu Tekhelet (ispirate al tallit) e lo Scudo di Davide (Magen David) blu al centro.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/il.html',
  },

  // STATO DI PASUNDAN / NEGARA PASUNDAN (24 aprile 1948)
  {
    entity_id: 'PAS_1948',
    match_codes: ['PAS', 'PASUNDAN', 'NEGARA_PASUNDAN', 'STATE_OF_PASUNDAN', 'STATO_DI_PASUNDAN'],
    common_name: 'Stato di Pasundan (Negara Pasundan)',
    historical_name: 'Negara Pasundan (Wali Negara Wiranatakusumah V — Bandung, 24 Aprile 1948)',
    valid_from: '1948-04-24',
    valid_to: '1950-03-11',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Pasundan.svg',
    wikidata_item_id: 'Q1974238',
    license: 'Public Domain',
    historical_rationale: "Tricolore orizzontale verde-bianco-verde dello Stato federale di Pasundan (Negara Pasundan) istituito a Bandung in Giava Occidentale il 24 aprile 1948 sotto la presidenza di Raden Adipati Aria Muharam Wiranatakusumah V.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/id-pas.html',
  },

  // STATO DI MADURA / NEGARA MADURA (20 febbraio 1948)
  {
    entity_id: 'MAD_1948',
    match_codes: ['MAD', 'MADURA', 'NEGARA_MADURA', 'STATE_OF_MADURA', 'STATO_DI_MADURA'],
    common_name: 'Stato di Madura (Negara Madura)',
    historical_name: 'Negara Madura (Wali Negara Tjakraningrat XII — Pamekasan, 20 Febbraio 1948)',
    valid_from: '1948-02-20',
    valid_to: '1950-03-09',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Various_Autonomous_Indonesian_States.svg',
    wikidata_item_id: 'Q2481051',
    license: 'Public Domain',
    historical_rationale: "Bicolore orizzontale verde e bianco dello Stato federale di Madura (Negara Madura) riconosciuto il 20 febbraio 1948 sotto il Wali Negara Raden Ario Tumenggung Tjakraningrat XII.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/id-mad.html',
  },

  // FEDERAZIONE DELLA MALESIA (1° febbraio 1948 – maggio 1950)
  {
    entity_id: 'MAL_FED_1948',
    match_codes: ['MAL', 'FOM', 'FEDERATION_OF_MALAYA', 'FEDERAZIONE_DELLA_MALESIA', 'PERSEKUTUAN_TANAH_MELAYU'],
    common_name: 'Federazione della Malesia',
    historical_name: 'Federation of Malaya / Persekutuan Tanah Melayu (1° Febbraio 1948 – Maggio 1950)',
    valid_from: '1948-02-01',
    valid_to: '1950-05-25',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Federated_Malay_States_(1895–1946).svg',
    wikidata_item_id: 'Q1479726',
    license: 'Public Domain',
    historical_rationale: "Bandiera a quattro bande orizzontali bianco-rosso-giallo-nero con ovale bianco centrale caricato della tigre malese rampante, rimasta in uso per gli Stati Malesi Federati e per la neonata Federazione della Malesia (istituita il 1° febbraio 1948) fino all'adozione della bandiera a strisce e stella a 11 punte del 26 maggio 1950.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/my-fms.html',
  },

  // REPUBBLICA DI COREA — COREA DEL SUD (15 agosto 1948)
  {
    entity_id: 'ROK_1948',
    match_codes: ['ROK', 'KR', 'KOR', 'SOUTH_KOREA', 'COREA_DEL_SUD'],
    common_name: 'Repubblica di Corea (Corea del Sud)',
    historical_name: 'Daehan Minguk (Taegeukgi 1948–1949 — Proclamazione del 15 Agosto 1948)',
    valid_from: '1948-08-15',
    valid_to: '1949-10-14',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_South_Korea_(1948–1949).svg',
    wikidata_item_id: 'Q884',
    license: 'Public Domain',
    historical_rationale: "Prima variante costituzionale del Taegeukgi della Repubblica di Corea proclamata da Syngman Rhee il 15 agosto 1948 a Seul, in vigore fino alla standardizzazione geometrica dell'ottobre 1949.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/kr-hist.html',
  },

  // REPUBBLICA POPOLARE DEMOCRATICA DI COREA — COREA DEL NORD (8 settembre 1948)
  {
    entity_id: 'PRK_1948',
    match_codes: ['PRK', 'KP', 'DPRK', 'RPDC', 'NORTH_KOREA', 'COREA_DEL_NORD'],
    common_name: 'Repubblica Popolare Democratica di Corea',
    historical_name: 'Chosŏn Minjujuŭi Inmin Konghwaguk (8 Settembre 1948 – 1992)',
    valid_from: '1948-09-08',
    valid_to: '1992-04-08',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_North_Korea_(1948–1992).svg',
    wikidata_item_id: 'Q423',
    license: 'Public Domain',
    historical_rationale: "Bandiera ufficiale adottata dalla Costituzione della Repubblica Popolare Democratica di Corea l'8 settembre 1948 (proclamazione del 9 settembre 1948 sotto Kim Il-sung): fascia centrale rossa bordata di bianco su fondo blu con cerchio bianco decentrato e stella rossa a cinque punte.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/kp-1948.html',
  },

  // GOVERNO DI TUTTO-PALESTINA — STRISCIA DI GAZA (22 settembre 1948)
  {
    entity_id: 'APG_1948',
    match_codes: ['APG', 'ALL_PALESTINE', 'TUTTO_PALESTINA', 'GOVERNO_DI_TUTTO_PALESTINA'],
    common_name: 'Governo di Tutto-Palestina (Gaza)',
    historical_name: 'Hukumat Umum Filastin (Protettorato Egiziano di Gaza — 22 Settembre 1948)',
    valid_from: '1948-09-22',
    valid_to: '1959-06-30',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Arab_Revolt.svg',
    wikidata_item_id: 'Q146726',
    license: 'Public Domain',
    historical_rationale: "Bandiera della Rivolta Araba adottata dal Governo di Tutto-Palestina proclamato a Gaza il 22 settembre 1948 da Amin al-Husseini e Ahmed Hilmi Pasha sotto tutela militare egiziana.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ps.html',
  },

  // STATO DI SUMATRA MERIDIONALE — NEGARA SUMATERA SELATAN (30 agosto 1948)
  {
    entity_id: 'NSS_1948',
    match_codes: ['NSS', 'NEGARA_SUMATERA_SELATAN', 'SUMATRA_MERIDIONALE'],
    common_name: 'Stato di Sumatra Meridionale (NSS)',
    historical_name: 'Negara Sumatera Selatan (30 Agosto 1948)',
    valid_from: '1948-08-30',
    valid_to: '1950-03-24',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_South_Sumatra.svg',
    wikidata_item_id: 'Q7603546',
    license: 'Public Domain',
    historical_rationale: "Bicolore orizzontale giallo e verde dello Stato federale di Sumatra Meridionale (Negara Sumatera Selatan) istituito il 30 agosto 1948 a Palembang sotto egida olandese.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/id-nss.html',
  },

  // STATO DI GIAVA ORIENTALE — NEGARA JAWA TIMUR (26 novembre 1948)
  {
    entity_id: 'NJT_1948',
    match_codes: ['NJT', 'NEGARA_JAWA_TIMUR', 'GIAVA_ORIENTALE'],
    common_name: 'Stato di Giava Orientale (NJT)',
    historical_name: 'Negara Jawa Timur (26 Novembre 1948)',
    valid_from: '1948-11-26',
    valid_to: '1950-02-25',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Various_Autonomous_Indonesian_States.svg',
    wikidata_item_id: 'Q7603363',
    license: 'Public Domain',
    historical_rationale: "Bicolore orizzontale verde e bianco dello Stato federale di Giava Orientale (Negara Jawa Timur) riconosciuto il 26 novembre 1948 a Surabaya sotto tutela olandese.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/id-njt.html',
  },

  // GOVERNO DEMOCRATICO PROVVISORIO DI GRECIA (24 dicembre 1947)
  {
    entity_id: 'PDG_1947',
    match_codes: ['PDG', 'PROSORINI_DIMOKRATIKI_KYVERNISI', 'GOVERNO_DEMOCRATICO_PROVVISORIO'],
    common_name: 'Governo Democratico Provvisorio di Grecia',
    historical_name: 'Prosorini Dimokratiki Kyvernisi (DSE — Markos Vafiadis, 24 Dicembre 1947)',
    valid_from: '1947-12-24',
    valid_to: '1949-08-30',
    flag_status: 'de_facto',
    flag_category: 'state_war',
    file_name: 'Flag_of_the_Democratic_Army_of_Greece.svg',
    wikidata_item_id: 'Q2562625',
    license: 'Public Domain',
    historical_rationale: "Vessillo del Governo Democratico Provvisorio (Prosorini Dimokratiki Kyvernisi) proclamato il 24 dicembre 1947 dal generale Markos Vafiadis sulle montagne dell'Epiro e della Macedonia: croce greca bianca su campo azzurro con il monogramma Δ dell'Esercito Democratico di Grecia (DSE).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/gr-civil.html',
  },

  // AZAD JAMMU E KASHMIR (24 ottobre 1947)
  {
    entity_id: 'AZK_1947',
    match_codes: ['AZK', 'AJK', 'AZAD_KASHMIR', 'AZAD_JAMMU_AND_KASHMIR'],
    common_name: 'Azad Jammu e Kashmir',
    historical_name: 'Governo Provvisorio di Azad Jammu e Kashmir (Sardar Ibrahim Khan — 24 Ottobre 1947)',
    valid_from: '1947-10-24',
    valid_to: '1975-09-23',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Azad_Kashmir.svg',
    wikidata_item_id: 'Q200130',
    license: 'Public Domain',
    historical_rationale: "Bandiera del Governo Provvisorio di Azad Jammu e Kashmir proclamato a Muzaffarabad il 24 ottobre 1947 da Sardar Muhammad Ibrahim Khan: campo verde islamico con mezzaluna e stella bianca e rettangolo color zafferano/arancione nel cantone a rappresentare le minoranze religiose della regione.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/pk-azk.html',
  },

  // STATO DI SUMATRA ORIENTALE / NEGARA SUMATERA TIMUR (25 dicembre 1947)
  {
    entity_id: 'NST_1947',
    match_codes: ['NST', 'NEGARA_SUMATERA_TIMUR', 'EAST_SUMATRA', 'STATE_OF_EAST_SUMATRA'],
    common_name: 'Stato di Sumatra Orientale (Negara Sumatera Timur)',
    historical_name: 'Negara Sumatera Timur (Tengku Mansur — Medan, 25 Dicembre 1947)',
    valid_from: '1947-12-25',
    valid_to: '1950-08-16',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_East_Sumatra.svg',
    wikidata_item_id: 'Q2608568',
    license: 'Public Domain',
    historical_rationale: "Tricolore orizzontale giallo, bianco e verde dello Stato di Sumatra Orientale (Negara Sumatera Timur) istituito a Medan il 25 dicembre 1947 sotto la presidenza di Tengku Mansur nell'ambito del sistema federale patrocinato dai Paesi Bassi.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/id-est.html',
  },

  // AUSTRIA — STÄNDESTAAT (1934–1938) & SECONDA REPUBBLICA D'AUSTRIA (dal 1° maggio 1945)
  {
    entity_id: 'AUS_STANDESTAAT',
    match_codes: ['AUS', 'AUT', 'AT', 'AUSTRIA', 'OSTERREICH'],
    common_name: 'Stato Federale d\'Austria',
    historical_name: 'Bundesstaat Österreich (Ständestaat 1934–1938)',
    valid_from: '1934-05-01',
    valid_to: '1938-03-12',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Austria_(1934–1938).svg',
    wikidata_item_id: 'Q212085',
    license: 'Public Domain',
    historical_rationale: "Bandiera di Stato dello Ständestaat austriaco con l'aquila bicipite nimbata recante la Kruckenkreuz sul petto (Costituzione di maggio 1934 fino all'Anschluss del marzo 1938).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/at_1934.html',
  },
  {
    entity_id: 'AUS_SECOND_REP',
    match_codes: ['AUS', 'AUT', 'AT', 'AUSTRIA', 'OSTERREICH', 'SECOND_REPUBLIC_OF_AUSTRIA'],
    common_name: 'Repubblica d\'Austria (Seconda Repubblica)',
    historical_name: 'Republik Österreich (Wappengesetz StGBl. Nr. 7/1945 — Catene Spezzate)',
    valid_from: '1945-05-01',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Austria_(state).svg',
    wikidata_item_id: 'Q40',
    license: 'Public Domain',
    historical_rationale: "Bandiera di Stato della Seconda Repubblica d'Austria (Dienstflagge des Bundes) istituita il 1° maggio 1945 con l'aquila federale a una testa, corona murale, falce, martello e le catene spezzate della liberazione dal Terzo Reich.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/at.html',
  },

  // UNGHERIA — REGNO (1919–1946) & SECONDA REPUBBLICA UNGHERESE (1946–1949)
  {
    entity_id: 'HUN_KINGDOM',
    match_codes: ['HUN', 'HU', 'HUNGARY', 'UNGHERIA', 'KINGDOM_OF_HUNGARY'],
    common_name: 'Regno d\'Ungheria',
    historical_name: 'Magyar Királyság (Corona di Santo Stefano)',
    valid_from: '1919-08-01',
    valid_to: '1946-01-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Hungary_(1915-1918,_1919-1946).svg',
    wikidata_item_id: 'Q326074',
    license: 'Public Domain',
    historical_rationale: "Tricolore rosso-bianco-verde caricato dello stemma storico ungherese sormontato dalla Sacra Corona di Santo Stefano, rimasto in uso fino all'abolizione della monarchia (Legge I/1946).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/hu_1920.html',
  },
  {
    entity_id: 'HUN_SECOND_REP',
    match_codes: ['HUN', 'HU', 'HUNGARY', 'UNGHERIA', 'MAGYAR_KOZTARSASAG', 'SECOND_HUNGARIAN_REPUBLIC'],
    common_name: 'Seconda Repubblica Ungherese',
    historical_name: 'Magyar Köztársaság (Stemma di Kossuth — 1° Febbraio 1946 – 19 Agosto 1949)',
    valid_from: '1946-02-01',
    valid_to: '1949-08-19',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Hungary_(1946-1949,_1956-1957).svg',
    wikidata_item_id: 'Q632746',
    license: 'Public Domain',
    historical_rationale: "Tricolore della Seconda Repubblica Ungherese adottato dal 1° febbraio 1946 con lo stemma di Kossuth (Kossuth-címer privo della corona reale monarchica) prima dell'introduzione dello stemma comunista Rákosi del 20 agosto 1949.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/hu-1946.html',
  },

  // POLONIA — SECONDA REPUBBLICA (1928–1944) & POLONIA POSTBELLICA AQUILA SENZA CORONA (1945–1980)
  {
    entity_id: 'POL_SECOND_REP',
    match_codes: ['POL', 'PL', 'POLAND', 'POLONIA', 'DRUGA_RZECZPOSPOLITA'],
    common_name: 'Seconda Repubblica di Polonia',
    historical_name: 'Rzeczpospolita Polska (Aquila Bianca Incoronata — 1928–1944)',
    valid_from: '1928-01-01',
    valid_to: '1944-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Poland_(with_coat_of_arms,_1928-1939).svg',
    wikidata_item_id: 'Q207272',
    license: 'Public Domain',
    historical_rationale: "Bandiera di Stato della Seconda Repubblica di Polonia con l'Aquila Bianca incoronata disegnata da Zygmunt Kamiński (1927–1928).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/pl_1919.html',
  },
  {
    entity_id: 'POL_POSTWAR',
    match_codes: ['POL', 'PL', 'POLAND', 'POLONIA', 'RZECZPOSPOLITA_POLSKA'],
    common_name: 'Repubblica di Polonia',
    historical_name: 'Rzeczpospolita Polska (Aquila Bianca Senza Corona — 1945–1980)',
    valid_from: '1945-01-01',
    valid_to: '1980-01-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Poland_(with_coat_of_arms,_1955-1980).svg',
    wikidata_item_id: 'Q212278',
    license: 'Public Domain',
    historical_rationale: "Bandiera bicolore bianco-rossa della Polonia postbellica (TRJN / KRN / Repubblica Popolare): l'Aquila Bianca perde la corona reale già dal 1944–1945 sulle insegne governative e militari prima della formalizzazione grafica del 1955.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/pl-1945.html',
  },

  // ALBANIA — REGNO (1934–1939), PROTETTORATO ITALIANO (1939–1943), GOVERNO DEMOCRATICO (1944–1946) & REPUBBLICA POPOLARE (1946–1992)
  {
    entity_id: 'ALB_KINGDOM',
    match_codes: ['ALB', 'AL', 'ALBANIA', 'MBRETERIA_SHQIPTARE'],
    common_name: 'Regno d\'Albania',
    historical_name: 'Mbretëria Shqiptare (Re Zog I — 1934–1939)',
    valid_from: '1934-06-28',
    valid_to: '1939-04-07',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Albania_(1934–1939).svg',
    wikidata_item_id: 'Q149334',
    license: 'Public Domain',
    historical_rationale: "Bandiera del Regno d'Albania sotto Re Zog I: drappo rosso con aquila bicipite nera sormontata dall'Elmo di Skanderbeg.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/al_1928.html',
  },
  {
    entity_id: 'ALB_DEM_GOV',
    match_codes: ['ALB', 'AL', 'ALBANIA', 'QEVERIA_DEMOKRATIKE'],
    common_name: 'Governo Democratico d\'Albania',
    historical_name: 'Qeveria Demokratike e Shqipërisë (1944–1946)',
    valid_from: '1944-10-20',
    valid_to: '1946-03-14',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Democratic_Government_of_Albania_(1944–1946).svg',
    wikidata_item_id: 'Q3274469',
    license: 'Public Domain',
    historical_rationale: "Bandiera del Governo Democratico provvisorio di Enver Hoxha dalla liberazione dell'ottobre 1944 fino alla Costituzione della Repubblica Popolare del 14 marzo 1946, con stella d'oro nel cantone superiore.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/al_1944.html',
  },
  {
    entity_id: 'ALB_PR_1946',
    match_codes: ['ALB', 'AL', 'ALBANIA', 'REPUBLIKA_POPULLORE_E_SHQIPERISE'],
    common_name: 'Repubblica Popolare d\'Albania',
    historical_name: 'Republika Popullore e Shqipërisë (Sadik Kaceli — 15 Marzo 1946 – 1992)',
    valid_from: '1946-03-15',
    valid_to: '1992-04-07',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Albania_(1946–1992).svg',
    wikidata_item_id: 'Q189161',
    license: 'Public Domain',
    historical_rationale: "Drappo rosso con l'aquila bicipite nera sormontata al centro dalla stella rossa bordata d'oro, adottata con la Costituzione della Repubblica Popolare d'Albania del marzo 1946.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/al_1946.html',
  },

  // MONGOLIA — 1930–1940, 1940–1945 & SOYOMBO TRICOLORE CON STELLA (dal 10 luglio 1945)
  {
    entity_id: 'MON_1930',
    match_codes: ['MON', 'MN', 'MNG', 'MONGOLIA'],
    common_name: 'Repubblica Popolare Mongola',
    historical_name: 'Bügd Nairamdakh Mongol Ard Uls (1930–1940)',
    valid_from: '1930-01-01',
    valid_to: '1940-06-29',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Mongolian_People\'s_Republic_(1930–1940).svg',
    wikidata_item_id: 'Q212422',
    license: 'Public Domain',
    historical_rationale: "Insegna della Repubblica Popolare Mongola in vigore dal 1930 alla Costituzione del 30 giugno 1940.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/mn-hist.html',
  },
  {
    entity_id: 'MON_1940',
    match_codes: ['MON', 'MN', 'MNG', 'MONGOLIA'],
    common_name: 'Repubblica Popolare Mongola (1940–1945)',
    historical_name: 'Bügd Nairamdakh Mongol Ard Uls (Costituzione 30 Giugno 1940 – Luglio 1945)',
    valid_from: '1940-06-30',
    valid_to: '1945-07-09',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Mongolian_People\'s_Republic_(1940–1945).svg',
    wikidata_item_id: 'Q212422',
    license: 'Public Domain',
    historical_rationale: "Bandiera rossa con l'emblema di Stato del cavaliere introdotta dalla Costituzione del 1940.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/mn-hist.html',
  },
  {
    entity_id: 'MON_1945',
    match_codes: ['MON', 'MN', 'MNG', 'MONGOLIA'],
    common_name: 'Repubblica Popolare Mongola',
    historical_name: 'Bügd Nairamdakh Mongol Ard Uls (Soyombo & Stella — 10 Luglio 1945 – 1992)',
    valid_from: '1945-07-10',
    valid_to: '1992-02-12',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Mongolian_People\'s_Republic_(1945–1992).svg',
    wikidata_item_id: 'Q212422',
    license: 'Public Domain',
    historical_rationale: "Tricolore verticale rosso-blu-rosso con il simbolo dorato Soyombo e la stella socialista a cinque punte adottata dal Presidium della Piccola Khural il 10 luglio 1945.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/mn-hist.html',
  },

  // REGNO DI GRECIA, CECOSLOVACCHIA, FINLANDIA & EUROPA OCCIDENTALE/NORDICA
  {
    entity_id: 'GRE_KINGDOM',
    match_codes: ['GRE', 'GRC', 'GR', 'GREECE', 'GRECIA', 'KINGDOM_OF_GREECE'],
    common_name: 'Regno di Grecia',
    historical_name: 'Vasileion tis Ellados (Bandiera Reale di Stato 1935–1970)',
    valid_from: '1935-11-03',
    valid_to: '1970-08-18',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'State_Flag_of_Greece_(1863-1924_and_1935-1973).svg',
    wikidata_item_id: 'Q209065',
    license: 'Public Domain',
    historical_rationale: "Bandiera di Stato del Regno di Grecia con croce ellenica bianca su sfondo azzurro caricata della corona reale dorata, restaurata nel 1935 e confermata fino al 1970.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/gr-king.html',
  },
  {
    entity_id: 'CZE_REPUBLIC',
    match_codes: ['CZE', 'CS', 'CZ', 'CZECHOSLOVAKIA', 'CECOSLOVACCHIA'],
    common_name: 'Repubblica Cecoslovacca',
    historical_name: 'Československá republika (Terza Repubblica 1945–1948)',
    valid_from: '1920-03-30',
    valid_to: '1992-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Czechoslovakia.svg',
    wikidata_item_id: 'Q33946',
    license: 'Public Domain',
    historical_rationale: "Bicolore bianco-rosso con triangolo blu all'asta adottato il 30 marzo 1920 e pienamente restaurato nella Terza Repubblica Cecoslovacca di Edvard Beneš.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/cs.html',
  },
  {
    entity_id: 'FIN_STATE',
    match_codes: ['FIN', 'FI', 'FINLAND', 'FINLANDIA'],
    common_name: 'Repubblica di Finlandia',
    historical_name: 'Suomen tasavalta (Bandiera di Stato)',
    valid_from: '1920-02-18',
    valid_to: '1978-05-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Finland_(state).svg',
    wikidata_item_id: 'Q33',
    license: 'Public Domain',
    historical_rationale: "Croce scandinava blu mare su campo bianco con lo stemma del Leone finlandese al centro, in uso come bandiera di Stato dal 1920 al 1978.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/fi.html',
  },
  {
    entity_id: 'RAJ_BRITISH',
    match_codes: ['RAJ', 'BRITISH_RAJ', 'INDIA_BRITANNICA', 'IMPERO_ANGLO_INDIANO'],
    common_name: 'Impero Anglo-Indiano (British Raj)',
    historical_name: 'Indian Empire (Star of India Red Ensign — fino al 14 Agosto 1947)',
    valid_from: '1885-01-01',
    valid_to: '1947-08-14',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'British_Raj_Red_Ensign.svg',
    wikidata_item_id: 'Q129286',
    license: 'Public Domain',
    historical_rationale: "Red Ensign britannica caricata della Stella dell'India (Order of the Star of India) in vigore fino alla partizione e indipendenza del 14–15 agosto 1947.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/in-colon.html',
  },
  {
    entity_id: 'CAN_1921',
    match_codes: ['CAN', 'CA', 'CANADA'],
    common_name: 'Dominion del Canada',
    historical_name: 'Dominion of Canada (Canadian Red Ensign 1921–1957)',
    valid_from: '1921-11-21',
    valid_to: '1957-10-08',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Canada_(1921–1957).svg',
    wikidata_item_id: 'Q16',
    license: 'Public Domain',
    historical_rationale: "Canadian Red Ensign con foglie d'acero verdi sullo scudo reale canadese (versione 1921–1957 prima che le foglie divenissero rosse nel 1957).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ca-1921.html',
  },
  {
    entity_id: 'NZL',
    match_codes: ['NZL', 'NZ', 'NEW_ZEALAND', 'NUOVA_ZELANDA'],
    common_name: 'Nuova Zelanda',
    historical_name: 'Dominion / Realm of New Zealand (Statute of Westminster Adoption Act 1947)',
    valid_from: '1902-06-12',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_New_Zealand.svg',
    wikidata_item_id: 'Q664',
    license: 'Public Domain',
    historical_rationale: "Blue Ensign britannica con le quattro stelle rosse bordate di bianco della Croce del Sud, adottata ufficialmente dal New Zealand Ensign Act 1901.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/nz.html',
  },
  {
    entity_id: 'SWE',
    match_codes: ['SWE', 'SE', 'SWEDEN', 'SVEZIA'],
    common_name: 'Regno di Svezia',
    historical_name: 'Konungariket Sverige',
    valid_from: '1906-06-22',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Sweden.svg',
    wikidata_item_id: 'Q34',
    license: 'Public Domain',
    historical_rationale: "Croce scandinava gialla su campo blu codificata dalla Legge sulla Bandiera del 22 giugno 1906.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/se.html',
  },
  {
    entity_id: 'NOR',
    match_codes: ['NOR', 'NO', 'NORWAY', 'NORVEGIA'],
    common_name: 'Regno di Norvegia',
    historical_name: 'Kongeriket Norge',
    valid_from: '1899-12-15',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Norway.svg',
    wikidata_item_id: 'Q20',
    license: 'Public Domain',
    historical_rationale: "Croce scandinava blu scuro bordata di bianco su campo rosso cremisi.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/no.html',
  },
  {
    entity_id: 'DEN',
    match_codes: ['DEN', 'DK', 'DNK', 'DENMARK', 'DANIMARCA'],
    common_name: 'Regno di Danimarca',
    historical_name: 'Kongeriget Danmark (Dannebrog)',
    valid_from: '1748-01-01',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Denmark.svg',
    wikidata_item_id: 'Q35',
    license: 'Public Domain',
    historical_rationale: "Dannebrog: croce scandinava bianca su campo rosso.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/dk.html',
  },
  {
    entity_id: 'SWI',
    match_codes: ['SWI', 'CH', 'CHE', 'SWITZERLAND', 'SVIZZERA'],
    common_name: 'Confederazione Svizzera',
    historical_name: 'Schweizerische Eidgenossenschaft',
    valid_from: '1889-12-12',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Switzerland.svg',
    wikidata_item_id: 'Q39',
    license: 'Public Domain',
    historical_rationale: "Croce svizzera bianca equilatera in campo rosso.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ch.html',
  },
  {
    entity_id: 'IRE',
    match_codes: ['IRE', 'IE', 'IRL', 'EIR', 'IRELAND', 'IRLANDA'],
    common_name: 'Irlanda (Éire)',
    historical_name: 'Éire / Ireland (Costituzione 1937)',
    valid_from: '1922-12-06',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Ireland.svg',
    wikidata_item_id: 'Q27',
    license: 'Public Domain',
    historical_rationale: "Tricolore verticale verde, bianco e arancione sancito dall'Articolo 7 della Costituzione irlandese del 1937.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ie.html',
  },
  {
    entity_id: 'BEL',
    match_codes: ['BEL', 'BE', 'BELGIUM', 'BELGIO'],
    common_name: 'Regno del Belgio',
    historical_name: 'Royaume de Belgique / Koninkrijk België',
    valid_from: '1831-01-23',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Belgium.svg',
    wikidata_item_id: 'Q31',
    license: 'Public Domain',
    historical_rationale: "Tricolore verticale nero, giallo e rosso sancito dalla Costituzione belga del 1831.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/be.html',
  },
  {
    entity_id: 'HOL',
    match_codes: ['HOL', 'NL', 'NLD', 'NETHERLANDS', 'PAESI_BASSI', 'HOLLAND'],
    common_name: 'Regno dei Paesi Bassi',
    historical_name: 'Koninkrijk der Nederlanden',
    valid_from: '1937-02-19',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Netherlands.svg',
    wikidata_item_id: 'Q55',
    license: 'Public Domain',
    historical_rationale: "Tricolore orizzontale rosso vermiglio brillante, bianco e blu cobalto fissato dal Decreto Reale della Regina Guglielmina del 19 febbraio 1937.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/nl.html',
  },
  {
    entity_id: 'LUX',
    match_codes: ['LUX', 'LU', 'LUXEMBOURG', 'LUSSEMBURGO'],
    common_name: 'Granducato di Lussemburgo',
    historical_name: 'Grand-Duché de Luxembourg',
    valid_from: '1845-06-12',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Luxembourg.svg',
    wikidata_item_id: 'Q32',
    license: 'Public Domain',
    historical_rationale: "Tricolore orizzontale rosso, bianco e azzurro cielo restaurato dopo la liberazione del 1944–1945.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/lu.html',
  },
  {
    entity_id: 'TUR',
    match_codes: ['TUR', 'TR', 'TURKEY', 'TURCHIA'],
    common_name: 'Repubblica di Turchia',
    historical_name: 'Türkiye Cumhuriyeti',
    valid_from: '1936-05-29',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Turkey.svg',
    wikidata_item_id: 'Q43',
    license: 'Public Domain',
    historical_rationale: "Ay Yıldız: drappo rosso con mezzaluna e stella bianca codificati dalla Legge n. 2994 del 29 maggio 1936.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/tr.html',
  },
  {
    entity_id: 'MCO',
    match_codes: ['MCO', 'MC', 'MONACO'],
    common_name: 'Principato di Monaco',
    historical_name: 'Principauté de Monaco',
    valid_from: '1881-04-04',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Monaco.svg',
    wikidata_item_id: 'Q235',
    license: 'Public Domain',
    historical_rationale: "Bicolore orizzontale rosso e bianco dei Grimaldi adottato il 4 aprile 1881.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/mc.html',
  },
  {
    entity_id: 'SMR',
    match_codes: ['SMR', 'SM', 'SAN_MARINO'],
    common_name: 'Repubblica di San Marino',
    historical_name: 'Serenissima Repubblica di San Marino',
    valid_from: '1862-04-06',
    valid_to: '2011-07-22',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_San_Marino.svg',
    wikidata_item_id: 'Q238',
    license: 'Public Domain',
    historical_rationale: "Bicolore bianco e azzurro caricato dello stemma storico dei Tre Pennoni con corona, in uso fino alla standardizzazione grafica del 2011.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/sm.html',
  },
  {
    entity_id: 'VAT',
    match_codes: ['VAT', 'VA', 'VATICAN', 'VATICANO', 'HOLY_SEE'],
    common_name: 'Stato della Città del Vaticano',
    historical_name: 'Status Civitatis Vaticanae',
    valid_from: '1929-06-07',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Vatican_City.svg',
    wikidata_item_id: 'Q237',
    license: 'Public Domain',
    historical_rationale: "Drappo quadrato giallo e bianco caricato delle Chiavi Decussate e del Triregno papale (Legge Fondamentale del 7 giugno 1929).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/va.html',
  },
  {
    entity_id: 'AND',
    match_codes: ['AND', 'AD', 'ANDORRA'],
    common_name: 'Principato d\'Andorra',
    historical_name: 'Principat d\'Andorra',
    valid_from: '1866-01-01',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Andorra.svg',
    wikidata_item_id: 'Q228',
    license: 'Public Domain',
    historical_rationale: "Tricolore verticale blu, giallo e rosso con stemma dei Coprincipi.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ad.html',
  },
  {
    entity_id: 'LIE',
    match_codes: ['LIE', 'LI', 'LIECHTENSTEIN'],
    common_name: 'Principato del Liechtenstein',
    historical_name: 'Fürstentum Liechtenstein',
    valid_from: '1937-06-24',
    valid_to: '1982-06-30',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Liechtenstein_(1937–1982).svg',
    wikidata_item_id: 'Q347',
    license: 'Public Domain',
    historical_rationale: "Bicolore blu e rosso con corona principesca d'oro aggiunta il 24 giugno 1937 dopo le Olimpiadi di Berlino.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/li.html',
  },
  {
    entity_id: 'GIB',
    match_codes: ['GIB', 'GI', 'GIBRALTAR', 'GIBILTERRA'],
    common_name: 'Colonia di Gibilterra',
    historical_name: 'Crown Colony of Gibraltar (Blue Ensign)',
    valid_from: '1875-01-01',
    valid_to: '1982-11-08',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Governor_of_Gibraltar.svg',
    wikidata_item_id: 'Q1410',
    license: 'Public Domain',
    historical_rationale: "Insegna governativa britannica di Gibilterra (Blue Ensign con castello e chiave d'oro) in vigore durante e subito dopo la Seconda Guerra Mondiale.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/gi.html',
  },

  // ASIA CENTRO-MERIDIONALE & HIMALAYA (1945–1947)
  {
    entity_id: 'AFG_KINGDOM',
    match_codes: ['AFG', 'AF', 'AFGHANISTAN'],
    common_name: 'Regno dell\'Afghanistan',
    historical_name: 'Da Afghānistān Shāhī Dawlat (Re Mohammed Zahir Shah, 1931–1973)',
    valid_from: '1931-10-31',
    valid_to: '1973-07-17',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Afghanistan_(1931–1973).svg',
    wikidata_item_id: 'Q1145764',
    license: 'Public Domain',
    historical_rationale: "Tricolore verticale nero, rosso e verde con emblema della moschea tra spighe di grano e data 1348 AH (1929), ufficiale sotto Re Zahir Shah.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/af-1931.html',
  },
  {
    entity_id: 'NEP_RANA',
    match_codes: ['NEP', 'NP', 'NPL', 'NEPAL'],
    common_name: 'Regno del Nepal',
    historical_name: 'Regno del Nepal (Dinastia Shah / Rana)',
    valid_from: '1928-01-01',
    valid_to: '1962-12-16',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Nepal_(1928–1962).svg',
    wikidata_item_id: 'Q837',
    license: 'Public Domain',
    historical_rationale: "Doppio gagliardetto cremisi bordato di blu con sole e luna recanti volti stilizzati (standardizzato nel 1928 fino alla Costituzione del 1962).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/np-hist.html',
  },
  {
    entity_id: 'BHU_WANGCHUCK',
    match_codes: ['BHU', 'BT', 'BTN', 'BHUTAN'],
    common_name: 'Regno del Bhutan',
    historical_name: 'Druk Yul (Regno del Bhutan — Re Jigme Wangchuck)',
    valid_from: '1926-08-21',
    valid_to: '1956-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Bhutan_(1949–1956).svg',
    wikidata_item_id: 'Q917',
    license: 'Public Domain',
    historical_rationale: "Bandiera reale storica del Bhutan con campo diviso diagonalmente in giallo senape e rosso scuro e il Drago del Tuono (Druk) bianco al centro.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/bt-hist.html',
  },
  {
    entity_id: 'TIB_GANDEN',
    match_codes: ['TIB', 'TIBET'],
    common_name: 'Tibet (Ganden Phodrang)',
    historical_name: 'Tibet (Governo di Lhasa — Leoni delle Nevi)',
    valid_from: '1925-01-01',
    valid_to: '1951-05-23',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Tibet.svg',
    wikidata_item_id: 'Q17252',
    license: 'Public Domain',
    historical_rationale: "Bandiera dei Leoni delle Nevi codificata dal XIII Dalai Lama (1916–1925) e in uso a Lhasa durante la reggenza indipendente de facto fino al 1951.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/xtb.html',
  },

  // AMERICHE (1936–1947)
  {
    entity_id: 'BRA_1889',
    match_codes: ['BRA', 'BR', 'BRAZIL', 'BRASILE'],
    common_name: 'Stati Uniti del Brasile',
    historical_name: 'Estados Unidos do Brasil (21 Stelle — 1889–1960)',
    valid_from: '1889-11-19',
    valid_to: '1960-04-14',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Brazil_(1889–1960).svg',
    wikidata_item_id: 'Q155',
    license: 'Public Domain',
    historical_rationale: "Bandiera repubblicana brasiliana con esattamente 21 stelle nella sfera celeste ('Ordem e Progresso'), in vigore fino alla fondazione di Brasilia nel 1960.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/br-1889.html',
  },
  {
    entity_id: 'MEX_1934',
    match_codes: ['MEX', 'MX', 'MEXICO', 'MESSICO'],
    common_name: 'Stati Uniti Messicani',
    historical_name: 'Estados Unidos Mexicanos (Stemma del 1934–1968)',
    valid_from: '1934-02-05',
    valid_to: '1968-09-16',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Mexico_(1934-1968).svg',
    wikidata_item_id: 'Q96',
    license: 'Public Domain',
    historical_rationale: "Tricolore messicano con la versione dello stemma dell'aquila su cactus codificata nel 1934 e usata fino al 1968.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/mx_1934.html',
  },
  {
    entity_id: 'ARG',
    match_codes: ['ARG', 'AR', 'ARGENTINA'],
    common_name: 'Repubblica Argentina',
    historical_name: 'República Argentina',
    valid_from: '1818-02-25',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Argentina.svg',
    wikidata_item_id: 'Q414',
    license: 'Public Domain',
    historical_rationale: "Bandiera ufficiale argentina a fasce celeste-bianco-celeste con Sol de Mayo dorato al centro.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ar.html',
  },
  {
    entity_id: 'CHL',
    match_codes: ['CHL', 'CL', 'CHILE', 'CILE'],
    common_name: 'Repubblica del Cile',
    historical_name: 'República de Chile',
    valid_from: '1817-10-18',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Chile.svg',
    wikidata_item_id: 'Q298',
    license: 'Public Domain',
    historical_rationale: "La Estrella Solitaria: bicolore bianco e rosso con cantone blu e stella bianca a cinque punte.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/cl.html',
  },
  {
    entity_id: 'COL',
    match_codes: ['COL', 'CO', 'COLOMBIA'],
    common_name: 'Repubblica di Colombia',
    historical_name: 'República de Colombia',
    valid_from: '1861-11-26',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Colombia.svg',
    wikidata_item_id: 'Q739',
    license: 'Public Domain',
    historical_rationale: "Tricolore orizzontale giallo (1/2), blu (1/4) e rosso (1/4).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/co.html',
  },
  {
    entity_id: 'PRU',
    match_codes: ['PRU', 'PER', 'PE', 'PERU', 'PERÙ'],
    common_name: 'Repubblica del Perù',
    historical_name: 'República del Perú (Bandera de Estado con Escudo)',
    valid_from: '1825-02-25',
    valid_to: '1950-03-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Peru_(1825–1950).svg',
    wikidata_item_id: 'Q419',
    license: 'Public Domain',
    historical_rationale: "Tricolore verticale rosso-bianco-rosso con lo scudo nazionale disegnato secondo la legge del 1825 prima del decreto di Odría del 1950.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/pe-hist.html',
  },
  {
    entity_id: 'VEN_1930',
    match_codes: ['VEN', 'VE', 'VENEZUELA'],
    common_name: 'Stati Uniti del Venezuela',
    historical_name: 'Estados Unidos de Venezuela (7 Stelle — Legge del 15 Luglio 1930)',
    valid_from: '1930-07-15',
    valid_to: '1954-02-16',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Venezuela_(1930–2006).svg',
    wikidata_item_id: 'Q717',
    license: 'Public Domain',
    historical_rationale: "Tricolore giallo-blu-rosso con sette stelle bianche ad arco introdotto dalla legge del 15 luglio 1930.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ve-1930.html',
  },
  {
    entity_id: 'ECU',
    match_codes: ['ECU', 'EC', 'ECUADOR'],
    common_name: 'Repubblica dell\'Ecuador',
    historical_name: 'República del Ecuador',
    valid_from: '1900-11-07',
    valid_to: '2009-11-16',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Ecuador.svg',
    wikidata_item_id: 'Q736',
    license: 'Public Domain',
    historical_rationale: "Tricolore giallo-blu-rosso caricato dello stemma dell'Ecuador adottato dal decreto legislativo del 1900.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ec.html',
  },
  {
    entity_id: 'BOL',
    match_codes: ['BOL', 'BO', 'BOLIVIA'],
    common_name: 'Repubblica di Bolivia',
    historical_name: 'República de Bolivia',
    valid_from: '1851-10-31',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Bolivia_(state).svg',
    wikidata_item_id: 'Q750',
    license: 'Public Domain',
    historical_rationale: "Tricolore rosso-giallo-verde caricato dello stemma di Stato della Bolivia.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/bo.html',
  },
  {
    entity_id: 'PAR_1842',
    match_codes: ['PAR', 'PY', 'PRY', 'PARAGUAY'],
    common_name: 'Repubblica del Paraguay',
    historical_name: 'República del Paraguay (1842–1954)',
    valid_from: '1842-11-25',
    valid_to: '1954-07-14',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Paraguay_(1842–1954).svg',
    wikidata_item_id: 'Q733',
    license: 'Public Domain',
    historical_rationale: "Tricolore rosso-bianco-blu con lo stemma della Repubblica al dritto (1842–1954).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/py-hist.html',
  },
  {
    entity_id: 'URU',
    match_codes: ['URU', 'UY', 'URY', 'URUGUAY'],
    common_name: 'Repubblica Orientale dell\'Uruguay',
    historical_name: 'República Oriental del Uruguay',
    valid_from: '1830-07-11',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Uruguay.svg',
    wikidata_item_id: 'Q77',
    license: 'Public Domain',
    historical_rationale: "Pabellón Nacional con nove fasce bianco-blu e Sol de Mayo dorato nel cantone.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/uy.html',
  },
  {
    entity_id: 'CUB',
    match_codes: ['CUB', 'CU', 'CUBA'],
    common_name: 'Repubblica di Cuba',
    historical_name: 'República de Cuba',
    valid_from: '1902-05-20',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Cuba.svg',
    wikidata_item_id: 'Q241',
    license: 'Public Domain',
    historical_rationale: "Bandiera della Stella Solitaria adottata ufficialmente all'indipendenza del 20 maggio 1902.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/cu.html',
  },
  {
    entity_id: 'DOM',
    match_codes: ['DOM', 'DO', 'DOMINICAN_REPUBLIC', 'REPUBBLICA_DOMINICANA'],
    common_name: 'Repubblica Dominicana',
    historical_name: 'República Dominicana',
    valid_from: '1844-11-06',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_Dominican_Republic.svg',
    wikidata_item_id: 'Q786',
    license: 'Public Domain',
    historical_rationale: "Croce bianca tra quarti blu e rossi caricata dello stemma nazionale dominicano.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/do.html',
  },
  {
    entity_id: 'HAI_1859',
    match_codes: ['HAI', 'HT', 'HTI', 'HAITI'],
    common_name: 'Repubblica di Haiti',
    historical_name: 'République d\'Haïti (Bicolore Blu-Rosso 1859–1964)',
    valid_from: '1859-01-15',
    valid_to: '1964-06-21',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Haiti_(1820–1849,_1859–1964).svg',
    wikidata_item_id: 'Q790',
    license: 'Public Domain',
    historical_rationale: "Bicolore orizzontale blu e rosso con lo stemma haitiano su pannello bianco (prima del cambio nero-rosso di Duvalier nel 1964).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ht-hist.html',
  },
  {
    entity_id: 'GTM',
    match_codes: ['GTM', 'GT', 'GUATEMALA'],
    common_name: 'Repubblica del Guatemala',
    historical_name: 'República de Guatemala',
    valid_from: '1871-08-17',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Guatemala.svg',
    wikidata_item_id: 'Q774',
    license: 'Public Domain',
    historical_rationale: "Tricolore verticale azzurro-bianco-azzurro con lo stemma del Quetzal e della pergamena 'Libertad 15 de Septiembre de 1821'.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/gt.html',
  },
  {
    entity_id: 'SLV',
    match_codes: ['SLV', 'SV', 'EL_SALVADOR'],
    common_name: 'Repubblica di El Salvador',
    historical_name: 'República de El Salvador',
    valid_from: '1912-05-17',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_El_Salvador.svg',
    wikidata_item_id: 'Q792',
    license: 'Public Domain',
    historical_rationale: "Tricolore centroamericano blu-bianco-blu con lo stemma dei cinque vulcani.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/sv.html',
  },
  {
    entity_id: 'HND',
    match_codes: ['HND', 'HN', 'HON', 'HONDURAS'],
    common_name: 'Repubblica dell\'Honduras',
    historical_name: 'República de Honduras',
    valid_from: '1866-02-16',
    valid_to: '2022-01-27',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Honduras_(1949–2022).svg',
    wikidata_item_id: 'Q783',
    license: 'Public Domain',
    historical_rationale: "Tricolore centroamericano blu cobalto e bianco con cinque stelle blu.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/hn.html',
  },
  {
    entity_id: 'NIC',
    match_codes: ['NIC', 'NI', 'NICARAGUA'],
    common_name: 'Repubblica del Nicaragua',
    historical_name: 'República de Nicaragua',
    valid_from: '1908-09-04',
    valid_to: '1971-08-27',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Nicaragua_(1908–1971).svg',
    wikidata_item_id: 'Q811',
    license: 'Public Domain',
    historical_rationale: "Tricolore blu-bianco-blu con triangolo e arcobaleno storico adottato nel 1908.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/ni.html',
  },
  {
    entity_id: 'CRI',
    match_codes: ['CRI', 'CR', 'CRC', 'COSTA_RICA'],
    common_name: 'Repubblica di Costa Rica',
    historical_name: 'República de Costa Rica (Bandera de Estado)',
    valid_from: '1906-11-27',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Costa_Rica_(state).svg',
    wikidata_item_id: 'Q800',
    license: 'Public Domain',
    historical_rationale: "Bandiera di Stato della Costa Rica a cinque bande blu-bianco-rosso-bianco-blu con stemma nazionale dei sette astri e vulcani.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/cr.html',
  },
  {
    entity_id: 'PAN',
    match_codes: ['PAN', 'PA', 'PANAMA'],
    common_name: 'Repubblica di Panama',
    historical_name: 'República de Panamá',
    valid_from: '1903-11-03',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Panama.svg',
    wikidata_item_id: 'Q804',
    license: 'Public Domain',
    historical_rationale: "Inquartato bianco con stella blu, rosso, blu e bianco con stella rossa (Legge 64 del 1904).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/pa.html',
  },
  // GIUGNO 1949: NUOVE ENTITÀ STATALI VERIFICATE (RFT / BRD & STATO DEL VIETNAM)
  {
    entity_id: 'BRD_1949',
    match_codes: ['BRD', 'RFT', 'FRG', 'WEST_GERMANY', 'GERMANIA_OVEST', 'BUNDESREPUBLIK_DEUTSCHLAND'],
    common_name: 'Repubblica Federale Tedesca (Germania Ovest)',
    historical_name: 'Bundesrepublik Deutschland (Grundgesetz — Bonn, 23 Maggio 1949)',
    valid_from: '1949-05-23',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Germany.svg',
    wikidata_item_id: 'Q713750',
    license: 'Public Domain',
    historical_rationale: "Tricolore nero-rosso-oro in proporzioni 3:5 sancito dall'Art. 22 della Legge Fondamentale (Grundgesetz) promulgata a Bonn il 23 maggio 1949.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/de.html',
  },
  {
    entity_id: 'SVN_1949',
    match_codes: ['SVN', 'QGVN', 'STATE_OF_VIETNAM', 'STATO_DEL_VIETNAM', 'QUOC_GIA_VIET_NAM', 'BAO_DAI_VIETNAM'],
    common_name: 'Stato del Vietnam',
    historical_name: 'Quốc gia Việt Nam (Accordi dell\'Eliseo / Bảo Đại — 14 Giugno 1949)',
    valid_from: '1949-06-02',
    valid_to: '1975-04-30',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_South_Vietnam.svg',
    wikidata_item_id: 'Q1193879',
    license: 'Public Domain',
    historical_rationale: "Bandiera nazionale gialla con tre bande orizzontali rosse (Cờ vàng ba sọc đỏ) adottata dal Governo Centrale Provvisorio del Vietnam il 2 giugno 1948/1949 e confermata ufficialmente nello Stato del Vietnam di Bảo Đại (giugno 1949).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/vn-south.html',
  },

  // REPUBBLICA POPOLARE CINESE — RPC (1° ottobre 1949: Bandiera Rossa a Cinque Stelle)
  {
    entity_id: 'PRC_1949',
    match_codes: ['CCP_CHI', 'CCP', 'PRC', 'RPC', 'CHINA_PRC', 'PEOPLES_REPUBLIC_OF_CHINA'],
    common_name: 'Repubblica Popolare Cinese (RPC)',
    historical_name: 'Zhōnghuá Rénmín Gònghéguó (Proclamazione di Mao Zedong — 1° Ottobre 1949)',
    valid_from: '1949-10-01',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: "Flag_of_the_People's_Republic_of_China.svg",
    wikidata_item_id: 'Q148',
    license: 'Public Domain',
    historical_rationale: "Bandiera rossa a cinque stelle gialle (Wǔxīng Hóngqí), disegnata da Zeng Liansong e issata per la prima volta in Piazza Tiananmen a Pechino il 1° ottobre 1949 alla proclamazione della RPC.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/cn.html',
  },

  // REPUBBLICA DEMOCRATICA TEDESCA — GERMANIA EST (7 ottobre 1949 – 30 settembre 1959: senza emblema)
  {
    entity_id: 'DDR_1949',
    match_codes: ['DDR', 'RDT', 'GDR', 'EAST_GERMANY', 'GERMANIA_EST', 'DEUTSCHE_DEMOKRATISCHE_REPUBLIK'],
    common_name: 'Repubblica Democratica Tedesca (Germania Est)',
    historical_name: 'Deutsche Demokratische Republik (7 Ottobre 1949 – 30 Settembre 1959 — Tricolore senza emblema)',
    valid_from: '1949-10-07',
    valid_to: '1959-09-30',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Germany.svg',
    wikidata_item_id: 'Q16957',
    license: 'Public Domain',
    historical_rationale: "Dal 7 ottobre 1949 fino al 1° ottobre 1959 la RDT/DDR adottò il tricolore nero-rosso-oro senza alcuno stemma centrale (l'emblema con martello, compasso e spighe venne aggiunto solo con la legge del 1° ottobre 1959).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/de_ddr49.html',
  },

  // REPUBBLICA POPOLARE UNGHERESE — RÁKOSI COAT OF ARMS (20 agosto 1949 – 1956)
  {
    entity_id: 'HUN_1949',
    match_codes: ['HUN', 'HU', 'HUNGARY', 'UNGHERIA', 'MAGYAR_NEPKOZTARSASAG', 'HUNGARIAN_PEOPLES_REPUBLIC'],
    common_name: 'Repubblica Popolare Ungherese',
    historical_name: 'Magyar Népköztársaság (Costituzione del 20 Agosto 1949 — Stemma di Rákosi)',
    valid_from: '1949-08-20',
    valid_to: '1956-10-22',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Hungary_(1949-1956).svg',
    wikidata_item_id: 'Q43310',
    license: 'Public Domain',
    historical_rationale: "Tricolore rosso-bianco-verde caricato dello stemma socialista di Rákosi (stella rossa, spighe di grano, martello e spiga d'oro), adottato il 20 agosto 1949 con la Costituzione della Repubblica Popolare Ungherese.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/hu_1949.html',
  },

  // STATI UNITI D'INDONESIA — REPUBLIK INDONESIA SERIKAT (27 dicembre 1949 – 16 agosto 1950)
  {
    entity_id: 'RIS_1949',
    match_codes: ['RIS', 'IDN', 'INDONESIA', 'REPUBLIK_INDONESIA_SERIKAT', 'UNITED_STATES_OF_INDONESIA'],
    common_name: 'Stati Uniti d\'Indonesia (RIS)',
    historical_name: 'Republik Indonesia Serikat (Trasferimento di Sovranità — 27 Dicembre 1949)',
    valid_from: '1949-12-27',
    valid_to: '1950-08-16',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Indonesia.svg',
    wikidata_item_id: 'Q252',
    license: 'Public Domain',
    historical_rationale: "Sang Saka Merah-Putih confermata come bandiera sovrana della federazione degli Stati Uniti d'Indonesia (RIS) dal trasferimento di sovranità del 27 dicembre 1949 fino alla dissoluzione della federazione il 17 agosto 1950.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/id.html',
  },

  // REPUBBLICA D'INDONESIA — STATO UNITARIO (17 agosto 1950)
  {
    entity_id: 'IDN_UNITARY_1950',
    match_codes: ['IDN', 'INA', 'INDONESIA', 'REPUBLIK_INDONESIA'],
    common_name: 'Repubblica d\'Indonesia (Stato Unitario)',
    historical_name: 'Republik Indonesia (Sang Saka Merah-Putih — Stato Unitario dal 17 Agosto 1950)',
    valid_from: '1950-08-17',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Indonesia.svg',
    wikidata_item_id: 'Q252',
    license: 'Public Domain',
    historical_rationale: "Con la Costituzione Provvisoria del 17 agosto 1950 viene sciolta la federazione degli Stati Uniti d'Indonesia (RIS) e aboliti gli Stati federati (NST e NIT); il bicolore Sang Saka Merah-Putih diventa l'insegna unica dell'intero Stato unitario.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/id.html',
  },

  // REGNO DEL LAOS — STATO ASSOCIATO NELL'UNIONE FRANCESE (19 luglio 1949)
  {
    entity_id: 'LAO_1949',
    match_codes: ['LAO', 'LAOS', 'KINGDOM_OF_LAOS', 'REGNO_DEL_LAOS'],
    common_name: 'Regno del Laos',
    historical_name: 'Kingdom of Laos (Stato Associato nell\'Unione Francese — Convenzione 19 Luglio 1949)',
    valid_from: '1949-07-19',
    valid_to: '1975-12-02',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Laos_(1952–1975).svg',
    wikidata_item_id: 'Q870055',
    license: 'Public Domain',
    historical_rationale: "Bandiera cremisi con l'elefante bianco a tre teste Erawan sormontato dal parasole reale su piedistallo a cinque gradini, vessillo ufficiale del Regno del Laos riconosciuto Stato Associato nell'Unione Francese dalla Convenzione del 19 luglio 1949.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/la_k.html',
  },

  // REGNO DI CAMBOGIA — STATO ASSOCIATO NELL'UNIONE FRANCESE (8 novembre 1949)
  {
    entity_id: 'CAM_1949',
    match_codes: ['CAM', 'KHM', 'CAMBODIA', 'CAMBOGIA', 'KINGDOM_OF_CAMBODIA'],
    common_name: 'Regno di Cambogia',
    historical_name: 'Kingdom of Cambodia (Stato Associato nell\'Unione Francese — Trattato 8 Novembre 1949)',
    valid_from: '1949-11-08',
    valid_to: '1970-10-09',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Cambodia.svg',
    wikidata_item_id: 'Q2638486',
    license: 'Public Domain',
    historical_rationale: "Tricolore orizzontale blu-rosso-blu caricato dell'effigie bianca di Angkor Wat, bandiera del Regno di Cambogia riconosciuto Stato Associato nell'Unione Francese con il trattato franco-cambogiano dell'8 novembre 1949.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/kh.html',
  },

  // REPUBBLICA DI COREA — STANDARDIZZAZIONE TAEGEUKGI (15 ottobre 1949)
  {
    entity_id: 'ROK_1949',
    match_codes: ['ROK', 'KR', 'KOR', 'SOUTH_KOREA', 'COREA_DEL_SUD'],
    common_name: 'Repubblica di Corea (Corea del Sud)',
    historical_name: 'Daehan Minguk (Taegeukgi standardizzato — 15 Ottobre 1949)',
    valid_from: '1949-10-15',
    valid_to: '1984-02-20',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_South_Korea_(1949–1984).svg',
    wikidata_item_id: 'Q884',
    license: 'Public Domain',
    historical_rationale: "Standardizzazione geometrica ufficiale del Taegeukgi promulgata dal governo di Seul il 15 ottobre 1949.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/kr.html',
  },

  // STATO DELL'INDONESIA ORIENTALE — NEGARA INDONESIA TIMUR (24 dicembre 1946 – 17 agosto 1950)
  {
    entity_id: 'NIT_1946',
    match_codes: ['NIT', 'NEGARA_INDONESIA_TIMUR', 'STATE_OF_EAST_INDONESIA'],
    common_name: 'Stato dell\'Indonesia Orientale (NIT)',
    historical_name: 'Negara Indonesia Timur (24 Dicembre 1946 – 17 Agosto 1950)',
    valid_from: '1946-12-24',
    valid_to: '1950-08-16',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_State_of_East_Indonesia.svg',
    wikidata_item_id: 'Q1344845',
    license: 'Public Domain',
    historical_rationale: "Quattro bande orizzontali rosso, bianco, blu e verde dello Stato federale dell'Indonesia Orientale (NIT) con capitale Makassar.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/id-nit.html',
  },

  // AMMINISTRAZIONE FIDUCIARIA ITALIANA DELLA SOMALIA — AFIS (1° aprile 1950)
  {
    entity_id: 'AFIS_1950',
    match_codes: ['AFIS', 'SOM_AFIS', 'TRUST_TERRITORY_OF_SOMALILAND', 'AMMINISTRAZIONE_FIDUCIARIA_ITALIANA_DELLA_SOMALIA'],
    common_name: 'Amministrazione Fiduciaria Italiana della Somalia (AFIS)',
    historical_name: 'Trust Territory of Somaliland under Italian Administration (AFIS — Bandiera ONU & Tricolore Italiano, 1° Aprile 1950)',
    valid_from: '1950-04-01',
    valid_to: '1960-06-30',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_the_United_Nations.svg',
    wikidata_item_id: 'Q1642095',
    license: 'Public Domain',
    historical_rationale: "Dal 1° aprile 1950 nell'Amministrazione Fiduciaria Italiana della Somalia (mandato ONU decennale) vengono esposte congiuntamente la bandiera delle Nazioni Unite e il Tricolore della Repubblica Italiana.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/so-afis.html',
  },

  // REPUBBLICA DELLE MOLUCCHE MERIDIONALI — RMS (25 aprile 1950)
  {
    entity_id: 'RMS_1950',
    match_codes: ['RMS', 'REPUBLIK_MALUKU_SELATAN', 'SOUTH_MOLUCCAS', 'MOLUCCHE_MERIDIONALI'],
    common_name: 'Repubblica delle Molucche Meridionali (RMS)',
    historical_name: 'Republik Maluku Selatan (Benang Raja — Proclamata ad Ambon il 25 Aprile 1950)',
    valid_from: '1950-04-25',
    valid_to: '1963-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_South_Moluccas.svg',
    wikidata_item_id: 'Q738694',
    license: 'Public Domain',
    historical_rationale: "Benang Raja a quattro strisce verticali blu, bianco, verde sul lato dell'asta e ampio campo rosso sul battente (1:2:1:6), issata dalla Repubblica delle Molucche Meridionali ad Ambon il 25 aprile 1950.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/id-rms.html',
  },

  // FEDERAZIONE DELLA MALESIA — 11 STRISCE E STELLA A 11 PUNTE (26 maggio 1950 – 15 settembre 1963)
  {
    entity_id: 'MAL_FED_1950',
    match_codes: ['MAL', 'FOM', 'FEDERATION_OF_MALAYA', 'FEDERAZIONE_DELLA_MALESIA', 'PERSEKUTUAN_TANAH_MELAYU'],
    common_name: 'Federazione della Malesia (1950–1963)',
    historical_name: 'Federation of Malaya / Persekutuan Tanah Melayu (11 Strisce & Stella a 11 Punte — 26 Maggio 1950)',
    valid_from: '1950-05-26',
    valid_to: '1963-09-15',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_Malaya_(1950–1963).svg',
    wikidata_item_id: 'Q1479726',
    license: 'Public Domain',
    historical_rationale: "Bandiera originale della Federazione della Malesia adottata il 19 maggio 1950 e issata il 26 maggio 1950: 11 strisce alternate rosse e bianche e stella a 11 punte giallo oro con mezzaluna su cantone blu scuro (le 14 strisce/punte arrivano solo nel settembre 1963).",
    fotw_url: 'https://www.crwflags.com/fotw/flags/my_1950.html',
  },

  // COMANDO DELLE NAZIONI UNITE IN COREA — UNC (7 luglio 1950)
  {
    entity_id: 'UNC_1950',
    match_codes: ['UNC', 'ROK_UNC', 'UN_COMMAND_KOREA', 'COMANDO_ONU_COREA'],
    common_name: 'Comando delle Nazioni Unite in Corea (UNC)',
    historical_name: 'United Nations Command Korea (Risoluzione ONU 84 del 7 Luglio 1950)',
    valid_from: '1950-07-07',
    valid_to: '1953-07-27',
    flag_status: 'official',
    flag_category: 'state_war',
    file_name: 'Flag_of_the_United_Nations.svg',
    wikidata_item_id: 'Q482411',
    license: 'Public Domain',
    historical_rationale: "Istituito con la Risoluzione 84 del Consiglio di Sicurezza ONU del 7 luglio 1950 sotto il comando del Gen. Douglas MacArthur a fianco della Repubblica di Corea: affianca la bandiera delle Nazioni Unite al Taegeukgi sudcoreano.",
    fotw_url: 'https://www.crwflags.com/fotw/flags/uno.html',
  },
];

/**
 * Normalizes input key (entity ID, country code, or nation name)
 */
function normalizeKey(str: string): string {
  return (str || '')
    .toUpperCase()
    .trim()
    .replace(/[^A-Z0-9_]/g, '_');
}

/**
 * Core Resolver: Resolves the authoritative historical flag for an entity at a given calendar date or step index.
 * Enforces strict validity window checking, anti-anachronism rules, and Wikimedia Commons direct SVG extraction.
 */
export function resolveHistoricalFlag(
  entityOrCode: string,
  dateOrStep: string | number = '1939-09-01'
): HistoricalFlagMetadata | null {
  const targetDate: string =
    typeof dateOrStep === 'number'
      ? getStepExactDate(dateOrStep)
      : (dateOrStep || '1939-09-01').trim();

  const normTarget = normalizeKey(entityOrCode);

  // Filter candidates matching entity code or alias
  const candidates = HISTORICAL_FLAG_REGISTRY.filter((f) => {
    if (f.entity_id.toUpperCase() === normTarget) return true;
    return f.match_codes.some((c) => normalizeKey(c) === normTarget);
  });

  if (candidates.length === 0) {
    return null;
  }

  // Find the exact candidate whose validity window covers targetDate
  const match = candidates.find((c) => isDateInWindow(targetDate, c.valid_from, c.valid_to));
  if (!match) {
    return null;
  }

  const directSvgUrl = buildWikimediaCommonsSvgUrl(match.file_name);
  const commonsPage = buildWikimediaCommonsPageUrl(match.file_name);

  return {
    entity_id: match.entity_id,
    common_name: match.common_name,
    historical_name_at_date: match.historical_name,
    query_date: targetDate,
    flag_status: match.flag_status,
    flag_category: match.flag_category,
    validity_window: {
      valid_from: match.valid_from,
      valid_to: match.valid_to,
    },
    asset: {
      file_name: match.file_name,
      source_repository: 'Wikimedia Commons',
      direct_svg_url: directSvgUrl,
      commons_page: commonsPage,
      license: match.license,
    },
    historical_rationale: match.historical_rationale,
    flags_of_the_world_ref: match.fotw_url,
    wikidata_item_id: match.wikidata_item_id,
  };
}

/**
 * Convenience helper to get flag metadata for a step index
 */
export function getFlagMetadataForStep(
  ownerCode: string,
  step: number
): HistoricalFlagMetadata | null {
  return resolveHistoricalFlag(ownerCode, step);
}

/**
 * Guardrail verification: Validates that a flag metadata object has no anachronisms
 */
export function validateFlagAgainstAnachronism(
  metadata: HistoricalFlagMetadata,
  targetDate: string
): { isValid: boolean; reason?: string } {
  if (!isDateInWindow(targetDate, metadata.validity_window.valid_from, metadata.validity_window.valid_to)) {
    return {
      isValid: false,
      reason: `Flag ${metadata.asset.file_name} is valid only between ${metadata.validity_window.valid_from} and ${metadata.validity_window.valid_to}, but was queried for ${targetDate}`,
    };
  }

  // Guardrail 1: USA 48 stars during WWII (no 50 stars before 1959)
  if (metadata.entity_id === 'USA_48' && targetDate >= '1959-07-04') {
    return {
      isValid: false,
      reason: 'USA 48-star flag is anachronistic after July 4, 1959',
    };
  }

  // Guardrail 2: Italian Monarchy vs Republic (June 19, 1946 threshold)
  if (metadata.entity_id === 'ITA_MONARCHY' && targetDate >= '1946-06-19') {
    return {
      isValid: false,
      reason: 'Sabaudian monarchy flag is anachronistic after the Presidential Decree of June 19, 1946',
    };
  }
  if (metadata.entity_id === 'IT_1947' && targetDate < '1946-06-19') {
    return {
      isValid: false,
      reason: 'Republican tricolore without Savoya shield is anachronistic before June 19, 1946',
    };
  }

  // Guardrail 3: German C-Pennant only post-May 8, 1945
  if (metadata.entity_id === 'GER_ALLIED_CONTROL' && targetDate < '1945-05-09') {
    return {
      isValid: false,
      reason: 'Allied Control Council C-Pennant is invalid before the German capitulation on May 8, 1945',
    };
  }

  // Guardrail 4: Austria Second Republic (broken chains from May 1, 1945) vs Ständestaat
  if (metadata.entity_id === 'AUS_STANDESTAAT' && targetDate >= '1938-03-13') {
    return {
      isValid: false,
      reason: 'Austrofascist Ständestaat double-headed eagle flag is anachronistic after the Anschluss / in the 1945–1947 Second Republic',
    };
  }
  if (metadata.entity_id === 'AUS_SECOND_REP' && targetDate < '1945-05-01') {
    return {
      isValid: false,
      reason: 'Second Austrian Republic broken-chains state flag is invalid before May 1, 1945',
    };
  }

  // Guardrail 5: Hungary Second Republic (Kossuth arms Feb 1, 1946) vs Kingdom St. Stephen Crown
  if (metadata.entity_id === 'HUN_KINGDOM' && targetDate >= '1946-02-01') {
    return {
      isValid: false,
      reason: 'Kingdom of Hungary crown coat of arms is anachronistic after the proclamation of the Second Republic on February 1, 1946',
    };
  }

  // Guardrail 6: Romania RPR proclamation (Dec 30, 1947) & Bulgaria Dimitrov Constitution (Dec 4, 1947)
  if (metadata.entity_id === 'ROM_KINGDOM' && targetDate >= '1947-12-30') {
    return {
      isValid: false,
      reason: 'Kingdom of Romania royal insignia is anachronistic after King Michael I abdicated on December 30, 1947',
    };
  }
  if (metadata.entity_id === 'BUL_PR_1946' && targetDate >= '1947-12-04') {
    return {
      isValid: false,
      reason: 'Transitional 1946 Bulgarian flag was superseded by the Dimitrov Constitution (Art. 96) on December 4, 1947',
    };
  }

  // Guardrail 7: Mongolia Soyombo tricolor only from July 10, 1945
  if (metadata.entity_id === 'MON_1945' && targetDate < '1945-07-10') {
    return {
      isValid: false,
      reason: 'Mongolian Soyombo red-blue-red tricolor was adopted on July 10, 1945',
    };
  }

  // Guardrail 8: 1948 newly independent states & April 1948 Romanian Constitution flag
  if (metadata.entity_id === 'BUR_1948' && targetDate < '1948-01-04') {
    return {
      isValid: false,
      reason: 'Union of Burma flag is anachronistic before Burmese independence on January 4, 1948',
    };
  }
  if (metadata.entity_id === 'CEY_1948' && targetDate < '1948-02-04') {
    return {
      isValid: false,
      reason: 'Dominion of Ceylon Lion flag is anachronistic before independence on February 4, 1948',
    };
  }
  if (metadata.entity_id === 'ISR_1948' && targetDate < '1948-05-14') {
    return {
      isValid: false,
      reason: 'State of Israel flag is anachronistic before the Israeli Declaration of Independence on May 14, 1948',
    };
  }
  if (metadata.entity_id === 'ROM_RPR_1947' && targetDate >= '1948-04-13') {
    return {
      isValid: false,
      reason: 'Transitional plain RPR tricolor was superseded by the April 13, 1948 Constitution state flag with RPR emblem',
    };
  }

  // Guardrail 9: Late-1948 entities (ROK, PRK, All-Palestine, NSS, NJT) must never appear before proclamation
  if (metadata.entity_id === 'ROK_1948' && targetDate < '1948-08-15') {
    return {
      isValid: false,
      reason: 'Republic of Korea flag is anachronistic before South Korean independence on August 15, 1948',
    };
  }
  if (metadata.entity_id === 'PRK_1948' && targetDate < '1948-09-08') {
    return {
      isValid: false,
      reason: 'DPRK flag is anachronistic before its adoption on September 8, 1948',
    };
  }
  if (metadata.entity_id === 'APG_1948' && targetDate < '1948-09-22') {
    return {
      isValid: false,
      reason: 'All-Palestine Government flag is anachronistic before Gaza proclamation on September 22, 1948',
    };
  }
  if (metadata.entity_id === 'NSS_1948' && targetDate < '1948-08-30') {
    return {
      isValid: false,
      reason: 'Negara Sumatera Selatan flag is anachronistic before August 30, 1948',
    };
  }
  if (metadata.entity_id === 'NJT_1948' && targetDate < '1948-11-26') {
    return {
      isValid: false,
      reason: 'Negara Jawa Timur flag is anachronistic before November 26, 1948',
    };
  }

  // Guardrail 10: Mid-1949 entities (BRD/RFT May 23, 1949 & State of Vietnam June 1949)
  if (metadata.entity_id === 'BRD_1949' && targetDate < '1949-05-23') {
    return {
      isValid: false,
      reason: 'Federal Republic of Germany (BRD) flag is anachronistic before the Grundgesetz of May 23, 1949',
    };
  }
  if (metadata.entity_id === 'SVN_1949' && targetDate < '1949-06-02') {
    return {
      isValid: false,
      reason: 'State of Vietnam flag is anachronistic before the June 1949 State of Vietnam establishment',
    };
  }

  // Guardrail 11: H2 1949 entities (PRC, DDR without emblem, HUN People's Republic, RIS, Laos, Cambodia, ROK 1949)
  if (metadata.entity_id === 'PRC_1949' && targetDate < '1949-10-01') {
    return {
      isValid: false,
      reason: 'PRC Five-Star Red Flag is anachronistic before October 1, 1949 proclamation in Beijing',
    };
  }
  if (metadata.entity_id === 'DDR_1949' && targetDate < '1949-10-07') {
    return {
      isValid: false,
      reason: 'DDR flag is anachronistic before October 7, 1949 founding of East Germany',
    };
  }
  if (metadata.entity_id === 'DDR_1949' && targetDate >= '1959-10-01') {
    return {
      isValid: false,
      reason: 'Plain black-red-gold DDR flag ended on October 1, 1959 when hammer-and-compass emblem was added',
    };
  }
  if (metadata.entity_id === 'HUN_1949' && targetDate < '1949-08-20') {
    return {
      isValid: false,
      reason: 'Hungarian People\'s Republic (Rákosi emblem) flag is anachronistic before August 20, 1949 Constitution',
    };
  }
  if (metadata.entity_id === 'RIS_1949' && targetDate < '1949-12-27') {
    return {
      isValid: false,
      reason: 'United States of Indonesia (RIS) sovereignty flag metadata applies from December 27, 1949 transfer',
    };
  }
  if (metadata.entity_id === 'LAO_1949' && targetDate < '1949-07-19') {
    return {
      isValid: false,
      reason: 'Kingdom of Laos Associated State flag is anachronistic before July 19, 1949 Franco-Lao Convention',
    };
  }
  if (metadata.entity_id === 'CAM_1949' && targetDate < '1949-11-08') {
    return {
      isValid: false,
      reason: 'Kingdom of Cambodia Associated State flag is anachronistic before November 8, 1949 treaty',
    };
  }
  if (metadata.entity_id === 'ROK_1949' && targetDate < '1949-10-15') {
    return {
      isValid: false,
      reason: '1949 standardized ROK Taegeukgi is anachronistic before October 15, 1949 adoption',
    };
  }

  // Guardrail 12: H1 1950 entities (India Republic Jan 26, AFIS Somalia Apr 1, RMS Ambon Apr 25, Malaya 11-stripe May 26)
  if (metadata.entity_id === 'IND_REP_1950' && targetDate < '1950-01-26') {
    return {
      isValid: false,
      reason: 'Republic of India flag status applies from January 26, 1950 Constitution',
    };
  }
  if (metadata.entity_id === 'AFIS_1950' && (targetDate < '1950-04-01' || targetDate > '1960-06-30')) {
    return {
      isValid: false,
      reason: 'AFIS Somaliland UN trusteeship flag is valid only between April 1, 1950 and June 30, 1960',
    };
  }
  if (metadata.entity_id === 'RMS_1950' && targetDate < '1950-04-25') {
    return {
      isValid: false,
      reason: 'Republic of South Moluccas (RMS) Benang Raja flag is anachronistic before April 25, 1950 proclamation',
    };
  }
  if (metadata.entity_id === 'MAL_FED_1950' && (targetDate < '1950-05-26' || targetDate > '1963-09-15')) {
    return {
      isValid: false,
      reason: 'Federation of Malaya 11-stripe / 11-point star flag is valid only from May 26, 1950 to September 15, 1963 (before 14-stripe Malaysia flag)',
    };
  }

  // Guardrail 13: H2 1950 entities (UNC Korea July 7, Unitary Republic of Indonesia Aug 17 abolishing RIS/NST/NIT)
  if (metadata.entity_id === 'UNC_1950' && targetDate < '1950-07-07') {
    return {
      isValid: false,
      reason: 'United Nations Command (UNC) Korea insignia is anachronistic before UNSC Resolution 84 of July 7, 1950',
    };
  }
  if (metadata.entity_id === 'IDN_UNITARY_1950' && targetDate < '1950-08-17') {
    return {
      isValid: false,
      reason: 'Unitary Republic of Indonesia status is anachronistic before the August 17, 1950 dissolution of the RIS federation',
    };
  }
  if ((metadata.entity_id === 'RIS_1949' || metadata.entity_id === 'NST_1947' || metadata.entity_id === 'NIT_1946') && targetDate >= '1950-08-17') {
    return {
      isValid: false,
      reason: 'RIS and federal Negara flags (NST, NIT) were dissolved into the unitary Republic of Indonesia on August 17, 1950',
    };
  }

  return { isValid: true };
}

/**
 * Exports JSON payload compliant with Section 5 of the Skill specification
 */
export function exportFlagPayloadJson(metadata: HistoricalFlagMetadata): string {
  return JSON.stringify(metadata, null, 2);
}
