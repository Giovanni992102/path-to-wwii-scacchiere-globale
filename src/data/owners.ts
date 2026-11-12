import { OwnerConfig, FactionType, PoliticalTier } from '../types';

/**
 * ARCHITETTURA DATI DEI POSSESSORI CARTOGRAFICI E GERARCHIA POLITICA (1936-1940)
 *
 * Modellazione dati relazionale e gerarchica di primo livello:
 * 1. Codici univoci primari (ISO alpha-3 o codici geopolitici standard).
 * 2. Sistema gerarchico esplicito di sovranità:
 *    - Sovrani metropolitani (overlord: null)
 *    - Dominions (Commonwealth Britannico)
 *    - Colonie della Corona e Possedimenti d'Oltremare
 *    - Stati fantoccio / collaborazionisti / clienti
 *    - Protettorati e Mandati della Società delle Nazioni
 *    - Stati satelliti ideologici
 * 3. Dinamica temporale del legame di sovranità (es. Albania 1939, Etiopia 1936, Slovacchia 1939).
 * 4. Normalizzazione rigorosa degli alias (ISO-2, ISO-3, toponimi storici in IT/EN).
 * 5. Garanzia al 100% di zero regressioni retrocompatibili sulle proprietà grafiche ed etichette.
 */

export const CANONICAL_OWNERS: Record<string, OwnerConfig> = {
  // ==========================================
  // GRANDI POTENZE SOVRANE DELL'ASSE
  // ==========================================
  GER: {
    id: 'GER',
    c: '#4a545c',
    f: 'Asse',
    l: (s) => (s >= 6 ? 'Großdeutsches Reich' : 'Reich Tedesco'),
    shortName: 'Germania',
    leader: 'Adolf Hitler',
    capital: 'Berlin',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['DE', 'DEU', 'GERMANIA', 'GERMANY', 'REICH', 'DEUTSCHLAND', 'TERZO REICH'],
    isSubject: false,
  },
  ITA: {
    id: 'ITA',
    c: '#6f7a3f',
    f: 'Asse',
    l: (s) => (s >= 19 ? 'Repubblica Italiana (Governo De Gasperi — Assemblea Costituente)' : s >= 18 ? 'Regno d\'Italia (Governo Parri — Luogotenenza di Umberto II)' : s >= 14 ? 'Regno d\'Italia (Governo Bonomi — Roma Capitale Liberata & Cobelligeranza)' : s >= 13 ? 'Regno d\'Italia (Regno del Sud — Cobelligerante con gli Alleati)' : s >= 1 ? 'Regno d\'Italia (Impero AOI)' : 'Regno d\'Italia'),
    shortName: 'Italia',
    leader: 'Benito Mussolini (1936-43) / Re Vittorio Emanuele III & Pietro Badoglio (1943-44) — Ivanoe Bonomi (1944) — Ferruccio Parri (1945) — Alcide De Gasperi (1945-47)',
    capital: 'Roma / Brindisi',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['IT', 'ITA', 'ITALIA', 'ITALY', 'REGNO D\'ITALIA', 'REGNO DEL SUD', 'REGNO_DEL_SUD', 'REPUBBLICA ITALIANA', 'REPUBBLICA_ITALIANA', 'REPUBBLICA_IT'],
    isSubject: false,
  },
  JAP: {
    id: 'JAP',
    c: '#b33d4a',
    f: 'Asse',
    l: (s) => (s && s >= 10 ? 'Impero Giapponese (Dai Nippon Teikoku — Massima Espansione della Sfera di Co-Prosperità)' : 'Impero Giapponese (Dai Nippon Teikoku)'),
    shortName: 'Giappone',
    leader: 'Imperatore Hirohito / Fumimaro Konoe / Hideki Tōjō',
    capital: 'Tokyo',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['JP', 'JPN', 'GIAPPONE', 'JAPAN', 'DAI NIPPON'],
    isSubject: false,
  },

  // ==========================================
  // GRANDI POTENZE SOVRANE DEGLI ALLEATI
  // ==========================================
  UK: {
    id: 'UK',
    c: '#c46e66',
    f: 'Alleati',
    l: (s) =>
      s >= 18
        ? 'Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Laburista Attlee)'
        : s >= 6
        ? 'Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Churchill)'
        : s >= 1
        ? 'Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)'
        : 'Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Baldwin)',
    shortName: 'Gran Bretagna',
    leader: 'S. Baldwin (1936) / N. Chamberlain (1937-40) / W. Churchill (1940-45) / C. Attlee (1945-47)',
    capital: 'Londra',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['GB', 'GBR', 'UNITED_KINGDOM', 'UNITED KINGDOM', 'GRAN BRETAGNA', 'BRITAIN', 'INGHILTERRA'],
    isSubject: false,
  },
  FRA: {
    id: 'FRA',
    c: '#4c6a9c',
    f: 'Alleati',
    l: (s) =>
      s >= 19
        ? 'Quatrième République Française (Vincent Auriol / Paul Ramadier)'
        : s >= 14
        ? 'Governo Provvisorio della Repubblica Francese (GPRF — De Gaulle)'
        : s >= 12
        ? 'Comitato Francese di Liberazione Nazionale (CFLN)'
        : s >= 6
        ? 'Francia Libera (France Libre — De Gaulle)'
        : 'Repubblica Francese (Terza Repubblica)',
    shortName: 'Francia',
    leader: 'Albert Lebrun / Paul Reynaud / Charles de Gaulle (GPRF) / Vincent Auriol & Paul Ramadier (IV Rep.)',
    capital: 'Parigi (in esilio: Algeri)',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['FR', 'FRA', 'FRANCE', 'FRANCIA', 'REPUBBLICA FRANCESE', 'GPRF', 'CFLN'],
    isSubject: false,
  },
  USA: {
    id: 'USA',
    c: '#233f69',
    f: 'Alleati',
    l: (s) => (s >= 9 ? 'Stati Uniti d\'America (In Guerra — Post-Pearl Harbor & Arsenale delle Democrazie)' : s >= 5 ? 'Stati Uniti d\'America (Two-Ocean Navy & Riarmamento)' : 'Stati Uniti d\'America (Presidenza Roosevelt — New Deal)'),
    shortName: 'Stati Uniti',
    leader: 'Franklin Delano Roosevelt (32° Presidente — New Deal / Terzo Mandato nel 1940)',
    capital: 'Washington, D.C.',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['US', 'USA', 'STATI UNITI', 'UNITED STATES', 'AMERICA', 'STATI UNITI D\'AMERICA', 'ESTADOS UNIDOS', 'U.S.A.', 'U.S.'],
    isSubject: false,
  },
  CHI: {
    id: 'CHI',
    c: '#3d6c96',
    f: 'Alleati',
    l: (s) =>
      s >= 2
        ? 'Repubblica di Cina (Capitale di Guerra a Chongqing)'
        : 'Repubblica di Cina (Governo Nazionalista del Kuomintang)',
    shortName: 'Cina Nazionalista',
    leader: 'Generalissimo Chiang Kai-shek',
    capital: 'Nanchino (1936-37) / Chongqing (1938-1940)',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['CN', 'CHN', 'CHINA', 'CINA', 'REPUBBLICA DI CINA', 'ROC'],
    isSubject: false,
  },

  // ==========================================
  // BLOCCO COMINTERN (URSS E SATELLITI)
  // ==========================================
  SOV: {
    id: 'SOV',
    c: '#a33230',
    f: 'Comintern',
    l: (s) =>
      s >= 6
        ? 'Unione delle Repubbliche Socialiste Sovietiche (16 Repubbliche dell\'Unione)'
        : s >= 5
        ? 'Unione Sovietica (Patto Molotov-Ribbentrop & Espansione a Ovest)'
        : 'Unione delle Repubbliche Socialiste Sovietiche (URSS / SSSR)',
    shortName: 'URSS',
    leader: 'I.V. Stalin (Segr. Gen.) / V. Molotov (Sovnarkom) / M. Kalinin (Presidium)',
    capital: 'Mosca',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['SU', 'RU', 'RUS', 'URSS', 'SSSR', 'SOVIET_UNION', 'SOVIET UNION', 'RUSSIA', 'UNIONE SOVIETICA'],
    isSubject: false,
  },
  MON: {
    id: 'MON',
    c: '#742637',
    f: 'Comintern',
    l: () => 'Repubblica Popolare Mongola (Stato satellite dell\'URSS)',
    shortName: 'Mongolia',
    leader: 'Horloogijn Čojbalsan',
    capital: 'Ulaanbaatar',
    tier: 'satellite',
    overlordCode: 'SOV',
    aliases: ['MN', 'MNG', 'MONGOLIA', 'REPUBBLICA POPOLARE MONGOLA', 'MONGOLIAN PEOPLE\'S REPUBLIC'],
    isSubject: true,
  },
  TUV: {
    id: 'TUV',
    c: '#ba4e32',
    f: 'Comintern',
    l: () => 'Repubblica Popolare di Tannu Tuva (Stato indipendente fino al 1944)',
    shortName: 'Tannu Tuva',
    leader: 'Salchak Toka (Segretario Generale TPPR)',
    capital: 'Kyzyl (Khem-Beldir)',
    tier: 'satellite',
    overlordCode: 'SOV',
    aliases: ['TUVA', 'TYVA', 'TANNU_TUVA', 'TANNU TUVA'],
    isSubject: true,
  },
  CCP_CHI: {
    id: 'CCP_CHI',
    c: '#9e2d2b',
    f: 'Comintern',
    l: () => 'Partito Comunista Cinese (Regione di Frontiera Shaan-Gan-Ning / Yan\'an)',
    shortName: 'Base Rossa (PCC)',
    leader: 'Mao Zedong / Zhu De (8ª Armata di Strada)',
    capital: 'Yan\'an',
    tier: 'autonomous',
    overlordCode: null,
    aliases: ['CCP', 'PCC', 'YANAN', 'SHAAN-GAN-NING'],
    isSubject: false,
  },
  XIN: {
    id: 'XIN',
    c: '#657e55',
    f: 'Comintern',
    l: () => 'Governo Provinciale dello Xinjiang (Regime di Sheng Shicai filo-sovietico)',
    shortName: 'Xinjiang',
    leader: 'Generale Sheng Shicai (Duban)',
    capital: 'Dihua (Ürümqi)',
    tier: 'autonomous',
    overlordCode: null,
    aliases: ['SINKIANG', 'XINJIANG'],
    isSubject: false,
  },
  ETR: {
    id: 'ETR',
    c: '#267847',
    f: 'Comintern',
    l: (s) =>
      s >= 19
        ? 'Seconda Repubblica del Turkestan Orientale (Tre Distretti: Ili, Tarbagatay & Altay — Ehmetjan Qasimi)'
        : 'Seconda Repubblica del Turkestan Orientale (Shärqiy Türkistan Jumhuriyiti — Ghulja)',
    shortName: 'Turkestan Orientale (2ª ETR)',
    leader: 'Alikhan Töre (1944–1946) · Ehmetjan Qasimi (1946–1949)',
    capital: 'Ghulja (Yining)',
    tier: 'autonomous',
    overlordCode: null,
    aliases: ['ETR', 'EAST_TURKESTAN', 'SECOND_ETR', 'TURKESTAN_ORIENTALE', 'THREE_DISTRICTS', 'ILI_REPUBLIC'],
    isSubject: false,
  },

  // ==========================================
  // COMMONWEALTH BRITANNICO & POSSEDIMENTI (UK)
  // ==========================================
  CAN: {
    id: 'CAN',
    c: '#c46e66',
    f: 'Alleati',
    l: () => 'Dominion del Canada',
    shortName: 'Canada',
    leader: 'Mackenzie King',
    capital: 'Ottawa',
    tier: 'dominion',
    overlordCode: 'UK',
    aliases: ['CA', 'CANADA', 'DOMINION DEL CANADA'],
    isSubject: true,
  },
  AST: {
    id: 'AST',
    c: '#c46e66',
    f: 'Alleati',
    l: () => 'Commonwealth d\'Australia',
    shortName: 'Australia',
    leader: 'Robert Menzies',
    capital: 'Canberra',
    tier: 'dominion',
    overlordCode: 'UK',
    aliases: ['AU', 'AUS_COMMONWEALTH', 'AUSTRALIA', 'COMMONWEALTH D\'AUSTRALIA'],
    isSubject: true,
  },
  NZL: {
    id: 'NZL',
    c: '#c46e66',
    f: 'Alleati',
    l: () => 'Dominion della Nuova Zelanda',
    shortName: 'Nuova Zelanda',
    leader: 'Michael Joseph Savage / Peter Fraser',
    capital: 'Wellington',
    tier: 'dominion',
    overlordCode: 'UK',
    aliases: ['NZ', 'NUOVA ZELANDA', 'NEW ZEALAND', 'DOMINION DELLA NUOVA ZELANDA'],
    isSubject: true,
  },
  SAF: {
    id: 'SAF',
    c: '#c46e66',
    f: 'Alleati',
    l: () => 'Unione Sudafricana (e Mandato SWA)',
    shortName: 'Sudafrica',
    leader: 'J.B.M. Hertzog / Jan Smuts',
    capital: 'Pretoria',
    tier: 'dominion',
    overlordCode: 'UK',
    aliases: ['ZA', 'ZAF', 'SUDAFRICA', 'SOUTH AFRICA', 'UNIONE SUDAFRICANA'],
    isSubject: true,
  },
  RAJ: {
    id: 'RAJ',
    c: '#c46e66',
    f: 'Alleati',
    l: () => 'Impero Anglo-Indiano (British Raj)',
    shortName: 'India Britannica',
    leader: 'Lord Linlithgow (Viceré)',
    capital: 'New Delhi',
    tier: 'colony',
    overlordCode: 'UK',
    aliases: ['BRITISH_RAJ', 'INDIA BRITANNICA', 'IMPERO ANGLO-INDIANO'],
    isSubject: true,
  },
  PAK: {
    id: 'PAK',
    c: '#01411c',
    f: 'Alleati',
    l: () => 'Dominion del Pakistan (Dominion of Pakistan)',
    shortName: 'Pakistan',
    leader: 'Muhammad Ali Jinnah (Governatore Generale) · Liaquat Ali Khan (Primo Ministro)',
    capital: 'Karachi',
    tier: 'dominion',
    overlordCode: null,
    aliases: ['PK', 'PAK', 'PAKISTAN', 'DOMINION_OF_PAKISTAN', 'DOMINION DEL PAKISTAN'],
    isSubject: false,
  },
  IND: {
    id: 'IND',
    c: '#e07a22',
    f: 'Alleati',
    l: () => 'Dominion dell\'India (Unione Indiana)',
    shortName: 'India',
    leader: 'Lord Louis Mountbatten (Governatore Generale) · Jawaharlal Nehru (Primo Ministro)',
    capital: 'New Delhi',
    tier: 'dominion',
    overlordCode: null,
    aliases: ['IN', 'IND', 'INDIA', 'DOMINION_OF_INDIA', 'DOMINION DELL\'INDIA', 'UNIONE INDIANA'],
    isSubject: false,
  },
  HYD: {
    id: 'HYD',
    c: '#d4a017',
    f: 'Neutrale',
    l: () => 'Stato Sovrano di Hyderabad (Asaf Jahi)',
    shortName: 'Hyderabad',
    leader: 'Nizam Mir Osman Ali Khan Asaf Jah VII',
    capital: 'Hyderabad',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['HYD', 'HYDERABAD', 'NIZAM', 'STATO DI HYDERABAD'],
    isSubject: false,
  },
  KAS: {
    id: 'KAS',
    c: '#992233',
    f: 'Neutrale',
    l: () => 'Stato Principesco di Jammu e Kashmir (Dogra)',
    shortName: 'Jammu & Kashmir',
    leader: 'Maharaja Hari Singh',
    capital: 'Srinagar / Jammu',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['KAS', 'KASHMIR', 'JAMMU_KASHMIR', 'JAMMU E KASHMIR', 'STATO DI JAMMU E KASHMIR'],
    isSubject: false,
  },
  SAAR: {
    id: 'SAAR',
    c: '#335588',
    f: 'Alleati',
    l: () => 'Protettorato della Saar (Saarland — Unione Economica con la Francia)',
    shortName: 'Saar',
    leader: 'Gilbert Grandval (Governatore Militare) · Johannes Hoffmann',
    capital: 'Saarbrücken',
    tier: 'protectorate',
    overlordCode: 'FRA',
    aliases: ['SAAR', 'SAARLAND', 'PROTECTORATE_OF_THE_SAAR', 'PROTETTORATO DELLA SAAR'],
    isSubject: true,
  },
  JOR: {
    id: 'JOR',
    c: '#447755',
    f: 'Neutrale',
    l: () => 'Regno Hascemita di Transgiordania',
    shortName: 'Transgiordania',
    leader: 'Re Abdullah I di Giordania',
    capital: 'Amman',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['JO', 'JOR', 'TRANSJORDAN', 'JORDAN', 'GIORDANIA', 'TRANSGIORDANIA'],
    isSubject: false,
  },
  SYR: {
    id: 'SYR',
    c: '#3d7853',
    f: 'Neutrale',
    l: (s) => (s !== undefined && s >= 18 ? 'Repubblica Siriana (Indipendenza Sovrana)' : 'Repubblica Siriana'),
    shortName: 'Siria',
    leader: 'Presidente Shukri al-Quwatli · Primo Ministro Jamil Mardam Bey',
    capital: 'Damasco',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['SY', 'SYR', 'SIRIA', 'SYRIA', 'REPUBBLICA SIRIANA', 'SYRIAN REPUBLIC'],
    isSubject: false,
  },
  LEB: {
    id: 'LEB',
    c: '#5a8264',
    f: 'Neutrale',
    l: (s) => (s !== undefined && s >= 18 ? 'Repubblica Libanese (Indipendenza Sovrana)' : 'Repubblica Libanese'),
    shortName: 'Libano',
    leader: 'Presidente Béchara El Khoury · Primo Ministro Riad Al Solh',
    capital: 'Beirut',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['LB', 'LEB', 'LBN', 'LIBANO', 'LEBANON', 'REPUBBLICA LIBANESE', 'REPUBLIC OF LEBANON'],
    isSubject: false,
  },
  GIB: {
    id: 'GIB',
    c: '#b8423f',
    f: 'Alleati',
    l: () => 'Gibilterra — Colonia della Corona Britannica (Fortezza del Mediterraneo)',
    shortName: 'Gibilterra',
    leader: 'Governatore Gen. Sir Charles Harington / Sir Clive Liddell',
    capital: 'Gibraltar',
    tier: 'colony',
    overlordCode: 'UK',
    aliases: ['GI', 'GIBRALTAR', 'GIBILTERRA'],
    isSubject: true,
  },
  EGY: {
    id: 'EGY',
    c: '#c46e66',
    f: 'Alleati',
    l: (s) => (s >= 19 ? 'Regno d\'Egitto (Sovranità Nazionale — Re Faruq I)' : s >= 1 ? 'Regno d\'Egitto (Trattato Anglo-Egiziano del 1936)' : 'Regno d\'Egitto (Occupazione/Influenza Britannica)'),
    shortName: 'Egitto',
    leader: 'Re Faruq I / Mustafa al-Nahhas',
    capital: 'Il Cairo',
    tier: 'protectorate',
    overlordCode: 'UK',
    aliases: ['EG', 'EGYPT', 'EGITTO', 'REGNO D\'EGITTO'],
    isSubject: true,
  },
  IRQ: {
    id: 'IRQ',
    c: '#c29b38',
    f: 'Asse',
    l: (s) => (s >= 19 ? 'Regno dell\'Iraq (Sovranità Nazionale — Reggente \'Abd al-Ilah)' : s >= 9 ? 'Regno dell\'Iraq (Occupazione Militare Britannica PAIFORCE & Reggenza \'Abd al-Ilah)' : s >= 8 ? 'Regno dell\'Iraq (Governo di Difesa Nazionale Filo-Asse — Rashid Ali al-Kaylani)' : 'Regno dell\'Iraq (Trattato Anglo-Iraqueno)'),
    shortName: 'Iraq',
    leader: 'Re Ghazi I / Nuri al-Said / Rashid Ali al-Kaylani',
    capital: 'Baghdad',
    tier: 'protectorate',
    overlordCode: 'UK',
    aliases: ['IQ', 'IRAQ', 'REGNO DELL\'IRAQ'],
    isSubject: true,
  },

  // ==========================================
  // DEPENDENCIES DEGLI STATI UNITI (USA)
  // ==========================================
  PHL: {
    id: 'PHL',
    c: '#233f69',
    f: 'Alleati',
    l: () => 'Commonwealth delle Filippine',
    shortName: 'Filippine',
    leader: 'Manuel L. Quezon',
    capital: 'Manila',
    tier: 'autonomous',
    overlordCode: 'USA',
    aliases: ['PH', 'PHI', 'PHILIPPINES', 'FILIPPINE', 'COMMONWEALTH DELLE FILIPPINE', 'COMMONWEALTH OF THE PHILIPPINES'],
    isSubject: true,
  },

  // ==========================================
  // IMPERO COLONIALE FRANCESE & VICHY & FFL
  // ==========================================
  VIC: {
    id: 'VIC',
    c: '#857f6b',
    f: 'Fantoccio',
    l: () => 'Stato Francese (Regime di Vichy)',
    shortName: 'Vichy',
    leader: 'Philippe Pétain / Pierre Laval',
    capital: 'Vichy',
    tier: 'puppet',
    overlordCode: 'GER',
    aliases: ['ETAT_FRANCAIS', 'FRANCIA DI VICHY', 'STATO FRANCESE', 'VICHY', 'FRANCIA_DI_VICHY', 'STATO_FRANCESE', 'ETAT FRANCAIS', 'ÉTAT FRANÇAIS', 'ÉTAT_FRANÇAIS', 'REGIME DI VICHY', 'REGIME_DI_VICHY', 'VICHY_FRANCE'],
    isSubject: true,
  },
  F_NAF: {
    id: 'F_NAF',
    c: '#4c6a9c',
    f: 'Alleati',
    l: (s) => (s >= 14 ? 'Nordafrica Francese (AFN — GPRF De Gaulle)' : s >= 12 ? 'Nordafrica Francese (AFN — CFLN De Gaulle & Giraud)' : s === 11 ? 'Nordafrica Francese (AFN — Alto Commissariato Alleato Darlan-Giraud)' : 'Nordafrica Francese (Algeria/Marocco/Tunisia)'),
    shortName: 'Nordafrica Francese',
    leader: 'Albert Lebrun / Paul Reynaud / Charles de Gaulle (GPRF)',
    capital: 'Alger / Rabat / Tunis',
    tier: 'colony',
    overlordCode: 'FRA',
    aliases: ['AFN', 'ALGERIA_FRANCESE', 'NORDAFRICA FRANCESE'],
    isSubject: true,
  },
  VIC_NAF: {
    id: 'VIC_NAF',
    c: '#857f6b',
    f: 'Fantoccio',
    l: () => 'Nordafrica Francese (AFN — Regime di Vichy)',
    shortName: 'Nordafrica (Vichy)',
    leader: 'Yves Châtel / Maxime Weygand / Charles Noguès',
    capital: 'Alger / Rabat / Tunis',
    tier: 'colony',
    overlordCode: 'VIC',
    isSubject: true,
  },
  F_AOF: {
    id: 'F_AOF',
    c: '#4c6a9c',
    f: 'Alleati',
    l: (s) => (s >= 14 ? 'Africa Occidentale Francese (AOF — GPRF)' : s >= 12 ? 'Africa Occidentale Francese (AOF — CFLN)' : s === 11 ? 'Africa Occidentale Francese (AOF — Ralliement Alleato)' : 'Africa Occidentale Francese (AOF)'),
    shortName: 'AOF',
    leader: 'Jules Marcel de Coppet / Léon Cayla / Pierre Boisson',
    capital: 'Dakar',
    tier: 'colony',
    overlordCode: 'FRA',
    aliases: ['AOF', 'AFRICA OCCIDENTALE FRANCESE'],
    isSubject: true,
  },
  VIC_AOF: {
    id: 'VIC_AOF',
    c: '#7d7764',
    f: 'Fantoccio',
    l: () => 'Africa Occidentale Francese (AOF — Regime di Vichy)',
    shortName: 'AOF (Vichy)',
    leader: 'Pierre Boisson (Alto Commissario per l\'Africa Francese)',
    capital: 'Dakar',
    tier: 'colony',
    overlordCode: 'VIC',
    isSubject: true,
  },
  VIC_AEF: {
    id: 'VIC_AEF',
    c: '#7d7764',
    f: 'Fantoccio',
    l: () => 'Africa Equatoriale Francese (AEF — Regime di Vichy)',
    shortName: 'AEF (Vichy)',
    leader: 'Pierre-François Boisson / Georges Masson (Gabon)',
    capital: 'Brazzaville / Libreville',
    tier: 'colony',
    overlordCode: 'VIC',
    aliases: ['VIC_AEF', 'AEF_VICHY'],
    isSubject: true,
  },
  F_AEF: {
    id: 'F_AEF',
    c: '#4c6a9c',
    f: 'Alleati',
    l: (s) => (s >= 7 ? 'Africa Francese Libera (AEF & Camerun — De Gaulle)' : s === 6 ? 'Africa Equatoriale Francese (AEF — Regime di Vichy)' : 'Africa Equatoriale Francese (AEF)'),
    shortName: 'AEF',
    leader: 'Pierre-François Boisson / Félix Éboué',
    capital: 'Brazzaville',
    tier: 'colony',
    overlordCode: 'FRA',
    aliases: ['AEF', 'AFRICA EQUATORIALE FRANCESE'],
    isSubject: true,
  },
  FFL_AEF: {
    id: 'FFL_AEF',
    c: '#2b5fa6',
    f: 'Alleati',
    l: (s) => (s >= 7 ? 'Francia Libera (Forces Françaises Libres — Conseil de Défense de l\'Empire)' : 'Africa Francese Libera (AEF & Camerun — De Gaulle)'),
    shortName: 'Francia Libera',
    leader: 'Général Charles de Gaulle / Félix Éboué / Philippe Leclerc',
    capital: 'Brazzaville (Capitale della Francia Libera)',
    tier: 'free_forces',
    overlordCode: 'FRA',
    aliases: ['FRANCIA_LIBERA', 'FRANCE_LIBRE', 'FFL', 'FRANCIA LIBERA', 'FRANCE LIBRE', 'FORCES_FRANCAISES_LIBRES', 'FORCES FRANCAISES LIBRES', 'FREE_FRANCE', 'FREE FRANCE', 'FREE_FRENCH', 'FREE FRENCH', 'AFRICA_FRANCESE_LIBERA', 'AFRIQUE_FRANCAISE_LIBRE', 'DE_GAULLE', 'DE GAULLE'],
    isSubject: true,
  },
  FFL: {
    id: 'FFL',
    c: '#2b5fa6',
    f: 'Alleati',
    l: (s) => (s >= 7 ? 'Francia Libera (Forces Françaises Libres — Conseil de Défense de l\'Empire)' : 'Francia Libera (Forces Françaises Libres)'),
    shortName: 'Francia Libera',
    leader: 'Général Charles de Gaulle',
    capital: 'Brazzaville (Capitale della Francia Libera)',
    tier: 'free_forces',
    overlordCode: 'FRA',
    aliases: ['FRANCIA_LIBERA', 'FRANCE_LIBRE', 'FFL_AEF', 'FRANCIA LIBERA', 'FRANCE LIBRE', 'FORCES_FRANCAISES_LIBRES', 'FORCES FRANCAISES LIBRES', 'FREE_FRANCE', 'FREE FRANCE', 'FREE_FRENCH', 'FREE FRENCH', 'AFRICA_FRANCESE_LIBERA', 'AFRIQUE_FRANCAISE_LIBRE', 'DE_GAULLE', 'DE GAULLE'],
    isSubject: true,
  },
  F_IND: {
    id: 'F_IND',
    c: '#4c6a9c',
    f: 'Alleati',
    l: (s) => (s >= 6 ? 'Indocina Francese (Amministrazione Vichy)' : 'Indocina Francese'),
    shortName: 'Indocina',
    leader: 'Jules Brévié / Georges Catroux',
    capital: 'Hanoi',
    tier: 'colony',
    overlordCode: 'FRA',
    aliases: ['INDOCHINE', 'INDOCINA FRANCESE'],
    isSubject: true,
  },
  VIC_IND: {
    id: 'VIC_IND',
    c: '#857f6b',
    f: 'Fantoccio',
    l: () => 'Indocina Francese (Amministrazione Vichy / Occupazione Giapponese)',
    shortName: 'Indocina (Vichy)',
    leader: 'Jean Decoux',
    capital: 'Hanoi',
    tier: 'colony',
    overlordCode: 'VIC',
    isSubject: true,
  },
  F_MAD: {
    id: 'F_MAD',
    c: '#4c6a9c',
    f: 'Alleati',
    l: (s) => (s >= 6 ? 'Madagascar Francese (Amministrazione Vichy)' : 'Madagascar Francese'),
    shortName: 'Madagascar',
    leader: 'Léon Cayla',
    capital: 'Tananarive',
    tier: 'colony',
    overlordCode: 'FRA',
    aliases: ['MADAGASCAR FRANCESE'],
    isSubject: true,
  },
  VIC_MAD: {
    id: 'VIC_MAD',
    c: '#857f6b',
    f: 'Fantoccio',
    l: () => 'Madagascar Francese (Amministrazione di Vichy)',
    shortName: 'Madagascar (Vichy)',
    leader: 'Armand Annet',
    capital: 'Tananarive',
    tier: 'colony',
    overlordCode: 'VIC',
    isSubject: true,
  },
  F_SOM: {
    id: 'F_SOM',
    c: '#4c6a9c',
    f: 'Alleati',
    l: (s) => (s >= 6 ? 'Somalia Francese (Gibuti — Amministrazione Vichy)' : 'Somalia Francese (Gibuti)'),
    shortName: 'Gibuti',
    leader: 'Hubert Deschamps',
    capital: 'Djibouti',
    tier: 'colony',
    overlordCode: 'FRA',
    aliases: ['GIBUTI', 'SOMALIA FRANCESE'],
    isSubject: true,
  },
  VIC_SOM: {
    id: 'VIC_SOM',
    c: '#857f6b',
    f: 'Fantoccio',
    l: () => 'Somalia Francese (Gibuti — Amministrazione di Vichy)',
    shortName: 'Gibuti (Vichy)',
    leader: 'Pierre Nouailhetas',
    capital: 'Djibouti',
    tier: 'colony',
    overlordCode: 'VIC',
    isSubject: true,
  },
  F_SYR: {
    id: 'F_SYR',
    c: '#4c6a9c',
    f: 'Alleati',
    l: (s) => (s >= 9 ? 'Siria e Libano (Controllo Congiunto Francia Libera & Gran Bretagna — Gen. Catroux)' : s >= 6 ? 'Mandato di Siria e Libano (Amministrazione Vichy)' : 'Mandato di Siria e Libano'),
    shortName: 'Siria e Libano',
    leader: 'Gabriel Puaux',
    capital: 'Beyrouth',
    tier: 'mandate',
    overlordCode: 'FRA',
    aliases: ['MANDATO DI SIRIA', 'MANDATO DI SIRIA E LIBANO'],
    isSubject: true,
  },
  VIC_SYR: {
    id: 'VIC_SYR',
    c: '#857f6b',
    f: 'Fantoccio',
    l: () => 'Mandato di Siria e Libano (Amministrazione di Vichy)',
    shortName: 'Siria e Libano (Vichy)',
    leader: 'Henri Dentz',
    capital: 'Beyrouth',
    tier: 'mandate',
    overlordCode: 'VIC',
    isSubject: true,
  },
  F_COL: {
    id: 'F_COL',
    c: '#4c6a9c',
    f: 'Alleati',
    l: (s) => (s >= 14 ? 'Possedimenti Oltremare Francesi (GPRF)' : s >= 12 ? 'Possedimenti Oltremare Francesi (CFLN)' : s >= 6 ? 'Possedimenti Oltremare Francesi (Vichy/Liberi)' : 'Possedimenti Oltremare Francesi'),
    shortName: 'Colonie Francesi',
    leader: 'Jean Guéril (Guyane) / Amministrazioni Coloniali d\'Oltremare',
    capital: 'Cayenne (Guyane française)',
    tier: 'colony',
    overlordCode: 'FRA',
    isSubject: true,
  },
  VIC_COL: {
    id: 'VIC_COL',
    c: '#857f6b',
    f: 'Fantoccio',
    l: () => 'Possedimenti Oltremare Francesi (Regime di Vichy — Guyane & Caraibi)',
    shortName: 'Colonie (Vichy)',
    leader: 'Philippe Pétain / Ammiraglio Georges Robert / Gouverneur René Veber',
    capital: 'Vichy / Fort-de-France / Cayenne',
    tier: 'colony',
    overlordCode: 'VIC',
    aliases: ['GUYANE_VICHY', 'COLONIE_VICHY', 'VICHY_COLONIES', 'VIC_GUIANA', 'VIC_GUYANE'],
    isSubject: true,
  },

  // ==========================================
  // STATI FANTOCCIO E CLIENTI DEL GIAPPONE E DELL'ASSE
  // ==========================================
  SLO: {
    id: 'SLO',
    c: '#7d7658',
    f: 'Fantoccio',
    l: () => 'Repubblica Slovacca (Stato cliente del Reich)',
    shortName: 'Slovacchia',
    leader: 'Jozef Tiso',
    capital: 'Bratislava',
    tier: 'puppet',
    overlordCode: 'GER',
    aliases: ['SK', 'SVK', 'SLOVACCHIA', 'SLOVAKIA', 'REPUBBLICA SLOVACCA'],
    isSubject: true,
  },
  CRO: {
    id: 'CRO',
    c: '#7a5c58',
    f: 'Fantoccio',
    l: () => 'Stato Indipendente di Croazia (Nezavisna Država Hrvatska — NDH)',
    shortName: 'Croazia (NDH)',
    leader: 'Poglavnik Ante Pavelić / Slavko Kvaternik',
    capital: 'Zagabria (Zagreb)',
    tier: 'puppet',
    overlordCode: 'GER',
    aliases: ['NDH', 'HRV', 'CROATIA', 'CROAZIA', 'STATO INDIPENDENTE DI CROAZIA', 'NEZAVISNA DRŽAVA HRVATSKA', 'NEZAVISNA DRZAVA HRVATSKA'],
    isSubject: true,
  },
  RSI: {
    id: 'RSI',
    c: '#334438',
    f: 'Fantoccio',
    l: () => 'Repubblica Sociale Italiana (RSI — Governo di Salò)',
    shortName: 'RSI (Salò)',
    leader: 'Benito Mussolini / Rodolfo Graziani',
    capital: 'Salò / Gargnano / Milano',
    tier: 'puppet',
    overlordCode: 'GER',
    aliases: ['RSI', 'REPUBBLICA SOCIALE ITALIANA', 'REPUBBLICA_SOCIALE_ITALIANA', 'REPUBBLICA DI SALO', 'REPUBBLICA_DI_SALO', 'ITALIAN SOCIAL REPUBLIC', 'SALO'],
    isSubject: true,
  },
  OZAV: {
    id: 'OZAV',
    c: '#3d4449',
    f: 'Asse',
    l: () => 'Operationszone Alpenvorland (OZAV — Annessione de facto al Reich)',
    shortName: 'Alpenvorland (OZAV)',
    leader: 'Franz Hofer (Gauleiter del Tirolo-Vorarlberg & Commissario Supremo)',
    capital: 'Bozen / Innsbruck',
    tier: 'puppet',
    overlordCode: 'GER',
    aliases: ['OZAV', 'ALPENVORLAND', 'OPERATIONSZONE ALPENVORLAND', 'OPERATIONSZONE_ALPENVORLAND', 'ZONA D\'OPERAZIONE PREALPI'],
    isSubject: true,
  },
  OZAK: {
    id: 'OZAK',
    c: '#363d42',
    f: 'Asse',
    l: () => 'Operationszone Adriatisches Küstenland (OZAK — Annessione de facto al Reich)',
    shortName: 'Litorale Adriatico (OZAK)',
    leader: 'Friedrich Rainer (Gauleiter della Carinzia & Commissario Supremo)',
    capital: 'Trieste / Klagenfurt',
    tier: 'puppet',
    overlordCode: 'GER',
    aliases: ['OZAK', 'ADRIATISCHES KUSTENLAND', 'ADRIATISCHES_KUSTENLAND', 'OPERATIONSZONE ADRIATISCHES KUSTENLAND', 'OPERATIONSZONE_ADRIATISCHES_KUSTENLAND', 'ZONA D\'OPERAZIONE LITORALE ADRIATICO'],
    isSubject: true,
  },
  MAN: {
    id: 'MAN',
    c: '#c4aa76',
    f: 'Fantoccio',
    l: () => 'Impero del Grande Manciukuò (Stato cliente del Giappone)',
    shortName: 'Manciukuò',
    leader: 'Imperatore Puyi (Kangde)',
    capital: 'Hsinking (Changchun)',
    tier: 'puppet',
    overlordCode: 'JAP',
    aliases: ['MANCHUKUO', 'MANCIURIA', 'MANCIUKUO', 'MANCHURIA'],
    isSubject: true,
  },
  MEJ: {
    id: 'MEJ',
    c: '#b58838',
    f: 'Fantoccio',
    l: () => 'Governo Autonomo del Mengjiang (Menkyo / Mongolia Interna)',
    shortName: 'Mengjiang',
    leader: 'Principe Demchugdongrub (De Wang)',
    capital: 'Kalgan (Zhangjiakou)',
    tier: 'puppet',
    overlordCode: 'JAP',
    aliases: ['MENGJIANG', 'MENKYO', 'MONGOLIA INTERNA'],
    isSubject: true,
  },
  WJ_CHI: {
    id: 'WJ_CHI',
    c: '#a86532',
    f: 'Fantoccio',
    l: (s) =>
      s >= 6
        ? 'Governo Nazionale Riorganizzato di Nanchino (Wang Jingwei)'
        : 'Governo Provvisorio / Riformato Cinese (Collaborazionista filo-nipponico)',
    shortName: 'Cina Collaborazionista',
    leader: 'Wang Jingwei / Wang Kemin / Liang Hongzhi',
    capital: 'Nanchino / Pechino',
    tier: 'puppet',
    overlordCode: 'JAP',
    aliases: ['WANG_JINGWEI', 'CINA_COLLABORAZIONISTA', 'NANKING_GOVERNMENT'],
    isSubject: true,
  },

  // ==========================================
  // NAZIONI EUROPEE ORIENTALI, BALCANICHE E BALTICHE
  // ==========================================
  POL: {
    id: 'POL',
    c: '#ad7e64',
    f: 'Alleati',
    l: () => 'Repubblica di Polonia',
    shortName: 'Polonia',
    leader: 'Ignacy Mościcki / Edward Rydz-Śmigły',
    capital: 'Warszawa',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['PL', 'POL', 'POLONIA', 'POLAND'],
    isSubject: false,
  },
  CZE: {
    id: 'CZE',
    c: '#788b9c',
    f: 'Alleati',
    l: () => 'Repubblica Cecoslovacca',
    shortName: 'Cecoslovacchia',
    leader: 'Edvard Beneš / Emil Hácha',
    capital: 'Praha',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['CS', 'CZ', 'CZE', 'CECOSLOVACCHIA', 'CZECHOSLOVAKIA'],
    isSubject: false,
  },
  YUG: {
    id: 'YUG',
    c: '#5c7a6e',
    f: 'Neutrale',
    l: (s) => (typeof s === 'number' && s >= 16 ? 'Jugoslavia Federale Democratica (Demokratska Federativna Jugoslavija — Maresciallo Tito)' : 'Regno di Jugoslavia'),
    shortName: 'Jugoslavia',
    leader: 'Principe Paolo / Pietro II',
    capital: 'Beograd',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['YU', 'YUG', 'JUGOSLAVIA', 'YUGOSLAVIA', 'REGNO DI JUGOSLAVIA'],
    isSubject: false,
  },
  DFJ: {
    id: 'DFJ',
    c: '#2b5b54',
    f: 'Alleati',
    l: (s) => (typeof s === 'number' && s >= 19 ? 'Repubblica Federativa Popolare di Jugoslavia (FNRJ — Maresciallo Tito)' : 'Jugoslavia Federale Democratica (Demokratska Federativna Jugoslavija — Maresciallo Tito)'),
    shortName: 'Jugoslavia (FNRJ)',
    leader: 'Maresciallo Josip Broz Tito (Primo Ministro e Comandante Supremo) — Ivan Ribar (Presidente del Presidium)',
    capital: 'Beograd (Belgrado)',
    tier: 'sovereign',
    overlordCode: null,
    aliases: [
      'DFJ',
      'YUG_DFJ',
      'DEMOKRATSKA FEDERATIVNA JUGOSLAVIJA',
      'JUGOSLAVIA FEDERALE DEMOCRATICA',
      'JUGOSLAVIA PARTIGIANA',
      'AVNOJ',
      'NOVJ',
      'TITO',
      'DEMOCRATIC FEDERAL YUGOSLAVIA',
      'FNRJ',
      'SFRJ',
      'FEDERATIVE PEOPLES REPUBLIC OF YUGOSLAVIA',
      'REPUBBLICA FEDERATIVA POPOLARE DI JUGOSLAVIA',
      'REPUBBLICA SOCIALISTA FEDERALE DI JUGOSLAVIA',
      'FEDERAZIONE JUGOSLAVA',
    ],
    isSubject: false,
  },
  VIE: {
    id: 'VIE',
    c: '#da251d',
    f: 'Alleati',
    l: () => 'Repubblica Democratica del Vietnam (Việt Nam Dân chủ Cộng hòa — Hồ Chí Minh)',
    shortName: 'Vietnam (DRV)',
    leader: 'Hồ Chí Minh',
    capital: 'Hà Nội',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['DRV', 'VIETNAM', 'VIET_MINH', 'VNM'],
    isSubject: false,
  },
  IDN: {
    id: 'IDN',
    c: '#ce1126',
    f: 'Neutrale',
    l: () => 'Repubblica d\'Indonesia (Republik Indonesia — Sukarno & Hatta)',
    shortName: 'Indonesia',
    leader: 'Sukarno / Mohammad Hatta',
    capital: 'Jakarta (Batavia)',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['INDONESIA', 'IDN', 'INA', 'REPUBLIK_INDONESIA'],
    isSubject: false,
  },
  AMG: {
    id: 'AMG',
    c: '#466888',
    f: 'Alleati',
    l: (s) => (typeof s === 'number' && s >= 19 ? 'Territorio Libero di Trieste — Zona A (Governo Militare Alleato AMG-FTT)' : 'Governo Militare Alleato (AMG Venezia Giulia — XIII Corpo d\'Armata Britannico & 88ª Divisione USA)'),
    shortName: 'Trieste (Zona A TLT)',
    leader: 'Magg. Gen. Sir Terence Airey (Comandante Generale AMG-FTT / TRUST & BETFOR)',
    capital: 'Trieste',
    tier: 'international',
    overlordCode: null,
    aliases: [
      'AMG',
      'AMG_VG',
      'AMG_FTT',
      'TLT',
      'FTT',
      'STO',
      'ALLIED_MILITARY_GOVERNMENT',
      'GOVERNO_MILITARE_ALLEATO',
      'TERRITORIO_LIBERO_DI_TRIESTE',
      'FREE_TERRITORY_OF_TRIESTE',
    ],
    isSubject: false,
  },
  TLT: {
    id: 'TLT',
    c: '#c0392b',
    f: 'Neutrale',
    l: (s) => (typeof s === 'number' && s >= 19 ? 'Territorio Libero di Trieste (TLT / FTT — Mandato Consiglio di Sicurezza ONU)' : 'Territorio Libero di Trieste'),
    shortName: 'Trieste (TLT)',
    leader: 'Consiglio di Sicurezza dell\'ONU — Magg. Gen. Sir Terence Airey (Zona A) / Col. Mirko Lenac (Zona B)',
    capital: 'Trieste',
    tier: 'international',
    overlordCode: null,
    aliases: ['TLT', 'FTT', 'STO', 'FREE_TERRITORY_OF_TRIESTE', 'TERRITORIO_LIBERO_DI_TRIESTE', 'SVOBODNO_TRZASKO_OZEMLJE'],
    isSubject: false,
  },
  ACC: {
    id: 'ACC',
    c: '#4a545c',
    f: 'Alleati',
    l: () => 'Consiglio di Controllo Alleato (Alliierter Kontrollrat — Germania Occupata)',
    shortName: 'Germania (ACC)',
    leader: 'Allied Control Council (Žukov, Eisenhower, Montgomery, Kœnig)',
    capital: 'Berlin',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['ACC', 'ALLIED_CONTROL_COUNCIL', 'KONTROLLRAT'],
    isSubject: false,
  },
  ROM: {
    id: 'ROM',
    c: '#b8a45e',
    f: 'Neutrale',
    l: (s) => (s >= 9 ? 'Regno di Romania (Cobelligerante dell\'Asse & Governatorato della Transnistria — Antonescu)' : s >= 7 ? 'Regno di Romania (Stato Nazionale Legionario — Antonescu)' : 'Regno di Romania'),
    shortName: 'Romania',
    leader: 'Re Carlo II / Michele I & Ion Antonescu',
    capital: 'București',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['RO', 'ROU', 'ROM', 'ROMANIA', 'REGNO DI ROMANIA'],
    isSubject: false,
  },
  HUN: {
    id: 'HUN',
    c: '#698061',
    f: 'Asse',
    l: () => 'Regno d\'Ungheria',
    shortName: 'Ungheria',
    leader: 'Miklós Horthy',
    capital: 'Budapest',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['HU', 'HUN', 'UNGHERIA', 'HUNGARY', 'REGNO D\'UNGHERIA'],
    isSubject: false,
  },
  BUL: {
    id: 'BUL',
    c: '#596656',
    f: 'Asse',
    l: () => 'Regno di Bulgaria',
    shortName: 'Bulgaria',
    leader: 'Zar Boris III',
    capital: 'Sofia',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['BG', 'BGR', 'BUL', 'BULGARIA', 'REGNO DI BULGARIA'],
    isSubject: false,
  },
  FIN: {
    id: 'FIN',
    c: '#c7c2b1',
    f: 'Neutrale',
    l: (s) => (s >= 9 ? 'Repubblica di Finlandia (Guerra di Continuazione — Occupazione Carelia Orientale)' : 'Repubblica di Finlandia'),
    shortName: 'Finlandia',
    leader: 'Kyösti Kallio / Carl Gustaf Mannerheim',
    capital: 'Helsinki',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['FI', 'FIN', 'FINLANDIA', 'FINLAND'],
    isSubject: false,
  },
  EST: {
    id: 'EST',
    c: '#759c99',
    f: 'Neutrale',
    l: () => 'Repubblica di Estonia',
    shortName: 'Estonia',
    leader: 'Konstantin Päts',
    capital: 'Tallinn',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['EE', 'EST', 'ESTONIA'],
    isSubject: false,
  },
  LAT: {
    id: 'LAT',
    c: '#9c7882',
    f: 'Neutrale',
    l: () => 'Repubblica di Lettonia',
    shortName: 'Lettonia',
    leader: 'Kārlis Ulmanis',
    capital: 'Riga',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['LV', 'LVA', 'LAT', 'LETTONIA', 'LATVIA'],
    isSubject: false,
  },
  LIT: {
    id: 'LIT',
    c: '#869e75',
    f: 'Neutrale',
    l: () => 'Repubblica di Lituania',
    shortName: 'Lituania',
    leader: 'Antanas Smetona',
    capital: 'Kaunas',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['LT', 'LTU', 'LIT', 'LITUANIA', 'LITHUANIA'],
    isSubject: false,
  },
  ALB: {
    id: 'ALB',
    c: '#a65353',
    f: 'Neutrale',
    l: () => 'Regno d\'Albania',
    shortName: 'Albania',
    leader: 'Re Zog I',
    capital: 'Tirana',
    tier: 'protectorate',
    overlordCode: null, // Dinamicamente legato a ITA da step 4
    aliases: ['AL', 'ALB', 'ALBANIA', 'REGNO D\'ALBANIA'],
    isSubject: false,
  },
  GRE: {
    id: 'GRE',
    c: '#5b7a9c',
    f: 'Alleati',
    l: (s) =>
      typeof s === 'number' && s >= 19
        ? 'Regno di Grecia (Guerra Civile Greca — Dottrina Truman & AMAG)'
        : typeof s === 'number' && s >= 16
        ? 'Regno di Grecia (Dekemvriana, Varkiza & Crisi Civile)'
        : s >= 7
        ? 'Regno di Grecia (Belligerante Alleato — "Giorno dell\'Oxi")'
        : 'Regno di Grecia (Regime del 4 Agosto)',
    shortName: 'Grecia',
    leader: 'Re Giorgio II / Ioannis Metaxas (1936–41) · G. Papandreou / Damaskinos (1944–45) · Re Paolo I / T. Sofoulis (1947)',
    capital: 'Atene',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['GR', 'EL', 'GRC', 'GRE', 'GRECIA', 'GREECE'],
    isSubject: false,
  },
  DSE: {
    id: 'DSE',
    c: '#b53a38',
    f: 'Comintern',
    l: (s) =>
      typeof s === 'number' && s >= 19
        ? 'Esercito Democratico di Grecia (DSE — "Grecia Libera" / Grammos–Vitsi)'
        : 'EAM-ELAS (Fronte di Liberazione Nazionale — Entroterra & Dekemvriana)',
    shortName: 'DSE / ELAS',
    leader: 'Markos Vafiadis / Nikos Zachariadis (DSE) — Aris Velouchiotis / Stefanos Sarafis (ELAS)',
    capital: 'Quartier Generale Montano (Grammos / Viniani)',
    tier: 'autonomous',
    overlordCode: null,
    aliases: ['ELAS', 'EAM', 'EAM_ELAS', 'DSE', 'DIMOKRATIKOS_STRATOS', 'PEEA', 'PDG'],
    isSubject: false,
  },

  // ==========================================
  // PENISOLA IBERICA
  // ==========================================
  SPA: {
    id: 'SPA',
    c: '#9e8f57',
    f: 'Asse',
    l: (s) => (s < 3 ? 'Spagna Nazionalista (Bando Nacional — Franco)' : 'Stato Spagnolo (Regime Franchista)'),
    shortName: 'Spagna Franchista',
    leader: 'Francisco Franco',
    capital: 'Burgos / Madrid',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['ES_NAT', 'SPAGNA_FRANCO', 'SPAGNA FRANCHISTA', 'BANDO NACIONAL'],
    isSubject: false,
  },
  SPR: {
    id: 'SPR',
    c: '#9c4a4a',
    f: 'Comintern',
    l: () => 'Seconda Repubblica Spagnola (Fronte Popolare)',
    shortName: 'Repubblica Spagnola',
    leader: 'Manuel Azaña / Juan Negrín',
    capital: 'Madrid / Valencia / Barcelona',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['ES', 'ESP', 'SPAGNA', 'SPAIN', 'REPUBBLICA SPAGNOLA', 'SEGUNDA REPUBLICA'],
    isSubject: false,
  },
  POR: {
    id: 'POR',
    c: '#5a9660',
    f: 'Neutrale',
    l: () => 'Repubblica Portoghese (Estado Novo)',
    shortName: 'Portogallo',
    leader: 'António de Oliveira Salazar / Óscar Carmona',
    capital: 'Lisboa',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['PT', 'PRT', 'POR', 'PORTOGALLO', 'PORTUGAL'],
    isSubject: false,
  },

  // ==========================================
  // EUROPA OCCIDENTALE, SCANDINAVA E CENTRALE
  // ==========================================
  SWE: {
    id: 'SWE',
    c: '#3b6b82',
    f: 'Neutrale',
    l: () => 'Regno di Svezia',
    shortName: 'Svezia',
    leader: 'Gustavo V / Per Albin Hansson',
    capital: 'Stoccolma',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['SE', 'SWE', 'SVEZIA', 'SWEDEN'],
    isSubject: false,
  },
  SWI: {
    id: 'SWI',
    c: '#8a3b3b',
    f: 'Neutrale',
    l: () => 'Confederazione Svizzera',
    shortName: 'Svizzera',
    leader: 'Consiglio Federale',
    capital: 'Berna',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['CH', 'CHE', 'SWI', 'SVIZZERA', 'SWITZERLAND', 'CONFEDERAZIONE SVIZZERA'],
    isSubject: false,
  },
  IRE: {
    id: 'IRE',
    c: '#648c66',
    f: 'Neutrale',
    l: () => 'Irlanda (Éire)',
    shortName: 'Irlanda',
    leader: 'Éamon de Valera',
    capital: 'Dublino',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['IE', 'EIR', 'IRL', 'IRE', 'IRLANDA', 'IRELAND', 'EIRE'],
    isSubject: false,
  },
  AUS: {
    id: 'AUS',
    c: '#8c7b6d',
    f: 'Neutrale',
    l: () => 'Stato Federale d\'Austria (Ständestaat)',
    shortName: 'Austria',
    leader: 'Kurt Schuschnigg',
    capital: 'Wien',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['AT', 'AUT', 'AUS', 'AUSTRIA', 'OESTERREICH', 'BUNDESSTAAT OESTERREICH'],
    isSubject: false,
  },
  DEN: {
    id: 'DEN',
    c: '#d1b564',
    f: 'Neutrale',
    l: (s) => (s >= 13 ? 'Danimarca (Occupazione Militare Tedesca & Legge Marziale)' : s >= 6 ? 'Regno di Danimarca (Musterprotektorat sotto occupazione)' : 'Regno di Danimarca (e Groenlandia)'),
    shortName: 'Danimarca',
    leader: 'Cristiano X / Thorvald Stauning',
    capital: 'København',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['DK', 'DNK', 'DEN', 'DANIMARCA', 'DENMARK'],
    isSubject: false,
  },
  NOR: {
    id: 'NOR',
    c: '#708a9e',
    f: 'Neutrale',
    l: (s) => (s >= 18 ? 'Regno di Norvegia' : s >= 6 ? 'Regno di Norvegia (Governo in esilio a Londra)' : 'Regno di Norvegia'),
    shortName: 'Norvegia',
    leader: 'Haakon VII / Johan Nygaardsvold',
    capital: 'Oslo',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['NO', 'NOR', 'NORVEGIA', 'NORWAY'],
    isSubject: false,
  },
  LUX: {
    id: 'LUX',
    c: '#a38c92',
    f: 'Neutrale',
    l: () => 'Granducato di Lussemburgo',
    shortName: 'Lussemburgo',
    leader: 'Granduchessa Carlotta / Pierre Dupong',
    capital: 'Luxembourg',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['LU', 'LUX', 'LUSSEMBURGO', 'LUXEMBOURG'],
    isSubject: false,
  },
  ICE: {
    id: 'ICE',
    c: '#4a80b0',
    f: 'Neutrale',
    l: (s) => (s >= 19 ? 'Repubblica d\'Islanda (Lýðveldið Ísland — Accordo di Keflavík & Ritiro Militare USA 1947)' : s >= 18 ? 'Repubblica d\'Islanda (Lýðveldið Ísland — Smilitarizzazione Postbellica)' : s >= 14 ? 'Repubblica d\'Islanda (Lýðveldið Ísland — Proclamazione del 17 Giugno 1944)' : s >= 9 ? 'Regno d\'Islanda (Protezione Militare USA / Reggenza Sveinn Björnsson)' : s >= 6 ? 'Regno d\'Islanda (Occupazione Britannica / Operazione Fork)' : 'Regno d\'Islanda (Konungsríkið Ísland — Unione con la Danimarca)'),
    shortName: 'Islanda',
    leader: 'Re Cristiano X / H. Jónasson (1936-41) · Pres. Sveinn Björnsson / PM Stefán J. Stefánsson (1947)',
    capital: 'Reykjavík',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['IS', 'ISL', 'ICE', 'ISLANDA', 'ICELAND', 'ISLAND'],
    isSubject: false,
  },
  BEL: {
    id: 'BEL',
    c: '#8d77a3',
    f: 'Neutrale',
    l: (s) => (s >= 16 ? 'Regno del Belgio' : s >= 6 ? 'Regno del Belgio (Governo in esilio a Londra)' : 'Regno del Belgio (e Congo Belga)'),
    shortName: 'Belgio',
    leader: 'Re Leopoldo III / Hubert Pierlot',
    capital: 'Bruxelles',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['BE', 'BEL', 'BELGIO', 'BELGIUM'],
    isSubject: false,
  },
  HOL: {
    id: 'HOL',
    c: '#b57f3f',
    f: 'Neutrale',
    l: (s) => (s >= 18 ? 'Regno dei Paesi Bassi' : s >= 6 ? 'Regno dei Paesi Bassi (Governo in esilio)' : 'Regno dei Paesi Bassi (e Indie Orientali)'),
    shortName: 'Paesi Bassi',
    leader: 'Regina Guglielmina / Dirk Jan de Geer',
    capital: 'Amsterdam',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['NL', 'NLD', 'HOL', 'PAESI BASSI', 'NETHERLANDS', 'OLANDA'],
    isSubject: false,
  },
  HOL_DEI: {
    id: 'HOL_DEI',
    c: '#b57f3f',
    f: 'Neutrale',
    l: (s) => (s >= 18 ? 'Nederlands-Indië (Amministrazione Civile NICA & Forze Alleate)' : s >= 6 ? 'Indie Orientali Olandesi (Governo Coloniale in Esilio)' : 'Indie Orientali Olandesi (Nederlands-Indië)'),
    shortName: 'Indie Olandesi',
    leader: 'Alidius Tjarda van Starkenborgh Stachouwer (Gov. Gen.)',
    capital: 'Batavia (Giacarta)',
    tier: 'colony',
    overlordCode: 'HOL',
    aliases: ['DUTCH_EAST_INDIES', 'INDIE_ORIENTALI_OLANDESI', 'NEDERLANDS_INDIE'],
    isSubject: true,
  },
  BEL_CON: {
    id: 'BEL_CON',
    c: '#8d77a3',
    f: 'Neutrale',
    l: (s) => (s >= 6 ? 'Congo Belga (Sforzo Bellico Alleato a fianco di Londra)' : 'Congo Belga (Congo Belge)'),
    shortName: 'Congo Belga',
    leader: 'Pierre Ryckmans (Gov. Gen.)',
    capital: 'Léopoldville (Kinshasa)',
    tier: 'colony',
    overlordCode: 'BEL',
    aliases: ['BELGIAN_CONGO', 'CONGO_BELGA', 'CONGO_BELGE'],
    isSubject: true,
  },
  DANZIG: {
    id: 'DANZIG',
    c: '#c9b784',
    f: 'Neutrale',
    l: () => 'Città Libera di Danzica (Freie Stadt Danzig)',
    shortName: 'Danzica',
    leader: 'Arthur Greiser / Alto Commissario SDN',
    capital: 'Danzig',
    tier: 'international',
    overlordCode: null,
    aliases: ['DANZICA', 'GDANSK', 'FREIE STADT DANZIG'],
    isSubject: false,
  },
  TANGER: {
    id: 'TANGER',
    c: '#b82a2a', // Rosso imperiale chérifien conforme alla bandiera ufficiale della Zona Internazionale
    f: 'Neutrale',
    l: (s) =>
      s !== undefined && s >= 18
        ? 'Zona Internazionale di Tangeri (Amministrazione Internazionale Restaurata)'
        : s !== undefined && s >= 6
        ? 'Tánger (Zona Ocupada por España — 14 de junio de 1940)'
        : 'Zona Internazionale di Tangeri (Zone Internationale de Tanger)',
    shortName: 'Tangeri',
    leader: 'Comité de Contrôle International / Administrateur (Statut de 1923)',
    capital: 'Tanger',
    tier: 'international',
    overlordCode: null,
    aliases: [
      'TANGER',
      'TANGIER',
      'TANGERI',
      'ZONE INTERNATIONALE DE TANGER',
      'ZONA INTERNACIONAL DE TANGER',
      'TANGIER INTERNATIONAL ZONE',
      'INT_TANGER',
    ],
    isSubject: false,
  },
  SMR: {
    id: 'SMR',
    c: '#5c94b8',
    f: 'Neutrale',
    l: () => 'Serenissima Repubblica di San Marino',
    shortName: 'San Marino',
    leader: 'Capitani Reggenti (Consiglio Grande e Generale)',
    capital: 'Città di San Marino',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['SM', 'SMR', 'SAN MARINO', 'SAN_MARINO'],
    isSubject: false,
  },
  VAT: {
    id: 'VAT',
    c: '#dfc846',
    f: 'Neutrale',
    l: (s) => (s && s >= 3 ? 'Stato della Città del Vaticano (Pio XII)' : 'Stato della Città del Vaticano (Pio XI)'),
    shortName: 'Vaticano',
    leader: 'Papa Pio XI (1922-1939) / Papa Pio XII (1939-1958)',
    capital: 'Città del Vaticano',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['VA', 'VAT', 'VATICAN', 'VATICANO', 'VATICAN_CITY', 'HOLY_SEE'],
    isSubject: false,
  },
  AND: {
    id: 'AND',
    c: '#caa048',
    f: 'Neutrale',
    l: () => 'Principato d\'Andorra (Coprincipato Sovrano dei Pirenei)',
    shortName: 'Andorra',
    leader: 'Justí Guitart i Vilardebó (Vescovo di Urgell) & Albert Lebrun (Pres. Francia) / Francesc Cairat (Sìndic General)',
    capital: 'Andorra la Vella',
    tier: 'condominium',
    overlordCode: null,
    aliases: ['AD', 'AND', 'ANDORRA', 'PRINCIPATO D\'ANDORRA', 'PRINCIPAT D\'ANDORRA'],
    isSubject: false,
  },
  LIE: {
    id: 'LIE',
    c: '#1a3c75',
    f: 'Neutrale',
    l: (s) => (s && s >= 2 ? 'Fürstentum Liechtenstein (Principe Franz Josef II)' : 'Fürstentum Liechtenstein (Principe Franz I)'),
    shortName: 'Liechtenstein',
    leader: 'Principe Franz I (fino al 1938) / Principe Franz Josef II (dal 1938) & Josef Hoop (Regierungschef)',
    capital: 'Vaduz',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['LI', 'LIE', 'LIECHTENSTEIN', 'PRINCIPATO DEL LIECHTENSTEIN', 'FUERSTENTUM_LIECHTENSTEIN', 'FÜRSTENTUM LIECHTENSTEIN'],
    isSubject: false,
  },
  MCO: {
    id: 'MCO',
    c: '#ce1126',
    f: 'Neutrale',
    l: (s) => (s && s >= 11 ? 'Principauté de Monaco (Occupazione Militare Italiana)' : 'Principauté de Monaco (Luigi II Grimaldi)'),
    shortName: 'Monaco',
    leader: 'Principe Luigi II di Monaco / Ministro di Stato Émile Roblot',
    capital: 'Monaco',
    tier: 'protectorate',
    overlordCode: null,
    aliases: ['MC', 'MCO', 'MONACO', 'PRINCIPATO DI MONACO', 'PRINCIPAUTÉ DE MONACO', 'PRINCIPAUTE DE MONACO'],
    isSubject: false,
  },

  // ==========================================
  // MEDIO ORIENTE & ASIA
  // ==========================================
  TUR: {
    id: 'TUR',
    c: '#4d6955',
    f: 'Neutrale',
    l: () => 'Repubblica di Turchia',
    shortName: 'Turchia',
    leader: 'Mustafa Kemal Atatürk / İsmet İnönü',
    capital: 'Ankara',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['TR', 'TUR', 'TURCHIA', 'TURKEY'],
    isSubject: false,
  },
  IRN: {
    id: 'IRN',
    c: '#7a8f61',
    f: 'Neutrale',
    l: (s) => (s >= 19 ? 'Stato Imperiale dell\'Iran (Sovranità Restaurata — Mohammad Reza Pahlavi)' : s >= 9 ? 'Stato Imperiale dell\'Iran (Corridoio Persiano Anglo-Sovietico — Mohammad Reza Pahlavi)' : 'Impero dell\'Iran (Persia)'),
    shortName: 'Iran',
    leader: 'Reza Shah Pahlavi',
    capital: 'Tehran',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['IR', 'IRN', 'IRAN', 'PERSIA', 'PER_IR'],
    isSubject: false,
  },
  SAU: {
    id: 'SAU',
    c: '#36663b',
    f: 'Neutrale',
    l: () => 'Regno dell\'Arabia Saudita',
    shortName: 'Arabia Saudita',
    leader: 'Re Abdulaziz Al Saud (Ibn Saud)',
    capital: 'Riyadh',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['SA', 'SAU', 'ARABIA SAUDITA', 'SAUDI ARABIA', 'REGNO DELL\'ARABIA SAUDITA'],
    isSubject: false,
  },
  YEM: {
    id: 'YEM',
    c: '#4a7a59',
    f: 'Neutrale',
    l: () => 'Regno Mutawakkilita dello Yemen',
    shortName: 'Yemen',
    leader: 'Imam Yahya Muhammad Hamid ed-Din',
    capital: 'Sana\'a',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['YE', 'YEM', 'YEMEN'],
    isSubject: false,
  },
  AFG: {
    id: 'AFG',
    c: '#6b8c73',
    f: 'Neutrale',
    l: () => 'Regno dell\'Afghanistan',
    shortName: 'Afghanistan',
    leader: 'Re Mohammed Zahir Shah',
    capital: 'Kabul',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['AF', 'AFG', 'AFGHANISTAN', 'REGNO DELL\'AFGHANISTAN'],
    isSubject: false,
  },
  TIB: {
    id: 'TIB',
    c: '#a37d6a',
    f: 'Neutrale',
    l: () => 'Tibet (Stato Teocratico Indipendente)',
    shortName: 'Tibet',
    leader: 'Reggenza del 14° Dalai Lama',
    capital: 'Lhasa',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['TIBET'],
    isSubject: false,
  },
  NEP: {
    id: 'NEP',
    c: '#9c524b',
    f: 'Neutrale',
    l: () => 'Regno del Nepal (Dinastia Shah / Primi Ministri Rana)',
    shortName: 'Nepal',
    leader: 'Re Tribhuvan / Maharaja Juddha Shumsher Rana',
    capital: 'Kathmandu',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['NP', 'NPL', 'NEP', 'NEPAL'],
    isSubject: false,
  },
  BHU: {
    id: 'BHU',
    c: '#cf8838',
    f: 'Neutrale',
    l: () => 'Regno del Bhutan (Dinastia Wangchuck)',
    shortName: 'Bhutan',
    leader: 'Druk Gyalpo Jigme Wangchuck',
    capital: 'Punakha / Thimphu',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['BT', 'BTN', 'BHU', 'BHUTAN'],
    isSubject: false,
  },
  SIA: {
    id: 'SIA',
    c: '#9e7b57',
    f: 'Neutrale',
    l: (s) => (s >= 9 ? 'Regno di Thailandia (Alleanza Militare con il Giappone del 21 Dicembre 1941 — Phibunsongkhram)' : 'Regno del Siam (Thailandia)'),
    shortName: 'Siam / Thailandia',
    leader: 'Plaek Phibunsongkhram',
    capital: 'Bangkok',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['TH', 'THA', 'SIA', 'SIAM', 'THAILAND', 'THAILANDIA'],
    isSubject: false,
  },
  HAT: {
    id: 'HAT',
    c: '#5c7a6e',
    f: 'Neutrale',
    l: (s) => (s >= 4 ? 'Provincia di Hatay (Turchia)' : 'Stato di Hatay (Repubblica di Hatay)'),
    shortName: 'Hatay',
    leader: 'Tayfur Sökmen (Pres.) / Abdurrahman Melek (P.M.)',
    capital: 'Antakya (Antiochia)',
    tier: 'autonomous',
    overlordCode: null, // Annesso alla Turchia allo step 4
    aliases: ['HATAY', 'STATO DI HATAY'],
    isSubject: false,
  },

  // ==========================================
  // AFRICA
  // ==========================================
  ETH: {
    id: 'ETH',
    c: '#2d7a4d',
    f: 'Neutrale',
    l: (s) => (s >= 19 ? 'Impero d\'Etiopia (Sovranità Restaurata — Hailé Selassié I)' : s >= 8 ? 'Impero d\'Etiopia Restaurato (Liberazione Alleata)' : s >= 1 ? 'Africa Orientale Italiana (AOI — Etiopia)' : 'Impero d\'Etiopia (Abissinia)'),
    shortName: 'Etiopia',
    leader: 'Hailé Selassié I (Negus Neghesti)',
    capital: 'Addis Abeba',
    tier: 'sovereign', // Diviene parte dell'AOI (colonia) dallo step 1
    overlordCode: null,
    aliases: ['ET', 'ETH', 'ETHIOPIA', 'ABYSSINIA', 'ABISSINIA', 'ETIOPIA', 'IMPERO D\'ETIOPIA'],
    isSubject: false,
  },
  LBR: {
    id: 'LBR',
    c: '#547299',
    f: 'Neutrale',
    l: () => 'Repubblica di Liberia',
    shortName: 'Liberia',
    leader: 'Edwin Barclay',
    capital: 'Monrovia',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['LR', 'LIB', 'LBR', 'LIBERIA', 'REPUBBLICA DI LIBERIA', 'REPUBLIC OF LIBERIA'],
    isSubject: false,
  },

  // ==========================================
  // AMERICHE (AMERICA LATINA E CENTRALE)
  // ==========================================
  BRA: {
    id: 'BRA',
    c: '#4c8a5a',
    f: 'Neutrale',
    l: (s) => (s && s >= 10 ? 'Stati Uniti del Brasile (Belligerante Alleato — Dichiarazione di Guerra all\'Asse, 22 Agosto 1942)' : 'Stati Uniti del Brasile (Estado Novo)'),
    shortName: 'Brasile',
    leader: 'Getúlio Vargas',
    capital: 'Rio de Janeiro',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['BR', 'BRA', 'BRAZIL', 'BRASILE', 'STATI UNITI DEL BRASILE', 'ESTADO NOVO'],
    isSubject: false,
  },
  ARG: {
    id: 'ARG',
    c: '#5b94b5',
    f: 'Neutrale',
    l: () => 'Repubblica Argentina (Decennio Infame)',
    shortName: 'Argentina',
    leader: 'Agustín Pedro Justo / Roberto Marcelino Ortiz',
    capital: 'Buenos Aires',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['AR', 'ARG', 'ARGENTINA', 'REPUBBLICA ARGENTINA'],
    isSubject: false,
  },
  MEX: {
    id: 'MEX',
    c: '#407353',
    f: 'Neutrale',
    l: (s) => (s && s >= 10 ? 'Stati Uniti Messicani (Belligerante Alleato — Dichiarazione di Guerra all\'Asse, 22 Maggio 1942)' : s && s >= 1 ? 'Stati Uniti Messicani (Nazionalizzazione Petrolifera PEMEX)' : 'Stati Uniti Messicani (Presidenza Cárdenas)'),
    shortName: 'Messico',
    leader: 'Gen. Lázaro Cárdenas (1934-1940) / Gen. Manuel Ávila Camacho (1940)',
    capital: 'Ciudad de México',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['MX', 'MEX', 'MEXICO', 'MESSICO', 'STATI UNITI MESSICANI', 'ESTADOS UNIDOS MEXICANOS'],
    isSubject: false,
  },
  CHL: {
    id: 'CHL',
    c: '#b55b5b',
    f: 'Neutrale',
    l: () => 'Repubblica del Cile',
    shortName: 'Cile',
    leader: 'Pedro Aguirre Cerda',
    capital: 'Santiago',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['CL', 'CHL', 'CHILE', 'CILE', 'REPUBBLICA DEL CILE'],
    isSubject: false,
  },
  PRU: {
    id: 'PRU',
    c: '#b58f5b',
    f: 'Neutrale',
    l: () => 'Repubblica Peruviana',
    shortName: 'Perù',
    leader: 'Óscar R. Benavides / Manuel Prado Ugarteche',
    capital: 'Lima',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['PE', 'PER', 'PRU', 'PERU', 'PERÙ', 'REPUBBLICA PERUVIANA', 'REPUBLIC OF PERU'],
    isSubject: false,
  },
  COL: {
    id: 'COL',
    c: '#b5a95b',
    f: 'Neutrale',
    l: () => 'Repubblica di Colombia',
    shortName: 'Colombia',
    leader: 'Alfonso López Pumarejo / Eduardo Santos',
    capital: 'Bogotá',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['CO', 'COL', 'COLOMBIA', 'REPUBBLICA DI COLOMBIA'],
    isSubject: false,
  },
  VEN: {
    id: 'VEN',
    c: '#a3b55b',
    f: 'Neutrale',
    l: () => 'Stati Uniti del Venezuela',
    shortName: 'Venezuela',
    leader: 'Eleazar López Contreras',
    capital: 'Caracas',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['VE', 'VEN', 'VENEZUELA', 'STATI UNITI DEL VENEZUELA'],
    isSubject: false,
  },
  ECU: {
    id: 'ECU',
    c: '#b59e5b',
    f: 'Neutrale',
    l: () => 'Repubblica dell\'Ecuador',
    shortName: 'Ecuador',
    leader: 'Federico Páez (1935-37) / Gen. Alberto Enríquez Gallo (1937-38) / Carlos Arroyo del Río (1940)',
    capital: 'Quito',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['EC', 'ECU', 'ECUADOR', 'REPUBBLICA DELL\'ECUADOR'],
    isSubject: false,
  },
  BOL: {
    id: 'BOL',
    c: '#86b55b',
    f: 'Neutrale',
    l: () => 'Repubblica di Bolivia',
    shortName: 'Bolivia',
    leader: 'Col. David Toro (1936-37) / Ten. Col. Germán Busch (1937-39) / Gen. Carlos Quintanilla (1939-40) / Gen. Enrique Peñaranda (1940)',
    capital: 'La Paz / Sucre',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['BO', 'BOL', 'BOLIVIA', 'REPUBBLICA DI BOLIVIA'],
    isSubject: false,
  },
  PAR: {
    id: 'PAR',
    c: '#5bb58f',
    f: 'Neutrale',
    l: () => 'Repubblica del Paraguay',
    shortName: 'Paraguay',
    leader: 'Col. Rafael Franco (1936-37) / Félix Paiva (1937-39) / Mar. José Félix Estigarribia (1939-40) / Gen. Higinio Morínigo (1940)',
    capital: 'Asunción',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['PY', 'PRY', 'PAR', 'PARAGUAY', 'REPUBBLICA DEL PARAGUAY'],
    isSubject: false,
  },
  URU: {
    id: 'URU',
    c: '#ded4be',
    f: 'Neutrale',
    l: () => 'Repubblica Orientale dell\'Uruguay',
    shortName: 'Uruguay',
    leader: 'Gabriel Terra (1931-1938) / Gen. Alfredo Baldomir (1938-1943)',
    capital: 'Montevideo',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['UY', 'URY', 'URU', 'URUGUAY'],
    isSubject: false,
  },
  GTM: {
    id: 'GTM',
    c: '#4e8779',
    f: 'Neutrale',
    l: () => 'Repubblica del Guatemala (Regime di Jorge Ubico)',
    shortName: 'Guatemala',
    leader: 'Generale Jorge Ubico (1931-1944)',
    capital: 'Ciudad de Guatemala',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['GT', 'GTM', 'GUATEMALA', 'REPUBBLICA DEL GUATEMALA', 'REPÚBLICA DE GUATEMALA'],
    isSubject: false,
  },
  SLV: {
    id: 'SLV',
    c: '#4a789c',
    f: 'Neutrale',
    l: () => 'Repubblica di El Salvador (Martiniato)',
    shortName: 'El Salvador',
    leader: 'Generale Maximiliano Hernández Martínez (1931-1944)',
    capital: 'San Salvador',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['SV', 'SLV', 'EL SALVADOR', 'REPUBBLICA DI EL SALVADOR', 'REPÚBLICA DE EL SALVADOR'],
    isSubject: false,
  },
  HND: {
    id: 'HND',
    c: '#5e8a75',
    f: 'Neutrale',
    l: () => 'Repubblica dell\'Honduras (El Cariato)',
    shortName: 'Honduras',
    leader: 'Generale Tiburcio Carías Andino (1933-1949)',
    capital: 'Tegucigalpa',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['HN', 'HND', 'HONDURAS', 'REPUBBLICA DELL\'HONDURAS', 'REPÚBLICA DE HONDURAS'],
    isSubject: false,
  },
  NIC: {
    id: 'NIC',
    c: '#7a9c82',
    f: 'Neutrale',
    l: () => 'Repubblica del Nicaragua (Regime di Anastasio Somoza)',
    shortName: 'Nicaragua',
    leader: 'Generale Anastasio Somoza García (1937-1956)',
    capital: 'Managua',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['NI', 'NIC', 'NICARAGUA', 'REPUBBLICA DEL NICARAGUA', 'REPÚBLICA DE NICARAGUA'],
    isSubject: false,
  },
  CRI: {
    id: 'CRI',
    c: '#94826b',
    f: 'Neutrale',
    l: (s) => (s >= 6 ? 'Repubblica di Costa Rica (Presidenza Calderón Guardia)' : 'Repubblica di Costa Rica (Presidenza Cortés Castro)'),
    shortName: 'Costa Rica',
    leader: 'León Cortés Castro (1936-1940) / Rafael Ángel Calderón Guardia (1940)',
    capital: 'San José',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['CR', 'CRI', 'COSTA RICA', 'REPUBBLICA DI COSTA RICA', 'REPÚBLICA DE COSTA RICA'],
    isSubject: false,
  },
  PAN: {
    id: 'PAN',
    c: '#8c6b7d',
    f: 'Neutrale',
    l: (s) => (s >= 6 ? 'Repubblica di Panama (Presidenza Arnulfo Arias)' : 'Repubblica di Panama (Trattato Hull-Alfaro)'),
    shortName: 'Panama',
    leader: 'Juan Demóstenes Arosemena (1936-1939) / Augusto S. Boyd (1939-1940) / Arnulfo Arias Madrid (1940)',
    capital: 'Ciudad de Panamá',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['PA', 'PAN', 'PANAMA', 'REPUBBLICA DI PANAMA', 'REPÚBLICA DE PANAMÁ'],
    isSubject: false,
  },
  CUB: {
    id: 'CUB',
    c: '#6b7e9c',
    f: 'Neutrale',
    l: (s) => (s >= 6 ? 'Repubblica di Cuba (Costituzione Democratica del 1940)' : 'Repubblica di Cuba (Presidenza Laredo Brú / Batista)'),
    shortName: 'Cuba',
    leader: 'Federico Laredo Brú (1936-1940) / Col. Fulgencio Batista (1940)',
    capital: 'La Habana',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['CU', 'CUB', 'CUBA', 'REPUBBLICA DI CUBA', 'REPÚBLICA DE CUBA'],
    isSubject: false,
  },
  DOM: {
    id: 'DOM',
    c: '#9c6b6b',
    f: 'Neutrale',
    l: () => 'Repubblica Dominicana (Era di Trujillo)',
    shortName: 'Repubblica Dominicana',
    leader: 'Generalissimo Rafael Leónidas Trujillo (1930-1938) / Jacinto Peynado (1938-1940)',
    capital: 'Ciudad Trujillo (Santo Domingo)',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['DO', 'DOM', 'REPUBBLICA DOMINICANA', 'DOMINICAN REPUBLIC', 'CIUDAD TRUJILLO'],
    isSubject: false,
  },
  HAI: {
    id: 'HAI',
    c: '#7d6b9c',
    f: 'Neutrale',
    l: () => 'Repubblica di Haiti (Presidenza Sténio Vincent)',
    shortName: 'Haiti',
    leader: 'Sténio Vincent (1930-1941)',
    capital: 'Port-au-Prince',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['HT', 'HTI', 'HAI', 'HAITI', 'REPUBBLICA DI HAITI', 'RÉPUBLIQUE D\'HAÏTI'],
    isSubject: false,
  },

  // ==========================================
  // FALLBACK NEUTRALE GENERALE
  // ==========================================
  NEU: {
    id: 'NEU',
    c: '#b5a98d',
    f: 'Neutrale',
    l: () => 'Nazione Indipendente (Neutrale)',
    shortName: 'Neutrale',
    tier: 'neutral_misc',
    overlordCode: null,
    aliases: ['NEUTRAL', 'INDEPENDENT', 'INDIPENDENTE', 'NON ALLINEATO'],
    isSubject: false,
  },
};

/**
 * 2. TABELLA DI DISPATCHING ALIAS
 * Mappatura completa e centralizzata che collega qualsiasi acronimo, codice ISO-2/3 o variante al codice canonico.
 */
export const OWNER_ALIASES: Record<string, string> = {
  // ISO-2 e sigle veloci
  DE: 'GER',
  DEU: 'GER',
  IT: 'ITA',
  GB: 'UK',
  GBR: 'UK',
  FR: 'FRA',
  US: 'USA',
  SU: 'SOV',
  RU: 'SOV',
  RUS: 'SOV',
  JP: 'JAP',
  JPN: 'JAP',
  CN: 'CHI',
  CHN: 'CHI',
  PL: 'POL',
  CZ: 'CZE',
  CS: 'CZE',
  SK: 'SLO',
  SVK: 'SLO',
  HU: 'HUN',
  RO: 'ROM',
  ROU: 'ROM',
  BG: 'BUL',
  BGR: 'BUL',
  GR: 'GRE',
  EL: 'GRE',
  AL: 'ALB',
  YU: 'YUG',
  DFJ: 'DFJ',
  YUG_DFJ: 'DFJ',
  NOVJ: 'DFJ',
  VN: 'VIE',
  VNM: 'VIE',
  DRV: 'VIE',
  VIETNAM: 'VIE',
  VIET_MINH: 'VIE',
  ID: 'IDN',
  IDN: 'IDN',
  INA: 'IDN',
  INDONESIA: 'IDN',
  AMG: 'AMG',
  AMG_VG: 'AMG',
  AMG_FTT: 'AMG',
  TLT: 'AMG',
  FTT: 'AMG',
  STO: 'AMG',
  FNRJ: 'DFJ',
  SFRJ: 'DFJ',
  ACC: 'ACC',
  ES: 'SPR',
  ESP: 'SPR',
  PT: 'POR',
  PRT: 'POR',
  SE: 'SWE',
  CH: 'SWI',
  CHE: 'SWI',
  AT: 'AUS',
  AUT: 'AUS',
  FI: 'FIN',
  NO: 'NOR',
  DK: 'DEN',
  DNK: 'DEN',
  NL: 'HOL',
  NLD: 'HOL',
  BE: 'BEL',
  LU: 'LUX',
  IE: 'IRE',
  EIR: 'IRE',
  IRL: 'IRE',
  IS: 'ICE',
  ISL: 'ICE',
  EE: 'EST',
  LV: 'LAT',
  LVA: 'LAT',
  LT: 'LIT',
  LTU: 'LIT',
  TR: 'TUR',
  IR: 'IRN',
  PER_IR: 'IRN',
  SA: 'SAU',
  YE: 'YEM',
  AF: 'AFG',
  IN: 'RAJ',
  IND: 'RAJ',
  PK: 'RAJ',
  PAK: 'PAK',
  HYD: 'HYD',
  KAS: 'KAS',
  SAAR: 'SAAR',
  JOR: 'JOR',
  SY: 'SYR',
  SYR: 'SYR',
  LB: 'LEB',
  LEB: 'LEB',
  LBN: 'LEB',
  TANGER: 'TANGER',
  CA: 'CAN',
  AU: 'AST',
  NZ: 'NZL',
  ZA: 'SAF',
  ZAF: 'SAF',
  EG: 'EGY',
  IQ: 'IRQ',
  ET: 'ETH',
  LR: 'LBR',
  LIB: 'LBR',
  TH: 'SIA',
  THA: 'SIA',
  BR: 'BRA',
  AR: 'ARG',
  MX: 'MEX',
  CL: 'CHL',
  PE: 'PRU',
  PER: 'PRU',
  CO: 'COL',
  VE: 'VEN',
  EC: 'ECU',
  BO: 'BOL',
  PY: 'PAR',
  PRY: 'PAR',
  UY: 'URU',
  URY: 'URU',
  GT: 'GTM',
  SV: 'SLV',
  HN: 'HND',
  NI: 'NIC',
  CR: 'CRI',
  PA: 'PAN',
  CU: 'CUB',
  DO: 'DOM',
  HT: 'HAI',
  HTI: 'HAI',
  SM: 'SMR',
  VA: 'VAT',
  GI: 'GIB',
  AD: 'AND',
  LI: 'LIE',
  MC: 'MCO',
  MCO: 'MCO',
  MN: 'MON',
  MNG: 'MON',
  PH: 'PHL',
  PHI: 'PHL',
  NP: 'NEP',
  NPL: 'NEP',
  BT: 'BHU',
  BTN: 'BHU',

  // Varianti storiche ed esplicite
  PHILIPPINES: 'PHL',
  FILIPPINE: 'PHL',
  'COMMONWEALTH DELLE FILIPPINE': 'PHL',
  'COMMONWEALTH OF THE PHILIPPINES': 'PHL',
  TANNU_TUVA: 'TUV',
  'TANNU TUVA': 'TUV',
  TUVA: 'TUV',
  TYVA: 'TUV',
  LIBERIA: 'LBR',
  'REPUBBLICA DI LIBERIA': 'LBR',
  'REPUBLIC OF LIBERIA': 'LBR',
  MONGOLIA: 'MON',
  'REPUBBLICA POPOLARE MONGOLA': 'MON',
  'MONGOLIAN PEOPLE\'S REPUBLIC': 'MON',
  SAN_MARINO: 'SMR',
  'SAN MARINO': 'SMR',
  VATICAN: 'VAT',
  VATICANO: 'VAT',
  VATICAN_CITY: 'VAT',
  HOLY_SEE: 'VAT',
  GIBRALTAR: 'GIB',
  GIBILTERRA: 'GIB',
  ANDORRA: 'AND',
  'PRINCIPATO D\'ANDORRA': 'AND',
  'PRINCIPAT D\'ANDORRA': 'AND',
  LIECHTENSTEIN: 'LIE',
  'PRINCIPATO DEL LIECHTENSTEIN': 'LIE',
  FUERSTENTUM_LIECHTENSTEIN: 'LIE',
  'FÜRSTENTUM LIECHTENSTEIN': 'LIE',
  MONACO: 'MCO',
  'PRINCIPATO DI MONACO': 'MCO',
  'PRINCIPAUTÉ DE MONACO': 'MCO',
  'PRINCIPAUTE DE MONACO': 'MCO',
  AUSTRIA: 'AUS',
  OESTERREICH: 'AUS',
  SVIZZERA: 'SWI',
  SWITZERLAND: 'SWI',
  ROMANIA: 'ROM',
  POLONIA: 'POL',
  POLAND: 'POL',
  CECOSLOVACCHIA: 'CZE',
  CZECHOSLOVAKIA: 'CZE',
  GERMANIA: 'GER',
  GERMANY: 'GER',
  ITALIA: 'ITA',
  ITALY: 'ITA',
  RUSSIA: 'SOV',
  URSS: 'SOV',
  SSSR: 'SOV',
  'SOVIET UNION': 'SOV',
  'UNIONE SOVIETICA': 'SOV',
  'STATI UNITI': 'USA',
  'UNITED STATES': 'USA',
  'GRAN BRETAGNA': 'UK',
  'UNITED KINGDOM': 'UK',
  FRANCIA: 'FRA',
  FRANCE: 'FRA',
  VICHY: 'VIC',
  'FRANCIA DI VICHY': 'VIC',
  'FRANCIA_DI_VICHY': 'VIC',
  'STATO FRANCESE': 'VIC',
  'STATO_FRANCESE': 'VIC',
  'ETAT FRANCAIS': 'VIC',
  'ETAT_FRANCAIS': 'VIC',
  'FRANCE LIBRE': 'FFL_AEF',
  'FRANCE_LIBRE': 'FFL_AEF',
  'FRANCIA LIBERA': 'FFL_AEF',
  'FRANCIA_LIBERA': 'FFL_AEF',
  'DE GAULLE': 'FFL_AEF',
  'DE_GAULLE': 'FFL_AEF',
  GIAPPONE: 'JAP',
  JAPAN: 'JAP',
  BRASILE: 'BRA',
  BRAZIL: 'BRA',
  PERU: 'PRU',
  PERÙ: 'PRU',
  EGITTO: 'EGY',
  EGYPT: 'EGY',
  AFGHANISTAN: 'AFG',
};

/**
 * Registra gli alias definiti all'interno di CANONICAL_OWNERS
 */
for (const [canonKey, cfg] of Object.entries(CANONICAL_OWNERS)) {
  if (cfg.aliases) {
    for (const al of cfg.aliases) {
      const up = al.toUpperCase();
      if (!OWNER_ALIASES[up]) {
        OWNER_ALIASES[up] = canonKey;
      }
    }
  }
}

/**
 * 3. DIZIONARIO GLOBALE DIRETTO RETROCOMPATIBILE
 * Fornisce a tutte le parti dell'applicazione e ai test l'accesso diretto via `OWNERS[key]`.
 * Include ogni codice canonico e ogni alias reindirizzato all'oggetto di configurazione canonico.
 */
export const OWNERS: Record<string, OwnerConfig> = { ...CANONICAL_OWNERS };

for (const [alias, canonKey] of Object.entries(OWNER_ALIASES)) {
  if (CANONICAL_OWNERS[canonKey]) {
    OWNERS[alias] = CANONICAL_OWNERS[canonKey];
  }
}

export const OWN_FALLBACK: OwnerConfig = {
  id: 'NEU',
  c: '#5a5f66',
  f: 'Neutrale',
  l: () => '—',
  shortName: '—',
  tier: 'neutral_misc',
  overlordCode: null,
  isSubject: false,
};

/**
 * Risolve un qualsiasi codice, acronimo o toponimo nel suo codice proprietario canonico.
 */
export function canonicalizeOwnerCode(o: string, _step?: number): string {
  if (!o) return 'NEU';
  const cleanKey = o.trim().toUpperCase();
  if (_step !== undefined && _step < 19 && (cleanKey === 'IND' || cleanKey === 'IN' || cleanKey === 'PK' || cleanKey === 'PAK')) {
    return 'RAJ';
  }
  if (_step !== undefined && _step >= 19) {
    if (cleanKey === 'IND' || cleanKey === 'IN') return 'IND';
    if (cleanKey === 'PAK' || cleanKey === 'PK') return 'PAK';
  }
  if (CANONICAL_OWNERS[cleanKey]) return cleanKey;
  if (OWNER_ALIASES[cleanKey]) return OWNER_ALIASES[cleanKey];
  return cleanKey;
}

/**
 * Restituisce i metadati storici dell'owner garantendo zero eccezioni e fallback pulito.
 */
export function getOwnerMeta(o: string, _step?: number): OwnerConfig {
  if (!o) return OWN_FALLBACK;
  const cleanKey = o.trim().toUpperCase();
  if (_step !== undefined && _step < 19 && (cleanKey === 'IND' || cleanKey === 'PK')) {
    return CANONICAL_OWNERS['RAJ'] || OWN_FALLBACK;
  }
  if (_step !== undefined && _step >= 19 && (cleanKey === 'IND' || cleanKey === 'IN')) {
    return CANONICAL_OWNERS['IND'] || OWN_FALLBACK;
  }
  if (_step !== undefined && _step >= 19 && (cleanKey === 'PAK' || cleanKey === 'PK')) {
    return CANONICAL_OWNERS['PAK'] || OWN_FALLBACK;
  }
  const direct = OWNERS[cleanKey] || OWNERS[o];
  const meta = direct || CANONICAL_OWNERS[canonicalizeOwnerCode(cleanKey, _step)] || OWN_FALLBACK;
  if (_step !== undefined && _step >= 19 && (meta.id === 'CCP_CHI' || meta.id === 'CCP')) {
    return {
      ...meta,
      f: 'Comintern',
      l: () => 'Partito Comunista Cinese — Esercito Popolare di Liberazione (PCC / EPL)',
      shortName: 'Cina Popolare (PCC / EPL)',
      leader: 'Mao Zedong (Presidente del PCC) · Zhu De (Comandante in Capo dell\'EPL) · Lin Biao · Zhou Enlai',
      capital: 'Harbin (Quartier Generale Nord-Est) / Shaanxi Settentrionale (Comitato Centrale)',
      tier: 'autonomous',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 19 && meta.id === 'CHI') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Repubblica di Cina (Governo Nazionale del Kuomintang — Nanchino)',
      shortName: 'Repubblica di Cina (KMT)',
      leader: 'Generalissimo Chiang Kai-shek (Presidente del Governo Nazionale) · Chang Chun (Primo Ministro) · Chen Cheng',
      capital: 'Nanjing (Nanchino)',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 19 && meta.id === 'ITA') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Repubblica Italiana (Governo De Gasperi — Assemblea Costituente)',
      shortName: 'Repubblica Italiana',
      leader: 'Enrico De Nicola (Capo Provvisorio dello Stato) — Alcide De Gasperi (Presidente del Consiglio)',
      capital: 'Roma',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step === 18 && meta.id === 'ITA') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Regno d\'Italia (Governo Parri — Luogotenenza di Umberto II)',
      shortName: 'Regno d\'Italia',
      leader: 'Umberto di Savoia (Luogotenente Generale) — Ferruccio Parri (Presidente del Consiglio / CLN)',
      capital: 'Roma',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 14 && _step < 18 && meta.id === 'ITA') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Regno d\'Italia (Governo Bonomi — Roma Capitale Liberata & Cobelligeranza)',
      shortName: 'Regno d\'Italia',
      leader: 'Umberto di Savoia (Luogotenente) — Ivanoe Bonomi (Presidente del Consiglio / CLN)',
      capital: 'Roma',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step === 13 && meta.id === 'ITA') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Regno d\'Italia (Regno del Sud — Cobelligerante con gli Alleati)',
      shortName: 'Regno d\'Italia',
      leader: 'Re Vittorio Emanuele III — Maresciallo Pietro Badoglio (Capo del Governo)',
      capital: 'Brindisi / Salerno',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step < 13 && meta.id === 'ITA') {
    return {
      ...meta,
      f: 'Asse',
      l: (s) => (s >= 1 ? 'Regno d\'Italia (Impero AOI)' : 'Regno d\'Italia'),
      shortName: 'Italia',
      leader: 'Benito Mussolini (Capo del Governo e Duce del Fascismo) — Re Vittorio Emanuele III',
      capital: 'Roma',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 19 && (meta.id === 'DFJ' || meta.id === 'YUG')) {
    return {
      ...meta,
      f: 'Comintern',
      l: () => 'Repubblica Federativa Popolare di Jugoslavia (FNRJ — Maresciallo Tito)',
      shortName: 'Jugoslavia (FNRJ)',
      leader: 'Maresciallo Josip Broz Tito (Primo Ministro e Comandante Supremo) — Ivan Ribar (Presidente del Presidium)',
      capital: 'Beograd (Belgrado)',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 16 && meta.id === 'YUG') {
    return {
      ...meta,
      f: 'Alleati',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step < 19 && meta.id === 'DFJ') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Jugoslavia Federale Democratica (Demokratska Federativna Jugoslavija — Maresciallo Tito)',
      shortName: 'Jugoslavia (DFJ)',
      leader: 'Maresciallo Josip Broz Tito / Ivan Šubašić',
      capital: 'Beograd (Belgrado)',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 19 && (meta.id === 'AMG' || meta.id === 'TLT')) {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Territorio Libero di Trieste — Zona A (Governo Militare Alleato AMG-FTT)',
      shortName: 'Trieste (Zona A TLT)',
      leader: 'Magg. Gen. Sir Terence Airey (Comandante Generale AMG-FTT / TRUST & BETFOR)',
      capital: 'Trieste',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 14 && (meta.id === 'FFL_AEF' || meta.id === 'FFL')) {
    return {
      ...meta,
      c: '#4c6a9c',
      shortName: 'Francia (GPRF)',
      l: () => 'Gouvernement Provisoire de la République Française (GPRF — De Gaulle)',
      capital: 'Parigi (Capitale della Repubblica Francese)',
      leader: 'Général Charles de Gaulle (Président du GPRF)',
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 18 && (meta.id === 'SIA' || meta.id === 'THA')) {
    if (_step >= 19) {
      return {
        ...meta,
        f: 'Neutrale',
        shortName: 'Thailandia',
        l: () => 'Regno di Thailandia (Ratcha-anachak Thai — Post-Trattato di Washington & ONU)',
        leader: 'Re Bhumibol Adulyadej (Rama IX) / P.M. Thawan Thamrongnawasawat',
        isSubject: false,
        overlordCode: null,
      };
    }
    return {
      ...meta,
      f: 'Neutrale',
      shortName: 'Thailandia',
      l: () => 'Regno di Thailandia (Governo di Pace Seri Thai — Reggente Pridi Banomyong & Seni Pramoj)',
      leader: 'Reggente Pridi Banomyong / P.M. Seni Pramoj',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 18 && meta.id === 'GER') {
    return {
      ...meta,
      f: 'Alleati',
      shortName: 'Germania (ACC)',
      l: () => 'Germania Occupata (Consiglio di Controllo Alleato — Alliierter Kontrollrat)',
      leader: 'Allied Control Council (Žukov, Eisenhower, Montgomery, Kœnig)',
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 18 && meta.id === 'JAP') {
    return {
      ...meta,
      f: 'Alleati',
      shortName: 'Giappone (SCAP)',
      l: () => 'Giappone (Occupazione Alleata SCAP — Generale Douglas MacArthur)',
      leader: 'General of the Army Douglas MacArthur (SCAP) / Imperatore Hirohito',
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 18 && (meta.id === 'AUS' || meta.id === 'AUT')) {
    return {
      ...meta,
      f: 'Alleati',
      shortName: 'Austria (ACA)',
      l: () => 'Repubblica d\'Austria (Commissione Alleata per l\'Austria & Governo Karl Renner)',
      leader: 'Allied Commission for Austria / Cancelliere Karl Renner',
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 19 && meta.id === 'UK') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Attlee & Decolonizzazione)',
      shortName: 'Regno Unito',
      leader: 'Re Giorgio VI · Primo Ministro Clement Attlee (Labour) · Segretario agli Esteri Ernest Bevin',
      capital: 'Londra',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 19 && (meta.id === 'FRA' || meta.id === 'F_COL' || meta.id === 'F_AOF' || meta.id === 'FFL_AEF' || meta.id === 'F_AEF')) {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Quarta Repubblica Francese (Unione Francese — Presidente Vincent Auriol)',
      shortName: 'Francia (IVe République)',
      leader: 'Presidente Vincent Auriol · Presidente del Consiglio Paul Ramadier',
      capital: 'Parigi',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 18 && (meta.id === 'IRN' || meta.id === 'IR')) {
    return {
      ...meta,
      f: 'Neutrale',
      l: () => 'Stato Imperiale dell\'Iran (Shahanshah Mohammad Reza Pahlavi)',
      shortName: 'Iran',
      leader: 'Shahanshah Mohammad Reza Pahlavi · Primo Ministro Ahmad Qavam (Qavam os-Saltaneh)',
      capital: 'Teheran',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 18 && (meta.id === 'IRQ' || meta.id === 'IQ')) {
    return {
      ...meta,
      f: 'Neutrale',
      l: () => 'Regno dell\'Iraq (Regno Hascemita — Governo Civile)',
      shortName: 'Iraq',
      leader: 'Re Faisal II (Reggente \'Abd al-Ilah) · Primo Ministro Salih Jabr',
      capital: 'Baghdad',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step === 18 && (meta.id === 'EGY' || meta.id === 'EG')) {
    return {
      ...meta,
      f: 'Neutrale',
      l: () => 'Regno d\'Egitto (Ricorso all\'ONU contro la Presenza Militare Britannica)',
      shortName: 'Egitto',
      leader: 'Re Faruq I · Primo Ministro Mahmoud an-Nukrashi Pasha',
      capital: 'Il Cairo',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 18 && (meta.id === 'JOR' || meta.id === 'JO')) {
    return {
      ...meta,
      f: 'Neutrale',
      l: () => 'Regno Hascemita di Transgiordania (Indipendenza del 25 Maggio 1946)',
      shortName: 'Transgiordania',
      leader: 'Re Abdullah I bin Al-Hussein · Primo Ministro Samir al-Rifai · Ten. Gen. John Bagot Glubb (Glubb Pasha)',
      capital: 'Amman',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 18 && (meta.id === 'SYR' || meta.id === 'SY')) {
    return {
      ...meta,
      f: 'Neutrale',
      l: () => 'Repubblica Siriana (Indipendenza Sovrana — Ritiro Truppe Anglo-Francesi)',
      shortName: 'Siria',
      leader: 'Presidente Shukri al-Quwatli · Primo Ministro Jamil Mardam Bey',
      capital: 'Damasco',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 18 && (meta.id === 'LEB' || meta.id === 'LB' || meta.id === 'LBN')) {
    return {
      ...meta,
      f: 'Neutrale',
      l: () => 'Repubblica Libanese (Indipendenza Sovrana — Evacuazione Anglo-Francese)',
      shortName: 'Libano',
      leader: 'Presidente Béchara El Khoury · Primo Ministro Riad Al Solh',
      capital: 'Beirut',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 18 && (meta.id === 'TANGER' || meta.id === 'TANGIER')) {
    return {
      ...meta,
      f: 'Neutrale',
      l: () => 'Zona Internazionale di Tangeri (Amministrazione Internazionale Restaurata)',
      shortName: 'Tangeri',
      leader: 'Comité de Contrôle International (Vice-Amiral Lehuraux / Edmond de Panafieu)',
      capital: 'Tanger',
      tier: 'international',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 18 && meta.id === 'USA') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => _step >= 19 ? 'Stati Uniti d\'America (Dottrina Truman & Piano Marshall)' : 'Stati Uniti d\'America (Vittoria Globale & Nazioni Unite)',
      shortName: 'Stati Uniti d\'America',
      leader: 'Presidente Harry S. Truman (33º Presidente degli Stati Uniti)',
      capital: 'Washington, D.C.',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && meta.id === 'DEN') {
    if (_step >= 19) {
      return {
        ...meta,
        f: 'Alleati',
        l: () => 'Regno di Danimarca (Kongeriget Danmark)',
        shortName: 'Danimarca',
        leader: 'Re Federico IX · Primo Ministro Knud Kristensen',
        capital: 'Copenaghen',
        isSubject: false,
        overlordCode: null,
      };
    }
    if (_step === 18) {
      return {
        ...meta,
        f: 'Alleati',
        l: () => 'Regno di Danimarca (Liberato — Membro Fondatore ONU)',
        shortName: 'Danimarca',
        leader: 'Re Cristiano X · Primo Ministro Vilhelm Buhl',
        capital: 'Copenaghen',
        isSubject: false,
        overlordCode: null,
      };
    }
  }
  if (_step !== undefined && meta.id === 'FIN') {
    if (_step >= 19) {
      return {
        ...meta,
        f: 'Neutrale',
        l: () => 'Repubblica di Finlandia (Trattato di Pace di Parigi — Neutralità Sovrana)',
        shortName: 'Finlandia',
        leader: 'Presidente Juho Kusti Paasikivi · Primo Ministro Mauno Pekkala',
        capital: 'Helsinki',
        isSubject: false,
        overlordCode: null,
      };
    }
    if (_step === 18) {
      return {
        ...meta,
        f: 'Neutrale',
        l: () => 'Repubblica di Finlandia (Dopoguerra — Governo Paasikivi & Commissione di Controllo ACC)',
        shortName: 'Finlandia',
        leader: 'Presidente Carl Gustaf Emil Mannerheim · Primo Ministro Juho Kusti Paasikivi',
        capital: 'Helsinki',
        isSubject: false,
        overlordCode: null,
      };
    }
    if (_step === 17) {
      return {
        ...meta,
        f: 'Neutrale',
        l: () => 'Repubblica di Finlandia (Fine della Guerra di Lapponia)',
        shortName: 'Finlandia',
        leader: 'Presidente Carl Gustaf Emil Mannerheim · Primo Ministro Juho Kusti Paasikivi',
        capital: 'Helsinki',
        isSubject: false,
        overlordCode: null,
      };
    }
    if (_step === 16) {
      return {
        ...meta,
        f: 'Alleati',
        l: () => 'Repubblica di Finlandia (Armistizio di Mosca & Guerra di Lapponia)',
        shortName: 'Finlandia',
        leader: 'Presidente C.G.E. Mannerheim · Gen. Hjalmar Siilasvuo',
        capital: 'Helsinki',
        isSubject: false,
        overlordCode: null,
      };
    }
    if (_step >= 9 && _step <= 15) {
      return {
        ...meta,
        f: 'Asse',
        l: () => 'Repubblica di Finlandia (Guerra di Continuazione — Jatkosota)',
        shortName: 'Finlandia',
        leader: _step >= 15 ? 'Maresciallo Carl Gustaf Emil Mannerheim (Presidente)' : 'Presidente Risto Ryti · Maresciallo C.G.E. Mannerheim',
        capital: 'Helsinki',
        isSubject: false,
        overlordCode: null,
      };
    }
    if (_step >= 7 && _step <= 8) {
      return {
        ...meta,
        f: 'Neutrale',
        l: () => 'Repubblica di Finlandia (Post-Guerra d\'Inverno — Tregua Armata)',
        shortName: 'Finlandia',
        leader: 'Presidente Risto Ryti · Maresciallo C.G.E. Mannerheim',
        capital: 'Helsinki',
        isSubject: false,
        overlordCode: null,
      };
    }
    return {
      ...meta,
      f: 'Neutrale',
      l: () => 'Repubblica di Finlandia',
      shortName: 'Finlandia',
      leader: 'Presidente Kyösti Kallio · Maresciallo C.G.E. Mannerheim',
      capital: 'Helsinki',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 16 && meta.id === 'BEL') {
    return {
      ...meta,
      f: 'Alleati',
      shortName: 'Belgio',
      l: () => 'Regno del Belgio',
      leader: _step >= 17 ? 'Reggente Principe Carlo / Achille Van Acker' : 'Re Leopoldo III / Hubert Pierlot',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 19 && (meta.id === 'PHL' || meta.id === 'PHI')) {
    return {
      ...meta,
      c: '#2b5f8c',
      f: 'Alleati',
      l: () => 'Repubblica delle Filippine (Terza Repubblica — Indipendenza del 4 Luglio 1946)',
      shortName: 'Filippine',
      leader: 'Presidente Manuel Roxas · Vicepresidente Elpidio Quirino',
      capital: 'Manila',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 19 && (meta.id === 'VIE' || meta.id === 'DRV')) {
    return {
      ...meta,
      f: 'Comintern',
      l: () => 'Repubblica Democratica del Vietnam (Việt Minh — Governo della Resistenza nel Việt Bắc)',
      shortName: 'Vietnam (DRV / Việt Minh)',
      leader: 'Presidente Hồ Chí Minh · Generale Võ Nguyên Giáp (Comandante Supremo) · Trường Chinh',
      capital: 'Việt Bắc (Bắc Kạn / Thái Nguyên — Base Centrale della Resistenza)',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 19 && (meta.id === 'IDN' || meta.id === 'INA')) {
    return {
      ...meta,
      f: 'Neutrale',
      l: () => "Repubblica d'Indonesia (Republik Indonesia — Capitale a Yogyakarta & Resistenza TNI)",
      shortName: "Repubblica d'Indonesia",
      leader: 'Presidente Sukarno · Vicepresidente Mohammad Hatta · P.M. Amir Sjarifuddin · Gen. Soedirman (TNI)',
      capital: 'Yogyakarta (Capitale Rivoluzionaria 1946–1949 / Sultano Hamengkubuwono IX)',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step === 18 && (meta.id === 'IDN' || meta.id === 'INA')) {
    return {
      ...meta,
      f: 'Neutrale',
      l: () => "Repubblica d'Indonesia (Proclamazione d'Indipendenza — Sukarno & Hatta)",
      shortName: "Repubblica d'Indonesia",
      leader: 'Sukarno / Mohammad Hatta',
      capital: 'Jakarta (Batavia)',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 19 && meta.id === 'HOL') {
    return {
      ...meta,
      f: 'Alleati',
      shortName: 'Paesi Bassi',
      l: () => 'Regno dei Paesi Bassi (Governo Louis Beel & Amministrazione van Mook)',
      leader: 'Regina Guglielmina · P.M. Louis Beel · Luogotenente Gov.-Gen. Hubertus van Mook',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step === 18 && meta.id === 'HOL') {
    return {
      ...meta,
      f: 'Alleati',
      shortName: 'Paesi Bassi',
      l: () => 'Regno dei Paesi Bassi',
      leader: 'Regina Guglielmina / Wim Schermerhorn',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 18 && (meta.id === 'NOR' || meta.id === 'NO')) {
    return {
      ...meta,
      f: 'Alleati',
      shortName: 'Norvegia',
      l: () => 'Regno di Norvegia',
      leader: 'Re Haakon VII / Einar Gerhardsen',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 19 && meta.id === 'EGY') {
    return {
      ...meta,
      c: '#2f7d73',
      f: 'Neutrale',
      l: () => "Regno d'Egitto (Sovranità Nazionale & Crisi del Canale di Suez)",
      leader: 'Re Faruq I · Primo Ministro Mahmoud an-Nukrashi Pasha',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 19 && meta.id === 'IRQ') {
    return {
      ...meta,
      f: 'Neutrale',
      l: () => "Regno dell'Iraq (Governo Costituzionale — Salih Jabr & Reggente 'Abd al-Ilah)",
      leader: "Re Faysal II · Reggente 'Abd al-Ilah · P.M. Salih Jabr",
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 19 && meta.id === 'IRN') {
    return {
      ...meta,
      f: 'Neutrale',
      l: () => "Stato Imperiale dell'Iran (Sovranità Restaurata — Mohammad Reza Pahlavi)",
      leader: 'Scià Mohammad Reza Pahlavi · Primo Ministro Ahmad Qavam',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 19 && meta.id === 'ETH') {
    return {
      ...meta,
      f: 'Neutrale',
      l: () => "Impero d'Etiopia (Sovranità Restaurata — Hailé Selassié I)",
      leader: 'Imperatore Hailé Selassié I · Primo Ministro Makonnen Endelkachew',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 14 && meta.id === 'LBR') {
    return {
      ...meta,
      f: _step >= 19 ? 'Neutrale' : 'Alleati',
      l: () => _step >= 19 ? 'Repubblica di Liberia (Sovranità & Porto Franco di Monrovia)' : 'Repubblica di Liberia (Belligerante Alleato)',
      leader: 'Presidente William V.S. Tubman',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 18 && meta.id === 'SPA') {
    return {
      ...meta,
      f: 'Neutrale',
      l: () => 'Stato Spagnolo (Regime Franchista — Neutralità e Isolamento Postbellico)',
      leader: 'Francisco Franco (Caudillo de España)',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 18 && meta.id === 'POL') {
    return {
      ...meta,
      l: () => _step >= 19
        ? 'Repubblica di Polonia (Rzeczpospolita Polska — Confini Oder-Neisse)'
        : 'Repubblica di Polonia (Governo Provvisorio di Unità Nazionale — TRJN)',
      leader: _step >= 19
        ? 'Bolesław Bierut · Józef Cyrankiewicz'
        : 'Bolesław Bierut (KRN) · Edward Osóbka-Morawski (TRJN)',
    };
  }
  if (_step !== undefined && _step >= 18 && meta.id === 'SLO') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Repubblica Cecoslovacca — Slovacchia Restaurata (Terza Repubblica)',
      leader: 'Edvard Beneš · Klement Gottwald',
      overlordCode: null,
      isSubject: false,
    };
  }
  if (_step !== undefined && _step >= 18 && meta.id === 'ROM') {
    return {
      ...meta,
      f: 'Comintern',
      l: () => _step >= 19
        ? 'Regno di Romania (Trattato di Pace di Parigi 1947 · Governo Petru Groza)'
        : 'Regno di Romania (Re Michele I · Governo Petru Groza)',
      leader: 'Re Michele I · P.M. Petru Groza',
    };
  }
  if (_step !== undefined && _step >= 18 && meta.id === 'HUN') {
    return {
      ...meta,
      f: 'Comintern',
      l: () => _step >= 19
        ? 'Seconda Repubblica Ungherese (Trattato di Pace di Parigi 1947)'
        : 'Ungheria (Governo Provvisorio Nazionale — Post-Armistizio 1945)',
      leader: _step >= 19 ? 'Zoltán Tildy · Lajos Dinnyés' : 'Béla Miklós · Zoltán Tildy',
    };
  }
  if (_step !== undefined && _step >= 18 && (meta.id === 'OZAV' || meta.id === 'OZAK' || meta.id === 'RSI' || meta.id === 'CRO' || meta.id === 'VIC' || meta.id === 'VIC_COL')) {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Territorio Liberato Post-1945 (Entità dell\'Asse Dissolta)',
      leader: 'Amministrazione Civile / Alleata Postbellica',
    };
  }
  return meta;
}

/**
 * 4. MOTORE GERARCHICO DI SOVRANITÀ (Overlords / Subjects / Puppets / Colonies)
 */

/**
 * Restituisce lo stato sovrano metropolitano (Madrepatria / Sovrano) di un'entità sottomessa al passaggio t.
 */
export function getOverlord(o: string, step: number = 0): OwnerConfig | null {
  const meta = getOwnerMeta(o);
  const canon = meta.id || canonicalizeOwnerCode(o);

  // Casi dinamici dipendenti dal tempo
  if (canon === 'ETH') {
    // Prima dell'occupazione (maggio 1936 / step 1) e dopo la liberazione di Addis Abeba (6 aprile 1941 / step 8), l'Etiopia è impero sovrano indipendente
    return step >= 1 && step < 8 ? getOwnerMeta('ITA') : null;
  }
  if (canon === 'EGY') {
    // Dopo lo sgombero militare britannico dal Cairo e dal Delta nella Zona del Canale (marzo 1947 / step >= 19), l'Egitto è riconosciuto come Stato sovrano distinto
    return step >= 19 ? null : getOwnerMeta('UK');
  }
  if (canon === 'IRQ') {
    // Colpo di Stato nazionalista filo-Asse di Rashid Ali al-Kaylani (aprile 1941 / step 8) o fine dell'occupazione PAIFORCE nel dopoguerra (step >= 19)
    return step === 8 || step >= 19 ? null : getOwnerMeta('UK');
  }
  if (canon === 'ALB') {
    // Prima dell'invasione e unione personale (aprile 1939 / step 4), l'Albania era indipendente;
    // dopo l'armistizio italiano (settembre 1943 / step 13), l'Albania passa sotto occupazione della Wehrmacht tedesca
    return step >= 13 ? getOwnerMeta('GER') : step >= 4 ? getOwnerMeta('ITA') : null;
  }
  if (canon === 'HAT') {
    // Annesso alla Turchia nel luglio 1939 (step 4)
    return step >= 4 ? getOwnerMeta('TUR') : null;
  }
  if (canon === 'PHL' || canon === 'PHI') {
    // Indipendenza delle Filippine proclamata il 4 luglio 1946 (step >= 19)
    return step >= 19 ? null : getOwnerMeta('USA');
  }

  if (meta.overlordCode) {
    return getOwnerMeta(meta.overlordCode);
  }

  return null;
}

/**
 * Restituisce tutte le entità subordinate (colonie, fantocci, dominion) di una potenza sovrana.
 */
export function getSubjects(masterCode: string, step: number = 0): OwnerConfig[] {
  const cleanMaster = canonicalizeOwnerCode(masterCode);
  const subjects: OwnerConfig[] = [];

  for (const [code, cfg] of Object.entries(CANONICAL_OWNERS)) {
    if (code === cleanMaster) continue;
    const overlord = getOverlord(code, step);
    if (overlord && (overlord.id === cleanMaster || canonicalizeOwnerCode(overlord.id || '') === cleanMaster)) {
      subjects.push(cfg);
    }
  }

  return subjects;
}

/**
 * Verifica se un'entità è subordinata (direttamente o transitivamente) a un'altra.
 */
export function isSubjectOf(subjectCode: string, masterCode: string, step: number = 0): boolean {
  const cleanSubj = canonicalizeOwnerCode(subjectCode);
  const cleanMaster = canonicalizeOwnerCode(masterCode);
  if (cleanSubj === cleanMaster) return false;

  let current: OwnerConfig | null = getOverlord(cleanSubj, step);
  const visited = new Set<string>();

  while (current && current.id && !visited.has(current.id)) {
    visited.add(current.id);
    if (current.id === cleanMaster || canonicalizeOwnerCode(current.id) === cleanMaster) {
      return true;
    }
    current = getOverlord(current.id, step);
  }

  return false;
}

/**
 * Risale la gerarchia fino al sovrano supremo metropolitano.
 */
export function getRootSovereign(code: string, step: number = 0): OwnerConfig {
  let current = getOwnerMeta(code);
  const visited = new Set<string>();

  while (current) {
    const cid = current.id || canonicalizeOwnerCode(code);
    if (visited.has(cid)) break;
    visited.add(cid);

    const parent = getOverlord(cid, step);
    if (!parent) break;
    current = parent;
  }

  return current;
}

/**
 * Restituisce la lista di codici che formano l'intero blocco imperiale (Madrepatria + tutti i possedimenti).
 */
export function getEmpireMembers(masterCode: string, step: number = 0): string[] {
  const cleanMaster = canonicalizeOwnerCode(masterCode);
  const set = new Set<string>([cleanMaster]);
  const subjects = getSubjects(cleanMaster, step);
  for (const s of subjects) {
    if (s.id) set.add(s.id);
  }
  return Array.from(set);
}

/**
 * Restituisce una descrizione in lingua italiana del livello geopolitico gerarchico.
 */
export function getPoliticalTierLabel(tier?: PoliticalTier): string {
  switch (tier) {
    case 'sovereign':
      return 'Stato Sovrano';
    case 'dominion':
      return 'Dominion Autonomo del Commonwealth';
    case 'colony':
      return 'Colonia della Corona / Possedimento Oltremare';
    case 'puppet':
      return 'Stato Cliente / Fantoccio Collaborazionista';
    case 'protectorate':
      return 'Protettorato';
    case 'mandate':
      return 'Mandato della Società delle Nazioni';
    case 'satellite':
      return 'Stato Satellite Ideologico';
    case 'condominium':
      return 'Condominio / Amministrazione Congiunta';
    case 'autonomous':
      return 'Territorio con Autonomia Speciale';
    case 'free_forces':
      return 'Forze della Francia Libera (Governo in Esilio)';
    case 'international':
      return 'Città Libera Internazionale';
    case 'neutral_misc':
    default:
      return 'Stato Indipendente';
  }
}

/**
 * Genera il badge sintetico ed elegante per dossier e schede informative.
 */
export function formatHierarchyBadge(code: string, step: number = 0): string | null {
  const meta = getOwnerMeta(code);
  const overlord = getOverlord(code, step);

  if (!overlord) {
    if (meta.tier === 'puppet') return 'Stato Cliente / Allineato all\'Asse';
    if (meta.tier === 'international') return 'Territorio Internazionale (SDN)';
    return null;
  }

  const overlordName = overlord.shortName || overlord.id || 'Madrepatria';

  switch (meta.tier) {
    case 'dominion':
      return `Dominion del Commonwealth · Sovrano: ${overlordName}`;
    case 'puppet':
      return `Stato Cliente · Sovrano: ${overlordName}`;
    case 'colony':
      return `Possedimento Oltremare · Metropoli: ${overlordName}`;
    case 'protectorate':
      return `Protettorato · Potenza Tutelare: ${overlordName}`;
    case 'mandate':
      return `Mandato SDN · Amministrazione: ${overlordName}`;
    case 'satellite':
      return `Stato Satellite · Influenza: ${overlordName}`;
    case 'autonomous':
      return `Territorio Autonomo · Sovrano: ${overlordName}`;
    case 'free_forces':
      return `Francia Libera · Comandante: Gen. De Gaulle`;
    default:
      return `Dipendenza Storica · Sovrano: ${overlordName}`;
  }
}

export const FACTION_COLORS: Record<FactionType, string> = {
  Asse: '#777d84',
  Alleati: '#5f87c0',
  Comintern: '#b04540',
  Neutrale: '#b3a68a',
  Fantoccio: '#8b8163',
};
