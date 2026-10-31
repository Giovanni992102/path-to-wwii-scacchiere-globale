/**
 * Dettaglio Geocartografico Storico delle 16 Province della Malesia + Singapore (1936-1941)
 *
 * Copertura integrale di tutti i 13 stati e 3 territori federali della Malesia + Colonia di Singapore:
 * - Sovranità: Impero Britannico (British Empire / Crown Colonies & Protectorates)
 * - Fazione: Neutrale (Step 0-4, 1936 - apr 1939) -> Alleati (Step 5-8, set 1939 - 1941)
 * - Struttura Amministrativa Storica:
 *   - Straits Settlements (Colonia della Corona): Singapore, Penang (Pulau Pinang), Malacca (Melaka), Labuan
 *   - Federated Malay States (FMS): Perak, Selangor, Negeri Sembilan, Pahang (Sede Federale: Kuala Lumpur)
 *   - Unfederated Malay States (UMS): Johor, Kedah, Kelantan, Perlis, Terengganu
 *   - British North Borneo (Protettorato Chartered Company): Sabah
 *   - Kingdom of Sarawak (Stato Protetto retto dal Rajah Bianco Brooke): Sarawak
 *
 * Dinamica Temporale (Step 0-8):
 * - Step 0-1 (1936 - mar 1938: Anteguerra & Strategia di Singapore):
 *   Costruzione della colossale Base Navale di Sembawang a Singapore (bacino di carenaggio King George VI);
 *   monopolio globale della produzione di gomma naturale (hevea) e stagno (Valle di Kinta e Sungei Lembing).
 * - Step 2-4 (ott 1938 - apr 1939: Guerra Sino-Giapponese & Allerta Nanyang):
 *   Mobilitazione della diaspora cinese guidata da Tan Kah Kee (Nanyang China Relief Fund);
 *   inaugurazione solenne del dock navale a Singapore; allestimento basi aeree RAF (Kota Bharu, Alor Setar, Kuantan).
 * - Step 5-7 (set 1939 - ott 1940: Scoppio della WWII in Europa, Caduta della Francia & Operazione Matador):
 *   Dichiarazione di guerra della Gran Bretagna (settembre 1939, fazione Alleati); esportazioni record verso gli USA;
 *   minaccia dall'Indocina dopo la caduta di Parigi; istituzione del British Far East Command sotto Brooke-Popham;
 *   pianificazione dell'Operazione Matador e Linea fortificata di Jitra; batterie costiere da 15 pollici a Singapore.
 * - Step 8 (apr 1941: Patto di Neutralità Sovietico-Giapponese, Embargo e Forza Z):
 *   Il Patto di Neutralità di Mosca (13 aprile 1941) libera le forze nipponiche per la spinta verso sud (Nanshin-ron);
 *   embargo petrolifero anglo-americano; schieramento dell'8ª Divisione australiana a Johor e della Brigata Kelantan;
 *   decisione di inviare la Forza Z (corazzata HMS Prince of Wales e incrociatore Repulse) per blindare Singapore.
 */

import { ResolvedTerritory, FactionType } from '../types';
import { makeResult } from './georesolver';

export interface MalaysiaProvinceInfo {
  id: string;
  origId?: string;
  cntrCode: string; // 'MY' | 'SG'
  cntrName: string; // 'Malesia' | 'Singapore'
  name: string;
  nutsName: string;
  nameLatn: string;
  nameEngl: string;
  modernName: string;
  historicalName: string;
  adminTitle: string;
  sovereign: string; // 'UK'
  overlord?: string; // 'British Empire'
  faction: FactionType; // 'Neutrale' (s < 5) -> 'Alleati' (s >= 5)
  s0_1: string;
  s2_4: string;
  s5_7: string;
  s8: string;
  getNote: (step: number) => string;
  getHistoricalName?: (step: number) => string;
  getAdminTitle?: (step: number) => string;
  getSovereign?: (step: number) => string;
  getFaction: (step: number) => FactionType;
}

export const MALAYSIA_PROVINCES_META: Record<string, MalaysiaProvinceInfo> = {  "MY01": {
    id: "MY01",
    cntrCode: 'MY',
    cntrName: 'Malesia',
    name: "Johor",
    nutsName: "Johor (Johor Bahru)",
    nameLatn: "Johor",
    nameEngl: "Johor State",
    modernName: "Stato di Johor (Malesia)",
    historicalName: "British Malaya \u2014 Sultanato di Johor (Ibrahim di Johor)",
    adminTitle: "British Malaya (Unfederated Malay States) \u2014 Sultanato di Johor",
    sovereign: "UK",
    overlord: "British Empire",
    faction: "Neutrale",
    s0_1: "Capoluogo a Johor Bahru sotto il sultano Sir Ibrahim; collegato a Singapore dalla ferrovia sul terrapieno di Johor (*Causeway*); centro vitale per vaste piantagioni di gomma naturale (*hevea*) e palma da olio.",
    s2_4: "La numerosa comunit\u00e0 cinese locale aderisce con vigore al boicottaggio antingiapponese promosso dal fondo di soccorso Nanyang; rafforzamento della sorveglianza militare alle testate del terrapieno di Singapore.",
    s5_7: "Con lo scoppio delle ostilit\u00e0 in Europa, le esportazioni di caucci\u00f9 e lattice verso gli Stati Uniti raggiungono volumi record per accumulare valuta pregiata a sostegno dello sforzo bellico imperiale.",
    s8: "L'8\u00aa Divisione dell'esercito australiano (*AIF*) del generale Gordon Bennett assume la difesa avanzata dello stato, fortificando le posizioni costiere di Mersing e le vie d'accesso fluviali a Muar e Batu Pahat.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: function(s: number): FactionType {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    }
  },
  "MY02": {
    id: "MY02",
    cntrCode: 'MY',
    cntrName: 'Malesia',
    name: "Kedah",
    nutsName: "Kedah (Alor Setar & Linea Jitra)",
    nameLatn: "Kedah",
    nameEngl: "Kedah State",
    modernName: "Stato di Kedah (Isole Langkawi e Alor Setar, Malesia)",
    historicalName: "British Malaya \u2014 Sultanato di Kedah (Alor Setar & Linea Jitra)",
    adminTitle: "British Malaya (Unfederated Malay States) \u2014 Sultanato di Kedah",
    sovereign: "UK",
    overlord: "British Empire",
    faction: "Neutrale",
    s0_1: "Antico sultanato affacciato sullo Stretto di Malacca con capitale ad Alor Setar, granaio di riso della penisola malese; include l'arcipelago insulare delle **Isole Langkawi** al confine marittimo con il Regno di Siam.",
    s2_4: "Costruzione e ampliamento della base aerea avanzata della Royal Air Force a Kepala Batas (Alor Setar) per il monitoraggio aeronavale degli accessi settentrionali allo Stretto di Malacca.",
    s5_7: "Inizio dei lavori campali della munita **Linea di Jitra**, sistema fortificato difensivo destinato a sbarrare la strada maestra e la ferrovia da Singora contro possibili penetrazioni provenienti dal territorio siamese.",
    s8: "L'11\u00aa Divisione fanteria indiana presidia la Linea Jitra in stato di massima allerta; le truppe britanniche tengono pronti i piani per un'incursione preventiva oltre il confine thailandese (*Operazione Matador*).",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: function(s: number): FactionType {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    }
  },
  "MY03": {
    id: "MY03",
    cntrCode: 'MY',
    cntrName: 'Malesia',
    name: "Kelantan",
    nutsName: "Kelantan (Kota Bharu)",
    nameLatn: "Kelantan",
    nameEngl: "Kelantan State",
    modernName: "Stato di Kelantan (Kota Bharu, Malesia)",
    historicalName: "British Malaya \u2014 Sultanato di Kelantan (Base RAF di Kota Bharu)",
    adminTitle: "British Malaya (Unfederated Malay States) \u2014 Sultanato di Kelantan",
    sovereign: "UK",
    overlord: "British Empire",
    faction: "Neutrale",
    s0_1: "Sultanato della costa nord-orientale affacciato sul Mar Cinese Meridionale, con capitale Kota Bharu; territorio a vocazione peschereccia e agricola ceduto dal Siam alla Corona britannica col Trattato di Bangkok del 1909.",
    s2_4: "La RAF insedia a Pengkalan Chepa (Kota Bharu) un aeroporto strategico equipaggiato con idrovolanti e bombardieri da ricognizione marittima per la sorveglianza del Golfo del Siam.",
    s5_7: "Allestimento di bunker in cemento armato (*pillboxes*), reticolati di filo spinato e ostacoli subacquei lungo le piatte spiagge di Badang e Sabak per fronteggiare minacce di sbarco anfibio.",
    s8: "La 8\u00aa Brigata di fanteria indiana (Brigata Kelantan del generale Key) \u00e8 schierata a presidio diretto della costa e degli aeroporti periferici di Gong Kedak e Machang in allerta per incursioni nipponiche.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: function(s: number): FactionType {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    }
  },
  "MY04": {
    id: "MY04",
    cntrCode: 'MY',
    cntrName: 'Malesia',
    name: "Melaka",
    nutsName: "Melaka (Malacca)",
    nameLatn: "Melaka",
    nameEngl: "Malacca (Melaka)",
    modernName: "Stato di Malacca (Melaka, Malesia)",
    historicalName: "Straits Settlements \u2014 Malacca (Melaka)",
    adminTitle: "British Empire \u2014 Straits Settlements (Crown Colony of Malacca)",
    sovereign: "UK",
    overlord: "British Empire",
    faction: "Neutrale",
    s0_1: "Celeberrimo emporio storico sullo Stretto di Malacca, governato come parte della Colonia della Corona degli Stabilimenti dello Stretto (*Straits Settlements*) sotto l'autorit\u00e0 del Governatore a Singapore; sede del Residente Consigliere.",
    s2_4: "La ricca e colta comunit\u00e0 mercantile dei cinesi dello Stretto (*Baba-Nyonya*) si mobilita raccogliendo imponenti sottoscrizioni finanziarie a supporto dei comitati di soccorso patriottici in Cina.",
    s5_7: "Mobilitazione delle compagnie territoriali della *Malacca Volunteer Force*; pattugliamento delle acque costiere dello stretto contro la minaccia di sommergibili corsari dell'Asse.",
    s8: "Nodo logistico marittimo di riserva lungo la rotta tra Singapore e Selangor; presidio di batterie costiere leggere e magazzini d'ammasso di viveri e carburante a salvaguardia delle retrovie.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: function(s: number): FactionType {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    }
  },
  "MY05": {
    id: "MY05",
    cntrCode: 'MY',
    cntrName: 'Malesia',
    name: "Negeri Sembilan",
    nutsName: "Negeri Sembilan (Seremban e Port Dickson)",
    nameLatn: "Negeri Sembilan",
    nameEngl: "Negeri Sembilan State",
    modernName: "Stato di Negeri Sembilan (Malesia)",
    historicalName: "Federated Malay States \u2014 Negeri Sembilan (Port Dickson)",
    adminTitle: "British Malaya \u2014 Federated Malay States (Negeri Sembilan)",
    sovereign: "UK",
    overlord: "British Empire",
    faction: "Neutrale",
    s0_1: "Confederazione di principati malesi con capoluogo a Seremban; comprende il porto costiero di Port Dickson sullo Stretto di Malacca; estese piantagioni di hevea e fonderie di stagno.",
    s2_4: "Espansione della base militare e della caserma centrale del Reggimento Malese a Port Dickson, culla dell'addestramento dei primi battaglioni di truppe regolari malesi d'\u00e9lite della Corona.",
    s5_7: "Il 1\u00b0 e 2\u00b0 Battaglione del Reggimento Malese (*Rejimen Askar Melayu*) intensificano le manovre campali d'interdizione nella giungla per la difesa costiera della penisola.",
    s8: "Presidio nevralgico della costa centro-occidentale; il porto di Port Dickson funge da scalo marittimo alternativo per il rifornimento delle divisioni alleate impegnate nel settore centrale.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: function(s: number): FactionType {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    }
  },
  "MY06": {
    id: "MY06",
    cntrCode: 'MY',
    cntrName: 'Malesia',
    name: "Pahang",
    nutsName: "Pahang (Kuantan & Cameron Highlands)",
    nameLatn: "Pahang",
    nameEngl: "Pahang State",
    modernName: "Stato di Pahang (Kuantan e Cameron Highlands, Malesia)",
    historicalName: "Federated Malay States \u2014 Sultanato di Pahang (Miniere di Sungei Lembing)",
    adminTitle: "British Malaya \u2014 Federated Malay States (Sultanato di Pahang)",
    sovereign: "UK",
    overlord: "British Empire",
    faction: "Neutrale",
    s0_1: "Il pi\u00f9 esteso stato della penisola, coperto da fitte giungle montuose; ospita a Sungei Lembing le pi\u00f9 grandi e profonde miniere sotterranee di stagno del mondo (*Pahang Consolidated Company*).",
    s2_4: "Sviluppo delle stazioni climatiche delle Cameron Highlands e allestimento della base aerea avanzata della Royal Air Force a Kuantan, scalo primario della costa orientale.",
    s5_7: "Le miniere di Sungei Lembing lavorano a ritmo forzato per rifornire di stagno le fonderie e le industrie belliche della Gran Bretagna; fortificazione della rada marittima di Kuantan.",
    s8: "La 22\u00aa Brigata di fanteria indiana viene dislocata a difesa del settore litoraneo di Kuantan, punto critico dove le ampie spiagge orientali offrono un comodo approdo anfibio verso il cuore della Malaya.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: function(s: number): FactionType {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    }
  },
  "MY07": {
    id: "MY07",
    cntrCode: 'MY',
    cntrName: 'Malesia',
    name: "Pulau Pinang",
    nutsName: "Pulau Pinang (George Town & Fort Cornwallis)",
    nameLatn: "Pulau Pinang",
    nameEngl: "Penang (Prince of Wales Island)",
    modernName: "Stato di Penang (Pulau Pinang e George Town, Malesia)",
    historicalName: "Straits Settlements \u2014 Penang (Prince of Wales Island & Fort Cornwallis)",
    adminTitle: "British Empire \u2014 Straits Settlements (Crown Colony of Penang & Province Wellesley)",
    sovereign: "UK",
    overlord: "British Empire",
    faction: "Neutrale",
    s0_1: "Isola di Penang e distretto continentale di Province Wellesley; porto franco internazionale di George Town e fortezza di Fort Cornwallis a guardia dell'accesso settentrionale allo Stretto di Malacca.",
    s2_4: "Potenziamento dell'aeroporto civile e militare di Bayan Lepas e delle installazioni navali ausiliarie; terminale primario per l'imbarco oltremare dello stagno raffinato nella valle di Kinta.",
    s5_7: "Installazione di batterie costiere pesanti da 6 pollici a Batu Maung; i volontari territoriali della *Penang Volunteer Force* pattugliano giorno e notte il canale marittimo.",
    s8: "Base di scalo per i convogli navali della Royal Navy e stazione d'idrovolanti da ricognizione; nodo telegrafico e radio primario per i collegamenti marittimi con Ceylon e l'India britannica.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: function(s: number): FactionType {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    }
  },
  "MY08": {
    id: "MY08",
    cntrCode: 'MY',
    cntrName: 'Malesia',
    name: "Perak",
    nutsName: "Perak (Valle di Kinta & Ipoh)",
    nameLatn: "Perak",
    nameEngl: "Perak State",
    modernName: "Stato di Perak (Ipoh, Taiping e Valle di Kinta, Malesia)",
    historicalName: "Federated Malay States \u2014 Sultanato di Perak (Bacino Minerario di Kinta)",
    adminTitle: "British Malaya \u2014 Federated Malay States (Sultanato di Perak)",
    sovereign: "UK",
    overlord: "British Empire",
    faction: "Neutrale",
    s0_1: "Cuore pulsante dell'industria mineraria mondiale nella celebre Valle di Kinta con epicentro a Ipoh; capitale reale a Kuala Kangsar; porto commerciale fluviale a Teluk Anson (Teluk Intan).",
    s2_4: "Le gigantesche draghe elettriche a tazze della Kinta producono oltre un terzo dello stagno mondiale, alimentando i commerci con il Regno Unito e gli Stati Uniti.",
    s5_7: "Lo stagno di Perak \u00e8 classificato risorsa strategica vitale; le autorit\u00e0 militari britanniche predispongono piani segreti di terra bruciata (*scorched earth*) per sabotare le draghe in caso d'invasione.",
    s8: "Schieramento della 12\u00aa Brigata di fanteria indiana lungo l'asse ferroviario Taiping-Ipoh e presidio delle gole fluviali del fiume Perak per sbarrare la discesa delle forze nemiche verso Selangor.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: function(s: number): FactionType {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    }
  },
  "MY09": {
    id: "MY09",
    cntrCode: 'MY',
    cntrName: 'Malesia',
    name: "Perlis",
    nutsName: "Perlis (Kangar & Padang Besar)",
    nameLatn: "Perlis",
    nameEngl: "Perlis State",
    modernName: "Stato di Perlis (Kangar, Malesia)",
    historicalName: "British Malaya \u2014 Regno di Perlis (Raja di Kangar)",
    adminTitle: "British Malaya (Unfederated Malay States) \u2014 Regno di Perlis (Raja)",
    sovereign: "UK",
    overlord: "British Empire",
    faction: "Neutrale",
    s0_1: "Il pi\u00f9 piccolo stato della penisola, incastonato tra il mare delle Andamane e i rilievi calcarei di Nakawan al confine con il Siam; governato dalla dinastia Raja Jamalullail con il consigliere britannico a Kangar.",
    s2_4: "Nodo ferroviario internazionale di frontiera a **Padang Besar**, stazione di congiunzione tra le Ferrovie Statali della Malesia Federata (*FMSR*) e le Ferrovie Reali Siamesi per Bangkok.",
    s5_7: "Rafforzamento della sorveglianza d'intelligence e doganale alla dogana di Padang Besar per controllare il transito di merci e consiglieri militari giapponesi attivi in Thailandia.",
    s8: "Avamposto di frontiera avanzatissimo; la dogana e i ponti ferroviari di Padang Besar sono minati dai genieri britannici pronti a far brillare i binari al primo segnale d'invasione nemica.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: function(s: number): FactionType {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    }
  },
  "MY10": {
    id: "MY10",
    cntrCode: 'MY',
    cntrName: 'Malesia',
    name: "Selangor",
    nutsName: "Selangor (Port Swettenham & Klang)",
    nameLatn: "Selangor",
    nameEngl: "Selangor State",
    modernName: "Stato di Selangor (Klang e Port Swettenham, Malesia)",
    historicalName: "Federated Malay States \u2014 Sultanato di Selangor (Port Swettenham)",
    adminTitle: "British Malaya \u2014 Federated Malay States (Sultanato di Selangor)",
    sovereign: "UK",
    overlord: "British Empire",
    faction: "Neutrale",
    s0_1: "Stato costiero affacciato sullo Stretto di Malacca con capitale reale a Klang; ospita il grande scalo commerciale e porto oceanico di Port Swettenham (Klang), sbocco marittimo naturale di Kuala Lumpur.",
    s2_4: "Espansione dei bacini portuali di carico a Port Swettenham per garantire l'imbarco continuo di migliaia di tonnellate di balle di caucci\u00f9 e lingotti di stagno verso i mercati occidentali.",
    s5_7: "Conversione delle officine metallurgiche alla manutenzione di autocarri e blindati militari; mobilitazione del *Selangor Battalion* della milizia territoriale volontaria.",
    s8: "Arteria logistica primaria tra il mare e la capitale federale; installazione di postazioni contraeree pesanti e batterie litoranee a presidio degli accessi navali di Port Swettenham.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: function(s: number): FactionType {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    }
  },
  "MY11": {
    id: "MY11",
    cntrCode: 'MY',
    cntrName: 'Malesia',
    name: "Terengganu",
    nutsName: "Terengganu (Miniere di Ferro di Bukit Besi)",
    nameLatn: "Terengganu",
    nameEngl: "Terengganu State",
    modernName: "Stato di Terengganu (Kuala Terengganu, Malesia)",
    historicalName: "British Malaya \u2014 Sultanato di Terengganu (Miniere di Ferro di Bukit Besi)",
    adminTitle: "British Malaya (Unfederated Malay States) \u2014 Sultanato di Terengganu",
    sovereign: "UK",
    overlord: "British Empire",
    faction: "Neutrale",
    s0_1: "Sultanato della costa orientale affacciato sul Mar Cinese Meridionale retto dal sultano Sulaiman Badrul Alam Shah; comprende a **Bukit Besi** (Dungun) le pi\u00f9 ricche miniere di ferro a cielo aperto della regione.",
    s2_4: "La concessione mineraria di Bukit Besi, gestita dalla compagnia mineraria nipponica *Nippon Mining Co.*, esporta centinaia di migliaia di tonnellate di minerale ferroso direttamente negli altiforni in Giappone.",
    s5_7: "Con lo scoppio della guerra in Europa, il comando britannico sottopone a ferreo controllo le attivit\u00e0 della compagnia giapponese a Dungun e il cabotaggio delle navi da carico nipponiche.",
    s8: "Applicazione del blocco totale ed embargo economico verso il Giappone; sequestro delle concessioni minerarie di Bukit Besi e presidio delle coste da parte della *Terengganu Volunteer Force*.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: function(s: number): FactionType {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    }
  },
  "MY12": {
    id: "MY12",
    cntrCode: 'MY',
    cntrName: 'Malesia',
    name: "Sabah",
    nutsName: "Sabah (North Borneo \u2014 Sandakan & Jesselton)",
    nameLatn: "Sabah (North Borneo)",
    nameEngl: "North Borneo (Sabah)",
    modernName: "Stato di Sabah (Borneo Settentrionale, Malesia)",
    historicalName: "British North Borneo (North Borneo Chartered Company \u2014 Sandakan & Jesselton)",
    adminTitle: "British Empire \u2014 British North Borneo Chartered Company (Protettorato Britannico)",
    sovereign: "UK",
    overlord: "British Empire",
    faction: "Neutrale",
    s0_1: "Territorio settentrionale dell'isola di Borneo, amministrato in virt\u00f9 di patente reale dalla *British North Borneo Chartered Company* sotto il governatore Charles Smith con capitale a Sandakan e porto a Jesselton (Kota Kinabalu).",
    s2_4: "Fiorenti esportazioni di legname pregiato, caucci\u00f9, tabacco e resine; voli di ricognizione aeronavale britannici lungo lo Stretto di Balabac e il Mar di Sulu a presidio delle rotte verso Hong Kong.",
    s5_7: "Arruolamento e potenziamento della *North Borneo Armed Constabulary*; installazione della stazione radio costiera a Sandakan per monitorare il traffico marittimo verso le Filippine.",
    s8: "Avamposto coloniale isolato nel Pacifico sud-occidentale; le difese del territorio constano unicamente di 650 guardie armate della Constabulary di fronte all'imminente avanzata anfibia giapponese.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: function(s: number): FactionType {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    }
  },
  "MY13": {
    id: "MY13",
    cntrCode: 'MY',
    cntrName: 'Malesia',
    name: "Sarawak",
    nutsName: "Sarawak (Regno Brooke & Pozzi di Miri)",
    nameLatn: "Sarawak",
    nameEngl: "Kingdom of Sarawak",
    modernName: "Stato di Sarawak (Borneo, Malesia)",
    historicalName: "Kingdom of Sarawak (Regno di Sarawak \u2014 Rajah Sir Charles Vyner Brooke)",
    adminTitle: "British Empire \u2014 Kingdom of Sarawak (British Protected State \u2014 Rajah Brooke)",
    sovereign: "UK",
    overlord: "British Empire",
    faction: "Neutrale",
    s0_1: "Stato sovrano sotto protettorato britannico retto dal Terzo 'Rajah Bianco', Sir Charles Vyner Brooke, con capitale Kuching; comprende a **Miri** uno dei pi\u00f9 ricchi e strategici giacimenti petroliferi dell'Impero Britannico (*Sarawak Oilfields / Shell*).",
    s2_4: "La moderna raffineria costiera di Lutong a Miri produce nafta e benzina per aviazione ad alto numero di ottano, rifornendo regolarmente le navi da guerra della Royal Navy a Singapore.",
    s5_7: "Centenario della fondazione del regno della dinastia Brooke (1841-1941); il Rajah promulga la Costituzione; la difesa militare \u00e8 assunta dal 2\u00b0 Battaglione del 15\u00b0 Reggimento Punjab (*Sarfor*).",
    s8: "Obiettivo petrolifero n. 1 della pianificazione bellica nipponica nel Borneo; la guarnigione britannica e i tecnici petroliferi predispongono la distruzione totale dei pozzi e degli impianti di raffinazione di Miri (*Operazione di diniego*).",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: function(s: number): FactionType {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    }
  },
  "MY14": {
    id: "MY14",
    cntrCode: 'MY',
    cntrName: 'Malesia',
    name: "Kuala Lumpur",
    nutsName: "Kuala Lumpur (Sede Federale)",
    nameLatn: "Kuala Lumpur",
    nameEngl: "Federal Territory of Kuala Lumpur",
    modernName: "Territorio Federale di Kuala Lumpur (Capitale della Malesia)",
    historicalName: "Federated Malay States \u2014 Kuala Lumpur (Sede Federale & Sultan Abdul Samad Building)",
    adminTitle: "British Malaya \u2014 Federated Malay States (Federal Capital Kuala Lumpur)",
    sovereign: "UK",
    overlord: "British Empire",
    faction: "Neutrale",
    s0_1: "Capitale amministrativa federale degli Stati Malesi Federati (*FMS*); sede del monumentale Sultan Abdul Samad Building, del Segretariato Federale e dello snodo delle ferrovie della penisola.",
    s2_4: "Centro nevralgico della finanza, del commercio e del comitato centrale delle piantagioni di gomma; il celebre magnate Tan Kah Kee vi tiene conferenze e comizi per la raccolta fondi patriottica Nanyang.",
    s5_7: "Sede dell'amministrazione civile imperiale in assetto di guerra; allestimento di posti comando antiaerei, depositi logistici e coordinamento della mobilitazione sanitaria della Croce Rossa.",
    s8: "Centro nevralgico della rete stradale e ferroviaria della penisola malese; fulcro dei convogli di rifornimento e munizionamento britannici e indiani diretti ai settori operativi di frontiera.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: function(s: number): FactionType {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    }
  },
  "MY15": {
    id: "MY15",
    cntrCode: 'MY',
    cntrName: 'Malesia',
    name: "Labuan",
    nutsName: "Labuan (Porto di Victoria)",
    nameLatn: "Labuan",
    nameEngl: "Labuan Island",
    modernName: "Territorio Federale di Labuan (Malesia)",
    historicalName: "Straits Settlements \u2014 Isola di Labuan (Porto Franco di Victoria)",
    adminTitle: "British Empire \u2014 Straits Settlements (Crown Colony of Labuan)",
    sovereign: "UK",
    overlord: "British Empire",
    faction: "Neutrale",
    s0_1: "Isola strategicamente situata nella baia del Brunei al largo delle coste del Borneo, governata come Colonia della Corona parte degli Stabilimenti dello Stretto con l'eccellente porto naturale di Victoria.",
    s2_4: "Porto franco esente da dazi marittimi, stazione di rifornimento di carbone per i piroscafi oceanici e punto d'appoggio per le cannoniere britanniche in pattugliamento nel Mare della Sonda.",
    s5_7: "Installazione di una stazione di vedetta costiera della Royal Navy e presidio del nodo dei cavi sottomarini telegrafici che uniscono Singapore a Labuan e Hong Kong.",
    s8: "Ancoraggio marittimo strategico in acque profonde a guardia delle rotte tra il Borneo e le Filippine; presidiato da un distaccamento armato della polizia coloniale in stato d'allarme.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: function(s: number): FactionType {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    }
  },
  "MY16": {
    id: "MY16",
    cntrCode: 'MY',
    cntrName: 'Malesia',
    name: "Putrajaya",
    nutsName: "Putrajaya (Tenute di Prang Besar)",
    nameLatn: "Putrajaya",
    nameEngl: "Federal Territory of Putrajaya",
    modernName: "Territorio Federale di Putrajaya (Malesia)",
    historicalName: "Federated Malay States \u2014 Selangor (Distretto Agricolo di Prang Besar)",
    adminTitle: "British Malaya \u2014 Federated Malay States (Selangor / Tenute di Prang Besar)",
    sovereign: "UK",
    overlord: "British Empire",
    faction: "Neutrale",
    s0_1: "Fascia agricola delle vaste piantagioni di caucci\u00f9 di Prang Besar (*Prang Besar Estate*), creata da ufficiali britannici della Grande Guerra per la selezione scientifica dell'albero della gomma.",
    s2_4: "I vivai botanici e gli alberi innestati ad alta produttivit\u00e0 di Prang Besar riforniscono di piantine selezionate le tenute di gomma dell'intero impero coloniale britannico.",
    s5_7: "Produzione intensiva di lattice centrifugato e gomma affumicata per le forniture belliche urgenti destinate all'industria automobilistica e aeronautica alleata.",
    s8: "Distretto agrario strategico dell'entroterra di Selangor, inserito nei piani logistici di riserva lungo la linea di ripiegamento dell'esercito britannico verso sud.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: function(s: number): FactionType {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    }
  },
  "SG01": {
    id: "SG01",
    cntrCode: 'SG',
    cntrName: 'Singapore',
    name: "Singapore",
    nutsName: "Singapore (Fortezza & Base Navale di Sembawang)",
    nameLatn: "Singapore",
    nameEngl: "Crown Colony of Singapore",
    modernName: "Repubblica di Singapore (Citt\u00e0-Stato)",
    historicalName: "Straits Settlements \u2014 Singapore (Fortezza & Base Navale di Sembawang)",
    adminTitle: "British Empire \u2014 Straits Settlements (Capitale Coloniale e Base Navale di Sembawang)",
    sovereign: "UK",
    overlord: "British Empire",
    faction: "Neutrale",
    s0_1: "Capitale degli Stabilimenti dello Stretto e residenza del Governatore Sir Shenton Thomas; sede della colossale Base Navale di Sembawang, fulcro della 'Strategia di Singapore' per la difesa dell'Oriente imperiale.",
    s2_4: "Il 14 febbraio 1938 viene inaugurato solennemente il bacino galleggiante *King George VI Graving Dock*; la comunit\u00e0 cinese Nanyang raccoglie milioni di dollari per la resistenza in Cina.",
    s5_7: "Con lo scoppio della guerra in Europa, Singapore diviene la sede del British Far East Command sotto l'ammiraglio Brooke-Popham; installazione delle formidabili batterie di cannoni pesanti da 15 pollici a Johore e Buona Vista.",
    s8: "La 'Gibilterra d'Oriente' si prepara alla prova suprema; arrivo delle prime truppe australiane dell'AIF e dislocazione della difesa costiera; a Londra Churchill ordina l'invio della Forza Z (*HMS Prince of Wales* e *HMS Repulse*) per blindare Singapore.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: function(s: number): FactionType {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    }
  },
};

/**
 * Mappatura rapida di alias regionali, nomi comuni e codici ISO
 */
// Override Step 9 (DIC 1941): Invasione giapponese della Malesia britannica e del Borneo (sbarco a Kota Bharu l'8 dicembre, caduta di Penang il 19 dicembre, di Ipoh/Perak il 28 dicembre e di Kuching/Sarawak il 24 dicembre)
const MALAYSIA_JAP_OCCUPIED_DEC1941 = new Set([
  'MY03', // Kelantan (Kota Bharu - sbarco 8 dicembre 1941)
  'MY11', // Terengganu
  'MY09', // Perlis
  'MY02', // Kedah (sfondamento della Linea Jitra 11-12 dicembre 1941)
  'MY07', // Penang (caduta il 19 dicembre 1941)
  'MY08', // Perak (caduta di Ipoh 26-28 dicembre 1941, battaglia di Kampar)
  'MY13', // Sarawak (sbarco a Miri il 16 dicembre, caduta di Kuching il 24 dicembre 1941)
  'MY12', // Sabah / North Borneo
  'MY15', // Labuan
]);

const MALAYSIA_DEC1941_NOTES: Record<string, string> = {
  MY03: "Kelantan (Kota Bharu) · Alle 00:25 dell'8 dicembre 1941 (oltre un'ora prima dell'attacco a Pearl Harbor), il Distaccamento Takumi della 18ª Divisione giapponese (25ª Armata del Ten. Gen. Tomoyuki Yamashita) sbarca sulle spiagge di Sabak e Badang presso Kota Bharu. Dopo aspri combattimenti contro l'8ª Brigata indiana e gli attacchi dei bombardieri Hudson della RAAF, le forze giapponesi catturano gli aeroporti di Kota Bharu, Gong Kedah e Machang il 9 dicembre.",
  MY07: "Penang (George Town) · Sottoposta a devastanti bombardamenti aerei giapponesi dall'11 dicembre 1941 che incendiano George Town, l'isola fortificata di Penang viene evacuata segretamente dal comando britannico nella notte del 17 dicembre e occupata dalle truppe della 5ª Divisione della 25ª Armata giapponese il 19 dicembre 1941, fornendo a Yamashita decine di imbarcazioni costiere intatte per aggirare il fronte.",
  MY02: "Kedah (Jitra e Alor Setar) · Tra l'11 e il 12 dicembre 1941 le colonne corazzate giapponesi (Distaccamento Saeki della 5ª Divisione) travolgono sotto la pioggia battente la Linea Jitra difesa dall'11ª Divisione di Fanteria Indiana, conquistando Alor Setar e gli aeroporti settentrionali.",
  MY09: "Perlis (Kangar) · Invade l'8-10 dicembre 1941 dalle colonne meccanizzate della 5ª Divisione giapponese provenienti da Singora e Patani in Thailandia, aprendo la direttrice d'attacco occidentale verso Kedah.",
  MY11: "Terengganu (Kuala Terengganu) · Occupato a metà dicembre 1941 dalle colonne costiere del Distaccamento Takumi avanzanti da Kota Bharu lungo il litorale del Mar Cinese Meridionale verso Kuantan.",
  MY08: "Perak (Ipoh, Kuala Kangsar e Kampar) · Superato il fiume Perak a Kuala Kangsar (22-24 dicembre), le divisioni di Yamashita occupano Taiping e la capitale mineraria dello stagno Ipoh il 26-28 dicembre 1941; al 31 dicembre infuria la decisiva Battaglia di Kampar (30 dicembre 1941 – 2 gennaio 1942).",
  MY13: "Sarawak (Miri e Kuching) · Il 16 dicembre 1941 il Distaccamento Kawaguchi (35ª Brigata giapponese) sbarca ai campi petroliferi di Miri e Seria (demoliti dai genieri britannici) e il 24 dicembre conquista la capitale Kuching dopo la resistenza del 2/15th Punjab Regiment.",
  MY12: "North Borneo (Jesselton e Sandakan) · Incursioni aeronavali giapponesi e avvio dell'occupazione dei terminali petroliferi e gomma del Borneo settentrionale tra fine dicembre 1941 e inizio gennaio 1942.",
  MY15: "Labuan · Isola strategica all'ingresso della baia di Brunei, investita dall'offensiva anfibia del Distaccamento Kawaguchi nel Borneo britannico nel dicembre 1941.",
  MY06: "Pahang (Kuantan) · Il 10 dicembre 1941, al largo di Kuantan, gli aerosiluranti giapponesi G3M Nell e G4M Betty partiti dall'Indocina affondano la corazzata HMS Prince of Wales e l'incrociatore da battaglia HMS Repulse (Force Z dell'Amm. Tom Phillips), segnando la fine della supremazia navale britannica in Estremo Oriente; il 31 dicembre infuria la battaglia per l'aeroporto di Kuantan.",
  SG01: "Singapore (Fortezza Imperiale) · A partire dalle 04:15 dell'8 dicembre 1941 Singapore subisce i primi bombardamenti aerei notturni giapponesi; il 10 dicembre l'affondamento della HMS Prince of Wales e della HMS Repulse priva la base navale di copertura corazzata mentre le truppe del Ten. Gen. Arthur Percival combattono in ripiegamento lungo la penisola malese.",
};

for (const [k, meta] of Object.entries(MALAYSIA_PROVINCES_META)) {
  const origFac = meta.getFaction.bind(meta);
  const origNote = meta.getNote.bind(meta);
  const isJap = MALAYSIA_JAP_OCCUPIED_DEC1941.has(k) || MALAYSIA_JAP_OCCUPIED_DEC1941.has(meta.id);

  meta.getSovereign = (s: number) => {
    if (s >= 9) return isJap ? 'JAP' : 'UK';
    return meta.sovereign;
  };
  meta.getFaction = (s: number) => {
    if (s >= 9) return isJap ? 'Asse' : 'Alleati';
    return origFac(s);
  };
  meta.getHistoricalName = (s: number) => {
    if (s >= 9) {
      if (isJap) return `${meta.historicalName} (Occupazione Militare Giapponese — 25ª Armata, Dicembre 1941)`;
      return `${meta.historicalName} (Campagna di Malesia — Difesa del Malaya Command, Dicembre 1941)`;
    }
    return meta.historicalName;
  };
  meta.getAdminTitle = (s: number) => {
    if (s >= 9) {
      if (isJap) return `Impero Giapponese — Occupazione Militare della Malesia / Borneo (25ª Armata — Ten. Gen. Tomoyuki Yamashita)`;
      return `${meta.adminTitle} — Malaya Command (Ten. Gen. Arthur Percival, Singapore)`;
    }
    return meta.adminTitle;
  };
  meta.getNote = (s: number) => {
    if (s >= 9) {
      if (MALAYSIA_DEC1941_NOTES[meta.id]) return MALAYSIA_DEC1941_NOTES[meta.id];
      return `${origNote(8)} Nel dicembre 1941, dopo gli sbarchi giapponesi a Kota Bharu (8 dicembre) e la caduta di Penang e Ipoh, il territorio è in prima linea nella difesa britannica della Malesia meridionale a protezione di Kuala Lumpur e della piazzaforte di Singapore.`;
    }
    return origNote(s);
  };
}

export const MALAYSIA_ALIASES: Record<string, string> = {
  'MY-01': 'MY01',
  'MY-02': 'MY02',
  'MY-03': 'MY03',
  'MY-04': 'MY04',
  'MY-05': 'MY05',
  'MY-06': 'MY06',
  'MY-07': 'MY07',
  'MY-08': 'MY08',
  'MY-09': 'MY09',
  'MY-10': 'MY10',
  'MY-11': 'MY11',
  'MY-12': 'MY12',
  'MY-13': 'MY13',
  'MY-14': 'MY14',
  'MY-15': 'MY15',
  'MY-16': 'MY16',
  'MY_JOHOR': 'MY01',
  'MY_KEDAH': 'MY02',
  'MY_KELANTAN': 'MY03',
  'MY_MELAKA': 'MY04',
  'MY_MALACCA': 'MY04',
  'MY_NEGERI_SEMBILAN': 'MY05',
  'MY_PAHANG': 'MY06',
  'MY_PULAU_PINANG': 'MY07',
  'MY_PENANG': 'MY07',
  'MY_PERAK': 'MY08',
  'MY_PERLIS': 'MY09',
  'MY_SELANGOR': 'MY10',
  'MY_TERENGGANU': 'MY11',
  'MY_SABAH': 'MY12',
  'MY_SARAWAK': 'MY13',
  'MY_KUALA_LUMPUR': 'MY14',
  'MY_LABUAN': 'MY15',
  'MY_PUTRAJAYA': 'MY16',
  'SG': 'SG01',
  'SGP': 'SG01',
  'SG_SINGAPORE': 'SG01',
};

/**
 * Risolve lo statuto geopolitico e toponomastico di una provincia o territorio di Malesia e Singapore.
 */
export function resolveMalaysiaProvince(ft: any, s: number): ResolvedTerritory {
  const p = (ft && ft.properties) ? ft.properties : {};
  const fidClean = String(ft.id || p.id || p.NUTS_ID || '').trim();

  // 1. Match diretto per ID canonico in MALAYSIA_PROVINCES_META
  let meta = MALAYSIA_PROVINCES_META[fidClean];

  // 2. Risoluzione tramite alias
  if (!meta && MALAYSIA_ALIASES[fidClean]) {
    const targetId = MALAYSIA_ALIASES[fidClean];
    meta = MALAYSIA_PROVINCES_META[targetId];
  }

  // 3. Fallback per ricerca nome o proprietà
  if (!meta) {
    for (const key of Object.keys(MALAYSIA_PROVINCES_META)) {
      const m = MALAYSIA_PROVINCES_META[key];
      if (
        fidClean === m.id ||
        fidClean === m.origId ||
        p.id === m.id ||
        p.cartodb_id === m.id ||
        p.NUTS_ID === m.id ||
        p.name === m.name ||
        p.NAME === m.historicalName ||
        p.MODERN_NAME === m.modernName
      ) {
        meta = m;
        break;
      }
    }
  }

  // 4. Se trovata nel catalogo canonico, restituisci il risultato coerente
  if (meta) {
    const sov = meta.getSovereign ? meta.getSovereign(s) : meta.sovereign;
    const fac = meta.getFaction ? meta.getFaction(s) : meta.faction;
    const histName = meta.getHistoricalName ? meta.getHistoricalName(s) : meta.historicalName;
    const admin = meta.getAdminTitle ? meta.getAdminTitle(s) : meta.adminTitle;
    const note = meta.getNote(s);

    return makeResult(sov, histName, note, fac, admin);
  }

  // 5. Fallback generico per territori malesi o singaporeani non catalogati
  const rawName = String(p.HISTORICAL_NAME || p.NAME || p.name || 'British Malaya');
  const defaultAdmin = 'British Malaya (British Empire Overseas Territories)';
  const defaultNote = s >= 5
    ? "Colonia o protettorato della Corona Britannica in Malaya; in stato di guerra a fianco delle forze Alleate con mobilitazione strategica della produzione di gomma e stagno."
    : "Colonia o protettorato della Corona Britannica nell'Asia sud-orientale; fulcro commerciale imperiale per l'esportazione mondiale di caucciù e stagno.";
  const defaultFaction: FactionType = s >= 5 ? 'Alleati' : 'Neutrale';

  return makeResult(
    'UK',
    rawName,
    p.HISTORICAL_NOTE || defaultNote,
    defaultFaction,
    p.ADMIN || defaultAdmin
  );
}
