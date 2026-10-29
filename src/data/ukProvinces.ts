/**
 * Censimento Geocartografico e Toponomastico delle Province del Regno Unito di Gran Bretagna e Irlanda del Nord (1936-1941)
 * Copertura esaustiva e rigorosa di tutti i 179 Distretti Metropolitani NUTS-3 (Inghilterra 133, Galles 12, Scozia 23, Irlanda del Nord 11)
 * piu le 3 Dipendenze della Corona (Isola di Man, Jersey, Guernsey) per un totale di 182 entita storico-geografiche.
 *
 * Timeline Storica (Step 0 - 8):
 * - Step 0-1 (1936 - mar 1938): Regno di Re Giorgio V, crisi di abdicazione di Edoardo VIII per Wallis Simpson, ascesa di Re Giorgio VI.
 *   Neville Chamberlain Primo Ministro; Shadow Factory Plan (conversione automobilistica e aeronautica di Austin, Rover, Morris);
 *   sviluppo pionieristico dei caccia Supermarine Spitfire e Hawker Hurricane; radar Chain Home a Bawdsey Manor.
 * - Step 2-4 (ott 1938 - apr 1939): Accordi di Monaco ("Peace for our time"); difesa passiva ARP, distribuzione di 38 milioni di maschere antigas
 *   e rifugi Anderson shelters; garanzia militare alla Polonia e Military Training Act 1939 (coscrizione in tempo di pace).
 * - Step 5 (set 1939 - mag 1940): 3 settembre 1939 dichiarazione di guerra al Terzo Reich; Operazione Pied Piper (evacuazione di 1,5 milioni di bambini);
 *   BEF in Francia; Phoney War; 14 ottobre 1939 affondamento della corazzata HMS Royal Oak a Scapa Flow (U-47 di Prien); Campagna di Norvegia.
 * - Step 6 (giu - ago 1940): 10 maggio 1940 Winston Churchill Primo Ministro ("Blood, toil, tears and sweat"); Operazione Dynamo a Dunkerque
 *   (338.226 soldati alleati evacuati dalle Little Ships); "We shall fight on the beaches"; demilitarizzazione e occupazione Wehrmacht delle Isole del Canale
 *   (Jersey e Guernsey passano sotto sovranita tedesca); Battaglia d'Inghilterra (Fighter Command di Dowding e Park contro la Luftwaffe).
 * - Step 7 (ott 1940): The Blitz (57 notti consecutive di bombardamenti su Londra, metropolitana rifugio antiaereo); distruzione di Coventry
 *   (14 novembre 1940, "coventrizzazione"), Birmingham, Liverpool, Manchester, Bristol, Southampton; Battaglia dell'Atlantico
 *   (Western Approaches Command a Liverpool); accordo Destroyers for Bases con gli Stati Uniti.
 * - Step 8 (apr 1941): Approvazione del Lend-Lease Act (marzo 1941); ultimi feroci raid del Blitz (Clydebank Blitz sui cantieri navali,
 *   Belfast Blitz su Harland & Wolff, Plymouth Blitz, Liverpool May Blitz, raid del 10 maggio su Westminster);
 *   decifrazione di Enigma a Bletchley Park (Alan Turing, intelligence Ultra) e vittoria navale di Capo Matapan.
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

export interface UKProvinceInfo {
  nuts: string;
  name: string;
  modernName: string;
  historicalName: string;
  historicCounty: string;
  country: 'England' | 'Scotland' | 'Wales' | 'Northern Ireland' | 'Crown Dependency';
  capital: string;
  region: string;
  keys: string[];
  s0_1: string;
  s2_4: string;
  s5: string;
  s6: string;
  s7: string;
  s8: string;
  getNote: (s: number) => string;
  getHistoricalName: (s: number) => string;
  getAdminTitle: (s: number) => string;
  getSovereign: (s: number) => string;
  getFaction: (s: number) => FactionType;
}

export const UK_PROVINCES_META: Record<string, UKProvinceInfo> = {
  "GG": {
    nuts: "GG",
    name: "Guernsey",
    modernName: "Bailiwick of Guernsey (Crown Dependency, Channel Islands)",
    historicalName: "Guernsey (Bailiwick of Guernsey / Isole del Canale, Alderney & Festung Guernsey)",
    historicCounty: "Channel Islands",
    country: "Crown Dependency",
    capital: "Saint Peter Port",
    region: "Crown Dependencies",
    keys: ["guernsey", "bailiwick_of_guernsey", "saint_peter_port", "st_peter_port", "alderney", "sark", "channel_islands", "festung_guernsey", "gg", "ggy"],
    s0_1: "Baliato autonomo della Corona britannica comprendente le isole di Guernsey, Alderney, Sark e Herm; Saint Peter Port capitale marittima storica ricca di commerci.",
    s2_4: "Misure di difesa civile e coscrizione nella Royal Guernsey Militia; le isole mantengono forti legami storici e culturali con la Normandia e la Gran Bretagna.",
    s5: "Giugno 1940: evacuazione della quasi totalità della popolazione dell'isola di Alderney e di oltre 17.000 scolari e civili di Guernsey verso la Gran Bretagna prima dell'arrivo tedesco.",
    s6: "28 giugno 1940: la Luftwaffe bombarda Saint Peter Port credendo che i camion di pomodori siano carichi militari; il 30 giugno 1940 truppe tedesche occupano Guernsey: unico territorio britannico occupato.",
    s7: "Occupazione tedesca: razionamento ferreo e coprifuoco; la Dame di Sark (Sibyl Hathaway) preserva una dignitosa autonomia contrattando con gli ufficiali della guarnigione della Wehrmacht.",
    s8: "L'Organisation Todt fortifica Guernsey e costruisce ad Alderney quattro campi di concentramento gestiti dalle SS (Lager Norderney e Lager Sylt) dove centinaia di prigionieri sovietici muoiono per i lavori forzati.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["GG"].s8;
      if (s >= 7) return UK_PROVINCES_META["GG"].s7;
      if (s >= 6) return UK_PROVINCES_META["GG"].s6;
      if (s >= 5) return UK_PROVINCES_META["GG"].s5;
      if (s >= 2) return UK_PROVINCES_META["GG"].s2_4;
      return UK_PROVINCES_META["GG"].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s >= 6) return "Guernsey (Deutsche Dienststelle / Festung Guernsey)";
      return UK_PROVINCES_META["GG"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s >= 6) return "Militärverwaltung in Frankreich (Deutsche Wehrmacht / Festung Channel Islands)";
      return "Channel Islands (British Crown Dependency)";
    },
    getSovereign: (s: number) => {
      if (s >= 6) return "GER";
      return "UK";
    },
    getFaction: (s: number) => {
      if (s >= 6) return 'Asse' as FactionType;
      return 'Alleati' as FactionType;
    },
  },
  "IM": {
    nuts: "IM",
    name: "Isle of Man",
    modernName: "Isle of Man (Crown Dependency, Ellan Vannin)",
    historicalName: "Isle of Man (Crown Dependency of the Isle of Man / Tynwald & Hutchinson Internment Camp)",
    historicCounty: "Isle of Man",
    country: "Crown Dependency",
    capital: "Douglas",
    region: "Crown Dependencies",
    keys: ["isle_of_man", "ellan_vannin", "douglas", "man", "mann", "isola_di_man", "tynwald", "hutchinson_camp", "raf_jurby", "im", "imn", "gbm"],
    s0_1: "Dipendenza della Corona britannica nel Mare d'Irlanda con parlamento millenario autonomo (Tynwald), retta dal Luogotenente Governatore Sir Montagu Butler; celebre per le corse del Tourist Trophy (TT).",
    s2_4: "Piani di requisizione degli oltre 2.000 alberghi e pensioni balneari di Douglas, Ramsey e Port Erin per essere convertiti in campi d'internamento per cittadini nemici in caso di guerra.",
    s5: "Maggio 1940: apertura dei grandi campi d'internamento civili (tra cui l'Hutchinson Camp a Douglas per rifugiati ebrei, accademici e artisti di lingua tedesca, e Mooragh Camp); apertura della base RAF Jurby.",
    s6: "Hutchinson Camp diviene celebre come 'The Artists' Camp' (ospitando intellettuali come Kurt Schwitters); internamento dei fascisti britannici della BUF di Oswald Mosley; RAF Jurby addestra navigatori.",
    s7: "Le stazioni aeree di RAF Jurby e RAF Andreas addestrano migliaia di aviatori della RAF e del Commonwealth; pattugliamento aereo continuo del Mare d'Irlanda a scorta dei convogli per Liverpool.",
    s8: "L'Isola di Man contribuisce attivamente alla vittoria navale con la propria flotta di marinai della Manx Steam Packet Company, le cui navi parteciparono con valore a Dunkerque.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["IM"].s8;
      if (s >= 7) return UK_PROVINCES_META["IM"].s7;
      if (s >= 6) return UK_PROVINCES_META["IM"].s6;
      if (s >= 5) return UK_PROVINCES_META["IM"].s5;
      if (s >= 2) return UK_PROVINCES_META["IM"].s2_4;
      return UK_PROVINCES_META["IM"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["IM"].historicalName;
    },
    getAdminTitle: (s: number) => {
      return "Crown Dependency of the Isle of Man";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "JE": {
    nuts: "JE",
    name: "Jersey",
    modernName: "Bailiwick of Jersey (Crown Dependency, Channel Islands)",
    historicalName: "Jersey (Bailiwick of Jersey / Isole del Canale, Festung Jersey & Atlantikwall)",
    historicCounty: "Channel Islands",
    country: "Crown Dependency",
    capital: "Saint Helier",
    region: "Crown Dependencies",
    keys: ["jersey", "bailiwick_of_jersey", "saint_helier", "st_helier", "channel_islands", "festung_jersey", "je", "jey"],
    s0_1: "Baliato autonomo della Corona britannica nelle Isole del Canale al largo delle coste della Normandia, retto dal Luogotenente Governatore e dagli Stati di Jersey; agricoltura e turismo fiorenti.",
    s2_4: "Preparativi di difesa civile ARP e mobilitazione della Royal Militia of the Island of Jersey; la popolazione mantiene fedeltà assoluta a Re Giorgio VI.",
    s5: "Dichiarazione di guerra: molti giovani isolani si arruolano nelle forze armate metropolitane; piani d'evacuazione marittima verso l'Inghilterra.",
    s6: "19-20 giugno 1940: il governo britannico demilitarizza le Isole del Canale dichiarandole indifendibili; il 1° luglio 1940 la Luftwaffe e la Wehrmacht atterrano a Jersey: inizio dell'occupazione tedesca.",
    s7: "Istituzione del comando d'occupazione militare tedesco (Militärverwaltung); imposizione del coprifuoco, censura e cambio della valuta; la popolazione vive sotto occupazione del Terzo Reich.",
    s8: "Hitler ordina la trasformazione di Jersey in una fortezza inespugnabile (Festung Jersey): l'Organisation Todt impiega migliaia di prigionieri ai lavori forzati per costruire imponenti bunker e casematte costiere.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["JE"].s8;
      if (s >= 7) return UK_PROVINCES_META["JE"].s7;
      if (s >= 6) return UK_PROVINCES_META["JE"].s6;
      if (s >= 5) return UK_PROVINCES_META["JE"].s5;
      if (s >= 2) return UK_PROVINCES_META["JE"].s2_4;
      return UK_PROVINCES_META["JE"].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s >= 6) return "Jersey (Deutsche Wehrmacht Kommandantur / Festung Jersey)";
      return UK_PROVINCES_META["JE"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s >= 6) return "Militärverwaltung in Frankreich (Deutsche Wehrmacht / Festung Channel Islands)";
      return "Channel Islands (British Crown Dependency)";
    },
    getSovereign: (s: number) => {
      if (s >= 6) return "GER";
      return "UK";
    },
    getFaction: (s: number) => {
      if (s >= 6) return 'Asse' as FactionType;
      return 'Alleati' as FactionType;
    },
  },
  "UKC11": {
    nuts: "UKC11",
    name: "Hartlepool and Stockton-on-Tees",
    modernName: "Hartlepool and Stockton-on-Tees (County Durham, North East England)",
    historicalName: "Hartlepool and Stockton-on-Tees (County Durham / Cantieri Navali e Ingegneria Pesante)",
    historicCounty: "County Durham",
    country: "England",
    capital: "Hartlepool",
    region: "North East",
    keys: ["hartlepool", "stockton_on_tees", "tees", "william_gray", "teesside_north", "ukc11"],
    s0_1: "Centro marittimo e siderurgico del County Durham imperniato sui cantieri navali William Gray & Company e le fonderie del fiume Tees; ripresa graduale dalla Grande Depressione sotto il governo Baldwin e Chamberlain.",
    s2_4: "Mobilitazione civile ARP, allestimento di postazioni antiaeree per proteggere gli scali navali e le officine meccaniche; produzione di navi da carico per il piano navale mercantile d'emergenza.",
    s5: "Conversione totale dei cantieri alla riparazione navale d'urgenza e alla produzione bellica mercantile; pattugliamento delle rotte carbonifere della costa orientale nel Mare del Nord contro le mine magnetiche nemiche.",
    s6: "Allestimento di difese costiere anti-invasione lungo le spiagge del Tees; supporto logistico e riparazione rapida dei cacciatorpediniere e dragamine danneggiati durante l'evacuazione di Dunkerque.",
    s7: "Obiettivo frequente delle sortite notturne della Luftwaffe contro le infrastrutture portuali e i bacini industriali; la popolazione operaia lavora senza sosta per rimpiazzare le perdite marittime.",
    s8: "Espansione della produzione di navi scorta e riparazione di convogli scampati agli attacchi U-Boot nella rotta dell'Atlantico settentrionale e del Mare del Nord.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKC11"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKC11"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKC11"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKC11"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKC11"].s2_4;
      return UK_PROVINCES_META["UKC11"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKC11"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKC12": {
    nuts: "UKC12",
    name: "South Teesside",
    modernName: "South Teesside (Redcar and Cleveland, Middlesbrough, North East England)",
    historicalName: "South Teesside (Yorkshire North Riding / Middlesbrough & Siderurgia Dorman Long)",
    historicCounty: "Yorkshire (North Riding)",
    country: "England",
    capital: "Middlesbrough",
    region: "North East",
    keys: ["south_teesside", "middlesbrough", "redcar", "cleveland", "dorman_long", "ukc12"],
    s0_1: "Capitale dell'acciaio imperiale con gli immensi altoforni Dorman Long e Smith's Dock; laminazione delle piastre d'acciaio per la costruzione navale e l'ingegneria dell'Impero Britannico.",
    s2_4: "Istituzione di comitati di difesa industriale contro i raid aerei; modernizzazione delle colate d'acciaio per soddisfare i contratti accelerati di riarmo del Ministero del Coordinamento della Difesa.",
    s5: "Avvio del regime produttivo d'emergenza: produzione a getto continuo di travi e piastre d'acciaio per casematte, rifugi Anderson e armature corazzate navali sotto oscuramento totale.",
    s6: "Primo bombardamento aereo sul suolo britannico a Middlesbrough (notte del 24-25 maggio 1940); mobilitazione dei lavoratori della Home Guard a guardia dei ponti sul Tees e degli altiforni.",
    s7: "Continui allarmi notturni della Luftwaffe guidata dal bagliore delle acciaierie; la produzione non si arresta, fornendo la materia prima essenziale per l'industria degli armamenti.",
    s8: "Acciaierie al massimo regime per la costruzione di scafi navali per il programma di convogli e lamiere speciali per i carri armati dell'esercito britannico.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKC12"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKC12"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKC12"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKC12"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKC12"].s2_4;
      return UK_PROVINCES_META["UKC12"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKC12"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKC13": {
    nuts: "UKC13",
    name: "Darlington",
    modernName: "Darlington (County Durham, North East England)",
    historicalName: "Darlington (County Durham / Officine Ferroviarie LNER & Ingegneria Meccanica)",
    historicCounty: "County Durham",
    country: "England",
    capital: "Darlington",
    region: "North East",
    keys: ["darlington", "lner_darlington", "durham_south", "ukc13"],
    s0_1: "Culla storica delle ferrovie moderne e sede delle prestigiose officine ferroviarie della London and North Eastern Railway (LNER Stooperdale Works); ingegneria meccanica di prim'ordine.",
    s2_4: "Piani di transizione bellica delle officine per la riparazione urgente di locomotive a vapore pesanti e la fornitura di carrelli ferroviari per il trasporto truppe e munizioni.",
    s5: "Le officine LNER convertono parte dei macchinari alla tornitura di corpi bomba, proiettili d'artiglieria e scambi ferroviari speciali per le reti militari segrete.",
    s6: "Smistamento continuo di convogli truppe verso i porti di imbarco e accoglienza di migliaia di soldati evacuati da Dunkerque attraverso lo snodo della East Coast Main Line.",
    s7: "Produzione intensiva di carrozze blindate e componenti pesanti per il ministero dell'Approvvigionamento; la città accoglie sfollati e bambini dall'East End di Londra.",
    s8: "Riparazione accelerata delle locomotive danneggiate dai raid per garantire il flusso ininterrotto di rifornimenti verso i porti navali del Tyne e del Clyde.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKC13"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKC13"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKC13"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKC13"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKC13"].s2_4;
      return UK_PROVINCES_META["UKC13"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKC13"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKC14": {
    nuts: "UKC14",
    name: "Durham CC",
    modernName: "Durham County (County Durham, North East England)",
    historicalName: "Durham County (County Durham / Bacino Carbonifero & Tradizione Mineraria)",
    historicCounty: "County Durham",
    country: "England",
    capital: "Durham",
    region: "North East",
    keys: ["durham", "durham_cc", "county_durham", "durham_miners", "bishop_auckland", "chester_le_street", "ukc14"],
    s0_1: "Bacino minerario di primaria importanza con centinaia di pozzi di carbone fossile e una classe operaia coesa rappresentata dalla Durham Miners' Association; cattedrale e castello normanni.",
    s2_4: "Accordi tra governo e sindacati per garantire la continuità estrattiva in caso di conflitto; prime esercitazioni ARP nei villaggi minerari e scavo di trincee difensive.",
    s5: "Il carbone del Durham viene dichiarato risorsa strategica assoluta per alimentare le centrali elettriche, i treni e le turbine a vapore della Royal Navy.",
    s6: "Istituzione della Home Guard nei distretti minerari; molti minatori vengono dichiarati 'reserved occupation' per scongiurare cali nell'estrazione carbonifera indispensabile.",
    s7: "Fornitura essenziale di combustibile fossile per sostenere lo sforzo bellico metropolitano mentre Londra e il sud affrontano il Blitz; ospitalità diffusa per famiglie evacuate.",
    s8: "Aumento delle quote estrattive e impiego di giovani leve; la cattedrale di Durham rimane intatta pur fungendo da punto di riferimento per le rotte aeree.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKC14"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKC14"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKC14"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKC14"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKC14"].s2_4;
      return UK_PROVINCES_META["UKC14"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKC14"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKC21": {
    nuts: "UKC21",
    name: "Northumberland",
    modernName: "Northumberland (North East England)",
    historicalName: "Northumberland (Contea di Frontiera / Difesa Costiera & Bacini Minerari)",
    historicCounty: "Northumberland",
    country: "England",
    capital: "Morpeth / Alnwick",
    region: "North East",
    keys: ["northumberland", "alnwick", "morpeth", "berwick_upon_tweed", "blyth", "ukc21"],
    s0_1: "Vasta contea costiera e montuosa al confine scozzese; porto carbonifero di Blyth e storica base di pescherecci e sommergibili minori della Royal Navy.",
    s2_4: "Potenziamento della sorveglianza marittima costiera; piani per la difesa dei varchi settentrionali e installazione di fari d'avvistamento per il Royal Observer Corps.",
    s5: "Blyth diviene base operativa avanzata per la 6ª Flottiglia Sommergibili della Royal Navy; pattugliamenti serrati del Mar del Nord contro le incursioni tedesche.",
    s6: "Costruzione di casematte 'pillbox' e sbarramenti anticarro lungo la costa per contrastare possibili sbarchi della Wehrmacht provenienti dalla Norvegia occupata.",
    s7: "Base caccia RAF Acklington e RAF Milfield in costante attività per intercettare i bombardieri della Luftflotte 5 decollati dagli aeroporti della Scandinavia occupata.",
    s8: "Intenso traffico marittimo costiero per convogliare il carbone verso il Tamigi sotto la scorta dei cacciatorpediniere e della RAF contro i siluranti nemici.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKC21"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKC21"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKC21"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKC21"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKC21"].s2_4;
      return UK_PROVINCES_META["UKC21"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKC21"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKC22": {
    nuts: "UKC22",
    name: "Tyneside",
    modernName: "Tyneside (Newcastle upon Tyne, Gateshead, North & South Tyneside)",
    historicalName: "Tyneside (Newcastle upon Tyne & Wallsend / Arsenale Meccanico Swan Hunter)",
    historicCounty: "Northumberland / County Durham",
    country: "England",
    capital: "Newcastle upon Tyne",
    region: "North East",
    keys: ["tyneside", "newcastle", "newcastle_upon_tyne", "gateshead", "wallsend", "swan_hunter", "elswick", "ukc22"],
    s0_1: "Capitale industriale e navale del nord-est imperniata sui cantieri Swan Hunter a Wallsend e gli stabilimenti d'armamento Vickers-Armstrongs a Elswick; costruzione di navi da guerra e artiglierie.",
    s2_4: "Varata la corazzata HMS King George V (1939) e completamento di cacciatorpediniere classe Tribal; massicci rifugi sotterranei scavati lungo il tunnel Victoria a Newcastle.",
    s5: "Piena mobilitazione bellica: cantieri al lavoro giorno e notte per varare navi scorta e la portaerei HMS Victorious; Elswick produce cannoni navali e corazze pesanti.",
    s6: "Riparazione lampo dei cacciatorpediniere danneggiati a Dunkerque e in Norvegia; allerta massima della contraerea per proteggere i ponti monumentali sul Tyne.",
    s7: "Raid aerei notturni della Luftwaffe (Tyneside Blitz) con bombe ad alto esplosivo su Wallsend, Jarrow e Newcastle; gli operai lavorano sotto l'oscuramento per non interrompere i varamenti.",
    s8: "Consegna di decine di unità da guerra per la scorta ai convogli atlantici e artiglierie campali per la difesa del Regno Unito e il teatro nordafricano.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKC22"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKC22"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKC22"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKC22"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKC22"].s2_4;
      return UK_PROVINCES_META["UKC22"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKC22"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKC23": {
    nuts: "UKC23",
    name: "Sunderland",
    modernName: "Sunderland (Tyne and Wear, North East England)",
    historicalName: "Sunderland (County Durham / Wearside & Capitale Mondiale della Costruzione Mercantile)",
    historicCounty: "County Durham",
    country: "England",
    capital: "Sunderland",
    region: "North East",
    keys: ["sunderland", "wearside", "river_wear", "doxford", "thompson_sons", "ukc23"],
    s0_1: "Il più grande agglomerato al mondo di cantieri per navi mercantili sul fiume Wear (William Doxford, J.L. Thompson & Sons, Austin & Pickersgill); motori marini diesel d'avanguardia.",
    s2_4: "Piani di costruzione in serie di navi da carico standard per rimpiazzare le perdite ipotizzate in caso di blocco navale sottomarino nemico.",
    s5: "I cantieri del Wear sfornano navi da carico e petroliere a ritmo record; progettazione delle prime navi mercantili standard che ispireranno le 'Liberty ships'.",
    s6: "Sunderland sotto attacco aereo durante la Battaglia d'Inghilterra: gli stabilimenti navali e i moli sul Wear vengono bersagliati dai bombardieri Heinkel He 111.",
    s7: "Feroce Sunderland Blitz: distruzione di quartieri residenziali e officine sul fiume, ma i bacini di carenaggio continuano a completare scafi mercantili vitali per la sopravvivenza.",
    s8: "Record assoluto di tonnellaggio mercantile varato per vincere la Battaglia dell'Atlantico, nonostante le incursioni nemiche e la carenza di materie prime.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKC23"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKC23"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKC23"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKC23"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKC23"].s2_4;
      return UK_PROVINCES_META["UKC23"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKC23"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD11": {
    nuts: "UKD11",
    name: "West Cumbria",
    modernName: "West Cumbria (Barrow-in-Furness, Copeland, Allerdale, North West England)",
    historicalName: "West Cumbria (Cumberland / Barrow Cantieri Navali Vickers-Armstrongs Sommergibili)",
    historicCounty: "Cumberland / Lancashire North of the Sands",
    country: "England",
    capital: "Barrow-in-Furness",
    region: "North West",
    keys: ["west_cumbria", "barrow_in_furness", "barrow", "copeland", "allerdale", "ukd11"],
    s0_1: "Barrow-in-Furness è il centro d'eccellenza mondiale della Vickers-Armstrongs per la progettazione e costruzione di sommergibili per la Royal Navy (classi T e U) e cannoni navali pesanti.",
    s2_4: "Ampliamento dei bacini sommergibili e accelerazione delle commesse della Royal Navy; fortificazioni costiere e rifugi protetti per maestranze specializzate.",
    s5: "Costruzione frenetica di sommergibili per la guerra sottomarina nel Mare del Nord e nel Mediterraneo; miniere di ematite cumbriana al massimo regime per la siderurgia.",
    s6: "Consegna di sommergibili per contrastare l'invasione navale tedesca della Norvegia; difese antiaeree rinforzate a Barrow contro gli attacchi decollati dalla Francia occupata.",
    s7: "Inizio dei pesanti bombardamenti su Barrow da parte della Luftwaffe mirati a distruggere i cantieri sottomarini; eroismo dei vigili del fuoco e degli operai nei bacini.",
    s8: "Barrow Blitz nell'aprile-maggio 1941 con gravi danni alla cittadina, ma la produzione di sommergibili riprende rapidamente grazie ai cantieri corazzati interni.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD11"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD11"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD11"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD11"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD11"].s2_4;
      return UK_PROVINCES_META["UKD11"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD11"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD12": {
    nuts: "UKD12",
    name: "East Cumbria",
    modernName: "East Cumbria (Carlisle, Eden, South Lakeland, North West England)",
    historicalName: "East Cumbria (Cumberland & Westmorland / Carlisle Nodo Ferroviario & Longtown)",
    historicCounty: "Cumberland & Westmorland",
    country: "England",
    capital: "Carlisle",
    region: "North West",
    keys: ["east_cumbria", "carlisle", "eden", "kendal", "south_lakeland", "westmorland", "longtown", "ukd12"],
    s0_1: "Regione di incantevole bellezza paesaggistica (Lake District) con Carlisle snodo ferroviario strategico tra Londra e la Scozia e centro agricolo e di guarnigione.",
    s2_4: "Costruzione del gigantesco deposito munizioni sotterraneo e di superficie CAD Longtown, il più vasto d'Europa per lo stoccaggio di proiettili e materiali d'armamento.",
    s5: "Carlisle diviene punto nevralgico di transito per convogli truppe verso la Scozia e Scapa Flow; arrivo di migliaia di bambini evacuati dalle metropoli del nord.",
    s6: "Lake District e le valli della Cumbria fungono da rifugio sicuro per istituzioni scolastiche e patrimoni artistici; pattugliamenti della Home Guard sui passi montani.",
    s7: "Smistamento costante di munizioni dal deposito di Longtown verso tutte le basi dell'esercito e della marina; scali ferroviari protetti da batterie mobili contraeree.",
    s8: "Supporto logistico essenziale per il transito delle forniture Lend-Lease americane sbarcate nei porti della costa occidentale e dirette alle basi scozzesi.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD12"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD12"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD12"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD12"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD12"].s2_4;
      return UK_PROVINCES_META["UKD12"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD12"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD33": {
    nuts: "UKD33",
    name: "Manchester",
    modernName: "Manchester (City of Manchester, North West England)",
    historicalName: "Manchester (Lancashire / Cuore Meccanico di Trafford Park & Stabilimenti Avro)",
    historicCounty: "Lancashire",
    country: "England",
    capital: "Manchester",
    region: "North West",
    keys: ["manchester", "city_of_manchester", "trafford_park", "avro", "metrovick", "lancashire", "ukd33"],
    s0_1: "Capitale manifatturiera e finanziaria del cotone e dell'ingegneria pesante; l'immenso complesso industriale di Trafford Park ospita giganti come Metropolitan-Vickers e le officine Avro.",
    s2_4: "La ditta A.V. Roe (Avro) sviluppa il bombardiere bimotore Manchester a Newton Heath e pianifica la produzione del futuro quadrimotore Lancaster; conversione industriale accelerata.",
    s5: "Trafford Park diviene il più grande arsenale meccanico del Regno Unito: Metro-Vick produce motori Merlin sotto licenza, cannoni e apparati radar; Ford apre la fabbrica motori d'aviazione.",
    s6: "Produzione frenetica di aerei e armamenti per ricostituire gli arsenali della BEF dopo la caduta della Francia; mobilitazione di decine di migliaia di donne nelle catene di montaggio.",
    s7: "Il tragico Manchester Blitz del Natale 1940 (22-24 dicembre): centinaia di bombardieri tedeschi incendiano il centro cittadino, distruggono il Free Trade Hall e danneggiano la cattedrale.",
    s8: "Ricostruzione tenace delle linee produttive; Avro avvia l'assemblaggio dei primi leggendari bombardieri pesanti quadrimotore Avro Lancaster che guideranno la riscossa alleata.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD33"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD33"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD33"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD33"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD33"].s2_4;
      return UK_PROVINCES_META["UKD33"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD33"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD34": {
    nuts: "UKD34",
    name: "Greater Manchester South West",
    modernName: "Greater Manchester South West (Salford, Trafford, North West England)",
    historicalName: "Greater Manchester South West (Lancashire / Salford Docks & Trafford Park Industriale)",
    historicCounty: "Lancashire",
    country: "England",
    capital: "Salford",
    region: "North West",
    keys: ["salford", "trafford", "salford_docks", "manchester_ship_canal", "ukd34"],
    s0_1: "Salford Docks e la vasta sponda industriale del Manchester Ship Canal; traffico mercantile transoceanico diretto al cuore dell'Inghilterra senza passare per Liverpool.",
    s2_4: "Istituzione di posti antiaerei e barriere di fumo artificiale per celare il porto interno e gli stabilimenti chimici e meccanici lungo il canale marittimo.",
    s5: "Arrivo continuo di navi mercantili cariche di grano, legname e gomma grezza; Salford Docks operativi a ciclo continuo con scaricatori protetti da rifugi sotterranei.",
    s6: "Produzione di componenti meccanici per carri armati e aerei; mobilitazione della Home Guard lungo le banchine e le chiuse idrauliche strategiche del canale.",
    s7: "Feroce bombardamento di Salford durante il Natale 1940: quartieri operai e bacini portuali semidistrutti, ma gli stabilimenti di Trafford Park mantengono l'attività.",
    s8: "Smistamento merci in arrivo dal Nord America via Manchester Ship Canal; riparazione rapida dei moli e potenziamento delle reti contraeree.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD34"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD34"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD34"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD34"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD34"].s2_4;
      return UK_PROVINCES_META["UKD34"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD34"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD35": {
    nuts: "UKD35",
    name: "Greater Manchester South East",
    modernName: "Greater Manchester South East (Stockport, Tameside, North West England)",
    historicalName: "Greater Manchester South East (Cheshire & Lancashire / Stockport & Fairey Aviation)",
    historicCounty: "Cheshire / Lancashire",
    country: "England",
    capital: "Stockport",
    region: "North West",
    keys: ["stockport", "tameside", "ashton_under_lyne", "fairey_aviation", "ukd35"],
    s0_1: "Distretto industriale tra Cheshire e Lancashire imperniato sull'industria meccanica, cappellifici e gli stabilimenti della Fairey Aviation a Heaton Chapel.",
    s2_4: "Fairey Aviation converte le linee alla costruzione in grande serie di aerosiluranti Fairey Battle e pianifica i caccia navali Fairey Fulmar per la Fleet Air Arm.",
    s5: "Produzione massiccia di velivoli militari per la Royal Navy e la RAF; allestimento di immensi rifugi antiaerei scavati nella roccia arenaria sotto Stockport (Stockport Air Raid Shelters).",
    s6: "I rifugi sotterranei di Stockport offrono sicurezza a oltre 6.000 cittadini per notte durante gli allarmi; consegna continuativa di aerei da combattimento.",
    s7: "Colpita durante le incursioni sul bacino di Manchester; la rete di rifugi sotterranei salva innumerevoli vite umane mentre gli stabilimenti Fairey operano su turni continui.",
    s8: "Fabbriche aeronautiche al massimo rendimento per rifornire le portaerei della Royal Navy impegnate nelle battaglie navali nel Mediterraneo e nell'Atlantico.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD35"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD35"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD35"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD35"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD35"].s2_4;
      return UK_PROVINCES_META["UKD35"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD35"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD36": {
    nuts: "UKD36",
    name: "Greater Manchester North West",
    modernName: "Greater Manchester North West (Bolton, Wigan, North West England)",
    historicalName: "Greater Manchester North West (Lancashire / Bolton & Wigan Cotone e Carbone)",
    historicCounty: "Lancashire",
    country: "England",
    capital: "Bolton",
    region: "North West",
    keys: ["bolton", "wigan", "lancashire_north_west", "wigan_pier", "ukd36"],
    s0_1: "Capitale tradizionale del filato di cotone finissimo (Bolton) e dell'estrazione carbonifera (Wigan); officine meccaniche tessili e ferrovie industriali.",
    s2_4: "Riconversione dei telai meccanici alla produzione di tessuti per divise, tele per paracadute e sacchi a terra per la protezione antiaerea civile e militare.",
    s5: "Le miniere di Wigan riforniscono di combustibile le fonderie e le centrali elettriche del nord-ovest; produzione di cuscinetti a sfera e pezzi per artiglieria a Bolton.",
    s6: "Accoglienza di decine di treni carichi di scolari e madri evacuati da Manchester e Liverpool; mobilitazione dei minatori nella Home Guard.",
    s7: "Presidio delle industrie pesanti e assistenza logistica per le città vicine colpite duramente dal Blitz; rifugi pubblici allestiti negli scantinati dei filatoi.",
    s8: "Produzione specializzata di tele di lino e cotone trattato per le ali degli aerei da addestramento e tende da campo per le forze del Commonwealth.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD36"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD36"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD36"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD36"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD36"].s2_4;
      return UK_PROVINCES_META["UKD36"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD36"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD37": {
    nuts: "UKD37",
    name: "Greater Manchester North East",
    modernName: "Greater Manchester North East (Bury, Rochdale, Oldham, North West England)",
    historicalName: "Greater Manchester North East (Lancashire / Oldham, Rochdale, Bury Meccanica e Munizioni)",
    historicCounty: "Lancashire",
    country: "England",
    capital: "Oldham",
    region: "North West",
    keys: ["oldham", "rochdale", "bury", "lancashire_north_east", "platt_brothers", "ukd37"],
    s0_1: "Famoso distretto dei filatoi di cotone e dei colossi dell'ingegneria tessile (Platt Brothers a Oldham); fonderie, fabbriche di feltro e ingegneria meccanica.",
    s2_4: "Platt Brothers converte le proprie eccezionali capacità di macchine utensili alla produzione di bossoli, proiettili d'artiglieria e parti di mitragliatrici.",
    s5: "Fonderie e stabilimenti riconvertiti a pieno regime bellico: milioni di spolette, proiettili e mine anticarro prodotti con la precisione dell'industria tessile.",
    s6: "Fabbriche al lavoro su turni di 24 ore; reclutamento massiccio di manodopera femminile nelle catene di assemblaggio munizioni e attrezzature belliche.",
    s7: "La periferia industriale assorbe l'impatto dei raid notturni tedeschi; continuo supporto produttivo per rifornire le armerie della Home Guard e della milizia metropolitana.",
    s8: "Espansione delle commesse per componenti di carri armati e affusti per cannoni anticarro in previsione delle future campagne terrestri.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD37"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD37"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD37"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD37"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD37"].s2_4;
      return UK_PROVINCES_META["UKD37"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD37"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD41": {
    nuts: "UKD41",
    name: "Blackburn with Darwen",
    modernName: "Blackburn with Darwen (Lancashire, North West England)",
    historicalName: "Blackburn with Darwen (Lancashire / Tessile e Ingegneria Bellica)",
    historicCounty: "Lancashire",
    country: "England",
    capital: "Blackburn",
    region: "North West",
    keys: ["blackburn", "darwen", "blackburn_with_darwen", "mullard", "ukd41"],
    s0_1: "Città simbolo della tessitura del cotone con centinaia di ciminiere; apertura dei pionieristici stabilimenti Mullard per valvole radio a Blackburn (1938).",
    s2_4: "Lo stabilimento Mullard viene individuato come polo strategico segreto per la fabbricazione di valvole termoioniche destinate alle radio militari e ai sistemi radar.",
    s5: "Mullard avvia la produzione in serie di milioni di valvole elettroniche miniaturizzate, senza le quali nessun radar britannico o apparato radio RAF potrebbe funzionare.",
    s6: "Produzione ininterrotta di valvole radar sotto stretta sorveglianza militare; telai tessili riconvertiti alla tessitura di tute da volo e paracadute.",
    s7: "Blackburn rimane un centro segreto vitale per l'intelligence elettronica e la tecnologia radar, sfuggendo ai bombardamenti pesanti grazie alla camuffatura.",
    s8: "Milioni di valvole Mullard fornite per i radar di bordo dei caccia notturni Beaufighter e i radar di terra Chain Home per respingere le incursioni nemiche.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD41"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD41"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD41"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD41"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD41"].s2_4;
      return UK_PROVINCES_META["UKD41"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD41"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD42": {
    nuts: "UKD42",
    name: "Blackpool",
    modernName: "Blackpool (Lancashire, North West England)",
    historicalName: "Blackpool (Lancashire / Grande Centro di Addestramento RAF e Ospedali Militari)",
    historicCounty: "Lancashire",
    country: "England",
    capital: "Blackpool",
    region: "North West",
    keys: ["blackpool", "raf_squires_gate", "vickers_squires_gate", "ukd42"],
    s0_1: "La più celebre stazione balneare britannica, celebre per la Blackpool Tower, le spiagge sabbiose e le luminarie sul mare; aeroporto civile di Squires Gate.",
    s2_4: "Piani di requisizione dei grandi alberghi e pensioni per alloggiare reparti militari e ministeri evacuati da Londra in caso di scoppio delle ostilità.",
    s5: "Le famose Blackpool Illuminations vengono spente per il blackout totale; l'aeroporto di Squires Gate diviene una colossale scuola di volo della RAF (RAF Squires Gate).",
    s6: "Oltre 700.000 aviatori e reclute della RAF ricevono il loro addestramento iniziale a Blackpool; Vickers-Armstrongs costruisce una Shadow Factory per bombardieri Wellington.",
    s7: "La città costiera brulica di allievi piloti, equipaggi polacchi, cechi e del Commonwealth; gli alberghi ospitano feriti e convalescenti di guerra.",
    s8: "La Shadow Factory di Squires Gate consegna centinaia di bombardieri bimotore Vickers Wellington pronti per essere impiegati nelle missioni notturne.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD42"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD42"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD42"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD42"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD42"].s2_4;
      return UK_PROVINCES_META["UKD42"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD42"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD44": {
    nuts: "UKD44",
    name: "Lancaster and Wyre",
    modernName: "Lancaster and Wyre (Lancaster, Morecambe, Fleetwood, North West England)",
    historicalName: "Lancaster and Wyre (Lancashire / Contea Palatina, Porto di Fleetwood & Linoleum)",
    historicCounty: "Lancashire",
    country: "England",
    capital: "Lancaster",
    region: "North West",
    keys: ["lancaster", "wyre", "morecambe", "fleetwood", "williamsons", "ukd44"],
    s0_1: "Città storica con castello medievale della Casa di Lancaster; porto peschereccio d'altura a Fleetwood e colossale manifattura di linoleum Williamsons a Lancaster.",
    s2_4: "Fleetwood organizza la flotta di pescherecci a strascico per rifornire la nazione di pesce oceanico; Williamsons testa tessuti cerati e impermeabili per uso militare.",
    s5: "I pescherecci d'altura di Fleetwood vengono in gran parte requisiti dalla Royal Navy e trasformati in pescherecci armati antisommergibile e dragamine.",
    s6: "Pattugliamento instancabile del Mare d'Irlanda contro gli U-Boot; la fabbrica di linoleum converte le linee alla gommatura di tessuti per zattere di salvataggio e teli mimetici.",
    s7: "Fleetwood mantiene gli approvvigionamenti di pesce per la popolazione razionata nonostante il pericolo delle mine e degli aerei siluranti nel canale.",
    s8: "Riparazione e manutenzione dei dragamine della Royal Naval Patrol Service; Lancaster funge da sicuro centro amministrativo e accoglienza per sfollati.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD44"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD44"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD44"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD44"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD44"].s2_4;
      return UK_PROVINCES_META["UKD44"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD44"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD45": {
    nuts: "UKD45",
    name: "Mid Lancashire",
    modernName: "Mid Lancashire (Preston, South Ribble, North West England)",
    historicalName: "Mid Lancashire (Lancashire / Preston & English Electric Aeronautica Bellica)",
    historicCounty: "Lancashire",
    country: "England",
    capital: "Preston",
    region: "North West",
    keys: ["preston", "south_ribble", "mid_lancashire", "english_electric", "samlesbury", "ukd45"],
    s0_1: "Preston storico centro amministrativo della Contea Palatina di Lancaster e sede degli enormi stabilimenti d'ingegneria elettrica della English Electric Company (Dick, Kerr Works).",
    s2_4: "English Electric sigla accordi con il Ministero dell'Aria per produrre sotto licenza bombardieri Handley Page Hampden; costruzione della nuova pista di Samlesbury.",
    s5: "Samlesbury Aerodrome diviene un polo d'assemblaggio aereo essenziale: assemblaggio in serie di bombardieri Handley Page Hampden e primi contratti per gli Handley Page Halifax.",
    s6: "Produzione intensiva di bombardieri e riparazione rapida di fusoliere; Preston snodo ferroviario nevralgico per lo smistamento di munizioni verso i porti occidentali.",
    s7: "Lo stabilimento di Samlesbury consegna bombardieri quadrimotore Halifax che compiono i primi voli di collaudo e vengono assegnati agli squadroni del Bomber Command.",
    s8: "La produzione aeronautica di Mid Lancashire raggiunge il ritmo di decine di bombardieri pesanti al mese, fornendo la spina dorsale della flotta aerea d'attacco.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD45"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD45"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD45"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD45"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD45"].s2_4;
      return UK_PROVINCES_META["UKD45"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD45"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD46": {
    nuts: "UKD46",
    name: "East Lancashire",
    modernName: "East Lancashire (Burnley, Pendle, Rossendale, Hyndburn, North West England)",
    historicalName: "East Lancashire (Lancashire / Burnley, Pendle & Fabbriche Meccaniche Belliche)",
    historicCounty: "Lancashire",
    country: "England",
    capital: "Burnley",
    region: "North West",
    keys: ["burnley", "pendle", "rossendale", "hyndburn", "east_lancashire", "ukd46"],
    s0_1: "Vallate industriali storiche della tessitura del cotone e della produzione di calzature e pantofole (Rossendale); fonderie e officine meccaniche.",
    s2_4: "Istituzione di squadre volontarie ARP; riconversione delle industrie tessili e calzaturiere alla manifattura di scarponi militari e equipaggiamenti per l'esercito.",
    s5: "Le valli isolate dell'East Lancashire vengono scelte per insediare fabbriche disperse e impianti segreti di precisione al riparo dai bombardieri nemici.",
    s6: "Stabilimenti della Lucas e di componentistica per motori d'aviazione aprono impianti ausiliari a Burnley per decongestionare le aree colpite dai raid.",
    s7: "Reclutamento di migliaia di donne nelle fonderie e officine di lavorazione di granate e spolette; accoglienza calorosa di sfollati da Liverpool e Londra.",
    s8: "Produzione di parti meccaniche per i motori a reazione sperimentali Whittle (presso gli stabilimenti Rover di Barnoldswick e Clitheroe) avviata in segreto.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD46"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD46"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD46"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD46"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD46"].s2_4;
      return UK_PROVINCES_META["UKD46"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD46"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD47": {
    nuts: "UKD47",
    name: "Chorley and West Lancashire",
    modernName: "Chorley and West Lancashire (Chorley, West Lancashire, Ormskirk, North West England)",
    historicalName: "Chorley and West Lancashire (Lancashire / ROF Chorley Il Più Grande Arsenale di Munizioni)",
    historicCounty: "Lancashire",
    country: "England",
    capital: "Chorley",
    region: "North West",
    keys: ["chorley", "west_lancashire", "ormskirk", "rof_chorley", "euxton", "ukd47"],
    s0_1: "Campagna agricola del West Lancashire; avvio della costruzione nel 1937 della gigantesca Royal Ordnance Factory (ROF Chorley ad Euxton), il più grande complesso di munizioni al mondo.",
    s2_4: "Completamento dell'arsenale sotterraneo e delle centinaia di bunker protetti collegati da linee ferroviarie interne; apertura delle prime linee di caricamento esplosivi.",
    s5: "ROF Chorley entra in piena operatività: oltre 25.000 operai e operaie (le celebri 'Chorley Munitionettes') caricano a mano e a macchina milioni di proiettili, bombe e mine.",
    s6: "La fabbrica lavora 24 ore su 24: caricamento delle bombe pesanti per la RAF e dei bossoli d'artiglieria per riarmare le divisioni territoriali britanniche.",
    s7: "Rigidissime misure di sicurezza e oscuramento totale per scongiurare catastrofi da raid aerei; caricamento continuativo di munizioni antiaeree per difendere le città britanniche.",
    s8: "ROF Chorley produce la maggioranza dei proiettili d'artiglieria e delle bombe aeree dell'Impero Britannico, risultando decisiva per la prosecuzione della guerra.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD47"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD47"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD47"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD47"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD47"].s2_4;
      return UK_PROVINCES_META["UKD47"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD47"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD61": {
    nuts: "UKD61",
    name: "Warrington",
    modernName: "Warrington (Cheshire / Lancashire, North West England)",
    historicalName: "Warrington (Lancashire & Cheshire / Metallurgia del Filo d'Acciaio & Burtonwood)",
    historicCounty: "Lancashire / Cheshire",
    country: "England",
    capital: "Warrington",
    region: "North West",
    keys: ["warrington", "burtonwood", "raf_burtonwood", "ukd61"],
    s0_1: "Città industriale all'incrocio tra Mersey e Manchester Ship Canal, famosa per le trafilerie di filo d'acciaio, la lavorazione del cuoio e la birra; apertura dell'aeroporto di Burtonwood.",
    s2_4: "Apertura della base aerea RAF Burtonwood come deposito centrale di rifornimento e collaudo velivoli della Royal Air Force prima dell'assegnazione ai reparti.",
    s5: "RAF Burtonwood diviene la più vasta base logistica di manutenzione aeronautica del Regno Unito; le trafilerie producono cavi d'acciaio per sbarramenti aerei e ponti.",
    s6: "Revisione accelerata di caccia Hurricane e Spitfire logorati nei combattimenti della Battaglia di Francia e d'Inghilterra da parte dei tecnici di Burtonwood.",
    s7: "Burtonwood riceve i primi aerei di fabbricazione americana trasportati via mare; collaudo, armamento e consegna immediata ai reparti di prima linea.",
    s8: "Espansione colossale di Burtonwood in vista dell'arrivo delle forze dell'USAAF e della gestione del flusso continuo di velivoli americani del Lend-Lease.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD61"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD61"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD61"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD61"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD61"].s2_4;
      return UK_PROVINCES_META["UKD61"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD61"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD62": {
    nuts: "UKD62",
    name: "Cheshire East",
    modernName: "Cheshire East (Crewe, Macclesfield, Congleton, North West England)",
    historicalName: "Cheshire East (Cheshire / Crewe Locomotive Works & Rolls-Royce Merlin Pyms Lane)",
    historicCounty: "Cheshire",
    country: "England",
    capital: "Crewe / Macclesfield",
    region: "North West",
    keys: ["cheshire_east", "crewe", "macclesfield", "pyms_lane", "crewe_works", "ukd62"],
    s0_1: "Crewe è il leggendario centro nevralgico della London, Midland and Scottish Railway (LMS Crewe Works) e Macclesfield è la capitale britannica della seta.",
    s2_4: "Nel 1938 Rolls-Royce avvia a Crewe (Pyms Lane) una nuova modernissima fabbrica per affiancare Derby nella produzione di motori d'aviazione Merlin per Spitfire.",
    s5: "Pyms Lane entra in piena attività: migliaia di operai altamente specializzati producono a ritmi vertiginosi i motori Merlin V12; Macclesfield produce seta per paracadute.",
    s6: "Produzione record di motori Rolls-Royce a Crewe per equipaggiare i caccia della Battaglia d'Inghilterra; le officine ferroviarie costruiscono carrozze blindate e carri speciali.",
    s7: "Nonostante attacchi sporadici della Luftwaffe, la fabbrica Rolls-Royce di Crewe continua a incrementare l'output di motori d'aviazione per caccia e ricognitori.",
    s8: "Crewe assembla motori Merlin sempre più potenti dotati di compressori a due stadi, assicurando la superiorità dei caccia britannici contro i nuovi caccia tedeschi.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD62"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD62"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD62"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD62"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD62"].s2_4;
      return UK_PROVINCES_META["UKD62"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD62"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD63": {
    nuts: "UKD63",
    name: "Cheshire West and Chester",
    modernName: "Cheshire West and Chester (Chester, Ellesmere Port, Northwich, North West England)",
    historicalName: "Cheshire West and Chester (Cheshire / Chester & Raffineria Stanlow, Chimica ICI)",
    historicCounty: "Cheshire",
    country: "England",
    capital: "Chester",
    region: "North West",
    keys: ["cheshire_west", "chester", "ellesmere_port", "stanlow", "northwich", "ici_alway", "ukd63"],
    s0_1: "Città storica fortificata di Chester (quartier generale del Western Command dell'esercito); porto di Ellesmere Port, raffineria di Stanlow e colosso chimico ICI a Northwich.",
    s2_4: "Protezione strategica della raffineria di Stanlow (la più avanzata per benzina d'aviazione a 100 ottani) e degli impianti chimici ICI per cloro e soda caustica.",
    s5: "Stanlow rifornisce la RAF della vitale benzina avio ad alto numero di ottani; ICI Northwich avvia la produzione segreta del 'polietilene', materiale isolante miracoloso per i radar.",
    s6: "Presidio difensivo di Chester contro infiltrazioni e sabotaggi; Chester diviene centro di comando strategico per la difesa di tutto il fronte occidentale britannico.",
    s7: "Fumi artificiali e batterie antiaeree proteggono la raffineria di Stanlow dagli attacchi dei bombardieri tedeschi diretti verso il Mersey; produzione chimica ininterrotta.",
    s8: "ICI espande la produzione di composti sintetici e idrocarburi speciali per la propulsione e la ricerca bellica; Chester coordina l'addestramento delle riserve.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD63"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD63"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD63"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD63"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD63"].s2_4;
      return UK_PROVINCES_META["UKD63"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD63"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD71": {
    nuts: "UKD71",
    name: "East Merseyside",
    modernName: "East Merseyside (Knowsley, St Helens, North West England)",
    historicalName: "East Merseyside (Lancashire / St Helens Vetro Pilkington & ROF Kirkby Munizioni)",
    historicCounty: "Lancashire",
    country: "England",
    capital: "St Helens / Huyton",
    region: "North West",
    keys: ["east_merseyside", "st_helens", "knowsley", "kirkby", "pilkington", "rof_kirkby", "ukd71"],
    s0_1: "St Helens capitale mondiale dell'industria del vetro piatto (Pilkington Brothers); miniere di carbone e terreni industriali nell'entroterra di Liverpool.",
    s2_4: "Pilkington sviluppa vetri corazzati laminati e ottiche avanzate per cabine di pilotaggio di caccia e periscopi per sommergibili della Royal Navy.",
    s5: "Costruzione ed entrata in funzione della colossale Royal Ordnance Factory (ROF Kirkby), impianto di caricamento proiettili gemello di Chorley per decine di migliaia di operai.",
    s6: "Pilkington fornisce il 100% dei parabrezza blindati antiproiettile per gli Spitfire e Hurricane del Fighter Command; ROF Kirkby rifornisce le scorte di proiettili esaurite.",
    s7: "Huyton diviene sede di un grande campo d'internamento e transito per sfollati; ROF Kirkby lavora sotto costante minaccia dei bombardieri tedeschi del Liverpool Blitz.",
    s8: "Produzione ininterrotta di granate per mortaio, proiettili antiaerei e vetri ottici militari per le forze armate del Regno Unito e del Commonwealth.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD71"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD71"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD71"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD71"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD71"].s2_4;
      return UK_PROVINCES_META["UKD71"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD71"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD72": {
    nuts: "UKD72",
    name: "Liverpool",
    modernName: "Liverpool (City of Liverpool, North West England)",
    historicalName: "Liverpool (Lancashire / Western Approaches Command & Gladstone Docks)",
    historicCounty: "Lancashire",
    country: "England",
    capital: "Liverpool",
    region: "North West",
    keys: ["liverpool", "city_of_liverpool", "merseyside", "western_approaches", "derby_house", "gladstone_dock", "ukd72"],
    s0_1: "Il più grande porto dell'Impero Britannico per il traffico transatlantico; Gladstone Docks, Royal Liver Building e un sistema di banchine monumentali sul fiume Mersey.",
    s2_4: "Piani segreti dell'Ammiragliato per trasformare Liverpool nella base di comando alternativa alla capitale in caso di guerra sottomarina atlantica.",
    s5: "Arrivo dei primi convogli atlantici scortati dalla Royal Navy; Liverpool diviene la principale arteria di sopravvivenza alimentare e industriale dell'intera Gran Bretagna.",
    s6: "Caduta della Francia: le rotte della Manica sono chiuse e tutto il traffico navale deve confluire a Liverpool attraverso i Western Approaches; mobilitazione dei moli.",
    s7: "Febbraio 1941: il quartier generale del Western Approaches Command (ammiraglio Sir Percy Noble) viene trasferito a Derby House a Liverpool in un bunker sotterraneo blindato.",
    s8: "Il devastante May Blitz di Liverpool (1-8 maggio 1941): 7 notti consecutive di bombardamenti, navi da munizioni esplose, migliaia di vittime, ma il porto non cede e continua a rifornire l'Inghilterra.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD72"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD72"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD72"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD72"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD72"].s2_4;
      return UK_PROVINCES_META["UKD72"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD72"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD73": {
    nuts: "UKD73",
    name: "Sefton",
    modernName: "Sefton (Bootle, Southport, Crosby, North West England)",
    historicalName: "Sefton (Lancashire / Bootle Banchine Settentrionali del Mersey & Southport)",
    historicCounty: "Lancashire",
    country: "England",
    capital: "Bootle / Southport",
    region: "North West",
    keys: ["sefton", "bootle", "southport", "crosby", "langton_dock", "ukd73"],
    s0_1: "Comprende le trafficatissime banchine settentrionali di Liverpool a Bootle (Langton, Hornby, Alexandra Docks) e la tranquilla stazione balneare di Southport.",
    s2_4: "Fortificazione e compartimentazione dei bacini di carico merci di Bootle per resistere a mine magnetiche e bombe incendiarie; Southport rifugio per famiglie benestanti.",
    s5: "I moli di Bootle gestiscono milioni di tonnellate di rifornimenti bellici, gomma, petrolio e grano sbarcati dalle navi del Nord America.",
    s6: "Batterie di artiglieria costiera e contraerea piazzate lungo le dune di Crosby e Southport; sorveglianza serrata per l'ingresso delle navi nel canale del Mersey.",
    s7: "Bootle diviene il comune più bombardato del Regno Unito in rapporto alla popolazione: durante il Blitz, oltre l'80% delle abitazioni viene distrutto o danneggiato dalla Luftwaffe.",
    s8: "Incredibile resilienza dei portuali di Bootle che continuano a scaricare le navi mercantili del Lend-Lease in mezzo alle macerie fumanti dei magazzini e delle banchine.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD73"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD73"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD73"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD73"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD73"].s2_4;
      return UK_PROVINCES_META["UKD73"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD73"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKD74": {
    nuts: "UKD74",
    name: "Wirral",
    modernName: "Wirral (Birkenhead, Wallasey, North West England)",
    historicalName: "Wirral (Cheshire / Birkenhead Cantieri Navali Cammell Laird)",
    historicCounty: "Cheshire",
    country: "England",
    capital: "Birkenhead",
    region: "North West",
    keys: ["wirral", "birkenhead", "wallasey", "cammell_laird", "mersey_shipyards", "ukd74"],
    s0_1: "Penisola tra i fiumi Mersey e Dee dominata dai giganteschi cantieri navali Cammell Laird a Birkenhead, pionieri della costruzione di navi da guerra e mercantili d'acciaio.",
    s2_4: "Cammell Laird vara la leggendaria portaerei HMS Ark Royal (1937) e la corazzata HMS Prince of Wales (maggio 1939); scavo di rifugi antiaerei nelle gallerie arenarie.",
    s5: "I cantieri operano a ritmo febbrile: completamento della Prince of Wales, costruzione di decine di cacciatorpediniere e sommergibili per la scorta atlantica.",
    s6: "Riparazione rapida e raddobbo delle navi da guerra danneggiate nei teatri marittimi della Manica e della Norvegia; Wallasey funge da dormitorio operaio martoriato.",
    s7: "Birkenhead e Wallasey colpite violentemente dai bombardieri della Luftwaffe che mirano ai cantieri Cammell Laird; operai lavorano sotto il fuoco per non fermare gli scafi.",
    s8: "Consegna di navi scorta vitali per contrastare i branchi di lupi di U-Boot nella Battaglia dell'Atlantico; completamento e collaudo finale di corazzate e portaerei.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKD74"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKD74"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKD74"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKD74"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKD74"].s2_4;
      return UK_PROVINCES_META["UKD74"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKD74"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKE11": {
    nuts: "UKE11",
    name: "Kingston upon Hull, City of",
    modernName: "Kingston upon Hull (City of Hull, Yorkshire and The Humber)",
    historicalName: "Kingston upon Hull (Yorkshire East Riding / Grande Porto sull'Humber & Hull Blitz)",
    historicCounty: "Yorkshire (East Riding)",
    country: "England",
    capital: "Hull",
    region: "Yorkshire and The Humber",
    keys: ["kingston_upon_hull", "hull", "city_of_hull", "humber", "hull_blitz", "uke11"],
    s0_1: "Il terzo porto commerciale della Gran Bretagna, principale sbocco sul Mare del Nord per le importazioni di grano, legname scandinavo e pesca oceanica d'altura.",
    s2_4: "Istituzione di piani di evacuazione civile e fortificazione delle chiuse dell'Humber contro mine nemiche; allestimento di postazioni acustiche d'avvistamento aereo.",
    s5: "Hull diviene bersaglio vulnerabile data la vicinanza alle rotte della Luftwaffe; i pescherecci a vapore vengono convertiti in dragamine per bonificare l'estuario.",
    s6: "L'estuario dell'Humber diviene una prima linea difensiva: palloni frenati e batterie antiaeree a protezione dei docks carichi di legname e merci strategiche.",
    s7: "Inizio dell'Hull Blitz: bersagliata sistematicamente dalla Luftwaffe (la città più bombardata d'Inghilterra dopo Londra), la censura militare la definisce anonimamente 'a North East Coast town'.",
    s8: "Hull subisce devastazioni terrificanti nel marzo e maggio 1941 con il 95% delle case danneggiate; i suoi cittadini mostrano un indomito coraggio continuando le operazioni portuali.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKE11"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKE11"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKE11"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKE11"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKE11"].s2_4;
      return UK_PROVINCES_META["UKE11"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKE11"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKE12": {
    nuts: "UKE12",
    name: "East Riding of Yorkshire",
    modernName: "East Riding of Yorkshire (Beverley, Bridlington, Goole, Yorkshire and The Humber)",
    historicalName: "East Riding of Yorkshire (East Riding / Beverley & Blackburn Aircraft a Brough)",
    historicCounty: "Yorkshire (East Riding)",
    country: "England",
    capital: "Beverley",
    region: "Yorkshire and The Humber",
    keys: ["east_riding", "east_riding_of_yorkshire", "beverley", "brough", "blackburn_aircraft", "goole", "uke12"],
    s0_1: "Vasta contea agricola e costiera dominata dalla storica città abbaziale di Beverley, dal porto interno di Goole e dagli stabilimenti della Blackburn Aircraft a Brough.",
    s2_4: "La Blackburn Aircraft a Brough avvia la produzione in serie dell'aerosilurante navale Fairey Swordfish (sotto licenza) e del monomotore Blackburn Skua per le portaerei.",
    s5: "Gli stabilimenti di Brough lavorano a pieno ritmo per rifornire la Fleet Air Arm; gli aerosiluranti Swordfish costruiti qui diverranno protagonisti dell'attacco a Taranto.",
    s6: "Basi costiere allertate per il pattugliamento marittimo; la costa dell'East Riding viene munita di fossati anticarro e nidi di mitragliatrici contro tentativi di sbarco.",
    s7: "I campi d'aviazione dell'East Riding (RAF Catfoss, RAF Leconfield) ospitano squadroni di Hurricane per difendere l'estuario dell'Humber dai bombardieri notturni.",
    s8: "Produzione a Brough di centinaia di velivoli siluranti navali essenziali per proteggere i convogli atlantici e assestare colpi fatali alla flotta di superficie tedesca.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKE12"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKE12"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKE12"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKE12"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKE12"].s2_4;
      return UK_PROVINCES_META["UKE12"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKE12"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKE13": {
    nuts: "UKE13",
    name: "North and North East Lincolnshire",
    modernName: "North and North East Lincolnshire (Grimsby, Cleethorpes, Scunthorpe)",
    historicalName: "North and North East Lincolnshire (Lincolnshire / Scunthorpe Acciaio & Grimsby Flotta Dragamine)",
    historicCounty: "Lincolnshire (Parts of Lindsey)",
    country: "England",
    capital: "Grimsby / Scunthorpe",
    region: "Yorkshire and The Humber",
    keys: ["north_lincolnshire", "north_east_lincolnshire", "grimsby", "scunthorpe", "cleethorpes", "appleby_frodingham", "uke13"],
    s0_1: "Polo industriale diviso tra il colosso dell'acciaio di Scunthorpe (Appleby-Frodingham Steelworks) e il più grande porto di pescherecci a strascico del mondo a Grimsby.",
    s2_4: "Grimsby organizza la Royal Naval Patrol Service con centinaia di pescherecci armati di cannoncini; Scunthorpe incrementa la colata di ghisa e lamiere corazzate.",
    s5: "I pescherecci di Grimsby guidati da 'Harry Tate's Navy' affrontano le micidiali mine magnetiche tedesche aprendo la strada ai mercantili; Scunthorpe forgia acciaio per blindature.",
    s6: "Presidio dell'ingresso dell'Humber; Grimsby accoglie centinaia di marinai e soldati esausti dopo le operazioni in Norvegia e Dunkerque.",
    s7: "Raid aerei notturni sulle acciaierie di Scunthorpe e sui moli di Grimsby; la fornitura di acciaio per blindature di carri armati e navi non subisce interruzioni.",
    s8: "I dragamine di Grimsby mantengono aperti i canali di navigazione costiera della Gran Bretagna pagando un tributo altissimo di coraggio e imbarcazioni.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKE13"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKE13"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKE13"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKE13"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKE13"].s2_4;
      return UK_PROVINCES_META["UKE13"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKE13"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKE21": {
    nuts: "UKE21",
    name: "York",
    modernName: "York (City of York, Yorkshire and The Humber)",
    historicalName: "York (Yorkshire / Capitale Storica, Northern Command & Snodo LNER)",
    historicCounty: "Yorkshire",
    country: "England",
    capital: "York",
    region: "Yorkshire and The Humber",
    keys: ["york", "city_of_york", "york_minster", "northern_command", "rowntree", "uke21"],
    s0_1: "Capitale ecclesiastica e storica del nord Inghilterra con la maestosa cattedrale di York Minster; quartier generale del Northern Command dell'esercito britannico e colosso dolciario Rowntree's.",
    s2_4: "Northern Command coordina la difesa militare di tutte le contee settentrionali; la fabbrica Rowntree's sperimenta le prime razioni da combattimento al cioccolato d'alta energia.",
    s5: "York diviene snodo strategico ferroviario LNER di primaria importanza per i treni militari verso la Scozia; misure speciali di protezione antincendio per York Minster.",
    s6: "Coordinamento delle truppe territoriali e della Home Guard per presidiare ponti e snodi viari; ospedali militari di York accolgono i feriti della BEF.",
    s7: "La produzione dolciaria di Rowntree's e Terry's viene convertita alla produzione di razioni di sopravvivenza per la RAF e munizioni leggere nelle officine annesse.",
    s8: "Snodo vitale di smistamento logistico per l'esercito e rifugio sicuro per migliaia di bambini evacuati dai porti bombardati di Hull e Tyneside.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKE21"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKE21"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKE21"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKE21"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKE21"].s2_4;
      return UK_PROVINCES_META["UKE21"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKE21"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKE22": {
    nuts: "UKE22",
    name: "North Yorkshire CC",
    modernName: "North Yorkshire (Scarborough, Harrogate, Ripon, Northallerton, Richmond)",
    historicalName: "North Yorkshire (Yorkshire North Riding / Catterick Garrison & Basi RAF Bomber Command)",
    historicCounty: "Yorkshire (North Riding)",
    country: "England",
    capital: "Northallerton",
    region: "Yorkshire and The Humber",
    keys: ["north_yorkshire", "catterick", "catterick_garrison", "harrogate", "scarborough", "ripon", "uke22"],
    s0_1: "Vasta contea di brughiere e vallate che ospita la colossale Catterick Garrison (il più grande campo d'addestramento militare permanente del British Army) e stazioni termali a Harrogate.",
    s2_4: "Espansione massiccia delle caserme di Catterick per l'addestramento delle reclute della Milizia create dal Military Training Act del 1939; Harrogate prepara alberghi per i ministeri.",
    s5: "Catterick addestra decine di migliaia di fanti, carristi e genieri inviati poi in Francia; aeroporti RAF (Dishforth, Leeming, Linton-on-Ouse) operativi con il No. 4 Group Bomber Command.",
    s6: "I bombardieri Whitley decollati dalle basi del North Yorkshire compiono le prime pericolose missioni notturne di bombardamento e lancio volantini sulla Germania.",
    s7: "Harrogate diviene sede temporanea di reparti del Ministero dell'Aria; le basi aeree dello Yorkshire moltiplicano le sortite di bombardamento contro le navi d'invasione tedesche.",
    s8: "Gli aeroporti del No. 4 Group passano ai bombardieri Handley Page Halifax, consolidando il North Yorkshire come pilastro dell'offensiva aerea strategica della RAF.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKE22"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKE22"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKE22"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKE22"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKE22"].s2_4;
      return UK_PROVINCES_META["UKE22"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKE22"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKE31": {
    nuts: "UKE31",
    name: "Barnsley, Doncaster and Rotherham",
    modernName: "Barnsley, Doncaster and Rotherham (South Yorkshire, Yorkshire and The Humber)",
    historicalName: "Barnsley, Doncaster and Rotherham (Yorkshire West Riding / Carbone, Acciaio Speciale & Officine Plant)",
    historicCounty: "Yorkshire (West Riding)",
    country: "England",
    capital: "Doncaster / Rotherham",
    region: "Yorkshire and The Humber",
    keys: ["barnsley", "doncaster", "rotherham", "south_yorkshire", "the_plant", "uke31"],
    s0_1: "Cuore dell'estrazione carbonifera del South Yorkshire (Barnsley), acciaierie pesanti a Rotherham e celebri officine ferroviarie 'The Plant' di Doncaster (costruttrici della locomotiva Mallard).",
    s2_4: "Le officine di Doncaster si preparano alla manutenzione di locomotive pesanti per treni d'armamento; Rotherham avvia la fusione di acciai speciali per corazze e proiettili.",
    s5: "I minatori di Barnsley garantiscono milioni di tonnellate di carbone per alimentare le acciaierie e le centrali elettriche; Doncaster fabbrica telai di carrelli per cannoni pesanti.",
    s6: "Produzione ininterrotta di tubi d'acciaio senza saldatura e parti fuse per carri armati; la Home Guard sorveglia i ponti e i viadotti ferroviari di Doncaster.",
    s7: "Le acciaierie di Rotherham vengono attaccate durante il Blitz del South Yorkshire nel dicembre 1940, ma le strutture pesanti resistono e continuano a produrre leghe belliche.",
    s8: "Fornitura massiccia di rotaie, traversine e locomotive pesanti per lo sforzo logistico nazionale, mentre i pozzi di carbone toccano picchi di rendimento patriottico.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKE31"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKE31"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKE31"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKE31"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKE31"].s2_4;
      return UK_PROVINCES_META["UKE31"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKE31"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKE32": {
    nuts: "UKE32",
    name: "Sheffield",
    modernName: "Sheffield (City of Sheffield, Yorkshire and The Humber)",
    historicalName: "Sheffield (Yorkshire West Riding / Capitale Mondiale degli Acciai Speciali & Armamenti)",
    historicCounty: "Yorkshire (West Riding)",
    country: "England",
    capital: "Sheffield",
    region: "Yorkshire and The Humber",
    keys: ["sheffield", "city_of_sheffield", "steel_city", "firth_brown", "hadfields", "sheffield_blitz", "uke32"],
    s0_1: "La celebre 'Steel City', capitale mondiale dell'acciaio speciale e degli acciai inossidabili con giganti industriali come Thomas Firth & John Brown, Hadfields e English Steel Corporation.",
    s2_4: "Sheffield è il cuore segreto del riarmo: fusione di lingotti d'acciaio al nickel-cromo per canne di cannone navale, piastre corazzate per navi da guerra e corazze per carri armati.",
    s5: "Produzione totale per la difesa: forgia degli alberi motore per i motori Spitfire Merlin, bossoli per proiettili perforanti e corazze delle corazzate King George V.",
    s6: "Le maestranze specializzate lavorano giorno e notte: Sheffield fornisce oltre l'80% delle leghe speciali resistenti ad altissime temperature per le turbine aeronautiche britanniche.",
    s7: "Il devastante Sheffield Blitz (12 e 15 dicembre 1940): la Luftwaffe scarica centinaia di tonnellate di bombe incendiarie radendo al suolo il centro cittadino e colpendo le industrie dell'East End.",
    s8: "Con tenacia indomita, gli altiforni e le fucine di Sheffield riprendono la produzione entro pochi giorni, continuando a rifornire di acciaio per armi tutti i fronti dell'Impero.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKE32"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKE32"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKE32"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKE32"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKE32"].s2_4;
      return UK_PROVINCES_META["UKE32"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKE32"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKE41": {
    nuts: "UKE41",
    name: "Bradford",
    modernName: "Bradford (City of Bradford, Keighley, Yorkshire and The Humber)",
    historicalName: "Bradford (Yorkshire West Riding / Capitale Mondiale della Lana & Uniformi Belliche)",
    historicCounty: "Yorkshire (West Riding)",
    country: "England",
    capital: "Bradford",
    region: "Yorkshire and The Humber",
    keys: ["bradford", "keighley", "city_of_bradford", "wool_capital", "lister_mills", "uke41"],
    s0_1: "Capitale mondiale incontrastata del commercio e della filatura della lana pettinata con i colossali stabilimenti Lister's Mill a Manningham; ingegneria meccanica di precisione a Keighley.",
    s2_4: "Il Ministero dell'Approvvigionamento assume il controllo della lana di Bradford per pianificare la tessitura di milioni di metri di panno d'ordinanza per l'esercito e la marina.",
    s5: "I filatoi di Bradford vestono le forze armate britanniche: produzione a ciclo continuo di uniformi color kaki, coperte di lana pesante, calze e passamontagna per i soldati.",
    s6: "Keighley converte le fabbriche di macchine tessili alla produzione di bossoli per proiettili e componenti per cannoni; rifugio sicuro per bambini sfollati.",
    s7: "Mentre le città vicine subiscono incursioni, i lanifici di Bradford continuano a produrre uniformi termiche essenziali per i marinai impegnati nella scorta dei convogli atlantici.",
    s8: "Fornitura di equipaggiamento in lana per le truppe alleate in Medio Oriente e per la Russia; le maestranze femminili gestiscono la quasi totalità della produzione tessile.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKE41"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKE41"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKE41"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKE41"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKE41"].s2_4;
      return UK_PROVINCES_META["UKE41"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKE41"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKE42": {
    nuts: "UKE42",
    name: "Leeds",
    modernName: "Leeds (City of Leeds, Yorkshire and The Humber)",
    historicalName: "Leeds (Yorkshire West Riding / ROF Barnbow, Confezioni Burton & Locomotive)",
    historicCounty: "Yorkshire (West Riding)",
    country: "England",
    capital: "Leeds",
    region: "Yorkshire and The Humber",
    keys: ["leeds", "city_of_leeds", "barnbow", "burton_confections", "hunslet", "leeds_blitz", "uke42"],
    s0_1: "Grande metropoli del West Riding, capitale della confezione d'abiti all'ingrosso (Montague Burton, la più grande fabbrica d'abbigliamento al mondo) e della costruzione di locomotive (Hunslet Engine Company).",
    s2_4: "Riapertura e ammodernamento della Royal Ordnance Factory (ROF Barnbow) come centro di caricamento munizioni pesanti; Burton converte le linee alla sartoria militare in serie.",
    s5: "Montague Burton confeziona un quarto di tutte le divise militari dell'esercito britannico; le fabbriche Hunslet e Fowler costruiscono carri armati e locomotive da manovra.",
    s6: "ROF Barnbow e le industrie di Leeds producono munizioni a pieno ritmo; accoglienza di migliaia di soldati e rifugiati provenienti dalla Francia occupata.",
    s7: "Il Leeds Blitz (notte del 14-15 marzo 1941): bombardamento della Luftwaffe sul centro cittadino, danneggiati il municipio e la stazione, ma gli impianti industriali riprendono prontamente.",
    s8: "Conversione di ROF Barnbow alla produzione di carri armati e semoventi corazzati; Leeds è un pilastro inespugnabile della manifattura bellica britannica.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKE42"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKE42"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKE42"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKE42"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKE42"].s2_4;
      return UK_PROVINCES_META["UKE42"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKE42"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKE44": {
    nuts: "UKE44",
    name: "Calderdale and Kirklees",
    modernName: "Calderdale and Kirklees (Halifax, Huddersfield, Dewsbury, Yorkshire and The Humber)",
    historicalName: "Calderdale and Kirklees (Yorkshire West Riding / Halifax, Huddersfield Macchine Utensili)",
    historicCounty: "Yorkshire (West Riding)",
    country: "England",
    capital: "Huddersfield / Halifax",
    region: "Yorkshire and The Humber",
    keys: ["calderdale", "kirklees", "halifax", "huddersfield", "dewsbury", "david_brown", "uke44"],
    s0_1: "Distretto delle valli del Calder con Huddersfield e Halifax, centri d'eccellenza per ingegneria di precisione, ingranaggi pesanti (David Brown & Sons) e tessitura pesante.",
    s2_4: "David Brown a Huddersfield diviene leader nella progettazione di trasmissioni e ingranaggi per i carri armati britannici e riduttori di velocità per turbine navali.",
    s5: "Fornitura indispensabile di ingranaggi per i motori Spitfire e trasmissioni per i carri armati Cruiser e Matilda; le valli producono panni pesanti e coperte militari.",
    s6: "Produzione continua di ingranaggi e trattori militari David Brown; Halifax presta il nome al celebre bombardiere quadrimotore Handley Page Halifax.",
    s7: "Le officine meccaniche delle valli rimangono protette dalle colline e dalla foschia naturale, lavorando a pieno regime per rifornire la British Army.",
    s8: "David Brown avvia la produzione in grande serie dei riduttori per le trasmissioni dei nuovi carri armati Churchill, confermando l'importanza vitale del distretto.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKE44"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKE44"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKE44"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKE44"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKE44"].s2_4;
      return UK_PROVINCES_META["UKE44"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKE44"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKE45": {
    nuts: "UKE45",
    name: "Wakefield",
    modernName: "Wakefield (City of Wakefield, Pontefract, Castleford, Yorkshire and The Humber)",
    historicalName: "Wakefield (Yorkshire West Riding / Miniere di Carbone, Chimica & Liquirizia di Pontefract)",
    historicCounty: "Yorkshire (West Riding)",
    country: "England",
    capital: "Wakefield",
    region: "Yorkshire and The Humber",
    keys: ["wakefield", "city_of_wakefield", "pontefract", "castleford", "hickson_welch", "uke45"],
    s0_1: "Città cattedrale storica del West Riding con il centro minerario di Castleford e le storiche coltivazioni e fabbriche di liquirizia e confetteria di Pontefract.",
    s2_4: "Modernizzazione della sicurezza nei pozzi di carbone e potenziamento delle industrie chimiche a Castleford (Hickson & Welch) per reagenti industriali.",
    s5: "L'estrazione del carbone di Wakefield alimenta le centrali elettriche e il riscaldamento industriale della regione; le industrie chimiche producono intermedi per esplosivi.",
    s6: "La Home Guard presidia i ponti sul fiume Calder e la ferrovia; Pontefract Castle è sede di guarnigione e centro reclutamento per il King's Own Yorkshire Light Infantry.",
    s7: "Produzione ininterrotta di combustibile fossile e fornitura di derivati del catrame minerale per la produzione di gomma sintetica e impermeabilizzanti bellici.",
    s8: "I minatori di Wakefield sostengono la battaglia della produzione nazionale; rifugio accogliente per centinaia di famiglie sfollate dalle aree portuali dell'Humber.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKE45"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKE45"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKE45"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKE45"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKE45"].s2_4;
      return UK_PROVINCES_META["UKE45"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKE45"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKF11": {
    nuts: "UKF11",
    name: "Derby",
    modernName: "Derby (City of Derby, East Midlands)",
    historicalName: "Derby (Derbyshire / Rolls-Royce Nightingale Road & Motori Merlin)",
    historicCounty: "Derbyshire",
    country: "England",
    capital: "Derby",
    region: "East Midlands",
    keys: ["derby", "city_of_derby", "rolls_royce", "merlin", "nightingale_road", "ukf11"],
    s0_1: "Capitale motoristica d'eccellenza e quartier generale della Rolls-Royce a Nightingale Road; sviluppo del motore aeronautico a pistoni V12 Merlin da 27 litri di cilindrata.",
    s2_4: "Rolls-Royce avvia la produzione in grande serie del Merlin per Spitfire, Hurricane e Whitley sotto la direzione di Ernest Hives; espansione delle fonderie d'alluminio.",
    s5: "Derby diviene il bersaglio industriale più critico del Regno Unito: la 'fabbrica dei motori della vittoria' lavora a ciclo continuo protetta da rigide misure di camuffamento e contraerea.",
    s6: "Durante la Battaglia d'Inghilterra, ogni motore Merlin uscito da Derby garantisce la superiorità nei cieli dei caccia della RAF contro la Luftwaffe di Göring.",
    s7: "La Luftwaffe tenta a più riprese di colpire lo stabilimento Rolls-Royce di Derby; la difesa aerea e le fabbriche ombra disperse nel Derbyshire impediscono l'arresto della produzione.",
    s8: "Rolls-Royce Derby avvia lo sviluppo dei motori Griffon più potenti e accoglie le ricerche segrete di Frank Whittle sul motore a reazione (turbogetto W.2B).",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKF11"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKF11"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKF11"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKF11"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKF11"].s2_4;
      return UK_PROVINCES_META["UKF11"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKF11"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKF12": {
    nuts: "UKF12",
    name: "East Derbyshire",
    modernName: "East Derbyshire (Chesterfield, Bolsover, North East Derbyshire, East Midlands)",
    historicalName: "East Derbyshire (Derbyshire / Chesterfield, Bolsover Miniere di Carbone & Ghisa)",
    historicCounty: "Derbyshire",
    country: "England",
    capital: "Chesterfield",
    region: "East Midlands",
    keys: ["east_derbyshire", "chesterfield", "bolsover", "staveley_works", "ukf12"],
    s0_1: "Distretto minerario e metallurgico famoso per la chiesa con la guglia storta di Chesterfield, le grandi ferriere Staveley Coal & Iron Company e i pozzi di Bolsover.",
    s2_4: "Staveley Ironworks si prepara a fondere milioni di tubi in ghisa per condotte d'acqua d'emergenza e corpi di bombe per la Royal Air Force.",
    s5: "Estrazione a pieno regime di carbone fossile e produzione di ghisa per l'industria degli armamenti; accoglienza di sfollati dalle città industriali del nord.",
    s6: "Minatori e operai metallurgici inquadrati nella Home Guard; presidio delle colate d'altoforno e dei nodi ferroviari verso Derby e Sheffield.",
    s7: "Fornitura essenziale di derivati del catrame minerale e prodotti chimici di base da Staveley per la produzione di esplosivi per l'esercito.",
    s8: "Incremento delle quote di estrazione di carbone; le fonderie di Chesterfield continuano a produrre proiettili d'artiglieria e parti pesanti per veicoli militari.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKF12"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKF12"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKF12"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKF12"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKF12"].s2_4;
      return UK_PROVINCES_META["UKF12"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKF12"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKF13": {
    nuts: "UKF13",
    name: "South and West Derbyshire",
    modernName: "South and West Derbyshire (Derbyshire Dales, High Peak, South Derbyshire)",
    historicalName: "South and West Derbyshire (Derbyshire / Peak District, Calcare & Fabbriche Ombra)",
    historicCounty: "Derbyshire",
    country: "England",
    capital: "Matlock / Buxton",
    region: "East Midlands",
    keys: ["south_and_west_derbyshire", "high_peak", "derbyshire_dales", "buxton", "matlock", "ukf13"],
    s0_1: "Paesaggio montuoso e valli del Peak District; cave di pietra calcarea e terme di Buxton; officine disperse di filatura e meccanica fine.",
    s2_4: "Identificazione di gallerie sotterranee e cave dismesse per l'installazione di depositi segreti di munizioni e riserve d'arte della nazione.",
    s5: "Le cave e vallate isolate del Peak District fungono da rifugio sicuro per migliaia di bambini evacuati da Manchester, Sheffield e Londra.",
    s6: "Addestramento della Home Guard nei terreni impervi montani; Buxton ospita ospedali militari e centri di riabilitazione per piloti della RAF ustionati.",
    s7: "Fornitura continua di calcare puro per i fondenti delle acciaierie di Sheffield e per l'industria chimica nazionale.",
    s8: "Collaudo segreto di esplosivi e addestramento commando tra le brughiere del Peak District prima dell'invio nei teatri operativi oltremare.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKF13"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKF13"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKF13"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKF13"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKF13"].s2_4;
      return UK_PROVINCES_META["UKF13"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKF13"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKF14": {
    nuts: "UKF14",
    name: "Nottingham",
    modernName: "Nottingham (City of Nottingham, East Midlands)",
    historicalName: "Nottingham (Nottinghamshire / ROF Nottingham, Raleigh & Sigarette Player's)",
    historicCounty: "Nottinghamshire",
    country: "England",
    capital: "Nottingham",
    region: "East Midlands",
    keys: ["nottingham", "city_of_nottingham", "rof_nottingham", "raleigh", "players", "nottingham_blitz", "ukf14"],
    s0_1: "Città storica di Robin Hood e grande polo industriale: le biciclette Raleigh, le sigarette John Player & Sons e l'industria chimico-farmaceutica Boots.",
    s2_4: "Costruzione della Royal Ordnance Factory (ROF Nottingham a Kings Meadow) specializzata nella fabbricazione di cannoni antiaerei da 3,7 pollici e cannoni Bofors.",
    s5: "Raleigh converte le sue enormi catene di montaggio alla fabbricazione di spolette per bombe e bossoli; Boots sintetizza antibiotici, sieri e composti chimici per la sanità militare.",
    s6: "ROF Nottingham produce a pieno ritmo i cannoni antiaerei pesanti per difendere Londra e le città industriali durante la Battaglia d'Inghilterra.",
    s7: "Il Nottingham Blitz (notte dell'8-9 maggio 1941): la Luftwaffe bombarda la città incendiando magazzini Player's e Boots, ma fallisce nel colpire la ROF e gli stabilimenti Raleigh.",
    s8: "Produzione ininterrotta di cannoni antiaerei, milioni di spolette e razioni di medicinali per le forze armate britanniche su tutti i fronti di guerra.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKF14"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKF14"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKF14"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKF14"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKF14"].s2_4;
      return UK_PROVINCES_META["UKF14"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKF14"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKF15": {
    nuts: "UKF15",
    name: "North Nottinghamshire",
    modernName: "North Nottinghamshire (Mansfield, Bassetlaw, Newark-on-Trent, East Midlands)",
    historicalName: "North Nottinghamshire (Nottinghamshire / Sherwood, Pozzi Petroliferi di Eakring & Carbone)",
    historicCounty: "Nottinghamshire",
    country: "England",
    capital: "Mansfield / Worksop",
    region: "East Midlands",
    keys: ["north_nottinghamshire", "mansfield", "bassetlaw", "worksop", "eakring_oil", "sherwood", "ukf15"],
    s0_1: "Foresta storica di Sherwood e ricco bacino minerario del Nottinghamshire con pozzi profondi e moderni; porto fluviale di Newark e macchine agricole.",
    s2_4: "Scoperta segreta di petrolio a Eakring nel 1939 da parte della D'Arcy Exploration (Anglo-Persian Oil / BP); avvio delle prime trivellazioni discrete.",
    s5: "I pozzi petroliferi di Eakring nel bosco di Duke's Wood vengono tenuti nel massimo segreto di stato: divengono l'unico giacimento petrolifero terrestre attivo della Gran Bretagna.",
    s6: "Produzione a Eakring di greggio di altissima qualità a basso contenuto di zolfo, raffinato direttamente per produrre lubrificanti per i motori Merlin della RAF.",
    s7: "Minatori di Mansfield al massimo impegno; le trivelle petrolifere camuffate tra le querce di Sherwood pompano migliaia di barili di greggio vitale per la nazione.",
    s8: "I pozzi segreti di Eakring superano i record produttivi, contribuendo in modo silenzioso ma fondamentale alla vittoria nella guerra dei carburanti.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKF15"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKF15"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKF15"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKF15"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKF15"].s2_4;
      return UK_PROVINCES_META["UKF15"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKF15"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKF16": {
    nuts: "UKF16",
    name: "South Nottinghamshire",
    modernName: "South Nottinghamshire (Rushcliffe, Gedling, Newark-on-Trent, East Midlands)",
    historicalName: "South Nottinghamshire (Nottinghamshire / Cuscinetti a Sfera Ransome & Marles Newark)",
    historicCounty: "Nottinghamshire",
    country: "England",
    capital: "West Bridgford / Newark",
    region: "East Midlands",
    keys: ["south_nottinghamshire", "rushcliffe", "gedling", "newark", "ransome_marles", "ukf16"],
    s0_1: "Distretto sulle rive del fiume Trent imperniato su Newark-on-Trent e la celebre fabbrica di cuscinetti a sfera Ransome & Marles, essenziali per tutta l'industria meccanica britannica.",
    s2_4: "Ransome & Marles diviene stabilimento di priorità strategica nazionale: ogni aereo, carro armato, motore navale o cannone necessita dei suoi cuscinetti di precisione.",
    s5: "Produzione frenetica di cuscinetti a sfera per l'aviazione militare; rafforzamento della contraerea e installazione di cortine fumogene attorno a Newark.",
    s6: "L'aviazione tedesca individua Newark: il 9 luglio 1940 un bombardiere solitario Heinkel He 111 colpisce la fabbrica Ransome & Marles uccidendo 29 operai.",
    s7: "Ripristino immediato dei macchinari e dispersione dei reparti produttivi in laboratori sotterranei per scongiurare colli di bottiglia nei motori d'aereo.",
    s8: "La produzione di cuscinetti tocca livelli record, rifornendo continuamente gli stabilimenti Rolls-Royce, Bristol, Hawker e Supermarine in tutta la Gran Bretagna.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKF16"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKF16"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKF16"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKF16"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKF16"].s2_4;
      return UK_PROVINCES_META["UKF16"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKF16"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKF21": {
    nuts: "UKF21",
    name: "Leicester",
    modernName: "Leicester (City of Leicester, East Midlands)",
    historicalName: "Leicester (Leicestershire / Capitale della Maglieria & Calzature per le Forze Armate)",
    historicCounty: "Leicestershire",
    country: "England",
    capital: "Leicester",
    region: "East Midlands",
    keys: ["leicester", "city_of_leicester", "leicester_blitz", "corah", "british_united_shoe", "ukf21"],
    s0_1: "Una delle città più prospere d'Europa prima della guerra, dominata dall'industria della maglieria (St Margaret's Works / Corah), calzature e macchinari British United Shoe Machinery.",
    s2_4: "Piani di mobilitazione industriale per fornire indumenti intimi termici, maglioni, calze e stivali per milioni di soldati, marinai e aviatori dell'Impero.",
    s5: "I calzaturifici e maglifici di Leicester lavorano giorno e notte: Corah produce centinaia di migliaia di maglie e calze di lana militare ogni settimana.",
    s6: "Conversione delle officine meccaniche alla produzione di parti per mitragliatrici e spolette d'artiglieria; Leicester accoglie migliaia di sfollati londinesi.",
    s7: "Il Leicester Blitz (notte del 19-20 novembre 1940): bombardamento della Luftwaffe che colpisce fabbriche e case popolari, ma la produzione riprende con rapidità.",
    s8: "Fornitura ininterrotta di equipaggiamento personale per le truppe alleate in Medio Oriente e Africa settentrionale; Frank Whittle testa componenti per la prima turbina a getto.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKF21"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKF21"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKF21"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKF21"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKF21"].s2_4;
      return UK_PROVINCES_META["UKF21"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKF21"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKF22": {
    nuts: "UKF22",
    name: "Leicestershire CC and Rutland",
    modernName: "Leicestershire County and Rutland (Charnwood, Melton, Harborough, Rutland)",
    historicalName: "Leicestershire CC and Rutland (Leicestershire & Rutland / Agricoltura & Fonderie Charnwood)",
    historicCounty: "Leicestershire & Rutland",
    country: "England",
    capital: "Glenfield / Oakham",
    region: "East Midlands",
    keys: ["leicestershire_cc", "rutland", "charnwood", "loughborough", "melton_mowbray", "oakham", "brush_electrical", "ukf22"],
    s0_1: "Contee rurali fertili con il polo industriale di Loughborough (Brush Electrical Engineering), l'allevamento di Melton Mowbray e la minuscola storica contea di Rutland.",
    s2_4: "Brush Electrical a Loughborough adatta le linee alla costruzione di fusoliere d'aerei, generatori elettrici da campo e trasformatori militari.",
    s5: "Agricoltori mobilitati per la campagna 'Dig for Victory': massiccia coltivazione di cereali e patate su terreni da pascolo; accoglienza di bambini sfollati.",
    s6: "Brush Electrical costruisce ali e componenti per i bombardieri de Havilland Mosquito e velivoli da addestramento; la Home Guard presidia i villaggi di Rutland.",
    s7: "Supporto alimentare fondamentale per le aree metropolitane industriali razionate; alloggiamento di reparti corazzati e scali logistici dell'esercito.",
    s8: "Apertura di aeroporti RAF per l'addestramento equipaggi (RAF Melton Mowbray, RAF Cottesmore a Rutland) a sostegno del Bomber Command.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKF22"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKF22"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKF22"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKF22"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKF22"].s2_4;
      return UK_PROVINCES_META["UKF22"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKF22"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKF24": {
    nuts: "UKF24",
    name: "West Northamptonshire",
    modernName: "West Northamptonshire (Northampton, Daventry, South Northamptonshire)",
    historicalName: "West Northamptonshire (Northamptonshire / Northampton Stivali Militari & Trasmettitore Daventry)",
    historicCounty: "Northamptonshire",
    country: "England",
    capital: "Northampton",
    region: "East Midlands",
    keys: ["west_northamptonshire", "northampton", "daventry", "bbc_daventry", "boot_capital", "ukf24"],
    s0_1: "Northampton è la capitale storica incontrastata delle calzature di cuoio di qualità; Daventry ospita il potente trasmettitore radio a onde corte della BBC (BBC Empire Service).",
    s2_4: "I calzaturifici di Northampton ricevono commesse enormi per progettare e produrre milioni di scarponi da combattimento con suole chiodate d'acciaio per la British Army.",
    s5: "Il trasmettitore di Daventry diffonde i bollettini di guerra e le trasmissioni mondiali della BBC in oltre 40 lingue; Northampton sforna oltre il 50% di tutti gli scarponi militari alleati.",
    s6: "Daventry diviene bersaglio di propaganda e ascolto; Northampton fornisce calzature speciali d'alta quota foderate di montone per i piloti della RAF durante la Battaglia d'Inghilterra.",
    s7: "Produzione ininterrotta di stivali e cinturoni in cuoio per l'esercito metropolitano e le divisioni indiane e dell'ANZAC; alloggiamento di ministeri evacuati.",
    s8: "Sviluppo di calzature per climi desertici per le truppe dell'VIII Armata britannica in Egitto; Daventry coordina messaggi in codice per le resistenze europee.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKF24"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKF24"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKF24"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKF24"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKF24"].s2_4;
      return UK_PROVINCES_META["UKF24"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKF24"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKF25": {
    nuts: "UKF25",
    name: "North Northamptonshire",
    modernName: "North Northamptonshire (Corby, Kettering, Wellingborough, East Northamptonshire)",
    historicalName: "North Northamptonshire (Northamptonshire / Corby Siderurgia Tubi Stewarts & Lloyds)",
    historicCounty: "North Northamptonshire",
    country: "England",
    capital: "Kettering / Corby",
    region: "East Midlands",
    keys: ["north_northamptonshire", "corby", "kettering", "wellingborough", "stewarts_lloyds", "ukf25"],
    s0_1: "Corby è una città industriale cresciuta attorno all'avveniristico stabilimento siderurgico Stewarts & Lloyds, fondato su ricchi giacimenti di minerale di ferro locale.",
    s2_4: "Stewarts & Lloyds a Corby si specializza nella laminazione e saldatura di tubi d'acciaio senza saldatura per oleodotti, caldaie navali e proiettili d'artiglieria.",
    s5: "Gli altiforni di Corby illuminano a giorno la campagna circostante, richiedendo imponenti schermature di blackout; migliaia di minatori scozzesi estraggono il minerale di ferro.",
    s6: "Produzione essenziale di acciaio per le corazzature e le munizioni dell'esercito; Kettering e Wellingborough forniscono abbigliamento militare e scarponi.",
    s7: "Stewarts & Lloyds avvia i primi studi segreti sulla fabbricazione di tubazioni flessibili d'acciaio ad altissima pressione che porteranno al futuro oleodotto PLUTO sotto la Manica.",
    s8: "La produzione d'acciaio di Corby tocca il milione di tonnellate annue, confermandosi come uno dei più moderni ed efficienti centri siderurgici del Regno Unito.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKF25"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKF25"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKF25"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKF25"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKF25"].s2_4;
      return UK_PROVINCES_META["UKF25"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKF25"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKF30": {
    nuts: "UKF30",
    name: "Lincolnshire",
    modernName: "Lincolnshire (Lincoln, Boston, East Lindsey, West Lindsey, North Kesteven, South Kesteven)",
    historicalName: "Lincolnshire (Lincolnshire / Lincoln Culla del Carro Armato & Bomber County)",
    historicCounty: "Lincolnshire",
    country: "England",
    capital: "Lincoln",
    region: "East Midlands",
    keys: ["lincolnshire", "lincoln", "boston", "scampton", "waddington", "bomber_county", "foster_tanks", "ukf30"],
    s0_1: "Vasta contea agricola e pianeggiante dominata dalla cattedrale medievale di Lincoln; Lincoln culla storica del carro armato (William Foster & Co.) e motori Ruston & Hornsby.",
    s2_4: "Costruzione di dozzine di piste d'atterraggio in cemento tra i campi del Lincolnshire per ospitare la futura espansione degli squadroni da bombardamento pesante della RAF.",
    s5: "Il Lincolnshire diviene universalmente noto come 'Bomber County': decine di basi aeree operative (RAF Scampton, RAF Waddington, RAF Coningsby) ospitano bombardieri Hampden e Wellington.",
    s6: "Foster & Co. costruisce carri armati e motrici pesanti d'artiglieria; gli aeroporti del Lincolnshire decollano notte dopo notte per missioni offensive sui porti d'invasione tedeschi.",
    s7: "Pattugliamenti della Home Guard lungo la costa tra Boston e Skegness contro possibili sbarchi nemici; le basi aeree subiscono incursioni di cacciabombardieri tedeschi.",
    s8: "Le piste del Lincolnshire vengono allungate per accogliere i nuovi quadrimotori pesanti Manchester e Lancaster; Lincoln è il cuore pulsante dell'offensiva aerea della RAF.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKF30"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKF30"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKF30"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKF30"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKF30"].s2_4;
      return UK_PROVINCES_META["UKF30"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKF30"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKG11": {
    nuts: "UKG11",
    name: "Herefordshire, County of",
    modernName: "Herefordshire (County of Herefordshire, West Midlands)",
    historicalName: "Herefordshire (Herefordshire / Hereford, Frutteti & ROF Rotherwas Munizioni)",
    historicCounty: "Herefordshire",
    country: "England",
    capital: "Hereford",
    region: "West Midlands",
    keys: ["herefordshire", "hereford", "rotherwas", "rof_rotherwas", "marches", "ukg11"],
    s0_1: "Contea delle Marce gallesi celebre per l'agricoltura, i frutteti di mele da sidro, l'allevamento bovino e la cattedrale normanna di Hereford.",
    s2_4: "Riapertura e totale riammodernamento della Royal Ordnance Factory (ROF Rotherwas a Hereford) per il caricamento di bombe aeree pesanti da demolizione.",
    s5: "ROF Rotherwas entra in attività frenetica impiegando migliaia di donne ('Canary Girls'): caricamento di milioni di tonnellate di tritolo e ammatolo nelle bombe per il Bomber Command.",
    s6: "Herefordshire ospita migliaia di bambini e civili sfollati da Londra e Birmingham; la campagna fornisce grano, carne e sidro per il razionamento nazionale.",
    s7: "Un bombardiere Heinkel He 111 isolato attacca ROF Rotherwas il 27 luglio 1940 causando 22 vittime, ma le coraggiose operaie riprendono il caricamento delle bombe in poche ore.",
    s8: "Hereford diviene un centro primario per la fornitura di bombe incendiarie e ad alto potenziale per le crescenti operazioni notturne della Royal Air Force sul continente.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKG11"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKG11"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKG11"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKG11"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKG11"].s2_4;
      return UK_PROVINCES_META["UKG11"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKG11"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKG12": {
    nuts: "UKG12",
    name: "Worcestershire",
    modernName: "Worcestershire (Worcester, Redditch, Bromsgrove, Wyre Forest, Malvern)",
    historicalName: "Worcestershire (Worcestershire / Worcester, Redditch Molle & Telecommunications Research Malvern)",
    historicCounty: "Worcestershire",
    country: "England",
    capital: "Worcester",
    region: "West Midlands",
    keys: ["worcestershire", "worcester", "redditch", "malvern", "kidderminster", "herbert_terry", "ukg12"],
    s0_1: "Contea storica celebre per le porcellane Royal Worcester, i tappeti di Kidderminster, le molle e aghi di precisione di Redditch (Herbert Terry & Sons) e le colline di Malvern.",
    s2_4: "Piani per trasferire ministeri e il governo britannico a Madresfield Court e Hindlip Hall in Worcestershire nel caso Londra debba essere evacuata sotto i bombardamenti.",
    s5: "Redditch produce a milioni le celebri molle di precisione per mitragliatrici Bren e percussori d'armi da fuoco; Worcester riconverte officine alla micromeccanica bellica.",
    s6: "Le officine di Kidderminster e Stourport producono filo metallico, proiettili e parti per autocarri militari; la Home Guard presidia le gole del fiume Severn.",
    s7: "Preparativi per accogliere a Malvern il Telecommunications Research Establishment (TRE), il cervello scientifico dello sviluppo radar del Regno Unito.",
    s8: "Malvern diviene la capitale mondiale della ricerca elettronica e radar segreta, dove scienziati e fisici mettono a punto il radar a microonde a cavità risonante.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKG12"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKG12"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKG12"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKG12"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKG12"].s2_4;
      return UK_PROVINCES_META["UKG12"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKG12"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKG13": {
    nuts: "UKG13",
    name: "Warwickshire",
    modernName: "Warwickshire (Warwick, Leamington Spa, Rugby, Nuneaton, Stratford-upon-Avon)",
    historicalName: "Warwickshire (Warwickshire / Rugby Ingegneria Elettrica BTH & Stratford di Shakespeare)",
    historicCounty: "Warwickshire",
    country: "England",
    capital: "Warwick",
    region: "West Midlands",
    keys: ["warwickshire", "warwick", "rugby", "leamington_spa", "nuneaton", "stratford_upon_avon", "bth_rugby", "ukg13"],
    s0_1: "Il cuore d'Inghilterra: la patria di Shakespeare a Stratford-upon-Avon, il castello di Warwick e il polo tecnologico d'ingegneria elettrica di Rugby (British Thomson-Houston BTH).",
    s2_4: "BTH a Rugby collabora in segreto con Frank Whittle e Power Jets alla costruzione della prima turbina a reazione aeronautica a gas britannica (motore a getto Whittle W.1).",
    s5: "Rugby costruisce trasformatori per la rete radar Chain Home e apparecchiature elettriche navali; Nuneaton estrae carbone per le acciaierie delle West Midlands.",
    s6: "Collaudo segreto a Rugby e Lutterworth del motore a reazione Whittle; Stratford accoglie archivi letterari storici e migliaia di sfollati dalle città vicine.",
    s7: "La Luftwaffe bombarda Nuneaton nel maggio 1941 a causa della sua ferrovia e delle officine; Leamington Spa diviene sede mimetica per laboratori di camuffamento militare.",
    s8: "15 maggio 1941: il primo aereo a reazione britannico Gloster E.28/39 motorizzato dalla turbina Power Jets di Rugby decolla con successo a Cranwell, segnando una nuova era.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKG13"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKG13"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKG13"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKG13"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKG13"].s2_4;
      return UK_PROVINCES_META["UKG13"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKG13"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKG21": {
    nuts: "UKG21",
    name: "Telford and Wrekin",
    modernName: "Telford and Wrekin (Telford, Wellington, Ironbridge, West Midlands)",
    historicalName: "Telford and Wrekin (Shropshire / Ironbridge Culla dell'Industria & Fonderie Coalbrookdale)",
    historicCounty: "Shropshire",
    country: "England",
    capital: "Telford / Wellington",
    region: "West Midlands",
    keys: ["telford_and_wrekin", "ironbridge", "coalbrookdale", "wellington", "wrekin", "ukg21"],
    s0_1: "Culla della Rivoluzione Industriale mondiale lungo la gola di Ironbridge e Coalbrookdale; fonderie storiche di ghisa, ponti e caldaie industriali.",
    s2_4: "Conversione delle storiche fonderie alla produzione in serie di blocchi cilindro per motori di carri armati e scocche per mine anticarro e anti-uomo.",
    s5: "Le fonderie del distretto del Wrekin fondono a ritmo continuo componenti pesanti per l'esercito; rifugio sicuro per bambini e anziani evacuati da Birmingham.",
    s6: "Produzione di parti metalliche per ponti mobili del genio militare e carrozze blindate; la Home Guard presidia la strategica ferrovia lungo il fiume Severn.",
    s7: "Fonderie e officine al riparo da incursioni nemiche devastanti; pieno sostegno alla produzione di carichi pesanti e ferramenta per rifugi antiaerei metallici.",
    s8: "Espansione delle linee di montaggio di componentistica per l'industria aeronautica e rifornimento costante delle officine di riparazione della RAF.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKG21"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKG21"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKG21"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKG21"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKG21"].s2_4;
      return UK_PROVINCES_META["UKG21"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKG21"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKG22": {
    nuts: "UKG22",
    name: "Shropshire CC",
    modernName: "Shropshire (Shrewsbury, Oswestry, Bridgnorth, Ludlow, Market Drayton)",
    historicalName: "Shropshire CC (Shropshire / Shrewsbury & Deposito Munizioni Nesscliffe)",
    historicCounty: "Shropshire",
    country: "England",
    capital: "Shrewsbury",
    region: "West Midlands",
    keys: ["shropshire", "shropshire_cc", "shrewsbury", "nesscliffe", "bridgnorth", "oswestry", "ludlow", "ukg22"],
    s0_1: "Vasta contea agricola di confine con la storica città fortificata di Shrewsbury sul fiume Severn; produzione cerealicola e allevamento bovino delle Marce.",
    s2_4: "Costruzione del gigantesco deposito munizioni sotterraneo e mimetizzato di CAD Nesscliffe per stoccare le riserve dell'esercito in un'area lontana dalla costa.",
    s5: "Shrewsbury snodo logistico e sede della King's Shropshire Light Infantry (KSLI); Nesscliffe entra in funzione stoccando oltre 100.000 tonnellate di esplosivi.",
    s6: "Pattugliamento rurale della Home Guard e accoglienza di migliaia di scolari sfollati dalle città martoriate del Merseyside; la campagna produce derrate per il razionamento.",
    s7: "CAD Nesscliffe distribuisce giorno e notte munizioni antiaeree alle batterie che difendono Liverpool e Manchester dal Blitz tedesco.",
    s8: "Installazione di campi di volo per l'addestramento piloti (RAF Ternhill, RAF Shawbury) che addestrano centinaia di aviatori britannici e del Commonwealth.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKG22"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKG22"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKG22"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKG22"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKG22"].s2_4;
      return UK_PROVINCES_META["UKG22"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKG22"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKG23": {
    nuts: "UKG23",
    name: "Stoke-on-Trent",
    modernName: "Stoke-on-Trent (City of Stoke-on-Trent, West Midlands)",
    historicalName: "Stoke-on-Trent (Staffordshire / The Potteries, Porcellane Elettriche & Acciaio Shelton)",
    historicCounty: "Staffordshire",
    country: "England",
    capital: "Stoke-on-Trent",
    region: "West Midlands",
    keys: ["stoke_on_trent", "the_potteries", "hanley", "burslem", "shelton_bar", "michelin_stoke", "ukg23"],
    s0_1: "La celebre federazione delle 'Six Towns' (The Potteries), capitale mondiale della ceramica industriale con Wedgwood, Minton, gli altiforni Shelton Bar e la fabbrica di pneumatici Michelin.",
    s2_4: "Le industrie ceramiche sviluppano isolatori in porcellana ad altissima tensione per la rete di distribuzione elettrica nazionale e per le torri radar Chain Home.",
    s5: "Michelin a Stoke produce pneumatici corazzati per veicoli militari e carri; Shelton Bar fonde travi d'acciaio per casematte e rifugi antiaerei Anderson.",
    s6: "Produzione ininterrotta di stoviglie d'ordinanza per le mense militari e isolatori per apparati radio e radar; addestramento della Home Guard operaia.",
    s7: "Colpita durante incursioni della Luftwaffe mirate alle acciaierie Shelton Bar e agli stabilimenti Michelin; la produzione di gomma e acciaio prosegue senza soste.",
    s8: "Fornitura essenziale di pneumatici per aerei della RAF e carri armati; le fornaci delle Potteries si confermano un pilastro manifatturiero insostituibile.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKG23"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKG23"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKG23"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKG23"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKG23"].s2_4;
      return UK_PROVINCES_META["UKG23"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKG23"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKG24": {
    nuts: "UKG24",
    name: "Staffordshire CC",
    modernName: "Staffordshire (Stafford, Cannock Chase, Lichfield, Tamworth, Burton upon Trent)",
    historicalName: "Staffordshire CC (Staffordshire / Stafford Locomotive English Electric & RAF Stafford)",
    historicCounty: "Staffordshire",
    country: "England",
    capital: "Stafford",
    region: "West Midlands",
    keys: ["staffordshire_cc", "stafford", "cannock_chase", "lichfield", "burton_upon_trent", "raf_stafford", "ukg24"],
    s0_1: "Contea delle colline di Cannock Chase, birra di Burton upon Trent, cattedrale a tre guglie di Lichfield e colosso meccanico English Electric a Stafford.",
    s2_4: "Costruzione della grande base logistica sotterranea e di superficie RAF Stafford (No. 16 Maintenance Unit) per stoccare parti e ricambi aerei della RAF.",
    s5: "English Electric a Stafford costruisce locomotive industriali, trasformatori pesanti e avvia la linea d'assemblaggio per carri armati veloci Covenanter e Crusader.",
    s6: "RAF Stafford gestisce milioni di ricambi per aerei Spitfire e Hurricane; Burton upon Trent produce lievito e approvvigionamenti per l'alimentazione nazionale.",
    s7: "Staffordshire accoglie depositi militari dispersi; produzione intensiva di carri armati a Stafford e munizioni leggere nelle valli di Cannock Chase.",
    s8: "Consegna continua di carri armati Crusader destinati ai combattimenti in Nord Africa contro le divisioni corazzate dell'Asse in Cirenaica.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKG24"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKG24"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKG24"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKG24"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKG24"].s2_4;
      return UK_PROVINCES_META["UKG24"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKG24"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKG31": {
    nuts: "UKG31",
    name: "Birmingham",
    modernName: "Birmingham (City of Birmingham, West Midlands)",
    historicalName: "Birmingham (Warwickshire / Longbridge Shadow Factory, Spitfire Castle Bromwich & BSA)",
    historicCounty: "Warwickshire / Worcestershire",
    country: "England",
    capital: "Birmingham",
    region: "West Midlands",
    keys: ["birmingham", "city_of_birmingham", "longbridge", "castle_bromwich", "bsa_small_heath", "birmingham_blitz", "ukg31"],
    s0_1: "La 'Città dai Mille Mestieri' e secondo polo industriale dell'Impero Britannico: stabilimenti Austin a Longbridge, Birmingham Small Arms (BSA) a Small Heath e miriadi di officine metallurgiche.",
    s2_4: "Attuazione dello Shadow Factory Plan: Herbert Austin trasforma Longbridge in polo d'assemblaggio aerei Fairey Battle e motori d'aviazione; costruzione del colosso di Castle Bromwich per lo Spitfire.",
    s5: "BSA produce la totalità dei fucili mitragliatori e mitragliatrici aeronautiche Browning per la RAF; Castle Bromwich avvia la produzione in serie dello Spitfire sotto la gestione Vickers.",
    s6: "Castle Bromwich diviene la più grande fabbrica al mondo di Supermarine Spitfire, consegnando centinaia di caccia ogni mese durante la Battaglia d'Inghilterra.",
    s7: "Il tragico Birmingham Blitz (novembre 1940 - aprile 1941): la Luftwaffe bombarda ripetutamente Small Heath e il centro cittadino (uccisi 53 operai alla BSA), ma la produzione continua stoicamente.",
    s8: "Birmingham sforna oltre la metà di tutte le armi leggere, munizioni per caccia, Spitfire e veicoli militari dell'Impero Britannico, risultando l'officina decisiva della resistenza nazionale.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKG31"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKG31"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKG31"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKG31"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKG31"].s2_4;
      return UK_PROVINCES_META["UKG31"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKG31"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKG32": {
    nuts: "UKG32",
    name: "Solihull",
    modernName: "Solihull (West Midlands)",
    historicalName: "Solihull (Warwickshire / Rover Shadow Factory Lode Lane & Motori Aeronautici)",
    historicCounty: "Warwickshire",
    country: "England",
    capital: "Solihull",
    region: "West Midlands",
    keys: ["solihull", "rover_lode_lane", "rover_shadow", "elmdon", "ukg32"],
    s0_1: "Cittadina residenziale e industriale a sud di Birmingham; nel 1937 Rover avvia la costruzione dell'avveniristica fabbrica d'aeroplani e motori di Lode Lane.",
    s2_4: "Lo stabilimento Rover di Lode Lane diviene Shadow Factory ufficiale del governo britannico per la fabbricazione di motori d'aviazione Bristol Hercules e parti d'aereo.",
    s5: "Lode Lane lavora a ciclo continuo: assemblaggio di motori aeronautici radiali pesanti e fusoliere per bombardieri; apertura dell'aeroporto civile di Elmdon (Birmingham Airport).",
    s6: "L'aeroporto di Elmdon viene convertito a base RAF per collaudo velivoli e scuola di volo; Solihull assorbe operai e famiglie evacuate da Birmingham sotto i raid.",
    s7: "Nonostante le incursioni della Luftwaffe sull'area metropolitana, lo stabilimento Rover di Lode Lane mantiene intatta la propria produzione di motori aeronautici.",
    s8: "Rover collabora con Frank Whittle allo sviluppo pionieristico delle prime camere di combustione e giranti per il motore a reazione prima del passaggio a Rolls-Royce.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKG32"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKG32"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKG32"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKG32"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKG32"].s2_4;
      return UK_PROVINCES_META["UKG32"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKG32"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKG33": {
    nuts: "UKG33",
    name: "Coventry",
    modernName: "Coventry (City of Coventry, West Midlands)",
    historicalName: "Coventry (Warwickshire / Polo Aeronautico, Cattedrale Storica & Coventry Blitz)",
    historicCounty: "Warwickshire",
    country: "England",
    capital: "Coventry",
    region: "West Midlands",
    keys: ["coventry", "city_of_coventry", "coventry_blitz", "armstrong_siddeley", "daimler", "standard_motor", "alvis", "ukg33"],
    s0_1: "Capitale dell'industria automobilistica e aeronautica britannica: Armstrong Siddeley, Daimler, Standard Motor Company, Alvis, Rootes e la cattedrale trecentesca di St Michael.",
    s2_4: "Polo nevralgico dello Shadow Factory Plan: gli impianti automobilistici vengono convertiti alla fabbricazione di motori per bombardieri (Cheetah, Mercury), veicoli blindati e aerei completi.",
    s5: "Coventry rifornisce le forze armate di migliaia di motori, autoblindo Daimler Scout Car ('Dingo') e aeroplani bimotore; popolazione operaia concentrata e mobilitata.",
    s6: "Fabbriche di Coventry bersagliate da primi raid aerei durante l'estate 1940; produzione continuativa di parti per i caccia impegnati nella Battaglia d'Inghilterra.",
    s7: "La tragedia del 14-15 novembre 1940 (Operazione Mondscheinsonate): oltre 500 bombardieri della Luftwaffe radono al suolo il centro storico e la cattedrale medievale ('coventrizzazione'), causando oltre 560 morti.",
    s8: "Incredibile rinascita produttiva: in poche settimane le fabbriche disperse riprendono l'assemblaggio di veicoli e motori; il sacrificio di Coventry diviene simbolo mondiale della determinazione britannica.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKG33"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKG33"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKG33"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKG33"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKG33"].s2_4;
      return UK_PROVINCES_META["UKG33"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKG33"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKG36": {
    nuts: "UKG36",
    name: "Dudley",
    modernName: "Dudley (West Midlands / Black Country)",
    historicalName: "Dudley (Worcestershire & Staffordshire / Black Country, Fonderie d'Acciaio & Catene)",
    historicCounty: "Worcestershire / Staffordshire",
    country: "England",
    capital: "Dudley",
    region: "West Midlands",
    keys: ["dudley", "black_country", "stourbridge", "halesowen", "round_oak", "ukg36"],
    s0_1: "Cuore storico del 'Black Country' dominato dal castello medievale e dalle colossali acciaierie Round Oak Steelworks a Brierley Hill; produzione di catene e ancore pesanti.",
    s2_4: "Round Oak si specializza nella fornitura di acciai speciali per corazze e profilati pesanti per l'Ammiragliato; fabbricazione di catene giganti per le corazzate della Royal Navy.",
    s5: "Le fonderie del Black Country fondono migliaia di corpi di bombe aeree, maglie di catene per boe frangiflutti e armature per cannoni; cielo annerito dal fumo protettivo.",
    s6: "Produzione ininterrotta di lamiere pesanti per scafi navali e telai di veicoli militari; operai e maestranze del ferro arruolati nella locale Home Guard operaia.",
    s7: "La densa cappa di fumo industriale del Black Country contribuisce a disorientare i puntatori della Luftwaffe durante i raid notturni, limitando i danni agli stabilimenti.",
    s8: "Fornitura massiccia di piastre per i nuovi carri armati pesanti dell'esercito e cavi d'acciaio per la difesa portuale e le navi da sbarco della flotta.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKG36"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKG36"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKG36"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKG36"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKG36"].s2_4;
      return UK_PROVINCES_META["UKG36"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKG36"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKG37": {
    nuts: "UKG37",
    name: "Sandwell",
    modernName: "Sandwell (West Bromwich, Smethwick, Oldbury, West Midlands)",
    historicalName: "Sandwell (Staffordshire / Smethwick Fari Marini Chance Brothers & Tangye Meccanica)",
    historicCounty: "Staffordshire",
    country: "England",
    capital: "West Bromwich / Smethwick",
    region: "West Midlands",
    keys: ["sandwell", "west_bromwich", "smethwick", "oldbury", "chance_brothers", "tangye", "ukg37"],
    s0_1: "Grande distretto manifatturiero pesante: Chance Brothers a Smethwick (leader mondiale nei vetri ottici per fari marini e lenti radar) e Tangye (motori diesel e presse idrauliche).",
    s2_4: "Chance Brothers avvia la fabbricazione segreta di vetri speciali e componenti ottiche per i radar, periscopi per sommergibili e vetri protettivi per fari da oscuramento.",
    s5: "Le presse idrauliche Tangye fabbricano milioni di bossoli per munizioni d'artiglieria; gli stabilimenti chimici di Oldbury (Albright & Wilson) producono fosforo per bombe.",
    s6: "Produzione a getto continuo di proiettili fosforici e apparati ottici di precisione per la Royal Navy e la RAF; operai specializzati esentati dalla leva per necessità bellica.",
    s7: "Colpita durante le incursioni sul bacino di Birmingham; la robusta edilizia industriale in mattoni e acciaio resiste consentendo il rapido ripristino delle linee.",
    s8: "Fornitura di pompe idrauliche speciali, filtri ottici per visori notturni e composti chimici avanzati per lo sforzo militare congiunto alleato.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKG37"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKG37"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKG37"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKG37"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKG37"].s2_4;
      return UK_PROVINCES_META["UKG37"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKG37"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKG38": {
    nuts: "UKG38",
    name: "Walsall",
    modernName: "Walsall (West Midlands / Black Country)",
    historicalName: "Walsall (Staffordshire / Capitale del Cuoio, Finimenti Militari & Fonderie di Ghisa)",
    historicCounty: "Staffordshire",
    country: "England",
    capital: "Walsall",
    region: "West Midlands",
    keys: ["walsall", "leather_capital", "saddlery", "black_country_north", "ukg38"],
    s0_1: "Capitale britannica della pelletteria e selleria di qualità; fonderie di ghisa malleabile e ferramenta per l'edilizia e l'ingegneria meccanica.",
    s2_4: "I mastri pellai di Walsall ricevono ordini per decine di migliaia di selle, imbracature per muli da salmerie, fondine per rivoltelle Webley e cinturoni d'ordinanza.",
    s5: "Fornitura massiccia di buffetterie in cuoio per le truppe coloniali e metropolitane; le fonderie convertono le linee alla produzione di spolette per bombe e bossoli.",
    s6: "Produzione specializzata di tute da volo in cuoio e caschi per piloti della RAF; la Home Guard di Walsall sorveglia i depositi e gli snodi ferroviari del Black Country.",
    s7: "La produzione non conosce soste: fornitura di finimenti e contenitori rinforzati per strumenti ottici d'artiglieria e radio campali sotto continuo oscuramento.",
    s8: "Espansione delle commesse per equipaggiamenti in cuoio destinati alle armate del Commonwealth impegnate nelle campagne d'Africa e in Asia.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKG38"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKG38"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKG38"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKG38"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKG38"].s2_4;
      return UK_PROVINCES_META["UKG38"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKG38"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKG39": {
    nuts: "UKG39",
    name: "Wolverhampton",
    modernName: "Wolverhampton (City of Wolverhampton, West Midlands)",
    historicalName: "Wolverhampton (Staffordshire / Boulton Paul Aircraft Caccia Defiant & Guy Motors)",
    historicCounty: "Staffordshire",
    country: "England",
    capital: "Wolverhampton",
    region: "West Midlands",
    keys: ["wolverhampton", "boulton_paul", "defiant", "guy_motors", "pendeford", "sunbeam", "ukg39"],
    s0_1: "Grande centro ingegneristico e automobilistico delle Midlands occidentali: Boulton Paul Aircraft a Pendeford, Guy Motors (veicoli pesanti militari) e Sunbeam.",
    s2_4: "Boulton Paul sviluppa e mette in produzione il rivoluzionario caccia biposto con torretta quadrispillo Boulton Paul Defiant; Guy Motors progetta autoblindo saldate ad arco.",
    s5: "Guy Motors produce la prima autoblindo britannica saldata (Guy Armoured Car) e migliaia di autocarri militari; i caccia Defiant entrano in servizio operativo nella RAF.",
    s6: "I caccia Defiant di Boulton Paul sorprendono la Luftwaffe abbattendo decine di aerei nemici sui cieli di Dunkerque; riconversione rapida del Defiant a caccia notturno radarizzato.",
    s7: "Wolverhampton bersaglio di incursioni notturne della Luftwaffe; gli stabilimenti Boulton Paul a Pendeford producono torrette telecomandate per i bombardieri pesanti Halifax e Lancaster.",
    s8: "La tecnologia delle torrette girevoli corazzate Boulton Paul diviene lo standard protettivo per tutti i bombardieri strategici della RAF nella guerra aerea sul continente.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKG39"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKG39"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKG39"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKG39"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKG39"].s2_4;
      return UK_PROVINCES_META["UKG39"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKG39"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKH11": {
    nuts: "UKH11",
    name: "Peterborough",
    modernName: "Peterborough (City of Peterborough, East of England)",
    historicalName: "Peterborough (Northamptonshire / Nodo Ferroviario LNER & Motori Diesel Perkins)",
    historicCounty: "Northamptonshire (Soke of Peterborough)",
    country: "England",
    capital: "Peterborough",
    region: "East of England",
    keys: ["peterborough", "perkins_engines", "lner_peterborough", "fletton_bricks", "soke_of_peterborough", "ukh11"],
    s0_1: "Città cattedrale normanna e cruciale snodo ferroviario della East Coast Main Line; sede pionieristica della Perkins Engines (motori diesel veloci) e mattonifici Fletton.",
    s2_4: "Perkins Engines adatta i propri motori diesel leggeri per imbarcazioni di salvataggio veloci della RAF (Air-Sea Rescue) e gruppi elettrogeni da campo.",
    s5: "I motori Perkins equipaggiano centinaia di motolance veloci per il salvataggio dei piloti abbattuti nella Manica; lo snodo ferroviario smista truppe e rifornimenti verso il nord.",
    s6: "Supporto logistico continuo per i treni ospedale provenienti dai porti della Manica dopo Dunkerque; le fornaci Fletton forniscono milioni di mattoni per rifugi antiaerei.",
    s7: "Peterborough funge da centro di decompressione e alloggiamento per bambini evacuati da Londra; le officine meccaniche riparano vagoni e locomotive danneggiate dai raid.",
    s8: "Fornitura essenziale di motori diesel marini per le motosiluranti della Coastal Forces della Royal Navy per contrastare le S-Boot tedesche nel Mare del Nord.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKH11"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKH11"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKH11"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKH11"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKH11"].s2_4;
      return UK_PROVINCES_META["UKH11"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKH11"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKH12": {
    nuts: "UKH12",
    name: "Cambridgeshire CC",
    modernName: "Cambridgeshire (Cambridge, South Cambridgeshire, East Cambridgeshire, Fenland, Huntingdonshire)",
    historicalName: "Cambridgeshire CC (Cambridgeshire & Huntingdonshire / Cambridge Cavendish & Basi RAF)",
    historicCounty: "Cambridgeshire & Huntingdonshire",
    country: "England",
    capital: "Cambridge",
    region: "East of England",
    keys: ["cambridgeshire_cc", "cambridge", "cavendish_laboratory", "huntingdonshire", "marshalls", "fenland", "ukh12"],
    s0_1: "Sede della prestigiosa Università di Cambridge con i Laboratori Cavendish (eccellenza mondiale nella fisica atomica e radioelettronica) e officine Marshall's all'aeroporto.",
    s2_4: "Scienziati del Cavendish (tra cui John Cockcroft) vengono mobilitati per il segreto sviluppo del radar a microonde e le prime ricerche sul comitato MAUD per la fissione dell'uranio.",
    s5: "Cambridge diviene il cervello scientifico della difesa britannica; Marshall's a Cambridge avvia la riparazione e manutenzione urgente dei bombardieri e caccia della RAF.",
    s6: "Le piste del Cambridgeshire ospitano squadroni di caccia durante la Battaglia d'Inghilterra; Marshall's addestra oltre 20.000 allievi piloti per la RAF.",
    s7: "Rapporto MAUD redatto a Cambridge: prima conferma scientifica al mondo che una bomba atomica all'uranio 235 è realizzabile e decisiva per la guerra.",
    s8: "Marshall's converte e ripara centinaia di bombardieri pesanti; decine di basi aeree americane in via di costruzione tra i Fens del Cambridgeshire.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKH12"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKH12"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKH12"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKH12"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKH12"].s2_4;
      return UK_PROVINCES_META["UKH12"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKH12"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKH14": {
    nuts: "UKH14",
    name: "Suffolk",
    modernName: "Suffolk (Ipswich, Bury St Edmunds, Lowestoft, Suffolk Coastal, Babergh, Mid Suffolk)",
    historicalName: "Suffolk (Suffolk / Bawdsey Manor Culla del Radar Chain Home & Porto di Lowestoft)",
    historicCounty: "Suffolk",
    country: "England",
    capital: "Ipswich",
    region: "East of England",
    keys: ["suffolk", "ipswich", "bawdsey_manor", "chain_home", "bury_st_edmunds", "lowestoft", "watson_watt", "ukh14"],
    s0_1: "Contea costiera storica: a Bawdsey Manor (Felixstowe), Robert Watson-Watt e il suo team scientifico creano la prima stazione operativa radar al mondo (Chain Home).",
    s2_4: "Bawdsey Manor diviene il centro d'addestramento e quartier generale della catena radar che sorveglia l'estuario del Tamigi e il Mare del Nord contro attacchi aerei.",
    s5: "La stazione radar di Bawdsey guida i caccia della RAF all'intercettazione dei primi ricognitori tedeschi; Lowestoft base navale della Royal Naval Patrol Service per dragamine.",
    s6: "Le torri radar in acciaio del Suffolk (Bawdsey, High Street) guidano Keith Park e Hugh Dowding nella vittoria durante la Battaglia d'Inghilterra; difese costiere anti-invasione.",
    s7: "Basi aeree del Suffolk (RAF Honington, RAF Wattisham) compiono continue sortite di bombardamento notturno e caccia notturna contro gli incursori nemici.",
    s8: "Riparazione e bonifica mine navali nel porto di Lowestoft; Suffolk diviene la piattaforma di lancio della futura offensiva aerea congiunta anglo-americana.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKH14"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKH14"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKH14"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKH14"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKH14"].s2_4;
      return UK_PROVINCES_META["UKH14"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKH14"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKH15": {
    nuts: "UKH15",
    name: "Norwich and East Norfolk",
    modernName: "Norwich and East Norfolk (City of Norwich, Broadland, Great Yarmouth)",
    historicalName: "Norwich and East Norfolk (Norfolk / Norwich Cattedrale, Great Yarmouth Porto Navale)",
    historicCounty: "Norfolk",
    country: "England",
    capital: "Norwich",
    region: "East of England",
    keys: ["norwich", "east_norfolk", "great_yarmouth", "broadland", "colmans_mustard", "boulton_paul_norwich", "ukh15"],
    s0_1: "Città medievale con la splendida cattedrale normanna e il castello, celebre per la senape Colman's e le calzature di qualità; porto peschereccio e balneare di Great Yarmouth.",
    s2_4: "Great Yarmouth allestisce postazioni costiere e dragamine per bonificare i canali del Mare del Nord; Norwich istituisce squadre ARP ed esercitazioni antincendio.",
    s5: "I pescherecci di Yarmouth pattugliano le coste orientali contro mine e sommergibili posamine; Colman's produce alimenti in polvere essenziali per le razioni militari.",
    s6: "Spiagge di Yarmouth fortificate con sbarramenti di filo spinato e cannoni costieri in vista di un tentativo di sbarco tedesco; accoglienza di marinai sopravvissuti.",
    s7: "Raid aerei notturni della Luftwaffe sui moli di Great Yarmouth e sulle industrie di Norwich; operai e cittadinanza affrontano con fermezza gli spezzoni incendiari.",
    s8: "Norwich preserva il suo patrimonio architettonico prima dei futuri Baedeker Raids; Great Yarmouth base di motosiluranti MTB per raid notturni contro convogli tedeschi.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKH15"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKH15"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKH15"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKH15"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKH15"].s2_4;
      return UK_PROVINCES_META["UKH15"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKH15"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKH16": {
    nuts: "UKH16",
    name: "North and West Norfolk",
    modernName: "North and West Norfolk (King's Lynn and West Norfolk, North Norfolk)",
    historicalName: "North and West Norfolk (Norfolk / King's Lynn Porto Fluviale & Sandringham Reale)",
    historicCounty: "Norfolk",
    country: "England",
    capital: "King's Lynn",
    region: "East of England",
    keys: ["north_and_west_norfolk", "kings_lynn", "sandringham", "cromer", "the_wash", "ukh16"],
    s0_1: "Costa affacciata sul The Wash e residenza reale di Sandringham House amata da Re Giorgio V e Re Giorgio VI; porto fluviale e mercantile storico di King's Lynn.",
    s2_4: "Misure di sicurezza speciali attorno alla tenuta di Sandringham; King's Lynn incrementa il traffico di grano e barbabietole da zucchero per l'approvvigionamento alimentare.",
    s5: "I campi di volo di RAF Bircham Newton e RAF Marham ospitano bombardieri leggeri e aerei del Coastal Command per la sorveglianza delle acque del Mare del Nord.",
    s6: "Re Giorgio VI e la Regina Elisabetta visitano King's Lynn per incoraggiare le truppe costiere; fortificazioni anticarro erette lungo la costa di Cromer e Hunstanton.",
    s7: "Pattugliamenti incessanti degli aerei del Coastal Command di base a Bircham Newton contro le incursioni aeree e navali dirette verso l'Inghilterra centrale.",
    s8: "La RAF espande la base di Marham per consentire il rischieramento di bombardieri pesanti bimotore e quadrimotore operativi sul continente occupato.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKH16"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKH16"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKH16"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKH16"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKH16"].s2_4;
      return UK_PROVINCES_META["UKH16"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKH16"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKH17": {
    nuts: "UKH17",
    name: "Breckland and South Norfolk",
    modernName: "Breckland and South Norfolk (Thetford, Diss, Wymondham, Dereham)",
    historicalName: "Breckland and South Norfolk (Norfolk / Thetford Forest, Poligono Militare & Basi RAF)",
    historicCounty: "Norfolk",
    country: "England",
    capital: "Thetford / Dereham",
    region: "East of England",
    keys: ["breckland", "south_norfolk", "thetford", "thetford_forest", "dereham", "diss", "stanford_battle_area", "ukh17"],
    s0_1: "Paesaggio di lande sabbiose e pinete della Thetford Forest (la più grande foresta piantata d'Inghilterra); comunità rurali e centri mercantili storici.",
    s2_4: "Individuazione dell'area isolata di Breckland come terreno ideale per campi di lancio, poligoni di tiro e basi aeree per il Bomber Command.",
    s5: "Apertura di aeroporti RAF (RAF Watton, RAF Feltwell) con bombardieri Blenheim e Wellington; agricoltura mobilitata per le colture di barbabietola e cereali.",
    s6: "La Thetford Forest viene utilizzata per celare depositi munizioni e veicoli militari; la Home Guard rurale presidia i crocevia e le piste d'atterraggio ausiliarie.",
    s7: "Gli squadroni del Bomber Command decollati da Feltwell e Watton colpiscono le chiatte da sbarco tedesche concentrate nei porti di Ostenda e Calais.",
    s8: "Espansione delle piste militari e allestimento delle prime aree per accogliere le future divisioni corazzate britanniche in addestramento.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKH17"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKH17"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKH17"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKH17"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKH17"].s2_4;
      return UK_PROVINCES_META["UKH17"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKH17"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKH21": {
    nuts: "UKH21",
    name: "Luton",
    modernName: "Luton (East of England)",
    historicalName: "Luton (Bedfordshire / Vauxhall Carri Armati Churchill & Percival Aircraft)",
    historicCounty: "Bedfordshire",
    country: "England",
    capital: "Luton",
    region: "East of England",
    keys: ["luton", "vauxhall", "churchill_tank", "percival_aircraft", "bedford_trucks", "ukh21"],
    s0_1: "Capitale storica dell'industria dei cappelli di paglia, convertitasi in un colosso automobilistico con la Vauxhall Motors (filiale General Motors) e l'aeroporto civile aperto nel 1938.",
    s2_4: "Vauxhall converte le proprie eccezionali catene di montaggio alla produzione in grande serie degli autocarri militari Bedford (il veicolo standard della British Army).",
    s5: "Vauxhall riceve l'incarico prioritario di progettare e costruire il nuovo carro armato pesante da fanteria britannico Infantry Tank Mk IV (Churchill Tank).",
    s6: "In soli dodici mesi gli ingegneri di Luton completano i prototipi del carro armato Churchill; Percival Aircraft a Luton costruisce centinaia di aerei da addestramento e collegamento.",
    s7: "Il 30 agosto 1940 un raid della Luftwaffe bombarda lo stabilimento Vauxhall di Luton uccidendo 39 operai, ma la produzione dei carri armati e degli autocarri non si ferma.",
    s8: "Luton sforna migliaia di autocarri Bedford al mese e i primi carri Churchill escono dai cancelli della fabbrica per equipaggiare le divisioni corazzate britanniche.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKH21"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKH21"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKH21"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKH21"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKH21"].s2_4;
      return UK_PROVINCES_META["UKH21"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKH21"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKH23": {
    nuts: "UKH23",
    name: "Hertfordshire",
    modernName: "Hertfordshire (Watford, St Albans, Hatfield, Stevenage, Welwyn Garden City)",
    historicalName: "Hertfordshire (Hertfordshire / Hatfield de Havilland Mosquito & Rolls-Royce Leavesden)",
    historicCounty: "Hertfordshire",
    country: "England",
    capital: "Hertford / Hatfield",
    region: "East of England",
    keys: ["hertfordshire", "hatfield", "de_havilland", "mosquito", "watford", "st_albans", "leavesden", "ukh23"],
    s0_1: "Contea a nord di Londra sede della prestigiosa de Havilland Aircraft Company a Hatfield e centro industriale meccanico e chimico a Watford e Welwyn Garden City.",
    s2_4: "Sir Geoffrey de Havilland e il suo team a Hatfield propongono al Ministero dell'Aria un'idea rivoluzionaria: un bombardiere veloce e disarmato costruito interamente in legno.",
    s5: "Nonostante l'iniziale scetticismo ministeriale, a Salisbury Hall vicino a St Albans de Havilland costruisce in segreto il prototipo del leggendario de Havilland Mosquito.",
    s6: "25 novembre 1940: primo volo a Hatfield del prototipo giallo del Mosquito (DH.98); l'aereo si rivela straordinariamente veloce, superando qualsiasi caccia dell'epoca.",
    s7: "Costruzione della Shadow Factory di Leavesden per la produzione di motori aeronautici Rolls-Royce e assemblaggio di bombardieri pesanti Halifax.",
    s8: "Il bombardiere in legno de Havilland Mosquito ('The Wooden Wonder') entra in produzione in serie a Hatfield, destinato a diventare uno dei velivoli più micidiali della Seconda Guerra Mondiale.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKH23"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKH23"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKH23"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKH23"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKH23"].s2_4;
      return UK_PROVINCES_META["UKH23"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKH23"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKH24": {
    nuts: "UKH24",
    name: "Bedford",
    modernName: "Bedford (Borough of Bedford, East of England)",
    historicalName: "Bedford (Bedfordshire / W.H. Allen Ingegneria Navale & Basi Propaganda Nera)",
    historicCounty: "Bedfordshire",
    country: "England",
    capital: "Bedford",
    region: "East of England",
    keys: ["bedford", "borough_of_bedford", "wh_allen", "woburn_abbey", "pwe", "ukh24"],
    s0_1: "Città storica sul fiume Great Ouse celebre per la W.H. Allen, Sons & Co. (costruttrice di turbine a vapore, pompe idrauliche navali e generatori per la Royal Navy).",
    s2_4: "W.H. Allen incrementa la produzione di macchinari ausiliari di sala macchine per le nuove corazzate e portaerei in costruzione per il programma navale d'emergenza.",
    s5: "A Woburn Abbey (ai margini di Bedford), il governo britannico insedia il Political Warfare Executive (PWE) e stazioni radio segrete per la 'propaganda nera' verso la Germania.",
    s6: "Bedford accoglie oltre 10.000 bambini e madri sfollati dall'East End di Londra; W.H. Allen produce a ritmo serrato apparati marittimi per rimpiazzare le perdite.",
    s7: "I trasmettitori segreti del PWE diffondono false notizie e bollettini per demoralizzare le truppe e la popolazione civile del Terzo Reich sotto la guida di Sefton Delmer.",
    s8: "Turbine e generatori ausiliari Allen equipaggiano le nuove corvette e fregate impegnate nella protezione dei convogli atlantici contro gli U-Boot.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKH24"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKH24"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKH24"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKH24"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKH24"].s2_4;
      return UK_PROVINCES_META["UKH24"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKH24"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKH25": {
    nuts: "UKH25",
    name: "Central Bedfordshire",
    modernName: "Central Bedfordshire (Dunstable, Leighton Buzzard, Biggleswade, Ampthill)",
    historicalName: "Central Bedfordshire (Bedfordshire / Y-Service Chicksands & Basi Segrete Telecomunicazioni)",
    historicCounty: "Bedfordshire",
    country: "England",
    capital: "Chicksands / Dunstable",
    region: "East of England",
    keys: ["central_bedfordshire", "dunstable", "leighton_buzzard", "chicksands", "y_service", "biggleswade", "ukh25"],
    s0_1: "Campagna ondulata attraversata da storiche strade romane; centri agricoli di Biggleswade e industrie automobilistiche e di componenti a Dunstable.",
    s2_4: "A Chicksands Priory la Royal Air Force stabilisce la prima stazione d'intercettazione radio 'Y-Service' per captare le trasmissioni nemiche in codice Morse.",
    s5: "RAF Chicksands intercetta migliaia di messaggi radio tedeschi cifrati con la macchina Enigma, trasmettendoli via teleferica e motociclisti a Bletchley Park per la decifrazione.",
    s6: "La stazione Y-Service di Chicksands lavora giorno e notte fornendo il materiale grezzo su cui lavorano Alan Turing e i crittanalisti dell'intelligence Ultra.",
    s7: "Dunstable e Leighton Buzzard ospitano fabbriche disperse di componentistica aeronautica e centri meteorologici strategici per le operazioni della RAF.",
    s8: "Chicksands espande le antenne a cerchio per la radiogoniometria (Direction Finding), localizzando con precisione millimetrica i sommergibili e gli aerei nemici.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKH25"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKH25"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKH25"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKH25"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKH25"].s2_4;
      return UK_PROVINCES_META["UKH25"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKH25"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKH31": {
    nuts: "UKH31",
    name: "Southend-on-Sea",
    modernName: "Southend-on-Sea (East of England)",
    historicalName: "Southend-on-Sea (Essex / Fortezza Navale HMS Leigh & Raduno Convogli Tamigi)",
    historicCounty: "Essex",
    country: "England",
    capital: "Southend-on-Sea",
    region: "East of England",
    keys: ["southend", "southend_on_sea", "hms_leigh", "southend_pier", "thames_estuary", "ukh31"],
    s0_1: "Popolarissima stazione balneare dell'Essex con il pontile Southend Pier, il molo da diporto in ferro più lungo del mondo (oltre 2,1 km) che si protende nell'estuario del Tamigi.",
    s2_4: "L'Ammiragliato individua Southend e il suo pier come postazione ideale per il controllo assoluto del traffico marittimo in entrata e uscita dal porto di Londra.",
    s5: "Southend Pier viene requisito dalla Royal Navy e ribattezzato nave da guerra stazionaria HMS Leigh: diviene il centro di controllo di tutti i convogli navali della costa orientale.",
    s6: "Oltre 3.300 convogli (più di 84.000 navi mercantili) vengono assemblati e controllati da HMS Leigh durante la guerra; batterie di cannoni e fari sul pontile.",
    s7: "La Luftwaffe bombarda ripetutamente Southend e mina le acque dell'estuario con mine magnetiche e acustiche; dragamine operano giorno e notte.",
    s8: "HMS Leigh mantiene aperto il cordone ombelicale mercantile che rifornisce di cibo, carbone e armi la metropoli di Londra nonostante i continui attacchi aerei.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKH31"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKH31"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKH31"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKH31"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKH31"].s2_4;
      return UK_PROVINCES_META["UKH31"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKH31"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKH32": {
    nuts: "UKH32",
    name: "Thurrock",
    modernName: "Thurrock (Grays, Tilbury, Stanford-le-Hope, East of England)",
    historicalName: "Thurrock (Essex / Tilbury Docks & Raffinerie Petrolifere di Shell Haven)",
    historicCounty: "Essex",
    country: "England",
    capital: "Grays / Tilbury",
    region: "East of England",
    keys: ["thurrock", "tilbury", "tilbury_docks", "shell_haven", "thames_haven", "grays", "ukh32"],
    s0_1: "Sponda settentrionale del Tamigi dominata dai Tilbury Docks (il porto passeggeri e mercantile profondo di Londra) e i colossali serbatoi di petrolio di Shell Haven e Thames Haven.",
    s2_4: "Piani urgenti di compartimentazione e protezione antincendio per i milioni di barili di combustibile stoccati a Shell Haven; allestimento di cannoni antiaerei e fumi artificiali.",
    s5: "Tilbury gestisce l'imbarco di reparti della British Expeditionary Force verso la Francia; petroliere scaricano greggio vitale per le centrali e le industrie della capitale.",
    s6: "I Docks di Tilbury e i depositi di Thames Haven divengono bersaglio primario della Luftwaffe: il 7 settembre 1940 imponenti incendi illuminano l'estuario per giorni.",
    s7: "Eroismo incalcolabile dei vigili del fuoco dell'AFS e degli operai portuali che spengono gli incendi tra i serbatoi di benzina sotto una pioggia di bombe ad alto potenziale.",
    s8: "Ripristino dei terminali petroliferi e protezione con reti sottomarine parasiluro; Tilbury continua a movimentare rifornimenti e munizioni per le forze armate alleate.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKH32"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKH32"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKH32"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKH32"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKH32"].s2_4;
      return UK_PROVINCES_META["UKH32"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKH32"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKH34": {
    nuts: "UKH34",
    name: "Essex Haven Gateway",
    modernName: "Essex Haven Gateway (Colchester, Tendring, Harwich, East of England)",
    historicalName: "Essex Haven Gateway (Essex / Harwich Base Navale Dragamine & Caserme Colchester)",
    historicCounty: "Essex",
    country: "England",
    capital: "Colchester / Harwich",
    region: "East of England",
    keys: ["essex_haven_gateway", "harwich", "colchester", "tendring", "hms_badger", "kindertransport", "ukh34"],
    s0_1: "Colchester la più antica città registrata d'Inghilterra e grande centro di guarnigione militare; porto navale di Harwich, terminale dei traghetti per l'Olanda e il continente.",
    s2_4: "Harwich accoglie oltre 10.000 bambini ebrei rifugiati dalla Germania e dall'Austria salvati dall'operazione umanitaria Kindertransport tra il 1938 e il 1939.",
    s5: "Harwich diviene la base navale militare avanzata HMS Badger, sede della flottiglia di cacciatorpediniere e dragamine incaricata di pattugliare il Mare del Nord meridionale.",
    s6: "Le navi salpate da Harwich compiono sortite disperate per evacuare truppe e civili dall'Olanda e dal Belgio invasi; Colchester prepara le difese di terra anti-sbarco.",
    s7: "La base di Harwich e la costa di Tendring affrontano quotidiane sortite di bombardieri e posamine tedeschi; dragamine ripuliscono i canali di transito ogni alba.",
    s8: "HMS Badger coordina le motosiluranti e cacciatorpediniere che danno la caccia alle motosiluranti veloci tedesche (Schnellboote) che insidiano i convogli costieri.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKH34"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKH34"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKH34"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKH34"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKH34"].s2_4;
      return UK_PROVINCES_META["UKH34"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKH34"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKH35": {
    nuts: "UKH35",
    name: "West Essex",
    modernName: "West Essex (Epping Forest, Harlow, Uttlesford, Saffron Walden, East of England)",
    historicalName: "West Essex (Essex / Base Caccia RAF North Weald & RAF Debden)",
    historicCounty: "Essex",
    country: "England",
    capital: "Epping / Saffron Walden",
    region: "East of England",
    keys: ["west_essex", "epping_forest", "north_weald", "debden", "raf_north_weald", "raf_debden", "ukh35"],
    s0_1: "Contea storica che abbraccia l'antica Epping Forest, centri mercantili storici e le basi aeree della RAF in espansione a North Weald e Debden.",
    s2_4: "RAF North Weald e RAF Debden vengono designate stazioni di settore chiave del Gruppo 11 del Fighter Command, dotate di hangar protetti e collegamenti telefonici diretti a Bentley Priory.",
    s5: "Gli squadroni di Hurricane di North Weald e Debden entrano in azione coprendo la Manica e i cieli di Londra contro i primi ricognitori nemici; oscuramento totale.",
    s6: "Durante la Battaglia d'Inghilterra, North Weald e Debden subiscono violentissimi bombardamenti dalla Luftwaffe: crateri sulle piste, hangar sventrati, ma i piloti continuano a decollare.",
    s7: "I piloti britannici, polacchi, cechi e americani degli 'Eagle Squadrons' a Debden e North Weald infliggono pesantissime perdite ai bombardieri tedeschi.",
    s8: "Le basi del West Essex passano all'offensiva: decollo di sortite 'Rhubarb' e 'Circus' sui cieli della Francia occupata per sfidare i caccia della Luftwaffe.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKH35"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKH35"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKH35"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKH35"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKH35"].s2_4;
      return UK_PROVINCES_META["UKH35"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKH35"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKH36": {
    nuts: "UKH36",
    name: "Heart of Essex",
    modernName: "Heart of Essex (Chelmsford, Brentwood, Maldon, Braintree, East of England)",
    historicalName: "Heart of Essex (Essex / Chelmsford Marconi Radio & Cuscinetti Hoffmann)",
    historicCounty: "Essex",
    country: "England",
    capital: "Chelmsford",
    region: "East of England",
    keys: ["heart_of_essex", "chelmsford", "brentwood", "maldon", "braintree", "marconi", "hoffmann_bearings", "ukh36"],
    s0_1: "Chelmsford capitale dell'Essex e culla mondiale delle telecomunicazioni con la Marconi Company a New Street; grandiosa fabbrica di cuscinetti a sfera Hoffmann Manufacturing.",
    s2_4: "Marconi collabora in segreto allo sviluppo dei trasmettitori radar Chain Home e apparati radio HF/DF per la Royal Navy; Hoffmann aumenta la fornitura di cuscinetti per aerei.",
    s5: "Produzione prioritissima di apparati radio di bordo per caccia Spitfire e trasmettitori radar; Hoffmann lavora 24 ore su 24 per rifornire tutta l'industria aeronautica.",
    s6: "La Luftwaffe tenta disperatamente di distruggere gli stabilimenti Marconi e Hoffmann a Chelmsford: bombardamenti mirati causano vittime ma non arrestano le linee.",
    s7: "Reclutamento massiccio di manodopera femminile nelle fabbriche radiofoniche; Maldon e il fiume Blackwater allestiscono postazioni di vigilanza costiera anti-invasione.",
    s8: "Marconi sviluppa i primi apparati IFF ('Identification Friend or Foe') che consentono ai radar britannici di distinguere istantaneamente gli aerei amici da quelli nemici.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKH36"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKH36"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKH36"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKH36"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKH36"].s2_4;
      return UK_PROVINCES_META["UKH36"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKH36"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKH37": {
    nuts: "UKH37",
    name: "Essex Thames Gateway",
    modernName: "Essex Thames Gateway (Basildon, Castle Point, Canvey Island, East of England)",
    historicalName: "Essex Thames Gateway (Essex / Canvey Island Depositi Carburante & Difese Fluviali)",
    historicCounty: "Essex",
    country: "England",
    capital: "Basildon / Canvey Island",
    region: "East of England",
    keys: ["essex_thames_gateway", "basildon", "castle_point", "canvey_island", "hadleigh_castle", "ukh37"],
    s0_1: "Pianura alluvionale e coste dell'estuario del Tamigi con Canvey Island, Hadleigh Castle e i grandi terminali di scarico petrolifero e gassoso per la capitale.",
    s2_4: "Fortificazione arginale di Canvey Island per prevenire allagamenti provocati da bombe e allestimento di postazioni di mitragliatrici pesanti contro incursori navali.",
    s5: "Installazione di sbarramenti a palloni frenati e batterie contraeree mobili per intercettare i bombardieri tedeschi che risalgono il corso del Tamigi guidati dal fiume.",
    s6: "Sotto costante minaccia di sbarco anfibio tedesco (Operazione Leone Marino); costruzione di fortini pillbox e ostacoli anticarro lungo gli argini e le secche.",
    s7: "Canvey Island e Castle Point bersagliate da bombe destinate a Londra scaricate da aerei tedeschi intercettati dalla caccia notturna della RAF.",
    s8: "Presidio delle rotte idroviarie e supporto ai convogli costieri; sorveglianza radar avanzata alla foce del fiume per segnalare in anticipo gli incursori della Luftwaffe.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKH37"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKH37"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKH37"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKH37"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKH37"].s2_4;
      return UK_PROVINCES_META["UKH37"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKH37"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI31": {
    nuts: "UKI31",
    name: "Camden and City of London",
    modernName: "Camden and City of London (Inner London - West, Greater London)",
    historicalName: "Camden and City of London (County of London / Bank of England & Cattedrale di St Paul)",
    historicCounty: "County of London / Middlesex",
    country: "England",
    capital: "City of London",
    region: "London",
    keys: ["camden", "city_of_london", "st_pauls", "bank_of_england", "second_great_fire", "kings_cross", "st_pancras", "uki31"],
    s0_1: "Il 'Square Mile', cuore finanziario dell'Impero Britannico con la Bank of England, la Borsa, St Paul's Cathedral e i grandi snodi ferroviari di King's Cross, St Pancras ed Euston a Camden.",
    s2_4: "Trasferimento segreto dei lingotti d'oro della Bank of England verso il Canada (Operazione Fish); scavo di rifugi antiaerei a St Paul e nei sotterranei delle stazioni ferroviarie.",
    s5: "Blackout totale cala sulla City; le stazioni di King's Cross e St Pancras gestiscono l'evacuazione di centinaia di migliaia di bambini londinesi nell'Operazione Pied Piper.",
    s6: "La City organizza la Home Guard finanziaria e le ronde antincendio sul tetto di St Paul sotto la guida dell'architetto Godfrey Allen; Westminster e la City in allerta costante.",
    s7: "La tragica notte del 29-30 dicembre 1940 ('Second Great Fire of London'): la Luftwaffe scatena una tempesta di fuoco sulla City; St Paul emerge miracolosamente avvolta dal fumo, foto iconica mondiale.",
    s8: "La City ferita ma indomita continua a gestire le finanze dell'Impero e gli acquisti esteri; Camden ripara senza sosta le linee ferroviarie strategiche per il transito bellico.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI31"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI31"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI31"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI31"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI31"].s2_4;
      return UK_PROVINCES_META["UKI31"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI31"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI32": {
    nuts: "UKI32",
    name: "Westminster",
    modernName: "Westminster (City of Westminster, Inner London - West, Greater London)",
    historicalName: "Westminster (County of London / Sede del Governo di Sua Maestà & Cabinet War Rooms)",
    historicCounty: "County of London / Middlesex",
    country: "England",
    capital: "Westminster",
    region: "London",
    keys: ["westminster", "city_of_westminster", "whitehall", "churchill_war_rooms", "downing_street", "parliament", "buckingham_palace", "uki32"],
    s0_1: "Capitale politica dell'Impero Britannico: Houses of Parliament, Buckingham Palace, l'Abbazia di Westminster, Downing Street 10 e i ministeri dell'Ammiragliato e della Guerra a Whitehall.",
    s2_4: "Costruzione segreta sotto il Ministero dei Lavori Pubblici a Whitehall del quartier generale protetto sotterraneo del governo: le Cabinet War Rooms.",
    s5: "Winston Churchill viene richiamato all'Ammiragliato ('Winston is back!'); il War Cabinet si riunisce quotidianamente nelle War Rooms sotterranee per gestire il blocco navale e la BEF.",
    s6: "10 maggio 1940: Churchill diviene Primo Ministro; celebri discorsi alla Camera dei Comuni ('Sangue, fatica, lacrime e sudore' e 'Combatteremo sulle spiagge'); Buckingham Palace bombardato a settembre.",
    s7: "Il Blitz colpisce duramente Westminster: Buckingham Palace subisce 9 colpi diretti (la Regina dichiara: 'Ora posso guardare l'East End negli occhi'); Churchill dirige la nazione dalle War Rooms.",
    s8: "Il tragico raid del 10 maggio 1941: la Camera dei Comuni viene completamente distrutta dalle fiamme e Westminster Abbey colpita; Churchill proclama la determinazione incrollabile dell'Impero.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI32"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI32"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI32"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI32"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI32"].s2_4;
      return UK_PROVINCES_META["UKI32"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI32"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI33": {
    nuts: "UKI33",
    name: "Kensington & Chelsea and Hammersmith & Fulham",
    modernName: "Kensington and Chelsea, Hammersmith and Fulham (Inner London - West)",
    historicalName: "Kensington & Chelsea and Hammersmith & Fulham (County of London / Ambasciate & Quartieri Generali)",
    historicCounty: "County of London / Middlesex",
    country: "England",
    capital: "Kensington",
    region: "London",
    keys: ["kensington", "chelsea", "hammersmith", "fulham", "white_city", "olympia", "uki33"],
    s0_1: "Eleganti quartieri residenziali e diplomatici di Londra con il Victoria and Albert Museum, il Natural History Museum, le ambasciate straniere e il polo fieristico di Olympia e White City.",
    s2_4: "I grandi musei imballano e trasferiscono migliaia di casse di tesori artistici e scientifici verso castelli e miniere sicure in Galles; allestimento di posti di soccorso ARP.",
    s5: "Olympia e White City vengono convertite a centri di smistamento truppe, caserme temporanee per rifugiati e magazzini d'equipaggiamento militare della difesa territoriale.",
    s6: "La sede della legazione della Francia Libera del generale Charles de Gaulle si stabilisce a Carlton Gardens e Kensington; coordinamento della resistenza antinazista europea.",
    s7: "Violente incursioni aeree della Luftwaffe devastano quartieri di Chelsea e Kensington; artisti, intellettuali e cittadini organizzano squadre antincendio volontarie e soccorsi.",
    s8: "Hammersmith e Fulham mantengono le fabbriche di componentistica meccanica lungo il fiume e centrali elettriche attive; rifugio per governi in esilio di Norvegia, Olanda e Belgio.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI33"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI33"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI33"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI33"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI33"].s2_4;
      return UK_PROVINCES_META["UKI33"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI33"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI34": {
    nuts: "UKI34",
    name: "Wandsworth",
    modernName: "Wandsworth (Inner London - West, Greater London)",
    historicalName: "Wandsworth (County of London / Battersea Power Station & Centrali sul Tamigi)",
    historicCounty: "County of London / Surrey",
    country: "England",
    capital: "Wandsworth",
    region: "London",
    keys: ["wandsworth", "battersea", "battersea_power_station", "putney", "tooting", "uki34"],
    s0_1: "Distretto a sud del Tamigi famoso per la colossale centrale elettrica in mattoni in stile Art Déco di Battersea Power Station (il 'tempio dell'energia' di Londra) e il carcere di Wandsworth.",
    s2_4: "Misure segrete di camuffamento e postazioni antiaeree sul tetto di Battersea Power Station per proteggere la principale fonte d'energia elettrica della capitale britannica.",
    s5: "Wandsworth Prison ospita sezioni di sicurezza per spie catturate dall'MI5 e obiettori di coscienza; le centrali sul Tamigi lavorano a pieno regime per alimentare industrie e trasporti.",
    s6: "I fumi della centrale di Battersea vengono regolati per non offrire punti di riferimento visivi ai piloti della Luftwaffe; allestimento di rifugi pubblici sotterranei a Clapham Junction.",
    s7: "La Luftwaffe colpisce ripetutamente l'area di Wandsworth e Battersea: la centrale elettrica viene sfiorata da bombe pesanti ma continua miracolosamente a erogare elettricità a Londra.",
    s8: "Clapham Junction snodo ferroviario nevralgico continuamente riparato dal genio dei ferrovieri dopo i bombardamenti notturni; supporto incessante alla capitale resistente.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI34"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI34"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI34"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI34"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI34"].s2_4;
      return UK_PROVINCES_META["UKI34"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI34"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI41": {
    nuts: "UKI41",
    name: "Hackney and Newham",
    modernName: "Hackney and Newham (Inner London - East, Greater London)",
    historicalName: "Hackney and Newham (County of London & Essex / Royal Docks & Stratford Snodo Merci)",
    historicCounty: "County of London / Essex",
    country: "England",
    capital: "Stratford / Hackney",
    region: "London",
    keys: ["hackney", "newham", "royal_docks", "stratford_works", "west_ham", "east_ham", "silvertown", "uki41"],
    s0_1: "Cuore operaio e marittimo di Londra: i giganteschi Royal Docks a Newham (Victoria, Albert, King George V Docks, il più grande bacino chiuso al mondo) e gli scali ferroviari di Stratford.",
    s2_4: "Piani di evacuazione massiccia per centinaia di migliaia di residenti e bambini dell'East End; stoccaggio d'emergenza di combustibili e gomma nei depositi di Silvertown.",
    s5: "I Royal Docks gestiscono colossali quantità di merci e munizioni sbarcate dai convogli d'oltremare; le officine di Stratford riparano locomotive merci giorno e notte.",
    s6: "La classe operaia di West Ham, East Ham e Hackney si unisce in massa alla Home Guard e all'Auxiliary Fire Service; scavo di rifugi trincerati nei parchi pubblici.",
    s7: "Black Saturday (7 settembre 1940): l'inizio del Blitz si abbatte con furia inaudita sui Royal Docks e Silvertown, scatenando un inferno di fiamme; la popolazione operaia resiste eroicamente.",
    s8: "Nonostante la distruzione di interi quartieri popolari, i portuali e ferrovieri di Hackney e Newham continuano a scaricare merci e rifornire la capitale e l'esercito.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI41"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI41"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI41"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI41"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI41"].s2_4;
      return UK_PROVINCES_META["UKI41"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI41"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI42": {
    nuts: "UKI42",
    name: "Tower Hamlets",
    modernName: "Tower Hamlets (Inner London - East, Greater London)",
    historicalName: "Tower Hamlets (County of London / East End, London Docks, Torre di Londra & Stepney)",
    historicCounty: "County of London / Middlesex",
    country: "England",
    capital: "Stepney / Poplar",
    region: "London",
    keys: ["tower_hamlets", "east_end", "tower_of_london", "london_docks", "stepney", "poplar", "isle_of_dogs", "bethnal_green", "uki42"],
    s0_1: "L'East End tradizionale di Londra: la millenaria Torre di Londra, London Docks, St Katharine Docks, West India Docks sull'Isle of Dogs e i popolosi quartieri di Stepney, Poplar e Bethnal Green.",
    s2_4: "La Torre di Londra viene chiusa al pubblico, i Gioielli della Corona trasferiti segretamente al Castello di Windsor e il fossato trasformato in orto di guerra ('Dig for Victory').",
    s5: "Evacuazione della maggioranza degli scolari dell'East End verso le contee rurali; le banchine dell'Isle of Dogs scaricano carichi strategici di grano, zucchero e metalli.",
    s6: "La Torre di Londra ospita guarnigioni della milizia e diviene prigione militare per spie catturate; allestimento di batterie antiaeree lungo le anse del Tamigi.",
    s7: "Il martirio dell'East End durante il Blitz (settembre 1940 - maggio 1941): bombardato per 57 notti consecutive, l'Isle of Dogs e Stepney subiscono distruzioni apocalittiche; nasce lo spirito indomito del Blitz.",
    s8: "La stazione sotterranea incompiuta di Bethnal Green funge da rifugio antiaereo sicuro per migliaia di civili a notte; la Torre di Londra subisce danni ma rimane in piedi.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI42"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI42"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI42"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI42"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI42"].s2_4;
      return UK_PROVINCES_META["UKI42"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI42"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI43": {
    nuts: "UKI43",
    name: "Haringey and Islington",
    modernName: "Haringey and Islington (Inner London - East, Greater London)",
    historicalName: "Haringey and Islington (County of London & Middlesex / Alexandra Palace & Tube Rifugi)",
    historicCounty: "County of London / Middlesex",
    country: "England",
    capital: "Islington / Wood Green",
    region: "London",
    keys: ["haringey", "islington", "alexandra_palace", "finsbury", "tube_shelters", "uki43"],
    s0_1: "Distretti popolari e residenziali a nord della City; ad Alexandra Palace la BBC inaugura nel novembre 1936 le prime trasmissioni televisive pubbliche regolari ad alta definizione al mondo.",
    s2_4: "1° settembre 1939: le trasmissioni televisive di Alexandra Palace vengono improvvisamente interrotte nel mezzo di un cartone animato di Topolino per non offrire segnali guida alla Luftwaffe.",
    s5: "Il trasmettitore di Alexandra Palace viene riconvertito segretamente per disturbare i sistemi di radionavigazione della Luftwaffe (sistema 'Y-Gerät' e 'Knickebein' nella Battaglia delle Onde).",
    s6: "Le stazioni della metropolitana di Islington e Haringey vengono prese d'assalto ogni sera dai cittadini che trasformano le banchine sotterranee in dormitori comunitari protetti.",
    s7: "Finsbury realizza i celebri rifugi sotterranei rinforzati in cemento progettati dall'architetto Berthold Lubetkin; le difese aeree di Londra nord abbattono numerosi bombardieri tedeschi.",
    s8: "I tecnici di Alexandra Palace continuano a vincere la 'guerra delle onde' invisibile, deviando i fasci radio dei bombardieri notturni tedeschi verso campagne aperte.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI43"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI43"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI43"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI43"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI43"].s2_4;
      return UK_PROVINCES_META["UKI43"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI43"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI44": {
    nuts: "UKI44",
    name: "Lewisham and Southwark",
    modernName: "Lewisham and Southwark (Inner London - East, Greater London)",
    historicalName: "Lewisham and Southwark (County of London / Surrey Docks & Banchine del Tamigi)",
    historicCounty: "County of London / Surrey / Kent",
    country: "England",
    capital: "Southwark / Lewisham",
    region: "London",
    keys: ["lewisham", "southwark", "surrey_commercial_docks", "borough_market", "camberwell", "uki44"],
    s0_1: "Sponda meridionale del Tamigi celebre per i Surrey Commercial Docks (la principale riserva di legname importato del Regno Unito), la cattedrale di Southwark e il Borough Market.",
    s2_4: "Misure antincendio speciali per i milioni di metri cubi di legname accatastati nei Surrey Docks; organizzazione delle squadre dell'Auxiliary Fire Service (AFS).",
    s5: "I Surrey Docks riforniscono di legname l'edilizia militare, le miniere di carbone e la costruzione navale; Lewisham accoglie ospedali di riserva della capitale.",
    s6: "Le banchine sul fiume vengono dotate di cannoni da 4,5 pollici e riflettori per intercettare i bombardieri che seguono la curva del Tamigi verso Westminster.",
    s7: "7 settembre 1940: i depositi di legname dei Surrey Docks vengono colpiti da migliaia di bombe incendiarie, trasformandosi nel più violento rogo della storia moderna di Londra.",
    s8: "I vigili del fuoco e i civili di Southwark e Lewisham lottano per giorni contro le fiamme; ripristino parziale delle banchine per non arrestare il transito di cibo ed energia.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI44"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI44"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI44"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI44"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI44"].s2_4;
      return UK_PROVINCES_META["UKI44"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI44"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI45": {
    nuts: "UKI45",
    name: "Lambeth",
    modernName: "Lambeth (Inner London - East, Greater London)",
    historicalName: "Lambeth (County of London / County Hall, Waterloo Station & Lambeth Palace)",
    historicCounty: "County of London / Surrey",
    country: "England",
    capital: "Lambeth / Brixton",
    region: "London",
    keys: ["lambeth", "county_hall", "waterloo_station", "lambeth_palace", "brixton", "uki45"],
    s0_1: "Sede monumentale del London County Council (County Hall) di fronte al Parlamento, Waterloo Station (il più trafficato terminal ferroviario per il sud d'Inghilterra) e Lambeth Palace.",
    s2_4: "Da County Hall Herbert Morrison coordina la protezione antiaerea (ARP), i rifugi e i servizi sanitari d'emergenza per tutti i milioni di residenti della contea di Londra.",
    s5: "Waterloo Station diviene il punto di partenza principale per i convogli della BEF diretti a Southampton e per migliaia di bambini evacuati; oscuramento totale della grande tettoia.",
    s6: "Waterloo gestisce il rimpatrio e lo smistamento di centinaia di migliaia di soldati salvati da Dunkerque; County Hall diviene il centro operativo dei soccorsi del Blitz.",
    s7: "Waterloo Station e Lambeth subiscono continui colpi diretti da bombe pesanti: binari distrutti vengono riparati a tempo di record dalle squadre genieri per non interrompere i treni.",
    s8: "La metropolitana di Lambeth e i rifugi profondi offrono protezione a decine di migliaia di londinesi; Morrison introduce i rifugi metallici domestici da interni ('Morrison Shelter').",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI45"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI45"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI45"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI45"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI45"].s2_4;
      return UK_PROVINCES_META["UKI45"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI45"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI51": {
    nuts: "UKI51",
    name: "Bexley and Greenwich",
    modernName: "Bexley and Greenwich (Outer London - East and North East, Greater London)",
    historicalName: "Bexley and Greenwich (County of London & Kent / Royal Arsenal Woolwich & Royal Naval College)",
    historicCounty: "County of London / Kent",
    country: "England",
    capital: "Woolwich / Greenwich",
    region: "London",
    keys: ["bexley", "greenwich", "woolwich", "royal_arsenal", "royal_naval_college", "meridian", "uki51"],
    s0_1: "Lo storico osservatorio di Greenwich (Meridiano Zero), il Royal Naval College e il leggendario Royal Arsenal a Woolwich, il più vasto complesso statale di fabbricazione di munizioni e artiglieria dell'Impero.",
    s2_4: "Il Royal Arsenal a Woolwich impiega oltre 30.000 operai nella colata di cannoni navali, affusti d'artiglieria, mine marine e caricamento di polveri esplosive.",
    s5: "Woolwich opera a ciclo continuo giorno e notte: produzione dei cannoni per le navi della Royal Navy e per i carri armati dell'esercito; rigida sorveglianza militare.",
    s6: "7 settembre 1940: il Royal Arsenal viene colpito pesantemente durante il primo grande raid diurno su Londra, con decine di vittime, ma i bunker interni e le fonderie riprendono la produzione.",
    s7: "Dispersione strategica di parte delle linee di Woolwich in impianti ausiliari sotterranei e periferici per evitare interruzioni nella fornitura d'armi pesanti all'esercito.",
    s8: "Il Royal Naval College a Greenwich continua ad addestrare ufficiali della marina da guerra britannica e del Commonwealth; Bexley e Woolwich presidiano la difesa della Manica fluviale.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI51"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI51"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI51"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI51"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI51"].s2_4;
      return UK_PROVINCES_META["UKI51"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI51"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI52": {
    nuts: "UKI52",
    name: "Barking & Dagenham and Havering",
    modernName: "Barking and Dagenham, Havering (Outer London - East and North East)",
    historicalName: "Barking & Dagenham and Havering (Essex / Ford Dagenham & Base Caccia RAF Hornchurch)",
    historicCounty: "Essex",
    country: "England",
    capital: "Dagenham / Romford",
    region: "London",
    keys: ["barking", "dagenham", "havering", "ford_dagenham", "hornchurch", "raf_hornchurch", "romford", "uki52"],
    s0_1: "Polo industriale automobilistico imperniato sul colossale stabilimento Ford di Dagenham (la più grande fabbrica d'automobili d'Europa, con propri moli sul Tamigi) e la base aerea di RAF Hornchurch.",
    s2_4: "Ford Dagenham adatta le proprie linee all'assemblaggio di trattori agricoli Fordson (essenziali per la produzione di cibo) e camion militari pesanti per l'esercito.",
    s5: "RAF Hornchurch diviene una stazione di settore vitale del Gruppo 11 del Fighter Command guidata da piloti leggendari come 'Sailor' Malan; Ford produce autocarri e motori marini.",
    s6: "Durante la Battaglia d'Inghilterra, RAF Hornchurch è in prima linea assoluta: gli Spitfire decollano continuamente per intercettare le ondate di bombardieri diretti su Londra.",
    s7: "Hornchurch e lo stabilimento Ford vengono bombardati ripetutamente dalla Luftwaffe; gli operai di Dagenham producono oltre 360.000 veicoli militari e barche da sbarco durante la guerra.",
    s8: "Ford Dagenham avvia la produzione in serie del motore aeronautico Rolls-Royce Merlin su licenza, confermando l'importanza cruciale del polo industriale dell'Essex fluviale.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI52"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI52"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI52"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI52"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI52"].s2_4;
      return UK_PROVINCES_META["UKI52"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI52"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI53": {
    nuts: "UKI53",
    name: "Redbridge and Waltham Forest",
    modernName: "Redbridge and Waltham Forest (Outer London - East and North East)",
    historicalName: "Redbridge and Waltham Forest (Essex / Lea Valley & Polveriera Royal Gunpowder Mills)",
    historicCounty: "Essex",
    country: "England",
    capital: "Ilford / Walthamstow",
    region: "London",
    keys: ["redbridge", "waltham_forest", "ilford", "walthamstow", "royal_gunpowder_mills", "waltham_abbey", "uki53"],
    s0_1: "Distretti dell'Outer London nella valle del fiume Lea, celebri per i bacini idrici della capitale, l'industria fotografica Ilford Photo e la vicina storica polveriera di Waltham Abbey.",
    s2_4: "Le Royal Gunpowder Mills di Waltham Abbey si preparano a produrre esplosivi ad altissimo potenziale (cordite e il nuovo esplosivo segreto RDX) per bombe aeronautiche.",
    s5: "Ilford Photo converte la produzione alla pellicola speciale per ricognizione aerea fotografica della RAF (PRU - Photographic Reconnaissance Unit) per mappare le posizioni nemiche.",
    s6: "Waltham Abbey avvia la prima produzione al mondo del potente esplosivo RDX; serbatoi idrici del Lea Valley protetti da cortine di fumo contro attacchi aerei.",
    s7: "Raid aerei notturni su Ilford e Walthamstow provocano gravi danni civili; gli scienziati delle Gunpowder Mills lavorano sotto stretta segretezza per potenziare le testate dei siluri.",
    s8: "Fornitura essenziale di pellicole per i voli di ricognizione degli Spitfire della PRU che fotografano le basi navali tedesche di Brest e le rotte della corazzata Bismarck.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI53"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI53"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI53"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI53"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI53"].s2_4;
      return UK_PROVINCES_META["UKI53"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI53"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI54": {
    nuts: "UKI54",
    name: "Enfield",
    modernName: "Enfield (Outer London - East and North East, Greater London)",
    historicalName: "Enfield (Middlesex / Royal Small Arms Factory Enfield Lock & Fucili Bren)",
    historicCounty: "Middlesex",
    country: "England",
    capital: "Enfield",
    region: "London",
    keys: ["enfield", "royal_small_arms_factory", "enfield_lock", "lee_enfield", "bren_gun", "sten_gun", "uki54"],
    s0_1: "Sede della leggendaria Royal Small Arms Factory (RSAF Enfield ad Enfield Lock), la manifattura statale che ha armato l'esercito britannico fin dalle guerre napoleoniche.",
    s2_4: "RSAF Enfield adatta il progetto cecoslovacco ZB vz. 26 per produrre il celeberrimo fucile mitragliatore d'ordinanza Bren (Brno + Enfield) calibro .303 British.",
    s5: "Enfield produce centinaia di migliaia di fucili d'ordinanza Short Magazine Lee-Enfield (SMLE Mk III e No. 4 Mk I) e mitragliatrici leggere Bren indispensabili per la BEF.",
    s6: "Perdite gravissime di armi a Dunkerque: gli operai di Enfield lavorano 84 ore alla settimana per riarmare ogni singolo battaglione della British Army e della Home Guard.",
    s7: "All'inizio del 1941, Enfield progetta e produce il mitra a basso costo Sten Gun (Shepherd, Turpin + Enfield), arma rivoluzionaria in lamiera stampata per la Resistenza europea.",
    s8: "Enfield Lock sforna decine di migliaia di fucili No. 4, mitragliatrici Bren e pistole mitragliatrici Sten al mese, risultando la principale armeria portatile della libertà alleata.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI54"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI54"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI54"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI54"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI54"].s2_4;
      return UK_PROVINCES_META["UKI54"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI54"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI61": {
    nuts: "UKI61",
    name: "Bromley",
    modernName: "Bromley (Outer London - South, Greater London)",
    historicalName: "Bromley (Kent / Base Caccia RAF Biggin Hill Il Cuore della Battaglia d'Inghilterra)",
    historicCounty: "Kent",
    country: "England",
    capital: "Bromley",
    region: "London",
    keys: ["bromley", "biggin_hill", "raf_biggin_hill", "orpington", "chislehurst_caves", "uki61"],
    s0_1: "Distretto a sud-est di Londra celebre per le storiche Chislehurst Caves scavate nel gesso e l'aerodromo militare di RAF Biggin Hill arroccato sulle colline del Kent.",
    s2_4: "RAF Biggin Hill viene designata stazione di settore principale del No. 11 Group Fighter Command a protezione dei corridoi aerei di accesso alla capitale da sud.",
    s5: "Chislehurst Caves vengono allestite come immenso rifugio sotterraneo sicuro per oltre 15.000 civili, dotato di ospedale, cappella e mensa; Biggin Hill schiera squadroni di Spitfire.",
    s6: "Agosto-settembre 1940: RAF Biggin Hill è l'epicentro della Battaglia d'Inghilterra. Bersagliata da 12 bombardamenti pesanti in pochi giorni, perde hangar e comandi, ma i suoi Spitfire continuano a decollare.",
    s7: "I piloti di Biggin Hill (guidati da 'Sailor' Malan e Brian Kingcome) abbattono oltre 1.000 aerei nemici durante la guerra, divenendo la base caccia più celebre della storia della RAF.",
    s8: "Biggin Hill riceve i nuovi Spitfire Mk V e guida le offensive di scorta ai bombardieri sul continente; Chislehurst Caves accoglie decine di migliaia di londinesi sfollati dal Blitz.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI61"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI61"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI61"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI61"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI61"].s2_4;
      return UK_PROVINCES_META["UKI61"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI61"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI62": {
    nuts: "UKI62",
    name: "Croydon",
    modernName: "Croydon (Outer London - South, Greater London)",
    historicalName: "Croydon (Surrey / Aeroporto Internazionale di Croydon & RAF Fighter Command)",
    historicCounty: "Surrey",
    country: "England",
    capital: "Croydon",
    region: "London",
    keys: ["croydon", "croydon_airport", "raf_croydon", "purley", "kenley", "uki62"],
    s0_1: "Capitale dell'aviazione civile britannica interbellica con l'avveniristico Croydon Airport (terminal di Imperial Airways per i voli verso l'Impero) e la vicina base di RAF Kenley.",
    s2_4: "Piani di rapida conversione militare di Croydon Airport e installazione di difese antiaeree per proteggere le officine di manutenzione e gli hangar d'aviazione.",
    s5: "L'aeroporto civile di Croydon viene chiuso al traffico commerciale e trasformato in base da caccia militare della RAF (RAF Croydon) a fianco di Kenley nel Gruppo 11.",
    s6: "15 agosto 1940 (Der Adlerangriff): la Luftwaffe attacca in picchiata Croydon Airport con cacciabombardieri Bf 110, distruggendo fabbriche aeronautiche e uccidendo 62 persone.",
    s7: "Squadroni di Hurricane di Croydon e Kenley abbattono decine di bombardieri tedeschi durante le incursioni sul sud di Londra; officine al lavoro per riparare fusoliere caccia.",
    s8: "Croydon diviene snodo fondamentale per voli di trasporto militare e collegamenti VIP segreti con l'estero, mentre Kenley mantiene la prontezza d'allarme caccia.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI62"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI62"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI62"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI62"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI62"].s2_4;
      return UK_PROVINCES_META["UKI62"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI62"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI63": {
    nuts: "UKI63",
    name: "Merton, Kingston upon Thames and Sutton",
    modernName: "Merton, Kingston upon Thames, Sutton (Outer London - South)",
    historicalName: "Merton, Kingston and Sutton (Surrey / Kingston Hawker Aircraft Culla dell'Hurricane)",
    historicCounty: "Surrey",
    country: "England",
    capital: "Kingston upon Thames",
    region: "London",
    keys: ["kingston", "kingston_upon_thames", "merton", "sutton", "hawker_aircraft", "sydney_camm", "hurricane_factory", "wimbledon", "uki63"],
    s0_1: "Sobborghi lungo il Tamigi sede della leggendaria fabbrica della Hawker Aircraft a Canbury Park Road a Kingston upon Thames, dove il capo-progettista Sir Sydney Camm crea i suoi capolavori.",
    s2_4: "Hawker avvia la produzione in grande serie del caccia monoplano ad ala bassa Hawker Hurricane, il velivolo moderno che costituirà la spina dorsale della Royal Air Force.",
    s5: "Kingston lavora a ritmi vertiginosi producendo Hurricane con motori Rolls-Royce Merlin; Sydney Camm progetta il futuro cacciabombardiere pesante Hawker Typhoon.",
    s6: "Durante la Battaglia d'Inghilterra, l'Hawker Hurricane di Kingston abbatte il 60% di tutti gli aerei tedeschi distrutti dalla RAF, risultando il vero salvatore della Gran Bretagna.",
    s7: "La Luftwaffe bombarda Kingston nel tentativo di colpire gli stabilimenti Hawker; la produzione viene prontamente dispersa in decine di garage e officine segrete della zona.",
    s8: "La dispersione produttiva consente a Hawker di continuare a consegnare Hurricane operativi e testare i prototipi del Typhoon per missioni d'attacco al suolo.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI63"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI63"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI63"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI63"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI63"].s2_4;
      return UK_PROVINCES_META["UKI63"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI63"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI71": {
    nuts: "UKI71",
    name: "Barnet",
    modernName: "Barnet (Outer London - West and North West, Greater London)",
    historicalName: "Barnet (Hertfordshire & Middlesex / Bentley Priory Quartier Generale Fighter Command)",
    historicCounty: "Middlesex / Hertfordshire",
    country: "England",
    capital: "Barnet / Stanmore",
    region: "London",
    keys: ["barnet", "bentley_priory", "dowding", "fighter_command_hq", "stanmore", "hendon", "uki71"],
    s0_1: "Distretto a nord di Londra sede della storica dimora di Bentley Priory a Stanmore, scelta nel 1936 dall'Air Chief Marshal Sir Hugh Dowding come quartier generale del RAF Fighter Command.",
    s2_4: "Dowding crea a Bentley Priory il 'Dowding System', il primo sistema integrato di difesa aerea al mondo che unisce radar Chain Home, Royal Observer Corps e caccia via radio.",
    s5: "La Filter Room sotterranea di Bentley Priory diviene il cervello informatico della Gran Bretagna: qui convergono tutte le segnalazioni radar per tracciare le formazioni nemiche.",
    s6: "Estate 1940: da Bentley Priory Sir Hugh Dowding e Keith Park dirigono minuto per minuto la Battaglia d'Inghilterra, muovendo le pedine dei caccia sui grandi tavoli cartografici.",
    s7: "Bentley Priory coordina le intercettazioni della caccia notturna e dei primi caccia dotati di radar di bordo AI contro le ondate del Blitz tedesco; Barnet accoglie sfollati.",
    s8: "La vittoria aerea conquistata a Bentley Priory vanifica per sempre l'Operazione Seelöwe (invasione tedesca della Gran Bretagna), salvando l'Impero Britannico dalla capitolazione.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI71"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI71"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI71"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI71"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI71"].s2_4;
      return UK_PROVINCES_META["UKI71"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI71"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI72": {
    nuts: "UKI72",
    name: "Brent",
    modernName: "Brent (Outer London - West and North West, Greater London)",
    historicalName: "Brent (Middlesex / Park Royal Arsenale Industriale & Wembley)",
    historicCounty: "Middlesex",
    country: "England",
    capital: "Wembley / Willesden",
    region: "London",
    keys: ["brent", "wembley", "park_royal", "willesden", "guinness_park_royal", "uki72"],
    s0_1: "Grande concentrazione industriale a nord-ovest di Londra: il colossale parco industriale di Park Royal (oltre 400 stabilimenti meccanici ed elettrici), Wembley Stadium e il birrificio Guinness.",
    s2_4: "Park Royal converte centinaia di officine alla fabbricazione di componenti d'armamento, munizioni, generatori portatili e apparati elettrici per le forze armate.",
    s5: "Wembley Stadium viene adibito a centro logistico militare e sede della protezione civile; Park Royal rifornisce l'industria aeronautica e corazzata di componentistica speciale.",
    s6: "Le officine di Brent riparano armi e veicoli recuperati a Dunkerque; mobilitazione di migliaia di operaie nella produzione di munizioni per la difesa metropolitana.",
    s7: "Nonostante le bombe cadute sulla rete ferroviaria di Willesden Junction e sul distretto industriale, l'incredibile diversificazione produttiva di Park Royal non si arresta mai.",
    s8: "Produzione in serie di componenti per motori a reazione, parti per radar navali e apparecchiature da sbarco anfibio in vista della futura offensiva.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI72"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI72"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI72"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI72"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI72"].s2_4;
      return UK_PROVINCES_META["UKI72"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI72"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI73": {
    nuts: "UKI73",
    name: "Ealing",
    modernName: "Ealing (Outer London - West and North West, Greater London)",
    historicalName: "Ealing (Middlesex / Ealing Studios Cinema di Guerra & Autocarri AEC Acton)",
    historicCounty: "Middlesex",
    country: "England",
    capital: "Ealing / Acton",
    region: "London",
    keys: ["ealing", "acton", "southall", "ealing_studios", "aec_trucks", "propaganda_films", "uki73"],
    s0_1: "Capitale del cinema britannico con gli storici Ealing Studios a Ealing Green; polo automobilistico industriale di Acton e Southall con gli stabilimenti AEC (Associated Equipment Company).",
    s2_4: "AEC avvia la fornitura su vasta scala del celebre autocarro militare pesante a trazione integrale AEC Matador (il trattore d'artiglieria standard della British Army).",
    s5: "Ealing Studios diviene l'avamposto culturale del Ministero dell'Informazione per la realizzazione di film patriottici, cinegiornali di guerra e documentari di propaganda.",
    s6: "AEC a Southall costruisce migliaia di trattori d'artiglieria Matador e carrozzerie per i carri armati Matilda; Acton è il principale distretto di meccanica fine per spolette.",
    s7: "Ealing Studios gira film immortali durante il Blitz (tra cui 'Went the Day Well?' e documentari sulle squadre di vigili del fuoco dell'AFS), esaltando la resilienza del popolo britannico.",
    s8: "AEC produce carri armati pesanti da fanteria e autoblindo pesanti da cannone; il cinema di Ealing proietta nel mondo l'immagine indomita della resistenza britannica.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI73"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI73"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI73"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI73"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI73"].s2_4;
      return UK_PROVINCES_META["UKI73"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI73"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI74": {
    nuts: "UKI74",
    name: "Harrow and Hillingdon",
    modernName: "Harrow and Hillingdon (Outer London - West and North West, Greater London)",
    historicalName: "Harrow and Hillingdon (Middlesex / Sala Bunker No. 11 Group RAF Uxbridge & RAF Northolt)",
    historicCounty: "Middlesex",
    country: "England",
    capital: "Uxbridge / Harrow",
    region: "London",
    keys: ["harrow", "hillingdon", "uxbridge", "raf_uxbridge", "battle_of_britain_bunker", "northolt", "raf_northolt", "303_squadron", "uki74"],
    s0_1: "Scuola storica di Harrow School e due basi aeronautiche supreme: la base caccia di RAF Northolt e RAF Hillingdon House a Uxbridge, quartier generale del No. 11 Group Fighter Command.",
    s2_4: "A Uxbridge viene scavato a 18 metri di profondità il 'Battle of Britain Bunker', la sala operativa sotterranea corazzata dove il vicemaresciallo Keith Park dirigerà la difesa aerea.",
    s5: "RAF Northolt schiera squadroni di caccia Hurricane; RAF Uxbridge testa i collegamenti telefonici segreti con le stazioni radar Chain Home e con Bentley Priory.",
    s6: "16 agosto 1940: Winston Churchill visita il bunker sotterraneo di Uxbridge durante il culmine dei combattimenti aerei; all'uscita pronuncia la storica frase: 'Mai nel campo degli umani conflitti così tanto fu dovuto da così tanti a così pochi'.",
    s7: "A RAF Northolt il celeberrimo 303 Polish Fighter Squadron abbatte il maggior numero di aerei tedeschi di qualsiasi altro squadrone alleato durante la Battaglia d'Inghilterra.",
    s8: "Il bunker di Uxbridge coordina la transizione della caccia britannica verso le missioni d'attacco offensive sui cieli della Manica e dell'Europa occupata.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI74"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI74"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI74"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI74"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI74"].s2_4;
      return UK_PROVINCES_META["UKI74"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI74"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKI75": {
    nuts: "UKI75",
    name: "Hounslow and Richmond upon Thames",
    modernName: "Hounslow and Richmond upon Thames (Outer London - West and North West)",
    historicalName: "Hounslow and Richmond upon Thames (Middlesex & Surrey / Hounslow Barracks & Giardini di Kew)",
    historicCounty: "Middlesex / Surrey",
    country: "England",
    capital: "Hounslow / Richmond",
    region: "London",
    keys: ["hounslow", "richmond", "hounslow_barracks", "kew_gardens", "twickenham", "feltham", "uki75"],
    s0_1: "Distretto lungo le anse del Tamigi con i giardini botanici reali di Kew Gardens, i parchi storici di Richmond, Twickenham (tempio del rugby) e le storiche Hounslow Barracks.",
    s2_4: "Hounslow Barracks diviene centro logistico primario per il concentramento di truppe e rifornimenti della divisione guardie metropolitane prima dell'imbarco verso la Francia.",
    s5: "Kew Gardens avvia ricerche botaniche segrete sulla gomma vegetale e sulle colture alimentari ad altissimo rendimento calorico per sostenere l'autarchia nutrizionale britannica.",
    s6: "Feltham ospita uno dei più grandi depositi di manutenzione e riparazione veicoli del British Army (Central Ordnance Depot Feltham); batterie contraeree schierate a Richmond Park.",
    s7: "Ponti sul Tamigi e snodi ferroviari di Richmond e Hounslow continuamente difesi dai raid della Luftwaffe; i giardini di Kew preservano semi e specie alimentari strategiche.",
    s8: "Feltham allestisce e revisiona migliaia di camion e autoblindo destinati alle forze del Commonwealth in Medio Oriente e Nord Africa.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKI75"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKI75"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKI75"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKI75"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKI75"].s2_4;
      return UK_PROVINCES_META["UKI75"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKI75"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ11": {
    nuts: "UKJ11",
    name: "Berkshire",
    modernName: "Berkshire (Reading, Slough, Windsor and Maidenhead, West Berkshire, Wokingham, Bracknell Forest)",
    historicalName: "Berkshire (Berkshire / Castello di Windsor Rifugio Reale & Slough Trading Estate)",
    historicCounty: "Berkshire",
    country: "England",
    capital: "Reading / Windsor",
    region: "South East",
    keys: ["berkshire", "windsor", "reading", "slough", "slough_trading_estate", "windsor_castle", "ukj11"],
    s0_1: "Contea reale sede del Castello di Windsor, della prestigiosa fabbrica di biscotti Huntley & Palmers a Reading e del pionieristico polo industriale di Slough Trading Estate.",
    s2_4: "Slough Trading Estate converte centinaia di stabilimenti leggeri alla produzione di parti d'aereo, filtri per maschere antigas e componentistica per veicoli militari.",
    s5: "Re Giorgio VI e la Regina Elisabetta scelgono di rimanere a Londra e ritirarsi la notte nelle segrete fortificate del Castello di Windsor con le giovani principesse Elisabetta e Margaret.",
    s6: "Huntley & Palmers a Reading converte le linee alla produzione di milioni di 'biscotti di ferro' d'ordinanza per le razioni d'emergenza dell'esercito e della marina.",
    s7: "Slough assembla aerei da caccia Hurricane in capannoni mimetizzati; Windsor subisce colpi di bombe cadute nel parco reale, ma la Famiglia Reale non abbandona l'Inghilterra.",
    s8: "Miles Aircraft a Woodley (Reading) produce centinaia di velivoli d'addestramento Miles Magister e Master per formare le nuove generazioni di piloti della RAF.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ11"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ11"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ11"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ11"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ11"].s2_4;
      return UK_PROVINCES_META["UKJ11"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ11"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ12": {
    nuts: "UKJ12",
    name: "Milton Keynes",
    modernName: "Milton Keynes (City of Milton Keynes, South East England)",
    historicalName: "Milton Keynes (Buckinghamshire / Bletchley Park Station X & Decifrazione di Enigma)",
    historicCounty: "Buckinghamshire",
    country: "England",
    capital: "Bletchley / Milton Keynes",
    region: "South East",
    keys: ["milton_keynes", "bletchley", "bletchley_park", "station_x", "alan_turing", "enigma", "ultra", "bombe", "ukj12"],
    s0_1: "Tenuta vittoriana isolata a Bletchley, scelta nell'agosto 1938 dall'ammiraglio Hugh Sinclair (capo dell'MI6) come sede segreta della Government Code and Cypher School (GC&CS).",
    s2_4: "I migliori matematici, linguisti e campioni di scacchi di Oxford e Cambridge (tra cui Alan Turing, Gordon Welchman, Dilly Knox) si insediano nelle baracche di legno ('Huts') di Bletchley Park.",
    s5: "Turing e Welchman progettano la macchina crittanalitica elettromeccanica 'Bombe' per decifrare i messaggi militari tedeschi codificati con la macchina Enigma.",
    s6: "Primavera-estate 1940: le 'Bombe' di Bletchley Park iniziano a decifrare regolarmente il traffico Enigma della Luftwaffe; nasce la fonte d'intelligence 'Ultra', il segreto più custodito della guerra.",
    s7: "Le decifrazioni di Ultra forniscono al governo Churchill informazioni in tempo reale sui piani di battaglia della Luftwaffe, sull'Operazione Seelöwe e sui movimenti navali nemici.",
    s8: "Bletchley Park decifra i codici della marina italiana consentendo all'ammiraglio Cunningham di trionfare nella battaglia di Capo Matapan (marzo 1941) e localizzare la corazzata Bismarck.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ12"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ12"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ12"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ12"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ12"].s2_4;
      return UK_PROVINCES_META["UKJ12"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ12"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ13": {
    nuts: "UKJ13",
    name: "Buckinghamshire CC",
    modernName: "Buckinghamshire (Aylesbury Vale, Wycombe, Chiltern, South Bucks)",
    historicalName: "Buckinghamshire CC (Buckinghamshire / Quartier Generale Bomber Command High Wycombe)",
    historicCounty: "Buckinghamshire",
    country: "England",
    capital: "Aylesbury / High Wycombe",
    region: "South East",
    keys: ["buckinghamshire_cc", "aylesbury", "high_wycombe", "bomber_command_hq", "walters_ash", "chequers", "ukj13"],
    s0_1: "Contea collinare delle Chilterns con Aylesbury, High Wycombe (capitale della mobilia e lavorazione del legno) e Chequers, la residenza di campagna ufficiale del Primo Ministro.",
    s2_4: "Costruzione a Walter's Ash nei boschi sopra High Wycombe del quartier generale sotterraneo segreto del RAF Bomber Command, scavato nella roccia calcarea.",
    s5: "Chequers diviene il rifugio del fine settimana di Winston Churchill, dove il Primo Ministro riceve ministri, generali e inviati speciali del presidente Roosevelt.",
    s6: "L'industria del mobile di High Wycombe converte le proprie straordinarie capacità nella falegnameria d'alta precisione alla costruzione delle ali e fusoliere in legno del de Havilland Mosquito.",
    s7: "Dal bunker sotterraneo di High Wycombe, i comandanti del Bomber Command pianificano le prime offensive aeree notturne sul cuore industriale della Germania.",
    s8: "High Wycombe coordina l'espansione della flotta di bombardieri pesanti quadrimotore, confermandosi centro nevralgico della dottrina aerea strategica britannica.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ13"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ13"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ13"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ13"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ13"].s2_4;
      return UK_PROVINCES_META["UKJ13"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ13"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ14": {
    nuts: "UKJ14",
    name: "Oxfordshire",
    modernName: "Oxfordshire (Oxford, Cherwell, Vale of White Horse, South Oxfordshire, West Oxfordshire)",
    historicalName: "Oxfordshire (Oxfordshire / Oxford Morris Motors Cowley & Laminatoi d'Alluminio Banbury)",
    historicCounty: "Oxfordshire",
    country: "England",
    capital: "Oxford",
    region: "South East",
    keys: ["oxfordshire", "oxford", "cowley", "morris_motors", "banbury", "northern_aluminium", "penicillin", "ukj14"],
    s0_1: "La celebre città universitaria dalle 'guglie sognanti' e il colosso industriale automobilistico di Morris Motors a Cowley (fondato da Lord Nuffield); laminatoi d'alluminio a Banbury.",
    s2_4: "Northern Aluminium a Banbury produce la quasi totalità delle leghe leggere d'alluminio per le fusoliere e ali dei caccia Spitfire e Hurricane; Cowley si prepara al riarmo.",
    s5: "Morris Motors a Cowley diviene la Civilian Repair Organisation (CRO): riparazione rapida di migliaia di aerei caccia danneggiati in combattimento per rimetterli subito in volo.",
    s6: "Lord Nuffield converte Cowley alla produzione di barchini da sbarco, bombe e carri armati Cruiser; scienziati dell'Università di Oxford (Florey e Chain) purificano la penicillina salvavita.",
    s7: "Cowley ripara fino a 200 aerei a settimana durante la Battaglia d'Inghilterra; la città storica di Oxford viene risparmiata dai bombardamenti secondo presunti piani di Hitler.",
    s8: "La prima sperimentazione clinica della penicillina su pazienti umani all'Ospedale Radcliffe di Oxford nel febbraio 1941 apre la strada al farmaco miracoloso per le forze armate alleate.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ14"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ14"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ14"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ14"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ14"].s2_4;
      return UK_PROVINCES_META["UKJ14"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ14"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ21": {
    nuts: "UKJ21",
    name: "Brighton and Hove",
    modernName: "Brighton and Hove (South East England)",
    historicalName: "Brighton and Hove (East Sussex / Costa della Manica, Barricate Anti-Sbarco & Ospedali)",
    historicCounty: "Sussex (East Sussex)",
    country: "England",
    capital: "Brighton",
    region: "South East",
    keys: ["brighton", "hove", "brighton_and_hove", "sussex_coast", "brighton_pier", "ukj21"],
    s0_1: "La più celebre città balneare del Sussex con il Royal Pavilion, i suoi grandi moli (Brighton Palace Pier e West Pier) e alberghi sul lungomare amati dai villeggianti londinesi.",
    s2_4: "Piani di requisizione degli hotel per ospedali d'emergenza e alloggiamento di reparti dell'esercito; scavo di trincee e allestimento di posti d'osservazione costiera.",
    s5: "Le famose spiagge di Brighton vengono sbarrate al pubblico: stesa di chilometri di filo spinato, mine terrestri e sbarramenti anticarro in cemento lungo il litorale.",
    s6: "I moli di Brighton vengono parzialmente demoliti per impedire che la Wehrmacht possa utilizzarli come pontili di sbarco anfibio; allerta costante d'invasione nemica.",
    s7: "Frequenti incursioni aeree 'tip-and-run' di cacciabombardieri tedeschi Messerschmitt Bf 109 a volo radente che sganciano bombe sul lungomare prima di rientrare in Francia.",
    s8: "Brighton diviene una fortezza costiera della Home Guard e accoglie migliaia di convalescenti militari curati nelle strutture sanitarie del Sussex.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ21"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ21"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ21"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ21"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ21"].s2_4;
      return UK_PROVINCES_META["UKJ21"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ21"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ22": {
    nuts: "UKJ22",
    name: "East Sussex CC",
    modernName: "East Sussex (Hastings, Lewes, Eastbourne, Rother, Wealden)",
    historicalName: "East Sussex CC (East Sussex / Hastings, Radar Pevensey & Scogliere della Manica)",
    historicCounty: "Sussex (East Sussex)",
    country: "England",
    capital: "Lewes / Hastings",
    region: "South East",
    keys: ["east_sussex_cc", "hastings", "eastbourne", "pevensey", "lewes", "beachy_head", "chain_home_pevensey", "ukj22"],
    s0_1: "Contea costiera storica del millenario sbarco normanno del 1066 a Hastings, con le spettacolari scogliere bianche di Beachy Head e il castello medievale di Lewes.",
    s2_4: "Costruzione della stazione radar Chain Home a Pevensey (vicino al castello romano), pilastro essenziale per la rilevazione dei velivoli provenienti dalla Francia.",
    s5: "La costa dell'East Sussex diviene una prima linea fortificata con pillbox, cavalli di Frisia e campi minati; Pevensey radar sorveglia il traffico della Manica.",
    s6: "Durante la Battaglia d'Inghilterra, i cieli dell'East Sussex sono teatro quotidiano di duelli aerei furiosi tra Spitfire e Messerschmitt; Beachy Head è il punto di riferimento dei piloti.",
    s7: "Hastings ed Eastbourne subiscono dozzine di attacchi aerei a bassa quota da parte della Luftwaffe; il radar di Pevensey guida i caccia notturni della RAF.",
    s8: "Mantenimento del dispositivo difensivo costiero e addestramento delle nuove unità Commandos per incursioni lampo di ricognizione sulle spiagge della Francia occupata.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ22"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ22"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ22"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ22"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ22"].s2_4;
      return UK_PROVINCES_META["UKJ22"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ22"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ25": {
    nuts: "UKJ25",
    name: "West Surrey",
    modernName: "West Surrey (Guildford, Woking, Waverley, Surrey Heath, Runnymede)",
    historicalName: "West Surrey (Surrey / Vickers Brooklands Aeronautica & Weybridge)",
    historicCounty: "Surrey",
    country: "England",
    capital: "Guildford",
    region: "South East",
    keys: ["west_surrey", "guildford", "woking", "brooklands", "vickers_armstrongs", "weybridge", "wellington_bomber", "ukj25"],
    s0_1: "Culla mondiale dell'automobilismo sportivo e dell'aviazione a Brooklands (Weybridge), sede dei colossali stabilimenti della Vickers-Armstrongs e della Hawker Aircraft.",
    s2_4: "Barnes Wallis a Brooklands progetta l'avveniristico bombardiere bimotore con struttura geodetica Vickers Wellington, straordinariamente resistente ai danni in combattimento.",
    s5: "Brooklands avvia la produzione in grande serie del bombardiere Wellington; la famosa pista ovale in cemento viene mimetizzata con alberi finti e reti per celare gli hangar.",
    s6: "Il 4 settembre 1940 la Luftwaffe bombarda Brooklands causando 88 morti, ma la produzione geodetica dei Wellington viene dispersa in decine di siti ausiliari nel Surrey.",
    s7: "I bombardieri Wellington di Brooklands compiono la maggioranza delle prime missioni notturne di bombardamento strategico sulla Germania e sul porto di Amburgo.",
    s8: "Barnes Wallis avvia gli studi pionieristici sulle bombe penetranti da terremoto (Tallboy e Grand Slam) e sulla futura bomba rimbalzante per distruggere le dighe della Ruhr.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ25"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ25"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ25"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ25"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ25"].s2_4;
      return UK_PROVINCES_META["UKJ25"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ25"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ26": {
    nuts: "UKJ26",
    name: "East Surrey",
    modernName: "East Surrey (Reigate and Banstead, Tandridge, Epsom and Ewell, Mole Valley)",
    historicalName: "East Surrey (Surrey / North Downs GHQ Stop Line & Basi Segrete SOE)",
    historicCounty: "Surrey",
    country: "England",
    capital: "Reigate",
    region: "South East",
    keys: ["east_surrey", "reigate", "tandridge", "ghq_stop_line", "north_downs", "mole_valley", "ukj26"],
    s0_1: "Paesaggio collinare delle North Downs e storiche città mercato; la valle del Mole e crinali naturali a guardia degli accessi meridionali alla metropoli di Londra.",
    s2_4: "Il generale Sir Edmund Ironside progetta la GHQ Stop Line (la più fortificata linea difensiva anticarro d'Inghilterra) che corre proprio lungo le North Downs nell'East Surrey.",
    s5: "Scavo di fossati anticarro profondi, collocazione di migliaia di 'denti di drago' in cemento e casematte pillbox per fermare le divisioni corazzate Panzer in caso di sbarco.",
    s6: "Reigate diviene il quartier generale del South Eastern Command dell'esercito; ville isolate delle colline ospitano le prime scuole di addestramento del SOE per agenti segreti.",
    s7: "La Home Guard del Surrey presidia le colline e i boschi; l'artiglieria antiaerea schierata sui crinali abbatte incursori tedeschi diretti verso la capitale.",
    s8: "La GHQ Stop Line rimane il baluardo inespugnabile della difesa britannica, mentre le basi segrete del Surrey addestrano agenti da paracadutare nella Resistenza francese.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ26"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ26"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ26"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ26"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ26"].s2_4;
      return UK_PROVINCES_META["UKJ26"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ26"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ27": {
    nuts: "UKJ27",
    name: "West Sussex (South West)",
    modernName: "West Sussex South West (Chichester, Arun, Bognor Regis)",
    historicalName: "West Sussex SW (Sussex / Base Caccia RAF Tangmere & Chichester Cattedrale)",
    historicCounty: "Sussex (West Sussex)",
    country: "England",
    capital: "Chichester",
    region: "South East",
    keys: ["west_sussex_sw", "chichester", "arun", "tangmere", "raf_tangmere", "bognor_regis", "bader", "ukj27"],
    s0_1: "Città cattedrale romana di Chichester e la stazione caccia di RAF Tangmere, una delle più prestigiose basi della Royal Air Force per piloti da caccia interbellici.",
    s2_4: "RAF Tangmere viene promossa stazione di settore del No. 11 Group, con squadroni di Spitfire e Hurricane pronti all'intercettazione rapida sul canale della Manica.",
    s5: "Tangmere entra in allerta permanente: intercettazione dei ricognitori tedeschi e scorta dei convogli navali costieri; Bognor Regis prepara difese balneari anti-sbarco.",
    s6: "16 agosto 1940: RAF Tangmere viene devastata da bombardieri in picchiata Stuka della Luftwaffe, ma il leggendario asso senza gambe Douglas Bader guida la riscossa dei caccia.",
    s7: "Tangmere ospita il No. 161 Squadron speciale per missioni clandestine del SOE: decollo notturno di piccoli aerei Westland Lysander per portare agenti segreti nei campi francesi.",
    s8: "Tangmere diviene la base di decollo primaria per le offensive aeree su vasta scala della RAF contro le installazioni tedesche sulle coste della Manica occupata.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ27"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ27"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ27"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ27"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ27"].s2_4;
      return UK_PROVINCES_META["UKJ27"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ27"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ28": {
    nuts: "UKJ28",
    name: "West Sussex (North East)",
    modernName: "West Sussex North East (Crawley, Horsham, Mid Sussex)",
    historicalName: "West Sussex NE (Sussex / Horsham, Crawley & Aeroporto di Gatwick)",
    historicCounty: "Sussex (West Sussex)",
    country: "England",
    capital: "Horsham / Crawley",
    region: "South East",
    keys: ["west_sussex_ne", "horsham", "crawley", "gatwick", "raf_gatwick", "mid_sussex", "ukj28"],
    s0_1: "Campagna rurale del Weald dominata da storiche cittadine mercantili e dal pionieristico aeroporto civile circolare di Gatwick (aperto nel 1936 con la sua 'Martello Tower').",
    s2_4: "L'aeroporto di Gatwick viene requisito dal Ministero dell'Aria e convertito in base militare (RAF Gatwick) per riparazione caccia e addestramento notturno.",
    s5: "RAF Gatwick ospita squadroni di caccia dell'esercito e centri per la manutenzione e collaudo urgente di motori aeronautici; arrivo di sfollati da Londra sud.",
    s6: "La Home Guard di Horsham presidia le linee ferroviarie strategiche che collegano Londra con la costa; allestimento di postazioni acustiche d'avvistamento aereo.",
    s7: "Gatwick funge da pista di atterraggio d'emergenza per i bombardieri della RAF danneggiati che rientrano con i serbatoi forati dalle missioni sul continente.",
    s8: "Espansione delle officine di riparazione aerea di Gatwick e Horsham a sostegno del Fighter Command e dei reparti corazzati canadesi alloggiati nel Sussex.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ28"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ28"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ28"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ28"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ28"].s2_4;
      return UK_PROVINCES_META["UKJ28"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ28"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ31": {
    nuts: "UKJ31",
    name: "Portsmouth",
    modernName: "Portsmouth (City of Portsmouth, South East England)",
    historicalName: "Portsmouth (Hampshire / HMNB Portsmouth Arsenale Navale Reale & HMS Victory)",
    historicCounty: "Hampshire",
    country: "England",
    capital: "Portsmouth",
    region: "South East",
    keys: ["portsmouth", "hmnb_portsmouth", "hms_victory", "royal_navy_dockyard", "portsmouth_blitz", "whale_island", "ukj31"],
    s0_1: "La culla navale della Royal Navy: HMNB Portsmouth (il più antico e glorioso arsenale navale britannico), la nave ammiraglia di Nelson HMS Victory e la scuola di tiro di Whale Island.",
    s2_4: "Arsenale di Portsmouth al lavoro per completare corazzate, incrociatori e cacciatorpediniere; scavo di rifugi antiaerei profondi nelle gallerie di Portsdown Hill.",
    s5: "Portsmouth diviene il quartier generale operativo del Commander-in-Chief Portsmouth (ammiraglio Sir William James) e base di partenza principale delle flotte della Manica.",
    s6: "Maggio-giugno 1940: Portsmouth coordina le flottiglie di cacciatorpediniere e le Little Ships per l'Operazione Dynamo a Dunkerque; accoglienza di decine di migliaia di truppe ferite.",
    s7: "Il tragico Portsmouth Blitz (luglio 1940 - aprile 1941): la Luftwaffe bombarda a tappeto la base navale e la città storica, distruggendo la Guildhall e causando oltre 900 morti civili.",
    s8: "Nonostante le rovine fumanti, l'arsenale navale non interrompe mai le riparazioni delle navi da guerra e l'equipaggiamento di scorte vitali per la flotta atlantica.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ31"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ31"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ31"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ31"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ31"].s2_4;
      return UK_PROVINCES_META["UKJ31"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ31"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ32": {
    nuts: "UKJ32",
    name: "Southampton",
    modernName: "Southampton (City of Southampton, South East England)",
    historicalName: "Southampton (Hampshire / Supermarine Spitfire Woolston & Docks Transatlantici)",
    historicCounty: "Hampshire",
    country: "England",
    capital: "Southampton",
    region: "South East",
    keys: ["southampton", "supermarine", "spitfire", "rj_mitchell", "woolston", "southampton_docks", "southampton_blitz", "ukj32"],
    s0_1: "Il principale porto transatlantico britannico dei grandi transatlantici (Queen Mary) e culla del Supermarine Spitfire, progettato a Woolston da R.J. Mitchell con il primo volo nel marzo 1936.",
    s2_4: "Lo stabilimento Supermarine di Woolston avvia la produzione in serie del leggendario Spitfire; i Southampton Docks si preparano a movimentare milioni di tonnellate d'armamento.",
    s5: "Southampton diviene il porto d'imbarco primario n. 1 della British Expeditionary Force: oltre 800.000 soldati e 140.000 veicoli salpano da qui verso la Francia senza perdite.",
    s6: "I caccia Spitfire nati a Southampton salvano la Gran Bretagna nei cieli della Manica; accoglienza drammatica dei reduci evacuati da Dunkerque e Saint-Malo.",
    s7: "Settembre 1940: la Luftwaffe bombarda e distrugge la fabbrica Supermarine di Woolston uccidendo oltre 100 operai; la produzione dello Spitfire viene prontamente dispersa in laboratori e garage segreti.",
    s8: "Il terrificante Southampton Blitz del 23 e 30 novembre 1940 rade al suolo il centro storico; la dispersione industriale assicura tuttavia il continuo flusso di Spitfire per la RAF.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ32"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ32"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ32"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ32"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ32"].s2_4;
      return UK_PROVINCES_META["UKJ32"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ32"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ34": {
    nuts: "UKJ34",
    name: "Isle of Wight",
    modernName: "Isle of Wight (South East England)",
    historicalName: "Isle of Wight (Hampshire / Stazione Radar Ventnor & Cantieri Navali J. Samuel White Cowes)",
    historicCounty: "Hampshire (Isle of Wight)",
    country: "England",
    capital: "Newport / Cowes",
    region: "South East",
    keys: ["isle_of_wight", "ventnor", "chain_home_ventnor", "cowes", "j_samuel_white", "the_needles", "ukj34"],
    s0_1: "Isola strategica all'imbocco del Solent con i famosi faraglioni The Needles, i cantieri navali d'avanguardia J. Samuel White a Cowes e l'avveniristica stazione radar di Ventnor.",
    s2_4: "La stazione radar Chain Home di Ventnor (alta 240 metri su St Boniface Down) diviene l'occhio elettronico più avanzato dell'Impero a guardia di tutta la Manica centrale.",
    s5: "J. Samuel White a Cowes costruisce a ciclo continuo cacciatorpediniere per la Royal Navy (classe Hunt) e motosiluranti veloci; l'isola viene dichiarata zona militare protetta.",
    s6: "12 agosto 1940: la Luftwaffe attacca in picchiata con bombardieri Ju 87 Stuka la stazione radar di Ventnor distruggendola parzialmente; gli inglesi riattivano i segnali radio in segreto.",
    s7: "I cantieri di Cowes subiscono attacchi aerei mentre varano cacciatorpediniere e dragamine; la guarnigione costiera dell'isola si prepara a respingere sbarchi tedeschi.",
    s8: "Cowes ripara e consegna cacciatorpediniere classe Hunt per le missioni di scorta ai convogli nell'Atlantico e nel Mediterraneo; Ventnor guida i caccia notturni della RAF.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ34"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ34"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ34"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ34"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ34"].s2_4;
      return UK_PROVINCES_META["UKJ34"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ34"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ35": {
    nuts: "UKJ35",
    name: "South Hampshire",
    modernName: "South Hampshire (Fareham, Gosport, Havant, East Hampshire)",
    historicalName: "South Hampshire (Hampshire / Base Sommergibili HMS Dolphin Gosport & Priddy's Hard)",
    historicCounty: "Hampshire",
    country: "England",
    capital: "Gosport / Fareham",
    region: "South East",
    keys: ["south_hampshire", "gosport", "fareham", "hms_dolphin", "priddys_hard", "havant", "ukj35"],
    s0_1: "Penisola e costa affacciate sul porto di Portsmouth: sede di Fort Blockhouse (HMS Dolphin), il leggendario quartier generale dei sommergibili della Royal Navy, e i depositi munizioni di Priddy's Hard.",
    s2_4: "HMS Dolphin addestra i migliori comandanti e sommergibilisti britannici; Priddy's Hard stocca centinaia di migliaia di granate navali e siluri pronti all'imbarco.",
    s5: "I sommergibili salpati da Gosport conducono audaci missioni di pattugliamento nel Mare del Nord e nelle acque della Norvegia contro le navi da guerra tedesche.",
    s6: "Gosport subisce violenti raid aerei mirati alla base sottomarina; allestimento di sbarramenti a palloni frenati e batterie contraeree a guardia di Portsdown Hill.",
    s7: "Gosport e Fareham duramente colpite durante il Blitz navale su Portsmouth; il personale di HMS Dolphin mantiene l'efficienza dei sommergibili in partenza per il Mediterraneo.",
    s8: "I sommergibili della Royal Navy salpati da Gosport infliggono colpi decisivi ai convogli dell'Asse che riforniscono le truppe di Rommel in Nord Africa.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ35"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ35"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ35"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ35"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ35"].s2_4;
      return UK_PROVINCES_META["UKJ35"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ35"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ36": {
    nuts: "UKJ36",
    name: "Central Hampshire",
    modernName: "Central Hampshire (City of Winchester, Eastleigh, Test Valley)",
    historicalName: "Central Hampshire (Hampshire / Winchester Capitale Sassone & Aeroporto di Eastleigh)",
    historicCounty: "Hampshire",
    country: "England",
    capital: "Winchester",
    region: "South East",
    keys: ["central_hampshire", "winchester", "eastleigh", "test_valley", "green_jackets", "cattistock", "ukj36"],
    s0_1: "Antica capitale del Regno del Wessex con la magnifica cattedrale normanna di Winchester, la caserma storica dei Royal Green Jackets e l'aeroporto collaudi di Eastleigh.",
    s2_4: "5 marzo 1936: dall'aeroporto di Eastleigh decolla per il suo volo inaugurale il prototipo K5054 del caccia Supermarine Spitfire pilotato da 'Mutt' Summers; caserme ampliate.",
    s5: "Winchester diviene grande centro d'addestramento e smistamento reclute per i reggimenti di fanteria britannici; Eastleigh ripara e collauda aerei caccia della RAF.",
    s6: "Accoglienza di decine di migliaia di soldati esausti rientrati da Dunkerque; allestimento di ospedali militari d'emergenza nelle scuole e collegi storici di Winchester.",
    s7: "Eastleigh bersagliata dai bombardieri tedeschi per via delle officine ferroviarie e aeronautiche; Winchester preserva i suoi tesori d'arte medievale sotto stretta protezione.",
    s8: "Centro di comando territoriale per la riorganizzazione dell'esercito britannico e fornitura di rimpiazzi addestrati per i fronti oltremare.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ36"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ36"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ36"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ36"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ36"].s2_4;
      return UK_PROVINCES_META["UKJ36"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ36"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ37": {
    nuts: "UKJ37",
    name: "North Hampshire",
    modernName: "North Hampshire (Basingstoke and Deane, Rushmoor, Hart, Aldershot)",
    historicalName: "North Hampshire (Hampshire / Aldershot Capitale dell'Esercito Britannico & Farnborough)",
    historicCounty: "Hampshire",
    country: "England",
    capital: "Basingstoke / Aldershot",
    region: "South East",
    keys: ["north_hampshire", "aldershot", "home_of_the_army", "farnborough", "rae_farnborough", "basingstoke", "ukj37"],
    s0_1: "Il cuore militare terrestre dell'Impero: Aldershot ('Home of the British Army', il più immenso agglomerato di caserme del Regno) e il Royal Aircraft Establishment (RAE) a Farnborough.",
    s2_4: "RAE Farnborough è il centro scientifico supremo dell'aeronautica: gallerie del vento, sviluppo di eliche a passo variabile, ricerche sulle alte velocità e aerodinamica bellica.",
    s5: "Aldershot mobilita centinaia di migliaia di soldati della BEF; arrivo e alloggiamento delle prime divisioni del Corpo Canadese sotto il generale McNaughton.",
    s6: "Aldershot accoglie le truppe ricostituite dopo Dunkerque e forma le prime unità d'assalto scelte; RAE Farnborough collauda velivoli tedeschi catturati per carpirne i segreti.",
    s7: "Basingstoke ospita stabilimenti industriali meccanici (Thornycroft) per la produzione di trattori e camion militari; Farnborough sviluppa tute antigravità e nuovi carburanti.",
    s8: "Aldershot forma le prime brigate di paracadutisti britannici (Parachute Regiment) e divisioni aviotrasportate destinate a fare la storia nei teatri d'invasione.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ37"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ37"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ37"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ37"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ37"].s2_4;
      return UK_PROVINCES_META["UKJ37"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ37"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ41": {
    nuts: "UKJ41",
    name: "Medway",
    modernName: "Medway (Chatham, Rochester, Gillingham, South East England)",
    historicalName: "Medway (Kent / Arsenale Storico di Chatham & Idrovolanti Short Brothers Rochester)",
    historicCounty: "Kent",
    country: "England",
    capital: "Chatham / Rochester",
    region: "South East",
    keys: ["medway", "chatham", "rochester", "gillingham", "chatham_dockyard", "short_brothers", "sunderland", "stirling", "ukj41"],
    s0_1: "Valle industriale e marittima del fiume Medway con lo storico arsenale navale di Chatham Dockyard e gli avveniristici stabilimenti Short Brothers a Rochester sul fiume.",
    s2_4: "Short Brothers a Rochester progetta e costruisce il leggendario idrovolante quadrimotore da pattugliamento marittimo Short Sunderland ('The Flying Porcupine') e il bombardiere Short Stirling.",
    s5: "I colossali idrovolanti Sunderland di Rochester entrano in servizio con il Coastal Command dando la caccia agli U-Boot nell'Atlantico; Chatham Dockyard ripara cacciatorpediniere a ciclo continuo.",
    s6: "Estate 1940: gli stabilimenti Short di Rochester e l'arsenale di Chatham vengono bombardati pesantemente dalla Luftwaffe; la fabbrica Short disperde le linee per proteggere lo Stirling.",
    s7: "Chatham Dockyard compie oltre 1.300 riparazioni navali d'urgenza durante la guerra; Rochester consegna i primi bombardieri pesanti quadrimotore Short Stirling operativi per la RAF.",
    s8: "Gli idrovolanti Sunderland costruiti a Rochester salvano centinaia di equipaggi silurati nell'Atlantico e affondano sommergibili nemici a protezione dei convogli transoceanici.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ41"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ41"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ41"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ41"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ41"].s2_4;
      return UK_PROVINCES_META["UKJ41"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ41"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ43": {
    nuts: "UKJ43",
    name: "Kent Thames Gateway",
    modernName: "Kent Thames Gateway (Dartford, Gravesend, Gravesham, South East England)",
    historicalName: "Kent Thames Gateway (Kent / RAF Gravesend & Industria Farmaceutica Wellcome Dartford)",
    historicCounty: "Kent",
    country: "England",
    capital: "Dartford / Gravesend",
    region: "South East",
    keys: ["kent_thames_gateway", "dartford", "gravesend", "gravesham", "raf_gravesend", "wellcome", "ukj43"],
    s0_1: "Sponda meridionale dell'estuario del Tamigi con il porto di Gravesend, base caccia avanzata di RAF Gravesend e le grandi industrie chimico-farmaceutiche Wellcome a Dartford.",
    s2_4: "Burroughs Wellcome a Dartford prepara la produzione su vasta scala di sieri antitetanici, bende sterili e farmaci d'emergenza per la sanità militare dell'esercito.",
    s5: "RAF Gravesend ospita caccia Hurricane per la difesa della foce del Tamigi; Gravesend diviene stazione di controllo e pilotaggio per tutti i bastimenti mercantili diretti a Londra.",
    s6: "RAF Gravesend è in prima linea nella Battaglia d'Inghilterra: gli squadroni intercettano le formazioni di Heinkel e Dornier che risalgono il Tamigi; continui bombardamenti sull'aerodromo.",
    s7: "Dartford e Gravesend bersagliate da centinaia di bombe incendiarie ed esplosive cadute sul corridoio del Tamigi; Wellcome fornisce milioni di dosi di sulfamidici salvavita.",
    s8: "Rafforzamento dei forti marittimi dell'estuario e pattugliamenti navali contro le mine magnetiche e gli incursori della Kriegsmarine.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ43"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ43"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ43"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ43"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ43"].s2_4;
      return UK_PROVINCES_META["UKJ43"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ43"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ44": {
    nuts: "UKJ44",
    name: "East Kent",
    modernName: "East Kent (Dover, Folkestone, Canterbury, Thanet, Margate, Ramsgate)",
    historicalName: "East Kent (Kent / Dover Hellfire Corner, Operazione Dynamo & Castello di Dover)",
    historicCounty: "Kent",
    country: "England",
    capital: "Dover / Canterbury",
    region: "South East",
    keys: ["east_kent", "dover", "folkestone", "canterbury", "hellfire_corner", "dynamo", "ramsay", "manston", "white_cliffs", "ukj44"],
    s0_1: "La porta d'Europa: le candide scogliere di Dover (White Cliffs), il castello millenario, la cattedrale di Canterbury e i porti della Manica affacciati sulle coste francesi a sole 20 miglia.",
    s2_4: "Nelle gallerie sotterranee scavate nel gesso sotto il Castello di Dover, il viceammiraglio Sir Bertram Ramsay allestisce il quartier generale navale del Dover Command.",
    s5: "Dover è il punto di contatto più vicino al continente; apertura delle ostilità e stesura di sbarramenti difensivi e reti antisommergibile nello Stretto di Dover.",
    s6: "26 maggio - 4 giugno 1940: dalle gallerie di Dover, Ramsay dirige l'Operazione Dynamo, evacuando 338.226 soldati alleati da Dunkerque grazie alla flotta e alle 'Little Ships'.",
    s7: "Dover diviene 'Hellfire Corner': sotto il fuoco quotidiano dei colossali cannoni ferroviari tedeschi piazzati a Cap Gris-Nez e delle incursioni Stuka; basi RAF Manston e Hawkinge martoriate.",
    s8: "La popolazione di Dover vive per mesi nei rifugi sotterranei del gesso; Canterbury preserva la cattedrale, mentre i cannoni britannici rispondono colpo su colpo attraverso la Manica.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ44"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ44"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ44"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ44"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ44"].s2_4;
      return UK_PROVINCES_META["UKJ44"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ44"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ45": {
    nuts: "UKJ45",
    name: "Mid Kent",
    modernName: "Mid Kent (Maidstone, Ashford, Swale, Shepway)",
    historicalName: "Mid Kent (Kent / Giardino d'Inghilterra, Luppolo & Snodo Ferroviario Ashford)",
    historicCounty: "Kent",
    country: "England",
    capital: "Maidstone / Ashford",
    region: "South East",
    keys: ["mid_kent", "maidstone", "ashford", "garden_of_england", "hop_gardens", "ashford_works", "ukj45"],
    s0_1: "Il tradizionale 'Giardino d'Inghilterra': distese di frutteti, coltivazioni di luppolo con le tipiche case coniche da essiccazione (oast houses) e le officine ferroviarie di Ashford.",
    s2_4: "Piani di riconversione delle officine Southern Railway di Ashford per la riparazione urgente di materiale rotabile e la costruzione di carrelli per cannoni pesanti da costa.",
    s5: "Ashford diviene lo snodo ferroviario di smistamento principale per tutti i treni ospedale carichi di feriti provenienti dal fronte francese e dai porti della Manica.",
    s6: "I campi del Mid Kent sono testimoni di continui combattimenti aerei e cadute di caccia durante la Battaglia d'Inghilterra; la Home Guard cattura decine di piloti tedeschi paracadutati.",
    s7: "I contadini e le donne del Kent raccolgono il luppolo e la frutta sotto il fragore dei duelli aerei, fornendo approvvigionamenti essenziali per la popolazione razionata.",
    s8: "Ashford costruisce vagoni cisterna blindati e ripara le linee ferroviarie costantemente minacciate per mantenere i collegamenti vitali con il fronte di Dover.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ45"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ45"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ45"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ45"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ45"].s2_4;
      return UK_PROVINCES_META["UKJ45"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ45"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKJ46": {
    nuts: "UKJ46",
    name: "West Kent",
    modernName: "West Kent (Sevenoaks, Tonbridge and Malling, Tunbridge Wells)",
    historicalName: "West Kent (Kent / Chartwell Residenza di Churchill & Basi di West Malling)",
    historicCounty: "Kent",
    country: "England",
    capital: "Tunbridge Wells / Sevenoaks",
    region: "South East",
    keys: ["west_kent", "sevenoaks", "tonbridge", "tunbridge_wells", "chartwell", "churchill_home", "west_malling", "ukj46"],
    s0_1: "Paesaggio collinare del Weald sede di Chartwell (la celebre residenza di campagna di Winston Churchill vicino a Westerham) e la stazione caccia di RAF West Malling.",
    s2_4: "A Chartwell, negli anni '30 Churchill condusse la sua solitaria battaglia parlamentare per denunciare il riarmo della Germania nazista e sollecitare il riarmo aereo britannico.",
    s5: "Dopo la nomina di Churchill a Primo Ministro, Chartwell viene temporaneamente chiusa e mimetizzata per motivi di sicurezza; RAF West Malling entra in operatività caccia.",
    s6: "RAF West Malling viene pesantemente bombardata durante la Battaglia d'Inghilterra ma continua a far decollare squadroni di Hurricane; la Home Guard presidia i boschi.",
    s7: "West Malling diviene una delle stazioni leader nella caccia notturna guidata da radar di terra e di bordo, infliggendo severe perdite ai bombardieri del Blitz.",
    s8: "Le colline del West Kent fungono da bastione arretrato per la difesa della capitale e ospitano centri di telecomunicazione segreti per il comando della difesa aerea.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKJ46"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKJ46"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKJ46"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKJ46"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKJ46"].s2_4;
      return UK_PROVINCES_META["UKJ46"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKJ46"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKK11": {
    nuts: "UKK11",
    name: "Bristol, City of",
    modernName: "Bristol (City of Bristol, South West England)",
    historicalName: "Bristol (Gloucestershire / Bristol Aeroplane Company Filton, Avonmouth Docks & Blitz)",
    historicCounty: "Gloucestershire / Somerset",
    country: "England",
    capital: "Bristol",
    region: "South West",
    keys: ["bristol", "city_of_bristol", "filton", "bristol_aeroplane", "blenheim", "beaufighter", "avonmouth", "bristol_blitz", "ukk11"],
    s0_1: "Grande metropoli mercantile e industriale: il porto commerciale di Avonmouth Docks e i colossali stabilimenti della Bristol Aeroplane Company a Filton (motori radiali Mercury e Pegasus).",
    s2_4: "Bristol Aeroplane a Filton progetta e costruisce i bombardieri bimotore veloci Bristol Blenheim e avvia lo sviluppo del micidiale caccia pesante notturno Bristol Beaufighter.",
    s5: "I bombardieri Blenheim compiono le primissime sortite belliche offensive della RAF contro la flotta tedesca a Wilhelmshaven; Avonmouth gestisce milioni di barili di carburante.",
    s6: "Durante la Battaglia d'Inghilterra, il Beaufighter entra in servizio rivoluzionando la caccia notturna con il radar di bordo AI; Filton è la più grande fabbrica aeronautica del pianeta.",
    s7: "Il feroce Bristol Blitz (novembre 1940 - aprile 1941): la Luftwaffe bombarda il centro storico e le banchine per 6 grandi incursioni distruggendo chiese medievali e causando oltre 1.200 vittime.",
    s8: "La produzione dei motori aeronautici Bristol Hercules e dei caccia Beaufighter viene prontamente dispersa in cave sotterranee a Corsham, garantendo la continuità bellica.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKK11"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKK11"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKK11"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKK11"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKK11"].s2_4;
      return UK_PROVINCES_META["UKK11"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKK11"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKK12": {
    nuts: "UKK12",
    name: "Bath and North East Somerset, North Somerset and South Gloucestershire",
    modernName: "Bath and North East Somerset, North Somerset, South Gloucestershire",
    historicalName: "Bath and NE Somerset (Somerset & Gloucestershire / Bath Ammiragliato Evacuato & Corsham)",
    historicCounty: "Somerset / Gloucestershire",
    country: "England",
    capital: "Bath",
    region: "South West",
    keys: ["bath", "north_east_somerset", "north_somerset", "south_gloucestershire", "corsham", "admiralty_bath", "ukk12"],
    s0_1: "La splendida città georgiana di Bath (patrimonio d'architettura termale in pietra arenaria) e le vaste cave sotterranee di pietra di Corsham nelle colline vicine.",
    s2_4: "Piani segreti del governo per evacuare a Bath interi dipartimenti dell'Ammiragliato (oltre 10.000 funzionari) per sottrarli ai bombardamenti su Londra.",
    s5: "I dipartimenti dell'Ammiragliato si insediano a Bath (Foxhill e Lansdown); le immense cave sotterranee di Corsham vengono convertite nel deposito munizioni segreto CAD Monkton Farleigh.",
    s6: "Monkton Farleigh diviene il più grande deposito sotterraneo di munizioni al mondo; le cave di Corsham ospitano fabbriche protette di motori Rolls-Royce e Bristol.",
    s7: "Bath gestisce l'amministrazione navale della Royal Navy lontano dalle bombe della capitale; South Gloucestershire fornisce parti meccaniche per i cantieri di Bristol.",
    s8: "I depositi sotterranei di Corsham riforniscono in sicurezza milioni di granate e siluri per la flotta alleata impegnata nella Battaglia dell'Atlantico.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKK12"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKK12"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKK12"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKK12"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKK12"].s2_4;
      return UK_PROVINCES_META["UKK12"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKK12"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKK13": {
    nuts: "UKK13",
    name: "Gloucestershire",
    modernName: "Gloucestershire (Cheltenham, Gloucester, Stroud, Cotswolds, Forest of Dean, Tewkesbury)",
    historicalName: "Gloucestershire (Gloucestershire / Gloster Aircraft Hucclecote & Primo Aereo a Reazione E.28/39)",
    historicCounty: "Gloucestershire",
    country: "England",
    capital: "Gloucester",
    region: "South West",
    keys: ["gloucestershire", "gloucester", "cheltenham", "gloster_aircraft", "hucclecote", "gloster_e2839", "rotol", "forest_of_dean", "ukk13"],
    s0_1: "Contea delle colline Cotswolds, la storica cattedrale di Gloucester, le terme di Cheltenham e la Gloster Aircraft Company a Hucclecote (costruttrice del caccia biplano Gloster Gladiator).",
    s2_4: "Gloster Aircraft a Hucclecote converte le linee alla costruzione in grande serie di caccia Hawker Hurricane e viene scelta segretamente per costruire la prima cellula per la turbina Whittle.",
    s5: "Rotol a Gloucester (joint-venture Rolls-Royce e Bristol) produce eliche a passo variabile rivoluzionarie che trasformano le prestazioni dello Spitfire e Hurricane.",
    s6: "Hucclecote produce fino al 30% di tutti gli Hurricane della Battaglia d'Inghilterra; a Cheltenham si trasferiscono reparti dell'esercito e ministeri evacuati.",
    s7: "Costruzione nel massimo segreto dell'aereo sperimentale Gloster E.28/39 (Pioneer) per testare in volo il motore a reazione centrifugo di Frank Whittle.",
    s8: "15 maggio 1941: il Gloster E.28/39 compie il primo volo storico a reazione della Gran Bretagna a RAF Cranwell, inaugurando l'era dei caccia a reazione per la RAF.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKK13"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKK13"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKK13"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKK13"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKK13"].s2_4;
      return UK_PROVINCES_META["UKK13"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKK13"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKK14": {
    nuts: "UKK14",
    name: "Swindon",
    modernName: "Swindon (South West England)",
    historicalName: "Swindon (Wiltshire / Swindon Works GWR Officine Ferroviarie & Fabbrica Spitfire)",
    historicCounty: "Wiltshire",
    country: "England",
    capital: "Swindon",
    region: "South West",
    keys: ["swindon", "swindon_works", "gwr_swindon", "south_marston", "vickers_swindon", "ukk14"],
    s0_1: "La storica 'Railway Town' dominata dalle monumentali officine ferroviarie della Great Western Railway (GWR Swindon Works, tra le più grandi e moderne d'Europa).",
    s2_4: "Le officine Swindon Works si preparano a riconvertire macchinari pesanti alla tornitura di canne di cannone, carrozze blindate e parti per carri armati.",
    s5: "Swindon Works fabbrica parti per il ponte d'assalto Bailey, scocche per bombe aeree e treni ospedale; apertura della Shadow Factory di South Marston.",
    s6: "South Marston avvia la costruzione di fusoliere e l'assemblaggio di caccia d'addestramento Miles Master e pianifica la produzione dello Spitfire sotto Vickers-Armstrongs.",
    s7: "Le officine ferroviarie lavorano su turni di 24 ore riparando locomotive e vagoni merci essenziali per lo smistamento di carbone e rifornimenti atlantici.",
    s8: "La Shadow Factory di South Marston entra a pieno regime consegnando centinaia di caccia Supermarine Spitfire collaudati sulla pista annessa.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKK14"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKK14"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKK14"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKK14"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKK14"].s2_4;
      return UK_PROVINCES_META["UKK14"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKK14"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKK15": {
    nuts: "UKK15",
    name: "Wiltshire CC",
    modernName: "Wiltshire (Salisbury, Chippenham, Trowbridge, Devizes, Kennet)",
    historicalName: "Wiltshire CC (Wiltshire / Salisbury Plain Poligono Militare & Stonehenge)",
    historicCounty: "Wiltshire",
    country: "England",
    capital: "Trowbridge / Salisbury",
    region: "South West",
    keys: ["wiltshire_cc", "salisbury", "salisbury_plain", "stonehenge", "boscombe_down", "porton_down", "ukk15"],
    s0_1: "Vasta contea calcarea dominata dalla cattedrale di Salisbury con la guglia più alta del Regno Unito, il sito preistorico di Stonehenge e l'immenso altopiano di Salisbury Plain.",
    s2_4: "Salisbury Plain è il principale centro di manovra e addestramento tattico a fuoco vivo dell'esercito britannico; espansione dei laboratori chimici segreti di Porton Down.",
    s5: "Apertura dell'Aeroplane and Armament Experimental Establishment (A&AEE) a RAF Boscombe Down per il collaudo ufficiale e scientifico di ogni nuovo aereo da guerra britannico.",
    s6: "Decine di migliaia di soldati britannici, canadesi e australiani si addestrano a Salisbury Plain; Boscombe Down collauda lo Spitfire e i primi bombardieri pesanti quadrimotore.",
    s7: "Porton Down prepara difese e contromisure contro possibili attacchi chimici dell'Asse; Boscombe Down verifica le modifiche e le armi speciali per la caccia notturna.",
    s8: "Salisbury Plain diviene il terreno di collaudo d'elezione per le nuove formazioni corazzate dell'esercito britannico armate con i carri armati Churchill e Crusader.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKK15"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKK15"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKK15"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKK15"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKK15"].s2_4;
      return UK_PROVINCES_META["UKK15"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKK15"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKK23": {
    nuts: "UKK23",
    name: "Somerset",
    modernName: "Somerset (Taunton Deane, Sedgemoor, South Somerset, Mendip)",
    historicalName: "Somerset (Somerset / Yeovil Westland Aircraft & ROF Bridgwater Esplosivi)",
    historicCounty: "Somerset",
    country: "England",
    capital: "Taunton",
    region: "South West",
    keys: ["somerset", "yeovil", "westland", "westland_aircraft", "lysander", "bridgwater", "rof_bridgwater", "taunton", "ukk23"],
    s0_1: "Contea storica celebre per i formaggi Cheddar, le colline Mendip, i frutteti di mele da sidro e la Westland Aircraft Company a Yeovil.",
    s2_4: "Westland Aircraft progetta e produce il celeberrimo aereo da ricognizione e collegamento a decollo corto Westland Lysander e il caccia bimotore Whirlwind.",
    s5: "Costruzione della gigantesca Royal Ordnance Factory (ROF Bridgwater) a Puriton, specializzata nella sintesi su vasta scala del potentissimo esplosivo militare RDX.",
    s6: "I velivoli Westland Lysander si distinguono in Francia e nella Manica salvando piloti abbattuti; conversione rapida dei Lysander a missioni clandestine per il SOE.",
    s7: "La Luftwaffe bombarda ripetutamente Yeovil nel tentativo di distruggere gli stabilimenti Westland; ROF Bridgwater diviene il maggior fornitore di RDX per bombe aeronautiche.",
    s8: "I Lysander neri del No. 161 Squadron decollano al chiaro di luna per atterrare nei campi della Francia occupata e sbarcare agenti segreti della Resistenza.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKK23"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKK23"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKK23"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKK23"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKK23"].s2_4;
      return UK_PROVINCES_META["UKK23"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKK23"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKK24": {
    nuts: "UKK24",
    name: "Bournemouth, Christchurch and Poole",
    modernName: "Bournemouth, Christchurch and Poole (Dorset / Hampshire, South West England)",
    historicalName: "Bournemouth, Christchurch and Poole (Dorset & Hants / Idroscalo di Poole & Airspeed Christchurch)",
    historicCounty: "Hampshire / Dorset",
    country: "England",
    capital: "Bournemouth / Poole",
    region: "South West",
    keys: ["bournemouth", "poole", "christchurch", "poole_harbour", "airspeed", "horsa_glider", "boac_poole", "ukk24"],
    s0_1: "Grande conurbazione costiera con la stazione balneare di Bournemouth, il grandioso porto naturale di Poole Harbour e gli stabilimenti aeronautici Airspeed a Christchurch.",
    s2_4: "Poole Harbour diviene la base principale d'idrovolanti di Imperial Airways (poi BOAC) per mantenere i collegamenti aerei passeggeri e postali con l'Impero Britannico.",
    s5: "Airspeed a Christchurch avvia la produzione in grande serie dell'aereo da addestramento bimotore Airspeed Oxford, utilizzato per addestrare decine di migliaia di piloti e navigatori.",
    s6: "Gli idrovolanti civili BOAC da Poole mantengono aperte le rotte con Lisbona, l'Africa occidentale e l'America; la costa viene fortificata contro la minaccia d'invasione.",
    s7: "Bournemouth e Poole subiscono attacchi aerei da cacciabombardieri tedeschi; Airspeed avvia la progettazione del futuro colossale aliante d'assalto Airspeed Horsa.",
    s8: "Migliaia di allievi piloti del Commonwealth completano il loro addestramento sugli Airspeed Oxford di Christchurch prima di essere assegnati agli squadroni di prima linea.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKK24"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKK24"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKK24"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKK24"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKK24"].s2_4;
      return UK_PROVINCES_META["UKK24"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKK24"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKK25": {
    nuts: "UKK25",
    name: "Dorset",
    modernName: "Dorset (Weymouth and Portland, West Dorset, North Dorset, Purbeck)",
    historicalName: "Dorset (Dorset / Porto Navale di Portland & Radar Worth Matravers TRE)",
    historicCounty: "Dorset",
    country: "England",
    capital: "Dorchester",
    region: "South West",
    keys: ["dorset", "dorchester", "weymouth", "portland", "hmnb_portland", "worth_matravers", "purbeck", "tre_radar", "ukk25"],
    s0_1: "Paesaggio maestoso della Jurassic Coast, la storica contea di Thomas Hardy e la base navale fortificata di Portland Harbour, base di rifornimento e tiro della Home Fleet.",
    s2_4: "Portland Harbour viene chiusa da sbarramenti e reti per proteggere le navi da guerra da siluri; installazione di stazioni radar Chain Home sulle scogliere del Purbeck.",
    s5: "A Worth Matravers (Swanage) si insedia il Telecommunications Research Establishment (TRE): qui gli scienziati britannici sviluppano i primi radar centimetrici a cavità risonante.",
    s6: "Estate 1940: Portland Harbour e Weymouth subiscono devastanti attacchi da parte degli Stuka della Luftwaffe; le navi da guerra si ritirano verso basi più a nord.",
    s7: "A Worth Matravers il fisico Bernard Lovell e il suo team creano il radar H2S (radar di navigazione notturna) e il radar ASV per localizzare gli U-Boot in superficie di notte.",
    s8: "Le scoperte radar del TRE a Worth Matravers conferiscono alla Royal Navy e alla RAF un vantaggio tecnologico decisivo che capovolgerà le sorti della guerra.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKK25"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKK25"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKK25"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKK25"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKK25"].s2_4;
      return UK_PROVINCES_META["UKK25"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKK25"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKK30": {
    nuts: "UKK30",
    name: "Cornwall and Isles of Scilly",
    modernName: "Cornwall and Isles of Scilly (Kernow, Truro, Falmouth, Penzance, St Ives)",
    historicalName: "Cornwall and Isles of Scilly (Cornovaglia / Falmouth Porto Riparazioni & RAF St Eval)",
    historicCounty: "Cornwall (Kernow)",
    country: "England",
    capital: "Truro / Falmouth",
    region: "South West",
    keys: ["cornwall", "isles_of_scilly", "kernow", "falmouth", "truro", "penzance", "st_eval", "western_approaches_south", "ukk30"],
    s0_1: "L'estremo sud-ovest della Gran Bretagna (Kernow) con le sue coste scoscese, miniere storiche di stagno, porto riparazioni atlantico di Falmouth e le remote Isole Scilly.",
    s2_4: "Falmouth diviene porto navale strategico per le riparazioni d'emergenza dei mercantili danneggiati e base di raduno per i convogli diretti nell'Atlantico e a Gibilterra.",
    s5: "Costruzione della grande base aerea del Coastal Command a RAF St Eval per consentire ai bombardieri a lungo raggio di pattugliare il Golfo di Biscaglia e gli accessi occidentali.",
    s6: "Falmouth accoglie decine di navi francesi e mercantili scampati all'avanzata nazista; le Isole Scilly allestiscono stazioni d'avvistamento e soccorso per aerei abbattuti.",
    s7: "Gli squadroni di Sunderland e Whitley di base a St Eval danno la caccia senza tregua agli U-Boot tedeschi che tentano di uscire dalle basi della Bretagna occupata.",
    s8: "Falmouth ripara centinaia di mercantili silurati salvando carichi preziosi; la Cornovaglia diviene base di partenza segreta per motosiluranti e agenti del SOE.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKK30"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKK30"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKK30"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKK30"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKK30"].s2_4;
      return UK_PROVINCES_META["UKK30"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKK30"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKK41": {
    nuts: "UKK41",
    name: "Plymouth",
    modernName: "Plymouth (City of Plymouth, South West England)",
    historicalName: "Plymouth (Devon / HMNB Devonport Il Più Grande Arsenale Navale d'Europa & Plymouth Blitz)",
    historicCounty: "Devon",
    country: "England",
    capital: "Plymouth",
    region: "South West",
    keys: ["plymouth", "city_of_plymouth", "devonport", "hmnb_devonport", "plymouth_blitz", "plymouth_sound", "drake", "ukk41"],
    s0_1: "La leggendaria città marittima di Sir Francis Drake sul Plymouth Sound e sede di HMNB Devonport (il più vasto cantiere e arsenale navale della Royal Navy nell'Europa occidentale).",
    s2_4: "I bacini di carenaggio di Devonport lavorano a pieno ritmo per manutenere corazzate, portaerei e incrociatori pesanti; allestimento di potenti difese antiaeree e sbarramenti.",
    s5: "Devonport diviene la base operativa primaria per le flottiglie di cacciatorpediniere che scortano i convogli atlantici e danno la caccia ai sommergibili nemici.",
    s6: "Plymouth accoglie le navi della marina francese riparate in Gran Bretagna dopo la caduta della Francia; allerta massima della guarnigione costiera contro invasioni anfibie.",
    s7: "Inizio dei violenti bombardamenti aerei tedeschi; l'arsenale di Devonport continua giorno e notte a riparare navi da guerra crivellate da bombe e siluri.",
    s8: "Il tragico Plymouth Blitz (marzo-aprile 1941): 5 notti di devastazione radono al suolo il centro cittadino con oltre 1.100 vittime civili; Re Giorgio VI e Churchill visitano la città ferita che non si arrende.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKK41"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKK41"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKK41"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKK41"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKK41"].s2_4;
      return UK_PROVINCES_META["UKK41"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKK41"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKK42": {
    nuts: "UKK42",
    name: "Torbay",
    modernName: "Torbay (Torquay, Paignton, Brixham, South West England)",
    historicalName: "Torbay (Devon / Riviera Inglese, Brixham Pescherecci & Ospedali della RAF)",
    historicCounty: "Devon",
    country: "England",
    capital: "Torquay",
    region: "South West",
    keys: ["torbay", "torquay", "brixham", "paignton", "english_riviera", "ukk42"],
    s0_1: "La celebre 'Riviera Inglese' con il golfo riparato di Torbay, i grandi alberghi vittoriani di Torquay e la storica flotta peschereccia d'altura di Brixham.",
    s2_4: "Piani di requisizione dei lussuosi alberghi di Torquay per ospitare ospedali militari d'evacuazione, scuole per navigatori della RAF e alloggi per sfollati d'alto rango.",
    s5: "I pescherecci a motore di Brixham vengono in parte arruolati per la sorveglianza costiera e per rifornire di pesce fresco le città industriali sotto razionamento alimentare.",
    s6: "Torbay accoglie marinai e soldati feriti della Royal Navy e rifugiati; l'insenatura riparata di Torbay funge da rada sicura per navi mercantili in attesa di convoglio.",
    s7: "Frequenti incursioni aeree della Luftwaffe a volo radente colpiscono chiese e alberghi di Torquay, ma la comunità mantiene operativi i centri di cura e riabilitazione.",
    s8: "Brixham continua a mandare in mare le sue paranze nonostante il pericolo di mine e mitragliamenti aerei, contribuendo al vettovagliamento della nazione.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKK42"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKK42"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKK42"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKK42"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKK42"].s2_4;
      return UK_PROVINCES_META["UKK42"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKK42"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKK43": {
    nuts: "UKK43",
    name: "Devon CC",
    modernName: "Devon (Exeter, East Devon, Mid Devon, North Devon, South Hams, Teignbridge, Torridge, West Devon)",
    historicalName: "Devon CC (Devon / Exeter Cattedrale, Dartmoor & Basi Aeree RAF)",
    historicCounty: "Devon",
    country: "England",
    capital: "Exeter",
    region: "South West",
    keys: ["devon_cc", "devon", "exeter", "exeter_cathedral", "dartmoor", "north_devon", "appledore", "ukk43"],
    s0_1: "Vasta contea agricola con la cattedrale normanna di Exeter, la brughiera selvaggia di Dartmoor, porti cantieristici ad Appledore e ricchi pascoli da latte.",
    s2_4: "L'aeroporto di Exeter viene convertito in base caccia RAF Exeter a protezione del canale di Bristol e dei porti meridionali; piani per accogliere 50.000 sfollati da Londra.",
    s5: "Exeter ospita squadroni di caccia Hurricane; i cantieri navali di Appledore costruiscono dragamine in legno e imbarcazioni speciali per la marina da guerra.",
    s6: "Durante la Battaglia d'Inghilterra, i caccia di RAF Exeter proteggono Devonport e Bristol; Dartmoor viene utilizzata per l'addestramento duro di reparti d'assalto.",
    s7: "La campagna del Devon diviene la seconda casa per decine di migliaia di scolari londinesi; la produzione agricola (burro, latte, grano) è essenziale per il paese.",
    s8: "RAF Exeter accoglie il celebre 307 Polish Night Fighter Squadron (lo squadrone 'Lwów Eagle Owls') che difende con coraggio i cieli del sud-ovest contro i bombardieri notturni.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKK43"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKK43"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKK43"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKK43"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKK43"].s2_4;
      return UK_PROVINCES_META["UKK43"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKK43"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKL11": {
    nuts: "UKL11",
    name: "Isle of Anglesey",
    modernName: "Isle of Anglesey (Ynys Môn, North Wales)",
    historicalName: "Isle of Anglesey (Ynys Môn / Holyhead Porto Traghetti & RAF Valley)",
    historicCounty: "Anglesey (Sir Fôn)",
    country: "Wales",
    capital: "Llangefni / Holyhead",
    region: "Wales",
    keys: ["anglesey", "isle_of_anglesey", "ynys_mon", "holyhead", "raf_valley", "ukl11"],
    s0_1: "Isola storica all'estremità nord-occidentale del Galles (Ynys Môn), collegata alla terraferma dal ponte sospeso di Menai; porto di Holyhead scalo principale per Dublino.",
    s2_4: "Piani di sorveglianza delle rotte marittime verso l'Eire neutrale; individuazione delle pianure costiere dell'isola per la costruzione della base aerea strategica di RAF Valley.",
    s5: "Costruzione accelerata di RAF Valley per ospitare aerei da caccia a protezione del porto di Liverpool e del Mare d'Irlanda; Holyhead gestisce il traffico traghetti controllato.",
    s6: "Apertura operativa di RAF Valley nel febbraio 1941 come base caccia e punto di ricezione e collaudo velivoli provenienti dalle rotte atlantiche nordamericane.",
    s7: "Pattugliamenti aerei intensivi nel Mare d'Irlanda per contrastare gli U-Boot che cercano di bloccare gli accessi occidentali ai convogli di Liverpool e Glasgow.",
    s8: "RAF Valley diviene una delle più grandi basi aeree di transito e addestramento caccia del Regno Unito, vitale per la protezione delle comunicazioni con l'Irlanda.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKL11"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKL11"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKL11"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKL11"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKL11"].s2_4;
      return UK_PROVINCES_META["UKL11"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKL11"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKL12": {
    nuts: "UKL12",
    name: "Gwynedd",
    modernName: "Gwynedd (Arfon, Dwyfor, Meirionnydd, North Wales)",
    historicalName: "Gwynedd (Caernarfonshire & Merionethshire / Manod Cave Tesori della National Gallery)",
    historicCounty: "Caernarfonshire & Merionethshire",
    country: "Wales",
    capital: "Caernarfon",
    region: "Wales",
    keys: ["gwynedd", "caernarfon", "manod_quarry", "national_gallery_refuge", "snowdonia", "blaenau_ffestiniog", "ukl12"],
    s0_1: "Cuore della cultura e lingua gallese dominato dalle maestose vette di Snowdonia (Eryri), il castello di Caernarfon e le cave di ardesia di Blaenau Ffestiniog.",
    s2_4: "Sir Kenneth Clark (direttore della National Gallery) individua le cave sotterranee d'ardesia di Manod Quarry a Blaenau Ffestiniog per nascondere tutti i capolavori artistici della nazione.",
    s5: "Oltre 2.000 capolavori di Leonardo, Rembrandt, Michelangelo, Turner e Raffaello vengono imballati in casse speciali e nascosti nelle viscere climatizzate della montagna di Manod.",
    s6: "I tesori artistici della Gran Bretagna riposano in totale sicurezza sotto la roccia gallese mentre Londra e le città d'arte subiscono i bombardamenti del Blitz.",
    s7: "Gwynedd accoglie migliaia di bambini evacuati dal Merseyside; addestramento commando tra le cime impervie di Snowdonia per le forze speciali britanniche.",
    s8: "La fortezza sotterranea di Manod preserva intatto il patrimonio culturale dell'umanità fino alla fine della guerra, mentre la popolazione locale veglia con riservatezza assoluta.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKL12"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKL12"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKL12"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKL12"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKL12"].s2_4;
      return UK_PROVINCES_META["UKL12"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKL12"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKL13": {
    nuts: "UKL13",
    name: "Conwy and Denbighshire",
    modernName: "Conwy and Denbighshire (Conwy, Denbighshire, North Wales)",
    historicalName: "Conwy and Denbighshire (Denbighshire & Caernarfonshire / Colwyn Bay Ministero del Cibo)",
    historicCounty: "Denbighshire & Caernarfonshire",
    country: "Wales",
    capital: "Conwy / Ruthin",
    region: "Wales",
    keys: ["conwy", "denbighshire", "colwyn_bay", "ministry_of_food", "lord_woolton", "conwy_castle", "ukl13"],
    s0_1: "Costa e vallate del Galles del Nord con il castello medievale di Conwy, la valle di Llangollen e la stazione balneare di Colwyn Bay con i suoi grandi alberghi.",
    s2_4: "Piani di evacuazione ministeriale da Londra: Colwyn Bay viene scelta come sede ufficiale d'emergenza dell'intero Ministero del Cibo (Ministry of Food).",
    s5: "Oltre 5.000 funzionari del Ministero del Cibo sotto Lord Woolton si insediano a Colwyn Bay: da qui viene gestito l'intero piano di razionamento alimentare della Gran Bretagna.",
    s6: "Colwyn Bay emette i 'Ration Books' per tutta la popolazione, organizza la distribuzione di latte e vitamine per i bambini e lancia la celebre 'Woolton Pie' nutriente.",
    s7: "La valle di Conwy e Denbighshire accoglie migliaia di sfollati da Liverpool e Manchester; le fattorie gallesi massimizzano la produzione di latte e agnelli.",
    s8: "La gestione scientifica del cibo diretta da Colwyn Bay impedisce la fame e la malnutrizione nel Regno Unito, mantenendo la popolazione in salute durante gli anni più bui.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKL13"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKL13"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKL13"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKL13"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKL13"].s2_4;
      return UK_PROVINCES_META["UKL13"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKL13"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKL14": {
    nuts: "UKL14",
    name: "South West Wales",
    modernName: "South West Wales (Pembrokeshire, Carmarthenshire, Ceredigion)",
    historicalName: "South West Wales (Pembrokeshire & Carmarthenshire / Pembroke Dock Base Idrovolanti)",
    historicCounty: "Pembrokeshire & Carmarthenshire & Cardiganshire",
    country: "Wales",
    capital: "Carmarthen / Haverfordwest",
    region: "Wales",
    keys: ["south_west_wales", "pembrokeshire", "carmarthenshire", "ceredigion", "pembroke_dock", "milford_haven", "sunderland_base", "ukl14"],
    s0_1: "Penisola sud-occidentale del Galles con il profondo fiordo naturale di Milford Haven, la storica cittadella navale di Pembroke Dock e le fertili terre di Carmarthenshire.",
    s2_4: "Milford Haven viene potenziata come terminale di scarico sicuro per petroliere atlantiche; Pembroke Dock diviene base della Royal Air Force per idrovolanti militari.",
    s5: "Pembroke Dock diviene la più grande base al mondo di idrovolanti militari (Short Sunderland e Catalina): fino a 99 idrovolanti giganti ormeggiati contemporaneamente nel fiordo.",
    s6: "Gli idrovolanti Sunderland di Pembroke Dock decollano incessantemente a protezione dei convogli atlantici nei Western Approaches meridionali e nel Golfo di Biscaglia.",
    s7: "Agosto 1940: la Luftwaffe bombarda i depositi petroliferi di Pembroke Dock innescando un immane incendio che dura 18 giorni; vigili del fuoco eroi da tutto il Galles accorrono a spegnerlo.",
    s8: "Gli equipaggi di Pembroke Dock affondano sommergibili tedeschi e salvano centinaia di marinai naufraghi nell'Atlantico, garantendo l'arrivo sicuro del petrolio a Milford Haven.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKL14"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKL14"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKL14"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKL14"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKL14"].s2_4;
      return UK_PROVINCES_META["UKL14"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKL14"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKL15": {
    nuts: "UKL15",
    name: "Central Valleys",
    modernName: "Central Valleys (Rhondda Cynon Taf, Merthyr Tydfil, South Wales)",
    historicalName: "Central Valleys (Glamorgan / Rhondda Valley Bacino Carbonifero & ROF Hirwaun)",
    historicCounty: "Glamorgan (Morgannwg)",
    country: "Wales",
    capital: "Merthyr Tydfil / Pontypridd",
    region: "Wales",
    keys: ["central_valleys", "rhondda", "cynon_taf", "merthyr_tydfil", "rhondda_valley", "rof_hirwaun", "welsh_coal", "ukl15"],
    s0_1: "Le leggendarie valli minerarie della Rhondda e di Cynon con Merthyr Tydfil, culla dell'estrazione dell'antracite e del carbone a vapore di altissima qualità per le flotte mondiali.",
    s2_4: "Costruzione della grande Royal Ordnance Factory (ROF Hirwaun) nella Cynon Valley per la produzione di munizioni per armi leggere e bossoli per artiglieria.",
    s5: "I minatori gallesi delle valli vengono esentati dalla leva per garantire il combustibile vitale alle fonderie e alle navi della flotta; apertura di ROF Hirwaun.",
    s6: "Migliaia di donne delle valli ('Hirwaun Munitionettes') entrano nelle fabbriche d'armamento; le comunità della Rhondda accolgono calorosamente bambini sfollati dal Blitz.",
    s7: "ROF Hirwaun produce milioni di proiettili al mese per le difese territoriali; le valli risuonano dei cori dei minatori che sostengono il morale nazionale.",
    s8: "La produzione di carbone vapore gallese alimenta le locomotive e le caldaie di tutto il Regno Unito, costituendo la fonte energetica primaria della vittoria alleata.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKL15"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKL15"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKL15"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKL15"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKL15"].s2_4;
      return UK_PROVINCES_META["UKL15"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKL15"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKL16": {
    nuts: "UKL16",
    name: "Gwent Valleys",
    modernName: "Gwent Valleys (Blaenau Gwent, Caerphilly, Torfaen, South Wales)",
    historicalName: "Gwent Valleys (Monmouthshire / Blaenau Gwent Carbone & ROF Glascoed Munizioni)",
    historicCounty: "Monmouthshire (Sir Fynwy)",
    country: "Wales",
    capital: "Caerphilly / Ebbw Vale",
    region: "Wales",
    keys: ["gwent_valleys", "blaenau_gwent", "caerphilly", "torfaen", "ebbw_vale", "rof_glascoed", "ukl16"],
    s0_1: "Vallate orientali del bacino carbonifero con le grandi acciaierie e laminatoi continui di Ebbw Vale (Richard Thomas & Co., i più moderni d'Europa) e il castello di Caerphilly.",
    s2_4: "Costruzione della gigantesca Royal Ordnance Factory (ROF Glascoed) a Monmouthshire, destinata a diventare il più grande stabilimento di caricamento bombe del Galles.",
    s5: "Ebbw Vale produce lamiere d'acciaio sottili e banda stagnata per razioni alimentari e bossoli; ROF Glascoed entra in funzione impiegando oltre 15.000 operai.",
    s6: "Glascoed carica le bombe aeree per il RAF Bomber Command e proiettili antiaerei; le comunità minerarie mantengono elevatissima la coesione operaia e patriottica.",
    s7: "Ebbw Vale rifornisce di lamiere speciali le industrie corazzate e automobilistiche britanniche; alloggiamento di famiglie e scolari evacuati da Londra est.",
    s8: "ROF Glascoed supera i record produttivi di caricamento bombe, fornendo il munizionamento essenziale per le operazioni aeree e terrestri su tutti i teatri di guerra.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKL16"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKL16"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKL16"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKL16"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKL16"].s2_4;
      return UK_PROVINCES_META["UKL16"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKL16"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKL17": {
    nuts: "UKL17",
    name: "Bridgend and Neath Port Talbot",
    modernName: "Bridgend and Neath Port Talbot (Bridgend, Port Talbot, Neath, South Wales)",
    historicalName: "Bridgend and Neath Port Talbot (Glamorgan / ROF Bridgend & Acciaierie di Port Talbot)",
    historicCounty: "Glamorgan (Morgannwg)",
    country: "Wales",
    capital: "Bridgend / Port Talbot",
    region: "Wales",
    keys: ["bridgend", "neath_port_talbot", "port_talbot", "rof_bridgend", "waterton", "island_farm", "ukl17"],
    s0_1: "Polo industriale costiero imperniato sulle acciaierie e fonderie di Port Talbot, le industrie chimiche di Neath e i terreni agricoli di Bridgend.",
    s2_4: "Costruzione della monumentale Royal Ordnance Factory (ROF Bridgend a Waterton), il più grande complesso di munizioni del Regno Unito con 35.000 dipendenti (80% donne).",
    s5: "ROF Bridgend e Brackla entrano in funzione su una superficie di centinaia di ettari: caricamento di milioni di spolette, proiettili e granate protette da enormi terrapieni.",
    s6: "Le acciaierie di Port Talbot colano acciaio per la corazzatura navale; a Island Farm (Bridgend) viene allestito un grande campo militare inizialmente per le truppe alleate.",
    s7: "Le 'Bridgend Munitionettes' lavorano senza interruzione sotto blackout totale; Port Talbot rifornisce di profilati pesanti l'industria bellica delle Midlands.",
    s8: "ROF Bridgend diviene l'arsenale leader nella produzione delle nuove granate anticarro e munizioni per le campagne del Nord Africa.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKL17"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKL17"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKL17"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKL17"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKL17"].s2_4;
      return UK_PROVINCES_META["UKL17"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKL17"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKL18": {
    nuts: "UKL18",
    name: "Swansea",
    modernName: "Swansea (City and County of Swansea, Abertawe, South Wales)",
    historicalName: "Swansea (Glamorgan / Abertawe, Raffineria di Llandarcy, Rame & Three Nights Blitz)",
    historicCounty: "Glamorgan (Morgannwg)",
    country: "Wales",
    capital: "Swansea (Abertawe)",
    region: "Wales",
    keys: ["swansea", "abertawe", "llandarcy", "swansea_blitz", "three_nights_blitz", "tinplate", "copperopolis", "ukl18"],
    s0_1: "La storica 'Copperopolis', capitale mondiale della metallurgia non ferrosa (rame, zinco, nichel e latta), grande porto mercantile e sede della moderna raffineria petrolifera di Llandarcy.",
    s2_4: "Llandarcy incrementa la raffinazione di greggio per produrre carburante per la flotta; Swansea fortifica le banchine portuali e prepara squadre antincendio speciali.",
    s5: "Swansea movimenta milioni di tonnellate di carbone d'esportazione e carburante; i laminatoi di latta producono contenitori per razioni alimentari dell'esercito.",
    s6: "La costa della baia di Swansea e della penisola di Gower viene presidiata dalla Home Guard e fortificata con bunker per scongiurare sbarchi da sud.",
    s7: "Frequenti incursioni aeree della Luftwaffe mirate alla raffineria di Llandarcy e ai moli; operai mantengono in funzione gli impianti di raffinazione.",
    s8: "Il tragico 'Three Nights' Blitz' (19-21 febbraio 1941): la Luftwaffe bombarda Swansea per tre notti consecutive distruggendo 41 ettari di centro cittadino e provocando 230 morti; la città non cede.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKL18"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKL18"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKL18"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKL18"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKL18"].s2_4;
      return UK_PROVINCES_META["UKL18"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKL18"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKL21": {
    nuts: "UKL21",
    name: "Monmouthshire and Newport",
    modernName: "Monmouthshire and Newport (City of Newport, Monmouthshire, South East Wales)",
    historicalName: "Monmouthshire and Newport (Monmouthshire / Newport Docks & Acciaierie Orb Works)",
    historicCounty: "Monmouthshire (Sir Fynwy)",
    country: "Wales",
    capital: "Newport",
    region: "Wales",
    keys: ["monmouthshire", "newport", "city_of_newport", "newport_docks", "orb_works", "lysaght", "ukl21"],
    s0_1: "Grande porto della foce del fiume Usk con l'avveniristico Newport Transporter Bridge, i vasti Alexandra Docks e le acciaierie storiche Orb Works di John Lysaght Ltd.",
    s2_4: "Orb Works si specializza nella laminazione di acciai elettrici al silicio speciali indispensabili per trasformatori di centrali elettriche e per apparati radar.",
    s5: "I Newport Docks gestiscono colossali carichi di bauxite per la produzione di alluminio bellico, legname per puntellare le miniere e grano per la nazione.",
    s6: "Riparazione accelerata di mercantili danneggiati nelle acque della Manica; Newport ospita batterie contraeree per proteggere l'estuario del Severn.",
    s7: "La Luftwaffe bombarda i docks e le acciaierie di Newport; gli operai di Orb Works continuano la laminazione di lamiere per corazze e caschi militari d'acciaio Brodie.",
    s8: "Consegna di navi da carico riparate e produzione di semilavorati d'acciaio per la costruzione di chiatte e barchini da sbarco per le future offensive.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKL21"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKL21"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKL21"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKL21"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKL21"].s2_4;
      return UK_PROVINCES_META["UKL21"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKL21"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKL22": {
    nuts: "UKL22",
    name: "Cardiff and Vale of Glamorgan",
    modernName: "Cardiff and Vale of Glamorgan (City of Cardiff, Caerdydd, Barry)",
    historicalName: "Cardiff and Vale of Glamorgan (Glamorgan / Bute Docks Porto del Carbone & Cardiff Blitz)",
    historicCounty: "Glamorgan (Morgannwg)",
    country: "Wales",
    capital: "Cardiff (Caerdydd)",
    region: "Wales",
    keys: ["cardiff", "caerdydd", "bute_docks", "tiger_bay", "vale_of_glamorgan", "barry_docks", "cardiff_blitz", "rof_cardiff", "ukl22"],
    s0_1: "La capitale economica del Galles: Bute Docks a Tiger Bay (il più grande snodo di esportazione di carbone al mondo), il porto di Barry e la base aerea di RAF St Athan.",
    s2_4: "RAF St Athan aperta nel 1938 diviene la più grande scuola tecnica e base di manutenzione aerea della RAF; Barry Docks immagazzinano scorte strategiche di combustibile.",
    s5: "Cardiff movimenta milioni di tonnellate di carbone per le flotte alleate; apertura della Royal Ordnance Factory (ROF Cardiff a Llanishen) per cannoni anticarro.",
    s6: "RAF St Athan addestra oltre 10.000 specialisti aeronautici e genieri della RAF; Bute Docks accoglie marinai mercantili da ogni angolo dell'Impero a Tiger Bay.",
    s7: "Il Cardiff Blitz (2 gennaio e marzo 1941): pesanti incursioni della Luftwaffe distruggono quartieri di Riverside e Canton e colpiscono la cattedrale di Llandaff; 165 morti.",
    s8: "ROF Llanishen avvia la produzione in grande serie del potente cannone anticarro da 6 libbre (57 mm) per la British Army; Cardiff continua a essere il polmone marittimo gallese.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKL22"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKL22"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKL22"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKL22"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKL22"].s2_4;
      return UK_PROVINCES_META["UKL22"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKL22"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKL23": {
    nuts: "UKL23",
    name: "Flintshire and Wrexham",
    modernName: "Flintshire and Wrexham (Flintshire, Wrexham, North East Wales)",
    historicalName: "Flintshire and Wrexham (Flintshire & Denbighshire / Vickers Broughton Wellington & ROF Marchwiel)",
    historicCounty: "Flintshire & Denbighshire",
    country: "Wales",
    capital: "Wrexham / Mold",
    region: "Wales",
    keys: ["flintshire", "wrexham", "broughton", "vickers_broughton", "rof_marchwiel", "shotton_steel", "ukl23"],
    s0_1: "Polo industriale del Galles del Nord con le immense acciaierie di Shotton (John Summers & Sons sul fiume Dee) e il centro minerario e chimico di Wrexham.",
    s2_4: "Nel 1939 Vickers-Armstrongs costruisce a Broughton una grandiosa Shadow Factory per la fabbricazione in grande serie di bombardieri bimotore Vickers Wellington.",
    s5: "Costruzione della vasta Royal Ordnance Factory (ROF Marchwiel a Wrexham) per la produzione di propellenti alla cordite; Shotton produce lamiere per rifugi Anderson.",
    s6: "Broughton lavora giorno e notte: assemblaggio e collaudo dei bombardieri Wellington geodetici sulla nuova pista; ROF Marchwiel impiega 13.000 operai.",
    s7: "La produzione di Wellington a Broughton tocca livelli record (fino a 130 bombardieri al mese), fornendo i velivoli indispensabili per il Bomber Command.",
    s8: "Shotton Steel fornisce oltre il 70% di tutte le lamiere d'acciaio per i rifugi antiaerei Anderson domestici del Regno Unito, salvando centinaia di migliaia di vite.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKL23"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKL23"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKL23"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKL23"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKL23"].s2_4;
      return UK_PROVINCES_META["UKL23"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKL23"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKL24": {
    nuts: "UKL24",
    name: "Powys",
    modernName: "Powys (Montgomeryshire, Radnorshire, Brecknockshire, Mid Wales)",
    historicalName: "Powys (Mid Wales / Cuore Rurale Gallese, Dighe di Elan Valley & Rifugio Sfollati)",
    historicCounty: "Montgomeryshire & Radnorshire & Brecknockshire",
    country: "Wales",
    capital: "Llandrindod Wells",
    region: "Wales",
    keys: ["powys", "elan_valley", "montgomeryshire", "radnorshire", "brecknockshire", "brecon_beacons", "ukl24"],
    s0_1: "Il vasto cuore montuoso e rurale del Galles con i laghi e le maestose dighe della Elan Valley (costruite per fornire acqua potabile pura alla città di Birmingham).",
    s2_4: "Misure segrete di sorveglianza militare attorno alle dighe della Elan Valley per scongiurare sabotaggi o attacchi aerei mirati ad assetare Birmingham.",
    s5: "Powys diviene una delle principali zone sicure di accoglienza per decine di migliaia di madri e scolari sfollati dalle città martoriate di Liverpool e Birmingham.",
    s6: "L'altopiano e i monti dei Brecon Beacons vengono utilizzati per l'addestramento alla sopravvivenza in montagna delle truppe scelte e della Home Guard rurale.",
    s7: "Le dighe della Elan Valley vengono impiegate in segreto da Barnes Wallis e dalla RAF per esperimenti sull'impatto di esplosioni subacquee contro murature di sbarramento.",
    s8: "Fornitura vitale di carne ovina, lana e legname per lo sforzo bellico nazionale; ospitalità generosa che lega per sempre le famiglie gallesi agli sfollati inglesi.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKL24"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKL24"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKL24"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKL24"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKL24"].s2_4;
      return UK_PROVINCES_META["UKL24"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKL24"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM50": {
    nuts: "UKM50",
    name: "Aberdeen City and Aberdeenshire",
    modernName: "Aberdeen City and Aberdeenshire (Aberdeen, North East Scotland)",
    historicalName: "Aberdeen City and Aberdeenshire (Granite City / Porto Peschereccio & RAF Dyce)",
    historicCounty: "Aberdeenshire & Kincardineshire",
    country: "Scotland",
    capital: "Aberdeen",
    region: "Scotland",
    keys: ["aberdeen", "aberdeenshire", "granite_city", "raf_dyce", "peterhead", "fraserburgh", "ukm50"],
    s0_1: "La celebre 'Granite City', capitale economica e universitaria del nord-est scozzese, porto peschereccio e mercantile storico di Peterhead e Fraserburgh.",
    s2_4: "L'aeroporto civile di Dyce viene convertito in base aerea militare di prima linea (RAF Dyce) per la difesa del settore settentrionale della Gran Bretagna.",
    s5: "RAF Dyce ospita squadroni di caccia Spitfire e aerei del Coastal Command per la sorveglianza del Mare del Nord contro corsari di superficie e U-Boot tedeschi.",
    s6: "I pescherecci a strascico di Aberdeen e Peterhead mantengono le uscite in mare armati con mitragliatrici Lewis; fortificazioni costiere contro sbarchi dalla Norvegia occupata.",
    s7: "La Luftwaffe bombarda Aberdeen e Peterhead; gli squadroni di Dyce intercettano bombardieri Heinkel He 111 decollati da Stavanger e Bergen.",
    s8: "Aberdeen porto di rifugio per navi mercantili e base per operazioni clandestine di collegamento marittimo con la Resistenza norvegese.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM50"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM50"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM50"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM50"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM50"].s2_4;
      return UK_PROVINCES_META["UKM50"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM50"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM61": {
    nuts: "UKM61",
    name: "Caithness & Sutherland and Ross & Cromarty",
    modernName: "Caithness, Sutherland, Ross and Cromarty (Highland, Scotland)",
    historicalName: "Caithness & Sutherland, Ross & Cromarty (Highlands / Invergordon Base Navale & Wick)",
    historicCounty: "Caithness, Sutherland, Ross & Cromarty",
    country: "Scotland",
    capital: "Dingwall / Wick",
    region: "Scotland",
    keys: ["caithness", "sutherland", "ross_and_cromarty", "invergordon", "wick", "cromarty_firth", "ukm61"],
    s0_1: "Vaste Highlands settentrionali affacciate sul Pentland Firth e sul Cromarty Firth, con la storica base navale di rifornimento carburante della flotta a Invergordon e il porto di Wick.",
    s2_4: "Invergordon stocca nei suoi immensi serbatoi milioni di barili di nafta pesante per la Home Fleet di Scapa Flow; potenziamento della base aerea di RAF Wick.",
    s5: "RAF Wick diviene una delle più trafficate basi del Coastal Command: ricognizione continua sulle coste norvegesi per individuare le corazzate tascabili tedesche.",
    s6: "I ricognitori decollati da Wick scoprono i movimenti della flotta d'invasione tedesca verso la Norvegia nell'aprile 1940; difesa costiera delle Highlands.",
    s7: "Pattugliamenti instancabili contro sommergibili nel Pentland Firth; Invergordon rifornisce le navi da battaglia della Royal Navy a guardia dei varchi atlantici.",
    s8: "Maggio 1941: un ricognitore Spitfire decollato da Wick individua la corazzata Bismarck nascosta nel Grimstadfjord in Norvegia, innescando la leggendaria caccia navale.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM61"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM61"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM61"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM61"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM61"].s2_4;
      return UK_PROVINCES_META["UKM61"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM61"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM62": {
    nuts: "UKM62",
    name: "Inverness & Nairn and Moray, Badenoch & Strathspey",
    modernName: "Inverness, Nairn, Moray, Badenoch and Strathspey (Highland / Moray)",
    historicalName: "Inverness & Moray (Highlands / Capitale delle Highlands, RAF Kinloss & Lossiemouth)",
    historicCounty: "Inverness-shire & Morayshire & Nairnshire",
    country: "Scotland",
    capital: "Inverness",
    region: "Scotland",
    keys: ["inverness", "moray", "nairn", "kinloss", "lossiemouth", "strathspey", "cairngorms", "ukm62"],
    s0_1: "La storica 'Capitale delle Highlands' su Loch Ness e lungo il Canale Caledoniano; distillerie di whisky dello Speyside e le colossali basi aeree costiere di RAF Kinloss e Lossiemouth.",
    s2_4: "Apertura nel 1938 e 1939 delle grandi basi di RAF Kinloss e RAF Lossiemouth per l'addestramento avanzato degli equipaggi dei bombardieri del Bomber e Coastal Command.",
    s5: "Kinloss e Lossiemouth addestrano migliaia di piloti, navigatori e mitraglieri della RAF e del Commonwealth (OTU - Operational Training Units) prima dell'impiego operativo.",
    s6: "Canale Caledoniano utilizzato per il transito interno sicuro di piccole imbarcazioni militari dal Mare del Nord all'Atlantico al riparo dai sommergibili nemiche.",
    s7: "Distillerie dello Speyside producono alcol industriale puro essenziale per solventi bellici ed esplosivi; la Home Guard delle Highlands presidia i passi montani.",
    s8: "Gli squadroni di Lossiemouth e Kinloss compiono missioni di bombardamento e caccia agli U-Boot nel Mare di Norvegia, proteggendo la rotta artica verso la Russia.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM62"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM62"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM62"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM62"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM62"].s2_4;
      return UK_PROVINCES_META["UKM62"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM62"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM63": {
    nuts: "UKM63",
    name: "Lochaber, Skye & Lochalsh, Arran & Cumbrae and Argyll & Bute",
    modernName: "Lochaber, Skye and Lochalsh, Arran and Cumbrae, Argyll and Bute",
    historicalName: "Lochaber, Skye & Argyll (Highlands / Culla dei Commandos ad Achnacarry & Oban Idrovolanti)",
    historicCounty: "Argyllshire, Inverness-shire, Bute",
    country: "Scotland",
    capital: "Oban / Fort William",
    region: "Scotland",
    keys: ["lochaber", "skye", "argyll", "bute", "achnacarry", "commando_training", "oban", "flying_boats", "ukm63"],
    s0_1: "Paesaggio maestoso di fiordi e isole occidentali con Ben Nevis, l'Isola di Skye, la fonderia d'alluminio idroelettrica di Fort William (British Aluminium) e il porto di Oban.",
    s2_4: "La fonderia di Fort William produce il 90% dell'alluminio fuso della Gran Bretagna; Oban allestisce strutture d'ormeggio per idrovolanti e convogli occidentali.",
    s5: "Oban diviene una base strategica per idrovolanti del Coastal Command (Sunderland e Catalina) e punto d'ancoraggio per navi mercantili che evitano la Manica.",
    s6: "Nel 1940 a Lochailort e poi al castello di Achnacarry viene fondato il leggendario Commando Basic Training Centre: qui nascono i moderni 'British Commandos'.",
    s7: "Sotto la guida di Lord Lovat e istruttori scozzesi, migliaia di volontari britannici e alleati affrontano l'addestramento più duro del mondo tra i fiumi gelidi e le rupi di Lochaber.",
    s8: "I Commandos addestrati ad Achnacarry compiono i primi audaci raid sulle coste norvegesi (Operazione Claymore sulle Isole Lofoten nel marzo 1941), distruggendo fabbriche di olio di pesce.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM63"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM63"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM63"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM63"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM63"].s2_4;
      return UK_PROVINCES_META["UKM63"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM63"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM64": {
    nuts: "UKM64",
    name: "Na h-Eileanan Siar (Western Isles)",
    modernName: "Na h-Eileanan Siar (Western Isles / Outer Hebrides, Scotland)",
    historicalName: "Na h-Eileanan Siar (Outer Hebrides / Stornoway Scalo Avanzato & Harris Tweed)",
    historicCounty: "Ross-shire & Inverness-shire (Innse Gall)",
    country: "Scotland",
    capital: "Stornoway",
    region: "Scotland",
    keys: ["western_isles", "na_h_eileanan_siar", "outer_hebrides", "stornoway", "lewis", "harris_tweed", "ukm64"],
    s0_1: "Arcipelago atlantico delle Ebridi Esterne (Lewis, Harris, Uist, Barra) dove si parla correntemente il gaelico scozzese; porto principale di Stornoway e tessitura del celebre Harris Tweed.",
    s2_4: "Stornoway viene individuata come avamposto meteorologico e di vedetta navale avanzata nell'Oceano Atlantico a protezione delle rotte convogli settentrionali.",
    s5: "Apertura dell'aeroporto militare di RAF Stornoway per ospitare aerei da ricognizione marittima del Coastal Command; sorveglianza delle acque atlantiche.",
    s6: "La totalità della gioventù maschile delle Ebridi si arruola nella Royal Navy e nella marina mercantile, pagando una percentuale di perdite altissima nella guerra dei convogli.",
    s7: "I telai domestici di Harris e Lewis producono panno di lana vergine idrorepellente per uniformi pesanti destinate agli equipaggi di vedetta nell'Artico.",
    s8: "RAF Stornoway guida soccorsi e scorte a convogli atlantici scampati ad attacchi di U-Boot, costituendo l'ultimo presidio di terraferma prima della traversata oceanica.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM64"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM64"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM64"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM64"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM64"].s2_4;
      return UK_PROVINCES_META["UKM64"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM64"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM65": {
    nuts: "UKM65",
    name: "Orkney Islands",
    modernName: "Orkney Islands (Orkney, Scotland)",
    historicalName: "Orkney Islands (Arcipelago delle Orcadi / Scapa Flow Base della Home Fleet & Churchill Barriers)",
    historicCounty: "Orkney",
    country: "Scotland",
    capital: "Kirkwall",
    region: "Scotland",
    keys: ["orkney", "orkney_islands", "scapa_flow", "royal_oak", "gunther_prien", "churchill_barriers", "kirkwall", "ukm65"],
    s0_1: "Arcipelago settentrionale che racchiude l'immenso porto naturale riparato di Scapa Flow, la principale base navale da guerra strategica della Home Fleet della Royal Navy.",
    s2_4: "Piani di rafforzamento delle difese sommergibili di Scapa Flow; la flotta da battaglia si concentra nelle Orcadi durante la crisi di Monaco del 1938.",
    s5: "La tragedia del 14 ottobre 1939: l'U-Boot tedesco U-47 di Günther Prien penetra a Scapa Flow attraverso Kirk Sound e affonda la corazzata HMS Royal Oak (834 marinai caduti).",
    s6: "Winston Churchill ordina la costruzione immediata delle 'Churchill Barriers' (quattro colossali dighe in massi di cemento) per chiudere per sempre gli accessi orientali di Scapa Flow.",
    s7: "Scapa Flow diviene una fortezza inespugnabile protetta da decine di batterie antiaeree, palloni frenati e campi minati; base di partenza della Home Fleet dell'ammiraglio Tovey.",
    s8: "Maggio 1941: da Scapa Flow salpano l'incrociatore da battaglia HMS Hood e la corazzata Prince of Wales per intercettare la corazzata tedesca Bismarck nelle acque della Danimarca.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM65"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM65"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM65"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM65"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM65"].s2_4;
      return UK_PROVINCES_META["UKM65"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM65"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM66": {
    nuts: "UKM66",
    name: "Shetland Islands",
    modernName: "Shetland Islands (Zetland, Scotland)",
    historicalName: "Shetland Islands (Isole Shetland / Base Shetland Bus & Sullom Voe Idrovolanti)",
    historicCounty: "Shetland (Zetland)",
    country: "Scotland",
    capital: "Lerwick",
    region: "Scotland",
    keys: ["shetland", "shetland_islands", "lerwick", "shetland_bus", "sullom_voe", "scalloway", "norwegian_resistance", "ukm66"],
    s0_1: "L'arcipelago più settentrionale della Gran Bretagna a 100 miglia dalla terraferma scozzese e vicino alla Norvegia; capitale storica Lerwick e il fiordo riparato di Sullom Voe.",
    s2_4: "Sullom Voe viene allestito come base idrovolanti della RAF; Lerwick diviene porto di controllo contrabbando per ispezionare navi neutrali nel Mare del Nord.",
    s5: "RAF Sullom Voe entra in funzione con idrovolanti Sunderland e Catalina per pattugliare gli accessi artici contro la flotta corsara tedesca; allarme costante.",
    s6: "Dopo l'occupazione tedesca della Norvegia (giugno 1940), le Shetland divengono la base del leggendario 'Shetland Bus' (operativo da Scalloway): collegamenti segreti marittimi con la Norvegia.",
    s7: "Pescatori e marinai norvegesi su pescherecci locali sfidano tempeste artiche e caccia nemica per sbarcare armi, agenti del SOE ed evacuare rifugiati dalla Norvegia occupata.",
    s8: "Lo Shetland Bus trasporta tonnellate di esplosivi per sabotare le fabbriche di acqua pesante in Norvegia, legando per sempre la storia delle Shetland alla Resistenza scandinava.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM66"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM66"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM66"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM66"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM66"].s2_4;
      return UK_PROVINCES_META["UKM66"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM66"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM71": {
    nuts: "UKM71",
    name: "Angus and Dundee City",
    modernName: "Angus and Dundee City (Dundee, Angus, Arbroath, Montrose, Scotland)",
    historicalName: "Angus and Dundee (Angus & Dundee / Capitale della Iuta, Cantieri Caledon & Montrose RAF)",
    historicCounty: "Angus (Forfarshire)",
    country: "Scotland",
    capital: "Dundee / Forfar",
    region: "Scotland",
    keys: ["angus", "dundee", "city_of_dundee", "jute_capital", "caledon_shipbuilding", "arbroath", "montrose", "ukm71"],
    s0_1: "Capitale mondiale della lavorazione della iuta importata dal Bengala (Juteopolis), marmellata Keiller e i cantieri navali d'avanguardia Caledon Shipbuilding & Engineering.",
    s2_4: "I grandi stabilimenti di iuta di Dundee si preparano a tessere centinaia di milioni di sacchi di sabbia per la protezione civile antiaerea e per le trincee dell'esercito.",
    s5: "Dundee produce oltre un miliardo di sacchi di sabbia durante la guerra; Caledon Shipbuilding costruisce navi da carico veloci, petroliere e navi officina della marina.",
    s6: "RAF Montrose (la più antica base aerea della RAF in Gran Bretagna) addestra piloti da caccia britannici, polacchi e del Commonwealth durante la Battaglia d'Inghilterra.",
    s7: "I cantieri Caledon riparano navi mercantili e sottomarini alleati; Dundee accoglie sommergibili francesi, olandesi e norvegesi scampati all'occupazione dell'Europa.",
    s8: "Consegna continua di scafi da carico per rimpiazzare le perdite inflitte dagli U-Boot; la popolazione operaia di Dundee mantiene una produzione ininterrotta di cordami e tele belliche.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM71"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM71"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM71"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM71"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM71"].s2_4;
      return UK_PROVINCES_META["UKM71"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM71"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM72": {
    nuts: "UKM72",
    name: "Clackmannanshire and Fife",
    modernName: "Clackmannanshire and Fife (Fife, Clackmannanshire, Dunfermline, Kirkcaldy)",
    historicalName: "Clackmannanshire and Fife (Fife / Base Navale Rosyth & Bacino Carbonifero)",
    historicCounty: "Fife & Clackmannanshire",
    country: "Scotland",
    capital: "Glenrothes / Dunfermline",
    region: "Scotland",
    keys: ["fife", "clackmannanshire", "rosyth", "hmnb_rosyth", "dunfermline", "kirkcaldy", "forth_bridge", "ukm72"],
    s0_1: "Regione costiera sul Firth of Forth con i ricchi bacini minerari di carbone del Fife e la grande base navale fortificata della Royal Navy a HMNB Rosyth vicino a Dunfermline.",
    s2_4: "I colossali bacini di carenaggio in muratura di Rosyth vengono riattivati e ampliati per ospitare le più grandi corazzate e portaerei da battaglia della Royal Navy.",
    s5: "16 ottobre 1939: primo bombardamento aereo tedesco sul Regno Unito sul Firth of Forth a Rosyth; bombardieri Junkers Ju 88 tentano di colpire gli incrociatori sotto il Forth Bridge.",
    s6: "Rosyth ripara a ciclo continuo navi da guerra danneggiate nei teatri scandinavi e nella Manica; i minatori del Fife estraggono carbone per alimentare le caldaie navali.",
    s7: "Rosyth diviene base operativa per gruppi di scorta navale atlantica; Kirkcaldy produce linoleum cerato e tessuti impermeabili per teli di protezione militare.",
    s8: "La base navale di Rosyth garantisce la pronta disponibilità delle corazzate della Home Fleet incaricate di sbarrare il passo alle grandi navi di linea della Kriegsmarine.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM72"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM72"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM72"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM72"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM72"].s2_4;
      return UK_PROVINCES_META["UKM72"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM72"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM73": {
    nuts: "UKM73",
    name: "East Lothian and Midlothian",
    modernName: "East Lothian and Midlothian (East Lothian, Midlothian, Musselburgh, Dalkeith)",
    historicalName: "East Lothian and Midlothian (Lothian / Difesa del Firth of Forth & Basi Caccia RAF Drem)",
    historicCounty: "Haddingtonshire & Edinburghshire",
    country: "Scotland",
    capital: "Haddington / Dalkeith",
    region: "Scotland",
    keys: ["east_lothian", "midlothian", "raf_drem", "drem_lighting_system", "musselburgh", "dalkeith", "ukm73"],
    s0_1: "Fertili contee agricole e costiere a est di Edimburgo affacciate sul Firth of Forth; campi di grano, miniere di carbone a Midlothian e l'aerodromo di RAF Drem.",
    s2_4: "RAF Drem viene potenziata come base caccia di prima linea per intercettare gli incursori tedeschi che mirano al ponte del Forth e alla base di Rosyth.",
    s5: "16 ottobre 1939: gli Spitfire del No. 603 Squadron di base a RAF Drem abbattono il primo aereo tedesco della guerra sui cieli britannici (uno Junkers Ju 88 nel Forth).",
    s6: "A RAF Drem viene inventato e perfezionato il rivoluzionario 'Drem Lighting System', il sistema di luci d'atterraggio notturno che salva centinaia di piloti della RAF al rientro.",
    s7: "East Lothian fortifica la costa contro possibili sbarchi con centinaia di blocchi anticarro in cemento ancora oggi visibili; Midlothian estrae carbone senza sosta.",
    s8: "RAF Drem opera come centro d'eccellenza per la caccia notturna radarizzata, garantendo la sicurezza delle rotte costiere e dei cantieri della Scozia orientale.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM73"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM73"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM73"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM73"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM73"].s2_4;
      return UK_PROVINCES_META["UKM73"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM73"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM75": {
    nuts: "UKM75",
    name: "Edinburgh, City of",
    modernName: "City of Edinburgh (Dùn Èideann, Scotland)",
    historicalName: "Edinburgh (Midlothian / Capitale della Scozia, Castello di Edimburgo & Porto di Leith)",
    historicCounty: "Midlothian (Edinburghshire)",
    country: "Scotland",
    capital: "Edinburgh",
    region: "Scotland",
    keys: ["edinburgh", "city_of_edinburgh", "dun_eideann", "edinburgh_castle", "leith", "scottish_command", "turnhouse", "ukm75"],
    s0_1: "La storica capitale della Scozia dominata dall'imponente Castello di Edimburgo su roccia vulcanica, Holyrood Palace, l'Università e il porto mercantile industriale di Leith.",
    s2_4: "Edimburgo diviene sede del quartier generale unificato dello Scottish Command dell'esercito britannico; l'aeroporto di Turnhouse viene trasformato in base caccia RAF Turnhouse.",
    s5: "I caccia Spitfire del No. 603 (City of Edinburgh) Squadron proteggono i cieli scozzesi; le banchine di Leith scaricano carichi atlantici e armano dragamine.",
    s6: "Il Castello di Edimburgo ospita prigionieri di guerra nemici di alto rango (tra cui aviatori della Luftwaffe); allestimento di rifugi antiaerei nelle storiche volte.",
    s7: "La capitale scozzese accoglie migliaia di profughi polacchi, norvegesi e cecoslovacchi; nascita a Edimburgo della celebre brigata paracadutisti polacca del generale Sosabowski.",
    s8: "Turnhouse diviene snodo caccia fondamentale; Leith ripara navi da guerra e mercantili, mantenendo viva la fiera tradizione marittima e culturale della Scozia.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM75"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM75"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM75"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM75"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM75"].s2_4;
      return UK_PROVINCES_META["UKM75"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM75"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM76": {
    nuts: "UKM76",
    name: "Falkirk",
    modernName: "Falkirk (Falkirk, Grangemouth, Bo'ness, Central Scotland)",
    historicalName: "Falkirk (Stirlingshire / Fonderie Carron Iron Works & Raffineria Grangemouth)",
    historicCounty: "Stirlingshire",
    country: "Scotland",
    capital: "Falkirk",
    region: "Scotland",
    keys: ["falkirk", "grangemouth", "carron_iron_works", "carronades", "bp_grangemouth", "raf_grangemouth", "ukm76"],
    s0_1: "Crocevia industriale della Scozia centrale con le leggendarie fonderie di Carron Iron Works (famose per i cannoni 'carronate' del '700) e il porto petrolifero di Grangemouth.",
    s2_4: "Carron Iron Works converte i forni alla fusione di corazze per carri armati, bossoli d'artiglieria e scocche per bombe pesanti; Grangemouth raffina petrolio atlantico.",
    s5: "Apertura dell'aeroporto militare RAF Grangemouth per l'addestramento caccia; la raffineria fornisce benzina e lubrificanti per la flotta e le industrie scozzesi.",
    s6: "Carron fonde piastre corazzate per i carri armati Churchill e componenti pesanti per ponti mobili; Grangemouth allestisce cortine fumogene contro attacchi della Luftwaffe.",
    s7: "La posizione centrale di Falkirk la rende un corridoio logistico vitale per i treni carichi di carbone e munizioni tra Glasgow e la costa orientale.",
    s8: "Produzione ininterrotta di derivati del petrolio e fucinati d'acciaio; addestramento di centinaia di piloti di caccia Spitfire a RAF Grangemouth.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM76"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM76"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM76"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM76"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM76"].s2_4;
      return UK_PROVINCES_META["UKM76"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM76"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM77": {
    nuts: "UKM77",
    name: "Perth & Kinross and Stirling",
    modernName: "Perth & Kinross and Stirling (Perth, Stirling, Kinross, Central Scotland)",
    historicalName: "Perth and Stirling (Perthshire & Stirlingshire / Castello di Stirling & Snodo Ferroviario)",
    historicCounty: "Perthshire & Stirlingshire & Kinross-shire",
    country: "Scotland",
    capital: "Perth / Stirling",
    region: "Scotland",
    keys: ["perth", "stirling", "kinross", "stirling_castle", "highland_gateway", "argyll_sutherland", "ukm77"],
    s0_1: "La storica 'Porta delle Highlands' con il castello medievale di Stirling (culla di re scozzesi), il quartier generale dell'Argyll and Sutherland Highlanders e Perth sul fiume Tay.",
    s2_4: "Stirling Castle diviene centro di mobilitazione e deposito reggimentale per migliaia di coscritti e volontari scozzesi destinati ai battaglioni d'assalto delle Highlands.",
    s5: "Perth è il nodo ferroviario cruciale dove convergono le linee per le Highlands e la costa orientale; smistamento truppe verso Scapa Flow e Invergordon.",
    s6: "I battaglioni degli Argylls si sacrificano con immenso coraggio in Francia coprendo la ritirata verso Dunkerque; Stirling accoglie i reduci e ricostituisce le forze.",
    s7: "Le fertili valli del Perthshire intensificano la coltivazione di patate da semina e avena per l'alimentazione nazionale razionata; rifugio per sfollati dal Clyde.",
    s8: "Perth e Stirling ospitano centri logistici e officine di manutenzione per veicoli militari dell'esercito in vista delle future campagne del Nord Africa.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM77"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM77"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM77"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM77"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM77"].s2_4;
      return UK_PROVINCES_META["UKM77"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM77"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM78": {
    nuts: "UKM78",
    name: "West Lothian",
    modernName: "West Lothian (Linlithgow, Livingston, Bathgate, Central Scotland)",
    historicalName: "West Lothian (Linlithgowshire / Scisti Bituminosi & Carburante Sintetico Autarchico)",
    historicCounty: "West Lothian (Linlithgowshire)",
    country: "Scotland",
    capital: "Linlithgow / Livingston",
    region: "Scotland",
    keys: ["west_lothian", "linlithgow", "livingston", "bathgate", "oil_shale", "pumpherston", "linlithgow_palace", "ukm78"],
    s0_1: "Contea storica con le rovine del palazzo reale di Linlithgow e l'avveniristica industria scozzese di estrazione e distillazione degli scisti bituminosi a Pumpherston.",
    s2_4: "L'industria dello scisto bituminoso (Scottish Oils / BP) a Pumpherston diviene risorsa strategica nazionale per produrre paraffina, gasolio e benzina senza dipendere dal mare.",
    s5: "Le raffinerie di scisto del West Lothian lavorano a ciclo continuo: estrazione di centinaia di migliaia di tonnellate di petrolio sintetico per la difesa britannica.",
    s6: "Pumpherston rifornisce la marina e i trasporti interni di carburante sicuro; la Home Guard presidia i cumuli di scorie rosse ('bings') come posti d'avvistamento aereo.",
    s7: "West Lothian accoglie famiglie sfollate dai cantieri navali del Clyde bombardati dalla Luftwaffe; officine di Bathgate producono componentistica meccanica bellica.",
    s8: "Il carburante distillato dagli scisti del West Lothian garantisce la mobilità dei servizi d'emergenza e dei trasporti ferroviari durante le fasi più critiche del blocco atlantico.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM78"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM78"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM78"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM78"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM78"].s2_4;
      return UK_PROVINCES_META["UKM78"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM78"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM81": {
    nuts: "UKM81",
    name: "East Dunbartonshire, West Dunbartonshire and Helensburgh & Lomond",
    modernName: "East & West Dunbartonshire, Helensburgh & Lomond (Clydebank, Dumbarton)",
    historicalName: "Dunbartonshire (Dunbartonshire / John Brown Cantieri Queen Mary & Clydebank Blitz)",
    historicCounty: "Dunbartonshire",
    country: "Scotland",
    capital: "Dumbarton / Clydebank",
    region: "Scotland",
    keys: ["clydebank", "dumbarton", "helensburgh", "john_brown", "clydebank_blitz", "singer_factory", "denny_shipbuilders", "ukm81"],
    s0_1: "Capitale mondiale della costruzione navale pesante con i leggendari cantieri John Brown & Company a Clydebank (costruttori dei transatlantici Queen Mary e Queen Elizabeth) e la fabbrica Singer.",
    s2_4: "John Brown avvia la costruzione della corazzata HMS Duke of York e della portaerei HMS Indomitable; Singer converte le macchine da cucire alla fabbricazione di spolette e bossoli.",
    s5: "I cantieri di Clydebank e Dumbarton (William Denny & Brothers) lavorano a pieno ritmo: varo di cacciatorpediniere, navi scorta e motori a turbina per la Royal Navy.",
    s6: "Completamento in segreto del grandioso transatlantico Queen Elizabeth che salpa dal Clyde nel marzo 1940 sfuggendo agli U-Boot e diviene la più grande nave trasporto truppe alleata.",
    s7: "Riparazione accelerata delle navi della flotta; la fabbrica Singer produce oltre 300 milioni di bossoli per fucili e parti per fucili mitragliatori Bren.",
    s8: "Il devastante Clydebank Blitz (13-15 marzo 1941): 439 bombardieri tedeschi radono al suolo la cittadina (solo 7 case rimangono intatte su 12.000); 528 morti, ma i cantieri navali riprendono la produzione.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM81"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM81"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM81"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM81"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM81"].s2_4;
      return UK_PROVINCES_META["UKM81"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM81"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM82": {
    nuts: "UKM82",
    name: "Glasgow City",
    modernName: "City of Glasgow (Baile Chluaidh, Lanarkshire, Scotland)",
    historicalName: "Glasgow City (Lanarkshire / Seconda Città dell'Impero, Rolls-Royce Hillington & Cantieri del Clyde)",
    historicCounty: "Lanarkshire",
    country: "Scotland",
    capital: "Glasgow",
    region: "Scotland",
    keys: ["glasgow", "city_of_glasgow", "clydeside", "hillington", "rolls_royce_hillington", "north_british_locomotive", "second_city", "ukm82"],
    s0_1: "La 'Seconda Città dell'Impero' e superpotenza industriale del Regno: i cantieri navali del fiume Clyde, le locomotive North British a Springburn e le fabbriche meccaniche pesanti.",
    s2_4: "Nel 1939 Rolls-Royce avvia la costruzione della colossale Shadow Factory a Hillington (Glasgow) con oltre 25.000 dipendenti per la produzione di massa dei motori Merlin per caccia.",
    s5: "North British Locomotive Company produce centinaia di locomotive d'ordinanza e carri armati pesanti; la cassa comune del Clyde sostiene la produzione d'armamento.",
    s6: "Hillington consegna i primi motori Merlin che equipaggiano gli Spitfire e Hurricane della Battaglia d'Inghilterra; mobilitazione della leggendaria classe operaia di 'Red Clydeside'.",
    s7: "Glasgow subisce violente incursioni aeree della Luftwaffe durante il Blitz scozzese, ma la titanica capacità industriale delle sue officine continua a rifornire l'esercito e la marina.",
    s8: "Hillington produce oltre 23.000 motori Merlin e ne ripara altri 9.000 durante il conflitto; Glasgow è la fucina insostituibile della vittoria navale e aerea britannica.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM82"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM82"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM82"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM82"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM82"].s2_4;
      return UK_PROVINCES_META["UKM82"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM82"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM83": {
    nuts: "UKM83",
    name: "Inverclyde, East Renfrewshire and Renfrewshire",
    modernName: "Inverclyde, East Renfrewshire, Renfrewshire (Greenock, Paisley, Port Glasgow)",
    historicalName: "Inverclyde and Renfrewshire (Renfrewshire / Greenock Tail of the Bank & Cantieri Scotts)",
    historicCounty: "Renfrewshire",
    country: "Scotland",
    capital: "Paisley / Greenock",
    region: "Scotland",
    keys: ["inverclyde", "renfrewshire", "greenock", "paisley", "port_glasgow", "tail_of_the_bank", "scotts_shipbuilding", "greenock_blitz", "ukm83"],
    s0_1: "Sbocco marittimo sul Firth of Clyde con la grande rada riparata del 'Tail of the Bank', gli storici cantieri navali Scotts Shipbuilding & Engineering a Greenock e il cotone di Paisley.",
    s2_4: "Tail of the Bank viene designato dall'Ammiragliato come il principale punto di raduno, ancoraggio e composizione di tutti i convogli transatlantici della Gran Bretagna.",
    s5: "Centinaia di navi mercantili, corazzate e cacciatorpediniere gettano l'ancora al Tail of the Bank in attesa delle scorte; Scotts vara sommergibili e incrociatori pesanti.",
    s6: "I moli di Greenock e Gourock divengono la porta d'ingresso per centinaia di migliaia di soldati canadesi e americani sbarcati dalle 'Queen's'; Paisley tesse filo per paracadute.",
    s7: "Pattugliamenti instancabili di cacciatorpediniere di scorta salpati da Greenock; la rada ospita le navi della Royal Canadian Navy e della marina norvegese in esilio.",
    s8: "Il Greenock Blitz (6-7 maggio 1941): due notti di terrificanti bombardamenti aerei mirati ai cantieri navali causano 271 morti, ma le banchine continuano ad armare i convogli.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM83"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM83"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM83"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM83"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM83"].s2_4;
      return UK_PROVINCES_META["UKM83"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM83"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM84": {
    nuts: "UKM84",
    name: "North Lanarkshire",
    modernName: "North Lanarkshire (Coatbridge, Motherwell, Cumbernauld, Airdrie, Wishaw)",
    historicalName: "North Lanarkshire (Lanarkshire / Motherwell Siderurgia Colvilles & Carri Armati)",
    historicCounty: "Lanarkshire",
    country: "Scotland",
    capital: "Motherwell / Coatbridge",
    region: "Scotland",
    keys: ["north_lanarkshire", "motherwell", "coatbridge", "colvilles", "dalzell_steel", "ravenscraig", "steelopolis", "ukm84"],
    s0_1: "L'incontrastata 'Steelopolis' della Scozia: le titaniche acciaierie Colvilles (Dalzell Steelworks a Motherwell e Clydebridge) e i tubifici e fonderie pesanti di Coatbridge.",
    s2_4: "Colvilles diviene il principale fornitore di piastre corazzate laminate per scafi di corazzate, armature per torrette e piastre spesse per i carri armati della British Army.",
    s5: "Dalzell Steelworks fonde e lamina piastre corazzate d'acciaio speciale ad altissima resistenza per le nuove navi da guerra e per i carri armati da fanteria Matilda e Churchill.",
    s6: "Gli altiforni e i treni di laminazione di Motherwell lavorano 24 ore su 24 sotto rigido oscuramento; fonderie di Coatbridge producono parti per ponti mobili del genio.",
    s7: "La densa concentrazione siderurgica sfugge miracolosamente a bombardamenti diretti devastanti, garantendo il flusso ininterrotto di acciaio per le fabbriche di tutta la Gran Bretagna.",
    s8: "Colvilles produce oltre 1,5 milioni di tonnellate d'acciaio all'anno, costituendo la corazza indistruttibile su cui poggia l'intera potenza industriale bellica alleata.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM84"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM84"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM84"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM84"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM84"].s2_4;
      return UK_PROVINCES_META["UKM84"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM84"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM91": {
    nuts: "UKM91",
    name: "Scottish Borders",
    modernName: "Scottish Borders (Hawick, Galashiels, Peebles, Selkirk, Kelso, Berwickshire)",
    historicalName: "Scottish Borders (Borders / Tweed, Maglieria Termica Hawick & Tradizione Tessile)",
    historicCounty: "Roxburghshire, Selkirkshire, Peeblesshire, Berwickshire",
    country: "Scotland",
    capital: "Newtown St Boswells / Galashiels",
    region: "Scotland",
    keys: ["scottish_borders", "hawick", "galashiels", "tweed", "selkirk", "borders_knitwear", "ukm91"],
    s0_1: "Regione collinare delle valli del Tweed ricca di pascoli per pecore Cheviot, celebre per la maglieria di lusso di Hawick (cashmere e lana pettinata) e la tessitura del Tweed a Galashiels.",
    s2_4: "I lanifici dei Borders vengono contrattualizzati dal Ministero dell'Approvvigionamento per fabbricare capi termici protettivi d'alta quota e indumenti per marinai della flotta.",
    s5: "Hawick e Galashiels producono milioni di maglioni pesanti a collo alto, calzettoni termici e guanti per gli equipaggi di corazzate e cacciatorpediniere impegnati nelle gelide acque artiche.",
    s6: "Le comunità rurali dei Borders accolgono calorosamente migliaia di scolari sfollati dalle città bombardate; le colline ospitano campi d'addestramento per truppe polacche in esilio.",
    s7: "Fornitura essenziale di coperte pesanti per i rifugi antiaerei della popolazione civile e per gli ospedali militari; produzione agricola e silvicoltura al massimo rendimento.",
    s8: "I maglifici di Hawick vestono i piloti della RAF e i marinai dei convogli artici verso Murmansk, offrendo calore indispensabile per sopravvivere alle intemperie di guerra.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM91"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM91"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM91"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM91"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM91"].s2_4;
      return UK_PROVINCES_META["UKM91"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM91"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM92": {
    nuts: "UKM92",
    name: "Dumfries & Galloway",
    modernName: "Dumfries and Galloway (Dumfries, Stranraer, Annan, Wigtown, Kirkcudbright)",
    historicalName: "Dumfries and Galloway (Galloway & Dumfriesshire / Stranraer Porto Convogli & Idrovolanti Wig Bay)",
    historicCounty: "Dumfriesshire, Kirkcudbrightshire, Wigtownshire",
    country: "Scotland",
    capital: "Dumfries / Stranraer",
    region: "Scotland",
    keys: ["dumfries_and_galloway", "dumfries", "stranraer", "wig_bay", "cairnryan", "military_port_no1", "ukm92"],
    s0_1: "Costa e pascoli del sud-ovest scozzese con il porto di traghetti per l'Irlanda a Stranraer su Loch Ryan e la base d'idrovolanti di RAF Wig Bay.",
    s2_4: "L'Ammiragliato individua Loch Ryan come ancoraggio naturale riparatissimo per la costruzione di un grande porto militare ausiliario di riserva (Military Port No. 1 a Cairnryan).",
    s5: "Costruzione del monumentale porto segreto di Cairnryan con lunghi moli in cemento per movimentare carichi pesanti in caso di distruzione dei porti di Liverpool e Glasgow.",
    s6: "RAF Wig Bay diviene la principale base di manutenzione, riparazione e modifica per tutti gli idrovolanti Catalina e Sunderland in arrivo dagli Stati Uniti d'America.",
    s7: "Stranraer gestisce il traffico fondamentale di rifornimenti, truppe e corrieri diplomatici tra la Gran Bretagna e l'Irlanda del Nord sotto stretta sorveglianza.",
    s8: "Cairnryan ospita le prime sperimentazioni dei cassoni galleggianti in cemento armato che diverranno i famosi porti prefabbricati Mulberry dello sbarco in Normandia.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM92"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM92"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM92"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM92"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM92"].s2_4;
      return UK_PROVINCES_META["UKM92"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM92"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM93": {
    nuts: "UKM93",
    name: "East Ayrshire and North Ayrshire mainland",
    modernName: "East Ayrshire and North Ayrshire mainland (Kilmarnock, Irvine, Ardrossan)",
    historicalName: "Ayrshire North (Ayrshire / Ardeer Colosso Esplosivi Nobel & Kilmarnock Ingegneria)",
    historicCounty: "Ayrshire (Inbhir Àir)",
    country: "Scotland",
    capital: "Kilmarnock / Irvine",
    region: "Scotland",
    keys: ["east_ayrshire", "north_ayrshire", "ardeer", "nobel_explosives", "ici_nobel", "kilmarnock", "glenfield_kennedy", "ukm93"],
    s0_1: "Polo industriale dominato dallo stabilimento Nobel Explosives (ICI Ardeer tra le dune di sabbia, la più grande fabbrica di esplosivi d'Europa) e Glenfield & Kennedy a Kilmarnock.",
    s2_4: "Ardeer si prepara a produrre su scala colossale nitroglicerina, cordite, nitrocellulosa e acidi nitrici per le munizioni di tutto l'esercito e della marina britannica.",
    s5: "ICI Ardeer impiega oltre 13.000 lavoratori a ciclo continuo, producendo la maggioranza dei propellenti per proiettili d'artiglieria della nazione; Kilmarnock forgia valvole idrauliche.",
    s6: "Glenfield & Kennedy a Kilmarnock converte le fonderie alla produzione di corpi per proiettili perforanti navali e valvole per il controllo delle falle sulle navi da guerra.",
    s7: "Ardeer protetta da dune sabbiose naturali e rigorose misure di sicurezza antincendio, rifornendo continuamente gli arsenali di caricamento munizioni di tutto il Regno Unito.",
    s8: "La produzione chimica di Ardeer sostiene la richiesta crescente di esplosivi per le offensive di bombardamento strategico della RAF contro le industrie del Terzo Reich.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM93"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM93"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM93"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM93"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM93"].s2_4;
      return UK_PROVINCES_META["UKM93"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM93"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM94": {
    nuts: "UKM94",
    name: "South Ayrshire",
    modernName: "South Ayrshire (Ayr, Prestwick, Girvan, Maybole)",
    historicalName: "South Ayrshire (Ayrshire / Aeroporto di Prestwick & Ponte Aereo Atlantico Ferry Service)",
    historicCounty: "Ayrshire (Inbhir Àir)",
    country: "Scotland",
    capital: "Ayr",
    region: "Scotland",
    keys: ["south_ayrshire", "ayr", "prestwick", "prestwick_airport", "atlantic_ferry_service", "atfero", "ukm94"],
    s0_1: "Costa dell'Ayrshire dominata dalla città storica di Robert Burns ad Ayr e dall'aeroporto di Prestwick, famoso per il suo microclima eccezionale privo di nebbia.",
    s2_4: "Prestwick Airport viene scelto dal Ministero dell'Aria come terminale ideale per accogliere i voli transatlantici a lungo raggio provenienti dal Canada e dagli Stati Uniti.",
    s5: "Nascita dell'Atlantic Ferry Organisation (ATFERO): Prestwick diviene il capolinea europeo del leggendario ponte aereo che trasporta bombardieri dagli stabilimenti americani.",
    s6: "Piloti civili e militari (tra cui numerose coraggiose donne dell'ATA - Air Transport Auxiliary) atterrano a Prestwick con bombardieri Hudson, Catalina e B-17 appena costruiti.",
    s7: "Prestwick accoglie centinaia di velivoli americani ogni mese che vengono armati, revisionati e immediatamente inviati agli squadroni di prima linea del Bomber e Coastal Command.",
    s8: "L'aeroporto di Prestwick diviene il cordone ombelicale aereo transatlantico supremo della Gran Bretagna, permettendo la rapida consegna degli aerei del programma Lend-Lease.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM94"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM94"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM94"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM94"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM94"].s2_4;
      return UK_PROVINCES_META["UKM94"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM94"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKM95": {
    nuts: "UKM95",
    name: "South Lanarkshire",
    modernName: "South Lanarkshire (East Kilbride, Hamilton, Lanark, Rutherglen)",
    historicalName: "South Lanarkshire (Lanarkshire / Hamilton Bacini Minerari & Colture Agricole del Clyde)",
    historicCounty: "Lanarkshire",
    country: "Scotland",
    capital: "Hamilton / Lanark",
    region: "Scotland",
    keys: ["south_lanarkshire", "hamilton", "east_kilbride", "lanark", "rutherglen", "clyde_valley", "ukm95"],
    s0_1: "Paesaggio collinare e frutteti della Clyde Valley con i centri minerari di Hamilton e Rutherglen e la storica città mercato di Lanark.",
    s2_4: "I pozzi di carbone del South Lanarkshire intensificano l'estrazione per alimentare le acciaierie di Motherwell e le fonderie pesanti di Glasgow.",
    s5: "I minatori di Hamilton garantiscono milioni di tonnellate di combustibile fossile; le serre e i frutteti della Clyde Valley producono pomodori e frutta fresca per il razionamento.",
    s6: "South Lanarkshire diviene un polo d'accoglienza fondamentale per famiglie e bambini evacuati dal devastato lungofiume del Clyde; presidio della Home Guard rurale.",
    s7: "Fornitura essenziale di alimenti freschi e carbone termico; Lanark ospita mercati di bestiame strategici per la fornitura di carne all'esercito britannico.",
    s8: "Pieno sostegno alla produzione manifatturiera ausiliaria e addestramento di reparti territoriali destinati a integrare le divisioni delle Highlands.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKM95"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKM95"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKM95"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKM95"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKM95"].s2_4;
      return UK_PROVINCES_META["UKM95"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKM95"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKN06": {
    nuts: "UKN06",
    name: "Belfast",
    modernName: "Belfast (Béal Feirste, Northern Ireland)",
    historicalName: "Belfast (County Antrim & Down / Cantieri Navali Harland & Wolff & Belfast Blitz)",
    historicCounty: "County Antrim & County Down",
    country: "Northern Ireland",
    capital: "Belfast (Béal Feirste)",
    region: "Northern Ireland",
    keys: ["belfast", "beal_feirste", "harland_wolff", "short_harland", "belfast_blitz", "queens_island", "stirling_belfast", "ukn06"],
    s0_1: "Capitale dell'Irlanda del Nord e colosso cantieristico mondiale: i cantieri titanici di Harland & Wolff a Queen's Island (i più grandi d'Europa), Short & Harland e l'industria del lino.",
    s2_4: "Harland & Wolff avvia la costruzione della portaerei HMS Formidable, incrociatori classe Belfast e decine di navi da carico; Short & Harland fabbrica bombardieri Short Stirling.",
    s5: "Belfast diviene l'arsenale navale supremo del Mare d'Irlanda: oltre 35.000 operai a Queen's Island varano corazzate, portaerei e oltre 130 corvette antisommergibile classe Flower.",
    s6: "Consegna di navi scorta vitali per i convogli atlantici; Short & Harland produce centinaia di bombardieri pesanti quadrimotore Stirling; il governo dell'Ulster sostiene la causa imperiale.",
    s7: "Belfast inizialmente non protetta da caccia notturni né cortine fumogene a causa della distanza; i cantieri navali lavorano a pieno regime sotto blackout parziale.",
    s8: "Il tragico Belfast Blitz (aprile-maggio 1941, spec. Easter Raid): la Luftwaffe bombarda a tappeto la città provocando oltre 1.000 morti; vigili del fuoco dell'Eire neutrale accorrono da Dublino in soccorso.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKN06"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKN06"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKN06"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKN06"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKN06"].s2_4;
      return UK_PROVINCES_META["UKN06"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKN06"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKN07": {
    nuts: "UKN07",
    name: "Armagh City, Banbridge and Craigavon",
    modernName: "Armagh City, Banbridge and Craigavon (County Armagh / Down)",
    historicalName: "Armagh and Craigavon (County Armagh / Città Cattedrale di San Patrizio & Frutteti)",
    historicCounty: "County Armagh & County Down",
    country: "Northern Ireland",
    capital: "Armagh / Craigavon",
    region: "Northern Ireland",
    keys: ["armagh", "banbridge", "craigavon", "orchard_county", "st_patrick", "portadown", "lurgan", "ukn07"],
    s0_1: "La storica 'Orchard County' con la città primaziale di Armagh (sede delle cattedrali dedicate a San Patrizio), i mercati del lino di Lurgan e Portadown e frutteti di mele Bramley.",
    s2_4: "I telai di Banbridge e Lurgan convertono le linee alla filatura di tela di lino speciale per le ali degli aerei da caccia e addestramento e filati per paracadute.",
    s5: "Armagh intensifica la produzione di mele e conserve per le razioni militari dell'esercito; i campi attorno a Portadown vengono adibiti ad addestramento truppe territoriali.",
    s6: "Presidio delle vie di comunicazione interne dell'Ulster; accoglienza di bambini evacuati dai quartieri popolari industriali di Belfast.",
    s7: "Le caserme di Armagh ospitano reparti dell'esercito britannico e scorte munizioni; fornitura di tela di lino per la fabbricazione delle fusoliere dei bombardieri leggeri.",
    s8: "Supporto alle campagne agroalimentari e cooperazione con i centri di telecomunicazione militare della regione confinante con l'Eire.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKN07"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKN07"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKN07"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKN07"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKN07"].s2_4;
      return UK_PROVINCES_META["UKN07"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKN07"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKN08": {
    nuts: "UKN08",
    name: "Newry, Mourne and Down",
    modernName: "Newry, Mourne and Down (County Down / Armagh, Northern Ireland)",
    historicalName: "Newry and Mourne (County Down / Montagne di Mourne & Canale di Carlingford)",
    historicCounty: "County Down & County Armagh",
    country: "Northern Ireland",
    capital: "Newry / Downpatrick",
    region: "Northern Ireland",
    keys: ["newry", "mourne", "mourne_mountains", "downpatrick", "carlingford_lough", "kilkeel", "ukn08"],
    s0_1: "Le spettacolari montagne di Mourne che scendono verso il mare a Carlingford Lough, la storica tomba di San Patrizio a Downpatrick e il porto fluviale di Newry.",
    s2_4: "Sorveglianza speciale del confine terrestre con la contea di Louth nell'Eire neutrale; contrasto alle infiltrazioni clandestine e al contrabbando lungo il confine.",
    s5: "Newry diviene punto nevralgico di frontiera sotto stretto controllo doganale e militare; i pescatori di Kilkeel riforniscono di pesce fresco l'Irlanda del Nord e la Gran Bretagna.",
    s6: "Fortificazioni costiere e posti d'avvistamento lungo Carlingford Lough per scongiurare incursioni sottomarine o tentativi di sbarco nemico sulla costa irlandese.",
    s7: "Pattugliamento delle brughiere dei monti Mourne da parte dell'Ulster Defence Volunteers / Home Guard; accoglienza di sfollati scampati al Belfast Blitz.",
    s8: "La flotta peschereccia di Kilkeel continua a operare nel Mare d'Irlanda sotto la minaccia di mine galleggianti, sostenendo il razionamento alimentare dell'Ulster.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKN08"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKN08"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKN08"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKN08"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKN08"].s2_4;
      return UK_PROVINCES_META["UKN08"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKN08"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKN09": {
    nuts: "UKN09",
    name: "Ards and North Down",
    modernName: "Ards and North Down (County Down, Northern Ireland)",
    historicalName: "Ards and North Down (County Down / Base Caccia RAF Ballyhalbert & Strangford Lough)",
    historicCounty: "County Down",
    country: "Northern Ireland",
    capital: "Bangor / Newtownards",
    region: "Northern Ireland",
    keys: ["ards", "north_down", "bangor", "newtownards", "ballyhalbert", "raf_ballyhalbert", "strangford_lough", "ukn09"],
    s0_1: "Penisola di Ards affacciata sul Mare d'Irlanda con la riserva marina di Strangford Lough, la stazione balneare di Bangor e l'aerodromo di Newtownards.",
    s2_4: "L'aerodromo di Newtownards diviene sede di una scuola di volo elementare della RAF per formare centinaia di piloti volontari dell'Irlanda del Nord.",
    s5: "Costruzione accelerata della base caccia di RAF Ballyhalbert sulla penisola di Ards per fornire copertura aerea diretta al porto e ai cantieri navali di Belfast.",
    s6: "RAF Ballyhalbert entra in operatività ospitando squadroni di caccia Spitfire e Hurricane; Bangor allestisce postazioni di soccorso navale per aerei ammarati.",
    s7: "I piloti di Ballyhalbert (compresi squadroni di volontari polacchi e australiani) difendono i cieli dell'Ulster contro gli incursori della Luftwaffe durante il Blitz.",
    s8: "Ballyhalbert diviene la principale sentinella aerea a guardia delle rotte navali del canale del Nord che collegano il Mare d'Irlanda all'Oceano Atlantico.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKN09"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKN09"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKN09"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKN09"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKN09"].s2_4;
      return UK_PROVINCES_META["UKN09"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKN09"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKN0A": {
    nuts: "UKN0A",
    name: "Derry City and Strabane",
    modernName: "Derry City and Strabane (Doire, Northern Ireland)",
    historicalName: "Derry City and Strabane (County Londonderry / Base Navale Avanzata Lisahally Western Approaches)",
    historicCounty: "County Londonderry & County Tyrone",
    country: "Northern Ireland",
    capital: "Derry (Londonderry / Doire)",
    region: "Northern Ireland",
    keys: ["derry", "londonderry", "doire", "strabane", "lisahally", "western_approaches_base", "foyle", "ukn0a"],
    s0_1: "La storica città murata sulle rive del fiume Foyle (Derry/Londonderry), centro commerciale e industriale celebre per la manifattura di camicie di qualità.",
    s2_4: "L'Ammiragliato individua il porto fluviale profondo di Lisahally sul Lough Foyle come la base navale più avanzata a ovest di tutto il Regno Unito per i convogli.",
    s5: "Apertura della base navale HMS Ferret a Derry/Lisahally: diviene il porto operativo fondamentale per i gruppi di scorta navale britannici e della Royal Canadian Navy.",
    s6: "Derry diviene la capitale delle corvette e dei cacciatorpediniere che combattono la Battaglia dell'Atlantico; migliaia di marinai canadesi e britannici si insediano nella città.",
    s7: "Le fabbriche tessili di camicie di Derry convertono le linee alla produzione di uniformi militari; Lisahally ripara e rifornisce centinaia di navi di scorta ai convogli.",
    s8: "Accordo segreto con gli Stati Uniti: ingegneri civili americani avviano a Derry la costruzione della grande base navale US Navy (Naval Operating Base Londonderry) mesi prima di Pearl Harbor.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKN0A"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKN0A"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKN0A"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKN0A"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKN0A"].s2_4;
      return UK_PROVINCES_META["UKN0A"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKN0A"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKN0B": {
    nuts: "UKN0B",
    name: "Mid Ulster",
    modernName: "Mid Ulster (Dungannon, Cookstown, Magherafelt, Northern Ireland)",
    historicalName: "Mid Ulster (County Tyrone & Londonderry / Cuore Agricolo, Lino & Campi RAF Cluntoe)",
    historicCounty: "County Tyrone & County Londonderry",
    country: "Northern Ireland",
    capital: "Dungannon / Cookstown",
    region: "Northern Ireland",
    keys: ["mid_ulster", "dungannon", "cookstown", "magherafelt", "cluntoe", "raf_cluntoe", "lough_neagh_west", "ukn0b"],
    s0_1: "Cuore geografico dell'Ulster affacciato sulla sponda occidentale del Lough Neagh con Dungannon (storica sede dei principi O'Neill) e i mercati agricoli di Cookstown.",
    s2_4: "Intensificazione della coltivazione del lino ('flax') nei campi del Mid Ulster per rifornire la vitale industria tessile aeronautica e militare britannica.",
    s5: "Individuazione dei vasti terreni pianeggianti vicino a Cluntoe per la costruzione della grande base aerea militare RAF Cluntoe a guardia del Lough Neagh.",
    s6: "Le comunità rurali producono uova, carne e burro per il sostentamento delle forze armate; addestramento dei reparti della Home Guard dell'Ulster.",
    s7: "Costruzione di piste di decollo in calcestruzzo a Cluntoe capaci di accogliere bombardieri pesanti quadrimotore; accoglienza di famiglie sfollate da Belfast.",
    s8: "RAF Cluntoe entra in funzione come scuola di pilotaggio e deposito velivoli, fornendo un presidio di sicurezza interno nel cuore dell'Irlanda del Nord.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKN0B"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKN0B"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKN0B"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKN0B"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKN0B"].s2_4;
      return UK_PROVINCES_META["UKN0B"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKN0B"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKN0C": {
    nuts: "UKN0C",
    name: "Causeway Coast and Glens",
    modernName: "Causeway Coast and Glens (Coleraine, Ballymoney, Moyle, Limavady)",
    historicalName: "Causeway Coast and Glens (County Antrim & Londonderry / Giant's Causeway & RAF Limavady)",
    historicCounty: "County Antrim & County Londonderry",
    country: "Northern Ireland",
    capital: "Coleraine",
    region: "Northern Ireland",
    keys: ["causeway_coast", "giants_causeway", "coleraine", "limavady", "ballymoney", "raf_limavady", "raf_ballykelly", "ukn0c"],
    s0_1: "Costa leggendaria del Giant's Causeway (colonne basaltiche patrimonio naturale) affacciata sull'Oceano Atlantico e sul Canale del Nord; porto fluviale di Coleraine.",
    s2_4: "Costruzione delle basi aeree del Coastal Command a RAF Limavady e RAF Ballykelly lungo le rive pianeggianti del Lough Foyle per proteggere l'accesso navale a Derry.",
    s5: "RAF Limavady e Ballykelly diventano operative con bombardieri Lockheed Hudson e Wellington a lungo raggio per la caccia antisommergibile atlantica.",
    s6: "Gli aerei di Limavady pattugliano giorno e notte le rotte dei convogli atlantici scortando i mercantili carichi di aiuti americani; difese costiere anti-incursione.",
    s7: "Gli equipaggi di Limavady e Ballykelly avvistano e attaccano numerosi U-Boot tedeschi che tentano di sorprendere i convogli al largo delle coste settentrionali irlandesi.",
    s8: "Le basi della Causeway Coast consolidano il primato come scudo aereo oceanico avanzato, decisivo per vincere la Battaglia dell'Atlantico.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKN0C"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKN0C"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKN0C"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKN0C"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKN0C"].s2_4;
      return UK_PROVINCES_META["UKN0C"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKN0C"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKN0D": {
    nuts: "UKN0D",
    name: "Antrim and Newtownabbey",
    modernName: "Antrim and Newtownabbey (County Antrim, Northern Ireland)",
    historicalName: "Antrim and Newtownabbey (County Antrim / RAF Aldergrove Cuore Aereo dell'Irlanda del Nord)",
    historicCounty: "County Antrim",
    country: "Northern Ireland",
    capital: "Antrim / Newtownabbey",
    region: "Northern Ireland",
    keys: ["antrim", "newtownabbey", "aldergrove", "raf_aldergrove", "lough_neagh", "ballyclare", "ukn0d"],
    s0_1: "Contea affacciata sul lago Lough Neagh e a nord di Belfast, sede della principale e più vasta base della Royal Air Force in Irlanda del Nord: RAF Aldergrove.",
    s2_4: "RAF Aldergrove viene ampliata con moderne piste in asfalto, hangar corazzati e stazioni radio per coordinare l'intera difesa aerea dell'Ulster.",
    s5: "Aldergrove ospita squadroni di caccia per la difesa di Belfast e aerei da pattugliamento marittimo a lungo raggio del Coastal Command; oscuramento totale.",
    s6: "Durante la Battaglia d'Inghilterra e i raid atlantici, Aldergrove mantiene la sorveglianza sui cieli occidentali; Newtownabbey produce parti meccaniche per i cantieri navali.",
    s7: "Squadroni di caccia notturni decollati da Aldergrove tentano di intercettare i bombardieri tedeschi durante le feroci notti del Belfast Blitz dell'aprile 1941.",
    s8: "RAF Aldergrove diviene la porta aerea principale per il transito delle personalità militari e civili britanniche e americane dirette in Irlanda del Nord.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKN0D"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKN0D"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKN0D"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKN0D"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKN0D"].s2_4;
      return UK_PROVINCES_META["UKN0D"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKN0D"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKN0E": {
    nuts: "UKN0E",
    name: "Lisburn and Castlereagh",
    modernName: "Lisburn and Castlereagh (County Antrim / Down, Northern Ireland)",
    historicalName: "Lisburn and Castlereagh (County Antrim & Down / Quartier Generale British Army Northern Ireland)",
    historicCounty: "County Antrim & County Down",
    country: "Northern Ireland",
    capital: "Lisburn",
    region: "Northern Ireland",
    keys: ["lisburn", "castlereagh", "lisburn_hq", "thiepval_barracks", "northern_ireland_district", "ukn0e"],
    s0_1: "Città storica sul fiume Lagan celebre per la manifattura del lino damascato e sede di Thiepval Barracks, il quartier generale del Northern Ireland District del British Army.",
    s2_4: "Da Thiepval Barracks a Lisburn, i generali britannici coordinano l'addestramento e la dislocazione di tutte le truppe regolari e territoriali dell'Irlanda del Nord.",
    s5: "Lisburn diviene il centro di comando strategico militare terrestre supremo dell'Ulster; allestimento di reti di comunicazione telefoniche protette con Londra.",
    s6: "Coordinamento delle difese territoriali in caso di invasione tedesca dell'Irlanda (Operazione Kathleen/Grün); Thiepval Barracks accoglie reparti dell'esercito.",
    s7: "Le caserme di Lisburn coordinano i soccorsi d'emergenza dell'esercito e la rimozione macerie a Belfast durante i devastanti raid aerei della Luftwaffe.",
    s8: "Lisburn prepara i piani e le infrastrutture logistiche destinate ad accogliere le prime grandi formazioni di truppe delle forze armate americane in Europa.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKN0E"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKN0E"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKN0E"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKN0E"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKN0E"].s2_4;
      return UK_PROVINCES_META["UKN0E"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKN0E"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKN0F": {
    nuts: "UKN0F",
    name: "Mid and East Antrim",
    modernName: "Mid and East Antrim (Ballymena, Larne, Carrickfergus)",
    historicalName: "Mid and East Antrim (County Antrim / Larne Porto Traghetti, Alluminio & Castello di Carrickfergus)",
    historicCounty: "County Antrim",
    country: "Northern Ireland",
    capital: "Ballymena / Larne",
    region: "Northern Ireland",
    keys: ["mid_and_east_antrim", "ballymena", "larne", "carrickfergus", "larne_port", "british_aluminium_larne", "ukn0f"],
    s0_1: "Contea costiera con il porto traghetti essenziale di Larne (collegamento marittimo più breve con Stranraer in Scozia), il castello normanno di Carrickfergus e Ballymena.",
    s2_4: "Lo stabilimento British Aluminium a Larne raffina la bauxite per estrarre allumina pura, materia prima fondamentale per la fusione dell'alluminio aeronautico.",
    s5: "Il porto di Larne diviene la rotta di traghetto vitale per il transito rapido e protetto di truppe, munizioni e rifornimenti tra la Gran Bretagna e l'Irlanda del Nord.",
    s6: "Carrickfergus ospita una fabbrica di paracadute e abbigliamento militare; la British Aluminium a Larne opera a ciclo continuo sotto rigido oscuramento.",
    s7: "Larne garantisce il traffico navale anche nelle notti più buie del Blitz; accoglienza a Ballymena di centinaia di famiglie scampate ai raid su Belfast.",
    s8: "Carrickfergus allestisce depositi e caserme che accoglieranno i celebri United States Army Rangers per il loro addestramento iniziale sul suolo europeo.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKN0F"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKN0F"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKN0F"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKN0F"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKN0F"].s2_4;
      return UK_PROVINCES_META["UKN0F"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKN0F"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
  "UKN0G": {
    nuts: "UKN0G",
    name: "Fermanagh and Omagh",
    modernName: "Fermanagh and Omagh (County Fermanagh / Tyrone, Northern Ireland)",
    historicalName: "Fermanagh and Omagh (County Fermanagh & Tyrone / Lough Erne Castle Archdale & Corridoio di Donegal)",
    historicCounty: "County Fermanagh & County Tyrone",
    country: "Northern Ireland",
    capital: "Enniskillen / Omagh",
    region: "Northern Ireland",
    keys: ["fermanagh", "omagh", "enniskillen", "castle_archdale", "lough_erne", "donegal_corridor", "flying_boats_erne", "catalina_bismarck", "ukn0g"],
    s0_1: "Paesaggio d'incantevole bellezza sui laghi di Lough Erne con la città isola di Enniskillen, le caserme dei Royal Inniskilling Fusiliers e la città mercato di Omagh.",
    s2_4: "Lough Erne viene scelto per la sua ampiezza e calma come base ideale per idrovolanti militari a lungo raggio del RAF Coastal Command (RAF Castle Archdale).",
    s5: "Apertura della base idrovolanti di RAF Castle Archdale con gli idrovolanti Consolidated PBY Catalina e Short Sunderland per la sorveglianza dell'Atlantico centrale.",
    s6: "Accordo segreto cruciale tra il governo britannico e il primo ministro dell'Eire neutrale Éamon de Valera: viene creato il segretissimo 'Donegal Corridor'.",
    s7: "Grazie al 'Donegal Corridor', gli idrovolanti britannici possono sorvolare legalmente il territorio irlandese neutrale per raggiungere l'Atlantico risparmiando ore di volo e carburante.",
    s8: "26 maggio 1941: un idrovolante Catalina del No. 209 Squadron decollato da Castle Archdale guidato da Leonard B. Smith individua la corazzata Bismarck in fuga nell'Atlantico, consentendone l'affondamento.",
    getNote: (s: number) => {
      if (s >= 8) return UK_PROVINCES_META["UKN0G"].s8;
      if (s >= 7) return UK_PROVINCES_META["UKN0G"].s7;
      if (s >= 6) return UK_PROVINCES_META["UKN0G"].s6;
      if (s >= 5) return UK_PROVINCES_META["UKN0G"].s5;
      if (s >= 2) return UK_PROVINCES_META["UKN0G"].s2_4;
      return UK_PROVINCES_META["UKN0G"].s0_1;
    },
    getHistoricalName: (s: number) => {
      return UK_PROVINCES_META["UKN0G"].historicalName;
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Chamberlain)";
      if (s < 6) return "Regno Unito di Gran Bretagna e Irlanda del Nord (War Cabinet Chamberlain - Churchill)";
      return "Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)";
    },
    getSovereign: (s: number) => {
      return "UK";
    },
    getFaction: (s: number) => {
      return 'Alleati' as FactionType;
    },
  },
};

/**
 * Risolve una provincia/distretto del Regno Unito o Crown Dependency per uno specifico timeline step.
 */
export function resolveUKProvince(
  idOrKey: string,
  s: number = 0,
  rawName?: string
): ResolvedTerritory | null {
  const cleanId = String(idOrKey || "").trim().toUpperCase();
  let meta = UK_PROVINCES_META[cleanId];

  if (!meta) {
    const rawClean = String(rawName || idOrKey || "").trim();
    const norm = rawClean.toLowerCase().replace(/[^a-z0-9]/g, "_");
    for (const item of Object.values(UK_PROVINCES_META)) {
      if (item.nuts.toLowerCase() === norm || item.keys.includes(norm)) {
        meta = item;
        break;
      }
    }
    if (!meta) {
      for (const item of Object.values(UK_PROVINCES_META)) {
        if (item.keys.some(k => norm === k || (k.length >= 4 && norm.includes(k)))) {
          meta = item;
          break;
        }
      }
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
 * Popola il dizionario toponomastico storico con le 182 entita del Regno Unito e Crown Dependencies.
 */
export function populateUKToponyms(dict: Record<string, any>): void {
  if (!dict["UK"]) dict["UK"] = {};
  if (!dict["GB"]) dict["GB"] = {};
  if (!dict["GER"]) dict["GER"] = {};

  for (const [key, item] of Object.entries(UK_PROVINCES_META)) {
    const match = {
      historicalName: item.historicalName,
      adminTitle: item.getAdminTitle(0),
      historicalNote: item.s0_1,
      name: item.name,
      modernName: item.modernName,
      historicCounty: item.historicCounty,
      country: item.country,
      capital: item.capital,
      region: item.region,
      note: item.s0_1,
    };

    const normName = item.name.toLowerCase().replace(/[^a-z0-9]/g, "_");
    const lowId = item.nuts.toLowerCase().replace(/[^a-z0-9]/g, "_");

    dict["UK"][normName] = match;
    dict["UK"][lowId] = match;
    dict["GB"][normName] = match;
    dict["GB"][lowId] = match;
    dict[lowId] = match;
    dict[normName] = match;

    for (const k of item.keys) {
      dict["UK"][k] = match;
      dict["GB"][k] = match;
      dict[k] = match;
    }
  }
}
