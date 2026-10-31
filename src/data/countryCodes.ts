/**
 * CANONICAL 3-LETTER COUNTRY CODES MAPPING & NORMALIZER
 *
 * Architettura Unificata dei Codici Paese:
 * Assicura che per ogni stato del mondo ci sia UNO E UNO SOLO codice a 3 lettere
 * canonico e internamente consistente (es. Germania -> sempre e solo GER).
 *
 * Risolve ed elimina frammentazioni di codici a 2 lettere (ISO alpha-2),
 * codici numerici e toponimi, preservando al 100% la compatibilità trasparente
 * con zero regressioni.
 */

export const CANONICAL_COUNTRY_CODES: Record<string, string> = {
  // Germania (solo GER)
  DE: 'GER',
  DEU: 'GER',
  GER: 'GER',
  GERMANIA: 'GER',
  GERMANY: 'GER',
  DEUTSCHLAND: 'GER',
  REICH: 'GER',
  'TERZO REICH': 'GER',
  'DEUTSCHES REICH': 'GER',
  'GROSSDEUTSCHES REICH': 'GER',
  'GROßDEUTSCHES REICH': 'GER',
  '276': 'GER',
  XDE: 'GER',

  // Italia (solo ITA)
  IT: 'ITA',
  ITA: 'ITA',
  ITALIA: 'ITA',
  ITALY: 'ITA',
  'REGNO D\'ITALIA': 'ITA',
  '380': 'ITA',
  XIT: 'ITA',

  // Francia (solo FRA)
  FR: 'FRA',
  FRA: 'FRA',
  FRANCIA: 'FRA',
  FRANCE: 'FRA',
  'REPUBBLICA FRANCESE': 'FRA',
  '250': 'FRA',
  XFR: 'FRA',

  // Regno Unito (solo GBR)
  GB: 'GBR',
  GBR: 'GBR',
  UK: 'GBR',
  '826': 'GBR',
  XGB: 'GBR',
  'UNITED KINGDOM': 'GBR',
  'UNITED_KINGDOM': 'GBR',
  'GRAN BRETAGNA': 'GBR',
  BRITAIN: 'GBR',
  INGHILTERRA: 'GBR',

  // Polonia (solo POL)
  PL: 'POL',
  POL: 'POL',
  POLONIA: 'POL',
  POLAND: 'POL',
  'RZECZPOSPOLITA POLSKA': 'POL',
  '616': 'POL',
  XPL: 'POL',

  // Unione Sovietica / Russia (solo SOV)
  SU: 'SOV',
  SOV: 'SOV',
  RU: 'SOV',
  RUS: 'SOV',
  SUN: 'SOV',
  SSSR: 'SOV',
  URSS: 'SOV',
  USSR: 'SOV',
  'UNIONE SOVIETICA': 'SOV',
  'SOVIET UNION': 'SOV',
  '643': 'SOV',
  '810': 'SOV',

  // Giappone (solo JAP)
  JP: 'JAP',
  JPN: 'JAP',
  JAP: 'JAP',
  GIAPPONE: 'JAP',
  JAPAN: 'JAP',
  'DAI NIPPON': 'JAP',
  '392': 'JAP',
  XJP: 'JAP',

  // Cina (solo CHI)
  CN: 'CHI',
  CHN: 'CHI',
  CHI: 'CHI',
  CINA: 'CHI',
  CHINA: 'CHI',
  'ZHONGHUA MINGUO': 'CHI',
  '156': 'CHI',
  XCN: 'CHI',

  // Stati Uniti (solo USA)
  US: 'USA',
  USA: 'USA',
  STATI_UNITI: 'USA',
  'STATI UNITI': 'USA',
  'UNITED STATES': 'USA',
  '840': 'USA',
  XUS: 'USA',

  // Cecoslovacchia (solo CZE)
  CZ: 'CZE',
  CS: 'CZE',
  CZE: 'CZE',
  CSK: 'CZE',
  CECOSLOVACCHIA: 'CZE',
  CZECHOSLOVAKIA: 'CZE',
  'ČESKOSLOVENSKO': 'CZE',
  '203': 'CZE',
  XCZ: 'CZE',

  // Ungheria (solo HUN)
  HU: 'HUN',
  HUN: 'HUN',
  UNGHERIA: 'HUN',
  HUNGARY: 'HUN',
  MAGYARORSZAG: 'HUN',
  '348': 'HUN',
  XHU: 'HUN',

  // Romania (solo ROM)
  RO: 'ROM',
  ROU: 'ROM',
  ROM: 'ROM',
  ROMANIA: 'ROM',
  'REGATUL ROMANIEI': 'ROM',
  '642': 'ROM',
  XRO: 'ROM',

  // Bulgaria (solo BUL)
  BG: 'BUL',
  BGR: 'BUL',
  BUL: 'BUL',
  BULGARIA: 'BUL',
  '100': 'BUL',
  XBG: 'BUL',

  // Jugoslavia (solo YUG)
  YU: 'YUG',
  YUG: 'YUG',
  JUGOSLAVIA: 'YUG',
  YUGOSLAVIA: 'YUG',
  '891': 'YUG',
  XYU: 'YUG',

  // Grecia (solo GRE)
  GR: 'GRE',
  GRC: 'GRE',
  GRE: 'GRE',
  EL: 'GRE',
  GRECIA: 'GRE',
  GREECE: 'GRE',
  HELLAS: 'GRE',
  '300': 'GRE',
  XGR: 'GRE',

  // Turchia (solo TUR)
  TR: 'TUR',
  TUR: 'TUR',
  TURCHIA: 'TUR',
  TURKEY: 'TUR',
  TURKIYE: 'TUR',
  '792': 'TUR',
  XTR: 'TUR',

  // Spagna (solo ESP)
  ES: 'ESP',
  ESP: 'ESP',
  SPA: 'ESP',
  SPR: 'ESP',
  SPAGNA: 'ESP',
  SPAIN: 'ESP',
  ESPANA: 'ESP',
  '724': 'ESP',
  XES: 'ESP',

  // Portogallo (solo POR)
  PT: 'POR',
  PRT: 'POR',
  POR: 'POR',
  PORTOGALLO: 'POR',
  PORTUGAL: 'POR',
  '620': 'POR',
  XPT: 'POR',

  // Danimarca (solo DEN)
  DK: 'DEN',
  DNK: 'DEN',
  DEN: 'DEN',
  DANIMARCA: 'DEN',
  DENMARK: 'DEN',
  FO: 'DEN',
  FRO: 'DEN',
  '208': 'DEN',
  XDK: 'DEN',

  // Norvegia (solo NOR)
  NO: 'NOR',
  NOR: 'NOR',
  NORVEGIA: 'NOR',
  NORWAY: 'NOR',
  NORGE: 'NOR',
  '578': 'NOR',
  XNO: 'NOR',

  // Svezia (solo SWE)
  SE: 'SWE',
  SWE: 'SWE',
  SVEZIA: 'SWE',
  SWEDEN: 'SWE',
  SVERIGE: 'SWE',
  '752': 'SWE',
  XSE: 'SWE',

  // Finlandia (solo FIN)
  FI: 'FIN',
  FIN: 'FIN',
  FINLANDIA: 'FIN',
  FINLAND: 'FIN',
  SUOMI: 'FIN',
  '246': 'FIN',
  XFI: 'FIN',

  // Paesi Bassi / Olanda (solo HOL)
  NL: 'HOL',
  NLD: 'HOL',
  HOL: 'HOL',
  NED: 'HOL',
  'PAESI BASSI': 'HOL',
  NETHERLANDS: 'HOL',
  NEDERLAND: 'HOL',
  OLANDA: 'HOL',
  '528': 'HOL',
  XNL: 'HOL',

  // Belgio (solo BEL)
  BE: 'BEL',
  BEL: 'BEL',
  BELGIO: 'BEL',
  BELGIUM: 'BEL',
  BELGIQUE: 'BEL',
  '056': 'BEL',
  XBE: 'BEL',

  // Svizzera (solo SWI)
  CH: 'SWI',
  CHE: 'SWI',
  SWI: 'SWI',
  SVIZZERA: 'SWI',
  SWITZERLAND: 'SWI',
  SCHWEIZ: 'SWI',
  '756': 'SWI',
  XCH: 'SWI',

  // Austria (solo AUS)
  AT: 'AUS',
  AUT: 'AUS',
  AUS: 'AUS',
  AUSTRIA: 'AUS',
  OESTERREICH: 'AUS',
  '040': 'AUS',
  XAT: 'AUS',

  // Lituania (solo LIT)
  LT: 'LIT',
  LTU: 'LIT',
  LIT: 'LIT',
  LITUANIA: 'LIT',
  LITHUANIA: 'LIT',
  LIETUVA: 'LIT',
  '440': 'LIT',
  XLT: 'LIT',

  // Lettonia (solo LAT)
  LV: 'LAT',
  LVA: 'LAT',
  LAT: 'LAT',
  LETTONIA: 'LAT',
  LATVIA: 'LAT',
  LATVIJA: 'LAT',
  '428': 'LAT',
  XLV: 'LAT',

  // Estonia (solo EST)
  EE: 'EST',
  EST: 'EST',
  ESTONIA: 'EST',
  EESTI: 'EST',
  '233': 'EST',
  XEE: 'EST',

  // Irlanda (solo IRE)
  IE: 'IRE',
  IRL: 'IRE',
  IRE: 'IRE',
  EIR: 'IRE',
  IRLANDA: 'IRE',
  IRELAND: 'IRE',
  '372': 'IRE',
  XIE: 'IRE',

  // Islanda (solo ICE)
  IS: 'ICE',
  ISL: 'ICE',
  ICE: 'ICE',
  ISLANDA: 'ICE',
  ICELAND: 'ICE',
  '352': 'ICE',
  XIS: 'ICE',

  // Lussemburgo (solo LUX)
  LU: 'LUX',
  LUX: 'LUX',
  LUSSEMBURGO: 'LUX',
  LUXEMBOURG: 'LUX',
  '442': 'LUX',
  XLU: 'LUX',

  // Albania (solo ALB)
  AL: 'ALB',
  ALB: 'ALB',
  ALBANIA: 'ALB',
  SHQIPERIA: 'ALB',
  '008': 'ALB',
  XAL: 'ALB',

  // San Marino (solo SMR)
  SM: 'SMR',
  SMR: 'SMR',
  'SAN MARINO': 'SMR',
  '674': 'SMR',
  XSM: 'SMR',

  // Vaticano (solo VAT)
  VA: 'VAT',
  VAT: 'VAT',
  VATICANO: 'VAT',
  'VATICAN CITY': 'VAT',
  '336': 'VAT',
  XVA: 'VAT',

  // Gibilterra (solo GIB)
  GI: 'GIB',
  GIB: 'GIB',
  GIBILTERRA: 'GIB',
  GIBRALTAR: 'GIB',
  '292': 'GIB',
  XGI: 'GIB',

  // Andorra (solo AND)
  AD: 'AND',
  AND: 'AND',
  ANDORRA: 'AND',
  '020': 'AND',
  XAD: 'AND',

  // Liechtenstein (solo LIE)
  LI: 'LIE',
  LIE: 'LIE',
  LIECHTENSTEIN: 'LIE',
  '438': 'LIE',
  XLI: 'LIE',

  // Canada (solo CAN)
  CA: 'CAN',
  CAN: 'CAN',
  CANADA: 'CAN',
  '124': 'CAN',
  XCA: 'CAN',

  // Messico (solo MEX)
  MX: 'MEX',
  MEX: 'MEX',
  MESSICO: 'MEX',
  MEXICO: 'MEX',
  '484': 'MEX',
  XMX: 'MEX',

  // Brasile (solo BRA)
  BR: 'BRA',
  BRA: 'BRA',
  BRASILE: 'BRA',
  BRAZIL: 'BRA',
  '076': 'BRA',
  XBR: 'BRA',

  // Argentina (solo ARG)
  AR: 'ARG',
  ARG: 'ARG',
  ARGENTINA: 'ARG',
  '032': 'ARG',
  XAR: 'ARG',

  // Cile (solo CHL)
  CL: 'CHL',
  CHL: 'CHL',
  CILE: 'CHL',
  CHILE: 'CHL',
  '152': 'CHL',
  XCL: 'CHL',

  // Perù (solo PRU)
  PE: 'PRU',
  PRU: 'PRU',
  PER: 'PRU',
  PERU: 'PRU',
  '604': 'PRU',
  XPE: 'PRU',

  // Colombia (solo COL)
  CO: 'COL',
  COL: 'COL',
  COLOMBIA: 'COL',
  '170': 'COL',
  XCO: 'COL',

  // Venezuela (solo VEN)
  VE: 'VEN',
  VEN: 'VEN',
  VENEZUELA: 'VEN',
  '862': 'VEN',
  XVE: 'VEN',

  // Ecuador (solo ECU)
  EC: 'ECU',
  ECU: 'ECU',
  ECUADOR: 'ECU',
  '218': 'ECU',
  XEC: 'ECU',

  // Bolivia (solo BOL)
  BO: 'BOL',
  BOL: 'BOL',
  BOLIVIA: 'BOL',
  '068': 'BOL',
  XBO: 'BOL',

  // Paraguay (solo PAR)
  PY: 'PAR',
  PRY: 'PAR',
  PAR: 'PAR',
  PARAGUAY: 'PAR',
  '600': 'PAR',
  XPY: 'PAR',

  // Uruguay (solo URU)
  UY: 'URU',
  URY: 'URU',
  URU: 'URU',
  URUGUAY: 'URU',
  '858': 'URU',
  XUY: 'URU',

  // Cuba (solo CUB)
  CU: 'CUB',
  CUB: 'CUB',
  CUBA: 'CUB',
  '192': 'CUB',
  XCU: 'CUB',

  // Repubblica Dominicana (solo DOM)
  DO: 'DOM',
  DOM: 'DOM',
  'DOMINICAN REPUBLIC': 'DOM',
  'REPUBBLICA DOMINICANA': 'DOM',
  '214': 'DOM',
  XDO: 'DOM',

  // Haiti (solo HAI)
  HT: 'HAI',
  HTI: 'HAI',
  HAI: 'HAI',
  HAITI: 'HAI',
  '332': 'HAI',
  XHT: 'HAI',

  // Guatemala (solo GTM)
  GT: 'GTM',
  GTM: 'GTM',
  GUATEMALA: 'GTM',
  '320': 'GTM',
  XGT: 'GTM',

  // Honduras (solo HND)
  HN: 'HND',
  HND: 'HND',
  HONDURAS: 'HND',
  '340': 'HND',
  XHN: 'HND',

  // El Salvador (solo SLV)
  SV: 'SLV',
  SLV: 'SLV',
  'EL SALVADOR': 'SLV',
  '222': 'SLV',
  XSV: 'SLV',

  // Nicaragua (solo NIC)
  NI: 'NIC',
  NIC: 'NIC',
  NICARAGUA: 'NIC',
  '558': 'NIC',
  XNI: 'NIC',

  // Costa Rica (solo CRI)
  CR: 'CRI',
  CRI: 'CRI',
  'COSTA RICA': 'CRI',
  '188': 'CRI',
  XCR: 'CRI',

  // Panama (solo PAN)
  PA: 'PAN',
  PAN: 'PAN',
  PANAMA: 'PAN',
  '591': 'PAN',
  XPA: 'PAN',

  // Egitto (solo EGY)
  EG: 'EGY',
  EGY: 'EGY',
  EGITTO: 'EGY',
  EGYPT: 'EGY',
  '818': 'EGY',
  XEG: 'EGY',

  // Iran / Persia (solo IRN)
  IR: 'IRN',
  IRN: 'IRN',
  PER_IR: 'IRN',
  IRAN: 'IRN',
  PERSIA: 'IRN',
  '364': 'IRN',
  XIR: 'IRN',

  // Iraq / Mesopotamia (solo IRQ)
  IQ: 'IRQ',
  IRQ: 'IRQ',
  IRAQ: 'IRQ',
  MESOPOTAMIA: 'IRQ',
  '368': 'IRQ',
  XIQ: 'IRQ',

  // Arabia Saudita (solo SAU)
  SA: 'SAU',
  SAU: 'SAU',
  'ARABIA SAUDITA': 'SAU',
  'SAUDI ARABIA': 'SAU',
  '682': 'SAU',
  XSA: 'SAU',

  // Yemen (solo YEM)
  YE: 'YEM',
  YEM: 'YEM',
  YEMEN: 'YEM',
  '887': 'YEM',
  XYE: 'YEM',

  // Afghanistan (solo AFG)
  AF: 'AFG',
  AFG: 'AFG',
  AFGHANISTAN: 'AFG',
  '004': 'AFG',
  XAF: 'AFG',

  // Raj Britannico / India (solo RAJ)
  IN: 'RAJ',
  IND: 'RAJ',
  RAJ: 'RAJ',
  PK: 'RAJ',
  PAK: 'RAJ',
  BD: 'RAJ',
  BGD: 'RAJ',
  INDIA: 'RAJ',
  'BRITISH RAJ': 'RAJ',
  '356': 'RAJ',
  '586': 'RAJ',
  '050': 'RAJ',

  // Filippine (solo PHL)
  PH: 'PHL',
  PHL: 'PHL',
  PHI: 'PHL',
  FILIPPINE: 'PHL',
  PHILIPPINES: 'PHL',
  '608': 'PHL',
  XPH: 'PHL',

  // Tailandia / Siam (solo SIA)
  TH: 'SIA',
  THA: 'SIA',
  SIA: 'SIA',
  SIAM: 'SIA',
  THAILAND: 'SIA',
  TAILANDIA: 'SIA',
  '764': 'SIA',
  XTH: 'SIA',

  // Australia (solo AST)
  AU: 'AST',
  AUS_COMMONWEALTH: 'AST',
  AST: 'AST',
  AUSTRALIA: 'AST',
  '036': 'AST',
  XAU: 'AST',

  // Nuova Zelanda (solo NZL)
  NZ: 'NZL',
  NZL: 'NZL',
  'NUOVA ZELANDA': 'NZL',
  'NEW ZEALAND': 'NZL',
  '554': 'NZL',
  XNZ: 'NZL',

  // Sudafrica (solo SAF)
  ZA: 'SAF',
  ZAF: 'SAF',
  SAF: 'SAF',
  SUDAFRICA: 'SAF',
  'SOUTH AFRICA': 'SAF',
  '710': 'SAF',
  XZA: 'SAF',

  // Mongolia (solo MON)
  MN: 'MON',
  MNG: 'MON',
  MON: 'MON',
  MONGOLIA: 'MON',
  '496': 'MON',
  XMN: 'MON',

  // Tannu Tuva (solo TUV)
  TUV: 'TUV',
  'TANNU TUVA': 'TUV',
  TANNU_TUVA: 'TUV',

  // Tibet (solo TIB)
  TIB: 'TIB',
  TIBET: 'TIB',

  // Nepal (solo NEP)
  NP: 'NEP',
  NPL: 'NEP',
  NEP: 'NEP',
  NEPAL: 'NEP',
  '524': 'NEP',
  XNP: 'NEP',

  // Bhutan (solo BHU)
  BT: 'BHU',
  BTN: 'BHU',
  BHU: 'BHU',
  BHUTAN: 'BHU',
  '064': 'BHU',
  XBT: 'BHU',

  // Liberia (solo LBR)
  LR: 'LBR',
  LBR: 'LBR',
  LIB: 'LBR',
  LIBERIA: 'LBR',
  '430': 'LBR',
  XLR: 'LBR',

  // Etiopia (solo ETH)
  ET: 'ETH',
  ETH: 'ETH',
  ETIOPIA: 'ETH',
  ETHIOPIA: 'ETH',
  ABYSSINIA: 'ETH',
  '231': 'ETH',
  XET: 'ETH',

  // Algeria (solo DZA)
  DZ: 'DZA',
  DZA: 'DZA',
  ALGERIA: 'DZA',
  '012': 'DZA',

  // Libia (solo LBY)
  LY: 'LBY',
  LBY: 'LBY',
  LIBIA: 'LBY',
  LIBYA: 'LBY',
  '434': 'LBY',

  // Marocco (solo MAR)
  MA: 'MAR',
  MAR: 'MAR',
  MAROCCO: 'MAR',
  MOROCCO: 'MAR',
  '504': 'MAR',
  XMA: 'MAR',

  // Tunisia (solo TUN)
  TN: 'TUN',
  TUN: 'TUN',
  TUNISIA: 'TUN',
  '788': 'TUN',
  XTN: 'TUN',
};

/**
 * Normalizza qualsiasi identificatore di paese nel suo unico codice canonico a 3 lettere.
 * Se il codice non è riconosciuto o rappresenta una sotto-regione/enclave specifica,
 * restituisce la stringa originale pulita.
 */
export function toCanonicalCountryCode(raw: string | undefined | null): string {
  if (!raw) return '';
  const clean = String(raw).trim().toUpperCase();
  return CANONICAL_COUNTRY_CODES[clean] || clean;
}

/**
 * Verifica se un codice è un codice a 3 lettere canonico.
 */
export function isCanonicalCountryCode(code: string | undefined | null): boolean {
  if (!code) return false;
  const clean = String(code).trim().toUpperCase();
  return CANONICAL_COUNTRY_CODES[clean] === clean;
}
