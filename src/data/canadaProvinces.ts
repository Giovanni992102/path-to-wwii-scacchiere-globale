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
    getSovereign: (s: number) => (s >= 23 ? "CAN" : "UK"),
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

interface CanadaLateUpdate {
  s14_17?: string;
  s18: string;
  s19_20: string;
  s21: string;
  s22: string;
  s23?: string;
  hist18_21?: string;
  hist22?: string;
  hist23?: string;
  admin18_21?: string;
  admin22?: string;
  admin23?: string;
}

/**
 * Aggiornamento geostorico provincia per provincia delle 13 entità del Canada & Terranova
 * per le fasi finali del conflitto (Steps 14-17) e il dopoguerra (Steps 18-22: 1945 – Dic 1948).
 */
const CANADA_LATE_UPDATES: Record<string, CanadaLateUpdate> = {
  CA_ON: {
    s14_17: "Provincia dell'Ontario (1944–maggio 1945). Le fabbriche belliche di Toronto, Windsor e Fort William toccano il picco di produzione per la 1st Canadian Army impegnata da Juno Beach in Normandia fino alla liberazione dei Paesi Bassi; presso Chalk River si prepara il polo atomico congiunto anglo-canadese.",
    s18: "Provincia dell'Ontario (settembre 1945). A Ottawa il 5 settembre 1945 il cifrario sovietico Igor Gouzenko defeziona all'ambasciata URSS rivelando la rete spionistica atomica in Nord America: è l'episodio inaugurale della Guerra Fredda. Le industrie di Toronto e Windsor avviano la riconversione civile.",
    s19_20: "Provincia dell'Ontario (1947). Entra in vigore il Canadian Citizenship Act (1° gennaio 1947); il 22 luglio 1947 entra in criticità a Chalk River il reattore nucleare NRX (il più potente al mondo), mentre a Malton (Toronto) Avro Canada sviluppa il caccia CF-100 e l'aereo di linea a reazione C102 Jetliner.",
    s21: "Provincia dell'Ontario (giugno 1948). A Ottawa e Toronto il governo federale e la provincia (Premier George Drew) sostengono l'espansione idroelettrica sull'Ottawa River e le trattative segrete del Pentagono-Ottawa-Londra per un patto difensivo nordatlantico; l'uranio di Port Radium e la chimica di Sarnia alimentano il blocco occidentale.",
    s22: "Provincia dell'Ontario (dicembre 1948). A Ottawa il 15 novembre 1948 Louis St. Laurent succede a William Lyon Mackenzie King come Primo Ministro; l'11 dicembre 1948 firma i Terms of Union per l'ingresso di Terranova nella Confederazione (previsto per il 31 marzo 1949) e spinge per la conclusione del Patto Atlantico (NATO).",
    hist22: "Ontario (Ottawa — Governo Louis St. Laurent & Polo Industriale/Atomico di Chalk River, Dic 1948)",
    admin22: "Dominion of Canada — Province of Ontario (Federal PM Louis St. Laurent / Ottawa)",
  },
  CA_QC: {
    s14_17: "Provincia del Québec (1944–maggio 1945). Nonostante la seconda crisi della coscrizione del novembre 1944, i reggimenti francofoni (Royal 22e Régiment) combattono in Italia e in Europa nord-occidentale; Arvida e Shawinigan forniscono oltre un terzo dell'alluminio alleato.",
    s18: "Provincia del Québec (settembre 1945). Il porto di Montréal riconverte i cantieri Vickers al traffico commerciale dell'Atlantico e all'invio di aiuti UNRRA verso l'Europa; il premier Maurice Duplessis (Union Nationale) consolida l'autonomia provinciale e il programma d'elettrificazione rurale.",
    s19_20: "Provincia del Québec (1947). A Montréal ha sede l'ICAO (Organizzazione Internazionale dell'Aviazione Civile dell'ONU, aprile 1947). Nell'Ungava/Côte-Nord proseguono le grandi prospezioni del ferro della Hollinger-Hanna e lo sviluppo idroelettrico di Hydro-Québec sul fiume San Lorenzo.",
    s21: "Provincia del Québec (giugno 1948). Rieletto largamente nell'estate 1948 sotto l'insegna del fleurdelisé adottato nel gennaio 1948, Duplessis promuove lo sfruttamento minerario di amianto ad Asbestos e ferro nel Labrador-Ungava in forte crescita economica postbellica.",
    s22: "Provincia del Québec (dicembre 1948). L'ascesa del québécois Louis St. Laurent a Primo Ministro del Canada (15 novembre 1948) rafforza il consenso interno sulla politica atlantica e sui cantieri ferroviari/minerari della Côte-Nord (ferrovia Sept-Îles–Schefferville in preparazione per l'acciaio USA).",
    hist22: "Québec (Montréal / Québec City & Polo Alluminio/Ferro dell'Ungava, Dic 1948)",
    admin22: "Dominion of Canada — Province of Québec (Premier Maurice Duplessis / Federal PM St. Laurent)",
  },
  CA_NS: {
    s14_17: "Nuova Scozia (1944–maggio 1945). Halifax coordina la fase finale della Battaglia dell'Atlantico: gli immensi convogli di truppe verso la Gran Bretagna (incluso l'incrocio dei transatlantici Queen Mary/Queen Elizabeth) e la resa degli U-Boot tedeschi nel maggio 1945.",
    s18: "Nuova Scozia (settembre 1945). HMC Dockyard Halifax diventa centro principale del rimpatrio delle truppe canadesi dall'Europa sull'ondata di entusiasmo e dei disordini V-E Day del 1945; smobilitazione ordinata delle fregate e corvette della RCN.",
    s19_20: "Nuova Scozia (1947). Riconversione commerciale del porto di Halifax e dei bacini carboniferi e siderurgici di Sydney/Cape Breton (DOSCO); ammodernamento della rete ferroviaria e peschereccia atlantica verso il mercato statunitense.",
    s21: "Nuova Scozia (giugno 1948). Entrata in servizio della portaerei leggera HMCS Magnificent (aprile 1948) basata ad Halifax: la Royal Canadian Navy rilancia il comando operativo atlantico per la sorveglianza antisommergibile nella nascente Guerra Fredda.",
    s22: "Nuova Scozia (dicembre 1948). Halifax funge da snodo marittimo primario tra il Canada continentale e Terranova alla vigilia dei Terms of Union (11 dicembre 1948) e base atlantica chiave nei piani difensivi nordamericani-europei del governo St. Laurent.",
    hist22: "Nova Scotia (HMC Dockyard Halifax — RCN Atlantic Command & HMCS Magnificent, Dic 1948)",
  },
  CA_NB: {
    s14_17: "Nuovo Brunswick (1944–maggio 1945). Il porto invernale libero dai ghiacci di Saint John e i centri d'addestramento aereo di Moncton/Chatham sostengono lo sforzo finale alleato verso il fronte occidentale.",
    s18: "Nuovo Brunswick (settembre 1945). I cantieri di Saint John e la rete ferroviaria verso Moncton assorbono i trasporti di smobilitazione dall'Atlantico e avviano la ripresa dell'industria cartiera e boschiva.",
    s19_20: "Nuovo Brunswick (1947). Espansione dell'industria forestale, della pasta di legno e della pesca commerciale atlantica, con investimenti provinciali nella rete elettrica e nelle rotte marittime della Baia di Fundy.",
    s21: "Nuovo Brunswick (giugno 1948). Saint John e Chatham mantengono infrastrutture logistiche e aeroportuali di riserva della RCAF e del commercio atlantico canadese.",
    s22: "Nuovo Brunswick (dicembre 1948). Nel quadro delle politiche marittime di Ottawa sotto Louis St. Laurent e della futura integrazione di Terranova, Saint John rafforza i collegamenti ferroviari e portuali delle Province Marittime.",
  },
  CA_PE: {
    s14_17: "Isola del Principe Edoardo (1944–maggio 1945). Gli aerodromi militari di Summerside e Mount Pleasant completano la formazione dei navigatori del Commonwealth nel programma BCATP.",
    s18: "Isola del Principe Edoardo (settembre 1945). Riconversione agricola verso l'esportazione di patate da semina e latticini verso i mercati europei devastati e il Nord America; chiusura progressiva delle scuole aeree belliche.",
    s19_20: "Isola del Principe Edoardo (1947). Avvio dei nuovi traghetti rompighiaccio (Abegweit, 1947) sullo Stretto di Northumberland e sviluppo dell'agricoltura e pesca nell'economia postbellica.",
    s21: "Isola del Principe Edoardo (giugno 1948). RCAF Station Summerside viene mantenuta e riorientata alla ricognizione marittima e all'addestramento strumentale postbellico.",
    s22: "Isola del Principe Edoardo (dicembre 1948). Consolidamento rurale e portuale di Charlottetown nella Federazione Canadese del dopoguerra (PM Walter Jones / PM federale St. Laurent).",
  },
  CA_MB: {
    s14_17: "Manitoba (1944–maggio 1945). Il nodo ferroviario di Winnipeg coordina l'export cerealicolo verso l'Europa liberata e l'addestramento aerotrasportato finale di Shilo.",
    s18: "Manitoba (settembre 1945). Ripresa agricola ed espansione dei mercati del grano e del nichel-rame settentrionale (Flin Flon) nella transizione dalla produzione bellica alla ricostruzione internazionale.",
    s19_20: "Manitoba (1947). Fort Churchill sulla Baia di Hudson diviene stazione sperimentale congiunta USA-Canada per test militari e logistici artici (Exercise Musk Ox e ricerche subartiche).",
    s21: "Manitoba (giugno 1948). A Winnipeg e Flin Flon prosegue l'espansione mineraria e metallurgica mentre Camp Shilo rimane poligono centrale di artiglieria e paracadutismo dell'esercito canadese.",
    s22: "Manitoba (dicembre 1948). Il polo ferroviario di Winnipeg e la base subartica di Churchill rafforzano l'asse logistico centrale canadese tra le Praterie e l'Artico occidentale nel clima della Guerra Fredda.",
  },
  CA_SK: {
    s14_17: "Saskatchewan (1944–maggio 1945). Sotto il primo governo socialdemocratico CCF in Nord America (Tommy Douglas, eletto nel giugno 1944), le Praterie massimizzano la produzione di grano per i piani di soccorso europei UNRRA.",
    s18: "Saskatchewan (settembre 1945). L'amministrazione Tommy Douglas avvia le riforme pionieristiche sul debito agrario, le cooperative elettriche rurali e il modello ospedaliero pubblico provinciale.",
    s19_20: "Saskatchewan (1947). Il 1° gennaio 1947 entra in vigore lo Saskatchewan Hospital Services Plan, primo sistema sanitario ospedaliero universale in Nord America; avvio delle prospezioni di uranio nell'estremo nord attorno al Lago Athabasca (Uranium City).",
    s21: "Saskatchewan (giugno 1948). Rielezione di Tommy Douglas nel giugno 1948; espansione dei giacimenti di uranio nel bacino di Athabasca sotto egida Eldorado Mining and Refining e crescita delle esportazioni di grano verso il Piano Marshall.",
    s22: "Saskatchewan (dicembre 1948). Le riserve uranifere del nord e i raccolti cerealicoli sostengono il ruolo economico strategico del Canada occidentale e gli accordi commerciali transatlantici del dopoguerra.",
    hist22: "Saskatchewan (Regina · Modello Sanitario Tommy Douglas & Uranio di Athabasca, Dic 1948)",
  },
  CA_AB: {
    s14_17: "Alberta (1944–maggio 1945). Aerodromi di Edmonton (Northwest Staging Route) impegnati nel ponte aereo Lend-Lease di caccia e bombardieri verso l'Alaska e l'URSS; agricoltura e carbone a pieno regime.",
    s18: "Alberta (settembre 1945). Termine delle consegne aeree ALSIB verso la Siberia e riconversione di Edmonton e Calgary all'aviazione civile settentrionale, all'allevamento e all'agricoltura meccanizzata.",
    s19_20: "Alberta (1947). Svolta storica energetica il 13 febbraio 1947: il pozzo Leduc No. 1 (Imperial Oil, a sud di Edmonton) rivela giacimenti petroliferi colossali, innescando il grande boom petrolifero ed economico dell'Alberta occidentale.",
    s21: "Alberta (giugno 1948). Dopo la scoperta di Leduc e Redwater, l'Alberta si trasforma rapidamente nel cuore petrolifero del Canada; iniziano gli studi per il grande oleodotto Interprovincial Pipe Line verso i Grandi Laghi.",
    s22: "Alberta (dicembre 1948). Il boom di Leduc-Woodbend/Redwater moltiplica gli investimenti statunitensi e canadesi nell'energia nordamericana, mentre le basi aeree di Edmonton guidano la logistica verso lo Yukon e l'Artico.",
    hist22: "Alberta (Edmonton, Calgary & Boom Petrolifero di Leduc No. 1, Dic 1948)",
  },
  CA_BC: {
    s14_17: "Columbia Britannica (1944–maggio 1945). I cantieri di Vancouver e Victoria completano decine di navi mercantili Victory/North Sands e fregate RCN; a Trail COMINCO produce acqua pesante per il Progetto Manhattan.",
    s18: "Columbia Britannica (settembre 1945). A seguito della resa del Giappone, il Pacific Command di Esquimalt gestisce il rientro navale dal Pacifico, mentre Vancouver avvia la ripresa commerciale marittima transpacifica.",
    s19_20: "Columbia Britannica (1947). Espansione dell'industria forestale, idroelettrica e portuaria di Vancouver e New Westminster nel boom edilizio postbellico nordamericano.",
    s21: "Columbia Britannica (giugno 1948). La grande piena del fiume Fraser (maggio-giugno 1948) mobilita argini e genio militare federale; Esquimalt opera come base pacifica postbellica della RCN.",
    s22: "Columbia Britannica (dicembre 1948). Il porto di Vancouver diviene terminale asiatico-pacifico prioritario per grano e legname, mentre gli Stati Uniti e Ottawa coordinano la difesa navale nord-pacifica da Esquimalt e Prince Rupert.",
    hist22: "British Columbia (Vancouver, Victoria & RCN Pacific Command Esquimalt, Dic 1948)",
  },
  CA_NL: {
    s14_17: "Dominion di Terranova e Labrador (1944–maggio 1945). Sotto Commission of Government britannica, l'aeroporto di Gander, la base USA di Argentia e St. John's guidano il supporto atlantico fino alla resa dei sommergibili tedeschi del maggio 1945.",
    s18: "Dominion di Terranova (settembre 1945). A guerra conclusa resta sospeso il governo responsabile; Londra istituisce le elezioni per la National Convention di Terranova incaricata di proporre il futuro costituzionale del Dominion.",
    s19_20: "Dominion di Terranova (1947). Dibattiti infuocati nella National Convention tra i fautori dell'indipendenza responsabile (Peter Cashin) e l'ala confederale guidata da Joey Smallwood favorevole all'adesione al Canada.",
    s21: "Dominion di Terranova (30 giugno 1948). Terranova resta ancora Dominion separato sotto Corona britannica (NON ancora provincia canadese): al primo referendum del 3 giugno 1948 nessuno schieramento raggiunge la maggioranza assoluta (Responsible Gov. 44,6%, Confederazione 41,1%), rendendo necessario il ballottaggio di luglio.",
    s22: "Dominion di Terranova (31 dicembre 1948). Al ballottaggio del 22 luglio 1948 vince la Confederazione con il Canada (52,3% vs 47,7%), e l'11 dicembre 1948 a Ottawa vengono firmati i Terms of Union; tuttavia giuridicamente e sulla mappa fino al 31 marzo 1949 Terranova permane entità britannica distinta sotto Commission of Government (Governatore Sir Gordon Macdonald).",
    s23: "Provincia di Terranova e Labrador (31 marzo – 30 giugno 1949). A mezzanotte del 31 marzo 1949 cessa il Dominion di Terranova sotto amministrazione britannica e l'intero territorio entra nella Confederazione Canadese come decima provincia (Premier Joey Smallwood), partecipando pochi giorni dopo con il Canada tra i membri fondatori del Patto Atlantico (NATO, 4 aprile 1949).",
    hist18_21: "Dominion of Newfoundland (Commission of Government — Verso il Referendum 1948)",
    hist22: "Dominion of Newfoundland (Post-Referendum 1948 & Terms of Union 11 Dic — Unione al Canada nel Mar 1949)",
    hist23: "Province of Newfoundland and Labrador (10ª Provincia del Canada dal 31 Marzo 1949 · NATO)",
    admin18_21: "Dominion of Newfoundland (British Commission of Government — Gov. Sir Gordon Macdonald)",
    admin22: "Dominion of Newfoundland (British Commission of Government — Terms of Union 11 Dic 1948, Effettivo 31 Mar 1949)",
    admin23: "Dominion of Canada — Province of Newfoundland (10th Province, 31 Mar 1949 · Premier Joey Smallwood · NATO)",
  },
  CA_NT: {
    s14_17: "Territori del Nord-Ovest (1944–maggio 1945). Nel 1944 Ottawa nazionalizza la miniera Eldorado di Port Radium come Crown Corporation (Eldorado Mining and Refining) per garantire l'uranio al Progetto Manhattan; completato l'oleodotto CANOL da Norman Wells allo Yukon.",
    s18: "Territori del Nord-Ovest (settembre 1945). Port Radium prosegue segretamente l'estrazione prioritaria di uranio per le scorte atomiche anglo-americane all'indomani di Hiroshima e Nagasaki, mentre Yellowknife conosce una nuova febbre aurifera.",
    s19_20: "Territori del Nord-Ovest (1947). Con la legge federale sull'energia atomica, Eldorado Mining resta cardine nucleare del blocco occidentale; costruzione di nuove piste artiche e potenziamento radio di Fort Smith e Yellowknife.",
    s21: "Territori del Nord-Ovest (giugno 1948). Ricognizioni congiunte USA-Canada per la difesa aerea transpolare e l'estrazione strategica nel distretto del Mackenzie.",
    s22: "Territori del Nord-Ovest (dicembre 1948). L'uranio del Great Bear Lake e i rilievi artici consolidano il ruolo di prima linea dei Territori del Nord-Ovest nella difesa continentale nordamericana (avvio pianificazione radar del Nord).",
    hist22: "Northwest Territories (Port Radium Eldorado Uranium & Yellowknife, Dic 1948)",
  },
  CA_YT: {
    s14_17: "Territorio dello Yukon (1944–maggio 1945). L'Alaska Highway e la Northwest Staging Route da Whitehorse trasferiscono migliaia di velivoli e rifornimenti bellici verso l'Alaska e la Siberia sovietica (ALSIB).",
    s18: "Territorio dello Yukon (settembre 1945). Chiuso il ponte aereo ALSIB, il territorio prepara il trasferimento dell'Alaska Highway dal controllo militare statunitense all'esercito canadese.",
    s19_20: "Territorio dello Yukon (1947). Il 1° aprile 1946 il tratto canadese dell'Alaska Highway passa formalmente alla gestione del Northwest Highway System dell'esercito canadese; ripresa delle miniere argentifere di Mayo/Keno Hill e turismo/commercio su Whitehorse.",
    s21: "Territorio dello Yukon (giugno 1948). Whitehorse sostituisce progressivamente Dawson City come vero centro amministrativo, stradale e aeroportuale dello Yukon postbellico.",
    s22: "Territorio dello Yukon (dicembre 1948). L'arteria strategica dell'Alaska Highway e gli aeroporti di Whitehorse garantiscono il collegamento permanente tra la British Columbia, lo Yukon e i comandi statunitensi in Alaska.",
    hist22: "Yukon Territory (Whitehorse & Northwest Highway System — Ex Alaska Highway, Dic 1948)",
  },
  CA_NU: {
    s14_17: "Artico Orientale — Distretti di Franklin & Keewatin (1944–maggio 1945). Nel 1944 la goletta della RCMP St. Roch completa lo storico ritorno attraverso il Passaggio a Nord-Ovest in una sola stagione; Frobisher Bay (Iqaluit) opera come scalo chiave della Crimson Route.",
    s18: "Artico Orientale — Distretti di Franklin & Keewatin (settembre 1945). Con la fine del conflitto le stazioni della Terra di Baffin e di Coral Harbour tornano a gestione civile-federale canadese sotto stretta tutela sulla sovranità artica.",
    s19_20: "Artico Orientale (1947). Nel 1947 Canada e Stati Uniti inaugurano la rete congiunta JAWS (Joint Arctic Weather Stations): fondate le stazioni meteorologiche polari avanzate di Eureka (Isola Ellesmere, apr 1947) e Resolute Bay (Isola Cornwallis, ago 1947).",
    s21: "Artico Orientale (giugno 1948). Espansione della rete meteo artica JAWS (Isachsen e Mould Bay nel 1948) con supporto aeronavale congiunto tra le isole dell'Alto Artico.",
    s22: "Artico Orientale (dicembre 1948). La rete JAWS nell'Arcipelago Artico fornisce dati essenziali per le rotte aeree polari dell'USAF/RCAF e per la difesa strategica della frontiera boreale occidentale.",
    hist22: "Eastern Arctic Districts (Franklin & Keewatin — Rete Artica JAWS Eureka/Resolute, Dic 1948)",
  },
};

for (const meta of new Set(Object.values(CANADA_PROVINCES_META))) {
  const upd = CANADA_LATE_UPDATES[meta.id];
  if (!upd) continue;
  const origNote = meta.getNote.bind(meta);
  const origHist = meta.getHistoricalName.bind(meta);
  const origAdmin = meta.getAdminTitle.bind(meta);

  meta.getNote = (s: number) => {
    if (s >= 23) return upd.s23 || `${upd.s22} Con il 31 marzo 1949 Terranova entra nel Canada come decima provincia e il 4 aprile 1949 il Canada sottoscrive il Patto Atlantico (NATO).`;
    if (s >= 22) return upd.s22;
    if (s >= 21) return upd.s21;
    if (s >= 19) return upd.s19_20;
    if (s >= 18) return upd.s18;
    if (s >= 14 && upd.s14_17) return upd.s14_17;
    return origNote(s);
  };
  meta.getHistoricalName = (s: number) => {
    if (s >= 23 && upd.hist23) return upd.hist23;
    if (s >= 22 && upd.hist22) return upd.hist22;
    if (s >= 18 && upd.hist18_21) return upd.hist18_21;
    return origHist(s);
  };
  meta.getAdminTitle = (s: number) => {
    if (s >= 23) {
      return upd.admin23 || `${origAdmin(s)} (Confederazione a 10 Province & Membro Fondatore NATO — 4 Apr 1949)`;
    }
    if (s >= 22) {
      return upd.admin22 || `${origAdmin(s)} (Governo Federale Louis St. Laurent — Dic 1948)`;
    }
    if (s >= 18 && upd.admin18_21) return upd.admin18_21;
    return origAdmin(s);
  };
}

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
