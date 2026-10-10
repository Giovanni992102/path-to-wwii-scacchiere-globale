import { ResolvedTerritory, FactionType } from '../types';
import {
  getExtendedToponym,
  resolvePolandToponym,
  resolveJapanToponym,
  resolveChinaToponym,
} from './historicalToponyms';

export const NUTS_URLS = [
  'https://gisco-services.ec.europa.eu/distribution/v2/nuts/topojson/NUTS_RG_10M_2021_4326_LEVL_3.json',
  'https://gisco-services.ec.europa.eu/distribution/v2/nuts/topojson/NUTS_RG_20M_2021_4326_LEVL_3.json',
];

export const CNTR_URLS = [
  'https://gisco-services.ec.europa.eu/distribution/v2/countries/topojson/CNTR_RG_20M_2020_4326.json',
];

export const HB_URL1 =
  'https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/world_1938.geojson';

export const ITNAMES: Record<string, string> = {
  UK: 'United Kingdom',
  EL: 'Ellas',
  IE: 'Éire / Ireland',
  IS: 'Ísland',
  NO: 'Norge',
  SE: 'Sverige',
  FI: 'Suomi',
  DK: 'Danmark',
  EE: 'Eesti',
  LV: 'Latvija',
  LT: 'Lietuva',
  BY: 'Belorusskaya SSR',
  UA: 'Ukrainskaya SSR',
  MD: 'Moldavskaya ASSR / Basarabia',
  RU: 'SSSR',
  TR: 'Türkiye',
  HU: 'Magyarország',
  RO: 'România',
  BG: 'Balgariya',
  AL: 'Shqipëria',
  RS: 'Kraljevina Jugoslavija (Srbija)',
  HR: 'Kraljevina Jugoslavija (Hrvatska)',
  SI: 'Kraljevina Jugoslavija (Slovenija)',
  BA: 'Kraljevina Jugoslavija (Bosna i Hercegovina)',
  BIH: 'Kraljevina Jugoslavija (Bosna i Hercegovina)',
  ME: 'Kraljevina Jugoslavija (Crna Gora)',
  MK: 'Kraljevina Jugoslavija (Vardarska banovina)',
  XK: 'Kraljevina Jugoslavija (Kosovo i Metohija)',
  XKX: 'Kraljevina Jugoslavija (Kosovo i Metohija)',
  KO: 'Kraljevina Jugoslavija (Kosovo i Metohija)',
  KV: 'Kraljevina Jugoslavija (Kosovo i Metohija)',
  YU: 'Kraljevina Jugoslavija',
  YUG: 'Kraljevina Jugoslavija',
  CH: 'Schweiz / Suisse',
  AT: 'Österreich',
  ES: 'España',
  PT: 'Portugal',
  LI: 'Liechtenstein',
  SM: 'Serenissima Repubblica di San Marino',
  SMR: 'Serenissima Repubblica di San Marino',
  VA: 'Stato della Città del Vaticano',
  VAT: 'Stato della Città del Vaticano',
  GI: 'Gibilterra (Colonia della Corona Britannica)',
  GIB: 'Gibilterra (Colonia della Corona Britannica)',
  CN: 'Zhonghua Minguo',
  MN: 'Mongol Ard Uls',
  BR: 'Brasil',
  AR: 'Argentina',
  MX: 'México',
  CL: 'Chile',
  PE: 'Perú',
  CO: 'Colombia',
  VE: 'Venezuela',
  EC: 'Ecuador',
  BO: 'Bolivia',
  PY: 'Paraguay',
  UY: 'Uruguay',
  GT: 'Guatemala',
  GTM: 'Guatemala',
  '320': 'Guatemala',
  SV: 'El Salvador',
  SLV: 'El Salvador',
  '222': 'El Salvador',
  HN: 'Honduras',
  HND: 'Honduras',
  '340': 'Honduras',
  NI: 'Nicaragua',
  NIC: 'Nicaragua',
  '558': 'Nicaragua',
  CR: 'Costa Rica',
  CRI: 'Costa Rica',
  '188': 'Costa Rica',
  PA: 'Panamá',
  PAN: 'Panamá',
  '591': 'Panamá',
  PZ: 'Panama Canal Zone',
  PCZ: 'Panama Canal Zone',
  '590': 'Panama Canal Zone',
  CU: 'Cuba',
  CUB: 'Cuba',
  '192': 'Cuba',
  DO: 'República Dominicana',
  DOM: 'República Dominicana',
  '214': 'República Dominicana',
  HT: 'Haïti',
  HTI: 'Haïti',
  HAI: 'Haïti',
  '332': 'Haïti',
  BZ: 'British Honduras (Belize)',
  BLZ: 'British Honduras (Belize)',
  '084': 'British Honduras (Belize)',
  JM: 'Jamaica',
  JAM: 'Jamaica',
  '388': 'Jamaica',
  BS: 'Bahamas',
  BHS: 'Bahamas',
  '044': 'Bahamas',
  BB: 'Barbados',
  BRB: 'Barbados',
  '052': 'Barbados',
  TT: 'Trinidad and Tobago',
  TTO: 'Trinidad and Tobago',
  '780': 'Trinidad and Tobago',
  IR: 'Iran',
  SA: 'Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah',
  SAU: 'Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah',
  '682': 'Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah',
  KSA: 'Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah',
  NT: 'Saudi-Iraqi / Saudi-Kuwaiti Neutral Zone',
  NTZ: 'Saudi-Iraqi / Saudi-Kuwaiti Neutral Zone',
  '536': 'Saudi-Iraqi / Saudi-Kuwaiti Neutral Zone',
  AF: 'Afghanistan',
  TH: 'Siam / Thailand',
  LR: 'Liberia',
  LBR: 'Liberia',
  '430': 'Liberia',
  GY: 'British Guiana',
  SR: 'Suriname (Nederlands-Guyana)',
  GF: 'Guyane française',
  IQ: 'Kingdom of Iraq (Mesopotamia)',
  IRQ: 'Kingdom of Iraq (Mesopotamia)',
  '368': 'Kingdom of Iraq (Mesopotamia)',
  IM: 'Crown Dependency of the Isle of Man',
  IMN: 'Crown Dependency of the Isle of Man',
  GBM: 'Crown Dependency of the Isle of Man',
  GG: 'Bailiwick of Guernsey',
  GGY: 'Bailiwick of Guernsey',
  JE: 'Bailiwick of Jersey',
  JEY: 'Bailiwick of Jersey',
};

export const ITA_COL: Record<string, string> = {
  LY: 'Libia Italiana (Quarta Sponda)',
  LBY: 'Libia Italiana (Quarta Sponda)',
  ER: 'Colonia Eritrea (AOI)',
  ERI: 'Colonia Eritrea (AOI)',
  SO: 'Governo della Somalia (AOI)',
  SOM: 'Governo della Somalia (AOI)',
};

export const FRA_COL: Record<string, [string, string]> = {
  MA: ['Protectorat français au Maroc', 'F_NAF'],
  MAR: ['Protectorat français au Maroc', 'F_NAF'],
  TN: ['Protectorat français de Tunisie', 'F_NAF'],
  TUN: ['Protectorat français de Tunisie', 'F_NAF'],
  DZ: ['Départements français d\'Algérie', 'F_NAF'],
  DZA: ['Départements français d\'Algérie', 'F_NAF'],
  MR: ['AOF (Mauritanie)', 'F_AOF'],
  MRT: ['AOF (Mauritanie)', 'F_AOF'],
  SN: ['AOF (Sénégal)', 'F_AOF'],
  SEN: ['AOF (Sénégal)', 'F_AOF'],
  ML: ['AOF (Soudan français)', 'F_AOF'],
  MLI: ['AOF (Soudan français)', 'F_AOF'],
  BF: ['AOF (Haute-Volta)', 'F_AOF'],
  BFA: ['AOF (Haute-Volta)', 'F_AOF'],
  NE: ['AOF (Niger)', 'F_AOF'],
  NER: ['AOF (Niger)', 'F_AOF'],
  CI: ['AOF (Côte d\'Ivoire)', 'F_AOF'],
  CIV: ['AOF (Côte d\'Ivoire)', 'F_AOF'],
  GN: ['AOF (Guinée française)', 'F_AOF'],
  GIN: ['AOF (Guinée française)', 'F_AOF'],
  TG: ['Togo français', 'F_AOF'],
  TGO: ['Togo français', 'F_AOF'],
  BJ: ['AOF (Dahomey)', 'F_AOF'],
  BEN: ['AOF (Dahomey)', 'F_AOF'],
  TD: ['AEF (Tchad)', 'F_AEF'],
  TCD: ['AEF (Tchad)', 'F_AEF'],
  CM: ['Cameroun français', 'F_AEF'],
  CMR: ['Cameroun français', 'F_AEF'],
  CF: ['AEF (Oubangui-Chari)', 'F_AEF'],
  CAF: ['AEF (Oubangui-Chari)', 'F_AEF'],
  CG: ['AEF (Moyen-Congo)', 'F_AEF'],
  COG: ['AEF (Moyen-Congo)', 'F_AEF'],
  GA: ['AEF (Gabon)', 'F_AEF'],
  GAB: ['AEF (Gabon)', 'F_AEF'],
  MG: ['Madagascar et dépendances', 'F_MAD'],
  MDG: ['Madagascar et dépendances', 'F_MAD'],
  KM: ['Archipel des Comores (France)', 'F_MAD'],
  COM: ['Archipel des Comores (France)', 'F_MAD'],
  RE: ['La Réunion (France)', 'F_MAD'],
  REU: ['La Réunion (France)', 'F_MAD'],
  YT: ['Mayotte (France)', 'F_MAD'],
  MYT: ['Mayotte (France)', 'F_MAD'],
  SY: ['Mandat français en Syrie', 'F_SYR'],
  SYR: ['Mandat français en Syrie', 'F_SYR'],
  LB: ['Grand Liban (Mandat français)', 'F_SYR'],
  LBN: ['Grand Liban (Mandat français)', 'F_SYR'],
  VN: ['Indochine française (Tonkin/Annam/Cochinchine)', 'F_IND'],
  VNM: ['Indochine française (Tonkin/Annam/Cochinchine)', 'F_IND'],
  KH: ['Indochine française (Cambodge)', 'F_IND'],
  KHM: ['Indochine française (Cambodge)', 'F_IND'],
  LA: ['Indochine française (Laos)', 'F_IND'],
  LAO: ['Indochine française (Laos)', 'F_IND'],
  NC: ['Nouvelle-Calédonie (France)', 'F_COL'],
  NCL: ['Nouvelle-Calédonie (France)', 'F_COL'],
  GF: ['Guyane française (Cayenne)', 'F_COL'],
  GUF: ['Guyane française (Cayenne)', 'F_COL'],
  DJ: ['Côte française des Somalis (Djibouti)', 'F_SOM'],
  DJI: ['Côte française des Somalis (Djibouti)', 'F_SOM'],
  PF: ['Établissements français de l\'Océanie', 'F_COL'],
  PYF: ['Établissements français de l\'Océanie', 'F_COL'],
  GP: ['Guadeloupe (France)', 'F_COL'],
  GLP: ['Guadeloupe (France)', 'F_COL'],
  MQ: ['Martinique (France)', 'F_COL'],
  MTQ: ['Martinique (France)', 'F_COL'],
  PM: ['Saint-Pierre-et-Miquelon (France)', 'F_COL'],
  SPM: ['Saint-Pierre-et-Miquelon (France)', 'F_COL'],
  WF: ['Wallis-et-Futuna (France)', 'F_COL'],
  WLF: ['Wallis-et-Futuna (France)', 'F_COL'],
  VU: ['Nouvelles-Hébrides (Condominium franco-britannique)', 'F_COL'],
  VUT: ['Nouvelles-Hébrides (Condominium franco-britannique)', 'F_COL'],
};

export const UK_COL: Record<string, string> = {
  EG: 'Kingdom of Egypt (British Sphere)',
  EGY: 'Kingdom of Egypt (British Sphere)',
  SD: 'Anglo-Egyptian Sudan',
  SDN: 'Anglo-Egyptian Sudan',
  SS: 'Anglo-Egyptian Sudan',
  SSD: 'Anglo-Egyptian Sudan',
  KE: 'Kenya Colony and Protectorate',
  KEN: 'Kenya Colony and Protectorate',
  UG: 'Uganda Protectorate',
  UGA: 'Uganda Protectorate',
  TZ: 'Tanganyika Territory (Mandate)',
  TZA: 'Tanganyika Territory (Mandate)',
  ZM: 'Northern Rhodesia',
  ZMB: 'Northern Rhodesia',
  ZW: 'Southern Rhodesia',
  ZWE: 'Southern Rhodesia',
  MW: 'Nyasaland Protectorate',
  MWI: 'Nyasaland Protectorate',
  BW: 'Bechuanaland Protectorate',
  BWA: 'Bechuanaland Protectorate',
  LS: 'Basutoland',
  LSO: 'Basutoland',
  SZ: 'Swaziland',
  SWZ: 'Swaziland',
  GH: 'Gold Coast (Crown Colony)',
  GHA: 'Gold Coast (Crown Colony)',
  NG: 'Colony and Protectorate of Nigeria',
  NGA: 'Colony and Protectorate of Nigeria',
  SL: 'Sierra Leone Colony and Protectorate',
  SLE: 'Sierra Leone Colony and Protectorate',
  GM: 'Gambia Colony and Protectorate',
  GMB: 'Gambia Colony and Protectorate',
  PS: 'British Mandate for Palestine',
  PSE: 'British Mandate for Palestine',
  IL: 'British Mandate for Palestine',
  ISR: 'British Mandate for Palestine',
  JO: 'Emirate of Transjordan',
  JOR: 'Emirate of Transjordan',
  IQ: 'Kingdom of Iraq (Mesopotamia)',
  IRQ: 'Kingdom of Iraq (Mesopotamia)',
  '368': 'Kingdom of Iraq (Mesopotamia)',
  LK: 'Ceylon (Crown Colony)',
  LKA: 'Ceylon (Crown Colony)',
  MM: 'British Burma',
  MMR: 'British Burma',
  MY: 'British Malaya',
  MYS: 'British Malaya',
  SG: 'Straits Settlements (Singapore)',
  SGP: 'Straits Settlements (Singapore)',
  HK: 'Crown Colony of Hong Kong',
  HKG: 'Crown Colony of Hong Kong',
  GY: 'British Guiana',
  GUY: 'British Guiana',
  YE: 'Aden Colony and Protectorate',
  YEM: 'Aden Colony and Protectorate',
  OM: 'Sultanate of Muscat and Oman',
  OMN: 'Sultanate of Muscat and Oman',
  AE: 'Trucial States',
  ARE: 'Trucial States',
  QA: 'State of Qatar (British Protectorate)',
  QAT: 'State of Qatar (British Protectorate)',
  KW: 'State of Kuwait (British Protectorate)',
  KWT: 'State of Kuwait (British Protectorate)',
  BH: 'State of Bahrain (British Protectorate)',
  BHR: 'State of Bahrain (British Protectorate)',
  CY: 'Crown Colony of Cyprus',
  CYP: 'Crown Colony of Cyprus',
  MT: 'Crown Colony of Malta',
  MLT: 'Crown Colony of Malta',
  GI: 'Gibraltar (Crown Colony)',
  GIB: 'Gibraltar (Crown Colony)',
  BZ: 'British Honduras (Belize)',
  BLZ: 'British Honduras (Belize)',
  '084': 'British Honduras (Belize)',
  JM: 'Jamaica (Crown Colony)',
  JAM: 'Jamaica (Crown Colony)',
  '388': 'Jamaica (Crown Colony)',
  TT: 'Trinidad and Tobago (Crown Colony)',
  TTO: 'Trinidad and Tobago (Crown Colony)',
  '780': 'Trinidad and Tobago (Crown Colony)',
  BS: 'Bahamas (Crown Colony)',
  BHS: 'Bahamas (Crown Colony)',
  '044': 'Bahamas (Crown Colony)',
  BB: 'Barbados (Crown Colony)',
  BRB: 'Barbados (Crown Colony)',
  '052': 'Barbados (Crown Colony)',
  BM: 'Bermuda (Crown Colony)',
  BMU: 'Bermuda (Crown Colony)',
  '060': 'Bermuda (Crown Colony)',
  KY: 'Cayman Islands (Crown Colony)',
  CYM: 'Cayman Islands (Crown Colony)',
  '136': 'Cayman Islands (Crown Colony)',
  TC: 'Turks and Caicos Islands (Crown Colony)',
  TCA: 'Turks and Caicos Islands (Crown Colony)',
  '796': 'Turks and Caicos Islands (Crown Colony)',
  AG: 'Antigua and Barbuda (Crown Colony)',
  ATG: 'Antigua and Barbuda (Crown Colony)',
  '028': 'Antigua and Barbuda (Crown Colony)',
  KN: 'Saint Christopher and Nevis (Crown Colony)',
  KNA: 'Saint Christopher and Nevis (Crown Colony)',
  '659': 'Saint Christopher and Nevis (Crown Colony)',
  AI: 'Anguilla (Crown Colony)',
  AIA: 'Anguilla (Crown Colony)',
  '660': 'Anguilla (Crown Colony)',
  MS: 'Montserrat (Crown Colony)',
  MSR: 'Montserrat (Crown Colony)',
  '500': 'Montserrat (Crown Colony)',
  VG: 'British Virgin Islands',
  VGB: 'British Virgin Islands',
  '092': 'British Virgin Islands',
  DM: 'Dominica (Crown Colony)',
  DMA: 'Dominica (Crown Colony)',
  '212': 'Dominica (Crown Colony)',
  LC: 'Saint Lucia (Crown Colony)',
  LCA: 'Saint Lucia (Crown Colony)',
  '662': 'Saint Lucia (Crown Colony)',
  VC: 'Saint Vincent and the Grenadines (Crown Colony)',
  VCT: 'Saint Vincent and the Grenadines (Crown Colony)',
  '670': 'Saint Vincent and the Grenadines (Crown Colony)',
  GD: 'Grenada (Crown Colony)',
  GRD: 'Grenada (Crown Colony)',
  '308': 'Grenada (Crown Colony)',
  FK: 'Falkland Islands and Dependencies',
  FLK: 'Falkland Islands and Dependencies',
  SH: 'Saint Helena, Ascension and Tristan da Cunha',
  SHN: 'Saint Helena, Ascension and Tristan da Cunha',
  MU: 'Mauritius (Crown Colony)',
  MUS: 'Mauritius (Crown Colony)',
  SC: 'Seychelles (Crown Colony)',
  SYC: 'Seychelles (Crown Colony)',
  SB: 'British Solomon Islands Protectorate',
  SLB: 'British Solomon Islands Protectorate',
  FJ: 'Colony of Fiji',
  FJI: 'Colony of Fiji',
  TO: 'Kingdom of Tonga (British Protected State)',
  TON: 'Kingdom of Tonga (British Protected State)',
  KI: 'Gilbert and Ellice Islands Colony',
  KIR: 'Gilbert and Ellice Islands Colony',
  TV: 'Gilbert and Ellice Islands Colony',
  TUV: 'Gilbert and Ellice Islands Colony',
  PG: 'Territory of Papua and New Guinea (Australian Mandate)',
  PNG: 'Territory of Papua and New Guinea (Australian Mandate)',
  BN: 'State of Brunei (British Protected State)',
  BRN: 'State of Brunei (British Protected State)',
  MV: 'Maldive Islands (British Protected State)',
  MDV: 'Maldive Islands (British Protected State)',
  IM: 'Crown Dependency of the Isle of Man',
  IMN: 'Crown Dependency of the Isle of Man',
  GBM: 'Crown Dependency of the Isle of Man',
  '833': 'Crown Dependency of the Isle of Man',
  XIM: 'Crown Dependency of the Isle of Man',
  GG: 'Bailiwick of Guernsey (Crown Dependency)',
  GGY: 'Bailiwick of Guernsey (Crown Dependency)',
  '831': 'Bailiwick of Guernsey (Crown Dependency)',
  XGG: 'Bailiwick of Guernsey (Crown Dependency)',
  JE: 'Bailiwick of Jersey (Crown Dependency)',
  JEY: 'Bailiwick of Jersey (Crown Dependency)',
  '832': 'Bailiwick of Jersey (Crown Dependency)',
  XJE: 'Bailiwick of Jersey (Crown Dependency)',
};

export const POR_COL: Record<string, string> = {
  AO: 'África Ocidental Portuguesa (Angola)',
  AGO: 'África Ocidental Portuguesa (Angola)',
  MZ: 'África Oriental Portuguesa (Moçambique)',
  MOZ: 'África Oriental Portuguesa (Moçambique)',
  GW: 'Guiné Portuguesa (Bissau)',
  GNB: 'Guiné Portuguesa (Bissau)',
  CV: 'Província de Cabo Verde',
  CPV: 'Província de Cabo Verde',
  ST: 'São Tomé e Príncipe',
  STP: 'São Tomé e Príncipe',
  TL: 'Timor Português (Díli)',
  TLS: 'Timor Português (Díli)',
  MO: 'Macau Português',
  MAC: 'Macau Português',
};

export const BEL_COL: Record<string, string> = {
  CD: 'Congo belge (Léopoldville)',
  COD: 'Congo belge (Léopoldville)',
  RW: 'Ruanda-Urundi (Mandat belge)',
  RWA: 'Ruanda-Urundi (Mandat belge)',
  BI: 'Ruanda-Urundi (Mandat belge)',
  BDI: 'Ruanda-Urundi (Mandat belge)',
};

export const HOL_COL: Record<string, string> = {
  ID: 'Nederlands-Indië (Batavia)',
  IDN: 'Nederlands-Indië (Batavia)',
  SR: 'Suriname (Nederlands-Guyana)',
  SUR: 'Suriname (Nederlands-Guyana)',
  AW: 'Aruba (Gebiedsdeel Curaçao)',
  ABW: 'Aruba (Gebiedsdeel Curaçao)',
  CW: 'Curaçao (Gebiedsdeel Curaçao)',
  CUW: 'Curaçao (Gebiedsdeel Curaçao)',
  SX: 'Sint Maarten (Gebiedsdeel Curaçao)',
  SXM: 'Sint Maarten (Gebiedsdeel Curaçao)',
  BQ: 'Bonaire, Sint Eustatius en Saba (Gebiedsdeel Curaçao)',
  BES: 'Bonaire, Sint Eustatius en Saba (Gebiedsdeel Curaçao)',
};

export const JAP_COL: Record<string, string> = {
  JP: 'Dai Nippon Teikoku (Naichi)',
  JPN: 'Dai Nippon Teikoku (Naichi)',
  KR: 'Chōsen (Chōsen Sōtokufu)',
  KOR: 'Chōsen (Chōsen Sōtokufu)',
  KP: 'Chōsen (Chōsen Sōtokufu)',
  PRK: 'Chōsen (Chōsen Sōtokufu)',
  TW: 'Taiwan (Taiwan Sōtokufu)',
  TWN: 'Taiwan (Taiwan Sōtokufu)',
  MH: 'Nan\'yō Guntō (Nan\'yō-chō)',
  MHL: 'Nan\'yō Guntō (Nan\'yō-chō)',
  FM: 'Nan\'yō Guntō (Nan\'yō-chō)',
  FSM: 'Nan\'yō Guntō (Nan\'yō-chō)',
  PW: 'Nan\'yō Guntō (Parao)',
  PLW: 'Nan\'yō Guntō (Parao)',
  MP: 'Nan\'yō Guntō (Saipan)',
  MNP: 'Nan\'yō Guntō (Saipan)',
};

export const USA_COL: Record<string, string> = {
  US: 'United States of America',
  USA: 'United States of America',
  PH: 'Commonwealth of the Philippines',
  PHL: 'Commonwealth of the Philippines',
  PR: 'Puerto Rico (Unincorporated U.S. Territory)',
  PRI: 'Puerto Rico (Unincorporated U.S. Territory)',
  GU: 'Guam (U.S. Naval Station)',
  GUM: 'Guam (U.S. Naval Station)',
  VI: 'Virgin Islands of the United States',
  VIR: 'Virgin Islands of the United States',
  AS: 'American Samoa (U.S. Naval Station)',
  ASM: 'American Samoa (U.S. Naval Station)',
  MP: 'Northern Mariana Islands (U.S. Control)',
  UM: 'United States Minor Outlying Islands',
  UMI: 'United States Minor Outlying Islands',
  PZ: 'Panama Canal Zone (Unorganized U.S. Territory)',
  PCZ: 'Panama Canal Zone (Unorganized U.S. Territory)',
  '590': 'Panama Canal Zone (Unorganized U.S. Territory)',
};

// Esclusioni dal basemap d'epoca per lasciare spazio all'alta risoluzione NUTS-3 in Europa e alle province dettagliate in Cina/URSS
export const HB_EXCL = new Set([
  'Germany',
  'Poland',
  'USSR',
  'Armenia',
  'Italy',
  'France',
  'French Guiana',
  'Austria',
  'Albania',
  'Greece',
  'Bulgaria',
  'Romania',
  'Moldova',
  'Norway',
  'Sweden',
  'Denmark',
  'Finland',
  'Republic of Finland',
  'Ã…land Islands (Finland)',
  'Åland Islands (Finland)',
  'Aland Islands (Finland)',
  'Aland Islands',
  'Åland Islands',
  'Aland',
  'Åland',
  'Ahvenanmaa',
  'Ahvenanmaan maakunta',
  'Saaremaa and Hiiumaa (Estonia)',
  'RÃ¼gen (Germany)',
  'Rügen (Germany)',
  'British Isles Islands (UK)',
  'Netherlands',
  'Belgium',
  'Luxembourg',
  'Switzerland',
  'Spain',
  'Portugal',
  'United Kingdom',
  'United Kingdom of Great Britain and Ireland',
  'Ireland',
  'Iceland',
  'Estonia',
  'Latvia',
  'Lithuania',
  'Turkey',
  'Danzig',
  'Free City of Danzig',
  'Malta',
  'Cyprus',
  'Saar',
  'Saarland',
  'Yugoslavia',
  'Kingdom of Yugoslavia',
  'Czechoslovakia',
  'Hungary',
  'Kingdom of Hungary',
  'Chinese warlords',
  'China',
  'Republic of China',
  'Manchukuo',
  'Mengjiang',
  'Xinjiang',
  'Tibet',
  'Hong Kong',
  'Macau',
]);

export function makeResult(
  o: string,
  name: string,
  note?: string,
  fac?: FactionType,
  adminEntity?: string
): ResolvedTerritory {
  return { o, name, note, fac, adminEntity };
}

export function normStr(s: string): string {
  return (s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function bboxOf(f: any): { minx: number; maxx: number; miny: number; maxy: number } | null {
  const g = f.geometry;
  if (!g) return null;
  const polys = g.type === 'MultiPolygon' ? g.coordinates : [g.coordinates];
  let minx = 1e9,
    maxx = -1e9,
    miny = 1e9,
    maxy = -1e9;
  for (const poly of polys) {
    for (const ring of poly) {
      for (const pt of ring) {
        if (pt[0] < minx) minx = pt[0];
        if (pt[1] < miny) miny = pt[1];
        if (pt[1] > maxy) maxy = pt[1];
      }
    }
  }
  return { minx, maxx, miny, maxy };
}

export const HB_NAME: Record<string, { o: string; label: string }> = {
  'South Seas Mandate': { o: 'JAP', label: "Nan'yō Guntō (Nan'yō-chō)" },
  'South Pacific Mandate': { o: 'JAP', label: "Nan'yō Guntō (Nan'yō-chō)" },
  Nanyo: { o: 'JAP', label: "Nan'yō Guntō (Nan'yō-chō)" },
  'Wake Island': { o: 'USA', label: 'Wake Island (U.S. Navy / Naval Air Station)' },
  Greenland: { o: 'DEN', label: 'Grønland (Kongeriget Danmark)' },
  'Faroe Islands': { o: 'DEN', label: 'Færøerne (Kongeriget Danmark)' },
  Svalbard: { o: 'NOR', label: 'Svalbard (Kongeriket Norge)' },
  'Jan Mayen': { o: 'NOR', label: 'Jan Mayen (Kongeriket Norge)' },
  'Empire of Japan': { o: 'JAP', label: 'Dai Nippon Teikoku' },
  Japan: { o: 'JAP', label: 'Dai Nippon Teikoku' },
  Korea: { o: 'JAP', label: 'Chōsen (Chōsen Sōtokufu)' },
  Chosen: { o: 'JAP', label: 'Chōsen (Chōsen Sōtokufu)' },
  Taiwan: { o: 'JAP', label: 'Taiwan (Taiwan Sōtokufu)' },
  Formosa: { o: 'JAP', label: 'Taiwan (Taiwan Sōtokufu)' },
  Philippines: { o: 'PHL', label: 'Commonwealth of the Philippines' },
  'Commonwealth of the Philippines': { o: 'PHL', label: 'Commonwealth of the Philippines' },
  'Commonwealth delle Filippine': { o: 'PHL', label: 'Commonwealth of the Philippines' },
  'Puerto Rico': { o: 'USA', label: 'Puerto Rico (Unincorporated U.S. Territory)' },
  Hawaii: { o: 'USA', label: 'Territory of Hawaii (USA)' },
  Alaska: { o: 'USA', label: 'Territory of Alaska (USA)' },
  Guam: { o: 'USA', label: 'Guam (U.S. Naval Station)' },
  'American Samoa': { o: 'USA', label: 'American Samoa (U.S. Naval Station)' },
  'Chinese warlords': { o: 'CHI', label: 'Zhonghua Minguo (Difang Junfa)' },
  Tibet: { o: 'TIB', label: 'Bod Gzhung (Lhasa)' },
  Siam: { o: 'SIA', label: 'Ratcha-anachak Thai (Siam)' },
  Liberia: { o: 'LBR', label: 'Republic of Liberia' },
  'Republic of Liberia': { o: 'LBR', label: 'Republic of Liberia' },
  'Repubblica di Liberia': { o: 'LBR', label: 'Republic of Liberia' },
  Brazil: { o: 'BRA', label: 'Estados Unidos do Brasil (Estado Novo)' },
  Argentina: { o: 'ARG', label: 'República Argentina' },
  Mexico: { o: 'MEX', label: 'Estados Unidos Mexicanos' },
  Peru: { o: 'PRU', label: 'República Peruana' },
  Chile: { o: 'CHL', label: 'República de Chile' },
  Colombia: { o: 'COL', label: 'República de Colombia' },
  Venezuela: { o: 'VEN', label: 'Estados Unidos de Venezuela' },
  Ecuador: { o: 'ECU', label: 'República del Ecuador' },
  Bolivia: { o: 'BOL', label: 'República de Bolivia' },
  Paraguay: { o: 'PAR', label: 'República del Paraguay' },
  Uruguay: { o: 'URU', label: 'República Oriental del Uruguay' },
  Guatemala: { o: 'GTM', label: 'República de Guatemala' },
  'Republic of Guatemala': { o: 'GTM', label: 'República de Guatemala' },
  'República de Guatemala': { o: 'GTM', label: 'República de Guatemala' },
  'El Salvador': { o: 'SLV', label: 'República de El Salvador' },
  Salvador: { o: 'SLV', label: 'República de El Salvador' },
  'Republic of El Salvador': { o: 'SLV', label: 'República de El Salvador' },
  'República de El Salvador': { o: 'SLV', label: 'República de El Salvador' },
  Honduras: { o: 'HND', label: 'República de Honduras' },
  'Republic of Honduras': { o: 'HND', label: 'República de Honduras' },
  'República de Honduras': { o: 'HND', label: 'República de Honduras' },
  Nicaragua: { o: 'NIC', label: 'República de Nicaragua' },
  'Republic of Nicaragua': { o: 'NIC', label: 'República de Nicaragua' },
  'República de Nicaragua': { o: 'NIC', label: 'República de Nicaragua' },
  'Costa Rica': { o: 'CRI', label: 'República de Costa Rica' },
  'Republic of Costa Rica': { o: 'CRI', label: 'República de Costa Rica' },
  'República de Costa Rica': { o: 'CRI', label: 'República de Costa Rica' },
  Panama: { o: 'PAN', label: 'República de Panamá' },
  Panamá: { o: 'PAN', label: 'República de Panamá' },
  'Republic of Panama': { o: 'PAN', label: 'República de Panamá' },
  'República de Panamá': { o: 'PAN', label: 'República de Panamá' },
  'Panama Canal Zone': { o: 'USA', label: 'Panama Canal Zone (Unorganized U.S. Territory)' },
  'Canal Zone': { o: 'USA', label: 'Panama Canal Zone (Unorganized U.S. Territory)' },
  'Panama Canal': { o: 'USA', label: 'Panama Canal Zone (Unorganized U.S. Territory)' },
  'Zona del Canal de Panamá': { o: 'USA', label: 'Panama Canal Zone (Unorganized U.S. Territory)' },
  Cuba: { o: 'CUB', label: 'República de Cuba' },
  'Republic of Cuba': { o: 'CUB', label: 'República de Cuba' },
  'República de Cuba': { o: 'CUB', label: 'República de Cuba' },
  'Dominican Republic': { o: 'DOM', label: 'República Dominicana (Era de Trujillo)' },
  'República Dominicana': { o: 'DOM', label: 'República Dominicana (Era de Trujillo)' },
  'Dominican Rep.': { o: 'DOM', label: 'República Dominicana (Era de Trujillo)' },
  'Santo Domingo': { o: 'DOM', label: 'República Dominicana (Era de Trujillo)' },
  Haiti: { o: 'HAI', label: 'République d\'Haïti' },
  Haïti: { o: 'HAI', label: 'République d\'Haïti' },
  'Republic of Haiti': { o: 'HAI', label: 'République d\'Haïti' },
  'République d\'Haïti': { o: 'HAI', label: 'République d\'Haïti' },
  'Saudi Arabia': { o: 'SAU', label: 'Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah (Nejd, Hejaz wa Mulhaqatuha)' },
  'Kingdom of Saudi Arabia': { o: 'SAU', label: 'Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah (Nejd, Hejaz wa Mulhaqatuha)' },
  'Arabia Saudita': { o: 'SAU', label: 'Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah (Nejd, Hejaz wa Mulhaqatuha)' },
  'Regno dell\'Arabia Saudita': { o: 'SAU', label: 'Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah (Nejd, Hejaz wa Mulhaqatuha)' },
  'Arabian Peninsula': { o: 'SAU', label: 'Shibh al-Jazīrah al-‘Arabiyyah (Nejd wa al-Hijaz)' },
  Nejd: { o: 'SAU', label: 'Mintaqat Najd (Nejd — Al-Mamlakah as-Su‘ūdiyyah)' },
  Najd: { o: 'SAU', label: 'Mintaqat Najd (Nejd — Al-Mamlakah as-Su‘ūdiyyah)' },
  'Nejd and Hasa': { o: 'SAU', label: 'Najd wa al-Ahsa (Nejd & Al-Hasa)' },
  Hejaz: { o: 'SAU', label: 'Mintaqat al-Hijaz (Hejaz — Al-Mamlakah as-Su‘ūdiyyah)' },
  Hedjaz: { o: 'SAU', label: 'Mintaqat al-Hijaz (Hejaz — Al-Mamlakah as-Su‘ūdiyyah)' },
  Hijaz: { o: 'SAU', label: 'Mintaqat al-Hijaz (Hejaz — Al-Mamlakah as-Su‘ūdiyyah)' },
  Asir: { o: 'SAU', label: 'Mintaqat ‘Asir wa Tihamah (Al-Mamlakah as-Su‘ūdiyyah)' },
  Aseer: { o: 'SAU', label: 'Mintaqat ‘Asir wa Tihamah (Al-Mamlakah as-Su‘ūdiyyah)' },
  'Al-Hasa': { o: 'SAU', label: 'Mintaqat al-Ahsa (Al-Hasa / Ash-Sharqiyyah)' },
  'Al-Ahsa': { o: 'SAU', label: 'Mintaqat al-Ahsa (Al-Hasa / Ash-Sharqiyyah)' },
  'Eastern Province': { o: 'SAU', label: 'Al-Mintaqah ash-Sharqiyyah (Al-Ahsa)' },
  'Ash Sharqiyah': { o: 'SAU', label: 'Al-Mintaqah ash-Sharqiyyah (Al-Ahsa)' },
  Riyadh: { o: 'SAU', label: 'Ar-Riyad (‘Asimat al-Mamlakah — Najd)' },
  'Ar Riyad': { o: 'SAU', label: 'Ar-Riyad (‘Asimat al-Mamlakah — Najd)' },
  Makkah: { o: 'SAU', label: 'Makkah al-Mukarramah (Al-Hijaz)' },
  Mecca: { o: 'SAU', label: 'Makkah al-Mukarramah (Al-Hijaz)' },
  Madinah: { o: 'SAU', label: 'Al-Madinah al-Munawwarah (Al-Hijaz)' },
  Medina: { o: 'SAU', label: 'Al-Madinah al-Munawwarah (Al-Hijaz)' },
  Jeddah: { o: 'SAU', label: 'Jiddah (Mina\' al-Hijaz)' },
  Jidda: { o: 'SAU', label: 'Jiddah (Mina\' al-Hijaz)' },
  Taif: { o: 'SAU', label: 'At-Ta\'if (Al-Hijaz)' },
  Hail: { o: 'SAU', label: 'Ha\'il (Jabal Shammar — Shamal Najd)' },
  'Ha\'il': { o: 'SAU', label: 'Ha\'il (Jabal Shammar — Shamal Najd)' },
  'Jabal Shammar': { o: 'SAU', label: 'Ha\'il wa Jabal Shammar (Shamal Najd)' },
  "Emirate of Bin Shal'an": { o: 'SAU', label: 'Imarat Al Sha\'lan (Wadi Sirhan)' },
  "Bin Shal'an": { o: 'SAU', label: 'Imarat Al Sha\'lan (Wadi Sirhan)' },
  "Bin Shalan": { o: 'SAU', label: 'Imarat Al Sha\'lan (Wadi Sirhan)' },
  'Al-Jawf': { o: 'SAU', label: 'Al-Jawf wa Sakaka (Wadi Sirhan)' },
  'Al Jawf': { o: 'SAU', label: 'Al-Jawf wa Sakaka (Wadi Sirhan)' },
  Jauf: { o: 'SAU', label: 'Al-Jawf wa Sakaka (Wadi Sirhan)' },
  Sakaka: { o: 'SAU', label: 'Sakaka (Al-Jawf)' },
  Tabuk: { o: 'SAU', label: 'Tabuk (Shamal al-Hijaz)' },
  Qassim: { o: 'SAU', label: 'Al-Qasim (Buraidah wa Unaizah)' },
  'Al-Qassim': { o: 'SAU', label: 'Al-Qasim (Buraidah wa Unaizah)' },
  Buraidah: { o: 'SAU', label: 'Buraidah (Al-Qasim)' },
  Unaizah: { o: 'SAU', label: 'Unaizah (Al-Qasim)' },
  Jizan: { o: 'SAU', label: 'Jizan (Mintaqat Jizan wa Tihamah)' },
  Jazan: { o: 'SAU', label: 'Jazan (Mintaqat Jizan wa Tihamah)' },
  Najran: { o: 'SAU', label: 'Najran (Al-Mamlakah as-Su‘ūdiyyah)' },
  'Al Bahah': { o: 'SAU', label: 'Al-Bahah (Jibal as-Sarawat — Al-Hijaz)' },
  'Northern Borders': { o: 'SAU', label: 'Al-Hudud ash-Shamaliyyah (Al-Mamlakah as-Su‘ūdiyyah)' },
  'Al Hudud ash Shamaliyah': { o: 'SAU', label: 'Al-Hudud ash-Shamaliyyah (Al-Mamlakah as-Su‘ūdiyyah)' },
  'Saudi Arabia (Northern Borders - Al-Jawf)': { o: 'SAU', label: 'Shamal al-Mamlakah (Al-Jawf wa al-Hudud ash-Shamaliyyah)' },
  'Saudi Arabia (Northern Borders)': { o: 'SAU', label: 'Shamal al-Mamlakah (Al-Hudud ash-Shamaliyyah)' },
  'Rub al Khali': { o: 'SAU', label: 'Ar-Rub‘ al-Khali' },
  'Rub\' al Khali': { o: 'SAU', label: 'Ar-Rub‘ al-Khali' },
  'Saudi - Iraqi Neutral Zone': { o: 'SAU', label: 'Al-Mintaqah al-Muhayadah (Su‘ūdiyyah - ‘Iraqiyyah)' },
  'Neutral Zone (Saudi-Iraq)': { o: 'SAU', label: 'Al-Mintaqah al-Muhayadah (Su‘ūdiyyah - ‘Iraqiyyah)' },
  'Saudi - Kuwaiti Neutral Zone': { o: 'SAU', label: 'Al-Mintaqah al-Muhayadah (Su‘ūdiyyah - Kuwaytiyyah)' },
  'Neutral Zone': { o: 'SAU', label: 'Al-Mintaqah al-Muhayadah (Uqair 1922)' },
  Turkey: { o: 'TUR', label: 'Türkiye Cumhuriyeti' },
  'Republic of Turkey': { o: 'TUR', label: 'Türkiye Cumhuriyeti' },
  Türkiye: { o: 'TUR', label: 'Türkiye Cumhuriyeti' },
  Turkiye: { o: 'TUR', label: 'Türkiye Cumhuriyeti' },
  Turchia: { o: 'TUR', label: 'Türkiye Cumhuriyeti' },
  Anatolia: { o: 'TUR', label: 'Türkiye Cumhuriyeti (Anadolu)' },
  Hatay: { o: 'TUR', label: 'Hatay Devleti / Hatay İli (Türkiye Cumhuriyeti)' },
  Iran: { o: 'IRN', label: 'Keshvar-e Shâhanshâhi-ye Irân' },
  Persia: { o: 'IRN', label: 'Keshvar-e Shâhanshâhi-ye Irân' },
  'Imperial State of Iran': { o: 'IRN', label: 'Keshvar-e Shâhanshâhi-ye Irân' },
  Kuwait: { o: 'UK', label: 'State of Kuwait (British Protected State)' },
  Bahrain: { o: 'UK', label: 'State of Bahrain (British Protected State)' },
  Qatar: { o: 'UK', label: 'State of Qatar (British Protected State)' },
  'Trucial States': { o: 'UK', label: 'Trucial States (British Protected States)' },
  Oman: { o: 'UK', label: 'Sultanate of Muscat and Oman (British Protected State)' },
  Yemen: { o: 'YEM', label: 'Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah' },
  Afghanistan: { o: 'AFG', label: 'Da Afghānistān Shāhī Dawlat' },
  Nepal: { o: 'NEP', label: 'Nepal Adhirajya (Shah Rajbansh)' },
  'Kingdom of Nepal': { o: 'NEP', label: 'Nepal Adhirajya' },
  Bhutan: { o: 'BHU', label: 'Druk Yul (Wangchuck Dynasty)' },
  'Kingdom of Bhutan': { o: 'BHU', label: 'Druk Yul' },
  Mongolia: { o: 'MON', label: 'Bügd Nairamdakh Mongol Ard Uls' },
  'Tannu Tuva': { o: 'TUV', label: 'Tyva Arat Respublika' },
  Tuva: { o: 'TUV', label: 'Tyva Arat Respublika' },
  Xinjiang: { o: 'CHI', label: 'Xinjiang Sheng (Sheng Shicai Gov.)' },
  Canada: { o: 'CAN', label: 'Dominion of Canada' },
  Australia: { o: 'AST', label: 'Commonwealth of Australia' },
  'New Zealand': { o: 'NZL', label: 'Dominion of New Zealand' },
  'Union of South Africa': { o: 'SAF', label: 'Union of South Africa / Unie van Suid-Afrika' },
  'South Africa': { o: 'SAF', label: 'Union of South Africa / Unie van Suid-Afrika' },
  'South West Africa': { o: 'SAF', label: 'South West Africa / Suidwes-Afrika (Mandate)' },
  'Dominion of Newfoundland': { o: 'UK', label: 'Dominion of Newfoundland' },
  India: { o: 'RAJ', label: 'British Raj (Empire of India)' },
  'British India': { o: 'RAJ', label: 'British Raj (Empire of India)' },
  'British Raj': { o: 'RAJ', label: 'British Raj (Empire of India)' },
  Burma: { o: 'UK', label: 'British Burma' },
  Ceylon: { o: 'UK', label: 'Ceylon (Crown Colony)' },
  'British Malaya': { o: 'UK', label: 'British Malaya' },
  Malaya: { o: 'UK', label: 'British Malaya' },
  'Straits Settlements': { o: 'UK', label: 'Straits Settlements (Singapore/Penang/Malacca)' },
  'Federated Malay States': { o: 'UK', label: 'Federated Malay States' },
  Singapore: { o: 'UK', label: 'Singapore (Crown Colony)' },
  'Hong Kong': { o: 'UK', label: 'Crown Colony of Hong Kong' },
  'North Borneo': { o: 'UK', label: 'British North Borneo' },
  'British North Borneo': { o: 'UK', label: 'British North Borneo' },
  Sarawak: { o: 'UK', label: 'Kingdom of Sarawak (British Protected State)' },
  Brunei: { o: 'UK', label: 'State of Brunei (British Protected State)' },
  Papua: { o: 'AST', label: 'Territory of Papua (Australia)' },
  'Territory of New Guinea': { o: 'AST', label: 'Territory of New Guinea (Australian Mandate)' },
  'New Guinea': { o: 'AST', label: 'Territory of New Guinea (Australia)' },
  Fiji: { o: 'UK', label: 'Colony of Fiji' },
  'Solomon Islands': { o: 'UK', label: 'British Solomon Islands Protectorate' },
  'British Solomon Islands': { o: 'UK', label: 'British Solomon Islands Protectorate' },
  'New Hebrides': { o: 'F_COL', label: 'Nouvelles-Hébrides (Condominium franco-britannique)' },
  Cyprus: { o: 'UK', label: 'Crown Colony of Cyprus' },
  Malta: { o: 'UK', label: 'Crown Colony of Malta' },
  Gibraltar: { o: 'UK', label: 'Gibraltar (Crown Colony)' },
  Palestine: { o: 'UK', label: 'British Mandate for Palestine' },
  'Mandatory Palestine': { o: 'UK', label: 'British Mandate for Palestine' },
  Transjordan: { o: 'UK', label: 'Emirate of Transjordan' },
  Mesopotamia: { o: 'UK', label: 'Kingdom of Iraq (British Mandate / Mesopotamia)' },
  'British Mesopotamia': { o: 'UK', label: 'Kingdom of Iraq (British Mandate / Mesopotamia)' },
  'Mandate of Mesopotamia': { o: 'UK', label: 'Kingdom of Iraq (British Mandate / Mesopotamia)' },
  'Mandatory Mesopotamia': { o: 'UK', label: 'Kingdom of Iraq (British Mandate / Mesopotamia)' },
  'Mesopotamia (UK)': { o: 'UK', label: 'Kingdom of Iraq (British Mandate / Mesopotamia)' },
  'Mesopotamia (British)': { o: 'UK', label: 'Kingdom of Iraq (British Mandate / Mesopotamia)' },
  'Mesopotamia (GB)': { o: 'UK', label: 'Kingdom of Iraq (British Mandate / Mesopotamia)' },
  Iraq: { o: 'UK', label: 'Kingdom of Iraq (Mesopotamia)' },
  Irak: { o: 'UK', label: 'Kingdom of Iraq (Mesopotamia)' },
  'Kingdom of Iraq': { o: 'UK', label: 'Kingdom of Iraq (Mesopotamia)' },
  'Hashemite Kingdom of Iraq': { o: 'UK', label: 'Kingdom of Iraq (Mesopotamia)' },
  'British Iraq': { o: 'UK', label: 'Kingdom of Iraq (British Sphere)' },
  'Iraq (UK)': { o: 'UK', label: 'Kingdom of Iraq (British Sphere)' },
  'Iraq (British)': { o: 'UK', label: 'Kingdom of Iraq (British Sphere)' },
  Egypt: { o: 'UK', label: 'Kingdom of Egypt (British Sphere of Influence)' },
  'Anglo-Egyptian Sudan': { o: 'UK', label: 'Anglo-Egyptian Sudan' },
  Sudan: { o: 'UK', label: 'Anglo-Egyptian Sudan' },
  Kenya: { o: 'UK', label: 'Kenya Colony and Protectorate' },
  Uganda: { o: 'UK', label: 'Uganda Protectorate' },
  Tanganyika: { o: 'UK', label: 'Tanganyika Territory (Mandate)' },
  Nyasaland: { o: 'UK', label: 'Nyasaland Protectorate' },
  'Northern Rhodesia': { o: 'UK', label: 'Northern Rhodesia' },
  'Southern Rhodesia': { o: 'UK', label: 'Southern Rhodesia' },
  Rhodesia: { o: 'UK', label: 'Rhodesia (Northern & Southern)' },
  Bechuanaland: { o: 'UK', label: 'Bechuanaland Protectorate' },
  Basutoland: { o: 'UK', label: 'Basutoland' },
  Swaziland: { o: 'UK', label: 'Swaziland' },
  Nigeria: { o: 'UK', label: 'Colony and Protectorate of Nigeria' },
  'Gold Coast': { o: 'UK', label: 'Gold Coast (Crown Colony)' },
  'Sierra Leone': { o: 'UK', label: 'Sierra Leone Colony and Protectorate' },
  Gambia: { o: 'UK', label: 'Gambia Colony and Protectorate' },
  'British Somaliland': { o: 'UK', label: 'British Somaliland' },
  Zanzibar: { o: 'UK', label: 'Sultanate of Zanzibar (British Protectorate)' },
  Mauritius: { o: 'UK', label: 'Mauritius (Crown Colony)' },
  Seychelles: { o: 'UK', label: 'Seychelles (Crown Colony)' },
  'British Guiana': { o: 'UK', label: 'British Guiana' },
  Guyana: { o: 'UK', label: 'British Guiana' },
  'British Honduras': { o: 'UK', label: 'British Honduras (Belize)' },
  Belize: { o: 'UK', label: 'British Honduras (Belize)' },
  Jamaica: { o: 'UK', label: 'Jamaica (Crown Colony)' },
  'Trinidad and Tobago': { o: 'UK', label: 'Trinidad and Tobago (Crown Colony)' },
  Trinidad: { o: 'UK', label: 'Trinidad (Crown Colony)' },
  Tobago: { o: 'UK', label: 'Tobago (Crown Colony)' },
  'Antigua and Barbuda': { o: 'UK', label: 'Antigua and Barbuda (Leeward Islands)' },
  'Antigua & Barbuda': { o: 'UK', label: 'Antigua and Barbuda (Leeward Islands)' },
  Antigua: { o: 'UK', label: 'Antigua (Leeward Islands)' },
  Barbuda: { o: 'UK', label: 'Barbuda (Leeward Islands)' },
  Barbados: { o: 'UK', label: 'Barbados (Crown Colony)' },
  Dominica: { o: 'UK', label: 'Dominica (Crown Colony)' },
  Grenada: { o: 'UK', label: 'Grenada (Crown Colony)' },
  Montserrat: { o: 'UK', label: 'Montserrat (Crown Colony)' },
  Anguilla: { o: 'UK', label: 'Anguilla (Crown Colony)' },
  'Saint Kitts and Nevis': { o: 'UK', label: 'Saint Christopher and Nevis (Crown Colony)' },
  'Saint Christopher and Nevis': { o: 'UK', label: 'Saint Christopher and Nevis (Crown Colony)' },
  'St. Kitts and Nevis': { o: 'UK', label: 'Saint Christopher and Nevis (Crown Colony)' },
  'St Kitts and Nevis': { o: 'UK', label: 'Saint Christopher and Nevis (Crown Colony)' },
  'Saint Kitts': { o: 'UK', label: 'Saint Kitts (Crown Colony)' },
  Nevis: { o: 'UK', label: 'Nevis (Crown Colony)' },
  'Saint Lucia': { o: 'UK', label: 'Saint Lucia (Crown Colony)' },
  'St. Lucia': { o: 'UK', label: 'Saint Lucia (Crown Colony)' },
  'St Lucia': { o: 'UK', label: 'Saint Lucia (Crown Colony)' },
  'Saint Vincent and the Grenadines': { o: 'UK', label: 'Saint Vincent and the Grenadines (Crown Colony)' },
  'Saint Vincent': { o: 'UK', label: 'Saint Vincent (Crown Colony)' },
  'St. Vincent and the Grenadines': { o: 'UK', label: 'Saint Vincent and the Grenadines (Crown Colony)' },
  'St Vincent and the Grenadines': { o: 'UK', label: 'Saint Vincent and the Grenadines (Crown Colony)' },
  'United States Virgin Islands': { o: 'USA', label: 'Virgin Islands of the United States' },
  'U.S. Virgin Islands': { o: 'USA', label: 'Virgin Islands of the United States' },
  'US Virgin Islands': { o: 'USA', label: 'Virgin Islands of the United States' },
  'Virgin Islands (U.S.)': { o: 'USA', label: 'Virgin Islands of the United States' },
  'Virgin Islands, U.S.': { o: 'USA', label: 'Virgin Islands of the United States' },
  'British Virgin Islands': { o: 'UK', label: 'British Virgin Islands' },
  'Virgin Islands (U.K.)': { o: 'UK', label: 'British Virgin Islands' },
  'Virgin Islands (UK)': { o: 'UK', label: 'British Virgin Islands' },
  'Netherlands Antilles': { o: 'HOL', label: 'Gebiedsdeel Curaçao (Nederlandse Antillen)' },
  'Dutch Caribbean': { o: 'HOL', label: 'Gebiedsdeel Curaçao' },
  'Saint Martin': { o: 'F_COL', label: 'Saint-Martin (Guadeloupe, France)' },
  'Saint-Martin': { o: 'F_COL', label: 'Saint-Martin (Guadeloupe, France)' },
  'St. Martin': { o: 'F_COL', label: 'Saint-Martin (Guadeloupe, France)' },
  'Saint Barthelemy': { o: 'F_COL', label: 'Saint-Barthélemy (Guadeloupe, France)' },
  'Saint-Barthelemy': { o: 'F_COL', label: 'Saint-Barthélemy (Guadeloupe, France)' },
  'Saint-Barthélemy': { o: 'F_COL', label: 'Saint-Barthélemy (Guadeloupe, France)' },
  'Saint Barthélemy': { o: 'F_COL', label: 'Saint-Barthélemy (Guadeloupe, France)' },
  'St. Barthelemy': { o: 'F_COL', label: 'Saint-Barthélemy (Guadeloupe, France)' },
  'St. Barthélemy': { o: 'F_COL', label: 'Saint-Barthélemy (Guadeloupe, France)' },
  'Turks and Caicos Islands': { o: 'UK', label: 'Turks and Caicos Islands (Crown Colony)' },
  'Turks and Caicos': { o: 'UK', label: 'Turks and Caicos Islands (Crown Colony)' },
  'Cayman Islands': { o: 'UK', label: 'Cayman Islands (Crown Colony)' },
  Cayman: { o: 'UK', label: 'Cayman Islands (Crown Colony)' },
  Bahamas: { o: 'UK', label: 'Bahamas (Crown Colony)' },
  Bermuda: { o: 'UK', label: 'Bermuda (Crown Colony)' },
  'Falkland Islands': { o: 'UK', label: 'Falkland Islands and Dependencies' },
  'Isle of Man': { o: 'UK', label: 'Crown Dependency of the Isle of Man' },
  'Isle of Mann': { o: 'UK', label: 'Crown Dependency of the Isle of Man' },
  'Isle of man': { o: 'UK', label: 'Crown Dependency of the Isle of Man' },
  Man: { o: 'UK', label: 'Crown Dependency of the Isle of Man' },
  Mann: { o: 'UK', label: 'Crown Dependency of the Isle of Man' },
  'Isola di Man': { o: 'UK', label: 'Crown Dependency of the Isle of Man' },
  Jersey: { o: 'UK', label: 'Bailiwick of Jersey (Crown Dependency)' },
  Guernsey: { o: 'UK', label: 'Bailiwick of Guernsey (Crown Dependency)' },
  'Channel Islands': { o: 'UK', label: 'Channel Islands (Crown Dependencies)' },
  'Belgian Congo': { o: 'BEL', label: 'Congo belge (Léopoldville)' },
  'Congo (Belgium)': { o: 'BEL', label: 'Congo belge' },
  'Democratic Republic of the Congo': { o: 'BEL', label: 'Congo belge (Léopoldville)' },
  'DR Congo': { o: 'BEL', label: 'Congo belge (Léopoldville)' },
  'Congo (Kinshasa)': { o: 'BEL', label: 'Congo belge (Léopoldville)' },
  'Congo Belge': { o: 'BEL', label: 'Congo belge (Léopoldville)' },
  'Ruanda-Urundi': { o: 'BEL', label: 'Ruanda-Urundi (Mandat belge)' },
  Rwanda: { o: 'BEL', label: 'Ruanda (Mandat belge)' },
  Burundi: { o: 'BEL', label: 'Urundi (Mandat belge)' },
  Ruanda: { o: 'BEL', label: 'Ruanda (Mandat belge)' },
  Urundi: { o: 'BEL', label: 'Urundi (Mandat belge)' },
  Angola: { o: 'POR', label: 'África Ocidental Portuguesa (Angola)' },
  Mozambique: { o: 'POR', label: 'África Oriental Portuguesa (Moçambique)' },
  'Portuguese Guinea': { o: 'POR', label: 'Guiné Portuguesa (Bissau)' },
  'Guinea-Bissau': { o: 'POR', label: 'Guiné Portuguesa (Bissau)' },
  'Guinea Bissau': { o: 'POR', label: 'Guiné Portuguesa (Bissau)' },
  'Guine-Bissau': { o: 'POR', label: 'Guiné Portuguesa (Bissau)' },
  'Guine Bissau': { o: 'POR', label: 'Guiné Portuguesa (Bissau)' },
  'Guiné-Bissau': { o: 'POR', label: 'Guiné Portuguesa (Bissau)' },
  'Guiné Bissau': { o: 'POR', label: 'Guiné Portuguesa (Bissau)' },
  'Guiné Portuguesa': { o: 'POR', label: 'Guiné Portuguesa (Bissau)' },
  'Guinea (Portugal)': { o: 'POR', label: 'Guiné Portuguesa (Bissau)' },
  'Cape Verde': { o: 'POR', label: 'Província de Cabo Verde' },
  'Cabo Verde': { o: 'POR', label: 'Província de Cabo Verde' },
  'Sao Tome and Principe': { o: 'POR', label: 'São Tomé e Príncipe' },
  'São Tomé and Príncipe': { o: 'POR', label: 'São Tomé e Príncipe' },
  'Portuguese Timor': { o: 'POR', label: 'Timor Português (Díli)' },
  Macau: { o: 'POR', label: 'Macau Português' },
  Macao: { o: 'POR', label: 'Macau Português' },
  Goa: { o: 'POR', label: 'Estado da Índia (Goa)' },
  'Portuguese India': { o: 'POR', label: 'Estado da Índia Portuguesa' },
  'Dutch Guiana': { o: 'HOL', label: 'Suriname (Nederlands-Guyana)' },
  Surinam: { o: 'HOL', label: 'Suriname (Nederlands-Guyana)' },
  Suriname: { o: 'HOL', label: 'Suriname (Nederlands-Guyana)' },
  'Netherlands East Indies': { o: 'HOL', label: 'Nederlands-Indië (Batavia)' },
  'Dutch East Indies': { o: 'HOL', label: 'Nederlands-Indië (Batavia)' },
  'Dutch East-Indies': { o: 'HOL', label: 'Nederlands-Indië (Batavia)' },
  Indonesia: { o: 'HOL', label: 'Nederlands-Indië (Batavia)' },
  Curacao: { o: 'HOL', label: 'Curaçao (Gebiedsdeel Curaçao)' },
  Curaçao: { o: 'HOL', label: 'Curaçao (Gebiedsdeel Curaçao)' },
  Aruba: { o: 'HOL', label: 'Aruba (Gebiedsdeel Curaçao)' },
  'Spanish Morocco': { o: 'SPA', label: 'Protectorado español de Marruecos' },
  'Spanish Sahara': { o: 'SPA', label: 'Sahara Español (Río de Oro)' },
  'Rio de Oro': { o: 'SPA', label: 'Sahara Español (Río de Oro)' },
  'Western Sahara': { o: 'SPA', label: 'Sahara Español (Río de Oro)' },
  'Sahara Español': { o: 'SPA', label: 'Sahara Español (Río de Oro)' },
  'Spanish Guinea': { o: 'SPA', label: 'Guinea Española' },
  'Equatorial Guinea': { o: 'SPA', label: 'Guinea Española' },
  'Guinea Española': { o: 'SPA', label: 'Guinea Española' },
  'Guinea Ecuatorial': { o: 'SPA', label: 'Guinea Española' },
  Ifni: { o: 'SPA', label: 'Territorio de Ifni' },
  'Canary Islands': { o: 'SPA', label: 'Islas Canarias' },
  'Fernando Po': { o: 'SPA', label: 'Fernando Poo (Guinea Española)' },
  'Rio Muni': { o: 'SPA', label: 'Río Muni (Guinea Española)' },
  Libya: { o: 'ITA', label: 'Libia Italiana (Quarta Sponda)' },
  'Italian Libya': { o: 'ITA', label: 'Libia Italiana' },
  Tripolitania: { o: 'ITA', label: 'Tripolitania Italiana' },
  Cyrenaica: { o: 'ITA', label: 'Cirenaica Italiana' },
  Fezzan: { o: 'ITA', label: 'Fezzan Italiano' },
  Eritrea: { o: 'ITA', label: 'Colonia Eritrea (AOI)' },
  'Italian Eritrea': { o: 'ITA', label: 'Colonia Eritrea (AOI)' },
  'Italian Somaliland': { o: 'ITA', label: 'Governo della Somalia (AOI)' },
  'Italian East Africa': { o: 'ITA', label: 'Africa Orientale Italiana (AOI)' },
  Ethiopia: { o: 'ETH', label: 'Ye’Ityōṗṗyā Nigūsa Negest Mengist (Abyssinia)' },
  Abyssinia: { o: 'ETH', label: 'Ye’Ityōṗṗyā Nigūsa Negest Mengist (Abyssinia)' },
  Dodecanese: { o: 'ITA', label: 'Rodi (Isole Italiane dell\'Egeo)' },
  Rhodes: { o: 'ITA', label: 'Rodi (Isole Italiane dell\'Egeo)' },
  'Algeria (France)': { o: 'F_NAF', label: 'Départements français d\'Algérie' },
  Algeria: { o: 'F_NAF', label: 'Départements français d\'Algérie' },
  'Morocco (France)': { o: 'F_NAF', label: 'Protectorat français au Maroc' },
  Morocco: { o: 'F_NAF', label: 'Protectorat français au Maroc' },
  Tunisia: { o: 'F_NAF', label: 'Protectorat français de Tunisie' },
  'French West Africa': { o: 'F_AOF', label: 'Afrique-Occidentale française (AOF)' },
  Mauritania: { o: 'F_AOF', label: 'AOF (Mauritanie)' },
  Senegal: { o: 'F_AOF', label: 'AOF (Sénégal)' },
  'French Sudan': { o: 'F_AOF', label: 'AOF (Soudan français)' },
  Mali: { o: 'F_AOF', label: 'AOF (Soudan français)' },
  'French Guinea': { o: 'F_AOF', label: 'AOF (Guinée française)' },
  Guinea: { o: 'F_AOF', label: 'AOF (Guinée française)' },
  'Ivory Coast': { o: 'F_AOF', label: 'AOF (Côte d\'Ivoire)' },
  'Côte d\'Ivoire': { o: 'F_AOF', label: 'AOF (Côte d\'Ivoire)' },
  'Cote d\'Ivoire': { o: 'F_AOF', label: 'AOF (Côte d\'Ivoire)' },
  'Upper Volta': { o: 'F_AOF', label: 'AOF (Haute-Volta)' },
  'Burkina Faso': { o: 'F_AOF', label: 'AOF (Haute-Volta)' },
  Niger: { o: 'F_AOF', label: 'AOF (Niger)' },
  Dahomey: { o: 'F_AOF', label: 'AOF (Dahomey)' },
  Benin: { o: 'F_AOF', label: 'AOF (Dahomey)' },
  'French Togoland': { o: 'F_AOF', label: 'Togo français' },
  Togo: { o: 'F_AOF', label: 'Togo français' },
  Togoland: { o: 'F_AOF', label: 'Togo français' },
  'Togo (France)': { o: 'F_AOF', label: 'Togo français' },
  'French Equatorial Africa': { o: 'F_AEF', label: 'Afrique-Équatoriale française (AEF)' },
  Chad: { o: 'F_AEF', label: 'AEF (Tchad)' },
  Tchad: { o: 'F_AEF', label: 'AEF (Tchad)' },
  'Ubangi-Shari': { o: 'F_AEF', label: 'AEF (Oubangui-Chari)' },
  'Oubangui-Chari': { o: 'F_AEF', label: 'AEF (Oubangui-Chari)' },
  'Central African Republic': { o: 'F_AEF', label: 'AEF (Oubangui-Chari)' },
  'Middle Congo': { o: 'F_AEF', label: 'AEF (Moyen-Congo)' },
  'Moyen-Congo': { o: 'F_AEF', label: 'AEF (Moyen-Congo)' },
  'Republic of the Congo': { o: 'F_AEF', label: 'AEF (Moyen-Congo)' },
  'Congo (Brazzaville)': { o: 'F_AEF', label: 'AEF (Moyen-Congo)' },
  Gabon: { o: 'F_AEF', label: 'AEF (Gabon)' },
  'French Cameroons': { o: 'F_AEF', label: 'Cameroun français (Mandat SDN)' },
  Cameroon: { o: 'F_AEF', label: 'Cameroun français (Mandat SDN)' },
  Cameroun: { o: 'F_AEF', label: 'Cameroun français (Mandat SDN)' },
  'French Indo-China': { o: 'F_IND', label: 'Indochine française' },
  'French Indochina': { o: 'F_IND', label: 'Indochine française' },
  Indochina: { o: 'F_IND', label: 'Indochine française' },
  Vietnam: { o: 'F_IND', label: 'Indochine française (Tonkin/Annam/Cochinchine)' },
  Tonkin: { o: 'F_IND', label: 'Protectorat du Tonkin' },
  Annam: { o: 'F_IND', label: 'Protectorat d\'Annam' },
  'Cochin China': { o: 'F_IND', label: 'Colonie de Cochinchine' },
  Cambodia: { o: 'F_IND', label: 'Protectorat du Cambodge' },
  Laos: { o: 'F_IND', label: 'Protectorat du Laos' },
  'Kwangchowan': { o: 'F_IND', label: 'Territoire de Kouang-Tchéou-Wan' },
  'Madagascar (France)': { o: 'F_MAD', label: 'Madagascar et dépendances' },
  Madagascar: { o: 'F_MAD', label: 'Madagascar et dépendances' },
  Comoros: { o: 'F_MAD', label: 'Archipel des Comores (France)' },
  Reunion: { o: 'F_MAD', label: 'La Réunion (France)' },
  'Syria (France)': { o: 'F_SYR', label: 'Mandat français en Syrie' },
  Syria: { o: 'F_SYR', label: 'Mandat français en Syrie' },
  Lebanon: { o: 'F_SYR', label: 'Grand Liban (Mandat français)' },
  'French Guiana': { o: 'F_COL', label: 'Guyane française (Cayenne)' },
  'French Somaliland': { o: 'F_COL', label: 'Côte française des Somalis (Djibouti)' },
  Djibouti: { o: 'F_COL', label: 'Côte française des Somalis (Djibouti)' },
  'New Caledonia': { o: 'F_COL', label: 'Nouvelle-Calédonie (France)' },
  'French Polynesia': { o: 'F_COL', label: 'Établissements français de l\'Océanie' },
  Guadeloupe: { o: 'F_COL', label: 'Guadeloupe (France)' },
  Martinique: { o: 'F_COL', label: 'Martinique (France)' },
  'Saint Pierre and Miquelon': { o: 'F_COL', label: 'Saint-Pierre-et-Miquelon (France)' },
  'French India': { o: 'F_COL', label: 'Établissements français dans l\'Inde (Pondichéry)' },
  Malawi: { o: 'UK', label: 'Nyasaland Protectorate' },
  'Malawi (UK)': { o: 'UK', label: 'Nyasaland Protectorate' },
  'Nyasaland (UK)': { o: 'UK', label: 'Nyasaland Protectorate' },
  'Nyasaland Protectorate': { o: 'UK', label: 'Nyasaland Protectorate' },
  Zambia: { o: 'UK', label: 'Northern Rhodesia' },
  Zimbabwe: { o: 'UK', label: 'Southern Rhodesia' },
  Botswana: { o: 'UK', label: 'Bechuanaland Protectorate' },
  Lesotho: { o: 'UK', label: 'Basutoland' },
  Eswatini: { o: 'UK', label: 'Swaziland' },
  Namibia: { o: 'SAF', label: 'South West Africa / Suidwes-Afrika' },
  Ghana: { o: 'UK', label: 'Gold Coast (Crown Colony)' },
  Tanzania: { o: 'UK', label: 'Tanganyika Territory (Mandate)' },
  Yugoslavia: { o: 'YUG', label: 'Kraljevina Jugoslavija' },
  'Kingdom of Yugoslavia': { o: 'YUG', label: 'Kraljevina Jugoslavija' },
  'Bosnia and Herzegovina': { o: 'YUG', label: 'Kraljevina Jugoslavija (Drinska i Vrbaska banovina)' },
  'Bosnia & Herzegovina': { o: 'YUG', label: 'Kraljevina Jugoslavija (Drinska i Vrbaska banovina)' },
  'Federacija Bosne i Hercegovine': { o: 'YUG', label: 'Kraljevina Jugoslavija (Sarajevo i Mostar)' },
  'Republika Srpska': { o: 'YUG', label: 'Kraljevina Jugoslavija (Banja Luka i Trebinje)' },
  'Brčko distrikt': { o: 'YUG', label: 'Kraljevina Jugoslavija (Srez Brčko)' },
  Bosnia: { o: 'YUG', label: 'Kraljevina Jugoslavija (Bosna)' },
  Herzegovina: { o: 'YUG', label: 'Kraljevina Jugoslavija (Hercegovina)' },
  Kosovo: { o: 'YUG', label: 'Kraljevina Jugoslavija (Kosovo i Metohija)' },
  'Kosovo and Metohija': { o: 'YUG', label: 'Kraljevina Jugoslavija (Kosovo i Metohija)' },
  Serbia: { o: 'YUG', label: 'Kraljevina Jugoslavija (Moravska i Dunavska banovina)' },
  Montenegro: { o: 'YUG', label: 'Kraljevina Jugoslavija (Zetska banovina)' },
  Croatia: { o: 'YUG', label: 'Kraljevina Jugoslavija (Savska i Primorska banovina)' },
  Slovenia: { o: 'YUG', label: 'Kraljevina Jugoslavija (Dravska banovina)' },
  Macedonia: { o: 'YUG', label: 'Kraljevina Jugoslavija (Vardarska banovina)' },
  'North Macedonia': { o: 'YUG', label: 'Kraljevina Jugoslavija (Vardarska banovina)' },
  Vojvodina: { o: 'YUG', label: 'Kraljevina Jugoslavija (Dunavska banovina)' },
  Dalmatia: { o: 'YUG', label: 'Kraljevina Jugoslavija (Primorska banovina)' },
  Slavonia: { o: 'YUG', label: 'Kraljevina Jugoslavija (Savska banovina)' },
  Sandzak: { o: 'YUG', label: 'Kraljevina Jugoslavija (Sandžak)' },
  Jordan: { o: 'UK', label: 'Emirate of Transjordan (British Mandate)' },
  'Tonga': { o: 'UK', label: 'Kingdom of Tonga (British Protected State)' },
  'Niue': { o: 'NZL', label: 'Niue (Dominion of New Zealand)' },
  'Wallis and Futuna Islands': { o: 'F_COL', label: 'Wallis-et-Futuna (France)' },
  'Wallis and Futuna': { o: 'F_COL', label: 'Wallis-et-Futuna (France)' },
  'Samoa': { o: 'NZL', label: 'Western Samoa (New Zealand Mandate)' },
  'Western Samoa': { o: 'NZL', label: 'Western Samoa (New Zealand Mandate)' },
  'Rapa Nui': { o: 'CHL', label: 'Rapa Nui / Isla de Pascua (República de Chile)' },
  'Easter Island': { o: 'CHL', label: 'Isla de Pascua (República de Chile)' },
  'Gilbert and Elice Islands': { o: 'UK', label: 'Gilbert and Ellice Islands Colony' },
  'Gilbert and Ellice Islands': { o: 'UK', label: 'Gilbert and Ellice Islands Colony' },
  'Saipan': { o: 'JAP', label: "Nan'yō Guntō (Saipan)" },
  'Ethiopia (Italy)': { o: 'ETH', label: 'Ye’Ityōṗṗyā Nigūsa Negest Mengist (Abyssinia)' },
  'Eritrea (Italy)': { o: 'ITA', label: 'Colonia Eritrea (AOI)' },
};

export const HB_SUBJ: Record<string, { o: string }> = {
  India: { o: 'RAJ' },
  'British India': { o: 'RAJ' },
  'United Kingdom': { o: 'UK' },
  'United Kingdom of Great Britain and Ireland': { o: 'UK' },
  'Empire of Japan': { o: 'JAP' },
  Japan: { o: 'JAP' },
  'United States': { o: 'USA' },
  USA: { o: 'USA' },
  USSR: { o: 'SOV' },
  Italy: { o: 'ITA' },
  Germany: { o: 'GER' },
  Spain: { o: 'SPA' },
  Portugal: { o: 'POR' },
  Belgium: { o: 'BEL' },
  Netherlands: { o: 'HOL' },
  France: { o: 'FRA' },
  Denmark: { o: 'DEN' },
  Norway: { o: 'NOR' },
  Canada: { o: 'CAN' },
  Australia: { o: 'AST' },
  'New Zealand': { o: 'NZL' },
  'South Africa': { o: 'SAF' },
  Philippines: { o: 'PHL' },
  'Commonwealth of the Philippines': { o: 'PHL' },
  'Commonwealth delle Filippine': { o: 'PHL' },
  'Tannu Tuva': { o: 'TUV' },
  Tuva: { o: 'TUV' },
  'Tuvan People\'s Republic': { o: 'TUV' },
  'Repubblica Popolare di Tannu Tuva': { o: 'TUV' },
  Liberia: { o: 'LBR' },
  'Republic of Liberia': { o: 'LBR' },
  'Repubblica di Liberia': { o: 'LBR' },
  Chile: { o: 'CHL' },
  Yugoslavia: { o: 'YUG' },
  'Kingdom of Yugoslavia': { o: 'YUG' },
  Serbia: { o: 'YUG' },
  Croatia: { o: 'YUG' },
  Bosnia: { o: 'YUG' },
  Kosovo: { o: 'YUG' },
  Montenegro: { o: 'YUG' },
  'Isle of Man': { o: 'UK' },
  Man: { o: 'UK' },
  Mann: { o: 'UK' },
  Jersey: { o: 'UK' },
  Guernsey: { o: 'UK' },
  'Channel Islands': { o: 'UK' },
  Turkey: { o: 'TUR' },
  'Republic of Turkey': { o: 'TUR' },
  'Saudi Arabia': { o: 'SAU' },
  'Kingdom of Saudi Arabia': { o: 'SAU' },
  'Arabia Saudita': { o: 'SAU' },
  'Regno dell\'Arabia Saudita': { o: 'SAU' },
  Nejd: { o: 'SAU' },
  Najd: { o: 'SAU' },
  Hejaz: { o: 'SAU' },
  Hijaz: { o: 'SAU' },
  Asir: { o: 'SAU' },
  Hasa: { o: 'SAU' },
  'Al-Hasa': { o: 'SAU' },
  'Eastern Province': { o: 'SAU' },
  Riyadh: { o: 'SAU' },
  'Ar Riyad': { o: 'SAU' },
  Mecca: { o: 'SAU' },
  Makkah: { o: 'SAU' },
  Medina: { o: 'SAU' },
  Madinah: { o: 'SAU' },
  Jeddah: { o: 'SAU' },
  Hail: { o: 'SAU' },
  'Al-Jawf': { o: 'SAU' },
  Tabuk: { o: 'SAU' },
  Qassim: { o: 'SAU' },
  Jizan: { o: 'SAU' },
  Najran: { o: 'SAU' },
  'Rub al Khali': { o: 'SAU' },
  'Neutral Zone': { o: 'SAU' },
  Iran: { o: 'IRN' },
  Persia: { o: 'IRN' },
  Mesopotamia: { o: 'UK' },
  'British Mesopotamia': { o: 'UK' },
  'Mandate of Mesopotamia': { o: 'UK' },
  'Kingdom of Iraq': { o: 'UK' },
  'Hashemite Kingdom of Iraq': { o: 'UK' },
  Iraq: { o: 'UK' },
  Irak: { o: 'UK' },
  Jordan: { o: 'UK' },
  Transjordan: { o: 'UK' },
  Guatemala: { o: 'GTM' },
  Nepal: { o: 'NEP' },
  'Kingdom of Nepal': { o: 'NEP' },
  Bhutan: { o: 'BHU' },
  'Kingdom of Bhutan': { o: 'BHU' },
  'El Salvador': { o: 'SLV' },
  Salvador: { o: 'SLV' },
  Honduras: { o: 'HND' },
  Nicaragua: { o: 'NIC' },
  'Costa Rica': { o: 'CRI' },
  Panama: { o: 'PAN' },
  Panamá: { o: 'PAN' },
  'Panama Canal Zone': { o: 'USA' },
  'Canal Zone': { o: 'USA' },
  Cuba: { o: 'CUB' },
  'Dominican Republic': { o: 'DOM' },
  'República Dominicana': { o: 'DOM' },
  Haiti: { o: 'HAI' },
  Haïti: { o: 'HAI' },
  'British Honduras': { o: 'UK' },
  Belize: { o: 'UK' },
  Jamaica: { o: 'UK' },
  Bahamas: { o: 'UK' },
  Barbados: { o: 'UK' },
  'Trinidad and Tobago': { o: 'UK' },
  Trinidad: { o: 'UK' },
  Dominica: { o: 'UK' },
  'Antigua and Barbuda': { o: 'UK' },
  Grenada: { o: 'UK' },
  Montserrat: { o: 'UK' },
  Anguilla: { o: 'UK' },
  'Saint Kitts and Nevis': { o: 'UK' },
  'Saint Lucia': { o: 'UK' },
  'Saint Vincent and the Grenadines': { o: 'UK' },
  'United States Virgin Islands': { o: 'USA' },
  'Puerto Rico': { o: 'USA' },
  'Virgin Islands': { o: 'USA' },
  'U.S. Virgin Islands': { o: 'USA' },
  'Netherlands Antilles': { o: 'HOL' },
  Curaçao: { o: 'HOL' },
  Curacao: { o: 'HOL' },
  Aruba: { o: 'HOL' },
  Bonaire: { o: 'HOL' },
  'Saint Martin': { o: 'FRA' },
  'Saint Barthelemy': { o: 'FRA' },
  'Turks and Caicos Islands': { o: 'UK' },
  Guadeloupe: { o: 'FRA' },
  Martinique: { o: 'FRA' },
};

export function resolveHatay(step: number, rawName?: string): ResolvedTerritory {
  if (step === 0) {
    // Gennaio 1936: Sandjak d'Alexandrette sous mandat français en Syrie
    return makeResult(
      'F_SYR',
      'Sandjak d\'Alexandrette (Mandat français)',
      'Mandat de la Société des Nations pour la Syrie et le Liban'
    );
  }
  if (step === 1) {
    // Mars 1938: Régime autonome sous accords franco-turcs et SDN
    return makeResult(
      'F_SYR',
      'Sandjak d\'Alexandrette (Régime autonome franco-turc)',
      'Régime autonome sous supervision de la Société des Nations'
    );
  }
  if (step === 2 || step === 3) {
    // 2 septembre 1938: Hatay Devleti (Cumhurbaşkanı Tayfur Sökmen, Başbakan Abdurrahman Melek)
    return makeResult(
      'HAT',
      step === 2 ? 'Hatay Devleti (Bağımsız Cumhuriyet)' : 'Hatay Devleti (Gümrük Birliği ve Türk Lirası)',
      'Hatay Devleti (Cumhurbaşkanı Tayfur Sökmen — Antakya)',
      'Neutrale'
    );
  }
  // Da Step 4 (Aprile/Estate 1939) in poi: Türkiye Cumhuriyeti Hatay İli
  return makeResult(
    'TUR',
    'Hatay İli (Türkiye Cumhuriyeti)',
    'Hatay İli (23 Haziran 1939 Antlaşması ile Türkiye\'ye katılım)',
    'Neutrale'
  );
}

export function resolveChinaProvince(
  s: number,
  nid: string,
  p: any,
  rawName: string
): ResolvedTerritory {
  const histName = p.HISTORICAL_NAME || p.NUTS_NAME || rawName;
  const nrm = normStr(nid + ' ' + (histName || '') + ' ' + (rawName || ''));

  // Calcolo proprietario e fazione geopolitica storicamente accurata per step s (1936-1940)
  let owner = 'CHI';
  let faction: FactionType = 'Alleati';

  switch (nid) {
    // 1-3. Cina settentrionale (Beiping, Tianjin, Hebei)
    case 'CHN_BEIJING':
    case 'CHN_TIANJIN':
    case 'CHN_HEBEI':
      if (s === 0) {
        owner = 'CHI';
        faction = 'Alleati';
      } else {
        owner = 'WJ_CHI';
        faction = 'Fantoccio';
      }
      break;

    // 4. Shanxi (Yan Xishan / Battaglia di Taiyuan / 8ª Armata di Strada)
    case 'CHN_SHANXI':
      if (s === 0) {
        owner = 'CHI';
        faction = 'Alleati';
      } else if (s <= 5) {
        owner = 'JAP';
        faction = 'Asse';
      } else {
        owner = 'WJ_CHI';
        faction = 'Fantoccio';
      }
      break;

    // 5. Shandong (Han Fuju / Tai'erzhuang)
    case 'CHN_SHANDONG':
      if (s === 0) {
        owner = 'CHI';
        faction = 'Alleati';
      } else if (s === 1) {
        owner = 'JAP';
        faction = 'Asse';
      } else {
        owner = 'WJ_CHI';
        faction = 'Fantoccio';
      }
      break;

    // 6. Shanghai (Battaglia di Shanghai / Sihang)
    case 'CHN_SHANGHAI':
      if (s === 0) {
        owner = 'CHI';
        faction = 'Alleati';
      } else if (s <= 5) {
        owner = 'JAP';
        faction = 'Asse';
      } else {
        owner = 'WJ_CHI';
        faction = 'Fantoccio';
      }
      break;

    // 7. Jiangsu (Nanchino — Caduta a fine 1937, poi Weixin Zhengfu e Wang Jingwei)
    case 'CHN_JIANGSU':
      if (s === 0) {
        owner = 'CHI';
        faction = 'Alleati';
      } else {
        owner = 'WJ_CHI';
        faction = 'Fantoccio';
      }
      break;

    // 8. Anhui
    case 'CHN_ANHUI':
      if (s <= 1) {
        owner = 'CHI';
        faction = 'Alleati';
      } else {
        owner = 'WJ_CHI';
        faction = 'Fantoccio';
      }
      break;

    // 9. Henan (Inondazione del Fiume Giallo a Huayuankou nel giugno 1938)
    case 'CHN_HENAN':
      if (s <= 1) {
        owner = 'CHI';
        faction = 'Alleati';
      } else {
        owner = 'JAP';
        faction = 'Asse';
      }
      break;

    // 10. Hubei (Wuhan — Capitale provvisoria fino a ottobre 1938)
    case 'CHN_HUBEI':
      if (s <= 1) {
        owner = 'CHI';
        faction = 'Alleati';
      } else if (s <= 5) {
        owner = 'JAP';
        faction = 'Asse';
      } else {
        owner = 'WJ_CHI';
        faction = 'Fantoccio';
      }
      break;

    // 11. Guangdong (Canton — Caduta a ottobre 1938)
    case 'CHN_GUANGDONG':
      if (s <= 1) {
        owner = 'CHI';
        faction = 'Alleati';
      } else {
        owner = 'JAP';
        faction = 'Asse';
      }
      break;

    // 12. Hainan (Occupazione navale nipponica a inizio 1939)
    case 'CHN_HAINAN':
      if (s <= 2) {
        owner = 'CHI';
        faction = 'Alleati';
      } else {
        owner = 'JAP';
        faction = 'Asse';
      }
      break;

    // 13. Jiangxi (Nanchang — Battaglia di Nanchang primavera 1939)
    case 'CHN_JIANGXI':
      if (s <= 2) {
        owner = 'CHI';
        faction = 'Alleati';
      } else {
        owner = 'JAP';
        faction = 'Asse';
      }
      break;

    // 14. Hunan (Changsha — 9ª Zona di Guerra di Xue Yue, vittoriosa difesa)
    case 'CHN_HUNAN':
      owner = 'CHI';
      faction = 'Alleati';
      break;

    // 15. Zhejiang (Hangzhou / Ningbo)
    case 'CHN_ZHEJIANG':
      if (s <= 1) {
        owner = 'CHI';
        faction = 'Alleati';
      } else {
        owner = 'WJ_CHI';
        faction = 'Fantoccio';
      }
      break;

    // 16. Guangxi (Li Zongren / Bai Chongxi / Vittoria del Passo di Kunlun)
    case 'CHN_GUANGXI':
      owner = 'CHI';
      faction = 'Alleati';
      break;

    // 17. Fujian
    case 'CHN_FUJIAN':
      owner = 'CHI';
      faction = 'Alleati';
      break;

    // 18. Mengjiang / Mongolia Interna (Principe Demchugdongrub / Kalgan)
    case 'CHN_INNER_MONGOLIA':
      owner = 'MEJ';
      faction = 'Fantoccio';
      break;

    // 19. Manciukuò (Puyi / Kangde — Xinjing, Fengtian, Binjiang, Xingan, Rehe)
    case 'CHN_LIAONING':
    case 'CHN_JILIN':
    case 'CHN_HEILONGJIANG':
    case 'CHN_MANCHUKUO_XINGAN_NORTH':
    case 'CHN_MANCHUKUO_XINGAN_SOUTH':
      owner = 'MAN';
      faction = 'Fantoccio';
      break;

    // 20. Shaanxi (Shaan-Gan-Ning Bianqu / Yan'an / Mao Zedong / 8ª Armata di Strada)
    case 'CHN_SHAANXI':
      owner = 'CCP_CHI';
      faction = 'Comintern';
      break;

    // 21. Chongqing (Capitale di Guerra Péidū da fine 1938 / Chiang Kai-shek)
    case 'CHN_CHONGQING':
      owner = 'CHI';
      faction = 'Alleati';
      break;

    // 22-25. Province occidentali nazionaliste e signori della guerra lealisti (Sichuan, Guizhou, Yunnan, Ma Clique)
    case 'CHN_SICHUAN':
    case 'CHN_GUIZHOU':
    case 'CHN_YUNNAN':
    case 'CHN_GANSU':
    case 'CHN_NINGXIA':
    case 'CHN_QINGHAI':
      owner = 'CHI';
      faction = 'Alleati';
      break;

    // 26. Xinjiang (Sheng Shicai / Allineato con l'URSS)
    case 'CHN_XINJIANG':
      owner = 'XIN';
      faction = 'Comintern';
      break;

    // 27. Tibet (Kashag / 14° Dalai Lama / Reting Rinpoche)
    case 'CHN_TIBET':
      owner = 'TIB';
      faction = 'Neutrale';
      break;

    // 28. Taiwan (Taiwan Sōtokufu)
    case 'CHN_TAIWAN':
      owner = 'JAP';
      faction = 'Asse';
      break;

    // 29. Hong Kong (British Empire)
    case 'CHN_HONGKONG':
      owner = 'UK';
      faction = 'Alleati';
      break;

    // 30. Macau (Portogallo)
    case 'CHN_MACAU':
      owner = 'POR';
      faction = 'Neutrale';
      break;

    default:
      owner = 'CHI';
      faction = 'Alleati';
      break;
  }

  const top = resolveChinaToponym(nid, histName, nrm, owner, s);
  const name = top?.name || histName;
  const note = top?.note || (p.ADMIN_TITLE ? `${p.ADMIN_TITLE}` : undefined);
  const adminEntity = top?.adminTitle || p.ADMIN_TITLE || 'Zhōnghuá Mínguó';

  return makeResult(owner, name, note, faction, adminEntity);
}

export const METRO_FRAG: Record<string, (step: number) => ResolvedTerritory> = {
  Hatay: (s) => resolveHatay(s, 'Hatay'),
  'State of Hatay': (s) => resolveHatay(s, 'State of Hatay'),
  'Republic of Hatay': (s) => resolveHatay(s, 'Republic of Hatay'),
  'Stato di Hatay': (s) => resolveHatay(s, 'Stato di Hatay'),
  'Repubblica di Hatay': (s) => resolveHatay(s, 'Repubblica di Hatay'),
  Alexandretta: (s) => resolveHatay(s, 'Alexandretta'),
  'Sanjak of Alexandretta': (s) => resolveHatay(s, 'Sanjak of Alexandretta'),
  'Sangiaccato di Alessandretta': (s) => resolveHatay(s, 'Sangiaccato di Alessandretta'),
  Antakya: (s) => resolveHatay(s, 'Antakya'),
  Iskenderun: (s) => resolveHatay(s, 'Iskenderun'),
  'İskenderun': (s) => resolveHatay(s, 'İskenderun'),
  'United Kingdom': () => makeResult('UK', 'British Empire (Overseas Territories)'),
  France: (s) =>
    s < 6
      ? makeResult('FRA', 'France (Territoires d\'outre-mer)')
      : makeResult('VIC', 'État français (Territoires d\'outre-mer)'),
  'Spanish Morocco': (s) =>
    s === 0
      ? makeResult('SPR', 'Protectorado Español de Marruecos (Zona del Rif y Yebala / Tetuán)', 'Segunda República Española — Alta Comisaría')
      : makeResult('SPA', 'Protectorado Español de Marruecos (Zona del Rif y Yebala / Tetuán)', 'Bando Nacional — Ejército de África y Regulares'),
  'Spanish Morocco (Rif)': (s) =>
    s === 0
      ? makeResult('SPR', 'Protectorado Español de Marruecos (Zona del Rif y Yebala / Tetuán)', 'Segunda República Española — Alta Comisaría')
      : makeResult('SPA', 'Protectorado Español de Marruecos (Zona del Rif y Yebala / Tetuán)', 'Bando Nacional — Ejército de África y Regulares'),
  'Marruecos Español': (s) =>
    s === 0
      ? makeResult('SPR', 'Protectorado Español de Marruecos (Zona del Rif y Yebala / Tetuán)', 'Segunda República Española — Alta Comisaría')
      : makeResult('SPA', 'Protectorado Español de Marruecos (Zona del Rif y Yebala / Tetuán)', 'Bando Nacional — Ejército de África y Regulares'),
  Rif: (s) =>
    s === 0
      ? makeResult('SPR', 'Protectorado Español de Marruecos (Zona del Rif / Tetuán)', 'Segunda República Española — Alta Comisaría')
      : makeResult('SPA', 'Protectorado Español de Marruecos (Zona del Rif / Tetuán)', 'Bando Nacional — Ejército de África y Regulares'),
  'El Rif': (s) =>
    s === 0
      ? makeResult('SPR', 'Protectorado Español de Marruecos (Zona del Rif / Tetuán)', 'Segunda República Española — Alta Comisaría')
      : makeResult('SPA', 'Protectorado Español de Marruecos (Zona del Rif / Tetuán)', 'Bando Nacional — Ejército de África y Regulares'),
  Tetuán: (s) =>
    s === 0
      ? makeResult('SPR', 'Tetuán (Capital del Protectorado Español)', 'Segunda República Española')
      : makeResult('SPA', 'Tetuán (Alta Comisaría de España en Marruecos)', 'Bando Nacional / Estado Español'),
  Tetuan: (s) =>
    s === 0
      ? makeResult('SPR', 'Tetuán (Capital del Protectorado Español)', 'Segunda República Española')
      : makeResult('SPA', 'Tetuán (Alta Comisaría de España en Marruecos)', 'Bando Nacional / Estado Español'),
  Ceuta: (s) =>
    s === 0
      ? makeResult('SPR', 'Ceuta (Plaza de Soberanía)', 'Segunda República Española')
      : makeResult('SPA', 'Ceuta (Plaza de Soberanía)', 'Bando Nacional — Base del Ejército de África'),
  Melilla: (s) =>
    s === 0
      ? makeResult('SPR', 'Melilla (Plaza de Soberanía)', 'Segunda República Española')
      : makeResult('SPA', 'Melilla (Plaza de Soberanía)', 'Bando Nacional — Cuna del Alzamiento del 17 de julio de 1936'),
  Tangier: (s) =>
    s < 6
      ? makeResult('NEU', 'Zone Internationale de Tanger', 'Administration Internationale (Statut de 1923)')
      : makeResult('SPA', 'Tánger (Zona Ocupada por España)', 'Ocupación Militar Española (14 de junio de 1940)'),
  'International Zone of Tangier': (s) =>
    s < 6
      ? makeResult('NEU', 'Zone Internationale de Tanger', 'Administration Internationale (Statut de 1923)')
      : makeResult('SPA', 'Tánger (Zona Ocupada por España)', 'Ocupación Militar Española (14 de junio de 1940)'),
  Tanger: (s) =>
    s < 6
      ? makeResult('NEU', 'Zone Internationale de Tanger', 'Administration Internationale (Statut de 1923)')
      : makeResult('SPA', 'Tánger (Zona Ocupada por España)', 'Ocupación Militar Española (14 de junio de 1940)'),
  Menorca: (s) =>
    s < 3
      ? makeResult('SPR', 'Menorca (Isla Republicana)', 'Base naval fiel a la República (Mahón)')
      : makeResult('SPA', 'Menorca (Mahón)', 'Bando Nacional / Estado Español'),
  Minorca: (s) =>
    s < 3
      ? makeResult('SPR', 'Menorca (Isla Republicana)', 'Base naval fiel a la República (Mahón)')
      : makeResult('SPA', 'Menorca (Mahón)', 'Bando Nacional / Estado Español'),
  Mahón: (s) =>
    s < 3
      ? makeResult('SPR', 'Menorca (Isla Republicana)', 'Base naval fiel a la República (Mahón)')
      : makeResult('SPA', 'Menorca (Mahón)', 'Bando Nacional / Estado Español'),
  Mahon: (s) =>
    s < 3
      ? makeResult('SPR', 'Menorca (Isla Republicana)', 'Base naval fiel a la República (Mahón)')
      : makeResult('SPA', 'Menorca (Mahón)', 'Bando Nacional / Estado Español'),
  Mallorca: (s) =>
    s === 0
      ? makeResult('SPR', 'Mallorca (Islas Baleares)', 'Segunda República Española')
      : makeResult('SPA', 'Mallorca (Bando Nacional)', 'Base aeronaval del Bando Nacional'),
  Majorca: (s) =>
    s === 0
      ? makeResult('SPR', 'Mallorca (Islas Baleares)', 'Segunda República Española')
      : makeResult('SPA', 'Mallorca (Bando Nacional)', 'Base aeronaval del Bando Nacional'),
  Ibiza: (s) =>
    s === 0
      ? makeResult('SPR', 'Ibiza y Formentera', 'Segunda República Española')
      : makeResult('SPA', 'Ibiza (Bando Nacional)', 'Guarnición Nacionalista'),
  'Balearic Islands': (s) =>
    s === 0
      ? makeResult('SPR', 'Islas Baleares', 'Segunda República Española')
      : makeResult('SPA', 'Islas Baleares (Mallorca)', 'Base aeronaval del Bando Nacional'),
  'Islas Baleares': (s) =>
    s === 0
      ? makeResult('SPR', 'Islas Baleares', 'Segunda República Española')
      : makeResult('SPA', 'Islas Baleares (Mallorca)', 'Base aeronaval del Bando Nacional'),
  Spain: (s) =>
    s === 0
      ? makeResult('SPR', 'España (Territorios Republicanos)')
      : s < 3
      ? makeResult('SPA', 'España Nacional')
      : makeResult('SPA', 'Estado Español (Territorios de Ultramar)'),
  Portugal: () => makeResult('POR', 'Portugal (Províncias Ultramarinas)'),
  Netherlands: (s) =>
    makeResult('HOL', 'Nederland (Overzeese Gebiedsdelen)', undefined, s >= 6 ? 'Alleati' : 'Neutrale'),
  Belgium: (s) =>
    makeResult('BEL', 'Belgique (Territoires d\'outre-mer)', undefined, s >= 6 ? 'Alleati' : 'Neutrale'),
  Denmark: () => makeResult('DEN', 'Danmark (Grønland og besiddelser)'),
  Norway: () => makeResult('NOR', 'Norge (Svalbard og besittelser)'),
  Luxembourg: () => makeResult('LUX', 'Grand-Duché de Luxembourg'),
  Albania: () => makeResult('ALB', 'Mbretëria Shqiptare'),
  Italy: (s) =>
    s < 10
      ? makeResult(
          'ITA',
          'Possedimenti Italiani dell\'Egeo (Dodecaneso / Rodi e Isole Egee)',
          'Regno d\'Italia — Governatorato delle Isole Italiane dell\'Egeo (Rodi, Coo, Lero, Calino, Stampalia, Scarpanto)'
        )
      : makeResult(
          'GER',
          'Ägäische Inseln (Deutsche Besetzung)',
          'Wehrmacht — Deutsche Besetzung der Ägäischen Inseln (1943)'
        ),
};

/**
 * Geometric resolver for 1938 features that lack explicit NAME attributes.
 * Maps coordinates to exact historical administrative entities with zero gaps.
 */
export function assignUnnamedHB(f: any): string | null {
  const g = f.geometry;
  if (!g) return null;
  let x = 0,
    y = 0,
    count = 0;
  function scan(c: any) {
    if (typeof c[0] === 'number') {
      x += c[0];
      y += c[1];
      count++;
      return;
    }
    c.forEach(scan);
  }
  scan(g.coordinates);
  if (count === 0) return null;
  const c = [x / count, y / count];
  if (c[1] < -60) return null; // Antarctica

  // 1. Northern Arabian Desert / Badia
  if (c[0] >= 36 && c[0] <= 48 && c[1] >= 26 && c[1] <= 33) return 'Saudi Arabia';

  // 2. UK & Scottish/Welsh/Irish Sea islands (Anglesey, Arran, Bute, Hebrides, Orkney, Shetland)
  if (c[0] >= -8.5 && c[0] <= 0 && c[1] >= 51 && c[1] <= 61) return 'United Kingdom';

  // 3. Faroe Islands
  if (c[0] >= -8 && c[0] <= -5 && c[1] >= 61 && c[1] <= 63) return 'Faroe Islands';

  // 4. German Baltic (Rügen)
  if (c[0] >= 12 && c[0] <= 15 && c[1] >= 53.5 && c[1] <= 55) return 'Germany';

  // 5. Estonian Baltic islands (Saaremaa, Hiiumaa)
  if (c[0] >= 21.5 && c[0] <= 23.5 && c[1] >= 57.5 && c[1] <= 59.5) return 'Estonia';

  // 6. Finnish Åland islands
  if (c[0] >= 19 && c[0] <= 21 && c[1] >= 59.8 && c[1] <= 60.5) return 'Finland';

  // 7. Coral Sea / New Caledonia
  if (c[0] >= 158 && c[0] <= 161 && c[1] >= -20 && c[1] <= -18) return 'New Caledonia';

  // 8. Solomon Islands / Bougainville / Melanesia
  if (c[0] >= 153 && c[0] <= 163 && c[1] >= -12 && c[1] <= -3) {
    if (c[0] <= 156.2 && c[1] >= -7) return 'Territory of New Guinea';
    return 'Solomon Islands';
  }

  // 9. Nan'yō / Japanese South Seas Mandate (Palau, Yap, Chuuk, Pohnpei, Kosrae, Marshall)
  if (c[0] >= 130 && c[0] <= 175 && c[1] >= 3 && c[1] <= 22) {
    if (c[0] >= 165 && c[1] >= 18) return 'Wake Island';
    return 'South Seas Mandate';
  }

  return null;
}

export function resolveHB(f: any, s: number): ResolvedTerritory {
  if (f.__resolve) return f.__resolve(s);
  const P = f.properties || {};
  let rawName = String(P.NAME_LATN || P.NAME || P.NUTS_NAME || P.NAME_ENGL || P.ADMIN || P.SOVEREIGNT || '');
  let subj = String(P.SUBJECTO || P.PARTOF || rawName);

  if (!rawName || rawName === 'null' || rawName.trim() === '') {
    const unnamed = assignUnnamedHB(f);
    if (unnamed) {
      rawName = unnamed;
      subj = unnamed;
    }
  }

  const name = rawName;
  const nrm_hb = normStr(name);
  const nrm_subj = normStr(subj);

  // Compute centroid / bbox if not already cached
  let c = f.__cent;
  if (!c || (c[0] === 0 && c[1] === 0)) {
    const b = bboxOf(f);
    if (b) {
      c = [(b.minx + b.maxx) / 2, (b.miny + b.maxy) / 2];
    } else {
      c = [0, 0];
    }
  }

  const nid = String(P.NUTS_ID || P.CNTR_CODE || P.ISO_A2 || P.ISO3 || f.id || '');
  const getTop = (owner: string) => getExtendedToponym(rawName, owner, nid, c, s);

  // Isola di Man (Isle of Man)
  const isMan =
    nrm_hb.includes('isle of man') ||
    nrm_hb.includes('isle of mann') ||
    nrm_hb === 'man' ||
    nrm_hb === 'mann' ||
    nrm_hb.includes('isola di man') ||
    nrm_hb.includes('douglas') ||
    nrm_subj.includes('isle of man') ||
    nrm_subj.includes('isola di man') ||
    P.CNTR_CODE === 'IM' ||
    P.CNTR_ID === 'IM' ||
    P.ISO_A2 === 'IM' ||
    P.ISO3 === 'IMN' ||
    P.ADM0_A3 === 'GBM' ||
    (c[0] >= -5.2 && c[0] <= -4.0 && c[1] >= 53.8 && c[1] <= 54.7);

  if (isMan) {
    const top = getExtendedToponym(name || 'Isle of Man', 'UK');
    return makeResult(
      'UK',
      top.name || 'Isle of Man (Douglas)',
      top.adminTitle || 'Crown Dependency of the Isle of Man'
    );
  }

  // Isole del Canale (Channel Islands)
  const isChannel =
    nrm_hb.includes('jersey') ||
    nrm_hb.includes('guernsey') ||
    nrm_hb.includes('channel islands') ||
    nrm_hb.includes('isole del canale') ||
    nrm_hb.includes('alderney') ||
    nrm_hb.includes('sark') ||
    nrm_subj.includes('channel islands') ||
    P.CNTR_CODE === 'JE' ||
    P.CNTR_CODE === 'GG' ||
    P.ISO_A2 === 'JE' ||
    P.ISO_A2 === 'GG' ||
    (c[0] >= -3.0 && c[0] <= -1.8 && c[1] >= 49.0 && c[1] <= 49.9);

  if (isChannel) {
    if (s >= 6) {
      return makeResult(
        'GER',
        'Kanalinseln (Deutsche Besetzung)',
        'Militärverwaltung Kanalinseln (giu 1940)'
      );
    }
    const top = getExtendedToponym(name || 'Channel Islands', 'UK');
    return makeResult(
      'UK',
      top.name || (nrm_hb.includes('jersey') ? 'Bailiwick of Jersey (Saint Helier)' : 'Bailiwick of Guernsey (Saint Peter Port)'),
      top.adminTitle || 'Crown Dependencies (Channel Islands)'
    );
  }

  // Repubblica di Hatay / Sangiaccato di Alessandretta (Evoluzione Storica 1936-1940)
  const isHatay =
    nrm_hb.includes('hatay') ||
    nrm_hb.includes('alexandretta') ||
    nrm_hb.includes('iskenderun') ||
    nrm_hb.includes('antakya') ||
    nrm_subj.includes('hatay') ||
    nrm_subj.includes('alexandretta') ||
    nrm_subj.includes('iskenderun') ||
    P.NUTS_ID === 'TR631' ||
    P.CNTR_CODE === 'HAT';

  if (isHatay) {
    return resolveHatay(s, name);
  }

  // Turchia (Turchia repubblicana)
  const isTurkey =
    !isHatay &&
    (
      nrm_hb.includes('turkey') ||
      nrm_hb.includes('turkiye') ||
      nrm_hb.includes('turchia') ||
      nrm_hb.includes('anatolia') ||
      nrm_subj.includes('turkey') ||
      nrm_subj.includes('turchia') ||
      P.CNTR_CODE === 'TR' ||
      P.CNTR_ID === 'TR' ||
      P.ISO_A2 === 'TR' ||
      P.ISO3 === 'TUR' ||
      P.ISO_A3 === 'TUR' ||
      P.ADM0_A3 === 'TUR'
    );

  if (isTurkey) {
    const top = getExtendedToponym(name || 'Turkey', 'TUR');
    return makeResult('TUR', top.name || 'Türkiye Cumhuriyeti', top.adminTitle || 'Tarafsız Devlet (İnönü Dönemi)');
  }

  // Arabia Saudita (Regno Saudita / Nejd / Hejaz / Asir / Al-Hasa / Deserti / Zone Neutrali)
  const isSaudi =
    nrm_hb.includes('saudi') ||
    nrm_hb.includes('saudite') ||
    nrm_hb.includes('arabia saudita') ||
    nrm_hb.includes('mamlakah') ||
    nrm_hb.includes('nejd') ||
    nrm_hb.includes('najd') ||
    nrm_hb.includes('hejaz') ||
    nrm_hb.includes('hedjaz') ||
    nrm_hb.includes('hijaz') ||
    nrm_hb.includes('asir') ||
    nrm_hb.includes('aseer') ||
    nrm_hb.includes('al-hasa') ||
    nrm_hb.includes('al-ahsa') ||
    nrm_hb.includes('el hasa') ||
    nrm_hb.includes('eastern province') ||
    nrm_hb.includes('ash sharqiyah') ||
    nrm_hb.includes('riyadh') ||
    nrm_hb.includes('ar riyad') ||
    nrm_hb.includes('makkah') ||
    nrm_hb.includes('mecca') ||
    nrm_hb.includes('medina') ||
    nrm_hb.includes('madinah') ||
    nrm_hb.includes('jeddah') ||
    nrm_hb.includes('jidda') ||
    nrm_hb.includes('taif') ||
    nrm_hb.includes('hail') ||
    nrm_hb.includes('shammar') ||
    nrm_hb.includes('jawf') ||
    nrm_hb.includes('sakaka') ||
    nrm_hb.includes('tabuk') ||
    nrm_hb.includes('qassim') ||
    nrm_hb.includes('buraidah') ||
    nrm_hb.includes('unaizah') ||
    nrm_hb.includes('jizan') ||
    nrm_hb.includes('jazan') ||
    nrm_hb.includes('najran') ||
    nrm_hb.includes('al bahah') ||
    nrm_hb.includes('rub al khali') ||
    nrm_hb.includes('rub\' al khali') ||
    nrm_hb.includes('empty quarter') ||
    nrm_hb.includes('quarto vuoto') ||
    nrm_hb.includes('shal\'an') ||
    nrm_hb.includes('shalan') ||
    nrm_hb.includes('bin shal\'an') ||
    nrm_hb.includes('bin shalan') ||
    nrm_hb.includes('ruwalla') ||
    nrm_hb.includes('saudi-iraqi') ||
    nrm_hb.includes('saudi-kuwait') ||
    (nrm_hb.includes('neutral zone') && !nrm_hb.includes('tanger')) ||
    (nrm_hb.includes('zona neutrale') && !nrm_hb.includes('tangeri')) ||
    nrm_subj.includes('saudi') ||
    nrm_subj.includes('nejd') ||
    nrm_subj.includes('najd') ||
    nrm_subj.includes('hejaz') ||
    nrm_subj.includes('hail') ||
    nrm_subj.includes('shal\'an') ||
    nrm_subj.includes('shalan') ||
    nrm_subj.includes('arabia saudita') ||
    P.CNTR_CODE === 'SA' ||
    P.CNTR_ID === 'SA' ||
    P.ISO_A2 === 'SA' ||
    P.ISO3 === 'SAU' ||
    P.ISO_A3 === 'SAU' ||
    P.ADM0_A3 === 'SAU' ||
    P.CNTR_CODE === 'NT' ||
    P.ISO_A2 === 'NT' ||
    P.ISO3 === 'NTZ' ||
    P.ISO_A3 === 'NTZ' ||
    P.ADM0_A3 === 'NTZ' ||
    (
      c &&
      c[0] >= 34.8 &&
      c[0] <= 55.5 &&
      c[1] >= 16.0 &&
      c[1] <= 32.2 &&
      !nrm_hb.includes('yemen') &&
      !nrm_hb.includes('aden') &&
      !nrm_hb.includes('oman') &&
      !nrm_hb.includes('muscat') &&
      !nrm_hb.includes('trucial') &&
      !nrm_hb.includes('kuwait') &&
      !nrm_hb.includes('qatar') &&
      !nrm_hb.includes('bahrain') &&
      !nrm_hb.includes('iraq') &&
      !nrm_hb.includes('mesopotam') &&
      !nrm_hb.includes('jordan') &&
      !nrm_hb.includes('transjordan') &&
      !nrm_hb.includes('palestine') &&
      !nrm_hb.includes('sinai') &&
      !nrm_hb.includes('egypt') &&
      !nrm_subj.includes('yemen') &&
      !nrm_subj.includes('oman') &&
      !nrm_subj.includes('kuwait') &&
      !nrm_subj.includes('iraq') &&
      !nrm_subj.includes('jordan')
    );

  if (isSaudi) {
    let topName = name;
    if (!topName && c) {
      if (c[0] >= 38 && c[0] <= 44 && c[1] >= 28 && c[1] <= 32) {
        topName = 'al_jawf';
      } else if (c[0] >= 39 && c[0] <= 43 && c[1] >= 25 && c[1] <= 28) {
        topName = 'hail';
      } else if (c[0] >= 38 && c[0] <= 43 && c[1] >= 19 && c[1] <= 28) {
        topName = 'hejaz';
      } else {
        topName = 'nejd';
      }
    }
    const top = getExtendedToponym(topName || 'Saudi Arabia', 'SAU', P.NUTS_ID || P.CNTR_ID, c);
    return makeResult(
      'SAU',
      top.name || 'Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah (Nejd, Hejaz wa Mulhaqatuha)',
      top.adminTitle || 'Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah (Malik Abdulaziz Al Saud)',
      undefined,
      top.note
    );
  }

  // Siria e Libano (Mandato Francese)
  const isSyriaLebanon =
    nrm_hb.includes('syria') ||
    nrm_hb.includes('siria') ||
    nrm_hb.includes('lebanon') ||
    nrm_hb.includes('libano') ||
    nrm_subj.includes('syria') ||
    nrm_subj.includes('lebanon') ||
    P.CNTR_CODE === 'SY' ||
    P.CNTR_CODE === 'LB' ||
    P.ISO_A2 === 'SY' ||
    P.ISO_A2 === 'LB' ||
    P.ISO3 === 'SYR' ||
    P.ISO3 === 'LBN';

  if (isSyriaLebanon) {
    const isLeb = nrm_hb.includes('lebanon') || nrm_hb.includes('libano') || P.CNTR_CODE === 'LB';
    if (s >= 6) {
      return makeResult(
        'F_SYR',
        isLeb ? 'Grand Liban (Mandat français — Vichy)' : 'Syrie (Mandat français — Vichy)',
        'Administration coloniale de Vichy',
        'Fantoccio'
      );
    }
    return makeResult(
      'F_SYR',
      isLeb ? 'Grand Liban (Mandat français)' : 'Syrie (Mandat français)',
      'Mandat de la Société des Nations (France)'
    );
  }

  // Iran / Persia
  const isIran =
    nrm_hb.includes('persia') ||
    nrm_hb.includes('iran') ||
    nrm_subj.includes('iran') ||
    nrm_subj.includes('persia') ||
    P.CNTR_CODE === 'IR' ||
    P.CNTR_ID === 'IR' ||
    P.ISO_A2 === 'IR' ||
    P.ISO3 === 'IRN' ||
    P.ISO_A3 === 'IRN' ||
    P.ADM0_A3 === 'IRN';

  if (isIran) {
    const top = getExtendedToponym(name || 'Iran', 'IRN');
    return makeResult('IRN', top.name || 'Keshvar-e Shâhanshâhi-ye Irân', top.adminTitle || 'Dudmân-e Pahlavi');
  }

  // Mesopotamia Britannica / Regno dell'Iraq (Rigoroso per nome e proprietà)
  const isMesopotamia =
    !isTurkey &&
    !isSaudi &&
    !isSyriaLebanon &&
    !isIran &&
    (
      nrm_hb.includes('mesopotam') ||
      nrm_hb.includes('iraq') ||
      nrm_hb.includes('irak') ||
      nrm_hb.includes('baghdad') ||
      nrm_hb.includes('basra') ||
      nrm_hb.includes('mosul') ||
      nrm_hb.includes('kirkuk') ||
      nrm_hb.includes('erbil') ||
      nrm_hb.includes('arbil') ||
      nrm_subj.includes('mesopotam') ||
      nrm_subj.includes('iraq') ||
      P.CNTR_CODE === 'IQ' ||
      P.CNTR_ID === 'IQ' ||
      P.ISO_A2 === 'IQ' ||
      P.ISO3 === 'IRQ' ||
      P.ISO_A3 === 'IRQ' ||
      P.ADM0_A3 === 'IRQ'
    );

  if (isMesopotamia) {
    const top = getExtendedToponym(name || 'Mesopotamia', 'UK');
    return makeResult(
      'UK',
      top.name || 'Al-Mamlakah al-‘Irāqiyyah (Mesopotamia)',
      top.adminTitle || 'British Sphere of Influence & Treaty of Alliance (1930)'
    );
  }

  // Carelia & Petsamo
  if (name === 'Finland') {
    return s < 6
      ? makeResult('FIN', 'Suomi (Petsamo / Karjala)', 'Ennen sotaa vallinneet rajat')
      : makeResult('SOV', 'Karelskaya ASSR i Petsamo', 'Moskovskiy mirny dogovor (1940)');
  }

  // Bessarabia & Bucovina
  if (name === 'Romania') {
    return s < 6
      ? makeResult('ROM', name, 'Regatul României (România Mare)')
      : makeResult('SOV', 'Basarabia i Severnaya Bukovina', 'Prisoyedineniye k SSSR (1940)');
  }

  // Rutenia Subcarpatica (Zakarpattia)
  if (name === 'Czechoslovakia') {
    return s < 3
      ? makeResult('CZE', 'Podkarpatská Rus (Zakarpattja)', 'Československá republika')
      : makeResult('HUN', 'Kárpátalja', 'Magyar Királyság (1939)');
  }

  // Ungheria basemap
  if (name === 'Hungary') {
    return s < 2
      ? makeResult('HUN', 'Magyar Királyság', 'Trianoni határok')
      : makeResult('HUN', 'Magyar Királyság', 'Bécsi döntések szerinti határok');
  }

  // Polonia
  if (name === 'Poland') {
    return s < 5
      ? makeResult('POL', 'Rzeczpospolita Polska (Kresy Wschodnie)', 'II Rzeczpospolita Polska')
      : makeResult('SOV', 'Zapadnaya Belorussiya i Zapadnaya Ukraina', 'Vkhod v sostav SSSR (1939)');
  }

  // Manciukuò
  if (name === 'Manchukuo' || subj === 'Manchukuo') {
    return makeResult('MAN', 'Damanzhoudiguo (Xinjing)', 'Kōgun / Kangde Kaisō');
  }

  // Cina & Teatro Sino-Giapponese
  if (name === 'Republic of China' || name === 'China' || name === 'Chinese warlords') {
    if (s >= 1) {
      const b = bboxOf(f);
      if (b && b.maxx > 113 && b.miny > 22 && b.maxy < 40) {
        return makeResult('JAP', 'Chūgoku Senryōchi', 'Dai Nippon Teikoku Kōgun Senryōchi');
      }
    }
    return makeResult('CHI', 'Zhōnghuá Mínguó (Kàngzhan)', 'Guómín Zhèngfǔ');
  }

  // Tannu Tuva (Stato indipendente alleato fino al 1944)
  if (
    nrm_hb.includes('tannu') ||
    nrm_hb.includes('tuva') ||
    nrm_subj.includes('tuva') ||
    nrm_subj.includes('tannu')
  ) {
    return makeResult(
      'TUV',
      getTop('TUV').name || 'Tyva Arat Respublika (Kyzyl)',
      'Tyva Arat Respublika (Ene-Say)',
      'Comintern'
    );
  }

  // Africa: Indipendenti, Colonie, AOI
  if (nrm_hb.includes('liberia') || nrm_hb.includes('monrovia')) {
    return makeResult('LBR', getTop('LBR').name || 'Republic of Liberia (Monrovia)', 'Independent African State');
  }
  if (nrm_hb.includes('egypt')) {
    return makeResult('UK', 'Kingdom of Egypt (Cairo)', 'British Sphere of Influence (Anglo-Egyptian Treaty 1936)');
  }
  if (nrm_hb.includes('sudan') && !nrm_hb.includes('french')) {
    return makeResult('UK', 'Anglo-Egyptian Sudan (Khartoum)', 'Anglo-Egyptian Condominium');
  }
  if (
    nrm_hb.includes('kenya') ||
    nrm_hb.includes('uganda') ||
    nrm_hb.includes('tanganyika') ||
    nrm_hb.includes('tanzania') ||
    nrm_hb.includes('zanzibar') ||
    nrm_hb.includes('nyasaland') ||
    nrm_hb.includes('nyassa') ||
    nrm_hb.includes('malawi') ||
    nrm_hb.includes('zambia') ||
    nrm_hb.includes('zimbabwe') ||
    (nrm_hb.includes('rhodesia') && !nrm_hb.includes('rhodes '))
  ) {
    const top = getExtendedToponym(name, 'UK');
    return makeResult('UK', top.name, top.adminTitle || 'British Empire in Africa');
  }
  if (
    nrm_hb.includes('bechuanaland') ||
    nrm_hb.includes('botswana') ||
    nrm_hb.includes('basutoland') ||
    nrm_hb.includes('lesotho') ||
    nrm_hb.includes('swaziland') ||
    nrm_hb.includes('eswatini')
  ) {
    const top = getExtendedToponym(name, 'UK');
    return makeResult('UK', top.name, 'British Protectorate');
  }
  if (
    nrm_hb.includes('gold coast') ||
    nrm_hb.includes('ghana') ||
    nrm_hb.includes('nigeria') ||
    nrm_hb.includes('sierra leone') ||
    nrm_hb.includes('gambia') ||
    nrm_hb.includes('british cameroon')
  ) {
    const top = getExtendedToponym(name, 'UK');
    return makeResult('UK', top.name, 'British Crown Colony');
  }
  if (nrm_hb.includes('british somaliland')) {
    return makeResult('UK', 'British Somaliland (Berbera)', 'Somaliland Protectorate');
  }
  if (
    nrm_hb.includes('south west africa') ||
    nrm_hb.includes('south-west africa') ||
    nrm_hb.includes('namibia')
  ) {
    return makeResult('SAF', 'Suidwes-Afrika / South West Africa (Windhoek)', 'League of Nations Mandate (Union of South Africa)');
  }

  // Colonie Belga & Portoghesi in Africa
  if (
    nrm_hb.includes('belgian congo') ||
    nrm_hb.includes('congo belge') ||
    nrm_hb.includes('ruanda') ||
    nrm_hb.includes('urundi') ||
    nrm_hb.includes('rwanda') ||
    nrm_hb.includes('burundi') ||
    (nrm_hb.includes('congo') &&
      (subj === 'Belgium' ||
        nrm_hb.includes('kinshasa') ||
        nrm_hb.includes('leopoldville') ||
        nrm_hb.includes('zaire') ||
        nrm_hb.includes('democratic republic')))
  ) {
    const top = getExtendedToponym(name, 'BEL');
    return makeResult('BEL', top.name, top.adminTitle || 'Empire colonial belge', s >= 6 ? 'Alleati' : 'Neutrale');
  }
  if (
    nrm_hb.includes('angola') ||
    nrm_hb.includes('mozambique') ||
    nrm_hb.includes('portuguese guinea') ||
    nrm_hb.includes('guinea-bissau') ||
    nrm_hb.includes('guinea bissau') ||
    nrm_hb.includes('guine-bissau') ||
    nrm_hb.includes('guine bissau') ||
    nrm_hb.includes('guine portuguesa') ||
    nrm_hb.includes('bissau') ||
    nrm_hb.includes('cape verde') ||
    nrm_hb.includes('cabo verde') ||
    nrm_hb.includes('sao tome') ||
    nrm_hb.includes('sao tome and principe')
  ) {
    const top = getExtendedToponym(name, 'POR');
    return makeResult('POR', top.name, top.adminTitle || 'Império Colonial Português (Províncias Ultramarinas)');
  }

  // Francia in Africa: AOF (incluso Togo) & AEF
  if (
    nrm_hb.includes('french west africa') ||
    nrm_hb.includes('aof') ||
    nrm_hb.includes('togo') ||
    nrm_hb.includes('togoland') ||
    nrm_hb.includes('senegal') ||
    nrm_hb.includes('mauritania') ||
    nrm_hb.includes('french sudan') ||
    nrm_hb.includes('soudan') ||
    nrm_hb.includes('upper volta') ||
    nrm_hb.includes('haute-volta') ||
    nrm_hb.includes('burkina') ||
    nrm_hb.includes('ivory coast') ||
    nrm_hb.includes('cote d\'ivoire') ||
    nrm_hb.includes('french guinea') ||
    (nrm_hb.includes('guinea') &&
      !nrm_hb.includes('bissau') &&
      !nrm_hb.includes('portuguese') &&
      !nrm_hb.includes('spanish') &&
      !nrm_hb.includes('equatorial') &&
      !nrm_hb.includes('new guinea')) ||
    nrm_hb.includes('dahomey') ||
    nrm_hb.includes('benin') ||
    (nrm_hb.includes('niger') && !nrm_hb.includes('nigeria'))
  ) {
    if (s >= 6) {
      const top = getExtendedToponym(name, 'VIC_AOF');
      return makeResult(
        'VIC_AOF',
        top.name || 'Afrique-Occidentale française (AOF — Vichy)',
        top.adminTitle || 'Haut-commissariat de l\'Afrique française (Pierre Boisson — Vichy)',
        'Fantoccio'
      );
    }
    const top = getExtendedToponym(name, 'F_AOF');
    return makeResult(
      'F_AOF',
      top.name || 'Afrique-Occidentale française (AOF)',
      top.adminTitle || 'Gouvernement général de l\'AOF'
    );
  }

  if (
    nrm_hb.includes('french equatorial africa') ||
    nrm_hb.includes('aef') ||
    nrm_hb.includes('chad') ||
    nrm_hb.includes('tchad') ||
    nrm_hb.includes('french cameroon') ||
    nrm_hb.includes('cameroun') ||
    nrm_hb.includes('cameroon') ||
    nrm_hb.includes('ubangi') ||
    nrm_hb.includes('oubangui') ||
    nrm_hb.includes('central african') ||
    nrm_hb.includes('centrafrique') ||
    nrm_hb.includes('moyen-congo') ||
    nrm_hb.includes('middle congo') ||
    (nrm_hb.includes('congo') && (nrm_hb.includes('brazzaville') || subj === 'France')) ||
    (nrm_hb.includes('gabon') && !nrm_hb.includes('gabriel'))
  ) {
    if (s >= 6) {
      const top = getExtendedToponym(name, 'FFL_AEF');
      return makeResult(
        'FFL_AEF',
        top.name || 'Afrique équatoriale française (France Libre — De Gaulle / Éboué)',
        top.adminTitle || 'Afrique française libre — Félix Éboué & De Gaulle (Brazzaville)',
        'Alleati'
      );
    }
    const top = getExtendedToponym(name, 'F_AEF');
    return makeResult(
      'F_AEF',
      top.name || 'Afrique-Équatoriale française (AEF)',
      top.adminTitle || 'Gouvernement général de l\'AEF'
    );
  }

  // Italia in Africa & Etiopia
  if (nrm_hb.includes('ethiopia') || nrm_hb.includes('abyssinia')) {
    return s === 0
      ? makeResult('ETH', 'Mängəśtä Ityop’p’ya (Addis Ababa)', 'Yä-Ityop’ya Qəññ Gəzat Torənnät')
      : makeResult('ITA', 'Africa Orientale Italiana (AOI — Etiopia)', 'Impero proclamato il 9 maggio 1936');
  }
  if (nrm_hb.includes('libya') || nrm_hb.includes('cyrenaica') || nrm_hb.includes('tripolitania')) {
    return makeResult('ITA', 'Libia Italiana (Quarta Sponda)', 'Governo Generale della Libia');
  }
  if (nrm_hb.includes('eritrea')) {
    return makeResult('ITA', 'Colonia Eritrea (Asmara)', 'Africa Orientale Italiana');
  }
  if (nrm_hb.includes('dodecanese') || (nrm_hb.includes('rhodes') && !nrm_hb.includes('rhodesia'))) {
    return makeResult('ITA', 'Isole Italiane dell\'Egeo (Rodi)', 'Possedimento dell\'Egeo');
  }
  if (nrm_hb === 'albania') {
    return s < 4
      ? makeResult('ALB', 'Mbretëria Shqiptare (Tiranë)', 'Shtet i Pavarur')
      : makeResult('ITA', 'Regno d\'Albania', 'Unione Personale con la Corona d\'Italia (aprile 1939)');
  }
  if (nrm_hb.includes('somali') && (nrm_hb.includes('ital') || subj === 'Italy' || name.includes('(Italy)'))) {
    const isPostAOI = s >= 1;
    return isPostAOI
      ? makeResult(
          'ITA',
          'Governo della Somalia',
          'Africa Orientale Italiana (R.D.L. 1 giugno 1936 n. 1019) — Capoluogo Mogadiscio',
          undefined,
          'Governo della Somalia (AOI)'
        )
      : makeResult(
          'ITA',
          'Colonia della Somalia Italiana',
          'Colonia del Regno d\'Italia (1908-1936) — Capoluogo Mogadiscio',
          undefined,
          'Colonia del Regno d\'Italia'
        );
  }

  // Spagna Coloniale & Protettorato del Rif
  if (
    nrm_hb.includes('spanish morocco') ||
    nrm_hb.includes('sp. morocco') ||
    nrm_hb.includes('marruecos espanol') ||
    nrm_hb.includes('maroc espagnol') ||
    nrm_hb.includes('rif') ||
    nrm_hb.includes('tetuan') ||
    nrm_hb.includes('tetouan') ||
    nrm_hb.includes('yebala') ||
    nrm_hb.includes('gomara') ||
    nrm_hb.includes('kert') ||
    nrm_hb.includes('lucus') ||
    nrm_hb.includes('larache') ||
    nrm_hb.includes('alcazarquivir') ||
    nrm_hb.includes('arcila') ||
    nrm_hb.includes('xauen') ||
    nrm_hb.includes('chefchaouen') ||
    nrm_hb.includes('alhucemas') ||
    nrm_hb.includes('sanjurjo') ||
    nrm_hb.includes('nador') ||
    nrm_hb.includes('cabo de agua')
  ) {
    if (s === 0) {
      return makeResult(
        'SPR',
        'Protectorado Español de Marruecos (Zona del Rif y Yebala / Tetuán)',
        'Segunda República Española — Alta Comisaría (Arturo Álvarez-Buylla)'
      );
    }
    if (s < 3) {
      return makeResult(
        'SPA',
        'Protectorado Español de Marruecos (Zona del Rif / Tetuán)',
        'Bando Nacional — Cuna del Alzamiento del 17-18 de julio de 1936, Ejército de África y Regulares'
      );
    }
    return makeResult(
      'SPA',
      'Protectorado Español de Marruecos (Tetuán)',
      'Estado Español — Alta Comisaría de España en Marruecos / Delegación Jalifiana'
    );
  }
  if (nrm_hb.includes('ceuta')) {
    return s === 0
      ? makeResult('SPR', 'Ceuta (Plaza de Soberanía)', 'Segunda República Española')
      : makeResult('SPA', 'Ceuta (Plaza de Soberanía)', 'Bando Nacional — Base del Ejército de África');
  }
  if (nrm_hb.includes('melilla')) {
    return s === 0
      ? makeResult('SPR', 'Melilla (Plaza de Soberanía)', 'Segunda República Española')
      : makeResult('SPA', 'Melilla (Plaza de Soberanía)', 'Bando Nacional — Cuna del Alzamiento del 17 de julio de 1936');
  }
  if (
    nrm_hb.includes('rio de oro') ||
    nrm_hb.includes('spanish sahara') ||
    nrm_hb.includes('sp. sahara') ||
    nrm_hb.includes('sahara espanol')
  ) {
    return s === 0
      ? makeResult('SPR', 'Sáhara Español (Río de Oro)', 'Segunda República Española')
      : makeResult('SPA', 'Sáhara Español (Río de Oro)', 'Bando Nacional (Franco)');
  }
  if (nrm_hb.includes('spanish guinea') || nrm_hb.includes('sp. guinea') || nrm_hb.includes('guinea espanola')) {
    return s === 0
      ? makeResult('SPR', 'Guinea Española (Santa Isabel)', 'Segunda República Española')
      : makeResult('SPA', 'Guinea Española (Santa Isabel)', 'Bando Nacional (Franco)');
  }
  if (nrm_hb.includes('ifni')) {
    return s === 0
      ? makeResult('SPR', 'Territorio de Ifni (Sidi Ifni)', 'Segunda República Española')
      : makeResult('SPA', 'Territorio de Ifni (Sidi Ifni)', 'Bando Nacional (Franco)');
  }
  if (nrm_hb.includes('canary islands') || nrm_hb.includes('canarias')) {
    return s === 0
      ? makeResult('SPR', 'Islas Canarias (Tenerife / Las Palmas)', 'Segunda República Española')
      : makeResult('SPA', 'Islas Canarias (Tenerife / Las Palmas)', 'Bando Nacional (Franco)');
  }
  if (nrm_hb.includes('tangier') || nrm_hb.includes('tanger') || nrm_hb.includes('tangeri')) {
    return s < 6
      ? makeResult('NEU', 'Zone Internationale de Tanger', 'Administration Internationale (Statut de 1923)')
      : makeResult('SPA', 'Tánger (Zona Ocupada por España)', 'Ocupación Militar Española (14 de junio de 1940)');
  }
  if (nrm_hb.includes('menorca') || nrm_hb.includes('minorca') || nrm_hb.includes('mahon')) {
    return s < 3
      ? makeResult('SPR', 'Menorca (Isla Republicana)', 'Base naval fiel a la República (Mahón)')
      : makeResult('SPA', 'Menorca (Mahón)', 'Bando Nacional / Estado Español');
  }
  if (
    nrm_hb.includes('mallorca') ||
    nrm_hb.includes('majorca') ||
    nrm_hb.includes('ibiza') ||
    nrm_hb.includes('eivissa') ||
    nrm_hb.includes('formentera')
  ) {
    return s === 0
      ? makeResult('SPR', 'Islas Baleares (Mallorca / Ibiza)', 'Segunda República Española')
      : makeResult('SPA', 'Mallorca (Bando Nacional)', 'Base aeronaval del Bando Nacional');
  }
  if (nrm_hb.includes('balearic') || nrm_hb.includes('baleares')) {
    if (c[0] > 3.7 && c[1] > 39.6) {
      return s < 3
        ? makeResult('SPR', 'Menorca (Isla Republicana)', 'Base naval fiel a la República (Mahón)')
        : makeResult('SPA', 'Menorca (Mahón)', 'Bando Nacional / Estado Español');
    }
    return s === 0
      ? makeResult('SPR', 'Islas Baleares', 'Segunda República Española')
      : makeResult('SPA', 'Islas Baleares (Mallorca)', 'Base aeronaval del Bando Nacional');
  }

  // Medio Oriente
  if (nrm_hb.includes('yemen')) {
    return makeResult('YEM', 'Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah (Sana\'a)', 'Dawlat al-Yaman al-Mustaqillah');
  }
  if (nrm_hb.includes('aden')) {
    return makeResult('UK', 'Aden Colony and Protectorate', 'British Strategic Outpost in the Red Sea');
  }
  if (nrm_hb.includes('iraq')) {
    return makeResult('UK', 'Kingdom of Iraq (Baghdad)', 'British Sphere of Influence (Anglo-Iraqi Treaty of 1930)');
  }
  if (nrm_hb.includes('transjordan')) {
    return makeResult('UK', 'Emirate of Transjordan (Amman)', 'League of Nations Mandate');
  }
  if (nrm_hb.includes('palestine')) {
    return makeResult('UK', 'British Mandate for Palestine (Jerusalem)', 'League of Nations Mandate');
  }
  if (nrm_hb.includes('syria')) {
    return s < 6
      ? makeResult('F_SYR', 'Mandat français en Syrie (Damas)', 'Haut-Commissariat au Levant')
      : makeResult('F_SYR', 'Syrie (Mandat français — Vichy)', 'Administration de Vichy', 'Fantoccio');
  }
  if (nrm_hb.includes('lebanon')) {
    return s < 6
      ? makeResult('F_SYR', 'Grand Liban (Mandat français — Beyrouth)', 'Haut-Commissariat au Levant')
      : makeResult('F_SYR', 'Grand Liban (Mandat français — Vichy)', 'Administration de Vichy', 'Fantoccio');
  }
  if (
    nrm_hb.includes('saudi') ||
    nrm_hb.includes('hejaz') ||
    nrm_hb.includes('nejd') ||
    nrm_hb.includes('najd') ||
    nrm_hb.includes('hail') ||
    nrm_hb.includes('shal\'an') ||
    nrm_hb.includes('shalan')
  ) {
    let topName = name;
    if (!topName && c) {
      if (c[0] >= 38 && c[0] <= 44 && c[1] >= 28 && c[1] <= 32) {
        topName = 'al_jawf';
      } else if (c[0] >= 39 && c[0] <= 43 && c[1] >= 25 && c[1] <= 28) {
        topName = 'hail';
      } else if (c[0] >= 38 && c[0] <= 43 && c[1] >= 19 && c[1] <= 28) {
        topName = 'hejaz';
      } else {
        topName = 'nejd';
      }
    }
    const top = getExtendedToponym(topName || 'Saudi Arabia', 'SAU', P.NUTS_ID || P.CNTR_ID, c);
    return makeResult(
      'SAU',
      top.name || 'Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah (Nejd, Hejaz wa Mulhaqatuha)',
      top.adminTitle || 'Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah (Malik Abdulaziz Al Saud)',
      undefined,
      top.note
    );
  }
  if (
    nrm_hb.includes('oman') ||
    nrm_hb.includes('muscat') ||
    nrm_hb.includes('trucial') ||
    nrm_hb.includes('kuwait') ||
    nrm_hb.includes('bahrain') ||
    nrm_hb.includes('qatar')
  ) {
    return makeResult('UK', 'British Persian Gulf Protectorates', 'Trucial States, Kuwait, Bahrain & Qatar');
  }

  // Jugoslavia (Bosnia, Kosovo, Serbia, Montenegro, Croazia, Slovenia, Macedonia)
  if (
    nrm_hb.includes('yugoslavia') ||
    nrm_hb.includes('jugoslav') ||
    nrm_hb.includes('yougoslav') ||
    nrm_hb.includes('bosnia') ||
    nrm_hb.includes('herzegovina') ||
    nrm_hb.includes('hercegovina') ||
    nrm_hb.includes('kosovo') ||
    nrm_hb.includes('kosova') ||
    nrm_hb.includes('metohija') ||
    nrm_hb.includes('serbia') ||
    nrm_hb.includes('srbija') ||
    nrm_hb.includes('montenegro') ||
    nrm_hb.includes('crna gora') ||
    nrm_hb.includes('croatia') ||
    nrm_hb.includes('hrvatska') ||
    nrm_hb.includes('slovenia') ||
    nrm_hb.includes('slovenija') ||
    nrm_hb.includes('macedonia') ||
    nrm_hb.includes('makedonija') ||
    nrm_hb.includes('vardar') ||
    nrm_hb.includes('vojvodina') ||
    nrm_hb.includes('banovina') ||
    nrm_hb.includes('vrbas') ||
    nrm_hb.includes('drina') ||
    nrm_hb.includes('zeta') ||
    nrm_hb.includes('morava') ||
    nrm_hb.includes('drava') ||
    nrm_hb.includes('sava')
  ) {
    const top = getExtendedToponym(name, 'YUG');
    return makeResult(
      'YUG',
      top.name || (name ? `Kraljevina Jugoslavija — ${name}` : 'Kraljevina Jugoslavija'),
      top.adminTitle || 'Kraljevina Jugoslavija'
    );
  }

  // Isle of Man & Channel Islands
  if (
    nrm_hb.includes('isle of man') ||
    nrm_hb.includes('isle of mann') ||
    nrm_hb === 'man' ||
    nrm_hb === 'mann' ||
    nrm_hb.includes('isola di man') ||
    nrm_hb.includes('douglas') ||
    nrm_hb.includes('jersey') ||
    nrm_hb.includes('guernsey') ||
    nrm_hb.includes('channel islands') ||
    nrm_hb.includes('alderney') ||
    nrm_hb.includes('sark')
  ) {
    const top = getExtendedToponym(name, 'UK');
    return makeResult(
      'UK',
      top.name || 'Crown Dependency of the Isle of Man',
      top.adminTitle || 'Crown Dependency of the Isle of Man'
    );
  }

  // Lookup HB_NAME e HB_SUBJ con fallback normalizzato
  let ov = HB_NAME[name] || HB_SUBJ[subj] || (HB_SUBJ[name] ? { o: HB_SUBJ[name].o, label: name } : undefined);
  if (!ov) {
    for (const [k, v] of Object.entries(HB_NAME)) {
      if (normStr(k) === nrm_hb) {
        ov = v;
        break;
      }
    }
  }
  if (!ov && subj) {
    const nrm_subj = normStr(subj);
    for (const [k, v] of Object.entries(HB_SUBJ)) {
      if (normStr(k) === nrm_subj) {
        ov = { o: v.o, label: name || k };
        break;
      }
    }
  }

  if (ov) {
    const top = getExtendedToponym(name, ov.o, undefined, undefined, s);
    if (ov.o === 'FRA') {
      return s < 6
        ? makeResult('FRA', top.name, top.note, undefined, top.adminTitle || 'Troisième République française')
        : makeResult('VIC', top.name, top.note, 'Fantoccio', top.adminTitle || 'État français (Régime de Vichy)');
    }
    if (ov.o.startsWith('F_')) {
      if (s >= 6) {
        if (ov.o === 'F_AEF') {
          const fflTop = getExtendedToponym(name, 'FFL_AEF');
          return makeResult(
            'FFL_AEF',
            fflTop.name || top.name,
            fflTop.adminTitle || 'Afrique française libre — Félix Éboué & De Gaulle (Brazzaville)',
            'Alleati'
          );
        }
        const vicKey =
          ov.o === 'F_NAF'
            ? 'VIC_NAF'
            : ov.o === 'F_AOF'
            ? 'VIC_AOF'
            : ov.o === 'F_MAD'
            ? 'VIC_MAD'
            : ov.o === 'F_SOM'
            ? 'VIC_SOM'
            : ov.o === 'F_SYR'
            ? 'VIC_SYR'
            : ov.o === 'F_IND'
            ? 'VIC_IND'
            : 'VIC';
        const vicTop = getExtendedToponym(name, vicKey);
        return makeResult(
          vicKey,
          vicTop.name || top.name,
          vicTop.adminTitle || 'Administration coloniale de Vichy',
          'Fantoccio'
        );
      }
      return makeResult(ov.o, top.name, top.adminTitle);
    }
    if (ov.o === 'BEL' || ov.o === 'HOL') {
      return makeResult(ov.o, top.name, top.adminTitle, s >= 6 ? 'Alleati' : 'Neutrale');
    }
    if (ov.o === 'SPA') {
      const top = getExtendedToponym(name, s === 0 ? 'SPR' : 'SPA', undefined, c, s);
      return s === 0
        ? makeResult('SPR', top.name, top.note || 'Segunda República Española', undefined, top.adminTitle || 'Segunda República Española')
        : makeResult('SPA', top.name, top.note || 'Bando Nacional / Estado Español', undefined, top.adminTitle || 'Estado Español (Régimen Franquista)');
    }
    if (ov.o === 'JAP') {
      return makeResult(
        'JAP',
        top.name,
        top.note || top.adminTitle || 'Dai Nippon Teikoku',
        'Asse',
        top.adminTitle || 'Dai Nippon Teikoku'
      );
    }
    if (ov.o === 'CHI') {
      return makeResult(
        'CHI',
        top.name,
        top.note || top.adminTitle || 'Zhōnghuá Mínguó',
        'Alleati',
        top.adminTitle || 'Zhōnghuá Mínguó Guómín Zhèngfǔ'
      );
    }
    if (ov.o === 'MAN') {
      return makeResult(
        'MAN',
        top.name,
        top.note || top.adminTitle || 'Damanzhoudiguo',
        'Fantoccio',
        top.adminTitle || 'Damanzhoudiguo'
      );
    }
    if (ov.o === 'MEJ') {
      return makeResult(
        'MEJ',
        top.name,
        top.note || top.adminTitle || 'Mengjiang',
        'Fantoccio',
        top.adminTitle || 'Mengjiang Lianhe Zizhi Zhengfu'
      );
    }
    if (ov.o === 'CCP_CHI') {
      return makeResult(
        'CCP_CHI',
        top.name,
        top.note || top.adminTitle || 'Shaan-Gan-Ning Bianqu',
        'Comintern',
        top.adminTitle || 'Zhongguo Gongchandang'
      );
    }
    if (ov.o === 'XIN') {
      return makeResult(
        'XIN',
        top.name,
        top.note || top.adminTitle || 'Xinjiang',
        'Comintern',
        top.adminTitle || 'Xinjiang Sheng Zhengfu'
      );
    }
    if (ov.o === 'TIB') {
      return makeResult(
        'TIB',
        top.name,
        top.note || top.adminTitle || 'Bod',
        'Neutrale',
        top.adminTitle || 'Kashag (Bod)'
      );
    }
    return makeResult(ov.o, top.name, top.note || top.adminTitle, undefined, top.adminTitle);
  }

  return makeResult('NEU', name || 'Territorio non organizzato');
}

export function resolveFeature(ft: any, s: number): ResolvedTerritory {
  if (ft.__resolve) return ft.__resolve(s);
  const p = ft.properties || {};
  const cntr = String(
    p.CNTR_CODE ||
      p.CNTR_ID ||
      p.ISO_A2 ||
      p.ISO_A3 ||
      p.ISO2 ||
      p.ISO3 ||
      p.ADM0_A3 ||
      p.SOV_A3 ||
      p.GU_A3 ||
      ft.__cntr ||
      ''
  ).toUpperCase();
  const rawName =
    p.NAME_LATN ||
    p.NUTS_NAME ||
    p.CNTR_NAME ||
    p.NAME_ENGL ||
    p.NAME ||
    p.NAME_LONG ||
    p.ADMIN ||
    p.SOVEREIGNT ||
    '';
  const histName = p.HISTORICAL_NAME || p.NUTS_NAME || rawName;
  const nrm = normStr(rawName);
  const nid = String(p.NUTS_ID || ft.id || '');
  const c = ft.__cent || [0, 0];

  const getTop = (owner: string) => getExtendedToponym(rawName, owner, nid, c, s);

  if (ft.__kind === 'KALININGRAD') {
    return makeResult('GER', 'Königsberg in Preußen', 'Hauptstadt der Provinz Ostpreußen');
  }

  // San Marino (SMR) - Enclave sovrana neutrale
  const isSanMarino =
    ft.id === 'SMR_HIST' ||
    ft.__kind === 'SAN_MARINO' ||
    cntr === 'SM' ||
    cntr === 'SMR' ||
    nid === 'SM' ||
    nid === 'SMR' ||
    nid === 'SMR_HIST' ||
    nrm === 'san marino' ||
    nrm === 'repubblica di san marino' ||
    nrm === 'serenissima repubblica di san marino';

  if (isSanMarino) {
    return makeResult(
      'SMR',
      'Serenissima Repubblica di San Marino',
      'Serenissima Repubblica di San Marino (Stato Neutrale)'
    );
  }

  // Città del Vaticano (VAT) - Enclave sovrana papale
  const isVatican =
    ft.id === 'VAT_HIST' ||
    ft.__kind === 'VATICAN_CITY' ||
    cntr === 'VA' ||
    cntr === 'VAT' ||
    nid === 'VA' ||
    nid === 'VAT' ||
    nid === 'VAT_HIST' ||
    nrm === 'vatican' ||
    nrm === 'vatican city' ||
    nrm === 'citta del vaticano' ||
    nrm === 'stato della citta del vaticano' ||
    nrm === 'santa sede' ||
    nrm === 'holy see';

  if (isVatican) {
    return makeResult(
      'VAT',
      'Stato della Città del Vaticano',
      s < 4
        ? 'Stato della Città del Vaticano (Papa Pio XI - Neutralità)'
        : 'Stato della Città del Vaticano (Papa Pio XII - Neutralità)'
    );
  }

  // Gibilterra (GIB) - Colonia della Corona Britannica
  const isGibraltar =
    ft.id === 'GIB_HIST' ||
    ft.__kind === 'GIBRALTAR_COLONY' ||
    cntr === 'GI' ||
    cntr === 'GIB' ||
    nid === 'GI' ||
    nid === 'GIB' ||
    nid === 'GIB_HIST' ||
    nrm === 'gibraltar' ||
    nrm === 'gibilterra' ||
    nrm === 'gibraltar crown colony';

  if (isGibraltar) {
    return makeResult(
      'GIB',
      'Gibraltar (Crown Colony)',
      'Gibraltar — Fortezza Navale Britannica (Force H)'
    );
  }

  // Isola di Man (Isle of Man)
  const isMan =
    cntr === 'IM' ||
    cntr === 'IMN' ||
    cntr === 'GBM' ||
    cntr === '833' ||
    cntr === 'XIM' ||
    nid.startsWith('IM') ||
    nrm.includes('isle of man') ||
    nrm.includes('isle of mann') ||
    nrm.includes('isola di man') ||
    nrm === 'man' ||
    nrm === 'mann' ||
    nrm.includes('douglas') ||
    (c[0] >= -5.2 && c[0] <= -4.0 && c[1] >= 53.8 && c[1] <= 54.7);

  if (isMan) {
    return makeResult(
      'UK',
      getTop('UK').name || 'Crown Dependency of the Isle of Man (Douglas)',
      'Crown Dependency of the Isle of Man'
    );
  }

  // Isole del Canale (Channel Islands)
  const isChannel =
    cntr === 'GG' ||
    cntr === 'GGY' ||
    cntr === 'JE' ||
    cntr === 'JEY' ||
    cntr === '831' ||
    cntr === '832' ||
    cntr === 'XGG' ||
    cntr === 'XJE' ||
    nid.startsWith('GG') ||
    nid.startsWith('JE') ||
    nrm.includes('jersey') ||
    nrm.includes('guernsey') ||
    nrm.includes('channel islands') ||
    nrm.includes('isole del canale') ||
    (c[0] >= -3.0 && c[0] <= -1.8 && c[1] >= 49.0 && c[1] <= 49.9);

  if (isChannel) {
    if (s >= 6) {
      return makeResult(
        'GER',
        'Kanalinseln (Deutsche Besetzung)',
        'Militärverwaltung Kanalinseln (1940)'
      );
    }
    return makeResult(
      'UK',
      getTop('UK').name || (nrm.includes('jersey') ? 'Bailiwick of Jersey (Saint Helier)' : 'Bailiwick of Guernsey (Saint Peter Port)'),
      'British Crown Dependency (Channel Islands)'
    );
  }

  // Repubblica di Hatay / Sangiaccato di Alessandretta (NUTS TR631 o toponimo storico)
  const isHatay =
    nid === 'TR631' ||
    nid.startsWith('TR631') ||
    nrm.includes('hatay') ||
    nrm.includes('alexandretta') ||
    nrm.includes('iskenderun') ||
    nrm.includes('antakya');

  if (isHatay) {
    return resolveHatay(s, rawName);
  }

  // Guiana Francese (NUTS FRY30, precision feature o toponimo storico)
  const isGuiana =
    nid === 'FRY30' ||
    nid.startsWith('FRY3') ||
    nid === 'FR_HIST_GUIANA' ||
    nrm.includes('guyane') ||
    nrm.includes('french guiana') ||
    nrm.includes('guiana francese');

  if (isGuiana) {
    return s < 6
      ? makeResult('F_COL', 'Guyane française (Cayenne)', 'Colonie de Guyane (France)', 'Alleati', 'Colonie de Guyane — Chef-lieu Cayenne')
      : makeResult('F_COL', 'Guyane française (Cayenne)', 'Administration coloniale de Vichy', 'Fantoccio', 'Colonie de Guyane — Gouverneur René Veber');
  }

  // Granularizzazione integrale del Teatro Cinese e Guerra Sino-Giapponese (1936-1940)
  if (cntr === 'CN_PROV' || nid.startsWith('CHN_') || p.REGION_KIND === 'CHINA_PROVINCE') {
    return resolveChinaProvince(s, nid, p, rawName);
  }

  // Granularizzazione e risoluzione prefetture/territori dell'Impero Giapponese (1936-1940)
  if (
    cntr === 'JP_PREF' ||
    nid.startsWith('JP_') ||
    p.REGION_KIND === 'JAPAN_PREFECTURE' ||
    (nid.startsWith('JP') && nid.length > 2)
  ) {
    const jpTop = resolveJapanToponym(nid, histName, nrm, 'JAP', s);
    return makeResult(
      'JAP',
      jpTop?.name || histName || 'Dai Nippon Teikoku (Naichi)',
      jpTop?.note || 'Prefettura o territorio metropolitano dell\'Impero Giapponese (Naichi).',
      'Asse',
      jpTop?.adminTitle || 'Dai Nippon Teikoku (Naichi)'
    );
  }

  // Repubblica Popolare di Tannu Tuva (1921-1944) — Indipendente
  const isTuva =
    cntr === 'TUV' ||
    cntr === 'XTU' ||
    nid === 'SOV_ADM1_RUS_55_Tuva' ||
    nid.includes('Tuva') ||
    nid.includes('TUV') ||
    nrm.includes('tannu tuva') ||
    nrm.includes('tannu-tuva') ||
    nrm === 'tuva' ||
    nrm.includes('tyva') ||
    (p.HISTORICAL_NAME && p.HISTORICAL_NAME.toLowerCase().includes('tuva')) ||
    (p.NUTS_NAME && p.NUTS_NAME.toLowerCase().includes('tuva'));

  if (isTuva) {
    const histName = p.HISTORICAL_NAME || p.NUTS_NAME || 'Tyva Arat Respublika (Kyzyl)';
    const adminTitle = p.ADMIN_TITLE || 'Tyva Arat Respublika (Tuvan People\'s Republic)';
    return makeResult('TUV', histName, adminTitle, 'Comintern');
  }

  switch (cntr) {
    case 'SU':
    case 'SU_CRIMEA': {
      if (nid === 'SOV_ADM1_RUS_55_Tuva' || nid.includes('Tuva') || nrm.includes('tuva') || nrm.includes('tannu')) {
        const histName = p.HISTORICAL_NAME || p.NUTS_NAME || 'Tyva Arat Respublika (Kyzyl)';
        const adminTitle = p.ADMIN_TITLE || 'Tyva Arat Respublika (Tuvan People\'s Republic)';
        return makeResult('TUV', histName, adminTitle, 'Comintern');
      }
      const histName = p.HISTORICAL_NAME || p.NUTS_NAME || rawName;
      const adminTitle = p.ADMIN_TITLE || 'SSSR (Solyuz Sovetskikh Sotsialisticheskikh Respublik)';
      return makeResult('SOV', histName, adminTitle, 'Comintern');
    }

    case 'FI_HIST':
    case 'FIN_HIST': {
      const isPetsamo = nid.includes('Petsamo') || nrm.includes('petsamo') || rawName.includes('Petsamo');
      const isSalla = nid.includes('Salla') || nid.includes('Koutero') || nrm.includes('salla') || rawName.includes('Salla') || rawName.includes('Alakurtti');
      const histName = p.HISTORICAL_NAME || p.NUTS_NAME || rawName;
      const sovName = p.SOV_NAME || (histName + ' (URSS)');

      if (isPetsamo) {
        return makeResult(
          'FIN',
          histName,
          'Suomen tasavalta — Petsamon lääni (Jäämeren yhteys, Tarton rauha 1920-1944)'
        );
      }

      if (s < 6) {
        return makeResult(
          'FIN',
          histName,
          isSalla
            ? 'Suomen tasavalta — Salla-Kuusamon alue (1920-1940)'
            : 'Suomen tasavalta — Tarton rauhan historialliset rajat (1920-1940)'
        );
      }
      return makeResult(
        'SOV',
        sovName,
        'Moskovan rauhansopimus (12. maaliskuuta 1940) — Luovutettu Neuvostoliitolle',
        'Comintern'
      );
    }

    case 'FIN_PETSAMO': {
      const histName = p.HISTORICAL_NAME || p.NUTS_NAME || 'Petsamo (Petsamon lääni / Liinahamari)';
      if (s < 6) {
        return makeResult(
          'FIN',
          histName,
          'Suomen tasavalta — Petsamon lääni (Jäämeren yhteys, Tarton rauha 1920-1944)'
        );
      }
      return makeResult(
        'FIN',
        'Petsamo (Liinahamari)',
        'Suomen tasavalta — Petsamon nikkelikaivokset ja Jäämeren käytävä (1940)'
      );
    }

    case 'FIN_KARELIA': {
      const finName = p.HISTORICAL_NAME || p.NUTS_NAME || rawName;
      const sovName = p.SOV_NAME || (finName + ' (SSSR)');
      if (s < 6) {
        return makeResult(
          'FIN',
          finName,
          'Suomen tasavalta — Tarton rauhan historialliset rajat (1920-1940)'
        );
      }
      return makeResult(
        'SOV',
        sovName,
        'Moskovan rauhansopimus (12. maaliskuuta 1940) — Luovutettu Neuvostoliitolle'
      );
    }

    case 'FIN_SALLA': {
      const finName = p.HISTORICAL_NAME || p.NUTS_NAME || 'Itä-Salla ja Alakurtti (Kuolajärvi / Märkäjärvi)';
      const sovName = p.SOV_NAME || 'Alakurtin piiri (SSSR)';
      if (s < 6) {
        return makeResult(
          'FIN',
          finName,
          'Suomen tasavalta — Salla-Kuusamon alue (1920-1940)'
        );
      }
      return makeResult(
        'SOV',
        sovName,
        'Moskovan rauhansopimus (12. maaliskuuta 1940) — Luovutettu Neuvostoliitolle'
      );
    }

    case 'SOV_MASSR':
    case 'MDA_TRANSNISTRIA': {
      const histName = p.HISTORICAL_NAME || p.NUTS_NAME || rawName;
      if (s < 6) {
        return makeResult(
          'SOV',
          histName,
          'Moldavskaya ASSR (MASSR — Ukrainskaya SSR / SSSR — Tiraspol)',
          'Comintern'
        );
      }
      return makeResult(
        'SOV',
        `${histName} — Moldavskaya SSR`,
        'Moldavskaya SSR / SSSR (2 avgusta 1940)',
        'Comintern'
      );
    }

    case 'RO_BES':
    case 'MDA_BESSARABIA': {
      const histName = p.HISTORICAL_NAME || p.NUTS_NAME || rawName;
      if (s < 6) {
        return makeResult(
          'ROM',
          histName,
          'Regatul României — Basarabia (România Mare / Tratatul de la Paris 1920)',
          'Neutrale'
        );
      }
      return makeResult(
        'SOV',
        `${histName} — Moldavskaya SSR (Basarabia)`,
        'Moldavskaya SSR (SSSR — 28 iyunya 1940)',
        'Comintern'
      );
    }

    case 'RO_BUD': {
      const histName = p.HISTORICAL_NAME || p.NUTS_NAME || rawName;
      if (s < 6) {
        return makeResult(
          'ROM',
          `${histName} (Basarabia Veche / Bugeac)`,
          'Regatul României (Județul Cetatea Albă / Ismail)',
          'Neutrale'
        );
      }
      return makeResult(
        'SOV',
        `${histName} — Ukrainskaya SSR (Izmailskaya oblast)`,
        'Prisoyedineniye k SSSR (28 iyunya 1940)',
        'Comintern'
      );
    }

    case 'RO_BUK': {
      const histName = p.HISTORICAL_NAME || p.NUTS_NAME || rawName;
      if (s < 6) {
        return makeResult(
          'ROM',
          `${histName} (Bucovina de Nord și Hotin)`,
          'Regatul României (Județul Cernăuți / Storojineț / Hotin)',
          'Neutrale'
        );
      }
      return makeResult(
        'SOV',
        `${histName} — Ukrainskaya SSR (Chernovitskaya oblast)`,
        'Prisoyedineniye k SSSR (28 iyunya 1940)',
        'Comintern'
      );
    }

    case 'DE': {
      const top = getTop('GER');
      return makeResult(
        'GER',
        top.name || rawName,
        top.note,
        undefined,
        top.adminTitle || (s === 0 ? 'Deutsches Reich' : 'Großdeutsches Reich')
      );
    }

    case 'PL': {
      // Granular Kresy Powiats (Eastern Poland, 1921-1939)
      if (nid.startsWith('PL_KRESY_') || p.REGION_KIND === 'POLISH_EASTERN_POWIAT') {
        const histName = p.HISTORICAL_NAME || p.NUTS_NAME || rawName;
        const voiv = p.VOIVODESHIP || 'Kresy Wschodnie';
        const ssr = p.SOV_SSR || 'URSS';
        if (s < 5) {
          return makeResult(
            'POL',
            histName,
            `Województwo ${voiv} (Rzeczpospolita Polska — Kresy Wschodnie)`,
            'Alleati',
            `Rzeczpospolita Polska — Województwo ${voiv}`
          );
        }
        if (nid.startsWith('PL_KRESY_LTU_')) {
          if (s === 5) {
            return makeResult(
              'LIT',
              `${histName} (Vilniaus kraštas)`,
              'Lietuvos Respublika (1939 m. spalio 10 d. sutartis)',
              undefined,
              'Lietuvos Respublika — Vilniaus kraštas'
            );
          }
          return makeResult(
            'SOV',
            `${histName} — Lietuvos TSR`,
            'SSSR (Lietuvos TSR — 1940 m. birželis)',
            'Comintern',
            'SSSR — Lietuvos TSR'
          );
        }
        return makeResult(
          'SOV',
          `${histName} — ${ssr}`,
          'Prisoyedineniye k SSSR (17 sentyabrya 1939)',
          'Comintern',
          `SSSR — ${ssr}`
        );
      }

      // Danzica (PL633)
      if (nid === 'PL633') {
        if (s < 5) {
          const top = resolvePolandToponym(nid, rawName, nrm, 'DANZIG', s);
          return makeResult(
            'DANZIG',
            top?.name || 'Freie Stadt Danzig',
            top?.note || 'Città Libera di Danzica sotto la protezione della Società delle Nazioni.',
            undefined,
            top?.adminTitle || 'Freie Stadt Danzig (Völkerbundskommissar)'
          );
        } else {
          const top = resolvePolandToponym(nid, rawName, nrm, 'GER', s);
          return makeResult(
            'GER',
            top?.name || 'Danzig (Reichsgau Danzig-Westpreußen)',
            top?.note || 'Annessione di Danzica al Reich (1 settembre 1939).',
            'Asse',
            top?.adminTitle || 'Deutsches Reich — Reichsgau Danzig-Westpreußen'
          );
        }
      }

      // Territori tedeschi pre-1939 (Bassa Slesia, Alta Slesia tedesca, Pomerania occidentale, Grenzmark, Prussia Orientale)
      // Mantengono la sovranità tedesca (GER) per tutti gli step storici
      const isPreWarGerman = (
        nid.startsWith('PL51') || // Breslau / Niederschlesien
        nid.startsWith('PL52') || // Oppeln / Oberschlesien
        nid === 'PL228' ||        // Beuthen O.S.
        nid === 'PL229' ||        // Gleiwitz O.S.
        nid.startsWith('PL42') || // Stettin / Pommern
        nid === 'PL636' ||        // Stolp / Pommern
        nid.startsWith('PL43') || // Landsberg / Grünberg / Brandenburg
        nid === 'PL411' ||        // Schneidemühl / Grenzmark
        nid.startsWith('PL62')    // Allenstein, Elbing, Lyck / Ostpreußen
      );

      if (isPreWarGerman) {
        const top = resolvePolandToponym(nid, rawName, nrm, 'GER', s);
        return makeResult(
          'GER',
          top?.name || rawName,
          top?.note || 'Territorio tedesco pre-bellico (Confini della Repubblica di Weimar / Trattato di Versailles).',
          'Asse',
          top?.adminTitle || 'Deutsches Reich'
        );
      }

      // Territori della Seconda Repubblica di Polonia pre-settembre 1939 (s < 5)
      if (s < 5) {
        const top = resolvePolandToponym(nid, rawName, nrm, 'POL', s);
        return makeResult(
          'POL',
          top?.name || rawName,
          top?.note || 'Druga Rzeczpospolita Polska (1918-1939).',
          'Alleati',
          top?.adminTitle || 'Rzeczpospolita Polska'
        );
      }

      // Settembre 1939+ (s >= 5): Partizione nazi-sovietica della Polonia
      // 1. Territori annessi all'URSS (Białystok PL841, Łomża PL842)
      if (nid === 'PL841' || nid === 'PL842') {
        const top = resolvePolandToponym(nid, rawName, nrm, 'SOV', s);
        return makeResult(
          'SOV',
          top?.name || rawName,
          top?.note || 'Invasione sovietica della Polonia (17 settembre 1939) e annessione alla RSS Bielorussa.',
          'Comintern',
          top?.adminTitle || 'SSSR — Belorusskaya SSR (Belostokskaya oblast)'
        );
      }

      // 2. Territori polacchi annessi direttamente al Reich o incorporati nel Governatorato Generale
      const top = resolvePolandToponym(nid, rawName, nrm, 'GER', s);
      return makeResult(
        'GER',
        top?.name || rawName,
        top?.note || 'Occupazione tedesca della Polonia (Generalgouvernement o annessione diretta al Reich).',
        'Asse',
        top?.adminTitle || 'Generalgouvernement / Deutsches Reich'
      );
    }

    case 'AT': {
      if (s < 1) {
        const topAus = getTop('AUS');
        return makeResult(
          'AUS',
          topAus.name || rawName,
          topAus.note || 'Republik Österreich vor dem Anschluss (Bundesstaat Österreich / Ständestaat).',
          undefined,
          topAus.adminTitle || 'Bundesstaat Österreich (Ständestaat)'
        );
      }
      const topGer = getTop('GER');
      return makeResult(
        'GER',
        topGer.name || rawName,
        topGer.note || 'Alpen- und Donau-Reichsgaue (Ostmark) nach dem Anschluss vom März 1938.',
        'Asse',
        topGer.adminTitle || 'Alpen- und Donau-Reichsgaue (Ostmark — Großdeutsches Reich)'
      );
    }

    case 'CZ': {
      const sud =
        nid.startsWith('CZ041') ||
        nid.startsWith('CZ042') ||
        nid.startsWith('CZ051') ||
        nid.startsWith('CZ052') ||
        nid.startsWith('CZ080');
      if (sud) {
        return s < 2
          ? makeResult('CZE', getTop('CZE').name, 'Sudety (Československá republika)', undefined, 'Československá republika')
          : makeResult('GER', getTop('GER').name, getTop('GER').note || 'Reichsgau Sudetenland (Münchner Abkommen)', 'Asse', getTop('GER').adminTitle || 'Reichsgau Sudetenland (Großdeutsches Reich)');
      }
      return s < 3
        ? makeResult('CZE', getTop('CZE').name, 'Československá republika (Země Česká a Moravskoslezská)', undefined, 'Československá republika')
        : makeResult('GER', getTop('GER').name || rawName, getTop('GER').note || 'Protektorat Böhmen und Mähren (März 1939)', 'Asse', getTop('GER').adminTitle || 'Protektorat Böhmen und Mähren');
    }

    case 'SK': {
      // Step 0 & 1 (Gen 1936, Mar 1938): Cecoslovacchia unita (Krajina Slovenská)
      if (s < 2) {
        const cTop = getTop('CZE');
        return makeResult('CZE', cTop.name || rawName, 'Krajina Slovenská (Československá republika)');
      }

      // Step 2+ (Ott 1938 - Giu 1940): Primo Arbitrato di Vienna (2 novembre 1938)
      // Cessione della fascia meridionale a maggioranza magiara al Regno d'Ungheria:
      // Nitra / Érsekújvár / Komárom (SK023), Košice / Kassa / Rožňava (SK042)
      const hungarian_claim = nid === 'SK023' || nid === 'SK042';
      if (hungarian_claim) {
        const hTop = getTop('HUN');
        return makeResult(
          'HUN',
          hTop.name,
          nid === 'SK023'
            ? 'Felvidék / Érsekújvár és Komárom (Primo Arbitrato di Vienna, nov 1938)'
            : 'Kassa és Abaúj-Torna (Primo Arbitrato di Vienna, nov 1938)'
        );
      }

      // Step 2 (Ottobre 1938): Periodo post-Monaco, Seconda Repubblica Cecoslovacca (Slovacchia Autonoma)
      if (s < 3) {
        const cTop = getTop('CZE');
        return makeResult('CZE', cTop.name || rawName, 'Slovenská krajina (Autonómna vláda, Druhá republika)');
      }

      // Step 3+ (Marzo 1939 - Giugno 1940): Repubblica Slovacca indipendente sotto Tiso (Stato cliente dell'Asse)
      const sTop = getTop('SLO');
      return makeResult(
        'SLO',
        sTop.name || rawName,
        'Slovenská republika (Prezident Dr. Jozef Tiso, mar 1939)'
      );
    }

    case 'HU': {
      const top = getTop('HUN');
      return makeResult('HUN', top.name, 'Magyar Királyság (Horthy Miklós)');
    }

    case 'RO':
      return makeResult('ROM', getTop('ROM').name, 'Regatul României');

    case 'MD': {
      return s < 6
        ? makeResult('ROM', getTop('ROM').name, 'Basarabia (Regatul României)')
        : makeResult('SOV', getTop('SOV').name, 'Prisoyedineniye k SSSR (1940)');
    }

    case 'BG': {
      // Dobrugia Meridionale (Cadrilater):
      // Esclusivamente Silistra (BG325 / Județul Durostor) e Dobrich (BG332 / Județul Caliacra).
      // Riacquistata dalla Bulgaria il 7 settembre 1940 col Trattato di Craiova.
      // NOTA STORICA FONDAMENTALE: Ruse (BG323) e Varna (BG331) sono e restano sempre integralmente bulgare!
      const isCadrilater =
        nid === 'BG325' ||
        nid.startsWith('BG325') ||
        nid === 'BG332' ||
        nid.startsWith('BG332') ||
        nrm === 'dobrich' ||
        nrm === 'silistra' ||
        nrm.includes('bazargic') ||
        nrm.includes('balcic') ||
        nrm.includes('cavarna') ||
        nrm.includes('kavarna') ||
        nrm.includes('durostor') ||
        nrm.includes('caliacra');
      if (isCadrilater) {
        const isSilistra = nid.startsWith('BG325') || nrm.includes('silistra') || nrm.includes('durostor');
        if (s <= 6) {
          return makeResult(
            'ROM',
            isSilistra ? 'Județul Durostor (Silistra / Cadrilater)' : 'Județul Caliacra (Bazargic-Dobrich / Balcic)',
            'Regatul României — Cadrilater (1913-1940)',
            'Neutrale'
          );
        }
      }
      return makeResult('BUL', getTop('BUL').name, 'Tsarstvo Balgariya (Tsar Boris III)');
    }

    case 'LT': {
      if (nid === 'LT023') {
        return s < 3
          ? makeResult('LIT', 'Klaipėdos kraštas (Memel)', 'Lietuvos Respublika (Autonominis Klaipėdos kraštas)')
          : makeResult('GER', 'Memelland (Reichsgau Ostpreußen)', 'Deutsches Reich (Memel-Übergabe, 22. März 1939)');
      }
      if (nid === 'LT011') {
        if (s < 5) {
          return makeResult(
            'POL',
            'Województwo Wileńskie (Wilno)',
            'Rzeczpospolita Polska — Kresy Północno-Wschodnie'
          );
        }
        if (s === 5) {
          return makeResult(
            'LIT',
            'Vilniaus apskritis (Vilnius)',
            'Lietuvos Respublika (1939 m. spalio 10 d. sutartis)'
          );
        }
        return makeResult(
          'SOV',
          'Vilnius (Lietuvos TSR)',
          'SSSR (Lietuvos TSR — 1940 m. birželis)'
        );
      }
      return s < 6
        ? makeResult('LIT', getTop('LIT').name, 'Lietuvos Respublika (Laikinoji sostinė Kaunas)')
        : makeResult('SOV', getTop('SOV').name, 'SSSR (Lietuvos TSR — 1940 m. birželis)');
    }

    case 'LV':
      return s < 6
        ? makeResult('LAT', getTop('LAT').name, 'Latvijas Republika')
        : makeResult('SOV', getTop('SOV').name, 'SSSR (Latvijas PSR — 1940. g. jūnijs)');

    case 'EE':
      return s < 6
        ? makeResult('EST', getTop('EST').name, 'Eesti Vabariik')
        : makeResult('SOV', getTop('SOV').name, 'SSSR (Eesti NSV — juuni 1940)');

    case 'FI': {
      if (
        nid === 'FI200' ||
        nrm.includes('aland') ||
        nrm.includes('a…land') ||
        nrm.includes('ahvenanmaa') ||
        rawName.includes('Åland') ||
        rawName.includes('Ã…land')
      ) {
        return makeResult(
          'FIN',
          'Ahvenanmaa / Åland (Demilitarisoitu alue)',
          'Suomen tasavalta — Ahvenanmaan itsehallintoalue. Zona demilitarizzata e neutrale garantita dalla Convenzione di Ginevra della Società delle Nazioni (1921). Divieto assoluto di installazioni militari e fortificazioni.',
          'Neutrale',
          'Ahvenanmaan itsehallintoalue / Landskapet Åland (1921)'
        );
      }
      if (nid === 'FI1B1' && s >= 6) {
        return makeResult(
          'FIN',
          getTop('FIN').name + ' (Hangon vuokra-alue)',
          'Suomen tasavalta — Hangon vuokra-alue Neuvostoliitolle (Moskovan rauha 1940)'
        );
      }
      return makeResult('FIN', getTop('FIN').name, 'Suomen tasavalta');
    }

    case 'ES': {
      // Protettorato Spagnolo del Marocco (Rif, Tetuán, Larache, Alhucemas, Nador)
      if (
        nid === 'ES_RIF' ||
        nrm.includes('spanish morocco') ||
        nrm.includes('marruecos') ||
        nrm.includes('rif') ||
        nrm.includes('tetuan') ||
        nrm.includes('tetouan') ||
        nrm.includes('larache') ||
        nrm.includes('xauen') ||
        nrm.includes('chefchaouen') ||
        nrm.includes('alhucemas') ||
        nrm.includes('sanjurjo') ||
        nrm.includes('nador') ||
        nrm.includes('yebala') ||
        nrm.includes('gomara') ||
        nrm.includes('kert') ||
        nrm.includes('lucus')
      ) {
        if (s === 0) {
          return makeResult(
            'SPR',
            'Protectorado Español de Marruecos (Zona del Rif y Yebala / Tetuán)',
            'Segunda República Española — Alta Comisaría'
          );
        }
        if (s < 3) {
          return makeResult(
            'SPA',
            'Protectorado Español de Marruecos (Zona del Rif / Tetuán)',
            'Bando Nacional — Cuna del Alzamiento del 17-18 de julio de 1936 y Ejército de África'
          );
        }
        return makeResult(
          'SPA',
          'Protectorado Español de Marruecos (Tetuán)',
          'Estado Español — Alta Comisaría de España en Marruecos / Delegación Jalifiana'
        );
      }

      // Plazas de Soberanía: Ceuta (ES63) e Melilla (ES64)
      if (nid === 'ES63' || nid === 'ES630' || nrm.includes('ceuta')) {
        const owner = s === 0 ? 'SPR' : 'SPA';
        const top = getTop(owner);
        return makeResult(owner, top.name, top.note, undefined, top.adminTitle);
      }
      if (nid === 'ES64' || nid === 'ES640' || nrm.includes('melilla')) {
        const owner = s === 0 ? 'SPR' : 'SPA';
        const top = getTop(owner);
        return makeResult(owner, top.name, top.note, undefined, top.adminTitle);
      }

      if (s === 0) {
        const top = getTop('SPR');
        return makeResult('SPR', top.name, top.note, undefined, top.adminTitle);
      }

      if (s < 3) {
        // Baleari: Minorca repubblicana fino a feb 1939; Maiorca e Ibiza franchiste con base Aviazione Legionaria
        const isMenorca =
          nid === 'ES533' ||
          nrm.includes('menorca') ||
          nrm.includes('minorca') ||
          nrm.includes('mahon') ||
          (nid.startsWith('ES53') && c[0] > 3.7 && c[1] > 39.6);

        if (isMenorca) {
          const top = getTop('SPR');
          return makeResult('SPR', top.name, top.note, undefined, top.adminTitle);
        }

        const isMallorcaOrIbiza =
          nid === 'ES531' ||
          nid === 'ES532' ||
          nrm.includes('mallorca') ||
          nrm.includes('majorca') ||
          nrm.includes('ibiza') ||
          nrm.includes('formentera') ||
          (nid.startsWith('ES53') && !isMenorca);

        if (isMallorcaOrIbiza) {
          const top = getTop('SPA');
          return makeResult('SPA', top.name, top.note, undefined, top.adminTitle);
        }

        // Step 1 (Mar 1938) & Step 2 (Ott 1938): Divisione territoriale della Penisola
        let isRep = false;
        if (nid.startsWith('ES3') || nid === 'ES30' || nid === 'ES300') {
          isRep = true; // Madrid (Fronte del Centro / ¡No pasarán!)
        } else if (nid.startsWith('ES51')) {
          isRep = true; // Catalogna (Barcellona, Girona, Lleida, Tarragona)
        } else if (nid === 'ES521' || nid === 'ES523' || nid === 'ES52') {
          isRep = true; // Valencia e Alicante
        } else if (nid === 'ES522') {
          isRep = s === 1; // Castellón: repubblicana a marzo 1938, franchista a ottobre 1938 (taglio dell'Aragona a Vinaròs)
        } else if (nid.startsWith('ES62')) {
          isRep = true; // Murcia e base navale di Cartagena
        } else if (nid === 'ES611' || nid === 'ES616') {
          isRep = true; // Almería e Jaén
        } else if (nid === 'ES421' || nid === 'ES422' || nid === 'ES423' || nid === 'ES424') {
          isRep = true; // Albacete (base Brigate Internazionali), Ciudad Real, Cuenca, Guadalajara
        } else if (nid.startsWith('ES42') && nid !== 'ES425') {
          isRep = true;
        }

        const owner = isRep ? 'SPR' : 'SPA';
        const top = getTop(owner);
        return makeResult(owner, top.name, top.note, undefined, top.adminTitle);
      }

      const top = getTop('SPA');
      return makeResult('SPA', top.name, top.note, undefined, top.adminTitle);
    }

    case 'RU':
      return makeResult('SOV', getTop('SOV').name, 'RSFSR — SSSR');

    case 'BY':
    case 'UA':
    case 'GE':
    case 'AM':
    case 'AZ':
    case 'KZ':
      return makeResult('SOV', getTop('SOV').name || ITNAMES[cntr] || 'SSSR', 'Sovetskaya Sotsialisticheskaya Respublika');

    case 'MN':
      return makeResult('MON', 'Bügd Nairamdakh Mongol Ard Uls (Ulaanbaatar)', 'Mongol Ard Uls (Komintern)', 'Comintern');

    case 'IT': {
      const top = getTop('ITA');
      return makeResult(
        'ITA',
        top.name || rawName,
        top.note,
        undefined,
        top.adminTitle || "Regno d'Italia"
      );
    }

    case 'HR': {
      // 1. Provincia di Pola (Istria Italiana - Trattato di Rapallo 1920: 100% sovranità italiana)
      if (nid === 'HR036' || nrm.includes('istarska') || nrm.includes('pula') || nrm.includes('pola')) {
        const top = getTop('ITA');
        return makeResult(
          'ITA',
          top.name || 'Provincia di Pola (Istria Italiana)',
          top.note || 'Regno d\'Italia — Provincia di Pola (Trattato di Rapallo 1920: Pola, Parenzo, Rovigno, Pisino, Albona)',
          undefined,
          top.adminTitle || 'Provincia di Pola'
        );
      }

      // 2. Primorsko-goranska (Litorale Croato e Gorski Kotar -> Jugoslavia; Fiume, Cherso e Lussino erano enclave/isole italiane)
      if (nid === 'HR031' || nrm.includes('primorsko') || nrm.includes('rijeka') || nrm.includes('fiume')) {
        return makeResult(
          'YUG',
          s >= 4 ? 'Litorale Croato e Gorski Kotar (Banovina Hrvatska)' : 'Litorale Croato e Gorski Kotar (Savska Banovina)',
          'Regno di Jugoslavia — Comprensorio di Delnice, Čabar, Vinodol e Veglia (la città di Fiume e le isole di Cherso e Lussino costituivano la Provincia italiana del Carnaro)'
        );
      }

      // 3. Zadarska (Dalmazia Settentrionale -> Jugoslavia; la città di Zara con Lagosta e Pelagosa era enclave italiana)
      if (nid === 'HR033' || nrm.includes('zadar') || nrm.includes('zara')) {
        return makeResult(
          'YUG',
          s >= 4 ? 'Dalmazia Settentrionale (Banovina Hrvatska)' : 'Dalmazia Settentrionale (Primorska Banovina)',
          'Regno di Jugoslavia — Entroterra zaratino, Benkovac e Ravni Kotari (il comune di Zara e le isole di Lagosta e Pelagosa costituivano la Provincia italiana di Zara)'
        );
      }

      // 4. Resto della Croazia (Regno di Jugoslavia: Savska/Primorska Banovina -> Banovina Hrvatska da agosto 1939)
      const yTop = getTop('YUG');
      return makeResult(
        'YUG',
        (rawName || yTop.name) + (s >= 4 ? ' (Banovina Hrvatska)' : ' (Jugoslavia)'),
        s >= 4
          ? 'Regno di Jugoslavia — Banovina Hrvatska autonoma (Accordo Cvetković-Maček, 26 ago 1939)'
          : 'Regno di Jugoslavia (Savska / Primorska Banovina)'
      );
    }

    case 'SI': {
      // 1. Gorizia / Goriška (Venezia Giulia Orientale - Trattato di Rapallo 1920: Isonzo, Tolmino, Caporetto, Idria -> Italia)
      if (nid === 'SI043' || nrm.includes('goriska') || nrm.includes('gorizia')) {
        const top = getTop('ITA');
        return makeResult(
          'ITA',
          top.name || 'Gorizia (Venezia Giulia Orientale)',
          top.note || 'Regno d\'Italia — Provincia di Gorizia (Trattato di Rapallo 1920: Caporetto, Tolmino, Idria, Aidussina e Canale d\'Isonzo)',
          undefined,
          top.adminTitle || 'Provincia di Gorizia'
        );
      }

      // 2. Obalno-kraška (Capodistria, Pirano, Isola, Sesana, Carso - Trattato di Rapallo 1920: 100% sovranità italiana)
      if (nid === 'SI044' || nrm.includes('obalno') || nrm.includes('koper') || nrm.includes('capodistria')) {
        const top = getTop('ITA');
        return makeResult(
          'ITA',
          top.name || 'Capodistria e Carso (Venezia Giulia)',
          top.note || 'Regno d\'Italia — Province di Trieste e Pola (Trattato di Rapallo 1920: Capodistria, Isola d\'Istria, Pirano e Sesana)',
          undefined,
          top.adminTitle || 'Provincia di Pola / Trieste'
        );
      }

      // 3. Primorsko-notranjska (Carniola Interna / Notranjska -> Jugoslavia con confine di frontiera a Postumia)
      if (nid === 'SI038' || nrm.includes('notranjska') || nrm.includes('postojna') || nrm.includes('postumia')) {
        return makeResult(
          'YUG',
          'Carniola Interna e Notranjska (Dravska Banovina)',
          'Regno di Jugoslavia — Dravska Banovina (la fascia confinaria con le Grotte di Postumia, San Pietro del Carso e Villa del Nevoso era presidiata dal Regno d\'Italia)'
        );
      }

      // 4. Resto della Slovenia (Dravska Banovina - Lubiana, Maribor, Celje, Kranj)
      const yTop = getTop('YUG');
      return makeResult(
        'YUG',
        (rawName || yTop.name) + ' (Dravska Banovina)',
        'Regno di Jugoslavia — Dravska Banovina (Capoluogo Lubiana / Ljubljana)'
      );
    }

    case 'BA':
    case 'BIH':
    case 'BOS': {
      if (nid === 'BABIH' || nrm.includes('federac')) {
        return makeResult(
          'YUG',
          s >= 4
            ? 'Bosnia ed Erzegovina Centrale e Occidentale (Sarajevo / Banovina Hrvatska)'
            : 'Bosnia ed Erzegovina Centrale e Occidentale (Sarajevo / Drinska Banovina)',
          s >= 4
            ? 'Regno di Jugoslavia — Comprensorio di Sarajevo e Mostar (Banovina Hrvatska autonoma e Drinska Banovina)'
            : 'Regno di Jugoslavia (Banovina della Drina e Primorska Banovina)'
        );
      }
      if (nid === 'BASRP' || nrm.includes('srpska')) {
        return makeResult(
          'YUG',
          'Repubblica Serba di Bosnia (Banja Luka e Trebinje)',
          'Regno di Jugoslavia — Vrbaska Banovina (Banja Luka) e Zetska Banovina (Trebinje)'
        );
      }
      if (nid === 'BABRC' || nrm.includes('brcko')) {
        return makeResult(
          'YUG',
          'Distretto di Brčko (Posavina)',
          'Regno di Jugoslavia — Corridoio strategico fluviale della Posavina (Brčko)'
        );
      }
      const yTop = getTop('YUG');
      return makeResult('YUG', yTop.name || rawName, 'Regno di Jugoslavia (Drinska / Vrbaska / Primorska Banovina)');
    }

    case 'RS':
    case 'SRB': {
      const yTop = getTop('YUG');
      return makeResult('YUG', yTop.name || rawName, 'Regno di Jugoslavia (Dunavska / Moravska / Drinska Banovina / Beograd)');
    }

    case 'ME':
    case 'MNE': {
      const yTop = getTop('YUG');
      return makeResult('YUG', yTop.name || rawName, 'Regno di Jugoslavia — Zetska Banovina (Cettigne)');
    }

    case 'MK':
    case 'MKD': {
      const yTop = getTop('YUG');
      return makeResult('YUG', yTop.name || rawName, 'Regno di Jugoslavia — Vardarska Banovina (Skopje)');
    }

    case 'XK':
    case 'XKX':
    case 'KO':
    case 'KV':
    case 'KOS':
    case 'YU':
    case 'YUG': {
      const yTop = getTop('YUG');
      return makeResult('YUG', yTop.name || ITNAMES[cntr] || rawName, 'Regno di Jugoslavia');
    }

    case 'AL':
      return s < 4
        ? makeResult('ALB', getTop('ALB').name, 'Mbretëria Shqiptare (Mbreti Zog I)')
        : makeResult('ITA', getTop('ITA').name, 'Regno d\'Albania (Unione Personale sotto la Corona d\'Italia)');

    case 'GR':
    case 'EL': {
      // Le Cicladi (EL422: Nasso, Andro, Paro, Milo, Santorino, ecc.) sono territorio greco dal 1830.
      // Solo il Dodecaneso (EL421: Rodi, Coo, Lero, Calino, Scarpanto, Stampalia, Castelrosso) era possedimento italiano (1912-1943).
      if (nid === 'EL422') {
        return makeResult('GRE', getTop('GRE').name || rawName, 'Regno di Grecia (Regime del 4 Agosto)');
      }

      const words = nrm.split(/[\s,–-]+/);
      const isDodecanese =
        nid === 'EL421' ||
        nrm.includes('dodecan') ||
        nrm.includes('dodekan') ||
        nrm.includes('rhodes') ||
        nrm.includes('rodi') ||
        nrm.includes('rodos') ||
        words.includes('kos') ||
        words.includes('coo') ||
        words.includes('cos') ||
        nrm.includes('leros') ||
        words.includes('lero') ||
        nrm.includes('kalymnos') ||
        nrm.includes('calino') ||
        nrm.includes('karpathos') ||
        nrm.includes('scarpanto') ||
        words.includes('kasos') ||
        words.includes('caso') ||
        nrm.includes('astypalaia') ||
        nrm.includes('stampalia') ||
        words.includes('patmos') ||
        words.includes('patmo') ||
        words.includes('symi') ||
        words.includes('simi') ||
        words.includes('tilos') ||
        words.includes('piscopi') ||
        words.includes('nisyros') ||
        words.includes('nisiro') ||
        words.includes('chalki') ||
        words.includes('calchi') ||
        words.includes('lipsi') ||
        words.includes('lipsia') ||
        nrm.includes('kastellorizo') ||
        nrm.includes('castelrosso') ||
        nrm.includes('megisti');

      if (isDodecanese) {
        const top = getTop('ITA');
        return makeResult(
          'ITA',
          top.name || 'Rodi (Isole Italiane dell\'Egeo)',
          top.note || 'Regno d\'Italia — Possedimento delle Isole Italiane dell\'Egeo (Trattato di Losanna 1923)',
          undefined,
          top.adminTitle || 'Provincia di Rodi'
        );
      }
      return makeResult('GRE', getTop('GRE').name || rawName, 'Regno di Grecia (Regime del 4 Agosto)');
    }

    case 'FR': {
      if (s < 6) {
        // Dipartimenti d'Oltremare (DOM-TOM)
        if (nid.startsWith('FRY')) {
          if (nid === 'FRY30' || nrm.includes('guyane') || nrm.includes('french guiana')) {
            const top = getTop('F_COL');
            return makeResult('F_COL', top.name || 'Guyane française (Cayenne)', top.note, 'Alleati', top.adminTitle || 'Colonie de la Guyane française');
          }
        }
        const top = getTop('FRA');
        return makeResult(
          'FRA',
          top.name || rawName,
          top.note,
          undefined,
          top.adminTitle || 'Troisième République française'
        );
      }

      // Step >= 6: Giugno 1940 (Post-Armistizio del 22 giugno 1940)
      // Dipartimenti d'Oltremare (DOM-TOM)
      if (nid.startsWith('FRY')) {
        if (nid === 'FRY30' || nrm.includes('guyane') || nrm.includes('french guiana')) {
          const top = getTop('F_COL');
          return makeResult('F_COL', top.name || 'Guyane française (Cayenne)', top.note, 'Alleati', top.adminTitle || 'Colonie de la Guyane française');
        }
        const top = getTop('VIC');
        return makeResult(
          'VIC',
          top.name || rawName,
          top.note || 'Territoire d\'outre-mer sous autorité du régime de Vichy.',
          'Fantoccio',
          top.adminTitle || 'Administration coloniale de l\'État français (Vichy)'
        );
      }

      // 1. Alsazia e Mosella (Annessione de facto al Terzo Reich)
      const isAlsaceMoselle =
        nid === 'FRF11' || // Bas-Rhin (Strasbourg)
        nid === 'FRF12' || // Haut-Rhin (Colmar)
        nid === 'FRF33' || // Moselle (Metz)
        nrm.includes('bas-rhin') ||
        nrm.includes('haut-rhin') ||
        nrm.includes('moselle') ||
        nrm.includes('strasbourg') ||
        nrm.includes('colmar') ||
        nrm.includes('metz');

      if (isAlsaceMoselle) {
        const top = getTop('GER');
        return makeResult(
          'GER',
          top.name || (rawName + ' (CdZ-Gebiet)'),
          top.note || 'Alsazia e Mosella annesse de facto al Reich (Gau Baden-Elsass / Westmark).',
          'Asse',
          top.adminTitle || 'CdZ-Gebiet (Annexion de facto au Troisième Reich)'
        );
      }

      // 2. Dipartimenti del Nord e Pas-de-Calais (Zone rattachée au commandement de Bruxelles)
      const isBrusselsCommand =
        nid === 'FRE11' || // Nord (Lille)
        nid === 'FRE12' || // Pas-de-Calais (Arras / Calais)
        nrm === 'nord' ||
        nrm.includes('pas-de-calais') ||
        nrm.includes('lille') ||
        nrm.includes('arras');

      if (isBrusselsCommand) {
        const top = getTop('GER');
        return makeResult(
          'GER',
          top.name || (rawName + ' (Militärverwaltung Belgien-Nordfrankreich)'),
          top.note || 'Comando Militare Tedesco di Bruxelles (Nord e Pas-de-Calais).',
          'Asse',
          top.adminTitle || 'Militärverwaltung in Belgien und Nordfrankreich (Alexander von Falkenhausen, Bruxelles)'
        );
      }

      // 3. Set standardizzato dei 38 Dipartimenti della Zone Libre (Vichy)
      const VICHY_NUTS_SET = new Set([
        // Auvergne & Massiccio Centrale
        'FRK11', // Allier (Sede del Governo: Vichy)
        'FRK12', // Cantal (Aurillac)
        'FRK13', // Haute-Loire (Le Puy-en-Velay)
        'FRK14', // Puy-de-Dôme (Clermont-Ferrand)
        // Limousin
        'FRI21', // Corrèze (Tulle / Brive)
        'FRI22', // Creuse (Guéret)
        'FRI23', // Haute-Vienne (Limoges)
        // Aquitaine interna
        'FRI11', // Dordogne (Périgueux)
        'FRI14', // Lot-et-Garonne (Agen)
        // Rhône-Alpes
        'FRK26', // Rhône (Lyon)
        'FRK21', // Ain (Bourg-en-Bresse)
        'FRK24', // Isère (Grenoble)
        'FRK25', // Loire (Saint-Étienne)
        'FRK22', // Ardèche (Privas)
        'FRK23', // Drôme (Valence)
        'FRK27', // Savoie (Chambéry)
        'FRK28', // Haute-Savoie (Annecy)
        // PACA (Provenza-Alpi-Costa Azzurra)
        'FRL04', // Bouches-du-Rhône (Marseille)
        'FRL05', // Var (Toulon)
        'FRL06', // Vaucluse (Avignon)
        'FRL01', // Alpes-de-Haute-Provence (Basses-Alpes / Digne)
        'FRL02', // Hautes-Alpes (Gap)
        'FRL03', // Alpes-Maritimes (Nice)
        // Occitanie (Linguadoca & Midi-Pirenei)
        'FRJ23', // Haute-Garonne (Toulouse)
        'FRJ13', // Hérault (Montpellier)
        'FRJ12', // Gard (Nîmes)
        'FRJ11', // Aude (Carcassonne)
        'FRJ15', // Pyrénées-Orientales (Perpignan)
        'FRJ21', // Ariège (Foix)
        'FRJ22', // Aveyron (Rodez)
        'FRJ24', // Gers (Auch)
        'FRJ25', // Lot (Cahors)
        'FRJ26', // Hautes-Pyrénées (Tarbes)
        'FRJ27', // Tarn (Albi)
        'FRJ28', // Tarn-et-Garonne (Montauban)
        'FRJ14', // Lozère (Mende)
        // Corse
        'FRM01', // Corse-du-Sud (Ajaccio)
        'FRM02', // Haute-Corse (Bastia)
      ]);

      let isVichyZone = false;
      if (nid && nid.startsWith('FR')) {
        isVichyZone = VICHY_NUTS_SET.has(nid);
      } else {
        // Fallback nominale sicuro tokenizzato per poligoni privi di ID NUTS
        const tokens = ' ' + rawName.toLowerCase().replace(/[^a-z0-9]/g, ' ') + ' ';
        isVichyZone =
          tokens.includes(' allier ') ||
          tokens.includes(' vichy ') ||
          tokens.includes(' puy de dome ') ||
          tokens.includes(' clermont ') ||
          tokens.includes(' cantal ') ||
          tokens.includes(' haute loire ') ||
          tokens.includes(' correze ') ||
          tokens.includes(' creuse ') ||
          tokens.includes(' haute vienne ') ||
          tokens.includes(' limoges ') ||
          tokens.includes(' dordogne ') ||
          tokens.includes(' perigueux ') ||
          tokens.includes(' lot et garonne ') ||
          tokens.includes(' agen ') ||
          tokens.includes(' rhone ') ||
          tokens.includes(' lyon ') ||
          tokens.includes(' isere ') ||
          tokens.includes(' grenoble ') ||
          (tokens.includes(' loire ') &&
            !tokens.includes(' loire atlantique ') &&
            !tokens.includes(' loire inferieure ') &&
            !tokens.includes(' indre et loire ') &&
            !tokens.includes(' maine et loire ') &&
            !tokens.includes(' saone et loire ') &&
            !tokens.includes(' loiret ')) ||
          tokens.includes(' saint etienne ') ||
          (tokens.includes(' ain ') && !tokens.includes(' maine ') && !tokens.includes(' vilaine ')) ||
          tokens.includes(' savoie ') ||
          tokens.includes(' annecy ') ||
          tokens.includes(' chambery ') ||
          tokens.includes(' bouches du rhone ') ||
          tokens.includes(' marseille ') ||
          (tokens.includes(' var ') && !tokens.includes(' bavaria ')) ||
          tokens.includes(' toulon ') ||
          tokens.includes(' vaucluse ') ||
          tokens.includes(' avignon ') ||
          tokens.includes(' alpes de haute provence ') ||
          tokens.includes(' basses alpes ') ||
          tokens.includes(' hautes alpes ') ||
          tokens.includes(' alpes maritimes ') ||
          tokens.includes(' nice ') ||
          tokens.includes(' nizza ') ||
          tokens.includes(' haute garonne ') ||
          tokens.includes(' toulouse ') ||
          tokens.includes(' herault ') ||
          tokens.includes(' montpellier ') ||
          tokens.includes(' gard ') ||
          tokens.includes(' nimes ') ||
          tokens.includes(' aude ') ||
          tokens.includes(' carcassonne ') ||
          tokens.includes(' pyrenees orientales ') ||
          tokens.includes(' perpignan ') ||
          tokens.includes(' ariege ') ||
          tokens.includes(' aveyron ') ||
          tokens.includes(' gers ') ||
          (tokens.includes(' lot ') && !tokens.includes(' lot et garonne ')) ||
          tokens.includes(' cahors ') ||
          tokens.includes(' hautes pyrenees ') ||
          tokens.includes(' tarbes ') ||
          (tokens.includes(' tarn ') && !tokens.includes(' tarn et garonne ')) ||
          tokens.includes(' tarn et garonne ') ||
          tokens.includes(' montauban ') ||
          tokens.includes(' lozere ') ||
          tokens.includes(' corse ') ||
          tokens.includes(' corsica ') ||
          tokens.includes(' ajaccio ') ||
          tokens.includes(' bastia ');
      }

      if (isVichyZone) {
        const top = getTop('VIC');
        return makeResult(
          'VIC',
          top.name || rawName,
          top.note || 'Département en Zone libre sous autorité du gouvernement de Vichy.',
          'Fantoccio',
          top.adminTitle || 'État français — Département (Zone libre)'
        );
      }

      // 4. Zone Occupée (Militärbefehlshaber in Frankreich - Parigi e Fascia Atlantica)
      const top = getTop('GER');
      return makeResult(
        'GER',
        top.name || rawName,
        top.note || 'Département en Zone occupée sous administration militaire allemande (Militärbefehlshaber in Frankreich).',
        'Asse',
        top.adminTitle || 'Zone occupée — Militärbefehlshaber in Frankreich (Hôtel Majestic, Paris)'
      );
    }

    case 'DK':
      return s < 6
        ? makeResult('DEN', rawName, 'Kongeriget Danmark', undefined, 'Kongeriget Danmark')
        : makeResult(
            'GER',
            getTop('GER').name || rawName,
            'Besetztes Dänemark unter Reichsbevollmächtigtem Cecil von Renthe-Fink (Besatzungsregime ab 9. April 1940).',
            'Asse',
            'Besetztes Dänemark (Reichsbevollmächtigter Cecil von Renthe-Fink)'
          );

    case 'NO':
      return s < 6
        ? makeResult('NOR', rawName, 'Kongeriket Norge', undefined, 'Kongeriket Norge')
        : makeResult(
            'GER',
            getTop('GER').name || rawName,
            'Reichskommissariat für die besetzten norwegischen Gebiete unter Josef Terboven (Sitz Oslo).',
            'Asse',
            'Reichskommissariat Norwegen (Reichskommissar Josef Terboven)'
          );

    case 'BE':
      return s < 6
        ? makeResult('BEL', rawName, 'Royaume de Belgique / Koninkrijk België', undefined, 'Royaume de Belgique')
        : makeResult(
            'GER',
            getTop('GER').name || rawName,
            'Militärverwaltung in Belgien und Nordfrankreich unter General Alexander von Falkenhausen (Sitz Brüssel).',
            'Asse',
            'Militärverwaltung in Belgien und Nordfrankreich'
          );

    case 'NL':
      return s < 6
        ? makeResult('HOL', rawName, 'Koninkrijk der Nederlanden', undefined, 'Koninkrijk der Nederlanden')
        : makeResult(
            'GER',
            getTop('GER').name || rawName,
            'Reichskommissariat für die besetzten niederländischen Gebiete unter Arthur Seyß-Inquart (Sitz Den Haag).',
            'Asse',
            'Reichskommissariat Niederlande (Reichskommissar Arthur Seyß-Inquart)'
          );

    case 'LU':
      return s < 6
        ? makeResult('LUX', rawName, 'Grand-Duché de Luxembourg', undefined, 'Grand-Duché de Luxembourg')
        : makeResult(
            'GER',
            'Luxemburg',
            'Chef der Zivilverwaltung Gustav Simon (Gauleiter des Gaues Moselland) — De-facto-Annexion an das Deutsche Reich.',
            'Asse',
            'CdZ-Gebiet Luxemburg (Gau Moselland)'
          );

    case 'IS':
      return s < 6
        ? makeResult('ICE', rawName, 'Konungsríkið Ísland')
        : makeResult('UK', 'Kingdom of Iceland', 'British Occupation / Operation Fork (May 1940)');

    case 'GB':
    case 'UK':
    case 'GBR':
    case 'IM':
    case 'IMN':
    case 'GBM':
    case '833':
    case 'GG':
    case 'GGY':
    case '831':
    case 'JE':
    case 'JEY':
    case '832':
    case 'XIM':
    case 'XGG':
    case 'XJE': {
      const isMan =
        cntr === 'IM' ||
        cntr === 'IMN' ||
        cntr === 'GBM' ||
        cntr === '833' ||
        cntr === 'XIM' ||
        nid.startsWith('IM') ||
        nrm.includes('isle of man') ||
        nrm.includes('isle of mann') ||
        nrm.includes('isola di man') ||
        nrm === 'man' ||
        nrm === 'mann' ||
        nrm.includes('douglas');
      const isChannel =
        cntr === 'GG' ||
        cntr === 'GGY' ||
        cntr === 'JE' ||
        cntr === 'JEY' ||
        cntr === '831' ||
        cntr === '832' ||
        cntr === 'XGG' ||
        cntr === 'XJE' ||
        nid.startsWith('GG') ||
        nid.startsWith('JE') ||
        nrm.includes('jersey') ||
        nrm.includes('guernsey') ||
        nrm.includes('channel islands') ||
        nrm.includes('isole del canale');

      if (isMan) {
        return makeResult(
          'UK',
          getTop('UK').name || 'Isola di Man (Douglas)',
          'Dipendenza della Corona Britannica (Isle of Man)'
        );
      }
      if (isChannel) {
        if (s >= 6) {
          return makeResult(
            'GER',
            'Isole del Canale (Occupazione Tedesca)',
            'Militärverwaltung Kanalinseln (giu 1940)'
          );
        }
        return makeResult(
          'UK',
          getTop('UK').name || (nrm.includes('jersey') ? 'Baliato di Jersey' : 'Baliato di Guernsey'),
          'Dipendenza della Corona Britannica (Isole del Canale)'
        );
      }

      return makeResult('UK', getTop('UK').name || rawName, 'Regno Unito');
    }

    case 'IE':
      return makeResult('IRE', rawName, 'Irlanda (Éire) — Neutrale');

    case 'CH':
      return makeResult('SWI', rawName, 'Confederazione Svizzera');

    case 'PT':
      return makeResult('POR', rawName, 'Portogallo (Estado Novo)');

    case 'SE':
      return makeResult('SWE', rawName, 'Svezia — Neutrale');

    case 'TR':
    case 'TUR':
    case '792':
    case 'XTR': {
      if (
        nid === 'TR631' ||
        nid.startsWith('TR631') ||
        nrm.includes('hatay') ||
        nrm.includes('alexandretta') ||
        nrm.includes('iskenderun') ||
        nrm.includes('antakya')
      ) {
        return resolveHatay(s, rawName);
      }
      return makeResult('TUR', getTop('TUR').name || rawName || 'Repubblica di Turchia', 'Repubblica di Turchia');
    }

    case 'LI':
      return makeResult('SWI', 'Liechtenstein', 'Neutrale (Unione Doganale con la Svizzera)');

    // Americhe
    case 'BR':
    case 'BRA':
    case '076':
    case 'XBR':
      return makeResult('BRA', getTop('BRA').name, 'Stati Uniti del Brasile (Estado Novo)');
    case 'AR':
    case 'ARG':
    case '032':
    case 'XAR':
      return makeResult('ARG', getTop('ARG').name, 'Repubblica Argentina');
    case 'CL':
    case 'CHL':
    case '152':
    case 'XCL':
      return makeResult('CHL', getTop('CHL').name, 'Repubblica del Cile');
    case 'PE':
    case 'PER':
    case 'PRU':
    case '604':
    case 'XPE':
      return makeResult('PRU', getTop('PRU').name, 'Repubblica Peruviana');
    case 'CO':
    case 'COL':
    case '170':
    case 'XCO':
      return makeResult('COL', getTop('COL').name, 'Repubblica di Colombia');
    case 'VE':
    case 'VEN':
    case '862':
    case 'XVE':
      return makeResult('VEN', getTop('VEN').name, 'Stati Uniti del Venezuela');
    case 'EC':
    case 'ECU':
    case '218':
    case 'XEC':
      return makeResult('ECU', getTop('ECU').name, 'Repubblica dell\'Ecuador');
    case 'BO':
    case 'BOL':
    case '068':
    case 'XBO':
      return makeResult('BOL', getTop('BOL').name, 'Repubblica di Bolivia');
    case 'PAR':
    case 'PY':
    case 'PRY':
    case '600':
    case 'XPY':
      return makeResult('PAR', getTop('PAR').name, 'Repubblica del Paraguay');
    case 'UY':
    case 'URY':
    case 'URU':
    case '858':
    case 'XUY':
      return makeResult('URU', getTop('URU').name, 'Repubblica Orientale dell\'Uruguay');

    // Centro America & Caraibi
    case 'GT':
    case 'GTM':
    case '320':
    case 'XGT':
      return makeResult('GTM', getTop('GTM').name || 'Repubblica del Guatemala', 'Presidenza del Gen. Jorge Ubico');

    case 'SV':
    case 'SLV':
    case '222':
    case 'XSV':
      return makeResult('SLV', getTop('SLV').name || 'Repubblica di El Salvador', 'Governo del Gen. Maximiliano Hernández Martínez');

    case 'HN':
    case 'HND':
    case '340':
    case 'XHN':
      return makeResult('HND', getTop('HND').name || 'Repubblica dell\'Honduras', 'Presidenza del Gen. Tiburcio Carías Andino (El Cariato)');

    case 'NI':
    case 'NIC':
    case '558':
    case 'XNI':
      return makeResult('NIC', getTop('NIC').name || 'Repubblica del Nicaragua', 'Governo del Gen. Anastasio Somoza García');

    case 'CR':
    case 'CRI':
    case '188':
    case 'XCR':
      return makeResult('CRI', getTop('CRI').name || 'Repubblica di Costa Rica', 'Repubblica Costituzionale di Costa Rica');

    case 'PA':
    case 'PAN':
    case '591':
    case 'XPA':
    case 'PZ':
    case 'PCZ':
    case '590': {
      const isCanalZone =
        cntr === 'PZ' ||
        cntr === 'PCZ' ||
        cntr === '590' ||
        nrm.includes('canal') ||
        nrm.includes('balboa') ||
        nrm.includes('cristobal') ||
        nrm.includes('quarry');
      if (isCanalZone) {
        return makeResult('USA', 'Zona del Canale di Panama (USA)', 'Territorio Strategico USA (Trattato Hay-Bunau-Varilla)');
      }
      return makeResult('PAN', getTop('PAN').name || 'Repubblica di Panama', 'Repubblica di Panama');
    }

    case 'CU':
    case 'CUB':
    case '192':
    case 'XCU': {
      if (nrm.includes('guantanamo')) {
        return makeResult('USA', 'Base Navale USA di Guantánamo', 'Base Navale USA a Cuba');
      }
      return makeResult('CUB', getTop('CUB').name || 'Repubblica di Cuba', 'Repubblica di Cuba');
    }

    case 'DO':
    case 'DOM':
    case '214':
    case 'XDO':
      return makeResult('DOM', getTop('DOM').name || 'Repubblica Dominicana', 'Dittatura del Generalissimo Trujillo');

    case 'HT':
    case 'HTI':
    case 'HAI':
    case '332':
    case 'XHT':
      return makeResult('HAI', getTop('HAI').name || 'Repubblica di Haiti', 'Présidence Sténio Vincent');

    case 'BZ':
    case 'BLZ':
    case '084':
    case 'XBZ':
      return makeResult('UK', 'Honduras Britannico (Belize)', 'Colonia della Corona Britannica');

    // Medio Oriente & Asia
    case 'IR':
    case 'IRN':
    case '364':
    case 'XIR':
      return makeResult('IRN', getTop('IRN').name || 'Impero dell\'Iran (Persia)', 'Impero dell\'Iran (Persia)');
    case 'SA':
    case 'SAU':
    case '682':
    case 'XSA':
    case 'KSA':
    case 'NT':
    case 'NTZ':
    case '536':
    case 'XNT':
      return makeResult('SAU', getTop('SAU').name || rawName || 'Regno dell\'Arabia Saudita', 'Regno dell\'Arabia Saudita');
    case 'AF':
    case 'AFG':
    case '004':
      return makeResult('AFG', getTop('AFG').name, 'Regno dell\'Afghanistan');
    case 'NP':
    case 'NPL':
    case '524':
    case 'XNP':
    case 'NEP':
      return makeResult('NEP', getTop('NEP').name || 'Regno del Nepal', 'Regno del Nepal (Dinastia Shah / Primi Ministri Rana)');
    case 'BT':
    case 'BTN':
    case '064':
    case 'XBT':
    case 'BHU':
      return makeResult('BHU', getTop('BHU').name || 'Regno del Bhutan', 'Regno del Bhutan (Druk Yul — Dinastia Wangchuck)');
    case 'TH':
    case 'THA':
    case '764':
    case 'SIA':
      return makeResult('SIA', getTop('SIA').name, 'Regno del Siam (Thailandia)');
    case 'TUV':
    case 'XTU': {
      const histName = p.HISTORICAL_NAME || p.NUTS_NAME || getTop('TUV').name || 'Repubblica Popolare di Tannu Tuva';
      const adminTitle = p.ADMIN_TITLE || 'Repubblica Popolare di Tannu Tuva (Stato socialista indipendente alleato dell\'URSS fino al 1944)';
      return makeResult('TUV', histName, adminTitle, 'Comintern');
    }
    case 'JP':
    case 'JPN':
    case '392': {
      const jpTop = resolveJapanToponym(nid, histName, nrm, 'JAP', s);
      return makeResult(
        'JAP',
        jpTop?.name || 'Dai Nippon Teikoku (Naichi)',
        jpTop?.note || 'Impero del Grande Giappone — Territorio Metropolitano (Naichi)',
        'Asse',
        jpTop?.adminTitle || 'Dai Nippon Teikoku (Naichi)'
      );
    }
    case 'KR':
    case 'KOR':
    case 'KP':
    case 'PRK':
    case '410':
    case '408': {
      const jpTop = resolveJapanToponym('JP_CHOSEN', histName, 'chosen_korea', 'JAP', s);
      return makeResult(
        'JAP',
        jpTop?.name || 'Chōsen (Chōsen Sōtokufu — Keijō)',
        jpTop?.note || 'Possedimento coloniale dell\'Impero Giapponese sotto il Governatore Generale (Chōsen Sōtokufu) a Keijō.',
        'Asse',
        jpTop?.adminTitle || 'Dai Nippon Teikoku — Chōsen Sōtokufu'
      );
    }
    case 'TW':
    case 'TWN':
    case '158': {
      const jpTop = resolveJapanToponym('JP_TAIWAN', histName, 'taiwan_formosa', 'JAP', s);
      return makeResult(
        'JAP',
        jpTop?.name || 'Taiwan (Taiwan Sōtokufu — Taihoku)',
        jpTop?.note || 'Territorio d\'oltremare dell\'Impero Giapponese sotto il Governatore Generale a Taihoku.',
        'Asse',
        jpTop?.adminTitle || 'Dai Nippon Teikoku — Taiwan Sōtokufu'
      );
    }
    case 'MH':
    case 'MHL':
    case '584':
    case 'FM':
    case 'FSM':
    case '583':
    case 'PW':
    case 'PLW':
    case '585':
    case 'MP':
    case 'MNP': {
      const jpTop = resolveJapanToponym('JP_NANYO', histName, 'nanyo_gunto', 'JAP', s);
      return makeResult(
        'JAP',
        jpTop?.name || "Nan'yō Guntō (Nan'yō-chō)",
        jpTop?.note || "Mandato delle Isole del Pacifico meridionale della Società delle Nazioni sotto amministrazione del Nan'yō-chō.",
        'Asse',
        jpTop?.adminTitle || "Dai Nippon Teikoku — Nan'yō-chō"
      );
    }
    case 'CN':
      return s >= 1 && c[0] > 113
        ? makeResult('JAP', getTop('JAP').name, 'Occupazione Militare Giapponese', 'Asse', 'Dai Nippon Teikoku Kōgun Senryōchi')
        : makeResult('CHI', getTop('CHI').name, 'Repubblica di Cina (KMT)', 'Alleati', s >= 2 ? 'Zhōnghuá Mínguó Guómín Zhèngfǔ (Péidū Chongqing)' : 'Zhōnghuá Mínguó Guómín Zhèngfǔ (Nanjing)');
    case 'CA':
      return makeResult('CAN', getTop('CAN').name, 'Dominion del Canada');
    case 'AU':
      return makeResult('AST', getTop('AST').name, 'Commonwealth d\'Australia');
    case 'NZ':
      return makeResult('NZL', getTop('NZL').name, 'Dominion della Nuova Zelanda');
    case 'ZA':
      return makeResult('SAF', getTop('SAF').name, 'Unione Sudafricana');
    case 'IN':
    case 'PK':
    case 'BD':
      return makeResult('RAJ', getTop('RAJ').name, 'Impero Anglo-Indiano (British Raj)');
    case 'PH':
    case 'PHL':
    case '608':
    case 'XPH':
      return makeResult('PHL', getTop('PHL').name || 'Commonwealth delle Filippine', 'Commonwealth delle Filippine (Stato Autonomo Associato agli USA)');

    case 'YE':
    case 'YEM':
    case '887':
      return makeResult('YEM', 'Regno Mutawakkilita dello Yemen / Aden');
    case 'IQ':
    case 'IRQ':
    case '368':
    case 'XIQ':
      return makeResult('UK', 'Regno dell\'Iraq (Mesopotamia Britannica)', 'Sfera d\'Influenza e Mandato Britannico');
    case 'EG':
    case 'EGY':
    case '818':
      return makeResult('UK', 'Regno d\'Egitto', 'Sfera Britannica (Trattato 1936)');
    case 'JO':
    case 'JOR':
    case '400':
      return makeResult('UK', 'Emirato di Transgiordania', 'Mandato Britannico');
    case 'IL':
    case 'ISR':
    case '376':
    case 'PS':
    case 'PSE':
    case '275':
      return makeResult('UK', 'Mandato di Palestina', 'Mandato Britannico');
    case 'KW':
    case 'KWT':
    case '414':
    case 'QA':
    case 'QAT':
    case '634':
    case 'AE':
    case 'ARE':
    case '784':
    case 'OM':
    case 'OMN':
    case '512':
    case 'BH':
    case 'BHR':
    case '048':
      return makeResult('UK', 'Protettorati Britannici del Golfo');
    case 'SY':
    case 'SYR':
    case '760':
    case 'XSY':
      return s < 6
        ? makeResult('F_SYR', 'Mandato Francese di Siria')
        : makeResult('F_SYR', 'Mandato Francese di Siria', 'Amministrazione di Vichy', 'Fantoccio');
    case 'LB':
    case 'LBN':
    case '422':
    case 'XLB':
      return s < 6
        ? makeResult('F_SYR', 'Mandato Francese del Libano')
        : makeResult('F_SYR', 'Mandato Francese del Libano', 'Amministrazione di Vichy', 'Fantoccio');

    case 'LR':
    case 'LBR':
    case '430':
    case 'XLR':
      return makeResult('LBR', getTop('LBR').name || 'Repubblica di Liberia', 'Stato Indipendente Africano');
    case 'ET':
      return s === 0
        ? makeResult('ETH', 'Impero d\'Etiopia', 'Guerra d\'Etiopia in corso')
        : makeResult('ITA', 'Africa Orientale Italiana (Etiopia)', 'Annessa al Regno d\'Italia (maggio 1936)');

    case 'GY':
      return makeResult('UK', 'Guiana Britannica');
    case 'SR':
      return makeResult('HOL', 'Guiana Olandese (Suriname)', undefined, s >= 6 ? 'Alleati' : 'Neutrale');
    case 'GF':
      return s < 6
        ? makeResult('F_COL', 'Guiana Francese')
        : makeResult('F_COL', 'Guiana Francese', 'Amministrazione di Vichy', 'Fantoccio');

    case 'EH':
      return makeResult(
        s === 0 ? 'SPR' : 'SPA',
        'Sahara Spagnolo (Río de Oro)',
        s === 0 ? 'Fronte Popolare' : 'Bando Nacional'
      );
    case 'GQ':
      return makeResult(
        s === 0 ? 'SPR' : 'SPA',
        'Guinea Spagnola',
        s === 0 ? 'Fronte Popolare' : 'Bando Nacional'
      );

    default: {
      // Isola di Man (Isle of Man) & Isole del Canale (Channel Islands)
      if (
        nrm.includes('isle of man') ||
        nrm.includes('isle of mann') ||
        nrm === 'man' ||
        nrm === 'mann' ||
        nrm.includes('isola di man') ||
        nrm.includes('douglas') ||
        nid.startsWith('IM') ||
        (c[1] >= 53.95 && c[1] <= 54.55 && c[0] >= -4.95 && c[0] <= -4.2)
      ) {
        return makeResult(
          'UK',
          getTop('UK').name || 'Isola di Man (Douglas)',
          'Dipendenza della Corona Britannica (Isle of Man)'
        );
      }

      if (
        nrm.includes('jersey') ||
        nrm.includes('guernsey') ||
        nrm.includes('channel islands') ||
        nrm.includes('isole del canale') ||
        nid.startsWith('GG') ||
        nid.startsWith('JE') ||
        (c[1] >= 49.1 && c[1] <= 49.8 && c[0] >= -2.8 && c[0] <= -1.8)
      ) {
        if (s >= 6) {
          return makeResult(
            'GER',
            'Isole del Canale (Occupazione Tedesca)',
            'Militärverwaltung Kanalinseln (giu 1940)'
          );
        }
        return makeResult(
          'UK',
          getTop('UK').name || 'Isole del Canale',
          'Dipendenza della Corona Britannica'
        );
      }

      if (
        nrm.includes('kosov') ||
        nrm.includes('kosova') ||
        nrm.includes('metohij') ||
        nrm.includes('bosn') ||
        nrm.includes('herzegov') ||
        nrm.includes('hercegov') ||
        nrm.includes('yugoslav') ||
        nrm.includes('jugoslav') ||
        nrm.includes('sarajevo') ||
        nrm.includes('banja luka') ||
        nrm.includes('pristina') ||
        nrm.includes('prizren') ||
        nrm.includes('srpska') ||
        nid.startsWith('BA') ||
        nid.startsWith('XK') ||
        nid.startsWith('KO') ||
        nid.startsWith('KV')
      ) {
        return makeResult('YUG', getTop('YUG').name || rawName, 'Regno di Jugoslavia');
      }

      if (
        nrm.includes('philippin') ||
        nrm.includes('filippin') ||
        nrm.includes('manila') ||
        nrm.includes('luzon') ||
        nrm.includes('mindanao') ||
        nrm.includes('visayas') ||
        nid.startsWith('PH')
      ) {
        return makeResult('PHL', getTop('PHL').name || 'Commonwealth delle Filippine', 'Commonwealth delle Filippine (Stato Autonomo Associato agli USA)');
      }

      if (
        nrm.includes('tannu') ||
        nrm.includes('tuva') ||
        nrm.includes('kyzyl') ||
        nrm.includes('khem-beldir') ||
        nrm.includes('khem beldir') ||
        nid.includes('TUV')
      ) {
        return makeResult('TUV', getTop('TUV').name || 'Repubblica Popolare di Tannu Tuva', 'Repubblica Popolare di Tannu Tuva (Stato indipendente alleato dell\'URSS)', 'Comintern');
      }

      if (
        nrm.includes('liberia') ||
        nrm.includes('monrovia') ||
        nid.includes('LBR') ||
        nid === 'LR'
      ) {
        return makeResult('LBR', getTop('LBR').name || 'Repubblica di Liberia', 'Stato Indipendente Africano');
      }

      // Risoluzione esplicita Vicino Oriente / Turchia / Arabia / Persia / Mesopotamia
      if (
        nrm.includes('hatay') ||
        nrm.includes('alexandretta') ||
        nrm.includes('iskenderun') ||
        nrm.includes('antakya')
      ) {
        return resolveHatay(s, rawName);
      }

      if (
        nrm.includes('turkey') ||
        nrm.includes('turkiye') ||
        nrm.includes('turchia') ||
        nrm.includes('anatolia') ||
        nid.startsWith('TR')
      ) {
        return makeResult('TUR', getTop('TUR').name || rawName || 'Repubblica di Turchia', 'Repubblica di Turchia');
      }

      if (
        nrm.includes('saudi') ||
        nrm.includes('saudite') ||
        nrm.includes('arabia saudita') ||
        nrm.includes('mamlakah') ||
        nrm.includes('nejd') ||
        nrm.includes('najd') ||
        nrm.includes('hejaz') ||
        nrm.includes('hedjaz') ||
        nrm.includes('hijaz') ||
        nrm.includes('asir') ||
        nrm.includes('aseer') ||
        nrm.includes('al-hasa') ||
        nrm.includes('al-ahsa') ||
        nrm.includes('el hasa') ||
        nrm.includes('eastern province') ||
        nrm.includes('ash sharqiyah') ||
        nrm.includes('riyadh') ||
        nrm.includes('ar riyad') ||
        nrm.includes('mecca') ||
        nrm.includes('makkah') ||
        nrm.includes('medina') ||
        nrm.includes('madinah') ||
        nrm.includes('jeddah') ||
        nrm.includes('jidda') ||
        nrm.includes('taif') ||
        nrm.includes('dhahran') ||
        nrm.includes('dammam') ||
        nrm.includes('khobar') ||
        nrm.includes('jubail') ||
        nrm.includes('qatif') ||
        nrm.includes('hofuf') ||
        nrm.includes('hail') ||
        nrm.includes('shammar') ||
        nrm.includes('jawf') ||
        nrm.includes('sakaka') ||
        nrm.includes('tabuk') ||
        nrm.includes('qassim') ||
        nrm.includes('gassim') ||
        nrm.includes('buraidah') ||
        nrm.includes('unaizah') ||
        nrm.includes('jizan') ||
        nrm.includes('jazan') ||
        nrm.includes('najran') ||
        nrm.includes('al bahah') ||
        nrm.includes('rub al khali') ||
        nrm.includes('rub\' al khali') ||
        nrm.includes('empty quarter') ||
        nrm.includes('quarto vuoto') ||
        nrm.includes('saudi-iraqi') ||
        nrm.includes('saudi-kuwait') ||
        (nrm.includes('neutral zone') && !nrm.includes('tanger')) ||
        (nrm.includes('zona neutrale') && !nrm.includes('tangeri')) ||
        nid.startsWith('SA') ||
        nid.startsWith('NT') ||
        nid === 'SAU' ||
        nid === 'KSA' ||
        nid === '682' ||
        nid === '536'
      ) {
        return makeResult('SAU', getTop('SAU').name || rawName || 'Regno dell\'Arabia Saudita', 'Regno dell\'Arabia Saudita');
      }

      if (
        nrm.includes('iran') ||
        nrm.includes('persia') ||
        nrm.includes('tehran') ||
        nrm.includes('isfahan') ||
        nrm.includes('tabriz') ||
        nid.startsWith('IR')
      ) {
        return makeResult('IRN', getTop('IRN').name || rawName || 'Impero dell\'Iran (Persia)', 'Impero dell\'Iran (Persia)');
      }

      if (
        (nrm.includes('mesopotam') ||
          nrm.includes('iraq') ||
          nrm.includes('irak') ||
          nrm.includes('baghdad') ||
          nrm.includes('basra') ||
          nrm.includes('mosul') ||
          nrm.includes('kirkuk') ||
          nid.startsWith('IQ')) &&
        !nrm.includes('turk') &&
        !nrm.includes('saudi') &&
        !nrm.includes('syria') &&
        !nrm.includes('iran')
      ) {
        return makeResult('UK', 'Regno dell\'Iraq (Mesopotamia Britannica)', 'Sfera d\'Influenza e Mandato Britannico');
      }

      // Risoluzione esplicita Centro America e Caraibi per nome e codice
      if (
        nrm.includes('guatemala') ||
        nrm.includes('peten') ||
        nrm.includes('quetzaltenango') ||
        nrm.includes('izabal') ||
        nid.startsWith('GT')
      ) {
        return makeResult('GTM', getTop('GTM').name || 'Repubblica del Guatemala', 'Presidenza del Gen. Jorge Ubico');
      }

      if (
        nrm.includes('el salvador') ||
        nrm.includes('salvador') ||
        nrm.includes('san salvador') ||
        nrm.includes('santa ana') ||
        nrm.includes('san miguel') ||
        nid.startsWith('SV')
      ) {
        return makeResult('SLV', getTop('SLV').name || 'Repubblica di El Salvador', 'Governo del Gen. Maximiliano Hernández Martínez');
      }

      if (
        nrm.includes('honduras') ||
        nrm.includes('tegucigalpa') ||
        nrm.includes('san pedro sula') ||
        nrm.includes('cortes') ||
        nrm.includes('choluteca') ||
        nrm.includes('olanch') ||
        nid.startsWith('HN')
      ) {
        if (nrm.includes('british') || nrm.includes('belize')) {
          return makeResult('UK', 'Honduras Britannico (Belize)', 'Colonia della Corona Britannica');
        }
        return makeResult('HND', getTop('HND').name || 'Repubblica dell\'Honduras', 'Presidenza del Gen. Tiburcio Carías Andino (El Cariato)');
      }

      if (
        nrm.includes('nicaragua') ||
        nrm.includes('managua') ||
        nrm.includes('leon') ||
        nrm.includes('granada') ||
        nrm.includes('matagalpa') ||
        nrm.includes('chinandega') ||
        nid.startsWith('NI')
      ) {
        return makeResult('NIC', getTop('NIC').name || 'Repubblica del Nicaragua', 'Governo del Gen. Anastasio Somoza García');
      }

      if (
        nrm.includes('costa rica') ||
        nrm.includes('san jose') ||
        nrm.includes('alajuela') ||
        nrm.includes('cartago') ||
        nrm.includes('heredia') ||
        nrm.includes('guanacaste') ||
        nrm.includes('puntarenas') ||
        nrm.includes('limon') ||
        nid.startsWith('CR')
      ) {
        return makeResult('CRI', getTop('CRI').name || 'Repubblica di Costa Rica', 'Repubblica Costituzionale di Costa Rica');
      }

      if (
        nrm.includes('canal zone') ||
        nrm.includes('panama canal') ||
        nrm.includes('balboa') ||
        nrm.includes('cristobal') ||
        nrm.includes('zona del canal') ||
        nid.startsWith('PZ')
      ) {
        return makeResult('USA', 'Zona del Canale di Panama (USA)', 'Territorio Strategico USA (Trattato Hay-Bunau-Varilla)');
      }

      if (
        nrm.includes('panama') ||
        nrm.includes('panama city') ||
        nrm.includes('chiriqui') ||
        nrm.includes('veraguas') ||
        nrm.includes('cocle') ||
        nrm.includes('colon') ||
        nrm.includes('darien') ||
        nid.startsWith('PA')
      ) {
        return makeResult('PAN', getTop('PAN').name || 'Repubblica di Panama', 'Repubblica di Panama');
      }

      if (
        nrm.includes('cuba') ||
        nrm.includes('havana') ||
        nrm.includes('habana') ||
        nrm.includes('santiago de cuba') ||
        nrm.includes('camaguey') ||
        nrm.includes('matanzas') ||
        nrm.includes('santa clara') ||
        nrm.includes('pinar del rio') ||
        nid.startsWith('CU')
      ) {
        if (nrm.includes('guantanamo')) {
          return makeResult('USA', 'Base Navale USA di Guantánamo', 'Base Navale USA a Cuba');
        }
        return makeResult('CUB', getTop('CUB').name || 'Repubblica di Cuba', 'Repubblica di Cuba');
      }

      if (
        nrm.includes('dominican') ||
        nrm.includes('dominicana') ||
        nrm.includes('santo domingo') ||
        nrm.includes('ciudad trujillo') ||
        nrm.includes('santiago de los caballeros') ||
        nid.startsWith('DO')
      ) {
        return makeResult('DOM', getTop('DOM').name || 'Repubblica Dominicana', 'Dittatura del Generalissimo Trujillo');
      }

      if (
        nrm.includes('haiti') ||
        nrm.includes('haïti') ||
        nrm.includes('port-au-prince') ||
        nrm.includes('cap-haitien') ||
        nid.startsWith('HT')
      ) {
        return makeResult('HAI', getTop('HAI').name || 'Repubblica di Haiti', 'Présidence Sténio Vincent');
      }

      if (
        nrm.includes('belize') ||
        nrm.includes('british honduras') ||
        nid.startsWith('BZ')
      ) {
        return makeResult('UK', 'Honduras Britannico (Belize)', 'Colonia della Corona Britannica');
      }

      // Risoluzione esplicita territori africani per nome
      if (
        nrm.includes('guinea-bissau') ||
        nrm.includes('guinea bissau') ||
        nrm.includes('guine-bissau') ||
        nrm.includes('guine bissau') ||
        nrm.includes('guine portuguesa') ||
        nrm.includes('bissau') ||
        nrm.includes('angola') ||
        nrm.includes('mozambique') ||
        nrm.includes('cabo verde') ||
        nrm.includes('cape verde') ||
        nrm.includes('sao tome')
      ) {
        return makeResult('POR', getTop('POR').name || rawName, 'Province d\'Oltremare Portoghesi');
      }

      if (
        nrm.includes('malawi') ||
        nrm.includes('nyasaland') ||
        nrm.includes('nyassa') ||
        nrm.includes('zambia') ||
        nrm.includes('northern rhodesia') ||
        nrm.includes('zimbabwe') ||
        nrm.includes('southern rhodesia') ||
        (nrm.includes('rhodesia') && !nrm.includes('rhodes ')) ||
        nrm.includes('botswana') ||
        nrm.includes('bechuanaland') ||
        nrm.includes('lesotho') ||
        nrm.includes('basutoland') ||
        nrm.includes('swaziland') ||
        nrm.includes('eswatini') ||
        nrm.includes('kenya') ||
        nrm.includes('uganda') ||
        nrm.includes('tanganyika') ||
        nrm.includes('tanzania') ||
        nrm.includes('zanzibar') ||
        nrm.includes('ghana') ||
        nrm.includes('gold coast') ||
        nrm.includes('nigeria') ||
        nrm.includes('sierra leone') ||
        nrm.includes('gambia') ||
        (nrm.includes('sudan') && !nrm.includes('french') && !nrm.includes('soudan')) ||
        nrm.includes('british somaliland')
      ) {
        return makeResult('UK', getTop('UK').name || rawName, 'Impero Britannico in Africa');
      }

      // Risoluzione Nordafrica Francese (Algeria, Marocco, Tunisia)
      if (
        nrm.includes('algeria') ||
        nrm.includes('algérie') ||
        nrm.includes('algiers') ||
        nrm.includes('alger') ||
        nrm.includes('oran') ||
        nrm.includes('constantine') ||
        (nrm.includes('morocco') && !nrm.includes('spanish morocco') && !nrm.includes('maroc espagnol') && !nrm.includes('rif')) ||
        (nrm.includes('maroc') && !nrm.includes('espagnol') && !nrm.includes('rif')) ||
        nrm.includes('tunisia') ||
        nrm.includes('tunisie') ||
        nrm.includes('bizerte')
      ) {
        if (s >= 6) {
          const top = getTop('VIC_NAF');
          return makeResult(
            'VIC_NAF',
            top.name || (rawName ? `${rawName} (Vichy)` : 'Nordafrica Francese (Vichy)'),
            'Nordafrica Francese — Regime di Vichy',
            'Fantoccio'
          );
        }
        const top = getTop('F_NAF');
        return makeResult(
          'F_NAF',
          top.name || rawName || 'Nordafrica Francese',
          'Nordafrica Francese (AFN)'
        );
      }

      if (
        nrm.includes('togo') ||
        nrm.includes('togoland') ||
        nrm.includes('senegal') ||
        nrm.includes('mauritania') ||
        nrm.includes('french sudan') ||
        nrm.includes('soudan') ||
        nrm.includes('upper volta') ||
        nrm.includes('haute-volta') ||
        nrm.includes('burkina') ||
        nrm.includes('ivory coast') ||
        nrm.includes('cote d\'ivoire') ||
        nrm.includes('french guinea') ||
        (nrm.includes('guinea') &&
          !nrm.includes('bissau') &&
          !nrm.includes('portuguese') &&
          !nrm.includes('spanish') &&
          !nrm.includes('equatorial') &&
          !nrm.includes('new guinea')) ||
        nrm.includes('dahomey') ||
        nrm.includes('benin') ||
        (nrm.includes('niger') && !nrm.includes('nigeria')) ||
        nrm.includes('aof')
      ) {
        if (s >= 6) {
          const top = getTop('VIC_AOF');
          return makeResult(
            'VIC_AOF',
            top.name || (rawName ? `${rawName} (AOF — Vichy)` : 'Africa Occidentale Francese (AOF — Vichy)'),
            'Alto Commissariato di Pierre Boisson (Vichy)',
            'Fantoccio'
          );
        }
        const top = getTop('F_AOF');
        return makeResult(
          'F_AOF',
          top.name || rawName || 'Africa Occidentale Francese (AOF)',
          'Africa Occidentale Francese (AOF)'
        );
      }

      if (
        nrm.includes('chad') ||
        nrm.includes('tchad') ||
        nrm.includes('cameroon') ||
        nrm.includes('cameroun') ||
        nrm.includes('central african') ||
        nrm.includes('centrafrique') ||
        nrm.includes('ubangi') ||
        nrm.includes('oubangui') ||
        nrm.includes('moyen-congo') ||
        nrm.includes('middle congo') ||
        (nrm.includes('gabon') && !nrm.includes('gabriel')) ||
        nrm.includes('aef')
      ) {
        if (s >= 6) {
          const top = getTop('FFL_AEF');
          return makeResult(
            'FFL_AEF',
            top.name || (rawName ? `${rawName} (Francia Libera)` : 'Africa Equatoriale (Francia Libera)'),
            'Francia Libera — De Gaulle & Félix Éboué (Brazzaville)',
            'Alleati'
          );
        }
        const top = getTop('F_AEF');
        return makeResult(
          'F_AEF',
          top.name || rawName || 'Africa Equatoriale Francese (AEF)',
          'Africa Equatoriale Francese (AEF)'
        );
      }

      if (
        nrm.includes('belgian congo') ||
        nrm.includes('congo belge') ||
        nrm.includes('kinshasa') ||
        nrm.includes('leopoldville') ||
        nrm.includes('zaire') ||
        nrm.includes('democratic republic of the congo') ||
        nrm.includes('rwanda') ||
        nrm.includes('burundi') ||
        nrm.includes('ruanda') ||
        nrm.includes('urundi')
      ) {
        return makeResult(
          'BEL',
          getTop('BEL').name || rawName,
          'Impero Coloniale Belga',
          s >= 6 ? 'Alleati' : 'Neutrale'
        );
      }

      if (
        nrm.includes('namibia') ||
        nrm.includes('south west africa') ||
        nrm.includes('south-west africa') ||
        nrm.includes('south africa') ||
        nrm.includes('sudafrica')
      ) {
        return makeResult('SAF', getTop('SAF').name || rawName, 'Unione Sudafricana');
      }

      if (
        nrm.includes('madagascar') ||
        nrm.includes('comoros') ||
        nrm.includes('comores') ||
        nrm.includes('reunion')
      ) {
        if (s >= 6) {
          const top = getTop('VIC_MAD');
          return makeResult(
            'VIC_MAD',
            top.name || (rawName ? `${rawName} (Vichy)` : 'Madagascar (Vichy)'),
            'Amministrazione Coloniale di Vichy (Armand Annet)',
            'Fantoccio'
          );
        }
        const top = getTop('F_MAD');
        return makeResult(
          'F_MAD',
          top.name || rawName || 'Madagascar Francese',
          'Madagascar Francese'
        );
      }

      if (
        nrm.includes('djibouti') ||
        nrm.includes('french somaliland') ||
        nrm.includes('gibuti')
      ) {
        if (s >= 6) {
          const top = getTop('VIC_SOM');
          return makeResult(
            'VIC_SOM',
            top.name || (rawName ? `${rawName} (Vichy)` : 'Somalia Francese (Gibuti — Vichy)'),
            'Amministrazione Coloniale di Vichy (Pierre Nouailhetas)',
            'Fantoccio'
          );
        }
        const top = getTop('F_SOM');
        return makeResult(
          'F_SOM',
          top.name || rawName || 'Somalia Francese (Gibuti)',
          'Somalia Francese (Gibuti)'
        );
      }

      if (ITA_COL[cntr]) return makeResult('ITA', getTop('ITA').name || ITA_COL[cntr]);
      if (FRA_COL[cntr]) {
        const [lbl, t] = FRA_COL[cntr];
        if (s >= 6) {
          if (t === 'F_AEF') {
            const fflTop = getTop('FFL_AEF');
            return makeResult(
              'FFL_AEF',
              fflTop.name || `${lbl} (Francia Libera)`,
              'Francia Libera — De Gaulle & Félix Éboué (Brazzaville)',
              'Alleati'
            );
          }
          const vicKey =
            t === 'F_NAF'
              ? 'VIC_NAF'
              : t === 'F_AOF'
              ? 'VIC_AOF'
              : t === 'F_MAD'
              ? 'VIC_MAD'
              : t === 'F_SOM'
              ? 'VIC_SOM'
              : t === 'F_SYR'
              ? 'VIC_SYR'
              : t === 'F_IND'
              ? 'VIC_IND'
              : 'VIC';
          const vicTop = getTop(vicKey);
          return makeResult(
            vicKey,
            vicTop.name || `${lbl} (Vichy)`,
            'Amministrazione di Vichy',
            'Fantoccio'
          );
        }
        return makeResult(t, getTop(t).name || lbl);
      }
      if (BEL_COL[cntr])
        return makeResult('BEL', BEL_COL[cntr], undefined, s >= 6 ? 'Alleati' : 'Neutrale');
      if (HOL_COL[cntr])
        return makeResult(
          'HOL',
          getTop('HOL').name || HOL_COL[cntr],
          undefined,
          s >= 6 ? 'Alleati' : 'Neutrale'
        );
      if (POR_COL[cntr]) return makeResult('POR', POR_COL[cntr]);
      if (UK_COL[cntr]) return makeResult('UK', getTop('UK').name || UK_COL[cntr]);
      if (JAP_COL[cntr]) {
        const jpTop = resolveJapanToponym(cntr, rawName, nrm, 'JAP', s);
        return makeResult(
          'JAP',
          jpTop?.name || JAP_COL[cntr],
          jpTop?.note || 'Territorio metropolitano o possedimento dell\'Impero Giapponese',
          'Asse',
          jpTop?.adminTitle || 'Dai Nippon Teikoku'
        );
      }
      if (USA_COL[cntr]) {
        if (cntr === 'PH' || cntr === 'PHL' || cntr === '608') {
          return makeResult('PHL', USA_COL[cntr], 'Commonwealth delle Filippine (Stato Autonomo Associato agli USA)');
        }
        return makeResult('USA', USA_COL[cntr]);
      }

      // Fallback geografico per territori non assegnati nella Penisola Arabica
      if (
        c &&
        c[0] >= 34.8 &&
        c[0] <= 55.5 &&
        c[1] >= 16.0 &&
        c[1] <= 32.2 &&
        !nrm.includes('yemen') &&
        !nrm.includes('aden') &&
        !nrm.includes('oman') &&
        !nrm.includes('muscat') &&
        !nrm.includes('trucial') &&
        !nrm.includes('emirates') &&
        !nrm.includes('qatar') &&
        !nrm.includes('bahrain') &&
        !nrm.includes('kuwait') &&
        !nrm.includes('iraq') &&
        !nrm.includes('mesopotam') &&
        !nrm.includes('jordan') &&
        !nrm.includes('palestine') &&
        !nrm.includes('sinai') &&
        !nrm.includes('egypt')
      ) {
        return makeResult('SAU', getTop('SAU').name || rawName || 'Regno dell\'Arabia Saudita', 'Regno dell\'Arabia Saudita');
      }

      return makeResult('NEU', ITNAMES[cntr] || cntr);
    }
  }
}
