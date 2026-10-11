/**
 * GRANDI LINEE DIFENSIVE E BASI NAVALI STRATEGICHE (1936-1940)
 * Geometrie vettoriali e punti chiave per l'accuratezza cartografica e tattica.
 */

export interface FortificationLine {
  id: string;
  name: string;
  nation: string;
  builder: string;
  description: string;
  type: 'heavy' | 'medium' | 'field';
  color: string;
  coordinates: [number, number][]; // [lon, lat]
  keyForts: { name: string; coords: [number, number]; desc: string }[];
  activeSteps: number[]; // Step indices when the line was garrisoned / relevant
}

export interface NavalBase {
  id: string;
  name: string;
  historicalName: string;
  nation: string;
  coords: [number, number]; // [lon, lat]
  type: 'fleet_hq' | 'major_base' | 'fortress_chokepoint';
  theater: 'Atlantic' | 'Mediterranean' | 'Pacific' | 'Baltic' | 'Indian';
  description: string;
}

export const HISTORICAL_FORTIFICATION_LINES: FortificationLine[] = [
  {
    id: 'maginot_line',
    name: 'Linea Maginot (Ligne Maginot)',
    nation: 'Francia',
    builder: 'André Maginot / Repubblica Francese',
    description:
      'Imponente complesso di fortificazioni in calcestruzzo armato e acciaio costruito tra il 1929 e il 1938 per sbarrare l\'invasione dal confine tedesco. Dotata di torrette a scomparsa, gallerie elettrificate e casematte sotterranee.',
    type: 'heavy',
    color: '#4c6a9c',
    coordinates: [
      [5.78, 49.52], // Longuyon / Fermont
      [6.12, 49.42], // Thionville / Hackenberg
      [6.42, 49.35], // Veckring / Mont des Welches
      [6.75, 49.12], // Saint-Avold / Laudrefang
      [7.28, 49.02], // Bitche / Simserhof
      [7.65, 48.98], // Lembach / Hochwald
      [7.98, 48.95], // Schoenenbourg
      [8.05, 48.88], // Lauterbourg / Valle del Reno
      [7.75, 48.55], // Strasburgo (Sbarramento del Reno)
      [7.55, 47.95], // Colmar / Neuf-Brisach
      [7.52, 47.58], // Huningue / Basilea
    ],
    keyForts: [
      { name: 'Ouvrage Hackenberg', coords: [6.36, 49.34], desc: 'Il più grande forte della Linea Maginot (19 blocchi, 1.040 uomini di guarnigione).' },
      { name: 'Ouvrage Simserhof', coords: [7.32, 49.06], desc: 'Fortezza d\'artiglieria a protezione del corridoio di Bitche.' },
      { name: 'Ouvrage Fermont', coords: [5.73, 49.47], desc: 'Grosso sbarramento d\'arresto del settore fortificato della Crusnes.' },
      { name: 'Ouvrage Schoenenbourg', coords: [7.91, 48.97], desc: 'Forte d\'artiglieria protagonista di intensi duelli di fuoco nel 1940.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: 'siegfried_line',
    name: 'Linea Sigfrido (Westwall)',
    nation: 'Germania',
    builder: 'Organizzazione Todt / Terzo Reich',
    description:
      'Sistema difensivo tedesco contrapposto alla Maginot esteso per 630 km da Kleve a Weil am Rhein. Comprendeva oltre 18.000 bunker, postazioni di artiglieria e campi di "denti di drago" (Höckerlinie) anticarro.',
    type: 'heavy',
    color: '#8b8f94',
    coordinates: [
      [6.05, 51.78], // Kleve
      [6.15, 51.25], // Mönchengladbach
      [6.18, 50.78], // Aachen (Aquisgrana)
      [6.45, 50.45], // Eifel / Hürtgenwald
      [6.55, 49.95], // Bitburg
      [6.75, 49.65], // Trier (Treviri)
      [6.98, 49.25], // Saarbrücken (Saarland)
      [7.55, 49.18], // Pirmasens
      [7.85, 49.08], // Bienwald / Bad Bergzabern
      [8.15, 48.75], // Karlsruhe / Rastatt
      [8.02, 48.45], // Kehl (di fronte a Strasburgo)
      [7.85, 48.05], // Friburgo
      [7.62, 47.59], // Weil am Rhein / Confine Svizzero
    ],
    keyForts: [
      { name: 'Bastione di Aquisgrana (Aachen)', coords: [6.12, 50.77], desc: 'Nodo settentrionale fortificato con campi di denti di drago e bunker Regelbau.' },
      { name: 'Sbarramento della Saar (Pirmasens)', coords: [7.60, 49.20], desc: 'Settore centrale ad altissima densità difensiva lungo il Reno.' },
    ],
    activeSteps: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 'mannerheim_line',
    name: 'Linea Mannerheim (Mannerheim-linja)',
    nation: 'Finlandia',
    builder: 'Maresciallo Carl Gustaf Mannerheim / Finlandia',
    description:
      'Complesso difensivo finlandese sull\'Istmo Careliano tra il Golfo di Finlandia e il Lago Ladoga. Nella Guerra d\'Inverno (1939-1940) respinse per oltre due mesi le soverchianti divisioni dell\'Armata Rossa.',
    type: 'heavy',
    color: '#86b0d9',
    coordinates: [
      [28.75, 60.45], // Baia di Viipuri / Gulf of Finland
      [29.05, 60.52], // Summa / Lähde sector
      [29.45, 60.58], // Muolaa / Lago Äyräpäänjärvi
      [29.85, 60.62], // Fiume Vuoksi
      [30.25, 60.65], // Kiviniemi
      [30.55, 60.62], // Taipale / Sponda occidentale del Lago Ladoga
    ],
    keyForts: [
      { name: 'Forte Summa (Settore Lähde)', coords: [29.12, 60.54], desc: 'Epicentro delle più violente offensive sovietiche durante la Guerra d\'Inverno.' },
      { name: 'Forte Taipale', coords: [30.48, 60.61], desc: 'Pilastro orientale della linea sul Lago Ladoga; resistette intatto fino alla pace.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: 'metaxas_line',
    name: 'Linea Metaxas (Grammi Metaxa)',
    nation: 'Grecia',
    builder: 'Generale Ioannis Metaxas / Regno di Grecia',
    description:
      'Catena di 21 forti e fortificazioni sotterranee scavate nelle montagne della Macedonia e Tracia lungo il confine bulgaro, con il celebre Forte Roupel a guardia della gola dello Strimone.',
    type: 'medium',
    color: '#5b8bb8',
    coordinates: [
      [23.25, 41.35], // Monte Beles (Kerkini)
      [23.38, 41.33], // Passo di Rupel (Gola dello Strimone)
      [23.75, 41.28], // Monti Vrontous / Perithori
      [24.15, 41.32], // Paranesti
      [24.75, 41.40], // Monti Rodopi
      [25.35, 41.38], // Komotini / Nymfaia
    ],
    keyForts: [
      { name: 'Fort Roupel', coords: [23.37, 41.34], desc: 'Fortezza leggendaria a controllo del varco della Valle dello Strimone.' },
      { name: 'Forte Nymfaia', coords: [25.42, 41.36], desc: 'Sbarramento fortificato della Tracia orientale verso la Bulgaria.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: 'stalin_line',
    name: 'Linea Stalin (Stalin-Linie)',
    nation: 'URSS',
    builder: 'Armata Rossa / Unione Sovietica',
    description:
      'Vasta linea di Distretti Fortificati (UR) costruita lungo il confine occidentale sovietico degli anni \'20-\'30 dal Mar Baltico al Mar Nero (Pskov, Polotsk, Minsk, Slutsk, Korosten, Kiev, Letichev, Tiraspol).',
    type: 'heavy',
    color: '#b04540',
    coordinates: [
      [28.32, 57.82], // Pskov UR
      [28.48, 56.55], // Sebezh UR
      [28.75, 55.48], // Polotsk UR
      [27.55, 53.95], // Minsk UR
      [27.60, 53.02], // Slutsk UR
      [28.05, 51.52], // Mozyr UR
      [28.65, 50.95], // Korosten UR
      [30.45, 50.45], // Kiev UR
      [28.25, 49.32], // Letichev UR
      [28.65, 48.05], // Mogilev-Podolsky UR
      [29.62, 46.85], // Tiraspol UR (sul Dnestr)
    ],
    keyForts: [
      { name: 'Distretto Fortificato di Minsk', coords: [27.42, 53.92], desc: 'Oltre 300 bunker in cemento a protezione della direttrice verso Mosca.' },
      { name: 'Distretto Fortificato di Kiev (KiUR)', coords: [30.38, 50.48], desc: 'Cintura fortificata sul fiume Dnepr a difesa della capitale ucraina.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: 'vallo_alpino',
    name: 'Vallo Alpino del Littorio',
    nation: 'Italia',
    builder: 'Regno d\'Italia (Guardia alla Frontiera)',
    description:
      'Sistema di fortificazioni permanenti lungo tutto l\'arco alpino italiano dal confine francese a quello svizzero e jugoslavo, a difesa dei valichi montani e delle valli d\'accesso.',
    type: 'medium',
    color: '#6f7a3f',
    coordinates: [
      [7.52, 43.78], // Ventimiglia / Frontiera Francese
      [7.15, 44.25], // Colle di Tenda
      [6.95, 44.85], // Monginevro / Bardonecchia
      [6.98, 45.22], // Moncenisio
      [6.88, 45.68], // Piccolo San Bernardo
      [8.15, 46.25], // Sempione
      [9.85, 46.55], // Passo dello Spluga
      [11.55, 46.98], // Brennero
      [12.35, 46.72], // Monte Croce di Comelico
      [13.68, 46.52], // Tarvisio
      [14.25, 45.78], // Postumia (Confine Italo-Jugoslavo)
      [14.35, 45.35], // Fiume / Carnaro
    ],
    keyForts: [
      { name: 'Forte Bramafam & Chaberton', coords: [6.75, 44.96], desc: 'Batterie corazzate a 3.130 metri di quota dominanti Briançon.' },
      { name: 'Sbarramento Passo Monte Croce', coords: [12.42, 46.68], desc: 'Opere sotterranee blindate per il blocco delle direttrici verso il Friuli.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: 'ghq_line',
    name: 'Linea GHQ (General Headquarters Line)',
    nation: 'Regno Unito',
    builder: 'Generale Sir Edmund Ironside / War Office',
    description:
      'Spina dorsale del dispositivo anti-invasione britannico eretto nell\'estate 1940 dopo la caduta della Francia (Operazione Leone Marino). Lunga centinaia di miglia da Somerset all\'estuario del Tamigi e nello Yorkshire, contava migliaia di casematte (pillbox), fossati anticarro e ponti predisposti per la demolizione.',
    type: 'field',
    color: '#3d7848',
    coordinates: [
      [-2.95, 51.15], // Somerset Levels / Highbridge
      [-2.45, 51.25], // Frome / Wiltshire Stop Line
      [-1.95, 51.35], // Devizes / Kennet and Avon Canal
      [-1.40, 51.40], // Newbury / Berkshire
      [-0.95, 51.45], // Reading
      [-0.72, 51.28], // Aldershot / Farnham
      [-0.58, 51.23], // Guildford Gap / Hog's Back
      [-0.20, 51.24], // Reigate / Surrey Hills
      [0.25, 51.20],  // Edenbridge / Medway Line
      [0.55, 51.38],  // Rochester / Chatham (Fiume Medway)
      [0.85, 51.42],  // Isle of Sheppey / Estuario del Tamigi
    ],
    keyForts: [
      { name: 'Sbarramento del Guildford Gap', coords: [-0.58, 51.23], desc: 'Chiusura strategica tra le North Downs per impedire ai panzer l\'avanzata verso Londra.' },
      { name: 'Linea d\'Arresto del Medway', coords: [0.52, 51.35], desc: 'Bunker e fossati a protezione degli accessi meridionali all\'arsenale di Chatham e a Londra.' },
      { name: 'Wiltshire Stop Line (Kennet & Avon)', coords: [-1.98, 51.35], desc: 'Linea di pillbox scaglionata lungo il canale navigabile per tagliare fuori il South West.' },
    ],
    activeSteps: [6], // Eretta nel giugno 1940
  },
];

export const HISTORICAL_NAVAL_BASES: NavalBase[] = [
  // Gran Bretagna & Alleati
  {
    id: 'scapa_flow',
    name: 'Scapa Flow',
    historicalName: 'HMNB Scapa Flow (Isole Orcadi)',
    nation: 'Regno Unito',
    coords: [-3.05, 58.91],
    type: 'fleet_hq',
    theater: 'Atlantic',
    description: 'Quartier generale e rada fortificata principale della Home Fleet britannica.',
  },
  {
    id: 'devonport',
    name: 'Devonport (Plymouth)',
    historicalName: 'HMNB Devonport (Western Approaches)',
    nation: 'Regno Unito',
    coords: [-4.18, 50.38],
    type: 'fleet_hq',
    theater: 'Atlantic',
    description: 'Il più esteso arsenale navale dell\'Europa occidentale; base di comando per le forze di superficie e di scorta nel contrasto agli U-Boot atlantici.',
  },
  {
    id: 'portsmouth',
    name: 'Portsmouth',
    historicalName: 'HMNB Portsmouth',
    nation: 'Regno Unito',
    coords: [-1.11, 50.80],
    type: 'major_base',
    theater: 'Atlantic',
    description: 'Principale arsenale navale e base della Manica della Royal Navy.',
  },
  {
    id: 'rosyth',
    name: 'Rosyth (Firth of Forth)',
    historicalName: 'HMNB Rosyth (Scottish Command)',
    nation: 'Regno Unito',
    coords: [-3.43, 56.02],
    type: 'major_base',
    theater: 'Atlantic',
    description: 'Base primaria della Royal Navy nel Mare del Nord con bacini di carenaggio per corazzate e portaerei; bersaglio del primo raid aereo tedesco del 1939.',
  },
  {
    id: 'gibraltar',
    name: 'Gibilterra',
    historicalName: 'Fortezza Navale di Gibilterra (The Rock)',
    nation: 'Regno Unito',
    coords: [-5.353, 36.133],
    type: 'fortress_chokepoint',
    theater: 'Mediterranean',
    description: 'Chokepoint strategico fondamentale: controlla l\'accesso tra Oceano Atlantico e Mediterraneo e sede della Force H.',
  },
  {
    id: 'malta',
    name: 'Malta',
    historicalName: 'Fortezza Navale di Malta (Valletta Grand Harbour)',
    nation: 'Regno Unito',
    coords: [14.52, 35.89],
    type: 'fortress_chokepoint',
    theater: 'Mediterranean',
    description: 'Perno aeronavale insulare britannico al centro del Canale di Sicilia e delle rotte per la Libia.',
  },
  {
    id: 'alexandria',
    name: 'Alessandria d\'Egitto',
    historicalName: 'Base Navale di Alessandria',
    nation: 'Regno Unito',
    coords: [29.89, 31.19],
    type: 'fleet_hq',
    theater: 'Mediterranean',
    description: 'Base della Mediterranean Fleet e guardiana dell\'accesso al Canale di Suez.',
  },
  {
    id: 'freetown',
    name: 'Freetown (Sierra Leone)',
    historicalName: 'Freetown Convoy Staging Base',
    nation: 'Regno Unito',
    coords: [-13.23, 8.48],
    type: 'major_base',
    theater: 'Atlantic',
    description: 'Rada naturale strategica nell\'Africa occidentale, snodo nevralgico obbligato per il raggruppamento dei convogli Alleati (rotta del Capo di Buona Speranza).',
  },
  {
    id: 'trincomalee',
    name: 'Trincomalee (Ceylon)',
    historicalName: 'Trincomalee Royal Naval Dockyard',
    nation: 'Regno Unito',
    coords: [81.23, 8.57],
    type: 'major_base',
    theater: 'Indian',
    description: 'Porto naturale d\'altura a Ceylon e quartier generale dell\'East Indies Fleet della Royal Navy nell\'Oceano Indiano.',
  },
  {
    id: 'singapore',
    name: 'Singapore',
    historicalName: 'Fortezza Navale di Singapore (Sembawang Naval Base)',
    nation: 'Regno Unito',
    coords: [103.82, 1.29],
    type: 'fortress_chokepoint',
    theater: 'Pacific',
    description: 'La "Gibilterra d\'Oriente": base oceanica imperiale per il controllo degli Stretti di Malacca.',
  },
  {
    id: 'halifax',
    name: 'Halifax (Canada)',
    historicalName: 'HMC Dockyard Halifax',
    nation: 'Regno Unito / Canada',
    coords: [-63.58, 44.66],
    type: 'major_base',
    theater: 'Atlantic',
    description: 'Punto di partenza principale di tutti i convogli HX e SC diretti in Gran Bretagna attraverso il Nord Atlantico.',
  },

  // Francia
  {
    id: 'brest',
    name: 'Brest',
    historicalName: 'Arsenale Navale di Brest (Bretagna)',
    nation: 'Francia',
    coords: [-4.48, 48.38],
    type: 'fleet_hq',
    theater: 'Atlantic',
    description: 'Base oceanica principale della Marine Nationale francese sull\'Atlantico.',
  },
  {
    id: 'toulon',
    name: 'Tolone',
    historicalName: 'Arsenale Navale di Tolone (Toulon)',
    nation: 'Francia',
    coords: [5.93, 43.12],
    type: 'fleet_hq',
    theater: 'Mediterranean',
    description: 'Cuore della flotta francese nel Mediterraneo e sede delle maggiori corazzate.',
  },

  // Italia
  {
    id: 'taranto',
    name: 'Taranto',
    historicalName: 'Base Navale di Taranto (Mar Grande & Piccolo)',
    nation: 'Italia',
    coords: [17.23, 40.47],
    type: 'fleet_hq',
    theater: 'Mediterranean',
    description: 'Base principale della flotta da battaglia della Regia Marina (Squadra Navale).',
  },
  {
    id: 'la_spezia',
    name: 'La Spezia',
    historicalName: 'Regio Arsenale Militare Marittimo di La Spezia',
    nation: 'Italia',
    coords: [9.82, 44.10],
    type: 'major_base',
    theater: 'Mediterranean',
    description: 'Storico arsenale e quartier generale del Dipartimento Marittimo dell\'Alto Tirreno.',
  },
  {
    id: 'massawa',
    name: 'Massaua',
    historicalName: 'Base Navale di Massaua (AOI / Mar Rosso)',
    nation: 'Italia',
    coords: [39.46, 15.61],
    type: 'major_base',
    theater: 'Indian',
    description: 'Base della Flottiglia del Mar Rosso della Regia Marina a presidio del Corno d\'Africa.',
  },

  // Germania
  {
    id: 'wilhelmshaven',
    name: 'Wilhelmshaven',
    historicalName: 'Kriegsmarinewerft Wilhelmshaven',
    nation: 'Germania',
    coords: [8.14, 53.52],
    type: 'fleet_hq',
    theater: 'Atlantic',
    description: 'Base navale principale della Kriegsmarine sul Mare del Nord.',
  },
  {
    id: 'kiel',
    name: 'Kiel',
    historicalName: 'Reichsmarine / Kriegsmarine Base Kiel',
    nation: 'Germania',
    coords: [10.15, 54.34],
    type: 'major_base',
    theater: 'Baltic',
    description: 'Sbocco del Canale di Kiel e centro di comando per le operazioni nel Mar Baltico.',
  },

  // URSS
  {
    id: 'kronstadt',
    name: 'Kronstadt',
    historicalName: 'Base Navale di Kronstadt (Leningrado)',
    nation: 'URSS',
    coords: [29.77, 59.99],
    type: 'fleet_hq',
    theater: 'Baltic',
    description: 'Fortezza navale insulare a difesa di Leningrado e quartier generale della Flotta del Baltico.',
  },
  {
    id: 'sevastopol',
    name: 'Sebastopoli',
    historicalName: 'Base Navale di Sebastopoli (Crimea)',
    nation: 'URSS',
    coords: [33.52, 44.61],
    type: 'fleet_hq',
    theater: 'Mediterranean',
    description: 'Quartier generale e porto principale della Flotta del Mar Nero sovietica.',
  },

  // Giappone
  {
    id: 'kure',
    name: 'Kure',
    historicalName: 'Distretto Navale di Kure (Giappone)',
    nation: 'Giappone',
    coords: [132.55, 34.23],
    type: 'fleet_hq',
    theater: 'Pacific',
    description: 'Arsenale e base principale della Marina Imperiale Giapponese, cantiere della corazzata Yamato.',
  },
  {
    id: 'yokosuka',
    name: 'Yokosuka',
    historicalName: 'Distretto Navale di Yokosuka (Baia di Tokyo)',
    nation: 'Giappone',
    coords: [139.66, 35.28],
    type: 'major_base',
    theater: 'Pacific',
    description: 'Grande base navale all\'imbocco della Baia di Tokyo per la flotta combinata.',
  },

  // USA
  {
    id: 'pearl_harbor',
    name: 'Pearl Harbor',
    historicalName: 'Pearl Harbor Naval Base (Hawaii)',
    nation: 'USA',
    coords: [-157.97, 21.36],
    type: 'fleet_hq',
    theater: 'Pacific',
    description: 'Quartier generale avanzato della Flotta del Pacifico degli Stati Uniti (US Pacific Fleet).',
  },
];
