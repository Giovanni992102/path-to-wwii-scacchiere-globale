/**
 * Dettaglio Geocartografico Storico delle 33 Province e Territori della Corea / Chōsen (1936-1941)
 *
 * Copertura integrale di tutte le 33 province, città metropolitane e distretti a nord e a sud del 38° parallelo:
 * - Sovranità: Impero del Grande Giappone (Dai Nippon Teikoku)
 * - Amministrazione coloniale: Governo Generale di Chōsen (Chōsen Sōtokufu / 朝鮮総督府)
 * - Fazione: Asse
 * - Sede del Governatore Generale: Keijō (Seoul) — Palazzo del Governo Generale (Costruito davanti al Gyeongbokgung)
 * - Governatori Generali d'Epoca:
 *     * Ugaki Kazushige (1931 - agosto 1936): campagna di revitalizzazione rurale e prima industrializzazione.
 *     * Minami Jirō (agosto 1936 - maggio 1942): militarizzazione integrale, legge di mobilitazione nazionale,
 *       politica di assimilazione forzata Kōminka (Giuramento dei Sudditi Imperiali, obbligo del giapponese,
 *       decreto Sōshi-kaimei per il cambio forzato dei cognomi, shintoizzazione obbligatoria e coscrizione del lavoro Chōyōrei).
 *
 * Dinamica Temporale (Step 0-8):
 * - Step 0-1 (1936: Anteguerra): Revitalizzazione rurale, industrializzazione idroelettrica e chimica al nord,
 *   censura della bandiera coreana sul maratoneta olimpico Sohn Kee-chung (agosto 1936), passaggio a Minami Jirō.
 * - Step 2-4 (1937-1938: Seconda Guerra Sino-Giapponese): Luglio 1937 ponte di Marco Polo; la Corea diventa la
 *   retrovia logistica e l'arsenale dell'Armata del Kwantung e della Spedizione in Cina del Nord; Giuramento dei
 *   Sudditi Imperiali (ottobre 1937); Legge di Mobilitazione Nazionale (aprile 1938); avvio della diga colossale di
 *   Sup'ung (Sui-hō) sullo Yalu; Battaglia del Lago Khasan (luglio-agosto 1938) al confine di Rason.
 * - Step 5-7 (1939-1940: Guerra in Europa & Kōminka): Coscrizione obbligatoria dei lavoratori coreani (Chōyōrei) per
 *   miniere e acciaierie; decreto Sōshi-kaimei (febbraio 1940: cambio dei cognomi); soppressione dei quotidiani coreani
 *   Dong-a Ilbo e Chosun Ilbo (agosto 1940); culto scintoista universale (Chōsen Jingū sul Monte Namsan).
 * - Step 8 (1941: Vigilia della Guerra del Pacifico): Patto di Neutralità Sovietico-Giapponese (aprile 1941) che
 *   mette in sicurezza la frontiera nord del Tumen; trasformazione in fortezza continentale autarchica; razionamento
 *   bellico di riso e combustibile; militarizzazione delle ferrovie, cantieri navali (Fusan, Chinkai) e chimica pesante (Hungnam).
 */

import { ResolvedTerritory, FactionType } from '../types';
import { makeResult } from './georesolver';

export interface KoreaProvinceInfo {
  id: string;
  origId?: string;
  cntrCode: string; // 'KR' o 'KP'
  cntrName: string; // 'Corea del Sud' o 'Corea del Nord'
  name: string;
  nutsName: string;
  nameLatn: string;
  nameEngl: string;
  modernName: string;
  historicalName: string;
  adminTitle: string;
  sovereign: string;
  overlord?: string;
  faction: FactionType;
  s0_1: string;
  s2_4: string;
  s5_7: string;
  s8: string;
  getNote: (step: number) => string;
  getHistoricalName?: (step: number) => string;
  getAdminTitle?: (step: number) => string;
  getSovereign?: (step: number) => string;
  getFaction?: (step: number) => FactionType;
}

export const KOREA_PROVINCES_META: Record<string, KoreaProvinceInfo> = {  "KR11": {
    id: "KR11",
    cntrCode: "KR",
    cntrName: "Corea del Sud",
    name: "Seoul",
    nutsName: "Seoul (Capitale della Corea del Sud)",
    nameLatn: "Keij\u014d / Gyeongseong",
    nameEngl: "Seoul Special City",
    modernName: "Citt\u00e0 Speciale di Seoul (Capitale della Repubblica di Corea)",
    historicalName: "Ch\u014dsen \u2014 Citt\u00e0 e Prefettura di Keij\u014d (Seoul)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Keij\u014d-fu (Sede Centrale del Governatore Generale in Corea)",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Keij\u014d (Seoul) \u00e8 la capitale coloniale e sede del Governo Generale di Ch\u014dsen (Ch\u014dsen S\u014dtokufu), insediato nel maestoso palazzo neoclassico eretto davanti al Palazzo Gyeongbokgung. Sotto il Governatore Generale Ugaki Kazushige (e dal tardo 1936 Minami Jir\u014d), la metropoli \u00e8 il centro della finanza coloniale (Banca di Ch\u014dsen), dei trasporti ferroviari e dell'istruzione d'\u00e9lite presso l'Universit\u00e0 Imperiale di Keij\u014d (Keij\u014d Teikoku Daigaku).",
    s2_4: "Con lo scoppio della Seconda Guerra Sino-Giapponese (luglio 1937), Keij\u014d diviene il centro di coordinamento strategico verso il fronte cinese e la Manciuria. Nelle scuole e negli uffici pubblici viene imposta la recitazione quotidiana del Giuramento dei Sudditi Imperiali (K\u014dkoku Shinmin no Seishi) e l'omaggio scintoista obbligatorio al monumentale santuario Ch\u014dsen Jing\u016b sul monte Namsan.",
    s5_7: "Nel febbraio 1940 entra in vigore il decreto S\u014dshi-kaimei, che obbliga la popolazione coreana a cambiare i propri cognomi tradizionali con nomi di famiglia giapponesi; ad agosto il governo coloniale sopprime d'autorit\u00e0 i quotidiani storici in lingua coreana Dong-a Ilbo e Chosun Ilbo, imponendo il monopolio della stampa filo-governativa del Keij\u014d Nipp\u014d.",
    s8: "Alla vigilia della Guerra del Pacifico, Keij\u014d \u00e8 integralmente mobilitata: ferreo razionamento del riso, coscrizione dei giovani come studenti-volontari e sorveglianza capillare della polizia politica (Tokk\u014d) per stroncare ogni forma di resistenza clandestina o indipendentista.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KR28": {
    id: "KR28",
    cntrCode: "KR",
    cntrName: "Corea del Sud",
    name: "Incheon",
    nutsName: "Incheon (Jinsen / Chemulpo)",
    nameLatn: "Jinsen / Chemulpo",
    nameEngl: "Incheon Metropolitan City",
    modernName: "Citt\u00e0 Metropolitana di Incheon (Porto di Seoul, Corea del Sud)",
    historicalName: "Ch\u014dsen \u2014 Citt\u00e0 Portuale di Jinsen (Incheon / Chemulpo)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Keiki-d\u014d \u2014 Jinsen-fu (Porto Marittimo Strategico del Mar Giallo)",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Jinsen (Incheon), storico porto di Chemulpo, \u00e8 il principale scalo marittimo della provincia di Keiki sul Mar Giallo, collegato a Keij\u014d dalla storica ferrovia Gyeongin (prima linea della penisola, 1899). Dotato di bacini a marea e banchine commerciali moderne, gestisce le importazioni di macchinari e l'esportazione di riso.",
    s2_4: "Dallo scoppio delle ostilit\u00e0 in Cina (1937), il porto di Jinsen opera ininterrottamente come punto d'imbarco primario per convogli di munizioni, provviste e rincalzi diretti verso i porti cinesi occupati di Tanggu (Tianjin), Tsingtao e Shanghai.",
    s5_7: "Espansione dei cantieri navali minori e dei depositi di carburante; la baia di Jinsen viene inserita nelle rotte pattugliate dalla Marina Imperiale Giapponese e sottoposta a misure di oscuramento notturno.",
    s8: "Jinsen funge da terminale controllato per l'imbarco di quote di lavoratori coreani mobilitati per le industrie minerarie e metallurgiche metropolitane in Giappone.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KR41_N": {
    id: "KR41_N",
    cntrCode: "KR",
    cntrName: "Corea del Sud",
    name: "Gyeonggi (Nord 38\u00b0 - Yeoncheon)",
    nutsName: "Gyeonggi Nord (Yeoncheon e Dongducheon)",
    nameLatn: "Keiki-d\u014d (Hokubu)",
    nameEngl: "North Gyeonggi Province (Yeoncheon sector, North of 38th Parallel)",
    modernName: "Distretto di Yeoncheon (Gyeonggi Settentrionale, Corea del Sud)",
    historicalName: "Ch\u014dsen \u2014 Keiki-d\u014d Settentrionale (Yeoncheon / Distretto dell'Imjin)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Keiki-d\u014d \u2014 Contee di Yeoncheon e Jangdan",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Settore settentrionale della provincia di Keiki situato a nord del 38\u00b0 parallelo, attraversato dal corso del fiume Imjin e dalla ferrovia strategica Gyeongwon (Keij\u014d-Genzan). Economia dominata da risaie vallive e cerealicoltura collinare.",
    s2_4: "La ferrovia Gyeongwon smista convogli ad alta frequenza per il trasporto di minerali ferrosi e legname provenienti dalla costa orientale di Wonsan verso i centri di raffinazione di Keij\u014d.",
    s5_7: "Applicazione inflessibile dei decreti di assimilazione e cambio dei nomi nei distretti rurali dell'Imjin; requisizione coatta delle riserve di cereali per i depositi dell'armata.",
    s8: "Snodo di retrovia fortificato lungo la via di comunicazione tra Keij\u014d e Genzan; la posizione a cavallo del 38\u00b0 parallelo ne far\u00e0 nel 1945 il confine conteso tra le zone d'occupazione sovietica e statunitense.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KR41_S": {
    id: "KR41_S",
    cntrCode: "KR",
    cntrName: "Corea del Sud",
    name: "Gyeonggi (Sud 38\u00b0 - Suwon)",
    nutsName: "Gyeonggi Sud (Suwon, Seongnam e Ansan)",
    nameLatn: "Keiki-d\u014d (Nambu)",
    nameEngl: "South Gyeonggi Province (Suwon sector, South of 38th Parallel)",
    modernName: "Provincia di Gyeonggi (Suwon e Area Metropolitana Sud, Corea del Sud)",
    historicalName: "Ch\u014dsen \u2014 Keiki-d\u014d Meridionale (Suwon / Fortezza di Hwaseong)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Keiki-d\u014d \u2014 Sede Provinciale di Suwon",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Sede dell'amministrazione provinciale di Keiki-d\u014d a Suwon, celebre per la grandiosa fortezza di Hwaseong e sede dell'Istituto Centrale di Ricerca Agraria coloniale; pianure ad altissima resa cerealicola.",
    s2_4: "Istituzione dei consorzi di mobilitazione agraria sotto la supervisione della Societ\u00e0 di Colonizzazione Orientale (T\u014dy\u014d Takushoku) per moltiplicare i carichi di riso diretti al fronte continentale.",
    s5_7: "Espansione delle manifatture tessili e delle industrie di supporto bellico nell'hinterland meridionale di Keij\u014d; installazione di campi d'aviazione ausiliari dell'Aviazione dell'Esercito.",
    s8: "Requisizione generalizzata delle scorte agricole e arruolamento forzato di braccianti agricoli per le fonderie e miniere della Corea settentrionale e del Giappone.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KR42_N": {
    id: "KR42_N",
    cntrCode: "KR",
    cntrName: "Corea del Sud",
    name: "Gangwon (Nord 38\u00b0 - Sokcho e Goseong)",
    nutsName: "Gangwon Nord (Sokcho, Goseong e Yangyang)",
    nameLatn: "K\u014dgen-d\u014d (T\u014dhokubu)",
    nameEngl: "North Gangwon Province (Sokcho and Goseong sector, North of 38th Parallel)",
    modernName: "Contee di Sokcho, Goseong e Yangyang (Gangwon Nord-Orientale, Corea del Sud)",
    historicalName: "Ch\u014dsen \u2014 K\u014dgen-d\u014d Nord-Orientale (Sokcho, Goseong e Monti Kumgang Meridionali)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 K\u014dgen-d\u014d \u2014 Distretto Costiero di Kansan e Yangyang",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Fascia litoranea orientale a nord del 38\u00b0 parallelo sul Mar del Giappone (Mar Orientale), dominata dai contrafforti dei Monti Taebaek e dall'accesso meridionale ai Monti Kumgang (Diamante); economia incentrata su pesca e silvicoltura.",
    s2_4: "Intensificazione dell'estrazione di ferro e tungsteno nella miniera di Yangyang, materie prime di massimo valore per le leghe corazzate dell'industria bellica imperiale.",
    s5_7: "Presidio litoraneo della gendarmeria navale per sorvegliare il traffico marittimo sovietico; imposizione della lingua giapponese e cambio forzato dei cognomi tra i pescatori e minatori locali.",
    s8: "Militarizzazione della costa con batterie d'avvistamento e postazioni di difesa contraerea a protezione della linea ferroviaria Donghae Bukbu in costruzione verso Wonsan.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KR42_S": {
    id: "KR42_S",
    cntrCode: "KR",
    cntrName: "Corea del Sud",
    name: "Gangwon (Sud 38\u00b0 - Chuncheon e Gangneung)",
    nutsName: "Gangwon Sud (Chuncheon, Gangneung e Wonju)",
    nameLatn: "K\u014dgen-d\u014d (Nambu)",
    nameEngl: "South Gangwon Province (Chuncheon and Gangneung sector, South of 38th Parallel)",
    modernName: "Provincia di Gangwon (Chuncheon, Gangneung e Wonju, Corea del Sud)",
    historicalName: "Ch\u014dsen \u2014 K\u014dgen-d\u014d Meridionale (Capoluogo Provinciale di Shunsan / Chuncheon)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 K\u014dgen-d\u014d \u2014 Sede del Governatore Provinciale a Shunsan",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Sede del governo provinciale di K\u014dgen-d\u014d a Shunsan (Chuncheon), nel bacino fluviale del Bukhangang, con Gangneung centro principale della costa orientale; territorio montuoso ricco di fitte foreste e bacini idrici.",
    s2_4: "Avvio di grandi rilievi idroelettrici lungo il corso del fiume Han e dei suoi affluenti montani per alimentare le crescenti richieste energetiche della capitale Keij\u014d.",
    s5_7: "Sfruttamento intensivo delle risorse boschive per legname da puntellamento minerario e carpenteria navale; requisizione dei raccolti collinari di soia e granoturco.",
    s8: "Presidio fortificato dei valichi montani tra i versanti orientale e occidentale dei Monti Taebaek e sorveglianza costiera contro infiltrazioni via mare.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KR43": {
    id: "KR43",
    cntrCode: "KR",
    cntrName: "Corea del Sud",
    name: "North Chungcheong",
    nutsName: "Chungcheongbuk-do (Cheongju e Chungju)",
    nameLatn: "Ch\u016bsei-hokud\u014d",
    nameEngl: "North Chungcheong Province",
    modernName: "Provincia del Chungcheong Settentrionale (Cheongju e Chungju, Corea del Sud)",
    historicalName: "Ch\u014dsen \u2014 Ch\u016bsei-hokud\u014d (Cheongju e Bacino del Fiume Namhan)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Ch\u016bsei-hokud\u014d \u2014 Sede Provinciale di Seish\u016b",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Unica provincia interamente priva di sbocco al mare della penisola, con capoluogo a Seish\u016b (Cheongju); rinomata per la coltivazione del tabacco, la gelsicoltura per la seta greggia e le miniere d'oro e fluorite di Chungju.",
    s2_4: "Potenziamento dell'estrazione della fluorite (fondente indispensabile per la siderurgia dell'acciaio) e della grafite, spedite per ferrovia verso i porti d'imbarco meridionali.",
    s5_7: "Rigida esecuzione del programma S\u014dshi-kaimei nelle comunit\u00e0 agricole dell'entroterra; requisizione sistematica di campane di bronzo, pentole e utensili domestici per il riciclo di metalli bellici.",
    s8: "Controllo serrato dell'ammasso cerealicolo e presidio delle direttrici stradali interne che connettono Keij\u014d alle province meridionali di Gyeongsang e Jeolla.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KR44": {
    id: "KR44",
    cntrCode: "KR",
    cntrName: "Corea del Sud",
    name: "South Chungcheong",
    nutsName: "Chungcheongnam-do (Hongseong, Gongju e Cheonan)",
    nameLatn: "Ch\u016bsei-nand\u014d",
    nameEngl: "South Chungcheong Province",
    modernName: "Provincia del Chungcheong Meridionale (Hongseong, Gongju e Cheonan, Corea del Sud)",
    historicalName: "Ch\u014dsen \u2014 Ch\u016bsei-nand\u014d (Gongju, Cheonan e Costa Occidentale)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Ch\u016bsei-nand\u014d \u2014 Uffici di Hongseong e Cheonan",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Culla dell'antico regno di Baekje (Gongju, Buyeo); provincia costiera pianeggiante affacciata sul Mar Giallo, contraddistinta da un'agricoltura cerealicola intensiva e dalla coltivazione del cotone a fibra americana.",
    s2_4: "Piani speciali per massimizzare la produzione di cotone greggio per il rifornimento dei lanifici e cotonifici che producono uniformi e bendaggi per l'esercito imperiale.",
    s5_7: "Espansione dei bacini d'irrigazione e ammasso forzoso sotto il controllo diretto dei gendarmi coloniali (Kenpeitai); repressione delle sette religiose tradizionali (Chondogyo).",
    s8: "Zona di riserva alimentare strategica integrata nei piani autarchici di rifornimento della metropoli nipponica sotto assedio economico.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KR30": {
    id: "KR30",
    cntrCode: "KR",
    cntrName: "Corea del Sud",
    name: "Daejeon",
    nutsName: "Daejeon (Taiden)",
    nameLatn: "Taiden-fu",
    nameEngl: "Daejeon Metropolitan City",
    modernName: "Citt\u00e0 Metropolitana di Daejeon (Snodo Ferroviario Centrale, Corea del Sud)",
    historicalName: "Ch\u014dsen \u2014 Citt\u00e0 e Snodo Ferroviario di Taiden (Daejeon)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Ch\u016bsei-nand\u014d \u2014 Sede del Governatore Provinciale a Taiden",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Taiden (Daejeon) \u00e8 il pi\u00f9 importante bivio ferroviario della Corea centrale, dove la linea principale Gyeongbu (Keij\u014d-Fusan) si connette alla linea Honam (verso Mokpo e Yeosu). Designata sede provinciale di Ch\u016bsei-nand\u014d nel 1932, conosce una rapida urbanizzazione nipponica.",
    s2_4: "Con l'espansione della guerra in Cina, lo scalo ferroviario di Taiden smista giorno e notte convogli di truppe, cannoni e rifornimenti diretti ai porti d'imbarco meridionali di Fusan e Moppo.",
    s5_7: "Costruzione di grandi officine di riparazione materiale rotabile e depositi militari di carburante ferroviario; militarizzazione dei macchinisti e del personale delle ferrovie (Ch\u014dsen Tetsud\u014d).",
    s8: "Nodo logistico ad alta sicurezza, sorvegliato militarmente per prevenire qualsiasi sabotaggio alle linee telegrafiche e ferroviarie tra nord e sud della penisola.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KR50": {
    id: "KR50",
    cntrCode: "KR",
    cntrName: "Corea del Sud",
    name: "Sejong",
    nutsName: "Sejong (Yeongi / Chochiwon)",
    nameLatn: "Yeongi / Chochiwon",
    nameEngl: "Sejong Special Self-Governing City",
    modernName: "Citt\u00e0 Autonoma Speciale di Sejong (Citt\u00e0 Ministeriale, Corea del Sud)",
    historicalName: "Ch\u014dsen \u2014 Contea Rurale di Yeongi e Stazione di Chochiwon",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Ch\u016bsei-nand\u014d \u2014 Contea di Yeongi (Snodo di Chochiwon)",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Distretto rurale imperniato sulla cittadina di Chochiwon, strategica stazione ferroviaria di raccordo della linea Gyeongbu che serve le valli agricole tra Cheongju e Gongju.",
    s2_4: "Piattaforma di raccolta del riso delle valli del fiume Geum e snodo di smistamento della manodopera agricola stagionale.",
    s5_7: "Integrazione forzata dei coltivatori nell'Associazione di Mobilitazione dello Spirito Nazionale (Kokumin Seishin S\u014dd\u014din); confisca periodica dei surplus agricoli.",
    s8: "Area agricola protetta e pacificata, utilizzata per lo stoccaggio decentrato di vettovaglie lontano dalle coste vulnerabili.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KR45": {
    id: "KR45",
    cntrCode: "KR",
    cntrName: "Corea del Sud",
    name: "North Jeolla",
    nutsName: "Jeollabuk-do (Jeonju, Gunsan e Iksan)",
    nameLatn: "Zenra-hokud\u014d",
    nameEngl: "North Jeolla Province",
    modernName: "Provincia del Jeolla Settentrionale (Jeonju, Gunsan e Iksan, Corea del Sud)",
    historicalName: "Ch\u014dsen \u2014 Zenra-hokud\u014d (Pianure di Honam, Jeonju e Porto di Kunsan)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Zenra-hokud\u014d \u2014 Sede Provinciale di Zensh\u016b & Porto di Kunsan",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Capoluogo a Zensh\u016b (Jeonju), con il porto fluviale-marittimo di Kunsan (Gunsan) specializzato nell'esportazione del riso delle pianure di Honam verso Osaka e Tokyo; massiccia presenza di magazzini e filiali di latifondisti giapponesi.",
    s2_4: "Intensificazione coatta della produzione risicola; ampliamento dei moli e dei silos di Kunsan per rifornire la flotta e l'armata impegnate nell'avanzata verso la Cina centrale.",
    s5_7: "Tensioni agrarie e sommovimenti contadini repressi dalla gendarmeria coloniale; rigida imposizione dell'omaggio scintoista e del cambio di cognome fra i fittavoli di Honam.",
    s8: "Il riso delle pianure di Zensh\u016b costituisce la primaria fonte di sussistenza calorica per sostenere l'arcipelago metropolitano di fronte all'embargo navale anglo-statunitense.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KR46": {
    id: "KR46",
    cntrCode: "KR",
    cntrName: "Corea del Sud",
    name: "South Jeolla",
    nutsName: "Jeollanam-do (Mokpo, Yeosu e Suncheon)",
    nameLatn: "Zenra-nand\u014d",
    nameEngl: "South Jeolla Province",
    modernName: "Provincia del Jeolla Meridionale (Mokpo, Yeosu e Suncheon, Corea del Sud)",
    historicalName: "Ch\u014dsen \u2014 Zenra-nand\u014d (Porti Marittimi di Moppo e Reisui)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Zenra-nand\u014d \u2014 Sede di K\u014dsh\u016b & Porti di Moppo e Reisui",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Regione litoranea sud-occidentale punteggiata da migliaia di isole (Arcipelago Dadohae); Moppo (Mokpo) \u00e8 il porto cardine per l'esportazione del cotone, mentre Reisui (Yeosu) \u00e8 il terminale della ferrovia Honam con traghetti rapidi verso Shimonoseki.",
    s2_4: "I porti di Moppo e Reisui convogliano battelli costieri e navi da carico per garantire i collegamenti logistici con le basi navali giapponesi nel Mar Cinese Orientale.",
    s5_7: "Militarizzazione degli stretti meridionali; fortificazione dei canali navigabili con punti d'avvistamento e postazioni d'artiglieria per la difesa dello Stretto di Corea.",
    s8: "Perno marittimo meridionale della penisola, vitale per il transito sicuro delle merci verso il Ky\u016bsh\u016b e il Mare Interno di Seto.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KR29": {
    id: "KR29",
    cntrCode: "KR",
    cntrName: "Corea del Sud",
    name: "Gwangju",
    nutsName: "Gwangju (K\u014dsh\u016b)",
    nameLatn: "K\u014dsh\u016b-fu",
    nameEngl: "Gwangju Metropolitan City",
    modernName: "Citt\u00e0 Metropolitana di Gwangju (Polo Culturale di Honam, Corea del Sud)",
    historicalName: "Ch\u014dsen \u2014 Citt\u00e0 Prefetturale di K\u014dsh\u016b (Gwangju)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Zenra-nand\u014d \u2014 Sede del Governatore Provinciale a K\u014dsh\u016b",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "K\u014dsh\u016b (Gwangju) \u00e8 il capoluogo amministrativo ed educativo del sud-ovest della penisola; segnata dal grande Movimento di Protesta Studentesca del 1929 contro la discriminazione coloniale, \u00e8 sorvegliata a vista dalla polizia coloniale.",
    s2_4: "La Polizia Superiore di Sicurezza (K\u014dt\u014d Keisatsu) mantiene controlli inflessibili su accademie, scuole superiori e seminari cristiani per prevenire la rinascita di cellule clandestine patriottiche.",
    s5_7: "Obbligo perentorio per studenti e docenti di compiere il rito scintoista; epurazione degli intellettuali dissidenti che rifiutano l'assimilazione linguistica e il cambio del nome.",
    s8: "Centro di comando della circoscrizione militare e reclutamento per i Corpi Speciali di Volontari Coreani integrati nell'Esercito Imperiale Giapponese.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KR47": {
    id: "KR47",
    cntrCode: "KR",
    cntrName: "Corea del Sud",
    name: "North Gyeongsang",
    nutsName: "Gyeongsangbuk-do (Andong, Gyeongju e Pohang)",
    nameLatn: "Keish\u014d-hokud\u014d",
    nameEngl: "North Gyeongsang Province",
    modernName: "Provincia del Gyeongsang Settentrionale (Pohang, Gyeongju e Andong, Corea del Sud)",
    historicalName: "Ch\u014dsen \u2014 Keish\u014d-hokud\u014d (Pohang, Capitale Antica di Gyeongju e Isola di Ulleungdo)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Keish\u014d-hokud\u014d \u2014 Distretto di H\u014dk\u014d e Andong",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Culla storica dell'antico regno di Silla (Gyeongju) e roccaforte dell'aristocrazia confuciana yangban ad Andong; il porto di H\u014dk\u014d (Pohang) funge da scalo per il Mar del Giappone e l'isola di Utsury\u014d-t\u014d (Ulleungdo).",
    s2_4: "Ampliamento della ferrovia Donghae per collegare i centri minerari costieri; controllo rigido sui lignaggi aristocratici tradizionali di Andong per prevenire fronde conservatrici.",
    s5_7: "Mobilitazione coatta di minatori e boscaioli per le industrie strategiche; ampliamento delle cisterne di nafta e delle installazioni di rifornimento navale a Pohang.",
    s8: "Porto di protezione e smistamento per i convogli marittimi che attraversano il Mar del Giappone verso i porti dell'Honshu occidentale (Niigata e Tsuruga).",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KR27": {
    id: "KR27",
    cntrCode: "KR",
    cntrName: "Corea del Sud",
    name: "Daegu",
    nutsName: "Daegu (Taiky\u016b)",
    nameLatn: "Taiky\u016b-fu",
    nameEngl: "Daegu Metropolitan City",
    modernName: "Citt\u00e0 Metropolitana di Daegu (Polo Industriale e Tessile, Corea del Sud)",
    historicalName: "Ch\u014dsen \u2014 Citt\u00e0 e Grande Mercato di Taiky\u016b (Daegu)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Keish\u014d-hokud\u014d \u2014 Sede del Governatore Provinciale a Taiky\u016b",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Taiky\u016b (Daegu) \u00e8 la terza metropoli della Corea, sede del governo provinciale di Keish\u014d-hokud\u014d e capitale dell'industria tessile serica e cotoniera, nonch\u00e9 sede del celebre mercato secolare delle erbe medicinali (Yangnyeongsi).",
    s2_4: "Riconversione degli stabilimenti tessili alla produzione ininterrotta di uniformi, buffetterie e teli da campo per l'armata giapponese impegnata sul continente cinese.",
    s5_7: "Istituzione delle brigate di lavoro femminile e giovanile; fondazione di consorzi industriali misti per le commesse delle forze armate.",
    s8: "Roccaforte logistica interna sulla direttrice Keij\u014d-Fusan, dotata di campi d'aviazione ausiliari nel sicuro bacino vallivo circondato da catene montuose.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KR48": {
    id: "KR48",
    cntrCode: "KR",
    cntrName: "Corea del Sud",
    name: "South Gyeongsang",
    nutsName: "Gyeongsangnam-do (Jinju, Masan e Jinhae)",
    nameLatn: "Keish\u014d-nand\u014d",
    nameEngl: "South Gyeongsang Province",
    modernName: "Provincia del Gyeongsang Meridionale (Jinju, Changwon, Masan e Jinhae, Corea del Sud)",
    historicalName: "Ch\u014dsen \u2014 Keish\u014d-nand\u014d (Base Navale Imperiale di Chinkai e Masan)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Keish\u014d-nand\u014d \u2014 Distretto di Guardia Navale di Chinkai (Chinkai Keibifu)",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Sede a Chinkai (Jinhae) del Chinkai Keibifu (Distretto di Guardia Navale di Chinkai), la base e arsenale navale supremo della Marina Imperiale Giapponese nella penisola; porto commerciale a Masan (Masan-fu).",
    s2_4: "Chinkai presidia il passaggio strategico dello Stretto di Corea (Tsushima): cacciatorpediniere, sommergibili costieri e idrovolanti pattugliano costantemente le rotte tra Giappone, Corea e Cina.",
    s5_7: "Espansione dei bacini di carenaggio, depositi siluri e bunker sotterranei a Chinkai; distillerie di alcol industriale e scatolifici a Masan per le razioni militari (K-Rations nipponiche).",
    s8: "Fortezza navale di massimo allarme, difesa da possenti batterie costiere e sbarramenti minati a protezione dell'accesso continentale contro incursioni nemiche.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KR26": {
    id: "KR26",
    cntrCode: "KR",
    cntrName: "Corea del Sud",
    name: "Busan",
    nutsName: "Busan (Fusan)",
    nameLatn: "Fusan-fu",
    nameEngl: "Busan Metropolitan City",
    modernName: "Citt\u00e0 Metropolitana di Busan (Primo Porto della Corea del Sud)",
    historicalName: "Ch\u014dsen \u2014 Citt\u00e0 e Grande Porto d'Oltremare di Fusan (Busan)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Keish\u014d-nand\u014d \u2014 Sede del Governatore Provinciale & Porto di Fusan",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Fusan (Busan) \u00e8 il capolinea della ferrovia transcontinentale asiatica e il porto assoluto di collegamento con il Giappone metropolitano. Il traghetto veloce Kampu Renrakusen garantisce traversate giornaliere bisettimanali per Shimonoseki in sole otto ore.",
    s2_4: "Porto di transito bellico gigantesco: da Fusan transitano centinaia di migliaia di soldati dell'Esercito Imperiale e treni merci carichi di munizioni pesanti diretti verso Pechino, Mukden e Nanchino.",
    s5_7: "Molo di partenza forzata per centinaia di migliaia di lavoratori e minatori coreani mobilitati per i bacini carboniferi di Fukuoka e le acciaierie di Yawata sotto la legge Ch\u014dy\u014drei.",
    s8: "Area militare fortificata ad accesso ristretto, protetta da cortine fumogene, postazioni contraeree e reti parasiluri; snodo logistico insostituibile per l'intero impero nipponico.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KR31": {
    id: "KR31",
    cntrCode: "KR",
    cntrName: "Corea del Sud",
    name: "Ulsan",
    nutsName: "Ulsan (Urusan)",
    nameLatn: "Urusan",
    nameEngl: "Ulsan Metropolitan City",
    modernName: "Citt\u00e0 Metropolitana di Ulsan (Polo Siderurgico e Petrolchimico, Corea del Sud)",
    historicalName: "Ch\u014dsen \u2014 Porto Costiero e Scalo Peschereccio di Urusan (Ulsan)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Keish\u014d-nand\u014d \u2014 Contea e Baia di Urusan",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Urusan (Ulsan) \u00e8 un porto peschereccio e la capitale della caccia alla balena nel Mar del Giappone, con le stazioni baleniere di Jangsaengpo gestite da compagnie nipponiche.",
    s2_4: "L'olio di balena e i grassi industriali lavorati a Urusan vengono requisiti per la lubrificazione di motori d'aereo e meccanismi d'artiglieria di precisione.",
    s5_7: "Primi lavori di bonifica della rada per depositi carburanti navali e stazioni di guardia costiera ausiliaria.",
    s8: "Rada costiera protetta per l'ancoraggio di convogli mercantili lungo la rotta marittima tra Fusan e la costa nord-orientale della penisola.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KR49": {
    id: "KR49",
    cntrCode: "KR",
    cntrName: "Corea del Sud",
    name: "Jeju",
    nutsName: "Jeju (Saish\u016b-t\u014d / Quelpart)",
    nameLatn: "Saish\u016b-t\u014d / Quelpart",
    nameEngl: "Jeju Special Self-Governing Province",
    modernName: "Provincia Autonoma Speciale di Jeju (Isola di Jeju, Corea del Sud)",
    historicalName: "Ch\u014dsen \u2014 Isola Fortificata di Saish\u016b-t\u014d (Jeju / Quelpart)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Zenra-nand\u014d \u2014 Distretto Insulare di Saish\u016b",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Grande isola vulcanica dominata dal Monte Hallasan nel Canale di Jeju, nota storicamente agli occidentali come Quelpart; amministrata come isola della provincia di Zenra-nand\u014d, con economia basata su pesca (famose pescatrici Haenyeo), allevamento equino e agrumeti.",
    s2_4: "L'isola assume un valore geostrategico eccezionale: la Marina Imperiale costruisce il grande aeroporto di Alddtreu a Daejeong per i bombardieri che colpiscono Shanghai e Nanchino attraverso il Mar Cinese Orientale.",
    s5_7: "Fortificazione dell'isola: scavo di gallerie sotterranee, ricoveri corazzati per velivoli e bunker d'artiglieria costiera per contrastare eventuali sortite nemiche.",
    s8: "Avamposto aeronavale inespugnabile a presidio della rotta meridionale tra il Mar del Giappone, lo Stretto di Tsushima e il Mar Giallo.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KP01": {
    id: "KP01",
    cntrCode: "KP",
    cntrName: "Corea del Nord",
    name: "Pyongyang",
    nutsName: "Pyongyang (Heij\u014d)",
    nameLatn: "Heij\u014d-fu",
    nameEngl: "Pyongyang Directly Governed City",
    modernName: "Citt\u00e0 a Statuto Diretto di Pyongyang (Capitale della RPD di Corea)",
    historicalName: "Ch\u014dsen \u2014 Citt\u00e0 e Grande Metropoli Industriale di Heij\u014d (Pyongyang)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Heian-nand\u014d \u2014 Sede del Governatore Provinciale & Heij\u014d-fu",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Heij\u014d (Pyongyang), seconda citt\u00e0 della penisola adagiata sul fiume Taedong, \u00e8 il fulcro del grande bacino carbonifero di antracite di Sadong e un vivace centro industriale e commerciale (zucchero, tessile, macchinari). Centro di forte radicamento cristiano (la \"Gerusalemme dell'Est\"), \u00e8 vigilata attentamente dal governo coloniale.",
    s2_4: "Massiccia militarizzazione industriale: le miniere di antracite lavorano a ciclo continuo per alimentare le acciaierie e le fonderie belliche della penisola e del Giappone; gli studenti delle missioni cristiane sono costretti sotto minaccia di chiusura a compiere l'omaggio scintoista.",
    s5_7: "Repressione totale delle chiese e delle comunit\u00e0 cristiane che rifiutano l'idolatria dello Shinto di Stato; chiusura dei collegi americani e arresto dei pastori dissidenti; conversione delle fabbriche all'assemblaggio di componentistica bellica.",
    s8: "Roccaforte della produzione di carbone e metalli pesanti; scalo ferroviario monumentale che smista i convogli corazzati tra la Cina del Nord, la Manciuria e Keij\u014d.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KP02": {
    id: "KP02",
    cntrCode: "KP",
    cntrName: "Corea del Nord",
    name: "South Pyongan",
    nutsName: "Pyeongannam-do (Anju, Sunchon e Pyongsong)",
    nameLatn: "Heian-nand\u014d",
    nameEngl: "South Pyongan Province",
    modernName: "Provincia del Pyeongan Meridionale (Anju e Bacino del Taedong, Corea del Nord)",
    historicalName: "Ch\u014dsen \u2014 Heian-nand\u014d (Bacino Minerario di Anju e Fiume Taedong)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Heian-nand\u014d \u2014 Uffici Distrettuali di Anju e Sunchon",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Regione cardine dell'industria estrattiva e dell'agricoltura cerealicola settentrionale, ricca di bacini carboniferi di lignite e antracite (Anju, Kaechon, Sunchon).",
    s2_4: "Apertura di nuovi pozzi minerari e sviluppo di impianti di distillazione del carbone per produrre carburanti sintetici, vitali per alleviare la dipendenza energetica dell'Impero.",
    s5_7: "Impiego massiccio di squadre di lavoro forzato sotterraneo nelle miniere di carbone; requisizione delle riserve di calcare per la produzione di carburo e cemento armato.",
    s8: "Bacino energetico strategico a supporto dei complessi industriali pesanti di Heij\u014d e Chinnampo; massima allerta difensiva per prevenire sabotaggi.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KP14": {
    id: "KP14",
    cntrCode: "KP",
    cntrName: "Corea del Nord",
    name: "Nampo",
    nutsName: "Nampo (Chinnampo)",
    nameLatn: "Chinnampo-fu",
    nameEngl: "Nampo Special City",
    modernName: "Citt\u00e0 Speciale di Nampo (Porto sul Mar Giallo di Pyongyang, Corea del Nord)",
    historicalName: "Ch\u014dsen \u2014 Citt\u00e0 Industriale e Porto Metallurgico di Chinnampo (Nampo)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Heian-nand\u014d \u2014 Chinnampo-fu (Fonderie e Porto Esteriore)",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Chinnampo (Nampo), situata alla foce del fiume Taedong sul Mar Giallo, \u00e8 il porto esteriore di Heij\u014d e la capitale della metallurgia non ferrosa: ospita la celebre Fonderia di Chinnampo (Nihon K\u014dgy\u014d), che raffina rame, piombo, zinco e oro provenienti da tutta la Corea.",
    s2_4: "La fonderia lavora al massimo regime per la fusione di bossoli di munizioni, leghe per blindature e piastre di rame per la Marina e l'Esercito.",
    s5_7: "Ampliamento delle banchine marittime e dei depositi minerari; costruzione di difese costiere alla foce del Taedong per proteggere l'ingresso fluviale a Heij\u014d.",
    s8: "Porto d'importanza primaria per la cantieristica ausiliaria e la spedizione marittima di lingotti metallici raffinati verso i porti industriali del Mare Interno di Seto in Giappone.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KP03": {
    id: "KP03",
    cntrCode: "KP",
    cntrName: "Corea del Nord",
    name: "North Pyongan",
    nutsName: "Pyeonganbuk-do (Sinuiju e Diga di Sup'ung)",
    nameLatn: "Heian-hokud\u014d",
    nameEngl: "North Pyongan Province",
    modernName: "Provincia del Pyeongan Settentrionale (Sinuiju e Diga di Supung, Corea del Nord)",
    historicalName: "Ch\u014dsen \u2014 Heian-hokud\u014d (Sede di Shingish\u016b, Frontiera dello Yalu e Diga di Sui-h\u014d)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Heian-hokud\u014d \u2014 Sede Provinciale di Shingish\u016b (Frontiera dello Yalu)",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Shingish\u016b (Sinuiju), situata sulla riva sinistra del fiume Yalu di fronte alla citt\u00e0 mancese di Andong (Dandong), \u00e8 collegata da un celebre ponte ferroviario girevole inaugurato nel 1911; polo industriale della polpa di legno e della chimica cartaria.",
    s2_4: "Nel 1937 ha inizio l'epica costruzione della Diga di Sup'ung (Sui-h\u014d) sul fiume Yalu, una joint venture colossale tra il governo di Ch\u014dsen e il Manciuku\u00f2: destinata a diventare la pi\u00f9 potente centrale idroelettrica d'Asia (700 MW), alimenter\u00e0 l'apparato industriale dell'intera regione.",
    s5_7: "Mobilitazione di oltre 50.000 operai per la diga di Sui-h\u014d; la ferrovia dello Yalu \u00e8 il cordone ombelicale attraverso cui scorrono le materie prime tra Manciuku\u00f2, Corea e Giappone.",
    s8: "Frontiera fluviale pacificata e fortificata; l'energia idroelettrica delle turbine di Sui-h\u014d entra in funzione garantendo autosufficienza energetica alle acciaierie e fonderie belliche.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KP04": {
    id: "KP04",
    cntrCode: "KP",
    cntrName: "Corea del Nord",
    name: "Jagang",
    nutsName: "Chagang (Kanggye e Huichon)",
    nameLatn: "Ch\u014dk\u014d-d\u014d / Kanggye",
    nameEngl: "Chagang Province",
    modernName: "Provincia di Jagang (Kanggye e Huichon, Roccaforte Montuosa, Corea del Nord)",
    historicalName: "Ch\u014dsen \u2014 Heian-hokud\u014d Montuosa (Distretti di Kanggye e Huichon)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Heian-hokud\u014d \u2014 Distretto Montano Forestale di K\u014dkai (Kanggye)",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Zona impervia e montuosa compresa tra i monti Nangnim e la valle dello Yalu, all'epoca settore orientale di Heian-hokud\u014d con centri principali a K\u014dkai (Kanggye) e Huichon; immensa riserva forestale e mineraria.",
    s2_4: "Intensificazione del taglio del legname per traverse ferroviarie e puntelli da mina; prime ricognizioni militari per insediare fabbriche d'armi sotterranee e arsenali protetti dai bombardamenti aerei.",
    s5_7: "Operazioni di rastrellamento della polizia contro le residue cellule guerrigliere comuniste e nazionaliste (tra cui i reparti guidati da Kim Il-sung) operanti al confine mancese; costruzione di strade militari d'arroccamento.",
    s8: "Roccaforte naturale trasformata in retrovia per l'industria bellica di precisione e la lavorazione di leghe speciali al riparo da occhi indiscreti.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KP05_N": {
    id: "KP05_N",
    cntrCode: "KP",
    cntrName: "Corea del Nord",
    name: "South Hwanghae (Nord 38\u00b0 - Haeju)",
    nutsName: "Hwanghae Meridionale Nord (Haeju e Sinchon)",
    nameLatn: "K\u014dkai-d\u014d (Kaish\u016b)",
    nameEngl: "South Hwanghae Province (Haeju sector, North of 38th Parallel)",
    modernName: "Provincia dello Hwanghae Meridionale (Haeju, a nord del 38\u00b0 parallelo, Corea del Nord)",
    historicalName: "Ch\u014dsen \u2014 K\u014dkai-d\u014d (Sede Provinciale e Porto di Kaish\u016b / Haeju)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 K\u014dkai-d\u014d \u2014 Sede del Governatore Provinciale a Kaish\u016b",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Sede provinciale di Kaish\u016b (Haeju), affacciata sulla baia omonima nel Mar Giallo; ricca pianura agricola produttrice di riso, grano e mele, con impianti di cemento e chimica di base.",
    s2_4: "Il porto di Kaish\u016b viene potenziato per collegare direttamente le pianure cerealicole di Hwanghae con i porti occupati della Cina settentrionale (Tanggu, Dalian).",
    s5_7: "Introduzione del razionamento e ammasso forzato del riso; rigida sorveglianza delle coste e imposizione della toponomastica e dell'onomastica giapponese.",
    s8: "Settore settentrionale del bacino di Haeju, integrato nelle linee di rifornimento marittimo del Golfo di Corea a nord del 38\u00b0 parallelo.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KP05_S": {
    id: "KP05_S",
    cntrCode: "KP",
    cntrName: "Corea del Nord",
    name: "South Hwanghae (Sud 38\u00b0 - Penisola di Ongjin)",
    nutsName: "Hwanghae Meridionale Sud (Penisola di Ongjin, Sud 38\u00b0)",
    nameLatn: "K\u014dkai-d\u014d (Onshin)",
    nameEngl: "South Hwanghae Province (Ongjin Peninsula sector, South of 38th Parallel)",
    modernName: "Penisola di Ongjin (Settore a sud del 38\u00b0 parallelo, storicamente enclave contesa, Corea del Nord)",
    historicalName: "Ch\u014dsen \u2014 K\u014dkai-d\u014d Sud-Occidentale (Penisola di Onshin / Ongjin)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 K\u014dkai-d\u014d \u2014 Contea di Onshin (Miniera d'Oro e Stretto del Mar Giallo)",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Penisola protesa nel Mar Giallo a sud del 38\u00b0 parallelo, celebre per le ricche miniere d'oro di Onshin (Ongjin) gestite con concessioni coloniali; territorio montuoso costiero di notevole valore strategico.",
    s2_4: "La produzione aurifera di Ongjin \u00e8 considerata priorit\u00e0 assoluta per il Ministero delle Finanze imperiale, che utilizza l'oro per gli acquisti di petrolio e gomma sui mercati neutrali prima dell'embargo.",
    s5_7: "Requisizione totale dell'oro estratto e potenziamento delle difese costiere della penisola; controllo militare delle isole prospicienti.",
    s8: "Area strategica isolata via terra ma ben servita via mare; per via della posizione a sud del 38\u00b0 parallelo, nel 1945 passer\u00e0 sotto l'amministrazione statunitense (Corea del Sud) fino alla guerra del 1950.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KP06_N": {
    id: "KP06_N",
    cntrCode: "KP",
    cntrName: "Corea del Nord",
    name: "North Hwanghae (Nord 38\u00b0 - Sariwon)",
    nutsName: "Hwanghae Settentrionale Nord (Sariwon e Chaeryong)",
    nameLatn: "K\u014dkai-d\u014d (Shariin)",
    nameEngl: "North Hwanghae Province (Sariwon sector, North of 38th Parallel)",
    modernName: "Provincia dello Hwanghae Settentrionale (Sariwon, a nord del 38\u00b0 parallelo, Corea del Nord)",
    historicalName: "Ch\u014dsen \u2014 K\u014dkai-d\u014d Interna (Nodo Ferroviario e Miniere di Shariin / Sariwon)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 K\u014dkai-d\u014d \u2014 Distretto Ferroviario e Agricolo di Shariin",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Shariin (Sariwon) \u00e8 il nodo ferroviario e commerciale nevralgico della provincia di K\u014dkai sulla linea principale Gyeongui (Keij\u014d-Shingish\u016b), circondato dalle fertili risaie del bacino di Chaeryong e da miniere di ferro (Eunyul).",
    s2_4: "Lo scalo ferroviario di Shariin opera a pieno ritmo per il transito delle materie prime minerarie dirette alle acciaierie di Kenjiho (Songnim) e Chinnampo.",
    s5_7: "Mobilitazione delle comunit\u00e0 contadine e dei ferrovieri; rigida applicazione del programma di assimilazione K\u014dminka e della lingua giapponese obbligatoria.",
    s8: "Snodo logistico corazzato a protezione della principale arteria ferroviaria che unisce la capitale Keij\u014d al nord industriale e alla Manciuria.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KP06_S": {
    id: "KP06_S",
    cntrCode: "KP",
    cntrName: "Corea del Nord",
    name: "North Hwanghae (Sud 38\u00b0 - Kaesong e Changpung)",
    nutsName: "Hwanghae Settentrionale Sud (Kaesong e Changpung, Sud 38\u00b0)",
    nameLatn: "Kaij\u014d-fu / Kaesong",
    nameEngl: "North Hwanghae Province (Kaesong and Changpung sector, South of 38th Parallel)",
    modernName: "Citt\u00e0 Storica di Kaesong e Distretto di Changpung (A sud del 38\u00b0 parallelo, Corea del Nord)",
    historicalName: "Ch\u014dsen \u2014 Antica Capitale di Kaij\u014d (Kaesong / Ginseng di Goryeo)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Keiki-d\u014d \u2014 Kaij\u014d-fu (Capitale di Goryeo & Monopolio del Ginseng)",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Kaij\u014d (Kaesong), gloriosa capitale della dinastia Goryeo (918-1392), \u00e8 all'epoca una prestigiosa prefettura urbana (Kaij\u014d-fu) appartenente alla provincia di Keiki-d\u014d. Celeberrima nel mondo per il monopolio imperiale del prezioso ginseng rosso (insam), custodisce monumenti millenari.",
    s2_4: "L'esportazione del ginseng di Kaij\u014d, monopolio governativo ad altissimo reddito, procura preziose valute estere all'amministrazione imperiale; la citt\u00e0 \u00e8 un nodo tranquillo lungo la ferrovia Gyeongui.",
    s5_7: "Rigido controllo sul monopolio del ginseng e sulle famiglie mercantili storiche di Kaesong; imposizione del cambio dei nomi e chiusura delle scuole private tradizionali.",
    s8: "Gemma storica situata a sud del 38\u00b0 parallelo; nel 1945 entrer\u00e0 nella zona d'occupazione statunitense rimanendo a sud della linea di demarcazione fino alla guerra di Corea del 1950-1953.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KP07": {
    id: "KP07",
    cntrCode: "KP",
    cntrName: "Corea del Nord",
    name: "Kangwon (Nord 38\u00b0)",
    nutsName: "Kangwon Nord (Wonsan, Tongchon e Monti Kumgang)",
    nameLatn: "K\u014dgen-d\u014d (Genzan)",
    nameEngl: "Kangwon Province (North Korean sector, Wonsan and Mount Kumgang)",
    modernName: "Provincia del Kangwon (Wonsan e Monti Kumgang, Corea del Nord)",
    historicalName: "Ch\u014dsen \u2014 Grande Porto di Genzan e Monti Diamante (K\u014dgen-d\u014d Settentrionale)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 K\u014dgen-d\u014d \u2014 Genzan-fu & Distretto dei Monti Kumgang (Kong\u014dsan)",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Genzan (Wonsan) \u00e8 il principale porto marittimo della costa orientale della penisola, capolinea della ferrovia Gyeongwon e della linea costiera; la regione comprende i leggendari Monti Kumgang (Kong\u014dsan), celebre meta turistica internazionale servita da alberghi di lusso delle Ferrovie del Governo Generale.",
    s2_4: "Trasformazione di Genzan in base navale ausiliaria e porto per il trasporto di minerali e truppe verso il Manciuku\u00f2 orientale e la Russia marittima; il turismo ai Monti Diamante viene drasticamente limitato per esigenze belliche.",
    s5_7: "Installazione di raffinerie petrolifere della Chosen Oil Company e di cantieri per navi mercantili ausiliarie a Wonsan; fortificazione delle scogliere e delle alture prospicienti la baia di Yonghung.",
    s8: "Roccaforte aeronavale di primo piano nel Mar del Giappone, pesantemente difesa da batterie costiere e sbarramenti difensivi.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KP08": {
    id: "KP08",
    cntrCode: "KP",
    cntrName: "Corea del Nord",
    name: "South Hamgyong",
    nutsName: "Hamgyeongnam-do (Hamhung e Hungnam)",
    nameLatn: "Kanky\u014d-nand\u014d",
    nameEngl: "South Hamgyong Province",
    modernName: "Provincia dell'Hamgyeong Meridionale (Hamhung e Complesso Chimico di Hungnam, Corea del Nord)",
    historicalName: "Ch\u014dsen \u2014 Kanky\u014d-nand\u014d (Capoluogo di Kank\u014d e Complesso Chimico di K\u014dnan)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Kanky\u014d-nand\u014d \u2014 Sede Provinciale di Kank\u014d & Nichitsu K\u014dnan",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Sede a Kank\u014d (Hamhung) e polo industriale a K\u014dnan (Hungnam), dove il pioniere industriale Noguchi Shitagau (gruppo Nichitsu) ha costruito il pi\u00f9 grande complesso chimico d'Asia: impianti monumentali di fertilizzanti azotati, ammoniaca, dinamite e composti chimici alimentati dall'energia idroelettrica dei fiumi Pujon e Changjin.",
    s2_4: "Il complesso di K\u014dnan si converte alla produzione massiccia di esplosivi militari, munizioni, acido nitrico e carburanti sintetici; Hungnam diviene una delle capitali chimico-militari dell'Impero nipponico.",
    s5_7: "Espansione vertiginosa della forza lavoro (oltre 40.000 operai industriali a Hungnam); avvio di ricerche avanzate su metalli rari, radioattivit\u00e0 e acqua pesante nei laboratori chimici della Nichitsu.",
    s8: "Gigante industriale e chimico protetto da difese aeree serrate; cuore pulsante della capacit\u00e0 di rifornimento di polvere da sparo ed esplosivi per le armate imperiali.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KP10": {
    id: "KP10",
    cntrCode: "KP",
    cntrName: "Corea del Nord",
    name: "Ryanggang",
    nutsName: "Ryanggang (Hyesan e Monte Paektu)",
    nameLatn: "Keizan / Hakutosan",
    nameEngl: "Ryanggang Province",
    modernName: "Provincia di Ryanggang (Hyesan, Altopiano di Kaema e Monte Paektu, Corea del Nord)",
    historicalName: "Ch\u014dsen \u2014 Altopiano di Kaema, Distretto di Keizan e Sacro Monte Hakutosan (Paektu)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Kanky\u014d-nand\u014d \u2014 Contea di Keizan (Frontiera del Fiume Yalu)",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Il \"Tetto della Corea\", dominato dall'altipiano glaciale di Kaema e dalla maestosa vetta vulcanica del Monte Paektu (Hakutosan / Monte Changbai), sacro sia per i coreani che per le origini mitiche della dinastia Qing; capitale a Keizan (Hyesan) sul fiume Yalu, regno di fitte foreste di conifere e miniere di rame.",
    s2_4: "Sfruttamento intensivo delle foreste primigenie per il legname d'arsenale; teatro di agguati e guerriglia partigiana transfrontaliera tra partigiani antinipponici e reparti della gendarmeria e della Polizia di Frontiera del Manciuku\u00f2 (famosa battaglia di Pochonbo, giugno 1937).",
    s5_7: "Grande campagna di pacificazione e creazione di \"villaggi di concentramento raggruppati\" per recidere i legami tra le popolazioni montane e la guerriglia; costruzione di posti di blocco fortificati lungo la frontiera dello Yalu.",
    s8: "Frontiera alpina presidiata da unit\u00e0 sciatori e fortificazioni permanenti lungo i passi del Paektu, integrata nel sistema di sicurezza congiunto Giappone-Manciuku\u00f2.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KP09": {
    id: "KP09",
    cntrCode: "KP",
    cntrName: "Corea del Nord",
    name: "North Hamgyong",
    nutsName: "Hamgyeongbuk-do (Chongjin / Seishin, Hoeryong e Musan)",
    nameLatn: "Kanky\u014d-hokud\u014d",
    nameEngl: "North Hamgyong Province",
    modernName: "Provincia dell'Hamgyeong Settentrionale (Chongjin, Hoeryong e Miniera di Musan, Corea del Nord)",
    historicalName: "Ch\u014dsen \u2014 Kanky\u014d-hokud\u014d (Porto d'Acciaio di Seishin e Miniera di Musan)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Kanky\u014d-hokud\u014d \u2014 Sede Provinciale di Seishin-fu & Miniere di Musan",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Seishin (Chongjin) \u00e8 la capitale siderurgica e il capoluogo provinciale di Kanky\u014d-hokud\u014d; ospita i colossali altiforni della Japan Iron & Steel (Nippon Seitetsu), alimentati dall'immenso giacimento di ferro a cielo aperto di Musan (tra i pi\u00f9 ricchi al mondo) collegato dalla ferrovia mineraria.",
    s2_4: "La produzione di ghisa e acciaio di Seishin esplode per soddisfare le esigenze belliche; Musan escava milioni di tonnellate di minerale ferrifero spedito per mare alle acciaierie di Yawata nel Ky\u016bsh\u016b.",
    s5_7: "Trasformazione della fascia di Seishin in citt\u00e0 industriale moderna con decine di migliaia di operai mobilitati; fortificazione della frontiera settentrionale lungo il fiume Tumen (Duman) di fronte all'Unione Sovietica.",
    s8: "Polo siderurgico di primaria grandezza strategica; il Patto di Neutralit\u00e0 Sovietico-Giapponese (aprile 1941) allenta la tensione sul confine, consentendo di concentrare la produzione sulla marina militare.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "KP13": {
    id: "KP13",
    cntrCode: "KP",
    cntrName: "Corea del Nord",
    name: "Rason",
    nutsName: "Rason (Rajin e Unggi / Rashin e Yuki)",
    nameLatn: "Rashin e Yuki",
    nameEngl: "Rason Special City",
    modernName: "Citt\u00e0 Speciale di Rason (Rajin e Unggi, Porto Strategico del Mar del Giappone, Corea del Nord)",
    historicalName: "Ch\u014dsen \u2014 Porto Libero Strategico di Rashin e Yuki (Sbocco Navale verso il Manciuku\u00f2)",
    adminTitle: "Ch\u014dsen S\u014dtokufu \u00b7 Kanky\u014d-hokud\u014d \u2014 Rashin-fu (Porto Navale d'Oltremare della Ferrovia della Manciuria del Sud)",
    sovereign: "JAP",
    overlord: "Impero Giapponese (Chōsen Sōtokufu)",
    faction: "Asse",
    s0_1: "Rashin (Rajin) e Yuki (Unggi), situate nella profonda insenatura a nord-est della penisola a ridosso del triplice confine con URSS e Manciuku\u00f2, formano un porto naturale in acque profonde libero dai ghiacci tutto l'anno. Trasformate dalla Societ\u00e0 della Ferrovia della Manciuria del Sud (Mantetsu) nel capolinea marittimo per esportare la soia, il carbone e il legname mancesi nel Mar del Giappone.",
    s2_4: "Luglio-agosto 1938: la Battaglia del Lago Khasan (Incidente di Changkufeng) divampa a ridosso del confine a pochi chilometri da Yuki e Rashin. I porti e le stazioni ferroviarie fungono da base operativa avanzata per la 19\u00aa Divisione dell'Esercito Imperiale contro l'Armata Rossa sovietica.",
    s5_7: "Installazione di una gigantesca raffineria di petrolio e depositi carburante della Chosen Oil Company a Rashin; fortificazioni navali pesanti e installazione di difese antisottomarino all'imboccatura della baia.",
    s8: "Porto strategico ad altissima sensibilit\u00e0 geocartografica, capolinea della rotta marittima pi\u00f9 rapida verso Niigata e Tsuruga in Giappone; stabilizzato dal Patto di Neutralit\u00e0 con Mosca dell'aprile 1941.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
};

/**
 * Risolve una provincia o territorio coreano per un determinato step temporale.
 */
export function resolveKoreaProvince(ft: any, s: number): ResolvedTerritory {
  const p = (ft && ft.properties) ? ft.properties : {};
  const fidClean = String(ft.id || p.id || p.NUTS_ID || '').trim();

  // 1. Match diretto per id canonico in KOREA_PROVINCES_META
  let meta = KOREA_PROVINCES_META[fidClean];

  // 2. Fallback per id alternativi o normalizzati
  if (!meta) {
    for (const key of Object.keys(KOREA_PROVINCES_META)) {
      const m = KOREA_PROVINCES_META[key];
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

  if (meta) {
    const sov = meta.getSovereign ? meta.getSovereign(s) : meta.sovereign;
    const fac = meta.getFaction ? meta.getFaction(s) : meta.faction;
    const histName = meta.getHistoricalName ? meta.getHistoricalName(s) : meta.historicalName;
    const admin = meta.getAdminTitle ? meta.getAdminTitle(s) : meta.adminTitle;
    const note = meta.getNote(s);

    return makeResult(sov, histName, note, fac, admin);
  }

  // Fallback generico per territori coreani non censiti (Chōsen Sōtokufu)
  const rawName = String(p.HISTORICAL_NAME || p.NAME || p.name || 'Chōsen (Chōsen Sōtokufu — Keijō)');
  const fallbackName = rawName.includes('Chōsen')
    ? rawName
    : (rawName.toLowerCase() === 'korea' ? 'Chōsen (Chōsen Sōtokufu — Keijō)' : `Chōsen (${rawName})`);
  const defaultAdmin = 'Chōsen Sōtokufu (Governo Generale di Chōsen · Keijō)';
  const defaultNote = s <= 4
    ? "Possedimento coloniale dell'Impero Giapponese sotto il Governatore Generale (Chōsen Sōtokufu) a Keijō; retrovia logistica e industriale per le operazioni in Cina."
    : "Possedimento coloniale dell'Impero Giapponese a Keijō; sottoposto a totale mobilitazione bellica, assimilazione forzata Kōminka e coscrizione del lavoro.";

  return makeResult(
    'JAP',
    fallbackName,
    p.HISTORICAL_NOTE || defaultNote,
    'Asse',
    p.ADMIN || defaultAdmin
  );
}
