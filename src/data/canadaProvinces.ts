/**
 * Dettaglio Geocartografico e Toponomastico Storico del Dominion del Canada e Terranova (1936-1941)
 * Copertura integrale di tutte le 10 Province, 2 Territori, Nunavut (Distretti di Franklin e Keewatin)
 * e Dominion di Terranova (Newfoundland & Labrador, sotto Commission of Government britannica).
 *
 * Evoluzione Geopolitica (Step 0 - 8):
 * - Step 0-1 (1936 - mar 1938): Statuto di Westminster (1931) in pieno vigore; Dominion autonomo del Commonwealth britannico
 *   sotto Re Giorgio VI e il premier William Lyon Mackenzie King. Ripresa post-Depressione. Terranova è Dominion separato
 *   retto dalla Commission of Government di Londra dal 1934.
 * - Step 2-4 (ott 1938 - apr 1939): Crisi di Monaco e asiatica; riarmo difensivo (RCAF e RCN), espansione industriale mineraria
 *   e petrolifera (Turner Valley). Storica Visita Reale di Re Giorgio VI e della Regina Elisabetta (maggio-giugno 1939).
 * - Step 5-6 (set 1939 - giu 1940): 10 Settembre 1939: Dichiarazione di guerra autonoma del Canada al Terzo Reich (una settimana dopo Londra).
 *   Istituzione del Dipartimento delle Munizioni (C.D. Howe), partenza dei primi convogli atlantici da Halifax (HX-1), firma del
 *   British Commonwealth Air Training Plan (BCATP) a Ottawa per l'addestramento aereo imperiale. Mobilitazione della 1ª Divisione di Fanteria.
 * - Step 7 (ott 1940): Con la caduta della Francia, il Canada diventa il principale alleato armato della Gran Bretagna. Accordo di Ogdensburg
 *   (agosto 1940) con FDR per la difesa congiunta nordamericana (PJBD). Accordo Destroyers for Bases: basi USA ad Argentia e St. John's
 *   (Terranova). Piena produzione di autocarri militari CMP, alluminio ad Arvida, nichel a Sudbury, caccia Hurricane a Fort William.
 * - Step 8 (apr 1941): Dichiarazione di Hyde Park (aprile 1941) per l'integrazione produttiva canadese-statunitense col Lend-Lease.
 *   Creazione della Newfoundland Escort Force a St. John's; la RCN assume oltre il 40% delle scorte atlantiche. Tube Alloys/Manhattan Project
 *   attingono alla pechblenda e uranio di Port Radium (Great Bear Lake, NWT) e all'acqua pesante di Trail (BC).
 */

import { ResolvedTerritory, FactionType } from '../types';

function makeResult(
  o: string,
  name: string,
  note?: string,
  fac?: FactionType,
  adminEntity?: string
): ResolvedTerritory {
  return { o, name, note, fac, adminEntity };
}

export interface CanadaProvinceInfo {
  id: string;
  iso: string;
  name: string;
  modernName: string;
  historicalName: string;
  adminTitle: string;
  capital: string;
  region: string;
  isProvince: boolean;
  historicalToponym: string;
  s0_1: string;
  s2_4: string;
  s5_6: string;
  s7: string;
  s8: string;
  getNote: (s: number) => string;
  getHistoricalName: (s: number) => string;
  getAdminTitle: (s: number) => string;
  getSovereign: (s: number) => string;
  getFaction: (s: number) => FactionType;
}

export const CANADA_PROVINCES_META: Record<string, CanadaProvinceInfo> = {
  CA_ON: {
    id: "CA_ON",
    iso: "CA-ON",
    name: "Ontario",
    modernName: "Province of Ontario",
    historicalName: "Ontario (Toronto & Ottawa - Heartland Industriale del Dominion)",
    adminTitle: "Dominion of Canada — Province of Ontario (Premier Mitchell Hepburn / Gov. Gen. Lord Tweedsmuir / Lord Athlone)",
    capital: "Toronto (Provinciale) / Ottawa (Capitale Nazionale Federale)",
    region: "Central Canada",
    isProvince: true,
    historicalToponym: "Ottawa (Capitale Federale) / Toronto / Hamilton / Windsor",
    s0_1: "Provincia dell'Ontario. Cuore politico della Confederazione (Parlamento di Ottawa) e principale fulcro manifatturiero e finanziario canadese a Toronto. Polo automobilistico di Windsor e Oshawa e polo siderurgico di Hamilton ('Steeltown'). A Sudbury, l'INCO estrae e raffina l'80% del fabbisogno di nichel del mondo britannico, elemento critico per gli acciai speciali corazzati.",
    s2_4: "Provincia dell'Ontario. Dopo la crisi di Monaco del 1938, l'Ontario avvia la pianificazione del riarmo industriale: espansione delle acciaierie di Hamilton e dei cantieri di Lake Ontario; a maggio 1939 Ottawa accoglie trionfalmente Re Giorgio VI e la Regina Elisabetta nella prima visita ufficiale di un monarca regnante in Canada.",
    s5_6: "Provincia dell'Ontario (settembre 1939 - giugno 1940). Allo scoppio del conflitto, Ottawa istituisce il Dipartimento delle Munizioni e degli Approvvigionamenti sotto C.D. Howe. Gli stabilimenti General Motors di Oshawa e Ford di Windsor avviano la produzione su vasta scala degli autocarri militari CMP (Canadian Military Pattern); a Camp Borden e Trenton si aprono le prime scuole centrali di volo del BCATP.",
    s7: "Provincia dell'Ontario (ottobre 1940). Dopo la caduta della Francia e l'Accordo di Ogdensburg firmato tra Mackenzie King e Roosevelt per la difesa emisferica, l'Ontario diventa un arsenale strategico: la Canadian Car & Foundry a Fort William produce decine di caccia Hawker Hurricane (sotto la guida dell'ingegnere capo Elsie MacGill); a Sudbury l'estrazione di nichel e platino lavora a ritmo continuo.",
    s8: "Provincia dell'Ontario (aprile 1941). Con la Dichiarazione di Hyde Park siglata da King e FDR, le industrie dell'Ontario vengono pienamente integrate nel sistema dei contratti Lend-Lease alleati; decine di migliaia di veicoli corazzati e munizioni lasciano le fabbriche di Toronto e Windsor per essere imbarcati verso la Gran Bretagna.",
    getNote: (s: number) => {
      if (s >= 8) return CANADA_PROVINCES_META["CA_ON"].s8;
      if (s >= 7) return CANADA_PROVINCES_META["CA_ON"].s7;
      if (s >= 5) return CANADA_PROVINCES_META["CA_ON"].s5_6;
      if (s >= 2) return CANADA_PROVINCES_META["CA_ON"].s2_4;
      return CANADA_PROVINCES_META["CA_ON"].s0_1;
    },
    getHistoricalName: (s: number) => "Ontario (Toronto & Ottawa - Heartland Industriale del Dominion)",
    getAdminTitle: (s: number) => "Dominion of Canada — Province of Ontario",
    getSovereign: (s: number) => "CAN",
    getFaction: (s: number) => "Alleati" as FactionType
  },

  CA_QC: {
    id: "CA_QC",
    iso: "CA-QC",
    name: "Quebec",
    modernName: "Province of Quebec / Province de Québec",
    historicalName: "Quebec / Québec (Montréal & Ville de Québec - Alluminio di Arvida)",
    adminTitle: "Dominion of Canada — Province de Québec (Premier Maurice Duplessis / Adélard Godbout)",
    capital: "Ville de Québec (Capitale) / Montréal (Metropoli)",
    region: "Central Canada",
    isProvince: true,
    historicalToponym: "Montréal / Ville de Québec / Arvida / Trois-Rivières",
    s0_1: "Provincia del Québec. Metropoli economico-finanziaria di Montréal, snodo della Canadian Pacific Railway e porto oceanico sul San Lorenzo. Nella regione del Saguenay-Lac-Saint-Jean, gli impianti Alcan di Arvida sfruttano l'immensa energia idroelettrica locale per la raffinazione dell'alluminio greggio. Governo provinciale autonomista dell'Union Nationale di Maurice Duplessis.",
    s2_4: "Provincia del Québec. Montréal incrementa la produzione navale mercantile presso i cantieri Canadian Vickers e avvia l'assemblaggio di velivoli da ricognizione marittima e addestratori. Fervore patriottico e imponenti folle francofone accolgono Re Giorgio VI e la Regina Elisabetta a Montréal e Québec nel maggio 1939.",
    s5_6: "Provincia del Québec (settembre 1939 - giugno 1940). Dopo la dichiarazione di guerra e la vittoria liberale di Adélard Godbout alle elezioni provinciali, il Québec si mobilita per le forniture alleate: la fonderia Alcan di Arvida diventa la più grande produttrice di alluminio del mondo alleato, fornendo il metallo leggero indispensabile per la Royal Air Force; l'arsenale di Valcartier sforna milioni di proiettili.",
    s7: "Provincia del Québec (ottobre 1940). Le officine di Montréal Locomotive Works (MLW) avviano la conversione delle linee per la produzione di carri armati Valentine e cannoni campali da 25 libbre; nei cantieri Vickers sul San Lorenzo vengono varate le prime corvette antisommergibile classe Flower destinate alle rotte atlantiche.",
    s8: "Provincia del Québec (aprile 1941). Montréal consolida il ruolo di snodo logistico centrale del Dominion; il complesso di Arvida produce oltre il 40% dell'alluminio impiegato dall'industria aeronautica britannica; intensificazione delle pattuglie navali lungo l'estuario del San Lorenzo a protezione dei convogli in uscita.",
    getNote: (s: number) => {
      if (s >= 8) return CANADA_PROVINCES_META["CA_QC"].s8;
      if (s >= 7) return CANADA_PROVINCES_META["CA_QC"].s7;
      if (s >= 5) return CANADA_PROVINCES_META["CA_QC"].s5_6;
      if (s >= 2) return CANADA_PROVINCES_META["CA_QC"].s2_4;
      return CANADA_PROVINCES_META["CA_QC"].s0_1;
    },
    getHistoricalName: (s: number) => "Quebec / Québec (Montréal & Ville de Québec - Alluminio di Arvida)",
    getAdminTitle: (s: number) => "Dominion of Canada — Province de Québec",
    getSovereign: (s: number) => "CAN",
    getFaction: (s: number) => "Alleati" as FactionType
  },

  CA_NS: {
    id: "CA_NS",
    iso: "CA-NS",
    name: "Nova Scotia",
    modernName: "Province of Nova Scotia",
    historicalName: "Nova Scotia (Halifax - Roccaforte Navale dell'Atlantico & Cape Breton)",
    adminTitle: "Dominion of Canada — Province of Nova Scotia (Premier Angus L. Macdonald / A.S. MacMillan)",
    capital: "Halifax",
    region: "Atlantic Canada",
    isProvince: true,
    historicalToponym: "Halifax (HMCS Stadacona) / Sydney / Glace Bay / Dartmouth",
    s0_1: "Provincia della Nuova Scozia. La rada di Halifax (Bedford Basin) costituisce la principale base d'altura atlantica della Royal Canadian Navy (RCN Stadacona). Nell'isola di Cape Breton operano le miniere carbonifere sottomarine di Glace Bay e le acciaierie pesanti DOSCO a Sydney. Tradizione peschereccia e marittima d'avanguardia.",
    s2_4: "Provincia della Nuova Scozia. Ammodernamento dei bacini di carenaggio e delle batterie costiere di difesa ad Halifax e Sydney in previsione di una guerra sottomarina nell'Atlantico settentrionale; ampliamento delle riserve di carbone per le flotte mercantili imperiali.",
    s5_6: "Provincia della Nuova Scozia (settembre 1939 - giugno 1940). Il 16 settembre 1939 salpa da Halifax il convoglio HX-1, inaugurando la rotta marittima vitale per la sopravvivenza della Gran Bretagna. Bedford Basin diventa l'immenso ancoraggio in cui si radunano regolarmente convogli di 40-60 piroscafi scortati da cacciatorpediniere e corvette canadesi e britanniche.",
    s7: "Provincia della Nuova Scozia (ottobre 1940). Con l'intensificarsi della Battaglia dell'Atlantico, Sydney diventa il porto di partenza secondario per i convogli lenti (serie SC); l'ex premier provinciale Angus L. Macdonald viene nominato Ministro Federale per i Servizi Navali per accelerare l'immissione in servizio di centinaia di corvette.",
    s8: "Provincia della Nuova Scozia (aprile 1941). Halifax è la capitale operativa della scorta marittima canadese; i cantieri navali riparano senza sosta i mercantili silurati o danneggiati dalle tempeste oceaniche; rafforzamento della sorveglianza aerea con aerei idrovolanti Canso contro gli U-Boot operanti al largo dei Grandi Banchi.",
    getNote: (s: number) => {
      if (s >= 8) return CANADA_PROVINCES_META["CA_NS"].s8;
      if (s >= 7) return CANADA_PROVINCES_META["CA_NS"].s7;
      if (s >= 5) return CANADA_PROVINCES_META["CA_NS"].s5_6;
      if (s >= 2) return CANADA_PROVINCES_META["CA_NS"].s2_4;
      return CANADA_PROVINCES_META["CA_NS"].s0_1;
    },
    getHistoricalName: (s: number) => "Nova Scotia (Halifax - Roccaforte Navale dell'Atlantico & Cape Breton)",
    getAdminTitle: (s: number) => "Dominion of Canada — Province of Nova Scotia",
    getSovereign: (s: number) => "CAN",
    getFaction: (s: number) => "Alleati" as FactionType
  },

  CA_NB: {
    id: "CA_NB",
    iso: "CA-NB",
    name: "New Brunswick",
    modernName: "Province of New Brunswick / Nouveau-Brunswick",
    historicalName: "New Brunswick (Saint John - Porto Libero dai Ghiacci & Fredericton)",
    adminTitle: "Dominion of Canada — Province of New Brunswick / Nouveau-Brunswick (Premier Allison Dysart / John B. McNair)",
    capital: "Fredericton (Capitale) / Saint John (Porto Commerciale)",
    region: "Atlantic Canada",
    isProvince: true,
    historicalToponym: "Saint John / Fredericton / Moncton",
    s0_1: "Provincia del New Brunswick. Polo marittimo fondamentale grazie al porto di Saint John sulla Baia di Fundy, libero dai ghiacci tutto l'anno e dotato di uno dei bacini di carenaggio più ampi del Nord America (Saint John Dry Dock). Ricchezza forestale di legname da costruzione e polpa di legno.",
    s2_4: "Provincia del New Brunswick. Potenziamento del nodo ferroviario di Moncton e dei cantieri di riparazione navale a Saint John; la provincia si prepara a fungere da porto d'emergenza invernale per le esportazioni canadesi quando il San Lorenzo si ghiaccia.",
    s5_6: "Provincia del New Brunswick (settembre 1939 - giugno 1940). Saint John opera a pieno regime nella cantieristica bellica, costruendo e revisionando corvette classe Flower e dragamine per la RCN. Moncton ospita il quartier generale della No. 5 Service Flying Training School e depositi rifornimenti del BCATP.",
    s7: "Provincia del New Brunswick (ottobre 1940). Dopo la firma del Patto di Difesa di Ogdensburg, la costa meridionale del New Brunswick viene inclusa nei piani difensivi antisommergibile atlantici; continuo traffico ferroviario da Moncton per l'inoltro di legname speciale per l'industria bellica britannica.",
    s8: "Provincia del New Brunswick (aprile 1941). I cantieri navali di Saint John lavorano giorno e notte alla riparazione di mercantili colpiti dai sommergibili dell'Asse; a Moncton transitano migliaia di aviatori formati dal BCATP diretti ai convogli d'imbarco per la Gran Bretagna.",
    getNote: (s: number) => {
      if (s >= 8) return CANADA_PROVINCES_META["CA_NB"].s8;
      if (s >= 7) return CANADA_PROVINCES_META["CA_NB"].s7;
      if (s >= 5) return CANADA_PROVINCES_META["CA_NB"].s5_6;
      if (s >= 2) return CANADA_PROVINCES_META["CA_NB"].s2_4;
      return CANADA_PROVINCES_META["CA_NB"].s0_1;
    },
    getHistoricalName: (s: number) => "New Brunswick (Saint John - Porto Libero dai Ghiacci & Fredericton)",
    getAdminTitle: (s: number) => "Dominion of Canada — Province of New Brunswick",
    getSovereign: (s: number) => "CAN",
    getFaction: (s: number) => "Alleati" as FactionType
  },

  CA_PE: {
    id: "CA_PE",
    iso: "CA-PE",
    name: "Prince Edward Island",
    modernName: "Province of Prince Edward Island",
    historicalName: "Prince Edward Island (Charlottetown - Culla della Confederazione)",
    adminTitle: "Dominion of Canada — Province of Prince Edward Island (Premier Thane Campbell)",
    capital: "Charlottetown",
    region: "Atlantic Canada",
    isProvince: true,
    historicalToponym: "Charlottetown / Summerside",
    s0_1: "Provincia dell'Isola del Principe Edoardo ('Culla della Confederazione 1864'). La più piccola provincia del Dominion, rinomata per l'agricoltura specializzata (patate da semina e grano) e la pesca nel Golfo di San Lorenzo. Collegamento tramite traghetti rompighiaccio con la terraferma.",
    s2_4: "Provincia di Prince Edward Island. Modernizzazione delle infrastrutture portuali e consolidamento della cooperazione agricola con il Regno Unito per l'esportazione alimentare di sussistenza; festeggiamenti per il 75° anniversario della Conferenza di Charlottetown.",
    s5_6: "Provincia di Prince Edward Island (settembre 1939 - giugno 1940). Mobilitazione del Prince Edward Island Highlanders; il governo federale sceglie Summerside e Charlottetown per installare importanti basi addestrative della RAF e RCAF nel quadro del BCATP.",
    s7: "Provincia di Prince Edward Island (ottobre 1940). Apertura ufficiale della No. 9 Service Flying Training School a Summerside e della No. 31 General Reconnaissance School a Charlottetown: centinaia di piloti e navigatori alleati vengono addestrati al volo oceanico e alla caccia agli U-Boot.",
    s8: "Provincia di Prince Edward Island (aprile 1941). Piena operatività delle scuole di ricognizione aerea marittima; la produzione agroalimentare provinciale garantisce razioni caloriche vitali per le isole britanniche sotto assedio marittimo.",
    getNote: (s: number) => {
      if (s >= 8) return CANADA_PROVINCES_META["CA_PE"].s8;
      if (s >= 7) return CANADA_PROVINCES_META["CA_PE"].s7;
      if (s >= 5) return CANADA_PROVINCES_META["CA_PE"].s5_6;
      if (s >= 2) return CANADA_PROVINCES_META["CA_PE"].s2_4;
      return CANADA_PROVINCES_META["CA_PE"].s0_1;
    },
    getHistoricalName: (s: number) => "Prince Edward Island (Charlottetown - Culla della Confederazione)",
    getAdminTitle: (s: number) => "Dominion of Canada — Province of Prince Edward Island",
    getSovereign: (s: number) => "CAN",
    getFaction: (s: number) => "Alleati" as FactionType
  },

  CA_MB: {
    id: "CA_MB",
    iso: "CA-MB",
    name: "Manitoba",
    modernName: "Province of Manitoba",
    historicalName: "Manitoba (Winnipeg - Gateway to the West & Baia di Hudson)",
    adminTitle: "Dominion of Canada — Province of Manitoba (Premier John Bracken)",
    capital: "Winnipeg",
    region: "Prairie Provinces",
    isProvince: true,
    historicalToponym: "Winnipeg / Brandon / Churchill (Porto Artico)",
    s0_1: "Provincia del Manitoba. 'Porta d'accesso all'Ovest canadese'; la capitale Winnipeg ospita i giganteschi scali ferroviari della CPR e della CNR e la borsa merci granaria della Canadian Wheat Board. A nord, il porto marittimo artico di Churchill sulla Baia di Hudson offre una rotta estiva diretta verso la Gran Bretagna.",
    s2_4: "Provincia del Manitoba. La ripresa agricola post-Depressione consolida le scorte cerealicole provinciali; le officine ferroviarie di Winnipeg (Weston Shops) ammodernano i macchinari per la lavorazione dei metalli e la manutenzione di rotabili pesanti.",
    s5_6: "Provincia del Manitoba (settembre 1939 - giugno 1940). Winnipeg diventa la sede del No. 2 Training Command del BCATP. Nelle sterminate pianure attorno a Brandon, Portage la Prairie e Macdonald sorgono piste d'aviazione per l'addestramento accelerato di bombardieri e mitraglieri del Commonwealth.",
    s7: "Provincia del Manitoba (ottobre 1940). Mobilitazione del Royal Winnipeg Rifles e dei reggimenti granari; le acciaierie e fonderie di Winnipeg producono componenti per proiettili d'artiglieria; l'avamposto di Churchill funge da base di ascolto radio e osservazione meteorologica artica.",
    s8: "Provincia del Manitoba (aprile 1941). Oltre 10 scuole aeree del BCATP lavorano a ritmo serrato nel Manitoba, sfornando mensilmente centinaia di aviatori canadesi, britannici e neozelandesi per il Bomber Command e il Coastal Command della RAF.",
    getNote: (s: number) => {
      if (s >= 8) return CANADA_PROVINCES_META["CA_MB"].s8;
      if (s >= 7) return CANADA_PROVINCES_META["CA_MB"].s7;
      if (s >= 5) return CANADA_PROVINCES_META["CA_MB"].s5_6;
      if (s >= 2) return CANADA_PROVINCES_META["CA_MB"].s2_4;
      return CANADA_PROVINCES_META["CA_MB"].s0_1;
    },
    getHistoricalName: (s: number) => "Manitoba (Winnipeg - Gateway to the West & Baia di Hudson)",
    getAdminTitle: (s: number) => "Dominion of Canada — Province of Manitoba",
    getSovereign: (s: number) => "CAN",
    getFaction: (s: number) => "Alleati" as FactionType
  },

  CA_SK: {
    id: "CA_SK",
    iso: "CA-SK",
    name: "Saskatchewan",
    modernName: "Province of Saskatchewan",
    historicalName: "Saskatchewan (Regina & Saskatoon - Granaio dell'Impero Britannico)",
    adminTitle: "Dominion of Canada — Province of Saskatchewan (Premier William J. Patterson)",
    capital: "Regina",
    region: "Prairie Provinces",
    isProvince: true,
    historicalToponym: "Regina (RCMP Depot) / Saskatoon / Moose Jaw / Prince Albert",
    s0_1: "Provincia del Saskatchewan. Il 'Granaio dell'Impero Britannico': decine di milioni di acri di grano duro delle praterie coltivati per l'esportazione alimentare imperiale. A Regina ha sede il leggendario Depot Division, centro storico di addestramento della Royal Canadian Mounted Police (RCMP, le 'Giubbe Rosse').",
    s2_4: "Provincia del Saskatchewan. Dopo i devastanti anni della siccità ('Dust Bowl'), i raccolti ritornano a livelli elevati grazie a nuovi programmi federali di irrigazione (PFRA); le ferrovie movimentano milioni di tonnellate di grano verso i silos di Lake Superior e Vancouver.",
    s5_6: "Provincia del Saskatchewan (settembre 1939 - giugno 1940). La pianeggiante topografia e la limpidezza atmosferica del Saskatchewan lo rendono un territorio ideale per il BCATP: costruzione immediata delle basi aeree di Moose Jaw, Saskatoon, Swift Current e Prince Albert per l'addestramento primario dei piloti alleati.",
    s7: "Provincia del Saskatchewan (ottobre 1940). Il grano del Saskatchewan rifornisce il Regno Unito minacciato dall'assedio navale della Kriegsmarine; a Moose Jaw opera la No. 32 Service Flying Training School con decine di aerei Harvard e Oxford.",
    s8: "Provincia del Saskatchewan (aprile 1941). Piena integrazione del sistema granario e dell'addestramento aeronautico imperiale; migliaia di giovani volontari delle praterie arruolati nel South Saskatchewan Regiment e nella Royal Canadian Air Force.",
    getNote: (s: number) => {
      if (s >= 8) return CANADA_PROVINCES_META["CA_SK"].s8;
      if (s >= 7) return CANADA_PROVINCES_META["CA_SK"].s7;
      if (s >= 5) return CANADA_PROVINCES_META["CA_SK"].s5_6;
      if (s >= 2) return CANADA_PROVINCES_META["CA_SK"].s2_4;
      return CANADA_PROVINCES_META["CA_SK"].s0_1;
    },
    getHistoricalName: (s: number) => "Saskatchewan (Regina & Saskatoon - Granaio dell'Impero Britannico)",
    getAdminTitle: (s: number) => "Dominion of Canada — Province of Saskatchewan",
    getSovereign: (s: number) => "CAN",
    getFaction: (s: number) => "Alleati" as FactionType
  },

  CA_AB: {
    id: "CA_AB",
    iso: "CA-AB",
    name: "Alberta",
    modernName: "Province of Alberta",
    historicalName: "Alberta (Calgary, Edmonton & Petrolio di Turner Valley)",
    adminTitle: "Dominion of Canada — Province of Alberta (Premier William Aberhart - Social Credit)",
    capital: "Edmonton (Capitale) / Calgary (Petrolio & Finanza)",
    region: "Prairie Provinces",
    isProvince: true,
    historicalToponym: "Edmonton / Calgary / Turner Valley / Medicine Hat",
    s0_1: "Provincia dell'Alberta. Grande produttrice agricola e d'allevamento bovino, governata dal movimento del Social Credit di William Aberhart. Nel 1936, la scoperta del pozzo Royalites No. 4 a Turner Valley rivela immensi depositi di petrolio greggio leggero, trasformando la provincia nella principale riserva petrolifera dell'Impero Britannico.",
    s2_4: "Provincia dell'Alberta. I pozzi di Turner Valley raddoppiano l'estrazione per rifornire la flotta navale e le raffinerie di Calgary; Edmonton si sviluppa come snodo aereo verso i territori artici del Grande Nord e l'Alaska.",
    s5_6: "Provincia del Alberta (settembre 1939 - giugno 1940). Allo scoppio della guerra, il petrolio di Turner Valley assume un valore strategico incalcolabile per l'autonomia energetica alleata nel Nord America; Calgary e Edmonton diventano basi nevralgiche per il BCATP (No. 3 Service Flying Training School a Calgary).",
    s7: "Provincia dell'Alberta (ottobre 1940). Dopo l'Accordo di Ogdensburg con Washington, Edmonton viene identificata come l'hub strategico della Northwest Staging Route per il transito e il rifornimento aereo militare verso l'Alaska; rafforzamento della produzione chimica e petrolifera a Calgary e Medicine Hat.",
    s8: "Provincia del Alberta (aprile 1941). Turner Valley produce oltre il 95% del petrolio canadese (circa 10 milioni di barili all'anno); a Edmonton transitano le prime missioni congiunte USA-Canada per la sicurezza strategica dell'Artico e del Pacifico settentrionale.",
    getNote: (s: number) => {
      if (s >= 8) return CANADA_PROVINCES_META["CA_AB"].s8;
      if (s >= 7) return CANADA_PROVINCES_META["CA_AB"].s7;
      if (s >= 5) return CANADA_PROVINCES_META["CA_AB"].s5_6;
      if (s >= 2) return CANADA_PROVINCES_META["CA_AB"].s2_4;
      return CANADA_PROVINCES_META["CA_AB"].s0_1;
    },
    getHistoricalName: (s: number) => "Alberta (Calgary, Edmonton & Petrolio di Turner Valley)",
    getAdminTitle: (s: number) => "Dominion of Canada — Province of Alberta",
    getSovereign: (s: number) => "CAN",
    getFaction: (s: number) => "Alleati" as FactionType
  },

  CA_BC: {
    id: "CA_BC",
    iso: "CA-BC",
    name: "British Columbia",
    modernName: "Province of British Columbia",
    historicalName: "British Columbia (Vancouver, Victoria & Pacific Command Esquimalt)",
    adminTitle: "Dominion of Canada — Province of British Columbia (Premier Thomas Dufferin Pattullo)",
    capital: "Victoria (Capitale) / Vancouver (Porto Metropolitano)",
    region: "Pacific Coast",
    isProvince: true,
    historicalToponym: "Vancouver / Victoria / Esquimalt (Base Navale) / Trail (COMINCO) / Prince Rupert",
    s0_1: "Provincia della Columbia Britannica. Riconosciuta come lo sbocco marittimo canadese sul Pacifico; la metropoli di Vancouver gestisce l'imponente commercio di grano e legname verso l'Asia e l'Europa. A Esquimalt (isola di Vancouver) ha sede la storica base navale della RCN Pacific Command. A Trail operano le gigantesche fonderie COMINCO (piombo, zinco e chimica avanzata).",
    s2_4: "Provincia della Columbia Britannica. Di fronte all'aggressione giapponese in Cina e all'espansione nel Pacifico, Victoria e Ottawa avviano il piano di difesa costiera: batterie d'artiglieria pesante all'ingresso dello Stretto di Juan de Fuca; espansione dei cantieri navali Burrard Dry Dock a Vancouver.",
    s5_6: "Provincia della Columbia Britannica (settembre 1939 - giugno 1940). I cantieri Burrard di Vancouver e Yarrows di Victoria avviano la costruzione seriale di dragamine classe Bangor e navi da carico per il Regno Unito. Le foreste costiere forniscono l'abete Sitka spruce, legname leggero e resistente essenziale per la produzione del bombardiere britannico de Havilland Mosquito.",
    s7: "Provincia della Columbia Britannica (ottobre 1940). Dopo la firma del Patto Tripartito tra Tokyo, Berlino e Roma e l'Accordo di Ogdensburg, la BC intensifica la difesa del Pacifico: la RCN pattuglia le isole della Regina Carlotta (Haida Gwaii); a Trail, la COMINCO viene contattata per la produzione pionieristica di acqua pesante (destinata al progetto nucleare Tube Alloys).",
    s8: "Provincia della Columbia Britannica (aprile 1941). I cantieri navali di Vancouver consegnano mensilmente nuove navi cargo mercantili classe Park; il porto settentrionale di Prince Rupert viene fortificato e integrato nelle rotte difensive congiunte con l'US Navy verso l'Alaska.",
    getNote: (s: number) => {
      if (s >= 8) return CANADA_PROVINCES_META["CA_BC"].s8;
      if (s >= 7) return CANADA_PROVINCES_META["CA_BC"].s7;
      if (s >= 5) return CANADA_PROVINCES_META["CA_BC"].s5_6;
      if (s >= 2) return CANADA_PROVINCES_META["CA_BC"].s2_4;
      return CANADA_PROVINCES_META["CA_BC"].s0_1;
    },
    getHistoricalName: (s: number) => "British Columbia (Vancouver, Victoria & Pacific Command Esquimalt)",
    getAdminTitle: (s: number) => "Dominion of Canada — Province of British Columbia",
    getSovereign: (s: number) => "CAN",
    getFaction: (s: number) => "Alleati" as FactionType
  },

  CA_NL: {
    id: "CA_NL",
    iso: "CA-NL",
    name: "Newfoundland and Labrador",
    modernName: "Newfoundland and Labrador (Dominion of Newfoundland 1936-1941)",
    historicalName: "Dominion of Newfoundland (Commission of Government - St. John's & Labrador)",
    adminTitle: "Dominion of Newfoundland (Under British Direct Administration — Governor Sir Humphrey Walwyn)",
    capital: "St. John's",
    region: "Atlantic Canada / British Crown Dominion",
    isProvince: false,
    historicalToponym: "St. John's / Gander (Ferry Command) / Argentia / Labrador / Corner Brook",
    s0_1: "Dominion di Terranova e Labrador (Capitale St. John's). Territorio autonomo del Commonwealth britannico NON facente parte della Confederazione Canadese. A seguito della bancarotta finanziaria del 1933 dovuta al crollo dei prezzi del merluzzo, dal 1934 il governo responsabile è sospeso e sostituito dalla Commission of Government guidata dal Governatore britannico Sir Humphrey Walwyn. Confine del Labrador fissato dal Privy Council nel 1927.",
    s2_4: "Dominion di Terranova. Rilancio economico tramite le cartiere di Corner Brook e le miniere di ferro dell'isola di Bell (Wabana). Nel 1938 viene completato a Gander il più esteso aeroporto del pianeta, progettato originariamente per i voli postali transatlantici ma destinato a un ruolo bellico capitale.",
    s5_6: "Dominion di Terranova (settembre 1939 - giugno 1940). Allo scoppio del conflitto, Terranova entra in guerra al fianco della Gran Bretagna; migliaia di pescatori e marinai si arruolano volontari nella Royal Navy e nel 166th Newfoundland Field Regiment. Il porto di St. John's diventa la base avanzata più orientale dell'Atlantico per la caccia agli U-Boot.",
    s7: "Dominion di Terranova (ottobre 1940). Punto di svolta geostrategico: con l'accordo Destroyers for Bases tra Churchill e Roosevelt, gli Stati Uniti ottengono in affitto per 99 anni le basi militari di Fort Pepperrell (St. John's), Naval Station Argentia e Harmon Field; a Gander nasce l'hub della RAF Ferry Command per il traghettamento aereo dei bombardieri americani verso l'Inghilterra.",
    s8: "Dominion di Terranova (aprile 1941). Viene istituita formalmente la Newfoundland Escort Force (NEF) sotto comando RCN/RN a St. John's per scortare i convogli nel tratto più micidiale del 'Black Pit' (il buco centrale atlantico privo di copertura aerea); a Placentia Bay iniziano i lavori per l'ormeggio navale di Argentia.",
    getNote: (s: number) => {
      if (s >= 8) return CANADA_PROVINCES_META["CA_NL"].s8;
      if (s >= 7) return CANADA_PROVINCES_META["CA_NL"].s7;
      if (s >= 5) return CANADA_PROVINCES_META["CA_NL"].s5_6;
      if (s >= 2) return CANADA_PROVINCES_META["CA_NL"].s2_4;
      return CANADA_PROVINCES_META["CA_NL"].s0_1;
    },
    getHistoricalName: (s: number) => "Dominion of Newfoundland (Commission of Government - St. John's & Labrador)",
    getAdminTitle: (s: number) => "Dominion of Newfoundland (Commission of Government / United Kingdom)",
    getSovereign: (s: number) => "UK",
    getFaction: (s: number) => "Alleati" as FactionType
  },

  CA_NT: {
    id: "CA_NT",
    iso: "CA-NT",
    name: "Northwest Territories",
    modernName: "Northwest Territories",
    historicalName: "Northwest Territories (Mackenzie District, Yellowknife & Port Radium)",
    adminTitle: "Dominion of Canada — Northwest Territories (Commissioner Charles Camsell)",
    capital: "Fort Smith (Amministrativa) / Yellowknife (Polo Minerario)",
    region: "Northern Canada",
    isProvince: false,
    historicalToponym: "Yellowknife / Port Radium (Eldorado Mine) / Norman Wells / Fort Smith",
    s0_1: "Territori del Nord-Ovest (Distretti del Mackenzie, Keewatin e Franklin). Immensa frontiera artica e subartica amministrata da un Commissario a Ottawa e da uffici a Fort Smith. Corsa all'oro a Yellowknife sulle rive del Gran Lago degli Schiavi. A Port Radium, sul Gran Lago degli Orsi, la miniera Eldorado di Gilbert LaBine estrae pechblenda ricca di radio.",
    s2_4: "Territori del Nord-Ovest. Esplorazione petrolifera a Norman Wells sul fiume Mackenzie; la miniera di Port Radium espande i pozzi sotterranei nel permafrost, diventando il principale fornitore di concentrati di uranio e radio per la ricerca scientifica occidentale.",
    s5_6: "Territori del Nord-Ovest (settembre 1939 - giugno 1940). Dopo la dichiarazione di guerra, la miniera Eldorado di Port Radium viene temporaneamente chiusa per la caduta dei mercati commerciali del radio in Europa, ma i geologi del governo federale ne mantengono il controllo strategico per il contenuto di uranio.",
    s7: "Territori del Nord-Ovest (ottobre 1940). La Commissione Congiunta USA-Canada (PJBD) include i Territori del Nord-Ovest nella pianificazione difensiva: i pozzi e la raffineria di Norman Wells vengono preparati per alimentare il fabbisogno di carburante per l'aviazione militare artica; costruzione di stazioni radio meteorologiche avanzate.",
    s8: "Territori del Nord-Ovest (aprile 1941). Con l'avvio del progetto nucleare britannico Tube Alloys (precursore del Progetto Manhattan), Ottawa ordina la riapertura e la militarizzazione segreta della miniera Eldorado a Port Radium: l'uranio del Great Bear Lake diventa la risorsa fisica chiave per le ricerche atomiche alleate.",
    getNote: (s: number) => {
      if (s >= 8) return CANADA_PROVINCES_META["CA_NT"].s8;
      if (s >= 7) return CANADA_PROVINCES_META["CA_NT"].s7;
      if (s >= 5) return CANADA_PROVINCES_META["CA_NT"].s5_6;
      if (s >= 2) return CANADA_PROVINCES_META["CA_NT"].s2_4;
      return CANADA_PROVINCES_META["CA_NT"].s0_1;
    },
    getHistoricalName: (s: number) => "Northwest Territories (Mackenzie District, Yellowknife & Port Radium)",
    getAdminTitle: (s: number) => "Dominion of Canada — Northwest Territories",
    getSovereign: (s: number) => "CAN",
    getFaction: (s: number) => "Alleati" as FactionType
  },

  CA_YT: {
    id: "CA_YT",
    iso: "CA-YT",
    name: "Yukon",
    modernName: "Yukon Territory",
    historicalName: "Yukon Territory (Dawson City & Whitehorse - Klondike)",
    adminTitle: "Dominion of Canada — Yukon Territory (Controller George A. Jeckell)",
    capital: "Dawson City (Capitale Storica) / Whitehorse (Hub Logistico)",
    region: "Northern Canada",
    isProvince: false,
    historicalToponym: "Dawson City / Whitehorse / Carcross / Mayo",
    s0_1: "Territorio dello Yukon. Territorio aurifero del Klondike celebre per la corsa all'oro del 1898, amministrato da Dawson City. La ferrovia a scartamento ridotto White Pass and Yukon Route collega il porto marittimo di Skagway (Alaska) a Whitehorse, rappresentando l'unica arteria logistica moderna dell'estremo nord-ovest.",
    s2_4: "Territorio dello Yukon. Incremento dell'estrazione di piombo e argento a Mayo; le compagnie minerarie aurifere introducono grandi draghe meccaniche galleggianti lungo il fiume Klondike per massimizzare la produzione di riserve auree federali.",
    s5_6: "Territorio dello Yukon (settembre 1939 - giugno 1940). Whitehorse emerge come snodo vitale di collegamento aereo tra il Canada continentale e l'Alaska statunitense; piloti civili ed esploratori tracciano le prime piste d'atterraggio invernali della futura Northwest Staging Route.",
    s7: "Territorio dello Yukon (ottobre 1940). Nel quadro degli accordi militari di Ogdensburg, ingegneri canadesi e statunitensi avviano l'ammodernamento sistematico degli aerodromi di Whitehorse, Carcross e Watson Lake per consentire il transito di squadriglie di caccia verso le basi in Alaska.",
    s8: "Territorio dello Yukon (aprile 1941). Whitehorse si trasforma in un febbrile cantiere militare strategico; la ferrovia White Pass trasporta carichi record di materiali da costruzione bellici; lo Yukon si afferma come bastione indispensabile per la difesa del fianco artico e del Pacifico boreale.",
    getNote: (s: number) => {
      if (s >= 8) return CANADA_PROVINCES_META["CA_YT"].s8;
      if (s >= 7) return CANADA_PROVINCES_META["CA_YT"].s7;
      if (s >= 5) return CANADA_PROVINCES_META["CA_YT"].s5_6;
      if (s >= 2) return CANADA_PROVINCES_META["CA_YT"].s2_4;
      return CANADA_PROVINCES_META["CA_YT"].s0_1;
    },
    getHistoricalName: (s: number) => "Yukon Territory (Dawson City & Whitehorse - Klondike)",
    getAdminTitle: (s: number) => "Dominion of Canada — Yukon Territory",
    getSovereign: (s: number) => "CAN",
    getFaction: (s: number) => "Alleati" as FactionType
  },

  CA_NU: {
    id: "CA_NU",
    iso: "CA-NU",
    name: "Nunavut",
    modernName: "Nunavut (Distretti Storici di Franklin e Keewatin 1936-1941)",
    historicalName: "Eastern Arctic Districts of Franklin & Keewatin (N.W.T. - Isole Artiche & Baffin)",
    adminTitle: "Dominion of Canada — Northwest Territories (Eastern Arctic Patrol / RCMP St. Roch)",
    capital: "Iqaluit (Frobisher Bay) / Chesterfield Inlet (Avamposto)",
    region: "Northern Canada / Eastern Arctic",
    isProvince: false,
    historicalToponym: "Baffin Island / Frobisher Bay / Chesterfield Inlet / Pangnirtung / Ellesmere",
    s0_1: "Distretti Orientali dei Territori del Nord-Ovest (Franklin e Keewatin, attuale Nunavut). Vaste distese ghiacciate dell'Arcipelago Artico e coste occidentali della Baia di Hudson abitate dalle comunità inuit. La presenza della sovranità canadese è assicurata dagli avamposti commerciali della Hudson's Bay Company, dalle missioni religiose e dai posti di polizia della RCMP.",
    s2_4: "Distretti di Franklin e Keewatin (Artico Orientale). La goletta a motore della RCMP 'St. Roch' compie periodiche missioni di pattugliamento polare per censire le popolazioni e mantenere la bandiera canadese sulle isole artiche più remote; istituzione delle prime stazioni meteorologiche polari.",
    s5_6: "Distretti di Franklin e Keewatin (settembre 1939 - giugno 1940). Con l'inizio della guerra, le stazioni meteorologiche costiere della Baia di Hudson e della Terra di Baffin acquisiscono importanza critica per le previsioni meteorologiche atlantiche necessarie ai convogli navali e alle rotte aeree verso l'Europa.",
    s7: "Distretti di Franklin e Keewatin (ottobre 1940). Il sergente Henry Larsen e l'equipaggio della goletta della RCMP 'St. Roch' salpano da Vancouver con l'ordine segreto di attraversare il Passaggio a Nord-Ovest da ovest a est per riaffermare e difendere la sovranità canadese nell'Arcipelago Artico durante il conflitto mondiale.",
    s8: "Distretti di Franklin e Keewatin (aprile 1941). La 'St. Roch' prosegue la sua storica traversata artica bloccata dai ghiacci invernali; la Terra di Baffin e la Baia di Frobisher vengono risesaminate da specialisti canadesi e statunitensi per l'installazione di aeroporti di emergenza (Crimson Route) per il transito aereo polare verso l'Islanda e la Gran Bretagna.",
    getNote: (s: number) => {
      if (s >= 8) return CANADA_PROVINCES_META["CA_NU"].s8;
      if (s >= 7) return CANADA_PROVINCES_META["CA_NU"].s7;
      if (s >= 5) return CANADA_PROVINCES_META["CA_NU"].s5_6;
      if (s >= 2) return CANADA_PROVINCES_META["CA_NU"].s2_4;
      return CANADA_PROVINCES_META["CA_NU"].s0_1;
    },
    getHistoricalName: (s: number) => "Eastern Arctic Districts of Franklin & Keewatin (N.W.T. - Isole Artiche & Baffin)",
    getAdminTitle: (s: number) => "Dominion of Canada — Northwest Territories (Eastern Arctic)",
    getSovereign: (s: number) => "CAN",
    getFaction: (s: number) => "Alleati" as FactionType
  }
};

// Aliases for seamless ID lookup
CANADA_PROVINCES_META['CA-ON'] = CANADA_PROVINCES_META['CA_ON'];
CANADA_PROVINCES_META['ON'] = CANADA_PROVINCES_META['CA_ON'];
CANADA_PROVINCES_META['CA-QC'] = CANADA_PROVINCES_META['CA_QC'];
CANADA_PROVINCES_META['QC'] = CANADA_PROVINCES_META['CA_QC'];
CANADA_PROVINCES_META['CA-NS'] = CANADA_PROVINCES_META['CA_NS'];
CANADA_PROVINCES_META['NS'] = CANADA_PROVINCES_META['CA_NS'];
CANADA_PROVINCES_META['CA-NB'] = CANADA_PROVINCES_META['CA_NB'];
CANADA_PROVINCES_META['NB'] = CANADA_PROVINCES_META['CA_NB'];
CANADA_PROVINCES_META['CA-PE'] = CANADA_PROVINCES_META['CA_PE'];
CANADA_PROVINCES_META['PE'] = CANADA_PROVINCES_META['CA_PE'];
CANADA_PROVINCES_META['PEI'] = CANADA_PROVINCES_META['CA_PE'];
CANADA_PROVINCES_META['CA-MB'] = CANADA_PROVINCES_META['CA_MB'];
CANADA_PROVINCES_META['MB'] = CANADA_PROVINCES_META['CA_MB'];
CANADA_PROVINCES_META['CA-SK'] = CANADA_PROVINCES_META['CA_SK'];
CANADA_PROVINCES_META['SK'] = CANADA_PROVINCES_META['CA_SK'];
CANADA_PROVINCES_META['CA-AB'] = CANADA_PROVINCES_META['CA_AB'];
CANADA_PROVINCES_META['AB'] = CANADA_PROVINCES_META['CA_AB'];
CANADA_PROVINCES_META['CA-BC'] = CANADA_PROVINCES_META['CA_BC'];
CANADA_PROVINCES_META['BC'] = CANADA_PROVINCES_META['CA_BC'];
CANADA_PROVINCES_META['CA-NL'] = CANADA_PROVINCES_META['CA_NL'];
CANADA_PROVINCES_META['NL'] = CANADA_PROVINCES_META['CA_NL'];
CANADA_PROVINCES_META['NF'] = CANADA_PROVINCES_META['CA_NL'];
CANADA_PROVINCES_META['NEWFOUNDLAND'] = CANADA_PROVINCES_META['CA_NL'];
CANADA_PROVINCES_META['TERRANOVA'] = CANADA_PROVINCES_META['CA_NL'];
CANADA_PROVINCES_META['CA-NT'] = CANADA_PROVINCES_META['CA_NT'];
CANADA_PROVINCES_META['NT'] = CANADA_PROVINCES_META['CA_NT'];
CANADA_PROVINCES_META['NWT'] = CANADA_PROVINCES_META['CA_NT'];
CANADA_PROVINCES_META['CA-YT'] = CANADA_PROVINCES_META['CA_YT'];
CANADA_PROVINCES_META['YT'] = CANADA_PROVINCES_META['CA_YT'];
CANADA_PROVINCES_META['YUKON'] = CANADA_PROVINCES_META['CA_YT'];
CANADA_PROVINCES_META['CA-NU'] = CANADA_PROVINCES_META['CA_NU'];
CANADA_PROVINCES_META['NU'] = CANADA_PROVINCES_META['CA_NU'];
CANADA_PROVINCES_META['NUNAVUT'] = CANADA_PROVINCES_META['CA_NU'];

/**
 * Risolutore dinamico e timeline-sensitive per le Province, Territori e Terranova (1936-1941).
 * Supporta sia la firma (ft: Feature, s: number) che (s: number, rawId: string, props: any, rawName?: string).
 */
export function resolveCanadaProvince(
  arg1: any,
  arg2?: any,
  arg3?: any,
  arg4?: string
): ResolvedTerritory | null {
  let s = 0;
  let rawId = '';
  let props: any = {};
  let rawName = '';

  if (typeof arg1 === 'number') {
    s = arg1;
    rawId = String(arg2 || '');
    props = arg3 || {};
    rawName = arg4 || String(props.NAME || props.name || props.shapeName || props.HISTORICAL_NAME || '');
  } else if (typeof arg1 === 'object' && arg1 !== null) {
    const ft = arg1;
    s = typeof arg2 === 'number' ? arg2 : 0;
    props = ft.properties || {};
    rawId = String(ft.id || props.id || props.shapeISO || props.ISO || '');
    rawName = String(props.NAME || props.name || props.shapeName || props.HISTORICAL_NAME || arg4 || '');
  } else {
    rawId = String(arg1 || '');
    s = typeof arg2 === 'number' ? arg2 : 0;
    props = arg3 || {};
    rawName = arg4 || '';
  }

  const cleanId = rawId.toUpperCase().trim().replace('-', '_');
  const rawIso = String(props?.shapeISO || props?.ISO || '').toUpperCase().trim().replace('-', '_');
  const provName = rawName || props?.shapeName || props?.NAME || props?.HISTORICAL_NAME || '';

  let meta: CanadaProvinceInfo | undefined =
    CANADA_PROVINCES_META[cleanId] ||
    CANADA_PROVINCES_META[rawIso] ||
    CANADA_PROVINCES_META[rawId.toUpperCase().trim()];

  if (!meta && cleanId.startsWith('CA_')) {
    meta = CANADA_PROVINCES_META[cleanId];
  }
  if (!meta && !cleanId.startsWith('CA_')) {
    meta = CANADA_PROVINCES_META['CA_' + cleanId];
  }

  // Lookup per nome o toponimo fuzzy
  if (!meta && provName) {
    const pNorm = provName.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const key of Object.keys(CANADA_PROVINCES_META)) {
      const item = CANADA_PROVINCES_META[key];
      const nrmItem = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const nrmMod = item.modernName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const nrmHist = item.historicalName.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (
        pNorm === nrmItem ||
        pNorm === nrmMod ||
        (nrmItem.length >= 4 && pNorm.includes(nrmItem)) ||
        (nrmItem.length >= 4 && nrmHist.includes(pNorm))
      ) {
        meta = item;
        break;
      }
    }
    if (!meta && (provName.toLowerCase().includes('newfoundland') || provName.toLowerCase().includes('terranova') || provName.toLowerCase().includes('labrador'))) {
      meta = CANADA_PROVINCES_META['CA_NL'];
    }
  }

  if (!meta) return null;

  return makeResult(
    meta.getSovereign(s),
    meta.getHistoricalName(s),
    meta.getNote(s),
    meta.getFaction(s),
    meta.getAdminTitle(s)
  );
}

/**
 * Popola il dizionario storico con toponimi e denominazioni moderne per tutte le entità canadesi e Terranova.
 */
export function populateCanadaToponyms(dict: Record<string, any>): void {
  if (!dict['CAN']) dict['CAN'] = {};
  if (!dict['UK']) dict['UK'] = {};

  for (const key of Object.keys(CANADA_PROVINCES_META)) {
    const item = CANADA_PROVINCES_META[key];
    const match = {
      historicalName: item.historicalName,
      adminTitle: item.adminTitle,
      historicalNote: item.s0_1,
      name: item.name,
      modernName: item.modernName,
      capital: item.capital,
      note: item.s0_1,
    };
    const normName = item.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const lowId = item.id.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const lowIso = item.iso.toLowerCase().replace(/[^a-z0-9]/g, '_');

    const targetDict = (item.id === 'CA_NL') ? dict['UK'] : dict['CAN'];
    targetDict[normName] = match;
    targetDict[lowId] = match;
    targetDict[lowIso] = match;

    if (item.id === 'CA_NL') {
      dict['CAN'][normName] = match;
      dict['CAN'][lowId] = match;
      dict['CAN']['newfoundland'] = match;
      dict['CAN']['terranova'] = match;
      dict['CAN']['labrador'] = match;
      dict['UK']['newfoundland'] = match;
      dict['UK']['terranova'] = match;
      dict['UK']['labrador'] = match;
    }

    // Flat compatibility if dict is flat or accessed directly
    dict[lowId] = match;
    dict[lowIso] = match;
    dict[normName] = match;
  }
}
