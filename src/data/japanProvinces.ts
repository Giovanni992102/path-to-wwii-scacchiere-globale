/**
 * Dettaglio Geocartografico Storico delle 47 Prefetture del Giappone + Karafuto e Chishima Rettō (1936-1941)
 *
 * Copertura integrale di tutte le 47 prefetture dell'arcipelago metropolitano (Naichi) e dei territori settentrionali del 1938:
 * - Sovranità: Impero del Grande Giappone (Dai Nippon Teikoku / 大日本帝国)
 * - Fazione: Asse
 * - Capitale Imperiale: Tōkyō (Sede dell'Imperatore Shōwa Hirohito e del Gran Quartier Generale Imperiale Daihonei)
 * - Struttura Amministrativa: 1 Dō (Hokkaidō), 2 Fu (Tōkyō-fu / Kyōto-fu / Ōsaka-fu), 43 Ken + Karafuto-chō e Chishima Rettō
 *
 * Dinamica Temporale (Step 0-8):
 * - Step 0-1 (1936: Anteguerra & Crisi dei Giovani Ufficiali):
 *   Incidente del 26 Febbraio (Ni-Ni-Roku Jiken) a Tokyo e legge marziale; Patto Anti-Comintern con la Germania;
 *   espansione degli arsenali segreti (Kure per la Yamato, Nagasaki per la Musashi, Yawata per l'acciaio, Nagoya per l'aeronautica).
 * - Step 2-4 (1937-1938: Seconda Guerra Sino-Giapponese & Mobilitazione Nazionale):
 *   Incidente del Ponte di Marco Polo (luglio 1937) e inizio della guerra totale in Cina; caduta di Shanghai e Nanchino;
 *   Legge di Mobilitazione Generale dello Stato (Kokka Sōdōin Hō, aprile 1938) con controllo totale di economia e lavoro;
 *   scontri al lago Khasan (1938).
 * - Step 5-7 (1939-1940: Nomonhan, Patto Tripartito & Taisei Yokusankai):
 *   Battaglia di Khalkhin Gol (Nomonhan, 1939) e svolta strategica della dottrina verso sud (Nanshin-ron);
 *   Associazione per il Sostegno dell'Autorità Imperiale (Taisei Yokusankai, 1940) e scioglimento dei partiti politici;
 *   Firma del Patto Tripartito (27 settembre 1940, Asse Roma-Berlino-Tokyo); razionamento ferreo di riso e combustibile.
 * - Step 8 (1941: Patto di Neutralità Sovietico-Giapponese & Operazione Hawaii):
 *   Patto quinquennale di Neutralità con l'URSS a Mosca (13 aprile 1941); sanzioni ed embargo petrolifero anglo-americano;
 *   Conferenze Imperiali (Gozen Kaigi) e governo del generale Hideki Tōjō; concentramento segreto della flotta di portaerei
 *   a Saeki (Oita) e nella baia di Hitokappu (Etorofu / Curili) per l'attacco su Pearl Harbor.
 */

import { ResolvedTerritory, FactionType } from '../types';
import { makeResult } from './georesolver';
import { resolveJapanToponym } from './historicalToponyms';

export interface JapanProvinceInfo {
  id: string;
  origId?: string;
  cntrCode: string; // 'JP'
  cntrName: string; // 'Giappone'
  name: string;
  nutsName: string;
  nameLatn: string;
  nameEngl: string;
  modernName: string;
  historicalName: string;
  adminTitle: string;
  sovereign: string; // 'JAP'
  overlord?: string; // 'Dai Nippon Teikoku'
  faction: FactionType; // 'Asse'
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

export const JAPAN_PROVINCES_META: Record<string, JapanProvinceInfo> = {  "JP01": {
    id: "JP01",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Hokkaid\u014d",
    nutsName: "Hokkaido (Sapporo, Hakodate e Muroran)",
    nameLatn: "Hokkaid\u014d-ch\u014d",
    nameEngl: "Hokkaido Prefecture",
    modernName: "Prefettura di Hokkaido (Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Hokkaid\u014d (D\u014dch\u014d / Settima Divisione)",
    adminTitle: "Dai Nippon Teikoku \u2014 Hokkaid\u014d-ch\u014d (Sede di Sapporo & 7\u00aa Divisione Asahikawa)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Prefettura speciale settentrionale (*D\u014dch\u014d*) con capoluogo a Sapporo; roccaforte difensiva della 7\u00aa Divisione dell'Esercito Imperiale ad Asahikawa ('I Guardiani del Nord'). Polo siderurgico strategico delle acciaierie di Muroran (*Nihon Seik\u014dsho*), miniere di carbone di Y\u016bbari e porto commerciale di Otaru.",
    s2_4: "Con lo scoppio del conflitto in Cina (1937), le acciaierie di Muroran e le miniere di Y\u016bbari raddoppiano la produzione bellica di blindature e cannoni pesanti; Hakodate e Kushiro riforniscono la marina di pesce essiccato e conserve per le razioni di guerra.",
    s5_7: "In seguito agli scontri di Khalkhin Gol (1939) contro l'URSS, l'Hokkaid\u014d rafforza le difese costiere e aeree settentrionali; istituzione del razionamento del legname e coscrizione di lavoratori per le miniere di carbone.",
    s8: "La firma del Patto di Neutralit\u00e0 con l'URSS (aprile 1941) allenta la minaccia immediata di invasione a nord; la 7\u00aa Divisione rimane tuttavia in stato di massima allerta per la protezione degli accessi allo Stretto di Tsugaru e alle Curili.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP02": {
    id: "JP02",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Aomori",
    nutsName: "Aomori (Stretto di Tsugaru e Base di \u014cminato)",
    nameLatn: "Aomori-ken",
    nameEngl: "Aomori Prefecture",
    modernName: "Prefettura di Aomori (Tohoku, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Aomori-ken (Base Navale di \u014cminato)",
    adminTitle: "Dai Nippon Teikoku \u2014 Aomori-ken (Distretto di Guardia Navale di \u014cminato Keibifu)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Estremit\u00e0 settentrionale dell'isola di Honsh\u016b a presidio dello Stretto di Tsugaru; ospita nella protetta baia di Mutsu la Base Navale di \u014cminato (*\u014cminato Keibifu*), quartier generale della sorveglianza marittima settentrionale della Marina Imperiale Giapponese.",
    s2_4: "I traghetti ferroviari Seikan tra Aomori e Hakodate operano a pieno carico giorno e notte per trasferire truppe, carbone e manufatti metallici tra Hokkaid\u014d e Honsh\u016b per lo sforzo bellico continentale.",
    s5_7: "Fortificazione delle scogliere e delle alture prospicienti lo stretto di Tsugaru con batterie costiere pesanti e stazioni d'idrovolanti da ricognizione antisommergibile.",
    s8: "Nodo marittimo primario per la protezione dei convogli nel Mare di Okhotsk e nel Mar del Giappone; postazioni di ascolto radiofonico e radar ausiliario a Capo Shiriya.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP03": {
    id: "JP03",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Iwate",
    nutsName: "Iwate (Morioka e Acciaierie di Kamaishi)",
    nameLatn: "Iwate-ken",
    nameEngl: "Iwate Prefecture",
    modernName: "Prefettura di Iwate (Tohoku, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Iwate-ken (Altiforni Costieri di Kamaishi)",
    adminTitle: "Dai Nippon Teikoku \u2014 Iwate-ken (Miniera di Ferro e Acciaierie di Kamaishi)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a Morioka; la costa di Sanriku ospita il celebre polo siderurgico di Kamaishi (*Nippon Seitetsu*), culla della siderurgia moderna giapponese con i suoi ricchi giacimenti di magnetite ed enormi altiforni costieri.",
    s2_4: "Le fonderie di Kamaishi incrementano a ritmo forzato la colata di ghisa e acciaio di qualit\u00e0 per le corazze navali e i blindati dell'esercito impegnati sul continente.",
    s5_7: "Integrazione delle maestranze nelle corporazioni belliche del Taisei Yokusankai; ammasso delle produzioni cerealicole e legname da mina delle valli del Kitakami.",
    s8: "Polo metallurgico altamente strategico della costa pacifica del T\u014dhoku, difeso da postazioni contraeree e batterie litoranee.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP04": {
    id: "JP04",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Miyagi",
    nutsName: "Miyagi (Sendai e Seconda Divisione)",
    nameLatn: "Miyagi-ken",
    nameEngl: "Miyagi Prefecture",
    modernName: "Prefettura di Miyagi (Sendai, Tohoku, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Miyagi-ken (Quartier Generale della 2\u00aa Divisione Sendai)",
    adminTitle: "Dai Nippon Teikoku \u2014 Miyagi-ken (Distretto Militare di Sendai)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Sendai \u00e8 la capitale amministrativa, culturale e militare dell'intero T\u014dhoku; sede dell'Universit\u00e0 Imperiale del T\u014dhoku e del glorioso Quartier Generale della 2\u00aa Divisione fanteria dell'Esercito Imperiale Giapponese.",
    s2_4: "La 2\u00aa Divisione di Sendai viene mobilitata e inviata al fronte continentale cinese; la citt\u00e0 diviene il centro di addestramento e smistamento per migliaia di reclute delle province settentrionali.",
    s5_7: "I laboratori scientifici dell'Universit\u00e0 di Sendai guidati dal prof. Hidetsugu Yagi sviluppano l'innovativa antenna Yagi-Uda, destinata a rivoluzionare i radar aerei e marittimi.",
    s8: "Centro nevralgico della mobilitazione della riserva militare e fulcro dell'addestramento dei quadri d'ufficiali nel nord dell'isola di Honsh\u016b.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP05": {
    id: "JP05",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Akita",
    nutsName: "Akita (Campi Petroliferi di Yabase)",
    nameLatn: "Akita-ken",
    nameEngl: "Akita Prefecture",
    modernName: "Prefettura di Akita (Tohoku, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Akita-ken (Bacino Petrolifero di Yabase)",
    adminTitle: "Dai Nippon Teikoku \u2014 Akita-ken (Campi Petroliferi e Raffinerie di Yabase)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo ad Akita; ospita il giacimento petrolifero di Yabase, la pi\u00f9 ricca fonte indigena di petrolio greggio dell'arcipelago giapponese, affiancato da fitte foreste di cedro montano (*Akita sugi*).",
    s2_4: "La produzione petrolifera di Yabase diviene una risorsa strategica vitale: la compagnia petrolifera imperiale Teikoku Sekiyu accelera le trivellazioni per estrarre ogni barile possibile di greggio.",
    s5_7: "Con l'inasprirsi delle restrizioni commerciali statunitensi sulle esportazioni di idrocarburi, gli impianti di Akita lavorano senza sosta per alimentare le riserve di carburante navale.",
    s8: "Sorveglianza militare serrata sui campi di Yabase e sulle raffinerie costiere per prevenire sabotaggi in vista del blocco petrolifero totale.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP06": {
    id: "JP06",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Yamagata",
    nutsName: "Yamagata (Pianure di Shonai e Miniere di Rame)",
    nameLatn: "Yamagata-ken",
    nameEngl: "Yamagata Prefecture",
    modernName: "Prefettura di Yamagata (Tohoku, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Yamagata-ken (Granaio di Sh\u014dnai)",
    adminTitle: "Dai Nippon Teikoku \u2014 Yamagata-ken (Bacino Agricolo e Minerario)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Provincia agricola affacciata sul Mar del Giappone; le fertili pianure di Sh\u014dnai rappresentano uno dei principali granai di riso dell'Impero, con miniere di rame e zolfo nelle valli dell'Owani.",
    s2_4: "Requisizione dei raccolti risicoli per le provviste dell'esercito in Cina; mobilitazione delle manodopera contadina per i cantieri d'estrazione mineraria.",
    s5_7: "Applicazione rigorosa del razionamento alimentare e donazione patriottica dei metalli; incremento delle colture di soia e patate dolci per sopperire alle carenze alimentari.",
    s8: "Riserva cerealicola strategica per il mantenimento del fronte interno e della metropoli di Tokyo.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP07": {
    id: "JP07",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Fukushima",
    nutsName: "Fukushima (Bacino Carbonifero di J\u014dban)",
    nameLatn: "Fukushima-ken",
    nameEngl: "Fukushima Prefecture",
    modernName: "Prefettura di Fukushima (Tohoku, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Fukushima-ken (Bacino Carbonifero di J\u014dban & Lago Inawashiro)",
    adminTitle: "Dai Nippon Teikoku \u2014 Fukushima-ken (Miniere di J\u014dban & Idroelettrico)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a Fukushima; il bacino minerario di J\u014dban (a cavallo tra Fukushima e Ibaraki) rifornisce la capitale di carbone, mentre le centrali idroelettriche del Lago Inawashiro generano energia elettrica vitale per l'area di Tokyo.",
    s2_4: "Le centrali elettriche e le miniere di J\u014dban lavorano a pieno regime per sostenere l'esplosione dei consumi energetici delle fabbriche di armamenti del Kant\u014d.",
    s5_7: "Militarizzazione dei minatori di carbone sotto i comitati del Taisei Yokusankai; ammasso forzoso dei prodotti tessili e serici della piana di Aizu.",
    s8: "Perno energetico e idroelettrico fondamentale a protezione della continuit\u00e0 industriale della capitale imperiale.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP08": {
    id: "JP08",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Ibaraki",
    nutsName: "Ibaraki (Polo Hitachi e Base di Kasumigaura)",
    nameLatn: "Ibaraki-ken",
    nameEngl: "Ibaraki Prefecture",
    modernName: "Prefettura di Ibaraki (Mito, Kanto, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Ibaraki-ken (Stabilimenti Hitachi & Base Aeronavale di Kasumigaura)",
    adminTitle: "Dai Nippon Teikoku \u2014 Ibaraki-ken (Polo Industriale Hitachi & Scuola di Volo Navale)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Sede storica del casato Mito-Tokugawa; ospita il colosso tecnologico ed elettromeccanico **Hitachi Seisakusho** (motori, locomotive, turbine) e la prestigiosa Base Aerea di **Kasumigaura**, la principale scuola di volo dell'Aviazione della Marina Imperiale.",
    s2_4: "Kasumigaura addestra a ritmo serrato centinaia di piloti aeronavali per i gruppi d'imbarco delle portaerei; gli stabilimenti Hitachi convertono la produzione alla componentistica pesante bellica.",
    s5_7: "Ampliamento delle officine per la produzione di motori aeronautici e siluri; addestramento avanzato dei piloti sui nuovi caccia Mitsubishi A6M Zero.",
    s8: "Centro d'eccellenza dell'addestramento dell'arma aerea della Marina; da qui provengono i migliori assi dell'aviazione navale pronti per l'operazione Hawaii.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP09": {
    id: "JP09",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Tochigi",
    nutsName: "Tochigi (Miniere di Rame di Ashio e Arsenali di Utsunomiya)",
    nameLatn: "Tochigi-ken",
    nameEngl: "Tochigi Prefecture",
    modernName: "Prefettura di Tochigi (Utsunomiya, Kanto, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Tochigi-ken (Miniera di Rame di Ashio)",
    adminTitle: "Dai Nippon Teikoku \u2014 Tochigi-ken (Distretto Metallurgico di Ashio & Utsunomiya)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a Utsunomiya; comprende la leggendaria Miniera di Rame di **Ashio** (*Furukawa*), il pi\u00f9 grande complesso estrattivo di rame del Giappone, fondamentale per la fabbricazione di munizioni e linee telefoniche militari.",
    s2_4: "La produzione di rame di Ashio viene dichiarata risorsa a priorit\u00e0 nazionale per la produzione ininterrotta di bossoli d'artiglieria e cavi elettrici per le forze armate.",
    s5_7: "Costruzione di stabilimenti ausiliari per la produzione aeronautica Nakajima nell'area di Utsunomiya; protezione dei monumenti sacri e mausolei di Nikk\u014d da eventuali rischi bellici.",
    s8: "Polo metallurgico e arsenale di munizionamento leggero dell'entroterra del Kant\u014d, al riparo da incursioni dal mare.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP10": {
    id: "JP10",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Gunma",
    nutsName: "Gunma (Stabilimenti Aeronautici Nakajima di \u014cta)",
    nameLatn: "Gunma-ken",
    nameEngl: "Gunma Prefecture",
    modernName: "Prefettura di Gunma (Maebashi, Kanto, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Gunma-ken (Impianti Aeronautici Nakajima di \u014cta)",
    adminTitle: "Dai Nippon Teikoku \u2014 Gunma-ken (Nakajima Hik\u014dki \u014cta Seisakusho)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capitale dell'industria aeronautica giapponese: ospita a \u014cta i monumentali impianti della **Nakajima Hik\u014dki** (fondata da Chikuhei Nakajima), dove vengono progettati e costruiti i motori radiali e i caccia dell'Esercito e della Marina.",
    s2_4: "Gli stabilimenti Nakajima di \u014cta producono in serie centinaia di caccia Ki-27 ('Nate') e sviluppano il caccia Ki-43 *Hayabusa* per contrastare le forze aeree cinesi.",
    s5_7: "Espansione impressionante degli impianti di \u014cta e Koizumi; decine di migliaia di operai mobilitati lavorano su turni continui per la fabbricazione dei motori *Sakae* e *Homare*.",
    s8: "L'arsenale aeronautico supremo dell'Esercito Imperiale; i motori Nakajima Sakae equipaggiano tanto i caccia Zero della Marina quanto i caccia Hayabusa dell'Esercito.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP11": {
    id: "JP11",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Saitama",
    nutsName: "Saitama (Officine di \u014cmiya e Arsenali di Kawagoe)",
    nameLatn: "Saitama-ken",
    nameEngl: "Saitama Prefecture",
    modernName: "Prefettura di Saitama (Kanto, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Saitama-ken (Grandi Officine Ferroviarie di \u014cmiya)",
    adminTitle: "Dai Nippon Teikoku \u2014 Saitama-ken (Snodo Logistico di \u014cmiya & Kawagoe)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a Urawa; ospita a \u014cmiya le pi\u00f9 estese officine e scali ferroviari della rete imperiale, affiancate da industrie manifatturiere e armiere a Kawagoe e Tokorozawa.",
    s2_4: "Le officine di \u014cmiya lavorano a pieno ritmo alla riparazione, blindatura e modifica di locomotive e carri merci destinati alle linee continentali del Manciuku\u00f2 e della Cina occupata.",
    s5_7: "Decentramento di fabbriche di armamenti minori e munizioni da Tokyo a Saitama per proteggerle da vulnerabilit\u00e0 costiere; arruolamento giovanile nelle scuole tecniche.",
    s8: "Snodo ferroviario corazzato a monte della capitale Tokyo, indispensabile per il flusso continuo di materiali bellici verso i porti di Yokohama e Yokosuka.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP12": {
    id: "JP12",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Chiba",
    nutsName: "Chiba (Penisola di B\u014ds\u014d e Difese della Baia di Tokyo)",
    nameLatn: "Chiba-ken",
    nameEngl: "Chiba Prefecture",
    modernName: "Prefettura di Chiba (Kanto, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Chiba-ken (Fortezza dello Stretto di Uraga & Base di Tateyama)",
    adminTitle: "Dai Nippon Teikoku \u2014 Chiba-ken (Comando Difesa Costiera della Baia di Tokyo)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Si estende lungo la Penisola di B\u014ds\u014d a chiusura della Baia di Tokyo; ospita importanti basi aeronavali della Marina a Tateyama e Kisarazu, con imponenti fortificazioni costiere all'ingresso del canale di Uraga.",
    s2_4: "I gruppi aerei della Marina di Kisarazu e Tateyama partecipano a missioni di ricognizione e scorta convogli verso la costa cinese; mobilitazione dei cantieri pescherecci locali.",
    s5_7: "Installazione di sbarramenti minati marittimi e riflettori notturni lungo la costa di B\u014ds\u014d per impedire incursioni di sommergibili ostili nella rada di Tokyo.",
    s8: "Avamposto costiero di massimo allarme a guardia dell'ingresso marittimo alla capitale dell'Impero; batterie di cannoni pesanti corazzati sulle scogliere del Canale di Uraga.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP13": {
    id: "JP13",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Tokyo",
    nutsName: "Tokyo (Capitale Imperiale e Gran Quartier Generale)",
    nameLatn: "T\u014dky\u014d-fu / T\u014dky\u014d-to",
    nameEngl: "Tokyo Metropolis",
    modernName: "Prefettura di Tokyo (Capitale del Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 T\u014dky\u014d (Capitale Imperiale & Gran Quartier Generale Daihonei)",
    adminTitle: "Dai Nippon Teikoku \u2014 T\u014dky\u014d-fu (Palazzo Imperiale K\u014dkyo & Sede Centrale del Governo)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capitale dell'Impero del Grande Giappone (*Dai Nippon Teikoku Shuto*), residenza dell'Imperatore Sh\u014dwa (Hirohito) nel Palazzo Imperiale (*K\u014dkyo*) e sede del Gran Quartier Generale Imperiale (*Daihonei*). Il 26 febbraio 1936 la citt\u00e0 \u00e8 sconvolta dal tentato golpe militare dei giovani ufficiali (Incidente del 26 Febbraio - *Ni-Ni-Roku Jiken*), represso dall'Imperatore con la proclamazione della legge marziale.",
    s2_4: "Con l'inizio della guerra con la Cina (1937), il Daihonei a Tokyo assume la direzione unificata delle operazioni belliche terrestri e navali; il Parlamento approva la Legge di Mobilitazione Nazionale Generale (aprile 1938); parate trionfali e mobilitazione patriottica.",
    s5_7: "Nell'estate 1940 Tokyo vede la nascita del Taisei Yokusankai (partito unico di mobilitazione totalitaria) sotto Konoe; il 27 settembre 1940 viene siglato il Patto Tripartito con Germania e Italia; inizio del razionamento severo di riso, carbone e benzina.",
    s8: "Il 13 aprile 1941 il ministro Y\u014dsuke Matsuoka ratifica a Mosca il Patto di Neutralit\u00e0 con Stalin. Nelle sale del Palazzo Imperiale e del Daihonei, tra l'estate e l'autunno 1941, le Conferenze Imperiali (*Gozen Kaigi*) presiedute dal generale Hideki T\u014dj\u014d deliberano l'attacco preventivo contro gli Alleati nel Pacifico (Operazione Hawaii).",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP14": {
    id: "JP14",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Kanagawa",
    nutsName: "Kanagawa (Yokohama e Base Navale di Yokosuka)",
    nameLatn: "Kanagawa-ken",
    nameEngl: "Kanagawa Prefecture",
    modernName: "Prefettura di Kanagawa (Yokohama e Distretto Navale di Yokosuka, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Kanagawa-ken (Arsenale e Distretto Navale di Yokosuka)",
    adminTitle: "Dai Nippon Teikoku \u2014 Distretto Navale di Yokosuka (Yokosuka Chinjufu)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a Yokohama, principale porto commerciale estero del paese; ospita l'Arsenale e Distretto Navale di **Yokosuka** (*Yokosuka Chinjufu*), la pi\u00f9 importante base navale della Flotta Combinata con imponenti bacini di carenaggio per navi da battaglia e portaerei.",
    s2_4: "L'Arsenale di Yokosuka e i cantieri costieri lavorano giorno e notte alla conversione, riparazione e ammodernamento delle navi da guerra impegnate nelle operazioni in Cina; la zona industriale Keihin tra Yokohama e Kawasaki espande la chimica e la meccanica bellica.",
    s5_7: "Varie unit\u00e0 maggiori della flotta e sottomarini oceanici vengono allestiti nei bacini segreti di Yokosuka; misure di censura militare totale sulle attivit\u00e0 della rada e dei cantieri navali.",
    s8: "Roccaforte navale suprema dell'Impero del Sol Levante; a Yokosuka e Yokohama si completano gli ultimi preparativi tecnici e il rifornimento siluri per le navi della flotta dell'ammiraglio Nagumo.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP15": {
    id: "JP15",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Niigata",
    nutsName: "Niigata (Porto sul Mar del Giappone e Isola di Sado)",
    nameLatn: "Niigata-ken",
    nameEngl: "Niigata Prefecture",
    modernName: "Prefettura di Niigata (Isola di Sado, Chubu, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Niigata-ken (Porto d'Oltremare di Niigata & Isola di Sado)",
    adminTitle: "Dai Nippon Teikoku \u2014 Niigata-ken (Raffinerie di Niitsu & Miniere d'Oro di Sado)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Grande porto marittimo sul Mar del Giappone, punto di partenza delle rotte commerciali veloci verso Chongjin e Rason in Corea e Vladivostok; include le antiche miniere d'oro dell'Isola di Sado e le raffinerie petrolifere di Niitsu.",
    s2_4: "Il porto di Niigata diviene uno dei principali scali di smistamento per minerali, fertilizzanti chimici e legname importati dalla Manciuria e dalla Corea settentrionale.",
    s5_7: "Espansione degli impianti carbo-chimici e di alluminio della Nihon Soda; ammasso delle ingenti quote di riso della fertile pianura di Echigo per la sussistenza della popolazione urbana.",
    s8: "Terminale marittimo strategico per la continuit\u00e0 dei rifornimenti dal continente asiatico attraverso la rotta interna protetta del Mar del Giappone.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP16": {
    id: "JP16",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Toyama",
    nutsName: "Toyama (Idroelettrico di Kurobe e Alluminio)",
    nameLatn: "Toyama-ken",
    nameEngl: "Toyama Prefecture",
    modernName: "Prefettura di Toyama (Chubu, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Toyama-ken (Idroelettrico di Kurobe & Industria Chimica)",
    adminTitle: "Dai Nippon Teikoku \u2014 Toyama-ken (Bacino Idroelettrico e Metallurgico)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a Toyama; provincia bagnata dal Mar del Giappone e dominata dalle Alpi settentrionali, celebre per la colossale energia idroelettrica della Gola di Kurobe e polo chimico dei fertilizzanti e dell'alluminio.",
    s2_4: "L'alluminio raffinato nelle fonderie di Toyama grazie all'energia idroelettrica dei fiumi alpini diventa la materia prima prioritaria per la costruzione dei velivoli delle ditte Mitsubishi e Nakajima.",
    s5_7: "Inaugurazione di nuovi sbarramenti idroelettrici lungo la forra di Kurobe; incremento dell'estrazione di zinco e piombo nelle miniere di Kamioka.",
    s8: "Centrale energetica e fonderia d'alluminio di primaria grandezza strategica a supporto dell'industria aeronautica da guerra.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP17": {
    id: "JP17",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Ishikawa",
    nutsName: "Ishikawa (Kanazawa e Nona Divisione)",
    nameLatn: "Ishikawa-ken",
    nameEngl: "Ishikawa Prefecture",
    modernName: "Prefettura di Ishikawa (Kanazawa, Chubu, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Ishikawa-ken (Sede della 9\u00aa Divisione Kanazawa)",
    adminTitle: "Dai Nippon Teikoku \u2014 Ishikawa-ken (Comando Militare di Kanazawa & Penisola di Noto)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Kanazawa \u00e8 la capitale storica della regione di Hokuriku (antico feudo Kaga dei Maeda); prestigioso centro universitario e sede del Quartier Generale della 9\u00aa Divisione dell'Esercito Imperiale; comprende la protesa Penisola di Noto.",
    s2_4: "La 9\u00aa Divisione di Kanazawa viene impiegata nelle operazioni d'invasione della Cina centrale (Battaglia di Shanghai e avanzata su Nanchino); mobilitazione delle manifatture tessili seriche di Noto.",
    s5_7: "Riconversione degli opifici serici alla produzione di seta artificiale e paracadute per le truppe d'assalto dell'esercito e della marina.",
    s8: "Baluardo militare e logistico sulla costa del Mar del Giappone, con basi aeree ausiliarie dislocate sull'altopiano di Komatsu.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP18": {
    id: "JP18",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Fukui",
    nutsName: "Fukui (Porto di Tsuruga e Rayon)",
    nameLatn: "Fukui-ken",
    nameEngl: "Fukui Prefecture",
    modernName: "Prefettura di Fukui (Chubu, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Fukui-ken (Porto Internazionale di Tsuruga)",
    adminTitle: "Dai Nippon Teikoku \u2014 Fukui-ken (Polo Tessile di Fukui & Porto di Tsuruga)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a Fukui; grande centro della tessitura della seta e del rayon; ospita a Tsuruga il porto storico pi\u00f9 antico di collegamento con la Russia asiatica e la ferrovia Transiberiana.",
    s2_4: "Il porto di Tsuruga registra un traffico intenso di scambi commerciali e diplomatici transiberiani prima del blocco europeo; espansione delle industrie per ottiche di precisione.",
    s5_7: "Tra il 1940 e il 1941 Tsuruga diviene il celebre 'porto della salvezza': migliaia di rifugiati ebrei in fuga dalla Polonia e dalla Lituania sbarcano qui grazie ai 'visti per la vita' concessi dal console Chiune Sugihara.",
    s8: "Terminale marittimo strategico sorvegliato dalla marina imperiale per i collegamenti marittimi con la costa continentale asiatica.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP19": {
    id: "JP19",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Yamanashi",
    nutsName: "Yamanashi (K\u014dfu e Versante Nord del Monte Fuji)",
    nameLatn: "Yamanashi-ken",
    nameEngl: "Yamanashi Prefecture",
    modernName: "Prefettura di Yamanashi (Kofu, Monte Fuji, Chubu, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Yamanashi-ken (Bacino di K\u014dfu e Sacro Monte Fuji)",
    adminTitle: "Dai Nippon Teikoku \u2014 Yamanashi-ken (Distretto Rurale e Silvicolo)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a K\u014dfu; dominata dalla maestosa mole vulcanica del Monte Fuji, simbolo eterno dell'Impero; rinomata per l'estrazione e taglio del cristallo di quarzo, la sericoltura e la frutticoltura.",
    s2_4: "I cristalli di quarzo di Yamanashi vengono impiegati per i risonatori e oscillatori delle radio militari di bordo dell'Aviazione e della Marina.",
    s5_7: "Requisizione dei bozzoli da seta e ammasso forzato della frutta e dei cereali per le razioni militari dell'esercito imperiale.",
    s8: "Territorio interno protetto dalle montagne alpine, impiegato per il decentramento di magazzini e riserve governative lontano dalla costa.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP20": {
    id: "JP20",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Nagano",
    nutsName: "Nagano (Alpi Giapponesi e Meccanica di Precisione)",
    nameLatn: "Nagano-ken",
    nameEngl: "Nagano Prefecture",
    modernName: "Prefettura di Nagano (Alpi Giapponesi, Chubu, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Nagano-ken (Alpi Giapponesi & Sericoltura di Suwa)",
    adminTitle: "Dai Nippon Teikoku \u2014 Nagano-ken (Distretto Alpino e Meccanico)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Il cuore delle Alpi Giapponesi; la conca del Lago Suwa \u00e8 la capitale mondiale della trattura e filatura della seta da esportazione, con nascenti officine di meccanica ed orologeria di precisione (*Seiko*).",
    s2_4: "Con il calo delle esportazioni verso gli Stati Uniti, gli stabilimenti serici di Suwa e Matsumoto vengono convertiti alla fabbricazione di spolette, timer d'artiglieria e giroscopi aeronautici.",
    s5_7: "Massiccia elettrificazione idroelettrica delle valli montane del Kiso e Shinano; arruolamento dei giovani montanari nei reparti da montagna e sciatori dell'esercito.",
    s8: "Distretto montano d'alta quota inespugnabile, individuato dai comandi imperiali come potenziale rifugio sotterraneo e sede d'emergenza (futuro progetto Matsushiro).",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP21": {
    id: "JP21",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Gifu",
    nutsName: "Gifu (Lame di Seki e Aeronautica di Kakamigahara)",
    nameLatn: "Gifu-ken",
    nameEngl: "Gifu Prefecture",
    modernName: "Prefettura di Gifu (Chubu, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Gifu-ken (Arsenale Aeronautico di Kakamigahara & Lame di Seki)",
    adminTitle: "Dai Nippon Teikoku \u2014 Gifu-ken (Stabilimenti Kawasaki Kakamigahara & Fucine di Seki)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a Gifu; Seki \u00e8 la millenaria capitale dei maestri spadai giapponesi, mentre Kakamigahara ospita il grande aeroporto e gli stabilimenti della **Kawasaki K\u014dk\u016bki** (produzione di aerei da caccia e bombardieri leggeri).",
    s2_4: "I mastri forgiatori di Seki lavorano a pieno ritmo alla forgiatura di decine di migliaia di spade militari (*Gunt\u014d*) e baionette Tipo 30 per ufficiali e fanti dell'Esercito; la Kawasaki espande la linea di montaggio dei caccia.",
    s5_7: "Sviluppo a Kakamigahara del caccia intercettore Kawasaki Ki-61 *Hien* con motore raffreddato a liquido su licenza tedesca Daimler-Benz; militarizzazione degli opifici.",
    s8: "Polo aeronautico e di forgiatura delle armi bianche dell'esercito imperiale di massima rilevanza produttiva.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP22": {
    id: "JP22",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Shizuoka",
    nutsName: "Shizuoka (Hamamatsu e Manifattura Bellica di Shimizu)",
    nameLatn: "Shizuoka-ken",
    nameEngl: "Shizuoka Prefecture",
    modernName: "Prefettura di Shizuoka (Chubu, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Shizuoka-ken (Costa di T\u014dkaid\u014d e Porto di Shimizu)",
    adminTitle: "Dai Nippon Teikoku \u2014 Shizuoka-ken (Polo Meccanico di Hamamatsu & Porto di Shimizu)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Si sviluppa lungo il corridoio costiero del T\u014dkaid\u014d con vista sul Monte Fuji; Hamamatsu \u00e8 polo meccanico d'eccellenza (fondazione di Suzuki e Yamaha per strumenti di precisione e telai), mentre Shimizu \u00e8 un attivo porto d'esportazione.",
    s2_4: "Conversione delle officine meccaniche di Hamamatsu e Numazu alla subfornitura di raccordi idraulici, valvole e minuteria metallica per gli stabilimenti aeronautici di Nagoya.",
    s5_7: "Installazione di batterie contraeree lungo la costa pacifica e mobilitazione della flotta peschereccia di Yaizu per la sorveglianza d'altura.",
    s8: "Linea di transito e comunicazione fondamentale del T\u014dkaid\u014d a protezione del corridoio ferroviario che unisce Tokyo a Nagoya e Osaka.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP23": {
    id: "JP23",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Aichi",
    nutsName: "Aichi (Nagoya e Gigante Aeronautico Mitsubishi)",
    nameLatn: "Aichi-ken",
    nameEngl: "Aichi Prefecture",
    modernName: "Prefettura di Aichi (Nagoya, Chubu, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Aichi-ken (Polo Aeronautico Mitsubishi & Arsenale di Nagoya)",
    adminTitle: "Dai Nippon Teikoku \u2014 Aichi-ken (Mitsubishi J\u016bk\u014dgy\u014d Oe & Arsenale di Nagoya)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a **Nagoya**; il cuore pulsante dell'industria aerospaziale e degli armamenti dell'Impero: stabilimenti **Mitsubishi J\u016bk\u014dgy\u014d** (impianti di Oe e Daiko) dove l'ingegnere Jiro Horikoshi progetta i pi\u00f9 avanzati velivoli imbarcati, Arsenale dell'Esercito di Atsuta e stabilimenti Aichi Tokei.",
    s2_4: "Nel 1939-1940 a Nagoya viene sviluppato, collaudato e prodotto il leggendario caccia **Mitsubishi A6M Zero** (Reisen), destinato a dominare i cieli del Pacifico; la produzione bellica di Nagoya cresce a ritmi esponenziali.",
    s5_7: "Nagoya diviene la terza potenza industriale del paese: fabbriche di motori stellari Kinsei e Kasei, carrozzerie corazzate e fucili Tipo 99 all'Arsenale di Nagoya.",
    s8: "La capitale dell'aviazione militare del Sol Levante; dalle catene di montaggio di Nagoya escono i lotti di caccia Zero che andranno a formare il pugno di ferro della flotta di portaerei a Pearl Harbor.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP24": {
    id: "JP24",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Mie",
    nutsName: "Mie (Ise Jing\u016b e Santuario Sacro dell'Impero)",
    nameLatn: "Mie-ken",
    nameEngl: "Mie Prefecture",
    modernName: "Prefettura di Mie (Santuario di Ise, Kansai, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Mie-ken (Grande Santuario di Ise Jing\u016b)",
    adminTitle: "Dai Nippon Teikoku \u2014 Mie-ken (Santuario Supremo di Ise & Baia di Ago)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a Tsu; ospita il **Grande Santuario di Ise** (*Ise Jing\u016b*), il luogo pi\u00f9 sacro dello Scintoismo di Stato dedicato alla dea del sole Amaterasu Omikami, dove l'Imperatore e i ministri si recano in solenne preghiera di Stato; rinomata per le perle coltivate di Toba.",
    s2_4: "I vertici militari dell'Esercito e della Marina compiono continui pellegrinaggi rituali a Ise per annunciare le vittorie in Cina e chiedere la benedizione divina sulle armi dell'Impero.",
    s5_7: "In occasione del 2600\u00b0 anniversario della fondazione dell'Impero (1940), Ise riceve milioni di pellegrini da ogni prefettura e colonia; totale shintoizzazione della vita pubblica.",
    s8: "Il cuore spirituale della nazione imperiale in armi; prima di salpare per l'Operazione Hawaii, i comandanti navali rivolgono preghiere solenni verso i santuari ancestrali di Ise.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP25": {
    id: "JP25",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Shiga",
    nutsName: "Shiga (Lago Biwa e Chimica Sintetica)",
    nameLatn: "Shiga-ken",
    nameEngl: "Shiga Prefecture",
    modernName: "Prefettura di Shiga (Lago Biwa, Kansai, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Shiga-ken (Bacino Idrico del Lago Biwa)",
    adminTitle: "Dai Nippon Teikoku \u2014 Shiga-ken (Distretto del Lago Biwa & Polo Chimico di \u014ctsu)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a \u014ctsu; dominata dal grande **Lago Biwa**, la maggiore riserva d'acqua dolce del Giappone che alimenta le centrali idrauliche e le industrie tessili e chimiche della regione del Kansai (*Toyo Rayon / Toray*).",
    s2_4: "La produzione di fibre sintetiche e rayon di \u014ctsu viene requisita per i teloni da campo e il materiale sanitario dell'armata; controllo rigoroso del bacino fluviale del Seta.",
    s5_7: "Sviluppo di leghe plastiche e resine isolanti per la radiofonia militare negli impianti chimici attorno al lago; ammasso delle produzioni cerealicole vallive.",
    s8: "Polmone idrico e corridoio logistico protetto che collega le coste del Mar del Giappone (Tsuruga) con la pianura industriale di Kyoto e Osaka.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP26": {
    id: "JP26",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Ky\u014dto",
    nutsName: "Kyoto (Antica Capitale e Base di Maizuru)",
    nameLatn: "Ky\u014dto-fu",
    nameEngl: "Kyoto Prefecture",
    modernName: "Prefettura di Kyoto (Antica Capitale e Arsenale di Maizuru, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Ky\u014dto-fu (Antica Capitale & Distretto Navale di Maizuru)",
    adminTitle: "Dai Nippon Teikoku \u2014 Ky\u014dto-fu (Distretto Navale di Maizuru Chinjufu)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Prefettura urbana che unisce la millenaria capitale imperiale di **Ky\u014dto** (Heian-ky\u014d, centro sommo delle arti e sede dell'Universit\u00e0 Imperiale di Kyoto e della 16\u00aa Divisione) al porto navale settentrionale di **Maizuru** (*Maizuru Chinjufu*), arsenale navale e base cacciatorpediniere sul Mar del Giappone.",
    s2_4: "L'Arsenale Navale di Maizuru \u00e8 specializzato nella costruzione e manutenzione dei modernissimi cacciatorpediniere classe *Kager\u014d*; a Kyoto, le officine meccaniche e le industrie della seta convertono la produzione alle forniture belliche.",
    s5_7: "La 16\u00aa Divisione di Kyoto \u00e8 attivamente impegnata sui fronti esteri; Maizuru diviene la base di vigilanza e scorta convogli per il traffico marittimo con la Manciuria e la Corea.",
    s8: "Kyoto \u00e8 preservata come scrigno spirituale e artistico della civilt\u00e0 imperiale, mentre l'arsenale fortificato di Maizuru appronta le squadriglie di siluranti per la guerra navale.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP27": {
    id: "JP27",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "\u014csaka",
    nutsName: "Osaka (Arsenale Militare e Capitale Industriale)",
    nameLatn: "\u014csaka-fu",
    nameEngl: "Osaka Prefecture",
    modernName: "Prefettura di Osaka (Metropoli Industriale, Kansai, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 \u014csaka-fu (Grande Arsenale dell'Esercito & Polo Siderurgico)",
    adminTitle: "Dai Nippon Teikoku \u2014 \u014csaka-fu (Arsenale d'Artiglieria di \u014csaka Rikugun Z\u014dheish\u014d)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "La 'citt\u00e0 delle mille ciminiere', cuore economico e produttivo supremo del Giappone; ospita il colossale **Arsenale d'Artiglieria dell'Esercito di Osaka** (*\u014csaka Rikugun Z\u014dheish\u014d*), la pi\u00f9 grande fabbrica d'artiglieria, cannoni e munizioni pesanti d'Asia, assieme ai colossi industriali Sumitomo, Kubota e Osaka Iron Works.",
    s2_4: "L'Arsenale di Osaka lavora giorno e notte producendo migliaia di pezzi d'artiglieria da campagna, cannoni pesanti d'assedio e proiettili per le armate operanti in Cina; espansione vertiginosa della siderurgia e chimica pesante.",
    s5_7: "La metropoli \u00e8 interamente militarizzata: conversione di tutti gli opifici civili alla meccanica di precisione bellica; severe esercitazioni antiaeree per proteggere l'immenso bacino industriale di Hanshin.",
    s8: "La fucina dell'armamento pesante dell'Impero del Sol Levante; da Osaka proviene la quasi totalit\u00e0 dell'artiglieria d'assedio e campale dell'Esercito Imperiale Giapponese.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP28": {
    id: "JP28",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Hy\u014dgo",
    nutsName: "Hyogo (Porto di K\u014dbe e Cantieri Kawasaki)",
    nameLatn: "Hy\u014dgo-ken",
    nameEngl: "Hyogo Prefecture",
    modernName: "Prefettura di Hyogo (Kobe, Cantieri Kawasaki e Awaji, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Hy\u014dgo-ken (Grande Porto e Cantieri Navali di K\u014dbe)",
    adminTitle: "Dai Nippon Teikoku \u2014 Hy\u014dgo-ken (Cantieri Kawasaki J\u016bk\u014dgy\u014d & Mitsubishi K\u014dbe)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a **K\u014dbe**, il pi\u00f9 grande porto oceanico commerciale del Giappone; ospita i colossi della cantieristica e ingegneria navale pesante **Kawasaki J\u016bk\u014dgy\u014d** e **Mitsubishi Z\u014dsen**, specializzati nella costruzione di navi da battaglia, sommergibili e locomotive; include l'Isola di Awaji.",
    s2_4: "I cantieri di Kobe allestiscono e varano sottomarini oceanici di grande autonomia e navi mercantili ausiliarie per il rifornimento marittimo del fronte cinese.",
    s5_7: "Gli impianti Kawasaki K\u014dk\u016bki e Kobe Steel accelerano la fabbricazione di corazze d'acciaio, motori aeronautici e siluri per la Marina Imperiale.",
    s8: "Porto d'imbarco e polo cantieristico di primaria grandezza strategica per la Flotta Imperiale, collegato al Mare Interno di Seto.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP29": {
    id: "JP29",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Nara",
    nutsName: "Nara (Antica Capitale Heij\u014d-ky\u014d e Foreste di Yoshino)",
    nameLatn: "Nara-ken",
    nameEngl: "Nara Prefecture",
    modernName: "Prefettura di Nara (Antica Capitale, Kansai, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Nara-ken (Culla Storica di Yamato & T\u014ddai-ji)",
    adminTitle: "Dai Nippon Teikoku \u2014 Nara-ken (Distretto Culturale e Storico di Yamato)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capitale imperiale dell'VIII secolo (Heij\u014d-ky\u014d); culla originaria della civilt\u00e0 giapponese e della provincia classica di Yamato; sede del Grande Buddha del T\u014ddai-ji e dei santuari shintoisti di Kasuga e Kashihara.",
    s2_4: "Nel 1940 il Santuario di Kashihara a Nara diviene il fulcro delle celebrazioni nazionali per il 2600\u00b0 anniversario dell'ascesa al trono del mitico primo imperatore Jinmu.",
    s5_7: "Sfruttamento delle pregiate foreste di cedro e cipresso di Yoshino per legname da carpenteria navale e fortificazioni sotterranee.",
    s8: "Oasi spirituale e riserva agricola del bacino di Yamato, tenuta al riparo dallo sviluppo industriale intensivo.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP30": {
    id: "JP30",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Wakayama",
    nutsName: "Wakayama (Penisola di Kii e K\u014dyasan)",
    nameLatn: "Wakayama-ken",
    nameEngl: "Wakayama Prefecture",
    modernName: "Prefettura di Wakayama (Kansai, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Wakayama-ken (Penisola di Kii & Monti di K\u014dyasan)",
    adminTitle: "Dai Nippon Teikoku \u2014 Wakayama-ken (Polo Metallurgico Sumitomo & Porti di Kii)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Si estende lungo la Penisola di Kii; ospita la sede sacra del Buddismo Shingon sul Monte K\u014dya (*K\u014dyasan*) e le acciaierie e tubifici del gruppo Sumitomo (*Sumitomo Kinzoku*) a Wakayama.",
    s2_4: "Gli stabilimenti Sumitomo di Wakayama forniscono tubi senza saldatura e bossoli speciali per le artiglierie dell'esercito e della marina.",
    s5_7: "Pattugliamento litoraneo del canale di Kii a protezione della rotta d'accesso meridionale ai porti industriali di Osaka e Kobe.",
    s8: "Presidio costiero d'avvistamento e snodo metallurgico specializzato nella produzione di componenti corazzate.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP31": {
    id: "JP31",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Tottori",
    nutsName: "Tottori (Dune Costiere e San'in)",
    nameLatn: "Tottori-ken",
    nameEngl: "Tottori Prefecture",
    modernName: "Prefettura di Tottori (Chugoku, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Tottori-ken (Costa di San'in)",
    adminTitle: "Dai Nippon Teikoku \u2014 Tottori-ken (Distretto Agricolo e Costiero di San'in)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Provincia costiera di San'in sul Mar del Giappone; celebre per le sue dune sabbiose, l'agricoltura collinare (pere e riso) e la pesca costiera d'altura.",
    s2_4: "Integrazione delle cooperative agricole per l'ammasso cerealicolo; mobilitazione dei boscaioli per il rifornimento di traversine per le ferrovie coloniali.",
    s5_7: "Presidio costiero della gendarmeria contro possibili infiltrazioni sottomarine e vigilanza sui porti pescherecci.",
    s8: "Area costiera pacificata sul Mar del Giappone, deputata alla sussistenza alimentare e all'addestramento della milizia locale.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP32": {
    id: "JP32",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Shimane",
    nutsName: "Shimane (Izumo Taisha e Isole Oki)",
    nameLatn: "Shimane-ken",
    nameEngl: "Shimane Prefecture",
    modernName: "Prefettura di Shimane (Isole Oki e Izumo, Chugoku, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Shimane-ken (Grande Santuario di Izumo & Isole Oki)",
    adminTitle: "Dai Nippon Teikoku \u2014 Shimane-ken (Santuario di Izumo Taisha & Arcipelago Oki)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a Matsue; ospita il celeberrimo **Grande Santuario di Izumo** (*Izumo Taisha*), uno dei templi scintoisti pi\u00f9 venerati dell'Impero; include lo strategico arcipelago delle **Isole Oki** nel Mar del Giappone.",
    s2_4: "Le Isole Oki vengono dotate di fari militarizzati e posti d'osservazione ottica per monitorare il transito navale tra il Mar del Giappone e lo Stretto di Corea.",
    s5_7: "Il santuario di Izumo diviene meta di costanti cerimonie scintoiste per il successo delle armi imperiali; estrazione di ferro sabbioso tradizionale (*Tatara*) per leghe speciali.",
    s8: "Avamposto insulare avanzato nelle Isole Oki a guardia della rotta interna tra il Giappone continentale e la penisola coreana.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP33": {
    id: "JP33",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Okayama",
    nutsName: "Okayama (Mare Interno e Cantieri di Tamano)",
    nameLatn: "Okayama-ken",
    nameEngl: "Okayama Prefecture",
    modernName: "Prefettura di Okayama (Chugoku, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Okayama-ken (Cantieri Navali di Tamano)",
    adminTitle: "Dai Nippon Teikoku \u2014 Okayama-ken (Cantieri Mitsui Z\u014dsen & Industria Kurashiki)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Affacciata sulle acque protette del Mare Interno di Seto; ospita a Tamano i grandi cantieri navali **Mitsui Z\u014dsen** e a Kurashiki le avveniristiche industrie tessili del rayon (*Kurashiki Kenshi / Kuraray*).",
    s2_4: "I cantieri Mitsui di Tamano costruiscono navi mercantili veloci, petroliere di flotta e scafi per la Marina Imperiale; conversione degli stabilimenti Kurashiki a tele per equipaggiamenti militari.",
    s5_7: "Espansione delle banchine di carenaggio a Tamano per la produzione e manutenzione di cacciatorpediniere e fregate di scorta (*Kaib\u014dkan*).",
    s8: "Cantiere navale protetto all'interno del bacino calmo del Mare di Seto, vitale per la flotta ausiliaria dell'Impero.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP34": {
    id: "JP34",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Hiroshima",
    nutsName: "Hiroshima (Arsenale di Kure e Corazzata Yamato)",
    nameLatn: "Hiroshima-ken",
    nameEngl: "Hiroshima Prefecture",
    modernName: "Prefettura di Hiroshima (Arsenale di Kure e Sede della 5\u00aa Divisione, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Hiroshima-ken (Arsenale Navale di Kure & Porto di Ujina)",
    adminTitle: "Dai Nippon Teikoku \u2014 Distretto Navale di Kure (Kure Chinjufu & Kaigun K\u014dsh\u014d)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a Hiroshima, sede della storica 5\u00aa Divisione dell'Esercito e del porto militare d'imbarco di Ujina; comprende il leggendario **Arsenale Navale di Kure** (*Kure Kaigun K\u014dsh\u014d*), la pi\u00f9 formidabile base e arsenale navale della Marina Imperiale, dove viene progettata e impostata in segreto assoluto la super-corazzata ***Yamato***.",
    s2_4: "Dal porto di Ujina salpano centinaia di migliaia di fanti per la guerra in Cina; nei bacini coperti di Kure migliaia di operai e ingegneri lavorano giorno e notte alla corazzata Yamato protetti da mura e reti mimetiche.",
    s5_7: "Nell'agosto 1940 la super-corazzata Yamato viene varata a Kure nel massimo segreto; la baia di Hiroshima ospita la fonda delle unit\u00e0 maggiori della Flotta Combinata dell'ammiraglio Isoroku Yamamoto.",
    s8: "Il santuario operativo della Marina Imperiale; a bordo della corazzata *Nagato* ormeggiata nella baia di Kure/Hashirajima, l'ammiraglio Yamamoto emette il fatidico Ordine Operativo N. 1 per l'attacco a Pearl Harbor.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP35": {
    id: "JP35",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Yamaguchi",
    nutsName: "Yamaguchi (Stretto di Shimonoseki e Porto di Moji)",
    nameLatn: "Yamaguchi-ken",
    nameEngl: "Yamaguchi Prefecture",
    modernName: "Prefettura di Yamaguchi (Stretto di Shimonoseki, Chugoku, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Yamaguchi-ken (Stretto di Shimonoseki / Bivio di Ch\u014dsh\u016b)",
    adminTitle: "Dai Nippon Teikoku \u2014 Yamaguchi-ken (Fortezza dello Stretto di Shimonoseki)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Perno strategico di collegamento tra Honsh\u016b e Ky\u016bsh\u016b; Shimonoseki \u00e8 il terminale della ferrovia San'yo e dei traghetti veloci *Kampu Renrakusen* per Busan (Corea); culla storica dei leader Meiji (feudo di Ch\u014dsh\u016b); impianti chimici a Ube.",
    s2_4: "Shimonoseki smista flussi continui di convogli militari verso il continente asiatico; iniziano i colossali lavori per lo scavo del Tunnel Sottomarino Kanmon per unire fisicamente Honsh\u016b e Ky\u016bsh\u016b via ferrovia.",
    s5_7: "Fortificazione pesante dello Stretto di Shimonoseki con batterie di cannoni in caverna, reti parasiluri e stazioni idrofoniche per sbarrare l'accesso al Mare Interno di Seto.",
    s8: "La porta di bronzo dell'Impero verso l'Asia continentale; terminale ferroviario e navale di massima sicurezza ad alta frequenza di traffico militare.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP36": {
    id: "JP36",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Tokushima",
    nutsName: "Tokushima (Canale di Kii e Vortici di Naruto)",
    nameLatn: "Tokushima-ken",
    nameEngl: "Tokushima Prefecture",
    modernName: "Prefettura di Tokushima (Shikoku, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Tokushima-ken (Porta Orientale di Shikoku)",
    adminTitle: "Dai Nippon Teikoku \u2014 Tokushima-ken (Distretto Costiero di Awa)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Situata all'estremit\u00e0 orientale dell'isola di Shikoku lungo il canale di Kii; celebre per i vortici marini dello stretto di Naruto e la coltivazione tradizionale dell'indaco e del riso.",
    s2_4: "Controllo del traffico marittimo costiero per la protezione dell'imboccatura del Mare Interno di Seto; ammasso delle scorte alimentari e mobilitazione agricola.",
    s5_7: "Installazione di vedette ottiche e riflettori notturni per la difesa aerea e navale dell'accesso orientale al Kansai.",
    s8: "Territorio costiero integrato nel sistema difensivo perimetrale del Mare Interno di Seto.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP37": {
    id: "JP37",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Kagawa",
    nutsName: "Kagawa (Takamatsu e Traghetti di Uno)",
    nameLatn: "Kagawa-ken",
    nameEngl: "Kagawa Prefecture",
    modernName: "Prefettura di Kagawa (Takamatsu, Shikoku, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Kagawa-ken (Traghetti di Seto & Takamatsu)",
    adminTitle: "Dai Nippon Teikoku \u2014 Kagawa-ken (Snodo Ferroviario Marittimo di Takamatsu)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a Takamatsu; la pi\u00f9 piccola prefettura del paese per superficie, perno delle comunicazioni tra Honsh\u016b e Shikoku grazie ai traghetti ferroviari Uno-Takamatsu; saline costiere e risaie.",
    s2_4: "I traghetti di Takamatsu trasferiscono a getto continuo reclute e rifornimenti agricoli da Shikoku verso la ferrovia principale di Honsh\u016b.",
    s5_7: "Conversione delle manifatture locali a forniture per la Marina; requisizione del sale marino per le industrie chimiche dell'Asse.",
    s8: "Piattaforma di raccordo logistico insulare protetta all'interno del Mare Interno di Seto.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP38": {
    id: "JP38",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Ehime",
    nutsName: "Ehime (Miniere di Rame di Besshi e Matsuyama)",
    nameLatn: "Ehime-ken",
    nameEngl: "Ehime Prefecture",
    modernName: "Prefettura di Ehime (Matsuyama e Rame di Besshi, Shikoku, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Ehime-ken (Miniera di Rame di Besshi & Niihama)",
    adminTitle: "Dai Nippon Teikoku \u2014 Ehime-ken (Complesso Metallurgico Sumitomo Besshi)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a Matsuyama; ospita a Niihama il colossale distretto industriale e minerario della **Miniera di Rame di Besshi** (*Sumitomo*), una delle pi\u00f9 profonde e ricche miniere di rame al mondo, spina dorsale del colosso Sumitomo.",
    s2_4: "Le fonderie di rame e le officine chimiche di Niihama lavorano a ritmo serrato per fornire rame elettrolitico, acido solforico ed esplosivi all'esercito e alla marina.",
    s5_7: "Espansione della base aerea di Matsuyama e delle industrie di leghe d'alluminio a Niihama per le necessit\u00e0 dell'arma aerea.",
    s8: "Distretto cuprifero e chimico d'importanza capitale per la capacit\u00e0 produttiva di munizioni dell'Impero.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP39": {
    id: "JP39",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "K\u014dchi",
    nutsName: "K\u014dchi (Costa Pacifica di Tosa)",
    nameLatn: "K\u014dchi-ken",
    nameEngl: "K\u014dchi Prefecture",
    modernName: "Prefettura di Kochi (Tosa, Shikoku, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 K\u014dchi-ken (Antico Feudo di Tosa)",
    adminTitle: "Dai Nippon Teikoku \u2014 K\u014dchi-ken (Distretto Costiero di Tosa)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Aperta sulle onde oceaniche del Pacifico meridionale; terra d'origine di pionieri marittimi e dei fondatori del gruppo Mitsubishi (*Yataro Iwasaki*); ricca di fitte foreste montane e pesca del tonno.",
    s2_4: "I pescatori d'altura di K\u014dchi e le loro motobarche vengono mobilitati nei corpi ausiliari di pattugliamento oceanico della Marina Imperiale.",
    s5_7: "Intensificazione del taglio del legname da mina nelle valli del fiume Shimanto; costruzione di postazioni d'avvistamento radar e ottico a Capo Ashizuri.",
    s8: "Avamposto oceanico a sud di Shikoku a guardia delle rotte aeronavali provenienti dal Pacifico centrale.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP40": {
    id: "JP40",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Fukuoka",
    nutsName: "Fukuoka (Acciaierie Statali di Yawata e Carbone di Chikuh\u014d)",
    nameLatn: "Fukuoka-ken",
    nameEngl: "Fukuoka Prefecture",
    modernName: "Prefettura di Fukuoka (Acciaierie di Yawata, Kyushu, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Fukuoka-ken (Acciaierie di Yawata & Bacino di Chikuh\u014d)",
    adminTitle: "Dai Nippon Teikoku \u2014 Fukuoka-ken (Acciaierie Statali Yawata Seitetsu & Porto di Moji)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capitale energetica e siderurgica assoluta del Giappone: ospita le monumentali **Acciaierie Statali di Yawata** (*Yawata Seitetsu*), che producono da sole oltre la met\u00e0 dell'acciaio grezzo dell'Impero, alimentate dal vastissimo bacino carbonifero di Chikuh\u014d e dal porto di Moji.",
    s2_4: "Gli altiforni di Yawata operano a ciclo continuo giorno e notte per produrre le rotaie, le lamiere navali e i lingotti d'acciaio necessari alla guerra; il porto di Moji smista un volume immenso di truppe e rifornimenti.",
    s5_7: "Migliaia di minatori e operai, inclusi contingenti di lavoratori forzati coreani (*Ch\u014dy\u014drei*), vengono impiegati nei pozzi di carbone di Chikuh\u014d per mantenere la produzione di coke siderurgico.",
    s8: "Il cuore d'acciaio dell'Impero Giapponese; l'impianto industriale pi\u00f9 protetto da difese antiaeree dell'intero arcipelago metropolitano.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP41": {
    id: "JP41",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Saga",
    nutsName: "Saga (Pianura di Saga e Mare di Ariake)",
    nameLatn: "Saga-ken",
    nameEngl: "Saga Prefecture",
    modernName: "Prefettura di Saga (Kyushu, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Saga-ken (Pianura Agricola di Saga)",
    adminTitle: "Dai Nippon Teikoku \u2014 Saga-ken (Distretto Agricolo di Saga & Porcellane di Arita)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a Saga; fertile piana agricola che si affaccia sul Mare di Ariake; celebre per le storiche manifatture di porcellana di Arita e Imari e la risicoltura ad alto rendimento.",
    s2_4: "Ammasso obbligatorio dei raccolti risicoli per alimentare la forza lavoro industriale delle vicine acciaierie di Yawata e dei cantieri di Nagasaki.",
    s5_7: "Riconversione delle fornaci ceramiche di Arita alla produzione di ceramiche refrattarie industriali e isolatori elettrici per usi bellici.",
    s8: "Retrovia agricola e logistica pacifica della regione settentrionale di Ky\u016bsh\u016b.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP42": {
    id: "JP42",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Nagasaki",
    nutsName: "Nagasaki (Cantieri Mitsubishi, Base di Sasebo e Tsushima)",
    nameLatn: "Nagasaki-ken",
    nameEngl: "Nagasaki Prefecture",
    modernName: "Prefettura di Nagasaki (Tsushima, Iki, Goto, Sasebo, Kyushu, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Nagasaki-ken (Cantieri Navali Mitsubishi & Base di Sasebo)",
    adminTitle: "Dai Nippon Teikoku \u2014 Distretto Navale di Sasebo (Sasebo Chinjufu & Mitsubishi Z\u014dsen)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Polo navale e cantieristico strategico: ospita i grandiosi cantieri **Mitsubishi Z\u014dsen** a Nagasaki (dove viene impostata la seconda super-corazzata, la ***Musashi***) e l'Arsenale e Distretto Navale fortificato di **Sasebo** (*Sasebo Chinjufu*); comprende le isole di **Tsushima**, **Iki** e **Got\u014d** nello Stretto di Corea.",
    s2_4: "La base navale di Sasebo \u00e8 il perno del pattugliamento dello Stretto di Corea e del rifornimento della flotta operativa in Cina; a Nagasaki la costruzione della Musashi procede nel segreto pi\u00f9 rigoroso sotto enormi tettoie di corda e legno.",
    s5_7: "Il 1\u00b0 novembre 1940 a Nagasaki viene varata in segreto la super-corazzata *Musashi*; le miniere sottomarine di carbone di Hashima ('Gunkanjima') lavorano a ritmi forzati per fornire carbone fossile.",
    s8: "Fortezza navale e cantieristica formidabile; Sasebo prepara le squadre di cacciatorpediniere d'attacco, mentre le batterie pesanti di Tsushima blindano lo Stretto di Corea contro qualunque incursione nemica.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP43": {
    id: "JP43",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Kumamoto",
    nutsName: "Kumamoto (Sesta Divisione e Monte Aso)",
    nameLatn: "Kumamoto-ken",
    nameEngl: "Kumamoto Prefecture",
    modernName: "Prefettura di Kumamoto (Kyushu, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Kumamoto-ken (Sede della 6\u00aa Divisione Kumamoto)",
    adminTitle: "Dai Nippon Teikoku \u2014 Kumamoto-ken (Comando Militare di Kumamoto & Monte Aso)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a Kumamoto; dominata dalla grandiosa fortezza medievale e sede del Quartier Generale della temibile **6\u00aa Divisione** dell'Esercito Imperiale; comprende l'imponente caldera attiva del Monte Aso.",
    s2_4: "La 6\u00aa Divisione di Kumamoto \u00e8 in prima linea nella campagna di Cina (conquista e massacro di Nanchino, battaglia di Wuhan); Kumamoto diviene il centro di smistamento dei rincalzi di Ky\u016bsh\u016b.",
    s5_7: "Addestramento intensivo delle nuove reclute di fanteria; mobilitazione delle produzioni agrarie e zootecniche della piana di Higo.",
    s8: "Presidio militare di prima classe e centro di comando per le difese territoriali dell'isola di Ky\u016bsh\u016b.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP44": {
    id: "JP44",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "\u014cita",
    nutsName: "\u014cita (Baia di Saeki e Canale di Bungo)",
    nameLatn: "\u014cita-ken",
    nameEngl: "\u014cita Prefecture",
    modernName: "Prefettura di Oita (Bungo e Baia di Saeki, Kyushu, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 \u014cita-ken (Baia Navale di Saeki & Canale di Bungo)",
    adminTitle: "Dai Nippon Teikoku \u2014 \u014cita-ken (Base Navale Ausiliaria di Saeki)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a \u014cita; comprende la profonda rada naturale della Baia di **Saeki** affacciata sullo Stretto di Bungo (sbocco meridionale del Mare di Seto), con le ricche miniere d'oro di Taio.",
    s2_4: "La baia di Saeki viene impiegata dalla Marina Imperiale come rada d'ancoraggio protetta per le grandi manovre combinate della flotta da battaglia.",
    s5_7: "Potenziamento delle installazioni costiere di Saeki con campi d'aviazione navale e depositi carburante corazzati.",
    s8: "Nel novembre 1941 la Baia di Saeki \u00e8 il punto segreto di concentramento della 1\u00aa Flotta Aerea dell'ammiraglio Ch\u016bichi Nagumo: da qui le sei portaerei salpano per la rada delle Curili (Hitokappu) prima di sferrare l'attacco su Pearl Harbor.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP45": {
    id: "JP45",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Miyazaki",
    nutsName: "Miyazaki (Radici Ancestrali di Hy\u016bga)",
    nameLatn: "Miyazaki-ken",
    nameEngl: "Miyazaki Prefecture",
    modernName: "Prefettura di Miyazaki (Kyushu, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Miyazaki-ken (Antica Terra di Hy\u016bga)",
    adminTitle: "Dai Nippon Teikoku \u2014 Miyazaki-ken (Santuario di Miyazaki Jing\u016b)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Distesa lungo la costa sud-orientale di Ky\u016bsh\u016b; terra mitologica di Hy\u016bga da cui mosse l'Imperatore Jinmu per fondare l'Impero; rinomata per l'allevamento equino militare e la silvicoltura.",
    s2_4: "Nel 1940 i santuari di Miyazaki e Takachiho sono al centro delle colossali cerimonie per il 2600\u00b0 anniversario della fondazione imperiale; mobilitazione dei cavalli da soma per i reparti d'artiglieria.",
    s5_7: "Costruzione di piste d'aviazione costiere per la scorta aeronavale dei convogli mercantili lungo la rotta marittima meridionale.",
    s8: "Baluardo costiero pacifica e centro spirituale del mito imperiale Sh\u014dwa.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP46": {
    id: "JP46",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Kagoshima",
    nutsName: "Kagoshima (Satsuma, Baia di Kink\u014d e Isole del Sud)",
    nameLatn: "Kagoshima-ken",
    nameEngl: "Kagoshima Prefecture",
    modernName: "Prefettura di Kagoshima (Satsuma, Yakushima, Tanegashima, Kyushu, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Kagoshima-ken (Antico Feudo di Satsuma & Baia di Kink\u014d)",
    adminTitle: "Dai Nippon Teikoku \u2014 Kagoshima-ken (Distretto di Satsuma & Base di Kanoya)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Capoluogo a **Kagoshima**, antico e fiero feudo di Satsuma culla dei comandanti storici della Marina (ammiraglio T\u014dg\u014d Heihachir\u014d); affacciata sulla spettacolare baia di Kink\u014d dominata dal vulcano attivo Sakurajima; include le grandi isole di **Yakushima** e **Tanegashima**.",
    s2_4: "Ospita a **Kanoya** una delle pi\u00f9 grandi basi aeree della Marina Imperiale, specializzata nell'addestramento al siluramento aereo e bombardamento in picchiata.",
    s5_7: "Nella rada di Kagoshima i piloti aerosiluranti dell'ammiraglio Yamamoto conducono segretissime esercitazioni a bassissima quota, simulando la morfologia della baia di Pearl Harbor grazie alla conformazione simile della baia di Kink\u014d.",
    s8: "La base aeronavale di Kanoya e la baia di Kagoshima completano l'addestramento supremo degli equipaggi dei bombardieri B5N 'Kate' pronti a colpire le corazzate statunitensi alle Hawaii.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP47": {
    id: "JP47",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Okinawa",
    nutsName: "Okinawa (Isole Ry\u016bky\u016b, Naha e Amami)",
    nameLatn: "Okinawa-ken",
    nameEngl: "Okinawa Prefecture",
    modernName: "Prefettura di Okinawa (Isole Ryukyu, Naha e Amami, Giappone)",
    historicalName: "Dai Nippon Teikoku \u2014 Okinawa-ken (Arcipelago delle Ry\u016bky\u016b)",
    adminTitle: "Dai Nippon Teikoku \u2014 Okinawa-ken (Sede di Naha & Isole Ry\u016bky\u016b)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Comprende l'intero arco insulare delle Ry\u016bky\u016b (annesso nel 1879, antico Regno delle Ry\u016bky\u016b) da Amami \u014cshima fino a Miyako e Yaeyama (Ishigaki); capoluogo a Naha; economia basata su canna da zucchero, batate e pesca.",
    s2_4: "Okinawa assume un ruolo geostrategico eccezionale come ponte logistico e aereo tra l'arcipelago metropolitano e la colonia di Taiwan; espansione delle basi per idrovolanti e stazioni radio.",
    s5_7: "Campagna intensa di assimilazione linguistica e culturale della popolazione locale (*K\u014dminka*); fortificazione delle baie coralline e piste aeree militari d'emergenza.",
    s8: "Avamposto insulare avanzato a presidio del Mar Cinese Orientale e delle rotte marittime meridionali verso Taiwan e il Sud-Est asiatico.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP_KARAFUTO": {
    id: "JP_KARAFUTO",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Karafuto",
    nutsName: "Karafuto (Sachalin Meridionale \u2014 Toyohara)",
    nameLatn: "Karafuto-ch\u014d",
    nameEngl: "Karafuto Prefecture (Southern Sakhalin)",
    modernName: "Sachalin Meridionale (Karafuto, Russia / storicamente Giappone 1905-1945)",
    historicalName: "Dai Nippon Teikoku \u2014 Karafuto (Sachalin Meridionale \u2014 Toyohara)",
    adminTitle: "Dai Nippon Teikoku \u2014 Karafuto-ch\u014d (Sede Governatoriale di Toyohara)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Territorio coloniale istituito dopo la vittoria nella Guerra Russo-Giapponese col Trattato di Portsmouth del 1905, corrispondente alla parte di Sachalin a sud del 50\u00b0 parallelo; capoluogo a Toyohara (Yuzhno-Sakhalinsk); immensa ricchezza di legname, cellulosa (*\u014cji Paper*) e miniere di carbone fossile.",
    s2_4: "I porti di \u014ctomari (Korsakov) e Maoka lavorano a pieno regime per l'esportazione di carbone e legname verso le acciaierie e cartiere di Hokkaid\u014d e Honsh\u016b; pattugliamento rigido della linea di confine del 50\u00b0 parallelo di fronte all'Armata Rossa.",
    s5_7: "In seguito alle crescenti tensioni con l'URSS, le autorit\u00e0 di Karafuto fortificano i posti di frontiera sul 50\u00b0 parallelo e organizzano reparti di pattuglia su sci e slitte per la sorveglianza invernale.",
    s8: "La ratifica del Patto di Neutralit\u00e0 con l'URSS (aprile 1941) stabilizza pacificamente la frontiera del 50\u00b0 parallelo, consentendo a Karafuto di massimizzare la produzione energetica di carbone e polpa di legno per lo sforzo bellico dell'Impero.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
  "JP_CHISHIMA": {
    id: "JP_CHISHIMA",
    cntrCode: "JP",
    cntrName: "Giappone",
    name: "Chishima",
    nutsName: "Chishima (Isole Curili \u2014 Paramushir & Etorofu)",
    nameLatn: "Chishima Rett\u014d",
    nameEngl: "Kuril Islands (Chishima Archipelago)",
    modernName: "Isole Curili (Chishima Rett\u014d, Russia / storicamente Giappone 1875-1945)",
    historicalName: "Dai Nippon Teikoku \u2014 Chishima Rett\u014d (Isole Curili \u2014 Paramushir & Etorofu)",
    adminTitle: "Dai Nippon Teikoku \u2014 Chishima Rett\u014d (Hokkaid\u014d-ch\u014d / Basi Navali di Kashiwabara ed Etorofu)",
    sovereign: "JAP",
    overlord: "Dai Nippon Teikoku",
    faction: "Asse",
    s0_1: "Arcipelago vulcanico settentrionale ceduto dalla Russia nel 1875 col Trattato di San Pietroburgo, amministrato sotto la giurisdizione dell'Hokkaid\u014d-ch\u014d; include le isole meridionali di Kunashiri ed Etorofu fino a Paramushir e Shumshu a ridosso della Kamchatka; ricchezza di pesca oceanica di granchi e salmoni.",
    s2_4: "Costruzione di basi aeronavali avanzate a Kashiwabara (Paramushir) e Kataoka (Shumshu) per il controllo degli accessi al Mare di Okhotsk e la vigilanza antisommergibile.",
    s5_7: "Fortificazione delle isole settentrionali con batterie d'artiglieria in caverna e ricoveri corazzati per caccia; monitoraggio costante dello stretto della Kamchatka.",
    s8: "Nel novembre 1941 la remota e nebbiosa baia di Hitokappu (Tankan Bay) sull'isola di Etorofu diviene il teatro del segreto punto di raduno definitivo della Flotta Combinata dell'ammiraglio Nagumo (6 portaerei, 2 corazzate, 3 incrociatori e 9 cacciatorpediniere) che il 26 novembre salpa nel silenzio radio assoluto verso Pearl Harbor.",
    getNote: function(s: number) {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s <= 7) return this.s5_7;
      return this.s8;
    }
  },
};

/**
 * Mappatura ausiliaria per alias di ricerca e codici storici (es. JP_TOKYO, JP_KANSAI, ecc.)
 */
export const JAPAN_REGION_ALIASES: Record<string, string> = {
  'JP_TOKYO': 'JP13',
  'JP_KANSAI': 'JP27',
  'JP_HOKKAIDO': 'JP01',
  'JP_KYUSHU': 'JP40',
  'JP_CHUBU': 'JP23',
  'JP_CHUGOKU': 'JP34',
  'JP_TOHOKU': 'JP04',
  'JP_SHIKOKU': 'JP38',
  'JP_OKINAWA': 'JP47',
};

/**
 * Risolve lo statuto geopolitico e toponomastico di una prefettura o territorio giapponese.
 */
export function resolveJapanProvince(ft: any, s: number): ResolvedTerritory {
  const p = (ft && ft.properties) ? ft.properties : {};
  const fidClean = String(ft.id || p.id || p.NUTS_ID || '').trim();
  const rawName = String(p.HISTORICAL_NAME || p.NAME || p.name || 'Dai Nippon Teikoku (Naichi)');
  const nrm = (fidClean + ' ' + rawName + ' ' + (p.NAME_LATN || '')).toLowerCase();

  // 1. Direct match per ID canonico in JAPAN_PROVINCES_META
  let meta = JAPAN_PROVINCES_META[fidClean];

  if (!meta && fidClean) {
    const cleanNum = fidClean.replace(/^JP_?/, '');
    if (cleanNum.length === 2 && !isNaN(Number(cleanNum))) {
      meta = JAPAN_PROVINCES_META['JP' + cleanNum];
    }
  }

  // 2. Se e' una macro-regione o alias regionale (es. JP_KANSAI, JP_TOKYO, JP_CHUBU, JP_KYUSHU, JP_HOKKAIDO, JP_CHUGOKU, JP_TOHOKU, JP_SHIKOKU, JP_KANTO_SHU):
  const isMacroRegion =
    fidClean === 'JP_KANSAI' ||
    fidClean === 'JP_TOKYO' ||
    fidClean === 'JP_HOKKAIDO' ||
    fidClean === 'JP_KYUSHU' ||
    fidClean === 'JP_CHUBU' ||
    fidClean === 'JP_CHUGOKU' ||
    fidClean === 'JP_TOHOKU' ||
    fidClean === 'JP_SHIKOKU' ||
    fidClean === 'JP_KANTO_SHU' ||
    fidClean === 'JP_CHOSEN' ||
    fidClean === 'JP_TAIWAN' ||
    fidClean === 'JP_NANYO' ||
    fidClean === 'JP_RYUKYU' ||
    fidClean === 'JP_OGASAWARA';

  if (isMacroRegion) {
    const jpTop = resolveJapanToponym(fidClean, rawName, nrm, 'JAP', s);
    if (jpTop) {
      return makeResult(
        'JAP',
        jpTop.name || rawName,
        jpTop.note || "Territorio dell'Impero Giapponese (Naichi).",
        'Asse',
        jpTop.adminTitle || 'Dai Nippon Teikoku (Naichi)'
      );
    }
  }

  // 3. Fallback per ricerca nome o proprietà
  if (!meta) {
    for (const key of Object.keys(JAPAN_PROVINCES_META)) {
      const m = JAPAN_PROVINCES_META[key];
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

  // 5. Fallback via resolveJapanToponym
  const jpTop = resolveJapanToponym(fidClean, rawName, nrm, 'JAP', s);
  if (jpTop) {
    return makeResult(
      'JAP',
      jpTop.name || rawName,
      jpTop.note || "Territorio dell'Impero Giapponese (Naichi).",
      'Asse',
      jpTop.adminTitle || 'Dai Nippon Teikoku (Naichi)'
    );
  }

  // 6. Fallback generico per territori giapponesi metropolitani non catalogati
  const defaultAdmin = 'Dai Nippon Teikoku (Naichi)';
  const defaultNote = s >= 8
    ? "Prefettura o territorio metropolitano dell'Impero Giapponese; in stato di mobilitazione bellica totale in seguito al Patto di Neutralità con l'URSS."
    : "Prefettura o territorio metropolitano dell'Impero Giapponese (Naichi); integrato nell'apparato di produzione e mobilitazione dell'Associazione per il Sostegno dell'Autorità Imperiale.";

  return makeResult(
    'JAP',
    rawName,
    p.HISTORICAL_NOTE || defaultNote,
    'Asse',
    p.ADMIN || defaultAdmin
  );
}
