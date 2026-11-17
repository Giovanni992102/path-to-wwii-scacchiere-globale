import { OwnerConfig, FactionType, PoliticalTier } from '../types';
import { applyChronologicalStateOverrides } from './stateEvolution';

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
    aliases: ['CCP', 'PCC', 'PRC', 'RPC', 'YANAN', 'SHAAN-GAN-NING', 'PEOPLES_REPUBLIC_OF_CHINA'],
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
    c: '#8f7a4b',
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
    c: '#689973',
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
    aliases: ['INDONESIA', 'IDN', 'INA', 'RIS', 'REPUBLIK_INDONESIA', 'REPUBLIK_INDONESIA_SERIKAT'],
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
  VUJA: {
    id: 'VUJA',
    c: '#3c7a6e',
    f: 'Comintern',
    l: (s) =>
      typeof s === 'number' && s >= 21
        ? 'Territorio Libero di Trieste — Zona B (VUJA · Amministrazione Militare Jugoslava)'
        : 'Territorio Libero di Trieste — Zona B (VUJA — Vojna Uprava Jugoslovenske Armije)',
    shortName: 'Trieste (Zona B VUJA)',
    leader: 'Gen. Mirko Lenac (Comandante VUJA — Amministrazione Militare Jugoslava)',
    capital: 'Koper (Capodistria)',
    tier: 'international',
    overlordCode: 'DFJ',
    aliases: ['VUJA', 'VUJA_FTT', 'TLT_B', 'FTT_B', 'STT_B', 'ZONA_B_TLT'],
    isSubject: true,
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
    l: (s) => (typeof s === 'number' && s >= 20 ? 'Repubblica Popolare Romena (RPR — Abdicazione di Re Michele I, 30 Dicembre 1947)' : typeof s === 'number' && s >= 19 ? 'Regno di Romania (Trattato di Pace di Parigi — Governo Groza & Re Michele I)' : typeof s === 'number' && s >= 16 ? 'Regno di Romania (Cobelligerante Alleato — Golpe Reale di Michele I)' : s >= 9 ? 'Regno di Romania (Cobelligerante dell\'Asse & Governatorato della Transnistria — Antonescu)' : s >= 7 ? 'Regno di Romania (Stato Nazionale Legionario — Antonescu)' : 'Regno di Romania'),
    shortName: 'Romania',
    leader: 'Re Carlo II / Michele I & Ion Antonescu (1940-44) / Petru Groza & Gheorghe Gheorghiu-Dej (RPR 1947)',
    capital: 'București',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['RO', 'ROU', 'ROM', 'ROMANIA', 'REGNO DI ROMANIA', 'REPUBBLICA POPOLARE ROMENA', 'RPR'],
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
    l: (s) => (typeof s === 'number' && s >= 20 ? 'Repubblica Popolare di Bulgaria (Costituzione Dimitrov del 4 Dicembre 1947 — Georgi Dimitrov)' : typeof s === 'number' && s >= 19 ? 'Repubblica Popolare di Bulgaria (Governo del Fronte Patriottico — Georgi Dimitrov)' : 'Regno di Bulgaria'),
    shortName: 'Bulgaria',
    leader: 'Zar Boris III (1936-43) / Reggenza per Simeone II (1943-46) / Georgi Dimitrov & Vasil Kolarov (1946-47)',
    capital: 'Sofia',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['BG', 'BGR', 'BUL', 'BULGARIA', 'REGNO DI BULGARIA', 'REPUBBLICA POPOLARE DI BULGARIA', 'NRB'],
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
      typeof s === 'number' && s >= 20
        ? 'Governo Democratico Provvisorio di Grecia (Prosorini Dimokratiki Kyvernisi — DSE / Markos Vafiadis)'
        : typeof s === 'number' && s >= 19
        ? 'Esercito Democratico di Grecia (DSE — "Grecia Libera" / Grammos–Vitsi)'
        : 'EAM-ELAS (Fronte di Liberazione Nazionale — Entroterra & Dekemvriana)',
    shortName: 'DSE / ELAS',
    leader: 'Markos Vafiadis / Nikos Zachariadis (DSE & Governo Provvisorio) — Aris Velouchiotis / Stefanos Sarafis (ELAS)',
    capital: 'Quartier Generale Montano (Grammos / Vitsi / Viniani)',
    tier: 'autonomous',
    overlordCode: null,
    aliases: ['ELAS', 'EAM', 'EAM_ELAS', 'DSE', 'DIMOKRATIKOS_STRATOS', 'PEEA', 'PDG', 'PROSORINI_DIMOKRATIKI_KYVERNISI'],
    isSubject: false,
  },
  AZK: {
    id: 'AZK',
    c: '#1f7a4c',
    f: 'Alleati',
    l: () => 'Governo Provvisorio di Azad Jammu e Kashmir (Sardar Ibrahim Khan — Tutela Pakistana)',
    shortName: 'Azad Kashmir',
    leader: 'Sardar Muhammad Ibrahim Khan',
    capital: 'Muzaffarabad',
    tier: 'protectorate',
    overlordCode: 'PAK',
    aliases: ['AZK', 'AJK', 'AZAD_KASHMIR', 'AZAD KASHMIR'],
    isSubject: true,
  },
  NST: {
    id: 'NST',
    c: '#2e8b57',
    f: 'Alleati',
    l: () => 'Stato di Sumatra Orientale (Negara Sumatera Timur — Tengku Mansur)',
    shortName: 'Sumatra Orientale (NST)',
    leader: 'Wali Negara Tengku Mansur',
    capital: 'Medan',
    tier: 'protectorate',
    overlordCode: 'HOL',
    aliases: ['NST', 'NEGARA_SUMATERA_TIMUR', 'EAST_SUMATRA', 'SUMATRA_ORIENTALE'],
    isSubject: true,
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
    l: (s) =>
      s && s >= 22
        ? 'Serenissima Repubblica di San Marino (Comitato della Libertà — Elezioni 1949)'
        : s && s >= 18
        ? 'Serenissima Repubblica di San Marino (Governo Comitato della Libertà)'
        : 'Serenissima Repubblica di San Marino',
    shortName: 'San Marino',
    leader: 'Capitani Reggenti · Gino Giacomini / Comitato della Libertà (1945–1949)',
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
    l: (s) =>
      s && s >= 21
        ? 'Stato della Città del Vaticano (Papa Pio XII · Anno Santo & Guerra Fredda)'
        : s && s >= 3
        ? 'Stato della Città del Vaticano (Pio XII)'
        : 'Stato della Città del Vaticano (Pio XI)',
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
    l: (s) =>
      s && s >= 19
        ? 'Principato d\'Andorra (Coprincipi Vescovo Iglesias & Pres. Vincent Auriol)'
        : 'Principato d\'Andorra (Coprincipato Sovrano dei Pirenei)',
    shortName: 'Andorra',
    leader: 'Vescovo R. Iglesias i Navarri & Pres. V. Auriol (dal 1947) · Sìndic F. Cairat',
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
    l: (s) =>
      s && s >= 19
        ? 'Fürstentum Liechtenstein (Principe Franz Josef II · Governo Alexander Frick)'
        : s && s >= 2
        ? 'Fürstentum Liechtenstein (Principe Franz Josef II)'
        : 'Fürstentum Liechtenstein (Principe Franz I)',
    shortName: 'Liechtenstein',
    leader: 'Principe Franz Josef II (dal 1938) · J. Hoop (fino al 1945) / A. Frick (dal 1945)',
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
    l: (s) =>
      s && s >= 23
        ? 'Principauté de Monaco (Principe Ranieri III Grimaldi)'
        : s && s >= 16
        ? 'Principauté de Monaco (Luigi II Grimaldi — Sovranità Restaurata)'
        : s && s >= 11
        ? 'Principauté de Monaco (Occupazione Militare)'
        : 'Principauté de Monaco (Luigi II Grimaldi)',
    shortName: 'Monaco',
    leader: 'Principe Luigi II (fino al 9 mag 1949) · Principe Ranieri III (dal 9 mag 1949)',
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
    l: (s) =>
      s >= 20
        ? "Stato Imperiale dell'Iran (Rifiuto Concessioni Sovietiche & Sovranità)"
        : s >= 19
        ? "Stato Imperiale dell'Iran (Sovranità Restaurata — Mohammad Reza Pahlavi)"
        : s >= 9
        ? "Stato Imperiale dell'Iran (Corridoio Persiano Anglo-Sovietico — Mohammad Reza Pahlavi)"
        : "Impero dell'Iran (Persia)",
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
    c: '#6c8c3e',
    f: 'Neutrale',
    l: (s) => (s !== undefined && s >= 19 ? 'Regno Mutawakkilita dello Yemen (Membro ONU)' : 'Regno Mutawakkilita dello Yemen'),
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
  // NUOVI STATI E FEDERAZIONI DEL 1948 (STEP 21 — 30 GIUGNO 1948)
  // ==========================================
  BUR: {
    id: 'BUR',
    c: '#b55346',
    f: 'Neutrale',
    l: () => 'Unione della Birmania (Repubblica Sovrana Indipendente — 4 Gennaio 1948)',
    shortName: 'Birmania',
    leader: 'Presidente Sao Shwe Thaik · Primo Ministro U Nu (AFPFL)',
    capital: 'Rangoon (Yangon)',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['MM', 'MMR', 'BURMA', 'BIRMANIA', 'UNION OF BURMA', 'UNIONE DELLA BIRMANIA', 'MYANMAR'],
    isSubject: false,
  },
  CEY: {
    id: 'CEY',
    c: '#8f473b',
    f: 'Alleati',
    l: () => 'Dominion di Ceylon (Reame Indipendente del Commonwealth — 4 Febbraio 1948)',
    shortName: 'Ceylon',
    leader: 'Re Giorgio VI · Gov.-Gen. Sir Henry Monck-Mason Moore · Primo Ministro D.S. Senanayake',
    capital: 'Colombo',
    tier: 'dominion',
    overlordCode: 'UK',
    aliases: ['LK', 'LKA', 'CEYLON', 'DOMINION OF CEYLON', 'DOMINION DI CEYLON', 'SRI LANKA'],
    isSubject: true,
  },
  ISR: {
    id: 'ISR',
    c: '#2b6cb0',
    f: 'Neutrale',
    l: () => 'Stato di Israele (Medinat Yisrael — Proclamazione del 14 Maggio 1948 & Prima Tregua ONU)',
    shortName: 'Israele',
    leader: 'Presidente del Consiglio Provvisorio Chaim Weizmann · Primo Ministro e Min. Difesa David Ben-Gurion',
    capital: 'Tel Aviv (Sede del Governo Provvisorio) / Gerusalemme Ovest',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['IL', 'ISR', 'ISRAEL', 'ISRAELE', 'STATE OF ISRAEL', 'STATO DI ISRAELE', 'MEDINAT YISRAEL'],
    isSubject: false,
  },
  PAS: {
    id: 'PAS',
    c: '#3c7a57',
    f: 'Alleati',
    l: () => 'Stato di Pasundan (Negara Pasundan — Stato Federale BFO sotto Tutela Olandese, 24 Aprile 1948)',
    shortName: 'Pasundan',
    leader: 'Wali Negara Raden Adipati Aria Muharam Wiranatakusumah V · P.M. Adil Poeradiredja',
    capital: 'Bandung (Giava Occidentale)',
    tier: 'protectorate',
    overlordCode: 'HOL',
    aliases: ['PAS', 'PASUNDAN', 'NEGARA PASUNDAN', 'NEGARA_PASUNDAN', 'STATE OF PASUNDAN', 'STATO DI PASUNDAN'],
    isSubject: true,
  },
  MAD: {
    id: 'MAD',
    c: '#4c8c64',
    f: 'Alleati',
    l: () => 'Stato di Madura (Negara Madura — Stato Federale BFO sotto Tutela Olandese, 20 Febbraio 1948)',
    shortName: 'Madura',
    leader: 'Wali Negara Raden Ario Tumenggung Tjakraningrat XII',
    capital: 'Pamekasan (Madura)',
    tier: 'protectorate',
    overlordCode: 'HOL',
    aliases: ['MAD', 'MADURA', 'NEGARA MADURA', 'NEGARA_MADURA', 'STATE OF MADURA', 'STATO DI MADURA'],
    isSubject: true,
  },
  MAL: {
    id: 'MAL',
    c: '#b85d55',
    f: 'Alleati',
    l: (s) =>
      s !== undefined && s >= 25
        ? 'Federazione della Malesia (Persekutuan Tanah Melayu — Bandiera a 11 Strisce del 26 Maggio 1950 & Piano Briggs)'
        : 'Federazione della Malesia (Persekutuan Tanah Melayu — 1° Febbraio 1948 & Emergenza Malese)',
    shortName: 'Federazione della Malesia',
    leader: 'Alto Commissario Britannico Sir Edward Gent · Sultani Malesi & UMNO (Dato\' Onn Jaafar)',
    capital: 'Kuala Lumpur',
    tier: 'protectorate',
    overlordCode: 'UK',
    aliases: ['MAL', 'FOM', 'FEDERATION OF MALAYA', 'FEDERAZIONE DELLA MALESIA', 'PERSEKUTUAN TANAH MELAYU'],
    isSubject: true,
  },
  AFIS: {
    id: 'AFIS',
    c: '#4a90bc',
    f: 'Alleati',
    l: () => 'Amministrazione Fiduciaria Italiana della Somalia (AFIS — Mandato ONU 1950–1960)',
    shortName: 'Somalia (AFIS / Italia-ONU)',
    leader: 'Amministratore Giovanni Fornari (dal 1° apr 1950) · Tutela ONU & Repubblica Italiana',
    capital: 'Mogadiscio',
    tier: 'colony',
    overlordCode: 'ITA',
    aliases: ['AFIS', 'SOM_AFIS', 'TRUST_TERRITORY_OF_SOMALILAND', 'AMMINISTRAZIONE_FIDUCIARIA_ITALIANA_DELLA_SOMALIA'],
    isSubject: true,
  },
  RMS: {
    id: 'RMS',
    c: '#d35400',
    f: 'Neutrale',
    l: () => 'Repubblica delle Molucche Meridionali (Republik Maluku Selatan / RMS — Insurrezione Secessionista ad Ambon, 25 Aprile 1950)',
    shortName: 'Molucche Meridionali (RMS)',
    leader: 'Presidente J.H. Manuhutu · Primo Ministro Chris Soumokil (25 apr 1950)',
    capital: 'Ambon',
    tier: 'autonomous',
    overlordCode: null,
    aliases: ['RMS', 'REPUBLIK_MALUKU_SELATAN', 'SOUTH_MOLUCCAS', 'MOLUCCHE_MERIDIONALI'],
    isSubject: false,
  },
  NIT: {
    id: 'NIT',
    c: '#26a69a',
    f: 'Neutrale',
    l: () => "Stato dell'Indonesia Orientale (Negara Indonesia Timur — Componente Federata degli Stati Uniti d'Indonesia)",
    shortName: 'Indonesia Orientale (NIT)',
    leader: 'Presidente Tjokorda Gde Raka Soekawati · Capitale Makassar',
    capital: 'Makassar',
    tier: 'autonomous',
    overlordCode: 'IDN',
    aliases: ['NIT', 'NEGARA_INDONESIA_TIMUR', 'STATE_OF_EAST_INDONESIA'],
    isSubject: true,
  },
  ROK: {
    id: 'ROK',
    c: '#3c6ca8',
    f: 'Alleati',
    l: () => 'Repubblica di Corea (Corea del Sud — Proclamazione del 15 Agosto 1948)',
    shortName: 'Corea del Sud (ROK)',
    leader: 'Presidente Syngman Rhee · Primo Ministro Lee Beom-seok',
    capital: 'Seoul (Seul)',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['ROK', 'KR', 'KOR', 'SOUTH KOREA', 'COREA DEL SUD', 'REPUBLIC OF KOREA', 'REPUBBLICA DI COREA', 'DAEHAN MINGUK'],
    isSubject: false,
  },
  PRK: {
    id: 'PRK',
    c: '#b83c3c',
    f: 'Comintern',
    l: () => 'Repubblica Popolare Democratica di Corea (Corea del Nord — Proclamazione del 9 Settembre 1948)',
    shortName: 'Corea del Nord (RPDC)',
    leader: 'Premier Kim Il-sung · Presidente del Presidium Kim Tu-bong',
    capital: 'Pyongyang',
    tier: 'sovereign',
    overlordCode: null,
    aliases: ['PRK', 'KP', 'DPRK', 'RPDC', 'NORTH KOREA', 'COREA DEL NORD', 'REPUBBLICA POPOLARE DEMOCRATICA DI COREA'],
    isSubject: false,
  },
  APG: {
    id: 'APG',
    c: '#2e6b4f',
    f: 'Neutrale',
    l: () => 'Governo di Tutto-Palestina (Striscia di Gaza — Protettorato Militare Egiziano, 22 Settembre 1948)',
    shortName: 'Tutto-Palestina (Gaza)',
    leader: 'Presidente Amin al-Husseini · Primo Ministro Ahmed Hilmi Pasha (Protezione Militare Egiziana)',
    capital: 'Gaza',
    tier: 'protectorate',
    overlordCode: 'EGY',
    aliases: ['APG', 'ALL-PALESTINE', 'ALL_PALESTINE', 'TUTTO-PALESTINA', 'GOVERNO DI TUTTO-PALESTINA', 'GAZA PROTECTORATE'],
    isSubject: true,
  },
  NSS: {
    id: 'NSS',
    c: '#c99642',
    f: 'Alleati',
    l: () => 'Stato di Sumatra Meridionale (Negara Sumatera Selatan — 30 Agosto 1948)',
    shortName: 'Sumatra Meridionale (NSS)',
    leader: 'Wali Negara Abdul Malik · Governo Federale Provvisorio delle Indie Olandesi',
    capital: 'Palembang',
    tier: 'protectorate',
    overlordCode: 'HOL',
    aliases: ['NSS', 'NEGARA SUMATERA SELATAN', 'NEGARA_SUMATERA_SELATAN', 'SOUTH SUMATRA', 'STATO DI SUMATRA MERIDIONALE'],
    isSubject: true,
  },
  NJT: {
    id: 'NJT',
    c: '#d1b24f',
    f: 'Alleati',
    l: () => 'Stato di Giava Orientale (Negara Jawa Timur — 26 Novembre 1948)',
    shortName: 'Giava Orientale (NJT)',
    leader: 'Wali Negara Raden Tumenggung Kusumonegoro · Governo Federale Provvisorio delle Indie Olandesi',
    capital: 'Surabaya (Soerabaja)',
    tier: 'protectorate',
    overlordCode: 'HOL',
    aliases: ['NJT', 'NEGARA JAWA TIMUR', 'NEGARA_JAWA_TIMUR', 'EAST JAVA', 'STATO DI GIAVA ORIENTALE'],
    isSubject: true,
  },
  BRD: {
    id: 'BRD',
    c: '#268073',
    f: 'Alleati',
    l: () => 'Repubblica Federale Tedesca (RFT / BRD — Legge Fondamentale del 23 Maggio 1949)',
    shortName: 'Germania Ovest (RFT)',
    leader: 'Konrad Adenauer (Pres. Cons. Parlamentare · Pre-Elezioni 14 Ago) · Governatori Militari Alleati (McCloy / Robertson / Kœnig)',
    capital: 'Bonn (Capitale Provvisoria)',
    tier: 'autonomous',
    overlordCode: null,
    aliases: ['BRD', 'RFT', 'FRG', 'WEST_GERMANY', 'GERMANIA_OVEST', 'BUNDESREPUBLIK_DEUTSCHLAND', 'TRIZONA'],
    isSubject: false,
  },
  SVN: {
    id: 'SVN',
    c: '#d9a441',
    f: 'Alleati',
    l: () => 'Stato del Vietnam (Quốc gia Việt Nam — Stato Associato nell\'Unione Francese, 14 Giugno 1949)',
    shortName: 'Stato del Vietnam',
    leader: 'Capo di Stato (Quốc trưởng) Bảo Đại · Alto Commissario Francese Léon Pignon',
    capital: 'Saigon (Sài Gòn)',
    tier: 'protectorate',
    overlordCode: 'FRA',
    aliases: ['SVN', 'QGVN', 'STATE_OF_VIETNAM', 'STATO_DEL_VIETNAM', 'QUOC_GIA_VIET_NAM', 'BAO_DAI_VIETNAM'],
    isSubject: true,
  },
  DDR: {
    id: 'DDR',
    c: '#8f2e2e',
    f: 'Comintern',
    l: () => 'Repubblica Democratica Tedesca (RDT / DDR — Costituzione del 7 Ottobre 1949)',
    shortName: 'Germania Est (RDT)',
    leader: 'Presidente Wilhelm Pieck · Primo Ministro Otto Grotewohl · Walter Ulbricht (SED) · SKK Gen. V. Čujkov',
    capital: 'Berlino Est (Ost-Berlin)',
    tier: 'autonomous',
    overlordCode: null,
    aliases: ['DDR', 'RDT', 'GDR', 'EAST_GERMANY', 'GERMANIA_EST', 'DEUTSCHE_DEMOKRATISCHE_REPUBLIK'],
    isSubject: false,
  },
  LAO: {
    id: 'LAO',
    c: '#a84a6b',
    f: 'Alleati',
    l: () => 'Regno del Laos (Stato Associato nell\'Unione Francese — Convenzione del 19 Luglio 1949)',
    shortName: 'Regno del Laos',
    leader: 'Re Sisavang Vong · Primo Ministro Principe Boun Oum · Commissario Francese Jean de Raymond',
    capital: 'Vientiane / Luang Prabang (Capitale Reale)',
    tier: 'protectorate',
    overlordCode: 'FRA',
    aliases: ['LAO', 'LAOS', 'KINGDOM_OF_LAOS', 'REGNO_DEL_LAOS'],
    isSubject: true,
  },
  CAM: {
    id: 'CAM',
    c: '#4e6fa8',
    f: 'Alleati',
    l: () => 'Regno di Cambogia (Stato Associato nell\'Unione Francese — Trattato dell\'8 Novembre 1949)',
    shortName: 'Regno di Cambogia',
    leader: 'Re Norodom Sihanouk · Presidente del Consiglio Yem Sambaur · Commissario Francese Léon Pignon / Jean de Raymond',
    capital: 'Phnom Penh',
    tier: 'protectorate',
    overlordCode: 'FRA',
    aliases: ['CAM', 'KHM', 'KH', 'CAMBODIA', 'CAMBOGIA', 'KINGDOM_OF_CAMBODIA'],
    isSubject: true,
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
  VUJA: 'VUJA',
  VUJA_FTT: 'VUJA',
  TLT_B: 'VUJA',
  FTT_B: 'VUJA',
  STT_B: 'VUJA',
  ZONA_B_TLT: 'VUJA',
  FNRJ: 'DFJ',
  SFRJ: 'DFJ',
  ITA_REP: 'ITA',
  CHI_WANG: 'WJ_CHI',
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
  BUR: 'BUR',
  BURMA: 'BUR',
  BIRMANIA: 'BUR',
  CEY: 'CEY',
  CEYLON: 'CEY',
  ISR: 'ISR',
  IL: 'ISR',
  ISRAEL: 'ISR',
  ISRAELE: 'ISR',
  PAS: 'PAS',
  PASUNDAN: 'PAS',
  NEGARA_PASUNDAN: 'PAS',
  MAD: 'MAD',
  MADURA: 'MAD',
  NEGARA_MADURA: 'MAD',
  MAL: 'MAL',
  MALAYA: 'MAL',
  FEDERATION_OF_MALAYA: 'MAL',
  AFIS: 'AFIS',
  SOM_AFIS: 'AFIS',
  RMS: 'RMS',
  REPUBLIK_MALUKU_SELATAN: 'RMS',
  SOUTH_MOLUCCAS: 'RMS',
  NIT: 'NIT',
  NEGARA_INDONESIA_TIMUR: 'NIT',
  ROK: 'ROK',
  SOUTH_KOREA: 'ROK',
  COREA_DEL_SUD: 'ROK',
  PRK: 'PRK',
  DPRK: 'PRK',
  RPDC: 'PRK',
  NORTH_KOREA: 'PRK',
  COREA_DEL_NORD: 'PRK',
  APG: 'APG',
  ALL_PALESTINE: 'APG',
  TUTTO_PALESTINA: 'APG',
  NSS: 'NSS',
  NEGARA_SUMATERA_SELATAN: 'NSS',
  NJT: 'NJT',
  NEGARA_JAWA_TIMUR: 'NJT',
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
  PRC: 'CCP_CHI',
  RPC: 'CCP_CHI',
  PEOPLES_REPUBLIC_OF_CHINA: 'CCP_CHI',
  RIS: 'IDN',
  REPUBLIK_INDONESIA_SERIKAT: 'IDN',
  DDR: 'DDR',
  RDT: 'DDR',
  GDR: 'DDR',
  EAST_GERMANY: 'DDR',
  LAO: 'LAO',
  LAOS: 'LAO',
  CAM: 'CAM',
  KHM: 'CAM',
  CAMBODIA: 'CAM',
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
  const raw = resolveOwnerMetaBase(o, _step);
  return _step !== undefined ? applyChronologicalStateOverrides(raw, _step) : raw;
}

function resolveOwnerMetaBase(o: string, _step?: number): OwnerConfig {
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
    if (_step >= 26) {
      return {
        ...meta,
        f: 'Comintern',
        l: () => 'Repubblica Popolare Cinese (RPC — Intervento PVA in Corea Ott 1950 & Conquista di Chamdo in Tibet Ott 1950)',
        shortName: 'Repubblica Popolare Cinese (RPC)',
        leader: 'Presidente Mao Zedong · Premier Zhou Enlai · Comandante PVA Peng Dehuai · Comandante EPL Zhu De',
        capital: 'Beijing (Pechino)',
        tier: 'autonomous',
        isSubject: false,
        overlordCode: null,
      };
    }
    if (_step >= 25) {
      return {
        ...meta,
        f: 'Comintern',
        l: () => 'Repubblica Popolare Cinese (RPC — Trattato di Alleanza Sino-Sovietico del 14 Febbraio 1950 & Conquista di Hainan e Zhoushan)',
        shortName: 'Repubblica Popolare Cinese (RPC)',
        leader: 'Presidente Mao Zedong · Premier Zhou Enlai · Comandante in Capo EPL Zhu De',
        capital: 'Beijing (Pechino)',
        tier: 'autonomous',
        isSubject: false,
        overlordCode: null,
      };
    }
    if (_step >= 24) {
      return {
        ...meta,
        f: 'Comintern',
        l: () => 'Repubblica Popolare Cinese (RPC — Proclamazione del 1° Ottobre 1949 a Pechino)',
        shortName: 'Repubblica Popolare Cinese (RPC)',
        leader: 'Presidente Mao Zedong (Governo Centrale Popolare) · Premier & Esteri Zhou Enlai · Comandante EPL Zhu De',
        capital: 'Beijing (Pechino — Ripristinata e Rinominata da Beiping il 1° Ott 1949)',
        tier: 'autonomous',
        isSubject: false,
        overlordCode: null,
      };
    }
    if (_step >= 23) {
      return {
        ...meta,
        f: 'Comintern',
        l: () => 'Partito Comunista Cinese — Esercito Popolare di Liberazione (PCC / EPL — Beiping, Nanchino & Shanghai)',
        shortName: 'Cina Popolare (PCC / EPL)',
        leader: 'Mao Zedong (Presidente del PCC) · Zhu De (Comandante in Capo dell\'EPL) · Liu Shaoqi · Zhou Enlai',
        capital: 'Beiping (Pechino — Comitato Centrale & QG EPL)',
        tier: 'autonomous',
        isSubject: false,
        overlordCode: null,
      };
    }
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
    if (_step >= 25) {
      return {
        ...meta,
        f: 'Alleati',
        l: () => 'Repubblica di Cina (ROC — Chiang Kai-shek Riassume la Presidenza a Taipei il 1° Marzo 1950)',
        shortName: 'Repubblica di Cina (Taiwan / ROC)',
        leader: 'Presidente Chiang Kai-shek (dal 1° mar 1950) · Premier Chen Cheng · Gen. Sun Li-jen',
        capital: 'Taipei (Taiwan)',
        isSubject: false,
        overlordCode: null,
      };
    }
    if (_step >= 24) {
      return {
        ...meta,
        f: 'Alleati',
        l: () => 'Repubblica di Cina (Governo Nazionalista KMT — Ritiro a Taipei, 7 Dicembre 1949)',
        shortName: 'Repubblica di Cina (Taiwan / ROC)',
        leader: 'Presidente f.f. Li Zongren · Direttore Gen. KMT Chiang Kai-shek · Premier Yan Xishan · Gov. Chen Cheng (Taiwan)',
        capital: 'Taipei (Taiwan — Capitale Provvisoria dal 7 Dicembre 1949)',
        isSubject: false,
        overlordCode: null,
      };
    }
    if (_step >= 23) {
      return {
        ...meta,
        f: 'Alleati',
        l: () => 'Repubblica di Cina (Governo Nazionalista KMT — Capitale Provvisoria a Guangzhou)',
        shortName: 'Repubblica di Cina (KMT)',
        leader: 'Presidente f.f. Li Zongren · Premier Yan Xishan (dal 12 giu) · Chiang Kai-shek (Direttore Generale KMT)',
        capital: 'Guangzhou (Canton — Capitale Provvisoria)',
        isSubject: false,
        overlordCode: null,
      };
    }
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
    if (_step >= 21) {
      return {
        ...meta,
        f: 'Alleati',
        l: () =>
          _step >= 23
            ? 'Repubblica Italiana (Presidenza Einaudi · Governo De Gasperi V & Fondatore NATO)'
            : 'Repubblica Italiana (Costituzione del 1948 — Presidenza Einaudi)',
        shortName: 'Repubblica Italiana',
        leader:
          _step >= 23
            ? 'Presidente Luigi Einaudi · Alcide De Gasperi (Presidente del Consiglio)'
            : 'Presidente Luigi Einaudi (dal 12 mag 1948) · Alcide De Gasperi (Presidente del Consiglio)',
        capital: 'Roma',
        isSubject: false,
        overlordCode: null,
      };
    }
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
    if (_step >= 21) {
      return {
        ...meta,
        f: 'Neutrale',
        l: () => 'Repubblica Federativa Popolare di Jugoslavia (FNRJ — Rottura Tito-Stalin & Espulsione dal Cominform, 28 Giugno 1948)',
        shortName: 'Jugoslavia (FNRJ)',
        leader: 'Maresciallo Josip Broz Tito (Primo Ministro e Segretario Gen. KPJ) · Ivan Ribar (Presidium)',
        capital: 'Beograd (Belgrado)',
        isSubject: false,
        overlordCode: null,
      };
    }
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
      l: () =>
        _step >= 21
          ? 'Territorio Libero di Trieste — Zona A (AMG-FTT · Dichiarazione Tripartita 1948)'
          : 'Territorio Libero di Trieste — Zona A (Governo Militare Alleato AMG-FTT)',
      shortName: 'Trieste (Zona A TLT)',
      leader: 'Magg. Gen. Sir Terence Airey (Comandante Generale AMG-FTT / TRUST & BETFOR)',
      capital: 'Trieste',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 19 && meta.id === 'VUJA') {
    return {
      ...meta,
      f: _step >= 21 ? 'Neutrale' : 'Comintern',
      l: () =>
        _step >= 21
          ? 'Territorio Libero di Trieste — Zona B (VUJA · Amministrazione Militare Jugoslava)'
          : 'Territorio Libero di Trieste — Zona B (VUJA — Vojna Uprava Jugoslovenske Armije)',
      shortName: 'Trieste (Zona B VUJA)',
      leader: 'Gen. Mirko Lenac (Comandante VUJA — Amministrazione Militare Jugoslava)',
      capital: 'Koper (Capodistria)',
      tier: 'international',
      isSubject: true,
      overlordCode: 'DFJ',
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
  if (_step !== undefined && _step >= 24 && meta.id === 'BRD') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Repubblica Federale Tedesca (RFT / BRD — Primo Governo Adenauer & Accordi del Petersberg, Nov 1949)',
      shortName: 'Germania Ovest (RFT)',
      leader: 'Presidente Theodor Heuss (dal 12 sett) · Cancelliere Konrad Adenauer (dal 15 sett) · Alta Commissione Alleata AHK (McCloy, Robertson, François-Poncet)',
      capital: 'Bonn (Capitale Provvisoria Federale dal 3 Novembre 1949)',
      tier: 'autonomous',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 18 && meta.id === 'GER') {
    if (_step >= 23) {
      return {
        ...meta,
        f: 'Comintern',
        shortName: 'Germania Est (SBZ)',
        l: () => 'Zona d\'Occupazione Sovietica (SBZ — Deutscher Volksrat · Amministrazione SMAD)',
        leader: 'Gen. Vasilij Čujkov (SMAD) · Wilhelm Pieck & Walter Ulbricht (SED / Volksrat)',
        capital: 'Berlin (Ost-Berlin)',
        overlordCode: null,
      };
    }
    if (_step >= 21) {
      return {
        ...meta,
        f: 'Alleati',
        shortName: 'Germania Occupata',
        l: () => 'Germania Occupata (Trizona Occidentale & SMAD — Crisi del Kontrollrat)',
        leader: 'Governatori Alleati (Clay, Robertson, Kœnig) · SMAD (Sokolovskij) · Parlamentarischer Rat (Bonn)',
        overlordCode: null,
      };
    }
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
    const japPm =
      _step >= 22
        ? 'Shigeru Yoshida'
        : _step >= 21
        ? 'Hitoshi Ashida'
        : _step >= 19
        ? 'Tetsu Katayama'
        : 'Naruhiko Higashikuni / Kijūrō Shidehara';
    return {
      ...meta,
      f: 'Alleati',
      shortName: 'Giappone (SCAP)',
      l: () =>
        _step >= 22
          ? 'Giappone (Costituzione del 1947 — Occupazione SCAP & Linea Dodge)'
          : _step >= 19
          ? 'Giappone (Costituzione Democratica del 3 Maggio 1947 — Occupazione SCAP)'
          : 'Giappone (Occupazione Alleata SCAP — Generale Douglas MacArthur)',
      leader: `General of the Army Douglas MacArthur (SCAP) / Imperatore Hirohito · P.M. ${japPm}`,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 18 && (meta.id === 'AUS' || meta.id === 'AUT')) {
    return {
      ...meta,
      f: 'Alleati',
      shortName: 'Austria (ACA)',
      l: () =>
        _step >= 19
          ? 'Repubblica d\'Austria (Seconda Repubblica — Commissione Alleata & Governo Figl)'
          : 'Repubblica d\'Austria (Commissione Alleata per l\'Austria & Governo Karl Renner)',
      leader:
        _step >= 19
          ? 'Allied Commission for Austria · Presidente Karl Renner · Cancelliere Leopold Figl'
          : 'Allied Commission for Austria / Cancelliere Karl Renner',
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 18 && meta.id === 'UK') {
    return {
      ...meta,
      f: 'Alleati',
      l: () =>
        _step >= 23
          ? 'Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Attlee & Fondatore NATO)'
          : _step >= 19
          ? 'Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Attlee & Decolonizzazione)'
          : 'Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Laburista Attlee)',
      shortName: 'Regno Unito',
      leader: 'Re Giorgio VI · Primo Ministro Clement Attlee (Labour) · Segretario agli Esteri Ernest Bevin',
      capital: 'Londra',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 19 && (meta.id === 'FRA' || meta.id === 'F_COL' || meta.id === 'F_AOF' || meta.id === 'FFL_AEF' || meta.id === 'F_AEF')) {
    const fraPm = _step >= 24 ? 'Georges Bidault' : _step >= 22 ? 'Henri Queuille' : _step >= 20 ? 'Robert Schuman' : 'Paul Ramadier';
    const fraTag = _step >= 23 && meta.id === 'FRA' ? 'Fondatore NATO · ' : '';
    return {
      ...meta,
      f: 'Alleati',
      l: () =>
        _step === 19
          ? 'Quatrième République Française (Unione Francese — Presidente Vincent Auriol · P.M. Paul Ramadier)'
          : `Quatrième République Française (Unione Francese — ${fraTag}Presidente Vincent Auriol · P.M. ${fraPm})`,
      shortName: 'Francia (IVe République)',
      leader: `Presidente Vincent Auriol · Presidente del Consiglio ${fraPm}`,
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
  if (_step !== undefined && _step >= 18 && _step < 22 && (meta.id === 'JOR' || meta.id === 'JO')) {
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
      l: () =>
        _step >= 19
          ? 'Zona Internazionale di Tangeri (Statut de 1945 — Porto Franco)'
          : 'Zona Internazionale di Tangeri (Amministrazione Internazionale Restaurata)',
      shortName: 'Tangeri',
      leader:
        _step >= 21
          ? 'Comité de Contrôle / Adm. H. F. L. K. van Vredenburch'
          : 'Comité de Contrôle / Adm. Luís Magalhães Correia',
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
      l: () =>
        _step >= 22
          ? 'Stati Uniti d\'America (Rielezione Truman · Ponte Aereo & ERP, Dic 1948)'
          : _step >= 19
          ? 'Stati Uniti d\'America (Dottrina Truman & Piano Marshall)'
          : 'Stati Uniti d\'America (Vittoria Globale & Nazioni Unite)',
      shortName: 'Stati Uniti d\'America',
      leader:
        _step >= 22
          ? 'Presidente Harry S. Truman (Rieletto il 2 Nov 1948 — Fair Deal & Contenimento)'
          : 'Presidente Harry S. Truman (33º Presidente degli Stati Uniti)',
      capital: 'Washington, D.C.',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 23 && meta.id === 'CAN') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Dominion del Canada (10 Province con Terranova dal 31 Marzo 1949 · Membro Fondatore NATO)',
      shortName: 'Canada',
      leader: 'Primo Ministro Louis St. Laurent · Re Giorgio VI',
      capital: 'Ottawa',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 18 && meta.id === 'CAN') {
    return {
      ...meta,
      f: 'Alleati',
      l: () =>
        _step >= 22
          ? 'Dominion del Canada (Governo St. Laurent & Negoziati Patto Atlantico)'
          : _step >= 19
          ? 'Dominion del Canada (Canadian Citizenship Act 1947 & Ricostruzione)'
          : 'Dominion del Canada (Vittoria Alleata & Membro Fondatore ONU)',
      shortName: 'Canada',
      leader:
        _step >= 22
          ? 'Primo Ministro Louis St. Laurent (dal 15 Novembre 1948) · Re Giorgio VI'
          : 'Primo Ministro William Lyon Mackenzie King · Re Giorgio VI',
      capital: 'Ottawa',
      tier: 'dominion',
      overlordCode: 'UK',
      isSubject: true,
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
      l: () =>
        _step >= 26
          ? 'Regno del Belgio (Crisi della Questione Reale — Poteri Delegati al Principe Reale Baldovino, 11 Ago 1950 · NATO & Benelux)'
          : _step >= 23
          ? 'Regno del Belgio (Unione Doganale Benelux & Fondatore NATO 1949)'
          : _step >= 21
          ? 'Regno del Belgio (Unione Doganale Benelux & Patto di Bruxelles 1948)'
          : _step >= 19
          ? 'Regno del Belgio (Governo Spaak III · Piano Marshall & Benelux)'
          : 'Regno del Belgio',
      leader:
        _step >= 26
          ? 'Principe Reale Baldovino (delega dell\'11 Ago 1950; Re Leopoldo III ancora titolare) · P.M. Joseph Pholien'
          : _step >= 19
          ? 'Reggente Principe Carlo · P.M. Paul-Henri Spaak'
          : _step >= 17
          ? 'Reggente Principe Carlo / Achille Van Acker'
          : 'Re Leopoldo III / Hubert Pierlot',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 17 && meta.id === 'LUX') {
    return {
      ...meta,
      f: 'Alleati',
      shortName: 'Lussemburgo',
      l: () =>
        _step >= 23
          ? 'Granducato di Lussemburgo (Benelux & Fondatore NATO 1949)'
          : _step >= 21
          ? 'Granducato di Lussemburgo (Benelux & Patto di Bruxelles 1948)'
          : 'Granducato di Lussemburgo',
      leader:
        _step >= 21
          ? 'Granduchessa Carlotta · P.M. Pierre Dupong · Min. Esteri Joseph Bech'
          : 'Granduchessa Carlotta / Pierre Dupong',
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
  if (_step !== undefined && _step >= 19 && _step < 25 && (meta.id === 'VIE' || meta.id === 'DRV')) {
    return {
      ...meta,
      f: 'Comintern',
      l: () =>
        _step >= 22
          ? 'Repubblica Democratica del Vietnam (Việt Minh — Việt Bắc, Interzone I–V & Fronte Invernale Dic 1948)'
          : _step >= 21
          ? 'Repubblica Democratica del Vietnam (Việt Minh — Santuario Việt Bắc & Interzone I–V)'
          : 'Repubblica Democratica del Vietnam (Việt Minh — Governo della Resistenza nel Việt Bắc)',
      shortName: 'Vietnam (DRV / Việt Minh)',
      leader:
        _step >= 22
          ? 'Presidente Hồ Chí Minh · Gen. Võ Nguyên Giáp (Comandante Supremo) · Phạm Văn Đồng · Trường Chinh'
          : _step >= 21
          ? 'Presidente Hồ Chí Minh · Gen. Võ Nguyên Giáp (Comandante Supremo) · Phạm Văn Đồng · Trường Chinh'
          : 'Presidente Hồ Chí Minh · Generale Võ Nguyên Giáp (Comandante Supremo) · Trường Chinh',
      capital:
        _step >= 22
          ? 'Việt Bắc (Thái Nguyên / Tuyên Quang) · Interzone IV–V & Đồng Tháp Mười (Nam Bộ)'
          : _step >= 21
          ? 'Việt Bắc (Tân Trào / Thái Nguyên) · Interzone IV–V & Đồng Tháp Mười'
          : 'Việt Bắc (Bắc Kạn / Thái Nguyên — Base Centrale della Resistenza)',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 19 && _step < 22 && (meta.id === 'IDN' || meta.id === 'INA')) {
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
  if (_step !== undefined && _step >= 22 && meta.id === 'HOL') {
    return {
      ...meta,
      f: 'Alleati',
      shortName: 'Paesi Bassi',
      l: () =>
        _step >= 23
          ? 'Regno dei Paesi Bassi (Regina Giuliana · Governo Drees · Fondatore NATO 1949)'
          : 'Regno dei Paesi Bassi (Regina Giuliana · Governo Willem Drees)',
      leader: 'Regina Giuliana · P.M. Willem Drees · Alto Rappr. Louis Beel',
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
  if (_step !== undefined && _step >= 21 && (meta.id === 'CZE' || meta.id === 'SLO')) {
    return {
      ...meta,
      f: 'Comintern',
      l: () => 'Repubblica Cecoslovacca (ČSR — Colpo di Stato di Praga & Costituzione del 9 Maggio 1948)',
      shortName: 'Cecoslovacchia (ČSR)',
      leader: 'Presidente Klement Gottwald (dal 14 giu 1948) · Primo Ministro Antonín Zápotocký',
      capital: 'Praha (Praga)',
      overlordCode: null,
      isSubject: false,
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
      l: () => _step >= 21
        ? 'Repubblica Popolare Romena (RPR — Costituzione del 13 Aprile 1948 & Nazionalizzazione dell\'11 Giugno)'
        : _step >= 20
        ? 'Repubblica Popolare Romena (RPR — Abdicazione di Re Michele I, 30 Dicembre 1947)'
        : _step >= 19
        ? 'Regno di Romania (Trattato di Pace di Parigi 1947 · Governo Petru Groza)'
        : 'Regno di Romania (Re Michele I · Governo Petru Groza)',
      leader: _step >= 20
        ? 'Constantin Ion Parhon (Presidium RPR) · P.M. Petru Groza · Gheorghe Gheorghiu-Dej'
        : 'Re Michele I · P.M. Petru Groza',
    };
  }
  if (_step !== undefined && _step >= 21 && meta.id === 'SAF') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Unione Sudafricana (Vittoria del Partito Nazionale di D.F. Malan & Inizio dell\'Apartheid, Maggio–Giugno 1948)',
      shortName: 'Sudafrica',
      leader: 'Re Giorgio VI · Gov.-Gen. Gideon Brand van Zyl · Primo Ministro Daniel François Malan (National Party, dal 4 giu 1948)',
      capital: 'Pretoria / Città del Capo',
    };
  }
  if (_step !== undefined && _step >= 21 && meta.id === 'CRI') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Repubblica di Costa Rica (Giunta Fondatrice della Seconda Repubblica — José Figueres Ferrer, 8 Maggio 1948)',
      shortName: 'Costa Rica',
      leader: 'Presidente della Giunta Fondatrice José Figueres Ferrer (vittoria Guerra Civile mar–apr 1948)',
      capital: 'San José',
    };
  }
  if (_step !== undefined && _step >= 21 && meta.id === 'COL') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Repubblica di Colombia (Presidenza Ospina Pérez — El Bogotazo del 9 Aprile 1948 & La Violencia)',
      shortName: 'Colombia',
      leader: 'Presidente Mariano Ospina Pérez (Stato d\'assedio dopo l\'assassinio di Jorge Eliécer Gaitán)',
      capital: 'Bogotá',
    };
  }
  if (_step !== undefined && _step >= 22 && meta.id === 'IDN') {
    if (_step >= 26) {
      return {
        ...meta,
        f: 'Neutrale',
        l: () => 'Repubblica d\'Indonesia (Stato Unitario Proclamato il 17 Agosto 1950 — Scioglimento della Federazione RIS)',
        shortName: 'Repubblica d\'Indonesia',
        leader: 'Presidente Sukarno · Primo Ministro Mohammad Natsir (dal Set 1950) · Stato Unitario (Republik Indonesia)',
        capital: 'Jakarta (Capitale dello Stato Unitario)',
        tier: 'sovereign',
        isSubject: false,
        overlordCode: null,
      };
    }
    if (_step >= 25) {
      return {
        ...meta,
        f: 'Neutrale',
        l: () => 'Stati Uniti d\'Indonesia (Republik Indonesia Serikat / RIS — Centralizzazione Marzo–Maggio 1950: RI, Sumatra Orientale & Indonesia Orientale)',
        shortName: 'Stati Uniti d\'Indonesia (RIS)',
        leader: 'Presidente Sukarno · Primo Ministro Mohammad Hatta · Federazione RIS (3 Stati Componenti al 30 Giugno 1950)',
        capital: 'Jakarta (Capitale Federale RIS)',
        tier: 'sovereign',
        isSubject: false,
        overlordCode: null,
      };
    }
    if (_step >= 24) {
      return {
        ...meta,
        f: 'Neutrale',
        l: () => 'Stati Uniti d\'Indonesia (Republik Indonesia Serikat / RIS — Trasferimento di Sovranità, 27 Dicembre 1949)',
        shortName: 'Stati Uniti d\'Indonesia (RIS)',
        leader: 'Presidente Sukarno · Primo Ministro Mohammad Hatta · Sultano Hamengkubuwono IX (Difesa) · Stato Federale (Nuova Guinea Olandese esclusa)',
        capital: 'Jakarta (ex Batavia — Capitale Federale RIS)',
        tier: 'sovereign',
        isSubject: false,
        overlordCode: null,
      };
    }
    if (_step >= 23) {
      return {
        ...meta,
        f: 'Neutrale',
        l: () => 'Repubblica d\'Indonesia (Ritorno a Yogyakarta, 30 Giugno 1949 — Accordo Roem–Van Roijen)',
        shortName: 'Indonesia (RI)',
        leader: 'Sultano Hamengkubuwono IX (Consegna di Yogyakarta) · Pres. Sukarno & Vicepres. Hatta (rientro da Bangka, 6 lug) · Gen. Soedirman (TNI)',
        capital: 'Yogyakarta (evacuata dagli olandesi 24–30 giu 1949)',
      };
    }
    return {
      ...meta,
      f: 'Neutrale',
      l: () => 'Repubblica d\'Indonesia (Governo d\'Emergenza PDRI — Bukittinggi, 22 Dicembre 1948)',
      shortName: 'Indonesia (PDRI)',
      leader: 'Capo del Governo d\'Emergenza PDRI Sjafruddin Prawiranegara (Bukittinggi) · Pres. Sukarno & Vicepres. Hatta (catturati dagli olandesi, 19 dic) · Gen. Soedirman (Guerriglia TNI)',
      capital: 'Bukittinggi (Sumatra — Capitale d\'Emergenza PDRI)',
    };
  }
  if (_step !== undefined && _step >= 22 && meta.id === 'JOR') {
    if (_step >= 25) {
      return {
        ...meta,
        f: 'Neutrale',
        l: () => 'Regno Hascemita di Giordania (Annessione Formale della Cisgiordania e di Gerusalemme Est — Ratifica Parlamentare del 24 Aprile 1950)',
        shortName: 'Giordania',
        leader: 'Re Abdallah I ibn al-Husayn · P.M. Said al-Mufti · Legione Araba (Glubb Pasha)',
        capital: 'Amman',
      };
    }
    if (_step >= 24) {
      return {
        ...meta,
        f: 'Neutrale',
        l: () => 'Regno Hascemita di Giordania (Amministrazione della Cisgiordania & Gerusalemme Est — Linea Verde)',
        shortName: 'Giordania',
        leader: 'Re Abdallah I ibn al-Husayn · P.M. Tawfik Abu al-Huda · Legione Araba (Glubb Pasha)',
        capital: 'Amman',
      };
    }
    if (_step >= 23) {
      return {
        ...meta,
        f: 'Neutrale',
        l: () => 'Regno Hascemita di Giordania (Denominazione Ufficiale dall\'Aprile 1949 — Linea Verde & Cisgiordania)',
        shortName: 'Giordania',
        leader: 'Re Abdallah I ibn al-Husayn · P.M. Tawfik Abu al-Huda · Legione Araba (Glubb Pasha)',
        capital: 'Amman',
      };
    }
    return {
      ...meta,
      f: 'Neutrale',
      l: () => 'Regno Hashemita di Transgiordania (Conferenza di Gerico del 1° Dicembre 1948 — Unione di Cisgiordania e Gerusalemme Est)',
      shortName: 'Transgiordania',
      leader: 'Re Abdallah I ibn al-Husayn (Proclamato Sovrano della Palestina Araba a Gerico) · P.M. Tawfik Abu al-Huda · Legione Araba (Glubb Pasha)',
      capital: 'Amman',
    };
  }
  if (_step !== undefined && _step >= 22 && meta.id === 'PRU') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Repubblica del Perù (Giunta Militare di Governo — Gen. Manuel A. Odría, 29 Ottobre 1948)',
      shortName: 'Perù (Giunta Militare)',
      leader: 'Gen. Manuel A. Odría (Presidente della Giunta Militare — Rivoluzione Restauratrice di Arequipa, 27–29 ott 1948)',
      capital: 'Lima',
    };
  }
  if (_step !== undefined && _step >= 22 && meta.id === 'VEN') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Stati Uniti del Venezuela (Giunta Militare di Governo — Col. Carlos Delgado Chalbaud, 24 Novembre 1948)',
      shortName: 'Venezuela (Giunta Militare)',
      leader: 'Ten. Col. Carlos Delgado Chalbaud (Pres. Giunta Militare) · Magg. Marcos Pérez Jiménez · Magg. Luis Felipe Llovera Páez',
      capital: 'Caracas',
    };
  }
  if (_step !== undefined && _step >= 22 && meta.id === 'SLV') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Repubblica di El Salvador (Consiglio di Governo Rivoluzionario — "Golpe de los Mayores", 14 Dicembre 1948)',
      shortName: 'El Salvador (Consiglio Rivoluzionario)',
      leader: 'Consejo de Gobierno Revolucionario (Magg. Óscar Osorio · Ten. Col. Manuel de Jesús Córdoba · Magg. Óscar Bolaños)',
      capital: 'San Salvador',
    };
  }
  if (_step !== undefined && _step >= 18 && meta.id === 'BUL') {
    return {
      ...meta,
      f: 'Comintern',
      l: () => _step >= 20
        ? 'Repubblica Popolare di Bulgaria (Costituzione Dimitrov del 4 Dicembre 1947 — Georgi Dimitrov)'
        : _step >= 19
        ? 'Repubblica Popolare di Bulgaria (Governo del Fronte Patriottico — Georgi Dimitrov)'
        : 'Regno di Bulgaria (Governo del Fronte Patriottico — Post-Armistizio)',
      leader: _step >= 19
        ? 'Georgi Dimitrov (Primo Ministro) · Vasil Kolarov / Minčo Nejčev (Presidium)'
        : 'Reggenza per Simeone II · Kimon Georgiev (Fronte Patriottico)',
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
  if (_step !== undefined && _step >= 23 && meta.id === 'IRE') {
    return {
      ...meta,
      f: 'Neutrale',
      l: () => 'Repubblica d\'Irlanda (Republic of Ireland Act 1948 — Uscita dal Commonwealth, 18 Aprile 1949)',
      shortName: 'Repubblica d\'Irlanda',
      leader: 'Presidente Seán T. O\'Kelly · Taoiseach John A. Costello',
      capital: 'Dublino',
    };
  }
  if (_step !== undefined && _step >= 23 && meta.id === 'GRE') {
    if (_step >= 24) {
      return {
        ...meta,
        l: () => 'Regno di Grecia (Fine della Guerra Civile — Vittoria su Vitsi-Grammos & Cessate il Fuoco del 16 Ottobre 1949)',
        leader: 'Re Paolo I · Primo Ministro Alexandros Diomidis · Maresciallo Alexandros Papagos (Comandante in Capo)',
        capital: 'Atene',
      };
    }
    return {
      ...meta,
      l: () => 'Regno di Grecia (Offensiva di Primavera · Liberazione del Peloponneso & Riconquista di Karpenisi)',
      leader: 'Re Paolo I · P.M. Themistoklis Sofoulis (†24 giu) / Alexandros Diomidis · Gen. Alexandros Papagos (Comandante in Capo)',
      capital: 'Atene',
    };
  }
  if (_step !== undefined && _step >= 23 && meta.id === 'DSE') {
    return {
      ...meta,
      l: () => 'Governo Democratico Provvisorio / DSE (Ridotte di Grammos & Vitsi — Pindo Settentrionale)',
      leader: 'Nikos Zachariadis · Dimitrios Partsalidis (Presidente PDG dal febbraio 1949)',
      capital: 'Massicci del Grammos & Vitsi (Epiro / Macedonia Occ.)',
    };
  }
  if (_step !== undefined && _step >= 24 && meta.id === 'ISR') {
    return {
      ...meta,
      f: 'Neutrale',
      l: () => 'Stato di Israele (Armistizio Israele-Siria del 20 Luglio 1949 & Gerusalemme Ovest Capitale, Dic 1949)',
      shortName: 'Israele',
      leader: 'Presidente Chaim Weizmann · Primo Ministro David Ben-Gurion · Min. Esteri Moshe Sharett',
      capital: 'Gerusalemme Ovest (Proclamata Capitale nel Dicembre 1949)',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 26 && meta.id === 'ROK') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Repubblica di Corea & Comando Nazioni Unite (UNC — Controffensiva post-Incheon, Ritirata dal Nord & Linea sul Fiume Imjin / Seul)',
      shortName: 'Corea del Sud (ROK / Comando ONU)',
      leader: 'Presidente Syngman Rhee · Gen. Douglas MacArthur (Comandante ONU/UNC) · Gen. Matthew Ridgway (8ª Armata USA) · Gen. Chung Il-kwon',
      capital: 'Seoul (Sotto Controllo ROK-UNC al 31 Dic 1950 · Fronte sul Fiume Imjin)',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 25 && meta.id === 'ROK') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Repubblica di Corea (Guerra di Corea — Caduta di Seul il 28 Giugno 1950 & Governo Provvisorio a Daejeon)',
      shortName: 'Corea del Sud (ROK)',
      leader: 'Presidente Syngman Rhee · Gen. Chung Il-kwon · Supporto ONU/USA (Gen. Douglas MacArthur)',
      capital: 'Daejeon (Capitale Provvisoria dal 27 Giugno 1950)',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 26 && meta.id === 'PRK') {
    return {
      ...meta,
      f: 'Comintern',
      l: () => 'Repubblica Popolare Democratica di Corea / Volontari del Popolo Cinese (RPDC-PVA — Riconquista del Nord & Offensiva di Capodanno sul 38° Parallelo)',
      shortName: 'Corea del Nord (RPDC / PVA)',
      leader: 'Premier Kim Il-sung · Comandante PVA/Cino-Coreano Peng Dehuai · Maresciallo Choe Yong-gun',
      capital: 'Pyongyang (Riconquistata il 5 Dicembre 1950)',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 25 && meta.id === 'PRK') {
    return {
      ...meta,
      f: 'Comintern',
      l: () => 'Repubblica Popolare Democratica di Corea (Offensiva del 25 Giugno 1950 — Presa di Seul e Avanzata a Sud del Fiume Han)',
      shortName: 'Corea del Nord (RPDC)',
      leader: 'Premier e Comandante Supremo Kim Il-sung · Maresciallo Choe Yong-gun (KPA)',
      capital: 'Pyongyang',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 26 && (meta.id === 'VIE' || meta.id === 'DRV')) {
    return {
      ...meta,
      f: 'Comintern',
      l: () => 'Repubblica Democratica del Vietnam (Việt Minh — Vittoria sulla RC4 Ott 1950 & Apertura Totale del Confine con la RPC)',
      shortName: 'Vietnam (DRV / Việt Minh)',
      leader: 'Presidente Hồ Chí Minh · Gen. Võ Nguyên Giáp · PM Phạm Văn Đồng · Consiglieri & Logistica RPC',
      capital: 'Việt Bắc (Cao Bằng – Lạng Sơn – Thái Nguyên) · Liên khu IV–V & Nam Bộ',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 25 && (meta.id === 'VIE' || meta.id === 'DRV')) {
    return {
      ...meta,
      f: 'Comintern',
      l: () => 'Repubblica Democratica del Vietnam (Việt Minh — Riconoscimento RPC/URSS Gen 1950 & Riarmo nel Việt Bắc)',
      shortName: 'Vietnam (DRV / Việt Minh)',
      leader: 'Presidente Hồ Chí Minh · Gen. Võ Nguyên Giáp · PM Phạm Văn Đồng · Consiglieri CMAG (Wei Guoqing)',
      capital: 'Việt Bắc (Tân Trào / Thái Nguyên) · Liên khu IV–V & Nam Bộ',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 26 && meta.id === 'SVN') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Stato del Vietnam (Quốc gia Việt Nam — Evacuazione della RC4 Ott 1950 & Comando Gen. Jean de Lattre de Tassigny Dic 1950)',
      shortName: 'Stato del Vietnam',
      leader: 'Capo di Stato Bảo Đại · PM Trần Văn Hữu · Alto Comm. e Comandante Gen. Jean de Lattre de Tassigny (dal 17 Dic 1950)',
      capital: 'Saigon (Sài Gòn)',
      tier: 'protectorate',
      isSubject: true,
      overlordCode: 'FRA',
    };
  }
  if (_step !== undefined && _step >= 25 && meta.id === 'SVN') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Stato del Vietnam (Quốc gia Việt Nam — Riconoscimento USA/UK Feb 1950, Dominio della Corona & Governo Trần Văn Hữu)',
      shortName: 'Stato del Vietnam',
      leader: 'Capo di Stato Bảo Đại · Primo Ministro Trần Văn Hữu (dal Mag 1950) · Alto Comm. Léon Pignon',
      capital: 'Saigon (Sài Gòn)',
      tier: 'protectorate',
      isSubject: true,
      overlordCode: 'FRA',
    };
  }
  if (_step !== undefined && _step >= 26 && meta.id === 'LAO') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Regno del Laos (Stato Associato · Convenzioni di Pau Nov–Dic 1950 & Governo Phoui Sananikone)',
      shortName: 'Regno del Laos',
      leader: 'Re Sisavang Vong · Primo Ministro Phoui Sananikone · Comm. Jean de Raymond',
      capital: 'Vientiane / Luang Prabang (Capitale Reale)',
      tier: 'protectorate',
      isSubject: true,
      overlordCode: 'FRA',
    };
  }
  if (_step !== undefined && _step >= 25 && meta.id === 'LAO') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Regno del Laos (Stato Associato · Riconoscimento USA/UK Feb 1950 & Governo Phoui Sananikone)',
      shortName: 'Regno del Laos',
      leader: 'Re Sisavang Vong · Primo Ministro Phoui Sananikone (dal 27 Feb 1950) · Comm. Jean de Raymond',
      capital: 'Vientiane / Luang Prabang (Capitale Reale)',
      tier: 'protectorate',
      isSubject: true,
      overlordCode: 'FRA',
    };
  }
  if (_step !== undefined && _step >= 26 && meta.id === 'CAM') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Regno di Cambogia (Stato Associato · Convenzioni di Pau Nov–Dic 1950 & Governo Sisowath Monipong)',
      shortName: 'Regno di Cambogia',
      leader: 'Re Norodom Sihanouk · Primo Ministro Principe Sisowath Monipong',
      capital: 'Phnom Penh',
      tier: 'protectorate',
      isSubject: true,
      overlordCode: 'FRA',
    };
  }
  if (_step !== undefined && _step >= 25 && meta.id === 'CAM') {
    return {
      ...meta,
      f: 'Alleati',
      l: () => 'Regno di Cambogia (Stato Associato · Riconoscimento USA/UK Feb 1950 & Governo Sisowath Monipong)',
      shortName: 'Regno di Cambogia',
      leader: 'Re Norodom Sihanouk · Primo Ministro Principe Sisowath Monipong (dal 1° Giu 1950)',
      capital: 'Phnom Penh',
      tier: 'protectorate',
      isSubject: true,
      overlordCode: 'FRA',
    };
  }
  if (_step !== undefined && _step >= 26 && meta.id === 'TIB') {
    return {
      ...meta,
      f: 'Neutrale',
      l: () => 'Tibet (Lhasa & Xizang Occidentale — Pieni Poteri al 14° Dalai Lama dal 17 Nov 1950 dopo la Caduta di Chamdo)',
      shortName: 'Tibet',
      leader: '14° Dalai Lama Tenzin Gyatso (Pieni Poteri dal 17 Novembre 1950) · Kashag',
      capital: 'Lhasa',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 26 && meta.id === 'NEP') {
    return {
      ...meta,
      f: 'Neutrale',
      l: () => 'Regno del Nepal (Crisi del Nov 1950 — Fuga di Re Tribhuvan in India & Offensiva del Congresso Nepalese nel Terai)',
      shortName: 'Nepal',
      leader: 'Regime Rana (PM Mohan Shumsher Rana) · Re Tribhuvan (in esilio in India dal Nov 1950)',
      capital: 'Kathmandu',
      tier: 'sovereign',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 26 && meta.id === 'RMS') {
    return {
      ...meta,
      f: 'Neutrale',
      l: () => 'Repubblica delle Molucche Meridionali (RMS — Caduta di Ambon Nov 1950; Guerriglia Residua nell\'Interno di Seram)',
      shortName: 'Molucche Meridionali (RMS)',
      leader: 'Chris Soumokil (Sacche di guerriglia nell\'interno di Seram dopo la caduta di Ambon)',
      capital: 'Interno di Seram (Ambon riconquistata dalla TNI nel Nov 1950)',
      tier: 'autonomous',
      isSubject: false,
      overlordCode: null,
    };
  }
  if (_step !== undefined && _step >= 25 && meta.id === 'MAL') {
    return {
      ...meta,
      f: 'Alleati',
      c: '#c95b5b',
      l: () => 'Federazione della Malesia (Persekutuan Tanah Melayu — Bandiera a 11 Strisce del 26 Maggio 1950 & Piano Briggs)',
      shortName: 'Federazione della Malesia',
      leader: 'Alto Commissario Sir Henry Gurney · Dir. Operazioni Gen. Sir Harold Briggs · 9 Sultani Malesi',
      capital: 'Kuala Lumpur',
      tier: 'protectorate',
      isSubject: true,
      overlordCode: 'UK',
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
  const meta = getOwnerMeta(o, step);
  const canon = meta.id || canonicalizeOwnerCode(o, step);

  // Casi dinamici dipendenti dal tempo
  if (canon === 'ETH') {
    // Prima dell'occupazione (maggio 1936 / step 1) e dopo la liberazione di Addis Abeba (6 aprile 1941 / step 8), l'Etiopia è impero sovrano indipendente
    return step >= 1 && step < 8 ? getOwnerMeta('ITA', step) : null;
  }
  if (canon === 'EGY') {
    // Dopo lo sgombero militare britannico dal Cairo e dal Delta nella Zona del Canale (marzo 1947 / step >= 19), l'Egitto è riconosciuto come Stato sovrano distinto
    return step >= 19 ? null : getOwnerMeta('UK', step);
  }
  if (canon === 'IRQ') {
    // Colpo di Stato nazionalista filo-Asse di Rashid Ali al-Kaylani (aprile 1941 / step 8) o fine dell'occupazione PAIFORCE nel dopoguerra (step >= 19)
    return step === 8 || step >= 19 ? null : getOwnerMeta('UK', step);
  }
  if (canon === 'ALB') {
    // Prima dell'invasione (apr 1939 / step 4) e dopo la liberazione dal Reich (nov 1944 / step >= 16), l'Albania è Stato sovrano indipendente
    if (step >= 16 || step < 4) return null;
    return step >= 13 ? getOwnerMeta('GER', step) : getOwnerMeta('ITA', step);
  }
  if (canon === 'HAT') {
    // Annesso alla Turchia nel luglio 1939 (step 4)
    return step >= 4 ? getOwnerMeta('TUR', step) : null;
  }
  if (canon === 'PHL' || canon === 'PHI') {
    // Indipendenza delle Filippine proclamata il 4 luglio 1946 (step >= 19)
    return step >= 19 ? null : getOwnerMeta('USA', step);
  }

  if (meta.overlordCode) {
    return getOwnerMeta(meta.overlordCode, step);
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
  const cleanSubj = canonicalizeOwnerCode(subjectCode, step);
  const cleanMaster = canonicalizeOwnerCode(masterCode, step);
  if (cleanSubj === cleanMaster) return false;

  let current: OwnerConfig | null = getOverlord(cleanSubj, step);
  const visited = new Set<string>();

  while (current && current.id && !visited.has(current.id)) {
    visited.add(current.id);
    if (current.id === cleanMaster || canonicalizeOwnerCode(current.id, step) === cleanMaster) {
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
  const meta = getOwnerMeta(code, step);
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
    case 'international':
      return `Territorio Internazionale (Amministrazione Militare) · Potenza: ${overlordName}`;
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
