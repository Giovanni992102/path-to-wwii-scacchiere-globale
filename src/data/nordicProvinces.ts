/**
 * Censimento Geocartografico e Toponomastico Dettagliato dei Regni di Norvegia e Danimarca (1936-1945)
 * Copertura esaustiva di tutti i 13 Fylker della Norvegia (NUTS-3) e degli 11 Amter/Landsdele della Danimarca (NUTS-3).
 *
 * Ingegnerizzazione e Schede Storiche per ciascuna provincia:
 * - NORVEGIA (13 entità NUTS-3):
 *   NO081: Oslo (Hovedstaden — Akershus, Victoria Terrasse, Gestapo HQ, Oslogjengen)
 *   NO082: Viken (Akershus, Buskerud, Østfold — Fortezza di Oscarsborg, affondamento Blücher, rotte di fuga verso la Svezia)
 *   NO020: Innlandet (Hedmark e Oppland — Elverum "Kongens nei" di Re Haakon VII, battaglie di Gudbrandsdalen)
 *   NO091: Vestfold og Telemark (Horten base navale; Rjukan / Vemork sabotaggio dell'acqua pesante Operazione Gunnerside)
 *   NO092: Agder (Aust-Agder e Vest-Agder — Kristiansand, affondamento Karlsruhe, batteria costiera pesante Batterie Vara a Møvik)
 *   NO0A1: Rogaland (Stavanger, aeroporto di Sola catturato dai Fallschirmjäger il 9 aprile 1940, Atlantikwall)
 *   NO0A2: Vestland (Hordaland e Sogn og Fjordane — Bergen base sottomarina bunker Bruno, raid di Måløy Operazione Archery)
 *   NO0A3: Møre og Romsdal (Åndalsnes sbarco Sickleforce, Molde rifugio del Re e del tesoro aureo, Shetland Bus)
 *   NO060: Trøndelag (Trondheim cattedrale e base U-Boot Dora I/II, Namsos sbarco Mauriceforce del Gen. Carton de Wiart)
 *   NO071: Nordland (Narvik battaglie navali e terrestri, vittoria del Gen. Fleischer 28 maggio 1940, raid delle Lofoten)
 *   NO074: Troms og Finnmark (Tromsø affondamento corazzata Tirpitz con bombe Tallboy; Kirkenes liberata dall'Armata Rossa a Step 16)
 *   NO0B1: Jan Mayen (Stazione meteo strategica artica presidiata da Norvegia Libera e Alleati)
 *   NO0B2: Svalbard (Spitsbergen, Longyearbyen, Barentsburg — Operazioni Gauntlet, Fritham e Zitronella)
 *
 * - DANIMARCA (11 entità NUTS-3):
 *   DK011: Byen København (Copenaghen — Amalienborg, Kastellet, autoaffondamento flotta a Holmen, Shellhus raid Mosquito RAF)
 *   DK012: Københavns omegn (Cintura industriale di Copenaghen — cantieri navali Burmeister & Wain, resistenza BOPA e Holger Danske)
 *   DK013: Nordsjælland (Helsingør — salvataggio via mare di 7.200 ebrei danesi verso la Svezia neutrale nell'ottobre 1943)
 *   DK014: Bornholm (Rønne e Neksø — presidio tedesco isolato fino all'8 maggio 1945, bombardamento e liberazione sovietica)
 *   DK021: Østsjælland (Roskilde — antica cattedrale mausoleo reale, snodo ferroviario centrale per il canale di Storebælt)
 *   DK022: Vest- og Sydsjælland (Korsør, Slagelse, Næstved, Møn, Lolland e Falster — snodo traghetti Storebælt e Gedser)
 *   DK031: Fyn (Fionia — Odense, terra di H.C. Andersen, sciopero generale anti-nazista Folkestrejken nell'agosto 1943)
 *   DK032: Sydjylland (Jutland Meridionale / Nordslesvig — Aabenraa, Haderslev, Tønder — confine 1920, scontri all'alba del 9 aprile 1940)
 *   DK041: Vestjylland (Esbjerg, Ringkøbing — batterie costiere e radar pesanti dell'Atlantikwall sul Mare del Nord)
 *   DK042: Østjylland (Aarhus, Horsens, Vejle, Silkeborg — comando militare tedesco dello Jutland, raid Mosquito su Aarhus)
 *   DK050: Nordjylland (Aalborg, Frederikshavn, Skagen — aeroporti trampolino di lancio Weserübung, fortezza Batterie Hanstholm)
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

export interface NordicProvinceMeta {
  nuts: string;
  name: string;
  modernName: string;
  historicalName: string;
  capital: string;
  country: 'NOR' | 'DEN';
  keys: string[];
  s0_5_name: string;
  s0_5_note: string;
  s6_12_name: string;
  s6_12_note: string;
  s13_15_name: string;
  s13_15_note: string;
  s16_name: string;
  s16_note: string;
  s17_name: string;
  s17_note: string;
  adminTitleNorwayExile?: string;
  adminTitleGerman?: string;
}

// ============================================================================
// 1. REGISTRO STORICO PROVINCE DELLA NORVEGIA (NUTS-3)
// ============================================================================
export const NORWAY_PROVINCES_META: Record<string, NordicProvinceMeta> = {
  NO081: {
    nuts: 'NO081',
    name: 'Oslo',
    modernName: 'Oslo (Hovedstaden)',
    historicalName: 'Oslo (Hovedstad Kongeriket Norge)',
    capital: 'Oslo',
    country: 'NOR',
    keys: ['no081', 'oslo', 'kristiania'],
    s0_5_name: 'Oslo (Hovedstaden — Kongeriket Norge)',
    s0_5_note:
      'Capitale del Regno di Norvegia, sede della Corona di Re Haakon VII (Glücksburg), del parlamento (Storting) e del governo laburista di Johan Nygaardsvold. Politica di rigorosa neutralità marittima scandinava.',
    s6_12_name: 'Oslo (Reichskommissariat Norwegen — Sede di Josef Terboven)',
    s6_12_note:
      '9 aprile 1940: grazie all\'affondamento dell\'incrociatore Blücher a Oscarsborg, il Re e il governo sfuggono alla cattura; la Luftwaffe occupa Fornebu e Vidkun Quisling tenta il colpo di stato radiofonico. Il 24 aprile 1940 Hitler insedia Josef Terboven quale Reichskommissar. Il 1° febbraio 1942 alla fortezza di Akershus si tiene la "Statsakten" che proclama Quisling Ministro-Presidente del governo fantoccio (Nasjonal regjering). Terrore della Gestapo al quartier generale di Victoria Terrasse.',
    s13_15_name: 'Oslo (Quartier Generale Wehrmacht & Azioni dei Sabotatori Milorg)',
    s13_15_note:
      'La capitale è il cuore del comando della Wehrmacht e della Gestapo (Victoria Terrasse), ma anche il bersaglio primario della squadra speciale d\'assalto "Oslogjengen" guidata da Gunnar Sønsteby ("Kjakan") e Max Manus: clamorosi sabotaggi contro le liste dell\'Arbeidstjeneste, fabbriche belliche e depositi di carburante della Kriegsmarine.',
    s16_name: 'Oslo (Festung Norwegen — Terboven & Presidio Wehrmacht in Allarme)',
    s16_note:
      'Dicembre 1944: con la liberazione della Francia e l\'avanzata sovietica nel Finnmark, il Reichskommissar Terboven e il generale Franz Böhme trasformano la Norvegia meridionale in una fortezza assediata (Festung Norwegen), intensificando la caccia ai capi della resistenza clandestina Milorg.',
    s17_name: 'Oslo (Sacca di Norvegia — Resa della Wehrmacht al Milorg & Alleati)',
    s17_note:
      'Aprile-Maggio 1945: oltre 350.000 soldati tedeschi rimangono isolati in Norvegia senza collegamenti con il Reich distrutto. L\'8 maggio 1945 Josef Terboven si suicida con 50 kg di dinamite nel bunker di Skaugum; Quisling si arrende il 9 maggio a Møllergata 19. Le forze del Milorg guidate da Jens Christian Hauge e la Allied Force 134 assumono il controllo pacifico della capitale, preparando il trionfale ritorno di Re Haakon VII il 7 giugno 1945.',
    adminTitleGerman: 'Reichskommissariat Norwegen (Reichskommissar Josef Terboven, Oslo)',
    adminTitleNorwayExile: 'Kongeriket Norge — Hovedstaden Oslo (Regjeringen Nygaardsvold)',
  },

  NO082: {
    nuts: 'NO082',
    name: 'Viken',
    modernName: 'Viken (Akershus, Buskerud, Østfold)',
    historicalName: 'Akershus, Buskerud og Østfold Fylker',
    capital: 'Drammen / Moss',
    country: 'NOR',
    keys: ['no082', 'viken', 'akershus', 'buskerud', 'ostfold', 'østfold', 'drammen', 'kongsberg', 'drobak', 'drøbak', 'honefoss', 'hønefoss', 'moss', 'sarpsborg', 'halden'],
    s0_5_name: 'Akershus, Buskerud og Østfold (Oslofjorden)',
    s0_5_note:
      'Regno di Norvegia — Fylker affacciati sull\'Oslofjord e sul confine svedese. Distretti industriali di Drammen, officine d\'armi di Kongsberg, cantieri e cartiere lungo il fiume Glomma.',
    s6_12_name: 'Viken (L\'Affondamento della Blücher a Oscarsborg & Occupazione)',
    s6_12_note:
      'All\'alba del 9 aprile 1940, la Fortezza di Oscarsborg nello stretto di Drøbak, comandata dal colonnello Birger Eriksen, apre il fuoco con cannoni Krupp da 28 cm e lancia siluri contro l\'incrociatore pesante Blücher, affondandolo e uccidendo oltre 800 soldati d\'invasione tedeschi. L\'azione salva la famiglia reale e il parlamento.',
    s13_15_name: 'Viken (Corridoio di Fuga della Resistenza verso la Svezia)',
    s13_15_note:
      'Le fitte foreste dell\'Østfold e di Akershus diventano il principale corridoio segreto dei "Grenseloser" (guide confinarie), attraverso cui oltre 50.000 rifugiati norvegesi ed ebrei fuggono nella neutrale Svezia con l\'aiuto del Milorg.',
    s16_name: 'Viken (Presidio Wehrmacht & Mobilitazione Clandestina Milorg D-13)',
    s16_note:
      'I distretti partigiani del Milorg attorno a Drammen e all\'Oslofjord ricevono massicci rifornimenti di armi e mitragliatori Sten paracadutati dalla RAF britannica, predisponendosi a proteggere le dighe e le centrali elettriche.',
    s17_name: 'Viken (Resa dei Presidi Tedeschi dell\'Oslofjord)',
    s17_note:
      'Aprile-Maggio 1945: le guarnigioni della Wehrmacht dell\'Oslofjord depongono le armi senza spargimento di sangue davanti ai comandi del Milorg e della Allied Force 134.',
    adminTitleGerman: 'Reichskommissariat Norwegen — Gebietskommissariat Oslofjord',
    adminTitleNorwayExile: 'Kongeriket Norge — Fylkene Akershus, Buskerud og Østfold',
  },

  NO020: {
    nuts: 'NO020',
    name: 'Innlandet',
    modernName: 'Innlandet (Hedmark e Oppland)',
    historicalName: 'Hedmark og Oppland Fylker (Gudbrandsdalen og Østerdalen)',
    capital: 'Hamar / Lillehammer',
    country: 'NOR',
    keys: ['no020', 'innlandet', 'hedmark', 'oppland', 'hamar', 'lillehammer', 'elverum', 'gjovik', 'gjøvik', 'kongsvinger', 'gudbrandsdalen'],
    s0_5_name: 'Hedmark og Oppland (Innlandet — Norske Høyfjell)',
    s0_5_note:
      'Regno di Norvegia — Cuore valligiano e montano della Norvegia interna, comprendente le valli di Gudbrandsdalen e Østerdalen, il lago Mjøsa e i massicci di Jotunheimen e Rondane.',
    s6_12_name: 'Hedmark og Oppland (Elverum: "Kongens nei" & Battaglia di Gudbrandsdal)',
    s6_12_note:
      'Il 10-11 aprile 1940 a Elverum, Re Haakon VII pronuncia lo storico "Kongens nei" (Il No del Re), rifiutando l\'ultimatum di Hitler di nominare Quisling primo ministro. Per rappresaglia la Luftwaffe bombarda e distrugge Elverum e Nybergsund. Le truppe della 2ª Divisione norvegese combattono accanitamente nella valle di Gudbrandsdal.',
    s13_15_name: 'Innlandet (Rifugio Montano del Milorg & Lanci SOE)',
    s13_15_note:
      'Le foreste e gli altipiani di Hedmark e Oppland ospitano i campi d\'addestramento clandestini della resistenza (Milorg distretti 24 e 25), riforniti costantemente dalle missioni aeree del SOE britannico.',
    s16_name: 'Innlandet (Ghiacciai e Valli sotto Occupazione della Wehrmacht)',
    s16_note:
      'Presidio Wehrmacht lungo l\'asse ferroviario di Dovrebanen; rigido razionamento del legname e dei prodotti agricoli; i reparti da montagna tedeschi si attestano a difesa dei passi.',
    s17_name: 'Innlandet (Liberazione e Resa della Guarnigione Wehrmacht)',
    s17_note:
      'Maggio 1945: capitolazione delle truppe alpine tedesche a Hamar e Lillehammer; le formazioni partigiane del Milorg assumono il controllo di tutte le valli dell\'Innlandet.',
    adminTitleGerman: 'Reichskommissariat Norwegen — Gebietskommissariat Hamar',
    adminTitleNorwayExile: 'Kongeriket Norge — Hedmark og Oppland Fylker',
  },

  NO091: {
    nuts: 'NO091',
    name: 'Vestfold og Telemark',
    modernName: 'Vestfold og Telemark',
    historicalName: 'Vestfold og Telemark Fylker (Rjukan og Horten)',
    capital: 'Tønsberg / Skien',
    country: 'NOR',
    keys: ['no091', 'vestfold', 'telemark', 'tonsberg', 'tønsberg', 'horten', 'skien', 'porsgrunn', 'rjukan', 'vemork', 'notodden', 'sandefjord', 'larvik'],
    s0_5_name: 'Vestfold og Telemark (Horten Base Navale & Vemork Hydro)',
    s0_5_note:
      'Regno di Norvegia — Culla della marina da guerra norvegese (Karljohansvern a Horten), flotta baleniera di Sandefjord e polo idroelettrico/chimico Norsk Hydro di Rjukan nel Telemark.',
    s6_12_name: 'Telemark (Operazione Gunnerside — Il Sabotaggio dell\'Acqua Pesante a Vemork)',
    s6_12_note:
      'L\'impianto Norsk Hydro di Vemork (Rjukan) è l\'unico sito al mondo a produrre acqua pesante (ossido di deuterio), vitale per il programma nucleare nazista (Uranprojekt). Il 28 febbraio 1943, il commando norvegese del SOE (Operazione Gunnerside guidata da Joachim Rønneberg) si cala nella gola e fa saltare le celle di produzione senza sparare un colpo né subire perdite.',
    s13_15_name: 'Telemark (L\'Affondamento del Traghetto SF Hydro sul Lago Tinn)',
    s13_15_note:
      '20 febbraio 1944: gli agenti del SOE Knut Haukelid e compagni piazzano una bomba a tempo sul traghetto ferroviario SF Hydro nel lago Tinn, inabissando 15 tonnellate di acqua pesante destinate ai laboratori atomici in Germania. Le alture dell\'Hardangervidda diventano la leggendaria roccaforte della "Base Elg" del Milorg.',
    s16_name: 'Vestfold og Telemark (Base Elg sull\'Hardangervidda & Basi Navali)',
    s16_note:
      'Le truppe della Wehrmacht a Horten e Tønsberg fortificano le coste; sull\'Hardangervidda oltre 1.000 partigiani norvegesi della Base Elg attendono il segnale per l\'insurrezione finale.',
    s17_name: 'Vestfold og Telemark (Resa Navale di Horten & Smantellamento Vemork)',
    s17_note:
      'Maggio 1945: la base navale di Horten e gli impianti del Telemark si arrendono pacificamente; i depositi di acqua pesante vengono presi in consegna dalle missioni scientifiche alleate Alsos.',
    adminTitleGerman: 'Reichskommissariat Norwegen — Gebietskommissariat Tønsberg/Rjukan',
    adminTitleNorwayExile: 'Kongeriket Norge — Vestfold og Telemark Fylker',
  },

  NO092: {
    nuts: 'NO092',
    name: 'Agder',
    modernName: 'Agder (Aust-Agder e Vest-Agder)',
    historicalName: 'Aust-Agder og Vest-Agder Fylker (Sørlandet)',
    capital: 'Kristiansand',
    country: 'NOR',
    keys: ['no092', 'agder', 'kristiansand', 'arendal', 'mandal', 'grimstad', 'farsund', 'flekkefjord', 'sorlandet', 'sørlandet'],
    s0_5_name: 'Agder (Sørlandet — Kristiansand)',
    s0_5_note:
      'Regno di Norvegia — Costa meridionale del Sørlandet affacciata sullo Skagerrak. Snodo navale, portuale e peschereccio primario di Kristiansand, Mandal e Arendal.',
    s6_12_name: 'Agder (Sbarco a Kristiansand, Affondamento Karlsruhe & Batterie Vara)',
    s6_12_note:
      '9 aprile 1940: i cannoni della fortezza di Odderøya a Kristiansand respingono due assalti navali tedeschi; l\'incrociatore leggero tedesco Karlsruhe viene silurato e affondato dal sommergibile britannico HMS Truant. Successivamente l\'Organizzazione Todt costruisce la colossale "Batterie Vara" a Møvik con cannoni da 38 cm SK C/34 gemelli di quelli di Hanstholm in Danimarca, sbarrando lo Skagerrak.',
    s13_15_name: 'Agder (Atlantikwall Sørlandet & Rete Costiera di Spionaggio XU)',
    s13_15_note:
      'I bunker dell\'Atlantikwall presidiano ogni baia del Sørlandet; la rete di intelligence militare norvegese XU monitora e trasmette a Londra i movimenti dei convogli e delle unità navali tedesche.',
    s16_name: 'Agder (Fortezza Costiera di Møvik sotto Embargo Alleato)',
    s16_note:
      'Le possenti batterie da 38 cm di Batterie Vara rimangono operative ma isolate dalla mancanza di combustibile e munizionamento della Kriegsmarine in rotta.',
    s17_name: 'Agder (Resa di Kristiansand e delle Batterie Costiere)',
    s17_note:
      'Maggio 1945: la guarnigione della Wehrmacht a Kristiansand e i serventi dei cannoni pesanti di Møvik consegnano le chiavi delle fortificazioni alle forze alleate e ai delegati del Milorg.',
    adminTitleGerman: 'Reichskommissariat Norwegen — Gebietskommissariat Kristiansand',
    adminTitleNorwayExile: 'Kongeriket Norge — Aust- og Vest-Agder Fylker',
  },

  NO0A1: {
    nuts: 'NO0A1',
    name: 'Rogaland',
    modernName: 'Rogaland',
    historicalName: 'Rogaland Fylke (Stavanger og Haugesund)',
    capital: 'Stavanger',
    country: 'NOR',
    keys: ['no0a1', 'rogaland', 'stavanger', 'sola', 'haugesund', 'sandnes', 'egersund', 'jaeren', 'jæren'],
    s0_5_name: 'Rogaland (Stavanger & Aeroporto di Sola)',
    s0_5_note:
      'Regno di Norvegia — Regione costiera dello Jæren con l\'aeroporto moderno di Sola (inaugurato nel 1937 da Re Haakon VII), industrie di conserve di pesce e porto mercantile di Stavanger.',
    s6_12_name: 'Rogaland (Assalto dei Fallschirmjäger a Sola & Base Aerea Luftwaffe)',
    s6_12_note:
      '9 aprile 1940: il 1° Battaglione Fallschirmjäger compie il primo aviolancio di paracadutisti da combattimento su un aeroporto nemico, espugnando Sola. L\'aeroporto viene trasformato nella più grande base della Luftwaffe in Norvegia, da cui decollano gli Heinkel He 111 e Junkers Ju 88 contro la flotta britannica e i convogli nel Mare del Nord.',
    s13_15_name: 'Rogaland (Atlantikwall di Jæren & Attacchi Aerei della RAF)',
    s13_15_note:
      'La costa piatta di Jæren viene coperta da centinaia di bunker anticarro e campi minati dell\'Atlantikwall; bombardieri Mosquito e Beaufighter del RAF Coastal Command attaccano senza tregua il traffico marittimo nemico al largo di Egersund e Haugesund.',
    s16_name: 'Rogaland (Sola sotto Attacco del Coastal Command & Rete Clandestina)',
    s16_note:
      'La Luftwaffe a Sola è ridotta all\'inattività dalla penuria di carburante avio; il Milorg locale organizza la protezione delle infrastrutture civili e dei porti.',
    s17_name: 'Rogaland (Liberazione di Stavanger & Consegna dell\'Aeroporto di Sola)',
    s17_note:
      'Maggio 1945: l\'aeroporto di Sola e la base navale di Stavanger vengono consegnati intatti alla Royal Air Force e alle truppe norvegesi di liberazione della Allied Force 134.',
    adminTitleGerman: 'Reichskommissariat Norwegen — Gebietskommissariat Stavanger',
    adminTitleNorwayExile: 'Kongeriket Norge — Rogaland Fylke',
  },

  NO0A2: {
    nuts: 'NO0A2',
    name: 'Vestland',
    modernName: 'Vestland (Hordaland e Sogn og Fjordane)',
    historicalName: 'Hordaland og Sogn og Fjordane Fylker (Bergenhus)',
    capital: 'Bergen',
    country: 'NOR',
    keys: ['no0a2', 'vestland', 'hordaland', 'sogn og fjordane', 'sogn', 'fjordane', 'bergen', 'voss', 'floro', 'florø', 'maloy', 'måløy', 'odda', 'bryggen'],
    s0_5_name: 'Vestland (Bergenhus — Bergen, Hordaland og Sogn)',
    s0_5_note:
      'Regno di Norvegia — Seconda città del Regno, porto anseatico storico di Bryggen, snodo atlantico e porta d\'accesso ai fiordi più profondi (Sognefjord e Hardangerfjord).',
    s6_12_name: 'Vestland (Bunker U-Boot "Bruno" a Bergen & Raid di Måløy Archery)',
    s6_12_note:
      'Aprile 1940: occupazione tedesca di Bergen e dura resistenza delle truppe norvegesi a Voss. L\'Organizzazione Todt costruisce a Laksevåg il colossale bunker per U-Boot "Bruno", base dell\'11ª U-Flottille. Il 27 dicembre 1941, commando britannici e norvegesi sferrano l\'Operazione Archery a Måløy e Vågsøy, inducendo Hitler a blindare la costa norvegese.',
    s13_15_name: 'Vestland (Shetland Bus & Disastro del Piroscafo Voorbode)',
    s13_15_note:
      'I fiordi del Vestland sono l\'approdo segreto della flotta peschereccia clandestina dello "Shetland Bus" guidata da Leif Larsen ("Shetlands-Larsen"). Il 20 aprile 1944, il cargo olandese Voorbode carico di 120 tonnellate di esplosivo salta in aria nel porto di Bergen, devastando la fortezza di Bergenhus e Bryggen.',
    s16_name: 'Vestland (Raid dei Bombardieri Pesanti della RAF sul Bunker Bruno)',
    s16_note:
      'Autunno-Inverno 1944: squadriglie di bombardieri Lancaster della RAF bersagliano il bunker U-Boot Bruno con bombe Tallboy perforanti; la guarnigione tedesca rimane inchiodata nei rifugi sotterranei.',
    s17_name: 'Vestland (Resa del Bunker U-Boot Bruno e Liberazione di Bergen)',
    s17_note:
      'Maggio 1945: la base sottomarina Bruno con i sommergibili superstiti e la guarnigione della Wehrmacht si arrendono alle forze della resistenza norvegese (Milorg) e ai commando britannici.',
    adminTitleGerman: 'Reichskommissariat Norwegen — Gebietskommissariat Bergen',
    adminTitleNorwayExile: 'Kongeriket Norge — Hordaland og Sogn og Fjordane Fylker',
  },

  NO0A3: {
    nuts: 'NO0A3',
    name: 'Møre og Romsdal',
    modernName: 'Møre og Romsdal',
    historicalName: 'Møre og Romsdal Fylke (Åndalsnes og Molde)',
    capital: 'Molde',
    country: 'NOR',
    keys: ['no0a3', 'more og romsdal', 'møre og romsdal', 'molde', 'andalsnes', 'åndalsnes', 'alesund', 'ålesund', 'kristiansund', 'geiranger'],
    s0_5_name: 'Møre og Romsdal (Ålesund, Molde og Kristiansund)',
    s0_5_note:
      'Regno di Norvegia — Distretto costiero dei fiordi e della pesca d\'altura (baccalà/Klippfisk), comprendente il fiordo di Romsdal, Geiranger e i porti marittimi di Molde e Ålesund.',
    s6_12_name: 'Møre og Romsdal (Sbarco Sickleforce ad Åndalsnes & Evacuazione del Tesoro)',
    s6_12_note:
      'Aprile 1940: Åndalsnes è il punto di sbarco della Sickleforce britannica per soccorrere Trondheim. A Molde ("Città delle Rose"), capitale provvisoria, Re Haakon VII e il governo resistono sotto i furiosi bombardamenti aerei della Luftwaffe prima di essere evacuati sulla HMS Glasgow con il tesoro in oro della Banca di Norvegia.',
    s13_15_name: 'Møre og Romsdal (Base Primaria dello Shetland Bus & Sabotaggi Costieri)',
    s13_15_note:
      'I fiordi attorno ad Ålesund e Molde fungono da approdo e nascondiglio per i pescherecci armati e i cacciasommergibili dello Shetland Bus (KNM Hitra, Hessa e Vigra) che sbarcano armi e agenti segreti del SOE.',
    s16_name: 'Møre og Romsdal (Presidio Wehrmacht e Pattugliamento Costiero)',
    s16_note:
      'La costa è costellata da fortificazioni dell\'Atlantikwall; continue incursioni di Beaufighter del Banff Strike Wing della RAF contro i mercantili tedeschi lungo la costa.',
    s17_name: 'Møre og Romsdal (Liberazione dei Porti del Romsdal e di Ålesund)',
    s17_note:
      'Maggio 1945: liberazione festosa di Ålesund, Molde e Kristiansund con la resa incondizionata della marina e della fanteria tedesca davanti ai veterani della resistenza locale.',
    adminTitleGerman: 'Reichskommissariat Norwegen — Gebietskommissariat Molde/Ålesund',
    adminTitleNorwayExile: 'Kongeriket Norge — Møre og Romsdal Fylke',
  },

  NO060: {
    nuts: 'NO060',
    name: 'Trøndelag',
    modernName: 'Trøndelag (Trondheim)',
    historicalName: 'Sør- og Nord-Trøndelag Fylker (Nidaros)',
    capital: 'Trondheim',
    country: 'NOR',
    keys: ['no060', 'trondelag', 'trøndelag', 'trondheim', 'nidaros', 'namsos', 'steinkjer', 'levanger', 'roros', 'røros', 'falstad'],
    s0_5_name: 'Trøndelag (Trondheim — Cattedrale Storica di Nidaros)',
    s0_5_note:
      'Regno di Norvegia — Cuore storico e spirituale della nazione con la cattedrale medievale di Nidaros (luogo di incoronazione dei re), fertile bacino agricolo e snodo ferroviario per il nord.',
    s6_12_name: 'Trøndelag (Base U-Boot "Dora" a Trondheim & Sbarco Alleato a Namsos)',
    s6_12_note:
      'Aprile 1940: sbarco della Wehrmacht e dell\'incrociatore Admiral Hipper a Trondheim; contrattacco alleato franco-britannico a Namsos (Mauriceforce del Gen. Carton de Wiart). Successivamente Hitler progetta la metropoli "Nordstern" ed edifica i colossali bunker "Dora I" e "Dora II" per la 13ª Flottiglia U-Boot. A Levanger sorge il famigerato campo di Falstad.',
    s13_15_name: 'Trøndelag (Attacchi dei Sommergibili Clandestini & Resistenza Wergeland)',
    s13_15_note:
      'Sabotaggi alla ferrovia di Nordlandsbanen e incursioni aeree della RAF contro i cantieri navali di Trondheim; la rete informativa della resistenza locale invia a Londra i bollettini dei movimenti della Kriegsmarine.',
    s16_name: 'Trøndelag (Bunker Dora I sotto Assedio & Ritiro Wehrmacht)',
    s16_note:
      'I bunker corazzati Dora I ospitano ancora decine di sommergibili Type VII e Type IX impossibilitati a operare per la superiorità aeronavale alleata nel Mare del Nord.',
    s17_name: 'Trøndelag (Resa della Fortezza Dora e del Campo di Falstad)',
    s17_note:
      'Maggio 1945: liberazione dei prigionieri superstiti del campo di prigionia di Falstad e resa delle guarnigioni navali di Trondheim alle forze alleate e al Milorg.',
    adminTitleGerman: 'Reichskommissariat Norwegen — Gebietskommissariat Drontheim (Trondheim)',
    adminTitleNorwayExile: 'Kongeriket Norge — Trøndelag Fylke',
  },

  NO071: {
    nuts: 'NO071',
    name: 'Nordland',
    modernName: 'Nordland (Narvik, Bodø e Lofoten)',
    historicalName: 'Nordland Fylke (Narvik og Lofoten)',
    capital: 'Bodø / Narvik',
    country: 'NOR',
    keys: ['no071', 'nordland', 'narvik', 'bodo', 'bodø', 'lofoten', 'svolvaer', 'svolvær', 'mo i rana', 'mosjoen', 'mosjøen', 'ofotfjord'],
    s0_5_name: 'Nordland (Narvik Porto Minerario & Isole Lofoten)',
    s0_5_note:
      'Regno di Norvegia — Snodo strategico mondiale per l\'esportazione del minerale di ferro svedese (miniere di Kiruna/Gällivare via ferrovia Ofotbanen), porto libero dai ghiacci tutto l\'anno e arcipelago delle Lofoten.',
    s6_12_name: 'Nordland (La Battaglia di Narvik — La Prima Vittoria Terrestre Alleata)',
    s6_12_note:
      'Aprile-Giugno 1940: la Royal Navy distrugge 10 cacciatorpediniere tedeschi nell\'Ofotfjord. A terra, la 6ª Divisione norvegese del generale Carl Gustav Fleischer con i Chasseurs Alpins francesi del Gen. Béthouart, la Legione Straniera (13e DBLE) e la brigata polacca Podhale riconquista Narvik il 28 maggio 1940 sconfiggendo i Gebirgsjäger di Dietl. Il 4 marzo 1941, commando alleati sferrano l\'Operazione Claymore sulle Lofoten catturando cifrari Enigma.',
    s13_15_name: 'Nordland (La "Strada del Sangue" Blodveien & Presidio di Narvik)',
    s13_15_note:
      'Migliaia di prigionieri di guerra sovietici e jugoslavi vengono decimati nei campi di lavoro forzato dell\'Organizzazione Todt per costruire la ferrovia polare (Blodveien a Saltdal). Narvik è trasformata in un caposaldo inespugnabile dell\'Atlantikwall.',
    s16_name: 'Nordland (Ritirata della 20. Gebirgsarmee sulla Linea di Lyngen)',
    s16_note:
      'Inverno 1944: le truppe alpine tedesche in fuga dalla Finlandia e dal Finnmark ripiegano nel Nordland attraverso Narvik, stabilendo la linea difensiva di Lyngen contro l\'avanzata sovietica.',
    s17_name: 'Nordland (Resa delle Forze Alpine di Narvik & Liberazione di Bodø)',
    s17_note:
      'Maggio 1945: Narvik, Bodø e le isole Lofoten vengono liberate; resa incondizionata della guarnigione tedesca alle truppe alleate e ai reparti del Milorg.',
    adminTitleGerman: 'Reichskommissariat Norwegen — Gebietskommissariat Narvik/Nordland',
    adminTitleNorwayExile: 'Kongeriket Norge — Nordland Fylke',
  },

  NO074: {
    nuts: 'NO074',
    name: 'Troms og Finnmark',
    modernName: 'Troms og Finnmark',
    historicalName: 'Troms og Finnmark Fylker (Nord-Norge)',
    capital: 'Tromsø / Vadsø',
    country: 'NOR',
    keys: ['no074', 'troms og finnmark', 'troms', 'finnmark', 'tromso', 'tromsø', 'kirkenes', 'vadso', 'vadsø', 'vardo', 'vardø', 'alta', 'hammerfest', 'harstad', 'sor-varanger', 'sør-varanger'],
    s0_5_name: 'Troms og Finnmark (Nord-Norge — Tromsø e Kirkenes)',
    s0_5_note:
      'Regno di Norvegia — Estremo nord artico, frontiera orientale con la Finlandia (Petsamo) e l\'URSS, porto artico di Tromsø e distretto minerario di ferro di Kirkenes (Sør-Varanger).',
    s6_12_name: 'Troms og Finnmark (Tromsø Capitale Provvisoria & Fiordi delle Corazzate)',
    s6_12_note:
      'Maggio-Giugno 1940: Tromsø è sede provvisoria del Re e del governo prima dell\'evacuazione a Londra sul cruiser HMS Devonshire. Successivamente l\'Altafjord e il Kåfjord diventano il rifugio delle grandi navi da battaglia della Kriegsmarine (Tirpitz, Scharnhorst, Lützow) poste a minaccia dei convogli artici alleati (PQ-17).',
    s13_15_name: 'Troms (Operazione Tungsten & Affondamento della Tirpitz a Håkøya)',
    s13_15_note:
      'Dopo gli attacchi con minisottomarini X-Craft e raid aeronavali, il 12 novembre 1944 la corazzata Tirpitz viene centrata da bombe Tallboy da 12.000 libbre sganciate dai bombardieri Lancaster del 617° e 9° Squadron RAF a Håkøya (Tromsø), capovolgendosi con la morte di quasi 1.000 marinai tedeschi.',
    s16_name: 'Finnmark Liberato (Offensiva Petsamo-Kirkenes & Terra Bruciata Nazista)',
    s16_note:
      '25 Ottobre 1944: la 14ª Armata sovietica del maresciallo Kirill Meretskov libera Kirkenes ed espelle i nazisti dal Finnmark orientale; a novembre giunge la Missione Militare della Norvegia Libera del col. Arne Dahl per ripristinare la sovranità civile del Regno di Norvegia. In ritirata, la 20. Gebirgsarmee del gen. Lothar Rendulic applica la terra bruciata totale, radendo al suolo Hammerfest, Alta e ogni villaggio del Finnmark occidentale.',
    s17_name: 'Finnmark Liberato (Sovranità della Norvegia Libera & Linea di Lyngen)',
    s17_note:
      'Aprile 1945: l\'intero Finnmark è amministrato sovranamente dalle autorità della Norvegia Libera e presidiato in cooperazione con i sovietici; i civili nascosti nelle caverne riemergono per la ricostruzione, mentre la Wehrmacht rimane bloccata a sud della Linea del Lyngen fino alla capitolazione dell\'8 maggio.',
    adminTitleGerman: 'Reichskommissariat Norwegen — Gebietskommissariat Tromsø/Kirkenes',
    adminTitleNorwayExile: 'Kongeriket Norge — Fritt Finnmark (Oberst Arne Dahl & Den norske militærmisjon)',
  },

  NO0B1: {
    nuts: 'NO0B1',
    name: 'Jan Mayen',
    modernName: 'Jan Mayen',
    historicalName: 'Jan Mayen (Norsk Arktisk Territorium)',
    capital: 'Olonkinbyen',
    country: 'NOR',
    keys: ['no0b1', 'jan mayen', 'olonkinbyen', 'beerenberg'],
    s0_5_name: 'Jan Mayen (Territorio Artico Sovrano — Regno di Norvegia)',
    s0_5_note: 'Territorio insulare artico della corona norvegese annesso nel 1929; stazione radio-meteorologica strategica per le rotte del Mare di Groenlandia.',
    s6_12_name: 'Jan Mayen (Presidio della Norvegia Libera — Stazione Meteo Alleata)',
    s6_12_note: 'Occupata e presidiata dal contingente militare della Norvegia Libera; rifornisce i bollettini meteo essenziali per i convogli artici e la flotta alleata, respingendo ogni tentativo di sbarco tedesco.',
    s13_15_name: 'Jan Mayen (Base Meteorologica della Norvegia Libera & USCG)',
    s13_15_note: 'Base artica operativa alleata sotto sovranità e bandiera del Regno di Norvegia con supporto della guardia costiera statunitense.',
    s16_name: 'Jan Mayen (Avamposto Artico Alleato della Norvegia Libera)',
    s16_note: 'Stazione radio e radar permanente alleata a supporto della guerra aeronavale artica.',
    s17_name: 'Jan Mayen (Territorio Sovrano del Regno di Norvegia)',
    s17_note: 'Piena sovranità del Regno di Norvegia preservata ininterrottamente durante l\'intero conflitto mondiale.',
    adminTitleGerman: 'Territorio Artico rivendicato — Presidiato dalla Norvegia Libera',
    adminTitleNorwayExile: 'Kongeriket Norge — Jan Mayen Garnison (Den Norske Marine)',
  },

  NO0B2: {
    nuts: 'NO0B2',
    name: 'Svalbard',
    modernName: 'Svalbard (Spitsbergen)',
    historicalName: 'Svalbard (Spitsbergen og Bjørnøya)',
    capital: 'Longyearbyen',
    country: 'NOR',
    keys: ['no0b2', 'svalbard', 'spitsbergen', 'spitzbergen', 'longyearbyen', 'barentsburg', 'ny-alesund', 'ny-ålesund'],
    s0_5_name: 'Svalbard (Trattato delle Svalbard del 1920 — Regno di Norvegia)',
    s0_5_note: 'Arcipelago artico sotto sovranità norvegese (Trattato di Parigi 1920); concessioni minerarie carbonifere norvegesi (Store Norske) e sovietiche (Arktikugol a Barentsburg).',
    s6_12_name: 'Svalbard (Operazione Gauntlet, Evacuazione & Guarnigione Fritham)',
    s6_12_note: 'Agosto 1941: Operazione Gauntlet; commando canadesi e britannici distruggono le miniere di carbone ed evacuano i residenti sovietici e norvegesi. Nel 1942 la spedizione Fritham reinsedia la guarnigione della Norvegia Libera a Barentsburg, resistendo all\'attacco navale tedesco Zitronella (settembre 1943 con Tirpitz e Scharnhorst).',
    s13_15_name: 'Svalbard (Presidio della Norvegia Libera a Barentsburg)',
    s13_15_note: 'La guarnigione militare della Norvegia Libera ricostruisce la stazione radio e meteo di Longyearbyen e Barentsburg, garantendo i dati per i convogli artici.',
    s16_name: 'Svalbard (Roccaforte Artica della Norvegia Libera)',
    s16_note: 'Presidio artico sovrano norvegese operativo contro le stazioni meteo clandestine e i sommergibili della Kriegsmarine.',
    s17_name: 'Svalbard (Territorio Sovrano del Regno di Norvegia)',
    s17_note: 'Sovranità ininterrotta della Corona Norvegese; ripristino delle normali attività civili e minerarie all\'atto della resa generale tedesca.',
    adminTitleGerman: 'Arcipelago Artico conteso — Presidiato dalla Norvegia Libera',
    adminTitleNorwayExile: 'Kongeriket Norge — Svalbard Garnison (Barentsburg / Longyearbyen)',
  },
};

// ============================================================================
// 2. REGISTRO STORICO PROVINCE DELLA DANIMARCA (NUTS-3)
// ============================================================================
export const DENMARK_PROVINCES_META: Record<string, NordicProvinceMeta> = {
  DK011: {
    nuts: 'DK011',
    name: 'Byen København',
    modernName: 'Byen København (Copenaghen Capitale)',
    historicalName: 'København (Hovedstad Kongeriget Danmark)',
    capital: 'København',
    country: 'DEN',
    keys: ['dk011', 'byen kobenhavn', 'københavn', 'copenhagen', 'copenaghen', 'amalienborg', 'kastellet'],
    s0_5_name: 'Byen København (Hovedstaden — Kongeriget Danmark)',
    s0_5_note:
      'Capitale del Regno di Danimarca, residenza di Re Cristiano X ad Amalienborg, sede del Folketing (parlamento) e del governo socialdemocratico di Thorvald Stauning. Rigorosa neutralità diplomatica.',
    s6_12_name: 'København (Musterprotektorat — Re Cristiano X & Occupazione Tedesca)',
    s6_12_note:
      'All\'alba del 9 aprile 1940 il traghetto Hansestadt Danzig sbarca fanti della Wehrmacht al porto; la Guardia Reale (Livgarden) ingaggia il combattimento ad Amalienborg. Il governo capitola sotto protesta per evitare il bombardamento aereo della capitale. La Danimarca diviene un "Musterprotektorat" (protettorato modello): re, parlamento, polizia e governo mantengono le funzioni ordinarie. Cristiano X compie quotidiane passeggiate a cavallo disarmato tra i cittadini, simbolo di fermezza morale.',
    s13_15_name: 'København (Operazione Safari: Autoaffondamento della Flotta a Holmen)',
    s13_15_note:
      '29 agosto 1943 (Operazione Safari): il generale von Hanneken proclama la legge marziale. La Regia Marina Danese del viceammiraglio Aage Vedel si autoaffonda nella base navale di Holmen (32 navi affondate per non cederle ai nazisti). Il governo si dimette; inizia l\'amministrazione diretta tedesca (Werner Best). Nell\'ottobre 1943, una mobilitazione clandestina della popolazione sottrae alla cattura oltre 7.000 ebrei della capitale.',
    s16_name: 'København (Quartier Generale Gestapo Shellhus & Azioni di Holger Danske)',
    s16_note:
      'Inverno 1944-1945: il terrore nazista ha sede nello Shellhus (quartier generale della Gestapo a Copenaghen). Le brigate partigiane Holger Danske e BOPA compiono attentati ed eliminazioni mirate di collaborazionisti e spie naziste del gruppo Schalburg.',
    s17_name: 'København (Operazione Carthage sul Shellhus & Liberazione Nazionale)',
    s17_note:
      '21 marzo 1945: 20 cacciabombardieri Mosquito della RAF compiono la celebre Operazione Carthage, radendo al suolo a bassissima quota il palazzo dello Shellhus e distruggendo gli archivi della Gestapo sui partigiani danesi. Il 4 maggio 1945 alle 20:35, la BBC annuncia la resa generale delle forze tedesche in Danimarca: festa di liberazione ed ingresso della British 1st Airborne Division il 5 maggio.',
    adminTitleGerman: 'Besetztes Dänemark — Militärbefehlshaber Dänemark (Kopenhagen)',
    adminTitleNorwayExile: 'Kongeriget Danmark — Hovedstaden København',
  },

  DK012: {
    nuts: 'DK012',
    name: 'Københavns omegn',
    modernName: 'Københavns omegn (Circondario di Copenaghen)',
    historicalName: 'Københavns Amt (Omegn)',
    capital: 'Glostrup / Rødovre',
    country: 'DEN',
    keys: ['dk012', 'kobenhavns omegn', 'københavns omegn', 'glostrup', 'rodovre', 'rødovre', 'hvidovre', 'ballerup', 'lyngby'],
    s0_5_name: 'Københavns omegn (Circondario Metropolitano)',
    s0_5_note: 'Regno di Danimarca — Fascia residenziale, agricola e industriale a ridosso della capitale.',
    s6_12_name: 'Københavns omegn (Cintura Industriale sotto Occupazione Controllata)',
    s6_12_note: 'Cantieri e industrie meccaniche lavorano sotto supervisione dell\'amministrazione danese; cresce l\'agitazione operaia clandestina.',
    s13_15_name: 'Københavns omegn (Sabotaggi Industriali delle Brigate BOPA)',
    s13_15_note: 'I gruppi di sabotaggio comunisti BOPA e di Holger Danske fanno saltare linee ferroviarie, fabbriche d\'armi e depositi ausiliari della Wehrmacht.',
    s16_name: 'Københavns omegn (Coprifuoco e Pattuglie del Gruppo Schalburg)',
    s16_note: 'Duro pattugliamento delle SS danesi del gruppo collaborazionista Schalburg; scioperi generali e sabotaggi notturni.',
    s17_name: 'Københavns omegn (Smobilitazione Tedesca & Liberazione Alleata)',
    s17_note: 'Maggio 1945: resa pacifica delle caserme della Wehrmacht ai gruppi partigiani danesi del Frihedsrådet e ai paracadutisti britannici.',
    adminTitleGerman: 'Besetztes Dänemark — Standort Kopenhagen-Land',
    adminTitleNorwayExile: 'Kongeriket Danmark — Københavns Amt',
  },

  DK013: {
    nuts: 'DK013',
    name: 'Nordsjælland',
    modernName: 'Nordsjælland (Selandia Settentrionale)',
    historicalName: 'Frederiksborg Amt (Nordsjælland)',
    capital: 'Hillerød / Helsingør',
    country: 'DEN',
    keys: ['dk013', 'nordsjaelland', 'nordsjælland', 'helsingor', 'helsingør', 'elsinore', 'hillerod', 'hillerød', 'frederiksborg', 'kronborg', 'gilleleje'],
    s0_5_name: 'Frederiksborg Amt (Nordsjælland — Helsingør og Kronborg)',
    s0_5_note: 'Regno di Danimarca — Contea settentrionale di Selandia con il castello shakespeariano di Kronborg a Helsingør, affacciata sullo stretto dell\'Øresund.',
    s6_12_name: 'Nordsjælland (Pattugliamento dell\'Øresund & Presidio di Kronborg)',
    s6_12_note: 'Presidio della Wehrmacht e della Kriegsmarine sul controllo del traffico marittimo dello stretto dell\'Øresund verso la Svezia neutrale.',
    s13_15_name: 'Nordsjælland (Il Grande Salvataggio degli Ebrei Danesi attraverso l\'Øresund)',
    s13_15_note:
      'Ottobre 1943: Nordsjælland è il teatro del miracolo umanitario danese. Avvisati della retata nazista, oltre 7.200 ebrei danesi vengono nascosti a Gilleleje, Helsingør e nei boschi, per poi essere traghettati clandestinamente di notte su pescherecci verso la neutrale Svezia. Oltre il 99% della comunità ebraica danese si salva dallo sterminio.',
    s16_name: 'Nordsjælland (Rotte Clandestine della Danforce e Intelligence verso la Svezia)',
    s16_note: 'I porticcioli della costa mantengono i collegamenti segreti notturni con la brigata libera danese (Den Danske Brigade / Danforce) addestrata in Svezia.',
    s17_name: 'Nordsjælland (Rientro della Danforce dalla Svezia & Liberazione)',
    s17_note: '5 maggio 1945: la Danforce sbarca a Helsingør dalla Svezia con uniformi ed elmetti svedesi, accolta con giubilo dalla popolazione civile liberata.',
    adminTitleGerman: 'Besetztes Dänemark — Kreiskommandantur Helsingør',
    adminTitleNorwayExile: 'Kongeriket Danmark — Frederiksborg Amt',
  },

  DK014: {
    nuts: 'DK014',
    name: 'Bornholm',
    modernName: 'Bornholm',
    historicalName: 'Bornholms Amt (Rønne og Neksø)',
    capital: 'Rønne',
    country: 'DEN',
    keys: ['dk014', 'bornholm', 'ronne', 'rønne', 'nekso', 'neksø', 'dueodde'],
    s0_5_name: 'Bornholms Amt (Rønne — Isola di Bornholm)',
    s0_5_note: 'Regno di Danimarca — Isola strategica danese nel Mar Baltico centrale tra Svezia, Germania e Polonia.',
    s6_12_name: 'Bornholm (Presidio Radar della Kriegsmarine nel Baltico)',
    s6_12_note: 'La Wehrmacht insedia stazioni radar di avvistamento aereo e navale nel Baltico e stazioni di rilevamento per i collaudi delle armi segrete V1 e V2 da Peenemünde.',
    s13_15_name: 'Bornholm (Avamposto di Sorveglianza Tedesco sulle Rotte Baltiche)',
    s13_15_note: 'Base di supporto per i convogli marittimi tedeschi di rifornimento e per le unità antisommergibile nel Baltico orientale.',
    s16_name: 'Bornholm (Isola Roccaforte del Baltico sotto Blocco Aereo)',
    s16_note: 'Oltre 12.000 fanti e marinai tedeschi presidiano Bornholm, punto di transito per decine di migliaia di profughi tedeschi evacuati dalla Prussia Orientale.',
    s17_name: 'Bornholm (Bombardamento Sovietico, Resa Wehrmacht & Occupazione dell\'Armata Rossa)',
    s17_note:
      'All\'inizio di maggio 1945, il comandante tedesco Gerhard von Kamptz rifiuta di arrendersi ai sovietici volendo cedere le armi solo agli inglesi. Il 7 e l\'8 maggio 1945 l\'aviazione sovietica bombarda Rønne e Neksø distruggendo centinaia di case; il 9 maggio 1945 le truppe d\'assalto della Flotta del Baltico sbarcano e catturano l\'intera guarnigione tedesca, mantenendo l\'occupazione sovietica di Bornholm fino all\'aprile 1946.',
    adminTitleGerman: 'Besetztes Dänemark — Festungskommandantur Bornholm (Rønne)',
    adminTitleNorwayExile: 'Kongeriket Danmark — Bornholms Amt (Soviet Occupation 1945-1946)',
  },

  DK021: {
    nuts: 'DK021',
    name: 'Østsjælland',
    modernName: 'Østsjælland (Selandia Orientale)',
    historicalName: 'Roskilde og Kjøge Amter',
    capital: 'Roskilde',
    country: 'DEN',
    keys: ['dk021', 'ostsjaelland', 'østsjælland', 'roskilde', 'koge', 'køge', 'stevns'],
    s0_5_name: 'Roskilde Amt (Østsjælland — Cattedrale di Roskilde)',
    s0_5_note: 'Regno di Danimarca — Centro storico e religioso con la millenaria cattedrale mausoleo di tutti i sovrani di Danimarca e nodo ferroviario primario.',
    s6_12_name: 'Østsjælland (Controllo Ferrioviario & Tutela dei Siti della Corona)',
    s6_12_note: 'La Wehrmacht presidia le stazioni ferroviarie senza interferire con i luoghi storici della corona danese.',
    s13_15_name: 'Østsjælland (Sabotaggi Ferroviari della Resistenza Partigiana)',
    s13_15_note: 'I ferrovieri e i partigiani danesi deviano e fanno saltare i treni carichi di materiale bellico diretto verso i porti di Selandia.',
    s16_name: 'Østsjælland (Pattugliamento Wehrmacht e Rete di Sorveglianza)',
    s16_note: 'Stato d\'allarme generale; le linee telegrafiche tedesche vengono ripetutamente tranciate dai commando clandestini.',
    s17_name: 'Østsjælland (Liberazione di Roskilde & Ripristino dell\'Autorità Danese)',
    s17_note: 'Maggio 1945: le truppe tedesche si arrendono; la cattedrale di Roskilde accoglie le celebrazioni per la riconquistata libertà della nazione.',
    adminTitleGerman: 'Besetztes Dänemark — Standort Roskilde',
    adminTitleNorwayExile: 'Kongeriket Danmark — Roskilde Amt',
  },

  DK022: {
    nuts: 'DK022',
    name: 'Vest- og Sydsjælland',
    modernName: 'Vest- og Sydsjælland (Selandia Occidentale e Meridionale)',
    historicalName: 'Sorø og Præstø Amter (Lolland, Falster og Møn)',
    capital: 'Slagelse / Næstved',
    country: 'DEN',
    keys: ['dk022', 'vest- og sydsjaelland', 'vest- og sydsjælland', 'slagelse', 'naestved', 'næstved', 'korsor', 'korsør', 'mon', 'møn', 'lolland', 'falster', 'gedser'],
    s0_5_name: 'Sorø og Præstø Amter (Vest- og Sydsjælland, Lolland-Falster)',
    s0_5_note: 'Regno di Danimarca — Ampio distretto insulare e agricolo comprendente Lolland, Falster, Møn e il porto di traghetti per la Germania di Gedser.',
    s6_12_name: 'Vest- og Sydsjælland (Controllo dello Snodo di Korsør & Linea Gedser)',
    s6_12_note: 'La linea ferroviaria Gedser-Warnemünde e il porto di Korsør sono le arterie vitali per i trasporti tedeschi tra la Germania e la Danimarca.',
    s13_15_name: 'Vest- og Sydsjælland (Interruzione dei Traghetti & Scioperi)',
    s13_15_note: 'Scioperi dei marittimi e sabotaggi alle linee di sbarco dei traghetti dello Storebælt per intralciare i rifornimenti della Wehrmacht.',
    s16_name: 'Vest- og Sydsjælland (Misure Straordinarie contro lo Spionaggio Navale)',
    s16_note: 'Presidi di sicurezza e bunker costieri a Gedser e Korsør nel timore di sbarchi alleati nello stretto.',
    s17_name: 'Vest- og Sydsjælland (Resa di Korsør e Smobilitazione delle Isole del Sud)',
    s17_note: 'Maggio 1945: resa ordinata dei presidi tedeschi; ripristino delle comunicazioni civili su tutte le isole della Selandia meridionale.',
    adminTitleGerman: 'Besetztes Dänemark — Standort Korsør/Gedser',
    adminTitleNorwayExile: 'Kongeriket Danmark — Sorø og Præstø Amter',
  },

  DK031: {
    nuts: 'DK031',
    name: 'Fyn',
    modernName: 'Fyn (Fionia)',
    historicalName: 'Odense og Svendborg Amter (Fyn)',
    capital: 'Odense',
    country: 'DEN',
    keys: ['dk031', 'fyn', 'fionia', 'odense', 'svendborg', 'nyborg', 'middelfart'],
    s0_5_name: 'Odense og Svendborg Amter (Fyn — Isola di Fionia)',
    s0_5_note: 'Regno di Danimarca — Cuore geografico della Danimarca, terra natale di Hans Christian Andersen, cantiere navale di Odense (Odense Staalskibsværft).',
    s6_12_name: 'Fyn (Fionia sotto Occupazione Controllata & Ponte del Lillebælt)',
    s6_12_note: 'Controllo del ponte strategico del Lillebælt che collega la Fionia allo Jutland e dei traghetti di Nyborg per lo Storebælt.',
    s13_15_name: 'Fyn (Agosto 1943: Lo Sciopero Popolare Folkestrejken a Odense)',
    s13_15_note:
      'Nell\'agosto 1943 Odense è l\'epicentro dello sciopero generale insurrezionale danese (Folkestrejken): gli operai e i cittadini scendono in piazza contro i nazisti e disarmano i soldati tedeschi, innescando la crisi che porta alla fine del protettorato e all\'imposizione della legge marziale.',
    s16_name: 'Fyn (Guarnigione Wehrmacht in Allerta & Azioni di Sabotaggio)',
    s16_note: 'I cantieri navali di Odense vengono bersagliati da attentati con cariche esplosive per bloccare la riparazione dei mercantili tedeschi.',
    s17_name: 'Fyn (Liberazione di Odense & Apertura dei Ponti del Lillebælt)',
    s17_note: 'Maggio 1945: il comitato di liberazione di Fionia assume il governo di Odense; festa di liberazione e resa delle caserme tedesche.',
    adminTitleGerman: 'Besetztes Dänemark — Standort Odense',
    adminTitleNorwayExile: 'Kongeriket Danmark — Odense og Svendborg Amter',
  },

  DK032: {
    nuts: 'DK032',
    name: 'Sydjylland',
    modernName: 'Sydjylland (Jutland Meridionale / Nordslesvig)',
    historicalName: 'Sønderjylland (Haderslev, Aabenraa, Sønderborg og Tønder)',
    capital: 'Aabenraa / Haderslev',
    country: 'DEN',
    keys: ['dk032', 'sydjylland', 'sonderjylland', 'sønderjylland', 'nordslesvig', 'aabenraa', 'haderslev', 'tonder', 'tønder', 'sonderborg', 'sønderborg', 'kolding'],
    s0_5_name: 'Sønderjylland (Nordslesvig — Confine Storico Danese del 1920)',
    s0_5_note:
      'Regno di Danimarca — Territorio dello Schleswig settentrionale riannesso alla Danimarca a seguito del plebiscito del 1920 (Trattato di Versailles). Presenza di una minoranza di lingua tedesca e forte presidio di frontiera.',
    s6_12_name: 'Sydjylland (9 Aprile 1940: La Resistenza Armata di Confine)',
    s6_12_note:
      'All\'alba del 9 aprile 1940, la Wehrmacht oltrepassa la frontiera; reparti ciclisti e autoblindo Landsverk dell\'esercito danese si battono con eroismo a Tønder, Hokkerup, Bredebro e Haderslev, subendo morti e feriti prima che giunga da Copenaghen l\'ordine di cessare il fuoco per evitare il massacro.',
    s13_15_name: 'Sydjylland (Linea di Confine e Sorveglianza Antiterrorismo della Gestapo)',
    s13_15_note:
      'La Gestapo istituisce il campo di prigionia di Frøslev (Frøslevlejren) vicino al confine tedesco per internare i partigiani danesi, evitando la deportazione nei lager nazisti grazie all\'accordo dell\'amministrazione danese.',
    s16_name: 'Sydjylland (Campo di Frøslev Sovraffollato & Misure di Sicurezza di Frontiera)',
    s16_note:
      'Nel campo di Frøslev sono rinchiusi oltre 12.000 prigionieri politici danesi; le SS intensificano la repressione lungo la linea ferroviaria verso Flensburgo.',
    s17_name: 'Sydjylland (Liberazione dei Detenuti di Frøslev & Mantenimento del Confine)',
    s17_note:
      '5 maggio 1945: liberazione trionfale dei prigionieri del campo di Frøslev; il confine storico danese-tedesco del 1920 viene ripristinato integralmente senza contestazioni territoriali.',
    adminTitleGerman: 'Besetztes Dänemark — Grenzkolonne Nordschleswig (Aabenraa)',
    adminTitleNorwayExile: 'Kongeriket Danmark — Sønderjylland (Nordslesvig)',
  },

  DK041: {
    nuts: 'DK041',
    name: 'Vestjylland',
    modernName: 'Vestjylland (Jutland Occidentale)',
    historicalName: 'Ribe og Ringkjøbing Amter (Vestjylland)',
    capital: 'Esbjerg / Ringkøbing',
    country: 'DEN',
    keys: ['dk041', 'vestjylland', 'esbjerg', 'ringkobing', 'ringkjøbing', 'holstebro', 'lemvig', 'struer', 'skjern', 'fano', 'fanø'],
    s0_5_name: 'Ribe og Ringkjøbing Amter (Vestjylland — Esbjerg Porto Atlantico)',
    s0_5_note: 'Regno di Danimarca — Costa atlantica del Mare del Nord, unico grande porto danese in acque profonde (Esbjerg), esportazione di burro e bacon verso la Gran Bretagna.',
    s6_12_name: 'Vestjylland (Atlantikwall a Esbjerg & Batterie Costiere sul Mare del Nord)',
    s6_12_note: 'L\'Organizzazione Todt costruisce centinaia di bunker in cemento armato dell\'Atlantikwall per proteggere il porto di Esbjerg e bloccare ogni tentativo di sbarco britannico.',
    s13_15_name: 'Vestjylland (Installazioni Radar Pesanti Mammut & Bombardamenti RAF)',
    s13_15_note: 'I giganti radar della Luftwaffe (Mammut e Freya) sulle dune occidentali guidano la caccia notturna contro le formazioni di bombardieri Lancaster diretti sulla Germania.',
    s16_name: 'Vestjylland (Presidio Costiero Wehrmacht Isolato sul Mare del Nord)',
    s16_note: 'Le batterie costiere della Kriegsmarine rimangono a corto di rifornimenti; sabotaggi delle linee telegrafiche da parte della resistenza dello Jutland.',
    s17_name: 'Vestjylland (Resa dei Bunker dell\'Atlantikwall a Esbjerg)',
    s17_note: 'Maggio 1945: le truppe tedesche consegnano i complessi bunkerizzati di Esbjerg e Ringkøbing alle formazioni partigiane e alle colonne corazzate britanniche di Montgomery.',
    adminTitleGerman: 'Besetztes Dänemark — Festungsbereich Esbjerg / Atlantikwall',
    adminTitleNorwayExile: 'Kongeriket Danmark — Ribe og Ringkjøbing Amter',
  },

  DK042: {
    nuts: 'DK042',
    name: 'Østjylland',
    modernName: 'Østjylland (Jutland Orientale)',
    historicalName: 'Aarhus, Randers, Skanderborg og Vejle Amter',
    capital: 'Aarhus',
    country: 'DEN',
    keys: ['dk042', 'ostjylland', 'østjylland', 'aarhus', 'arhus', 'randers', 'horsens', 'vejle', 'skanderborg', 'silkeborg'],
    s0_5_name: 'Aarhus og Vejle Amter (Østjylland — Metropoli dello Jutland)',
    s0_5_note: 'Regno di Danimarca — Seconda area urbana ed economica della nazione con il porto mercantile di Aarhus, la sede universitaria e i fiordi riparati del Kattegat.',
    s6_12_name: 'Østjylland (Comando Supremo della Wehrmacht a Silkeborg Bad)',
    s6_12_note: 'La stazione termale di Silkeborg Bad viene requisita per ospitare il quartier generale supremo di tutte le forze armate tedesche in Danimarca (Militärbefehlshaber Dänemark).',
    s13_15_name: 'Østjylland (31 Ottobre 1944: Il Raid Mosquito della RAF sull\'Università di Aarhus)',
    s13_15_note:
      'Il 31 ottobre 1944, 24 cacciabombardieri Mosquito del No. 140 Wing della RAF compiono un raid leggendario sui dormitori dell\'Università di Aarhus trasformati in quartier generale della Gestapo nello Jutland, incenerendo gli archivi e liberando la resistenza regionale con perdite civili minime.',
    s16_name: 'Østjylland (Silkeborg Bad Comando Supremo & Pattugliamento dello Jutland)',
    s16_note: 'Il generale Lindemann coordina la difesa della Danimarca dal quartier generale bunkerizzato di Silkeborg Bad.',
    s17_name: 'Østjylland (Resa del Comando di Silkeborg & Liberazione di Aarhus)',
    s17_note: 'Maggio 1945: il comando di Silkeborg firma la resa delle forze tedesche nello Jutland; ingresso trionfale della resistenza a Aarhus e Horsens.',
    adminTitleGerman: 'Besetztes Dänemark — Oberkommando Dänemark (Silkeborg Bad / Aarhus)',
    adminTitleNorwayExile: 'Kongeriket Danmark — Aarhus og Vejle Amter',
  },

  DK050: {
    nuts: 'DK050',
    name: 'Nordjylland',
    modernName: 'Nordjylland (Jutland Settentrionale)',
    historicalName: 'Aalborg, Hjørring og Thisted Amter (Vendsyssel og Hanstholm)',
    capital: 'Aalborg',
    country: 'DEN',
    keys: ['dk050', 'nordjylland', 'aalborg', 'alborg', 'frederikshavn', 'hjorring', 'hjørring', 'skagen', 'hanstholm', 'thisted', 'vendsyssel'],
    s0_5_name: 'Nordjylland (Aalborg, Frederikshavn og Skagen)',
    s0_5_note: 'Regno di Danimarca — Vertice settentrionale dello Jutland bagnato da Skagerrak e Kattegat, con la rada di Skagen, il porto navale di Frederikshavn e gli aeroporti di Aalborg.',
    s6_12_name: 'Nordjylland (L\'Aviotrasporto di Aalborg & La Fortezza di Hanstholm)',
    s6_12_note:
      '9 aprile 1940: gli aeroporti di Aalborg Ovest e Est vengono conquistati all\'alba dai Fallschirmjäger e diventano il trampolino aereo per la conquista della Norvegia. A Hanstholm l\'Organizzazione Todt costruisce la "Festung Hanstholm" con quattro mostruosi cannoni navali da 38 cm SK C/34 gemelli di quelli di Kristiansand (Batterie Vara), sbarrando totalmente lo Skagerrak alla marina alleata.',
    s13_15_name: 'Nordjylland (La Fortezza Costiera di Hanstholm & Traghetti per Oslo)',
    s13_15_note: 'Frederikshavn è la testa di ponte navale per i convogli di truppe verso Oslo; Hanstholm è la fortezza più pesantemente armata del Nord Europa.',
    s16_name: 'Nordjylland (Batterie Hanstholm Isolate da Mare & Pattugliamento Skagen)',
    s16_note: 'I cannoni da 38 cm di Hanstholm presidiano lo Skagerrak mentre i convogli della Kriegsmarine vengono decimati dagli attacchi aerei della RAF.',
    s17_name: 'Nordjylland (Resa delle Batterie da 38 cm di Hanstholm e di Aalborg)',
    s17_note: 'Maggio 1945: consegna della fortezza di Hanstholm e degli aeroporti di Aalborg intatti alle truppe alleate; fine del blocco marittimo dello Skagerrak.',
    adminTitleGerman: 'Besetztes Dänemark — Festungsbereich Hanstholm / Fliegerhorst Aalborg',
    adminTitleNorwayExile: 'Kongeriket Danmark — Aalborg og Hjørring Amter',
  },
};

// ============================================================================
// 3. FUNZIONI RISOLUTRICI GEOSTORICHE INTEGRATE
// ============================================================================

/**
 * Risolve la provincia norvegese con rigorosa dinamica temporale (Step 0-17).
 */
export function resolveNorwayProvince(
  featureOrId: any,
  s: number,
  rawName?: string
): ResolvedTerritory {
  const p = featureOrId?.properties || featureOrId || {};
  const id = String(featureOrId?.id || p.id || p.NUTS_ID || p.CNTR_ID || '').toUpperCase().trim();
  const nameStr = String(rawName || p.NAME || p.NUTS_NAME || '').toLowerCase().trim();

  // 1. Territori d'Oltremare (Jan Mayen e Svalbard hanno logiche artiche dedicate)
  if (id === 'NO0B1' || nameStr.includes('jan mayen')) {
    const meta = NORWAY_PROVINCES_META['NO0B1'];
    if (s < 6) return makeResult('NOR', meta.s0_5_name, meta.s0_5_note, 'Neutrale', meta.adminTitleNorwayExile);
    if (s <= 12) return makeResult('NOR', meta.s6_12_name, meta.s6_12_note, 'Alleati', meta.adminTitleNorwayExile);
    if (s <= 15) return makeResult('NOR', meta.s13_15_name, meta.s13_15_note, 'Alleati', meta.adminTitleNorwayExile);
    if (s === 16) return makeResult('NOR', meta.s16_name, meta.s16_note, 'Alleati', meta.adminTitleNorwayExile);
    return makeResult('NOR', meta.s17_name, meta.s17_note, 'Alleati', meta.adminTitleNorwayExile);
  }

  if (id === 'NO0B2' || nameStr.includes('svalbard') || nameStr.includes('spitsbergen')) {
    const meta = NORWAY_PROVINCES_META['NO0B2'];
    if (s < 6) return makeResult('NOR', meta.s0_5_name, meta.s0_5_note, 'Neutrale', meta.adminTitleNorwayExile);
    if (s <= 12) return makeResult('NOR', meta.s6_12_name, meta.s6_12_note, 'Alleati', meta.adminTitleNorwayExile);
    if (s <= 15) return makeResult('NOR', meta.s13_15_name, meta.s13_15_note, 'Alleati', meta.adminTitleNorwayExile);
    if (s === 16) return makeResult('NOR', meta.s16_name, meta.s16_note, 'Alleati', meta.adminTitleNorwayExile);
    return makeResult('NOR', meta.s17_name, meta.s17_note, 'Alleati', meta.adminTitleNorwayExile);
  }

  // 2. Identificazione del fylke norvegese
  let meta = NORWAY_PROVINCES_META[id];
  if (!meta) {
    for (const m of Object.values(NORWAY_PROVINCES_META)) {
      if (m.keys.some((k) => nameStr.includes(k) || id.toLowerCase().includes(k))) {
        meta = m;
        break;
      }
    }
  }

  if (!meta) {
    meta = NORWAY_PROVINCES_META['NO081']; // Fallback su Oslo
  }

  // 3. Caso Speciale Troms og Finnmark (NO074):
  // A Step 16-17 il Finnmark orientale (Kirkenes, Vardø, Vadsø) è liberato dall'Armata Rossa e posto sotto sovranità della Norvegia Libera!
  if (meta.nuts === 'NO074' && s >= 16) {
    return makeResult(
      'NOR',
      s === 16 ? meta.s16_name : meta.s17_name,
      s === 16 ? meta.s16_note : meta.s17_note,
      'Alleati',
      meta.adminTitleNorwayExile
    );
  }

  // 4. Risoluzione Temporale Standard (Step 0-17)
  // Step 0 - 5: Sovranità e neutralità del Regno di Norvegia
  if (s < 6) {
    return makeResult(
      'NOR',
      meta.s0_5_name,
      meta.s0_5_note,
      'Neutrale',
      meta.adminTitleNorwayExile
    );
  }

  // Step 6 - 12: Invasione Weserübung, caduta del regno e Reichskommissariat Terboven / Quisling
  if (s <= 12) {
    return makeResult(
      'GER',
      meta.s6_12_name,
      meta.s6_12_note,
      'Asse',
      meta.adminTitleGerman
    );
  }

  // Step 13 - 15: Intensificazione della resistenza Milorg, caccia alla Tirpitz, sabotaggi SOE
  if (s <= 15) {
    return makeResult(
      'GER',
      meta.s13_15_name,
      meta.s13_15_note,
      'Asse',
      meta.adminTitleGerman
    );
  }

  // Step 16: Dicembre 1944 (Festung Norwegen & ritirata tedesca sulla linea del Lyngen)
  if (s === 16) {
    return makeResult(
      'GER',
      meta.s16_name,
      meta.s16_note,
      'Asse',
      meta.adminTitleGerman
    );
  }

  // Step 18: Settembre 1945 (Capitolazione della Wehrmacht, Ritorno di Re Haakon VII & Norvegia Liberata)
  if (s >= 18) {
    return makeResult(
      'NOR',
      `${meta.name} (Regno di Norvegia Liberato — Governo Costituzionale)`,
      "L'8 maggio 1945 il generale tedesco Franz Böhme firma la resa incondizionata delle forze d'occupazione in Norvegia dinanzi alla missione alleata (Force 134); il 7 giugno 1945 Re Haakon VII e la famiglia reale rientrano trionfalmente a Oslo a bordo dell'incrociatore HMS Norfolk.",
      'Alleati',
      'Kongeriket Norge (Kong Haakon VII — Oslo)'
    );
  }

  // Step 17: Aprile 1945 (Crollo del Reich, Sacca di Norvegia isolata prima della capitolazione)
  return makeResult(
    'GER',
    meta.s17_name,
    meta.s17_note,
    'Asse',
    meta.adminTitleGerman
  );
}

/**
 * Risolve la provincia danese con rigorosa dinamica temporale (Step 0-17).
 */
export function resolveDenmarkProvince(
  featureOrId: any,
  s: number,
  rawName?: string
): ResolvedTerritory {
  const p = featureOrId?.properties || featureOrId || {};
  const id = String(featureOrId?.id || p.id || p.NUTS_ID || p.CNTR_ID || '').toUpperCase().trim();
  const nameStr = String(rawName || p.NAME || p.NUTS_NAME || '').toLowerCase().trim();

  // 1. Identificazione dell'amt/landsdel danese
  let meta = DENMARK_PROVINCES_META[id];
  if (!meta) {
    for (const m of Object.values(DENMARK_PROVINCES_META)) {
      if (m.keys.some((k) => nameStr.includes(k) || id.toLowerCase().includes(k))) {
        meta = m;
        break;
      }
    }
  }

  if (!meta) {
    meta = DENMARK_PROVINCES_META['DK011']; // Fallback su Copenaghen
  }

  // 2. Risoluzione Temporale Geostorica (Step 0-17)
  // Step 0 - 5: Regno sovrano di Danimarca, monarchia costituzionale di Cristiano X, neutralità
  if (s < 6) {
    return makeResult(
      'DEN',
      meta.s0_5_name,
      meta.s0_5_note,
      'Neutrale',
      meta.adminTitleNorwayExile
    );
  }

  // Step 6 - 12: Giugno 1940 - Luglio 1943:
  // "Musterprotektorat" (Protettorato Modello sotto occupazione tedesca, ma governo e re danesi funzionanti)
  if (s <= 12) {
    return makeResult(
      'GER',
      meta.s6_12_name,
      meta.s6_12_note,
      'Asse',
      meta.adminTitleGerman
    );
  }

  // Step 13 - 15: Settembre 1943 - Agosto 1944:
  // Legge marziale tedesca dopo Operazione Safari (autoaffondamento della flotta a Holmen, dimissioni del governo danese, salvataggio degli ebrei)
  if (s <= 15) {
    return makeResult(
      'GER',
      meta.s13_15_name,
      meta.s13_15_note,
      'Asse',
      meta.adminTitleGerman
    );
  }

  // Step 16: Dicembre 1944 (Pattugliamento Wehrmacht e terrore della Gestapo, sabotaggi BOPA)
  if (s === 16) {
    return makeResult(
      'GER',
      meta.s16_name,
      meta.s16_note,
      'Asse',
      meta.adminTitleGerman
    );
  }

  // Step >= 18: Settembre 1945 (Resa tedesca, Bornholm sovietica 1945-1946) e Step >= 19 (Sovranità Danese su Bornholm dall'aprile 1946)
  if (s >= 18) {
    const isBornholm = id === 'DK014' || nameStr.includes('bornholm');
    if (isBornholm && s === 18) {
      return makeResult(
        'SOV',
        'Bornholm (Presidio e Occupazione dell\'Armata Rossa Sovietica)',
        "Il 9 maggio 1945 le truppe sovietiche del 2° Fronte Bielorusso sbarcano a Bornholm dopo il rifiuto della guarnigione tedesca di arrendersi all'Armata Rossa; l'isola resta presidiata dalle truppe sovietiche del generale Korotkov fino all'aprile 1946.",
        'Comintern',
        'SSSR — Amministrazione Militare Sovietica di Bornholm (Gen. F.T. Korotkov)'
      );
    }
    if (isBornholm && s >= 19) {
      return makeResult(
        'DEN',
        'Bornholm (Regno di Danimarca — Sovranità Ristabilita dopo il Ritiro Sovietico, 1946)',
        "Il 5 aprile 1946 l'Armata Rossa completa l'evacuazione dell'isola di Bornholm in base all'accordo con Copenaghen: piena sovranità civile e amministrativa del Regno di Danimarca sotto Re Federico IX.",
        'Alleati',
        'Kongeriget Danmark — Bornholms Amt (Rønne)'
      );
    }
    return makeResult(
      'DEN',
      `${meta.name} (${s >= 19 ? 'Regno di Danimarca — Re Federico IX' : 'Regno di Danimarca Liberato — Governo di Unità Nazionale'})`,
      s >= 19
        ? 'Regno sovrano di Danimarca sotto Re Federico IX (asceso al trono nell\'aprile 1947); ricostruzione postbellica e progressiva preparazione dell\'integrazione occidentale.'
        : "Il 4-5 maggio 1945 le forze tedesche in Danimarca capitolano dinanzi al Feldmaresciallo Montgomery; Re Cristiano X riassume le piene prerogative costituzionali a Copenaghen e nomina il governo di unità nazionale guidato da Vilhelm Buhl.",
      'Alleati',
      s >= 19 ? 'Kongeriget Danmark (Kong Frederik IX — København)' : 'Kongeriget Danmark (Kong Christian X — København)'
    );
  }

  // Step 17: Aprile 1945 (Operazione Carthage sullo Shellhus, isolamento Wehrmacht in Danimarca, Bornholm)
  return makeResult(
    'GER',
    meta.s17_name,
    meta.s17_note,
    'Asse',
    meta.adminTitleGerman
  );
}
