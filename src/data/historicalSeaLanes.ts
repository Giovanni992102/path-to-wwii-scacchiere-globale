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
    description: 'La fondamentale linea di rifornimento vitale per la sopravvivenza della Gran Bretagna (armi, petrolio, cibo) e successiva arteria postbellica.',
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
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
    description: 'Il corridoio imperiale britannico più rapido per collegare la madrepatria con l\'India Britannica, il Medio Oriente e l\'Estremo Oriente.',
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
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
    description: 'Rotta strategica oceanica dell\'Atlantico meridionale e dell\'Oceano Indiano lungo il Capo di Buona Speranza.',
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
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
    description: 'La fondamentale linea di comunicazione aeronavale e mercantile che unisce la costa pacifica statunitense a Pearl Harbor, Guam e alle Filippine attraverso l\'Oceano Pacifico.',
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
  },

  // Nuove rotte strategiche per il conflitto bellico (1940-1945)
  {
    id: 'arctic_convoys',
    name: 'Rotta dei Convogli Artici (Arctic Convoys — PQ / QP & JW / RA)',
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
    activeSteps: [9, 10, 11, 12, 13, 14, 15, 16, 17],
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
    activeSteps: [6, 7, 8, 9, 10, 11, 12],
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
    activeSteps: [9, 10, 11, 12, 13, 14, 15, 16, 17],
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
      if (step >= 34) {
        statusNote = 'Corridoio Atlantico NATO (15 Membri · Vertice di Parigi Dic 1957) — Trattati di Roma (25 Mar) & Saarland in RFT (1° Gen)';
        isContested = false;
        color = '#5f87c0';
        description = 'Al 31 dicembre 1957 l\'asse euro-atlantico riflette la distensione inter-alleata dopo la Crisi di Suez (Harold Macmillan Premier UK), la reintegrazione del Saarland nella RFT (1° gennaio), la firma dei Trattati di Roma CEE/Euratom (25 marzo) e la nuova Red Ensign canadese con foglie d\'acero rosse (8 ottobre 1957).';
      } else if (step >= 33) {
        statusNote = 'Corridoio Atlantico NATO (15 Membri · Frattura su Suez) — Vigilia Trattati di Roma (CECA attiva · NO CEE)';
        isContested = false;
        color = '#5f87c0';
        description = 'Al 31 dicembre 1956 l\'arteria atlantica attraversa la grave crisi diplomatica tra Washington e Londra/Parigi dopo l\'intervento anglo-francese a Suez e l\'evacuazione del 22 dicembre, mentre in Europa i Sei della CECA elaborano i progetti del Rapporto Spaak (i Trattati di Roma CEE/Euratom verranno firmati solo il 25 marzo 1957).';
      } else if (step >= 32) {
        statusNote = 'Corridoio Atlantico NATO (15 Membri: RFT Ammessa il 9 Maggio 1955) — UEO Operativa & Post-Staatsvertrag Austriaco';
        isContested = false;
        color = '#5f87c0';
        description = 'Al 31 dicembre 1955 l\'arteria euro-atlantica collega una NATO allargata a 15 membri: entrati in vigore gli Accordi di Parigi (5 mag 1955), la Repubblica Federale Tedesca riacquista la sovranità ed entra nella NATO (9 mag) e nella nuova UEO a Sette con l\'Italia, fronteggiando la nascita del Patto di Varsavia (14 mag) e il ritorno della piena sovranità/neutralità austriaca (27 lug / 26 ott 1955).';
      } else if (step >= 31) {
        statusNote = 'Corridoio Atlantico NATO (14 Membri · Accordi Parigi 23 Ott 1954 Non Ratificati) — Post-CED & Ritorno di Trieste';
        isContested = false;
        color = '#5f87c0';
        description = 'Al 31 dicembre 1954 l\'arteria euro-atlantica collega la NATO a 14 membri dopo il rigetto francese della CED (30 ago) e la firma degli Accordi di Parigi del 23 ottobre 1954 (ratifica e ingresso RFT previsti solo per maggio 1955; nessun Patto di Varsavia prima di maggio 1955). Sul fianco europeo prosegue la CECA dei Sei e Trieste torna all\'Italia dal 26 ottobre.';
      } else if (step >= 30) {
        statusNote = 'Corridoio Atlantico NATO (14 Membri · RFT Esclusa) — Mercato Comune CECA & Incoronazione Elisabetta II (Dic 1953)';
        isContested = false;
        color = '#5f87c0';
        description = 'Al 31 dicembre 1953 la dorsale euro-atlantica collega la Presidenza Eisenhower a Washington, l\'incoronazione di Elisabetta II a Londra (2 giu) e il mercato comune CECA tra i Sei (carbone/ferro feb, acciaio mag). La NATO resta a 14 membri (senza la RFT fino al 1955) mentre i Patti di Madrid (26 set) aprono basi bilaterali USA in Spagna.';
      } else if (step >= 29) {
        statusNote = 'Corridoio Atlantico NATO (14 Membri: Grecia & Turchia) — CECA in Vigore & Regina Elisabetta II (Dic 1952)';
        isContested = false;
        color = '#5f87c0';
        description = 'Al 31 dicembre 1952 la dorsale euro-atlantica riflette il regno della Regina Elisabetta II nel Regno Unito e nel Commonwealth (dal 6 feb 1952), il primo allargamento della NATO a Grecia e Turchia (18 feb 1952) e l\'entrata in vigore della CECA (23 lug 1952 · Alta Autorità a Lussemburgo dal 10 ago), oltre al nuovo Stato Libero Associato di Porto Rico (25 lug 1952) nei Caraibi.';
      } else if (step >= 28) {
        statusNote = 'Corridoio Atlantico NATO — SHAPE Operativo, Mutual Security Act & Ratifiche CECA (Dic 1951)';
        isContested = false;
        color = '#5f87c0';
        description = 'Al 31 dicembre 1951 l\'asse Atlantico sostiene il dispositivo integrato NATO SHAPE, il Mutual Security Act statunitense (ottobre 1951) e il ritorno di Winston Churchill a Londra (26 ottobre), mentre procedono le ratifiche parlamentari della CECA (in vigore dal luglio 1952).';
      } else if (step >= 27) {
        statusNote = 'Corridoio Atlantico NATO — SHAPE Operativo (2 Apr 1951) & Trattato CECA (18 Apr 1951)';
        isContested = false;
        color = '#5f87c0';
        description = 'Al 30 giugno 1951 l\'asse Atlantico alimenta il comando integrato NATO SHAPE (operativo dal 2 aprile sotto il Gen. Eisenhower) e accompagna la firma del Trattato di Parigi istitutivo della CECA tra i Sei (18 aprile 1951).';
      } else if (step >= 26) {
        statusNote = 'Corridoio Atlantico NATO — Comando Supremo Alleato in Europa (Eisenhower SACEUR, Dic 1950)';
        isContested = false;
        color = '#5f87c0';
        description = 'Al 31 dicembre 1950 l\'asse Atlantico alimenta il rafforzamento militare NATO (nomina del Gen. Eisenhower a primo SACEUR il 19 dicembre 1950) e i convogli logistici atlantici verso il teatro coreano.';
      } else if (step >= 25) {
        statusNote = 'Corridoio Atlantico NATO, Piano Schuman & Mobilitazione ONU Corea (Giugno 1950)';
        isContested = false;
        color = '#5f87c0';
        description = 'Al 30 giugno 1950 le rotte del Nord Atlantico sostengono la ricostruzione ERP/NATO e i piani CECA della Dichiarazione Schuman (9 maggio) mentre lo scoppio della Guerra di Corea (25 giugno) avvia lo sforzo logistico euro-atlantico ONU.';
      } else if (step >= 24) {
        statusNote = 'Corridoio Atlantico NATO & Riarmo MDAP (Dicembre 1949)';
        isContested = false;
        color = '#5f87c0';
        description = 'Al 31 dicembre 1949 le linee transatlantiche da New York, Halifax e St. John\'s alimentano il Piano Marshall e i primi trasferimenti militari del programma statunitense MDAP (Mutual Defense Assistance Act, 6 ottobre 1949) verso gli alleati NATO dell\'Europa occidentale e la nuova Repubblica Federale Tedesca.';
      } else if (step >= 23) {
        statusNote = 'Corridoio Atlantico NATO (Patto Atlantico — 4 Aprile 1949) & Rotta St. John\'s–Canadese';
        isContested = false;
        color = '#5f87c0';
        description = 'Dopo la firma del Trattato del Nord Atlantico (NATO, 4 aprile 1949) e l\'ingresso di Terranova e Labrador nella Confederazione canadese (31 marzo 1949), le linee marittime e aeronavali del Nord Atlantico da New York, Halifax e St. John\'s costituiscono l\'arteria strategica dell\'Alleanza Atlantica e del Piano Marshall verso Regno Unito, Francia, Benelux e la nuova RFT.';
      } else if (step >= 18) {
        statusNote = step >= 19 ? 'Rotte Civili & Aiuti Europei (Pre-Piano Marshall 1947)' : 'Smobilitazione Alleata & Convogli UNRRA (1945)';
        isContested = false;
        color = '#5f87c0';
        description = step >= 19
          ? 'Al 30 settembre 1947 l\'Atlantico Settentrionale costituisce il principale corridoio mercantile e logistico tra il Nord America e l\'Europa occidentale alla vigilia del Piano Marshall (ERP).'
          : 'Dopo la fine del conflitto in Europa, le rotte transatlantiche convogliano i rientri delle truppe statunitensi/canadesi (Operation Magic Carpet) e i rifornimenti UNRRA per la ricostruzione.';
      } else if (step >= 14) {
        statusNote = 'Dominio Aeronavale Alleato — Alimentazione Fronte Occidentale (Overlord)';
        isContested = false;
        color = '#5f87c0';
        description = 'Con gli U-Boot neutralizzati dall\'aviazione e dai gruppi hunter-killer alleati, giganteschi convogli statunitensi riforniscono in sicurezza le armate alleate in Francia, Belgio e Germania fino alla resa del maggio 1945.';
      } else if (step < 5) {
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
      } else if (step === 9) {
        statusNote = 'Battaglia dell\'Atlantico & Lend-Lease (Black Pit)';
        isContested = true;
        description = 'Espansione delle scorte statunitensi e canadesi a tutela dei mercantili; i branchi di lupi di Dönitz colpiscono nel Mid-Atlantic Gap privo di copertura aerea.';
      } else if (step === 10 || step === 11) {
        statusNote = 'Seconda Epoca Felice (Operazione Paukenschlag / Drumbeat)';
        isContested = true;
        description = 'Nel gennaio-agosto 1942 gli U-Boot di Dönitz (Operazione Paukenschlag) colpiscono lungo la costa orientale degli Stati Uniti, nel Golfo del Messico e nei Caraibi, oltre che nel Mid-Atlantic Gap, provocando l\'entrata in guerra di Messico (maggio 1942) e Brasile (agosto 1942).';
      } else {
        statusNote = 'Punto di Svolta dell\'Atlantico (Maggio Nero 1943 & Radar Centimetrico)';
        isContested = false;
        color = '#5f87c0';
        description = 'Nel maggio 1943 ("Maggio Nero"), la tecnologia alleata (radar a microonde H2S a 10 cm, decrittazione Enigma con Ultra, portaerei di scorta escort carrier e pattugliatori a lunghissimo raggio B-24 Liberator) infligge perdite insostenibili agli U-Boot (43 battelli affondati in un solo mese): l\'ammiraglio Dönitz è costretto a ritirare i branchi di lupi dalle rotte centrali del Nord Atlantico. I convogli alleati viaggiano in sicurezza garantita verso la Gran Bretagna.';
      }
      break;

    case 'mediterranean_suez_lifeline':
      if (step >= 34) {
        statusNote = 'CANALE DI SUEZ RIAPERTO (Apr 1957) — Ritiro Israeliano da Gaza/Sinai (Mar 1957), UNEF a Sharm el-Sheikh & Linea Morice';
        isContested = true;
        color = '#e8c979';
        description = 'Al 31 dicembre 1957 il Canale di Suez è nuovamente aperto al traffico mercantile mondiale dall\'aprile 1957 sotto controllo dell\'Autorità egiziana dopo lo sgombero dei relitti e il completo ritiro israeliano dal Sinai e da Gaza (6–8 marzo 1957), con i Caschi Blu UNEF dispiegati sullo Stretto di Tiran. Nel Maghreb Tangeri è integrata nel Marocco (1° gen), la Tunisia diviene Repubblica (25 lug), in Algeria opera la Linea Morice e all\'estremo Atlantico infuria la Guerra d\'Ifni (nov–dic).';
      } else if (step >= 33) {
        statusNote = 'CANALE DI SUEZ BLOCCATO (Crisi di Suez Ott–Dic 1956) — Evacuazione UK/FRA 22 Dic, UNEF & Occupazione Israeliana di Sinai/Gaza';
        isContested = true;
        color = '#dc2626';
        description = 'Al 31 dicembre 1956 il Canale di Suez (nazionalizzato da Nasser il 26 luglio) è ancora ostruito dalle navi affondate durante la guerra di ottobre–novembre: Regno Unito e Francia hanno completato l\'evacuazione della Zona del Canale il 22 dicembre sotto presidio UNEF dell\'ONU, ma Israele occupa ancora la Striscia di Gaza e oltre l\'80% del Sinai (fino a Sharm el-Sheikh). Tutto il traffico petrolifero verso l\'Europa è deviato attorno al Capo di Buona Speranza, mentre sul fianco maghrebino Marocco e Tunisia sono indipendenti e infuria la Battaglia di Algeri.';
      } else if (step >= 32) {
        statusNote = 'Corridoio Mediterraneo–Suez — Emergenza EOKA a Cipro (1° Apr), Nord Costantinese (20 Ago) & Patto di Baghdad';
        isContested = true;
        color = '#e07a5f';
        description = 'Al 31 dicembre 1955 il corridoio attraversa l\'Egeo e il Levante toccando Cipro scossa dall\'insurrezione EOKA (1° apr; emergenza 26 nov 1955), costeggia il Nord Costantinese in piena Guerra d\'Algeria (20 ago) e il Canale di Suez (ancora gestito dalla Compagnie Universelle mentre procede lo sgombero militare UK 1954–56), con il Sudan ormai alla vigilia dell\'indipendenza (1° gen 1956) mentre infuria l\'ammutinamento di Torit e mentre la rotta prosegue verso l\'Asia sud-orientale dopo la fine dell\'enclave francese di Hải Phòng (16 mag).';
      } else if (step >= 31) {
        statusNote = 'Corridoio Mediterraneo–Suez — Accordo di Suez (19 Ott), Ritorno Trieste, Guerra d\'Algeria (1° Nov) & Ritiro da Hải Phòng';
        isContested = true;
        color = '#e07a5f';
        description = 'Al 31 dicembre 1954 la linea attraversa l\'Adriatico dopo la chiusura del TLT (Trieste all\'Italia dal 26 ott), costeggia l\'Algeria scossa dal Toussaint Rouge (1° nov 1954) e il Canale di Suez dopo l\'accordo anglo-egiziano di sgombero in 20 mesi (19 ott, Nasser al Cairo), oltrepassa Pondichéry trasferita all\'India (1° nov) e alimenta lo Stato del Vietnam a sud del 17° parallelo nonché il ponte marittimo dei 300 giorni da Hải Phòng (Passage to Freedom).';
      } else if (step >= 30) {
        statusNote = 'Corridoio Mediterraneo–Suez — Repubblica d\'Egitto (18 Giu 1953), Iran Post-Ajax (Zahedi) & Crisi Trieste TLT (Dic 1953)';
        isContested = true;
        color = '#e07a5f';
        description = 'Al 31 dicembre 1953 la rotta attraversa la crisi adriatica del Territorio Libero di Trieste (ancora AMG/VUJA dopo gli scontri di novembre), costeggia la Libia entrata nella Lega Araba (28 mar) e la neo-proclamata Repubblica d\'Egitto (18 giu, Naguib/Nasser), collega il Golfo Persico dopo il colpo di Stato pro-Scià in Iran (Operazione Ajax, 19 ago) e sostiene nell\'Oceano Indiano la Federazione coloniale di Rhodesia-Nyasaland (FRN), il Kenya e l\'Unione Francese verso Laos, Cambogia e Điện Biên Phủ.';
      } else if (step >= 29) {
        statusNote = 'Corridoio Mediterraneo–Suez — Egitto Rivoluzionario (Fuad II), Rottura Iran–UK, Federazione Eritrea & Mau Mau Kenya (Dic 1952)';
        isContested = true;
        color = '#e07a5f';
        description = 'Al 31 dicembre 1952 il corridoio collega l\'area NATO mediterranea (estesa a Grecia e Turchia dal 18 feb) con tre fronti caldi: l\'Egitto governato de facto dagli Ufficiali Liberi sotto Re Fuad II (ancora Regno d\'Egitto con bandiera del 1923 fino al giu 1953), il Golfo Persico dopo la rottura diplomatica iraniana con Londra (22 ott 1952), la neonata Federazione di Etiopia ed Eritrea sul Mar Rosso (15 set 1952) e l\'Oceano Indiano verso il Kenya in Stato d\'Emergenza Mau Mau (20 ott 1952) e il Vietnam di Nà Sản e Điện Biên Phủ.';
      } else if (step >= 28) {
        statusNote = 'Corridoio Mediterraneo–Suez — Guerriglia nel Canale di Suez (Ott 1951), Blocco di Abadan & Indipendenza del Regno Unito di Libia (24 Dic 1951)';
        isContested = true;
        color = '#e07a5f';
        description = 'Al 31 dicembre 1951 il corridoio attraversa tre snodi cruciali: nel Mediterraneo centrale nasce il 24 dicembre 1951 lo Stato sovrano del Regno Unito di Libia (Tripoli e Bengasi); nella Zona del Canale di Suez (Ismailia, Suez, Port Said) infuria la guerriglia armata egiziana dopo l\'abrogazione unilaterale del Trattato del 1936 (ottobre 1951); nel Golfo Persico la Royal Navy mantiene l\'embargo sul petrolio iraniano dopo l\'espulsione dei tecnici AIOC da Abadan.';
      } else if (step >= 27) {
        statusNote = 'Corridoio Mediterraneo–Suez — Crisi Petrolifera di Abadan (Mag–Giu 1951) & Libia Provvisoria';
        isContested = true;
        color = '#e07a5f';
        description = 'Al 30 giugno 1951 la nazionalizzazione iraniana dell\'AIOC ad Abadan nel Khuzestan (governo Mossadegh) blocca le esportazioni petrolifere britanniche verso Suez; in Libia permane la BMA britannica/Fezzan francese accanto al Governo Federale Provvisorio (29 marzo), mentre prosegue la Linea de Lattre in Indocina.';
      } else if (step >= 26) {
        statusNote = 'Corridoio Mediterraneo–Suez — Ris. ONU Eritrea, AFIS Somalia, Repubblica d\'Indonesia & Convogli Suez (Dic 1950)';
        isContested = false;
        color = '#5aa0c2';
        description = 'Al 31 dicembre 1950 la linea Gibilterra–Malta–Suez collega i traffici europei alla Somalia fiduciaria (AFIS), all\'Eritrea BMA (Risoluzione ONU 390 A(V) del 2 dicembre 1950), alla Repubblica d\'India, allo Stato unitario d\'Indonesia e al Tonchino di de Lattre.';
      } else if (step >= 25) {
        statusNote = 'Corridoio Mediterraneo–Suez — Repubblica dell\'India, AFIS Somalia & Convogli Suez (Giu 1950)';
        isContested = false;
        color = '#5aa0c2';
        description = 'Al 30 giugno 1950 l\'arteria Gibilterra–Malta–Suez collega i traffici verso la sovrana Repubblica dell\'India (26 gen 1950), il nuovo mandato AFIS italiano in Somalia (1° apr 1950), la Federazione della Malesia (nuova bandiera 26 mag) e i convogli francesi verso Saigon.';
      } else if (step >= 24) {
        statusNote = 'Corridoio Mediterraneo–Suez (Fine Guerre Civile Greca & Armistizi Arabo-Israeliani Completati, Dic 1949)';
        isContested = false;
        color = '#5aa0c2';
        description = 'Al 31 dicembre 1949, chiusi tutti gli armistizi arabo-israeliani (con l\'accordo Siria-Israele del 20 luglio) e terminata la Guerra Civile Greca (16 ottobre 1949), l\'arteria Gibilterra–Malta–Suez sostiene i traffici petroliferi verso gli Stati Uniti d\'Indonesia (RIS), l\'India (Dominion) e i convogli francesi verso Saigon.';
      } else if (step >= 23) {
        statusNote = 'Corridoio Mediterraneo–Suez (Linea Verde Armistiziale 1949 & Canal Zone)';
        isContested = false;
        color = '#5aa0c2';
        description = 'Al 30 giugno 1949, dopo gli Armistizi di Rodi tra Israele ed Egitto/Libano/Giordania e l\'apertura dello sbocco israeliano sul Mar Rosso a Eilat (Operazione Uvda), la rotta Suez–Mediterraneo garantisce i traffici petroliferi del Golfo, i rifornimenti francesi verso Saigon e i collegamenti dell\'Unione con l\'Asia meridionale.';
      } else if (step >= 18) {
        statusNote = step >= 19 ? 'Corridoio Marittimo Postbellico Suez–Mediterraneo' : 'Rotta Postbellica Rimpatrio & Presidio Suez (1945)';
        isContested = false;
        color = '#5aa0c2';
        description = step >= 19
          ? 'Arteria marittima internazionale lungo il Canale di Suez presidiato nella Canal Zone britannica, fondamentale per i traffici petroliferi del Golfo e la smobilitazione imperiale dall\'India.'
          : 'Corridoio marittimo riaperto al traffico mercantile postbellico e ai trasferimenti navali verso l\'India, la Malesia e l\'Estremo Oriente.';
      } else if (step < 6) {
        statusNote = 'Arteria Imperiale Britannica Aperta';
        description = 'Il corridoio marittimo più rapido per collegare la Gran Bretagna con l\'Egitto, l\'India Britannica e Singapore attraverso Gibilterra e Suez.';
      } else if (step < 10) {
        statusNote = 'Rotte del Mediterraneo Bloccate / Rerouted al Capo';
        isContested = true;
        color = '#e07a5f';
        description = 'Dopo l\'entrata in guerra dell\'Italia (giugno 1940), il canale di Sicilia diventa intransitabile per i mercantili alleati sotto il tiro delle forze aero-navali dell\'Asse. Il traffico di linea viene deviato attorno all\'Africa (Rotta del Capo); solo convogli da guerra speciali (Operation Halberd, Tiger) tentano la traversata scortati dalla Force H.';
      } else if (step === 10) {
        statusNote = 'Assedio di Malta & Operazione Pedestal (Battaglia di Mezzo Agosto)';
        isContested = true;
        color = '#e07a5f';
        description = 'Con il transito ordinario deviato sulla Rotta del Capo e la Panzerarmee Afrika ferma a El Alamein, nell\'agosto 1942 i convogli britannici affrontano la furiosa Battaglia di Mezzo Agosto (Operazione Pedestal, 10-15 agosto 1942): a caro prezzo (perdita della portaerei HMS Eagle), la petroliera SS Ohio raggiunge La Valletta garantendo la sopravvivenza di Malta.';
      } else if (step === 11) {
        statusNote = 'Operazione Torch & Sblocco Definitivo di Malta (Convoglio Stoneage)';
        isContested = true;
        color = '#5aa0c2';
        description = 'Gli sbarchi alleati in Algeria e Marocco (Operazione Torch, 8 novembre 1942) e la riconquista della Cirenaica consentono l\'arrivo a Malta del convoglio MW 13 (Operazione Stoneage, 20 novembre 1942) senza alcuna perdita: l\'assedio di Malta è infranto definitivamente e le forze aeronavali alleate dominano il Mediterraneo centrale.';
      } else {
        statusNote = 'Riapertura del Canale di Sicilia & Controllo Totale Alleato';
        isContested = false;
        color = '#5aa0c2';
        description = 'Con la capitolazione totale delle forze dell\'Asse in Tunisia (13 maggio 1943) e l\'invasione anfibia alleata della Sicilia (Operazione Husky, 10 luglio 1943), il Canale di Sicilia e l\'intero bacino del Mediterraneo sono definitivamente riaperti alla libera navigazione delle flotte alleate, ripristinando la rotta marittima più rapida verso il Canale di Suez e l\'India.';
      }
      break;

    case 'cape_route':
      if (step >= 34) {
        statusNote = 'Rotta del Capo Rientrata alla Normalità Post-Suez (Apr 1957) — Indipendenza del Ghana (6 Mar 1957)';
        isContested = false;
        color = '#ad7e64';
        description = 'Dall\'aprile 1957, con la riapertura del Canale di Suez al traffico mondiale, le superpetroliere europee riprendono la via mediterranea riducendo il sovraccarico emergenziale intorno al Capo di Buona Speranza; lungo la costa occidentale africana il nuovo Stato indipendente del Ghana (6 marzo 1957) presidia il Golfo di Guinea.';
      } else if (step >= 33) {
        statusNote = 'ARTERIA PETROLIFERA D\'EMERGENZA — Chiusura Canale di Suez (Nov–Dic 1956)';
        isContested = true;
        color = '#e07a5f';
        description = 'Nel novembre–dicembre 1956, a seguito dell\'ostruzione del Canale di Suez durante la Crisi di Suez, l\'intera flotta di superpetroliere e mercantili tra Golfo Persico, Asia ed Europa occidentale viene nuovamente dirottata attorno al Capo di Buona Speranza (Sudafrica).';
      } else if (step >= 18) {
        statusNote = 'Rotta Commerciale Sudafrica–Oceano Indiano';
        description = 'Linea oceanica pacifica del dopoguerra tra l\'Europa, il Sudafrica e i nuovi Dominion dell\'Asia meridionale (India e Pakistan al 1947).';
      } else if (step >= 14) {
        statusNote = 'Rotta Logistica di Riserva e Teatro Indiano-SEAC';
        description = 'Dopo la riapertura del Mediterraneo, la rotta del Capo sostiene i rifornimenti strategici per il Comando Alleato del Sud-Est Asiatico (SEAC) a Ceylon, in India e in Birmania.';
      } else if (step < 6) {
        statusNote = 'Rotta Oceanica Secondaria';
        description = 'Rotta commerciale trans-oceanica di collegamento tra l\'Impero Britannico, l\'Africa australe e l\'Oceano Indiano.';
      } else {
        statusNote = 'La Lifeline Primaria dell\'Impero Britannico';
        description = 'Con il Mediterraneo chiuso ai mercantili, la circumnavigazione dell\'Africa (12.000 miglia) diventa l\'arteria irrinunciabile per rifornire l\'VIII Armata in Egitto e le guarnigioni in India, scortata dalle basi di Freetown e Simon\'s Town.';
      }
      break;

    case 'pacific_singapore_tokyo':
      if (step >= 17) {
        statusNote = 'Arteria Recisa — Blocco Totale Alleato (Operazione Starvation)';
        isContested = true;
        color = '#7a7a7a';
        description = 'Primavera 1945: la marina mercantile giapponese è annientata dai sommergibili USA, dagli attacchi della Task Force 38 nel Mar Cinese Meridionale e dalle mine dei B-29; il collegamento con Singapore e Palembang è definitivamente spezzato.';
      } else if (step >= 14) {
        statusNote = 'Rotta Giapponese Stritolata dai Sommergibili & Aviazione USA';
        isContested = true;
        color = '#e07a5f';
        description = 'Dalla metà del 1944 i sommergibili statunitensi della Pacific Fleet (wolfpacks nel Canale di Luzon) e le incursioni aeree alleate affondano la maggior parte delle petroliere giapponesi dirette da Sumatra e Borneo verso il Giappone.';
      } else if (step < 9) {
        statusNote = 'Linee Commerciali e Petrolifere Giapponesi';
        description = 'L\'arteria vitale per l\'approvvigionamento di riso, ferro e petrolio verso le isole metropolitane dell\'Impero Giapponese.';
      } else if (step === 9) {
        statusNote = 'Direttrice d\'Invasione a Sud (Nanshin-ron)';
        isContested = true;
        color = '#e63946';
        description = 'In seguito all\'embargo petrolifero totale imposto dagli Alleati nell\'estate 1941, la rotta si trasforma nella direttrice d\'assalto della Marina Imperiale per la conquista lampo della Malesia, di Singapore e dei campi petroliferi delle Indie Olandesi.';
      } else {
        statusNote = 'Arteria Imperiale della Sfera di Co-Prosperità (Palembang & Balikpapan -> Tokyo)';
        isContested = false;
        color = '#b33d4a';
        description = 'Con la conquista di Singapore (febbraio 1942), delle Indie Orientali Olandesi (marzo 1942) e delle Filippine (maggio 1942), l\'Impero Giapponese controlla interamente l\'arteria marittima del Mar Cinese Meridionale, convogliando petrolio, gomma e stagno verso la madrepatria.';
      }
      break;

    case 'transpacific_us_hawaii':
      if (step >= 34) {
        statusNote = 'Rotta Transpacifica USA — Malesia Indipendente (Hari Merdeka 31 Ago), Laos Vientiane (Nov) & Era Sputnik (4 Ott 1957)';
        isContested = true;
        color = '#3d6c96';
        description = 'Al 31 dicembre 1957 la dorsale transpacifica sostiene la difesa USA in Giappone/Okinawa, Corea e Taiwan nell\'anno dello shock strategico dello Sputnik 1 sovietico (4 ottobre). Nel Sud-Est Asiatico nasce il 31 agosto 1957 la Federazione della Malesia indipendente (restano britannici Singapore, Sarawak, Sabah/Labuan e Brunei), in Laos gli Accordi di Vientiane riunificano il Paese e in Indonesia la legge marziale e la Carta di Permesta preludono alla crisi del 1958.';
      } else if (step >= 33) {
        statusNote = 'Rotta Transpacifica USA — Giappone All\'ONU (18 Dic 1956), Cina/Tibet (Rivolta Khampa) & Golfo del Messico/Cuba (Granma 2 Dic)';
        isContested = true;
        color = '#3d6c96';
        description = 'Al 31 dicembre 1956 la dorsale pacifica consolida l\'asse USA–Giappone (ammesso all\'ONU il 18 dicembre 1956 come 80° membro sotto il patto di sicurezza bilaterale e Dichiarazione sovietico-giapponese del 19 ottobre) e la difesa di Taiwan/Kinmen/Matsu e della Repubblica del Vietnam (Ngô Đình Diệm), mentre nell\'emisfero occidentale Cuba entra nella fase rivoluzionaria con lo sbarco del Granma sulla Sierra Maestra (2 dicembre 1956).';
      } else if (step >= 32) {
        statusNote = 'Rotta Transpacifica USA — Caduta Dachen (Feb 1955), Evacuazione Hải Phòng (16 Mag) & Proclamazione Rep. Vietnam (26 Ott)';
        isContested = true;
        color = '#3d6c96';
        description = 'Al 31 dicembre 1955 la dorsale transpacifica tutela Taiwan, Kinmen e Matsu dopo che la 7ª Flotta USA ha coperto l\'evacuazione ROC di Dachen (feb 1955, mentre Yijiangshan e le isole dello Zhejiang passano al 100% alla RPC) e rifornisce la neonata Repubblica del Vietnam di Ngô Đình Diệm (proclamata il 26 ott 1955 a Saigon), completato lo sgombero francese da Hải Phòng il 16 maggio 1955.';
      } else if (step >= 31) {
        statusNote = 'Rotta Transpacifica USA — SEATO (8 Set 1954), Prima Crisi Stretto di Taiwan & Trattato USA–ROC (2 Dic 1954)';
        isContested = true;
        color = '#3d6c96';
        description = 'Al 31 dicembre 1954 la dorsale transpacifica rifornisce il Giappone sovrano e Okinawa (USCAR), sostiene la DMZ coreana e proietta verso sud la neonata SEATO (Patto di Manila, 8 settembre 1954) e l\'Operazione Passage to Freedom da Hải Phòng (enclave SVN/CEFEO fino a mag 1955); nello Stretto di Taiwan la 7ª Flotta affianca il Trattato di Mutua Difesa USA–ROC (2 dicembre 1954) durante i bombardamenti EPL su Kinmen e mentre Yijiangshan e Dachen restano ancora ROC.';
      } else if (step >= 30) {
        statusNote = 'Rotta Transpacifica USA — Armistizio di Panmunjom & DMZ Coreana (27 Lug 1953) · Isole Amami Restituite al Giappone (25 Dic 1953)';
        isContested = true;
        color = '#3d6c96';
        description = 'Al 31 dicembre 1953 la dorsale transpacifica rifornisce il presidio post-armistiziale nella Corea del Sud lungo la nuova DMZ (Armistizio di Panmunjom 27 lug & Trattato di difesa USA–ROK 1° ott), accompagna la restituzione al Giappone delle isole Amami (25 dic 1953, restando Okinawa a sud del 27°N e Bonin sotto USCAR) e tutela Taiwan, Kinmen, Matsu e Dachen dopo il raid ROC su Dongshan (lug 1953).';
      } else if (step >= 29) {
        statusNote = 'Rotta Transpacifica USA — Giappone Pienamente Sovrano (28 Apr 1952), Okinawa USCAR & Stallo MDL in Corea (Dic 1952)';
        isContested = true;
        color = '#3d6c96';
        description = 'Al 31 dicembre 1952, entrato in vigore il Trattato di Pace di San Francisco (28 aprile 1952), il Giappone ha riacquistato la piena sovranità sulle 46 prefetture metropolitane pur mantenendo le basi del Trattato di Sicurezza USA–Giappone, mentre Okinawa (Ryūkyū), le isole Amami (restituite dic 1953) e le Bonin restano sotto USCAR; la linea sostiene il Comando ONU nella guerra di trincea lungo la MDL coreana (Old Baldy, White Horse, Triangle Hill) e lo Stato della Repubblica di Cina a Taiwan, Kinmen, Matsu e Dachen.';
      } else if (step >= 28) {
        statusNote = 'Rotta Transpacifica USA — Trattato di San Francisco (8 Set 1951, Giappone ancora SCAP), Patto ANZUS & Panmunjom MDL in Corea';
        isContested = true;
        color = '#3d6c96';
        description = 'Al 31 dicembre 1951 la dorsale transpacifica riflette la firma del Patto ANZUS (1° settembre) e del Trattato di Pace di San Francisco con il Giappone (8 settembre 1951 — Giappone ancora formalmente sotto occupazione SCAP fino al 28 aprile 1952, con Okinawa e Bonin sotto amministrazione militare USA), rifornendo l\'8ª Armata e il Comando ONU lungo la Linea di Demarcazione Militare di Panmunjom (27 novembre 1951).';
      } else if (step >= 27) {
        statusNote = 'Rotta Transpacifica USA — Linea Kansas/Wyoming in Corea (Ridgway, Offerta 30 Giu) & Giappone SCAP';
        isContested = true;
        color = '#3d6c96';
        description = 'Al 30 giugno 1951 la dorsale USA–Giappone SCAP (Gen. Matthew Ridgway dall\'11 aprile, senza alcun trattato di San Francisco fino a settembre)–Incheon/Busan sostiene le linee fortificate ONU Kansas e Wyoming oltre il 38° parallelo alla data dell\'offerta radiofonica di armistizio (negoziati di Kaesong non ancora aperti).';
      } else if (step >= 26) {
        statusNote = 'Rotta Transpacifica USA — Evacuazione di Hungnam (24 Dic), Rifornimenti Comando ONU Corea & 7ª Flotta (Dic 1950)';
        isContested = true;
        color = '#3d6c96';
        description = 'Al 31 dicembre 1950, completata l\'evacuazione aeronavale ONU da Hungnam (24 dicembre) sotto la spinta dei PVA cinesi, la dorsale pacifica USA–Giappone SCAP–Busan/Incheon sostiene il Comando delle Nazioni Unite (UNC) in Corea e il pattugliamento della 7ª Flotta nello Stretto di Taiwan.';
      } else if (step >= 25) {
        statusNote = 'Rotta Transpacifica USA — Ponte Logistico Corea (Busan) & 7ª Flotta nello Stretto di Taiwan (30 Giu 1950)';
        isContested = true;
        color = '#3d6c96';
        description = 'Dal 25–27 giugno 1950 (Risoluzioni ONU 82–83), il ponte aeronavale USA dal Pacifico e dalle basi SCAP in Giappone avvia il trasporto di rifornimenti e della Task Force Smith verso Busan in Corea del Sud, mentre la Settima Flotta USA pattuglia lo Stretto di Taiwan dopo la perdita nazionalista di Hainan (1° mag) e Zhoushan (19 mag).';
      } else if (step >= 24) {
        statusNote = 'Rotta Transpacifica USA — Stretto di Taiwan, Blocco di Shanghai & Stati Uniti d\'Indonesia (Dic 1949)';
        isContested = false;
        color = '#3d6c96';
        description = 'Al 31 dicembre 1949, dopo la proclamazione della RPC a Pechino (1° ott) e il ritiro del governo della Repubblica di Cina a Taipei (7 dic), la marina ROC mantiene il blocco navale sulle coste continentali (Guanbi) dalle basi di Zhoushan, Kinmen e Hainan, mentre gli USA consolidano la rete Pacifica verso Giappone (SCAP), Taiwan, Filippine e i neonati Stati Uniti d\'Indonesia (27 dic).';
      } else if (step >= 23) {
        statusNote = 'Rotta Transpacifica USA — Rete Difensiva Pacifica & Evacuazioni dal Mar Cinese (Giu 1949)';
        isContested = false;
        color = '#3d6c96';
        description = 'Al 30 giugno 1949 la dorsale marittima statunitense collega la California alle basi avanzate di Pearl Harbor, Guam, Okinawa, Giappone (SCAP) e Filippine mentre la caduta di Shanghai e Qingdao sposta la proiezione navale della Settima Flotta USA attorno a Taiwan e al Giappone.';
      } else if (step >= 18) {
        statusNote = step >= 19 ? 'Rotta Transpacifica USA — Trust Territory & Repubblica delle Filippine' : 'Ponte Navale Postbellico USA verso Filippine, Okinawa e Giappone (SCAP)';
        isContested = false;
        color = '#3d6c96';
        description = step >= 19
          ? 'Linea di comunicazione statunitense lungo il Pacifico settentrionale che collega la California a Pearl Harbor, Guam, il Trust Territory della Micronesia (ONU 1947), le basi in Giappone e Manila.'
          : 'Settembre 1945: la marina e i trasporti statunitensi dominano incontrastati l\'intero Pacifico per il rimpatrio delle truppe e il rifornimento delle forze di occupazione SCAP in Giappone e Corea del Sud.';
      } else if (step >= 14) {
        statusNote = 'Spinta Strategica Statunitense verso Marianne, Filippine & Okinawa';
        isContested = true;
        color = '#5aa0c2';
        description = 'Con la conquista di Saipan, Guam (1944), Luzon, Iwo Jima e Okinawa (1945), la gigantesca catena logistica della U.S. Navy trasporta divisioni, flotte di portaerei e bombardieri B-29 attraverso il Pacifico sino alle porte del Giappone.';
      } else if (step < 9) {
        statusNote = 'Arteria di Comunicazione USA - Filippine';
        description = 'La fondamentale linea di comunicazione aeronavale e mercantile che unisce la costa pacifica statunitense a Pearl Harbor, Guam e Manila.';
      } else if (step === 9) {
        statusNote = 'Tranciata a Ovest di Oahu (Attacco di Pearl Harbor)';
        isContested = true;
        color = '#d9534f';
        description = 'L\'attacco aereo a sorpresa di Pearl Harbor (7 dicembre 1941), la fulminea caduta di Guam (10 dicembre) e Wake (23 dicembre) e gli sbarchi a Luzon recidono la rotta diretta per Manila, isolando le truppe americane e filippine del generale MacArthur.';
      } else if (step === 10) {
        statusNote = 'Fronte del Pacifico Centrale (Vittoria di Midway & Controffensiva di Guadalcanal)';
        isContested = true;
        color = '#d9534f';
        description = 'Sebbene il segmento occidentale (Manila-Guam-Wake) sia in mano giapponese dopo la caduta di Corregidor (6 maggio 1942), la decisiva vittoria delle portaerei americane a Midway (4-7 giugno 1942) blinda Pearl Harbor e consente agli USA di aprire la controffensiva nel Pacifico meridionale a Guadalcanal (7 agosto 1942).';
      } else if (step === 11) {
        statusNote = 'Consolidamento Alleato nelle Salomone & Difesa di Guadalcanal';
        isContested = true;
        color = '#5aa0c2';
        description = 'Dopo la vittoria nella Battaglia navale di Guadalcanal (12-15 novembre 1942), la marina e l\'aviazione degli Stati Uniti controllano saldamente le vie d\'accesso marittime all\'arcipelago, garantendo i rifornimenti a Henderson Field e bloccando i rinforzi dell\'Impero Giapponese.';
      } else {
        statusNote = 'Operazione Cartwheel & Offensiva nelle Salomone Centrali (New Georgia)';
        isContested = true;
        color = '#5aa0c2';
        description = 'Dopo la riconquista totale di Guadalcanal (febbraio 1943), le forze combinate alleate avviano l\'Operazione Cartwheel (fine giugno 1943), risalendo la catena delle Salomone verso la Nuova Georgia per neutralizzare l\'aeroporto di Munda e isolare la base giapponese di Rabaul.';
      }
      break;

    case 'arctic_convoys':
      if (step >= 14) {
        statusNote = 'Convogli Artici JW / RA — Supremazia Alleata nel Mar di Barents';
        isContested = true;
        color = '#7fc8f8';
        description = 'Dopo l\'affondamento dello Scharnhorst e la messa fuori combattimento della Tirpitz (novembre 1944), i convogli artici JW/RA dall\'Islanda e dalla Scozia consegnano a Murmansk e Arcangelo rifornimenti quasi ininterrotti fino alla vittoria in Europa.';
      } else if (step >= 10) {
        statusNote = 'Tragedia del Convoglio PQ-17 & Assalti nel Mar di Barents';
        isContested = true;
        description = 'Nell\'estate 1942 la rotta artica sotto il sole di mezzanotte diventa un inferno aeronavale: nel luglio 1942 il convoglio PQ-17 perde 24 mercantili su 35 sotto gli attacchi combinati di U-Boot e aerosiluranti della Luftwaffe dopo l\'ordine di dispersione per la minaccia della corazzata Tirpitz.';
      } else {
        statusNote = 'Convogli Artici Lend-Lease (PQ / QP)';
        isContested = true;
        description = 'I convogli della speranza attraverso i mari di Barents e Groenlandia: mercantili scortati affrontano tempeste polari e incursioni della Luftwaffe e degli U-Boot dalla Norvegia per recapitare carri Matilda, caccia Hurricane e materiali bellici a Murmansk e Arcangelo.';
      }
      break;

    case 'axis_libya_convoy':
      if (step >= 12) {
        statusNote = 'Rotte dell\'Asse Interrotte (Caduta della Tunisia e Invasione della Sicilia)';
        isContested = false;
        color = '#7a7a7a';
        description = 'Con la capitolazione di 250.000 soldati dell\'Asse in Tunisia (13 maggio 1943) e lo sbarco alleato in Sicilia (Operazione Husky, luglio 1943), le linee marittime italo-tedesche verso il Nordafrica cessano completamente: gli Alleati controllano incontrastati le acque del Canale di Sicilia.';
      } else if (step === 11) {
        statusNote = 'Perdita della Cirenaica & Riorientamento Convogli sulla Tunisia';
        isContested = true;
        color = '#c25a5a';
        description = 'Dopo la perdita di Tobruk e Bengasi (novembre 1942), i convogli dell\'Asse vengono ridiretti sui porti di Tunisi e Biserta ("Rotta della Morte") e su Tripoli per alimentare la testa di ponte in Tunisia, subendo gravissime perdite a opera delle forze aeree di Malta e della Force Q alleata da Bona.';
      } else if (step === 10) {
        statusNote = 'Linea Logistica per El Alamein (Tripoli, Bengasi & Tobruk)';
        isContested = true;
        description = 'Con l\'avanzata di Rommel fino a El Alamein (giugno-agosto 1942), i convogli della Regia Marina estendono le rotte fino a Bengasi e Tobruk, ma la carenza cronica di petroliere e gli attacchi da Malta strangolano i rifornimenti di carburante per la Panzerarmee Afrika alla vigilia di Alam el Halfa.';
      } else {
        statusNote = 'Convogli dell\'Asse per la Libia';
        isContested = true;
        description = 'Cordone ombelicale dell\'Afrikakorps e del Regio Esercito in Cirenaica e Tripolitania. Le rotte da Napoli e Taranto verso Tripoli e Bengasi sono costantemente minacciate dagli aerosiluranti e dai sommergibili della Royal Navy stanziati a Malta.';
      }
      break;

    case 'persian_corridor_sealane':
      statusNote = step >= 14 ? 'Convogli Lend-Lease Finali del Golfo Persico' : 'Rotte del Golfo Persico (Lend-Lease)';
      description = 'Arteria logistica creata dopo l\'invasione anglo-sovietica dell\'Iran nell\'autunno 1941; imponenti convogli scaricano a Bassora e Bandar Shahpur armamenti pesanti e autocarri americani destinati all\'Armata Rossa attraverso la Ferrovia Trans-Iraniana fino alla resa della Germania (maggio 1945).';
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
