/**
 * Dettaglio Geocartografico Storico delle 17 Province e Regioni delle Filippine (1936-1941)
 * Commonwealth of the Philippines (Stato Autonomo Associato agli Stati Uniti d'America)
 *
 * Copertura integrale di tutte le 17 entità territoriali:
 * - Sovranità: Commonwealth delle Filippine (PHL) sotto protettorato/sovranità degli Stati Uniti (USA)
 * - Fazione: Alleati (Step 0-8: Stato federato/associato agli USA in virtù del Tydings-McDuffie Act del 1934)
 * - Autorità di Vertice:
 *   - Presidente del Commonwealth: Manuel L. Quezon (Vicepresidente Sergio Osmeña)
 *   - Alti Commissari degli Stati Uniti a Manila: Frank Murphy (1935-1937), Paul V. McNutt (1937-1939), Francis B. Sayre (1939-1942)
 *   - Consigliere Militare del Commonwealth / Comandante USAFFE: Gen. Douglas MacArthur (Feldmaresciallo dell'Esercito Filippino dal 1936, richiamato in servizio attivo USA nel luglio 1941 a capo della USAFFE)
 *
 * Raggruppamenti Geotopografici:
 * 1. Luzon:
 *    - National Capital Region (PH00: Manila, Malacañang, Nichols Field, Porto di Manila)
 *    - Ilocos (PH01: Vigan, San Fernando, Golfo di Lingayen)
 *    - Cagayan Valley (PH02: Tuguegarao, Aparri, Isole Batanes)
 *    - Central Luzon (PH03: San Fernando, Clark Field, Subic Bay, Bataan)
 *    - Bicol (PH05: Legazpi, Naga, Stretto di San Bernardino)
 *    - Cordillera Administrative Region (PH15: Baguio, Miniere di Benguet)
 *    - Calabarzon (PH40: Cavite Navy Yard, Batangas, Laguna, Corregidor)
 *    - Mimaropa (PH41: Mindoro, Palawan, Marinduque, Stretto di Balabac)
 * 2. Visayas:
 *    - Western Visayas (PH06: Iloilo, Bacolod, Isole Panay e Negros)
 *    - Central Visayas (PH07: Cebu City, Mactan, Bohol)
 *    - Eastern Visayas (PH08: Tacloban, Samar, Leyte, Stretto di Surigao)
 * 3. Mindanao & Arcipelago di Sulu:
 *    - Zamboanga Peninsula (PH09: Zamboanga City, Fort Pilar, Stretto di Basilan)
 *    - Northern Mindanao (PH10: Cagayan de Misamis, Del Monte Airfield, Bukidnon)
 *    - Davao (PH11: Davao City, Golfo di Davao, Piantagioni di Abacá)
 *    - Soccsksargen (PH12: Cotabato City, Valle del Rio Grande, Golfo di Moro)
 *    - Caraga (PH13: Butuan, Surigao, Miniere di Ferro e Nichel)
 *    - Bangsamoro / Muslim Mindanao (PH14: Jolo, Arcipelago di Sulu, Tawi-Tawi, Lago Lanao)
 */

import { ResolvedTerritory, FactionType } from '../types';
import { makeResult } from './georesolver';

export interface PhilippinesProvinceInfo {
  id: string; // 'PH00', 'PH01', ...
  origId?: number | string;
  cntrCode: string; // 'PH'
  cntrName: string; // 'Philippines'
  name: string;
  nutsName: string;
  nameLatn: string;
  nameEngl: string;
  modernName: string;
  historicalName: string;
  adminTitle: string;
  sovereign: string; // 'PHL'
  overlord?: string; // 'USA'
  capital: string;
  islandGroup: 'Luzon' | 'Visayas' | 'Mindanao';
  faction: FactionType; // 'Alleati'
  s0_1: string; // Step 0-1 (1936 - mar 1938: Nascita del Commonwealth & Missione MacArthur)
  s2_4: string; // Step 2-4 (ott 1938 - apr 1939: Guerra d'Asia, Caduta di Hainan & Revisione WPO-3)
  s5_7: string; // Step 5-7 (set 1939 - ott 1940: Patto Tripartito, Invasione Tonchino & Allerta USAFFE)
  s8: string;   // Step 8 (apr 1941: Patto di Mosca, Mobilitazione USAFFE & B-17 a Clark Field)
  getNote: (s: number) => string;
  getSovereign?: (s: number) => string;
  getFaction?: (s: number) => FactionType;
  getHistoricalName?: (s: number) => string;
  getAdminTitle?: (s: number) => string;
}

export const PHILIPPINES_PROVINCES_META: Record<string, PhilippinesProvinceInfo> = {
  // =========================================================================
  // LUZON & ISOLE LIMITROFE
  // =========================================================================
  PH00: {
    id: 'PH00',
    origId: 12,
    cntrCode: 'PH',
    cntrName: 'Philippines',
    name: 'National Capital Region',
    nutsName: 'Manila (Malacañang Palace / Intramuros / Nichols Field)',
    nameLatn: 'National Capital Region',
    nameEngl: 'National Capital Region (Metro Manila)',
    modernName: 'Regione della Capitale Nazionale (Metro Manila)',
    historicalName: 'Commonwealth of the Philippines — Capital City of Manila & Fort McKinley',
    adminTitle: 'Commonwealth of the Philippines — Seat of Government (Malacañang Palace / Office of the U.S. High Commissioner)',
    sovereign: 'PHL',
    overlord: 'USA',
    capital: 'Manila',
    islandGroup: 'Luzon',
    faction: 'Alleati',
    s0_1: "Capitale del Commonwealth insediata nel novembre 1935 con il Presidente Manuel L. Quezon (Palazzo di Malacañang); sede dell'Alto Commissario USA Frank Murphy e del quartiere generale del Philippine Department dell'esercito americano a Fort McKinley; scalo oceanico dei clipper transpacifici della Pan American Airways alla baia di Manila.",
    s2_4: "Sede politica ed economica dell'arcipelago guidata da Quezon e dall'Alto Commissario Paul V. McNutt; crescenti tensioni geopolitiche dopo la caduta di Canton e Hainan in mano giapponese; il governo filippino e il Gen. MacArthur accelerano i programmi di addestramento militare e di fortificazione costiera sulla baia di Manila.",
    s5_7: "Presidenza Quezon sotto la supervisione del nuovo Alto Commissario USA Francis B. Sayre; Nichols Field ospita squadriglie di caccia del Corpo Aereo dell'Esercito USA; arrivo di rifornimenti e caccia P-40 Warhawk; il governo coordina piani di evacuazione d'emergenza e difesa civile antiaerea.",
    s8: "Centro nevralgico della mobilitazione della U.S. Army Forces in the Far East (USAFFE) sotto il comando del Gen. Douglas MacArthur; la baia di Manila e il porto sono in stato d'allerta permanente; i bombardieri pesanti B-17 Flying Fortress giungono in rinforzo per scongiurare l'attacco dell'Asse.",
    getNote(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },

  PH01: {
    id: 'PH01',
    origId: 14,
    cntrCode: 'PH',
    cntrName: 'Philippines',
    name: 'Ilocos',
    nutsName: 'Ilocos & Golfo di Lingayen (Vigan / San Fernando)',
    nameLatn: 'Ilocos',
    nameEngl: 'Ilocos Region',
    modernName: 'Regione di Ilocos (Ilocos Norte, Ilocos Sur, La Union, Pangasinan)',
    historicalName: 'Commonwealth of the Philippines — Ilocos & Lingayen Gulf Coastal Sector',
    adminTitle: 'Commonwealth of the Philippines — Northern Luzon Defense Sector (Provincial Governments of Ilocos & Pangasinan)',
    sovereign: 'PHL',
    overlord: 'USA',
    capital: 'Vigan / Lingayen',
    islandGroup: 'Luzon',
    faction: 'Alleati',
    s0_1: "Regione costiera nord-occidentale di Luzon affacciata sul Mar Cinese Meridionale; centri storici di Vigan e San Fernando; le coste del Golfo di Lingayen costituiscono un'area strategica monitorata dai Philippine Scouts per la difesa costiera.",
    s2_4: "I litorali aperti del Golfo di Lingayen vengono individuati dallo stato maggiore di MacArthur come la più probabile testa di sbarco per una forza d'invasione dal nord; istituzione di posti di vedetta e ricognizione litoranea della guardia costiera.",
    s5_7: "La presenza di basi aeronavali nipponiche a Taiwan (Formosa) accresce la vulnerabilità del litorale d'Ilocos; allestimento di postazioni d'artiglieria campale e addestramento delle milizie di leva della 21ª Divisione dell'Esercito Filippino.",
    s8: "Sorveglianza serrata delle spiagge del Golfo di Lingayen da parte della 21ª e 11ª Divisione USAFFE; pattugliamento continuo delle strade litoranee della Route 3 che collegano Ilocos alla pianura centrale di Luzon.",
    getNote(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },

  PH02: {
    id: 'PH02',
    origId: 11,
    cntrCode: 'PH',
    cntrName: 'Philippines',
    name: 'Cagayan Valley',
    nutsName: 'Cagayan Valley & Batanes (Tuguegarao / Aparri / Basco)',
    nameLatn: 'Cagayan Valley',
    nameEngl: 'Cagayan Valley & Batanes Islands',
    modernName: 'Valle di Cagayan & Isole Batanes (Cagayan, Isabela, Batanes, Nueva Vizcaya, Quirino)',
    historicalName: 'Commonwealth of the Philippines — Cagayan Valley & Batanes Islands Defense Sector',
    adminTitle: 'Commonwealth of the Philippines — North-Eastern Luzon Sector (Provincial Administration of Cagayan & Isabela)',
    sovereign: 'PHL',
    overlord: 'USA',
    capital: 'Tuguegarao / Aparri',
    islandGroup: 'Luzon',
    faction: 'Alleati',
    s0_1: "Vasta valle alluvionale del fiume Cagayan nel nord-est di Luzon delimitata dalla Sierra Madre; porto marittimo settentrionale di Aparri e isole Batanes nello stretto di Luzon a ridosso dell'isola giapponese di Formosa.",
    s2_4: "L'arcipelago delle Batanes nello stretto di Bashi costituisce l'avamposto più settentrionale delle Filippine; il Dipartimento della Guerra USA vi insedia stazioni meteorologiche e di allarme radio per intercettare movimenti aerei e navali giapponesi.",
    s5_7: "Mobilitazione delle unità territoriali dell'Esercito Filippino ad Aparri e Gonzaga; le forze USAFFE preparano piani di demolizione dei ponti sul fiume Cagayan per rallentare eventuali avanzate corazzate nemiche verso sud.",
    s8: "Allerta rossa lungo le spiagge settentrionali di Aparri e San Vicente; le stazioni di vedetta delle Batanes segnalano frequenti sorvoli di ricognitori della Marina Imperiale Giapponese provenienti dalle basi aeronavali di Takao a Taiwan.",
    getNote(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },

  PH03: {
    id: 'PH03',
    origId: 10,
    cntrCode: 'PH',
    cntrName: 'Philippines',
    name: 'Central Luzon',
    nutsName: 'Central Luzon (Clark Field / Subic Bay / Bataan / Pampanga)',
    nameLatn: 'Central Luzon',
    nameEngl: 'Central Luzon (Clark Air Base, Subic Bay & Bataan)',
    modernName: 'Luzon Centrale (Pampanga, Bulacan, Bataan, Tarlac, Nueva Ecija, Zambales)',
    historicalName: 'Commonwealth of the Philippines — Central Luzon (Clark Air Base, Subic Bay & Bataan Peninsula)',
    adminTitle: 'Commonwealth of the Philippines — U.S. Army & Navy Installations (Fort Stotsenburg / Clark Field / Subic Bay Naval Base)',
    sovereign: 'PHL',
    overlord: 'USA',
    capital: 'San Fernando (Pampanga) / Fort Stotsenburg',
    islandGroup: 'Luzon',
    faction: 'Alleati',
    s0_1: "Cuore strategico e militare dell'arcipelago filippino: base aerea di Clark Field e presidio di cavalleria di Fort Stotsenburg nella pianura di Pampanga; base navale di Subic Bay a Olongapo; penisola montuosa e boscosa di Bataan a protezione della baia di Manila.",
    s2_4: "Perno essenziale del piano congiunto War Plan Orange-3 (WPO-3): in caso di sbarco nemico, le truppe filippino-americane devono condurre una ritirata combattuta nella penisola di Bataan, bloccando l'accesso alla baia di Manila in attesa dei soccorsi della flotta del Pacifico.",
    s5_7: "Intensa espansione delle piste di volo di Clark Field per ospitare squadriglie pesanti; potenziamento della base sottomarina di Subic Bay e delle batterie d'artiglieria campale dei Philippine Scouts a protezione degli accessi montani di Bataan.",
    s8: "Schieramento avanzato dei bombardieri strategici B-17 Flying Fortress della 19th Bombardment Group a Clark Field; la 31ª Divisione e il reggimento d'élite 26th Cavalry (Philippine Scouts) presidiano i colli di bottiglia tra Tarlac, Pampanga e Bataan.",
    getNote(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },

  PH05: {
    id: 'PH05',
    origId: 9,
    cntrCode: 'PH',
    cntrName: 'Philippines',
    name: 'Bicol',
    nutsName: 'Bicol Peninsula & Stretto di San Bernardino (Legazpi / Naga)',
    nameLatn: 'Bicol',
    nameEngl: 'Bicol Region',
    modernName: 'Regione di Bicol (Albay, Camarines Sur, Camarines Norte, Sorsogon, Catanduanes, Masbate)',
    historicalName: 'Commonwealth of the Philippines — Bicol Peninsula & San Bernardino Strait',
    adminTitle: 'Commonwealth of the Philippines — South-Eastern Luzon Sector (Provincial Governments of Albay & Camarines)',
    sovereign: 'PHL',
    overlord: 'USA',
    capital: 'Legazpi / Naga',
    islandGroup: 'Luzon',
    faction: 'Alleati',
    s0_1: "Penisola vulcanica nel sud-est di Luzon dominata dal cono perfetto del vulcano Mayon; fiorente produzione di canapa di Manila (abacá) essenziale per la cantieristica navale; porto marittimo di Legazpi e isole di Catanduanes e Masbate.",
    s2_4: "Lo Stretto di San Bernardino tra la penisola di Bicol e l'isola di Samar costituisce il corridoio d'accesso principale tra l'Oceano Pacifico e il mare interno di Sibuyan; installazione di posti di vedetta navale per la sorveglianza delle rotte d'altura.",
    s5_7: "Potenziamento delle difese costiere e del porto di Legazpi; le autorità militari filippine coordinano le scorte strategiche di fibra tessile e gomma destinate alle fabbriche belliche americane.",
    s8: "Allertamento della 41ª e 51ª Divisione dell'Esercito Filippino a copertura del settore di Bicol; sorveglianza continua delle spiagge del Golfo di Albay e delle insenature di Sorsogon contro possibili manovre aggiranti da sud.",
    getNote(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },

  PH15: {
    id: 'PH15',
    origId: 13,
    cntrCode: 'PH',
    cntrName: 'Philippines',
    name: 'Cordillera Administrative Region',
    nutsName: 'Cordillera & Baguio (Camp John Hay / Benguet / Mountain Province)',
    nameLatn: 'Cordillera Administrative Region',
    nameEngl: 'Cordillera (Summer Capital Baguio & Mountain Province)',
    modernName: 'Regione Amministrativa della Cordillera (Benguet, Abra, Mountain Province, Ifugao, Kalinga, Apayao)',
    historicalName: 'Commonwealth of the Philippines — Mountain Province & Summer Capital Baguio',
    adminTitle: 'Commonwealth of the Philippines — Mountain Province & Camp John Hay U.S. Military Reservation',
    sovereign: 'PHL',
    overlord: 'USA',
    capital: 'Baguio City',
    islandGroup: 'Luzon',
    faction: 'Alleati',
    s0_1: "Altopiani montuosi della Cordillera Central; la città di Baguio funge da 'Summer Capital' del Commonwealth e ospita la residenza estiva presidenziale di Malacañang e la base di riposo dell'esercito USA a Camp John Hay; ricchissimi giacimenti auriferi a Benguet.",
    s2_4: "La conformazione geologica impervia e le storiche terrazze di riso di Banaue rendono la regione un bastione naturale; il Gen. MacArthur include i valichi della Cordillera nei piani di difesa e ripiegamento delle forze settentrionali.",
    s5_7: "Camp John Hay ospita una stazione radio strategica dell'Esercito USA; intensificazione della sicurezza attorno ai complessi estrattivi minerari di Benguet e Lepanto, fornitori di oro, argento e rame per la tesoreria di guerra.",
    s8: "Le truppe indigene Igorot e i distaccamenti della 11ª Divisione USAFFE organizzano posizioni difensive e depositi occulti sui passi montani di Naguilian e Kennon Road, gettando le basi per la futura rete di resistenza partigiana.",
    getNote(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },

  PH40: {
    id: 'PH40',
    origId: 7,
    cntrCode: 'PH',
    cntrName: 'Philippines',
    name: 'Calabarzon',
    nutsName: 'Calabarzon (Cavite Navy Yard / Corregidor / Batangas / Laguna)',
    nameLatn: 'Calabarzon',
    nameEngl: 'Calabarzon (Southern Tagalog, Cavite Navy Yard & Corregidor Defenses)',
    modernName: 'Calabarzon / Tagalog Meridionale (Cavite, Laguna, Batangas, Rizal, Quezon)',
    historicalName: 'Commonwealth of the Philippines — Southern Tagalog & Cavite Naval Yard (Corregidor Harbor Defenses)',
    adminTitle: 'Commonwealth of the Philippines & U.S. Navy Asiatic Fleet (Cavite Navy Yard / Harbor Defenses of Manila and Subic Bays)',
    sovereign: 'PHL',
    overlord: 'USA',
    capital: 'Cavite City / Lucena',
    islandGroup: 'Luzon',
    faction: 'Alleati',
    s0_1: "Perno marittimo dell'arcipelago a sud della baia di Manila: il cantiere e arsenale navale di Cavite Navy Yard ospita la sede operativa della U.S. Asiatic Fleet; le fortificazioni insulari all'imbocco della baia (Corregidor/Fort Mills, Fort Drum 'corazzata di cemento', Fort Hughes e Fort Frank) costituiscono la cintura difensiva costiera più potente del Pacifico.",
    s2_4: "I litorali di Batangas sul Mar Cinese Meridionale e del Golfo di Tayabas a Quezon vengono fortificati contro sbarchi ostili; l'ammiraglio Thomas C. Hart coordina il rischieramento dei sommergibili oceanici a Cavite.",
    s5_7: "Stato d'assedio navale: scavo intensivo delle gallerie sotterranee del Malinta Tunnel a Corregidor per ospitare il comando supremo e ospedali militari; ammodernamento delle batterie di cannoni da 305 mm e mortai pesanti costieri.",
    s8: "La U.S. Asiatic Fleet dell'Ammiraglio Hart concentra 29 sommergibili, l'incrociatore pesante USS Houston e squadriglie di idrovolanti PBY Catalina a Cavite; le difese di Corregidor e Fort Drum sono armate a giorno e pronte a sigillare la baia di Manila.",
    getNote(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },

  PH41: {
    id: 'PH41',
    origId: 6,
    cntrCode: 'PH',
    cntrName: 'Philippines',
    name: 'Mimaropa',
    nutsName: 'Mimaropa & Palawan (Mindoro / Palawan / Puerto Princesa / Balabac)',
    nameLatn: 'Mimaropa',
    nameEngl: 'Mimaropa (Mindoro, Marinduque, Romblon & Palawan)',
    modernName: 'Regione di Mimaropa (Palawan, Mindoro Occidentale, Mindoro Orientale, Marinduque, Romblon)',
    historicalName: 'Commonwealth of the Philippines — Palawan & Mindoro Frontier Sector',
    adminTitle: 'Commonwealth of the Philippines — South-Western Maritime Defense Sector (Provincial Governments of Palawan & Mindoro)',
    sovereign: 'PHL',
    overlord: 'USA',
    capital: 'Puerto Princesa / Calapan',
    islandGroup: 'Luzon',
    faction: 'Alleati',
    s0_1: "Lunga isola-frontiera di Palawan estesa verso il Borneo e grande isola di Mindoro; lo Stretto di Mindoro costituisce una fondamentale rotta commerciale tra il Mar Cinese Meridionale e il Mare di Sulu; avamposti isolati della guardia costiera e colonie penali a Iwahig.",
    s2_4: "L'allineamento geografico di Palawan separa il Mar Cinese Meridionale dalle acque interne filippine; la U.S. Navy istituisce punti d'ancoraggio e boe di rifornimento idrovolanti nella baia di Malampaya e a Puerto Princesa.",
    s5_7: "Sorveglianza aerea dello Stretto di Balabac al confine con il Borneo Britannico per monitorare naviglio commerciale e petroliere; reclutamento di guide locali Pala'wan e Tagbanwa per la ricognizione della giungla costiera.",
    s8: "Pattugliamenti aeronavali intensivi dei Catalina PBY tra Palawan e le scogliere contese delle isole Spratly; le installazioni di San Jose a Mindoro preparano scorte per l'aviazione da caccia alleata.",
    getNote(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },

  // =========================================================================
  // ISOLE VISAYAS
  // =========================================================================
  PH06: {
    id: 'PH06',
    origId: 16,
    cntrCode: 'PH',
    cntrName: 'Philippines',
    name: 'Western Visayas',
    nutsName: 'Western Visayas (Panay / Negros Occidental / Iloilo / Bacolod)',
    nameLatn: 'Western Visayas',
    nameEngl: 'Western Visayas (Panay & Negros Occidental)',
    modernName: 'Visayas Occidentali (Iloilo, Negros Occidental, Capiz, Aklan, Antique, Guimaras)',
    historicalName: 'Commonwealth of the Philippines — Western Visayas (Panay & Negros Occidental)',
    adminTitle: 'Commonwealth of the Philippines — 61st Division Mobilization Area (Provincial Governments of Iloilo & Negros Occidental)',
    sovereign: 'PHL',
    overlord: 'USA',
    capital: 'Iloilo City / Bacolod',
    islandGroup: 'Visayas',
    faction: 'Alleati',
    s0_1: "Isole di Panay e Negros Occidentale; porto storico e commerciale di Iloilo City, secondo polo marittimo dell'arcipelago; fiorente industria saccarifera delle grandi haciendas di Bacolod, motore economico delle esportazioni verso gli Stati Uniti.",
    s2_4: "La regione delle Visayas Occidentali sostiene il bilancio del Commonwealth grazie alle rimesse dello zucchero e dell'agricoltura; potenziamento dei bacini di carenaggio e delle banchine portuali di Iloilo.",
    s5_7: "Istituzione del centro di mobilitazione della 61ª Divisione dell'Esercito Filippino sotto ufficiali istruttori statunitensi; conversione delle riserve di melassa e alcol in carburante sintetico per veicoli militari.",
    s8: "La 61ª Divisione USAFFE completa l'inquadramento di migliaia di fanti a Panay; allestimento di campi d'atterraggio ausiliari a Mandurriao (Iloilo) e Fabrica (Negros) per consentire la dispersione dei velivoli alleati.",
    getNote(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },

  PH07: {
    id: 'PH07',
    origId: 15,
    cntrCode: 'PH',
    cntrName: 'Philippines',
    name: 'Central Visayas',
    nutsName: 'Central Visayas (Cebu City / Mactan / Bohol / Negros Oriental)',
    nameLatn: 'Central Visayas',
    nameEngl: 'Central Visayas (Cebu, Bohol & Negros Oriental)',
    modernName: 'Visayas Centrali (Cebu, Bohol, Negros Oriental, Siquijor)',
    historicalName: 'Commonwealth of the Philippines — Central Visayas (Cebu Naval Base & Visayan Force HQ)',
    adminTitle: 'Commonwealth of the Philippines — Visayan Force Headquarters (Provincial Administration of Cebu & Bohol)',
    sovereign: 'PHL',
    overlord: 'USA',
    capital: 'Cebu City',
    islandGroup: 'Visayas',
    faction: 'Alleati',
    s0_1: "Cuore geografico e commerciale delle isole Visayas; la storica metropoli di Cebu City vanta eccellenti infrastrutture portuali, collegamenti marittimi per il cabotaggio e l'isola corallina di Mactan; ricchi giacimenti di carbone e rame.",
    s2_4: "Cebu City viene designata sede di riserva della logistica marittima filippina e deposito principale per i rifornimenti di riso, sementi e carburante destinati a sostenere le popolazioni civili in caso di blocco di Luzon.",
    s5_7: "Quartier generale della Visayan-Mindanao Force sotto il comando del generale William F. Sharp; allestimento di stazioni radio navali e postazioni per motosiluranti PT boat della U.S. Navy nel porto di Cebu.",
    s8: "Piena mobilitazione della 81ª Divisione USAFFE a Cebu e Bohol; Cebu costituisce il cardine di collegamento per il contrabbando marittimo di cibo e medicinali destinati alle guarnigioni asserragliate a Bataan.",
    getNote(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },

  PH08: {
    id: 'PH08',
    origId: 8,
    cntrCode: 'PH',
    cntrName: 'Philippines',
    name: 'Eastern Visayas',
    nutsName: 'Eastern Visayas (Leyte / Samar / Tacloban / Stretto di San Juanico)',
    nameLatn: 'Eastern Visayas',
    nameEngl: 'Eastern Visayas (Leyte & Samar)',
    modernName: 'Visayas Orientali (Leyte, Samar, Samar Settentrionale, Samar Orientale, Leyte Meridionale, Biliran)',
    historicalName: 'Commonwealth of the Philippines — Eastern Visayas (Leyte & Samar Defense Sector)',
    adminTitle: 'Commonwealth of the Philippines — 91st Division Mobilization Area (Provincial Governments of Leyte & Samar)',
    sovereign: 'PHL',
    overlord: 'USA',
    capital: 'Tacloban',
    islandGroup: 'Visayas',
    faction: 'Alleati',
    s0_1: "Grandi isole di Leyte e Samar affacciate direttamente sull'Oceano Pacifico; il porto di Tacloban domina la baia di San Pedro e lo stretto di San Juanico; estese piantagioni di noce di cocco (copra) e risaie.",
    s2_4: "La costa orientale di Samar rappresenta la prima terraferma filippina avvistata dalle rotte navali provenienti dalle Hawaii e da Guam; installazione di stazioni d'avvistamento costiero collegate telegraficamente a Manila.",
    s5_7: "Mobilitazione della 91ª Divisione dell'Esercito Filippino nei campi d'addestramento di Tacloban e Ormoc; le acque protette del Golfo di Leyte offrono un ancoraggio naturale per naviglio alleato disperso.",
    s8: "Le unità della 91ª Divisione USAFFE completano l'allestimento di trincee costiere e batterie mobili; il Golfo di Leyte viene inserito nelle mappe strategiche navali americane come snodo chiave per ogni futura controffensiva oceanica.",
    getNote(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },

  // =========================================================================
  // MINDANAO & ARCIPELAGO DI SULU
  // =========================================================================
  PH09: {
    id: 'PH09',
    origId: 5,
    cntrCode: 'PH',
    cntrName: 'Philippines',
    name: 'Zamboanga Peninsula',
    nutsName: 'Zamboanga & Basilan (Zamboanga City / Fort Pilar / Pettit Barracks)',
    nameLatn: 'Zamboanga Peninsula',
    nameEngl: 'Zamboanga Peninsula & Basilan',
    modernName: 'Penisola di Zamboanga (Zamboanga del Sur, Zamboanga del Norte, Zamboanga Sibugay, Basilan)',
    historicalName: 'Commonwealth of the Philippines — Zamboanga Peninsula & Basilan Strait',
    adminTitle: 'Commonwealth of the Philippines & U.S. Army (Pettit Barracks / Fort Pilar Military Command)',
    sovereign: 'PHL',
    overlord: 'USA',
    capital: 'Zamboanga City',
    islandGroup: 'Mindanao',
    faction: 'Alleati',
    s0_1: "Punta sud-occidentale di Mindanao protesa verso il mare di Sulu; storica fortezza spagnola di Fort Pilar e presidio militare americano di Pettit Barracks a Zamboanga City; importante scalo marittimo verso le Indie Olandesi e Singapore.",
    s2_4: "Controllo strategico dello Stretto di Basilan tra il Mare di Sulu e il Mare di Celebes; la U.S. Navy utilizza Zamboanga come scalo carburante per cacciatorpediniere e sommergibili in rotta verso le basi olandesi di Tarakan e Balikpapan.",
    s5_7: "Pattugliamento coordinato tra le cannoniere della marina USA e la polizia filippina per prevenire infiltrazioni navali clandestine nelle coste labirintiche della penisola.",
    s8: "Rischieramento delle truppe di guarnigione della 102ª Divisione USAFFE e dei Philippine Scouts a difesa del porto di Zamboanga e dei campi di volo d'emergenza affacciati sul Mare di Celebes.",
    getNote(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },

  PH10: {
    id: 'PH10',
    origId: 3,
    cntrCode: 'PH',
    cntrName: 'Philippines',
    name: 'Northern Mindanao',
    nutsName: 'Northern Mindanao & Bukidnon (Cagayan de Misamis / Del Monte Airfield)',
    nameLatn: 'Northern Mindanao',
    nameEngl: 'Northern Mindanao (Cagayan de Misamis & Del Monte)',
    modernName: 'Mindanao Settentrionale (Misamis Oriental, Misamis Occidental, Bukidnon, Lanao del Norte, Camiguin)',
    historicalName: 'Commonwealth of the Philippines — Northern Mindanao & Del Monte Strategic Airfield',
    adminTitle: 'Commonwealth of the Philippines — Northern Mindanao Sector & Del Monte Heavy Bomber Base',
    sovereign: 'PHL',
    overlord: 'USA',
    capital: 'Cagayan de Misamis (Cagayan de Oro)',
    islandGroup: 'Mindanao',
    faction: 'Alleati',
    s0_1: "Costa settentrionale di Mindanao sul Mare di Bohol e fertili altopiani vulcanici interni di Bukidnon; porto di Cagayan de Misamis; estese piantagioni di ananas della Del Monte Corporation.",
    s2_4: "Gli altipiani pianeggianti e ben drenati di Bukidnon attraggono l'attenzione degli esperti dell'Aviazione USA: la conformazione dell'area consente la costruzione di piste atterraggio per aerei a lungo raggio al riparo da bombardamenti navali costieri.",
    s5_7: "Costruzione segreta delle grandi piste d'atterraggio di Del Monte Airfield; l'Esercito USA predispone la base come aeroporto di riserva strategica per i bombardieri pesanti dell'aviazione dell'Estremo Oriente in caso di inagibilità di Clark Field.",
    s8: "Del Monte Airfield a Bukidnon diviene la base operativa dispersa per le fortezze volanti B-17 della Far East Air Force e lo snodo aereo che permetterà in seguito l'evacuazione del Gen. MacArthur e della famiglia presidenziale Quezon verso l'Australia.",
    getNote(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },

  PH11: {
    id: 'PH11',
    origId: 1,
    cntrCode: 'PH',
    cntrName: 'Philippines',
    name: 'Davao',
    nutsName: 'Davao & Golfo di Davao (Davao City / Digos / Piantagioni Ohta)',
    nameLatn: 'Davao',
    nameEngl: 'Davao Region (Davao Gulf & Plantations)',
    modernName: 'Regione di Davao (Davao del Sur, Davao del Norte, Davao Oriental, Davao de Oro, Davao Occidental)',
    historicalName: 'Commonwealth of the Philippines — Davao Gulf & Southern Mindanao Sector',
    adminTitle: 'Commonwealth of the Philippines — Davao Provincial Administration (Supervised Alien District)',
    sovereign: 'PHL',
    overlord: 'USA',
    capital: 'Davao City',
    islandGroup: 'Mindanao',
    faction: 'Alleati',
    s0_1: "Vasto golfo nel sud-est di Mindanao dominato dal Monte Apo; fiorenti piantagioni di abacá e noce di cocco sviluppate in larga misura da una consistente comunità d'affari giapponese (nota popolarmente come 'Davaokuo'), con proprie scuole, banche e linee marittime.",
    s2_4: "L'alta densità di cittadini giapponesi a Davao (oltre 18.000 residenti) suscita vivaci allarmi di sicurezza a Manila e Washington; il presidente Quezon e l'Assemblea Nazionale introducono restrizioni sull'acquisto di terreni agricoli.",
    s5_7: "Sorveglianza militare intensificata da parte della Philippine Constabulary nel porto di Davao e nelle fattorie di canapa; sequestro di stazioni radio clandestine e censura delle comunicazioni consolari nipponiche.",
    s8: "Schieramento del 101st Infantry Regiment USAFFE a difesa degli accessi costieri di Digos e Davao City; il comando alleato prevede un imminente sbarco da parte delle forze anfibie della Marina Imperiale Giapponese provenienti da Palau.",
    getNote(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },

  PH12: {
    id: 'PH12',
    origId: 17,
    cntrCode: 'PH',
    cntrName: 'Philippines',
    name: 'Soccsksargen',
    nutsName: 'Soccsksargen & Cotabato (Cotabato City / Rio Grande de Mindanao)',
    nameLatn: 'Soccsksargen',
    nameEngl: 'Soccsksargen (Cotabato Basin & Sarangani Bay)',
    modernName: 'Soccsksargen / Cotabato (Cotabato, South Cotabato, Sultan Kudarat, Sarangani, General Santos)',
    historicalName: 'Commonwealth of the Philippines — Cotabato & Moro Gulf Defense Sector',
    adminTitle: 'Commonwealth of the Philippines — Cotabato Provincial Government & Mindanao Force',
    sovereign: 'PHL',
    overlord: 'USA',
    capital: 'Cotabato City',
    islandGroup: 'Mindanao',
    faction: 'Alleati',
    s0_1: "Immenso bacino fluviale del Rio Grande de Mindanao affacciato sul Golfo di Moro; centro amministrativo di Cotabato City e colonie agricole d'insediamento di coloni cristiani (programma promosso dal Gen. Paulino Santos nella baia di Sarangani).",
    s2_4: "Integrazione delle storiche aristocrazie musulmane (Datu e Sultanati) nelle istituzioni civili del Commonwealth; espansione delle vie di comunicazione stradali per collegare il sud di Mindanao alla costa settentrionale.",
    s5_7: "Istituzione di campi d'addestramento per i riservisti della 101ª Divisione dell'Esercito Filippino lungo la valle di Cotabato; messa in sicurezza dei depositi di grano e riso interni.",
    s8: "La 101ª Divisione USAFFE organizza posizioni d'arresto sul fiume Pulangi e alle foci del Rio Grande; cooperazione tra milizie musulmane Moro e truppe regolari a presidio delle baie di Moro e Sarangani.",
    getNote(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },

  PH13: {
    id: 'PH13',
    origId: 2,
    cntrCode: 'PH',
    cntrName: 'Philippines',
    name: 'Caraga',
    nutsName: 'Caraga & Stretto di Surigao (Butuan / Surigao / Miniere di Nonoc)',
    nameLatn: 'Caraga',
    nameEngl: 'Caraga Region (Surigao & Agusan Valley)',
    modernName: 'Regione di Caraga (Agusan del Norte, Agusan del Sur, Surigao del Norte, Surigao del Sur, Isole Dinagat)',
    historicalName: 'Commonwealth of the Philippines — Caraga & Surigao Strait Sector',
    adminTitle: 'Commonwealth of the Philippines — Surigao & Agusan Sector (Mining & Maritime Defense)',
    sovereign: 'PHL',
    overlord: 'USA',
    capital: 'Butuan / Surigao',
    islandGroup: 'Mindanao',
    faction: 'Alleati',
    s0_1: "Regione nord-orientale di Mindanao attraversata dal fiume Agusan e affacciata sullo Stretto di Surigao; antichi centri di Butuan e Surigao; straordinari giacimenti di ferro, cromo e nichel nelle riserve minerarie di Surigao e dell'isola di Nonoc.",
    s2_4: "Le risorse minerarie ferrose e di cromo di Surigao assumono rilievo strategico prioritario per l'industria pesante americana; il porto di Surigao funge da canale di transito privilegiato verso Leyte.",
    s5_7: "Pattugliamento delle bocche marittime dello Stretto di Surigao; la Philippine Constabulary intensifica la guardia attorno agli impianti d'estrazione e ai moli d'imbarco del minerale grezzo.",
    s8: "Allestimento di postazioni d'osservazione costiera e nidi di mitragliatrici sui promontori che dominano lo stretto; la 81ª Divisione USAFFE predispone postazioni difensive a protezione delle vie d'accesso a Butuan.",
    getNote(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },

  PH14: {
    id: 'PH14',
    origId: 4,
    cntrCode: 'PH',
    cntrName: 'Philippines',
    name: 'Autonomous Region in Muslim Mindanao',
    nutsName: 'Sulu & Lanao (Jolo / Tawi-Tawi / Dansalan / Stretto di Sibutu)',
    nameLatn: 'Autonomous Region in Muslim Mindanao',
    nameEngl: 'Muslim Mindanao & Sulu Archipelago',
    modernName: 'Regione Autonoma nel Mindanao Musulmano / Bangsamoro (Sulu, Tawi-Tawi, Lanao del Sur, Maguindanao)',
    historicalName: 'Commonwealth of the Philippines — Sulu Archipelago & Lake Lanao Sector',
    adminTitle: 'Commonwealth of the Philippines — Sulu & Lanao Special Administrative Provinces',
    sovereign: 'PHL',
    overlord: 'USA',
    capital: 'Jolo / Dansalan (Marawi)',
    islandGroup: 'Mindanao',
    faction: 'Alleati',
    s0_1: "Catena insulare dell'arcipelago di Sulu (Jolo, Tawi-Tawi, Sanga-Sanga) e bacino montano del Lago Lanao; territorio storico delle popolazioni musulmane Moro e del Sultanato di Sulu; confine marittimo con il Borneo Britannico lungo lo stretto di Sibutu.",
    s2_4: "Il Canale di Sibutu e le acque di Tawi-Tawi rappresentano un passaggio navale obbligato tra il Mar di Sulu e il Mar di Celebes; la U.S. Navy e i guardacoste monitorano attentamente il transito dei piroscafi oceanici.",
    s5_7: "Intese di lealtà tra il governo di Manuel L. Quezon e i leader tradizionali Moro di Lanao e Sulu; addestramento di guerriglieri volontari musulmani rinomati per il coraggio nei combattimenti corpo a corpo.",
    s8: "Le isole di Tawi-Tawi e Jolo rafforzano le guarnigioni della 101ª Divisione e dei Philippine Constabulary Rangers; i passi dello stretto di Sibutu sono pattugliati da idrovolanti PBY Catalina alleati in allerta per incursioni dal Borneo o da Davao.",
    getNote(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  }
};

/**
 * Risolutore geocartografico per le province e regioni delle Filippine (1936-1941)
 */
// Override Step 9 (DIC 1941): Invasione giapponese delle Filippine (sbarchi a Luzon e Mindanao a dicembre; Manila dichiarata Città Aperta da MacArthur il 26 dicembre 1941; ripiegamento USAFFE a Bataan e Corregidor)
const PHILIPPINES_JAP_OCCUPIED_DEC1941 = new Set([
  'PH01', // Ilocos Region (sbarco a Vigan 10 dic e Golfo di Lingayen 22 dic 1941 - 14ª Armata Gen. Homma)
  'PH02', // Cagayan Valley (sbarco a Batanes 8 dic e Aparri/Gonzaga 10 dic 1941)
  'PH05', // Bicol Region (sbarco a Legazpi 12 dic e Baia di Lamon 24 dic 1941)
  'PH15', // Cordillera / Baguio (caduta di Baguio il 27 dicembre 1941)
  'PH11', // Davao Region (sbarco del Distaccamento Sakaguchi e Miura a Davao il 20 dicembre 1941)
  'PH14', // Sulu / Jolo (sbarco a Jolo il 24-25 dicembre 1941)
]);

const PHILIPPINES_DEC1941_NOTES: Record<string, string> = {
  PH00: "Manila (Città Aperta — 26 Dicembre 1941) · Bombardata dall'aviazione giapponese a partire dall'8-10 dicembre 1941 (distruzione dell'arsenale navale di Cavite), di fronte alla convergenza a tenaglia della 14ª Armata giapponese (Ten. Gen. Masaharu Homma) dal Golfo di Lingayen a nord e dalla Baia di Lamon a sud, il 26 dicembre 1941 il Gen. Douglas MacArthur proclama Manila 'Città Aperta' (Open City), evacuando il governo del Presidente Manuel L. Quezon a Corregidor e ritirando le forze USAFFE nella penisola di Bataan; le avanguardie giapponesi si trovano alle porte della capitale il 31 dicembre.",
  PH01: "Regione di Ilocos e Golfo di Lingayen · Dopo il primo sbarco del Distaccamento Kanno a Vigan il 10 dicembre 1941, all'alba del 22 dicembre il grosso della 14ª Armata giapponese (48ª Divisione sotto il Ten. Gen. Masaharu Homma, trasportata da 85 navi) sbarca sulle spiagge del Golfo di Lingayen (Bauang, Agoo, Damortis), superando le difese della 11ª e 71ª Divisione filippina e degli Stuart M3 del 192nd Tank Battalion e marciando rapidamente attraverso la piana centrale verso Manila.",
  PH02: "Valle di Cagayan, Batanes e Aparri · L'8 dicembre 1941 forze speciali navali giapponesi occupano l'isola di Batan e il 10 dicembre il Distaccamento Tanaka sbarca ad Aparri e Gonzaga nel nord di Luzon (contrastato dall'eroico attacco del B-17 del Cap. Colin Kelly), assicurando gli aeroporti avanzati per i caccia Zero della 5ª Divisione Aerea.",
  PH03: "Luzon Centrale, Clark Field e Penisola di Bataan · L'8 dicembre 1941, nove ore dopo Pearl Harbor, i bombardieri giapponesi G4M e i caccia Zero decollati da Formosa distruggono al suolo a Clark Field e Iba metà della Far East Air Force statunitense (B-17 e P-40). Il 23 dicembre MacArthur attiva il War Plan Orange-3 (WPO-3): attraverso la magistrale manovra dilatoria sul ponte di Calumpit (31 dicembre 1941), le armate di Luzon Nord e Sud convergono nella fortezza naturale della penisola di Bataan.",
  PH40: "Tagalog Meridionale, Cavite, Batangas e Isola di Corregidor · Il 10 dicembre 1941 i bombardieri della Marina Imperiale devastano la base navale statunitense di Sangley Point (Cavite), mentre il 24 dicembre la 16ª Divisione giapponese sbarca nella Baia di Lamon (Mauban e Atimonan). L'isola fortificata di Corregidor ('The Rock', Fort Mills) all'ingresso della Baia di Manila diviene il quartier generale sotterraneo (Malinta Tunnel) del Gen. Douglas MacArthur e del governo del Commonwealth di Manuel L. Quezon.",
  PH05: "Regione di Bicol e Legazpi · Il 12 dicembre 1941 il Distaccamento Kimura (16ª Divisione giapponese) sbarca a Legazpi nell'estremità sud-orientale di Luzon, catturando la pista aerea e la linea ferroviaria Manila Railroad e avanzando verso nord a supporto dello sbarco principale nella Baia di Lamon (24 dicembre).",
  PH15: "Cordillera e Baguio · La capitale estiva di Baguio, dove il Gen. Jonathan M. Wainwright coordina inizialmente la North Luzon Force, viene evacuata sotto l'avanzata giapponese da Naguilian ed occupata dalle truppe imperiali il 27 dicembre 1941.",
  PH11: "Regione di Davao (Mindanao) · All'alba del 20 dicembre 1941 i distaccamenti giapponesi Sakaguchi e Miura (partiti da Palau) sbarcano a Davao e Talomo nel sud di Mindanao, travolgendo il presidio del 101° Reggimento filippino e trasformando Davao nella base aeronavale avanzata giapponese per l'invasione delle Indie Orientali Olandesi.",
  PH14: "Arcipelago di Sulu e Jolo · Nella notte della vigilia di Natale (24-25 dicembre 1941), il Distaccamento Sakaguchi e le forze speciali da sbarco della Marina Imperiale conquistano l'isola di Jolo e il suo aeroporto strategico tra Mindanao e il Borneo britannico.",
};

for (const [k, meta] of Object.entries(PHILIPPINES_PROVINCES_META)) {
  const origNote = meta.getNote.bind(meta);
  const isJap = PHILIPPINES_JAP_OCCUPIED_DEC1941.has(k) || PHILIPPINES_JAP_OCCUPIED_DEC1941.has(meta.id);

  (meta as any).getSovereign = (s: number) => {
    if (s >= 9) return isJap ? 'JAP' : 'PHL';
    return meta.sovereign;
  };
  meta.getFaction = (s: number) => {
    if (s >= 9) return isJap ? 'Asse' : 'Alleati';
    return meta.faction;
  };
  meta.getHistoricalName = (s: number) => {
    if (s >= 9) {
      if (meta.id === 'PH00') return 'City of Manila — Proclaimed Open City (26 December 1941 — Gen. Douglas MacArthur)';
      if (meta.id === 'PH03') return `${meta.historicalName} (Ridotto Difensivo USAFFE di Bataan — War Plan Orange-3)`;
      if (meta.id === 'PH40') return `${meta.historicalName} (Fortezza di Corregidor — Quartier Generale USAFFE & Governo Quezon)`;
      if (isJap) return `${meta.historicalName} (Occupazione Militare Giapponese — 14ª Armata, Dicembre 1941)`;
      return `${meta.historicalName} (Campagna delle Filippine — Difesa USAFFE, Dicembre 1941)`;
    }
    return meta.historicalName;
  };
  meta.getAdminTitle = (s: number) => {
    if (s >= 9) {
      if (isJap) return `Impero Giapponese — Occupazione Militare delle Filippine (14ª Armata — Ten. Gen. Masaharu Homma)`;
      if (meta.id === 'PH00') return `Commonwealth of the Philippines — Manila Città Aperta (26 dicembre 1941 — Evacuazione USAFFE verso Bataan e Corregidor)`;
      return `${meta.adminTitle} — Comando USAFFE (Gen. Douglas MacArthur, Corregidor / Bataan)`;
    }
    return meta.adminTitle;
  };
  meta.getNote = (s: number) => {
    if (s >= 9) {
      if (PHILIPPINES_DEC1941_NOTES[meta.id]) return PHILIPPINES_DEC1941_NOTES[meta.id];
      return `${origNote(8)} Nel dicembre 1941, con l'invasione giapponese di Luzon e Mindanao e la dichiarazione di Manila Città Aperta (26 dicembre), le guarnigioni USAFFE delle Visayas e di Mindanao organizzano la resistenza insulare e il supporto logistico a Corregidor.`;
    }
    return origNote(s);
  };
}

export function resolvePhilippinesProvince(ft: any, s: number): ResolvedTerritory {
  if (!ft) return makeResult('PHL', 'Commonwealth of the Philippines', 'Commonwealth delle Filippine', 'Alleati', 'Commonwealth of the Philippines');

  const p = ft.properties || {};
  const rawId = String(ft.id || p.id || p.NUTS_ID || '').trim().toUpperCase();
  const rawName = String(p.NAME || p.HISTORICAL_NAME || p.name || p.NUTS_NAME || '').trim();

  // 1. Risoluzione diretta per ID standard (es. 'PH00', 'PH01', 'PH11'...)
  if (PHILIPPINES_PROVINCES_META[rawId]) {
    const meta = PHILIPPINES_PROVINCES_META[rawId];
    const sov = meta.getSovereign ? (meta as any).getSovereign(s) : meta.sovereign;
    const fac = meta.getFaction ? meta.getFaction(s) : meta.faction;
    const histName = meta.getHistoricalName ? meta.getHistoricalName(s) : meta.historicalName;
    const admin = meta.getAdminTitle ? meta.getAdminTitle(s) : meta.adminTitle;
    const note = meta.getNote(s);

    return makeResult(sov, histName, note, fac, admin);
  }

  // 2. Risoluzione per toponimo / string matching
  const norm = (str: string) =>
    str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
  const nrmRaw = norm(rawName);

  let meta: PhilippinesProvinceInfo | undefined = undefined;

  for (const key of Object.keys(PHILIPPINES_PROVINCES_META)) {
    const candidate = PHILIPPINES_PROVINCES_META[key];
    const candNorm = norm(candidate.name);
    const candHistNorm = norm(candidate.historicalName);
    const candModNorm = norm(candidate.modernName);

    if (
      nrmRaw === candNorm ||
      candNorm.includes(nrmRaw) ||
      nrmRaw.includes(candNorm) ||
      nrmRaw === candHistNorm ||
      candHistNorm.includes(nrmRaw) ||
      nrmRaw.includes(candHistNorm) ||
      nrmRaw === candModNorm ||
      candModNorm.includes(nrmRaw) ||
      nrmRaw.includes(candModNorm)
    ) {
      meta = candidate;
      break;
    }
  }

  // 3. Fallback per toponimi specifici
  if (!meta) {
    if (nrmRaw.includes('manila') || nrmRaw.includes('ncr') || rawId === 'PH00') {
      meta = PHILIPPINES_PROVINCES_META.PH00;
    } else if (nrmRaw.includes('davao') || rawId === 'PH11') {
      meta = PHILIPPINES_PROVINCES_META.PH11;
    } else if (nrmRaw.includes('cebu') || rawId === 'PH07') {
      meta = PHILIPPINES_PROVINCES_META.PH07;
    } else if (nrmRaw.includes('clark') || nrmRaw.includes('subic') || nrmRaw.includes('bataan') || nrmRaw.includes('pampanga') || rawId === 'PH03') {
      meta = PHILIPPINES_PROVINCES_META.PH03;
    } else if (nrmRaw.includes('cavite') || nrmRaw.includes('corregidor') || nrmRaw.includes('batangas') || rawId === 'PH40') {
      meta = PHILIPPINES_PROVINCES_META.PH40;
    } else if (nrmRaw.includes('palawan') || nrmRaw.includes('mindoro') || rawId === 'PH41') {
      meta = PHILIPPINES_PROVINCES_META.PH41;
    } else if (nrmRaw.includes('sulu') || nrmRaw.includes('armm') || nrmRaw.includes('bangsamoro') || rawId === 'PH14') {
      meta = PHILIPPINES_PROVINCES_META.PH14;
    }
  }

  // 4. Risoluzione con meta trovato
  if (meta) {
    const sov = meta.getSovereign ? (meta as any).getSovereign(s) : meta.sovereign;
    const fac = meta.getFaction ? meta.getFaction(s) : meta.faction;
    const histName = meta.getHistoricalName ? meta.getHistoricalName(s) : meta.historicalName;
    const admin = meta.getAdminTitle ? meta.getAdminTitle(s) : meta.adminTitle;
    const note = meta.getNote(s);

    return makeResult(sov, histName, note, fac, admin);
  }

  // 5. Fallback generico per territori delle Filippine
  const defaultHistName = 'Commonwealth of the Philippines';
  const defaultAdmin = 'Commonwealth of the Philippines — President Manuel L. Quezon / U.S. High Commissioner';
  const defaultNote = s >= 5
    ? "Stato autonomo associato agli Stati Uniti d'America; in stato di mobilitazione difensiva delle forze congiunte USAFFE a presidio dell'arcipelago contro la minaccia giapponese."
    : "Stato autonomo istituito nel 1935 sotto la sovranità degli Stati Uniti d'America con capitale a Manila; presieduto da Manuel L. Quezon in preparazione della piena indipendenza.";
  const defaultFaction: FactionType = 'Alleati';

  return makeResult('PHL', defaultHistName, defaultNote, defaultFaction, defaultAdmin);
}
