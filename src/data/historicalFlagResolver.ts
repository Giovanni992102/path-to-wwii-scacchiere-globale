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
    file_name: 'Flag_of_Italy.svg',
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
    match_codes: ['ACC', 'ALLIED_CONTROL_COUNCIL', 'GER_1945', 'GER_OCCUPIED', 'ALLIIERTER_KONTROLLRAT'],
    common_name: 'Germania (Consiglio di Controllo Alleato)',
    historical_name: 'Alliierter Kontrollrat (Germania Occupata 1945–1949)',
    valid_from: '1945-05-08',
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
    valid_to: '9999-12-31',
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

  // DOMINION DELL'INDIA (1947)
  {
    entity_id: 'IND',
    match_codes: ['IND', 'IN', 'INDIA', 'DOMINION_OF_INDIA', 'INDIAN_UNION', 'UNIONE_INDIANA'],
    common_name: 'India',
    historical_name: 'Dominion dell\'India (Tiranga)',
    valid_from: '1947-07-22',
    valid_to: '9999-12-31',
    flag_status: 'official',
    flag_category: 'state_and_national',
    file_name: 'Flag_of_India.svg',
    wikidata_item_id: 'Q668',
    license: 'Public Domain',
    historical_rationale: "Tricolore orizzontale zafferano, bianco e verde con al centro la ruota della legge (Ashoka Chakra) a 24 raggi in blu marino, adottato dall'Assemblea Costituente il 22 luglio 1947 e divenuto la bandiera ufficiale del Dominion dell'India il 15 agosto 1947.",
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
    file_name: 'Flag_of_Hyderabad.svg',
    wikidata_item_id: 'Q1248037',
    license: 'Public Domain',
    historical_rationale: "Insegna di stato dei Nizam di Hyderabad con campo giallo oro, stemma Asaf Jahi e iscrizione Nizam-ul-Mulk, in uso fino all'annessione militare indiana (Operazione Polo) nel settembre 1948.",
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
    file_name: 'Flag_of_Jammu_and_Kashmir_(princely_state).svg',
    wikidata_item_id: 'Q118544',
    license: 'Public Domain',
    historical_rationale: "Insegna del Maharaja di Jammu e Kashmir con drappo rosso cremisi e stemma reale sormontato dal sole d'oro, adottata dalla dinastia Dogra sotto il Maharaja Hari Singh.",
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
    match_codes: ['AST', 'AU', 'AUS', 'AUSTRALIA'],
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
    match_codes: ['DSE', 'DIMOKRATIKOS_STRATOS', 'PDG'],
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
  if (metadata.entity_id === 'GER_ALLIED_CONTROL' && targetDate < '1945-05-08') {
    return {
      isValid: false,
      reason: 'Allied Control Council C-Pennant is invalid before the German capitulation on May 8, 1945',
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
