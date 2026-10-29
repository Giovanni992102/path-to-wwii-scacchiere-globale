/**
 * Censimento Geocartografico e Toponomastico dei Dipartimenti della Francia Metropolitana e d'Oltremare (1936-1941)
 * Copertura esaustiva e rigorosa di tutti i 96 Dipartimenti Metropolitani (NUTS-3) più i 5 Dipartimenti e Territori d'Oltremare (101 entità totali).
 *
 * Timeline Storica (Step 0 - 8):
 * - Step 0-1 (1936 - mar 1938): Terza Repubblica francese (Albert Lebrun, Léon Blum). Governo del Fronte Popolare,
 *   accordi di Palazzo Matignon (40 ore, ferie pagate, contrattazione collettiva), nazionalizzazioni SNCF e industrie belliche.
 *   Esposizione Universale di Parigi del 1937, presidio della frontiera e opere della Linea Maginot.
 * - Step 2-4 (ott 1938 - apr 1939): Crisi dei Sudeti e Conferenza di Monaco (settembre 1938) siglata da Édouard Daladier.
 *   Febbraio 1939: La Retirada spagnola con oltre 450.000 profughi repubblicani internati nei campi del sud (Gurs, Argelès, Saint-Cyprien, Le Vernet).
 *   Riarmo aereo e potenziamento della Maginot Alpina dell'Armée des Alpes (Gen. René Olry).
 * - Step 5 (set 1939 - mag 1940): 3 settembre 1939: dichiarazione di guerra al Terzo Reich. Mobilitazione generale di 5 milioni di soldati,
 *   Drôle de guerre; evacuazione totale dei civili di Strasburgo e dell'Alsazia-Mosella verso la Dordogna e il sud-ovest.
 * - Step 6 (giu - ago 1940): Campagna di Francia della Wehrmacht (maggio-giugno 1940), sacca di Dunkerque, Parigi città aperta il 10 giugno
 *   e occupata il 14 giugno; dimissioni di Reynaud, appello del 18 giugno del Gen. De Gaulle da Londra.
 *   Armistizio di Compiègne del 22 giugno 1940 e quadripartizione territoriale:
 *     1. Zone occupée sotto il Militärbefehlshaber in Frankreich (MBF, Hôtel Majestic a Parigi);
 *     2. Zone libre sotto l'État Français (Governo di Vichy del maresciallo Philippe Pétain, 10 luglio pieni poteri);
 *     3. Alsazia-Mosella annessa de facto al Terzo Reich (CdZ Unterelsass, Oberelsass, Lothringen nei Gau Baden-Elsass e Westmark);
 *     4. Nord e Pas-de-Calais subordinati al comando militare tedesco di Bruxelles (Alexander von Falkenhausen).
 * - Step 7 (ott 1940): 24 ottobre 1940: Incontro di Montoire tra Adolf Hitler e Philippe Pétain ('collaborazione statale').
 *   Promulgazione del primo Statut des Juifs a Vichy; costruzione delle gigantesche basi bunkerizzate per U-Boot atlantici
 *   (Brest, Lorient-Keroman, Saint-Nazaire, La Pallice a La Rochelle, Bordeaux-Betasom).
 *   Manifesto di Brazzaville (27 ottobre 1940): l'AEF e il Camerun si uniscono alle Forces Françaises Libres (FFL).
 * - Step 8 (apr 1941): Governo dell'ammiraglio François Darlan a Vichy (Protocolli di Parigi), controllo ferreo della Ligne de Démarcation.
 *   Razionamento draconiano e requisizioni; a Lione e nel sud si strutturano le prime reti clandestine di Resistenza (Combat,
 *   Libération-Sud, Franc-Tireur); nel nord nascono OCM, Libération-Nord e matura lo storico sciopero dei minatori del maggio 1941.
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

export type FrancePartition = 'zone_occupee' | 'zone_libre' | 'alsace_moselle' | 'belgium_command' | 'dom_tom';

export interface FranceProvinceInfo {
  nuts: string;
  name: string;
  modernName: string;
  historicalName: string;
  cheflieu: string;
  region: string;
  deptNum: string;
  partition1940: FrancePartition;
  armisticeName?: string;
  repAdminTitle?: string;
  armisticeAdminTitle?: string;
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

export const FRANCE_PROVINCES_META: Record<string, FranceProvinceInfo> = {
  'FR101': {
    nuts: 'FR101',
    name: "Seine (Paris)",
    modernName: "Paris (75, Île-de-France)",
    historicalName: "Seine (Paris - Capitale della Repubblica Francese)",
    cheflieu: "Paris",
    region: "Île-de-France",
    deptNum: '75',
    partition1940: 'zone_occupee',
    armisticeName: "Seine (Paris)",
    repAdminTitle: "Troisième République française — Département de la Seine (Paris)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Hôtel Majestic, Paris)",
    keys: ["paris", "seine", "ville_de_paris"],
    s0_1: "Dipartimento della Senna (Parigi). Capitale politica, economica e culturale della Terza Repubblica francese. Nel maggio 1936 il trionfo elettorale del Fronte Popolare guidato da Léon Blum inaugura una stagione di storiche conquiste sociali con gli accordi di Palazzo Matignon (settimana lavorativa di 40 ore, ferie pagate di 15 giorni e contrattazione collettiva). Nel 1937 l'Esposizione Universale sulle rive della Senna mette in mostra l'orgoglio democratico della Repubblica di fronte ai padiglioni monumentali del Terzo Reich e dell'URSS.",
    s2_4: "Dipartimento della Senna (Parigi). Nel settembre 1938 il presidente del consiglio Édouard Daladier atterra al Bourget dopo aver siglato gli accordi di Monaco, accolto con sollievo misto a cupa consapevolezza. La capitale intensifica le misure di difesa passiva: distribuzione capillare di maschere antigas alla cittadinanza, approntamento di rifugi antiaerei nelle stazioni della metropolitana parigina e coordinamento della contraerea lungo le mura storiche.",
    s5: "Dipartimento della Senna (Parigi). 3 settembre 1939: all'invasione della Polonia fa seguito la dichiarazione di guerra al Terzo Reich. Durante i lunghi mesi della 'Drôle de guerre', Parigi vive sotto un rigoroso oscuramento notturno e il tesseramento del carburante; i tesori inestimabili del Museo del Louvre (inclusa la Gioconda) vengono imballati in casse di legno ed evacuati d'urgenza verso i castelli della Loira e del sud-ovest per preservarli dalle bombe.",
    s6: "Dipartimento della Senna (Parigi). Il 10 giugno 1940 il governo Reynaud lascia precipitosamente Parigi per riparare a Tours e poi Bordeaux; il governatore militare Gen. Dentz dichiara Parigi 'città aperta' per evitarne la distruzione. Il 14 giugno le colonne corazzate della Wehrmacht sfilano sotto l'Arco di Trionfo. In seguito all'armistizio del 22 giugno 1940, Parigi diventa la sede del comando militare d'occupazione tedesco per la Francia (Militärbefehlshaber in Frankreich con sede all'Hôtel Majestic).",
    s7: "Dipartimento della Senna (Parigi). Ottobre 1940: la vita parigina è scandita dall'ora di Berlino, dai cartelli bilingui e dai marchi d'occupazione. Dopo l'incontro di Montoire tra Pétain e Hitler (24 ottobre), la collaborazione statale si manifesta nella capitale con il censimento obbligatorio degli ebrei della Senna; al contempo intellettuali e scienziati fondano le prime cellule cospirative della Rete del Musée de l'Homme (Boris Vildé, Anatole Lewitsky).",
    s8: "Dipartimento della Senna (Parigi). Aprile 1941: il rigido inverno aggrava la penuria di carbone e alimenti, con code interminabili davanti ai negozi. Dopo la storica manifestazione patriottica degli studenti a Place de l'Étoile dell'11 novembre precedente, la Gestapo e la Geheime Feldpolizei intensificano arresti e fucilazioni al Mont-Valérien. Nella capitale occupata si organizzano i comitati clandestini dell'OCM (Organisation Civile et Militaire) e di Libération-Nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FR101'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FR101'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FR101'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FR101'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FR101'].s2_4;
      return FRANCE_PROVINCES_META['FR101'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FR101'].name;
      return FRANCE_PROVINCES_META['FR101'].armisticeName || FRANCE_PROVINCES_META['FR101'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FR101'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FR101'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FR102': {
    nuts: 'FR102',
    name: "Seine-et-Marne (Melun)",
    modernName: "Seine-et-Marne (77, Melun / Île-de-France)",
    historicalName: "Seine-et-Marne (Melun) (Melun - Île-de-France)",
    cheflieu: "Melun",
    region: "Île-de-France",
    deptNum: '77',
    partition1940: 'zone_occupee',
    armisticeName: "Seine-et-Marne (Melun)",
    repAdminTitle: "Troisième République française — Département de Seine-et-Marne (Melun)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["seine_et_marne", "melun", "fontainebleau", "meaux"],
    s0_1: "Dipartimento di Seine-et-Marne (Melun / Fontainebleau). Snodo agricolo primario della Brie e cintura orientale della regione parigina. Il dipartimento ospita la prestigiosa Scuola Militare d'Artiglieria di Fontainebleau e importanti raccordi ferroviari della rete PLM e dell'Est, con fiorenti attività zootecniche e cerealicole.",
    s2_4: "Dipartimento di Seine-et-Marne. Con l'aggravarsi della crisi europea nel 1938, l'aerodromo militare di Melun-Villaroche potenzia le officine per il collaudo di nuovi prototipi di caccia dell'Armée de l'Air; la guarnigione di Fontainebleau avvia l'addestramento accelerato delle riserve d'artiglieria.",
    s5: "Dipartimento di Seine-et-Marne. Settembre 1939 - maggio 1940: mobilitazione massiccia e transito continuo di convogli militari verso il fronte orientale. La piana della Brie accumula scorte alimentari strategiche destinate all'approvvigionamento della capitale.",
    s6: "Dipartimento di Seine-et-Marne. Giugno 1940: teatro di aspri combattimenti di retroguardia lungo i fiumi Marna e Senna. Con l'armistizio del 22 giugno 1940 il dipartimento è pienamente incorporato nella Zone occupée sotto amministrazione tedesca; il castello di Fontainebleau viene occupato dal comando supremo della Wehrmacht per la Francia.",
    s7: "Dipartimento di Seine-et-Marne. Ottobre 1940: occupazione tedesca permanente. La base aerea di Melun-Villaroche viene requisita dalla Luftwaffe come base operativa; i boschi storici di Fontainebleau diventano terreno di addestramento militare germanico.",
    s8: "Dipartimento di Seine-et-Marne. Aprile 1941: rigido razionamento agroalimentare e requisizioni forzate di grano e latticini verso il Reich. I ferrovieri di Melun e Montereau avviano i primi atti isolati di sabotaggio lungo le arterie dirette a est.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FR102'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FR102'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FR102'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FR102'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FR102'].s2_4;
      return FRANCE_PROVINCES_META['FR102'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FR102'].name;
      return FRANCE_PROVINCES_META['FR102'].armisticeName || FRANCE_PROVINCES_META['FR102'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FR102'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FR102'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FR103': {
    nuts: 'FR103',
    name: "Seine-et-Oise (Versailles)",
    modernName: "Yvelines (78, Versailles / Île-de-France)",
    historicalName: "Seine-et-Oise (Versailles) (Versailles - Île-de-France)",
    cheflieu: "Versailles",
    region: "Île-de-France",
    deptNum: '78',
    partition1940: 'zone_occupee',
    armisticeName: "Seine-et-Oise (Versailles)",
    repAdminTitle: "Troisième République française — Département de Seine-et-Oise (Versailles)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["yvelines", "versailles", "seine_et_oise"],
    s0_1: "Dipartimento di Seine-et-Oise — Versailles (Yvelines). Sede storica della Prefettura di Seine-et-Oise a Versailles e centro cerimoniale della Repubblica. Accanto alla celebre reggia barocca, il settore occidentale della cintura parigina ospita basi aeree strategiche (Villacoublay) e istituti militari di trasmissione e logistica.",
    s2_4: "Dipartimento di Seine-et-Oise — Versailles. Nel 1938-1939 la base di Villacoublay è il cuore pulsante dei collaudi aeronautici militari francesi; i reggimenti del Genio di Versailles curano l'allestimento di linee telefoniche corazzate per il Gran Quartier Generale.",
    s5: "Dipartimento di Seine-et-Oise — Versailles. Settembre 1939 - maggio 1940: presidio logistico e addestramento reclute durante la 'Drôle de guerre'. Villacoublay subisce i primi bombardamenti della Luftwaffe il 3 giugno 1940.",
    s6: "Dipartimento di Seine-et-Oise — Versailles. Giugno 1940: le truppe tedesche occupano Versailles e Saint-Germain-en-Laye il 14 giugno. In seguito all'armistizio, Saint-Germain diviene sede del comando militare tedesco Oberbefehlshaber West (OB West) guidato dal feldmaresciallo von Rundstedt.",
    s7: "Dipartimento di Seine-et-Oise — Versailles. Ottobre 1940: Versailles e i centri delle Yvelines sono presidiati da reparti d'élite della Wehrmacht; la base di Villacoublay è impiegata intensivamente dalla Luftwaffe per la riparazione e manutenzione dei bombardieri Heinkel e Junkers.",
    s8: "Dipartimento di Seine-et-Oise — Versailles. Aprile 1941: rigido controllo della popolazione e divieto di assembramenti. Nelle cittadine industriali del settore si radunano i primi nuclei di sabotatori legati ai sindacati clandestini dell'aeronautica.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FR103'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FR103'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FR103'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FR103'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FR103'].s2_4;
      return FRANCE_PROVINCES_META['FR103'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FR103'].name;
      return FRANCE_PROVINCES_META['FR103'].armisticeName || FRANCE_PROVINCES_META['FR103'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FR103'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FR103'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FR104': {
    nuts: 'FR104',
    name: "Seine-et-Oise (Corbeil / Évry)",
    modernName: "Essonne (91, Évry / Corbeil / Île-de-France)",
    historicalName: "Seine-et-Oise (Corbeil / Évry) (Corbeil - Île-de-France)",
    cheflieu: "Corbeil",
    region: "Île-de-France",
    deptNum: '91',
    partition1940: 'zone_occupee',
    armisticeName: "Seine-et-Oise (Corbeil / Évry)",
    repAdminTitle: "Troisième République française — Département de Seine-et-Oise (Corbeil)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["essonne", "corbeil", "evry", "etampes"],
    s0_1: "Dipartimento di Seine-et-Oise (Corbeil / Évry). Territorio della regione Île-de-France con capoluogo Corbeil. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Seine-et-Oise (Corbeil / Évry). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Corbeil adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Seine-et-Oise (Corbeil / Évry). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Seine-et-Oise (Corbeil / Évry). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Seine-et-Oise (Corbeil / Évry). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Seine-et-Oise (Corbeil / Évry). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Corbeil; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FR104'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FR104'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FR104'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FR104'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FR104'].s2_4;
      return FRANCE_PROVINCES_META['FR104'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FR104'].name;
      return FRANCE_PROVINCES_META['FR104'].armisticeName || FRANCE_PROVINCES_META['FR104'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FR104'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FR104'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FR105': {
    nuts: 'FR105',
    name: "Seine (Nanterre / Boulogne-Billancourt)",
    modernName: "Hauts-de-Seine (92, Nanterre / Boulogne-Billancourt / Île-de-France)",
    historicalName: "Seine (Nanterre / Boulogne-Billancourt) (Nanterre - Île-de-France)",
    cheflieu: "Nanterre",
    region: "Île-de-France",
    deptNum: '92',
    partition1940: 'zone_occupee',
    armisticeName: "Seine (Nanterre / Boulogne-Billancourt)",
    repAdminTitle: "Troisième République française — Département de la Seine (Banlieue Ouest)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["hauts_de_seine", "nanterre", "boulogne_billancourt", "neuilly_sur_seine"],
    s0_1: "Dipartimento della Senna — Petite Couronne Ouest (Hauts-de-Seine). Polo industriale d'avanguardia a Boulogne-Billancourt, Issy-les-Moulineaux e Nanterre. Cuore pulsante della produzione automobilistica e pesante con gli stabilimenti Renault dell'Île Seguin e Citroën, nonché officine aeronautiche Caudron-Renault e Morane-Saulnier; roccaforte operaia e sindacale del Fronte Popolare.",
    s2_4: "Dipartimento della Senna — Petite Couronne Ouest. 1938-1939: riconversione accelerata delle catene di montaggio di Boulogne-Billancourt per la produzione di carri armati leggeri Renault R35, motori aeronautici e autocarri per l'esercito francese.",
    s5: "Dipartimento della Senna — Petite Couronne Ouest. Settembre 1939 - maggio 1940: lavoro a ciclo continuo 24 ore su 24 nelle officine meccaniche per sostenere lo sforzo bellico; il 3 giugno 1940 i massicci bombardamenti tedeschi dell'Operazione Paula colpiscono duramente gli stabilimenti di Billancourt.",
    s6: "Dipartimento della Senna — Petite Couronne Ouest. Giugno 1940: occupazione tedesca e requisizione immediata degli impianti industriali da parte del MBF; Louis Renault accetta di rimettere in funzione le fabbriche sotto controllo tedesco per evitare la deportazione degli operai e il trasferimento dei macchinari in Germania.",
    s7: "Dipartimento della Senna — Petite Couronne Ouest. Ottobre 1940: le officine di Billancourt riparano e producono automezzi da trasporto per la Wehrmacht. Primi scioperi bianchi e rallentamenti intenzionali della produzione operaia.",
    s8: "Dipartimento della Senna — Petite Couronne Ouest. Aprile 1941: sorveglianza militare armata all'interno delle fabbriche dell'Île Seguin; la nascente resistenza operaia comunista diffonde i primi volantini clandestini incitando al boicottaggio delle forniture militari destinate al Terzo Reich.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FR105'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FR105'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FR105'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FR105'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FR105'].s2_4;
      return FRANCE_PROVINCES_META['FR105'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FR105'].name;
      return FRANCE_PROVINCES_META['FR105'].armisticeName || FRANCE_PROVINCES_META['FR105'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FR105'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FR105'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FR106': {
    nuts: 'FR106',
    name: "Seine (Saint-Denis / Bobigny)",
    modernName: "Seine-Saint-Denis (93, Bobigny / Saint-Denis / Île-de-France)",
    historicalName: "Seine (Saint-Denis / Bobigny) (Bobigny - Île-de-France)",
    cheflieu: "Bobigny",
    region: "Île-de-France",
    deptNum: '93',
    partition1940: 'zone_occupee',
    armisticeName: "Seine (Saint-Denis / Bobigny)",
    repAdminTitle: "Troisième République française — Département de la Seine (Banlieue Nord)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["seine_saint_denis", "saint_denis", "bobigny", "aubervilliers"],
    s0_1: "Dipartimento della Senna — Saint-Denis (Seine-Saint-Denis). Cintura industriale settentrionale di Parigi con un'alta concentrazione di complessi metallurgici, chimici e scali ferroviari merci. A Le Bourget sorge il principale aeroporto civile e militare della capitale, teatro dello storico arrivo di Lindbergh e snodo delle comunicazioni aeree continentali.",
    s2_4: "Dipartimento della Senna — Saint-Denis. 1938-1939: l'aeroporto di Le Bourget è presidiato da squadriglie di caccia dell'Armée de l'Air a difesa della capitale; i depositi di munizioni e gli snodi di Bobigny e Noisy-le-Sec vengono protetti da batterie contraeree.",
    s5: "Dipartimento della Senna — Saint-Denis. Settembre 1939 - maggio 1940: nodo logistico per l'imbarco di truppe e rifornimenti diretti verso la Mosa e la frontiera belga. La caserma incompiuta della Cité de la Muette a Drancy viene adibita a deposito militare.",
    s6: "Dipartimento della Senna — Saint-Denis. Giugno 1940: bombardamento e rapida occupazione di Le Bourget da parte delle forze tedesche. Con l'armistizio del 22 giugno 1940, Le Bourget diventa la base principale di trasporto aereo della Luftwaffe a nord di Parigi.",
    s7: "Dipartimento della Senna — Saint-Denis. Ottobre 1940: le autorità d'occupazione tedesche e la polizia francese utilizzano la caserma di Drancy per internare prigionieri di guerra francesi e britannici prima del trasferimento nei campi del Reich.",
    s8: "Dipartimento della Senna — Saint-Denis. Aprile 1941: mentre gli scali ferroviari subiscono i primi atti di sabotaggio da parte dei ferrovieri patrioti, a Drancy le autorità collaborazioniste preparano la famigerata trasformazione della struttura in campo di internamento e transito per la popolazione ebraica.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FR106'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FR106'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FR106'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FR106'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FR106'].s2_4;
      return FRANCE_PROVINCES_META['FR106'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FR106'].name;
      return FRANCE_PROVINCES_META['FR106'].armisticeName || FRANCE_PROVINCES_META['FR106'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FR106'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FR106'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FR107': {
    nuts: 'FR107',
    name: "Seine (Créteil / Vincennes)",
    modernName: "Val-de-Marne (94, Créteil / Vincennes / Île-de-France)",
    historicalName: "Seine (Créteil / Vincennes) (Créteil - Île-de-France)",
    cheflieu: "Créteil",
    region: "Île-de-France",
    deptNum: '94',
    partition1940: 'zone_occupee',
    armisticeName: "Seine (Créteil / Vincennes)",
    repAdminTitle: "Troisième République française — Département de la Seine (Banlieue Sud-Est)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["val_de_marne", "creteil", "vincennes", "saint_maur"],
    s0_1: "Dipartimento di Seine (Créteil / Vincennes). Territorio della regione Île-de-France con capoluogo Créteil. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Seine (Créteil / Vincennes). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Créteil adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Seine (Créteil / Vincennes). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Seine (Créteil / Vincennes). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Seine (Créteil / Vincennes). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Seine (Créteil / Vincennes). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Créteil; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FR107'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FR107'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FR107'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FR107'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FR107'].s2_4;
      return FRANCE_PROVINCES_META['FR107'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FR107'].name;
      return FRANCE_PROVINCES_META['FR107'].armisticeName || FRANCE_PROVINCES_META['FR107'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FR107'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FR107'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FR108': {
    nuts: 'FR108',
    name: "Seine-et-Oise (Pontoise / Argenteuil)",
    modernName: "Val-d'Oise (95, Pontoise / Argenteuil / Île-de-France)",
    historicalName: "Seine-et-Oise (Pontoise / Argenteuil) (Pontoise - Île-de-France)",
    cheflieu: "Pontoise",
    region: "Île-de-France",
    deptNum: '95',
    partition1940: 'zone_occupee',
    armisticeName: "Seine-et-Oise (Pontoise / Argenteuil)",
    repAdminTitle: "Troisième République française — Département de Seine-et-Oise (Pontoise)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["val_d_oise", "val_doise", "pontoise", "argenteuil"],
    s0_1: "Dipartimento di Seine-et-Oise (Pontoise / Argenteuil). Territorio della regione Île-de-France con capoluogo Pontoise. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Seine-et-Oise (Pontoise / Argenteuil). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Pontoise adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Seine-et-Oise (Pontoise / Argenteuil). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Seine-et-Oise (Pontoise / Argenteuil). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Seine-et-Oise (Pontoise / Argenteuil). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Seine-et-Oise (Pontoise / Argenteuil). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Pontoise; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FR108'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FR108'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FR108'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FR108'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FR108'].s2_4;
      return FRANCE_PROVINCES_META['FR108'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FR108'].name;
      return FRANCE_PROVINCES_META['FR108'].armisticeName || FRANCE_PROVINCES_META['FR108'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FR108'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FR108'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRB01': {
    nuts: 'FRB01',
    name: "Cher (Bourges)",
    modernName: "Cher (18, Bourges / Centre-Val de Loire)",
    historicalName: "Cher (Bourges) (Bourges - Centre-Val de Loire)",
    cheflieu: "Bourges",
    region: "Centre-Val de Loire",
    deptNum: '18',
    partition1940: 'zone_occupee',
    armisticeName: "Cher (Bourges)",
    repAdminTitle: "Troisième République française — Département du Cher (Bourges)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Ligne de démarcation)",
    keys: ["cher", "bourges", "vierzon"],
    s0_1: "Dipartimento di Cher (Bourges). Territorio della regione Centre-Val de Loire con capoluogo Bourges. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Cher (Bourges). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Bourges adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Cher (Bourges). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Cher (Bourges). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Cher (Bourges). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Cher (Bourges). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Bourges; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRB01'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRB01'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRB01'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRB01'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRB01'].s2_4;
      return FRANCE_PROVINCES_META['FRB01'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRB01'].name;
      return FRANCE_PROVINCES_META['FRB01'].armisticeName || FRANCE_PROVINCES_META['FRB01'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRB01'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRB01'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRB02': {
    nuts: 'FRB02',
    name: "Eure-et-Loir (Chartres)",
    modernName: "Eure-et-Loir (28, Chartres / Centre-Val de Loire)",
    historicalName: "Eure-et-Loir (Chartres) (Chartres - Centre-Val de Loire)",
    cheflieu: "Chartres",
    region: "Centre-Val de Loire",
    deptNum: '28',
    partition1940: 'zone_occupee',
    armisticeName: "Eure-et-Loir (Chartres)",
    repAdminTitle: "Troisième République française — Département d\\",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["eure_et_loir", "chartres", "dreux", "chateaudun"],
    s0_1: "Dipartimento di Eure-et-Loir (Chartres). Territorio della regione Centre-Val de Loire con capoluogo Chartres. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Eure-et-Loir (Chartres). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Chartres adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Eure-et-Loir (Chartres). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Eure-et-Loir (Chartres). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Eure-et-Loir (Chartres). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Eure-et-Loir (Chartres). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Chartres; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRB02'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRB02'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRB02'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRB02'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRB02'].s2_4;
      return FRANCE_PROVINCES_META['FRB02'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRB02'].name;
      return FRANCE_PROVINCES_META['FRB02'].armisticeName || FRANCE_PROVINCES_META['FRB02'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRB02'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRB02'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRB03': {
    nuts: 'FRB03',
    name: "Indre (Châteauroux)",
    modernName: "Indre (36, Châteauroux / Centre-Val de Loire)",
    historicalName: "Indre (Châteauroux) (Châteauroux - Centre-Val de Loire)",
    cheflieu: "Châteauroux",
    region: "Centre-Val de Loire",
    deptNum: '36',
    partition1940: 'zone_occupee',
    armisticeName: "Indre (Châteauroux)",
    repAdminTitle: "Troisième République française — Département de l\\",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["indre", "chateauroux", "issoudun"],
    s0_1: "Dipartimento di Indre (Châteauroux). Territorio della regione Centre-Val de Loire con capoluogo Châteauroux. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Indre (Châteauroux). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Châteauroux adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Indre (Châteauroux). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Indre (Châteauroux). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Indre (Châteauroux). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Indre (Châteauroux). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Châteauroux; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRB03'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRB03'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRB03'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRB03'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRB03'].s2_4;
      return FRANCE_PROVINCES_META['FRB03'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRB03'].name;
      return FRANCE_PROVINCES_META['FRB03'].armisticeName || FRANCE_PROVINCES_META['FRB03'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRB03'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRB03'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRB04': {
    nuts: 'FRB04',
    name: "Indre-et-Loire (Tours)",
    modernName: "Indre-et-Loire (37, Tours / Centre-Val de Loire)",
    historicalName: "Indre-et-Loire (Tours) (Tours - Centre-Val de Loire)",
    cheflieu: "Tours",
    region: "Centre-Val de Loire",
    deptNum: '37',
    partition1940: 'zone_occupee',
    armisticeName: "Indre-et-Loire (Tours)",
    repAdminTitle: "Troisième République française — Département d\\",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["indre_et_loire", "tours", "chinon", "loches"],
    s0_1: "Dipartimento di Indre-et-Loire (Tours). Territorio della regione Centre-Val de Loire con capoluogo Tours. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Indre-et-Loire (Tours). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Tours adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Indre-et-Loire (Tours). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Indre-et-Loire (Tours). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Indre-et-Loire (Tours). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Indre-et-Loire (Tours). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Tours; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRB04'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRB04'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRB04'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRB04'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRB04'].s2_4;
      return FRANCE_PROVINCES_META['FRB04'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRB04'].name;
      return FRANCE_PROVINCES_META['FRB04'].armisticeName || FRANCE_PROVINCES_META['FRB04'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRB04'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRB04'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRB05': {
    nuts: 'FRB05',
    name: "Loir-et-Cher (Blois)",
    modernName: "Loir-et-Cher (41, Blois / Centre-Val de Loire)",
    historicalName: "Loir-et-Cher (Blois) (Blois - Centre-Val de Loire)",
    cheflieu: "Blois",
    region: "Centre-Val de Loire",
    deptNum: '41',
    partition1940: 'zone_occupee',
    armisticeName: "Loir-et-Cher (Blois)",
    repAdminTitle: "Troisième République française — Département de Loir-et-Cher (Blois)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["loir_et_cher", "blois", "romorantin", "vendome"],
    s0_1: "Dipartimento di Loir-et-Cher (Blois). Territorio della regione Centre-Val de Loire con capoluogo Blois. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Loir-et-Cher (Blois). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Blois adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Loir-et-Cher (Blois). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Loir-et-Cher (Blois). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Loir-et-Cher (Blois). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Loir-et-Cher (Blois). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Blois; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRB05'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRB05'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRB05'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRB05'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRB05'].s2_4;
      return FRANCE_PROVINCES_META['FRB05'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRB05'].name;
      return FRANCE_PROVINCES_META['FRB05'].armisticeName || FRANCE_PROVINCES_META['FRB05'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRB05'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRB05'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRB06': {
    nuts: 'FRB06',
    name: "Loiret (Orléans)",
    modernName: "Loiret (45, Orléans / Centre-Val de Loire)",
    historicalName: "Loiret (Orléans) (Orléans - Centre-Val de Loire)",
    cheflieu: "Orléans",
    region: "Centre-Val de Loire",
    deptNum: '45',
    partition1940: 'zone_occupee',
    armisticeName: "Loiret (Orléans)",
    repAdminTitle: "Troisième République française — Département du Loiret (Orléans)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["loiret", "orleans", "montargis", "gien"],
    s0_1: "Dipartimento di Loiret (Orléans). Territorio della regione Centre-Val de Loire con capoluogo Orléans. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Loiret (Orléans). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Orléans adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Loiret (Orléans). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Loiret (Orléans). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Loiret (Orléans). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Loiret (Orléans). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Orléans; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRB06'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRB06'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRB06'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRB06'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRB06'].s2_4;
      return FRANCE_PROVINCES_META['FRB06'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRB06'].name;
      return FRANCE_PROVINCES_META['FRB06'].armisticeName || FRANCE_PROVINCES_META['FRB06'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRB06'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRB06'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRC11': {
    nuts: 'FRC11',
    name: "Côte-d\\",
    modernName: "Côte-d'Or (21, Dijon / Bourgogne-Franche-Comté)",
    historicalName: "Côte-d\\ (Dijon - Bourgogne-Franche-Comté)",
    cheflieu: "Dijon",
    region: "Bourgogne-Franche-Comté",
    deptNum: '21',
    partition1940: 'zone_occupee',
    armisticeName: "Côte-d\\",
    repAdminTitle: "Troisième République française — Département de la Côte-d\\",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["cote_d_or", "cote_dor", "dijon", "beaune"],
    s0_1: "Dipartimento di Côte-d\\. Territorio della regione Bourgogne-Franche-Comté con capoluogo Dijon. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Côte-d\\. Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Dijon adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Côte-d\\. Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Côte-d\\. Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Côte-d\\. Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Côte-d\\. Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Dijon; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRC11'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRC11'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRC11'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRC11'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRC11'].s2_4;
      return FRANCE_PROVINCES_META['FRC11'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRC11'].name;
      return FRANCE_PROVINCES_META['FRC11'].armisticeName || FRANCE_PROVINCES_META['FRC11'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRC11'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRC11'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRC12': {
    nuts: 'FRC12',
    name: "Nièvre (Nevers)",
    modernName: "Nièvre (58, Nevers / Bourgogne-Franche-Comté)",
    historicalName: "Nièvre (Nevers) (Nevers - Bourgogne-Franche-Comté)",
    cheflieu: "Nevers",
    region: "Bourgogne-Franche-Comté",
    deptNum: '58',
    partition1940: 'zone_occupee',
    armisticeName: "Nièvre (Nevers)",
    repAdminTitle: "Troisième République française — Département de la Nièvre (Nevers)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["nievre", "nevers", "cosne"],
    s0_1: "Dipartimento di Nièvre (Nevers). Territorio della regione Bourgogne-Franche-Comté con capoluogo Nevers. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Nièvre (Nevers). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Nevers adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Nièvre (Nevers). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Nièvre (Nevers). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Nièvre (Nevers). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Nièvre (Nevers). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Nevers; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRC12'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRC12'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRC12'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRC12'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRC12'].s2_4;
      return FRANCE_PROVINCES_META['FRC12'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRC12'].name;
      return FRANCE_PROVINCES_META['FRC12'].armisticeName || FRANCE_PROVINCES_META['FRC12'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRC12'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRC12'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRC13': {
    nuts: 'FRC13',
    name: "Saône-et-Loire (Mâcon)",
    modernName: "Saône-et-Loire (71, Mâcon / Bourgogne-Franche-Comté)",
    historicalName: "Saône-et-Loire (Mâcon) (Mâcon - Bourgogne-Franche-Comté)",
    cheflieu: "Mâcon",
    region: "Bourgogne-Franche-Comté",
    deptNum: '71',
    partition1940: 'zone_occupee',
    armisticeName: "Saône-et-Loire (Mâcon)",
    repAdminTitle: "Troisième République française — Département de Saône-et-Loire (Mâcon)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Ligne de démarcation)",
    keys: ["saone_et_loire", "macon", "chalon_sur_saone", "autun", "le_creusot"],
    s0_1: "Dipartimento di Saône-et-Loire (Mâcon). Territorio della regione Bourgogne-Franche-Comté con capoluogo Mâcon. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Saône-et-Loire (Mâcon). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Mâcon adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Saône-et-Loire (Mâcon). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Saône-et-Loire (Mâcon). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Saône-et-Loire (Mâcon). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Saône-et-Loire (Mâcon). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Mâcon; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRC13'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRC13'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRC13'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRC13'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRC13'].s2_4;
      return FRANCE_PROVINCES_META['FRC13'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRC13'].name;
      return FRANCE_PROVINCES_META['FRC13'].armisticeName || FRANCE_PROVINCES_META['FRC13'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRC13'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRC13'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRC14': {
    nuts: 'FRC14',
    name: "Yonne (Auxerre)",
    modernName: "Yonne (89, Auxerre / Bourgogne-Franche-Comté)",
    historicalName: "Yonne (Auxerre) (Auxerre - Bourgogne-Franche-Comté)",
    cheflieu: "Auxerre",
    region: "Bourgogne-Franche-Comté",
    deptNum: '89',
    partition1940: 'zone_occupee',
    armisticeName: "Yonne (Auxerre)",
    repAdminTitle: "Troisième République française — Département de l\\",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["yonne", "auxerre", "sens"],
    s0_1: "Dipartimento di Yonne (Auxerre). Territorio della regione Bourgogne-Franche-Comté con capoluogo Auxerre. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Yonne (Auxerre). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Auxerre adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Yonne (Auxerre). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Yonne (Auxerre). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Yonne (Auxerre). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Yonne (Auxerre). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Auxerre; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRC14'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRC14'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRC14'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRC14'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRC14'].s2_4;
      return FRANCE_PROVINCES_META['FRC14'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRC14'].name;
      return FRANCE_PROVINCES_META['FRC14'].armisticeName || FRANCE_PROVINCES_META['FRC14'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRC14'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRC14'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRC21': {
    nuts: 'FRC21',
    name: "Doubs (Besançon)",
    modernName: "Doubs (25, Besançon / Bourgogne-Franche-Comté)",
    historicalName: "Doubs (Besançon) (Besançon - Bourgogne-Franche-Comté)",
    cheflieu: "Besançon",
    region: "Bourgogne-Franche-Comté",
    deptNum: '25',
    partition1940: 'zone_occupee',
    armisticeName: "Doubs (Besançon)",
    repAdminTitle: "Troisième République française — Département du Doubs (Besançon)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)",
    keys: ["doubs", "besancon", "montbeliard", "pontarlier"],
    s0_1: "Dipartimento di Doubs (Besançon). Territorio della regione Bourgogne-Franche-Comté con capoluogo Besançon. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Doubs (Besançon). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Besançon adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Doubs (Besançon). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Doubs (Besançon). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Doubs (Besançon). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Doubs (Besançon). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Besançon; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRC21'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRC21'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRC21'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRC21'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRC21'].s2_4;
      return FRANCE_PROVINCES_META['FRC21'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRC21'].name;
      return FRANCE_PROVINCES_META['FRC21'].armisticeName || FRANCE_PROVINCES_META['FRC21'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRC21'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRC21'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRC22': {
    nuts: 'FRC22',
    name: "Jura (Lons-le-Saunier)",
    modernName: "Jura (39, Lons-le-Saunier / Bourgogne-Franche-Comté)",
    historicalName: "Jura (Lons-le-Saunier) (Lons-le-Saunier - Bourgogne-Franche-Comté)",
    cheflieu: "Lons-le-Saunier",
    region: "Bourgogne-Franche-Comté",
    deptNum: '39',
    partition1940: 'zone_occupee',
    armisticeName: "Jura (Lons-le-Saunier)",
    repAdminTitle: "Troisième République française — Département du Jura (Lons-le-Saunier)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)",
    keys: ["jura", "lons_le_saunier", "dole", "saint_claude"],
    s0_1: "Dipartimento di Jura (Lons-le-Saunier). Territorio della regione Bourgogne-Franche-Comté con capoluogo Lons-le-Saunier. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Jura (Lons-le-Saunier). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Lons-le-Saunier adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Jura (Lons-le-Saunier). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Jura (Lons-le-Saunier). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Jura (Lons-le-Saunier). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Jura (Lons-le-Saunier). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Lons-le-Saunier; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRC22'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRC22'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRC22'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRC22'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRC22'].s2_4;
      return FRANCE_PROVINCES_META['FRC22'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRC22'].name;
      return FRANCE_PROVINCES_META['FRC22'].armisticeName || FRANCE_PROVINCES_META['FRC22'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRC22'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRC22'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRC23': {
    nuts: 'FRC23',
    name: "Haute-Saône (Vesoul)",
    modernName: "Haute-Saône (70, Vesoul / Bourgogne-Franche-Comté)",
    historicalName: "Haute-Saône (Vesoul) (Vesoul - Bourgogne-Franche-Comté)",
    cheflieu: "Vesoul",
    region: "Bourgogne-Franche-Comté",
    deptNum: '70',
    partition1940: 'zone_occupee',
    armisticeName: "Haute-Saône (Vesoul)",
    repAdminTitle: "Troisième République française — Département de la Haute-Saône (Vesoul)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)",
    keys: ["haute_saone", "vesoul", "lure"],
    s0_1: "Dipartimento di Haute-Saône (Vesoul). Territorio della regione Bourgogne-Franche-Comté con capoluogo Vesoul. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Haute-Saône (Vesoul). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Vesoul adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Haute-Saône (Vesoul). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Haute-Saône (Vesoul). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Haute-Saône (Vesoul). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Haute-Saône (Vesoul). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Vesoul; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRC23'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRC23'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRC23'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRC23'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRC23'].s2_4;
      return FRANCE_PROVINCES_META['FRC23'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRC23'].name;
      return FRANCE_PROVINCES_META['FRC23'].armisticeName || FRANCE_PROVINCES_META['FRC23'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRC23'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRC23'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRC24': {
    nuts: 'FRC24',
    name: "Territoire de Belfort (Belfort)",
    modernName: "Territoire de Belfort (90, Belfort / Bourgogne-Franche-Comté)",
    historicalName: "Territoire de Belfort (Belfort) (Belfort - Bourgogne-Franche-Comté)",
    cheflieu: "Belfort",
    region: "Bourgogne-Franche-Comté",
    deptNum: '90',
    partition1940: 'zone_occupee',
    armisticeName: "Territoire de Belfort (Belfort)",
    repAdminTitle: "Troisième République française — Territoire de Belfort (Trouée de Belfort)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)",
    keys: ["territoire_de_belfort", "belfort", "trouee_de_belfort"],
    s0_1: "Dipartimento di Territoire de Belfort (Belfort). Territorio della regione Bourgogne-Franche-Comté con capoluogo Belfort. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Territoire de Belfort (Belfort). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Belfort adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Territoire de Belfort (Belfort). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Territoire de Belfort (Belfort). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Territoire de Belfort (Belfort). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Territoire de Belfort (Belfort). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Belfort; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRC24'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRC24'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRC24'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRC24'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRC24'].s2_4;
      return FRANCE_PROVINCES_META['FRC24'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRC24'].name;
      return FRANCE_PROVINCES_META['FRC24'].armisticeName || FRANCE_PROVINCES_META['FRC24'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRC24'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRC24'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRD11': {
    nuts: 'FRD11',
    name: "Calvados (Caen)",
    modernName: "Calvados (14, Caen / Normandie)",
    historicalName: "Calvados (Caen) (Caen - Normandie)",
    cheflieu: "Caen",
    region: "Normandie",
    deptNum: '14',
    partition1940: 'zone_occupee',
    armisticeName: "Calvados (Caen)",
    repAdminTitle: "Troisième République française — Département du Calvados (Caen)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Côte de la Manche)",
    keys: ["calvados", "caen", "bayeux", "lisieux"],
    s0_1: "Dipartimento di Calvados (Caen). Territorio della regione Normandie con capoluogo Caen. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Calvados (Caen). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Caen adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Calvados (Caen). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Calvados (Caen). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Calvados (Caen). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Calvados (Caen). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Caen; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRD11'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRD11'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRD11'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRD11'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRD11'].s2_4;
      return FRANCE_PROVINCES_META['FRD11'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRD11'].name;
      return FRANCE_PROVINCES_META['FRD11'].armisticeName || FRANCE_PROVINCES_META['FRD11'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRD11'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRD11'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRD12': {
    nuts: 'FRD12',
    name: "Manche (Saint-Lô / Cherbourg)",
    modernName: "Manche (50, Saint-Lô / Cherbourg / Normandie)",
    historicalName: "Manche (Saint-Lô / Cherbourg) (Saint-Lô - Normandie)",
    cheflieu: "Saint-Lô",
    region: "Normandie",
    deptNum: '50',
    partition1940: 'zone_occupee',
    armisticeName: "Manche (Saint-Lô / Cherbourg)",
    repAdminTitle: "Troisième République française — Département de la Manche (Cherbourg)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Kriegsmarine Cherbourg)",
    keys: ["manche", "saint_lo", "cherbourg", "avranches", "cotentin"],
    s0_1: "Dipartimento di Manche (Saint-Lô / Cherbourg). Territorio della regione Normandie con capoluogo Saint-Lô. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Manche (Saint-Lô / Cherbourg). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Saint-Lô adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Manche (Saint-Lô / Cherbourg). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Manche (Saint-Lô / Cherbourg). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Manche (Saint-Lô / Cherbourg). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Manche (Saint-Lô / Cherbourg). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Saint-Lô; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRD12'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRD12'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRD12'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRD12'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRD12'].s2_4;
      return FRANCE_PROVINCES_META['FRD12'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRD12'].name;
      return FRANCE_PROVINCES_META['FRD12'].armisticeName || FRANCE_PROVINCES_META['FRD12'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRD12'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRD12'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRD13': {
    nuts: 'FRD13',
    name: "Orne (Alençon)",
    modernName: "Orne (61, Alençon / Normandie)",
    historicalName: "Orne (Alençon) (Alençon - Normandie)",
    cheflieu: "Alençon",
    region: "Normandie",
    deptNum: '61',
    partition1940: 'zone_occupee',
    armisticeName: "Orne (Alençon)",
    repAdminTitle: "Troisième République française — Département de l\\",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["orne", "alencon", "argentan"],
    s0_1: "Dipartimento di Orne (Alençon). Territorio della regione Normandie con capoluogo Alençon. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Orne (Alençon). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Alençon adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Orne (Alençon). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Orne (Alençon). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Orne (Alençon). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Orne (Alençon). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Alençon; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRD13'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRD13'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRD13'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRD13'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRD13'].s2_4;
      return FRANCE_PROVINCES_META['FRD13'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRD13'].name;
      return FRANCE_PROVINCES_META['FRD13'].armisticeName || FRANCE_PROVINCES_META['FRD13'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRD13'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRD13'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRD21': {
    nuts: 'FRD21',
    name: "Eure (Évreux)",
    modernName: "Eure (27, Évreux / Normandie)",
    historicalName: "Eure (Évreux) (Évreux - Normandie)",
    cheflieu: "Évreux",
    region: "Normandie",
    deptNum: '27',
    partition1940: 'zone_occupee',
    armisticeName: "Eure (Évreux)",
    repAdminTitle: "Troisième République française — Département de l\\",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["eure", "evreux", "les_andelys", "vernon"],
    s0_1: "Dipartimento di Eure (Évreux). Territorio della regione Normandie con capoluogo Évreux. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Eure (Évreux). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Évreux adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Eure (Évreux). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Eure (Évreux). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Eure (Évreux). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Eure (Évreux). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Évreux; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRD21'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRD21'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRD21'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRD21'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRD21'].s2_4;
      return FRANCE_PROVINCES_META['FRD21'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRD21'].name;
      return FRANCE_PROVINCES_META['FRD21'].armisticeName || FRANCE_PROVINCES_META['FRD21'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRD21'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRD21'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRD22': {
    nuts: 'FRD22',
    name: "Seine-Inférieure (Rouen / Le Havre)",
    modernName: "Seine-Maritime (76, Rouen / Le Havre / Normandie)",
    historicalName: "Seine-Inférieure (Rouen / Le Havre) (Rouen - Normandie)",
    cheflieu: "Rouen",
    region: "Normandie",
    deptNum: '76',
    partition1940: 'zone_occupee',
    armisticeName: "Seine-Inférieure (Rouen / Le Havre)",
    repAdminTitle: "Troisième République française — Département de la Seine-Inférieure (Rouen)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Kriegsmarine Le Havre)",
    keys: ["seine_maritime", "seine_inferieure", "rouen", "le_havre", "dieppe"],
    s0_1: "Dipartimento di Seine-Inférieure (Rouen / Le Havre). Arteria marittima e fluviale vitale della Senna: Le Havre è il secondo porto commerciale e passeggeri della Repubblica (terminal dei transatlantici verso New York), mentre Rouen vanta raffinerie petrolifere giganti e cantieri navali; a Dieppe fiorisce la pesca atlantica.",
    s2_4: "Dipartimento di Seine-Inférieure. 1938-1939: espansione dei depositi petroliferi e potenziamento della difesa costiera attorno a Le Havre; la Marine Nationale organizza la sorveglianza delle rotte d'accesso alla Manica.",
    s5: "Dipartimento di Seine-Inférieure. Settembre 1939 - maggio 1940: porta d'ingresso per le forniture di carburante e scorte industriali provenienti dall'impero e dagli Stati Uniti; mobilitazione dei cantieri navali per il naviglio leggero.",
    s6: "Dipartimento di Seine-Inférieure. Giugno 1940: per rallentare l'avanzata delle divisioni corazzate di Rommel verso la Manica, i genieri francesi fanno saltare i ponti sulla Senna e incendiano i depositi petroliferi di Rouen. Le Havre e Dieppe cadono in mano tedesca e il dipartimento è annesso alla Zone occupée sotto la 7ª Armata tedesca.",
    s7: "Dipartimento di Seine-Inférieure. Ottobre 1940: il porto di Le Havre e le coste di Dieppe vengono integrati nei piani della Kriegsmarine per l'invasione della Gran Bretagna; la Luftwaffe insedia basi per caccia a Rouen e nei campi di volo limitrofi.",
    s8: "Dipartimento di Seine-Inférieure. Aprile 1941: sorveglianza costiera ferrea da parte della Wehrmacht contro tentativi di incursione marittima britannica; la popolazione locale affronta il razionamento e nascono i primi gruppi di informatori marittimi per il Secret Intelligence Service.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRD22'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRD22'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRD22'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRD22'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRD22'].s2_4;
      return FRANCE_PROVINCES_META['FRD22'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRD22'].name;
      return FRANCE_PROVINCES_META['FRD22'].armisticeName || FRANCE_PROVINCES_META['FRD22'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRD22'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRD22'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRE11': {
    nuts: 'FRE11',
    name: "Nord (Lille / Dunkerque)",
    modernName: "Nord (59, Lille / Dunkerque / Hauts-de-France)",
    historicalName: "Nord (Lille / Dunkerque - Comando Militare di Bruxelles)",
    cheflieu: "Lille",
    region: "Hauts-de-France (Flandre / Artois)",
    deptNum: '59',
    partition1940: 'belgium_command',
    armisticeName: "Nord (Lille / Dunkerque)",
    repAdminTitle: "Troisième République française — Département du Nord (Lille)",
    armisticeAdminTitle: "Militärverwaltung in Belgien und Nordfrankreich (Alexander von Falkenhausen, Bruxelles)",
    keys: ["nord", "lille", "dunkerque", "douai", "valenciennes"],
    s0_1: "Dipartimento del Nord (Lille / Dunkerque / Douai / Valenciennes). Primo polo industriale e demografico della Francia settentrionale: bacino carbonifero delle Fiandre, colossi tessili a Roubaix-Tourcoing, imponenti fonderie e il grande porto marittimo di Dunkerque. Roccaforte operaia e sindacale di primaria importanza per il governo del Fronte Popolare.",
    s2_4: "Dipartimento del Nord. 1938-1939: costruzione accelerata del prolungamento campale delle difese della Linea Maginot verso la Manica; i minatori e metallurgici lavorano intensamente per garantire il carbone e l'acciaio necessari al riarmo nazionale.",
    s5: "Dipartimento del Nord. Settembre 1939 - maggio 1940: base di schieramento per il Corpo di Spedizione Britannico (BEF) guidato da Lord Gort e per la 1ª Armata francese del generale Blanchard, schierati lungo il confine belga.",
    s6: "Dipartimento del Nord. Maggio-giugno 1940: epicentro della Battaglia di Francia. La disperata resistenza dell'Armata francese nella sacca di Lille (Gen. Molinié) blocca i panzer tedeschi, permettendo la miracolosa Operazione Dynamo a Dunkerque (evacuazione via mare di 338.000 soldati alleati). In seguito all'armistizio, il dipartimento viene escluso dall'amministrazione militare di Parigi e sottoposto alla Militärverwaltung di Bruxelles (Gen. Alexander von Falkenhausen) come 'Zone interdite'.",
    s7: "Dipartimento del Nord (Comando di Bruxelles). Ottobre 1940: territorio blindato, dichiarato zona riservata con severo divieto di rientro per gli sfollati. I pozzi di carbone e le acciaierie vengono sottoposti a ritmi di estrazione forzata sotto la direzione di commissari tedeschi.",
    s8: "Dipartimento del Nord (Comando di Bruxelles). Aprile-maggio 1941: l'esasperazione della popolazione e le condizioni inumane dei minatori portano allo scoppio del glorioso Sciopero dei Minatori del bacino del Nord e Pas-de-Calais: oltre 100.000 lavoratori incrociano le braccia nel primo grande sciopero patriottico di massa dell'Europa occupata, sfidando la brutale repressione tedesca.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRE11'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRE11'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRE11'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRE11'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRE11'].s2_4;
      return FRANCE_PROVINCES_META['FRE11'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRE11'].name;
      return FRANCE_PROVINCES_META['FRE11'].armisticeName || FRANCE_PROVINCES_META['FRE11'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRE11'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRE11'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRE12': {
    nuts: 'FRE12',
    name: "Pas-de-Calais (Arras / Calais)",
    modernName: "Pas-de-Calais (62, Arras / Calais / Hauts-de-France)",
    historicalName: "Pas-de-Calais (Arras / Calais / Boulogne - Comando di Bruxelles)",
    cheflieu: "Arras",
    region: "Hauts-de-France (Flandre / Artois)",
    deptNum: '62',
    partition1940: 'belgium_command',
    armisticeName: "Pas-de-Calais (Arras / Calais)",
    repAdminTitle: "Troisième République française — Département du Pas-de-Calais (Arras)",
    armisticeAdminTitle: "Militärverwaltung in Belgien und Nordfrankreich (Alexander von Falkenhausen, Bruxelles)",
    keys: ["pas_de_calais", "arras", "calais", "boulogne_sur_mer", "lens"],
    s0_1: "Dipartimento del Pas-de-Calais (Arras / Calais / Boulogne-sur-Mer). Costa della Manica e retroterra minerario dell'Artois. I porti di Boulogne e Calais gestiscono il massiccio traffico di traghetti marittimi verso Dover e la Gran Bretagna, mentre il settore orientale condivide il ricco bacino carbonifero di Lens e Béthune.",
    s2_4: "Dipartimento del Pas-de-Calais. 1938-1939: allestimento di postazioni difensive e bunker litoranei; i porti della Manica intensificano i piani di coordinamento marittimo tra la Marine Nationale e la Royal Navy.",
    s5: "Dipartimento del Pas-de-Calais. Settembre 1939 - maggio 1940: punto di sbarco privilegiato per truppe e materiali dell'esercito britannico. Magazzini e scali portuali operano a pieno regime per i rifornimenti alleati.",
    s6: "Dipartimento del Pas-de-Calais. Maggio 1940: teatro del contrattacco corazzato alleato ad Arras (21 maggio) che allarma i vertici della Wehrmacht, seguito dall'assedio casa per casa delle cittadelle di Boulogne e Calais. Dopo l'armistizio, il Pas-de-Calais viene annesso alla giurisdizione del comando tedesco di Bruxelles (Alexander von Falkenhausen).",
    s7: "Dipartimento del Pas-de-Calais (Comando di Bruxelles). Ottobre 1940: le scogliere di Cap Gris-Nez e Cap Blanc-Nez vengono fortificate dall'Organizzazione Todt con gigantesche batterie costiere (Batterie Todt / Grosser Kurfürst) puntate verso le coste inglesi in preparazione dell'Operazione Leone Marino.",
    s8: "Dipartimento del Pas-de-Calais (Comando di Bruxelles). Aprile 1941: i minatori di Lens e Carvin preparano lo sciopero generale clandestino in coordinamento con i colleghi del Nord; i litorali rimangono zona militare chiusa ad accesso vietato per i civili.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRE12'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRE12'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRE12'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRE12'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRE12'].s2_4;
      return FRANCE_PROVINCES_META['FRE12'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRE12'].name;
      return FRANCE_PROVINCES_META['FRE12'].armisticeName || FRANCE_PROVINCES_META['FRE12'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRE12'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRE12'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRE21': {
    nuts: 'FRE21',
    name: "Aisne (Laon)",
    modernName: "Aisne (02, Laon / Hauts-de-France)",
    historicalName: "Aisne (Laon) (Laon - Hauts-de-France (Picardie))",
    cheflieu: "Laon",
    region: "Hauts-de-France (Picardie)",
    deptNum: '02',
    partition1940: 'zone_occupee',
    armisticeName: "Aisne (Laon)",
    repAdminTitle: "Troisième République française — Département de l\\",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)",
    keys: ["aisne", "laon", "saint_quentin", "soissons"],
    s0_1: "Dipartimento di Aisne (Laon). Territorio della regione Hauts-de-France (Picardie) con capoluogo Laon. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Aisne (Laon). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Laon adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Aisne (Laon). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Aisne (Laon). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Aisne (Laon). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Aisne (Laon). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Laon; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRE21'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRE21'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRE21'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRE21'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRE21'].s2_4;
      return FRANCE_PROVINCES_META['FRE21'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRE21'].name;
      return FRANCE_PROVINCES_META['FRE21'].armisticeName || FRANCE_PROVINCES_META['FRE21'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRE21'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRE21'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRE22': {
    nuts: 'FRE22',
    name: "Oise (Beauvais)",
    modernName: "Oise (60, Beauvais / Compiègne / Hauts-de-France)",
    historicalName: "Oise (Beauvais) (Beauvais - Hauts-de-France (Picardie))",
    cheflieu: "Beauvais",
    region: "Hauts-de-France (Picardie)",
    deptNum: '60',
    partition1940: 'zone_occupee',
    armisticeName: "Oise (Beauvais)",
    repAdminTitle: "Troisième République française — Département de l\\",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["oise", "beauvais", "compiegne", "senlis"],
    s0_1: "Dipartimento dell'Oise (Beauvais / Compiègne). Regione storica a nord di Parigi solcata dai fiumi Oise e Aisne, celebre per la cattedrale di Beauvais, il castello imperiale di Compiègne e le foreste monumentali.",
    s2_4: "Dipartimento dell'Oise. 1938-1939: presidio di cavalleria e fanteria a Compiègne e Senlis; la vicinanza alla capitale ne fa un crocevia strategico per le linee di comunicazione verso le Fiandre.",
    s5: "Dipartimento dell'Oise. Settembre 1939 - maggio 1940: quartieri generali di divisione dell'esercito francese; Beauvais subisce drammatici bombardamenti della Luftwaffe nei primi giorni di giugno 1940 che distruggono il centro storico.",
    s6: "Dipartimento dell'Oise. 22 Giugno 1940: nella radura di Rethondes, all'interno della foresta di Compiègne, sullo stesso vagone ferroviario del 1918 fatto riposizionare appositamente da Adolf Hitler, viene firmato lo storico e tragico Armistizio franco-tedesco. Il dipartimento entra nella Zone occupée sotto controllo tedesco.",
    s7: "Dipartimento dell'Oise. Ottobre 1940: il vagone dell'armistizio di Compiègne viene trasferito come trofeo di guerra a Berlino per ordine di Hitler; la foresta e le caserme di Compiègne sono trasformate in centri logistici della Wehrmacht.",
    s8: "Dipartimento dell'Oise. Aprile 1941: a Compiègne le autorità d'occupazione aprono il campo di Royallieu (Frontstalag 122), destinato a diventare uno dei principali campi di internamento e transito per prigionieri politici, resistenti ed ebrei diretti verso i lager del Reich.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRE22'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRE22'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRE22'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRE22'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRE22'].s2_4;
      return FRANCE_PROVINCES_META['FRE22'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRE22'].name;
      return FRANCE_PROVINCES_META['FRE22'].armisticeName || FRANCE_PROVINCES_META['FRE22'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRE22'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRE22'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRE23': {
    nuts: 'FRE23',
    name: "Somme (Amiens)",
    modernName: "Somme (80, Amiens / Hauts-de-France)",
    historicalName: "Somme (Amiens) (Amiens - Hauts-de-France (Picardie))",
    cheflieu: "Amiens",
    region: "Hauts-de-France (Picardie)",
    deptNum: '80',
    partition1940: 'zone_occupee',
    armisticeName: "Somme (Amiens)",
    repAdminTitle: "Troisième République française — Département de la Somme (Amiens)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)",
    keys: ["somme", "amiens", "abbeville"],
    s0_1: "Dipartimento di Somme (Amiens). Territorio della regione Hauts-de-France (Picardie) con capoluogo Amiens. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Somme (Amiens). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Amiens adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Somme (Amiens). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Somme (Amiens). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Somme (Amiens). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Somme (Amiens). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Amiens; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRE23'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRE23'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRE23'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRE23'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRE23'].s2_4;
      return FRANCE_PROVINCES_META['FRE23'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRE23'].name;
      return FRANCE_PROVINCES_META['FRE23'].armisticeName || FRANCE_PROVINCES_META['FRE23'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRE23'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRE23'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRF11': {
    nuts: 'FRF11',
    name: "Bas-Rhin (Strasbourg)",
    modernName: "Bas-Rhin (67, Strasbourg / Alsace / Grand Est)",
    historicalName: "Bas-Rhin (Strasbourg - Linea Maginot & CdZ Unterelsass)",
    cheflieu: "Strasbourg",
    region: "Alsace / Grand Est",
    deptNum: '67',
    partition1940: 'alsace_moselle',
    armisticeName: "Bas-Rhin (Straßburg)",
    repAdminTitle: "Troisième République française — Département du Bas-Rhin (Strasbourg)",
    armisticeAdminTitle: "CdZ-Gebiet Elsass — Gau Baden-Elsass (Gauleiter Robert Wagner)",
    keys: ["bas_rhin", "strasbourg", "haguenau", "saverne"],
    s0_1: "Dipartimento del Bas-Rhin (Strasburgo). Cuore dell'Alsazia settentrionale lungo la riva sinistra del Reno. Baluardo difensivo della Repubblica imperniato sui formidabili forti corazzati della Linea Maginot (Settore Fortificato di Haguenau e Vosgi, forte di Schoenenbourg e fortezza di Hochwald). A Strasburgo fiorisce l'università e una ricca tradizione culturale bilingue.",
    s2_4: "Dipartimento del Bas-Rhin. 1938 - inizio 1939: di fronte alla rimilitarizzazione della riva destra del Reno e alla costruzione del Westwall tedesco, il Bas-Rhin vive in stato di allerta permanente; gli equipaggi delle casematte della Maginot presidiano i cannoni sotto le cupole corazzate a scomparsa.",
    s5: "Dipartimento del Bas-Rhin. Settembre 1939: all'atto della dichiarazione di guerra, il governo francese attua il piano d'evacuazione totale della zona di frontiera; oltre 120.000 abitanti di Strasburgo e dell'Alsazia vengono evacuati via ferrovia in Dordogna (con la prefettura trasferita a Périgueux) e nel sud-ovest. Strasburgo diviene una città fantasma presidiata dai soli militari.",
    s6: "Dipartimento del Bas-Rhin. Giugno 1940: i forti della Linea Maginot (Schoenenbourg) resistono eroicamente a migliaia di colpi d'artiglieria pesante tedesca, arrendendosi solo su ordine formale del governo francese dopo l'armistizio del 22 giugno 1940. L'Alsazia viene distaccata dalla sovranità francese e annessa de facto al Terzo Reich come CdZ Unterelsass, incorporata nel Gau Baden-Elsass sotto il fanatico Gauleiter Robert Wagner.",
    s7: "Dipartimento del Bas-Rhin (CdZ Unterelsass). Ottobre 1940: brutale processo di germanizzazione forzata (Entwelschung). Divieto assoluto della lingua francese, imposizione dell'uso del tedesco, germanizzazione di cognomi e toponimi (Strasbourg -> Strassburg). Il Gauleiter Wagner fa abbattere il monumento al generale Kléber e ordina l'espulsione forzata di oltre 40.000 alsaziani francofoni ed ebrei verso la zona libera.",
    s8: "Dipartimento del Bas-Rhin (CdZ Unterelsass). Aprile 1941: l'amministrazione nazista introduce le leggi del Reich, la Gioventù Hitleriana e il Reichsarbeitsdienst (servizio di lavoro obbligatorio per i giovani alsaziani). Entra in funzione il vicino campo di concentramento di Natzweiler-Struthof, unico lager nazista impiantato su suolo metropolitano francese.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRF11'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRF11'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRF11'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRF11'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRF11'].s2_4;
      return FRANCE_PROVINCES_META['FRF11'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF11'].name;
      return FRANCE_PROVINCES_META['FRF11'].armisticeName || FRANCE_PROVINCES_META['FRF11'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF11'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRF11'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRF12': {
    nuts: 'FRF12',
    name: "Haut-Rhin (Colmar / Mulhouse)",
    modernName: "Haut-Rhin (68, Colmar / Mulhouse / Alsace / Grand Est)",
    historicalName: "Haut-Rhin (Colmar / Mulhouse - CdZ Oberelsass)",
    cheflieu: "Colmar",
    region: "Alsace / Grand Est",
    deptNum: '68',
    partition1940: 'alsace_moselle',
    armisticeName: "Haut-Rhin (Kolmar / Mülhausen)",
    repAdminTitle: "Troisième République française — Département du Haut-Rhin (Colmar)",
    armisticeAdminTitle: "CdZ-Gebiet Elsass — Gau Baden-Elsass (Gauleiter Robert Wagner)",
    keys: ["haut_rhin", "colmar", "mulhouse", "altkirch"],
    s0_1: "Dipartimento dell'Haut-Rhin (Colmar / Mulhouse). Alsazia meridionale, celebre per il polo industriale tessile e chimico di Mulhouse e il bacino minerario delle potasse d'Alsazia. Lungo la pianura renana e le alture dei Vosgi sorgono le opere fortificate della Linea Maginot a sbarramento del confine tedesco.",
    s2_4: "Dipartimento dell'Haut-Rhin. 1938-1939: mobilitazione dei reggimenti di fanteria di fortezza a Colmar e Altkirch; gli impianti chimici e le miniere di potassio lavorano a pieno regime per fornire fertilizzanti e composti strategici all'industria nazionale.",
    s5: "Dipartimento dell'Haut-Rhin. Settembre 1939 - maggio 1940: evacuazione forzata di decine di migliaia di residenti di Colmar e Mulhouse verso i dipartimenti del Gers e del Lot-et-Garonne. L'Armée de Terre pattuglia il Reno durante la 'Drôle de guerre'.",
    s6: "Dipartimento dell'Haut-Rhin. Giugno 1940: le truppe tedesche forzano il Reno a Neuf-Brisach e occupano Mulhouse e Colmar. Dopo l'armistizio, il dipartimento viene annesso de facto al Reich (CdZ Oberelsass) all'interno del Gau Baden-Elsass del Gauleiter Robert Wagner.",
    s7: "Dipartimento dell'Haut-Rhin (CdZ Oberelsass). Ottobre 1940: applicazione spietata dei decreti di nazificazione; chiusura delle scuole cattoliche e delle associazioni alsaziane, introduzione della valuta tedesca (Reichsmark) e persecuzione degli oppositori politici rinchiusi nel campo di Schirmeck.",
    s8: "Dipartimento dell'Haut-Rhin (CdZ Oberelsass). Aprile 1941: imposizione della leva lavorativa nel RAD; i giovani alsaziani renitenti tentano la fuga clandestina attraverso la frontiera montuosa svizzera, mentre la popolazione sviluppa forme silenziose ma tenaci di lealismo filofrancese.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRF12'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRF12'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRF12'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRF12'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRF12'].s2_4;
      return FRANCE_PROVINCES_META['FRF12'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF12'].name;
      return FRANCE_PROVINCES_META['FRF12'].armisticeName || FRANCE_PROVINCES_META['FRF12'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF12'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRF12'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRF21': {
    nuts: 'FRF21',
    name: "Ardennes (Mézières / Charleville)",
    modernName: "Ardennes (08, Charleville-Mézières / Sedan / Grand Est)",
    historicalName: "Ardennes (Mézières / Charleville) (Mézières - Grand Est (Champagne-Ardenne))",
    cheflieu: "Mézières",
    region: "Grand Est (Champagne-Ardenne)",
    deptNum: '08',
    partition1940: 'zone_occupee',
    armisticeName: "Ardennes (Mézières / Charleville)",
    repAdminTitle: "Troisième République française — Département des Ardennes (Mézières)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)",
    keys: ["ardennes", "mezieres", "charleville", "sedan"],
    s0_1: "Dipartimento di Ardennes (Mézières / Charleville). Territorio della regione Grand Est (Champagne-Ardenne) con capoluogo Mézières. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Ardennes (Mézières / Charleville). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Mézières adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Ardennes (Mézières / Charleville). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Ardennes (Mézières / Charleville). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Ardennes (Mézières / Charleville). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Ardennes (Mézières / Charleville). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Mézières; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRF21'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRF21'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRF21'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRF21'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRF21'].s2_4;
      return FRANCE_PROVINCES_META['FRF21'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF21'].name;
      return FRANCE_PROVINCES_META['FRF21'].armisticeName || FRANCE_PROVINCES_META['FRF21'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF21'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRF21'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRF22': {
    nuts: 'FRF22',
    name: "Aube (Troyes)",
    modernName: "Aube (10, Troyes / Grand Est)",
    historicalName: "Aube (Troyes) (Troyes - Grand Est (Champagne-Ardenne))",
    cheflieu: "Troyes",
    region: "Grand Est (Champagne-Ardenne)",
    deptNum: '10',
    partition1940: 'zone_occupee',
    armisticeName: "Aube (Troyes)",
    repAdminTitle: "Troisième République française — Département de l\\",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["aube", "troyes"],
    s0_1: "Dipartimento di Aube (Troyes). Territorio della regione Grand Est (Champagne-Ardenne) con capoluogo Troyes. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Aube (Troyes). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Troyes adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Aube (Troyes). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Aube (Troyes). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Aube (Troyes). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Aube (Troyes). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Troyes; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRF22'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRF22'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRF22'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRF22'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRF22'].s2_4;
      return FRANCE_PROVINCES_META['FRF22'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF22'].name;
      return FRANCE_PROVINCES_META['FRF22'].armisticeName || FRANCE_PROVINCES_META['FRF22'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF22'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRF22'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRF23': {
    nuts: 'FRF23',
    name: "Marne (Châlons-sur-Marne / Reims)",
    modernName: "Marne (51, Châlons-en-Champagne / Reims / Grand Est)",
    historicalName: "Marne (Châlons-sur-Marne / Reims) (Châlons-sur-Marne - Grand Est (Champagne-Ardenne))",
    cheflieu: "Châlons-sur-Marne",
    region: "Grand Est (Champagne-Ardenne)",
    deptNum: '51',
    partition1940: 'zone_occupee',
    armisticeName: "Marne (Châlons-sur-Marne / Reims)",
    repAdminTitle: "Troisième République française — Département de la Marne (Châlons-sur-Marne)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["marne", "chalons_sur_marne", "chalons_en_champagne", "reims", "epernay"],
    s0_1: "Dipartimento di Marne (Châlons-sur-Marne / Reims). Territorio della regione Grand Est (Champagne-Ardenne) con capoluogo Châlons-sur-Marne. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Marne (Châlons-sur-Marne / Reims). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Châlons-sur-Marne adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Marne (Châlons-sur-Marne / Reims). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Marne (Châlons-sur-Marne / Reims). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Marne (Châlons-sur-Marne / Reims). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Marne (Châlons-sur-Marne / Reims). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Châlons-sur-Marne; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRF23'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRF23'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRF23'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRF23'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRF23'].s2_4;
      return FRANCE_PROVINCES_META['FRF23'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF23'].name;
      return FRANCE_PROVINCES_META['FRF23'].armisticeName || FRANCE_PROVINCES_META['FRF23'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF23'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRF23'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRF24': {
    nuts: 'FRF24',
    name: "Haute-Marne (Chaumont)",
    modernName: "Haute-Marne (52, Chaumont / Grand Est)",
    historicalName: "Haute-Marne (Chaumont) (Chaumont - Grand Est (Champagne-Ardenne))",
    cheflieu: "Chaumont",
    region: "Grand Est (Champagne-Ardenne)",
    deptNum: '52',
    partition1940: 'zone_occupee',
    armisticeName: "Haute-Marne (Chaumont)",
    repAdminTitle: "Troisième République française — Département de la Haute-Marne (Chaumont)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)",
    keys: ["haute_marne", "chaumont", "saint_dizier", "langres"],
    s0_1: "Dipartimento di Haute-Marne (Chaumont). Territorio della regione Grand Est (Champagne-Ardenne) con capoluogo Chaumont. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Haute-Marne (Chaumont). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Chaumont adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Haute-Marne (Chaumont). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Haute-Marne (Chaumont). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Haute-Marne (Chaumont). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Haute-Marne (Chaumont). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Chaumont; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRF24'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRF24'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRF24'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRF24'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRF24'].s2_4;
      return FRANCE_PROVINCES_META['FRF24'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF24'].name;
      return FRANCE_PROVINCES_META['FRF24'].armisticeName || FRANCE_PROVINCES_META['FRF24'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF24'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRF24'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRF31': {
    nuts: 'FRF31',
    name: "Meurthe-et-Moselle (Nancy)",
    modernName: "Meurthe-et-Moselle (54, Nancy / Lorraine / Grand Est)",
    historicalName: "Meurthe-et-Moselle (Nancy) (Nancy - Grand Est (Lorraine))",
    cheflieu: "Nancy",
    region: "Grand Est (Lorraine)",
    deptNum: '54',
    partition1940: 'zone_occupee',
    armisticeName: "Meurthe-et-Moselle (Nancy)",
    repAdminTitle: "Troisième République française — Département de Meurthe-et-Moselle (Nancy)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)",
    keys: ["meurthe_et_moselle", "nancy", "toul", "luneville", "briey"],
    s0_1: "Dipartimento di Meurthe-et-Moselle (Nancy). Territorio della regione Grand Est (Lorraine) con capoluogo Nancy. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Meurthe-et-Moselle (Nancy). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Nancy adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Meurthe-et-Moselle (Nancy). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Meurthe-et-Moselle (Nancy). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Meurthe-et-Moselle (Nancy). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Meurthe-et-Moselle (Nancy). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Nancy; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRF31'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRF31'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRF31'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRF31'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRF31'].s2_4;
      return FRANCE_PROVINCES_META['FRF31'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF31'].name;
      return FRANCE_PROVINCES_META['FRF31'].armisticeName || FRANCE_PROVINCES_META['FRF31'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF31'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRF31'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRF32': {
    nuts: 'FRF32',
    name: "Meuse (Bar-le-Duc / Verdun)",
    modernName: "Meuse (55, Bar-le-Duc / Verdun / Lorraine / Grand Est)",
    historicalName: "Meuse (Bar-le-Duc / Verdun) (Bar-le-Duc - Grand Est (Lorraine))",
    cheflieu: "Bar-le-Duc",
    region: "Grand Est (Lorraine)",
    deptNum: '55',
    partition1940: 'zone_occupee',
    armisticeName: "Meuse (Bar-le-Duc / Verdun)",
    repAdminTitle: "Troisième République française — Département de la Meuse (Bar-le-Duc)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)",
    keys: ["meuse", "bar_le_duc", "verdun"],
    s0_1: "Dipartimento di Meuse (Bar-le-Duc / Verdun). Territorio della regione Grand Est (Lorraine) con capoluogo Bar-le-Duc. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Meuse (Bar-le-Duc / Verdun). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Bar-le-Duc adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Meuse (Bar-le-Duc / Verdun). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Meuse (Bar-le-Duc / Verdun). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Meuse (Bar-le-Duc / Verdun). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Meuse (Bar-le-Duc / Verdun). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Bar-le-Duc; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRF32'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRF32'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRF32'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRF32'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRF32'].s2_4;
      return FRANCE_PROVINCES_META['FRF32'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF32'].name;
      return FRANCE_PROVINCES_META['FRF32'].armisticeName || FRANCE_PROVINCES_META['FRF32'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF32'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRF32'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRF33': {
    nuts: 'FRF33',
    name: "Moselle (Metz)",
    modernName: "Moselle (57, Metz / Lorraine / Grand Est)",
    historicalName: "Moselle (Metz / Thionville - Hackenberg & CdZ Lothringen)",
    cheflieu: "Metz",
    region: "Grand Est (Lorraine)",
    deptNum: '57',
    partition1940: 'alsace_moselle',
    armisticeName: "Moselle (Metz)",
    repAdminTitle: "Troisième République française — Département de la Moselle (Metz)",
    armisticeAdminTitle: "CdZ-Gebiet Lothringen — Gau Westmark (Gauleiter Josef Bürckel)",
    keys: ["moselle", "metz", "thionville", "sarreguemines"],
    s0_1: "Dipartimento della Moselle (Metz / Thionville). Cuore siderurgico e metallurgico della Lorena, ricco di giacimenti di minerale di ferro (la minette lorenese) e imponenti altiforni a Hayange e Thionville. Settore tra i più pesantemente corazzati della Linea Maginot con le fortezze sotterranee di Hackenberg e Simserhof.",
    s2_4: "Dipartimento della Moselle. 1938 - inizio 1939: produzione continua di acciai speciali corazzati a Thionville. Le guarnigioni di Metz e delle opere maginotiane svolgono continue esercitazioni di fuoco sotto la direzione dello Stato Maggiore di settore.",
    s5: "Dipartimento della Moselle. Settembre 1939: oltre 300.000 lorenesi della zona di frontiera vengono evacuati verso la Charente, la Charente-Inférieure e la Vienne. Breve avanzata dell'esercito francese nella Saar antistante, subito revocata per attestarsi dietro le casematte della Maginot.",
    s6: "Dipartimento della Moselle. Giugno 1940: il potente forte di Hackenberg neutralizza ogni assalto tedesco infliggendo pesanti perdite al nemico, arrendendosi solo il 30 giugno su ingiunzione dei comandi francesi. La Mosella viene distaccata dalla Francia e annessa de facto al Terzo Reich come CdZ Lothringen, unita al Gau Westmark del Gauleiter Josef Bürckel.",
    s7: "Dipartimento della Moselle (CdZ Lothringen). Ottobre 1940: politica di annessione radicale da parte del Gauleiter Bürckel. Il 22 ottobre 1940 viene inaugurata la massiccia operazione di espulsione: oltre 60.000 lorenesi francofoni, patrioti ed ebrei vengono caricati su treni merci ed espulsi senza beni verso la zona libera.",
    s8: "Dipartimento della Moselle (CdZ Lothringen). Aprile 1941: Metz viene proclamata città puramente germanica; le acciaierie e le miniere lorenesi sono confiscate da colossi industriali tedeschi (Reichswerke Hermann Göring e Krupp) per alimentare lo sforzo bellico dell'Asse.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRF33'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRF33'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRF33'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRF33'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRF33'].s2_4;
      return FRANCE_PROVINCES_META['FRF33'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF33'].name;
      return FRANCE_PROVINCES_META['FRF33'].armisticeName || FRANCE_PROVINCES_META['FRF33'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF33'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRF33'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRF34': {
    nuts: 'FRF34',
    name: "Vosges (Épinal)",
    modernName: "Vosges (88, Épinal / Grand Est)",
    historicalName: "Vosges (Épinal) (Épinal - Grand Est (Lorraine))",
    cheflieu: "Épinal",
    region: "Grand Est (Lorraine)",
    deptNum: '88',
    partition1940: 'zone_occupee',
    armisticeName: "Vosges (Épinal)",
    repAdminTitle: "Troisième République française — Département des Vosges (Épinal)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Zone réservée)",
    keys: ["vosges", "epinal", "saint_die"],
    s0_1: "Dipartimento di Vosges (Épinal). Territorio della regione Grand Est (Lorraine) con capoluogo Épinal. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Vosges (Épinal). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Épinal adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Vosges (Épinal). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Vosges (Épinal). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Vosges (Épinal). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Vosges (Épinal). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Épinal; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRF34'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRF34'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRF34'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRF34'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRF34'].s2_4;
      return FRANCE_PROVINCES_META['FRF34'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF34'].name;
      return FRANCE_PROVINCES_META['FRF34'].armisticeName || FRANCE_PROVINCES_META['FRF34'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRF34'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRF34'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRG01': {
    nuts: 'FRG01',
    name: "Loire-Inférieure (Nantes)",
    modernName: "Loire-Atlantique (44, Nantes / Saint-Nazaire / Pays de la Loire)",
    historicalName: "Loire-Inférieure (Nantes / Saint-Nazaire - Cantieri de l'Atlantique)",
    cheflieu: "Nantes",
    region: "Pays de la Loire",
    deptNum: '44',
    partition1940: 'zone_occupee',
    armisticeName: "Loire-Inférieure (Nantes)",
    repAdminTitle: "Troisième République française — Département de la Loire-Inférieure (Nantes)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Kriegsmarine Saint-Nazaire)",
    keys: ["loire_atlantique", "loire_inferieure", "nantes", "saint_nazaire"],
    s0_1: "Dipartimento di Loire-Inférieure (Nantes / Saint-Nazaire). Grande polo cantieristico e marittimo alla foce della Loira: Saint-Nazaire ospita i Chantiers de l'Atlantique (tra i maggiori al mondo, dove è stato varato il transatlantico Normandie), mentre Nantes è un fiorente centro industriale, agroalimentare e portuale.",
    s2_4: "Dipartimento di Loire-Inférieure. 1938-1939: i cantieri di Saint-Nazaire lavorano febbrilmente all'allestimento della corazzata gigante Jean Bart e della portaerei Joffre; la fonderia d'Indret a Nantes fabbrica caldaie e turbine per la marina da guerra.",
    s5: "Dipartimento di Loire-Inférieure. Settembre 1939 - maggio 1940: Saint-Nazaire è la principale base logistica e di sbarco per il Corpo di Spedizione Britannico e i rifornimenti alleati.",
    s6: "Dipartimento di Loire-Inférieure. 17-19 Giugno 1940: tragica evacuazione alleata al largo di Saint-Nazaire col siluramento del transatlantico Lancastria; il 19 giugno la corazzata Jean Bart, completata solo al 75%, riesce a salpare miracolosamente dal bacino di carenaggio sotto le bombe tedesche riparando a Casablanca. In seguito all'armistizio, il dipartimento è inserito nella Zone occupée.",
    s7: "Dipartimento di Loire-Inférieure. Ottobre 1940: la Kriegsmarine avvia la costruzione dell'enorme bunker per U-Boot a Saint-Nazaire (bacino Louis Joubert / Normannendock); Nantes e la foce della Loira vengono presidiate dalla 7ª Armata tedesca.",
    s8: "Dipartimento di Loire-Inférieure. Aprile 1941: il porto di Saint-Nazaire diviene la base operativa della 6ª e della 7ª U-Flottille tedesca; a Nantes gli operai dei cantieri navali formano i primi gruppi clandestini di resistenza sabotando i componenti meccanici destinati ai sottomarini germanici.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRG01'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRG01'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRG01'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRG01'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRG01'].s2_4;
      return FRANCE_PROVINCES_META['FRG01'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRG01'].name;
      return FRANCE_PROVINCES_META['FRG01'].armisticeName || FRANCE_PROVINCES_META['FRG01'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRG01'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRG01'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRG02': {
    nuts: 'FRG02',
    name: "Maine-et-Loire (Angers)",
    modernName: "Maine-et-Loire (49, Angers / Pays de la Loire)",
    historicalName: "Maine-et-Loire (Angers) (Angers - Pays de la Loire)",
    cheflieu: "Angers",
    region: "Pays de la Loire",
    deptNum: '49',
    partition1940: 'zone_occupee',
    armisticeName: "Maine-et-Loire (Angers)",
    repAdminTitle: "Troisième République française — Département de Maine-et-Loire (Angers)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["maine_et_loire", "angers", "cholet", "saumur"],
    s0_1: "Dipartimento di Maine-et-Loire (Angers / Saumur). Valle della Loira celebre per i vigneti d'Angiò, l'agricoltura specializzata e la storica Scuola Nazionale di Cavalleria di Saumur (Cadres Noirs), eccellenza militare dell'esercito francese.",
    s2_4: "Dipartimento di Maine-et-Loire. 1938-1939: la Scuola di Cavalleria di Saumur converte parte dell'addestramento verso le unità di cavalleria meccanizzata e autoblindo leggere; Angers potenzia la difesa passiva.",
    s5: "Dipartimento di Maine-et-Loire. Novembre 1939 - giugno 1940: Angers diviene la capitale temporanea del Governo Polacco in Esilio guidato dal presidente Władysław Raczkiewicz e dal generale Władysław Sikorski, che vi ricostituiscono l'esercito polacco su suolo alleato.",
    s6: "Dipartimento di Maine-et-Loire. 18-20 Giugno 1940: eroica battaglia di Saumur. 800 allievi ufficiali della Scuola di Cavalleria (i 'Cadetti di Saumur') guidati dal colonnello Michon bloccano per tre giorni un'intera divisione tedesca lungo 40 km di ponti sulla Loira, scrivendo una delle pagine più gloriose della resistenza militare francese. Dopo l'armistizio, entra nella Zone occupée.",
    s7: "Dipartimento di Maine-et-Loire. Ottobre 1940: Angers ospita la sede della Feldkommandantur regionale tedesca; la Loira è sottoposta a stretto pattugliamento.",
    s8: "Dipartimento di Maine-et-Loire. Aprile 1941: dure requisizioni di vino e grano da parte delle truppe occupanti; a Saumur e Angers i primi reduci creano reti di evasione per prigionieri fuggiaschi.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRG02'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRG02'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRG02'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRG02'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRG02'].s2_4;
      return FRANCE_PROVINCES_META['FRG02'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRG02'].name;
      return FRANCE_PROVINCES_META['FRG02'].armisticeName || FRANCE_PROVINCES_META['FRG02'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRG02'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRG02'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRG03': {
    nuts: 'FRG03',
    name: "Mayenne (Laval)",
    modernName: "Mayenne (53, Laval / Pays de la Loire)",
    historicalName: "Mayenne (Laval) (Laval - Pays de la Loire)",
    cheflieu: "Laval",
    region: "Pays de la Loire",
    deptNum: '53',
    partition1940: 'zone_occupee',
    armisticeName: "Mayenne (Laval)",
    repAdminTitle: "Troisième République française — Département de la Mayenne (Laval)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["mayenne", "laval"],
    s0_1: "Dipartimento di Mayenne (Laval). Territorio della regione Pays de la Loire con capoluogo Laval. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Mayenne (Laval). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Laval adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Mayenne (Laval). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Mayenne (Laval). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Mayenne (Laval). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Mayenne (Laval). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Laval; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRG03'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRG03'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRG03'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRG03'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRG03'].s2_4;
      return FRANCE_PROVINCES_META['FRG03'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRG03'].name;
      return FRANCE_PROVINCES_META['FRG03'].armisticeName || FRANCE_PROVINCES_META['FRG03'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRG03'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRG03'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRG04': {
    nuts: 'FRG04',
    name: "Sarthe (Le Mans)",
    modernName: "Sarthe (72, Le Mans / Pays de la Loire)",
    historicalName: "Sarthe (Le Mans) (Le Mans - Pays de la Loire)",
    cheflieu: "Le Mans",
    region: "Pays de la Loire",
    deptNum: '72',
    partition1940: 'zone_occupee',
    armisticeName: "Sarthe (Le Mans)",
    repAdminTitle: "Troisième République française — Département de la Sarthe (Le Mans)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["sarthe", "le_mans", "la_fleche"],
    s0_1: "Dipartimento di Sarthe (Le Mans). Territorio della regione Pays de la Loire con capoluogo Le Mans. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Sarthe (Le Mans). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Le Mans adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Sarthe (Le Mans). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Sarthe (Le Mans). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Sarthe (Le Mans). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Sarthe (Le Mans). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Le Mans; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRG04'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRG04'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRG04'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRG04'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRG04'].s2_4;
      return FRANCE_PROVINCES_META['FRG04'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRG04'].name;
      return FRANCE_PROVINCES_META['FRG04'].armisticeName || FRANCE_PROVINCES_META['FRG04'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRG04'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRG04'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRG05': {
    nuts: 'FRG05',
    name: "Vendée (La Roche-sur-Yon)",
    modernName: "Vendée (85, La Roche-sur-Yon / Pays de la Loire)",
    historicalName: "Vendée (La Roche-sur-Yon) (La Roche-sur-Yon - Pays de la Loire)",
    cheflieu: "La Roche-sur-Yon",
    region: "Pays de la Loire",
    deptNum: '85',
    partition1940: 'zone_occupee',
    armisticeName: "Vendée (La Roche-sur-Yon)",
    repAdminTitle: "Troisième République française — Département de la Vendée (La Roche-sur-Yon)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["vendee", "la_roche_sur_yon", "les_sables_d_olonne"],
    s0_1: "Dipartimento di Vendée (La Roche-sur-Yon). Territorio della regione Pays de la Loire con capoluogo La Roche-sur-Yon. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Vendée (La Roche-sur-Yon). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di La Roche-sur-Yon adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Vendée (La Roche-sur-Yon). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Vendée (La Roche-sur-Yon). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Vendée (La Roche-sur-Yon). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Vendée (La Roche-sur-Yon). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a La Roche-sur-Yon; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRG05'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRG05'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRG05'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRG05'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRG05'].s2_4;
      return FRANCE_PROVINCES_META['FRG05'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRG05'].name;
      return FRANCE_PROVINCES_META['FRG05'].armisticeName || FRANCE_PROVINCES_META['FRG05'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRG05'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRG05'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRH01': {
    nuts: 'FRH01',
    name: "Côtes-du-Nord (Saint-Brieuc)",
    modernName: "Côtes-d'Armor (22, Saint-Brieuc / Bretagne)",
    historicalName: "Côtes-du-Nord (Saint-Brieuc) (Saint-Brieuc - Bretagne)",
    cheflieu: "Saint-Brieuc",
    region: "Bretagne",
    deptNum: '22',
    partition1940: 'zone_occupee',
    armisticeName: "Côtes-du-Nord (Saint-Brieuc)",
    repAdminTitle: "Troisième République française — Département des Côtes-du-Nord (Saint-Brieuc)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["cotes_d_armor", "cotes_darmor", "cotes_du_nord", "saint_brieuc", "dinan", "lannion"],
    s0_1: "Dipartimento di Côtes-du-Nord (Saint-Brieuc). Territorio della regione Bretagne con capoluogo Saint-Brieuc. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Côtes-du-Nord (Saint-Brieuc). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Saint-Brieuc adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Côtes-du-Nord (Saint-Brieuc). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Côtes-du-Nord (Saint-Brieuc). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Côtes-du-Nord (Saint-Brieuc). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Côtes-du-Nord (Saint-Brieuc). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Saint-Brieuc; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRH01'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRH01'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRH01'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRH01'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRH01'].s2_4;
      return FRANCE_PROVINCES_META['FRH01'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRH01'].name;
      return FRANCE_PROVINCES_META['FRH01'].armisticeName || FRANCE_PROVINCES_META['FRH01'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRH01'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRH01'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRH02': {
    nuts: 'FRH02',
    name: "Finistère (Brest / Quimper)",
    modernName: "Finistère (29, Brest / Quimper / Bretagne)",
    historicalName: "Finistère (Brest - Base Navale e Sommergibili)",
    cheflieu: "Quimper",
    region: "Bretagne",
    deptNum: '29',
    partition1940: 'zone_occupee',
    armisticeName: "Finistère (Brest / Quimper)",
    repAdminTitle: "Troisième République française — Département du Finistère (Brest)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Kriegsmarine Brest)",
    keys: ["finistere", "quimper", "brest", "morlaix"],
    s0_1: "Dipartimento del Finistère (Brest / Quimper). Punta estrema della penisola bretone. Brest è la principale base navale atlantica della Marine Nationale, dotata di immensi bacini di carenaggio, arsenali militari e scuole per equipaggi navali; Concarneau e Douarnenez sono capitali della pesca atlantica.",
    s2_4: "Dipartimento del Finistère. 1938-1939: la base navale di Brest accelera i lavori di allestimento per la nuova corazzata Richelieu; le squadre d'altura francesi compiono continue missioni di pattugliamento nell'Atlantico settentrionale.",
    s5: "Dipartimento del Finistère. Settembre 1939 - maggio 1940: base di partenza per le formazioni navali francesi e britanniche impegnate nella caccia ai corsari tedeschi e nella campagna di Norvegia.",
    s6: "Dipartimento del Finistère. 18-19 Giugno 1940: mentre i panzer tedeschi raggiungono la costa, la corazzata Richelieu (ancora incompleta) salpa in extremis sotto il comando del capitano Marzin fuggendo verso Dakar; contemporaneamente, tutti gli uomini abili dell'Île de Sein prendono il mare sui loro pescherecci per raggiungere De Gaulle in Inghilterra. Brest viene occupata dalla Kriegsmarine.",
    s7: "Dipartimento del Finistère. Ottobre 1940: Brest viene prescelta dal grandammiraglio Raeder come base atlantica principale per la 1ª e la 9ª U-Flottille di sottomarini tedeschi; l'Organizzazione Todt avvia i cantieri per colossali bunker corazzati (U-Boot Bunkers) capaci di resistere a qualsiasi bomba aerea.",
    s8: "Dipartimento del Finistère. Aprile 1941: gli incrociatori da battaglia tedeschi Scharnhorst e Gneisenau riparano a Brest dopo la riuscita Operazione Berlin nell'Atlantico; il porto subisce continui e devastanti raid della Royal Air Force per neutralizzare le navi da guerra tedesche.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRH02'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRH02'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRH02'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRH02'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRH02'].s2_4;
      return FRANCE_PROVINCES_META['FRH02'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRH02'].name;
      return FRANCE_PROVINCES_META['FRH02'].armisticeName || FRANCE_PROVINCES_META['FRH02'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRH02'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRH02'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRH03': {
    nuts: 'FRH03',
    name: "Ille-et-Vilaine (Rennes)",
    modernName: "Ille-et-Vilaine (35, Rennes / Bretagne)",
    historicalName: "Ille-et-Vilaine (Rennes) (Rennes - Bretagne)",
    cheflieu: "Rennes",
    region: "Bretagne",
    deptNum: '35',
    partition1940: 'zone_occupee',
    armisticeName: "Ille-et-Vilaine (Rennes)",
    repAdminTitle: "Troisième République française — Département d\\",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["ille_et_vilaine", "rennes", "saint_malo", "fougeres"],
    s0_1: "Dipartimento di Ille-et-Vilaine (Rennes). Territorio della regione Bretagne con capoluogo Rennes. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Ille-et-Vilaine (Rennes). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Rennes adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Ille-et-Vilaine (Rennes). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Ille-et-Vilaine (Rennes). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Ille-et-Vilaine (Rennes). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Ille-et-Vilaine (Rennes). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Rennes; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRH03'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRH03'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRH03'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRH03'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRH03'].s2_4;
      return FRANCE_PROVINCES_META['FRH03'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRH03'].name;
      return FRANCE_PROVINCES_META['FRH03'].armisticeName || FRANCE_PROVINCES_META['FRH03'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRH03'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRH03'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRH04': {
    nuts: 'FRH04',
    name: "Morbihan (Vannes / Lorient)",
    modernName: "Morbihan (56, Vannes / Lorient / Bretagne)",
    historicalName: "Morbihan (Vannes / Lorient - Base Sottomarina di Keroman)",
    cheflieu: "Vannes",
    region: "Bretagne",
    deptNum: '56',
    partition1940: 'zone_occupee',
    armisticeName: "Morbihan (Vannes / Lorient)",
    repAdminTitle: "Troisième République française — Département du Morbihan (Vannes)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Kriegsmarine Lorient)",
    keys: ["morbihan", "vannes", "lorient"],
    s0_1: "Dipartimento del Morbihan (Vannes / Lorient). Bretagna meridionale affacciata sull'oceano: Lorient è una storica piazzaforte marittima della Compagnia delle Indie e sede dell'Arsenale navale militare, mentre Vannes ne custodisce la prefettura e il patrimonio storico.",
    s2_4: "Dipartimento del Morbihan. 1938-1939: l'arsenale di Lorient è impegnato nella costruzione di cacciatorpediniere e sommergibili per la flotta francese; la rada di Port-Louis viene dotata di reti parasiluri.",
    s5: "Dipartimento del Morbihan. Settembre 1939 - maggio 1940: intensa attività dell'arsenale navale; a Lorient vengono sbarcate le riserve di lingotti d'oro della Banca di Polonia prima di essere evacuate oltremare.",
    s6: "Dipartimento del Morbihan. Giugno 1940: le colonne corazzate tedesche occupano Lorient il 21 giugno. L'ammiraglio Karl Dönitz visita personalmente la base intuendone l'eccezionale valore strategico per la guerra sottomarina contro i convogli alleati.",
    s7: "Dipartimento del Morbihan. Ottobre 1940: a Lorient sorge la base sottomarina di Keroman: l'Organizzazione Todt impiega 15.000 operai nella costruzione del più grande complesso corazzato del Terzo Reich per ospitare 30 sommergibili. Dönitz installa il comando supremo della flotta sottomarina (Befehlshaber der U-Boote) nella villa di Kernevel.",
    s8: "Dipartimento del Morbihan. Aprile 1941: i branchi di lupi (Wolfpacks) dell'ammiraglio Dönitz salpano regolarmente da Keroman per dare la caccia ai convogli alleati nel Nord Atlantico; Lorient è trasformata in una fortezza inespugnabile protetta da cinture antiaeree.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRH04'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRH04'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRH04'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRH04'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRH04'].s2_4;
      return FRANCE_PROVINCES_META['FRH04'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRH04'].name;
      return FRANCE_PROVINCES_META['FRH04'].armisticeName || FRANCE_PROVINCES_META['FRH04'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRH04'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRH04'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRI11': {
    nuts: 'FRI11',
    name: "Dordogne (Périgueux)",
    modernName: "Dordogne (24, Périgueux / Nouvelle-Aquitaine)",
    historicalName: "Dordogne (Périgueux) (Périgueux - Nouvelle-Aquitaine (Aquitaine))",
    cheflieu: "Périgueux",
    region: "Nouvelle-Aquitaine (Aquitaine)",
    deptNum: '24',
    partition1940: 'zone_libre',
    armisticeName: "Dordogne (Périgueux)",
    repAdminTitle: "Troisième République française — Département de la Dordogne (Périgueux)",
    armisticeAdminTitle: "État français — Département de la Dordogne (Zone libre)",
    keys: ["dordogne", "perigueux", "bergerac", "sarlat"],
    s0_1: "Dipartimento della Dordogne (Périgueux / Bergerac). Cuore del Périgord nel bacino dell'Aquitania interna, celebre per le valli boscose, i siti preistorici (grotte di Lascaux scoperte proprio nel settembre 1940), le colture agricole e la fabbrica di polveri da sparo di Bergerac.",
    s2_4: "Dipartimento della Dordogne. 1938-1939: la Poudrerie de Bergerac lavora a ritmo raddoppiato per rifornire di esplosivi i reparti d'artiglieria dell'esercito francese; accoglienza di prime famiglie di profughi spagnoli.",
    s5: "Dipartimento della Dordogne. Settembre 1939 - maggio 1940: dipartimento protagonista dell'accoglienza dell'intera popolazione civile evacuata di Strasburgo e del Bas-Rhin (oltre 80.000 alsaziani insediati a Périgueux e nei borghi rurali, con la Prefettura e il Municipio di Strasburgo temporaneamente insediati a Périgueux).",
    s6: "Dipartimento della Dordogne. Giugno-luglio 1940: all'armistizio, la Dordogna è quasi interamente inclusa nella Zone libre sotto il governo di Vichy, salvo una sottile striscia occidentale tagliata dalla Ligne de Démarcation; accoglie centinaia di migliaia di sfollati parigini e alsaziani.",
    s7: "Dipartimento della Dordogne. Ottobre 1940: coabitazione solidale tra popolazione autoctona e rifugiati alsaziani; l'amministrazione di Vichy applica i decreti della 'Révolution Nationale', ma nel Périgord montuoso e boscoso attecchiscono i primi sentimenti di dissenso.",
    s8: "Dipartimento della Dordogne. Aprile 1941: la complessa conformazione geografica delle valli della Dordogna e dell'Isle rende il dipartimento una delle culle predilette per la nascita dei primi gruppi di maquisard e reti di resistenza partigiana del sud-ovest.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRI11'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRI11'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRI11'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRI11'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRI11'].s2_4;
      return FRANCE_PROVINCES_META['FRI11'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI11'].name;
      return FRANCE_PROVINCES_META['FRI11'].armisticeName || FRANCE_PROVINCES_META['FRI11'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI11'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRI11'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRI12': {
    nuts: 'FRI12',
    name: "Gironde (Bordeaux)",
    modernName: "Gironde (33, Bordeaux / Nouvelle-Aquitaine)",
    historicalName: "Gironde (Bordeaux - Base Navale Sommergibili Betasom)",
    cheflieu: "Bordeaux",
    region: "Nouvelle-Aquitaine (Aquitaine)",
    deptNum: '33',
    partition1940: 'zone_occupee',
    armisticeName: "Gironde (Bordeaux)",
    repAdminTitle: "Troisième République française — Département de la Gironde (Bordeaux)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Base navale de Bordeaux)",
    keys: ["gironde", "bordeaux", "arcachon", "libourne"],
    s0_1: "Dipartimento della Gironde (Bordeaux). Metropoli commerciale e marittima sull'estuario della Gironda, celebre in tutto il mondo per i grandi vigneti (Médoc, Saint-Émilion) e il porto fluviale d'altura; sede di importanti industrie aeronautiche (SNCAO, Marcel Bloch).",
    s2_4: "Dipartimento della Gironde. 1938-1939: Bordeaux modernizza gli scali portuali e potenzia gli stabilimenti per la costruzione di bombardieri bimotore; arrivo dei primi esuli repubblicani spagnoli nei porti dell'estuario.",
    s5: "Dipartimento della Gironde. Settembre 1939 - maggio 1940: scalo fondamentale per i convogli marittimi atlantici carichi di materie prime dalle colonie africane e dalle Americhe.",
    s6: "Dipartimento della Gironde. 14-28 Giugno 1940: di fronte al collasso militare, il presidente Albert Lebrun e il governo Reynaud riparano a Bordeaux, che diviene per due settimane capitale provvisoria della Francia; qui Reynaud si dimette e il maresciallo Pétain forma il governo che chiederà l'armistizio. Nelle stesse ore, il console generale portoghese Aristides de Sousa Mendes rilascia eroicamente oltre 30.000 visti salvavita a profughi ed ebrei in fuga.",
    s7: "Dipartimento della Gironde. Ottobre 1940: in base all'accordo italo-tedesco, il porto di Bordeaux diviene la base sottomarina atlantica della Regia Marina italiana (BETASOM, comandata dall'ammiraglio Angelo Parona con 32 sommergibili italiani) e della Kriegsmarine (12ª U-Flottille); l'Organizzazione Todt costruisce un immenso bunker per sommergibili a Bacalan.",
    s8: "Dipartimento della Gironde. Aprile 1941: i sommergibili atlantici italiani e tedeschi partono da Bordeaux per attaccare il traffico alleato verso l'Inghilterra; a Bordeaux le autorità tedesche presidiano la Ligne de Démarcation che attraversa l'estuario isolando la zona libera a est.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRI12'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRI12'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRI12'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRI12'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRI12'].s2_4;
      return FRANCE_PROVINCES_META['FRI12'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI12'].name;
      return FRANCE_PROVINCES_META['FRI12'].armisticeName || FRANCE_PROVINCES_META['FRI12'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI12'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRI12'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRI13': {
    nuts: 'FRI13',
    name: "Landes (Mont-de-Marsan)",
    modernName: "Landes (40, Mont-de-Marsan / Nouvelle-Aquitaine)",
    historicalName: "Landes (Mont-de-Marsan) (Mont-de-Marsan - Nouvelle-Aquitaine (Aquitaine))",
    cheflieu: "Mont-de-Marsan",
    region: "Nouvelle-Aquitaine (Aquitaine)",
    deptNum: '40',
    partition1940: 'zone_occupee',
    armisticeName: "Landes (Mont-de-Marsan)",
    repAdminTitle: "Troisième République française — Département des Landes (Mont-de-Marsan)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["landes", "mont_de_marsan", "dax"],
    s0_1: "Dipartimento di Landes (Mont-de-Marsan). Territorio della regione Nouvelle-Aquitaine (Aquitaine) con capoluogo Mont-de-Marsan. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Landes (Mont-de-Marsan). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Mont-de-Marsan adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Landes (Mont-de-Marsan). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Landes (Mont-de-Marsan). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Landes (Mont-de-Marsan). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Landes (Mont-de-Marsan). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Mont-de-Marsan; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRI13'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRI13'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRI13'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRI13'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRI13'].s2_4;
      return FRANCE_PROVINCES_META['FRI13'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI13'].name;
      return FRANCE_PROVINCES_META['FRI13'].armisticeName || FRANCE_PROVINCES_META['FRI13'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI13'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRI13'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRI14': {
    nuts: 'FRI14',
    name: "Lot-et-Garonne (Agen)",
    modernName: "Lot-et-Garonne (47, Agen / Nouvelle-Aquitaine)",
    historicalName: "Lot-et-Garonne (Agen) (Agen - Nouvelle-Aquitaine (Aquitaine))",
    cheflieu: "Agen",
    region: "Nouvelle-Aquitaine (Aquitaine)",
    deptNum: '47',
    partition1940: 'zone_libre',
    armisticeName: "Lot-et-Garonne (Agen)",
    repAdminTitle: "Troisième République française — Département de Lot-et-Garonne (Agen)",
    armisticeAdminTitle: "État français — Département de Lot-et-Garonne (Zone libre)",
    keys: ["lot_et_garonne", "agen", "marmande", "villeneuve_sur_lot"],
    s0_1: "Dipartimento di Lot-et-Garonne (Agen). Territorio della regione Nouvelle-Aquitaine (Aquitaine) imperniato sul capoluogo Agen. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Lot-et-Garonne (Agen). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Lot-et-Garonne (Agen). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Agen affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Lot-et-Garonne (Agen). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Lot-et-Garonne (Agen). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Lot-et-Garonne (Agen). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRI14'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRI14'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRI14'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRI14'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRI14'].s2_4;
      return FRANCE_PROVINCES_META['FRI14'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI14'].name;
      return FRANCE_PROVINCES_META['FRI14'].armisticeName || FRANCE_PROVINCES_META['FRI14'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI14'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRI14'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRI15': {
    nuts: 'FRI15',
    name: "Basses-Pyrénées (Pau / Bayonne)",
    modernName: "Pyrénées-Atlantiques (64, Pau / Bayonne / Nouvelle-Aquitaine)",
    historicalName: "Basses-Pyrénées (Pau / Bayonne / Hendaye - Campo di Gurs)",
    cheflieu: "Pau",
    region: "Nouvelle-Aquitaine (Aquitaine)",
    deptNum: '64',
    partition1940: 'zone_occupee',
    armisticeName: "Basses-Pyrénées (Pau / Bayonne)",
    repAdminTitle: "Troisième République française — Département des Basses-Pyrénées (Pau)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Frontière d\\",
    keys: ["pyrenees_atlantiques", "basses_pyrenees", "pau", "bayonne", "biarritz", "hendaye"],
    s0_1: "Dipartimento dei Basses-Pyrénées (Pau / Bayonne / Biarritz / Hendaye). Confine pirenaico con la Spagna, culla del popolo basco e del Béarn. Bayonne è un vivace porto marittimo, Pau ospita la prefettura e tradizioni climatiche d'élite, mentre la frontiera di Hendaye regola il traffico ferroviario iberico.",
    s2_4: "Dipartimento dei Basses-Pyrénées. Febbraio-aprile 1939: in seguito alla caduta della Catalogna e della Repubblica spagnola (La Retirada), il governo francese apre in tutta fretta il grande campo di concentramento di Gurs (vicino a Oloron-Sainte-Marie), destinato a internare oltre 25.000 combattenti repubblicani e brigatisti internazionali.",
    s5: "Dipartimento dei Basses-Pyrénées. Settembre 1939 - maggio 1940: il campo di Gurs viene reimpiegato dal governo per internare 'stranieri indesiderabili', rifugiati tedeschi antinazisti ed ebrei fuggiti dalla Germania e dall'Austria.",
    s6: "Dipartimento dei Basses-Pyrénées. Giugno 1940: all'armistizio del 22 giugno 1940, la fascia costiera atlantica e il confine spagnolo (Bayonne, Biarritz, Hendaye, Saint-Jean-de-Luz) sono assegnati alla Zone occupée tedesca per sigillare la frontiera iberica, mentre l'entroterra montuoso (Pau e Oloron) resta nella Zone libre.",
    s7: "Dipartimento dei Basses-Pyrénées. 23 Ottobre 1940: storico incontro alla stazione di Hendaye tra Adolf Hitler e il dittatore spagnolo Francisco Franco, nel quale Franco rifiuta l'entrata in guerra a fianco dell'Asse e l'Operazione Felix su Gibilterra; a Gurs affluiscono migliaia di ebrei espulsi dal Baden e Palatinato.",
    s8: "Dipartimento dei Basses-Pyrénées. Aprile 1941: il dipartimento è rigidamente spaccato in due dalla Ligne de Démarcation; sui Pirenei si organizzano le prime pericolose reti di passatori baschi (Rete Comète) per far espatriare aviatori alleati abbattuti e perseguitati verso la Spagna e Gibilterra.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRI15'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRI15'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRI15'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRI15'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRI15'].s2_4;
      return FRANCE_PROVINCES_META['FRI15'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI15'].name;
      return FRANCE_PROVINCES_META['FRI15'].armisticeName || FRANCE_PROVINCES_META['FRI15'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI15'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRI15'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRI21': {
    nuts: 'FRI21',
    name: "Corrèze (Tulle)",
    modernName: "Corrèze (19, Tulle / Brive / Nouvelle-Aquitaine)",
    historicalName: "Corrèze (Tulle) (Tulle - Nouvelle-Aquitaine (Limousin))",
    cheflieu: "Tulle",
    region: "Nouvelle-Aquitaine (Limousin)",
    deptNum: '19',
    partition1940: 'zone_libre',
    armisticeName: "Corrèze (Tulle)",
    repAdminTitle: "Troisième République française — Département de la Corrèze (Tulle)",
    armisticeAdminTitle: "État français — Département de la Corrèze (Zone libre)",
    keys: ["correze", "tulle", "brive_la_gaillarde", "brive", "ussel"],
    s0_1: "Dipartimento di Corrèze (Tulle). Territorio della regione Nouvelle-Aquitaine (Limousin) imperniato sul capoluogo Tulle. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Corrèze (Tulle). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Corrèze (Tulle). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Tulle affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Corrèze (Tulle). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Corrèze (Tulle). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Corrèze (Tulle). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRI21'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRI21'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRI21'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRI21'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRI21'].s2_4;
      return FRANCE_PROVINCES_META['FRI21'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI21'].name;
      return FRANCE_PROVINCES_META['FRI21'].armisticeName || FRANCE_PROVINCES_META['FRI21'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI21'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRI21'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRI22': {
    nuts: 'FRI22',
    name: "Creuse (Guéret)",
    modernName: "Creuse (23, Guéret / Nouvelle-Aquitaine)",
    historicalName: "Creuse (Guéret) (Guéret - Nouvelle-Aquitaine (Limousin))",
    cheflieu: "Guéret",
    region: "Nouvelle-Aquitaine (Limousin)",
    deptNum: '23',
    partition1940: 'zone_libre',
    armisticeName: "Creuse (Guéret)",
    repAdminTitle: "Troisième République française — Département de la Creuse (Guéret)",
    armisticeAdminTitle: "État français — Département de la Creuse (Zone libre)",
    keys: ["creuse", "gueret", "aubusson"],
    s0_1: "Dipartimento di Creuse (Guéret). Territorio della regione Nouvelle-Aquitaine (Limousin) imperniato sul capoluogo Guéret. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Creuse (Guéret). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Creuse (Guéret). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Guéret affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Creuse (Guéret). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Creuse (Guéret). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Creuse (Guéret). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRI22'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRI22'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRI22'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRI22'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRI22'].s2_4;
      return FRANCE_PROVINCES_META['FRI22'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI22'].name;
      return FRANCE_PROVINCES_META['FRI22'].armisticeName || FRANCE_PROVINCES_META['FRI22'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI22'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRI22'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRI23': {
    nuts: 'FRI23',
    name: "Haute-Vienne (Limoges)",
    modernName: "Haute-Vienne (87, Limoges / Nouvelle-Aquitaine)",
    historicalName: "Haute-Vienne (Limoges) (Limoges - Nouvelle-Aquitaine (Limousin))",
    cheflieu: "Limoges",
    region: "Nouvelle-Aquitaine (Limousin)",
    deptNum: '87',
    partition1940: 'zone_libre',
    armisticeName: "Haute-Vienne (Limoges)",
    repAdminTitle: "Troisième République française — Département de la Haute-Vienne (Limoges)",
    armisticeAdminTitle: "État français — Département de la Haute-Vienne (Limoges, Zone libre)",
    keys: ["haute_vienne", "limoges", "bellac", "rochechouart"],
    s0_1: "Dipartimento di Haute-Vienne (Limoges). Territorio della regione Nouvelle-Aquitaine (Limousin) imperniato sul capoluogo Limoges. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Haute-Vienne (Limoges). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Haute-Vienne (Limoges). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Limoges affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Haute-Vienne (Limoges). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Haute-Vienne (Limoges). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Haute-Vienne (Limoges). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRI23'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRI23'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRI23'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRI23'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRI23'].s2_4;
      return FRANCE_PROVINCES_META['FRI23'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI23'].name;
      return FRANCE_PROVINCES_META['FRI23'].armisticeName || FRANCE_PROVINCES_META['FRI23'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI23'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRI23'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRI31': {
    nuts: 'FRI31',
    name: "Charente (Angoulême)",
    modernName: "Charente (16, Angoulême / Nouvelle-Aquitaine)",
    historicalName: "Charente (Angoulême) (Angoulême - Nouvelle-Aquitaine (Poitou-Charentes))",
    cheflieu: "Angoulême",
    region: "Nouvelle-Aquitaine (Poitou-Charentes)",
    deptNum: '16',
    partition1940: 'zone_occupee',
    armisticeName: "Charente (Angoulême)",
    repAdminTitle: "Troisième République française — Département de la Charente (Angoulême)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["charente", "angouleme", "cognac"],
    s0_1: "Dipartimento di Charente (Angoulême). Territorio della regione Nouvelle-Aquitaine (Poitou-Charentes) con capoluogo Angoulême. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Charente (Angoulême). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Angoulême adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Charente (Angoulême). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Charente (Angoulême). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Charente (Angoulême). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Charente (Angoulême). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Angoulême; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRI31'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRI31'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRI31'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRI31'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRI31'].s2_4;
      return FRANCE_PROVINCES_META['FRI31'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI31'].name;
      return FRANCE_PROVINCES_META['FRI31'].armisticeName || FRANCE_PROVINCES_META['FRI31'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI31'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRI31'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRI32': {
    nuts: 'FRI32',
    name: "Charente-Inférieure (La Rochelle)",
    modernName: "Charente-Maritime (17, La Rochelle / Nouvelle-Aquitaine)",
    historicalName: "Charente-Inférieure (La Rochelle / La Pallice - Base U-Boot)",
    cheflieu: "La Rochelle",
    region: "Nouvelle-Aquitaine (Poitou-Charentes)",
    deptNum: '17',
    partition1940: 'zone_occupee',
    armisticeName: "Charente-Inférieure (La Rochelle)",
    repAdminTitle: "Troisième République française — Département de la Charente-Inférieure (La Rochelle)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich (Kriegsmarine La Pallice)",
    keys: ["charente_maritime", "charente_inferieure", "la_rochelle", "rochefort", "saintes"],
    s0_1: "Dipartimento di Charente-Inférieure (La Rochelle / Rochefort). Litorale atlantico e isole di Ré e Oléron: La Rochelle vanta il moderno porto commerciale e peschereccio di La Pallice, mentre Rochefort è sede storica dell'Arsenale navale e della scuola d'aviazione navale.",
    s2_4: "Dipartimento di Charente-Inférieure. 1938-1939: La Pallice potenzia i bacini di riparazione marittima e accoglie le riserve strategiche di carburante della marina da guerra; sorveglianza costiera nel golfo di Biscaglia.",
    s5: "Dipartimento di Charente-Inférieure. Settembre 1939 - maggio 1940: transito marittimo e basi per idrovolanti da ricognizione; accoglienza di oltre 60.000 profughi evacuati dalla Mosella lorenese.",
    s6: "Dipartimento di Charente-Inférieure. Giugno 1940: occupazione tedesca della costa e delle isole il 23 giugno. Con l'armistizio, il dipartimento è inserito nella Zone occupée per il controllo integrale della facciata atlantica.",
    s7: "Dipartimento di Charente-Inférieure. Ottobre 1940: la Kriegsmarine sceglie il porto di La Pallice per insediarvi la 3ª U-Flottille di sommergibili; l'Organizzazione Todt inizia la costruzione di un ciclopico bunker per U-Boot dotato di 10 alveoli corazzati.",
    s8: "Dipartimento di Charente-Inférieure. Aprile 1941: La Pallice diviene un centro nevralgico della guerra sottomarina nell'Atlantico centrale; (il dipartimento sarà ufficialmente ribattezzato 'Charente-Maritime' dal governo di Vichy con legge del 4 settembre 1941 per eliminare l'aggettivo 'Inférieure').",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRI32'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRI32'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRI32'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRI32'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRI32'].s2_4;
      return FRANCE_PROVINCES_META['FRI32'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI32'].name;
      return FRANCE_PROVINCES_META['FRI32'].armisticeName || FRANCE_PROVINCES_META['FRI32'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI32'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRI32'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRI33': {
    nuts: 'FRI33',
    name: "Deux-Sèvres (Niort)",
    modernName: "Deux-Sèvres (79, Niort / Nouvelle-Aquitaine)",
    historicalName: "Deux-Sèvres (Niort) (Niort - Nouvelle-Aquitaine (Poitou-Charentes))",
    cheflieu: "Niort",
    region: "Nouvelle-Aquitaine (Poitou-Charentes)",
    deptNum: '79',
    partition1940: 'zone_occupee',
    armisticeName: "Deux-Sèvres (Niort)",
    repAdminTitle: "Troisième République française — Département des Deux-Sèvres (Niort)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["deux_sevres", "niort", "parthenay"],
    s0_1: "Dipartimento di Deux-Sèvres (Niort). Territorio della regione Nouvelle-Aquitaine (Poitou-Charentes) con capoluogo Niort. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Deux-Sèvres (Niort). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Niort adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Deux-Sèvres (Niort). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Deux-Sèvres (Niort). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Deux-Sèvres (Niort). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Deux-Sèvres (Niort). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Niort; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRI33'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRI33'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRI33'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRI33'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRI33'].s2_4;
      return FRANCE_PROVINCES_META['FRI33'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI33'].name;
      return FRANCE_PROVINCES_META['FRI33'].armisticeName || FRANCE_PROVINCES_META['FRI33'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI33'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRI33'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRI34': {
    nuts: 'FRI34',
    name: "Vienne (Poitiers)",
    modernName: "Vienne (86, Poitiers / Nouvelle-Aquitaine)",
    historicalName: "Vienne (Poitiers) (Poitiers - Nouvelle-Aquitaine (Poitou-Charentes))",
    cheflieu: "Poitiers",
    region: "Nouvelle-Aquitaine (Poitou-Charentes)",
    deptNum: '86',
    partition1940: 'zone_occupee',
    armisticeName: "Vienne (Poitiers)",
    repAdminTitle: "Troisième République française — Département de la Vienne (Poitiers)",
    armisticeAdminTitle: "Zone occupée — Militärbefehlshaber in Frankreich",
    keys: ["vienne", "poitiers", "chatellerault"],
    s0_1: "Dipartimento di Vienne (Poitiers). Territorio della regione Nouvelle-Aquitaine (Poitou-Charentes) con capoluogo Poitiers. Sotto la Terza Repubblica e durante la stagione del Fronte Popolare (1936-1937), il dipartimento beneficia delle conquiste sindacali degli accordi di Matignon e dello sviluppo economico e infrastrutturale locale.",
    s2_4: "Dipartimento di Vienne (Poitiers). Nel 1938-1939, di fronte all'incombere della minaccia bellica in Europa, il distretto di Poitiers adegua le proprie strutture di protezione civile, potenzia la difesa passiva e intensifica la produzione agricola e industriale per sostenere la difesa nazionale.",
    s5: "Dipartimento di Vienne (Poitiers). Settembre 1939 - maggio 1940: allo scoppio delle ostilità, la popolazione vive i mesi della 'Drôle de guerre' tra rigido oscuramento e tesseramento dei consumi, mentre le caserme e gli snodi di trasporto garantiscono il flusso di uomini verso il fronte.",
    s6: "Dipartimento di Vienne (Poitiers). Giugno 1940: investito dall'offensiva della Wehrmacht e dall'esodo disperato dei profughi. Con l'armistizio del 22 giugno 1940, il dipartimento è pienamente incorporato nella Zone occupée sotto l'amministrazione militare tedesca (Militärbefehlshaber in Frankreich a Parigi), con l'imposizione del coprifuoco e di pesanti costi di occupazione.",
    s7: "Dipartimento di Vienne (Poitiers). Ottobre 1940: territorio rigidamente presidiato dalle truppe d'occupazione tedesche e dalla Feldgendarmerie; dopo il colloquio di Montoire tra Hitler e Pétain, le autorità collaborazioniste applicano il primo Statuto degli Ebrei e intensificano la sorveglianza poliziesca.",
    s8: "Dipartimento di Vienne (Poitiers). Aprile 1941: il rigido inverno aggrava la penuria di viveri e combustibili a Poitiers; la Ligne de Démarcation isola ermeticamente il territorio dalla zona meridionale. Si organizzano le prime filiere di evasione per prigionieri fuggiaschi e i primi nuclei di resistenza della zona nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRI34'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRI34'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRI34'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRI34'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRI34'].s2_4;
      return FRANCE_PROVINCES_META['FRI34'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI34'].name;
      return FRANCE_PROVINCES_META['FRI34'].armisticeName || FRANCE_PROVINCES_META['FRI34'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRI34'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRI34'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'GER';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Asse' as FactionType;
    },
  },
  'FRJ11': {
    nuts: 'FRJ11',
    name: "Aude (Carcassonne)",
    modernName: "Aude (11, Carcassonne / Occitanie)",
    historicalName: "Aude (Carcassonne) (Carcassonne - Occitanie (Languedoc-Roussillon))",
    cheflieu: "Carcassonne",
    region: "Occitanie (Languedoc-Roussillon)",
    deptNum: '11',
    partition1940: 'zone_libre',
    armisticeName: "Aude (Carcassonne)",
    repAdminTitle: "Troisième République française — Département de l\\",
    armisticeAdminTitle: "État français — Département de l\\",
    keys: ["aude", "carcassonne", "narbonne"],
    s0_1: "Dipartimento di Aude (Carcassonne). Territorio della regione Occitanie (Languedoc-Roussillon) imperniato sul capoluogo Carcassonne. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Aude (Carcassonne). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Aude (Carcassonne). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Carcassonne affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Aude (Carcassonne). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Aude (Carcassonne). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Aude (Carcassonne). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRJ11'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRJ11'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRJ11'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRJ11'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRJ11'].s2_4;
      return FRANCE_PROVINCES_META['FRJ11'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ11'].name;
      return FRANCE_PROVINCES_META['FRJ11'].armisticeName || FRANCE_PROVINCES_META['FRJ11'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ11'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRJ11'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRJ12': {
    nuts: 'FRJ12',
    name: "Gard (Nîmes)",
    modernName: "Gard (30, Nîmes / Occitanie)",
    historicalName: "Gard (Nîmes) (Nîmes - Occitanie (Languedoc-Roussillon))",
    cheflieu: "Nîmes",
    region: "Occitanie (Languedoc-Roussillon)",
    deptNum: '30',
    partition1940: 'zone_libre',
    armisticeName: "Gard (Nîmes)",
    repAdminTitle: "Troisième République française — Département du Gard (Nîmes)",
    armisticeAdminTitle: "État français — Département du Gard (Zone libre)",
    keys: ["gard", "nimes", "ales"],
    s0_1: "Dipartimento di Gard (Nîmes). Territorio della regione Occitanie (Languedoc-Roussillon) imperniato sul capoluogo Nîmes. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Gard (Nîmes). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Gard (Nîmes). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Nîmes affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Gard (Nîmes). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Gard (Nîmes). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Gard (Nîmes). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRJ12'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRJ12'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRJ12'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRJ12'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRJ12'].s2_4;
      return FRANCE_PROVINCES_META['FRJ12'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ12'].name;
      return FRANCE_PROVINCES_META['FRJ12'].armisticeName || FRANCE_PROVINCES_META['FRJ12'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ12'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRJ12'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRJ13': {
    nuts: 'FRJ13',
    name: "Hérault (Montpellier)",
    modernName: "Hérault (34, Montpellier / Occitanie)",
    historicalName: "Hérault (Montpellier) (Montpellier - Occitanie (Languedoc-Roussillon))",
    cheflieu: "Montpellier",
    region: "Occitanie (Languedoc-Roussillon)",
    deptNum: '34',
    partition1940: 'zone_libre',
    armisticeName: "Hérault (Montpellier)",
    repAdminTitle: "Troisième République française — Département de l\\",
    armisticeAdminTitle: "État français — Département de l\\",
    keys: ["herault", "montpellier", "beziers", "sete"],
    s0_1: "Dipartimento di Hérault (Montpellier). Territorio della regione Occitanie (Languedoc-Roussillon) imperniato sul capoluogo Montpellier. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Hérault (Montpellier). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Hérault (Montpellier). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Montpellier affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Hérault (Montpellier). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Hérault (Montpellier). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Hérault (Montpellier). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRJ13'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRJ13'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRJ13'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRJ13'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRJ13'].s2_4;
      return FRANCE_PROVINCES_META['FRJ13'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ13'].name;
      return FRANCE_PROVINCES_META['FRJ13'].armisticeName || FRANCE_PROVINCES_META['FRJ13'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ13'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRJ13'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRJ14': {
    nuts: 'FRJ14',
    name: "Lozère (Mende)",
    modernName: "Lozère (48, Mende / Occitanie)",
    historicalName: "Lozère (Mende) (Mende - Occitanie (Languedoc-Roussillon))",
    cheflieu: "Mende",
    region: "Occitanie (Languedoc-Roussillon)",
    deptNum: '48',
    partition1940: 'zone_libre',
    armisticeName: "Lozère (Mende)",
    repAdminTitle: "Troisième République française — Département de la Lozère (Mende)",
    armisticeAdminTitle: "État français — Département de la Lozère (Zone libre)",
    keys: ["lozere", "mende"],
    s0_1: "Dipartimento di Lozère (Mende). Territorio della regione Occitanie (Languedoc-Roussillon) imperniato sul capoluogo Mende. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Lozère (Mende). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Lozère (Mende). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Mende affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Lozère (Mende). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Lozère (Mende). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Lozère (Mende). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRJ14'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRJ14'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRJ14'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRJ14'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRJ14'].s2_4;
      return FRANCE_PROVINCES_META['FRJ14'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ14'].name;
      return FRANCE_PROVINCES_META['FRJ14'].armisticeName || FRANCE_PROVINCES_META['FRJ14'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ14'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRJ14'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRJ15': {
    nuts: 'FRJ15',
    name: "Pyrénées-Orientales (Perpignan)",
    modernName: "Pyrénées-Orientales (66, Perpignan / Occitanie)",
    historicalName: "Pyrénées-Orientales (Perpignan - Campi della Retirada Argelès)",
    cheflieu: "Perpignan",
    region: "Occitanie (Languedoc-Roussillon)",
    deptNum: '66',
    partition1940: 'zone_libre',
    armisticeName: "Pyrénées-Orientales (Perpignan)",
    repAdminTitle: "Troisième République française — Département des Pyrénées-Orientales (Perpignan)",
    armisticeAdminTitle: "État français — Département des Pyrénées-Orientales (Perpignan, Zone libre)",
    keys: ["pyrenees_orientales", "perpignan", "cerbere", "prades"],
    s0_1: "Dipartimento dei Pyrénées-Orientales (Perpignan / Argelès-sur-Mer / Cerbère). Catalogna francese e confine pirenaico mediterraneo con la Spagna: Perpignan è il capoluogo agricolo e vitivinicolo del Roussillon, dominato dal massiccio del Canigou, mentre il valico di Cerbère gestisce i collegamenti ferroviari internazionali.",
    s2_4: "Dipartimento dei Pyrénées-Orientales. Febbraio 1939: epicentro del dramma de 'La Retirada'. Oltre 450.000 profughi repubblicani spagnoli, soldati dell'esercito popolare, donne e bambini varcano la frontiera a Le Perthus e Cerbère; il governo francese istituisce campi di internamento d'emergenza recintati col filo spinato direttamente sulla sabbia marina delle spiagge di Argelès-sur-Mer e Saint-Cyprien in condizioni igieniche drammatiche.",
    s5: "Dipartimento dei Pyrénées-Orientales. Settembre 1939 - maggio 1940: i campi di Argelès e Saint-Cyprien continuano a ospitare decine di migliaia di profughi; molti internati scelgono di arruolarsi nelle Compagnie di Lavoratori Stranieri (CTE) o nella Legione Straniera per combattere la Germania.",
    s6: "Dipartimento dei Pyrénées-Orientales. Giugno-luglio 1940: compreso nella Zone libre di Vichy; la frontiera di Cerbère e Le Perthus diviene uno dei pochissimi varchi terrestri d'uscita dall'Europa occupata verso la penisola iberica neutrale e il continente americano.",
    s7: "Dipartimento dei Pyrénées-Orientales. Ottobre 1940: Vichy allestisce il grande campo di internamento di Rivesaltes per concentrarvi profughi spagnoli, 'stranieri indesiderabili' e famiglie ebree prive di nazionalità; la vicina frontiera pirenaica è pattugliata dai doganieri ma percorsa di notte da fuggiaschi.",
    s8: "Dipartimento dei Pyrénées-Orientales. Aprile 1941: le creste del Canigou e i sentieri pirenaici di Cerbère diventano le principali rotte clandestine di evasione verso la Spagna per piloti alleati e agenti segreti, con l'assistenza eroica delle guide locali e della popolazione catalana.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRJ15'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRJ15'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRJ15'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRJ15'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRJ15'].s2_4;
      return FRANCE_PROVINCES_META['FRJ15'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ15'].name;
      return FRANCE_PROVINCES_META['FRJ15'].armisticeName || FRANCE_PROVINCES_META['FRJ15'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ15'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRJ15'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRJ21': {
    nuts: 'FRJ21',
    name: "Ariège (Foix)",
    modernName: "Ariège (09, Foix / Occitanie)",
    historicalName: "Ariège (Foix) (Foix - Occitanie (Midi-Pyrénées))",
    cheflieu: "Foix",
    region: "Occitanie (Midi-Pyrénées)",
    deptNum: '09',
    partition1940: 'zone_libre',
    armisticeName: "Ariège (Foix)",
    repAdminTitle: "Troisième République française — Département de l\\",
    armisticeAdminTitle: "État français — Département de l\\",
    keys: ["ariege", "foix", "pamiers"],
    s0_1: "Dipartimento di Ariège (Foix). Territorio della regione Occitanie (Midi-Pyrénées) imperniato sul capoluogo Foix. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Ariège (Foix). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Ariège (Foix). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Foix affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Ariège (Foix). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Ariège (Foix). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Ariège (Foix). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRJ21'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRJ21'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRJ21'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRJ21'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRJ21'].s2_4;
      return FRANCE_PROVINCES_META['FRJ21'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ21'].name;
      return FRANCE_PROVINCES_META['FRJ21'].armisticeName || FRANCE_PROVINCES_META['FRJ21'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ21'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRJ21'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRJ22': {
    nuts: 'FRJ22',
    name: "Aveyron (Rodez)",
    modernName: "Aveyron (12, Rodez / Occitanie)",
    historicalName: "Aveyron (Rodez) (Rodez - Occitanie (Midi-Pyrénées))",
    cheflieu: "Rodez",
    region: "Occitanie (Midi-Pyrénées)",
    deptNum: '12',
    partition1940: 'zone_libre',
    armisticeName: "Aveyron (Rodez)",
    repAdminTitle: "Troisième République française — Département de l\\",
    armisticeAdminTitle: "État français — Département de l\\",
    keys: ["aveyron", "rodez", "millau"],
    s0_1: "Dipartimento di Aveyron (Rodez). Territorio della regione Occitanie (Midi-Pyrénées) imperniato sul capoluogo Rodez. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Aveyron (Rodez). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Aveyron (Rodez). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Rodez affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Aveyron (Rodez). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Aveyron (Rodez). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Aveyron (Rodez). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRJ22'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRJ22'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRJ22'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRJ22'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRJ22'].s2_4;
      return FRANCE_PROVINCES_META['FRJ22'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ22'].name;
      return FRANCE_PROVINCES_META['FRJ22'].armisticeName || FRANCE_PROVINCES_META['FRJ22'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ22'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRJ22'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRJ23': {
    nuts: 'FRJ23',
    name: "Haute-Garonne (Toulouse)",
    modernName: "Haute-Garonne (31, Toulouse / Occitanie)",
    historicalName: "Haute-Garonne (Toulouse - Polo Industriale Aeronautico Dewoitine)",
    cheflieu: "Toulouse",
    region: "Occitanie (Midi-Pyrénées)",
    deptNum: '31',
    partition1940: 'zone_libre',
    armisticeName: "Haute-Garonne (Toulouse)",
    repAdminTitle: "Troisième République française — Département de la Haute-Garonne (Toulouse)",
    armisticeAdminTitle: "État français — Département de la Haute-Garonne (Toulouse, Zone libre)",
    keys: ["haute_garonne", "toulouse", "muret", "saint_gaudens"],
    s0_1: "Dipartimento dell'Haute-Garonne (Tolosa). Cuore della Linguadoca e del Mezzogiorno pirenaico bagnato dalla Garonna e dal Canal du Midi: Tolosa è una metropoli universitaria e il polo primario dell'industria aeronautica francese (stabilimenti Dewoitine e SNCASE) e delle polveri chimiche (ONIA).",
    s2_4: "Dipartimento dell'Haute-Garonne. 1938 - inizio 1939: le catene di montaggio di Tolosa producono in serie il caccia Dewoitine D.520, il miglior velivolo da combattimento dell'Armée de l'Air. Febbraio 1939: arrivo a Tolosa di decine di migliaia di rifugiati repubblicani spagnoli della Retirada, che trasformano la città nella capitale politica dell'antifascismo iberico in esilio.",
    s5: "Dipartimento dell'Haute-Garonne. Settembre 1939 - maggio 1940: lavoro a ritmi frenetici nelle fabbriche d'aviazione per consegnare i D.520 ai reparti al fronte; Tolosa accoglie decine di istituti scientifici delocalizzati da Parigi.",
    s6: "Dipartimento dell'Haute-Garonne. Giugno-luglio 1940: inserita nella Zone libre sotto il regime di Vichy. Tolosa diviene sede della 17ª divisione militare dell'Armée d'Armistice; i caccia D.520 non ancora assemblati vengono nascosti o stoccati nei depositi della regione.",
    s7: "Dipartimento dell'Haute-Garonne. Ottobre 1940: Tolosa è un centro fervente di opposizione politica sotterranea; la nutrita comunità di esuli spagnoli, unita agli operai aeronautici e agli studenti universitari, crea i primi collegamenti con le reti clandestine socialiste e comuniste.",
    s8: "Dipartimento dell'Haute-Garonne. Aprile 1941: a Tolone e Tolosa si strutturano le prime reti di spionaggio e fuga (Rete Bertaux, Rete Françoise guidata da Marie-Louise Dissard); la fabbrica polveri ONIA e le officine aeree subiscono i primi atti di sabotaggio industriale.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRJ23'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRJ23'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRJ23'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRJ23'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRJ23'].s2_4;
      return FRANCE_PROVINCES_META['FRJ23'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ23'].name;
      return FRANCE_PROVINCES_META['FRJ23'].armisticeName || FRANCE_PROVINCES_META['FRJ23'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ23'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRJ23'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRJ24': {
    nuts: 'FRJ24',
    name: "Gers (Auch)",
    modernName: "Gers (32, Auch / Occitanie)",
    historicalName: "Gers (Auch) (Auch - Occitanie (Midi-Pyrénées))",
    cheflieu: "Auch",
    region: "Occitanie (Midi-Pyrénées)",
    deptNum: '32',
    partition1940: 'zone_libre',
    armisticeName: "Gers (Auch)",
    repAdminTitle: "Troisième République française — Département du Gers (Auch)",
    armisticeAdminTitle: "État français — Département du Gers (Zone libre)",
    keys: ["gers", "auch", "condom"],
    s0_1: "Dipartimento di Gers (Auch). Territorio della regione Occitanie (Midi-Pyrénées) imperniato sul capoluogo Auch. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Gers (Auch). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Gers (Auch). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Auch affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Gers (Auch). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Gers (Auch). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Gers (Auch). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRJ24'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRJ24'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRJ24'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRJ24'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRJ24'].s2_4;
      return FRANCE_PROVINCES_META['FRJ24'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ24'].name;
      return FRANCE_PROVINCES_META['FRJ24'].armisticeName || FRANCE_PROVINCES_META['FRJ24'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ24'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRJ24'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRJ25': {
    nuts: 'FRJ25',
    name: "Lot (Cahors)",
    modernName: "Lot (46, Cahors / Occitanie)",
    historicalName: "Lot (Cahors) (Cahors - Occitanie (Midi-Pyrénées))",
    cheflieu: "Cahors",
    region: "Occitanie (Midi-Pyrénées)",
    deptNum: '46',
    partition1940: 'zone_libre',
    armisticeName: "Lot (Cahors)",
    repAdminTitle: "Troisième République française — Département du Lot (Cahors)",
    armisticeAdminTitle: "État français — Département du Lot (Zone libre)",
    keys: ["lot", "cahors", "figeac"],
    s0_1: "Dipartimento di Lot (Cahors). Territorio della regione Occitanie (Midi-Pyrénées) imperniato sul capoluogo Cahors. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Lot (Cahors). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Lot (Cahors). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Cahors affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Lot (Cahors). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Lot (Cahors). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Lot (Cahors). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRJ25'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRJ25'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRJ25'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRJ25'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRJ25'].s2_4;
      return FRANCE_PROVINCES_META['FRJ25'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ25'].name;
      return FRANCE_PROVINCES_META['FRJ25'].armisticeName || FRANCE_PROVINCES_META['FRJ25'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ25'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRJ25'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRJ26': {
    nuts: 'FRJ26',
    name: "Hautes-Pyrénées (Tarbes)",
    modernName: "Hautes-Pyrénées (65, Tarbes / Occitanie)",
    historicalName: "Hautes-Pyrénées (Tarbes) (Tarbes - Occitanie (Midi-Pyrénées))",
    cheflieu: "Tarbes",
    region: "Occitanie (Midi-Pyrénées)",
    deptNum: '65',
    partition1940: 'zone_libre',
    armisticeName: "Hautes-Pyrénées (Tarbes)",
    repAdminTitle: "Troisième République française — Département des Hautes-Pyrénées (Tarbes)",
    armisticeAdminTitle: "État français — Département des Hautes-Pyrénées (Zone libre)",
    keys: ["hautes_pyrenees", "tarbes", "lourdes"],
    s0_1: "Dipartimento di Hautes-Pyrénées (Tarbes). Territorio della regione Occitanie (Midi-Pyrénées) imperniato sul capoluogo Tarbes. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Hautes-Pyrénées (Tarbes). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Hautes-Pyrénées (Tarbes). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Tarbes affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Hautes-Pyrénées (Tarbes). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Hautes-Pyrénées (Tarbes). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Hautes-Pyrénées (Tarbes). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRJ26'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRJ26'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRJ26'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRJ26'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRJ26'].s2_4;
      return FRANCE_PROVINCES_META['FRJ26'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ26'].name;
      return FRANCE_PROVINCES_META['FRJ26'].armisticeName || FRANCE_PROVINCES_META['FRJ26'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ26'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRJ26'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRJ27': {
    nuts: 'FRJ27',
    name: "Tarn (Albi)",
    modernName: "Tarn (81, Albi / Occitanie)",
    historicalName: "Tarn (Albi) (Albi - Occitanie (Midi-Pyrénées))",
    cheflieu: "Albi",
    region: "Occitanie (Midi-Pyrénées)",
    deptNum: '81',
    partition1940: 'zone_libre',
    armisticeName: "Tarn (Albi)",
    repAdminTitle: "Troisième République française — Département du Tarn (Albi)",
    armisticeAdminTitle: "État français — Département du Tarn (Zone libre)",
    keys: ["tarn", "albi", "castres"],
    s0_1: "Dipartimento di Tarn (Albi). Territorio della regione Occitanie (Midi-Pyrénées) imperniato sul capoluogo Albi. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Tarn (Albi). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Tarn (Albi). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Albi affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Tarn (Albi). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Tarn (Albi). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Tarn (Albi). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRJ27'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRJ27'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRJ27'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRJ27'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRJ27'].s2_4;
      return FRANCE_PROVINCES_META['FRJ27'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ27'].name;
      return FRANCE_PROVINCES_META['FRJ27'].armisticeName || FRANCE_PROVINCES_META['FRJ27'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ27'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRJ27'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRJ28': {
    nuts: 'FRJ28',
    name: "Tarn-et-Garonne (Montauban)",
    modernName: "Tarn-et-Garonne (82, Montauban / Occitanie)",
    historicalName: "Tarn-et-Garonne (Montauban) (Montauban - Occitanie (Midi-Pyrénées))",
    cheflieu: "Montauban",
    region: "Occitanie (Midi-Pyrénées)",
    deptNum: '82',
    partition1940: 'zone_libre',
    armisticeName: "Tarn-et-Garonne (Montauban)",
    repAdminTitle: "Troisième République française — Département de Tarn-et-Garonne (Montauban)",
    armisticeAdminTitle: "État français — Département de Tarn-et-Garonne (Zone libre)",
    keys: ["tarn_et_garonne", "montauban", "castelsarrasin"],
    s0_1: "Dipartimento di Tarn-et-Garonne (Montauban). Territorio della regione Occitanie (Midi-Pyrénées) imperniato sul capoluogo Montauban. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Tarn-et-Garonne (Montauban). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Tarn-et-Garonne (Montauban). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Montauban affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Tarn-et-Garonne (Montauban). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Tarn-et-Garonne (Montauban). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Tarn-et-Garonne (Montauban). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRJ28'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRJ28'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRJ28'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRJ28'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRJ28'].s2_4;
      return FRANCE_PROVINCES_META['FRJ28'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ28'].name;
      return FRANCE_PROVINCES_META['FRJ28'].armisticeName || FRANCE_PROVINCES_META['FRJ28'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRJ28'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRJ28'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRK11': {
    nuts: 'FRK11',
    name: "Allier (Vichy / Moulins)",
    modernName: "Allier (03, Moulins / Vichy / Auvergne-Rhône-Alpes)",
    historicalName: "Allier (Moulins / Vichy - Sede del Governo dell'État Français)",
    cheflieu: "Moulins",
    region: "Auvergne-Rhône-Alpes (Auvergne)",
    deptNum: '03',
    partition1940: 'zone_libre',
    armisticeName: "Allier (Vichy)",
    repAdminTitle: "Troisième République française — Département de l\\",
    armisticeAdminTitle: "État français — Vichy (Siège du gouvernement du Maréchal Pétain)",
    keys: ["allier", "vichy", "moulins", "montlucon"],
    s0_1: "Dipartimento dell'Allier (Moulins / Vichy / Montluçon). Culla storica del Ducato di Borbone: Moulins ne è il centro amministrativo e giudiziario, Montluçon un operoso bacino metallurgico e chimico, mentre la città termale di Vichy sulle rive dell'Allier è una celebre stazione idroterapica internazionale dotata di decine di alberghi di gran lusso.",
    s2_4: "Dipartimento dell'Allier. 1938-1939: le officine meccaniche di Montluçon producono proiettili e attrezzature da campo; Vichy ospita congressi medici internazionali ed élite europee alla vigilia del conflitto.",
    s5: "Dipartimento dell'Allier. Settembre 1939 - maggio 1940: gli stabilimenti termali di Vichy vengono convertiti in grandi ospedali militari di retrovia per accogliere i feriti dell'esercito; mobilitazione industriale a Montluçon.",
    s6: "Dipartimento dell'Allier (Vichy — Sede del Governo). Luglio 1940: dopo la rotta e l'armistizio del 22 giugno 1940, il governo del maresciallo Philippe Pétain si stabilisce a Vichy, scelta per la straordinaria capienza ricettiva dei suoi palazzi e per la linea telefonica diretta con Parigi. Il 10 luglio 1940, nella sala del Grand Casino di Vichy, l'Assemblea Nazionale vota i pieni poteri a Pétain con 569 voti a favore, ponendo fine alla Terza Repubblica e proclamando la nascita dell'État Français. Il dipartimento è diviso in due dalla Ligne de Démarcation (Moulins a nord occupata, Vichy a sud nella Zone libre).",
    s7: "Dipartimento dell'Allier (Vichy — Sede del Governo). Ottobre 1940: Vichy è il centro nevralgico dell'État Français (Hôtel du Parc per Pétain e Laval, ministeri dislocati negli alberghi Carlton, Thermal, Majestic). Il 3 ottobre 1940 viene promulgato a Vichy il primo discriminatorio 'Statut des Juifs'; il 24 ottobre Pétain parte da Vichy per incontrare Hitler a Montoire e annunciare alla radio la politica di 'collaborazione'.",
    s8: "Dipartimento dell'Allier (Vichy — Sede del Governo). Aprile 1941: a Vichy l'ammiraglio François Darlan assume la carica di vicepresidente del consiglio e la guida effettiva del governo, accentuando la cooperazione poliziesca e industriale con le potenze dell'Asse (Protocolli di Parigi); la Ligne de Démarcation a Moulins è sottoposta a rigidissimi controlli da parte della feldgendarmeria.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRK11'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRK11'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRK11'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRK11'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRK11'].s2_4;
      return FRANCE_PROVINCES_META['FRK11'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK11'].name;
      return FRANCE_PROVINCES_META['FRK11'].armisticeName || FRANCE_PROVINCES_META['FRK11'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK11'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRK11'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRK12': {
    nuts: 'FRK12',
    name: "Cantal (Aurillac)",
    modernName: "Cantal (15, Aurillac / Auvergne-Rhône-Alpes)",
    historicalName: "Cantal (Aurillac) (Aurillac - Auvergne-Rhône-Alpes (Auvergne))",
    cheflieu: "Aurillac",
    region: "Auvergne-Rhône-Alpes (Auvergne)",
    deptNum: '15',
    partition1940: 'zone_libre',
    armisticeName: "Cantal (Aurillac)",
    repAdminTitle: "Troisième République française — Département du Cantal (Aurillac)",
    armisticeAdminTitle: "État français — Département du Cantal (Zone libre)",
    keys: ["cantal", "aurillac", "saint_flour"],
    s0_1: "Dipartimento di Cantal (Aurillac). Territorio della regione Auvergne-Rhône-Alpes (Auvergne) imperniato sul capoluogo Aurillac. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Cantal (Aurillac). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Cantal (Aurillac). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Aurillac affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Cantal (Aurillac). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Cantal (Aurillac). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Cantal (Aurillac). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRK12'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRK12'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRK12'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRK12'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRK12'].s2_4;
      return FRANCE_PROVINCES_META['FRK12'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK12'].name;
      return FRANCE_PROVINCES_META['FRK12'].armisticeName || FRANCE_PROVINCES_META['FRK12'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK12'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRK12'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRK13': {
    nuts: 'FRK13',
    name: "Haute-Loire (Le Puy-en-Velay)",
    modernName: "Haute-Loire (43, Le Puy-en-Velay / Auvergne-Rhône-Alpes)",
    historicalName: "Haute-Loire (Le Puy-en-Velay) (Le Puy-en-Velay - Auvergne-Rhône-Alpes (Auvergne))",
    cheflieu: "Le Puy-en-Velay",
    region: "Auvergne-Rhône-Alpes (Auvergne)",
    deptNum: '43',
    partition1940: 'zone_libre',
    armisticeName: "Haute-Loire (Le Puy-en-Velay)",
    repAdminTitle: "Troisième République française — Département de la Haute-Loire (Le Puy)",
    armisticeAdminTitle: "État français — Département de la Haute-Loire (Zone libre)",
    keys: ["haute_loire", "le_puy_en_velay", "le_puy", "brioude"],
    s0_1: "Dipartimento di Haute-Loire (Le Puy-en-Velay). Territorio della regione Auvergne-Rhône-Alpes (Auvergne) imperniato sul capoluogo Le Puy-en-Velay. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Haute-Loire (Le Puy-en-Velay). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Haute-Loire (Le Puy-en-Velay). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Le Puy-en-Velay affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Haute-Loire (Le Puy-en-Velay). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Haute-Loire (Le Puy-en-Velay). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Haute-Loire (Le Puy-en-Velay). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRK13'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRK13'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRK13'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRK13'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRK13'].s2_4;
      return FRANCE_PROVINCES_META['FRK13'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK13'].name;
      return FRANCE_PROVINCES_META['FRK13'].armisticeName || FRANCE_PROVINCES_META['FRK13'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK13'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRK13'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRK14': {
    nuts: 'FRK14',
    name: "Puy-de-Dôme (Clermont-Ferrand)",
    modernName: "Puy-de-Dôme (63, Clermont-Ferrand / Auvergne-Rhône-Alpes)",
    historicalName: "Puy-de-Dôme (Clermont-Ferrand) (Clermont-Ferrand - Auvergne-Rhône-Alpes (Auvergne))",
    cheflieu: "Clermont-Ferrand",
    region: "Auvergne-Rhône-Alpes (Auvergne)",
    deptNum: '63',
    partition1940: 'zone_libre',
    armisticeName: "Puy-de-Dôme (Clermont-Ferrand)",
    repAdminTitle: "Troisième République française — Département du Puy-de-Dôme (Clermont-Ferrand)",
    armisticeAdminTitle: "État français — Département du Puy-de-Dôme (Zone libre)",
    keys: ["puy_de_dome", "clermont_ferrand", "riom", "issoire"],
    s0_1: "Dipartimento del Puy-de-Dôme (Clermont-Ferrand / Riom). Cuore dell'Alvernia dominato dalla catena dei Puys: Clermont-Ferrand è la capitale mondiale degli pneumatici e della gomma con gli immensi stabilimenti Michelin, centro metallurgico e universitario di primaria grandezza.",
    s2_4: "Dipartimento del Puy-de-Dôme. 1938-1939: le officine Michelin lavorano a pieno ritmo per fornire pneumatici pesanti corazzati, maschere antigas e cingoli per i carri armati dell'esercito francese; espansione degli stabilimenti di Cataroux.",
    s5: "Dipartimento del Puy-de-Dôme. Settembre 1939 - maggio 1940: in seguito all'evacuazione della frontiera alsaziana, l'intera prestigiosa Università di Strasburgo (docenti e studenti patrioti) si rifugia ed è accolta a Clermont-Ferrand, trasformando la città in un polo di fervore repubblicano.",
    s6: "Dipartimento del Puy-de-Dôme. Giugno-luglio 1940: incluso interamente nella Zone libre sotto il governo di Vichy. A Riom il regime pétainista istituisce la 'Cour Suprême de Justice' destinata a processare e incolpare i leader della Terza Repubblica (Blum, Daladier, Reynaud, Gamelin) della disfatta militare.",
    s7: "Dipartimento del Puy-de-Dôme. Ottobre 1940: Michelin rifiuta ogni commessa diretta per la produzione di pneumatici a favore della Wehrmacht; gli studenti e i docenti dell'Università di Strasburgo a Clermont-Ferrand formano i primi circoli di fronda e resistenza intellettuale.",
    s8: "Dipartimento del Puy-de-Dôme. Aprile 1941: mentre a Riom si prepara l'apertura del celebre processo politico voluto da Vichy, tra i monti dell'Alvernia si organizzano le prime basi logistiche e i nascondigli per perseguitati e oppositori politici.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRK14'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRK14'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRK14'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRK14'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRK14'].s2_4;
      return FRANCE_PROVINCES_META['FRK14'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK14'].name;
      return FRANCE_PROVINCES_META['FRK14'].armisticeName || FRANCE_PROVINCES_META['FRK14'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK14'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRK14'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRK21': {
    nuts: 'FRK21',
    name: "Ain (Bourg-en-Bresse)",
    modernName: "Ain (01, Bourg-en-Bresse / Auvergne-Rhône-Alpes)",
    historicalName: "Ain (Bourg-en-Bresse) (Bourg-en-Bresse - Auvergne-Rhône-Alpes (Rhône-Alpes))",
    cheflieu: "Bourg-en-Bresse",
    region: "Auvergne-Rhône-Alpes (Rhône-Alpes)",
    deptNum: '01',
    partition1940: 'zone_libre',
    armisticeName: "Ain (Bourg-en-Bresse)",
    repAdminTitle: "Troisième République française — Département de l\\",
    armisticeAdminTitle: "État français — Département de l\\",
    keys: ["ain", "bourg_en_bresse", "belley", "gex"],
    s0_1: "Dipartimento di Ain (Bourg-en-Bresse). Territorio della regione Auvergne-Rhône-Alpes (Rhône-Alpes) imperniato sul capoluogo Bourg-en-Bresse. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Ain (Bourg-en-Bresse). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Ain (Bourg-en-Bresse). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Bourg-en-Bresse affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Ain (Bourg-en-Bresse). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Ain (Bourg-en-Bresse). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Ain (Bourg-en-Bresse). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRK21'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRK21'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRK21'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRK21'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRK21'].s2_4;
      return FRANCE_PROVINCES_META['FRK21'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK21'].name;
      return FRANCE_PROVINCES_META['FRK21'].armisticeName || FRANCE_PROVINCES_META['FRK21'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK21'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRK21'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRK22': {
    nuts: 'FRK22',
    name: "Ardèche (Privas)",
    modernName: "Ardèche (07, Privas / Auvergne-Rhône-Alpes)",
    historicalName: "Ardèche (Privas) (Privas - Auvergne-Rhône-Alpes (Rhône-Alpes))",
    cheflieu: "Privas",
    region: "Auvergne-Rhône-Alpes (Rhône-Alpes)",
    deptNum: '07',
    partition1940: 'zone_libre',
    armisticeName: "Ardèche (Privas)",
    repAdminTitle: "Troisième République française — Département de l\\",
    armisticeAdminTitle: "État français — Département de l\\",
    keys: ["ardeche", "privas", "tournon"],
    s0_1: "Dipartimento di Ardèche (Privas). Territorio della regione Auvergne-Rhône-Alpes (Rhône-Alpes) imperniato sul capoluogo Privas. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Ardèche (Privas). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Ardèche (Privas). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Privas affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Ardèche (Privas). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Ardèche (Privas). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Ardèche (Privas). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRK22'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRK22'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRK22'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRK22'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRK22'].s2_4;
      return FRANCE_PROVINCES_META['FRK22'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK22'].name;
      return FRANCE_PROVINCES_META['FRK22'].armisticeName || FRANCE_PROVINCES_META['FRK22'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK22'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRK22'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRK23': {
    nuts: 'FRK23',
    name: "Drôme (Valence)",
    modernName: "Drôme (26, Valence / Auvergne-Rhône-Alpes)",
    historicalName: "Drôme (Valence) (Valence - Auvergne-Rhône-Alpes (Rhône-Alpes))",
    cheflieu: "Valence",
    region: "Auvergne-Rhône-Alpes (Rhône-Alpes)",
    deptNum: '26',
    partition1940: 'zone_libre',
    armisticeName: "Drôme (Valence)",
    repAdminTitle: "Troisième République française — Département de la Drôme (Valence)",
    armisticeAdminTitle: "État français — Département de la Drôme (Zone libre)",
    keys: ["drome", "valence", "montelimar", "die"],
    s0_1: "Dipartimento di Drôme (Valence). Territorio della regione Auvergne-Rhône-Alpes (Rhône-Alpes) imperniato sul capoluogo Valence. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Drôme (Valence). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Drôme (Valence). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Valence affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Drôme (Valence). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Drôme (Valence). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Drôme (Valence). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRK23'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRK23'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRK23'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRK23'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRK23'].s2_4;
      return FRANCE_PROVINCES_META['FRK23'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK23'].name;
      return FRANCE_PROVINCES_META['FRK23'].armisticeName || FRANCE_PROVINCES_META['FRK23'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK23'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRK23'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRK24': {
    nuts: 'FRK24',
    name: "Isère (Grenoble)",
    modernName: "Isère (38, Grenoble / Auvergne-Rhône-Alpes)",
    historicalName: "Isère (Grenoble) (Grenoble - Auvergne-Rhône-Alpes (Rhône-Alpes))",
    cheflieu: "Grenoble",
    region: "Auvergne-Rhône-Alpes (Rhône-Alpes)",
    deptNum: '38',
    partition1940: 'zone_libre',
    armisticeName: "Isère (Grenoble)",
    repAdminTitle: "Troisième République française — Département de l\\",
    armisticeAdminTitle: "État français — Département de l\\",
    keys: ["isere", "grenoble", "vienne"],
    s0_1: "Dipartimento di Isère (Grenoble). Territorio della regione Auvergne-Rhône-Alpes (Rhône-Alpes) imperniato sul capoluogo Grenoble. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Isère (Grenoble). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Isère (Grenoble). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Grenoble affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Isère (Grenoble). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Isère (Grenoble). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Isère (Grenoble). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRK24'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRK24'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRK24'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRK24'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRK24'].s2_4;
      return FRANCE_PROVINCES_META['FRK24'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK24'].name;
      return FRANCE_PROVINCES_META['FRK24'].armisticeName || FRANCE_PROVINCES_META['FRK24'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK24'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRK24'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRK25': {
    nuts: 'FRK25',
    name: "Loire (Saint-Étienne)",
    modernName: "Loire (42, Saint-Étienne / Auvergne-Rhône-Alpes)",
    historicalName: "Loire (Saint-Étienne) (Saint-Étienne - Auvergne-Rhône-Alpes (Rhône-Alpes))",
    cheflieu: "Saint-Étienne",
    region: "Auvergne-Rhône-Alpes (Rhône-Alpes)",
    deptNum: '42',
    partition1940: 'zone_libre',
    armisticeName: "Loire (Saint-Étienne)",
    repAdminTitle: "Troisième République française — Département de la Loire (Saint-Étienne)",
    armisticeAdminTitle: "État français — Département de la Loire (Saint-Étienne, Zone libre)",
    keys: ["loire", "saint_etienne", "roanne", "montbrison"],
    s0_1: "Dipartimento di Loire (Saint-Étienne). Territorio della regione Auvergne-Rhône-Alpes (Rhône-Alpes) imperniato sul capoluogo Saint-Étienne. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Loire (Saint-Étienne). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Loire (Saint-Étienne). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Saint-Étienne affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Loire (Saint-Étienne). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Loire (Saint-Étienne). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Loire (Saint-Étienne). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRK25'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRK25'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRK25'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRK25'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRK25'].s2_4;
      return FRANCE_PROVINCES_META['FRK25'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK25'].name;
      return FRANCE_PROVINCES_META['FRK25'].armisticeName || FRANCE_PROVINCES_META['FRK25'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK25'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRK25'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRK26': {
    nuts: 'FRK26',
    name: "Rhône (Lyon)",
    modernName: "Rhône (69, Lyon / Auvergne-Rhône-Alpes)",
    historicalName: "Rhône (Lyon - Capitale de la Résistance)",
    cheflieu: "Lyon",
    region: "Auvergne-Rhône-Alpes (Rhône-Alpes)",
    deptNum: '69',
    partition1940: 'zone_libre',
    armisticeName: "Rhône (Lyon)",
    repAdminTitle: "Troisième République française — Département du Rhône (Lyon)",
    armisticeAdminTitle: "État français — Département du Rhône (Lyon, capitale de la Zone libre)",
    keys: ["rhone", "lyon", "villefranche_sur_saone"],
    s0_1: "Dipartimento del Rhône (Lione). Seconda metropoli e capitale industriale, bancaria e serica della Repubblica: la città di Lione sorge alla confluenza strategica di Rodano e Saona, polo primario delle fibre tessili, della chimica (Rhône-Poulenc) e dei trasporti pesanti (Berliet a Vénissieux); roccaforte del radicalsocialismo di Édouard Herriot.",
    s2_4: "Dipartimento del Rhône. 1938-1939: le fabbriche Berliet e le officine chimiche convertono la produzione verso autocarri militari, motori diesel e composti farmaceutici per l'Armée de Terre; ampliamento dei depositi logistici della ferrovia PLM.",
    s5: "Dipartimento del Rhône. Settembre 1939 - maggio 1940: snodo centrale delle comunicazioni e dei rinforzi inviati verso l'Armata delle Alpi e il fronte nord-est; Lione subisce bombardamenti aerei tedeschi nel giugno 1940.",
    s6: "Dipartimento del Rhône. Giugno-luglio 1940: dopo una brevissima occupazione tedesca di pochi giorni, le truppe del Reich si ritirano a nord della linea d'armistizio; Lione diviene la più grande e popolosa città della Zone libre sotto la sovranità nominale di Vichy, accogliendo centinaia di migliaia di rifugiati politici, intellettuali e sindacalisti fuggiti da Parigi.",
    s7: "Dipartimento del Rhône. Ottobre 1940: la fitta rete di 'traboules' (passaggi coperti tra i palazzi del centro storico) e l'intensa vita editoriale fanno di Lione il terreno ideale per la stampa clandestina e il coordinamento delle prime formazioni di opposizione a Pétain e al fascismo; nascono le prime cellule di Franc-Tireur.",
    s8: "Dipartimento del Rhône. Aprile 1941: Lione si afferma ufficialmente come 'Capitale de la Résistance'. Nella metropoli operano Henri Frenay (movimento Combat), Emmanuel d'Astier de La Vigerie (Libération-Sud) e Jean-Pierre Lévy; la polizia di Vichy e la sorveglianza speciale intensificano le perquisizioni contro la propaganda antifascista.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRK26'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRK26'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRK26'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRK26'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRK26'].s2_4;
      return FRANCE_PROVINCES_META['FRK26'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK26'].name;
      return FRANCE_PROVINCES_META['FRK26'].armisticeName || FRANCE_PROVINCES_META['FRK26'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK26'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRK26'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRK27': {
    nuts: 'FRK27',
    name: "Savoie (Chambéry)",
    modernName: "Savoie (73, Chambéry / Auvergne-Rhône-Alpes)",
    historicalName: "Savoie (Chambéry) (Chambéry - Auvergne-Rhône-Alpes (Rhône-Alpes))",
    cheflieu: "Chambéry",
    region: "Auvergne-Rhône-Alpes (Rhône-Alpes)",
    deptNum: '73',
    partition1940: 'zone_libre',
    armisticeName: "Savoie (Chambéry)",
    repAdminTitle: "Troisième République française — Département de la Savoie (Chambéry)",
    armisticeAdminTitle: "État français — Département de la Savoie (Zone libre — Frontière alpine)",
    keys: ["savoie", "chambery", "albertville", "saint_jean_de_maurienne", "maurienne"],
    s0_1: "Dipartimento di Savoie (Chambéry). Territorio della regione Auvergne-Rhône-Alpes (Rhône-Alpes) imperniato sul capoluogo Chambéry. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Savoie (Chambéry). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Savoie (Chambéry). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Chambéry affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Savoie (Chambéry). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Savoie (Chambéry). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Savoie (Chambéry). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRK27'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRK27'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRK27'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRK27'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRK27'].s2_4;
      return FRANCE_PROVINCES_META['FRK27'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK27'].name;
      return FRANCE_PROVINCES_META['FRK27'].armisticeName || FRANCE_PROVINCES_META['FRK27'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK27'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRK27'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRK28': {
    nuts: 'FRK28',
    name: "Haute-Savoie (Annecy)",
    modernName: "Haute-Savoie (74, Annecy / Auvergne-Rhône-Alpes)",
    historicalName: "Haute-Savoie (Annecy) (Annecy - Auvergne-Rhône-Alpes (Rhône-Alpes))",
    cheflieu: "Annecy",
    region: "Auvergne-Rhône-Alpes (Rhône-Alpes)",
    deptNum: '74',
    partition1940: 'zone_libre',
    armisticeName: "Haute-Savoie (Annecy)",
    repAdminTitle: "Troisième République française — Département de la Haute-Savoie (Annecy)",
    armisticeAdminTitle: "État français — Département de la Haute-Savoie (Zone libre)",
    keys: ["haute_savoie", "annecy", "chamonix", "bonneville", "thonon"],
    s0_1: "Dipartimento di Haute-Savoie (Annecy). Territorio della regione Auvergne-Rhône-Alpes (Rhône-Alpes) imperniato sul capoluogo Annecy. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Haute-Savoie (Annecy). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Haute-Savoie (Annecy). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Annecy affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Haute-Savoie (Annecy). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Haute-Savoie (Annecy). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Haute-Savoie (Annecy). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRK28'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRK28'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRK28'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRK28'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRK28'].s2_4;
      return FRANCE_PROVINCES_META['FRK28'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK28'].name;
      return FRANCE_PROVINCES_META['FRK28'].armisticeName || FRANCE_PROVINCES_META['FRK28'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRK28'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRK28'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRL01': {
    nuts: 'FRL01',
    name: "Basses-Alpes (Digne)",
    modernName: "Alpes-de-Haute-Provence (04, Digne-les-Bains / PACA)",
    historicalName: "Basses-Alpes (Digne - Settore Fortificato delle Alpi)",
    cheflieu: "Digne",
    region: "Provence-Alpes-Côte d'Azur",
    deptNum: '04',
    partition1940: 'zone_libre',
    armisticeName: "Basses-Alpes (Digne)",
    repAdminTitle: "Troisième République française — Département des Basses-Alpes (Digne)",
    armisticeAdminTitle: "État français — Département des Basses-Alpes (Zone libre)",
    keys: ["alpes_de_haute_provence", "basses_alpes", "digne", "forcalquier", "barcelonnette"],
    s0_1: "Dipartimento dei Basses-Alpes (Digne). Regione alpina interna dell'Alta Provenza imperniata sulla valle dell'Ubaye e del Verdon: terra di montagna austera e rurale, presidiata dai reparti di cacciatori alpini e dalle opere d'alta quota del Settore Fortificato delle Alpi (Fort Tournoux e sbarramenti vallivi).",
    s2_4: "Dipartimento dei Basses-Alpes. 1938-1939: in risposta alle rivendicazioni territoriali del regime fascista italiano su Nizza e la Savoia, il generale René Olry (comandante dell'Armée des Alpes) ordina il potenziamento di tutte le casematte e dei campi minati sui valichi alpini dell'Ubaye (Col de Larche).",
    s5: "Dipartimento dei Basses-Alpes. Settembre 1939 - maggio 1940: inverno rigidissimo passato dagli 'chasseurs alpins' a presidiare i fortini d'alta quota sepolti dalla neve a 2.000 metri, in costante stato di prontezza operativa.",
    s6: "Dipartimento dei Basses-Alpes. 10-25 Giugno 1940: Battaglia delle Alpi. L'esercito fascista italiano lancia un'offensiva generale ma viene nettamente e brillantemente respinto dalle fortificazioni francesi dell'Ubaye e dai cacciatori alpini del generale Olry, che non cedono un solo metro di territorio. Con l'armistizio, il dipartimento resta integralmente nella Zone libre sotto Vichy.",
    s7: "Dipartimento dei Basses-Alpes. Ottobre 1940: smobilitazione dell'Armée des Alpes e passaggio all'amministrazione di Vichy; le vallate solitarie e boscose offrono rifugio a famiglie antifasciste ed ebrei fuggiti dal nord.",
    s8: "Dipartimento dei Basses-Alpes. Aprile 1941: il territorio montano isolato e la diffidenza della popolazione montanara verso la propaganda collaborazionista favoriscono la costituzione delle prime basi logistiche per la futura resistenza del maquis alpino.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRL01'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRL01'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRL01'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRL01'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRL01'].s2_4;
      return FRANCE_PROVINCES_META['FRL01'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRL01'].name;
      return FRANCE_PROVINCES_META['FRL01'].armisticeName || FRANCE_PROVINCES_META['FRL01'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRL01'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRL01'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRL02': {
    nuts: 'FRL02',
    name: "Hautes-Alpes (Gap)",
    modernName: "Hautes-Alpes (05, Gap / PACA)",
    historicalName: "Hautes-Alpes (Gap) (Gap - Provence-Alpes-Côte d'Azur)",
    cheflieu: "Gap",
    region: "Provence-Alpes-Côte d'Azur",
    deptNum: '05',
    partition1940: 'zone_libre',
    armisticeName: "Hautes-Alpes (Gap)",
    repAdminTitle: "Troisième République française — Département des Hautes-Alpes (Gap)",
    armisticeAdminTitle: "État français — Département des Hautes-Alpes (Zone libre)",
    keys: ["hautes_alpes", "gap", "briancon"],
    s0_1: "Dipartimento di Hautes-Alpes (Gap). Territorio della regione Provence-Alpes-Côte d'Azur imperniato sul capoluogo Gap. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Hautes-Alpes (Gap). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Hautes-Alpes (Gap). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Gap affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Hautes-Alpes (Gap). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Hautes-Alpes (Gap). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Hautes-Alpes (Gap). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRL02'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRL02'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRL02'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRL02'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRL02'].s2_4;
      return FRANCE_PROVINCES_META['FRL02'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRL02'].name;
      return FRANCE_PROVINCES_META['FRL02'].armisticeName || FRANCE_PROVINCES_META['FRL02'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRL02'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRL02'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRL03': {
    nuts: 'FRL03',
    name: "Alpes-Maritimes (Nice / Menton)",
    modernName: "Alpes-Maritimes (06, Nice / Menton / PACA)",
    historicalName: "Alpes-Maritimes (Nice / Menton) (Nice - Provence-Alpes-Côte d'Azur)",
    cheflieu: "Nice",
    region: "Provence-Alpes-Côte d'Azur",
    deptNum: '06',
    partition1940: 'zone_libre',
    armisticeName: "Alpes-Maritimes (Nice / Menton)",
    repAdminTitle: "Troisième République française — Département des Alpes-Maritimes (Nice)",
    armisticeAdminTitle: "État français — Département des Alpes-Maritimes (Zone libre — Occupation de Menton)",
    keys: ["alpes_maritimes", "nice", "menton", "grasse", "cannes"],
    s0_1: "Dipartimento delle Alpes-Maritimes (Nizza / Mentone / Grasse). Costa Azzurra e frontiera alpina orientale con il Regno d'Italia: Nizza è una capitale turistica mondiale dotata di un attivo porto commerciale, Grasse capitale dei profumi, mentre la fascia litoranea e le gole della Vesubia sono difese dal Settore Fortificato delle Alpi Marittime (Fort Rimplas, Fort de Castillon, Fort Sainte-Agnès).",
    s2_4: "Dipartimento delle Alpes-Maritimes. 1938-1939: le provocazioni irredentiste di Roma su Nizza provocano vaste manifestazioni patriottiche francesi; i forti della Maginot Alpina vengono dotati di riserve di munizioni complete e armamenti contraerei.",
    s5: "Dipartimento delle Alpes-Maritimes. Settembre 1939 - maggio 1940: mobilitazione lungo la frontiera di Ponte San Luigi; Nizza vive sotto allarme contraereo e oscuramento notturno.",
    s6: "Dipartimento delle Alpes-Maritimes. Giugno 1940: il 10 giugno l'Italia dichiara guerra; l'assalto italiano lungo la costa e sui valichi montani viene fermato dalle casematte francesi (a Mentone l'avamposto di Ponte San Luigi con soli 9 soldati resiste per giorni a intere divisioni). Il 23 giugno gli italiani occupano la città di Mentone; all'armistizio, Mentone viene annessa de facto dall'Italia fascista, mentre Nizza e il resto del dipartimento restano nella Zone libre di Vichy.",
    s7: "Dipartimento delle Alpes-Maritimes. Ottobre 1940: a Mentone il regime fascista instaura un'amministrazione d'occupazione italiana imponendo l'uso della lingua italiana e la toponomastica italiana; a Nizza affluiscono migliaia di rifugiati ed ebrei in cerca di salvezza.",
    s8: "Dipartimento delle Alpes-Maritimes. Aprile 1941: Nizza diviene un vivace crocevia di spie, consolati stranieri e reti clandestine di soccorso ebraico; la popolazione mentonasca manifesta aperto rigetto verso l'annessione forzata imposta da Roma.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRL03'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRL03'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRL03'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRL03'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRL03'].s2_4;
      return FRANCE_PROVINCES_META['FRL03'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRL03'].name;
      return FRANCE_PROVINCES_META['FRL03'].armisticeName || FRANCE_PROVINCES_META['FRL03'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRL03'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRL03'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRL04': {
    nuts: 'FRL04',
    name: "Bouches-du-Rhône (Marseille)",
    modernName: "Bouches-du-Rhône (13, Marseille / PACA)",
    historicalName: "Bouches-du-Rhône (Marseille - Metropoli Portuale Mediterranea)",
    cheflieu: "Marseille",
    region: "Provence-Alpes-Côte d'Azur",
    deptNum: '13',
    partition1940: 'zone_libre',
    armisticeName: "Bouches-du-Rhône (Marseille)",
    repAdminTitle: "Troisième République française — Département des Bouches-du-Rhône (Marseille)",
    armisticeAdminTitle: "État français — Département des Bouches-du-Rhône (Marseille, Zone libre)",
    keys: ["bouches_du_rhone", "marseille", "aix_en_provence", "arles"],
    s0_1: "Dipartimento delle Bouches-du-Rhône (Marsiglia / Aix-en-Provence). Porta marittima principale della Francia verso il Mediterraneo e l'impero coloniale africano e indocinese: il porto di Marsiglia movimenta milioni di tonnellate di merci, polo petrolchimico dell'Étang de Berre e metropoli cosmopolita; Aix-en-Provence ne custodisce la tradizione giudiziaria e universitaria.",
    s2_4: "Dipartimento delle Bouches-du-Rhône. 1938-1939: Marsiglia accoglie migliaia di esuli antifascisti italiani e repubblicani spagnoli; potenziamento delle batterie litoranee costiere e delle raffinerie petrolifere di Berre.",
    s5: "Dipartimento delle Bouches-du-Rhône. Settembre 1939 - maggio 1940: scalo di transito vitale per le divisioni coloniali di tirailleurs nordafricani e senegalesi imbarcati verso i teatri di guerra metropolitani; bombardamenti navali italiani nel giugno 1940.",
    s6: "Dipartimento delle Bouches-du-Rhône. Giugno-luglio 1940: inserito nella Zone libre sotto l'autorità di Vichy. Marsiglia diviene il porto di rifugio e salvezza per centinaia di migliaia di profughi, dissidenti, ebrei ed élite culturali europee bloccate nel sud della Francia.",
    s7: "Dipartimento delle Bouches-du-Rhône. Ottobre 1940: all'Hôtel Splendide e a Villa Air-Bel a Marsiglia opera il giornalista americano Varian Fry alla guida dell'Emergency Rescue Committee, che con coraggio straordinario riesce a procurare visti e vie di fuga clandestine salvando oltre 2.000 tra i massimi artisti e intellettuali perseguitati dal nazifascismo (Marc Chagall, Max Ernst, André Breton, Hannah Arendt, Claude Lévi-Strauss).",
    s8: "Dipartimento delle Bouches-du-Rhône. Aprile 1941: la polizia di Vichy e la Commissione d'Armistizio italo-tedesca rafforzano i controlli sul porto e sulle frontiere marittime; a Marsiglia la penuria alimentare è mitigata dai traffici marittimi con l'Algeria, mentre si strutturano le prime cellule partigiane portuali.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRL04'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRL04'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRL04'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRL04'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRL04'].s2_4;
      return FRANCE_PROVINCES_META['FRL04'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRL04'].name;
      return FRANCE_PROVINCES_META['FRL04'].armisticeName || FRANCE_PROVINCES_META['FRL04'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRL04'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRL04'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRL05': {
    nuts: 'FRL05',
    name: "Var (Toulon)",
    modernName: "Var (83, Toulon / PACA)",
    historicalName: "Var (Toulon - Base della Flotte de Haute Mer)",
    cheflieu: "Toulon",
    region: "Provence-Alpes-Côte d'Azur",
    deptNum: '83',
    partition1940: 'zone_libre',
    armisticeName: "Var (Toulon)",
    repAdminTitle: "Troisième République française — Département du Var (Toulon)",
    armisticeAdminTitle: "État français — Département du Var (Toulon, Flotte de haute mer)",
    keys: ["var", "toulon", "draguignan", "hyeres"],
    s0_1: "Dipartimento del Var (Toulon / Draguignan). Costa mediterranea provenzale e capitale navale militare della Francia: la rada di Tolone è la sede principale della Flotte de Haute Mer (la squadra da battaglia della Marine Nationale), munita di possenti difese costiere, bacini di carenaggio e fortificazioni collinari.",
    s2_4: "Dipartimento del Var. 1938-1939: Tolone è in stato d'allerta continua di fronte alla crescente ostilità dell'Italia fascista; le corazzate Dunkerque, Strasbourg e Provence compiono regolari crociere di deterrenza nel Mediterraneo occidentale.",
    s5: "Dipartimento del Var. Settembre 1939 - maggio 1940: base di partenza per le missioni di scorta ai convogli truppe dal Nordafrica; nel giugno 1940 Tolone bombarda gli impianti industriali liguri di Genova e Savona con la 3ª Divisione di linea.",
    s6: "Dipartimento del Var. Giugno-luglio 1940: inserito nella Zone libre. L'ammiraglio Jean de Laborde mantiene concentrata a Tolone la Flotta d'Alto Mare (Flotte de Haute Mer); in base alle clausole dell'armistizio, le navi francesi restano sotto bandiera nazionale con equipaggi ridotti e serbatoi controllati, mentre la Royal Navy attacca Mers-el-Kébir temendo che cadano in mano tedesca.",
    s7: "Dipartimento del Var. Ottobre 1940: la rada di Tolone ospita oltre 80 navi da guerra da battaglia, incrociatori e cacciatorpediniere; la marina di Vichy sorveglia gelosamente la propria autonomia militare contro le interferenze della Commissione d'Armistizio italiana.",
    s8: "Dipartimento del Var. Aprile 1941: l'ammiraglio Darlan gestisce da Vichy il controllo ferreo delle basi navali; a Tolone gli arsenali lavorano a scartamento ridotto sotto rigida custodia, mentre gli ufficiali mantengono un giuramento di lealtà personale a Pétain e l'ordine segreto di autoaffondare la flotta se i tedeschi o gli italiani tentassero di impadronirsene.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRL05'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRL05'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRL05'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRL05'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRL05'].s2_4;
      return FRANCE_PROVINCES_META['FRL05'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRL05'].name;
      return FRANCE_PROVINCES_META['FRL05'].armisticeName || FRANCE_PROVINCES_META['FRL05'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRL05'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRL05'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRL06': {
    nuts: 'FRL06',
    name: "Vaucluse (Avignon)",
    modernName: "Vaucluse (84, Avignon / PACA)",
    historicalName: "Vaucluse (Avignon) (Avignon - Provence-Alpes-Côte d'Azur)",
    cheflieu: "Avignon",
    region: "Provence-Alpes-Côte d'Azur",
    deptNum: '84',
    partition1940: 'zone_libre',
    armisticeName: "Vaucluse (Avignon)",
    repAdminTitle: "Troisième République française — Département de Vaucluse (Avignon)",
    armisticeAdminTitle: "État français — Département de Vaucluse (Zone libre)",
    keys: ["vaucluse", "avignon", "orange", "carpentras"],
    s0_1: "Dipartimento di Vaucluse (Avignon). Territorio della regione Provence-Alpes-Côte d'Azur imperniato sul capoluogo Avignon. Durante la Terza Repubblica e il governo del Fronte Popolare (1936-1937), il dipartimento vive una fase di riforme sociali, modernizzazione agricola e sviluppo delle reti di comunicazione locali.",
    s2_4: "Dipartimento di Vaucluse (Avignon). Nel periodo degli accordi di Monaco e della vigilia bellica (1938-1939), il dipartimento mobilita le proprie risorse rurali e manifatturiere per contribuire al riarmo nazionale e alla costituzione di scorte di riserva per l'esercito.",
    s5: "Dipartimento di Vaucluse (Avignon). Settembre 1939 - maggio 1940: con lo scoppio del conflitto, la cittadinanza di Avignon affronta la mobilitazione generale e la 'Drôle de guerre', accogliendo contingenti di profughi ed evacuati dalle zone di frontiera del nord e dell'est.",
    s6: "Dipartimento di Vaucluse (Avignon). Giugno-luglio 1940: in seguito alla disfatta militare e all'armistizio del 22 giugno 1940, il dipartimento viene assegnato alla Zone libre sotto l'autorità dell'État Français (Governo di Vichy guidato dal maresciallo Philippe Pétain). Smobilitazione delle unità militari e arrivo massiccio di profughi del nord.",
    s7: "Dipartimento di Vaucluse (Avignon). Ottobre 1940: applicazione delle direttive della 'Révolution Nationale' di Vichy (lavoro, famiglia, patria); l'incontro di Montoire tra Pétain e Hitler accelera la svolta collaborazionista, mentre nelle comunità locali si manifestano le prime forme di scontento civile.",
    s8: "Dipartimento di Vaucluse (Avignon). Aprile 1941: il razionamento alimentare e le requisizioni si fanno stringenti nella Zone libre sotto il governo dell'ammiraglio Darlan. La conformazione geografica favorisce i primi contatti cospirativi e la nascita di cellule di resistenza clandestina collegate ai movimenti di Lione e del Mezzogiorno.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRL06'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRL06'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRL06'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRL06'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRL06'].s2_4;
      return FRANCE_PROVINCES_META['FRL06'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRL06'].name;
      return FRANCE_PROVINCES_META['FRL06'].armisticeName || FRANCE_PROVINCES_META['FRL06'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRL06'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRL06'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRM01': {
    nuts: 'FRM01',
    name: "Corse (Ajaccio)",
    modernName: "Corse-du-Sud (2A, Ajaccio / Corse)",
    historicalName: "Corse (Ajaccio) (Ajaccio - Corse)",
    cheflieu: "Ajaccio",
    region: "Corse",
    deptNum: '2A',
    partition1940: 'zone_libre',
    armisticeName: "Corse (Ajaccio)",
    repAdminTitle: "Troisième République française — Département de la Corse (Ajaccio)",
    armisticeAdminTitle: "État français — Département de la Corse (Ajaccio, Zone libre)",
    keys: ["corse_du_sud", "ajaccio", "sartene", "corse"],
    s0_1: "Dipartimento di Corse-du-Sud (Ajaccio). Dipartimento insulare mediterraneo e culla di Napoleone Bonaparte: Ajaccio ne ospita la prefettura e il porto marittimo protetto nel golfo omonimo; economia basata sull'olivicoltura, la pastorizia e i collegamenti navali con Marsiglia e Nizza.",
    s2_4: "Dipartimento di Corse-du-Sud. 30 Novembre 1938: di fronte alle sfacciate rivendicazioni territoriali del regime fascista italiano alla Camera dei Fasci ('Tunisi, Gibuti, Corsica!'), 20.000 corsi si radunano ad Ajaccio pronunciando lo storico 'Giuramento di Bastia e Ajaccio': 'Di fronte al mondo, con tutta la nostra anima, giuriamo di vivere e morire francesi!'.",
    s5: "Dipartimento di Corse-du-Sud. Settembre 1939 - maggio 1940: mobilitazione dei reggimenti di fanteria e cacciatori corsi; la costa meridionale e le bocche di Bonifacio vengono sorvegliate dalla marina per prevenire colpi di mano italiani dalla Sardegna.",
    s6: "Dipartimento di Corse-du-Sud. Giugno-luglio 1940: dopo l'entrata in guerra italiana del 10 giugno e l'armistizio, la Corsica resta nella Zone libre sotto il governo di Vichy; l'isola sfugge all'occupazione militare diretta grazie all'intransigenza diplomatica francese.",
    s7: "Dipartimento di Corse-du-Sud. Ottobre 1940: la popolazione isolana respinge categoricamente la propaganda irredentista italiana; i comitati di Vichy faticano a imporsi di fronte al solido attaccamento della popolazione ai valori repubblicani.",
    s8: "Dipartimento di Corse-du-Sud. Aprile 1941: si costituiscono le prime reti cospirative clandestine nell'entroterra montuoso corso; i marinai e pescatori di Ajaccio e Bonifacio mantengono contatti segreti con la marina alleata nel Mediterraneo.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRM01'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRM01'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRM01'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRM01'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRM01'].s2_4;
      return FRANCE_PROVINCES_META['FRM01'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRM01'].name;
      return FRANCE_PROVINCES_META['FRM01'].armisticeName || FRANCE_PROVINCES_META['FRM01'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRM01'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRM01'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRM02': {
    nuts: 'FRM02',
    name: "Corse (Bastia)",
    modernName: "Haute-Corse (2B, Bastia / Corse)",
    historicalName: "Corse (Bastia) (Bastia - Corse)",
    cheflieu: "Bastia",
    region: "Corse",
    deptNum: '2B',
    partition1940: 'zone_libre',
    armisticeName: "Corse (Bastia)",
    repAdminTitle: "Troisième République française — Département de la Corse (Bastia)",
    armisticeAdminTitle: "État français — Département de la Corse (Bastia, Zone libre)",
    keys: ["haute_corse", "bastia", "calvi", "corte"],
    s0_1: "Dipartimento di Haute-Corse (Bastia). Corsica settentrionale e porto commerciale principale dell'isola rivolto verso il Tirreno e l'Italia: Bastia è il fulcro mercantile e marittimo, mentre Corte nel cuore delle montagne ne custodisce la capitale storica e l'eredità di Pasquale Paoli.",
    s2_4: "Dipartimento di Haute-Corse. 4 Dicembre 1938: solenne Giuramento di Bastia pronunciato da migliaia di cittadini corsi davanti al monumento ai caduti per riaffermare l'indivisibile appartenenza alla Francia e respingere ogni pretesa di annessione fascista.",
    s5: "Dipartimento di Haute-Corse. Settembre 1939 - maggio 1940: Bastia subisce i primi bombardamenti aerei della Regia Aeronautica italiana nel giugno 1940; le difese costiere di Cap Corse rispondono al fuoco nemico.",
    s6: "Dipartimento di Haute-Corse. Giugno-luglio 1940: mantenuto nella Zone libre di Vichy all'armistizio; forte indignazione popolare per le clausole armistiziali e rifiuto di ogni compromesso con l'Italia.",
    s7: "Dipartimento di Haute-Corse. Ottobre 1940: l'amministrazione prefettizia di Bastia sorveglia i residenti italiani presenti sull'isola; nelle valli della Castagniccia e di Corte si formano i primi circoli di lealismo verso la Francia Libera di De Gaulle.",
    s8: "Dipartimento di Haute-Corse. Aprile 1941: precoce sviluppo della resistenza antifascista corsa (futuro Fronte Patriottico); isolamento commerciale mitigato dalla produzione agricola e pastorale locale.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRM02'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRM02'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRM02'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRM02'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRM02'].s2_4;
      return FRANCE_PROVINCES_META['FRM02'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRM02'].name;
      return FRANCE_PROVINCES_META['FRM02'].armisticeName || FRANCE_PROVINCES_META['FRM02'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRM02'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRM02'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRY10': {
    nuts: 'FRY10',
    name: "Guadeloupe (Basse-Terre)",
    modernName: "Guadeloupe (971, Basse-Terre / Caraibi)",
    historicalName: "Guadeloupe (Basse-Terre) (Basse-Terre - Outre-Mer (Caraibi))",
    cheflieu: "Basse-Terre",
    region: "Outre-Mer (Caraibi)",
    deptNum: '971',
    partition1940: 'dom_tom',
    armisticeName: "Guadeloupe (Basse-Terre)",
    repAdminTitle: "Troisième République française — Colonie de la Guadeloupe (Antilles françaises)",
    armisticeAdminTitle: "Administration coloniale de l\\",
    keys: ["guadeloupe", "basse_terre", "pointe_a_pitre"],
    s0_1: "Dipartimento d'Oltremare della Guadeloupe (Basse-Terre / Pointe-à-Pitre). Arcipelago delle Antille francesi nei Caraibi: produzione di zucchero di canna, rum e banane; Basse-Terre è la sede del governatore coloniale e Pointe-à-Pitre il porto commerciale primario.",
    s2_4: "Dipartimento d'Oltremare della Guadeloupe. 1938-1939: riorganizzazione dei contingenti coloniali e ammodernamento degli impianti portuali di Pointe-à-Pitre di fronte alle crescenti tensioni geopolitiche nell'Atlantico.",
    s5: "Dipartimento d'Oltremare della Guadeloupe. Settembre 1939 - maggio 1940: le Antille francesi esportano zucchero e materie prime verso la metropoli; sorveglianza delle rotte caraibiche contro corsari nemici.",
    s6: "Dipartimento d'Oltremare della Guadeloupe. Giugno-luglio 1940: dopo l'armistizio, la Guadalupa resta sotto l'autorità dell'ammiraglio Georges Robert (Alto Commissario per le Antille con sede in Martinica), che mantiene l'amministrazione coloniale fedele al regime di Vichy.",
    s7: "Dipartimento d'Oltremare della Guadeloupe. Ottobre 1940: blocco navale e accordi di sorveglianza con gli Stati Uniti (Accordo Robert-Greenslade), che garantiscono la neutralizzazione dei possedimenti caraibici francesi in cambio di forniture alimentari essenziali.",
    s8: "Dipartimento d'Oltremare della Guadeloupe. Aprile 1941: il regime di Vichy reprime duramente i tentativi di dissidenza clandestina; gruppi di giovani patrioti fuggono a bordo di imbarcazioni verso le vicine isole britanniche (Dominica) per arruolarsi nella Francia Libera di De Gaulle.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRY10'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRY10'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRY10'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRY10'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRY10'].s2_4;
      return FRANCE_PROVINCES_META['FRY10'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRY10'].name;
      return FRANCE_PROVINCES_META['FRY10'].armisticeName || FRANCE_PROVINCES_META['FRY10'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRY10'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRY10'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRY20': {
    nuts: 'FRY20',
    name: "Martinique (Fort-de-France)",
    modernName: "Martinique (972, Fort-de-France / Caraibi)",
    historicalName: "Martinique (Fort-de-France) (Fort-de-France - Outre-Mer (Caraibi))",
    cheflieu: "Fort-de-France",
    region: "Outre-Mer (Caraibi)",
    deptNum: '972',
    partition1940: 'dom_tom',
    armisticeName: "Martinique (Fort-de-France)",
    repAdminTitle: "Troisième République française — Colonie de la Martinique (Fort-de-France)",
    armisticeAdminTitle: "Administration coloniale de l\\",
    keys: ["martinique", "fort_de_france"],
    s0_1: "Dipartimento d'Oltremare della Martinique (Fort-de-France). Perla delle Antille francesi: Fort-de-France è la sede del comando marittimo francese nei Caraibi e dell'Alto Commissariato d'Oltremare, con una rada protetta di straordinaria importanza strategica.",
    s2_4: "Dipartimento d'Oltremare della Martinique. 1938-1939: la base navale di Fort-de-France accoglie le unità della Marine Nationale di stanza nell'emisfero occidentale; rafforzamento della cooperazione marittima atlantica.",
    s5: "Dipartimento d'Oltremare della Martinique. Maggio-giugno 1940: evento storico finanziario. L'incrociatore Émile Bertin e la portaerei Béarn salpano da Brest trasportando 286 tonnellate d'oro delle riserve della Banque de France e 106 caccia moderni acquistati negli USA, mettendoli in salvo nella rada di Fort-de-France.",
    s6: "Dipartimento d'Oltremare della Martinique. Giugno-luglio 1940: l'ammiraglio Georges Robert rifiuta il ralliement alla Francia Libera e riconosce l'autorità del maresciallo Pétain a Vichy; la portaerei Béarn e l'oro francese restano bloccati a Fort-de-France sotto la vigile sorveglianza delle navi da guerra statunitensi.",
    s7: "Dipartimento d'Oltremare della Martinique. Ottobre 1940: firma dell'Accordo Robert-Greenslade con la US Navy: la Martinica promette di non cedere le navi da guerra e l'oro all'Asse in cambio della revoca del blocco economico americano sui viveri di prima necessità.",
    s8: "Dipartimento d'Oltremare della Martinique. Aprile 1941: rigido regime autoritario dell'ammiraglio Robert ('An tan Robè'); centinaia di marinai e cittadini martinicani tentano la pericolosa fuga via mare (la 'dissidence') verso Saint Lucia per raggiungere le Forces Françaises Libres.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRY20'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRY20'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRY20'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRY20'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRY20'].s2_4;
      return FRANCE_PROVINCES_META['FRY20'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRY20'].name;
      return FRANCE_PROVINCES_META['FRY20'].armisticeName || FRANCE_PROVINCES_META['FRY20'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRY20'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRY20'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRY30': {
    nuts: 'FRY30',
    name: "Guyane française (Cayenne)",
    modernName: "Guyane française (973, Cayenne / Sudamerica)",
    historicalName: "Guyane française (Cayenne) (Cayenne - Outre-Mer (Sudamerica))",
    cheflieu: "Cayenne",
    region: "Outre-Mer (Sudamerica)",
    deptNum: '973',
    partition1940: 'dom_tom',
    armisticeName: "Guyane française (Cayenne)",
    repAdminTitle: "Colonie de la Guyane française — Chef-lieu Cayenne",
    armisticeAdminTitle: "Colonie de la Guyane française — Gouverneur René Veber (Vichy)",
    keys: ["guyane", "french_guiana", "cayenne", "saint_laurent_du_maroni"],
    s0_1: "Colonia della Guyane française (Cayenne). Territorio d'oltremare sulla costa settentrionale dell'America del Sud: Cayenne ne custodisce la capitale coloniale, mentre lungo il litorale e le Îles du Salut opera il famigerato Bagno penale (Bagne de Cayenne), colonia carceraria della Repubblica.",
    s2_4: "Dipartimento d'Oltremare della Guyane française. 1938-1939: il governo del Fronte Popolare guidato da Léon Blum abolisce con decreto-legge del 1938 la deportazione al Bagne, avviando il lungo processo di liquidazione del sistema penitenziario coloniale.",
    s5: "Colonia della Guyane française. Settembre 1939 - maggio 1940: isolamento geografico oceanico; la colonia contribuisce con legnami pregiati e minerali allo sforzo alleato.",
    s6: "Colonia della Guyane française. Giugno-luglio 1940: dopo l'armistizio, il governatore coloniale Jean-Baptiste Chot riconosce il governo di Vichy; la Guiana resta isolata dalle comunicazioni marittime con la madrepatria.",
    s7: "Colonia della Guyane française. Ottobre 1940: amministrazione coloniale di Vichy in costante difficoltà economica e dipendenza dalle forniture dal vicino Brasile e dalle colonie olandesi e britanniche della Guyana.",
    s8: "Colonia della Guyane française. Aprile 1941: grave penuria di beni e isolamento; il sentimento della popolazione locale è largamente favorevole alla causa alleata e della Francia Libera, in attesa della liberazione del territorio.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRY30'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRY30'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRY30'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRY30'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRY30'].s2_4;
      return FRANCE_PROVINCES_META['FRY30'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRY30'].name;
      return FRANCE_PROVINCES_META['FRY30'].armisticeName || FRANCE_PROVINCES_META['FRY30'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRY30'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRY30'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'F_COL';
      }
      return 'F_COL';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Alleati' as FactionType;
    },
  },
  'FRY40': {
    nuts: 'FRY40',
    name: "La Réunion (Saint-Denis)",
    modernName: "La Réunion (974, Saint-Denis / Oceano Indiano)",
    historicalName: "La Réunion (Saint-Denis) (La Réunion - Outre-Mer (Oceano Indiano))",
    cheflieu: "La Réunion",
    region: "Outre-Mer (Oceano Indiano)",
    deptNum: '974',
    partition1940: 'dom_tom',
    armisticeName: "La Réunion (Saint-Denis)",
    repAdminTitle: "Troisième République française — Colonie de La Réunion (Saint-Denis)",
    armisticeAdminTitle: "Administration coloniale de l\\",
    keys: ["la_reunion", "reunion", "saint_denis_reunion"],
    s0_1: "Dipartimento d'Oltremare de La Réunion (Saint-Denis). Isola vulcanica dell'Oceano Indiano nell'arcipelago delle Mascarene: Saint-Denis ne è il capoluogo, con un'economia dominata dalle grandi piantagioni di canna da zucchero, vaniglia e distillerie di rum.",
    s2_4: "Dipartimento d'Oltremare de La Réunion. 1938-1939: lavori di ammodernamento del porto di Pointe des Galets e delle infrastrutture ferroviarie costiere a scartamento ridotto.",
    s5: "Dipartimento d'Oltremare de La Réunion. Settembre 1939 - maggio 1940: mobilitazione dei volontari creoli imbarcati verso la Francia; naviglio mercantile impegnato nei convogli imperiali verso il Canale di Suez.",
    s6: "Dipartimento d'Oltremare de La Réunion. Giugno-luglio 1940: il governatore Pierre Émile Aubert proclama la fedeltà al governo del maresciallo Pétain a Vichy; l'isola entra nell'orbita dell'amministrazione coloniale collaborazionista.",
    s7: "Dipartimento d'Oltremare de La Réunion. Ottobre 1940: la Royal Navy britannica istituisce un rigoroso blocco marittimo attorno all'isola per impedire comunicazioni e rifornimenti all'Asse; interruzione quasi totale delle esportazioni di zucchero.",
    s8: "Dipartimento d'Oltremare de La Réunion. Aprile 1941: severo razionamento di farina, tessuti e medicinali; nascita dei primi comitati clandestini patriottici creoli a favore delle Forces Françaises Libres di De Gaulle.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRY40'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRY40'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRY40'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRY40'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRY40'].s2_4;
      return FRANCE_PROVINCES_META['FRY40'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRY40'].name;
      return FRANCE_PROVINCES_META['FRY40'].armisticeName || FRANCE_PROVINCES_META['FRY40'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRY40'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRY40'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
  'FRY50': {
    nuts: 'FRY50',
    name: "Mayotte (Dzaoudzi)",
    modernName: "Mayotte (976, Mamoudzou / Oceano Indiano)",
    historicalName: "Mayotte (Dzaoudzi) (Dzaoudzi - Outre-Mer (Oceano Indiano))",
    cheflieu: "Dzaoudzi",
    region: "Outre-Mer (Oceano Indiano)",
    deptNum: '976',
    partition1940: 'dom_tom',
    armisticeName: "Mayotte (Dzaoudzi)",
    repAdminTitle: "Troisième République française — Colonie de Madagascar et dépendances (Mayotte)",
    armisticeAdminTitle: "Administration coloniale de l\\",
    keys: ["mayotte", "dzaoudzi", "mamoudzou"],
    s0_1: "Territorio d'Oltremare di Mayotte (Dzaoudzi / Mamoudzou). Isola dell'arcipelago delle Comore nel Canale di Mozambico: Dzaoudzi è la capitale storica situata sull'isolotto di Pamanzi, scalo marittimo e colonia agricola di vaniglia e profumi.",
    s2_4: "Territorio d'Oltremare di Mayotte. 1938-1939: Mayotte funge da snodo amministrativo tra il Madagascar e la costa orientale africana, assicurando il controllo delle rotte marittime verso l'Oceano Indiano.",
    s5: "Territorio d'Oltremare di Mayotte. Settembre 1939 - maggio 1940: pattugliamento delle acque del Canale di Mozambico e mobilitazione delle riserve coloniali.",
    s6: "Territorio d'Oltremare di Mayotte. Giugno-luglio 1940: in sintonia col governo generale del Madagascar (governatore Annet), Mayotte resta sotto la sovranità del regime di Vichy.",
    s7: "Territorio d'Oltremare di Mayotte. Ottobre 1940: isolamento marittimo causato dal controllo navale della Royal Navy lungo la costa dell'Africa orientale; mantenimento dell'ordine coloniale di Vichy.",
    s8: "Territorio d'Oltremare di Mayotte. Aprile 1941: penuria di manufatti industriali e stretto controllo del Canale di Mozambico da parte delle forze navali del Commonwealth britannico.",
    getNote: (s: number) => {
      if (s >= 8) return FRANCE_PROVINCES_META['FRY50'].s8;
      if (s >= 7) return FRANCE_PROVINCES_META['FRY50'].s7;
      if (s >= 6) return FRANCE_PROVINCES_META['FRY50'].s6;
      if (s >= 5) return FRANCE_PROVINCES_META['FRY50'].s5;
      if (s >= 2) return FRANCE_PROVINCES_META['FRY50'].s2_4;
      return FRANCE_PROVINCES_META['FRY50'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRY50'].name;
      return FRANCE_PROVINCES_META['FRY50'].armisticeName || FRANCE_PROVINCES_META['FRY50'].name;
    },
    getAdminTitle: (s: number) => {
      if (s < 6) return FRANCE_PROVINCES_META['FRY50'].repAdminTitle || 'Troisième République française';
      return FRANCE_PROVINCES_META['FRY50'].armisticeAdminTitle || 'État français';
    },
    getSovereign: (s: number) => {
      if (s < 6) {
        return 'FRA';
      }
      return 'VIC';
    },
    getFaction: (s: number) => {
      if (s < 6) return 'Alleati' as FactionType;
      return 'Fantoccio' as FactionType;
    },
  },
};

/**
 * Risolve una provincia/dipartimento della Francia metropolitana o d'oltremare per uno specifico timeline step.
 */
export function resolveFranceProvince(
  idOrKey: string,
  s: number = 0,
  rawName?: string
): ResolvedTerritory | null {
  const cleanId = String(idOrKey || '').trim().toUpperCase();
  let meta = FRANCE_PROVINCES_META[cleanId];

  if (!meta) {
    const rawClean = String(rawName || idOrKey || '').trim();
    const norm = rawClean.toLowerCase().replace(/[^a-z0-9]/g, '_');
    for (const item of Object.values(FRANCE_PROVINCES_META)) {
      if (item.nuts.toLowerCase() === norm || item.keys.includes(norm)) {
        meta = item;
        break;
      }
    }
    if (!meta) {
      for (const item of Object.values(FRANCE_PROVINCES_META)) {
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
 * Popola il dizionario toponomastico storico con le 101 entità dipartimentali della Francia.
 */
export function populateFranceToponyms(dict: Record<string, any>): void {
  if (!dict['FRA']) dict['FRA'] = {};
  if (!dict['VIC']) dict['VIC'] = {};
  if (!dict['GER']) dict['GER'] = {};

  for (const [key, item] of Object.entries(FRANCE_PROVINCES_META)) {
    const match = {
      historicalName: item.historicalName,
      adminTitle: item.repAdminTitle,
      historicalNote: item.s0_1,
      name: item.name,
      modernName: item.modernName,
      cheflieu: item.cheflieu,
      region: item.region,
      deptNum: item.deptNum,
      note: item.s0_1,
    };

    const normName = item.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const lowId = item.nuts.toLowerCase().replace(/[^a-z0-9]/g, '_');

    dict['FRA'][normName] = match;
    dict['FRA'][lowId] = match;
    dict[lowId] = match;
    dict[normName] = match;

    for (const k of item.keys) {
      dict['FRA'][k] = match;
      dict[k] = match;
    }
  }
}
