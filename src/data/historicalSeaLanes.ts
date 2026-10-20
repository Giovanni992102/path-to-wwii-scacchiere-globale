/**
 * ROTTE MARITTIME STRATEGICHE E CONVOGLI IMPERIALI (1936-1940)
 * Linee di navigazione oceaniche, rotte petrolifere e lifeline degli imperi globali.
 */

export interface SeaLane {
  id: string;
  name: string;
  historicalName: string;
  type: 'atlantic_convoy' | 'mediterranean_lifeline' | 'cape_route' | 'pacific_trade' | 'oil_lifeline';
  color: string;
  coordinates: [number, number][] | [number, number][][]; // Line coordinates [lon, lat] or MultiLine segments
  description: string;
}

export const HISTORICAL_SEA_LANES: SeaLane[] = [
  {
    id: 'north_atlantic_convoy',
    name: 'Rotta del Nord Atlantico (North Atlantic Convoy)',
    historicalName: 'Rotta HX / SC / OB (Halifax & New York -> Liverpool & Clyde)',
    type: 'atlantic_convoy',
    color: '#5f87c0',
    coordinates: [
      [-73.95, 40.70], // New York
      [-63.57, 44.65], // Halifax
      [-52.70, 47.56], // St. John's (Terranova)
      [-40.00, 52.00], // Mid-Atlantic Gap ("Black Pit")
      [-25.00, 55.00], // Approaches
      [-15.00, 56.00], // North Channel
      [-4.50, 55.95],  // Firth of Clyde / Glasgow
      [-3.00, 53.40],  // Liverpool
    ],
    description: 'La fondamentale linea di rifornimento vitale per la sopravvivenza della Gran Bretagna (armi, petrolio, cibo).',
  },
  {
    id: 'mediterranean_suez_lifeline',
    name: 'Corridoio Mediterraneo-Suez (Imperial Lifeline)',
    historicalName: 'Rotta Imperiale Gibilterra - Malta - Alessandria - Canale di Suez',
    type: 'mediterranean_lifeline',
    color: '#e8c979',
    coordinates: [
      [-5.35, 36.14],  // Gibilterra
      [0.00, 36.50],   // Mar di Alborán
      [8.50, 37.80],   // Canale di Sardegna
      [14.52, 35.89],  // Malta
      [22.00, 34.00],  // Mar Ionio meridionale
      [29.89, 31.19],  // Alessandria
      [32.30, 31.25],  // Porto Said / Canale di Suez
      [32.55, 29.95],  // Suez
      [35.00, 27.50],  // Mar Rosso
      [43.40, 12.60],  // Stretto di Bab el-Mandeb
      [45.00, 12.80],  // Aden (Oceano Indiano)
    ],
    description: 'Il corridoio imperiale britannico più rapido per collegare la madrepatria con l\'India Britannica e Singapore.',
  },
  {
    id: 'cape_route',
    name: 'Rotta del Capo di Buona Speranza (Cape Route)',
    historicalName: 'Circumnavigazione dell\'Africa (Londra -> Freetown -> Cape Town -> Bombay)',
    type: 'cape_route',
    color: '#ad7e64',
    coordinates: [
      [-4.50, 50.35],  // Plymouth
      [-10.00, 40.00], // Atlantico orientale
      [-17.00, 25.00], // Canarie
      [-13.25, 8.48],  // Freetown (Sierra Leone)
      [-5.00, 0.00],   // Golfo di Guinea
      [5.00, -15.00],  // Atlantico meridionale
      [18.42, -33.92], // Città del Capo (Cape Town)
      [32.00, -30.00], // Durban
      [45.00, -15.00], // Canale del Mozambico
      [55.00, 0.00],   // Oceano Indiano equatoriale
      [72.85, 18.95],  // Bombay (India)
    ],
    description: 'Rotta strategica di riserva usata dai convogli alleati per evitare i pericoli aero-navali del Mediterraneo.',
  },
  {
    id: 'pacific_singapore_tokyo',
    name: 'Rotte Petrolifere del Sud-Est Asiatico (Nanshin Route)',
    historicalName: 'Rotta delle Risorse (Indie Orientali Olandesi -> Taiwan -> Giappone)',
    type: 'oil_lifeline',
    color: '#b33d4a',
    coordinates: [
      [106.85, -6.20], // Batavia (Giava)
      [104.00, 1.30],  // Stretto di Malacca / Singapore
      [109.00, 10.00], // Mar Cinese Meridionale
      [114.15, 22.28], // Hong Kong
      [120.50, 23.50], // Stretto di Formosa (Taiwan)
      [127.70, 26.20], // Okinawa
      [132.55, 34.23], // Kure / Mare Interno di Seto
      [139.70, 35.65], // Tokyo
    ],
    description: 'L\'arteria vitale per l\'Impero Giapponese: trasporto di gomma, petrolio, bauxite e riso verso le industrie della madrepatria.',
  },
  {
    id: 'transpacific_us_hawaii',
    name: 'Rotta Transpacifica USA - Hawaii - Filippine',
    historicalName: 'San Francisco -> Pearl Harbor -> Guam -> Manila',
    type: 'pacific_trade',
    color: '#3d6c96',
    coordinates: [
      // Segmento Pacifico Occidentale: Manila -> Guam -> Antimeridiano (180° E)
      [
        [120.98, 14.60], // Manila (Filippine)
        [144.75, 13.44], // Isola di Guam
        [180.00, 17.00], // Antimeridiano (180° E)
      ],
      // Segmento Pacifico Orientale: Antimeridiano (-180° W) -> Midway -> Pearl Harbor -> San Francisco
      [
        [-180.00, 17.00], // Antimeridiano (-180° W)
        [-170.00, 18.00], // Rotta atollo di Midway
        [-157.85, 21.30], // Honolulu / Pearl Harbor
        [-122.42, 37.77], // San Francisco (California)
      ],
    ],
    description: 'La fondamentale linea di comunicazione aeronavale e mercantile che unisce la costa pacifica statunitense a Pearl Harbor e alle Filippine attraverso l\'Oceano Pacifico.',
  },
];
