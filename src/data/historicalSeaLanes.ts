/**
 * ROTTE MARITTIME STRATEGICHE E CONVOGLI IMPERIALI (1936-1941)
 * Linee di navigazione oceaniche, rotte petrolifere e lifeline degli imperi globali.
 */

export interface DynamicSeaLaneStatus {
  name?: string;
  historicalName?: string;
  description: string;
  statusNote?: string;
  isContested?: boolean;
  color?: string;
}

export interface SeaLane {
  id: string;
  name: string;
  historicalName: string;
  type: 'atlantic_convoy' | 'mediterranean_lifeline' | 'cape_route' | 'pacific_trade' | 'oil_lifeline';
  color: string;
  coordinates: [number, number][] | [number, number][][]; // Line coordinates [lon, lat] or MultiLine segments
  description: string;
  activeSteps?: number[];
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  },

  // Nuove rotte strategiche per il conflitto bellico (1940-1941)
  {
    id: 'arctic_convoys',
    name: 'Rotta dei Convogli Artici (Arctic Convoys — PQ / QP)',
    historicalName: 'Loch Ewe / Islanda -> Mar di Barents -> Murmansk & Arcangelo',
    type: 'atlantic_convoy',
    color: '#7fc8f8',
    coordinates: [
      [-5.60, 57.85],  // Loch Ewe (Scozia)
      [-21.94, 64.15], // Hvalfjörður / Reykjavík (Islanda)
      [-10.00, 71.00], // Mar di Norvegia settentrionale
      [5.00, 73.50],   // Jan Mayen / Mar Glaciale Artico
      [19.00, 74.50],  // Isola degli Orsi (Bear Island)
      [33.45, 69.20],  // Murmansk / Baia di Kola
      [40.50, 64.55],  // Arcangelo (Golfo di Dvina / Mar Bianco)
    ],
    description: 'La via navale più estrema della guerra: convogli alleati carichi di carri armati, aerei e munizioni affrontano ghiacci polari, tempeste e gli attacchi di U-Boot e bombardieri della Luftwaffe dai fiordi norvegesi per rifornire l\'URSS.',
    activeSteps: [9], // Attivata dall'agosto 1941 (Operazione Dervish)
  },
  {
    id: 'axis_libya_convoy',
    name: 'Rotta dei Convogli dell\'Asse per la Libia',
    historicalName: 'Rotte del Canale di Sicilia: Napoli / Taranto -> Tripoli / Bengasi',
    type: 'mediterranean_lifeline',
    color: '#d97736',
    coordinates: [
      [14.27, 40.85], // Napoli
      [17.23, 40.47], // Taranto
      [15.55, 38.19], // Stretto di Messina
      [16.50, 36.00], // Mar Ionio
      [14.50, 34.00], // Rotta a sud di Malta
      [13.19, 32.88], // Tripoli
      [20.06, 32.11], // Bengasi
    ],
    description: 'Cordone ombelicale logistico essenziale per il sostentamento del Regio Esercito e dell\'Afrikakorps di Rommel in Nordafrica, costantemente bersagliato dalla Force K e dai sommergibili britannici basati a Malta.',
    activeSteps: [6, 7, 8, 9], // Dal giugno 1940
  },
  {
    id: 'persian_corridor_sealane',
    name: 'Rotta del Corridoio Persiano (Persian Corridor Sea Route)',
    historicalName: 'Rotte Marittime Alleate dell\'Oceano Indiano -> Bassora & Bandar Shahpur',
    type: 'oil_lifeline',
    color: '#32a852',
    coordinates: [
      [18.42, -33.92], // Cape Town
      [55.00, 0.00],   // Oceano Indiano equatoriale
      [72.85, 18.95],  // Bombay / Mare Arabico
      [58.50, 23.50],  // Golfo di Oman
      [56.30, 26.50],  // Stretto di Hormuz
      [50.00, 27.50],  // Golfo Persico
      [48.50, 29.98],  // Khorramshahr / Bandar Shahpur (Iran)
      [47.80, 30.50],  // Bassora (Iraq)
    ],
    description: 'Arteria marittima oceanica aperta dagli Alleati dopo l\'invasione congiunta anglo-sovietica dell\'Iran nell\'agosto-settembre 1941. Convogliava autocarri Studebaker, munizioni e materiale bellico del Lend-Lease verso la Russia tramite la Ferrovia Trans-Iraniana.',
    activeSteps: [9],
  },
];

export function getDynamicSeaLaneStatus(lane: SeaLane, step: number): DynamicSeaLaneStatus {
  let name = lane.name;
  let historicalName = lane.historicalName;
  let description = lane.description;
  let statusNote = 'Rotta Marittima Attiva';
  let isContested = false;
  let color = lane.color;

  switch (lane.id) {
    case 'north_atlantic_convoy':
      if (step < 5) {
        statusNote = 'Navigazione Commerciale Regolare';
        description = 'La fondamentale arteria commerciale transatlantica che collega gli Stati Uniti e il Canada ai porti industriali del Regno Unito.';
      } else if (step <= 6) {
        statusNote = 'Attivazione Sistema Convogli (HX/SC)';
        isContested = true;
        description = 'Con l\'inizio della guerra, l\'Ammiragliato britannico introduce convogli scortati obbligatori per proteggere il flusso di grano, materie prime e munizioni dagli U-Boot.';
      } else if (step <= 8) {
        statusNote = 'Prima Epoca Felice degli U-Boot (Happy Time)';
        isContested = true;
        description = 'Operando dalle nuove basi conquistate in Bretagna (Brest, Lorient), gli U-Boot della Kriegsmarine infliggono perdite devastanti alle rotte di convoglio alleate.';
      } else {
        statusNote = 'Battaglia dell\'Atlantico & Lend-Lease (Black Pit)';
        isContested = true;
        description = 'Espansione delle scorte statunitensi e canadesi a tutela dei mercantili; i branchi di lupi di Dönitz colpiscono nel Mid-Atlantic Gap privo di copertura aerea.';
      }
      break;

    case 'mediterranean_suez_lifeline':
      if (step < 6) {
        statusNote = 'Arteria Imperiale Britannica Aperta';
        description = 'Il corridoio marittimo più rapido per collegare la Gran Bretagna con l\'Egitto, l\'India Britannica e Singapore attraverso Gibilterra e Suez.';
      } else {
        statusNote = 'Rotte del Mediterraneo Bloccate / Rerouted al Capo';
        isContested = true;
        color = '#e07a5f';
        description = 'Dopo l\'entrata in guerra dell\'Italia (giugno 1940), il canale di Sicilia diventa intransitabile per i mercantili alleati sotto il tiro delle forze aero-navali dell\'Asse. Il traffico di linea viene deviato attorno all\'Africa (Rotta del Capo); solo convogli da guerra speciali (Operation Halberd, Tiger) tentano la traversata scortati dalla Force H.';
      }
      break;

    case 'cape_route':
      if (step < 6) {
        statusNote = 'Rotta Oceanica Secondaria';
        description = 'Rotta commerciale trans-oceanica di collegamento tra l\'Impero Britannico, l\'Africa australe e l\'Oceano Indiano.';
      } else {
        statusNote = 'La Lifeline Primaria dell\'Impero Britannico';
        description = 'Con il Mediterraneo chiuso ai mercantili, la circumnavigazione dell\'Africa (12.000 miglia) diventa l\'arteria irrinunciabile per rifornire l\'VIII Armata in Egitto e le guarnigioni in India, scortata dalle basi di Freetown e Simon\'s Town.';
      }
      break;

    case 'pacific_singapore_tokyo':
      if (step < 9) {
        statusNote = 'Linee Commerciali e Petrolifere Giapponesi';
        description = 'L\'arteria vitale per l\'approvvigionamento di riso, ferro e petrolio verso le isole metropolitane dell\'Impero Giapponese.';
      } else {
        statusNote = 'Direttrice d\'Invasione a Sud (Nanshin-ron)';
        isContested = true;
        color = '#e63946';
        description = 'In seguito all\'embargo petrolifero totale imposto dagli Alleati nell\'estate 1941, la rotta si trasforma nella direttrice d\'assalto della Marina Imperiale per la conquista lampo della Malesia, di Singapore e dei campi petroliferi delle Indie Olandesi.';
      }
      break;

    case 'transpacific_us_hawaii':
      if (step < 9) {
        statusNote = 'Arteria di Comunicazione USA - Filippine';
        description = 'La fondamentale linea di comunicazione aeronavale e mercantile che unisce la costa pacifica statunitense a Pearl Harbor, Guam e Manila.';
      } else {
        statusNote = 'Tranciata a Ovest di Oahu (Attacco di Pearl Harbor)';
        isContested = true;
        color = '#d9534f';
        description = 'L\'attacco aereo a sorpresa di Pearl Harbor (7 dicembre 1941), la fulminea caduta di Guam (10 dicembre) e Wake (23 dicembre) e gli sbarchi a Luzon recidono la rotta diretta per Manila, isolando le truppe americane e filippine del generale MacArthur.';
      }
      break;

    case 'arctic_convoys':
      statusNote = 'Convogli Artici Lend-Lease (PQ / QP)';
      isContested = true;
      description = 'I convogli della speranza attraverso i mari di Barents e Groenlandia: mercantili scortati affrontano tempeste polari e incursioni della Luftwaffe e degli U-Boot dalla Norvegia per recapitare carri Matilda, caccia Hurricane e materiali bellici a Murmansk e Arcangelo.';
      break;

    case 'axis_libya_convoy':
      statusNote = 'Convogli dell\'Asse per la Libia';
      isContested = true;
      description = 'Cordone ombelicale dell\'Afrikakorps e del Regio Esercito in Cirenaica e Tripolitania. Le rotte da Napoli e Taranto verso Tripoli e Bengasi sono costantemente minacciate dagli aerosiluranti e dai sommergibili della Royal Navy stanziati a Malta.';
      break;

    case 'persian_corridor_sealane':
      statusNote = 'Rotte del Golfo Persico (Lend-Lease)';
      description = 'Arteria logistica creata dopo l\'invasione anglo-sovietica dell\'Iran nell\'autunno 1941; imponenti convogli scaricano a Bassora e Bandar Shahpur armamenti pesanti e autocarri americani destinati all\'Armata Rossa attraverso la Ferrovia Trans-Iraniana.';
      break;
  }

  return {
    name,
    historicalName,
    description,
    statusNote,
    isContested,
    color,
  };
}
