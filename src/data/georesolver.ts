import { toCanonicalCountryCode } from './countryCodes';
import { getGreeceFirstPhaseContextNote } from './greeceCivilWarTimeline';
import { resolveIranProvince } from './iranProvinces';
import { resolveEthiopiaProvince, ETHIOPIA_ADM1_IDS } from './ethiopiaProvinces';
import { resolveThailandProvince, THAILAND_ADM1_IDS } from './thailandProvinces';
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
  isFrenchPacificProvince,
  resolveFrenchPacificProvince,
} from './frenchPacificProvinces';
import {
  isCyprusProvince,
  resolveCyprusProvince,
} from './cyprusProvinces';
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
  resolveFrenchCoastalPocket,
  FRENCH_COASTAL_POCKET_IDS,
} from './franceProvinces';
import {
  resolveNorwayProvince,
  resolveDenmarkProvince,
} from './nordicProvinces';
import {
  resolveUKProvince,
  UK_PROVINCES_META,
} from './ukProvinces';
import {
  resolveItalyProvince,
  findItalyProvinceMeta,
  IT_PROVINCES_META,
} from './italyProvinces';
import { resolveItalyExtendedStep } from './italyTimelineExtension';
import {
  resolveSpainProvince,
  resolveSpanishAfricanTerritory,
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

function resolveTangierZone(s: number): ResolvedTerritory {
  if (s >= 23) {
    return makeResult(
      'TANGER',
      'Zone Internationale de Tanger (Statut de 1945 — Porto Franco Internazionale)',
      "Porto franco bancario, commerciale e diplomatico sullo Stretto di Gibilterra sotto il Comitato di Controllo (Francia, Regno Unito, USA, Spagna, Italia riammessa nel 1948, Belgio, Paesi Bassi, Portogallo), amministrato da H. F. L. K. van Vredenburch. Sede di Radio Tanger e crescente fermento nazionalista dell'Istiqlal verso l'indipendenza marocchina.",
      'Neutrale',
      'Zone Internationale de Tanger (Comité de Contrôle)'
    );
  }
  if (s >= 21) {
    return makeResult(
      'TANGER',
      'Zone Internationale de Tanger (Riammissione Italiana & Polo Franco)',
      "Nell'estate 1948 il diplomatico olandese H. F. L. K. van Vredenburch assume l'amministrazione della Zona Internazionale, mentre l'Italia viene riammessa nel Comitato di Controllo dopo la parentesi bellica. Tangeri si afferma come piazza finanziaria franca e snodo di traffico mediterraneo-atlantico.",
      'Neutrale',
      'Zone Internationale de Tanger (Comité de Contrôle)'
    );
  }
  if (s >= 19) {
    return makeResult(
      'TANGER',
      'Zone Internationale de Tanger (Discorso di Tangeri — Mohammed V)',
      "Il 10 aprile 1947 il Sultano del Marocco Mohammed V pronuncia a Tangeri lo storico discorso pubblico davanti ai delegati dell'Istiqlal e alle potenze del Comitato di Controllo, rivendicando l'unità territoriale e l'indipendenza del Marocco e aprendo un duro braccio di ferro diplomatico con il Residente Generale francese Alphonse Juin.",
      'Neutrale',
      'Zone Internationale de Tanger (Comité de Contrôle)'
    );
  }
  if (s >= 18) {
    return makeResult(
      'TANGER',
      'Zone Internationale de Tanger (Amministrazione Internazionale Restaurata)',
      "In base all'Accordo di Parigi del 31 agosto 1945, le truppe spagnole evacuano Tangeri l'11 ottobre 1945 e viene restaurato il regime internazionale provvisorio sotto l'amministratore portoghese Luís Magalhães Correia e il Comitato di Controllo.",
      'Neutrale',
      'Zone Internationale de Tanger (Comité de Contrôle)'
    );
  }
  if (s >= 14) {
    return makeResult(
      'SPA',
      'Tánger (Zona Ocupada por España — Chiusura Consolato Tedesco)',
      "In base all'accordo anglo-statunitense con Madrid del maggio 1944 (Accordo sul Wolframio / Tangeri), le autorità spagnole chiudono il Consolato tedesco nella Mendoubia ed espellono gli agenti dell'Abwehr, preludio alla restituzione internazionale del 1945.",
      'Asse',
      'Ocupación Militar Española de Tánger (Alta Comisaría — Madrid)'
    );
  }
  if (s === 11 || s === 12 || s === 13) {
    return makeResult(
      'SPA',
      'Tánger (Zona Ocupada por España — Fronte Post-Torch)',
      "Dopo gli sbarchi anglo-americani dell'Operazione Torch nel vicino Marocco francese (novembre 1942), il presidio spagnolo di Tangeri mantiene stretta sorveglianza militare e doganale sotto crescente pressione diplomatica alleata per la chiusura della rete tedesca.",
      'Asse',
      'Ocupación Militar Española de Tánger (Ejército de Marruecos — Gen. Luis Orgaz)'
    );
  }
  if (s >= 8) {
    return makeResult(
      'SPA',
      'Tánger (Annessa di fatto all\'Alta Comisaría — Centro Spionaggio)',
      "Incorporata al Protettorato spagnolo (Legge spagnola del 23 novembre 1940), Tangeri ospita dal marzo 1941 il Consolato Generale del Terzo Reich nella Mendoubia, trasformandosi nel principale epicentro di spionaggio navale dell'Abwehr sullo Stretto e snodo di intelligence alleata.",
      'Asse',
      'Administración Española de Tánger (Alta Comisaría de España en Marruecos)'
    );
  }
  if (s === 7) {
    return makeResult(
      'SPA',
      'Tánger (Scioglimento Statuto Internazionale — Nov 1940)',
      "Nel novembre 1940 il governo spagnolo scioglie il Comité de Contrôle, l'Assemblea Legislativa Internazionale e la Gendarmeria mista, sostituendo la peseta e le autorità coloniali all'amministrazione internazionale sullo Stretto.",
      'Asse',
      'Ocupación Militar Española de Tánger (Col. Antonio Yuste Segura)'
    );
  }
  if (s >= 6) {
    return makeResult(
      'SPA',
      'Tánger (Zona Ocupada por España — 14 Giugno 1940)',
      "Il 14 giugno 1940, giorno dell'ingresso tedesco a Parigi, truppe coloniali spagnole (Mehal-la Jalifiana e Regulares da Ceuta e Tetuán) al comando del Col. Antonio Yuste occupano la Zona Internazionale di Tangeri per assicurarne la neutralità sotto controllo di Madrid.",
      'Asse',
      'Ocupación Militar Española (Col. Antonio Yuste Segura — 14 de junio de 1940)'
    );
  }
  return makeResult(
    'TANGER',
    'Zone Internationale de Tanger',
    'Administration Internationale (Statut de Tanger de 1923 — zone démilitarisée et neutre)',
    'Neutrale',
    'Zone Internationale de Tanger (Comité de Contrôle)'
  );
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

/**
 * Risoluzione Geostorica e Toponomastica Dinamica della Groenlandia (1936-1943+)
 * Step 0-5 (Marzo 1936 - Maggio 1940): Colonia autonoma del Regno di Danimarca (DEN, Neutrale).
 * Step 6-7 (Giugno 1940 - Marzo 1941): Autogoverno di Godhavn (Eske Brun/Kauffmann) e Protezione Monroe USA (DEN, Neutrale).
 * Step 8 (Aprile 1941): Trattato di Washington Kauffmann-Hull — Protettorato Militare USA (USA, Alleati).
 * Step 9-12 (Dicembre 1941 - Luglio 1943+): Basi Aeronavali Alleate & Guerra del Meteo nell'Artico (USA, Alleati).
 */
/**
 * Risoluzione Geostorica Territorio Libero di Trieste (TLT / FTT) — Zona B
 * 1. Settore Settentrionale (SI_HIST_KOPER): Capodistria, Isola d'Istria, Pirano.
 * 2. Settore Meridionale (HR_HIST_BUIE): Buie d'Istria, Umago, Cittanova d'Istria, Grisignana.
 */
/**
 * Risoluzione Geostorica La Réunion (RE_REUNION & FRY40)
 * s0..5: FRA (Colonie) -> s6..10: VIC (Vichy) -> s11+: FRA (Ralliement France Libre 28 Nov 1942)
 */
export function resolveReunion(s: number): ResolvedTerritory {
  if (s >= 11) {
    return makeResult(
      'FRA',
      s >= 19
        ? 'La Réunion (Département d\'outre-mer — Saint-Denis)'
        : 'La Réunion (Ralliement alla France Libre — 28 Novembre 1942)',
      'Il 28 novembre 1942 il cacciatorpediniere Léopard delle Forze Navali Francesi Libere (FNFL) sbarca a Saint-Denis; la guarnigione di Vichy si arrende e l\'isola si unisce alla Francia combattente sotto il Governatore André Capagorry.',
      'Alleati',
      'France Libre / CFLN (Gouverneur André Capagorry, Saint-Denis)'
    );
  }
  if (s >= 6) {
    return makeResult(
      'VIC',
      'La Réunion (Régime de Vichy — Saint-Denis)',
      'Territoire d\'outre-mer sous le contrôle du régime de Vichy (Gouverneur Pierre Émile Aubert)',
      'Fantoccio',
      'Administration coloniale de Vichy (Gouverneur Pierre Émile Aubert)'
    );
  }
  return makeResult(
    'FRA',
    'Colonie de La Réunion (Saint-Denis)',
    'Colonie française de l\'Océan Indien',
    'Neutrale',
    'Colonie de La Réunion — Ministère des Colonies'
  );
}

export function resolveKoperZoneB(s: number): ResolvedTerritory {
  if (s >= 18) {
    const fac: FactionType = s >= 21 ? 'Neutrale' : s >= 19 ? 'Comintern' : 'Alleati';
    const note =
      s >= 21
        ? 'Primo semestre 1948: Belgrado e Mosca respingono la Dichiarazione Tripartita occidentale del 20 marzo 1948 sul ritorno del TLT all\'Italia. Nella Zona B (Capodistria, Isola, Pirano) la VUJA del Gen. Mirko Lenac accelera il distacco economico introducendo la Jugo-lira/dinaro; il 28 giugno 1948 la rottura Tito–Stalin spacca il PCTLT e spinge la Jugoslavia fuori dal Cominform, rafforzando il presidio militare jugoslavo lungo il confine di Rabuiese.'
        : s === 20
        ? 'Dicembre 1947: stallo al Consiglio di Sicurezza ONU sulla nomina del Governatore del Territorio Libero di Trieste. Restando inattuato lo Statuto Permanente (Allegato VI), la fascia costiera da Capodistria a Pirano resta sotto il Regime Provvisorio (Allegato VII) amministrato militarmente dalla VUJA jugoslava.'
        : s === 19
        ? 'Trattato di Pace di Parigi (15 settembre 1947): istituzione formale del Territorio Libero di Trieste (TLT / FTT) in Regime Provvisorio (Allegato VII) in attesa della nomina (mai avvenuta) del Governatore ONU; la fascia costiera da Capodistria a Pirano e Isola d\'Istria forma il settore nord della Zona B sotto amministrazione militare jugoslava (VUJA).'
        : 'Accordo di Belgrado (9 giugno 1945) e Accordo di Duino (20 giugno 1945 — Linea Morgan): la fascia costiera settentrionale da Capodistria a Pirano e Isola d\'Istria costituisce il settore nord della Zona B amministrato militarmente dall\'Esercito Jugoslavo (VUJA).';
    return makeResult(
      s >= 19 ? 'VUJA' : 'DFJ',
      s >= 19
        ? 'Territorio Libero di Trieste — Zona B (Capodistria / Slovenska Istra — VUJA)'
        : 'Zona B del Territorio di Trieste (Capodistria / Slovenska Istra — Amministrazione Militare Jugoslava VUJA)',
      note,
      fac,
      s >= 21
        ? 'Territorio Libero di Trieste — Zona B (Vojna Uprava Jugoslovenske Armije — Gen. Mirko Lenac)'
        : 'Territorio Libero di Trieste — Zona B (Vojna Uprava Jugoslovenske Armije — VUJA)'
    );
  }
  if (s >= 13) {
    return makeResult(
      'OZAK',
      'Capodistria / Koper (Operationszone Adriatisches Küstenland)',
      'Operazione Achse (settembre 1943): all\'indomani dell\'armistizio italiano, l\'Istria settentrionale viene occupata dalla Wehrmacht e incorporata nella Zona d\'Operazioni del Litorale Adriatico (OZAK) sotto il Supremo Commissario Friedrich Rainer.',
      'Asse',
      'Operationszone Adriatisches Küstenland (OZAK — Friedrich Rainer)'
    );
  }
  return makeResult(
    'ITA',
    'Provincia di Pola / Trieste — Circondario di Capodistria',
    'Regno d\'Italia — Trattato di Rapallo (1920). Territorio italiano della Venezia Giulia (Capodistria, Isola d\'Istria, Pirano).',
    s >= 7 ? 'Asse' : 'Neutrale',
    'Regno d\'Italia — Prefettura di Pola / Trieste'
  );
}

export function resolveBuieZoneB(s: number): ResolvedTerritory {
  if (s >= 18) {
    const fac: FactionType = s >= 21 ? 'Neutrale' : s >= 19 ? 'Comintern' : 'Alleati';
    const note =
      s >= 21
        ? 'Primo semestre 1948: dopo il rigetto della Dichiarazione Tripartita occidentale del 20 marzo 1948, la VUJA consolida il controllo militare ed economico sul Buiese (Buie, Umago, Cittanova d\'Istria), mentre la rottura Tito–Stalin del 28 giugno 1948 isola la Jugoslavia dal Cominform e inasprisce la pressione sui residenti italiani lungo il confine del Quieto.'
        : s === 20
        ? 'Dicembre 1947: il veto al Consiglio di Sicurezza ONU sulla scelta del Governatore blocca l\'entrata in vigore dello Statuto Permanente; nel Buiese vige il Regime Provvisorio (Allegato VII) sotto amministrazione militare jugoslava (VUJA) con crescente esodo verso Trieste.'
        : s === 19
        ? 'Trattato di Pace di Parigi (15 settembre 1947): il Buiese (Buie d\'Istria, Umago, Cittanova d\'Istria, Grisignana e Verteneglio a nord del Quieto) forma il settore meridionale della Zona B del TLT / FTT sotto Regime Provvisorio (Allegato VII) amministrato dalla VUJA jugoslava.'
        : 'Accordo di Belgrado (9 giugno 1945) e Accordo di Duino (20 giugno 1945 — Linea Morgan): il Buiese (Buie d\'Istria, Umago, Cittanova d\'Istria, Grisignana e Verteneglio a nord del Quieto) costituisce il settore meridionale della Zona B sotto amministrazione militare jugoslava (VUJA).';
    return makeResult(
      s >= 19 ? 'VUJA' : 'DFJ',
      s >= 19
        ? 'Territorio Libero di Trieste — Zona B (Buie e Umago / Buiese — VUJA)'
        : 'Zona B del Territorio di Trieste (Buie e Umago / Buiese — Amministrazione Militare Jugoslava VUJA)',
      note,
      fac,
      s >= 21
        ? 'Territorio Libero di Trieste — Zona B (Vojna Uprava Jugoslovenske Armije — Gen. Mirko Lenac)'
        : 'Territorio Libero di Trieste — Zona B (Vojna Uprava Jugoslovenske Armije — VUJA)'
    );
  }
  if (s >= 13) {
    return makeResult(
      'OZAK',
      'Buie e Umago (Operationszone Adriatisches Küstenland)',
      'Settembre 1943: occupazione tedesca della penisola istriana e inclusione del distretto del Buiese nella Zona d\'Operazioni del Litorale Adriatico (OZAK) sotto amministrazione militare della Wehrmacht e della Polizia d\'Ordine.',
      'Asse',
      'Operationszone Adriatisches Küstenland (OZAK — Friedrich Rainer)'
    );
  }
  return makeResult(
    'ITA',
    'Provincia di Pola — Distretto di Buie',
    'Regno d\'Italia — Trattato di Rapallo (1920). Mandamento di Buie d\'Istria, Umago e Cittanova.',
    s >= 7 ? 'Asse' : 'Neutrale',
    'Regno d\'Italia — Prefettura di Pola'
  );
}

export function resolveGreenland(s: number, rawName?: string): ResolvedTerritory {
  if (s <= 5) {
    return makeResult(
      'DEN',
      'Grønland (Kongeriget Danmark — Landsfoged Nord- og Sydgrønland)',
      'Colonia e territorio d\'oltremare del Regno di Danimarca retta dai Landsfogeder Aksel Svane (Sydgrønland, Godthåb/Nuuk) ed Eske Brun (Nordgrønland, Godhavn/Qeqertarsuaq) sotto re Cristiano X. Rigorosa neutralità diplomatica; monopolio commerciale statale del KGH e fondamentale miniera di criolite a Ivittuut (minerale insostituibile come fondente elettrolitico per la produzione di alluminio bellico).',
      'Neutrale',
      'Kongeriget Danmark — Styrelsen af Kolonierne i Grønland (Godthåb / Nuuk)'
    );
  }

  if (s <= 7) {
    return makeResult(
      'DEN',
      'Grønland (Amministrazione Autonoma — Danimarca Libera & Protezione Monroe)',
      'A seguito dell\'occupazione tedesca della Danimarca metropolitana (Operazione Weserübung, 9 aprile 1940), i governatori Eske Brun e Aksel Svane e l\'ambasciatore a Washington Henrik Kauffmann rifiutano ogni sottomissione al governo controllato dalla Wehrmacht a Copenaghen. Il 3 maggio 1940 a Godhavn i Consigli Regionali proclamano l\'autogoverno e invocano la protezione degli Stati Uniti d\'America ex Dottrina Monroe. La US Coast Guard assume il pattugliamento delle acque territoriali e protegge la miniera di Ivittuut, aprendo un consolato a Godthåb.',
      'Neutrale',
      'Grønlands Selvstyrelse (Landsfogeder Eske Brun & Aksel Svane) & Ambasciata Danese a Washington (Henrik Kauffmann)'
    );
  }

  if (s === 8) {
    return makeResult(
      'USA',
      'Grønland (Protettorato Militare USA — Accordo di Washington del 9 Aprile 1941)',
      'Il 9 aprile 1941 l\'ambasciatore danese Henrik Kauffmann firma con il Segretario di Stato USA Cordell Hull lo storico Accordo di Difesa della Groenlandia: gli Stati Uniti assumono la difesa militare dell\'isola e avviano i cantieri per le basi aeree strategiche Bluie West One (Narsarsuaq) e Bluie East Two (Ikateq). Il governo collaborazionista di Copenaghen dichiara Kauffmann colpevole di alto tradimento, ma il presidente Roosevelt rigetta l\'atto confermando Kauffmann quale legittimo rappresentante della Danimarca Libera.',
      'Alleati',
      'United States Army & US Coast Guard Greenland Patrol (Comando Basi Nord Atlantico / Henrik Kauffmann)'
    );
  }

  if (s >= 19) {
    return makeResult(
      'DEN',
      'Grønland (Kongeriget Danmark — Re Federico IX & Accordi Difensivi Artici)',
      'Sovranità civile danese pienamente ristabilita su tutta la Groenlandia sotto Re Federico IX (asceso al trono nell\'aprile 1947). Pur restando territorio del Regno di Danimarca (Amministrazione Eske Brun / Axel Svane a Godthåb), gli Stati Uniti mantengono il presidio aeronavale strategico sulle basi di Narsarsuaq (Bluie West One) e Søndre Strømfjord nel quadro dei negoziati sul Trattato di Difesa del 1941.',
      'Alleati',
      'Kongeriget Danmark — Grønlands Styrelse (Godthåb / Nuuk) & US Air Bases (Narsarsuaq)'
    );
  }

  if (s === 18) {
    return makeResult(
      'DEN',
      'Grønland (Restaurazione Sovranità Danese & Smobilitazione Postbellica)',
      'Dopo la liberazione della Danimarca (maggio 1945) e la revoca della dichiarazione d\'emergenza bellica, il Governo danese ristabilisce la piena autorità costituzionale sulla Groenlandia (Landsfogeder Eske Brun e Aksel Svane) pur proseguendo le conversazioni con Washington sulla presenza militare USA nelle basi artiche.',
      'Alleati',
      'Kongeriget Danmark — Grønlands Styrelse (Godthåb / Nuuk)'
    );
  }

  return makeResult(
    'USA',
    'Grønland (Basi Aeronavali Alleate & Pattuglia Slitte — Guerra dell\'Artico)',
    'Con l\'entrata in guerra degli Stati Uniti, la Groenlandia diviene il cardine aeronavale per il transito e traghettamento (ferry flights) di migliaia di bombardieri e caccia alleati verso la Gran Bretagna e per la scorta ai convogli polari verso Murmansk. La Nordøstgrønlands Slædepatrulje (pattuglia slitte danese-inuit di Eske Brun) perlustra centinaia di chilometri di banchisa e neutralizza le stazioni meteorologiche clandestine della Wehrmacht (Unternehmen Holzauge a Sabine Island, distrutta nel maggio 1943 dai bombardieri USA di Bluie East Two).',
    'Alleati',
    'US Army Air Forces (North Atlantic Division) & Grønlands Landsfoged (Eske Brun)'
  );
}

/**
 * Risoluzione Geostorica e Toponomastica Dinamica delle Svalbard (1936-1943+)
 * Step 0-5 (Marzo 1936 - Maggio 1940): Sovranità norvegese, smilitarizzazione e miniere di carbone (Store Norske & Arktikugol). (NOR, Neutrale).
 * Step 6-8 (Giugno 1940 - Aprile 1941): Isolamento artico non occupato, autogoverno civile e cooperazione norvegese-sovietica. (NOR, Neutrale).
 * Step 9 (Dicembre 1941): Operazione Gauntlet — Evacuazione alleata (sovietici e norvegesi) e sabotaggio miniere di carbone. (NOR, Alleati).
 * Step 10-12 (Agosto 1942 - Luglio 1943+): Guarnigione della Norvegia Libera a Barentsburg (Operazioni Fritham & Gearbox) e difesa convogli artici alleati. (NOR, Alleati).
 */
export function resolveSvalbard(s: number, rawName?: string): ResolvedTerritory {
  if (s <= 5) {
    return makeResult(
      'NOR',
      'Svalbard (Kongeriket Norge — Longyearbyen & Barentsburg)',
      'Arcipelago artico regolato dal Trattato delle Svalbard del 1920 (sovranità norvegese con clausole di smilitarizzazione e parità di diritti economici). Polo estrattivo carbonifero imperniato sulla Store Norske Spitsbergen Kulkompani a Longyearbyen e Sveagruva e sulle concessioni sovietiche del trust statale Arktikugol a Barentsburg e Grumant, con circa 2.000 minatori sovietici e 900 norvegesi. Rigorosa neutralità diplomatica.',
      'Neutrale',
      'Kongeriket Norge — Sysselmannen på Svalbard (Wolmer Marlow / Longyearbyen)'
    );
  }

  if (s <= 8) {
    return makeResult(
      'NOR',
      'Svalbard (Amministrazione Civile Autonoma Norvegese-Sovietica)',
      'All\'invasione tedesca della Norvegia continentale (Operazione Weserübung, aprile-giugno 1940), le Svalbard rimangono non occupate e isolate dalla Wehrmacht grazie alla loro posizione polare. Il Sysselmann Wolmer Marlow preserva l\'amministrazione civile e la cooperazione pacifica con la numerosa comunità mineraria sovietica di Barentsburg; la stazione radio di Longyearbyen trasmette dati meteorologici essenziali per la navigazione artica.',
      'Neutrale',
      'Sysselmannen på Svalbard (Wolmer Marlow) & Direzione Sovietica Arktikugol (Barentsburg)'
    );
  }

  if (s === 9) {
    return makeResult(
      'NOR',
      'Svalbard (Operazione Gauntlet — Evacuazione Alleata & Sabotaggio Miniere)',
      'Tra agosto e settembre 1941, dopo l\'invasione dell\'URSS, una forza di spedizione combinata canadese, britannica e della Norvegia Libera (Operazione Gauntlet, brigadiere Arthur Potts) sbarca a Spitsbergen. Vengono evacuati in sicurezza 2.000 cittadini sovietici verso Arcangelo e 800 norvegesi in Gran Bretagna; 450.000 tonnellate di carbone e gli impianti d\'estrazione vengono sistematicamente distrutti e incendiati per negarli alla Kriegsmarine.',
      'Alleati',
      'Allied Expeditionary Force (Canadian, British & Free Norwegian Troops — Brig. Arthur Potts)'
    );
  }

  return makeResult(
    'NOR',
    'Svalbard (Guarnigione della Norvegia Libera — Operazioni Fritham & Gearbox)',
    'A partire dal maggio-luglio 1942 le forze della Norvegia Libera (Norges Frie Styrker) rioccupano l\'arcipelago (Operazioni Fritham e Gearbox). Nonostante l\'affondamento iniziale delle navi Isbjørn e Selis sotto attacco aereo tedesco, la guarnigione norvegese si fortifica a Barentsburg e Longyearbyen con batterie contraeree Bofors e cannoni costieri, fungendo da postazione meteorologica e base di soccorso per i convogli artici alleati (serie PQ/JW verso Murmansk). Respinge i raid della Kriegsmarine (tra cui l\'incursione navale della Tirpitz del settembre 1943).',
    'Alleati',
    'Den Norske Garnison på Svalbard (Barentsburg / Longyearbyen — Norske Hær & Royal Navy)'
  );
}

/**
 * Risoluzione Geostorica e Toponomastica Dinamica di Jan Mayen (1936-1943+)
 */
export function resolveJanMayen(s: number, rawName?: string): ResolvedTerritory {
  if (s <= 5) {
    return makeResult(
      'NOR',
      'Jan Mayen (Kongeriket Norge — Stazione Meteorologica Artica)',
      'Isola vulcanica desolata e rocciosa nell\'Oceano Artico tra Norvegia e Groenlandia, dominata dal ghiacciaio del vulcano Beerenberg. Sede strategica di una stazione meteorologica norvegese vitale per le previsioni marittime nel Nord Atlantico.',
      'Neutrale',
      'Kongeriket Norge — Norsk Meteorologisk Institutt (Jan Mayen)'
    );
  }

  return makeResult(
    'NOR',
    'Jan Mayen (Stazione Meteo della Norvegia Libera — Norges Frie Styrker)',
    'Nonostante i ripetuti tentativi di incursione della Luftwaffe, l\'isola artica viene presidiata e difesa da un distaccamento di sciatori e operatori radio delle forze della Norvegia Libera (Norges Frie Styrker), continuando a trasmettere ininterrottamente bollettini meteorologici segreti alla Royal Navy per tutta la guerra.',
    'Alleati',
    'Norges Frie Styrker — Secret Arctic Weather Station (Olonkinbyen)'
  );
}

/**
 * Risoluzione Geostorica e Toponomastica Dinamica dell'Islanda (1936-1947)
 *
 * Step 0-5 (Gennaio 1936 - Settembre 1939):
 *   Regno d'Islanda (Konungsríkið Ísland), stato sovrano e indipendente dall'Atto di Unione del 1° dicembre 1918
 *   in unione personale con la Corona di Danimarca sotto re Cristiano X (Kristján X). (ICE, Neutrale).
 *
 * Step 6-8 (Giugno 1940 - Aprile 1941):
 *   Operazione Fork (10 maggio 1940): occupazione preventiva britannica (Force Sturges / 49th Division) e Base Falcon a Hvalfjörður. (UK, Alleati).
 *
 * Step 9-13 (Dicembre 1941 - Settembre 1943):
 *   Operazione Indigo (7 luglio 1941): presidio difensivo USA (Task Force 19/24, NOB Cacapon a Hvalfjörður, Meeks Field a Keflavík),
 *   Reggenza di Sveinn Björnsson e boom "Blessað stríðið". (USA, Alleati).
 *
 * Step 14 (Giugno 1944):
 *   Dopo il plebiscito del 20–23 maggio 1944 (oltre 97% per la Repubblica) l'Alþingi prepara la proclamazione del 17 giugno a Þingvellir,
 *   mentre il dispositivo aeronavale USA copre il varco GIUK e le rotte atlantiche durante Overlord. (USA, Alleati).
 *
 * Step 15-17 (Agosto 1944 - Aprile 1945):
 *   Proclamata il 17 giugno 1944 la Repubblica d'Islanda (Lýðveldið Ísland — Presidente Sveinn Björnsson), stato sovrano neutrale
 *   che non dichiara guerra all'Asse pur ospitando fino alla fine delle ostilità il presidio difensivo provvisorio USA a Keflavík/Hvalfjörður. (ICE, Neutrale).
 *
 * Step 18 (Settembre 1945):
 *   Fine della WWII: smobilitazione progressiva della base navale di Hvalfjörður e rifiuto islandese alla richiesta USA di basi permanenti novantanovennali. (ICE, Neutrale).
 *
 * Step 19 (Settembre 1947):
 *   Accordo di Keflavík (7 ottobre 1946): ritiro integrale del personale militare USA completato entro aprile 1947 e passaggio dell'aeroporto
 *   di Keflavík all'amministrazione civile islandese (assistenza tecnica AOA); ingresso all'ONU (novembre 1946) e modernizzazione postbellica. (ICE, Neutrale).
 */
export function resolveIceland(s: number, nid?: string, rawName?: string): ResolvedTerritory {
  const normNid = String(nid || '').trim().toUpperCase();
  const nrm = String(rawName || '').toLowerCase();
  const isReykjavik = normNid === 'IS001' || (!normNid.startsWith('IS002') && (nrm.includes('reykjavik') || nrm.includes('höfuðborg') || nrm.includes('hofudborg')));
  const isRural = normNid === 'IS002' || nrm.includes('landsbyggð') || nrm.includes('landsbyggd') || nrm.includes('akureyri') || nrm.includes('hvalfjordur') || nrm.includes('keflavik');

  // FASE 1: Step 0-5 (1936 - Settembre 1939) -> Regno d'Islanda sovrano neutrale in unione con la Danimarca
  if (s <= 5) {
    if (isRural) {
      return makeResult(
        'ICE',
        'Landsbyggð (Islanda Rurale, Fiordi & Akureyri)',
        'Vasto territorio rurale del Regno d\'Islanda comprendente i fiordi occidentali (Vestfirðir), la costa settentrionale con Akureyri, i fiordi orientali (Seyðisfjörður) e la penisola di Reykjanes. Economia agricolo-pastorale di ovini e pesca d\'altura del merluzzo e delle aringhe; totale assenza di fortificazioni e basi militari conformemente alla neutralità perpetua costituzionale sancita dall\'Atto di Unione con la Danimarca del 1918.',
        'Neutrale',
        'Konungsríkið Ísland — Distretti rurali e fiordi costieri (Unione Personale Re Christian X)'
      );
    }
    return makeResult(
      'ICE',
      isReykjavik ? 'Höfuðborgarsvæði (Reykjavík — Capitale del Regno d\'Islanda)' : 'Regno d\'Islanda (Konungsríkið Ísland — Neutralità Costituzionale)',
      'Capitale e cuore politico del Regno d\'Islanda (Konungsríkið Ísland), stato sovrano e indipendente dall\'Atto di Unione del 1° dicembre 1918 in unione personale con la Corona di Danimarca sotto re Cristiano X (Kristján X). Sede del parlamento millenario dell\'Alþingi e del Primo Ministro Hermann Jónasson (Framsóknarflokkurinn / Partito Progressista). Politica di rigorosa neutralità perpetua e disarmata (ævarandi hlutleysi); sicurezza marittima affidata esclusivamente ai piccoli pattugliatori civili della Guardia Costiera (Landhelgisgæslan). A settembre 1939 il governo respinge categoricamente ogni richiesta tedesca della Lufthansa di acquisire diritti di scalo aereo o basi navali per preservare l\'integrità neutrale.',
      'Neutrale',
      'Konungsríkið Ísland — Hovedstad (Unione Personale Re Christian X / Alþingi)'
    );
  }

  // FASE 2: Step 6-8 (Giugno 1940 - Aprile 1941) -> Operazione Fork e Occupazione Britannica
  if (s <= 8) {
    if (isRural) {
      return makeResult(
        'UK',
        'Landsbyggð (Base Navale Falcon a Hvalfjörður & Pattugliamento Nord Atlantico)',
        'In seguito allo sbarco britannico, la Royal Navy stabilisce la base navale fortificata "Falcon" nelle acque profonde e riparate di Hvalfjörður (a nord di Reykjavík), munita di reti parasiluri e depositi di carburante per corazzate, incrociatori e scorte di convoglio. Postazioni di avvistamento, idrovolanti e stazioni radiogoniometriche britanniche vengono dislocate ad Akureyri, Seyðisfjörður e Ísafjörður per dare la caccia agli U-Boot della Kriegsmarine nel varco GIUK.',
        'Alleati',
        'Royal Navy Base Falcon (Hvalfjörður) & Northern Patrol (Akureyri / Seyðisfjörður)'
      );
    }
    return makeResult(
      'UK',
      isReykjavik ? 'Höfuðborgarsvæði (Reykjavík — Operazione Fork / Occupazione Britannica)' : 'Islanda (Operazione Fork — Occupazione Preventiva Britannica)',
      'Il 10 maggio 1940, dopo l\'invasione tedesca della Danimarca e in concomitanza con l\'attacco alla Francia, il nuovo governo di Winston Churchill lancia l\'Operazione Fork (Aðgerðin Fork): la Royal Navy e i Royal Marines del colonnello Robert Sturges sbarcano a sorpresa nel porto di Reykjavík per prevenire un colpo di mano della Germania nazista nello strategico varco GIUK (Groenlandia-Islanda-Regno Unito). L\'Alþingi e il premier Hermann Jónasson protestano per la violazione della neutralità ma invitano la popolazione alla calma, qualificando le truppe alleate come "ospiti" (gestir). La guarnigione britannica viene potenziata con la 49ª Divisione di Fanteria (West Riding "The Polar Bears") del Magg. Gen. Henry Curtis, che avvia la costruzione dell\'aeroporto di Reykjavík e della base aerea di Kaldaðarnes.',
      'Alleati',
      'British Occupation of Iceland (Force Sturges & 49th West Riding Division "The Polar Bears")'
    );
  }

  // FASE 3: Step 9-13 (Dicembre 1941 - Settembre 1943) -> Presidio e Difesa USA, Meeks Field Keflavík, Reggenza Sveinn Björnsson e Blessað stríðið
  if (s <= 13) {
    if (isRural) {
      return makeResult(
        'USA',
        'Landsbyggð (Basi Aeronavali USA — Meeks Field / Keflavík & Base Navale Cacapon a Hvalfjörður)',
        'Il genio militare e le forze aeronavali statunitensi trasformano l\'Islanda rurale nel perno strategico della Battaglia dell\'Atlantico: l\'US Army Air Forces edifica l\'immenso complesso di Meeks Field e Patterson Field nella penisola di Reykjanes (la futura Keflavík, dotata di piste in calcestruzzo per i bombardieri B-24 Liberator a lungo raggio e i caccia P-38 Lightning), mentre l\'US Navy gestisce la Naval Operating Base "Cacapon" a Hvalfjörður con la Task Force 24 dell\'ammiraglio Bristol. Da Hvalfjörður salpano e si riorganizzano le scorte per i leggendari convogli artici (serie PQ e QP) diretti ai porti sovietici di Murmansk e Arcangelo, mentre gli idrovolanti PBY Catalina chiudono il famigerato "Mid-Atlantic Gap" sterminando gli U-Boot tedeschi.',
        'Alleati',
        'United States Navy Task Force 24 & USAAF Meeks Field (Keflavík / Hvalfjörður)'
      );
    }
    return makeResult(
      'USA',
      isReykjavik ? 'Höfuðborgarsvæði (Reykjavík — Presidio e Basi USA / Reggenza Sveinn Björnsson)' : 'Islanda (Protezione Militare USA — Operazione Indigo & Reggenza Sveinn Björnsson)',
      'Il 7 luglio 1941, in base allo storico accordo di difesa negoziato dal premier Hermann Jónasson con il presidente Franklin D. Roosevelt, gli Stati Uniti assumono la difesa militare dell\'Islanda (Operazione Indigo) cinque mesi prima di Pearl Harbor. La 1st Provisional Marine Brigade del brigadiere generale John Marston sbarca a Reykjavík rilevando i contingenti britannici, seguita dalle divisioni dell\'US Army inquadrate nell\'Iceland Base Command sotto il Magg. Gen. Charles H. Bonesteel Jr. Sul piano costituzionale, il 17 giugno 1941 l\'Alþingi elegge all\'unanimità Sveinn Björnsson quale Reggente d\'Islanda (Ríkisstjóri Íslands), sancendo la separazione de facto dalla Danimarca occupata. L\'imponente flusso di dollari, le opere pubbliche, la costruzione di strade, ospedali e caserme azzerano la disoccupazione e portano una prosperità economica senza precedenti, tanto che la popolazione ribattezza quegli anni come "Blessað stríðið" (La Benedetta Guerra).',
      'Alleati',
      'United States Army & Navy Iceland Base Command (Maj. Gen. Charles H. Bonesteel Jr. / Reggenza Sveinn Björnsson)'
    );
  }

  // FASE 4: Step 14 (Giugno 1944 — Overlord & Referendum Costituzionale del 20–23 Maggio alla vigilia della Repubblica)
  if (s === 14) {
    if (isRural) {
      return makeResult(
        'USA',
        'Landsbyggð (Meeks Field Keflavík & Hvalfjörður — Supporto a Overlord / Pre-Repubblica)',
        'Giugno 1944: mentre gli idrovolanti e i B-24 statunitensi di Meeks Field (Keflavík) e la Task Force 24 a Hvalfjörður garantiscono la sicurezza meteo e antisommergibile nel Nord Atlantico durante lo sbarco in Normandia (Overlord), nei distretti rurali il plebiscito del 20–23 maggio ha appena approvato a stragrande maggioranza (97,3%) la rescissione dell\'unione con la Danimarca.',
        'Alleati',
        'United States Iceland Base Command — Keflavík / Hvalfjörður (Reggenza Sveinn Björnsson)'
      );
    }
    return makeResult(
      'USA',
      isReykjavik ? 'Höfuðborgarsvæði (Reykjavík — Vigilia della Repubblica & Difesa USA / Overlord)' : 'Islanda (Vigilia Proclamazione Repubblica — Difesa USA)',
      '6 giugno 1944: a pochi giorni dal plebiscito costituzionale del 20–23 maggio (affluenza al 98,5%, oltre il 97% favorevole alla Repubblica), Reykjavík e l\'Alþingi preparano la solenne proclamazione dell\'indipendenza a Þingvellir (17 giugno 1944) sotto la guida del Reggente Sveinn Björnsson, mentre la guarnigione statunitense dell\'Iceland Base Command coordina le rotte aeree e i convogli atlantici di Overlord.',
      'Alleati',
      'Iceland Base Command (USA) & Reggenza Sveinn Björnsson — Transizione Costituzionale'
    );
  }

  // FASE 5: Step 15-17 (Agosto 1944 - Aprile 1945) -> Repubblica d'Islanda (Lýðveldið Ísland) Sovrana Neutrale con Presidio Difensivo USA Provvisorio
  if (s <= 17) {
    if (isRural) {
      return makeResult(
        'ICE',
        'Landsbyggð (Lýðveldið Ísland — Base Aeronavale Provvisoria USA a Keflavík / Hvalfjörður)',
        'Dopo la proclamazione della Repubblica d\'Islanda (17 giugno 1944), i fiordi di Hvalfjörður e la penisola di Reykjanes con Meeks Field (Keflavík) tornano sotto piena sovranità giuridica islandese pur continuando a ospitare i contingenti aerei e di scorta USA fino alla fine della guerra in Europa in base all\'accordo difensivo provvisorio del 1941.',
        'Neutrale',
        'Lýðveldið Ísland — Sovranità Repubblicana · Concessione Bellica Provvisoria USA (Keflavík / Hvalfjörður)'
      );
    }
    return makeResult(
      'ICE',
      isReykjavik ? 'Höfuðborgarsvæði (Reykjavík — Repubblica d\'Islanda / Lýðveldið Ísland)' : 'Repubblica d\'Islanda (Lýðveldið Ísland)',
      'Il 17 giugno 1944 nella piana storica di Þingvellir è proclamata la Repubblica d\'Islanda (Lýðveldið Ísland), rompendo l\'unione personale con la Danimarca ed eleggendo Sveinn Björnsson 1° Presidente della Repubblica (governo di coalizione di Ólafur Thors dall\'ottobre 1944). Pur rimanendo formalmente neutrale senza dichiarare guerra all\'Asse, la nuova Repubblica mantiene fino alla resa tedesca la presenza difensiva provvisoria delle forze statunitensi a Keflavík e Reykjavík.',
      'Neutrale',
      'Lýðveldið Ísland — 1° Presidente Sveinn Björnsson · PM Ólafur Thors'
    );
  }

  // FASE 6: Step 18 (Settembre 1945) -> Fine della WWII, Smobilitazione Basi di Hvalfjörður & Rifiuto Basi Permanenti
  if (s === 18) {
    if (isRural) {
      return makeResult(
        'ICE',
        'Landsbyggð (Lýðveldið Ísland — Smobilitazione di Hvalfjörður & Negoziato su Keflavík)',
        'Settembre 1945: conclusa la Seconda Guerra Mondiale, la base navale USA di Hvalfjörður (NOB Cacapon) viene progressivamente smobilitata e restituita alle autorità islandesi. Nelle campagne e nei porti pescherecci il governo investe i surplus accumulati durante "Blessað stríðið" nel rinnovo della flotta da pesca (Nýsköpun) mentre l\'Alþingi respinge le prime pressioni americane per affittare a lungo termine Meeks Field / Keflavík.',
        'Neutrale',
        'Lýðveldið Ísland — Distretti Rurali & Smilitarizzazione di Hvalfjörður (Settembre 1945)'
      );
    }
    return makeResult(
      'ICE',
      isReykjavik ? 'Höfuðborgarsvæði (Reykjavík — Repubblica d\'Islanda / Fine Ostilità & Nýsköpun)' : 'Repubblica d\'Islanda (Lýðveldið Ísland — Dopoguerra 1945)',
      'Settembre 1945: a guerra finita decade la clausola di difesa bellica dell\'accordo del 1941. A Reykjavík il governo "Nýsköpunarstjórn" di Ólafur Thors avvia la ricostruzione e lo smantellamento del dispositivo militare alleato, rifiutando nell\'autunno 1945 la richiesta statunitense di mantenere basi militari permanenti per 99 anni in difesa della piena neutralità e indipendenza repubblicana.',
      'Neutrale',
      'Lýðveldið Ísland — Presidente Sveinn Björnsson · PM Ólafur Thors (Nýsköpunarstjórn)'
    );
  }

  // FASE 7: Step >= 19 (Settembre 1947) -> Accordo di Keflavík (7 Ott 1946), Ritiro Militare USA completato (Apr 1947), ONU & Alba della Guerra Fredda
  if (isRural) {
    return makeResult(
      'ICE',
      'Landsbyggð (Lýðveldið Ísland — Aeroporto Civile di Keflavík & Ricostruzione Peschereccia)',
      'Settembre 1947: in esecuzione dello storico Accordo di Keflavík (Keflavíkursamningurinn del 7 ottobre 1946), l\'esercito statunitense ha completato nell\'aprile 1947 il ritiro di tutte le forze armate in uniforme dall\'Islanda, riconsegnando l\'immenso aeroporto di Keflavík (ex Meeks Field) alla sovranità civile islandese sotto gestione tecnica temporanea della compagnia civile American Overseas Airlines (AOA) per i voli transatlantici, mentre Hvalfjörður è interamente smilitarizzato e Akureyri e i fiordi guidano la modernizzazione della flotta peschereccia.',
      'Neutrale',
      'Lýðveldið Ísland — Sovranità Civile su Keflavík & Hvalfjörður Smilitarizzato (Accordo 1946–47)'
    );
  }
  return makeResult(
    'ICE',
    isReykjavik ? 'Höfuðborgarsvæði (Reykjavík — Repubblica d\'Islanda Sovrana / Membro ONU)' : 'Repubblica d\'Islanda (Lýðveldið Ísland — Sovranità Postbellica 1947)',
    'Settembre 1947: la Repubblica d\'Islanda (Lýðveldið Ísland), ammessa alle Nazioni Unite dal novembre 1946 e priva di guarnigioni militari straniere dopo il completamento del ritiro americano nell\'aprile 1947 (Accordo di Keflavík), è governata dalla coalizione di Stefán Jóhann Stefánsson sotto la presidenza di Sveinn Björnsson. Reykjavík mantiene lo status di repubblica sovrana disarmata e neutrale pur entrando nei negoziati economici del Piano Marshall (ERP) nell\'estate 1947 alla vigilia della polarizzazione della Guerra Fredda.',
    'Neutrale',
    'Lýðveldið Ísland — Presidente Sveinn Björnsson · PM Stefán Jóhann Stefánsson (1947)'
  );
}

/**
 * RISOLUTORE DINAMICO ORIENTE AMAZONICO (ECUADOR / PERÙ)
 * Step 0-8 (1936 - Apr 1941): Status Quo di Washington del 1936 tra Ecuador e Perù (ECU, Neutrale).
 * Step 9 (Dic 1941): Guerra del 1941 — Offensiva di Zarumilla e occupazione militare peruviana del bacino fluviale (PRU, Neutrale).
 * Step 10-12 (Ago 1942 - Lug 1943+): Protocollo di Rio de Janeiro (29 Gennaio 1942) — Sovranità peruviana internazionalmente confermata su 200.000 km² (PRU, Neutrale).
 */
export function resolveEcuadorOriente(s: number, _rawName?: string): ResolvedTerritory {
  if (s < 9) {
    return makeResult(
      'ECU',
      'Oriente Amazzònico Conteso (Ecuador / Perù)',
      'Vasto bacino fluviale amazzonico dei fiumi Marañón, Pastaza, Napo e Curaray. Territorio rivendicato dall\'Ecuador in base alla Real Cédula del 1563 e conteso dal Perù, amministrato sotto lo status quo provvisorio dell\'Accordo di Washington del 1936, prima del conflitto armato del 1941 e del Protocollo di Rio de Janeiro del 1942.',
      'Neutrale',
      'Provincia del Oriente — Zona Contesa Ecuador-Perù (Maynas y Marañón)'
    );
  }
  if (s === 9) {
    return makeResult(
      'PRU',
      'Oriente Amazzonico & Maynas (Occupazione Militare Peruviana)',
      'Durante la Guerra del 1941, le truppe peruviane e le cannoniere fluviali della Marina de Guerra occupano i presidi ecuadoriani lungo il Río Napo (Rocafuerte) e il Pastaza, stabilendo il controllo totale del bacino fluviale fino alle pendici andine.',
      'Neutrale',
      'Comandancia General de Maynas (Perú) — Occupazione Militare Fluviale del Napo e Pastaza'
    );
  }
  return makeResult(
    'PRU',
    'Dipartimento di Loreto / Maynas (Sovranità Peruviana — Protocollo di Rio 1942)',
    'Territorio amazzonico di circa 200.000 km² internazionalmente riconosciuto alla sovranità del Perù con il Protocollo di Rio de Janeiro del 29 gennaio 1942, garantito da USA, Brasile, Argentina e Cile. L\'Ecuador rinuncia al controllo del Marañón.',
    'Neutrale',
    'República Peruana — Departamento de Loreto (Maynas, Marañón y Amazonas)'
  );
}

/**
 * RISOLUTORE DINAMICO REPUBBLICA DELL'ECUADOR
 * Step 0-8 (1936 - Apr 1941): Instabilità politica (Páez / Enríquez Gallo / Arroyo del Río) e contesa di frontiera (ECU, Neutrale).
 * Step 9 (Dic 1941): Crisi Bellica della Guerra del 1941 — Invasione peruviana e occupazione della provincia costiera di El Oro (ECU, Neutrale).
 * Step 10-12 (Ago 1942 - Lug 1943+): Protocollo di Rio de Janeiro, rottura con l'Asse e concessione delle basi aeronavali USA di Baltra (Galápagos / Base Beta) e Salinas (ECU, Neutrale).
 */
export function resolveEcuador(s: number, _rawName?: string): ResolvedTerritory {
  if (s < 9) {
    return makeResult(
      'ECU',
      'República del Ecuador (Quito)',
      'Fase di instabilità politica ed economica; contesa confinaria aperta con il Perù secondo lo status quo provvisorio di Washington del 1936 e presidio sovrano delle Isole Galápagos nell\'Oceano Pacifico.',
      'Neutrale',
      'República del Ecuador — Pres. Federico Páez / Carlos Arroyo del Río'
    );
  }
  if (s === 9) {
    return makeResult(
      'ECU',
      'República del Ecuador (Crisi Bellica & Occupazione di El Oro)',
      'Invasione militare peruviana a seguito della guerra scoppiata nel luglio 1941; la provincia costiera di El Oro (Machala, Puerto Bolívar) e le valli andine di Loja sono sotto occupazione peruviana. Quito affronta gravi disordini interni mentre accetta la mediazione di USA, Brasile, Argentina e Cile.',
      'Neutrale',
      'República del Ecuador — Pres. Carlos Arroyo del Río (Stato d\'Emergenza Nazionale)'
    );
  }
  return makeResult(
    'ECU',
    'República del Ecuador (Protocollo di Rio — Basi USA a Baltra & Salinas)',
    'Firma del Protocollo di Rio de Janeiro (29 gennaio 1942); rottura delle relazioni con l\'Asse. Concessione della base aerea strategica di Baltra nelle Isole Galápagos (Base Beta) e di Salinas agli Stati Uniti per la difesa del Canale di Panama contro attacchi aeronavali e sottomarini nel Pacifico.',
    'Neutrale',
    'República del Ecuador — Cooperazione Emisferica Alleata & Basi USA'
  );
}

/**
 * RISOLUTORE DINAMICO REPUBBLICA DEL PERÙ
 * Step 0-8 (1936 - Apr 1941): Governi Benavides e Prado Ugarteche, presidio di Maynas e guarnigione fluviale di Iquitos (PRU, Neutrale).
 * Step 9 (Dic 1941): Guerra del 1941 — Travolgente vittoria di Zarumilla dell\'Agrupamiento del Norte (Gen. Ureta), carri LTP e lancio paracadutisti a Puerto Bolívar (PRU, Neutrale).
 * Step 10-12 (Ago 1942 - Lug 1943+): Consolidamento del Protocollo di Rio, sgombero di El Oro, rottura con l'Asse e fornitura di materie prime strategiche agli Alleati (PRU, Neutrale).
 */
export function resolvePeru(s: number, _rawName?: string): ResolvedTerritory {
  if (s >= 22) {
    return makeResult(
      'PRU',
      'República Peruana (Giunta Militare di Governo — Gen. Manuel A. Odría, 29 Ottobre 1948)',
      'Il 27–29 ottobre 1948 la "Rivoluzione Restauratrice" partita da Arequipa sotto il generale Manuel A. Odría rovescia il presidente costituzionale José Luis Bustamante y Rivero, instaurando una Giunta Militare conservatrice e filo-occidentale che mette fuorilegge l\'APRA e il Partito Comunista.',
      'Alleati',
      'Junta Militar de Gobierno del Perú (Gen. Manuel A. Odría — dal 29 Ott 1948)'
    );
  }
  if (s < 9) {
    return makeResult(
      'PRU',
      'República Peruana (Lima)',
      'Regime autoritario e conservatore con capitale Lima; governo del generale Óscar R. Benavides (fino al 1939) e di Manuel Prado Ugarteche (dal 1939). Tensioni di confine latenti e mai sopite con l\'Ecuador per il bacino amazzonico (fiume Marañón e regione di Maynas).',
      'Neutrale',
      'República Peruana — Pres. Óscar R. Benavides / Manuel Prado Ugarteche'
    );
  }
  if (s === 9) {
    return makeResult(
      'PRU',
      'República Peruana (Vittoria di Zarumilla — Agrupamiento del Norte)',
      'Vittoria schiacciante nella Guerra del 1941 contro l\'Ecuador sotto il comando del Gen. Eloy Ureta; le forze peruviane (con carri armati leggeri ČKD LTP e il primo lancio operativo di paracadutisti militari a Puerto Bolívar) occupano la provincia di El Oro e consolidano il controllo sul Marañón; sacrificio dell\'Eroe Nazionale José Quiñones.',
      'Neutrale',
      'República Peruana — Pres. Manuel Prado Ugarteche / Gen. Eloy Ureta'
    );
  }
  return makeResult(
    'PRU',
    'República Peruana (Riconoscimento di Rio de Janeiro & Cooperazione Emisferica)',
    'Sovranità confermata sul bacino amazzonico del Marañón e Maynas in base al Protocollo di Rio (29 gennaio 1942); ritiro delle truppe da El Oro; rottura delle relazioni con le potenze dell\'Asse e fornitura massiccia di petrolio da Talara e minerali per lo sforzo bellico alleato.',
    'Neutrale',
    'República Peruana — Pres. Manuel Prado Ugarteche (Forniture Strategiche Alleate)'
  );
}

export function resolveChinaProvince(
  s: number,
  nid: string,
  p: any,
  rawName: string
): ResolvedTerritory {
  const rawHistName = p.HISTORICAL_NAME || p.NUTS_NAME || rawName;
  const pidUp = String(p?.id || p?.NUTS_ID || '').toUpperCase().trim();
  const nidUp = String(nid || '').toUpperCase().trim();
  const chnId = nidUp.startsWith('CHN_')
    ? nidUp
    : pidUp.startsWith('CHN_')
    ? pidUp
    : nidUp;
  const MANCHURIA_INNER_MONGOLIA_POSTWAR_NAMES: Record<string, string> = {
    CHN_HEILONGJIANG: 'Heilongjiang (Harbin)',
    CHN_JILIN: 'Jilin (Changchun)',
    CHN_LIAONING: 'Liaoning (Shenyang / Mukden)',
    CHN_MANCHUKUO_XINGAN_NORTH: 'Hulunbuir / Heilongjiang Occidentale (Hailar)',
    CHN_MANCHUKUO_XINGAN_SOUTH: 'Rehe / Liaoxi (Chengde & Chifeng)',
    CHN_INNER_MONGOLIA: 'Nei Mongol / Mongolia Interna (Chahar & Suiyuan)',
  };
  const histName =
    s >= 18 && MANCHURIA_INNER_MONGOLIA_POSTWAR_NAMES[chnId]
      ? MANCHURIA_INNER_MONGOLIA_POSTWAR_NAMES[chnId]
      : rawHistName;
  const nrm = normStr(nid + ' ' + (histName || '') + ' ' + (rawName || ''));

  // Step >= 19 (Settembre 1947 – Giugno 1949): Guerra Civile Cinese — Controffensiva Strategica dell'EPL (Zhanlüe Jingong)
  if (s >= 19) {
    const isDec1947 = s >= 20;
    const isJune1948 = s >= 21;
    const isDec1948 = s >= 22;
    const isJune1949 = s >= 23;
    const isDec1949 = s >= 24;
    const isJune1950 = s >= 25;
    const isDec1950 = s >= 26;
    if (isDec1950) {
      switch (chnId) {
        case 'CHN_HEILONGJIANG':
        case 'CHN_JILIN':
          return makeResult(
            'CCP_CHI',
            `${histName} (100% RPC — Base Logistica PVA sul Confine del Fiume Yalu)`,
            '31 Dicembre 1950 (100% RPC): retrovia industriale e logistica della Manciuria da cui dal 19 ottobre 1950 i Volontari del Popolo Cinese (PVA) attraversano il fiume Yalu per intervenire nella Guerra di Corea.',
            'Comintern',
            'Repubblica Popolare Cinese — Manciuria / Comando Retrovia PVA (100% RPC)'
          );
        case 'CHN_LIAONING':
          return makeResult(
            'CCP_CHI',
            'Liaoning (98% RPC · Port Arthur e Dalian Presenza Militare URSS — Fronte Logistico Yalu)',
            '31 Dicembre 1950 (98% RPC / 2% URSS): base di partenza per i PVA (Dandong / Andong sullo Yalu) verso la Corea; Port Arthur (Lüshunkou) e Dalian mantengono ancora il presidio militare sovietico in base al Trattato del 14 febbraio 1950 (restituzione prevista entro fine 1952).',
            'Comintern',
            'Repubblica Popolare Cinese (98% RPC · Escl. Port Arthur/Dalian URSS)'
          );
        case 'CHN_BEIJING':
          return makeResult(
            'CCP_CHI',
            'Beijing / Pechino (100% RPC — Capitale della Repubblica Popolare Cinese)',
            '31 Dicembre 1950 (100% RPC): capitale della Repubblica Popolare Cinese (Presidente Mao Zedong, Premier Zhou Enlai) impegnata su due fronti: intervento PVA in Corea e campagna di Chamdo sul confine tibetano.',
            'Comintern',
            'Repubblica Popolare Cinese — Capitale Beijing (100% RPC)'
          );
        case 'CHN_SICHUAN':
        case 'CHN_XIKANG':
          return makeResult(
            'CCP_CHI',
            `${histName} (100% RPC — Conquista di Chamdo & Kham Orientale fino al Salween, Ott 1950)`,
            '31 Dicembre 1950 (100% RPC): nell\'ottobre 1950 (Battaglia di Chamdo, 6–19 ottobre) la 18ª Armata dell\'EPL attraversa l\'alto Yangtze conquistando Qamdo / Chamdo e l\'intero Xikang occidentale (Kham orientale) fino al fiume Salween, aprendo la via negoziale verso Lhasa.',
            'Comintern',
            'Repubblica Popolare Cinese — Sichuan / Xikang & Chamdo (100% RPC)'
          );
        case 'CHN_ZHEJIANG':
          return makeResult(
            'CCP_CHI',
            'Zhejiang (99,5% RPC · 0,5% ROC Isole Dachen e Yijiangshan)',
            '31 Dicembre 1950 (99,5% RPC / 0,5% ROC): terraferma e arcipelago di Zhoushan interamente sotto controllo RPC; restano presidiate dalla Repubblica di Cina solo le isole di Dachen e Yijiangshan.',
            'Comintern',
            'Repubblica Popolare Cinese — Zhejiang (99,5% RPC · Dachen/Yijiangshan ROC)'
          );
        case 'CHN_FUJIAN':
          return makeResult(
            'CCP_CHI',
            'Fujian (99% RPC Terraferma · 1% ROC Kinmen / Matsu / Wuqiu)',
            '31 Dicembre 1950 (99% RPC / 1% ROC): terraferma sotto piena sovranità RPC; le enclave insulari fortificate di Kinmen (Quemoy), Matsu e Wuqiu restano sotto la Repubblica di Cina.',
            'Comintern',
            'Repubblica Popolare Cinese — Fujian (99% RPC · Kinmen/Matsu/Wuqiu ROC)'
          );
        case 'CHN_TAIWAN':
          return makeResult(
            'CHI',
            'Taiwan & Penghu (100% Repubblica di Cina — Taipei & Pattugliamento 7ª Flotta USA)',
            '31 Dicembre 1950 (100% ROC): Taiwan, Penghu e le isole costiere residue (Kinmen, Matsu, Dachen, Yijiangshan, Wuqiu) restano sotto controllo della Repubblica di Cina guidata a Taipei da Chiang Kai-shek e protette nello Stretto dalla 7ª Flotta USA.',
            'Alleati',
            'Zhōnghuá Mínguó — Governo Centrale a Taipei (100% ROC)'
          );
        case 'CHN_TIBET':
          return makeResult(
            'TIB',
            'Tibet / Xizang (Lhasa, Ü-Tsang e Ngari 100% Tibet Indipendente · Settore Orientale Chamdo Occupato dall\'EPL Ott 1950)',
            '31 Dicembre 1950 (Tibet centrale e occidentale ancora 100% indipendente): dopo la caduta di Chamdo (6–19 ottobre 1950) nel settore orientale del Kham fino al fiume Salween, l\'EPL sospende l\'avanzata militare su Lhasa. Il 17 novembre 1950 il XIV Dalai Lama assume anticipatamente i pieni poteri; Lhasa, Shigatse, Gyantse, Nagqu, Ngari e Nyingchi restano sotto sovranità tibetana.',
            'Neutrale',
            'Governo Ganden Phodrang del Tibet — XIV Dalai Lama a Lhasa (Tibet Indipendente)'
          );
        case 'CHN_HONGKONG':
          return makeResult('UK', 'Crown Colony of Hong Kong', '31 Dicembre 1950: Colonia della Corona Britannica sul confine chiuso con la RPC (Governatore Sir Alexander Grantham).', 'Alleati', 'British Empire — Hong Kong');
        case 'CHN_MACAU':
          return makeResult('POR', 'Macau Português (Província Ultramarina)', '31 Dicembre 1950: Provincia d\'oltremare portoghese enclave sulla costa del Guangdong.', 'Neutrale', 'República Portuguesa — Macau');
        default:
          return makeResult(
            'CCP_CHI',
            `${histName} (100% RPC — Repubblica Popolare Cinese)`,
            '31 Dicembre 1950 (100% RPC): provincia continentale interamente amministrata dalla Repubblica Popolare Cinese.',
            'Comintern',
            'Repubblica Popolare Cinese (RPC — 100%)'
          );
      }
    }
    if (isJune1950) {
      switch (chnId) {
        case 'CHN_HEILONGJIANG':
        case 'CHN_JILIN':
          return makeResult(
            'CCP_CHI',
            `${histName} (100% RPC — Cina Nord-Orientale)`,
            '30 Giugno 1950 (100% RPC): base industriale nord-orientale della Repubblica Popolare Cinese collegata logisticamente all\'URSS dopo il Trattato Sino-Sovietico del 14 febbraio 1950.',
            'Comintern',
            'Repubblica Popolare Cinese (RPC — 100%)'
          );
        case 'CHN_LIAONING':
          return makeResult(
            'CCP_CHI',
            'Liaoning (98% RPC · Port Arthur e Dalian Occupazione Militare URSS — Trattato Sino-Sovietico 14 Feb 1950)',
            '30 Giugno 1950 (98% RPC / 2% URSS): il Trattato di Amicizia, Alleanza e Mutua Assistenza Sino-Sovietico del 14 febbraio 1950 prevede la futura restituzione entro fine 1952, ma al 30 giugno 1950 Port Arthur (Lüshunkou) e Dalian restano ancora sotto occupazione militare dell\'URSS.',
            'Comintern',
            'Repubblica Popolare Cinese (98% RPC · Escl. Port Arthur/Dalian URSS)'
          );
        case 'CHN_BEIJING':
          return makeResult(
            'CCP_CHI',
            'Beijing / Pechino (100% RPC — Capitale della Repubblica Popolare Cinese)',
            '30 Giugno 1950 (100% RPC): capitale della Repubblica Popolare Cinese (Presidente Mao Zedong, Premier Zhou Enlai); stipulato il 14 febbraio 1950 il Trattato di Alleanza Sino-Sovietico.',
            'Comintern',
            'Repubblica Popolare Cinese — Capitale Beijing (100% RPC)'
          );
        case 'CHN_TIANJIN':
        case 'CHN_HEBEI':
        case 'CHN_SHANXI':
        case 'CHN_SHANDONG':
        case 'CHN_HENAN':
        case 'CHN_JIANGSU':
        case 'CHN_SHANGHAI':
        case 'CHN_ANHUI':
        case 'CHN_INNER_MONGOLIA':
        case 'CHN_MANCHUKUO_XINGAN_NORTH':
        case 'CHN_MANCHUKUO_XINGAN_SOUTH':
        case 'CHN_GANSU':
        case 'CHN_NINGXIA':
        case 'CHN_QINGHAI':
        case 'CHN_SHAANXI':
        case 'CHN_XINJIANG':
        case 'CHN_XINJIANG_ETR':
        case 'CHN_HUBEI':
        case 'CHN_HUNAN':
        case 'CHN_JIANGXI':
        case 'CHN_GUANGXI':
        case 'CHN_GUIZHOU':
        case 'CHN_CHONGQING':
          return makeResult(
            'CCP_CHI',
            `${histName} (100% RPC — Repubblica Popolare Cinese)`,
            '30 Giugno 1950 (100% RPC): provincia interamente amministrata dalla Repubblica Popolare Cinese dopo il completamento delle operazioni sul continente.',
            'Comintern',
            'Repubblica Popolare Cinese (RPC — 100%)'
          );
        case 'CHN_SICHUAN':
        case 'CHN_XIKANG':
          return makeResult(
            'CCP_CHI',
            `${histName} (100% RPC — Caduta di Xichang il 27 Marzo 1950)`,
            '30 Giugno 1950 (100% RPC): con la Campagna di Xichang (12 marzo – 7 aprile 1950) e la caduta di Xichang il 27 marzo 1950, viene eliminata l\'ultima grande sacca militare regolare della Repubblica di Cina sul continente.',
            'Comintern',
            'Repubblica Popolare Cinese (100% RPC)'
          );
        case 'CHN_YUNNAN':
          return makeResult(
            'CCP_CHI',
            'Yunnan (100% RPC — Campagna dello Yunnan Meridionale, Gennaio 1950)',
            '30 Giugno 1950 (100% RPC): con la Campagna dello Yunnan Meridionale (gennaio 1950), i reparti residui dell\'8ª e 26ª Armata ROC di Li Mi attorno a Mengzi vengono sbaragliati o respinti oltre il confine in Birmania; l\'intera provincia è sotto controllo della RPC.',
            'Comintern',
            'Repubblica Popolare Cinese — Provincia dello Yunnan (100% RPC)'
          );
        case 'CHN_HAINAN':
          return makeResult(
            'CCP_CHI',
            'Hainan (100% RPC — Campagna di Sbarco sull\'Isola di Hainan, 5 Marzo – 1° Maggio 1950)',
            '30 Giugno 1950 (100% RPC): con la Campagna dell\'Isola di Hainan (5 marzo – 1° maggio 1950), il XV Corpo dell\'EPL attraversa lo stretto di Qiongzhou conquistando Haikou (23 aprile) e le basi navali di Yulin e Sanya (30 aprile – 1° maggio 1950), eliminando interamente la presenza della ROC sull\'isola.',
            'Comintern',
            'Repubblica Popolare Cinese — Regione Amministrativa di Hainan (100% RPC)'
          );
        case 'CHN_GUANGDONG':
          return makeResult(
            'CCP_CHI',
            'Guangdong (100% RPC — Conquista delle Isole Wanshan / Guishan, Maggio 1950)',
            '30 Giugno 1950 (100% RPC): con la Campagna dell\'Arcipelago di Wanshan (presa dell\'isola principale di Guishan il 25 maggio 1950), la Marina dell\'EPL sgombera le isole all\'imboccatura dell\'estuario del Fiume delle Perle, portando il Guangdong al 100% sotto la RPC.',
            'Comintern',
            'Repubblica Popolare Cinese — Provincia del Guangdong (100% RPC)'
          );
        case 'CHN_ZHEJIANG':
          return makeResult(
            'CCP_CHI',
            'Zhejiang (99,5% RPC Liberazione di Zhoushan 16–19 Mag · 0,5% ROC Isole Dachen e Yijiangshan)',
            '30 Giugno 1950 (99,5% RPC / 0,5% ROC): tra il 16 e il 19 maggio 1950 le forze nazionaliste evacuano segretamente l\'intero Arcipelago di Zhoushan (125.000 uomini trasferiti a Taiwan), subito occupato dall\'EPL. Restano alla ROC esclusivamente le piccole isole meridionali di Dachen e Yijiangshan al largo di Taizhou.',
            'Comintern',
            'Repubblica Popolare Cinese — Zhejiang (99,5% RPC · Dachen/Yijiangshan ROC)'
          );
        case 'CHN_FUJIAN':
          return makeResult(
            'CCP_CHI',
            'Fujian (99% RPC Terraferma · 1% ROC Kinmen / Matsu / Wuqiu)',
            '30 Giugno 1950 (99% RPC / 1% ROC): sulla terraferma l\'EPL controlla l\'intera provincia, mentre la Repubblica di Cina mantiene e fortifica le enclave insulari di Kinmen (Quemoy), Matsu e Wuqiu.',
            'Comintern',
            'Repubblica Popolare Cinese — Fujian (99% RPC · Kinmen/Matsu/Wuqiu ROC)'
          );
        case 'CHN_TAIWAN':
          return makeResult(
            'CHI',
            'Taiwan & Penghu (100% Repubblica di Cina — Presidenza Chiang Kai-shek dal 1° Marzo 1950 & 7ª Flotta USA)',
            '30 Giugno 1950 (100% ROC): il 1° marzo 1950 Chiang Kai-shek riassume formalmente la carica di Presidente della Repubblica di Cina a Taipei (con i 125.000 soldati evacuati da Zhoushan a maggio); il 27 giugno 1950, dopo lo scoppio della Guerra di Corea, il Presidente Truman ordina alla 7ª Flotta USA di presidiare lo Stretto di Taiwan.',
            'Alleati',
            'Zhōnghuá Mínguó — Governo Centrale a Taipei (100% ROC)'
          );
        case 'CHN_TIBET':
          return makeResult(
            'TIB',
            'Tibet / Xizang incl. Chamdo (100% Tibet De Facto Indipendente — 30 Giugno 1950)',
            '30 Giugno 1950 (100% Tibet de facto indipendente): sotto il Kashag di Lhasa e il XIV Dalai Lama, l\'intero Tibet (incluso il Chamdo / Xikang occidentale) rimane indipendente e non invaso dall\'EPL al 30 giugno 1950 (l\'offensiva su Chamdo avverrà solo nell\'ottobre 1950).',
            'Neutrale',
            'Governo Ganden Phodrang del Tibet — Kashag di Lhasa (100% Tibet)'
          );
        case 'CHN_HONGKONG':
          return makeResult('UK', 'Crown Colony of Hong Kong', '30 Giugno 1950: Colonia della Corona Britannica sul confine chiuso con la Repubblica Popolare Cinese (Governatore Sir Alexander Grantham).', 'Alleati', 'British Empire — Hong Kong');
        case 'CHN_MACAU':
          return makeResult('POR', 'Macau Português (Província Ultramarina)', '30 Giugno 1950: Provincia d\'oltremare portoghese enclave sulla costa del Guangdong.', 'Neutrale', 'República Portuguesa — Macau');
        default:
          return makeResult(
            'CCP_CHI',
            `${histName} (100% RPC — Repubblica Popolare Cinese)`,
            '30 Giugno 1950: provincia continentale sotto piena amministrazione della Repubblica Popolare Cinese.',
            'Comintern',
            'Repubblica Popolare Cinese (RPC)'
          );
      }
    }
    if (isDec1949) {
      switch (chnId) {
        case 'CHN_HEILONGJIANG':
        case 'CHN_JILIN':
          return makeResult(
            'CCP_CHI',
            `${histName} (100% RPC — Cina Nord-Orientale)`,
            '31 Dicembre 1949 (100% RPC): la Manciuria settentrionale e centrale costituisce la base industriale consolidata della Repubblica Popolare Cinese.',
            'Comintern',
            'Repubblica Popolare Cinese (RPC — 100%)'
          );
        case 'CHN_LIAONING':
          return makeResult(
            'CCP_CHI',
            'Liaoning (98% RPC · Port Arthur / Dalian Occupazione Militare URSS)',
            '31 Dicembre 1949 (98% RPC / 2% URSS): l\'intera provincia è integrata nella Repubblica Popolare Cinese, mentre restano sotto occupazione militare dell\'Unione Sovietica esclusivamente Port Arthur (Lüshunkou) e Dalian sull\'estremità meridionale della penisola del Liaodong.',
            'Comintern',
            'Repubblica Popolare Cinese (98% RPC · Escl. Port Arthur/Dalian URSS)'
          );
        case 'CHN_BEIJING':
          return makeResult(
            'CCP_CHI',
            'Beijing / Pechino (100% RPC — Capitale della Repubblica Popolare Cinese)',
            '31 Dicembre 1949 (100% RPC): il 1° ottobre 1949 Mao Zedong proclama in Piazza Tiananmen la Repubblica Popolare Cinese; la città viene ripristinata capitale nazionale e rinominata da Beiping a Beijing.',
            'Comintern',
            'Repubblica Popolare Cinese — Capitale Beijing (100% RPC)'
          );
        case 'CHN_TIANJIN':
        case 'CHN_HEBEI':
        case 'CHN_SHANXI':
        case 'CHN_SHANDONG':
        case 'CHN_HENAN':
        case 'CHN_JIANGSU':
        case 'CHN_SHANGHAI':
        case 'CHN_ANHUI':
          return makeResult(
            'CCP_CHI',
            `${histName} (100% RPC — Cina Orientale & Settentrionale)`,
            '31 Dicembre 1949 (100% RPC): territorio interamente amministrato dal Governo Centrale Popolare della Repubblica Popolare Cinese dopo le campagne di Pingjin, Huaihai e dello Yangtze.',
            'Comintern',
            'Repubblica Popolare Cinese (RPC — 100%)'
          );
        case 'CHN_MANCHUKUO_XINGAN_NORTH':
        case 'CHN_MANCHUKUO_XINGAN_SOUTH':
        case 'CHN_INNER_MONGOLIA':
          return makeResult(
            'CCP_CHI',
            'Nei Mongol / Mongolia Interna (100% RPC — Resa del Suiyuan 19 Sett 1949)',
            '31 Dicembre 1949 (100% RPC): il 19 settembre 1949 il governatore nazionalista Dong Qiwu firma la resa pacifica della provincia del Suiyuan (Guisui/Hohhot e Baotou), completando l\'unificazione della Mongolia Interna sotto la RPC.',
            'Comintern',
            'Repubblica Popolare Cinese — Regione Autonoma Nei Mongol (100% RPC)'
          );
        case 'CHN_GANSU':
        case 'CHN_NINGXIA':
        case 'CHN_QINGHAI':
        case 'CHN_SHAANXI':
          return makeResult(
            'CCP_CHI',
            `${histName} (100% RPC — Cina Nord-Occidentale)`,
            '31 Dicembre 1949 (100% RPC): con la caduta di Lanzhou (26 agosto), Xining (5 settembre) e Yinchuan (23 settembre 1949) e l\'avanzata nel sud dello Shaanxi, l\'intero Nord-Ovest passa sotto la Repubblica Popolare Cinese.',
            'Comintern',
            'Repubblica Popolare Cinese — Cina Nord-Occidentale (100% RPC)'
          );
        case 'CHN_XINJIANG':
          return makeResult(
            'CCP_CHI',
            'Xinjiang / Ürümqi (100% RPC — Resa Pacifica del 25–26 Settembre 1949)',
            '31 Dicembre 1949 (100% RPC): il 25–26 settembre 1949 le autorità provinciali nazionaliste (Burhan Shahidi e Tao Zhiyue) dichiarano la resa pacifica a Ürümqi e l\'EPL entra nel Bacino del Tarim.',
            'Comintern',
            'Repubblica Popolare Cinese — Provincia dello Xinjiang (100% RPC)'
          );
        case 'CHN_XINJIANG_ETR':
          return makeResult(
            'CCP_CHI',
            'Xinjiang Nord-Occidentale ex-ETR (100% RPC — Integrazione dei Tre Distretti)',
            '31 Dicembre 1949 (100% RPC): contestualmente alla resa pacifica dello Xinjiang (settembre 1949), i tre distretti della Seconda Repubblica del Turkestan Orientale (Ili, Tarbagatay, Altay) vengono integrati nella Repubblica Popolare Cinese.',
            'Comintern',
            'Repubblica Popolare Cinese — Tre Distretti dello Xinjiang (100% RPC)'
          );
        case 'CHN_HUBEI':
        case 'CHN_HUNAN':
        case 'CHN_JIANGXI':
          return makeResult(
            'CCP_CHI',
            `${histName} (100% RPC — Cina Centro-Meridionale)`,
            '31 Dicembre 1949 (100% RPC): dopo la defezione pacifica di Changsha (4 agosto 1949), la presa di Ganzhou (14 agosto) e il crollo della linea dello Hunan, l\'intera Cina centrale è sotto controllo della RPC.',
            'Comintern',
            'Repubblica Popolare Cinese (RPC — 100%)'
          );
        case 'CHN_GUANGDONG':
          return makeResult(
            'CCP_CHI',
            'Guangdong Continentale (99% RPC Caduta di Guangzhou · 1% ROC Isole Wanshan)',
            '31 Dicembre 1949 (99% RPC / 1% ROC): il 14 ottobre 1949 cade Guangzhou (Canton) e a dicembre è occupata la penisola di Leizhou (Zhanjiang); restano alla ROC solo le piccole isole dell\'arcipelago di Wanshan al largo di Zhuhai (l\'isola di Hainan resta 100% ROC).',
            'Comintern',
            'Repubblica Popolare Cinese — Guangdong Continentale (99% RPC · Isole Wanshan ROC)'
          );
        case 'CHN_HAINAN':
          return makeResult(
            'CHI',
            'Hainan (100% ROC — Isola Presidiata dalla Repubblica di Cina)',
            '31 Dicembre 1949 (100% ROC): amministrativamente parte del Guangdong ma separata dallo stretto di Qiongzhou, l\'isola di Hainan rimane interamente sotto controllo della Repubblica di Cina (resisterà fino all\'aprile–maggio 1950).',
            'Alleati',
            'Zhōnghuá Mínguó — Comando Difensivo di Hainan (100% ROC)'
          );
        case 'CHN_FUJIAN':
          return makeResult(
            'CCP_CHI',
            'Fujian (99% RPC Fuzhou & Xiamen · 1% ROC Kinmen / Matsu / Wuqiu)',
            '31 Dicembre 1949 (99% RPC / 1% ROC): cadono Fuzhou (17 agosto) e Xiamen/Amoy (17 ottobre), ma nella battaglia di Guningtou (25–27 ottobre 1949) la ROC respinge lo sbarco comunista su Kinmen (Quemoy), conservando Kinmen, Matsu e Wuqiu.',
            'Comintern',
            'Repubblica Popolare Cinese — Fujian (99% RPC · Kinmen/Matsu/Wuqiu ROC)'
          );
        case 'CHN_ZHEJIANG':
          return makeResult(
            'CCP_CHI',
            'Zhejiang (98% RPC Terraferma · 2% ROC Arcipelago Zhoushan & Dachen)',
            '31 Dicembre 1949 (98% RPC / 2% ROC): il controllo della RPC sulla terraferma è totale, mentre la ROC conserva l\'Arcipelago di Zhoushan e le isole Dachen / Yijiangshan (fino al maggio 1950 / 1955).',
            'Comintern',
            'Repubblica Popolare Cinese — Zhejiang (98% RPC · Zhoushan/Dachen ROC)'
          );
        case 'CHN_GUANGXI':
        case 'CHN_GUIZHOU':
          return makeResult(
            'CCP_CHI',
            `${histName} (100% RPC — Campagna del Sud-Ovest)`,
            '31 Dicembre 1949 (100% RPC): con la caduta di Guiyang (15 novembre), Guilin (22 novembre), Nanning (4 dicembre) e Zhennanguan al confine vietnamita (11 dicembre 1949), Guangxi e Guizhou passano interamente alla RPC.',
            'Comintern',
            'Repubblica Popolare Cinese (RPC — 100%)'
          );
        case 'CHN_CHONGQING':
          return makeResult(
            'CCP_CHI',
            'Chongqing (100% RPC — Caduta il 30 Novembre 1949)',
            '31 Dicembre 1949 (100% RPC): la temporanea capitale nazionalista del Sud-Ovest cade il 30 novembre 1949, costringendo il governo KMT a ripiegare su Chengdu e infine su Taipei (7 dicembre).',
            'Comintern',
            'Repubblica Popolare Cinese — Chongqing (100% RPC)'
          );
        case 'CHN_SICHUAN':
        case 'CHN_XIKANG':
          return makeResult(
            'CCP_CHI',
            `${histName} (95% RPC Caduta di Chengdu 27 Dic · 5% ROC Sacca di Xichang)`,
            '31 Dicembre 1949 (95% RPC / 5% ROC): dopo la presa di Chongqing (30 novembre) e Chengdu (27 dicembre 1949), le ultime truppe regolari della ROC sul continente ripiegano nella conca montana attorno a Xichang (estremità sud-occidentale / ex Xikang orientale), dove resistono fino al marzo 1950.',
            'Comintern',
            'Repubblica Popolare Cinese (95% RPC · Sacca di Xichang ROC)'
          );
        case 'CHN_YUNNAN':
          return makeResult(
            'CCP_CHI',
            'Yunnan (95% RPC Defezione di Kunming 9 Dic · 5% ROC Area di Mengzi)',
            '31 Dicembre 1949 (95% RPC / 5% ROC): il 9 dicembre 1949 il governatore Lu Han dichiara la defezione di Kunming alla RPC; reparti residui della ROC (armata di Li Mi) controllano temporaneamente l\'area meridionale attorno a Mengzi lungo il confine birmano/indocinese.',
            'Comintern',
            'Repubblica Popolare Cinese — Yunnan (95% RPC · Area di Mengzi ROC)'
          );
        case 'CHN_TAIWAN':
          return makeResult(
            'CHI',
            'Taiwan & Penghu (100% ROC — Sede Provvisoria a Taipei dal 7 Dicembre 1949)',
            '31 Dicembre 1949 (100% ROC): dopo la caduta di Guangzhou (14 ottobre) e Chongqing (30 novembre), il 7 dicembre 1949 il governo nazionalista della Repubblica di Cina trasferisce la propria capitale provvisoria a Taipei.',
            'Alleati',
            'Zhōnghuá Mínguó — Capitale Provvisoria Taipei / Taiwan (100% ROC)'
          );
        case 'CHN_TIBET':
          return makeResult('TIB', 'Bod (Tibet — 100% De Facto Indipendente)', '31 Dicembre 1949 (100% Tibet): il Tibet (incluso il Chamdo / Xikang occidentale) rimane interamente de facto indipendente sotto il Kashag di Lhasa, senza alcun controllo della RPC.', 'Neutrale', 'Kashag — Bod (Lhasa)');
        case 'CHN_HONGKONG':
          return makeResult('UK', 'Crown Colony of Hong Kong', '31 Dicembre 1949: Colonia della Corona Britannica sul confine chiuso con la Repubblica Popolare Cinese (Governatore Sir Alexander Grantham).', 'Alleati', 'British Empire — Hong Kong');
        case 'CHN_MACAU':
          return makeResult('POR', 'Macau Português (Província Ultramarina)', '31 Dicembre 1949: Provincia d\'oltremare portoghese enclave sulla costa del Guangdong (il Portogallo è membro NATO).', 'Neutrale', 'República Portuguesa — Macau');
        default:
          return makeResult(
            'CCP_CHI',
            `${histName} (Repubblica Popolare Cinese — RPC)`,
            '31 Dicembre 1949: provincia continentale sotto amministrazione della Repubblica Popolare Cinese.',
            'Comintern',
            'Repubblica Popolare Cinese (RPC)'
          );
      }
    }
    if (isJune1949) {
      switch (chnId) {
        case 'CHN_HEILONGJIANG':
        case 'CHN_JILIN':
          return makeResult(
            'CCP_CHI',
            `${histName} (100% PCC / EPL — Manciuria Consolidata)`,
            '30 Giugno 1949 (100% PCC): l\'intera Manciuria settentrionale e centrale funge da retrovia industriale, ferroviaria e logistica consolidata dell\'Esercito Popolare di Liberazione (nessuna RPC ancora proclamata prima del 1° ottobre 1949).',
            'Comintern',
            'Partito Comunista Cinese — Ufficio del Nord-Est & EPL (100% PCC)'
          );
        case 'CHN_LIAONING':
          return makeResult(
            'CCP_CHI',
            'Liaoning (100% PCC · Punta Sud Port Arthur / Dalian Occupazione Militare URSS)',
            '30 Giugno 1949 (100% PCC; punta meridionale Port Arthur/Dalian sotto presidio URSS): dopo la vittoria di Liaoshen, la provincia è interamente controllata dal PCC/EPL, mentre la base navale di Lüshun/Port Arthur e il porto di Dalian restano sotto amministrazione militare sovietica.',
            'Comintern',
            'Partito Comunista Cinese — Liaoning (100% PCC · Escl. Port Arthur/Dalian URSS)'
          );
        case 'CHN_BEIJING':
          return makeResult(
            'CCP_CHI',
            'Beiping / Pechino (100% PCC — Resa Pacifica del 31 Gennaio 1949)',
            '30 Giugno 1949 (100% PCC): a conclusione della Campagna di Pingjin, le forze nazionaliste di Fu Zuoyi accettano la resa pacifica di Beiping (Pechino), dove l\'EPL sfila solennemente il 31 gennaio 1949; il Comitato Centrale del PCC vi trasferisce il proprio quartier generale da Xibaipo nel marzo 1949.',
            'Comintern',
            'Partito Comunista Cinese — Comitato Centrale & QG EPL (Beiping — 100% PCC)'
          );
        case 'CHN_TIANJIN':
          return makeResult(
            'CCP_CHI',
            'Tianjin / Tientsin (100% PCC — Espugnata il 15 Gennaio 1949)',
            '30 Giugno 1949 (100% PCC): dopo 29 ore di assalto generale nella Campagna di Pingjin, il 15 gennaio 1949 l\'EPL di Lin Biao e Liu Yalou espugna Tianjin catturando il gen. Chen Changjie.',
            'Comintern',
            'Partito Comunista Cinese — Municipalità di Tianjin (100% PCC)'
          );
        case 'CHN_HEBEI':
          return makeResult(
            'CCP_CHI',
            'Hebei (100% PCC — Fine della Campagna di Pingjin)',
            '30 Giugno 1949 (100% PCC): completata la Campagna di Pingjin con la caduta di Tianjin (15 gen) e la resa di Beiping (31 gen), l\'intero Hebei è unificato sotto il Governo Popolare della Cina del Nord.',
            'Comintern',
            'Esercito Popolare di Liberazione — Cina del Nord (100% PCC)'
          );
        case 'CHN_SHANXI':
          return makeResult(
            'CCP_CHI',
            'Shanxi (100% PCC — Caduta di Taiyuan il 24 Aprile 1949)',
            '30 Giugno 1949 (100% PCC): il 24 aprile 1949 cade d\'assalto Taiyuan (ultimo bastione di Yan Xishan) dopo sei mesi d\'assedio, seguita da Datong il 1° maggio: l\'intero Shanxi è sotto controllo comunista.',
            'Comintern',
            'Esercito Popolare di Liberazione — Shanxi (Xu Xiangqian — 100% PCC)'
          );
        case 'CHN_SHANDONG':
          return makeResult(
            'CCP_CHI',
            'Shandong (100% PCC — Caduta di Qingdao il 2 Giugno 1949)',
            '30 Giugno 1949 (100% PCC): con la ritirata della flotta USA e l\'evacuazione nazionalista, il 2 giugno 1949 l\'EPL entra a Qingdao, eliminando l\'ultima enclave KMT nello Shandong.',
            'Comintern',
            'Partito Comunista Cinese — Shandong (100% PCC)'
          );
        case 'CHN_HENAN':
          return makeResult(
            'CCP_CHI',
            'Henan (100% PCC — Fine Campagna di Huaihai)',
            '30 Giugno 1949 (100% PCC): conclusa la vittoriosa Campagna di Huaihai (10 gennaio 1949), l\'intera provincia dell\'Henan è consolidata sotto l\'amministrazione comunista.',
            'Comintern',
            'Partito Comunista Cinese — Pianura Centrale (100% PCC)'
          );
        case 'CHN_ANHUI':
          return makeResult(
            'CCP_CHI',
            'Anhui (100% PCC — Attraversamento dello Yangtze, Aprile 1949)',
            '30 Giugno 1949 (100% PCC): tra il 20 e il 23 aprile 1949 le armate dell\'EPL attraversano in forze il fiume Yangtze espugnando Anqing e Wuhu ed eliminando ogni presidio nazionalista nell\'Anhui.',
            'Comintern',
            'Esercito Popolare di Liberazione — Anhui (100% PCC)'
          );
        case 'CHN_JIANGSU':
          return makeResult(
            'CCP_CHI',
            'Jiangsu (100% PCC — Caduta di Nanchino il 23 Aprile 1949)',
            '30 Giugno 1949 (100% PCC): il 21 aprile 1949 l\'EPL supera il basso Yangtze ed entra il 23 aprile nella capitale nazionalista Nanchino (Nanjing); il governo KMT ripiega prima a Shanghai e poi a Guangzhou.',
            'Comintern',
            'Esercito Popolare di Liberazione — Nanchino & Jiangsu (100% PCC)'
          );
        case 'CHN_SHANGHAI':
          return makeResult(
            'CCP_CHI',
            'Shanghai (100% PCC — Caduta di Shanghai il 27 Maggio 1949)',
            '30 Giugno 1949 (100% PCC): al termine della Battaglia di Shanghai (12–27 maggio 1949), le truppe di Chen Yi e Su Yu liberano la metropoli finanziaria e Wusong mentre gli ultimi trasporti KMT salpano verso Taiwan.',
            'Comintern',
            'Partito Comunista Cinese — Comitato Militare di Shanghai (Chen Yi — 100% PCC)'
          );
        case 'CHN_MANCHUKUO_XINGAN_NORTH':
        case 'CHN_MANCHUKUO_XINGAN_SOUTH':
        case 'CHN_INNER_MONGOLIA':
          return makeResult(
            'CCP_CHI',
            'Nei Mongol / Mongolia Interna (92% PCC · 8% ROC Suiyuan Occidentale)',
            '30 Giugno 1949 (92% PCC / Governo Autonomo della Mongolia Interna · 8% ROC): l\'amministrazione di Ulanhu e l\'EPL controllano il 92% del territorio; la ROC conserva esclusivamente la fascia occidentale attorno a Guisui (Hohhot) e Baotou nel Suiyuan occidentale.',
            'Comintern',
            'Governo Autonomo della Mongolia Interna & EPL (Ulanhu — 92% PCC)'
          );
        case 'CHN_ZHEJIANG':
          return makeResult(
            'CCP_CHI',
            'Zhejiang (85% PCC Caduta di Hangzhou, Ningbo e Wenzhou · 15% ROC Arcipelago Zhoushan)',
            '30 Giugno 1949 (85% PCC / 15% ROC): nel maggio 1949 l\'EPL espugna Hangzhou (3 maggio), Wenzhou (7 maggio) e Ningbo (25 maggio); la ROC mantiene esclusivamente l\'Arcipelago fortificato di Zhoushan e le isole costiere minori.',
            'Comintern',
            'Esercito Popolare di Liberazione — Zhejiang (85% PCC · Isole Zhoushan ROC)'
          );
        case 'CHN_HUBEI':
          return makeResult(
            'CCP_CHI',
            'Hubei (80% PCC Caduta di Wuhan 16–17 Maggio · 20% ROC Ovest Montano Yichang/Enshi)',
            '30 Giugno 1949 (80% PCC / 20% ROC): il 16–17 maggio 1949 la 4ª Armata da Campo di Lin Biao occupa la triplice metropoli di Wuhan (Wuchang, Hankou, Hanyang) dopo la ritirata di Bai Chongxi verso lo Hunan; la ROC conserva solo l\'estremità montuosa occidentale attorno a Yichang ed Enshi.',
            'Comintern',
            'Esercito Popolare di Liberazione — Wuhan & Hubei (80% PCC)'
          );
        case 'CHN_JIANGXI':
          return makeResult(
            'CCP_CHI',
            'Jiangxi (75% PCC Caduta di Nanchang 22 Maggio · 25% ROC Meridionale Ganzhou)',
            '30 Giugno 1949 (75% PCC / 25% ROC): il 22 maggio 1949 cade Nanchang; l\'EPL controlla il nord e il centro della provincia, mentre la ROC mantiene il meridione attorno a Ganzhou.',
            'Comintern',
            'Esercito Popolare di Liberazione — Jiangxi (75% PCC · Sud Ganzhou ROC)'
          );
        case 'CHN_SHAANXI':
          return makeResult(
            'CCP_CHI',
            'Shaanxi (70% PCC Caduta di Xi\'an 20 Maggio & Guanzhong · 30% ROC Sud Hanzhong/Ankang)',
            '30 Giugno 1949 (70% PCC / 30% ROC): il 20 maggio 1949 l\'Armata Campale del Nord-Ovest di Peng Dehuai conquista Xi\'an e l\'intera pianura del Guanzhong; le truppe di Hu Zongnan ripiegano sulla fascia montuosa meridionale (Hanzhong / Ankang).',
            'Comintern',
            'Esercito Popolare di Liberazione — 1ª Armata Campale (Peng Dehuai · Xi\'an — 70% PCC)'
          );
        case 'CHN_FUJIAN':
          return makeResult(
            'CHI',
            'Fujian (90% ROC Fuzhou & Xiamen · 10% PCC Guerriglia Confine Nord)',
            '30 Giugno 1949 (90% ROC / 10% PCC): bande di guerriglia comunista premono lungo il confine settentrionale con lo Zhejiang e lo Jiangxi, ma Fuzhou, Xiamen (Amoy) e quasi tutta la provincia restano saldamente sotto controllo della Repubblica di Cina fino all\'agosto–ottobre 1949.',
            'Alleati',
            'Repubblica di Cina — Provincia del Fujian (Fuzhou / Xiamen — 90% ROC)'
          );
        case 'CHN_HUNAN':
          return makeResult(
            'CHI',
            'Hunan (95% ROC Changsha & Hengyang · 5% PCC Infiltrazioni Nord)',
            '30 Giugno 1949 (95% ROC / 5% PCC): provincia presidiata quasi interamente dalle forze nazionaliste di Cheng Qian e Bai Chongxi attorno a Changsha e Hengyang (la defezione di Changsha avverrà solo il 4 agosto 1949).',
            'Alleati',
            'Repubblica di Cina — Comando di Changsha (95% ROC)'
          );
        case 'CHN_GUANGDONG':
          return makeResult(
            'CHI',
            'Guangdong / Canton (100% ROC — Capitale Provvisoria della Repubblica di Cina)',
            '30 Giugno 1949 (100% ROC): dopo la caduta di Nanchino (23 aprile 1949), il governo della Repubblica di Cina (Presidente f.f. Li Zongren, Premier Yan Xishan dal giugno 1949) trasferisce la propria sede nazionale provvisoria a Guangzhou (Canton), che resterà capitale nazionalista fino all\'ottobre 1949.',
            'Alleati',
            'Zhōnghuá Mínguó — Capitale Provvisoria Guangzhou / Canton (100% ROC)'
          );
        case 'CHN_HAINAN':
        case 'CHN_GUANGXI':
        case 'CHN_SICHUAN':
        case 'CHN_CHONGQING':
        case 'CHN_XIKANG':
        case 'CHN_GUIZHOU':
        case 'CHN_YUNNAN':
        case 'CHN_QINGHAI':
        case 'CHN_GANSU':
        case 'CHN_NINGXIA':
        case 'CHN_TAIWAN':
          return makeResult(
            'CHI',
            `${histName} (100% ROC — Repubblica di Cina Nazionalista)`,
            chnId === 'CHN_TAIWAN'
              ? '30 Giugno 1949 (100% ROC): sotto il governatore Chen Cheng, Taiwan accoglie le riserve auree, gli archivi, la marina e centinaia di migliaia di evacuati dalla Cina continentale come bastione insulare del Kuomintang.'
              : '30 Giugno 1949 (100% ROC): provincia della Cina meridionale, sud-occidentale o nord-occidentale interamente sotto controllo della Repubblica di Cina (il crollo KMT nel Sud-Ovest e Nord-Ovest avverrà solo tra agosto e dicembre 1949).',
            'Alleati',
            chnId === 'CHN_TAIWAN'
              ? 'Zhōnghuá Mínguó — Táiwān Shěng (Governatore Chen Cheng — 100% ROC)'
              : 'Zhōnghuá Mínguó — Governo Nazionalista (Sede Provvisoria Guangzhou — 100% ROC)'
          );
        case 'CHN_XINJIANG_ETR':
          return makeResult(
            'ETR',
            'Seconda Repubblica del Turkestan Orientale (Ili, Tarbagatay & Altay — Ghulja)',
            '30 Giugno 1949: i tre distretti nord-occidentali di Ili, Tarbagatay e Altay restano invariati sotto la Seconda Repubblica del Turkestan Orientale (Ehmetjan Qasimi) lungo la linea del fiume Manas.',
            'Comintern',
            'Shärqiy Türkistan Jumhuriyiti — Consiglio dei Tre Distretti (Ehmetjan Qasimi · Ghulja)'
          );
        case 'CHN_XINJIANG':
          return makeResult(
            'CHI',
            'Xinjiang / Ürümqi & Bacino del Tarim (100% ROC — Governatore Burhan Shahidi)',
            '30 Giugno 1949 (100% ROC, esclusi i Tre Distretti ETR): la guarnigione nazionalista di Tao Zhiyue e il governo provinciale di Burhan Shahidi presidiano Ürümqi, Hami e il Bacino del Tarim fino al settembre 1949.',
            'Alleati',
            'Repubblica di Cina — Provincia dello Xinjiang (Ürümqi — 100% ROC)'
          );
        case 'CHN_TIBET':
          return makeResult('TIB', 'Bod (Tibet — Lhasa)', 'Stato teocratico tibetano de facto indipendente sotto il Kashag di Lhasa.', 'Neutrale', 'Kashag — Bod (Lhasa)');
        case 'CHN_HONGKONG':
          return makeResult('UK', 'Crown Colony of Hong Kong', 'Colonia della Corona Britannica (Governatore Sir Alexander Grantham); massiccio afflusso di profughi da Shanghai e dalla Cina meridionale.', 'Alleati', 'British Empire — Hong Kong');
        case 'CHN_MACAU':
          return makeResult('POR', 'Macau Português (Província Ultramarina)', 'Provincia d\'oltremare portoghese neutrale (il Portogallo è membro fondatore della NATO dal 4 aprile 1949).', 'Neutrale', 'República Portuguesa — Macau');
        default:
          return makeResult(
            'CHI',
            `${histName} (Repubblica di Cina — KMT)`,
            '30 Giugno 1949: territorio cinese sotto controllo nazionalista ROC con sede governativa provvisoria a Guangzhou.',
            'Alleati',
            'Zhōnghuá Mínguó — Governo Nazionalista (Guangzhou)'
          );
      }
    }
    if (isDec1948) {
      switch (chnId) {
        case 'CHN_HEILONGJIANG':
          return makeResult(
            'CCP_CHI',
            'Heilongjiang / Harbin (100% PCC — Retrovia Strategica della Manciuria Liberata)',
            '31 Dicembre 1948 (100% PCC): consolidata retrovia industriale e logistica dell\'Armata Campale del Nord-Est che ha appena completato la liberazione dell\'intera Manciuria nella Campagna di Liaoshen e marcia attraverso lo Shanhaiguan verso Pechino e Tientsin.',
            'Comintern',
            'Partito Comunista Cinese — Ufficio del Nord-Est & EPL (Harbin — 100% PCC)'
          );
        case 'CHN_JILIN':
          return makeResult(
            'CCP_CHI',
            'Jilin (100% PCC — Capitolazione di Changchun il 19 Ottobre 1948)',
            '31 Dicembre 1948 (100% PCC): dopo cinque mesi di blocco totale, il 19 ottobre 1948 la 1ª Armata nazionalista di Zheng Dongguo capitola a Changchun a seguito della defezione della 60ª Armata dello Yunnan: l\'intero Jilin è sotto saldo controllo comunista.',
            'Comintern',
            'Esercito Popolare di Liberazione — Manciuria Liberata (100% PCC)'
          );
        case 'CHN_LIAONING':
          return makeResult(
            'CCP_CHI',
            'Liaoning (100% PCC — Fine della Campagna di Liaoshen: Caduta di Jinzhou e Shenyang)',
            '31 Dicembre 1948 (100% PCC): nella decisiva Campagna di Liaoshen (12 set – 2 nov 1948), l\'Armata Campale del Nord-Est di Lin Biao espugna Jinzhou (15 ottobre), annienta le truppe di Liao Yaoxiang nello Heishan e conquista Shenyang (Mukden) e Yingkou il 2 novembre 1948, chiudendo ogni presidio nazionalista in Manciuria (Port Arthur/Dalian restano sotto amministrazione sovietica).',
            'Comintern',
            'Esercito Popolare di Liberazione — Manciuria Liberata (Lin Biao — 100% PCC · Escl. Dalian/Port Arthur URSS)'
          );
        case 'CHN_MANCHUKUO_XINGAN_NORTH':
        case 'CHN_MANCHUKUO_XINGAN_SOUTH':
        case 'CHN_INNER_MONGOLIA':
          return makeResult(
            'CCP_CHI',
            'Mongolia Interna / Nei Mongol (85% PCC — Presa di Kalgan/Chahar; Suiyuan Ovest ROC)',
            '31 Dicembre 1948 (85% PCC / Governo Autonomo della Mongolia Interna · 15% ROC): consolidati Rehe e Chahar durante la Campagna di Pingjin (presa di Zhangjiakou il 24 dicembre 1948); al Kuomintang (ROC) resta solo la fascia occidentale del Suiyuan attorno a Guisui (Hohhot) e Baotou.',
            'Comintern',
            'Governo Autonomo della Mongolia Interna & EPL (Ulanhu — 85% PCC)'
          );
        case 'CHN_HEBEI':
          return makeResult(
            'CCP_CHI',
            'Hebei (94% PCC — Campagna di Pingjin & Accerchiamento di Pechino e Tientsin)',
            '31 Dicembre 1948 (94% PCC / 6% ROC): scattata il 29 novembre 1948 la Campagna di Pingjin, le armate di Lin Biao e Nie Rongzhen conquistano Zhangjiakou (Kalgan, 24 dic) e Tangshan, tagliando ogni collegamento tra le ultime sacche ROC accerchiate di Beiping (Pechino) e Tianjin (che capitoleranno solo nel gennaio 1949).',
            'Comintern',
            'Esercito Popolare di Liberazione — Fronte di Pingjin (Lin Biao & Nie Rongzhen — 94% PCC)'
          );
        case 'CHN_BEIJING':
          return makeResult(
            'CHI',
            'Beiping / Pechino (Sacca ROC Strettamente Accerchiata — Campagna di Pingjin, Dicembre 1948)',
            '31 Dicembre 1948 (ROC ancora resistente sotto stretto assedio EPL): tagliate tutte le vie verso Kalgan, Tientsin e il mare, Beiping (Pechino) resta presidiata al 31 dicembre 1948 dalle armate del generale Fu Zuoyi mentre fervono le trattative segrete prima della capitolazione pacifica del gennaio 1949.',
            'Alleati',
            'Repubblica di Cina — Comando Cina del Nord (Gen. Fu Zuoyi · Accerchiamento di Beiping al 31 Dic 1948)'
          );
        case 'CHN_TIANJIN':
          return makeResult(
            'CHI',
            'Tianjin / Tientsin (Piazzaforte Portuale ROC Accerchiata — Campagna di Pingjin, Dicembre 1948)',
            '31 Dicembre 1948 (ROC ancora resistente sotto assedio): la guarnigione nazionalista di Chen Changjie a Tianjin resiste circondata dalle colonne d\'assalto dell\'EPL di Lin Biao e Liu Yalou alla vigilia della battaglia finale di gennaio 1949.',
            'Alleati',
            'Repubblica di Cina — Guarnigione Assediata di Tientsin (Gen. Chen Changjie al 31 Dic 1948)'
          );
        case 'CHN_SHANXI':
          return makeResult(
            'CCP_CHI',
            'Shanxi (97% PCC — Solo Taiyuan e Datong Resistenti al 31 Dicembre 1948)',
            '31 Dicembre 1948 (97% PCC / 3% ROC): l\'intera provincia dello Shanxi è liberata dall\'EPL di Xu Xiangqian, mentre le forze di Yan Xishan restano strettamente assediate nelle due isole urbane fortificate di Taiyuan e Datong (destinate a cadere nell\'aprile–maggio 1949).',
            'Comintern',
            'Esercito Popolare di Liberazione — Fronte dello Shanxi (Xu Xiangqian — 97% PCC)'
          );
        case 'CHN_SHANDONG':
          return makeResult(
            'CCP_CHI',
            'Shandong (98% PCC — Caduta di Jinan il 24 Settembre 1948; Solo Qingdao alla ROC)',
            '31 Dicembre 1948 (98% PCC / 2% ROC): tra il 16 e il 24 settembre 1948 l\'EPL (Su Yu e Xu Shiyou) espugna d\'assalto la capitale provinciale Jinan (catturando il gen. Wang Yaowu) e libera Yantai; al 31 dicembre 1948 al Kuomintang resta unicamente l\'enclave costiera di Qingdao (supportata dalla flotta USA) e le isole Changshan.',
            'Comintern',
            'Esercito Popolare di Liberazione — Armata della Cina Orientale (98% PCC · Escl. Enclave ROC di Qingdao)'
          );
        case 'CHN_HENAN':
          return makeResult(
            'CCP_CHI',
            'Henan (95% PCC — Liberazione di Zhengzhou e Kaifeng in Ottobre; Sconfitta ROC a Nanyang)',
            '31 Dicembre 1948 (95% PCC / 5% ROC): tra il 22 e il 24 ottobre 1948 le forze nazionaliste abbandonano Zhengzhou e Kaifeng, seguite il 4 novembre dallo sgombero di Nanyang e dallo sfondamento dell\'EPL verso il fiume Huai; quasi l\'intero Henan è sotto controllo comunista.',
            'Comintern',
            'Esercito Popolare di Liberazione — Armata della Pianura Centrale (Liu-Deng — 95% PCC)'
          );
        case 'CHN_ANHUI':
          return makeResult(
            'CCP_CHI',
            'Anhui (65% PCC — Offensiva di Huaihai a Nord & Battaglia di Shuangduiji; Sud Yangtze ROC)',
            '31 Dicembre 1948 (65% PCC / 35% ROC): nel pieno della gigantesca Campagna di Huaihai (dal 6 novembre 1948), il 15 dicembre l\'EPL annienta la 12ª Armata nazionalista del gen. Huang Wei a Shuangduiji (Anhui settentrionale) avanzando fino alla riva settentrionale dello Yangtze; la ROC conserva Anqing, Wuhu e il settore a sud del fiume.',
            'Comintern',
            'Esercito Popolare di Liberazione — Fronte di Huaihai (Anhui Settentrionale & Centrale 65% PCC)'
          );
        case 'CHN_JIANGSU':
          return makeResult(
            'CCP_CHI',
            'Jiangsu (65% PCC Subei & Xuzhou in Huaihai / 35% ROC Capitale Nanchino & Sud Yangtze)',
            '31 Dicembre 1948 (65% PCC / 35% ROC): mentre nella Campagna di Huaihai l\'EPL espugna l\'intero Subei (Xuzhou evacuata l\'1° dicembre, sacche KMT schiacciate a Nianzhuang e in accerchiamento a Chen Guanzhuang) raggiungendo il basso Yangtze settentrionale, la capitale nazionale Nanchino (Nanjing), Suzhou e l\'intera fascia meridionale del delta restano ancora sotto controllo ROC (Nanchino cadrà solo nell\'aprile 1949).',
            'Comintern',
            'EPL Fronte di Huaihai (Subei 65% PCC) / Capitale ROC Nanchino & Basso Yangtze (35% ROC)'
          );
        case 'CHN_SHANGHAI':
          return makeResult(
            'CHI',
            'Shanghai (Metropoli Finanziaria ROC & Trasferimento Riserve Auree verso Taiwan — Dicembre 1948)',
            '31 Dicembre 1948 (100% ROC): la metropoli portuale di Shanghai resta saldamente presidiata dalla Repubblica di Cina (che vi avvia il trasferimento marittimo delle riserve auree della Banca Centrale verso Taipei mentre infuria l\'offensiva di Huaihai a nord del fiume Azzurro). Resisterà fino al maggio 1949.',
            'Alleati',
            'Zhōnghuá Mínguó — Guarnigione di Shanghai-Wusong (ROC al 31 Dic 1948)'
          );
        case 'CHN_HUBEI':
          return makeResult(
            'CHI',
            'Hubei (70% ROC Wuhan & Medio Yangtze / 30% PCC Pianura Nord & Monti Dabie)',
            '31 Dicembre 1948 (30% PCC / 70% ROC): mentre reparti dell\'EPL si attestano a nord verso Xiangyang e Huanggang sui Monti Dabie, il generale Bai Chongxi mantiene la roccaforte strategica di Wuhan e la linea dello Yangtze.',
            'Alleati',
            'Repubblica di Cina — Comando Generale della Cina Centrale (Gen. Bai Chongxi · Wuhan)'
          );
        case 'CHN_SHAANXI':
          return makeResult(
            'CHI',
            'Shaanxi (50% PCC Nord & Yan\'an / 50% ROC Valle del Wei e Xi\'an)',
            '31 Dicembre 1948 (50% PCC / 50% ROC): Peng Dehuai consolida l\'intero Shaanxi settentrionale da Yan\'an verso la valle del Wei, dove il gen. Hu Zongnan presidia Xi\'an e il corso meridionale dello Shaanxi.',
            'Alleati',
            'Repubblica di Cina — Pacification HQ di Xi\'an (Gen. Hu Zongnan — 50% ROC / 50% PCC)'
          );
      }
    }
    if (isJune1948) {
      switch (chnId) {
        case 'CHN_HEILONGJIANG':
          return makeResult(
            'CCP_CHI',
            'Heilongjiang / Harbin (100% PCC — Base Strategica Consolidata del Nord-Est, Lin Biao)',
            '30 Giugno 1948 (100% Partito Comunista Cinese): l\'intera Manciuria settentrionale (Heilongjiang, Nenjiang, Hejiang, Songjiang, Xing\'an) con capitale Harbin costituisce il retrovia industriale, agricolo e ferroviario inviolato dell\'Armata Campale del Nord-Est di Lin Biao e Luo Ronghuan.',
            'Comintern',
            'Partito Comunista Cinese — Ufficio del Nord-Est & EPL (Lin Biao · Harbin — 100% PCC)'
          );
        case 'CHN_JILIN':
          return makeResult(
            'CCP_CHI',
            'Jilin (97% PCC — Caduta di Jilin City il 9 Marzo 1948 & Assedio di Changchun)',
            '30 Giugno 1948 (97% PCC / 3% ROC): il 9 marzo 1948 le forze comuniste di Lin Biao conquistano Jilin City (Yongji); al 30 giugno 1948 al Kuomintang (ROC) resta unicamente la città assediata di Changchun (1ª Armata del gen. Zheng Dongguo), completamente isolata dal blocco terrestre e aereo dell\'EPL iniziato nel maggio 1948.',
            'Comintern',
            'Esercito Popolare di Liberazione — Comando del Nord-Est (Lin Biao — 97% PCC / Assedio di Changchun)'
          );
        case 'CHN_LIAONING':
          return makeResult(
            'CCP_CHI',
            'Liaoning (90% PCC — Presa di Yingkou e Siping; Sacche ROC di Shenyang e Jinzhou)',
            '30 Giugno 1948 (90% PCC / 10% ROC): al termine dell\'Offensiva d\'Inverno nel Nord-Est, l\'EPL espugna il porto di Yingkou (25 febbraio 1948) e lo snodo strategico ferroviario di Siping (13 marzo 1948). Al 30 giugno 1948 le forze nazionaliste di Wei Lihuang sono ridotte a due sole sacche isolate: Shenyang (Mukden) e il corridoio Jinzhou–Huludao (escluso Port Arthur/Dalian a sud sotto occupazione sovietica).',
            'Comintern',
            'Esercito Popolare di Liberazione — Comando del Nord-Est (Lin Biao — 90% PCC)'
          );
        case 'CHN_MANCHUKUO_XINGAN_NORTH':
        case 'CHN_MANCHUKUO_XINGAN_SOUTH':
        case 'CHN_INNER_MONGOLIA':
          return makeResult(
            'CCP_CHI',
            'Mongolia Interna / Nei Mongol (75% PCC — Consolidamento di Rehe e Chahar Orientale)',
            '30 Giugno 1948 (75% PCC / Governo Autonomo della Mongolia Interna · 25% ROC): l\'EPL e il Governo Autonomo di Ulanhu consolidano il controllo sul Rehe e sul Chahar orientale; la ROC (Gen. Fu Zuoyi) mantiene esclusivamente il settore occidentale del Suiyuan attorno a Guisui (Hohhot) e Baotou.',
            'Comintern',
            'Governo Autonomo della Mongolia Interna & EPL (Ulanhu — 75% PCC)'
          );
        case 'CHN_HEBEI':
          return makeResult(
            'CCP_CHI',
            'Hebei (88% PCC — Unificazione della Regione Militare della Cina del Nord, Maggio 1948)',
            '30 Giugno 1948 (88% PCC / 12% ROC): nel maggio 1948 il PCC fonde formalmente le regioni liberate di Jin-Cha-Ji e Jin-Ji-Lu-Yu nella Regione Militare della Cina del Nord (Nie Rongzhen) e nel Governo Popolare della Cina del Nord; il Kuomintang (Gen. Fu Zuoyi) è confinato al corridoio ferroviario Beiping–Tianjin–Tangshan–Qinhuangdao e alle città isolate di Baoding e Zhangjiakou.',
            'Comintern',
            'Esercito Popolare di Liberazione — Regione Militare della Cina del Nord (Nie Rongzhen — 88% PCC)'
          );
        case 'CHN_BEIJING':
          return makeResult(
            'CHI',
            'Beiping / Pechino (Corridoio Ferroviario ROC Assediato nell\'Hebei — Gen. Fu Zuoyi)',
            '30 Giugno 1948: mentre l\'88% dell\'Hebei è controllato dall\'EPL, Beiping (Pechino) e il corridoio ferroviario verso Tianjin e Zhangjiakou restano presidiati dalle armate nazionaliste del generale Fu Zuoyi.',
            'Alleati',
            'Repubblica di Cina — Comando di Soppressione della Cina del Nord (Gen. Fu Zuoyi · Beiping)'
          );
        case 'CHN_TIANJIN':
          return makeResult(
            'CHI',
            'Tianjin / Tientsin (Piazzaforte Portuale e Ferroviaria ROC nell\'Hebei)',
            '30 Giugno 1948: il polo portuale di Tianjin e il corridoio ferroviario verso Beiping, Tangshan e Qinhuangdao restano sotto il controllo nazionalista ROC, circondati dalle campagne dell\'Hebei (88% PCC).',
            'Alleati',
            'Repubblica di Cina — Guarnigione di Tientsin (KMT / ROC)'
          );
        case 'CHN_SHANXI':
          return makeResult(
            'CCP_CHI',
            'Shanxi (92% PCC — Caduta di Linfen il 17 Maggio 1948; ROC solo a Taiyuan e Datong)',
            '30 Giugno 1948 (92% PCC / 8% ROC): il 17 maggio 1948, al termine di 72 giorni di assedio e guerra di mine sotterranee, le truppe dell\'EPL di Xu Xiangqian espugnano la piazzaforte di Linfen eliminando ogni presenza nazionalista nello Shanxi meridionale; a Yan Xishan (ROC) restano solo le due isole fortificate e accerchiate di Taiyuan e Datong.',
            'Comintern',
            'Esercito Popolare di Liberazione — 1° Corpo della Cina del Nord (Xu Xiangqian — 92% PCC)'
          );
        case 'CHN_SHANDONG':
          return makeResult(
            'CCP_CHI',
            'Shandong (88% PCC — Presa di Weixian/Weifang in Aprile; ROC Isolata a Jinan, Qingdao e Yantai)',
            '30 Giugno 1948 (88% PCC / 12% ROC): nell\'aprile 1948 l\'Armata della Cina Orientale (Xu Shiyou e Tan Zhenlin) espugna Weixian (Weifang), spezzando in due la ferrovia Jiaoji e congiungendo le basi di Bohai, Luzhong e Jiaodong; al 30 giugno 1948 la ROC tiene soltanto le tre enclave isolate di Jinan (Gen. Wang Yaowu), Qingdao (con base navale USA) e Yantai.',
            'Comintern',
            'Esercito Popolare di Liberazione — Armata della Cina Orientale (Su Yu · Xu Shiyou — 88% PCC)'
          );
        case 'CHN_HENAN':
          return makeResult(
            'CCP_CHI',
            'Henan (65% PCC / 35% ROC — Presa di Luoyang il 5 Aprile & Campagna dell\'Henan Orientale)',
            '30 Giugno 1948 (65% PCC / 35% ROC — Maggioranza PCC): il 5 aprile 1948 le armate comuniste riconquistano definitivamente l\'antica capitale Luoyang e tra maggio e fine giugno 1948 (Campagna di Wanxi e Campagna dell\'Henan Orientale / Kaifeng, 17–26 giugno) Su Yu e Chen Yi travolgono le difese nazionaliste nella pianura centrale; alla ROC restano solo i nodi ferroviari di Zhengzhou, Kaifeng, Xuchang e Nanyang assediata.',
            'Comintern',
            'Esercito Popolare di Liberazione — Armate della Pianura Centrale e Cina Orientale (Liu-Deng & Su Yu — 65% PCC)'
          );
        case 'CHN_SHAANXI':
          return makeResult(
            'CHI',
            'Shaanxi (45% PCC Riconquista di Yan\'an il 21 Aprile 1948 / 55% ROC Valle del Wei e Xi\'an)',
            '30 Giugno 1948 (45% PCC / 55% ROC): dopo la schiacciante vittoria di Yichuan (marzo 1948), il 21 aprile 1948 l\'Armata Campale del Nord-Ovest di Peng Dehuai riconquista definitivamente la storica capitale rossa di Yan\'an e lo Shaanxi settentrionale; il Kuomintang (Gen. Hu Zongnan) conserva il 55% della provincia con la popolosa valle del fiume Wei (Xi\'an) e lo Shaanxi meridionale.',
            'Alleati',
            'Repubblica di Cina — Pacification HQ di Xi\'an (55% ROC Valle del Wei / 45% PCC Yan\'an Riconquistata)'
          );
        case 'CHN_JIANGSU':
        case 'CHN_SHANGHAI':
          return makeResult(
            'CHI',
            chnId === 'CHN_SHANGHAI'
              ? 'Shanghai (Metropoli Finanziaria ROC & Iperinflazione del Fabi — Giugno 1948)'
              : 'Jiangsu & Capitale Nanchino (Insediamento Presidenziale di Chiang Kai-shek, 20 Maggio 1948)',
            '30 Giugno 1948 (60% ROC / 40% PCC Subei): mentre il PCC presidia il Jiangsu settentrionale (Subei), a Nanchino (Nanjing) l\'Assemblea Nazionale elegge Chiang Kai-shek primo Presidente costituzionale della Repubblica di Cina (con Li Zongren vicepresidente), insediato solennemente il 20 maggio 1948 nel pieno di una devastante crisi iperinflazionistica a Shanghai.',
            'Alleati',
            'Zhōnghuá Mínguó — Presidenza Costituzionale di Chiang Kai-shek (Nanjing, 20 Maggio 1948 — 60% ROC / 40% PCC)'
          );
      }
    }
    if (isDec1947) {
      switch (chnId) {
        case 'CHN_HEILONGJIANG':
          return makeResult(
            'CCP_CHI',
            'Heilongjiang / Harbin (100% PCC — Base Strategica del Nord-Est, Lin Biao)',
            '31 Dicembre 1947 (100% Partito Comunista Cinese): eliminato ogni residuo controllo nazionalista nelle province storiche di Heilongjiang, Nenjiang, Hejiang, Songjiang e Xing\'an; Harbin è la capitale politica, industriale e ferroviaria dell\'Armata Democratica Unita del Nord-Est di Lin Biao e Luo Ronghuan.',
            'Comintern',
            'Partito Comunista Cinese — Ufficio del Nord-Est & EPL (Lin Biao · Harbin — 100% PCC)'
          );
        case 'CHN_JILIN':
          return makeResult(
            'CCP_CHI',
            'Jilin (92% PCC — Sacche Nazionaliste Assediate di Changchun e Jilin City)',
            '31 Dicembre 1947 (92% PCC / 8% ROC): a seguito dell\'Offensiva d\'Autunno nel Nord-Est, l\'Esercito Popolare di Liberazione di Lin Biao controlla il 92% della provincia (inclusa Yanbian e Mudanjiang); il Kuomintang (ROC) mantiene esclusivamente le due sacche urbane assediate e isolate lungo la ferrovia di Changchun e Jilin City.',
            'Comintern',
            'Esercito Popolare di Liberazione — Comando del Nord-Est (Lin Biao — 92% PCC)'
          );
        case 'CHN_LIAONING':
          return makeResult(
            'CCP_CHI',
            'Liaoning (75% PCC — Offensiva d\'Inverno & Assedio del Corridoio di Shenyang)',
            '31 Dicembre 1947 (75% PCC / 25% ROC): dopo l\'Offensiva d\'Autunno (settembre–novembre 1947) e l\'avvio dell\'Offensiva d\'Inverno (15 dicembre 1947), il PCC controlla il 75% della provincia (aree rurali, penisola di Andong/Dandong, entroterra orientale e occidentale); la ROC è ridotta a un corridoio ferroviario assediato e discontinuo attorno a Shenyang (Mukden), Siping, Jinzhou e Yingkou (escluso Port Arthur/Dalian a sud sotto controllo URSS).',
            'Comintern',
            'Esercito Popolare di Liberazione — Offensiva d\'Inverno in Manciuria (Lin Biao — 75% PCC)'
          );
        case 'CHN_MANCHUKUO_XINGAN_NORTH':
        case 'CHN_MANCHUKUO_XINGAN_SOUTH':
        case 'CHN_INNER_MONGOLIA':
          return makeResult(
            'CCP_CHI',
            'Mongolia Interna / Nei Mongol (70% PCC — Governo Autonomo di Ulanhu & Suiyuan Contesa)',
            '31 Dicembre 1947 (70% PCC / Governo Autonomo della Mongolia Interna · 30% ROC): il Governo Autonomo della Mongolia Interna guidato da Ulanhu e l\'EPL controllano l\'intera sezione orientale e centro-orientale (Hulunbuir, Hinggan, Tongliao, Chifeng, Xilin Gol); la ROC (Gen. Fu Zuoyi) mantiene la sezione occidentale attorno a Guisui (Hohhot) e Baotou nella provincia storica del Suiyuan.',
            'Comintern',
            'Governo Autonomo della Mongolia Interna & EPL (Ulanhu — 70% PCC)'
          );
        case 'CHN_HEBEI':
          return makeResult(
            'CCP_CHI',
            'Hebei (85% PCC — Presa di Shijiazhuang del 12 Novembre 1947 & Unificazione del Nord)',
            '31 Dicembre 1947 (85% PCC / 15% ROC): con la storica conquista di Shijiazhuang il 12 novembre 1947 da parte delle forze di Nie Rongzhen, il PCC salda le regioni liberate di Jin-Cha-Ji e Jin-Ji-Lu-Yu unificando la pianura dell\'Hebei; la ROC controlla solo Beiping (Pechino), Tianjin, Baoding, Tangshan, Zhangjiakou (Kalgan) e la fascia ferroviaria Pechino–Tientsin–Shanhaiguan.',
            'Comintern',
            'Esercito Popolare di Liberazione — Regione Militare della Cina del Nord (Nie Rongzhen — 85% PCC)'
          );
        case 'CHN_BEIJING':
          return makeResult(
            'CHI',
            'Beiping / Pechino (Corridoio Ferroviario Nazionalista ROC — Gen. Fu Zuoyi)',
            '31 Dicembre 1947: mentre le campagne dell\'Hebei sono per l\'85% sotto controllo comunista dopo la presa di Shijiazhuang (12 novembre 1947), la città di Beiping (Pechino) e il corridoio ferroviario verso Kalgan e Tientsin restano presidiati dalle armate nazionaliste del generale Fu Zuoyi (Comando di Soppressione della Cina Settentrionale).',
            'Alleati',
            'Repubblica di Cina — Comando di Soppressione della Cina del Nord (Gen. Fu Zuoyi · Beiping)'
          );
        case 'CHN_TIANJIN':
          return makeResult(
            'CHI',
            'Tianjin / Tientsin (Piazzaforte Portuale e Ferroviaria ROC nell\'Hebei)',
            '31 Dicembre 1947: il grande porto industriale di Tianjin (Tientsin) e l\'asse ferroviario Pechino–Tientsin–Tangshan–Shanhaiguan restano sotto il controllo del Kuomintang (ROC), circondati dall\'entroterra rurale dell\'Hebei (85% PCC).',
            'Alleati',
            'Repubblica di Cina — Guarnigione di Tientsin (KMT / ROC)'
          );
        case 'CHN_SHANXI':
          return makeResult(
            'CCP_CHI',
            'Shanxi (85% PCC — Enclave Fortificate ROC di Taiyuan, Datong e Linfen)',
            '31 Dicembre 1947 (85% PCC / 15% ROC): dopo la presa comunista di Yuncheng (dicembre 1947), l\'Esercito Popolare di Liberazione controlla l\'85% dello Shanxi; le forze nazionaliste del signore della guerra Yan Xishan sono confinate alle sole enclave fortificate e assediate di Taiyuan, Datong e Linfen.',
            'Comintern',
            'Esercito Popolare di Liberazione — Fronte dello Shanxi (Xu Xiangqian — 85% PCC)'
          );
        case 'CHN_SHANDONG':
          return makeResult(
            'CCP_CHI',
            'Shandong (75% PCC — Base dei Monti Yimeng & Penisola dello Jiaodong)',
            '31 Dicembre 1947 (75% PCC / 25% ROC): l\'Armata Campale della Cina Orientale (Chen Yi e Su Yu) controlla il 75% dello Shandong (entroterra centrale/meridionale dei Monti Yimeng e gran parte della penisola dello Jiaodong); la ROC mantiene Jinan, Qingdao, Weifang, il corridoio ferroviario Jiaoji e il porto di Yantai (Chefoo, riconquistato dai nazionalisti il 1° ottobre 1947).',
            'Comintern',
            'Esercito Popolare di Liberazione — Armata della Cina Orientale (Chen Yi · Su Yu — 75% PCC)'
          );
        case 'CHN_HENAN':
          return makeResult(
            'CCP_CHI',
            'Henan (55% PCC / 45% ROC — Offensiva della Pianura Centrale & Monti Dabie)',
            '31 Dicembre 1947 (55% PCC / 45% ROC): il PCC (armate di Liu Bocheng, Deng Xiaoping, Chen Geng e Chen Yi) controlla la metà settentrionale dell\'Henan a nord del Fiume Giallo, vaste aree della pianura orientale e il settore sud-orientale dei Monti Dabie (Xinyang); la ROC mantiene Zhengzhou, Kaifeng, Luoyang e il corridoio ferroviario Lunghai.',
            'Comintern',
            'Esercito Popolare di Liberazione — Pianura Centrale & Monti Dabie (Liu Bocheng · Deng Xiaoping — 55% PCC)'
          );
        case 'CHN_SHAANXI':
          return makeResult(
            'CHI',
            'Shaanxi (40% PCC Nord / 60% ROC Valle del Wei e Xi\'an)',
            '31 Dicembre 1947 (40% PCC / 60% ROC): l\'Armata Campale del Nord-Ovest di Peng Dehuai controlla l\'intera fascia settentrionale dello Shaanxi (regione di confine Shaan-Gan-Ning, altopiano del Loess e aree rurali attorno a Yan\'an), mentre il Kuomintang (Gen. Hu Zongnan) controlla il 60% della provincia inclusa la popolosa valle del Wei (Xi\'an) e il sud.',
            'Alleati',
            'Repubblica di Cina — Pacification HQ di Xi\'an (Gen. Hu Zongnan — 60% ROC / 40% PCC)'
          );
        case 'CHN_GANSU':
        case 'CHN_NINGXIA':
          return makeResult(
            'CHI',
            `${histName} (85% ROC / 15% PCC Longdong Orientale)`,
            '31 Dicembre 1947 (15% PCC / 85% ROC): il Partito Comunista Cinese controlla l\'estremità orientale del Gansu (prefettura di Qingyang / Longdong nella base Shaan-Gan-Ning), mentre l\'85% del territorio (Lanzhou, il Corridoio di Hexi e l\'intero Ningxia governato da Ma Hongkui) resta sotto saldo controllo nazionalista ROC.',
            'Alleati',
            'Repubblica di Cina — Comando del Nord-Ovest (Lanzhou / Ningxia — 85% ROC / 15% PCC)'
          );
        case 'CHN_ANHUI':
          return makeResult(
            'CHI',
            'Anhui (45% PCC Nord & Monti Dabie / 55% ROC Hefei, Anqing e Sud Yangtze)',
            '31 Dicembre 1947 (45% PCC / 55% ROC): il PCC controlla la fascia settentrionale dell\'Anhui (a nord del fiume Huai) e l\'area montuosa sud-occidentale dei Monti Dabie a nord dello Yangtze; la ROC controlla il 55% della provincia con Hefei, Anqing, Bengbu e l\'intero settore a sud dello Yangtze.',
            'Alleati',
            'Repubblica di Cina — Provincia dell\'Anhui (55% ROC / 45% PCC Fronte Huai-Dabie)'
          );
        case 'CHN_HUBEI':
          return makeResult(
            'CHI',
            'Hubei (75% ROC Wuhan & Yangtze / 25% PCC Monti Dabie Nord-Orientali)',
            '31 Dicembre 1947 (25% PCC / 75% ROC): l\'Armata di Liu-Deng del PCC controlla il quadrante nord-orientale dell\'Hubei (versante meridionale dei Monti Dabie a nord di Wuhan, tra Huanggang e Xiaogan); la ROC (Gen. Bai Chongxi) mantiene Wuhan e il 75% della provincia.',
            'Alleati',
            'Repubblica di Cina — Quartier Generale di Wuhan (Gen. Bai Chongxi — 75% ROC / 25% PCC)'
          );
        case 'CHN_JIANGSU':
        case 'CHN_SHANGHAI':
          return makeResult(
            'CHI',
            chnId === 'CHN_SHANGHAI'
              ? 'Shanghai (Metropoli Finanziaria ROC — Jiangsu 60% ROC / 40% PCC Subei)'
              : 'Jiangsu & Capitale Nanchino (60% ROC Sud / 40% PCC Jiangsu Settentrionale Subei)',
            '31 Dicembre 1947 (40% PCC / 60% ROC): il PCC controlla gran parte del Jiangsu Settentrionale (Subei) a nord del fiume Huai e dello Yangtze; la Repubblica di Cina (ROC) controlla saldamente la capitale nazionale Nanchino (Nanjing, dove il 25 dicembre 1947 entra in vigore la nuova Costituzione della Repubblica di Cina), la metropoli di Shanghai, Suzhou e l\'intero Jiangsu meridionale.',
            'Alleati',
            'Zhōnghuá Mínguó — Capitale Nazionale Nanchino & Shanghai (60% ROC / 40% PCC Subei)'
          );
        case 'CHN_TAIWAN':
          return makeResult(
            'CHI',
            'Taiwan (100% ROC — Governatorato di Wei Tao-ming)',
            '31 Dicembre 1947 (100% ROC): la provincia insulare di Taiwan è interamente sotto controllo del Governo Nazionalista della Repubblica di Cina sotto il governatore civile Wei Tao-ming.',
            'Alleati',
            'Zhōnghuá Mínguó — Táiwān Shěng (Wei Tao-ming — 100% ROC)'
          );
        case 'CHN_XINJIANG_ETR':
          return makeResult(
            'ETR',
            'Seconda Repubblica del Turkestan Orientale (Ili, Tarbagatay & Altay — Ghulja)',
            '31 Dicembre 1947: i tre distretti nord-occidentali dello Xinjiang (Ili, Tarbagatay e Altay) costituiscono la Seconda Repubblica del Turkestan Orientale con capitale a Ghulja (Yining) sotto Ehmetjan Qasimi, Stato secessionista filo-sovietico de facto indipendente da Nanchino lungo la linea del fiume Manas.',
            'Comintern',
            'Shärqiy Türkistan Jumhuriyiti — Consiglio dei Tre Distretti (Ehmetjan Qasimi · Ghulja)'
          );
        case 'CHN_XINJIANG':
          return makeResult(
            'CHI',
            'Xinjiang / Ürümqi & Bacino del Tarim (Governo Nazionalista ROC — Masud Sabri)',
            '31 Dicembre 1947: il Governo Nazionalista della Repubblica di Cina (governatore Masud Sabri e guarnigione del Gen. Song Xilian) controlla Dihua/Ürümqi, Hami, Turpan e il Bacino del Tarim a est e a sud del fronte del fiume Manas.',
            'Alleati',
            'Repubblica di Cina — Provincia dello Xinjiang (Ürümqi / ROC — Masud Sabri)'
          );
        case 'CHN_TIBET':
          return makeResult('TIB', 'Bod (Tibet — Lhasa)', 'Stato teocratico tibetano de facto indipendente sotto il Kashag di Lhasa.', 'Neutrale', 'Kashag — Bod (Lhasa)');
        case 'CHN_HONGKONG':
          return makeResult('UK', 'Crown Colony of Hong Kong', 'Colonia della Corona Britannica nel dopoguerra (Governatore Sir Alexander Grantham).', 'Alleati', 'British Empire — Hong Kong');
        case 'CHN_MACAU':
          return makeResult('POR', 'Macau Português (Província Ultramarina)', 'Provincia d\'oltremare portoghese neutrale.', 'Neutrale', 'República Portuguesa — Macau');
        default:
          return makeResult(
            'CHI',
            `${histName} (100% ROC — Repubblica di Cina Nazionalista)`,
            '31 Dicembre 1947 (100% ROC): provincia della Cina meridionale/occidentale interamente sotto il controllo del Governo Nazionalista della Repubblica di Cina (con sole sacche minori di guerriglia comunista locale nell\'entroterra montano di Hainan e del confine Fujian-Zhejiang).',
            'Alleati',
            'Zhōnghuá Mínguó Guómín Zhèngfǔ (Nanjing — 100% ROC)'
          );
      }
    }
    switch (chnId) {
      case 'CHN_HEILONGJIANG':
        return makeResult(
          'CCP_CHI',
          'Heilongjiang / Harbin (Capitale Nord-Orientale dell\'EPL — Lin Biao)',
          'Settembre 1947: Harbin e l\'Heilongjiang formano il quartier generale e retrovia industriale dell\'Esercito Popolare di Liberazione del Nord-Est guidato da Lin Biao e Luo Ronghuan.',
          'Comintern',
          'Esercito Popolare di Liberazione — Comando del Nord-Est (Lin Biao · Harbin)'
        );
      case 'CHN_JILIN':
        return makeResult(
          'CCP_CHI',
          'Jilin (Offensiva dell\'EPL — Assedio di Changchun)',
          'Settembre 1947: le colonne dell\'Esercito Popolare di Liberazione controllano la provincia di Jilin e stringono d\'assedio la guarnigione nazionalista di Changchun.',
          'Comintern',
          'Esercito Popolare di Liberazione — Comando del Nord-Est (Lin Biao)'
        );
      case 'CHN_MANCHUKUO_XINGAN_NORTH':
        return makeResult(
          'CCP_CHI',
          'Xing\'an Settentrionale / Hulunbuir (Governo Autonomo della Mongolia Interna — Ulanhu)',
          '1° maggio 1947: Ulanhu istituisce il Governo Autonomo della Mongolia Interna a Ulanhot in stretto coordinamento con il Partito Comunista Cinese e le forze di Lin Biao.',
          'Comintern',
          'Governo Autonomo della Mongolia Interna (Ulanhu)'
        );
      case 'CHN_MANCHUKUO_XINGAN_SOUTH':
        return makeResult(
          'CCP_CHI',
          'Xing\'an Meridionale & Hinggan (Mongolia Interna — Ulanhu / EPL)',
          'Settembre 1947: settore meridionale del Governo Autonomo della Mongolia Interna guidato da Ulanhu a sostegno dell\'offensiva dell\'EPL in Manciuria.',
          'Comintern',
          'Governo Autonomo della Mongolia Interna (Ulanhu)'
        );
      case 'CHN_SHANDONG':
        return makeResult(
          'CCP_CHI',
          'Shandong Liberato (Vittoria di Menglianggu — Armata della Cina Orientale)',
          'Maggio-Settembre 1947: dopo il trionfo nella battaglia di Menglianggu (annientamento della 74ª Divisione nazionalista), i comandanti Chen Yi e Su Yu consolidano lo Shandong sotto il controllo dell\'EPL.',
          'Comintern',
          'Esercito Popolare di Liberazione — Armata della Cina Orientale (Chen Yi · Su Yu)'
        );
      case 'CHN_SHAANXI':
        return makeResult(
          'CCP_CHI',
          'Shaan-Gan-Ning (Shaanxi Settentrionale — Vittoria di Shajiadian)',
          'Agosto-Settembre 1947: l\'Armata da Campo del Nord-Ovest di Peng Dehuai capovolge le sorti della campagna nello Shaanxi sconfiggendo le forze nazionaliste nella battaglia di Shajiadian (18-20 agosto 1947).',
          'Comintern',
          'Esercito Popolare di Liberazione — Armata del Nord-Ovest (Peng Dehuai)'
        );
      case 'CHN_LIAONING':
        return makeResult(
          'CHI',
          'Liaoning — Sacche Nazionaliste Isolate (Shenyang & Jinzhou)',
          'Settembre 1947: il generale Chen Cheng difende le guarnigioni nazionaliste di Shenyang e Jinzhou, sempre più isolate dalle offensive di Lin Biao lungo la ferrovia Beining.',
          'Alleati',
          'Repubblica di Cina — Comando del Nord-Est (Gen. Chen Cheng · Shenyang)'
        );
      case 'CHN_HENAN':
        return makeResult(
          'CHI',
          'Henan (Offensiva di Liu Bocheng & Deng Xiaoping Verso i Monti Dabie)',
          'Agosto-Settembre 1947: l\'Armata da Campo della Pianura Centrale guidata da Liu Bocheng e Deng Xiaoping sfonda attraverso l\'Henan marciando fino ai Monti Dabie (Dabie Shan) nel cuore della Cina centrale.',
          'Alleati',
          'Repubblica di Cina — Zona di Guerra della Cina Centrale'
        );
      case 'CHN_HUBEI':
        return makeResult(
          'CHI',
          'Hubei / Wuhan (Difesa Strategica dello Yangtze — Gen. Bai Chongxi)',
          'Settembre 1947: il generale Bai Chongxi appronta la difesa strategica di Wuhan e della valle dello Yangtze contro la nuova testa di ponte dell\'EPL di Liu-Deng sui Monti Dabie.',
          'Alleati',
          'Repubblica di Cina — Quartier Generale di Wuhan (Gen. Bai Chongxi)'
        );
      case 'CHN_ANHUI':
        return makeResult(
          'CHI',
          'Anhui Occidentale & Settentrionale (Fronte dei Monti Dabie — Minaccia su Nanchino)',
          'Settembre 1947: la spinta di Liu Bocheng e Deng Xiaoping nei Monti Dabie (Dabie Shan) porta i reparti dell\'EPL lungo il confine occidentale dell\'Anhui alle porte dello Yangtze.',
          'Alleati',
          'Repubblica di Cina — Governo Nazionalista'
        );
      case 'CHN_JIANGSU':
        return makeResult(
          'CHI',
          'Nanjing / Jiangsu (Capitale Nazionalista — Crisi Economica del Fabi)',
          'Settembre 1947: Nanchino (Nanjing) è capitale della Repubblica di Cina sotto Chiang Kai-shek, gravata dalla galoppante iperinflazione della valuta cartacea Fabi mentre infuria la guerra civile.',
          'Alleati',
          'Zhōnghuá Mínguó — Governo Nazionalista (Nanjing)'
        );
      case 'CHN_TAIWAN':
        return makeResult(
          'CHI',
          'Taiwan — Governatorato di Wei Tao-ming (Post Incidente del 28 Febbraio 1947)',
          'Settembre 1947: dopo il sanguinoso Incidente del 28 Febbraio (Incidente 228) e il giro di vite militare, l\'ex ambasciatore Wei Tao-ming assume la carica di Governatore civile di Taiwan.',
          'Alleati',
          'Zhōnghuá Mínguó — Táiwān Shěng (Wei Tao-ming)'
        );
      case 'CHN_XINJIANG_ETR':
        return makeResult(
          'ETR',
          'Seconda Repubblica del Turkestan Orientale (Ili, Tarbagatay & Altay — Ghulja)',
          'Settembre 1947: fallito il governo di coalizione di Ürümqi con l\'insediamento del governatore KMT Masud Sabri (maggio-agosto 1947), la delegazione di Ehmetjan Qasimi rientra a Ghulja. I tre distretti nord-occidentali (Ili, Tarbagatay e Altay) restano uno Stato secessionista filo-sovietico di fatto indipendente da Nanchino dietro il fronte del fiume Manas fino al 1949.',
          'Comintern',
          'Shärqiy Türkistan Jumhuriyiti — Consiglio dei Tre Distretti (Ehmetjan Qasimi · Ghulja)'
        );
      case 'CHN_XINJIANG':
        return makeResult(
          'CHI',
          'Xinjiang / Ürümqi & Bacino del Tarim (Governo Nazionalista KMT)',
          'Settembre 1947: il Governo Nazionalista (KMT di Masud Sabri e Gen. Song Xilian) controlla Dihua/Ürümqi, Hami, Turpan e il Bacino del Tarim lungo il fronte del fiume Manas dopo la rottura della coalizione con la Seconda Repubblica del Turkestan Orientale di Ehmetjan Qasim nei Tre Distretti.',
          'Alleati',
          'Repubblica di Cina — Provincia dello Xinjiang (Ürümqi / KMT — Masud Sabri)'
        );
      case 'CHN_TIBET':
        return makeResult('TIB', 'Bod (Tibet — Lhasa)', 'Stato teocratico tibetano de facto indipendente sotto il Kashag di Lhasa.', 'Neutrale', 'Kashag — Bod (Lhasa)');
      case 'CHN_HONGKONG':
        return makeResult('UK', 'Crown Colony of Hong Kong', 'Colonia della Corona Britannica nel dopoguerra (Governatore Sir Alexander Grantham).', 'Alleati', 'British Empire — Hong Kong');
      case 'CHN_MACAU':
        return makeResult('POR', 'Macau Português (Província Ultramarina)', 'Provincia d\'oltremare portoghese neutrale.', 'Neutrale', 'República Portuguesa — Macau');
      default:
        return makeResult(
          'CHI',
          `${histName} (Repubblica di Cina — KMT)`,
          'Settembre 1947: provincia controllata dal Governo Nazionalista della Repubblica di Cina.',
          'Alleati',
          'Zhōnghuá Mínguó Guómín Zhèngfǔ (Nanjing)'
        );
    }
  }

  // Step 18 (Settembre 1945): Capitolazione Giapponese, Ritorno di Taiwan & Hong Kong, Unione Yan'an-KMT Pre-Conflitto
  if (s === 18) {
    if (nid === 'CHN_XINJIANG_ETR') {
      return makeResult(
        'ETR',
        'Seconda Repubblica del Turkestan Orientale (Tre Distretti: Ili, Tarbagatay & Altay)',
        'Settembre 1945: l\'Esercito Nazionale del Turkestan Orientale completa la conquista dei Tre Distretti (Ili, Tarbagatay e Altay) attestandosi sulla riva del fiume Manas alle porte di Dihua (Ürümqi) sotto mediazione sovietica.',
        'Comintern',
        'Shärqiy Türkistan Jumhuriyiti — Alikhan Töre / Ehmetjan Qasimi (Ghulja)'
      );
    }
    if (nid === 'CHN_XINJIANG') {
      return makeResult(
        'CHI',
        'Xinjiang / Ürümqi & Bacino del Tarim (Presidio Nazionalista KMT)',
        'Settembre 1945: il Governo Nazionalista di Zhang Zhizhong e Wu Zhongxin mantiene Dihua (Ürümqi), Hami e il Bacino del Tarim negoziando la tregua sul fiume Manas con i delegati della Seconda Repubblica del Turkestan Orientale.',
        'Alleati',
        'Zhōnghuá Mínguó — Provincia dello Xinjiang (Ürümqi)'
      );
    }
    if (nid === 'CHN_TIBET') return makeResult('TIB', 'Bod (Tibet — Lhasa)', 'Stato teocratico tibetano de facto indipendente.', 'Neutrale', 'Kashag — Bod (Lhasa)');
    if (nid === 'CHN_MACAU') return makeResult('POR', 'Macau Português', 'Provincia d\'oltremare portoghese neutrale.', 'Neutrale', 'República Portuguesa — Macau');
    if (nid === 'CHN_HONGKONG') {
      return makeResult(
        'UK',
        'Crown Colony of Hong Kong (Ripristino Sovranità Britannica)',
        '30 agosto 1945: la Task Force navale dell\'ammiraglio Sir Cecil Harcourt rientra a Victoria Harbour ristabilendo l\'amministrazione britannica su Hong Kong.',
        'Alleati',
        'British Empire — Hong Kong Military Administration'
      );
    }
    if (nid === 'CHN_TAIWAN') {
      return makeResult(
        'CHI',
        'Taiwan / Formosa (Restituzione alla Repubblica di Cina)',
        'Settembre 1945: resa del governatorato giapponese di Formosa e preparazione della cerimonia di retrocessione alla Repubblica di Cina.',
        'Alleati',
        'Zhōnghuá Mínguó — Provincia di Taiwan'
      );
    }
    if (nid === 'CHN_SHAANXI') {
      return makeResult(
        'CCP_CHI',
        'Shaan-Gan-Ning Bianqu (Yan\'an — Base Centrale PCC)',
        'Settembre 1945: quartier generale di Mao Zedong e dell\'Armata Rossa Cinese a Yan\'an mentre si svolgono i negoziati di Chongqing con il Kuomintang.',
        'Comintern',
        'Zhongguo Gongchandang (Yan\'an)'
      );
    }
    if (
      chnId === 'CHN_HEILONGJIANG' ||
      chnId === 'CHN_JILIN' ||
      chnId === 'CHN_LIAONING' ||
      chnId === 'CHN_MANCHUKUO_XINGAN_NORTH' ||
      chnId === 'CHN_MANCHUKUO_XINGAN_SOUTH'
    ) {
      const manchuriaNames18: Record<string, string> = {
        CHN_HEILONGJIANG: 'Heilongjiang (Harbin)',
        CHN_JILIN: 'Jilin (Changchun)',
        CHN_LIAONING: 'Liaoning (Shenyang / Mukden)',
        CHN_MANCHUKUO_XINGAN_NORTH: 'Hulunbuir / Heilongjiang Occidentale (Hailar)',
        CHN_MANCHUKUO_XINGAN_SOUTH: 'Rehe / Liaoxi (Chengde & Chifeng)',
      };
      return makeResult(
        'SOV',
        `${manchuriaNames18[chnId] || histName} (Occupazione Sovietica della Manciuria)`,
        'Agosto-Settembre 1945: Operazione Tempesta d\'Agosto dell\'Armata Rossa sovietica contro l\'Armata del Kwantung; crollo definitivo del Manciukuò e amministrazione militare sovietica transitoria in Manciuria.',
        'Comintern',
        'Armata Rossa Sovietica — Comando dell\'Estremo Oriente (Maresciallo Vasilevskij)'
      );
    }
    const cleanStep18Name =
      chnId === 'CHN_INNER_MONGOLIA'
        ? 'Nei Mongol / Mongolia Interna (Chahar & Suiyuan)'
        : histName;
    return makeResult(
      'CHI',
      `${cleanStep18Name} (Repubblica di Cina — Vittorio Governo Nazionalista)`,
      'Settembre 1945: resa dell\'Esercito di Spedizione Giapponese in Cina (Gen. Okamura) al governo nazionalista di Chiang Kai-shek (Nanchino / Chongqing).',
      'Alleati',
      'Zhōnghuá Mínguó Guómín Zhèngfǔ (Chiang Kai-shek)'
    );
  }

  // Calcolo proprietario e fazione geopolitica storicamente accurata per step s (1936-1940)
  let owner = 'CHI';
  let faction: FactionType = 'Alleati';

  switch (chnId) {
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

    // 14. Hunan (Changsha — 9ª Zona di Guerra / Operazione Ichi-Go & Zhijiang 1944-1945)
    case 'CHN_HUNAN':
      if (s >= 14 && s <= 17) {
        owner = 'JAP';
        faction = 'Asse';
      } else {
        owner = 'CHI';
        faction = 'Alleati';
      }
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

    // 16. Guangxi (Li Zongren / Bai Chongxi / Operazione Ichi-Go autunno 1944)
    case 'CHN_GUANGXI':
      if (s >= 16 && s <= 17) {
        owner = 'JAP';
        faction = 'Asse';
      } else {
        owner = 'CHI';
        faction = 'Alleati';
      }
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

    // 26. Xinjiang (Sheng Shicai -> KMT 1944) & Seconda Repubblica del Turkestan Orientale (Tre Distretti dal Nov 1944)
    case 'CHN_XINJIANG_ETR':
      if (s >= 16) {
        owner = 'ETR';
        faction = 'Comintern';
      } else if (s >= 14) {
        owner = 'CHI';
        faction = 'Alleati';
      } else {
        owner = 'XIN';
        faction = 'Comintern';
      }
      break;

    case 'CHN_XINJIANG':
      if (s >= 14) {
        owner = 'CHI';
        faction = 'Alleati';
      } else {
        owner = 'XIN';
        faction = 'Comintern';
      }
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

  const top = resolveChinaToponym(chnId, histName, nrm, owner, s);
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
  Greenland: (s) => resolveGreenland(s),
  Grønland: (s) => resolveGreenland(s),
  Groenlandia: (s) => resolveGreenland(s),
  Iceland: (s) => resolveIceland(s, undefined, 'Iceland'),
  Islanda: (s) => resolveIceland(s, undefined, 'Islanda'),
  'Ísland': (s) => resolveIceland(s, undefined, 'Ísland'),
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
  'Spanish Morocco': (s) => resolveSpanishAfricanTerritory('ES_RIF', s),
  'Spanish Morocco (Rif)': (s) => resolveSpanishAfricanTerritory('ES_RIF', s),
  'Marruecos Español': (s) => resolveSpanishAfricanTerritory('ES_RIF', s),
  Rif: (s) => resolveSpanishAfricanTerritory('ES_RIF', s),
  'El Rif': (s) => resolveSpanishAfricanTerritory('ES_RIF', s),
  Tetuán: (s) => resolveSpanishAfricanTerritory('ES_RIF', s),
  Tetuan: (s) => resolveSpanishAfricanTerritory('ES_RIF', s),
  Ceuta: (s) => resolveSpanishAfricanTerritory('ES630', s),
  Melilla: (s) => resolveSpanishAfricanTerritory('ES640', s),
  Tangier: (s) => resolveTangierZone(s),
  'International Zone of Tangier': (s) => resolveTangierZone(s),
  'Tangier International Zone': (s) => resolveTangierZone(s),
  'Zona Internacional de Tanger': (s) => resolveTangierZone(s),
  'Zona Internazionale di Tangeri': (s) => resolveTangierZone(s),
  Tanger: (s) => resolveTangierZone(s),
  Tangeri: (s) => resolveTangierZone(s),
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
  Denmark: (s) => resolveGreenland(s),
  Norway: (s) => resolveSvalbard(s),
  Svalbard: (s) => resolveSvalbard(s),
  Spitsbergen: (s) => resolveSvalbard(s),
  'Jan Mayen': (s) => resolveJanMayen(s),
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

  // 0.c5 Intercettazione prioritaria Pacifico Francese (EFO, Nuova Caledonia, Nuove Ebridi, Wallis e Futuna)
  if (isFrenchPacificProvince(cleanId, name, nrm_hb)) {
    return resolveFrenchPacificProvince(f, s);
  }

  // 0.d Intercettazione prioritaria Groenlandia (Greenland / Grønland)
  const isGreenland =
    cleanId === 'GL_GREENLAND' ||
    cleanId === 'HB_FRAG_DENMARK' ||
    cleanId === 'GL' ||
    cleanId === 'GRL' ||
    P.CNTR_CODE === 'GL' ||
    P.CNTR_CODE === 'GRL' ||
    nrm_hb === 'greenland' ||
    nrm_hb === 'groenlandia' ||
    nrm_hb === 'gronland' ||
    nrm_hb.includes('greenland') ||
    nrm_hb.includes('groenlandia') ||
    nrm_hb.includes('gronland') ||
    nrm_hb.includes('kalaallit') ||
    (c[0] >= -75 && c[0] <= -10 && c[1] >= 59 && c[1] <= 84 && (rawName === 'Greenland' || rawName === 'Denmark' || subj === 'Denmark'));

  if (isGreenland) {
    return resolveGreenland(s, rawName);
  }

  // 0.e Intercettazione prioritaria Svalbard e Jan Mayen
  const isSvalbard =
    cleanId === 'NO0B2' ||
    cleanId === 'HB_FRAG_NORWAY' ||
    cleanId === 'SJ' ||
    cleanId === 'SJM' ||
    nrm_hb === 'svalbard' ||
    nrm_hb === 'spitsbergen' ||
    nrm_hb === 'spitzbergen' ||
    nrm_hb.includes('svalbard') ||
    nrm_hb.includes('spitsbergen') ||
    nrm_hb.includes('spitzbergen') ||
    (c[0] >= 10 && c[0] <= 35 && c[1] >= 74 && c[1] <= 81 && (rawName === 'Svalbard' || rawName === 'Norway' || subj === 'Norway'));

  if (isSvalbard) {
    return resolveSvalbard(s, rawName);
  }

  const isJanMayen =
    cleanId === 'NO0B1' ||
    nrm_hb === 'jan mayen' ||
    nrm_hb.includes('jan mayen') ||
    (c[0] >= -10 && c[0] <= -7 && c[1] >= 70 && c[1] <= 72 && (rawName === 'Jan Mayen' || rawName === 'Norway' || subj === 'Norway'));

  if (isJanMayen) {
    return resolveJanMayen(s, rawName);
  }

  // 0.f Intercettazione prioritaria Islanda (Iceland / Ísland)
  const isIceland =
    cleanId === 'IS001' ||
    cleanId === 'IS002' ||
    cleanId === 'IS' ||
    cleanId === 'ISL' ||
    cleanId === 'ICE' ||
    P.CNTR_CODE === 'IS' ||
    P.CNTR_CODE === 'ISL' ||
    nrm_hb === 'iceland' ||
    nrm_hb === 'islanda' ||
    nrm_hb === 'island' ||
    nrm_hb.includes('höfuðborg') ||
    nrm_hb.includes('hofudborg') ||
    nrm_hb.includes('landsbyggð') ||
    nrm_hb.includes('landsbyggd') ||
    nrm_hb.includes('reykjavik') ||
    (c[0] >= -25 && c[0] <= -13 && c[1] >= 63 && c[1] <= 67 && (rawName === 'Iceland' || rawName === 'Islanda' || subj === 'Iceland' || subj === 'Denmark'));

  if (isIceland) {
    return resolveIceland(s, cleanId, rawName);
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
    if (s >= 20) {
      return makeResult(
        'SAU',
        "Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah (Regno dell'Arabia Saudita — Dicembre 1947)",
        "Dicembre 1947: il Regno dell'Arabia Saudita di Re Abdulaziz ibn Saud consolida la propria centralità energetica (boom estrattivo ARAMCO tra Dhahran, Abqaiq e i cantieri dell'oleodotto Trans-Arabico TAPLINE) mentre al vertice della Lega Araba del Cairo appoggia diplomaticamente la causa araba palestinese contro la Ris. ONU 181 preservando gli accordi strategici con Washington.",
        'Neutrale',
        "Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah — Malik Abdulaziz Al Saud (Riyadh, Dic. 1947)"
      );
    }
    if (s >= 19) {
      return makeResult(
        'SAU',
        "Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah (Regno dell'Arabia Saudita — Re Abdulaziz Al Saud)",
        "Regno sovrano dell'Arabia Saudita sotto Re Abdulaziz ibn Saud, membro fondatore della Lega Araba (1945) e delle Nazioni Unite. Rapida espansione estrattiva ARAMCO ad Al-Hasa / Dhahran e accordi del 1947 per il futuro oleodotto Trans-Arabico (TAPLINE).",
        'Neutrale',
        "Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah — Malik Abdulaziz Al Saud (Riyadh)"
      );
    }
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
    if (s >= 20) {
      if (isLeb) {
        return makeResult(
          'LEB',
          'Repubblica Libanese (Sovranità & Vertice della Lega Araba — Beirut, Dicembre 1947)',
          "Dicembre 1947: pienamente sovrana dopo l'evacuazione alleata del 1946, la Repubblica Libanese di Béchara El Khoury e Riad Al Solh partecipa al vertice della Lega Araba del Cairo contro la spartizione della Palestina (Ris. ONU 181), rafforzando il dispositivo militare al confine meridionale con la Galilea.",
          'Neutrale',
          'Repubblica Libanese (Presidente Béchara El Khoury & P.M. Riad Al Solh — Dic. 1947)'
        );
      }
      return makeResult(
        'SYR',
        'Repubblica Siriana (Sovranità & Mobilitazione ALA — Damasco, Dicembre 1947)',
        "Dicembre 1947: al vertice della Lega Araba del Cairo (8–17 dicembre 1947), la Repubblica Siriana di Shukri al-Quwatli e Jamil Mardam Bey respinge la Risoluzione ONU 181 e apre vicino a Damasco il campo di Qatana per i volontari dell'Esercito Arabo di Liberazione (Jaysh al-Inqadh) guidato da Fawzi al-Qawuqji.",
        'Neutrale',
        'Repubblica Siriana (Presidente Shukri al-Quwatli · P.M. Jamil Mardam Bey — Dic. 1947)'
      );
    }
    if (s >= 19) {
      if (isLeb) {
        return makeResult(
          'LEB',
          'Repubblica Libanese (Indipendenza & Ritiro Truppe Alleate — Beirut)',
          'Il 31 dicembre 1946 si completa l\'evacuazione definitiva di tutte le truppe francesi e britanniche dal territorio libanese. La Repubblica Libanese è pienamente indipendente e sovrana sotto la presidenza di Béchara El Khoury e il governo di Riad Al Solh (Patto Nazionale del 1943), membro fondatore dell\'ONU e della Lega Araba.',
          'Neutrale',
          'Repubblica Libanese (Presidente Béchara El Khoury & Primo Ministro Riad Al Solh — Beirut)'
        );
      }
      return makeResult(
        'SYR',
        'Repubblica Siriana (Indipendenza & Evacuazione Franco-Britannica — Damasco)',
        'Il 17 aprile 1946 (Giorno dell\'Evacuazione, Eid al-Jalaa) le ultime truppe francesi e britanniche lasciano la Siria: la Repubblica Siriana è pienamente sovrana, guidata dal Presidente Shukri al-Quwatli e dal Primo Ministro Jamil Mardam Bey, membro fondatore della Lega Araba e delle Nazioni Unite.',
        'Neutrale',
        'Repubblica Siriana (Presidente Shukri al-Quwatli — Damasco)'
      );
    }
    if (s >= 18) {
      if (isLeb) {
        return makeResult(
          'LEB',
          'Repubblica Libanese (Patto Nazionale & Transizione Postbellica — Settembre 1945)',
          "Settembre 1945: la Repubblica Libanese indipendente sotto il Presidente Béchara El Khoury e il Patto Nazionale del 1943 (membro fondatore ONU e Lega Araba) tratta a Parigi e Londra lo sgombero definitivo delle residue forze francesi e britanniche.",
          'Alleati',
          'Repubblica Libanese (Presidente Béchara El Khoury — Beirut, Settembre 1945)'
        );
      }
      return makeResult(
        'SYR',
        'Repubblica Siriana (Post-Crisi del Levante & Negoziati di Evacuazione — Settembre 1945)',
        "Settembre 1945: dopo la Crisi del Levante di maggio-giugno 1945 (bombardamento francese di Damasco e intervento britannico), il governo sovrano del Presidente Shukri al-Quwatli — membro fondatore dell'ONU e della Lega Araba — negozia il ritiro delle ultime guarnigioni franco-britanniche.",
        'Alleati',
        'Repubblica Siriana (Presidente Shukri al-Quwatli — Damasco, Settembre 1945)'
      );
    }
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
    if (s >= 20) {
      return makeResult(
        'IRN',
        "Keshvar-e Shāhanshāhi-ye Irān (Stato Imperiale dell'Iran — Dicembre 1947)",
        "Dicembre 1947: dopo il rigetto da parte del Majlis (22 ottobre 1947, 102 voti contro 2) dell'accordo petrolifero sovietico-iraniano e la crisi di governo di Ahmad Qavam, l'Iran consolida la propria sovranità nazionale sotto lo Scià Mohammad Reza Pahlavi.",
        'Neutrale',
        "Keshvar-e Shāhanshāhi-ye Irān — Mohammad Reza Pahlavi (Dic. 1947)"
      );
    }
    if (s >= 19) {
      return makeResult(
        'IRN',
        'Keshvar-e Shāhanshāhi-ye Irān (Stato Imperiale dell\'Iran — Sovranità Restaurata)',
        "Piena sovranità iraniana restaurata dopo lo sgombero delle forze britanniche e sovietiche nel 1946 e lo scioglimento delle repubbliche separatiste di Azerbaigian e Mahabad (dicembre 1946). Sotto lo Scià Mohammad Reza Pahlavi e il Primo Ministro Ahmad Qavam, l'Iran difende l'integrità nazionale e discute al Majlis il rifiuto delle concessioni petrolifere sovietiche.",
        'Neutrale',
        'Keshvar-e Shāhanshāhi-ye Irān — Stato Imperiale dell\'Iran (Mohammad Reza Pahlavi · P.M. Ahmad Qavam)'
      );
    }
    if (s >= 18) {
      return makeResult(
        'IRN',
        "Keshvar-e Shāhanshāhi-ye Irān (Transizione Postbellica — Settembre 1945)",
        "Settembre 1945: a guerra mondiale conclusa, Teheran chiede il ritiro alleato entro i termini del Trattato Tripartito (2 marzo 1946) mentre nel nord la nascita del Partito Democratico dell'Azerbaigian di Pishevari apre la crisi iraniana.",
        'Alleati',
        "Keshvar-e Shāhanshāhi-ye Irān — Mohammad Reza Pahlavi (Settembre 1945)"
      );
    }
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
    if (s >= 20) {
      return makeResult(
        'IRQ',
        "Al-Mamlakah al-‘Irāqiyyah (Regno dell'Iraq — Dicembre 1947)",
        "Dicembre 1947: il governo iracheno di Salih Jabr e del Reggente 'Abd al-Ilah guida al vertice della Lega Araba del Cairo la linea contro la spartizione della Palestina (Ris. ONU 181), avviando parallelamente negoziati segreti con Londra per la revisione del trattato anglo-iracheno.",
        'Neutrale',
        "Al-Mamlakah al-‘Irāqiyyah — Re Faysal II · Reggente ‘Abd al-Ilah · P.M. Salih Jabr (Baghdad, Dic. 1947)"
      );
    }
    if (s >= 19) {
      return makeResult(
        'IRQ',
        'Al-Mamlakah al-‘Irāqiyyah (Regno dell\'Iraq — Sovranità Costituzionale, Baghdad)',
        "Regno Hashemita dell'Iraq pienamente sovrano dopo la fine dell'occupazione militare bellica PAIFORCE (1946). Governato dal Reggente ‘Abd al-Ilah per conto del giovane Re Faysal II e dal Primo Ministro Salih Jabr, membro fondatore della Lega Araba e delle Nazioni Unite.",
        'Neutrale',
        'Al-Mamlakah al-‘Irāqiyyah — Re Faysal II · Reggente ‘Abd al-Ilah · P.M. Salih Jabr (Baghdad)'
      );
    }
    if (s >= 18) {
      return makeResult(
        'UK',
        "Al-Mamlakah al-‘Irāqiyyah (Smobilitazione Postbellica PAIFORCE — Settembre 1945)",
        "Settembre 1945: a guerra conclusa il governo iracheno del P.M. Hamdi al-Pachachi e del Reggente 'Abd al-Ilah — membro fondatore ONU e Lega Araba — avvia la smobilitazione del presidio britannico PAIFORCE.",
        'Alleati',
        "Al-Mamlakah al-‘Irāqiyyah — Reggente ‘Abd al-Ilah & British PAIFORCE (Settembre 1945)"
      );
    }
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

  // Tannu Tuva (Stato indipendente alleato fino all'11 ott 1944 -> Oblast' Autonoma di Tuva, RSFSR / URSS)
  if (
    nrm_hb.includes('tannu') ||
    nrm_hb.includes('tuva') ||
    nrm_subj.includes('tuva') ||
    nrm_subj.includes('tannu')
  ) {
    if (s >= 16) {
      return makeResult(
        'SOV',
        s >= 20
          ? 'Kyzyl — Oblast\' Autonoma di Tuva (RSFSR, Dic. 1947)'
          : s >= 19
          ? 'Kyzyl — Oblast\' Autonoma di Tuva (RSFSR / URSS, 1947)'
          : s >= 18
          ? 'Kyzyl — Oblast\' Autonoma di Tuva (RSFSR / URSS, 1945)'
          : 'Oblast\' Autonoma di Tuva (RSFSR / URSS)',
        s >= 20
          ? 'Dicembre 1947: piena integrazione economica e monetaria dell\'Oblast\' Autonoma di Tuva nella RSFSR sovietica.'
          : s >= 19
          ? 'Settembre 1947: collettivizzazione degli arat, alfabeto cirillico tuvano e sviluppo minerario dell\'Oblast\' Autonoma di Tuva (RSFSR).'
          : 'Incorporata nell\'URSS l\'11 ottobre 1944 come Oblast\' Autonoma di Tuva della RSFSR sotto Salčak Toka.',
        'Comintern',
        'Tuvinskij Oblispolkom — RSFSR (URSS)'
      );
    }
    return makeResult(
      'TUV',
      getTop('TUV').name || 'Tyva Arat Respublika (Kyzyl)',
      'Tyva Arat Respublika (Ene-Say)',
      'Comintern'
    );
  }

  // Africa: Indipendenti, Colonie, AOI
  if (nrm_hb.includes('liberia') || nrm_hb.includes('monrovia')) {
    if (s >= 19) {
      return makeResult(
        'LBR',
        'Republic of Liberia (Monrovia — Presidenza William V.S. Tubman)',
        'Repubblica sovrana dell\'Africa occidentale, membro fondatore delle Nazioni Unite (1945). Sotto la presidenza di William V.S. Tubman, la Liberia avvia la politica "Open Door", estende il diritto di voto e inaugura il Porto Franco strategico di Monrovia.',
        'Neutrale',
        'Republic of Liberia — President William V.S. Tubman (Monrovia)'
      );
    }
    if (s >= 14) {
      return makeResult(
        'LBR',
        'Republic of Liberia (Monrovia — Belligerante Alleato)',
        'Il 27 gennaio 1944, sotto il nuovo Presidente William V.S. Tubman, la Liberia dichiara guerra a Germania e Giappone concedendo basi aeree (Roberts Field) e l\'accesso strategico per i rifornimenti alleati.',
        'Alleati',
        'Republic of Liberia — President William V.S. Tubman (Monrovia)'
      );
    }
    return makeResult('LBR', getTop('LBR').name || 'Republic of Liberia (Monrovia)', 'Independent African State', 'Neutrale', 'Republic of Liberia — President Edwin Barclay');
  }
  if ((nrm_hb.includes('egypt') || nrm_hb.includes('egitto')) && !nrm_hb.includes('sudan')) {
    if (s >= 19) {
      return makeResult(
        'EGY',
        "Al-Mamlakah al-Miṣriyyah (Regno d'Egitto — Sovranità & Crisi del Canale di Suez)",
        "Nel marzo 1947 le truppe britanniche completano il ritiro dal Cairo, da Alessandria e dal Delta del Nilo concentrandosi nella sola Zona del Canale di Suez. Nell'estate-settembre 1947 il Primo Ministro Mahmoud an-Nukrashi Pasha porta la vertenza anglo-egiziana sull'evacuazione totale e sull'unità della Valle del Nilo davanti al Consiglio di Sicurezza dell'ONU.",
        'Neutrale',
        "Al-Mamlakah al-Miṣriyyah — Re Faruq I · Primo Ministro Mahmoud an-Nukrashi Pasha (Il Cairo)"
      );
    }
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
    if (s >= 19) {
      return makeResult(
        'UK',
        'British Somaliland Protectorate (Hargeisa & Berbera — BMA)',
        'Nel dopoguerra il Protettorato della Somalia Britannica è retto dalla British Military Administration (sede ad Hargeisa e porto a Berbera), avviando i primi consigli consultivi somali prima del ritorno al Colonial Office.',
        'Alleati',
        'British Military Administration of Somaliland (Governor Brig. Sir Gerald Fisher)'
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
    if (s >= 19) {
      return makeResult(
        'FRA',
        'Afrique-Occidentale Française (Territoires d\'Outre-Mer — Union Française, Dakar)',
        'Territori d\'Oltremare dell\'AOF integrati nella Quarta Repubblica e nell\'Union Française (Costituzione dell\'ottobre 1946; Legge Houphouët-Boigny contro il lavoro forzato e ricostituzione dell\'Alta Volta il 4 settembre 1947) sotto l\'Alto Commissario René Barthes a Dakar.',
        'Alleati',
        'Quatrième République (Union Française) — Haut-Commissariat de l\'AOF (Dakar · René Barthes)'
      );
    }
    if (s >= 11) {
      return makeResult(
        'F_AOF',
        'Afrique-Occidentale française (AOF — Ralliée aux Alliés / Dakar)',
        'Accordo Boisson-Darlan (23 novembre 1942): l\'AOF rientra nello schieramento alleato mettendo il porto strategico di Dakar al servizio delle Nazioni Unite.',
        'Alleati',
        'Haut-Commissariat de France en Afrique (Dakar — Pierre Boisson rallié aux Alliés)'
      );
    }
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
      if (s >= 19) {
        return makeResult(
          'FRA',
          'Gabon (Territoire d\'Outre-Mer de l\'AEF — Union Française, Libreville)',
          'Territoire d\'Outre-Mer del Gabon nella Quarta Repubblica e nell\'Union Française (Costituzione del 27 ottobre 1946), dopo l\'abolizione del lavoro forzato con la Legge Houphouët-Boigny (1946).',
          'Alleati',
          'Quatrième République (Union Française) — Territoire du Gabon (Libreville)'
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
    if (s >= 19) {
      return makeResult(
        'FRA',
        'Afrique-Équatoriale Française (Territoires d\'Outre-Mer — Union Française, Brazzaville)',
        'Territori d\'Oltremare dell\'AEF nella Quarta Repubblica e nell\'Union Française (Costituzione del 27 ottobre 1946; Alto Commissariato di Charles Luizet a Brazzaville).',
        'Alleati',
        'Quatrième République (Union Française) — Gouvernement Général de l\'AEF (Brazzaville · Charles Luizet)'
      );
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
    if (s >= 19) {
      return makeResult(
        'ETH',
        "Impero d'Etiopia (Addis Abeba — Sovranità Restaurata, Negus Hailé Selassié I)",
        "Impero d'Etiopia pienamente indipendente e membro fondatore dell'ONU sotto il Negus Hailé Selassié I e il Primo Ministro Makonnen Endelkachew. Con l'entrata in vigore del Trattato di Pace di Parigi (15 settembre 1947, Articoli 23 e 33-38) l'Italia riconosce irrevocabilmente la sovranità etiopica.",
        'Neutrale',
        "Ye’Ityōṗṗyā Nigūsa Negest Mengist — Imperatore Hailé Selassié I (Addis Abeba)"
      );
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
    if (s >= 19) {
      return makeResult(
        'UK',
        'Libia (Amministrazione Militare Alleata — Tripolitania, Cirenaica e Fezzan)',
        'Trattato di Pace di Parigi (in vigore dal 15 settembre 1947, Articolo 23): l\'Italia rinuncia formalmente e irrevocabilmente a ogni titolo e sovranità sulla Libia. Tripolitania e Cirenaica sono sotto Amministrazione Militare Britannica (BMA con sedi a Tripoli e Bengasi), mentre il Fezzan è retto dall\'amministrazione militare francese.',
        'Alleati',
        'British Military Administration (Tripolitania & Cyrenaica) / Territoire Militaire du Fezzan (France)'
      );
    }
    if (s >= 12) {
      return makeResult(
        'UK',
        'Libia (Amministrazione Militare Alleata — Tripolitania, Cirenaica e Fezzan)',
        'Caduta definitiva della Quarta Sponda fascista: nel gennaio 1943 l\'8ª Armata britannica entra a Tripoli e le forze della Francia Libera di Leclerc liberano il Fezzan. L\'intero territorio libico è sotto piena amministrazione militare alleata.',
        'Alleati',
        'British Military Administration (Tripolitania & Cyrenaica) / Territoire Militaire du Fezzan (France)'
      );
    }
    if (s >= 11 && (nrm_hb.includes('cyrenaica') || nrm_hb.includes('tobruk') || nrm_hb.includes('bengasi') || nrm_hb.includes('benghazi') || nrm_hb.includes('derna') || nrm_hb.includes('bardia'))) {
      return makeResult(
        'UK',
        'Cirenaica Liberata (Bengasi / Tobruk / Derna — British Eighth Army)',
        'Inseguimento della Panzerarmee Afrika dopo El Alamein (novembre 1942): l\'8ª Armata britannica del Generale Montgomery riconquista Bardia, Tobruk (13 novembre) e Bengasi (20 novembre), costringendo le forze dell\'Asse ad attestarsi sulla linea di El Agheila.',
        'Alleati',
        'British 8th Army — Military Administration of Cyrenaica (General Bernard Montgomery)'
      );
    }
    if (s >= 11) {
      return makeResult(
        'ITA',
        'Libia Italiana (Tripolitania e Sirtica — Linea difensiva di El Agheila)',
        'Dopo la rottura del fronte di El Alamein e la ritirata dalla Cirenaica, la Panzerarmee Afrika del Feldmaresciallo Rommel e le forze italiane si attestano a difesa della Tripolitania sulla linea di El Agheila.',
        'Asse',
        'Governo Generale della Libia (Maresciallo Ettore Bastico) & Panzerarmee Afrika (Generalfeldmarschall Erwin Rommel)'
      );
    }
    if (s === 10) {
      return makeResult(
        'ITA',
        'Libia Italiana (Riconquista di Tobruk e Avanzata fino a El Alamein)',
        'Battaglia di Gazala e Caduta di Tobruk (26 maggio - 21 giugno 1942): la Panzerarmee Afrika del Generalfeldmarschall Erwin Rommel e del Maresciallo d\'Italia Ettore Bastico travolge l\'8ª Armata britannica sulla linea di Gazala-Bir Hakeim, espugna il 21 giugno 1942 la piazzaforte di Tobruk (33.000 prigionieri alleati) e penetra in profondità in Egitto fino alla linea di El Alamein.',
        'Asse',
        'Governo Generale della Libia (Maresciallo Ettore Bastico) & Panzerarmee Afrika (Generalfeldmarschall Erwin Rommel)'
      );
    }
    if (s === 9 && nrm_hb.includes('cyrenaica')) {
      return makeResult(
        'UK',
        'Cirenaica Occupata (Bengasi / Tobruk / Derna — Operazione Crusader, 8th Army)',
        'Operazione Crusader (18 novembre - 30 dicembre 1941): l\'8ª Armata britannica sblocca l\'assedio di Tobruk e rioccupa Derna, Bengasi e la Cirenaica fino a El Agheila.',
        'Alleati',
        'British 8th Army — Military Administration of Cyrenaica'
      );
    }
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
    if (s >= 26) {
      return makeResult(
        'UK',
        'Eritrea (BMA Britannica — Risoluzione ONU 390 A(V) del 2 Dicembre 1950)',
        '31 Dicembre 1950 (Amministrazione Militare Britannica): il 2 dicembre 1950 l\'Assemblea Generale ONU approva la Risoluzione 390 A(V) che predispone la futura federazione dell\'Eritrea con l\'Etiopia entro settembre 1952. Al 31 dicembre 1950 il territorio resta ancora amministrato dalla British Military Administration (BMA Eritrea).',
        'Alleati',
        'British Military Administration of Eritrea (BMA — In Attesa Federazione Ris. ONU 390 A(V))'
      );
    }
    if (s >= 8) {
      if (s >= 19) {
        return makeResult(
          'UK',
          'Eritrea (Amministrazione Militare Britannica — Asmara)',
          'Trattato di Pace di Parigi (in vigore dal 15 settembre 1947, Articolo 23): l\'Italia rinuncia a ogni diritto e titolo sull\'Eritrea. Il territorio rimane retto dalla British Military Administration (BMA Eritrea) con sede ad Asmara sotto l\'egida alleata provvisoria in attesa delle decisioni delle Nazioni Unite.',
          'Alleati',
          'British Military Administration of Eritrea (BMA — Brigadier F.G. Drew, Asmara)'
        );
      }
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
  if (nrm_hb === 'nepal' || nrm_hb.includes('kingdom of nepal')) {
    if (s >= 26) {
      return makeResult(
        'NEP',
        'Regno del Nepal (Crisi Costituzionale del Nov 1950 & Insurrezione nel Terai)',
        '31 Dicembre 1950 (Regno del Nepal): nel novembre 1950 Re Tribhuvan lascia il palazzo reale rifugiandosi all\'Ambasciata indiana e poi in India, mentre le forze armate del Congresso Nepalese (Mukti Sena) lanciano un\'offensiva nel Terai (Birgunj, Biratnagar, Jhapa) contro il regime autocratico Rana del PM Mohan Shumsher.',
        'Neutrale',
        'Regno del Nepal (Regime Rana — Crisi Tribhuvan & Insurrezione Terai Nov 1950)'
      );
    }
    return makeResult('NEP', 'Nepal Adhirajya (Kathmandu)', 'Regno del Nepal (Dinastia Shah / Primi Ministri Rana)', 'Neutrale', 'Nepal Adhirajya (Shah Vamsha / Rana)');
  }
  if (nrm_hb.includes('dodecanese') || (nrm_hb.includes('rhodes') && !nrm_hb.includes('rhodesia'))) {
    if (s >= 13) {
      return makeResult(
        'GER',
        'Rodi e Dodecaneso (Occupazione Militare Tedesca — Campagna dell\'Egeo)',
        'Settembre 1943: dopo l\'armistizio di Cassibile, la divisione tedesca Rhodos cattura il comando italiano di Rodi; Wehrmacht Heeresgruppe E assume il presidio militare dell\'Egeo.',
        'Asse',
        'Wehrmacht — Militärverwaltung Dodekanes (Rodos)'
      );
    }
    return makeResult('ITA', 'Isole Italiane dell\'Egeo (Rodi)', 'Possedimento dell\'Egeo');
  }
  if (nrm_hb === 'albania') {
    if (s >= 16) {
      return makeResult(
        'ALB',
        s >= 19
          ? 'Repubblica Popolare d\'Albania (Republika Popullore e Shqipërisë)'
          : 'Shqipëria (Liberata dal Fronte di Liberazione Nazionale — Enver Hoxha)',
        s >= 19
          ? 'Settembre 1947: Repubblica Popolare d\'Albania guidata da Enver Hoxha nel blocco sovietico.'
          : 'Novembre 1944: i partigiani albanesi di Enver Hoxha liberano Tirana e Scutari, instaurando il Governo Democratico dell\'Albania.',
        s >= 19 ? 'Comintern' : 'Alleati',
        s >= 19
          ? 'Republika Popullore e Shqipërisë (Enver Hoxha)'
          : 'Qeveria Demokratike e Shqipërisë (Enver Hoxha — UNÇ)'
      );
    }
    if (s >= 13) {
      return makeResult(
        'GER',
        'Regno d\'Albania (Occupazione Militare Tedesca — Këshilli i Naltë i Regjencës)',
        'Operazione Achse (settembre 1943): la Wehrmacht occupa l\'Albania dopo la resa italiana, disarmando le truppe italiane e insediando un governo di reggenza collaborazionista.',
        'Asse',
        'Wehrmacht — Militärbefehlshaber Albanien'
      );
    }
    return s < 4
      ? makeResult('ALB', 'Mbretëria Shqiptare (Tiranë)', 'Shtet i Pavarur')
      : makeResult('ITA', 'Regno d\'Albania', 'Unione Personale con la Corona d\'Italia (aprile 1939)');
  }
  if (nrm_hb.includes('somali') && (nrm_hb.includes('ital') || subj === 'Italy' || name.includes('(Italy)'))) {
    if (s >= 25) {
      return makeResult(
        'AFIS',
        'Amministrazione Fiduciaria Italiana della Somalia (AFIS — Mandato ONU dal 1° Aprile 1950, Mogadiscio)',
        'Il 1° aprile 1950 cessa l\'amministrazione militare britannica (BMA) nell\'ex Somalia Italiana e inizia ufficialmente il mandato decennale (1950–1960) dell\'Amministrazione Fiduciaria Italiana della Somalia (AFIS) per conto delle Nazioni Unite (Risoluzione ONU 289 del 21 novembre 1949), con esposizione congiunta della bandiera ONU e del Tricolore della Repubblica Italiana sotto l\'Amministratore Giovanni Fornari a Mogadiscio (il Somaliland Britannico e l\'Ogaden restano rispettivamente a Regno Unito ed Etiopia).',
        'Alleati',
        'Amministrazione Fiduciaria Italiana della Somalia — AFIS (ONU / Repubblica Italiana — Amb. Giovanni Fornari, Mogadiscio)'
      );
    }
    if (s >= 8) {
      if (s >= 19) {
        return makeResult(
          'UK',
          'Somalia (Amministrazione Militare Britannica — Mogadiscio)',
          'Trattato di Pace di Parigi (in vigore dal 15 settembre 1947, Articolo 23): l\'Italia rinuncia a ogni diritto e titolo sulla Somalia Italiana. Il territorio rimane sotto l\'Amministrazione Militare Britannica (BMA Somalia) in attesa delle risoluzioni dell\'ONU sul futuro assetto dell\'ex colonia.',
          'Alleati',
          'British Military Administration of Somalia (BMA — Mogadishu)'
        );
      }
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
    return resolveSpanishAfricanTerritory('ES_RIF', s);
  }
  if (nrm_hb.includes('ceuta')) {
    return resolveSpanishAfricanTerritory('ES630', s);
  }
  if (nrm_hb.includes('melilla')) {
    return resolveSpanishAfricanTerritory('ES640', s);
  }
  if (nrm_hb.includes('rio de oro')) {
    return resolveSpanishAfricanTerritory('ES_RIO_DE_ORO', s);
  }
  if (
    nrm_hb.includes('spanish sahara') ||
    nrm_hb.includes('sp. sahara') ||
    nrm_hb.includes('sahara espanol') ||
    nrm_hb.includes('cabo juby') ||
    nrm_hb.includes('tarfaya') ||
    nrm_hb.includes('saguia')
  ) {
    return resolveSpanishAfricanTerritory('ES_SAHARA_NORTE', s);
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
      : s >= 19
      ? makeResult('SPA', 'Territorios Españoles del Golfo de Guinea (Santa Isabel / Bata)', 'Colonia spagnola del Golfo di Guinea (Fernando Poo e Río Muni) retta dal Governatore Juan María Bonelli Rubio.', 'Neutrale', 'Estado Español — Gobernador del Golfo de Guinea')
      : makeResult('SPA', 'Guinea Española (Santa Isabel / Fernando Poo y Río Muni)', 'Bando Nacional / Estado Español — Territorios Españoles del Golfo de Guinea', s >= 18 ? 'Neutrale' : undefined);
  }
  if (nrm_hb.includes('ifni')) {
    return resolveSpanishAfricanTerritory('ES_IFNI', s);
  }
  if (nrm_hb.includes('canary islands') || nrm_hb.includes('canarias')) {
    return s === 0
      ? makeResult('SPR', 'Islas Canarias (Tenerife / Las Palmas)', 'Segunda República Española')
      : makeResult('SPA', 'Islas Canarias (Tenerife / Las Palmas)', s >= 19 ? 'Arcipelago Atlantico dell\'Estado Español (Santa Cruz de Tenerife / Las Palmas)' : 'Bando Nacional (Franco)', s >= 18 ? 'Neutrale' : undefined);
  }
  if (nid === 'TANGER' || nrm_hb.includes('tangier') || nrm_hb.includes('tanger') || nrm_hb.includes('tangeri')) {
    return resolveTangierZone(s);
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
    if (s >= 20) {
      return makeResult(
        'YEM',
        "Regno Mutawakkilita dello Yemen (Sana'a — Membro ONU & Lega Araba, Dicembre 1947)",
        "Dicembre 1947: membro dell'ONU dal 30 settembre 1947, il Regno Mutawakkilita dell'anziano Imam Yahya Muhammad Hamid ed-Din partecipa al vertice della Lega Araba del Cairo contro la spartizione della Palestina (Ris. ONU 181), mentre a Sana'a cresce la fronda costituzionalista dei Liberi Yemeniti.",
        'Neutrale',
        "Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah (Imam Yahya — Sana'a, Dic. 1947)"
      );
    }
    if (s >= 19) {
      return makeResult(
        'YEM',
        'Regno Mutawakkilita dello Yemen (Sana\'a — Ammissione ONU, 30 Settembre 1947)',
        'Sotto l\'Imam Yahya Muhammad Hamid ed-Din, il Regno Mutawakkilita dello Yemen — membro fondatore della Lega Araba — è ammesso formalmente alle Nazioni Unite proprio il 30 settembre 1947 (insieme al Pakistan), consolidando la sovranità dello Stato yemenita.',
        'Neutrale',
        'Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah (Imam Yahya — Sana\'a)'
      );
    }
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
    if (s >= 20) {
      return makeResult(
        'UK',
        'Colonia e Protettorato di Aden (Stato di Emergenza — Dicembre 1947)',
        "Dicembre 1947: all'indomani del voto ONU sulla Palestina (2–4 dicembre 1947) esplodono ad Aden gravi disordini anti-ebraici (82 ebrei e oltre 30 arabi uccisi); il Governatore britannico Sir Reginald Champion proclama lo stato di emergenza e dispiega le Aden Protectorate Levies e truppe britanniche tra Aden, l'Hadhramaut e il Protettorato Occidentale/Orientale.",
        'Alleati',
        'British Crown Colony & Protectorate of Aden (Gov. Sir Reginald Champion — Dic. 1947)'
      );
    }
    if (s >= 19) {
      return makeResult(
        'UK',
        'Colonia e Protettorato di Aden (Crown Colony & WAP/EAP — 1947)',
        'Colonia della Corona di Aden (hub navale e carbonifero britannico sul Mar Rosso) e Protettorati Occidentale e Orientale (Sultanati di Lahej, Shihr e Mukalla/Qu\'aiti, Kathiri e Mahra) amministrati dal Colonial Office di Londra.',
        'Alleati',
        'British Crown Colony & Protectorate of Aden (Colonial Office)'
      );
    }
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
    if (s >= 20) {
      return makeResult(
        'IRQ',
        "Al-Mamlakah al-‘Irāqiyyah (Regno dell'Iraq — Dicembre 1947)",
        "Dicembre 1947: al vertice della Lega Araba del Cairo il governo iracheno di Salih Jabr e del Reggente 'Abd al-Ilah guida l'opposizione diplomatica e militare alla spartizione della Palestina (Ris. ONU 181), mentre avvia con Londra i negoziati segreti per la revisione del trattato anglo-iracheno (futuro Trattato di Portsmouth del gennaio 1948).",
        'Neutrale',
        "Al-Mamlakah al-‘Irāqiyyah — Re Faysal II · Reggente ‘Abd al-Ilah · P.M. Salih Jabr (Baghdad)"
      );
    }
    if (s >= 19) {
      return makeResult(
        'IRQ',
        'Al-Mamlakah al-‘Irāqiyyah (Regno dell\'Iraq — Sovranità Costituzionale, Baghdad)',
        "Regno Hashemita dell'Iraq pienamente sovrano dopo la fine dell'occupazione militare bellica PAIFORCE (1946). Governato dal Reggente ‘Abd al-Ilah per conto di Re Faysal II e dal Primo Ministro Salih Jabr, membro fondatore della Lega Araba e delle Nazioni Unite.",
        'Neutrale',
        'Al-Mamlakah al-‘Irāqiyyah — Re Faysal II · Reggente ‘Abd al-Ilah · P.M. Salih Jabr (Baghdad)'
      );
    }
    if (s >= 18) {
      return makeResult(
        'UK',
        'Regno dell\'Iraq (Smobilitazione Postbellica PAIFORCE — Settembre 1945)',
        "Settembre 1945: a conflitto mondiale concluso, il governo iracheno del Primo Ministro Hamdi al-Pachachi e del Reggente 'Abd al-Ilah (membro fondatore dell'ONU e della Lega Araba) avvia la transizione alla piena smobilitazione del presidio militare britannico PAIFORCE dalle basi di Bassora, Habbaniya e Baghdad.",
        'Alleati',
        "Al-Mamlakah al-‘Irāqiyyah — Reggente 'Abd al-Ilah & British PAIFORCE (Baghdad)"
      );
    }
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
    if (s >= 20) {
      return makeResult(
        'JOR',
        'Regno Hashemita di Transgiordania (Amman — Dicembre 1947)',
        "Dicembre 1947: il Regno Hashemita di Re Abd Allah I partecipa al vertice della Lega Araba del Cairo mantenendo una propria linea strategica sulla futura spartizione palestinese (Ris. ONU 181), mentre la Legione Araba comandata da Glubb Pasha si disloca in allerta lungo la valle del Giordano.",
        'Neutrale',
        'Regno Hashemita di Transgiordania (Re Abd Allah I bin al-Husayn & Glubb Pasha — Dic. 1947)'
      );
    }
    if (s >= 19) {
      return makeResult(
        'JOR',
        'Regno Hashemita di Transgiordania (Sovereign Kingdom — Amman)',
        'Il 25 maggio 1946 la Transgiordania diviene pienamente indipendente come Regno Hashemita di Transgiordania sotto Re Abd Allah I ibn Husayn. Le forze della Legione Araba (al-Jaysh al-Arabi) sono addestrate e guidate da Glubb Pasha (Sir John Bagot Glubb). Stato sovrano arabo firmatario del Trattato di Londra (1946).',
        'Neutrale',
        'Regno Hashemita di Transgiordania (Re Abd Allah I bin al-Husayn & Glubb Pascià)'
      );
    }
    return makeResult('UK', 'Emirate of Transjordan (Amman)', 'League of Nations Mandate');
  }
  if (nrm_hb.includes('palestine')) {
    if (s >= 22) {
      return makeResult(
        'ISR',
        'Stato di Israele (Confini Post-Yoav, Hiram & Horev al 31 Dicembre 1948)',
        "Al 31 dicembre 1948 le offensive israeliane Dani, Dekel, Yoav, Hiram e Horev hanno assicurato a Israele l'intera Galilea (inclusa una fascia di controllo oltre il confine libanese), la piana di Sharon-Lydda-Ramle, Gerusalemme Ovest, Beersheba e gran parte del Negev (con la brigata egiziana accerchiata nella sacca di Faluja e il Negev estremo fino a Umm Rashrash/Eilat non ancora raggiunto), mentre a Gaza opera il Governo di Tutto-Palestina sotto tutela egiziana e la Cisgiordania aderisce alla Transgiordania (Conferenza di Gerico, 1° dic).",
        'Neutrale',
        'Medinat Yisrael — Governo Provvisorio (IDF / Fronti Settentrionale, Centrale & del Negev)'
      );
    }
    if (s >= 21) {
      return makeResult(
        'ISR',
        'Stato di Israele (Proclamazione del 14 Maggio 1948 & Linee della Prima Tregua ONU)',
        "Il 14 maggio 1948, alla scadenza del Mandato Britannico, David Ben-Gurion proclama a Tel Aviv lo Stato di Israele (Medinat Yisrael). Al 30 giugno 1948 vige la Prima Tregua mediata dall'ONU (11 giugno – 8 luglio 1948) tra le Forze di Difesa Israeliane (IDF) e gli eserciti della Lega Araba.",
        'Neutrale',
        'Medinat Yisrael — Governo Provvisorio (PM David Ben-Gurion · Pres. Chaim Weizmann)'
      );
    }
    if (s >= 20) {
      return makeResult(
        'UK',
        'Mandato di Palestina (Risoluzione ONU 181 & Guerra Civile — Dicembre 1947)',
        "Dicembre 1947: dopo l'approvazione della Risoluzione ONU 181 del 29 novembre 1947 (Piano di Partizione della Palestina in uno Stato ebraico, uno Stato arabo e il Corpus Separatum di Gerusalemme), esplode la guerra civile intercomunitaria in tutto il Mandato mentre l'amministrazione dell'Alto Commissario Sir Alan Cunningham avvia l'evacuazione verso il termine del 14 maggio 1948.",
        'Alleati',
        'Government of Palestine (High Commissioner Sir Alan Cunningham — UN Res. 181, Dic. 1947)'
      );
    }
    if (s >= 19) {
      return makeResult(
        'UK',
        'Mandato di Palestina (UNSCOP & Ritiro Britannico Annunciato — Gerusalemme)',
        'Il 31 agosto 1947 il comitato speciale UNSCOP raccomanda all\'Assemblea Generale ONU la spartizione della Palestina in uno Stato ebraico, uno Stato arabo e la zona internazionalizzata di Gerusalemme (Corpus Separatum). Nel settembre 1947 il governo laburista britannico di Clement Attlee annuncia formalmente la remissione del mandato e l\'inizio del ritiro delle truppe di Sua Maestà.',
        'Alleati',
        'Government of Palestine (British High Commissioner Sir Alan Cunningham / UNSCOP Inquiry)'
      );
    }
    return makeResult('UK', 'British Mandate for Palestine (Jerusalem)', 'League of Nations Mandate');
  }
  if (nrm_hb.includes('syria')) {
    if (s >= 21) {
      return makeResult(
        'SYR',
        'Repubblica Siriana (Intervento nella Guerra Arabo-Israeliana & Testa di Ponte a Mishmar HaYarden — Giugno 1948)',
        "Giugno 1948: entrata in guerra il 15 maggio 1948 contro il neonato Stato di Israele, l'armata della Repubblica Siriana del Presidente Shukri al-Quwatli conquista il 10 giugno 1948 la testa di ponte di Mishmar HaYarden a ovest del Giordano e mantiene posizioni presso Samakh/Ein Gev allo scattare della Prima Tregua ONU (11 giugno 1948).",
        'Neutrale',
        'Repubblica Siriana (Presidente Shukri al-Quwatli · P.M. Jamil Mardam Bey — Giugno 1948)'
      );
    }
    if (s >= 20) {
      return makeResult(
        'SYR',
        'Repubblica Siriana (Sovranità & Mobilitazione ALA — Damasco, Dicembre 1947)',
        "Dicembre 1947: al vertice della Lega Araba del Cairo (8–17 dicembre 1947), la Repubblica Siriana del Presidente Shukri al-Quwatli e del Primo Ministro Jamil Mardam Bey respinge la Risoluzione ONU 181 e apre vicino a Damasco il campo di addestramento di Qatana per i volontari dell'Esercito Arabo di Liberazione (Jaysh al-Inqadh) guidato da Fawzi al-Qawuqji.",
        'Neutrale',
        'Repubblica Siriana (Presidente Shukri al-Quwatli · P.M. Jamil Mardam Bey — Dic. 1947)'
      );
    }
    if (s >= 19) {
      return makeResult(
        'SYR',
        'Repubblica Siriana (Indipendenza & Evacuazione Franco-Britannica — Damasco)',
        'Il 17 aprile 1946 (Giorno dell\'Evacuazione, Eid al-Jalaa) le ultime truppe francesi e britanniche lasciano la Siria: la Repubblica Siriana è pienamente sovrana, guidata dal Presidente Shukri al-Quwatli e dal Primo Ministro Jamil Mardam Bey, membro fondatore della Lega Araba e delle Nazioni Unite.',
        'Neutrale',
        'Repubblica Siriana (Presidente Shukri al-Quwatli — Damasco)'
      );
    }
    if (s >= 18) {
      return makeResult(
        'SYR',
        'Repubblica Siriana (Post-Crisi del Levante & Negoziati di Evacuazione — Settembre 1945)',
        "Settembre 1945: dopo la Crisi del Levante di maggio-giugno 1945 (bombardamento francese di Damasco ed intervento britannico), il governo sovrano del Presidente Shukri al-Quwatli — membro fondatore dell'ONU e della Lega Araba — negozia il ritiro definitivo delle ultime guarnigioni francesi e britanniche.",
        'Alleati',
        'Repubblica Siriana (Presidente Shukri al-Quwatli — Damasco, Settembre 1945)'
      );
    }
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
    if (s >= 20) {
      return makeResult(
        'LEB',
        'Repubblica Libanese (Sovranità & Vertice della Lega Araba — Beirut, Dicembre 1947)',
        "Dicembre 1947: pienamente sovrana dopo l'evacuazione alleata del 1946, la Repubblica Libanese di Béchara El Khoury e Riad Al Solh partecipa al vertice della Lega Araba del Cairo contro la partizione della Palestina (Ris. ONU 181), rafforzando il dispositivo militare al confine meridionale con la Galilea.",
        'Neutrale',
        'Repubblica Libanese (Presidente Béchara El Khoury & P.M. Riad Al Solh — Dic. 1947)'
      );
    }
    if (s >= 19) {
      return makeResult(
        'LEB',
        'Repubblica Libanese (Indipendenza & Ritiro Truppe Alleate — Beirut)',
        'Il 31 dicembre 1946 si completa l\'evacuazione definitiva di tutte le truppe francesi e britanniche dal territorio libanese. La Repubblica Libanese è pienamente indipendente e sovrana sotto la presidenza di Béchara El Khoury e il governo di Riad Al Solh (Patto Nazionale del 1943), membro fondatore dell\'ONU e della Lega Araba.',
        'Neutrale',
        'Repubblica Libanese (Presidente Béchara El Khoury & Primo Ministro Riad Al Solh — Beirut)'
      );
    }
    if (s >= 18) {
      return makeResult(
        'LEB',
        'Repubblica Libanese (Patto Nazionale & Transizione Postbellica — Settembre 1945)',
        "Settembre 1945: la Repubblica Libanese indipendente sotto il Presidente Béchara El Khoury e il Patto Nazionale del 1943 (membro fondatore ONU e Lega Araba) tratta a Parigi e Londra lo sgombero definitivo delle residue forze francesi e britanniche.",
        'Alleati',
        'Repubblica Libanese (Presidente Béchara El Khoury — Beirut, Settembre 1945)'
      );
    }
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
    if (s >= 20) {
      return makeResult(
        'SAU',
        "Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah (Regno dell'Arabia Saudita — Dicembre 1947)",
        "Dicembre 1947: il Regno dell'Arabia Saudita di Re Abdulaziz ibn Saud consolida la propria centralità energetica (boom estrattivo ARAMCO tra Dhahran, Abqaiq e i cantieri dell'oleodotto Trans-Arabico TAPLINE) mentre al vertice della Lega Araba del Cairo appoggia diplomaticamente la causa araba palestinese contro la Ris. ONU 181 preservando gli accordi strategici con Washington.",
        'Neutrale',
        "Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah — Malik Abdulaziz Al Saud (Riyadh, Dic. 1947)"
      );
    }
    if (s >= 19) {
      return makeResult(
        'SAU',
        'Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah (Regno dell\'Arabia Saudita — Re Abdulaziz Al Saud)',
        'Regno sovrano dell\'Arabia Saudita sotto Re Abdulaziz ibn Saud, membro fondatore della Lega Araba (1945) e delle Nazioni Unite. Rapida espansione estrattiva ARAMCO ad Al-Hasa / Dhahran e accordi del 1947 per il futuro oleodotto Trans-Arabico (TAPLINE).',
        'Neutrale',
        'Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah — Malik Abdulaziz Al Saud (Riyadh)'
      );
    }
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
  const isMusandamIndia =
    (nrm_hb === 'india' || nrm_subj === 'india' || String(P.PARTOF || '').toLowerCase() === 'india') &&
    Boolean(c && c[0] >= 55.5 && c[0] <= 57.0 && c[1] >= 25.0 && c[1] <= 26.8);
  if (
    isMusandamIndia ||
    nrm_hb.includes('oman') ||
    nrm_hb.includes('muscat') ||
    nrm_hb.includes('trucial') ||
    nrm_hb.includes('kuwait') ||
    nrm_hb.includes('bahrain') ||
    nrm_hb.includes('qatar')
  ) {
    const gFac = s >= 4 ? 'Alleati' : 'Neutrale';
    const gulfJurisdictionNote =
      s >= 19
        ? ' Dopo l\'indipendenza dell\'India dell\'agosto 1947, la giurisdizione degli Ufficiali Politici britannici nel Golfo Persico passa dal governo di Nuova Delhi al Foreign Office di Londra tramite la British Political Residency di Manama (Sir Rupert Hay).'
        : '';
    if (isMusandamIndia) {
      return makeResult(
        'UK',
        'Musandam Peninsula (Sultanate of Muscat and Oman — Stretto di Hormuz)',
        `Exclave settentrionale del Sultanato di Mascate e Oman (Sultano Said bin Taimur) affacciata sullo Stretto di Hormuz, legata da trattati di protezione alla Corona britannica.${gulfJurisdictionNote}`,
        gFac,
        'Sultanate of Muscat and Oman — Musandam Exclave (British Political Residency Persian Gulf)'
      );
    }
    if (nrm_hb.includes('kuwait')) {
      return makeResult(
        'UK',
        'Sheikhdom of Kuwait (Protettorato Britannico — Al-Kuwait)',
        `Sceiccato del Kuwait sotto protettorato britannico (Emiro Ahmad Al-Jaber Al-Sabah): dal giugno 1946 è avviata l'esportazione commerciale su vasta scala di petrolio dal giacimento gigante di Burgan (Kuwait Oil Company).${gulfJurisdictionNote}`,
        gFac,
        'British Persian Gulf Residency — Political Agency Kuwait (Ahmad Al-Jaber Al-Sabah)'
      );
    }
    if (nrm_hb.includes('bahrain')) {
      return makeResult(
        'UK',
        'Sheikhdom of Bahrain (Sede della British Persian Gulf Residency — Manama)',
        `Protettorato britannico del Bahrein sotto lo Sceicco Salman bin Hamad Al Khalifa. Nel 1946 la sede principale della British Political Residency in the Persian Gulf viene trasferita da Bushehr (Iran) a Manama, accanto alla base navale HMS Jufair.${gulfJurisdictionNote}`,
        gFac,
        'British Political Residency in the Persian Gulf (Manama, Bahrain — Sir Rupert Hay)'
      );
    }
    if (nrm_hb.includes('qatar')) {
      return makeResult(
        'UK',
        'Sheikhdom of Qatar (Protettorato Britannico — Doha)',
        `Protettorato britannico del Qatar (Trattato Anglo-Qatariota del 1916) sotto l'Emiro Abdullah bin Jassim Al Thani, sotto la giurisdizione della British Political Residency del Golfo Persico.${gulfJurisdictionNote}`,
        gFac,
        'British Persian Gulf Residency — Sheikhdom of Qatar (Abdullah bin Jassim Al Thani)'
      );
    }
    if (nrm_hb.includes('trucial')) {
      return makeResult(
        'UK',
        'Trucial States / Trucial Oman (Stati della Tregua — Sharjah & Dubai)',
        `I sette emirati della Costa della Tregua (Abu Dhabi, Dubai, Sharjah, Ajman, Umm al-Quwain, Ras al-Khaimah, Fujairah) sotto protettorato britannico, con scalo strategico aeronavale RAF Sharjah sul Golfo Persico.${gulfJurisdictionNote}`,
        gFac,
        'British Political Residency in the Persian Gulf — Trucial States (Sharjah & Dubai)'
      );
    }
    return makeResult(
      'UK',
      'Sultanate of Muscat and Oman (Protettorato & Sfera Britannica — Mascate)',
      `Sultanato di Mascate e Oman sotto il Sultano Said bin Taimur e il Trattato di Seeb del 1920 (distinzione tra Sultanato costiero e Imamato dell'Oman interno), legato da accordi esclusivi alla Corona britannica.${gulfJurisdictionNote}`,
      gFac,
      'Sultanate of Muscat and Oman — British Political Agency Muscat (Said bin Taimur)'
    );
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
        if (s >= 13) {
          return makeResult(
            'GER',
            'Kosovë e Metohi (Prishtinë / Prizren — Occupazione Militare Tedesca)',
            'Settembre 1943 (Operazione Achse): a seguito dell\'armistizio italiano, la Wehrmacht assume il controllo militare del Kosovo.',
            'Asse',
            'Wehrmacht — Militärbefehlshaber Albanien'
          );
        }
        return makeResult(
          'ITA',
          'Kosovë e Metohi (Prishtinë / Prizren — Grande Albania)',
          'Territorio del Kosovo e della Metochia occupato dalle forze dell\'Asse nell\'aprile 1941 e annesso alla "Grande Albania" sotto la Corona d\'Italia.',
          'Asse',
          'Mbretnija Shqiptare (Unione Imperiale con il Regno d\'Italia)'
        );
      }
      if (nrm_hb.includes('montenegro') || nrm_hb.includes('crna gora') || nrm_hb.includes('zeta')) {
        if (s >= 13) {
          return makeResult(
            'GER',
            'Montenegro (Occupazione Militare Tedesca — Cettigne)',
            'Settembre 1943 (Operazione Achse): la Wehrmacht assume il controllo militare del Montenegro dopo l\'armistizio di Cassibile.',
            'Asse',
            'Wehrmacht — Militärverwaltung Montenegro'
          );
        }
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
    if (name === 'Ecuador (Oriente)' || name === 'Oriente (Ecuador)' || name === 'Oriente' || nid === 'EC_ORI' || nid === 'ECU_ORIENTE' || normStr(name).includes('oriente')) {
      return resolveEcuadorOriente(s, name);
    }
    if (name === 'Ecuador' || ov.o === 'ECU') {
      return resolveEcuador(s, name);
    }
    if (name === 'Peru' || name === 'Perú' || ov.o === 'PRU') {
      return resolvePeru(s, name);
    }

    const top = getExtendedToponym(name, ov.o, nid, c, s);
    if (ov.o === 'FRA') {
      const nrmFra = name.toLowerCase();
      if (s >= 12 && (nrmFra.includes('martinique') || nrmFra.includes('guadeloupe') || nrmFra.includes('guyane') || nrmFra.includes('french guiana') || nrmFra.includes('saint-martin') || nrmFra.includes('saint-barthelemy'))) {
        return makeResult('FRA', top.name, top.note, 'Alleati', top.adminTitle || 'Comité Français de Libération Nationale (CFLN)');
      }
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

        // Ralliement o amministrazione Colonie Francesi (F_COL)
        if (ov.o === 'F_COL') {
          const nrmCol = name.toLowerCase();

          // 1. Antille Francesi (Martinica, Guadalupa, Saint-Barthélemy, Saint-Martin) e Guyana
          const isAntillesOrGuiana =
            nrmCol.includes('martinique') ||
            nrmCol.includes('guadeloupe') ||
            nrmCol.includes('saint-martin') ||
            nrmCol.includes('saint-barthelemy') ||
            nrmCol.includes('st-martin') ||
            nrmCol.includes('st-barthelemy') ||
            nrmCol.includes('guyane') ||
            nrmCol.includes('french guiana') ||
            nrmCol.includes('cayenne');

          if (isAntillesOrGuiana) {
            if (s >= 12) {
              // Step 12 (Luglio 1943): Ralliement solenne al CFLN (Henri Hoppenot, 14 Luglio 1943)
              const cflnTop = getExtendedToponym(name, 'FRA', nid, c, s);
              return makeResult(
                'FRA',
                cflnTop.name || top.name,
                cflnTop.note || "Territoire rallié au Comité Français de Libération Nationale (CFLN) en 1943.",
                'Alleati',
                cflnTop.adminTitle || 'Comité Français de Libération Nationale (CFLN) — Haut-Commissariat aux Antilles'
              );
            }
            // Steps 6..11: Amministrazione coloniale di Vichy (Grigio / Fantoccio)
            const vicKey = (nrmCol.includes('guyane') || nrmCol.includes('guiana') || nrmCol.includes('cayenne')) ? 'VIC_COL' : 'VIC';
            const vicTop = getExtendedToponym(name, vicKey, nid, c, s);
            return makeResult(
              vicKey,
              vicTop.name || top.name,
              vicTop.note || top.note || "Administration coloniale sous tutelle de Vichy (Amiral Georges Robert)",
              'Fantoccio',
              vicTop.adminTitle || "Administration coloniale de l'État français (Amiral Robert)"
            );
          }

          // 2. Ralliement de Saint-Pierre-et-Miquelon (24 Dicembre 1941 / Step >= 9)
          const isStPierre = nrmCol.includes('miquelon') || nrmCol.includes('saint-pierre') || nrmCol.includes('saint pierre') || nrmCol.includes('st pierre');
          if (isStPierre) {
            if (s >= 9) {
              const spmTop = getExtendedToponym(name, 'FRA', nid, c, s);
              return makeResult(
                'FRA',
                spmTop.name || 'Saint-Pierre-et-Miquelon (France Libre — Amiral Muselier)',
                spmTop.note || 'Libéré le 24 décembre 1941 par les Forces Navales Françaises Libres (FNFL) de l\'amiral Muselier.',
                'Alleati',
                spmTop.adminTitle || 'France Libre — Territoire de Saint-Pierre-et-Miquelon'
              );
            }
            const spmVic = getExtendedToponym(name, 'VIC', nid, c, s);
            return makeResult('VIC', spmVic.name || top.name, spmVic.note || top.note, 'Fantoccio', spmVic.adminTitle || 'Administration coloniale de Vichy');
          }

          // 3. Ralliement de l'Empire (Océanie & Inde) à la France Libre à partir de Step 7 (OTT 1940)
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
        if (vicKey === 'VIC_MAD' && s >= 11) {
          const isComoros = nid === 'KM' || nid === 'COM' || nid === 'KM_COMOROS' || nrm_hb.includes('comor');
          if (s >= 19) {
            if (isComoros) {
              return makeResult(
                'FRA',
                'Archipel des Comores (Territoire d\'Outre-Mer des Comores — Dzaoudzi)',
                'Con la legge francese del 9 maggio 1946 l\'arcipelago delle Comore (Grande Comore, Anjouan, Mohéli e Mayotte) è separato amministrativamente dal Madagascar ed eretto in Territoire d\'Outre-Mer (TOM) autonomo della Quarta Repubblica nell\'Union Française, rappresentato al Parlamento di Parigi (Saïd Mohamed Cheikh).',
                'Alleati',
                'Quatrième République (Union Française) — Territoire des Comores (Dzaoudzi)'
              );
            }
            return makeResult(
              'FRA',
              'Madagascar (Union Française — Territoire d\'outre-mer & Insurrezione del 1947)',
              'Nel 1946 il Madagascar diviene Territoire d\'outre-mer (TOM) dell\'Unione Francese. Il 29 marzo 1947 scoppia l\'Insurrezione Malgascia (Insurrection malgache) guidata dal Movimento Democratico di Rinnovamento Malgascio (MDRM) contro l\'amministrazione coloniale francese: violenti scontri e durissima repressione militare guidata dall\'Alto Commissario Marcel de Coppet con rinforzi di tirailleurs senegalesi e Legione Straniera.',
              'Alleati',
              'Haut-Commissariat de France à Madagascar (Marcel de Coppet, Antananarivo)'
            );
          }
          if (s >= 12) {
            return makeResult(
              'FRA',
              isComoros ? 'Archipel des Comores (Francia Libera — CFLN / GPRF)' : 'Madagascar (Francia Libera — CFLN / GPRF)',
              'A seguito dell\'armistizio di Ambalavao (novembre 1942) e degli accordi Eden-De Gaulle del 14 dicembre 1942, nel gennaio 1943 l\'amministrazione civile e militare di Madagascar e Comore viene ufficialmente trasferita dal Regno Unito alla Francia Libera (CFLN / GPRF) sotto l\'Alto Commissario generale Paul Legentilhomme.',
              'Alleati',
              'Gouvernement Général de Madagascar — CFLN / GPRF (Général Paul Legentilhomme)'
            );
          }
          return makeResult(
            'UK',
            'Madagascar (British Military Administration / Capitulation de Vichy)',
            'Operazione Stream Line Jane e Armistizio di Ambalavao (5-6 novembre 1942): le truppe britanniche ed est-africane completano la conquista dell\'isola; il Governatore Armand Annet firma la resa, ponendo fine alla sovranità di Vichy in Madagascar.',
            'Alleati',
            'British Military Administration of Madagascar (Gen. William Platt) & Forces Françaises Libres'
          );
        }
        if ((vicKey === 'VIC_SOM' || nrm_hb.includes('french somaliland') || nrm_hb.includes('somalia francese') || nrm_hb.includes('djibouti')) && s >= 6) {
          if (s >= 19) {
            return makeResult(
              'FRA',
              'Côte Française des Somalis (Union Française — Djibouti)',
              'Territoire d\'outre-mer della Quarta Repubblica Francese (Unione Francese). Base aeronavale e scalo ferroviario strategico franco-etiope verso Addis Abeba sotto il Governatore Paul-Henri Siriex.',
              'Alleati',
              'Territoire de la Côte Française des Somalis (Djibouti — Gouverneur Paul-Henri Siriex)'
            );
          }
          if (s >= 12) {
            return makeResult(
              'FRA',
              'Côte Française des Somalis (Ralliement alla Francia Libera — Dicembre 1942)',
              'Il 28 dicembre 1942 la guarnigione di Vichy a Gibuti si arrende senza spargimento di sangue alle forze alleate e della Francia Libera, integrando la colonia nello schieramento alleato sotto il Governatore André Bayardelle.',
              'Alleati',
              'Côte Française des Somalis — CFLN / GPRF (Gouverneur André Bayardelle)'
            );
          }
          return makeResult(
            'VIC_SOM',
            'Côte Française des Somalis (Vichy — Djibouti)',
            'Administration autoritaire de Pierre Nouailhetas sous le régime de Vichy',
            'Fantoccio',
            'Administration de Pierre Nouailhetas (Régime de Vichy — Djibouti)'
          );
        }
        if (vicKey === 'VIC_AOF' && s >= 11) {
          if (s >= 19) {
            return makeResult(
              'FRA',
              'Afrique Occidentale Française (Territoires d\'Outre-Mer — Union Française, Dakar)',
              'Territori d\'Oltremare dell\'AOF nella Quarta Repubblica e nell\'Union Française (Costituzione dell\'ottobre 1946; Legge n. 47-1707 del 4 settembre 1947 per la ricostituzione dell\'Alta Volta) sotto l\'Alto Commissario René Barthes a Dakar.',
              'Alleati',
              'Quatrième République (Union Française) — Haut-Commissariat de l\'AOF (Dakar · René Barthes)'
            );
          }
          return makeResult(
            'F_AOF',
            'Afrique Occidentale Française (AOF — Ralliement agli Alleati, Dakar)',
            'Accordo di Dakar (23 novembre 1942): il Governatore Generale Pierre Boisson riconosce l\'autorità dell\'Ammiraglio Darlan e dell\'Alto Commissariato Francese ad Algeri, integrando l\'intera AOF e la base navale di Dakar nello schieramento alleato.',
            'Alleati',
            'Gouvernement Général de l\'Afrique Occidentale Française (Gouverneur Général Pierre Boisson — Schieramento Alleato)'
          );
        }
        if (vicKey === 'VIC_NAF' && s >= 11) {
          if (s >= 19) {
            return makeResult(
              'FRA',
              'Afrique du Nord Française (Union Française & Quatrième République)',
              'Algeria (Statut Organique de l\'Algérie del 20 settembre 1947 sotto la Quarta Repubblica) e Protettorati di Tunisia (Lamine Bey / Résident Général Jean Mons) e Marocco (Sultano Mohammed V, Discorso di Tangeri dell\'aprile 1947 / Résident Général Alphonse Juin) nell\'ambito dell\'Union Française.',
              'Alleati',
              'Quatrième République (Union Française) — Gouvernement Général de l\'Algérie & Résidences Générales (Rabat / Tunis)'
            );
          }
          if (s >= 12) {
            return makeResult(
              'FRA',
              'Afrique du Nord Française (Litorale Interamente Alleato — Maggio 1943)',
              'Con l\'eliminazione della sacca di Tunisi e Capo Bon a metà maggio 1943, l\'intero litorale nordafricano (Marocco, Algeria, Tunisia) è sotto controllo degli Alleati e del Comitato Francese di Liberazione Nazionale (CFLN).',
              'Alleati',
              'Comité Français de la Libération Nationale (CFLN — Général Henri Giraud & Général Charles de Gaulle)'
            );
          }
          if (nrm_hb.includes('tunis') || nrm_hb.includes('bizerte')) {
            return makeResult(
              'GER',
              'Tunisie occupée — Testa di ponte dell\'Asse',
              'Occupazione italo-tedesca di Biserta e Tunisi a metà novembre 1942 per creare la testa di ponte dell\'Asse in Nordafrica dopo lo sbarco alleato in Algeria e Marocco (Operazione Torch).',
              'Asse',
              'XC. Armeekorps / Generalleutnant Walther Nehring — 5. Panzerarmee'
            );
          }
          return makeResult(
            'FRA',
            'Afrique du Nord Française (Liberazione Alleata — Operazione Torch)',
            'Operazione Torch (8-11 novembre 1942): le forze anglo-americane sbarcano ad Algeri, Orano e Casablanca. Con il cessate il fuoco concordato con l\'Ammiraglio Darlan, l\'amministrazione civile e militare francese si unisce agli Alleati.',
            'Alleati',
            'Commandement en Chef Français Civil et Militaire (Amiral François Darlan / Général Henri Giraud)'
          );
        }
        if (vicKey === 'VIC_IND' && s >= 18) {
          return makeResult(
            'FRA',
            s >= 22
              ? 'Indocina Francese (Unione Francese — Léon Pignon, Fédération Taï & Guerra d\'Indocina, Dicembre 1948)'
              : s >= 21
              ? 'Indocina Francese (Unione Francese — Accordi di Hạ Long, 5 Giugno 1948 & Guerra d\'Indocina)'
              : s >= 20
              ? 'Indocina Francese (Unione Francese — Post-Operazioni Léa e Ceinture, Dicembre 1947)'
              : s >= 19
              ? 'Indocina Francese (Unione Francese — Conflitto contro la RDV/Việt Minh)'
              : 'Indocina Francese (Ristabilimento Amministrazione Francese & Resa Giapponese)',
            s >= 22
              ? 'Al 31 dicembre 1948, sotto il nuovo Alto Commissario Léon Pignon (subentrato a Bollaert il 21 ottobre) e il Governo Centrale Provvisorio di Nguyễn Văn Xuân, la Francia consolida la Fédération Taï (Lai Châu–Sơn La–Điện Biên Phủ, Đèo Văn Long), il Pays Mường (Hòa Bình), il Delta del Fiume Rosso e la Cocincina, mentre il CEFEO fronteggia la RDV di Hồ Chí Minh tra Phủ Thông Hóa, la RC4, il Việt Bắc, le Interzone IV–V e il Nam Bộ.'
              : s >= 21
              ? 'Al 30 giugno 1948, dopo gli Accordi della Baia di Hạ Long (5 giugno 1948) che istituiscono il Governo Centrale Provvisorio del Vietnam (Gen. Nguyễn Văn Xuân) associato all\'Unione Francese, il CEFEO (Gen. Roger Blaizot) presidia le città, il delta del Fiume Rosso, la Cocincina e i capisaldi assediati della RC4, fronteggiando la RDV di Hồ Chí Minh nei santuari di Việt Bắc, Interzone IV–V, Đồng Tháp Mười e U Minh.'
              : s >= 20
              ? 'Al 31 dicembre 1947, concluse le offensive francesi Léa e Ceinture lungo la Route Coloniale 4, la Francia controlla i grandi centri urbani e la Cocincina (Governo Provvisorio del Vietnam del Sud) mentre il Việt Minh conserva il Việt Bắc, l\'Interzona IV e V.'
              : s >= 19
              ? 'Al 30 settembre 1947 la Francia (Union Française) controlla la Cocincina, Cambogia, Laos e le principali arterie e città del Tonchino e dell\'Annam, fronteggiando la Repubblica Democratica del Vietnam guidata da Hồ Chí Minh.'
              : 'Settembre 1945: capitolazione delle truppe giapponesi della 38ª Armata a Saigon dinanzi al generale britannico Douglas Gracey (SEAC) e ritorno delle truppe francesi del generale Leclerc, mentre nel nord Hồ Chí Minh proclama la Repubblica Democratica del Vietnam.',
            'Alleati',
            s >= 22
              ? 'Union Française — Haut-Commissariat (Léon Pignon) / Governo Centrale Provvisorio (Nguyễn Văn Xuân)'
              : s >= 21
              ? 'Union Française — Haut-Commissariat (Émile Bollaert) / Governo Centrale Provvisorio del Vietnam (Nguyễn Văn Xuân)'
              : s >= 19
              ? 'Union Française — Haut-Commissariat de France en Indochine (Émile Bollaert)'
              : 'Gouvernement Provisoire (GPRF — Amiral Thierry d\'Argenlieu / Gén. Leclerc)'
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
      if (
        ov.o === 'HOL' &&
        s >= 10 &&
        s < 18 &&
        (nrm_hb.includes('east indies') ||
          nrm_hb.includes('indies') ||
          nrm_hb.includes('indonesia') ||
          nrm_hb.includes('java') ||
          nrm_hb.includes('sumatra') ||
          nrm_hb.includes('borneo') ||
          nrm_hb.includes('celebes') ||
          (c && c[0] > 90))
      ) {
        return makeResult(
          'JAP',
          'Ranryō Higashi Indo (Indie Orientali Olandesi — Occupazione Imperiale Giapponese)',
          'Capitolazione di Kalijati (8-9 marzo 1942): dopo le battaglie navali del Mare di Giava e dello Stretto della Sonda e gli sbarchi della 16ª Armata giapponese (Ten. Gen. Hitoshi Imamura), il comandante supremo alleato del KNIL Ten. Gen. Hein ter Poorten firma la resa incondizionata delle Indie Orientali Olandesi.',
          'Asse',
          'Dai Nippon Teikoku Rikugun — 16ª Armata (Giava) / 25ª Armata (Sumatra) / Marina Imperiale (Borneo, Celebes e Molucche)'
        );
      }
      return makeResult(ov.o, top.name, top.adminTitle, s >= 6 ? 'Alleati' : 'Neutrale');
    }
    if (ov.o === 'POR') {
      if (s >= 18 && (nrm_hb.includes('timor') || (c && c[0] > 120 && c[1] < 0))) {
        return makeResult(
          'POR',
          s >= 19
            ? 'Timor Português (Província Ultramarina de Timor — Amministrazione Portoghese)'
            : 'Timor Português (Restaurazione della Sovranità Portoghese — Settembre 1945)',
          s >= 19
            ? 'Al 30 settembre 1947 Timor Est è amministrata dal Portogallo come Província Ultramarina de Timor sotto il Governatore Óscar Freire de Vasconcelos Ruas, impegnata nella ricostruzione di Díli e delle infrastrutture coloniali dopo l\'occupazione giapponese.'
            : 'Settembre 1945: resa delle truppe giapponesi a Timor e ripristino della sovranità dell\'Império Colonial Português a Díli sotto il Governatore Manuel Ferreira de Carvalho.',
          'Neutrale',
          s >= 19
            ? 'República Portuguesa — Província Ultramarina de Timor (Governador Óscar Ruas)'
            : 'República Portuguesa — Província Ultramarina de Timor (Governador Ferreira de Carvalho)'
        );
      }
      if (s >= 10 && s < 18 && (nrm_hb.includes('timor') || (c && c[0] > 120 && c[1] < 0))) {
        return makeResult(
          'JAP',
          'Timor Português (Díli — Occupazione Militare Giapponese)',
          'Battaglia di Timor (19-20 febbraio 1942): le forze da sbarco della Marina Imperiale e del 228º Reggimento di Fanteria giapponese occupano Dili e il Timor Portoghese neutrale, contrastate sulle montagne centrali dalla guerriglia della Sparrow Force australiano-olandese.',
          'Asse',
          'Dai Nippon Teikoku — Occupazione Militare del Timor Orientale (Díli)'
        );
      }
      return makeResult('POR', top.name, top.note || top.adminTitle, 'Neutrale', top.adminTitle);
    }
    if (ov.o === 'PHL') {
      if (s >= 19) {
        return makeResult(
          'PHL',
          'Repubblica delle Filippine (Terza Repubblica — Indipendenza del 4 Luglio 1946)',
          'Il 4 luglio 1946 le Filippine ottengono la piena sovranità e indipendenza dagli Stati Uniti (Trattato di Manila) sotto il Presidente Manuel Roxas, mantenendo stretti accordi difensivi e basi aeronavali statunitensi nel Pacifico.',
          'Alleati',
          'Republika ng Pilipinas — Presidente Manuel Roxas (Manila)'
        );
      }
      if (s >= 18) {
        return makeResult(
          'USA',
          'Commonwealth delle Filippine (Liberato — Amministrazione Alleata & Presidente Osmeña)',
          'Settembre 1945: con la resa del generale Tomoyuki Yamashita a Baguio (2 settembre 1945), l\'intero arcipelago filippino è pienamente liberato dalle forze USA-Filippine e retto dal governo restaurato di Sergio Osmeña in vista dell\'indipendenza del 4 luglio 1946.',
          'Alleati',
          'Commonwealth of the Philippines (Pres. Sergio Osmeña) & U.S. Army Forces Pacific (Gen. MacArthur)'
        );
      }
      if (s >= 10) {
        return makeResult(
          'JAP',
          'Hiripin Gōsei-fu (Filippine — Occupazione Militare Giapponese)',
          'Capitolazione americana nelle Filippine (aprile-maggio 1942): dopo la caduta della penisola di Bataan (9 aprile 1942) e la Marcia della Morte, il Ten. Gen. Jonathan Wainwright è costretto a capitolare il 6 maggio 1942 sull\'isola fortificata di Corregidor di fronte alla 14ª Armata giapponese (Ten. Gen. Masaharu Homma).',
          'Asse',
          'Dai Nippon Teikoku Rikugun — 14ª Armata & Commissione Esecutiva Filippina (Jorge B. Vargas)'
        );
      }
      return makeResult(
        'PHL',
        top.name,
        top.note || (s >= 9 ? 'Commonwealth delle Filippine — Invasione Giapponese di Luzon e Manila Città Aperta (26 dicembre 1941)' : 'Commonwealth delle Filippine (Stato Autonomo Associato agli USA)'),
        s >= 9 ? 'Alleati' : 'Neutrale',
        top.adminTitle || 'Commonwealth of the Philippines'
      );
    }
    if (ov.o === 'SPA') {
      const top = getExtendedToponym(name, s === 0 ? 'SPR' : 'SPA', undefined, c, s);
      return s === 0
        ? makeResult('SPR', top.name, top.note || 'Segunda República Española', undefined, top.adminTitle || 'Segunda República Española')
        : makeResult('SPA', top.name, top.note || 'Bando Nacional / Estado Español', undefined, top.adminTitle || 'Estado Español (Régimen Franquista)');
    }
    if (ov.o === 'JAP') {
      const isNanyoHb =
        nrm_hb.includes('south seas') ||
        nrm_hb.includes('nanyo') ||
        nrm_hb.includes('palau') ||
        nrm_hb.includes('saipan') ||
        nrm_hb.includes('tinian') ||
        nrm_hb.includes('rota') ||
        nrm_hb.includes('mariana') ||
        nrm_hb.includes('truk') ||
        nrm_hb.includes('chuuk') ||
        nrm_hb.includes('ponape') ||
        nrm_hb.includes('pohnpei') ||
        nrm_hb.includes('yap') ||
        nrm_hb.includes('koror') ||
        nrm_hb.includes('marshall') ||
        nrm_hb.includes('kwajalein') ||
        nrm_hb.includes('eniwetok') ||
        nrm_hb.includes('caroline') ||
        nrm_hb.includes('micronesia') ||
        (c && c[0] >= 130 && c[0] <= 175 && c[1] >= 3 && c[1] <= 22);
      if (isNanyoHb) {
        if (s >= 18) {
          return makeResult(
            'USA',
            s >= 19
              ? 'Territorio Fiduciario delle Isole del Pacifico (Ex Mandato Nan\'yō)'
              : 'Isole del Pacifico / Micronesia (Resa delle Guarnigioni & Amministrazione USA)',
            s >= 19
              ? 'Luglio 1947: le Nazioni Unite (Risoluzione 21 del Consiglio di Sicurezza, 18 luglio 1947) affidano formalmente agli Stati Uniti l\'ex Mandato giapponese del Nan\'yō come Trust Territory of the Pacific Islands (Marianne, Caroline e Marshall).'
              : 'Settembre 1945: capitolazione delle residue guarnigioni giapponesi in Micronesia (Truk, Palau, Yap, Ponape, Marianne e Marshall) e amministrazione navale diretta degli Stati Uniti.',
            'Alleati',
            'United States Navy — Trust Territory of the Pacific Islands'
          );
        }
        if (s >= 16 && (nrm_hb.includes('palau') || nrm_hb.includes('koror') || (c && c[0] >= 133 && c[0] <= 136 && c[1] >= 6 && c[1] <= 9))) {
          return makeResult(
            'USA',
            'Palau e Peleliu (Presidio Militare Statunitense)',
            'Autunno 1944: dopo la battaglia di Peleliu (15 settembre - 27 novembre 1944), gli Stati Uniti controllano le isole principali e gli aeroporti di Palau.',
            'Alleati',
            'U.S. Pacific Ocean Areas — Palau Islands'
          );
        }
        if (
          s >= 14 &&
          (nrm_hb.includes('saipan') ||
            nrm_hb.includes('tinian') ||
            nrm_hb.includes('rota') ||
            nrm_hb.includes('mariana') ||
            nrm_hb.includes('marshall') ||
            nrm_hb.includes('kwajalein') ||
            nrm_hb.includes('eniwetok') ||
            (c && c[0] >= 144.5 && c[0] <= 173 && c[1] >= 4 && c[1] <= 21))
        ) {
          return makeResult(
            'USA',
            'Isole Marianne / Marshall (Basi Aeronavali USA)',
            'Febbraio-Agosto 1944: conquista statunitense delle Isole Marshall (Kwajalein, Eniwetok) e delle Marianne (Saipan, Tinian) trasformate in basi B-29.',
            'Alleati',
            'U.S. Pacific Ocean Areas'
          );
        }
      }
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
      if (s >= 18 && (nrm_hb.includes('hong kong') || name === 'Hong Kong')) {
        return makeResult(
          'UK',
          s >= 19
            ? 'Crown Colony of Hong Kong (Ricostruzione Postbellica — Gov. Alexander Grantham)'
            : 'Crown Colony of Hong Kong (Ripristino Sovranità Britannica — 30 Agosto 1945)',
          s >= 19
            ? 'Al 30 settembre 1947 Hong Kong è tornata sotto pieno governo coloniale britannico (Governatore Sir Alexander Grantham): il porto franco vive una rapida ripresa commerciale e demografica sullo sfondo della guerra civile cinese.'
            : 'Il 30 agosto 1945 la squadra navale britannica del contrammiraglio Sir Cecil Harcourt entra a Victoria Harbour liberando Hong Kong dall\'occupazione giapponese (resa formale firmata il 16 settembre 1945).',
          'Alleati',
          s >= 19
            ? 'British Empire — Crown Colony of Hong Kong (Governor Sir Alexander Grantham)'
            : 'British Military Administration — Hong Kong (Rear-Admiral Sir Cecil Harcourt)'
        );
      }
      if (s >= 9 && (nrm_hb.includes('hong kong') || name === 'Hong Kong')) {
        return makeResult(
          'JAP',
          'Honkon Senryōchi (Hong Kong — Occupazione Imperiale Giapponese)',
          'Battaglia di Hong Kong (8-25 dicembre 1941): conquista giapponese della colonia britannica nel "Black Christmas" del 25 dicembre 1941.',
          'Asse',
          'Dai Nippon Teikoku — Honkon Senryōchi Sōtokubu'
        );
      }
      if (s >= 13 && nrm_hb.includes('gilbert')) {
        return makeResult(
          s === 13 ? 'USA' : 'UK',
          s >= 18
            ? 'Gilbert and Ellice Islands Colony (Tarawa — Amministrazione Britannica Restaurata)'
            : 'Gilbert and Ellice Islands Colony (Tarawa & Makin Liberate dagli Alleati)',
          s >= 18
            ? 'Amministrazione coloniale britannica della Western Pacific High Commission ripristinata sugli atolli di Tarawa, Makin (Butaritari), Abemama e sulle Isole Ellice dopo la vittoria di Galatea/Galvanic.'
            : '20-23 novembre 1943 (Operazione Galvanic): i Marines e la 27ª Divisione USA espugnano Tarawa e Makin eliminando le guarnigioni giapponesi e restituendo le Isole Gilbert agli Alleati.',
          'Alleati',
          s === 13
            ? 'U.S. Pacific Ocean Areas — Tarawa & Makin Garrison'
            : 'British Western Pacific High Commission — Gilbert & Ellice Islands Colony'
        );
      }
      if (s >= 18 && (nrm_hb.includes('sarawak') || nrm_hb.includes('brunei'))) {
        const isBrunei = nrm_hb.includes('brunei');
        return makeResult(
          'UK',
          s >= 19
            ? isBrunei
              ? 'State of Brunei (Protettorato Britannico — Sultano Ahmad Tajuddin)'
              : 'Sarawak (Colonia della Corona Britannica del Borneo)'
            : isBrunei
            ? 'State of Brunei (Liberazione & Ritorno al Protettorato Britannico — BMA)'
            : 'Kingdom of Sarawak (Liberazione & Amministrazione Militare Britannica BMA)',
          s >= 19
            ? isBrunei
              ? 'Al 30 settembre 1947 il Sultanato del Brunei è un protettorato britannico retto dal Sultano Ahmad Tajuddin con il Residente Britannico, in rapida ripresa produttiva nei campi petroliferi di Seria.'
              : 'Dal 1° luglio 1946 Sarawak è formalmente ceduta dall\'ultimo Rajah Bianco Charles Vyner Brooke alla Corona Britannica come Crown Colony.'
            : 'Settembre 1945: a seguito della liberazione alleata (Operazione Oboe Six della 9ª Divisione australiana) e della resa delle forze giapponesi a Labuan (10 settembre 1945), Brunei e Sarawak tornano sotto controllo britannico (BMA).',
          'Alleati',
          s >= 19
            ? isBrunei
              ? 'British Protected State of Brunei (Sultan Ahmad Tajuddin / British Resident)'
              : 'British Empire — Crown Colony of Sarawak (Kuching)'
            : 'British Military Administration — British Borneo (BMA)'
        );
      }
      if (s >= 9 && (nrm_hb.includes('sarawak') || nrm_hb.includes('brunei') || nrm_hb.includes('gilbert'))) {
        return makeResult(
          'JAP',
          nrm_hb.includes('gilbert')
            ? 'Girubāto Shotō (Isole Gilbert: Makin & Tarawa — Occupazione Imperiale Giapponese)'
            : 'Kita Boruneo (Sarawak & Brunei — Occupazione Militare Giapponese)',
          nrm_hb.includes('gilbert')
            ? 'Occupazione delle Isole Gilbert (9-10 dicembre 1941 / agosto 1942): le Forze Speciali da Sbarco della Marina Imperiale occupano gli atolli di Makin (Butaritari) e Tarawa; dopo il raid dei Marine Raiders di Carlson a Makin (17-18 agosto 1942), Tokyo trasforma Tarawa in una formidabile piazzaforte corallina.'
            : 'Operazione B (16-25 dicembre 1941): il Distaccamento Kawaguchi sbarca a Miri, conquista i campi petroliferi di Seria in Brunei e occupa Kuching (Sarawak) il 24 dicembre 1941.',
          'Asse',
          'Dai Nippon Teikoku — Occupazione Militare Giapponese'
        );
      }
      if (s >= 18 && (nrm_hb.includes('solomon') || nrm_hb.includes('salomone'))) {
        return makeResult(
          'UK',
          s >= 19
            ? 'British Solomon Islands Protectorate (Ricostruzione Postbellica — Honiara)'
            : 'British Solomon Islands Protectorate (Fine Ostilità & Resa alle Salomone — Settembre 1945)',
          s >= 19
            ? 'Al 30 settembre 1947 il protettorato britannico delle Salomone trasferisce progressivamente la capitale da Tulagi a Honiara (Guadalcanal), mentre il movimento locale Maasina Rule chiede maggiore autogoverno a Malaita.'
            : 'Settembre 1945: con la resa delle ultime forze giapponesi a Bougainville e nelle Salomone settentrionali (8 settembre 1945) terminano tutte le operazioni belliche e si restaura l\'amministrazione britannica.',
          'Alleati',
          'British Protectorate — Western Pacific High Commission (Suva)'
        );
      }
      if (s >= 12 && (nrm_hb.includes('solomon') || nrm_hb.includes('salomone'))) {
        return makeResult(
          'UK',
          'British Solomon Islands Protectorate (Operazione Cartwheel — Campagna della Nuova Georgia & Munda, Luglio 1943)',
          'Dopo l\'evacuazione giapponese di Guadalcanal (febbraio 1943), il 30 giugno 1943 gli Alleati lanciano l\'Operazione Cartwheel: a fine luglio infuriano i combattimenti nell\'isola di Nuova Georgia per espugnare l\'aeroporto strategico di Munda Point e isolare la base giapponese di Rabaul.',
          'Alleati',
          'British Solomon Islands Protectorate — Allied South Pacific Area (Admiral William F. Halsey Jr.)'
        );
      }
      if (s >= 11 && (nrm_hb.includes('solomon') || nrm_hb.includes('salomone'))) {
        return makeResult(
          'USA',
          'British Solomon Islands Protectorate (Guadalcanal & Henderson Field — US Forces)',
          'Svolta nella Campagna di Guadalcanal (novembre 1942): dopo la vittoria nella Battaglia navale di Guadalcanal (12-15 novembre 1942), le forze aeronavali statunitensi (Ammiraglio William Halsey) e la 1ª Divisione Marines consolidano il controllo strategico su Henderson Field e sull\'arcipelago meridionale delle Salomone, respingendo definitivamente l\'ultimo grande tentativo giapponese di sbarcare rinforzi pesanti.',
          'Alleati',
          'South Pacific Area (SOPAC — Admiral William F. Halsey Jr.) & 1st Marine Division'
        );
      }
      if (s >= 18 && nrm_hb.includes('nauru')) {
        return makeResult(
          'AST',
          s >= 19
            ? 'Nauru (Territorio Fiduciario ONU — Amministrazione Australiana)'
            : 'Nauru (Resa della Guarnigione Giapponese — 13 Settembre 1945)',
          s >= 19
            ? 'Al 30 settembre 1947 l\'isola di Nauru è amministrata dall\'Australia (per conto del Mandato fiduciario congiunto Australia-Regno Unito-Nuova Zelanda), avviando la ripresa dell\'estrazione dei fosfati dopo il rientro dei deportati da Truk.'
            : 'Il 13 settembre 1945 a bordo della fregata australiana HMAS Diamantina, la guarnigione giapponese di Nauru si arrende formalmente al brigadiere J. R. Stevenson.',
          'Alleati',
          'Commonwealth of Australia — Territory of Nauru'
        );
      }
      if (
        s >= 10 &&
        s < 18 &&
        (nrm_hb.includes('malaya') ||
          nrm_hb.includes('malaysia') ||
          nrm_hb.includes('straits') ||
          nrm_hb.includes('singapore') ||
          nrm_hb.includes('borneo') ||
          nrm_hb.includes('burma') ||
          nrm_hb.includes('solomon') ||
          nrm_hb.includes('nauru') ||
          nrm_hb.includes('andaman') ||
          nrm_hb.includes('christmas'))
      ) {
        return makeResult(
          'JAP',
          nrm_hb.includes('singapore') || nrm_hb.includes('straits')
            ? 'Shōnan-tō (Singapore — Fortezza Imperiale Giapponese, Resa del 15 Febbraio 1942)'
            : nrm_hb.includes('burma')
            ? 'Biruma Gunsei-kanbu (Birmania Occupata dal Giappone — Taglio della Burma Road, Maggio 1942)'
            : nrm_hb.includes('solomon')
            ? 'Soromon Shotō (Isole Salomone: Tulagi & Guadalcanal — Perimetro Difensivo Giapponese, Agosto 1942)'
            : nrm_hb.includes('nauru')
            ? 'Nauru-tō (Isola di Nauru — Occupazione Navale Giapponese, 26 Agosto 1942)'
            : 'Marē Hantō & Kita Boruneo (Malesia e Borneo — Occupazione Militare Giapponese)',
          nrm_hb.includes('solomon')
            ? 'Campagna delle Isole Salomone (gennaio-agosto 1942): la Marina Imperiale Giapponese occupa Bougainville, le Shortland, Tulagi (3 maggio) e avvia la costruzione della pista aerea di Lunga Point a Guadalcanal. Nonostante lo sbarco della 1ª Divisione Marines statunitense il 7 agosto 1942 e la vittoria navale giapponese all\'Isola di Savo (9 agosto), al 31 agosto 1942 l\'arcipelago è teatro di furiosi scontri lungo il perimetro difensivo nipponico.'
            : nrm_hb.includes('burma')
            ? 'Conquista giapponese della Birmania (gennaio-maggio 1942): la 15ª Armata del Ten. Gen. Shōjirō Iida conquista Rangoon (8 marzo), Mandalay (1° maggio) e Lashio, tagliando definitivamente la Strada della Birmania (Burma Road) verso la Cina nazionalista.'
            : 'Massima espansione dell\'Impero Giapponese nel Sud-Est Asiatico e nel Pacifico (febbraio-agosto 1942): caduta di Singapore (15 febbraio 1942, ribattezzata Shōnan-tō) e consolidamento della Sfera di Co-Prosperità della Grande Asia Orientale.',
          'Asse',
          'Dai Nippon Teikoku — Nanpōgun (Gruppo d\'Armate di Spedizione Meridionale) & Kaigun'
        );
      }
      if (s >= 21 && nrm_hb.includes('burma')) {
        return makeResult(
          'BUR',
          'Unione della Birmania (Repubblica Sovrana Indipendente — 4 Gennaio 1948)',
          'Il 4 gennaio 1948 la Birmania proclama la piena indipendenza dal Regno Unito come Repubblica sovrana fuori dal Commonwealth sotto il Presidente Sao Shwe Thaik e il Primo Ministro U Nu.',
          'Neutrale',
          'Union of Burma · Pyidaungzu Myanma Naingngandaw (Pres. Sao Shwe Thaik · PM U Nu)'
        );
      }
      if (s >= 21 && (nrm_hb.includes('ceylon') || nrm_hb.includes('sri lanka'))) {
        return makeResult(
          'CEY',
          'Dominion di Ceylon (Reame Indipendente del Commonwealth — 4 Febbraio 1948)',
          'Il 4 febbraio 1948 l\'isola di Ceylon diviene il Dominion di Ceylon, reame indipendente all\'interno del Commonwealth delle Nazioni sotto il Primo Ministro D.S. Senanayake.',
          'Alleati',
          'Dominion of Ceylon (PM D.S. Senanayake · Gov.-Gen. Sir Henry Monck-Mason Moore)'
        );
      }
      return makeResult(
        'UK',
        top.name,
        top.note || 'Territorio d\'oltremare della Corona Britannica',
        s >= 4 ? 'Alleati' : 'Neutrale',
        top.adminTitle || 'British Empire'
      );
    }
    if (ov.o === 'AST' || ov.o === 'CAN' || ov.o === 'NZL' || ov.o === 'SAF' || ov.o === 'RAJ') {
      if (
        ov.o === 'AST' &&
        s >= 18 &&
        (nrm_hb.includes('new guinea') ||
          nrm_hb.includes('rabaul') ||
          nrm_hb.includes('bismarck') ||
          nrm_hb.includes('bougainville') ||
          nrm_hb.includes('nauru'))
      ) {
        return makeResult(
          'AST',
          nrm_hb.includes('nauru')
            ? s >= 19
              ? 'Nauru (Territorio Fiduciario ONU — Amministrazione Australiana)'
              : 'Nauru (Resa della Guarnigione Giapponese — 13 Settembre 1945)'
            : s >= 19
            ? 'Territory of Papua-New Guinea (Amministrazione Civile Australiana / Tutela ONU)'
            : 'Nuova Guinea, Rabaul e Bougainville (Resa Giapponese & Amministrazione Australiana ANGAU)',
          nrm_hb.includes('nauru')
            ? 'Dopo la resa giapponese del 13 settembre 1945 a bordo dell\'HMAS Diamantina, l\'Australia ripristina l\'amministrazione su Nauru (sotto accordo fiduciario ONU dal 1947).'
            : s >= 19
            ? 'Al 30 settembre 1947 l\'Australia esercita l\'amministrazione civile unificata sul Territorio di Papua e Nuova Guinea (Accordo di Tutela ONU del dicembre 1946; Amministratore Col. J. K. Murray).'
            : 'Settembre 1945: capitolazione delle armate giapponesi a Rabaul (6 settembre), Torokina/Bougainville (8 settembre) e Wewak (13 settembre) dinanzi alle forze australiane (ANGAU).',
          'Alleati',
          s >= 19
            ? 'Commonwealth of Australia — Territory of Papua-New Guinea (Port Moresby)'
            : 'Commonwealth of Australia — ANGAU (Australian New Guinea Administrative Unit)'
        );
      }
      if (
        ov.o === 'AST' &&
        s >= 10 &&
        s < 18 &&
        (nrm_hb.includes('new guinea') ||
          nrm_hb.includes('rabaul') ||
          nrm_hb.includes('bismarck') ||
          nrm_hb.includes('bougainville') ||
          nrm_hb.includes('nauru'))
      ) {
        return makeResult(
          'JAP',
          'Rabaul, Nuova Guinea Settentrionale e Nauru (Occupazione Imperiale Giapponese)',
          'Espansione giapponese nel Pacifico Sud-Occidentale (gennaio-agosto 1942): conquista di Rabaul in Nuova Britannia (23 gennaio 1942, trasformata nella principale roccaforte aeronavale dell\'8ª Flotta e della 17ª Armata), Kavieng, Bougainville, Lae-Salamaua (8 marzo), Buna-Gona (21 luglio, inizio dell\'offensiva lungo il Sentiero di Kokoda) e Nauru (26 agosto 1942).',
          'Asse',
          'Dai Nippon Teikoku — 8ª Flotta (Viceamm. Gunichi Mikawa) & 17ª Armata (Rabaul)'
        );
      }
      return makeResult(
        ov.o,
        top.name,
        top.note || 'Dominion britannico o impero associato',
        s >= 4 ? 'Alleati' : 'Neutrale',
        top.adminTitle || 'British Commonwealth of Nations'
      );
    }
    if (ov.o === 'USA') {
      if (s >= 10 && s < 12 && (nrm_hb.includes('attu') || nrm_hb.includes('kiska') || nrm_hb.includes('aleutian'))) {
        return makeResult(
          'JAP',
          'Atsuta-tō & Narukami-tō (Isole di Attu e Kiska — Occupazione Imperiale Giapponese nelle Aleutine)',
          'Campagna delle Isole Aleutine (Operazione AL, 6-7 giugno 1942): le forze speciali da sbarco della 5ª Flotta giapponese (Viceamm. Boshiro Hosogaya) occupano le isole statunitensi di Kiska (6 giugno) e Attu (7 giugno) in Alaska, unico territorio nordamericano occupato dall\'Asse nella Seconda Guerra Mondiale.',
          'Asse',
          'Dai Nippon Teikoku Kaigun — 5ª Flotta (Presidi di Attu e Kiska)'
        );
      }
      if (s >= 15 && (name === 'Guam' || nrm_hb.includes('guam'))) {
        return makeResult(
          'USA',
          s >= 19
            ? 'Territory of Guam (Amministrazione Navale USA — Ricostruzione Postbellica)'
            : 'Guam (Liberata — Base Aeronavale Strategica USA per B-29)',
          s >= 19
            ? 'Al 30 settembre 1947 l\'isola di Guam è un territorio non incorporato degli Stati Uniti amministrato dalla U.S. Navy (Gov. Charles A. Pownall), perno logistico e aeronavale americano nelle Marianne.'
            : 'Luglio-Agosto 1944: le forze anfibie statunitensi liberano Guam (21 luglio - 10 agosto 1944) trasformando l\'isola in grande base avanzata dei bombardieri B-29 e quartier generale del Pacifico.',
          'Alleati',
          'United States Navy — Naval Government of Guam'
        );
      }
      if (s >= 18 && (name === 'Wake Island' || nrm_hb.includes('wake'))) {
        return makeResult(
          'USA',
          s >= 19
            ? 'Wake Island (Territorio Non Incorporato USA — Civil Aeronautics Administration)'
            : 'Wake Island (Resa Giapponese del 4 Settembre 1945 — Ritorno agli USA)',
          s >= 19
            ? 'Al 30 settembre 1947 l\'atollo di Wake torna a fungere da fondamentale scalo aereo transpacifico sotto amministrazione statunitense (CAA/U.S. Navy).'
            : 'Il 4 settembre 1945 il contrammiraglio Shigematsu Sakaibara firma la resa incondizionata della guarnigione giapponese di Wake Island dinanzi al generale dei Marines Lawson H. M. Sanderson.',
          'Alleati',
          'United States Navy / Civil Aeronautics Administration — Wake Island'
        );
      }
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
    if (ov.o === 'BRA' && s >= 10) {
      return makeResult(
        'BRA',
        top.name || 'Estados Unidos do Brasil (Belligerante Alleato)',
        'Dichiarazione di guerra del Brasile all\'Asse (22 agosto 1942): dopo l\'affondamento di cinque mercantili brasiliani ad opera del sommergibile tedesco U-507, il Presidente Getúlio Vargas dichiara lo stato di belligeranza contro Germania e Italia, concedendo agli Alleati le basi aeronavali strategiche di Natal ("Trampolino della Vittoria") e Recife.',
        'Alleati',
        'Estados Unidos do Brasil — Presidente Getúlio Vargas (Cobelligerante e Alleato)'
      );
    }
    if (ov.o === 'MEX' && s >= 10) {
      return makeResult(
        'MEX',
        top.name || 'Estados Unidos Mexicanos (Belligerante Alleato)',
        'Dichiarazione di guerra del Messico alle Potenze dell\'Asse (22 maggio 1942): in seguito al siluramento delle petroliere messicane Potrero del Llano e Faja de Oro nel Golfo del Messico da parte degli U-Boot tedeschi, il Presidente Manuel Ávila Camacho porta il Messico in guerra al fianco degli Alleati.',
        'Alleati',
        'Estados Unidos Mexicanos — Presidente Gen. Manuel Ávila Camacho (Alleato)'
      );
    }
    if (['GTM', 'SLV', 'HND', 'NIC', 'CRI', 'PAN', 'CUB', 'DOM', 'HAI'].includes(ov.o) && s >= 9) {
      return makeResult(
        ov.o,
        top.name,
        top.note || 'Stato centroamericano/caraibico cobelligerante delle Nazioni Unite (Dichiarazione di guerra a Giappone, Germania e Italia, dicembre 1941)',
        'Alleati',
        top.adminTitle
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
    if (ov.o === 'SIA' && s >= 18) {
      return makeResult(
        'SIA',
        s >= 19
          ? 'Regno di Thailandia (Ratcha-anachak Thai — Post-Trattato di Washington & ONU)'
          : 'Regno di Thailandia (Governo di Pace Seri Thai — Settembre 1945)',
        s >= 19
          ? 'Al 30 settembre 1947 la Thailandia (membro delle Nazioni Unite dal dicembre 1946) ha restituito i territori annessi durante la guerra alla Francia (Trattato di Washington del novembre 1946: Battambang, Siem Reap, Champassak e Sayaboury) e al Regno Unito (quattro sultanati malesi e due stati Shan).'
          : 'Agosto-Settembre 1945: dopo la resa giapponese, il Reggente Pridi Banomyong (capo della resistenza antigiapponese Seri Thai) dichiara nulla la dichiarazione di guerra del 1942 e affida il governo a Seni Pramoj per la riconciliazione con gli Alleati e la restituzione dei territori occupati.',
        'Neutrale',
        s >= 19
          ? 'Ratcha-anachak Thai — Re Bhumibol Adulyadej (Rama IX) / P.M. Thawan Thamrongnawasawat'
          : 'Ratcha-anachak Thai — Governo Seri Thai (Reggente Pridi Banomyong / P.M. Seni Pramoj)'
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
  if (s >= 16) {
    return makeResult(
      'SOV',
      s >= 20
        ? `${histName || 'Tallinn'} — RSS Estone (URSS, Dic. 1947)`
        : s >= 19
        ? `${histName || 'Tallinn'} — Estonskaya SSR (URSS, 1947)`
        : s >= 18
        ? `${histName || 'Tallinn'} — Estonskaya SSR (Dopoguerra 1945)`
        : `${histName || 'Tallinn'} — Estonskaya SSR`,
      s >= 20
        ? 'Dicembre 1947: nella RSS Estone avanzano la collettivizzazione forzata iniziale, la repressione della resistenza clandestina dei "Fratelli della Foresta" (Metsavennad) e la riforma monetaria sovietica.'
        : s >= 19
        ? 'Settembre 1947: Repubblica Socialista Sovietica Estone (Sovet Ministrov a Tallinn — Nikolai Karotamm); ricostruzione portuale, estrazione di scisti bituminosi a Kohtla-Järve e sovietizzazione.'
        : s >= 18
        ? 'Settembre 1945: consolidamento della RSS Estone nel dopoguerra (rettifica confinaria di Petseri/Narva est trasferita alla RSFSR nel 1944-45) e sgombero dei danni bellici a Tallinn e Tartu.'
        : 'Settembre-Novembre 1944: riconquista sovietica di Tallinn (22 settembre) e dell\'Estonia continentale e insulare; ristabilimento della RSS Estone.',
      'Comintern',
      s >= 19 ? 'Sovet Ministrov Estonskoj SSR — Tallinn (URSS)' : 'SSSR — Estonskaya SSR (Tallinn)'
    );
  }
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
  const nrm = normStr(nid + ' ' + (histName || '') + ' ' + (rawName || ''));
  if (s >= 16) {
    const isCourland =
      nid === 'LV003' ||
      nrm.includes('kurzeme') ||
      nrm.includes('liepaja') ||
      nrm.includes('ventspils') ||
      nrm.includes('kuldiga');
    if ((s === 16 || s === 17) && isCourland) {
      return makeResult(
        'GER',
        'Kurzeme / Sacca di Curlandia (Heeresgruppe Kurland — Wehrmacht)',
        'Ottobre 1944 - Maggio 1945: l\'Heeresgruppe Nord (poi Heeresgruppe Kurland) resta accerchiato nella penisola di Curlandia fino alla resa generale dell\'8 maggio 1945.',
        'Asse',
        'Deutsche Wehrmacht — Heeresgruppe Kurland'
      );
    }
    return makeResult(
      'SOV',
      s >= 20
        ? isCourland
          ? 'Kurzeme (Curlandia — RSS Lettone / URSS, Dic. 1947)'
          : `${histName || 'Riga'} — RSS Lettone (URSS, Dic. 1947)`
        : s >= 19
        ? isCourland
          ? 'Kurzeme (RSS Lettone — Ricostruzione Liepāja & Ventspils, 1947)'
          : `${histName || 'Riga'} — Latviyskaya SSR (URSS, 1947)`
        : isCourland
        ? 'Kurzeme (Sacca di Curlandia Liberata — Latviyskaya SSR)'
        : `${histName || 'Riga'} (Liberata — Latviyskaya SSR)`,
      s >= 20
        ? 'Dicembre 1947: nella RSS Lettone (Jānis Kalnbērziņš / Vilis Lācis) si intensifica la lotta ai partigiani antisovietici delle foreste, avanza la preparazione alla collettivizzazione e entra in vigore la riforma del rublo.'
        : s >= 19
        ? 'Settembre 1947: Repubblica Socialista Sovietica Lettone (Sovet Ministrov a Riga); riattivazione industriale dei porti baltici di Riga, Liepāja e Ventspils nel Quarto Piano Quinquennale.'
        : 'Ottobre 1944 - 1945: liberazione sovietica di Riga e resa della sacca di Curlandia (maggio 1945); piena reintegrazione nella RSS Lettone e distacco del distretto di Abrene verso Pskov.',
      'Comintern',
      s >= 19 ? 'Sovet Ministrov Latvijskoj SSR — Riga (URSS)' : 'SSSR — Latviyskaya SSR (Riga)'
    );
  }
  if (s >= 9) {
    return makeResult(
      'GER',
      `Generalbezirk Lettland — ${histName || 'Riga'} (Reichskommissariat Ostland)`,
      `Reichskommissariat Ostland (Generalbezirk Lettland) — Occupata dal Gruppo d'Armate Nord tedesco tra fine giugno e inizio luglio 1941 (caduta di Riga il 1° luglio 1941). Riga diviene la capitale amministrativa dell'intero Reichskommissariat Ostland (istituito il 17 luglio 1941 sotto il Reichskommissar Hinrich Lohse) e sede del Generalbezirk Lettland guidato dal Generalkommissar Otto-Heinrich Drechsler.`,
      'Asse',
      'Reichskommissariat Ostland — Hauptstadt Riga & Generalbezirk Lettland (Reichskommissar Hinrich Lohse / Otto-Heinrich Drechsler)'
    );
  }

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
  const isMemel = nid === 'LT023' || nid === 'MEMEL' || nrm.includes('memel') || nrm.includes('klaipedos krastas');
  if (s >= 16 && (!isMemel || s >= 17)) {
    return makeResult(
      'SOV',
      s >= 20
        ? `${isMemel ? 'Klaipėda / Memel' : histName || 'Vilnius'} — RSS Lituana (URSS, Dic. 1947)`
        : s >= 19
        ? `${isMemel ? 'Klaipėda / Memel' : histName || 'Vilnius'} — Lietuvos TSR (URSS, 1947)`
        : `${isMemel ? 'Klaipėda / Memel' : histName || 'Vilnius'} — Lietuvos TSR`,
      s >= 20
        ? isMemel
          ? 'Dicembre 1947: Klaipėda (Memel) opera come principale scalo commerciale e peschereccio libero dai ghiacci della RSS Lituana nel sistema sovietico post-riforma monetaria.'
          : 'Dicembre 1947: sotto Antanas Sniečkus prosegue nella RSS Lituana l\'aspra controguerriglia MVD contro i partigiani lituani (Miško broliai), mentre entra in vigore la riforma monetaria di fine anno.'
        : s >= 19
        ? isMemel
          ? 'Settembre 1947: ricostruzione del porto di Klaipėda, annesso definitivamente alla RSS Lituana dal gennaio 1945 con afflusso di coloni dalle repubbliche interne.'
          : 'Settembre 1947: Repubblica Socialista Sovietica Lituana (Sovet Ministrov a Vilnius); ricostruzione di Vilnius e Kaunas nel Quarto Piano Quinquennale e rimpatrio della popolazione polacca verso la Polonia.'
        : isMemel
        ? '28 gennaio 1945: conquista sovietica della piazzaforte di Memel (Klaipėda) e integrazione nella RSS Lituana (URSS).'
        : 'Luglio-Ottobre 1944 - 1945: liberazione di Vilnius, Kaunas e Palanga da parte dell\'Armata Rossa; reintegrazione nella RSS Lituana.',
      'Comintern',
      s >= 19 ? 'Sovet Ministrov Litovskoj SSR — Vilnius (URSS)' : 'SSSR — Lietuvos TSR (Vilnius)'
    );
  }
  if (s >= 9 && !isMemel) {
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

  // Step 24 (DIC 1949): Siria (Armistizio del 20 Luglio 1949 & Golpe Hinnawi/Shishakli) e Libano Sovrano
  if (s >= 24) {
    const rawTitle = props.HISTORICAL_NAME || props.NAME || props.name || (isLeb ? 'Beirut' : 'Damasco');
    if (isLeb) {
      return makeResult(
        'LEB',
        `Repubblica Libanese (Confini della Linea Verde 1949) — ${rawTitle}`,
        `${rawTitle} · Al 31 dicembre 1949 la Repubblica Libanese (Presidente Béchara El Khoury · Primo Ministro Riad Al Solh) mantiene la piena sovranità entro la frontiera internazionale del 1923 sancita dall'Armistizio di Ras en-Naqura con Israele (23 marzo 1949).`,
        'Neutrale',
        'Repubblica Libanese (Presidente Béchara El Khoury & Primo Ministro Riad Al Solh — Beirut)'
      );
    }
    return makeResult(
      'SYR',
      `Repubblica Siriana (Armistizio Israele-Siria del 20 Luglio 1949 & Governo Atassi) — ${rawTitle}`,
      `${rawTitle} · Al 31 dicembre 1949 la Siria (dopo l'Armistizio con Israele firmato il 20 luglio 1949 con evacuazione della testa di ponte di Mishmar HaYarden nelle Zone Demilitarizzate, e dopo i colpi di Stato militari di agosto e del 19 dicembre 1949 contro al-Za'im e al-Hinnawi) è guidata dal Capo di Stato Hashim al-Atassi con l'influenza militare del Col. Adib al-Shishakli.`,
      'Neutrale',
      'Repubblica Siriana (Capo di Stato Hashim al-Atassi · Col. Adib al-Shishakli — Damasco, Dic 1949)'
    );
  }

  // Step 20 (DIC 1947): Arab League Cairo Summit & Arab Liberation Army (ALA) mobilization
  if (s >= 20) {
    const rawTitle = props.HISTORICAL_NAME || props.NAME || props.name || (isLeb ? 'Beirut' : 'Damasco');
    if (isLeb) {
      return makeResult(
        'LEB',
        `Repubblica Libanese (Sovranità & Vertice della Lega Araba, Dic. 1947) — ${rawTitle}`,
        `${rawTitle} · Dicembre 1947: pienamente sovrana dopo il ritiro alleato del 1946, la Repubblica Libanese di Béchara El Khoury e Riad Al Solh partecipa al vertice della Lega Araba al Cairo contro la spartizione della Palestina (Risoluzione ONU 181), schierando l'esercito lungo la frontiera meridionale con la Galilea.`,
        'Neutrale',
        'Repubblica Libanese (Presidente Béchara El Khoury & P.M. Riad Al Solh — Beirut, Dic. 1947)'
      );
    }
    return makeResult(
      'SYR',
      `Repubblica Siriana (Sovranità & Mobilitazione ALA, Dic. 1947) — ${rawTitle}`,
      `${rawTitle} · Dicembre 1947: al vertice della Lega Araba al Cairo (8–17 dicembre 1947), la Repubblica Siriana di Shukri al-Quwatli e Jamil Mardam Bey respinge la Risoluzione ONU 181 e organizza presso Damasco (campo di Qatana) l'Esercito Arabo di Liberazione (Jaysh al-Inqadh) sotto il comando di Fawzi al-Qawuqji.`,
      'Neutrale',
      'Repubblica Siriana (Presidente Shukri al-Quwatli & P.M. Jamil Mardam Bey — Damasco, Dic. 1947)'
    );
  }

  // Step 19 (SET 1947): Sovereign independent Syria and Lebanon post-Allied evacuation
  if (s >= 19) {
    const rawTitle = props.HISTORICAL_NAME || props.NAME || props.name || (isLeb ? 'Beirut' : 'Damasco');
    if (isLeb) {
      return makeResult(
        'LEB',
        `Repubblica Libanese (Indipendenza & Sovranità) — ${rawTitle}`,
        `${rawTitle} · Piena indipendenza e sovranità della Repubblica Libanese completate dopo l'evacuazione definitiva di tutte le truppe francesi e britanniche il 31 dicembre 1946. Presidenza di Béchara El Khoury e governo di Riad Al Solh retti dal Patto Nazionale del 1943, membro fondatore dell'ONU e della Lega Araba.`,
        'Neutrale',
        'Repubblica Libanese (Presidente Béchara El Khoury & Primo Ministro Riad Al Solh — Beirut)'
      );
    }
    return makeResult(
      'SYR',
      `Repubblica Siriana (Indipendenza & Sovranità) — ${rawTitle}`,
      `${rawTitle} · Piena sovranità della Repubblica Siriana celebrata con l'Evacuazione del 17 aprile 1946 (Eid al-Jalaa) delle ultime unità militari francesi e britanniche. Presidenza di Shukri al-Quwatli e governo di Jamil Mardam Bey, membro fondatore della Lega Araba e dell'ONU.`,
      'Neutrale',
      'Repubblica Siriana (Presidente Shukri al-Quwatli — Damasco)'
    );
  }

  // Step 18 (SET 1945): Post-Levant Crisis sovereign republics negotiating Allied troop withdrawal
  if (s >= 18) {
    const rawTitle = props.HISTORICAL_NAME || props.NAME || props.name || (isLeb ? 'Beirut' : 'Damasco');
    if (isLeb) {
      return makeResult(
        'LEB',
        `Repubblica Libanese (Post-Crisi del Levante, Set. 1945) — ${rawTitle}`,
        `${rawTitle} · Settembre 1945: la Repubblica Libanese guidata dal Presidente Béchara El Khoury e retta dal Patto Nazionale del 1943 — membro fondatore delle Nazioni Unite e della Lega Araba — negozia lo sgombero definitivo delle ultime guarnigioni francesi e britanniche dopo la crisi del Levante di maggio-giugno 1945.`,
        'Alleati',
        'Repubblica Libanese (Presidente Béchara El Khoury — Beirut, Settembre 1945)'
      );
    }
    return makeResult(
      'SYR',
      `Repubblica Siriana (Post-Crisi del Levante, Set. 1945) — ${rawTitle}`,
      `${rawTitle} · Settembre 1945: dopo la Crisi del Levante (bombardamento francese di Damasco del maggio 1945 e intervento della 9ª Armata britannica), il governo sovrano del Presidente Shukri al-Quwatli — membro fondatore dell'ONU e della Lega Araba — sollecita l'evacuazione totale delle forze franco-britanniche.`,
      'Alleati',
      'Repubblica Siriana (Presidente Shukri al-Quwatli — Damasco, Settembre 1945)'
    );
  }

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

  // STEP >= 25 (30 Giugno 1950): Annessione Formale Giordana della Cisgiordania e Gerusalemme Est (Ratifica Parlamentare 24 Aprile 1950)
  if (s >= 25) {
    if (pNid === 'PAL_JRS' || pOrig === 'ILJM' || pName.includes('jerusalem') || pName.includes('gerusalemme') || pName.includes('al-quds')) {
      return makeResult(
        'ISR',
        'Distretto di Gerusalemme — Gerusalemme Ovest Capitale d\'Israele · Gerusalemme Est Annessa dalla Giordania (24 Apr 1950)',
        'Al 30 giugno 1950 Gerusalemme Ovest ospita la sede del governo israeliano (capitale dal dicembre 1949), mentre Gerusalemme Est (Città Vecchia) e la Cisgiordania sono formalmente unite al Regno Hascemita di Giordania in base all\'Atto di Unione ratificato dal Parlamento di Amman il 24 aprile 1950.',
        'Neutrale',
        'Medinat Yisrael (Gerusalemme Ovest Capitale) / Regno Hascemita di Giordania (Gerusalemme Est Annessa, 24 Apr 1950)'
      );
    }
    if (pNid === 'PAL_SAM' || pOrig === 'PSWBK' || pName.includes('samaria') || pName.includes('judea') || pName.includes('giudea') || pName.includes('nablus') || pName.includes('hebron') || pName.includes('west bank')) {
      return makeResult(
        'JOR',
        'Regno Hascemita di Giordania — Cisgiordania / West Bank (Annessione Formale del 24 Aprile 1950)',
        'Il 24 aprile 1950 il Parlamento di Amman ratifica ufficialmente l\'Atto di Unione che annette formalmente la Cisgiordania (Giudea e Samaria) e Gerusalemme Est come parte integrante del Regno Hascemita di Giordania di Re Abdallah I (riconosciuta da Regno Unito, Iraq e Pakistan), ponendo fine allo status di occupazione militare provvisoria.',
        'Neutrale',
        'Regno Hascemita di Giordania — Provincia Integrata della Cisgiordania (Atto di Unione, 24 Aprile 1950)'
      );
    }
  }

  // STEP >= 24 (31 Dicembre 1949): Chiusura degli Armistizi Arabo-Israeliani (Armistizio Israele-Siria del 20 Luglio 1949 & DMZ) e Proclamazione di Gerusalemme Ovest Capitale (Dicembre 1949)
  if (s >= 24) {
    if (pNid === 'PAL_BEER' || pOrig === 'ILD' || pName.includes('beersheba') || pName.includes('negev') || pName.includes('ashkelon') || pName.includes('eilat') || pName.includes('aqaba')) {
      return makeResult(
        'ISR',
        'Stato di Israele — Distretto Meridionale / Negev (100% Israele · Linea Verde 1949)',
        'Al 31 dicembre 1949 (100% Israele, esclusa la Striscia di Gaza): il Negev fino a Eilat (Umm Rashrash) sul Mar Rosso è stabilmente sotto sovranità israeliana con la Zona Demilitarizzata di al-Auja/Nitzana lungo il confine dell\'Armistizio israelo-egiziano.',
        'Neutrale',
        'Medinat Yisrael — Distretto Meridionale (100% Negev fino a Eilat · Auja DMZ)'
      );
    }
    if (pNid === 'PAL_LYD' || pOrig === 'ILM' || pName.includes('lydda') || pName.includes('ramle') || pName.includes('sharon') || pName.includes('lod')) {
      return makeResult(
        'ISR',
        'Stato di Israele — Distretto Centrale / Lydda & Sharon (100% Israele)',
        'Al 31 dicembre 1949 (100% Israele): l\'intera fascia costiera e pedemontana con il Piccolo Triangolo (Wadi Ara) fa parte dello Stato di Israele lungo la Linea Verde stabilita dagli armistizi del 1949.',
        'Neutrale',
        'Medinat Yisrael — Distretto Centrale (100% Israele · Linea Verde)'
      );
    }
    if (pNid === 'PAL_HFA' || pOrig === 'ILHA' || pName.includes('haifa')) {
      return makeResult(
        'ISR',
        'Stato di Israele — Distretto di Haifa (100% Israele)',
        'Al 31 dicembre 1949 (100% Israele): porto strategico di Haifa, piana di Zevulun e settore meridionale del Wadi Ara integrati nello Stato di Israele.',
        'Neutrale',
        'Medinat Yisrael — Distretto di Haifa (100% Israele)'
      );
    }
    if (pNid === 'PAL_TLV' || pOrig === 'ILTA' || pName.includes('tel aviv') || pName.includes('jaffa') || pName.includes('yafa') || pName.includes('giaffa')) {
      return makeResult(
        'ISR',
        'Stato di Israele — Distretto di Tel Aviv e Giaffa (100% Israele)',
        'Al 31 dicembre 1949: Tel Aviv e Giaffa rimangono il cuore economico e demografico di Israele, mentre a dicembre il governo Ben-Gurion e la Knesset trasferiscono ufficialmente la capitale politica a Gerusalemme Ovest.',
        'Neutrale',
        'Medinat Yisrael — Tel Aviv-Giaffa (Governo Ben-Gurion)'
      );
    }
    if (pNid === 'PAL_JRS' || pOrig === 'ILJM' || pName.includes('jerusalem') || pName.includes('gerusalemme') || pName.includes('al-quds')) {
      return makeResult(
        'ISR',
        'Distretto di Gerusalemme — Gerusalemme Ovest Capitale d\'Israele (Dic 1949) · Gerusalemme Est alla Giordania',
        'Nel dicembre 1949 Israele proclama Gerusalemme Ovest capitale dello Stato e vi trasferisce la Knesset e i ministeri, mentre il Regno Hascemita di Giordania amministra Gerusalemme Est (Città Vecchia) e la Cisgiordania lungo lo status quo della Linea Verde (senza annessione formale prima dell\'aprile 1950).',
        'Neutrale',
        'Medinat Yisrael (Gerusalemme Ovest Capitale, Dic 1949) / Regno Hascemita di Giordania (Gerusalemme Est)'
      );
    }
    if (pNid === 'PAL_GAL' || pOrig === 'ILZ' || pName.includes('galilea') || pName.includes('nazareth') || pName.includes('safed') || pName.includes('tiberias') || pName.includes('acre') || pName.includes('acri')) {
      return makeResult(
        'ISR',
        'Stato di Israele — Distretto Settentrionale / Galilea (100% Israele · Armistizio Israele-Siria del 20 Luglio 1949 & DMZ)',
        'Il 20 luglio 1949 viene firmato l\'ultimo accordo d\'armistizio arabo-israeliano tra Israele e Siria (Collina 272 / Mahanayim): la Siria evacua la testa di ponte di Mishmar HaYarden e le strisce territoriali a ovest del confine mandatario del 1923, che assumono lo status di Zone Demilitarizzate (DMZ) lungo la Linea Verde. Cessa ogni ostilità attiva della guerra del 1948.',
        'Neutrale',
        'Medinat Yisrael — Fronte Nord (100% Galilea ISR · DMZ Linea Verde Armistizio 20 Lug 1949)'
      );
    }
    if (pNid === 'PAL_SAM' || pOrig === 'PSWBK' || pName.includes('samaria') || pName.includes('judea') || pName.includes('giudea') || pName.includes('nablus') || pName.includes('hebron') || pName.includes('west bank')) {
      return makeResult(
        'JOR',
        'Cisgiordania / West Bank (Amministrazione del Regno Hascemita di Giordania — Linea Verde)',
        'Al 31 dicembre 1949 la Giordania (Re Abdallah I) esercita l\'amministrazione civile e militare sulla Cisgiordania e su Gerusalemme Est entro la Linea Verde dell\'armistizio del 3 aprile 1949 (mantenendo lo status quo armistiziale in attesa della formale unione parlamentare dell\'aprile 1950).',
        'Neutrale',
        'Regno Hascemita di Giordania — Amministrazione Cisgiordania & Gerusalemme Est (Linea Verde)'
      );
    }
    if (pNid === 'PAL_GAZ' || pOrig === 'PSGZA' || pName.includes('gaza') || pName.includes('rafah') || pName.includes('khan')) {
      return makeResult(
        'APG',
        'Striscia di Gaza (Governo di Tutto-Palestina · Amministrazione Militare Egiziana — Linea Verde)',
        'Al 31 dicembre 1949 la Striscia di Gaza resta delimitata lungo la Linea Verde dell\'armistizio israelo-egiziano, sotto amministrazione militare egiziana e Governo di Tutto-Palestina (APG).',
        'Neutrale',
        'Governo di Tutto-Palestina (APG) · Amministrazione Militare Egiziana — Striscia di Gaza'
      );
    }
  }

  // STEP >= 23 (30 Giugno 1949): Armistizi di Rodi (Egitto, Libano, Giordania) & Consolidamento della Linea Verde (Fronte Siriano Ancora Aperto)
  if (s >= 23) {
    if (pNid === 'PAL_BEER' || pOrig === 'ILD' || pName.includes('beersheba') || pName.includes('negev') || pName.includes('ashkelon') || pName.includes('eilat') || pName.includes('aqaba')) {
      return makeResult(
        'ISR',
        'Stato di Israele — Distretto Meridionale / Negev (100% Israele dopo Armistizio con l\'Egitto & Operazione Uvda)',
        'Al 30 giugno 1949 (100% Israele, esclusa Gaza): in attuazione dell\'Armistizio israelo-egiziano di Rodi (24 febbraio 1949), l\'esercito egiziano evacua la sacca di Faluja (26–27 febbraio), l\'area di al-Auja/Nitzana diviene Zona Demilitarizzata (DMZ) e con l\'Operazione Uvda (5–10 marzo 1949) le brigate Negev e Golani raggiungono Umm Rashrash (Eilat) sul Mar Rosso (10 marzo 1949).',
        'Neutrale',
        'Medinat Yisrael — Distretto Meridionale (100% Negev fino a Umm Rashrash/Eilat · Auja DMZ)'
      );
    }
    if (pNid === 'PAL_LYD' || pOrig === 'ILM' || pName.includes('lydda') || pName.includes('ramle') || pName.includes('sharon') || pName.includes('lod')) {
      return makeResult(
        'ISR',
        'Stato di Israele — Distretto Centrale (100% Israele · Annessione del Piccolo Triangolo / Wadi Ara)',
        'Al 30 giugno 1949 (100% Israele): con l\'Armistizio israelo-giordano firmato a Rodi il 3 aprile 1949, le truppe irachene si ritirano dal fronte della Samaria e la Giordania trasferisce a Israele la fascia strategica del Piccolo Triangolo / Wadi Ara (Umm al-Fahm, Baqa al-Gharbiyye, Tayibe, Tira, Qalansawe).',
        'Neutrale',
        'Medinat Yisrael — Distretto Centrale (100% Israele · Piccolo Triangolo / Wadi Ara)'
      );
    }
    if (pNid === 'PAL_HFA' || pOrig === 'ILHA' || pName.includes('haifa')) {
      return makeResult(
        'ISR',
        'Stato di Israele — Distretto di Haifa (100% Israele · Wadi Ara Consolidata)',
        'Al 30 giugno 1949 (100% Israele): integrato il settore meridionale attorno a Umm al-Fahm e al corridoio di Wadi Ara trasferito dall\'Armistizio con la Giordania (3 aprile 1949).',
        'Neutrale',
        'Medinat Yisrael — Distretto di Haifa (100% Israele)'
      );
    }
    if (pNid === 'PAL_TLV' || pOrig === 'ILTA' || pName.includes('tel aviv') || pName.includes('jaffa') || pName.includes('yafa') || pName.includes('giaffa')) {
      return makeResult(
        'ISR',
        'Stato di Israele — Distretto di Tel Aviv e Giaffa (Sede Governativa Provvisoria)',
        'Al 30 giugno 1949: dopo le elezioni della prima Knesset (25 gennaio 1949), l\'elezione di Chaim Weizmann a Presidente, il primo governo stabile di David Ben-Gurion e l\'ammissione di Israele all\'ONU (11 maggio 1949), gli uffici governativi iniziano il progressivo trasferimento da Tel Aviv a Gerusalemme Ovest.',
        'Neutrale',
        'Medinat Yisrael — Governo Ben-Gurion & I Knesset'
      );
    }
    if (pNid === 'PAL_JRS' || pOrig === 'ILJM' || pName.includes('jerusalem') || pName.includes('gerusalemme') || pName.includes('al-quds')) {
      return makeResult(
        'ISR',
        'Distretto di Gerusalemme — Linea Verde del 3 Aprile 1949 (Ovest & Monte Scopus a Israele · Est & Latrun alla Giordania)',
        'Al 30 giugno 1949 l\'Armistizio israelo-giordano (3 aprile 1949) sancisce la partizione lungo la Linea Verde: Gerusalemme Ovest e l\'exclave demilitarizzata del Monte Scopus sotto Israele; Gerusalemme Est (Città Vecchia) e il saliente di Latrun (terra di nessuno / presidio giordano) sotto il Regno Hascemita di Giordania.',
        'Neutrale',
        'Medinat Yisrael (Gerusalemme Ovest & Monte Scopus) / Regno Hascemita di Giordania (Gerusalemme Est & Latrun)'
      );
    }
    if (pNid === 'PAL_GAL' || pOrig === 'ILZ' || pName.includes('galilea') || pName.includes('nazareth') || pName.includes('safed') || pName.includes('tiberias') || pName.includes('acre') || pName.includes('acri')) {
      return makeResult(
        'ISR',
        'Stato di Israele — Distretto Settentrionale / Galilea (98% Israele · Testa di Ponte Siriana a Mishmar HaYarden Ancora Attiva)',
        'Al 30 giugno 1949 (98% Israele): con l\'Armistizio israelo-libanese di Ras en-Naqura (23 marzo 1949), Israele evacua i villaggi del Libano meridionale occupati nell\'Operazione Hiram riportando la frontiera sulla linea internazionale mandataria. Eccezione critica sul fronte siriano: poiché l\'armistizio con la Siria sarà siglato solo il 20 luglio 1949, al 30 giugno la Siria occupa ancora la testa di ponte di Mishmar HaYarden (ovest del Giordano) e la fascia SE di Tiberiade (al-Hamma / Samakh).',
        'Neutrale',
        'Medinat Yisrael — Fronte Nord (98% Galilea ISR · Testa di Ponte Siriana a Mishmar HaYarden fino al 20 Lug 1949)'
      );
    }
    if (pNid === 'PAL_SAM' || pOrig === 'PSWBK' || pName.includes('samaria') || pName.includes('judea') || pName.includes('giudea') || pName.includes('nablus') || pName.includes('hebron') || pName.includes('west bank')) {
      return makeResult(
        'JOR',
        'Cisgiordania / West Bank (Regno Hascemita di Giordania — Linea Verde del 3 Aprile 1949)',
        'Al 30 giugno 1949: adottata dall\'aprile 1949 la denominazione ufficiale di Regno Hascemita di Giordania, Amman esercita piena amministrazione civile e militare sulla Cisgiordania (entro la Linea Verde dell\'armistizio del 3 aprile 1949, dopo il ritiro iracheno e la cessione a Israele del Piccolo Triangolo/Wadi Ara) e su Gerusalemme Est.',
        'Neutrale',
        'Regno Hascemita di Giordania — Cisgiordania & Gerusalemme Est (Linea Verde 3 Apr 1949)'
      );
    }
    if (pNid === 'PAL_GAZ' || pOrig === 'PSGZA' || pName.includes('gaza') || pName.includes('rafah') || pName.includes('khan')) {
      return makeResult(
        'APG',
        'Striscia di Gaza (Governo di Tutto-Palestina · Amministrazione Militare Egiziana — Linea Verde del 24 Febbraio 1949)',
        'Al 30 giugno 1949 l\'Armistizio israelo-egiziano di Rodi (24 febbraio 1949) delimita definitivamente la Striscia di Gaza lungo la Linea Verde da Rafah a Beit Hanoun, sotto amministrazione militare egiziana ed egida nominale del Governo di Tutto-Palestina (APG).',
        'Neutrale',
        'Governo di Tutto-Palestina (APG) · Amministrazione Militare Egiziana — Striscia di Gaza (Linea Verde 24 Feb 1949)'
      );
    }
  }

  // STEP >= 22 (31 Dicembre 1948): Esiti delle Offensive Israeliane (Dani, Dekel, Yoav, Hiram, Horev), Governo di Tutto-Palestina a Gaza (22 Settembre) & Conferenza di Gerico (1° Dicembre)
  if (s >= 22) {
    if (pNid === 'PAL_JRS' || pOrig === 'ILJM' || pName.includes('jerusalem') || pName.includes('gerusalemme') || pName.includes('al-quds')) {
      return makeResult(
        'ISR',
        'Distretto di Gerusalemme (Linea del Cessate il Fuoco "Sincero" del 30 Novembre 1948: Ovest a Israele · Città Vecchia & Est alla Transgiordania)',
        'Al 31 dicembre 1948 l\'accordo di cessate il fuoco urbano del 30 novembre (Moshe Dayan – Abdullah el-Tell) consolida la partizione della città lungo la Linea Verde: Gerusalemme Ovest e il corridoio verso la costa (espanso da Ramle/Lydda) allo Stato di Israele; Gerusalemme Est e la Città Vecchia alla Transgiordania di Re Abdallah (dopo la Conferenza di Gerico del 1° dicembre 1948).',
        'Neutrale',
        'Medinat Yisrael (Gerusalemme Ovest) / Regno Hashemita di Transgiordania (Gerusalemme Est & Città Vecchia)'
      );
    }
    if (pNid === 'PAL_HFA' || pOrig === 'ILHA' || pName.includes('haifa')) {
      return makeResult(
        'ISR',
        'Stato di Israele — Distretto di Haifa (100% Sovranità Israeliana)',
        'Al 31 dicembre 1948 l\'intero distretto e il porto petrolifero e commerciale di Haifa sono saldamente integrati nello Stato di Israele.',
        'Neutrale',
        'Medinat Yisrael — Distretto di Haifa (100% Israele)'
      );
    }
    if (pNid === 'PAL_TLV' || pOrig === 'ILTA' || pName.includes('tel aviv') || pName.includes('jaffa') || pName.includes('yafa') || pName.includes('giaffa')) {
      return makeResult(
        'ISR',
        'Stato di Israele — Tel Aviv e Giaffa (Capitale Provvisoria — Vigilia Elezioni Knesset)',
        'Al 31 dicembre 1948 Tel Aviv funge da capitale provvisoria del Governo di David Ben-Gurion alla vigilia delle prime elezioni parlamentari per l\'Assemblea Costituente del gennaio 1949.',
        'Neutrale',
        'Medinat Yisrael — Capitale Provvisoria Tel Aviv (PM David Ben-Gurion)'
      );
    }
    if (pNid === 'PAL_LYD' || pOrig === 'ILM' || pName.includes('lydda') || pName.includes('ramle') || pName.includes('sharon') || pName.includes('lod')) {
      return makeResult(
        'ISR',
        'Stato di Israele — Distretto Centrale (Lydda e Ramle Espugnate in Op. Dani · Saliente di Latrun alla Transgiordania)',
        'Al 31 dicembre 1948, a seguito dell\'Operazione Dani (9–18 luglio 1948), l\'IDF controlla quasi tutto il Distretto Centrale incluse Lydda (Lod) e Ramle e l\'aeroporto internazionale; il solo saliente fortificato di Latrun resta presidiato dalla Legione Araba transgiordana.',
        'Neutrale',
        'Medinat Yisrael — Distretto Centrale (Lydda/Ramle ISR · Saliente di Latrun JOR)'
      );
    }
    if (pNid === 'PAL_GAL' || pOrig === 'ILZ' || pName.includes('galilea') || pName.includes('nazareth') || pName.includes('safed') || pName.includes('tiberias') || pName.includes('acre') || pName.includes('acri')) {
      return makeResult(
        'ISR',
        'Stato di Israele — Distretto Settentrionale / Galilea (100% Israele dopo Op. Dekel & Hiram)',
        'Al 31 dicembre 1948, con la conquista di Nazareth (Operazione Dekel, 16 luglio 1948) e l\'offensiva lampo nell\'Alta Galilea (Operazione Hiram, 29–31 ottobre 1948), l\'intero Distretto Settentrionale è sotto controllo militare israeliano (incluso un saliente di sicurezza oltre il confine in alcuni villaggi del Libano meridionale fino all\'armistizio del 1949, mentre la Siria conserva l\'enclave di Mishmar HaYarden fino al luglio 1949).',
        'Neutrale',
        'Medinat Yisrael — Fronte Nord (100% Galilea IDF dopo Op. Hiram, Ott 1948)'
      );
    }
    if (pNid === 'PAL_SAM' || pOrig === 'PSWBK' || pName.includes('samaria') || pName.includes('judea') || pName.includes('giudea') || pName.includes('nablus') || pName.includes('hebron') || pName.includes('west bank')) {
      return makeResult(
        'JOR',
        'Cisgiordania e Gerusalemme Est (Conferenza di Gerico del 1° Dicembre 1948 — Unificazione con la Transgiordania)',
        'Il 1° dicembre 1948 i notabili palestinesi riuniti alla Conferenza di Gerico proclamano Re Abdallah di Transgiordania sovrano della Palestina araba, avviando l\'incorporazione amministrativa della Cisgiordania (Samaria e Giudea, incluse Nablus, Jenin, Hebron, Ramallah, Betlemme, Latrun e Gerusalemme Est) nel Regno Hashemita di Transgiordania (sotto presidio della Legione Araba e del corpo iracheno nel triangolo settentrionale).',
        'Neutrale',
        'Regno Hashemita di Transgiordania — Cisgiordania Unificata (Conferenza di Gerico, 1° Dic 1948)'
      );
    }
    if (pNid === 'PAL_GAZ' || pOrig === 'PSGZZ' || pName.includes('gaza') || pName.includes('ghazzah') || pName.includes('khan yunis') || pName.includes('rafah')) {
      return makeResult(
        'APG',
        'Striscia di Gaza — Governo di Tutto-Palestina (Protettorato Militare Egiziano, 22 Settembre 1948)',
        'Proclamato a Gaza il 22 settembre 1948 sotto protezione militare dell\'Egitto (Presidente Amin al-Husseini, Primo Ministro Ahmed Hilmi Pasha), il Governo di Tutto-Palestina amministra formalmente la Striscia di Gaza ridotta tra Gaza City, Khan Yunis e Rafah (dopo il ritiro egiziano da Majdal e Isdud nell\'Operazione Yoav e sotto la pressione finale israeliana dell\'Operazione Horev al 31 dicembre 1948).',
        'Neutrale',
        'Governo di Tutto-Palestina (Hukumat Umum Filastin) — Protettorato Militare Egiziano di Gaza'
      );
    }
    if (pNid === 'PAL_BEER' || pOrig === 'ILD' || pName.includes('beersheba') || pName.includes('negev') || pName.includes('darom') || pName.includes('aqaba')) {
      return makeResult(
        'ISR',
        'Distretto di Beersheba e Negev (Israele post-Yoav & Horev · Sacca Egiziana di Faluja Assediata; Eilat Non Ancora Raggiunta)',
        'Al 31 dicembre 1948 l\'Operazione Yoav (15–22 ottobre, conquista di Beersheba, Beit Hanoun, Ashdod e Ashkelon) e l\'Operazione Horev in corso dal 22 dicembre (sfondamento su Bir Asluj e Auja al-Hafir fino al Sinai) consegnano a Israele Beersheba e quasi l\'intero Negev; tuttavia la brigata egiziana (con il maggiore Gamal Abdel Nasser) resiste ancora strettamente assediata nella sacca di Faluja (evacuata solo a fine febbraio 1949) e l\'estremità meridionale fino a Umm Rashrash (Eilat) sul Mar Rosso non è ancora sotto controllo israeliano (lo sarà solo con l\'Operazione Uvda nel marzo 1949).',
        'Neutrale',
        'Medinat Yisrael — Fronte Sud / Negev (Beersheba & Auja IDF · Sacca di Faluja EGY · Eilat Non Ancora Presa)'
      );
    }
  }

  // STEP >= 21 (30 Giugno 1948): Fine del Mandato Britannico (14 Maggio 1948), Proclamazione dello Stato di Israele e Linee della Prima Tregua ONU (11 Giugno – 8 Luglio 1948)
  if (s >= 21) {
    // 1. Gerusalemme (PAL_JRS / ILJM): Divisa lungo il fronte urbano (Gerusalemme Ovest e corridoio Burma Road a Israele; Gerusalemme Est e Città Vecchia alla Legione Araba transgiordana)
    if (pNid === 'PAL_JRS' || pOrig === 'ILJM' || pName.includes('jerusalem') || pName.includes('gerusalemme') || pName.includes('al-quds')) {
      return makeResult(
        'ISR',
        'Distretto di Gerusalemme (Fronte Urbano Diviso: Gerusalemme Ovest a Israele via Burma Road · Città Vecchia e Gerusalemme Est alla Transgiordania)',
        'Al 30 giugno 1948 (Prima Tregua ONU, 11 giugno – 8 luglio 1948) Gerusalemme è divisa lungo la linea del fuoco urbano: lo Stato di Israele controlla Gerusalemme Ovest (Città Nuova, Monte Scopus isolato e il corridoio montano rifornito attraverso la pista alternativa della "Burma Road" aperta in giugno a sud di Latrun), mentre la Legione Araba della Transgiordania (Glubb Pasha / Col. Abdullah el-Tell) occupa Gerusalemme Est e l\'intera Città Vecchia (il cui Quartiere Ebraico è capitolato il 28 maggio 1948) oltre a Betlemme.',
        'Neutrale',
        'Medinat Yisrael (Gerusalemme Ovest · Gov. Militare Dov Yosef) / Legione Araba Transgiordana (Gerusalemme Est & Città Vecchia)'
      );
    }
    // 2. Haifa (PAL_HFA / ILHA): 100% Israele
    if (pNid === 'PAL_HFA' || pOrig === 'ILHA' || pName.includes('haifa')) {
      return makeResult(
        'ISR',
        'Stato di Israele — Distretto di Haifa (100% Controllo Israeliano)',
        'Al 30 giugno 1948 l\'intero distretto e il grande porto industriale di Haifa sono al 100% sotto il controllo dello Stato di Israele: la città di Haifa è stata conquistata dalla Brigata Carmeli dell\'Haganah il 21–22 aprile 1948 (Operazione Bi\'ur Hametz), mentre le ultime truppe britanniche del gen. Cunningham si sono imbarcate dall\'enclave portuale il 30 giugno 1948.',
        'Neutrale',
        'Medinat Yisrael — Distretto di Haifa (100% Israele · Porto & Raffinerie di Haifa)'
      );
    }
    // 3. Tel Aviv e Giaffa (PAL_TLV / ILTA): 100% Israele (Capitale provvisoria)
    if (pNid === 'PAL_TLV' || pOrig === 'ILTA' || pName.includes('tel aviv') || pName.includes('jaffa') || pName.includes('yafa') || pName.includes('giaffa')) {
      return makeResult(
        'ISR',
        'Stato di Israele — Tel Aviv e Giaffa (Capitale Provvisoria — Proclamazione del 14 Maggio 1948)',
        'Il 14 maggio 1948 (5 Iyar 5708), al Museo di Tel Aviv, David Ben-Gurion proclama l\'indipendenza dello Stato di Israele (Medinat Yisrael) alla scadenza del Mandato Britannico, con Chaim Weizmann Presidente del Consiglio di Stato Provvisorio. Dopo la resa dell\'enclave araba di Giaffa il 13 maggio 1948, l\'intero distretto di Tel Aviv è al 100% sotto sovranità israeliana (dove il 21–22 giugno si consuma l\'affondamento della nave Altalena dell\'Irgun per unificare tutte le milizie nelle IDF / Tzahal).',
        'Neutrale',
        'Medinat Yisrael — Capitale Provvisoria Tel Aviv (PM David Ben-Gurion · Pres. Chaim Weizmann · IDF / Tzahal)'
      );
    }
    // 4. Distretto Centrale / Pianura di Sharon / Lydda (PAL_LYD / ILM): Israele (escluso saliente arabo di Latrun e città arabe di Lydda/Ramle fino a luglio 1948)
    if (pNid === 'PAL_LYD' || pOrig === 'ILM' || pName.includes('lydda') || pName.includes('ramle') || pName.includes('sharon') || pName.includes('lod')) {
      return makeResult(
        'ISR',
        'Stato di Israele — Distretto Centrale / Pianura di Sharon (Petah Tikva, Rehovot & Burma Road · Saliente di Latrun e Lydda/Ramle Contesi)',
        'Al 30 giugno 1948 (Prima Tregua ONU) lo Stato di Israele controlla l\'intera pianura costiera di Sharon (Petah Tikva, Netanya, Rishon LeZion, Rehovot) e la pista alternativa della "Burma Road" aperta a sud di Latrun per rifornire Gerusalemme, mentre la Legione Araba transgiordana tiene saldamente il saliente fortificato di Latrun (dopo aver respinto gli attacchi israeliani di maggio–giugno) e le città arabe interne di Lydda (Lod) e Ramle restano in mano araba fino all\'Operazione Dani del luglio 1948.',
        'Neutrale',
        'Medinat Yisrael — Central District / Pianura di Sharon (Saliente di Latrun tenuto dalla Legione Araba)'
      );
    }
    // 5. Galilea / Northern District (PAL_GAL / ILZ): Israele su Galilea Orientale, Jezreel e Costa Occidentale; ALA su Galilea Centrale (Nazareth); teste di ponte siriane a Mishmar HaYarden e Samakh
    if (pNid === 'PAL_GAL' || pOrig === 'ILZ' || pName.includes('galilea') || pName.includes('nazareth') || pName.includes('safed') || pName.includes('tiberias') || pName.includes('acre') || pName.includes('acri')) {
      return makeResult(
        'ISR',
        'Stato di Israele — Distretto Settentrionale / Galilea (Galilea Orientale, Jezreel e Acri a Israele · Sacca ALA a Nazareth & Testa di Ponte Siriana a Mishmar HaYarden)',
        'Al 30 giugno 1948 (Prima Tregua ONU) le forze israeliane (Brigate Golani, Carmeli e Yiftach) controllano la Galilea Orientale (Valle di Hula, Tiberiade conquistata il 18 aprile, Safed conquistata l\'11 maggio), la Valle di Jezreel (Afula, Beit She\'an, dopo aver respinto l\'ALA a Mishmar HaEmek) e la fascia costiera della Galilea Occidentale (Acri conquistata il 17 maggio e Nahariya fino a Rosh HaNikra). La Galilea Centrale montuosa (Nazareth, Sakhnin, Tarshiha) resta ancora sotto il controllo dell\'Esercito Arabo di Liberazione (ALA) di Fawzi al-Qawuqji (Nazareth cadrà solo il 16 luglio 1948), mentre l\'Esercito Siriano tiene una testa di ponte a ovest del Giordano a Mishmar HaYarden (espugnata il 10 giugno 1948) e posizioni presso Samakh/Ein Gev.',
        'Neutrale',
        'Medinat Yisrael — Fronte Settentrionale (Galilea Orientale/Costiera ISR · Nazareth ALA · Mishmar HaYarden SYR)'
      );
    }
    // 6. Samaria e Giudea / Cisgiordania (PAL_SAM / PSWBK): Occupazione militare della Transgiordania (Legione Araba + corpo di spedizione iracheno nel triangolo Nablus-Jenin-Tulkarm)
    if (pNid === 'PAL_SAM' || pOrig === 'PSWBK' || pName.includes('samaria') || pName.includes('judea') || pName.includes('giudea') || pName.includes('nablus') || pName.includes('hebron') || pName.includes('west bank')) {
      return makeResult(
        'JOR',
        'Giudea e Samaria / Cisgiordania (Occupazione Militare della Transgiordania & Corpo di Spedizione Iracheno — Prima Tregua ONU)',
        'Al 30 giugno 1948 l\'intera dorsale montuosa della Cisgiordania (Samaria e Giudea: Jenin — dove all\'inizio di giugno è stato respinto l\'attacco israeliano — Nablus, Tulkarm, Qalqilya, Ramallah, Gerico, Betlemme, Hebron, il saliente strategico di Latrun e Gerusalemme Est con la Città Vecchia) è sotto il controllo militare del Regno Hashemita di Transgiordania (Legione Araba di Glubb Pasha) affiancato nel triangolo settentrionale Nablus–Jenin–Tulkarm dal corpo di spedizione del Regno dell\'Iraq.',
        'Neutrale',
        'Regno Hashemita di Transgiordania — Amministrazione Militare della Cisgiordania (Legione Araba & Corpo Iracheno)'
      );
    }
    // 7. Striscia di Gaza e Costa Meridionale (PAL_GAZ / PSGZZ): Occupazione militare del Regno d'Egitto
    if (pNid === 'PAL_GAZ' || pOrig === 'PSGZZ' || pName.includes('gaza') || pName.includes('ghazzah') || pName.includes('khan yunis') || pName.includes('rafah')) {
      return makeResult(
        'EGY',
        'Striscia di Gaza e Costa Meridionale fino a Isdud (Occupazione Militare del Regno d\'Egitto — Prima Tregua ONU)',
        'Entrato in Palestina il 15 maggio 1948 sotto il comando del generale Ahmed Ali al-Mwawi, al 30 giugno 1948 il corpo di spedizione del Regno d\'Egitto controlla l\'intera fascia costiera meridionale da Rafah, Khan Yunis e Gaza fino a Majdal (Ashkelon) e al ponte di Isdud (Ashdod), punto di massima avanzata settentrionale egiziana verso Tel Aviv (non è ancora stato proclamato il Governo di tutta la Palestina, che nascerà solo nel settembre 1948).',
        'Neutrale',
        'Al-Mamlakah al-Miṣriyyah — Amministrazione Militare Egiziana di Gaza e Majdal (Gen. Ahmed Ali al-Mwawi)'
      );
    }
    // 8. Beersheba e Negev (PAL_BEER / ILD): Occupazione militare del Regno d'Egitto (con kibbutz israeliani isolati nel Negev settentrionale)
    if (pNid === 'PAL_BEER' || pOrig === 'ILD' || pName.includes('beersheba') || pName.includes('negev') || pName.includes('darom') || pName.includes('aqaba')) {
      return makeResult(
        'EGY',
        'Distretto di Beersheba e Negev (Occupazione Militare del Regno d\'Egitto & Enclave di Kibbutz Israeliani Assediati)',
        'Al 30 giugno 1948 (Prima Tregua ONU) l\'Esercito del Regno d\'Egitto presidia l\'asse interno del Negev da Auja al-Hafir e Asluj a Beersheba (collegandosi alle forze arabe di Hebron e Betlemme) e controlla la linea trasversale Majdal–Faluja–Beit Jibrin, tagliando fuori e assediando l\'enclave dei kibbutz israeliani del Negev settentrionale (Nir Am, Negba, Revivim, Nirim, difesi dalla Brigata Negev del Palmach); Beersheba e il Negev meridionale fino a Umm Rashrash/Aqaba non sono ancora in mano israeliana.',
        'Neutrale',
        'Al-Mamlakah al-Miṣriyyah — Fronte Egiziano del Negev & Beersheba (Enclave Kibbutz Negev Settentrionale a Israele)'
      );
    }

    return makeResult(
      'ISR',
      'Stato di Israele (Proclamazione del 14 Maggio 1948 & Prima Tregua ONU)',
      'Stato di Israele proclamato a Tel Aviv il 14 maggio 1948 da David Ben-Gurion; al 30 giugno 1948 vige la Prima Tregua ONU della guerra arabo-israeliana.',
      'Neutrale',
      'Medinat Yisrael — Governo Provvisorio (PM David Ben-Gurion · Pres. Chaim Weizmann)'
    );
  }

  const ownerCode = 'UK';
  const factionCode = 'Alleati';
  const prefix = 'Mandato di Palestina';

  // 1. Gerusalemme (PAL_JRS / ILJM)
  if (pNid === 'PAL_JRS' || pOrig === 'ILJM' || pName.includes('jerusalem') || pName.includes('gerusalemme') || pName.includes('al-quds')) {
    const subName = `${prefix} — Distretto di Gerusalemme`;
    const adminEntity = "Jerusalem District · Sede dell'Alto Commissario Britannico (Government House, Armon HaNetziv)";
    let note = '';
    if (s >= 20) {
      note = "Gerusalemme (Risoluzione ONU 181 & Guerra Civile Mandataria) · Il 29 novembre 1947 l'Assemblea Generale dell'ONU approva la Risoluzione 181 per la partizione della Palestina, designando Gerusalemme e Betlemme come Corpus Separatum internazionale. Il 30 novembre scoppia la guerra civile tra l'Haganah/Irgun e le milizie dell'Esercito del Santo Jihad di Abd al-Qadir al-Husseini: incendi al centro commerciale di Mamilla (2 dicembre), cecchinaggio tra quartieri, blocchi ai convogli sulla strada di Bab el-Oued/Sha'ar HaGai e istituzione delle prime zone di sicurezza blindate britanniche ('Bevingrad') mentre Londra prepara il ritiro definitivo del 14 maggio 1948.";
      return makeResult(ownerCode, `${prefix} — Distretto di Gerusalemme (Risoluzione ONU 181 Corpus Separatum & Guerra Civile)`, note, factionCode, "British Mandate for Palestine · Jerusalem District (UN Res. 181 Corpus Separatum · High Commissioner Sir Alan Cunningham)");
    } else if (s >= 19) {
      note = "Gerusalemme · Il 31 agosto 1947 la commissione speciale UNSCOP consegna all'Assemblea Generale dell'ONU il suo rapporto formale raccomandando la spartizione della Palestina e l'istituzione per Gerusalemme e Betlemme di un Corpus Separatum sotto tutela internazionale dell'ONU. Nel settembre 1947 il governo laburista britannico di Clement Attlee e il Segretario alle Colonie Arthur Creech Jones annunciano ufficialmente la decisione di rimettere il mandato e iniziare l'evacuazione militare del contingente britannico.";
      return makeResult(ownerCode, `${prefix} — Distretto di Gerusalemme (UNSCOP Proposta Corpus Separatum)`, note, factionCode, "Jerusalem District · UNSCOP Proposed Corpus Separatum & Sede dell'Alto Commissario Britannico (Sir Alan Cunningham)");
    } else if (s === 0) {
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
    } else if (s >= 20) {
      note = "Haifa (Risoluzione ONU 181 & Massacro della Raffineria, 30 Dicembre 1947) · Assegnata al futuro Stato ebraico dalla Risoluzione ONU 181 del 29 novembre 1947 e principale scalo d'imbarco per l'evacuazione delle truppe britanniche. Il 30 dicembre 1947 un attentato dinamitardo dell'Irgun ai cancelli della raffineria Consolidated Refineries Ltd (CRL) scatena il sanguinoso massacro della raffineria di Haifa e la rappresaglia del Palmach a Balad al-Shaykh.";
    } else if (s >= 19) {
      note = "Haifa · Principale porto in acque profonde e polo di raffinazione della Palestina mandataria (CRL / IPC). Nel luglio 1947 la vicenda della nave di profughi Exodus 1947 respinta al porto di Haifa catalizza l'attenzione mondiale; il rapporto UNSCOP del 31 agosto 1947 propone l'inclusione di Haifa nel futuro Stato ebraico.";
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
    } else if (s >= 20) {
      note = "Tel Aviv e Giaffa (Risoluzione ONU 181 & Scontri di Confine Urbano, Dicembre 1947) · Dopo il voto dell'ONU del 29 novembre 1947 (che assegna Tel Aviv allo Stato ebraico e Giaffa come enclave allo Stato arabo), esplodono quotidiani scontri a fuoco e cecchinaggio lungo la linea di contatto dei quartieri di Manshiya, Hatikva e Abu Kabir tra l'Haganah e i volontari arabi di Hassan Salama.";
    } else if (s >= 19) {
      note = "Tel Aviv e Giaffa · Epicentro politico ed economico dell'Yishuv accanto all'antico porto arabo di Giaffa; nel rapporto di maggioranza UNSCOP (31 agosto 1947) Tel Aviv è assegnata al proposto Stato ebraico e Giaffa designata quale enclave araba alla vigilia del ritiro annunciato britannico (settembre 1947).";
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
    } else if (s >= 20) {
      note = "Galilea (Risoluzione ONU 181 & Guerra Civile — Dicembre 1947) · Dopo l'approvazione della Risoluzione ONU 181 (29 novembre 1947), la Galilea orientale è assegnata al futuro Stato ebraico e quella occidentale (Acri e Nazareth) allo Stato arabo; nell'Alta Galilea e lungo la frontiera siro-libanese iniziano le prime scaramucce intercomunitarie mentre le forze britanniche si concentrano sugli assi di sgombero.";
    } else if (s >= 19) {
      note = "Galilea (Al-Jalil / HaGalil) · Nel piano di spartizione raccomandato dall'UNSCOP (31 agosto 1947), la Galilea orientale è inclusa nello Stato ebraico proposto mentre la Galilea occidentale (Acri e Nazareth) è assegnata allo Stato arabo nel clima di crescente tensione dell'autunno 1947.";
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
    } else if (s >= 20) {
      note = "Samaria e Giudea (Risoluzione ONU 181 & Mobilitazione Araba — Dicembre 1947) · Assegnate allo Stato arabo dalla Risoluzione ONU 181 del 29 novembre 1947; a Nablus, Jenin e Hebron si mobilitano le milizie arabe palestinesi e i primi volontari diretti a bloccare le arterie di collegamento ebraiche tra la costa e Gerusalemme (Gush Etzion e Bab el-Oued).";
    } else if (s >= 19) {
      note = "Samaria e Giudea (Nablus, Jenin e Hebron) · Dorsale montuosa araba interamente assegnata al proposto Stato arabo palestinese dal rapporto di maggioranza UNSCOP (31 agosto 1947) mentre il governo britannico annuncia a settembre l'abbandono del Mandato.";
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
    } else if (s >= 20) {
      note = "Lydda e Sharon (Risoluzione ONU 181 & Guerra dei Convogli — Dicembre 1947) · Dopo la Risoluzione ONU 181 (29 novembre 1947), la piana di Sharon passa sotto vigilanza dell'Haganah mentre attorno ai centri arabi di Lydda e Ramle e alla base RAF Lydda divampano gli attacchi ai convogli ebraici sulla rotabile per Gerusalemme.";
    } else if (s >= 19) {
      note = "Lydda e Ramle (Piana di Sharon) · Snodo ferroviario e scalo aereo internazionale di Lydda; il rapporto UNSCOP (31 agosto 1947) assegna il litorale ebraico di Sharon allo Stato ebraico e le città arabe interne di Lydda e Ramle allo Stato arabo alla vigilia della smobilitazione mandataria.";
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
    } else if (s >= 20) {
      note = "Gaza (Risoluzione ONU 181 & Frontiera Egiziana — Dicembre 1947) · Fascia costiera inclusa nello Stato arabo dalla Risoluzione ONU 181 del 29 novembre 1947; lungo il corridoio verso il Sinai e i vicini insediamenti del Negev occidentale si intensificano gli scontri locali mentre i depositi britannici del campo di Rafah avviano il ripiegamento verso il Canale di Suez.";
    } else if (s >= 19) {
      note = "Gaza (Ghazzah) · Fascia costiera meridionale verso il confine egiziano, inclusa nello Stato arabo palestinese dal piano UNSCOP del 31 agosto 1947 mentre l'amministrazione britannica prepara il disimpegno militare annunciato a settembre 1947.";
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
    } else if (s >= 20) {
      note = "Beersheba e Negev (Risoluzione ONU 181 & Difesa dell'Acquedotto — Dicembre 1947) · La Risoluzione ONU 181 (29 novembre 1947) assegna gli ampi spazi desertici del Negev fino ad Aqaba allo Stato ebraico lasciando Beersheba città allo Stato arabo; nel dicembre 1947 i combattenti arabi attaccano la conduttura idrica e le isolate postazioni del Negev sotto nominale tutela britannica.";
    } else if (s >= 19) {
      note = "Beersheba (Negev) · Nel piano di maggioranza UNSCOP del 31 agosto 1947 gli ampi spazi desertici del Negev fino ad Aqaba sono proposti per lo Stato ebraico, mentre la città beduina di Beersheba resta destinata allo Stato arabo sotto vigilanza mandataria britannica fino al ritiro annunciato a settembre.";
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
  const cleanId = String(ft.id || p.id || p.NUTS_ID || nid || '').toUpperCase().trim();
  const c = ft.__cent || [0, 0];

  if (cleanId === 'RE_REUNION' || cleanId === 'FRY40' || nid === 'RE_REUNION' || nid === 'FRY40' || (p.NAME && p.NAME.includes('Réunion')) || (p.NAME && p.NAME.includes('Reunion'))) {
    return resolveReunion(s);
  }
  if (cleanId === 'SI_HIST_KOPER' || nid === 'SI_HIST_KOPER' || (p.NAME_LATN && p.NAME_LATN.includes('Koper'))) {
    return resolveKoperZoneB(s);
  }
  if (cleanId === 'HR_HIST_BUIE' || nid === 'HR_HIST_BUIE' || (p.NAME_LATN && p.NAME_LATN.includes('Buje'))) {
    return resolveBuieZoneB(s);
  }
  if (
    cleanId === 'TANGER' ||
    nid === 'TANGER' ||
    cntr === 'TANGER' ||
    cntr === 'TANGIER' ||
    nrm === 'tangier' ||
    nrm === 'tanger' ||
    nrm === 'tangeri' ||
    nrm.includes('zone internationale de tanger') ||
    nrm.includes('tangier international zone') ||
    nrm.includes('international zone of tangier') ||
    nrm.includes('zona internazionale di tangeri')
  ) {
    return resolveTangierZone(s);
  }

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

  // Impero d'Etiopia — 12 Divisioni ADM1 (et.json, Focus Geopolitico)
  const ethCandId = String(ft.id || p.id || p.NUTS_ID || p.shapeISO || '').trim().toUpperCase();
  if (p.REGION_KIND === 'ETHIOPIA_PROVINCE' || ETHIOPIA_ADM1_IDS.has(ethCandId)) {
    const resEth = resolveEthiopiaProvince(ft, s);
    if (resEth) return resEth;
  }

  // Siam / Regno di Thailandia — 78 Divisioni ADM1 (th.json, Evoluzione Geostorica Steps 0–22)
  const thCandId = String(ft.id || p.id || p.NUTS_ID || p.shapeISO || '').trim().toUpperCase();
  if (p.REGION_KIND === 'THAILAND_PROVINCE' || THAILAND_ADM1_IDS.has(thCandId)) {
    const resTh = resolveThailandProvince(ft, s);
    if (resTh) return resTh;
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
    fidClean === 'LK' ||
    fidClean === 'CEY' ||
    cntr === 'LK' ||
    cntr === 'LKA' ||
    cntr === 'CEY' ||
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
    if (s >= 19) {
      const top = getTop('FRA');
      return makeResult(
        'FRA',
        dzMeta?.historicalName || top.name || p.HISTORICAL_NAME || rawName,
        `${dzMeta?.name || rawName} (${dzMeta?.capital || 'Algérie'}) · Con la promulgazione dello Statut Organique de l'Algérie (20 settembre 1947), i tre dipartimenti algerini e i Territori del Sud sono retti nell'ambito della Quarta Repubblica e dell'Union Française tramite l'Assemblea Algerina paritaria sotto il Governatore Generale Yves Chataigneau.`,
        'Alleati',
        "Quatrième République (Union Française) — Gouvernement Général de l'Algérie (Alger · Yves Chataigneau)"
      );
    }
    const owner = s >= 11 ? 'FRA' : s >= 6 ? 'VIC_NAF' : 'F_NAF';
    const top = getTop(owner);
    const faction = s >= 11 ? 'Alleati' : s >= 6 ? 'Fantoccio' : 'Alleati';
    const defaultAdmin = s >= 11
      ? 'Algérie française — Commandement en Chef Français Civil et Militaire (Amiral François Darlan / Général Henri Giraud)'
      : s >= 6
      ? 'Algérie française — Régime de Vichy (Yves Châtel / Maxime Weygand)'
      : 'Algérie française — Gouvernement Général de l\'Algérie (Georges Le Beau)';
    const noteSuffix = s >= 11
      ? ' A seguito dell\'Operazione Torch (8-10 novembre 1942) e del cessate il fuoco dell\'Ammiraglio Darlan, l\'Algeria si schiera a fianco degli Alleati come base strategica del Commandement en Chef Français Civil et Militaire.'
      : '';
    return makeResult(
      owner,
      dzMeta?.historicalName || top.name || p.HISTORICAL_NAME || rawName,
      (dzMeta?.note || top.note || p.HISTORICAL_NOTE || 'Départements français d\'Algérie et Territoires du Sud') + noteSuffix,
      faction,
      s >= 11 ? defaultAdmin : (dzMeta?.adminTitle || top.adminTitle || p.ADMIN_TITLE || defaultAdmin)
    );
  }

  // Protectorat français au Maroc (9 Régions et Territoires 1936-1940)
  const isMoroccoFranceProv =
    !['ES_RIF', 'TANGER', 'ES_IFNI'].includes(String(ft.id || '')) &&
    !['ES_RIF', 'TANGER', 'ES_IFNI'].includes(String(p.CNTR_ID || '')) &&
    !['ES_RIF', 'TANGER', 'ES_IFNI'].includes(String(nid || '')) &&
    (
      p.REGION_KIND === 'MOROCCO_PROVINCE' ||
      (ft.id && (MOROCCO_PROVINCES_META as any)?.[ft.id]) ||
      (nid && (MOROCCO_PROVINCES_META as any)?.[nid]) ||
      ((cntr === 'MA' || cntr === 'MAR') && (String(ft.id || '').startsWith('MA') || nid.startsWith('MA')))
    );

  if (isMoroccoFranceProv) {
    const cleanId = String(ft.id || nid || '').replace(/^MA_/, 'MA').toUpperCase();
    const maMeta = (MOROCCO_PROVINCES_META as any)?.[cleanId];
    if (s >= 19) {
      const top = getTop('FRA');
      return makeResult(
        'FRA',
        maMeta?.historicalName || top.name || p.HISTORICAL_NAME || rawName,
        `${maMeta?.name || rawName} (${maMeta?.capital || 'Maroc'}) · Protettorato francese del Marocco nella Quarta Repubblica e nell'Union Française: dopo lo storico Discorso di Tangeri del Sultano Mohammed V (10 aprile 1947) a favore dell'indipendenza e dell'unità nazionale, Parigi nomina il Generale Alphonse Juin nuovo Résident Général a Rabat (maggio 1947).`,
        'Alleati',
        'Quatrième République (Union Française) — Résidence Générale au Maroc (Rabat · Gén. Alphonse Juin)'
      );
    }
    const owner = s >= 11 ? 'FRA' : s >= 6 ? 'VIC_NAF' : 'F_NAF';
    const top = getTop(owner);
    const faction = s >= 11 ? 'Alleati' : s >= 6 ? 'Fantoccio' : 'Alleati';
    const defaultAdmin = s >= 11
      ? 'Protectorat français au Maroc — Commandement en Chef Français Civil et Militaire (Général Charles Noguès)'
      : s >= 6
      ? 'Protectorat français au Maroc — Régime de Vichy (Général Charles Noguès)'
      : 'Protectorat français au Maroc — Résidence Générale de la République Française (Général Charles Noguès)';
    const noteSuffix = s >= 11
      ? ' Dopo lo sbarco alleato in Marocco (Operazione Torch, 8-11 novembre 1942 a Casablanca, Safi e Port-Lyautey) e il cessate il fuoco negoziato con il Gen. Patton e l\'Amm. Darlan, il Marocco francese si unisce allo sforzo bellico degli Alleati.'
      : '';
    return makeResult(
      owner,
      maMeta?.historicalName || top.name || p.HISTORICAL_NAME || rawName,
      (maMeta?.note || top.note || p.HISTORICAL_NOTE || 'Protectorat français au Maroc') + noteSuffix,
      faction,
      s >= 11 ? defaultAdmin : (maMeta?.adminTitle || top.adminTitle || p.ADMIN_TITLE || defaultAdmin)
    );
  }

  // Protectorat français de Tunisie (24 Gouvernorats et Territoires du Sud 1936-1940)
  const isTunisiaProv =
    p.REGION_KIND === 'TUNISIA_PROVINCE' ||
    ft.id === 'HB_TUNISIA' ||
    nid === 'HB_TUNISIA' ||
    (ft.id && (TUNISIA_PROVINCES_META as any)?.[ft.id]) ||
    (nid && (TUNISIA_PROVINCES_META as any)?.[nid]) ||
    ((cntr === 'TN' || cntr === 'TUN') && (String(ft.id || '').startsWith('TN') || nid.startsWith('TN') || nid.includes('TUNIS')));

  if (isTunisiaProv) {
    const cleanId = String(ft.id || nid || '').replace(/^TN_/, 'TN').toUpperCase();
    const tnMeta = (TUNISIA_PROVINCES_META as any)?.[cleanId];
    if (s >= 19) {
      return makeResult(
        'FRA',
        tnMeta?.historicalName || 'Protectorat français de Tunisie (Union Française — Tunisi)',
        `${tnMeta?.name || rawName} (${tnMeta?.capital || 'Tunisie'}) · Protettorato francese di Tunisia sotto la Quarta Repubblica (Union Française), retto da Lamine Bey e dal nuovo Résident Général Jean Mons (nominato nel febbraio 1947), mentre crescono le rivendicazioni nazionali del Neo-Destour e del sindacato UGTT.`,
        'Alleati',
        'Quatrième République (Union Française) — Résidence Générale en Tunisie (Tunis · Jean Mons & Lamine Bey)'
      );
    }
    if (s >= 12) {
      return makeResult(
        'F_NAF',
        tnMeta?.historicalName || 'Protectorat français de Tunisie (Liberazione Alleata — Resa di Capo Bon)',
        (tnMeta?.note || 'Protectorat français de Tunisie') + ' A metà maggio 1943 la sacca dell\'Asse di Biserta, Tunisi e Capo Bon è stata interamente eliminata dalle forze alleate; l\'intero litorale nordafricano è sotto pieno controllo alleato (CFLN).',
        'Alleati',
        'Protectorat français de Tunisie — Comité Français de la Libération Nationale (CFLN / Henri Giraud & Charles de Gaulle)'
      );
    }
    const owner = s >= 11 ? 'GER' : s >= 6 ? 'VIC_NAF' : 'F_NAF';
    const top = getTop(owner);
    const faction = s >= 11 ? 'Asse' : s >= 6 ? 'Fantoccio' : 'Alleati';
    const defaultAdmin = s >= 11
      ? 'Tunisie occupée — Testa di ponte dell\'Asse (XC. Armeekorps / Generalleutnant Walther Nehring — 5. Panzerarmee)'
      : s >= 6
      ? 'Protectorat français de Tunisie — Régime de Vichy (Marcel Peyrouton / Amiral Jean-Pierre Esteva)'
      : 'Protectorat français de Tunisie — Résidence Générale de la République Française (Armand Guillon / Eirik Labonne)';
    const noteSuffix = s >= 11
      ? ' Occupazione italo-tedesca di Biserta e Tunisi a metà novembre 1942 per creare la testa di ponte dell\'Asse in Nordafrica dopo lo sbarco alleato in Algeria e Marocco (Operazione Torch).'
      : '';
    return makeResult(
      owner,
      tnMeta?.historicalName || (s >= 11 ? 'Tunisie occupée — Testa di ponte dell\'Asse (Tunis)' : (top.name || p.HISTORICAL_NAME || rawName)),
      (tnMeta?.note || top.note || p.HISTORICAL_NOTE || 'Protectorat français de Tunisie') + noteSuffix,
      faction,
      s >= 11 ? defaultAdmin : (tnMeta?.adminTitle || top.adminTitle || p.ADMIN_TITLE || defaultAdmin)
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
    if (s >= 20) {
      return makeResult(
        'EGY',
        `${egMeta?.historicalName || p.HISTORICAL_NAME || rawName || "Regno d'Egitto"} (Dicembre 1947)`,
        `${egMeta?.name || rawName} (${egMeta?.capital || 'Egitto'}) · Dicembre 1947: il Cairo ospita il vertice della Lega Araba (8–17 dicembre) contro la partizione della Palestina (Ris. ONU 181), mentre dopo lo stallo al Consiglio di Sicurezza ONU persiste il presidio militare britannico nella sola Zona del Canale di Suez e il governo di Mahmoud an-Nukrashi Pasha fronteggia l'ondata di manifestazioni nazionaliste ed islamiste.`,
        'Neutrale',
        "Al-Mamlakah al-Miṣriyyah (Regno d'Egitto — Re Faruq I · P.M. Mahmoud an-Nukrashi Pasha, Dic. 1947)"
      );
    }
    if (s >= 19) {
      return makeResult(
        'EGY',
        egMeta?.historicalName || p.HISTORICAL_NAME || rawName || "Regno d'Egitto",
        `${egMeta?.name || rawName} (${egMeta?.capital || 'Egitto'}) · Regno d'Egitto pienamente sovrano dopo il completamento dello sgombero militare britannico dal Cairo, da Alessandria e dal Delta verso la sola Zona del Canale di Suez (marzo 1947). Nell'estate-settembre 1947 il Primo Ministro Mahmoud an-Nukrashi Pasha porta davanti al Consiglio di Sicurezza dell'ONU la richiesta di evacuazione totale e di unità della Valle del Nilo.`,
        'Neutrale',
        "Al-Mamlakah al-Miṣriyyah (Regno d'Egitto — Re Faruq I · P.M. Mahmoud an-Nukrashi Pasha)"
      );
    }
    if (cleanId === 'EGMT' && s === 7) {
      return makeResult(
        'EGY',
        'Muḥāfaẓat al-Ṣaḥrāʾ al-Gharbiyyah (Mersa Matruh — Fronte di Sidi Barrani)',
        'Operazione E (9-16 settembre 1940): la 10ª Armata italiana del Maresciallo Rodolfo Graziani varca il confine libico-egiziano, occupa Sollum e il Passo di Halfaya e si attesta nei campi trincerati di Sidi Barrani, Maktila e Tummar, fronteggiata a Mersa Matruh dalla Western Desert Force britannica (Gen. Richard O\'Connor).',
        'Alleati',
        'Western Desert Governorate — Frontline of Sidi Barrani & Mersa Matruh (British Middle East Command)'
      );
    }
    if (cleanId === 'EGMT' && s === 10) {
      return makeResult(
        'ITA',
        'Matruh e Marmarica Egiziana Occupata (Mersa Matruh, Sollum, Oasi di Siwa — Fronte di El Alamein)',
        'Massima penetrazione dell\'Asse in Egitto (giugno-agosto 1942): dopo la caduta di Tobruk (21 giugno 1942), la Panzerarmee Afrika del Generalfeldmarschall Erwin Rommel e le divisioni italiane ("Ariete", "Littorio", "Trieste", "Folgore") sfondano a Mersa Matruh (28-29 giugno), occupano l\'Oasi di Siwa (20 luglio) e si arrestano a soli 106 km da Alessandria sulla linea fortificata di El Alamein tra il Mediterraneo e la Depressione di Qattara (Prima Battaglia di El Alamein, 1-27 luglio; Battaglia di Alam el Halfa, 30-31 agosto 1942).',
        'Asse',
        'Panzerarmee Afrika (Generalfeldmarschall Erwin Rommel) & Delegazione Comando Supremo in Africa Settentrionale'
      );
    }
    if (cleanId === 'EGMT' && s >= 11) {
      return makeResult(
        'EGY',
        'Muḥāfaẓat al-Ṣaḥrāʾ al-Gharbiyyah (Mersa Matruh e Frontiera Marmarica Liberata)',
        'Riconquista alleata della Marmarica (novembre 1942): a seguito dello sfondamento ad El Alamein (Operazione Supercharge, 2-4 novembre 1942), l\'8ª Armata britannica del Generale Montgomery riconquista Mersa Matruh (11 novembre), Sollum e il Passo di Halfaya, cacciando definitivamente le forze italo-tedesche dal territorio egiziano e inseguendole in Cirenaica.',
        'Alleati',
        'Western Desert Governorate — Liberated Egyptian Territory (British Eighth Army & Middle East Command)'
      );
    }
    if (cleanId === 'EGMT' && s === 9) {
      return makeResult(
        'EGY',
        'Muḥāfaẓat al-Ṣaḥrāʾ al-Gharbiyyah (Mersa Matruh e Sollum — Retrovia dell\'Operazione Crusader)',
        'Operazione Crusader (novembre-dicembre 1941): dal capolinea ferroviario di Mersa Matruh e attraverso il confine di Sollum-Halfaya, l\'8ª Armata britannica (Gen. Alan Cunningham / Gen. Neil Ritchie) lancia l\'offensiva che sblocca Tobruk e respinge Rommel fino a El Agheila.',
        'Alleati',
        'Western Desert Governorate — British 8th Army Rear & Supply Base (Mersa Matruh)'
      );
    }
    if (cleanId === 'EGMT' && s === 8) {
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

    // Caso 1: Porto e Insediamento di Aden (YEAD) - Porto del Raj (1936) vs Colonia della Corona (1937-1947)
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
      if (s >= 20) {
        return makeResult(
          'UK',
          'Colonia di Aden (Stato di Emergenza — Disordini del Dicembre 1947)',
          "Dicembre 1947: il 2–4 dicembre 1947, in seguito alla Risoluzione ONU 181 sulla spartizione della Palestina, ad Aden esplodono violenti disordini anti-ebraici nel quartiere di Crater; il Governatore Sir Reginald Champion dichiara lo stato di emergenza schierando le Aden Protectorate Levies e truppe imperiali britanniche a tutela dello scalo strategico sul Mar Rosso.",
          'Alleati',
          'British Crown Colony of Aden (Gov. Sir Reginald Champion — Stato di Emergenza Dic. 1947)'
        );
      }
      if (s >= 19) {
        return makeResult(
          'UK',
          'Colonia di Aden (Crown Colony of Aden — 1947)',
          "Settembre 1947: Colonia della Corona britannica diretta dal Governatore Sir Reginald Champion (Colonial Office); vitale stazione navale, carbonifera e petrolifera (BP / Royal Navy) all'imbocco meridionale del Mar Rosso lungo le rotte imperiali verso il Golfo Persico e l'Asia.",
          'Alleati',
          'British Crown Colony of Aden (Gov. Sir Reginald Champion — Colonial Office)'
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

    // Caso 2: Protettorato di Aden (7 Governatorati — WAP / EAP)
    if (yeMeta?.entityKind === 'ADEN_PROTECTORATE') {
      if (s >= 19) {
        return makeResult(
          'UK',
          `${yeMeta?.historicalName || p.HISTORICAL_NAME || rawName}${s >= 20 ? ' (Dic. 1947)' : ''}`,
          s >= 20
            ? `${yeMeta?.name || rawName} · Dicembre 1947: sultanati ed emirati del Protettorato Britannico di Aden (WAP/EAP — Lahej, Mukalla/Qu'aiti, Kathiri, Mahra e Socotra) sotto vigilanza delle Aden Protectorate Levies durante i moti di dicembre 1947 e le pressioni di confine dell'Imamato yemenita.`
            : `${yeMeta?.name || rawName} · Protettorato Britannico di Aden (Western/Eastern Aden Protectorate) nel dopoguerra 1947: trattati esclusivi di protezione con i sultanati arabi meridionali e difesa strategica dello stretto di Bab el-Mandeb e dell'Hadhramaut.`,
          'Alleati',
          yeMeta?.adminTitle || 'British Aden Protectorate (WAP / EAP — Colonial Office)'
        );
      }
      return makeResult(
        'UK',
        yeMeta?.historicalName || p.HISTORICAL_NAME || rawName,
        yeMeta?.note || p.HISTORICAL_NOTE || 'Protettorato britannico di Aden',
        'Alleati',
        yeMeta?.adminTitle || p.ADMIN_TITLE || 'British Aden Protectorate'
      );
    }

    // Caso 3: Regno Mutawakkilita dello Yemen (14 Governatorati)
    if (s >= 20) {
      return makeResult(
        'YEM',
        `${yeMeta?.historicalName || p.HISTORICAL_NAME || rawName} (Dicembre 1947)`,
        `${yeMeta?.name || rawName} · Dicembre 1947: membro sovrano delle Nazioni Unite dal 30 settembre 1947 e della Lega Araba, il Regno Mutawakkilita dello Yemen sotto l'anziano Imam Yahya Muhammad Hamid ed-Din condanna la spartizione della Palestina al vertice del Cairo mentre a Sana'a si acuisce la crisi dinastica preludio ai moti costituzionalisti di Al-Waziri.`,
        'Neutrale',
        "Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah (Imam Yahya — Sana'a, Dic. 1947)"
      );
    }
    if (s >= 19) {
      return makeResult(
        'YEM',
        `${yeMeta?.historicalName || p.HISTORICAL_NAME || rawName} (Ammissione ONU, Set. 1947)`,
        `${yeMeta?.name || rawName} · Settembre 1947: il Regno Mutawakkilita dello Yemen — guidato dall'Imam Yahya Muhammad Hamid ed-Din — viene ammesso alle Nazioni Unite il 30 settembre 1947 confermando lo status internazionale di Stato arabo sovrano.`,
        'Neutrale',
        "Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah (Imam Yahya — Membro ONU)"
      );
    }
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
    if (s >= 22) {
      return makeResult(
        'SMR',
        'Serenissima Repubblica di San Marino',
        'Dicembre 1948 – Giugno 1949: confermata alle elezioni del 27 febbraio 1949 la coalizione socialcomunista (Comitato della Libertà, Segretario agli Esteri Gino Giacomini) nel clima della Guerra Fredda italiana; avviata la vertenza per i danni del bombardamento del 1944 e la questione del Casinò con Roma.',
        'Neutrale',
        'Serenissima Repubblica di San Marino (Reggenza — Comitato della Libertà)'
      );
    }
    if (s >= 19) {
      return makeResult(
        'SMR',
        'Serenissima Repubblica di San Marino',
        '1947 – Giugno 1948: ricostruzione civile sul Monte Titano sotto il governo socialcomunista del Comitato della Libertà (PSS–PCS), consolidamento delle convenzioni monetarie e doganali con la Repubblica Italiana e ripristino delle ferrovie e infrastrutture.',
        'Neutrale',
        'Serenissima Repubblica di San Marino (Comitato della Libertà)'
      );
    }
    if (s === 18) {
      return makeResult(
        'SMR',
        'Serenissima Repubblica di San Marino',
        'Settembre 1945: cessato il transito delle truppe alleate dopo aver ospitato oltre 100.000 sfollati lungo la Linea Gotica (1944), San Marino avvia la ricostruzione e chiede al Regno Unito l\'indennizzo per il bombardamento del 26 giugno 1944.',
        'Neutrale',
        'Serenissima Repubblica di San Marino (Governo di Coalizione)'
      );
    }
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
    if (s >= 21) {
      return makeResult(
        'VAT',
        'Stato della Città del Vaticano',
        s >= 23
          ? 'Giugno 1949: sotto Papa Pio XII, la Santa Sede condanna i processi religiosi oltre la Cortina di Ferro (caso del card. József Mindszenty in Ungheria), prepara il Decreto del Sant\'Uffizio contro il Comunismo (1° luglio 1949) e organizza il Giubileo dell\'Anno Santo 1950.'
          : 'Giugno – Dicembre 1948: all\'indomani delle elezioni italiane del 18 aprile 1948, Papa Pio XII guida la linea diplomatica anticomunista della Santa Sede in Europa e denuncia le persecuzioni contro la Chiesa cattolica nei paesi del blocco orientale.',
        'Neutrale',
        'Stato della Città del Vaticano (Papa Pio XII)'
      );
    }
    if (s >= 18) {
      return makeResult(
        'VAT',
        'Stato della Città del Vaticano',
        s >= 19
          ? '1947: intenso impegno assistenziale della Pontificia Commissione di Assistenza nella ricostruzione europea; i Patti Lateranensi (1929) vengono recepiti nell\'Articolo 7 della nuova Costituzione della Repubblica Italiana (marzo–dicembre 1947).'
          : 'Settembre 1945: la Santa Sede di Papa Pio XII coordina gli aiuti umanitari postbellici europei (Pontificia Commissione di Assistenza) e la ricerca dei prigionieri e profughi attraverso l\'Ufficio Informazioni Vaticano.',
        'Neutrale',
        'Stato della Città del Vaticano (Papa Pio XII)'
      );
    }
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
    if (s >= 21) {
      return makeResult(
        'GIB',
        'Gibraltar (Crown Colony)',
        s >= 23
          ? 'Giugno 1949: completato in larga parte il rimpatrio della popolazione civile sfollata e avviata su spinta dell\'AACR (Joshua Hassan) la riforma per il futuro Consiglio Legislativo; la piazzaforte aeronavale presidia lo Stretto come cardine della neonata Alleanza Atlantica (NATO, 4 aprile 1949).'
          : 'Giugno – Dicembre 1948: prosegue il rientro graduale dei gibilterriani sfollati e si prepara l\'istituzione del primo Consiglio Legislativo (annunciata 1948); la base della Royal Navy rafforza la proiezione marittima del Patto di Bruxelles nel Mediterraneo occidentale.',
        'Alleati',
        s >= 23
          ? 'British Empire — Crown Colony of Gibraltar (NATO / Attlee Era)'
          : 'British Empire — Crown Colony of Gibraltar (Attlee Era)'
      );
    }
    if (s >= 19) {
      return makeResult(
        'GIB',
        'Gibraltar (Crown Colony)',
        'Gibraltar — Colonia della Corona britannica sullo Stretto (1947: rimpatrio degli sfollati civili dall\'Irlanda del Nord/Gran Bretagna, sviluppo politico dell\'AACR & base Royal Navy postbellica).',
        'Alleati',
        'British Empire — Crown Colony of Gibraltar (Attlee Era)'
      );
    }
    if (s >= 18) {
      return makeResult(
        'GIB',
        'Gibraltar (Crown Colony)',
        'Gibraltar — Smobilitazione postbellica della fortezza dopo VE Day e prime ondate di rimpatrio dei civili.',
        'Alleati',
        'British Empire — Crown Colony of Gibraltar'
      );
    }
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
    if (s >= 21) {
      return makeResult(
        'AND',
        'Principato d\'Andorra',
        '1948 – Giugno 1949: coprincipato neutrale pirenaico retto congiuntamente dal Vescovo di Urgell (Ramon Iglesias i Navarri) e dal Presidente francese Vincent Auriol, con il Sìndic General Francesc Cairat. Superato l\'isolamento bellico, espansione idroelettrica (FHASA), Radio Andorra e decollo commerciale transfrontaliero tra Francia e Spagna.',
        'Neutrale',
        'Principat d\'Andorra (Vescovo R. Iglesias & Pres. V. Auriol)'
      );
    }
    if (s >= 18) {
      return makeResult(
        'AND',
        'Principato d\'Andorra',
        s >= 19
          ? '1947: ripresa economica e commerciale nei Pirenei sotto i Coprincipi Ramon Iglesias i Navarri e il nuovo Presidente della IV Repubblica francese Vincent Auriol, con sviluppo dei trasporti montani e dell\'attività idroelettrica.'
          : 'Settembre 1945: normalizzazione postbellica delle frontiere con la Francia liberata dopo l\'evacuazione del distaccamento tedesco di frontiera; riprende il traffico civile pirenaico sotto il Vescovo Iglesias e il Sìndic Francesc Cairat.',
        'Neutrale',
        'Principat d\'Andorra (Coprincipato Sovrano Neutrale)'
      );
    }
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

  // Principato di Monaco (MCO) - Principato sovrano della Costa Azzurra
  const isMonaco =
    ft.id === 'MCO_HIST' ||
    ft.__kind === 'MONACO' ||
    cntr === 'MC' ||
    cntr === 'MCO' ||
    nid === 'MC' ||
    nid === 'MCO' ||
    nid === 'MCO_HIST' ||
    nrm === 'monaco' ||
    nrm === 'principato di monaco' ||
    nrm === 'principaute de monaco' ||
    nrm === 'principauté de monaco' ||
    nrm === 'principality of monaco';

  if (isMonaco) {
    const ownerCode = s >= 16 ? 'MCO' : s >= 13 ? 'GER' : s >= 11 ? 'ITA' : 'MCO';
    const top = getExtendedToponym(rawName || 'Monaco', ownerCode, nid || 'MCO_HIST', [7.4233, 43.7367], s);
    const monacoName =
      s >= 23
        ? 'Principauté de Monaco (Règne du Prince Rainier III)'
        : s >= 18
        ? 'Principauté de Monaco (Souveraineté Restaurée)'
        : s >= 16
        ? top.name?.includes('Libérée')
          ? top.name
          : 'Principauté de Monaco (Libérée — Restauration Souveraine)'
        : top.name || 'Principauté de Monaco';
    const monacoFac: FactionType = s >= 18 ? 'Neutrale' : s >= 16 ? 'Alleati' : s >= 11 ? 'Asse' : 'Neutrale';
    const monacoNote =
      s >= 23
        ? 'Giugno 1949: il 9 maggio 1949 si spegne l\'anziano Principe Luigi II e sale al trono il nipote Principe Ranieri III (Rainier III Grimaldi), dando impulso al rinnovamento economico, urbanistico e doganale del Principato in associazione con la Francia.'
        : s >= 21
        ? '1948 – Dicembre 1948: ultimi mesi di regno del Principe Luigi II sotto il governo di Pierre de Witasse; convenzioni fiscali e doganali postbelliche con la IV Repubblica francese.'
        : s >= 19
        ? '1947: ricostruzione postbellica e rilancio turistico-finanziario di Monte-Carlo nel quadro dell\'unione doganale e monetaria con la Francia.'
        : s >= 18
        ? 'Settembre 1945: consolidata la sovranità costituzionale dopo la liberazione del 3 settembre 1944; il Principe Luigi II normalizza l\'amministrazione monegasca (Ministro di Stato Pierre de Witasse).'
        : s >= 16
        ? 'Il 3 settembre 1944 le truppe alleate liberano il Principato di Monaco dall\'occupazione tedesca; il Principe Luigi II riassume la sovranità costituzionale.'
        : s >= 13
        ? 'Operazione Achse (settembre 1943): all\'indomani dell\'armistizio italiano, le truppe tedesche della Wehrmacht occupano il Principato di Monaco, subentrando alle autorità d\'occupazione del Regio Esercito.'
        : s >= 11
        ? 'Operazione Anton (novembre 1942): truppe italiane occupano il Principato di Monaco.'
        : 'Antico principato sovrano retto dalla dinastia Grimaldi.';
    return makeResult(
      ownerCode,
      monacoName,
      top.note || monacoNote,
      monacoFac,
      top.adminTitle || (s >= 23 ? 'Principauté de Monaco — Prince Rainier III' : 'Principauté de Monaco')
    );
  }

  // Islanda (IS001 Höfuðborgarsvæði, IS002 Landsbyggð, ICE, ISL)
  const isIcelandFeature =
    cleanId === 'IS001' ||
    cleanId === 'IS002' ||
    nid === 'IS001' ||
    nid === 'IS002' ||
    cntr === 'IS' ||
    cntr === 'ISL' ||
    cntr === 'ICE' ||
    nrm === 'iceland' ||
    nrm === 'islanda' ||
    nrm === 'island' ||
    nrm === 'höfuðborgarsvæði' ||
    nrm === 'hofudborgarsvaedi' ||
    nrm === 'landsbyggð' ||
    nrm === 'landsbyggd';

  if (isIcelandFeature) {
    return resolveIceland(s, nid || cleanId, rawName);
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
    if (s >= 9) {
      const ukMan = resolveUKProvince('IM', s, rawName);
      if (ukMan) return ukMan;
    }
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
    const chKey = (nrm.includes('jersey') || nid.startsWith('JE') || cntr.startsWith('JE')) ? 'JE' : 'GG';
    const ukCh = resolveUKProvince(chKey, s, rawName);
    if (s >= 6 && s < 18) {
      const gerTop = getTop('GER');
      return makeResult(
        'GER',
        ukCh ? ukCh.name : (gerTop.name || 'Kanalinseln (Deutsche Besetzung)'),
        ukCh ? ukCh.note : (gerTop.note || 'Occupazione militare tedesca delle Isole del Canale (giugno/luglio 1940), unici territori britannici occupati dal Terzo Reich.'),
        'Asse',
        ukCh?.adminEntity || gerTop.adminTitle || 'Befehlshaber der Kanalinseln (Militärverwaltung)'
      );
    }
    if (ukCh) {
      return makeResult('UK', ukCh.name, ukCh.note, s >= 4 ? 'Alleati' : 'Neutrale', ukCh.adminEntity);
    }
    const ukTop = getTop('UK');
    return makeResult(
      'UK',
      ukTop.name || (chKey === 'JE' ? 'Bailiwick of Jersey (Saint Helier)' : 'Bailiwick of Guernsey (Saint Peter Port)'),
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
    if (s >= 19) {
      return makeResult(
        'FRA',
        'Guyane Française (Département d\'Outre-Mer — Quatrième République, Loi 1946)',
        'Con la Loi de départementalisation del 19 marzo 1946, la Guyane Française cessa lo status coloniale e diviene ufficialmente Département d\'Outre-Mer (DOM 973) della Quarta Repubblica nell\'Union Française.',
        'Alleati',
        'Quatrième République (Union Française) — Département d\'Outre-Mer de la Guyane Française (Cayenne)'
      );
    }
    if (s >= 18) {
      return makeResult(
        'FRA',
        'Guyane française (GPRF — Smantellamento del Bagne de Cayenne, 1945)',
        'Settembre 1945: sotto il Governo Provvisorio della Repubblica Francese (GPRF), si avvia la soppressione definitiva dell\'antico bagno penale della Guyana verso lo status di dipartimento d\'oltremare.',
        'Alleati',
        'Gouvernement Provisoire de la République Française (GPRF) — Guyane française'
      );
    }
    if (s >= 12) {
      return makeResult(
        'FRA',
        'Guyane française (Ralliement CFLN — Comité de Salut Public de Cayenne, Marzo 1943)',
        'Nel marzo 1943 il Comité de Salut Public di Cayenne depone il governatore pétainista René Veber e sancisce il ralliement al generale Giraud e de Gaulle (CFLN), liberando i detenuti politici e unendosi agli Alleati.',
        'Alleati',
        'Comité Français de Libération Nationale (CFLN) — Colonie de la Guyane française'
      );
    }
    return s < 6
      ? makeResult('F_COL', 'Guyane française (Cayenne)', 'Colonie de Guyane (France)', 'Alleati', 'Colonie de Guyane — Chef-lieu Cayenne')
      : makeResult('VIC_COL', 'Guyane française (Cayenne — Régime de Vichy)', 'Administration coloniale de Vichy — Gouverneur René Veber', 'Fantoccio', 'Colonie de Guyane — Gouverneur René Veber');
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
      s >= 10
        ? 'Dichiarazione di guerra del Messico alle Potenze dell\'Asse (22 maggio 1942): dopo il siluramento delle petroliere messicane Potrero del Llano e Faja de Oro ad opera degli U-Boot tedeschi nel Golfo del Messico, il Presidente Manuel Ávila Camacho schiera il Messico con gli Alleati.'
        : topMex.note || 'Stati Uniti Messicani (Presidenza di Lázaro Cárdenas)',
      s >= 10 ? 'Alleati' : 'Neutrale',
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
  if ((cntr === 'CN_PROV' || nid.startsWith('CHN_') || p.REGION_KIND === 'CHINA_PROVINCE') && nid !== 'JP_KANTO_SHU' && fidClean !== 'JP_KANTO_SHU') {
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
    if (s >= 16) {
      return makeResult(
        'SOV',
        'Tuvinskaya Avtonomnaya Oblast (Tuva — SSSR)',
        'L\'11 ottobre 1944 il Presidium del Soviet Supremo accoglie la richiesta della Piccola Khural di Tuva: la Repubblica Popolare di Tannu Tuva viene formalmente annessa all\'Unione Sovietica (RSFSR) come Oblast\' Autonoma di Tuva (Tuvinskaya AO con capoluogo Kyzyl).',
        'Comintern',
        'SSSR — RSFSR (Tuvinskaya Avtonomnaya Oblast, Kyzyl)'
      );
    }
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
        if (s >= 16) {
          return makeResult(
            'SOV',
            'Tuvinskaya Avtonomnaya Oblast (Tuva — SSSR)',
            'L\'11 ottobre 1944 il Presidium del Soviet Supremo accoglie la richiesta della Piccola Khural di Tuva: la Repubblica Popolare di Tannu Tuva viene formalmente annessa all\'Unione Sovietica (RSFSR) come Oblast\' Autonoma di Tuva (Tuvinskaya AO con capoluogo Kyzyl).',
            'Comintern',
            'SSSR — RSFSR (Tuvinskaya Avtonomnaya Oblast, Kyzyl)'
          );
        }
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
      const isViipuri = nid.includes('VIIPURI') || nid.includes('259') || nrm.includes('viipuri') || nrm.includes('vyborg');
      const histName = p.HISTORICAL_NAME || p.NUTS_NAME || rawName;
      const sovName = p.SOV_NAME || (histName + ' (URSS)');

      if (s >= 16) {
        return makeResult(
          'SOV',
          isPetsamo
            ? s >= 20
              ? 'Pečenga / Petsamo (Oblast\' di Murmansk — Nichel & Artico, Dic. 1947)'
              : s >= 19
              ? 'Pečenga / Petsamo (Oblast\' di Murmansk — Trattato di Parigi 1947)'
              : 'Pechenga / Petsamo (Murmanskaya oblast — URSS)'
            : s >= 20
            ? `${sovName} (URSS — Dic. 1947)`
            : `${sovName}`,
          s >= 20
            ? isPetsamo
              ? 'Dicembre 1947: il Kombinat Pechenganikel (Nikel\'-Zapolyarny) nell\'ex Petsamo opera a pieno ritmo sotto l\'Oblast\' di Murmansk (RSFSR) insieme alle difese artiche sul Mare di Barents.'
              : 'Dicembre 1947: ratificata dal Trattato di Parigi del 1947, l\'ex fascia finlandese (Istmo Careliano nell\'Oblast\' di Leningrado; Ladoga e Salla nella RSS Carelo-Finlandese) accoglie nuovi coloni sovietici e adotta la riforma del rublo.'
            : s >= 19
            ? 'Settembre 1947: Trattato di Pace di Parigi (10 febbraio 1947) conferma de jure le frontiere dell\'Armistizio di Mosca; ricostruzione industriale e forestale di Vyborg, Sortavala e Pečenga.'
            : 'Armistizio di Mosca (19 settembre 1944): cessione definitiva alla Sovranità Sovietica (Carelia / Salla / Petsamo).',
          'Comintern',
          isPetsamo ? 'SSSR — Murmanskaya oblast (Pečenga)' : 'SSSR — Karelo-Finskaya SSR / Leningradskaya oblast'
        );
      }

      if (s >= 14 && isViipuri) {
        return makeResult(
          'SOV',
          `${sovName} — Vyborg (Offensiva di Carelia, 20 Giugno 1944)`,
          '20 giugno 1944: nell\'offensiva Vyborg-Petrozavodsk l\'Armata Rossa espugna Viipuri (Vyborg) respingendo l\'esercito finlandese sulla linea d\'arresto VKT (Viipuri-Kuparsaari-Taipale).',
          'Comintern',
          'SSSR — Karelo-Finskaya SSR'
        );
      }

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
      if (s >= 16) {
        return makeResult(
          'SOV',
          s >= 20
            ? 'Pečenga / Petsamo (Oblast\' di Murmansk RSFSR — Dic. 1947)'
            : s >= 19
            ? 'Pečenga / Petsamo (URSS — Trattato di Parigi 1947)'
            : 'Pechenga / Petsamo (URSS — Armistizio di Mosca)',
          s >= 20
            ? 'Dicembre 1947: il distretto di Pečenga (Oblast\' di Murmansk, RSFSR) alimenta la produzione di nichel artico e consolida lo sbocco sovietico sul Mare di Barents libero dai ghiacci.'
            : s >= 19
            ? 'Settembre 1947: il Trattato di Pace di Parigi (1947) sancisce definitivamente la cessione di Petsamo (Pečenga) e del suo giacimento di nichel all\'Unione Sovietica.'
            : 'Armistizio di Mosca (19 settembre 1944): la Finlandia cede il corridoio artico di Petsamo all\'URSS.',
          'Comintern',
          'SSSR — Murmanskaya oblast (Pečenga)'
        );
      }
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
      if (s >= 16 || (s >= 14 && (nrm.includes('viipuri') || nrm.includes('vyborg')))) {
        return makeResult(
          'SOV',
          sovName,
          s >= 16
            ? 'Armistizio di Mosca (19 settembre 1944) e Trattato di Parigi (1947): conferma delle frontiere del 1940 e cessione della Carelia all\'URSS.'
            : '20 giugno 1944: perdita di Viipuri (Vyborg) nell\'offensiva sovietica sull\'Istmo e arretramento finlandese sulla linea VKT.',
          'Comintern',
          'SSSR — Leningradskaya oblast / Karelo-Finskaya SSR'
        );
      }
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
      if (s >= 16) {
        return makeResult(
          'SOV',
          sovName,
          'Armistizio di Mosca (19 settembre 1944): riconferma della cessione del settore di Salla orientale e Alakurtti all\'URSS.',
          'Comintern',
          'SSSR — Murmanskaya oblast / Karelo-Finskaya SSR'
        );
      }
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
      if (s >= 15) {
        return makeResult(
          'SOV',
          `${histName} — Moldavskaya SSR (Basarabia Liberata)`,
          'Offensiva Iași-Chișinău (agosto 1944): l\'Armata Rossa libera la Bessarabia dall\'occupazione dell\'Asse, reintegrandola come Repubblica Socialista Sovietica Moldava.',
          'Comintern',
          'SSSR — Moldavskaya SSR (Chișinău)'
        );
      }
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
      if (s >= 15) {
        return makeResult(
          'SOV',
          `${histName} — Ukrainskaya SSR (Bugeac / Izmailskaya oblast)`,
          'Offensiva Iași-Chișinău (agosto 1944): liberazione sovietica della Bessarabia meridionale (Bugeac, Cetatea Albă e Ismail) e reintegrazione nella RSS Ucraina.',
          'Comintern',
          'SSSR — Ukrainskaya SSR (Izmailskaya oblast)'
        );
      }
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
      if (s >= 15) {
        return makeResult(
          'SOV',
          s >= 20
            ? `${histName} — RSS Ucraina (Černovickaya Oblast', Dic. 1947)`
            : s >= 19
            ? `${histName} — Ukrainskaya SSR (Trattato Parigi 1947)`
            : `${histName} — Ukrainskaya SSR (Chernovitskaya oblast)`,
          s >= 20
            ? 'Dicembre 1947: ratificata dal Trattato di Parigi (10 feb. 1947), la Bucovina Settentrionale consolida l\'Oblast\' di Černivci (RSS Ucraina) nella ricostruzione postbellica al confine con la nuova Repubblica Popolare Romena.'
            : s >= 19
            ? 'Settembre 1947: il Trattato di Pace di Parigi del febbraio 1947 riconosce de jure la frontiera sovietica del giugno 1940 in Bucovina Settentrionale e Chotyn; riforme agrarie e difficile dopoguerra dopo la carestia del 1946-47.'
            : s >= 18
            ? 'Settembre 1945: consolidamento sovietico della Bucovina Settentrionale nell\'Oblast\' di Černivci (RSS Ucraina) e trasferimento delle minoranze polacca ed ebraica verso occidente.'
            : 'Offensiva dei Carpazi e Bukovina (1944): liberazione sovietica di Cernăuți e della Bucovina settentrionale; reintegrazione nella RSS Ucraina.',
          'Comintern',
          s >= 19 ? 'Černovickij Oblispolkom — RSS Ucraina (URSS)' : 'SSSR — Ukrainskaya SSR (Chernovtsy)'
        );
      }
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
        const nrmVoiv = normStr(voiv + ' ' + nid + ' ' + histName);
        if (s >= 15) {
          if (nid.startsWith('PL_KRESY_LTU_')) {
            return makeResult(
              'SOV',
              s >= 20
                ? `${histName} — RSS Lituana (Dic. 1947)`
                : s >= 19
                ? `${histName} — Lietuvos TSR (URSS, 1947)`
                : `${histName} — Lietuvos TSR`,
              s >= 20
                ? `Dicembre 1947: territorio dell'area di Vilnius stabilizzato entro la RSS Lituana dopo il trasferimento dei polacchi verso occidente e il consolidamento della frontiera sovietico-polacca.${modern}`
                : s >= 19
                ? `Settembre 1947: ricostruzione della RSS Lituana nell'area di Vilnius dopo l'accordo confinaria del 16 agosto 1945 e controguerriglia contro le formazioni forestali.${modern}`
                : `Luglio 1944 (Operazione Bagration): territorio liberato dall'Armata Rossa e reintegrato nella RSS Lituana.${modern}`,
              'Comintern',
              s >= 19 ? 'Sovet Ministrov Litovskoj SSR — Vilnius (URSS)' : 'SSSR — Lietuvos TSR (Vilnius)'
            );
          }
          if (
            nrmVoiv.includes('lwow') ||
            nrmVoiv.includes('stanislaw') ||
            nrmVoiv.includes('tarnopol') ||
            nrmVoiv.includes('drohobycz') ||
            nrmVoiv.includes('wolyn') ||
            nrmVoiv.includes('volhyn') ||
            nid.startsWith('PL_KRESY_UKR_') ||
            ssr.includes('Ucrain')
          ) {
            return makeResult(
              'SOV',
              s >= 20
                ? `${histName} — RSS Ucraina (${ssr}, Dic. 1947)`
                : s >= 19
                ? `${histName} — RSS Ucraina (${ssr}, 1947)`
                : `${histName} — RSS Ucraina (${ssr})`,
              s >= 20
                ? `Dicembre 1947 (Ucraina Occidentale — ${ssr}): dopo la massiccia deportazione dell'Operazione "Ovest" (Zapad, ottobre 1947, oltre 76.000 familiari di partigiani UPA trasferiti in Siberia) e la riforma del rublo, il controllo sovietico si irrigidisce.${modern}`
                : s >= 19
                ? `Settembre 1947 (Ucraina Occidentale — ${ssr}): ratificata dal trattato di confine del 16 agosto 1945; intensa sovietizzazione di Leopoli e dei bacini petroliferi di Drohobyč-Boryslav mentre divampa la guerriglia UPA nei Carpazi.${modern}`
                : s >= 18
                ? `Settembre 1945: il Trattato polacco-sovietico del 16 agosto 1945 fissa la frontiera sulla Linea Curzon; espulsioni polacche e lotta dell'NKVD contro l'UPA nell'Ucraina Occidentale.${modern}`
                : `Luglio 1944: offensiva Leopoli-Sandomierz (1° Fronte Ucraino); liberazione di Leopoli (27 luglio 1944) e integrazione nella Repubblica Socialista Sovietica Ucraina.${modern}`,
              'Comintern',
              `SSSR — ${ssr}`
            );
          }
          return makeResult(
            'SOV',
            s >= 20
              ? `${histName} — ${ssr} (Dic. 1947)`
              : s >= 19
              ? `${histName} — ${ssr} (1947)`
              : `${histName} — ${ssr}`,
            s >= 20
              ? `Dicembre 1947 (Bielorussia Occidentale — ${ssr}): consolidamento della nuova frontiera sovietico-polacca (Brest/Grodno/Molodečno), inizio della collettivizzazione rurale e riforma monetaria del 14-16 dicembre.${modern}`
              : s >= 19
              ? `Settembre 1947 (Bielorussia Occidentale — ${ssr}): dopo la definizione confinaria sulla Linea Curzon (agosto 1945, cessione di Białystok alla Polonia), avvio dei piani industriali e della sovietizzazione delle campagne.${modern}`
              : `Estate 1944 - 1945: reintegrazione nella ${ssr} lungo la Linea Curzon dopo il Trattato sovietico-polacco dell'agosto 1945.${modern}`,
            'Comintern',
            `SSSR — ${ssr}`
          );
        }
        if (s >= 9) {
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
        if (s >= 17) {
          return makeResult(
            'POL',
            s >= 18
              ? 'Gdańsk / Danzica (Repubblica di Polonia — Voivodato di Danzica)'
              : 'Gdańsk / Danzica Liberata (Amministrazione Polacca — Voivodato di Danzica)',
            s >= 18
              ? 'Conferenza di Potsdam (agosto 1945): l\'ex Città Libera di Danzica (Gdańsk) è pienamente integrata nella Repubblica di Polonia.'
              : 'Il 30 marzo 1945 il 2° Fronte Bielorusso e la 1ª Brigata Corazzata Polacca liberano Danzica; istituito il Voivodato polacco di Gdańsk.',
            'Alleati',
            s >= 18 ? 'Rzeczpospolita Polska — Województwo Gdańskie' : 'Polonia — Rząd Tymczasowy Rzeczypospolitej Polskiej'
          );
        }
        if (s < 5) {
          const top = resolvePolandToponym(nid, rawName, nrm, 'DANZIG', s);
          return makeResult(
            'DANZIG',
            top?.name || 'Freie Stadt Danzig',
            top?.note || 'Città Libera di Danzig sotto la protezione della Società delle Nazioni.',
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
        if (s >= 17) {
          return makeResult(
            'POL',
            'Gdynia / Pomorskie (Corridoio Polacco Liberato)',
            'Marzo-Aprile 1945: liberazione di Gdynia e del litorale della Pomerania da parte del 2° Fronte Bielorusso e delle forze polacche; ripristino della sovranità nazionale.',
            'Alleati',
            'Rzeczpospolita Polska — Województwo Gdańskie / Pomorskie'
          );
        }
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
        if (s >= 18) {
          const cleanPl = rawName || 'Ziemie Odzyskane';
          return makeResult(
            'POL',
            `${cleanPl} (Ziemie Odzyskane — Linea Oder-Neisse / Polonia)`,
            'Conferenza di Potsdam (agosto 1945): territori ad est della Linea Oder-Neisse amministrati e ripopolati dalla Repubblica di Polonia (Ziemie Odzyskane).',
            'Alleati',
            'Rzeczpospolita Polska — Ministerstwo Ziem Odzyskanych'
          );
        }
        if (s === 17) {
          if (nid === 'PL514' || (nid !== 'PL518' && (nrm === 'miasto wroclaw' || nrm === 'wroclaw' || nrm === 'breslau'))) {
            return makeResult(
              'GER',
              'Breslau (Festung Breslau — Assedio dell\'Armata Rossa)',
              'Febbraio-Maggio 1945: dichiarata fortezza inespugnabile (Festung Breslau) dal comandante Hermann Niehoff, la capitale della Bassa Slesia resiste all\'assedio sovietico fino al 6 maggio 1945.',
              'Asse',
              'Deutsches Reich — Festung Breslau (Gen. Hermann Niehoff)'
            );
          }
          if (nid === 'PL515' || nid === 'PL517' || nrm.includes('jeleniogor') || nrm.includes('walbrzy') || nrm.includes('hirschberg') || nrm.includes('waldenburg')) {
            const topSudPl = resolvePolandToponym(nid, rawName, nrm, 'GER', s);
            return makeResult(
              'GER',
              topSudPl?.name || `${rawName || 'Niederschlesien-Sudeten'} (Heeresgruppe Mitte)`,
              'Fine aprile 1945: fascia pedemontana dei Sudeti slesiani (Jelenia Góra / Wałbrzych) ancora presidiata dal Gruppo d\'Armate Centro (Heeresgruppe Mitte) fino alla resa di maggio.',
              'Asse',
              'Wehrmacht — Heeresgruppe Mitte (Sudetenfront)'
            );
          }
          const isPomWest = nid === 'PL424' || nid.startsWith('PL42') || nid === 'PL636' || nrm.includes('szczecin') || nrm.includes('stettin') || nrm.includes('koszalin') || nrm.includes('slupsk') || nrm.includes('kolobrzeg');
          const isEastPrussiaSouth = nid.startsWith('PL62') || nrm.includes('olsztyn') || nrm.includes('elblag') || nrm.includes('elk') || nrm.includes('allenstein');
          const isSilesiaCore = nid.startsWith('PL5') || nid === 'PL228' || nid === 'PL229' || nrm.includes('opole') || nrm.includes('legnic') || nrm.includes('gliwic') || nrm.includes('bytom');
          const sectorDesc = isEastPrussiaSouth
            ? 'Gennaio-Marzo 1945: la Masuria e la Prussia Orientale meridionale (Olsztyn/Allenstein, Elbląg, Ełk) vengono conquistate dal 2° e 3° Fronte Bielorusso dell\'Armata Rossa.'
            : isPomWest
            ? 'Marzo-26 Aprile 1945: con l\'Offensiva della Pomerania Orientale (presa di Kolberg, Koszalin, Słupsk) e il forzamento del Basso Oder (presa di Stettino il 26 aprile), l\'Armata Rossa controlla l\'intera Pomerania.'
            : isSilesiaCore
            ? 'Gennaio-Marzo 1945: l\'Offensiva dell\'Alta e Bassa Slesia del 1° Fronte Ucraino (Maresciallo Konev) libera l\'Alta Slesia industriale, Opole, Legnica e accerchia Breslau.'
            : 'Gennaio-Febbraio 1945: nell\'Offensiva Vistola-Oder il 1° Fronte Bielorusso libera la Nuova Marca (Gorzów/Landsberg, Zielona Góra, Piła) raggiungendo l\'Oder.';
          const topSovPl = resolvePolandToponym(nid, rawName, nrm, 'SOV', s);
          return makeResult(
            'SOV',
            topSovPl?.name || `${rawName || 'Territori ad Est dell\'Oder'} (Armata Rossa — Aprile 1945)`,
            sectorDesc,
            'Comintern',
            'Armata Rossa — Comandatura Militare Sovietica (Fronti Bielorussi e 1° Ucraino)'
          );
        }
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

      // Step >= 15 (Agosto 1944 - Settembre 1947): Insurrezione di Varsavia, Manifesto PKWN di Lublino, Fronte della Vistola, Liberazione
      if (s >= 15) {
        if (s === 15) {
          if (nid === 'PL127_WARSZAWA_CITY' || nrm === 'warszawa_city' || nrm.includes('warszawa city')) {
            return makeResult(
              'POL',
              'Varsavia (Insurrezione di Varsavia — Armia Krajowa)',
              '1° agosto 1944: esplode l\'Insurrezione di Varsavia guidata dal generale Tadeusz Bór-Komorowski e dall\'Armia Krajowa per liberare la capitale polacca prima dell\'arrivo dell\'Armata Rossa.',
              'Alleati',
              'Polskie Państwo Podziemne — Armia Krajowa (Gen. Tadeusz Bór-Komorowski)'
            );
          }
          if (nid === 'PL127_WARSZAWA_PRAGA' || nid === 'PL912' || nrm === 'praga') {
            return makeResult(
              'SOV',
              'Warszawa-Praga (Fronte sulla Vistola — 1° Fronte Bielorusso)',
              'Agosto 1944: le avanguardie corazzate del 1° Fronte Bielorusso del Mareciallo Konstantin Rokossovskij raggiungono i sobborghi orientali di Varsavia (Praga) lungo la riva destra della Vistola.',
              'Comintern',
              'Armata Rossa — 1° Fronte Bielorusso (Mareciallo Konstantin Rokossovskij)'
            );
          }
          if (
            nid === 'PL31' ||
            nid.startsWith('PL81') ||
            nid.startsWith('PL82') ||
            nid.startsWith('PL84') ||
            nrm.includes('lubel') ||
            nrm.includes('lublin') ||
            nrm.includes('bialystok') ||
            nrm.includes('rzeszow')
          ) {
            return makeResult(
              'SOV',
              `${rawName || 'Lublino'} (Sede del Comitato Polacco di Liberazione Nazionale — PKWN)`,
              'Luglio-Agosto 1944: liberazione dei voivodati orientali della Vistola ad opera dell\'Armata Rossa e proclamazione a Lublino del Comitato Polacco di Liberazione Nazionale (PKWN).',
              'Comintern',
              'Armata Rossa / Comitato Polacco di Liberazione Nazionale (PKWN)'
            );
          }
          const topGer15 = resolvePolandToponym(nid, rawName, nrm, 'GER', s);
          return makeResult(
            'GER',
            topGer15?.name || rawName,
            topGer15?.note || 'Occupazione tedesca della Polonia centro-occidentale (agosto 1944).',
            'Asse',
            topGer15?.adminTitle || 'Generalgouvernement / Deutsches Reich'
          );
        }
        if (s === 16) {
          if (
            nid === 'PL127_WARSZAWA_PRAGA' ||
            nid === 'PL912' ||
            nid === 'PL31' ||
            nid.startsWith('PL81') ||
            nid.startsWith('PL82') ||
            nid.startsWith('PL84') ||
            nrm === 'praga' ||
            nrm.includes('praga') ||
            nrm.includes('lublin') ||
            nrm.includes('lubel') ||
            nrm.includes('rzeszow') ||
            nrm.includes('bialystok')
          ) {
            return makeResult(
              'SOV',
              `${rawName || 'Polonia Orientale'} (Riva Est della Vistola — Armata Rossa & PKWN)`,
              'Dicembre 1944: il fronte sovietico è attestato sulla riva destra della Vistola (Varsavia-Praga e Lublino) in attesa della grande offensiva invernale.',
              'Comintern',
              'PKWN / Armata Rossa (1° Fronte Bielorusso)'
            );
          }
          if (nid === 'PL911' || nid === 'PL127_WARSZAWA_CITY' || nrm.includes('srodmiescie') || nrm.includes('warszawa')) {
            return makeResult(
              'GER',
              'Warschau (Rovine di Varsavia — Fronte sulla Vistola)',
              'Dopo la capitolazione dell\'Insurrezione di Varsavia (2 ottobre 1944), reparti speciali tedeschi distruggono sistematicamente il centro cittadino sulla riva sinistra della Vistola.',
              'Asse',
              'Wehrmacht — Heeresgruppe Mitte (Fronte sulla Vistola)'
            );
          }
          const topGer16 = resolvePolandToponym(nid, rawName, nrm, 'GER', s);
          return makeResult(
            'GER',
            topGer16?.name || rawName,
            topGer16?.note || 'Occupazione tedesca della Polonia occidentale lungo la linea della Vistola (dicembre 1944).',
            'Asse',
            topGer16?.adminTitle || 'Generalgouvernement / Deutsches Reich'
          );
        }
        return makeResult(
          'POL',
          `${rawName || 'Polska'} (${s >= 19 ? 'Repubblica di Polonia' : s === 18 ? 'Repubblica di Polonia — Rząd Jedności Narodowej' : 'Polonia Liberata'})`,
          s >= 19
            ? 'Settembre 1947: territorio della Repubblica di Polonia entro i nuovi confini postbellici sull\'Oder-Neisse.'
            : s === 18
            ? 'Settembre 1945: Repubblica di Polonia restaurata sotto il Governo Provvisorio di Unità Nazionale.'
            : 'Primavera 1945: liberazione del territorio polacco nell\'Offensiva Vistola-Oder e insediamento del governo provvisorio polacco.',
          'Alleati',
          'Rzeczpospolita Polska'
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
      if (s >= 18) {
        const isSovietZone =
          nid === 'AT313' ||
          nid.startsWith('AT1') ||
          nrm.includes('wien') ||
          nrm.includes('vienna') ||
          nrm.includes('niederosterreich') ||
          nrm.includes('burgenland') ||
          nrm.includes('muhlviertel');
        const isFrenchZone =
          nid.startsWith('AT34') ||
          nid === 'AT331' ||
          nid === 'AT332' ||
          nid === 'AT334' ||
          nid === 'AT335' ||
          (nid === 'AT33' && !nrm.includes('osttirol')) ||
          nrm.includes('innsbruck') ||
          nrm.includes('vorarlberg') ||
          (nrm.includes('tirol') && !nrm.includes('osttirol'));
        const isBritishZone =
          nid.startsWith('AT2') ||
          nid === 'AT333' ||
          nrm.includes('graz') ||
          nrm.includes('klagenfurt') ||
          nrm.includes('steiermark') ||
          nrm.includes('karnten') ||
          nrm.includes('osttirol');
        const ausZone = isSovietZone ? 'SOV' : isFrenchZone ? 'FRA' : isBritishZone ? 'UK' : 'USA';
        const topAusPost = resolveSwissAustrianToponym(nid, rawName, nrm, ausZone, s);
        const zoneLabel =
          ausZone === 'SOV'
            ? 'Zona Sovietica (Austria Orientale / Vienna)'
            : ausZone === 'FRA'
            ? 'Zona Francese (Tirolo & Vorarlberg)'
            : ausZone === 'UK'
            ? 'Zona Britannica (Stiria, Carinzia, Tirolo Orientale)'
            : 'Zona Statunitense (Alta Austria & Salisburgo)';
        return makeResult(
          ausZone,
          `${topAusPost?.name || rawName || 'Österreich'} (${zoneLabel})`,
          topAusPost?.note || `Repubblica d'Austria — ${zoneLabel} sotto il controllo della Commissione Alleata per l'Austria (ACA).`,
          'Alleati',
          topAusPost?.adminTitle || `Republik Österreich — ${zoneLabel}`
        );
      }
      if (s === 17) {
        const isViennaSov =
          nid.startsWith('AT1') ||
          nid === 'AT130' ||
          nrm.includes('wien') ||
          nrm.includes('vienna') ||
          nrm.includes('niederosterreich') ||
          nrm.includes('burgenland');
        if (isViennaSov) {
          return makeResult(
            'SOV',
            `${rawName && nrm.includes('wien') ? 'Wien' : rawName || 'Wien'} (Liberata dall'Armata Rossa — Offensiva di Vienna)`,
            'Aprile 1945: offensiva di Vienna del 2° e 3° Fronte Ucraino (Maresciallo Fëdor Tolbuchin); liberazione di Wien (13 aprile 1945) e insediamento del governo provvisorio austriaco di Karl Renner.',
            'Comintern',
            'Armata Rossa — 3° Fronte Ucraino (Vienna)'
          );
        }
        const isWestUsa =
          nid.startsWith('AT3') ||
          nrm.includes('tirol') ||
          nrm.includes('innsbruck') ||
          nrm.includes('vorarlberg') ||
          nrm.includes('salzburg') ||
          nrm.includes('linz');
        if (isWestUsa) {
          return makeResult(
            'USA',
            `${rawName || 'Tirol / Westösterreich'} (Avanzata Alleata — 7ª Armata USA)`,
            'Fine aprile 1945: le colonne corazzate della 7ª Armata statunitense valicano i passi alpini bavaresi entrando nel Tirolo e nella Ridotta Alpina austriaca.',
            'Alleati',
            'U.S. Seventh Army — Alpenfestung Sector'
          );
        }
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
      // Unificazione di percorso per i poligoni CZE_* del database unificato anche senza __resolve
      if (nid.startsWith('CZE_SLO_') || p.REGION_KIND === 'SLOVAKIA') {
        if (s >= 21) {
          return makeResult('CZE', `${rawName || 'Slovensko'} (Repubblica Cecoslovacca Socialista)`, 'Dopo il colpo di Stato di Praga (febbraio 1948) e la Costituzione del 9 maggio 1948, la Slovacchia è parte della Repubblica Cecoslovacca socialista.', 'Comintern', 'Československá republika — Slovensko');
        }
        if (s >= 17) {
          return makeResult('CZE', `${rawName || 'Slovensko'} (Slovensko Oslobodené — Košický vládny program, Apríl 1945)`, 'Aprile 1945: Slovacchia liberata dal 2° e 4° Fronte Ucraino e dal 1° Corpo Cecoslovacco; il 4 aprile a Košice si insedia il governo cecoslovacco.', 'Alleati', 'Československá republika — Slovensko');
        }
        if (s < 3) {
          return makeResult('CZE', rawName || 'Slovensko', 'Československá republika — Krajina Slovenská', undefined, 'Československá republika');
        }
        return makeResult('SLO', rawName || 'Slovenská republika', 'Slovenská republika (Vláda Dr. Jozefa Tisa)', 'Fantoccio', 'Slovenská republika');
      }
      if (nid.startsWith('CZE_RUTHENIA_NORTH') || nid === 'CZE_RUTHENIA_SOUTH' || nid.startsWith('CZE_RUTHENIA')) {
        if (s >= 16) {
          return makeResult('SOV', `${rawName || 'Zakarpatska Ukrajina'} (URSS — Transcarpazia)`, 'Offensiva dei Carpazi Orientali (ott-nov 1944) e trattato di cessione del 1945: la Rutenia Subcarpatica entra nell\'URSS (Zakarpatskaya Oblast\', RSS Ucraina).', 'Comintern', 'Zakarpatskaya Oblast\' — URSS');
        }
        if (s < 2 || (nid.startsWith('CZE_RUTHENIA_NORTH') && s === 2)) {
          return makeResult('CZE', rawName || 'Podkarpatská Rus', 'Podkarpatská Rus / Karpatska Ukrajina (ČSR)', undefined, 'Československá republika');
        }
        return makeResult('HUN', rawName || 'Kárpátalja', 'Kárpátalja (Magyar Királyság)', 'Neutrale', 'Magyar Királyság');
      }
      if (nid.startsWith('CZE_FEL_') || p.REGION_KIND === 'FELVIDEK') {
        if (s >= 17) {
          return makeResult('CZE', `${rawName || 'Južné Slovensko'} (Reintegrato nella ČSR)`, 'Aprile 1945: annullamento del Primo Arbitrato di Vienna e liberazione della Slovacchia meridionale.', s >= 21 ? 'Comintern' : 'Alleati', 'Československá republika');
        }
        if (s < 2) {
          return makeResult('CZE', rawName || 'Južné Slovensko', 'Krajina Slovenská (Československá republika)', undefined, 'Československá republika');
        }
        return makeResult('HUN', rawName || 'Felvidék', 'Felvidék (Magyar Királyság — Primo Arbitrato di Vienna)', 'Neutrale', 'Magyar Királyság');
      }
      if (nid === 'CZE_ZAOLZIE' || p.REGION_KIND === 'ZAOLZIE') {
        if (s >= 18) return makeResult('CZE', 'Český Těšín (Těšínsko)', 'Territorio del Zaolzie/Těšínsko reintegrato nella Cecoslovacchia.', s >= 21 ? 'Comintern' : 'Alleati', 'Československá republika');
        if (s < 2) return makeResult('CZE', 'Český Těšín (Těšínsko)', 'Československá republika', undefined, 'Československá republika');
        if (s < 5) return makeResult('POL', 'Zaolzie (Śląsk Cieszyński)', 'Rzeczpospolita Polska', 'Alleati', 'Rzeczpospolita Polska');
        return makeResult('GER', 'Teschen', 'Landkreis Teschen (Gau Oberschlesien)', 'Asse', 'Deutsches Reich');
      }
      if (s >= 21) {
        return makeResult(
          'CZE',
          `${rawName || 'Československo'} (Československá republika — Colpo di Stato di Praga & Regime Comunista del 1948)`,
          'Febbraio – Giugno 1948: dopo il colpo di Stato comunista di Praga (25 febbraio 1948, "Febbraio Vittorioso"), la morte del ministro degli Esteri Jan Masaryk (10 marzo), l\'adozione della Costituzione del 9 maggio e le dimissioni del presidente Edvard Beneš (7 giugno), il leader del KSČ Klement Gottwald assume la presidenza della Repubblica (14 giugno 1948), allineando la Cecoslovacchia al blocco sovietico.',
          'Comintern',
          'Československá republika (Prezident Klement Gottwald · KSČ · Costituzione del 9 Maggio 1948)'
        );
      }
      if (s >= 18) {
        return makeResult(
          'CZE',
          `${rawName || 'Československo'} (Československá republika — Terza Repubblica)`,
          'Maggio-Settembre 1945: piena restaurazione della Repubblica Cecoslovacca nei confini pre-Monaco (annullamento dell\'Accordo di Monaco) sotto il Presidente Edvard Beneš.',
          'Alleati',
          'Československá republika (Prezident Dr. Edvard Beneš)'
        );
      }
      if (
        s === 17 &&
        (nid === 'CZ080' ||
          nid.startsWith('CZ07') ||
          nid === 'CZE_OSTRAVA' ||
          nid === 'CZE_SUD_TROPPAU' ||
          nid === 'CZE_BRNO' ||
          nid === 'CZE_ZLIN' ||
          nid === 'CZE_SUD_SUEDMAEHREN' ||
          nrm.includes('ostrav') ||
          nrm.includes('troppau') ||
          nrm.includes('opava') ||
          nrm.includes('brno') ||
          nrm.includes('brunn') ||
          nrm.includes('zlin') ||
          nrm.includes('suedmaehren') ||
          nrm.includes('sudmahren') ||
          nrm.includes('znojmo'))
      ) {
        return makeResult(
          'SOV',
          `${rawName || 'Moravia Orientale e Meridionale'} (Liberata — Offensiva di Brno & Ostrava-Opava, Aprile 1945)`,
          '17-30 aprile 1945: il 2° e il 4° Fronte Ucraino dell\'Armata Rossa, affiancati dal 1° Corpo d\'Armata Cecoslovacco, sfondano in Moravia meridionale e Slesia ceca liberando Břeclav/Mikulov, Opava (22 aprile), Brno (26 aprile) e il bacino di Moravská Ostrava (30 aprile).',
          'Comintern',
          'Armata Rossa — 2° & 4° Fronte Ucraino (Offensiva di Moravia)'
        );
      }
      const sud =
        nid.startsWith('CZE_SUD_') ||
        p.REGION_KIND === 'SUDETENLAND' ||
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

      // Step >= 17 (Apr 1945 - Giu 1948): Programma di Košice, reintegrazione e Colpo di Praga (Feb 1948)
      if (s >= 17) {
        return makeResult(
          'CZE',
          `${rawName || 'Slovensko'} (${s >= 21 ? 'Československá republika — Regime Comunista del 1948' : s >= 18 ? 'Československá republika' : 'Programma di Košice — Cecoslovacchia Liberata'})`,
          s >= 21
            ? 'Dopo il colpo di Stato di Praga (25 febbraio 1948), la Costituzione del 9 maggio e la presidenza di Klement Gottwald (14 giugno 1948), la Slovacchia fa parte della Repubblica Cecoslovacca socialista allineata al blocco sovietico.'
            : s >= 18
            ? 'Slovacchia pienamente reintegrata nella Terza Repubblica Cecoslovacca nei confini del 1937 (annullamento del Primo Arbitrato di Vienna).'
            : 'Aprile 1945: proclamazione del Programma di Košice (5 aprile 1945) e liberazione della Slovacchia nel quadro della ricostituita Repubblica Cecoslovacca.',
          s >= 21 ? 'Comintern' : 'Alleati',
          s >= 21 ? 'Československá republika — Zbor povereníkov (KSČ)' : 'Československá republika — Slovenská národná rada'
        );
      }

      // Step 15 (Agosto 1944): Insurrezione Nazionale Slovacca (SNP a Banská Bystrica) vs Militärverwaltung tedesca a Bratislava
      if (s === 15) {
        if (nid === 'SK032' || nrm.includes('bansk') || nrm.includes('bystric')) {
          return makeResult(
            'CZE',
            'Banská Bystrica (Insurrezione Nazionale Slovacca — SNP)',
            'Il 29 agosto 1944 scoppia a Banská Bystrica l\'Insurrezione Nazionale Slovacca (SNP) guidata dai generali Ján Golian e Rudolf Viest (1ª Armata Cecoslovacca in Slovacchia) contro la Wehrmacht.',
            'Alleati',
            'Slovenská národná rada / Prvá československá armáda na Slovensku (Gen. Ján Golian)'
          );
        }
        if (nid === 'SK023' || nid === 'SK042') {
          const hTop = getTop('HUN');
          return makeResult(
            'HUN',
            hTop.name,
            nid === 'SK023'
              ? 'Felvidék / Érsekújvár és Komárom (Primo Arbitrato di Vienna, nov 1938)'
              : 'Kassa és Abaúj-Torna (Primo Arbitrato di Vienna, nov 1938)',
            'Asse'
          );
        }
        return makeResult(
          'GER',
          `${rawName || 'Bratislava'} — Wehrmacht Militärverwaltung (Invasione Tedesca)`,
          '29 agosto 1944: in reazione all\'Insurrezione Nazionale Slovacca, le truppe tedesche invadono la Slovacchia occidentale e Bratislava instaurando l\'amministrazione militare della Wehrmacht (Militärverwaltung — Gottlob Berger).',
          'Asse',
          'Deutscher Befehlshaber in der Slowakei / Militärverwaltung'
        );
      }

      // Step 16 (Dicembre 1944): Slovacchia Orientale liberata dall'Armata Rossa (Prešov / Košice)
      if (s === 16 && (nid === 'SK041' || nrm.includes('presov'))) {
        return makeResult(
          'SOV',
          `${rawName || 'Prešov'} (Liberata nei Carpazi — Armata Rossa & Corpo Cecoslovacco)`,
          'Autunno-Inverno 1944: offensiva dei Carpazi-Dukla; liberazione dei distretti orientali della Slovacchia ad opera dell\'Armata Rossa e del 1° Corpo Cecoslovacco.',
          'Comintern',
          'Armata Rossa — 4° Fronte Ucraino'
        );
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
      if (s >= 16 && bTop?.owner) {
        const hFac: FactionType =
          bTop.owner === 'SOV' ? 'Comintern' : s >= 19 ? 'Comintern' : s >= 18 ? 'Alleati' : 'Asse';
        return makeResult(bTop.owner, bTop.name, bTop.note, hFac, bTop.adminTitle);
      }
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
      if (s >= 21) {
        return makeResult(
          'ROM',
          `${(bTop?.name || 'Republica Populară Română').replace('Regatul României', 'Republica Populară Română').replace(/\s*\([^)]*30 Dicembre 1947[^)]*\)/, '')} (Repubblica Popolare Romena — Costituzione del 13 Aprile 1948 & Nazionalizzazioni)`,
          '13 Aprile – 11 Giugno 1948: la Grande Assemblea Nazionale adotta il 13 aprile 1948 la prima Costituzione socialista della Repubblica Popolare Romena (RPR) e il nuovo emblema di Stato sulla bandiera tricolore; l\'11 giugno 1948 il regime di Gheorghe Gheorghiu-Dej e Petru Groza decreta la nazionalizzazione integrale delle banche, delle miniere, dei pozzi petroliferi di Ploiești e delle imprese industriali.',
          'Comintern',
          'Republica Populară Română (Costituzione del 13 Aprile 1948 · Gheorghe Gheorghiu-Dej & Petru Groza)'
        );
      }
      if (s >= 20) {
        return makeResult(
          'ROM',
          bTop?.name ? bTop.name.replace('Regatul României', 'Republica Populară Română') : 'Republica Populară Română (RPR — Proclamazione del 30 Dicembre 1947)',
          '30 Dicembre 1947: a Bucarest (Palazzo Elisabeta), il Primo Ministro Petru Groza e il leader comunista Gheorghe Gheorghiu-Dej, sostenuti dall\'accerchiamento militare delle divisioni Tudor Vladimirescu, costringono Re Michele I ad abdicare; nella stessa sera il Parlamento proclama la Repubblica Popolare Romena (Legge n. 363/1947) sotto il Presidium provvisorio guidato da Constantin Ion Parhon.',
          'Comintern',
          'Republica Populară Română (Presidium C.I. Parhon · P.M. Petru Groza · Gheorghe Gheorghiu-Dej)'
        );
      }
      if (s >= 16) {
        return makeResult(
          'ROM',
          bTop?.name || getTop('ROM').name,
          bTop?.note || 'Regatul României — Transilvania riunificata, co-belligeranza alleata e Trattati di Parigi.',
          s >= 19 ? 'Comintern' : 'Alleati',
          bTop?.adminTitle || 'Regatul României'
        );
      }
      if (roOwner === 'HUN') {
        return makeResult(
          'HUN',
          top.name,
          bTop?.note || 'Észak-Erdély — Magyar Királyság (Secondo Arbitrato di Vienna, 30 agosto 1940)',
          'Asse',
          bTop?.adminTitle || 'Magyar Királyság — Észak-Erdély'
        );
      }
      if (s === 15) {
        return makeResult(
          'ROM',
          top.name,
          `${bTop?.note ? `${bTop.note} — ` : ''}Colpo di Stato del 23 agosto 1944: Re Michele I depone e arresta il maresciallo Ion Antonescu; la Romania rompe con l'Asse, dichiara guerra alla Germania nazista e affianca gli Alleati.`,
          'Alleati',
          'Regatul României (Regele Mihai I — Guvernul Constantin Sănătescu)'
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
      if (s >= 15) {
        return makeResult(
          'SOV',
          'Moldavskaya SSR (Chișinău — Bessarabia Liberata)',
          'Offensiva Iași-Chișinău (20-29 agosto 1944): l\'Armata Rossa libera Chișinău e la Bessarabia dall\'occupazione dell\'Asse, reintegrandola come RSS Moldava nell\'URSS.',
          'Comintern',
          'SSSR — Moldavskaya SSR (Chișinău)'
        );
      }
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
      if (s >= 20) {
        const bTop = resolveBalkansToponym(nid, rawName, nrm, 'BUL', s);
        const top = bTop || getTop('BUL');
        return makeResult(
          'BUL',
          bTop?.name ? bTop.name.replace('Tsarstvo Balgariya', 'Narodna Republika Bălgariya') : top.name,
          '4 Dicembre 1947: la Grande Assemblea Nazionale bulgara adotta ufficialmente la "Costituzione Dimitrov" (modellata sulla Costituzione sovietica del 1936), consolidando la Repubblica Popolare di Bulgaria sotto il Primo Ministro Georgi Dimitrov e trasformando lo Stato in una democrazia popolare a partito egemone.',
          'Comintern',
          'Narodna Republika Bălgariya — Costituzione Dimitrov (Primo Ministro Georgi Dimitrov)'
        );
      }
      if (s >= 16) {
        const bTop = resolveBalkansToponym(nid, rawName, nrm, 'BUL', s);
        const top = bTop || getTop('BUL');
        return makeResult(
          'BUL',
          top.name,
          bTop?.note || 'Tsarstvo Balgariya — Otechestven Front (Fronte della Patria)',
          s >= 19 ? 'Comintern' : 'Alleati',
          bTop?.adminTitle || 'Tsarstvo Balgariya'
        );
      }
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
      if (s >= 17) {
        const finLabel =
          rawName || (nid === 'FI1B1' ? 'Uusimaa / Helsinki' : 'Suomen tasavalta');
        return makeResult(
          'FIN',
          s >= 19
            ? `${finLabel} (Repubblica di Finlandia — Trattato di Pace di Parigi)`
            : getTop('FIN').name || `${finLabel} (Repubblica di Finlandia)`,
          s >= 19
            ? 'Suomen tasavalta — Trattato di Pace di Parigi (10 febbraio / 15 settembre 1947): neutralità sovrana sotto il Presidente Juho Kusti Paasikivi, scioglimento della Commissione di Controllo Alleata, ratifica delle cessioni territoriali (Carelia, Salla, Petsamo) e affitto quinquennale della base navale di Porkkala all\'URSS.'
            : 'Suomen tasavalta — Conclusione della Guerra di Lapponia (aprile 1945) e ricostruzione postbellica sotto la Presidenza Mannerheim / Paasikivi.',
          'Neutrale',
          'Suomen tasavalta (Helsinki)'
        );
      }
      if (s === 16) {
        return makeResult(
          'FIN',
          getTop('FIN').name,
          'Suomen tasavalta — Armistizio di Mosca (19 settembre 1944) e Guerra di Lapponia (Lapin sota): la Finlandia rompe con il Terzo Reich e combatte per espellere la Wehrmacht dalla Lapponia.',
          'Alleati',
          'Suomen tasavalta — Päämaja (Sotamarsalkka C.G.E. Mannerheim)'
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
    case 'ES_RIF':
    case 'ES_IFNI': {
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
        return resolveSpanishAfricanTerritory('ES_RIF', s);
      }

      // Plazas de Soberanía: Ceuta (ES63) e Melilla (ES64)
      if (nid === 'ES63' || nid === 'ES630' || nrm.includes('ceuta')) {
        return resolveSpanishAfricanTerritory('ES630', s);
      }
      if (nid === 'ES64' || nid === 'ES640' || nrm.includes('melilla')) {
        return resolveSpanishAfricanTerritory('ES640', s);
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
      // Risoluzione geostorica per provincia sull'intera timeline 1936-1947 (Step 0-19)
      if (s >= 9) {
        const cleanId = String(nid || ft.id || '').toUpperCase().trim();
        const normName = nrm;
        const isLegacyBelluno = cleanId === 'ITH37' && normName.includes('belluno');
        const lookupId = isLegacyBelluno ? 'ITH33' : (cleanId || normName);
        const itMeta = findItalyProvinceMeta(lookupId, rawName);
        const canonicalLookupId = isLegacyBelluno ? 'ITH33' : (itMeta?.nuts || cleanId || lookupId);
        const provBaseName =
          itMeta?.getHistoricalName(8) || itMeta?.name || rawName || 'Provincia Italiana';

        const extRes = resolveItalyExtendedStep(
          canonicalLookupId,
          rawName,
          normName,
          provBaseName,
          s
        );
        if (extRes) return extRes;
      }

      // Risoluzione esaustiva delle 107 province del Regno d'Italia e possedimenti speciali (Step 0-8)
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
      if (s >= 19 && (nid === 'HR031' || nrm.includes('primorsko') || nrm.includes('rijeka') || nrm.includes('fiume') || nrm.includes('susak'))) {
        return makeResult(
          'DFJ',
          'Fiume / Rijeka (Repubblica Popolare di Croazia — FNRJ)',
          s >= 21
            ? 'Giugno 1948 (Rottura Tito-Stalin, 28 giugno 1948): Fiume e il Carnaro fanno parte della Repubblica Federativa Popolare di Jugoslavia (FNRJ), espulsa dal Cominform e divenuta Stato socialista indipendente non allineato a Mosca.'
            : 'Trattato di Pace di Parigi (15 settembre 1947): l\'Italia cede definitivamente Fiume e la Provincia del Carnaro alla Repubblica Federativa Popolare di Jugoslavia (FNRJ).',
          s >= 21 ? 'Neutrale' : 'Comintern',
          'Repubblica Federativa Popolare di Jugoslavia — Narodna Republika Hrvatska (NRH)'
        );
      }

      if (s >= 19 && (nid === 'HR033' || nrm.includes('zadar') || nrm.includes('zara'))) {
        return makeResult(
          'DFJ',
          'Zara / Zadar (Repubblica Popolare di Croazia — FNRJ)',
          s >= 21
            ? 'Giugno 1948 (Rottura Tito-Stalin, 28 giugno 1948): Zara e la Dalmazia settentrionale fanno parte della Repubblica Federativa Popolare di Jugoslavia (FNRJ), Stato socialista indipendente fuori dal Cominform.'
            : 'Trattato di Pace di Parigi (15 settembre 1947): cessione definitiva dell\'ex enclave italiana di Zara e delle isole adriatiche alla Repubblica Popolare di Croazia (FNRJ).',
          s >= 21 ? 'Neutrale' : 'Comintern',
          'Repubblica Federativa Popolare di Jugoslavia — Narodna Republika Hrvatska (NRH)'
        );
      }

      // 1. Provincia di Pola (Istria Italiana - Trattato di Rapallo 1920: 100% sovranità italiana / OZAK a Step 13-17 / AMG Step 18 / FNRJ Step 19+)
      if (nid === 'HR036' || nrm.includes('istarska') || nrm.includes('pula') || nrm.includes('pola')) {
        if (s >= 18) {
          const bTop = resolveBalkansToponym('HR036', rawName, nrm, 'DFJ', s);
          return makeResult(
            bTop?.owner || (s >= 19 ? 'DFJ' : 'AMG'),
            bTop?.name || (s >= 19 ? 'Pola / Pula (Repubblica Popolare di Croazia — Trattato di Parigi 1947)' : 'Pola (Enclave della Zona A — Governo Militare Alleato AMG)'),
            bTop?.note || 'Trattato di Pace di Parigi (15 settembre 1947): evacuazione alleata di Pola ed esodo sul piroscafo Toscana.',
            s >= 21 ? 'Neutrale' : s >= 19 ? 'Comintern' : 'Alleati',
            bTop?.adminTitle || (s >= 19 ? 'Repubblica Federativa Popolare di Jugoslavia — Narodna Republika Hrvatska' : 'Allied Military Government (AMG Venezia Giulia)')
          );
        }
        if (s >= 13) {
          return makeResult(
            'OZAK',
            'Provincia di Pola (Operationszone Adriatisches Küstenland — Provinz Pola)',
            'Istituita il 10 settembre 1943 da Hitler a seguito dell\'armistizio italiano, l\'Operationszone Adriatisches Küstenland comprende l\'Istria e la Provincia di Pola (con la strategica base navale) sotto il controllo del Gauleiter Friedrich Rainer.',
            'Asse',
            'Operationszone Adriatisches Küstenland — Provinz Pola'
          );
        }
        const top = getTop('ITA');
        return makeResult(
          'ITA',
          top.name || 'Provincia di Pola (Istria Italiana)',
          top.note || 'Regno d\'Italia — Provincia di Pola (Trattato di Rapallo 1920: Pola, Parenzo, Rovigno, Pisino, Albona)',
          undefined,
          top.adminTitle || 'Provincia di Pola'
        );
      }

      if (s >= 16) {
        const bTop = resolveBalkansToponym(nid, rawName, nrm, 'DFJ', s);
        if (bTop?.owner) {
          const hrFac: FactionType =
            bTop.owner === 'CRO' ? 'Fantoccio' : bTop.owner === 'GER' ? 'Asse' : bTop.owner === 'DFJ' ? (s >= 21 ? 'Neutrale' : s >= 19 ? 'Comintern' : 'Alleati') : 'Alleati';
          return makeResult(bTop.owner, bTop.name, bTop.note, hrFac, bTop.adminTitle);
        }
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

        // 2b. Litorale Croato / Sušak e Veglia (HR031) -> Annessione italiana alla Provincia del Carnaro (Fiume) / OZAK a Step 13
        if (nid === 'HR031' || nrm.includes('primorsko') || nrm.includes('rijeka') || nrm.includes('fiume') || nrm.includes('susak')) {
          if (s >= 13) {
            return makeResult(
              'OZAK',
              'Fiume e Carnaro (Operationszone Adriatisches Küstenland)',
              'Istituita il 10 settembre 1943 a seguito dell\'armistizio italiano, l\'Operationszone Adriatisches Küstenland comprende la Provincia di Fiume e il Carnaro sotto il controllo diretto del Gauleiter Friedrich Rainer.',
              'Asse',
              'Operationszone Adriatisches Küstenland — Provinz Fiume'
            );
          }
          return makeResult(
            'ITA',
            'Provincia del Carnaro — Fiume, Sušak, Castua, Cabar e Veglia',
            'Trattati di Roma (aprile-maggio 1941): la 2ª Armata italiana (Gen. Vittorio Ambrosio) occupa Sušak, Castua, Čabar, Buccari e l\'isola di Veglia (Krk), annessi al Regno d\'Italia nella Provincia del Carnaro.',
            'Asse',
            'Regno d\'Italia — Provincia del Carnaro (Fiume e Sušak)'
          );
        }

        // 2c. Dalmazia annessa al Regno d'Italia (HR033 Zara/Benkovac, HR034 Sebenico/Šibenik, HR035 Spalato/Split) -> Governatorato della Dalmazia / GER & CRO a Step 13
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
          if (s >= 13) {
            const isZara = nid === 'HR033' || nrm.includes('zadar') || nrm.includes('zara');
            return makeResult(
              isZara ? 'GER' : 'CRO',
              isZara
                ? 'Zara (Occupazione Militare Tedesca — Wehrmacht & RSI)'
                : 'Dalmazia (Annessione allo Stato Indipendente di Croazia / Presidio Wehrmacht)',
              'Con l\'armistizio dell\'8 settembre 1943 (Operazione Achse), la Wehrmacht disarma la 2ª Armata italiana. Il Poglavnik Ante Pavelić dichiara nulli i Patti di Roma proclamando l\'annessione della Dalmazia allo Stato Indipendente di Croazia (NDH), mentre la città di Zara è presidiata militarmente dalla Wehrmacht.',
              'Asse',
              isZara ? 'Deutsche Wehrmacht — Militärverwaltung Zara' : 'Nezavisna Država Hrvatska (NDH) & Deutsche Wehrmacht'
            );
          }
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
      // 1. Gorizia / Goriška (SI043): Isonzo/Tolmino OZAK (13-17) -> DFJ/FNRJ (18-19+)
      if (nid === 'SI043' || nrm.includes('goriska') || nrm.includes('gorizia')) {
        if (s >= 19) {
          return makeResult(
            'DFJ',
            'Goriška / Alta Valle dell\'Isonzo (Repubblica Popolare di Slovenia — FNRJ)',
            'Trattato di Pace di Parigi (15 settembre 1947): cessione alla Jugoslavia dell\'alta valle dell\'Isonzo (Tolmino, Caporetto, Idria) e dei quartieri orientali di Gorizia, ove sorge la città nuova di Nova Gorica.',
            s >= 21 ? 'Neutrale' : 'Comintern',
            'Repubblica Federativa Popolare di Jugoslavia — Ljudska Republika Slovenija (LRS)'
          );
        }
        if (s >= 18) {
          const bTop = resolveBalkansToponym('SI043', rawName, nrm, 'DFJ', s);
          return makeResult(
            'DFJ',
            bTop?.name || 'Goriška (Demokratska Federativna Jugoslavija — LRS)',
            bTop?.note || 'Linea Morgan (Zona B): alta valle dell\'Isonzo sotto amministrazione jugoslava.',
            'Alleati',
            bTop?.adminTitle || 'Demokratska Federativna Jugoslavija — Ljudska Republika Slovenija'
          );
        }
        if (s >= 13) {
          return makeResult(
            'OZAK',
            'Gorizia (Operationszone Adriatisches Küstenland)',
            'Istituita il 10 settembre 1943 a seguito dell\'armistizio italiano, l\'Operationszone Adriatisches Küstenland comprende la Provincia di Gorizia sotto il controllo diretto del Gauleiter Friedrich Rainer.',
            'Asse',
            'Operationszone Adriatisches Küstenland — Provinz Görz'
          );
        }
        const top = getTop('ITA');
        return makeResult(
          'ITA',
          top.name || 'Gorizia (Venezia Giulia Orientale)',
          top.note || 'Regno d\'Italia — Provincia di Gorizia (Trattato di Rapallo 1920: Caporetto, Tolmino, Idria, Aidussina e Canale d\'Isonzo)',
          undefined,
          top.adminTitle || 'Provincia di Gorizia'
        );
      }

      // 2. Obalno-kraška (SI044): Capodistria/Sesana/Carso OZAK (13-17) -> DFJ/VUJA Zona B (18-19+)
      if (nid === 'SI044' || nrm.includes('obalno') || nrm.includes('koper') || nrm.includes('capodistria')) {
        if (s >= 18) {
          const bTop = resolveBalkansToponym('SI044', rawName, nrm, 'DFJ', s);
          return makeResult(
            'DFJ',
            bTop?.name || (s >= 19 ? 'Obalno-kraška / Zona B Carso (Repubblica Popolare di Slovenia — FNRJ)' : 'Capodistria e Carso (Zona B — Amministrazione VUJA)'),
            bTop?.note || 'Accordo di Belgrado (1945) e Trattato di Parigi (1947): Carso e litorale istriano nord sotto amministrazione jugoslava.',
            s >= 21 ? 'Neutrale' : s >= 19 ? 'Comintern' : 'Alleati',
            bTop?.adminTitle || 'Repubblica Federativa Popolare di Jugoslavia — Ljudska Republika Slovenija (LRS)'
          );
        }
        if (s >= 13) {
          return makeResult(
            'OZAK',
            'Capodistria e Carso (Operationszone Adriatisches Küstenland)',
            'Istituita il 10 settembre 1943 a seguito dell\'armistizio italiano, l\'Operationszone Adriatisches Küstenland comprende l\'Istria settentrionale e il Carso sotto il controllo del Gauleiter Friedrich Rainer.',
            'Asse',
            'Operationszone Adriatisches Küstenland — Provinz Pola / Triest'
          );
        }
        const top = getTop('ITA');
        return makeResult(
          'ITA',
          top.name || 'Capodistria e Carso (Venezia Giulia)',
          top.note || 'Regno d\'Italia — Province di Trieste e Pola (Trattato di Rapallo 1920: Capodistria, Isola d\'Istria, Pirano e Sesana)',
          undefined,
          top.adminTitle || 'Provincia di Pola / Trieste'
        );
      }

      if (s >= 16) {
        const bTop = resolveBalkansToponym(nid, rawName, nrm, 'DFJ', s);
        if (bTop?.owner) {
          return makeResult(
            bTop.owner,
            bTop.name,
            bTop.note,
            bTop.owner === 'DFJ' ? (s >= 21 ? 'Neutrale' : s >= 19 ? 'Comintern' : 'Alleati') : 'Asse',
            bTop.adminTitle
          );
        }
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

        // 3b. Provincia Italiana di Lubiana (SI041 Osrednjeslovenska/Ljubljana, SI037 Jugovzhodna/Novo Mesto/Dolenjska, SI038 Primorsko-notranjska/Kočevje) / OZAK a Step 13
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
          if (s >= 13) {
            return makeResult(
              'OZAK',
              'Provincia di Lubiana (Operationszone Adriatisches Küstenland — Provinz Laibach)',
              'Istituita il 10 settembre 1943 da Hitler a seguito dell\'armistizio italiano, la Provincia di Lubiana (Provinz Laibach) viene annessa all\'Operationszone Adriatisches Küstenland sotto il Gauleiter Friedrich Rainer; viene istituito il corpo collaborazionista dei Domobranci (Guardia Civica Slovena del generale Leon Rupnik).',
              'Asse',
              'Operationszone Adriatisches Küstenland — Provinz Laibach (Gauleiter Friedrich Rainer & Leon Rupnik)'
            );
          }
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
      if (s >= 17) {
        const bTop = resolveBalkansToponym(nid, rawName, nrm, 'DFJ', s);
        return makeResult(
          'DFJ',
          bTop?.name || `${rawName || 'Bosna i Hercegovina'} (${s >= 19 ? 'Repubblica Popolare di Bosnia ed Erzegovina — FNRJ' : 'Liberata dalla NOVJ — DFJ'})`,
          bTop?.note || 'Aprile 1945 - Settembre 1947: Bosnia ed Erzegovina liberata dall\'Esercito Jugoslavo (NOVJ) e integrata nella Federazione Jugoslava (NRBiH).',
          s >= 21 ? 'Neutrale' : s >= 19 ? 'Comintern' : 'Alleati',
          bTop?.adminTitle || (s >= 19 ? 'Repubblica Federativa Popolare di Jugoslavia — Narodna Republika Bosna i Hercegovina (NRBiH)' : 'Demokratska Federativna Jugoslavija — ZAVNOBiH')
        );
      }
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
      if (s >= 16) {
        const bTop = resolveBalkansToponym(nid, rawName, nrm, 'DFJ', s);
        const owner = bTop?.owner || 'DFJ';
        const rsFac: FactionType =
          owner === 'CRO' ? 'Fantoccio' : owner === 'GER' ? 'Asse' : owner === 'DFJ' ? (s >= 21 ? 'Neutrale' : s >= 19 ? 'Comintern' : 'Alleati') : 'Alleati';
        return makeResult(
          owner,
          s >= 21 && (nid === 'RS110' || nrm.includes('beograd') || nrm.includes('belgrad'))
            ? 'Belgrado / Beograd (Capitale FNRJ — Rottura Tito-Stalin del 28 Giugno 1948)'
            : bTop?.name || `${rawName || 'Srbija'} (Demokratska Federativna Jugoslavija)`,
          s >= 21
            ? '28 Giugno 1948 (Rottura Tito-Stalin): con la risoluzione di Bucarest il Cominform espelle il Partito Comunista di Jugoslavia accusando Josip Broz Tito di deviazionismo nazionalista; la Repubblica Federativa Popolare di Jugoslavia (FNRJ) rompe con Mosca posizionandosi quale Stato socialista sovrano e non allineato.'
            : bTop?.note || 'Liberazione della Serbia e di Belgrado ad opera della NOVJ e dell\'Armata Rossa.',
          rsFac,
          s >= 21
            ? 'Federativna Narodna Republika Jugoslavija (Maresciallo Josip Broz Tito — Socialismo Indipendente)'
            : bTop?.adminTitle || 'Demokratska Federativna Jugoslavija (Josip Broz Tito — NOVJ)'
        );
      }
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
      if (s >= 16) {
        const bTop = resolveBalkansToponym(nid, rawName, nrm, 'DFJ', s);
        return makeResult(
          'DFJ',
          bTop?.name || (s >= 19 ? 'Montenegro (Repubblica Popolare del Montenegro — FNRJ)' : 'Montenegro (Liberato dai Partigiani della NOVJ — Dicembre 1944)'),
          bTop?.note || 'Dicembre 1944: i reparti della NOVJ liberano Podgorica e il Montenegro.',
          s >= 21 ? 'Neutrale' : s >= 19 ? 'Comintern' : 'Alleati',
          bTop?.adminTitle || (s >= 19 ? 'Repubblica Federativa Popolare di Jugoslavia — Narodna Republika Crna Gora (NRCG)' : 'Demokratska Federativna Jugoslavija — Crna Gora')
        );
      }
      if (s >= 13) {
        return makeResult(
          'GER',
          'Montenegro (Occupazione Militare Tedesca — Militärverwaltung Montenegro)',
          'Operazione Achse (settembre 1943): a seguito dell\'armistizio di Cassibile, la Wehrmacht disarma il presidio italiano a Cettigne e Podgorica e assume il controllo militare del territorio contro i partigiani di Tito, mentre Cattaro viene integrata nell\'OZAK.',
          'Asse',
          'Wehrmacht — Militärverwaltung Montenegro (Feldkommandantur Cetinje)'
        );
      }
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
      if (s >= 16) {
        const bTop = resolveBalkansToponym(nid, rawName, nrm, 'DFJ', s);
        return makeResult(
          'DFJ',
          bTop?.name || (s >= 19 ? `${rawName || 'Makedonija'} (Repubblica Popolare di Macedonia — FNRJ)` : `${rawName || 'Makedonija'} (Liberata dai Partigiani della NOVJ — Novembre 1944)`),
          bTop?.note || 'Novembre 1944: liberazione di Skopje e della Macedonia del Vardar nella Jugoslavia Federale.',
          s >= 21 ? 'Neutrale' : s >= 19 ? 'Comintern' : 'Alleati',
          bTop?.adminTitle || (s >= 19 ? 'Repubblica Federativa Popolare di Jugoslavia — Narodna Republika Makedonija (NRM)' : 'Demokratska Federativna Jugoslavija — Makedonija (ASNOM)')
        );
      }
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
          if (s >= 13) {
            return makeResult(
              'GER',
              nid === 'MK006' || nrm.includes('poloski') || nrm.includes('tetov')
                ? 'Prefettura di Tetovo e Gostivar (Occupazione Militare Tedesca — Wehrmacht)'
                : 'Prefettura di Dibra e Struga (Occupazione Militare Tedesca — Wehrmacht)',
              'Operazione Achse (settembre 1943): a seguito dell\'armistizio di Cassibile, la Wehrmacht assume il controllo militare diretto della Macedonia occidentale precedentemente presidiata dall\'Italia.',
              'Asse',
              'Wehrmacht — Militärbefehlshaber Albanien & Südost'
            );
          }
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
      if (s >= 16) {
        if (cntr === 'YU' || cntr === 'YUG') {
          return makeResult(
            'DFJ',
            s >= 21
              ? 'Repubblica Federativa Popolare di Jugoslavia (FNRJ — Rottura Tito-Stalin, 28 Giugno 1948)'
              : s >= 19
              ? 'Repubblica Federativa Popolare di Jugoslavia (FNRJ — Maresciallo Tito)'
              : 'Jugoslavia Federale Democratica (Demokratska Federativna Jugoslavija — Maresciallo Tito)',
            s >= 21
              ? '28 Giugno 1948 (Rottura Tito-Stalin): espulsa dal Cominform con la risoluzione di Bucarest, la Repubblica Federativa Popolare di Jugoslavia (FNRJ) guidata da Josip Broz Tito si sgancia dal blocco sovietico divenendo uno Stato socialista sovrano e non allineato.'
              : s >= 19
              ? 'Settembre 1947: Repubblica Federativa Popolare di Jugoslavia (FNRJ) guidata dal Maresciallo Josip Broz Tito.'
              : 'Dicembre 1944 - 1945: liberazione della Jugoslavia ad opera dell\'Armata di Liberazione Nazionale (NOVJ) di Tito.',
            s >= 21 ? 'Neutrale' : s >= 19 ? 'Comintern' : 'Alleati',
            s >= 19 ? 'Federativna Narodna Republika Jugoslavija (FNRJ)' : 'Demokratska Federativna Jugoslavija (DFJ)'
          );
        }
        const bTop = resolveBalkansToponym(nid, rawName, nrm, 'DFJ', s);
        return makeResult(
          'DFJ',
          bTop?.name || (s >= 19 ? 'Kosovo e Metochia (Regione Autonoma AKMO — NRS / FNRJ)' : 'Kosovo e Metohija (Liberato dai Partigiani della NOVJ — Novembre 1944)'),
          bTop?.note || 'Novembre 1944: liberazione del bacino del Kosovo.',
          s >= 21 ? 'Neutrale' : s >= 19 ? 'Comintern' : 'Alleati',
          bTop?.adminTitle || (s >= 19 ? 'Repubblica Federativa Popolare di Jugoslavia — Autonomna Kosovsko-Metohijska Oblast (AKMO)' : 'Demokratska Federativna Jugoslavija — Kosovo i Metohija')
        );
      }
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
        if (s >= 13) {
          return makeResult(
            'GER',
            'Kosovo e Metohija (Pristina / Prizren / Peć — Occupazione Militare Tedesca)',
            'Operazione Achse (settembre 1943): all\'indomani dell\'armistizio di Cassibile, la Wehrmacht disarma le truppe italiane e occupa l\'intero distretto del Kosovo e della Metohija sotto il comando militare dell\'Heeresgruppe E.',
            'Asse',
            'Wehrmacht — Militärbefehlshaber Albanien & Südost'
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
      if (s >= 16) {
        const albTop = resolveBalkansToponym(nid, rawName, nrm, 'ALB', s);
        return makeResult(
          'ALB',
          albTop?.name || (s >= 19 ? `${rawName || 'Albania'} (Repubblica Popolare d'Albania)` : `${rawName || 'Albania'} (Liberata dal Fronte di Liberazione Nazionale — Enver Hoxha)`),
          albTop?.note || (s >= 19 ? 'Settembre 1947: Repubblica Popolare d\'Albania guidata da Enver Hoxha.' : 'Novembre 1944: i partigiani dell\'UNÇ liberano Tirana e l\'Albania.'),
          s >= 19 ? 'Comintern' : 'Alleati',
          albTop?.adminTitle || (s >= 19 ? 'Republika Popullore e Shqipërisë (Enver Hoxha)' : 'Qeveria Demokratike e Shqipërisë (Enver Hoxha — UNÇ)')
        );
      }
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
        if (s >= 13) {
          return makeResult(
            'GER',
            `${bTop?.name || 'Mbretëria Shqiptare'} (Occupazione Militare Tedesca — Wehrmacht Heeresgruppe E)`,
            'Operazione Achse (settembre 1943): all\'indomani dell\'armistizio di Cassibile, la Wehrmacht disarma il IX Corpo d\'Armata italiano in Albania, occupa Tirana, Durazzo e Valona e istituisce un Consiglio Nazionale di Reggenza (Këshilli i Naltë i Regjencës guidato da Mehdi Frashëri) proclamando una formale indipendenza collaborazionista sotto occupazione germanica.',
            'Asse',
            'Wehrmacht — Militärbefehlshaber Albanien & Këshilli i Naltë i Regjencës'
          );
        }
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
        if (s >= 18) {
          const bTop = resolveBalkansToponym('EL421', rawName, nrm, 'UK', s);
          const owner = bTop?.owner || (s >= 19 ? 'GRE' : 'UK');
          return makeResult(
            owner,
            bTop?.name || (s >= 19 ? 'Rodi e Dodecaneso (Regno di Grecia — Trattato di Pace di Parigi)' : 'Rodi e Dodecaneso (Amministrazione Militare Britannica — BMA Dodecanese)'),
            bTop?.note || 'Passaggio del Dodecaneso dalla BMA britannica al Regno di Grecia (Trattato di Parigi 1947).',
            'Alleati',
            bTop?.adminTitle || 'Regno di Grecia — Governatorato del Dodecaneso'
          );
        }
        if (s === 16 || s === 17) {
          return makeResult(
            'GER',
            'Festung Rhodos e Dodecaneso (Occupazione Militare Tedesca — Campagna dell\'Egeo)',
            'Occupazione militare tedesca della Festung Rhodos e del Dodecaneso, presidiata fino alla resa del maggio 1945.',
            'Asse',
            'Wehrmacht — Festung Rhodos / Militärverwaltung Dodekanes'
          );
        }
        if (s >= 13) {
          return makeResult(
            'GER',
            'Rodi e Dodecaneso (Occupazione Militare Tedesca — Campagna dell\'Egeo)',
            'Campagna del Dodecaneso (settembre 1943): in seguito all\'armistizio di Cassibile, la divisione d\'assalto tedesca "Rhodos" (Gen. Ulrich Kleemann) cattura Rodi e disarma il comando italiano (Amm. Inigo Campioni). Guarnigioni miste italo-britanniche resistono temporaneamente a Lero, Coo e Samo prima della riconquista da parte della Wehrmacht.',
            'Asse',
            'Wehrmacht — Militärverwaltung Dodekanes (Rodos)'
          );
        }
        const top = getTop('ITA');
        return makeResult(
          'ITA',
          top.name || 'Rodi (Isole Italiane dell\'Egeo)',
          top.note || 'Regno d\'Italia — Possedimento delle Isole Italiane dell\'Egeo (Trattato di Losanna 1923)',
          s >= 6 ? 'Asse' : undefined,
          top.adminTitle || 'Provincia di Rodi'
        );
      }

      if (s >= 16) {
        const bTop = resolveBalkansToponym(nid, rawName, nrm, 'GRE', s);
        const greOwner = bTop?.owner || 'GRE';
        const greCivilFac: FactionType =
          greOwner === 'GER' ? 'Asse' : greOwner === 'DSE' ? 'Comintern' : 'Alleati';
        return makeResult(
          greOwner,
          bTop?.name || `${rawName || 'Ellas'} (Regno di Grecia Liberato)`,
          bTop?.note || 'Regno di Grecia liberato dall\'occupazione dell\'Asse nell\'autunno 1944.',
          greCivilFac,
          bTop?.adminTitle || 'Vasileion tis Ellados — Regno di Grecia'
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
              if (s >= 13) {
                return makeResult(
                  'GER',
                  `${rawName || 'Lasithi'} (Festung Kreta — Subentro Militare Tedesco alla Divisione Siena)`,
                  'Operazione Achse (settembre 1943): a seguito dell\'armistizio di Cassibile, la 22. Infanterie-Division tedesca disarma la 51ª Divisione fanteria "Siena" italiana e occupa l\'intera provincia di Lasithi, unificando Creta sotto l\'amministrazione della Festung Kreta.',
                  'Asse',
                  'Wehrmacht — Kommandant der Festung Kreta (Chania)'
                );
              }
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
        if (s >= 13) {
          const isCephalonia = nid === 'EL622' || nrm.includes('kefallin') || nrm.includes('cefalonia') || nrm.includes('argostoli');
          if (isCephalonia) {
            return makeResult(
              'GER',
              'Cefalonia e Itaca (Occupazione Militare Tedesca — Eccidio della Divisione Acqui)',
              'Settembre 1943 (Eccidio di Cefalonia): dopo l\'annuncio dell\'armistizio dell\'8 settembre, la 33ª Divisione fanteria da montagna "Acqui" (Gen. Antonio Gandin) rifiuta la resa alla 1. Gebirgs-Division tedesca. Al termine di nove giorni di sanguinosa resistenza (13-22 settembre), i tedeschi massacrano oltre 5.000 soldati e ufficiali italiani arresi.',
              'Asse',
              'Wehrmacht — Befehlshaber Südgriechenland (1. Gebirgs-Division)'
            );
          }
          const firstPhaseNote = !isIonian ? getGreeceFirstPhaseContextNote(nid) : null;
          return makeResult(
            'GER',
            isIonian
              ? `Isole Ionie (${rawName || 'Corfù, Cefalonia, Zante'} — Occupazione Militare Tedesca)`
              : `${rawName || 'Grecia Continentale ed Egeo'} (Zona Occupata dalla Wehrmacht — Subentro all'11ª Armata)`,
            isIonian
              ? 'Operazione Achse (settembre 1943): la Wehrmacht occupa le Isole Ionie dopo la resa dei presidi italiani, insediando l\'amministrazione di sicurezza germanica.'
              : firstPhaseNote
              ? `Operazione Achse (settembre 1943): le forze tedesche dell'Heeresgruppe E (Gen. Alexander Löhr) subentrano all'11ª Armata italiana. ${firstPhaseNote}`
              : 'Operazione Achse (settembre 1943): a seguito dell\'armistizio di Cassibile, le forze tedesche dell\'Heeresgruppe E (Gen. Alexander Löhr) disarmano l\'11ª Armata del Regio Esercito in Tessaglia, Epiro, Peloponneso e nelle Cicladi, assumendo il controllo militare esclusivo dell\'intera Grecia.',
            'Asse',
            'Wehrmacht — Militärverwaltung Griechenland (Heeresgruppe E)'
          );
        }
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
      // Fasce costiere di resistenza Wehrmacht (Poches de l'Atlantique & Dunkerque — risoluzione dedicata 0–22)
      if (p.REGION_KIND === 'FR_COASTAL_POCKET' || FRENCH_COASTAL_POCKET_IDS.has(nid)) {
        const resPocket = resolveFrenchCoastalPocket(nid || String(ft.id || ''), s);
        if (resPocket) return resPocket;
      }

      if (s < 6) {
        // Dipartimenti d'Oltremare (DOM-TOM)
        if (nid.startsWith('FRY')) {
          if (nid === 'FRY30' || nrm.includes('guyane') || nrm.includes('french guiana')) {
            const top = getTop('F_COL');
            return makeResult('F_COL', top.name || 'Guyane française (Cayenne)', top.note, 'Alleati', top.adminTitle || 'Colonie de la Guyane française');
          }
          if (nid === 'FRY20' || nrm.includes('martinique') || nrm.includes('fort-de-france')) {
            return makeResult('FRA', 'Martinique (Fort-de-France)', 'Colonie de la Martinique (Troisième République)', 'Alleati', 'Colonie de la Martinique — Fort-de-France');
          }
          if (nid === 'FRY10' || nrm.includes('guadeloupe') || nrm.includes('basse-terre')) {
            return makeResult('FRA', 'Guadeloupe (Basse-Terre)', 'Colonie de la Guadeloupe (Troisième République)', 'Alleati', 'Colonie de la Guadeloupe — Basse-Terre');
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

      // Step >= 9: Risoluzione geostorica granulare per tutti i 96 dipartimenti metropolitani + 5 DOM-TOM (1941–1947)
      if (s >= 9) {
        const frExt = resolveFranceProvince(nid || ft.id || rawName, s, rawName);
        if (frExt) return frExt;
      }

      // Step >= 6: Giugno 1940 (Post-Armistizio del 22 giugno 1940)
      // Dipartimenti d'Oltremare (DOM-TOM)
      if (nid.startsWith('FRY')) {
        // Step >= 12: Ralliement al CFLN (Antille 14 Luglio 1943, Guadalupa Giugno 1943, Guyana Marzo 1943)
        if (s >= 12) {
          if (nid === 'FRY30' || nrm.includes('guyane') || nrm.includes('french guiana')) {
            return makeResult(
              'FRA',
              'Guyane française (Ralliement CFLN — Comité de Salut Public de Cayenne, Marzo 1943)',
              'Nel marzo 1943 il comitato di salute pubblica di Cayenne depone il governatore pétainista René Veber e unisce la Guyana alle forze di Giraud e De Gaulle (CFLN).',
              'Alleati',
              'Comité Français de Libération Nationale (CFLN) — Colonie de la Guyane française'
            );
          }
          if (nid === 'FRY20' || nrm.includes('martinique') || nrm.includes('fort-de-france')) {
            return makeResult(
              'FRA',
              'Martinica (Ralliement CFLN — Presa della Bastiglia & Henri Hoppenot, 14 Luglio 1943)',
              'Il 14 luglio 1943, dopo l\'ammutinamento del 3° Reggimento Coloniale a Fort Desaix e la rivolta popolare, l\'ammiraglio Georges Robert rassegna i poteri al delegato del CFLN Henri Hoppenot (sbarcato dal cacciatorpediniere Le Fantasque). Reintegrate le 286 tonnellate d\'oro e mobilitata la flotta (Béarn ed Émile Bertin).',
              'Alleati',
              'Comité Français de Libération Nationale (CFLN) — Haut-Commissariat aux Antilles (Henri Hoppenot)'
            );
          }
          if (nid === 'FRY10' || nrm.includes('guadeloupe') || nrm.includes('basse-terre')) {
            return makeResult(
              'FRA',
              'Guadalupa (Ralliement CFLN — Sollevazione Popolare e Rimozione Sorin, Giugno 1943)',
              'A inizio giugno 1943 l\'insurrezione popolare e delle truppe coloniali rovescia il governatore autoritario di Vichy Constant Sorin ("L\'An Sorin"); la Guadalupa si unisce solennemente al CFLN.',
              'Alleati',
              'Comité Français de Libération Nationale (CFLN) — Colonie de la Guadeloupe'
            );
          }
          if (nid === 'FRY40' || nrm.includes('reunion')) {
            if (s >= 19) {
              return makeResult(
                'FRA',
                'La Réunion (Département d\'Outre-Mer — Quatrième République)',
                'Con la legge francese del 19 marzo 1946 (Loi de départementalisation) l\'isola di La Réunion diviene ufficialmente Département d\'Outre-Mer (DOM) della Repubblica Francese.',
                'Alleati',
                'Quatrième République — Département d\'Outre-Mer de La Réunion (Saint-Denis)'
              );
            }
            return makeResult(
              'FRA',
              'La Réunion (Ralliée à la France Libre — 28 Novembre 1942)',
              'Operazione navale del cacciatorpediniere gollista Léopard; Réunion unita alla Francia Libera.',
              'Alleati',
              'Colonie de la Réunion — France Libre'
            );
          }
          if (nid === 'FRY50' || nrm.includes('mayotte')) {
            if (s >= 19) {
              return makeResult(
                'FRA',
                'Mayotte — Territoire d\'Outre-Mer des Comores (Dzaoudzi)',
                'Con la legge francese del 9 maggio 1946 l\'arcipelago delle Comore (inclusa Mayotte) è separato amministrativamente dal Madagascar ed elevato a Territoire d\'Outre-Mer (TOM) della Quarta Repubblica nell\'Union Française, con capoluogo a Dzaoudzi.',
                'Alleati',
                'Quatrième République (Union Française) — Territoire des Comores (Dzaoudzi)'
              );
            }
            return makeResult(
              'FRA',
              'Mayotte et Archipel des Comores (Ralliement CFLN — 1943)',
              'Nel 1943, contestualmente al passaggio di poteri in Madagascar alla Francia Combattente (Gen. Paul Legentilhomme), Mayotte e le Comore rientrano sotto sovranità francese del CFLN.',
              'Alleati',
              'Comité Français de la Libération Nationale (CFLN) — Dépendance de Madagascar'
            );
          }
        }

        // Steps 6..11: Regime di Vichy nelle Antille e Guyana
        if (nid === 'FRY30' || nrm.includes('guyane') || nrm.includes('french guiana')) {
          const top = getTop('VIC_COL');
          return makeResult('VIC_COL', top.name || 'Guyane française (Cayenne — Régime de Vichy)', top.note, 'Fantoccio', top.adminTitle || 'Colonie de la Guyane française — Gouverneur René Veber');
        }
        if (nid === 'FRY20' || nrm.includes('martinique') || nrm.includes('fort-de-france')) {
          return makeResult(
            'VIC',
            'Martinica (Haut-Commissariat de Vichy — Amiral Georges Robert)',
            'Quartier generale dell\'ammiraglio Georges Robert: 286 tonnellate d\'oro della Banque de France e la flotta francese (portaerei Béarn, incrociatore Émile Bertin) sono immobilizzate sotto sorveglianza della U.S. Navy. Repressione e movimento clandestino della "Dissidence".',
            'Fantoccio',
            'Administration coloniale de l\'État français (Haut-Commissariat aux Antilles, Amiral Robert)'
          );
        }
        if (nid === 'FRY10' || nrm.includes('guadeloupe') || nrm.includes('basse-terre')) {
          return makeResult(
            'VIC',
            'Guadalupa (Régime de Vichy — Gouverneur Constant Sorin)',
            'Isolamento e razionamento sotto l\'amministrazione pétainista di Constant Sorin ("L\'An Sorin"); decine di giovani fuggono verso la vicina colonia britannica di Dominica ("La Dissidence") per arruolarsi nella Francia Libera.',
            'Fantoccio',
            'Administration coloniale de l\'État français (Gouverneur Constant Sorin)'
          );
        }
        if (s >= 11 && (nid === 'FRY40' || nrm.includes('reunion'))) {
          const top = getTop('FRA');
          return makeResult(
            'FRA',
            'La Réunion (Ralliée à la France Libre — 28 Novembre 1942)',
            'Operazione della marina francese libera: il cacciatorpediniere Léopard sbarca truppe golliste a Saint-Denis; il governatore Pierre Émile Aubert capitola e La Réunion si unisce alla Francia Libera.',
            'Alleati',
            'Colonie de la Réunion — France Libre (Gouverneur Jean Capagorry)'
          );
        }
        if (s >= 10 && (nid === 'FRY50' || nrm.includes('mayotte'))) {
          return makeResult(
            'UK',
            'Mayotte (Occupazione Britannica — Luglio 1942)',
            'Occupazione britannica dell\'isola di Mayotte e delle Comore nell\'ambito delle operazioni navali nel canale di Mozambico.',
            'Alleati',
            'British Military Administration of Mayotte'
          );
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

      // Step >= 14 (Giu 1944 - Set 1947): Overlord, Dragoon, Liberazione di Parigi, Sacca di Colmar, Tasche Atlantiche, GPRF e Quarta Repubblica
      if (s >= 14) {
        const isCorsica =
          nid === 'FRM01' ||
          nid === 'FRM02' ||
          nrm.includes('corse') ||
          nrm.includes('corsica') ||
          nrm.includes('ajaccio') ||
          nrm.includes('bastia');
        const isAtlanticPocket =
          nid === 'FR_HIST_POCHE_LORIENT' ||
          nid === 'FR_HIST_POCHE_ST_NAZAIRE' ||
          nid === 'FR_HIST_POCHE_LA_ROCHELLE' ||
          nid === 'FR_HIST_POCHE_DUNKERQUE';

        if (s >= 18) {
          return makeResult(
            'FRA',
            `${rawName || 'France'} (${s >= 19 ? 'Quatrième République' : 'GPRF — France Libérée'})`,
            s >= 19
              ? 'Territorio della Quarta Repubblica Francese nell\'assetto postbellico del settembre 1947 (Piano Monnet di ricostruzione e Trattati di Pace di Parigi con rettifiche alpine a Briga e Tenda).'
              : 'Settembre 1945: l\'intero territorio metropolitano francese (incluse le ex sacche atlantiche di Lorient, Saint-Nazaire e La Rochelle) è liberato sotto il Governo Provvisorio della Repubblica Francese (GPRF).',
            'Alleati',
            s >= 19 ? 'Quatrième République Française' : 'Gouvernement Provisoire de la République Française (GPRF)'
          );
        }

        if (s === 17) {
          if (isAtlanticPocket) {
            return makeResult(
              'GER',
              `${rawName || 'Poche Atlantique'} (Festung Atlantica — Assedio Alleato)`,
              'Aprile 1945: guarnigioni tedesche assediate dalle Forces Françaises de l\'Ouest nelle piazzeforti atlantiche di Lorient, Saint-Nazaire e La Rochelle fino alla resa del maggio 1945.',
              'Asse',
              'Deutsche Wehrmacht — Festung Atlantik'
            );
          }
          return makeResult(
            'FRA',
            `${rawName || 'France'} (GPRF — Territorio Liberato)`,
            'Aprile 1945: Francia metropolitana liberata sotto il Governo Provvisorio della Repubblica Francese (GPRF).',
            'Alleati',
            'Gouvernement Provisoire de la République Française (GPRF)'
          );
        }

        if (s === 16) {
          if (nid === 'FRF12' || nrm.includes('haut-rhin') || nrm.includes('colmar')) {
            return makeResult(
              'GER',
              'Haut-Rhin — Sacca di Colmar (Poche de Colmar — 19. Armee)',
              'Dicembre 1944: la 19ª Armata della Wehrmacht presidia la testa di ponte di Colmar in Alsazia meridionale fino al febbraio 1945.',
              'Asse',
              'Deutsche Wehrmacht — Heeresgruppe Oberrhein (Sacca di Colmar)'
            );
          }
          if (isAtlanticPocket) {
            return makeResult(
              'GER',
              `${rawName || 'Poche Atlantique'} (Festung Atlantica — Guarnigione Tedesca)`,
              'Dicembre 1944: sacca costiera atlantica presidiata dalle guarnigioni tedesche accerchiate.',
              'Asse',
              'Deutsche Wehrmacht — Festung Atlantik'
            );
          }
          if (nid === 'FRF11' || nrm.includes('bas-rhin') || nrm.includes('strasbourg')) {
            return makeResult(
              'FRA',
              'Bas-Rhin — Strasbourg Liberata (2e DB Gen. Leclerc)',
              '23 novembre 1944: la 2e Division Blindée francese del Gen. Philippe Leclerc libera Strasburgo compiendo il Giuramento di Koufra.',
              'Alleati',
              'Gouvernement Provisoire de la République Française (GPRF — Gen. Leclerc)'
            );
          }
          if (nid === 'FRF33' || nrm.includes('moselle') || nrm.includes('metz')) {
            return makeResult(
              'FRA',
              'Moselle — Metz Liberata (3ª Armata USA Gen. Patton)',
              'Novembre 1944: la 3ª Armata USA del Gen. George S. Patton espugna Metz liberando la Mosella.',
              'Alleati',
              'Gouvernement Provisoire de la République Française (GPRF — 3rd U.S. Army)'
            );
          }
          return makeResult(
            'FRA',
            `${rawName || 'France'} (GPRF — Territorio Liberato)`,
            'Dicembre 1944: territorio francese amministrato dal Governo Provvisorio della Repubblica Francese (GPRF).',
            'Alleati',
            'Gouvernement Provisoire de la République Française (GPRF)'
          );
        }

        if (s === 15) {
          const isAxisHoldout15 =
            nid === 'FRF11' ||
            nid === 'FRF12' ||
            nid === 'FRF33' ||
            nrm.includes('bas-rhin') ||
            nrm.includes('haut-rhin') ||
            nrm.includes('moselle') ||
            nrm.includes('strasbourg') ||
            nrm.includes('colmar') ||
            nrm.includes('metz');
          if (isAxisHoldout15) {
            return makeResult(
              'GER',
              `${rawName || 'Elsass-Lothringen'} (CdZ-Gebiet — Occupazione Tedesca)`,
              'Agosto 1944: Alsazia e Mosella restano ancora sotto controllo militare tedesco prima delle offensive autunnali.',
              'Asse',
              'CdZ-Gebiet — Deutsches Reich'
            );
          }
          if (nid === 'FR101' || nrm.includes('paris') || nrm.includes('parigi')) {
            return makeResult(
              'FRA',
              'Paris (Libération de Paris — 25 Août 1944)',
              '25 agosto 1944: la 2e Division Blindée del Gen. Philippe Leclerc e gli insorti delle FFI liberano Parigi; il generale Dietrich von Choltitz firma la capitolazione nella capitale alla presenza di Charles de Gaulle.',
              'Alleati',
              'Gouvernement Provisoire de la République Française (GPRF — Charles de Gaulle)'
            );
          }
          if (nid === 'FRD11' || nrm.includes('calvados') || nrm.includes('caen') || nrm.includes('falaise')) {
            return makeResult(
              'FRA',
              'Calvados (Vittoria nella Sacca di Falaise — GPRF)',
              'Agosto 1944: chiusura della Sacca di Falaise, distruzione delle armate tedesche in Normandia e piena restaurazione civile del GPRF.',
              'Alleati',
              'Gouvernement Provisoire de la République Française (GPRF)'
            );
          }
          if (
            nid === 'FRL04' ||
            nid === 'FRL05' ||
            nid.startsWith('FRL0') ||
            nrm.includes('marseille') ||
            nrm.includes('bouches-du-rhone') ||
            nrm.includes('toulon') ||
            nrm.includes('var')
          ) {
            return makeResult(
              'FRA',
              `${rawName || 'Provence'} (Operazione Dragoon — Liberazione della Provenza)`,
              '15-28 agosto 1944: Operazione Dragoon e sbarco alleato in Provenza; l\'Armée B del Gen. de Lattre de Tassigny libera Tolone e Marsiglia.',
              'Alleati',
              'Gouvernement Provisoire de la République Française (GPRF)'
            );
          }
          return makeResult(
            'FRA',
            `${rawName || 'France'} (Libérée — GPRF)`,
            'Agosto 1944: territorio liberato dall\'avanzata alleata e dalle Forces Françaises de l\'Intérieur sotto l\'autorità del GPRF.',
            'Alleati',
            'Gouvernement Provisoire de la République Française (GPRF)'
          );
        }

        // s === 14 (GIU 1944 — Overlord / D-Day & Corsica Liberata)
        const frNormandy = resolveFranceProvince(nid || ft.id || rawName, 14, rawName);
        if (frNormandy && (frNormandy.o === 'UK' || frNormandy.o === 'USA')) {
          return frNormandy;
        }
        if (isCorsica) {
          return makeResult(
            'FRA',
            `${rawName || 'Corse'} (Libérée — GPRF)`,
            'Corsica primo dipartimento metropolitano liberato, integrata sotto l\'autorità del Gouvernement Provisoire de la République Française (GPRF).',
            'Alleati',
            'Gouvernement Provisoire de la République Française (GPRF)'
          );
        }
        const topGer14 = getTop('GER');
        return makeResult(
          'GER',
          topGer14.name || `${rawName || 'France'} (Zone Occupée — Wehrmacht)`,
          'Giugno 1944: territorio francese sotto occupazione militare tedesca mentre le forze alleate consolidano le teste di ponte in Normandia.',
          'Asse',
          'Zone occupée — Militärbefehlshaber in Frankreich'
        );
      }

      // Step >= 13: Settembre 1943 — Liberazione della Corsica e Occupazione Tedesca Integrale della Francia Continentale
      if (s >= 13) {
        const isCorsica = nid === 'FRM01' || nid === 'FRM02' || nrm.includes('corse') || nrm.includes('corsica') || nrm.includes('ajaccio') || nrm.includes('bastia');
        if (isCorsica) {
          return makeResult(
            'FRA',
            `${rawName || 'Corse'} (Libération de la Corse — 1er Département Français Libéré)`,
            'Settembre 1943: all\'indomani dell\'armistizio di Cassibile, le truppe italiane del VII Corpo d\'Armata del generale Giovanni Magli cooperano attivamente con i partigiani del Fronte Nazionale corso e i commandos della Francia Libera (1er Bataillon de Choc giunto a bordo del sottomarino Casabianca), costringendo la Wehrmacht a evacuare verso Bastia. La Corsica è il primo dipartimento della Francia metropolitana liberato dal giogo dell\'Asse.',
            'Alleati',
            'Comité Français de la Libération Nationale (CFLN — Général Charles de Gaulle) / Résistance Corse & VII Corpo d\'Armata'
          );
        }
        // Francia metropolitana continentale interamente occupata dalla Wehrmacht (annessa la precedente zona italiana di Nizza e Savoia)
        const top = getTop('GER');
        return makeResult(
          'GER',
          top.name || (rawName + ' (Zone Occupée — Wehrmacht)'),
          'Operazione Achse (settembre 1943): in seguito all\'armistizio italiano, la Wehrmacht disarma la 4ª Armata del Regio Esercito e occupa direttamente anche Nizza, la Savoia e la Provenza orientale. L\'intera Francia continentale è sottoposta all\'amministrazione militare tedesca.',
          'Asse',
          'Zone occupée — Militärbefehlshaber in Frankreich'
        );
      }

      // Step >= 11: Operazione Anton (11 novembre 1942) - Fine della Zone libre metropolitana
      if (s >= 11) {
        const ITALIAN_OCC_ZONE_NUTS = new Set([
          'FRM01', 'FRM02', // Corsica (Ajaccio, Bastia)
          'FRK27', 'FRK28', // Savoie (Chambéry), Haute-Savoie (Annecy)
          'FRK24',          // Isère (Grenoble)
          'FRL02',          // Hautes-Alpes (Gap)
          'FRK23',          // Drôme (Valence)
          'FRL01',          // Basses-Alpes / Alpes-de-Haute-Provence (Digne)
          'FRL03',          // Alpes-Maritimes (Nice)
          'FRL05',          // Var (Toulon)
          'FRL06',          // Vaucluse (Avignon)
        ]);
        const isItalianZone =
          (nid && ITALIAN_OCC_ZONE_NUTS.has(nid)) ||
          nrm.includes('alpes-maritimes') ||
          nrm.includes('nice') ||
          nrm.includes('nizza') ||
          nrm.includes('toulon') ||
          nrm.includes('corse') ||
          nrm.includes('corsica') ||
          nrm.includes('savoie') ||
          nrm.includes('isere') ||
          nrm.includes('grenoble') ||
          nrm.includes('vaucluse') ||
          nrm.includes('avignon') ||
          nrm.includes('drome');

        if (isItalianZone) {
          const top = getTop('ITA');
          return makeResult(
            'ITA',
            top.name || (rawName + ' (Zona di Occupazione Militare Italiana — 4ª Armata)'),
            'Operazione Anton (novembre 1942): occupazione militare italiana della Francia sud-orientale a est del Rodano e della Corsica da parte della 4ª Armata del Gen. Mario Vercellino.',
            'Asse',
            'Zone d\'occupation italienne en France — 4ª Armata del Regio Esercito (Gen. Mario Vercellino)'
          );
        }
        // Tutta la restante Francia metropolitana occupata dalla Wehrmacht
        const top = getTop('GER');
        return makeResult(
          'GER',
          top.name || (rawName + ' (Zone Occupée — Wehrmacht)'),
          'Operazione Anton (11 novembre 1942): invasione della Zona libera metropolitana da parte della Wehrmacht e crollo del regime di Vichy come entità territoriale autonoma; autoaffondamento della flotta a Tolone (27 novembre 1942).',
          'Asse',
          'Zone occupée — Militärbefehlshaber in Frankreich (Heeresgruppe Felber)'
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

    case 'GL':
    case 'GRL':
      return resolveGreenland(s, rawName);

    case 'DEN':
    case 'DNK':
    case 'DK': {
      const isDkGreenland =
        cleanId === 'GL_GREENLAND' ||
        cleanId === 'HB_FRAG_DENMARK' ||
        cleanId === 'GL' ||
        cleanId === 'GRL' ||
        nrm.includes('greenland') ||
        nrm.includes('gronland') ||
        nrm.includes('groenland') ||
        nrm.includes('kalaallit') ||
        (c[0] >= -75 && c[0] <= -10 && c[1] >= 59 && c[1] <= 84);
      if (isDkGreenland) {
        return resolveGreenland(s, rawName);
      }

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
      return resolveDenmarkProvince(ft, s, rawName);
    }

    case 'SJ':
    case 'SJM': {
      const isJanMayen = cleanId === 'NO0B1' || nrm.includes('jan mayen') || (c[0] >= -10 && c[0] <= -7 && c[1] >= 70 && c[1] <= 72);
      return isJanMayen ? resolveJanMayen(s, rawName) : resolveSvalbard(s, rawName);
    }

    case 'NOR':
    case 'NO': {
      const isSvalbard =
        cleanId === 'NO0B2' ||
        cleanId === 'HB_FRAG_NORWAY' ||
        cleanId === 'SJ' ||
        cleanId === 'SJM' ||
        nrm.includes('svalbard') ||
        nrm.includes('spitsbergen') ||
        nrm.includes('spitzbergen') ||
        nrm.includes('longyearbyen') ||
        nrm.includes('barentsburg') ||
        (c[0] >= 10 && c[0] <= 35 && c[1] >= 74 && c[1] <= 81);
      if (isSvalbard) {
        return resolveSvalbard(s, rawName);
      }

      const isJanMayen =
        cleanId === 'NO0B1' ||
        nrm.includes('jan mayen') ||
        nrm.includes('olonkinbyen') ||
        nrm.includes('beerenberg') ||
        (c[0] >= -10 && c[0] <= -7 && c[1] >= 70 && c[1] <= 72);
      if (isJanMayen) {
        return resolveJanMayen(s, rawName);
      }

      return resolveNorwayProvince(ft, s, rawName);
    }

    case 'BEL':
    case 'BE':
      if (s >= 26) {
        return makeResult(
          'BEL',
          `${rawName || 'Belgique'} (Regno del Belgio — Delega al Principe Reale Baldovino, 11 Ago 1950 · NATO & Benelux)`,
          '31 Dicembre 1950: al culmine della crisi della Questione Reale dopo il rientro di Leopoldo III (22 luglio) e lo sciopero generale, l\'11 agosto 1950 il sovrano delega i poteri costituzionali al figlio Baldovino come Principe Reale (l\'abdicazione formale avverrà nel luglio 1951); governo Joseph Pholien nel Benelux e nella NATO.',
          'Alleati',
          'Royaume de Belgique — Principe Reale Baldovino (Delega 11 Ago 1950 · PM Joseph Pholien)'
        );
      }
      if (s >= 18) {
        const belPost = getTop('BEL');
        return makeResult(
          'BEL',
          belPost.name || rawName || 'Belgique',
          belPost.note || 'Royaume de Belgique — Territorio interamente liberato e integrato nel Benelux.',
          'Alleati',
          belPost.adminTitle || 'Royaume de Belgique / Koninkrijk België'
        );
      }
      if (s === 17) {
        return makeResult(
          'BEL',
          `${rawName || 'Belgique'} (Royaume de Belgique Liberato)`,
          'Aprile 1945: l\'intero territorio del Regno del Belgio è liberato.',
          'Alleati',
          'Royaume de Belgique / Koninkrijk België'
        );
      }
      if (s === 16) {
        const isBulgeBe =
          nid === 'BE342' ||
          nid === 'BE336' ||
          nrm.includes('bastogne') ||
          nrm.includes('eupen') ||
          nrm.includes('sankt vith');
        if (isBulgeBe) {
          return makeResult(
            'GER',
            `${rawName || 'Ardennen'} (Controffensiva delle Ardenne — Wacht am Rhein)`,
            'Dicembre 1944 (31 dic): saliente offensivo della Wehrmacht ancora formato nelle Ardenne belghe orientali (Sankt Vith, Houffalize e corridoio di Bastogne; l\'avanguardia verso Celles/Dinant è già stata accerchiata e distrutta il 27 dicembre).',
            'Asse',
            'Deutsche Wehrmacht — Heeresgruppe B'
          );
        }
        let belStep16Note = 'Dicembre 1944: territorio belga liberato sotto il Governo d\'Union Nationale.';
        if (nid === 'BE211' || nrm.includes('antwerp')) {
          belStep16Note = 'Porto di Anversa liberato nel settembre 1944 e sbloccato dopo la battaglia della Schelda per i rifornimenti alleati.';
        } else if (nid === 'BE351' || nrm.includes('dinant')) {
          belStep16Note = 'Dicembre 1944 (31 dic): l\'estrema puntata della 2. Panzer-Division fino a Celles/Foy-Notre-Dame (24 dic) alle porte di Dinant è stata accerchiata e annientata tra il 25 e il 27 dicembre dalla 2ª Divisione Corazzata USA e dalla 29ª Brigata britannica; arrondissement saldamente sotto controllo alleato.';
        } else if (nid === 'BE343' || nrm.includes('marche')) {
          belStep16Note = 'Dicembre 1944 (31 dic): linea di contenimento settentrionale alleata (84ª Div. USA e 53ª Div. britannica) ancorata su Marche-en-Famenne e Hotton lungo il margine occidentale del saliente tedesco (La Roche-en-Ardenne sul versante orientale dell\'Ourthe resta contesa fino a gennaio 1945).';
        }
        return makeResult(
          'BEL',
          `${rawName || 'Belgique'} (Territorio Liberato)`,
          belStep16Note,
          'Alleati',
          'Royaume de Belgique / Koninkrijk België'
        );
      }
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
      if (s >= 18) {
        const holPost = getTop('HOL');
        return makeResult(
          'HOL',
          holPost.name || rawName,
          holPost.note || 'Koninkrijk der Nederlanden — Territorio interamente liberato e restaurato.',
          'Alleati',
          holPost.adminTitle || 'Koninkrijk der Nederlanden (Koningin Wilhelmina — Den Haag)'
        );
      }
      if (s === 17) {
        const isFestungHolland =
          nid.startsWith('NL31') ||
          nid.startsWith('NL32') ||
          nid.startsWith('NL33') ||
          nrm.includes('amsterdam') ||
          nrm.includes('utrecht') ||
          nrm.includes('rotterdam') ||
          nrm.includes('gravenhage') ||
          nrm.includes('haarlem');
        if (isFestungHolland) {
          return makeResult(
            'GER',
            `${rawName || 'Festung Holland'} (Festung Holland — Occupazione Tedesca)`,
            'Aprile 1945: l\'Olanda occidentale resta assediata nella sacca della Festung Holland fino alla resa di Wageningen (5 maggio 1945).',
            'Asse',
            'Reichskommissariat Niederlande — Festung Holland'
          );
        }
        return makeResult(
          'HOL',
          `${rawName || 'Nederland'} (Liberata dalla 1ª Armata Canadese)`,
          'Aprile 1945: liberazione delle province olandesi settentrionali, orientali e meridionali.',
          'Alleati',
          'Koninkrijk der Nederlanden'
        );
      }
      if (s === 16) {
        const isSouthLiberated =
          nid.startsWith('NL34') ||
          nid.startsWith('NL4') ||
          nrm.includes('zeeland') ||
          nrm.includes('zeeuw') ||
          nrm.includes('brabant') ||
          nrm.includes('limburg');
        if (isSouthLiberated) {
          return makeResult(
            'HOL',
            `${rawName || 'Zuid-Nederland'} (Liberata — Battaglia della Schelda)`,
            'Autunno-Inverno 1944: Zelanda e Brabante liberati dalle forze alleate dopo la dura battaglia della Schelda.',
            'Alleati',
            'Koninkrijk der Nederlanden'
          );
        }
        return makeResult(
          'GER',
          `${rawName || 'Noord-Nederland'} (Reichskommissariat Niederlande)`,
          'Dicembre 1944: le province olandesi a nord dei grandi fiumi patiscono il blocco dei trasporti e l\'inverno della fame (Hongerwinter 1944-1945).',
          'Asse',
          'Reichskommissariat für die besetzten niederländischen Gebiete'
        );
      }
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
      if (s >= 17) {
        const luxPost = getTop('LUX');
        return makeResult(
          'LUX',
          luxPost.name || 'Grand-Duché de Luxembourg',
          luxPost.note || 'Granducato di Lussemburgo liberato e restaurato nella piena sovranità.',
          'Alleati',
          luxPost.adminTitle || 'Grand-Duché de Luxembourg'
        );
      }
      if (s === 16) {
        return makeResult(
          'GER',
          'Luxemburg (Controffensiva delle Ardenne — Wacht am Rhein)',
          'Dicembre 1944: territorio lussemburghese investito dalla controffensiva invernale della Wehrmacht nelle Ardenne.',
          'Asse',
          'Deutsche Wehrmacht — Offensiva delle Ardenne'
        );
      }
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
      return resolveIceland(s, nid || cleanId, rawName);

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
          ukProv?.adminEntity || 'Crown Dependency of the Isle of Man'
        );
      }
      if (isChannel) {
        const chKey = (nrm.includes('jersey') || nid === 'JE' || cntr === 'JE') ? 'JE' : 'GG';
        const ukProv = resolveUKProvince(chKey, s, rawName);
        if (s >= 6 && s < 18) {
          return makeResult(
            'GER',
            ukProv ? ukProv.name : 'Isole del Canale (Occupazione Tedesca)',
            ukProv ? ukProv.note : 'Militärverwaltung Kanalinseln (giu 1940)',
            'Asse',
            ukProv?.adminEntity || 'Militärverwaltung in Frankreich (Deutsche Wehrmacht / Festung Channel Islands)'
          );
        }
        return makeResult(
          'UK',
          ukProv ? ukProv.name : (getTop('UK').name || (nrm.includes('jersey') ? 'Baliato di Jersey' : 'Baliato di Guernsey')),
          ukProv ? ukProv.note : 'Dipendenza della Corona Britannica (Isole del Canale)',
          'Alleati',
          ukProv?.adminEntity || 'British Crown Dependency (Channel Islands)'
        );
      }

      // Territori speciali e basi sovrane di Cipro (Akrotiri, Dhekelia)
      if (isCyprusProvince(nid)) {
        return resolveCyprusProvince(ft, s);
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
      if (s >= 23) {
        return makeResult(
          'IRE',
          'Repubblica d\'Irlanda (Republic of Ireland Act 1948 — 18 Aprile 1949)',
          'Il 18 aprile 1949 entra in vigore il Republic of Ireland Act 1948 (approvato dal governo Costello): l\'Irlanda (Éire) assume ufficialmente la forma repubblicana sotto il Presidente Seán T. O\'Kelly ed esce formalmente dal Commonwealth britannico.',
          'Neutrale',
          'Republic of Ireland / Poblacht na hÉireann (Pres. Seán T. O\'Kelly · Taoiseach John A. Costello)'
        );
      }
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

    case 'MC':
    case 'MCO': {
      const ownerCode = s >= 16 ? 'MCO' : s >= 13 ? 'GER' : s >= 11 ? 'ITA' : 'MCO';
      const top = getExtendedToponym(rawName || 'Monaco', ownerCode, nid || 'MCO_HIST', [7.4233, 43.7367], s);
      const monacoName =
        s >= 18
          ? 'Principauté de Monaco (Souveraineté Restaurée)'
          : s >= 16
          ? top.name?.includes('Libérée')
            ? top.name
            : 'Principauté de Monaco (Libérée — Restauration Souveraine)'
          : top.name || 'Principauté de Monaco';
      const monacoFac: FactionType = s >= 18 ? 'Neutrale' : s >= 16 ? 'Alleati' : s >= 11 ? 'Asse' : 'Neutrale';
      const monacoNote =
        s >= 16
          ? 'Il 3 settembre 1944 le truppe alleate liberano Monaco dall\'occupazione tedesca; sovranità monegasca restaurata sotto Luigi II.'
          : s >= 13
          ? 'Operazione Achse (settembre 1943): le truppe tedesche della Wehrmacht occupano il Principato di Monaco, subentrando all\'occupazione italiana.'
          : s >= 11
          ? 'Operazione Anton (novembre 1942): occupazione militare italiana del Principato di Monaco.'
          : 'Principato di Monaco — Sovrano Luigi II (Stato neutrale sotto protettorato consolare francese).';
      return makeResult(
        ownerCode,
        monacoName,
        top.note || monacoNote,
        monacoFac,
        top.adminTitle || 'Principauté de Monaco'
      );
    }

    // Americhe
    case 'BR':
    case 'BRA':
    case '076':
    case 'XBR':
      if (s >= 10) {
        return makeResult(
          'BRA',
          getTop('BRA').name || 'Estados Unidos do Brasil (Belligerante Alleato)',
          'Dichiarazione di guerra del Brasile all\'Asse (22 agosto 1942): dopo gli attacchi del sommergibile U-507 contro cinque mercantili brasiliani lungo la costa di Sergipe e Bahia (15-19 agosto, oltre 600 vittime), il Presidente Getúlio Vargas dichiara lo stato di belligeranza contro Germania e Italia, mettendo le basi aeree e navali di Natal e Recife a disposizione della caccia antisommergibile alleata nell\'Atlantico meridionale.',
          'Alleati',
          'Estados Unidos do Brasil — Presidente Getúlio Vargas (Nazioni Unite / Alleati)'
        );
      }
      return makeResult('BRA', getTop('BRA').name, 'Stati Uniti del Brasile (Estado Novo)', 'Neutrale');
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
      return resolvePeru(s, ft.properties?.NAME);
    case 'CO':
    case 'COL':
    case '170':
    case 'XCO':
      if (s >= 21) {
        const isViolenciaDept =
          nrm.includes('tolima') ||
          nrm.includes('meta') ||
          nrm.includes('casanare') ||
          nrm.includes('boyac') ||
          nrm.includes('santander') ||
          nrm.includes('cundinamarca') ||
          nrm.includes('bogot');
        return makeResult(
          'COL',
          isViolenciaDept
            ? `${rawName || 'Colombia'} (Repubblica di Colombia — El Bogotazo del 9 Aprile 1948 & Scoppio de La Violencia)`
            : `${getTop('COL').name || 'Repubblica di Colombia'} (El Bogotazo & Carta dell'OSA, Aprile 1948)`,
          'Il 9 aprile 1948 l\'assassinio a Bogotà del leader popolare liberale Jorge Eliécer Gaitán (mentre è in corso la IX Conferenza Panamericana che il 30 aprile fonda l\'Organizzazione degli Stati Americani — OSA) scatena la devastante insurrezione urbana de El Bogotazo e fa precipitare la Colombia nel conflitto civile rurale de La Violencia (particolarmente acuto nei dipartimenti di Tolima, Meta, Casanare, Boyacá e Santander) sotto il governo conservatore di Mariano Ospina Pérez.',
          'Alleati',
          'República de Colombia (Presidente Mariano Ospina Pérez — Stato d\'Assedio / La Violencia)'
        );
      }
      return makeResult('COL', getTop('COL').name, 'Repubblica di Colombia');
    case 'VE':
    case 'VEN':
    case '862':
    case 'XVE':
      if (s >= 22) {
        return makeResult(
          'VEN',
          'Stati Uniti del Venezuela (Giunta Militare di Governo — Ten. Col. Carlos Delgado Chalbaud, 24 Novembre 1948)',
          'Il 24 novembre 1948 le Forze Armate venezuelane rovesciano con un colpo di Stato incruento il primo presidente eletto democraticamente a suffragio universale Rómulo Gallegos (Azione Democratica), istituendo una Giunta Militare guidata da Carlos Delgado Chalbaud, Marcos Pérez Jiménez e Luis Felipe Llovera Páez.',
          'Alleati',
          'Junta Militar de Gobierno de los Estados Unidos de Venezuela (Ten. Col. Carlos Delgado Chalbaud)'
        );
      }
      return makeResult('VEN', getTop('VEN').name, 'Stati Uniti del Venezuela');
    case 'EC':
    case 'ECU':
    case 'EC_ORI':
    case 'ECU_ORIENTE':
    case '218':
    case 'XEC':
      if (nid === 'EC_ORI' || nid === 'ECU_ORIENTE' || (ft.properties?.NAME && ft.properties.NAME.includes('Oriente'))) {
        return resolveEcuadorOriente(s, ft.properties?.NAME);
      }
      return resolveEcuador(s, ft.properties?.NAME);
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
        s >= 10
          ? 'Dichiarazione di guerra del Messico alle Potenze dell\'Asse (22 maggio 1942): dopo il siluramento delle petroliere messicane Potrero del Llano (13 maggio) e Faja de Oro (20 maggio) ad opera degli U-Boot tedeschi nel Golfo del Messico, il Presidente Manuel Ávila Camacho porta il paese in guerra al fianco degli Alleati.'
          : topMex.note || 'Stati Uniti Messicani (Presidenza Lázaro Cárdenas)',
        s >= 10 ? 'Alleati' : 'Neutrale',
        topMex.adminTitle || 'Estados Unidos Mexicanos'
      );
    }

    // Centro America & Caraibi
    case 'GT':
    case 'GTM':
    case '320':
    case 'XGT':
      return makeResult('GTM', getTop('GTM').name || 'Repubblica del Guatemala', getTop('GTM').note || 'Presidenza del Gen. Jorge Ubico', s >= 9 ? 'Alleati' : 'Neutrale', getTop('GTM').adminTitle);

    case 'SV':
    case 'SLV':
    case '222':
    case 'XSV':
      if (s >= 22) {
        return makeResult(
          'SLV',
          'Repubblica di El Salvador (Consiglio di Governo Rivoluzionario — "Golpe de los Mayores", 14 Dicembre 1948)',
          'Il 14 dicembre 1948 un colpo di Stato guidato da giovani ufficiali dell\'esercito ("Golpe de los Mayores") destituisce il generale Salvador Castaneda Castro che tentava di prolungare il proprio mandato, instaurando il Consiglio di Governo Rivoluzionario sotto il magg. Óscar Osorio e il ten. col. Manuel de Jesús Córdoba.',
          'Alleati',
          'Consejo de Gobierno Revolucionario de El Salvador (Magg. Óscar Osorio · 14 Dic 1948)'
        );
      }
      return makeResult('SLV', getTop('SLV').name || 'Repubblica di El Salvador', getTop('SLV').note || 'Governo del Gen. Maximiliano Hernández Martínez', s >= 9 ? 'Alleati' : 'Neutrale', getTop('SLV').adminTitle);

    case 'HN':
    case 'HND':
    case '340':
    case 'XHN':
      return makeResult('HND', getTop('HND').name || 'Repubblica dell\'Honduras', getTop('HND').note || 'Presidenza del Gen. Tiburcio Carías Andino (El Cariato)', s >= 9 ? 'Alleati' : 'Neutrale', getTop('HND').adminTitle);

    case 'NI':
    case 'NIC':
    case '558':
    case 'XNI':
      return makeResult('NIC', getTop('NIC').name || 'Repubblica del Nicaragua', getTop('NIC').note || 'Governo del Gen. Anastasio Somoza García', s >= 9 ? 'Alleati' : 'Neutrale', getTop('NIC').adminTitle);

    case 'CR':
    case 'CRI':
    case '188':
    case 'XCR':
      if (s >= 21) {
        return makeResult(
          'CRI',
          'Repubblica di Costa Rica (Giunta Fondatrice della Seconda Repubblica — José Figueres Ferrer, 8 Maggio 1948)',
          'Tra il 12 marzo e il 24 aprile 1948 la Guerra Civile di Costa Rica (scatenata dall\'annullamento delle presidenziali vinte da Otilio Ulate) vede la vittoria dell\'Esercito di Liberazione Nazionale guidato da José "Don Pepe" Figueres Ferrer contro il governo di Teodoro Picado; l\'8 maggio 1948 si insedia a San José la Giunta Fondatrice della Seconda Repubblica presieduta da Figueres Ferrer, che avvia riforme sociali storiche e l\'abolizione delle forze armate.',
          'Neutrale',
          'Junta Fundadora de la Segunda República de Costa Rica (Presidente José Figueres Ferrer)'
        );
      }
      return makeResult('CRI', getTop('CRI').name || 'Repubblica di Costa Rica', getTop('CRI').note || 'Repubblica Costituzionale di Costa Rica', s >= 9 ? 'Alleati' : 'Neutrale', getTop('CRI').adminTitle);

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
      return makeResult('PAN', getTop('PAN').name || 'Repubblica di Panama', getTop('PAN').note || 'Repubblica di Panama', s >= 9 ? 'Alleati' : 'Neutrale', getTop('PAN').adminTitle);
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
      return makeResult('CUB', getTop('CUB').name || 'Repubblica di Cuba', getTop('CUB').note || 'Repubblica di Cuba', s >= 9 ? 'Alleati' : 'Neutrale', getTop('CUB').adminTitle);
    }

    case 'DO':
    case 'DOM':
    case '214':
    case 'XDO':
      return makeResult('DOM', getTop('DOM').name || 'Repubblica Dominicana', getTop('DOM').note || 'Dittatura del Generalissimo Trujillo', s >= 9 ? 'Alleati' : 'Neutrale', getTop('DOM').adminTitle);

    case 'HT':
    case 'HTI':
    case 'HAI':
    case '332':
    case 'XHT':
      return makeResult('HAI', getTop('HAI').name || 'Repubblica di Haiti', getTop('HAI').note || 'Présidence Sténio Vincent / Élie Lescot', s >= 9 ? 'Alleati' : 'Neutrale', getTop('HAI').adminTitle);

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
      if (s >= 15 && (cntr === 'GU' || cntr === 'GUM' || cntr === '316' || cntr === 'XGU' || nrm.includes('guam'))) {
        return makeResult(
          'USA',
          'Guam (Isole Marianne — Base Aeronavale USA per B-29 Superfortress)',
          'Luglio-Agosto 1944: riconquista anfibia di Guam da parte dei Marines e dell\'Esercito USA (21 luglio - 10 agosto 1944); trasformazione in base strategica per i bombardieri B-29 Superfortress e quartier generale del Pacifico.',
          'Alleati',
          'United States Navy / XX Bomber & XXI Bomber Command (Guam)'
        );
      }
      if (s >= 18 && (nrm.includes('wake') || nid.includes('WAKE'))) {
        return makeResult(
          'USA',
          s >= 19
            ? 'Wake Island (Territorio Non Incorporato USA — Civil Aeronautics Administration)'
            : 'Wake Island (Resa Giapponese del 4 Settembre 1945 — Ritorno agli USA)',
          s >= 19
            ? 'Al 30 settembre 1947 l\'atollo di Wake opera come strategico scalo transpacifico dell\'aviazione civile e navale degli Stati Uniti (CAA / U.S. Navy).'
            : 'Il 4 settembre 1945 il contrammiraglio Shigematsu Sakaibara firma la resa della guarnigione giapponese di Wake Island dinanzi al generale dei Marines Lawson H. M. Sanderson.',
          'Alleati',
          'United States Navy / Civil Aeronautics Administration — Wake Island'
        );
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
      if (s >= 26) {
        return makeResult(
          'NEP',
          'Regno del Nepal (Crisi di Re Tribhuvan Nov 1950 & Offensiva del Congresso nel Terai)',
          '31 Dicembre 1950 (Regno del Nepal): nel novembre 1950 Re Tribhuvan si rifugia in India mentre la Mukti Sena del Congresso Nepalese conquista piazzeforti nel Terai (Birgunj, Biratnagar, Jhapa) contro il regime Rana del Primo Ministro Mohan Shumsher.',
          'Neutrale',
          'Regno del Nepal (Regime Rana · Re Tribhuvan in Esilio · Insurrezione Terai Nov 1950)'
        );
      }
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
    case 'SIA': {
      const thProv = p.REGION_KIND === 'THAILAND_PROVINCE' ? (p.NUTS_NAME || p.NAME_LATN || p.name || '') : '';
      const thPrefix = thProv ? `${thProv} — ` : '';
      if (s >= 18) {
        return makeResult(
          'SIA',
          `${thPrefix}${
            s >= 19
              ? 'Regno di Thailandia (Ratcha-anachak Thai — Post-Trattato di Washington & ONU)'
              : 'Regno di Thailandia (Governo di Pace Seri Thai — Settembre 1945)'
          }`,
          s >= 19
            ? 'Al 30 settembre 1947 la Thailandia (membro ONU dal dicembre 1946) ha restituito i territori annessi in guerra a Francia (Battambang, Siem Reap, Champassak, Sayaboury — Trattato di Washington) e Regno Unito (stati malesi e Shan).'
            : 'Settembre 1945: dopo la resa giapponese il Reggente Pridi Banomyong e il P.M. Seni Pramoj guidano il governo Seri Thai, dichiarando nulla la dichiarazione di guerra del 1942 e avviando la restituzione dei territori occupati.',
          'Neutrale',
          s >= 19
            ? 'Ratcha-anachak Thai — Re Bhumibol Adulyadej (Rama IX)'
            : 'Ratcha-anachak Thai — Governo Seri Thai (Reggente Pridi Banomyong / P.M. Seni Pramoj)'
        );
      }
      if (s >= 9) {
        return makeResult(
          'SIA',
          thProv ? `${thProv} — Ratcha-anachak Thai (Alleanza con il Giappone)` : (getTop('SIA').name || 'Ratcha-anachak Thai (Regno di Thailandia — Alleanza con il Giappone)'),
          'Dopo gli sbarchi giapponesi dell\'8 dicembre 1941 a Singora, Pattani e Prachuap Khiri Khan, il governo del Maresciallo Plaek Phibunsongkhram ordina l\'armistizio, concede il libero transito alle armate giapponesi verso Malesia e Birmania e il 21 dicembre 1941 firma a Bangkok il Trattato formale di Alleanza militare con Tokyo.',
          'Asse',
          'Ratcha-anachak Thai — Maresciallo Plaek Phibunsongkhram (Alleato dell\'Asse)'
        );
      }
      return makeResult(
        'SIA',
        thProv
          ? `${thProv} — ${s <= 4 ? 'Regno del Siam (Sayam)' : 'Regno di Thailandia'}`
          : (s <= 4 ? 'Regno del Siam (Sayam)' : 'Regno di Thailandia (Ratcha-anachak Thai)'),
        s <= 4
          ? 'Regno del Siam (Sayam — Reggenza per Re Ananda Mahidol).'
          : 'Regno di Thailandia (Ratcha-anachak Thai dal 24 giugno 1939 — Rathaniyom n. 1).',
        'Neutrale',
        s <= 4 ? 'Prathet Sayam (Regno del Siam)' : 'Ratcha-anachak Thai (Regno di Thailandia)'
      );
    }
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
      if (s >= 18) {
        return makeResult(
          'CHI',
          'Taiwan / Provincia di Taiwan (Repubblica di Cina — Restituzione)',
          '25 ottobre 1945: il governatorato giapponese di Formosa si arrende alle autorità della Repubblica di Cina; retrocessione di Taiwan e delle Pescadores alla sovranità cinese.',
          'Alleati',
          'Zhōnghuá Mínguó — Táiwān Shěng (Taipei)'
        );
      }
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
      if (cntr === 'MP' || cntr === 'MNP' || nrm.includes('saipan') || nrm.includes('tinian') || nrm.includes('mariana')) {
        if (s >= 14) {
          return makeResult(
            'USA',
            s === 14
              ? 'Saipan (Battaglia di Saipan — 15 Giugno 1944, Operazione Forager)'
              : 'Saipan e Marianne Settentrionali (Basi Strategiche USA per B-29 Superfortress)',
            s === 14
              ? 'Il 15 giugno 1944 le forze anfibie statunitensi sbarcano a Saipan (Operazione Forager) spezzando la cintura difensiva interna giapponese nelle Marianne.'
              : 'Estate 1944 - 1947: le Isole Marianne (Saipan, Tinian) ospitano i grandi aeroporti della XXI Bomber Command per i bombardieri pesanti B-29 Superfortress contro il Giappone.',
            'Alleati',
            'U.S. Pacific Ocean Areas — Northern Mariana Islands (Saipan / Tinian)'
          );
        }
      }
      if (cntr === 'PW' || cntr === 'PLW' || cntr === '585' || nrm.includes('palau') || nrm.includes('peleliu')) {
        if (s >= 16) {
          return makeResult(
            'USA',
            'Palau e Peleliu (Presidio Statunitense nel Pacifico Occidentale)',
            'Settembre-Novembre 1944: dopo l\'aspra battaglia di Peleliu (15 settembre - 27 novembre 1944, Operazione Stalemate II), gli Stati Uniti assumono il controllo delle isole principali e degli aeroporti di Palau.',
            'Alleati',
            'U.S. Pacific Ocean Areas — Palau Islands (Peleliu / Angaur)'
          );
        }
      }
      if ((cntr === 'MH' || cntr === 'MHL' || cntr === '584' || nrm.includes('marshall') || nrm.includes('kwajalein')) && s >= 14) {
        return makeResult(
          'USA',
          'Isole Marshall (Kwajalein / Eniwetok — Basi Navali USA)',
          'Febbraio 1944: conquista statunitense di Kwajalein ed Eniwetok (Operazione Flintlock) e installazione di grandi basi logistiche della U.S. Navy.',
          'Alleati',
          'U.S. Pacific Ocean Areas — Marshall Islands'
        );
      }
      if ((cntr === 'FM' || cntr === 'FSM' || cntr === '583' || nrm.includes('micronesia') || nrm.includes('carolin')) && s >= 18) {
        return makeResult(
          'USA',
          'Isole Caroline / Micronesia (Trust Territory of the Pacific Islands)',
          'Resa delle guarnigioni giapponesi di Truk (Chuuk), Yap e Ponape e amministrazione fiduciaria statunitense del Pacifico.',
          'Alleati',
          'U.S. Navy — Trust Territory of the Pacific Islands'
        );
      }
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
      return makeResult(
        'NZL',
        s >= 20
          ? `${getTop('NZL').name || 'Nuova Zelanda'} (Sovranità Legislativa Piena — Statute of Westminster Adoption Act, 25 Nov 1947)`
          : getTop('NZL').name,
        s >= 20
          ? 'Il 25 novembre 1947 il Parlamento di Wellington approva lo Statute of Westminster Adoption Act 1947 (sotto il Primo Ministro laburista Peter Fraser), conferendo alla Nuova Zelanda la piena sovranità legislativa e l\'indipendenza costituzionale dal Parlamento britannico nell\'ambito del Commonwealth.'
          : 'Dominion della Nuova Zelanda',
        'Alleati',
        s >= 20
          ? 'New Zealand — Sovereign Realm of the Commonwealth (PM Peter Fraser · Statute of Westminster Adoption Act 1947)'
          : 'Dominion of New Zealand'
      );
    case 'SAF':
    case 'ZA':
      if (s >= 21) {
        return makeResult(
          'SAF',
          'Unione Sudafricana (Vittoria del Partito Nazionale di D.F. Malan & Avvio dell\'Apartheid — Maggio–Giugno 1948)',
          'Nelle elezioni generali del 26 maggio 1948 il Partito Nazionale (Herenigde Nasionale Party) guidato dal pastore nazionalista afrikaner Daniel François Malan sconfigge il maresciallo Jan Smuts; il 4 giugno 1948 Malan assume la carica di Primo Ministro a Pretoria inaugurando ufficialmente la dottrina di segregazione razziale istituzionalizzata dell\'Apartheid.',
          'Alleati',
          'Union of South Africa / Unie van Suid-Afrika (Prime Minister D.F. Malan · National Party)'
        );
      }
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
      if (s >= 21) {
        return makeResult(
          'IRQ',
          "Al-Mamlakah al-‘Irāqiyyah (Regno dell'Iraq — Intervento in Palestina & Rivolta di al-Wathbah, Giugno 1948)",
          "Gennaio–Giugno 1948: dopo l'insurrezione popolare di Baghdad (al-Wathbah, gennaio 1948) che costringe alle dimissioni Salih Jabr e fa naufragare il Trattato anglo-iracheno di Portsmouth, il 15 maggio 1948 il Regno dell'Iraq invia un corpo di spedizione di 15.000 uomini in Palestina, che al 30 giugno 1948 (Prima Tregua ONU) presidia il triangolo strategico della Samaria (Nablus, Jenin e Tulkarm).",
          'Neutrale',
          "Al-Mamlakah al-'Irāqiyyah — Re Faysal II · Reggente 'Abd al-Ilah · P.M. Muzahim al-Pachachi (Giugno 1948)"
        );
      }
      if (s >= 20) {
        return makeResult(
          'IRQ',
          "Al-Mamlakah al-‘Irāqiyyah (Regno dell'Iraq — Dicembre 1947)",
          "Dicembre 1947: il governo iracheno del Primo Ministro Salih Jabr e del Reggente 'Abd al-Ilah guida al vertice della Lega Araba del Cairo la linea contro la spartizione della Palestina (Ris. ONU 181), avviando parallelamente negoziati segreti con Londra per la revisione del trattato anglo-iracheno.",
          'Neutrale',
          "Al-Mamlakah al-'Irāqiyyah — Re Faysal II · Reggente 'Abd al-Ilah · P.M. Salih Jabr (Dic. 1947)"
        );
      }
      if (s >= 19) {
        return makeResult(
          'IRQ',
          'Al-Mamlakah al-‘Irāqiyyah (Regno dell\'Iraq — Sovranità Costituzionale, Baghdad)',
          'Regno Hashemita dell\'Iraq pienamente sovrano dopo la fine dell\'occupazione militare bellica PAIFORCE (1946). Governato dal Reggente \'Abd al-Ilah per conto di Re Faysal II e dal Primo Ministro Salih Jabr, membro fondatore della Lega Araba e dell\'ONU.',
          'Neutrale',
          'Al-Mamlakah al-\'Irāqiyyah — Re Faysal II · Reggente \'Abd al-Ilah · P.M. Salih Jabr'
        );
      }
      if (s >= 18) {
        return makeResult(
          'UK',
          "Regno dell'Iraq — Smobilitazione Postbellica PAIFORCE (Settembre 1945)",
          "Settembre 1945: a guerra conclusa il governo del Reggente 'Abd al-Ilah e del P.M. Hamdi al-Pachachi — membro fondatore dell'ONU e della Lega Araba — avvia la smobilitazione progressiva della Persia and Iraq Force (PAIFORCE) dalle basi di Baghdad, Bassora e Habbaniya.",
          'Alleati',
          "Al-Mamlakah al-'Irāqiyyah — Reggente 'Abd al-Ilah & British PAIFORCE (Settembre 1945)"
        );
      }
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
      if (s >= 21) {
        return makeResult(
          'EGY',
          "Al-Mamlakah al-Miṣriyyah (Regno d'Egitto — Intervento in Palestina & Prima Tregua ONU, Giugno 1948)",
          "15 Maggio – 30 Giugno 1948: il Regno d'Egitto di Re Faruq I e del Primo Ministro Mahmoud an-Nukrashi Pasha guida l'intervento della Lega Araba nella guerra di Palestina; al 30 giugno 1948 (Prima Tregua ONU) il corpo di spedizione egiziano controlla la fascia costiera di Gaza e Majdal fino a Isdud nonché Beersheba e l'asse del Negev.",
          'Neutrale',
          "Al-Mamlakah al-Miṣriyyah (Regno d'Egitto — Re Faruq I · P.M. Mahmoud an-Nukrashi Pasha, Giugno 1948)"
        );
      }
      if (s >= 20) {
        return makeResult(
          'EGY',
          "Al-Mamlakah al-Miṣriyyah (Regno d'Egitto — Vertice del Cairo, Dicembre 1947)",
          "Dicembre 1947: il Cairo ospita il vertice straordinario della Lega Araba (8–17 dicembre 1947) contro la Risoluzione ONU 181; dopo lo stallo al Consiglio di Sicurezza ONU, la guarnigione britannica resta confinata alla Zona del Canale di Suez mentre il governo Nukrashi affronta forti tensioni nazionaliste.",
          'Neutrale',
          "Al-Mamlakah al-Miṣriyyah (Regno d'Egitto — Re Faruq I · P.M. Mahmoud an-Nukrashi Pasha, Dic. 1947)"
        );
      }
      if (s >= 19) {
        return makeResult(
          'EGY',
          "Al-Mamlakah al-Miṣriyyah (Regno d'Egitto — Sovranità & Crisi del Canale di Suez)",
          "Dopo il completamento del ritiro britannico dal Cairo e dal Delta del Nilo nella sola Zona del Canale di Suez (marzo 1947), il governo di Mahmoud an-Nukrashi Pasha porta la controversia anglo-egiziana davanti al Consiglio di Sicurezza dell'ONU (luglio-settembre 1947).",
          'Neutrale',
          "Al-Mamlakah al-Miṣriyyah (Regno d'Egitto — Re Faruq I · P.M. Mahmoud an-Nukrashi Pasha)"
        );
      }
      return makeResult('EGY', "Regno d'Egitto", "Sfera Britannica (Trattato Anglo-Egiziano 1936)", 'Alleati', "Regno d'Egitto (Re Faruq I)");
    case 'JO':
    case 'JOR':
    case '400':
      if (s >= 21) {
        return makeResult(
          'JOR',
          'Regno Hashemita di Transgiordania (Controllo della Cisgiordania, Latrun e Gerusalemme Est — Giugno 1948)',
          "15 Maggio – 30 Giugno 1948: nominato Comandante supremo delle forze arabe, Re Abd Allah I invia la Legione Araba (guidata da Glubb Pasha) oltre il Giordano; al 30 giugno 1948 (Prima Tregua ONU) la Transgiordania controlla la Giudea e la Samaria (Cisgiordania), il saliente fortificato di Latrun e la Città Vecchia di Gerusalemme Est (espugnata il 28 maggio 1948).",
          'Neutrale',
          'Regno Hashemita di Transgiordania (Re Abd Allah I bin al-Husayn & Glubb Pasha — Giugno 1948)'
        );
      }
      if (s >= 20) {
        return makeResult(
          'JOR',
          'Regno Hashemita di Transgiordania (Amman — Dicembre 1947)',
          "Dicembre 1947: il Regno Hashemita di Re Abd Allah I — dotato della Legione Araba guidata da Glubb Pasha — bilancia l'adesione formale al vertice della Lega Araba del Cairo con la tutela degli interessi hashemiti nella Cisgiordania araba dopo la Risoluzione ONU 181.",
          'Neutrale',
          'Regno Hashemita di Transgiordania (Re Abd Allah I bin al-Husayn & Glubb Pasha — Dic. 1947)'
        );
      }
      if (s >= 19) {
        return makeResult(
          'JOR',
          'Regno Hashemita di Transgiordania (Sovereign Kingdom — Amman)',
          'Il 25 maggio 1946 la Transgiordania diviene pienamente indipendente come Regno Hashemita di Transgiordania sotto Re Abd Allah I ibn Husayn. Le forze della Legione Araba (al-Jaysh al-Arabi) sono addestrate e guidate da Glubb Pasha (Sir John Bagot Glubb). Stato sovrano arabo firmatario del Trattato di Londra (1946).',
          'Neutrale',
          'Regno Hashemita di Transgiordania (Re Abd Allah I bin al-Husayn & Glubb Pascià)'
        );
      }
      return makeResult('UK', 'Emirato di Transgiordania', 'Mandato Britannico');
    case 'KW':
    case 'KWT':
    case '414':
      return makeResult(
        'UK',
        'Sheikhdom of Kuwait (Protettorato Britannico — Al-Kuwait)',
        `Sceiccato del Kuwait sotto l'Emiro Ahmad Al-Jaber Al-Sabah; dal giugno 1946 avviate le esportazioni commerciali di greggio da Burgan (KOC).${s >= 19 ? " Dopo l'indipendenza indiana (agosto 1947), l'Agenzia Politica risponde al Foreign Office di Londra via Manama." : ''}`,
        s >= 4 ? 'Alleati' : 'Neutrale',
        'British Persian Gulf Residency — Political Agency Kuwait'
      );
    case 'QA':
    case 'QAT':
    case '634':
      return makeResult(
        'UK',
        'Sheikhdom of Qatar (Protettorato Britannico — Doha)',
        `Protettorato britannico del Qatar (Trattato Anglo-Qatariota del 1916) sotto l'Emiro Abdullah bin Jassim Al Thani.${s >= 19 ? ' Sotto giurisdizione del Foreign Office tramite la Residency di Manama dal 1947.' : ''}`,
        s >= 4 ? 'Alleati' : 'Neutrale',
        'British Persian Gulf Residency — Qatar'
      );
    case 'AE':
    case 'ARE':
    case '784':
      return makeResult(
        'UK',
        'Trucial States / Trucial Oman (Stati della Tregua — Sharjah & Dubai)',
        `I sette emirati della Costa della Tregua sotto protettorato britannico e base strategica RAF Sharjah.${s >= 19 ? ' Coordinamento del Foreign Office tramite la Residency di Manama dal 1947.' : ''}`,
        s >= 4 ? 'Alleati' : 'Neutrale',
        'British Political Residency — Trucial States'
      );
    case 'OM':
    case 'OMN':
    case '512':
      return makeResult(
        'UK',
        'Sultanate of Muscat and Oman (Protettorato & Sfera Britannica — Mascate)',
        `Sultanato di Mascate e Oman sotto il Sultano Said bin Taimur (Trattato di Seeb del 1920), legato alla Corona britannica.${s >= 19 ? " Dall'agosto 1947 il Consolato/Agenzia Politica di Mascate dipende dal Foreign Office britannico." : ''}`,
        s >= 4 ? 'Alleati' : 'Neutrale',
        'Sultanate of Muscat and Oman (British Agency — Muscat)'
      );
    case 'BH':
    case 'BHR':
    case '048':
      return makeResult(
        'UK',
        'Sheikhdom of Bahrain (British Persian Gulf Residency — Manama)',
        `Protettorato britannico del Bahrein (Salman bin Hamad Al Khalifa); dal 1946 Manama ospita la British Political Residency nel Golfo Persico.${s >= 19 ? " Dall'agosto 1947 sede diretta del Foreign Office per tutto il Golfo." : ''}`,
        s >= 4 ? 'Alleati' : 'Neutrale',
        'British Political Residency in the Persian Gulf (Manama)'
      );

    case 'LR':
    case 'LBR':
    case '430':
    case 'XLR':
      if (s >= 19) {
        return makeResult('LBR', 'Repubblica di Liberia (Monrovia — Presidenza William V.S. Tubman)', 'Repubblica sovrana dell\'Africa occidentale, membro fondatore dell\'ONU; politica Open Door e Porto Franco di Monrovia.', 'Neutrale', 'Repubblica di Liberia (Presidente William V.S. Tubman)');
      }
      if (s >= 14) {
        return makeResult('LBR', 'Repubblica di Liberia (Monrovia — Belligerante Alleato)', 'Il 27 gennaio 1944 la Liberia del Presidente William V.S. Tubman dichiara guerra all\'Asse.', 'Alleati', 'Repubblica di Liberia (Presidente William V.S. Tubman)');
      }
      return makeResult('LBR', getTop('LBR').name || 'Repubblica di Liberia', 'Stato Indipendente Africano', 'Neutrale', 'Repubblica di Liberia (Presidente Edwin Barclay)');
    case 'ETH':
    case 'ET':
      if (s >= 19) {
        return makeResult(
          'ETH',
          "Impero d'Etiopia (Addis Abeba — Sovranità Restaurata, Negus Hailé Selassié I)",
          "Impero d'Etiopia pienamente indipendente e membro fondatore delle Nazioni Unite sotto l'Imperatore Hailé Selassié I; con il Trattato di Pace di Parigi (15 settembre 1947, Articoli 23 e 33-38) l'Italia riconosce definitivamente la sovranità etiopica.",
          'Neutrale',
          "Ye’Ityōṗṗyā Nigūsa Negest Mengist — Imperatore Hailé Selassié I (Addis Abeba)"
        );
      }
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
      if (s >= 12) {
        return makeResult(
          'FRA',
          s >= 19 ? 'Guyane française (Département d\'Outre-Mer — Quatrième République)' : 'Guyane française (Ralliée al CFLN / GPRF)',
          s >= 19 ? 'Dipartimento d\'Oltremare francese (Loi de départementalisation du 19 mars 1946).' : 'Nel marzo 1943 la Guyana francese rovescia Vichy e si unisce al CFLN.',
          'Alleati',
          s >= 19 ? 'Quatrième République — Guyane (Cayenne)' : 'Comité Français de Libération Nationale (CFLN)'
        );
      }
      return s < 6
        ? makeResult('F_COL', 'Guiana Francese')
        : makeResult('VIC_COL', 'Guiana Francese', 'Amministrazione di Vichy', 'Fantoccio');

    case 'EH':
      if (s >= 19) {
        return makeResult(
          'SPA',
          'África Occidental Española — Sáhara Español (Villa Cisneros / Cabo Juby)',
          'Gobierno del África Occidental Española (Decreto del 20 luglio 1946)',
          'Neutrale',
          'Gobierno del África Occidental Española (Sidi Ifni)'
        );
      }
      return makeResult(
        s === 0 ? 'SPR' : 'SPA',
        'Sahara Spagnolo (Río de Oro)',
        s === 0 ? 'Fronte Popolare' : 'Bando Nacional',
        s >= 18 ? 'Neutrale' : undefined
      );
    case 'GQ':
      if (s >= 19) {
        return makeResult(
          'SPA',
          'Territorios Españoles del Golfo de Guinea (Santa Isabel / Bata)',
          'Colonia spagnola del Golfo di Guinea (Governatore Juan María Bonelli Rubio)',
          'Neutrale',
          'Estado Español — Gobernador del Golfo de Guinea'
        );
      }
      return makeResult(
        s === 0 ? 'SPR' : 'SPA',
        'Guinea Spagnola',
        s === 0 ? 'Fronte Popolare' : 'Bando Nacional',
        s >= 18 ? 'Neutrale' : undefined
      );

    case 'MA':
    case 'MAR':
    case '504':
    case 'XMA':
    case 'FR_MOROCCO': {
      if (s >= 19) {
        return makeResult(
          'FRA',
          'Protectorat Français du Maroc (Union Française — Rabat)',
          'Protettorato francese del Marocco nella Quarta Repubblica e nell\'Union Française; svolta indipendentista con il Discorso di Tangeri del Sultano Mohammed V (10 aprile 1947) sotto il Résident Général Alphonse Juin.',
          'Alleati',
          'Quatrième République (Union Française) — Résidence Générale au Maroc (Rabat · Gén. Alphonse Juin)'
        );
      }
      if (s >= 11) {
        return makeResult(
          'FRA',
          'Protectorat du Maroc (Liberazione Alleata — Operazione Torch)',
          'Operazione Torch (8-11 novembre 1942): le forze della Western Task Force americana (Gen. Patton) sbarcano a Casablanca, Safi e Port-Lyautey; con il cessate il fuoco dell\'ammiraglio Darlan, il Marocco francese si unisce agli Alleati.',
          'Alleati',
          'Protectorat français au Maroc — Commandement Français Civil et Militaire (Général Charles Noguès)'
        );
      }
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
      if (s >= 18) {
        return makeResult(
          'TANGER',
          'Zone Internationale de Tanger (Amministrazione Internazionale Restaurata)',
          'L\'11 ottobre 1945 le truppe spagnole di Franco evacuano la città su intimazione delle potenze alleate: viene restaurato il regime di amministrazione internazionale (Comitato di Controllo internazionale)',
          'Neutrale'
        );
      }
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
      if (s >= 19) {
        return makeResult(
          'UK',
          'British Somaliland Protectorate (Hargeisa & Berbera — BMA)',
          'Nel dopoguerra il Protettorato della Somalia Britannica è retto dalla British Military Administration (Hargeisa e Berbera), con l\'avvio di consigli consultivi locali prima del ritorno al Colonial Office.',
          'Alleati',
          'British Military Administration of Somaliland (Governor Brig. Sir Gerald Fisher)'
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
        const ukMan = resolveUKProvince('IM', s, rawName);
        return ukMan || makeResult(
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
        const chKey = (nrm.includes('jersey') || nid === 'JE') ? 'JE' : 'GG';
        const ukCh = resolveUKProvince(chKey, s, rawName);
        if (ukCh) return ukCh;
        if (s >= 6 && s < 18) {
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
        if (s >= 19) {
          return makeResult('LBR', 'Repubblica di Liberia (Monrovia — Presidenza William V.S. Tubman)', 'Repubblica sovrana dell\'Africa occidentale, membro fondatore dell\'ONU; politica Open Door e Porto Franco di Monrovia.', 'Neutrale', 'Repubblica di Liberia (Presidente William V.S. Tubman)');
        }
        if (s >= 14) {
          return makeResult('LBR', 'Repubblica di Liberia (Monrovia — Belligerante Alleato)', 'Il 27 gennaio 1944 la Liberia del Presidente William V.S. Tubman dichiara guerra all\'Asse.', 'Alleati', 'Repubblica di Liberia (Presidente William V.S. Tubman)');
        }
        return makeResult('LBR', getTop('LBR').name || 'Repubblica di Liberia', 'Stato Indipendente Africano', 'Neutrale', 'Repubblica di Liberia (Presidente Edwin Barclay)');
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
        nid === 'SA' ||
        nid.startsWith('SA_') ||
        nid.startsWith('SA-') ||
        nid.startsWith('SAU') ||
        /^SA\d/.test(nid) ||
        nid.startsWith('NT') ||
        nid === 'KSA' ||
        nid === '682' ||
        nid === '536'
      ) {
        return makeResult('SAU', getTop('SAU').name || rawName || 'Regno dell\'Arabia Saudita', s >= 19 ? 'Regno sovrano dell\'Arabia Saudita (Malik Abdulaziz Al Saud), membro fondatore di ONU e Lega Araba; espansione ARAMCO nell\'Hasa.' : 'Regno dell\'Arabia Saudita', 'Neutrale');
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
        return makeResult('IRN', getTop('IRN').name || rawName || 'Impero dell\'Iran (Persia)', 'Impero dell\'Iran (Persia)', 'Neutrale');
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
        if (s >= 19) {
          return makeResult(
            'IRQ',
            'Al-Mamlakah al-‘Irāqiyyah (Regno dell\'Iraq — Sovranità Costituzionale, Baghdad)',
            'Regno Hashemita dell\'Iraq pienamente sovrano dopo la fine dell\'occupazione militare PAIFORCE (1946), sotto il Reggente \'Abd al-Ilah per Re Faysal II e il Primo Ministro Salih Jabr.',
            'Neutrale',
            'Al-Mamlakah al-\'Irāqiyyah — Re Faysal II · Reggente \'Abd al-Ilah · P.M. Salih Jabr'
          );
        }
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
        if (s >= 19) {
          return makeResult(
            'FRA',
            'Afrique du Nord Française (Union Française & Quatrième République)',
            'Algeria (Statut Organique de l\'Algérie del 20 settembre 1947 sotto la Quarta Repubblica) e Protettorati di Tunisia (Jean Mons / Lamine Bey) e Marocco (Alphonse Juin / Mohammed V) nell\'Union Française.',
            'Alleati',
            'Quatrième République (Union Française) — Afrique du Nord Française'
          );
        }
        if (s >= 11) {
          return makeResult(
            'FRA',
            rawName ? `${rawName} (Rallié aux Alliés — Operazione Torch)` : 'Afrique du Nord Française (Alleati)',
            'A seguito dell\'Operazione Torch (novembre 1942) e dell\'eliminazione della testa di ponte dell\'Asse a Tunisi (maggio 1943), il Nordafrica francese combatte al fianco degli Alleati.',
            'Alleati',
            'Comité Français de la Libération Nationale (CFLN)'
          );
        }
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
        if (s >= 19) {
          return makeResult(
            'FRA',
            rawName ? `${rawName} (AOF — Union Française)` : 'Africa Occidentale Francese (Union Française)',
            'Territori d\'Oltremare dell\'AOF nella Quarta Repubblica e nell\'Union Française (Legge Houphouët-Boigny 1946; ricostituzione dell\'Alta Volta il 4 settembre 1947) sotto René Barthes a Dakar.',
            'Alleati',
            'Quatrième République (Union Française) — Haut-Commissariat de l\'AOF (Dakar · René Barthes)'
          );
        }
        if (s >= 11) {
          return makeResult(
            'F_AOF',
            rawName ? `${rawName} (AOF — Alleati)` : 'Africa Occidentale Francese (Ralliement aux Alliés)',
            'Accordo Boisson-Darlan (23 novembre 1942): l\'AOF si unisce agli Alleati mettendo Dakar a disposizione delle Nazioni Unite.',
            'Alleati',
            'Haut-Commissariat de France en Afrique (Dakar)'
          );
        }
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
        if (s >= 19) {
          return makeResult(
            'FRA',
            rawName ? `${rawName} (AEF — Union Française)` : 'Africa Equatoriale Francese (Union Française)',
            'Territori d\'Oltremare dell\'AEF nella Quarta Repubblica e nell\'Union Française (Costituzione dell\'ottobre 1946; Brazzaville).',
            'Alleati',
            'Quatrième République (Union Française) — Gouvernement Général de l\'AEF (Brazzaville · Charles Luizet)'
          );
        }
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

      if (nrm.includes('reunion') || nid === 'RE_REUNION' || nid === 'FRY40') {
        if (s >= 11) {
          return makeResult(
            'FRA',
            'La Réunion (Ralliée à la France Libre — 28 Novembre 1942)',
            'Il 28 novembre 1942 il cacciatorpediniere Léopard delle Forces Navales Françaises Libres (FNFL) sbarca a Saint-Denis; l\'isola della Riunione passa ufficialmente sotto l\'autorità della Francia Libera del generale de Gaulle.',
            'Alleati',
            'Colonie de la Réunion — France Libre (Gouverneur Jean Capagorry)'
          );
        }
        if (s >= 6) {
          return makeResult(
            'VIC_MAD',
            'La Réunion (Colonie sous autorité de Vichy — Saint-Denis)',
            'Colonia d\'oltremare di Vichy nell\'Oceano Indiano sotto il governatore Pierre-Émile Aubert fino al ralliement gollista del 28 novembre 1942.',
            'Fantoccio',
            'Colonie de la Réunion (Gouverneur Pierre-Émile Aubert — Vichy)'
          );
        }
        return makeResult(
          'F_MAD',
          'La Réunion (Colonie Française — Saint-Denis)',
          'Colonia insulare francese nell\'Oceano Indiano amministrata congiuntamente con il Madagascar.',
          'Alleati',
          'Colonie de la Réunion (Troisième République française)'
        );
      }

      if (
        nrm.includes('madagascar') ||
        nrm.includes('comoros') ||
        nrm.includes('comores')
      ) {
        const isComoros = nrm.includes('comor') || nid === 'KM' || nid === 'COM' || nid === 'KM_COMOROS';
        if (s >= 19) {
          if (isComoros) {
            return makeResult(
              'FRA',
              'Archipel des Comores (Territoire d\'Outre-Mer des Comores — Dzaoudzi)',
              'Con la legge francese del 9 maggio 1946 l\'arcipelago delle Comore è separato dal Madagascar ed eretto in Territoire d\'Outre-Mer (TOM) della Quarta Repubblica nell\'Union Française (capoluogo Dzaoudzi).',
              'Alleati',
              'Quatrième République (Union Française) — Territoire des Comores (Dzaoudzi)'
            );
          }
          return makeResult(
            'FRA',
            'Madagascar (Union Française — Territoire d\'outre-mer & Insurrezione del 1947)',
            'Territoire d\'Outre-Mer della Quarta Repubblica (Union Française). Dal 29 marzo 1947 l\'isola è investita dall\'insurrezione anticoloniale del movimento MDRM, repressa dall\'Alto Commissario Marcel de Coppet.',
            'Alleati',
            'Haut-Commissariat de France à Madagascar (Marcel de Coppet, Antananarivo)'
          );
        }
        if (s >= 12) {
          return makeResult(
            'FRA',
            isComoros ? 'Archipel des Comores (Francia Libera — CFLN / GPRF)' : 'Madagascar (Francia Libera — CFLN / GPRF)',
            'Dopo l\'armistizio di Ambalavao e gli accordi Eden-De Gaulle (dicembre 1942), Madagascar e le Comore passano sotto amministrazione della Francia Libera (Gen. Paul Legentilhomme).',
            'Alleati',
            'Gouvernement Général de Madagascar — CFLN / GPRF (Général Paul Legentilhomme)'
          );
        }
        if (s >= 11) {
          return makeResult(
            'UK',
            'Madagascar (British Military Administration / Capitulation de Vichy)',
            'Operazione Stream Line Jane e Armistizio di Ambalavao (5-6 novembre 1942): le truppe britanniche ed est-africane completano la conquista dell\'isola; il Governatore Armand Annet firma la resa, ponendo fine alla sovranità di Vichy in Madagascar.',
            'Alleati',
            'British Military Administration of Madagascar (Gen. William Platt) & Forces Françaises Libres'
          );
        }
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
        if (s >= 19) {
          return makeResult(
            'FRA',
            'Côte Française des Somalis (Union Française — Djibouti)',
            'Territoire d\'outre-mer della Quarta Repubblica Francese (Unione Francese). Base aeronavale e scalo ferroviario strategico franco-etiope verso Addis Abeba sotto il Governatore Paul-Henri Siriex.',
            'Alleati',
            'Territoire de la Côte Française des Somalis (Djibouti — Gouverneur Paul-Henri Siriex)'
          );
        }
        if (s >= 12) {
          return makeResult(
            'FRA',
            'Côte Française des Somalis (Ralliement alla Francia Libera — Dicembre 1942)',
            'Il 28 dicembre 1942 la guarnigione di Vichy a Gibuti si arrende senza spargimento di sangue alle forze alleate e della Francia Libera, integrando la colonia nello schieramento alleato sotto il Governatore André Bayardelle.',
            'Alleati',
            'Côte Française des Somalis — CFLN / GPRF (Gouverneur André Bayardelle)'
          );
        }
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

      if (ITA_COL[cntr] || cntr === 'LY' || cntr === 'LBY' || nid.startsWith('LY') || nrm.includes('italian somaliland')) {
        if (s >= 8 && (cntr === 'ER' || cntr === 'ERI' || nrm.includes('eritrea') || nid.startsWith('ER'))) {
          if (s >= 19) {
            return makeResult(
              'UK',
              'Eritrea (Amministrazione Militare Britannica — BMA, Asmara)',
              'Trattato di Pace di Parigi (in vigore dal 15 settembre 1947, Articolo 23): l\'Italia rinuncia formalmente a ogni diritto sull\'Eritrea. Il territorio rimane retto dalla British Military Administration (BMA Eritrea, Brigadier F.G. Drew ad Asmara) in attesa delle decisioni delle Potenze Alleate e della Commissione d\'inchiesta delle Quattro Potenze.',
              'Alleati',
              'British Military Administration of Eritrea (BMA — Brigadier F.G. Drew, Asmara)'
            );
          }
          return makeResult(
            'UK',
            'Eritrea Occupata (Asmara / Massaua / Cheren — British Military Administration)',
            'Campagna dell\'Africa Orientale Italiana (febbraio-aprile 1941): dopo i 53 giorni dell\'aspra battaglia di Cheren (5 febbraio - 27 marzo 1941), le divisioni anglo-indiane del Gen. William Platt occupano Asmara (1° aprile) e la base navale di Massaua (8 aprile 1941).',
            'Alleati',
            'Occupied Enemy Territory Administration (OETA) — British Military Administration in Eritrea'
          );
        }
        if (s >= 8 && (cntr === 'SO' || cntr === 'SOM' || nrm.includes('somal') || nid.startsWith('SO'))) {
          if (s >= 25) {
            return makeResult(
              'AFIS',
              'Amministrazione Fiduciaria Italiana della Somalia (AFIS — Mandato ONU dal 1° Aprile 1950, Mogadiscio)',
              'Il 1° aprile 1950 cessa l\'amministrazione militare britannica (BMA) nell\'ex Somalia Italiana e inizia ufficialmente il mandato decennale (1950–1960) dell\'Amministrazione Fiduciaria Italiana della Somalia (AFIS) per conto delle Nazioni Unite (Risoluzione ONU 289 del 21 novembre 1949), con esposizione congiunta della bandiera ONU e del Tricolore della Repubblica Italiana sotto l\'Amministratore Giovanni Fornari a Mogadiscio (il Somaliland Britannico e l\'Ogaden restano rispettivamente a Regno Unito ed Etiopia).',
              'Alleati',
              'Amministrazione Fiduciaria Italiana della Somalia — AFIS (ONU / Repubblica Italiana — Amb. Giovanni Fornari, Mogadiscio)'
            );
          }
          if (s >= 19) {
            return makeResult(
              'UK',
              'Somalia Italiana (Amministrazione Militare Britannica — Mogadiscio)',
              'Trattato di Pace di Parigi (in vigore dal 15 settembre 1947, Articolo 23): l\'Italia rinuncia formalmente e irrevocabilmente a ogni diritto e titolo sulla Somalia Italiana. Il territorio rimane retto dalla British Military Administration (BMA Somalia) con sede a Mogadiscio.',
              'Alleati',
              'British Military Administration in Somalia (BMA — Mogadishu)'
            );
          }
          return makeResult(
            'UK',
            'Somalia Occupata (Mogadiscio / Chisimaio — British Military Administration)',
            'Campagna dell\'Africa Orientale Italiana (febbraio-marzo 1941): l\'11ª Divisione Africana del Gen. Alan Cunningham sfonda la linea del Giuba, occupa Chisimaio e il 25 febbraio 1941 entra a Mogadiscio, proseguendo verso Harar e Addis Abeba.',
            'Alleati',
            'Occupied Enemy Territory Administration (OETA) — British Military Administration in Somalia'
          );
        }
        if (s >= 12 && (cntr === 'LY' || cntr === 'LBY' || nid.startsWith('LY') || nrm.includes('libya') || nrm.includes('libia'))) {
          const isFezzan = nid === 'LYSB' || nid === 'LYGT' || nid === 'LYMQ' || nid === 'LYWS' || nid === 'LYWD' || nrm.includes('fezzan') || nrm.includes('ghadames') || nrm.includes('gadames') || nrm.includes('sebha') || nrm.includes('murzuch') || nrm.includes('murzuk') || nrm.includes('ghat') || nrm.includes('uadi sciati') || nrm.includes('uadi el-agial');
          const isCyrenaica = nid === 'LYBA' || nid === 'LYBU' || nid === 'LYDR' || nid === 'LYJA' || nid === 'LYMJ' || nid === 'LYWA' || nid === 'LYKF' || nrm.includes('cyrenaic') || nrm.includes('cirenaic') || nrm.includes('bengasi') || nrm.includes('benghazi') || nrm.includes('tobruk') || nrm.includes('derna') || nrm.includes('bardia') || nrm.includes('cufra') || nrm.includes('barce');

          if (s >= 19) {
            if (isFezzan) {
              return makeResult(
                'FRA',
                'Fezzan-Ghadamès (Territoire Militaire Français — Sebha)',
                'Trattato di Pace di Parigi (in vigore dal 15 settembre 1947, Articolo 23): l\'Italia rinuncia formalmente a ogni diritto sulla Libia. Il territorio sahariano del Fezzan è amministrato militarmente dalla Francia (Territoire du Fezzan-Ghadamès) con sede del comando a Sebha sotto il Colonnello Delange.',
                'Alleati',
                'Territoire Militaire du Fezzan-Ghadamès (Commandant Militaire Français, Sebha)'
              );
            }
            if (isCyrenaica) {
              return makeResult(
                'UK',
                'Cirenaica (British Military Administration — Bengasi)',
                'Trattato di Pace di Parigi (in vigore dal 15 settembre 1947, Articolo 23): l\'Italia rinuncia a ogni sovranità coloniale sulla Libia. La Cirenaica è retta dalla British Military Administration (BMA Cyrenaica) con sede a Bengasi, in cooperazione con l\'Emiro Sayyid Idris al-Senussi.',
                'Alleati',
                'British Military Administration of Cyrenaica (BMA, Benghazi — Emiro Idris al-Senussi)'
              );
            }
            return makeResult(
              'UK',
              'Tripolitania (British Military Administration — Tripoli)',
              'Trattato di Pace di Parigi (in vigore dal 15 settembre 1947, Articolo 23): l\'Italia rinuncia formalmente a ogni diritto sulla Libia. La Tripolitania è retta dalla British Military Administration (BMA Tripolitania) con sede al Castello Rosso di Tripoli.',
              'Alleati',
              'British Military Administration of Tripolitania (BMA, Tripoli)'
            );
          }

          if (isFezzan) {
            return makeResult(
              'FRA',
              'Fezzan (Occupazione Militare della Francia Libera — Sebha e Murzuch)',
              'Gennaio 1943: la Force L della Francia Libera risalita dal Ciad sotto il Generale Leclerc espugna i presidi italiani di Sebha, Murzuch e Ghat liberando l\'intero Fezzan e collegandosi all\'8ª Armata britannica a Tripoli.',
              'Alleati',
              'Commandement des Forces Françaises Libres du Fezzan (Général Philippe Leclerc / Colonel Delange)'
            );
          }

          return makeResult(
            'UK',
            'Libia Sotto Amministrazione Militare Alleata (Tripolitania, Cirenaica e Fezzan)',
            'Caduta definitiva della Quarta Sponda fascista: nel gennaio 1943 l\'8ª Armata britannica entra a Tripoli e le forze della Francia Libera di Leclerc liberano il Fezzan. L\'intero territorio libico è sotto piena amministrazione militare alleata.',
            'Alleati',
            'British Military Administration (Tripolitania & Cyrenaica) / Territoire Militaire du Fezzan (France)'
          );
        }
        if (
          s >= 11 &&
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
            'Cirenaica Liberata (Bengasi / Tobruk / Derna — British Eighth Army)',
            'Inseguimento della Panzerarmee Afrika dopo El Alamein (novembre 1942): l\'8ª Armata britannica del Generale Bernard Montgomery travolge le retroguardie italo-tedesche, rioccupa Bardia (11 novembre), Tobruk (13 novembre) e Bengasi (20 novembre). Le forze superstiti del Feldmaresciallo Rommel ripiegano verso la linea trincerata di El Agheila al confine della Sirtica.',
            'Alleati',
            'British 8th Army — Military Administration of Cyrenaica (General Bernard Montgomery)'
          );
        }
        if (
          s === 9 &&
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
            (s >= 11
              ? 'Governo Generale della Libia (Tripolitania e Sirtica — Maresciallo Ettore Bastico) & Panzerarmee Afrika (Generalfeldmarschall Erwin Rommel): dopo la sconfitta di El Alamein e la caduta della Cirenaica, le forze italo-tedesche si attestano sulla linea difensiva di El Agheila e preparano l\'ulteriore ripiegamento verso Tripoli e la Tunisia.'
              : s === 10
              ? 'Governo Generale della Libia (Maresciallo Ettore Bastico) & Panzerarmee Afrika (Feldmaresciallo Erwin Rommel): dopo la riconquista della Cirenaica occidentale (gennaio-febbraio 1942), la vittoria di Gazala (26 maggio - 21 giugno 1942) e l\'espugnazione della piazzaforte di Tobruk (21 giugno 1942), l\'intera Libia funge da retrovia logistica per l\'offensiva italo-tedesca fino alla linea di El Alamein in Egitto.'
              : s >= 9
              ? 'Governo Generale della Libia (Tripolitania e Fezzan — Maresciallo Ettore Bastico) & Panzergruppe Afrika (Gen. Erwin Rommel): dopo l\'Operazione Crusader (novembre-dicembre 1941), le forze italo-tedesche ripiegano ordinatamente sulla stretta di El Agheila al confine tra Cirenaica e Tripolitania, preparando la controffensiva del gennaio 1942.'
              : s >= 8
              ? 'Operazione Sonnenblume (febbraio-aprile 1941): sbarco a Tripoli del Deutsches Afrikakorps (Gen. Erwin Rommel) e controffensiva italo-tedesca (El Agheila, Agedabia, Mechili, riconquista di Bengasi e Derna), con inizio dell\'assedio della piazzaforte australiano-britannica di Tobruk (10 aprile 1941) sotto il comando del Gen. Italo Gariboldi e di Rommel.'
              : s >= 6
              ? 'Governo Generale della Libia (Maresciallo Rodolfo Graziani)'
              : 'Governo Generale della Libia (Maresciallo dell\'Aria Italo Balbo)'),
          s >= 6 ? 'Asse' : undefined,
          itTop.adminTitle ||
            (s >= 10
              ? 'Governo Generale della Libia (Maresciallo Ettore Bastico) & Panzerarmee Afrika (Feldm. Erwin Rommel)'
              : s >= 9
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
            if (s >= 19) {
              return makeResult(
                'FRA',
                `${lbl} (Territoire d'Outre-Mer de l'AEF — Union Française)`,
                `Territoire d'Outre-Mer dell'Africa Equatoriale Francese integrato nella Quarta Repubblica e nell'Union Française (Costituzione del 27 ottobre 1946).`,
                'Alleati',
                'Quatrième République (Union Française) — Gouvernement Général de l\'AEF (Brazzaville)'
              );
            }
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
            if (isFrenchPacificProvince(nid, rawName || lbl, nrm)) {
              return resolveFrenchPacificProvince(ft, s);
            }
            const isAntillesOrGuiana =
              cntr === 'MQ' ||
              cntr === 'MTQ' ||
              cntr === 'GP' ||
              cntr === 'GLP' ||
              cntr === 'GF' ||
              cntr === 'GUF' ||
              cntr === 'MF' ||
              cntr === 'BL' ||
              nrm.includes('martinique') ||
              nrm.includes('guadeloupe') ||
              nrm.includes('guyane') ||
              nrm.includes('french guiana') ||
              nrm.includes('cayenne');
            if (isAntillesOrGuiana && s >= 12) {
              const cflnTop = getExtendedToponym(lbl, 'FRA', nid, c, s);
              return makeResult(
                'FRA',
                cflnTop.name || `${lbl} (CFLN / GPRF)`,
                cflnTop.note || 'Territorio ralliato al Comité Français de Libération Nationale (CFLN) nel 1943.',
                'Alleati',
                cflnTop.adminTitle || 'Comité Français de Libération Nationale (CFLN)'
              );
            }
            const isStPierre =
              cntr === 'PM' ||
              cntr === 'SPM' ||
              nrm.includes('miquelon') ||
              nrm.includes('saint-pierre') ||
              nrm.includes('saint pierre');
            if (isStPierre && s >= 9) {
              const spmTop = getExtendedToponym(lbl, 'FRA', nid, c, s);
              return makeResult(
                'FRA',
                spmTop.name || 'Saint-Pierre-et-Miquelon (France Libre — Amiral Muselier)',
                spmTop.note || 'Libéré le 24 décembre 1941 par les Forces Navales Françaises Libres (FNFL) de l\'amiral Muselier.',
                'Alleati',
                spmTop.adminTitle || 'France Libre — Territoire de Saint-Pierre-et-Miquelon'
              );
            }
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
              const o = s >= 14 ? 'FRA' : 'FFL_AEF';
              const fflTop = getExtendedToponym(lbl, o, nid, c, s);
              return makeResult(
                o,
                fflTop.name || (s >= 14 ? `${lbl} (GPRF)` : `${lbl} (France Libre)`),
                fflTop.note || (s >= 14 ? 'Territoire de la République Française (GPRF)' : 'Territoire d\'outre-mer rallié à la France Libre du Général de Gaulle en 1940'),
                'Alleati',
                fflTop.adminTitle || (s >= 14 ? 'Gouvernement Provisoire de la République Française (GPRF)' : 'France Libre — Conseil de défense de l\'Empire')
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
          if (vicKey === 'VIC_MAD' && s >= 11) {
            return makeResult(
              'UK',
              'Madagascar (British Military Administration / Capitulation de Vichy)',
              'Operazione Stream Line Jane e Armistizio di Ambalavao (5-6 novembre 1942): le truppe britanniche ed est-africane completano la conquista dell\'isola; il Governatore Armand Annet firma la resa, ponendo fine alla sovranità di Vichy in Madagascar.',
              'Alleati',
              'British Military Administration of Madagascar (Gen. William Platt) & Forces Françaises Libres'
            );
          }
          if (vicKey === 'VIC_AOF' && s >= 11) {
            if (s >= 19) {
              return makeResult(
                'FRA',
                `${lbl} (AOF — Territoire d'Outre-Mer, Union Française)`,
                'Territori d\'Oltremare dell\'AOF nella Quarta Repubblica e nell\'Union Française (Costituzione del 27 ottobre 1946; Legge n. 47-1707 del 4 settembre 1947) sotto l\'Alto Commissario René Barthes a Dakar.',
                'Alleati',
                'Quatrième République (Union Française) — Haut-Commissariat de l\'AOF (Dakar · René Barthes)'
              );
            }
            return makeResult(
              'F_AOF',
              'Afrique Occidentale Française (AOF — Ralliement agli Alleati, Dakar)',
              'Accordo di Dakar (23 novembre 1942): il Governatore Generale Pierre Boisson riconosce l\'autorità dell\'Ammiraglio Darlan e dell\'Alto Commissariato Francese ad Algeri, integrando l\'intera AOF e la base navale di Dakar nello schieramento alleato.',
              'Alleati',
              'Gouvernement Général de l\'Afrique Occidentale Française (Gouverneur Général Pierre Boisson — Schieramento Alleato)'
            );
          }
          if (vicKey === 'VIC_NAF' && s >= 11) {
            if (s >= 19) {
              return makeResult(
                'FRA',
                `${lbl} (Afrique du Nord Française — Union Française)`,
                'Algeria (Statut Organique de l\'Algérie del 20 settembre 1947) e Protettorati di Tunisia e Marocco nell\'Union Française (Quarta Repubblica).',
                'Alleati',
                'Quatrième République (Union Française) — Afrique du Nord Française'
              );
            }
            if (lbl.toLowerCase().includes('tunis') || lbl.toLowerCase().includes('bizerte')) {
              return makeResult(
                'GER',
                'Tunisie occupée — Testa di ponte dell\'Asse',
                'Occupazione italo-tedesca di Biserta e Tunisi a metà novembre 1942 per creare la testa di ponte dell\'Asse in Nordafrica dopo lo sbarco alleato in Algeria e Marocco (Operazione Torch).',
                'Asse',
                'XC. Armeekorps / Generalleutnant Walther Nehring — 5. Panzerarmee'
              );
            }
            return makeResult(
              'FRA',
              'Afrique du Nord Française (Liberazione Alleata — Operazione Torch)',
              'Operazione Torch (8-11 novembre 1942): le forze anglo-americane sbarcano ad Algeri, Orano e Casablanca. Con il cessate il fuoco concordato con l\'Ammiraglio Darlan, l\'amministrazione civile e militare francese si unisce agli Alleati.',
              'Alleati',
              'Commandement en Chef Français Civil et Militaire (Amiral François Darlan / Général Henri Giraud)'
            );
          }
          if (vicKey === 'VIC_SYR' && s >= 9) {
          if (s >= 19) {
            const isLeb = nrm.includes('leban') || nrm.includes('liban') || cntr === 'LB' || cntr === 'LBN';
            return isLeb
              ? makeResult('LEB', 'Repubblica Libanese (Indipendenza Sovrana — Beirut)', 'Evacuazione completata nel dicembre 1946; Repubblica Libanese sovrana (Presidente Béchara El Khoury · P.M. Riad Al Solh).', 'Neutrale', 'Repubblica Libanese — Beirut')
              : makeResult('SYR', 'Repubblica Siriana (Indipendenza Sovrana — Damasco)', 'Evacuazione completata il 17 aprile 1946; Repubblica Siriana sovrana (Presidente Shukri al-Quwatli · P.M. Jamil Mardam Bey).', 'Neutrale', 'Repubblica Siriana — Damasco');
          }
          return makeResult(
            'F_SYR',
            vicTop.name || 'Syrie et Liban (Controllo Congiunto Francia Libera e Gran Bretagna)',
            "Operazione Exporter e Armistizio di Saint-Jean-d'Acre (14 luglio 1941): dopo la resa delle forze di Vichy del Gen. Henri Dentz, Siria e Libano passano sotto il controllo congiunto della Francia Libera (Gen. Georges Catroux) e della Gran Bretagna.",
            'Alleati',
            'Délégation Générale de la France Libre au Levant (Gén. Georges Catroux) & British 9th Army'
          );
        }
        if (vicKey === 'VIC_IND' && s >= 18) {
          return makeResult(
            'FRA',
            s >= 19
              ? 'Indocina Francese (Unione Francese — Conflitto contro la RDV/Việt Minh)'
              : 'Indocina Francese (Ristabilimento Amministrazione Francese & Resa Giapponese)',
            s >= 19
              ? 'Al 30 settembre 1947 la Francia (Union Française) presidia la Cocincina, Cambogia, Laos e le città principali del Tonchino/Annam contro la RDV di Hồ Chí Minh.'
              : 'Settembre 1945: capitolazione delle truppe giapponesi in Indocina (Gen. Gracey SEAC / Gen. Leclerc).',
            'Alleati',
            s >= 19
              ? 'Union Française — Haut-Commissariat de France en Indochine (Émile Bollaert)'
              : 'Gouvernement Provisoire (GPRF — Amiral Thierry d\'Argenlieu)'
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
      if (HOL_COL[cntr]) {
        if (s >= 10 && s < 18 && (cntr === 'ID' || cntr === 'IDN')) {
          return makeResult(
            'JAP',
            'Indie Orientali Olandesi (Occupazione Militare Giapponese — Resa di Kalijati, 8-9 Marzo 1942)',
            'Campagna delle Indie Orientali Olandesi (dicembre 1941 - marzo 1942): dopo la presa dei pozzi petroliferi di Tarakan, Balikpapan e Palembang e la disfatta navale ABDACOM nel Mar di Giava (27 febbraio 1942), il comandante del KNIL Ten. Gen. Hein ter Poorten firma la resa incondizionata a Kalijati (8-9 marzo 1942).',
            'Asse',
            'Dai Nippon Teikoku — Gunseikanbu (16ª e 25ª Armata Imperiale & Marina Imperiale)'
          );
        }
        return makeResult(
          'HOL',
          getTop('HOL').name || HOL_COL[cntr],
          undefined,
          s >= 6 ? 'Alleati' : 'Neutrale'
        );
      }
      if (POR_COL[cntr]) {
        if (s >= 18 && (cntr === 'TL' || cntr === 'TLS')) {
          return makeResult(
            'POR',
            s >= 19
              ? 'Timor Português (Província Ultramarina de Timor — Amministrazione Portoghese)'
              : 'Timor Português (Restaurazione della Sovranità Portoghese — Settembre 1945)',
            s >= 19
              ? 'Al 30 settembre 1947 Timor Est è amministrata dal Portogallo sotto il Governatore Óscar Freire de Vasconcelos Ruas.'
              : 'Il 5 settembre 1945 le forze giapponesi a Timor firmano la resa a Kupang e viene ripristinata la sovranità portoghese a Díli.',
            'Neutrale',
            s >= 19
              ? 'República Portuguesa — Província Ultramarina de Timor (Governador Óscar Ruas)'
              : 'República Portuguesa — Província Ultramarina de Timor (Governador Ferreira de Carvalho)'
          );
        }
        if (s >= 10 && s < 18 && (cntr === 'TL' || cntr === 'TLS')) {
          return makeResult(
            'JAP',
            'Timor Portoghese (Occupazione Militare Giapponese — 19-20 Febbraio 1942)',
            'Battaglia di Timor (1942-1943): nella notte tra il 19 e il 20 febbraio 1942 il 228º Reggimento di Fanteria giapponese sbarca a Dili, occupando la colonia neutrale del Timor Portoghese nonostante le proteste del governatore Manuel Ferreira de Carvalho.',
            'Asse',
            'Dai Nippon Teikoku — Occupazione Militare del Timor Orientale (Dili)'
          );
        }
        return makeResult('POR', POR_COL[cntr]);
      }
      if (s >= 18 && (nid === 'NR_NAURU' || cntr === 'NR' || cntr === 'NRU')) {
        return makeResult(
          'AST',
          s >= 19
            ? 'Nauru (Territorio Fiduciario ONU — Amministrazione Australiana)'
            : 'Nauru (Resa della Guarnigione Giapponese — 13 Settembre 1945)',
          s >= 19
            ? 'Al 30 settembre 1947 l\'isola di Nauru è amministrata dall\'Australia nel quadro dell\'accordo fiduciario delle Nazioni Unite (Australia, Regno Unito e Nuova Zelanda).'
            : 'Il 13 settembre 1945 a bordo dell\'HMAS Diamantina la guarnigione giapponese di Nauru capitola davanti alle forze australiane del brigadiere J. R. Stevenson.',
          'Alleati',
          'Commonwealth of Australia — Territory of Nauru'
        );
      }
      if (s >= 10 && s < 18 && (nid === 'NR_NAURU' || cntr === 'NR' || cntr === 'NRU')) {
        return makeResult(
          'JAP',
          'Nauru (Occupazione Imperiale Giapponese — Operazione RY, 26 Agosto 1942)',
          'Operazione RY (26 agosto 1942): dopo il bombardamento navale del dicembre 1940 e il primo tentativo rinviato nel maggio 1942 per la battaglia del Mar dei Coralli, il 26 agosto 1942 la 43ª Forza di Base Speciale della Marina Imperiale Giapponese sbarca e occupa senza resistenza l\'isola ricca di fosfati di Nauru e la vicina Ocean Island (Banaba).',
          'Asse',
          'Dai Nippon Teikoku Kaigun — 67ª Unità di Guardia (Nauru)'
        );
      }
      if (s >= 13 && (nid === 'KI_GILBERT' || cntr === 'KI' || cntr === 'KIR')) {
        return makeResult(
          s === 13 ? 'USA' : 'UK',
          s >= 18
            ? 'Gilbert and Ellice Islands Colony (Tarawa — Amministrazione Britannica Restaurata)'
            : 'Gilbert and Ellice Islands Colony (Tarawa & Makin Liberate dagli Alleati)',
          s >= 18
            ? 'Colonia britannica della Western Pacific High Commission su Tarawa, Makin, Abemama e le Ellice, in fase di ricostruzione postbellica dopo la liberazione del novembre 1943.'
            : '20-23 novembre 1943 (Operazione Galvanic): le forze statunitensi conquistano Tarawa e Makin eliminando il presidio giapponese e restituendo le Isole Gilbert al controllo alleato.',
          'Alleati',
          s === 13
            ? 'U.S. Pacific Ocean Areas — Tarawa & Makin Garrison'
            : 'British Western Pacific High Commission — Gilbert & Ellice Islands Colony'
        );
      }
      if (s >= 9 && s < 13 && (nid === 'KI_GILBERT' || cntr === 'KI' || cntr === 'KIR')) {
        return makeResult(
          'JAP',
          'Isole Gilbert / Tarawa e Makin (Occupazione Imperiale Giapponese — Dicembre 1941 / Agosto 1942)',
          'Occupazione delle Isole Gilbert (9-10 dicembre 1941 - agosto 1942): sbarco della Marina Imperiale Giapponese negli atolli di Makin (Butaritari) e Tarawa subito dopo Pearl Harbor; dopo il raid dei Marine Raiders di Carlson su Makin (17-18 agosto 1942), Tokyo presidia massicciamente Tarawa (isola di Betio) trasformandola in una fortezza.',
          'Asse',
          'Dai Nippon Teikoku Kaigun — 3ª Forza di Base Speciale (Tarawa)'
        );
      }
      if (UK_COL[cntr]) {
        if (s >= 21 && (cntr === 'MM' || cntr === 'MMR' || nrm.includes('burma') || nrm.includes('birmania'))) {
          return makeResult(
            'BUR',
            'Unione della Birmania (Repubblica Sovrana Indipendente — 4 Gennaio 1948 & Insurrezione Comunista)',
            'Il 4 gennaio 1948 la Birmania proclama la piena indipendenza dal Regno Unito come Repubblica sovrana al di fuori del Commonwealth sotto il Presidente Sao Shwe Thaik e il Primo Ministro U Nu; dalla primavera 1948 il governo affronta l\'insurrezione armata del Partito Comunista della Birmania (CPB) nelle province centrali e meridionali.',
            'Neutrale',
            'Union of Burma · Pyidaungzu Myanma Naingngandaw (Pres. Sao Shwe Thaik · PM U Nu)'
          );
        }
        if (s >= 21 && (cntr === 'LK' || cntr === 'LKA' || nrm.includes('ceylon') || nrm.includes('sri lanka'))) {
          return makeResult(
            'CEY',
            'Dominion di Ceylon (Reame Indipendente del Commonwealth — 4 Febbraio 1948)',
            'Il 4 febbraio 1948 entra in vigore il Ceylon Independence Act: l\'isola di Ceylon diviene il Dominion di Ceylon, reame indipendente all\'interno del Commonwealth delle Nazioni sotto il Primo Ministro Don Stephen Senanayake e il Governatore Generale Sir Henry Monck-Mason Moore.',
            'Alleati',
            'Dominion of Ceylon (PM D.S. Senanayake · Gov.-Gen. Sir Henry Monck-Mason Moore)'
          );
        }
        if (s >= 10 && s <= 16 && (cntr === 'MM' || cntr === 'MMR' || nrm.includes('burma') || nrm.includes('birmania'))) {
          if (s === 14) {
            return makeResult(
              'JAP',
              'Stato di Birmania — Collasso Offensiva U-Go (Imphal e Kohima, Giugno 1944)',
              'Giugno 1944: la catastrofica offensiva giapponese U-Go contro le basi anglo-indiane di Imphal e Kohima si infrange il 22 giugno 1944 con la rottura dell\'assedio da parte della 14ª Armata Britannica (Gen. William Slim), segnando la peggiore disfatta terrestre dell\'Esercito Imperiale Giapponese.',
              'Asse',
              'Bama Naingngandaw / Armata Regionale Birmana (Operazione U-Go)'
            );
          }
          if (s >= 15) {
            return makeResult(
              'JAP',
              'Stato di Birmania (Bama Naingngandaw — Ritirata dall\'Irrawaddy)',
              'Estate 1944 - Inizio 1945: dopo il disastroso fallimento dell\'offensiva U-Go a Imphal e Kohima, la 14ª Armata Britannica e le forze sino-americane avanzano nell\'alta Birmania contro le retroguardie giapponesi.',
              'Asse',
              'Bama Naingngandaw / Armata Regionale Birmana (Gen. Kimura)'
            );
          }
          return makeResult(
            'JAP',
            'Stato di Birmania (Bama Naingngandaw — Occupazione Imperiale Giapponese)',
            'Occupazione militare giapponese della Birmania (1942-1944) e governo nominale di Ba Maw.',
            'Asse',
            'Dai Nippon Teikoku — Armata Regionale Birmana'
          );
        }
        if (s >= 18 && (cntr === 'HK' || cntr === 'HKG' || nrm.includes('hong kong'))) {
          return makeResult(
            'UK',
            s >= 19
              ? 'Crown Colony of Hong Kong (Ricostruzione Postbellica — Gov. Alexander Grantham)'
              : 'Crown Colony of Hong Kong (Ripristino Sovranità Britannica)',
            s >= 19
              ? 'Al 30 settembre 1947 Hong Kong vive una rapida ripresa commerciale sotto il Governatore Sir Alexander Grantham.'
              : '30 agosto 1945: la Task Force dell\'ammiraglio Sir Cecil Harcourt entra a Victoria Harbour ristabilendo il governo britannico di Hong Kong.',
            'Alleati',
            s >= 19
              ? 'British Empire — Crown Colony of Hong Kong (Governor Sir Alexander Grantham)'
              : 'British Empire — Crown Colony of Hong Kong'
          );
        }
        if (s >= 9 && (cntr === 'HK' || cntr === 'HKG' || nrm.includes('hong kong'))) {
          return makeResult(
            'JAP',
            'Honkon Senryōchi (Hong Kong — Occupazione Imperiale Giapponese)',
            'Battaglia di Hong Kong (8-25 dicembre 1941): dopo 18 giorni di combattimenti nei Nuovi Territori, a Kowloon e sull\'isola di Hong Kong contro la 38ª Divisione giapponese, il Governatore Sir Mark Young si arrende nel "Black Christmas" del 25 dicembre 1941.',
            'Asse',
            'Dai Nippon Teikoku — Honkon Senryōchi Sōtokubu (Ten. Gen. Rensuke Isogai)'
          );
        }
        if (s >= 18 && (cntr === 'BN' || cntr === 'BRN' || nrm.includes('brunei'))) {
          return makeResult(
            'UK',
            s >= 19
              ? 'State of Brunei (Protettorato Britannico — Sultano Ahmad Tajuddin)'
              : 'Brunei (Protettorato Britannico Restaurato — BMA / British Borneo)',
            s >= 19
              ? 'Al 30 settembre 1947 il Sultanato del Brunei è retto dal Sultano Ahmad Tajuddin sotto protettorato britannico e Residente Coloniale.'
              : 'Settembre 1945: liberazione australiana-britannica (Operazione Oboe Six) e restaurazione del protettorato britannico sul Sultanato del Brunei.',
            'Alleati',
            s >= 19
              ? 'British Protected State of Brunei (Sultan Ahmad Tajuddin / British Resident)'
              : 'British Empire — British Protectorate of Brunei'
          );
        }
        if (s >= 9 && (cntr === 'BN' || cntr === 'BRN' || nrm.includes('brunei'))) {
          return makeResult(
            'JAP',
            'Kita Boruneo / Brunei (Occupazione Militare Giapponese — 16 Dicembre 1941)',
            'Sbarco del Distaccamento Kawaguchi a Miri e Seria (16 dicembre 1941) e occupazione integrale del Sultanato del Brunei e del Borneo settentrionale britannico.',
            'Asse',
            'Dai Nippon Teikoku — Borneo Defence Force (Ten. Gen. Marquis Toshinari Maeda)'
          );
        }
        if (s === 10 && (cntr === 'SB' || cntr === 'SLB' || nrm.includes('solomon') || nrm.includes('salomone'))) {
          return makeResult(
            'JAP',
            'Isole Salomone (Perimetro Difensivo Giapponese & Campagna di Guadalcanal — Agosto 1942)',
            'Occupazione giapponese delle Isole Salomone (Shortland, Tulagi, Guadalcanal — marzo-maggio 1942): nonostante lo sbarco della 1ª Divisione Marines USA a Guadalcanal e Tulagi il 7 agosto 1942 (Operazione Watchtower) per catturare l\'aeroporto in costruzione (Henderson Field), la vittoria navale giapponese a Savo Island (8-9 agosto) e gli sbarchi del Tokyo Express mantengono l\'arcipelago delle Salomone al centro dell\'aspra battaglia aeronavale e terrestre dell\'agosto 1942.',
            'Asse',
            'Dai Nippon Teikoku — 8ª Flotta (Rabaul, Viceamm. Gunichi Mikawa) & 17ª Armata (Ten. Gen. Harukichi Hyakutake)'
          );
        }
        if (s >= 18 && (cntr === 'SB' || cntr === 'SLB' || nrm.includes('solomon') || nrm.includes('salomone'))) {
          return makeResult(
            'UK',
            s >= 19
              ? 'British Solomon Islands Protectorate (Ricostruzione Postbellica — Honiara)'
              : 'British Solomon Islands Protectorate (Fine Ostilità & Resa alle Salomone — Settembre 1945)',
            s >= 19
              ? 'Al 30 settembre 1947 il protettorato britannico delle Salomone trasferisce la propria capitale da Tulagi a Honiara (Guadalcanal) sotto la Western Pacific High Commission.'
              : 'Settembre 1945: resa delle ultime guarnigioni giapponesi nelle Salomone settentrionali (8 settembre 1945) e ripristino dell\'amministrazione britannica.',
            'Alleati',
            'British Protectorate — Western Pacific High Commission (Suva)'
          );
        }
        if (s >= 12 && (cntr === 'SB' || cntr === 'SLB' || nrm.includes('solomon') || nrm.includes('salomone'))) {
          return makeResult(
            'UK',
            'British Solomon Islands Protectorate (Operazione Cartwheel — Campagna della Nuova Georgia & Munda, Luglio 1943)',
            'Dopo l\'evacuazione giapponese di Guadalcanal (febbraio 1943), il 30 giugno 1943 gli Alleati lanciano l\'Operazione Cartwheel: a fine luglio infuriano i combattimenti nell\'isola di Nuova Georgia per espugnare l\'aeroporto strategico di Munda Point e isolare la base giapponese di Rabaul.',
            'Alleati',
            'British Solomon Islands Protectorate — Allied South Pacific Area (Admiral William F. Halsey Jr.)'
          );
        }
        if (s >= 11 && (cntr === 'SB' || cntr === 'SLB' || nrm.includes('solomon') || nrm.includes('salomone'))) {
          return makeResult(
            'USA',
            'British Solomon Islands Protectorate (Guadalcanal & Henderson Field — US Forces)',
            'Svolta nella Campagna di Guadalcanal (novembre 1942): dopo la vittoria nella Battaglia navale di Guadalcanal (12-15 novembre 1942), le forze aeronavali statunitensi (Ammiraglio William Halsey) e la 1ª Divisione Marines consolidano il controllo strategico su Henderson Field e sull\'arcipelago meridionale delle Salomone, respingendo definitivamente l\'ultimo grande tentativo giapponese di sbarcare rinforzi pesanti.',
            'Alleati',
            'South Pacific Area (SOPAC — Admiral William F. Halsey Jr.) & 1st Marine Division'
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
          s >= 18 ? 'Alleati' : 'Asse',
          jpTop?.adminTitle || (s >= 18 ? 'Supreme Commander for the Allied Powers (SCAP)' : 'Dai Nippon Teikoku')
        );
      }
      if (USA_COL[cntr]) {
        if (cntr === 'PH' || cntr === 'PHL' || cntr === '608') {
          if (s >= 19) {
            return makeResult(
              'PHL',
              'Repubblica delle Filippine (Terza Repubblica — Indipendenza del 4 Luglio 1946)',
              'Il 4 luglio 1946 le Filippine ottengono la piena sovranità e indipendenza dagli Stati Uniti (Trattato di Manila) sotto il Presidente Manuel Roxas.',
              'Alleati',
              'Republika ng Pilipinas — Presidente Manuel Roxas (Manila)'
            );
          }
          if (s >= 18) {
            return makeResult(
              'USA',
              'Commonwealth delle Filippine (Liberato — Amministrazione Alleata & Presidente Osmeña)',
              'Settembre 1945: capitolazione del generale Yamashita a Baguio (2 settembre 1945) e ripristino del Commonwealth delle Filippine.',
              'Alleati',
              'Commonwealth of the Philippines (Pres. Sergio Osmeña)'
            );
          }
          if (s >= 10) {
            return makeResult(
              'JAP',
              'Hitō Gunseikanbu (Filippine — Occupazione Militare Giapponese, Capitolazione di Corregidor 6 Maggio 1942)',
              'Campagna delle Filippine (dicembre 1941 - maggio 1942): dopo la caduta della penisola di Bataan (9 aprile 1942 e Marcia della Morte di Bataan) e la capitolazione della fortezza insulare di Corregidor del Ten. Gen. Jonathan Wainwright (6 maggio 1942), l\'intero arcipelago filippino è sotto l\'amministrazione militare della 14ª Armata giapponese.',
              'Asse',
              'Dai Nippon Teikoku — 14ª Armata & Commissione Esecutiva Filippina (Jorge B. Vargas)'
            );
          }
          return makeResult('PHL', USA_COL[cntr], 'Commonwealth delle Filippine (Stato Autonomo Associato agli USA)', s >= 9 ? 'Alleati' : 'Neutrale');
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
