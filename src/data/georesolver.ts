import { toCanonicalCountryCode } from './countryCodes';
import { resolveIranProvince } from './iranProvinces';
import { resolveBritishRajProvince } from './britishRajProvinces';
import { resolveKoreaProvince, KOREA_PROVINCES_META } from './koreaProvinces';
import { resolveJapanProvince, JAPAN_PROVINCES_META } from './japanProvinces';
import { resolveMalaysiaProvince, MALAYSIA_PROVINCES_META } from './malaysiaProvinces';
import { resolvePapuaNewGuineaProvince, PNG_PROVINCES_META } from './papuaNewGuineaProvinces';
import {
  resolveIndonesiaProvince,
  resolveTimorLeste,
  INDONESIA_PROVINCES_META,
} from './indonesiaTimorProvinces';
import {
  resolvePhilippinesProvince,
  PHILIPPINES_PROVINCES_META,
} from './philippinesProvinces';
import {
  resolveGermanyProvince,
} from './germanyProvinces';
import {
  resolveFrenchIndochinaProvince,
  FRENCH_INDOCHINA_PROVINCES_META,
} from './frenchIndochinaProvinces';
import {
  resolveUSAProvince,
  USA_PROVINCES_META,
} from './usaProvinces';
import {
  resolveCanadaProvince,
  CANADA_PROVINCES_META,
} from './canadaProvinces';
import {
  resolveMexicoProvince,
  MEXICO_PROVINCES_META,
} from './mexicoProvinces';
import {
  resolveAOFProvince,
  AOF_PROVINCES_META,
} from './aofProvinces';
import {
  resolveAEFProvince,
  AEF_PROVINCES_META,
} from './aefProvinces';
import {
  resolveNamibiaProvince,
  NAMIBIA_PROVINCES_META,
} from './namibiaProvinces';
import {
  resolveSudanProvince,
  SUDAN_PROVINCES_META,
} from './sudanProvinces';
import {
  resolveAfghanistanProvince,
  AFGHANISTAN_PROVINCES_META,
} from './afghanistanProvinces';
import {
  resolveFranceProvince,
  FRANCE_PROVINCES_META,
} from './franceProvinces';
import {
  resolveUKProvince,
  UK_PROVINCES_META,
} from './ukProvinces';
import {
  resolveItalyProvince,
  IT_PROVINCES_META,
} from './italyProvinces';
import {
  resolveSpainProvince,
  SPAIN_PROVINCES_META,
} from './spainProvinces';
import {
  resolveSovietProvince,
  SOVIET_PROVINCES_META,
} from './sovietProvinces';
import { ResolvedTerritory, FactionType } from '../types';
import {
  getExtendedToponym,
  resolvePolandToponym,
  resolveJapanToponym,
  resolveChinaToponym,
  resolveSwissAustrianToponym,
  resolveBalkansToponym,
  EGYPT_DISTRICTS_META,
  ALGERIA_PROVINCES_META,
  MOROCCO_PROVINCES_META,
  TUNISIA_PROVINCES_META,
  YEMEN_PROVINCES_META,
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
  GER: 'Deutsches Reich',
  DE: 'Deutsches Reich',
  DEU: 'Deutsches Reich',
  FRA: 'Troisième République française',
  FR: 'Troisième République française',
  ITA: "Regno d'Italia",
  IT: "Regno d'Italia",
  POL: 'Rzeczpospolita Polska',
  PL: 'Rzeczpospolita Polska',
  CZE: 'Československá republika',
  CZ: 'Československá republika',
  SOV: 'SSSR',
  SU: 'SSSR',
  EG: "Regno d'Egitto",
  EGY: "Regno d'Egitto",
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
  LIE: 'Liechtenstein',
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
  ADE: 'Aden Colony and Protectorate',
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
  'Faroe Islands',
  'Færøerne',
  'Territorio Insulare [-6.9, 62.0]',
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
    .replace(/[łŁ]/g, 'l')
    .replace(/[øØ]/g, 'o')
    .replace(/[æÆ]/g, 'ae')
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
  'United States': { o: 'USA', label: 'United States of America' },
  'United States of America': { o: 'USA', label: 'United States of America' },
  USA: { o: 'USA', label: 'United States of America' },
  'Stati Uniti': { o: 'USA', label: 'Stati Uniti d\'America' },
  'Stati Uniti d\'America': { o: 'USA', label: 'Stati Uniti d\'America' },
  'Midway Islands': { o: 'USA', label: 'Midway Atoll (U.S. Navy)' },
  Midway: { o: 'USA', label: 'Midway Atoll (U.S. Navy)' },
  'Puerto Rico': { o: 'USA', label: 'Puerto Rico (Unincorporated U.S. Territory)' },
  Hawaii: { o: 'USA', label: 'Territory of Hawaii (USA)' },
  Alaska: { o: 'USA', label: 'Territory of Alaska (USA)' },
  Guam: { o: 'USA', label: 'Guam (U.S. Naval Station)' },
  'American Samoa': { o: 'USA', label: 'American Samoa (U.S. Naval Station)' },
  'Chinese warlords': { o: 'CHI', label: 'Zhonghua Minguo (Difang Junfa)' },
  Tibet: { o: 'TIB', label: 'Bod Gzhung (Lhasa)' },
  Siam: { o: 'SIA', label: 'Ratcha-anachak Thai (Siam)' },
  Thailand: { o: 'SIA', label: 'Ratcha-anachak Thai (Thailand)' },
  'Kingdom of Thailand': { o: 'SIA', label: 'Ratcha-anachak Thai (Thailand)' },
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
  'Ecuador (Oriente)': { o: 'ECU', label: 'Ecuador (Región del Oriente — Zona Contesa con il Perù)' },
  'Oriente (Ecuador)': { o: 'ECU', label: 'Ecuador (Región del Oriente — Zona Contesa con il Perù)' },
  'Oriente': { o: 'ECU', label: 'Ecuador (Región del Oriente — Zona Contesa con il Perù)' },
  'EC_ORI': { o: 'ECU', label: 'Ecuador (Región del Oriente — Zona Contesa con il Perù)' },
  'ECU_ORIENTE': { o: 'ECU', label: 'Ecuador (Región del Oriente — Zona Contesa con il Perù)' },
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
  'Kingdom of Yemen': { o: 'YEM', label: 'Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah' },
  HB_YEMEN: { o: 'YEM', label: 'Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah (Sana\'a)' },
  'Aden Colony and Protectorate': { o: 'UK', label: 'British Aden Protectorate & Crown Colony of Aden' },
  'Aden Protectorate': { o: 'UK', label: 'British Aden Protectorate' },
  HB_ADEN: { o: 'UK', label: 'British Aden Protectorate & Crown Colony of Aden' },
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
  Malaysia: { o: 'UK', label: 'British Malaya' },
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
  Egypt: { o: 'EGY', label: "Kingdom of Egypt (British Sphere of Influence)" },
  'Kingdom of Egypt': { o: 'EGY', label: "Kingdom of Egypt (British Sphere of Influence)" },
  'Regno d\'Egitto': { o: 'EGY', label: "Regno d'Egitto" },
  HB_EGYPT: { o: 'EGY', label: "Kingdom of Egypt (Cairo)" },
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
  Maldives: { o: 'UK', label: 'Sultanate of the Maldives (British Protected State)' },
  'Maldive Islands': { o: 'UK', label: 'Sultanate of the Maldive Islands (British Protected State)' },
  'Cook Islands': { o: 'NZL', label: 'Cook Islands (New Zealand Dependency)' },
  Nauru: { o: 'UK', label: 'Nauru (British Empire League of Nations Mandate)' },
  'Réunion': { o: 'F_MAD', label: 'La Réunion (France)' },
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
  HB_ALGERIA: { o: 'F_NAF', label: 'Départements français d\'Algérie et Territoires du Sud' },
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
  'Congo (France)': { o: 'F_AEF', label: 'AEF (Moyen-Congo)' },
  Gabon: { o: 'F_AEF', label: 'AEF (Gabon)' },
  'Gabon (France)': { o: 'F_AEF', label: 'AEF (Gabon)' },
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
  'Nouvelle-Calédonie': { o: 'F_COL', label: 'Nouvelle-Calédonie (France)' },
  'Nouvelles-Hébrides': { o: 'F_COL', label: 'Nouvelles-Hébrides (Condominium franco-britannique)' },
  'French Polynesia': { o: 'F_COL', label: 'Établissements français de l\'Océanie' },
  'Établissements français de l\'Océanie': { o: 'F_COL', label: 'Établissements français de l\'Océanie' },
  Guadeloupe: { o: 'F_COL', label: 'Guadeloupe (France)' },
  Martinique: { o: 'F_COL', label: 'Martinique (France)' },
  'Saint Pierre and Miquelon': { o: 'F_COL', label: 'Saint-Pierre-et-Miquelon (France)' },
  'French India': { o: 'F_COL', label: 'Établissements français dans l\'Inde (Pondichéry)' },
  'Établissements français dans l\'Inde': { o: 'F_COL', label: 'Établissements français dans l\'Inde (Pondichéry)' },
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
  Afghanistan: { o: 'AFG' },
  'Kingdom of Afghanistan': { o: 'AFG' },
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
    // Gennaio 1936: Mandato Francese di Siria — Sangiaccato di Alessandretta
    return makeResult(
      'F_SYR',
      'Mandato Francese di Siria — Sangiaccato di Alessandretta',
      'Sangiaccato di Alessandretta (Liwa Iskenderun / İskenderun Sancağı) · Distretto a statuto speciale autonomo del Mandato di Siria retto dalla Francia in virtù dell\'Accordo di Ankara del 1921. Porto strategico sul Golfo di Alessandretta e fertile pianura dell\'Amik attraversata dall\'Oronte. Popolazione composita formata da turchi, arabi alauiti e sunniti, armeni e cristiani levantini.',
      'Alleati',
      'Sanjak d\'Alexandrette · Statuto Autonomo nel Mandato di Siria (Capoluogo Antakya / Antiochia)'
    );
  }
  if (step === 1) {
    // Marzo 1938: Regime Autonomo di Transizione
    return makeResult(
      'F_SYR',
      'Sangiaccato di Alessandretta — Regime Autonomo di Transizione',
      'Alessandretta · In seguito ai negoziati franco-turchi e alle forti pressioni del presidente turco Mustafa Kemal Atatürk, la Società delle Nazioni definisce un nuovo statuto di autonomia separata dalla Siria. A luglio del 1938 truppe turche e francesi entrano congiuntamente nel distretto per garantire l\'ordine pubblico in vista delle elezioni legislative.',
      'Alleati',
      'Régime Autonome sous Mandat Français & Supervisione della Società delle Nazioni'
    );
  }
  if (step === 2) {
    // Ottobre 1938: Repubblica Indipendente di Hatay
    return makeResult(
      'HAT',
      'Repubblica di Hatay (Hatay Devleti) — Stato Indipendente',
      'Stato di Hatay (Hatay Devleti) · Proclamato indipendente il 2 settembre 1938 dal parlamento locale eletto ad Antakya sotto la presidenza di Tayfur Sökmen e con primo ministro Abdurrahman Melek. Il nuovo stato adotta come inno la İstiklâl Marşı, la bandiera con stella a contorno rosso e introduce la lira turca, sancendo il distacco formale dalla Siria mandataria.',
      'Neutrale',
      'Hatay Devleti · Governo Parlamentare di Antakya (Pres. Tayfur Sökmen, P.M. Abdurrahman Melek)'
    );
  }
  if (step === 3) {
    // Marzo 1939: Unione Doganale con la Turchia
    return makeResult(
      'HAT',
      'Repubblica di Hatay (Hatay Devleti) — Unione Doganale Turca',
      'Hatay Devleti · Piena integrazione legislativa, monetaria e doganale con la Repubblica di Turchia. Il parlamento di Antakya abroga i codici e le normative legali siriane e francesi, adottando la legislazione civile e penale di Ankara in preparazione dell\'annessione formale alla Turchia.',
      'Neutrale',
      'Hatay Devleti · Assemblea Nazionale di Hatay & Unione Doganale con Ankara'
    );
  }
  if (step === 4) {
    // Maggio/Estate 1939: Annessione alla Turchia
    return makeResult(
      'TUR',
      'Repubblica di Turchia — Provincia di Hatay (Hatay İli)',
      'Hatay (Turchia) · Con l\'accordo franco-turco del 23 giugno 1939 e il voto unanime dell\'Assemblea di Hatay, il territorio viene formalmente incorporato nella Repubblica di Turchia come 63ª provincia (Hatay İli). In cambio la Francia ottiene un patto di mutua assistenza e la garanzia della neutralità turca. La cessione scatena veementi proteste popolari a Damasco e Aleppo, che considerano la perdita una mutilazione coloniale illegittima.',
      'Neutrale',
      'Hatay İli (Valiliği) · 63ª Provincia della Repubblica di Turchia (Antakya & İskenderun)'
    );
  }
  if (step === 5) {
    // Settembre 1939: Scoppio della WWII
    return makeResult(
      'TUR',
      'Repubblica di Turchia — Provincia di Hatay (Hatay İli)',
      'Hatay · Consolidamento della sovranità turca allo scoppio della Seconda Guerra Mondiale. Emigrazione forzata di oltre 40.000 tra armeni, arabi alauiti e sunniti che si rifugiano oltre confine nel Mandato di Siria (verso Aleppo, Latakia e Beirut). Il porto di İskenderun (ex Alessandretta) diviene una delle principali basi logistiche marittime turche nel Mediterraneo orientale protetta dalla neutralità di Ankara.',
      'Neutrale',
      'Türkiye Cumhuriyeti Hatay Valiliği (Vali Şükrü Sökmensüer)'
    );
  }
  if (step === 6) {
    // Giugno 1940: Caduta della Francia e Regime di Vichy
    return makeResult(
      'TUR',
      'Repubblica di Turchia — Provincia di Hatay (Hatay İli)',
      'Hatay · Con il collasso militare della Francia e l\'insediamento del regime di Vichy in Siria, le forze armate turche rafforzano le guarnigioni di frontiera lungo i passi dell\'Amanus e della pianura dell\'Amik per prevenire qualsiasi sconfinamento o velleità irredentista da parte delle truppe siriane coloniali.',
      'Neutrale',
      'Hatay Valiliği & Comando Militare della Frontiera Meridionale Turca'
    );
  }
  if (step === 7) {
    // Ottobre 1940: Tensione nei Balcani e Mediterraneo
    return makeResult(
      'TUR',
      'Repubblica di Turchia — Provincia di Hatay (Hatay İli)',
      'Hatay · Frontiera fortificata e sottoposta a stretto pattugliamento mentre il conflitto italo-greco e le manovre dell\'Asse nei Balcani aumentano la tensione regionale. Il governo di Ankara ribadisce la propria rigorosa neutralità armata, rifiutando pressioni diplomatiche dell\'Asse e bloccando i valichi montani verso Aleppo.',
      'Neutrale',
      'Hatay Valiliği & Comando Militare della Frontiera Meridionale Turca'
    );
  }
  // Step 8: Aprile 1941 - Crisi Irachena e Prologo Operazione Exporter
  return makeResult(
    'TUR',
    'Repubblica di Turchia — Provincia di Hatay (Hatay İli)',
    'Hatay · Snodo strategico di primaria importanza durante la ribellione antibritannica di Rashid Ali al-Kaylani in Iraq e la cooperazione del generale Dentz a Damasco con l\'Asse. Ankara rifiuta categoricamente il transito di armi e velivoli della Luftwaffe attraverso le ferrovie di Hatay diretti in Siria, sigillando la frontiera fino all\'imminente campagna alleata nel Levante (Operazione Exporter).',
    'Neutrale',
    'Hatay Valiliği · Presidio di Frontiera della Turchia Neutrale (Linea Difensiva Iskenderun-Kilis)'
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
      owner = s >= 9 ? 'JAP' : 'UK';
      faction = s >= 9 ? 'Asse' : 'Alleati';
      if (s >= 9) {
        return makeResult(
          'JAP',
          'Honkon Senryōchi / Hong Kong (Occupazione Militare Giapponese — 25 Dicembre 1941)',
          "Battaglia di Hong Kong (8-25 dicembre 1941): investita l'8 dicembre dalla 38ª Divisione della 23ª Armata giapponese (Ten. Gen. Takashi Sakai), la guarnigione britannica, canadese (Royal Rifles of Canada e Winnipeg Grenadiers) e indiana del Magg. Gen. Christopher Maltby resiste sui Nuovi Territori (Gin Drinkers' Line) e sull'isola di Hong Kong fino alla resa del Governatore Sir Mark Young nel 'Natale Nero' (Black Christmas, 25 dicembre 1941); instaurato il governatorato militare giapponese.",
          'Asse',
          'Impero Giapponese — Governatorato Militare di Hong Kong (Honkon Senryōchi Sōtokufu — Ten. Gen. Takashi Sakai / Rensuke Isogai)'
        );
      }
      break;
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
  'Morocco (France)': (s) =>
    s < 6
      ? makeResult(
          'F_NAF',
          'Protectorat Français du Maroc (Maroc Français — Rabat / Casablanca)',
          'Résidence Générale de la République Française au Maroc (Général Charles Noguès)',
          undefined,
          'Résidence Générale de la République Française (Rabat)'
        )
      : makeResult(
          'VIC_NAF',
          'Protectorat du Maroc (Maroc Français — Vichy)',
          'Résidence Générale de France au Maroc (Général Charles Noguès — Vichy)',
          'Fantoccio',
          'Résidence Générale de France au Maroc (Vichy)'
        ),
  Morocco: (s) =>
    s < 6
      ? makeResult(
          'F_NAF',
          'Protectorat Français du Maroc (Maroc Français — Rabat / Casablanca)',
          'Résidence Générale de la République Française au Maroc (Général Charles Noguès)',
          undefined,
          'Résidence Générale de la République Française (Rabat)'
        )
      : makeResult(
          'VIC_NAF',
          'Protectorat du Maroc (Maroc Français — Vichy)',
          'Résidence Générale de France au Maroc (Général Charles Noguès — Vichy)',
          'Fantoccio',
          'Résidence Générale de France au Maroc (Vichy)'
        ),
  'French Morocco': (s) =>
    s < 6
      ? makeResult(
          'F_NAF',
          'Protectorat Français du Maroc (Maroc Français — Rabat / Casablanca)',
          'Résidence Générale de la République Française au Maroc (Général Charles Noguès)',
          undefined,
          'Résidence Générale de la République Française (Rabat)'
        )
      : makeResult(
          'VIC_NAF',
          'Protectorat du Maroc (Maroc Français — Vichy)',
          'Résidence Générale de France au Maroc (Général Charles Noguès — Vichy)',
          'Fantoccio',
          'Résidence Générale de France au Maroc (Vichy)'
        ),
  'Maroc Français': (s) =>
    s < 6
      ? makeResult(
          'F_NAF',
          'Protectorat Français du Maroc (Maroc Français — Rabat / Casablanca)',
          'Résidence Générale de la République Française au Maroc (Général Charles Noguès)',
          undefined,
          'Résidence Générale de la République Française (Rabat)'
        )
      : makeResult(
          'VIC_NAF',
          'Protectorat du Maroc (Maroc Français — Vichy)',
          'Résidence Générale de France au Maroc (Général Charles Noguès — Vichy)',
          'Fantoccio',
          'Résidence Générale de France au Maroc (Vichy)'
        ),
  'Protettorato Francese del Marocco': (s) =>
    s < 6
      ? makeResult(
          'F_NAF',
          'Protectorat Français du Maroc (Maroc Français — Rabat / Casablanca)',
          'Résidence Générale de la République Française au Maroc (Général Charles Noguès)',
          undefined,
          'Résidence Générale de la République Française (Rabat)'
        )
      : makeResult(
          'VIC_NAF',
          'Protectorat du Maroc (Maroc Français — Vichy)',
          'Résidence Générale de France au Maroc (Général Charles Noguès — Vichy)',
          'Fantoccio',
          'Résidence Générale de France au Maroc (Vichy)'
        ),
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
      ? makeResult('TANGER', 'Zone Internationale de Tanger', 'Administration Internationale (Statut de 1923)')
      : makeResult('SPA', 'Tánger (Zona Ocupada por España)', 'Ocupación Militar Española (14 de junio de 1940)'),
  'International Zone of Tangier': (s) =>
    s < 6
      ? makeResult('TANGER', 'Zone Internationale de Tanger', 'Administration Internationale (Statut de 1923)')
      : makeResult('SPA', 'Tánger (Zona Ocupada por España)', 'Ocupación Militar Española (14 de junio de 1940)'),
  'Tangier International Zone': (s) =>
    s < 6
      ? makeResult('TANGER', 'Zone Internationale de Tanger', 'Administration Internationale (Statut de 1923)')
      : makeResult('SPA', 'Tánger (Zona Ocupada por España)', 'Ocupación Militar Española (14 de junio de 1940)'),
  'Zona Internacional de Tanger': (s) =>
    s < 6
      ? makeResult('TANGER', 'Zone Internationale de Tanger', 'Administration Internationale (Statut de 1923)')
      : makeResult('SPA', 'Tánger (Zona Ocupada por España)', 'Ocupación Militar Española (14 de junio de 1940)'),
  'Zona Internazionale di Tangeri': (s) =>
    s < 6
      ? makeResult('TANGER', 'Zone Internationale de Tanger', 'Administration Internationale (Statut de 1923)')
      : makeResult('SPA', 'Tánger (Zona Ocupada por España)', 'Ocupación Militar Española (14 de junio de 1940)'),
  Tanger: (s) =>
    s < 6
      ? makeResult('TANGER', 'Zone Internationale de Tanger', 'Administration Internationale (Statut de 1923)')
      : makeResult('SPA', 'Tánger (Zona Ocupada por España)', 'Ocupación Militar Española (14 de junio de 1940)'),
  Tangeri: (s) =>
    s < 6
      ? makeResult('TANGER', 'Zone Internationale de Tanger', 'Administration Internationale (Statut de 1923)')
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
  Luxembourg: (s) =>
    s < 6
      ? makeResult('LUX', 'Grand-Duché de Luxembourg', undefined, 'Neutrale', 'Grand-Duché de Luxembourg')
      : makeResult(
          'GER',
          'Luxemburg (CdZ-Gebiet Moselland)',
          'De-facto-Annexion an das Deutsche Reich (Gau Moselland)',
          'Asse',
          'CdZ-Gebiet Luxemburg (Gauleiter Gustav Simon, Gau Moselland)'
        ),
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
  if (!f) return makeResult('NEU', 'Territorio Sconosciuto');
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
  const cleanId = String(f.id || P.id || nid || '').toUpperCase();
  const getTop = (owner: string) => getExtendedToponym(rawName, owner, nid, c, s);

  // 0. Intercettazione prioritaria Province, Stati e Territori USA
  const isUSAProvince =
    cleanId.startsWith('US_') ||
    cleanId === 'PR' ||
    cleanId === 'VI' ||
    cleanId === 'GU' ||
    cleanId === 'AS' ||
    cleanId === 'MP' ||
    cleanId === 'UM' ||
    Boolean((USA_PROVINCES_META as any)?.[cleanId]) ||
    (rawName !== 'United States' &&
     rawName !== 'Stati Uniti d\'America' &&
     rawName !== 'Stati Uniti' &&
     rawName !== 'USA' &&
     rawName !== 'US' &&
     (nrm_hb.includes('hawaii') ||
      nrm_hb.includes('alaska') ||
      nrm_hb.includes('pearl harbor') ||
      nrm_hb.includes('canal zone') ||
      nrm_hb.includes('guantanamo') ||
      Boolean((USA_PROVINCES_META as any)?.[nrm_hb])));

  if (isUSAProvince) {
    const resUsa = resolveUSAProvince(f, s);
    if (resUsa) return resUsa;
  }

  // 0.b Intercettazione prioritaria Province, Territori e Dominion di Terranova (Canada & Newfoundland)
  const isCanadaProvince =
    cleanId.startsWith('CA_') ||
    cleanId.startsWith('CA-') ||
    Boolean((CANADA_PROVINCES_META as any)?.[cleanId]) ||
    (rawName !== 'Canada' &&
     rawName !== 'Dominion of Canada' &&
     (nrm_hb.includes('ontario') ||
      nrm_hb.includes('quebec') ||
      nrm_hb.includes('nova scotia') ||
      nrm_hb.includes('new brunswick') ||
      nrm_hb.includes('manitoba') ||
      nrm_hb.includes('saskatchewan') ||
      nrm_hb.includes('alberta') ||
      nrm_hb.includes('british columbia') ||
      nrm_hb.includes('newfoundland') ||
      nrm_hb.includes('terranova') ||
      nrm_hb.includes('labrador') ||
      nrm_hb.includes('northwest territories') ||
      nrm_hb.includes('yukon') ||
      nrm_hb.includes('nunavut') ||
      Boolean((CANADA_PROVINCES_META as any)?.[nrm_hb])));

  if (isCanadaProvince) {
    const resCan = resolveCanadaProvince(f, s);
    if (resCan) return resCan;
  }

  // 0.c Intercettazione prioritaria Province e Stati del Messico
  const isMexProvince =
    cleanId.startsWith('MX_') ||
    cleanId.startsWith('MX-') ||
    Boolean((MEXICO_PROVINCES_META as any)?.[cleanId]) ||
    (rawName !== 'Mexico' &&
     rawName !== 'Estados Unidos Mexicanos' &&
     rawName !== 'Stati Uniti Messicani' &&
     (nrm_hb.includes('sonora') ||
      nrm_hb.includes('baja california') ||
      nrm_hb.includes('chihuahua') ||
      nrm_hb.includes('coahuila') ||
      nrm_hb.includes('tamaulipas') ||
      nrm_hb.includes('nuevo leon') ||
      nrm_hb.includes('jalisco') ||
      nrm_hb.includes('veracruz') ||
      nrm_hb.includes('chiapas') ||
      nrm_hb.includes('yucatan') ||
      nrm_hb.includes('oaxaca') ||
      nrm_hb.includes('puebla') ||
      nrm_hb.includes('michoacan') ||
      nrm_hb.includes('sinaloa') ||
      nrm_hb.includes('durango') ||
      nrm_hb.includes('zacatecas') ||
      nrm_hb.includes('san luis potosi') ||
      nrm_hb.includes('distrito federal') ||
      nrm_hb.includes('ciudad de mexico') ||
      Boolean((MEXICO_PROVINCES_META as any)?.[nrm_hb])));

  if (isMexProvince) {
    const resMex = resolveMexicoProvince(f, s);
    if (resMex) return resMex;
  }

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
    const top = getExtendedToponym(name || 'Isle of Man', 'UK', nid, c, s);
    return makeResult(
      'UK',
      top.name || 'Isle of Man (Douglas)',
      top.note || 'Dipendenza autonoma della Corona Britannica nel Mare d\'Irlanda.',
      s >= 4 ? 'Alleati' : 'Neutrale',
      top.adminTitle || 'Crown Dependency of the Isle of Man'
    );
  }

  // Isole del Canale (Channel Islands)
  const isChannel =
    (nrm_hb.includes('jersey') && !nrm_hb.includes('new jersey')) ||
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
      const top = getExtendedToponym('Channel Islands', 'GER', nid, c, s);
      return makeResult(
        'GER',
        top.name || 'Kanalinseln (Deutsche Besetzung)',
        top.note || 'Occupazione militare tedesca delle Isole del Canale (giugno/luglio 1940), unici territori britannici occupati dal Terzo Reich.',
        'Asse',
        top.adminTitle || 'Befehlshaber der Kanalinseln (Militärverwaltung)'
      );
    }
    const top = getExtendedToponym(name || 'Channel Islands', 'UK', nid, c, s);
    return makeResult(
      'UK',
      top.name || (nrm_hb.includes('jersey') ? 'Bailiwick of Jersey (Saint Helier)' : 'Bailiwick of Guernsey (Saint Peter Port)'),
      top.note || 'Dipendenza della Corona Britannica nelle Isole del Canale.',
      s >= 4 ? 'Alleati' : 'Neutrale',
      top.adminTitle || 'Crown Dependencies (Channel Islands)'
    );
  }

  // Isole Fær Øer (Færøerne / Føroyar — Danimarca -> Occupazione Britannica 1940 Operazione Valentine)
  const isFaroe =
    nrm_hb.includes('faroe') ||
    nrm_hb.includes('faeroe') ||
    nrm_hb.includes('faeroes') ||
    nrm_hb.includes('færø') ||
    nrm_hb.includes('faerø') ||
    nrm_hb.includes('føroyar') ||
    nrm_hb.includes('foroyar') ||
    nrm_hb.includes('torshavn') ||
    nrm_hb.includes('tórshavn') ||
    nrm_subj.includes('faroe') ||
    nrm_subj.includes('faeroe') ||
    nrm_subj.includes('færø') ||
    nrm_subj.includes('føroyar') ||
    P.CNTR_CODE === 'FO' ||
    P.ISO_A2 === 'FO' ||
    P.ISO_A3 === 'FRO' ||
    P.ISO3 === 'FRO' ||
    P['ISO3166-1-Alpha-2'] === 'FO' ||
    P['ISO3166-1-Alpha-3'] === 'FRO' ||
    rawName.includes('[-6.9, 62.0]') ||
    (c[0] >= -8 && c[0] <= -5 && c[1] >= 61 && c[1] <= 63);

  if (isFaroe) {
    if (s >= 6) {
      return makeResult(
        'UK',
        'Isole Fær Øer (Occupazione Britannica — Operazione Valentine)',
        'Occupate militarmente dalle forze britanniche (Royal Navy / Lovat Scouts) il 12-13 aprile 1940 (Operazione Valentine) per negare alla Germania basi navali strategiche nel Nord Atlantico. Mantenuta l\'amministrazione civile del Løgting e dell\'amtmand Carl Aage Hilbert; bandiera Merkið formalmente riconosciuta dall\'Ammiragliato.',
        'Alleati',
        'Military Administration of the Faroe Islands (British Garrison / Royal Navy Command, Tórshavn) & Løgting'
      );
    }
    return makeResult(
      'DEN',
      'Isole Fær Øer (Færøerne / Føroyar)',
      'Contea insulare del Regno di Danimarca (Færø Amt). Amministrazione civile guidata dall\'amtmand Carl Aage Hilbert con sede a Tórshavn (Streymoy) e assemblea rappresentativa del Løgting, sotto la sovranità di re Cristiano X.',
      'Neutrale',
      'Færø Amt (Amtmand Carl Aage Hilbert — Tórshavn) / Løgting'
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
    (nrm_hb.includes('hail') && !nrm_hb.includes('thail')) ||
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
    (nrm_subj.includes('hail') && !nrm_subj.includes('thail')) ||
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
    if (s >= 9) {
      return makeResult(
        'F_SYR',
        isLeb
          ? 'République Libanaise (Controllo Congiunto Francia Libera e Gran Bretagna — Beyrouth)'
          : 'République Syrienne (Controllo Congiunto Francia Libera e Gran Bretagna — Damas)',
        "Operazione Exporter e Armistizio di Saint-Jean-d'Acre (14 luglio 1941): dopo la resa delle truppe di Vichy del Gen. Henri Dentz, Siria e Libano passano sotto il controllo congiunto della Francia Libera (Gen. Georges Catroux, che proclama formalmente l'indipendenza siriana e libanese) e della 9ª Armata britannica.",
        'Alleati',
        "Délégation Générale de la France Libre au Levant (Gén. Georges Catroux) & British 9th Army"
      );
    }
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
    if (s >= 9) {
      return makeResult(
        'IRN',
        'Keshvar-e Shāhanshāhi-ye Irān (Occupazione Anglo-Sovietica & Corridoio Persiano)',
        "Operazione Countenance (25 agosto – 17 settembre 1941): invasione congiunta anglo-sovietica dell'Iran, abdicazione di Reza Shah a favore del figlio Mohammad Reza Pahlavi e spartizione del paese tra settore sovietico a nord e settore britannico a sud per garantire il Corridoio Persiano dei rifornimenti Alleati.",
        'Alleati',
        'Keshvar-e Shāhanshāhi-ye Irān — Corridoio Persiano Anglo-Sovietico (Mohammad Reza Pahlavi)'
      );
    }
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
    if (s >= 9) {
      return makeResult(
        'UK',
        'Al-Mamlakah al-‘Irāqiyyah (Controllo Militare Britannico — PAIFORCE, Baghdad)',
        "Dopo la sconfitta del governo filo-Asse di Rashid Ali al-Kaylani nella guerra anglo-irachena (maggio 1941), il Regno dell'Iraq torna sotto controllo militare britannico (PAIFORCE — Persia and Iraq Force del Ten. Gen. Edward Quinan) con la restaurazione del reggente 'Abd al-Ilah.",
        'Alleati',
        'Al-Mamlakah al-‘Irāqiyyah — British Military Control (PAIFORCE & Reggente ‘Abd al-Ilah)'
      );
    }
    if (s >= 8) {
      return makeResult(
        'IRQ',
        'Al-Mamlakah al-‘Irāqiyyah (Governo di Difesa Nazionale Filo-Asse — Baghdad)',
        "Colpo di Stato nazionalista e filo-Asse del 1°-2 aprile 1941 guidato da Rashid Ali al-Kaylani e dai colonnelli del 'Quadrato d'Oro' (Salah al-Din al-Sabbagh); deposizione del reggente filo-britannico 'Abd al-Ilah, sbarco della 10ª Divisione Indiana britannica a Bassora (Operazione Sabine, 18 aprile) e accerchiamento iracheno della base aerea RAF Habbaniya (29-30 aprile) che apre la guerra anglo-irachena.",
        'Asse',
        'Al-Mamlakah al-‘Irāqiyyah — Governo di Difesa Nazionale (Rashid Ali al-Kaylani)'
      );
    }
    const top = getExtendedToponym(name || 'Mesopotamia', 'UK', nid, c, s);
    return makeResult(
      'UK',
      top.name || 'Al-Mamlakah al-‘Irāqiyyah (Mesopotamia)',
      top.adminTitle || 'British Sphere of Influence & Treaty of Alliance (1930)'
    );
  }

  // Carelia & Petsamo
  if (name === 'Finland') {
    if (s >= 9) {
      return makeResult(
        'FIN',
        'Suomen tasavalta (Karjala, Petsamo ja Itä-Karjala — Jatkosota 1941)',
        "Guerra di Continuazione (giugno-dicembre 1941): l'esercito finlandese del Maresciallo Mannerheim riconquista l'intera Carelia perduta nel 1940 (Viipuri, Sortavala, Salla, Hanko) e occupa la Carelia Orientale sovietica (presa di Petrozavodsk / Äänislinna il 1° ottobre 1941).",
        'Asse',
        'Suomen tasavalta — Päämaja (Sotamarsalkka C.G.E. Mannerheim)'
      );
    }
    return s < 6
      ? makeResult('FIN', 'Suomi (Petsamo / Karjala)', 'Ennen sotaa vallinneet rajat')
      : makeResult('SOV', 'Karelskaya ASSR i Petsamo', 'Moskovskiy mirny dogovor (1940)');
  }

  // Bessarabia & Bucovina
  if (name === 'Romania') {
    if (s >= 9) {
      return makeResult(
        'ROM',
        'Regatul României (Basarabia, Bucovina de Nord și Transnistria — 1941)',
        'Riconquista romena della Bessarabia e della Bucovina settentrionale (luglio 1941) e amministrazione civile-militare del Governatorato della Transnistria tra Dnestr e Bug Meridionale (Accordo di Tighina, 30 agosto 1941).',
        'Asse',
        'Regatul României — Conducător Mareșal Ion Antonescu'
      );
    }
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
    if (s >= 8) {
      return makeResult(
        'HUN',
        'Magyar Királyság (Bácska, Muravidék és Muraköz)',
        'Adesione al Patto Tripartito (20 novembre 1940) e partecipazione all\'invasione della Jugoslavia (11 aprile 1941) con l\'annessione di Bácska (Délvidék), Prekmurje (Muravidék) e Međimurje (Muraköz).',
        'Asse',
        'Magyar Királyság (Kormányzó Horthy Miklós / Bárdossy László)'
      );
    }
    return s < 2
      ? makeResult('HUN', 'Magyar Királyság', 'Trianoni határok')
      : makeResult('HUN', 'Magyar Királyság', 'Bécsi döntések szerinti határok', s >= 7 ? 'Asse' : undefined);
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
  if ((nrm_hb.includes('egypt') || nrm_hb.includes('egitto')) && !nrm_hb.includes('sudan')) {
    const top = getExtendedToponym(name, 'EGY', nid, c, s);
    return makeResult('EGY', top.name || 'Kingdom of Egypt (British Military Sphere — Cairo)', top.note || (s >= 1 ? "Regno d'Egitto (Trattato Anglo-Egiziano del 1936)" : "Regno d'Egitto (Occupazione/Influenza Britannica)"), 'Alleati', top.adminTitle || 'Kingdom of Egypt (Anglo-Egyptian Treaty of 1936)');
  }
  const resSudanHB = resolveSudanProvince(f.id || P.id || P.shapeISO || name, s);
  if (resSudanHB) return resSudanHB;
  const resAfgHB = resolveAfghanistanProvince(f.id || P.id || P.shapeISO || name, s);
  if (resAfgHB) return resAfgHB;
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
    const top = getExtendedToponym(name, 'UK', nid, c, s);
    return makeResult('UK', top.name, top.note, s >= 4 ? 'Alleati' : 'Neutrale', top.adminTitle || 'British Empire in Africa');
  }
  if (
    nrm_hb.includes('bechuanaland') ||
    nrm_hb.includes('botswana') ||
    nrm_hb.includes('basutoland') ||
    nrm_hb.includes('lesotho') ||
    nrm_hb.includes('swaziland') ||
    nrm_hb.includes('eswatini')
  ) {
    const top = getExtendedToponym(name, 'UK', nid, c, s);
    return makeResult('UK', top.name, top.note, s >= 4 ? 'Alleati' : 'Neutrale', top.adminTitle || 'British Protectorate');
  }
  if (
    nrm_hb.includes('gold coast') ||
    nrm_hb.includes('ghana') ||
    nrm_hb.includes('nigeria') ||
    nrm_hb.includes('sierra leone') ||
    nrm_hb.includes('gambia') ||
    nrm_hb.includes('british cameroon')
  ) {
    const top = getExtendedToponym(name, 'UK', nid, c, s);
    return makeResult('UK', top.name, top.note, s >= 4 ? 'Alleati' : 'Neutrale', top.adminTitle || 'British Crown Colony');
  }
  if (nrm_hb.includes('british somaliland') || nrm_hb.includes('somalia britannica')) {
    if (s === 7) {
      const top = getExtendedToponym(name || 'British Somaliland', 'ITA', nid, c, s);
      return makeResult(
        'ITA',
        top.name || 'Somalia Britannica Occupata (Berbera — AOI)',
        top.note || 'Conquista italiana della Somalia Britannica (3-19 agosto 1940: Battaglia di Tug Argan e presa di Berbera da parte delle truppe del Gen. Guglielmo Nasi). Territorio annesso all\'Africa Orientale Italiana.',
        'Asse',
        top.adminTitle || 'Governo Militare della Somalia Britannica (AOI — Gen. Guglielmo Nasi)'
      );
    }
    if (s >= 8) {
      return makeResult(
        'UK',
        'British Somaliland Protectorate (Berbera — Liberata con l\'Operazione Appearance)',
        'Operazione Appearance (16 marzo 1941): sbarco anfibio di forze britanniche e indiane a Berbera supportate dalla Royal Navy; riconquista rapida della Somalia Britannica occupata dagli italiani nell\'agosto 1940 e reinsediamento del Governatore Militare Brig. Arthur Chater.',
        'Alleati',
        'British Military Administration of Somaliland (Governor Brig. Arthur Chater — Berbera)'
      );
    }
    const top = getExtendedToponym(name, 'UK', nid, c, s);
    return makeResult(
      'UK',
      top.name || 'British Somaliland Protectorate (Berbera)',
      top.note,
      s >= 4 ? 'Alleati' : 'Neutrale',
      top.adminTitle || 'British Crown Protectorate'
    );
  }
  const resNamibiaHB = resolveNamibiaProvince(f.id || P.id || P.shapeISO || name, s);
  if (resNamibiaHB) return resNamibiaHB;

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
    const resAOF = resolveAOFProvince(f, s);
    if (resAOF) return resAOF;
    if (s >= 6) {
      const top = getExtendedToponym(name, 'VIC_AOF', nid, c, s);
      return makeResult(
        'VIC_AOF',
        top.name || 'Afrique-Occidentale française (AOF — Vichy)',
        top.note || 'Haut-commissariat de l\'Afrique française sous Vichy',
        'Fantoccio',
        top.adminTitle || 'Haut-commissariat de l\'Afrique française (Pierre Boisson — Vichy)'
      );
    }
    const top = getExtendedToponym(name, 'F_AOF', nid, c, s);
    return makeResult(
      'F_AOF',
      top.name || 'Afrique-Occidentale française (AOF)',
      top.note || 'Gouvernement général de l\'AOF à Dakar',
      undefined,
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
    const resAEF = resolveAEFProvince(f, s);
    if (resAEF) return resAEF;
    if (nrm_hb.includes('gabon') && !nrm_hb.includes('gabriel')) {
      if (s === 6) {
        const top = getExtendedToponym(name, 'VIC_AEF', nid, c, s);
        return makeResult(
          'VIC_AEF',
          top.name || 'Colonie du Gabon (Vichy — Libreville)',
          top.note || 'Le Gabon reste fidèle au régime de Vichy sous le gouverneur Georges Masson jusqu\'à la campagne du Gabon menée par Leclerc et Koenig.',
          'Fantoccio',
          top.adminTitle || 'Colonie du Gabon (Vichy — Libreville)'
        );
      }
      if (s >= 7) {
        const top = getExtendedToponym(name, 'FFL_AEF', nid, c, s);
        return makeResult(
          'FFL_AEF',
          top.name || 'Gabon (France Libre — Libreville)',
          top.note || 'Campagne du Gabon (octobre-novembre 1940) : les Forces Françaises Libres de Leclerc et Koenig rallient le Gabon, parachevant l\'unité de l\'Afrique Française Libre.',
          'Alleati',
          top.adminTitle || 'Colonie du Gabon (France Libre — De Gaulle / Leclerc)'
        );
      }
    }
    if (s >= 6) {
      const top = getExtendedToponym(name, 'FFL_AEF', nid, c, s);
      return makeResult(
        'FFL_AEF',
        top.name || 'Afrique équatoriale française (France Libre — De Gaulle / Éboué)',
        top.note || (s >= 7 ? 'Brazzaville capitale officielle de la France combattante (Conseil de défense de l\'Empire)' : 'Brazzaville capitale de la France combattante — Ralliement de l\'AEF'),
        'Alleati',
        top.adminTitle || 'Afrique française libre — Félix Éboué & De Gaulle (Brazzaville)'
      );
    }
    const top = getExtendedToponym(name, 'F_AEF', nid, c, s);
    return makeResult(
      'F_AEF',
      top.name || 'Afrique-Équatoriale française (AEF)',
      top.note || 'Gouvernement général de l\'AEF à Brazzaville',
      undefined,
      top.adminTitle || 'Gouvernement général de l\'AEF'
    );
  }

  // Italia in Africa & Etiopia
  if (nrm_hb.includes('ethiopia') || nrm_hb.includes('abyssinia')) {
    if (s === 0) {
      return makeResult('ETH', 'Mängəśtä Ityop’p’ya (Addis Ababa)', 'Yä-Ityop’ya Qəññ Gəzat Torənnät');
    }
    if (s >= 8) {
      return makeResult(
        'ETH',
        "Impero d'Etiopia Restaurato (Addis Abeba — Liberazione Alleata & Amba Alagi)",
        "Collasso dell'Africa Orientale Italiana: il 6 aprile 1941 le truppe del Commonwealth (Gen. Alan Cunningham) liberano Addis Abeba, aprendo la strada al ritorno trionfale sul trono del Negus Haile Selassie I (5 maggio 1941) con la Gideon Force di Orde Wingate e i patrioti Arbegnoch; le residue truppe italiane del Viceré Amedeo di Savoia Duca d'Aosta resistono sull'Amba Alagi e a Gondar (Gen. Guglielmo Nasi).",
        'Alleati',
        "Ye’Ityōṗṗyā Nigūsa Negest Mengist (Negus Haile Selassie I — Liberazione Alleata)"
      );
    }
    return makeResult('ITA', 'Africa Orientale Italiana (AOI — Etiopia)', 'Impero proclamato il 9 maggio 1936');
  }
  if (nrm_hb.includes('libya') || nrm_hb.includes('cyrenaica') || nrm_hb.includes('tripolitania')) {
    if (s >= 8) {
      return makeResult(
        'ITA',
        'Libia Italiana (Controffensiva dell\'Afrikakorps & Assedio di Tobruk)',
        'Operazione Sonnenblume (febbraio-aprile 1941): sbarco a Tripoli del Deutsches Afrikakorps del Gen. Erwin Rommel; fulminea controffensiva italo-tedesca (24 marzo - aprile 1941) che riconquista El Agheila, Bengasi, Derna e Bardia, stringendo d\'assedio dal 10 aprile la piazzaforte di Tobruk e attestandosi sul confine egiziano di Sollum-Halfaya.',
        'Asse',
        'Comando Superiore Forze Armate Africa Settentrionale (Gen. Italo Gariboldi) & Deutsches Afrikakorps (Gen. Erwin Rommel)'
      );
    }
    return makeResult('ITA', 'Libia Italiana (Quarta Sponda)', 'Governo Generale della Libia');
  }
  if (nrm_hb.includes('eritrea')) {
    if (s >= 8) {
      return makeResult(
        'UK',
        'Eritrea (Occupazione Militare Alleata — Cheren, Asmara e Massaua)',
        'Campagna dell\'Africa Orientale (marzo-aprile 1941): dopo i 53 giorni della sanguinosa battaglia di Cheren (caduta il 27 marzo), la 4ª e 5ª Divisione Indiana del Gen. William Platt occupano Asmara (1° aprile) e la base navale di Massaua (8 aprile), ponendo fine al dominio coloniale italiano in Eritrea.',
        'Alleati',
        'Occupied Enemy Territory Administration (OETA — British Military Administration of Eritrea, Asmara)'
      );
    }
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
    if (s >= 8) {
      return makeResult(
        'UK',
        'Somalia (Occupazione Militare Alleata — Mogadiscio e Giuba)',
        'Offensiva alleata dal Kenya (febbraio 1941): l\'11ª e 12ª Divisione Africana e la 1ª Divisione Sudafricana del Gen. Alan Cunningham forzano la linea del fiume Giuba ed entrano a Mogadiscio il 25 febbraio 1941, instaurando l\'amministrazione militare britannica sulla Somalia Italiana.',
        'Alleati',
        'Occupied Enemy Territory Administration (OETA — British Military Administration of Somalia, Mogadishu)'
      );
    }
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
  if (
    nrm_hb.includes('spanish guinea') ||
    nrm_hb.includes('sp. guinea') ||
    nrm_hb.includes('guinea espanola') ||
    nrm_hb.includes('equatorial guinea') ||
    (nrm_hb.includes('guinea') && (subj === 'Spain' || subj === 'España'))
  ) {
    return s === 0
      ? makeResult('SPR', 'Guinea Española (Santa Isabel / Fernando Poo y Río Muni)', 'Segunda República Española — Territorios Españoles del Golfo de Guinea')
      : makeResult('SPA', 'Guinea Española (Santa Isabel / Fernando Poo y Río Muni)', 'Bando Nacional / Estado Español — Territorios Españoles del Golfo de Guinea');
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
  if (nid === 'TANGER' || nrm_hb.includes('tangier') || nrm_hb.includes('tanger') || nrm_hb.includes('tangeri')) {
    return s < 6
      ? makeResult('TANGER', 'Zone Internationale de Tanger', 'Administration Internationale (Statut de 1923)')
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
  if (cleanId === 'HB_YEMEN' || (nrm_hb.includes('yemen') && !nrm_hb.includes('aden') && !nrm_hb.includes('uk'))) {
    const top = getTop('YEM');
    return makeResult(
      'YEM',
      top.name || 'Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah (Sana\'a)',
      top.note || 'Dawlat al-Yaman al-Mustaqillah (Imam Yahya Muhammad Hamid ed-Din)',
      'Neutrale',
      top.adminTitle || 'Regno Mutawakkilita dello Yemen (Imamato Zaidita)'
    );
  }
  if (cleanId === 'HB_ADEN' || nrm_hb.includes('aden') || nrm_hb.includes('yemen (uk)')) {
    const top = getTop('UK');
    return makeResult(
      'UK',
      top.name || 'Aden Colony and Protectorate',
      top.note || 'British Strategic Outpost in the Red Sea (WAP, EAP & Crown Colony of Aden)',
      s >= 4 ? 'Alleati' : 'Neutrale',
      top.adminTitle || 'British Aden Protectorate & Colony'
    );
  }
  if (nrm_hb.includes('iraq')) {
    if (s >= 9) {
      return makeResult(
        'UK',
        'Kingdom of Iraq (Baghdad — British Military Control PAIFORCE)',
        'Controllo militare britannico (PAIFORCE) dopo la guerra anglo-irachena del maggio 1941 e la restaurazione del reggente filo-alleato ‘Abd al-Ilah.',
        'Alleati',
        'British Military Administration / PAIFORCE (Baghdad)'
      );
    }
    if (s >= 8) {
      return makeResult(
        'IRQ',
        'Al-Mamlakah al-‘Irāqiyyah (Governo di Difesa Nazionale Filo-Asse — Baghdad)',
        "Colpo di Stato nazionalista e filo-Asse del 1°-2 aprile 1941 guidato da Rashid Ali al-Kaylani e dai colonnelli del 'Quadrato d'Oro' (Salah al-Din al-Sabbagh); deposizione del reggente filo-britannico 'Abd al-Ilah, sbarco della 10ª Divisione Indiana britannica a Bassora (Operazione Sabine, 18 aprile) e accerchiamento iracheno della base aerea RAF Habbaniya (29-30 aprile) che apre la guerra anglo-irachena.",
        'Asse',
        'Al-Mamlakah al-‘Irāqiyyah — Governo di Difesa Nazionale (Rashid Ali al-Kaylani)'
      );
    }
    return makeResult('UK', 'Kingdom of Iraq (Baghdad)', 'British Sphere of Influence (Anglo-Iraqi Treaty of 1930)');
  }
  if (nrm_hb.includes('transjordan')) {
    return makeResult('UK', 'Emirate of Transjordan (Amman)', 'League of Nations Mandate');
  }
  if (nrm_hb.includes('palestine')) {
    return makeResult('UK', 'British Mandate for Palestine (Jerusalem)', 'League of Nations Mandate');
  }
  if (nrm_hb.includes('syria')) {
    if (s >= 9) {
      return makeResult(
        'F_SYR',
        'République Syrienne (Controllo Congiunto Francia Libera e Gran Bretagna — Damas)',
        "Armistizio di Saint-Jean-d'Acre (14 luglio 1941): al termine dell'Operazione Exporter, la Siria passa sotto il controllo congiunto della Francia Libera (Gen. Georges Catroux) e della 9ª Armata britannica.",
        'Alleati',
        'Délégation Générale de la France Libre au Levant (Gén. Georges Catroux, Damas)'
      );
    }
    const top = getTop(s < 6 ? 'F_SYR' : 'VIC_SYR');
    return s < 6
      ? makeResult('F_SYR', top.name || 'Mandat français en Syrie (Damas)', top.note || 'Mandat A de la Société des Nations confié à la France', undefined, top.adminTitle || 'Haut-Commissariat de la République Française au Levant (Beyrouth / Damas)')
      : makeResult('VIC_SYR', top.name || 'Syrie (Mandat français — Vichy)', top.note || 'Mandat sous administration du gouvernement de Vichy', 'Fantoccio', top.adminTitle || 'Haut-Commissaire Général Henri Dentz (Vichy — Damas)');
  }
  if (nrm_hb.includes('lebanon')) {
    if (s >= 9) {
      return makeResult(
        'F_SYR',
        'République Libanaise (Controllo Congiunto Francia Libera e Gran Bretagna — Beyrouth)',
        "Armistizio di Saint-Jean-d'Acre (14 luglio 1941): dopo la resa delle forze di Vichy del Gen. Henri Dentz, il Libano passa sotto il controllo congiunto della Francia Libera (Gen. Georges Catroux) e della Gran Bretagna.",
        'Alleati',
        'Délégation Générale de la France Libre au Levant (Gén. Georges Catroux, Beyrouth)'
      );
    }
    const top = getTop(s < 6 ? 'F_SYR' : 'VIC_SYR');
    return s < 6
      ? makeResult('F_SYR', top.name || 'Grand Liban (Mandat français — Beyrouth)', top.note || 'État du Grand Liban sous mandat français', undefined, top.adminTitle || 'État du Grand Liban sous Mandat Français (Beyrouth)')
      : makeResult('VIC_SYR', top.name || 'Grand Liban (Mandat français — Vichy)', top.note || 'République libanaise sous administration de Vichy', 'Fantoccio', top.adminTitle || 'Quartier Général du Général Henri Dentz (Vichy — Beyrouth)');
  }
  if (
    nrm_hb.includes('saudi') ||
    nrm_hb.includes('hejaz') ||
    nrm_hb.includes('nejd') ||
    nrm_hb.includes('najd') ||
    (nrm_hb.includes('hail') && !nrm_hb.includes('thail')) ||
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
    if (s >= 8) {
      if (nrm_hb.includes('kosovo') || nrm_hb.includes('kosova') || nrm_hb.includes('metohija')) {
        return makeResult(
          'ITA',
          'Kosovë e Metohi (Prishtinë / Prizren — Grande Albania)',
          'Territorio del Kosovo e della Metochia occupato dalle forze dell\'Asse nell\'aprile 1941 e annesso alla "Grande Albania" sotto la Corona d\'Italia.',
          'Asse',
          'Mbretnija Shqiptare (Unione Imperiale con il Regno d\'Italia)'
        );
      }
      if (nrm_hb.includes('montenegro') || nrm_hb.includes('crna gora') || nrm_hb.includes('zeta')) {
        return makeResult(
          'ITA',
          'Governatorato del Montenegro e Provincia di Cattaro (Cettigne)',
          'Occupazione italiana del Montenegro (aprile 1941): annessione delle Bocche di Cattaro al Governatorato della Dalmazia e istituzione del Governatorato del Montenegro a Cettigne.',
          'Asse',
          'Regno d\'Italia — Governatorato del Montenegro (Alto Commissario Serafino Mazzolini)'
        );
      }
      if (nrm_hb.includes('macedonia') || nrm_hb.includes('makedonija') || nrm_hb.includes('vardar')) {
        return makeResult(
          'BUL',
          'Makedonija (Skopje / Bitola — Occupazione e Annessione Bulgara)',
          'Invasione e smembramento della Jugoslavia (aprile 1941): la 5ª Armata bulgara occupa la Macedonia del Vardar (Skopje, Bitola, Veles, Prilep, Ohrid), annessa al Regno di Bulgaria di Re Boris III (eccetto Tetovo, Gostivar, Debar e Struga annesse alla Grande Albania italiana).',
          'Asse',
          'Tsarstvo Balgariya — Skopska i Bitolska oblast'
        );
      }
      if (nrm_hb.includes('vojvodina')) {
        return makeResult(
          'HUN',
          'Bácska (Délvidék — Újvidék / Szabadka)',
          'Occupazione e annessione ungherese della Bácska (aprile 1941) da parte della 3ª Armata ungherese; il Banato resta sotto amministrazione militare tedesca affidata alla minoranza Volksdeutsche.',
          'Asse',
          'Magyar Királyság — Délvidék (Bács-Bodrog vármegye)'
        );
      }
      if (
        nrm_hb.includes('croatia') ||
        nrm_hb.includes('hrvatska') ||
        nrm_hb.includes('bosnia') ||
        nrm_hb.includes('herzegovina') ||
        nrm_hb.includes('hercegovina') ||
        nrm_hb.includes('vrbas') ||
        nrm_hb.includes('drina') ||
        nrm_hb.includes('sava')
      ) {
        return makeResult(
          'CRO',
          'Nezavisna Država Hrvatska — NDH (Zagreb / Sarajevo / Banja Luka)',
          'Stato Indipendente di Croazia (NDH) proclamato a Zagabria il 10 aprile 1941 da Slavko Kvaternik e guidato dal Poglavnik Ante Pavelić (movimento Ustascia), comprendente Croazia, Slavonia, Sirmia e l\'intera Bosnia ed Erzegovina, ripartito lungo la Linea di Vienna tra zona d\'influenza militare tedesca e italiana.',
          'Fantoccio',
          'Nezavisna Država Hrvatska (Stato Indipendente di Croazia — Poglavnik Ante Pavelić)'
        );
      }
      return makeResult(
        'GER',
        'Gebiet des Militärbefehlshabers in Serbien (Beograd)',
        'Operazione 25 (6-17 aprile 1941): invasione, bombardamento di Belgrado (Operazione Castigo) e capitolazione del Regno di Jugoslavia; la Serbia centrale e il Banato sono posti sotto amministrazione militare diretta della Wehrmacht (Gen. Helmuth Förster / Governo dei Commissari di Milan Aćimović).',
        'Asse',
        'Gebiet des Militärbefehlshabers in Serbien (Beograd)'
      );
    }
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
    const top = getExtendedToponym(name, ov.o, nid, c, s);
    if (ov.o === 'FRA') {
      return s < 6
        ? makeResult('FRA', top.name, top.note, undefined, top.adminTitle || 'Troisième République française')
        : makeResult('VIC', top.name, top.note, 'Fantoccio', top.adminTitle || 'État français (Régime de Vichy)');
    }
    if (ov.o.startsWith('F_')) {
      if (s >= 6) {
        if (ov.o === 'F_AEF') {
          if (name.toLowerCase().includes('gabon')) {
            if (s === 6) {
              const vicTop = getExtendedToponym(name, 'VIC_AEF', nid, c, s);
              return makeResult(
                'VIC_AEF',
                vicTop.name || 'Colonie du Gabon (Vichy — Libreville)',
                vicTop.note || 'Le Gabon reste fidèle au régime de Vichy sous le gouverneur Georges Masson jusqu\'à la campagne du Gabon menée par Leclerc et Koenig.',
                'Fantoccio',
                vicTop.adminTitle || 'Colonie du Gabon (Vichy — Libreville)'
              );
            }
          }
          const fflTop = getExtendedToponym(name, 'FFL_AEF', nid, c, s);
          return makeResult(
            'FFL_AEF',
            fflTop.name || top.name,
            fflTop.note || top.note || 'Afrique française libre ralliée sous Félix Éboué',
            'Alleati',
            fflTop.adminTitle || 'Afrique française libre — Félix Éboué & De Gaulle (Brazzaville)'
          );
        }

        // Ralliement de l'Empire (Océanie & Inde) à la France Libre à partir de Step 7 (OTT 1940)
        if (ov.o === 'F_COL') {
          const nrmCol = name.toLowerCase();
          const isRallied =
            nrmCol.includes('hebrid') ||
            nrmCol.includes('caledon') ||
            nrmCol.includes('polynesi') ||
            nrmCol.includes('tahiti') ||
            nrmCol.includes('french india') ||
            nrmCol.includes('inde') ||
            nrmCol.includes('pondicher');
          if (isRallied && s >= 7) {
            const fflTop = getExtendedToponym(name, 'FFL_AEF', nid, c, s);
            return makeResult(
              'FFL_AEF',
              fflTop.name || top.name,
              fflTop.note || 'Territoire d\'outre-mer rallié à la France Libre du Général de Gaulle en 1940',
              'Alleati',
              fflTop.adminTitle || 'France Libre — Conseil de défense de l\'Empire'
            );
          }
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
        const vicTop = getExtendedToponym(name, vicKey, nid, c, s);
        if (vicKey === 'VIC_SYR' && s >= 9) {
          return makeResult(
            'F_SYR',
            vicTop.name || 'Syrie et Liban (Controllo Congiunto Francia Libera e Gran Bretagna)',
            "Operazione Exporter e Armistizio di Saint-Jean-d'Acre (14 luglio 1941): dopo la resa delle forze di Vichy del Gen. Henri Dentz, Siria e Libano passano sotto il controllo congiunto della Francia Libera (Gen. Georges Catroux) e della Gran Bretagna.",
            'Alleati',
            'Délégation Générale de la France Libre au Levant (Gén. Georges Catroux) & British 9th Army'
          );
        }
        if (vicKey === 'VIC_IND' && s >= 9) {
          return makeResult(
            'JAP',
            'Indochine française (Occupazione Militare Giapponese Integrale — Operazione Fu-Go, Luglio 1941)',
            "Occupazione militare giapponese dell'intera Indocina francese completata a fine luglio 1941 (Operazione Fu-Go, 28 luglio 1941) e impiegata nel dicembre 1941 come piattaforma d'attacco dell'Esercito Meridionale giapponese (Gen. Hisaichi Terauchi) contro la Malesia britannica e la Thailandia.",
            'Asse',
            "Impero Giapponese — Gruppo d'Armate di Spedizione Meridionale (Saigon) / Amministrazione Subordinata Vichy"
          );
        }
        if (vicKey === 'VIC_IND' && s >= 7) {
          return makeResult(
            'VIC_IND',
            vicTop.name || top.name || 'Indochine française (Hanoï — Stazionamento Militare Giapponese nel Tonchino)',
            'Accordo franco-giapponese di Hanoi (22 settembre 1940): dopo gli scontri di Lạng Sơn e lo sbarco a Haiphong, la 5ª Divisione dell\'Esercito Imperiale Giapponese presidia le basi aeree e ferroviarie del Tonchino settentrionale per bloccare i rifornimenti a Chongqing, sotto l\'amministrazione Vichy dell\'Ammiraglio Jean Decoux.',
            'Fantoccio',
            'Gouvernement Général de l\'Indochine (Amiral Jean Decoux — Vichy / Stazionamento Imperiale Giapponese nel Tonchino)'
          );
        }
        return makeResult(
          vicKey,
          vicTop.name || top.name,
          vicTop.note || top.note || 'Administration coloniale sous tutelle de Vichy',
          'Fantoccio',
          vicTop.adminTitle || 'Administration coloniale de Vichy'
        );
      }
      return makeResult(ov.o, top.name, top.note, undefined, top.adminTitle);
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
    if (ov.o === 'AFG') {
      const resAfg = resolveAfghanistanProvince(cleanId || nid || name, s);
      if (resAfg) return resAfg;
      return makeResult(
        'AFG',
        top.name || `${name} (Afghanistan)`,
        top.note || 'Regno dell\'Afghanistan / Da Afghānistān Shāhī Dawlat',
        'Neutrale',
        top.adminTitle || 'Da Afghānistān Shāhī Dawlat (Regno dell\'Afghanistan)'
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
    if (ov.o === 'UK') {
      return makeResult(
        'UK',
        top.name,
        top.note || 'Territorio d\'oltremare della Corona Britannica',
        s >= 4 ? 'Alleati' : 'Neutrale',
        top.adminTitle || 'British Empire'
      );
    }
    if (ov.o === 'AST' || ov.o === 'CAN' || ov.o === 'NZL' || ov.o === 'SAF' || ov.o === 'RAJ') {
      return makeResult(
        ov.o,
        top.name,
        top.note || 'Dominion britannico o impero associato',
        s >= 4 ? 'Alleati' : 'Neutrale',
        top.adminTitle || 'British Commonwealth of Nations'
      );
    }
    if (ov.o === 'USA') {
      if (s >= 9 && (name === 'Guam' || nrm_hb.includes('guam') || name === 'Wake Island' || nrm_hb.includes('wake'))) {
        const isWake = name === 'Wake Island' || nrm_hb.includes('wake');
        return makeResult(
          'JAP',
          isWake ? 'Ōtori-jima (Wake Island — Occupazione Imperiale Giapponese)' : 'Ōmiya-jima (Guam — Occupazione Imperiale Giapponese)',
          isWake
            ? 'Battaglia dell\'Isola di Wake (8-23 dicembre 1941): dopo aver respinto il primo tentativo di sbarco giapponese l\'11 dicembre, la guarnigione dei Marines statunitensi (Maggiore James Devereux e Cdr. Winfield Cunningham) è costretta alla resa il 23 dicembre 1941 di fronte al secondo assalto anfibio della Marina Imperiale.'
            : 'Battaglia di Guam (8-10 dicembre 1941): attaccata poche ore dopo Pearl Harbor, l\'isola di Guam viene invasa il 10 dicembre 1941 dal Distaccamento dei Mari del Sud (Magg. Gen. Tomitarō Horii); il governatore statunitense Capt. George McMillin capitola a Hagåtña.',
          'Asse',
          'Dai Nippon Teikoku Kaigun — Occupazione Militare Giapponese'
        );
      }
      return makeResult(
        'USA',
        top.name,
        top.note || (s >= 9 ? 'Stati Uniti d\'America — Potenza Belligerante Alleata (Dichiarazione di guerra a Giappone, Germania e Italia, 8-11 dicembre 1941)' : 'Stati Uniti d\'America'),
        'Alleati',
        top.adminTitle || 'United States of America'
      );
    }
    if (ov.o === 'GRE') {
      if (s >= 8) {
        if (nrm_hb.includes('crete') || nrm_hb.includes('kriti') || nrm_hb.includes('chania') || nrm_hb.includes('heraklion') || (c && c[1] > 0 && c[1] < 35.7)) {
          if (s >= 9) {
            return makeResult(
              'GER',
              'Festung Kreta (Chania / Heraklion — Occupazione Militare Tedesca)',
              'Operazione Merkur (20 maggio - 1° giugno 1941): conquista aviotrasportata tedesca di Creta (XI. Fliegerkorps del Gen. Kurt Student) e trasformazione dell\'isola nella "Festung Kreta" sotto comando tedesco (province occidentali e centrali) e italiano (Lasithi).',
              'Asse',
              'Kommandant der Festung Kreta — Wehrmacht Besatzungszone'
            );
          }
          return makeResult(
            'GRE',
            'Kriti — Roccaforte Alleata e Sede del Governo Greco (Chania / Heraklion)',
            'Dopo la caduta della Grecia continentale (Operazione Marita, aprile 1941), Re Giorgio II e il Primo Ministro Emmanouil Tsouderos si trasferiscono a La Canea (Creta), difesa dalla guarnigione greca e dalla Creforce del Commonwealth (Magg. Gen. Bernard Freyberg).',
            'Alleati',
            'Vasileion tis Ellados — Governo Reale di Re Giorgio II a Creta & Creforce Alleata'
          );
        }
        return makeResult(
          'ITA',
          'Elliniki Politeia (Occupazione Tripartita dell\'Asse — Atene)',
          'Operazione Marita (6-30 aprile 1941): sfondamento della Linea Metaxas, ingresso della Wehrmacht a Salonicco (9 aprile) e ad Atene (27 aprile), insediamento del governo collaborazionista del Gen. Georgios Tsolakoglou e spartizione della Grecia continentale in zone d\'occupazione tedesca, italiana (11ª Armata) e bulgara.',
          'Asse',
          'Occupazione Militare dell\'Asse in Grecia (Governo Collaborazionista Georgios Tsolakoglou)'
        );
      }
      return makeResult(
        'GRE',
        top.name,
        top.note || (s >= 7 ? 'Regno di Grecia — Belligerante Alleato ("Giorno dell\'Oxi", 28 ottobre 1940)' : 'Regno di Grecia (Regime del 4 Agosto)'),
        s >= 7 ? 'Alleati' : 'Neutrale',
        top.adminTitle || 'Vasileion tis Ellados'
      );
    }
    if (ov.o === 'SIA' && s >= 9) {
      return makeResult(
        'SIA',
        top.name || 'Ratcha-anachak Thai (Regno di Thailandia — Alleato del Giappone)',
        top.note || 'Dopo il breve scontro armato dell\'8 dicembre 1941, il Primo Ministro Maresciallo Plaek Phibunsongkhram ordina il cessate il fuoco, consente il transito alla 15ª e 25ª Armata giapponese verso Malesia e Birmania e il 21 dicembre 1941 firma nel Tempio del Buddha di Smeraldo a Bangkok il Trattato formale di Alleanza militare offensiva e difensiva con l\'Impero Giapponese.',
        'Asse',
        top.adminTitle || 'Ratcha-anachak Thai — Maresciallo Plaek Phibunsongkhram (Alleanza con il Giappone)'
      );
    }
    if (ov.o === 'BUL') {
      return makeResult(
        'BUL',
        top.name,
        top.note || (s >= 8 ? 'Adesione al Patto Tripartito (1° marzo 1941) e occupazione della Macedonia del Vardar e della Tracia Occidentale (Belomorie).' : 'Tsarstvo Balgariya (Tsar Boris III)'),
        s >= 8 ? 'Asse' : 'Neutrale',
        top.adminTitle || 'Tsarstvo Balgariya'
      );
    }
    if (ov.o === 'HUN') {
      return makeResult(
        'HUN',
        top.name,
        top.note || 'Magyar Királyság',
        s >= 7 ? 'Asse' : undefined,
        top.adminTitle || 'Magyar Királyság'
      );
    }
    if (ov.o === 'ROM') {
      return makeResult(
        'ROM',
        top.name,
        top.note || (s >= 7 ? 'Stato Nazionale Legionario (Gen. Ion Antonescu — Missione Militare Tedesca)' : 'Regatul României'),
        s >= 7 ? 'Asse' : 'Neutrale',
        top.adminTitle || (s >= 7 ? 'Statul Național-Legionar (Regatul României)' : 'Regatul României')
      );
    }
    return makeResult(ov.o, top.name, top.note || top.adminTitle, undefined, top.adminTitle);
  }

  return makeResult('NEU', name || 'Territorio non organizzato');
}

export function resolveEstonianProvince(
  s: number,
  nid: string,
  p: any,
  rawName: string
): ResolvedTerritory {
  const histName = p?.HISTORICAL_NAME || p?.NUTS_NAME || rawName;
  if (s >= 9) {
    return makeResult(
      'GER',
      `Generalbezirk Estland — ${histName || 'Reval / Tallinn'} (Reichskommissariat Ostland)`,
      `Reichskommissariat Ostland (Generalbezirk Estland) — Conquistata dal Gruppo d'Armate Nord della Wehrmacht (18ª Armata del Gen. Georg von Küchler; presa di Tallinn il 28 agosto 1941 e delle isole baltiche di Saaremaa e Hiiumaa nell'Operazione Beowulf a ottobre 1941). Il 5 dicembre 1941 il territorio passa sotto l'amministrazione civile del Commissario Generale Karl-Siegmund Litzmann a Reval (Tallinn), subordinato al Reichskommissar Hinrich Lohse.`,
      'Asse',
      'Reichskommissariat Ostland — Generalbezirk Estland (Generalkommissar Karl-Siegmund Litzmann, Reval)'
    );
  }
  const nrm = normStr(nid + ' ' + (histName || '') + ' ' + (rawName || ''));

  // 1. Põhja-Eesti / Harjumaa (Tallinn, Paldiski)
  if (nid === 'EE001' || nrm.includes('pohja') || nrm.includes('harju') || nrm.includes('tallinn')) {
    if (s < 6) {
      return makeResult(
        'EST',
        'Põhja-Eesti — Harjumaa (Tallinn)',
        'Eesti Vabariik — Capitale Tallinn (sede del Parlamento Riigikogu e della collina governativa di Toompea), porto commerciale sul Golfo di Finlandia e base navale strategica di Paldiski.',
        'Neutrale',
        'Eesti Vabariik — Riigihoidja / President Konstantin Päts'
      );
    }
    return makeResult(
      'SOV',
      'Tallinn ja Harjumaa — Estonskaya SSR',
      'Estonskaya SSR — Occupazione militare sovietica il 17 giugno 1940 a seguito dell\'ultimatum di Molotov; instaurazione del regime fantoccio di Johannes Vares e annessione all\'URSS il 6 agosto 1940.',
      'Comintern',
      'SSSR — Estonskaya SSR (Baltiyskiy Flot)'
    );
  }

  // 2. Lääne-Eesti e Arcipelago (Saaremaa, Hiiumaa, Pärnu, Haapsalu)
  if (
    nid === 'EE004' ||
    nrm.includes('laane') ||
    nrm.includes('saare') ||
    nrm.includes('hiiu') ||
    nrm.includes('parnu') ||
    nrm.includes('haapsalu')
  ) {
    if (s < 6) {
      return makeResult(
        'EST',
        'Lääne-Eesti ja Saared (Pärnu, Saaremaa, Hiiumaa)',
        'Eesti Vabariik — Arcipelago baltico (isole di Saaremaa/Ösel e Hiiumaa/Dagö) e litorale occidentale (Haapsalu, Pärnu). Con il Patto di Mutua Assistenza del 28 settembre 1939, l\'URSS ottiene basi aeronavali per 25.000 truppe sovietiche.',
        'Neutrale',
        'Eesti Vabariik — Lääne ja Saare Maakonnad'
      );
    }
    return makeResult(
      'SOV',
      'Lääne-Eesti — Estonskaya SSR (Saaremaa i Khiuma)',
      'Estonskaya SSR — Settore difensivo costiero della Flotta sovietica del Baltico a presidio dell\'imboccatura del Golfo di Riga e della penisola fortificata di Sõrve.',
      'Comintern',
      'SSSR — Estonskaya SSR (Basi Navali del Baltico)'
    );
  }

  // 3. Kesk-Eesti (Järvamaa, Paide, Tapa, Rapla, Jõgeva)
  if (
    nid === 'EE009' ||
    nrm.includes('kesk') ||
    nrm.includes('jarva') ||
    nrm.includes('jogeva') ||
    nrm.includes('rapla') ||
    nrm.includes('paide') ||
    nrm.includes('tapa')
  ) {
    if (s < 6) {
      return makeResult(
        'EST',
        'Kesk-Eesti — Järvamaa (Paide / Tapa)',
        'Eesti Vabariik — Cuore agricolo dell\'Estonia centrale (Paide, Türi) e nevralgico snodo ferroviario di Tapa con linee di raccordo per Tallinn, Narva e Tartu.',
        'Neutrale',
        'Eesti Vabariik — Kesk-Eesti Maakonnad'
      );
    }
    return makeResult(
      'SOV',
      'Kesk-Eesti — Estonskaya SSR (Paide)',
      'Estonskaya SSR — Annessione sovietica dell\'Estonia centrale; controllo dei nodi ferroviari interni e riorganizzazione agricola sotto le direttive del Soviet Supremo.',
      'Comintern',
      'SSSR — Estonskaya SSR (Eesti NSV)'
    );
  }

  // 4. Kirde-Eesti / Virumaa (Narva, Rakvere, Kohtla-Järve)
  if (
    nid === 'EE00A' ||
    nrm.includes('kirde') ||
    nrm.includes('viru') ||
    nrm.includes('narva') ||
    nrm.includes('kohtla') ||
    nrm.includes('rakvere')
  ) {
    if (s < 6) {
      return makeResult(
        'EST',
        'Kirde-Eesti — Virumaa (Narva / Kohtla-Järve)',
        'Eesti Vabariik — Fortezza confinaria sul fiume Narva lungo la frontiera stabilita dal Trattato di Tartu (1920) e strategico bacino minerario di scisti bituminosi (põlevkivi) di Kohtla-Järve e Jõhvi.',
        'Neutrale',
        'Eesti Vabariik — Viru Maakond'
      );
    }
    return makeResult(
      'SOV',
      'Kirde-Eesti — Estonskaya SSR (Narvskiy rayon)',
      'Estonskaya SSR — Integrazione economica nel sistema industriale sovietico della produzione di combustibili fossili da scisto e controllo militare della frontiera del Narva.',
      'Comintern',
      'SSSR — Estonskaya SSR (Eesti NSV)'
    );
  }

  // 5. Lõuna-Eesti / Tartumaa (Tartu, Valga, Võru, Viljandi, Petserimaa)
  if (
    nid === 'EE008' ||
    nrm.includes('louna') ||
    nrm.includes('tartu') ||
    nrm.includes('valga') ||
    nrm.includes('voru') ||
    nrm.includes('viljandi') ||
    nrm.includes('petseri')
  ) {
    if (s < 6) {
      return makeResult(
        'EST',
        'Lõuna-Eesti — Tartumaa ja Petserimaa (Tartu / Valga)',
        'Eesti Vabariik — Tartu (storica capitale culturale e accademica con l\'università fondata nel 1632), Valga (nodo ferroviario di confine con la Lettonia) e distretto confinaio di Petserimaa (Pechory, monastero ortodosso delle Grotte del 1473 integrato nel 1920).',
        'Neutrale',
        'Eesti Vabariik — Lõuna-Eesti Maakonnad'
      );
    }
    return makeResult(
      'SOV',
      'Lõuna-Eesti — Estonskaya SSR (Tartu / Pechory)',
      'Estonskaya SSR — Annessione sovietica dell\'Estonia meridionale (il distretto confinaio di Petserimaa/Pechory verrà successivamente annesso alla RSFSR russa nel 1944).',
      'Comintern',
      'SSSR — Estonskaya SSR (Eesti NSV)'
    );
  }

  // Fallback generale Estonia
  if (s < 6) {
    return makeResult(
      'EST',
      `Eesti Vabariik (${histName || 'Eesti'})`,
      'Eesti Vabariik — Stato sovrano neutrale baltico sotto la presidenza di Konstantin Päts.',
      'Neutrale',
      'Eesti Vabariik'
    );
  }
  return makeResult(
    'SOV',
    `${histName || 'Eesti'} — Estonskaya SSR`,
    'Estonskaya SSR — Repubblica Socialista Sovietica Estone annessa all\'URSS il 6 agosto 1940.',
    'Comintern',
    'SSSR — Estonskaya SSR'
  );
}

export function resolveLatvianProvince(
  s: number,
  nid: string,
  p: any,
  rawName: string
): ResolvedTerritory {
  const histName = p?.HISTORICAL_NAME || p?.NUTS_NAME || rawName;
  if (s >= 9) {
    return makeResult(
      'GER',
      `Generalbezirk Lettland — ${histName || 'Riga'} (Reichskommissariat Ostland)`,
      `Reichskommissariat Ostland (Generalbezirk Lettland) — Occupata dal Gruppo d'Armate Nord tedesco tra fine giugno e inizio luglio 1941 (caduta di Riga il 1° luglio 1941). Riga diviene la capitale amministrativa dell'intero Reichskommissariat Ostland (istituito il 17 luglio 1941 sotto il Reichskommissar Hinrich Lohse) e sede del Generalbezirk Lettland guidato dal Generalkommissar Otto-Heinrich Drechsler.`,
      'Asse',
      'Reichskommissariat Ostland — Hauptstadt Riga & Generalbezirk Lettland (Reichskommissar Hinrich Lohse / Otto-Heinrich Drechsler)'
    );
  }
  const nrm = normStr(nid + ' ' + (histName || '') + ' ' + (rawName || ''));

  // 1. Rīga capitale
  if (nid === 'LV006' || nid === 'LV001' || nrm === 'riga' || rawName === 'Rīga' || rawName === 'Riga') {
    if (s < 6) {
      return makeResult(
        'LAT',
        'Rīga (Latvijas Galvaspilsēta)',
        'Latvijas Republika — Capitale della Lettonia, porto marittimo sull\'estuario del Daugava e centro politico del regime autoritario di Kārlis Ulmanis (Vadonis).',
        'Neutrale',
        'Latvijas Republika — Valsts Prezidents Kārlis Ulmanis'
      );
    }
    return makeResult(
      'SOV',
      'Riga (Latviyskaya SSR)',
      'Latviyskaya SSR — Truppe sovietiche dell\'Armata Rossa occupano Riga il 17 giugno 1940; instaurazione del governo fantoccio di Augusts Kirhenšteins e annessione all\'URSS il 5 agosto 1940.',
      'Comintern',
      'SSSR — Latviyskaya SSR (Latvijas PSR)'
    );
  }

  // 2. Pierīga (Jūrmala, Ogre, Sigulda, Tukums)
  if (
    nid === 'LV007' ||
    nrm.includes('pieriga') ||
    nrm.includes('jurmala') ||
    nrm.includes('ogre') ||
    nrm.includes('sigulda')
  ) {
    if (s < 6) {
      return makeResult(
        'LAT',
        'Pierīga (Jūrmala, Ogre, Sigulda)',
        'Latvijas Republika — Cintura costiera e metropolitana della capitale: stazioni balneari del Golfo di Riga (Jūrmala), valle del Gauja (Sigulda) e polo industriale di Ogre.',
        'Neutrale',
        'Latvijas Republika — Rīgas apriņķis'
      );
    }
    return makeResult(
      'SOV',
      'Pierīga — Latviyskaya SSR',
      'Latviyskaya SSR — Fascia difensiva e nodi di trasporto intorno a Riga presidiati dalle truppe d\'occupazione dell\'Armata Rossa.',
      'Comintern',
      'SSSR — Latviyskaya SSR (Latvijas PSR)'
    );
  }

  // 3. Kurzeme / Curlandia (Liepāja, Ventspils, Kuldīga)
  if (
    nid === 'LV003' ||
    nrm.includes('kurzeme') ||
    nrm.includes('liepaja') ||
    nrm.includes('ventspils') ||
    nrm.includes('kuldiga')
  ) {
    if (s < 6) {
      return makeResult(
        'LAT',
        'Kurzeme (Liepāja, Ventspils, Kuldīga)',
        'Latvijas Republika — Regione costiera di Curlandia con i porti d\'alto mare di Liepāja (Libau, base navale non geliva) e Ventspils (Windau). Con il patto del 5 ottobre 1939, l\'URSS ottiene basi navali e aeree per 30.000 militari sovietici.',
        'Neutrale',
        'Latvijas Republika — Kurzemes apgabals'
      );
    }
    return makeResult(
      'SOV',
      'Kurzeme — Latviyskaya SSR (Liepaya / Ventspils)',
      'Latviyskaya SSR — Grandi basi aeronavali sovietiche di Liepāja e Ventspils sul Mar Baltico poste sotto il comando della Flotta del Baltico dell\'URSS.',
      'Comintern',
      'SSSR — Latviyskaya SSR (Flotta del Baltico)'
    );
  }

  // 4. Latgale / Letgallia (Daugavpils, Rēzekne, Abrene)
  if (
    nid === 'LV005' ||
    nrm.includes('latgale') ||
    nrm.includes('daugavpils') ||
    nrm.includes('rezekne') ||
    nrm.includes('abrene')
  ) {
    if (s < 6) {
      return makeResult(
        'LAT',
        'Latgale (Daugavpils, Rēzekne, Abrene)',
        'Latvijas Republika — Provincia orientale di Letgallia: fortezza storica di Daugavpils (Dvinsk) sul Daugava, Rēzekne e distretto confinaio di Abrene (Jaunlatgale/Pytalovo) stabilito dal Trattato di Riga del 1920 con la Russia sovietica.',
        'Neutrale',
        'Latvijas Republika — Latgales apgabals'
      );
    }
    return makeResult(
      'SOV',
      'Latgale — Latviyskaya SSR (Daugavpils / Dvinsk)',
      'Latviyskaya SSR — Settore di penetrazione delle colonne corazzate sovietiche il 17 giugno 1940; il distretto di Abrene verrà scorporato e ceduto alla RSFSR russa nel 1944.',
      'Comintern',
      'SSSR — Latviyskaya SSR (Latvijas PSR)'
    );
  }

  // 5. Vidzeme / Livonia (Valmiera, Cēsis, Madona, Alūksne)
  if (
    nid === 'LV008' ||
    nrm.includes('vidzeme') ||
    nrm.includes('valmiera') ||
    nrm.includes('cesis') ||
    nrm.includes('madona')
  ) {
    if (s < 6) {
      return makeResult(
        'LAT',
        'Vidzeme (Valmiera, Cēsis, Madona)',
        'Latvijas Republika — Livonia centrale: Valmiera, Cēsis (luogo della storica battaglia del 1919 che spezzò il dominio tedesco-baltico della Landeswehr) e Alūksne.',
        'Neutrale',
        'Latvijas Republika — Vidzemes apgabals'
      );
    }
    return makeResult(
      'SOV',
      'Vidzeme — Latviyskaya SSR',
      'Latviyskaya SSR — Annessione sovietica della Livonia lettone; collettivizzazione e controllo militare dei corridoi tra Riga e Pskov.',
      'Comintern',
      'SSSR — Latviyskaya SSR (Latvijas PSR)'
    );
  }

  // 6. Zemgale / Semigallia (Jelgava, Bauska, Jēkabpils)
  if (
    nid === 'LV009' ||
    nrm.includes('zemgale') ||
    nrm.includes('jelgava') ||
    nrm.includes('bauska') ||
    nrm.includes('jekabpils')
  ) {
    if (s < 6) {
      return makeResult(
        'LAT',
        'Zemgale (Jelgava, Bauska, Jēkabpils)',
        'Latvijas Republika — Pianure meridionali di Semigallia sul fiume Lielupe: Jelgava (Mitau, storica capitale ducale con il Palazzo di Rastrelli), Bauska e Jēkabpils sul Daugava.',
        'Neutrale',
        'Latvijas Republika — Zemgales apgabals'
      );
    }
    return makeResult(
      'SOV',
      'Zemgale — Latviyskaya SSR (Yelgava / Bauska)',
      'Latviyskaya SSR — Occupazione sovietica e nazionalizzazione delle grandi industrie agricole di Semigallia lungo la direttrice tra Riga e Šiauliai.',
      'Comintern',
      'SSSR — Latviyskaya SSR (Latvijas PSR)'
    );
  }

  // Fallback generale Lettonia
  if (s < 6) {
    return makeResult(
      'LAT',
      `Latvijas Republika (${histName || 'Latvija'})`,
      'Latvijas Republika — Repubblica neutrale di Lettonia sotto la guida di Kārlis Ulmanis.',
      'Neutrale',
      'Latvijas Republika'
    );
  }
  return makeResult(
    'SOV',
    `${histName || 'Latvija'} — Latviyskaya SSR`,
    'Latviyskaya SSR — Repubblica Socialista Sovietica Lettone annessa all\'URSS il 5 agosto 1940.',
    'Comintern',
    'SSSR — Latviyskaya SSR'
  );
}

export function resolveLithuanianProvince(
  s: number,
  nid: string,
  p: any,
  rawName: string
): ResolvedTerritory {
  const histName = p?.HISTORICAL_NAME || p?.NUTS_NAME || rawName;
  const nrm = normStr(nid + ' ' + (histName || '') + ' ' + (rawName || ''));
  if (s >= 9 && nid !== 'LT023' && nid !== 'MEMEL' && !nrm.includes('memel') && !nrm.includes('klaipedos krastas')) {
    return makeResult(
      'GER',
      `Generalbezirk Litauen — ${histName || 'Kauen / Wilna'} (Reichskommissariat Ostland)`,
      `Reichskommissariat Ostland (Generalbezirk Litauen) — Travolta nella prima settimana dell'Operazione Barbarossa (giugno 1941, presa di Kaunas e Vilnius il 24 giugno), la Lituania è incorporata nel Reichskommissariat Ostland (decreto del 17 luglio 1941) come Generalbezirk Litauen con sede a Kauen (Kaunas) sotto il Generalkommissar Theodor Adrian von Renteln.`,
      'Asse',
      'Reichskommissariat Ostland — Generalbezirk Litauen (Generalkommissar Theodor Adrian von Renteln, Kauen)'
    );
  }

  // 1. Memel Territory / Klaipėdos kraštas (LT023 o enclave)
  if (
    nid === 'LT023' ||
    nid === 'MEMEL' ||
    nrm.includes('memel') ||
    nrm.includes('klaipedos krastas')
  ) {
    if (s < 3) {
      return makeResult(
        'LIT',
        'Klaipėdos kraštas (Memel)',
        'Lietuvos Respublika — Regione autonoma di Klaipėda sotto sovranità lituana (Convenzione di Klaipėda del 1924); unico sbocco marittimo commerciale d\'alto mare della Lituania.',
        'Neutrale',
        'Lietuvos Respublika — Autonominis Klaipėdos kraštas'
      );
    }
    return makeResult(
      'GER',
      'Memelland (Regierungsbezirk Gumbinnen)',
      'Deutsches Reich — Cessione forzata a seguito dell\'ultimatum di Ribbentrop del 20-22 marzo 1939; annessa al Terzo Reich e incorporata nella provincia della Prussia Orientale.',
      'Asse',
      'Deutsches Reich — Gau Ostpreußen'
    );
  }

  // 2. Vilniaus apskritis / Wilno (LT011)
  if (
    nid === 'LT011' ||
    nrm.includes('vilniaus') ||
    nrm.includes('vilnius') ||
    nrm.includes('wilno') ||
    nrm.includes('wilenskie')
  ) {
    if (s < 5) {
      return makeResult(
        'POL',
        'Województwo Wileńskie (Wilno)',
        'Rzeczpospolita Polska — Kresy Północno-Wschodnie: capoluogo Wilno con l\'Università Stefan Batory e la cappella della Madonna di Ostra Brama, rivendicato dalla Lituania come capitale storica.',
        'Alleati',
        'Rzeczpospolita Polska — Województwo Wileńskie'
      );
    }
    if (s === 5) {
      return makeResult(
        'LIT',
        'Vilniaus kraštas (Vilnius)',
        'Lietuvos Respublika — Trattato di mutua assistenza sovietico-lituano del 10 ottobre 1939: l\'URSS restituisce Vilnius e la sua regione (6.909 km²) alla Lituania in cambio dello stanziamento di 20.000 militari dell\'Armata Rossa ("Vilnius — mūsų, o mes — rusų").',
        'Neutrale',
        'Lietuvos Respublika — Vilniaus apskritis'
      );
    }
    return makeResult(
      'SOV',
      'Vilnius (Lietuvos TSR)',
      'SSSR — Vilnius proclamata capitale della Repubblica Socialista Sovietica Lituana (Lietuvos TSR), incorporata nell\'URSS il 3 agosto 1940 a seguito dell\'invasione di giugno.',
      'Comintern',
      'SSSR — Lietuvos TSR (Litovskaya SSR)'
    );
  }

  // 3. Kauno apskritis — Laikinoji sostinė (LT022)
  if (nid === 'LT022' || nrm.includes('kaun')) {
    if (s < 6) {
      return makeResult(
        'LIT',
        'Kauno apskritis — Laikinoji sostinė (Kaunas)',
        'Lietuvos Respublika — Kaunas capitale provvisoria (Laikinoji sostinė) dello Stato lituano dal 1920 al 1939. Sede del Presidente Antanas Smetona, del governo e delle legazioni diplomatiche straniere (tra cui il console giapponese Chiune Sugihara).',
        'Neutrale',
        'Lietuvos Respublika — Prezidentas Antanas Smetona'
      );
    }
    return makeResult(
      'SOV',
      'Kaunas (Lietuvos TSR)',
      'SSSR — Occupazione delle divisioni corazzate sovietiche il 15 giugno 1940; il presidente Smetona fugge in Germania attraverso Kybartai. Instaurazione del governo fantoccio di Justas Paleckis.',
      'Comintern',
      'SSSR — Lietuvos TSR (Litovskaya SSR)'
    );
  }

  // 4. Alytaus apskritis (LT021)
  if (nid === 'LT021' || nrm.includes('alyt')) {
    if (s < 6) {
      return makeResult(
        'LIT',
        'Alytaus apskritis (Alytus / Druskininkai)',
        'Lietuvos Respublika — Distretto meridionale sul fiume Nemunas, centro di guarnigione; dall\'ottobre 1939 ospita una delle quattro basi militari sovietiche pattuite con Mosca.',
        'Neutrale',
        'Lietuvos Respublika — Alytaus apskritis'
      );
    }
    return makeResult(
      'SOV',
      'Alytus (Lietuvos TSR)',
      'SSSR — Guarnigione e base strategica sovietica a ridosso della frontiera di Suwałki e della Prussia Orientale.',
      'Comintern',
      'SSSR — Lietuvos TSR (Litovskaya SSR)'
    );
  }

  // 5. Marijampolės apskritis / Suvalkija (LT024)
  if (
    nid === 'LT024' ||
    nrm.includes('marijampol') ||
    nrm.includes('suvalk') ||
    nrm.includes('kybart') ||
    nrm.includes('vilkavisk')
  ) {
    if (s < 6) {
      return makeResult(
        'LIT',
        'Marijampolės apskritis (Marijampolė / Kybartai)',
        'Lietuvos Respublika — Regione sud-occidentale di Suvalkija lungo il confine con la Prussia Orientale tedesca. La dogana ferroviaria di Kybartai/Eydtkuhnen costituisce il principale varco con l\'Europa occidentale (utilizzato da Smetona per riparare in Germania il 15 giugno 1940).',
        'Neutrale',
        'Lietuvos Respublika — Suvalkija'
      );
    }
    return makeResult(
      'SOV',
      'Marijampolė — Kapsukas (Lietuvos TSR)',
      'SSSR — Striscia di confine lituano-tedesca annessa all\'URSS (la Germania rinunciò alle rivendicazioni territoriali con l\'accordo segreto di Mosca del 10 gennaio 1941 dietro indennizzo sovietico di 7,5 milioni di dollari d\'oro).',
      'Comintern',
      'SSSR — Lietuvos TSR (Litovskaya SSR)'
    );
  }

  // 6. Panevėžio apskritis (LT025)
  if (nid === 'LT025' || nrm.includes('panevez') || nrm.includes('birzai')) {
    if (s < 6) {
      return makeResult(
        'LIT',
        'Panevėžio apskritis (Panevėžys / Biržai)',
        'Lietuvos Respublika — Cuore economico dell\'Aukštaitija: polo industriale della lavorazione del lino, mulini e snodo ferroviario verso Šiauliai e Daugavpils.',
        'Neutrale',
        'Lietuvos Respublika — Aukštaitija'
      );
    }
    return makeResult(
      'SOV',
      'Panevėžys (Lietuvos TSR)',
      'SSSR — Integrazione nell\'economia pianificata sovietica; nazionalizzazione delle fabbriche tessili e dei complessi molitori panevėžiani.',
      'Comintern',
      'SSSR — Lietuvos TSR (Litovskaya SSR)'
    );
  }

  // 7. Šiaulių apskritis (LT026)
  if (nid === 'LT026' || nrm.includes('siaul') || nrm.includes('radvilisk')) {
    if (s < 6) {
      return makeResult(
        'LIT',
        'Šiaulių apskritis (Šiauliai / Radviliškis)',
        'Lietuvos Respublika — Quarta città della Lituania, snodo ferroviario di Radviliškis, polo industriale conciario e aeroporto militare di Zokniai (sede dei reparti da caccia dell\'aviazione lituana).',
        'Neutrale',
        'Lietuvos Respublika — Šiaulių apskritis'
      );
    }
    return makeResult(
      'SOV',
      'Šiauliai (Lietuvos TSR)',
      'SSSR — L\'aeroporto militare di Zokniai viene convertito in una primaria base aerea strategica della VVS sovietica.',
      'Comintern',
      'SSSR — Lietuvos TSR (Litovskaya SSR)'
    );
  }

  // 8. Tauragės apskritis (LT027)
  if (nid === 'LT027' || nrm.includes('taurag') || nrm.includes('jurbark')) {
    if (s < 6) {
      return makeResult(
        'LIT',
        'Tauragės apskritis (Tauragė / Jurbarkas)',
        'Lietuvos Respublika — Distretto di frontiera sul Nemunas dirimpetto al Memelland e alla Prussia Orientale; snodo stradale e porto fluviale di Jurbarkas.',
        'Neutrale',
        'Lietuvos Respublika — Žemaitija Pietinis'
      );
    }
    return makeResult(
      'SOV',
      'Tauragė (Lietuvos TSR)',
      'SSSR — Frontiera militarizzata sovietica a ridosso del confine tedesco del Reich.',
      'Comintern',
      'SSSR — Lietuvos TSR (Litovskaya SSR)'
    );
  }

  // 9. Telšių apskritis — Žemaitija (LT028)
  if (
    nid === 'LT028' ||
    nrm.includes('tels') ||
    nrm.includes('mazeik') ||
    nrm.includes('plunge')
  ) {
    if (s < 6) {
      return makeResult(
        'LIT',
        'Telšių apskritis — Žemaitija (Telšiai / Mažeikiai)',
        'Lietuvos Respublika — Capitale spirituale e culturale della Samogizia (Žemaitija), sede vescovile e centro identitario samogitico; snodo ferroviario settentrionale di Mažeikiai verso la Lettonia.',
        'Neutrale',
        'Lietuvos Respublika — Žemaitija'
      );
    }
    return makeResult(
      'SOV',
      'Telšiai (Lietuvos TSR)',
      'SSSR — Occupazione sovietica della Samogizia; instaurazione del controllo politico del NKVD.',
      'Comintern',
      'SSSR — Lietuvos TSR (Litovskaya SSR)'
    );
  }

  // 10. Utenos apskritis (LT029)
  if (nid === 'LT029' || nrm.includes('uten') || nrm.includes('zaras')) {
    if (s < 6) {
      return makeResult(
        'LIT',
        'Utenos apskritis (Utena / Zarasai)',
        'Lietuvos Respublika — Aukštaitija nord-orientale dei laghi e delle foreste, confinante con la Lettonia e la linea di demarcazione con la Polonia.',
        'Neutrale',
        'Lietuvos Respublika — Rytų Aukštaitija'
      );
    }
    return makeResult(
      'SOV',
      'Utena (Lietuvos TSR)',
      'SSSR — Annessione sovietica della regione lacustre dell\'Aukštaitija orientale.',
      'Comintern',
      'SSSR — Lietuvos TSR (Litovskaya SSR)'
    );
  }

  // 11. Palanga ir Kretinga (LT_HIST_PALANGA)
  if (
    nid === 'LT_HIST_PALANGA' ||
    nrm.includes('palanga') ||
    nrm.includes('kreting')
  ) {
    if (s >= 9) {
      return makeResult(
        'GER',
        'Generalbezirk Litauen — Palanga ir Kretinga (Reichskommissariat Ostland)',
        "Reichskommissariat Ostland (Generalbezirk Litauen) — Travolto nelle primissime ore dell'Operazione Barbarossa (22 giugno 1941) dall'assalto della 291ª Divisione di Fanteria della Wehrmacht partita dalla Prussia Orientale; il litorale di Palanga e Kretinga viene incorporato nel Reichskommissariat Ostland (Generalbezirk Litauen, Kauen) sotto il Generalkommissar Theodor Adrian von Renteln.",
        'Asse',
        'Reichskommissariat Ostland — Generalbezirk Litauen (Generalkommissar Theodor Adrian von Renteln, Kauen)'
      );
    }
    if (s < 6) {
      return makeResult(
        'LIT',
        'Palanga ir Kretinga',
        'Lietuvos Respublika — Costa baltica storicamente lituana (Palanga, Kretinga, Skuodas). Accesso marittimo sovrano della Repubblica di Lituania prima e dopo la perdita del Memelland.',
        'Neutrale',
        'Lietuvos Respublika — Klaipėdos apskritis (Nord)'
      );
    }
    return makeResult(
      'SOV',
      'Palanga (Litovskaya SSR)',
      'SSSR — Litorale settentrionale lituano occupato dalla Flotta sovietica del Baltico e dalle truppe confinarie del NKVD.',
      'Comintern',
      'SSSR — Lietuvos TSR (Litovskaya SSR)'
    );
  }

  // Fallback generale Lituania
  if (s < 6) {
    return makeResult(
      'LIT',
      `Lietuvos Respublika (${histName || 'Lietuva'})`,
      'Lietuvos Respublika — Repubblica indipendente di Lituania (Laikinoji sostinė Kaunas).',
      'Neutrale',
      'Lietuvos Respublika'
    );
  }
  return makeResult(
    'SOV',
    `${histName || 'Lietuva'} — Lietuvos TSR`,
    'SSSR — Repubblica Socialista Sovietica Lituana annessa all\'URSS il 3 agosto 1940.',
    'Comintern',
    'SSSR — Lietuvos TSR'
  );
}

export function resolveLevantMandateProvince(ft: any, s: number): ResolvedTerritory {
  const props = (ft && ft.properties) ? ft.properties : {};
  const pNid = String(props.NUTS_ID || props.id || ft?.id || '').trim().toUpperCase();
  const pOrig = String(props.ORIG_ID || '').trim().toUpperCase();
  const pName = String(props.NAME || props.HISTORICAL_NAME || props.name || '').toLowerCase();

  const isVichy = s >= 6 && s < 9;
  const ownerCode = isVichy ? 'VIC_SYR' : 'F_SYR';
  const factionCode = isVichy ? 'Fantoccio' : 'Alleati';

  const isHatay =
    pNid === 'TR631' ||
    pOrig === 'TR631' ||
    pNid === 'HAT' ||
    props.CNTR_CODE === 'HAT' ||
    pName.includes('hatay') ||
    pName.includes('alexandretta') ||
    pName.includes('iskenderun') ||
    pName.includes('antakya');

  if (isHatay) {
    return resolveHatay(s, props.NAME || props.NAME_LATN || pNid);
  }

  const isLeb =
    props.CNTR_CODE === 'LEB' ||
    pNid === 'LEB_ALL' ||
    pNid === 'LEB' ||
    pNid === 'LB' ||
    pNid === 'LBN' ||
    pNid === '422' ||
    pNid.startsWith('LB') ||
    pOrig.startsWith('LB') ||
    pName.includes('liban') ||
    pName.includes('lebanon') ||
    pName.includes('libano');

  if (s >= 9) {
    const rawTitle = props.HISTORICAL_NAME || props.NAME || props.name || (isLeb ? 'Beyrouth' : 'Damas');
    if (isLeb) {
      return makeResult(
        'F_SYR',
        `République Libanaise (Francia Libera & Controllo Britannico) — ${rawTitle}`,
        `${rawTitle} · Al termine dell'Operazione Exporter (8 giugno – 14 luglio 1941) e con la firma dell'Armistizio di Saint-Jean-d'Acre (14 luglio 1941), le forze di Vichy del Gen. Henri Dentz capitolano. Il Libano passa sotto il controllo congiunto della Francia Libera (Gen. Georges Catroux, che proclama formalmente l'indipendenza della Repubblica Libanese il 26 novembre 1941 sotto il Presidente Alfred Naccache) e della 9ª Armata britannica.`,
        'Alleati',
        "Controllo Congiunto Francia Libera e Gran Bretagna — Délégation Générale de la France Libre au Levant (Gén. Georges Catroux, Beyrouth)"
      );
    }
    return makeResult(
      'F_SYR',
      `République Syrienne (Francia Libera & Controllo Britannico) — ${rawTitle}`,
      `${rawTitle} · Dopo la campagna anglo-gollista di Siria e Libano (Operazione Exporter, giugno-luglio 1941) e l'Armistizio di Saint-Jean-d'Acre (14 luglio 1941), la Siria è posta sotto il controllo strategico congiunto della Francia Libera (Gen. Georges Catroux, che proclama l'indipendenza della Repubblica Siriana il 27 settembre 1941 con Taj al-Din al-Hasani presidente) e della 9ª Armata britannica (Gen. Henry Maitland Wilson).`,
      'Alleati',
      "Controllo Congiunto Francia Libera e Gran Bretagna — Délégation Générale de la France Libre au Levant (Gén. Georges Catroux, Damas) & British 9th Army"
    );
  }

  if (isLeb) {
    const regimePrefix = isVichy ? 'Grande Libano (Regime di Vichy)' : 'Mandato del Grande Libano';

    // 1. Beirut
    if (pOrig === 'LBBA' || pNid === 'LBBA' || pName.includes('beirut') || pName.includes('beyrouth')) {
      const subName = `${regimePrefix} — Città e Porto di Beirut`;
      const adminEntity = isVichy
        ? 'Quartier Generale dell\'Alto Commissario Generale Henri Dentz (Gran Serraglio)'
        : 'Gouvernorat de Beyrouth · Capitale del Libano & Sede dell\'Alto Commissariato';
      let note = '';
      if (s <= 1) {
        note = 'Beirut (Beyrouth) · Capitale della Repubblica Libanese e sede dell\'Alto Commissariato Francese per la Siria e il Libano al Gran Serraglio. Grande crocevia bancario, consolare e intellettuale della regione; prestigiosa sede dell\'Università Americana di Beirut (AUB) e dell\'Université Saint-Joseph dei Gesuiti. Presidenza di Émile Éddé.';
      } else if (s <= 4) {
        note = 'Beirut · Centro politico del Libano mandatario. Il fallimento della ratifica parlamentare a Parigi del Trattato franco-libanese del 1936 scatena proteste civili e alimenta il movimento indipendentista guidato da Bishara al-Khuri e Riad al-Solh.';
      } else if (s === 5) {
        note = 'Beirut · Con lo scoppio della Seconda Guerra Mondiale l\'Alto Commissario Gabriel Puaux sospende la costituzione e scioglie la Camera dei Deputati. Il Generale Maxime Weygand insedia a Beirut il comando supremo dell\'Armée du Levant; il porto commerciale diviene base navale militare alleata.';
      } else if (s === 6) {
        note = 'Beirut (Vichy) · In seguito all\'armistizio di Compiègne l\'amministrazione coloniale si sottomette a Vichy. La Royal Navy britannica da Alessandria d\'Egitto impone un blocco navale totale sul porto: il traffico merci marittimo viene azzerato, innescando grave crisi economica e razionamento.';
      } else if (s === 7) {
        note = 'Beirut (Vichy) · Il Generale Henri Dentz assume le funzioni di Alto Commissario di Vichy al Gran Serraglio. Si insedia la Commissione d\'Armistizio Italiana (CIAF); il porto è isolato e sorvegliato da batterie costiere francesi contro possibili incursioni della marina britannica.';
      } else {
        note = 'Beirut (Vichy) · Sede del comando generale di difesa del Gen. Dentz contro l\'imminente offensiva alleata. La città subisce bombardamenti navali e aerei della flotta britannica contro i depositi carburante e le caserme costiere; Dentz dichiara la mobilitazione totale delle truppe coloniali in vista dell\'invasione da sud (Operazione Exporter).';
      }
      return makeResult(ownerCode, subName, note, factionCode, adminEntity);
    }

    // 2. Monte Libano
    if (pOrig === 'LBJL' || pNid === 'LBJL' || pName.includes('monte libano') || pName.includes('mont-liban') || pName.includes('baabda')) {
      const subName = `${regimePrefix} — Governatorato del Monte Libano`;
      const adminEntity = 'Gouvernorat du Mont-Liban (Baabda, Chouf, Metn & Keserwan)';
      let note = '';
      if (s <= 1) {
        note = 'Monte Libano (Mont-Liban) · Cuore storico montano e spirituale delle comunità maronita e drusa con capoluogo a Baabda. Regione caratterizzata da spettacolari terrazzamenti di ulivi e gelsi, antichi monasteri rupestri della Qadisha e celebri borghi montani (Bikfaya, Jounieh, Aley, Deir al-Qamar e Bsharri).';
      } else if (s <= 5) {
        note = 'Monte Libano · Nucleo identitario della sovranità libanese; sede del Patriarcato Maronita a Bkerké, attivo nel rivendicare l\'indipendenza nazionale e la neutralità del paese dai conflitti tra grandi potenze.';
      } else {
        note = 'Monte Libano (Vichy) · La popolazione montana soffre duramente per il blocco marittimo della Royal Navy e il crollo delle esportazioni di seta e frutta; forte ostilità popolare verso l\'amministrazione collaborazionista di Vichy e solidarietà clandestina con la Francia Libera di De Gaulle.';
      }
      return makeResult(ownerCode, subName, note, factionCode, adminEntity);
    }

    // 3. Libano Settentrionale (Tripoli)
    if (pOrig === 'LBAS' || pNid === 'LBAS' || pName.includes('tripoli') || pName.includes('trablus') || pName.includes('settentrionale') || pName.includes('liban-nord')) {
      const subName = `${regimePrefix} — Libano Settentrionale (Tripoli)`;
      const adminEntity = 'Gouvernorat du Liban-Nord (Tripoli, Porto & Terminale Oleodotto IPC)';
      let note = '';
      if (s <= 1) {
        note = 'Tripoli (Trablus ash-Sham) · Seconda città e porto del Libano, dominata dalla storica fortezza crociata di Raymond de Saint-Gilles. Scalo industriale strategico: terminale marittimo e grande raffineria dell\'oleodotto trans-desertico della Iraq Petroleum Company (IPC) proveniente dai giacimenti di Kirkuk.';
      } else if (s <= 5) {
        note = 'Tripoli · Snodo commerciale verso la Siria interna (Homs) e base logistica della ferrovia costiera; vivace centro mercantile sunnita con stretti legami culturali e familiari con Damasco.';
      } else {
        note = 'Tripoli (Vichy) · Nel giugno 1940 i britannici in Iraq bloccano il flusso di greggio nell\'oleodotto IPC diretto a Tripoli, paralizzando la raffineria costiera. Il porto subisce il blocco della Royal Navy e mitragliamenti aerei alleati contro i serbatoi di petrolio.';
      }
      return makeResult(ownerCode, subName, note, factionCode, adminEntity);
    }

    // 4. Akkar
    if (pOrig === 'LBAK' || pNid === 'LBAK' || pName.includes('akkar') || pName.includes('halba')) {
      const subName = `${regimePrefix} — Distretto dell'Akkar`;
      const adminEntity = 'Gouvernorat de l\'Akkar (Piana Agricola di Halba & Nahr al-Kabir)';
      let note = '';
      if (s <= 5) {
        note = 'Akkar · Fertile distretto settentrionale chiuso tra i contrafforti montuosi del Libano settentrionale e la valle fluviale del Nahr al-Kabir al confine con la Siria (Tartus e Homs); capoluogo Halba e borghi cristiani di Qoubaiyat; fondamentale corridoio di comunicazione tra la costa e l\'entroterra.';
      } else {
        note = 'Akkar (Vichy) · Presidio di frontiera e arteria di rifornimento tra il Libano e la Siria di Vichy, sorvegliata da reparti di gendarmeria coloniale.';
      }
      return makeResult(ownerCode, subName, note, factionCode, adminEntity);
    }

    // 5. Beqaa (Zahlé)
    if (pOrig === 'LBBI' || pNid === 'LBBI' || pName.includes('beqaa') || pName.includes('zahle') || pName.includes('zahlé')) {
      const subName = `${regimePrefix} — Governatorato della Beqaa`;
      const adminEntity = 'Gouvernorat de la Beqaa (Zahlé, Valle del Litani & Base Aerea di Rayak)';
      let note = '';
      if (s <= 1) {
        note = 'Valle della Beqaa · Vasta depressione alluvionale fertile racchiusa tra la catena del Monte Libano a occidente e l\'Antilibano a oriente, solcata dal fiume Litani. Capoluogo Zahlé, celebre per la viticoltura (Ksara) e attraversata dalla ferrovia Damasco-Beirut.';
      } else if (s <= 5) {
        note = 'Beqaa · La grande base aerea militare francese di Rayak ospita gli squadroni da caccia e ricognizione dell\'Armée de l\'Air nel Levante; snodo logistico centrale per le truppe coloniali francesi.';
      } else {
        note = 'Beqaa (Vichy) · Base strategica dell\'aviazione di Vichy a Rayak; centro di raccolta granario essenziale per alimentare Beirut durante il blocco navale. Nella primavera 1941 la base di Rayak viene posta in allerta per l\'assistenza tecnica ai voli di collegamento dell\'Asse verso l\'Iraq, divenendo bersaglio di raid dei bombardieri della RAF britannica.';
      }
      return makeResult(ownerCode, subName, note, factionCode, adminEntity);
    }

    // 6. Baalbek e Hermel
    if (pOrig === 'LBBH' || pNid === 'LBBH' || pName.includes('baalbek') || pName.includes('hermel')) {
      const subName = `${regimePrefix} — Distretto di Baalbek e Hermel`;
      const adminEntity = 'Distretto di Baalbek-Hermel (Alta Beqaa, Heliopolis Romana & Oronte)';
      let note = '';
      if (s <= 5) {
        note = 'Baalbek e Hermel · Alta valle della Beqaa e sorgenti del fiume Oronte ai piedi dell\'Antilibano. Celebre per le maestose e colossali rovine romane della Heliopolis (Tempio di Giove, Tempio di Bacco e Triliton); zona pastorale e agricola di fiere tradizioni tribali e sciite (Metawali).';
      } else {
        note = 'Baalbek (Vichy) · Posto di blocco dell\'esercito di Vichy lungo la rotta interna che collega la Beqaa con la Siria centrale (Homs); guarnigione coloniale schierata a guardia dei passi montani.';
      }
      return makeResult(ownerCode, subName, note, factionCode, adminEntity);
    }

    // 7. Libano Meridionale (Sidone e Tiro)
    if (pOrig === 'LBJA' || pNid === 'LBJA' || pName.includes('meridionale') || pName.includes('liban-sud') || pName.includes('sidone') || pName.includes('tiro') || pName.includes('saida')) {
      const subName = `${regimePrefix} — Libano Meridionale (Sidone e Tiro)`;
      const adminEntity = 'Gouvernorat du Liban-Sud (Porti Fenici di Saïda e Sour, Jezzine)';
      let note = '';
      if (s <= 1) {
        note = 'Libano del Sud (Liban-Sud) · Gloriosa costa fenicia dominata dai millenari approdi di Sidone (Saïda, col celebre Castello del Mare) e Tiro (Sour); fertile fascia costiera di agrumeti e bananeti e contrafforti montuosi di Jezzine celebri per le pinete e le cascate.';
      } else if (s <= 5) {
        note = 'Libano del Sud · Strada litoranea di collegamento vitale con la Palestina Mandataria attraverso il varco di Naqoura (Ras an-Naqoura); controllo doganale e pattugliamento congiunto anglo-francese.';
      } else {
        note = 'Libano del Sud (Vichy) · Linea di frontiera meridionale del mandato di Vichy direttamente a contatto con le forze britanniche in Galilea. Il porto di Sidone è bloccato dalla Royal Navy; il Gen. Dentz vi schiera reparti di fanteria coloniale e Troupes Spéciales per fortificare le alture costiere in previsione di un\'invasione da sud.';
      }
      return makeResult(ownerCode, subName, note, factionCode, adminEntity);
    }

    // 8. Nabatieh e Gebel Amel
    if (pOrig === 'LBNA' || pNid === 'LBNA' || pName.includes('nabatieh') || pName.includes('gebel amel') || pName.includes('jabal amel') || pName.includes('marjeyoun')) {
      const subName = `${regimePrefix} — Distretto di Nabatieh`;
      const adminEntity = 'Distretto di Nabatieh (Gebel Amel, Marjeyoun & Fortezza di Beaufort)';
      let note = '';
      if (s <= 1) {
        note = 'Nabatieh · Storico capoluogo della regione collinare del Gebel Amel (Jabal Amel), tradizionale roccaforte teologica e culturale della comunità sciita libanese; distretto agricolo celebre per il tabacco e la fiera commerciale settimanale.';
      } else if (s <= 5) {
        note = 'Nabatieh e Marjeyoun · Zona strategica di frontiera dominata dall\'imponente fortezza crociata di Beaufort (Qala\'at ash-Shaqif), arroccata su una parete rocciosa a picco sul fiume Litani a guardia delle vie d\'accesso dalla Galilea verso la Beqaa e la valle del Giordano.';
      } else {
        note = 'Nabatieh (Vichy) · Trinceramento avanzato delle forze di Vichy: lungo il Litani e intorno alla piazzaforte di Marjeyoun il Gen. Dentz disloca la 6ª Divisione di fanteria e reggimenti di tirailleurs senegalesi e algerini; teatro di aspri e sanguinosi combattimenti durante l\'imminente Operazione Exporter nel giugno 1941.';
      }
      return makeResult(ownerCode, subName, note, factionCode, adminEntity);
    }

    // Fallback Lebanon
    const subName = isVichy ? 'Grande Libano (Amministrazione di Vichy)' : 'Mandato Francese del Grande Libano';
    const subTitle = isVichy ? 'Stato del Grande Libano · Tutela di Vichy' : 'Grand Liban (Beirut, Monte Libano, Beqaa & Tripoli)';
    return makeResult(ownerCode, subName, subTitle, factionCode, subName);
  }

  // --- SYRIA (14 PROVINCE) ---
  const regimePrefix = isVichy ? 'Siria (Regime di Vichy — Gen. Dentz)' : 'Mandato Francese di Siria';

  // 1. Damasco
  if (pNid === 'SYR_DAM' || pName.includes('damasco') || pName.includes('damascus')) {
    const subName = `${regimePrefix} — Città di Damasco`;
    const adminEntity = isVichy
      ? 'Sede del Delegato di Vichy & Base Militare di Mezzeh'
      : 'Capitale dello Stato di Siria & Sede del Governo (Palazzo Presidenziale)';
    let note = '';
    if (s <= 1) {
      note = 'Damasco (Madinat Dimashq) · Città millenaria e cuore politico della Siria Mandataria. Sede del parlamento e del governo nazionalista del Blocco Nazionale di Hashim al-Atassi e Jamil Mardam Bey; teatro dello sciopero generale del 1936 che ha strappato a Parigi il trattato di indipendenza.';
    } else if (s <= 4) {
      note = 'Damasco · Tensione politica ai massimi livelli dopo il rifiuto del Parlamento francese di ratificare il trattato del 1936. L\'Alto Commissario Gabriel Puaux sospende la costituzione e scioglie la Camera. Nel giugno 1939 la cessione di Hatay alla Turchia provoca le dimissioni del Presidente Atassi e imponenti manifestazioni.';
    } else if (s === 5) {
      note = 'Damasco · Con lo scoppio della Seconda Guerra Mondiale viene proclamato lo stato d\'assedio. La città ospita il quartier generale sussidiario dell\'Armée du Levant del Gen. Maxime Weygand; l\'aeroporto militare di Mezzeh e la caserma Hamidiyya presidiano le vie di comunicazione del deserto.';
    } else if (s === 6) {
      note = 'Damasco (Vichy) · In seguito alla caduta della Francia e all\'armistizio, l\'amministrazione coloniale si sottomette al governo di Vichy del Maresciallo Pétain. La Royal Navy blocca le forniture di petrolio e grano dalla Palestina, innescando grave inflazione e malcontento.';
    } else if (s === 7) {
      note = 'Damasco (Vichy) · Insediamento della Commissione d\'Armistizio Italiana (CIAF) e degli ispettori dell\'Asse. La città è scossa da scioperi e proteste per la carestia e il carovita; il Consiglio dei Direttori nominato da Vichy reprime l\'opposizione nazionalista di Shukri al-Quwwatli.';
    } else {
      note = 'Damasco (Vichy) · Sotto il governo di Vichy del Gen. Henri Dentz e in seguito agli accordi Darlan-Hitler, l\'aeroporto militare di Mezzeh viene aperto ai caccia e bombardieri della Luftwaffe e della Regia Aeronautica a supporto del golpe di Rashid Ali in Iraq. La base subisce raid aerei della RAF alla vigilia dell\'Operazione Exporter.';
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 2. Rif Dimashq e Ghouta
  if (pNid === 'SYR_GHT' || pName.includes('rif dimashq') || pName.includes('ghouta')) {
    const subName = `${regimePrefix} — Rif Dimashq e Ghouta`;
    const adminEntity = 'Distretto Rurale di Damasco, Oasi della Ghouta & Massiccio del Qalamoun';
    let note = '';
    if (s <= 1) {
      note = 'Oasi della Ghouta e monti del Qalamoun · Fertile polmone agricolo irrigato dai rami del fiume Barada, celebre per frutteti e giardini. Storica roccaforte dei combattenti anticoloniali durante la Grande Rivolta Siriana (1925-1927).';
    } else if (s <= 4) {
      note = 'Rif Dimashq · Snodo montano e agricolo cruciale per i rifornimenti della capitale. I valichi del Qalamoun controllano l\'autostrada strategica verso Homs e la valle della Beqaa libanese.';
    } else if (s === 5) {
      note = 'Rif Dimashq · Mobilitazione generale e fortificazione dei passi del Qalamoun da parte dell\'Armée du Levant del Gen. Weygand a protezione del corridoio strategico Beirut-Damasco.';
    } else if (s === 6) {
      note = 'Rif Dimashq (Vichy) · Requisizioni agricole imposte dalle autorità di Vichy per fronteggiare il blocco britannico; malcontento diffuso tra i contadini e i villaggi dell\'Antilibano.';
    } else if (s === 7) {
      note = 'Rif Dimashq (Vichy) · Posti di blocco e pattuglie speciali francesi lungo la gola del Barada e verso il Monte Hermon per intercettare agenti gollisti e contrabbando dalla Transgiordania.';
    } else {
      note = 'Rif Dimashq (Vichy) · Settore difensivo avanzato del Gen. Dentz contro l\'imminente offensiva della 7ª Divisione australiana e della 1ª Divisione Francia Libera del Gen. Legentilhomme proveniente da sud attraverso Kiswe.';
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 3. Aleppo
  if (pNid === 'SYR_ALP' || pName.includes('aleppo') || pName.includes('alep')) {
    const subName = `${regimePrefix} — Governatorato di Aleppo`;
    const adminEntity = 'Governatorato di Aleppo (Capitale Economica & Snodo Ferroviario del Nord)';
    let note = '';
    if (s <= 1) {
      note = 'Aleppo (Halab) · Millenaria metropoli commerciale dominata dall\'imponente Cittadella medievale; capolinea della ferrovia Baghdad-Bahn e sbocco dei traffici con la Mesopotamia e l\'Anatolia. Roccaforte del nazionalismo siriano (Saadallah al-Jabiri).';
    } else if (s <= 4) {
      note = 'Aleppo · Profondo trauma economico e politico causato dalla perdita del porto naturale di Alessandretta (Hatay). Il confine turco viene militarizzato; violente manifestazioni studentesche e sciopero dei mercanti nel suq storico.';
    } else if (s === 5) {
      note = 'Aleppo · Quartier generale del settore settentrionale dell\'Armée du Levant; la grande base aerea di Nerab viene ampliata dai francesi per vigilare sulla frontiera anatolica e presidiare l\'accesso all\'Eufrate.';
    } else if (s === 6) {
      note = 'Aleppo (Vichy) · Passaggio sotto l\'amministrazione di Vichy. Interruzione dei commerci con la Turchia e con l\'Iraq britannico; la ferrovia verso Mosul e Baghdad subisce forti restrizioni alleate.';
    } else if (s === 7) {
      note = 'Aleppo (Vichy) · Presidio di osservatori della Commissione d\'Armistizio Italiana (CIAF). La città soffre di grave penuria di carburante; tensioni tra autorità collaborazioniste e popolazione araba locale.';
    } else {
      note = 'Aleppo (Vichy) · Ruolo strategico chiave: su autorizzazione di Vichy, l\'aeroporto militare di Nerab diviene la principale base di transito e rifornimento per i bombardieri He 111 e i caccia Bf 110 della Luftwaffe (Fliegerführer Irak) inviati a sostenere la rivolta irachena di Rashid Ali. Obiettivo di pesanti incursioni della RAF.';
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 4. Idlib
  if (pNid === 'SYR_IDL' || pName.includes('idlib')) {
    const subName = `${regimePrefix} — Distretto di Idlib`;
    const adminEntity = 'Distretto Agricolo di Idlib, Gebel Zawiya & Piana di Rouj';
    let note = '';
    if (s <= 1) {
      note = 'Idlib · Cuore agricolo del Gebel Zawiya e dei secolari oliveti siriani. Importante nodo stradale di raccordo tra la metropoli interna di Aleppo e il litorale alauita di Latakia.';
    } else if (s <= 4) {
      note = 'Idlib · La separazione del distretto di Alessandretta sposta la frontiera turca a ridosso dell\'Afrin e delle colline di Idlib, accogliendo ondate di profughi arabi e armeni fuggiti da Hatay.';
    } else if (s === 5) {
      note = 'Idlib · Posizioni fortificate dell\'Armée du Levant sulle alture del Gebel Zawiya per presidiare la vallata dell\'Oronte.';
    } else {
      note = 'Idlib (Vichy) · Produzione intensiva di olio d\'oliva e cereali sottoposta al rigido controllo delle commissioni di rifornimento di Vichy per sfamare le guarnigioni costiere isolate dal blocco marittimo alleato.';
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 5. Latakia
  if (pNid === 'SYR_LTK' || pName.includes('latakia') || pName.includes('lattakia')) {
    const subName = `${regimePrefix} — Territorio Alauita di Latakia`;
    const adminEntity = 'Territorio Autonomo dei Monti Alauiti (Gebel Ansariya) & Porto di Latakia';
    let note = '';
    if (s <= 1) {
      note = 'Latakia (Al-Ladhiqiyya) · Principale scalo marittimo della Siria Mandataria e capoluogo del Territorio Alauita (Stato degli Alauiti dal 1920 al 1936), reintegrato nello Stato di Siria con regime di decentralizzazione amministrativa e finanziaria.';
    } else if (s <= 4) {
      note = 'Latakia · Con la cessione di Alessandretta alla Turchia nel 1939, il porto di Latakia diventa l\'unico grande sbocco marittimo sovrano della Repubblica di Siria, provocando un rapido potenziamento delle infrastrutture doganali.';
    } else if (s === 5) {
      note = 'Latakia · Base navale di avviso dell\'Armée du Levant; batterie costiere francesi e idrovolanti della Marine Nationale presidiano il bacino del Mediterraneo orientale.';
    } else if (s === 6) {
      note = 'Latakia (Vichy) · Blocco navale della Royal Navy britannica. Il porto è completamente paralizzato; navi da guerra alleate pattugliano le acque costiere impedendo ogni rifornimento via mare.';
    } else {
      note = 'Latakia (Vichy) · Presidio militare costiero del Gen. Henri Dentz affidato alle truppe speciali coloniali; batterie d\'artiglieria allertate contro sbarchi anfibi della marina britannica.';
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 6. Tartus
  if (pNid === 'SYR_TAR' || pName.includes('tartus')) {
    const subName = `${regimePrefix} — Territorio Alauita di Tartus`;
    const adminEntity = 'Distretto Marittimo di Tartus & Isola Fortificata di Arwad';
    let note = '';
    if (s <= 1) {
      note = 'Tartus · Antica Tortosa crociata con la cattedrale templare di Nostra Signora di Tortosa e l\'antistante isola fortificata fenicia di Arwad (Ruad), base marittima francese già occupata nella Prima Guerra Mondiale.';
    } else if (s <= 5) {
      note = 'Tartus · Porto di cabotaggio e base costiera meridionale a guardia della frontiera fluviale del Nahr al-Kabir al confine con il Grande Libano (Akkar).';
    } else {
      note = 'Tartus (Vichy) · Presidio marittimo vichyste sottoposto al blocco navale alleato; l\'isola di Arwad funge da posto di vedetta ottica contro sommergibili e incrociatori della Royal Navy.';
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 7. Homs
  if (pNid === 'SYR_HMS' || pName.includes('homs')) {
    const subName = `${regimePrefix} — Governatorato di Homs`;
    const adminEntity = 'Governatorato di Homs (Varco Strategico dell\'Oronte, Krak dei Cavalieri & Oasi di Palmira)';
    let note = '';
    if (s <= 1) {
      note = 'Homs (Emesa) · Snodo geografico e militare decisivo della Siria centrale, situato nel "Varco di Homs" (Buqay\'ah) tra i monti Ansariya e il Libano. Dominato a occidente dal possente Krak dei Cavalieri (Qal\'at al-Hosn); attraversato dal doppio oleodotto della Iraq Petroleum Company (IPC) diretto a Tripoli.';
    } else if (s <= 4) {
      note = 'Homs · Centro nevralgico della rete ferroviaria che connette Damasco, Aleppo e la costa di Tripoli. La vasta oasi desertica di Palmira (Tadmor) ospita un avamposto meharista della Legione Straniera francese.';
    } else if (s === 5) {
      note = 'Homs · Concentramento strategico dell\'Armée du Levant del Gen. Weygand; l\'aeroporto di Palmira e la ferrovia IPC sono posti sotto stretto regime di protezione militare contro sabotaggi.';
    } else if (s === 6) {
      note = 'Homs (Vichy) · Il governo britannico in Iraq interrompe il flusso di petrolio greggio nell\'oleodotto IPC diretto a Tripoli e Homs; la raffineria e le stazioni di pompaggio deserte vengono presidiate da Vichy.';
    } else if (s === 7) {
      note = 'Homs (Vichy) · Ispezioni della Commissione d\'Armistizio Italiana (CIAF) nei depositi carburante e alla guarnigione di Palmira; forte tensione sociale nella città vecchia di Homs per il razionamento dei viveri.';
    } else {
      note = 'Homs (Vichy) · Punto focale della crisi mediorientale: l\'aeroporto di Palmira (Tadmor) viene aperto come base di scalo e rifornimento per i velivoli della Luftwaffe e italiani diretti in Iraq. Il campo aereo subisce duri mitragliamenti aerei da parte dei Blenheim della RAF; la guarnigione francese del Krak dei Cavalieri si prepara allo scontro con gli Alleati.';
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 8. Hama
  if (pNid === 'SYR_HMA' || pName.includes('hama')) {
    const subName = `${regimePrefix} — Governatorato di Hama`;
    const adminEntity = 'Governatorato di Hama (Valle dell\'Oronte & Norie Idrauliche Storiche)';
    let note = '';
    if (s <= 1) {
      note = 'Hama · Città storica e aristocratica sulle rive dell\'Oronte, celebre a livello mondiale per le gigantesche norie idrauliche di legno (Na\'ura) per l\'irrigazione dei campi; feudo delle grandi famiglie terriere sunnite (al-Kaylani, al-Azm).';
    } else if (s <= 5) {
      note = 'Hama · Roccaforte del conservatorismo arabo e del nazionalismo; fulcro delle agitazioni contadine e delle proteste contro il governo mandatario francese di Gabriel Puaux.';
    } else {
      note = 'Hama (Vichy) · Centro agricolo cerealicolo di primaria importanza per il sostentamento del Mandato sotto blocco alleato; acquartieramento di reparti coloniali fedeli al regime di Vichy.';
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 9. Giazira (Hasaka)
  if (pNid === 'SYR_JAZ' || pName.includes('hasaka') || pName.includes('giazira')) {
    const subName = `${regimePrefix} — Territorio della Giazira`;
    const adminEntity = 'Territorio dell\'Alta Mesopotamia (Al-Hasakah, Qamishli & Khabur)';
    let note = '';
    if (s <= 1) {
      note = 'Al-Jazira (Hasaka) · Vasta regione dell\'Alta Mesopotamia racchiusa tra i fiumi Eufrate e Tigri; straordinario mosaico etnico e religioso popolato da arabi beduini (Shammar), curdi, cristiani assiri-caldei (profughi dell\'Iraq) e armeni. Granaio strategico del Mandato.';
    } else if (s <= 4) {
      note = 'Giazira · Movimento autonomista locale guidato da comunità cristiane e curde sostenuto da ufficiali francesi, in contrapposizione al governo centrale arabo di Damasco.';
    } else if (s === 5) {
      note = 'Giazira · Presidio militare dell\'Armée du Levant a Qamishli lungo la linea ferroviaria verso la Turchia e Mosul; sorveglianza delle piste carovaniere verso il nord dell\'Iraq.';
    } else {
      note = 'Giazira (Vichy) · Territorio isolato e vulnerabile, a stretto contatto con le postazioni britanniche del Regno dell\'Iraq; tensioni tribali e sorveglianza aerea delle rotte desertiche.';
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 10. Raqqa
  if (pNid === 'SYR_RAQ' || pName.includes('raqqa')) {
    const subName = `${regimePrefix} — Governatorato di Raqqa`;
    const adminEntity = 'Governatorato di Raqqa (Medio Eufrate & Steppe Pastorali della Badiyat)';
    let note = '';
    if (s <= 5) {
      note = 'Ar-Raqqah · Antica capitale del califfo abbaside Harun al-Rashid sulle rive del Medio Eufrate; centro carovaniero e mercato del bestiame delle tribù beduine nomadi della steppa semiarida.';
    } else {
      note = 'Raqqa (Vichy) · Presidio di gendarmeria e truppe cammellate (meharisti) di Vichy a controllo dei varchi fluviali dell\'Eufrate e del traffico verso l\'Iraq.';
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 11. Deir ez-Zor
  if (pNid === 'SYR_DEZ' || pName.includes('deir') || pName.includes('zawr')) {
    const subName = `${regimePrefix} — Governatorato di Deir ez-Zor`;
    const adminEntity = 'Governatorato del Basso Eufrate Siriano & Presidio di Frontiera verso l\'Iraq';
    let note = '';
    if (s <= 1) {
      note = 'Deir ez-Zor (Dayr al-Zawr) · Capitale dell\'Eufrate siriano, celebre per lo spettacolare ponte pedonale sospeso costruito dall\'ingegneria militare francese nel 1927-1931; avamposto di collegamento tra la Siria e la Mesopotamia irachena.';
    } else if (s <= 5) {
      note = 'Deir ez-Zor · Base avanzata dell\'Armée du Levant con campo d\'aviazione nel deserto a sorveglianza della frontiera doganale di Abu Kamal verso l\'Iraq britannico.';
    } else {
      note = 'Deir ez-Zor (Vichy) · Posto di blocco strategico di Vichy lungo l\'Eufrate. Nella primavera 1941, durante la guerra anglo-irachena, la città è testimone del transito clandestino di rifornimenti e armi per gli insorti di Rashid Ali prima dei raid aerei della RAF britannica.';
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 12. Gebel Druso
  if (pNid === 'SYR_DRU' || pName.includes('suwayda') || pName.includes('druso')) {
    const subName = `${regimePrefix} — Stato del Gebel Druso`;
    const adminEntity = 'Gouvernement du Djebel Druze (Roccaforte Autonoma di As-Suwayda)';
    let note = '';
    if (s <= 1) {
      note = 'Jabal al-Druze (As-Suwayda) · Territorio montuoso vulcanico a sud di Damasco popolato dalla fiera comunità guerriera drusa guidata dalla storica famiglia al-Atrash. Stato autonomo dal 1921 al 1936, culla della Grande Rivolta Siriana del Sultano al-Atrash (1925), formalmente unito alla Repubblica Siriana ma geloso custode della propria autonomia armata.';
    } else if (s <= 4) {
      note = 'Gebel Druso · Tensioni con il governo centrale di Damasco; i capi clan drusi trattano direttamente con l\'Alto Commissario Gabriel Puaux per mantenere i propri privilegi tradizionali.';
    } else if (s === 5) {
      note = 'Gebel Druso · Squadroni di cavalleria drusa inquadrati nelle Troupes Spéciales du Levant dell\'Armée du Levant a presidio della frontiera con la Transgiordania.';
    } else {
      note = 'Gebel Druso (Vichy) · Neutralità armata delle tribù druse di fronte alla crisi tra Vichy e gli Alleati; contatti segreti dei leader drusi con la legione araba giordana e i britannici in Palestina in vista dell\'Operazione Exporter.';
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 13. Hauran
  if (pNid === 'SYR_HAU' || pName.includes('dar`a') || pName.includes('dara') || pName.includes('hauran')) {
    const subName = `${regimePrefix} — Piana dell'Hauran (Dar'a)`;
    const adminEntity = 'Distretto dell\'Hauran & Snodo Ferroviario dell\'Hejaz (Dar\'a)';
    let note = '';
    if (s <= 5) {
      note = 'Dar\'a (Hauran) · Fertile altopiano cerealicolo vulcanico dell\'Hauran e strategico snodo ferroviario della Ferrovia dell\'Hejaz verso Amman e Medina e della ferrovia verso Haifa (Palestina); varco doganale verso la Transgiordania britannica.';
    } else {
      note = 'Hauran (Vichy) · Settore meridionale fortificato del Gen. Dentz a ridosso della valle dello Yarmouk; sorveglianza militare contro infiltrazioni di commando britannici e gollisti.';
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 14. Golan
  if (pNid === 'SYR_GOL' || pName.includes('quneitra') || pName.includes('golan')) {
    const subName = `${regimePrefix} — Distretto del Golan (Quneitra)`;
    const adminEntity = 'Distretto del Golan, Pendici del Monte Hermon & Sorgenti del Giordano';
    let note = '';
    if (s <= 5) {
      note = 'Quneitra (Golan) · Altopiano strategico basaltico situato tra il Monte Hermon (Gebel ash-Sheikh) e il lago di Tiberiade; popolato da comunità circasse, turcomanne e arabe; sorgenti montane del fiume Giordano e controllo delle vie d\'accesso alla Galilea.';
    } else {
      note = 'Golan (Vichy) · Linea di sbarramento fortificata del Gen. Dentz con capisaldi difensivi e campi minati a controllo dei varchi dalla Palestina mandataria verso Damasco; settore di scontro primario dell\'Operazione Exporter nel giugno 1941.';
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // Fallback Syria
  const subName = isVichy ? 'Siria (Regime di Vichy — Gen. Dentz)' : 'Mandato Francese di Siria';
  const subTitle = isVichy ? 'Stato di Siria · Tutela del Governo di Vichy' : 'League of Nations Class A Mandate (French Administration)';
  return makeResult(ownerCode, subName, subTitle, factionCode, subName);
}

export function resolvePalestineMandateProvince(ft: any, s: number): ResolvedTerritory {
  const props = (ft && ft.properties) ? ft.properties : {};
  const pNid = String(props.NUTS_ID || props.id || ft?.id || '').trim().toUpperCase();
  const pOrig = String(props.ORIG_ID || '').trim().toUpperCase();
  const pName = String(props.NAME || props.HISTORICAL_NAME || props.name || '').toLowerCase();

  const ownerCode = 'UK';
  const factionCode = 'Alleati';
  const prefix = 'Mandato di Palestina';

  // 1. Gerusalemme (PAL_JRS / ILJM)
  if (pNid === 'PAL_JRS' || pOrig === 'ILJM' || pName.includes('jerusalem') || pName.includes('gerusalemme') || pName.includes('al-quds')) {
    const subName = `${prefix} — Distretto di Gerusalemme`;
    const adminEntity = "Jerusalem District · Sede dell'Alto Commissario Britannico (Government House, Armon HaNetziv)";
    let note = '';
    if (s === 0) {
      note = "Gerusalemme (Al-Quds / Yerushalayim) · Capitale mandataria e sede dell'Alto Commissario Sir Arthur Wauchope al Government House e del Secretariat al King David Hotel. Mosaico spirituale millenario delle tre religioni monoteiste (Città Vecchia, Cupola della Roccia, Muro Occidentale, Santo Sepolcro). Centro diplomatico e giudiziario supremo.";
    } else if (s <= 3) {
      note = "Gerusalemme · Epicentro della Grande Rivolta Araba; scioperi e guerriglia urbana. Nell'autunno 1938 i ribelli arabi occupano la Città Vecchia prima di essere espulsi dai battaglioni britannici delle Coldstream Guards con il coprifuoco totale. Fuga del Gran Muftì Amin al-Husseini.";
    } else if (s <= 5) {
      note = "Gerusalemme · Furiose proteste contro il Libro Bianco di MacDonald del maggio 1939. Con lo scoppio della Seconda Guerra Mondiale la città ospita il quartier generale della Palestine Base Area e l'arruolamento dei volontari arabi ed ebrei nel Palestine Regiment.";
    } else if (s <= 7) {
      note = "Gerusalemme · Rafforzamento della sicurezza imperiale; quartier generale per il coordinamento delle forze di sicurezza e delle agenzie di intelligence britanniche (MI6 / SOE) in Medio Oriente contro lo spionaggio dell'Asse.";
    } else {
      note = "Gerusalemme · Centro di comando politico-militare per la gestione della crisi in Iraq e la pianificazione dell'invasione alleata della Siria di Vichy (Operazione Exporter).";
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 2. Haifa (PAL_HFA / ILHA)
  if (pNid === 'PAL_HFA' || pOrig === 'ILHA' || pName.includes('haifa')) {
    const subName = `${prefix} — Distretto di Haifa`;
    const adminEntity = "Haifa District · Base Navale della Royal Navy & Terminale Oleodotto Iraq (IPC)";
    let note = '';
    if (s === 0) {
      note = "Haifa (Hefa) · Porto moderno inaugurato nel 1933, unico approdo in acque profonde del Levante in grado di accogliere le corazzate della Royal Navy. Terminale del grandioso oleodotto trans-desertico Kirkuk-Haifa (Iraq Petroleum Company — IPC) e snodo delle ferrovie Hejaz e Palestine Railways.";
    } else if (s <= 3) {
      note = "Haifa · Obiettivo primario di sabotaggi da parte dei ribelli arabi lungo la tratta dell'oleodotto nella piana di Esdraelon; difesa dai reparti speciali congiunti anglo-ebraici dei Special Night Squads (SNS) del capitano Orde Wingate. Costruzione della grande raffineria della Consolidated Refineries Ltd (CRL).";
    } else if (s <= 5) {
      note = "Haifa · Con lo scoppio della guerra Haifa diviene il polmone energetico insostituibile della Mediterranean Fleet britannica e delle forze aeree in Egitto; scalo di convogli armati e idrovolanti.";
    } else if (s <= 7) {
      note = "Haifa · Bersaglio di ripetuti e devastanti bombardamenti della Regia Aeronautica italiana (SM.82 da Rodi) tra luglio e settembre 1940 diretti contro i serbatoi di greggio e il porto. Con la caduta della Francia, la diramazione dell'oleodotto verso Tripoli di Siria/Libano viene sigillata, convogliando tutto il flusso su Haifa.";
    } else {
      note = "Haifa · Blocco temporaneo dei flussi petroliferi dall'Iraq durante il colpo di stato di Rashid Ali ad Habbaniya; porto e base navale di radunata per la flotta alleata e le truppe australiane prima dell'invasione di Siria e Libano.";
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 3. Jaffa e Tel Aviv (PAL_TLV / ILTA)
  if (pNid === 'PAL_TLV' || pOrig === 'ILTA' || pName.includes('tel aviv') || pName.includes('jaffa') || pName.includes('yafa') || pName.includes('giaffa')) {
    const subName = `${prefix} — Sottodistretto di Jaffa e Tel Aviv`;
    const adminEntity = "Jaffa & Tel Aviv Sub-District · Polo Economico e Industriale dell'Yishuv & Porto di Giaffa";
    let note = '';
    if (s === 0) {
      note = "Tel Aviv e Giaffa · Cuore pulsante dell'insediamento ebraico (Yishuv) a Tel Aviv (fondata nel 1909 e sviluppatasi vertiginosamente in architettura modernista Bauhaus) affiancata all'antico porto arabo di Giaffa. Principale polo industriale, editoriale e finanziario del paese.";
    } else if (s <= 3) {
      note = "Tel Aviv e Giaffa · Lo sciopero arabo del 1936 blocca il porto di Giaffa; in risposta la comunità ebraica ottiene il permesso di costruire e inaugurare il nuovo porto indipendente di Tel Aviv. Forti tensioni interetniche lungo la linea di confine tra Giaffa e Tel Aviv, pattugliata dalle forze di polizia mandataria.";
    } else if (s <= 5) {
      note = "Tel Aviv · Epicentro delle oceaniche proteste dell'Yishuv contro il Libro Bianco del 1939; sede del comitato esecutivo dell'Agenzia Ebraica e dell'Haganah. Conversione delle fabbriche cittadine alla produzione bellica ausiliaria (munizioni, tessuti, medicinali) per le truppe imperiali britanniche.";
    } else if (s <= 7) {
      note = "Tel Aviv · Tragico bombardamento della Regia Aeronautica italiana il 9 settembre 1940: gli aerei italiani colpiscono quartieri residenziali a nord di Tel Aviv causando 137 morti e oltre 140 feriti civili. La città organizza la difesa antiaerea passiva e rifugi costieri.";
    } else {
      note = "Tel Aviv · Centro di mobilitazione e reclutamento per i volontari ebraici; collaborazione segreta con i comandi britannici per la formazione delle prime compagnie del Palmach destinate a operazioni speciali e di infiltrazione in Siria e Libano.";
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 4. Galilea (PAL_GAL / ILZ)
  if (pNid === 'PAL_GAL' || pOrig === 'ILZ' || pName.includes('galilea') || pName.includes('nazareth') || pName.includes('safed') || pName.includes('tiberias') || pName.includes('acre') || pName.includes('acri')) {
    const subName = `${prefix} — Distretto di Galilea`;
    const adminEntity = "Galilee District (Nazareth, Acri & Safed) · Frontiera Settentrionale Mandataria";
    let note = '';
    if (s === 0) {
      note = "Galilea (Al-Jalil / HaGalil) · Regione collinare e montuosa di grande valore storico e religioso (Nazareth, Lago di Tiberiade, Safed e Acri). Frontiera aperta con il Mandato Francese di Siria e del Libano; mosaico di villaggi arabi, antiche comunità cristiane e kibbutz pionieristici nella valle di Hula.";
    } else if (s <= 3) {
      note = "Galilea · Roccaforte della guerriglia araba durante la rivolta del 1936-39 (assassinio del commissario britannico Lewis Andrews a Nazareth nel 1937). I britannici erigono la recinzione fortificata di filo spinato ('Tegart\'s Wall') lungo il confine con Libano e Siria, presidiata da Forti Tegart per bloccare i rifornimenti di armi.";
    } else if (s <= 5) {
      note = "Galilea · Pacificazione forzata con l'impiego massiccio di truppe britanniche e delle Jewish Settlement Police; consolidamento degli insediamenti fortificati 'Homa U\'Migdal' (Torre e Palizzata) lungo le direttrici strategiche.";
    } else if (s <= 7) {
      note = "Galilea · Con la caduta della Francia e l'allineamento di Siria e Libano al regime di Vichy, la frontiera della Galilea si trasforma improvvisamente nella prima linea difensiva dell'Impero Britannico: trinceramenti, posti di blocco a Naqoura e Metulla, mine anticarro e pattugliamento continuo.";
    } else {
      note = "Galilea · Piattaforma operativa di lancio per l'Operazione Exporter: concentramento della 7th Australian Division e delle forze alleate che attraversano il confine della Galilea l'8 giugno 1941 penetrando nel Libano meridionale e verso Damasco.";
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 5. Samaria e Giudea (PAL_SAM / PSWBK)
  if (pNid === 'PAL_SAM' || pOrig === 'PSWBK' || pName.includes('samaria') || pName.includes('judea') || pName.includes('giudea') || pName.includes('nablus') || pName.includes('hebron') || pName.includes('west bank')) {
    const subName = `${prefix} — Samaria e Giudea`;
    const adminEntity = "Samaria & Judea Districts (Nablus, Jenin & Hebron) · Roccaforte della Montagna";
    let note = '';
    if (s === 0) {
      note = "Samaria e Giudea (Cisgiordania) · Dorsale montuosa centrale della Palestina mandataria a netta maggioranza araba, dominata dagli uliveti e dai centri storici mercantili di Nablus, Jenin, Tulkarm e Hebron. Snodo della ferrovia della Samaria.";
    } else if (s <= 3) {
      note = "Samaria e Giudea · Roccaforte impenetrabile e focolaio principale della Grande Rivolta Araba ('Triangolo della Ribellione' Nablus-Jenin-Tulkarm), guidato da capibanda come Fawzi al-Qawuqji e Abd al-Rahim al-Hajj Muhammad. L'esercito britannico conduce vaste operazioni di controinsurrezione, distruggendo case di ribelli e imponendo punizioni collettive.";
    } else if (s <= 5) {
      note = "Samaria e Giudea · Fine della rivolta e disarmo delle bande armate; istituzione di presidi permanenti dell'esercito britannico e stazioni di polizia Tegart a Nablus, Jenin e Hebron.";
    } else if (s <= 7) {
      note = "Samaria e Giudea · Calma vigilata sotto rigida amministrazione militare; produzione agricola intensiva di grano e olio per il sostentamento del Mandato e delle guarnigioni britanniche in Medio Oriente durante il blocco del Mediterraneo.";
    } else {
      note = "Samaria e Giudea · Retrovia strategica per il transito e il dislocamento di truppe britanniche, della Legione Araba transgiordana e delle colonne motorizzate dirette a nord per l'invasione della Siria di Vichy.";
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 6. Lydda e Sharon (PAL_LYD / ILM)
  if (pNid === 'PAL_LYD' || pOrig === 'ILM' || pName.includes('lydda') || pName.includes('ramle') || pName.includes('sharon') || pName.includes('lod')) {
    const subName = `${prefix} — Distretto di Lydda e Sharon`;
    const adminEntity = "Lydda District (Lod & Ramle) · Snodo Ferroviario Mandatario & Base Aerea RAF Lydda";
    let note = '';
    if (s === 0) {
      note = "Lydda e Sharon · Cuore della piana costiera di Sharon, famosa per gli agrumeti di arance 'Jaffa' e per il gigantesco nodo ferroviario di Lydda (intersezione tra le linee Il Cairo-Haifa e Jaffa-Gerusalemme).";
    } else if (s <= 3) {
      note = "Lydda · Costruzione e inaugurazione dell'Aeroporto di Wilhelma/Lydda (inaugurato nel 1937, futura base RAF Lydda), il più moderno e spazioso aeroporto del Medio Oriente; snodo cruciale delle rotte aeree imperiali dell'Imperial Airways verso l'India. Frequenti attentati arabi alle linee ferroviarie e ai convogli.";
    } else if (s <= 5) {
      note = "Lydda · Con lo scoppio della Seconda Guerra Mondiale la base aerea di Lydda (RAF Station Lydda) viene militarizzata ed espansa come quartier generale aereo strategico per bombardieri e caccia di scorta a difesa del Canale di Suez e della costa palestinese.";
    } else if (s <= 7) {
      note = "Lydda · Installazione di batterie antiaeree e depositi munizioni; la RAF schiera squadriglie da caccia Hurricanes e Gladiators per intercettare i bombardieri italiani della Regia Aeronautica diretti verso Tel Aviv e Haifa.";
    } else {
      note = "Lydda · Base di partenza fondamentale per le squadriglie della Royal Air Force impegnate nelle operazioni di soccorso ad Habbaniya in Iraq e per la ricognizione sui campi d'aviazione di Vichy a Rayak e Mezzeh prima dell'Operazione Exporter.";
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 7. Gaza (PAL_GAZ / PSGZZ)
  if (pNid === 'PAL_GAZ' || pOrig === 'PSGZZ' || pName.includes('gaza') || pName.includes('ghazzah') || pName.includes('khan yunis') || pName.includes('rafah')) {
    const subName = `${prefix} — Distretto di Gaza`;
    const adminEntity = "Gaza District · Corridoio Costiero verso il Sinai & Posto di Frontiera con l'Egitto";
    let note = '';
    if (s === 0) {
      note = "Gaza (Ghazzah) · Storico corridoio costiero meridionale tra il Levante e l'Egitto; centro commerciale e agricolo rinomato per la coltivazione dell'orzo, degli agrumi e per l'artigianato della ceramica e della tessitura.";
    } else if (s <= 3) {
      note = "Gaza · Snodo di frontiera doganale e ferroviaria sulla linea trans-sinaitica verso Al-Qantarah e Il Cairo. Durante la rivolta araba, la stazione e i ponti ferroviari vengono ripetutamente presidiati e difesi da truppe coloniali britanniche e da polizia a cavallo.";
    } else if (s <= 5) {
      note = "Gaza · Militarizzazione del corridoio ferroviario per il trasporto di materiale bellico e truppe dell'esercito imperiale britannico tra l'Egitto e la Palestina; costruzione di campi d'addestramento e depositi logistici.";
    } else if (s <= 7) {
      note = "Gaza · Linea di collegamento vitale per il transito delle divisioni australiane, neozelandesi e indiane tra il teatro nordafricano (fronte di Marsa Matruh e Sidi Barrani) e i presidi del Levante.";
    } else {
      note = "Gaza · Retrovia logistica e ospedaliera della British Army; scalo di rifornimento per le colonne corazzate e i convogli di munizioni in movimento verso il fronte siriano.";
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // 8. Beersheba e Negev (PAL_BEER / ILD)
  if (pNid === 'PAL_BEER' || pOrig === 'ILD' || pName.includes('beersheba') || pName.includes('negev') || pName.includes('darom') || pName.includes('aqaba')) {
    const subName = `${prefix} — Distretto di Beersheba (Negev)`;
    const adminEntity = "Beersheba Sub-District · Territorio Beduino del Negev & Sbocco sul Golfo di Aqaba";
    let note = '';
    if (s === 0) {
      note = "Beersheba (Bir as-Sabi / Negev) · Immensa distesa desertica e semiarida che costituisce quasi metà dell'intero territorio del Mandato, estendendosi da Beersheba a sud fino alle acque del Golfo di Aqaba (Mar Rosso). Amministrazione speciale basata sul diritto consuetudinario delle tribù beduine (Bani Sakhr, Tarabin, Tayaha).";
    } else if (s <= 3) {
      note = "Beersheba · Sorveglianza delle piste carovaniere da parte delle unità a cammello della Transjordan Frontier Force (TJFF) e della Palestine Police; la proposta Peel del 1937 ne prevedeva l'inclusione nella sfera mandataria/araba a causa della scarsa densità abitativa.";
    } else if (s <= 5) {
      note = "Beersheba · Il Libro Bianco del 1939 impone il blocco totale alle compravendite di terreni nel Negev (Zona A). L'esercito britannico istituisce stazioni di rifornimento per le pattuglie di ricognizione a lungo raggio nel deserto.";
    } else if (s <= 7) {
      note = "Beersheba · Corridoio strategico terrestre alternativo verso il Mar Rosso in caso di chiusura o danneggiamento del Canale di Suez; installazione di posti di vedetta a Umm Rashrash per controllare la navigazione nel Golfo di Aqaba contro possibili incursioni dei sommergibili italiani della base di Massaua (Mar Rosso).";
    } else {
      note = "Beersheba · Sicurezza garantita dalle pattuglie beduine della TJFF; collegamento strategico tra la Palestina e l'Emirato di Transgiordania dell'Emiro Abdullah I per garantire il libero transito delle forze motorizzate alleate verso l'Iraq e la Siria.";
    }
    return makeResult(ownerCode, subName, note, factionCode, adminEntity);
  }

  // Fallback
  return makeResult(ownerCode, 'Mandato di Palestina', 'British Mandate for Palestine (League of Nations Class A Mandate)', factionCode, 'British Mandate Administration (Jerusalem)');
}

export function resolveFeature(ft: any, s: number): ResolvedTerritory {
  if (!ft) return makeResult('NEU', 'Territorio Sconosciuto');
  if (ft.__resolve) return ft.__resolve(s);
  const p = ft.properties || {};
  const rawCntr = String(
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
  ).toUpperCase().trim();
  const cntr = toCanonicalCountryCode(rawCntr);
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

  // Regno dell'Afghanistan (34 Province 1936-1941)
  const isAfgProv =
    p.country === 'Afghanistan' ||
    String(ft.id || '').startsWith('AF_') ||
    nid.startsWith('AF_') ||
    String(p.shapeISO || '').startsWith('AF-') ||
    cntr === 'AF' ||
    cntr === 'AFG' ||
    cntr === '004';

  if (isAfgProv) {
    const resAfg = resolveAfghanistanProvince(ft.id || p.id || p.shapeISO || rawName, s);
    if (resAfg) return resAfg;
  }

  // Impero dell'Iran (31 Province 1936-1941)
  const isIranProv =
    p.REGION_KIND === 'IRAN_PROVINCE' ||
    String(ft.id || '').startsWith('IRN_') ||
    nid.startsWith('IRN_') ||
    cntr === 'IR' ||
    cntr === 'IRN';

  if (isIranProv) {
    return resolveIranProvince(ft, s);
  }

  // British Raj (65 Province e Territori dell\'Impero Anglo-Indiano, Pakistan, Bangladesh, Birmania e India 1936-1941)
  const fidClean = String(ft.id || p.id || p.NUTS_ID || '').trim();

  // U.S. Naval Operating Base Guantanamo Bay (Treaty of 1903 / 1934)
  const isGuantanamo =
    fidClean === 'US_GUANTANAMO' ||
    nid === 'US_GUANTANAMO' ||
    p.REGION_KIND === 'US_MILITARY_BASE' ||
    nrm.includes('guantanamo');

  if (isGuantanamo) {
    const topG = getExtendedToponym('guantanamo', 'USA', nid, c, s);
    return makeResult(
      'USA',
      topG.name || 'Guantanamo Bay Naval Base (U.S. Navy — Cuba)',
      topG.note ||
        'Base navale permanente di 116 km² affittata in perpetuità dagli Stati Uniti sulla baia di Guantánamo nel sud-est di Cuba in virtù del trattato cubano-statunitense del 1903 (confermato dal trattato del 1934). Base navale operativa primaria per il controllo del Paso de los Vientos (Windward Passage) tra Cuba e Haiti e la sorveglianza delle rotte dei Caraibi.',
      'Alleati',
      topG.adminTitle || 'U.S. Naval Operating Base Guantanamo Bay (Treaty of 1934)'
    );
  }

  const isBritishRajProv =
    p.REGION_KIND === 'RAJ_PROVINCE' ||
    fidClean.startsWith('PK_') ||
    fidClean.startsWith('BD_') ||
    fidClean.startsWith('MM_') ||
    fidClean.startsWith('IN_') ||
    p.ORIG_ID === 'PKGB';

  if (isBritishRajProv) {
    return resolveBritishRajProvince(ft, s);
  }

  // Chōsen / Corea (33 Province e Territori Coloniali dell'Impero Giapponese 1936-1941)
  const isKoreaProv =
    p.REGION_KIND === 'KOREA_PROVINCE' ||
    Boolean((KOREA_PROVINCES_META as any)?.[fidClean]) ||
    Boolean((KOREA_PROVINCES_META as any)?.[String(p.id || '')]) ||
    Boolean((KOREA_PROVINCES_META as any)?.[String(p.cartodb_id || '')]) ||
    fidClean.startsWith('KR') ||
    fidClean.startsWith('KP') ||
    cntr === 'KR' ||
    cntr === 'KP' ||
    cntr === 'KOR' ||
    cntr === 'PRK' ||
    cntr === '410' ||
    cntr === '408';

  if (isKoreaProv) {
    return resolveKoreaProvince(ft, s);
  }

  // British Malaya e Singapore (16 Stati/Territori Malesi + Singapore 1936-1941)
  const isMalaysiaProv =
    p.REGION_KIND === 'MALAYSIA_STATE' ||
    p.REGION_KIND === 'MALAYSIA_PROVINCE' ||
    p.REGION_KIND === 'MALAYSIA_FEDERAL_TERRITORY' ||
    p.REGION_KIND === 'SINGAPORE_SETTLEMENT' ||
    Boolean((MALAYSIA_PROVINCES_META as any)?.[fidClean]) ||
    Boolean((MALAYSIA_PROVINCES_META as any)?.[nid]) ||
    (fidClean.startsWith('MY') && fidClean.length > 2) ||
    (nid.startsWith('MY') && nid.length > 2) ||
    fidClean === 'SG01' ||
    nid === 'SG01' ||
    cntr === 'MY' ||
    cntr === 'MYS' ||
    cntr === 'SG' ||
    cntr === 'SGP';

  if (isMalaysiaProv) {
    return resolveMalaysiaProvince(ft, s);
  }

  // Territory of Papua & Mandated Territory of New Guinea (22 Province 1936-1941)
  const isPngProv =
    p.REGION_KIND === 'PNG_PROVINCE' ||
    Boolean((PNG_PROVINCES_META as any)?.[fidClean]) ||
    Boolean((PNG_PROVINCES_META as any)?.[nid]) ||
    (fidClean.startsWith('PG') && fidClean.length > 2) ||
    (nid.startsWith('PG') && nid.length > 2) ||
    cntr === 'PG' ||
    cntr === 'PNG';

  if (isPngProv) {
    return resolvePapuaNewGuineaProvince(ft, s);
  }

  // Timor Português / Timor-Leste (1936-1941)
  const isTimorLeste =
    p.REGION_KIND === 'TIMOR_LESTE' ||
    fidClean === 'TLS' ||
    nid === 'TLS' ||
    cntr === 'TL' ||
    cntr === 'TLS' ||
    nrm === 'timor-leste' ||
    nrm === 'timor leste' ||
    nrm === 'portuguese timor' ||
    nrm === 'timor portugues';

  if (isTimorLeste) {
    return resolveTimorLeste(ft, s);
  }

  // Nederlands-Indië / Indonesia (34 Province 1936-1941)
  const isIndonesiaProv =
    p.REGION_KIND === 'INDONESIA_PROVINCE' ||
    Boolean((INDONESIA_PROVINCES_META as any)?.[fidClean]) ||
    Boolean((INDONESIA_PROVINCES_META as any)?.[nid]) ||
    ((fidClean.startsWith('ID') || nid.startsWith('ID')) && (fidClean.length === 4 || nid.length === 4)) ||
    cntr === 'ID' ||
    cntr === 'IDN';

  if (isIndonesiaProv) {
    return resolveIndonesiaProvince(ft, s);
  }

  // Commonwealth of the Philippines (17 Province e Regioni 1936-1941)
  const isPhilippinesProv =
    p.REGION_KIND === 'PHILIPPINES_PROVINCE' ||
    Boolean((PHILIPPINES_PROVINCES_META as any)?.[fidClean]) ||
    Boolean((PHILIPPINES_PROVINCES_META as any)?.[nid]) ||
    ((fidClean.startsWith('PH') || nid.startsWith('PH')) && (fidClean.length === 4 || nid.length === 4)) ||
    cntr === 'PH' ||
    cntr === 'PHL' ||
    cntr === '608';

  if (isPhilippinesProv) {
    return resolvePhilippinesProvince(ft, s);
  }




  // Algérie française (58 Wilayas / Dipartimenti e Territori del Sud 1936-1940)
  const isAlgeriaProv =
    p.REGION_KIND === 'ALGERIA_PROVINCE' ||
    cntr === 'DZ' ||
    cntr === 'DZA' ||
    String(ft.id || '').startsWith('DZ') ||
    nid.startsWith('DZ') ||
    (ft.id && (ALGERIA_PROVINCES_META as any)?.[ft.id]);

  if (isAlgeriaProv) {
    const cleanId = String(ft.id || nid || '').replace(/^DZ_/, 'DZ').toUpperCase();
    const dzMeta = (ALGERIA_PROVINCES_META as any)?.[cleanId];
    const owner = s >= 6 ? 'VIC_NAF' : 'F_NAF';
    const top = getTop(owner);
    const faction = s >= 6 ? 'Fantoccio' : 'Alleati';
    const defaultAdmin = s >= 6
      ? 'Algérie française — Régime de Vichy (Yves Châtel / Maxime Weygand)'
      : 'Algérie française — Gouvernement Général de l\'Algérie (Georges Le Beau)';
    return makeResult(
      owner,
      dzMeta?.historicalName || top.name || p.HISTORICAL_NAME || rawName,
      dzMeta?.note || top.note || p.HISTORICAL_NOTE || 'Départements français d\'Algérie et Territoires du Sud',
      faction,
      dzMeta?.adminTitle || top.adminTitle || p.ADMIN_TITLE || defaultAdmin
    );
  }

  // Protectorat français au Maroc (9 Régions et Territoires 1936-1940)
  const isMoroccoFranceProv =
    !['ES_RIF', 'TANGER'].includes(String(ft.id || '')) &&
    !['ES_RIF', 'TANGER'].includes(String(p.CNTR_ID || '')) &&
    !['ES_RIF', 'TANGER'].includes(String(nid || '')) &&
    (
      p.REGION_KIND === 'MOROCCO_PROVINCE' ||
      (ft.id && (MOROCCO_PROVINCES_META as any)?.[ft.id]) ||
      (nid && (MOROCCO_PROVINCES_META as any)?.[nid]) ||
      ((cntr === 'MA' || cntr === 'MAR') && (String(ft.id || '').startsWith('MA') || nid.startsWith('MA')))
    );

  if (isMoroccoFranceProv) {
    const cleanId = String(ft.id || nid || '').replace(/^MA_/, 'MA').toUpperCase();
    const maMeta = (MOROCCO_PROVINCES_META as any)?.[cleanId];
    const owner = s >= 6 ? 'VIC_NAF' : 'F_NAF';
    const top = getTop(owner);
    const faction = s >= 6 ? 'Fantoccio' : 'Alleati';
    const defaultAdmin = s >= 6
      ? 'Protectorat français au Maroc — Régime de Vichy (Général Charles Noguès)'
      : 'Protectorat français au Maroc — Résidence Générale de la République Française (Général Charles Noguès)';
    return makeResult(
      owner,
      maMeta?.historicalName || top.name || p.HISTORICAL_NAME || rawName,
      maMeta?.note || top.note || p.HISTORICAL_NOTE || 'Protectorat français au Maroc',
      faction,
      maMeta?.adminTitle || top.adminTitle || p.ADMIN_TITLE || defaultAdmin
    );
  }

  // Protectorat français de Tunisie (24 Gouvernorats et Territoires du Sud 1936-1940)
  const isTunisiaProv =
    p.REGION_KIND === 'TUNISIA_PROVINCE' ||
    (ft.id && (TUNISIA_PROVINCES_META as any)?.[ft.id]) ||
    (nid && (TUNISIA_PROVINCES_META as any)?.[nid]) ||
    ((cntr === 'TN' || cntr === 'TUN') && (String(ft.id || '').startsWith('TN') || nid.startsWith('TN')));

  if (isTunisiaProv) {
    const cleanId = String(ft.id || nid || '').replace(/^TN_/, 'TN').toUpperCase();
    const tnMeta = (TUNISIA_PROVINCES_META as any)?.[cleanId];
    const owner = s >= 6 ? 'VIC_NAF' : 'F_NAF';
    const top = getTop(owner);
    const faction = s >= 6 ? 'Fantoccio' : 'Alleati';
    const defaultAdmin = s >= 6
      ? 'Protectorat français de Tunisie — Régime de Vichy (Marcel Peyrouton / Amiral Jean-Pierre Esteva)'
      : 'Protectorat français de Tunisie — Résidence Générale de la République Française (Armand Guillon / Eirik Labonne)';
    return makeResult(
      owner,
      tnMeta?.historicalName || top.name || p.HISTORICAL_NAME || rawName,
      tnMeta?.note || top.note || p.HISTORICAL_NOTE || 'Protectorat français de Tunisie',
      faction,
      tnMeta?.adminTitle || top.adminTitle || p.ADMIN_TITLE || defaultAdmin
    );
  }

  // Regno d'Egitto (27 Governatorati e Mudiriyat 1936-1940)
  const isEgypt =
    cntr === 'EG' ||
    cntr === 'EGY' ||
    p.SOVEREIGN === 'EGY' ||
    p.REGION_KIND === 'EGYPT_PROVINCE' ||
    nid.startsWith('EG') ||
    String(ft.id || '').startsWith('EG') ||
    nrm === 'egypt' ||
    nrm === 'egitto' ||
    nrm === 'regno d egitto' ||
    nrm === 'kingdom of egypt';

  if (isEgypt) {
    const cleanId = String(ft.id || nid || '').replace(/^EG_/, 'EG').toUpperCase();
    const egMeta = (EGYPT_DISTRICTS_META as any)?.[cleanId];
    const egTop = getTop('EGY');
    if (cleanId === 'EGMT' && s === 7) {
      return makeResult(
        'EGY',
        'Muḥāfaẓat al-Ṣaḥrāʾ al-Gharbiyyah (Mersa Matruh — Fronte di Sidi Barrani)',
        'Operazione E (9-16 settembre 1940): la 10ª Armata italiana del Maresciallo Rodolfo Graziani varca il confine libico-egiziano, occupa Sollum e il Passo di Halfaya e si attesta nei campi trincerati di Sidi Barrani, Maktila e Tummar, fronteggiata a Mersa Matruh dalla Western Desert Force britannica (Gen. Richard O\'Connor).',
        'Alleati',
        'Western Desert Governorate — Frontline of Sidi Barrani & Mersa Matruh (British Middle East Command)'
      );
    }
    if (cleanId === 'EGMT' && s >= 8) {
      return makeResult(
        'EGY',
        'Muḥāfaẓat al-Ṣaḥrāʾ al-Gharbiyyah (Mersa Matruh — Fronte di Sollum e Passo di Halfaya)',
        'Operazione Sonnenblume (marzo-aprile 1941): dopo aver riconquistato la Cirenaica ed aggirato la piazzaforte assediata di Tobruk, le colonne corazzate del Deutsches Afrikakorps (Gen. Erwin Rommel) raggiungono il confine egiziano occupando Sollum, Forte Capuzzo e il Passo di Halfaya (13-26 aprile 1941), dove si attesta il fronte contro la Western Desert Force britannica.',
        'Alleati',
        'Western Desert Governorate — Frontline of Sollum & Halfaya Pass (British Middle East Command)'
      );
    }
    return makeResult(
      'EGY',
      egMeta?.historicalName || egTop.name || p.HISTORICAL_NAME || rawName,
      egMeta?.note || egTop.note || p.HISTORICAL_NOTE || (s >= 1 ? "Regno d'Egitto (Trattato Anglo-Egiziano del 1936)" : "Regno d'Egitto (Occupazione/Influenza Britannica)"),
      'Alleati',
      egMeta?.adminTitle || egTop.adminTitle || p.ADMIN_TITLE || "Regno d'Egitto (Re Faruq I / Mustafa al-Nahhas)"
    );
  }

  // Yemen, Protettorato di Aden e Porto del Raj (22 Governatorati 1936-1941)
  const isYemenProv =
    p.REGION_KIND === 'YEMEN_PROVINCE' ||
    (ft.id && (YEMEN_PROVINCES_META as any)?.[ft.id]) ||
    (nid && (YEMEN_PROVINCES_META as any)?.[nid]) ||
    ((cntr === 'YE' || cntr === 'YEM') && (String(ft.id || '').startsWith('YE') || nid.startsWith('YE')));

  if (isYemenProv) {
    const cleanId = String(ft.id || nid || '').replace(/^YE_/, 'YE').toUpperCase();
    const yeMeta = (YEMEN_PROVINCES_META as any)?.[cleanId];

    // Caso 1: Porto e Insediamento di Aden (YEAD) - Porto del Raj (1936) vs Colonia della Corona (1938-1941)
    if (cleanId === 'YEAD' || yeMeta?.entityKind === 'ADEN_PORT') {
      if (s === 0) {
        return makeResult(
          'RAJ',
          yeMeta?.historicalName || "Aden (Porto dell'India Britannica — British Raj)",
          yeMeta?.note || "Amministrato come Chief Commissioner's Province dell'India Britannica sotto il Viceré di Nuova Delhi.",
          'Alleati',
          "Chief Commissioner's Province of British India (Port of Aden — British Raj)"
        );
      }
      return makeResult(
        'UK',
        yeMeta?.historicalName || 'Colonia di Aden (Crown Colony of Aden)',
        yeMeta?.note || 'Colonia della Corona britannica autonoma dal 1° aprile 1937 sotto il Colonial Office di Londra.',
        'Alleati',
        'British Crown Colony of Aden (Colonial Office)'
      );
    }

    // Caso 2: Protettorato di Aden (7 Governatorati)
    if (yeMeta?.entityKind === 'ADEN_PROTECTORATE') {
      return makeResult(
        'UK',
        yeMeta?.historicalName || p.HISTORICAL_NAME || rawName,
        yeMeta?.note || p.HISTORICAL_NOTE || 'Protettorato britannico di Aden',
        'Alleati',
        yeMeta?.adminTitle || p.ADMIN_TITLE || 'British Aden Protectorate'
      );
    }

    // Caso 3: Regno Mutawakkilita dello Yemen (14 Governatorati)
    return makeResult(
      'YEM',
      yeMeta?.historicalName || p.HISTORICAL_NAME || rawName,
      yeMeta?.note || p.HISTORICAL_NOTE || 'Regno Mutawakkilita dello Yemen (Imam Yahya)',
      'Neutrale',
      yeMeta?.adminTitle || p.ADMIN_TITLE || 'Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah'
    );
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
      'Serenissima Repubblica di San Marino (Stato Neutrale)',
      'Neutrale',
      'Serenissima Repubblica di San Marino'
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
        : 'Stato della Città del Vaticano (Papa Pio XII - Neutralità)',
      'Neutrale',
      s < 4
        ? 'Stato della Città del Vaticano (Papa Pio XI)'
        : 'Stato della Città del Vaticano (Papa Pio XII)'
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
      'Gibraltar — Fortezza Navale Britannica (Force H)',
      'Alleati',
      'British Empire — Crown Colony of Gibraltar'
    );
  }

  // Andorra (AND) - Coprincipato sovrano neutrale dei Pirenei
  const isAndorra =
    ft.id === 'AND_HIST' ||
    ft.__kind === 'ANDORRA' ||
    cntr === 'AD' ||
    cntr === 'AND' ||
    nid === 'AD' ||
    nid === 'AND' ||
    nid === 'AND_HIST' ||
    nrm === 'andorra' ||
    nrm === 'principat d andorra' ||
    nrm === 'principato d andorra' ||
    nrm === 'principality of andorra';

  if (isAndorra) {
    return makeResult(
      'AND',
      'Principato d\'Andorra',
      'Principato d\'Andorra (Coprincipato Sovrano Neutrale)',
      'Neutrale',
      "Principat d'Andorra (Coprincipato Sovrano Neutrale)"
    );
  }

  // Liechtenstein (LIE) - Principato sovrano neutrale delle Alpi
  const isLiechtenstein =
    ft.id === 'LIE_HIST' ||
    ft.id === 'LI000' ||
    ft.__kind === 'LIECHTENSTEIN' ||
    cntr === 'LI' ||
    cntr === 'LIE' ||
    nid === 'LI' ||
    nid === 'LIE' ||
    nid === 'LI000' ||
    nid === 'LIE_HIST' ||
    nrm === 'liechtenstein' ||
    nrm === 'fuerstentum liechtenstein' ||
    nrm === 'fürstentum liechtenstein' ||
    nrm === 'principato del liechtenstein' ||
    nrm === 'principality of liechtenstein';

  if (isLiechtenstein) {
    const topLie = resolveSwissAustrianToponym(nid, rawName, nrm, 'LIE', s);
    return makeResult(
      'LIE',
      topLie?.name || 'Fürstentum Liechtenstein (Vaduz)',
      topLie?.note || (s < 2
        ? 'Principato del Liechtenstein — Principe Franz I (Neutrale / Zollunion Schweiz).'
        : 'Principato del Liechtenstein — Principe Franz Josef II (Neutrale / Zollunion Schweiz).'),
      'Neutrale',
      topLie?.adminTitle || 'Fürstentum Liechtenstein (Souveränes Fürstentum)'
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
    const top = getTop('UK');
    return makeResult(
      'UK',
      top.name || 'Crown Dependency of the Isle of Man (Douglas)',
      top.note || 'Dipendenza autonoma della Corona Britannica nel Mare d\'Irlanda.',
      s >= 4 ? 'Alleati' : 'Neutrale',
      top.adminTitle || 'Crown Dependency of the Isle of Man'
    );
  }

  // Isole del Canale (Channel Islands)
  const isChannel =
    !cntr.startsWith('US') &&
    !nid.startsWith('US') &&
    (
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
      (nrm.includes('jersey') && !nrm.includes('new jersey')) ||
      nrm.includes('guernsey') ||
      nrm.includes('channel islands') ||
      nrm.includes('isole del canale') ||
      (c[0] >= -3.0 && c[0] <= -1.8 && c[1] >= 49.0 && c[1] <= 49.9)
    );

  if (isChannel) {
    if (s >= 6) {
      const gerTop = getTop('GER');
      return makeResult(
        'GER',
        gerTop.name || 'Kanalinseln (Deutsche Besetzung)',
        gerTop.note || 'Occupazione militare tedesca delle Isole del Canale (giugno/luglio 1940), unici territori britannici occupati dal Terzo Reich.',
        'Asse',
        gerTop.adminTitle || 'Befehlshaber der Kanalinseln (Militärverwaltung)'
      );
    }
    const ukTop = getTop('UK');
    return makeResult(
      'UK',
      ukTop.name || (nrm.includes('jersey') ? 'Bailiwick of Jersey (Saint Helier)' : 'Bailiwick of Guernsey (Saint Peter Port)'),
      ukTop.note || 'Dipendenza della Corona Britannica nelle Isole del Canale.',
      s >= 4 ? 'Alleati' : 'Neutrale',
      ukTop.adminTitle || 'British Crown Dependency (Channel Islands)'
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

  // Granularizzazione province dell'Indocina Francese (Cambogia, Laos, Vietnam)
  const isIndochinaProv =
    cntr === 'KH' ||
    cntr === 'LA' ||
    cntr === 'VN' ||
    cntr === 'KHM' ||
    cntr === 'LAO' ||
    cntr === 'VNM' ||
    p.REGION_KIND === 'INDOCHINA_PROVINCE' ||
    Boolean((FRENCH_INDOCHINA_PROVINCES_META as any)?.[fidClean]) ||
    Boolean((FRENCH_INDOCHINA_PROVINCES_META as any)?.[nid]) ||
    nid.startsWith('KH') ||
    nid.startsWith('LA') ||
    nid.startsWith('VN') ||
    fidClean.startsWith('KH') ||
    fidClean.startsWith('LA') ||
    fidClean.startsWith('VN');

  if (isIndochinaProv) {
    return resolveFrenchIndochinaProvince(ft, s);
  }

  // Granularizzazione e risoluzione integrata 50 Stati, DC e Territori degli Stati Uniti d'America (1936-1941)
  const isUsaProv =
    !p.IS_HB &&
    rawName !== 'United States' &&
    (
      cntr === 'US' ||
      cntr === 'USA' ||
      cntr === '840' ||
      p.SOVEREIGN === 'USA' ||
      p.country === 'United States' ||
      nid.startsWith('US_') ||
      fidClean.startsWith('US_') ||
      Boolean((p.shapeISO && String(p.shapeISO).startsWith('US-'))) ||
      Boolean((USA_PROVINCES_META as any)?.[fidClean]) ||
      Boolean((USA_PROVINCES_META as any)?.[nid])
    );

  if (isUsaProv) {
    const resUsa = resolveUSAProvince(ft, s);
    if (resUsa) return resUsa;
  }

  const isCanProv =
    !p.IS_HB &&
    rawName !== 'Canada' &&
    (
      cntr === 'CA' ||
      cntr === 'CAN' ||
      cntr === '124' ||
      p.country === 'Canada' ||
      p.country === 'Dominion of Newfoundland' ||
      nid.startsWith('CA_') ||
      fidClean.startsWith('CA_') ||
      Boolean((p.shapeISO && String(p.shapeISO).startsWith('CA-'))) ||
      Boolean((CANADA_PROVINCES_META as any)?.[fidClean]) ||
      Boolean((CANADA_PROVINCES_META as any)?.[nid])
    );

  if (isCanProv) {
    const resCan = resolveCanadaProvince(ft, s);
    if (resCan) return resCan;

    if (nid === 'CA_NL' || fidClean === 'CA_NL' || p.country === 'Dominion of Newfoundland' || (p.shapeISO && String(p.shapeISO) === 'CA-NL')) {
      return makeResult(
        'UK',
        'Dominion of Newfoundland (St. John\'s)',
        'Dominion di Terranova sotto Commissione di Governo Britannica (Commission of Government 1934-1949). Frontiera del Labrador confermata dal Privy Council nel 1927.',
        'Alleati',
        'Dominion of Newfoundland'
      );
    }
    const provName = rawName || p.shapeName || p.NAME || p.HISTORICAL_NAME || '';
    const topCan = getExtendedToponym('Canada', 'CAN', '', c, s);
    const displayName = provName ? `${provName} (${topCan.name || 'Dominion of Canada'})` : (topCan.name || 'Dominion of Canada');
    return makeResult(
      'CAN',
      displayName,
      topCan.note || 'Dominion del Canada',
      'Alleati',
      topCan.adminTitle || 'Dominion of Canada'
    );
  }

  const isMexProv =
    !p.IS_HB &&
    rawName !== 'Mexico' &&
    rawName !== 'Estados Unidos Mexicanos' &&
    rawName !== 'Stati Uniti Messicani' &&
    (
      cntr === 'MEX' ||
      p.country === 'Mexico' ||
      nid.startsWith('MX_') ||
      fidClean.startsWith('MX_') ||
      Boolean((p.shapeISO && String(p.shapeISO).startsWith('MX-'))) ||
      Boolean((MEXICO_PROVINCES_META as any)?.[fidClean]) ||
      Boolean((MEXICO_PROVINCES_META as any)?.[nid])
    );

  if (isMexProv) {
    const resMex = resolveMexicoProvince(ft, s);
    if (resMex) return resMex;
    const provName = rawName || p.shapeName || p.NAME || p.HISTORICAL_NAME || '';
    const topMex = getExtendedToponym('Mexico', 'MEX', '', c, s);
    const displayName = provName ? `${provName} (${topMex.name || 'Estados Unidos Mexicanos'})` : (topMex.name || 'Estados Unidos Mexicanos');
    return makeResult(
      'MEX',
      displayName,
      topMex.note || 'Stati Uniti Messicani (Presidenza di Lázaro Cárdenas)',
      'Neutrale',
      topMex.adminTitle || 'Estados Unidos Mexicanos'
    );
  }

  const isAOFProv =
    !p.IS_HB &&
    (
      nid.startsWith('AOF_') ||
      fidClean.startsWith('AOF_') ||
      Boolean((AOF_PROVINCES_META as any)?.[fidClean]) ||
      Boolean((AOF_PROVINCES_META as any)?.[nid]) ||
      ((cntr === 'SN' || cntr === 'MR' || cntr === 'ML' || cntr === 'GN' || cntr === 'CI' || cntr === 'BJ' || cntr === 'NE' || cntr === 'BF') &&
        (p.country === 'French West Africa' || p.PARTOF === 'French West Africa'))
    );

  if (isAOFProv) {
    const resAOF = resolveAOFProvince(ft, s);
    if (resAOF) return resAOF;
  }

  const isAEFProv =
    (
      cntr === 'AEF_PROV' ||
      nid.startsWith('AEF_') ||
      fidClean.startsWith('AEF_') ||
      p.REGION_KIND === 'AEF_PROVINCE' ||
      Boolean((AEF_PROVINCES_META as any)?.[fidClean]) ||
      Boolean((AEF_PROVINCES_META as any)?.[nid]) ||
      ((cntr === 'TD' || cntr === 'CF' || cntr === 'CG' || cntr === 'GA') &&
        (p.country === 'French Equatorial Africa' || p.PARTOF === 'French Equatorial Africa'))
    );

  if (isAEFProv) {
    const resAEF = resolveAEFProvince(ft, s);
    if (resAEF) return resAEF;
  }

  // Granularizzazione integrale del Teatro Cinese e Guerra Sino-Giapponese (1936-1940)
  if (cntr === 'CN_PROV' || nid.startsWith('CHN_') || p.REGION_KIND === 'CHINA_PROVINCE') {
    return resolveChinaProvince(s, nid, p, rawName);
  }

  // Granularizzazione e risoluzione prefetture/territori dell'Impero Giapponese (1936-1941)
  const isJapanProv =
    cntr === 'JP_PREF' ||
    cntr === 'JP' ||
    cntr === 'JPN' ||
    cntr === '392' ||
    nid.startsWith('JP_') ||
    fidClean.startsWith('JP_') ||
    p.REGION_KIND === 'JAPAN_PREFECTURE' ||
    p.REGION_KIND === 'JAPAN_TERRITORY' ||
    Boolean((JAPAN_PROVINCES_META as any)?.[fidClean]) ||
    Boolean((JAPAN_PROVINCES_META as any)?.[nid]) ||
    (nid.startsWith('JP') && nid.length > 2) ||
    (fidClean.startsWith('JP') && fidClean.length > 2);

  if (isJapanProv) {
    return resolveJapanProvince(ft, s);
  }

  // Censimento Geocartografico e Toponomastico esaustivo delle 239 entità territoriali sovietiche (1936-1941)
  const isSovietProv =
    (nid && (nid.startsWith('SOV_') || nid.startsWith('SU_'))) ||
    cntr === 'SU' ||
    cntr === 'SOV' ||
    cntr === 'SU_CRIMEA' ||
    cntr === 'SOV_MASSR' ||
    Boolean((SOVIET_PROVINCES_META as any)?.[nid]) ||
    Boolean((SOVIET_PROVINCES_META as any)?.[fidClean]);

  if (isSovietProv) {
    const sovRes = resolveSovietProvince(nid || fidClean || rawName, s, rawName);
    if (sovRes) {
      return sovRes;
    }
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
    case 'SOV':
    case 'SU':
    case 'SU_CRIMEA': {
      const sovProv = resolveSovietProvince(nid || fidClean || rawName, s, rawName);
      if (sovProv) return sovProv;
      if (nid === 'SOV_ADM1_RUS_55_Tuva' || nid.includes('Tuva') || nrm.includes('tuva') || nrm.includes('tannu')) {
        const histName = p.HISTORICAL_NAME || p.NUTS_NAME || 'Tyva Arat Respublika (Kyzyl)';
        const adminTitle = p.ADMIN_TITLE || 'Tyva Arat Respublika (Tuvan People\'s Republic)';
        return makeResult('TUV', histName, adminTitle, 'Comintern');
      }
      const top = getTop('SOV');
      const histName = top?.name || p.HISTORICAL_NAME || p.NUTS_NAME || rawName;
      const adminTitle = top?.adminTitle || p.ADMIN_TITLE || 'SSSR (Soyuz Sovetskikh Sotsialisticheskikh Respublik)';
      const note = top?.note || p.ADMIN_TITLE || 'Territorio dell\'Unione Sovietica (Piani Quinquennali e industrializzazione)';
      return makeResult('SOV', histName, note, 'Comintern', adminTitle);
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
          s >= 9
            ? 'Suomen tasavalta — Petsamon lääni (Jatkosota: Operazione Silberfuchs, base artica tedesco-finlandese sul Mar di Barents)'
            : 'Suomen tasavalta — Petsamon lääni (Jäämeren yhteys, Tarton rauha 1920-1944)',
          s >= 9 ? 'Asse' : undefined
        );
      }

      if (s < 6 || s >= 9) {
        return makeResult(
          'FIN',
          histName,
          s >= 9
            ? 'Suomen tasavalta — Jatkosota (Riconquista finlandese della Carelia e di Salla nell\'estate-autunno 1941; riannessione formale proclamata dal Parlamento finlandese il 6 dicembre 1941)'
            : isSalla
            ? 'Suomen tasavalta — Salla-Kuusamon alue (1920-1940)'
            : 'Suomen tasavalta — Tarton rauhan historialliset rajat (1920-1940)',
          s >= 9 ? 'Asse' : undefined,
          s >= 9 ? 'Suomen tasavalta — Karjalan palautettu alue (Jatkosota 1941)' : undefined
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
        s >= 9
          ? 'Suomen tasavalta — Petsamon nikkelikaivokset (Jatkosota & Operazione Silberfuchs: base del Gebirgskorps Norwegen del Gen. Eduard Dietl verso Murmansk)'
          : 'Suomen tasavalta — Petsamon nikkelikaivokset ja Jäämeren käytävä (1940)',
        s >= 9 ? 'Asse' : undefined
      );
    }

    case 'FIN_KARELIA': {
      const finName = p.HISTORICAL_NAME || p.NUTS_NAME || rawName;
      const sovName = p.SOV_NAME || (finName + ' (SSSR)');
      if (s < 6 || s >= 9) {
        return makeResult(
          'FIN',
          finName,
          s >= 9
            ? 'Suomen tasavalta — Jatkosota (Luglio-Settembre 1941): le truppe finlandesi del Maresciallo Mannerheim riconquistano Viipuri (29 agosto 1941), Sortavala, Käkisalmi e l\'intero Istmo di Carelia e Ladoga-Carelia ceduti nel 1940; il 6 dicembre 1941 il Parlamento di Helsinki ne proclama la formale riunificazione alla Finlandia.'
            : 'Suomen tasavalta — Tarton rauhan historialliset rajat (1920-1940)',
          s >= 9 ? 'Asse' : undefined,
          s >= 9 ? 'Suomen tasavalta — Viipurin lääni (Palautettu Karjala 1941)' : undefined
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
      if (s < 6 || s >= 9) {
        return makeResult(
          'FIN',
          finName,
          s >= 9
            ? 'Suomen tasavalta — Jatkosota (Luglio-Settembre 1941): riconquista finlandese-tedesca (Operazione Polarfuchs, XXXVI Corpo tedesco e 6ª Divisione finlandese) di Salla orientale e Alakurtti lungo la direttrice di Kandalaksha.'
            : 'Suomen tasavalta — Salla-Kuusamon alue (1920-1940)',
          s >= 9 ? 'Asse' : undefined,
          s >= 9 ? 'Suomen tasavalta — Sallan palautettu alue (Jatkosota 1941)' : undefined
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
      if (s >= 9) {
        return makeResult(
          'ROM',
          `${histName} — Guvernământul Transnistriei (Tiraspol / Balta)`,
          'Governatorato della Transnistria (Guvernământul Transnistriei) — Territorio tra i fiumi Dnestr e Bug Meridionale formalmente ceduto dalla Germania all\'amministrazione civile e militare del Regno di Romania con l\'Accordo di Tighina del 30 agosto 1941 (Conducător Ion Antonescu, Governatore Gheorghe Alexianu; capitale trasferita da Tiraspol a Odessa dopo la caduta della città il 16 ottobre 1941).',
          'Asse',
          'Regatul României — Guvernământul Civil al Transnistriei (Guvernator Prof. Gheorghe Alexianu)'
        );
      }
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
      if (s >= 9) {
        return makeResult(
          'ROM',
          `${histName} — Guvernământul Basarabiei (Chișinău)`,
          'Operazione München (2-26 luglio 1941): la 3ª e 4ª Armata romena del Gen. Ion Antonescu, insieme all\'11ª Armata tedesca, riconquistano Chișinău (16 luglio) e l\'intera Bessarabia ceduta all\'URSS nel giugno 1940, ricostituendo il Governatorato autonomo della Bessarabia (Guvernământul Basarabiei, Governatore Gen. Constantin Voiculescu).',
          'Asse',
          'Regatul României — Guvernământul Basarabiei (Chișinău)'
        );
      }
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
      if (s >= 9) {
        return makeResult(
          'ROM',
          `${histName} (Bugeac / Cetatea Albă și Ismail — Guvernământul Basarabiei)`,
          'Operazione München (luglio 1941): riconquista romena della Bessarabia meridionale (Bugeac: Cetatea Albă/Akkerman e Ismail) sul Mar Nero e alle foci del Danubio, reintegrata nel Regno di Romania sotto il Governatorato della Bessarabia.',
          'Asse',
          'Regatul României — Guvernământul Basarabiei (Județele Cetatea Albă și Ismail)'
        );
      }
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
      if (s >= 9) {
        return makeResult(
          'ROM',
          `${histName} (Guvernământul Bucovinei — Cernăuți și Hotin)`,
          'Operazione München (luglio 1941): la 3ª Armata romena libera Cernăuți (5 luglio 1941), Storojineț e Hotin, ristabilendo la sovranità del Regno di Romania attraverso il Governatorato della Bucovina (Guvernământul Bucovinei, Governatore Gen. Corneliu Calotescu).',
          'Asse',
          'Regatul României — Guvernământul Bucovinei (Cernăuți)'
        );
      }
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

    case 'GER':
    case 'DE': {
      return resolveGermanyProvince(ft, s);
    }

    case 'POL':
    case 'PL': {
      // Granular Kresy Powiats (Eastern Poland, 1921-1939)
      if (nid.startsWith('PL_KRESY_') || p.REGION_KIND === 'POLISH_EASTERN_POWIAT') {
        const histName = p.HISTORICAL_NAME || p.NUTS_NAME || rawName;
        const voiv = p.VOIVODESHIP || 'Kresy Wschodnie';
        const ssr = p.SOV_SSR || 'URSS';
        const modern = p.MODERN_ADMIN ? ` [Oggi: ${p.MODERN_ADMIN}]` : '';
        if (s < 5) {
          return makeResult(
            'POL',
            histName,
            `Territorio storico dei Kresy Wschodnie (Confine del Trattato di Riga del 1921). Amministrato sotto il Województwo ${voiv}, presidiato dal Corpo di Difesa della Frontiera (KOP).${modern}`,
            'Alleati',
            `Rzeczpospolita Polska — Województwo ${voiv}`
          );
        }
        if (s >= 9) {
          const nrmVoiv = normStr(voiv + ' ' + nid + ' ' + histName);
          // 1. Distretto di Galizia (Distrikt Galizien) annesso al Governatorato Generale il 1° agosto 1941 (Leopoli, Stanisławów, Tarnopol)
          if (
            nrmVoiv.includes('lwow') ||
            nrmVoiv.includes('stanislaw') ||
            nrmVoiv.includes('tarnopol') ||
            nrmVoiv.includes('drohobycz') ||
            nrmVoiv.includes('boryslav') ||
            nrmVoiv.includes('kolomy') ||
            nrmVoiv.includes('stryi') ||
            nrmVoiv.includes('sambor') ||
            nrmVoiv.includes('brody') ||
            nrmVoiv.includes('chortkiv') ||
            nrmVoiv.includes('czortkow')
          ) {
            return makeResult(
              'GER',
              `${histName} — Distrikt Galizien (Generalgouvernement, Lemberg)`,
              `Distretto di Galizia (Distrikt Galizien) — Occupato dal Gruppo d'Armate Sud tedesco alla fine di giugno 1941 (caduta di Leopoli/Lemberg il 30 giugno 1941). Il 1° agosto 1941 Hitler scorpora formalmente la Galizia orientale dall'Ucraina e la annette come quinto distretto al Governatorato Generale (Generalgouvernement di Hans Frank), sotto il Governatore Karl Lasch a Lemberg.${modern}`,
              'Asse',
              'Generalgouvernement — Distrikt Galizien (Gouverneur Karl Lasch / Generalgouverneur Hans Frank, Lemberg)'
            );
          }
          // 2. Bezirk Bialystok (Grodno, Wołkowysk, Białystok) aggregato alla Prussia Orientale nell'agosto 1941
          if (
            nrmVoiv.includes('bialostoc') ||
            nrmVoiv.includes('bialystok') ||
            nrmVoiv.includes('grodno') ||
            nrmVoiv.includes('wolkowysk') ||
            nrmVoiv.includes('lomza') ||
            nrmVoiv.includes('augustow') ||
            nrmVoiv.includes('bielsk')
          ) {
            return makeResult(
              'GER',
              `${histName} — Bezirk Bialystok (Zivilverwaltung Ostpreußen)`,
              `Bezirk Bialystok — Travolto nel giugno 1941 durante la battaglia delle sacche di Białystok-Minsk, il territorio (inclusi Grodno e Wołkowysk) viene posto il 17 luglio / 1° agosto 1941 sotto amministrazione civile tedesca speciale (Chef der Zivilverwaltung) affidata a Erich Koch, Gauleiter della Prussia Orientale, in preparazione dell'annessione diretta al Reich.${modern}`,
              'Asse',
              'Bezirk Bialystok — Chef der Zivilverwaltung Erich Koch (Gau Ostpreußen, Königsberg / Bialystok)'
            );
          }
          // 3. Volinia e Polesia meridionale (Brest-Litovsk, Pinsk, Kobryn, Lutsk, Rovno, Kovel, Dubno) -> Reichskommissariat Ukraine
          if (
            nrmVoiv.includes('wolyn') ||
            nrmVoiv.includes('volhyn') ||
            nrmVoiv.includes('poles') ||
            nrmVoiv.includes('rovno') ||
            nrmVoiv.includes('rowne') ||
            nrmVoiv.includes('lutsk') ||
            nrmVoiv.includes('luck') ||
            nrmVoiv.includes('kovel') ||
            nrmVoiv.includes('kowel') ||
            nrmVoiv.includes('dubno') ||
            nrmVoiv.includes('kremenets') ||
            nrmVoiv.includes('krzemieniec') ||
            nrmVoiv.includes('brest') ||
            nrmVoiv.includes('brzesc') ||
            nrmVoiv.includes('pinsk') ||
            nrmVoiv.includes('kobryn') ||
            nid.startsWith('PL_KRESY_UKR_')
          ) {
            return makeResult(
              'GER',
              `${histName} — Reichskommissariat Ukraine (Generalbezirk Wolhynien-Podolien, Rowno)`,
              `Reichskommissariat Ukraine — Occupato dalla Wehrmacht nel giugno-luglio 1941 e incorporato il 1° settembre 1941 nel Reichskommissariat Ukraine (capitale Rowno/Rovno) sotto il Reichskommissar Erich Koch e il Commissario Generale Heinrich Schoene (Generalbezirk Wolhynien-Podolien, comprendente anche Brest-Litovsk e Pinsk).${modern}`,
              'Asse',
              'Reichskommissariat Ukraine — Generalbezirk Wolhynien-Podolien (Reichskommissar Erich Koch, Rowno)'
            );
          }
          // 4. Wilno, Nowogródek, Baranowicze, Lida, Wilejka -> Reichskommissariat Ostland (Litauen / Weißruthenien)
          return makeResult(
            'GER',
            `${histName} — Reichskommissariat Ostland (Generalbezirk Weißruthenien / Litauen)`,
            `Reichskommissariat Ostland — Conquistato dal Gruppo d'Armate Centro nel giugno-luglio 1941 e inserito tra luglio e settembre 1941 nel Reichskommissariat Ostland (Reichskommissar Hinrich Lohse a Riga; Commissario Generale Wilhelm Kube a Minsk per il Generalbezirk Weißruthenien e Adrian von Renteln per il Generalbezirk Litauen).${modern}`,
            'Asse',
            'Reichskommissariat Ostland — Generalbezirk Weißruthenien / Litauen (Hinrich Lohse / Wilhelm Kube)'
          );
        }
        if (nid.startsWith('PL_KRESY_LTU_')) {
          if (s === 5) {
            return makeResult(
              'LIT',
              `${histName} (Vilniaus kraštas)`,
              'Trattato di mutua assistenza sovietico-lituano del 10 ottobre 1939: l\'URSS trasferisce Vilnius e il circondario alla Repubblica di Lituania in cambio dello stanziamento di 20.000 soldati dell\'Armata Rossa.',
              undefined,
              'Lietuvos Respublika — Vilniaus kraštas'
            );
          }
          return makeResult(
            'SOV',
            `${histName} — Lietuvos TSR`,
            'Occupazione e annessione della Lituania all\'Unione Sovietica (giugno-agosto 1940) come Repubblica Socialista Sovietica Lituana (Lietuvos TSR).',
            'Comintern',
            'SSSR — Lietuvos TSR'
          );
        }
        return makeResult(
          'SOV',
          `${histName} — ${ssr}`,
          `Invasione sovietica del 17 settembre 1939 ("Pugnalata alla schiena" in esecuzione del Patto Molotov-Ribbentrop); annessione forzata e incorporazione nella ${ssr}.${modern}`,
          'Comintern',
          `SSSR — ${ssr}`
        );
      }

      // Danzica (PL633 o DANZIG)
      if (nid === 'PL633' || nid === 'DANZIG' || nid === 'FREE_CITY_OF_DANZIG') {
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

      // Corridoio Polacco / Gdynia (PL_HIST_CORRIDOR)
      if (nid === 'PL_HIST_CORRIDOR' || rawName.includes('Polish Corridor') || nrm.includes('korytarz')) {
        if (s < 5) {
          const top = resolvePolandToponym(nid, rawName, nrm, 'POL', s);
          return makeResult(
            'POL',
            top?.name || 'Województwo Pomorskie (Gdynia / Hel)',
            top?.note || 'Corridoio Polacco (Polski Korytarz) — Accesso sovrano della Polonia al Mar Baltico con il porto strategico di Gdynia e la penisola di Hel.',
            'Alleati',
            top?.adminTitle || 'Rzeczpospolita Polska — Województwo Pomorskie (Gdynia, Puck, Hel)'
          );
        } else {
          const top = resolvePolandToponym(nid, rawName, nrm, 'GER', s);
          return makeResult(
            'GER',
            top?.name || 'Gotenhafen (Reichsgau Danzig-Westpreußen)',
            top?.note || 'Occupazione e annessione tedesca della costa polacca; ribattezzata Gotenhafen e incorporata nel Reichsgau Danzig-Westpreußen.',
            'Asse',
            top?.adminTitle || 'Deutsches Reich — Reichsgau Danzig-Westpreußen (Gotenhafen / Gdynia)'
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
      // 1. Territori annessi all'URSS nel 1939-41 e trasformati nel Bezirk Bialystok nell'agosto 1941 (Białystok PL841, Łomża PL842)
      if (nid === 'PL841' || nid === 'PL842') {
        if (s >= 9) {
          return makeResult(
            'GER',
            nid === 'PL841'
              ? 'Bialystok (Bezirk Bialystok — Zivilverwaltung Ostpreußen)'
              : 'Lomscha / Łomża (Bezirk Bialystok — Zivilverwaltung Ostpreußen)',
            'Bezirk Bialystok — Occupato dalla Wehrmacht alla fine di giugno 1941 durante la battaglia di accerchiamento di Białystok-Minsk. Nell\'agosto 1941 Hitler istituisce il Bezirk Bialystok sotto amministrazione civile tedesca speciale (Chef der Zivilverwaltung) aggregata alla Prussia Orientale sotto il Gauleiter Erich Koch.',
            'Asse',
            'Bezirk Bialystok — Chef der Zivilverwaltung Erich Koch (Aggregato alla Prussia Orientale)'
          );
        }
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

    case 'AUS':
    case 'AUT':
    case 'AT': {
      if (s < 1) {
        const topAus = resolveSwissAustrianToponym(nid, rawName, nrm, 'AUS', s) || getTop('AUS');
        return makeResult(
          'AUS',
          topAus.name || rawName,
          topAus.note || 'Republik Österreich vor dem Anschluss (Bundesstaat Österreich / Ständestaat).',
          'Neutrale',
          topAus.adminTitle || 'Bundesstaat Österreich (Ständestaat)'
        );
      }
      const topGer = resolveSwissAustrianToponym(nid, rawName, nrm, 'GER', s) || getTop('GER');
      return makeResult(
        'GER',
        topGer.name || rawName,
        topGer.note || 'Alpen- und Donau-Reichsgaue (Ostmark) nach dem Anschluss vom März 1938.',
        'Asse',
        topGer.adminTitle || 'Alpen- und Donau-Reichsgaue (Ostmark — Großdeutsches Reich)'
      );
    }

    case 'CZE':
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

    case 'HUN':
    case 'HU': {
      const bTop = resolveBalkansToponym(nid, rawName, nrm, 'HUN', s);
      const top = bTop || getTop('HUN');
      return makeResult(
        'HUN',
        top.name,
        s >= 8
          ? `${bTop?.note || 'Magyar Királyság (Horthy Miklós)'} — L'11 aprile 1941 la 3ª Armata ungherese (Gen. Elemér Gorondy-Novák) partecipa all'invasione della Jugoslavia dopo il suicidio del Primo Ministro Pál Teleki, occupando la Bácska, il triangolo di Baranya, il Muraköz e il Muravidék (Délvidék).`
          : bTop?.note || 'Magyar Királyság (Horthy Miklós)',
        s >= 7 ? 'Asse' : undefined,
        bTop?.adminTitle || 'Magyar Királyság'
      );
    }

    case 'ROM':
    case 'ROU':
    case 'RO': {
      const bTop = resolveBalkansToponym(nid, rawName, nrm, 'ROM', s);
      const roOwner = bTop?.owner || 'ROM';
      const top = bTop || getTop(roOwner);
      if (roOwner === 'HUN') {
        return makeResult(
          'HUN',
          top.name,
          bTop?.note || 'Észak-Erdély — Magyar Királyság (Secondo Arbitrato di Vienna, 30 agosto 1940)',
          'Asse',
          bTop?.adminTitle || 'Magyar Királyság — Észak-Erdély'
        );
      }
      if (s >= 7) {
        return makeResult(
          'ROM',
          top.name,
          (bTop?.note ? `${bTop.note} — ` : '') +
            'Stato Nazionale Legionario (abdicazione di Carlo II il 6 settembre 1940; governo del Conducător Gen. Ion Antonescu e Guardia di Ferro; ingresso della Missione Militare Tedesca il 12 ottobre 1940 a presidio dei campi petroliferi).',
          'Asse',
          'Statul Național-Legionar (Regatul României — Conducător Ion Antonescu)'
        );
      }
      return makeResult(
        'ROM',
        top.name,
        bTop?.note || 'Regatul României',
        'Neutrale',
        bTop?.adminTitle || 'Regatul României'
      );
    }

    case 'MD': {
      if (s >= 9) {
        return makeResult(
          'ROM',
          getTop('ROM').name || 'Basarabia (Guvernământul Basarabiei — Regatul României)',
          'Riconquista romena della Bessarabia (Operazione München, luglio 1941) e ricostituzione del Governatorato della Bessarabia sotto il Maresciallo Ion Antonescu.',
          'Asse',
          'Regatul României — Guvernământul Basarabiei (Chișinău)'
        );
      }
      return s < 6
        ? makeResult('ROM', getTop('ROM').name, 'Basarabia (Regatul României)')
        : makeResult('SOV', getTop('SOV').name, 'Prisoyedineniye k SSSR (1940)');
    }

    case 'BUL':
    case 'BGR':
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
          const bTop = resolveBalkansToponym(nid, rawName, nrm, 'ROM', s);
          return makeResult(
            'ROM',
            bTop?.name || (isSilistra ? 'Județul Durostor (Silistra / Cadrilater)' : 'Județul Caliacra (Bazargic-Dobrich / Balcic)'),
            bTop?.note || 'Regatul României — Cadrilater (1913-1940)',
            'Neutrale',
            bTop?.adminTitle || 'Regatul României — Județul Durostor / Caliacra'
          );
        }
      }
      const bTop = resolveBalkansToponym(nid, rawName, nrm, 'BUL', s);
      const top = bTop || getTop('BUL');
      return makeResult(
        'BUL',
        top.name,
        s >= 8
          ? `${bTop?.note || 'Tsarstvo Balgariya (Tsar Boris III)'} — Adesione al Patto Tripartito (1° marzo 1941), ingresso della 12ª Armata tedesca (Generalfeldmarschall Wilhelm List) e annessione di fatto della Macedonia del Vardar, di Pirot e della Tracia Occidentale greca (Belomorie) nell'aprile 1941.`
          : bTop?.note || 'Tsarstvo Balgariya (Tsar Boris III)',
        s >= 8 ? 'Asse' : undefined,
        bTop?.adminTitle || 'Tsarstvo Balgariya'
      );
    }

    case 'LIT':
    case 'LTU':
    case 'LT':
      return resolveLithuanianProvince(s, nid, p, rawName);

    case 'LAT':
    case 'LVA':
    case 'LV':
      return resolveLatvianProvince(s, nid, p, rawName);

    case 'EST':
    case 'EE':
      return resolveEstonianProvince(s, nid, p, rawName);

    case 'FIN':
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
      if (nid === 'FI1B1' && s >= 6 && s < 9) {
        return makeResult(
          'FIN',
          getTop('FIN').name + ' (Hangon vuokra-alue)',
          'Suomen tasavalta — Hangon vuokra-alue Neuvostoliitolle (Moskovan rauha 1940)'
        );
      }
      if (s >= 9) {
        return makeResult(
          'FIN',
          getTop('FIN').name,
          nid === 'FI1B1'
            ? 'Suomen tasavalta — Jatkosota: riconquista finlandese della base navale di Hanko (evacuata dalla Flotta sovietica del Baltico il 2-4 dicembre 1941).'
            : 'Suomen tasavalta — Jatkosota (Guerra di Continuazione: cobelligeranza con l\'Asse, riconquista della Carelia e occupazione della Carelia Orientale sovietica).',
          'Asse',
          'Suomen tasavalta — Päämaja (Sotamarsalkka C.G.E. Mannerheim)'
        );
      }
      return makeResult('FIN', getTop('FIN').name, 'Suomen tasavalta');
    }

    case 'ES':
    case 'ESP':
    case '724':
    case 'XES':
    case 'ES_RIF': {
      // Risoluzione esaustiva delle 63 province e territori storici della Spagna (1936-1941)
      const esProv = resolveSpainProvince(nid || ft.id || rawName, s, rawName);
      if (esProv) {
        return esProv;
      }

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

    case 'RU': {
      const top = getTop('SOV');
      return makeResult(
        'SOV',
        top?.name || rawName,
        top?.note || 'Rossiyskaya SFSR — Soyuz Sovetskikh Sotsialisticheskikh Respublik',
        'Comintern',
        top?.adminTitle || 'RSFSR (SSSR)'
      );
    }

    case 'BY':
    case 'UA':
    case 'GE':
    case 'AM':
    case 'AZ':
    case 'KZ':
    case 'UZ':
    case 'TM':
    case 'TJ':
    case 'KG': {
      const top = getTop('SOV');
      return makeResult(
        'SOV',
        top?.name || ITNAMES[cntr] || rawName || 'SSSR',
        top?.note || 'Sovetskaya Sotsialisticheskaya Respublika',
        'Comintern',
        top?.adminTitle || 'Soyuz Sovetskikh Sotsialisticheskikh Respublik'
      );
    }

    case 'MON':
    case 'MN':
      return makeResult('MON', 'Bügd Nairamdakh Mongol Ard Uls (Ulaanbaatar)', 'Mongol Ard Uls (Komintern)', 'Comintern');

    case 'IT':
    case 'ITA': {
      // Risoluzione esaustiva delle 107 province del Regno d'Italia e possedimenti speciali
      const itProv = resolveItalyProvince(nid || ft.id || rawName, s, rawName);
      if (itProv) {
        return itProv;
      }

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

      // Step >= 8 (Aprile 1941): Smembramento della Jugoslavia, nascita dello Stato Indipendente di Croazia (NDH) e annessioni italiane/ungheresi
      if (s >= 8) {
        // 2a. Međimurje / Muraköz (HR061: Čakovec) -> Annessione ungherese (11-16 aprile 1941)
        if (nid === 'HR061' || nrm.includes('medimur') || nrm.includes('cakovec') || nrm.includes('murakoz')) {
          return makeResult(
            'HUN',
            'Muraközi járás — Zala vármegye (Čakovec / Csáktornya)',
            'Smembramento della Jugoslavia (aprile 1941): la regione transdravana del Međimurje (Muraköz) con capoluogo Čakovec (Csáktornya) viene occupata dall\'esercito ungherese e incorporata nel comitato di Zala del Regno d\'Ungheria.',
            'Asse',
            'Magyar Királyság — Zala vármegye (Muraköz)'
          );
        }

        // 2b. Litorale Croato / Sušak e Veglia (HR031) -> Annessione italiana alla Provincia del Carnaro (Fiume)
        if (nid === 'HR031' || nrm.includes('primorsko') || nrm.includes('rijeka') || nrm.includes('fiume') || nrm.includes('susak')) {
          return makeResult(
            'ITA',
            'Provincia del Carnaro — Fiume, Sušak, Castua, Cabar e Veglia',
            'Trattati di Roma (aprile-maggio 1941): la 2ª Armata italiana (Gen. Vittorio Ambrosio) occupa Sušak, Castua, Čabar, Buccari e l\'isola di Veglia (Krk), annessi al Regno d\'Italia nella Provincia del Carnaro.',
            'Asse',
            'Regno d\'Italia — Provincia del Carnaro (Fiume e Sušak)'
          );
        }

        // 2c. Dalmazia annessa al Regno d'Italia (HR033 Zara/Benkovac, HR034 Sebenico/Šibenik, HR035 Spalato/Split) -> Governatorato della Dalmazia
        if (
          nid === 'HR033' ||
          nid === 'HR034' ||
          nid === 'HR035' ||
          nrm.includes('zadar') ||
          nrm.includes('zara') ||
          nrm.includes('sibenik') ||
          nrm.includes('sebenico') ||
          nrm.includes('split') ||
          nrm.includes('spalato') ||
          nrm.includes('dalmat')
        ) {
          const dalmTitle =
            nid === 'HR033' || nrm.includes('zadar') || nrm.includes('zara')
              ? 'Governatorato della Dalmazia — Provincia di Zara (Zara, Benkovac, Biograd, Arbe)'
              : nid === 'HR034' || nrm.includes('sibenik') || nrm.includes('sebenico')
              ? 'Governatorato della Dalmazia — Provincia di Zara / Sebenico (Sebenico, Tenin/Knin, Scardona)'
              : 'Governatorato della Dalmazia — Provincia di Spalato (Spalato, Traù, Salona, Curzola)';
          return makeResult(
            'ITA',
            dalmTitle,
            'Trattati di Roma (aprile-maggio 1941): annessione della Dalmazia costiera e insulare al Regno d\'Italia e istituzione del Governatorato della Dalmazia (Governatore Giuseppe Bastianini, con le Province di Zara, Spalato e Cattaro).',
            'Asse',
            'Regno d\'Italia — Governatorato della Dalmazia (Zara / Spalato)'
          );
        }

        // 2d. Stato Indipendente di Croazia (Nezavisna Država Hrvatska — NDH: Zagabria, Slavonia, Croazia centrale, Lika/Gospić HR032, Ragusa/Dubrovnik HR037)
        const bTop = resolveBalkansToponym(nid, rawName, nrm, 'CRO', s);
        return makeResult(
          'CRO',
          bTop?.name || `${rawName || 'Hrvatska'} (Nezavisna Država Hrvatska — NDH)`,
          bTop?.note || 'Proclamazione dello Stato Indipendente di Croazia (Nezavisna Država Hrvatska — NDH) a Zagabria il 10 aprile 1941 da parte di Slavko Kvaternik con l\'ingresso delle truppe tedesche; il 15 aprile il Poglavnik Ante Pavelić rientra dall\'Italia e instaura la dittatura totalitaria degli Ustaše.',
          'Fantoccio',
          bTop?.adminTitle || 'Nezavisna Država Hrvatska (NDH — Poglavnik Ante Pavelić)'
        );
      }

      // 2. Primorsko-goranska (Litorale Croato e Gorski Kotar -> Jugoslavia; Fiume, Cherso e Lussino erano enclave/isole italiane)
      if (nid === 'HR031' || nrm.includes('primorsko') || nrm.includes('rijeka') || nrm.includes('fiume')) {
        const bTop = resolveBalkansToponym(nid, rawName, nrm, 'YUG', s);
        return makeResult(
          'YUG',
          bTop?.name || (s >= 4 ? 'Litorale Croato e Gorski Kotar (Banovina Hrvatska)' : 'Litorale Croato e Gorski Kotar (Savska Banovina)'),
          bTop?.note || 'Regno di Jugoslavia — Comprensorio di Delnice, Čabar, Vinodol e Veglia (la città di Fiume e le isole di Cherso e Lussino costituivano la Provincia italiana del Carnaro)',
          undefined,
          bTop?.adminTitle || (s >= 4 ? 'Kraljevina Jugoslavija — Banovina Hrvatska' : 'Kraljevina Jugoslavija — Savska Banovina')
        );
      }

      // 3. Zadarska (Dalmazia Settentrionale -> Jugoslavia; la città di Zara con Lagosta e Pelagosa era enclave italiana)
      if (nid === 'HR033' || nrm.includes('zadar') || nrm.includes('zara')) {
        const bTop = resolveBalkansToponym(nid, rawName, nrm, 'YUG', s);
        return makeResult(
          'YUG',
          bTop?.name || (s >= 4 ? 'Dalmazia Settentrionale (Banovina Hrvatska)' : 'Dalmazia Settentrionale (Primorska Banovina)'),
          bTop?.note || 'Regno di Jugoslavia — Entroterra zaratino, Benkovac e Ravni Kotari (il comune di Zara e le isole di Lagosta e Pelagosa costituivano la Provincia italiana di Zara)',
          undefined,
          bTop?.adminTitle || (s >= 4 ? 'Kraljevina Jugoslavija — Banovina Hrvatska' : 'Kraljevina Jugoslavija — Primorska Banovina')
        );
      }

      // 4. Resto della Croazia (Regno di Jugoslavia: Savska/Primorska Banovina -> Banovina Hrvatska da agosto 1939)
      const bTop = resolveBalkansToponym(nid, rawName, nrm, 'YUG', s);
      const yTop = bTop || getTop('YUG');
      return makeResult(
        'YUG',
        yTop.name || ((rawName || '') + (s >= 4 ? ' (Banovina Hrvatska)' : ' (Jugoslavia)')),
        bTop?.note || (s >= 4
          ? 'Regno di Jugoslavia — Banovina Hrvatska autonoma (Accordo Cvetković-Maček, 26 ago 1939)'
          : 'Regno di Jugoslavia (Savska / Primorska Banovina)'),
        undefined,
        bTop?.adminTitle || (s >= 4 ? 'Kraljevina Jugoslavija — Banovina Hrvatska' : 'Kraljevina Jugoslavija — Savska / Primorska Banovina')
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

      // Step >= 8 (Aprile 1941): Tripartizione della Slovenia tra Italia (Provincia di Lubiana), Germania (Untersteiermark / Oberkrain) e Ungheria (Prekmurje)
      if (s >= 8) {
        // 3a. Prekmurje / Pomurska (SI031: Murska Sobota / Lendava) -> Ungheria (Muravidék)
        if (nid === 'SI031' || nrm.includes('pomursk') || nrm.includes('murska') || nrm.includes('prekmur')) {
          return makeResult(
            'HUN',
            'Muravidék — Vas és Zala vármegye (Muraszombat / Murska Sobota)',
            'Smembramento della Jugoslavia (aprile 1941): l\'Oltremura (Prekmurje / Muravidék) con capoluogo Murska Sobota (Muraszombat) e Lendava (Alsólendva) viene occupata il 16 aprile 1941 dall\'esercito ungherese e riannessa al Regno d\'Ungheria.',
            'Asse',
            'Magyar Királyság — Muravidék (Muraszombat)'
          );
        }

        // 3b. Provincia Italiana di Lubiana (SI041 Osrednjeslovenska/Ljubljana, SI037 Jugovzhodna/Novo Mesto/Dolenjska, SI038 Primorsko-notranjska/Kočevje)
        if (
          nid === 'SI041' ||
          nid === 'SI037' ||
          nid === 'SI038' ||
          nrm.includes('ljubljan') ||
          nrm.includes('lubiana') ||
          nrm.includes('osrednje') ||
          nrm.includes('jugovzhod') ||
          nrm.includes('dolenjsk') ||
          nrm.includes('notranjsk') ||
          nrm.includes('novo mesto') ||
          nrm.includes('postojn')
        ) {
          return makeResult(
            'ITA',
            nid === 'SI041' || nrm.includes('ljubljan') || nrm.includes('osrednje')
              ? 'Provincia di Lubiana (Lubiana / Ljubljana)'
              : nid === 'SI037' || nrm.includes('jugovzhod') || nrm.includes('novo mesto')
              ? 'Provincia di Lubiana — Bassa Carniola e Bela Krajina (Novo Mesto / Kočevje)'
              : 'Provincia di Lubiana e Confine Orientale (Notranjska / Longatico)',
            'Smembramento della Jugoslavia (11 aprile - 3 maggio 1941): l\'11 aprile 1941 la 2ª Armata italiana entra a Lubiana; con il Regio Decreto-Legge 3 maggio 1941 n. 291 la Carniola centrale e meridionale viene annessa al Regno d\'Italia come Provincia autonoma di Lubiana (Alto Commissario Emilio Grazioli).',
            'Asse',
            'Regno d\'Italia — Alto Commissariato per la Provincia di Lubiana'
          );
        }

        // 3c. Stiria Inferiore e Alta Carniola (SI032 Podravska/Maribor, SI033 Koroška, SI034 Savinjska/Celje, SI035 Zasavska, SI036 Posavska, SI042 Gorenjska/Kranj) -> Germania
        const isGorenjska = nid === 'SI042' || nrm.includes('gorenjsk') || nrm.includes('kranj') || nrm.includes('bled');
        return makeResult(
          'GER',
          isGorenjska
            ? 'CdZ-Gebiet Kärnten und Krain — Oberkrain (Kranj / Krainburg)'
            : `CdZ-Gebiet Untersteiermark (${rawName || 'Marburg an der Drau / Cilli'})`,
          'Smembramento della Jugoslavia (aprile 1941): la Stiria Inferiore (Untersteiermark: Maribor/Marburg, Celje/Cilli, Ptuj/Pettau) e l\'Alta Carniola (Oberkrain: Kranj/Krainburg, Bled/Veldes) vengono poste sotto amministrazione civile tedesca (Chefs der Zivilverwaltung Siegfried Uiberreither e Friedrich Rainer) in vista dell\'annessione al Grande Reich.',
          'Asse',
          isGorenjska
            ? 'Großdeutsches Reich — CdZ-Gebiet Kärnten und Krain (Gauleiter Friedrich Rainer)'
            : 'Großdeutsches Reich — CdZ-Gebiet Untersteiermark (Gauleiter Siegfried Uiberreither)'
        );
      }

      // 3. Primorsko-notranjska (Carniola Interna / Notranjska -> Jugoslavia con confine di frontiera a Postumia)
      if (nid === 'SI038' || nrm.includes('notranjska') || nrm.includes('postojna') || nrm.includes('postumia')) {
        const bTop = resolveBalkansToponym(nid, rawName, nrm, 'YUG', s);
        return makeResult(
          'YUG',
          bTop?.name || 'Carniola Interna e Notranjska (Dravska Banovina)',
          bTop?.note || 'Regno di Jugoslavia — Dravska Banovina (la fascia confinaria con le Grotte di Postumia, San Pietro del Carso e Villa del Nevoso era presidiata dal Regno d\'Italia)',
          undefined,
          bTop?.adminTitle || 'Kraljevina Jugoslavija — Dravska Banovina'
        );
      }

      // 4. Resto della Slovenia (Dravska Banovina - Lubiana, Maribor, Celje, Kranj)
      const bTop = resolveBalkansToponym(nid, rawName, nrm, 'YUG', s);
      const yTop = bTop || getTop('YUG');
      return makeResult(
        'YUG',
        yTop.name || ((rawName || '') + ' (Dravska Banovina)'),
        bTop?.note || 'Regno di Jugoslavia — Dravska Banovina (Capoluogo Lubiana / Ljubljana)',
        undefined,
        bTop?.adminTitle || 'Kraljevina Jugoslavija — Dravska Banovina'
      );
    }

    case 'BA':
    case 'BIH':
    case 'BOS': {
      if (s >= 8) {
        const bTop = resolveBalkansToponym(nid, rawName, nrm, 'CRO', s);
        return makeResult(
          'CRO',
          bTop?.name || 'Bosna i Hercegovina (Nezavisna Država Hrvatska — NDH: Sarajevo, Banja Luka, Mostar)',
          bTop?.note || 'Smembramento della Jugoslavia (aprile 1941): l\'intera Bosnia ed Erzegovina fino al fiume Drina viene incorporata nello Stato Indipendente di Croazia (NDH) di Ante Pavelić e suddivisa in Grandi Župe (Vrhbosna/Sarajevo, Sana i Luka/Banja Luka, Hum/Mostar) lungo la linea di demarcazione italo-tedesca di Vienna.',
          'Fantoccio',
          bTop?.adminTitle || 'Nezavisna Država Hrvatska (NDH — Velike župe u Bosni i Hercegovini)'
        );
      }
      const bTop = resolveBalkansToponym(nid, rawName, nrm, 'YUG', s);
      if (bTop) {
        return makeResult('YUG', bTop.name, bTop.note, undefined, bTop.adminTitle);
      }
      if (nid === 'BABIH' || nrm.includes('federac')) {
        return makeResult(
          'YUG',
          s >= 4
            ? 'Bosnia ed Erzegovina Centrale e Occidentale (Sarajevo / Banovina Hrvatska)'
            : 'Bosnia ed Erzegovina Centrale e Occidentale (Sarajevo / Drinska Banovina)',
          s >= 4
            ? 'Regno di Jugoslavia — Comprensorio di Sarajevo e Mostar (Banovina Hrvatska autonoma e Drinska Banovina)'
            : 'Regno di Jugoslavia (Banovina della Drina e Primorska Banovina)',
          undefined,
          s >= 4 ? 'Kraljevina Jugoslavija — Banovina Hrvatska / Drinska Banovina' : 'Kraljevina Jugoslavija — Drinska Banovina'
        );
      }
      if (nid === 'BASRP' || nrm.includes('srpska')) {
        return makeResult(
          'YUG',
          'Repubblica Serba di Bosnia (Banja Luka e Trebinje)',
          'Regno di Jugoslavia — Vrbaska Banovina (Banja Luka) e Zetska Banovina (Trebinje)',
          undefined,
          'Kraljevina Jugoslavija — Vrbaska i Zetska Banovina'
        );
      }
      if (nid === 'BABRC' || nrm.includes('brcko')) {
        return makeResult(
          'YUG',
          'Distretto di Brčko (Posavina)',
          'Regno di Jugoslavia — Corridoio strategico fluviale della Posavina (Brčko)',
          undefined,
          'Kraljevina Jugoslavija — Posavina'
        );
      }
      const yTop = getTop('YUG');
      return makeResult('YUG', yTop.name || rawName, 'Regno di Jugoslavia (Drinska / Vrbaska / Primorska Banovina)');
    }

    case 'RS':
    case 'SRB': {
      if (s >= 8) {
        // 1. Sirmia / Srem (RS127: Sremska Mitrovica, Zemun, Ruma) -> NDH (Croazia)
        if (nid === 'RS127' || nrm.includes('srem') || nrm.includes('syrmi') || nrm.includes('zemun')) {
          return makeResult(
            'CRO',
            'Velika župa Vuka — Srijem (Vukovar / Sremska Mitrovica / Zemun — NDH)',
            'Smembramento della Jugoslavia (aprile 1941): l\'intera Sirmia orientale (Srijem/Syrmien) fino a Zemun (Semlin), alle porte di Belgrado alla confluenza tra Sava e Danubio, viene incorporata nello Stato Indipendente di Croazia (NDH).',
            'Fantoccio',
            'Nezavisna Država Hrvatska (NDH — Velika župa Vuka)'
          );
        }

        // 2. Bačka / Bácska (RS121 Zapadnobačka/Sombor, RS123 Južnobačka/Novi Sad/Újvidék, RS125 Severnobačka/Subotica/Szabadka) -> Ungheria
        if (
          nid === 'RS121' ||
          nid === 'RS123' ||
          nid === 'RS125' ||
          nrm.includes('backa') ||
          nrm.includes('novi sad') ||
          nrm.includes('subotic') ||
          nrm.includes('sombor')
        ) {
          return makeResult(
            'HUN',
            nid === 'RS125' || nrm.includes('subotic')
              ? 'Bács-Bodrog vármegye — Szabadka (Subotica / Bácska)'
              : nid === 'RS121' || nrm.includes('sombor')
              ? 'Bács-Bodrog vármegye — Zombor (Sombor / Bácska)'
              : 'Bács-Bodrog vármegye — Újvidék (Novi Sad / Délvidék)',
            'Smembramento della Jugoslavia (11 aprile 1941): la 3ª Armata ungherese occupa la Bačka (Bácska: Újvidék/Novi Sad, Szabadka/Subotica, Zombor/Sombor) tra il Danubio e il Tibisco, reintegrandola nel Regno d\'Ungheria.',
            'Asse',
            'Magyar Királyság — Bács-Bodrog vármegye (Délvidék)'
          );
        }

        // 3. Pirot e Vranje / Pomoravlje meridionale (RS226 Pirotska, RS228 Pčinjska/Bosilegrad/Surdulica) -> Bulgaria
        if (
          nid === 'RS226' ||
          nid === 'RS228' ||
          nrm.includes('pirot') ||
          nrm.includes('pcinj') ||
          nrm.includes('vranje') ||
          nrm.includes('bosilegrad')
        ) {
          return makeResult(
            'BUL',
            nid === 'RS226' || nrm.includes('pirot')
              ? 'Pirotska околия (Pirot / Caribrod — Tsarstvo Balgariya)'
              : 'Vranya i Bosilegrad (Pčinjska — Tsarstvo Balgariya)',
            'Smembramento della Jugoslavia (aprile 1941): i distretti orientali di Pirot, Caribrod (Dimitrovgrad), Bosilegrad, Vranje e Surdulica vengono occupati e annessi di fatto dal Regno di Bulgaria.',
            'Asse',
            'Tsarstvo Balgariya — Sofiyska / Skopska oblast'
          );
        }

        // 4. Banato (RS122 Srednjobanatska/Zrenjanin, RS124 Južnobanatska/Pančevo, RS126 Severnobanatska/Kikinda) -> Amministrazione Militare Tedesca in Serbia (Autonomia Volksdeutsche)
        if (nid === 'RS122' || nid === 'RS124' || nid === 'RS126' || nrm.includes('banat') || nrm.includes('pancevo') || nrm.includes('zrenjanin') || nrm.includes('kikinda')) {
          return makeResult(
            'GER',
            `Banat (${rawName || 'Großbetschkerek / Pantschowa'} — Deutsche Volksgruppe)`,
            'Smembramento della Jugoslavia (aprile 1941): il Banato serbo resta formalmente sotto il Comandante Militare Tedesco in Serbia ma è governato in regime di piena autonomia dalla minoranza tedesca locale (Volksdeutsche sotto Sepp Janko).',
            'Asse',
            'Gebiet des Militärbefehlshabers in Serbien — Autonomer Banat'
          );
        }

        // 5. Serbia Centrale e Belgrado (RS110 Beograd, RS211..RS218, RS221..RS225, RS227, RS229) -> Occupazione Militare Tedesca in Serbia
        return makeResult(
          'GER',
          nid === 'RS110' || nrm.includes('beograd') || nrm.includes('belgrad')
            ? 'Beograd (Gebiet des Militärbefehlshabers in Serbien)'
            : `${rawName || 'Serbien'} (Gebiet des Militärbefehlshabers in Serbien)`,
          'Operazione 25 e capitolazione jugoslava (6-17 aprile 1941): dopo il bombardamento di Belgrado (Operazione Castigo) e l\'ingresso della 2ª Armata e del 1° Gruppo Corazzato di Kleist il 12 aprile, la Serbia centrale è posta sotto amministrazione militare diretta della Wehrmacht (Gen. Helmuth Förster / Milan Aćimović).',
          'Asse',
          'Wehrmacht — Gebiet des Militärbefehlshabers in Serbien (Belgrad)'
        );
      }

      const bTop = resolveBalkansToponym(nid, rawName, nrm, 'YUG', s);
      const yTop = bTop || getTop('YUG');
      return makeResult(
        'YUG',
        yTop.name || rawName,
        bTop?.note || 'Regno di Jugoslavia (Dunavska / Moravska / Drinska Banovina / Beograd)',
        undefined,
        bTop?.adminTitle || 'Kraljevina Jugoslavija'
      );
    }

    case 'ME':
    case 'MNE': {
      if (s >= 8) {
        return makeResult(
          'ITA',
          'Governatorato del Montenegro e Provincia di Cattaro (Cettigne / Podgorica / Kotor)',
          'Smembramento della Jugoslavia (aprile 1941): il 17 aprile le truppe italiane occupano Cettigne e le Bocche di Cattaro; queste ultime vengono annesse direttamente al Regno d\'Italia come Provincia di Cattaro (Governatorato della Dalmazia), mentre il Montenegro interno diviene protettorato italiano (Alto Commissario Serafino Mazzolini).',
          'Asse',
          'Regno d\'Italia — Governatorato del Montenegro e Provincia di Cattaro'
        );
      }
      const bTop = resolveBalkansToponym(nid, rawName, nrm, 'YUG', s);
      const yTop = bTop || getTop('YUG');
      return makeResult(
        'YUG',
        yTop.name || rawName,
        bTop?.note || 'Regno di Jugoslavia — Zetska Banovina (Cettigne)',
        undefined,
        bTop?.adminTitle || 'Kraljevina Jugoslavija — Zetska Banovina'
      );
    }

    case 'MK':
    case 'MKD': {
      if (s >= 8) {
        // 1. Macedonia occidentale albanofona (MK006 Pološki: Tetovo/Gostivar; MK003 Jugozapaden: Debar/Struga/Kičevo) -> Grande Albania (Italia)
        if (
          nid === 'MK006' ||
          nid === 'MK003' ||
          nrm.includes('poloski') ||
          nrm.includes('jugozapad') ||
          nrm.includes('tetov') ||
          nrm.includes('gostivar') ||
          nrm.includes('debar') ||
          nrm.includes('struga') ||
          nrm.includes('kicev')
        ) {
          return makeResult(
            'ITA',
            nid === 'MK006' || nrm.includes('poloski') || nrm.includes('tetov')
              ? 'Prefettura di Tetovo e Gostivar — Grande Albania (Unione Personale con l\'Italia)'
              : 'Prefettura di Dibra e Struga (Debar) — Grande Albania (Unione Personale con l\'Italia)',
            'Smembramento della Jugoslavia (aprile 1941): i distretti occidentali macedoni a maggioranza albanese di Tetovo, Gostivar, Debar (Dibra), Kičevo e Struga vengono annessi al Regno d\'Albania sotto la Corona d\'Italia.',
            'Asse',
            'Regno d\'Italia — Regno d\'Albania (Grande Albania)'
          );
        }

        // 2. Resto della Macedonia del Vardar (MK008 Skopje, MK001 Veles, MK002 Štip, MK004 Strumica, MK005 Bitola, MK007 Kumanovo) -> Bulgaria
        return makeResult(
          'BUL',
          nid === 'MK008' || nrm.includes('skop')
            ? 'Skopska oblast (Skopie — Tsarstvo Balgariya)'
            : nid === 'MK005' || nrm.includes('bitol') || nrm.includes('pelagon')
            ? 'Bitolska oblast (Bitolya / Monastir — Tsarstvo Balgariya)'
            : `${rawName || 'Vardarska Makedoniya'} (Skopska / Bitolska oblast — Tsarstvo Balgariya)`,
          'Smembramento della Jugoslavia (19 aprile 1941): dopo la conquista da parte della 12ª Armata tedesca, la 5ª Armata bulgara entra in Macedonia del Vardar (Skopje, Bitola, Veles, Štip, Kumanovo, Strumica), annessa di fatto al Regno di Bulgaria.',
          'Asse',
          'Tsarstvo Balgariya — Skopska i Bitolska oblast'
        );
      }
      const bTop = resolveBalkansToponym(nid, rawName, nrm, 'YUG', s);
      const yTop = bTop || getTop('YUG');
      return makeResult(
        'YUG',
        yTop.name || rawName,
        bTop?.note || 'Regno di Jugoslavia — Vardarska Banovina (Skopje)',
        undefined,
        bTop?.adminTitle || 'Kraljevina Jugoslavija — Vardarska Banovina'
      );
    }

    case 'XK':
    case 'XKX':
    case 'KO':
    case 'KV':
    case 'KOS':
    case 'YU':
    case 'YUG': {
      if (s >= 8) {
        if (cntr === 'YU' || cntr === 'YUG') {
          return makeResult(
            'GER',
            'Gebiet des Militärbefehlshabers in Serbien (Belgrad)',
            'Operazione 25 (6-17 aprile 1941): capitolazione incondizionata del Regno di Jugoslavia e smembramento tra Germania, Italia, Ungheria, Bulgaria e Stato Indipendente di Croazia (NDH).',
            'Asse',
            'Wehrmacht — Militärbefehlshaber in Serbien'
          );
        }
        return makeResult(
          'ITA',
          'Kosovo e Metohija (Pristina / Prizren / Peć — Grande Albania)',
          'Smembramento della Jugoslavia (aprile 1941): la maggior parte del Kosovo e della Metohija (Prizren, Peć/Peja, Đakovica/Gjakova, Pristina) viene annessa alla Grande Albania sotto la Corona d\'Italia (mentre il bacino minerario di Trepča/Kosovska Mitrovica resta sotto controllo tedesco).',
          'Asse',
          'Regno d\'Italia — Regno d\'Albania (Prefetture di Pristina, Prizren e Peja)'
        );
      }
      const bTop = resolveBalkansToponym(nid, rawName, nrm, 'YUG', s);
      const yTop = bTop || getTop('YUG');
      return makeResult(
        'YUG',
        yTop.name || ITNAMES[cntr] || rawName,
        bTop?.note || 'Regno di Jugoslavia',
        undefined,
        bTop?.adminTitle || 'Kraljevina Jugoslavija'
      );
    }

    case 'ALB':
    case 'AL': {
      const bTop = resolveBalkansToponym(nid, rawName, nrm, s < 4 ? 'ALB' : 'ITA', s);
      if (s < 4) {
        return makeResult(
          'ALB',
          bTop?.name || getTop('ALB').name,
          bTop?.note || 'Mbretëria Shqiptare (Mbreti Zog I)',
          undefined,
          bTop?.adminTitle || 'Mbretëria Shqiptare'
        );
      } else {
        const isSouthernFront = nid === 'AL033' || nid === 'AL034' || nid === 'AL036' || nrm.includes('gjirokast') || nrm.includes('korc') || nrm.includes('vlor');
        const albNote =
          s === 7 && isSouthernFront
            ? `${bTop?.note || 'Regno d\'Albania (Unione Personale sotto la Corona d\'Italia)'} — Base operativa del Comando Superiore Truppe Albania (Gen. Sebastiano Visconti Prasca) per l'offensiva del 28 ottobre 1940 verso l'Epiro e il Pindo.`
            : s >= 8
            ? `${bTop?.note || 'Regno d\'Albania (Unione Personale sotto la Corona d\'Italia)'} — Nell'aprile 1941, con il crollo della Jugoslavia e della Grecia, le truppe italiane rioccupano Argirocastro e Coriza ed espandono i confini nella "Grande Albania" (includendo Kosovo, Metohija, Dibra, Tetovo e Ulcinj).`
            : bTop?.note || 'Regno d\'Albania (Unione Personale sotto la Corona d\'Italia)';
        return makeResult(
          'ITA',
          bTop?.name || getTop('ITA').name,
          albNote,
          s >= 6 ? 'Asse' : undefined,
          bTop?.adminTitle || 'Regno d\'Albania'
        );
      }
    }

    case 'GRE':
    case 'GRC':
    case 'GR':
    case 'EL': {
      const greFac = s >= 7 ? 'Alleati' : 'Neutrale';
      // 1. Dodecaneso (EL421: Rodi, Coo, Lero, Calino, Scarpanto, Stampalia, Castelrosso): possedimento italiano dal 1912
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
          s >= 6 ? 'Asse' : undefined,
          top.adminTitle || 'Provincia di Rodi'
        );
      }

      // Step >= 8 (Aprile 1941): Operazione Marita — Caduta della Grecia continentale e tripartizione tra Germania, Italia e Bulgaria (mentre Creta resta roccaforte Alleata)
      if (s >= 8) {
        // 2a. Isola di Creta (EL431 Irakleio, EL432 Lasithi, EL433 Rethymno, EL434 Chania)
        if (
          nid.startsWith('EL43') ||
          nrm.includes('kriti') ||
          nrm.includes('crete') ||
          nrm.includes('creta') ||
          nrm.includes('irakleio') ||
          nrm.includes('heraklion') ||
          nrm.includes('chania') ||
          nrm.includes('canea') ||
          nrm.includes('rethymn') ||
          nrm.includes('lasith')
        ) {
          if (s >= 9) {
            const isLasithi = nid === 'EL432' || nrm.includes('lasith') || nrm.includes('sitia') || nrm.includes('agios nikolaos');
            if (isLasithi) {
              return makeResult(
                'ITA',
                `${rawName || 'Lasithi'} (Creta Orientale — Occupazione Militare Italiana, Divisione Siena)`,
                'Operazione Merkur (20-31 maggio 1941): mentre i paracadutisti tedeschi conquistano Chania, Rethymno e Heraklion, il 28 maggio 1941 un corpo di spedizione italiano sbarca a Sitia dal Dodecaneso, assumendo il presidio della provincia orientale di Lasithi.',
                'Asse',
                'Regio Esercito — Comando Truppe Creta Orientale (Divisione di Fanteria "Siena", Neapoli / Sitia)'
              );
            }
            return makeResult(
              'GER',
              `${rawName || 'Kreta'} (Festung Kreta — Occupazione Militare Tedesca, Chania / Heraklion)`,
              'Operazione Merkur (20 maggio – 1° giugno 1941): conquistata dai paracadutisti (Fallschirmjäger) dell\'XI. Fliegerkorps del Gen. Kurt Student e dalla 5. Gebirgs-Division, Creta viene trasformata nella Festung Kreta a guardia dell\'Egeo e delle rotte per il Nordafrica.',
              'Asse',
              'Wehrmacht — Kommandant der Festung Kreta (Gen. Kurt Student / Gen. Alexander Andrae, Chania)'
            );
          }
          const bTop = resolveBalkansToponym(nid, rawName, nrm, 'GRE', s);
          return makeResult(
            'GRE',
            bTop?.name || `${rawName || 'Creta'} (Isola di Creta — Roccaforte Alleata e Sede del Governo Greco)`,
            'Operazione Marita (aprile 1941): dopo la caduta di Atene (27 aprile) e l\'evacuazione del corpo di spedizione britannico (Operazione Demon), Re Giorgio II, il Primo Ministro Emmanouil Tsouderos e le forze alleate del Gen. Bernard Freyberg (Creforce) trasformano Creta nell\'ultimo baluardo del Regno di Grecia libero prima dell\'Operazione Merkur (maggio 1941).',
            'Alleati',
            'Vasileion tis Ellados — Governo Legittimo di Re Giorgio II e Creforce Alleata (Chania / Souda)'
          );
        }

        // 2b. Macedonia Orientale e Tracia Occidentale (EL512 Xanthi, EL513 Rodopi/Komotini, EL514 Drama, EL515 Kavala/Thasos, EL526 Serres) -> Annessione Bulgara (Belomorie)
        if (
          nid === 'EL512' ||
          nid === 'EL513' ||
          nid === 'EL514' ||
          nid === 'EL515' ||
          nid === 'EL526' ||
          nrm.includes('xanth') ||
          nrm.includes('rodop') ||
          nrm.includes('komotin') ||
          nrm.includes('drama') ||
          nrm.includes('kaval') ||
          nrm.includes('thasos') ||
          nrm.includes('serres')
        ) {
          return makeResult(
            'BUL',
            `${rawName || 'Belomorie'} (Belomorska oblast — Tsarstvo Balgariya: Kavala, Drama, Serres, Xanthi, Komotini)`,
            'Operazione Marita (aprile 1941): superata la Linea Metaxas dalla 12ª Armata tedesca, il 20 aprile 1941 la 2ª Armata bulgara occupa la Tracia occidentale e la Macedonia orientale greca tra i fiumi Struma e Maritsa (inclusi Kavala, Drama, Serres, Xanthi, Komotini e le isole di Taso e Samotracia), proclamando l\'annessione del Belomorie (sbocco sul Mar Egeo).',
            'Asse',
            'Tsarstvo Balgariya — Belomorska oblast (Ksanti / Kavala)'
          );
        }

        // 2c. Zone Strategiche di Occupazione Militare Tedesca (EL301..EL307 Atene e Pireo, EL521..EL525, EL527 Salonicco e Macedonia Centrale/Monte Athos, EL533 Florina, EL511 Evros/Zona Cuscinetto Turca, EL411 Lesbo/Lemno, EL413 Chio)
        if (
          nid.startsWith('EL30') ||
          nid === 'EL521' ||
          nid === 'EL522' ||
          nid === 'EL523' ||
          nid === 'EL524' ||
          nid === 'EL525' ||
          nid === 'EL527' ||
          nid === 'EL533' ||
          nid === 'EL511' ||
          nid === 'EL411' ||
          nid === 'EL413' ||
          nrm.includes('attik') ||
          nrm.includes('athen') ||
          nrm.includes('atene') ||
          nrm.includes('peirai') ||
          nrm.includes('piraeu') ||
          nrm.includes('thessalon') ||
          nrm.includes('salonic') ||
          nrm.includes('chalkidik') ||
          nrm.includes('imathi') ||
          nrm.includes('kilkis') ||
          nrm.includes('pella') ||
          nrm.includes('pieria') ||
          nrm.includes('florin') ||
          nrm.includes('evros') ||
          nrm.includes('lesv') ||
          nrm.includes('limnos') ||
          nrm.includes('chios')
        ) {
          const isAthens = nid.startsWith('EL30') || nrm.includes('attik') || nrm.includes('athen') || nrm.includes('atene') || nrm.includes('peirai');
          const isSalonika = nid.startsWith('EL52') || nid === 'EL533' || nrm.includes('thessalon') || nrm.includes('salonic');
          return makeResult(
            'GER',
            isAthens
              ? 'Atene e Pireo — Befehlshaber Südgriechenland & Governo Collaborazionista Tsolakoglou'
              : isSalonika
              ? `Salonicco e Macedonia Centrale (${rawName || 'Thessaloniki'} — Befehlshaber Saloniki-Ägäis)`
              : `${rawName || 'Ägäis / Evros'} (Deutsche Militärverwaltung in Griechenland)`,
            'Operazione Marita (6-30 aprile 1941): la 12ª Armata tedesca (Generalfeldmarschall Wilhelm List) occupa Salonicco il 9 aprile, sfonda le Termopili (24 aprile) ed entra ad Atene il 27 aprile 1941 issando la bandiera di guerra sull\'Acropoli. La Wehrmacht mantiene il controllo diretto di Atene-Pireo, di Salonicco con la Macedonia centrale, delle isole di Lemno, Lesbo e Chio e della fascia di confine dell\'Evros con la Turchia, insediando ad Atene il governo collaborazionista del Gen. Georgios Tsolakoglou (30 aprile 1941).',
            'Asse',
            isAthens
              ? 'Wehrmacht — Befehlshaber Südgriechenland & Elliniki Politeia (Gen. Georgios Tsolakoglou)'
              : 'Wehrmacht — Befehlshaber Saloniki-Ägäis (Thessaloniki)'
          );
        }

        // 2d. Zona di Occupazione Italiana in Grecia e Isole Ionie (Epiro EL54, Macedonia Occidentale EL531-532, Tessaglia EL61, Isole Ionie EL62, Grecia Centrale EL63-64, Peloponneso EL65, Cicladi EL422, Samo/Icaria EL412)
        const isIonian = nid.startsWith('EL62') || nrm.includes('kerkyr') || nrm.includes('corfu') || nrm.includes('kefallin') || nrm.includes('zakynth') || nrm.includes('lefkad');
        return makeResult(
          'ITA',
          isIonian
            ? `Isole Ionie (${rawName || 'Corfù, Cefalonia, Zante e Santa Maura'} — Amministrazione Civile Italiana)`
            : `${rawName || 'Grecia Continentale'} (Zona d'Occupazione Militare Italiana in Grecia — 11ª Armata)`,
          isIonian
            ? 'Operazione Marita (aprile 1941): le Isole Ionie (Corfù, Cefalonia, Zante, Leucade/Santa Maura) vengono occupate dalle forze italiane a fine aprile 1941 e sottoposte ad amministrazione civile separata in vista dell\'annessione al Regno d\'Italia.'
            : 'Operazione Marita e capitolazione greca (20-30 aprile 1941): in seguito al crollo del fronte greco-albanese e della linea dell\'Aliakmon, l\'Epiro, la Tessaglia, la Grecia centrale (Boezia, Eubea, Etolia-Acarnania), il Peloponneso e le Cicladi passano sotto la Zona d\'Occupazione Militare Italiana presidiata dall\'11ª Armata (Gen. Carlo Geloso).',
          'Asse',
          isIonian
            ? 'Regno d\'Italia — Affari Civili per le Isole Ionie (Corfù)'
            : 'Regio Esercito — Comando Superiore Forze Armate Grecia (11ª Armata — Gen. Carlo Geloso)'
        );
      }

      // Le Cicladi (EL422: Nasso, Andro, Paro, Milo, Santorino, ecc.) sono territorio greco dal 1830.
      if (nid === 'EL422') {
        const bTop = resolveBalkansToponym(nid, rawName, nrm, 'GRE', s);
        return makeResult(
          'GRE',
          bTop?.name || getTop('GRE').name || rawName,
          s >= 7
            ? `${bTop?.note || 'Regno di Grecia'} — Belligerante Alleato dal 28 ottobre 1940 ("Giorno dell'Oxi").`
            : bTop?.note || 'Regno di Grecia (Regime del 4 Agosto)',
          greFac,
          bTop?.adminTitle || 'Regno di Grecia'
        );
      }

      const bTop = resolveBalkansToponym(nid, rawName, nrm, 'GRE', s);
      const top = bTop || getTop('GRE');
      const isEpirusOrPindus =
        nid.startsWith('EL54') ||
        nid.startsWith('EL53') ||
        nrm.includes('ioannin') ||
        nrm.includes('thesprot') ||
        nrm.includes('kastori') ||
        nrm.includes('florin') ||
        nrm.includes('greven') ||
        nrm.includes('pind');
      const greNote =
        s >= 7
          ? isEpirusOrPindus
            ? `${bTop?.note || 'Regno di Grecia'} — Fronte greco-italiano (28 ottobre 1940): l'8ª Divisione di Fanteria greca (Gen. Katsimitros) e il Distaccamento del Pindo (Col. Davakis) arrestano l'offensiva italiana sulla linea fortificata di Elaia-Kalamas (Kalpaki) e sulle gole del Pindo.`
            : `${bTop?.note || 'Regno di Grecia (Regime del 4 Agosto)'} — Il 28 ottobre 1940 ("Giorno dell'Oxi") il Primo Ministro Ioannis Metaxas respinge l'ultimatum italiano; la Grecia entra in guerra al fianco degli Alleati.`
          : bTop?.note || 'Regno di Grecia (Regime del 4 Agosto)';
      return makeResult(
        'GRE',
        top.name || rawName,
        greNote,
        greFac,
        s >= 7 ? `${bTop?.adminTitle || 'Vasileion tis Ellados'} — Comando Supremo Ellenico (Gen. Alexandros Papagos)` : bTop?.adminTitle || 'Regno di Grecia'
      );
    }

    case 'FRA':
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

    case 'FO':
    case 'FRO': {
      if (s >= 6) {
        return makeResult(
          'UK',
          'Isole Fær Øer (Occupazione Britannica — Operazione Valentine)',
          'Occupate militarmente dalle forze britanniche (Royal Navy / Lovat Scouts) il 12-13 aprile 1940 (Operazione Valentine) per negare alla Germania basi navali strategiche nel Nord Atlantico. Mantenuta l\'amministrazione civile del Løgting e dell\'amtmand Carl Aage Hilbert; bandiera Merkið formalmente riconosciuta dall\'Ammiragliato.',
          'Alleati',
          'Military Administration of the Faroe Islands (British Garrison / Royal Navy Command, Tórshavn) & Løgting'
        );
      }
      return makeResult(
        'DEN',
        'Isole Fær Øer (Færøerne / Føroyar)',
        'Contea insulare del Regno di Danimarca (Færø Amt). Amministrazione civile guidata dall\'amtmand Carl Aage Hilbert con sede a Tórshavn (Streymoy) e assemblea rappresentativa del Løgting, sotto la sovranità di re Cristiano X.',
        'Neutrale',
        'Færø Amt (Amtmand Carl Aage Hilbert — Tórshavn) / Løgting'
      );
    }

    case 'DEN':
    case 'DNK':
    case 'DK': {
      const isDkFaroe =
        nrm.includes('faroe') ||
        nrm.includes('faeroe') ||
        nrm.includes('færø') ||
        nrm.includes('føroyar') ||
        (c[0] >= -8 && c[0] <= -5 && c[1] >= 61 && c[1] <= 63);
      if (isDkFaroe) {
        return s >= 6
          ? makeResult(
              'UK',
              'Isole Fær Øer (Occupazione Britannica — Operazione Valentine)',
              'Occupate militarmente dalle forze britanniche (Royal Navy / Lovat Scouts) il 12-13 aprile 1940 (Operazione Valentine) per negare alla Germania basi navali strategiche nel Nord Atlantico. Mantenuta l\'amministrazione civile del Løgting e dell\'amtmand Carl Aage Hilbert; bandiera Merkið formalmente riconosciuta dall\'Ammiragliato.',
              'Alleati',
              'Military Administration of the Faroe Islands (British Garrison / Royal Navy Command, Tórshavn) & Løgting'
            )
          : makeResult(
              'DEN',
              'Isole Fær Øer (Færøerne / Føroyar)',
              'Contea insulare del Regno di Danimarca (Færø Amt). Amministrazione civile guidata dall\'amtmand Carl Aage Hilbert con sede a Tórshavn (Streymoy) e assemblea rappresentativa del Løgting, sotto la sovranità di re Cristiano X.',
              'Neutrale',
              'Færø Amt (Amtmand Carl Aage Hilbert — Tórshavn) / Løgting'
            );
      }
      return s < 6
        ? makeResult('DEN', rawName, 'Kongeriget Danmark', undefined, 'Kongeriget Danmark')
        : makeResult(
            'GER',
            getTop('GER').name || rawName,
            'Besetztes Dänemark unter Reichsbevollmächtigtem Cecil von Renthe-Fink (Besatzungsregime ab 9. April 1940).',
            'Asse',
            'Besetztes Dänemark (Reichsbevollmächtigter Cecil von Renthe-Fink)'
          );
    }

    case 'NOR':
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

    case 'BEL':
    case 'BE':
      if (s >= 6) {
        if (nid === 'BE336') {
          const gerTop = getTop('GER');
          return makeResult(
            'GER',
            gerTop.name || 'Kreis Eupen-Malmedy (Rheinprovinz / Gau Köln-Aachen)',
            gerTop.note || 'Eupen-Malmedy e Sankt Vith riannessi direttamente al Deutsches Reich (Führererlass 18 maggio 1940, Gau Köln-Aachen).',
            'Asse',
            gerTop.adminTitle || 'Deutsches Reich — Rheinprovinz (Gau Köln-Aachen, Kreis Eupen-Malmedy)'
          );
        }
        const gerTop = getTop('GER');
        return makeResult(
          'GER',
          gerTop.name || rawName,
          gerTop.note || 'Militärverwaltung in Belgien und Nordfrankreich unter General Alexander von Falkenhausen (Sitz Brüssel).',
          'Asse',
          gerTop.adminTitle || 'Militärverwaltung in Belgien und Nordfrankreich (Alexander von Falkenhausen, Bruxelles)'
        );
      }
      const belTop = getTop('BEL');
      return makeResult(
        'BEL',
        belTop.name || rawName,
        belTop.note || 'Royaume de Belgique / Koninkrijk België (neutralità armata dal 1936)',
        'Neutrale',
        belTop.adminTitle || 'Royaume de Belgique / Koninkrijk België'
      );

    case 'HOL':
    case 'NLD':
    case 'NL':
      if (s >= 6) {
        const gerTop = getTop('GER');
        return makeResult(
          'GER',
          gerTop.name || rawName,
          gerTop.note || 'Reichskommissariat für die besetzten niederländischen Gebiete unter Arthur Seyß-Inquart (Sitz Den Haag).',
          'Asse',
          gerTop.adminTitle || 'Reichskommissariat für die besetzten niederländischen Gebiete (Arthur Seyß-Inquart, Den Haag)'
        );
      }
      const holTop = getTop('HOL');
      return makeResult(
        'HOL',
        holTop.name || rawName,
        holTop.note || 'Koninkrijk der Nederlanden (politica di neutralità)',
        'Neutrale',
        holTop.adminTitle || 'Koninkrijk der Nederlanden'
      );

    case 'LUX':
    case 'LU':
      if (s >= 6) {
        const gerTop = getTop('GER');
        return makeResult(
          'GER',
          gerTop.name || 'Luxemburg (CdZ-Gebiet Moselland)',
          gerTop.note || 'Chef der Zivilverwaltung Gustav Simon (Gauleiter des Gaues Moselland) — De-facto-Annexion an das Deutsche Reich.',
          'Asse',
          gerTop.adminTitle || 'CdZ-Gebiet Luxemburg (Gauleiter Gustav Simon, Gau Moselland)'
        );
      }
      const luxTop = getTop('LUX');
      return makeResult(
        'LUX',
        luxTop.name || rawName,
        luxTop.note || 'Grand-Duché de Luxembourg (neutralità disarmata)',
        'Neutrale',
        luxTop.adminTitle || 'Grand-Duché de Luxembourg — Gouvernement Dupong-Krier'
      );

    case 'ICE':
    case 'ISL':
    case 'IS':
      return s < 6
        ? makeResult('ICE', rawName, 'Konungsríkið Ísland')
        : makeResult('UK', 'Kingdom of Iceland', 'British Occupation / Operation Fork (May 1940)');

    case 'GBR':
    case 'UK':
    case 'GB':
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
        const ukProv = resolveUKProvince('IM', s, rawName);
        return makeResult(
          'UK',
          ukProv ? ukProv.name : (getTop('UK').name || 'Isola di Man (Douglas)'),
          ukProv ? ukProv.note : 'Dipendenza della Corona Britannica (Isle of Man)',
          'Alleati',
          'Crown Dependency of the Isle of Man'
        );
      }
      if (isChannel) {
        const chKey = (nrm.includes('jersey') || nid === 'JE' || cntr === 'JE') ? 'JE' : 'GG';
        const ukProv = resolveUKProvince(chKey, s, rawName);
        if (s >= 6) {
          return makeResult(
            'GER',
            ukProv ? ukProv.name : 'Isole del Canale (Occupazione Tedesca)',
            ukProv ? ukProv.note : 'Militärverwaltung Kanalinseln (giu 1940)',
            'Asse',
            'Militärverwaltung in Frankreich (Deutsche Wehrmacht / Festung Channel Islands)'
          );
        }
        return makeResult(
          'UK',
          ukProv ? ukProv.name : (getTop('UK').name || (nrm.includes('jersey') ? 'Baliato di Jersey' : 'Baliato di Guernsey')),
          ukProv ? ukProv.note : 'Dipendenza della Corona Britannica (Isole del Canale)',
          'Alleati',
          'British Crown Dependency (Channel Islands)'
        );
      }

      // Risoluzione esaustiva delle province del Regno Unito (NUTS-3 metropolitane)
      const ukProv = resolveUKProvince(nid || ft.id || rawName, s, rawName);
      if (ukProv) {
        return ukProv;
      }

      return makeResult('UK', getTop('UK').name || rawName, 'Regno Unito');
    }

    case 'IRE':
    case 'IRL':
    case 'EIR':
    case 'IE':
      return makeResult('IRE', rawName, 'Irlanda (Éire) — Neutrale');

    case 'SWI':
    case 'CHE':
    case 'CH': {
      const topSwi = resolveSwissAustrianToponym(nid, rawName, nrm, 'SWI', s) || getTop('SWI');
      return makeResult(
        'SWI',
        topSwi.name || rawName,
        topSwi.note || 'Confederazione Svizzera — Neutralità armata permanente (Schweizer Réduit)',
        'Neutrale',
        topSwi.adminTitle || 'Confédération suisse / Schweizerische Eidgenossenschaft'
      );
    }

    case 'POR':
    case 'PRT':
    case 'PT':
      return makeResult('POR', rawName, 'Portogallo (Estado Novo)');

    case 'SWE':
    case 'SE':
      return makeResult('SWE', rawName, 'Svezia — Neutrale');

    case 'TUR':
    case 'TR':
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

    case 'LIE':
    case 'LI': {
      const topLie = resolveSwissAustrianToponym(nid, rawName, nrm, 'LIE', s);
      return makeResult(
        'LIE',
        topLie?.name || 'Fürstentum Liechtenstein (Vaduz)',
        topLie?.note || (s < 2
          ? 'Principato del Liechtenstein — Principe Franz I (Neutrale / Zollunion Schweiz).'
          : 'Principato del Liechtenstein — Principe Franz Josef II (Neutrale / Zollunion Schweiz).'),
        'Neutrale',
        topLie?.adminTitle || 'Fürstentum Liechtenstein (Souveränes Fürstentum)'
      );
    }

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
    case 'EC_ORI':
    case 'ECU_ORIENTE':
    case '218':
    case 'XEC':
      if (nid === 'EC_ORI' || nid === 'ECU_ORIENTE' || (ft.properties?.NAME && ft.properties.NAME.includes('Oriente'))) {
        return makeResult('ECU', getExtendedToponym('Oriente (Ecuador)', 'ECU', nid, c, s).name, 'Región del Oriente (Zona Contesa Ecuador-Perù)');
      }
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

    // Messico & America del Nord Latina
    case 'MX':
    case 'MEX':
    case '484':
    case 'XMX': {
      const resMex = resolveMexicoProvince(ft, s);
      if (resMex) return resMex;
      const provName = rawName && rawName !== 'Mexico' && rawName !== 'Estados Unidos Mexicanos' ? rawName : (p.shapeName || p.NAME || '');
      const topMex = getExtendedToponym('Mexico', 'MEX', '', c, s);
      const displayName = provName ? `${provName} (${topMex.name || 'Estados Unidos Mexicanos'})` : (topMex.name || 'Estados Unidos Mexicanos');
      return makeResult(
        'MEX',
        displayName,
        topMex.note || 'Stati Uniti Messicani (Presidenza Lázaro Cárdenas)',
        'Neutrale',
        topMex.adminTitle || 'Estados Unidos Mexicanos'
      );
    }

    // Centro America & Caraibi
    case 'GT':
    case 'GTM':
    case '320':
    case 'XGT':
      return makeResult('GTM', getTop('GTM').name || 'Repubblica del Guatemala', getTop('GTM').note || 'Presidenza del Gen. Jorge Ubico', 'Neutrale', getTop('GTM').adminTitle);

    case 'SV':
    case 'SLV':
    case '222':
    case 'XSV':
      return makeResult('SLV', getTop('SLV').name || 'Repubblica di El Salvador', getTop('SLV').note || 'Governo del Gen. Maximiliano Hernández Martínez', 'Neutrale', getTop('SLV').adminTitle);

    case 'HN':
    case 'HND':
    case '340':
    case 'XHN':
      return makeResult('HND', getTop('HND').name || 'Repubblica dell\'Honduras', getTop('HND').note || 'Presidenza del Gen. Tiburcio Carías Andino (El Cariato)', 'Neutrale', getTop('HND').adminTitle);

    case 'NI':
    case 'NIC':
    case '558':
    case 'XNI':
      return makeResult('NIC', getTop('NIC').name || 'Repubblica del Nicaragua', getTop('NIC').note || 'Governo del Gen. Anastasio Somoza García', 'Neutrale', getTop('NIC').adminTitle);

    case 'CR':
    case 'CRI':
    case '188':
    case 'XCR':
      return makeResult('CRI', getTop('CRI').name || 'Repubblica di Costa Rica', getTop('CRI').note || 'Repubblica Costituzionale di Costa Rica', 'Neutrale', getTop('CRI').adminTitle);

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
        const topCanal = getExtendedToponym('Panama Canal Zone', 'USA', nid, c, s);
        return makeResult('USA', topCanal.name || 'Zona del Canale di Panama (USA)', topCanal.note || 'Territorio Strategico USA (Trattato Hay-Bunau-Varilla)', 'Alleati', topCanal.adminTitle);
      }
      return makeResult('PAN', getTop('PAN').name || 'Repubblica di Panama', getTop('PAN').note || 'Repubblica di Panama', 'Neutrale', getTop('PAN').adminTitle);
    }

    case 'CU':
    case 'CUB':
    case '192':
    case 'XCU': {
      if (nrm.includes('guantanamo')) {
        const topG = getExtendedToponym('guantanamo', 'USA', nid, c, s);
        return makeResult(
          'USA',
          topG.name || 'Guantanamo Bay Naval Base (U.S. Navy — Cuba)',
          topG.note ||
            'Base navale permanente di 116 km² affittata in perpetuità dagli Stati Uniti sulla baia di Guantánamo nel sud-est di Cuba in virtù del trattato cubano-statunitense del 1903 (confermato dal trattato del 1934). Base navale operativa primaria per il controllo del Paso de los Vientos (Windward Passage) tra Cuba e Haiti e la sorveglianza delle rotte dei Caraibi.',
          'Alleati',
          topG.adminTitle || 'U.S. Naval Operating Base Guantanamo Bay (Treaty of 1934)'
        );
      }
      return makeResult('CUB', getTop('CUB').name || 'Repubblica di Cuba', getTop('CUB').note || 'Repubblica di Cuba', 'Neutrale', getTop('CUB').adminTitle);
    }

    case 'DO':
    case 'DOM':
    case '214':
    case 'XDO':
      return makeResult('DOM', getTop('DOM').name || 'Repubblica Dominicana', getTop('DOM').note || 'Dittatura del Generalissimo Trujillo', 'Neutrale', getTop('DOM').adminTitle);

    case 'HT':
    case 'HTI':
    case 'HAI':
    case '332':
    case 'XHT':
      return makeResult('HAI', getTop('HAI').name || 'Repubblica di Haiti', getTop('HAI').note || 'Présidence Sténio Vincent', 'Neutrale', getTop('HAI').adminTitle);

    case 'BZ':
    case 'BLZ':
    case '084':
    case 'XBZ': {
      const topBz = getExtendedToponym('British Honduras', 'UK', nid, c, s);
      return makeResult('UK', topBz.name || 'Honduras Britannico (Belize)', topBz.note || 'Colonia della Corona Britannica', s >= 4 ? 'Alleati' : 'Neutrale', topBz.adminTitle);
    }

    case 'JM':
    case 'JAM':
    case '388':
    case 'XJM': {
      const topJm = getExtendedToponym('Jamaica', 'UK', nid, c, s);
      return makeResult('UK', topJm.name || 'Jamaica (Crown Colony)', topJm.note || 'Colonia della Corona Britannica', s >= 4 ? 'Alleati' : 'Neutrale', topJm.adminTitle);
    }

    case 'PR':
    case 'PRI':
    case '630':
    case 'XPR': {
      const topPr = getExtendedToponym('Puerto Rico', 'USA', nid, c, s);
      return makeResult('USA', topPr.name || 'Puerto Rico (USA)', topPr.note || 'Territorio insulare USA nelle Antille', 'Alleati', topPr.adminTitle);
    }

    // Stati Uniti d'America & Territori d'Oltremare
    case 'US':
    case 'USA':
    case '840':
    case 'XUS':
    case 'VI':
    case 'VIR':
    case '850':
    case 'XVI':
    case 'GU':
    case 'GUM':
    case '316':
    case 'XGU':
    case 'AS':
    case 'ASM':
    case '016':
    case 'XAS':
    case 'UM':
    case 'UMI':
    case '581': {
      if (rawName !== 'United States') {
        const resUsa = resolveUSAProvince(ft, s);
        if (resUsa) return resUsa;
      }
      if (s >= 9 && (cntr === 'GU' || cntr === 'GUM' || cntr === '316' || cntr === 'XGU' || nrm.includes('guam') || nrm.includes('wake'))) {
        const isWake = nrm.includes('wake') || nid.includes('WAKE');
        return makeResult(
          'JAP',
          isWake ? 'Ōtori-jima (Wake Island — Occupazione Imperiale Giapponese)' : 'Ōmiya-jima (Guam — Occupazione Imperiale Giapponese)',
          isWake
            ? 'Battaglia dell\'Isola di Wake (8-23 dicembre 1941): conquista anfibia giapponese del 23 dicembre 1941 dopo l\'eroica resistenza dei Marines statunitensi.'
            : 'Battaglia di Guam (8-10 dicembre 1941): sbarco giapponese del Distaccamento dei Mari del Sud (Magg. Gen. Tomitarō Horii) e resa della guarnigione statunitense il 10 dicembre 1941.',
          'Asse',
          'Dai Nippon Teikoku Kaigun — Occupazione Militare Giapponese'
        );
      }
      const usaTop = getTop('USA');
      return makeResult(
        'USA',
        usaTop.name || USA_COL[cntr] || rawName || 'Stati Uniti d\'America',
        usaTop.note || 'Stati Uniti d\'America',
        'Alleati',
        usaTop.adminTitle || 'United States of America'
      );
    }

    // Medio Oriente & Asia
    case 'IR':
    case 'IRN':
    case '364':
    case 'XIR': {
      if (s >= 9) {
        return resolveIranProvince(ft, s);
      }
      const irTop = getTop('IRN');
      const provName = irTop.name || histName || rawName || 'Impero dell\'Iran (Persia)';
      const provAdmin = irTop.adminTitle || p.ADMIN || 'Keshvar-e Shāhanshāhi-ye Irān (Impero dell\'Iran)';
      const provNote = irTop.note || p.HISTORICAL_NOTE || (s >= 8 ? 'Impero dell\'Iran sotto il regno di Reza Shah Pahlavi; neutrale all\'inizio delle ostilità mondiali.' : 'Impero dell\'Iran (Dinastia Pahlavi) — Stato sovrano guidato da Reza Shah Pahlavi con capitale a Teheran; neutrale e impegnato nella modernizzazione infrastrutturale (Ferrovia Trans-Iraniana).');
      return makeResult('IRN', provName, provNote, 'Neutrale', provAdmin);
    }
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
    case '004': {
      const resAfg = resolveAfghanistanProvince(ft.id || p.id || p.shapeISO || rawName, s);
      if (resAfg) return resAfg;
      return makeResult(
        'AFG',
        getTop('AFG').name || rawName || 'Regno dell\'Afghanistan',
        'Regno dell\'Afghanistan (Da Afghānistān Shāhī Dawlat)',
        'Neutrale',
        'Da Afghānistān Shāhī Dawlat'
      );
    }
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
      if (s >= 9) {
        return makeResult(
          'SIA',
          getTop('SIA').name || 'Ratcha-anachak Thai (Regno di Thailandia — Alleanza con il Giappone)',
          'Dopo gli sbarchi giapponesi dell\'8 dicembre 1941 a Singora, Pattani e Prachuap Khiri Khan, il governo del Maresciallo Plaek Phibunsongkhram ordina l\'armistizio, concede il libero transito alle armate giapponesi verso Malesia e Birmania e il 21 dicembre 1941 firma a Bangkok il Trattato formale di Alleanza militare con Tokyo.',
          'Asse',
          'Ratcha-anachak Thai — Maresciallo Plaek Phibunsongkhram (Alleato dell\'Asse)'
        );
      }
      return makeResult('SIA', getTop('SIA').name, 'Regno del Siam (Thailandia)');
    case 'TUV':
    case 'XTU': {
      const histName = p.HISTORICAL_NAME || p.NUTS_NAME || getTop('TUV').name || 'Repubblica Popolare di Tannu Tuva';
      const adminTitle = p.ADMIN_TITLE || 'Repubblica Popolare di Tannu Tuva (Stato socialista indipendente alleato dell\'URSS fino al 1944)';
      return makeResult('TUV', histName, adminTitle, 'Comintern');
    }
    case 'JAP':
    case 'JP':
    case 'JPN':
    case '392': {
      return resolveJapanProvince(ft, s);
    }
    case 'KR':
    case 'KOR':
    case 'KP':
    case 'PRK':
    case '410':
    case '408': {
      return resolveKoreaProvince(ft, s);
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
    case 'CHI':
    case 'CN':
      return s >= 1 && c[0] > 113
        ? makeResult('JAP', getTop('JAP').name, 'Occupazione Militare Giapponese', 'Asse', 'Dai Nippon Teikoku Kōgun Senryōchi')
        : makeResult('CHI', getTop('CHI').name, 'Repubblica di Cina (KMT)', 'Alleati', s >= 2 ? 'Zhōnghuá Mínguó Guómín Zhèngfǔ (Péidū Chongqing)' : 'Zhōnghuá Mínguó Guómín Zhèngfǔ (Nanjing)');
    case 'CA':
    case 'CAN':
    case '124': {
      const resCan = resolveCanadaProvince(ft, s);
      if (resCan) return resCan;
      const topCan = getExtendedToponym('Canada', 'CAN', '', c, s);
      const provName = rawName && rawName !== 'Canada' ? rawName : (p.shapeName || p.NAME || '');
      const displayName = provName ? `${provName} (${topCan.name || 'Dominion of Canada'})` : (topCan.name || 'Dominion of Canada');
      return makeResult(
        'CAN',
        displayName,
        topCan.note || 'Dominion del Canada',
        'Alleati',
        topCan.adminTitle || 'Dominion of Canada'
      );
    }
    case 'AST':
    case 'AU':
      return makeResult('AST', getTop('AST').name, 'Commonwealth d\'Australia');
    case 'NZL':
    case 'NZ':
      return makeResult('NZL', getTop('NZL').name, 'Dominion della Nuova Zelanda');
    case 'SAF':
    case 'ZA':
      return makeResult('SAF', getTop('SAF').name, 'Unione Sudafricana');
    case 'RAJ':
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
            // -------------------------------------------------------------
    // MANDATO BRITANNICO DELLA PALESTINA (1920-1948) — 8 PROVINCE
    // -------------------------------------------------------------
        // -------------------------------------------------------------
    // MANDATO FRANCESE DI SIRIA E LIBANO — 22 PROVINCE E DISTRETTI
    // -------------------------------------------------------------
        case 'SYR':
    case 'SY':
    case '760':
    case 'LEB':
    case 'LB':
    case 'LBN':
    case '422':
    case 'F_SYR':
    case 'VIC_SYR':
    case 'SYR_DAM':
    case 'SYR_GHT':
    case 'SYR_ALP':
    case 'SYR_IDL':
    case 'SYR_LTK':
    case 'SYR_TAR':
    case 'SYR_HMS':
    case 'SYR_HMA':
    case 'SYR_JAZ':
    case 'SYR_RAQ':
    case 'SYR_DEZ':
    case 'SYR_DRU':
    case 'SYR_HAU':
    case 'SYR_GOL':
    case 'LEB_ALL':
    case 'LBAS':
    case 'LBBH':
    case 'LBJL':
    case 'LBJA':
    case 'LBNA':
    case 'LBAK':
    case 'LBBI':
    case 'LBBA':
    case 'TR631':
    case 'HAT': {
      return resolveLevantMandateProvince(ft, s);
    }

    case 'PAL':
    case 'ISR':
    case '376':
    case 'PSE':
    case '275':
    case 'PS':
    case 'IL':
    case 'PSGZZ':
    case 'PSWBK':
    case 'PAL_GAZ':
    case 'PAL_SAM':
    case 'PAL_BEER':
    case 'PAL_JRS':
    case 'PAL_TLV':
    case 'PAL_LYD':
    case 'PAL_HFA':
    case 'PAL_GAL': {
      return resolvePalestineMandateProvince(ft, s);
    }
    
    case 'IQ':
    case 'IRQ':
    case '368':
    case 'XIQ':
      if (s >= 9) {
        return makeResult(
          'UK',
          'Regno dell\'Iraq — Controllo Militare Britannico (PAIFORCE — Baghdad / Bassora / Habbaniya)',
          'Dopo la guerra anglo-irachena del maggio 1941 e la fuga di Rashid Ali al-Kaylani, l\'Iraq torna sotto il governo filo-britannico del Reggente \'Abd al-Ilah e di Nuri al-Sa\'id, presidiato dalla Persia and Iraq Force (PAIFORCE / 10ª Armata britannica del Gen. Edward Quinan) a tutela dei pozzi di Kirkuk e del corridoio verso l\'Iran.',
          'Alleati',
          'Al-Mamlakah al-\'Irāqiyyah — Reggente \'Abd al-Ilah & British PAIFORCE (10th Army)'
        );
      }
      if (s >= 8) {
        const top = getTop('IRQ');
        return makeResult(
          'IRQ',
          top.name || 'Regno dell\'Iraq — Governo di Difesa Nazionale (Rashid Ali al-Kaylani — Baghdad)',
          top.note || 'Colpo di Stato nazionalista e filo-Asse del 1°-2 aprile 1941 a Baghdad: l\'ex Primo Ministro Rashid Ali al-Kaylani e i quattro colonnelli del "Quadrato d\'Oro" rovesciano il reggente filo-britannico \'Abd al-Ilah, assediando la base RAF di Habbaniya e aprendo la guerra anglo-irachena.',
          'Asse',
          top.adminTitle || 'Al-Mamlakah al-\'Irāqiyyah — Governo di Difesa Nazionale (Rashid Ali al-Kaylani)'
        );
      }
      return makeResult('UK', 'Regno dell\'Iraq (Mesopotamia Britannica)', 'Sfera d\'Influenza e Mandato Britannico');
    case 'EG':
    case 'EGY':
    case '818':
      return makeResult('EGY', "Regno d'Egitto", "Sfera Britannica (Trattato Anglo-Egiziano 1936)", 'Alleati', "Regno d'Egitto (Re Faruq I)");
    case 'JO':
    case 'JOR':
    case '400':
      return makeResult('UK', 'Emirato di Transgiordania', 'Mandato Britannico');
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

    case 'LR':
    case 'LBR':
    case '430':
    case 'XLR':
      return makeResult('LBR', getTop('LBR').name || 'Repubblica di Liberia', 'Stato Indipendente Africano');
    case 'ETH':
    case 'ET':
      if (s >= 8) {
        const top = getTop('ETH');
        return makeResult(
          'ETH',
          top.name || 'Impero d\'Etiopia Liberato (Addis Abeba — Negus Haile Selassie I)',
          top.note || 'Collasso dell\'Africa Orientale Italiana (aprile 1941): il 6 aprile 1941 le truppe del Gen. Alan Cunningham entrano ad Addis Abeba, restaurando sul trono il Negus Haile Selassie I (rientrato con la Gideon Force di Orde Wingate), mentre il Viceré Amedeo di Savoia-Aosta ripiega per l\'ultima resistenza sull\'Amba Alagi.',
          'Alleati',
          top.adminTitle || 'Ye’Ityōṗṗyā Nigūsa Negest Mengist — Imperatore Haile Selassie I & Occupazione Alleata'
        );
      }
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

    case 'MA':
    case 'MAR':
    case '504':
    case 'XMA':
    case 'FR_MOROCCO': {
      if (s >= 6) {
        return makeResult(
          'VIC_NAF',
          'Protectorat du Maroc (Maroc Français — Vichy)',
          'Résidence Générale de France au Maroc (Général Charles Noguès — Vichy)',
          'Fantoccio',
          'Résidence Générale de France au Maroc (Vichy)'
        );
      }
      return makeResult(
        'F_NAF',
        'Protectorat Français du Maroc (Maroc Français — Rabat / Casablanca)',
        'Résidence Générale de la République Française au Maroc (Général Charles Noguès)',
        undefined,
        'Résidence Générale de la République Française (Rabat)'
      );
    }

    case 'TANGER':
    case 'TANGIER': {
      if (s >= 6) {
        return makeResult(
          'SPA',
          'Tánger (Zona Ocupada por España)',
          'Ocupación Militar Española (14 de junio de 1940)'
        );
      }
      return makeResult(
        'TANGER',
        'Zone Internationale de Tanger',
        'Administration Internationale (Statut de 1923)',
        'Neutrale'
      );
    }

    case 'UK_SOMALILAND':
    case 'BR_SOMALILAND': {
      if (s === 7) {
        const top = getExtendedToponym('British Somaliland', 'ITA', nid, c, s);
        return makeResult(
          'ITA',
          top.name || 'Somalia Britannica Occupata (Berbera — AOI)',
          top.note || 'Conquista italiana della Somalia Britannica (3-19 agosto 1940: Battaglia di Tug Argan e presa di Berbera da parte delle truppe del Gen. Guglielmo Nasi). Territorio annesso all\'Africa Orientale Italiana.',
          'Asse',
          top.adminTitle || 'Governo Militare della Somalia Britannica (AOI — Gen. Guglielmo Nasi)'
        );
      }
      if (s >= 8) {
        const top = getExtendedToponym('British Somaliland', 'UK', nid, c, s);
        return makeResult(
          'UK',
          top.name || 'British Somaliland Protectorate (Berbera — Riconquista Alleata)',
          'Operazione Appearance (16 marzo 1941): sbarco anfibio anglo-indiano a Berbera e riconquista britannica della Somalia Britannica nel quadro dell\'offensiva generale contro l\'Africa Orientale Italiana.',
          'Alleati',
          'British Somaliland Military Administration (Brig. Arthur Chater)'
        );
      }
      const top = getExtendedToponym('British Somaliland', 'UK', nid, c, s);
      return makeResult(
        'UK',
        top.name || 'British Somaliland Protectorate (Berbera)',
        top.note,
        s >= 4 ? 'Alleati' : 'Neutrale',
        top.adminTitle || 'British Crown Protectorate (Governor Arthur Chater)'
      );
    }

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
        if (s >= 8) {
          if (
            nrm.includes('kosov') ||
            nrm.includes('kosova') ||
            nrm.includes('metohij') ||
            nrm.includes('pristina') ||
            nrm.includes('prizren') ||
            nid.startsWith('XK') ||
            nid.startsWith('KO') ||
            nid.startsWith('KV')
          ) {
            return makeResult(
              'ITA',
              'Kosovo e Metohija (Pristina / Prizren / Peć — Grande Albania)',
              'Smembramento della Jugoslavia (aprile 1941): annessione del Kosovo e della Metohija alla Grande Albania sotto la Corona d\'Italia.',
              'Asse',
              'Regno d\'Italia — Regno d\'Albania (Grande Albania)'
            );
          }
          return makeResult(
            'CRO',
            getTop('CRO').name || 'Bosna i Hercegovina (Nezavisna Država Hrvatska — NDH)',
            'Smembramento della Jugoslavia (aprile 1941): incorporazione nello Stato Indipendente di Croazia (NDH) di Ante Pavelić.',
            'Fantoccio',
            'Nezavisna Država Hrvatska (NDH — Poglavnik Ante Pavelić)'
          );
        }
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

      if (
        nrm === 'mexico' ||
        nrm === 'messico' ||
        nrm === 'estados unidos mexicanos' ||
        nrm.includes('mexico') ||
        nrm.includes('messico') ||
        nid.startsWith('MX')
      ) {
        const resMex = resolveMexicoProvince(ft, s);
        if (resMex) return resMex;
        const top = getTop('MEX');
        return makeResult('MEX', top.name || 'Estados Unidos Mexicanos', top.note || 'Stati Uniti Messicani (Presidenza Lázaro Cárdenas)', 'Neutrale', top.adminTitle || 'Estados Unidos Mexicanos');
      }

      if (
        nrm.includes('puerto rico') ||
        nrm.includes('porto rico') ||
        nid.startsWith('PR')
      ) {
        const top = getTop('USA');
        return makeResult('USA', top.name || 'Puerto Rico (USA)', top.note || 'Territorio insulare non incorporato degli Stati Uniti', 'Alleati', top.adminTitle || 'Territory of Puerto Rico');
      }

      if (
        nrm.includes('jamaica') ||
        nrm.includes('giamaica') ||
        nid.startsWith('JM')
      ) {
        const top = getTop('UK');
        return makeResult('UK', top.name || 'Jamaica (Crown Colony)', top.note || 'Colonia della Corona Britannica', s >= 4 ? 'Alleati' : 'Neutrale', top.adminTitle || 'British Crown Colony of Jamaica');
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
        (nrm.includes('hail') && !nrm.includes('thail')) ||
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
        if (s >= 9) {
          return resolveIranProvince(ft, s);
        }
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
        if (s >= 9) {
          return makeResult(
            'UK',
            'Regno dell\'Iraq — Controllo Militare Britannico (PAIFORCE — Baghdad)',
            'Dopo la guerra anglo-irachena del maggio 1941, il Regno dell\'Iraq è presidiato dalla Persia and Iraq Force (PAIFORCE / 10ª Armata britannica) a protezione dei campi petroliferi e delle rotte di rifornimento alleate.',
            'Alleati',
            'Al-Mamlakah al-\'Irāqiyyah — Reggente \'Abd al-Ilah & British PAIFORCE'
          );
        }
        if (s >= 8) {
          return makeResult(
            'IRQ',
            'Regno dell\'Iraq — Governo di Difesa Nazionale (Rashid Ali al-Kaylani — Baghdad)',
            'Colpo di Stato nazionalista e filo-Asse del 1°-2 aprile 1941 a Baghdad (Rashid Ali al-Kaylani e il "Quadrato d\'Oro"): apertura della guerra anglo-irachena e assedio della base RAF di Habbaniya.',
            'Asse',
            'Al-Mamlakah al-\'Irāqiyyah — Governo di Difesa Nazionale (Rashid Ali al-Kaylani)'
          );
        }
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
        nid.startsWith('PZ') ||
        nid.startsWith('US_PCZ')
      ) {
        const topCanal = getTop('USA');
        return makeResult(
          'USA',
          topCanal.name || 'Panama Canal Zone (Balboa Heights / Quarry Heights — USA)',
          topCanal.note || 'Territorio Strategico USA (Trattato Hay-Bunau-Varilla)',
          'Alleati',
          topCanal.adminTitle || 'Panama Canal Zone — U.S. Strategic Military Outpost'
        );
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
          const topG = getExtendedToponym('guantanamo', 'USA', nid, c, s);
          return makeResult(
            'USA',
            topG.name || 'Guantanamo Bay Naval Base (U.S. Navy — Cuba)',
            topG.note ||
              'Base navale permanente di 116 km² affittata in perpetuità dagli Stati Uniti sulla baia di Guantánamo nel sud-est di Cuba in virtù del trattato cubano-statunitense del 1903 (confermato dal trattato del 1934). Base navale operativa primaria per il controllo del Paso de los Vientos (Windward Passage) tra Cuba e Haiti e la sorveglianza delle rotte dei Caraibi.',
            'Alleati',
            topG.adminTitle || 'U.S. Naval Operating Base Guantanamo Bay (Treaty of 1934)'
          );
        }
        return makeResult('CUB', getTop('CUB').name || 'Repubblica di Cuba', getTop('CUB').note || 'Repubblica di Cuba', 'Neutrale', getTop('CUB').adminTitle);
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

      const resSudanFt = resolveSudanProvince(ft.id || p.id || p.shapeISO || rawName, s);
      if (resSudanFt) return resSudanFt;

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
        nrm.includes('british somaliland')
      ) {
        if (nrm.includes('british somaliland') && s === 7) {
          const top = getExtendedToponym('British Somaliland', 'ITA', nid, c, s);
          return makeResult(
            'ITA',
            top.name || 'Somalia Britannica Occupata (Berbera — AOI)',
            top.note || 'Conquista italiana della Somalia Britannica (agosto 1940) — Annessa all\'AOI',
            'Asse',
            top.adminTitle || 'Governo Militare della Somalia Britannica (AOI — Gen. Guglielmo Nasi)'
          );
        }
        if (nrm.includes('british somaliland') && s >= 8) {
          const top = getExtendedToponym('British Somaliland', 'UK', nid, c, s);
          return makeResult(
            'UK',
            top.name || 'British Somaliland Protectorate (Berbera — Riconquista Alleata)',
            'Operazione Appearance (16 marzo 1941): riconquista britannica di Berbera e della Somalia Britannica.',
            'Alleati',
            'British Somaliland Military Administration (Brig. Arthur Chater)'
          );
        }
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
            top.note || 'Nordafrica Francese — Regime di Vichy',
            'Fantoccio',
            top.adminTitle || 'Gouvernement Général de l\'Algérie (Yves Châtel / Maxime Weygand — Vichy)'
          );
        }
        const top = getTop('F_NAF');
        return makeResult(
          'F_NAF',
          top.name || rawName || 'Nordafrica Francese',
          top.note || 'Territoires français d\'Afrique du Nord',
          undefined,
          top.adminTitle || 'Gouvernement Général de l\'Algérie / Protectorats de Tunisie et du Maroc'
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
        const resAOF = resolveAOFProvince(ft, s);
        if (resAOF) return resAOF;
        if (s >= 6) {
          const top = getTop('VIC_AOF');
          return makeResult(
            'VIC_AOF',
            top.name || (rawName ? `${rawName} (AOF — Vichy)` : 'Africa Occidentale Francese (AOF — Vichy)'),
            top.note || 'Haut-Commissariat de Pierre Boisson pour l\'Afrique Noire (Vichy)',
            'Fantoccio',
            top.adminTitle || 'Haut-Commissariat de Pierre Boisson pour l\'Afrique Noire (Dakar — Vichy)'
          );
        }
        const top = getTop('F_AOF');
        return makeResult(
          'F_AOF',
          top.name || rawName || 'Africa Occidentale Francese (AOF)',
          top.note || 'Fédération coloniale de l\'Afrique Occidentale Française',
          undefined,
          top.adminTitle || 'Gouvernement Général de l\'AOF (Dakar)'
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
        const resAEF = resolveAEFProvince(ft, s);
        if (resAEF) return resAEF;
        if (s >= 6) {
          const top = getTop('FFL_AEF');
          return makeResult(
            'FFL_AEF',
            top.name || (rawName ? `${rawName} (Francia Libera)` : 'Africa Equatoriale (Francia Libera)'),
            top.note || 'Afrique Française Libre — Félix Éboué & De Gaulle (Brazzaville)',
            'Alleati',
            top.adminTitle || 'Capitale de l\'Empire de la France Libre (Brazzaville)'
          );
        }
        const top = getTop('F_AEF');
        return makeResult(
          'F_AEF',
          top.name || rawName || 'Africa Equatoriale Francese (AEF)',
          top.note || 'Fédération de l\'Afrique-Équatoriale Française',
          undefined,
          top.adminTitle || 'Gouvernement Général de l\'AEF (Brazzaville)'
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

      const resNamibiaFt = resolveNamibiaProvince(ft.id || p.id || p.shapeISO || rawName, s);
      if (resNamibiaFt) return resNamibiaFt;

      if (
        nrm.includes('south africa') ||
        nrm.includes('sudafrica') ||
        ft.id === 'SAF' ||
        p.shapeISO === 'ZA' ||
        p.CNTR_CODE === 'ZA'
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
            top.note || 'Gouvernement Général d\'Armand Annet sous autorité de Vichy',
            'Fantoccio',
            top.adminTitle || 'Gouvernement Général d\'Armand Annet (Vichy — Tananarive)'
          );
        }
        const top = getTop('F_MAD');
        return makeResult(
          'F_MAD',
          top.name || rawName || 'Madagascar Francese',
          top.note || 'Colonie de Madagascar et Dépendances dans l\'océan Indien',
          undefined,
          top.adminTitle || 'Gouvernement Général de Madagascar (Tananarive)'
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
            top.note || 'Administration autoritaire de Pierre Nouailhetas sous le régime de Vichy',
            'Fantoccio',
            top.adminTitle || 'Administration de Pierre Nouailhetas (Régime de Vichy — Djibouti)'
          );
        }
        const top = getTop('F_SOM');
        return makeResult(
          'F_SOM',
          top.name || rawName || 'Somalia Francese (Gibuti)',
          top.note || 'Colonie de la Côte Française des Somalis (Djibouti)',
          undefined,
          top.adminTitle || 'Colonie de Djibouti (Gouverneur Hubert Deschamps)'
        );
      }

      if (ITA_COL[cntr] || cntr === 'LY' || cntr === 'LBY' || nid.startsWith('LY')) {
        if (s >= 8 && (cntr === 'ER' || cntr === 'ERI' || nrm.includes('eritrea') || nid.startsWith('ER'))) {
          return makeResult(
            'UK',
            'Eritrea Occupata (Asmara / Massaua / Cheren — British Military Administration)',
            'Campagna dell\'Africa Orientale Italiana (febbraio-aprile 1941): dopo i 53 giorni dell\'aspra battaglia di Cheren (5 febbraio - 27 marzo 1941), le divisioni anglo-indiane del Gen. William Platt occupano Asmara (1° aprile) e la base navale di Massaua (8 aprile 1941).',
            'Alleati',
            'Occupied Enemy Territory Administration (OETA) — British Military Administration in Eritrea'
          );
        }
        if (s >= 8 && (cntr === 'SO' || cntr === 'SOM' || nrm.includes('somal') || nid.startsWith('SO'))) {
          return makeResult(
            'UK',
            'Somalia Occupata (Mogadiscio / Chisimaio — British Military Administration)',
            'Campagna dell\'Africa Orientale Italiana (febbraio-marzo 1941): l\'11ª Divisione Africana del Gen. Alan Cunningham sfonda la linea del Giuba, occupa Chisimaio e il 25 febbraio 1941 entra a Mogadiscio, proseguendo verso Harar e Addis Abeba.',
            'Alleati',
            'Occupied Enemy Territory Administration (OETA) — British Military Administration in Somalia'
          );
        }
        if (
          s >= 9 &&
          (nid === 'LYBU' ||
            nid === 'LYDR' ||
            nid === 'LYJA' ||
            nid === 'LYMJ' ||
            nid === 'LYBA' ||
            nid === 'LYWA' ||
            nrm.includes('cyrenaic') ||
            nrm.includes('cirenaic') ||
            nrm.includes('tobruk') ||
            nrm.includes('benghazi') ||
            nrm.includes('bengasi') ||
            nrm.includes('derna') ||
            nrm.includes('bardia'))
        ) {
          return makeResult(
            'UK',
            'Cirenaica Occupata (Bengasi / Tobruk / Derna — Operazione Crusader, 8th Army)',
            'Operazione Crusader (18 novembre - 30 dicembre 1941): l\'8ª Armata britannica (Gen. Alan Cunningham, poi Gen. Neil Ritchie) sblocca la guarnigione assediata di Tobruk (7-10 dicembre) e insegue il Panzergruppe Afrika di Rommel attraverso la Cirenaica, rioccupando Derna, Bengasi (24 dicembre) e Agedabia fino a El Agheila.',
            'Alleati',
            'British 8th Army — Military Administration of Cyrenaica'
          );
        }
        const itTop = getTop('ITA');
        return makeResult(
          'ITA',
          itTop.name || ITA_COL[cntr] || rawName,
          itTop.note ||
            (s >= 9
              ? 'Governo Generale della Libia (Tripolitania e Fezzan — Maresciallo Ettore Bastico) & Panzergruppe Afrika (Gen. Erwin Rommel): dopo l\'Operazione Crusader (novembre-dicembre 1941), le forze italo-tedesche ripiegano ordinatamente sulla stretta di El Agheila al confine tra Cirenaica e Tripolitania, preparando la controffensiva del gennaio 1942.'
              : s >= 8
              ? 'Operazione Sonnenblume (febbraio-aprile 1941): sbarco a Tripoli del Deutsches Afrikakorps (Gen. Erwin Rommel) e controffensiva italo-tedesca (El Agheila, Agedabia, Mechili, riconquista di Bengasi e Derna), con inizio dell\'assedio della piazzaforte australiano-britannica di Tobruk (10 aprile 1941) sotto il comando del Gen. Italo Gariboldi e di Rommel.'
              : s >= 6
              ? 'Governo Generale della Libia (Maresciallo Rodolfo Graziani)'
              : 'Governo Generale della Libia (Maresciallo dell\'Aria Italo Balbo)'),
          s >= 6 ? 'Asse' : undefined,
          itTop.adminTitle ||
            (s >= 9
              ? 'Governo Generale della Libia (Maresciallo Ettore Bastico) & Panzergruppe Afrika (Gen. Erwin Rommel)'
              : s >= 8
              ? 'Governo Generale della Libia (Gen. Italo Gariboldi) & Deutsches Afrikakorps (Gen. Erwin Rommel)'
              : 'Libia Italiana (Quarta Sponda)')
        );
      }
      if (FRA_COL[cntr]) {
        const [lbl, t] = FRA_COL[cntr];
        if (s >= 6) {
          if (t === 'F_AEF') {
            const fflTop = getTop('FFL_AEF');
            return makeResult(
              'FFL_AEF',
              fflTop.name || `${lbl} (Francia Libera)`,
              fflTop.note || 'Afrique Française Libre — Félix Éboué & De Gaulle (Brazzaville)',
              'Alleati',
              fflTop.adminTitle || 'Capitale de l\'Empire de la France Libre (Brazzaville)'
            );
          }
          if (t === 'F_COL') {
            const isRalliedCol =
              cntr === 'VU' ||
              cntr === 'VUT' ||
              cntr === 'NC' ||
              cntr === 'NCL' ||
              cntr === 'PF' ||
              cntr === 'PYF' ||
              nrm.includes('hebrid') ||
              nrm.includes('caledon') ||
              nrm.includes('polynesi') ||
              nrm.includes('tahiti') ||
              nrm.includes('pondicher');
            if (isRalliedCol && s >= 7) {
              const fflTop = getExtendedToponym(lbl, 'FFL_AEF', nid, c, s);
              return makeResult(
                'FFL_AEF',
                fflTop.name || `${lbl} (France Libre)`,
                fflTop.note || 'Territoire d\'outre-mer rallié à la France Libre du Général de Gaulle en 1940',
                'Alleati',
                fflTop.adminTitle || 'France Libre — Conseil de défense de l\'Empire'
              );
            }
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
          if (vicKey === 'VIC_SYR' && s >= 9) {
          return makeResult(
            'F_SYR',
            vicTop.name || 'Syrie et Liban (Controllo Congiunto Francia Libera e Gran Bretagna)',
            "Operazione Exporter e Armistizio di Saint-Jean-d'Acre (14 luglio 1941): dopo la resa delle forze di Vichy del Gen. Henri Dentz, Siria e Libano passano sotto il controllo congiunto della Francia Libera (Gen. Georges Catroux) e della Gran Bretagna.",
            'Alleati',
            'Délégation Générale de la France Libre au Levant (Gén. Georges Catroux) & British 9th Army'
          );
        }
        if (vicKey === 'VIC_IND' && s >= 9) {
          return makeResult(
            'JAP',
            'Indochine française (Occupazione Militare Giapponese Integrale — Operazione Fu-Go, Luglio 1941)',
            "Occupazione militare giapponese dell'intera Indocina francese completata a fine luglio 1941 (Operazione Fu-Go, 28 luglio 1941) e impiegata nel dicembre 1941 come piattaforma d'attacco dell'Esercito Meridionale giapponese (Gen. Hisaichi Terauchi) contro la Malesia britannica e la Thailandia.",
            'Asse',
            "Impero Giapponese — Gruppo d'Armate di Spedizione Meridionale (Saigon) / Amministrazione Subordinata Vichy"
          );
        }
        if (vicKey === 'VIC_IND' && s >= 7) {
            return makeResult(
              'VIC_IND',
              vicTop.name || `${lbl} (Vichy — Stazionamento Militare Giapponese nel Tonchino)`,
              'Accordo franco-giapponese di Hanoi (22 settembre 1940): stazionamento della 5ª Divisione dell\'Esercito Imperiale Giapponese nel Tonchino settentrionale (Lạng Sơn, Haiphong) sotto l\'amministrazione Vichy dell\'Ammiraglio Jean Decoux.',
              'Fantoccio',
              'Gouvernement Général de l\'Indochine (Amiral Jean Decoux — Vichy / Stazionamento Imperiale Giapponese)'
            );
          }
          return makeResult(
            vicKey,
            vicTop.name || `${lbl} (Vichy)`,
            vicTop.note || 'Amministrazione coloniale sotto l\'autorità di Vichy',
            'Fantoccio',
            vicTop.adminTitle || 'Administration coloniale de Vichy'
          );
        }
        const fTop = getTop(t);
        return makeResult(t, fTop.name || lbl, fTop.note, undefined, fTop.adminTitle);
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
      if (UK_COL[cntr]) {
        if (s >= 9 && (cntr === 'HK' || cntr === 'HKG' || nrm.includes('hong kong'))) {
          return makeResult(
            'JAP',
            'Honkon Senryōchi (Hong Kong — Occupazione Imperiale Giapponese)',
            'Battaglia di Hong Kong (8-25 dicembre 1941): dopo 18 giorni di combattimenti nei Nuovi Territori, a Kowloon e sull\'isola di Hong Kong contro la 38ª Divisione giapponese, il Governatore Sir Mark Young si arrende nel "Black Christmas" del 25 dicembre 1941.',
            'Asse',
            'Dai Nippon Teikoku — Honkon Senryōchi Sōtokubu (Ten. Gen. Rensuke Isogai)'
          );
        }
        const ukTop = getTop('UK');
        return makeResult(
          'UK',
          ukTop.name || UK_COL[cntr],
          ukTop.note || 'Colonia della Corona, protettorato o mandato della Corona Britannica',
          s >= 4 ? 'Alleati' : 'Neutrale',
          ukTop.adminTitle || 'British Empire (Overseas Territories)'
        );
      }
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
        const usaTop = getTop('USA');
        return makeResult(
          'USA',
          usaTop.name || USA_COL[cntr],
          usaTop.note || 'Stati Uniti d\'America',
          'Alleati',
          usaTop.adminTitle || 'United States of America'
        );
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
