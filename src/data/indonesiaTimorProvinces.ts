/**
 * Dettaglio Geocartografico Storico delle 34 Province dell'Indonesia (Nederlands-Indië)
 * e di Timor-Leste (Timor Português) (1936-1941)
 *
 * Copertura integrale di tutte le 34 province dell'Indonesia + Timor Portoghese:
 * - Sovranità Indonesia: Paesi Bassi / Regno d'Olanda (HOL) — Nederlands-Indië
 * - Sovranità Timor Est: Portogallo (POR) — Império Colonial Português (Estado Novo)
 * - Fazione Indonesia: Neutrale (Step 0-5, 1936 - mag 1940) -> Alleati (Step 6-8, giu 1940 - 1941, invasione tedesca dei Paesi Bassi)
 * - Fazione Timor Est: Neutrale permanente (Step 0-8, neutralità formale dell'Estado Novo di Salazar)
 *
 * Struttura Amministrativa Storica d'Epoca:
 * 1. Provincies & Vorstenlanden di Giava:
 *    - West-Java (Batavia, Bandoeng, Buitenzorg, Bantam)
 *    - Midden-Java (Semarang, Pekalongan, Banyumas)
 *    - Oost-Java (Soerabaja, Malang, Madoera)
 *    - Vorstenlanden (Sultanaat Jogjakarta, Soenanaat Soerakarta)
 * 2. Gouvernementen & Residenties delle Isole Esterne (Buitengewesten):
 *    - Gouvernement Sumatra (Atjeh, Oostkust van Sumatra, Westkust, Djambi, Palembang, Benkoelen, Lampong, Riouw, Banka, Billiton)
 *    - Gouvernement Borneo (Westerafdeeling / Pontianak, Zuider- en Oosterafdeeling / Bandjermasin, Balikpapan, Tarakan)
 *    - Gouvernement Groote Oost (Celebes/Makassar, Menado/Minahasa, Molukken/Ambon, Nieuw-Guinea/Hollandia, Bali en Lombok, Timor en Onderhoorigheden)
 * 3. Colónia de Timor (Timor Português):
 *    - Sede a Díli, comprende la parte orientale di Timor, l'enclave di Oe-Cusse Ambeno e l'isola di Ataúro.
 */

import { ResolvedTerritory, FactionType } from '../types';
import { makeResult } from './georesolver';

export interface IndonesiaProvinceInfo {
  id: string;
  origId?: number | string;
  cntrCode: string; // 'ID'
  cntrName: string; // 'Indonesia'
  name: string;
  nutsName: string;
  nameLatn: string;
  nameEngl: string;
  modernName: string;
  historicalName: string;
  adminTitle: string;
  sovereign: string; // 'HOL'
  overlord?: string; // 'Koninkrijk der Nederlanden'
  capital: string;
  islandGroup: 'Java' | 'Sumatra' | 'Borneo' | 'Sulawesi' | 'Maluku' | 'Nusa Tenggara' | 'Papua';
  faction: FactionType; // 'Neutrale' (s < 6) -> 'Alleati' (s >= 6)
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

export interface TimorLesteInfo {
  id: string;
  origId?: number | string;
  cntrCode: string; // 'TL'
  cntrName: string; // 'Timor-Leste'
  name: string;
  nutsName: string;
  nameLatn: string;
  nameEngl: string;
  modernName: string;
  historicalName: string;
  adminTitle: string;
  sovereign: string; // 'POR'
  overlord?: string; // 'Império Colonial Português'
  capital: string;
  faction: FactionType; // Sempre 'Neutrale'
  s0_1: string;
  s2_4: string;
  s5_7: string;
  s8: string;
  getNote: (step: number) => string;
  getFaction: (step: number) => FactionType;
}

export const TIMOR_LESTE_META: TimorLesteInfo = {
  id: "TLS",
  origId: 1,
  cntrCode: 'TL',
  cntrName: 'Timor-Leste',
  name: "Timor-Leste",
  nutsName: "Timor Português (Díli / Baucau)",
  nameLatn: "Timor Portugues",
  nameEngl: "Portuguese Timor",
  modernName: "Repubblica Democratica di Timor Est (Timor-Leste)",
  historicalName: "Timor Português — Colónia de Timor (Díli / Oe-Cusse)",
  adminTitle: "Império Colonial Português (Estado Novo — Governo de Salazar) — Colónia de Timor",
  sovereign: "POR",
  overlord: "Império Colonial Português",
  capital: "Díli",
  faction: "Neutrale",
  s0_1: "Colonia portoghese retta dal Governatore Álvaro Fontoura da Díli; comprende la parte orientale dell'isola di Timor, l'enclave di Oe-Cusse e l'isola di Ataúro; floride esportazioni di pregiato caffè arabica e legno di sandalo.",
  s2_4: "Neutralità confermata dal governo di Salazar; creazione di stazioni radiotelegrafiche e allerta diplomatica per le pressioni commerciali della compagnia giapponese Nanyō Kōhatsu a Timor.",
  s5_7: "Mentre la guerra infuria in Europa, il nuovo Governatore Manuel de Carvalho ribadisce la stretta neutralità di Lisbona; preoccupazione crescente per le rotte aeree verso l'Australia settentrionale.",
  s8: "La compagnia giapponese Dai Nippon Airways ottiene concessioni per idrovolanti di linea Palau-Díli; allarme a Darwin e accordi segreti tra Batavia e Canberra per prevenire un colpo di mano nipponico.",
  getNote: function(s: number) {
    if (s <= 1) return this.s0_1;
    if (s <= 4) return this.s2_4;
    if (s <= 7) return this.s5_7;
    return this.s8;
  },
  getFaction: () => 'Neutrale'
};

export const INDONESIA_PROVINCES_META: Record<string, IndonesiaProvinceInfo> = {
  // 1. Aceh
  "IDAC": {
    id: "IDAC",
    origId: 29,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Aceh",
    nutsName: "Aceh (Kutaraja / Banda Aceh)",
    nameLatn: "Aceh",
    nameEngl: "Aceh",
    modernName: "Provincia di Aceh (Indonesia)",
    historicalName: "Nederlands-Indië — Residentie Atjeh en Onderhoorigheden (Koetaradja)",
    adminTitle: "Nederlands-Indië (Gouvernement Sumatra) — Residentie Atjeh en Onderhoorigheden",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Koetaradja (Banda Aceh)",
    islandGroup: 'Sumatra',
    faction: "Neutrale",
    s0_1: "Capoluogo a Koetaradja; territorio presidiato dai corpi scelti del KNIL (*Marechaussee*) a guardia dei passi montani; produzione di pepe, canna da zucchero e raffinerie settentrionali di Pangkalan Brandan.",
    s2_4: "Inclusione nel neo-istituito Gouvernement Sumatra con sede a Medan; intensificazione della vigilanza costiera sullo Stretto di Malacca.",
    s5_7: "All'invasione tedesca dei Paesi Bassi (maggio 1940) scatta lo stato d'assedio; internamento dei residenti tedeschi; produzione petrolifera vincolata allo sforzo bellico alleato.",
    s8: "Fortificazione dei campi d'aviazione di Lhoknga e Sabang sull'isola di Weh a guardia dell'accesso settentrionale allo Stretto di Malacca contro possibili incursioni nipponiche.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 2. Sumatera Utara
  "IDSU": {
    id: "IDSU",
    origId: 28,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Sumatera Utara",
    nutsName: "Sumatera Utara (Medan / Deli)",
    nameLatn: "Sumatera Utara",
    nameEngl: "North Sumatra",
    modernName: "Provincia di Sumatra Settentrionale (Indonesia)",
    historicalName: "Nederlands-Indië — Residentie Oostkust van Sumatra (Medan / Deli)",
    adminTitle: "Nederlands-Indië (Gouvernement Sumatra) — Residentie Oostkust van Sumatra",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Medan",
    islandGroup: 'Sumatra',
    faction: "Neutrale",
    s0_1: "Sede del Governatore di Sumatra a Medan e del Sultanato di Deli; celebre per il tabacco da fascia per sigari (*Deli Maatschappij*), immense piantagioni di caucciù e la ferrovia DSM.",
    s2_4: "Medan è il centro direzionale dell'agricoltura di piantagione imperiale olandese; colossali esportazioni di gomma naturale verso gli Stati Uniti per la gommatura industriale.",
    s5_7: "Con la caduta dei Paesi Bassi nel 1940, la produzione di gomma ed olio di palma viene posta sotto il controllo prioritario del Ministero dei Rifornimenti britannico e americano.",
    s8: "Rafforzamento delle difese territoriali del KNIL a Medan e Belawan e allerta della base idrovolanti sul lago Toba per contrastare manovre nemiche dalla Malesia.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 3. Sumatera Barat
  "IDSB": {
    id: "IDSB",
    origId: 27,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Sumatera Barat",
    nutsName: "Sumatera Barat (Padang / Bukittinggi)",
    nameLatn: "Sumatera Barat",
    nameEngl: "West Sumatra",
    modernName: "Provincia di Sumatra Occidentale (Indonesia)",
    historicalName: "Nederlands-Indië — Residentie Westkust van Sumatra (Padang / Fort de Kock)",
    adminTitle: "Nederlands-Indië (Gouvernement Sumatra) — Residentie Westkust van Sumatra",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Padang",
    islandGroup: 'Sumatra',
    faction: "Neutrale",
    s0_1: "Porto oceanico di Padang (Emmahaven) e terra del popolo Minangkabau; strategiche miniere di carbone statali di Ombilin a Sawahlunto collegate da ferrovie montane a cremagliera.",
    s2_4: "Forte produttività carbonifera per alimentare le ferrovie di Giava e le navi da guerra della Reale Marina Olandese; centro montano a Fort de Kock (Bukittinggi).",
    s5_7: "In guerra a fianco degli Alleati (giugno 1940); intensificazione dell'estrazione di carbone fossile a Sawahlunto per compensare i blocchi dei traffici atlantici.",
    s8: "Sorveglianza della costa occidentale affacciata sull'Oceano Indiano e protezione dei convogli navali tra Padang, Batavia e Colombo.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 4. Riau
  "IDRI": {
    id: "IDRI",
    origId: 19,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Riau",
    nutsName: "Riau (Pekanbaru / Siak)",
    nameLatn: "Riau",
    nameEngl: "Riau",
    modernName: "Provincia di Riau (Indonesia)",
    historicalName: "Nederlands-Indië — Siak Sri Indrapura & Midden-Sumatra (Pekanbaroe)",
    adminTitle: "Nederlands-Indië (Gouvernement Sumatra) — Sultanato di Siak Sri Indrapura",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Pekanbaroe / Siak",
    islandGroup: 'Sumatra',
    faction: "Neutrale",
    s0_1: "Vasto entroterra fluviale solcato dai fiumi Siak e Kampar retto dal Sultanato di Siak Sri Indrapura sotto protettorato olandese; estrazione di legname, sago e caucciù.",
    s2_4: "Prime prospezioni petrolifere pionieristiche nel bacino centrale di Minas ad opera della compagnia congiunta Caltex / NPPM.",
    s5_7: "Mobilitazione delle risorse forestali ed energetiche a supporto delle difese di Singapore e Batavia dopo la caduta di Rotterdam.",
    s8: "Rilevanza cruciale delle scoperte petrolifere di Minas e Duri, che spingono lo Stato Maggiore nipponico a pianificare sbarchi rapidi nello Stretto di Malacca.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 5. Kepulauan Riau
  "IDKR": {
    id: "IDKR",
    origId: 18,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Kepulauan Riau",
    nutsName: "Kepulauan Riau (Tanjung Pinang / Bintan / Natuna)",
    nameLatn: "Kepulauan Riau",
    nameEngl: "Riau Islands",
    modernName: "Provincia delle Isole Riau (Indonesia)",
    historicalName: "Nederlands-Indië — Residentie Riouw en Onderhoorigheden (Tandjoengpinang)",
    adminTitle: "Nederlands-Indië — Residentie Riouw en Onderhoorigheden",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Tandjoengpinang (Bintan)",
    islandGroup: 'Sumatra',
    faction: "Neutrale",
    s0_1: "Arcipelago insulare dominante l'accesso a Singapore; capoluogo a Tandjoengpinang sull'isola di Bintan, sede delle celebri miniere di bauxite (*Nederlandsch-Indische Bauxiet*) per la produzione mondiale di alluminio.",
    s2_4: "Intensivo sfruttamento della bauxite di Bintan e isole Natuna a guardia del Mar Cinese Meridionale; coordinamento navale informale con la base britannica di Singapore.",
    s5_7: "La bauxite di Bintan è dichiarata materiale di guerra essenziale per la produzione aeronautica alleata; minamento difensivo delle acque territoriali dello stretto.",
    s8: "Stretta cooperazione tra la Reale Marina Olandese e la Flotta d'Oriente della Royal Navy per l'avvistamento di formazioni da sbarco giapponesi nel golfo del Siam.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 6. Jambi
  "IDJA": {
    id: "IDJA",
    origId: 23,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Jambi",
    nutsName: "Jambi (Batang Hari / Djambi)",
    nameLatn: "Jambi",
    nameEngl: "Jambi",
    modernName: "Provincia di Jambi (Indonesia)",
    historicalName: "Nederlands-Indië — Residentie Djambi (Batang Hari)",
    adminTitle: "Nederlands-Indië (Gouvernement Sumatra) — Residentie Djambi",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Djambi (Jambi)",
    islandGroup: 'Sumatra',
    faction: "Neutrale",
    s0_1: "Fiume navigabile Batang Hari; capoluogo a Djambi con grandi piantagioni di caucciù e pozzi petroliferi gestiti dalla NIAM (*Nederlandsch-Indische Aardolie Maatschappij*).",
    s2_4: "Sviluppo dell'estrazione di greggio collegata mediante oleodotti fluviali verso gli impianti di raffinazione di Palembang.",
    s5_7: "Stato d'assedio coloniale; le concessioni energetiche della NIAM operano a pieno ritmo a sostegno della flotta olandese e del Commonwealth.",
    s8: "Allestimento di piani di sabotaggio e mine incendiarie per far brillare gli impianti petroliferi di Jambi prima di una cattura nemica.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 7. Sumatera Selatan
  "IDSS": {
    id: "IDSS",
    origId: 24,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Sumatera Selatan",
    nutsName: "Sumatera Selatan (Palembang / Plaju)",
    nameLatn: "Sumatera Selatan",
    nameEngl: "South Sumatra",
    modernName: "Provincia di Sumatra Meridionale (Indonesia)",
    historicalName: "Nederlands-Indië — Residentie Palembang (Pladjoe / Soengei Gerong)",
    adminTitle: "Nederlands-Indië (Gouvernement Sumatra) — Residentie Palembang",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Palembang",
    islandGroup: 'Sumatra',
    faction: "Neutrale",
    s0_1: "Capitale energetica del Sud-Est asiatico sul fiume Musi; le immense raffinerie di Pladjoe (BPM/Shell) e Soengei Gerong (Stanvac) raffinano oltre il 60% del greggio dell'arcipelago.",
    s2_4: "Palembang è il cuore della diplomazia petrolifera; giacimenti di carbone di Boekit Asam e oleodotti convergenti da tutta Sumatra meridionale.",
    s5_7: "Durante i negoziati con la delegazione nipponica di Kobayashi (autunno 1940), il Governatore van Starkenborgh rifiuta l'accesso esclusivo al petrolio di Palembang.",
    s8: "Costituzione del presidio di terra bruciata del KNIL: cariche di dinamite sistemate attorno alle torri di frazionamento di Plaju e Sungai Gerong per impedirne l'uso all'aviazione nipponica.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 8. Bengkulu
  "IDBE": {
    id: "IDBE",
    origId: 26,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Bengkulu",
    nutsName: "Bengkulu (Bencoolen / Redjang Lebong)",
    nameLatn: "Bengkulu",
    nameEngl: "Bengkulu",
    modernName: "Provincia di Bengkulu (Indonesia)",
    historicalName: "Nederlands-Indië — Residentie Benkoelen (Fort Marlborough)",
    adminTitle: "Nederlands-Indië (Gouvernement Sumatra) — Residentie Benkoelen",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Benkoelen (Bengkulu)",
    islandGroup: 'Sumatra',
    faction: "Neutrale",
    s0_1: "Antica fortezza britannica di Fort Marlborough; ricche miniere d'oro e argento di Lebong Tandai (Redjang Lebong); confino politico per i dissidenti anticoloniali.",
    s2_4: "Nel 1938 il leader nazionalista Sukarno viene trasferito in esilio a Benkoelen dalla prigione di Flores, rimanendovi fino all'invasione bellica.",
    s5_7: "Sorveglianza militare delle coste oceaniche sud-occidentali e intensificazione della produzione aurifera per le riserve valutarie coloniali.",
    s8: "Rafforzamento dei posti di vedetta lungo la cresta dei monti Barisan a protezione delle comunicazioni con Palembang.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 9. Lampung
  "IDLA": {
    id: "IDLA",
    origId: 25,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Lampung",
    nutsName: "Lampung (Telukbetung / Sunda Strait)",
    nameLatn: "Lampung",
    nameEngl: "Lampung",
    modernName: "Provincia di Lampung (Indonesia)",
    historicalName: "Nederlands-Indië — Residentie Lampongsche Districten (Telokbetoeng)",
    adminTitle: "Nederlands-Indië (Gouvernement Sumatra) — Residentie Lampongsche Districten",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Telokbetoeng (Telukbetung)",
    islandGroup: 'Sumatra',
    faction: "Neutrale",
    s0_1: "Porta d'accesso a Sumatra attraverso lo Stretto della Sonda; capoluogo a Telokbetoeng; colture di pepe nero, caucciù e villaggi di coloni trasferiti da Giava (*kolonisatie*).",
    s2_4: "Sviluppo del porto di Oosthaven (Panjang) collegato per ferrovia con Palembang; la baia di Lampong offre riparo alle navi commerciali.",
    s5_7: "Chiusura difensiva dello Stretto della Sonda con posa di campi minati e batterie costiere all'imbocco per Batavia.",
    s8: "Sorveglianza strategica dello Stretto della Sonda per impedire a sommergibili nemici l'accesso al Mar di Giava dall'Oceano Indiano.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 10. Bangka-Belitung
  "IDBB": {
    id: "IDBB",
    origId: 33,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Bangka-Belitung",
    nutsName: "Bangka-Belitung (Pangkal Pinang / Tanjung Pandan)",
    nameLatn: "Bangka-Belitung",
    nameEngl: "Bangka Belitung",
    modernName: "Provincia di Bangka-Belitung (Indonesia)",
    historicalName: "Nederlands-Indië — Residentie Banka en Eiland Billiton (Tin-Eilanden)",
    adminTitle: "Nederlands-Indië — Gouvernements-Tinwinning Banka & Mijnbouwmaatschappij Billiton",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Pangkalpinang / Tandjoengpandan",
    islandGroup: 'Sumatra',
    faction: "Neutrale",
    s0_1: "Isole dello stagno; l'estrazione statale di Banka e la società GMB di Billiton forniscono un terzo della produzione globale di stagno mediante imponenti draghe meccaniche.",
    s2_4: "Lo stagno di Banka e Billiton è materia prima vitale per l'industria meccanica e conserviera degli Stati Uniti e dell'Impero Britannico.",
    s5_7: "Con la dichiarazione di guerra del 1940, la produzione di stagno viene blindata e indirizzata esclusivamente al comitato di guerra alleato.",
    s8: "Piani di affondamento delle colossali draghe di stagno nel fango alluvionale per impedire che cadano intatte in mano all'invasore nipponico.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 11. Jakarta Raya (Batavia)
  "IDJK": {
    id: "IDJK",
    origId: 11,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Jakarta Raya",
    nutsName: "Batavia (Koningsplein / Weltevreden / Tanjung Priok)",
    nameLatn: "Jakarta Raya",
    nameEngl: "Jakarta Special Capital Region",
    modernName: "Distretto Speciale della Capitale Jakarta (Indonesia)",
    historicalName: "Nederlands-Indië — Hoofdstad Batavia (Koningsplein / Weltevreden)",
    adminTitle: "Nederlands-Indië — Zetel van de Gouverneur-Generaal (Batavia)",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Batavia (Jakarta)",
    islandGroup: 'Java',
    faction: "Neutrale",
    s0_1: "Capitale imperiale olandese in Asia; sede del Governatore Generale Jonkheer van Starkenborgh Stachouwer (Palazzo di Koningsplein), del parlamento consultivo (*Volksraad*) e porto di Tandjoeng Priok.",
    s2_4: "Inaugurazione del moderno aeroporto internazionale di Kemayoran (1940); Batavia coordina la ferma linea di neutralità armata delle Indie Olandesi.",
    s5_7: "Maggio 1940: caduta dei Paesi Bassi; Starkenborgh assume pieni poteri straordinari proclamando la fedeltà della colonia al governo in esilio di Londra; trattative serrate con l'inviato giapponese Kobayashi.",
    s8: "Rifiuto solenne dell'ultimatum economico giapponese da parte di Van Starkenborgh e Van Mook; allerta totale della guarnigione di Batavia e predisposizione del comando unificato ABDA.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 12. Jawa Barat
  "IDJB": {
    id: "IDJB",
    origId: 10,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Jawa Barat",
    nutsName: "Jawa Barat (Bandoeng / Buitenzorg / Priangan)",
    nameLatn: "Jawa Barat",
    nameEngl: "West Java",
    modernName: "Provincia di Giava Occidentale (Indonesia)",
    historicalName: "Nederlands-Indië — Provincie West-Java (Bandoeng / Buitenzorg)",
    adminTitle: "Nederlands-Indië — Bestuur van de Provincie West-Java",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Bandoeng (Bandung)",
    islandGroup: 'Java',
    faction: "Neutrale",
    s0_1: "Bandoeng è la capitale militare e tecnica dell'arcipelago, sede dell'arsenale dell'esercito (*ACW*), della fabbrica di chinino e della monumentale stazione radio di Malabar; residenza vicereale a Buitenzorg (Bogor).",
    s2_4: "Sviluppo dell'altopiano di Priangan con imponenti coltivazioni montane di tè e corteccia di china (la provincia produce oltre l'80% del chinino antimalarico mondiale).",
    s5_7: "Dichiarazione dello stato di guerra; il quartier generale del KNIL a Bandoeng sotto il generale Berenschot predispone piani di difesa dell'altopiano montano.",
    s8: "Rafforzamento della linea fortificata di Ciater e delle difese aeree di Bandoeng sotto la guida del nuovo comandante generale Hein ter Poorten.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 13. Banten
  "IDBT": {
    id: "IDBT",
    origId: 12,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Banten",
    nutsName: "Banten (Serang / Merak / Krakatau)",
    nameLatn: "Banten",
    nameEngl: "Banten",
    modernName: "Provincia di Banten (Indonesia)",
    historicalName: "Nederlands-Indië — Provincie West-Java: Residentie Bantam (Serang)",
    adminTitle: "Nederlands-Indië (Provincie West-Java) — Residentie Bantam",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Serang",
    islandGroup: 'Java',
    faction: "Neutrale",
    s0_1: "Antico Sultanato di Banten affacciato sullo Stretto della Sonda; capoluogo a Serang e porto traghetti di Merak per Sumatra; al largo svetta il vulcano attivo Anak Krakatau.",
    s2_4: "Intensa agricoltura risicola e piantagioni di palme da cocco; sorveglianza delle rotte di cabotaggio costiere verso lo Stretto della Sonda.",
    s5_7: "Ingresso nella coalizione alleata (giugno 1940); installazione di postazioni d'avvistamento e posa di sbarramenti marittimi all'ingresso occidentale di Giava.",
    s8: "Sorveglianza militare delle spiagge di Merak e Banten, considerate il punto più vulnerabile per un'invasione anfibia giapponese diretta contro Batavia.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 14. Jawa Tengah
  "IDJT": {
    id: "IDJT",
    origId: 9,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Jawa Tengah",
    nutsName: "Jawa Tengah (Semarang / Pekalongan)",
    nameLatn: "Jawa Tengah",
    nameEngl: "Central Java",
    modernName: "Provincia di Giava Centrale (Indonesia)",
    historicalName: "Nederlands-Indië — Provincie Midden-Java (Semarang / Pekalongan)",
    adminTitle: "Nederlands-Indië — Bestuur van de Provincie Midden-Java",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Semarang",
    islandGroup: 'Java',
    faction: "Neutrale",
    s0_1: "Porto commerciale di Semarang e snodo della ferrovia NIS; costa del batik a Pekalongan e Tegal; miniere di petrolio di Tjepu al confine orientale.",
    s2_4: "Elevata densità agricola risicola e piantagioni di tabacco e canna da zucchero; centro di addestramento territoriale per i riservisti del KNIL.",
    s5_7: "Attivazione delle difese territoriali alleate nel porto di Semarang e all'impianto di raffinazione di Tjepu.",
    s8: "Predisposizione dei piani di terra bruciata per le raffinerie di Tjepu e mobilitazione del battaglione KNIL di Semarang per il presidio della costa settentrionale.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 15. Yogyakarta
  "IDYO": {
    id: "IDYO",
    origId: 13,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Yogyakarta",
    nutsName: "Yogyakarta (Sultanaat Jogjakarta)",
    nameLatn: "Yogyakarta",
    nameEngl: "Special Region of Yogyakarta",
    modernName: "Regione Speciale di Yogyakarta (Indonesia)",
    historicalName: "Nederlands-Indië — Vorstenlanden: Sultanaat Jogjakarta (Hamengkoeboewono)",
    adminTitle: "Nederlands-Indië (Vorstenlanden) — Zelfbesturend Sultanaat Jogjakarta",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Jogjakarta (Yogyakarta)",
    islandGroup: 'Java',
    faction: "Neutrale",
    s0_1: "Stato principesco autonomo giavanese (*Vorstenland*) sotto il Sultano Hamengkubuwono VIII; Kraton di Jogja centro supremo della tradizione classica giavanese, arti e musica gamelan.",
    s2_4: "Nel 1939 sale al trono il giovane principe Dorodjatun col titolo di Hamengkubuwono IX, che afferma la sua indipendenza spirituale durante la firma del contratto politico con l'Olanda.",
    s5_7: "Il Sultano Hamengkubuwono IX sostiene formalmente il governo coloniale contro le minacce dell'Asse garantendo pace e sussistenza alla popolazione della regione.",
    s8: "Perno della stabilità interna di Giava meridionale; preservazione delle strutture di autogoverno principesco di fronte all'avvicinarsi della tempesta bellica.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 16. Jawa Timur
  "IDJI": {
    id: "IDJI",
    origId: 5,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Jawa Timur",
    nutsName: "Jawa Timur (Soerabaja / Malang / Madoera)",
    nameLatn: "Jawa Timur",
    nameEngl: "East Java",
    modernName: "Provincia di Giava Orientale (Indonesia)",
    historicalName: "Nederlands-Indië — Provincie Oost-Java (Soerabaja / Marinebasis)",
    adminTitle: "Nederlands-Indië — Bestuur van de Provincie Oost-Java",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Soerabaja (Surabaya)",
    islandGroup: 'Java',
    faction: "Neutrale",
    s0_1: "Soerabaja è la seconda metropoli e il principale porto industriale delle Indie Olandesi, sede della monumentale base navale di Ujung (*Marine Etablissement*) e dell'idroscalo di Morokrembangan.",
    s2_4: "Sviluppo dell'industria zuccheriera, cantieristica e ferroviaria; la base di Soerabaja ospita gli incrociatori della Reale Marina (De Ruyter, Java, Tromp) e flottiglie di sommergibili.",
    s5_7: "Con la dichiarazione di guerra del 1940, Soerabaja diventa il comando operativo navale dell'ammiraglio Conrad Helfrich; riparazioni navali intensive per gli Alleati.",
    s8: "Quartier generale navale dell'imminente flotta combinata ABDA (Admiral Doorman); allerta massima per i campi minati negli stretti di Madura e Bali.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 17. Bali
  "IDBA": {
    id: "IDBA",
    origId: 32,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Bali",
    nutsName: "Bali (Singaraja / Denpasar)",
    nameLatn: "Bali",
    nameEngl: "Bali",
    modernName: "Provincia di Bali (Indonesia)",
    historicalName: "Nederlands-Indië — Residentie Bali en Lombok: Eiland Bali (Singaradja)",
    adminTitle: "Nederlands-Indië (Gouvernement Groote Oost) — Afdeeling Bali",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Singaradja (Singaraja)",
    islandGroup: 'Nusa Tenggara',
    faction: "Neutrale",
    s0_1: "Capoluogo a Singaradja; preservazione della cultura e fede induista-balinese governata dai sovrani locali (*Zelfbestuurders / Anak Agung*); prime correnti turistiche internazionali a Sanur e Ubud.",
    s2_4: "Costruzione del campo d'atterraggio ausiliario di South Bali (Tubu / Denpasar); vigilanza marittima lungo lo stretto di Lombok e lo stretto di Bali.",
    s5_7: "Pattugliamento alleato dello Stretto di Lombok, corridoio d'acqua profonda cruciale tra il Mar di Giava e l'Oceano Indiano.",
    s8: "Rafforzamento della pista aerea di Denpasar per consentire lo scalo tecnico dei caccia Brewster Buffalo e bombardieri Hudson in transito verso Giava.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 18. Nusa Tenggara Barat
  "IDNB": {
    id: "IDNB",
    origId: 7,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Nusa Tenggara Barat",
    nutsName: "Nusa Tenggara Barat (Mataram / Sumbawa / Bima)",
    nameLatn: "Nusa Tenggara Barat",
    nameEngl: "West Nusa Tenggara",
    modernName: "Provincia di Nusa Tenggara Occidentale (Indonesia)",
    historicalName: "Nederlands-Indië — Residentie Bali en Lombok: Eilanden Lombok & Soembawa",
    adminTitle: "Nederlands-Indië (Gouvernement Groote Oost) — Afdeeling Lombok & Soembawa",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Mataram (Lombok)",
    islandGroup: 'Nusa Tenggara',
    faction: "Neutrale",
    s0_1: "Isole di Lombok e Soembawa con i Sultanati autoctoni di Soembawa e Bima; allevamento di cavalli, riso e cotone; dominata dalla caldera del monte Tambora.",
    s2_4: "Sviluppo di infrastrutture di cabotaggio costiero; i porti di Ampenan e Bima collegano il commercio tra Giava e le Piccole Isole della Sonda.",
    s5_7: "Allerta delle postazioni di vedetta marittima alleate nello Stretto di Alas e nello Stretto di Sape.",
    s8: "Sorveglianza dei passaggi marittimi dell'Oceano Indiano utilizzati dai convogli navali australiani diretti alle basi di Surabaya.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 19. Nusa Tenggara Timur
  "IDNT": {
    id: "IDNT",
    origId: 2,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Nusa Tenggara Timur",
    nutsName: "Nusa Tenggara Timur (Kupang / Flores / Sumba)",
    nameLatn: "Nusa Tenggara Timur",
    nameEngl: "East Nusa Tenggara",
    modernName: "Provincia di Nusa Tenggara Orientale (Indonesia)",
    historicalName: "Nederlands-Indië — Residentie Timor en Onderhoorigheden (Koepang)",
    adminTitle: "Nederlands-Indië (Gouvernement Groote Oost) — Residentie Timor",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Koepang (Kupang)",
    islandGroup: 'Nusa Tenggara',
    faction: "Neutrale",
    s0_1: "Koepang è il capoluogo di Timor Olandese, scalo aereo obbligato della rotta Londra-Sydney (Qantas/KLM) con l'aerodromo di Penfui; isole di Flores e Sumba; confina con il Timor Portoghese.",
    s2_4: "Presidio coloniale del KNIL a Koepang e relazioni di vicinato pacifico con le autorità portoghesi di Díli e Oe-Cusse.",
    s5_7: "In guerra contro la Germania (giugno 1940); l'aeroporto di Penfui a Koepang viene potenziato per il transito rapido dei bombardieri della RAAF da Darwin a Giava.",
    s8: "Pianificazione dell'operazione congiunta *Sparrow Force* con l'Esercito australiano (2/40th Battalion) per fortificare Koepang e blindare la rotta di rifornimento tra Darwin e Surabaya.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 20. Kalimantan Barat
  "IDKB": {
    id: "IDKB",
    origId: 3,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Kalimantan Barat",
    nutsName: "Kalimantan Barat (Pontianak / Kapuas)",
    nameLatn: "Kalimantan Barat",
    nameEngl: "West Kalimantan",
    modernName: "Provincia di Kalimantan Occidentale (Indonesia)",
    historicalName: "Nederlands-Indië — Residentie Westerafdeeling van Borneo (Pontianak)",
    adminTitle: "Nederlands-Indië (Gouvernement Borneo) — Westerafdeeling van Borneo",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Pontianak",
    islandGroup: 'Borneo',
    faction: "Neutrale",
    s0_1: "Capoluogo a Pontianak sul delta del fiume Kapuas, retto dal Sultanato di Pontianak; florida comunità commerciale cinese a Singkawang; produzione di copra e caucciù; confina a nord con Sarawak.",
    s2_4: "Costruzione del campo d'aviazione militare di Singkawang II (Ledo), concepito come base aerea segreta per proteggere gli approcci occidentali a Giava.",
    s5_7: "Mobilitazione bellica alleata; la base di Singkawang II viene inserita nei piani di difesa congiunta con la RAF di Singapore.",
    s8: "Dispiegamento dei caccia Brewster Buffalo del KNIL e bombardieri Glenn Martin a Singkawang II per intercettare navi giapponesi nel Mar Cinese Meridionale.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 21. Kalimantan Tengah
  "IDKT": {
    id: "IDKT",
    origId: 30,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Kalimantan Tengah",
    nutsName: "Kalimantan Tengah (Sampit / Kahayan)",
    nameLatn: "Kalimantan Tengah",
    nameEngl: "Central Kalimantan",
    modernName: "Provincia di Kalimantan Centrale (Indonesia)",
    historicalName: "Nederlands-Indië — Binnenlanden van Midden-Borneo (Sampit / Dajak)",
    adminTitle: "Nederlands-Indië (Gouvernement Borneo) — Afdeeling Binnenlanden van Borneo",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Sampit",
    islandGroup: 'Borneo',
    faction: "Neutrale",
    s0_1: "Immenso bacino fluviale e forestale dei fiumi Barito, Kahayan e Sampit; cuore tradizionale delle comunità Dayak; commercio di resine naturali, rattan e legname pregiato.",
    s2_4: "Apertura di piste idrovolanti fluviali per le pattuglie di polizia coloniale; missioni religiose e tutela consuetudinaria delle tribù dell'interno.",
    s5_7: "Zona interna isolata; produzione di gomma spontanea e resine destinata all'esportazione industriale per la difesa alleata.",
    s8: "Ritiro pianificato di nuclei di guerriglia e stazioni radio clandestine nella giungla centrale in caso di invasione costiera nemica.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 22. Kalimantan Selatan
  "IDKS": {
    id: "IDKS",
    origId: 31,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Kalimantan Selatan",
    nutsName: "Kalimantan Selatan (Banjarmasin / Martapura)",
    nameLatn: "Kalimantan Selatan",
    nameEngl: "South Kalimantan",
    modernName: "Provincia di Kalimantan Meridionale (Indonesia)",
    historicalName: "Nederlands-Indië — Residentie Zuider- en Oosterafdeeling van Borneo (Bandjermasin)",
    adminTitle: "Nederlands-Indië — Zetel van de Gouverneur van Borneo (Bandjermasin)",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Bandjermasin (Banjarmasin)",
    islandGroup: 'Borneo',
    faction: "Neutrale",
    s0_1: "Capitale e sede del Governatore di Borneo a Bandjermasin, vivace città sull'acqua solcata da canali; miniere di diamanti di Martapura, miniere di carbone di Poelau Laoet e caucciù.",
    s2_4: "Ampliamento della pista d'atterraggio di Oelin (Banjarmasin); commercio intensivo lungo il fiume Barito.",
    s5_7: "Con la dichiarazione di guerra del 1940, la guarnigione del battaglione KNIL di Bandjermasin viene posta in allarme a presidio dello Stretto di Makassar.",
    s8: "Piani di demolizione dei porti e delle scorte di carbone di Pulau Laut prima di un eventuale sbarco delle forze anfibie giapponesi.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 23. Kalimantan Timur
  "IDKI": {
    id: "IDKI",
    origId: 34,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Kalimantan Timur",
    nutsName: "Kalimantan Timur (Balikpapan / Samarinda / Kutai)",
    nameLatn: "Kalimantan Timur",
    nameEngl: "East Kalimantan",
    modernName: "Provincia di Kalimantan Orientale (Indonesia)",
    historicalName: "Nederlands-Indië — Balikpapan & Sultanaat Koetei (Oliekust)",
    adminTitle: "Nederlands-Indië (Gouvernement Borneo) — Centro Petrolifero BPM Balikpapan",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Balikpapan / Samarinda",
    islandGroup: 'Borneo',
    faction: "Neutrale",
    s0_1: "Balikpapan è la capitale della raffinazione petrolifera di Borneo, dotata delle più imponenti raffinerie della BPM (Shell); Sultanato di Koetei Kartanegara a Samarinda; pozzi di Sanga-Sanga.",
    s2_4: "Balikpapan esporta milioni di barili di combustibile per la flotta mercantile e militare mondiale; aerodromo militare di Manggar sul golfo di Balikpapan.",
    s5_7: "La difesa del petrolio di Balikpapan diventa una priorità assoluta dopo la caduta di Parigi; installazione di batterie costiere da 120 mm e mine sottomarine.",
    s8: "Il battaglione KNIL del tenente colonnello Van den Hoogenband predispone il sabotaggio totale di Balikpapan (*Operation Booby Trap*) per incenerire le raffinerie prima dell'arrivo della flotta nipponica.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 24. North Kalimantan (Kalimantan Utara)
  "IDKU": {
    id: "IDKU",
    origId: 1,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "North Kalimantan",
    nutsName: "Kalimantan Utara (Tarakan / Nunukan / Bulungan)",
    nameLatn: "Kalimantan Utara",
    nameEngl: "North Kalimantan",
    modernName: "Provincia di Kalimantan Settentrionale (Indonesia)",
    historicalName: "Nederlands-Indië — Eiland Tarakan & Boeloengan (Oliecentrum)",
    adminTitle: "Nederlands-Indië (Gouvernement Borneo) — Fortezza Petrolifera di Tarakan",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Tarakan",
    islandGroup: 'Borneo',
    faction: "Neutrale",
    s0_1: "L'isola di Tarakan produce un greggio purissimo impiegabile direttamente come combustibile navale; Sultanato di Boeloengan a Tandjoengselor; confina con il British North Borneo.",
    s2_4: "Tarakan viene fortificata dal KNIL come fortezza insulare (*Vesting Tarakan*) con batterie costiere a Mengacu e campo d'aviazione per bombardieri leggeri.",
    s5_7: "Con l'ingresso degli Alleati nella guerra nel 1940, la fortezza di Tarakan (tenente colonnello De Waal, 1.300 soldati) è messa in stato d'allarme massimo.",
    s8: "Piani operativi per incendiare i centinaia di pozzi di Tarakan e far esplodere i serbatoi costieri di greggio non appena le navi da sbarco giapponesi doppieranno l'orizzonte.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 25. Sulawesi Utara
  "IDSA": {
    id: "IDSA",
    origId: 21,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Sulawesi Utara",
    nutsName: "Sulawesi Utara (Manado / Minahasa)",
    nameLatn: "Sulawesi Utara",
    nameEngl: "North Sulawesi",
    modernName: "Provincia di Sulawesi Settentrionale (Indonesia)",
    historicalName: "Nederlands-Indië — Residentie Menado: Minahasa (Manado / Tondano)",
    adminTitle: "Nederlands-Indië (Gouvernement Groote Oost) — Residentie Menado",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Menado (Manado)",
    islandGroup: 'Sulawesi',
    faction: "Neutrale",
    s0_1: "Regione a maggioranza cristiana della Minahasa, tradizionalmente fedele alla Casa d'Orange; capoluogo a Menado; le popolazioni minahassesi forniscono molti reparti d'élite al KNIL; ricchezza di copra e noce moscata.",
    s2_4: "Sviluppo dell'idroscalo e base navale di Tondano e aerodromo di Kalawiran (Langoan); monitoraggio dei movimenti marittimi da Davao (Filippine meridionali).",
    s5_7: "In guerra con gli Alleati (giugno 1940); rafforzamento delle difese costiere della Minahasa guidate dal maggiore Schillmöller contro raid nemici.",
    s8: "Allerta rossa a Menado: la sua vicinanza a Davao rende la penisola di Minahasa il primo bersaglio prediletto per l'invasione giapponese delle Indie Olandesi.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 26. Gorontalo
  "IDGO": {
    id: "IDGO",
    origId: 20,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Gorontalo",
    nutsName: "Gorontalo (Tomini Bay)",
    nameLatn: "Gorontalo",
    nameEngl: "Gorontalo",
    modernName: "Provincia di Gorontalo (Indonesia)",
    historicalName: "Nederlands-Indië — Afdeeling Gorontalo (Tomini-bocht)",
    adminTitle: "Nederlands-Indië (Gouvernement Groote Oost) — Afdeeling Gorontalo",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Gorontalo",
    islandGroup: 'Sulawesi',
    faction: "Neutrale",
    s0_1: "Principati islamici tradizionali della federazione di Gorontalo affacciati sul golfo riparato di Tomini; esportazione di copra, mais e legname duro.",
    s2_4: "Presidio della polizia coloniale a Gorontalo; collegamenti marittimi di linea della KPM tra Menado, Ternate e Makassar.",
    s5_7: "Vigilanza costiera all'interno del Golfo di Tomini e coordinamento della difesa territoriale dei villaggi costieri.",
    s8: "Sorveglianza delle acque riparate del golfo contro possibili infiltrazioni o rifornimenti di idrovolanti ostili.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 27. Sulawesi Tengah
  "IDST": {
    id: "IDST",
    origId: 16,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Sulawesi Tengah",
    nutsName: "Sulawesi Tengah (Palu / Poso)",
    nameLatn: "Sulawesi Tengah",
    nameEngl: "Central Sulawesi",
    modernName: "Provincia di Sulawesi Centrale (Indonesia)",
    historicalName: "Nederlands-Indië — Midden-Celebes (Posomeer / Paloe)",
    adminTitle: "Nederlands-Indië (Gouvernement Groote Oost) — Afdeeling Midden-Celebes",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Paloe (Palu) / Poso",
    islandGroup: 'Sulawesi',
    faction: "Neutrale",
    s0_1: "Cuore montuoso di Celebes, esteso attorno al lago di Poso; popolazioni montane Toraja; coltivazioni di caffè, copra e rattan convogliati nella baia di Palu.",
    s2_4: "Apertura di piste carrarecce montane tra Poso e Palu; presidio amministrativo della polizia coloniale olandese.",
    s5_7: "Zona montuosa interna inserita nel sistema d'allerta del comando territoriale del Groote Oost.",
    s8: "Baluardo montuoso impervio dell'interno di Celebes a presidio delle vallate e delle vie di comunicazione tra i golfi di Tomini e Bone.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 28. Sulawesi Barat
  "IDSR": {
    id: "IDSR",
    origId: 22,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Sulawesi Barat",
    nutsName: "Sulawesi Barat (Majene / Mamuju / Mandar)",
    nameLatn: "Sulawesi Barat",
    nameEngl: "West Sulawesi",
    modernName: "Provincia di Sulawesi Occidentale (Indonesia)",
    historicalName: "Nederlands-Indië — Onderafdeeling Mandar (Madjene / Straat Makassar)",
    adminTitle: "Nederlands-Indië (Gouvernement Groote Oost) — Onderafdeeling Mandar",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Madjene (Majene)",
    islandGroup: 'Sulawesi',
    faction: "Neutrale",
    s0_1: "Terra del popolo marinaro Mandar affacciata sullo Stretto di Makassar; capoluogo a Madjene; costruttori ed esperti navigatori dei velieri tradizionali *sandeq*, pesca e copra.",
    s2_4: "Vigilanza dei traffici mercantili lungo lo Stretto di Makassar tra Celebes e la costa orientale del Borneo.",
    s5_7: "Attivazione di vedette costiere alleate lungo la costa occidentale di Celebes per segnalare navi sospette nello stretto.",
    s8: "Sorveglianza intensa dello Stretto di Makassar, via d'acqua vitale che conduce direttamente ai centri petroliferi di Balikpapan e Surabaya.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 29. Sulawesi Selatan
  "IDSN": {
    id: "IDSN",
    origId: 8,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Sulawesi Selatan",
    nutsName: "Sulawesi Selatan (Makassar / Bone / Ujung Pandang)",
    nameLatn: "Sulawesi Selatan",
    nameEngl: "South Sulawesi",
    modernName: "Provincia di Sulawesi Meridionale (Indonesia)",
    historicalName: "Nederlands-Indië — Residentie Celebes en Onderhoorigheden (Makassar)",
    adminTitle: "Nederlands-Indië — Zetel van de Gouverneur van Groote Oost (Makassar)",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Makassar (Ujung Pandang)",
    islandGroup: 'Sulawesi',
    faction: "Neutrale",
    s0_1: "Capitale e residenza del Governatore del Groote Oost a Makassar (storico Fort Rotterdam); centro marittimo e commerciale dei popoli marinari Bugis e Makassarese; regni di Bone e Gowa; esportazione di copra e spezie.",
    s2_4: "Sviluppo dell'aeroporto di Mandai (Hasanuddin) a Makassar; porto commerciale strategico per le rotte tra Giava, le Molucche e l'Australia.",
    s5_7: "Dichiarazione dello stato d'assedio (maggio 1940); internamento dei cittadini tedeschi; Makassar è il perno logistico per il rifornimento aereo alleato verso Ambon.",
    s8: "Fortificazione di Mandai e dispiegamento delle truppe del KNIL a Makassar per difendere l'ingresso meridionale allo Stretto di Makassar contro l'avanzata nipponica.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 30. Sulawesi Tenggara
  "IDSG": {
    id: "IDSG",
    origId: 14,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Sulawesi Tenggara",
    nutsName: "Sulawesi Tenggara (Kendari / Buton)",
    nameLatn: "Sulawesi Tenggara",
    nameEngl: "Southeast Sulawesi",
    modernName: "Provincia di Sulawesi Sud-Orientale (Indonesia)",
    historicalName: "Nederlands-Indië — Sultanaat Boeton & Vliegbasis Kendari",
    adminTitle: "Nederlands-Indië (Gouvernement Groote Oost) — Zelfbesturend Sultanaat Boeton",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Baubau (Buton) / Kendari",
    islandGroup: 'Sulawesi',
    faction: "Neutrale",
    s0_1: "Sultanato autonomo di Buton con sede nell'imponente fortezza di Baubau, celebre per le miniere di asfalto naturale; costa e porto protetto di Kendari.",
    s2_4: "Costruzione della modernissima base aerea militare di Kendari II ad opera del governo olandese, dotata di piste eccellenti per bombardieri e caccia.",
    s5_7: "Kendari II assume importanza cardinale nei piani di difesa aerea delle Indie Olandesi a protezione delle Molucche e del Mar di Banda.",
    s8: "Riconosciuta dagli aviatori di tutte le nazioni come la migliore base aerea delle Indie Orientali; obiettivo primario dei piani d'attacco aereo navale della Marina Imperiale Giapponese.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 31. Maluku Utara
  "IDMU": {
    id: "IDMU",
    origId: 17,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Maluku Utara",
    nutsName: "Maluku Utara (Ternate / Tidore / Halmahera)",
    nameLatn: "Maluku Utara",
    nameEngl: "North Maluku",
    modernName: "Provincia di Maluku Settentrionale (Indonesia)",
    historicalName: "Nederlands-Indië — Zelfbesturende Sultanaten Ternate en Tidore (Halmahera)",
    adminTitle: "Nederlands-Indië — Sultanati delle Spezie di Ternate e Tidore",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Ternate",
    islandGroup: 'Maluku',
    faction: "Neutrale",
    s0_1: "Leggendari Sultanati delle Spezie di Ternate e Tidore all'ombra dei rispettivi coni vulcanici; culla mondiale dei chiodi di garofano; comprende la vasta isola di Halmahera e l'isola di Morotai.",
    s2_4: "Mantenimento dell'autorità tradizionale dei Sultani di Ternate e Tidore sotto la sovranità imperiale olandese; commercio di noce moscata e copra.",
    s5_7: "Attivazione di vedette costiere a Ternate e Morotai a sorveglianza delle rotte di avvicinamento navale dalle basi giapponesi di Davao e Palau.",
    s8: "Posizione di confine settentrionale avanzata dell'arcipelago indonesiano verso il Pacifico occidentale; presidi di polizia e stazioni radio in allerta invasione.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 32. Maluku
  "IDMA": {
    id: "IDMA",
    origId: 6,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Maluku",
    nutsName: "Maluku (Ambon / Seram / Banda / Aru)",
    nameLatn: "Maluku",
    nameEngl: "Maluku",
    modernName: "Provincia di Maluku (Indonesia)",
    historicalName: "Nederlands-Indië — Residentie Molukken: Eilanden Ambon & Banda",
    adminTitle: "Nederlands-Indië (Gouvernement Groote Oost) — Residentie Molukken",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Ambon",
    islandGroup: 'Maluku',
    faction: "Neutrale",
    s0_1: "Ambon è la storica capitale delle Molucche, dotata della base navale di Halong e della pista d'atterraggio di Laha; popolazione ambonese fieramente fedele alla Corona olandese; Isole Banda della noce moscata.",
    s2_4: "Ambon è il perno aeronavale per il pattugliamento del Mar di Banda e dei passaggi verso la Nuova Guinea e l'Australia; arcipelaghi esterni di Aru e Tanimbar.",
    s5_7: "Entrata in guerra della colonia (giugno 1940); base idrovolanti PBY Catalina della Marina Olandese ad Ambon a presidio delle rotte convogliate.",
    s8: "Accordi difensivi con l'Australia: arrivo ad Ambon della *Gull Force* dell'Esercito australiano (2/21st Battalion AIF) a supporto del presidio del KNIL (tenente colonnello Kapitz) a difesa della base navale.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 33. Papua Barat
  "IDPB": {
    id: "IDPB",
    origId: 15,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Papua Barat",
    nutsName: "Papua Barat (Manokwari / Fakfak / Sorong)",
    nameLatn: "Papua Barat",
    nameEngl: "West Papua",
    modernName: "Provincia di Papua Occidentale (Indonesia)",
    historicalName: "Nederlands-Indië — West Nieuw-Guinea: Vogelkop & Fakfak (Manokwari)",
    adminTitle: "Nederlands-Indië (Gouvernement Groote Oost) — Onderafdeeling West Nieuw-Guinea",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Manokwari / Fakfak",
    islandGroup: 'Papua',
    faction: "Neutrale",
    s0_1: "Penisola della 'Testa d'Uccello' (*Vogelkop*) con scali costieri a Fakfak e Manokwari; concessioni minerarie e petrolifere della NNGPM a Sorong, Klamono e Babo; arcipelago di Raja Ampat.",
    s2_4: "Sviluppo dei campi petroliferi di Klamono e della base idrovolanti di Babo; presenza di stazioni missionarie e rilievi cartografici dell'interno montano.",
    s5_7: "Sotto amministrazione di guerra alleata; la produzione petrolifera di Babo e Klamono viene integrata nella catena di approvvigionamento bellico del Pacifico.",
    s8: "Presidi costieri del KNIL a Manokwari e Fakfak e vigilanza delle baie di Bintuni e Berau per prevenire incursioni navali ostili.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  },

  // 34. Papua
  "IDPA": {
    id: "IDPA",
    origId: 4,
    cntrCode: 'ID',
    cntrName: 'Indonesia',
    name: "Papua",
    nutsName: "Papua (Hollandia / Merauke / 141° E)",
    nameLatn: "Papua",
    nameEngl: "Papua",
    modernName: "Provincia di Papua (Indonesia)",
    historicalName: "Nederlands-Indië — Residentie Nieuw-Guinea (Hollandia / Merauke / 141° E)",
    adminTitle: "Nederlands-Indië (Gouvernement Groote Oost) — Afdeeling Noord & Zuid Nieuw-Guinea",
    sovereign: "HOL",
    overlord: "Koninkrijk der Nederlanden",
    capital: "Hollandia (Jayapura) / Merauke",
    islandGroup: 'Papua',
    faction: "Neutrale",
    s0_1: "Confina a est sul 141º meridiano con la Nuova Guinea Australiana; capoluogo a Hollandia sulla magnifica Humboldt Bay a nord e Merauke a sud; insediamenti di Biak e Japen nella baia di Geelvink.",
    s2_4: "Pattugliamenti di frontiera concordati con le autorità australiane della Papua; la rada profonda di Hollandia offre un ancoraggio naturale vastissimo.",
    s5_7: "Entrata in guerra delle Indie Olandesi; cooperazione logistica di frontiera con i funzionari coloniali australiani di Aitape e Daru.",
    s8: "Postazioni d'avvistamento a Hollandia, Biak e Merauke per segnalare formazioni da guerra giapponesi provenienti dalle isole Caroline e Palau.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 6 ? 'Alleati' : 'Neutrale'
  }
};

/**
 * Risolutore geocartografico per le province dell'Indonesia (Nederlands-Indië)
 */
export function resolveIndonesiaProvince(ft: any, s: number): ResolvedTerritory {
  if (!ft) return makeResult('HOL', 'Nederlands-Indië', 'Colonia del Regno dei Paesi Bassi');

  const norm = (str: string) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const p = ft.properties || {};
  const fidClean = String(ft.id || p.id || p.NUTS_ID || '').trim();
  const rawName = String(p.HISTORICAL_NAME || p.NAME || p.name || '');

  // 1. Ricerca diretta per codice ISO (es. IDKU, IDNT, IDPA...)
  let meta = INDONESIA_PROVINCES_META[fidClean];

  // 2. Ricerca per nome o corrispondenze
  if (!meta) {
    const nrmRaw = norm(rawName);

    for (const key of Object.keys(INDONESIA_PROVINCES_META)) {
      const candidate = INDONESIA_PROVINCES_META[key];
      if (
        nrmRaw.includes(norm(candidate.name)) ||
        norm(candidate.name).includes(nrmRaw) ||
        nrmRaw.includes(norm(candidate.modernName)) ||
        norm(candidate.historicalName).includes(nrmRaw) ||
        norm(candidate.nutsName).includes(nrmRaw)
      ) {
        meta = candidate;
        break;
      }
    }
  }

  // =========================================================================
  // STEP 19+ (SETTEMBRE 1947): LA GUERRA D'INDIPENDENZA INDONESIANA (1945-1949)
  // Prima Azione di Polizia Olandese (Operatie Product, 21 Luglio 1947),
  // Linea Van Mook (29 Agosto 1947), Capitale Repubblicana a Yogyakarta,
  // Stato dell'Indonesia Orientale (NIT) e Federalismo Olandese
  // =========================================================================
  if (s >= 19) {
    const fid = (meta ? meta.id : fidClean).toUpperCase();

    // 1. Giava Repubblicana: Capitale a Yogyakarta (IDYO), Giava Centrale (IDJT) e Banten (IDBT)
    if (fid === 'IDYO' || norm(rawName).includes('yogyakarta') || norm(rawName).includes('jogjakarta')) {
      return makeResult(
        'IDN',
        'Yogyakarta (Capitale Rivoluzionaria della Repubblica d\'Indonesia — Sede di Sukarno & Kraton di Hamengkubuwono IX)',
        "Capitale de facto della Repubblica d'Indonesia dal gennaio 1946, allorché il Sultano Hamengkubuwono IX offrì il proprio palazzo (Kraton) e il pieno sostegno finanziario e morale a Sukarno e Mohammad Hatta dopo l'occupazione olandese di Batavia. Al 30 settembre 1947 Yogyakarta è il cuore politico, diplomatico e militare della resistenza nazionale indonesiana, sede del governo del primo ministro Amir Sjarifuddin, del quartier generale delle forze armate (TNI) guidate dal Generale Soedirman e centro operativo per i colloqui con la Commissione di Buoni Uffici dell'ONU (KTN / GOC).",
        'Neutrale',
        'Republik Indonesia — Ibu Kota Revolusi (Presidente Sukarno / Sultano Hamengkubuwono IX)'
      );
    }

    if (fid === 'IDJT' || (meta && meta.islandGroup === 'Java' && norm(meta.name).includes('jawa tengah'))) {
      return makeResult(
        'IDN',
        'Jawa Tengah (Giava Centrale — Bastione Territoriale della Repubblica d\'Indonesia & Forze TNI)',
        "Cuore demografico e bastione militare della Repubblica d'Indonesia non espugnato durante Operatie Product. Comprende le storiche città di Surakarta (Solo), Magelang, Madiun e Kediri. Sebbene gli olandesi abbiano occupato la fascia portuale costiera a Semarang lungo la Linea Van Mook, l'intero entroterra collinare e montano è difeso con tenacia dalle divisioni del TNI del generale Soedirman, sostenute dalle organizzazioni contadine e giovanili repubblicane.",
        'Neutrale',
        'Republik Indonesia — Provinsi Jawa Tengah (Governatore Wongsonegoro / TNI)'
      );
    }

    if (fid === 'IDBT' || norm(rawName).includes('banten') || norm(rawName).includes('bantam')) {
      return makeResult(
        'IDN',
        'Banten (Bantam — Roccaforte Rivoluzionaria Repubblicana e Musulmana)',
        "Roccaforte rivoluzionaria repubblicana all'estremità occidentale di Giava retta dal carismatico leader islamico K.H. Achmad Chatib. Durante la Prima Azione di Polizia (Operatie Product) le colonne corazzate olandesi non sono riuscite a penetrare nella regione, che rimane sotto il saldo controllo del TNI e delle milizie popolari (Laskar), garantendo alla Repubblica una fondamentale finestra marittima sullo Stretto della Sonda per le comunicazioni con Sumatra.",
        'Neutrale',
        'Republik Indonesia — Karesidenan Banten (Residente K.H. Achmad Chatib)'
      );
    }

    // 2. Giava Occupata dagli Olandesi: Batavia (IDJK), Giava Occidentale (IDJB) e Giava Orientale / Madura (IDJI)
    if (fid === 'IDJK' || norm(rawName).includes('jakarta') || norm(rawName).includes('batavia')) {
      return makeResult(
        'HOL',
        'Batavia (Giacarta — Sede del Luogotenente Governatore Generale van Mook & Quartier Generale Olandese)',
        "Occupata militarmente dalle forze olandesi e dal NICA fin dal tardo 1945 dopo il passaggio di consegne britannico. Sede dell'amministrazione coloniale del Luogotenente Governatore Generale Hubertus van Mook e del comando supremo delle forze terrestri del generale Simon Spoor. Da qui il 21 luglio 1947 è stata scatenata Operatie Product e il 29 agosto è stata proclamata unilateralmente la Linea Van Mook; a fine settembre 1947 la città accoglie i delegati della Commissione di Buoni Uffici delle Nazioni Unite (KTN).",
        'Alleati',
        'Koninkrijk der Nederlanden — Hoofdstad Batavia (Lt. Gov.-Gen. H.J. van Mook / Gen. S.H. Spoor)'
      );
    }

    if (fid === 'IDJB' || (meta && meta.islandGroup === 'Java' && norm(meta.name).includes('jawa barat'))) {
      return makeResult(
        'HOL',
        'Jawa Barat (Giava Occidentale / Bandoeng — Occupazione Olandese & Progetto Stato di Pasundan)',
        "Territorio occupato militarmente dalle truppe olandesi (7ª Divisione '7 December') durante Operatie Product nel luglio 1947 per riprendere il controllo delle ricchissime piantagioni di tè, caucciù e chinino del Priangan e delle città di Bandung e Buitenzorg (Bogor). L'amministrazione olandese vi organizza lo stato federale cliente di Pasundan (Stato di Pasundan) per sottrarre l'etnia sundanese alla Repubblica, mentre la Divisione Siliwangi del TNI conduce una durissima guerriglia partigiana nelle foreste montane.",
        'Alleati',
        'Nederlands-Indië — Recomba West-Java & Negara Pasundan (Raden Wiranatakoesoema)'
      );
    }

    if (fid === 'IDJI' || (meta && meta.islandGroup === 'Java' && norm(meta.name).includes('jawa timur'))) {
      return makeResult(
        'HOL',
        'Jawa Timur & Madura (Giava Orientale / Soerabaja — Presidio della Mariniersbrigade & Stato di Madura)',
        "La metropoli portuale e base navale di Surabaya, Malang e le grandi piantagioni di zucchero e gomma di Giava Orientale sono saldamente controllate dalla brigata dei Marines olandesi (Mariniersbrigade) e dalle truppe coloniali a seguito dell'Operazione Product. Sull'isola di Madura, occupata nell'agosto 1947, le autorità olandesi sponsorizzano la creazione dello stato fantoccio della Negara Madura retto da Raden T.A. Tjakraningrat per spezzare il fronte repubblicano giavanese.",
        'Alleati',
        'Nederlands-Indië — Recomba Oost-Java & Negara Madura (Raden T.A. Tjakraningrat)'
      );
    }

    // 3. Sumatra Repubblicana: Aceh inviolata (IDAC), Sumatra Ovest (IDSB), Jambi (IDJA), Bengkulu (IDBE), Riau continentale (IDRI)
    if (fid === 'IDAC' || norm(rawName).includes('aceh') || norm(rawName).includes('atjeh')) {
      return makeResult(
        'IDN',
        'Aceh (Koetaradja — Daerah Modal / Baluardo Inviolato della Repubblica d\'Indonesia)',
        "Unica regione dell'intero arcipelago indonesiano mai violata né calpestata dalle truppe coloniali olandesi. Amministrata con pugno di ferro dal leader religioso e militare Teungku Daud Beureueh, Aceh è proclamata la 'Daerah Modal' (Territorio Capitale) della Repubblica: attraverso il contrabbando navale via Penang e Singapore finanzia il governo centrale, fornisce armi al TNI e raccoglie i fondi popolari per l'acquisto del primo aereo di linea indonesiano (il bimotore Douglas C-47 'Seulawah RI-001').",
        'Neutrale',
        'Republik Indonesia — Daerah Modal Aceh (Governatore Militare Teungku Daud Beureueh)'
      );
    }

    if (fid === 'IDSB' || norm(rawName).includes('sumatera barat') || norm(rawName).includes('bukittinggi') || norm(rawName).includes('padang')) {
      return makeResult(
        'IDN',
        'Sumatera Barat (Bukittinggi — Capitale Repubblicana di Sumatra & Altopiano dei Minangkabau)',
        "Sede del governo repubblicano unificato di Sumatra guidato dal governatore Teuku Muhammad Hasan nella città montana di Bukittinggi (Fort de Kock). Sebbene le forze olandesi abbiano occupato la città portuale costiera di Padang e il porto di Emmahaven (Teluk Bayur), l'intero entroterra montano dei Minangkabau e le miniere di Sawahlunto sono una roccaforte repubblicana inespugnata del TNI, culla dei futuri vertici di governo del PDRI.",
        'Neutrale',
        'Republik Indonesia — Governo Repubblicano di Sumatra (Governatore Teuku M. Hasan)'
      );
    }

    if (fid === 'IDJA' || norm(rawName).includes('jambi') || norm(rawName).includes('djambi')) {
      return makeResult(
        'IDN',
        'Jambi (Batang Hari — Entroterra e Vie Fluviali della Repubblica d\'Indonesia)',
        "Vasta provincia fluviale del bacino del Batang Hari rimasta sotto il saldo controllo della Repubblica d'Indonesia. Le formazioni del TNI e della polizia repubblicana vi garantiscono una rotta protetta di collegamento tra la capitale di Sumatra a Bukittinggi e i settori meridionali dell'isola.",
        'Neutrale',
        'Republik Indonesia — Karesidenan Djambi (Residente Rd. Inoe Kertapati)'
      );
    }

    if (fid === 'IDBE' || norm(rawName).includes('bengkulu') || norm(rawName).includes('benkoelen')) {
      return makeResult(
        'IDN',
        'Bengkulu (Benkoelen — Costa Sud-Occidentale della Repubblica d\'Indonesia)',
        "Fascia costiera sud-occidentale di Sumatra presidiata dal TNI repubblicano e terra di esilio politico prebellico di Sukarno. I piccoli porti della costa mantengono un flusso costante di comunicazioni marittime clandestine con la roccaforte di Banten attraverso lo Stretto della Sonda.",
        'Neutrale',
        'Republik Indonesia — Karesidenan Benkoelen (Residente Oesman Hazairin)'
      );
    }

    if (fid === 'IDRI' || norm(rawName).includes('riau') && !norm(rawName).includes('kepulauan')) {
      return makeResult(
        'IDN',
        'Riau Continentale (Pekanbaru / Fiume Siak — Entroterra Repubblicano di Sumatra)',
        "Regione interna di Sumatra centrale imperniata su Pekanbaru e il bacino del fiume Siak, sotto controllo repubblicano. Punto di smistamento clandestino verso la penisola malese per il traffico di gomma naturale in cambio di uniformi, radio e medicinali.",
        'Neutrale',
        'Republik Indonesia — Karesidenan Riau Daratan (Pekanbaru)'
      );
    }

    // 4. Sumatra Occupata dagli Olandesi: Palembang/Plaju/Sungai Gerong (IDSS), Medan/Deli (IDSU), Lampung (IDLA), Bangka-Belitung (IDBB), Kepulauan Riau (IDKR)
    if (fid === 'IDSS' || norm(rawName).includes('palembang') || norm(rawName).includes('sumatera selatan')) {
      return makeResult(
        'HOL',
        'Sumatera Selatan (Palembang — Occupazione Olandese dei Bacini Petroliferi di Pladjoe & Soengei Gerong)',
        "Obiettivo economico strategico di primaria importanza per L'Aia: nel luglio 1947, con Operatie Product, le colonne corazzate olandesi del KNIL hanno travolto le posizioni repubblicane occupando la città fluviale di Palembang e i giganteschi complessi di raffinazione petrolifera della BPM (Shell) e della Stanvac a Plaju (Pladjoe) e Sungai Gerong. Al 30 settembre 1947 il settore è presidiato militarmente dall'Olanda e delimitato dalla Linea Van Mook, mentre le brigate del TNI conducono imboscate nella giungla.",
        'Alleati',
        'Nederlands-Indië — Recomba Zuid-Sumatra (Palembang / Stanvac & Royal Dutch Shell)'
      );
    }

    if (fid === 'IDSU' || norm(rawName).includes('sumatera utara') || norm(rawName).includes('medan') || norm(rawName).includes('deli')) {
      return makeResult(
        'HOL',
        'Sumatera Utara (Medan / Deli — Occupazione Olandese & Nascita dello Stato di Sumatra Orientale)',
        "Cuore delle piantagioni imperiali di caucciù, tabacco da sigari e palma da olio della costa orientale di Sumatra. Occupata militarmente dall'esercito olandese durante Operatie Product nel luglio 1947, la regione viene distaccata dalla Repubblica e riorganizzata nello stato federale cliente della Negara Sumatera Timur (NST) sotto la presidenza aristocratica di Tengku Mansur, con il pieno appoggio degli industriali europei e dei sultani locali.",
        'Alleati',
        'Nederlands-Indië — Recomba Oostkust van Sumatra & Negara Sumatera Timur (Tengku Mansur)'
      );
    }

    if (fid === 'IDLA' || norm(rawName).includes('lampung')) {
      return makeResult(
        'HOL',
        'Lampung (Telokbetoeng — Presidio Olandese dello Stretto della Sonda)',
        "Settore meridionale di Sumatra presidiato dal KNIL e dalla marina olandese a Telukbetung per sorvegliare lo Stretto della Sonda e bloccare i collegamenti navali tra Sumatra e Giava.",
        'Alleati',
        'Nederlands-Indië — Residentie Lampong (Telokbetoeng)'
      );
    }
    if (fid === 'IDBB' || norm(rawName).includes('bangka') || norm(rawName).includes('belitung') || norm(rawName).includes('billiton')) {
      return makeResult(
        'HOL',
        'Bangka e Belitung (Isole dello Stagno — Amministrazione Speciale Olandese)',
        "Isole minerarie dello stagno detenute sotto ferreo controllo olandese; i proventi delle esportazioni di stagno finanziano direttamente le operazioni militari del NICA nell'arcipelago.",
        'Alleati',
        'Nederlands-Indië — Bangka-Raad en Billiton-Raad (Tin-Eilanden)'
      );
    }
    if (fid === 'IDKR' || norm(rawName).includes('kepulauan riau') || norm(rawName).includes('tanjungpinang')) {
      return makeResult(
        'HOL',
        'Kepulauan Riau (Riouw / Tandjoengpinang — Base Navale Olandese di Sorveglianza)',
        "Arcipelago insulare alle porte di Singapore tenuto sotto stretto blocco navale dalla Marina Reale Olandese per interdire le rotte dei rifornimenti clandestini repubblicani.",
        'Alleati',
        'Nederlands-Indië — Residentie Riouw (Tandjoengpinang)'
      );
    }

    // 5. Stato dell'Indonesia Orientale (Negara Indonesia Timur - NIT): Sulawesi, Nusa Tenggara, Maluku
    const isGrooteOost = meta && (meta.islandGroup === 'Sulawesi' || meta.islandGroup === 'Maluku' || meta.islandGroup === 'Nusa Tenggara');
    if (isGrooteOost || fid.startsWith('IDSN') || fid.startsWith('IDSA') || fid.startsWith('IDBA') || fid.startsWith('IDMA')) {
      const subName = meta ? meta.name : rawName;
      return makeResult(
        'HOL',
        `${meta ? meta.historicalName : rawName} (Negara Indonesia Timur — Stato Federale dell'Indonesia Orientale)`,
        "Territorio costituente del Negara Indonesia Timur (NIT — Stato dell'Indonesia Orientale), stato federale creato alla Conferenza di Denpasar nel dicembre 1946 sotto gli auspici del Luogotenente Governatore Generale Hubertus van Mook per arginare l'influenza della Repubblica di Sukarno. Con capitale a Makassar (Celebes) e presidenza affidata al nobile balinese Tjokorda Gde Raka Soekawati, il NIT raggruppa Sulawesi, le Molucche e le Piccole Isole della Sonda (compresa Bali), preservando la tutela strategica e militare dei Paesi Bassi.",
        'Alleati',
        'Negara Indonesia Timur (Presidente Tjokorda Gde Raka Soekawati / Capitale Makassar) · Tutela Olandese'
      );
    }

    // 6. Borneo (Kalimantan): Daerah Istimewa Kalimantan Barat (Sultan Hamid II) & Federazioni Regionali
    const isBorneo = meta && meta.islandGroup === 'Borneo';
    if (isBorneo || fid.startsWith('IDK')) {
      if (fid === 'IDKB' || norm(rawName).includes('pontianak')) {
        return makeResult(
          'HOL',
          'Kalimantan Barat (Pontianak — Daerah Istimewa del Sultano Hamid II / Borneo Occidentale)',
          "Regione autonoma speciale del Borneo Occidentale (Daerah Istimewa Kalimantan Barat) governata da Syarif Hamid Alkadrie (Sultano Hamid II di Pontianak, colonnello del KNIL e fedele alleato dell'amministrazione olandese). Modello di territorio federale patrocinato da van Mook.",
          'Alleati',
          'Daerah Istimewa Kalimantan Barat (Sultan Hamid II di Pontianak) · Tutela Olandese'
        );
      }
      return makeResult(
        'HOL',
        `${meta ? meta.historicalName : rawName} (Nederlands-Indië — Federazioni Autonome del Borneo / Oliekust Tarakan & Balikpapan)`,
        "Territorio del Borneo olandese (Kalimantan) presidiato dalle forze del KNIL dopo la liberazione australiana del 1945. L'amministrazione olandese promuove consigli regionali filo-federali (Dayak Besar, Bandjar, Kalimantan Orientale) per tutelare i colossali complessi petroliferi di Tarakan e Balikpapan.",
        'Alleati',
        'Koninkrijk der Nederlanden — Gouvernement Borneo (Banjarmasin / Balikpapan)'
      );
    }

    // 7. Nuova Guinea Occidentale (Nederlands-Nieuw-Guinea / Papua)
    const isPapua = meta && meta.islandGroup === 'Papua';
    if (isPapua || fid.startsWith('IDP')) {
      return makeResult(
        'HOL',
        'Nederlands-Nieuw-Guinea (Nuova Guinea Olandese — Territorio d\'Oltremare dei Paesi Bassi)',
        "Territorio d'oltremare dei Paesi Bassi con capitale a Hollandia (Jayapura). Esclusa categoricamente da L'Aia da qualsiasi trattativa o concessione alla Repubblica di Sukarno e considerata entità etnica e geopolitica distinta, la Nuova Guinea Occidentale rimane saldamente governata dai Paesi Bassi con basi navali e aeree a Biak, Merauke e Manokwari.",
        'Alleati',
        'Koninkrijk der Nederlanden — Gouvernement van Nederlands-Nieuw-Guinea (Hollandia)'
      );
    }

    // Fallback Step 19
    return makeResult(
      'IDN',
      `${meta ? meta.historicalName : rawName} (Repubblica d'Indonesia — Rivoluzione Nazionale & Capitale a Yogyakarta)`,
      "Territorio dell'arcipelago indonesiano conteso tra la Repubblica d'Indonesia (governo di Yogyakarta di Sukarno-Hatta) e l'amministrazione coloniale dei Paesi Bassi delimitata dalla Linea Van Mook.",
      'Neutrale',
      'Republik Indonesia — Governo di Yogyakarta'
    );
  }

  // =========================================================================
  // STEP 18 (Settembre 1945): La Rivoluzione Nazionale Indonesiana, il NICA e la Tripartizione Geopolitica
  // =========================================================================
  if (s === 18) {
    const isJavaOrSumatra = meta && (meta.islandGroup === 'Java' || meta.islandGroup === 'Sumatra');
    const isBorneo = meta && meta.islandGroup === 'Borneo';
    const isGrooteOost = meta && (meta.islandGroup === 'Sulawesi' || meta.islandGroup === 'Maluku' || meta.islandGroup === 'Nusa Tenggara');
    const isPapua = meta && meta.islandGroup === 'Papua';

    // 1. Giava e Sumatra: Cuore della Rivoluzione Nazionale Indonesiana (Repubblica di Sukarno & Presidio Britannico AFNEI)
    if (isJavaOrSumatra || (!meta && (fidClean.startsWith('IDJ') || fidClean.startsWith('IDS') || rawName.toLowerCase().includes('java') || rawName.toLowerCase().includes('sumatra')))) {
      return makeResult(
        'IDN',
        `${meta ? meta.historicalName : rawName} (Repubblica d'Indonesia — Rivoluzione Nazionale & Presidio Britannico AFNEI)`,
        "Il 17 agosto 1945 a Giacarta Sukarno e Mohammad Hatta proclamano l'indipendenza della Repubblica d'Indonesia (Proklamasi Kemerdekaan Indonesia). A Giava e Sumatra i comitati rivoluzionari, le milizie giovanili dei Pemuda e il Badan Keamanan Rakyat (BKR) prendono il controllo delle città e delle comunicazioni. A fine settembre 1945 sbarcano a Batavia le prime unità della 23ª Divisione Indiana britannica (maggior generale D.C. Hawthorn / AFNEI - Allied Forces Netherlands East Indies sotto il generale Philip Christison) per disarmare le truppe giapponesi e liberare i prigionieri alleati (RAPWI), riconoscendo de facto l'autorità repubblicana per l'ordine pubblico nell'interno dell'isola dinanzi alle proteste del NICA olandese.",
        'Neutrale',
        'Republik Indonesia (Presidente Sukarno & Vicepresidente Mohammad Hatta) / Presidio Britannico AFNEI'
      );
    }

    // 2. Borneo (Kalimantan): I Corpo d'Armata Australiano & Restaurazione del NICA Olandese
    if (isBorneo || (!meta && (fidClean.startsWith('IDK') || rawName.toLowerCase().includes('kalimantan') || rawName.toLowerCase().includes('borneo')))) {
      return makeResult(
        'HOL',
        `${meta ? meta.historicalName : rawName} (Nederlands-Indië — Restaurazione del NICA & Occupazione Australiana)`,
        "Liberato nella primavera-estate 1945 dal I Corpo d'Armata Australiano (7ª e 9ª Divisione, Operazione Oboe a Tarakan e Balikpapan), il Borneo olandese viene posto sotto il controllo militare alleato con l'immediata restaurazione dell'amministrazione civile del NICA (Netherlands Indies Civil Administration). Le aspirazioni repubblicane locali vengono prontamente arginate dalle forze alleate, ponendo le basi per il mantenimento dell'autorità coloniale olandese e l'istituzione dei futuri territori federali.",
        'Alleati',
        'Koninkrijk der Nederlanden — Netherlands Indies Civil Administration (NICA / Gouvernement Borneo)'
      );
    }

    // 3. Groote Oost (Sulawesi, Molucche, Piccole Isole della Sonda): Controllo Alleato Australiano & NICA
    if (isGrooteOost || (!meta && (fidClean.startsWith('IDS') || fidClean.startsWith('IDM') || fidClean.startsWith('IDB') || fidClean.startsWith('IDN')))) {
      return makeResult(
        'HOL',
        `${meta ? meta.historicalName : rawName} (Nederlands-Indië — Restaurazione del NICA & I Corpo d'Armata Australiano)`,
        "A seguito della resa delle forze navali giapponesi firmata a Morotai il 9 settembre 1945 dinanzi al generale australiano Sir Thomas Blamey, le truppe del Commonwealth australiano sbarcano a Makassar, Menado, Ambon, Kupang e Denpasar, reintegrando l'autorità civile dei Paesi Bassi guidata dal NICA (Netherlands Indies Civil Administration) del Luogotenente Governatore Generale Hubertus van Mook. In queste isole orientali l'Olanda consolida il proprio potere coloniale, gettando le fondamenta per la proclamazione del filo-olandese Stato dell'Indonesia Orientale (Negara Indonesia Timur).",
        'Alleati',
        'Koninkrijk der Nederlanden — Netherlands Indies Civil Administration (NICA / Gouvernement Groote Oost)'
      );
    }

    // 4. Nuova Guinea Occidentale (Nederlands-Nieuw-Guinea / Papua: IDPA, IDPB): Colonia Olandese Separata
    if (isPapua || (!meta && (fidClean.startsWith('IDP') || rawName.toLowerCase().includes('papua') || rawName.toLowerCase().includes('irian')))) {
      return makeResult(
        'HOL',
        'Nederlands-Nieuw-Guinea (Nuova Guinea Olandese — Territorio d\'Oltremare dei Paesi Bassi)',
        "Liberata già nella primavera del 1944 dalle forze alleate del generale Douglas MacArthur (Operazioni Reckless e Horlicks a Hollandia e Biak) e trasformata nel colossale quartier generale avanzato del SWPA, la Nuova Guinea Occidentale è rimasta sotto saldo controllo olandese e alleato con sede del NICA a Hollandia. Esclusa dalla proclamazione della Repubblica di Sukarno e considerata da L'Aia come entità etnica e geografica distinta, rimarrà colonia e territorio d'oltremare dei Paesi Bassi fino al 1962.",
        'Alleati',
        'Koninkrijk der Nederlanden — Gouvernement van Nederlands-Nieuw-Guinea (Hollandia)'
      );
    }

    // Fallback generico per l'arcipelago
    return makeResult(
      'IDN',
      `${meta ? meta.historicalName : rawName} (Repubblica d'Indonesia — Proclamazione del 17 Agosto 1945)`,
      "Il 17 agosto 1945 Sukarno e Mohammad Hatta proclamano l'indipendenza della Repubblica d'Indonesia (Proklamasi Kemerdekaan Indonesia).",
      'Neutrale',
      'Republik Indonesia (Presidente Sukarno & Vicepresidente Mohammad Hatta)'
    );
  }

  // 3. Risoluzione canonica
  if (meta) {
    if (s >= 14 && (meta.id === 'IDPA' || (norm(meta.nutsName).includes('hollandia') && meta.id !== 'IDPB'))) {
      return makeResult(
        'USA',
        'Papua / Hollandia & Biak (Presidio Avanzato SWPA — Generale Douglas MacArthur)',
        'Nell\'aprile-maggio 1944 le forze statunitensi del SWPA sbarcano a Hollandia (Operazione Reckless) e sull\'isola di Biak (Operazione Horlicks); la rada di Humboldt Bay e gli aeroporti di Hollandia vengono trasformati nel colossale quartier generale avanzato del generale Douglas MacArthur per l\'imminente liberazione delle Filippine.',
        'Alleati',
        'Allied Southwest Pacific Area (Gen. Douglas MacArthur) & U.S. Sixth Army'
      );
    }
    if (s >= 14 && (meta.id === 'IDPB' || norm(meta.nutsName).includes('vogelkop') || norm(meta.nutsName).includes('manokwari'))) {
      if (s >= 15) {
        return makeResult(
          'JAP',
          'Papua Barat / Vogelkop (Sacca Isolata di Manokwari & Sbarco USA a Sansapor, Agosto 1944)',
          'A seguito dello sbarco anfibio statunitense a Cape Sansapor (Operazione Globetrotter, 30 luglio 1944) e della rapida costruzione della base aerea di Mar da parte dei genieri USA, la 2ª Armata imperiale giapponese del Ten. Gen. Fusataro Teshima a Manokwari (35ª Divisione) rimane completamente scavalcata e intrappolata nella giungla della penisola di Vogelkop senza alcun rifornimento o supporto navale.',
          'Asse',
          'Dai Nippon Teikoku — 2ª Armata (Ten. Gen. Fusataro Teshima — Sacca Isolata di Manokwari)'
        );
      }
      return makeResult(
        'JAP',
        'Papua Barat / Vogelkop & Manokwari (2ª Armata Giapponese del Ten. Gen. Teshima)',
        'Al 30 giugno 1944 la vasta penisola della "Testa d\'Uccello" (Vogelkop / Doberai) e il presidio di Manokwari rimangono sotto il saldo controllo della 2ª Armata imperiale giapponese (Ten. Gen. Fusataro Teshima, 35ª Divisione con oltre 50.000 effettivi). Tagliata fuori da ogni rifornimento dopo la perdita di Hollandia e Biak, la guarnigione presidia le baie di Manokwari, Sorong e Fakfak in attesa dello sbarco alleato (che avverrà a Cape Sansapor solo il 30 luglio 1944, lasciando Manokwari scavalcata e isolata fino alla resa).',
        'Asse',
        'Dai Nippon Teikoku — 2ª Armata (Ten. Gen. Fusataro Teshima — Quartier Generale di Manokwari)'
      );
    }
    if (s >= 10) {
      const japAdmin = meta.islandGroup === 'Java'
        ? 'Impero Giapponese — 16ª Armata (Ten. Gen. Hitoshi Imamura, Batavia / Giacarta — Resa di Kalijati dell\'8-9 marzo 1942)'
        : meta.islandGroup === 'Sumatra'
          ? 'Impero Giapponese — 25ª Armata (Amministrazione Militare di Sumatra & Pozzi Petroliferi di Palembang)'
          : 'Impero Giapponese — 2ª Flotta di Spedizione del Sud (Marina Imperiale Giapponese — Minseifu di Makassar/Ambon/Balikpapan)';
      const japName = `${meta.historicalName} (Occupazione Imperiale Giapponese — Marzo 1942)`;
      const japNote = `${meta.getNote(8)} Tra gennaio e marzo 1942 l'arcipelago delle Indie Orientali Olandesi è stato conquistato dalle forze dell'Impero Giapponese: dopo la cattura dei vitali pozzi petroliferi di Tarakan (11 gennaio), Balikpapan (24 gennaio) e Palembang (14-15 febbraio, tramite lancio di paracadutisti) e la distruzione della squadra navale alleata ABDACOM nella Battaglia del Mar di Giava (27 febbraio 1942), la 16ª Armata del Ten. Gen. Hitoshi Imamura è sbarcata a Giava costringendo il comandante del KNIL Gen. Hein ter Poorten e il Governatore Generale van Starkenborgh Stachouwer alla capitolazione incondizionata a Kalijati l'8-9 marzo 1942.`;
      return makeResult('JAP', japName, japNote, 'Asse', japAdmin);
    }
    const sov = meta.getSovereign ? meta.getSovereign(s) : meta.sovereign;
    const fac = meta.getFaction ? meta.getFaction(s) : meta.faction;
    const histName = meta.getHistoricalName ? meta.getHistoricalName(s) : meta.historicalName;
    const admin = meta.getAdminTitle ? meta.getAdminTitle(s) : meta.adminTitle;
    const note = meta.getNote(s);

    return makeResult(sov, histName, note, fac, admin);
  }

  // 4. Fallback per province indonesiane generiche
  if (s >= 10) {
    return makeResult(
      'JAP',
      'Indie Orientali Olandesi Occupate (Occupazione Imperiale Giapponese — Resa di Kalijati, 8-9 Marzo 1942)',
      'Dopo la vittoria navale giapponese nel Mar di Giava (27 febbraio 1942) e gli sbarchi della 16ª Armata a Giava, l\'8-9 marzo 1942 a Kalijati le forze reali delle Indie Orientali Olandesi (KNIL) si sono arrese all\'Impero Giapponese, consegnando a Tokyo gli immensi giacimenti di petrolio, gomma e stagno dell\'arcipelago.',
      'Asse',
      'Impero Giapponese — 16ª Armata & 2ª Flotta di Spedizione del Sud'
    );
  }
  const defaultHistName = 'Nederlands-Indië (Batavia)';
  const defaultAdmin = 'Nederlands-Indië — Gouverneur-Generaal Jhr. A.W.L. Tjarda van Starkenborgh Stachouwer';
  const defaultNote = s >= 6
    ? "Colonia del Regno dei Paesi Bassi nell'Asia sud-orientale; in stato di guerra contro le potenze dell'Asse dopo l'invasione della madrepatria (maggio 1940); fornitore primario di petrolio e gomma per gli Alleati."
    : "Vasto impero coloniale del Regno dei Paesi Bassi nell'Oceano Indiano e Pacifico con capitale a Batavia; neutrale, tra i massimi produttori mondiali di petrolio, gomma, stagno e chinino.";
  const defaultFaction: FactionType = s >= 6 ? 'Alleati' : 'Neutrale';

  return makeResult('HOL', defaultHistName, defaultNote, defaultFaction, defaultAdmin);
}

/**
 * Risolutore geocartografico per Timor-Leste (Timor Português)
 */
export function resolveTimorLeste(ft: any, s: number): ResolvedTerritory {
  const meta = TIMOR_LESTE_META;
  if (s >= 18) {
    return makeResult(
      'POR',
      s >= 19
        ? 'Timor Português (Província Ultramarina de Timor — Sovranità Portoghese)'
        : 'Timor Português (Restaurazione della Sovranità Portoghese — Settembre 1945)',
      s >= 19
        ? "Al 30 settembre 1947 Timor Est è amministrata dal Portogallo come Província Ultramarina de Timor sotto il Governatore Óscar Freire de Vasconcelos Ruas, impegnata nella ricostruzione di Díli dopo l'occupazione bellica giapponese."
        : "Il 5 settembre 1945 le forze giapponesi a Timor firmano la resa a Kupang dinanzi alle truppe australiane del brigadiere Lewis Dyke; le unità alleate sbarcano a Díli per disarmare la guarnigione nipponica del colonnello Kaida. A fine settembre 1945 l'amministrazione coloniale dell'Império Colonial Português viene formalmente ripristinata sotto il Governatore Manuel de Abreu Ferreira de Carvalho, riaffermando la sovranità di Lisbona.",
      'Neutrale',
      s >= 19
        ? 'República Portuguesa — Província Ultramarina de Timor (Governador Óscar Ruas)'
        : 'República Portuguesa — Província Ultramarina de Timor (Governador Ferreira de Carvalho)'
    );
  }
  if (s >= 10) {
    return makeResult(
      'JAP',
      'Timor Português (Occupazione Militare Giapponese di Díli — 20 Febbraio 1942)',
      'Nonostante la formale neutralità del Portogallo di Salazar, nella notte tra il 19 e il 20 febbraio 1942 il 228° Reggimento di Fanteria giapponese e i fucilieri di marina della 3ª Forza da Sbarco Speciale di Yokosuka sono sbarcati a Díli, occupando Timor Est (mentre sulle montagne dell\'interno i commando australiani della Sparrow Force conducono un\'accanita guerriglia).',
      'Asse',
      'Impero Giapponese — Guarnigione Militare di Timor (Distaccamento Ito / 48ª Divisione)'
    );
  }
  const note = meta.getNote(s);
  return makeResult(meta.sovereign, meta.historicalName, note, meta.faction, meta.adminTitle);
}
