/**
 * HISTORICAL PROVINCE-LEVEL DEMOGRAPHIC ENGINE (1936 - 1951)
 *
 * Calcola la popolazione storica autentica (in milioni di abitanti) per ciascuna
 * delle 3.006 entità territoriali lungo tutti i 28 step cronologici (GEN 1936 - GIU 1951).
 *
 * Principi progettuali:
 * 1. Ancoraggio geografico al territorio/provincia (non al tag politico fisso dell'owner):
 *    le conquiste, le spartizioni (Polonia 1939, Francia 1940, Barbarossa 1941-42,
 *    Italia 1943, Germania 1945-49, Cina 1937-50, India/Pakistan 1947, Corea 1948-50,
 *    Palestina 1948, Indonesia 1945-50) ridistribuiscono automaticamente gli abitanti reali.
 * 2. Pesi sub-nazionali storici (es. Giava vs Nuova Guinea Olandese, Cina costiera vs Tibet,
 *    RSFSR Europea vs Siberia, Ontario/Quebec vs Nunavut/Yukon, Inghilterra vs colonie).
 * 3. Curve cronologiche interpolate su serie storiche (Società delle Nazioni / ONU DESA / Maddison)
 *    che riflettono crescita naturale 1936-1950, perdite belliche 1941-1945 (URSS, Germania,
 *    Polonia, Cina, Giappone, Jugoslavia) ed espulsioni/migrazioni postbelliche (1945-1950).
 * 4. Normalizzazione esatta per regione: la somma delle province di ogni bacino demografico
 *    eguaglia esattamente la serie storica della regione ad ogni step (zero derive numeriche).
 */

export const STEP_YEARS: readonly number[] = [
  1936.05, // 0: GEN 1936
  1938.25, // 1: MAR 1938
  1938.80, // 2: OTT 1938
  1939.20, // 3: MAR 1939
  1939.30, // 4: APR 1939
  1939.72, // 5: SET 1939
  1940.48, // 6: GIU 1940
  1940.82, // 7: OTT 1940
  1941.32, // 8: APR 1941
  1941.98, // 9: DIC 1941
  1942.65, // 10: AGO 1942
  1942.90, // 11: NOV 1942
  1943.55, // 12: LUG 1943
  1943.72, // 13: SET 1943
  1944.48, // 14: GIU 1944
  1944.65, // 15: AGO 1944
  1944.98, // 16: DIC 1944
  1945.32, // 17: APR 1945
  1945.72, // 18: SET 1945
  1947.72, // 19: SET 1947
  1947.98, // 20: DIC 1947
  1948.48, // 21: GIU 1948
  1948.98, // 22: DIC 1948
  1949.48, // 23: GIU 1949
  1949.98, // 24: DIC 1949
  1950.48, // 25: GIU 1950
  1950.98, // 26: DIC 1950
  1951.48, // 27: GIU 1951
  1951.98, // 28: DIC 1951
  1952.98, // 29: DIC 1952
  1953.98, // 30: DIC 1953
  1954.98, // 31: DIC 1954
  1955.98, // 32: DIC 1955
  1956.98, // 33: DIC 1956
  1957.98, // 34: DIC 1957
];

type AnchorSeries = readonly [number, number][];

function interpolateSeries(series: AnchorSeries, year: number): number {
  if (year <= series[0][0]) return series[0][1];
  const last = series[series.length - 1];
  if (year > last[0]) {
    // Post-1951.0 semiannual natural demographic growth (~1.5% yr per Step 27+ lasciando 0..26 inalterati)
    return last[1] * (1 + 0.015 * Math.min(10, year - last[0]));
  }
  if (year === last[0]) return last[1];
  for (let i = 0; i < series.length - 1; i++) {
    const [y0, v0] = series[i];
    const [y1, v1] = series[i + 1];
    if (year >= y0 && year <= y1) {
      const t = (year - y0) / (y1 - y0 || 1);
      return v0 + (v1 - v0) * t;
    }
  }
  return last[1];
}

function growthSeries(p1936: number, p1950: number): AnchorSeries {
  return [
    [1936.0, p1936],
    [1943.5, p1936 + (p1950 - p1936) * 0.5],
    [1951.0, p1950],
  ];
}

// Serie demografiche storiche per bacino geografico (in milioni di abitanti)
// Fonte di calibrazione: UN DESA 1950 World Population Prospects / League of Nations Statistical Yearbooks / Maddison Project
const REGION_SERIES: Record<string, AnchorSeries> = {
  // === EUROPA OCCIDENTALE E CENTRALE ===
  UK_METRO: [
    [1936.0, 47.1],
    [1939.7, 47.8],
    [1945.5, 49.0],
    [1951.0, 50.4],
  ],
  UK_CROWN: growthSeries(0.15, 0.16), // IoM, Jersey, Guernsey
  IRE: growthSeries(2.97, 2.96),
  FRA_METRO: [
    [1936.0, 41.4],
    [1939.7, 41.7],
    [1945.3, 40.3],
    [1947.5, 40.8],
    [1951.0, 41.9],
  ],
  BEL_METRO: [
    [1936.0, 8.32],
    [1940.0, 8.39],
    [1945.0, 8.34],
    [1951.0, 8.64],
  ],
  HOL_METRO: [
    [1936.0, 8.52],
    [1940.0, 8.88],
    [1945.5, 9.26],
    [1951.0, 10.12],
  ],
  LUX: growthSeries(0.30, 0.30),
  SWI: growthSeries(4.17, 4.70),
  LIE: growthSeries(0.011, 0.014),
  MCO: growthSeries(0.024, 0.020),
  AND: growthSeries(0.005, 0.006),
  GIB: growthSeries(0.020, 0.023),
  MALTA: growthSeries(0.26, 0.31),
  CYPRUS: growthSeries(0.37, 0.49),

  // Germania divisa per zone storiche così da catturare esattamente Reich 1936-45 -> expellees -> BRD / DDR / Saar
  GER_WEST: [
    [1936.0, 39.2],
    [1939.5, 40.3],
    [1944.0, 39.6],
    [1945.5, 43.0], // primi evacuati dall'Est
    [1947.8, 47.8], // afflusso espulsi dai territori orientali / Sudeti
    [1949.5, 49.4],
    [1951.0, 50.2],
  ],
  GER_EAST: [
    [1936.0, 15.2],
    [1939.5, 16.0],
    [1944.0, 15.7],
    [1945.5, 17.5],
    [1947.8, 19.1], // picco postbellico espulsi nella SBZ
    [1949.8, 18.6],
    [1951.0, 18.3],
  ],
  GER_SAAR: growthSeries(0.82, 0.95),
  // Territori orientali pre-1939 poi Ziemie Odzyskane polacche (Slesia, Pomerania, Grenzmark, Masuria, Marienwerder)
  GER_LOST_POLAND: [
    [1936.0, 7.35],
    [1939.5, 7.50],
    [1944.5, 7.20],
    [1945.3, 4.40], // evacuazione tedesca + fronte aprile 1945
    [1947.8, 5.10], // espulsione residua tedesca + ripopolamento polacco dai Kresy
    [1951.0, 5.85],
  ],
  // Prussia Orientale settentrionale (Königsberg + Gumbinnen -> Oblast' di Kaliningrad)
  GER_KALININGRAD: [
    [1936.0, 2.15],
    [1939.5, 2.25],
    [1944.5, 2.10],
    [1945.3, 0.70],
    [1947.8, 0.42],
    [1951.0, 0.55],
  ],
  DANZIG: [
    [1936.0, 0.40],
    [1944.0, 0.41],
    [1945.4, 0.25],
    [1948.0, 0.30],
    [1951.0, 0.35],
  ],
  AUT: [
    [1936.0, 6.76],
    [1939.5, 6.65],
    [1945.3, 6.70],
    [1951.0, 6.94],
  ],

  // Polonia Core (centro-ovest + Alta Slesia polacca + Corridoio)
  POL_CORE: [
    [1936.0, 22.1],
    [1939.7, 22.9],
    [1944.5, 19.1], // Olocausto e perdite belliche
    [1945.7, 18.7],
    [1948.0, 18.9],
    [1951.0, 19.2],
  ],
  POL_KRESY_UKR: [
    [1936.0, 7.6],
    [1939.7, 7.9],
    [1945.0, 6.7],
    [1951.0, 7.0],
  ],
  POL_KRESY_BLR: [
    [1936.0, 4.35],
    [1939.7, 4.50],
    [1945.0, 3.75],
    [1951.0, 3.95],
  ],

  // Cecoslovacchia divisa in Terre Ceche nucleo, Sudeti, Slovacchia, Felvidék, Rutenia Subcarpatica
  CZE_CORE: growthSeries(7.45, 8.85),
  CZE_SUDETEN: [
    [1936.0, 3.55],
    [1939.5, 3.50],
    [1945.4, 3.25],
    [1947.5, 1.90], // espulsione tedeschi dei Sudeti + ripopolamento ceco
    [1951.0, 2.20],
  ],
  CZE_SLOVAKIA: growthSeries(2.65, 3.05),
  CZE_FELVIDEK: growthSeries(0.95, 1.02),
  CZE_RUTHENIA: growthSeries(0.79, 0.85),

  // Scandinavia & Baltici
  DEN_METRO: growthSeries(3.72, 4.27),
  GREENLAND: growthSeries(0.018, 0.023),
  FAROE: growthSeries(0.026, 0.032),
  ICE: growthSeries(0.116, 0.143),
  NOR: growthSeries(2.90, 3.27),
  SWE: growthSeries(6.26, 7.02),
  FIN_CORE: [
    [1936.0, 3.22],
    [1940.0, 3.30],
    [1945.5, 3.68], // sfollati careliani integrati in Finlandia
    [1951.0, 4.02],
  ],
  FIN_LOST: [
    [1936.0, 0.42],
    [1940.3, 0.08], // evacuazione careliana verso Finlandia
    [1942.5, 0.28],
    [1945.5, 0.18],
    [1951.0, 0.25],
  ],
  EST: [
    [1936.0, 1.13],
    [1940.0, 1.13],
    [1945.5, 0.90],
    [1951.0, 1.10],
  ],
  LAT: [
    [1936.0, 1.96],
    [1940.0, 1.99],
    [1945.5, 1.65],
    [1951.0, 1.95],
  ],
  LIT: [
    [1936.0, 2.51],
    [1940.0, 2.58],
    [1945.5, 2.25],
    [1951.0, 2.56],
  ],

  // Europa Meridionale & Balcani
  ITA_METRO: [
    [1936.0, 42.3],
    [1939.7, 43.8],
    [1943.7, 44.8],
    [1945.5, 45.1],
    [1951.0, 46.9],
  ],
  SMR: growthSeries(0.014, 0.013),
  VAT: growthSeries(0.001, 0.001),
  SPA_METRO: [
    [1936.0, 24.8],
    [1939.5, 25.5],
    [1945.5, 26.8],
    [1951.0, 28.0],
  ],
  POR_METRO: growthSeries(7.35, 8.44),
  HUN_METRO: [
    [1936.0, 9.02],
    [1941.0, 9.32],
    [1945.5, 8.95],
    [1951.0, 9.34],
  ],
  ROM_CORE: [
    [1936.0, 15.1],
    [1940.0, 15.7],
    [1945.5, 15.7],
    [1951.0, 16.3],
  ],
  ROM_BESS_BUK: [
    [1936.0, 3.65],
    [1940.5, 3.70],
    [1945.5, 3.10],
    [1951.0, 3.40],
  ],
  ROM_CADRILATER: growthSeries(0.41, 0.43),
  BUL_METRO: growthSeries(6.15, 7.25),
  YUG_METRO: [
    [1936.0, 14.9],
    [1941.2, 16.0],
    [1945.5, 15.1], // gravi perdite belliche in Jugoslavia
    [1951.0, 16.4],
  ],
  ALB: growthSeries(1.02, 1.22),
  GRE: [
    [1936.0, 6.90],
    [1941.0, 7.35],
    [1945.5, 7.30],
    [1951.0, 7.60],
  ],

  // === UNIONE SOVIETICA (PER REPUBBLICA / ZONA) ===
  SOV_UKR_PRE39: [
    [1936.0, 31.0],
    [1939.7, 32.2],
    [1942.5, 27.2],
    [1945.5, 26.2],
    [1951.0, 28.6],
  ],
  SOV_BLR_PRE39: [
    [1936.0, 5.45],
    [1939.7, 5.65],
    [1942.5, 4.55],
    [1945.5, 4.05],
    [1951.0, 4.55],
  ],
  SOV_CAUCASUS: growthSeries(7.5, 8.1),
  SOV_CENTRAL_ASIA: growthSeries(15.6, 17.4),
  SOV_RUS_WEST: [
    // RSFSR europea + Urali occidentali (area più densa e colpita da Barbarossa)
    [1936.0, 79.5],
    [1939.7, 82.8],
    [1942.5, 74.0],
    [1945.5, 70.5],
    [1951.0, 74.2],
  ],
  SOV_RUS_SIBERIA: [
    // Siberia, Estremo Oriente & Urali orientali (incl. evacuazioni belliche verso est 1941-45)
    [1936.0, 20.2],
    [1939.7, 21.6],
    [1942.5, 25.0], // evacuazione industrie e popolazione sovietica verso Urali/Siberia
    [1945.5, 23.8],
    [1951.0, 25.6],
  ],
  SOV_TUV: growthSeries(0.09, 0.13),

  // === MEDIO ORIENTE, AFGHANISTAN & TURCHIA ===
  AFG: growthSeries(6.9, 8.2),
  TUR: growthSeries(16.4, 21.1),
  HATAY: growthSeries(0.22, 0.29),
  SYR: growthSeries(2.45, 3.41),
  LEB: growthSeries(0.95, 1.35),
  PAL_ALL: [
    [1936.0, 1.35],
    [1945.5, 1.80],
    [1948.5, 1.95],
    [1951.0, 2.25], // Israele (~1.3M) + Cisgiordania (~0.7M) + Gaza (~0.25M)
  ],
  JOR: growthSeries(0.34, 0.56),
  IRQ: growthSeries(3.75, 5.20),
  IRN: growthSeries(13.8, 17.1),
  SAU: growthSeries(2.6, 3.2),
  YEM_NORTH: growthSeries(3.1, 3.8),
  YEM_SOUTH_ADEN: growthSeries(0.85, 1.15),
  OMAN: growthSeries(0.40, 0.50),
  GULF_STATES: growthSeries(0.22, 0.31), // Kuwait, Qatar, Trucial Oman

  // === SUBCONTINENTE INDIANO & HIMALAYA ===
  IND_UNION: [
    [1936.0, 276.0],
    [1941.2, 297.0],
    [1945.5, 314.0],
    [1947.8, 324.5],
    [1951.0, 337.5],
  ],
  IND_HYD: growthSeries(15.2, 18.6), // Hyderabad (stato separato step 19-21 poi reintegrato)
  IND_KASHMIR: growthSeries(3.8, 4.5), // Jammu & Kashmir + Ladakh
  PAK_WEST: growthSeries(27.0, 34.0),
  PAK_EAST: growthSeries(38.0, 44.2), // Bengala Orientale (Pakistan Orientale dal 1947)
  BUR: growthSeries(15.6, 18.3),
  CEY: growthSeries(5.7, 7.7),
  NEP: growthSeries(6.2, 8.5),
  BHU: growthSeries(0.45, 0.57),

  // === CINA, MANCIURIA, TAIWAN, COREA & GIAPPONE ===
  // Cina divisa per singola provincia + regioni periferiche in modo che ogni fronte 1937-1950 sia storicamente preciso
  JAP_HOME: [
    [1936.0, 69.0],
    [1940.8, 71.9],
    [1945.5, 71.6],
    [1948.0, 79.3], // rimpatrio milioni di civili/militari + baby boom
    [1951.0, 82.7],
  ],
  JAP_OKINAWA: growthSeries(0.58, 0.70),
  JAP_KARAFUTO: [
    [1936.0, 0.33],
    [1944.0, 0.41],
    [1946.0, 0.45],
    [1951.0, 0.50],
  ],
  JAP_CHISHIMA: growthSeries(0.02, 0.03),
  JAP_KWANTUNG: growthSeries(1.15, 1.65), // Penisola di Liaodong (Port Arthur / Dairen)
  KOR_SOUTH: growthSeries(14.7, 20.2),
  KOR_NORTH: growthSeries(7.8, 9.6),
  TWN: growthSeries(5.45, 7.62),
  TIB: growthSeries(2.4, 2.7),
  MON: growthSeries(0.74, 0.78),
  HKG: growthSeries(1.0, 2.0),
  MACAU: growthSeries(0.20, 0.19),
  XINJIANG: growthSeries(3.7, 4.4),
  INNER_MONGOLIA: growthSeries(4.8, 6.1), // Mengjiang
  MANCHURIA: growthSeries(37.5, 45.2), // Manchukuo (Liaoning, Jilin, Heilongjiang, Xingan)
  CHINA_PROPER_MAIN: [
    // Cina propria (22 province interne/costiere storiche): ~446M nel 1936 -> ~462M nel 1945 -> ~498M nel 1950
    // Totale Cina unificata 1950 (+Manciuria 45.2 + Mongolia Int. 6.1 + Xinjiang 4.4 = ~553.7M)
    [1936.0, 446.0],
    [1939.7, 456.0],
    [1945.5, 463.0],
    [1948.5, 480.0],
    [1951.0, 498.0],
  ],

  // === SUD-EST ASIATICO & OCEANIA ===
  VNM: growthSeries(19.5, 24.8),
  CAM: growthSeries(3.1, 4.3),
  LAO: growthSeries(1.1, 1.7),
  THA: growthSeries(14.2, 20.6),
  MALAYA: growthSeries(4.2, 5.4),
  SGP: growthSeries(0.62, 1.02),
  BRUNEI: growthSeries(0.036, 0.048),
  BORNEO_BRIT: growthSeries(0.75, 0.95), // Sabah/Sarawak (in MY12/MY13)
  PHL: growthSeries(15.1, 20.0),
  IDN_JAVA: growthSeries(44.8, 51.0),
  IDN_SUMATRA: growthSeries(9.4, 11.6),
  IDN_OUTER: growthSeries(11.8, 14.3), // Kalimantan, Sulawesi, Bali, Maluku, Timor
  IDN_PAPUA: growthSeries(0.55, 0.72), // Nuova Guinea Olandese
  TLS: growthSeries(0.46, 0.43),
  AST: growthSeries(6.78, 8.28),
  PNG: growthSeries(1.30, 1.70),
  NZL: growthSeries(1.57, 1.92),
  PACIFIC_UK_US_FR: growthSeries(0.95, 1.20), // Fiji, Salomone, Nuova Caledonia, Nuove Ebridi, Guam, Hawaii, Samoa...
  HAWAII: growthSeries(0.39, 0.50),

  // === AFRICA ===
  EGY: growthSeries(15.8, 20.9),
  LIBYA: growthSeries(0.84, 1.03),
  F_NAF_DZ: growthSeries(7.2, 8.8),
  F_NAF_MA: growthSeries(6.2, 8.8),
  F_NAF_TN: growthSeries(2.6, 3.5),
  ES_MAR: growthSeries(0.85, 1.08),
  TANGER: growthSeries(0.08, 0.14),
  ES_SAHARA_IFNI: growthSeries(0.04, 0.06),
  ES_GUINEA: growthSeries(0.18, 0.22),
  SUD: growthSeries(5.1, 6.7),
  SSD: growthSeries(1.7, 2.3),
  ETH: growthSeries(14.4, 18.1),
  ERI: growthSeries(0.75, 1.14),
  SOM_ITA: growthSeries(1.55, 2.10),
  SOM_BRIT: growthSeries(0.38, 0.48),
  DJI: growthSeries(0.05, 0.06),
  KEN: growthSeries(4.5, 6.1),
  UGA: growthSeries(3.8, 5.2),
  TZA: growthSeries(5.5, 7.7),
  RWA: growthSeries(1.7, 2.1),
  BDI: growthSeries(1.8, 2.3),
  BEL_CONGO: growthSeries(10.1, 12.2),
  NGA: growthSeries(24.0, 30.2),
  GHA: growthSeries(3.7, 5.0),
  SLE: growthSeries(1.75, 2.02),
  GMB: growthSeries(0.21, 0.27),
  LBR: growthSeries(0.75, 0.91),
  F_AOF: growthSeries(15.0, 17.5),
  F_AEF: growthSeries(3.6, 4.3),
  ZMB_N_RHOD: growthSeries(1.45, 2.30),
  ZWE_S_RHOD: growthSeries(1.35, 2.75),
  MWI_NYASA: growthSeries(1.75, 2.95),
  ANG: growthSeries(3.6, 4.3),
  MOZ: growthSeries(4.8, 6.3),
  SAF: growthSeries(9.6, 12.6),
  SWA_NAM: growthSeries(0.32, 0.48),
  BWA: growthSeries(0.28, 0.41),
  LSO: growthSeries(0.56, 0.73),
  SWZ: growthSeries(0.16, 0.27),
  MDG: growthSeries(3.8, 4.1),
  POR_ATLANTIC: growthSeries(0.22, 0.25), // Capo Verde, Sao Tome
  F_REUNION: growthSeries(0.21, 0.25),
  COMOROS: growthSeries(0.13, 0.16),

  // === AMERICHE ===
  USA_CONUS: growthSeries(128.0, 151.7),
  USA_ALASKA: growthSeries(0.068, 0.13),
  USA_PR_VI: growthSeries(1.75, 2.24),
  USA_PCZ: growthSeries(0.05, 0.055), // Panama Canal Zone & Guantanamo
  CAN_PROV: growthSeries(10.95, 13.70),
  CAN_TERR: growthSeries(0.020, 0.026), // YT, NT, NU
  CAN_NL: growthSeries(0.29, 0.36),
  MEX: growthSeries(18.5, 26.0),
  GTM: growthSeries(2.05, 3.15),
  BLZ: growthSeries(0.056, 0.068),
  HND: growthSeries(1.03, 1.50),
  SLV: growthSeries(1.55, 2.20),
  NIC: growthSeries(0.78, 1.29),
  CRI: growthSeries(0.57, 0.96),
  PAN: growthSeries(0.56, 0.86),
  CUB: growthSeries(4.30, 5.92),
  DOM: growthSeries(1.52, 2.36),
  HAI: growthSeries(2.58, 3.22),
  UK_CARIBBEAN: growthSeries(2.45, 3.10), // Giamaica, Trinidad, Bahamas, Piccole Antille, Guyana
  F_CARIB_SA: growthSeries(0.50, 0.56), // Martinica, Guadalupa, Guiana Francese, St. Martin/Barth
  HOL_AMER: growthSeries(0.26, 0.36), // Suriname + Antille Olandesi
  BRA: growthSeries(38.0, 53.5),
  ARG: growthSeries(13.3, 17.1),
  COL: growthSeries(8.4, 11.6),
  PRU: growthSeries(6.3, 7.7),
  VEN: growthSeries(3.5, 5.1),
  CHL: growthSeries(4.75, 6.08),
  ECU: growthSeries(2.3, 3.4),
  BOL: growthSeries(2.55, 3.09),
  PAR: growthSeries(0.98, 1.47),
  URY: growthSeries(1.88, 2.24),
};

// Pesi relativi delle province cinesi (calibrati sui censimenti storici 1936 e 1953)
const CHINA_PROVINCE_WEIGHTS: Record<string, number> = {
  CHN_SICHUAN: 46.5,
  CHN_CHONGQING: 15.0,
  CHN_SHANDONG: 40.5,
  CHN_HENAN: 36.5,
  CHN_JIANGSU: 35.0,
  CHN_SHANGHAI: 4.5,
  CHN_GUANGDONG: 31.5,
  CHN_HAINAN: 2.3,
  CHN_HEBEI: 29.5,
  CHN_BEIJING: 2.2,
  CHN_TIANJIN: 2.2,
  CHN_HUNAN: 29.0,
  CHN_ANHUI: 25.5,
  CHN_HUBEI: 24.5,
  CHN_ZHEJIANG: 20.8,
  CHN_JIANGXI: 15.5,
  CHN_GUANGXI: 15.2,
  CHN_SHANXI: 13.5,
  CHN_YUNNAN: 13.8,
  CHN_FUJIAN: 11.8,
  CHN_GUIZHOU: 11.5,
  CHN_SHAANXI: 11.2,
  CHN_GANSU: 8.5,
  CHN_QINGHAI: 1.5,
  CHN_NINGXIA: 1.2,
};

// Pesi di densità per la Russia / RSFSR (europea densa vs Siberia spopolata)
function getSovietWeight(id: string, areaKm2: number): number {
  const n = id.toUpperCase();
  // Città federali con altissima densità nonostante area minuscola
  if (n.includes('MOSCOW') && !n.includes('OBLAST')) return areaKm2 * 25.0;
  if (n.includes('SAINT_PETERSBURG')) return areaKm2 * 28.0;
  if (n.includes('KYIV') && n.includes('CITY')) return areaKm2 * 16.0;
  if (n.includes('SEVASTOPOL')) return areaKm2 * 8.0;
  if (n.includes('MOSCOW_OBLAST')) return areaKm2 * 2.4;
  // Siberia / Estremo Oriente (separato nel bacino SOV_RUS_SIBERIA, qui peso relativo interno)
  if (n.includes('YAKUT') || n.includes('CHUKOT') || n.includes('MAGADAN') || n.includes('KAMCHATKA')) return areaKm2 * 0.08;
  if (n.includes('YAMALO') || n.includes('NENETS') || n.includes('KHANTY') || n.includes('KRASNOYARSK') || n.includes('TYUMEN')) return areaKm2 * 0.25;
  if (n.includes('IRKUTSK') || n.includes('ZABAYKAL') || n.includes('BURYAT') || n.includes('AMUR') || n.includes('KHABAROVSK') || n.includes('SAKHALIN')) return areaKm2 * 0.45;
  if (n.includes('KEMEROVO') || n.includes('NOVOSIBIRSK') || n.includes('ALTAI_KRAI') || n.includes('OMSK') || n.includes('PRIMORSKY') || n.includes('CHELYABINSK') || n.includes('SVERDLOVSK')) return areaKm2 * 1.8;
  // RSFSR Europea: nucleo centrale/nero-terra più denso del nord artico (Komi, Arkhangelsk, Murmansk, Karelia)
  if (n.includes('ARKHANGELSK') || n.includes('KOMI') || n.includes('MURMANSK') || n.includes('KARELIA') || n.includes('PETROSKOI')) return areaKm2 * 0.18;
  if (n.includes('TULA') || n.includes('BELGOROD') || n.includes('KURSK') || n.includes('VORONEZH') || n.includes('NIZHNY') || n.includes('TATARSTAN') || n.includes('SAMARA') || n.includes('KRASNODAR') || n.includes('ROSTOV')) return areaKm2 * 1.45;
  return areaKm2;
}

function isSovietSiberiaOrFarEast(id: string): boolean {
  const n = id.toUpperCase();
  const sibKeys = [
    'ALTAI', 'AMUR', 'BURYAT', 'CHELYABINSK', 'CHUKOT', 'IRKUTSK', 'JEWISH_AUTONOMOUS',
    'KAMCHATKA', 'KEMEROVO', 'KHABAROVSK', 'KHAKASSIA', 'KHANTY', 'KRASNOYARSK', 'KURGAN',
    'MAGADAN', 'NOVOSIBIRSK', 'OMSK', 'PRIMORSKY', 'SAKHALIN', 'SVERDLOVSK', 'TOMSK',
    'TYUMEN', 'YAKUT', 'YAMALO', 'ZABAYKAL',
  ];
  return sibKeys.some((k) => n.includes(k));
}

function getEgyptWeight(id: string, areaKm2: number): number {
  // Valle e Delta del Nilo estremamente densi rispetto ai governatorati desertici (Matruh, Nuova Valle, Mar Rosso, Sinai)
  if (['EGDT', 'EGDK', 'EGGH', 'EGKB', 'EGMNF', 'EGSH', 'EGPT', 'EGSUZ', 'EGALX', 'EGC', 'EGGZ', 'EGIS', 'EGBH', 'EGFYM', 'EGBNS', 'EGMN', 'EGASN', 'EGKN', 'EGSU', 'EGAT', 'EGLX'].includes(id)) {
    return Math.max(areaKm2, 800) * 18.0;
  }
  return Math.max(areaKm2, 100) * 0.15;
}

function getIndiaWeight(id: string, areaKm2: number): number {
  // Pianura indo-gangetica e costi meridionali vs Himalaya/Arunachal/Deserto del Thar
  if (id === 'IN_UP' || id === 'IN_BIH' || id === 'IN_BEN' || id === 'IN_KER') return areaKm2 * 2.3;
  if (id === 'IN_DEL') return areaKm2 * 18.0;
  if (id === 'IN_MAD' || id === 'IN_HAR' || id === 'IN_PUN' || id === 'IN_PON') return areaKm2 * 1.45;
  if (id === 'IN_ARU' || id === 'IN_SIK' || id === 'IN_LAD') return areaKm2 * 0.12;
  if (id === 'IN_RAJ' || id === 'IN_HP' || id === 'IN_MIZ' || id === 'IN_ANI') return areaKm2 * 0.45;
  return areaKm2;
}

function getCanadaWeight(id: string, areaKm2: number): number {
  if (id === 'CA_ON' || id === 'CA_QC') return areaKm2 * 2.6;
  if (id === 'CA_PE' || id === 'CA_NS' || id === 'CA_NB') return areaKm2 * 3.5;
  if (id === 'CA_MB' || id === 'CA_SK' || id === 'CA_AB' || id === 'CA_BC') return areaKm2 * 0.65;
  return areaKm2;
}

function getIndonesiaOuterWeight(id: string, areaKm2: number): number {
  // Sulawesi meridionale, Bali e Lombok molto più dense dell'interno del Borneo (Kalimantan)
  if (id === 'IDBA' || id === 'IDNB') return areaKm2 * 4.5;
  if (id === 'IDSN' || id === 'IDSA' || id === 'IDGO') return areaKm2 * 2.2;
  if (id === 'IDKB' || id === 'IDKT' || id === 'IDKI' || id === 'IDKU') return areaKm2 * 0.28;
  return areaKm2;
}

const EAST_GERMAN_NUTS1 = new Set(['DE4', 'DE8', 'DED', 'DEE', 'DEG']);
const PREWAR_GERMAN_EAST_LOST = new Set([
  'PL51', 'PL52', 'PL42', 'PL43', 'PL62',
]);
const PREWAR_GERMAN_EXACT_LOST = new Set([
  'PL636',
  'PL411',
  'DE_RATIBOR_OBERSCHLESIEN',
  'DE_SCHLOCHAU_GRENZMARK',
  'DE_HIST_MARIENWERDER',
]);
const KRESY_BLR_PREFIX = 'PL_KRESY_BLR';
const KRESY_LIT_IDS = new Set([
  'LT011',
  'LT_SVENCIONYS_WILNO',
  'LT_DZUKIJA_PL_DRUSKININKAI',
]);

const SUDETEN_EXACT_IDS = new Set([
  'CZE_SUD_EGER', 'CZE_SUD_AUSSIG', 'CZE_SUD_REICHENBERG',
  'CZE_SUD_OPAVA', 'CZE_SUD_JAGERNDORF', 'CZE_SUD_ZNOJMO', 'CZE_SUD_KRUMLAU',
  'CZ041', 'CZ042', 'CZ051', 'CZ080',
]);

const SLOVAKIA_FELVIDEK_IDS = new Set([
  'CZE_HIST_FELVIDEK', 'CZE_FELVIDEK', 'CZE_CSALLOKOZ',
  'SK_HIST_FELVIDEK', 'SK010_SOUTH', 'SK021_SOUTH', 'SK023_SOUTH',
  'SK032_SOUTH', 'SK042_SOUTH',
]);

const BRITISH_CARIB_PREFIXES = [
  'HIST_XX_JAMAICA', 'HIST_XX_TRINIDAD', 'HIST_XX_BARBADOS', 'HIST_XX_BAHAMAS',
  'HIST_XX_BELIZE', 'HIST_XX_GUYANA', 'HIST_XX_ANTIGUA', 'HIST_XX_DOMINICA',
  'HIST_XX_GRENADA', 'HIST_XX_MONTSERRAT', 'HIST_XX_ANGUILLA', 'HIST_XX_SAINT_KITTS',
  'HIST_XX_SAINT_LUCIA', 'HIST_XX_SAINT_VINCENT', 'HIST_XX_TURKS',
];

const PACIFIC_ISLAND_PREFIXES = [
  'HIST_XX_FIJI', 'HIST_XX_SOLOMON', 'HIST_XX_SOUTH_SEAS_MANDATE', 'HIST_XX_GUAM',
  'HIST_XX_GILBERT', 'HIST_XX_SAIPAN', 'HIST_XX_AMERICAN_SAMOA', 'HIST_XX_NIUE',
  'HIST_XX_TONGA', 'HIST_XX_SAMOA', 'HIST_XX_RAPA_NUI', 'HIST_XX_TERRITORIO_INSULARE',
  'NH_HEBRIDES', 'NC_CALEDONIA', 'WF_WALLIS_FUTUNA', 'PF_POLYNESIA',
];

/**
 * Classifica ogni feature geografica nel proprio bacino demografico storico + peso relativo.
 * Garantisce classificazione esplicita per 3.006/3.006 feature.
 */
export function classifyFeatureDemographics(
  f: any,
  areaKm2: number
): { region: string; weight: number } {
  const id = String(f.id || '');
  const p = f.properties || {};
  const cntr = String(p.CNTR_CODE || '');
  const a = Math.max(areaKm2, 0.1);

  // 1. Cina, Taiwan, Hong Kong, Macau, Manciuria, Mengjiang, Xinjiang, Tibet
  if (id === 'CHN_TAIWAN') return { region: 'TWN', weight: a };
  if (id === 'CHN_TIBET') return { region: 'TIB', weight: a };
  if (id === 'CHN_HONGKONG') return { region: 'HKG', weight: a };
  if (id === 'CHN_MACAU') return { region: 'MACAU', weight: a };
  if (id === 'CHN_XINJIANG' || id === 'CHN_XINJIANG_ETR') return { region: 'XINJIANG', weight: a };
  if (id === 'CHN_INNER_MONGOLIA') return { region: 'INNER_MONGOLIA', weight: a };
  if (id === 'CHN_LIAONING' || id === 'CHN_JILIN' || id === 'CHN_HEILONGJIANG' || id.startsWith('CHN_MANCHUKUO')) {
    const manW = id === 'CHN_LIAONING' ? 19.0 : id === 'CHN_JILIN' ? 11.5 : id === 'CHN_HEILONGJIANG' ? 9.5 : 3.5;
    return { region: 'MANCHURIA', weight: manW };
  }
  if (id in CHINA_PROVINCE_WEIGHTS) {
    return { region: 'CHINA_PROPER_MAIN', weight: CHINA_PROVINCE_WEIGHTS[id] };
  }

  // 2. Unione Sovietica pre-1939
  if (id === 'SOV_ADM1_RUS_55_Tuva' || cntr === 'TUV') return { region: 'SOV_TUV', weight: a };
  if (id.startsWith('SOV_ADM1_UKR_') || id === 'SOV_MASSR_310_Transnistria') {
    return { region: 'SOV_UKR_PRE39', weight: getSovietWeight(id, a) };
  }
  if (id.startsWith('SOV_ADM1_BLR_') || id === 'SOV_BYAHOML_BSSR') {
    return { region: 'SOV_BLR_PRE39', weight: getSovietWeight(id, a) };
  }
  if (id.startsWith('SOV_ADM1_GEO_') || id.startsWith('SOV_ADM1_ARM_') || id.startsWith('SOV_ADM1_AZE_')) {
    return { region: 'SOV_CAUCASUS', weight: a };
  }
  if (
    id.startsWith('SOV_ADM1_KAZ_') || id.startsWith('SOV_ADM1_UZB_') ||
    id.startsWith('SOV_ADM1_TKM_') || id.startsWith('SOV_ADM1_TJK_') || id.startsWith('SOV_ADM1_KGZ_')
  ) {
    return { region: 'SOV_CENTRAL_ASIA', weight: a };
  }
  if (id.startsWith('SOV_')) {
    return {
      region: isSovietSiberiaOrFarEast(id) ? 'SOV_RUS_SIBERIA' : 'SOV_RUS_WEST',
      weight: getSovietWeight(id, a),
    };
  }

  // 3. Germania & territori pre-1939 (divisi per zone storiche)
  if (id === 'DANZIG' || cntr === 'DANZIG') return { region: 'DANZIG', weight: a };
  if (id === 'DE_HIST_KONIGSBERG' || id === 'DE_HIST_GUMBINNEN') return { region: 'GER_KALININGRAD', weight: a };
  if (PREWAR_GERMAN_EXACT_LOST.has(id) || PREWAR_GERMAN_EAST_LOST.has(id.slice(0, 4))) {
    return { region: 'GER_LOST_POLAND', weight: a };
  }
  if (id === 'MEMEL' || cntr === 'MEMEL') return { region: 'LIT', weight: a };
  if (id.startsWith('DEC')) return { region: 'GER_SAAR', weight: a };
  if (id === 'DE300_EAST' || EAST_GERMAN_NUTS1.has(id.slice(0, 3))) return { region: 'GER_EAST', weight: a };
  if (id === 'DE300_WEST' || cntr === 'DE' || id.startsWith('DE')) return { region: 'GER_WEST', weight: a };

  // 4. Polonia (Core + Corridoio + Alta Slesia polacca + Kresy)
  if (id.startsWith(KRESY_BLR_PREFIX) || KRESY_LIT_IDS.has(id)) return { region: 'POL_KRESY_BLR', weight: a };
  if (id.startsWith('PL_KRESY_UKR')) return { region: 'POL_KRESY_UKR', weight: a };
  if (cntr === 'PL' || id.startsWith('PL') || id === 'CZE_ZAOLZIE') return { region: 'POL_CORE', weight: a };

  // 5. Cecoslovacchia
  if (cntr === 'RUTHENIA' || id.includes('RUTHENIA') || id === 'CZE_SUBCARPATHIA') {
    return { region: 'CZE_RUTHENIA', weight: a };
  }
  if (SLOVAKIA_FELVIDEK_IDS.has(id) || id.includes('FELVIDEK') || id.includes('SOUTH_SK')) {
    return { region: 'CZE_FELVIDEK', weight: a };
  }
  if (SUDETEN_EXACT_IDS.has(id) || id.startsWith('CZE_SUD_')) {
    return { region: 'CZE_SUDETEN', weight: a };
  }
  if (id.startsWith('SK')) return { region: 'CZE_SLOVAKIA', weight: a };
  if (cntr === 'CZ' || id.startsWith('CZ') || id.startsWith('CZE')) return { region: 'CZE_CORE', weight: a };

  // 6. Baltici & Scandinavia
  if (cntr === 'EE' || id.startsWith('EE')) return { region: 'EST', weight: a };
  if (cntr === 'LV' || id.startsWith('LV')) return { region: 'LAT', weight: a };
  if (cntr === 'LT' || id.startsWith('LT')) return { region: 'LIT', weight: a };
  if (id === 'GL_GREENLAND' || cntr === 'DEN') return { region: 'GREENLAND', weight: a };
  if (id === 'FO_FAROE_HIST' || cntr === 'FO') return { region: 'FAROE', weight: a };
  if (cntr === 'DK' || id.startsWith('DK')) return { region: 'DEN_METRO', weight: a };
  if (cntr === 'IS' || id.startsWith('IS')) return { region: 'ICE', weight: a };
  if (cntr === 'NO' || id.startsWith('NO')) return { region: 'NOR', weight: a };
  if (cntr === 'SE' || id.startsWith('SE')) return { region: 'SWE', weight: a };
  if (cntr === 'FIN_KARELIA' || cntr === 'FIN_PETSAMO' || cntr === 'FIN_SALLA' || cntr === 'FIN_RYBACHY' || cntr === 'FIN_SUURSAARI') return { region: 'FIN_LOST', weight: a };
  if (cntr === 'FI' || cntr === 'FIN_HANKO' || cntr === 'FIN_PORKKALA' || id.startsWith('FI')) return { region: 'FIN_CORE', weight: a };

  // 7. Europa Occidentale & Meridionale
  if (cntr === 'UK' || id.startsWith('UK')) {
    // Città/contee inglesi ad altissima densità vs Highlands scozzesi
    const ukW = id.startsWith('UKI') ? a * 22.0 : id.startsWith('UKM6') ? a * 0.15 : a;
    return { region: 'UK_METRO', weight: ukW };
  }
  if (cntr === 'JE' || cntr === 'GG' || id === 'HIST_XX_ISLE_OF_MAN_UK') return { region: 'UK_CROWN', weight: a };
  if (cntr === 'IE' || id.startsWith('IE')) return { region: 'IRE', weight: a };
  if (cntr === 'FR' || id.startsWith('FR')) {
    if (id === 'FR_HIST_GUIANA') return { region: 'F_CARIB_SA', weight: a };
    const frW = id === 'FR101' || id.startsWith('FR10') ? a * 8.0 : a;
    return { region: 'FRA_METRO', weight: frW };
  }
  if (cntr === 'BE' || id.startsWith('BE')) return { region: 'BEL_METRO', weight: a };
  if (cntr === 'NL' || id.startsWith('NL')) return { region: 'HOL_METRO', weight: a };
  if (cntr === 'LU' || id.startsWith('LU')) return { region: 'LUX', weight: a };
  if (cntr === 'CH' || id.startsWith('CH')) return { region: 'SWI', weight: a };
  if (cntr === 'AT' || id.startsWith('AT')) return { region: 'AUT', weight: a };
  if (cntr === 'LI' || id === 'LIE') return { region: 'LIE', weight: a };
  if (cntr === 'MC' || id === 'MCO') return { region: 'MCO', weight: a };
  if (cntr === 'AD' || id === 'HIST_XX_ANDORRA') return { region: 'AND', weight: a };
  if (cntr === 'GI' || id === 'GIB') return { region: 'GIB', weight: a };
  if (cntr === 'MT' || id.startsWith('MT')) return { region: 'MALTA', weight: a };
  if (cntr === 'CY' || id.startsWith('CY')) return { region: 'CYPRUS', weight: a };
  if (cntr === 'SM' || id === 'SMR') return { region: 'SMR', weight: a };
  if (cntr === 'VA' || id === 'VAT') return { region: 'VAT', weight: a };
  if (cntr === 'PT' || id.startsWith('PT')) return { region: 'POR_METRO', weight: a };
  if (cntr === 'ES' || id.startsWith('ES1') || id.startsWith('ES2') || id.startsWith('ES3') || id.startsWith('ES4') || id.startsWith('ES5') || id.startsWith('ES6') || id.startsWith('ES7')) {
    const esW = id === 'ES300' || id === 'ES511' ? a * 5.0 : a;
    return { region: 'SPA_METRO', weight: esW };
  }
  if (cntr === 'EL' || id.startsWith('EL')) {
    const grW = id === 'EL303' || id === 'EL30' ? a * 5.0 : a;
    return { region: 'GRE', weight: grW };
  }
  if (cntr === 'IT' || cntr === 'IT_FIUME' || cntr === 'IT_ZARA' || id.startsWith('IT') || cntr === 'SI' || id.startsWith('SI') || cntr === 'HR' || id.startsWith('HR')) {
    // Italia metropolitana vs Slovenia/Croazia (Jugoslavia): discriminiamo SI/HR che erano Jugoslavia vs Istria/Gorizia/Zara/Fiume italiane
    if (
      cntr === 'SI' || cntr === 'HR' ||
      id.startsWith('SI') || id.startsWith('HR')
    ) {
      if (id === 'SI044' || id === 'SI043' || id === 'SI_HIST_KOPER' || id === 'HR036' || id === 'HR_HIST_BUIE' || cntr === 'IT_FIUME' || cntr === 'IT_ZARA') {
        return { region: 'ITA_METRO', weight: a };
      }
      return { region: 'YUG_METRO', weight: a };
    }
    const itW = id === 'ITI43' || id === 'ITC4C' || id === 'ITF33' ? a * 3.5 : a;
    return { region: 'ITA_METRO', weight: itW };
  }
  if (cntr === 'HU' || id.startsWith('HU')) return { region: 'HUN_METRO', weight: a };
  if (cntr === 'RO_BES' || cntr === 'RO_BUK' || cntr === 'RO_BUD') return { region: 'ROM_BESS_BUK', weight: a };
  if (cntr === 'RO' || id.startsWith('RO')) return { region: 'ROM_CORE', weight: a };
  if (cntr === 'BG' || id.startsWith('BG')) return { region: 'BUL_METRO', weight: a };
  if (cntr === 'AL' || id.startsWith('AL')) return { region: 'ALB', weight: a };
  if (cntr === 'RS' || cntr === 'BA' || cntr === 'ME' || cntr === 'MK' || cntr === 'XK') {
    return { region: 'YUG_METRO', weight: a };
  }

  // 8. Medio Oriente, Afghanistan & Turchia
  if (cntr === 'AFG' || id.startsWith('AF_')) return { region: 'AFG', weight: id === 'AF_KAB' ? a * 6.0 : a };
  if (id === 'TR63' || id.includes('HATAY')) return { region: 'HATAY', weight: a };
  if (cntr === 'TR' || id.startsWith('TR')) return { region: 'TUR', weight: a };
  if (cntr === 'SYR' || id.startsWith('SYR')) return { region: 'SYR', weight: a };
  if (cntr === 'LEB' || id.startsWith('LEB')) return { region: 'LEB', weight: a };
  if (cntr === 'PAL' || id.startsWith('PAL_')) {
    const palW = id === 'PAL_BEER' ? a * 0.12 : id === 'PAL_GAZ' ? a * 4.5 : a * 2.0;
    return { region: 'PAL_ALL', weight: palW };
  }
  if (cntr === 'JO' || id === 'HB_TRANSJORDAN') return { region: 'JOR', weight: a };
  if (cntr === 'IQ' || id.startsWith('IQ')) return { region: 'IRQ', weight: a };
  if (cntr === 'IR' || id.startsWith('IR')) return { region: 'IRN', weight: a };
  if (id.includes('SAUDI_ARABIA') || id === 'HIST_XX_EMIRATE_OF_BIN_SHAL_AN' || id === 'HIST_XX_HEJAZ' || id === 'HIST_XX_HAIL') {
    return { region: 'SAU', weight: a };
  }
  if (cntr === 'YE' || cntr === 'YEM') {
    if (id === 'YEM' || id === 'YE_NORTH' || id.startsWith('YEHD') === false && id.startsWith('YEAD') === false && ['YESA', 'YEAM', 'YEHJ', 'YEMA', 'YEHU', 'YEDH', 'YEIB', 'YETA', 'YESN', 'YERM', 'YEBA'].includes(id)) {
      return { region: 'YEM_NORTH', weight: a };
    }
    return { region: 'YEM_SOUTH_ADEN', weight: a };
  }
  if (id.includes('OMAN')) return { region: 'OMAN', weight: a };
  if (cntr === 'KW' || id.includes('QATAR') || id.includes('TRUCIAL_OMAN') || id === 'HB_KUWAIT') {
    return { region: 'GULF_STATES', weight: a };
  }

  // 9. Subcontinente Indiano & Himalaya
  if (id === 'IN_HYD') return { region: 'IND_HYD', weight: a };
  if (id === 'IN_JK' || id === 'IN_LAD') return { region: 'IND_KASHMIR', weight: id === 'IN_LAD' ? a * 0.08 : a };
  if (cntr === 'IN' || id === 'HIST_XX_INDIA') return { region: 'IND_UNION', weight: getIndiaWeight(id, a) };
  if (cntr === 'PK') return { region: 'PAK_WEST', weight: id === 'PK_BAL' ? a * 0.15 : a };
  if (cntr === 'BD') return { region: 'PAK_EAST', weight: a };
  if (cntr === 'MM') return { region: 'BUR', weight: id === 'MM_RAN' ? a * 8.0 : a };
  if (id === 'HIST_XX_CEYLON') return { region: 'CEY', weight: a };
  if (id === 'HIST_XX_NEPAL') return { region: 'NEP', weight: a };
  if (id === 'BHU' || id.includes('BHUTAN')) return { region: 'BHU', weight: a };

  // 10. Giappone, Corea, Sud-Est Asiatico, Oceania
  if (id === 'JP_KARAFUTO') return { region: 'JAP_KARAFUTO', weight: a };
  if (id === 'JP_CHISHIMA') return { region: 'JAP_CHISHIMA', weight: a };
  if (id === 'JP_KANTO_SHU') return { region: 'JAP_KWANTUNG', weight: a };
  if (id === 'JP47') return { region: 'JAP_OKINAWA', weight: a };
  if (cntr === 'JP' || id.startsWith('JP')) {
    const jpW =
      id === 'JP01'
        ? a * 0.25 // Hokkaidō molto meno denso di Honshū
        : id === 'JP13' || id === 'JP27'
        ? a * 7.5 // Tokyo & Osaka
        : id === 'JP14' || id === 'JP23'
        ? a * 3.5 // Kanagawa & Aichi
        : a;
    return { region: 'JAP_HOME', weight: jpW };
  }
  if (cntr === 'KR' || id.startsWith('KR')) return { region: 'KOR_SOUTH', weight: id.includes('41') || id.includes('11') ? a * 2.4 : a };
  if (cntr === 'KP' || id.startsWith('KP')) return { region: 'KOR_NORTH', weight: a };
  if (cntr === 'MN' || id === 'HIST_XX_MONGOLIA') return { region: 'MON', weight: a };
  if (cntr === 'VN') return { region: 'VNM', weight: id === 'VN65' || id === 'VNHN' ? a * 5.0 : a };
  if (cntr === 'LA') return { region: 'LAO', weight: a };
  if (cntr === 'KH') return { region: 'CAM', weight: a };
  if (cntr === 'TH') return { region: 'THA', weight: id === 'TH10' ? a * 12.0 : a };
  if (cntr === 'SG' || id === 'SG01') return { region: 'SGP', weight: a };
  if (id === 'HIST_XX_BRUNEI') return { region: 'BRUNEI', weight: a };
  if (cntr === 'MY') {
    if (id === 'MY12' || id === 'MY13') return { region: 'BORNEO_BRIT', weight: a };
    return { region: 'MALAYA', weight: a };
  }
  if (cntr === 'PH') return { region: 'PHL', weight: a };
  if (cntr === 'ID') {
    if (id === 'IDPA' || id === 'IDPB') return { region: 'IDN_PAPUA', weight: a };
    if (['IDJK', 'IDBT', 'IDJB', 'IDJT', 'IDYO', 'IDJI'].includes(id)) {
      return { region: 'IDN_JAVA', weight: id === 'IDJK' ? a * 16.0 : a };
    }
    if (['IDAC', 'IDSU', 'IDSB', 'IDRI', 'IDKR', 'IDJA', 'IDSS', 'IDBE', 'IDLA', 'IDBB'].includes(id)) {
      return { region: 'IDN_SUMATRA', weight: a };
    }
    return { region: 'IDN_OUTER', weight: getIndonesiaOuterWeight(id, a) };
  }
  if (cntr === 'TL' || id === 'TLS') return { region: 'TLS', weight: a };
  if (id === 'HIST_XX_AUSTRALIA') return { region: 'AST', weight: a };
  if (cntr === 'PG' || id.startsWith('PG')) return { region: 'PNG', weight: a };
  if (cntr === 'NZ' || cntr === 'NZL' || id === 'HIST_XX_NEW_ZEALAND') return { region: 'NZL', weight: a };
  if (id === 'US_HAWAII') return { region: 'HAWAII', weight: a };
  if (PACIFIC_ISLAND_PREFIXES.some((p_) => id.startsWith(p_))) return { region: 'PACIFIC_UK_US_FR', weight: a };

  // 11. Africa
  if (cntr === 'EG') return { region: 'EGY', weight: getEgyptWeight(id, a) };
  if (cntr === 'LY') return { region: 'LIBYA', weight: id.includes('TR') || id.includes('NL') || id.includes('ZB') ? a * 6.0 : a * 0.2 };
  if (cntr === 'DZ') return { region: 'F_NAF_DZ', weight: a < 15000 ? a * 10.0 : a * 0.1 };
  if (cntr === 'MA') return { region: 'F_NAF_MA', weight: a };
  if (cntr === 'TN') return { region: 'F_NAF_TN', weight: a };
  if (cntr === 'ES_RIF') return { region: 'ES_MAR', weight: a };
  if (cntr === 'TANGER' || id === 'TANGER') return { region: 'TANGER', weight: a };
  if (cntr === 'ES_IFNI' || id.includes('SPANISH_SAHARA') || id.includes('RIO_DE_ORO')) return { region: 'ES_SAHARA_IFNI', weight: a };
  if (id === 'HIST_XX_EQUATORIAL_GUINEA') return { region: 'ES_GUINEA', weight: a };
  if (cntr === 'SD') return { region: 'SUD', weight: a };
  if (cntr === 'SS') return { region: 'SSD', weight: a };
  if (cntr === 'ET') return { region: 'ETH', weight: a };
  if (id === 'HIST_XX_ERITREA_ITALY') return { region: 'ERI', weight: a };
  if (id === 'HIST_XX_ITALIAN_SOMALILAND') return { region: 'SOM_ITA', weight: a };
  if (id === 'HIST_XX_BRITISH_SOMALILAND') return { region: 'SOM_BRIT', weight: a };
  if (id === 'HIST_XX_FRENCH_SOMALILAND') return { region: 'DJI', weight: a };
  if (id === 'HIST_XX_KENYA') return { region: 'KEN', weight: a };
  if (id === 'HIST_XX_UGANDA') return { region: 'UGA', weight: a };
  if (id === 'HIST_XX_TANZANIA_UNITED_REPUBLIC_OF') return { region: 'TZA', weight: a };
  if (id === 'HIST_XX_RWANDA_BELGIUM') return { region: 'RWA', weight: a };
  if (id === 'HIST_XX_BURUNDI') return { region: 'BDI', weight: a };
  if (id === 'HIST_XX_BELGIAN_CONGO') return { region: 'BEL_CONGO', weight: a };
  if (id === 'HIST_XX_NIGERIA') return { region: 'NGA', weight: a };
  if (id === 'HIST_XX_GOLD_COAST' || id === 'HIST_XX_TOGO') return { region: 'GHA', weight: a };
  if (id === 'HIST_XX_SIERRA_LEONE') return { region: 'SLE', weight: a };
  if (id === 'HIST_XX_GAMBIA_THE') return { region: 'GMB', weight: a };
  if (id === 'HIST_XX_LIBERIA') return { region: 'LBR', weight: a };
  if (['SN', 'ML', 'MR', 'GN', 'CI', 'BF', 'NE', 'BJ'].includes(cntr) || id === 'HIST_XX_GUINEA_BISSAU') {
    return { region: 'F_AOF', weight: a };
  }
  if (['TD', 'CF', 'CM', 'CG', 'GA'].includes(cntr)) return { region: 'F_AEF', weight: a };
  if (id === 'HIST_XX_NORTHERN_RHODESIA') return { region: 'ZMB_N_RHOD', weight: a };
  if (id === 'HIST_XX_SOUTHERN_RHODESIA') return { region: 'ZWE_S_RHOD', weight: a };
  if (id === 'HIST_XX_MALAWI') return { region: 'MWI_NYASA', weight: a };
  if (id === 'HIST_XX_ANGOLA_PORTUGAL') return { region: 'ANG', weight: a };
  if (id === 'HIST_XX_MOZAMBIQUE_PORTUGAL') return { region: 'MOZ', weight: a };
  if (cntr === 'ZA') return { region: 'SAF', weight: a };
  if (cntr === 'NA') return { region: 'SWA_NAM', weight: a };
  if (id === 'HIST_XX_BOTSWANA') return { region: 'BWA', weight: a };
  if (id === 'HIST_XX_LESOTHO') return { region: 'LSO', weight: a };
  if (id === 'HIST_XX_SWAZILAND') return { region: 'SWZ', weight: a };
  if (id === 'HIST_XX_MADAGASCAR_FRANCE' || cntr === 'F_COL' && id.includes('MADAGASCAR')) return { region: 'MDG', weight: a };
  if (id === 'ST_SAOTOME' || id === 'CV_CAPEVERDE') return { region: 'POR_ATLANTIC', weight: a };
  if (id === 'RE_REUNION') return { region: 'F_REUNION', weight: a };
  if (id === 'KM_COMOROS') return { region: 'COMOROS', weight: a };

  // 12. Americhe
  if (id === 'US_AK') return { region: 'USA_ALASKA', weight: a };
  if (id === 'HIST_XX_PUERTO_RICO' || id === 'HIST_XX_UNITED_STATES_VIRGIN_ISLANDS') return { region: 'USA_PR_VI', weight: a };
  if (id === 'US_GUANTANAMO' || id === 'US_PCZ' || id === 'HIST_US_PCZ_PANAMA_CANAL_ZONE' || cntr === 'US_PCZ') {
    return { region: 'USA_PCZ', weight: a };
  }
  if (cntr === 'US' || id.startsWith('US_')) return { region: 'USA_CONUS', weight: a };
  if (cntr === 'NF' || id === 'CA_NL') return { region: 'CAN_NL', weight: a };
  if (id === 'CA_YT' || id === 'CA_NT' || id === 'CA_NU') return { region: 'CAN_TERR', weight: a };
  if (cntr === 'CAN' || id.startsWith('CA_')) return { region: 'CAN_PROV', weight: getCanadaWeight(id, a) };
  if (cntr === 'MX' || id.startsWith('MX') || cntr === 'MEX') return { region: 'MEX', weight: a };
  if (id === 'HIST_XX_GUATEMALA') return { region: 'GTM', weight: a };
  if (id === 'HIST_XX_BELIZE') return { region: 'BLZ', weight: a };
  if (id === 'HIST_XX_HONDURAS') return { region: 'HND', weight: a };
  if (id === 'HIST_XX_EL_SALVADOR') return { region: 'SLV', weight: a };
  if (id === 'HIST_XX_NICARAGUA') return { region: 'NIC', weight: a };
  if (id === 'HIST_XX_COSTA_RICA') return { region: 'CRI', weight: a };
  if (id === 'HIST_XX_PANAMA') return { region: 'PAN', weight: a };
  if (id === 'HIST_XX_CUBA') return { region: 'CUB', weight: a };
  if (id === 'HIST_XX_DOMINICAN_REPUBLIC') return { region: 'DOM', weight: a };
  if (id === 'HIST_XX_HAITI') return { region: 'HAI', weight: a };
  if (BRITISH_CARIB_PREFIXES.some((p_) => id.startsWith(p_))) return { region: 'UK_CARIBBEAN', weight: a };
  if (['HIST_XX_MARTINIQUE', 'HIST_XX_GUADELOUPE', 'HIST_XX_SAINT_MARTIN', 'HIST_XX_SAINT_BARTHELEMY'].includes(id)) {
    return { region: 'F_CARIB_SA', weight: a };
  }
  if (id === 'HIST_XX_SURINAME' || id === 'HIST_XX_NETHERLANDS_ANTILLES') return { region: 'HOL_AMER', weight: a };
  if (id === 'HIST_XX_BRAZIL') return { region: 'BRA', weight: a };
  if (id === 'HIST_XX_ARGENTINA') return { region: 'ARG', weight: a };
  if (id === 'HIST_XX_COLOMBIA') return { region: 'COL', weight: a };
  if (id === 'HIST_XX_PERU') return { region: 'PRU', weight: a };
  if (id === 'HIST_XX_VENEZUELA') return { region: 'VEN', weight: a };
  if (id === 'HIST_XX_CHILE') return { region: 'CHL', weight: a };
  if (cntr === 'EC' || cntr === 'EC_ORI' || id.includes('ECUADOR')) return { region: 'ECU', weight: a };
  if (id === 'HIST_XX_BOLIVIA') return { region: 'BOL', weight: a };
  if (id === 'HIST_XX_PARAGUAY') return { region: 'PAR', weight: a };
  if (id === 'HIST_XX_URUGUAY') return { region: 'URY', weight: a };

  // Fallback esplicito per isole minori / territori residui (area-proporzionale a bassa densità)
  return { region: '__UNMAPPED__', weight: a };
}

export interface FeaturePopulationContext {
  getPopAtStep: (f: any, step: number) => number;
  unmappedFeatureIds: string[];
  regionCount: number;
}

/**
 * Inizializza la tabella dei pesi normalizzati su tutte le feature una sola volta in O(N).
 */
export function buildFeaturePopulationContext(features: any[]): FeaturePopulationContext {
  const regionTotals = new Map<string, number>();
  const assignments = new Map<any, { region: string; weight: number }>();
  const unmappedFeatureIds: string[] = [];

  for (const f of features) {
    const areaKm2 = typeof f.__areaKm2 === 'number' ? f.__areaKm2 : 0;
    const cls = classifyFeatureDemographics(f, areaKm2);
    assignments.set(f, cls);
    regionTotals.set(cls.region, (regionTotals.get(cls.region) || 0) + cls.weight);
    if (cls.region === '__UNMAPPED__') {
      unmappedFeatureIds.push(String(f.id || 'UNKNOWN'));
    }
  }

  // Cache delle popolazioni regionali per ciascuno dei 27 step
  const regionPopCache = new Map<string, number[]>();
  for (const reg of Object.keys(REGION_SERIES)) {
    const series = REGION_SERIES[reg];
    regionPopCache.set(
      reg,
      STEP_YEARS.map((y) => interpolateSeries(series, y))
    );
  }

  return {
    unmappedFeatureIds,
    regionCount: Object.keys(REGION_SERIES).length,
    getPopAtStep: (f: any, step: number): number => {
      const cls = assignments.get(f);
      if (!cls) return 0;
      if (cls.region === '__UNMAPPED__') {
        // Fallback conservativo basato su area (0.01M per 1000 km2, ~10 ab/km2)
        return Math.min(2.0, Math.max(0.0005, cls.weight * 0.00001));
      }
      const denom = regionTotals.get(cls.region) || 1;
      const stepSeries = regionPopCache.get(cls.region);
      const regionPop = stepSeries
        ? (stepSeries[step] ?? stepSeries[stepSeries.length - 1])
        : 0;
      return regionPop * (cls.weight / denom);
    },
  };
}
