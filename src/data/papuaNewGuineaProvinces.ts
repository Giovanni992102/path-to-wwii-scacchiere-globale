/**
 * Dettaglio Geocartografico Storico delle 22 Province della Papua Nuova Guinea (1936-1941)
 *
 * Copertura integrale di tutte le 22 province e territori della Papua Nuova Guinea:
 * - Sovranità: Australia (AST) — Commonwealth of Australia / British Empire
 * - Fazione: Neutrale (Step 0-4, 1936 - apr 1939) -> Alleati (Step 5-8, set 1939 - 1941)
 * - Struttura Amministrativa Storica d'Epoca:
 *   1. Territory of Papua (Colonia e territorio del Commonwealth australiano dal 1906, capoluogo Port Moresby, Luogotenente-Governatore Sir Hubert Murray fino al 1940, poi Leonard Murray):
 *      - National Capital District (Port Moresby), Central, Gulf, Milne Bay, Northern (Oro), Western, Southern Highlands, Hela
 *   2. Mandated Territory of New Guinea (Mandato della Società delle Nazioni affidato all'Australia dal 1920, capoluogo Rabaul fino all'eruzione del 1937, poi trasferito a Lae, Amministratore Sir Walter McNicoll):
 *      - East New Britain (Rabaul), West New Britain, New Ireland (Kavieng), Manus (Admiralty Islands), Autonomous Region of Bougainville (Kieta/Buka),
 *      - Morobe (Lae/Wau/Bulolo), Madang, East Sepik (Wewak), West Sepik (Sandaun/Aitape),
 *      - Eastern Highlands, Western Highlands (Mount Hagen), Chimbu (Simbu), Enga, Jiwaka
 *
 * Dinamica Temporale (Step 0-8):
 * - Step 0-1 (1936 - mar 1938: Anteguerra, Amministrazione Murray & Eruzione di Rabaul):
 *   Amministrazione coloniale Murray a Port Moresby; catastrofica eruzione dei vulcani Tavurvur e Vulcan a Rabaul (maggio 1937) che induce il piano di trasferimento della capitale a Lae;
 *   boom dei giacimenti auriferi di Bulolo e Wau con il pionieristico ponte aereo cargo della Guinea Airways (Junkers G 31); prime esplorazioni dei grandi altopiani centrali (valle del Wahgi).
 * - Step 2-4 (ott 1938 - apr 1939: Pattuglia Hagen-Sepik & Allerta Pacifico):
 *   La monumentale pattuglia Hagen-Sepik (1938-1939) guidata da Jim Taylor e John Black attraversa le valli montane rivelando centinaia di migliaia di abitanti sconosciuti;
 *   crescente allerta difensiva nel Pacifico meridionale con istituzione della rete di avvistatori navali (*coastwatchers*) della Royal Australian Navy coordinati da Eric Feldt.
 * - Step 5-7 (set 1939 - ott 1940: Scoppio della WWII in Europa, Sforzo Bellico Alleato & Morte di Sir Hubert Murray):
 *   Dichiarazione di guerra dell'Australia alla Germania (3 settembre 1939, fazione Alleati); mobilitazione dei New Guinea Volunteer Rifles (NGVR);
 *   scomparsa di Sir Hubert Murray a Samarai nel febbraio 1940 dopo 32 anni di governo; attacchi dei corsari tedeschi (Orion e Komet) nelle acque melanesiane; allestimento basi idrovolanti PBY Catalina.
 * - Step 8 (apr 1941: Patto di Neutralità Sovietico-Giapponese, Dispiegamento Lark Force e Allerta Invasione):
 *   Il Patto di Mosca (13 aprile 1941) accresce il rischio di una discesa nipponica verso l'Oceano Indiano e il Pacifico meridionale;
 *   schieramento del battaglione 2/22nd AIF (*Lark Force*) a difesa di Rabaul; potenziamento delle difese costiere di Port Moresby, avamposti di Buna, Wau e dei campi d'aviazione del golfo di Huon.
 */

import { ResolvedTerritory, FactionType } from '../types';
import { makeResult } from './georesolver';

export interface PNGProvinceInfo {
  id: string;
  origId?: string | number;
  cntrCode: string; // 'PG'
  cntrName: string; // 'Papua Nuova Guinea'
  name: string;
  nutsName: string;
  nameLatn: string;
  nameEngl: string;
  modernName: string;
  historicalName: string;
  adminTitle: string;
  sovereign: string; // 'AST'
  overlord?: string; // 'British Empire'
  territoryGroup: 'Territory of Papua' | 'Mandated Territory of New Guinea';
  capital: string;
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

export const PNG_PROVINCES_META: Record<string, PNGProvinceInfo> = {
  // 1. Autonomous Region of Bougainville
  "PGNSB": {
    id: "PGNSB",
    origId: 1,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "Autonomous Region of Bougainville",
    nutsName: "Bougainville (Kieta / Buka)",
    nameLatn: "Bougainville",
    nameEngl: "Bougainville District",
    modernName: "Regione Autonoma di Bougainville (Papua Nuova Guinea)",
    historicalName: "Territory of New Guinea — Bougainville District (Kieta / Buka)",
    adminTitle: "Mandated Territory of New Guinea (Australia) — Bougainville District",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Mandated Territory of New Guinea',
    capital: "Kieta / Sohano",
    faction: "Neutrale",
    s0_1: "Distretto insulare mandatario australiano nelle Salomone settentrionali con sede a Kieta e Buka; floride piantagioni di cocco ed esportazione di copra.",
    s2_4: "Istituzione di postazioni di coastwatchers della Royal Australian Navy (Jack Read e Paul Mason) sulle creste della catena dell'Imperatore per sorvegliare le rotte oceaniche.",
    s5_7: "In stato di guerra con gli Alleati dopo la dichiarazione australiana del settembre 1939; rafforzamento della rete d'intelligence costiera e vigilanza sui passaggi navali di Buka.",
    s8: "Allerta massima per le mire della Marina Imperiale Giapponese verso il Pacifico meridionale; coordinamento dei coastwatchers per il monitoraggio aereo e marittimo delle rotte per Rabaul.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 2. Central Province
  "PGCPM": {
    id: "PGCPM",
    origId: 2,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "Central Province",
    nutsName: "Central (Kairuku / Rigo / Sogeri)",
    nameLatn: "Central",
    nameEngl: "Central Division",
    modernName: "Provincia Centrale (Papua Nuova Guinea)",
    historicalName: "Territory of Papua — Central Division (Rigo / Kairuku / Sogeri)",
    adminTitle: "Territory of Papua (Commonwealth of Australia) — Central Division",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Territory of Papua',
    capital: "Port Moresby / Rigo",
    faction: "Neutrale",
    s0_1: "Divisione centrale del Territorio della Papua lungo la costa meridionale; vaste piantagioni di gomma (*hevea*) sull'altopiano di Sogeri ai piedi dei monti Owen Stanley.",
    s2_4: "Espansione delle colture agricole e sviluppo della pista rotabile per l'altopiano di Sogeri; stazioni di polizia coloniale a Rigo e Kairuku.",
    s5_7: "Coinvolgimento diretto nella mobilitazione bellica alleata; la produzione di gomma naturale di Sogeri assume valore strategico vitale per l'industria degli Alleati.",
    s8: "Rafforzamento dei presidi nell'entroterra e controllo degli accessi montani che conducono ai passi della catena montuosa degli Owen Stanley.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 3. Chimbu (Simbu) Province
  "PGCPK": {
    id: "PGCPK",
    origId: 3,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "Chimbu (Simbu) Province",
    nutsName: "Chimbu (Kundiawa / Mount Wilhelm)",
    nameLatn: "Chimbu",
    nameEngl: "Chimbu District",
    modernName: "Provincia di Chimbu / Simbu (Papua Nuova Guinea)",
    historicalName: "Territory of New Guinea — Chimbu Valley / Wahgi (Kundiawa)",
    adminTitle: "Mandated Territory of New Guinea — Chimbu Sub-District",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Mandated Territory of New Guinea',
    capital: "Kundiawa",
    faction: "Neutrale",
    s0_1: "Valle montuosa ad altissima densità indigena dominata dal massiccio del monte Wilhelm (4.509 m); contattata nei primi anni '30 durante le spedizioni di Michael Leahy.",
    s2_4: "Stabilimento della stazione governativa permanente di Kundiawa lungo la gola del fiume Chimbu; avvio dei primi censimenti e missioni cattoliche e luterane.",
    s5_7: "Zona montuosa interna posta sotto regime di territorio controllato dal mandato australiano; mantenimento della pace intertribale sotto la sorveglianza dei *kiaps*.",
    s8: "Punto di snodo geografico strategico per il monitoraggio dei collegamenti tra gli Altopiani Orientali e la vallata del Wahgi.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 4. East New Britain Province
  "PGEBR": {
    id: "PGEBR",
    origId: 4,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "East New Britain Province",
    nutsName: "East New Britain (Rabaul / Simpson Harbour)",
    nameLatn: "East New Britain",
    nameEngl: "East New Britain District",
    modernName: "Provincia della Nuova Britannia Orientale (Papua Nuova Guinea)",
    historicalName: "Territory of New Guinea — New Britain District (Rabaul / Simpson Harbour)",
    adminTitle: "Mandated Territory of New Guinea — Capital Seat of Administration (Rabaul)",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Mandated Territory of New Guinea',
    capital: "Rabaul",
    faction: "Neutrale",
    s0_1: "Capitale amministrativa del Mandato della Nuova Guinea nella caldera vulcanica di Simpson Harbour; a maggio 1937 l'eruzione gemella di Tavurvur e Vulcan distrugge Rabaul.",
    s2_4: "L'amministrazione McNicoll delibera il trasferimento graduale della capitale a Lae; Rabaul rimane la base aeronavale primaria con le piste di Lakunai e Vunakanau.",
    s5_7: "Dichiarazione di guerra australiana; Rabaul viene trasformata in perno strategico di difesa avanzata dell'Impero Britannico nel Pacifico sudoccidentale.",
    s8: "Dispiegamento della *Lark Force* australiana (2/22nd Battalion AIF, 1.400 uomini) per blindare Rabaul contro l'incombente offensiva nipponica verso il Mar dei Coralli.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 5. East Sepik Province
  "PGESW": {
    id: "PGESW",
    origId: 5,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "East Sepik Province",
    nutsName: "East Sepik (Wewak / Ambunti)",
    nameLatn: "East Sepik",
    nameEngl: "East Sepik District",
    modernName: "Provincia del Sepik Orientale (Papua Nuova Guinea)",
    historicalName: "Territory of New Guinea — Sepik District (Wewak / Ambunti)",
    adminTitle: "Mandated Territory of New Guinea — Sepik District",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Mandated Territory of New Guinea',
    capital: "Wewak",
    faction: "Neutrale",
    s0_1: "Vasto bacino fluviale del Sepik navigabile per centinaia di miglia; stazione governativa fluviale di Ambunti e sviluppo del porto costiero di Wewak.",
    s2_4: "Sviluppo dell'avamposto costiero di Wewak come centro distrettuale e pista d'atterraggio per i collegamenti con i monti Torricelli e Maprik.",
    s5_7: "Pattugliamenti fluviali della polizia mandataria e sorveglianza costiera alle foci del Sepik e del Ramu.",
    s8: "Presidio costiero settentrionale in allerta contro possibili sbarchi o ricognizioni navali giapponesi provenienti dalle basi delle Caroline e Palau.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 6. Eastern Highlands Province
  "PGEHG": {
    id: "PGEHG",
    origId: 6,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "Eastern Highlands Province",
    nutsName: "Eastern Highlands (Goroka / Kainantu)",
    nameLatn: "Eastern Highlands",
    nameEngl: "Eastern Highlands District",
    modernName: "Provincia degli Altopiani Orientali (Papua Nuova Guinea)",
    historicalName: "Territory of New Guinea — Eastern Highlands / Goroka (Asaro Valley)",
    adminTitle: "Mandated Territory of New Guinea — Central Highlands Division",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Mandated Territory of New Guinea',
    capital: "Goroka / Kainantu",
    faction: "Neutrale",
    s0_1: "Vallata dell'Asaro e bacino montano di Goroka e Kainantu; estrazione d'oro alluvionale e prime piste aeree aperte da piloti civili australiani.",
    s2_4: "Transito delle grandi pattuglie di ricognizione verso l'interno; insediamento della prima stazione di polizia e monitoraggio delle popolazioni montane.",
    s5_7: "Riserva strategica alimentare e manodopera per le basi alleate della costa; mantenimento dell'ordine coloniale in tempo di guerra.",
    s8: "Snodo vitale di comunicazione interna e potenziale via di ritirata montuosa in caso di aggressione giapponese alle città costiere di Lae e Madang.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 7. Enga Province
  "PGEPW": {
    id: "PGEPW",
    origId: 7,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "Enga Province",
    nutsName: "Enga (Wabag / Lagaip)",
    nameLatn: "Enga",
    nameEngl: "Enga District",
    modernName: "Provincia di Enga (Papua Nuova Guinea)",
    historicalName: "Territory of New Guinea — Western Highlands / Enga (Wabag Valley)",
    adminTitle: "Mandated Territory of New Guinea — Uncontrolled Highlands Area",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Mandated Territory of New Guinea',
    capital: "Wabag",
    faction: "Neutrale",
    s0_1: "Regione montana remota della vallata del Lagaip a oltre 2.000 metri di quota, non ancora raggiunta dalla presenza amministrativa permanente.",
    s2_4: "La memorabile pattuglia Hagen-Sepik del 1938-1939 (Taylor e Black) entra a Wabag, scoprendo una fitta popolazione parlante la lingua enga.",
    s5_7: "Zona montana chiusa (*Uncontrolled Area Ordinance*) dove l'accesso è riservato esclusivamente a spedizioni autorizzate del governo mandatario.",
    s8: "Territorio intatto e isolato dagli eventi bellici globali, protetto da formidabili barriere montuose e gole calcaree.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 8. Gulf Province
  "PGGPK": {
    id: "PGGPK",
    origId: 8,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "Gulf Province",
    nutsName: "Gulf (Kerema / Kikori)",
    nameLatn: "Gulf",
    nameEngl: "Gulf Division",
    modernName: "Provincia del Golfo (Papua Nuova Guinea)",
    historicalName: "Territory of Papua — Gulf Division (Kerema / Kikori)",
    adminTitle: "Territory of Papua — Gulf Division",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Territory of Papua',
    capital: "Kerema",
    faction: "Neutrale",
    s0_1: "Ampio delta fluviale coperto da mangrovie del Kikori e Purari affacciato sul Golfo di Papua; avvio delle prime prospezioni petrolifere della Australasian Petroleum Company.",
    s2_4: "Esplorazioni geologiche e idrografiche costiere; scambi di sago e copra tra i villaggi costieri e Port Moresby via naviglio costiero.",
    s5_7: "Mobilitazione delle risorse costiere e intensificazione dei rilievi per la ricerca di idrocarburi strategici per il rifornimento alleato.",
    s8: "Sorveglianza delle acque del Golfo di Papua e delle rotte di cabotaggio che uniscono Daru e la costa occidentale a Port Moresby.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 9. Hela Province
  "PGHLA": {
    id: "PGHLA",
    origId: 9,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "Hela Province",
    nutsName: "Hela (Tari Basin)",
    nameLatn: "Hela",
    nameEngl: "Hela / Tari District",
    modernName: "Provincia di Hela (Papua Nuova Guinea)",
    historicalName: "Territory of Papua — Huli Basin / Southern Highlands (Tari)",
    adminTitle: "Territory of Papua — Uncontrolled Inland Area (Tari)",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Territory of Papua',
    capital: "Tari",
    faction: "Neutrale",
    s0_1: "Bacino di Tari popolato dalla fiera etnia Huli; territorio inesplorato attraversato per la prima volta nel 1935 dalla pattuglia papuana di Jack Hides e Jim O'Malley.",
    s2_4: "Area dichiarata non controllata; contatti sporadici tramite pattuglie aeree e spedizioni governative provenienti dalla stazione di Lake Kutubu.",
    s5_7: "Isolamento geografico assoluto; le valli rimangono estranee alla guerra mondiale mantenendo intatte le tradizioni indigene.",
    s8: "Preservazione dell'autonomia consuetudinaria locale sotto formale sovranità australiana.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 10. Jiwaka Province
  "PGJWK": {
    id: "PGJWK",
    origId: 10,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "Jiwaka Province",
    nutsName: "Jiwaka (Wahgi Valley / Minj)",
    nameLatn: "Jiwaka",
    nameEngl: "Jiwaka District",
    modernName: "Provincia di Jiwaka (Papua Nuova Guinea)",
    historicalName: "Territory of New Guinea — Wahgi Valley (Minj / Banz)",
    adminTitle: "Mandated Territory of New Guinea — Wahgi Valley Sub-District",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Mandated Territory of New Guinea',
    capital: "Minj / Banz",
    faction: "Neutrale",
    s0_1: "Verdeggiante vallata del medio fiume Wahgi scoperta nel 1933; suoli vulcanici ricchi e millenari sistemi di canalizzazione agricola (*Kuk Swamp*).",
    s2_4: "Costruzione di piste d'atterraggio improvvisate a Minj e Banz per consentire l'accesso agli idrovolanti e aerei leggeri dei cercatori d'oro e missionari.",
    s5_7: "Tranquillità interna sotto l'amministrazione del mandato australiano; supporto logistico di sussistenza per i presidi montani.",
    s8: "Valle strategica di transito aereo e terrestre per il pattugliamento delle alture centrali della Nuova Guinea.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 11. Madang Province
  "PGMPM": {
    id: "PGMPM",
    origId: 11,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "Madang Province",
    nutsName: "Madang (Astrolabe Bay / Bogia)",
    nameLatn: "Madang",
    nameEngl: "Madang District",
    modernName: "Provincia di Madang (Papua Nuova Guinea)",
    historicalName: "Territory of New Guinea — Madang District (Friedrich-Wilhelmshafen)",
    adminTitle: "Mandated Territory of New Guinea — Madang District",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Mandated Territory of New Guinea',
    capital: "Madang",
    faction: "Neutrale",
    s0_1: "Rinomato porto coloniale nella baia dell'Astrolabio, già capitale della Nuova Guinea Tedesca (Friedrich-Wilhelmshafen); grandi piantagioni di palme da cocco.",
    s2_4: "Centro di penetrazione commerciale e missionaria verso la valle del fiume Ramu e la catena montuosa Bismarck; allestimento della pista d'aviazione locale.",
    s5_7: "Dichiarazione di guerra; internamento dei residenti tedeschi e missionari luterani sospetti; attivazione del corpo New Guinea Volunteer Rifles.",
    s8: "Rafforzamento dei posti d'osservazione costieri a Madang e Bogia per monitorare le rotte marittime verso il canale di Vitiaz.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 12. Manus Province
  "PGMRL": {
    id: "PGMRL",
    origId: 12,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "Manus Province",
    nutsName: "Manus (Admiralty Islands / Lorengau)",
    nameLatn: "Manus",
    nameEngl: "Manus District",
    modernName: "Provincia di Manus (Papua Nuova Guinea)",
    historicalName: "Territory of New Guinea — Manus District (Admiralty Islands / Lorengau)",
    adminTitle: "Mandated Territory of New Guinea — Manus District",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Mandated Territory of New Guinea',
    capital: "Lorengau",
    faction: "Neutrale",
    s0_1: "Arcipelago delle Isole dell'Ammiragliato nell'Oceano Pacifico equatoriale; Seeadler Harbour costituisce uno dei più maestosi ancoraggi naturali protetti del globo.",
    s2_4: "Raccolta di perle, conchiglie madreperlacee (*trochus*) e copra sotto l'amministrazione mandataria con sede distrettuale a Lorengau.",
    s5_7: "Attivazione di posti di vedetta marittima (*coastwatchers*) per l'avvistamento di naviglio oceanico tra le Caroline e l'arcipelago di Bismarck.",
    s8: "Posizione di estrema rilevanza geostrategica all'imbocco settentrionale del Mar di Bismarck; ricognizioni aeree per contrastare l'espansionismo nipponico.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 13. Milne Bay Province
  "PGMBA": {
    id: "PGMBA",
    origId: 13,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "Milne Bay Province",
    nutsName: "Milne Bay (Samarai / Trobriand / Louisiades)",
    nameLatn: "Milne Bay",
    nameEngl: "Eastern Division",
    modernName: "Provincia della Baia di Milne (Papua Nuova Guinea)",
    historicalName: "Territory of Papua — Eastern Division (Samarai / Milne Bay / Trobriand)",
    adminTitle: "Territory of Papua — Eastern Division",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Territory of Papua',
    capital: "Samarai",
    faction: "Neutrale",
    s0_1: "L'isola di Samarai è il secondo porto e centro doganale della Papua; comprende gli arcipelaghi delle Trobriand (celebri per gli studi antropologici di Malinowski) e delle Louisiades.",
    s2_4: "Traffici marittimi attivi tra la baia di Milne e l'Australia; esplorazioni minerarie e commercio di copra ed essenze lignee pregiate.",
    s5_7: "A febbraio 1940 muore a Samarai il Luogotenente-Governatore Sir Hubert Murray; l'insenatura profonda della Baia di Milne viene valutata per una futura base navale avanzata.",
    s8: "Allestimento di batterie di difesa costiera e presidi di sorveglianza all'imbocco tra il Mar dei Coralli e il Mar delle Salomone.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 14. Morobe Province
  "PGMPL": {
    id: "PGMPL",
    origId: 14,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "Morobe Province",
    nutsName: "Morobe (Lae / Salamaua / Bulolo / Wau)",
    nameLatn: "Morobe",
    nameEngl: "Morobe District",
    modernName: "Provincia di Morobe (Papua Nuova Guinea)",
    historicalName: "Territory of New Guinea — Morobe District (Lae / Salamaua / Bulolo / Wau)",
    adminTitle: "Mandated Territory of New Guinea — Morobe District",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Mandated Territory of New Guinea',
    capital: "Salamaua / Lae",
    faction: "Neutrale",
    s0_1: "Epicentro del colossale boom aurifero di Bulolo e Wau; la Guinea Airways gestisce il più trafficato ponte aereo cargo al mondo con trimotori pesanti Junkers G 31.",
    s2_4: "In seguito alla distruzione vulcanica di Rabaul nel 1937, Lae sul golfo di Huon viene selezionata ufficialmente come nuova capitale del Mandato della Nuova Guinea.",
    s5_7: "Ingresso nella WWII a fianco degli Alleati; costituzione del battaglione New Guinea Volunteer Rifles (NGVR) a Wau e Lae; estrazione record d'oro per le riserve belliche.",
    s8: "Completamento delle nuove sedi amministrative a Lae e potenziamento degli aerodromi costieri a difesa della costa settentrionale papuana.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 15. National Capital District (Port Moresby)
  "PGNCD": {
    id: "PGNCD",
    origId: 15,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "National Capital District",
    nutsName: "Port Moresby (Capital / Fairfax Harbour)",
    nameLatn: "Port Moresby",
    nameEngl: "Port Moresby Capital District",
    modernName: "Distretto della Capitale Nazionale (Port Moresby, Papua Nuova Guinea)",
    historicalName: "Territory of Papua — Seat of Government (Port Moresby / Fairfax Harbour)",
    adminTitle: "Territory of Papua (Commonwealth of Australia) — Capital Seat of Lieutenant-Governor",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Territory of Papua',
    capital: "Port Moresby",
    faction: "Neutrale",
    s0_1: "Capitale e sede del governo coloniale della Papua affacciata sull'eccellente rada naturale di Fairfax Harbour; governo autoritario e paternalista di Sir Hubert Murray.",
    s2_4: "Sviluppo dell'aeroporto Seven Mile (Jackson Field) e della base idrovolanti per i collegamenti aerei di linea regolari con Cairns e Sydney.",
    s5_7: "La capitale entra in guerra; insediamento del nipote Leonard Murray come amministratore; installazione di cannoni costieri da 6 pollici sulla collina di Paga Hill.",
    s8: "Rafforzamento della guarnigione australiana con la 30th Brigade e dislocazione degli Squadroni 11 e 20 della RAAF equipaggiati con idrovolanti ricognitori PBY Catalina.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 16. New Ireland Province
  "PGNIK": {
    id: "PGNIK",
    origId: 16,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "New Ireland Province",
    nutsName: "New Ireland (Kavieng / Neumecklenburg)",
    nameLatn: "New Ireland",
    nameEngl: "New Ireland District",
    modernName: "Provincia della Nuova Irlanda (Papua Nuova Guinea)",
    historicalName: "Territory of New Guinea — New Ireland District (Kavieng / Neumecklenburg)",
    adminTitle: "Mandated Territory of New Guinea — New Ireland District",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Mandated Territory of New Guinea',
    capital: "Kavieng",
    faction: "Neutrale",
    s0_1: "Isola allungata attraversata dalla Boluminski Highway; porto principale a Kavieng con intensivo sfruttamento delle piantagioni di noce di cocco e copra.",
    s2_4: "Sede distrettuale del mandato australiano; commercio marittimo costiero e contatti con le isole adiacenti (New Hanover e arcipelago di Tabar).",
    s5_7: "Presidio di vigilanza costiera dei *coastwatchers* a Kavieng e Namatanai per intercettare movimenti navali nemici nel passaggio di Steffen.",
    s8: "Schieramento della Compagnia '1st Independent Company' di commando australiani a Kavieng come presidio d'allarme avanzato a nord di Rabaul.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 17. Northern (Oro) Province
  "PGNPP": {
    id: "PGNPP",
    origId: 17,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "Northern (Oro) Province",
    nutsName: "Northern / Oro (Buna / Kokoda / Gona)",
    nameLatn: "Northern (Oro)",
    nameEngl: "Northern Division",
    modernName: "Provincia Settentrionale / Oro (Papua Nuova Guinea)",
    historicalName: "Territory of Papua — Northern Division (Buna / Kokoda / Gona)",
    adminTitle: "Territory of Papua — Northern Division",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Territory of Papua',
    capital: "Buna / Kokoda",
    faction: "Neutrale",
    s0_1: "Divisione settentrionale della Papua con scali costieri a Buna e Gona; stazione di polizia coloniale montana a Kokoda, snodo del sentiero pedonale per Port Moresby.",
    s2_4: "Sfruttamento di piccole concessioni aurifere lungo il fiume Yodda; la pista di Kokoda (*Kokoda Trail*) attraverso gli Owen Stanley è l'unica via di transito terrestre.",
    s5_7: "Sorveglianza militare dei passi montani; la stazione governativa di Kokoda funge da perno per il controllo degli accessi all'altopiano di Sogeri.",
    s8: "Rilevanza strategica della pista di Kokoda per la difesa di Port Moresby; allerta per possibili manovre di aggiramento anfibio lungo le spiagge di Buna e Sanananda.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 18. Southern Highlands Province
  "PGSHM": {
    id: "PGSHM",
    origId: 18,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "Southern Highlands Province",
    nutsName: "Southern Highlands (Mendi / Lake Kutubu)",
    nameLatn: "Southern Highlands",
    nameEngl: "Southern Highlands District",
    modernName: "Provincia degli Altopiani Meridionali (Papua Nuova Guinea)",
    historicalName: "Territory of Papua — Southern Highlands / Lake Kutubu (Mendi)",
    adminTitle: "Territory of Papua — Inland Exploration Division",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Territory of Papua',
    capital: "Mendi / Lake Kutubu",
    faction: "Neutrale",
    s0_1: "Zona calcarea montuosa dominata dal monte Giluwe (4.367 m); nel 1937 viene stabilita una base governativa sul lago Kutubu per idrovolanti da pattugliamento.",
    s2_4: "Le spedizioni di Ivan Champion e Claude Champion esplorano le valli di Mendi e Ialibu stabilendo i primi contatti pacifici con le tribù locali.",
    s5_7: "Territorio dell'entroterra montuoso mantenuto sotto stretta riserva governativa con pattugliamenti di polizia indigena papuana.",
    s8: "Baluardo naturale inaccessibile della dorsale montuosa centrale papuana.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 19. West New Britain Province
  "PGWBK": {
    id: "PGWBK",
    origId: 19,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "West New Britain Province",
    nutsName: "West New Britain (Talasea / Kimbe)",
    nameLatn: "West New Britain",
    nameEngl: "West New Britain District",
    modernName: "Provincia della Nuova Britannia Occidentale (Papua Nuova Guinea)",
    historicalName: "Territory of New Guinea — Talasea / West New Britain (Kimbe)",
    adminTitle: "Mandated Territory of New Guinea — Talasea Sub-District",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Mandated Territory of New Guinea',
    capital: "Talasea",
    faction: "Neutrale",
    s0_1: "Sottodistretto di Talasea sulla penisola di Willaumez; terra vulcanica con sorgenti termali, ricchi giacimenti storici di ossidiana e piantagioni litoranee di copra.",
    s2_4: "Stazione amministrativa costiera di Talasea e cabotaggio lungo la baia di Kimbe verso la sede di Rabaul.",
    s5_7: "Attivazione dei posti di coastwatching navale lungo la costa settentrionale dell'isola di Nuova Britannia.",
    s8: "Pattugliamento delle insenature di Kimbe e Hoskins per monitorare i movimenti navali verso lo stretto di Dampier.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 20. West Sepik (Sandaun) Province
  "PGSAN": {
    id: "PGSAN",
    origId: 20,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "West Sepik (Sandaun) Province",
    nutsName: "West Sepik (Aitape / Vanimo / 141° E)",
    nameLatn: "West Sepik",
    nameEngl: "West Sepik District",
    modernName: "Provincia del Sepik Occidentale / Sandaun (Papua Nuova Guinea)",
    historicalName: "Territory of New Guinea — Aitape / West Sepik District (Vanimo / 141° E)",
    adminTitle: "Mandated Territory of New Guinea — Aitape District",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Mandated Territory of New Guinea',
    capital: "Aitape",
    faction: "Neutrale",
    s0_1: "Distretto di Aitape confinante con la Nuova Guinea Olandese lungo il 141º meridiano est; stazioni costiere ad Aitape e Vanimo.",
    s2_4: "Pattugliamenti di frontiera nei monti Torricelli e Bewani; monitoraggio delle missioni cattoliche dei Verbiti e contatti con la confinante Hollandia olandese.",
    s5_7: "Rafforzamento della sorveglianza confinaria con la Nuova Guinea Olandese (alleata dopo l'invasione dei Paesi Bassi del maggio 1940).",
    s8: "Presidio di confine settentrionale a difesa delle vie d'accesso occidentali verso il bacino del Sepik e la costa melanesiana.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 21. Western Highlands Province
  "PGWHM": {
    id: "PGWHM",
    origId: 21,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "Western Highlands Province",
    nutsName: "Western Highlands (Mount Hagen / Wahgi)",
    nameLatn: "Western Highlands",
    nameEngl: "Western Highlands District",
    modernName: "Provincia degli Altopiani Occidentali (Papua Nuova Guinea)",
    historicalName: "Territory of New Guinea — Mount Hagen / Upper Wahgi Valley",
    adminTitle: "Mandated Territory of New Guinea — Mount Hagen Sub-District",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Mandated Territory of New Guinea',
    capital: "Mount Hagen",
    faction: "Neutrale",
    s0_1: "Stazione pionieristica e pista aerea di Mount Hagen stabilita dai fratelli Leahy nell'alta valle del Wahgi; terra densamente popolata e sconosciuta al mondo esterno fino al 1933.",
    s2_4: "Base di partenza della monumentale spedizione Hagen-Sepik del 1938-1939 guidata da Jim Taylor, che mappa l'intero entroterra occidentale fino al confine olandese.",
    s5_7: "Consolidamento del presidio amministrativo mandatario e apertura delle prime vie di comunicazione pedonali tra le valli montane.",
    s8: "Nodo centrale dell'aviazione leggera coloniale negli altopiani della Nuova Guinea.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  },

  // 22. Western Province
  "PGWPD": {
    id: "PGWPD",
    origId: 22,
    cntrCode: 'PG',
    cntrName: 'Papua Nuova Guinea',
    name: "Western Province",
    nutsName: "Western (Fly River / Daru Island)",
    nameLatn: "Western",
    nameEngl: "Western Division",
    modernName: "Provincia Occidentale / Fly River (Papua Nuova Guinea)",
    historicalName: "Territory of Papua — Western Division (Fly River / Daru Island)",
    adminTitle: "Territory of Papua — Western Division",
    sovereign: "AST",
    overlord: "British Empire",
    territoryGroup: 'Territory of Papua',
    capital: "Daru Island",
    faction: "Neutrale",
    s0_1: "La più vasta divisione della Papua, solcata dagli imponenti fiumi Fly e Strickland fino al Lago Murray; capitale a Daru Island nello Stretto di Torres.",
    s2_4: "Controllo del confine internazionale con la Nuova Guinea Olandese (Trattato del 1895 con ansa del Fly River); pattugliamenti fluviali su lance a motore.",
    s5_7: "Vigilanza strategica nello Stretto di Torres a protezione delle rotte marittime tra l'Australia settentrionale e la Papua; cooperazione con le autorità coloniali olandesi di Merauke.",
    s8: "Rafforzamento delle vedette costiere e navali per impedire infiltrazioni ostili attraverso i banchi di corallo e i canali dello Stretto di Torres.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    },
    getFaction: (s: number) => s >= 5 ? 'Alleati' : 'Neutrale'
  }
};

// Step 10 (AGO 1942 — 31 agosto 1942): Espansione giapponese nel Pacifico sud-occidentale e campagna di Nuova Guinea
// - Rabaul e Nuova Britannia (PGEBR, PGWBK), Nuova Irlanda/Kavieng (PGNIK), Bougainville (PGNSB) e Manus/Ammiragliato (PGMRL) conquistate tra gennaio e aprile 1942
// - Costa settentrionale della Nuova Guinea: Lae e Salamaua (PGMPL, 8 marzo 1942), Madang (PGMPM), Wewak/Sepik (PGESW, PGSAN)
// - Sbarco a Buna e Gona (PGNPP, 21 luglio 1942) e avanzata del Distaccamento dei Mari del Sud lungo il Sentiero di Kokoda (Battaglia di Isurava, 26-31 agosto 1942)
// - Battaglia di Milne Bay (PGMBA, 25 agosto - 7 settembre 1942): la guarnigione australiana-americana respinge lo sbarco giapponese
const PNG_JAP_OCCUPIED_AUG1942 = new Set<string>([
  'PGEBR', // East New Britain (Rabaul — conquistata il 23 gennaio 1942, Quartier Generale dell'8ª Flotta e 17ª Armata giapponese)
  'PGWBK', // West New Britain (Gasmata)
  'PGNIK', // New Ireland (Kavieng — conquistata il 24 gennaio 1942)
  'PGNSB', // Bougainville (Buka e Kieta — occupate nel marzo 1942)
  'PGMRL', // Manus / Isole dell'Ammiragliato (Lorengau — occupate l'8 aprile 1942)
  'PGMPL', // Morobe (Lae e Salamaua — occupate l'8 marzo 1942)
  'PGMPM', // Madang
  'PGESW', // East Sepik (Wewak)
  'PGSAN', // West Sepik (Hollandia/Aitape littoral)
  'PGNPP', // Northern / Oro (sbarco a Buna-Gona il 21 luglio 1942 e offensiva sulla pista di Kokoda)
]);

for (const meta of Object.values(PNG_PROVINCES_META)) {
  const origFac = meta.getFaction.bind(meta);
  const origNote = meta.getNote.bind(meta);
  const isJap10 = PNG_JAP_OCCUPIED_AUG1942.has(meta.id);

  meta.getSovereign = (s: number) => {
    if (s >= 10 && isJap10) return 'JAP';
    return meta.sovereign;
  };
  meta.getFaction = (s: number) => {
    if (s >= 10 && isJap10) return 'Asse';
    return origFac(s);
  };
  meta.getHistoricalName = (s: number) => {
    if (s >= 10) {
      if (meta.id === 'PGEBR') return 'Rabaul / Nuova Britannia (Piazzaforte Aeronavale Giapponese dell\'8ª Flotta — Gennaio-Agosto 1942)';
      if (meta.id === 'PGNPP') return 'Buna-Gona & Sentiero di Kokoda (Offensiva del Distaccamento dei Mari del Sud — Agosto 1942)';
      if (meta.id === 'PGMPL') return 'Lae-Salamaua & Wau (Teste di Ponte Giapponesi sul Golfo di Huon & Kanga Force Australiana)';
      if (meta.id === 'PGMBA') return 'Milne Bay (Battaglia di Milne Bay — 25-31 Agosto 1942, Difesa Australiana-Alleata)';
      if (meta.id === 'PGNCD') return 'Port Moresby (Bastione Strategico Alleato & Quartier Generale New Guinea Force — Agosto 1942)';
      if (isJap10) return `${meta.historicalName} (Occupazione Militare Giapponese — 1942)`;
    }
    return meta.historicalName;
  };
  meta.getAdminTitle = (s: number) => {
    if (s >= 10) {
      if (isJap10) {
        return 'Impero Giapponese — 8ª Flotta Imperiale (Viceamm. Gunichi Mikawa) & 17ª Armata / Distaccamento dei Mari del Sud (Rabaul)';
      }
      return `${meta.adminTitle} — Comando Alleato SWPA (Gen. Douglas MacArthur / Gen. Thomas Blamey — New Guinea Force)`;
    }
    return meta.adminTitle;
  };
  meta.getNote = (s: number) => {
    if (s >= 10) {
      if (meta.id === 'PGEBR') {
        return "Rabaul (Nuova Britannia) · Conquistata il 23 gennaio 1942 dal Distaccamento dei Mari del Sud (Magg. Gen. Tomitarō Horii) dopo aver travolto la Lark Force australiana, la caldera di Rabaul (Simpson Harbour) è stata trasformata nella più formidabile roccaforte aeronavale dell'Impero Giapponese nel Pacifico meridionale, sede dell'8ª Flotta del Viceamm. Gunichi Mikawa e della 17ª Armata del Ten. Gen. Harukichi Hyakutake, da cui partono le operazioni contro Guadalcanal e Port Moresby.";
      }
      if (meta.id === 'PGNPP') {
        return "Buna, Gona e Sentiero di Kokoda · Dopo che la Battaglia del Mar dei Coralli (4-8 maggio 1942) ha sventato lo sbarco anfibio diretto su Port Moresby (Operazione MO), il 21 luglio 1942 il Distaccamento dei Mari del Sud giapponese è sbarcato a Buna e Gona sulla costa settentrionale papuana per marciare via terra oltre la catena degli Owen Stanley lungo l'impervio Sentiero di Kokoda (Kokoda Track). Tra il 26 e il 31 agosto 1942 infuria nella giungla la sanguinosa Battaglia di Isurava contro il 39° Battaglione e la 21ª Brigata AIF australiana.";
      }
      if (meta.id === 'PGMBA') {
        return "Baia di Milne (Milne Bay) · Nella notte del 25 agosto 1942 i fucilieri di marina giapponesi (Forze da Sbarco Speciali di Kure e Sasebo) sbarcano a Milne Bay per catturare gli aeroporti alleati all'estremità orientale della Papua: al 31 agosto 1942 la guarnigione australiana (Milne Force del Magg. Gen. Cyril Clowes, 7ª e 18ª Brigata AIF e caccia Kittyhawk n. 75 e 76 RAAF) sta infliggendo ai giapponesi la loro prima netta sconfitta terrestre della guerra del Pacifico.";
      }
      if (meta.id === 'PGNCD' || meta.id === 'PGCPM') {
        return "Port Moresby e Catena degli Owen Stanley · Ultimo baluardo alleato a difesa dell'Australia settentrionale: salvata a maggio dalla Battaglia del Mar dei Coralli, al 31 agosto 1942 Port Moresby è il centro nevralgico della New Guinea Force australiana e della 5th Air Force statunitense, mentre a poche decine di chilometri a nord, sulle creste nebbiose del Sentiero di Kokoda, i 'Diggers' australiani contendono passo dopo passo l'avanzata giapponese.";
      }
      if (isJap10) {
        return `${origNote(8)} Tra gennaio e aprile 1942 il territorio è stato occupato dalle forze anfibie dell'Impero Giapponese (presa di Kavieng il 24 gennaio, di Lae e Salamaua l'8 marzo, di Bougainville a marzo e delle Isole dell'Ammiragliato l'8 aprile 1942), costituendo il perimetro difensivo esterno di Rabaul.`;
      }
    }
    return origNote(s);
  };
}

/**
 * Risolutore geocartografico per le province della Papua Nuova Guinea
 */
export function resolvePapuaNewGuineaProvince(ft: any, s: number): ResolvedTerritory {
  if (!ft) return makeResult('AST', 'Papua New Guinea', 'Territory of Papua and New Guinea');

  const p = ft.properties || {};
  const fidClean = String(ft.id || p.id || p.NUTS_ID || '').trim();
  const rawName = String(p.HISTORICAL_NAME || p.NAME || p.name || '');

  // 1. Ricerca diretta per codice ISO
  let meta = PNG_PROVINCES_META[fidClean];

  // 2. Ricerca per ID numerico originario (1..22)
  if (!meta) {
    const origId = ft.id !== undefined ? ft.id : p.id;
    for (const key of Object.keys(PNG_PROVINCES_META)) {
      if (PNG_PROVINCES_META[key].origId === origId || String(PNG_PROVINCES_META[key].origId) === String(origId)) {
        meta = PNG_PROVINCES_META[key];
        break;
      }
    }
  }

  // 3. Ricerca per nome
  if (!meta) {
    const norm = (str: string) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const nrmRaw = norm(rawName);

    for (const key of Object.keys(PNG_PROVINCES_META)) {
      const candidate = PNG_PROVINCES_META[key];
      if (
        nrmRaw.includes(norm(candidate.name)) ||
        norm(candidate.name).includes(nrmRaw) ||
        nrmRaw.includes(norm(candidate.modernName)) ||
        norm(candidate.historicalName).includes(nrmRaw)
      ) {
        meta = candidate;
        break;
      }
    }
  }

  // 4. Risoluzione canonica
  if (meta) {
    const sov = meta.getSovereign ? meta.getSovereign(s) : meta.sovereign;
    const fac = meta.getFaction ? meta.getFaction(s) : meta.faction;
    const histName = meta.getHistoricalName ? meta.getHistoricalName(s) : meta.historicalName;
    const admin = meta.getAdminTitle ? meta.getAdminTitle(s) : meta.adminTitle;
    const note = meta.getNote(s);

    return makeResult(sov, histName, note, fac, admin);
  }

  // 5. Fallback generico per territori della Nuova Guinea o Papua
  const isPapua = rawName.toLowerCase().includes('papua') || (ft.__cent && ft.__cent[1] < -7.5);
  const defaultHistName = isPapua ? 'Territory of Papua (Port Moresby)' : 'Territory of New Guinea (Australian Mandate)';
  const defaultAdmin = isPapua
    ? 'Territory of Papua (Commonwealth of Australia — Lieutenant-Governor Sir Hubert Murray / Leonard Murray)'
    : 'Mandated Territory of New Guinea (Australia / Società delle Nazioni — Administrator Sir Walter McNicoll)';
  const defaultNote = s >= 5
    ? "Territorio oltremare amministrato dall'Australia; in stato di guerra a fianco delle potenze Alleate a difesa delle rotte oceaniche del Sud Pacifico."
    : "Territorio sotto amministrazione fiduciaria o sovranità del Commonwealth australiano nell'Oceano Pacifico sudoccidentale.";
  const defaultFaction: FactionType = s >= 5 ? 'Alleati' : 'Neutrale';

  return makeResult('AST', defaultHistName, defaultNote, defaultFaction, defaultAdmin);
}
