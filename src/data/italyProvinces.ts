/**
 * Censimento Geocartografico e Toponomastico delle Province del Regno d'Italia e Possedimenti Speciali (1936-1941)
 * Copertura esaustiva e rigorosa di tutte le 107 province metropolitane (NUTS-3) piu 8 territori storici e possedimenti (115 entita totali).
 *
 * Timeline Storica (Step 0 - 8):
 * - Step 0-1 (1936 - mar 1938): Guerra d'Etiopia e proclamazione dell'Impero a Piazza Venezia (9 maggio 1936, Vittorio Emanuele III Imperatore d'Etiopia).
 *   Sanzioni economiche della Societa delle Nazioni e varo della politica dell'Autarchia fascista: "Oro alla Patria", battaglia del grano, succedanei,
 *   bonifiche integrali dell'Agro Pontino (fondazione di Littoria, Sabaudia, Pontinia, Aprilia, Pomezia) e del Sulcis (Carbonia).
 *   Intervento nella Guerra Civile Spagnola con il Corpo Truppe Volontarie (CTV); asse Roma-Berlino e patto Anticomintern.
 * - Step 2-4 (ott 1938 - apr 1939): Accordi di Monaco (settembre 1938) con Mussolini mediatore; promulgazione delle leggi razziali antisemite (autunno 1938).
 *   Invasione e annessione del Regno d'Albania (aprile 1939, Unione Personale con la Corona Sabauda). Firma del Patto d'Acciaio con il Terzo Reich (maggio 1939)
 *   con il promemoria Cavallero che avvertiva sull'impreparazione militare italiana fino al 1943.
 * - Step 5 (set 1939 - mag 1940): 1 settembre 1939: scoppio della seconda guerra mondiale. L'Italia dichiara la "non belligeranza".
 *   Tensioni interne al regime (Ciano, Grandi, Badoglio); tessere annonarie e inizio del razionamento dei combustibili e alimenti.
 *   Lavori di fortificazione del Vallo Alpino Littorio lungo l'arco alpino e cantieri monumentali dell'E42 a Roma (EUR).
 * - Step 6 (giu - ago 1940): 10 giugno 1940: Benito Mussolini dichiara guerra a Francia e Gran Bretagna dal balcone di Palazzo Venezia.
 *   Battaglia delle Alpi Occidentali contro l'Armee des Alpes del generale Olry; Armistizio di Villa Incisa (24 giugno 1940) con occupazione di Mentone.
 *   9 luglio 1940: Battaglia navale di Punta Stilo nelle acque joniche calabresi; primi bombardamenti aerei della RAF su Torino, Genova e Milano.
 * - Step 7 (ott 1940): 28 ottobre 1940: sciagurata invasione della Grecia dall'Albania ("Spezzeremo le reni alla Grecia"); pantano ed eroismo
 *   della Divisione Alpina Julia sul Pindo; violenta controffensiva greca che rigetta gli italiani in territorio albanese; dimissioni di Badoglio
 *   da Capo di Stato Maggiore Generale (sostituito da Ugo Cavallero). Notte di Taranto (11-12 novembre 1940): aerosiluranti Fairey Swordfish
 *   britannici affondano la corazzata Cavour e danneggiano gravemente Littorio e Duilio.
 * - Step 8 (apr 1941): Crisi delle armate in Cirenaica (Operazione Compass britannica con caduta di Bardia e Tobruk) tamponata dall'arrivo
 *   a Tripoli di Erwin Rommel e del Deutsches Afrikakorps (DAK). 28-29 marzo 1941: disastro navale di Capo Matapan con l'affondamento di tre
 *   incrociatori pesanti (Zara, Pola, Fiume). 6 aprile 1941: invasione della Jugoslavia da parte dell'Asse con la 2a Armata di Ambrosio; annessione
 *   di Lubiana e nascita del Governatorato di Dalmazia. Caduta di Addis Abeba (6 aprile 1941) e crollo dell'Africa Orientale Italiana (AOI).
 */

import { ResolvedTerritory, FactionType } from '../types';

function makeResult(
  o: string,
  name: string,
  note?: string,
  fac: FactionType = 'Asse',
  adminEntity?: string
): ResolvedTerritory {
  return {
    o: 'ITA',
    name,
    note,
    fac,
    adminEntity: adminEntity || "Regno d'Italia"
  };
}

export interface ItalyProvinceInfo {
  nuts: string;
  name: string;
  modernName: string;
  historicalName: string;
  region: string;
  capital?: string;
  keys: string[];
  s0_1: string;
  s2_4: string;
  s5: string;
  s6: string;
  s7: string;
  s8: string;
  getNote: (step: number) => string;
  getHistoricalName: (step: number) => string;
  getAdminTitle: (step: number) => string;
  getSovereign: (step: number) => string;
  getFaction: (step: number) => FactionType;
}

export const IT_PROVINCES_META: Record<string, ItalyProvinceInfo> = {

  "ITC11": {
    nuts: "ITC11",
    name: "Provincia di Torino",
    modernName: "Torino (TO, Piemonte)",
    historicalName: "Provincia di Torino",
    region: "Piemonte",
    keys: ["itc11", "piemonte", "provincia_di_torino", "torino", "torino_to_piemonte", "turin"],
    s0_1: "Capitale dell'industria automobilistica, aeronautica e meccanica pesante italiana: stabilimenti FIAT del Lingotto e avvio della costruzione della grandiosa fabbrica di Mirafiori (inaugurata nel maggio 1939 da Mussolini), officine Lancia, arsenali militari e produzione di caccia FIAT CR.42 Falco e G.50 Freccia.",
    s2_4: "Inaugurazione di FIAT Mirafiori alla presenza di Mussolini tra il silenzio glaciale degli operai; accelerazione della produzione di autocarri coloniali (FIAT 626/666), motori d'aviazione A.74 e carri leggeri L3 per il riarmo dell'esercito.",
    s5: "Proclamazione della non belligeranza; Torino opera a pieno ritmo per accumulare scorte di materie prime industriali e veicoli militari; scavo di imponenti rifugi antiaerei sotterranei sotto piazza San Carlo e piazza Risorgimento.",
    s6: "11-12 giugno 1940: a sole 24 ore dall'entrata in guerra, Torino subisce il primo bombardamento aereo della RAF (Operazione Haddock) con bombardieri Whitley decollati dalla Gran Bretagna; mobilitazione dei battaglioni piemontesi nella Battaglia delle Alpi Occidentali.",
    s7: "Frequenti incursioni notturne della RAF sul Lingotto, Mirafiori e la ferrovia; operai e maestranze specializzate lavorano sotto continuo oscuramento per sfornare motori d'aereo, carri medi M13/40 e munizionamento.",
    s8: "La produzione bellica tocca il massimo sforzo per rifornire le divisioni corazzate e motorizzate in partenza per la Libia e il fronte greco; crescente malcontento operaio per il carovita e le razioni ridotte.",
    getNote: (step: number) => {
      if (step <= 1) return "Capitale dell'industria automobilistica, aeronautica e meccanica pesante italiana: stabilimenti FIAT del Lingotto e avvio della costruzione della grandiosa fabbrica di Mirafiori (inaugurata nel maggio 1939 da Mussolini), officine Lancia, arsenali militari e produzione di caccia FIAT CR.42 Falco e G.50 Freccia.";
      if (step <= 4) return "Inaugurazione di FIAT Mirafiori alla presenza di Mussolini tra il silenzio glaciale degli operai; accelerazione della produzione di autocarri coloniali (FIAT 626/666), motori d'aviazione A.74 e carri leggeri L3 per il riarmo dell'esercito.";
      if (step === 5) return "Proclamazione della non belligeranza; Torino opera a pieno ritmo per accumulare scorte di materie prime industriali e veicoli militari; scavo di imponenti rifugi antiaerei sotterranei sotto piazza San Carlo e piazza Risorgimento.";
      if (step === 6) return "11-12 giugno 1940: a sole 24 ore dall'entrata in guerra, Torino subisce il primo bombardamento aereo della RAF (Operazione Haddock) con bombardieri Whitley decollati dalla Gran Bretagna; mobilitazione dei battaglioni piemontesi nella Battaglia delle Alpi Occidentali.";
      if (step === 7) return "Frequenti incursioni notturne della RAF sul Lingotto, Mirafiori e la ferrovia; operai e maestranze specializzate lavorano sotto continuo oscuramento per sfornare motori d'aereo, carri medi M13/40 e munizionamento.";
      return "La produzione bellica tocca il massimo sforzo per rifornire le divisioni corazzate e motorizzate in partenza per la Libia e il fronte greco; crescente malcontento operaio per il carovita e le razioni ridotte.";
    },
    getHistoricalName: (_step: number) => "Provincia di Torino",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Torino",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC12": {
    nuts: "ITC12",
    name: "Provincia di Vercelli",
    modernName: "Vercelli (VC, Piemonte)",
    historicalName: "Provincia di Vercelli",
    region: "Piemonte",
    keys: ["itc12", "provincia_di_vercelli", "sesia", "vercelli", "vercelli_vc_piemonte"],
    s0_1: "Capitale storica della risicoltura europea tra il Po e il Sesia, perno fondamentale dell'alimentazione autarchica nazionale; la bonifica delle Baragge vercellesi e l'Ente Nazionale Risi regolano la produzione cerealicola.",
    s2_4: "Massiccia mobilitazione stagionale delle mondine per la monda del riso; Vercelli snodo ferroviario strategico tra Torino e Milano per il transito delle truppe.",
    s5: "Il riso vercellese viene dichiarato derrata strategica di stato per le razioni dell'esercito e per la popolazione civile soggetta al tesseramento annonario.",
    s6: "I giovani vercellesi partono con i reggimenti di fanteria e alpini per il fronte occidentale alpino; ammasso obbligatorio dell'intero raccolto risicolo nei granai statali.",
    s7: "Pieno apporto agricolo alla nazione razionata; le cascine della pianura accolgono famiglie di sfollati torinesi e milanesi scampati ai bombardamenti britannici.",
    s8: "Aumento delle quote di consegna cerealicola e rigido controllo annonario contro il mercato nero; addestramento reclute nelle caserme della cavalleria vercellese.",
    getNote: (step: number) => {
      if (step <= 1) return "Capitale storica della risicoltura europea tra il Po e il Sesia, perno fondamentale dell'alimentazione autarchica nazionale; la bonifica delle Baragge vercellesi e l'Ente Nazionale Risi regolano la produzione cerealicola.";
      if (step <= 4) return "Massiccia mobilitazione stagionale delle mondine per la monda del riso; Vercelli snodo ferroviario strategico tra Torino e Milano per il transito delle truppe.";
      if (step === 5) return "Il riso vercellese viene dichiarato derrata strategica di stato per le razioni dell'esercito e per la popolazione civile soggetta al tesseramento annonario.";
      if (step === 6) return "I giovani vercellesi partono con i reggimenti di fanteria e alpini per il fronte occidentale alpino; ammasso obbligatorio dell'intero raccolto risicolo nei granai statali.";
      if (step === 7) return "Pieno apporto agricolo alla nazione razionata; le cascine della pianura accolgono famiglie di sfollati torinesi e milanesi scampati ai bombardamenti britannici.";
      return "Aumento delle quote di consegna cerealicola e rigido controllo annonario contro il mercato nero; addestramento reclute nelle caserme della cavalleria vercellese.";
    },
    getHistoricalName: (_step: number) => "Provincia di Vercelli",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Vercelli",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC13": {
    nuts: "ITC13",
    name: "Biella (Provincia di Vercelli)",
    modernName: "Biella (BI, Piemonte)",
    historicalName: "Biella (Provincia di Vercelli)",
    region: "Piemonte",
    keys: ["biella", "biella_bi_piemonte", "biella_provincia_di_vercelli", "biella_vercelli", "cervo", "itc13"],
    s0_1: "Capitale italiana ed europea della filatura e tessitura della lana lungo le valli del Cervo e dello Strona (Lanifici Zegna, Cerruti, Piacenza); aggregata alla Provincia di Vercelli.",
    s2_4: "Ermenegildo Zegna promuove la valorizzazione della Panoramica Zegna e il rimboschimento montano; i lanifici biellesi sviluppano tessuti autarchici misti a fibre sintetiche (Lanital alla caseina e fiocco di rayon).",
    s5: "I lanifici lavorano a ciclo continuo su commesse statali per fornire panni grigio-verde per le uniformi del Regio Esercito, coperte pesanti da campo e tele per paracadute.",
    s6: "Fornitura massiccia di divise per milioni di mobilitati; i valligiani biellesi si arruolano in massa nei battaglioni alpini del Reggimento 'Intra' e 'Aosta'.",
    s7: "La produzione tessile biellese garantisce l'equipaggiamento termico per i soldati inviati sui fronti gelidi dell'Epiro e del Pindo durante la Campagna di Grecia.",
    s8: "Difficoltà crescente di approvvigionamento di lana grezza importata d'oltremare; i tecnici biellesi perfezionano la rigenerazione della lana e l'uso di fibre artificiali SNIA.",
    getNote: (step: number) => {
      if (step <= 1) return "Capitale italiana ed europea della filatura e tessitura della lana lungo le valli del Cervo e dello Strona (Lanifici Zegna, Cerruti, Piacenza); aggregata alla Provincia di Vercelli.";
      if (step <= 4) return "Ermenegildo Zegna promuove la valorizzazione della Panoramica Zegna e il rimboschimento montano; i lanifici biellesi sviluppano tessuti autarchici misti a fibre sintetiche (Lanital alla caseina e fiocco di rayon).";
      if (step === 5) return "I lanifici lavorano a ciclo continuo su commesse statali per fornire panni grigio-verde per le uniformi del Regio Esercito, coperte pesanti da campo e tele per paracadute.";
      if (step === 6) return "Fornitura massiccia di divise per milioni di mobilitati; i valligiani biellesi si arruolano in massa nei battaglioni alpini del Reggimento 'Intra' e 'Aosta'.";
      if (step === 7) return "La produzione tessile biellese garantisce l'equipaggiamento termico per i soldati inviati sui fronti gelidi dell'Epiro e del Pindo durante la Campagna di Grecia.";
      return "Difficoltà crescente di approvvigionamento di lana grezza importata d'oltremare; i tecnici biellesi perfezionano la rigenerazione della lana e l'uso di fibre artificiali SNIA.";
    },
    getHistoricalName: (_step: number) => "Biella (Provincia di Vercelli)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Circondario di Biella (Provincia di Vercelli)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC14": {
    nuts: "ITC14",
    name: "Verbania e Ossola (Provincia di Novara)",
    modernName: "Verbano-Cusio-Ossola (VB, Piemonte)",
    historicalName: "Verbania e Ossola (Provincia di Novara)",
    region: "Piemonte",
    keys: ["cusio", "domodossola", "intra", "itc14", "ossola", "pallanza", "verbania", "verbania_e_ossola_novara", "verbania_e_ossola_provincia_di_novara", "verbano", "verbano_cusio_ossola", "verbano_cusio_ossola_vb_piemonte"],
    s0_1: "Distretto montano e lacustre del Lago Maggiore e della Val d'Ossola, unificato nel 1939 con l'istituzione del comune di Verbania (dall'unione di Intra e Pallanza); snodo ferroviario internazionale del Sempione a Domodossola.",
    s2_4: "Le colossali centrali idroelettriche della Val Formazza e dell'alta Val d'Ossola forniscono energia rinnovabile vitale a tutta la rete industriale piemontese e lombarda.",
    s5: "Domodossola e il traforo del Sempione vengono posti sotto stretta sorveglianza militare congiunta con la Svizzera neutrale; presidio alpino della frontiera.",
    s6: "Alpini dell'Ossola impegnati nella Battaglia delle Alpi; le fabbriche metalmeccaniche di Verbania e Omegna (Paluello, Bialetti) convertono lavorazioni all'alluminio bellico.",
    s7: "Domodossola snodo di transito per convogli merci e carbone attraverso la neutrale Svizzera; rifugio tranquillo per sfollati lombardi attorno alle rive del Verbano.",
    s8: "La fornitura idroelettrica ossolana si conferma risorsa energetica insostituibile mentre il blocco navale alleato taglia le importazioni marittime di carbone.",
    getNote: (step: number) => {
      if (step <= 1) return "Distretto montano e lacustre del Lago Maggiore e della Val d'Ossola, unificato nel 1939 con l'istituzione del comune di Verbania (dall'unione di Intra e Pallanza); snodo ferroviario internazionale del Sempione a Domodossola.";
      if (step <= 4) return "Le colossali centrali idroelettriche della Val Formazza e dell'alta Val d'Ossola forniscono energia rinnovabile vitale a tutta la rete industriale piemontese e lombarda.";
      if (step === 5) return "Domodossola e il traforo del Sempione vengono posti sotto stretta sorveglianza militare congiunta con la Svizzera neutrale; presidio alpino della frontiera.";
      if (step === 6) return "Alpini dell'Ossola impegnati nella Battaglia delle Alpi; le fabbriche metalmeccaniche di Verbania e Omegna (Paluello, Bialetti) convertono lavorazioni all'alluminio bellico.";
      if (step === 7) return "Domodossola snodo di transito per convogli merci e carbone attraverso la neutrale Svizzera; rifugio tranquillo per sfollati lombardi attorno alle rive del Verbano.";
      return "La fornitura idroelettrica ossolana si conferma risorsa energetica insostituibile mentre il blocco navale alleato taglia le importazioni marittime di carbone.";
    },
    getHistoricalName: (_step: number) => "Verbania e Ossola (Provincia di Novara)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Mandamenti di Verbania, Domodossola e Cusio (Provincia di Novara)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC15": {
    nuts: "ITC15",
    name: "Provincia di Novara",
    modernName: "Novara (NO, Piemonte)",
    historicalName: "Provincia di Novara",
    region: "Piemonte",
    keys: ["itc15", "novara", "novara_no_piemonte", "provincia_di_novara", "ticino"],
    s0_1: "Pianura risicola tra Ticino e Sesia, nodo ferroviario cardine e polo industriale chimico e aeronautico presso l'aeroporto militare di Cameri.",
    s2_4: "L'aeroporto militare di Cameri diviene un polo d'eccellenza per il montaggio e collaudo di velivoli militari per la Regia Aeronautica; ampliamento degli stabilimenti chimici Montecatini.",
    s5: "Produzione intensiva di grano, riso e concimi azotati; Cameri addestra piloti da caccia e collauda ricognitori e bombardieri leggeri.",
    s6: "I caccia decollati da Cameri partecipano alle coperture diurne sul Piemonte contro i bombardieri francesi e britannici; mobilitazione delle maestranze novaresi.",
    s7: "Novara snodo cruciale per il rifornimento dei treni militari verso il Brennero e la Liguria; accoglienza di sfollati milanesi nelle cascine del territorio.",
    s8: "Cameri produce componenti e manutiene trimotori da trasporto Savoia-Marchetti SM.75 e bombardieri SM.79 Sparviero per i fronti del Mediterraneo.",
    getNote: (step: number) => {
      if (step <= 1) return "Pianura risicola tra Ticino e Sesia, nodo ferroviario cardine e polo industriale chimico e aeronautico presso l'aeroporto militare di Cameri.";
      if (step <= 4) return "L'aeroporto militare di Cameri diviene un polo d'eccellenza per il montaggio e collaudo di velivoli militari per la Regia Aeronautica; ampliamento degli stabilimenti chimici Montecatini.";
      if (step === 5) return "Produzione intensiva di grano, riso e concimi azotati; Cameri addestra piloti da caccia e collauda ricognitori e bombardieri leggeri.";
      if (step === 6) return "I caccia decollati da Cameri partecipano alle coperture diurne sul Piemonte contro i bombardieri francesi e britannici; mobilitazione delle maestranze novaresi.";
      if (step === 7) return "Novara snodo cruciale per il rifornimento dei treni militari verso il Brennero e la Liguria; accoglienza di sfollati milanesi nelle cascine del territorio.";
      return "Cameri produce componenti e manutiene trimotori da trasporto Savoia-Marchetti SM.75 e bombardieri SM.79 Sparviero per i fronti del Mediterraneo.";
    },
    getHistoricalName: (_step: number) => "Provincia di Novara",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Novara",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC16": {
    nuts: "ITC16",
    name: "Provincia di Cuneo",
    modernName: "Cuneo (CN, Piemonte)",
    historicalName: "Provincia di Cuneo",
    region: "Piemonte",
    keys: ["alba", "cuneo", "cuneo_cn_piemonte", "itc16", "mondovi", "provincia_di_cuneo", "saluzzo"],
    s0_1: "La celebre 'Provincia Granda', terra di forte tradizione contadina e militare sede del 2° Reggimento Alpini e della gloriosa 4ª Divisione alpina 'Cuneense'; valichi del Tenda e della Maddalena.",
    s2_4: "Costruzione intensiva di opere corazzate, caverne e casematte del Vallo Alpino lungo la frontiera delle Alpi Marittime e Cozie di fronte alla Linea Maginot alpina francese.",
    s5: "Radunata di oltre 150.000 fanti e alpini nelle valli cuneesi (Maira, Stura, Gesso, Vermenagna); oscuramento rigoroso dei centri urbani e fortificazione dei passi.",
    s6: "Giugno 1940: le truppe della 1ª e 4ª Armata italiana sferrano l'offensiva contro le posizioni francesi attraverso il Colle della Maddalena e il Piccolo San Bernardo nella Battaglia delle Alpi Occidentali.",
    s7: "La 'Cuneense' viene riorganizzata e preparata per nuovi teatri; le vallate alpine cuneesi ospitano i depositi logistici della frontiera smilitarizzata italo-francese.",
    s8: "I battaglioni alpini della 'Cuneense' (Borgo San Dalmazzo, Dronero, Saluzzo) ricevono l'ordine di trasferimento sul tragico fronte montano greco-albanese, dove scriveranno pagine di immenso eroismo.",
    getNote: (step: number) => {
      if (step <= 1) return "La celebre 'Provincia Granda', terra di forte tradizione contadina e militare sede del 2° Reggimento Alpini e della gloriosa 4ª Divisione alpina 'Cuneense'; valichi del Tenda e della Maddalena.";
      if (step <= 4) return "Costruzione intensiva di opere corazzate, caverne e casematte del Vallo Alpino lungo la frontiera delle Alpi Marittime e Cozie di fronte alla Linea Maginot alpina francese.";
      if (step === 5) return "Radunata di oltre 150.000 fanti e alpini nelle valli cuneesi (Maira, Stura, Gesso, Vermenagna); oscuramento rigoroso dei centri urbani e fortificazione dei passi.";
      if (step === 6) return "Giugno 1940: le truppe della 1ª e 4ª Armata italiana sferrano l'offensiva contro le posizioni francesi attraverso il Colle della Maddalena e il Piccolo San Bernardo nella Battaglia delle Alpi Occidentali.";
      if (step === 7) return "La 'Cuneense' viene riorganizzata e preparata per nuovi teatri; le vallate alpine cuneesi ospitano i depositi logistici della frontiera smilitarizzata italo-francese.";
      return "I battaglioni alpini della 'Cuneense' (Borgo San Dalmazzo, Dronero, Saluzzo) ricevono l'ordine di trasferimento sul tragico fronte montano greco-albanese, dove scriveranno pagine di immenso eroismo.";
    },
    getHistoricalName: (_step: number) => "Provincia di Cuneo",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Cuneo (Provincia Granda)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC17": {
    nuts: "ITC17",
    name: "Provincia di Asti",
    modernName: "Asti (AT, Piemonte)",
    historicalName: "Provincia di Asti",
    region: "Piemonte",
    keys: ["asti", "asti_at_piemonte", "itc17", "monferrato", "provincia_di_asti"],
    s0_1: "Istituita come provincia autonoma nel 1935 (scorporata da Alessandria), celebre per i vigneti del Monferrato, il vino e l'industria meccanica di precisione Way Assauto.",
    s2_4: "Way Assauto a pieno regime nella fornitura di ammortizzatori, valvole e componentistica di precisione per tutta l'industria automobilistica militare torinese e milanese.",
    s5: "La produzione vitivinicola e orticola astigiana sostiene il fabbisogno nutrizionale delle metropoli industriali razionate; scavo di trincee paraschegge nei borghi collinari.",
    s6: "Reclutamento dei fanti monferrini per la guerra; Way Assauto fornisce pezzi meccanici per i carri armati della serie M e autocarri coloniali.",
    s7: "Le colline del Monferrato divengono rifugio sicuro per migliaia di famiglie torinesi sfollate dai bombardamenti pesanti della RAF; mercati agricoli sotto controllo annonario.",
    s8: "Produzione ininterrotta di componentistica idraulica per l'esercito; forte coesione delle comunità rurali astigiane nell'affrontare le privazioni del razionamento.",
    getNote: (step: number) => {
      if (step <= 1) return "Istituita come provincia autonoma nel 1935 (scorporata da Alessandria), celebre per i vigneti del Monferrato, il vino e l'industria meccanica di precisione Way Assauto.";
      if (step <= 4) return "Way Assauto a pieno regime nella fornitura di ammortizzatori, valvole e componentistica di precisione per tutta l'industria automobilistica militare torinese e milanese.";
      if (step === 5) return "La produzione vitivinicola e orticola astigiana sostiene il fabbisogno nutrizionale delle metropoli industriali razionate; scavo di trincee paraschegge nei borghi collinari.";
      if (step === 6) return "Reclutamento dei fanti monferrini per la guerra; Way Assauto fornisce pezzi meccanici per i carri armati della serie M e autocarri coloniali.";
      if (step === 7) return "Le colline del Monferrato divengono rifugio sicuro per migliaia di famiglie torinesi sfollate dai bombardamenti pesanti della RAF; mercati agricoli sotto controllo annonario.";
      return "Produzione ininterrotta di componentistica idraulica per l'esercito; forte coesione delle comunità rurali astigiane nell'affrontare le privazioni del razionamento.";
    },
    getHistoricalName: (_step: number) => "Provincia di Asti",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Asti",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC18": {
    nuts: "ITC18",
    name: "Provincia di Alessandria",
    modernName: "Alessandria (AL, Piemonte)",
    historicalName: "Provincia di Alessandria",
    region: "Piemonte",
    keys: ["acqui", "alessandria", "alessandria_al_piemonte", "casale_monferrato", "itc18", "novi_ligure", "provincia_di_alessandria", "tortona"],
    s0_1: "Grande centro di guarnigione attorno alla monumentale Cittadella militare settecentesca sul Tanaro, sede della famosa fabbrica di cappelli Borsalino e polo orafo di Valenza.",
    s2_4: "Lo snodo ferroviario di Novi Ligure e Tortona viene potenziato per collegare rapidamente Genova con Torino e Milano; Borsalino confeziona berretti e feltri per divise militari.",
    s5: "La Cittadella di Alessandria diviene centro primario di mobilitazione, addestramento reclute e deposito munizioni per il Corpo d'Armata territoriale.",
    s6: "Transito continuo di convogli truppe verso la Liguria e il fronte francese; Casale Monferrato converte la produzione di cemento per fortificazioni difensive.",
    s7: "Alessandria subisce i primi allarmi aerei britannici mirati allo scalo ferroviario e ai ponti sul Tanaro e sul Bormida; la Borsalino produce feltri speciali per l'aviazione.",
    s8: "Snodo strategico insostituibile per le comunicazioni tra il triangolo industriale e i porti liguri; produzione di concimi e cemento per le opere belliche.",
    getNote: (step: number) => {
      if (step <= 1) return "Grande centro di guarnigione attorno alla monumentale Cittadella militare settecentesca sul Tanaro, sede della famosa fabbrica di cappelli Borsalino e polo orafo di Valenza.";
      if (step <= 4) return "Lo snodo ferroviario di Novi Ligure e Tortona viene potenziato per collegare rapidamente Genova con Torino e Milano; Borsalino confeziona berretti e feltri per divise militari.";
      if (step === 5) return "La Cittadella di Alessandria diviene centro primario di mobilitazione, addestramento reclute e deposito munizioni per il Corpo d'Armata territoriale.";
      if (step === 6) return "Transito continuo di convogli truppe verso la Liguria e il fronte francese; Casale Monferrato converte la produzione di cemento per fortificazioni difensive.";
      if (step === 7) return "Alessandria subisce i primi allarmi aerei britannici mirati allo scalo ferroviario e ai ponti sul Tanaro e sul Bormida; la Borsalino produce feltri speciali per l'aviazione.";
      return "Snodo strategico insostituibile per le comunicazioni tra il triangolo industriale e i porti liguri; produzione di concimi e cemento per le opere belliche.";
    },
    getHistoricalName: (_step: number) => "Provincia di Alessandria",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Alessandria",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC20": {
    nuts: "ITC20",
    name: "Provincia di Aosta",
    modernName: "Valle d'Aosta / Vallée d'Aoste (AO)",
    historicalName: "Provincia di Aosta",
    region: "Piemonte / Valle d'Aosta",
    keys: ["aosta", "itc20", "provincia_di_aosta", "valle_d_aosta", "valle_d_aosta__valle_d_aoste_ao", "valle_d_aoste_ao", "valle_daosta", "vallee_d_aoste", "vallee_daoste"],
    s0_1: "Provincia istituita nel 1927 comprendente la Valle d'Aosta e il circondario piemontese di Ivrea e Canavese; grandioso polo metallurgico della Cogne (miniere di magnetite di Cogne e forni elettrici ad Aosta per acciai speciali) e Olivetti a Ivrea; politica fascista di forzata italianizzazione dei toponimi valdostani.",
    s2_4: "Costruzione colossale delle opere del Vallo Alpino Littorio al Piccolo e Gran San Bernardo e attorno al Monte Bianco; Cogne produce acciai al vanadio e nichel per canne di cannone e proiettili navali.",
    s5: "Presidio permanente della Guardia alla Frontiera e del Battaglione Alpini 'Aosta'; Ivrea converte officine alla componentistica di precisione per calcolatori balistici e spolette.",
    s6: "Giugno 1940: Battaglia delle Alpi Occidentali. Gli Alpini sferrano l'attacco attraverso il Colle del Piccolo San Bernardo sotto tempeste di neve contro i forti francesi di Traversette e Bourg-Saint-Maurice; occupazione parziale fino all'armistizio.",
    s7: "Presidio della frontiera alpina; la Cogne lavora giorno e notte producendo gli acciai più puri d'Europa per blindature e cannoni; Olivetti produce strumenti d'ufficio per i comandi militari.",
    s8: "I battaglioni alpini valdostani combattono strenuamente sul fronte greco-albanese; la comunità valligiana preserva segretamente la propria identità culturale in attesa della liberazione.",
    getNote: (step: number) => {
      if (step <= 1) return "Provincia istituita nel 1927 comprendente la Valle d'Aosta e il circondario piemontese di Ivrea e Canavese; grandioso polo metallurgico della Cogne (miniere di magnetite di Cogne e forni elettrici ad Aosta per acciai speciali) e Olivetti a Ivrea; politica fascista di forzata italianizzazione dei toponimi valdostani.";
      if (step <= 4) return "Costruzione colossale delle opere del Vallo Alpino Littorio al Piccolo e Gran San Bernardo e attorno al Monte Bianco; Cogne produce acciai al vanadio e nichel per canne di cannone e proiettili navali.";
      if (step === 5) return "Presidio permanente della Guardia alla Frontiera e del Battaglione Alpini 'Aosta'; Ivrea converte officine alla componentistica di precisione per calcolatori balistici e spolette.";
      if (step === 6) return "Giugno 1940: Battaglia delle Alpi Occidentali. Gli Alpini sferrano l'attacco attraverso il Colle del Piccolo San Bernardo sotto tempeste di neve contro i forti francesi di Traversette e Bourg-Saint-Maurice; occupazione parziale fino all'armistizio.";
      if (step === 7) return "Presidio della frontiera alpina; la Cogne lavora giorno e notte producendo gli acciai più puri d'Europa per blindature e cannoni; Olivetti produce strumenti d'ufficio per i comandi militari.";
      return "I battaglioni alpini valdostani combattono strenuamente sul fronte greco-albanese; la comunità valligiana preserva segretamente la propria identità culturale in attesa della liberazione.";
    },
    getHistoricalName: (_step: number) => "Provincia di Aosta",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Aosta",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC31": {
    nuts: "ITC31",
    name: "Provincia di Imperia",
    modernName: "Imperia (IM, Liguria)",
    historicalName: "Provincia di Imperia",
    region: "Liguria",
    keys: ["imperia", "imperia_im_liguria", "itc31", "oneglia", "porto_maurizio", "provincia_di_imperia", "sanremo", "ventimiglia"],
    s0_1: "Provincia costiera della Riviera dei Fiori creata nel 1923 unendo Oneglia e Porto Maurizio, celebre per l'olio d'oliva d'eccellenza, i floricoltori di Sanremo e il confine di Ventimiglia con la Francia.",
    s2_4: "Costruzione di casematte costiere e bunker del Vallo Alpino a ridosso del confine di Ventimiglia e Ponte San Luigi; fortificazione della ferrovia litoranea.",
    s5: "Chiusura della frontiera con la Francia e interruzione delle comunicazioni internazionali; ammasso delle olive e razionamento dell'olio; Sanremo spegne i casinò e adotta il blackout.",
    s6: "Giugno 1940: Battaglia delle Alpi marittime; il Regio Esercito avanza lungo la costa attraverso la barriera di Ponte San Luigi occupando la città francese di Mentone; Mentone viene aggregata de facto alla Provincia di Imperia (Armistizio di Villa Incisa).",
    s7: "Amministrazione militare ed economica della fascia d'occupazione di Mentone da parte della prefettura di Imperia; la costa subisce bombardamenti navali e ricognizioni britanniche.",
    s8: "La Marina e la Milizia costiera pattugliano il litorale ligure occidentale; Ventimiglia e Imperia sopportano il razionamento con il commercio d'olio e ortaggi costieri.",
    getNote: (step: number) => {
      if (step <= 1) return "Provincia costiera della Riviera dei Fiori creata nel 1923 unendo Oneglia e Porto Maurizio, celebre per l'olio d'oliva d'eccellenza, i floricoltori di Sanremo e il confine di Ventimiglia con la Francia.";
      if (step <= 4) return "Costruzione di casematte costiere e bunker del Vallo Alpino a ridosso del confine di Ventimiglia e Ponte San Luigi; fortificazione della ferrovia litoranea.";
      if (step === 5) return "Chiusura della frontiera con la Francia e interruzione delle comunicazioni internazionali; ammasso delle olive e razionamento dell'olio; Sanremo spegne i casinò e adotta il blackout.";
      if (step === 6) return "Giugno 1940: Battaglia delle Alpi marittime; il Regio Esercito avanza lungo la costa attraverso la barriera di Ponte San Luigi occupando la città francese di Mentone; Mentone viene aggregata de facto alla Provincia di Imperia (Armistizio di Villa Incisa).";
      if (step === 7) return "Amministrazione militare ed economica della fascia d'occupazione di Mentone da parte della prefettura di Imperia; la costa subisce bombardamenti navali e ricognizioni britanniche.";
      return "La Marina e la Milizia costiera pattugliano il litorale ligure occidentale; Ventimiglia e Imperia sopportano il razionamento con il commercio d'olio e ortaggi costieri.";
    },
    getHistoricalName: (_step: number) => "Provincia di Imperia",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Imperia",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC32": {
    nuts: "ITC32",
    name: "Provincia di Savona",
    modernName: "Savona (SV, Liguria)",
    historicalName: "Provincia di Savona",
    region: "Liguria",
    keys: ["albenga", "itc32", "provincia_di_savona", "savona", "savona_sv_liguria", "vado_ligure"],
    s0_1: "Grande porto industriale e mercantile specializzato nello scarico di carbone (colossale funivia bifune Savona-San Giuseppe di Cairo per il trasporto diretto verso il Piemonte) e stabilimenti Piaggio a Finale Ligure per idrovolanti e aerei.",
    s2_4: "Piaggio a Finale Ligure progetta e produce il bombardiere pesante quadrimotore Piaggio P.108 (l'unico bombardiere quadrimotore strategico italiano della guerra); ampliamento degli stabilimenti di Vado Ligure.",
    s5: "La funivia del carbone di Savona lavora senza sosta per alimentare le centrali torinesi; Piaggio collauda i prototipi del P.108B; oscuramento totale sul golfo.",
    s6: "14 giugno 1940: una formazione navale della marina francese bombarda gli stabilimenti industriali e i serbatoi di Savona e Vado Ligure; la contraerea italiana risponde colpo su colpo.",
    s7: "Piaggio avvia la produzione in serie del quadrimotore P.108B sotto la direzione di Bruno Mussolini (figlio del Duce, che vi perderà la vita in collaudo nel 1941); Savona ripara scali portuali.",
    s8: "I quadrimotori Piaggio di Finale Ligure vengono assegnati alla 274ª Squadriglia Bombardamento a Grande Raggio per missioni contro Gibilterra; la città resiste ai raid aeronavali.",
    getNote: (step: number) => {
      if (step <= 1) return "Grande porto industriale e mercantile specializzato nello scarico di carbone (colossale funivia bifune Savona-San Giuseppe di Cairo per il trasporto diretto verso il Piemonte) e stabilimenti Piaggio a Finale Ligure per idrovolanti e aerei.";
      if (step <= 4) return "Piaggio a Finale Ligure progetta e produce il bombardiere pesante quadrimotore Piaggio P.108 (l'unico bombardiere quadrimotore strategico italiano della guerra); ampliamento degli stabilimenti di Vado Ligure.";
      if (step === 5) return "La funivia del carbone di Savona lavora senza sosta per alimentare le centrali torinesi; Piaggio collauda i prototipi del P.108B; oscuramento totale sul golfo.";
      if (step === 6) return "14 giugno 1940: una formazione navale della marina francese bombarda gli stabilimenti industriali e i serbatoi di Savona e Vado Ligure; la contraerea italiana risponde colpo su colpo.";
      if (step === 7) return "Piaggio avvia la produzione in serie del quadrimotore P.108B sotto la direzione di Bruno Mussolini (figlio del Duce, che vi perderà la vita in collaudo nel 1941); Savona ripara scali portuali.";
      return "I quadrimotori Piaggio di Finale Ligure vengono assegnati alla 274ª Squadriglia Bombardamento a Grande Raggio per missioni contro Gibilterra; la città resiste ai raid aeronavali.";
    },
    getHistoricalName: (_step: number) => "Provincia di Savona",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Savona",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC33": {
    nuts: "ITC33",
    name: "Provincia di Genova",
    modernName: "Genova (GE, Liguria)",
    historicalName: "Provincia di Genova",
    region: "Liguria",
    keys: ["chiavari", "genoa", "genova", "genova_ge_liguria", "itc33", "liguria", "provincia_di_genova"],
    s0_1: "Il più grande porto mercantile d'Italia ('La Superba') e colosso dell'industria pesante: stabilimenti Ansaldo a Sampierdarena e Cornigliano (fonderie, corazze, motori marini, cannoni pesanti), cantieri navali di Sestri Ponente e Riva Trigoso; sede di compagnie di navigazione transatlantiche (Italian Line / Italia Navigazione).",
    s2_4: "I cantieri Ansaldo completano la costruzione di cacciatorpediniere classe Soldati e allestiscono la grandiosa corazzata Littorio; la cattedrale di San Lorenzo e i palazzi dei Rolli preparano difese antiaeree.",
    s5: "Ansaldo opera a ciclo continuo nella produzione di cannoni campali e navali e proiettili; Genova diviene il terminale di sbarco primario di petrolio e materie prime prima della guerra.",
    s6: "14 giugno 1940: una squadra navale francese bombarda i quartieri industriali di Genova; la Regia Marina e le batterie costiere 'Mameli' e 'Monte Moro' presidiano il golfo.",
    s7: "Raid aerei notturni continuativi del Bomber Command della RAF sui bacini portuali e le officine Ansaldo; operai e vigili del fuoco salvano le installazioni industriali.",
    s8: "9 febbraio 1941 (Operazione Grog): la Force H della Royal Navy dell'ammiraglio Somerville bombarda a sorpresa Genova dal mare, scagliando centinaia di proiettili da 381 mm sulla città e sulla cattedrale di San Lorenzo (un colpo inesploso è ancora conservato); Genova non cede.",
    getNote: (step: number) => {
      if (step <= 1) return "Il più grande porto mercantile d'Italia ('La Superba') e colosso dell'industria pesante: stabilimenti Ansaldo a Sampierdarena e Cornigliano (fonderie, corazze, motori marini, cannoni pesanti), cantieri navali di Sestri Ponente e Riva Trigoso; sede di compagnie di navigazione transatlantiche (Italian Line / Italia Navigazione).";
      if (step <= 4) return "I cantieri Ansaldo completano la costruzione di cacciatorpediniere classe Soldati e allestiscono la grandiosa corazzata Littorio; la cattedrale di San Lorenzo e i palazzi dei Rolli preparano difese antiaeree.";
      if (step === 5) return "Ansaldo opera a ciclo continuo nella produzione di cannoni campali e navali e proiettili; Genova diviene il terminale di sbarco primario di petrolio e materie prime prima della guerra.";
      if (step === 6) return "14 giugno 1940: una squadra navale francese bombarda i quartieri industriali di Genova; la Regia Marina e le batterie costiere 'Mameli' e 'Monte Moro' presidiano il golfo.";
      if (step === 7) return "Raid aerei notturni continuativi del Bomber Command della RAF sui bacini portuali e le officine Ansaldo; operai e vigili del fuoco salvano le installazioni industriali.";
      return "9 febbraio 1941 (Operazione Grog): la Force H della Royal Navy dell'ammiraglio Somerville bombarda a sorpresa Genova dal mare, scagliando centinaia di proiettili da 381 mm sulla città e sulla cattedrale di San Lorenzo (un colpo inesploso è ancora conservato); Genova non cede.";
    },
    getHistoricalName: (_step: number) => "Provincia di Genova",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Genova",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC34": {
    nuts: "ITC34",
    name: "Provincia di La Spezia",
    modernName: "La Spezia (SP, Liguria)",
    historicalName: "Provincia di La Spezia",
    region: "Liguria",
    keys: ["itc34", "la_spezia", "la_spezia_sp_liguria", "provincia_di_la_spezia", "sarzana", "spezia"],
    s0_1: "La principale base navale fortificata della Regia Marina nel Mar Ligure e Tirreno settentrionale nel magnifico Golfo dei Poeti: Arsenale Militare Marittimo, cantieri OTO (Odero Terni Orlando), base sommergibili e stabilimenti siluri di San Bartolomeo.",
    s2_4: "I cantieri OTO completano la costruzione della leggendaria corazzata Roma (impostata nel 1938) e producono cannoni navali e torrette corazzate; scavo di imponenti gallerie antiaeree per la popolazione.",
    s5: "La Spezia ospita le navi della 1ª Squadra Navale da battaglia e squadriglie di sommergibili pronti al conflitto; allestimento di reti parasiluro all'imbocco del golfo.",
    s6: "La base navale di La Spezia mobilita corazzate, incrociatori e cacciatorpediniere per le battaglie aeronavali del Mediterraneo; i sommergibili salpano per le acque della Manica e dell'Atlantico (base Betasom a Bordeaux).",
    s7: "La Spezia diviene bersaglio di frequenti incursioni dei bombardieri britannici Wellington; batterie contraeree e cortine fumogene proteggono i bacini di carenaggio dell'Arsenale.",
    s8: "Varata la corazzata Roma nel giugno 1940 e completata la sua dotazione d'armamento; gli incursori della Xª Flottiglia MAS (Teseo Tesei ed Elios Toschi) perfezionano a La Spezia i siluri a lenta corsa 'Maiali'.",
    getNote: (step: number) => {
      if (step <= 1) return "La principale base navale fortificata della Regia Marina nel Mar Ligure e Tirreno settentrionale nel magnifico Golfo dei Poeti: Arsenale Militare Marittimo, cantieri OTO (Odero Terni Orlando), base sommergibili e stabilimenti siluri di San Bartolomeo.";
      if (step <= 4) return "I cantieri OTO completano la costruzione della leggendaria corazzata Roma (impostata nel 1938) e producono cannoni navali e torrette corazzate; scavo di imponenti gallerie antiaeree per la popolazione.";
      if (step === 5) return "La Spezia ospita le navi della 1ª Squadra Navale da battaglia e squadriglie di sommergibili pronti al conflitto; allestimento di reti parasiluro all'imbocco del golfo.";
      if (step === 6) return "La base navale di La Spezia mobilita corazzate, incrociatori e cacciatorpediniere per le battaglie aeronavali del Mediterraneo; i sommergibili salpano per le acque della Manica e dell'Atlantico (base Betasom a Bordeaux).";
      if (step === 7) return "La Spezia diviene bersaglio di frequenti incursioni dei bombardieri britannici Wellington; batterie contraeree e cortine fumogene proteggono i bacini di carenaggio dell'Arsenale.";
      return "Varata la corazzata Roma nel giugno 1940 e completata la sua dotazione d'armamento; gli incursori della Xª Flottiglia MAS (Teseo Tesei ed Elios Toschi) perfezionano a La Spezia i siluri a lenta corsa 'Maiali'.";
    },
    getHistoricalName: (_step: number) => "Provincia di La Spezia",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di La Spezia",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC41": {
    nuts: "ITC41",
    name: "Provincia di Varese",
    modernName: "Varese (VA, Lombardia)",
    historicalName: "Provincia di Varese",
    region: "Lombardia",
    keys: ["busto_arsizio", "gallarate", "itc41", "provincia_di_varese", "saronno", "varese", "varese_va_lombardia"],
    s0_1: "La celebre 'Provincia con le Ali', capitale incontrastata dell'industria aeronautica italiana con l'Aeronautica Macchi alla Schiranna (caccia di Mario Castoldi) e la SIAI-Marchetti a Sesto Calende (idrovolanti e bombardieri SM.79).",
    s2_4: "Mario Castoldi progetta e collauda a Varese il monoplano da caccia Macchi C.200 Saetta e pianifica il futuro C.202 Folgore; SIAI-Marchetti sforna a ciclo continuo gli aerosiluranti trimotori SM.79 Sparviero ('Gobbo Maledetto').",
    s5: "Gli stabilimenti varesini impiegano oltre 25.000 operai specializzati e ingegneri aeronautici: produzione prioritissima di aerei da combattimento per la Regia Aeronautica.",
    s6: "I caccia Macchi C.200 e i bombardieri SM.79 costruiti a Varese sostengono l'intero sforzo bellico aereo della Battaglia d'Inghilterra (Corpo Aereo Italiano CAI) e del Mediterraneo.",
    s7: "Collaudo del meraviglioso prototipo del Macchi C.202 Folgore con motore tedesco Daimler-Benz DB 601; le fabbriche varesine lavorano 24 ore su 24 sotto blackout.",
    s8: "I caccia Macchi C.202 Folgore entrano in linea negli squadroni di prima linea, dimostrandosi gli unici caccia italiani capaci di duellare alla pari con Spitfire e Hurricane nei cieli del Nord Africa.",
    getNote: (step: number) => {
      if (step <= 1) return "La celebre 'Provincia con le Ali', capitale incontrastata dell'industria aeronautica italiana con l'Aeronautica Macchi alla Schiranna (caccia di Mario Castoldi) e la SIAI-Marchetti a Sesto Calende (idrovolanti e bombardieri SM.79).";
      if (step <= 4) return "Mario Castoldi progetta e collauda a Varese il monoplano da caccia Macchi C.200 Saetta e pianifica il futuro C.202 Folgore; SIAI-Marchetti sforna a ciclo continuo gli aerosiluranti trimotori SM.79 Sparviero ('Gobbo Maledetto').";
      if (step === 5) return "Gli stabilimenti varesini impiegano oltre 25.000 operai specializzati e ingegneri aeronautici: produzione prioritissima di aerei da combattimento per la Regia Aeronautica.";
      if (step === 6) return "I caccia Macchi C.200 e i bombardieri SM.79 costruiti a Varese sostengono l'intero sforzo bellico aereo della Battaglia d'Inghilterra (Corpo Aereo Italiano CAI) e del Mediterraneo.";
      if (step === 7) return "Collaudo del meraviglioso prototipo del Macchi C.202 Folgore con motore tedesco Daimler-Benz DB 601; le fabbriche varesine lavorano 24 ore su 24 sotto blackout.";
      return "I caccia Macchi C.202 Folgore entrano in linea negli squadroni di prima linea, dimostrandosi gli unici caccia italiani capaci di duellare alla pari con Spitfire e Hurricane nei cieli del Nord Africa.";
    },
    getHistoricalName: (_step: number) => "Provincia di Varese",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Varese",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC42": {
    nuts: "ITC42",
    name: "Provincia di Como",
    modernName: "Como (CO, Lombardia)",
    historicalName: "Provincia di Como",
    region: "Lombardia",
    keys: ["cantu", "cant\u00f9", "como", "como_co_lombardia", "erba", "itc42", "provincia_di_como"],
    s0_1: "Capitale mondiale della tessitura e tintura della seta sul Lago di Como, sede dello storico Idroscalo Internazionale e centro di produzione tessile di eccellenza.",
    s2_4: "Le seterie comasche convertono parte dei telai alla produzione su vasta scala di seta balistica e tela speciale per paracadute destinati alle costituende truppe paracadutiste italiane.",
    s5: "La produzione di seta per paracadute e abbigliamento speciale d'alta quota per piloti diviene commessa militare prioritaria; Como snodo di frontiera con la neutrale Svizzera (Chiasso).",
    s6: "Idroscalo di Como addestra piloti di idrovolanti della Regia Marina; sorveglianza militare serrata della dogana di Chiasso per prevenire fughe e contrabbando.",
    s7: "Fornitura di paracadute per la Divisione Paracadutisti 'Folgore' in addestramento a Tarquinia; le sponde del lago accolgono famiglie benestanti sfollate da Milano.",
    s8: "La seta comasca rifornisce continuamente le forze armate alleate dell'Asse di paracadute di lancio, frenaggio e segnalazione per tutte le operazioni aerotrasportate.",
    getNote: (step: number) => {
      if (step <= 1) return "Capitale mondiale della tessitura e tintura della seta sul Lago di Como, sede dello storico Idroscalo Internazionale e centro di produzione tessile di eccellenza.";
      if (step <= 4) return "Le seterie comasche convertono parte dei telai alla produzione su vasta scala di seta balistica e tela speciale per paracadute destinati alle costituende truppe paracadutiste italiane.";
      if (step === 5) return "La produzione di seta per paracadute e abbigliamento speciale d'alta quota per piloti diviene commessa militare prioritaria; Como snodo di frontiera con la neutrale Svizzera (Chiasso).";
      if (step === 6) return "Idroscalo di Como addestra piloti di idrovolanti della Regia Marina; sorveglianza militare serrata della dogana di Chiasso per prevenire fughe e contrabbando.";
      if (step === 7) return "Fornitura di paracadute per la Divisione Paracadutisti 'Folgore' in addestramento a Tarquinia; le sponde del lago accolgono famiglie benestanti sfollate da Milano.";
      return "La seta comasca rifornisce continuamente le forze armate alleate dell'Asse di paracadute di lancio, frenaggio e segnalazione per tutte le operazioni aerotrasportate.";
    },
    getHistoricalName: (_step: number) => "Provincia di Como",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Como",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC43": {
    nuts: "ITC43",
    name: "Lecco (Provincia di Como)",
    modernName: "Lecco (LC, Lombardia)",
    historicalName: "Lecco (Provincia di Como)",
    region: "Lombardia",
    keys: ["itc43", "lecco", "lecco_como", "lecco_lc_lombardia", "lecco_provincia_di_como", "valsassina"],
    s0_1: "Città manzoniana e cuore pulsante della metallurgia leggera e pesante lombarda (Trafilerie e Corderie di Lecco, officine meccaniche Badoni, Moto Guzzi a Mandello del Lario); aggregata alla Provincia di Como.",
    s2_4: "Le trafilerie lecchesi producono fili d'acciaio armonico, molle e cavi speciali per l'industria meccanica e aeronautica; Moto Guzzi a Mandello progetta il motocarro militare da montagna 'Alce'.",
    s5: "Badoni costruisce locomotive da manovra, ponti metallici e carrelli ferroviari per l'esercito; Moto Guzzi avvia la produzione in serie dell'Alce e del TriAlce per reparti esploranti e bersaglieri.",
    s6: "Produzione ininterrotta di cavi d'acciaio per reti parasiluro navali e per gli sbarramenti a palloni frenati; i motocarri Moto Guzzi motorizzano le colonne in Nord Africa.",
    s7: "Fonderie e officine lecchesi al lavoro su commesse militari; la comunità montana offre rifugio sicuro a lavoratori e famiglie dalle aree bombardate della pianura.",
    s8: "I motocarri militari Moto Guzzi di Mandello del Lario si dimostrano infaticabili cavalli da tiro nelle sabbie del deserto libico e sulle mulattiere dei Balcani.",
    getNote: (step: number) => {
      if (step <= 1) return "Città manzoniana e cuore pulsante della metallurgia leggera e pesante lombarda (Trafilerie e Corderie di Lecco, officine meccaniche Badoni, Moto Guzzi a Mandello del Lario); aggregata alla Provincia di Como.";
      if (step <= 4) return "Le trafilerie lecchesi producono fili d'acciaio armonico, molle e cavi speciali per l'industria meccanica e aeronautica; Moto Guzzi a Mandello progetta il motocarro militare da montagna 'Alce'.";
      if (step === 5) return "Badoni costruisce locomotive da manovra, ponti metallici e carrelli ferroviari per l'esercito; Moto Guzzi avvia la produzione in serie dell'Alce e del TriAlce per reparti esploranti e bersaglieri.";
      if (step === 6) return "Produzione ininterrotta di cavi d'acciaio per reti parasiluro navali e per gli sbarramenti a palloni frenati; i motocarri Moto Guzzi motorizzano le colonne in Nord Africa.";
      if (step === 7) return "Fonderie e officine lecchesi al lavoro su commesse militari; la comunità montana offre rifugio sicuro a lavoratori e famiglie dalle aree bombardate della pianura.";
      return "I motocarri militari Moto Guzzi di Mandello del Lario si dimostrano infaticabili cavalli da tiro nelle sabbie del deserto libico e sulle mulattiere dei Balcani.";
    },
    getHistoricalName: (_step: number) => "Lecco (Provincia di Como)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Circondario di Lecco (Provincia di Como)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC44": {
    nuts: "ITC44",
    name: "Provincia di Sondrio",
    modernName: "Sondrio (SO, Lombardia)",
    historicalName: "Provincia di Sondrio",
    region: "Lombardia",
    keys: ["bormio", "chiavenna", "itc44", "provincia_di_sondrio", "sondrio", "sondrio_so_lombardia", "tirano", "valtellina"],
    s0_1: "Provincia alpina della Valtellina e Valchiavenna dominata dal Gruppo del Bernina e dai passi dello Stelvio e del Tonale; colossali bacini e dighe idroelettriche (Cancano, AEM Milano).",
    s2_4: "I grandi laghi artificiali e le centrali idroelettriche valtellinesi erogano oltre un quarto dell'elettricità che muove l'intera industria pesante della Lombardia; opere difensive sul confine svizzero.",
    s5: "Presidio dello Stelvio e dei valichi di confine della Guardia alla Frontiera e degli Alpini della Divisione 'Orobica'; le dighe di Cancano poste sotto vigilanza antiaerea e antisabotaggio.",
    s6: "L'energia della Valtellina alimenta a pieno regime gli stabilimenti siderurgici e chimici di Sesto San Giovanni e Milano impegnati nella produzione di guerra.",
    s7: "I contadini e montanari valtellinesi forniscono bresaola, formaggi (Bitto, Casera) e legname per il sostentamento nazionale; rigido controllo dei confini elvetici.",
    s8: "La Valtellina rimane una fortezza idroelettrica protetta dalle vette alpine, rifugio sicuro per sfollati milanesi e risorsa energetica strategica.",
    getNote: (step: number) => {
      if (step <= 1) return "Provincia alpina della Valtellina e Valchiavenna dominata dal Gruppo del Bernina e dai passi dello Stelvio e del Tonale; colossali bacini e dighe idroelettriche (Cancano, AEM Milano).";
      if (step <= 4) return "I grandi laghi artificiali e le centrali idroelettriche valtellinesi erogano oltre un quarto dell'elettricità che muove l'intera industria pesante della Lombardia; opere difensive sul confine svizzero.";
      if (step === 5) return "Presidio dello Stelvio e dei valichi di confine della Guardia alla Frontiera e degli Alpini della Divisione 'Orobica'; le dighe di Cancano poste sotto vigilanza antiaerea e antisabotaggio.";
      if (step === 6) return "L'energia della Valtellina alimenta a pieno regime gli stabilimenti siderurgici e chimici di Sesto San Giovanni e Milano impegnati nella produzione di guerra.";
      if (step === 7) return "I contadini e montanari valtellinesi forniscono bresaola, formaggi (Bitto, Casera) e legname per il sostentamento nazionale; rigido controllo dei confini elvetici.";
      return "La Valtellina rimane una fortezza idroelettrica protetta dalle vette alpine, rifugio sicuro per sfollati milanesi e risorsa energetica strategica.";
    },
    getHistoricalName: (_step: number) => "Provincia di Sondrio",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Sondrio",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC46": {
    nuts: "ITC46",
    name: "Provincia di Bergamo",
    modernName: "Bergamo (BG, Lombardia)",
    historicalName: "Provincia di Bergamo",
    region: "Lombardia",
    keys: ["bergamo", "bergamo_bg_lombardia", "dalmine", "itc46", "provincia_di_bergamo", "treviglio"],
    s0_1: "Città storica cinta da mura veneziane (Città Alta e Bassa), sede della grandiosa acciaieria e tubificio della Dalmine (la più grande d'Italia per tubi d'acciaio senza saldatura) e della 5ª Divisione alpina 'Orobica'.",
    s2_4: "La Dalmine avvia la produzione su vasta scala di tubi d'acciaio ad altissima pressione per bombole di gas compresso, condotte per idrocarburi e corpi di proiettili d'artiglieria pesante.",
    s5: "Migliaia di operai della Dalmine lavorano a getto continuo sotto rigido oscuramento; la Val Seriana intensifica la produzione di panni e uniformi nei propri lanifici storici.",
    s6: "I battaglioni alpini dell'Orobica (Morbegno, Tirano, Edolo) combattono valorosamente sulle Alpi occidentali nella Battaglia delle Alpi; la Dalmine forgia bossoli a pieno ritmo.",
    s7: "Le acciaierie di Dalmine subiscono i primi allarmi aerei ma la produzione di tubi per l'industria petrolifera e navale continua senza interruzioni.",
    s8: "I reggimenti alpini dell'Orobica vengono inviati sul fronte albanese affrontando l'inverno del Pindo; Dalmine rifornisce la Regia Marina di tubazioni per caldaie da corazzata.",
    getNote: (step: number) => {
      if (step <= 1) return "Città storica cinta da mura veneziane (Città Alta e Bassa), sede della grandiosa acciaieria e tubificio della Dalmine (la più grande d'Italia per tubi d'acciaio senza saldatura) e della 5ª Divisione alpina 'Orobica'.";
      if (step <= 4) return "La Dalmine avvia la produzione su vasta scala di tubi d'acciaio ad altissima pressione per bombole di gas compresso, condotte per idrocarburi e corpi di proiettili d'artiglieria pesante.";
      if (step === 5) return "Migliaia di operai della Dalmine lavorano a getto continuo sotto rigido oscuramento; la Val Seriana intensifica la produzione di panni e uniformi nei propri lanifici storici.";
      if (step === 6) return "I battaglioni alpini dell'Orobica (Morbegno, Tirano, Edolo) combattono valorosamente sulle Alpi occidentali nella Battaglia delle Alpi; la Dalmine forgia bossoli a pieno ritmo.";
      if (step === 7) return "Le acciaierie di Dalmine subiscono i primi allarmi aerei ma la produzione di tubi per l'industria petrolifera e navale continua senza interruzioni.";
      return "I reggimenti alpini dell'Orobica vengono inviati sul fronte albanese affrontando l'inverno del Pindo; Dalmine rifornisce la Regia Marina di tubazioni per caldaie da corazzata.";
    },
    getHistoricalName: (_step: number) => "Provincia di Bergamo",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Bergamo",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC47": {
    nuts: "ITC47",
    name: "Provincia di Brescia",
    modernName: "Brescia (BS, Lombardia)",
    historicalName: "Provincia di Brescia",
    region: "Lombardia",
    keys: ["brescia", "brescia_bs_lombardia", "desenzano", "gardone", "itc47", "provincia_di_brescia", "salo", "val_trompia"],
    s0_1: "La storica 'Leonessa d'Italia' e la culla secolare dell'armaiolo mondiale nella Valle Trompia: Fabbrica d'Armi Pietro Beretta a Gardone Val Trompia, Franchi, fonderie siderurgiche e officine meccaniche.",
    s2_4: "Tullio Marengoni alla Beretta progetta il capolavoro assoluto delle armi automatiche individuali: il Moschetto Automatico Beretta Modello 1938 (MAB 38), la pistola mitragliatrice più precisa e affidabile della Seconda Guerra Mondiale.",
    s5: "Beretta a Gardone lavora su turni continui producendo la pistola d'ordinanza Beretta Modello 1934 in calibro 9 corto e i primi lotti del leggendario MAB 38 per reparti d'élite e paracadutisti.",
    s6: "Produzione di massa di armi leggere per il Regio Esercito; le fonderie bresciane colano alluminio e ghisa per proiettili e scocche per mine anticarro.",
    s7: "Il MAB 38 Beretta viene richiesto con entusiasmo da ogni corpo d'assalto, carabinieri e paracadutisti per la sua straordinaria precisione; Brescia arsenale insostituibile.",
    s8: "La Val Trompia sforna decine di migliaia di pistole e moschetti automatici al mese; Brescia sopporta con fermezza il peso della produzione bellica nazionale.",
    getNote: (step: number) => {
      if (step <= 1) return "La storica 'Leonessa d'Italia' e la culla secolare dell'armaiolo mondiale nella Valle Trompia: Fabbrica d'Armi Pietro Beretta a Gardone Val Trompia, Franchi, fonderie siderurgiche e officine meccaniche.";
      if (step <= 4) return "Tullio Marengoni alla Beretta progetta il capolavoro assoluto delle armi automatiche individuali: il Moschetto Automatico Beretta Modello 1938 (MAB 38), la pistola mitragliatrice più precisa e affidabile della Seconda Guerra Mondiale.";
      if (step === 5) return "Beretta a Gardone lavora su turni continui producendo la pistola d'ordinanza Beretta Modello 1934 in calibro 9 corto e i primi lotti del leggendario MAB 38 per reparti d'élite e paracadutisti.";
      if (step === 6) return "Produzione di massa di armi leggere per il Regio Esercito; le fonderie bresciane colano alluminio e ghisa per proiettili e scocche per mine anticarro.";
      if (step === 7) return "Il MAB 38 Beretta viene richiesto con entusiasmo da ogni corpo d'assalto, carabinieri e paracadutisti per la sua straordinaria precisione; Brescia arsenale insostituibile.";
      return "La Val Trompia sforna decine di migliaia di pistole e moschetti automatici al mese; Brescia sopporta con fermezza il peso della produzione bellica nazionale.";
    },
    getHistoricalName: (_step: number) => "Provincia di Brescia",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Brescia",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC48": {
    nuts: "ITC48",
    name: "Provincia di Pavia",
    modernName: "Pavia (PV, Lombardia)",
    historicalName: "Provincia di Pavia",
    region: "Lombardia",
    keys: ["itc48", "lomellina", "oltrepo", "pavia", "pavia_pv_lombardia", "provincia_di_pavia", "vigevano", "voghera"],
    s0_1: "Città universitaria millenaria sul Ticino con il Castello Visconteo, affiancata dal distretto delle calzature di Vigevano (la capitale della calzatura italiana), il riso della Lomellina e i vigneti dell'Oltrepò.",
    s2_4: "I calzaturifici di Vigevano ricevono commesse militari per milioni di paia di scarponi e stivali per i fanti e cavalieri del Regio Esercito; ammodernamento delle concerie.",
    s5: "La Lomellina garantisce scorte imponenti di riso per l'ammasso autarchico; Vigevano adatta le linee alla fabbricazione di calzature militari chiodate resistenti.",
    s6: "Pavia mobilita fanti e genieri per i fronti di guerra; le cascine dell'Oltrepò e della Lomellina divengono riserva alimentare strategica per la vicina Milano.",
    s7: "Pavia e i ponti sul Po e sul Ticino vengono presidiati da batterie contraeree; accoglienza di migliaia di sfollati milanesi nelle campagne pavesi.",
    s8: "Vigevano produce stivali per le divisioni inviate in Russia e nei Balcani; l'Università di Pavia prosegue gli studi medici e scientifici al servizio della sanità militare.",
    getNote: (step: number) => {
      if (step <= 1) return "Città universitaria millenaria sul Ticino con il Castello Visconteo, affiancata dal distretto delle calzature di Vigevano (la capitale della calzatura italiana), il riso della Lomellina e i vigneti dell'Oltrepò.";
      if (step <= 4) return "I calzaturifici di Vigevano ricevono commesse militari per milioni di paia di scarponi e stivali per i fanti e cavalieri del Regio Esercito; ammodernamento delle concerie.";
      if (step === 5) return "La Lomellina garantisce scorte imponenti di riso per l'ammasso autarchico; Vigevano adatta le linee alla fabbricazione di calzature militari chiodate resistenti.";
      if (step === 6) return "Pavia mobilita fanti e genieri per i fronti di guerra; le cascine dell'Oltrepò e della Lomellina divengono riserva alimentare strategica per la vicina Milano.";
      if (step === 7) return "Pavia e i ponti sul Po e sul Ticino vengono presidiati da batterie contraeree; accoglienza di migliaia di sfollati milanesi nelle campagne pavesi.";
      return "Vigevano produce stivali per le divisioni inviate in Russia e nei Balcani; l'Università di Pavia prosegue gli studi medici e scientifici al servizio della sanità militare.";
    },
    getHistoricalName: (_step: number) => "Provincia di Pavia",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Pavia",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC49": {
    nuts: "ITC49",
    name: "Lodi (Provincia di Milano)",
    modernName: "Lodi (LO, Lombardia)",
    historicalName: "Lodi (Provincia di Milano)",
    region: "Lombardia",
    keys: ["codogno", "itc49", "lodi", "lodi_lo_lombardia", "lodi_milano", "lodi_provincia_di_milano", "lodigiano"],
    s0_1: "Capitale storica dell'agricoltura zootecnica e casearia padana tra l'Adda e il Lambro, famosa per l'allevamento di vacche da latte e la produzione del Grana Padano; aggregata alla Provincia di Milano.",
    s2_4: "Il Lodigiano diviene il principale fornitore di latte fresco, formaggio a lunga conservazione e burro per l'approvvigionamento alimentare della metropoli milanese.",
    s5: "I caseifici e gli allevamenti di Lodi vengono sottoposti a rigoroso controllo annonario statale per rifornire le razioni di formaggio militare per le forze armate.",
    s6: "I giovani lodigiani partono per i reggimenti di cavalleria e fanteria; la campagna lodigiana assorbe operai e famiglie evacuate da Milano sotto la minaccia aerea.",
    s7: "Fornitura essenziale di calorie e grassi alimentari per la popolazione razionata; le officine meccaniche agricole lodigiane riparano trattori e mietitrici per 'Spighe d'Oro'.",
    s8: "Il Lodigiano garantisce il flusso ininterrotto di latticini e cereali verso Milano e i grandi ospedali militari lombardi, confermandosi granaio prezioso.",
    getNote: (step: number) => {
      if (step <= 1) return "Capitale storica dell'agricoltura zootecnica e casearia padana tra l'Adda e il Lambro, famosa per l'allevamento di vacche da latte e la produzione del Grana Padano; aggregata alla Provincia di Milano.";
      if (step <= 4) return "Il Lodigiano diviene il principale fornitore di latte fresco, formaggio a lunga conservazione e burro per l'approvvigionamento alimentare della metropoli milanese.";
      if (step === 5) return "I caseifici e gli allevamenti di Lodi vengono sottoposti a rigoroso controllo annonario statale per rifornire le razioni di formaggio militare per le forze armate.";
      if (step === 6) return "I giovani lodigiani partono per i reggimenti di cavalleria e fanteria; la campagna lodigiana assorbe operai e famiglie evacuate da Milano sotto la minaccia aerea.";
      if (step === 7) return "Fornitura essenziale di calorie e grassi alimentari per la popolazione razionata; le officine meccaniche agricole lodigiane riparano trattori e mietitrici per 'Spighe d'Oro'.";
      return "Il Lodigiano garantisce il flusso ininterrotto di latticini e cereali verso Milano e i grandi ospedali militari lombardi, confermandosi granaio prezioso.";
    },
    getHistoricalName: (_step: number) => "Lodi (Provincia di Milano)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Circondario di Lodi (Provincia di Milano)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC4A": {
    nuts: "ITC4A",
    name: "Provincia di Cremona",
    modernName: "Cremona (CR, Lombardia)",
    historicalName: "Provincia di Cremona",
    region: "Lombardia",
    keys: ["casalmaggiore", "crema", "cremona", "cremona_cr_lombardia", "itc4a", "provincia_di_cremona"],
    s0_1: "Patria mondiale della liuteria (Stradivari, Amati, Guarneri) e feudo politico del ras fascista intransigente Roberto Farinacci (segretario del PNF e direttore del quotidiano 'Il Regime Fascista').",
    s2_4: "Farinacci utilizza Cremona come laboratorio del fascismo più intransigente, antisemita e filotedesco; celebrazioni stradivariane e inaugurazione della Scuola Internazionale di Liuteria.",
    s5: "Dalle colonne de 'Il Regime Fascista', Farinacci conduce una violenta campagna giornalistica per spingere l'Italia ad abbandonare la non belligeranza ed entrare in guerra a fianco di Hitler.",
    s6: "10 giugno 1940: Farinacci esulta per la dichiarazione di guerra; i reggimenti cremonesi partono per il fronte alpino; Cremona intensifica la produzione di salumi e granaglie.",
    s7: "Farinacci sostiene l'intervento in Grecia e attacca i vertici militari dopo la disfatta; il porto fluviale sul Po gestisce il transito di chiatte cariche di derrate.",
    s8: "Cremona continua a sostenere lo sforzo bellico agroalimentare; le officine meccaniche riparano vagoni ferroviari e macchinari agricoli per la pianura padana.",
    getNote: (step: number) => {
      if (step <= 1) return "Patria mondiale della liuteria (Stradivari, Amati, Guarneri) e feudo politico del ras fascista intransigente Roberto Farinacci (segretario del PNF e direttore del quotidiano 'Il Regime Fascista').";
      if (step <= 4) return "Farinacci utilizza Cremona come laboratorio del fascismo più intransigente, antisemita e filotedesco; celebrazioni stradivariane e inaugurazione della Scuola Internazionale di Liuteria.";
      if (step === 5) return "Dalle colonne de 'Il Regime Fascista', Farinacci conduce una violenta campagna giornalistica per spingere l'Italia ad abbandonare la non belligeranza ed entrare in guerra a fianco di Hitler.";
      if (step === 6) return "10 giugno 1940: Farinacci esulta per la dichiarazione di guerra; i reggimenti cremonesi partono per il fronte alpino; Cremona intensifica la produzione di salumi e granaglie.";
      if (step === 7) return "Farinacci sostiene l'intervento in Grecia e attacca i vertici militari dopo la disfatta; il porto fluviale sul Po gestisce il transito di chiatte cariche di derrate.";
      return "Cremona continua a sostenere lo sforzo bellico agroalimentare; le officine meccaniche riparano vagoni ferroviari e macchinari agricoli per la pianura padana.";
    },
    getHistoricalName: (_step: number) => "Provincia di Cremona",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Cremona",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC4B": {
    nuts: "ITC4B",
    name: "Provincia di Mantova",
    modernName: "Mantova (MN, Lombardia)",
    historicalName: "Provincia di Mantova",
    region: "Lombardia",
    keys: ["itc4b", "mantova", "mantova_mn_lombardia", "mantua", "provincia_di_mantova", "viadana"],
    s0_1: "Capitale d'arte rinascimentale dei Gonzaga circondata dai tre laghi del Mincio (Palazzo Ducale, Palazzo Te), grande centro agricolo zootecnico e scalo fluviale verso l'Adriatico.",
    s2_4: "Potenziamento degli impianti chimici e dei depositi di carburante sul lago Inferiore e delle cartiere Burgo; ammodernamento delle difese idrauliche del Mincio.",
    s5: "Mantova snodo ferroviario di smistamento merci tra Lombardia, Emilia e Veneto; ammasso obbligatorio di suini, latte e cereali per l'industria conserviera bellica.",
    s6: "Reclutamento nei reggimenti di artiglieria e fanteria del presidio mantovano; Palazzo Ducale e Palazzo Te allestiscono protezioni con sacchi di sabbia per gli affreschi di Giulio Romano.",
    s7: "Rifugio sicuro per sfollati dalle città industriali del nord; il traffico fluviale sul Po e sul Mincio garantisce il trasporto a basso costo di grano e barbabietole.",
    s8: "La produzione agricola mantovana sostiene le razioni dell'esercito; officine meccaniche convertono la lavorazione alla riparazione di motori di motrici.",
    getNote: (step: number) => {
      if (step <= 1) return "Capitale d'arte rinascimentale dei Gonzaga circondata dai tre laghi del Mincio (Palazzo Ducale, Palazzo Te), grande centro agricolo zootecnico e scalo fluviale verso l'Adriatico.";
      if (step <= 4) return "Potenziamento degli impianti chimici e dei depositi di carburante sul lago Inferiore e delle cartiere Burgo; ammodernamento delle difese idrauliche del Mincio.";
      if (step === 5) return "Mantova snodo ferroviario di smistamento merci tra Lombardia, Emilia e Veneto; ammasso obbligatorio di suini, latte e cereali per l'industria conserviera bellica.";
      if (step === 6) return "Reclutamento nei reggimenti di artiglieria e fanteria del presidio mantovano; Palazzo Ducale e Palazzo Te allestiscono protezioni con sacchi di sabbia per gli affreschi di Giulio Romano.";
      if (step === 7) return "Rifugio sicuro per sfollati dalle città industriali del nord; il traffico fluviale sul Po e sul Mincio garantisce il trasporto a basso costo di grano e barbabietole.";
      return "La produzione agricola mantovana sostiene le razioni dell'esercito; officine meccaniche convertono la lavorazione alla riparazione di motori di motrici.";
    },
    getHistoricalName: (_step: number) => "Provincia di Mantova",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Mantova",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC4C": {
    nuts: "ITC4C",
    name: "Provincia di Milano",
    modernName: "Milano (MI, Lombardia)",
    historicalName: "Provincia di Milano",
    region: "Lombardia",
    keys: ["itc4c", "legnano", "lombardia", "milan", "milano", "milano_mi_lombardia", "provincia_di_milano", "sesto_san_giovanni"],
    s0_1: "La capitale economica, finanziaria e industriale d'Italia: il colosso siderurgico e d'armamenti di Sesto San Giovanni ('la Stalingrado d'Italia', con Breda, Falck, Ercole Marelli), Alfa Romeo al Portello (motori aeronautici e veicoli), Pirelli alla Bicocca (pneumatici e cavi), Caproni a Taliedo (bombardieri Ca.133/Ca.310), Innocenti a Lambrate e Montecatini.",
    s2_4: "Alfa Romeo e Breda lavorano al massimo ritmo su commesse militari della Regia Aeronautica e dell'Esercito (fucili mitragliatori Breda Mod. 30, mitragliatrici pesanti Breda Mod. 37, motori aeronautici Bristol/Daimler su licenza); costruzione di imponenti rifugi sotterranei cittadini.",
    s5: "Milano concentra il 40% della produzione meccanica e bellica della nazione; Pirelli sintetizza le prime mescole di gomma autarchica e caproni esporta aerei militari.",
    s6: "15-16 giugno 1940: primi bombardamenti notturni della RAF su Milano mirati agli stabilimenti industriali del Portello e di Sesto San Giovanni; la classe operaia milanese risponde con turni massacranti.",
    s7: "Incursioni aeree della RAF sulla metropoli: la cattedrale del Duomo viene camuffata e protetta con mattoni attorno alle statue; fabbriche decentralizzano i magazzini.",
    s8: "L'incredibile potenza industriale di Milano sforna la maggioranza delle armi automatiche, cavi elettrici, gomme per aerei e motori d'aviazione dell'Italia in guerra.",
    getNote: (step: number) => {
      if (step <= 1) return "La capitale economica, finanziaria e industriale d'Italia: il colosso siderurgico e d'armamenti di Sesto San Giovanni ('la Stalingrado d'Italia', con Breda, Falck, Ercole Marelli), Alfa Romeo al Portello (motori aeronautici e veicoli), Pirelli alla Bicocca (pneumatici e cavi), Caproni a Taliedo (bombardieri Ca.133/Ca.310), Innocenti a Lambrate e Montecatini.";
      if (step <= 4) return "Alfa Romeo e Breda lavorano al massimo ritmo su commesse militari della Regia Aeronautica e dell'Esercito (fucili mitragliatori Breda Mod. 30, mitragliatrici pesanti Breda Mod. 37, motori aeronautici Bristol/Daimler su licenza); costruzione di imponenti rifugi sotterranei cittadini.";
      if (step === 5) return "Milano concentra il 40% della produzione meccanica e bellica della nazione; Pirelli sintetizza le prime mescole di gomma autarchica e caproni esporta aerei militari.";
      if (step === 6) return "15-16 giugno 1940: primi bombardamenti notturni della RAF su Milano mirati agli stabilimenti industriali del Portello e di Sesto San Giovanni; la classe operaia milanese risponde con turni massacranti.";
      if (step === 7) return "Incursioni aeree della RAF sulla metropoli: la cattedrale del Duomo viene camuffata e protetta con mattoni attorno alle statue; fabbriche decentralizzano i magazzini.";
      return "L'incredibile potenza industriale di Milano sforna la maggioranza delle armi automatiche, cavi elettrici, gomme per aerei e motori d'aviazione dell'Italia in guerra.";
    },
    getHistoricalName: (_step: number) => "Provincia di Milano",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Milano",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITC4D": {
    nuts: "ITC4D",
    name: "Monza e Brianza (Provincia di Milano)",
    modernName: "Monza e della Brianza (MB, Lombardia)",
    historicalName: "Monza e Brianza (Provincia di Milano)",
    region: "Lombardia",
    keys: ["brianza", "desio", "itc4d", "monza", "monza_e_brianza_milano", "monza_e_brianza_provincia_di_milano", "monza_e_della_brianza", "monza_e_della_brianza_mb_lombardia", "seregno"],
    s0_1: "Capitale della laboriosa Brianza con la Villa Reale asburgica, l'Autodromo Nazionale di Monza (tempio dell'automobilismo aperto nel 1922) e una fitta rete di industrie meccaniche, mobilifici e cappellifici; aggregata alla Provincia di Milano.",
    s2_4: "I mobilifici della Brianza convertono i laboratori alla lavorazione di parti in legno d'alta precisione per le ali e fusoliere di aerei da addestramento e cassoni militari.",
    s5: "L'Autodromo di Monza viene chiuso alle competizioni e utilizzato come immenso parco veicoli e deposito autocarri militari della Regia Aeronautica e dell'Esercito.",
    s6: "Le officine meccaniche brianzole producono a getto continuo spolette, bulloneria speciale e componentistica per le grandi fabbriche di Sesto San Giovanni e Milano.",
    s7: "Monza e i borghi della Brianza accolgono decine di migliaia di sfollati milanesi che fuggono dai raid notturni della RAF per dormire al sicuro fuori città.",
    s8: "La Brianza si conferma una fucina silenziosa ma formidabile di subforniture meccaniche ed elettriche indispensabili per la macchina produttiva milanese.",
    getNote: (step: number) => {
      if (step <= 1) return "Capitale della laboriosa Brianza con la Villa Reale asburgica, l'Autodromo Nazionale di Monza (tempio dell'automobilismo aperto nel 1922) e una fitta rete di industrie meccaniche, mobilifici e cappellifici; aggregata alla Provincia di Milano.";
      if (step <= 4) return "I mobilifici della Brianza convertono i laboratori alla lavorazione di parti in legno d'alta precisione per le ali e fusoliere di aerei da addestramento e cassoni militari.";
      if (step === 5) return "L'Autodromo di Monza viene chiuso alle competizioni e utilizzato come immenso parco veicoli e deposito autocarri militari della Regia Aeronautica e dell'Esercito.";
      if (step === 6) return "Le officine meccaniche brianzole producono a getto continuo spolette, bulloneria speciale e componentistica per le grandi fabbriche di Sesto San Giovanni e Milano.";
      if (step === 7) return "Monza e i borghi della Brianza accolgono decine di migliaia di sfollati milanesi che fuggono dai raid notturni della RAF per dormire al sicuro fuori città.";
      return "La Brianza si conferma una fucina silenziosa ma formidabile di subforniture meccaniche ed elettriche indispensabili per la macchina produttiva milanese.";
    },
    getHistoricalName: (_step: number) => "Monza e Brianza (Provincia di Milano)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Comprensorio di Monza e Brianza (Provincia di Milano)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH10": {
    nuts: "ITH10",
    name: "Provincia di Bolzano (Alto Adige)",
    modernName: "Bolzano-Bozen (BZ, Trentino-Alto Adige / Südtirol)",
    historicalName: "Provincia di Bolzano (Alto Adige)",
    region: "Trentino-Alto Adige (Venezia Tridentina)",
    keys: ["alto_adige", "bolzano", "bolzano_alto_adige", "bolzano_bozen", "bolzano_bozen_bz_trentino_alto_adige", "bolzano_bozen_bz_trentino_alto_adige__sdtirol", "bozen", "bressanone", "brunico", "ith10", "merano", "provincia_di_bolzano_alto_adige", "sdtirol", "sudtirol", "suedtirol"],
    s0_1: "Provincia istituita nel 1927 nella Venezia Tridentina, soggetta alla dura politica di italianizzazione fascista di Ettore Tolomei, creazione della moderna Zona Industriale di Bolzano (alluminio Montecatini, acciaierie Falck, Lancia) per attirare manodopera italiana.",
    s2_4: "23 giugno 1939: accordi bilaterali italo-tedeschi di Berlino sulle 'Opzioni in Alto Adige' tra Hitler e Mussolini: i cittadini di lingua tedesca devono scegliere tra optare per il Reich tedesco (Optanten) o rimanere fedeli all'Italia (Dableiber).",
    s5: "L'86% dei sudtirolesi opta per la Germania nazista spinto dalla propaganda; l'emigrazione è rallentata dallo scoppio della guerra; costruzione segreta del Vallo Alpino in Alto Adige (la 'Linea non mi fido') rivolta verso il confine tedesco del Brennero.",
    s6: "18 marzo e 4 ottobre 1940: storici vertici al Passo del Brennero tra Adolf Hitler e Benito Mussolini nei rispettivi treni blindati per concordare la strategia bellica dell'Asse.",
    s7: "La Zona Industriale di Bolzano lavora a pieno ritmo nella fusione di alluminio e magnesio per la Regia Aeronautica; convogli ferroviari tedeschi transitano quotidianamente dal Brennero.",
    s8: "Il passo del Brennero diviene il corridoio logistico supremo attraverso cui transitano i rifornimenti di carbone del Reich e le divisioni dell'Afrikakorps dirette in Nord Africa.",
    getNote: (step: number) => {
      if (step <= 1) return "Provincia istituita nel 1927 nella Venezia Tridentina, soggetta alla dura politica di italianizzazione fascista di Ettore Tolomei, creazione della moderna Zona Industriale di Bolzano (alluminio Montecatini, acciaierie Falck, Lancia) per attirare manodopera italiana.";
      if (step <= 4) return "23 giugno 1939: accordi bilaterali italo-tedeschi di Berlino sulle 'Opzioni in Alto Adige' tra Hitler e Mussolini: i cittadini di lingua tedesca devono scegliere tra optare per il Reich tedesco (Optanten) o rimanere fedeli all'Italia (Dableiber).";
      if (step === 5) return "L'86% dei sudtirolesi opta per la Germania nazista spinto dalla propaganda; l'emigrazione è rallentata dallo scoppio della guerra; costruzione segreta del Vallo Alpino in Alto Adige (la 'Linea non mi fido') rivolta verso il confine tedesco del Brennero.";
      if (step === 6) return "18 marzo e 4 ottobre 1940: storici vertici al Passo del Brennero tra Adolf Hitler e Benito Mussolini nei rispettivi treni blindati per concordare la strategia bellica dell'Asse.";
      if (step === 7) return "La Zona Industriale di Bolzano lavora a pieno ritmo nella fusione di alluminio e magnesio per la Regia Aeronautica; convogli ferroviari tedeschi transitano quotidianamente dal Brennero.";
      return "Il passo del Brennero diviene il corridoio logistico supremo attraverso cui transitano i rifornimenti di carbone del Reich e le divisioni dell'Afrikakorps dirette in Nord Africa.";
    },
    getHistoricalName: (_step: number) => "Provincia di Bolzano (Alto Adige)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Bolzano (Venezia Tridentina)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH20": {
    nuts: "ITH20",
    name: "Provincia di Trento (Trentino)",
    modernName: "Trento (TN, Trentino-Alto Adige)",
    historicalName: "Provincia di Trento (Trentino)",
    region: "Trentino-Alto Adige (Venezia Tridentina)",
    keys: ["ith20", "provincia_di_trento_trentino", "riva_del_garda", "rovereto", "trentino", "trento", "trento_tn_trentino_alto_adige", "trento_trentino", "venezia_tridentina"],
    s0_1: "Capoluogo storico del Trentino nella valle dell'Adige, terra irredenta annessa con il Trattato di Saint-Germain; Castello del Buonconsiglio, memoria di Cesare Battisti e polo industriale di Rovereto.",
    s2_4: "Sviluppo dei grandi impianti idroelettrici del Ponale e della Val di Non; le caserme di Trento ospitano i reggimenti alpini della Tridentina e genieri di montagna.",
    s5: "Trento è snodo ferroviario cardine della linea del Brennero verso l'Austria annessa al Terzo Reich; sorveglianza militare delle gallerie e dei viadotti ferroviari sull'Adige.",
    s6: "Gli Alpini trentini partono per la frontiera francese; Rovereto produce pneumatici e manufatti chimici a sostegno delle commesse militari dell'esercito.",
    s7: "I battaglioni della Divisione 'Tridentina' (reggimenti 5° e 6° Alpini) vengono inviati sul fronte greco-albanese tra le nevi e il fango, distinguendosi per tenacia e sacrificio.",
    s8: "Fornitura essenziale di energia idroelettrica alle acciaierie venete e lombarde; Trento accoglie treni di feriti dai Balcani mentre transitano le truppe per l'Africa.",
    getNote: (step: number) => {
      if (step <= 1) return "Capoluogo storico del Trentino nella valle dell'Adige, terra irredenta annessa con il Trattato di Saint-Germain; Castello del Buonconsiglio, memoria di Cesare Battisti e polo industriale di Rovereto.";
      if (step <= 4) return "Sviluppo dei grandi impianti idroelettrici del Ponale e della Val di Non; le caserme di Trento ospitano i reggimenti alpini della Tridentina e genieri di montagna.";
      if (step === 5) return "Trento è snodo ferroviario cardine della linea del Brennero verso l'Austria annessa al Terzo Reich; sorveglianza militare delle gallerie e dei viadotti ferroviari sull'Adige.";
      if (step === 6) return "Gli Alpini trentini partono per la frontiera francese; Rovereto produce pneumatici e manufatti chimici a sostegno delle commesse militari dell'esercito.";
      if (step === 7) return "I battaglioni della Divisione 'Tridentina' (reggimenti 5° e 6° Alpini) vengono inviati sul fronte greco-albanese tra le nevi e il fango, distinguendosi per tenacia e sacrificio.";
      return "Fornitura essenziale di energia idroelettrica alle acciaierie venete e lombarde; Trento accoglie treni di feriti dai Balcani mentre transitano le truppe per l'Africa.";
    },
    getHistoricalName: (_step: number) => "Provincia di Trento (Trentino)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Trento (Venezia Tridentina)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH31": {
    nuts: "ITH31",
    name: "Provincia di Verona",
    modernName: "Verona (VR, Veneto)",
    historicalName: "Provincia di Verona",
    region: "Veneto",
    keys: ["ith31", "legnago", "provincia_di_verona", "verona", "verona_vr_veneto", "villafranca"],
    s0_1: "La storica città scaligera sul fiume Adige con l'Arena romana, fulcro difensivo dell'antico Quadrilatero e crocevia strategico assoluto tra la ferrovia Milano-Venezia e la linea del Brennero.",
    s2_4: "Potenziamento dello scalo merci ferroviario di Porta Nuova (uno dei più grandi d'Italia); la base aerea di Villafranca Veronese viene ampliata per ospitare stormi da caccia.",
    s5: "Verona diviene il centro nevralgico della logistica militare del nord-est per lo smistamento di truppe, armi e carbone; allestimento di difese antiaeree attorno all'Arena.",
    s6: "I caccia decollati da Villafranca proteggono il nodo del Brennero; Verona accoglie reparti e colonne motorizzate dirette ai fronti operativi.",
    s7: "Fabbriche meccaniche e alimentari scaligere al lavoro per le razioni militari dell'esercito; ospedali militari di Verona accolgono i feriti della Campagna di Grecia.",
    s8: "Porta Nuova smista giorno e notte i convogli militari italo-tedeschi; Villafranca addestra le nuove leve di piloti da caccia della Regia Aeronautica.",
    getNote: (step: number) => {
      if (step <= 1) return "La storica città scaligera sul fiume Adige con l'Arena romana, fulcro difensivo dell'antico Quadrilatero e crocevia strategico assoluto tra la ferrovia Milano-Venezia e la linea del Brennero.";
      if (step <= 4) return "Potenziamento dello scalo merci ferroviario di Porta Nuova (uno dei più grandi d'Italia); la base aerea di Villafranca Veronese viene ampliata per ospitare stormi da caccia.";
      if (step === 5) return "Verona diviene il centro nevralgico della logistica militare del nord-est per lo smistamento di truppe, armi e carbone; allestimento di difese antiaeree attorno all'Arena.";
      if (step === 6) return "I caccia decollati da Villafranca proteggono il nodo del Brennero; Verona accoglie reparti e colonne motorizzate dirette ai fronti operativi.";
      if (step === 7) return "Fabbriche meccaniche e alimentari scaligere al lavoro per le razioni militari dell'esercito; ospedali militari di Verona accolgono i feriti della Campagna di Grecia.";
      return "Porta Nuova smista giorno e notte i convogli militari italo-tedeschi; Villafranca addestra le nuove leve di piloti da caccia della Regia Aeronautica.";
    },
    getHistoricalName: (_step: number) => "Provincia di Verona",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Verona",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH32": {
    nuts: "ITH32",
    name: "Provincia di Vicenza",
    modernName: "Vicenza (VI, Veneto)",
    historicalName: "Provincia di Vicenza",
    region: "Veneto",
    keys: ["bassano", "bassano_del_grappa", "ith32", "provincia_di_vicenza", "schio", "valdagno", "vicenza", "vicenza_vi_veneto"],
    s0_1: "La città d'arte del Palladio, la memoria sacra della Grande Guerra sull'Altopiano di Asiago, i colossali lanifici Marzotto a Valdagno ('Città Sociale') e le officine elettromeccaniche Pellizzari ad Arzignano.",
    s2_4: "Marzotto a Valdagno tesse milioni di metri di panno grigio-verde per le uniformi militari; Pellizzari ad Arzignano produce motori elettrici e trasformatori per la marina.",
    s5: "I lanifici e le concerie di Arzignano lavorano a pieno regime per fornire scarponi e tute da combattimento; Asiago centro d'addestramento invernale per truppe alpine.",
    s6: "Migliaia di fanti e alpini vicentini partono per la guerra; le officine meccaniche beriche producono componenti per mitragliatrici e proiettili d'artiglieria.",
    s7: "Marzotto fornisce panni pesanti impermeabilizzati per le truppe bloccate nell'inverno albanese; Vicenza preserva i suoi capolavori palladiani con protezioni speciali.",
    s8: "La produzione industriale vicentina sostiene le forniture belliche dell'esercito; forte solidarietà delle comunità contadine beriche verso i soldati al fronte.",
    getNote: (step: number) => {
      if (step <= 1) return "La città d'arte del Palladio, la memoria sacra della Grande Guerra sull'Altopiano di Asiago, i colossali lanifici Marzotto a Valdagno ('Città Sociale') e le officine elettromeccaniche Pellizzari ad Arzignano.";
      if (step <= 4) return "Marzotto a Valdagno tesse milioni di metri di panno grigio-verde per le uniformi militari; Pellizzari ad Arzignano produce motori elettrici e trasformatori per la marina.";
      if (step === 5) return "I lanifici e le concerie di Arzignano lavorano a pieno regime per fornire scarponi e tute da combattimento; Asiago centro d'addestramento invernale per truppe alpine.";
      if (step === 6) return "Migliaia di fanti e alpini vicentini partono per la guerra; le officine meccaniche beriche producono componenti per mitragliatrici e proiettili d'artiglieria.";
      if (step === 7) return "Marzotto fornisce panni pesanti impermeabilizzati per le truppe bloccate nell'inverno albanese; Vicenza preserva i suoi capolavori palladiani con protezioni speciali.";
      return "La produzione industriale vicentina sostiene le forniture belliche dell'esercito; forte solidarietà delle comunità contadine beriche verso i soldati al fronte.";
    },
    getHistoricalName: (_step: number) => "Provincia di Vicenza",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Vicenza",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH33": {
    nuts: "ITH33",
    name: "Provincia di Belluno",
    modernName: "Belluno (BL, Veneto)",
    historicalName: "Provincia di Belluno",
    region: "Veneto",
    keys: ["agordo", "belluno", "belluno_bl_veneto", "cadore", "cortina", "feltre", "ith33", "provincia_di_belluno"],
    s0_1: "Il cuore delle Dolomiti e del Cadore sul fiume Piave con Cortina d'Ampezzo, culla dell'occhialeria italiana (Safilo) e terra di reclutamento del glorioso Battaglione Alpini 'Pieve di Cadore'.",
    s2_4: "Safilo e le ottiche cadorine producono occhiali da sole protettivi per piloti, maschere da neve per truppe da montagna e lenti graduate militari per l'esercito.",
    s5: "I passi dolomitici e le valli del Cadore vengono presidiati dal Vallo Alpino; Cortina ospita centri di addestramento sciatori militari e sanatori per convalescenti.",
    s6: "Gli Alpini del 'Pieve di Cadore' e del 7° Reggimento combattono sulle Alpi occidentali; le centrali idroelettriche della Valbelluna erogano energia alle fabbriche venete.",
    s7: "I battaglioni cadorini vengono inviati in Albania sui monti Tomorr e Mali Scindiel, resistendo con valore leggendario al contrattacco greco; la provincia sopporta gravi perdite.",
    s8: "Fornitura essenziale di legname per traverse ferroviarie e puntellature minerarie; orgoglio e lutto nelle famiglie del Cadore per i caduti sui fronti balcanici.",
    getNote: (step: number) => {
      if (step <= 1) return "Il cuore delle Dolomiti e del Cadore sul fiume Piave con Cortina d'Ampezzo, culla dell'occhialeria italiana (Safilo) e terra di reclutamento del glorioso Battaglione Alpini 'Pieve di Cadore'.";
      if (step <= 4) return "Safilo e le ottiche cadorine producono occhiali da sole protettivi per piloti, maschere da neve per truppe da montagna e lenti graduate militari per l'esercito.";
      if (step === 5) return "I passi dolomitici e le valli del Cadore vengono presidiati dal Vallo Alpino; Cortina ospita centri di addestramento sciatori militari e sanatori per convalescenti.";
      if (step === 6) return "Gli Alpini del 'Pieve di Cadore' e del 7° Reggimento combattono sulle Alpi occidentali; le centrali idroelettriche della Valbelluna erogano energia alle fabbriche venete.";
      if (step === 7) return "I battaglioni cadorini vengono inviati in Albania sui monti Tomorr e Mali Scindiel, resistendo con valore leggendario al contrattacco greco; la provincia sopporta gravi perdite.";
      return "Fornitura essenziale di legname per traverse ferroviarie e puntellature minerarie; orgoglio e lutto nelle famiglie del Cadore per i caduti sui fronti balcanici.";
    },
    getHistoricalName: (_step: number) => "Provincia di Belluno",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Belluno",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH34": {
    nuts: "ITH34",
    name: "Provincia di Treviso",
    modernName: "Treviso (TV, Veneto)",
    historicalName: "Provincia di Treviso",
    region: "Veneto",
    keys: ["castelfranco_veneto", "conegliano", "ith34", "montebelluna", "provincia_di_treviso", "treviso", "treviso_tv_veneto", "vittorio_veneto"],
    s0_1: "La fertile 'Marca Gioiosa' sul fiume Sile, il colle sacro del Montello, i calzaturifici da montagna di Montebelluna e l'aeroporto militare di Istrana.",
    s2_4: "Montebelluna incrementa la fabbricazione di scarponi militari per truppe da montagna e alpini; la base aerea di Istrana ospita stormi da caccia della Regia Aeronautica.",
    s5: "Treviso snodo logistico e sede dell'ammasso delle produzioni agricole (mais, grano, ortaggi) per il vettovagliamento militare; Istrana in allerta caccia.",
    s6: "I caccia di Istrana pattugliano i cieli dell'alto Adriatico; le manifatture tessili e calzaturiere trevigiane lavorano a ciclo continuo su commesse belliche.",
    s7: "Treviso accoglie comandi territoriali e ospedali militari per i feriti che rientrano dai Balcani attraverso l'Adriatico; rifugio per sfollati veneziani.",
    s8: "La Marca trevigiana assicura forniture agroalimentari e scarponi da combattimento alle divisioni dell'esercito impegnate sul fronte greco e in Africa settentrionale.",
    getNote: (step: number) => {
      if (step <= 1) return "La fertile 'Marca Gioiosa' sul fiume Sile, il colle sacro del Montello, i calzaturifici da montagna di Montebelluna e l'aeroporto militare di Istrana.";
      if (step <= 4) return "Montebelluna incrementa la fabbricazione di scarponi militari per truppe da montagna e alpini; la base aerea di Istrana ospita stormi da caccia della Regia Aeronautica.";
      if (step === 5) return "Treviso snodo logistico e sede dell'ammasso delle produzioni agricole (mais, grano, ortaggi) per il vettovagliamento militare; Istrana in allerta caccia.";
      if (step === 6) return "I caccia di Istrana pattugliano i cieli dell'alto Adriatico; le manifatture tessili e calzaturiere trevigiane lavorano a ciclo continuo su commesse belliche.";
      if (step === 7) return "Treviso accoglie comandi territoriali e ospedali militari per i feriti che rientrano dai Balcani attraverso l'Adriatico; rifugio per sfollati veneziani.";
      return "La Marca trevigiana assicura forniture agroalimentari e scarponi da combattimento alle divisioni dell'esercito impegnate sul fronte greco e in Africa settentrionale.";
    },
    getHistoricalName: (_step: number) => "Provincia di Treviso",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Treviso",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH35": {
    nuts: "ITH35",
    name: "Provincia di Venezia",
    modernName: "Venezia (VE, Veneto)",
    historicalName: "Provincia di Venezia",
    region: "Veneto",
    keys: ["chioggia", "ith35", "mestre", "porto_marghera", "provincia_di_venezia", "san_dona_di_piave", "venezia", "venezia_ve_veneto", "venice"],
    s0_1: "La Serenissima con i suoi inestimabili tesori d'arte lagunari, lo storico Arsenale navale e il colossale polo industriale chimico e metallurgico di Porto Marghera (alluminio SAVA, chimica Montecatini, cantieri Breda).",
    s2_4: "Porto Marghera avvia la produzione in serie di alluminio autarchico SAVA, carboni fossili e fertilizzanti chimici; i cantieri Breda di Marghera costruiscono motosiluranti e mercantili armati.",
    s5: "Misure segrete di protezione per la Basilica di San Marco e il Palazzo Ducale: rimozione dei cavalli di bronzo e protezione dei monumenti con centinaia di migliaia di sacchi di sabbia.",
    s6: "Porto Marghera diviene polo primario di produzione di carburanti sintetici e munizioni per la Regia Marina; l'Arsenale di Venezia ripara naviglio sottile e motosiluranti MAS.",
    s7: "Incursioni aeree della RAF mirate ai serbatoi petroliferi e agli stabilimenti chimici di Marghera; la città storica lagunare viene risparmiata grazie alla sua unicità artistica.",
    s8: "I cantieri Breda di Marghera e il Silurificio di Venezia sfornano siluri e imbarcazioni d'assalto; Venezia diviene scalo navale sicuro per i convogli costieri dell'Adriatico.",
    getNote: (step: number) => {
      if (step <= 1) return "La Serenissima con i suoi inestimabili tesori d'arte lagunari, lo storico Arsenale navale e il colossale polo industriale chimico e metallurgico di Porto Marghera (alluminio SAVA, chimica Montecatini, cantieri Breda).";
      if (step <= 4) return "Porto Marghera avvia la produzione in serie di alluminio autarchico SAVA, carboni fossili e fertilizzanti chimici; i cantieri Breda di Marghera costruiscono motosiluranti e mercantili armati.";
      if (step === 5) return "Misure segrete di protezione per la Basilica di San Marco e il Palazzo Ducale: rimozione dei cavalli di bronzo e protezione dei monumenti con centinaia di migliaia di sacchi di sabbia.";
      if (step === 6) return "Porto Marghera diviene polo primario di produzione di carburanti sintetici e munizioni per la Regia Marina; l'Arsenale di Venezia ripara naviglio sottile e motosiluranti MAS.";
      if (step === 7) return "Incursioni aeree della RAF mirate ai serbatoi petroliferi e agli stabilimenti chimici di Marghera; la città storica lagunare viene risparmiata grazie alla sua unicità artistica.";
      return "I cantieri Breda di Marghera e il Silurificio di Venezia sfornano siluri e imbarcazioni d'assalto; Venezia diviene scalo navale sicuro per i convogli costieri dell'Adriatico.";
    },
    getHistoricalName: (_step: number) => "Provincia di Venezia",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Venezia",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH36": {
    nuts: "ITH36",
    name: "Provincia di Padova",
    modernName: "Padova (PD, Veneto)",
    historicalName: "Provincia di Padova",
    region: "Veneto",
    keys: ["cittadella", "este", "ith36", "monselice", "padova", "padova_pd_veneto", "padua", "provincia_di_padova"],
    s0_1: "Città universitaria prestigiosa (Palazzo del Bo), la Basilica di Sant'Antonio, la cappella degli Scrovegni di Giotto e le grandi Officine Meccaniche della Stanga (tram e carrozze ferroviarie).",
    s2_4: "Le Officine Stanga convertono la produzione alla fornitura di carrozze speciali blindate, carri cisterna e ponti metallici per il genio militare delle forze armate.",
    s5: "Padova diviene il centro direzionale e logistico di comando per le comunicazioni dell'area veneta; scavo di rifugi antiaerei pubblici sotto le piazze storiche.",
    s6: "L'aeroporto militare di Padova ospita reparti della Regia Aeronautica; la facoltà di medicina e chirurgia dell'ateneo padovano forma medici militari per i fronti di guerra.",
    s7: "Protezione con armature in mattoni e sacchi di terra per la Cappella degli Scrovegni e gli affreschi giotteschi; Padova accoglie comandi e centri di convalescenza.",
    s8: "Le Officine Stanga riparano a ciclo continuo il materiale ferroviario bombardato sulle linee per Verona e Bologna; Padova perno organizzativo veneto.",
    getNote: (step: number) => {
      if (step <= 1) return "Città universitaria prestigiosa (Palazzo del Bo), la Basilica di Sant'Antonio, la cappella degli Scrovegni di Giotto e le grandi Officine Meccaniche della Stanga (tram e carrozze ferroviarie).";
      if (step <= 4) return "Le Officine Stanga convertono la produzione alla fornitura di carrozze speciali blindate, carri cisterna e ponti metallici per il genio militare delle forze armate.";
      if (step === 5) return "Padova diviene il centro direzionale e logistico di comando per le comunicazioni dell'area veneta; scavo di rifugi antiaerei pubblici sotto le piazze storiche.";
      if (step === 6) return "L'aeroporto militare di Padova ospita reparti della Regia Aeronautica; la facoltà di medicina e chirurgia dell'ateneo padovano forma medici militari per i fronti di guerra.";
      if (step === 7) return "Protezione con armature in mattoni e sacchi di terra per la Cappella degli Scrovegni e gli affreschi giotteschi; Padova accoglie comandi e centri di convalescenza.";
      return "Le Officine Stanga riparano a ciclo continuo il materiale ferroviario bombardato sulle linee per Verona e Bologna; Padova perno organizzativo veneto.";
    },
    getHistoricalName: (_step: number) => "Provincia di Padova",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Padova",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH37": {
    nuts: "ITH37",
    name: "Provincia di Rovigo",
    modernName: "Rovigo (RO, Veneto)",
    historicalName: "Provincia di Rovigo",
    region: "Veneto",
    keys: ["adria", "ith37", "polesine", "provincia_di_rovigo", "rovigo", "rovigo_ro_veneto"],
    s0_1: "La terra del Polesine stretta tra il Po e l'Adige fino al Delta, celebre per le grandi bonifiche idrauliche, l'agricoltura cerealicola e le prime scoperte di metano gassoso nel sottosuolo.",
    s2_4: "Inizio dello sfruttamento dei primi pozzi di gas metano autarchico nel Polesine per alimentare autocarri e automobili a bombola durante le sanzioni e la politica autarchica.",
    s5: "Il metano del Polesine diviene combustibile prezioso per il trasporto pubblico e privato colpito dal rigido razionamento dei carburanti petroliferi importati.",
    s6: "I contadini del Polesine garantiscono ammassi consistenti di barbabietola da zucchero e grano; presidio militare delle arginature del Po e dei ponti ferroviari.",
    s7: "Adria e Rovigo accolgono famiglie sfollate dalle aree portuali; le idrovore del Delta operano giorno e notte per impedire allagamenti delle fertili terre coltivate.",
    s8: "Fornitura continua di zucchero e grano per il razionamento della popolazione veneta; il gas metano polesano alimenta centinaia di veicoli di soccorso.",
    getNote: (step: number) => {
      if (step <= 1) return "La terra del Polesine stretta tra il Po e l'Adige fino al Delta, celebre per le grandi bonifiche idrauliche, l'agricoltura cerealicola e le prime scoperte di metano gassoso nel sottosuolo.";
      if (step <= 4) return "Inizio dello sfruttamento dei primi pozzi di gas metano autarchico nel Polesine per alimentare autocarri e automobili a bombola durante le sanzioni e la politica autarchica.";
      if (step === 5) return "Il metano del Polesine diviene combustibile prezioso per il trasporto pubblico e privato colpito dal rigido razionamento dei carburanti petroliferi importati.";
      if (step === 6) return "I contadini del Polesine garantiscono ammassi consistenti di barbabietola da zucchero e grano; presidio militare delle arginature del Po e dei ponti ferroviari.";
      if (step === 7) return "Adria e Rovigo accolgono famiglie sfollate dalle aree portuali; le idrovore del Delta operano giorno e notte per impedire allagamenti delle fertili terre coltivate.";
      return "Fornitura continua di zucchero e grano per il razionamento della popolazione veneta; il gas metano polesano alimenta centinaia di veicoli di soccorso.";
    },
    getHistoricalName: (_step: number) => "Provincia di Rovigo",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Rovigo",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH41": {
    nuts: "ITH41",
    name: "Pordenone (Provincia del Friuli / Udine)",
    modernName: "Pordenone (PN, Friuli-Venezia Giulia)",
    historicalName: "Pordenone (Provincia del Friuli / Udine)",
    region: "Friuli-Venezia Giulia",
    keys: ["friuli_occidentale", "ith41", "maniago", "pordenone", "pordenone_pn_friuli_venezia_giulia", "pordenone_provincia_del_friuli", "pordenone_provincia_del_friuli__udine", "sacile", "spilimbergo", "udine"],
    s0_1: "Centro manifatturiero sul fiume Noncello con le officine Zanussi (fondate da Antonio Zanussi nel 1916 per stufe e fornelli) e i grandi cotonifici industriali; aggregata alla Provincia di Udine.",
    s2_4: "Zanussi converte le proprie fonderie alla produzione di cucine da campo militari, fornelloni da trincea e cassette porta-munizioni in metallo stampato.",
    s5: "I cotonifici di Pordenone tessono milioni di metri di tela per tende da campo, tute da fatica e sacchi di protezione antiaerea; allestimento di rifugi civili.",
    s6: "Reclutamento nei battaglioni alpini della 'Julia'; Zanussi produce cucine da campo a getto continuo per i soldati al fronte.",
    s7: "Pordenone retrovia sicura per il transito delle divisioni verso la frontiera orientale e i Balcani; forte impegno delle maestranze operaie femminili.",
    s8: "Le officine metalmeccaniche pordenonesi riforniscono di attrezzature da campo le truppe italiane impegnate nelle difficili campagne di Grecia e Jugoslavia.",
    getNote: (step: number) => {
      if (step <= 1) return "Centro manifatturiero sul fiume Noncello con le officine Zanussi (fondate da Antonio Zanussi nel 1916 per stufe e fornelli) e i grandi cotonifici industriali; aggregata alla Provincia di Udine.";
      if (step <= 4) return "Zanussi converte le proprie fonderie alla produzione di cucine da campo militari, fornelloni da trincea e cassette porta-munizioni in metallo stampato.";
      if (step === 5) return "I cotonifici di Pordenone tessono milioni di metri di tela per tende da campo, tute da fatica e sacchi di protezione antiaerea; allestimento di rifugi civili.";
      if (step === 6) return "Reclutamento nei battaglioni alpini della 'Julia'; Zanussi produce cucine da campo a getto continuo per i soldati al fronte.";
      if (step === 7) return "Pordenone retrovia sicura per il transito delle divisioni verso la frontiera orientale e i Balcani; forte impegno delle maestranze operaie femminili.";
      return "Le officine metalmeccaniche pordenonesi riforniscono di attrezzature da campo le truppe italiane impegnate nelle difficili campagne di Grecia e Jugoslavia.";
    },
    getHistoricalName: (_step: number) => "Pordenone (Provincia del Friuli / Udine)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Circondario di Pordenone (Provincia del Friuli / Udine)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH42": {
    nuts: "ITH42",
    name: "Provincia del Friuli (Udine)",
    modernName: "Udine (UD, Friuli-Venezia Giulia)",
    historicalName: "Provincia del Friuli (Udine)",
    region: "Friuli-Venezia Giulia",
    keys: ["carnia", "cividale_del_friuli", "friuli", "ith42", "provincia_del_friuli_udine", "tolmezzo", "udine", "udine_ud_friuli_venezia_giulia"],
    s0_1: "Capitale storica del Friuli con il Castello di Udine, piazza Libertà e la gloriosa 3ª Divisione alpina 'Julia' (reggimenti 8° e 9° Alpini, 3° Artiglieria da montagna); controllo del Tarvisiano e delle Alpi Carniche e Giulie.",
    s2_4: "Costruzione delle poderose fortificazioni del Vallo Alpino Littorio nella conca di Tarvisio e lungo la frontiera con l'Austria nazista e la Jugoslavia; la Julia eccelle nelle manovre invernali.",
    s5: "Udine è il quartier generale delle truppe della frontiera orientale; i battaglioni della Julia vengono mobilitati e posti in allerta operativa massima.",
    s6: "Gli Alpini friulani della Julia partono per l'Albania: nell'ottobre 1940 riceveranno l'ordine di sfondare le linee greche nel massiccio del Pindo e dell'Epiro.",
    s7: "La tragedia e l'epopea della Julia in Grecia: i battaglioni alpini (Gemona, Cividale, Tolmezzo) resistono con eroismo indomito a forze soverchianti e al gelo del Pindo, guadagnandosi la leggenda del 'Miracolo della Julia'.",
    s8: "Udine accoglie con dolore e immenso orgoglio i reduci feriti della Julia; aprile 1941: le truppe italiane avanzano da Tarvisio e Cividale nell'invasione dell'Jugoslavia.",
    getNote: (step: number) => {
      if (step <= 1) return "Capitale storica del Friuli con il Castello di Udine, piazza Libertà e la gloriosa 3ª Divisione alpina 'Julia' (reggimenti 8° e 9° Alpini, 3° Artiglieria da montagna); controllo del Tarvisiano e delle Alpi Carniche e Giulie.";
      if (step <= 4) return "Costruzione delle poderose fortificazioni del Vallo Alpino Littorio nella conca di Tarvisio e lungo la frontiera con l'Austria nazista e la Jugoslavia; la Julia eccelle nelle manovre invernali.";
      if (step === 5) return "Udine è il quartier generale delle truppe della frontiera orientale; i battaglioni della Julia vengono mobilitati e posti in allerta operativa massima.";
      if (step === 6) return "Gli Alpini friulani della Julia partono per l'Albania: nell'ottobre 1940 riceveranno l'ordine di sfondare le linee greche nel massiccio del Pindo e dell'Epiro.";
      if (step === 7) return "La tragedia e l'epopea della Julia in Grecia: i battaglioni alpini (Gemona, Cividale, Tolmezzo) resistono con eroismo indomito a forze soverchianti e al gelo del Pindo, guadagnandosi la leggenda del 'Miracolo della Julia'.";
      return "Udine accoglie con dolore e immenso orgoglio i reduci feriti della Julia; aprile 1941: le truppe italiane avanzano da Tarvisio e Cividale nell'invasione dell'Jugoslavia.";
    },
    getHistoricalName: (_step: number) => "Provincia del Friuli (Udine)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia del Friuli",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH43": {
    nuts: "ITH43",
    name: "Provincia di Gorizia (Venezia Giulia)",
    modernName: "Gorizia (GO, Friuli-Venezia Giulia)",
    historicalName: "Provincia di Gorizia (Venezia Giulia)",
    region: "Friuli-Venezia Giulia (Venezia Giulia)",
    keys: ["cormons", "goriska", "gorizia", "gorizia_go_friuli_venezia_giulia", "gorizia_venezia_giulia", "gradisca", "isonzo", "ith43", "monfalcone", "provincia_di_gorizia_venezia_giulia"],
    s0_1: "Provincia di frontiera della Venezia Giulia ricostituita nel 1927, comprendente l'intero bacino dell'alto e medio Isonzo (Gorizia, Gradisca, Monfalcone, Tolmino, Caporetto, Canale d'Isonzo e le storiche miniere di mercurio di Idria); dura italianizzazione fascista della popolazione slovena.",
    s2_4: "Le miniere statali di mercurio di Idria (le più ricche d'Europa) producono mercurio purissimo indispensabile per i detonatori al fulminato di mercurio di tutte le munizioni belliche dell'Asse; fortificazioni del Vallo Alpino a Passo di Circhina.",
    s5: "Gorizia diviene una piazzaforte avanzata della frontiera con l'Jugoslavia; le gallerie del Vallo Alpino vengono armate con cannoni e mitragliatrici pesanti.",
    s6: "I cantieri navali di Monfalcone (CRDA) completano a ritmo serrato sommergibili oceanici e navi scorta per la Regia Marina; Gorizia presidia il confine orientale.",
    s7: "Idria incrementa l'estrazione di mercurio per le esigenze dell'industria delle munizioni; le popolazioni dell'Isonzo vivono sotto stretto controllo militare.",
    s8: "6 aprile 1941: le divisioni del Regio Esercito scattano da Gorizia e Tolmino attraverso l'Isonzo nell'invasione dell'Jugoslavia, occupando la Carniola e aprendo la strada all'annessione di Lubiana.",
    getNote: (step: number) => {
      if (step <= 1) return "Provincia di frontiera della Venezia Giulia ricostituita nel 1927, comprendente l'intero bacino dell'alto e medio Isonzo (Gorizia, Gradisca, Monfalcone, Tolmino, Caporetto, Canale d'Isonzo e le storiche miniere di mercurio di Idria); dura italianizzazione fascista della popolazione slovena.";
      if (step <= 4) return "Le miniere statali di mercurio di Idria (le più ricche d'Europa) producono mercurio purissimo indispensabile per i detonatori al fulminato di mercurio di tutte le munizioni belliche dell'Asse; fortificazioni del Vallo Alpino a Passo di Circhina.";
      if (step === 5) return "Gorizia diviene una piazzaforte avanzata della frontiera con l'Jugoslavia; le gallerie del Vallo Alpino vengono armate con cannoni e mitragliatrici pesanti.";
      if (step === 6) return "I cantieri navali di Monfalcone (CRDA) completano a ritmo serrato sommergibili oceanici e navi scorta per la Regia Marina; Gorizia presidia il confine orientale.";
      if (step === 7) return "Idria incrementa l'estrazione di mercurio per le esigenze dell'industria delle munizioni; le popolazioni dell'Isonzo vivono sotto stretto controllo militare.";
      return "6 aprile 1941: le divisioni del Regio Esercito scattano da Gorizia e Tolmino attraverso l'Isonzo nell'invasione dell'Jugoslavia, occupando la Carniola e aprendo la strada all'annessione di Lubiana.";
    },
    getHistoricalName: (_step: number) => "Provincia di Gorizia (Venezia Giulia)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Gorizia (Venezia Giulia)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH44": {
    nuts: "ITH44",
    name: "Provincia di Trieste (Venezia Giulia)",
    modernName: "Provincia di Trieste (TS, Friuli-Venezia Giulia)",
    historicalName: "Provincia di Trieste (Venezia Giulia)",
    region: "Friuli-Venezia Giulia (Venezia Giulia)",
    keys: ["duino", "ith44", "muggia", "provincia_di_trieste_ts_friuli_venezia_giulia", "provincia_di_trieste_venezia_giulia", "trieste", "trieste_venezia_giulia", "venezia_giulia"],
    s0_1: "Capitale e perno cosmopolita della Venezia Giulia sul golfo omonimo, grandioso porto franco dell'Adriatico con il Lloyd Triestino, i Cantieri Riuniti dell'Adriatico (CRDA San Marco per corazzate e mercantili), la moderna raffineria Aquila e le acciaierie di Servola.",
    s2_4: "18 settembre 1938: Mussolini tiene a Trieste in piazza Unità d'Italia il tragico discorso che annuncia le leggi razziali antisemite; nei cantieri San Marco si costruisce a ritmo febbrile la corazzata Vittorio Veneto.",
    s5: "I cantieri CRDA di San Marco e Monfalcone lavorano su turni continui: varo e allestimento della corazzata Vittorio Veneto e della corazzata Roma; la raffineria Aquila lavora greggio.",
    s6: "Maggio 1940: entra in servizio la corazzata Vittorio Veneto che diverrà nave ammiraglia della Regia Marina; Trieste presidia le rotte adriatiche con flottiglie di MAS e dragamine.",
    s7: "I cantieri San Marco riparano cacciatorpediniere e incrociatori danneggiati negli scontri del Mediterraneo; la comunità ebraica triestina subisce le prime gravi persecuzioni.",
    s8: "Aprile 1941: il porto di Trieste coordina la logistica navale per l'invasione della Jugoslavia; Trieste accoglie i territori sloveni annessi e celebra la nuova espansione adriatica dell'Italia.",
    getNote: (step: number) => {
      if (step <= 1) return "Capitale e perno cosmopolita della Venezia Giulia sul golfo omonimo, grandioso porto franco dell'Adriatico con il Lloyd Triestino, i Cantieri Riuniti dell'Adriatico (CRDA San Marco per corazzate e mercantili), la moderna raffineria Aquila e le acciaierie di Servola.";
      if (step <= 4) return "18 settembre 1938: Mussolini tiene a Trieste in piazza Unità d'Italia il tragico discorso che annuncia le leggi razziali antisemite; nei cantieri San Marco si costruisce a ritmo febbrile la corazzata Vittorio Veneto.";
      if (step === 5) return "I cantieri CRDA di San Marco e Monfalcone lavorano su turni continui: varo e allestimento della corazzata Vittorio Veneto e della corazzata Roma; la raffineria Aquila lavora greggio.";
      if (step === 6) return "Maggio 1940: entra in servizio la corazzata Vittorio Veneto che diverrà nave ammiraglia della Regia Marina; Trieste presidia le rotte adriatiche con flottiglie di MAS e dragamine.";
      if (step === 7) return "I cantieri San Marco riparano cacciatorpediniere e incrociatori danneggiati negli scontri del Mediterraneo; la comunità ebraica triestina subisce le prime gravi persecuzioni.";
      return "Aprile 1941: il porto di Trieste coordina la logistica navale per l'invasione della Jugoslavia; Trieste accoglie i territori sloveni annessi e celebra la nuova espansione adriatica dell'Italia.";
    },
    getHistoricalName: (_step: number) => "Provincia di Trieste (Venezia Giulia)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Trieste (Capoluogo della Venezia Giulia)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH51": {
    nuts: "ITH51",
    name: "Provincia di Piacenza",
    modernName: "Piacenza (PC, Emilia-Romagna)",
    historicalName: "Provincia di Piacenza",
    region: "Emilia-Romagna",
    keys: ["fiorenzuola", "ith51", "piacenza", "piacenza_pc_emilia_romagna", "provincia_di_piacenza"],
    s0_1: "La 'Primogenita' sul fiume Po, storicamente fortificata con il grandioso Arsenale Militare di Piacenza (Polo Mantenimento Pesante Nord), caserme e prime esplorazioni petrolifere a Podenzano e Cortemaggiore (AGIP).",
    s2_4: "L'Arsenale Militare di Piacenza viene potenziato per la revisione e riparazione dei pezzi d'artiglieria campale e dei veicoli blindati del Regio Esercito; estrazione di petrolio e metano AGIP.",
    s5: "I pozzi petroliferi piacentini dell'AGIP forniscono greggio autarchico prezioso raffinato per produrre lubrificanti per veicoli militari; Piacenza snodo ferroviario protetto.",
    s6: "L'Arsenale ripara a getto continuo armi pesanti e affusti per i fronti di guerra; i ponti ferroviari e stradali sul Po vengono difesi da postazioni di contraerea.",
    s7: "Piacenza garantisce grano e salumi per l'alimentazione nazionale; le officine meccaniche piacentine producono bossoli e strumenti di puntamento per l'artiglieria.",
    s8: "Le officine dell'Arsenale lavorano su turni di 24 ore per rimettere in efficienza i cannoni logorati nei combattimenti in Grecia e Cirenaica.",
    getNote: (step: number) => {
      if (step <= 1) return "La 'Primogenita' sul fiume Po, storicamente fortificata con il grandioso Arsenale Militare di Piacenza (Polo Mantenimento Pesante Nord), caserme e prime esplorazioni petrolifere a Podenzano e Cortemaggiore (AGIP).";
      if (step <= 4) return "L'Arsenale Militare di Piacenza viene potenziato per la revisione e riparazione dei pezzi d'artiglieria campale e dei veicoli blindati del Regio Esercito; estrazione di petrolio e metano AGIP.";
      if (step === 5) return "I pozzi petroliferi piacentini dell'AGIP forniscono greggio autarchico prezioso raffinato per produrre lubrificanti per veicoli militari; Piacenza snodo ferroviario protetto.";
      if (step === 6) return "L'Arsenale ripara a getto continuo armi pesanti e affusti per i fronti di guerra; i ponti ferroviari e stradali sul Po vengono difesi da postazioni di contraerea.";
      if (step === 7) return "Piacenza garantisce grano e salumi per l'alimentazione nazionale; le officine meccaniche piacentine producono bossoli e strumenti di puntamento per l'artiglieria.";
      return "Le officine dell'Arsenale lavorano su turni di 24 ore per rimettere in efficienza i cannoni logorati nei combattimenti in Grecia e Cirenaica.";
    },
    getHistoricalName: (_step: number) => "Provincia di Piacenza",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Piacenza",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH52": {
    nuts: "ITH52",
    name: "Provincia di Parma",
    modernName: "Parma (PR, Emilia-Romagna)",
    historicalName: "Provincia di Parma",
    region: "Emilia-Romagna",
    keys: ["fidenza", "ith52", "parma", "parma_pr_emilia_romagna", "provincia_di_parma", "salsomaggiore"],
    s0_1: "Capitale ducale di storia e cultura con il Teatro Regio, il Battistero e la Cattedrale, perno mondiale dell'industria conserviera del pomodoro e della pasta alimentare (Barilla) e pozzi petroliferi di Vallezza a Fornovo di Taro.",
    s2_4: "L'industria conserviera e casearia (Parmigiano-Reggiano) viene integrata nel piano annonario nazionale per produrre milioni di razioni C per i soldati al fronte; Fornovo raffina petrolio.",
    s5: "Barilla converte parte degli stabilimenti alla produzione in serie di biscotti militari ad alta densità energetica e pasta secca d'ordinanza; i pozzi di Vallezza estraggono greggio.",
    s6: "Parma mobilita i suoi fanti per i fronti; la raffineria di Fornovo produce carburanti e solventi industriali per le industrie aeronautiche delle province vicine.",
    s7: "La campagna parmense assorbe sfollati dalle città costiere e industriali; la produzione agroalimentare parmense è dichiarata di priorità assoluta per il paese.",
    s8: "Parma fornisce un flusso costante di alimenti conservati alle truppe in Africa e nei Balcani, confermandosi capitale della nutrizione dell'esercito.",
    getNote: (step: number) => {
      if (step <= 1) return "Capitale ducale di storia e cultura con il Teatro Regio, il Battistero e la Cattedrale, perno mondiale dell'industria conserviera del pomodoro e della pasta alimentare (Barilla) e pozzi petroliferi di Vallezza a Fornovo di Taro.";
      if (step <= 4) return "L'industria conserviera e casearia (Parmigiano-Reggiano) viene integrata nel piano annonario nazionale per produrre milioni di razioni C per i soldati al fronte; Fornovo raffina petrolio.";
      if (step === 5) return "Barilla converte parte degli stabilimenti alla produzione in serie di biscotti militari ad alta densità energetica e pasta secca d'ordinanza; i pozzi di Vallezza estraggono greggio.";
      if (step === 6) return "Parma mobilita i suoi fanti per i fronti; la raffineria di Fornovo produce carburanti e solventi industriali per le industrie aeronautiche delle province vicine.";
      if (step === 7) return "La campagna parmense assorbe sfollati dalle città costiere e industriali; la produzione agroalimentare parmense è dichiarata di priorità assoluta per il paese.";
      return "Parma fornisce un flusso costante di alimenti conservati alle truppe in Africa e nei Balcani, confermandosi capitale della nutrizione dell'esercito.";
    },
    getHistoricalName: (_step: number) => "Provincia di Parma",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Parma",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH53": {
    nuts: "ITH53",
    name: "Provincia di Reggio Emilia",
    modernName: "Reggio nell'Emilia (RE, Emilia-Romagna)",
    historicalName: "Provincia di Reggio Emilia",
    region: "Emilia-Romagna",
    keys: ["correggio", "guastalla", "ith53", "provincia_di_reggio_emilia", "reggio_emilia", "reggio_nell_emilia", "reggio_nell_emilia_re_emilia_romagna"],
    s0_1: "La città del Tricolore e sede delle colossali Officine Meccaniche Reggiane (gruppo Caproni), il più vasto stabilimento industriale dell'Emilia, produttore di locomotive, proiettili d'artiglieria e caccia moderni con l'ingegner Roberto Longhi.",
    s2_4: "Roberto Longhi progetta e collauda il meraviglioso caccia monoplano Reggiane Re.2000 Falco (ispirato all'americano Seversky P-35), dalle eccezionali doti acrobatiche e autonomia; esportato in Ungheria e Svezia.",
    s5: "Le Reggiane impiegano oltre 12.000 operai lavorando giorno e notte: produzione dei caccia Re.2000 e progettazione del Re.2001 Falco II con motore tedesco Daimler-Benz.",
    s6: "I caccia Re.2000 entrano in linea nella Regia Aeronautica per scorte a lungo raggio nel Canale di Sicilia e vengono impiegati dalla Regia Marina come caccia catapultabili da corazzata.",
    s7: "Le Officine Reggiane ampliano le linee di montaggio per i caccia Re.2001 e proiettili d'artiglieria pesante; la cittadinanza reggiana offre rifugio e solidarietà ai lavoratori.",
    s8: "I caccia Reggiane dimostrano eccezionali doti operative nelle missioni di scorta ai convogli navali verso la Libia, confermando le Reggiane come eccellenza aeronautica nazionale.",
    getNote: (step: number) => {
      if (step <= 1) return "La città del Tricolore e sede delle colossali Officine Meccaniche Reggiane (gruppo Caproni), il più vasto stabilimento industriale dell'Emilia, produttore di locomotive, proiettili d'artiglieria e caccia moderni con l'ingegner Roberto Longhi.";
      if (step <= 4) return "Roberto Longhi progetta e collauda il meraviglioso caccia monoplano Reggiane Re.2000 Falco (ispirato all'americano Seversky P-35), dalle eccezionali doti acrobatiche e autonomia; esportato in Ungheria e Svezia.";
      if (step === 5) return "Le Reggiane impiegano oltre 12.000 operai lavorando giorno e notte: produzione dei caccia Re.2000 e progettazione del Re.2001 Falco II con motore tedesco Daimler-Benz.";
      if (step === 6) return "I caccia Re.2000 entrano in linea nella Regia Aeronautica per scorte a lungo raggio nel Canale di Sicilia e vengono impiegati dalla Regia Marina come caccia catapultabili da corazzata.";
      if (step === 7) return "Le Officine Reggiane ampliano le linee di montaggio per i caccia Re.2001 e proiettili d'artiglieria pesante; la cittadinanza reggiana offre rifugio e solidarietà ai lavoratori.";
      return "I caccia Reggiane dimostrano eccezionali doti operative nelle missioni di scorta ai convogli navali verso la Libia, confermando le Reggiane come eccellenza aeronautica nazionale.";
    },
    getHistoricalName: (_step: number) => "Provincia di Reggio Emilia",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Reggio Emilia",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH54": {
    nuts: "ITH54",
    name: "Provincia di Modena",
    modernName: "Modena (MO, Emilia-Romagna)",
    historicalName: "Provincia di Modena",
    region: "Emilia-Romagna",
    keys: ["carpi", "ith54", "mirandola", "modena", "modena_mo_emilia_romagna", "provincia_di_modena", "sassuolo"],
    s0_1: "Capitale estense con la torre della Ghirlandina e sede nel maestoso Palazzo Ducale della prestigiosa Accademia Militare di Modena (la più antica accademia militare del mondo per la formazione degli ufficiali dell'esercito) e prime officine di Enzo Ferrari (Scuderia Ferrari / Auto Avio Costruzioni).",
    s2_4: "L'Accademia Militare di Modena accelera i corsi per formare migliaia di giovani sottotenenti di fanteria, cavalleria e carristi destinati a guidare i plotoni in guerra.",
    s5: "Enzo Ferrari a Modena fonda la Auto Avio Costruzioni lavorando su commesse meccaniche di precisione e parti d'aereo per la Piaggio e la Breda; Carpi produce maglieria e uniformi.",
    s6: "I giovani ufficiali usciti da Modena guidano con coraggio i battaglioni nelle battaglie delle Alpi e del Mediterraneo; le officine modenesi producono spolette per l'esercito.",
    s7: "Modena accoglie comandi militari e centri di rifornimento; la produzione agricola (aceto balsamico, salumi, cereali) viene rigorosamente conferita agli ammassi di stato.",
    s8: "Le officine di Enzo Ferrari e le industrie metalmeccaniche modenesi sostengono la produzione di ricambi meccanici e strumenti idraulici per l'aviazione da combattimento.",
    getNote: (step: number) => {
      if (step <= 1) return "Capitale estense con la torre della Ghirlandina e sede nel maestoso Palazzo Ducale della prestigiosa Accademia Militare di Modena (la più antica accademia militare del mondo per la formazione degli ufficiali dell'esercito) e prime officine di Enzo Ferrari (Scuderia Ferrari / Auto Avio Costruzioni).";
      if (step <= 4) return "L'Accademia Militare di Modena accelera i corsi per formare migliaia di giovani sottotenenti di fanteria, cavalleria e carristi destinati a guidare i plotoni in guerra.";
      if (step === 5) return "Enzo Ferrari a Modena fonda la Auto Avio Costruzioni lavorando su commesse meccaniche di precisione e parti d'aereo per la Piaggio e la Breda; Carpi produce maglieria e uniformi.";
      if (step === 6) return "I giovani ufficiali usciti da Modena guidano con coraggio i battaglioni nelle battaglie delle Alpi e del Mediterraneo; le officine modenesi producono spolette per l'esercito.";
      if (step === 7) return "Modena accoglie comandi militari e centri di rifornimento; la produzione agricola (aceto balsamico, salumi, cereali) viene rigorosamente conferita agli ammassi di stato.";
      return "Le officine di Enzo Ferrari e le industrie metalmeccaniche modenesi sostengono la produzione di ricambi meccanici e strumenti idraulici per l'aviazione da combattimento.";
    },
    getHistoricalName: (_step: number) => "Provincia di Modena",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Modena",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH55": {
    nuts: "ITH55",
    name: "Provincia di Bologna",
    modernName: "Bologna (BO, Emilia-Romagna)",
    historicalName: "Provincia di Bologna",
    region: "Emilia-Romagna",
    keys: ["bologna", "bologna_bo_emilia_romagna", "casalecchio", "imola", "ith55", "provincia_di_bologna", "san_lazzaro"],
    s0_1: "Bologna 'la Dotta e la Grassa', la più antica università del mondo occidentale, le Due Torri, il più colossale nodo ferroviario d'incrocio tra nord e sud d'Italia (Bologna Centrale) e industrie di precisione (Ducati per radio e ottica, Calzoni per idraulica).",
    s2_4: "Lo scalo ferroviario di Bologna Centrale e il fascio merci di San Donato (il più grande d'Europa) divengono il polmone di transito supremo per tutti i treni militari della penisola.",
    s5: "Ducati converte la produzione alla fabbricazione di condensatori radio e apparecchi ottici per la difesa; Calzoni produce comandi idraulici per sommergibili e navi da guerra.",
    s6: "Bologna Centrale smista a ritmi frenetici le divisioni dirette agli imbarchi meridionali per l'Albania e la Libia; la città organizza una fitta rete di rifugi sotterranei.",
    s7: "La posizione nevralgica dello snodo bolognese lo rende bersaglio potenziale prioritario; installazione di possenti difese contraeree attorno ai ponti ferroviari del Reno e del Savena.",
    s8: "Bologna gestisce il transito ininterrotto delle truppe e dei materiali per il fronte greco-albanese e nordafricano, confermandosi crocevia insostituibile della nazione in guerra.",
    getNote: (step: number) => {
      if (step <= 1) return "Bologna 'la Dotta e la Grassa', la più antica università del mondo occidentale, le Due Torri, il più colossale nodo ferroviario d'incrocio tra nord e sud d'Italia (Bologna Centrale) e industrie di precisione (Ducati per radio e ottica, Calzoni per idraulica).";
      if (step <= 4) return "Lo scalo ferroviario di Bologna Centrale e il fascio merci di San Donato (il più grande d'Europa) divengono il polmone di transito supremo per tutti i treni militari della penisola.";
      if (step === 5) return "Ducati converte la produzione alla fabbricazione di condensatori radio e apparecchi ottici per la difesa; Calzoni produce comandi idraulici per sommergibili e navi da guerra.";
      if (step === 6) return "Bologna Centrale smista a ritmi frenetici le divisioni dirette agli imbarchi meridionali per l'Albania e la Libia; la città organizza una fitta rete di rifugi sotterranei.";
      if (step === 7) return "La posizione nevralgica dello snodo bolognese lo rende bersaglio potenziale prioritario; installazione di possenti difese contraeree attorno ai ponti ferroviari del Reno e del Savena.";
      return "Bologna gestisce il transito ininterrotto delle truppe e dei materiali per il fronte greco-albanese e nordafricano, confermandosi crocevia insostituibile della nazione in guerra.";
    },
    getHistoricalName: (_step: number) => "Provincia di Bologna",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Bologna",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH56": {
    nuts: "ITH56",
    name: "Provincia di Ferrara",
    modernName: "Ferrara (FE, Emilia-Romagna)",
    historicalName: "Provincia di Ferrara",
    region: "Emilia-Romagna",
    keys: ["cento", "comacchio", "copparo", "ferrara", "ferrara_fe_emilia_romagna", "ith56", "provincia_di_ferrara"],
    s0_1: "La splendida città rinascimentale degli Estensi (Palazzo dei Diamanti, Castello Estense), capitale dell'industria della barbabietola da zucchero (i grandi zuccherifici del Po) e le valli di Comacchio con la pesca delle anguille.",
    s2_4: "Gli zuccherifici ferraresi garantiscono la quasi totalità della produzione autarchica di zucchero ed etanolo per combustibili da autotrazione della nazione; ammodernamento delle bonifiche.",
    s5: "Lo zucchero e l'alcol industriale di Ferrara vengono dichiarati risorse strategiche di prima classe per l'ammasso e la sintesi di polveri senza fumo per munizioni.",
    s6: "I fanti ferraresi mobilitati per i fronti di guerra; le valli di Comacchio e il delta del Po vengono presidiati per scongiurare infiltrazioni nemiche dalla costa adriatica.",
    s7: "Ferrara accoglie famiglie di sfollati; la produzione di zucchero consente di mantenere le razioni alimentari essenziali per gli ospedali e la popolazione civile.",
    s8: "Gli impianti chimici e di distillazione ferraresi operano a ciclo continuo, fornendo alcol prezioso per le industrie farmaceutiche e degli esplosivi.",
    getNote: (step: number) => {
      if (step <= 1) return "La splendida città rinascimentale degli Estensi (Palazzo dei Diamanti, Castello Estense), capitale dell'industria della barbabietola da zucchero (i grandi zuccherifici del Po) e le valli di Comacchio con la pesca delle anguille.";
      if (step <= 4) return "Gli zuccherifici ferraresi garantiscono la quasi totalità della produzione autarchica di zucchero ed etanolo per combustibili da autotrazione della nazione; ammodernamento delle bonifiche.";
      if (step === 5) return "Lo zucchero e l'alcol industriale di Ferrara vengono dichiarati risorse strategiche di prima classe per l'ammasso e la sintesi di polveri senza fumo per munizioni.";
      if (step === 6) return "I fanti ferraresi mobilitati per i fronti di guerra; le valli di Comacchio e il delta del Po vengono presidiati per scongiurare infiltrazioni nemiche dalla costa adriatica.";
      if (step === 7) return "Ferrara accoglie famiglie di sfollati; la produzione di zucchero consente di mantenere le razioni alimentari essenziali per gli ospedali e la popolazione civile.";
      return "Gli impianti chimici e di distillazione ferraresi operano a ciclo continuo, fornendo alcol prezioso per le industrie farmaceutiche e degli esplosivi.";
    },
    getHistoricalName: (_step: number) => "Provincia di Ferrara",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Ferrara",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH57": {
    nuts: "ITH57",
    name: "Provincia di Ravenna",
    modernName: "Ravenna (RA, Emilia-Romagna)",
    historicalName: "Provincia di Ravenna",
    region: "Emilia-Romagna (Romagna)",
    keys: ["faenza", "ith57", "lugo", "provincia_di_ravenna", "ravenna", "ravenna_ra_emilia_romagna"],
    s0_1: "L'antica capitale dell'Impero Romano d'Occidente e di Bisanzio celebre per i sublimi mosaici paleocristiani (San Vitale, Sant'Apollinare), la tomba di Dante Alighieri e il porto canale di Porto Corsini (Marina di Ravenna).",
    s2_4: "Misure protettive speciali per i mosaici e i monumenti bizantini; Porto Corsini viene attrezzato come base ausiliaria della Regia Marina per dragamine e motosiluranti.",
    s5: "Istituzione di posti d'avvistamento aereo e navale lungo la costa romagnola; le ceramiche artistiche di Faenza e le officine di Lugo riconvertono lavorazioni a stoviglie da campo.",
    s6: "Le motosiluranti e i pescherecci armati di Porto Corsini pattugliano l'alto Adriatico a protezione delle rotte commerciali con la Jugoslavia e l'Albania.",
    s7: "Porto Corsini accoglie convogli costieri e sottomarini di rientro; la fertile pianura ravennate massimizza i raccolti di grano, canapa e barbabietola da zucchero.",
    s8: "Sorveglianza serrata contro incursioni aeree e posamine nemiche nelle acque adriatiche; Ravenna preserva intatti i suoi capolavori artistici millenari.",
    getNote: (step: number) => {
      if (step <= 1) return "L'antica capitale dell'Impero Romano d'Occidente e di Bisanzio celebre per i sublimi mosaici paleocristiani (San Vitale, Sant'Apollinare), la tomba di Dante Alighieri e il porto canale di Porto Corsini (Marina di Ravenna).";
      if (step <= 4) return "Misure protettive speciali per i mosaici e i monumenti bizantini; Porto Corsini viene attrezzato come base ausiliaria della Regia Marina per dragamine e motosiluranti.";
      if (step === 5) return "Istituzione di posti d'avvistamento aereo e navale lungo la costa romagnola; le ceramiche artistiche di Faenza e le officine di Lugo riconvertono lavorazioni a stoviglie da campo.";
      if (step === 6) return "Le motosiluranti e i pescherecci armati di Porto Corsini pattugliano l'alto Adriatico a protezione delle rotte commerciali con la Jugoslavia e l'Albania.";
      if (step === 7) return "Porto Corsini accoglie convogli costieri e sottomarini di rientro; la fertile pianura ravennate massimizza i raccolti di grano, canapa e barbabietola da zucchero.";
      return "Sorveglianza serrata contro incursioni aeree e posamine nemiche nelle acque adriatiche; Ravenna preserva intatti i suoi capolavori artistici millenari.";
    },
    getHistoricalName: (_step: number) => "Provincia di Ravenna",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Ravenna",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH58": {
    nuts: "ITH58",
    name: "Provincia di Forlì",
    modernName: "Forlì-Cesena (FC, Emilia-Romagna)",
    historicalName: "Provincia di Forlì",
    region: "Emilia-Romagna (Romagna)",
    keys: ["castrocaro", "cesena", "cesenatico", "forl", "forl_cesena_fc_emilia_romagna", "forli", "forli_cesena", "ith58", "predappio", "provincia_di_forl"],
    s0_1: "La simbolica 'Provincia del Duce' (Mussolini nacque a Predappio nel 1883), oggetto di grandiose opere monumentali fasciste (Rocca delle Caminate, il viale monumentale della stazione a Forlì), il polo aeronautico Caproni a Forlì e il Collegio Aeronautico della GIL.",
    s2_4: "Predappio diviene meta di continui pellegrinaggi patriottici di regime; a Forlì gli stabilimenti Caproni costruiscono in serie bombardieri bimotore Caproni Ca.133 e ricognitori Ca.311 per la Regia Aeronautica.",
    s5: "Rocca delle Caminate diviene la residenza estiva e di lavoro di Mussolini in Romagna, dotata di faro tricolore da 8.000 candele che segnala la presenza del Duce.",
    s6: "Gli aerei Caproni costruiti a Forlì vengono impiegati nei fronti coloniali e metropolitani; i giovani del Collegio Aeronautico di Forlì vengono arruolati come piloti da caccia.",
    s7: "Forlì e Predappio celebrano le vittorie del regime tra crescenti difficoltà economiche; Cesena garantisce ortofrutta e sementi per il razionamento alimentare.",
    s8: "La fabbrica aeronautica Caproni di Forlì continua la produzione di ricognitori e addestratori bimotore; crescente austerità nella provincia d'origine del capo del governo.",
    getNote: (step: number) => {
      if (step <= 1) return "La simbolica 'Provincia del Duce' (Mussolini nacque a Predappio nel 1883), oggetto di grandiose opere monumentali fasciste (Rocca delle Caminate, il viale monumentale della stazione a Forlì), il polo aeronautico Caproni a Forlì e il Collegio Aeronautico della GIL.";
      if (step <= 4) return "Predappio diviene meta di continui pellegrinaggi patriottici di regime; a Forlì gli stabilimenti Caproni costruiscono in serie bombardieri bimotore Caproni Ca.133 e ricognitori Ca.311 per la Regia Aeronautica.";
      if (step === 5) return "Rocca delle Caminate diviene la residenza estiva e di lavoro di Mussolini in Romagna, dotata di faro tricolore da 8.000 candele che segnala la presenza del Duce.";
      if (step === 6) return "Gli aerei Caproni costruiti a Forlì vengono impiegati nei fronti coloniali e metropolitani; i giovani del Collegio Aeronautico di Forlì vengono arruolati come piloti da caccia.";
      if (step === 7) return "Forlì e Predappio celebrano le vittorie del regime tra crescenti difficoltà economiche; Cesena garantisce ortofrutta e sementi per il razionamento alimentare.";
      return "La fabbrica aeronautica Caproni di Forlì continua la produzione di ricognitori e addestratori bimotore; crescente austerità nella provincia d'origine del capo del governo.";
    },
    getHistoricalName: (_step: number) => "Provincia di Forlì",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Forlì",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITH59": {
    nuts: "ITH59",
    name: "Rimini (Provincia di Forlì)",
    modernName: "Rimini (RN, Emilia-Romagna)",
    historicalName: "Rimini (Provincia di Forlì)",
    region: "Emilia-Romagna (Romagna)",
    keys: ["bellaria", "cattolica", "ith59", "riccione", "rimini", "rimini_forl", "rimini_provincia_di_forl", "rimini_rn_emilia_romagna"],
    s0_1: "La celebre capitale balneare della Riviera Romagnola con l'Arco d'Augusto romano, il Ponte di Tiberio, i grandiosi stabilimenti marittimi e la residenza estiva della famiglia Mussolini a Villa Mussolini a Riccione; aggregata alla Provincia di Forlì.",
    s2_4: "Riccione e Rimini accolgono i soggiorni estivi del Duce e dei gerarchi fascisti; piani per la difesa passiva delle lunghe spiagge sabbiose dell'Adriatico.",
    s5: "Le colonie elioterapiche per bambini e i grandi alberghi del litorale riminese vengono adibiti a ospedali militari di riserva e caserme temporanee per la milizia.",
    s6: "Le spiagge di Rimini e Riccione vengono oscurate e sbarrate con cavalli di Frisia e postazioni per mitragliatrici a difesa del litorale adriatico.",
    s7: "La flotta peschereccia di Rimini e Cesenatico continua a uscire in mare sotto costante minaccia di mine per fornire pesce fresco alla popolazione razionata.",
    s8: "Rimini funge da centro logistico e ospedaliero per le divisioni e i feriti che transitano lungo la ferrovia adriatica verso i Balcani.",
    getNote: (step: number) => {
      if (step <= 1) return "La celebre capitale balneare della Riviera Romagnola con l'Arco d'Augusto romano, il Ponte di Tiberio, i grandiosi stabilimenti marittimi e la residenza estiva della famiglia Mussolini a Villa Mussolini a Riccione; aggregata alla Provincia di Forlì.";
      if (step <= 4) return "Riccione e Rimini accolgono i soggiorni estivi del Duce e dei gerarchi fascisti; piani per la difesa passiva delle lunghe spiagge sabbiose dell'Adriatico.";
      if (step === 5) return "Le colonie elioterapiche per bambini e i grandi alberghi del litorale riminese vengono adibiti a ospedali militari di riserva e caserme temporanee per la milizia.";
      if (step === 6) return "Le spiagge di Rimini e Riccione vengono oscurate e sbarrate con cavalli di Frisia e postazioni per mitragliatrici a difesa del litorale adriatico.";
      if (step === 7) return "La flotta peschereccia di Rimini e Cesenatico continua a uscire in mare sotto costante minaccia di mine per fornire pesce fresco alla popolazione razionata.";
      return "Rimini funge da centro logistico e ospedaliero per le divisioni e i feriti che transitano lungo la ferrovia adriatica verso i Balcani.";
    },
    getHistoricalName: (_step: number) => "Rimini (Provincia di Forlì)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Circondario di Rimini (Provincia di Forlì)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI11": {
    nuts: "ITI11",
    name: "Provincia di Massa e Carrara",
    modernName: "Massa-Carrara",
    historicalName: "Provincia di Massa e Carrara",
    region: "Toscana",
    keys: ["apuania", "aulla", "carrara", "iti11", "massa", "massa_carrara", "massa_e_carrara", "pontremoli", "provincia_di_massa_e_carrara"],
    s0_1: "Nel 1936 la provincia di Massa e Carrara vive sotto la spinta dell'autarchia fascista: nel 1938 il regime decreta la fusione dei comuni di Massa, Carrara e Montignoso nella nuova 'Apuania', per concentrare l'estrazione marmifera e l'industria chimica e meccanica nella Zona Industriale Apuana.",
    s2_4: "Nel 1938-1939, formalizzata la provincia di Apuania con capoluogo unico, si potenziano le cave di marmo e le industrie chimiche Montecatini e siderurgiche nell'area costiera, convertite a produzioni per la difesa e lo sforzo autarchico del Patto d'Acciaio.",
    s5: "Tra la fine del 1939 e la primavera del 1940, la provincia di Apuania osserva la non belligeranza con il razionamento dei carburanti e del cibo; le maestranze industriali e i cavatori affrontano le tessere annonarie e le commesse belliche per leghe leggere ed esplosivi.",
    s6: "Giugno 1940: con l'entrata in guerra dell'Italia, gli impianti chimico-siderurgici di Apuania intensificano i turni di lavoro per rifornire la Marina e l'Esercito; la costa tirrenica viene oscurata contro eventuali incursioni navali o aeree anglo-francesi.",
    s7: "Autunno 1940: richiamo alle armi dei giovani apuani per il fronte greco-albanese; le famiglie subiscono i primi lutti e le restrizioni alimentari, mentre la produzione marmifera d'esportazione crolla del tutto per il blocco navale britannico.",
    s8: "Primavera 1941: Apuania è pienamente integrata nell'economia di guerra dell'Asse; mentre il fronte dei Balcani si accende e le truppe dell'Asse invadono la Jugoslavia e la Grecia, le cave e gli stabilimenti lavorano sotto rigido controllo militare.",
    getNote: (step: number) => {
      if (step <= 1) return "Nel 1936 la provincia di Massa e Carrara vive sotto la spinta dell'autarchia fascista: nel 1938 il regime decreta la fusione dei comuni di Massa, Carrara e Montignoso nella nuova 'Apuania', per concentrare l'estrazione marmifera e l'industria chimica e meccanica nella Zona Industriale Apuana.";
      if (step <= 4) return "Nel 1938-1939, formalizzata la provincia di Apuania con capoluogo unico, si potenziano le cave di marmo e le industrie chimiche Montecatini e siderurgiche nell'area costiera, convertite a produzioni per la difesa e lo sforzo autarchico del Patto d'Acciaio.";
      if (step === 5) return "Tra la fine del 1939 e la primavera del 1940, la provincia di Apuania osserva la non belligeranza con il razionamento dei carburanti e del cibo; le maestranze industriali e i cavatori affrontano le tessere annonarie e le commesse belliche per leghe leggere ed esplosivi.";
      if (step === 6) return "Giugno 1940: con l'entrata in guerra dell'Italia, gli impianti chimico-siderurgici di Apuania intensificano i turni di lavoro per rifornire la Marina e l'Esercito; la costa tirrenica viene oscurata contro eventuali incursioni navali o aeree anglo-francesi.";
      if (step === 7) return "Autunno 1940: richiamo alle armi dei giovani apuani per il fronte greco-albanese; le famiglie subiscono i primi lutti e le restrizioni alimentari, mentre la produzione marmifera d'esportazione crolla del tutto per il blocco navale britannico.";
      return "Primavera 1941: Apuania è pienamente integrata nell'economia di guerra dell'Asse; mentre il fronte dei Balcani si accende e le truppe dell'Asse invadono la Jugoslavia e la Grecia, le cave e gli stabilimenti lavorano sotto rigido controllo militare.";
    },
    getHistoricalName: (step: number) => (step >= 2 ? 'Provincia di Apuania' : 'Provincia di Massa e Carrara'),
    getAdminTitle: (step: number) => (step >= 2 ? "Regno d'Italia — Provincia di Apuania" : "Regno d'Italia — Provincia di Massa e Carrara"),
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI12": {
    nuts: "ITI12",
    name: "Provincia di Lucca",
    modernName: "Lucca",
    historicalName: "Provincia di Lucca",
    region: "Toscana",
    keys: ["garfagnana", "iti12", "lucca", "pietrasanta", "provincia_di_lucca", "versilia", "viareggio"],
    s0_1: "Provincia operosa caratterizzata da cartiere storiche, manifattura tabacchi e settore serico; durante la campagna etiopica del 1935-1936 e le sanzioni ginevrine, Lucca partecipa attivamente alla raccolta dell'Oro alla Patria e alla riconversione delle fibre autarchiche.",
    s2_4: "Negli anni 1938-1939 l'attività agricola della piana lucchese e la produzione serica e cartaria riforniscono la domanda nazionale; la Versilia balneare (Viareggio) ospita l'élite e la diplomazia dell'Asse mentre a Viareggio operano rinomati cantieri navali in legno.",
    s5: "Autunno 1939 - primavera 1940: durante la 'non belligeranza', Lucca risente della scarsità di cellulosa e materie prime d'importazione; i cantieri navali di Viareggio vengono precettati per la costruzione di MAS e naviglio sottile ausiliario per la Regia Marina.",
    s6: "Giugno 1940: l'ingresso in guerra mobilità i reggimenti toscani verso le Alpi Occidentali; la costa della Versilia viene sottoposta a rigoroso coprifuoco e allestimento di postazioni costiere antinave.",
    s7: "Fine 1940: fanti lucchesi combattono nel fango e nella neve dell'Epiro e del Pindo in Grecia; a Lucca arrivano i primi convogli di feriti e il razionamento dei beni di prima necessità si fa stringente.",
    s8: "Aprile 1941: con l'offensiva dell'Asse contro Jugoslavia e Grecia e le vittorie temporanee nei Balcani, la provincia sopporta le privazioni della guerra di logoramento e il controllo statale sulle derrate alimentari e olearie.",
    getNote: (step: number) => {
      if (step <= 1) return "Provincia operosa caratterizzata da cartiere storiche, manifattura tabacchi e settore serico; durante la campagna etiopica del 1935-1936 e le sanzioni ginevrine, Lucca partecipa attivamente alla raccolta dell'Oro alla Patria e alla riconversione delle fibre autarchiche.";
      if (step <= 4) return "Negli anni 1938-1939 l'attività agricola della piana lucchese e la produzione serica e cartaria riforniscono la domanda nazionale; la Versilia balneare (Viareggio) ospita l'élite e la diplomazia dell'Asse mentre a Viareggio operano rinomati cantieri navali in legno.";
      if (step === 5) return "Autunno 1939 - primavera 1940: durante la 'non belligeranza', Lucca risente della scarsità di cellulosa e materie prime d'importazione; i cantieri navali di Viareggio vengono precettati per la costruzione di MAS e naviglio sottile ausiliario per la Regia Marina.";
      if (step === 6) return "Giugno 1940: l'ingresso in guerra mobilità i reggimenti toscani verso le Alpi Occidentali; la costa della Versilia viene sottoposta a rigoroso coprifuoco e allestimento di postazioni costiere antinave.";
      if (step === 7) return "Fine 1940: fanti lucchesi combattono nel fango e nella neve dell'Epiro e del Pindo in Grecia; a Lucca arrivano i primi convogli di feriti e il razionamento dei beni di prima necessità si fa stringente.";
      return "Aprile 1941: con l'offensiva dell'Asse contro Jugoslavia e Grecia e le vittorie temporanee nei Balcani, la provincia sopporta le privazioni della guerra di logoramento e il controllo statale sulle derrate alimentari e olearie.";
    },
    getHistoricalName: (_step: number) => "Provincia di Lucca",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Lucca",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI13": {
    nuts: "ITI13",
    name: "Provincia di Pistoia",
    modernName: "Pistoia",
    historicalName: "Provincia di Pistoia",
    region: "Toscana",
    keys: ["iti13", "montecatini", "montecatini_terme", "pescia", "pistoia", "provincia_di_pistoia"],
    s0_1: "Istituita nel 1927, la provincia di Pistoia vanta una solida tradizione metalmeccanica con le Officine San Giorgio (costruzione di materiale rotabile, motori e armamenti leggeri) e la produzione florovivaistica e boschiva dell'Appennino tosco-emiliano.",
    s2_4: "Tra il 1938 e il 1939 gli stabilimenti San Giorgio espandono le linee per ordigni bellici e parti meccaniche per i veicoli dell'Esercito; la ferrovia Porrettana collega Pistoia con Bologna fungendo da arteria strategica attraverso l'Appennino.",
    s5: "Settembre 1939 - maggio 1940: con lo scoppio della seconda guerra mondiale in Europa, Pistoia adegua i ritmi di produzione ferroviaria e meccanica alle riserve belliche della mobilitazione fascista; arrivano le tessere per tessuti e grassi.",
    s6: "Giugno 1940: dichiarazione di guerra dal balcone di Roma; le fabbriche pistoiesi lavorano a ciclo continuo e le linee telegrafiche e ferroviarie verso nord sono sorvegliate dalla Milizia Ferroviaria.",
    s7: "Autunno 1940: reparti pistoiesi inviati al fronte albanese affrontano le durissime battaglie difensive contro la controffensiva greca; la popolazione civile sperimenta la borsa nera e le restrizioni termiche per l'inverno.",
    s8: "Aprile 1941: il passaggio di convogli militari italo-tedeschi diretti verso il Brennero e i porti d'imbarco meridionali rende le Officine San Giorgio e lo scalo merci di Pistoia nodi vitali della logistica dell'Asse.",
    getNote: (step: number) => {
      if (step <= 1) return "Istituita nel 1927, la provincia di Pistoia vanta una solida tradizione metalmeccanica con le Officine San Giorgio (costruzione di materiale rotabile, motori e armamenti leggeri) e la produzione florovivaistica e boschiva dell'Appennino tosco-emiliano.";
      if (step <= 4) return "Tra il 1938 e il 1939 gli stabilimenti San Giorgio espandono le linee per ordigni bellici e parti meccaniche per i veicoli dell'Esercito; la ferrovia Porrettana collega Pistoia con Bologna fungendo da arteria strategica attraverso l'Appennino.";
      if (step === 5) return "Settembre 1939 - maggio 1940: con lo scoppio della seconda guerra mondiale in Europa, Pistoia adegua i ritmi di produzione ferroviaria e meccanica alle riserve belliche della mobilitazione fascista; arrivano le tessere per tessuti e grassi.";
      if (step === 6) return "Giugno 1940: dichiarazione di guerra dal balcone di Roma; le fabbriche pistoiesi lavorano a ciclo continuo e le linee telegrafiche e ferroviarie verso nord sono sorvegliate dalla Milizia Ferroviaria.";
      if (step === 7) return "Autunno 1940: reparti pistoiesi inviati al fronte albanese affrontano le durissime battaglie difensive contro la controffensiva greca; la popolazione civile sperimenta la borsa nera e le restrizioni termiche per l'inverno.";
      return "Aprile 1941: il passaggio di convogli militari italo-tedeschi diretti verso il Brennero e i porti d'imbarco meridionali rende le Officine San Giorgio e lo scalo merci di Pistoia nodi vitali della logistica dell'Asse.";
    },
    getHistoricalName: (_step: number) => "Provincia di Pistoia",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Pistoia",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI14": {
    nuts: "ITI14",
    name: "Provincia di Firenze",
    modernName: "Firenze",
    historicalName: "Provincia di Firenze",
    region: "Toscana",
    keys: ["empoli", "firenze", "florence", "iti14", "provincia_di_firenze", "scandicci", "sesto_fiorentino", "toscana"],
    s0_1: "Culla del fascismo toscano (gerarca Alessandro Pavolini) e polo di eccellenza industriale con le Officine Galileo (ottica di precisione e telemetri navali), la Pignone (compressori e munizioni) e la Scuola di Applicazione Aeronautica alle Cascine fondata nel 1937.",
    s2_4: "Nel maggio 1938 Firenze accoglie la visita di Adolf Hitler e Mussolini in pompa magna al piazzale Michelangelo; in autunno le leggi razziali colpiscono la storica e vivace comunità ebraica fiorentina, radiata dalle università e dalle professioni.",
    s5: "Tra la non belligeranza del 1939 e l'inizio del 1940, la Galileo e la Pignone accelerano la produzione di telemetri per le corazzate Littorio e Vittorio Veneto e congegni di mira per l'artiglieria; Firenze ospita grandi raduni giovanili dei GUF.",
    s6: "10 giugno 1940: l'adunata oceanica in piazza della Signoria celebra l'entrata in guerra; le Officine Galileo diventano installazione militare segreta primaria e si allestisce la protezione antiaerea sui monumenti storici.",
    s7: "Autunno 1940: il 28 ottobre 1940 Hitler e Mussolini si incontrano a Firenze alla Stazione di Santa Maria Novella, proprio nel giorno in cui l'Italia sferra l'attacco alla Grecia; intanto l'ospedale militare di Careggi comincia ad accogliere centinaia di mutilati dal fronte greco.",
    s8: "Aprile 1941: mentre la Wehrmacht interviene nei Balcani per salvare le armate italiane in difficoltà, Firenze vive le crescenti privazioni economiche, le file per il pane e la tensione clandestina antifascista.",
    getNote: (step: number) => {
      if (step <= 1) return "Culla del fascismo toscano (gerarca Alessandro Pavolini) e polo di eccellenza industriale con le Officine Galileo (ottica di precisione e telemetri navali), la Pignone (compressori e munizioni) e la Scuola di Applicazione Aeronautica alle Cascine fondata nel 1937.";
      if (step <= 4) return "Nel maggio 1938 Firenze accoglie la visita di Adolf Hitler e Mussolini in pompa magna al piazzale Michelangelo; in autunno le leggi razziali colpiscono la storica e vivace comunità ebraica fiorentina, radiata dalle università e dalle professioni.";
      if (step === 5) return "Tra la non belligeranza del 1939 e l'inizio del 1940, la Galileo e la Pignone accelerano la produzione di telemetri per le corazzate Littorio e Vittorio Veneto e congegni di mira per l'artiglieria; Firenze ospita grandi raduni giovanili dei GUF.";
      if (step === 6) return "10 giugno 1940: l'adunata oceanica in piazza della Signoria celebra l'entrata in guerra; le Officine Galileo diventano installazione militare segreta primaria e si allestisce la protezione antiaerea sui monumenti storici.";
      if (step === 7) return "Autunno 1940: il 28 ottobre 1940 Hitler e Mussolini si incontrano a Firenze alla Stazione di Santa Maria Novella, proprio nel giorno in cui l'Italia sferra l'attacco alla Grecia; intanto l'ospedale militare di Careggi comincia ad accogliere centinaia di mutilati dal fronte greco.";
      return "Aprile 1941: mentre la Wehrmacht interviene nei Balcani per salvare le armate italiane in difficoltà, Firenze vive le crescenti privazioni economiche, le file per il pane e la tensione clandestina antifascista.";
    },
    getHistoricalName: (_step: number) => "Provincia di Firenze",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Firenze",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI15": {
    nuts: "ITI15",
    name: "Prato (Provincia di Firenze)",
    modernName: "Prato",
    historicalName: "Prato (Provincia di Firenze)",
    region: "Toscana",
    keys: ["iti15", "prato", "prato_firenze", "prato_provincia_di_firenze", "val_di_bisenzio"],
    s0_1: "Nel 1936-1938 Prato è il capitale del distretto tessile toscano (compresa amministrativamente nella provincia di Firenze fino al 1992): le sue filature e lanifici sono all'avanguardia mondiale nel riciclo meccanico della lana meccanica ('stracci' e lana rigenerata).",
    s2_4: "Durante la politica autarchica e l'applicazione delle fibre sintetiche (Lanital alla caseina), i lanifici pratesi ricevono enormi commesse statali per la fornitura di panni e uniformi di panno grigioverde per il Regio Esercito.",
    s5: "Settembre 1939 - primavera 1940: la non belligeranza vede i telai pratesi girare a pieno regime per accumulare riserve di coperte da campo, teloni e tenute invernali; la manodopera locale subisce turni pesanti e sorveglianza politica fascista.",
    s6: "Giugno 1940: con l'entrata in guerra, l'intero comparto laniero pratese viene militarizzato sotto la gestione dei consorzi tessili bellici per rifornire milioni di soldati mobilitati.",
    s7: "Autunno-inverno 1940: l'emergenza gelo e fango sul fronte greco-albanese mette sotto pressione i lanifici di Prato, costretti a produrre a ritmi record passamontagna, guanti e mantelline per i fanti al fronte.",
    s8: "Aprile 1941: Prato continua a rappresentare il cardine dell'approvvigionamento tessile militare dell'Italia fascista, nonostante la cronica scarsità di materie prime vergini e le riduzioni delle razioni di farina per gli operai.",
    getNote: (step: number) => {
      if (step <= 1) return "Nel 1936-1938 Prato è il capitale del distretto tessile toscano (compresa amministrativamente nella provincia di Firenze fino al 1992): le sue filature e lanifici sono all'avanguardia mondiale nel riciclo meccanico della lana meccanica ('stracci' e lana rigenerata).";
      if (step <= 4) return "Durante la politica autarchica e l'applicazione delle fibre sintetiche (Lanital alla caseina), i lanifici pratesi ricevono enormi commesse statali per la fornitura di panni e uniformi di panno grigioverde per il Regio Esercito.";
      if (step === 5) return "Settembre 1939 - primavera 1940: la non belligeranza vede i telai pratesi girare a pieno regime per accumulare riserve di coperte da campo, teloni e tenute invernali; la manodopera locale subisce turni pesanti e sorveglianza politica fascista.";
      if (step === 6) return "Giugno 1940: con l'entrata in guerra, l'intero comparto laniero pratese viene militarizzato sotto la gestione dei consorzi tessili bellici per rifornire milioni di soldati mobilitati.";
      if (step === 7) return "Autunno-inverno 1940: l'emergenza gelo e fango sul fronte greco-albanese mette sotto pressione i lanifici di Prato, costretti a produrre a ritmi record passamontagna, guanti e mantelline per i fanti al fronte.";
      return "Aprile 1941: Prato continua a rappresentare il cardine dell'approvvigionamento tessile militare dell'Italia fascista, nonostante la cronica scarsità di materie prime vergini e le riduzioni delle razioni di farina per gli operai.";
    },
    getHistoricalName: (_step: number) => "Prato (Provincia di Firenze)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Circondario di Prato (Provincia di Firenze)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI16": {
    nuts: "ITI16",
    name: "Provincia di Livorno",
    modernName: "Livorno",
    historicalName: "Provincia di Livorno",
    region: "Toscana",
    keys: ["cecina", "elba", "isola_d_elba", "iti16", "leghorn", "livorno", "piombino", "porto_ferraio", "provincia_di_livorno"],
    s0_1: "Città natale di Galeazzo Ciano e di Costanzo Ciano, Livorno è sede della prestigiosa Regia Accademia Navale, dei Cantieri Ansaldo Orlando (costruzione di incrociatori e cacciatorpediniere) e dell'industria metallurgica di Piombino e dell'isola d'Elba (ferro e ghisa).",
    s2_4: "1938-1939: Livorno e Piombino beneficiano del piano navale fascista; all'Accademia Navale si formano gli ufficiali che guideranno le squadre navali nel Mediterraneo; le acciaierie di Piombino alimentano la produzione corazzata nazionale.",
    s5: "Tra la fine del 1939 e il maggio 1940, Livorno funge da base logistica navale; con la morte di Costanzo Ciano (1939), il gerarca Galeazzo Ciano mantiene la forte influenza politica sulla città; i sommergibili della Regia Marina compiono manovre nel Tirreno.",
    s6: "Giugno 1940: il porto di Livorno e le raffinerie dell'ANIC subiscono già nella notte tra il 15 e il 16 giugno e nei giorni seguenti i primi bombardamenti aeronavali francesi e della RAF; l'Accademia Navale accelera i corsi per inviare allievi sulle unità da guerra.",
    s7: "Autunno 1940: Livorno ospita basi di motosiluranti e cacciatorpediniere per la scorta convogli verso la Sardegna e l'Africa Settentrionale; intensificate le batterie costiere e le difese contraeree a protezione della rada e degli altiforni di Piombino.",
    s8: "Primavera 1941: il porto di Livorno è bersaglio ricorrente di raid aerei britannici da Malta e portaerei; la città piange le perdite navali di Capo Matapan, dove cadono molti giovani ufficiali usciti dall'Accademia Navale livornese.",
    getNote: (step: number) => {
      if (step <= 1) return "Città natale di Galeazzo Ciano e di Costanzo Ciano, Livorno è sede della prestigiosa Regia Accademia Navale, dei Cantieri Ansaldo Orlando (costruzione di incrociatori e cacciatorpediniere) e dell'industria metallurgica di Piombino e dell'isola d'Elba (ferro e ghisa).";
      if (step <= 4) return "1938-1939: Livorno e Piombino beneficiano del piano navale fascista; all'Accademia Navale si formano gli ufficiali che guideranno le squadre navali nel Mediterraneo; le acciaierie di Piombino alimentano la produzione corazzata nazionale.";
      if (step === 5) return "Tra la fine del 1939 e il maggio 1940, Livorno funge da base logistica navale; con la morte di Costanzo Ciano (1939), il gerarca Galeazzo Ciano mantiene la forte influenza politica sulla città; i sommergibili della Regia Marina compiono manovre nel Tirreno.";
      if (step === 6) return "Giugno 1940: il porto di Livorno e le raffinerie dell'ANIC subiscono già nella notte tra il 15 e il 16 giugno e nei giorni seguenti i primi bombardamenti aeronavali francesi e della RAF; l'Accademia Navale accelera i corsi per inviare allievi sulle unità da guerra.";
      if (step === 7) return "Autunno 1940: Livorno ospita basi di motosiluranti e cacciatorpediniere per la scorta convogli verso la Sardegna e l'Africa Settentrionale; intensificate le batterie costiere e le difese contraeree a protezione della rada e degli altiforni di Piombino.";
      return "Primavera 1941: il porto di Livorno è bersaglio ricorrente di raid aerei britannici da Malta e portaerei; la città piange le perdite navali di Capo Matapan, dove cadono molti giovani ufficiali usciti dall'Accademia Navale livornese.";
    },
    getHistoricalName: (_step: number) => "Provincia di Livorno",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Livorno",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI17": {
    nuts: "ITI17",
    name: "Provincia di Pisa",
    modernName: "Pisa",
    historicalName: "Provincia di Pisa",
    region: "Toscana",
    keys: ["iti17", "pisa", "pontedera", "provincia_di_pisa", "san_miniato", "volterra"],
    s0_1: "Polo universitario e scientifico (con la Scuola Normale Superiore), aeroporto militare di San Giusto e sede a Pontedera degli stabilimenti Piaggio (produzione di motori aeronautici, bombardieri Piaggio P.108 a quattro motori e aerei da ricognizione).",
    s2_4: "Nel 1938-1939 a Pontedera e Pisa la Piaggio espande la produzione aviatoria; l'ingegner Corradino D'Ascanio e lo staff tecnico sviluppano innovazioni nel campo delle eliche a passo variabile e dei propulsori stellari per la Regia Aeronautica.",
    s5: "Fine 1939 - maggio 1940: le officine aeronautiche di Pisa lavorano a ritmi serrati per testare i nuovi quadrimotori P.108; l'università e gli istituti scientifici collaborano con il Consiglio Nazionale delle Ricerche per materiali autarchici.",
    s6: "Giugno 1940: mobilitazione all'aeroporto di Pisa San Giusto, base di squadriglie di bombardamento e ricognizione marittima della Regia Aeronautica; mimetizzazione degli impianti Piaggio di Pontedera.",
    s7: "Autunno 1940: la provincia di Pisa subisce le prime incursioni aeree della RAF sulla ferrovia litoranea; a Pontedera e San Giusto si intensifica la produzione e riparazione di velivoli per il fronte albanese e libico.",
    s8: "Aprile 1941: la 274ª Squadriglia Bombardamento a Grande Raggio della Regia Aeronautica, equipaggiata con i Piaggio P.108 (tra i cui piloti figura Bruno Mussolini), intensifica l'addestramento operativo su Pisa per missioni su Gibilterra e il Mediterraneo.",
    getNote: (step: number) => {
      if (step <= 1) return "Polo universitario e scientifico (con la Scuola Normale Superiore), aeroporto militare di San Giusto e sede a Pontedera degli stabilimenti Piaggio (produzione di motori aeronautici, bombardieri Piaggio P.108 a quattro motori e aerei da ricognizione).";
      if (step <= 4) return "Nel 1938-1939 a Pontedera e Pisa la Piaggio espande la produzione aviatoria; l'ingegner Corradino D'Ascanio e lo staff tecnico sviluppano innovazioni nel campo delle eliche a passo variabile e dei propulsori stellari per la Regia Aeronautica.";
      if (step === 5) return "Fine 1939 - maggio 1940: le officine aeronautiche di Pisa lavorano a ritmi serrati per testare i nuovi quadrimotori P.108; l'università e gli istituti scientifici collaborano con il Consiglio Nazionale delle Ricerche per materiali autarchici.";
      if (step === 6) return "Giugno 1940: mobilitazione all'aeroporto di Pisa San Giusto, base di squadriglie di bombardamento e ricognizione marittima della Regia Aeronautica; mimetizzazione degli impianti Piaggio di Pontedera.";
      if (step === 7) return "Autunno 1940: la provincia di Pisa subisce le prime incursioni aeree della RAF sulla ferrovia litoranea; a Pontedera e San Giusto si intensifica la produzione e riparazione di velivoli per il fronte albanese e libico.";
      return "Aprile 1941: la 274ª Squadriglia Bombardamento a Grande Raggio della Regia Aeronautica, equipaggiata con i Piaggio P.108 (tra i cui piloti figura Bruno Mussolini), intensifica l'addestramento operativo su Pisa per missioni su Gibilterra e il Mediterraneo.";
    },
    getHistoricalName: (_step: number) => "Provincia di Pisa",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Pisa",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI18": {
    nuts: "ITI18",
    name: "Provincia di Arezzo",
    modernName: "Arezzo",
    historicalName: "Provincia di Arezzo",
    region: "Toscana",
    keys: ["arezzo", "casentino", "cortona", "iti18", "provincia_di_arezzo", "sansepolcro", "valdarno"],
    s0_1: "Provincia rurale e manifatturiera della Val di Chiana e del Casentino; celebre per l'oreficeria (UNOAEERRE fondata nel 1926) e le cartiere e segherie casentinesi; forte adesione alle direttive cerealicole della Battaglia del Grano.",
    s2_4: "1938-1939: con le sanzioni e l'autarchia, l'oreficeria aretina deve riconvertirsi all'utilizzo di leghe non preziose o lavorazioni meccaniche minute per la difesa; la Valdarno produce lignite presso le miniere di Castelnuovo dei Sabbioni per alimentare le centrali elettriche.",
    s5: "Autunno 1939 - primavera 1940: durante la non belligeranza, la lignite del Valdarno aretino diventa risorsa energetica strategica per compensare il blocco delle importazioni di carbone fossile da Germania e Inghilterra.",
    s6: "Giugno 1940: i giovani aretini sono arruolati nei reggimenti di fanteria toscani; aumento esponenziale della produzione estrattiva di lignite sotto regime di lavoro militarizzato.",
    s7: "Fine 1940: il rigido inverno colpisce l'Appennino tosco-emiliano; il razionamento dei combustibili e del grano causa disagi crescenti nelle campagne e nei centri vallivi di Arezzo, Montevarchi e Sansepolcro.",
    s8: "Primavera 1941: la provincia di Arezzo garantisce derrate agricole e combustibili fossili autarchici per lo sforzo bellico; cresce il malcontento popolare silenzioso per i caduti sui fronti di Grecia e d'Albania.",
    getNote: (step: number) => {
      if (step <= 1) return "Provincia rurale e manifatturiera della Val di Chiana e del Casentino; celebre per l'oreficeria (UNOAEERRE fondata nel 1926) e le cartiere e segherie casentinesi; forte adesione alle direttive cerealicole della Battaglia del Grano.";
      if (step <= 4) return "1938-1939: con le sanzioni e l'autarchia, l'oreficeria aretina deve riconvertirsi all'utilizzo di leghe non preziose o lavorazioni meccaniche minute per la difesa; la Valdarno produce lignite presso le miniere di Castelnuovo dei Sabbioni per alimentare le centrali elettriche.";
      if (step === 5) return "Autunno 1939 - primavera 1940: durante la non belligeranza, la lignite del Valdarno aretino diventa risorsa energetica strategica per compensare il blocco delle importazioni di carbone fossile da Germania e Inghilterra.";
      if (step === 6) return "Giugno 1940: i giovani aretini sono arruolati nei reggimenti di fanteria toscani; aumento esponenziale della produzione estrattiva di lignite sotto regime di lavoro militarizzato.";
      if (step === 7) return "Fine 1940: il rigido inverno colpisce l'Appennino tosco-emiliano; il razionamento dei combustibili e del grano causa disagi crescenti nelle campagne e nei centri vallivi di Arezzo, Montevarchi e Sansepolcro.";
      return "Primavera 1941: la provincia di Arezzo garantisce derrate agricole e combustibili fossili autarchici per lo sforzo bellico; cresce il malcontento popolare silenzioso per i caduti sui fronti di Grecia e d'Albania.";
    },
    getHistoricalName: (_step: number) => "Provincia di Arezzo",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Arezzo",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI19": {
    nuts: "ITI19",
    name: "Provincia di Siena",
    modernName: "Siena",
    historicalName: "Provincia di Siena",
    region: "Toscana",
    keys: ["amiata", "chianciano", "iti19", "montepulciano", "poggibonsi", "provincia_di_siena", "siena"],
    s0_1: "Territorio ad alta vocazione agricola e vitivinicola (Chianti, Val d'Orcia), sede della storica banca Monte dei Paschi e dell'Università di Siena; presenza delle miniere di cinabro e mercurio del Monte Amiata (Abbadia San Salvatore), risorsa autarchica d'importanza planetaria.",
    s2_4: "1938-1939: le miniere di mercurio dell'Amiata forniscono fulminato di mercurio indispensabile per inneschi, detonatori e munizioni; la provincia riceve investimenti per la modernizzazione degli impianti minerari statali.",
    s5: "Tra la fine del 1939 e la primavera 1940, la produzione amiatina di mercurio sale ai massimi storici per alimentare sia gli arsenali italiani sia le forniture alla Germania nazista in virtù degli accordi italo-tedeschi.",
    s6: "Giugno 1940: mobilitazione dei richiamati; le miniere del Monte Amiata sono dichiarate stabilimento ausiliario di guerra protetto da reparti della Milizia della Difesa Contraerea (DICAT).",
    s7: "Autunno 1940: le campagne senesi sostengono l'ammasso obbligatorio di frumento e olio per le razioni militari; la popolazione vive le prime perdite di soldati impiegati nell'offensiva contro la Grecia.",
    s8: "Aprile 1941: l'attività estrattiva del mercurio sull'Amiata e le produzioni agricole senesi rimangono fondamentali per l'economia dell'Asse, in un clima di crescente austerità e controllo prefettizio.",
    getNote: (step: number) => {
      if (step <= 1) return "Territorio ad alta vocazione agricola e vitivinicola (Chianti, Val d'Orcia), sede della storica banca Monte dei Paschi e dell'Università di Siena; presenza delle miniere di cinabro e mercurio del Monte Amiata (Abbadia San Salvatore), risorsa autarchica d'importanza planetaria.";
      if (step <= 4) return "1938-1939: le miniere di mercurio dell'Amiata forniscono fulminato di mercurio indispensabile per inneschi, detonatori e munizioni; la provincia riceve investimenti per la modernizzazione degli impianti minerari statali.";
      if (step === 5) return "Tra la fine del 1939 e la primavera 1940, la produzione amiatina di mercurio sale ai massimi storici per alimentare sia gli arsenali italiani sia le forniture alla Germania nazista in virtù degli accordi italo-tedeschi.";
      if (step === 6) return "Giugno 1940: mobilitazione dei richiamati; le miniere del Monte Amiata sono dichiarate stabilimento ausiliario di guerra protetto da reparti della Milizia della Difesa Contraerea (DICAT).";
      if (step === 7) return "Autunno 1940: le campagne senesi sostengono l'ammasso obbligatorio di frumento e olio per le razioni militari; la popolazione vive le prime perdite di soldati impiegati nell'offensiva contro la Grecia.";
      return "Aprile 1941: l'attività estrattiva del mercurio sull'Amiata e le produzioni agricole senesi rimangono fondamentali per l'economia dell'Asse, in un clima di crescente austerità e controllo prefettizio.";
    },
    getHistoricalName: (_step: number) => "Provincia di Siena",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Siena",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI1A": {
    nuts: "ITI1A",
    name: "Provincia di Grosseto",
    modernName: "Grosseto",
    historicalName: "Provincia di Grosseto",
    region: "Toscana",
    keys: ["follonica", "grosseto", "iti1a", "maremma", "monte_argentario", "orbetello", "provincia_di_grosseto"],
    s0_1: "Provincia maremmana protagonista della bonifica integrale fascista; presenza dell'Idroscalo di Orbetello, celebre punto di partenza delle Crociere Aeree Atlantiche guidate da Italo Balbo nel 1930 e 1933; miniere di pirite a Gavorrano per l'acido solforico.",
    s2_4: "1938-1939: l'estrazione di pirite a Gavorrano e Boccheggiano rifornisce le industrie chimiche e di fertilizzanti Montecatini; l'Idroscalo di Orbetello mantiene una primaria funzione di addestramento per gli idrovolanti della Regia Aeronautica.",
    s5: "Autunno 1939 - maggio 1940: la Maremma bonificata produce ingenti quantità di grano e barbabietole da zucchero per l'ammasso autarchico; le miniere di pirite lavorano sotto stretta sorveglianza militare.",
    s6: "Giugno 1940: Orbetello e l'aeroporto militare di Grosseto diventano basi operative per la ricognizione marittima nel Tirreno e per la caccia contro eventuali formazioni nemiche provenienti dalla Corsica o dal Nordafrica.",
    s7: "Fine 1940: le batterie costiere del promontorio dell'Argentario e dell'isola del Giglio presidiano il canale tirrenico percorsa dai convogli verso la Sardegna; incremento della produzione mineraria di ferro e pirite.",
    s8: "Primavera 1941: l'aeroporto di Grosseto ospita reparti aerosiluranti della Regia Aeronautica; la Maremma subisce il rigido razionamento di generi alimentari e la requisizione di equini e automezzi per il Regio Esercito.",
    getNote: (step: number) => {
      if (step <= 1) return "Provincia maremmana protagonista della bonifica integrale fascista; presenza dell'Idroscalo di Orbetello, celebre punto di partenza delle Crociere Aeree Atlantiche guidate da Italo Balbo nel 1930 e 1933; miniere di pirite a Gavorrano per l'acido solforico.";
      if (step <= 4) return "1938-1939: l'estrazione di pirite a Gavorrano e Boccheggiano rifornisce le industrie chimiche e di fertilizzanti Montecatini; l'Idroscalo di Orbetello mantiene una primaria funzione di addestramento per gli idrovolanti della Regia Aeronautica.";
      if (step === 5) return "Autunno 1939 - maggio 1940: la Maremma bonificata produce ingenti quantità di grano e barbabietole da zucchero per l'ammasso autarchico; le miniere di pirite lavorano sotto stretta sorveglianza militare.";
      if (step === 6) return "Giugno 1940: Orbetello e l'aeroporto militare di Grosseto diventano basi operative per la ricognizione marittima nel Tirreno e per la caccia contro eventuali formazioni nemiche provenienti dalla Corsica o dal Nordafrica.";
      if (step === 7) return "Fine 1940: le batterie costiere del promontorio dell'Argentario e dell'isola del Giglio presidiano il canale tirrenico percorsa dai convogli verso la Sardegna; incremento della produzione mineraria di ferro e pirite.";
      return "Primavera 1941: l'aeroporto di Grosseto ospita reparti aerosiluranti della Regia Aeronautica; la Maremma subisce il rigido razionamento di generi alimentari e la requisizione di equini e automezzi per il Regio Esercito.";
    },
    getHistoricalName: (_step: number) => "Provincia di Grosseto",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Grosseto",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI21": {
    nuts: "ITI21",
    name: "Provincia di Perugia",
    modernName: "Perugia",
    historicalName: "Provincia di Perugia",
    region: "Umbria",
    keys: ["assisi", "citta_di_castello", "foligno", "gubbio", "iti21", "perugia", "provincia_di_perugia", "spoleto"],
    s0_1: "Capoluogo dell'Umbria, sede di illustri istituzioni culturali (Università per Stranieri fondata nel 1925), dell'industria dolciaria Perugina (Buitoni e Spagnoli), della tessitura d'angora e dello stabilimento aeronautico SAIMAN al lago Trasimeno (Castiglione del Lago).",
    s2_4: "1938-1939: a Castiglione del Lago la SAIMAN e la Scuola Caccia e Idrovolanti della Regia Aeronautica addestrano centinaia di piloti; la piana perugina contribuisce all'ammasso granario nazionale.",
    s5: "Tra la fine del 1939 e la primavera del 1940, Perugia accoglie comandi militari e la riconversione di reparti officina per manutenzione aerei e veicoli; la Perugina converte parte delle linee per razioni K e cioccolato per i soldati al fronte.",
    s6: "Giugno 1940: con l'entrata in guerra dell'Italia, i piloti addestrati sul Trasimeno vengono inviati ai reparti di prima linea; la provincia viene inserita nella cintura di retrovia difensiva interna.",
    s7: "Autunno 1940: la mobilitazione per la campagna di Grecia porta al fronte centinaia di giovani perugini nei battaglioni di fanteria e camicie nere; gli ospedali cittadini accolgono reduci e feriti.",
    s8: "Aprile 1941: con l'occupazione della Jugoslavia da parte dell'Asse, Perugia e l'Umbria ospitano centri di smistamento prigionieri di guerra e campi d'internamento civili (come Pietrafitta e Colfiorito).",
    getNote: (step: number) => {
      if (step <= 1) return "Capoluogo dell'Umbria, sede di illustri istituzioni culturali (Università per Stranieri fondata nel 1925), dell'industria dolciaria Perugina (Buitoni e Spagnoli), della tessitura d'angora e dello stabilimento aeronautico SAIMAN al lago Trasimeno (Castiglione del Lago).";
      if (step <= 4) return "1938-1939: a Castiglione del Lago la SAIMAN e la Scuola Caccia e Idrovolanti della Regia Aeronautica addestrano centinaia di piloti; la piana perugina contribuisce all'ammasso granario nazionale.";
      if (step === 5) return "Tra la fine del 1939 e la primavera del 1940, Perugia accoglie comandi militari e la riconversione di reparti officina per manutenzione aerei e veicoli; la Perugina converte parte delle linee per razioni K e cioccolato per i soldati al fronte.";
      if (step === 6) return "Giugno 1940: con l'entrata in guerra dell'Italia, i piloti addestrati sul Trasimeno vengono inviati ai reparti di prima linea; la provincia viene inserita nella cintura di retrovia difensiva interna.";
      if (step === 7) return "Autunno 1940: la mobilitazione per la campagna di Grecia porta al fronte centinaia di giovani perugini nei battaglioni di fanteria e camicie nere; gli ospedali cittadini accolgono reduci e feriti.";
      return "Aprile 1941: con l'occupazione della Jugoslavia da parte dell'Asse, Perugia e l'Umbria ospitano centri di smistamento prigionieri di guerra e campi d'internamento civili (come Pietrafitta e Colfiorito).";
    },
    getHistoricalName: (_step: number) => "Provincia di Perugia",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Perugia",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI22": {
    nuts: "ITI22",
    name: "Provincia di Terni",
    modernName: "Terni",
    historicalName: "Provincia di Terni",
    region: "Umbria",
    keys: ["amelia", "iti22", "narni", "orvieto", "provincia_di_terni", "terni"],
    s0_1: "Capitale dell'industria pesante dell'Italia centrale: le Acciaierie di Terni (Società Terni), la Fabbrica d'Armi (FabbriArmi), gli stabilimenti chimici di Nera Montoro e la Cascata delle Marmore (energia idroelettrica) forgiano le corazze delle grandi navi e i fucili Carcano 91.",
    s2_4: "1938-1939: Terni lavora al massimo della capacità per le corazze speciali delle navi da battaglia Littorio, Vittorio Veneto, Roma e Impero; la Fabbrica d'Armi produce decine di migliaia di fucili Carcano Mod. 91/38 e mitragliatrici.",
    s5: "Settembre 1939 - maggio 1940: considerata polo siderurgico e d'armamento di rilievo nazionale, Terni viene dotata di potenti batterie contraeree e bunker sotterranei per operai e popolazione civile.",
    s6: "Giugno 1940: all'ingresso in guerra, le maestranze delle Acciaierie e della Fabbrica d'Armi sono esentate dal fronte con lo status di 'mobilitati civili' per garantire la produzione ininterrotta di proiettili, lamiere corazzate e componentistica bellica.",
    s7: "Fine 1940: la fabbricazione di corazze e cannoni raggiunge ritmi frenetici per compensare le perdite navali subite a Taranto; l'idroelettrico di Galleto e Marmore lavora a pieno regime per l'intera rete elettrica centrale.",
    s8: "Primavera 1941: Terni rimane il pilastro dell'industria bellica del Centro Italia; aumentano i turni notturni sotto l'incubo di futuri bombardamenti strategici degli Alleati.",
    getNote: (step: number) => {
      if (step <= 1) return "Capitale dell'industria pesante dell'Italia centrale: le Acciaierie di Terni (Società Terni), la Fabbrica d'Armi (FabbriArmi), gli stabilimenti chimici di Nera Montoro e la Cascata delle Marmore (energia idroelettrica) forgiano le corazze delle grandi navi e i fucili Carcano 91.";
      if (step <= 4) return "1938-1939: Terni lavora al massimo della capacità per le corazze speciali delle navi da battaglia Littorio, Vittorio Veneto, Roma e Impero; la Fabbrica d'Armi produce decine di migliaia di fucili Carcano Mod. 91/38 e mitragliatrici.";
      if (step === 5) return "Settembre 1939 - maggio 1940: considerata polo siderurgico e d'armamento di rilievo nazionale, Terni viene dotata di potenti batterie contraeree e bunker sotterranei per operai e popolazione civile.";
      if (step === 6) return "Giugno 1940: all'ingresso in guerra, le maestranze delle Acciaierie e della Fabbrica d'Armi sono esentate dal fronte con lo status di 'mobilitati civili' per garantire la produzione ininterrotta di proiettili, lamiere corazzate e componentistica bellica.";
      if (step === 7) return "Fine 1940: la fabbricazione di corazze e cannoni raggiunge ritmi frenetici per compensare le perdite navali subite a Taranto; l'idroelettrico di Galleto e Marmore lavora a pieno regime per l'intera rete elettrica centrale.";
      return "Primavera 1941: Terni rimane il pilastro dell'industria bellica del Centro Italia; aumentano i turni notturni sotto l'incubo di futuri bombardamenti strategici degli Alleati.";
    },
    getHistoricalName: (_step: number) => "Provincia di Terni",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Terni",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI31": {
    nuts: "ITI31",
    name: "Provincia di Pesaro e Urbino",
    modernName: "Pesaro e Urbino",
    historicalName: "Provincia di Pesaro e Urbino",
    region: "Marche",
    keys: ["fano", "iti31", "pesaro", "pesaro_e_urbino", "provincia_di_pesaro_e_urbino", "urbino"],
    s0_1: "Provincia marchigiana settentrionale affacciata sull'Adriatico, ricca di manifatture meccaniche (Officine Moto Benelli fondate nel 1911), cantieri navali minori a Pesaro e Fano e patrimonio agricolo e artistico a Urbino.",
    s2_4: "1938-1939: le Officine Benelli convertono parte delle linee produttive alla fornitura di motociclette militari e motocarri pesanti per i bersaglieri e la fanteria motorizzata del Regio Esercito (Benelli 500 VLM).",
    s5: "Autunno 1939 - primavera 1940: la costa pesarese viene dotata di posti di avvistamento costiero marittimo; la produzione motociclistica Benelli viene quasi interamente destinata ai bandi militari dell'Esercito.",
    s6: "Giugno 1940: dichiarazione di guerra; la costa adriatica viene oscurata e i porti di Pesaro e Fano accolgono unità costiere e pescherecci mobilitati per il dragaggio mine nell'Adriatico.",
    s7: "Autunno 1940: reparti del 28° Reggimento Fanteria 'Pavia' (con sede di deposito a Pesaro) operano sui vari scacchieri; la popolazione affronta le tessere annonarie e l'inverno rigido appenninico.",
    s8: "Aprile 1941: in occasione dell'invasione dell'Jugoslavia, la linea ferroviaria adriatica e la via Flaminia vedono il transito continuo di truppe e materiali dell'Asse diretti verso i porti d'imbarco per la Dalmazia e l'Albania.",
    getNote: (step: number) => {
      if (step <= 1) return "Provincia marchigiana settentrionale affacciata sull'Adriatico, ricca di manifatture meccaniche (Officine Moto Benelli fondate nel 1911), cantieri navali minori a Pesaro e Fano e patrimonio agricolo e artistico a Urbino.";
      if (step <= 4) return "1938-1939: le Officine Benelli convertono parte delle linee produttive alla fornitura di motociclette militari e motocarri pesanti per i bersaglieri e la fanteria motorizzata del Regio Esercito (Benelli 500 VLM).";
      if (step === 5) return "Autunno 1939 - primavera 1940: la costa pesarese viene dotata di posti di avvistamento costiero marittimo; la produzione motociclistica Benelli viene quasi interamente destinata ai bandi militari dell'Esercito.";
      if (step === 6) return "Giugno 1940: dichiarazione di guerra; la costa adriatica viene oscurata e i porti di Pesaro e Fano accolgono unità costiere e pescherecci mobilitati per il dragaggio mine nell'Adriatico.";
      if (step === 7) return "Autunno 1940: reparti del 28° Reggimento Fanteria 'Pavia' (con sede di deposito a Pesaro) operano sui vari scacchieri; la popolazione affronta le tessere annonarie e l'inverno rigido appenninico.";
      return "Aprile 1941: in occasione dell'invasione dell'Jugoslavia, la linea ferroviaria adriatica e la via Flaminia vedono il transito continuo di truppe e materiali dell'Asse diretti verso i porti d'imbarco per la Dalmazia e l'Albania.";
    },
    getHistoricalName: (_step: number) => "Provincia di Pesaro e Urbino",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Pesaro e Urbino",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI32": {
    nuts: "ITI32",
    name: "Provincia di Ancona",
    modernName: "Ancona",
    historicalName: "Provincia di Ancona",
    region: "Marche",
    keys: ["ancona", "fabriano", "iti32", "jesi", "loreto", "osimo", "provincia_di_ancona", "senigallia"],
    s0_1: "Principale porto militare e commerciale del medio Adriatico, sede dei Cantieri Navali Riuniti di Ancona (costruzione di cacciatorpediniere e sommergibili), della base sommergibili e del Comando Militare Marittimo dell'Alto Adriatico.",
    s2_4: "1938-1939: i cantieri navali anconetani lavorano su commesse della Regia Marina e mercantili; fortificate le batterie costiere del Monte Conero (Batteria Dante De Lutti) a guardia dell'accesso al porto.",
    s5: "Fine 1939 - maggio 1940: Ancona intensifica la sorveglianza delle rotte verso la Dalmazia jugoslava; i sommergibili dislocati ad Ancona conducono esercitazioni di pattugliamento nel bacino adriatico.",
    s6: "Giugno 1940: con l'entrata in guerra, Ancona diviene porto di prima linea per le operazioni contro la marina mercantile e le coste nemiche; la Batteria del Conero e le difese antiaeree cittadine entrano in allarme continuo.",
    s7: "Autunno 1940: dal porto di Ancona salpano convogli carichi di munizioni e veicoli verso l'Albania per sostenere il fronte greco; il cantiere navale e le banchine lavorano sotto stretta segretezza militare.",
    s8: "Aprile 1941: l'attacco dell'Asse alla Jugoslavia vede Ancona come punto nodale per l'imbarco delle truppe della 2ª Armata e il controllo del golfo di Venezia e dell'Adriatico centrale; la città accoglie prigionieri jugoslavi.",
    getNote: (step: number) => {
      if (step <= 1) return "Principale porto militare e commerciale del medio Adriatico, sede dei Cantieri Navali Riuniti di Ancona (costruzione di cacciatorpediniere e sommergibili), della base sommergibili e del Comando Militare Marittimo dell'Alto Adriatico.";
      if (step <= 4) return "1938-1939: i cantieri navali anconetani lavorano su commesse della Regia Marina e mercantili; fortificate le batterie costiere del Monte Conero (Batteria Dante De Lutti) a guardia dell'accesso al porto.";
      if (step === 5) return "Fine 1939 - maggio 1940: Ancona intensifica la sorveglianza delle rotte verso la Dalmazia jugoslava; i sommergibili dislocati ad Ancona conducono esercitazioni di pattugliamento nel bacino adriatico.";
      if (step === 6) return "Giugno 1940: con l'entrata in guerra, Ancona diviene porto di prima linea per le operazioni contro la marina mercantile e le coste nemiche; la Batteria del Conero e le difese antiaeree cittadine entrano in allarme continuo.";
      if (step === 7) return "Autunno 1940: dal porto di Ancona salpano convogli carichi di munizioni e veicoli verso l'Albania per sostenere il fronte greco; il cantiere navale e le banchine lavorano sotto stretta segretezza militare.";
      return "Aprile 1941: l'attacco dell'Asse alla Jugoslavia vede Ancona come punto nodale per l'imbarco delle truppe della 2ª Armata e il controllo del golfo di Venezia e dell'Adriatico centrale; la città accoglie prigionieri jugoslavi.";
    },
    getHistoricalName: (_step: number) => "Provincia di Ancona",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Ancona",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI33": {
    nuts: "ITI33",
    name: "Provincia di Macerata",
    modernName: "Macerata",
    historicalName: "Provincia di Macerata",
    region: "Marche",
    keys: ["camerino", "civitanova_marche", "iti33", "macerata", "provincia_di_macerata", "recanati", "tolentino"],
    s0_1: "Provincia ad economia prevalentemente rurale e artigianale (pelletteria, calzature a Civitanova Marche, carta a Tolentino); l'ammasso granario della fertile vallata del Chienti è fiore all'occhiello della politica rurale fascista.",
    s2_4: "1938-1939: applicazione delle leggi razziali e censimento della popolazione; le concerie e i calzaturifici del distretto maceratese ottengono commesse per la selleria e gli scarponi dell'Esercito.",
    s5: "Settembre 1939 - primavera 1940: durante la non belligeranza, Macerata rispetta le direttive del razionamento dei combustibili; si istituiscono centri di raccolta per rottami ferrosi e lana per l'autarchia.",
    s6: "Giugno 1940: arruolamento di classi di leva nelle divisioni di fanteria e alpini; la costa di Civitanova e Porto Recanati viene presidiata con garitte e posti d'avvistamento contro possibili incursioni navali.",
    s7: "Autunno 1940: giovani maceratesi combattono nelle valli dell'Epiro e del Pindo in Grecia; le campagne sopportano il prelievo obbligatorio di grano, mais e maiali per le riserve delle forze armate.",
    s8: "Aprile 1941: a Sforzacosta di Macerata viene allestito uno dei maggiori campi di prigionia e internamento per civili e militari alleati e jugoslavi (Campo PG 53), che diverrà tristemente noto negli anni successivi.",
    getNote: (step: number) => {
      if (step <= 1) return "Provincia ad economia prevalentemente rurale e artigianale (pelletteria, calzature a Civitanova Marche, carta a Tolentino); l'ammasso granario della fertile vallata del Chienti è fiore all'occhiello della politica rurale fascista.";
      if (step <= 4) return "1938-1939: applicazione delle leggi razziali e censimento della popolazione; le concerie e i calzaturifici del distretto maceratese ottengono commesse per la selleria e gli scarponi dell'Esercito.";
      if (step === 5) return "Settembre 1939 - primavera 1940: durante la non belligeranza, Macerata rispetta le direttive del razionamento dei combustibili; si istituiscono centri di raccolta per rottami ferrosi e lana per l'autarchia.";
      if (step === 6) return "Giugno 1940: arruolamento di classi di leva nelle divisioni di fanteria e alpini; la costa di Civitanova e Porto Recanati viene presidiata con garitte e posti d'avvistamento contro possibili incursioni navali.";
      if (step === 7) return "Autunno 1940: giovani maceratesi combattono nelle valli dell'Epiro e del Pindo in Grecia; le campagne sopportano il prelievo obbligatorio di grano, mais e maiali per le riserve delle forze armate.";
      return "Aprile 1941: a Sforzacosta di Macerata viene allestito uno dei maggiori campi di prigionia e internamento per civili e militari alleati e jugoslavi (Campo PG 53), che diverrà tristemente noto negli anni successivi.";
    },
    getHistoricalName: (_step: number) => "Provincia di Macerata",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Macerata",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI34": {
    nuts: "ITI34",
    name: "Provincia di Ascoli Piceno",
    modernName: "Ascoli Piceno",
    historicalName: "Provincia di Ascoli Piceno",
    region: "Marche",
    keys: ["ascoli", "ascoli_piceno", "iti34", "provincia_di_ascoli_piceno", "san_benedetto_del_tronto"],
    s0_1: "Provincia del Piceno all'estremo sud delle Marche, nota per la bachicoltura, la canapicoltura nella vallata del Tronto e la produzione di bachi da seta per paracadute e divise autarchiche.",
    s2_4: "1938-1939: lo sviluppo delle fibre tessili autarchiche (canapa e seta) riceve impulso statale; a San Benedetto del Tronto si sviluppa la flotta peschereccia d'alto mare a motore, fondamentale per l'approvvigionamento proteico.",
    s5: "Tra la fine del 1939 e la primavera del 1940, la flottiglia da pesca sambenedettese e i centri agricoli ascolani affrontano la scarsità di carburante e i contingentamenti di nafta.",
    s6: "Giugno 1940: entrata in guerra; l'intera costa picena è oscurata, i pescherecci di San Benedetto sono soggetti a orari rigidi e permessi militari per evitare le mine galleggianti nell'Adriatico.",
    s7: "Autunno 1940: i soldati ascolani inviati in Grecia soffrono le tragiche carenze di equipaggiamento invernale; la popolazione si mobilita con l'invio di indumenti di lana lavorati dalle donne dei fasci femminili.",
    s8: "Primavera 1941: con le operazioni belliche nei Balcani, il porto peschereccio e le ferrovie del Piceno continuano a garantire derrate per le città del nord e il fronte orientale.",
    getNote: (step: number) => {
      if (step <= 1) return "Provincia del Piceno all'estremo sud delle Marche, nota per la bachicoltura, la canapicoltura nella vallata del Tronto e la produzione di bachi da seta per paracadute e divise autarchiche.";
      if (step <= 4) return "1938-1939: lo sviluppo delle fibre tessili autarchiche (canapa e seta) riceve impulso statale; a San Benedetto del Tronto si sviluppa la flotta peschereccia d'alto mare a motore, fondamentale per l'approvvigionamento proteico.";
      if (step === 5) return "Tra la fine del 1939 e la primavera del 1940, la flottiglia da pesca sambenedettese e i centri agricoli ascolani affrontano la scarsità di carburante e i contingentamenti di nafta.";
      if (step === 6) return "Giugno 1940: entrata in guerra; l'intera costa picena è oscurata, i pescherecci di San Benedetto sono soggetti a orari rigidi e permessi militari per evitare le mine galleggianti nell'Adriatico.";
      if (step === 7) return "Autunno 1940: i soldati ascolani inviati in Grecia soffrono le tragiche carenze di equipaggiamento invernale; la popolazione si mobilita con l'invio di indumenti di lana lavorati dalle donne dei fasci femminili.";
      return "Primavera 1941: con le operazioni belliche nei Balcani, il porto peschereccio e le ferrovie del Piceno continuano a garantire derrate per le città del nord e il fronte orientale.";
    },
    getHistoricalName: (_step: number) => "Provincia di Ascoli Piceno",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Ascoli Piceno",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI35": {
    nuts: "ITI35",
    name: "Fermo (Provincia di Ascoli Piceno)",
    modernName: "Fermo",
    historicalName: "Fermo (Provincia di Ascoli Piceno)",
    region: "Marche",
    keys: ["fermo", "fermo_ascoli_piceno", "fermo_provincia_di_ascoli_piceno", "iti35", "porto_san_giorgio", "sant_elpidio_a_mare"],
    s0_1: "Territorio storicamente legato alla provincia di Ascoli Piceno (cui appartenne dal 1860 al 2004), fulcro della produzione calzaturiera artigianale (Montegranaro, Monte Urano) e dell'agricoltura collinare della val di Tenna.",
    s2_4: "1938-1939: il distretto calzaturiero fermano viene mobilitato per fornire scarpe e calzature da lavoro e militari impiegando succedanei del cuoio come bachelite, legno e gomma rigenerata autarchica.",
    s5: "Autunno 1939 - primavera 1940: nella non belligeranza, le botteghe calzaturiere del Fermano sperimentano la penuria di pelli estere e si adeguano ai decreti del Ministero delle Corporazioni.",
    s6: "Giugno 1940: mobilitazione dei richiamati; la costa di Porto San Giorgio attiva vedette per il controllo del traffico costiero adriatico contro sommergibili nemici.",
    s7: "Fine 1940: a Servigliano (nella vallata del Tenna) viene riattivato e ampliato il grande campo di concentramento e prigionia (Campo di Servigliano) destinato a prigionieri di guerra e internati civili stranieri.",
    s8: "Aprile 1941: il campo di Servigliano comincia ad accogliere centinaia di soldati e ufficiali dell'esercito jugoslavo e britannico catturati nelle operazioni balcaniche e nordafricane.",
    getNote: (step: number) => {
      if (step <= 1) return "Territorio storicamente legato alla provincia di Ascoli Piceno (cui appartenne dal 1860 al 2004), fulcro della produzione calzaturiera artigianale (Montegranaro, Monte Urano) e dell'agricoltura collinare della val di Tenna.";
      if (step <= 4) return "1938-1939: il distretto calzaturiero fermano viene mobilitato per fornire scarpe e calzature da lavoro e militari impiegando succedanei del cuoio come bachelite, legno e gomma rigenerata autarchica.";
      if (step === 5) return "Autunno 1939 - primavera 1940: nella non belligeranza, le botteghe calzaturiere del Fermano sperimentano la penuria di pelli estere e si adeguano ai decreti del Ministero delle Corporazioni.";
      if (step === 6) return "Giugno 1940: mobilitazione dei richiamati; la costa di Porto San Giorgio attiva vedette per il controllo del traffico costiero adriatico contro sommergibili nemici.";
      if (step === 7) return "Fine 1940: a Servigliano (nella vallata del Tenna) viene riattivato e ampliato il grande campo di concentramento e prigionia (Campo di Servigliano) destinato a prigionieri di guerra e internati civili stranieri.";
      return "Aprile 1941: il campo di Servigliano comincia ad accogliere centinaia di soldati e ufficiali dell'esercito jugoslavo e britannico catturati nelle operazioni balcaniche e nordafricane.";
    },
    getHistoricalName: (_step: number) => "Fermo (Provincia di Ascoli Piceno)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Circondario di Fermo (Provincia di Ascoli Piceno)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI41": {
    nuts: "ITI41",
    name: "Provincia di Viterbo",
    modernName: "Viterbo",
    historicalName: "Provincia di Viterbo",
    region: "Lazio",
    keys: ["civita_castellana", "iti41", "montefiascone", "provincia_di_viterbo", "tarquinia", "tuscia", "viterbo"],
    s0_1: "Creata nel 1927 nella Tuscia laziale; sede dell'importante aeroporto militare 'Tommaso Fabbri' di Viterbo e della neonata Scuola di Paracadutismo a Tarquinia, fondata nel 1939-1940 per addestrare i primi paracadutisti italiani.",
    s2_4: "1938-1939: l'aeroporto di Viterbo e il campo di Tarquinia diventano centri di eccellenza per la Regia Aeronautica e per la nascita dei battaglioni paracadutisti dei 'Folgore'; intensificate le bonifiche nella Maremma laziale.",
    s5: "Settembre 1939 - maggio 1940: a Tarquinia affluiscono volontari da tutte le forze armate per conseguire il brevetto di paracadutista sui trimotori Savoia-Marchetti SM.81 e SM.79; Viterbo ospita depositi munizioni.",
    s6: "Giugno 1940: dichiarazione di guerra; l'aeroporto di Viterbo ospita formazioni da caccia e bombardamento; a Tarquinia si accelera l'addestramento dei battaglioni paracadutisti in vista di un progettato sbarco su Malta.",
    s7: "Autunno 1940: i primi nuclei paracadutisti addestrati a Tarquinia e le squadriglie viterbesi vengono trasferiti oltremare verso la Libia e l'Albania; la Tuscia rurale fornisce derrate per la capitale Roma.",
    s8: "Aprile 1941: Tarquinia vede il battesimo dell'aria e l'espansione dei reparti paracadutisti che formeranno la Divisione 'Folgore'; le campagne di Viterbo risentono delle pesanti requisizioni granarie e zootecniche.",
    getNote: (step: number) => {
      if (step <= 1) return "Creata nel 1927 nella Tuscia laziale; sede dell'importante aeroporto militare 'Tommaso Fabbri' di Viterbo e della neonata Scuola di Paracadutismo a Tarquinia, fondata nel 1939-1940 per addestrare i primi paracadutisti italiani.";
      if (step <= 4) return "1938-1939: l'aeroporto di Viterbo e il campo di Tarquinia diventano centri di eccellenza per la Regia Aeronautica e per la nascita dei battaglioni paracadutisti dei 'Folgore'; intensificate le bonifiche nella Maremma laziale.";
      if (step === 5) return "Settembre 1939 - maggio 1940: a Tarquinia affluiscono volontari da tutte le forze armate per conseguire il brevetto di paracadutista sui trimotori Savoia-Marchetti SM.81 e SM.79; Viterbo ospita depositi munizioni.";
      if (step === 6) return "Giugno 1940: dichiarazione di guerra; l'aeroporto di Viterbo ospita formazioni da caccia e bombardamento; a Tarquinia si accelera l'addestramento dei battaglioni paracadutisti in vista di un progettato sbarco su Malta.";
      if (step === 7) return "Autunno 1940: i primi nuclei paracadutisti addestrati a Tarquinia e le squadriglie viterbesi vengono trasferiti oltremare verso la Libia e l'Albania; la Tuscia rurale fornisce derrate per la capitale Roma.";
      return "Aprile 1941: Tarquinia vede il battesimo dell'aria e l'espansione dei reparti paracadutisti che formeranno la Divisione 'Folgore'; le campagne di Viterbo risentono delle pesanti requisizioni granarie e zootecniche.";
    },
    getHistoricalName: (_step: number) => "Provincia di Viterbo",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Viterbo",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI42": {
    nuts: "ITI42",
    name: "Provincia di Rieti",
    modernName: "Rieti",
    historicalName: "Provincia di Rieti",
    region: "Lazio",
    keys: ["cittaducale", "iti42", "provincia_di_rieti", "rieti", "sabina", "terminillo"],
    s0_1: "Istituita nel 1927 unendo territori sabini e abruzzesi; bonifica idraulica della Piana Reatina (bacini del Salto e del Turano) e polo industriale con lo zuccherificio di Rieti, lo stabilimento chimico Supertessile (viscosa) e le Officine Reatine Costruzioni Aeronautiche (ORAC/Caproni).",
    s2_4: "1938-1939: completamento dei grandi bacini idroelettrici del Salto e del Turano, che forniscono energia elettrica strategica all'Urbe e all'industria bellica; la produzione di raion e fibre chimiche alla Supertessile tocca il picco autarchico.",
    s5: "Autunno 1939 - primavera 1940: le fabbriche reatine lavorano su commesse militari; gli invasi artificiali del Turano e del Salto alimentano le centrali Enel di Terni e Roma; sorveglianza militare delle dighe contro sabotaggi.",
    s6: "Giugno 1940: mobilitazione dei reggimenti reatini; le Officine Caproni di Rieti producono e riparano cellule e componenti di velivoli da addestramento e collegamento per la Regia Aeronautica.",
    s7: "Fine 1940: la Sabina sostiene l'ammasso obbligatorio di olio d'oliva e cereali; numerosi fanti reatini cadono sul fronte greco montano durante la controffensiva ellenica nel gelo del monte Tomori.",
    s8: "Primavera 1941: Rieti continua a garantire supporto idroelettrico vitale al polo industriale centrale; le restrizioni alimentari si aggravano e crescono le difficoltà d'approvvigionamento nelle frazioni montane.",
    getNote: (step: number) => {
      if (step <= 1) return "Istituita nel 1927 unendo territori sabini e abruzzesi; bonifica idraulica della Piana Reatina (bacini del Salto e del Turano) e polo industriale con lo zuccherificio di Rieti, lo stabilimento chimico Supertessile (viscosa) e le Officine Reatine Costruzioni Aeronautiche (ORAC/Caproni).";
      if (step <= 4) return "1938-1939: completamento dei grandi bacini idroelettrici del Salto e del Turano, che forniscono energia elettrica strategica all'Urbe e all'industria bellica; la produzione di raion e fibre chimiche alla Supertessile tocca il picco autarchico.";
      if (step === 5) return "Autunno 1939 - primavera 1940: le fabbriche reatine lavorano su commesse militari; gli invasi artificiali del Turano e del Salto alimentano le centrali Enel di Terni e Roma; sorveglianza militare delle dighe contro sabotaggi.";
      if (step === 6) return "Giugno 1940: mobilitazione dei reggimenti reatini; le Officine Caproni di Rieti producono e riparano cellule e componenti di velivoli da addestramento e collegamento per la Regia Aeronautica.";
      if (step === 7) return "Fine 1940: la Sabina sostiene l'ammasso obbligatorio di olio d'oliva e cereali; numerosi fanti reatini cadono sul fronte greco montano durante la controffensiva ellenica nel gelo del monte Tomori.";
      return "Primavera 1941: Rieti continua a garantire supporto idroelettrico vitale al polo industriale centrale; le restrizioni alimentari si aggravano e crescono le difficoltà d'approvvigionamento nelle frazioni montane.";
    },
    getHistoricalName: (_step: number) => "Provincia di Rieti",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Rieti",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI43": {
    nuts: "ITI43",
    name: "Governatorato di Roma",
    modernName: "Roma",
    historicalName: "Governatorato di Roma",
    region: "Lazio",
    keys: ["civitavecchia", "frascati", "governatorato_di_roma", "iti43", "lazio", "ostia", "roma", "rome", "tivoli", "velletri"],
    s0_1: "Capitale del Regno e cuore pulsante del fascismo: il 9 maggio 1936 Benito Mussolini proclama l'Impero dal balcone di Palazzo Venezia dopo la caduta di Addis Abeba; avviati i faraonici cantieri dell'Esposizione Universale di Roma del 1942 (E42/EUR), inaugurata Cinecittà nel 1937 e ampliato l'aeroporto di Ciampino.",
    s2_4: "Maggio 1938: visita di Adolf Hitler a Roma con imponenti parate in via dell'Impero; nell'autunno 1938 vengono promulgate le infami leggi razziali fasciste firmate da re Vittorio Emanuele III; nell'aprile 1939 da Roma viene ordinata l'invasione dell'Albania.",
    s5: "Settembre 1939 - maggio 1940: durante la 'non belligeranza', Palazzo Chigi (sede degli Esteri con Galeazzo Ciano) è teatro di febbrili manovre diplomatiche tra Asse e Alleati; tessere annonarie per i romani, continuano a ritmo serrato i lavori monumentali all'EUR.",
    s6: "10 giugno 1940: dal balcone di Palazzo Venezia, Mussolini annuncia alla folla oceanica la dichiarazione di guerra a Gran Bretagna e Francia; Roma diventa il comando supremo (Superesercito, Supermarina, Superaereo) di tutte le operazioni belliche nel Mediterraneo.",
    s7: "Autunno 1940: il 28 ottobre da Roma parte l'ordine di invasione della Grecia ('Spezzeremo le reni alla Grecia'); dopo la disfatta iniziale in Epiro e il siluramento delle navi a Taranto, il maresciallo Badoglio rassegna le dimissioni da Capo di Stato Maggiore Generale, sostituito da Ugo Cavallero.",
    s8: "Primavera 1941: Roma coordina l'intervento congiunto con la Germania nazista nei Balcani e l'invio del DAK di Rommel a Tripoli; intanto giungono le feruttuose notizie della caduta di Addis Abeba (6 aprile 1941) e della perdita del neonato Impero in Africa Orientale.",
    getNote: (step: number) => {
      if (step <= 1) return "Capitale del Regno e cuore pulsante del fascismo: il 9 maggio 1936 Benito Mussolini proclama l'Impero dal balcone di Palazzo Venezia dopo la caduta di Addis Abeba; avviati i faraonici cantieri dell'Esposizione Universale di Roma del 1942 (E42/EUR), inaugurata Cinecittà nel 1937 e ampliato l'aeroporto di Ciampino.";
      if (step <= 4) return "Maggio 1938: visita di Adolf Hitler a Roma con imponenti parate in via dell'Impero; nell'autunno 1938 vengono promulgate le infami leggi razziali fasciste firmate da re Vittorio Emanuele III; nell'aprile 1939 da Roma viene ordinata l'invasione dell'Albania.";
      if (step === 5) return "Settembre 1939 - maggio 1940: durante la 'non belligeranza', Palazzo Chigi (sede degli Esteri con Galeazzo Ciano) è teatro di febbrili manovre diplomatiche tra Asse e Alleati; tessere annonarie per i romani, continuano a ritmo serrato i lavori monumentali all'EUR.";
      if (step === 6) return "10 giugno 1940: dal balcone di Palazzo Venezia, Mussolini annuncia alla folla oceanica la dichiarazione di guerra a Gran Bretagna e Francia; Roma diventa il comando supremo (Superesercito, Supermarina, Superaereo) di tutte le operazioni belliche nel Mediterraneo.";
      if (step === 7) return "Autunno 1940: il 28 ottobre da Roma parte l'ordine di invasione della Grecia ('Spezzeremo le reni alla Grecia'); dopo la disfatta iniziale in Epiro e il siluramento delle navi a Taranto, il maresciallo Badoglio rassegna le dimissioni da Capo di Stato Maggiore Generale, sostituito da Ugo Cavallero.";
      return "Primavera 1941: Roma coordina l'intervento congiunto con la Germania nazista nei Balcani e l'invio del DAK di Rommel a Tripoli; intanto giungono le feruttuose notizie della caduta di Addis Abeba (6 aprile 1941) e della perdita del neonato Impero in Africa Orientale.";
    },
    getHistoricalName: (_step: number) => "Governatorato di Roma",
    getAdminTitle: (_step: number) => "Regno d'Italia — Governatorato di Roma (Capitale dell'Impero)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI44": {
    nuts: "ITI44",
    name: "Provincia di Littoria",
    modernName: "Latina",
    historicalName: "Provincia di Littoria",
    region: "Lazio",
    keys: ["agro_pontino", "aprilia", "formia", "gaeta", "iti44", "latina", "littoria", "pontinia", "provincia_di_littoria", "sabaudia", "terracina"],
    s0_1: "Fiore all'occhiello della bonifica integrale fascista: la provincia di Littoria (fondata nel 1932 e completata con le 'città di fondazione' di Sabaudia, Pontinia, Aprilia nel 1937 e Pomezia nel 1938-1939) ha sconfitto la malaria nelle storiche Paludi Pontine, colonizzate da migliaia di famiglie venete ed emiliane.",
    s2_4: "1938-1939: l'Agro Pontino è la vetrina propagandistica dell'Italia rurale fascista, visitata da delegazioni e sovrani esteri; gli stabilimenti di Gaeta ospitano una fondamentale base della Regia Marina e la scuola nautica della Guardia di Finanza.",
    s5: "Autunno 1939 - primavera 1940: durante la non belligeranza, le campagne di Littoria forniscono ingenti quantitativi di grano, barbabietole ed ortaggi a Roma; Gaeta rafforza le difese costiere della rada.",
    s6: "Giugno 1940: mobilitazione dei coloni pontini; Gaeta e le isole pontine (Ponza e Ventotene, luoghi di confino per gli oppositori politici antifascisti come Pertini e Spinelli) fungono da presidio aeronavale nel Tirreno centro-meridionale.",
    s7: "Fine 1940: convogli partono da Gaeta verso Napoli e la Sicilia; a Littoria la vita dei coloni prosegue duramente tra l'obbligo degli ammassi agricoli e le notizie dei richiamati caduti in Grecia.",
    s8: "Aprile 1941: a Ventotene Altiero Spinelli ed Ernesto Rossi completano la stesura clandestina del 'Manifesto di Ventotene' per un'Europa libera e unita; intanto Littoria continua a rappresentare la principale riserva cerealicola della capitale.",
    getNote: (step: number) => {
      if (step <= 1) return "Fiore all'occhiello della bonifica integrale fascista: la provincia di Littoria (fondata nel 1932 e completata con le 'città di fondazione' di Sabaudia, Pontinia, Aprilia nel 1937 e Pomezia nel 1938-1939) ha sconfitto la malaria nelle storiche Paludi Pontine, colonizzate da migliaia di famiglie venete ed emiliane.";
      if (step <= 4) return "1938-1939: l'Agro Pontino è la vetrina propagandistica dell'Italia rurale fascista, visitata da delegazioni e sovrani esteri; gli stabilimenti di Gaeta ospitano una fondamentale base della Regia Marina e la scuola nautica della Guardia di Finanza.";
      if (step === 5) return "Autunno 1939 - primavera 1940: durante la non belligeranza, le campagne di Littoria forniscono ingenti quantitativi di grano, barbabietole ed ortaggi a Roma; Gaeta rafforza le difese costiere della rada.";
      if (step === 6) return "Giugno 1940: mobilitazione dei coloni pontini; Gaeta e le isole pontine (Ponza e Ventotene, luoghi di confino per gli oppositori politici antifascisti come Pertini e Spinelli) fungono da presidio aeronavale nel Tirreno centro-meridionale.";
      if (step === 7) return "Fine 1940: convogli partono da Gaeta verso Napoli e la Sicilia; a Littoria la vita dei coloni prosegue duramente tra l'obbligo degli ammassi agricoli e le notizie dei richiamati caduti in Grecia.";
      return "Aprile 1941: a Ventotene Altiero Spinelli ed Ernesto Rossi completano la stesura clandestina del 'Manifesto di Ventotene' per un'Europa libera e unita; intanto Littoria continua a rappresentare la principale riserva cerealicola della capitale.";
    },
    getHistoricalName: (_step: number) => "Provincia di Littoria",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Littoria",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITI45": {
    nuts: "ITI45",
    name: "Provincia di Frosinone",
    modernName: "Frosinone",
    historicalName: "Provincia di Frosinone",
    region: "Lazio",
    keys: ["alatri", "anagni", "cassino", "ciociaria", "fiuggi", "frosinone", "iti45", "provincia_di_frosinone", "sora"],
    s0_1: "Istituita nel 1927 nel cuore della Ciociaria, unendo territori pontifici e l'alta Terra di Lavoro; polo industriale e strategico della valle del Sacco con i polverifici e fabbriche di munizioni BPD (Bombrini Parodi Delfino) di Colleferro/Ceccano e la storica Abbazia di Montecassino a Cassino.",
    s2_4: "1938-1939: gli stabilimenti BPD per esplosivi e munizioni nella valle del Sacco triplicano i turni di produzione per le scorte belliche dell'Esercito e dell'Aeronautica; la ferrovia Roma-Napoli via Cassino funge da spina dorsale dei collegamenti nord-sud.",
    s5: "Settembre 1939 - maggio 1940: fabbriche chimiche e di polveri da sparo della Ciociaria dichiarate di massimo interesse militare; Cassino e le gole del Liri vengono cartografate dal Genio militare per le linee difensive territoriali.",
    s6: "Giugno 1940: entrata in guerra dell'Italia; gli stabilimenti di munizioni operano 24 ore su 24 e la stazione ferroviaria di Cassino smista convogli di truppe e rifornimenti diretti a Napoli e Taranto.",
    s7: "Autunno 1940: fanti ciociari inquadrati nei reggimenti campani e laziali combattono in Albania; aumentano le commesse di granate e bombe d'aereo per gli arsenali meridionali.",
    s8: "Aprile 1941: con l'impegno totale dell'Asse su più fronti (Africa, Grecia, Jugoslavia), la Ciociaria garantisce forza motrice, braccia agricole e produzione continua di esplosivi sotto stretta disciplina bellica.",
    getNote: (step: number) => {
      if (step <= 1) return "Istituita nel 1927 nel cuore della Ciociaria, unendo territori pontifici e l'alta Terra di Lavoro; polo industriale e strategico della valle del Sacco con i polverifici e fabbriche di munizioni BPD (Bombrini Parodi Delfino) di Colleferro/Ceccano e la storica Abbazia di Montecassino a Cassino.";
      if (step <= 4) return "1938-1939: gli stabilimenti BPD per esplosivi e munizioni nella valle del Sacco triplicano i turni di produzione per le scorte belliche dell'Esercito e dell'Aeronautica; la ferrovia Roma-Napoli via Cassino funge da spina dorsale dei collegamenti nord-sud.";
      if (step === 5) return "Settembre 1939 - maggio 1940: fabbriche chimiche e di polveri da sparo della Ciociaria dichiarate di massimo interesse militare; Cassino e le gole del Liri vengono cartografate dal Genio militare per le linee difensive territoriali.";
      if (step === 6) return "Giugno 1940: entrata in guerra dell'Italia; gli stabilimenti di munizioni operano 24 ore su 24 e la stazione ferroviaria di Cassino smista convogli di truppe e rifornimenti diretti a Napoli e Taranto.";
      if (step === 7) return "Autunno 1940: fanti ciociari inquadrati nei reggimenti campani e laziali combattono in Albania; aumentano le commesse di granate e bombe d'aereo per gli arsenali meridionali.";
      return "Aprile 1941: con l'impegno totale dell'Asse su più fronti (Africa, Grecia, Jugoslavia), la Ciociaria garantisce forza motrice, braccia agricole e produzione continua di esplosivi sotto stretta disciplina bellica.";
    },
    getHistoricalName: (_step: number) => "Provincia di Frosinone",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Frosinone",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF11": {
    nuts: "ITF11",
    name: "",
    modernName: "L'Aquila",
    historicalName: "",
    region: "Abruzzo",
    keys: ["aquila", "aquila_degli_abruzzi", "avezzano", "itf11", "l_aquila", "sulmona"],
    s0_1: "Capoluogo abruzzese (denominata ufficialmente 'Aquila degli Abruzzi' dal 1863 al 1939), centro di tradizioni alpine e pastorali; presenza degli impianti chimici e di cloro-soda a Bussi sul Tirino e avvio del turismo invernale sul Gran Sasso (funivia di Campo Imperatore inaugurata nel 1934).",
    s2_4: "1938-1939: con R.D. del 1939 la denominazione ufficiale ritorna 'L'Aquila'; il Battaglione Alpini 'L'Aquila' della Divisione 'Julia' costituisce l'orgoglio militare della terra d'Abruzzo.",
    s5: "Settembre 1939 - primavera 1940: gli alpini aquilani della Julia vengono mobilitati e trasferiti in Albania a presidio della frontiera greca e jugoslava; a Bussi e nella conca aquilana si accumulano prodotti chimici ausiliari per la guerra.",
    s6: "Giugno 1940: l'aquilano segue con apprensione l'avvio delle ostilità; la Divisione Julia inquadra migliaia di giovani montanari abruzzesi in attesa di impiego operativo oltremare.",
    s7: "Autunno-inverno 1940: tragedia ed eroismo della Divisione Alpina Julia sul Pindo durante la campagna di Grecia (ottobre-dicembre 1940): il Battaglione L'Aquila subisce perdite devastanti nella morsa del gelo montano, suscitando profondo lutto in tutta la provincia.",
    s8: "Aprile 1941: mentre la Wehrmacht travolge le difese greche, i resti provati del Battaglione L'Aquila ricevono la medaglia d'oro al valor militare; la provincia sostiene l'ammasso della lana e del bestiame per l'esercito.",
    getNote: (step: number) => {
      if (step <= 1) return "Capoluogo abruzzese (denominata ufficialmente 'Aquila degli Abruzzi' dal 1863 al 1939), centro di tradizioni alpine e pastorali; presenza degli impianti chimici e di cloro-soda a Bussi sul Tirino e avvio del turismo invernale sul Gran Sasso (funivia di Campo Imperatore inaugurata nel 1934).";
      if (step <= 4) return "1938-1939: con R.D. del 1939 la denominazione ufficiale ritorna 'L'Aquila'; il Battaglione Alpini 'L'Aquila' della Divisione 'Julia' costituisce l'orgoglio militare della terra d'Abruzzo.";
      if (step === 5) return "Settembre 1939 - primavera 1940: gli alpini aquilani della Julia vengono mobilitati e trasferiti in Albania a presidio della frontiera greca e jugoslava; a Bussi e nella conca aquilana si accumulano prodotti chimici ausiliari per la guerra.";
      if (step === 6) return "Giugno 1940: l'aquilano segue con apprensione l'avvio delle ostilità; la Divisione Julia inquadra migliaia di giovani montanari abruzzesi in attesa di impiego operativo oltremare.";
      if (step === 7) return "Autunno-inverno 1940: tragedia ed eroismo della Divisione Alpina Julia sul Pindo durante la campagna di Grecia (ottobre-dicembre 1940): il Battaglione L'Aquila subisce perdite devastanti nella morsa del gelo montano, suscitando profondo lutto in tutta la provincia.";
      return "Aprile 1941: mentre la Wehrmacht travolge le difese greche, i resti provati del Battaglione L'Aquila ricevono la medaglia d'oro al valor militare; la provincia sostiene l'ammasso della lana e del bestiame per l'esercito.";
    },
    getHistoricalName: (_step: number) => "",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia dell'Aquila",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF12": {
    nuts: "ITF12",
    name: "Provincia di Teramo",
    modernName: "Teramo",
    historicalName: "Provincia di Teramo",
    region: "Abruzzo",
    keys: ["atri", "giulianova", "itf12", "provincia_di_teramo", "roseto_degli_abruzzi", "teramo"],
    s0_1: "Provincia adagiata tra i rilievi del Gran Sasso e la costa adriatica; agricoltura collinare (cereali, vigneti, uliveti) e piccole manifatture; massiccia adesione rurale alla Battaglia del Grano fascista.",
    s2_4: "1938-1939: potenziamento delle opere di bonifica del fiume Vomano e del Salinello; applicazione delle leggi razziali con censimento degli ebrei e sorveglianza politica nei borghi montani.",
    s5: "Autunno 1939 - primavera 1940: non belligeranza; Teramo fornisce reclute per le divisioni di fanteria e alpini; aumento delle quote d'ammasso per grano e olio di oliva.",
    s6: "Giugno 1940: entrata in guerra; la litoranea adriatica da Giulianova a Tortoreto viene oscurata e presidiata da batterie costiere per il controllo navale.",
    s7: "Fine 1940: richiamo alle armi delle classi giovanili per il fronte greco-albanese; a Teramo e nella fortezza borbonica di Civitella del Tronto si preparano depositi e centri di smistamento.",
    s8: "Primavera 1941: la provincia teramana accoglie campi d'internamento per civili antifascisti ed ebrei stranieri (come a Civitella del Tronto, Notaresco e Tossicia), mentre continua l'invio di reclute e scorte alimentari.",
    getNote: (step: number) => {
      if (step <= 1) return "Provincia adagiata tra i rilievi del Gran Sasso e la costa adriatica; agricoltura collinare (cereali, vigneti, uliveti) e piccole manifatture; massiccia adesione rurale alla Battaglia del Grano fascista.";
      if (step <= 4) return "1938-1939: potenziamento delle opere di bonifica del fiume Vomano e del Salinello; applicazione delle leggi razziali con censimento degli ebrei e sorveglianza politica nei borghi montani.";
      if (step === 5) return "Autunno 1939 - primavera 1940: non belligeranza; Teramo fornisce reclute per le divisioni di fanteria e alpini; aumento delle quote d'ammasso per grano e olio di oliva.";
      if (step === 6) return "Giugno 1940: entrata in guerra; la litoranea adriatica da Giulianova a Tortoreto viene oscurata e presidiata da batterie costiere per il controllo navale.";
      if (step === 7) return "Fine 1940: richiamo alle armi delle classi giovanili per il fronte greco-albanese; a Teramo e nella fortezza borbonica di Civitella del Tronto si preparano depositi e centri di smistamento.";
      return "Primavera 1941: la provincia teramana accoglie campi d'internamento per civili antifascisti ed ebrei stranieri (come a Civitella del Tronto, Notaresco e Tossicia), mentre continua l'invio di reclute e scorte alimentari.";
    },
    getHistoricalName: (_step: number) => "Provincia di Teramo",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Teramo",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF13": {
    nuts: "ITF13",
    name: "Provincia di Pescara",
    modernName: "Pescara",
    historicalName: "Provincia di Pescara",
    region: "Abruzzo",
    keys: ["castellammare_adriatico", "itf13", "penne", "pescara", "popoli", "provincia_di_pescara"],
    s0_1: "Istituita nel 1927 su forte impulso di Gabriele D'Annunzio e Giacomo Acerbo; snodo ferroviario adriatico di primaria importanza, sede dell'aeroporto militare di Pescara e polo chimico della Val Pescara (Piano d'Orta).",
    s2_4: "1938-1939: gli stabilimenti di carburo e derivati di Piano d'Orta e della Val Pescara lavorano per la chimica di base; l'aeroporto di Pescara addestra squadriglie della Regia Aeronautica.",
    s5: "Settembre 1939 - maggio 1940: nodo vitale del traffico merci tra nord e sud; l'aeroporto pescarese funge da scalo tecnico per i collegamenti aerei verso l'Albania e l'Egeo.",
    s6: "Giugno 1940: dichiarazione di guerra; il porto-canale di Pescara e lo scalo ferroviario sono militarizzati; squadriglie di caccia e ricognizione presidiano il medio Adriatico.",
    s7: "Autunno 1940: dal nodo ferroviario di Pescara transitano senza sosta i convogli di truppe e salmerie diretti ai porti di Bari e Brindisi per la Grecia; le fabbriche chimiche operano a ciclo continuo.",
    s8: "Aprile 1941: durante l'invasione della Jugoslavia, l'aeroporto di Pescara ospita reparti da bombardamento impegnati contro obiettivi della costa dalmata ed erzegovese.",
    getNote: (step: number) => {
      if (step <= 1) return "Istituita nel 1927 su forte impulso di Gabriele D'Annunzio e Giacomo Acerbo; snodo ferroviario adriatico di primaria importanza, sede dell'aeroporto militare di Pescara e polo chimico della Val Pescara (Piano d'Orta).";
      if (step <= 4) return "1938-1939: gli stabilimenti di carburo e derivati di Piano d'Orta e della Val Pescara lavorano per la chimica di base; l'aeroporto di Pescara addestra squadriglie della Regia Aeronautica.";
      if (step === 5) return "Settembre 1939 - maggio 1940: nodo vitale del traffico merci tra nord e sud; l'aeroporto pescarese funge da scalo tecnico per i collegamenti aerei verso l'Albania e l'Egeo.";
      if (step === 6) return "Giugno 1940: dichiarazione di guerra; il porto-canale di Pescara e lo scalo ferroviario sono militarizzati; squadriglie di caccia e ricognizione presidiano il medio Adriatico.";
      if (step === 7) return "Autunno 1940: dal nodo ferroviario di Pescara transitano senza sosta i convogli di truppe e salmerie diretti ai porti di Bari e Brindisi per la Grecia; le fabbriche chimiche operano a ciclo continuo.";
      return "Aprile 1941: durante l'invasione della Jugoslavia, l'aeroporto di Pescara ospita reparti da bombardamento impegnati contro obiettivi della costa dalmata ed erzegovese.";
    },
    getHistoricalName: (_step: number) => "Provincia di Pescara",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Pescara",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF14": {
    nuts: "ITF14",
    name: "Provincia di Chieti",
    modernName: "Chieti",
    historicalName: "Provincia di Chieti",
    region: "Abruzzo",
    keys: ["chieti", "itf14", "lanciano", "ortona", "provincia_di_chieti", "vasto"],
    s0_1: "Capoluogo dell'Abruzzo Citeriore, affacciato sulla fertile valle del Pescara e sulla Costa dei Trabocchi; sede di importanti presidi militari e dell'Ospedale Militare; economia a forte impronta agricola e olearia.",
    s2_4: "1938-1939: potenziamento dell'ammasso obbligatorio dei cereali e dell'olio d'oliva; a Casoli e Ortona si ampliano gli impianti di conservazione delle derrate per le scorte nazionali.",
    s5: "Autunno 1939 - primavera 1940: Chieti registra un intenso afflusso di reclute presso la caserma 'Vittorio Emanuele II'; la non belligeranza è scandita dalle tessere del razionamento.",
    s6: "Giugno 1940: entrata in guerra; il porto di Ortona viene mobilitato per il traffico mercantile costiero e la posa di sbarramenti difensivi contro sommergibili nemici.",
    s7: "Fine 1940: numerosi soldati teatini combattono sul fronte greco-albanese; a Chieti l'ospedale militare comincia a ricevere feriti e congelati trasportati via mare da Durazzo e Valona.",
    s8: "Primavera 1941: a Casoli e in altri comuni della provincia vengono aperti campi d'internamento per prigionieri politici, zingari ed ebrei stranieri sotto la sorveglianza prefettizia.",
    getNote: (step: number) => {
      if (step <= 1) return "Capoluogo dell'Abruzzo Citeriore, affacciato sulla fertile valle del Pescara e sulla Costa dei Trabocchi; sede di importanti presidi militari e dell'Ospedale Militare; economia a forte impronta agricola e olearia.";
      if (step <= 4) return "1938-1939: potenziamento dell'ammasso obbligatorio dei cereali e dell'olio d'oliva; a Casoli e Ortona si ampliano gli impianti di conservazione delle derrate per le scorte nazionali.";
      if (step === 5) return "Autunno 1939 - primavera 1940: Chieti registra un intenso afflusso di reclute presso la caserma 'Vittorio Emanuele II'; la non belligeranza è scandita dalle tessere del razionamento.";
      if (step === 6) return "Giugno 1940: entrata in guerra; il porto di Ortona viene mobilitato per il traffico mercantile costiero e la posa di sbarramenti difensivi contro sommergibili nemici.";
      if (step === 7) return "Fine 1940: numerosi soldati teatini combattono sul fronte greco-albanese; a Chieti l'ospedale militare comincia a ricevere feriti e congelati trasportati via mare da Durazzo e Valona.";
      return "Primavera 1941: a Casoli e in altri comuni della provincia vengono aperti campi d'internamento per prigionieri politici, zingari ed ebrei stranieri sotto la sorveglianza prefettizia.";
    },
    getHistoricalName: (_step: number) => "Provincia di Chieti",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Chieti",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF21": {
    nuts: "ITF21",
    name: "Isernia (Provincia di Campobasso)",
    modernName: "Isernia",
    historicalName: "Isernia (Provincia di Campobasso)",
    region: "Molise",
    keys: ["agnone", "isernia", "isernia_campobasso", "isernia_provincia_di_campobasso", "itf21", "venafro"],
    s0_1: "Compresa amministrativamente nella provincia di Campobasso (Abruzzi e Molise) fino al 1970; territorio montuoso dell'Alto Molise e delle Mainarde, caratterizzato da boschi, pascoli e produzione di merletti e ferri battuti.",
    s2_4: "1938-1939: le valli del Volturno e del Sangro vedono l'avvio di cantieri idroelettrici minori; forte emigrazione storica verso le Americhe ormai bloccata dalle restrizioni fasciste e internazionali.",
    s5: "Autunno 1939 - primavera 1940: le comunità rurali dell'Alto Molise forniscono contingenti di leva per la fanteria e gli alpini; si intensifica la raccolta autarchica di legname e carbone di legna.",
    s6: "Giugno 1940: mobilitazione generale; le mulattiere e i passi montani verso il Lazio e la Campania sono presidiati dalla Milizia Confinaria e Forestale.",
    s7: "Autunno 1940: i giovani dell'Alto Molise affrontano le rigide battaglie sul fronte albanese; il distretto soffre le restrizioni alimentari, mitigatedalle risorse dell'economia silvo-pastorale.",
    s8: "Aprile 1941: Isernia e Agnone sostengono lo sforzo bellico con la produzione artigianale e l'allevamento ovino per le razioni di carne e lana del Regio Esercito.",
    getNote: (step: number) => {
      if (step <= 1) return "Compresa amministrativamente nella provincia di Campobasso (Abruzzi e Molise) fino al 1970; territorio montuoso dell'Alto Molise e delle Mainarde, caratterizzato da boschi, pascoli e produzione di merletti e ferri battuti.";
      if (step <= 4) return "1938-1939: le valli del Volturno e del Sangro vedono l'avvio di cantieri idroelettrici minori; forte emigrazione storica verso le Americhe ormai bloccata dalle restrizioni fasciste e internazionali.";
      if (step === 5) return "Autunno 1939 - primavera 1940: le comunità rurali dell'Alto Molise forniscono contingenti di leva per la fanteria e gli alpini; si intensifica la raccolta autarchica di legname e carbone di legna.";
      if (step === 6) return "Giugno 1940: mobilitazione generale; le mulattiere e i passi montani verso il Lazio e la Campania sono presidiati dalla Milizia Confinaria e Forestale.";
      if (step === 7) return "Autunno 1940: i giovani dell'Alto Molise affrontano le rigide battaglie sul fronte albanese; il distretto soffre le restrizioni alimentari, mitigatedalle risorse dell'economia silvo-pastorale.";
      return "Aprile 1941: Isernia e Agnone sostengono lo sforzo bellico con la produzione artigianale e l'allevamento ovino per le razioni di carne e lana del Regio Esercito.";
    },
    getHistoricalName: (_step: number) => "Isernia (Provincia di Campobasso)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Circondario di Isernia (Provincia di Campobasso)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF22": {
    nuts: "ITF22",
    name: "Provincia di Campobasso",
    modernName: "Campobasso",
    historicalName: "Provincia di Campobasso",
    region: "Molise",
    keys: ["campobasso", "itf22", "larino", "provincia_di_campobasso", "termoli"],
    s0_1: "Capoluogo del Molise storico, con lo sbocco marittimo di Termoli sull'Adriatico; economia imperniata su granicoltura, zootecnia e lavorazione dell'acciaio traforato e lame a Frosolone e Campobasso.",
    s2_4: "1938-1939: espansione della cerealicoltura sulla piana di Larino; le coltellerie di Campobasso e Frosolone lavorano su commesse militari per pugnali da combattimento e baionette.",
    s5: "Settembre 1939 - maggio 1940: non belligeranza; il porto di Termoli viene dotato di postazioni di sorveglianza costiera e marittima; ammassi granari rigorosi.",
    s6: "Giugno 1940: scoppio delle ostilità; la costa molisana è oscurata e i reggimenti di leva mobilitati verso i fronti d'operazione; le coltellerie lavorano a ritmo serrato per i reparti d'assalto.",
    s7: "Fine 1940: le famiglie molisane pagano un pesante tributo di sangue sul fronte greco-albanese; a Campobasso arrivano i primi convogli di feriti e si razionano farina e sale.",
    s8: "Primavera 1941: a Bojano e nell'agro molisano vengono attivati campi di concentramento fascisti per internati civili (Campo di Bojano); il transito ferroviario su Termoli alimenta i rifornimenti adriatici.",
    getNote: (step: number) => {
      if (step <= 1) return "Capoluogo del Molise storico, con lo sbocco marittimo di Termoli sull'Adriatico; economia imperniata su granicoltura, zootecnia e lavorazione dell'acciaio traforato e lame a Frosolone e Campobasso.";
      if (step <= 4) return "1938-1939: espansione della cerealicoltura sulla piana di Larino; le coltellerie di Campobasso e Frosolone lavorano su commesse militari per pugnali da combattimento e baionette.";
      if (step === 5) return "Settembre 1939 - maggio 1940: non belligeranza; il porto di Termoli viene dotato di postazioni di sorveglianza costiera e marittima; ammassi granari rigorosi.";
      if (step === 6) return "Giugno 1940: scoppio delle ostilità; la costa molisana è oscurata e i reggimenti di leva mobilitati verso i fronti d'operazione; le coltellerie lavorano a ritmo serrato per i reparti d'assalto.";
      if (step === 7) return "Fine 1940: le famiglie molisane pagano un pesante tributo di sangue sul fronte greco-albanese; a Campobasso arrivano i primi convogli di feriti e si razionano farina e sale.";
      return "Primavera 1941: a Bojano e nell'agro molisano vengono attivati campi di concentramento fascisti per internati civili (Campo di Bojano); il transito ferroviario su Termoli alimenta i rifornimenti adriatici.";
    },
    getHistoricalName: (_step: number) => "Provincia di Campobasso",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Campobasso (Molise)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF31": {
    nuts: "ITF31",
    name: "Caserta (Provincia di Napoli)",
    modernName: "Caserta",
    historicalName: "Caserta (Provincia di Napoli)",
    region: "Campania",
    keys: ["aversa", "capua", "caserta", "caserta_napoli", "caserta_provincia_di_napoli", "itf31", "maddaloni", "santa_maria_capua_vetere", "terra_di_lavoro"],
    s0_1: "Provincia storica di Terra di Lavoro soppressa dal regime fascista nel 1927 e suddivisa tra Napoli, Roma, Littoria, Benevento e Frosinone (ripristinata solo nel 1945); la magnifica Reggia del Vanvitelli ospita la prestigiosa Regia Accademia Aeronautica fondata nel 1923, fucina dei piloti d'Italia.",
    s2_4: "1938-1939: l'Accademia Aeronautica a Caserta forma gli assi della caccia e del siluramento aereo; le seterie storiche di San Leucio producono paracadute in seta autarchica e drappi speciali per l'aviazione.",
    s5: "Autunno 1939 - primavera 1940: intensificazione dei corsi all'Accademia Aeronautica; il tabacco e la canapa della piana casertana sono considerati materie strategiche autarchiche.",
    s6: "Giugno 1940: dichiarazione di guerra; i giovani ufficiali piloti usciti dalla Reggia di Caserta decollano immediatamente per le prime missioni su Malta, sul Mediterraneo e sulle Alpi.",
    s7: "Autunno 1940: l'agro casertano fornisce derrate agricole massive per la popolazione di Napoli e per le truppe; alla Reggia si moltiplicano i corsi accelerati per piloti e motoristi.",
    s8: "Aprile 1941: i piloti dell'Accademia di Caserta combattono nei cieli dei Balcani, di Malta e della Marmarica libica; il territorio casertano continua a fungere da fondamentale vivaio di specialisti del volo.",
    getNote: (step: number) => {
      if (step <= 1) return "Provincia storica di Terra di Lavoro soppressa dal regime fascista nel 1927 e suddivisa tra Napoli, Roma, Littoria, Benevento e Frosinone (ripristinata solo nel 1945); la magnifica Reggia del Vanvitelli ospita la prestigiosa Regia Accademia Aeronautica fondata nel 1923, fucina dei piloti d'Italia.";
      if (step <= 4) return "1938-1939: l'Accademia Aeronautica a Caserta forma gli assi della caccia e del siluramento aereo; le seterie storiche di San Leucio producono paracadute in seta autarchica e drappi speciali per l'aviazione.";
      if (step === 5) return "Autunno 1939 - primavera 1940: intensificazione dei corsi all'Accademia Aeronautica; il tabacco e la canapa della piana casertana sono considerati materie strategiche autarchiche.";
      if (step === 6) return "Giugno 1940: dichiarazione di guerra; i giovani ufficiali piloti usciti dalla Reggia di Caserta decollano immediatamente per le prime missioni su Malta, sul Mediterraneo e sulle Alpi.";
      if (step === 7) return "Autunno 1940: l'agro casertano fornisce derrate agricole massive per la popolazione di Napoli e per le truppe; alla Reggia si moltiplicano i corsi accelerati per piloti e motoristi.";
      return "Aprile 1941: i piloti dell'Accademia di Caserta combattono nei cieli dei Balcani, di Malta e della Marmarica libica; il territorio casertano continua a fungere da fondamentale vivaio di specialisti del volo.";
    },
    getHistoricalName: (_step: number) => "Caserta (Provincia di Napoli)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Caserta (Provincia di Napoli)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF32": {
    nuts: "ITF32",
    name: "Provincia di Benevento",
    modernName: "Benevento",
    historicalName: "Provincia di Benevento",
    region: "Campania",
    keys: ["benevento", "itf32", "montesarchio", "provincia_di_benevento", "sannio"],
    s0_1: "Capoluogo del Sannio, snodo ferroviario nevralgico della linea Roma-Napoli-Foggia-Bari; economia agricola con tabacchicoltura, viticoltura e il celebre stabilimento del Liquore Strega (Alberti).",
    s2_4: "1938-1939: lo scalo ferroviario di Benevento viene ampliato per smistare i convogli merci tra il Tirreno e l'Adriatico; le colture di tabacco del Sannio forniscono le manifatture di stato dei Monopoli.",
    s5: "Settembre 1939 - maggio 1940: durante la non belligeranza, lo snodo di Benevento smista treni carichi di grano e materiali autarchici per i depositi militari della Campania e della Puglia.",
    s6: "Giugno 1940: mobilitazione dei reggimenti campani; la stazione ferroviaria di Benevento è presidiata militarmente come arteria vitale di raccordo trasversale tra le due coste.",
    s7: "Fine 1940: il transito ininterrotto di convogli militari verso Bari e Brindisi per il fronte albanese fa del nodo sannita un punto di massimo traffico; severe restrizioni annonarie per i cittadini.",
    s8: "Primavera 1941: Benevento continua a garantire il flusso logistico ferroviario verso i porti pugliesi impegnati nell'invasione della Jugoslavia e nei rifornimenti per la Libia.",
    getNote: (step: number) => {
      if (step <= 1) return "Capoluogo del Sannio, snodo ferroviario nevralgico della linea Roma-Napoli-Foggia-Bari; economia agricola con tabacchicoltura, viticoltura e il celebre stabilimento del Liquore Strega (Alberti).";
      if (step <= 4) return "1938-1939: lo scalo ferroviario di Benevento viene ampliato per smistare i convogli merci tra il Tirreno e l'Adriatico; le colture di tabacco del Sannio forniscono le manifatture di stato dei Monopoli.";
      if (step === 5) return "Settembre 1939 - maggio 1940: durante la non belligeranza, lo snodo di Benevento smista treni carichi di grano e materiali autarchici per i depositi militari della Campania e della Puglia.";
      if (step === 6) return "Giugno 1940: mobilitazione dei reggimenti campani; la stazione ferroviaria di Benevento è presidiata militarmente come arteria vitale di raccordo trasversale tra le due coste.";
      if (step === 7) return "Fine 1940: il transito ininterrotto di convogli militari verso Bari e Brindisi per il fronte albanese fa del nodo sannita un punto di massimo traffico; severe restrizioni annonarie per i cittadini.";
      return "Primavera 1941: Benevento continua a garantire il flusso logistico ferroviario verso i porti pugliesi impegnati nell'invasione della Jugoslavia e nei rifornimenti per la Libia.";
    },
    getHistoricalName: (_step: number) => "Provincia di Benevento",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Benevento",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF33": {
    nuts: "ITF33",
    name: "Provincia di Napoli",
    modernName: "Napoli",
    historicalName: "Provincia di Napoli",
    region: "Campania",
    keys: ["campania", "capri", "castellammare_di_stabia", "ischia", "itf33", "naples", "napoli", "pozzuoli", "provincia_di_napoli", "torre_annunziata", "torre_del_greco"],
    s0_1: "Seconda metropoli del Regno e massimo polo industriale e marittimo del Mezzogiorno: Cantieri Navali di Castellammare di Stabia, Bacini di Carenaggio, Silurificio Italiano di Baia, Arsenale di Napoli, Officine Meccaniche e Fonderie di Bagnoli, polo aeronautico IMAM a Capodichino (aerei Ro.37, Ro.43, Ro.57).",
    s2_4: "Maggio 1938: imponente Rivista Navale nel Golfo di Napoli alla presenza di Hitler e Mussolini con oltre cento navi da guerra e sommergibili schierati; promulgazione delle leggi razziali; Castellammare e Bagnoli lavorano a pieno regime per la Regia Marina.",
    s5: "Settembre 1939 - maggio 1940: Napoli è il terminale principale per le rotte marittime con la Libia; la città si dota di rifugi antiaerei nelle storiche cavità tufacee di Napoli Sotterranea; l'ANIC e le raffinerie lavorano su scorte di greggio.",
    s6: "Giugno 1940: 10 giugno dichiarazione di guerra; già nella notte tra l'11 e il 12 giugno 1940 e poi nei mesi successivi, Napoli subisce i primi bombardamenti aerei notturni della RAF britannica e dell'aviazione francese, causando decine di vittime civili nel porto e a via Marina.",
    s7: "Autunno 1940: Napoli è il porto cardine per l'imbarco delle truppe e dei rifornimenti verso Tripoli e Bengasi; i raid aerei britannici da portaerei e da Malta si intensificano; la popolazione trascorre le notti nei rifugi tufacei sotto un costante regime di sirene.",
    s8: "Primavera 1941: il porto di Napoli è congestionato dai convogli per il trasporto del Deutsches Afrikakorps di Erwin Rommel in Libia; i cantieri di Castellammare e Bagnoli riparano a ciclo continuo navi silurate; severe privazioni alimentari per la popolazione partenopea.",
    getNote: (step: number) => {
      if (step <= 1) return "Seconda metropoli del Regno e massimo polo industriale e marittimo del Mezzogiorno: Cantieri Navali di Castellammare di Stabia, Bacini di Carenaggio, Silurificio Italiano di Baia, Arsenale di Napoli, Officine Meccaniche e Fonderie di Bagnoli, polo aeronautico IMAM a Capodichino (aerei Ro.37, Ro.43, Ro.57).";
      if (step <= 4) return "Maggio 1938: imponente Rivista Navale nel Golfo di Napoli alla presenza di Hitler e Mussolini con oltre cento navi da guerra e sommergibili schierati; promulgazione delle leggi razziali; Castellammare e Bagnoli lavorano a pieno regime per la Regia Marina.";
      if (step === 5) return "Settembre 1939 - maggio 1940: Napoli è il terminale principale per le rotte marittime con la Libia; la città si dota di rifugi antiaerei nelle storiche cavità tufacee di Napoli Sotterranea; l'ANIC e le raffinerie lavorano su scorte di greggio.";
      if (step === 6) return "Giugno 1940: 10 giugno dichiarazione di guerra; già nella notte tra l'11 e il 12 giugno 1940 e poi nei mesi successivi, Napoli subisce i primi bombardamenti aerei notturni della RAF britannica e dell'aviazione francese, causando decine di vittime civili nel porto e a via Marina.";
      if (step === 7) return "Autunno 1940: Napoli è il porto cardine per l'imbarco delle truppe e dei rifornimenti verso Tripoli e Bengasi; i raid aerei britannici da portaerei e da Malta si intensificano; la popolazione trascorre le notti nei rifugi tufacei sotto un costante regime di sirene.";
      return "Primavera 1941: il porto di Napoli è congestionato dai convogli per il trasporto del Deutsches Afrikakorps di Erwin Rommel in Libia; i cantieri di Castellammare e Bagnoli riparano a ciclo continuo navi silurate; severe privazioni alimentari per la popolazione partenopea.";
    },
    getHistoricalName: (_step: number) => "Provincia di Napoli",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Napoli",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF34": {
    nuts: "ITF34",
    name: "Provincia di Avellino",
    modernName: "Avellino",
    historicalName: "Provincia di Avellino",
    region: "Campania",
    keys: ["ariano_irpino", "avellino", "irpinia", "itf34", "provincia_di_avellino"],
    s0_1: "Capoluogo dell'Irpinia montuosa; forte vocazione agricola (castagne, noci, vino, grano), allevamento e sede di grandi caserme e campi di addestramento militare per la fanteria del Regio Esercito.",
    s2_4: "1938-1939: le valli del Calore e del Sabato sostengono la Battaglia del Grano fascista; le caserme irpine inquadrano migliaia di coscritti campani per il servizio di leva obbligatorio.",
    s5: "Autunno 1939 - primavera 1940: non belligeranza; Avellino accoglie comandi logistici e centri di addestramento; la rigida applicazione del tesseramento annonario disciplina la distribuzione alimentare.",
    s6: "Giugno 1940: mobilitazione dei reggimenti campani verso i vari teatri operativi; le riserve granarie e bovine irpine vengono convogliate verso Napoli e Roma.",
    s7: "Fine 1940: i soldati irpini pagano un pesante tributo sui fronti della Cirenaica e della Grecia; a Monteforte Irpino e Ariano Irpino si istituiscono posti di sorveglianza per la difesa interna.",
    s8: "Primavera 1941: ad Ariano Irpino e in altri centri della provincia vengono internati antifascisti e prigionieri politici; la popolazione civile fronteggia la mancanza di calzature e vestiti invernali.",
    getNote: (step: number) => {
      if (step <= 1) return "Capoluogo dell'Irpinia montuosa; forte vocazione agricola (castagne, noci, vino, grano), allevamento e sede di grandi caserme e campi di addestramento militare per la fanteria del Regio Esercito.";
      if (step <= 4) return "1938-1939: le valli del Calore e del Sabato sostengono la Battaglia del Grano fascista; le caserme irpine inquadrano migliaia di coscritti campani per il servizio di leva obbligatorio.";
      if (step === 5) return "Autunno 1939 - primavera 1940: non belligeranza; Avellino accoglie comandi logistici e centri di addestramento; la rigida applicazione del tesseramento annonario disciplina la distribuzione alimentare.";
      if (step === 6) return "Giugno 1940: mobilitazione dei reggimenti campani verso i vari teatri operativi; le riserve granarie e bovine irpine vengono convogliate verso Napoli e Roma.";
      if (step === 7) return "Fine 1940: i soldati irpini pagano un pesante tributo sui fronti della Cirenaica e della Grecia; a Monteforte Irpino e Ariano Irpino si istituiscono posti di sorveglianza per la difesa interna.";
      return "Primavera 1941: ad Ariano Irpino e in altri centri della provincia vengono internati antifascisti e prigionieri politici; la popolazione civile fronteggia la mancanza di calzature e vestiti invernali.";
    },
    getHistoricalName: (_step: number) => "Provincia di Avellino",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Avellino",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF35": {
    nuts: "ITF35",
    name: "Provincia di Salerno",
    modernName: "Salerno",
    historicalName: "Provincia di Salerno",
    region: "Campania",
    keys: ["amalfi", "battipaglia", "cava_de_tirreni", "cilento", "itf35", "nocera_inferiore", "provincia_di_salerno", "salerno"],
    s0_1: "Seconda provincia campana per estensione, unendo la Costiera Amalfitana, la fertile Piana del Sele bonificata dal regime fascista e il montuoso Cilento; polo tessile storico a Nocera-Angri e conserviero a Pagani e Scafati.",
    s2_4: "1938-1939: la bonifica della Piana del Sele incrementa la resa di pomodori, grano e zootecnia da latte (bufale); l'industria conserviera dell'Agro Nocerino-Sarnese produce milioni di scatolette di razioni alimentari per l'esercito.",
    s5: "Settembre 1939 - maggio 1940: il porto di Salerno e la costa cilentana rafforzano i punti di avvistamento; le conserve dell'Agro Sarnese sono destinate all'ammasso bellico prioritario.",
    s6: "Giugno 1940: dichiarazione di guerra; il golfo di Salerno è inserito nella cintura difensiva marittima tirrenica; convogli costieri collegano Salerno alla Sicilia e alla Calabria.",
    s7: "Autunno 1940: le industrie conserviere salernitane lavorano a pieno regime per rifornire i soldati impegnati sul fronte libico ed egiziano; la città subisce i primi allarmi aerei notturni.",
    s8: "Primavera 1941: il porto di Salerno smista merci per i porti meridionali; nelle campagne della Piana del Sele si accentuano i controlli per contrastare la borsa nera delle derrate alimentari.",
    getNote: (step: number) => {
      if (step <= 1) return "Seconda provincia campana per estensione, unendo la Costiera Amalfitana, la fertile Piana del Sele bonificata dal regime fascista e il montuoso Cilento; polo tessile storico a Nocera-Angri e conserviero a Pagani e Scafati.";
      if (step <= 4) return "1938-1939: la bonifica della Piana del Sele incrementa la resa di pomodori, grano e zootecnia da latte (bufale); l'industria conserviera dell'Agro Nocerino-Sarnese produce milioni di scatolette di razioni alimentari per l'esercito.";
      if (step === 5) return "Settembre 1939 - maggio 1940: il porto di Salerno e la costa cilentana rafforzano i punti di avvistamento; le conserve dell'Agro Sarnese sono destinate all'ammasso bellico prioritario.";
      if (step === 6) return "Giugno 1940: dichiarazione di guerra; il golfo di Salerno è inserito nella cintura difensiva marittima tirrenica; convogli costieri collegano Salerno alla Sicilia e alla Calabria.";
      if (step === 7) return "Autunno 1940: le industrie conserviere salernitane lavorano a pieno regime per rifornire i soldati impegnati sul fronte libico ed egiziano; la città subisce i primi allarmi aerei notturni.";
      return "Primavera 1941: il porto di Salerno smista merci per i porti meridionali; nelle campagne della Piana del Sele si accentuano i controlli per contrastare la borsa nera delle derrate alimentari.";
    },
    getHistoricalName: (_step: number) => "Provincia di Salerno",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Salerno",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF43": {
    nuts: "ITF43",
    name: "Provincia di Taranto (Provincia dello Jonio)",
    modernName: "Taranto",
    historicalName: "Provincia di Taranto (Provincia dello Jonio)",
    region: "Puglia",
    keys: ["grottaglie", "itf43", "jonio", "manduria", "martina_franca", "provincia_di_taranto_provincia_dello_jonio", "taranto", "taranto_provincia_dello_jonio"],
    s0_1: "Provincia Jonica e massima base navale della Regia Marina: il Mar Piccolo e il Mar Grande ospitano il Regio Arsenale, il Ponte Girevole, i Cantieri Navali Franco Tosi e la concentrazione delle maggiori corazzate e incrociatori della flotta da battaglia.",
    s2_4: "1938-1939: l'Arsenale di Taranto lavora senza sosta all'ammodernamento delle corazzate Conte di Cavour, Giulio Cesare, Duilio e Doria e all'approntamento delle nuove corazzate classe Littorio; base fondamentale per il controllo del Mediterraneo orientale.",
    s5: "Settembre 1939 - maggio 1940: la rada di Taranto pullula di corazzate, incrociatori pesanti e cacciatorpediniere; l'idroscalo di Taranto e gli aeroporti di Grottaglie fungono da presidio aeronavale ionico.",
    s6: "Giugno 1940: all'entrata in guerra, da Taranto salpa la flotta da battaglia per la Battaglia di Punta Stilo (9 luglio 1940) contro la Royal Navy; la città vive sotto continuo stato di allarme aereo e reti parasiluri.",
    s7: "Notte di Taranto (11-12 novembre 1940): 21 aerosiluranti Fairey Swordfish britannici decollati dalla portaerei HMS Illustrious compiono un raid devastante nel Mar Piccolo: la corazzata Conte di Cavour viene affondata, le corazzate Littorio e Duilio gravemente danneggiate. L'attacco sconvolge l'equilibrio navale nel Mediterraneo.",
    s8: "Aprile 1941: l'Arsenale compie prodigi tecnici per riparare la Littorio e il Duilio; da Taranto salpano le unità navali che partecipano al disastroso scontro di Capo Matapan (fine marzo 1941); la base intensifica barriere fumogene e palloni frenati.",
    getNote: (step: number) => {
      if (step <= 1) return "Provincia Jonica e massima base navale della Regia Marina: il Mar Piccolo e il Mar Grande ospitano il Regio Arsenale, il Ponte Girevole, i Cantieri Navali Franco Tosi e la concentrazione delle maggiori corazzate e incrociatori della flotta da battaglia.";
      if (step <= 4) return "1938-1939: l'Arsenale di Taranto lavora senza sosta all'ammodernamento delle corazzate Conte di Cavour, Giulio Cesare, Duilio e Doria e all'approntamento delle nuove corazzate classe Littorio; base fondamentale per il controllo del Mediterraneo orientale.";
      if (step === 5) return "Settembre 1939 - maggio 1940: la rada di Taranto pullula di corazzate, incrociatori pesanti e cacciatorpediniere; l'idroscalo di Taranto e gli aeroporti di Grottaglie fungono da presidio aeronavale ionico.";
      if (step === 6) return "Giugno 1940: all'entrata in guerra, da Taranto salpa la flotta da battaglia per la Battaglia di Punta Stilo (9 luglio 1940) contro la Royal Navy; la città vive sotto continuo stato di allarme aereo e reti parasiluri.";
      if (step === 7) return "Notte di Taranto (11-12 novembre 1940): 21 aerosiluranti Fairey Swordfish britannici decollati dalla portaerei HMS Illustrious compiono un raid devastante nel Mar Piccolo: la corazzata Conte di Cavour viene affondata, le corazzate Littorio e Duilio gravemente danneggiate. L'attacco sconvolge l'equilibrio navale nel Mediterraneo.";
      return "Aprile 1941: l'Arsenale compie prodigi tecnici per riparare la Littorio e il Duilio; da Taranto salpano le unità navali che partecipano al disastroso scontro di Capo Matapan (fine marzo 1941); la base intensifica barriere fumogene e palloni frenati.";
    },
    getHistoricalName: (_step: number) => "Provincia di Taranto (Provincia dello Jonio)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Taranto (Provincia dello Jonio)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF44": {
    nuts: "ITF44",
    name: "Provincia di Brindisi",
    modernName: "Brindisi",
    historicalName: "Provincia di Brindisi",
    region: "Puglia",
    keys: ["brindisi", "francavilla_fontana", "itf44", "mesagne", "ostuni", "provincia_di_brindisi"],
    s0_1: "Porto d'oriente e testa di ponte verso i Balcani: il porto di Brindisi e l'idroscalo civile e militare 'Orazio Pierozzi' costituiscono il capolinea per le rotte navali verso l'Egeo, l'Albania e l'Impero d'Oriente.",
    s2_4: "Aprile 1939: Brindisi è il punto di partenza principale per la flotta d'invasione italiana guidata dal generale Alfredo Guzzoni per la conquista e annessione dell'Albania; inaugurato l'imponente Monumento al Marinaio d'Italia.",
    s5: "Autunno 1939 - maggio 1940: Brindisi funge da hub logistico continuo per i rifornimenti verso Durazzo e Valona in Albania; la base sommergibili e le torpediniere intensificano le crociere nel canale d'Otranto.",
    s6: "Giugno 1940: entrata in guerra; il porto di Brindisi diviene il perno del Comando Marina del Basso Adriatico e Ionio; allestiti sbarramenti di torpedini e reti nel Canale d'Otranto.",
    s7: "Ottobre-novembre 1940: Brindisi è congestionata dal passaggio di decine di migliaia di soldati, carriaggi e munizioni destinati alla tragica offensiva contro la Grecia; il porto e l'aeroporto subiscono frequenti bombardamenti della RAF da Malta e dall'Egitto.",
    s8: "Primavera 1941: con l'Operazione Marita (invasione di Grecia e Jugoslavia da parte dell'Asse), il porto di Brindisi opera al massimo della sua portata per sbarcare rinforzi decisivi in Albania ed Epiro.",
    getNote: (step: number) => {
      if (step <= 1) return "Porto d'oriente e testa di ponte verso i Balcani: il porto di Brindisi e l'idroscalo civile e militare 'Orazio Pierozzi' costituiscono il capolinea per le rotte navali verso l'Egeo, l'Albania e l'Impero d'Oriente.";
      if (step <= 4) return "Aprile 1939: Brindisi è il punto di partenza principale per la flotta d'invasione italiana guidata dal generale Alfredo Guzzoni per la conquista e annessione dell'Albania; inaugurato l'imponente Monumento al Marinaio d'Italia.";
      if (step === 5) return "Autunno 1939 - maggio 1940: Brindisi funge da hub logistico continuo per i rifornimenti verso Durazzo e Valona in Albania; la base sommergibili e le torpediniere intensificano le crociere nel canale d'Otranto.";
      if (step === 6) return "Giugno 1940: entrata in guerra; il porto di Brindisi diviene il perno del Comando Marina del Basso Adriatico e Ionio; allestiti sbarramenti di torpedini e reti nel Canale d'Otranto.";
      if (step === 7) return "Ottobre-novembre 1940: Brindisi è congestionata dal passaggio di decine di migliaia di soldati, carriaggi e munizioni destinati alla tragica offensiva contro la Grecia; il porto e l'aeroporto subiscono frequenti bombardamenti della RAF da Malta e dall'Egitto.";
      return "Primavera 1941: con l'Operazione Marita (invasione di Grecia e Jugoslavia da parte dell'Asse), il porto di Brindisi opera al massimo della sua portata per sbarcare rinforzi decisivi in Albania ed Epiro.";
    },
    getHistoricalName: (_step: number) => "Provincia di Brindisi",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Brindisi",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF45": {
    nuts: "ITF45",
    name: "Provincia di Lecce",
    modernName: "Lecce",
    historicalName: "Provincia di Lecce",
    region: "Puglia",
    keys: ["gallipoli", "itf45", "lecce", "maglie", "nardo", "otranto", "provincia_di_lecce", "salento"],
    s0_1: "Capoluogo del Salento, penisola protesa tra Ionio e Adriatico; forte produzione di tabacco, olio d'oliva e pietra leccese; aeroporto militare di Galatina (istituito nel 1931 come scuola di volo).",
    s2_4: "1938-1939: l'aeroporto di Galatina espande le piste per l'addestramento della Regia Aeronautica; Otranto e Capo di Leuca presidiano il Canale d'Otranto con semafori e stazioni telegrafiche della Marina.",
    s5: "Settembre 1939 - maggio 1940: non belligeranza; l'olio d'oliva salentino viene requisito dai consorzi agrari per l'autarchia; Galatina addestra piloti da caccia e ricognitori marittimi.",
    s6: "Giugno 1940: mobilitazione militare; i campi di volo del Salento (Galatina, Leverano, San Pancrazio) diventano basi avanzate per le squadriglie aeree che controllano il Canale d'Otranto.",
    s7: "Autunno 1940: gli aeroporti salentini sono il trampolino quotidiano per le incursioni aeree della Regia Aeronautica sulle linee nemiche in Grecia ed Epiro; Capo di Leuca sorveglia il passaggio dei convogli.",
    s8: "Aprile 1941: il Salento è crocevia delle operazioni aeree balcaniche; le comunità rurali leccesi, duramente provate dai richiami di leva, garantiscono l'ammasso oleario per l'intero Paese.",
    getNote: (step: number) => {
      if (step <= 1) return "Capoluogo del Salento, penisola protesa tra Ionio e Adriatico; forte produzione di tabacco, olio d'oliva e pietra leccese; aeroporto militare di Galatina (istituito nel 1931 come scuola di volo).";
      if (step <= 4) return "1938-1939: l'aeroporto di Galatina espande le piste per l'addestramento della Regia Aeronautica; Otranto e Capo di Leuca presidiano il Canale d'Otranto con semafori e stazioni telegrafiche della Marina.";
      if (step === 5) return "Settembre 1939 - maggio 1940: non belligeranza; l'olio d'oliva salentino viene requisito dai consorzi agrari per l'autarchia; Galatina addestra piloti da caccia e ricognitori marittimi.";
      if (step === 6) return "Giugno 1940: mobilitazione militare; i campi di volo del Salento (Galatina, Leverano, San Pancrazio) diventano basi avanzate per le squadriglie aeree che controllano il Canale d'Otranto.";
      if (step === 7) return "Autunno 1940: gli aeroporti salentini sono il trampolino quotidiano per le incursioni aeree della Regia Aeronautica sulle linee nemiche in Grecia ed Epiro; Capo di Leuca sorveglia il passaggio dei convogli.";
      return "Aprile 1941: il Salento è crocevia delle operazioni aeree balcaniche; le comunità rurali leccesi, duramente provate dai richiami di leva, garantiscono l'ammasso oleario per l'intero Paese.";
    },
    getHistoricalName: (_step: number) => "Provincia di Lecce",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Lecce",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF46": {
    nuts: "ITF46",
    name: "Provincia di Foggia",
    modernName: "Foggia",
    historicalName: "Provincia di Foggia",
    region: "Puglia",
    keys: ["cerignola", "foggia", "gargano", "itf46", "lucera", "manfredonia", "provincia_di_foggia", "san_severo", "tavoliere"],
    s0_1: "Capoluogo della Capitanata e del Tavoliere delle Puglie, 'granaio d'Italia'; grande snodo ferroviario e polo aeronautico strategico con l'aeroporto 'Gino Lisa' e la vasta rete di campi di volo satelliti sul Tavoliere.",
    s2_4: "1938-1939: il Tavoliere vince la medaglia d'oro per la produzione di grano duro; l'aeroporto Gino Lisa addestra centinaia di piloti; a Manfredonia opera una base navale minore per l'Adriatico meridionale.",
    s5: "Autunno 1939 - primavera 1940: i campi d'aviazione foggiani vengono ampliati e mimetizzati dal Genio aeronautico in previsione dell'allargamento del conflitto; ammasso granario capillare.",
    s6: "Giugno 1940: entrata in guerra; il complesso aeroportuale foggiano diventa una delle principali concentrazioni di bombardieri (SM.79 Sparviero) e caccia della Regia Aeronautica.",
    s7: "Autunno 1940: dai campi di Foggia e del Tavoliere decollano le formazioni di bombardieri Savoia-Marchetti impegnate contro i porti e le piazzeforti della Grecia; la stazione ferroviaria lavora a ritmi febbrili.",
    s8: "Aprile 1941: la Luftwaffe tedesca comincia a dislocare reparti aerei (Fliegerkorps X) sugli aeroporti foggiani per sostenere le offensive nei Balcani e nel Mediterraneo; Foggia diventa un perno aerotattico dell'Asse.",
    getNote: (step: number) => {
      if (step <= 1) return "Capoluogo della Capitanata e del Tavoliere delle Puglie, 'granaio d'Italia'; grande snodo ferroviario e polo aeronautico strategico con l'aeroporto 'Gino Lisa' e la vasta rete di campi di volo satelliti sul Tavoliere.";
      if (step <= 4) return "1938-1939: il Tavoliere vince la medaglia d'oro per la produzione di grano duro; l'aeroporto Gino Lisa addestra centinaia di piloti; a Manfredonia opera una base navale minore per l'Adriatico meridionale.";
      if (step === 5) return "Autunno 1939 - primavera 1940: i campi d'aviazione foggiani vengono ampliati e mimetizzati dal Genio aeronautico in previsione dell'allargamento del conflitto; ammasso granario capillare.";
      if (step === 6) return "Giugno 1940: entrata in guerra; il complesso aeroportuale foggiano diventa una delle principali concentrazioni di bombardieri (SM.79 Sparviero) e caccia della Regia Aeronautica.";
      if (step === 7) return "Autunno 1940: dai campi di Foggia e del Tavoliere decollano le formazioni di bombardieri Savoia-Marchetti impegnate contro i porti e le piazzeforti della Grecia; la stazione ferroviaria lavora a ritmi febbrili.";
      return "Aprile 1941: la Luftwaffe tedesca comincia a dislocare reparti aerei (Fliegerkorps X) sugli aeroporti foggiani per sostenere le offensive nei Balcani e nel Mediterraneo; Foggia diventa un perno aerotattico dell'Asse.";
    },
    getHistoricalName: (_step: number) => "Provincia di Foggia",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Foggia",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF47": {
    nuts: "ITF47",
    name: "Provincia di Bari",
    modernName: "Bari",
    historicalName: "Provincia di Bari",
    region: "Puglia",
    keys: ["altamura", "apulia", "bari", "bitonto", "corato", "itf47", "molfetta", "monopoli", "provincia_di_bari", "puglia"],
    s0_1: "Capoluogo pugliese e 'porta d'Oriente' del fascismo: sede della Fiera del Levante (istituita nel 1930 per irradiare l'influenza commerciale italiana nei Balcani e nel Levante) e della potente stazione radio 'Radio Bari', che trasmette propaganda in lingua araba, greca e balcanica.",
    s2_4: "1938-1939: Radio Bari diventa l'emittente propagandistica più ascoltata in Medio Oriente per contrastare l'influenza britannica; il porto di Bari viene costantemente potenziato per il traffico oltremare.",
    s5: "Settembre 1939 - maggio 1940: il porto e la ferrovia barese sono mobilitati per il flusso continuo di truppe e salmerie verso l'Albania annessa; la Fiera del Levante continua la promozione dell'autarchia fascista.",
    s6: "Giugno 1940: dichiarazione di guerra; Bari diventa il Quartier Generale della IX Armata e della Marina nell'Adriatico; Radio Bari intensifica le trasmissioni di guerra in lingua straniera.",
    s7: "Autunno 1940: Bari è congestionata da convogli militari, treni ospedale e navi rifornimento per il fronte greco-albanese; la città subisce i primi bombardamenti aerei britannici sul porto e la stazione.",
    s8: "Aprile 1941: con l'offensiva dell'Asse contro Jugoslavia e Grecia, Bari è il cuore logistico pulsante delle forze d'invasione italiane; gli ospedali cittadini curano migliaia di feriti rimpatriati da Valona e Durazzo.",
    getNote: (step: number) => {
      if (step <= 1) return "Capoluogo pugliese e 'porta d'Oriente' del fascismo: sede della Fiera del Levante (istituita nel 1930 per irradiare l'influenza commerciale italiana nei Balcani e nel Levante) e della potente stazione radio 'Radio Bari', che trasmette propaganda in lingua araba, greca e balcanica.";
      if (step <= 4) return "1938-1939: Radio Bari diventa l'emittente propagandistica più ascoltata in Medio Oriente per contrastare l'influenza britannica; il porto di Bari viene costantemente potenziato per il traffico oltremare.";
      if (step === 5) return "Settembre 1939 - maggio 1940: il porto e la ferrovia barese sono mobilitati per il flusso continuo di truppe e salmerie verso l'Albania annessa; la Fiera del Levante continua la promozione dell'autarchia fascista.";
      if (step === 6) return "Giugno 1940: dichiarazione di guerra; Bari diventa il Quartier Generale della IX Armata e della Marina nell'Adriatico; Radio Bari intensifica le trasmissioni di guerra in lingua straniera.";
      if (step === 7) return "Autunno 1940: Bari è congestionata da convogli militari, treni ospedale e navi rifornimento per il fronte greco-albanese; la città subisce i primi bombardamenti aerei britannici sul porto e la stazione.";
      return "Aprile 1941: con l'offensiva dell'Asse contro Jugoslavia e Grecia, Bari è il cuore logistico pulsante delle forze d'invasione italiane; gli ospedali cittadini curano migliaia di feriti rimpatriati da Valona e Durazzo.";
    },
    getHistoricalName: (_step: number) => "Provincia di Bari",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Bari",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF48": {
    nuts: "ITF48",
    name: "Barletta-Andria-Trani (Provincia di Bari)",
    modernName: "Barletta-Andria-Trani",
    historicalName: "Barletta-Andria-Trani (Provincia di Bari)",
    region: "Puglia",
    keys: ["andria", "barletta", "barletta_andria_trani", "barletta_andria_trani_bari", "barletta_andria_trani_provincia_di_bari", "bisceglie", "canosa_di_puglia", "itf48", "trani"],
    s0_1: "Territorio del Nord Barese (compreso storicamente nella provincia di Bari fino al 2004); Barletta con il suo porto commerciale e la storica Disfida, Trani sede di Corte d'Appello, Andria fiorente centro agricolo olivicolo e granario.",
    s2_4: "1938-1939: le saline di Margherita di Savoia (le più grandi d'Europa) garantiscono la produzione autarchica di sale da cucina e prodotti chimici; ammasso delle olive e dell'uva da tavola.",
    s5: "Autunno 1939 - primavera 1940: non belligeranza; il porto di Barletta accoglie convogli costieri e pescherecci; la produzione salifera di Margherita di Savoia è dichiarata risorsa strategica statale.",
    s6: "Giugno 1940: mobilitazione generale; le batterie costiere del porto di Barletta e le vedette di Trani sorvegliano il litorale adriatico contro incursioni e mine vaganti.",
    s7: "Fine 1940: i contadini e braccianti del Nord Barese richiamati alle armi combattono nelle valli albanesi; severe requisizioni di muli, asini e cavalli per l'artiglieria alpina in Grecia.",
    s8: "Primavera 1941: le saline e i mulini del distretto continuano a fornire alimenti e sale all'intero Regno; la popolazione rurale sopporta sacrifici e controlli serrati sui mercati rionali.",
    getNote: (step: number) => {
      if (step <= 1) return "Territorio del Nord Barese (compreso storicamente nella provincia di Bari fino al 2004); Barletta con il suo porto commerciale e la storica Disfida, Trani sede di Corte d'Appello, Andria fiorente centro agricolo olivicolo e granario.";
      if (step <= 4) return "1938-1939: le saline di Margherita di Savoia (le più grandi d'Europa) garantiscono la produzione autarchica di sale da cucina e prodotti chimici; ammasso delle olive e dell'uva da tavola.";
      if (step === 5) return "Autunno 1939 - primavera 1940: non belligeranza; il porto di Barletta accoglie convogli costieri e pescherecci; la produzione salifera di Margherita di Savoia è dichiarata risorsa strategica statale.";
      if (step === 6) return "Giugno 1940: mobilitazione generale; le batterie costiere del porto di Barletta e le vedette di Trani sorvegliano il litorale adriatico contro incursioni e mine vaganti.";
      if (step === 7) return "Fine 1940: i contadini e braccianti del Nord Barese richiamati alle armi combattono nelle valli albanesi; severe requisizioni di muli, asini e cavalli per l'artiglieria alpina in Grecia.";
      return "Primavera 1941: le saline e i mulini del distretto continuano a fornire alimenti e sale all'intero Regno; la popolazione rurale sopporta sacrifici e controlli serrati sui mercati rionali.";
    },
    getHistoricalName: (_step: number) => "Barletta-Andria-Trani (Provincia di Bari)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Circondari di Barletta, Andria e Trani (Provincia di Bari)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF51": {
    nuts: "ITF51",
    name: "Provincia di Potenza (Lucania)",
    modernName: "Potenza",
    historicalName: "Provincia di Potenza (Lucania)",
    region: "Basilicata",
    keys: ["itf51", "lucania", "maratea", "melfi", "potenza", "potenza_lucania", "provincia_di_potenza_lucania", "venosa"],
    s0_1: "Capoluogo della Basilicata (denominata ufficialmente 'Lucania' durante il ventennio fascista dal 1932 al 1947); territorio montuoso appenninico con agricoltura di sussistenza e foreste; bacini idroelettrici sul Bradano e sull'Agri.",
    s2_4: "1938-1939: la Lucania partecipa alla Battaglia del Grano e alle opere di rimboschimento montano; la ferrovia transappenninica collega Potenza con Taranto e Salerno.",
    s5: "Autunno 1939 - primavera 1940: non belligeranza; le comunità lucane forniscono forti contingenti di coscritti al Regio Esercito; l'autarchia valorizza le risorse boschive per la carbonella.",
    s6: "Giugno 1940: entrata in guerra; i giovani fanti lucani sono incorporati nei reggimenti mobilitati per il fronte; a Potenza vengono organizzati centri di raccolta scorte alimentari.",
    s7: "Fine 1940: molti soldati lucani cadono durante la dura controffensiva greca in Albania; nei paesi dell'Appennino lucano il rigido inverno aggrava le condizioni di vita e la penuria di sale e zucchero.",
    s8: "Primavera 1941: il capoluogo e i centri montani lucani ospitano diversi campi e località di confino politico per dissidenti antifascisti, mentre i giovani continuano a combattere sui fronti aperti dell'Asse.",
    getNote: (step: number) => {
      if (step <= 1) return "Capoluogo della Basilicata (denominata ufficialmente 'Lucania' durante il ventennio fascista dal 1932 al 1947); territorio montuoso appenninico con agricoltura di sussistenza e foreste; bacini idroelettrici sul Bradano e sull'Agri.";
      if (step <= 4) return "1938-1939: la Lucania partecipa alla Battaglia del Grano e alle opere di rimboschimento montano; la ferrovia transappenninica collega Potenza con Taranto e Salerno.";
      if (step === 5) return "Autunno 1939 - primavera 1940: non belligeranza; le comunità lucane forniscono forti contingenti di coscritti al Regio Esercito; l'autarchia valorizza le risorse boschive per la carbonella.";
      if (step === 6) return "Giugno 1940: entrata in guerra; i giovani fanti lucani sono incorporati nei reggimenti mobilitati per il fronte; a Potenza vengono organizzati centri di raccolta scorte alimentari.";
      if (step === 7) return "Fine 1940: molti soldati lucani cadono durante la dura controffensiva greca in Albania; nei paesi dell'Appennino lucano il rigido inverno aggrava le condizioni di vita e la penuria di sale e zucchero.";
      return "Primavera 1941: il capoluogo e i centri montani lucani ospitano diversi campi e località di confino politico per dissidenti antifascisti, mentre i giovani continuano a combattere sui fronti aperti dell'Asse.";
    },
    getHistoricalName: (_step: number) => "Provincia di Potenza (Lucania)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Potenza (Lucania)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF52": {
    nuts: "ITF52",
    name: "Provincia di Matera",
    modernName: "Matera",
    historicalName: "Provincia di Matera",
    region: "Basilicata",
    keys: ["itf52", "matera", "metaponto", "montescaglioso", "pisticci", "provincia_di_matera"],
    s0_1: "Istituita nel 1927 come seconda provincia della Lucania; celebre per i millenari rioni dei Sassi di Matera e per i paesi del confino politico fascista (come Aliano, dove Carlo Levi viene confinato nel 1935-1936 ispirando 'Cristo si è fermato a Eboli').",
    s2_4: "1938-1939: lavori di bonifica nella piana del Metapontino lungo la costa ionica; Matera mantiene la sua fisionomia contadina arcaica incentrata sulla cerealicoltura e la pastorizia.",
    s5: "Settembre 1939 - maggio 1940: non belligeranza; l'agro materano rifornisce i granai di Taranto e Bari; nei borghi del circondario continua l'internamento di confinati politici antifascisti.",
    s6: "Giugno 1940: scoppio del conflitto; la costa ionica metapontina viene dotata di posti di vedetta a protezione delle rotte marittime verso il Golfo di Taranto.",
    s7: "Autunno 1940: fanti materani combattono in Grecia e in Cirenaica; la vita nei Sassi si fa ancora più disagiata a causa delle restrizioni alimentari e dell'assenza di braccia giovanili nei campi.",
    s8: "Aprile 1941: a Matera e nei comuni circostanti vengono allestiti campi di concentramento e internamento per prigionieri slavi ed ebrei stranieri (come il campo di Ferrandina e Pisticci).",
    getNote: (step: number) => {
      if (step <= 1) return "Istituita nel 1927 come seconda provincia della Lucania; celebre per i millenari rioni dei Sassi di Matera e per i paesi del confino politico fascista (come Aliano, dove Carlo Levi viene confinato nel 1935-1936 ispirando 'Cristo si è fermato a Eboli').";
      if (step <= 4) return "1938-1939: lavori di bonifica nella piana del Metapontino lungo la costa ionica; Matera mantiene la sua fisionomia contadina arcaica incentrata sulla cerealicoltura e la pastorizia.";
      if (step === 5) return "Settembre 1939 - maggio 1940: non belligeranza; l'agro materano rifornisce i granai di Taranto e Bari; nei borghi del circondario continua l'internamento di confinati politici antifascisti.";
      if (step === 6) return "Giugno 1940: scoppio del conflitto; la costa ionica metapontina viene dotata di posti di vedetta a protezione delle rotte marittime verso il Golfo di Taranto.";
      if (step === 7) return "Autunno 1940: fanti materani combattono in Grecia e in Cirenaica; la vita nei Sassi si fa ancora più disagiata a causa delle restrizioni alimentari e dell'assenza di braccia giovanili nei campi.";
      return "Aprile 1941: a Matera e nei comuni circostanti vengono allestiti campi di concentramento e internamento per prigionieri slavi ed ebrei stranieri (come il campo di Ferrandina e Pisticci).";
    },
    getHistoricalName: (_step: number) => "Provincia di Matera",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Matera",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF61": {
    nuts: "ITF61",
    name: "Provincia di Cosenza",
    modernName: "Cosenza",
    historicalName: "Provincia di Cosenza",
    region: "Calabria",
    keys: ["castrovillari", "corigliano_calabro", "cosenza", "itf61", "paola", "provincia_di_cosenza", "rossano", "sila"],
    s0_1: "Capoluogo della Calabria citeriore; altopiano silano (Grande e Piccola Sila) con immensi boschi per il legname e i laghi artificiali (Arvo e Ampollino) per l'energia idroelettrica della Società Meridionale di Elettricità (SME); piana di Sibari in via di bonifica.",
    s2_4: "1938-1939: l'energia idroelettrica silana alimenta i complessi metallurgici e chimici della Calabria e del Mezzogiorno; le foreste silane forniscono traverse ferroviarie e legname autarchico.",
    s5: "Autunno 1939 - primavera 1940: non belligeranza; Cosenza coordina i consorzi agrari provinciali per l'ammasso di cereali e fichi secchi; controlli di polizia politica sulle comunità albanesi (Arbëreshë) locali.",
    s6: "Giugno 1940: entrata in guerra; nel comune silano di Tarsia entra in funzione il Campo di concentramento di Ferramonti di Tarsia, il più grande campo d'internamento fascista per ebrei stranieri, apolidi e antifascisti.",
    s7: "Autunno 1940: centinaia di fanti cosentini cadono sui crinali innevati dell'Epiro e dell'Albania; a Ferramonti di Tarsia il numero di internati cresce rapidamente sotto sorveglianza delle guardie fasciste.",
    s8: "Primavera 1941: Ferramonti ospita oltre mille internati; i laghi idroelettrici silani e il legname boschivo rimangono risorse strategiche per l'industria energetica dell'Asse.",
    getNote: (step: number) => {
      if (step <= 1) return "Capoluogo della Calabria citeriore; altopiano silano (Grande e Piccola Sila) con immensi boschi per il legname e i laghi artificiali (Arvo e Ampollino) per l'energia idroelettrica della Società Meridionale di Elettricità (SME); piana di Sibari in via di bonifica.";
      if (step <= 4) return "1938-1939: l'energia idroelettrica silana alimenta i complessi metallurgici e chimici della Calabria e del Mezzogiorno; le foreste silane forniscono traverse ferroviarie e legname autarchico.";
      if (step === 5) return "Autunno 1939 - primavera 1940: non belligeranza; Cosenza coordina i consorzi agrari provinciali per l'ammasso di cereali e fichi secchi; controlli di polizia politica sulle comunità albanesi (Arbëreshë) locali.";
      if (step === 6) return "Giugno 1940: entrata in guerra; nel comune silano di Tarsia entra in funzione il Campo di concentramento di Ferramonti di Tarsia, il più grande campo d'internamento fascista per ebrei stranieri, apolidi e antifascisti.";
      if (step === 7) return "Autunno 1940: centinaia di fanti cosentini cadono sui crinali innevati dell'Epiro e dell'Albania; a Ferramonti di Tarsia il numero di internati cresce rapidamente sotto sorveglianza delle guardie fasciste.";
      return "Primavera 1941: Ferramonti ospita oltre mille internati; i laghi idroelettrici silani e il legname boschivo rimangono risorse strategiche per l'industria energetica dell'Asse.";
    },
    getHistoricalName: (_step: number) => "Provincia di Cosenza",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Cosenza",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF62": {
    nuts: "ITF62",
    name: "Crotone (Provincia di Catanzaro)",
    modernName: "Crotone",
    historicalName: "Crotone (Provincia di Catanzaro)",
    region: "Calabria",
    keys: ["ciro", "cotrone", "crotone", "crotone_catanzaro", "crotone_provincia_di_catanzaro", "isola_di_capo_rizzuto", "itf62"],
    s0_1: "Polo industriale d'avanguardia del Mezzogiorno (compreso nella provincia di Catanzaro fino al 1992): grandi stabilimenti metallurgici e chimici di zinco e acido solforico della Pertusola e fertilizzanti della Montecatini, alimentati dall'energia idroelettrica dei laghi della Sila.",
    s2_4: "1938-1939: la fonderia di zinco elettrolitico della Pertusola a Crotone è la più moderna d'Europa ed è dichiarata stabilimento strategico per l'autarchia metallurgica del Regno d'Italia.",
    s5: "Settembre 1939 - maggio 1940: durante la non belligeranza, Crotone produce zinco per le leghe militari e acido solforico per gli esplosivi; il porto di Crotone esporta metalli e scorte chimiche.",
    s6: "Giugno 1940: scoppio della guerra; gli impianti della Pertusola e della Montecatini lavorano sotto regime militarizzato e con difese antiaeree rinforzate; il porto è militarizzato.",
    s7: "Fine 1940: Crotone subisce i primi allarmi aerei notturni da formazioni britanniche operanti nel Mar Ionio; la produzione di zinco tocca livelli record per le forniture alle forze armate dell'Asse.",
    s8: "Primavera 1941: il polo industriale crotonese continua a rifornire l'industria bellica nazionale; i marinai e fanti del Crotonese sono impegnati nei convogli navali e nelle operazioni in Grecia.",
    getNote: (step: number) => {
      if (step <= 1) return "Polo industriale d'avanguardia del Mezzogiorno (compreso nella provincia di Catanzaro fino al 1992): grandi stabilimenti metallurgici e chimici di zinco e acido solforico della Pertusola e fertilizzanti della Montecatini, alimentati dall'energia idroelettrica dei laghi della Sila.";
      if (step <= 4) return "1938-1939: la fonderia di zinco elettrolitico della Pertusola a Crotone è la più moderna d'Europa ed è dichiarata stabilimento strategico per l'autarchia metallurgica del Regno d'Italia.";
      if (step === 5) return "Settembre 1939 - maggio 1940: durante la non belligeranza, Crotone produce zinco per le leghe militari e acido solforico per gli esplosivi; il porto di Crotone esporta metalli e scorte chimiche.";
      if (step === 6) return "Giugno 1940: scoppio della guerra; gli impianti della Pertusola e della Montecatini lavorano sotto regime militarizzato e con difese antiaeree rinforzate; il porto è militarizzato.";
      if (step === 7) return "Fine 1940: Crotone subisce i primi allarmi aerei notturni da formazioni britanniche operanti nel Mar Ionio; la produzione di zinco tocca livelli record per le forniture alle forze armate dell'Asse.";
      return "Primavera 1941: il polo industriale crotonese continua a rifornire l'industria bellica nazionale; i marinai e fanti del Crotonese sono impegnati nei convogli navali e nelle operazioni in Grecia.";
    },
    getHistoricalName: (_step: number) => "Crotone (Provincia di Catanzaro)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Circondario di Crotone (Provincia di Catanzaro)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF63": {
    nuts: "ITF63",
    name: "Provincia di Catanzaro",
    modernName: "Catanzaro",
    historicalName: "Provincia di Catanzaro",
    region: "Calabria",
    keys: ["catanzaro", "itf63", "lamezia_terme", "nicastro", "provincia_di_catanzaro", "soverato"],
    s0_1: "Capoluogo storico della Calabria ultra e dell'istmo di Catanzaro (il punto più stretto d'Italia tra Ionio e Tirreno); sede di comandi militari regionali e del distretto di leva, centro serico storico e agricolo (olio e agrumi).",
    s2_4: "1938-1939: la posizione dell'istmo è valorizzata per le comunicazioni terrestri e telefoniche tra le due coste calabresi; rafforzati i distretti di reclutamento militare del Regio Esercito.",
    s5: "Autunno 1939 - primavera 1940: non belligeranza; Catanzaro Marina e la costa ionica intensificano i posti di vedetta costiera; ammasso obbligatorio per le produzioni olearie e cerealicole.",
    s6: "Giugno 1940: entrata in guerra; Catanzaro coordina la difesa territoriale della Calabria centrale; truppe e convogli ferroviari attraversano l'istmo verso la Sicilia e Reggio Calabria.",
    s7: "Autunno 1940: soldati catanzaresi cadono sui fronti d'Albania e d'Egitto; l'ospedale militare cittadino viene ampliato per assistere i feriti sbarcati a Taranto e Reggio.",
    s8: "Aprile 1941: la provincia sopporta le privazioni della guerra di logoramento; severe misure di polizia contro la diffusione di volantini antifascisti e il contrabbando di generi alimentari razionati.",
    getNote: (step: number) => {
      if (step <= 1) return "Capoluogo storico della Calabria ultra e dell'istmo di Catanzaro (il punto più stretto d'Italia tra Ionio e Tirreno); sede di comandi militari regionali e del distretto di leva, centro serico storico e agricolo (olio e agrumi).";
      if (step <= 4) return "1938-1939: la posizione dell'istmo è valorizzata per le comunicazioni terrestri e telefoniche tra le due coste calabresi; rafforzati i distretti di reclutamento militare del Regio Esercito.";
      if (step === 5) return "Autunno 1939 - primavera 1940: non belligeranza; Catanzaro Marina e la costa ionica intensificano i posti di vedetta costiera; ammasso obbligatorio per le produzioni olearie e cerealicole.";
      if (step === 6) return "Giugno 1940: entrata in guerra; Catanzaro coordina la difesa territoriale della Calabria centrale; truppe e convogli ferroviari attraversano l'istmo verso la Sicilia e Reggio Calabria.";
      if (step === 7) return "Autunno 1940: soldati catanzaresi cadono sui fronti d'Albania e d'Egitto; l'ospedale militare cittadino viene ampliato per assistere i feriti sbarcati a Taranto e Reggio.";
      return "Aprile 1941: la provincia sopporta le privazioni della guerra di logoramento; severe misure di polizia contro la diffusione di volantini antifascisti e il contrabbando di generi alimentari razionati.";
    },
    getHistoricalName: (_step: number) => "Provincia di Catanzaro",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Catanzaro",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF64": {
    nuts: "ITF64",
    name: "Vibo Valentia (Provincia di Catanzaro)",
    modernName: "Vibo Valentia",
    historicalName: "Vibo Valentia (Provincia di Catanzaro)",
    region: "Calabria",
    keys: ["itf64", "monteleone", "monteleone_di_calabria", "pizzo", "tropea", "vibo_valentia", "vibo_valentia_catanzaro", "vibo_valentia_provincia_di_catanzaro"],
    s0_1: "Denominata 'Monteleone di Calabria' fino al 1928 quando il regime fascista ripristina l'antico nome classico 'Vibo Valentia' (provincia autonoma solo dal 1992); sede dell'aeroporto militare di Vibo Valentia e del porto commerciale di Vibo Marina.",
    s2_4: "1938-1939: l'aeroporto di Vibo Valentia è sede di una scuola di volo e addestramento caccia della Regia Aeronautica; il porto di Vibo Marina movimenta carburanti e merci per il Tirreno.",
    s5: "Settembre 1939 - maggio 1940: non belligeranza; le cisterne carburante e gli impianti dell'AGIP a Vibo Marina vengono posti sotto guardia armata; ampliamento dei depositi militari.",
    s6: "Giugno 1940: dichiarazione di guerra; l'aeroporto di Vibo Valentia diviene base operativa per formazioni da caccia impegnate nella scorta ai convogli navali diretti in Sicilia e Libia.",
    s7: "Fine 1940: squadriglie aeree basate a Vibo partecipano alla caccia contro i bombardieri britannici che tentano di colpire lo Stretto di Messina; Vibo Marina rifornisce naviglio sottile.",
    s8: "Primavera 1941: l'aeroporto continua ad accogliere reparti di caccia e collegamento; la popolazione locale sopporta il razionamento dei beni primari e il lutto per i caduti oltremare.",
    getNote: (step: number) => {
      if (step <= 1) return "Denominata 'Monteleone di Calabria' fino al 1928 quando il regime fascista ripristina l'antico nome classico 'Vibo Valentia' (provincia autonoma solo dal 1992); sede dell'aeroporto militare di Vibo Valentia e del porto commerciale di Vibo Marina.";
      if (step <= 4) return "1938-1939: l'aeroporto di Vibo Valentia è sede di una scuola di volo e addestramento caccia della Regia Aeronautica; il porto di Vibo Marina movimenta carburanti e merci per il Tirreno.";
      if (step === 5) return "Settembre 1939 - maggio 1940: non belligeranza; le cisterne carburante e gli impianti dell'AGIP a Vibo Marina vengono posti sotto guardia armata; ampliamento dei depositi militari.";
      if (step === 6) return "Giugno 1940: dichiarazione di guerra; l'aeroporto di Vibo Valentia diviene base operativa per formazioni da caccia impegnate nella scorta ai convogli navali diretti in Sicilia e Libia.";
      if (step === 7) return "Fine 1940: squadriglie aeree basate a Vibo partecipano alla caccia contro i bombardieri britannici che tentano di colpire lo Stretto di Messina; Vibo Marina rifornisce naviglio sottile.";
      return "Primavera 1941: l'aeroporto continua ad accogliere reparti di caccia e collegamento; la popolazione locale sopporta il razionamento dei beni primari e il lutto per i caduti oltremare.";
    },
    getHistoricalName: (_step: number) => "Vibo Valentia (Provincia di Catanzaro)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Circondario di Vibo Valentia (Provincia di Catanzaro)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITF65": {
    nuts: "ITF65",
    name: "Provincia di Reggio Calabria",
    modernName: "Reggio di Calabria",
    historicalName: "Provincia di Reggio Calabria",
    region: "Calabria",
    keys: ["gioia_tauro", "itf65", "locri", "palmi", "provincia_di_reggio_calabria", "reggio_calabria", "reggio_di_calabria", "siderno"],
    s0_1: "Capoluogo dell'estremo sud continentale affacciato sullo Stretto di Messina; centro nevralgico dei traghetti ferroviari FS per la Sicilia (Villa San Giovanni), coltivazione mondiale del bergamotto per profumi e farmaceutica; fortificazioni costiere storiche dello Stretto.",
    s2_4: "1938-1939: il bergamotto reggino viene tutelato dal consorzio autarchico statale; Villa San Giovanni e Reggio potenziano i binari per i traghetti e il movimento merci militare verso la Sicilia.",
    s5: "Settembre 1939 - maggio 1940: durante la non belligeranza, le batterie costiere del Regio Esercito e della Milizia Artiglieria Marittima (MILMART) blindano l'accesso allo Stretto di Messina.",
    s6: "Giugno 1940: entrata in guerra; lo Stretto di Messina diventa un'arteria vitale di passaggio continuo di truppe e navi da guerra; la notte del 9 luglio 1940 le navi reduci dalla battaglia di Punta Stilo sfilano davanti a Reggio.",
    s7: "Autunno 1940: Reggio subisce i primi bombardamenti aerei britannici mirati a interrompere il traffico dei traghetti ferroviari per la Sicilia; la difesa contraerea dello Stretto apre il fuoco quasi quotidianamente.",
    s8: "Primavera 1941: il passaggio continuo di treni militari carichi di truppe e mezzi italo-tedeschi diretti verso i porti d'imbarco siciliani rende Reggio e Villa San Giovanni bersagli prioritari della RAF.",
    getNote: (step: number) => {
      if (step <= 1) return "Capoluogo dell'estremo sud continentale affacciato sullo Stretto di Messina; centro nevralgico dei traghetti ferroviari FS per la Sicilia (Villa San Giovanni), coltivazione mondiale del bergamotto per profumi e farmaceutica; fortificazioni costiere storiche dello Stretto.";
      if (step <= 4) return "1938-1939: il bergamotto reggino viene tutelato dal consorzio autarchico statale; Villa San Giovanni e Reggio potenziano i binari per i traghetti e il movimento merci militare verso la Sicilia.";
      if (step === 5) return "Settembre 1939 - maggio 1940: durante la non belligeranza, le batterie costiere del Regio Esercito e della Milizia Artiglieria Marittima (MILMART) blindano l'accesso allo Stretto di Messina.";
      if (step === 6) return "Giugno 1940: entrata in guerra; lo Stretto di Messina diventa un'arteria vitale di passaggio continuo di truppe e navi da guerra; la notte del 9 luglio 1940 le navi reduci dalla battaglia di Punta Stilo sfilano davanti a Reggio.";
      if (step === 7) return "Autunno 1940: Reggio subisce i primi bombardamenti aerei britannici mirati a interrompere il traffico dei traghetti ferroviari per la Sicilia; la difesa contraerea dello Stretto apre il fuoco quasi quotidianamente.";
      return "Primavera 1941: il passaggio continuo di treni militari carichi di truppe e mezzi italo-tedeschi diretti verso i porti d'imbarco siciliani rende Reggio e Villa San Giovanni bersagli prioritari della RAF.";
    },
    getHistoricalName: (_step: number) => "Provincia di Reggio Calabria",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Reggio Calabria",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITG11": {
    nuts: "ITG11",
    name: "Provincia di Trapani",
    modernName: "Trapani",
    historicalName: "Provincia di Trapani",
    region: "Sicilia",
    keys: ["alcamo", "castelvetrano", "itg11", "marsala", "mazara_del_vallo", "pantelleria", "provincia_di_trapani", "trapani"],
    s0_1: "Porta occidentale della Sicilia proiettata verso il Canale di Sicilia e la Tunisia: porto peschereccio e commerciale, saline storiche di Trapani e Marsala, stabilimenti vinicoli Florio; presenza dell'aeroporto militare di Milo (Trapani-Milo) e dell'isola-fortezza di Pantelleria.",
    s2_4: "1938-1939: fortificazione di Pantelleria voluta personalmente da Mussolini ('portaerei inaffondabile nel Canale di Sicilia') con hangar sotterraneo e batterie costiere; l'aeroporto di Trapani-Milo viene potenziato per squadriglie d'assalto.",
    s5: "Autunno 1939 - maggio 1940: Trapani e Pantelleria sono in stato di allerta avanzata; i bombardieri e idrovolanti eseguono ricognizioni sul Canale di Sicilia controllando le rotte francesi tra Biserta e la Francia.",
    s6: "Giugno 1940: dichiarazione di guerra; l'aeroporto di Milo e Pantelleria lanciano i primi attacchi aerei contro le basi francesi in Tunisia (Biserta) e le rotte britanniche verso Malta; Trapani subisce bombardamenti navali e aerei alleati.",
    s7: "Autunno 1940: Trapani diviene base di motosiluranti MAS e torpediniere per interdire il Canale di Sicilia; i caccia italiani basati a Milo e Pantelleria si battono quotidianamente contro i caccia di Malta.",
    s8: "Primavera 1941: con l'arrivo della Luftwaffe in Sicilia, l'aeroporto di Trapani-Milo ospita bombardieri Junkers Ju 87 Stuka e caccia tedeschi per neutralizzare Malta e scortare i convogli di Rommel per Tripoli.",
    getNote: (step: number) => {
      if (step <= 1) return "Porta occidentale della Sicilia proiettata verso il Canale di Sicilia e la Tunisia: porto peschereccio e commerciale, saline storiche di Trapani e Marsala, stabilimenti vinicoli Florio; presenza dell'aeroporto militare di Milo (Trapani-Milo) e dell'isola-fortezza di Pantelleria.";
      if (step <= 4) return "1938-1939: fortificazione di Pantelleria voluta personalmente da Mussolini ('portaerei inaffondabile nel Canale di Sicilia') con hangar sotterraneo e batterie costiere; l'aeroporto di Trapani-Milo viene potenziato per squadriglie d'assalto.";
      if (step === 5) return "Autunno 1939 - maggio 1940: Trapani e Pantelleria sono in stato di allerta avanzata; i bombardieri e idrovolanti eseguono ricognizioni sul Canale di Sicilia controllando le rotte francesi tra Biserta e la Francia.";
      if (step === 6) return "Giugno 1940: dichiarazione di guerra; l'aeroporto di Milo e Pantelleria lanciano i primi attacchi aerei contro le basi francesi in Tunisia (Biserta) e le rotte britanniche verso Malta; Trapani subisce bombardamenti navali e aerei alleati.";
      if (step === 7) return "Autunno 1940: Trapani diviene base di motosiluranti MAS e torpediniere per interdire il Canale di Sicilia; i caccia italiani basati a Milo e Pantelleria si battono quotidianamente contro i caccia di Malta.";
      return "Primavera 1941: con l'arrivo della Luftwaffe in Sicilia, l'aeroporto di Trapani-Milo ospita bombardieri Junkers Ju 87 Stuka e caccia tedeschi per neutralizzare Malta e scortare i convogli di Rommel per Tripoli.";
    },
    getHistoricalName: (_step: number) => "Provincia di Trapani",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Trapani",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITG12": {
    nuts: "ITG12",
    name: "Provincia di Palermo",
    modernName: "Palermo",
    historicalName: "Provincia di Palermo",
    region: "Sicilia",
    keys: ["bagheria", "itg12", "monreale", "palermo", "provincia_di_palermo", "sicilia", "sicily", "termini_imerese"],
    s0_1: "Capitale e metropoli della Sicilia: sede dei Cantieri Navali Riuniti di Palermo (costruzione e riparazione navale), dell'aeroporto militare di Boccadifalco, del Comando Militare Marittimo della Sicilia e dell'Arsenale; centro degli ammassi agrumicoli della Conca d'Oro.",
    s2_4: "1938-1939: i Cantieri Navali di Palermo ampliano i bacini di carenaggio per naviglio militare e mercantile; Boccadifalco è una delle basi aeree più attive del Mediterraneo; rafforzata la propaganda fascista con la repressione mafiosa di Cesare Mori.",
    s5: "Settembre 1939 - maggio 1940: durante la non belligeranza, il porto di Palermo è il nodo di smistamento principale per le rotte convogli con la Libia; bunker e rifugi antiaerei scavati nella roccia di Monte Pellegrino.",
    s6: "Giugno 1940: 10 giugno entrata in guerra; già dal 23 giugno 1940 e nei mesi successivi, Palermo subisce violente incursioni aeree della RAF e dell'aviazione francese, con vittime al porto e nei quartieri storici.",
    s7: "Autunno 1940: dal porto di Palermo salpano senza sosta i convogli carichi di munizioni, viveri e truppe per Bengasi e Tripoli; i cantieri navali lavorano giorno e notte per riparare mercantili e cacciatorpediniere silurati.",
    s8: "Primavera 1941: Palermo è il capolinea navale primario per la traversata dei rifornimenti diretti all'Afrikakorps di Rommel; la città subisce pesanti attacchi aerei notturni britannici da Malta e severissime privazioni annonarie.",
    getNote: (step: number) => {
      if (step <= 1) return "Capitale e metropoli della Sicilia: sede dei Cantieri Navali Riuniti di Palermo (costruzione e riparazione navale), dell'aeroporto militare di Boccadifalco, del Comando Militare Marittimo della Sicilia e dell'Arsenale; centro degli ammassi agrumicoli della Conca d'Oro.";
      if (step <= 4) return "1938-1939: i Cantieri Navali di Palermo ampliano i bacini di carenaggio per naviglio militare e mercantile; Boccadifalco è una delle basi aeree più attive del Mediterraneo; rafforzata la propaganda fascista con la repressione mafiosa di Cesare Mori.";
      if (step === 5) return "Settembre 1939 - maggio 1940: durante la non belligeranza, il porto di Palermo è il nodo di smistamento principale per le rotte convogli con la Libia; bunker e rifugi antiaerei scavati nella roccia di Monte Pellegrino.";
      if (step === 6) return "Giugno 1940: 10 giugno entrata in guerra; già dal 23 giugno 1940 e nei mesi successivi, Palermo subisce violente incursioni aeree della RAF e dell'aviazione francese, con vittime al porto e nei quartieri storici.";
      if (step === 7) return "Autunno 1940: dal porto di Palermo salpano senza sosta i convogli carichi di munizioni, viveri e truppe per Bengasi e Tripoli; i cantieri navali lavorano giorno e notte per riparare mercantili e cacciatorpediniere silurati.";
      return "Primavera 1941: Palermo è il capolinea navale primario per la traversata dei rifornimenti diretti all'Afrikakorps di Rommel; la città subisce pesanti attacchi aerei notturni britannici da Malta e severissime privazioni annonarie.";
    },
    getHistoricalName: (_step: number) => "Provincia di Palermo",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Palermo",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITG13": {
    nuts: "ITG13",
    name: "Provincia di Messina",
    modernName: "Messina",
    historicalName: "Provincia di Messina",
    region: "Sicilia",
    keys: ["barcellona_pozzo_di_gotto", "isole_eolie", "itg13", "lipari", "messina", "milazzo", "provincia_di_messina", "taormina"],
    s0_1: "Chiave d'accesso navale e ferroviaria alla Sicilia: il porto falcato di Messina ospita la base navale della Regia Marina, i bacini di carenaggio e l'imbarco dei 'ferry-boat' delle Ferrovie dello Stato; piazzaforte fortificata dello Stretto.",
    s2_4: "1938-1939: fortificazioni dello Stretto ammodernate con potenti batterie della MILMART (Batteria Masotto, Forte San Jacciddu); il porto movimenta convogli per le guarnigioni del Dodecaneso e della Libia.",
    s5: "Settembre 1939 - maggio 1940: Messina osserva la non belligeranza con le navi da guerra alla fonda nel porto falcato; allestimento di reti antisommergibile agli imbocchi dello Stretto.",
    s6: "Giugno 1940: dichiarazione di guerra; Messina diviene base avanzata per la III e VII Divisione Incrociatori della Regia Marina; aerei nemici compiono i primi tentativi di incursione sullo Stretto respinti dalla contraerea.",
    s7: "Autunno 1940: Messina è l'arteria vitale percorsa da ogni singolo rifornimento diretto al fronte libico; la città e il porto subiscono frequenti bombardamenti notturni della RAF mirati a colpire le navi da guerra e le banchine.",
    s8: "Primavera 1941: incrociatori e cacciatorpediniere con base a Messina scortano le rotte dei convogli dell'Asse; la base risente del grave lutto della Notte di Capo Matapan (marzo 1941) dove cadono navi e marinai del comando siciliano.",
    getNote: (step: number) => {
      if (step <= 1) return "Chiave d'accesso navale e ferroviaria alla Sicilia: il porto falcato di Messina ospita la base navale della Regia Marina, i bacini di carenaggio e l'imbarco dei 'ferry-boat' delle Ferrovie dello Stato; piazzaforte fortificata dello Stretto.";
      if (step <= 4) return "1938-1939: fortificazioni dello Stretto ammodernate con potenti batterie della MILMART (Batteria Masotto, Forte San Jacciddu); il porto movimenta convogli per le guarnigioni del Dodecaneso e della Libia.";
      if (step === 5) return "Settembre 1939 - maggio 1940: Messina osserva la non belligeranza con le navi da guerra alla fonda nel porto falcato; allestimento di reti antisommergibile agli imbocchi dello Stretto.";
      if (step === 6) return "Giugno 1940: dichiarazione di guerra; Messina diviene base avanzata per la III e VII Divisione Incrociatori della Regia Marina; aerei nemici compiono i primi tentativi di incursione sullo Stretto respinti dalla contraerea.";
      if (step === 7) return "Autunno 1940: Messina è l'arteria vitale percorsa da ogni singolo rifornimento diretto al fronte libico; la città e il porto subiscono frequenti bombardamenti notturni della RAF mirati a colpire le navi da guerra e le banchine.";
      return "Primavera 1941: incrociatori e cacciatorpediniere con base a Messina scortano le rotte dei convogli dell'Asse; la base risente del grave lutto della Notte di Capo Matapan (marzo 1941) dove cadono navi e marinai del comando siciliano.";
    },
    getHistoricalName: (_step: number) => "Provincia di Messina",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Messina",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITG14": {
    nuts: "ITG14",
    name: "Provincia di Agrigento",
    modernName: "Agrigento",
    historicalName: "Provincia di Agrigento",
    region: "Sicilia",
    keys: ["agrigento", "canicatti", "girgenti", "itg14", "lampedusa", "licata", "linosa", "provincia_di_agrigento", "sciacca"],
    s0_1: "Denominata storicamente 'Girgenti' fino al 1927, quando il regime fascista le restituisce l'antico nome classico 'Agrigento'; territorio dominato dalle zolfare (estrazione del minerale di zolfo) e dai porti di Porto Empedocle e Licata; costa prospiciente il Canale di Sicilia.",
    s2_4: "1938-1939: lo zolfo agrigentino è risorsa strategica per l'industria chimica, bellica e per l'autarchia; a Porto Empedocle si caricano navi per il nord e la Germania; isole Pelagie (Lampedusa e Linosa) presidiate.",
    s5: "Autunno 1939 - primavera 1940: l'estrazione mineraria è incentivata con premi di produzione statali; Porto Empedocle e Licata rafforzano le difese costiere e le vedette marittime.",
    s6: "Giugno 1940: entrata in guerra; i porti di Licata e Porto Empedocle diventano basi di naviglio ausiliario e dragamine; Lampedusa funge da osservatorio meteorologico e radio avanzato verso la Libia.",
    s7: "Autunno 1940: motovelieri e motonavi partono dalla costa agrigentina con scorte per le truppe in Libia; i porti subiscono sporadici attacchi di sommergibili britannici in agguato nel Canale di Sicilia.",
    s8: "Primavera 1941: l'intera fascia costiera agrigentina viene fortificata con bunker costieri e postazioni di mitragliatrici in previsione di colpi di mano alleati; continua l'estrazione massiccia di zolfo autarchico.",
    getNote: (step: number) => {
      if (step <= 1) return "Denominata storicamente 'Girgenti' fino al 1927, quando il regime fascista le restituisce l'antico nome classico 'Agrigento'; territorio dominato dalle zolfare (estrazione del minerale di zolfo) e dai porti di Porto Empedocle e Licata; costa prospiciente il Canale di Sicilia.";
      if (step <= 4) return "1938-1939: lo zolfo agrigentino è risorsa strategica per l'industria chimica, bellica e per l'autarchia; a Porto Empedocle si caricano navi per il nord e la Germania; isole Pelagie (Lampedusa e Linosa) presidiate.";
      if (step === 5) return "Autunno 1939 - primavera 1940: l'estrazione mineraria è incentivata con premi di produzione statali; Porto Empedocle e Licata rafforzano le difese costiere e le vedette marittime.";
      if (step === 6) return "Giugno 1940: entrata in guerra; i porti di Licata e Porto Empedocle diventano basi di naviglio ausiliario e dragamine; Lampedusa funge da osservatorio meteorologico e radio avanzato verso la Libia.";
      if (step === 7) return "Autunno 1940: motovelieri e motonavi partono dalla costa agrigentina con scorte per le truppe in Libia; i porti subiscono sporadici attacchi di sommergibili britannici in agguato nel Canale di Sicilia.";
      return "Primavera 1941: l'intera fascia costiera agrigentina viene fortificata con bunker costieri e postazioni di mitragliatrici in previsione di colpi di mano alleati; continua l'estrazione massiccia di zolfo autarchico.";
    },
    getHistoricalName: (_step: number) => "Provincia di Agrigento",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Agrigento",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITG15": {
    nuts: "ITG15",
    name: "Provincia di Caltanissetta",
    modernName: "Caltanissetta",
    historicalName: "Provincia di Caltanissetta",
    region: "Sicilia",
    keys: ["caltanissetta", "gela", "itg15", "niscemi", "provincia_di_caltanissetta", "terranova_di_sicilia"],
    s0_1: "Capitale storica del bacino zolfifero siciliano (bacino minerario di Caltanissetta e Gela); la produzione dello zolfo e dei sali potassici impiega migliaia di minatori ('zolfatari') in condizioni durissime ma celebrate dalla retorica dell'autarchia fascista.",
    s2_4: "1938-1939: inaugurazione della ferrovia e ammodernamento degli impianti estrattivi; Gela (all'epoca parte della provincia) espande le produzioni cerealicole e il piccolo porto sulla costa meridionale siciliana.",
    s5: "Settembre 1939 - maggio 1940: non belligeranza; l'Ente Zolfi Italiani accentra la commercializzazione dello zolfo verso la Germania nazista e l'industria bellica del nord Italia.",
    s6: "Giugno 1940: mobilitazione dei minatori e contadini nisseni; Gela allestisce batterie costiere e sbarramenti a mare; le zolfare sono considerate stabilimenti ausiliari militarizzati.",
    s7: "Fine 1940: fanti nisseni combattono sul fronte albanese ed egiziano; la provincia vive una forte austerità economica mitigata dal lavoro frenetico nelle gallerie di zolfo.",
    s8: "Primavera 1941: l'aeroporto di Gela/Ponte Olivo viene occupato da formazioni di bombardieri e caccia italiani e tedeschi impegnati nelle violente offensive aeree contro la piazzaforte di Malta.",
    getNote: (step: number) => {
      if (step <= 1) return "Capitale storica del bacino zolfifero siciliano (bacino minerario di Caltanissetta e Gela); la produzione dello zolfo e dei sali potassici impiega migliaia di minatori ('zolfatari') in condizioni durissime ma celebrate dalla retorica dell'autarchia fascista.";
      if (step <= 4) return "1938-1939: inaugurazione della ferrovia e ammodernamento degli impianti estrattivi; Gela (all'epoca parte della provincia) espande le produzioni cerealicole e il piccolo porto sulla costa meridionale siciliana.";
      if (step === 5) return "Settembre 1939 - maggio 1940: non belligeranza; l'Ente Zolfi Italiani accentra la commercializzazione dello zolfo verso la Germania nazista e l'industria bellica del nord Italia.";
      if (step === 6) return "Giugno 1940: mobilitazione dei minatori e contadini nisseni; Gela allestisce batterie costiere e sbarramenti a mare; le zolfare sono considerate stabilimenti ausiliari militarizzati.";
      if (step === 7) return "Fine 1940: fanti nisseni combattono sul fronte albanese ed egiziano; la provincia vive una forte austerità economica mitigata dal lavoro frenetico nelle gallerie di zolfo.";
      return "Primavera 1941: l'aeroporto di Gela/Ponte Olivo viene occupato da formazioni di bombardieri e caccia italiani e tedeschi impegnati nelle violente offensive aeree contro la piazzaforte di Malta.";
    },
    getHistoricalName: (_step: number) => "Provincia di Caltanissetta",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Caltanissetta",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITG16": {
    nuts: "ITG16",
    name: "Provincia di Enna",
    modernName: "Enna",
    historicalName: "Provincia di Enna",
    region: "Sicilia",
    keys: ["castrogiovanni", "enna", "itg16", "nicosia", "piazza_armerina", "provincia_di_enna"],
    s0_1: "Istituita nel 1927 ribattezzando la storica città fortezza di 'Castrogiovanni' con il toponimo classico 'Enna'; 'belvedere di Sicilia' arroccato nel cuore montuoso dell'isola; economia imperniata su granicoltura, legumi e zolfare (Floristella e Grottacalda).",
    s2_4: "1938-1939: Enna vanta la supremazia nella produzione di frumento duro e riceve encomi nelle celebrazioni della Battaglia del Grano; le zolfare di Floristella e Grottacalda lavorano a pieno ritmo.",
    s5: "Autunno 1939 - primavera 1940: durante la non belligeranza, i silos granari di Enna fungono da immensa riserva alimentare strategica per l'intera Sicilia e per i fronti d'oltremare.",
    s6: "Giugno 1940: entrata in guerra; la posizione interna e protetta di Enna la rende sede ideale per depositi munizioni, centri di smistamento truppe e comandi di retrovia territoriali.",
    s7: "Autunno 1940: il reclutamento sottrae braccia indispensabili alla mietitura e alle zolfare; donne e anziani sostituiscono i richiamati nei campi e nelle gallerie minerarie.",
    s8: "Primavera 1941: Enna continua a rifornire grano e zolfo per lo sforzo bellico dell'Asse; aumentano i controlli annonari prefettizi contro la macinazione clandestina del grano duro.",
    getNote: (step: number) => {
      if (step <= 1) return "Istituita nel 1927 ribattezzando la storica città fortezza di 'Castrogiovanni' con il toponimo classico 'Enna'; 'belvedere di Sicilia' arroccato nel cuore montuoso dell'isola; economia imperniata su granicoltura, legumi e zolfare (Floristella e Grottacalda).";
      if (step <= 4) return "1938-1939: Enna vanta la supremazia nella produzione di frumento duro e riceve encomi nelle celebrazioni della Battaglia del Grano; le zolfare di Floristella e Grottacalda lavorano a pieno ritmo.";
      if (step === 5) return "Autunno 1939 - primavera 1940: durante la non belligeranza, i silos granari di Enna fungono da immensa riserva alimentare strategica per l'intera Sicilia e per i fronti d'oltremare.";
      if (step === 6) return "Giugno 1940: entrata in guerra; la posizione interna e protetta di Enna la rende sede ideale per depositi munizioni, centri di smistamento truppe e comandi di retrovia territoriali.";
      if (step === 7) return "Autunno 1940: il reclutamento sottrae braccia indispensabili alla mietitura e alle zolfare; donne e anziani sostituiscono i richiamati nei campi e nelle gallerie minerarie.";
      return "Primavera 1941: Enna continua a rifornire grano e zolfo per lo sforzo bellico dell'Asse; aumentano i controlli annonari prefettizi contro la macinazione clandestina del grano duro.";
    },
    getHistoricalName: (_step: number) => "Provincia di Enna",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Enna",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITG17": {
    nuts: "ITG17",
    name: "Provincia di Catania",
    modernName: "Catania",
    historicalName: "Provincia di Catania",
    region: "Sicilia",
    keys: ["acireale", "adrano", "caltagirone", "catania", "itg17", "paterno", "provincia_di_catania"],
    s0_1: "Seconda metropoli siciliana ai piedi dell'Etna, polo agricolo (agrumeti della Piana di Catania), commerciale e porto per lo zolfo; presenza dell'aeroporto militare di Catania-Fontanarossa e del campo di volo di Gerbini, massima concentrazione aeronautica dell'isola.",
    s2_4: "1938-1939: l'aeroporto di Fontanarossa e i campi satellite di Gerbini nella Piana di Catania sono ampliati per ospitare stormi da bombardamento e aerosiluranti della Regia Aeronautica.",
    s5: "Settembre 1939 - maggio 1940: i campi d'aviazione catanesi sono in costante allerta; il porto di Catania intensifica i carichi di agrumi e grano per il nord e la Libia.",
    s6: "Giugno 1940: dichiarazione di guerra; da Fontanarossa e Gerbini decollano i primi bombardieri Savoia-Marchetti SM.79 per colpire l'isola britannica di Malta; Catania subisce i primi bombardamenti aerei di rappresaglia della RAF.",
    s7: "Autunno 1940: la Piana di Catania diventa il perno della guerra aerea nel Mediterraneo centrale; le squadriglie aerosiluranti del capitano Carlo Emanuele Buscaglia basate a Gerbini compiono imprese audaci contro la flotta britannica.",
    s8: "Primavera 1941: il X. Fliegerkorps della Luftwaffe si insedia in forze a Catania-Fontanarossa e a Gerbini con Ju 87 Stuka, Ju 88 e caccia Bf 109, scatenando un'offensiva aerea devastante su Malta e sui convogli alleati.",
    getNote: (step: number) => {
      if (step <= 1) return "Seconda metropoli siciliana ai piedi dell'Etna, polo agricolo (agrumeti della Piana di Catania), commerciale e porto per lo zolfo; presenza dell'aeroporto militare di Catania-Fontanarossa e del campo di volo di Gerbini, massima concentrazione aeronautica dell'isola.";
      if (step <= 4) return "1938-1939: l'aeroporto di Fontanarossa e i campi satellite di Gerbini nella Piana di Catania sono ampliati per ospitare stormi da bombardamento e aerosiluranti della Regia Aeronautica.";
      if (step === 5) return "Settembre 1939 - maggio 1940: i campi d'aviazione catanesi sono in costante allerta; il porto di Catania intensifica i carichi di agrumi e grano per il nord e la Libia.";
      if (step === 6) return "Giugno 1940: dichiarazione di guerra; da Fontanarossa e Gerbini decollano i primi bombardieri Savoia-Marchetti SM.79 per colpire l'isola britannica di Malta; Catania subisce i primi bombardamenti aerei di rappresaglia della RAF.";
      if (step === 7) return "Autunno 1940: la Piana di Catania diventa il perno della guerra aerea nel Mediterraneo centrale; le squadriglie aerosiluranti del capitano Carlo Emanuele Buscaglia basate a Gerbini compiono imprese audaci contro la flotta britannica.";
      return "Primavera 1941: il X. Fliegerkorps della Luftwaffe si insedia in forze a Catania-Fontanarossa e a Gerbini con Ju 87 Stuka, Ju 88 e caccia Bf 109, scatenando un'offensiva aerea devastante su Malta e sui convogli alleati.";
    },
    getHistoricalName: (_step: number) => "Provincia di Catania",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Catania",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITG18": {
    nuts: "ITG18",
    name: "Provincia di Ragusa",
    modernName: "Ragusa",
    historicalName: "Provincia di Ragusa",
    region: "Sicilia",
    keys: ["comiso", "itg18", "modica", "provincia_di_ragusa", "ragusa", "vittoria"],
    s0_1: "Istituita nel 1927 nell'estremo sud-est dell'isola; ricca di miniere di asfalto e rocce asfaltiche (utilizzate per la produzione autarchica di oli combustibili e catrame), agricoltura della Val di Noto e l'aeroporto militare di Comiso (inaugurato nel 1939).",
    s2_4: "1938-1939: completamento del moderno aeroporto di Comiso, intitolato al generale Vincenzo Magliocco; le rocce asfaltiche di Ragusa vengono studiate dall'AGIP per l'estrazione di benzina autarchica sintetizzata.",
    s5: "Settembre 1939 - maggio 1940: l'aeroporto di Comiso viene presidiato da squadriglie della Regia Aeronautica; le miniere d'asfalto aumentano l'output per le pavimentazioni delle piste e gli scopi industriali bellici.",
    s6: "Giugno 1940: entrata in guerra; situato a poche decine di chilometri da Malta, l'aeroporto di Comiso diventa la base d'attacco principale contro l'isola fortezza britannica, subendo immediati raid di ritorsione della RAF.",
    s7: "Autunno 1940: da Comiso partono continue ondate di caccia e bombardieri contro i porti e gli aeroporti maltesi di Luqa e Hal Far; il porto di Pozzallo sorveglia il Canale di Malta.",
    s8: "Primavera 1941: squadriglie tedesche della Luftwaffe si affiancano a quelle italiane a Comiso per il martellamento aereo su Malta; la popolazione iblea vive in costante allarme e sotto stretto razionamento.",
    getNote: (step: number) => {
      if (step <= 1) return "Istituita nel 1927 nell'estremo sud-est dell'isola; ricca di miniere di asfalto e rocce asfaltiche (utilizzate per la produzione autarchica di oli combustibili e catrame), agricoltura della Val di Noto e l'aeroporto militare di Comiso (inaugurato nel 1939).";
      if (step <= 4) return "1938-1939: completamento del moderno aeroporto di Comiso, intitolato al generale Vincenzo Magliocco; le rocce asfaltiche di Ragusa vengono studiate dall'AGIP per l'estrazione di benzina autarchica sintetizzata.";
      if (step === 5) return "Settembre 1939 - maggio 1940: l'aeroporto di Comiso viene presidiato da squadriglie della Regia Aeronautica; le miniere d'asfalto aumentano l'output per le pavimentazioni delle piste e gli scopi industriali bellici.";
      if (step === 6) return "Giugno 1940: entrata in guerra; situato a poche decine di chilometri da Malta, l'aeroporto di Comiso diventa la base d'attacco principale contro l'isola fortezza britannica, subendo immediati raid di ritorsione della RAF.";
      if (step === 7) return "Autunno 1940: da Comiso partono continue ondate di caccia e bombardieri contro i porti e gli aeroporti maltesi di Luqa e Hal Far; il porto di Pozzallo sorveglia il Canale di Malta.";
      return "Primavera 1941: squadriglie tedesche della Luftwaffe si affiancano a quelle italiane a Comiso per il martellamento aereo su Malta; la popolazione iblea vive in costante allarme e sotto stretto razionamento.";
    },
    getHistoricalName: (_step: number) => "Provincia di Ragusa",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Ragusa",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITG19": {
    nuts: "ITG19",
    name: "Provincia di Siracusa",
    modernName: "Siracusa",
    historicalName: "Provincia di Siracusa",
    region: "Sicilia",
    keys: ["augusta", "avola", "itg19", "lentini", "noto", "provincia_di_siracusa", "siracusa", "syracuse"],
    s0_1: "Provincia affacciata sullo Ionio meridionale; porto storico di Siracusa, base per idrovolanti e la formidabile Piazzaforte Navale di Augusta-Siracusa, sede di hangar dirigibili, depositi carburanti della Regia Marina e potenti batterie costiere.",
    s2_4: "1938-1939: la base di Augusta viene potenziata come principale piazzaforte marittima della Sicilia orientale con sbarramenti difensivi e batterie contraeree della MILMART; Siracusa ospita la scuola idrovolanti.",
    s5: "Autunno 1939 - maggio 1940: non belligeranza; Augusta è in allarme continuo con sommergibili e MAS alla fonda pronti all'impiego; i grandi depositi carburante riforniscono le unità navali da crociera.",
    s6: "Giugno 1940: entrata in guerra; la piazzaforte di Augusta-Siracusa diventa base operativa avanzata per sommergibili e cacciatorpediniere; subisce i primi attacchi di aerosiluranti britannici.",
    s7: "Autunno 1940: da Augusta salpano convogli per la Cirenaica e la Tripolitania; le batterie costiere aprono ripetutamente il fuoco contro formazioni aeree nemiche dirette sui depositi navali.",
    s8: "Primavera 1941: Augusta accoglie formazioni di motosiluranti e MAS per le missioni d'interdizione notturna intorno a Malta; la cittadinanza siracusana sperimenta sfollamenti e razionamenti severi.",
    getNote: (step: number) => {
      if (step <= 1) return "Provincia affacciata sullo Ionio meridionale; porto storico di Siracusa, base per idrovolanti e la formidabile Piazzaforte Navale di Augusta-Siracusa, sede di hangar dirigibili, depositi carburanti della Regia Marina e potenti batterie costiere.";
      if (step <= 4) return "1938-1939: la base di Augusta viene potenziata come principale piazzaforte marittima della Sicilia orientale con sbarramenti difensivi e batterie contraeree della MILMART; Siracusa ospita la scuola idrovolanti.";
      if (step === 5) return "Autunno 1939 - maggio 1940: non belligeranza; Augusta è in allarme continuo con sommergibili e MAS alla fonda pronti all'impiego; i grandi depositi carburante riforniscono le unità navali da crociera.";
      if (step === 6) return "Giugno 1940: entrata in guerra; la piazzaforte di Augusta-Siracusa diventa base operativa avanzata per sommergibili e cacciatorpediniere; subisce i primi attacchi di aerosiluranti britannici.";
      if (step === 7) return "Autunno 1940: da Augusta salpano convogli per la Cirenaica e la Tripolitania; le batterie costiere aprono ripetutamente il fuoco contro formazioni aeree nemiche dirette sui depositi navali.";
      return "Primavera 1941: Augusta accoglie formazioni di motosiluranti e MAS per le missioni d'interdizione notturna intorno a Malta; la cittadinanza siracusana sperimenta sfollamenti e razionamenti severi.";
    },
    getHistoricalName: (_step: number) => "Provincia di Siracusa",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Siracusa",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITG2D": {
    nuts: "ITG2D",
    name: "Provincia di Sassari",
    modernName: "Sassari",
    historicalName: "Provincia di Sassari",
    region: "Sardegna",
    keys: ["alghero", "gallura", "itg2d", "la_maddalena", "maddalena", "olbia", "porto_torres", "provincia_di_sassari", "sassari", "tempio_pausania"],
    s0_1: "Capoluogo del Nord Sardegna; centro universitario storico, porto di Porto Torres, miniere d'argento e piombo dell'Argentiera, base idrovolanti di Olbia/Golfo Aranci e la potente piazzaforte navale della Maddalena.",
    s2_4: "1938-1939: l'arcipelago della Maddalena è una piazzaforte marittima inespugnabile della Regia Marina a guardia delle Bocche di Bonifacio e della Corsica; a Fertilia (Alghero) si inaugura una borgata di bonifica agraria.",
    s5: "Settembre 1939 - maggio 1940: durante la non belligeranza, le batterie della Maddalena e i presidi costieri sassaresi osservano i movimenti navali e aerei francesi in Corsica.",
    s6: "Giugno 1940: entrata in guerra; la Maddalena lancia motosiluranti e sommergibili contro il traffico tirrenico francese; Fertilia e Alghero ospitano squadriglie da caccia e idrovolanti della Regia Aeronautica.",
    s7: "Autunno 1940: la piazzaforte della Maddalena funge da scudo per il Tirreno settentrionale; convogli navali carichi di minerali e derrate collegano Porto Torres con Civitavecchia e Genova.",
    s8: "Primavera 1941: l'aeroporto di Fertilia/Alghero e la base della Maddalena sono cardini difensivi dell'Asse contro possibili sortite della Force H britannica da Gibilterra; la provincia soffre l'isolamento insulare.",
    getNote: (step: number) => {
      if (step <= 1) return "Capoluogo del Nord Sardegna; centro universitario storico, porto di Porto Torres, miniere d'argento e piombo dell'Argentiera, base idrovolanti di Olbia/Golfo Aranci e la potente piazzaforte navale della Maddalena.";
      if (step <= 4) return "1938-1939: l'arcipelago della Maddalena è una piazzaforte marittima inespugnabile della Regia Marina a guardia delle Bocche di Bonifacio e della Corsica; a Fertilia (Alghero) si inaugura una borgata di bonifica agraria.";
      if (step === 5) return "Settembre 1939 - maggio 1940: durante la non belligeranza, le batterie della Maddalena e i presidi costieri sassaresi osservano i movimenti navali e aerei francesi in Corsica.";
      if (step === 6) return "Giugno 1940: entrata in guerra; la Maddalena lancia motosiluranti e sommergibili contro il traffico tirrenico francese; Fertilia e Alghero ospitano squadriglie da caccia e idrovolanti della Regia Aeronautica.";
      if (step === 7) return "Autunno 1940: la piazzaforte della Maddalena funge da scudo per il Tirreno settentrionale; convogli navali carichi di minerali e derrate collegano Porto Torres con Civitavecchia e Genova.";
      return "Primavera 1941: l'aeroporto di Fertilia/Alghero e la base della Maddalena sono cardini difensivi dell'Asse contro possibili sortite della Force H britannica da Gibilterra; la provincia soffre l'isolamento insulare.";
    },
    getHistoricalName: (_step: number) => "Provincia di Sassari",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Sassari",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITG2E": {
    nuts: "ITG2E",
    name: "Provincia di Nuoro",
    modernName: "Nuoro",
    historicalName: "Provincia di Nuoro",
    region: "Sardegna",
    keys: ["barbagia", "itg2e", "lanusei", "macomer", "nuoro", "ogliastra", "provincia_di_nuoro", "siniscola", "tortoli"],
    s0_1: "Istituita nel 1927 nel cuore montuoso della Barbagia e del Gennargentu; patria di Grazia Deledda (Premio Nobel 1926); economia imperniata sulla pastorizia ovina (formaggio pecorino), foreste di leccio e miniere di bauxite e talco a Orani.",
    s2_4: "1938-1939: la valorizzazione dei pascoli barbaricini garantisce formaggi e pelli per il consumo nazionale; la Brigata 'Sassari' accoglie migliaia di fanti nuoresi fieri delle tradizioni della Grande Guerra.",
    s5: "Autunno 1939 - primavera 1940: non belligeranza; l'ammasso della lana e dei formaggi nuoresi è gestito con rigore dai consorzi fascisti; legname e sughero barbaricini per l'autarchia.",
    s6: "Giugno 1940: dichiarazione di guerra; i giovani nuoresi mobilitati nella Brigata Sassari e nei reggimenti costieri difendono le coste sarde e i fronti dell'Esercito.",
    s7: "Fine 1940: l'isolamento montano protegge Nuoro dai bombardamenti ma le famiglie piangono i caduti sul fronte greco-albanese; dura applicazione del razionamento dei beni di consumo.",
    s8: "Primavera 1941: la Barbagia sostiene l'economia bellica con la produzione casearia e di sughero; si rafforzano i presidi della Milizia Forestale contro incendi e contrabbando.",
    getNote: (step: number) => {
      if (step <= 1) return "Istituita nel 1927 nel cuore montuoso della Barbagia e del Gennargentu; patria di Grazia Deledda (Premio Nobel 1926); economia imperniata sulla pastorizia ovina (formaggio pecorino), foreste di leccio e miniere di bauxite e talco a Orani.";
      if (step <= 4) return "1938-1939: la valorizzazione dei pascoli barbaricini garantisce formaggi e pelli per il consumo nazionale; la Brigata 'Sassari' accoglie migliaia di fanti nuoresi fieri delle tradizioni della Grande Guerra.";
      if (step === 5) return "Autunno 1939 - primavera 1940: non belligeranza; l'ammasso della lana e dei formaggi nuoresi è gestito con rigore dai consorzi fascisti; legname e sughero barbaricini per l'autarchia.";
      if (step === 6) return "Giugno 1940: dichiarazione di guerra; i giovani nuoresi mobilitati nella Brigata Sassari e nei reggimenti costieri difendono le coste sarde e i fronti dell'Esercito.";
      if (step === 7) return "Fine 1940: l'isolamento montano protegge Nuoro dai bombardamenti ma le famiglie piangono i caduti sul fronte greco-albanese; dura applicazione del razionamento dei beni di consumo.";
      return "Primavera 1941: la Barbagia sostiene l'economia bellica con la produzione casearia e di sughero; si rafforzano i presidi della Milizia Forestale contro incendi e contrabbando.";
    },
    getHistoricalName: (_step: number) => "Provincia di Nuoro",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Nuoro",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITG2F": {
    nuts: "ITG2F",
    name: "Provincia di Cagliari",
    modernName: "Cagliari",
    historicalName: "Provincia di Cagliari",
    region: "Sardegna",
    keys: ["cagliari", "iglesias", "itg2f", "provincia_di_cagliari", "quartu_sant_elena", "sardegna", "sardinia"],
    s0_1: "Capoluogo della Sardegna e massimo porto dell'isola; base navale, idroscalo e grande aeroporto militare di Cagliari-Elmas (intitolato a Mario Mameli), polo chimico-minerario e snodo commerciale del Campidano.",
    s2_4: "1938-1939: l'aeroporto di Elmas è una delle basi aeree più moderne d'Italia, equipaggiata con aerosiluranti SM.79 e caccia; il porto di Cagliari è protetto da sbarramenti foranei e postazioni della MILMART.",
    s5: "Settembre 1939 - maggio 1940: durante la non belligeranza, Cagliari è in continuo stato di prontezza operativa per proteggere le rotte tirreniche e controllare le mosse alleate nel Mediterraneo occidentale.",
    s6: "Giugno 1940: entrata in guerra; già nel giugno-luglio 1940 l'aeroporto di Elmas e il porto di Cagliari subiscono pesanti bombardamenti da parte degli aerei della portaerei britannica HMS Ark Royal; scatta la caccia aerea su Capo Teulada.",
    s7: "27 novembre 1940: Battaglia navale di Capo Teulada al largo delle coste meridionali cagliaritane tra la Regia Marina e la Royal Navy; gli aerosiluranti di base a Elmas attaccano le navi da battaglia britanniche.",
    s8: "Primavera 1941: Cagliari subisce ripetuti allarmi e raid aerei britannici; la città si organizza con rifugi antiaerei nelle gallerie della rocca medievale di Castello e nelle cisterne romane.",
    getNote: (step: number) => {
      if (step <= 1) return "Capoluogo della Sardegna e massimo porto dell'isola; base navale, idroscalo e grande aeroporto militare di Cagliari-Elmas (intitolato a Mario Mameli), polo chimico-minerario e snodo commerciale del Campidano.";
      if (step <= 4) return "1938-1939: l'aeroporto di Elmas è una delle basi aeree più moderne d'Italia, equipaggiata con aerosiluranti SM.79 e caccia; il porto di Cagliari è protetto da sbarramenti foranei e postazioni della MILMART.";
      if (step === 5) return "Settembre 1939 - maggio 1940: durante la non belligeranza, Cagliari è in continuo stato di prontezza operativa per proteggere le rotte tirreniche e controllare le mosse alleate nel Mediterraneo occidentale.";
      if (step === 6) return "Giugno 1940: entrata in guerra; già nel giugno-luglio 1940 l'aeroporto di Elmas e il porto di Cagliari subiscono pesanti bombardamenti da parte degli aerei della portaerei britannica HMS Ark Royal; scatta la caccia aerea su Capo Teulada.";
      if (step === 7) return "27 novembre 1940: Battaglia navale di Capo Teulada al largo delle coste meridionali cagliaritane tra la Regia Marina e la Royal Navy; gli aerosiluranti di base a Elmas attaccano le navi da battaglia britanniche.";
      return "Primavera 1941: Cagliari subisce ripetuti allarmi e raid aerei britannici; la città si organizza con rifugi antiaerei nelle gallerie della rocca medievale di Castello e nelle cisterne romane.";
    },
    getHistoricalName: (_step: number) => "Provincia di Cagliari",
    getAdminTitle: (_step: number) => "Regno d'Italia — Provincia di Cagliari",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITG2G": {
    nuts: "ITG2G",
    name: "Oristano (Provincia di Cagliari)",
    modernName: "Oristano",
    historicalName: "Oristano (Provincia di Cagliari)",
    region: "Sardegna",
    keys: ["arborea", "bosa", "itg2g", "mussolinia", "mussolinia_di_sardegna", "oristano", "oristano_cagliari", "oristano_provincia_di_cagliari", "tirso", "villaggio_mussolini"],
    s0_1: "Territorio del Campidano centro-occidentale (compreso nella provincia di Cagliari fino al 1974); straordinaria bonifica delle paludi del golfo di Oristano e fondazione della città ideale autarchica di 'Mussolinia di Sardegna' (inaugurata nel 1928, ribattezzata Arborea nel 1944).",
    s2_4: "1938-1939: Mussolinia di Sardegna è un modello pilota di cooperativismo agrario fascista con cascine all'avanguardia, caseifici, stalle modello e coloni veneti, friulani e sardi; imponente diga idroelettrica del lago Omodeo sul Tirso.",
    s5: "Settembre 1939 - maggio 1940: non belligeranza; la piana di Mussolinia produce ingenti quantitativi di latte, burro, grano e foraggio destinati alle riserve del Ministero dell'Agricoltura.",
    s6: "Giugno 1940: entrata in guerra; il golfo di Oristano e la penisola del Sinis vengono presidiati da posti di vedetta costiera e batterie antinave a difesa del versante occidentale sardo.",
    s7: "Fine 1940: la diga del Tirso e le centrali idroelettriche garantiscono energia vitale alle miniere e alle città dell'isola; la popolazione agraria sostiene l'ammasso obbligatorio di riso e cereali.",
    s8: "Primavera 1941: Mussolinia di Sardegna prosegue la produzione agraria intensiva autarchica; la costa oristanese resta in allerta per prevenire sbarchi clandestini di spie o incursori alleati.",
    getNote: (step: number) => {
      if (step <= 1) return "Territorio del Campidano centro-occidentale (compreso nella provincia di Cagliari fino al 1974); straordinaria bonifica delle paludi del golfo di Oristano e fondazione della città ideale autarchica di 'Mussolinia di Sardegna' (inaugurata nel 1928, ribattezzata Arborea nel 1944).";
      if (step <= 4) return "1938-1939: Mussolinia di Sardegna è un modello pilota di cooperativismo agrario fascista con cascine all'avanguardia, caseifici, stalle modello e coloni veneti, friulani e sardi; imponente diga idroelettrica del lago Omodeo sul Tirso.";
      if (step === 5) return "Settembre 1939 - maggio 1940: non belligeranza; la piana di Mussolinia produce ingenti quantitativi di latte, burro, grano e foraggio destinati alle riserve del Ministero dell'Agricoltura.";
      if (step === 6) return "Giugno 1940: entrata in guerra; il golfo di Oristano e la penisola del Sinis vengono presidiati da posti di vedetta costiera e batterie antinave a difesa del versante occidentale sardo.";
      if (step === 7) return "Fine 1940: la diga del Tirso e le centrali idroelettriche garantiscono energia vitale alle miniere e alle città dell'isola; la popolazione agraria sostiene l'ammasso obbligatorio di riso e cereali.";
      return "Primavera 1941: Mussolinia di Sardegna prosegue la produzione agraria intensiva autarchica; la costa oristanese resta in allerta per prevenire sbarchi clandestini di spie o incursori alleati.";
    },
    getHistoricalName: (_step: number) => "Oristano (Provincia di Cagliari)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Circondario di Oristano e Mussolinia di Sardegna (Provincia di Cagliari)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "ITG2H": {
    nuts: "ITG2H",
    name: "Sulcis e Campidano (Provincia di Cagliari)",
    modernName: "Sud Sardegna",
    historicalName: "Sulcis e Campidano (Provincia di Cagliari)",
    region: "Sardegna",
    keys: ["carbonia", "carloforte", "iglesiente", "itg2h", "sanluri", "sant_antioco", "sud_sardegna", "sulcis", "sulcis_e_campidano_cagliari", "sulcis_e_campidano_provincia_di_cagliari", "villacidro"],
    s0_1: "Cuore minerario della Sardegna e pilastro dell'autarchia fascista: il 18 dicembre 1938 Benito Mussolini inaugura personalmente la nuova città mineraria di 'Carbonia' nel bacino carbonifero del Sulcis, affiancata dalle storiche miniere di piombo e zinco di Iglesias e Montevecchio.",
    s2_4: "1938-1939: a Carbonia convergono decine di migliaia di minatori da tutta Italia per estrarre il carbone fossile autarchico (carbone Sulcis) per rendere il Paese indipendente dalle importazioni britanniche; l'isola di San Pietro (Carloforte) e Sant'Antioco fungono da porti d'imbarco minerario.",
    s5: "Settembre 1939 - maggio 1940: con il blocco navale britannico sul carbone tedesco via mare, l'estrazione di carbone a Carbonia e di piombo e zinco a Iglesias assume importanza suprema di salvezza nazionale.",
    s6: "Giugno 1940: dichiarazione di guerra; le miniere del Sulcis-Iglesiente vengono poste sotto disciplina militare di guerra con turni continui; i porti di Sant'Antioco e Portovesme caricano navi carboniere per Genova e Piombino.",
    s7: "Autunno 1940: la produzione mineraria tocca il culmine storico nonostante le difficoltà di estrazione e la presenza di zolfo nel carbone sulcitano; operai e minatori lavorano sotto la stretta sorveglianza dei Fasci.",
    s8: "Primavera 1941: il carbone di Carbonia e i metalli non ferrosi di Iglesias continuano ad alimentare le acciaierie e le centrali elettriche del Regno d'Italia; il distretto affronta la carenza di viveri e le difficoltà nei trasporti marittimi per il siluramento dei mercantili.",
    getNote: (step: number) => {
      if (step <= 1) return "Cuore minerario della Sardegna e pilastro dell'autarchia fascista: il 18 dicembre 1938 Benito Mussolini inaugura personalmente la nuova città mineraria di 'Carbonia' nel bacino carbonifero del Sulcis, affiancata dalle storiche miniere di piombo e zinco di Iglesias e Montevecchio.";
      if (step <= 4) return "1938-1939: a Carbonia convergono decine di migliaia di minatori da tutta Italia per estrarre il carbone fossile autarchico (carbone Sulcis) per rendere il Paese indipendente dalle importazioni britanniche; l'isola di San Pietro (Carloforte) e Sant'Antioco fungono da porti d'imbarco minerario.";
      if (step === 5) return "Settembre 1939 - maggio 1940: con il blocco navale britannico sul carbone tedesco via mare, l'estrazione di carbone a Carbonia e di piombo e zinco a Iglesias assume importanza suprema di salvezza nazionale.";
      if (step === 6) return "Giugno 1940: dichiarazione di guerra; le miniere del Sulcis-Iglesiente vengono poste sotto disciplina militare di guerra con turni continui; i porti di Sant'Antioco e Portovesme caricano navi carboniere per Genova e Piombino.";
      if (step === 7) return "Autunno 1940: la produzione mineraria tocca il culmine storico nonostante le difficoltà di estrazione e la presenza di zolfo nel carbone sulcitano; operai e minatori lavorano sotto la stretta sorveglianza dei Fasci.";
      return "Primavera 1941: il carbone di Carbonia e i metalli non ferrosi di Iglesias continuano ad alimentare le acciaierie e le centrali elettriche del Regno d'Italia; il distretto affronta la carenza di viveri e le difficoltà nei trasporti marittimi per il siluramento dei mercantili.";
    },
    getHistoricalName: (_step: number) => "Sulcis e Campidano (Provincia di Cagliari)",
    getAdminTitle: (_step: number) => "Regno d'Italia — Bacino Minerario del Sulcis-Iglesiente (Provincia di Cagliari)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "AL_ALBANIA": {
    nuts: "AL_ALBANIA",
    name: "Regno d'Albania (in Unione Personale con la Corona d'Italia)",
    modernName: "Albania",
    historicalName: "Regno d'Albania (in Unione Personale con la Corona d'Italia)",
    region: "Balcani Occidentali",
    keys: ["al_albania", "albania", "regno_d_albania_in_unione_personale_con_la_corona_d_italia"],
    s0_1: "Tra il 1936 e l'inizio del 1939 l'Albania di re Zog I è legata all'Italia fascista dai Trattati di Tirana: massicci prestiti finanziari, concessioni petrolifere all'AGIP nel bacino di Devoli e influenza militare con ufficiali italiani istruttori.",
    s2_4: "7-12 aprile 1939: l'Italia invade l'Albania con un corpo di spedizione (sbarco a Durazzo, Valona, Santi Quaranta, San Giovanni di Medua); re Zog fugge in esilio. L'Assemblea Costituente offre la corona a Vittorio Emanuele III: nasce l'Unione Personale italo-albanese guidata dal Luogotenente Generale Francesco Jacomoni.",
    s5: "Settembre 1939 - maggio 1940: l'Albania viene integrata nell'apparato statale ed economico fascista: estrazione del petrolio di Devoli per l'autarchia dei carburanti, costruzione di strade e ponti strategici verso la Grecia da parte delle ditte italiane.",
    s6: "Giugno 1940: l'Albania segue l'Italia nella dichiarazione di guerra a Francia e Gran Bretagna; sul territorio albanese si concentrano le divisioni del Regio Esercito destinate al teatro balcanico.",
    s7: "28 ottobre 1940: dall'Albania le divisioni italiane scatenano l'offensiva contro la Grecia ('Spezzeremo le reni alla Grecia'). Il piano fallisce miseramente: le truppe greche contrattaccano respingendo gli italiani e occupando un terzo dell'Albania meridionale (Coriza, Argirocastro, Santi Quaranta/Porto Edda) nel fango e gelo dell'inverno.",
    s8: "Aprile 1941: con l'intervento a valanga della Wehrmacht tedesca nei Balcani (Operazione Marita), le forze italiane in Albania riprendono l'offensiva travolgendo i greci; nasce la 'Grande Albania' sotto occupazione italo-tedesca con l'annessione del Kosovo e di territori macedoni e montenegrini.",
    getNote: (step: number) => {
      if (step <= 1) return "Tra il 1936 e l'inizio del 1939 l'Albania di re Zog I è legata all'Italia fascista dai Trattati di Tirana: massicci prestiti finanziari, concessioni petrolifere all'AGIP nel bacino di Devoli e influenza militare con ufficiali italiani istruttori.";
      if (step <= 4) return "7-12 aprile 1939: l'Italia invade l'Albania con un corpo di spedizione (sbarco a Durazzo, Valona, Santi Quaranta, San Giovanni di Medua); re Zog fugge in esilio. L'Assemblea Costituente offre la corona a Vittorio Emanuele III: nasce l'Unione Personale italo-albanese guidata dal Luogotenente Generale Francesco Jacomoni.";
      if (step === 5) return "Settembre 1939 - maggio 1940: l'Albania viene integrata nell'apparato statale ed economico fascista: estrazione del petrolio di Devoli per l'autarchia dei carburanti, costruzione di strade e ponti strategici verso la Grecia da parte delle ditte italiane.";
      if (step === 6) return "Giugno 1940: l'Albania segue l'Italia nella dichiarazione di guerra a Francia e Gran Bretagna; sul territorio albanese si concentrano le divisioni del Regio Esercito destinate al teatro balcanico.";
      if (step === 7) return "28 ottobre 1940: dall'Albania le divisioni italiane scatenano l'offensiva contro la Grecia ('Spezzeremo le reni alla Grecia'). Il piano fallisce miseramente: le truppe greche contrattaccano respingendo gli italiani e occupando un terzo dell'Albania meridionale (Coriza, Argirocastro, Santi Quaranta/Porto Edda) nel fango e gelo dell'inverno.";
      return "Aprile 1941: con l'intervento a valanga della Wehrmacht tedesca nei Balcani (Operazione Marita), le forze italiane in Albania riprendono l'offensiva travolgendo i greci; nasce la 'Grande Albania' sotto occupazione italo-tedesca con l'annessione del Kosovo e di territori macedoni e montenegrini.";
    },
    getHistoricalName: (_step: number) => "Regno d'Albania (in Unione Personale con la Corona d'Italia)",
    getAdminTitle: (_step: number) => "Luogotenenza Generale del Regno d'Albania (Corona di Vittorio Emanuele III)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "EL421": {
    nuts: "EL421",
    name: "Possedimento delle Isole Italiane dell'Egeo (Rodi)",
    modernName: "Rodos / Rodi (Dodecaneso)",
    historicalName: "Possedimento delle Isole Italiane dell'Egeo (Rodi)",
    region: "Isole Italiane dell'Egeo",
    keys: ["el421", "possedimento_delle_isole_italiane_dell_egeo_rodi", "rodi_dodecaneso", "rodos", "rodos__rodi_dodecaneso"],
    s0_1: "Capitale del possedimento coloniale delle 'Isole Italiane dell'Egeo' (occupate nel 1912 e formalmente cedute col Trattato di Losanna del 1923); Rodi risplende delle grandi opere urbanistiche e del restauro monumentale del Palazzo dei Gran Maestri voluto dal Governatore Cesare Maria De Vecchi di Val Cismon.",
    s2_4: "1938-1939: De Vecchi impone una rigorosa politica di fascistizzazione e applicazione delle leggi razziali alla storica comunità ebraica sefardita di Rodi; la piazzaforte navale di Lero (Leros) diventa la più formidabile base di sommergibili e idrovolanti nel Mediterraneo orientale.",
    s5: "Settembre 1939 - maggio 1940: le Isole dell'Egeo vivono isolate ma altamente armate; le piste aeree di Rodi-Marizza e Calato ospitano stormi di bombardieri Savoia-Marchetti SM.79 e SM.81 pronti all'impiego.",
    s6: "Giugno 1940: entrata in guerra; dal Dodecaneso partono le prime incursioni aeree della Regia Aeronautica contro le raffinerie britanniche di Haifa in Palestina, i canali del Golfo di Suez e le rotte nel Levante; le isole subiscono il blocco navale britannico.",
    s7: "Autunno 1940: Rodi e Lero sostengono bombardamenti quotidiani della Royal Air Force e della Royal Navy; i sommergibili e MAS di base a Lero insidiano il traffico navale nemico nel Mar Egeo e al largo di Creta.",
    s8: "Primavera 1941: gli aeroporti di Rodi e Calato supportano le operazioni italo-tedesche per l'occupazione della Grecia continentale e preparano il piano d'invasione dell'isola di Creta (Operazione Merkur).",
    getNote: (step: number) => {
      if (step <= 1) return "Capitale del possedimento coloniale delle 'Isole Italiane dell'Egeo' (occupate nel 1912 e formalmente cedute col Trattato di Losanna del 1923); Rodi risplende delle grandi opere urbanistiche e del restauro monumentale del Palazzo dei Gran Maestri voluto dal Governatore Cesare Maria De Vecchi di Val Cismon.";
      if (step <= 4) return "1938-1939: De Vecchi impone una rigorosa politica di fascistizzazione e applicazione delle leggi razziali alla storica comunità ebraica sefardita di Rodi; la piazzaforte navale di Lero (Leros) diventa la più formidabile base di sommergibili e idrovolanti nel Mediterraneo orientale.";
      if (step === 5) return "Settembre 1939 - maggio 1940: le Isole dell'Egeo vivono isolate ma altamente armate; le piste aeree di Rodi-Marizza e Calato ospitano stormi di bombardieri Savoia-Marchetti SM.79 e SM.81 pronti all'impiego.";
      if (step === 6) return "Giugno 1940: entrata in guerra; dal Dodecaneso partono le prime incursioni aeree della Regia Aeronautica contro le raffinerie britanniche di Haifa in Palestina, i canali del Golfo di Suez e le rotte nel Levante; le isole subiscono il blocco navale britannico.";
      if (step === 7) return "Autunno 1940: Rodi e Lero sostengono bombardamenti quotidiani della Royal Air Force e della Royal Navy; i sommergibili e MAS di base a Lero insidiano il traffico navale nemico nel Mar Egeo e al largo di Creta.";
      return "Primavera 1941: gli aeroporti di Rodi e Calato supportano le operazioni italo-tedesche per l'occupazione della Grecia continentale e preparano il piano d'invasione dell'isola di Creta (Operazione Merkur).";
    },
    getHistoricalName: (_step: number) => "Possedimento delle Isole Italiane dell'Egeo (Rodi)",
    getAdminTitle: (_step: number) => "Governatorato delle Isole Italiane dell'Egeo (Rodi)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "HR036": {
    nuts: "HR036",
    name: "Provincia di Pola (Istria)",
    modernName: "Pula / Istria",
    historicalName: "Provincia di Pola (Istria)",
    region: "Istria",
    keys: ["hr036", "istria", "pola_istria", "provincia_di_pola_istria", "pula", "pula__istria"],
    s0_1: "Capoluogo dell'Istria italiana (annessa al Regno d'Italia nel 1918-1920 con il Trattato di Rapallo); massima base navale dell'Adriatico con il Regio Arsenale di Pola, la Scuola Sommergibilisti e i bacini di carenaggio; bauxite a Rovigno e carbone ad Arsia (bacino dell'Arsa inaugurato nel 1937).",
    s2_4: "1938-1939: Mussolini inaugura la moderna città mineraria di 'Arsia' (Raša) per l'estrazione autarchica del carbone istriano; a Pola si addestrano tutti i sommergibilisti della Regia Marina destinate ai mari del mondo.",
    s5: "Settembre 1939 - maggio 1940: le miniere di Arsia lavorano a ritmi forzati per fornire carbone alle ferrovie e all'industria bellica; la rada di Pola e le isole Brioni ospitano unità della Marina in addestramento continuo.",
    s6: "Giugno 1940: entrata in guerra; la base sommergibili di Pola lancia i primi battelli nelle crociere offensive nell'Adriatico e nello Ionio; difese costiere della penisola istriana in allarme permanente.",
    s7: "Autunno 1940: Pola costituisce il perno logistico della Marina per il controllo dell'alto e medio Adriatico; decine di giovani ufficiali sommergibilisti lasciano Pola per le missioni atlantiche di BETASOM a Bordeaux.",
    s8: "Aprile 1941: le basi aeronavali di Pola e dell'Istria partecipano all'offensiva dell'Asse contro la Jugoslavia garantendo il blocco marittimo totale e il supporto da sbarco sulle isole quarnerine.",
    getNote: (step: number) => {
      if (step <= 1) return "Capoluogo dell'Istria italiana (annessa al Regno d'Italia nel 1918-1920 con il Trattato di Rapallo); massima base navale dell'Adriatico con il Regio Arsenale di Pola, la Scuola Sommergibilisti e i bacini di carenaggio; bauxite a Rovigno e carbone ad Arsia (bacino dell'Arsa inaugurato nel 1937).";
      if (step <= 4) return "1938-1939: Mussolini inaugura la moderna città mineraria di 'Arsia' (Raša) per l'estrazione autarchica del carbone istriano; a Pola si addestrano tutti i sommergibilisti della Regia Marina destinate ai mari del mondo.";
      if (step === 5) return "Settembre 1939 - maggio 1940: le miniere di Arsia lavorano a ritmi forzati per fornire carbone alle ferrovie e all'industria bellica; la rada di Pola e le isole Brioni ospitano unità della Marina in addestramento continuo.";
      if (step === 6) return "Giugno 1940: entrata in guerra; la base sommergibili di Pola lancia i primi battelli nelle crociere offensive nell'Adriatico e nello Ionio; difese costiere della penisola istriana in allarme permanente.";
      if (step === 7) return "Autunno 1940: Pola costituisce il perno logistico della Marina per il controllo dell'alto e medio Adriatico; decine di giovani ufficiali sommergibilisti lasciano Pola per le missioni atlantiche di BETASOM a Bordeaux.";
      return "Aprile 1941: le basi aeronavali di Pola e dell'Istria partecipano all'offensiva dell'Asse contro la Jugoslavia garantendo il blocco marittimo totale e il supporto da sbarco sulle isole quarnerine.";
    },
    getHistoricalName: (_step: number) => "Provincia di Pola (Istria)",
    getAdminTitle: (_step: number) => "Provincia di Pola (Prefettura del Regno d'Italia)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "IT_FIUME": {
    nuts: "IT_FIUME",
    name: "Provincia del Carnaro (Fiume)",
    modernName: "Rijeka",
    historicalName: "Provincia del Carnaro (Fiume)",
    region: "Carnaro",
    keys: ["it_fiume", "provincia_del_carnaro_fiume", "rijeka"],
    s0_1: "Annessa all'Italia nel 1924 col Trattato di Roma dopo l'impresa dannunziana; grande polo marittimo e industriale dell'Adriatico con i Cantieri Navali del Quarnaro, la Raffineria di Petroli ROMSA e lo storico Silurificio Whitehead, leader mondiale nella produzione di siluri.",
    s2_4: "1938-1939: il Silurificio Whitehead di Fiume lavora al massimo della capacità fornendo siluri d'avanguardia per la Regia Marina e per le marine dell'Asse e alleate (Giappone, Germania, Spagna); la ROMSA raffina greggio vitale per la flotta.",
    s5: "Autunno 1939 - maggio 1940: la frontiera del fiume Eneo/Rječina con la Jugoslavia viene presidiata con bunker del Vallo Alpino Orientale; la produzione di siluri tocca ritmi record.",
    s6: "Giugno 1940: scoppio delle ostilità; i Cantieri del Quarnaro e il Silurificio Whitehead sono dichiarati stabilimenti militari di massima segretezza protetti da sbarramenti fumogeni e contraerei.",
    s7: "Autunno 1940: Fiume rifornisce i sommergibili e le squadriglie aerosiluranti italiane impegnate nel Mediterraneo; la città ospita reparti della 2ª Armata pronti a presidiare il confine orientale.",
    s8: "Aprile 1941: 6 aprile 1941, le forze italiane scattano da Fiume invadendo la costa croata e le isole del Quarnaro (Veglia e Arbe); la provincia del Carnaro viene ampliata annettendo territori litoranei e montani sloveni e croati.",
    getNote: (step: number) => {
      if (step <= 1) return "Annessa all'Italia nel 1924 col Trattato di Roma dopo l'impresa dannunziana; grande polo marittimo e industriale dell'Adriatico con i Cantieri Navali del Quarnaro, la Raffineria di Petroli ROMSA e lo storico Silurificio Whitehead, leader mondiale nella produzione di siluri.";
      if (step <= 4) return "1938-1939: il Silurificio Whitehead di Fiume lavora al massimo della capacità fornendo siluri d'avanguardia per la Regia Marina e per le marine dell'Asse e alleate (Giappone, Germania, Spagna); la ROMSA raffina greggio vitale per la flotta.";
      if (step === 5) return "Autunno 1939 - maggio 1940: la frontiera del fiume Eneo/Rječina con la Jugoslavia viene presidiata con bunker del Vallo Alpino Orientale; la produzione di siluri tocca ritmi record.";
      if (step === 6) return "Giugno 1940: scoppio delle ostilità; i Cantieri del Quarnaro e il Silurificio Whitehead sono dichiarati stabilimenti militari di massima segretezza protetti da sbarramenti fumogeni e contraerei.";
      if (step === 7) return "Autunno 1940: Fiume rifornisce i sommergibili e le squadriglie aerosiluranti italiane impegnate nel Mediterraneo; la città ospita reparti della 2ª Armata pronti a presidiare il confine orientale.";
      return "Aprile 1941: 6 aprile 1941, le forze italiane scattano da Fiume invadendo la costa croata e le isole del Quarnaro (Veglia e Arbe); la provincia del Carnaro viene ampliata annettendo territori litoranei e montani sloveni e croati.";
    },
    getHistoricalName: (_step: number) => "Provincia del Carnaro (Fiume)",
    getAdminTitle: (_step: number) => "Provincia del Carnaro (Prefettura del Regno d'Italia)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "IT_ZARA": {
    nuts: "IT_ZARA",
    name: "Provincia di Zara",
    modernName: "Zadar",
    historicalName: "Provincia di Zara",
    region: "Dalmazia",
    keys: ["it_zara", "provincia_di_zara", "zadar", "zara"],
    s0_1: "Exclave italiana sulla costa dalmata (istituita con il Trattato di Rapallo del 1920); porto franco, sede arcivescovile e centro della storica comunità italiana di Dalmazia; famosa per la produzione del liquore Maraschino (distillerie Luxardo, Drioli, Vlahov).",
    s2_4: "1938-1939: Zara vive come un'enclave circondata dal territorio del Regno di Jugoslavia; la guarnigione militare e i presidi della Milizia Confinaria mantengono un costante stato di vigilanza lungo la stretta fascia confinaria.",
    s5: "Settembre 1939 - maggio 1940: durante la non belligeranza, Zara è collegata via mare con Ancona e Trieste; aumentano le tensioni con le autorità confinarie jugoslave e le misure di sicurezza per i rifornimenti alimentari.",
    s6: "Giugno 1940: entrata in guerra; Zara viene dichiarata piazzaforte isolata e rifornita unicamente via mare dalla Regia Marina; le difese urbane e costiere vengono fortificate con trincee e filo spinato.",
    s7: "Autunno 1940: durante la campagna contro la Grecia, Zara funge da base di spionaggio e osservazione delle mosse jugoslave; i cittadini subiscono il razionamento e l'allerta militare permanente.",
    s8: "Aprile 1941: con l'invasione della Jugoslavia da parte dell'Asse (6 aprile 1941), la guarnigione di Zara e le truppe della 2ª Armata rompono l'isolamento occupando la Dalmazia centrale; Mussolini istituisce il 'Governatorato di Dalmazia' annettendo Zara, Spalato e Cattaro al Regno d'Italia.",
    getNote: (step: number) => {
      if (step <= 1) return "Exclave italiana sulla costa dalmata (istituita con il Trattato di Rapallo del 1920); porto franco, sede arcivescovile e centro della storica comunità italiana di Dalmazia; famosa per la produzione del liquore Maraschino (distillerie Luxardo, Drioli, Vlahov).";
      if (step <= 4) return "1938-1939: Zara vive come un'enclave circondata dal territorio del Regno di Jugoslavia; la guarnigione militare e i presidi della Milizia Confinaria mantengono un costante stato di vigilanza lungo la stretta fascia confinaria.";
      if (step === 5) return "Settembre 1939 - maggio 1940: durante la non belligeranza, Zara è collegata via mare con Ancona e Trieste; aumentano le tensioni con le autorità confinarie jugoslave e le misure di sicurezza per i rifornimenti alimentari.";
      if (step === 6) return "Giugno 1940: entrata in guerra; Zara viene dichiarata piazzaforte isolata e rifornita unicamente via mare dalla Regia Marina; le difese urbane e costiere vengono fortificate con trincee e filo spinato.";
      if (step === 7) return "Autunno 1940: durante la campagna contro la Grecia, Zara funge da base di spionaggio e osservazione delle mosse jugoslave; i cittadini subiscono il razionamento e l'allerta militare permanente.";
      return "Aprile 1941: con l'invasione della Jugoslavia da parte dell'Asse (6 aprile 1941), la guarnigione di Zara e le truppe della 2ª Armata rompono l'isolamento occupando la Dalmazia centrale; Mussolini istituisce il 'Governatorato di Dalmazia' annettendo Zara, Spalato e Cattaro al Regno d'Italia.";
    },
    getHistoricalName: (_step: number) => "Provincia di Zara",
    getAdminTitle: (_step: number) => "Provincia di Zara (Prefettura del Regno d'Italia)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "SASENO": {
    nuts: "SASENO",
    name: "Isola di Saseno",
    modernName: "Sazan / Saseno",
    historicalName: "Isola di Saseno",
    region: "Albania / Canale d'Otranto",
    keys: ["isola_di_saseno", "saseno", "sazan", "sazan__saseno"],
    s0_1: "Isolotto roccioso strategico situato all'imbocco della baia di Valona in Albania; riconosciuto possedimento sovrano italiano con il Trattato di Rapallo del 1920 e gli accordi italo-albanesi; trasformato in una piazzaforte militare interamente fortificata della Regia Marina a guardia del Canale d'Otranto.",
    s2_4: "1938-1939: Saseno ospita stazioni d'avvistamento semaforico, potenti fari, postazioni di cannoni in caverna e una base avanzata per motosiluranti MAS e idrovolanti; fondamentale trampolino logistico durante l'operazione di sbarco in Albania nell'aprile 1939.",
    s5: "Settembre 1939 - maggio 1940: durante la non belligeranza, l'isola funge da perno per il controllo di ogni traffico mercantile che attraversa il Canale d'Otranto verso l'Adriatico.",
    s6: "Giugno 1940: entrata in guerra; la guarnigione militare e i reparti MILMART di Saseno controllano il transito delle navi e respingono con le batterie costiere i tentativi di avvicinamento navale britannico.",
    s7: "Autunno 1940: durante la disastrosa campagna di Grecia, Saseno è vitale per garantire la sicurezza dell'accesso navale alla baia di Valona, dove sbarcano giorno e notte i rinforzi e le munizioni del Regio Esercito.",
    s8: "Primavera 1941: Saseno mantiene il suo ruolo di baluardo inespugnabile della Regia Marina nel Basso Adriatico, proteggendo le rotte convogli che alimentano la controffensiva vittoriosa dell'Asse nei Balcani.",
    getNote: (step: number) => {
      if (step <= 1) return "Isolotto roccioso strategico situato all'imbocco della baia di Valona in Albania; riconosciuto possedimento sovrano italiano con il Trattato di Rapallo del 1920 e gli accordi italo-albanesi; trasformato in una piazzaforte militare interamente fortificata della Regia Marina a guardia del Canale d'Otranto.";
      if (step <= 4) return "1938-1939: Saseno ospita stazioni d'avvistamento semaforico, potenti fari, postazioni di cannoni in caverna e una base avanzata per motosiluranti MAS e idrovolanti; fondamentale trampolino logistico durante l'operazione di sbarco in Albania nell'aprile 1939.";
      if (step === 5) return "Settembre 1939 - maggio 1940: durante la non belligeranza, l'isola funge da perno per il controllo di ogni traffico mercantile che attraversa il Canale d'Otranto verso l'Adriatico.";
      if (step === 6) return "Giugno 1940: entrata in guerra; la guarnigione militare e i reparti MILMART di Saseno controllano il transito delle navi e respingono con le batterie costiere i tentativi di avvicinamento navale britannico.";
      if (step === 7) return "Autunno 1940: durante la disastrosa campagna di Grecia, Saseno è vitale per garantire la sicurezza dell'accesso navale alla baia di Valona, dove sbarcano giorno e notte i rinforzi e le munizioni del Regio Esercito.";
      return "Primavera 1941: Saseno mantiene il suo ruolo di baluardo inespugnabile della Regia Marina nel Basso Adriatico, proteggendo le rotte convogli che alimentano la controffensiva vittoriosa dell'Asse nei Balcani.";
    },
    getHistoricalName: (_step: number) => "Isola di Saseno",
    getAdminTitle: (_step: number) => "Comando Militare Marittimo dell'Isola di Saseno (Regno d'Italia)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "SI038": {
    nuts: "SI038",
    name: "Circondario di Postumia (Provincia di Trieste)",
    modernName: "Primorsko-notranjska / Postumia",
    historicalName: "Circondario di Postumia (Provincia di Trieste)",
    region: "Venezia Giulia",
    keys: ["circondario_di_postumia_provincia_di_trieste", "postumia", "postumia_trieste", "primorsko_notranjska", "primorsko_notranjska__postumia", "si038"],
    s0_1: "Territorio carsico di confine annesso all'Italia con il Trattato di Rapallo del 1920 (compreso nella provincia di Trieste); celebre per le Grotte di Postumia (all'epoca visitate da centinaia di migliaia di turisti e dotate di trenino elettrico) e per la stazione ferroviaria internazionale di frontiera di Postumia Grotte.",
    s2_4: "1938-1939: cardine del Vallo Alpino Orientale, con una fitta rete di fortificazioni sotterranee scavate nelle doline e nelle caverne carsiche; la ferrovia Trieste-Lubiana funge da arteria diplomatica e commerciale con l'Europa centrale.",
    s5: "Settembre 1939 - maggio 1940: durante la non belligeranza, le opere corazzate del Vallo Alpino a Postumia e San Pietro del Carso sono presidiate giorno e notte dai battaglioni della Guardia alla Frontiera.",
    s6: "Giugno 1940: dichiarazione di guerra; il confine di Postumia è sbarrato e militarizzato; le Grotte di Postumia vengono utilizzate in parte come depositi sicuri di carburanti e materiali bellici della Regia Marina e dell'Esercito.",
    s7: "Autunno 1940: la frontiera carsica rimane tesa; transito continuo di treni merci e rifornimenti tra l'Italia e la Germania attraverso i valichi alpini orientali.",
    s8: "Aprile 1941: scatta l'invasione della Jugoslavia; dal varco di Postumia le colonne corazzate e motorizzate italiane del generale Vittorio Ambrosio (2ª Armata) muovono all'attacco conquistando Lubiana in pochi giorni e aprendo la strada verso Zagabria.",
    getNote: (step: number) => {
      if (step <= 1) return "Territorio carsico di confine annesso all'Italia con il Trattato di Rapallo del 1920 (compreso nella provincia di Trieste); celebre per le Grotte di Postumia (all'epoca visitate da centinaia di migliaia di turisti e dotate di trenino elettrico) e per la stazione ferroviaria internazionale di frontiera di Postumia Grotte.";
      if (step <= 4) return "1938-1939: cardine del Vallo Alpino Orientale, con una fitta rete di fortificazioni sotterranee scavate nelle doline e nelle caverne carsiche; la ferrovia Trieste-Lubiana funge da arteria diplomatica e commerciale con l'Europa centrale.";
      if (step === 5) return "Settembre 1939 - maggio 1940: durante la non belligeranza, le opere corazzate del Vallo Alpino a Postumia e San Pietro del Carso sono presidiate giorno e notte dai battaglioni della Guardia alla Frontiera.";
      if (step === 6) return "Giugno 1940: dichiarazione di guerra; il confine di Postumia è sbarrato e militarizzato; le Grotte di Postumia vengono utilizzate in parte come depositi sicuri di carburanti e materiali bellici della Regia Marina e dell'Esercito.";
      if (step === 7) return "Autunno 1940: la frontiera carsica rimane tesa; transito continuo di treni merci e rifornimenti tra l'Italia e la Germania attraverso i valichi alpini orientali.";
      return "Aprile 1941: scatta l'invasione della Jugoslavia; dal varco di Postumia le colonne corazzate e motorizzate italiane del generale Vittorio Ambrosio (2ª Armata) muovono all'attacco conquistando Lubiana in pochi giorni e aprendo la strada verso Zagabria.";
    },
    getHistoricalName: (_step: number) => "Circondario di Postumia (Provincia di Trieste)",
    getAdminTitle: (_step: number) => "Circondario di Postumia (Provincia di Trieste)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
  "SI043": {
    nuts: "SI043",
    name: "Provincia di Gorizia Orientale (Isonzo, Tolmino, Idria)",
    modernName: "Goriška / Gorizia Orientale",
    historicalName: "Provincia di Gorizia Orientale (Isonzo, Tolmino, Idria)",
    region: "Venezia Giulia",
    keys: ["gorika", "gorika__gorizia_orientale", "gorizia_orientale", "gorizia_orientale_isonzo_tolmino_idria", "provincia_di_gorizia_orientale_isonzo_tolmino_idria", "si043"],
    s0_1: "Territorio della Venezia Giulia storica annesso all'Italia nel 1918-1920; comprende l'alta e media valle dell'Isonzo (Tolmino, Caporetto, Plezzo) e le famose miniere statali di mercurio di Idria (tra le più ricche al mondo).",
    s2_4: "1938-1939: le miniere di mercurio di Idria forniscono cinabro e fulminato per la produzione di inneschi bellici per l'Italia fascista e la Germania; lungo il confine con la Jugoslavia viene edificato il massiccio sistema fortificato del Vallo Alpino Orientale.",
    s5: "Settembre 1939 - maggio 1940: durante la non belligeranza, i bunker e le opere corazzate del Vallo Alpino lungo il Monte Nero e le gole dell'Isonzo sono presidiati dalla Guardia alla Frontiera (GaF).",
    s6: "Giugno 1940: entrata in guerra; le postazioni fortificate dell'Isonzo mantengono la massima vigilanza al confine jugoslavo; la produzione di mercurio a Idria è militarizzata con la massima priorità industriale.",
    s7: "Autunno 1940: le truppe alpine e confinarie dell'Isonzo sono mantenute a presidio della frontiera per scoraggiare qualsiasi mossa del Regno di Jugoslavia; rigide misure di polizia e italianizzazione forzata sulla popolazione slovena locale.",
    s8: "Aprile 1941: 6 aprile 1941, le divisioni del Regio Esercito varcano il confine dall'Isonzo e da Idria avanzando rapidamente verso Lubiana; con l'annessione della Provincia di Lubiana all'Italia, il territorio dell'alta valle dell'Isonzo cessa di essere zona di frontiera.",
    getNote: (step: number) => {
      if (step <= 1) return "Territorio della Venezia Giulia storica annesso all'Italia nel 1918-1920; comprende l'alta e media valle dell'Isonzo (Tolmino, Caporetto, Plezzo) e le famose miniere statali di mercurio di Idria (tra le più ricche al mondo).";
      if (step <= 4) return "1938-1939: le miniere di mercurio di Idria forniscono cinabro e fulminato per la produzione di inneschi bellici per l'Italia fascista e la Germania; lungo il confine con la Jugoslavia viene edificato il massiccio sistema fortificato del Vallo Alpino Orientale.";
      if (step === 5) return "Settembre 1939 - maggio 1940: durante la non belligeranza, i bunker e le opere corazzate del Vallo Alpino lungo il Monte Nero e le gole dell'Isonzo sono presidiati dalla Guardia alla Frontiera (GaF).";
      if (step === 6) return "Giugno 1940: entrata in guerra; le postazioni fortificate dell'Isonzo mantengono la massima vigilanza al confine jugoslavo; la produzione di mercurio a Idria è militarizzata con la massima priorità industriale.";
      if (step === 7) return "Autunno 1940: le truppe alpine e confinarie dell'Isonzo sono mantenute a presidio della frontiera per scoraggiare qualsiasi mossa del Regno di Jugoslavia; rigide misure di polizia e italianizzazione forzata sulla popolazione slovena locale.";
      return "Aprile 1941: 6 aprile 1941, le divisioni del Regio Esercito varcano il confine dall'Isonzo e da Idria avanzando rapidamente verso Lubiana; con l'annessione della Provincia di Lubiana all'Italia, il territorio dell'alta valle dell'Isonzo cessa di essere zona di frontiera.";
    },
    getHistoricalName: (_step: number) => "Provincia di Gorizia Orientale (Isonzo, Tolmino, Idria)",
    getAdminTitle: (_step: number) => "Provincia di Gorizia (Circondari Orientali di Tolmino e Idria)",
    getSovereign: (_step: number) => "Regno d'Italia",
    getFaction: (_step: number): FactionType => "Asse"
  },
};

/**
 * Risolve dinamicamente un territorio o provincia italiana per ID o toponimo.
 */
export function resolveItalyProvince(
  idOrName: string,
  step: number = 0,
  rawName?: string
): ResolvedTerritory | null {
  if (!idOrName) return null;
  const s = Math.min(8, Math.max(0, step));
  const rawClean = (rawName || '').trim();
  const cleanId = idOrName.trim();
  const normId = cleanId.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const normRaw = rawClean.toLowerCase().replace(/[^a-z0-9]/g, '_');

  // 1. Match diretto per NUTS-3 o ID
  let meta = IT_PROVINCES_META[cleanId] || IT_PROVINCES_META[cleanId.toUpperCase()];

  // 2. Match per chiave normalizzata nel dizionario
  if (!meta) {
    for (const item of Object.values(IT_PROVINCES_META)) {
      if (
        item.keys.includes(normId) ||
        (normRaw && item.keys.includes(normRaw)) ||
        normId === item.nuts.toLowerCase() ||
        normRaw === item.nuts.toLowerCase()
      ) {
        meta = item;
        break;
      }
    }
  }

  // 3. Fallback per toponimo parziale o prefisso
  if (!meta) {
    for (const item of Object.values(IT_PROVINCES_META)) {
      const lowerMod = item.modernName.toLowerCase();
      const lowerHist = item.historicalName.toLowerCase();
      if (
        (rawClean && (lowerMod.includes(rawClean.toLowerCase()) || rawClean.toLowerCase().includes(lowerMod))) ||
        (rawClean && (lowerHist.includes(rawClean.toLowerCase()) || rawClean.toLowerCase().includes(lowerHist))) ||
        lowerMod.includes(cleanId.toLowerCase()) ||
        cleanId.toLowerCase().includes(lowerMod)
      ) {
        meta = item;
        break;
      }
    }
  }

  if (!meta) return null;

  return makeResult(
    'ITA',
    meta.getHistoricalName(s),
    meta.getNote(s),
    meta.getFaction(s),
    meta.getAdminTitle(s)
  );
}

/**
 * Popola il dizionario toponomastico storico con le 115 entita provinciali del Regno d'Italia e Possedimenti.
 */
export function populateItalyToponyms(dict: Record<string, any>): void {
  if (!dict['IT']) dict['IT'] = {};
  if (!dict['ITA']) dict['ITA'] = {};

  for (const [key, item] of Object.entries(IT_PROVINCES_META)) {
    const match = {
      historicalName: item.historicalName,
      adminTitle: item.getAdminTitle(0),
      historicalNote: item.s0_1,
      name: item.name,
      modernName: item.modernName,
      region: item.region,
      note: item.s0_1,
      dynamicNote: (step: number) => item.getNote(step),
    };

    const normName = item.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const lowId = item.nuts.toLowerCase().replace(/[^a-z0-9]/g, '_');

    dict['IT'][normName] = match;
    dict['IT'][lowId] = match;
    dict['ITA'][normName] = match;
    dict['ITA'][lowId] = match;
    dict[lowId] = match;
    dict[normName] = match;

    for (const k of item.keys) {
      dict['IT'][k] = match;
      dict['ITA'][k] = match;
      dict[k] = match;
    }
  }
}
