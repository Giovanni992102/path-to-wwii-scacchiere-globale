/**
 * Censimento Geocartografico e Toponomastico delle Province della Spagna e Possedimenti d'Oltremare (1936-1941)
 * Copertura esaustiva e rigorosa di tutte le 59 province metropolitane e insulari (NUTS-3) piu 4 territori coloniali e protettorati (63 entita totali).
 *
 * Timeline Storica (Step 0 - 8):
 * - Step 0 (1936 pre-luglio): Seconda Repubblica Spagnola (Manuel Azaña, Fronte Popolare). Tensioni sociali e violenze politiche;
 *   assassini del tenente Castillo e di José Calvo Sotelo. Tutta la Spagna metropolitana e oltremare e sotto sovranita repubblicana (SPR).
 * - Step 1 (marzo 1938): Guerra Civile Spagnola in pieno svolgimento. Territorio spaccato in due:
 *   - Bando Republicano (SPR): Madrid (Miaja e Rojo: "¡No pasarán!"), Catalogna (Barcellona capitale governativa di Negrín),
 *     Levante (Valencia, Alicante, Castellón), Murcia (base navale di Cartagena), La Mancia (Albacete quartier generale Brigate Internazionali),
 *     Andalusia orientale (Almería, Jaén) e isola di Minorca (Menorca). Sostegno militare di URSS e Brigate Internazionali.
 *   - Bando Nacional (SPA): Giunta di Burgos guidata dal Generalísimo Francisco Franco; Galizia, Vecchia Castiglia, León,
 *     Navarra (carlisti requetés), Álava, Aragona (Saragozza, Teruel appena riconquistata), Estremadura (massacro di Badajoz),
 *     Andalusia occidentale (Siviglia di Queipo de Llano, Cadice, Malaga conquistata nel 1937 con la strage de "La Desbandá"),
 *     Nord conquistato (caduta di Bilbao, Guernica, Santander, Asturie), Maiorca e Ibiza (basi Aviazione Legionaria fascista italiana),
 *     Canarie, Ceuta, Melilla e Marocco Spagnolo (Ejército de África). Sostegno di Italia fascista (CTV) e Germania nazista (Legione Condor).
 * - Step 2 (ottobre 1938): I franchisti hanno raggiunto il Mediterraneo a Vinaròs (Castellón, aprile 1938), recidendo i collegamenti
 *   tra Catalogna e Centro-Levante. Cruenta Battaglia dell'Ebro; congedo e sfilata d'addio alle Brigate Internazionali a Barcellona
 *   (discorso de La Pasionaria); Madrid assediata e affamata; Franco abroga lo Statuto catalano a Burgos.
 * - Step 3 (marzo 1939): Caduta della Catalogna (Barcellona cade il 26 gennaio; La Retirada di 450.000 repubblicani verso la Francia);
 *   resa di Minorca; colpo di Stato di Casado a Madrid; il 28 marzo le truppe franchiste entrano a Madrid. Il 1° aprile 1939 Franco
 *   emette l'ultimo comunicato di guerra ("En el día de hoy, cautivo y desarmado el Ejército Rojo..."): vittoria totale dello Stato Spagnolo (SPA).
 * - Step 4 (aprile 1939): Consolidamento della dittatura franchista (Nuevo Estado, FET y de las JONS partito unico, Fuero del Trabajo);
 *   adesione al Patto Anticomintern (7 aprile 1939); Legge sulle Responsabilità Politiche ed esecuzioni di massa contro i vinti repubblicani.
 * - Step 5 (settembre 1939 - maggio 1940): 4 settembre 1939: Franco proclama la stretta Neutralità della Spagna nella seconda guerra mondiale;
 *   il Paese e in ginocchio tra rovine, distruzione e carestia acuta ("los años del hambre", estraperlo e autarchia economica).
 * - Step 6 (giugno - agosto 1940): Caduta della Francia. Il 12 giugno 1940 la Spagna passa alla "non belligeranza" favorevole all'Asse;
 *   il 14 giugno truppe coloniali spagnole occupano militarmente la Zona Internazionale di Tangeri annettendola de facto al Marocco Spagnolo;
 *   rifornimenti clandestini di U-Boot tedeschi nei porti di Vigo, Cadice, Ferrol e Las Palmas.
 * - Step 7 (ottobre 1940): Incontro di Hendaye (23 ottobre 1940) tra Adolf Hitler e Francisco Franco: Hitler richiede l'ingresso in guerra
 *   e il passaggio delle truppe per l'Operazione Felix (conquista di Gibilterra); Franco oppone richieste smisurate di grano, armi e territori
 *   francesi d'Africa; protocollo segreto di adesione condizionata. Fucilazione di Lluís Companys a Barcellona; visita di Himmler.
 * - Step 8 (aprile 1941): Carestia nera e accordi di fornitura di grano con Gran Bretagna e USA per mantenere la Spagna neutrale;
 *   sorveglianza dello Stretto di Gibilterra da parte dell'Abwehr; a Madrid si preparano i volontari per la futura División Azul.
 */

import { ResolvedTerritory, FactionType } from '../types';

function makeResult(
  o: string,
  name: string,
  note?: string,
  fac?: FactionType,
  adminEntity?: string
): ResolvedTerritory {
  return {
    o,
    name,
    note,
    fac,
    adminEntity
  };
}

export interface SpainProvinceInfo {
  nuts: string;
  name: string;
  modernName: string;
  historicalName: string;
  region: string;
  capital?: string;
  keys: string[];
  s0: string;
  s1: string;
  s2: string;
  s3_4: string;
  s5: string;
  s6: string;
  s7: string;
  s8: string;
  getOwner: (step: number) => 'SPR' | 'SPA';
  getHistoricalName: (step: number) => string;
  getAdminTitle: (step: number) => string;
  getFaction: (step: number) => FactionType;
  getNote: (step: number) => string;
}

export const SPAIN_PROVINCES_META: Record<string, SpainProvinceInfo> = {

  "ES111": {
    nuts: "ES111",
    name: "Provincia de La Coruña",
    modernName: "A Coruña",
    historicalName: "Provincia de La Coruña",
    region: "Galicia",
    capital: "La Coruña",
    keys: ["a_corua", "es111", "la_corua", "provincia_de_la_corua"],
    s0: "All'inizio del 1936 La Coruña e l'arsenale navale di Ferrol (città natale di Francisco Franco) vivono le tensioni del Fronte Popolare; la guarnigione militare e la flotta della Repubblica controllano la base navale atlantica.",
    s1: "Nel luglio 1936 l'Alzamiento militare trionfa rapidamente in Galizia; Ferrol diviene la principale base navale del Bando Nacional nell'Atlantico e l'incrociatore Baleares e le unità catturate operano contro il blocco repubblicano.",
    s2: "Autunno 1938: La Coruña costituisce un retroterra sicuro per i rifornimenti della Junta di Burgos; le fabbriche d'armi e le conserve di pesce galiziane riforniscono le divisioni nazionaliste impegnate sul fronte dell'Ebro.",
    s3_4: "Primavera 1939: con la vittoria franchista, la Galizia celebra la 'paz de Franco'; dura repressione contro i sindacalisti e i marinai repubblicani superstiti dell'arsenale di Ferrol.",
    s5: "Settembre 1939 - maggio 1940: nella neutralità spagnola, il porto di Ferrol e le insenature delle Rías Altas ospitano segretamente navi corsare e U-Boot tedeschi per operazioni di rifornimento clandestine (B-Dienst).",
    s6: "Giugno 1940: con il passaggio alla 'non belligeranza', la sorveglianza costiera atlantica di La Coruña intensifica i contatti con le missioni navali della Kriegsmarine dopo la caduta della Francia.",
    s7: "Ottobre 1940: nel clima dell'incontro di Hendaye, l'arsenale navale di Ferrol e il porto commerciale di La Coruña subiscono la stretta sorveglianza delle navi pattuglia britanniche della Royal Navy.",
    s8: "Primavera 1941: la provincia soffre la carestia dei primi 'años del hambre'; i minatori di wolframio della Galizia cominciano a lavorare per le forniture clandestine destinate all'industria bellica del Terzo Reich.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de La Coruña",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de La Coruña";
      if (step < 3) return "Bando Nacional — Provincia de La Coruña";
      return "Estado Español — Provincia de La Coruña";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "All'inizio del 1936 La Coruña e l'arsenale navale di Ferrol (città natale di Francisco Franco) vivono le tensioni del Fronte Popolare; la guarnigione militare e la flotta della Repubblica controllano la base navale atlantica.";
      if (step === 1) return "Nel luglio 1936 l'Alzamiento militare trionfa rapidamente in Galizia; Ferrol diviene la principale base navale del Bando Nacional nell'Atlantico e l'incrociatore Baleares e le unità catturate operano contro il blocco repubblicano.";
      if (step === 2) return "Autunno 1938: La Coruña costituisce un retroterra sicuro per i rifornimenti della Junta di Burgos; le fabbriche d'armi e le conserve di pesce galiziane riforniscono le divisioni nazionaliste impegnate sul fronte dell'Ebro.";
      if (step === 3 || step === 4) return "Primavera 1939: con la vittoria franchista, la Galizia celebra la 'paz de Franco'; dura repressione contro i sindacalisti e i marinai repubblicani superstiti dell'arsenale di Ferrol.";
      if (step === 5) return "Settembre 1939 - maggio 1940: nella neutralità spagnola, il porto di Ferrol e le insenature delle Rías Altas ospitano segretamente navi corsare e U-Boot tedeschi per operazioni di rifornimento clandestine (B-Dienst).";
      if (step === 6) return "Giugno 1940: con il passaggio alla 'non belligeranza', la sorveglianza costiera atlantica di La Coruña intensifica i contatti con le missioni navali della Kriegsmarine dopo la caduta della Francia.";
      if (step === 7) return "Ottobre 1940: nel clima dell'incontro di Hendaye, l'arsenale navale di Ferrol e il porto commerciale di La Coruña subiscono la stretta sorveglianza delle navi pattuglia britanniche della Royal Navy.";
      return "Primavera 1941: la provincia soffre la carestia dei primi 'años del hambre'; i minatori di wolframio della Galizia cominciano a lavorare per le forniture clandestine destinate all'industria bellica del Terzo Reich.";
    }
  },
  "ES112": {
    nuts: "ES112",
    name: "Provincia de Lugo",
    modernName: "Lugo",
    historicalName: "Provincia de Lugo",
    region: "Galicia",
    capital: "Lugo",
    keys: ["es112", "lugo", "provincia_de_lugo"],
    s0: "Provincia rurale e montuosa della Galizia interna protetta dalle antiche mura romane; economia agricola e zootecnica dominata da piccoli proprietari terrieri e clero tradizionale.",
    s1: "Fin dai primi giorni del golpe del luglio 1936, Lugo cade sotto il controllo dei militari insorti senza significativa resistenza; i contadini riforniscono di carne e grano l'esercito franchista del Nord.",
    s2: "1938: la provincia rimane lontana dalla linea del fronte ma sostiene lo sforzo bellico di Burgos con massicci arruolamenti di giovani fanti galiziani per le divisioni nazionaliste.",
    s3_4: "1939: termine del conflitto; instaurazione dell'amministrazione del 'Nuevo Estado' franchista e persecuzione dei nuclei di partigiani repubblicani rifugiati sui monti cantabrici (i 'fuxidos').",
    s5: "1939-1940: la provincia rurale affronta il razionamento con il rigido ammasso statale del grano e delle patate; fiorisce il contrabbando rurale con il vicino Portogallo di Salazar.",
    s6: "Estate 1940: la non belligeranza spagnola consolida il controllo militare sul territorio; celebrazioni patriottiche della Falange nei borghi rurali lucensi.",
    s7: "Autunno 1940: Lugo vive le privazioni economiche dell'autarchia; i presidi della Guardia Civil danno la caccia alle ultime sacche di guerriglia antifascista nei monti dell'Ancares.",
    s8: "1941: avvio dell'estrazione intensiva e segreta del minerale di wolframio nelle montagne di Lugo per i contratti d'esportazione verso la Germania nazista.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Lugo",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Lugo";
      if (step < 3) return "Bando Nacional — Provincia de Lugo";
      return "Estado Español — Provincia de Lugo";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia rurale e montuosa della Galizia interna protetta dalle antiche mura romane; economia agricola e zootecnica dominata da piccoli proprietari terrieri e clero tradizionale.";
      if (step === 1) return "Fin dai primi giorni del golpe del luglio 1936, Lugo cade sotto il controllo dei militari insorti senza significativa resistenza; i contadini riforniscono di carne e grano l'esercito franchista del Nord.";
      if (step === 2) return "1938: la provincia rimane lontana dalla linea del fronte ma sostiene lo sforzo bellico di Burgos con massicci arruolamenti di giovani fanti galiziani per le divisioni nazionaliste.";
      if (step === 3 || step === 4) return "1939: termine del conflitto; instaurazione dell'amministrazione del 'Nuevo Estado' franchista e persecuzione dei nuclei di partigiani repubblicani rifugiati sui monti cantabrici (i 'fuxidos').";
      if (step === 5) return "1939-1940: la provincia rurale affronta il razionamento con il rigido ammasso statale del grano e delle patate; fiorisce il contrabbando rurale con il vicino Portogallo di Salazar.";
      if (step === 6) return "Estate 1940: la non belligeranza spagnola consolida il controllo militare sul territorio; celebrazioni patriottiche della Falange nei borghi rurali lucensi.";
      if (step === 7) return "Autunno 1940: Lugo vive le privazioni economiche dell'autarchia; i presidi della Guardia Civil danno la caccia alle ultime sacche di guerriglia antifascista nei monti dell'Ancares.";
      return "1941: avvio dell'estrazione intensiva e segreta del minerale di wolframio nelle montagne di Lugo per i contratti d'esportazione verso la Germania nazista.";
    }
  },
  "ES113": {
    nuts: "ES113",
    name: "Provincia de Orense",
    modernName: "Ourense",
    historicalName: "Provincia de Orense",
    region: "Galicia",
    capital: "Orense",
    keys: ["es113", "orense", "ourense", "provincia_de_orense"],
    s0: "Provincia meridionale della Galizia confinante con il Portogallo lungo il fiume Miño; economia incentrata sulla viticoltura del Ribeiro, sull'agricoltura e sui legami storici transfrontalieri.",
    s1: "Luglio 1936: i militari si schierano immediatamente con il Bando Nacional; il confine con il Portogallo salazarista è aperto e amichevole, garantendo rifornimenti vitali agli insorti.",
    s2: "1938: Orense funge da corridoio logistico sicuro per le merci provenienti dal Portogallo e per l'arruolamento nelle formazioni falangiste e requeté.",
    s3_4: "Primavera 1939: consolidamento del regime di Franco; dura epurazione dei funzionari repubblicani e dei militanti galizianisti del Partido Galeguista.",
    s5: "1939-1940: nella neutralità, Orense diventa un perno del contrabbando transfrontaliero di generi alimentari, sapone e gomma per aggirare la scarsità autarchica.",
    s6: "Estate 1940: la provincia condivide la linea della non belligeranza; la gendarmeria portoghese e la polizia franchista collaborano strettamente nel pattugliamento confinario.",
    s7: "Fine 1940: isolamento e penuria di medicinali e carburanti; le terme e la valle del Miño risentono delle restrizioni sui trasporti ferroviari a carbone.",
    s8: "Primavera 1941: la provincia è interessata dalla corsa al wolframio sui massicci montuosi di Valdeorras, con agenti tedeschi e alleati che competono nell'acquisto del minerale.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Orense",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Orense";
      if (step < 3) return "Bando Nacional — Provincia de Orense";
      return "Estado Español — Provincia de Orense";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia meridionale della Galizia confinante con il Portogallo lungo il fiume Miño; economia incentrata sulla viticoltura del Ribeiro, sull'agricoltura e sui legami storici transfrontalieri.";
      if (step === 1) return "Luglio 1936: i militari si schierano immediatamente con il Bando Nacional; il confine con il Portogallo salazarista è aperto e amichevole, garantendo rifornimenti vitali agli insorti.";
      if (step === 2) return "1938: Orense funge da corridoio logistico sicuro per le merci provenienti dal Portogallo e per l'arruolamento nelle formazioni falangiste e requeté.";
      if (step === 3 || step === 4) return "Primavera 1939: consolidamento del regime di Franco; dura epurazione dei funzionari repubblicani e dei militanti galizianisti del Partido Galeguista.";
      if (step === 5) return "1939-1940: nella neutralità, Orense diventa un perno del contrabbando transfrontaliero di generi alimentari, sapone e gomma per aggirare la scarsità autarchica.";
      if (step === 6) return "Estate 1940: la provincia condivide la linea della non belligeranza; la gendarmeria portoghese e la polizia franchista collaborano strettamente nel pattugliamento confinario.";
      if (step === 7) return "Fine 1940: isolamento e penuria di medicinali e carburanti; le terme e la valle del Miño risentono delle restrizioni sui trasporti ferroviari a carbone.";
      return "Primavera 1941: la provincia è interessata dalla corsa al wolframio sui massicci montuosi di Valdeorras, con agenti tedeschi e alleati che competono nell'acquisto del minerale.";
    }
  },
  "ES114": {
    nuts: "ES114",
    name: "Provincia de Pontevedra",
    modernName: "Pontevedra",
    historicalName: "Provincia de Pontevedra",
    region: "Galicia",
    capital: "Pontevedra",
    keys: ["es114", "pontevedra", "provincia_de_pontevedra"],
    s0: "Provincia costiera delle Rías Baixas con il grande porto commerciale e industriale di Vigo; vivace movimento operaio marittimo e cantieristico e tradizioni autonomiste galiziane (Alexandre Bóveda).",
    s1: "Luglio 1936: dopo una breve resistenza operaia a Vigo e Pontevedra, i militari nazionalisti assumono il controllo; fucilazione del leader autonomista Alexandre Bóveda; Vigo diventa porto franchista strategico.",
    s2: "1938: il porto di Vigo e la fabbrica di conserve di pesce operano per l'esercito franchista; navi mercantili tedesche e italiane attraccano regolarmente nella ría di Vigo.",
    s3_4: "1939: fine della guerra; Vigo e le Rías Baixas sono sottoposte al controllo navale della Marina franchista; migliaia di repubblicani vengono internati nei lazzaretti e nelle carceri costiere.",
    s5: "1939-1940: all'inizio della guerra mondiale, il porto di Vigo diventa una base strategica segreta per il rifornimento di idrocarburi e viveri agli U-Boot tedeschi della Kriegsmarine in Atlantico.",
    s6: "Giugno 1940: durante la non belligeranza, Vigo accoglie clandestine operazioni di spionaggio e rifornimento dell'intelligence navale tedesca (operazione con petroliere come la Bessel).",
    s7: "Autunno 1940: la Royal Navy britannica mantiene una fitta rete di sorveglianza al largo delle isole Cíes per monitorare il movimento navale dell'Asse nella ría di Vigo.",
    s8: "1941: Vigo esporta carichi strategici di conserve e wolframio verso la Francia occupata dai tedeschi, mentre la popolazione affronta razionamenti draconiani di pane e olio.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Pontevedra",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Pontevedra";
      if (step < 3) return "Bando Nacional — Provincia de Pontevedra";
      return "Estado Español — Provincia de Pontevedra";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia costiera delle Rías Baixas con il grande porto commerciale e industriale di Vigo; vivace movimento operaio marittimo e cantieristico e tradizioni autonomiste galiziane (Alexandre Bóveda).";
      if (step === 1) return "Luglio 1936: dopo una breve resistenza operaia a Vigo e Pontevedra, i militari nazionalisti assumono il controllo; fucilazione del leader autonomista Alexandre Bóveda; Vigo diventa porto franchista strategico.";
      if (step === 2) return "1938: il porto di Vigo e la fabbrica di conserve di pesce operano per l'esercito franchista; navi mercantili tedesche e italiane attraccano regolarmente nella ría di Vigo.";
      if (step === 3 || step === 4) return "1939: fine della guerra; Vigo e le Rías Baixas sono sottoposte al controllo navale della Marina franchista; migliaia di repubblicani vengono internati nei lazzaretti e nelle carceri costiere.";
      if (step === 5) return "1939-1940: all'inizio della guerra mondiale, il porto di Vigo diventa una base strategica segreta per il rifornimento di idrocarburi e viveri agli U-Boot tedeschi della Kriegsmarine in Atlantico.";
      if (step === 6) return "Giugno 1940: durante la non belligeranza, Vigo accoglie clandestine operazioni di spionaggio e rifornimento dell'intelligence navale tedesca (operazione con petroliere come la Bessel).";
      if (step === 7) return "Autunno 1940: la Royal Navy britannica mantiene una fitta rete di sorveglianza al largo delle isole Cíes per monitorare il movimento navale dell'Asse nella ría di Vigo.";
      return "1941: Vigo esporta carichi strategici di conserve e wolframio verso la Francia occupata dai tedeschi, mentre la popolazione affronta razionamenti draconiani di pane e olio.";
    }
  },
  "ES120": {
    nuts: "ES120",
    name: "Provincia de Oviedo (Asturias)",
    modernName: "Asturias",
    historicalName: "Provincia de Oviedo (Asturias)",
    region: "Asturias",
    capital: "Oviedo",
    keys: ["asturias", "es120", "oviedo", "oviedo_asturias", "provincia_de_oviedo_asturias"],
    s0: "Cuore del movimento operaio e minerario spagnolo: memoria della Rivoluzione delle Asturie del 1934; bacino carbonifero delle valli del Nalón e Caudal fedele al Fronte Popolare.",
    s1: "Luglio 1936 - ottobre 1937: drammatica frattura territoriale; il colonnello Aranda si barrica a Oviedo per i Nazionali subendo un durissimo assedio da parte dei minatori repubblicani; Gijón e le valli restano repubblicane fino alla caduta del Fronte Nord nell'autunno 1937.",
    s2: "1938: le Asturie, ormai interamente sottomesse al Bando Nacional, riattivano l'estrazione mineraria del carbone delle valli del Caudal per alimentare la siderurgia e i treni franchisti.",
    s3_4: "1939: con la fine della guerra civile, le Asturie subiscono una repressione durissima; migliaia di minatori riparano sui monti formando la guerriglia antifascista dei 'maquis'.",
    s5: "1939-1940: il carbone asturiano è l'architrave della sopravvivenza energetica della Spagna autarchica; lavoro militarizzato nei pozzi minerari e tessere annonarie severe.",
    s6: "Estate 1940: il porto di Gijón (El Musel) movimenta carbone per le acciaierie basche; la Guardia Civil conduce continue operazioni antiterrorismo contro i guerriglieri sui Picos de Europa.",
    s7: "Autunno 1940: i minatori asturiani lavorano a ciclo continuo sotto disciplina militare; la carestia dei primi 'años del hambre' colpisce duramente le famiglie operaie.",
    s8: "Primavera 1941: Oviedo e le conche minerarie restano zone di massima sorveglianza militare; il carbone delle Asturie sostiene l'autarchia industriale del regime di Franco.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Oviedo (Asturias)",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Oviedo (Asturias)";
      if (step < 3) return "Bando Nacional — Provincia de Oviedo (Asturias)";
      return "Estado Español — Provincia de Oviedo (Asturias)";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Cuore del movimento operaio e minerario spagnolo: memoria della Rivoluzione delle Asturie del 1934; bacino carbonifero delle valli del Nalón e Caudal fedele al Fronte Popolare.";
      if (step === 1) return "Luglio 1936 - ottobre 1937: drammatica frattura territoriale; il colonnello Aranda si barrica a Oviedo per i Nazionali subendo un durissimo assedio da parte dei minatori repubblicani; Gijón e le valli restano repubblicane fino alla caduta del Fronte Nord nell'autunno 1937.";
      if (step === 2) return "1938: le Asturie, ormai interamente sottomesse al Bando Nacional, riattivano l'estrazione mineraria del carbone delle valli del Caudal per alimentare la siderurgia e i treni franchisti.";
      if (step === 3 || step === 4) return "1939: con la fine della guerra civile, le Asturie subiscono una repressione durissima; migliaia di minatori riparano sui monti formando la guerriglia antifascista dei 'maquis'.";
      if (step === 5) return "1939-1940: il carbone asturiano è l'architrave della sopravvivenza energetica della Spagna autarchica; lavoro militarizzato nei pozzi minerari e tessere annonarie severe.";
      if (step === 6) return "Estate 1940: il porto di Gijón (El Musel) movimenta carbone per le acciaierie basche; la Guardia Civil conduce continue operazioni antiterrorismo contro i guerriglieri sui Picos de Europa.";
      if (step === 7) return "Autunno 1940: i minatori asturiani lavorano a ciclo continuo sotto disciplina militare; la carestia dei primi 'años del hambre' colpisce duramente le famiglie operaie.";
      return "Primavera 1941: Oviedo e le conche minerarie restano zone di massima sorveglianza militare; il carbone delle Asturie sostiene l'autarchia industriale del regime di Franco.";
    }
  },
  "ES130": {
    nuts: "ES130",
    name: "Provincia de Santander (Cantabria)",
    modernName: "Cantabria",
    historicalName: "Provincia de Santander (Cantabria)",
    region: "Cantabria",
    capital: "Santander",
    keys: ["cantabria", "es130", "provincia_de_santander_cantabria", "santander", "santander_cantabria"],
    s0: "Provincia costiera cantabrica con il vivace porto mercantile e industriale di Santander, cantieri navali e zootecnia da latte; fedele alla Repubblica all'inizio del 1936.",
    s1: "Agosto 1937: durante l'offensiva del Nord, le truppe italiane del Corpo Truppe Volontarie (CTV) e le brigate navarresi sfondano le linee repubblicane nella Battaglia di Santander; la città cade il 26 agosto 1937 con la resa del Corpo d'Armata basco.",
    s2: "1938: la provincia di Santander è pienamente integrata nella zona nazionalista; il porto e le industrie metallurgiche lavorano per sostenere l'offensiva franchista verso l'Ebro.",
    s3_4: "1939: celebrazioni della vittoria nazionalista; Santander funge da centro di smistamento per prigionieri di guerra repubblicani nei campi di concentramento costieri.",
    s5: "1939-1940: nella neutralità, il porto di Santander commercia con navi neutrali; la produzione casearia e di bestiame cantabrica viene requisita per le riserve statali.",
    s6: "Estate 1940: la non belligeranza spagnola e l'arrivo della Wehrmacht al confine dei Pirenei atlantici aumentano l'importanza strategica della ferrovia costiera cantabrica.",
    s7: "Febbraio 1941: catastrofico Grande Incendio di Santander del 15-16 febbraio 1941, alimentato da venti di uragano che distrugge l'intero centro storico medievale, lasciando migliaia di senzatetto.",
    s8: "Primavera 1941: ricostruzione autoritaria del centro cittadino da parte della Direzione Generale delle Regioni Devastate del regime franchista.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Santander (Cantabria)",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Santander (Cantabria)";
      if (step < 3) return "Bando Nacional — Provincia de Santander (Cantabria)";
      return "Estado Español — Provincia de Santander (Cantabria)";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia costiera cantabrica con il vivace porto mercantile e industriale di Santander, cantieri navali e zootecnia da latte; fedele alla Repubblica all'inizio del 1936.";
      if (step === 1) return "Agosto 1937: durante l'offensiva del Nord, le truppe italiane del Corpo Truppe Volontarie (CTV) e le brigate navarresi sfondano le linee repubblicane nella Battaglia di Santander; la città cade il 26 agosto 1937 con la resa del Corpo d'Armata basco.";
      if (step === 2) return "1938: la provincia di Santander è pienamente integrata nella zona nazionalista; il porto e le industrie metallurgiche lavorano per sostenere l'offensiva franchista verso l'Ebro.";
      if (step === 3 || step === 4) return "1939: celebrazioni della vittoria nazionalista; Santander funge da centro di smistamento per prigionieri di guerra repubblicani nei campi di concentramento costieri.";
      if (step === 5) return "1939-1940: nella neutralità, il porto di Santander commercia con navi neutrali; la produzione casearia e di bestiame cantabrica viene requisita per le riserve statali.";
      if (step === 6) return "Estate 1940: la non belligeranza spagnola e l'arrivo della Wehrmacht al confine dei Pirenei atlantici aumentano l'importanza strategica della ferrovia costiera cantabrica.";
      if (step === 7) return "Febbraio 1941: catastrofico Grande Incendio di Santander del 15-16 febbraio 1941, alimentato da venti di uragano che distrugge l'intero centro storico medievale, lasciando migliaia di senzatetto.";
      return "Primavera 1941: ricostruzione autoritaria del centro cittadino da parte della Direzione Generale delle Regioni Devastate del regime franchista.";
    }
  },
  "ES211": {
    nuts: "ES211",
    name: "Provincia de Álava",
    modernName: "Araba/Álava",
    historicalName: "Provincia de Álava",
    region: "País Vasco",
    capital: "Vitoria",
    keys: ["araba", "arabalava", "es211", "lava", "provincia_de_lava", "vitoria"],
    s0: "Provincia basca interna a forte maggioranza cattolica e carlista; sede vescovile a Vitoria; a differenza delle province costiere basche, Álava è storicamente legata al tradizionalismo monarchico.",
    s1: "Luglio 1936: il generale Camilo Alonso Vega e le milizie carliste del requeté prendono il controllo di Vitoria fin dal primo giorno dell'Alzamiento; Álava è l'unica provincia basca saldamente franchista.",
    s2: "1938: premiata da Franco con il mantenimento dei suoi secolari privilegi forali (Concierto Económico), revocati invece a Biscaglia e Guipúzcoa per essere 'province traditrici'.",
    s3_4: "1939: Vitoria accoglie comandi militari e la sede del governo militare del Nord; celebrazioni cattoliche del trionfo franchista e arruolamenti massicci nella Falange Tradizionalista.",
    s5: "1939-1940: nella neutralità, l'agricoltura cerealicola e l'industria meccanica di Vitoria riforniscono la Castiglia e il nord iberico sotto rigido controllo corporativo.",
    s6: "Estate 1940: snodo stradale e ferroviario nevralgico della linea Madrid-Irun percorso dalle delegazioni diplomatiche e militari dell'Asse dirette verso la capitale.",
    s7: "Ottobre 1940: transito del treno di Francisco Franco diretto all'incontro con Adolf Hitler a Hendaye attraverso la stazione di Vitoria.",
    s8: "Primavera 1941: Álava mantiene la sua lealtà assoluta al Caudillo e fornisce centinaia di volontari carlisti per la costituenda División Azul.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Álava",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Álava";
      if (step < 3) return "Bando Nacional — Provincia de Álava";
      return "Estado Español — Provincia de Álava";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia basca interna a forte maggioranza cattolica e carlista; sede vescovile a Vitoria; a differenza delle province costiere basche, Álava è storicamente legata al tradizionalismo monarchico.";
      if (step === 1) return "Luglio 1936: il generale Camilo Alonso Vega e le milizie carliste del requeté prendono il controllo di Vitoria fin dal primo giorno dell'Alzamiento; Álava è l'unica provincia basca saldamente franchista.";
      if (step === 2) return "1938: premiata da Franco con il mantenimento dei suoi secolari privilegi forali (Concierto Económico), revocati invece a Biscaglia e Guipúzcoa per essere 'province traditrici'.";
      if (step === 3 || step === 4) return "1939: Vitoria accoglie comandi militari e la sede del governo militare del Nord; celebrazioni cattoliche del trionfo franchista e arruolamenti massicci nella Falange Tradizionalista.";
      if (step === 5) return "1939-1940: nella neutralità, l'agricoltura cerealicola e l'industria meccanica di Vitoria riforniscono la Castiglia e il nord iberico sotto rigido controllo corporativo.";
      if (step === 6) return "Estate 1940: snodo stradale e ferroviario nevralgico della linea Madrid-Irun percorso dalle delegazioni diplomatiche e militari dell'Asse dirette verso la capitale.";
      if (step === 7) return "Ottobre 1940: transito del treno di Francisco Franco diretto all'incontro con Adolf Hitler a Hendaye attraverso la stazione di Vitoria.";
      return "Primavera 1941: Álava mantiene la sua lealtà assoluta al Caudillo e fornisce centinaia di volontari carlisti per la costituenda División Azul.";
    }
  },
  "ES212": {
    nuts: "ES212",
    name: "Provincia de Guipúzcoa",
    modernName: "Gipuzkoa",
    historicalName: "Provincia de Guipúzcoa",
    region: "País Vasco",
    capital: "San Sebastián",
    keys: ["es212", "gipuzkoa", "guipzcoa", "provincia_de_guipzcoa", "san_sebastin"],
    s0: "Provincia basca di frontiera con la Francia; polo industriale e armiero (Eibar) e centro turistico cosmopolita (San Sebastián); forte radicamento del nazionalismo basco cattolico (PNV).",
    s1: "Luglio-settembre 1936: le milizie repubblicane e nazionaliste basche resistono inizialmente, ma il colonnello Beorlegui conquista Irun e San Sebastián nel settembre 1936 sigillando la frontiera con la Francia per la Repubblica.",
    s2: "1938: Franco punisce Guipúzcoa revocando il Concierto Económico con la legge sulle 'provincias traidoras'; le celebri armerie di Eibar vengono militarizzate per la produzione bellica nazionalista.",
    s3_4: "1939: dura repressione contro i sacerdoti e i militanti nazionalisti baschi; bando all'uso pubblico della lingua basca (euskera) e imposizione del rigido centralismo castigliano.",
    s5: "1939-1940: San Sebastián torna ad essere la residenza estiva di Francisco Franco (Palacio de Ayete) e del corpo diplomatico durante i mesi estivi.",
    s6: "Giugno 1940: la Wehrmacht tedesca raggiunge il ponte internazionale di Hendaye-Irun; San Sebastián diventa il principale punto di contatto diretto terrestre tra il Terzo Reich e la Spagna.",
    s7: "23 ottobre 1940: alla stazione di confine di Hendaye/Irun si svolge il celebre incontro tra Adolf Hitler e Francisco Franco alla presenza di Ribbentrop e Serrano Suñer.",
    s8: "Primavera 1941: il ponte di Irun è un crocevia frenetico di spie, rifugiati in fuga dall'Europa occupata, corrieri dell'Abwehr e carichi di wolframio diretti in Germania.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Guipúzcoa",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Guipúzcoa";
      if (step < 3) return "Bando Nacional — Provincia de Guipúzcoa";
      return "Estado Español — Provincia de Guipúzcoa";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia basca di frontiera con la Francia; polo industriale e armiero (Eibar) e centro turistico cosmopolita (San Sebastián); forte radicamento del nazionalismo basco cattolico (PNV).";
      if (step === 1) return "Luglio-settembre 1936: le milizie repubblicane e nazionaliste basche resistono inizialmente, ma il colonnello Beorlegui conquista Irun e San Sebastián nel settembre 1936 sigillando la frontiera con la Francia per la Repubblica.";
      if (step === 2) return "1938: Franco punisce Guipúzcoa revocando il Concierto Económico con la legge sulle 'provincias traidoras'; le celebri armerie di Eibar vengono militarizzate per la produzione bellica nazionalista.";
      if (step === 3 || step === 4) return "1939: dura repressione contro i sacerdoti e i militanti nazionalisti baschi; bando all'uso pubblico della lingua basca (euskera) e imposizione del rigido centralismo castigliano.";
      if (step === 5) return "1939-1940: San Sebastián torna ad essere la residenza estiva di Francisco Franco (Palacio de Ayete) e del corpo diplomatico durante i mesi estivi.";
      if (step === 6) return "Giugno 1940: la Wehrmacht tedesca raggiunge il ponte internazionale di Hendaye-Irun; San Sebastián diventa il principale punto di contatto diretto terrestre tra il Terzo Reich e la Spagna.";
      if (step === 7) return "23 ottobre 1940: alla stazione di confine di Hendaye/Irun si svolge il celebre incontro tra Adolf Hitler e Francisco Franco alla presenza di Ribbentrop e Serrano Suñer.";
      return "Primavera 1941: il ponte di Irun è un crocevia frenetico di spie, rifugiati in fuga dall'Europa occupata, corrieri dell'Abwehr e carichi di wolframio diretti in Germania.";
    }
  },
  "ES213": {
    nuts: "ES213",
    name: "Provincia de Vizcaya",
    modernName: "Bizkaia",
    historicalName: "Provincia de Vizcaya",
    region: "País Vasco",
    capital: "Bilbao",
    keys: ["bilbao", "bizkaia", "es213", "provincia_de_vizcaya", "vizcaya"],
    s0: "Massimo centro siderurgico e cantieristico della Spagna (Altos Hornos de Vizcaya, cantiere Euskalduna) lungo la ría di Bilbao; capitale del neonato Governo Autonomo Basco guidato dal lehendakari José Antonio Aguirre.",
    s1: "Autunno 1936 - giugno 1937: Bilbao è difesa dalla 'Cintura di Ferro'; il 26 aprile 1937 la Legione Condor tedesca rade al suolo la città santa basca di Guernica scatenando sdegno mondiale; il 19 giugno 1937 Bilbao cade nelle mani delle truppe di Franco.",
    s2: "1938: gli Altos Hornos de Vizcaya lavorano a pieno regime per la produzione di rotaie, lamiere e proiettili per l'esercito nazionalista; bando al Concierto Económico.",
    s3_4: "1939: repressione sistematica dell'identità basca; migliaia di orfani e rifugiati baschi (i 'niños de la guerra') sono sfollati all'estero; militarizzazione della classe operaia della ría.",
    s5: "1939-1940: nella neutralità, la siderurgia di Bilbao esporta ferro e acciaio verso la Gran Bretagna e la Germania; il porto è sorvegliato dalla Marina franchista.",
    s6: "Estate 1940: la caduta della Francia isola i cantieri baschi dai mercati occidentali e rafforza le commesse industriali per il Terzo Reich.",
    s7: "Autunno 1940: fame, tubercolosi e razionamento severo tra le famiglie operaie di Bilbao, Barakaldo e Sestao sotto il ferreo controllo dei sindacati verticali della CNS.",
    s8: "Primavera 1941: il distretto industriale di Bilbao rimane il perno della produzione pesante del regime, nonostante la scarsità di pezzi di ricambio e carburante.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Vizcaya",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Vizcaya";
      if (step < 3) return "Bando Nacional — Provincia de Vizcaya";
      return "Estado Español — Provincia de Vizcaya";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Massimo centro siderurgico e cantieristico della Spagna (Altos Hornos de Vizcaya, cantiere Euskalduna) lungo la ría di Bilbao; capitale del neonato Governo Autonomo Basco guidato dal lehendakari José Antonio Aguirre.";
      if (step === 1) return "Autunno 1936 - giugno 1937: Bilbao è difesa dalla 'Cintura di Ferro'; il 26 aprile 1937 la Legione Condor tedesca rade al suolo la città santa basca di Guernica scatenando sdegno mondiale; il 19 giugno 1937 Bilbao cade nelle mani delle truppe di Franco.";
      if (step === 2) return "1938: gli Altos Hornos de Vizcaya lavorano a pieno regime per la produzione di rotaie, lamiere e proiettili per l'esercito nazionalista; bando al Concierto Económico.";
      if (step === 3 || step === 4) return "1939: repressione sistematica dell'identità basca; migliaia di orfani e rifugiati baschi (i 'niños de la guerra') sono sfollati all'estero; militarizzazione della classe operaia della ría.";
      if (step === 5) return "1939-1940: nella neutralità, la siderurgia di Bilbao esporta ferro e acciaio verso la Gran Bretagna e la Germania; il porto è sorvegliato dalla Marina franchista.";
      if (step === 6) return "Estate 1940: la caduta della Francia isola i cantieri baschi dai mercati occidentali e rafforza le commesse industriali per il Terzo Reich.";
      if (step === 7) return "Autunno 1940: fame, tubercolosi e razionamento severo tra le famiglie operaie di Bilbao, Barakaldo e Sestao sotto il ferreo controllo dei sindacati verticali della CNS.";
      return "Primavera 1941: il distretto industriale di Bilbao rimane il perno della produzione pesante del regime, nonostante la scarsità di pezzi di ricambio e carburante.";
    }
  },
  "ES220": {
    nuts: "ES220",
    name: "Provincia de Navarra",
    modernName: "Navarra",
    historicalName: "Provincia de Navarra",
    region: "Navarra",
    capital: "Pamplona",
    keys: ["es220", "navarra", "pamplona", "provincia_de_navarra"],
    s0: "Roccaforte incontestata del tradizionalismo carlista e cattolico intransigente; a Pamplona il generale Emilio Mola 'il Direttore' ordisce la cospirazione militare contro la Seconda Repubblica.",
    s1: "19 luglio 1936: Mola proclama lo stato di guerra da Pamplona; decine di migliaia di volontari carlisti con il basco rosso ('requetés') si arruolano in massa al grido di '¡Dios, Patria y Rey!', costituendo la fanteria d'assalto più temibile dell'esercito nazionalista.",
    s2: "1938: Navarra riceve la Croce Laureata di San Fernando da Franco e conserva intatto il suo secolare Concierto Económico e i fueros per la sua fedeltà eroica alla causa nazionalista.",
    s3_4: "1939: trionfo politico del carlismo a Pamplona, pur costretto alla fusione forzata con la Falange nel partito unico FET y de las JONS voluta da Franco.",
    s5: "1939-1940: l'agricoltura della Ribera navarrese garantisce cereali e ortaggi essenziali per le riserve del regime; Pamplona conserva un'atmosfera austera e devota.",
    s6: "Giugno 1940: con le truppe tedesche affacciate sui Pirenei, i passi navarresi di Roncisvalle e Baztan vengono presidiati contro possibili infiltrazioni alleate.",
    s7: "Ottobre 1940: i circoli carlisti navarresi guardano con cautela all'influenza nazista pagana, sostenendo la neutralità della Spagna cattolica fuori dalla guerra europea.",
    s8: "Primavera 1941: centinaia di requetés navarresi si arruolano come volontari tra i primi ranghi della División Azul per combattere il comunismo sovietico sul fronte russo.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Navarra",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Navarra";
      if (step < 3) return "Bando Nacional — Provincia de Navarra";
      return "Estado Español — Provincia de Navarra";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Roccaforte incontestata del tradizionalismo carlista e cattolico intransigente; a Pamplona il generale Emilio Mola 'il Direttore' ordisce la cospirazione militare contro la Seconda Repubblica.";
      if (step === 1) return "19 luglio 1936: Mola proclama lo stato di guerra da Pamplona; decine di migliaia di volontari carlisti con il basco rosso ('requetés') si arruolano in massa al grido di '¡Dios, Patria y Rey!', costituendo la fanteria d'assalto più temibile dell'esercito nazionalista.";
      if (step === 2) return "1938: Navarra riceve la Croce Laureata di San Fernando da Franco e conserva intatto il suo secolare Concierto Económico e i fueros per la sua fedeltà eroica alla causa nazionalista.";
      if (step === 3 || step === 4) return "1939: trionfo politico del carlismo a Pamplona, pur costretto alla fusione forzata con la Falange nel partito unico FET y de las JONS voluta da Franco.";
      if (step === 5) return "1939-1940: l'agricoltura della Ribera navarrese garantisce cereali e ortaggi essenziali per le riserve del regime; Pamplona conserva un'atmosfera austera e devota.";
      if (step === 6) return "Giugno 1940: con le truppe tedesche affacciate sui Pirenei, i passi navarresi di Roncisvalle e Baztan vengono presidiati contro possibili infiltrazioni alleate.";
      if (step === 7) return "Ottobre 1940: i circoli carlisti navarresi guardano con cautela all'influenza nazista pagana, sostenendo la neutralità della Spagna cattolica fuori dalla guerra europea.";
      return "Primavera 1941: centinaia di requetés navarresi si arruolano come volontari tra i primi ranghi della División Azul per combattere il comunismo sovietico sul fronte russo.";
    }
  },
  "ES230": {
    nuts: "ES230",
    name: "Provincia de Logroño (La Rioja)",
    modernName: "La Rioja",
    historicalName: "Provincia de Logroño (La Rioja)",
    region: "La Rioja",
    capital: "Logroño",
    keys: ["es230", "la_rioja", "logroo", "logroo_la_rioja", "provincia_de_logroo_la_rioja"],
    s0: "Denominata ufficialmente 'Provincia de Logroño' fino al 1980; terra di vigneti secolari della valle dell'Ebro e agricoltura fertile; forte influenza del conservatorismo agrario e cattolico.",
    s1: "Luglio 1936: i militari insorgono a Logroño e assicurano la provincia al Bando Nacional senza incontrare forte opposizione; dura epurazione dei militanti di sinistra.",
    s2: "1938: la viticoltura e le conserve ortofrutticole della Rioja forniscono rifornimenti costanti alle armate nazionaliste operanti sul vicino fronte d'Aragona.",
    s3_4: "1939: con la vittoria di Franco, Logroño ospita manifestazioni di adesione al regime; la produzione vinicola viene riorganizzata sotto le corporazioni del Ministero dell'Agricoltura.",
    s5: "1939-1940: nella neutralità, il vino della Rioja è una delle poche voci d'esportazione capaci di fruttare valuta estera al governo di Madrid per pagare il grano e il petrolio.",
    s6: "Estate 1940: la non belligeranza spagnola si accompagna a una forte campagna propagandistica nazional-cattolica nei centri di Logroño, Haro e Calahorra.",
    s7: "Fine 1940: la provincia rurale affronta le restrizioni dei concimi chimici e dei trasporti a nafta, concentrando le risorse sulla produzione alimentare di base.",
    s8: "1941: la Rioja sostiene la campagna cerealicola autarchica del regime; volontari falangisti locali si iscrivono per la spedizione anticomunista in Russia.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Logroño (La Rioja)",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Logroño (La Rioja)";
      if (step < 3) return "Bando Nacional — Provincia de Logroño (La Rioja)";
      return "Estado Español — Provincia de Logroño (La Rioja)";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Denominata ufficialmente 'Provincia de Logroño' fino al 1980; terra di vigneti secolari della valle dell'Ebro e agricoltura fertile; forte influenza del conservatorismo agrario e cattolico.";
      if (step === 1) return "Luglio 1936: i militari insorgono a Logroño e assicurano la provincia al Bando Nacional senza incontrare forte opposizione; dura epurazione dei militanti di sinistra.";
      if (step === 2) return "1938: la viticoltura e le conserve ortofrutticole della Rioja forniscono rifornimenti costanti alle armate nazionaliste operanti sul vicino fronte d'Aragona.";
      if (step === 3 || step === 4) return "1939: con la vittoria di Franco, Logroño ospita manifestazioni di adesione al regime; la produzione vinicola viene riorganizzata sotto le corporazioni del Ministero dell'Agricoltura.";
      if (step === 5) return "1939-1940: nella neutralità, il vino della Rioja è una delle poche voci d'esportazione capaci di fruttare valuta estera al governo di Madrid per pagare il grano e il petrolio.";
      if (step === 6) return "Estate 1940: la non belligeranza spagnola si accompagna a una forte campagna propagandistica nazional-cattolica nei centri di Logroño, Haro e Calahorra.";
      if (step === 7) return "Fine 1940: la provincia rurale affronta le restrizioni dei concimi chimici e dei trasporti a nafta, concentrando le risorse sulla produzione alimentare di base.";
      return "1941: la Rioja sostiene la campagna cerealicola autarchica del regime; volontari falangisti locali si iscrivono per la spedizione anticomunista in Russia.";
    }
  },
  "ES241": {
    nuts: "ES241",
    name: "Provincia de Huesca",
    modernName: "Huesca",
    historicalName: "Provincia de Huesca",
    region: "Aragón",
    capital: "Huesca",
    keys: ["es241", "huesca", "provincia_de_huesca"],
    s0: "Provincia pirenaica e alto-aragonese; capitale Huesca a forte vocazione agricola e commerciale; a est e nelle vallate montane vi è una forte presenza anarco-sindacalista (CNT-FAI).",
    s1: "Luglio 1936 - marzo 1938: Huesca città è tenuta dai Nazionali ma rimane a lungo semi-accerchiata dalle colonne miliziane repubblicane e della CNT (collettivizzazioni agrarie del Consiglio d'Aragona); George Orwell combatte sul fronte di Huesca descrivendolo in 'Omaggio alla Catalogna'.",
    s2: "Primavera-autunno 1938: la grande Offensiva d'Aragona di Franco spazza via il fronte repubblicano; l'Aragona viene interamente conquistata dai nazionalisti che raggiungono il confine francese sui Pirenei (Bielsa).",
    s3_4: "1939: fine della guerra; liquidazione totale delle collettività anarchiche aragonesi e ritorno delle terre ai vecchi proprietari fondiari; dura repressione prefettizia.",
    s5: "1939-1940: la stazione internazionale pirenaica di Canfranc riprende le comunicazioni ferroviarie con la Francia sotto la sorveglianza doganale franchista.",
    s6: "Giugno 1940: con la disfatta francese, la Wehrmacht si insedia sul versante nord dei Pirenei; Canfranc diventa una stazione internazionale controllata congiuntamente da spagnoli e nazisti.",
    s7: "Autunno 1940: attraverso la dogana ferroviaria di Canfranc transitano carichi segreti di oro della Reichsbank tedesca e tungsteno/wolframio spagnolo e portoghese.",
    s8: "Primavera 1941: Canfranc è uno dei punti più caldi per il contrabbando strategico e la fuga di rifugiati ed ebrei verso la penisola iberica neutrale.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Huesca",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Huesca";
      if (step < 3) return "Bando Nacional — Provincia de Huesca";
      return "Estado Español — Provincia de Huesca";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia pirenaica e alto-aragonese; capitale Huesca a forte vocazione agricola e commerciale; a est e nelle vallate montane vi è una forte presenza anarco-sindacalista (CNT-FAI).";
      if (step === 1) return "Luglio 1936 - marzo 1938: Huesca città è tenuta dai Nazionali ma rimane a lungo semi-accerchiata dalle colonne miliziane repubblicane e della CNT (collettivizzazioni agrarie del Consiglio d'Aragona); George Orwell combatte sul fronte di Huesca descrivendolo in 'Omaggio alla Catalogna'.";
      if (step === 2) return "Primavera-autunno 1938: la grande Offensiva d'Aragona di Franco spazza via il fronte repubblicano; l'Aragona viene interamente conquistata dai nazionalisti che raggiungono il confine francese sui Pirenei (Bielsa).";
      if (step === 3 || step === 4) return "1939: fine della guerra; liquidazione totale delle collettività anarchiche aragonesi e ritorno delle terre ai vecchi proprietari fondiari; dura repressione prefettizia.";
      if (step === 5) return "1939-1940: la stazione internazionale pirenaica di Canfranc riprende le comunicazioni ferroviarie con la Francia sotto la sorveglianza doganale franchista.";
      if (step === 6) return "Giugno 1940: con la disfatta francese, la Wehrmacht si insedia sul versante nord dei Pirenei; Canfranc diventa una stazione internazionale controllata congiuntamente da spagnoli e nazisti.";
      if (step === 7) return "Autunno 1940: attraverso la dogana ferroviaria di Canfranc transitano carichi segreti di oro della Reichsbank tedesca e tungsteno/wolframio spagnolo e portoghese.";
      return "Primavera 1941: Canfranc è uno dei punti più caldi per il contrabbando strategico e la fuga di rifugiati ed ebrei verso la penisola iberica neutrale.";
    }
  },
  "ES242": {
    nuts: "ES242",
    name: "Provincia de Teruel",
    modernName: "Teruel",
    historicalName: "Provincia de Teruel",
    region: "Aragón",
    capital: "Teruel",
    keys: ["es242", "provincia_de_teruel", "teruel"],
    s0: "Capoluogo dell'Aragona meridionale arroccato su un altopiano aspro e freddo; economia agropastorale e miniere di lignite a Utrillas; comunità rurale fortemente conservatrice.",
    s1: "Dicembre 1937 - febbraio 1938: teatro della celebre e cruenta **Battaglia di Teruel**, combattuta a -20 °C sotto tempeste di neve. Conquistata dai repubblicani di Rojo nel gennaio 1938 (unica capitale provinciale presa dalla Repubblica), viene riconquistata da Franco il 22 febbraio 1938.",
    s2: "1938: la riconquista di Teruel apre la strada all'avanzata nazionalista verso il Mediterraneo (Vinaròs); la città semidistrutta è un cumulo di macerie presidiato dalle truppe franchiste.",
    s3_4: "1939: Teruel è dichiarata 'città adottata dal Caudillo'; la Direzione Generale delle Regioni Devastate avvia la faticosa e lenta ricostruzione degli edifici rasi al suolo dai bombardamenti.",
    s5: "1939-1940: nella neutralità, la provincia soffre una carestia acuta aggravata dalle devastazioni belliche; le miniere di lignite di Utrillas lavorano a pieno regime per l'autarchia dei combustibili.",
    s6: "Estate 1940: la vita civile stenta a riprendersi; migliaia di abitanti vivono ancora in baracche provvisorie mentre la Falange celebra il valore dei martiri della battaglia.",
    s7: "Fine 1940: il gelido inverno aragonese aggrava le condizioni sanitarie e alimentari della popolazione turolense, priva di riscaldamento a carbone e medicinali.",
    s8: "1941: prosegue la lenta ricostruzione monumentale in stile neo-mudejar promossa dalla propaganda franchista; dura vigilanza contro i superstiti della guerriglia montellana.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Teruel",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Teruel";
      if (step < 3) return "Bando Nacional — Provincia de Teruel";
      return "Estado Español — Provincia de Teruel";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Capoluogo dell'Aragona meridionale arroccato su un altopiano aspro e freddo; economia agropastorale e miniere di lignite a Utrillas; comunità rurale fortemente conservatrice.";
      if (step === 1) return "Dicembre 1937 - febbraio 1938: teatro della celebre e cruenta **Battaglia di Teruel**, combattuta a -20 °C sotto tempeste di neve. Conquistata dai repubblicani di Rojo nel gennaio 1938 (unica capitale provinciale presa dalla Repubblica), viene riconquistata da Franco il 22 febbraio 1938.";
      if (step === 2) return "1938: la riconquista di Teruel apre la strada all'avanzata nazionalista verso il Mediterraneo (Vinaròs); la città semidistrutta è un cumulo di macerie presidiato dalle truppe franchiste.";
      if (step === 3 || step === 4) return "1939: Teruel è dichiarata 'città adottata dal Caudillo'; la Direzione Generale delle Regioni Devastate avvia la faticosa e lenta ricostruzione degli edifici rasi al suolo dai bombardamenti.";
      if (step === 5) return "1939-1940: nella neutralità, la provincia soffre una carestia acuta aggravata dalle devastazioni belliche; le miniere di lignite di Utrillas lavorano a pieno regime per l'autarchia dei combustibili.";
      if (step === 6) return "Estate 1940: la vita civile stenta a riprendersi; migliaia di abitanti vivono ancora in baracche provvisorie mentre la Falange celebra il valore dei martiri della battaglia.";
      if (step === 7) return "Fine 1940: il gelido inverno aragonese aggrava le condizioni sanitarie e alimentari della popolazione turolense, priva di riscaldamento a carbone e medicinali.";
      return "1941: prosegue la lenta ricostruzione monumentale in stile neo-mudejar promossa dalla propaganda franchista; dura vigilanza contro i superstiti della guerriglia montellana.";
    }
  },
  "ES243": {
    nuts: "ES243",
    name: "Provincia de Zaragoza",
    modernName: "Zaragoza",
    historicalName: "Provincia de Zaragoza",
    region: "Aragón",
    capital: "Zaragoza",
    keys: ["es243", "provincia_de_zaragoza", "zaragoza"],
    s0: "Capitale storica dell'Aragona adagiata sull'Ebro, celebre per la Basilica del Pilar e la prestigiosa Academia General Militar (un tempo diretta dallo stesso Francisco Franco); forte presenza operaia della CNT.",
    s1: "Luglio 1936: il generale Cabanellas fa insorgere la guarnigione assicurando Saragozza al Bando Nacional; la città resiste a tutti i tentativi d'attacco delle colonne repubblicane (Battaglia di Belchite dell'estate 1937) e diviene il comando avanzato del fronte d'Aragona.",
    s2: "1938: da Saragozza parte la trionfale offensiva d'Aragona guidata dal generale Dávila con il supporto massiccio dell'Aviazione Legionaria italiana e della Legione Condor; Belchite viene lasciata in macerie come monito.",
    s3_4: "1939: con la vittoria finale, Saragozza e la Madonna del Pilar vengono consacrate come simbolo supremo della crociata nazional-cattolica franchista; sfilate militari imponenti.",
    s5: "1939-1940: nodo ferroviario strategico tra Madrid, Barcellona e il nord; la piana dell'Ebro fornisce barbabietola da zucchero e grano sotto stretto controllo degli ammassi.",
    s6: "Estate 1940: nella non belligeranza, Saragozza ospita comandi dell'esercito e scuole d'aviazione militare; celebrazioni religiose di massa al Pilar.",
    s7: "Autunno 1940: le industrie meccaniche e chimiche aragonesi lavorano per lo sforzo autarchico del Paese; controllo serrato sui prezzi per combattere l'estraperlo.",
    s8: "Primavera 1941: l'Accademia e i reggimenti di Saragozza forniscono centinaia di ufficiali e fanti volontari per i battaglioni della futura División Azul.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Zaragoza",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Zaragoza";
      if (step < 3) return "Bando Nacional — Provincia de Zaragoza";
      return "Estado Español — Provincia de Zaragoza";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Capitale storica dell'Aragona adagiata sull'Ebro, celebre per la Basilica del Pilar e la prestigiosa Academia General Militar (un tempo diretta dallo stesso Francisco Franco); forte presenza operaia della CNT.";
      if (step === 1) return "Luglio 1936: il generale Cabanellas fa insorgere la guarnigione assicurando Saragozza al Bando Nacional; la città resiste a tutti i tentativi d'attacco delle colonne repubblicane (Battaglia di Belchite dell'estate 1937) e diviene il comando avanzato del fronte d'Aragona.";
      if (step === 2) return "1938: da Saragozza parte la trionfale offensiva d'Aragona guidata dal generale Dávila con il supporto massiccio dell'Aviazione Legionaria italiana e della Legione Condor; Belchite viene lasciata in macerie come monito.";
      if (step === 3 || step === 4) return "1939: con la vittoria finale, Saragozza e la Madonna del Pilar vengono consacrate come simbolo supremo della crociata nazional-cattolica franchista; sfilate militari imponenti.";
      if (step === 5) return "1939-1940: nodo ferroviario strategico tra Madrid, Barcellona e il nord; la piana dell'Ebro fornisce barbabietola da zucchero e grano sotto stretto controllo degli ammassi.";
      if (step === 6) return "Estate 1940: nella non belligeranza, Saragozza ospita comandi dell'esercito e scuole d'aviazione militare; celebrazioni religiose di massa al Pilar.";
      if (step === 7) return "Autunno 1940: le industrie meccaniche e chimiche aragonesi lavorano per lo sforzo autarchico del Paese; controllo serrato sui prezzi per combattere l'estraperlo.";
      return "Primavera 1941: l'Accademia e i reggimenti di Saragozza forniscono centinaia di ufficiali e fanti volontari per i battaglioni della futura División Azul.";
    }
  },
  "ES300": {
    nuts: "ES300",
    name: "Provincia de Madrid",
    modernName: "Madrid",
    historicalName: "Provincia de Madrid",
    region: "Comunidad de Madrid",
    capital: "Madrid",
    keys: ["es300", "madrid", "provincia_de_madrid"],
    s0: "Capitale della Seconda Repubblica Spagnola, sede delle Cortes, del governo e della presidenza (Manuel Azaña); effervescenza culturale e violente contrapposizioni politiche nella primavera del 1936 (assassini del tenente Castillo e di José Calvo Sotelo).",
    s1: "Novembre 1936 - marzo 1938: assedio di Madrid e leggendaria resistenza repubblicana guidata dal generale José Miaja e dal colonnello Vicente Rojo al grido di '¡No pasarán!'; Battaglia della Casa de Campo, arrivo delle prime Brigate Internazionali e bombardamenti aerei tedeschi e italiani sulla Gran Vía.",
    s2: "Autunno 1938: la capitale vive sotto il razionamento drammatico ('le lenticchie della vittoria' o 'píldoras Negrín'), bombardamenti d'artiglieria quotidiani dalla Ciudad Universitaria e il fronte cittadino trincerato; la sede del governo repubblicano è a Barcellona.",
    s3_4: "Marzo-aprile 1939: colpo di Stato interno del colonnello Segismundo Casado contro il governo Negrín per negoziare la resa; il 28 marzo 1939 le truppe franchiste entrano a Madrid ponendo fine alla guerra civile; sfilata della Vittoria di Franco il 19 maggio 1939.",
    s5: "Settembre 1939 - maggio 1940: nella Spagna neutrale, Madrid è la capitale del 'Nuevo Estado' franchista; la città affronta macerie, fame nera, code per le tessere annonarie e le fucilazioni quotidiane al cimitero dell'Almudena sotto la Legge sulle Responsabilità Politiche.",
    s6: "Giugno 1940: Madrid celebra la caduta della Francia e il passaggio alla 'non belligeranza'; sfilate della Falange chiedono la restituzione di Gibilterra ('¡Gibraltar español!') e l'impero coloniale in Africa.",
    s7: "Ottobre 1940: visita del Reichsführer-SS Heinrich Himmler a Madrid per coordinare la cooperazione di polizia e spionaggio con il direttore della sicurezza José Finat; febbrili riunioni al Palazzo di El Pardo tra Franco e Serrano Suñer per l'incontro di Hendaye.",
    s8: "Primavera 1941: Madrid è crocevia dello spionaggio diplomatico mondiale tra l'ambasciatore britannico Samuel Hoare e le reti dell'Abwehr; la popolazione sopravvive a stento tra borsa nera ('estraperlo') e sussidi del monte di pietà.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPR";
      if (step === 2) return "SPR";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Madrid",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPR" : (step === 2 ? "SPR" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Madrid";
      if (step < 3) return "Bando Nacional — Provincia de Madrid";
      return "Estado Español — Provincia de Madrid";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Comintern";
      if (step === 2) return "Comintern";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Capitale della Seconda Repubblica Spagnola, sede delle Cortes, del governo e della presidenza (Manuel Azaña); effervescenza culturale e violente contrapposizioni politiche nella primavera del 1936 (assassini del tenente Castillo e di José Calvo Sotelo).";
      if (step === 1) return "Novembre 1936 - marzo 1938: assedio di Madrid e leggendaria resistenza repubblicana guidata dal generale José Miaja e dal colonnello Vicente Rojo al grido di '¡No pasarán!'; Battaglia della Casa de Campo, arrivo delle prime Brigate Internazionali e bombardamenti aerei tedeschi e italiani sulla Gran Vía.";
      if (step === 2) return "Autunno 1938: la capitale vive sotto il razionamento drammatico ('le lenticchie della vittoria' o 'píldoras Negrín'), bombardamenti d'artiglieria quotidiani dalla Ciudad Universitaria e il fronte cittadino trincerato; la sede del governo repubblicano è a Barcellona.";
      if (step === 3 || step === 4) return "Marzo-aprile 1939: colpo di Stato interno del colonnello Segismundo Casado contro il governo Negrín per negoziare la resa; il 28 marzo 1939 le truppe franchiste entrano a Madrid ponendo fine alla guerra civile; sfilata della Vittoria di Franco il 19 maggio 1939.";
      if (step === 5) return "Settembre 1939 - maggio 1940: nella Spagna neutrale, Madrid è la capitale del 'Nuevo Estado' franchista; la città affronta macerie, fame nera, code per le tessere annonarie e le fucilazioni quotidiane al cimitero dell'Almudena sotto la Legge sulle Responsabilità Politiche.";
      if (step === 6) return "Giugno 1940: Madrid celebra la caduta della Francia e il passaggio alla 'non belligeranza'; sfilate della Falange chiedono la restituzione di Gibilterra ('¡Gibraltar español!') e l'impero coloniale in Africa.";
      if (step === 7) return "Ottobre 1940: visita del Reichsführer-SS Heinrich Himmler a Madrid per coordinare la cooperazione di polizia e spionaggio con il direttore della sicurezza José Finat; febbrili riunioni al Palazzo di El Pardo tra Franco e Serrano Suñer per l'incontro di Hendaye.";
      return "Primavera 1941: Madrid è crocevia dello spionaggio diplomatico mondiale tra l'ambasciatore britannico Samuel Hoare e le reti dell'Abwehr; la popolazione sopravvive a stento tra borsa nera ('estraperlo') e sussidi del monte di pietà.";
    }
  },
  "ES411": {
    nuts: "ES411",
    name: "Provincia de Ávila",
    modernName: "Ávila",
    historicalName: "Provincia de Ávila",
    region: "Castilla y León",
    capital: "Ávila",
    keys: ["es411", "provincia_de_vila", "vila"],
    s0: "Provincia castigliana cinta dalle sue celebri mura medievali; terra mistica di Santa Teresa e roccaforte cattolica e monarchica all'inizio del 1936.",
    s1: "Luglio 1936: la guarnigione e la Guardia Civil aderiscono prontamente all'Alzamiento; Ávila diviene base di partenza per le colonne nazionaliste che muovono all'attacco dei passi della Sierra de Guadarrama verso Madrid.",
    s2: "1938: la provincia funge da retrovia sicura e logistica del fronte di Guadarrama; la produzione cerealicola e l'allevamento ovino riforniscono l'esercito di Franco.",
    s3_4: "1939: termine delle ostilità; Ávila celebra il trionfo cattolico del Bando Nacional; istituzione delle sezioni locali della Sezione Femminile della Falange guidata da Pilar Primo de Rivera.",
    s5: "1939-1940: clima di austerità e preghiera nella Spagna neutrale; la cerealicoltura di Ávila è sottoposta al controllo obbligatorio del Servizio Nazionale del Grano.",
    s6: "Estate 1940: celebrazioni patriottiche all'interno delle mura storiche; manifestazioni di solidarietà con la politica di non belligeranza del governo.",
    s7: "Fine 1940: la popolazione rurale affronta la penuria di carburanti e tessuti; forte ritorno dei valori religiosi tradizionali nelle scuole.",
    s8: "1941: reclutamento di giovani agricoltori di Ávila per la División Azul destinata al fronte orientale contro l'Unione Sovietica.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Ávila",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Ávila";
      if (step < 3) return "Bando Nacional — Provincia de Ávila";
      return "Estado Español — Provincia de Ávila";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia castigliana cinta dalle sue celebri mura medievali; terra mistica di Santa Teresa e roccaforte cattolica e monarchica all'inizio del 1936.";
      if (step === 1) return "Luglio 1936: la guarnigione e la Guardia Civil aderiscono prontamente all'Alzamiento; Ávila diviene base di partenza per le colonne nazionaliste che muovono all'attacco dei passi della Sierra de Guadarrama verso Madrid.";
      if (step === 2) return "1938: la provincia funge da retrovia sicura e logistica del fronte di Guadarrama; la produzione cerealicola e l'allevamento ovino riforniscono l'esercito di Franco.";
      if (step === 3 || step === 4) return "1939: termine delle ostilità; Ávila celebra il trionfo cattolico del Bando Nacional; istituzione delle sezioni locali della Sezione Femminile della Falange guidata da Pilar Primo de Rivera.";
      if (step === 5) return "1939-1940: clima di austerità e preghiera nella Spagna neutrale; la cerealicoltura di Ávila è sottoposta al controllo obbligatorio del Servizio Nazionale del Grano.";
      if (step === 6) return "Estate 1940: celebrazioni patriottiche all'interno delle mura storiche; manifestazioni di solidarietà con la politica di non belligeranza del governo.";
      if (step === 7) return "Fine 1940: la popolazione rurale affronta la penuria di carburanti e tessuti; forte ritorno dei valori religiosi tradizionali nelle scuole.";
      return "1941: reclutamento di giovani agricoltori di Ávila per la División Azul destinata al fronte orientale contro l'Unione Sovietica.";
    }
  },
  "ES412": {
    nuts: "ES412",
    name: "Provincia de Burgos",
    modernName: "Burgos",
    historicalName: "Provincia de Burgos",
    region: "Castilla y León",
    capital: "Burgos",
    keys: ["burgos", "es412", "provincia_de_burgos"],
    s0: "Città castigliana dominata dalla grandiosa Cattedrale gotica; all'inizio del 1936 sede di forti presidi militari conservatori contrari alla politica del Fronte Popolare.",
    s1: "Luglio 1936 - marzo 1938: **Burgos è la Capitale del Bando Nacional** e del governo franchista. A Burgos si insedia la Junta de Defensa Nacional (ottobre 1936, proclamazione di Franco a Capo dello Stato e Generalísimo) e il primo governo ministeriale franchista (gennaio 1938) al Palacio de la Isla.",
    s2: "Ottobre 1938: a Burgos Francisco Franco firma i decreti fondamentali del Nuevo Estado, tra cui l'abrogazione dello Statuto autonomo catalano e l'adozione del Fuero del Trabajo ispirato alla Carta del Lavoro fascista italiana.",
    s3_4: "1° aprile 1939: dal quartier generale di Burgos, Franco emette e firma lo storico e definitivo 'Ultimo Parte de la Guerra Civil Española'; la capitale viene successivamente ritrasferita a Madrid.",
    s5: "1939-1940: Burgos conserva una posizione prestigiosa come 'culla della vittoria'; la Cattedrale ospita cerimonie solenni per i caduti e le caserme inquadrano migliaia di coscritti.",
    s6: "Giugno 1940: nodo logistico primario per le comunicazioni tra Madrid e la frontiera francese dei Pirenei; sfilate della gioventù falangista.",
    s7: "Autunno 1940: Burgos è sede di comandi della VI Regione Militare; rigido razionamento delle farine e dei combustibili per l'inverno castigliano.",
    s8: "Primavera 1941: i reggimenti di Burgos inquadrano le prime formazioni di volontari falangisti pronti a partire per il campo di addestramento bavarese di Grafenwöhr.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Burgos",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Burgos";
      if (step < 3) return "Bando Nacional — Provincia de Burgos";
      return "Estado Español — Provincia de Burgos";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Città castigliana dominata dalla grandiosa Cattedrale gotica; all'inizio del 1936 sede di forti presidi militari conservatori contrari alla politica del Fronte Popolare.";
      if (step === 1) return "Luglio 1936 - marzo 1938: **Burgos è la Capitale del Bando Nacional** e del governo franchista. A Burgos si insedia la Junta de Defensa Nacional (ottobre 1936, proclamazione di Franco a Capo dello Stato e Generalísimo) e il primo governo ministeriale franchista (gennaio 1938) al Palacio de la Isla.";
      if (step === 2) return "Ottobre 1938: a Burgos Francisco Franco firma i decreti fondamentali del Nuevo Estado, tra cui l'abrogazione dello Statuto autonomo catalano e l'adozione del Fuero del Trabajo ispirato alla Carta del Lavoro fascista italiana.";
      if (step === 3 || step === 4) return "1° aprile 1939: dal quartier generale di Burgos, Franco emette e firma lo storico e definitivo 'Ultimo Parte de la Guerra Civil Española'; la capitale viene successivamente ritrasferita a Madrid.";
      if (step === 5) return "1939-1940: Burgos conserva una posizione prestigiosa come 'culla della vittoria'; la Cattedrale ospita cerimonie solenni per i caduti e le caserme inquadrano migliaia di coscritti.";
      if (step === 6) return "Giugno 1940: nodo logistico primario per le comunicazioni tra Madrid e la frontiera francese dei Pirenei; sfilate della gioventù falangista.";
      if (step === 7) return "Autunno 1940: Burgos è sede di comandi della VI Regione Militare; rigido razionamento delle farine e dei combustibili per l'inverno castigliano.";
      return "Primavera 1941: i reggimenti di Burgos inquadrano le prime formazioni di volontari falangisti pronti a partire per il campo di addestramento bavarese di Grafenwöhr.";
    }
  },
  "ES413": {
    nuts: "ES413",
    name: "Provincia de León",
    modernName: "León",
    historicalName: "Provincia de León",
    region: "Castilla y León",
    capital: "León",
    keys: ["es413", "len", "provincia_de_len"],
    s0: "Capitale dell'antico Regno di León; polo ferroviario, centro agrario e bacini minerari carboniferi a nord (El Bierzo e Laciana) con forte presenza anarchica e comunista.",
    s1: "Luglio 1936: i militari insorti prendono rapidamente la città di León e fucilano le autorità repubblicane; i minatori di Laciana e Ponferrada resistono strenuamente sui monti prima di essere schiacciati nell'autunno 1936.",
    s2: "1938: le miniere di carbone del Bierzo lavorano a ciclo continuo sotto direzione militare nazionalista; l'aeroporto della Virgen del Camino ospita reparti della Legione Condor tedesca.",
    s3_4: "1939: all'Hostal de San Marcos a León viene allestito uno dei campi di concentramento più duri e sovraffollati per prigionieri politici repubblicani.",
    s5: "1939-1940: nella neutralità, la produzione carbonifera di León è indispensabile per la rete ferroviaria RENFE; i contadini subiscono requisizioni di cereali e legumi.",
    s6: "Estate 1940: consolidamento dei presidi della Guardia Civil nelle valli del Bierzo contro i primi gruppi di partigiani antifascisti (la Federación de Guerrillas de León-Galicia).",
    s7: "Fine 1940: la provincia rurale affronta il rigido inverno continentale con gravi carenze di zucchero, sale e carbone domestico.",
    s8: "1941: León esporta carbone e legname per lo sforzo autarchico; arruolamenti di giovani falangisti per la crociata antibolscevica sul fronte russo.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de León",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de León";
      if (step < 3) return "Bando Nacional — Provincia de León";
      return "Estado Español — Provincia de León";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Capitale dell'antico Regno di León; polo ferroviario, centro agrario e bacini minerari carboniferi a nord (El Bierzo e Laciana) con forte presenza anarchica e comunista.";
      if (step === 1) return "Luglio 1936: i militari insorti prendono rapidamente la città di León e fucilano le autorità repubblicane; i minatori di Laciana e Ponferrada resistono strenuamente sui monti prima di essere schiacciati nell'autunno 1936.";
      if (step === 2) return "1938: le miniere di carbone del Bierzo lavorano a ciclo continuo sotto direzione militare nazionalista; l'aeroporto della Virgen del Camino ospita reparti della Legione Condor tedesca.";
      if (step === 3 || step === 4) return "1939: all'Hostal de San Marcos a León viene allestito uno dei campi di concentramento più duri e sovraffollati per prigionieri politici repubblicani.";
      if (step === 5) return "1939-1940: nella neutralità, la produzione carbonifera di León è indispensabile per la rete ferroviaria RENFE; i contadini subiscono requisizioni di cereali e legumi.";
      if (step === 6) return "Estate 1940: consolidamento dei presidi della Guardia Civil nelle valli del Bierzo contro i primi gruppi di partigiani antifascisti (la Federación de Guerrillas de León-Galicia).";
      if (step === 7) return "Fine 1940: la provincia rurale affronta il rigido inverno continentale con gravi carenze di zucchero, sale e carbone domestico.";
      return "1941: León esporta carbone e legname per lo sforzo autarchico; arruolamenti di giovani falangisti per la crociata antibolscevica sul fronte russo.";
    }
  },
  "ES414": {
    nuts: "ES414",
    name: "Provincia de Palencia",
    modernName: "Palencia",
    historicalName: "Provincia de Palencia",
    region: "Castilla y León",
    capital: "Palencia",
    keys: ["es414", "palencia", "provincia_de_palencia"],
    s0: "Provincia rurale della 'Tierra de Campos', storico granaio della Castiglia; a nord le miniere di carbone della Montaña Palentina (Barruelo de Santullán), teatro della rivoluzione del 1934.",
    s1: "Luglio 1936: i militari controllano il capoluogo; dura repressione contro i minatori di Barruelo de Santullán; Palencia diventa una roccaforte dell'approvvigionamento granario per il fronte nazionalista.",
    s2: "1938: la cerealicoltura di Palencia rifornisce regolarmente la capitale Burgos e i reparti al fronte; macinazione centralizzata e sanzioni severe per gli ammassi clandestini.",
    s3_4: "1939: celebrazioni della vittoria e insediamento dei sindacati verticali della Falange; la Montaña Palentina è militarizzata.",
    s5: "1939-1940: nella neutralità, la 'Tierra de Campos' è la principale riserva granaria per sfamare le città castigliane e Madrid; razionamento del pane.",
    s6: "Estate 1940: sostegno alla linea di non belligeranza; sfilate della gioventù falangista (Frente de Juventudes) a Palencia.",
    s7: "Fine 1940: gli agricoltori palentini soffrono la carenza di muli e concimi chimici, con calo delle rese dei raccolti.",
    s8: "1941: la provincia garantisce quote obbligatorie di frumento per lo Stato franchista; arruolamento di volontari falangisti per il fronte orientale.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Palencia",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Palencia";
      if (step < 3) return "Bando Nacional — Provincia de Palencia";
      return "Estado Español — Provincia de Palencia";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia rurale della 'Tierra de Campos', storico granaio della Castiglia; a nord le miniere di carbone della Montaña Palentina (Barruelo de Santullán), teatro della rivoluzione del 1934.";
      if (step === 1) return "Luglio 1936: i militari controllano il capoluogo; dura repressione contro i minatori di Barruelo de Santullán; Palencia diventa una roccaforte dell'approvvigionamento granario per il fronte nazionalista.";
      if (step === 2) return "1938: la cerealicoltura di Palencia rifornisce regolarmente la capitale Burgos e i reparti al fronte; macinazione centralizzata e sanzioni severe per gli ammassi clandestini.";
      if (step === 3 || step === 4) return "1939: celebrazioni della vittoria e insediamento dei sindacati verticali della Falange; la Montaña Palentina è militarizzata.";
      if (step === 5) return "1939-1940: nella neutralità, la 'Tierra de Campos' è la principale riserva granaria per sfamare le città castigliane e Madrid; razionamento del pane.";
      if (step === 6) return "Estate 1940: sostegno alla linea di non belligeranza; sfilate della gioventù falangista (Frente de Juventudes) a Palencia.";
      if (step === 7) return "Fine 1940: gli agricoltori palentini soffrono la carenza di muli e concimi chimici, con calo delle rese dei raccolti.";
      return "1941: la provincia garantisce quote obbligatorie di frumento per lo Stato franchista; arruolamento di volontari falangisti per il fronte orientale.";
    }
  },
  "ES415": {
    nuts: "ES415",
    name: "Provincia de Salamanca",
    modernName: "Salamanca",
    historicalName: "Provincia de Salamanca",
    region: "Castilla y León",
    capital: "Salamanca",
    keys: ["es415", "provincia_de_salamanca", "salamanca"],
    s0: "Sede della più antica e prestigiosa Università di Spagna; rettore il celebre filosofo Miguel de Unamuno; città di grande bellezza architettonica e tradizioni conservatrici.",
    s1: "Autunno 1936 - 1937: **Salamanca è la sede del Quartier Generale di Francisco Franco** (Palacio de Anaya e Palazzo Vescovile); il 12 ottobre 1936 si consuma il celebre scontro pubblico nell'Aula Magna tra Miguel de Unamuno ('Vincerete ma non convincerete') e il generale Millán Astray ('¡Muera la inteligencia!'); Franco firma a Salamanca il Decreto di Unificazione che crea il partito unico FET y de las JONS (aprile 1937).",
    s2: "1938: Salamanca continua a ospitare importanti uffici della propaganda, comandi dell'esercito e la legazione diplomatica dell'Italia fascista e della Germania nazista.",
    s3_4: "1939: con la vittoria finale, la città accoglie l'Archivio Generale della Guerra Civile (Archivo General de la Guerra Civil Española / Sezione Speciale per la repressione della massoneria e del comunismo).",
    s5: "1939-1940: l'Università di Salamanca viene riorganizzata secondo i dogmi del nazional-cattolicesimo; la provincia rurale scambia beni con il vicino Portogallo.",
    s6: "Estate 1940: cerimonie accademiche celebrano la gloria imperiale della Spagna nel Siglo de Oro; appoggio alla non belligeranza.",
    s7: "Autunno 1940: Salamanca soffre la carestia e il tesseramento annonario; severi controlli di polizia politica contro ogni residua opposizione intellettuale.",
    s8: "Primavera 1941: studenti universitari e giovani falangisti salmantini si iscrivono in massa nei ranghi dei battaglioni volontari della División Azul.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Salamanca",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Salamanca";
      if (step < 3) return "Bando Nacional — Provincia de Salamanca";
      return "Estado Español — Provincia de Salamanca";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Sede della più antica e prestigiosa Università di Spagna; rettore il celebre filosofo Miguel de Unamuno; città di grande bellezza architettonica e tradizioni conservatrici.";
      if (step === 1) return "Autunno 1936 - 1937: **Salamanca è la sede del Quartier Generale di Francisco Franco** (Palacio de Anaya e Palazzo Vescovile); il 12 ottobre 1936 si consuma il celebre scontro pubblico nell'Aula Magna tra Miguel de Unamuno ('Vincerete ma non convincerete') e il generale Millán Astray ('¡Muera la inteligencia!'); Franco firma a Salamanca il Decreto di Unificazione che crea il partito unico FET y de las JONS (aprile 1937).";
      if (step === 2) return "1938: Salamanca continua a ospitare importanti uffici della propaganda, comandi dell'esercito e la legazione diplomatica dell'Italia fascista e della Germania nazista.";
      if (step === 3 || step === 4) return "1939: con la vittoria finale, la città accoglie l'Archivio Generale della Guerra Civile (Archivo General de la Guerra Civil Española / Sezione Speciale per la repressione della massoneria e del comunismo).";
      if (step === 5) return "1939-1940: l'Università di Salamanca viene riorganizzata secondo i dogmi del nazional-cattolicesimo; la provincia rurale scambia beni con il vicino Portogallo.";
      if (step === 6) return "Estate 1940: cerimonie accademiche celebrano la gloria imperiale della Spagna nel Siglo de Oro; appoggio alla non belligeranza.";
      if (step === 7) return "Autunno 1940: Salamanca soffre la carestia e il tesseramento annonario; severi controlli di polizia politica contro ogni residua opposizione intellettuale.";
      return "Primavera 1941: studenti universitari e giovani falangisti salmantini si iscrivono in massa nei ranghi dei battaglioni volontari della División Azul.";
    }
  },
  "ES416": {
    nuts: "ES416",
    name: "Provincia de Segovia",
    modernName: "Segovia",
    historicalName: "Provincia de Segovia",
    region: "Castilla y León",
    capital: "Segovia",
    keys: ["es416", "provincia_de_segovia", "segovia"],
    s0: "Celebre per il maestoso acquedotto romano, l'Alcázar e la prestigiosa Academia de Artillería; all'inizio del 1936 terra agraria legata all'esercito e alle tradizioni castigliane.",
    s1: "Luglio 1936: i militari insorti prendono il controllo del capoluogo; nel maggio-giugno 1937 l'esercito repubblicano tenta la fallimentare Offensiva di Segovia (La Granja) immortalata da Hemingway in 'Per chi suona la campana'.",
    s2: "1938: la linea del fronte sulla Sierra de Guadarrama si stabilizza; Segovia è un centro di rifornimento di artiglieria e salmerie per i battaglioni nazionalisti.",
    s3_4: "1939: fine della guerra; l'Alcázar di Segovia e l'Academia de Artillería celebrano il trionfo delle armi franchiste; epurazione degli insegnanti repubblicani.",
    s5: "1939-1940: nella neutralità, Segovia contribuisce all'ammasso cerealicolo e dell'allevamento porcino; il razionamento disciplina il consumo di carne e grassi.",
    s6: "Estate 1940: la non belligeranza spagnola trova fervido appoggio nei quadri militari dell'Accademia di Artiglieria.",
    s7: "Fine 1940: l'inverno nella meseta segoviana porta disagi per la mancanza di combustibili; restrizioni ai trasporti ferroviari a carbone.",
    s8: "1941: gli ufficiali artiglieri formatisi a Segovia partono in gran numero per inquadrare i reggimenti d'artiglieria della División Azul.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Segovia",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Segovia";
      if (step < 3) return "Bando Nacional — Provincia de Segovia";
      return "Estado Español — Provincia de Segovia";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Celebre per il maestoso acquedotto romano, l'Alcázar e la prestigiosa Academia de Artillería; all'inizio del 1936 terra agraria legata all'esercito e alle tradizioni castigliane.";
      if (step === 1) return "Luglio 1936: i militari insorti prendono il controllo del capoluogo; nel maggio-giugno 1937 l'esercito repubblicano tenta la fallimentare Offensiva di Segovia (La Granja) immortalata da Hemingway in 'Per chi suona la campana'.";
      if (step === 2) return "1938: la linea del fronte sulla Sierra de Guadarrama si stabilizza; Segovia è un centro di rifornimento di artiglieria e salmerie per i battaglioni nazionalisti.";
      if (step === 3 || step === 4) return "1939: fine della guerra; l'Alcázar di Segovia e l'Academia de Artillería celebrano il trionfo delle armi franchiste; epurazione degli insegnanti repubblicani.";
      if (step === 5) return "1939-1940: nella neutralità, Segovia contribuisce all'ammasso cerealicolo e dell'allevamento porcino; il razionamento disciplina il consumo di carne e grassi.";
      if (step === 6) return "Estate 1940: la non belligeranza spagnola trova fervido appoggio nei quadri militari dell'Accademia di Artiglieria.";
      if (step === 7) return "Fine 1940: l'inverno nella meseta segoviana porta disagi per la mancanza di combustibili; restrizioni ai trasporti ferroviari a carbone.";
      return "1941: gli ufficiali artiglieri formatisi a Segovia partono in gran numero per inquadrare i reggimenti d'artiglieria della División Azul.";
    }
  },
  "ES417": {
    nuts: "ES417",
    name: "Provincia de Soria",
    modernName: "Soria",
    historicalName: "Provincia de Soria",
    region: "Castilla y León",
    capital: "Soria",
    keys: ["es417", "provincia_de_soria", "soria"],
    s0: "Provincia dell'alto Duero, montuosa e poco popolata; terra poetica di Antonio Machado; economia imperniata su foreste, cerealicoltura e pastorizia.",
    s1: "Luglio 1936: cade sotto il controllo dei militari nazionalisti nei primissimi giorni; Soria funge da raccordo tra l'Aragona e la Castiglia per le colonne franchiste.",
    s2: "1938: la provincia rimane nelle retrovie del fronte; produzione di legname per traverse ferroviarie e puntelli da trincea; ammassi obbligatori di grano.",
    s3_4: "1939: vittoria di Franco; celebrazioni religiose nei borghi del Duero; bando alle opere dei poeti repubblicani e imposizione della censura falangista.",
    s5: "1939-1940: isolamento e gelo continentale nella Spagna neutrale; la legna da ardere e la carbonella di Soria sono risorse essenziali per riscaldare Madrid.",
    s6: "Estate 1940: la provincia sostiene le direttive del Ministero dell'Agricoltura per l'autosufficienza alimentare autarchica.",
    s7: "Fine 1940: rigido inverno nella meseta; i contadini soriani affrontano la scarsità di beni manifatturieri e tessuti.",
    s8: "1941: Soria fornisce quote di grano per il rifornimento della capitale e contingenti di volontari per il fronte russo.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Soria",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Soria";
      if (step < 3) return "Bando Nacional — Provincia de Soria";
      return "Estado Español — Provincia de Soria";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia dell'alto Duero, montuosa e poco popolata; terra poetica di Antonio Machado; economia imperniata su foreste, cerealicoltura e pastorizia.";
      if (step === 1) return "Luglio 1936: cade sotto il controllo dei militari nazionalisti nei primissimi giorni; Soria funge da raccordo tra l'Aragona e la Castiglia per le colonne franchiste.";
      if (step === 2) return "1938: la provincia rimane nelle retrovie del fronte; produzione di legname per traverse ferroviarie e puntelli da trincea; ammassi obbligatori di grano.";
      if (step === 3 || step === 4) return "1939: vittoria di Franco; celebrazioni religiose nei borghi del Duero; bando alle opere dei poeti repubblicani e imposizione della censura falangista.";
      if (step === 5) return "1939-1940: isolamento e gelo continentale nella Spagna neutrale; la legna da ardere e la carbonella di Soria sono risorse essenziali per riscaldare Madrid.";
      if (step === 6) return "Estate 1940: la provincia sostiene le direttive del Ministero dell'Agricoltura per l'autosufficienza alimentare autarchica.";
      if (step === 7) return "Fine 1940: rigido inverno nella meseta; i contadini soriani affrontano la scarsità di beni manifatturieri e tessuti.";
      return "1941: Soria fornisce quote di grano per il rifornimento della capitale e contingenti di volontari per il fronte russo.";
    }
  },
  "ES418": {
    nuts: "ES418",
    name: "Provincia de Valladolid",
    modernName: "Valladolid",
    historicalName: "Provincia de Valladolid",
    region: "Castilla y León",
    capital: "Valladolid",
    keys: ["es418", "provincia_de_valladolid", "valladolid"],
    s0: "Storica capitale dell'Impero spagnolo di Filippo II, nodo ferroviario e industriale del nord; culla del fascismo spagnolo delle JONS (Onésimo Redondo) con forte presenza della Falange armata.",
    s1: "Luglio 1936: il generale Saliquet guida l'Alzamiento a Valladolid, trionfando con il concorso delle milizie falangiste di Onésimo Redondo; Valladolid diventa la capitale ideologica e propagandistica del fascismo franchista.",
    s2: "1938: le officine ferroviarie e meccaniche di Valladolid lavorano per la manutenzione dei treni militari e dei veicoli delle colonne franchiste; Radio Valladolid irradia propaganda.",
    s3_4: "1939: sfilate trionfali della Falange e omaggio alla tomba di Onésimo Redondo; Valladolid riceve la Croce Laureata di San Fernando da Franco.",
    s5: "1939-1940: nella neutralità, la città soffre una dura crisi economica mitigata dal ruolo di snodo logistico ferroviario per l'intera Castiglia.",
    s6: "Estate 1940: manifestazioni studentesche e falangiste a Valladolid acclamano la vittoria dell'Asse in Francia e chiedono l'ingresso della Spagna in guerra.",
    s7: "Autunno 1940: la città ospita grandi manifestazioni del sindacato unico CNS; razionamento severo del pane e del carbone.",
    s8: "Primavera 1941: Valladolid è uno dei maggiori centri di arruolamento della Spagna per la División Azul, sostenuto con fervore dai veterani falangisti.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Valladolid",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Valladolid";
      if (step < 3) return "Bando Nacional — Provincia de Valladolid";
      return "Estado Español — Provincia de Valladolid";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Storica capitale dell'Impero spagnolo di Filippo II, nodo ferroviario e industriale del nord; culla del fascismo spagnolo delle JONS (Onésimo Redondo) con forte presenza della Falange armata.";
      if (step === 1) return "Luglio 1936: il generale Saliquet guida l'Alzamiento a Valladolid, trionfando con il concorso delle milizie falangiste di Onésimo Redondo; Valladolid diventa la capitale ideologica e propagandistica del fascismo franchista.";
      if (step === 2) return "1938: le officine ferroviarie e meccaniche di Valladolid lavorano per la manutenzione dei treni militari e dei veicoli delle colonne franchiste; Radio Valladolid irradia propaganda.";
      if (step === 3 || step === 4) return "1939: sfilate trionfali della Falange e omaggio alla tomba di Onésimo Redondo; Valladolid riceve la Croce Laureata di San Fernando da Franco.";
      if (step === 5) return "1939-1940: nella neutralità, la città soffre una dura crisi economica mitigata dal ruolo di snodo logistico ferroviario per l'intera Castiglia.";
      if (step === 6) return "Estate 1940: manifestazioni studentesche e falangiste a Valladolid acclamano la vittoria dell'Asse in Francia e chiedono l'ingresso della Spagna in guerra.";
      if (step === 7) return "Autunno 1940: la città ospita grandi manifestazioni del sindacato unico CNS; razionamento severo del pane e del carbone.";
      return "Primavera 1941: Valladolid è uno dei maggiori centri di arruolamento della Spagna per la División Azul, sostenuto con fervore dai veterani falangisti.";
    }
  },
  "ES419": {
    nuts: "ES419",
    name: "Provincia de Zamora",
    modernName: "Zamora",
    historicalName: "Provincia de Zamora",
    region: "Castilla y León",
    capital: "Zamora",
    keys: ["es419", "provincia_de_zamora", "zamora"],
    s0: "Provincia agraria attraversata dal fiume Duero e confinante con il Portogallo; economia basata su grano, legumi e zootecnia; forte tradizionalismo cattolico.",
    s1: "Luglio 1936: i militari si impossessano della provincia senza trovare resistenza organizzata; Zamora funge da snodo logistico verso il confine portoghese.",
    s2: "1938: la cerealicoltura zamorana garantisce rifornimenti alla zona nazionalista; apertura totale della frontiera con il Portogallo salazarista.",
    s3_4: "1939: consolidamento dell'amministrazione franchista; epurazione dei consigli comunali e ritorno delle grandi proprietà terriere ai latifondisti.",
    s5: "1939-1940: nella neutralità, Zamora vive di agricoltura di sussistenza e contrabbando transfrontaliero; il lago di Sanabria e il Duero sono sorvegliati dalla Guardia Civil.",
    s6: "Estate 1940: cooperazione confinaria tra le guardie spagnole e la Guarda Fiscal portoghese in un clima di non belligeranza.",
    s7: "Fine 1940: rigido inverno nella meseta occidentale; la mancanza di calzature e abiti pesanti colpisce duramente le comunità contadine.",
    s8: "1941: Zamora continua a fornire grano e legumi per il rifornimento statale; reclutamento di volontari rurali per il fronte dell'Est.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Zamora",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Zamora";
      if (step < 3) return "Bando Nacional — Provincia de Zamora";
      return "Estado Español — Provincia de Zamora";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia agraria attraversata dal fiume Duero e confinante con il Portogallo; economia basata su grano, legumi e zootecnia; forte tradizionalismo cattolico.";
      if (step === 1) return "Luglio 1936: i militari si impossessano della provincia senza trovare resistenza organizzata; Zamora funge da snodo logistico verso il confine portoghese.";
      if (step === 2) return "1938: la cerealicoltura zamorana garantisce rifornimenti alla zona nazionalista; apertura totale della frontiera con il Portogallo salazarista.";
      if (step === 3 || step === 4) return "1939: consolidamento dell'amministrazione franchista; epurazione dei consigli comunali e ritorno delle grandi proprietà terriere ai latifondisti.";
      if (step === 5) return "1939-1940: nella neutralità, Zamora vive di agricoltura di sussistenza e contrabbando transfrontaliero; il lago di Sanabria e il Duero sono sorvegliati dalla Guardia Civil.";
      if (step === 6) return "Estate 1940: cooperazione confinaria tra le guardie spagnole e la Guarda Fiscal portoghese in un clima di non belligeranza.";
      if (step === 7) return "Fine 1940: rigido inverno nella meseta occidentale; la mancanza di calzature e abiti pesanti colpisce duramente le comunità contadine.";
      return "1941: Zamora continua a fornire grano e legumi per il rifornimento statale; reclutamento di volontari rurali per il fronte dell'Est.";
    }
  },
  "ES421": {
    nuts: "ES421",
    name: "Provincia de Albacete",
    modernName: "Albacete",
    historicalName: "Provincia de Albacete",
    region: "Castilla-La Mancha",
    capital: "Albacete",
    keys: ["albacete", "es421", "provincia_de_albacete"],
    s0: "Provincia mancese nota per l'agricoltura cerealicola e la tradizionale coltelleria artigianale; snodo ferroviario tra Madrid, Valencia e Murcia.",
    s1: "Ottobre 1936 - ottobre 1938: **Albacete è il Quartier Generale e centro di addestramento delle Brigate Internazionali** della Repubblica Spagnola guidato da André Marty ('il macellaio di Albacete'); decine di migliaia di volontari antifascisti da oltre 50 nazioni transitano per Albacete.",
    s2: "Autunno 1938: il governo repubblicano di Negrín decreta lo scioglimento delle Brigate Internazionali per favorire la mediazione internazionale; congedo solenne dei brigatisti ad Albacete.",
    s3_4: "Marzo 1939: Albacete cade nelle mani dei franchisti nei giorni convulsi della fine della guerra civile; le caserme delle Brigate Internazionali diventano campi di prigionia e tribunali militari.",
    s5: "1939-1940: nella Spagna neutrale, Albacete vive una feroce epurazione; la coltelleria artigianale viene riconvertita sotto le corporazioni del regime.",
    s6: "Estate 1940: la non belligeranza è accompagnata dal controllo capillare dei consorzi agrari sulla raccolta di grano e zafferano.",
    s7: "Fine 1940: carestia e tubercolosi nelle campagne mancesi; la borsa nera domina il commercio delle farine.",
    s8: "1941: Albacete fornisce contingenti di leva per l'esercito franchista; severa vigilanza contro gli ex militanti repubblicani in libertà vigilata.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPR";
      if (step === 2) return "SPR";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Albacete",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPR" : (step === 2 ? "SPR" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Albacete";
      if (step < 3) return "Bando Nacional — Provincia de Albacete";
      return "Estado Español — Provincia de Albacete";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Comintern";
      if (step === 2) return "Comintern";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia mancese nota per l'agricoltura cerealicola e la tradizionale coltelleria artigianale; snodo ferroviario tra Madrid, Valencia e Murcia.";
      if (step === 1) return "Ottobre 1936 - ottobre 1938: **Albacete è il Quartier Generale e centro di addestramento delle Brigate Internazionali** della Repubblica Spagnola guidato da André Marty ('il macellaio di Albacete'); decine di migliaia di volontari antifascisti da oltre 50 nazioni transitano per Albacete.";
      if (step === 2) return "Autunno 1938: il governo repubblicano di Negrín decreta lo scioglimento delle Brigate Internazionali per favorire la mediazione internazionale; congedo solenne dei brigatisti ad Albacete.";
      if (step === 3 || step === 4) return "Marzo 1939: Albacete cade nelle mani dei franchisti nei giorni convulsi della fine della guerra civile; le caserme delle Brigate Internazionali diventano campi di prigionia e tribunali militari.";
      if (step === 5) return "1939-1940: nella Spagna neutrale, Albacete vive una feroce epurazione; la coltelleria artigianale viene riconvertita sotto le corporazioni del regime.";
      if (step === 6) return "Estate 1940: la non belligeranza è accompagnata dal controllo capillare dei consorzi agrari sulla raccolta di grano e zafferano.";
      if (step === 7) return "Fine 1940: carestia e tubercolosi nelle campagne mancesi; la borsa nera domina il commercio delle farine.";
      return "1941: Albacete fornisce contingenti di leva per l'esercito franchista; severa vigilanza contro gli ex militanti repubblicani in libertà vigilata.";
    }
  },
  "ES422": {
    nuts: "ES422",
    name: "Provincia de Ciudad Real",
    modernName: "Ciudad Real",
    historicalName: "Provincia de Ciudad Real",
    region: "Castilla-La Mancha",
    capital: "Ciudad Real",
    keys: ["ciudad_real", "es422", "provincia_de_ciudad_real"],
    s0: "Cuore della Mancha rurale, terra del Don Chisciotte; presenza fondamentale delle miniere statali di mercurio di Almadén, tra le più ricche al mondo.",
    s1: "1936-1938: fedele alla Repubblica per l'intera durata della guerra civile; le miniere di mercurio di Almadén sono una risorsa strategica vitale: la vendita di mercurio all'estero procura valuta pregiata al governo repubblicano.",
    s2: "Autunno 1938: la provincia continua a sostenere il fronte repubblicano con grano, olio e vino, nonostante l'isolamento geografico e la scarsità di fertilizzanti.",
    s3_4: "Marzo-aprile 1939: caduta finale della Repubblica; le miniere di Almadén vengono occupate dalle truppe franchiste e il mercurio viene immediatamente riservato alle commesse per Germania e Italia.",
    s5: "1939-1940: il mercurio di Almadén è la merce di scambio primaria della Spagna di Franco per pagare i debiti di guerra contratti con il Terzo Reich e l'Italia fascista.",
    s6: "Estate 1940: nella non belligeranza, le miniere di Almadén operano sotto regime militare di massima sicurezza per le forniture all'Asse.",
    s7: "Fine 1940: la popolazione rurale della Mancha soffre la penuria di sale, sapone e pane; dura repressione contro gli ex dirigenti sindacali delle miniere.",
    s8: "1941: Almadén produce a pieno ritmo fulminato di mercurio per le munizioni tedesche; ammasso granario capillare nella piana di Ciudad Real.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPR";
      if (step === 2) return "SPR";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Ciudad Real",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPR" : (step === 2 ? "SPR" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Ciudad Real";
      if (step < 3) return "Bando Nacional — Provincia de Ciudad Real";
      return "Estado Español — Provincia de Ciudad Real";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Comintern";
      if (step === 2) return "Comintern";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Cuore della Mancha rurale, terra del Don Chisciotte; presenza fondamentale delle miniere statali di mercurio di Almadén, tra le più ricche al mondo.";
      if (step === 1) return "1936-1938: fedele alla Repubblica per l'intera durata della guerra civile; le miniere di mercurio di Almadén sono una risorsa strategica vitale: la vendita di mercurio all'estero procura valuta pregiata al governo repubblicano.";
      if (step === 2) return "Autunno 1938: la provincia continua a sostenere il fronte repubblicano con grano, olio e vino, nonostante l'isolamento geografico e la scarsità di fertilizzanti.";
      if (step === 3 || step === 4) return "Marzo-aprile 1939: caduta finale della Repubblica; le miniere di Almadén vengono occupate dalle truppe franchiste e il mercurio viene immediatamente riservato alle commesse per Germania e Italia.";
      if (step === 5) return "1939-1940: il mercurio di Almadén è la merce di scambio primaria della Spagna di Franco per pagare i debiti di guerra contratti con il Terzo Reich e l'Italia fascista.";
      if (step === 6) return "Estate 1940: nella non belligeranza, le miniere di Almadén operano sotto regime militare di massima sicurezza per le forniture all'Asse.";
      if (step === 7) return "Fine 1940: la popolazione rurale della Mancha soffre la penuria di sale, sapone e pane; dura repressione contro gli ex dirigenti sindacali delle miniere.";
      return "1941: Almadén produce a pieno ritmo fulminato di mercurio per le munizioni tedesche; ammasso granario capillare nella piana di Ciudad Real.";
    }
  },
  "ES423": {
    nuts: "ES423",
    name: "Provincia de Cuenca",
    modernName: "Cuenca",
    historicalName: "Provincia de Cuenca",
    region: "Castilla-La Mancha",
    capital: "Cuenca",
    keys: ["cuenca", "es423", "provincia_de_cuenca"],
    s0: "Città medievale arroccata sulle gole del Júcar, celebre per le 'Casas Colgadas'; provincia montuosa e boscosa della Serranía de Cuenca a prevalenza agricola.",
    s1: "1936-1938: Cuenca rimane saldamente sotto il controllo della Repubblica per tutta la guerra civile, fungendo da retrovia logistica tra Madrid e Valencia (la via di comunicazione vitale dell'autostrada repubblicana).",
    s2: "1938: le foreste della Serranía di Cuenca forniscono legname e carbone vegetale per la Madrid assediata; le comunità agrarie subiscono le difficoltà dell'economia di guerra.",
    s3_4: "Marzo 1939: occupazione da parte delle truppe franchiste durante il collasso finale del fronte Centro-Sud; persecuzione dei membri del comitato rivoluzionario provinciale.",
    s5: "1939-1940: nella neutralità, Cuenca torna sotto l'influenza dei proprietari terrieri tradizionali e della Chiesa; legname e resina sono requisiti per l'autarchia.",
    s6: "Estate 1940: la Serranía di Cuenca vede la comparsa dei primi gruppi di guerriglieri antifascisti (i maquis della Agrupación Guerrillera de Levante y Aragón).",
    s7: "Fine 1940: rigido inverno montano; la popolazione civile soffre la carenza di tessuti caldi e medicinali sotto il ferreo controllo prefettizio.",
    s8: "1941: intensificazione delle operazioni della Guardia Civil nei boschi di Cuenca per reprimere i rifugiati politici armati.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPR";
      if (step === 2) return "SPR";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Cuenca",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPR" : (step === 2 ? "SPR" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Cuenca";
      if (step < 3) return "Bando Nacional — Provincia de Cuenca";
      return "Estado Español — Provincia de Cuenca";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Comintern";
      if (step === 2) return "Comintern";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Città medievale arroccata sulle gole del Júcar, celebre per le 'Casas Colgadas'; provincia montuosa e boscosa della Serranía de Cuenca a prevalenza agricola.";
      if (step === 1) return "1936-1938: Cuenca rimane saldamente sotto il controllo della Repubblica per tutta la guerra civile, fungendo da retrovia logistica tra Madrid e Valencia (la via di comunicazione vitale dell'autostrada repubblicana).";
      if (step === 2) return "1938: le foreste della Serranía di Cuenca forniscono legname e carbone vegetale per la Madrid assediata; le comunità agrarie subiscono le difficoltà dell'economia di guerra.";
      if (step === 3 || step === 4) return "Marzo 1939: occupazione da parte delle truppe franchiste durante il collasso finale del fronte Centro-Sud; persecuzione dei membri del comitato rivoluzionario provinciale.";
      if (step === 5) return "1939-1940: nella neutralità, Cuenca torna sotto l'influenza dei proprietari terrieri tradizionali e della Chiesa; legname e resina sono requisiti per l'autarchia.";
      if (step === 6) return "Estate 1940: la Serranía di Cuenca vede la comparsa dei primi gruppi di guerriglieri antifascisti (i maquis della Agrupación Guerrillera de Levante y Aragón).";
      if (step === 7) return "Fine 1940: rigido inverno montano; la popolazione civile soffre la carenza di tessuti caldi e medicinali sotto il ferreo controllo prefettizio.";
      return "1941: intensificazione delle operazioni della Guardia Civil nei boschi di Cuenca per reprimere i rifugiati politici armati.";
    }
  },
  "ES424": {
    nuts: "ES424",
    name: "Provincia de Guadalajara",
    modernName: "Guadalajara",
    historicalName: "Provincia de Guadalajara",
    region: "Castilla-La Mancha",
    capital: "Guadalajara",
    keys: ["es424", "guadalajara", "provincia_de_guadalajara"],
    s0: "Provincia a nord-est di Madrid, porta d'accesso alla capitale dalla Castiglia e dall'Aragona; sede di industrie aeronautiche (stabilimento Hispano-Suiza).",
    s1: "Marzo 1937: celebre **Battaglia di Guadalajara**, in cui l'Esercito Repubblicano e le Brigate Internazionali (tra cui il Battaglione Garibaldi di antifascisti italiani) sconfiggono clamorosamente il Corpo Truppe Volontarie (CTV) fascista italiano nel fango e nella nebbia; il fronte si stabilizza per il resto della guerra.",
    s2: "1938: la provincia rimane trincerata a protezione di Madrid; continue schermaglie d'artiglieria e guerra di posizione lungo il fiume Tajuña.",
    s3_4: "Marzo 1939: crollo del fronte repubblicano e resa della guarnigione; ingresso delle truppe nazionaliste e arresto di massa dei militanti della sinistra.",
    s5: "1939-1940: nella neutralità, la Hispano-Suiza e le officine meccaniche vengono riconvertite alla riparazione di mezzi militari per l'esercito franchista.",
    s6: "Estate 1940: celebrazioni della Falange cancellano il ricordo della sconfitta italiana del 1937, glorificando la vittoria del fascismo iberico.",
    s7: "Fine 1940: la popolazione affronta la dura carestia della meseta; severe sanzioni per chi tenta di macinare grano illegalmente.",
    s8: "1941: Guadalajara contribuisce con grano e reclute alla Spagna autarchica; arruolamento di volontari per la spedizione antibolscevica in Russia.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPR";
      if (step === 2) return "SPR";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Guadalajara",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPR" : (step === 2 ? "SPR" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Guadalajara";
      if (step < 3) return "Bando Nacional — Provincia de Guadalajara";
      return "Estado Español — Provincia de Guadalajara";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Comintern";
      if (step === 2) return "Comintern";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia a nord-est di Madrid, porta d'accesso alla capitale dalla Castiglia e dall'Aragona; sede di industrie aeronautiche (stabilimento Hispano-Suiza).";
      if (step === 1) return "Marzo 1937: celebre **Battaglia di Guadalajara**, in cui l'Esercito Repubblicano e le Brigate Internazionali (tra cui il Battaglione Garibaldi di antifascisti italiani) sconfiggono clamorosamente il Corpo Truppe Volontarie (CTV) fascista italiano nel fango e nella nebbia; il fronte si stabilizza per il resto della guerra.";
      if (step === 2) return "1938: la provincia rimane trincerata a protezione di Madrid; continue schermaglie d'artiglieria e guerra di posizione lungo il fiume Tajuña.";
      if (step === 3 || step === 4) return "Marzo 1939: crollo del fronte repubblicano e resa della guarnigione; ingresso delle truppe nazionaliste e arresto di massa dei militanti della sinistra.";
      if (step === 5) return "1939-1940: nella neutralità, la Hispano-Suiza e le officine meccaniche vengono riconvertite alla riparazione di mezzi militari per l'esercito franchista.";
      if (step === 6) return "Estate 1940: celebrazioni della Falange cancellano il ricordo della sconfitta italiana del 1937, glorificando la vittoria del fascismo iberico.";
      if (step === 7) return "Fine 1940: la popolazione affronta la dura carestia della meseta; severe sanzioni per chi tenta di macinare grano illegalmente.";
      return "1941: Guadalajara contribuisce con grano e reclute alla Spagna autarchica; arruolamento di volontari per la spedizione antibolscevica in Russia.";
    }
  },
  "ES425": {
    nuts: "ES425",
    name: "Provincia de Toledo",
    modernName: "Toledo",
    historicalName: "Provincia de Toledo",
    region: "Castilla-La Mancha",
    capital: "Toledo",
    keys: ["es425", "provincia_de_toledo", "toledo"],
    s0: "Antica capitale imperiale della Spagna imperiale sulle anse del Tago, sede dell'Alcázar e della Fabbrica Nazionale d'Armi; sede primaziale della Chiesa cattolica spagnola (cardinale Gomá).",
    s1: "Luglio-settembre 1936: celebre e drammatico **Assedio dell'Alcázar di Toledo**: il colonnello Moscardó si barrica nella fortezza con 1.000 difensori resistendo per due mesi agli attacchi repubblicani; il 27 settembre 1936 le truppe di Franco liberano l'Alcázar trasformandolo nel mito fondativo supremo del Bando Nacional; la Fabbrica d'Armi passa ai nazionalisti.",
    s2: "1938: Toledo è la capitale spirituale della crociata franchista benedetta dal cardinale primate Gomá; la Fabbrica d'Armi produce munizioni e armi leggere per l'esercito di Burgos.",
    s3_4: "1939: l'Alcázar in macerie diventa santuario nazionale del franchismo visitato da delegazioni straniere; Moscardó è nominato eroe della patria.",
    s5: "1939-1940: nella neutralità, Toledo vede la ricostruzione monumentale dell'Alcázar; la Chiesa cattolica e l'esercito esercitano un controllo assoluto sulla vita pubblica.",
    s6: "Giugno 1940: durante la non belligeranza, Toledo accoglie visite di alti dignitari nazisti e fascisti che rendono omaggio alle rovine dell'Alcázar.",
    s7: "Ottobre 1940: Heinrich Himmler visita Toledo e l'Alcázar durante il suo viaggio in Spagna, accolto con gli onori militari franchisti.",
    s8: "Primavera 1941: l'Accademia di Toledo e i battaglioni toledani forniscono centinaia di ufficiali e cadetti per i ranghi d'assalto della División Azul.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Toledo",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Toledo";
      if (step < 3) return "Bando Nacional — Provincia de Toledo";
      return "Estado Español — Provincia de Toledo";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Antica capitale imperiale della Spagna imperiale sulle anse del Tago, sede dell'Alcázar e della Fabbrica Nazionale d'Armi; sede primaziale della Chiesa cattolica spagnola (cardinale Gomá).";
      if (step === 1) return "Luglio-settembre 1936: celebre e drammatico **Assedio dell'Alcázar di Toledo**: il colonnello Moscardó si barrica nella fortezza con 1.000 difensori resistendo per due mesi agli attacchi repubblicani; il 27 settembre 1936 le truppe di Franco liberano l'Alcázar trasformandolo nel mito fondativo supremo del Bando Nacional; la Fabbrica d'Armi passa ai nazionalisti.";
      if (step === 2) return "1938: Toledo è la capitale spirituale della crociata franchista benedetta dal cardinale primate Gomá; la Fabbrica d'Armi produce munizioni e armi leggere per l'esercito di Burgos.";
      if (step === 3 || step === 4) return "1939: l'Alcázar in macerie diventa santuario nazionale del franchismo visitato da delegazioni straniere; Moscardó è nominato eroe della patria.";
      if (step === 5) return "1939-1940: nella neutralità, Toledo vede la ricostruzione monumentale dell'Alcázar; la Chiesa cattolica e l'esercito esercitano un controllo assoluto sulla vita pubblica.";
      if (step === 6) return "Giugno 1940: durante la non belligeranza, Toledo accoglie visite di alti dignitari nazisti e fascisti che rendono omaggio alle rovine dell'Alcázar.";
      if (step === 7) return "Ottobre 1940: Heinrich Himmler visita Toledo e l'Alcázar durante il suo viaggio in Spagna, accolto con gli onori militari franchisti.";
      return "Primavera 1941: l'Accademia di Toledo e i battaglioni toledani forniscono centinaia di ufficiali e cadetti per i ranghi d'assalto della División Azul.";
    }
  },
  "ES431": {
    nuts: "ES431",
    name: "Provincia de Badajoz",
    modernName: "Badajoz",
    historicalName: "Provincia de Badajoz",
    region: "Extremadura",
    capital: "Badajoz",
    keys: ["badajoz", "es431", "provincia_de_badajoz"],
    s0: "Vasta provincia al confine con il Portogallo, dominata dal latifondo agrario e da un'immensa massa di braccianti poveri ('yunteros') che nel marzo 1936 avevano occupato pacificamente le terre incolte.",
    s1: "Agosto 1936: teatro della tragica **Presa e Massacro di Badajoz**; le colonne dell'Ejército de África guidate dal colonnello Juan Yagüe conquistano la città e fucilano nella plaza de toros e nei cimiteri tra i 2.000 e i 4.000 repubblicani e braccianti; la provincia è saldamente nazionalista.",
    s2: "1938: retrovia strategica per il fronte dell'Estremadura; le terre occupate dai braccianti vengono restituite con la forza ai vecchi proprietari terrieri; lavoro coatto per i prigionieri.",
    s3_4: "1939: terrore bianco consolidato e pacificazione forzata; migliaia di vedove e orfani repubblicani vivono nella miseria nera; controllo della Guardia Civil sul confine portoghese.",
    s5: "1939-1940: nella neutralità, Badajoz vive di agricoltura latifondista e contrabbando con il Portogallo attraverso Elvas e Campo Maior.",
    s6: "Estate 1940: presidio militare di frontiera in clima di non belligeranza; pattuglie congiunte vigilano contro la fuga di antifascisti verso Lisbona.",
    s7: "Fine 1940: carestia acuta ('los años del hambre') tra il bracciantato dell'Estremadura, con pane di ghiande e borsa nera.",
    s8: "1941: Badajoz garantisce frumento e suini per le razioni statali; reclutamento forzato o opportunistico di disoccupati nella División Azul.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Badajoz",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Badajoz";
      if (step < 3) return "Bando Nacional — Provincia de Badajoz";
      return "Estado Español — Provincia de Badajoz";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Vasta provincia al confine con il Portogallo, dominata dal latifondo agrario e da un'immensa massa di braccianti poveri ('yunteros') che nel marzo 1936 avevano occupato pacificamente le terre incolte.";
      if (step === 1) return "Agosto 1936: teatro della tragica **Presa e Massacro di Badajoz**; le colonne dell'Ejército de África guidate dal colonnello Juan Yagüe conquistano la città e fucilano nella plaza de toros e nei cimiteri tra i 2.000 e i 4.000 repubblicani e braccianti; la provincia è saldamente nazionalista.";
      if (step === 2) return "1938: retrovia strategica per il fronte dell'Estremadura; le terre occupate dai braccianti vengono restituite con la forza ai vecchi proprietari terrieri; lavoro coatto per i prigionieri.";
      if (step === 3 || step === 4) return "1939: terrore bianco consolidato e pacificazione forzata; migliaia di vedove e orfani repubblicani vivono nella miseria nera; controllo della Guardia Civil sul confine portoghese.";
      if (step === 5) return "1939-1940: nella neutralità, Badajoz vive di agricoltura latifondista e contrabbando con il Portogallo attraverso Elvas e Campo Maior.";
      if (step === 6) return "Estate 1940: presidio militare di frontiera in clima di non belligeranza; pattuglie congiunte vigilano contro la fuga di antifascisti verso Lisbona.";
      if (step === 7) return "Fine 1940: carestia acuta ('los años del hambre') tra il bracciantato dell'Estremadura, con pane di ghiande e borsa nera.";
      return "1941: Badajoz garantisce frumento e suini per le razioni statali; reclutamento forzato o opportunistico di disoccupati nella División Azul.";
    }
  },
  "ES432": {
    nuts: "ES432",
    name: "Provincia de Cáceres",
    modernName: "Cáceres",
    historicalName: "Provincia de Cáceres",
    region: "Extremadura",
    capital: "Cáceres",
    keys: ["cceres", "es432", "provincia_de_cceres"],
    s0: "Provincia dell'Alta Estremadura con il magnifico centro storico medievale di Cáceres e il santuario mariano di Guadalupe; agricoltura estensiva e allevamento di bestiame.",
    s1: "Luglio-agosto 1936: i militari e la Falange prendono rapidamente il potere a Cáceres; a Guadalupe Franco e i suoi generali vengono consacrati alla Vergine patrona dell'ispanità; punto d'unione tra le armate del Sud e del Nord.",
    s2: "1938: base logistica per le divisioni franchiste che attaccano la sacca repubblicana della Serena; i latifondi riforniscono carne e lana per l'esercito.",
    s3_4: "1939: vittoria di Franco; celebrazioni religiose a Guadalupe; repressione sistematica dei comitati contadini e restaurazione dell'ordine agrario.",
    s5: "1939-1940: nella neutralità, Cáceres soffre l'isolamento e la penuria di generi primari; la pastorizia transumante garantisce lana per le uniformi dell'esercito.",
    s6: "Estate 1940: i passi montani verso il Portogallo sono presidiati per intercettare agenti alleati e profughi in fuga dall'Europa occupata.",
    s7: "Fine 1940: fame e freddo nelle campagne estremeñe; le famiglie contadine sopravvivono grazie all'estraperlo di farina e olio.",
    s8: "1941: Cáceres fornisce reclute per la División Azul e mantiene la sua fedeltà al regime franchista attraverso la rete dei cacicchi locali.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Cáceres",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Cáceres";
      if (step < 3) return "Bando Nacional — Provincia de Cáceres";
      return "Estado Español — Provincia de Cáceres";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia dell'Alta Estremadura con il magnifico centro storico medievale di Cáceres e il santuario mariano di Guadalupe; agricoltura estensiva e allevamento di bestiame.";
      if (step === 1) return "Luglio-agosto 1936: i militari e la Falange prendono rapidamente il potere a Cáceres; a Guadalupe Franco e i suoi generali vengono consacrati alla Vergine patrona dell'ispanità; punto d'unione tra le armate del Sud e del Nord.";
      if (step === 2) return "1938: base logistica per le divisioni franchiste che attaccano la sacca repubblicana della Serena; i latifondi riforniscono carne e lana per l'esercito.";
      if (step === 3 || step === 4) return "1939: vittoria di Franco; celebrazioni religiose a Guadalupe; repressione sistematica dei comitati contadini e restaurazione dell'ordine agrario.";
      if (step === 5) return "1939-1940: nella neutralità, Cáceres soffre l'isolamento e la penuria di generi primari; la pastorizia transumante garantisce lana per le uniformi dell'esercito.";
      if (step === 6) return "Estate 1940: i passi montani verso il Portogallo sono presidiati per intercettare agenti alleati e profughi in fuga dall'Europa occupata.";
      if (step === 7) return "Fine 1940: fame e freddo nelle campagne estremeñe; le famiglie contadine sopravvivono grazie all'estraperlo di farina e olio.";
      return "1941: Cáceres fornisce reclute per la División Azul e mantiene la sua fedeltà al regime franchista attraverso la rete dei cacicchi locali.";
    }
  },
  "ES511": {
    nuts: "ES511",
    name: "Provincia de Barcelona",
    modernName: "Barcelona",
    historicalName: "Provincia de Barcelona",
    region: "Cataluña",
    capital: "Barcelona",
    keys: ["barcelona", "es511", "provincia_de_barcelona"],
    s0: "Capitale della Catalogna autonoma (Generalitat guidata da Lluís Companys), massimo polo industriale della Spagna e cuore del movimento anarco-sindacalista (CNT-FAI); tensioni prerivoluzionarie nella primavera del 1936.",
    s1: "Luglio 1936 - marzo 1938: sconfitta del golpe militare del generale Goded per l'azione congiunta di operai armati della CNT e Guardia de Asalto; Barcellona vive la rivoluzione sociale libertaria (collettivizzazioni di fabbriche e trasporti); nel maggio 1937 scoppiano i sanguinosi sconti interni ('Giornate di Maggio') tra anarchici/POUM e comunisti/PSUC; a fine 1937 Barcellona diviene la sede del Governo della Repubblica presieduto da Juan Negrín; durissimi bombardamenti aerei a tappeto dell'Aviazione Legionaria italiana da Maiorca nel marzo 1938.",
    s2: "Autunno 1938: Barcellona è sottoposta a bombardamenti continui da parte dell'aviazione fascista e al blocco navale; il 28 ottobre 1938 si tiene l'emozionante sfilata d'addio alle Brigate Internazionali con il celebre discorso di Dolores Ibárruri 'La Pasionaria'; fame e rifugi antiaerei sotterranei.",
    s3_4: "Gennaio-aprile 1939: 26 gennaio 1939, le truppe franchiste e il CTV italiano entrano a Barcellona senza incontrare resistenza; 'La Retirada' di oltre 400.000 catalani e soldati verso i Pirenei francesi; Franco abroga lo Statuto d'Autonomia, proibisce l'uso del catalano e avvia processi ed esecuzioni al Camp de la Bota.",
    s5: "Settembre 1939 - maggio 1940: nella Spagna neutrale, Barcellona è una città occupata e piegata dalla miseria; le industrie tessili e chimiche lavorano sotto controllo dei sindacati franchisti; borsa nera endemica al porto e sul Paral·lel.",
    s6: "Giugno 1940: le autorità franchiste celebrano la caduta della Francia; il porto di Barcellona è sorvegliato dalla Marina per prevenire fughe e accogliere consoli e fiduciari dell'Asse.",
    s7: "Ottobre 1940: il presidente della Generalitat Lluís Companys, catturato in Francia dalla Gestapo ed estradato a Franco, viene fucilato al Castello di Montjuïc il 15 ottobre 1940 gridando 'Per Catalunya!'; visita di Heinrich Himmler a Barcellona e al monastero di Montserrat alla ricerca del Graal.",
    s8: "Primavera 1941: Barcellona è un focolaio sotterraneo di dissenso controllato da una massiccia presenza di polizia; la carestia dei primi 'años del hambre' miete vittime nei quartieri popolari.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPR";
      if (step === 2) return "SPR";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Barcelona",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPR" : (step === 2 ? "SPR" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Barcelona";
      if (step < 3) return "Bando Nacional — Provincia de Barcelona";
      return "Estado Español — Provincia de Barcelona";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Comintern";
      if (step === 2) return "Comintern";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Capitale della Catalogna autonoma (Generalitat guidata da Lluís Companys), massimo polo industriale della Spagna e cuore del movimento anarco-sindacalista (CNT-FAI); tensioni prerivoluzionarie nella primavera del 1936.";
      if (step === 1) return "Luglio 1936 - marzo 1938: sconfitta del golpe militare del generale Goded per l'azione congiunta di operai armati della CNT e Guardia de Asalto; Barcellona vive la rivoluzione sociale libertaria (collettivizzazioni di fabbriche e trasporti); nel maggio 1937 scoppiano i sanguinosi sconti interni ('Giornate di Maggio') tra anarchici/POUM e comunisti/PSUC; a fine 1937 Barcellona diviene la sede del Governo della Repubblica presieduto da Juan Negrín; durissimi bombardamenti aerei a tappeto dell'Aviazione Legionaria italiana da Maiorca nel marzo 1938.";
      if (step === 2) return "Autunno 1938: Barcellona è sottoposta a bombardamenti continui da parte dell'aviazione fascista e al blocco navale; il 28 ottobre 1938 si tiene l'emozionante sfilata d'addio alle Brigate Internazionali con il celebre discorso di Dolores Ibárruri 'La Pasionaria'; fame e rifugi antiaerei sotterranei.";
      if (step === 3 || step === 4) return "Gennaio-aprile 1939: 26 gennaio 1939, le truppe franchiste e il CTV italiano entrano a Barcellona senza incontrare resistenza; 'La Retirada' di oltre 400.000 catalani e soldati verso i Pirenei francesi; Franco abroga lo Statuto d'Autonomia, proibisce l'uso del catalano e avvia processi ed esecuzioni al Camp de la Bota.";
      if (step === 5) return "Settembre 1939 - maggio 1940: nella Spagna neutrale, Barcellona è una città occupata e piegata dalla miseria; le industrie tessili e chimiche lavorano sotto controllo dei sindacati franchisti; borsa nera endemica al porto e sul Paral·lel.";
      if (step === 6) return "Giugno 1940: le autorità franchiste celebrano la caduta della Francia; il porto di Barcellona è sorvegliato dalla Marina per prevenire fughe e accogliere consoli e fiduciari dell'Asse.";
      if (step === 7) return "Ottobre 1940: il presidente della Generalitat Lluís Companys, catturato in Francia dalla Gestapo ed estradato a Franco, viene fucilato al Castello di Montjuïc il 15 ottobre 1940 gridando 'Per Catalunya!'; visita di Heinrich Himmler a Barcellona e al monastero di Montserrat alla ricerca del Graal.";
      return "Primavera 1941: Barcellona è un focolaio sotterraneo di dissenso controllato da una massiccia presenza di polizia; la carestia dei primi 'años del hambre' miete vittime nei quartieri popolari.";
    }
  },
  "ES512": {
    nuts: "ES512",
    name: "Provincia de Gerona",
    modernName: "Girona",
    historicalName: "Provincia de Gerona",
    region: "Cataluña",
    capital: "Gerona",
    keys: ["es512", "gerona", "girona", "provincia_de_gerona"],
    s0: "Provincia catalana di confine con la Francia, culla del cooperativismo operaio, agricoltura fertile e la splendida Costa Brava; fedele alla Generalitat e alla Repubblica.",
    s1: "1936-1938: Gerona è retroterra vitale della Repubblica: attraverso il valico ferroviario di Portbou transitano volontari delle Brigate Internazionali, armi e medicinali inviati dalla Francia e dall'URSS.",
    s2: "Autunno 1938: Portbou e Figueres subiscono pesanti bombardamenti aerei italo-tedeschi mirati a interrompere i collegamenti con la Francia; migliaia di profughi affluiscono da tutta la Catalogna.",
    s3_4: "Febbraio 1939: l'1-4 febbraio 1939 il Castello di Sant Ferran a Figueres ospita l'ultima e drammatica seduta delle Cortes repubblicane; 'La Retirada': mezzo milione di profughi attraversa la frontiera di Portbou e La Jonquera verso i campi d'internamento francesi di Argelès e Saint-Cyprien; ingresso dei franchisti il 5 febbraio.",
    s5: "1939-1940: nella neutralità, la frontiera di Portbou riapre sotto rigido controllo militare franchista e collabora con la polizia francese prima e della Gestapo poi.",
    s6: "Giugno 1940: con la disfatta francese, i posti di confine di Portbou e La Jonquera vedono l'arrivo della Wehrmacht sul versante opposto; transito di migliaia di rifugiati in fuga dal nazismo (tra cui il filosofo Walter Benjamin che si toglie la vita a Portbou nel settembre 1940).",
    s7: "Fine 1940: la frontiera pirenaica di Gerona è una delle zone di massima tensione spionistica d'Europa tra Abwehr tedesca, spionaggio britannico e consolati alleati.",
    s8: "1941: Gerona soffre le restrizioni autarchiche; la Guardia Civil sorveglia sentieri montani e coste per bloccare le reti di evasione alleate che operano attraverso i Pirenei.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPR";
      if (step === 2) return "SPR";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Gerona",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPR" : (step === 2 ? "SPR" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Gerona";
      if (step < 3) return "Bando Nacional — Provincia de Gerona";
      return "Estado Español — Provincia de Gerona";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Comintern";
      if (step === 2) return "Comintern";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia catalana di confine con la Francia, culla del cooperativismo operaio, agricoltura fertile e la splendida Costa Brava; fedele alla Generalitat e alla Repubblica.";
      if (step === 1) return "1936-1938: Gerona è retroterra vitale della Repubblica: attraverso il valico ferroviario di Portbou transitano volontari delle Brigate Internazionali, armi e medicinali inviati dalla Francia e dall'URSS.";
      if (step === 2) return "Autunno 1938: Portbou e Figueres subiscono pesanti bombardamenti aerei italo-tedeschi mirati a interrompere i collegamenti con la Francia; migliaia di profughi affluiscono da tutta la Catalogna.";
      if (step === 3 || step === 4) return "Febbraio 1939: l'1-4 febbraio 1939 il Castello di Sant Ferran a Figueres ospita l'ultima e drammatica seduta delle Cortes repubblicane; 'La Retirada': mezzo milione di profughi attraversa la frontiera di Portbou e La Jonquera verso i campi d'internamento francesi di Argelès e Saint-Cyprien; ingresso dei franchisti il 5 febbraio.";
      if (step === 5) return "1939-1940: nella neutralità, la frontiera di Portbou riapre sotto rigido controllo militare franchista e collabora con la polizia francese prima e della Gestapo poi.";
      if (step === 6) return "Giugno 1940: con la disfatta francese, i posti di confine di Portbou e La Jonquera vedono l'arrivo della Wehrmacht sul versante opposto; transito di migliaia di rifugiati in fuga dal nazismo (tra cui il filosofo Walter Benjamin che si toglie la vita a Portbou nel settembre 1940).";
      if (step === 7) return "Fine 1940: la frontiera pirenaica di Gerona è una delle zone di massima tensione spionistica d'Europa tra Abwehr tedesca, spionaggio britannico e consolati alleati.";
      return "1941: Gerona soffre le restrizioni autarchiche; la Guardia Civil sorveglia sentieri montani e coste per bloccare le reti di evasione alleate che operano attraverso i Pirenei.";
    }
  },
  "ES513": {
    nuts: "ES513",
    name: "Provincia de Lérida",
    modernName: "Lleida",
    historicalName: "Provincia de Lérida",
    region: "Cataluña",
    capital: "Lérida",
    keys: ["es513", "lleida", "lrida", "provincia_de_lrida"],
    s0: "Porta d'accesso alla Catalogna occidentale adagiata sul fiume Segre; ricca agricoltura frutticola e cerealicoltura; valli pirenaiche della Val d'Aran con legami storici con l'Occitania.",
    s1: "Aprile 1938: le truppe franchiste della IV Divisione Navarra sfondano le linee aragonesi e conquistano la città di Lérida; il fronte repubblicano si attesta sulla sponda sinistra del fiume Segre, che divide la provincia per nove lunghi mesi in una cruenta guerra di trincea.",
    s2: "Autunno 1938: la linea del Segre è teatro di aspri combattimenti a supporto della Battaglia dell'Ebro; bombardamenti continui distruggono interi quartieri di Lérida e i ponti sul fiume.",
    s3_4: "Gennaio 1939: Franco lancia la grande offensiva di Catalogna sfondando la linea del Segre; liberazione delle valli pirenaiche e caduta della Val d'Aran; dura epurazione dei comitati contadini.",
    s5: "1939-1940: nella neutralità, la provincia comincia la ricostruzione delle infrastrutture distrutte; l'agricoltura del Segre è sottoposta a rigidi ammassi granari.",
    s6: "Estate 1940: i valichi pirenaici della Val d'Aran e di Andorra diventano rotte di passaggio per evasi e corrieri della resistenza francese e antifascista.",
    s7: "Fine 1940: gelo continentale e fame nelle campagne leridane; rigido controllo politico della Falange sui braccianti e mezzadri.",
    s8: "1941: Lérida riattiva la produzione agricola autarchica; forti presidi militari per prevenire infiltrazioni clandestine dai Pirenei.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPR";
      if (step === 2) return "SPR";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Lérida",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPR" : (step === 2 ? "SPR" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Lérida";
      if (step < 3) return "Bando Nacional — Provincia de Lérida";
      return "Estado Español — Provincia de Lérida";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Comintern";
      if (step === 2) return "Comintern";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Porta d'accesso alla Catalogna occidentale adagiata sul fiume Segre; ricca agricoltura frutticola e cerealicoltura; valli pirenaiche della Val d'Aran con legami storici con l'Occitania.";
      if (step === 1) return "Aprile 1938: le truppe franchiste della IV Divisione Navarra sfondano le linee aragonesi e conquistano la città di Lérida; il fronte repubblicano si attesta sulla sponda sinistra del fiume Segre, che divide la provincia per nove lunghi mesi in una cruenta guerra di trincea.";
      if (step === 2) return "Autunno 1938: la linea del Segre è teatro di aspri combattimenti a supporto della Battaglia dell'Ebro; bombardamenti continui distruggono interi quartieri di Lérida e i ponti sul fiume.";
      if (step === 3 || step === 4) return "Gennaio 1939: Franco lancia la grande offensiva di Catalogna sfondando la linea del Segre; liberazione delle valli pirenaiche e caduta della Val d'Aran; dura epurazione dei comitati contadini.";
      if (step === 5) return "1939-1940: nella neutralità, la provincia comincia la ricostruzione delle infrastrutture distrutte; l'agricoltura del Segre è sottoposta a rigidi ammassi granari.";
      if (step === 6) return "Estate 1940: i valichi pirenaici della Val d'Aran e di Andorra diventano rotte di passaggio per evasi e corrieri della resistenza francese e antifascista.";
      if (step === 7) return "Fine 1940: gelo continentale e fame nelle campagne leridane; rigido controllo politico della Falange sui braccianti e mezzadri.";
      return "1941: Lérida riattiva la produzione agricola autarchica; forti presidi militari per prevenire infiltrazioni clandestine dai Pirenei.";
    }
  },
  "ES514": {
    nuts: "ES514",
    name: "Provincia de Tarragona",
    modernName: "Tarragona",
    historicalName: "Provincia de Tarragona",
    region: "Cataluña",
    capital: "Tarragona",
    keys: ["es514", "provincia_de_tarragona", "tarragona"],
    s0: "Provincia costiera catalana con l'antico porto romano di Tarragona e il fertile delta dell'Ebro (coltivazione intensiva del riso); fedele alla Repubblica.",
    s1: "1936-1938: il porto di Tarragona è vitale per l'approvvigionamento alimentare della Catalogna; la risicoltura del Delta dell'Ebro nutre la popolazione catalana.",
    s2: "Luglio - novembre 1938: la parte meridionale della provincia (Terra Alta, Gandesa, Corbera d'Ebre) è il teatro centrale della titanica e sanguinosa **Battaglia dell'Ebro**, la più grande e distruttiva battaglia della guerra civile (oltre 100.000 vittime complessive); paesi rasi al suolo dall'aviazione nazionalista.",
    s3_4: "Gennaio 1939: dopo la sconfitta sull'Ebro, le truppe franchiste avanzano lungo la costa conquistando Tarragona il 15 gennaio 1939; esodo di massa verso Barcellona.",
    s5: "1939-1940: nella neutralità, la provincia affronta le immani devastazioni della Terra Alta; la produzione di riso del delta dell'Ebro è requisita dalle autorità annonarie statali.",
    s6: "Estate 1940: il porto di Tarragona riapre al cabotaggio costiero in un clima di non belligeranza; batterie costiere presidiano l'accesso al golfo di Sant Jordi.",
    s7: "Fine 1940: povertà estrema tra i contadini e i pescatori; la memoria della carneficina dell'Ebro è repressa con il divieto di parlare dei caduti repubblicani.",
    s8: "1941: la provincia garantisce riso e vino all'economia autarchica; le carceri locali rimangono piene di prigionieri politici impiegati nei battaglioni di lavoro coatto.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPR";
      if (step === 2) return "SPR";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Tarragona",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPR" : (step === 2 ? "SPR" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Tarragona";
      if (step < 3) return "Bando Nacional — Provincia de Tarragona";
      return "Estado Español — Provincia de Tarragona";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Comintern";
      if (step === 2) return "Comintern";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia costiera catalana con l'antico porto romano di Tarragona e il fertile delta dell'Ebro (coltivazione intensiva del riso); fedele alla Repubblica.";
      if (step === 1) return "1936-1938: il porto di Tarragona è vitale per l'approvvigionamento alimentare della Catalogna; la risicoltura del Delta dell'Ebro nutre la popolazione catalana.";
      if (step === 2) return "Luglio - novembre 1938: la parte meridionale della provincia (Terra Alta, Gandesa, Corbera d'Ebre) è il teatro centrale della titanica e sanguinosa **Battaglia dell'Ebro**, la più grande e distruttiva battaglia della guerra civile (oltre 100.000 vittime complessive); paesi rasi al suolo dall'aviazione nazionalista.";
      if (step === 3 || step === 4) return "Gennaio 1939: dopo la sconfitta sull'Ebro, le truppe franchiste avanzano lungo la costa conquistando Tarragona il 15 gennaio 1939; esodo di massa verso Barcellona.";
      if (step === 5) return "1939-1940: nella neutralità, la provincia affronta le immani devastazioni della Terra Alta; la produzione di riso del delta dell'Ebro è requisita dalle autorità annonarie statali.";
      if (step === 6) return "Estate 1940: il porto di Tarragona riapre al cabotaggio costiero in un clima di non belligeranza; batterie costiere presidiano l'accesso al golfo di Sant Jordi.";
      if (step === 7) return "Fine 1940: povertà estrema tra i contadini e i pescatori; la memoria della carneficina dell'Ebro è repressa con il divieto di parlare dei caduti repubblicani.";
      return "1941: la provincia garantisce riso e vino all'economia autarchica; le carceri locali rimangono piene di prigionieri politici impiegati nei battaglioni di lavoro coatto.";
    }
  },
  "ES521": {
    nuts: "ES521",
    name: "Provincia de Alicante",
    modernName: "Alicante/Alacant",
    historicalName: "Provincia de Alicante",
    region: "Comunidad Valenciana",
    capital: "Alicante",
    keys: ["alacant", "alicante", "alicantealacant", "es521", "provincia_de_alicante"],
    s0: "Provincia levantina mediterranea con porto fiorente, calzaturifici (Elche), agricoltura irrigua e il carcere provinciale di Alicante (dove all'inizio della guerra civile è detenuto José Antonio Primo de Rivera).",
    s1: "1936-1938: saldamente repubblicana per tutta la guerra civile; nel novembre 1936 nel carcere di Alicante viene processato e fucilato il fondatore della Falange José Antonio Primo de Rivera ('el Ausente'); il porto è bersaglio frequente di raid navali e aerei italiani.",
    s2: "Autunno 1938: Alicante e la costa levantina subiscono il blocco navale della flotta franchista; migliaia di profughi si rifugiano in città mentre il cibo comincia a scarseggiare drammaticamente.",
    s3_4: "Fine marzo 1939: **Ultimo atto tragico della Guerra Civile Spagnola**: al porto di Alicante si radunano oltre 15.000 repubblicani in disperata attesa di navi per fuggire all'estero; la nave carboniera Stanbrook riesce a trarre in salvo circa 3.000 profughi per Orano; il 30-31 marzo le truppe fasciste italiane della Divisione Littorio circondano il molo e internano migliaia di prigionieri nel famigerato 'Campo de los Almendros'.",
    s5: "1939-1940: nella neutralità, il corpo di José Antonio viene riesumato e trasportato solennemente a spalla da Alicante all'Escorial di Madrid in una gigantesca cerimonia funebre falangista.",
    s6: "Estate 1940: il porto di Alicante e la costa del Levante mantengono la massima vigilanza militare in clima di non belligeranza.",
    s7: "Fine 1940: razionamento acuto e borsa nera di agrumi e riso; le carceri di Alicante ospitano centinaia di condannati a morte repubblicani.",
    s8: "1941: Alicante contribuisce all'economia autarchica con la produzione calzaturiera e agrumicola; rigido controllo prefettizio sulla popolazione.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPR";
      if (step === 2) return "SPR";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Alicante",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPR" : (step === 2 ? "SPR" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Alicante";
      if (step < 3) return "Bando Nacional — Provincia de Alicante";
      return "Estado Español — Provincia de Alicante";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Comintern";
      if (step === 2) return "Comintern";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia levantina mediterranea con porto fiorente, calzaturifici (Elche), agricoltura irrigua e il carcere provinciale di Alicante (dove all'inizio della guerra civile è detenuto José Antonio Primo de Rivera).";
      if (step === 1) return "1936-1938: saldamente repubblicana per tutta la guerra civile; nel novembre 1936 nel carcere di Alicante viene processato e fucilato il fondatore della Falange José Antonio Primo de Rivera ('el Ausente'); il porto è bersaglio frequente di raid navali e aerei italiani.";
      if (step === 2) return "Autunno 1938: Alicante e la costa levantina subiscono il blocco navale della flotta franchista; migliaia di profughi si rifugiano in città mentre il cibo comincia a scarseggiare drammaticamente.";
      if (step === 3 || step === 4) return "Fine marzo 1939: **Ultimo atto tragico della Guerra Civile Spagnola**: al porto di Alicante si radunano oltre 15.000 repubblicani in disperata attesa di navi per fuggire all'estero; la nave carboniera Stanbrook riesce a trarre in salvo circa 3.000 profughi per Orano; il 30-31 marzo le truppe fasciste italiane della Divisione Littorio circondano il molo e internano migliaia di prigionieri nel famigerato 'Campo de los Almendros'.";
      if (step === 5) return "1939-1940: nella neutralità, il corpo di José Antonio viene riesumato e trasportato solennemente a spalla da Alicante all'Escorial di Madrid in una gigantesca cerimonia funebre falangista.";
      if (step === 6) return "Estate 1940: il porto di Alicante e la costa del Levante mantengono la massima vigilanza militare in clima di non belligeranza.";
      if (step === 7) return "Fine 1940: razionamento acuto e borsa nera di agrumi e riso; le carceri di Alicante ospitano centinaia di condannati a morte repubblicani.";
      return "1941: Alicante contribuisce all'economia autarchica con la produzione calzaturiera e agrumicola; rigido controllo prefettizio sulla popolazione.";
    }
  },
  "ES522": {
    nuts: "ES522",
    name: "Provincia de Castellón",
    modernName: "Castellón/Castelló",
    historicalName: "Provincia de Castellón",
    region: "Comunidad Valenciana",
    capital: "Castellón de la Plana",
    keys: ["castell", "castelln", "castelln_de_la_plana", "castellncastell", "es522", "provincia_de_castelln"],
    s0: "Provincia settentrionale del Levante valenciano, famosa per gli aranceti costieri della Plana e l'entroterra montuoso del Maestrazgo; fedele alla Repubblica.",
    s1: "Marzo-aprile 1938: teatro della svolta strategica della guerra civile; il 15 aprile 1938 le truppe della IV Divisione Navarra di Camilo Alonso Vega raggiungono il Mar Mediterraneo a **Vinaròs**, spaccando in due il territorio della Repubblica e isolando per sempre la Catalogna dal resto della Spagna; Castellón città cade il 14 giugno 1938.",
    s2: "Autunno 1938: la provincia di Castellón, ormai stabilmente occupata dai franchisti, è la base d'attacco meridionale contro il fianco repubblicano dell'Ebro e per l'avanzata verso Valencia.",
    s3_4: "1939: fine delle ostilità; sfilate della vittoria e restaurazione dell'ordine franchista; dura repressione dei sindacati agrari locali.",
    s5: "1939-1940: nella neutralità, gli agrumeti di Castellón riprendono l'esportazione di arance verso la Germania e la Gran Bretagna per procurare valuta pregiata.",
    s6: "Estate 1940: le coste di Vinaròs e Benicàssim sono presidiate contro incursioni clandestine; adesione alle direttive di non belligeranza.",
    s7: "Fine 1940: penuria di fertilizzanti chimici e carburanti; calo della resa dei raccolti e aumento del tesseramento annonario.",
    s8: "1941: la provincia esporta arance e ceramiche autarchiche; arruolamento di giovani della Plana nella División Azul.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPR";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Castellón",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPR" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Castellón";
      if (step < 3) return "Bando Nacional — Provincia de Castellón";
      return "Estado Español — Provincia de Castellón";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Comintern";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia settentrionale del Levante valenciano, famosa per gli aranceti costieri della Plana e l'entroterra montuoso del Maestrazgo; fedele alla Repubblica.";
      if (step === 1) return "Marzo-aprile 1938: teatro della svolta strategica della guerra civile; il 15 aprile 1938 le truppe della IV Divisione Navarra di Camilo Alonso Vega raggiungono il Mar Mediterraneo a **Vinaròs**, spaccando in due il territorio della Repubblica e isolando per sempre la Catalogna dal resto della Spagna; Castellón città cade il 14 giugno 1938.";
      if (step === 2) return "Autunno 1938: la provincia di Castellón, ormai stabilmente occupata dai franchisti, è la base d'attacco meridionale contro il fianco repubblicano dell'Ebro e per l'avanzata verso Valencia.";
      if (step === 3 || step === 4) return "1939: fine delle ostilità; sfilate della vittoria e restaurazione dell'ordine franchista; dura repressione dei sindacati agrari locali.";
      if (step === 5) return "1939-1940: nella neutralità, gli agrumeti di Castellón riprendono l'esportazione di arance verso la Germania e la Gran Bretagna per procurare valuta pregiata.";
      if (step === 6) return "Estate 1940: le coste di Vinaròs e Benicàssim sono presidiate contro incursioni clandestine; adesione alle direttive di non belligeranza.";
      if (step === 7) return "Fine 1940: penuria di fertilizzanti chimici e carburanti; calo della resa dei raccolti e aumento del tesseramento annonario.";
      return "1941: la provincia esporta arance e ceramiche autarchiche; arruolamento di giovani della Plana nella División Azul.";
    }
  },
  "ES523": {
    nuts: "ES523",
    name: "Provincia de Valencia",
    modernName: "Valencia/València",
    historicalName: "Provincia de Valencia",
    region: "Comunidad Valenciana",
    capital: "Valencia",
    keys: ["es523", "provincia_de_valencia", "valencia", "valenciavalncia", "valncia"],
    s0: "Terza metropoli della Spagna, polo portuale e commerciale, cuore della fertile Huerta irrigua; forte tradizione repubblicana e socialista.",
    s1: "Novembre 1936 - ottobre 1937: **Valencia è la Capitale provvisoria della Seconda Repubblica Spagnola** (governo Largo Caballero prima e Negrín poi, trasferitosi da Madrid minacciata); le Cortes si riuniscono alla Lonja de la Seda; polo dell'intellettualità antifascista mondiale (Congresso Internazionale degli Scrittori per la Difesa della Cultura del 1937 con Hemingway, Malraux, Neruda).",
    s2: "Estate-autunno 1938: dopo la caduta di Castellón, l'esercito franchista lancia l'offensiva contro Valencia ma viene fermato dalla formidabile **Linea XYZ** (o Linea Matallana), un sistema trincerato in profondità che resiste a tutti gli assalti nemici fino alla fine della guerra.",
    s3_4: "Fine marzo 1939: caduta finale della Repubblica dopo il golpe di Casado; le truppe nazionaliste entrano a Valencia il 30 marzo 1939; immediata ondata di arresti, processi sommari e internamenti.",
    s5: "1939-1940: nella neutralità, Valencia affronta una miseria acuta; la Huerta produce riso e verdure che vengono in gran parte requisiti per sfamare Madrid.",
    s6: "Estate 1940: il porto di Valencia e il lago dell'Albufera sono sotto controllo della Marina militare franchista in clima di non belligeranza.",
    s7: "Fine 1940: razionamento rigoroso e fiorire dell'estraperlo; il regime reprime ogni residua cellula anarchica e socialista nella classe operaia portuale.",
    s8: "Primavera 1941: la Fiera Campionaria di Valencia viene rilanciata per promuovere i prodotti autarchici del Nuevo Estado; reclutamento per il fronte russo.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPR";
      if (step === 2) return "SPR";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Valencia",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPR" : (step === 2 ? "SPR" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Valencia";
      if (step < 3) return "Bando Nacional — Provincia de Valencia";
      return "Estado Español — Provincia de Valencia";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Comintern";
      if (step === 2) return "Comintern";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Terza metropoli della Spagna, polo portuale e commerciale, cuore della fertile Huerta irrigua; forte tradizione repubblicana e socialista.";
      if (step === 1) return "Novembre 1936 - ottobre 1937: **Valencia è la Capitale provvisoria della Seconda Repubblica Spagnola** (governo Largo Caballero prima e Negrín poi, trasferitosi da Madrid minacciata); le Cortes si riuniscono alla Lonja de la Seda; polo dell'intellettualità antifascista mondiale (Congresso Internazionale degli Scrittori per la Difesa della Cultura del 1937 con Hemingway, Malraux, Neruda).";
      if (step === 2) return "Estate-autunno 1938: dopo la caduta di Castellón, l'esercito franchista lancia l'offensiva contro Valencia ma viene fermato dalla formidabile **Linea XYZ** (o Linea Matallana), un sistema trincerato in profondità che resiste a tutti gli assalti nemici fino alla fine della guerra.";
      if (step === 3 || step === 4) return "Fine marzo 1939: caduta finale della Repubblica dopo il golpe di Casado; le truppe nazionaliste entrano a Valencia il 30 marzo 1939; immediata ondata di arresti, processi sommari e internamenti.";
      if (step === 5) return "1939-1940: nella neutralità, Valencia affronta una miseria acuta; la Huerta produce riso e verdure che vengono in gran parte requisiti per sfamare Madrid.";
      if (step === 6) return "Estate 1940: il porto di Valencia e il lago dell'Albufera sono sotto controllo della Marina militare franchista in clima di non belligeranza.";
      if (step === 7) return "Fine 1940: razionamento rigoroso e fiorire dell'estraperlo; il regime reprime ogni residua cellula anarchica e socialista nella classe operaia portuale.";
      return "Primavera 1941: la Fiera Campionaria di Valencia viene rilanciata per promuovere i prodotti autarchici del Nuevo Estado; reclutamento per il fronte russo.";
    }
  },
  "ES531": {
    nuts: "ES531",
    name: "Islas Pitiusas (Ibiza y Formentera)",
    modernName: "Eivissa y Formentera",
    historicalName: "Islas Pitiusas (Ibiza y Formentera)",
    region: "Islas Baleares",
    capital: "Ibiza",
    keys: ["eivissa_y_formentera", "es531", "ibiza", "islas_pitiusas_ibiza_y_formentera"],
    s0: "Isole Pitiuse dell'arcipelago delle Baleari, tradizionalmente dedite ad agricoltura arcaica, pesca e produzione di sale marino (saline di Ibiza e Formentera).",
    s1: "Luglio-settembre 1936: i militari insorgono a luglio; nell'agosto 1936 la spedizione repubblicana del capitano Bayo sbarca a Ibiza e la riconquista brevemente per la Repubblica; a settembre le truppe fasciste italiane e nazionaliste rioccupano l'isola scatenando una dura ritorsione.",
    s2: "1938: Ibiza funge da base di supporto navale e idrovolanti per la Regia Marina e l'Aviazione Legionaria italiana operanti nel blocco del Mediterraneo.",
    s3_4: "1939: fine della guerra; restaurazione del ferreo ordine franchista; riattivazione delle saline di Ibiza e Formentera sotto monopolio statale.",
    s5: "1939-1940: nella neutralità, l'isolamento geografico protegge le isole ma le tessere annonarie limitano drasticamente il grano e il petrolio lampante per l'illuminazione.",
    s6: "Estate 1940: le vedette costiere sorvegliano il canale di Maiorca e le rotte tra Francia e Nordafrica in clima di non belligeranza.",
    s7: "Fine 1940: la popolazione sopravvive grazie all'economia di sussistenza e alla pesca costiera tradizionale.",
    s8: "1941: le saline continuano a fornire sale essenziale per l'industria conserviera spagnola autarchica.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Islas Pitiusas (Ibiza y Formentera)",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Islas Pitiusas (Ibiza y Formentera)";
      if (step < 3) return "Bando Nacional — Islas Pitiusas (Ibiza y Formentera)";
      return "Estado Español — Islas Pitiusas (Ibiza y Formentera)";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Isole Pitiuse dell'arcipelago delle Baleari, tradizionalmente dedite ad agricoltura arcaica, pesca e produzione di sale marino (saline di Ibiza e Formentera).";
      if (step === 1) return "Luglio-settembre 1936: i militari insorgono a luglio; nell'agosto 1936 la spedizione repubblicana del capitano Bayo sbarca a Ibiza e la riconquista brevemente per la Repubblica; a settembre le truppe fasciste italiane e nazionaliste rioccupano l'isola scatenando una dura ritorsione.";
      if (step === 2) return "1938: Ibiza funge da base di supporto navale e idrovolanti per la Regia Marina e l'Aviazione Legionaria italiana operanti nel blocco del Mediterraneo.";
      if (step === 3 || step === 4) return "1939: fine della guerra; restaurazione del ferreo ordine franchista; riattivazione delle saline di Ibiza e Formentera sotto monopolio statale.";
      if (step === 5) return "1939-1940: nella neutralità, l'isolamento geografico protegge le isole ma le tessere annonarie limitano drasticamente il grano e il petrolio lampante per l'illuminazione.";
      if (step === 6) return "Estate 1940: le vedette costiere sorvegliano il canale di Maiorca e le rotte tra Francia e Nordafrica in clima di non belligeranza.";
      if (step === 7) return "Fine 1940: la popolazione sopravvive grazie all'economia di sussistenza e alla pesca costiera tradizionale.";
      return "1941: le saline continuano a fornire sale essenziale per l'industria conserviera spagnola autarchica.";
    }
  },
  "ES532": {
    nuts: "ES532",
    name: "Isla de Mallorca",
    modernName: "Mallorca",
    historicalName: "Isla de Mallorca",
    region: "Islas Baleares",
    capital: "Palma de Mallorca",
    keys: ["es532", "isla_de_mallorca", "mallorca", "palma_de_mallorca"],
    s0: "Isola maggiore dell'arcipelago balearico con il capoluogo Palma, porto strategico e forte tradizione agraria e commerciale cattolica conservatrice.",
    s1: "Luglio 1936 - marzo 1938: l'Alzamiento militare vince rapidamente; nell'agosto 1936 le truppe repubblicane di Bayo tentano uno sbarco a Porto Cristo ma vengono respinte con l'aiuto decisivo del fascista italiano Arconovaldo Bonaccorsi ('Conte Rossi'); **Maiorca diviene la base aeronavale principale dell'Italia fascista (Aviazione Legionaria e Regia Marina)**, da cui decollano i trimotori Savoia-Marchetti per devastare Barcellona, Valencia e le coste repubblicane.",
    s2: "Autunno 1938: la base aerea di Son Sant Joan e l'idroscalo di Pollensa pullulano di aerei e consiglieri militari italiani e tedeschi che impongono il blocco aeronavale totale alla Repubblica.",
    s3_4: "1939: con la resa della vicina Minorca e la fine del conflitto, le truppe e gli aerei italiani lasciano gradualmente Maiorca, che torna interamente sotto sovranità dello Stato Spagnolo di Franco.",
    s5: "1939-1940: nella neutralità, il porto di Palma riprende il commercio mercantile con la penisola; forte presenza di consoli e agenti dei servizi segreti dell'Asse e britannici.",
    s6: "Estate 1940: la base navale di Palma e le batterie costiere sono in allarme continuo per monitorare le mosse navali della Royal Navy da Gibilterra.",
    s7: "Fine 1940: penuria di combustibili e farina; il turismo d'élite estero è totalmente scomparso lasciando spazio all'austerità autarchica.",
    s8: "1941: Maiorca garantisce il controllo navale delle rotte mediterranee occidentali per il regime di Madrid.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Isla de Mallorca",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Isla de Mallorca";
      if (step < 3) return "Bando Nacional — Isla de Mallorca";
      return "Estado Español — Isla de Mallorca";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Isola maggiore dell'arcipelago balearico con il capoluogo Palma, porto strategico e forte tradizione agraria e commerciale cattolica conservatrice.";
      if (step === 1) return "Luglio 1936 - marzo 1938: l'Alzamiento militare vince rapidamente; nell'agosto 1936 le truppe repubblicane di Bayo tentano uno sbarco a Porto Cristo ma vengono respinte con l'aiuto decisivo del fascista italiano Arconovaldo Bonaccorsi ('Conte Rossi'); **Maiorca diviene la base aeronavale principale dell'Italia fascista (Aviazione Legionaria e Regia Marina)**, da cui decollano i trimotori Savoia-Marchetti per devastare Barcellona, Valencia e le coste repubblicane.";
      if (step === 2) return "Autunno 1938: la base aerea di Son Sant Joan e l'idroscalo di Pollensa pullulano di aerei e consiglieri militari italiani e tedeschi che impongono il blocco aeronavale totale alla Repubblica.";
      if (step === 3 || step === 4) return "1939: con la resa della vicina Minorca e la fine del conflitto, le truppe e gli aerei italiani lasciano gradualmente Maiorca, che torna interamente sotto sovranità dello Stato Spagnolo di Franco.";
      if (step === 5) return "1939-1940: nella neutralità, il porto di Palma riprende il commercio mercantile con la penisola; forte presenza di consoli e agenti dei servizi segreti dell'Asse e britannici.";
      if (step === 6) return "Estate 1940: la base navale di Palma e le batterie costiere sono in allarme continuo per monitorare le mosse navali della Royal Navy da Gibilterra.";
      if (step === 7) return "Fine 1940: penuria di combustibili e farina; il turismo d'élite estero è totalmente scomparso lasciando spazio all'austerità autarchica.";
      return "1941: Maiorca garantisce il controllo navale delle rotte mediterranee occidentali per il regime di Madrid.";
    }
  },
  "ES533": {
    nuts: "ES533",
    name: "Isla de Menorca",
    modernName: "Menorca",
    historicalName: "Isla de Menorca",
    region: "Islas Baleares",
    capital: "Mahón",
    keys: ["es533", "isla_de_menorca", "mahn", "menorca"],
    s0: "Isola orientale delle Baleari con la formidabile base navale naturale di Mahón e la fortezza di La Mola; forte tradizione operaia e fedeltà istituzionale alla Seconda Repubblica.",
    s1: "Luglio 1936 - marzo 1938: **Menorca è l'unica isola delle Baleari a rimanere fedele alla Repubblica per quasi tutta la guerra civile**. La base navale di Mahón è protetta da potenti batterie costiere Vickers da 381 mm a La Mola e Favàritx che impediscono ogni avvicinamento navale franchista o italiano.",
    s2: "Autunno 1938: l'isola vive in condizioni di isolamento quasi totale, sottoposta a continui bombardamenti aerei da parte degli aerei fascisti di base a Maiorca; la popolazione e la guarnigione resistono con scarsi viveri.",
    s3_4: "Febbraio 1939: il 7-9 febbraio 1939, grazie alla mediazione dell'incrociatore britannico HMS Devonshire attraccato a Mahón, il governatore repubblicano negozia la resa onorevole per evitare massacri; Minorca si arrende alle truppe franchiste l'8 febbraio 1939 e 450 repubblicani fuggono a Marsiglia sulla nave britannica.",
    s5: "1939-1940: nella neutralità, la fortezza di La Mola viene presidiata dall'esercito franchista; dura epurazione dei militanti repubblicani dell'isola.",
    s6: "Estate 1940: la base di Mahón mantiene un valore strategico primario per il controllo del corridoio marittimo tra Tolone e l'Algeria.",
    s7: "Fine 1940: la popolazione minorchina affronta l'isolamento economico e le severe tessere del razionamento autarchico.",
    s8: "1941: le poderose batterie da 381 mm di La Mola presidiano le acque neutrali dell'isola contro ogni violazione delle potenze belligeranti.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPR";
      if (step === 2) return "SPR";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Isla de Menorca",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPR" : (step === 2 ? "SPR" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Isla de Menorca";
      if (step < 3) return "Bando Nacional — Isla de Menorca";
      return "Estado Español — Isla de Menorca";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Comintern";
      if (step === 2) return "Comintern";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Isola orientale delle Baleari con la formidabile base navale naturale di Mahón e la fortezza di La Mola; forte tradizione operaia e fedeltà istituzionale alla Seconda Repubblica.";
      if (step === 1) return "Luglio 1936 - marzo 1938: **Menorca è l'unica isola delle Baleari a rimanere fedele alla Repubblica per quasi tutta la guerra civile**. La base navale di Mahón è protetta da potenti batterie costiere Vickers da 381 mm a La Mola e Favàritx che impediscono ogni avvicinamento navale franchista o italiano.";
      if (step === 2) return "Autunno 1938: l'isola vive in condizioni di isolamento quasi totale, sottoposta a continui bombardamenti aerei da parte degli aerei fascisti di base a Maiorca; la popolazione e la guarnigione resistono con scarsi viveri.";
      if (step === 3 || step === 4) return "Febbraio 1939: il 7-9 febbraio 1939, grazie alla mediazione dell'incrociatore britannico HMS Devonshire attraccato a Mahón, il governatore repubblicano negozia la resa onorevole per evitare massacri; Minorca si arrende alle truppe franchiste l'8 febbraio 1939 e 450 repubblicani fuggono a Marsiglia sulla nave britannica.";
      if (step === 5) return "1939-1940: nella neutralità, la fortezza di La Mola viene presidiata dall'esercito franchista; dura epurazione dei militanti repubblicani dell'isola.";
      if (step === 6) return "Estate 1940: la base di Mahón mantiene un valore strategico primario per il controllo del corridoio marittimo tra Tolone e l'Algeria.";
      if (step === 7) return "Fine 1940: la popolazione minorchina affronta l'isolamento economico e le severe tessere del razionamento autarchico.";
      return "1941: le poderose batterie da 381 mm di La Mola presidiano le acque neutrali dell'isola contro ogni violazione delle potenze belligeranti.";
    }
  },
  "ES611": {
    nuts: "ES611",
    name: "Provincia de Almería",
    modernName: "Almería",
    historicalName: "Provincia de Almería",
    region: "Andalucía",
    capital: "Almería",
    keys: ["almera", "es611", "provincia_de_almera"],
    s0: "Provincia dell'Andalusia orientale, montuosa e arida, con porto minerario (ferro e uva da tavola) e forte tradizione operaia e socialista.",
    s1: "Maggio 1937: il 31 maggio 1937, per rappresaglia dopo l'attacco aereo repubblicano alla corazzata tascabile Deutschland alle Baleari, la flotta tedesca (l'incrociatore pesante Admiral Scheer e 4 cacciatorpediniere) bombarda brutalmente la città aperta di Almería uccidendo decine di civili e distruggendo decine di case; la città resta repubblicana.",
    s2: "Autunno 1938: Almería ospita migliaia di profughi fuggiti da Malaga e dalla costa andalusa; scarsezza drammatica di viveri e medicinali sotto continuo allarme aereo.",
    s3_4: "Fine marzo 1939: crollo del fronte repubblicano andaluso e ingresso delle truppe franchiste; centinaia di esecuzioni e internamento dei soldati repubblicani.",
    s5: "1939-1940: nella neutralità, Almería affronta una carestia spaventosa; le miniere di ferro lavorano sotto controllo militare per esportazioni autarchiche.",
    s6: "Estate 1940: la costa di Cabo de Gata è presidiata contro sbarchi clandestini e contrabbando marittimo in clima di non belligeranza.",
    s7: "Fine 1940: miseria nera e malattie infettive nelle baraccopoli costiere; severo controllo dei fasci e della Guardia Civil.",
    s8: "1941: Almería fornisce manodopera ed esporta minerali verso il Terzo Reich; reclutamento forzato di braccianti per la División Azul.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPR";
      if (step === 2) return "SPR";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Almería",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPR" : (step === 2 ? "SPR" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Almería";
      if (step < 3) return "Bando Nacional — Provincia de Almería";
      return "Estado Español — Provincia de Almería";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Comintern";
      if (step === 2) return "Comintern";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia dell'Andalusia orientale, montuosa e arida, con porto minerario (ferro e uva da tavola) e forte tradizione operaia e socialista.";
      if (step === 1) return "Maggio 1937: il 31 maggio 1937, per rappresaglia dopo l'attacco aereo repubblicano alla corazzata tascabile Deutschland alle Baleari, la flotta tedesca (l'incrociatore pesante Admiral Scheer e 4 cacciatorpediniere) bombarda brutalmente la città aperta di Almería uccidendo decine di civili e distruggendo decine di case; la città resta repubblicana.";
      if (step === 2) return "Autunno 1938: Almería ospita migliaia di profughi fuggiti da Malaga e dalla costa andalusa; scarsezza drammatica di viveri e medicinali sotto continuo allarme aereo.";
      if (step === 3 || step === 4) return "Fine marzo 1939: crollo del fronte repubblicano andaluso e ingresso delle truppe franchiste; centinaia di esecuzioni e internamento dei soldati repubblicani.";
      if (step === 5) return "1939-1940: nella neutralità, Almería affronta una carestia spaventosa; le miniere di ferro lavorano sotto controllo militare per esportazioni autarchiche.";
      if (step === 6) return "Estate 1940: la costa di Cabo de Gata è presidiata contro sbarchi clandestini e contrabbando marittimo in clima di non belligeranza.";
      if (step === 7) return "Fine 1940: miseria nera e malattie infettive nelle baraccopoli costiere; severo controllo dei fasci e della Guardia Civil.";
      return "1941: Almería fornisce manodopera ed esporta minerali verso il Terzo Reich; reclutamento forzato di braccianti per la División Azul.";
    }
  },
  "ES612": {
    nuts: "ES612",
    name: "Provincia de Cádiz",
    modernName: "Cádiz",
    historicalName: "Provincia de Cádiz",
    region: "Andalucía",
    capital: "Cádiz",
    keys: ["cdiz", "es612", "provincia_de_cdiz"],
    s0: "Porta navale dello Stretto di Gibilterra con la baia di Cadice, i cantieri navali di San Fernando e la base dell'Arsenale de la Carraca; città marinara di antiche tradizioni liberali.",
    s1: "Luglio 1936: Cadice è la testa di ponte fondamentale per l'Alzamiento: attraverso il porto e l'aeroporto di Jerez sbarcano le prime truppe dell'Ejército de África (legionari e regulares marocchini) trasportate con ponti aerei e navali scortati dalle navi nazionaliste; Cadice diviene il perno del Bando Nacional nel Sud.",
    s2: "1938: la base navale e i cantieri di San Fernando riparano le unità da guerra franchiste; Jerez de la Frontera rifornisce vino sherry esportato anche verso la Gran Bretagna.",
    s3_4: "1939: celebrazioni della vittoria e insediamento dei comandi navali dello Stretto; dura repressione della classe operaia dei cantieri navali.",
    s5: "1939-1940: nella neutralità, la baia di Cadice diviene una stazione segreta di spionaggio e rifornimento notturno per i sommergibili tedeschi U-Boot (petroliera Thalia).",
    s6: "Giugno 1940: con la non belligeranza, Cadice diventa il centro di pianificazione per una potenziale offensiva su Gibilterra (Operazione Felix studiata dagli ufficiali di Hitler e Franco).",
    s7: "Ottobre 1940: le batterie costiere del Golfo di Cadice e di Tarifa presidiano lo Stretto mentre le spie dell'Abwehr operano da Algeciras di fronte alla rocca britannica.",
    s8: "Primavera 1941: Cadice è un alveare di spionaggio internazionale; la popolazione affronta razionamenti severi di olio e pane, mitigati dalla pesca locale.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Cádiz",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Cádiz";
      if (step < 3) return "Bando Nacional — Provincia de Cádiz";
      return "Estado Español — Provincia de Cádiz";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Porta navale dello Stretto di Gibilterra con la baia di Cadice, i cantieri navali di San Fernando e la base dell'Arsenale de la Carraca; città marinara di antiche tradizioni liberali.";
      if (step === 1) return "Luglio 1936: Cadice è la testa di ponte fondamentale per l'Alzamiento: attraverso il porto e l'aeroporto di Jerez sbarcano le prime truppe dell'Ejército de África (legionari e regulares marocchini) trasportate con ponti aerei e navali scortati dalle navi nazionaliste; Cadice diviene il perno del Bando Nacional nel Sud.";
      if (step === 2) return "1938: la base navale e i cantieri di San Fernando riparano le unità da guerra franchiste; Jerez de la Frontera rifornisce vino sherry esportato anche verso la Gran Bretagna.";
      if (step === 3 || step === 4) return "1939: celebrazioni della vittoria e insediamento dei comandi navali dello Stretto; dura repressione della classe operaia dei cantieri navali.";
      if (step === 5) return "1939-1940: nella neutralità, la baia di Cadice diviene una stazione segreta di spionaggio e rifornimento notturno per i sommergibili tedeschi U-Boot (petroliera Thalia).";
      if (step === 6) return "Giugno 1940: con la non belligeranza, Cadice diventa il centro di pianificazione per una potenziale offensiva su Gibilterra (Operazione Felix studiata dagli ufficiali di Hitler e Franco).";
      if (step === 7) return "Ottobre 1940: le batterie costiere del Golfo di Cadice e di Tarifa presidiano lo Stretto mentre le spie dell'Abwehr operano da Algeciras di fronte alla rocca britannica.";
      return "Primavera 1941: Cadice è un alveare di spionaggio internazionale; la popolazione affronta razionamenti severi di olio e pane, mitigati dalla pesca locale.";
    }
  },
  "ES613": {
    nuts: "ES613",
    name: "Provincia de Córdoba",
    modernName: "Córdoba",
    historicalName: "Provincia de Córdoba",
    region: "Andalucía",
    capital: "Córdoba",
    keys: ["crdoba", "es613", "provincia_de_crdoba"],
    s0: "Antica capitale califfale sul Guadalquivir con la celebre Mezquita; a nord le miniere di carbone di Peñarroya-Pueblonuevo e a sud i latifondi di cereali e uliveti.",
    s1: "Luglio 1936: il colonnello Cascajo fa insorgere la guarnigione prendendo la città per i Nazionali; la provincia è tagliata in due: la capitale e il sud sono franchisti, mentre il bacino minerario di Peñarroya resiste per la Repubblica fino al 1938.",
    s2: "1938: l'offensiva franchista consolida il controllo sull'intera provincia; le conche carbonifere di Peñarroya lavorano per l'esercito nazionalista.",
    s3_4: "1939: fine delle ostilità; feroce terrore bianco contro i sindacalisti agrari e i minatori; ripristino dell'ordine feudale dei latifondisti.",
    s5: "1939-1940: nella neutralità, l'olio d'oliva e il carbone di Cordova sono risorse autarchiche primarie; severe pene per il contrabbando di olio.",
    s6: "Estate 1940: celebrazioni religiose alla Mezquita riconsacrata cattedrale cattolica; adesione alla politica di non belligeranza.",
    s7: "Fine 1940: 'gli anni della fame' colpiscono duramente il bracciantato rurale cordovese; code per il pane e sussidi di carità della Falange.",
    s8: "1941: Cordova garantisce ammassi oleari e carboniferi allo Stato franchista; arruolamento di giovani locali per la División Azul.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Córdoba",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Córdoba";
      if (step < 3) return "Bando Nacional — Provincia de Córdoba";
      return "Estado Español — Provincia de Córdoba";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Antica capitale califfale sul Guadalquivir con la celebre Mezquita; a nord le miniere di carbone di Peñarroya-Pueblonuevo e a sud i latifondi di cereali e uliveti.";
      if (step === 1) return "Luglio 1936: il colonnello Cascajo fa insorgere la guarnigione prendendo la città per i Nazionali; la provincia è tagliata in due: la capitale e il sud sono franchisti, mentre il bacino minerario di Peñarroya resiste per la Repubblica fino al 1938.";
      if (step === 2) return "1938: l'offensiva franchista consolida il controllo sull'intera provincia; le conche carbonifere di Peñarroya lavorano per l'esercito nazionalista.";
      if (step === 3 || step === 4) return "1939: fine delle ostilità; feroce terrore bianco contro i sindacalisti agrari e i minatori; ripristino dell'ordine feudale dei latifondisti.";
      if (step === 5) return "1939-1940: nella neutralità, l'olio d'oliva e il carbone di Cordova sono risorse autarchiche primarie; severe pene per il contrabbando di olio.";
      if (step === 6) return "Estate 1940: celebrazioni religiose alla Mezquita riconsacrata cattedrale cattolica; adesione alla politica di non belligeranza.";
      if (step === 7) return "Fine 1940: 'gli anni della fame' colpiscono duramente il bracciantato rurale cordovese; code per il pane e sussidi di carità della Falange.";
      return "1941: Cordova garantisce ammassi oleari e carboniferi allo Stato franchista; arruolamento di giovani locali per la División Azul.";
    }
  },
  "ES614": {
    nuts: "ES614",
    name: "Provincia de Granada",
    modernName: "Granada",
    historicalName: "Provincia de Granada",
    region: "Andalucía",
    capital: "Granada",
    keys: ["es614", "granada", "provincia_de_granada"],
    s0: "Capitale dell'antico Regno nasride dominata dall'Alhambra e dalle vette della Sierra Nevada; terra di Federico García Lorca; atmosfera carica di tensioni sociali all'inizio del 1936.",
    s1: "Luglio-agosto 1936: i militari insorgono e prendono il controllo di Granada; il 18 o 19 agosto 1936 viene brutalmente assassinato dalle milizie fasciste il sommo poeta **Federico García Lorca** a Víznar; Granada rimane una sacca nazionalista quasi circondata dai repubblicani fino al 1937.",
    s2: "1938: la linea del fronte sulla Sierra Nevada e sui monti delle Alpujarras si stabilizza; Granada rifornisce truppe e derrate per il fronte andaluso.",
    s3_4: "1939: vittoria di Franco; celebrazioni monumentali al sepolcro dei Re Cattolici nella Cappella Reale; totale censura sulle opere e la morte di Lorca.",
    s5: "1939-1940: nella neutralità, la provincia rurale affronta la crisi economica; i pastori e i contadini delle Alpujarras vivono di agricoltura di pura sussistenza.",
    s6: "Estate 1940: la Falange granadina promuove l'ideale imperiale della reconquista cattolica; appoggio alla non belligeranza.",
    s7: "Fine 1940: rigido inverno nella Vega di Granada; tubercolosi e fame mietono vittime nei rioni gitani del Sacromonte e dell'Albaicín.",
    s8: "1941: Granada fornisce quote obbligatorie di zucchero di barbabietola e cereali; volontari granadini partono per il fronte russo.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Granada",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Granada";
      if (step < 3) return "Bando Nacional — Provincia de Granada";
      return "Estado Español — Provincia de Granada";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Capitale dell'antico Regno nasride dominata dall'Alhambra e dalle vette della Sierra Nevada; terra di Federico García Lorca; atmosfera carica di tensioni sociali all'inizio del 1936.";
      if (step === 1) return "Luglio-agosto 1936: i militari insorgono e prendono il controllo di Granada; il 18 o 19 agosto 1936 viene brutalmente assassinato dalle milizie fasciste il sommo poeta **Federico García Lorca** a Víznar; Granada rimane una sacca nazionalista quasi circondata dai repubblicani fino al 1937.";
      if (step === 2) return "1938: la linea del fronte sulla Sierra Nevada e sui monti delle Alpujarras si stabilizza; Granada rifornisce truppe e derrate per il fronte andaluso.";
      if (step === 3 || step === 4) return "1939: vittoria di Franco; celebrazioni monumentali al sepolcro dei Re Cattolici nella Cappella Reale; totale censura sulle opere e la morte di Lorca.";
      if (step === 5) return "1939-1940: nella neutralità, la provincia rurale affronta la crisi economica; i pastori e i contadini delle Alpujarras vivono di agricoltura di pura sussistenza.";
      if (step === 6) return "Estate 1940: la Falange granadina promuove l'ideale imperiale della reconquista cattolica; appoggio alla non belligeranza.";
      if (step === 7) return "Fine 1940: rigido inverno nella Vega di Granada; tubercolosi e fame mietono vittime nei rioni gitani del Sacromonte e dell'Albaicín.";
      return "1941: Granada fornisce quote obbligatorie di zucchero di barbabietola e cereali; volontari granadini partono per il fronte russo.";
    }
  },
  "ES615": {
    nuts: "ES615",
    name: "Provincia de Huelva",
    modernName: "Huelva",
    historicalName: "Provincia de Huelva",
    region: "Andalucía",
    capital: "Huelva",
    keys: ["es615", "huelva", "provincia_de_huelva"],
    s0: "Provincia atlantica al confine con il Portogallo, sede delle storiche e immense miniere di rame e pirite di Rio Tinto (gestite da capitali britannici) e del porto colombino di Palos.",
    s1: "Luglio-agosto 1936: una colonna di minatori repubblicani di Rio Tinto tenta di marciare su Siviglia ma viene intercettata e sterminata alla Pañoleta; le truppe nazionaliste di Queipo de Llano occupano Huelva e le miniere di rame.",
    s2: "1938: il rame e le piriti di Rio Tinto sono una risorsa industriale di rilievo mondiale, contesa tra l'interesse della compagnia britannica e le massicce requisizioni nazionaliste per la Germania nazista.",
    s3_4: "1939: pacificazione forzata delle conche minerarie; estrazione di rame asservita al Nuevo Estado e all'estinzione del debito di guerra con Berlino.",
    s5: "1939-1940: all'inizio della guerra mondiale, il rame di Huelva è oggetto di una durissima battaglia economica e diplomatica tra il governo britannico e la Germania.",
    s6: "Estate 1940: la costa di Huelva e le insenature di Ayamonte sono usate per il contrabbando e l'osservazione navale dello Stretto in clima di non belligeranza.",
    s7: "Fine 1940: i minatori di Rio Tinto lavorano a orari prolungati in condizioni sanitarie precarie; severe sanzioni per chi interrompe il lavoro.",
    s8: "1941: le piriti e il rame di Huelva continuano ad alimentare le spedizioni strategiche per l'industria dell'Asse attraverso navi di bandiera neutrale.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Huelva",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Huelva";
      if (step < 3) return "Bando Nacional — Provincia de Huelva";
      return "Estado Español — Provincia de Huelva";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia atlantica al confine con il Portogallo, sede delle storiche e immense miniere di rame e pirite di Rio Tinto (gestite da capitali britannici) e del porto colombino di Palos.";
      if (step === 1) return "Luglio-agosto 1936: una colonna di minatori repubblicani di Rio Tinto tenta di marciare su Siviglia ma viene intercettata e sterminata alla Pañoleta; le truppe nazionaliste di Queipo de Llano occupano Huelva e le miniere di rame.";
      if (step === 2) return "1938: il rame e le piriti di Rio Tinto sono una risorsa industriale di rilievo mondiale, contesa tra l'interesse della compagnia britannica e le massicce requisizioni nazionaliste per la Germania nazista.";
      if (step === 3 || step === 4) return "1939: pacificazione forzata delle conche minerarie; estrazione di rame asservita al Nuevo Estado e all'estinzione del debito di guerra con Berlino.";
      if (step === 5) return "1939-1940: all'inizio della guerra mondiale, il rame di Huelva è oggetto di una durissima battaglia economica e diplomatica tra il governo britannico e la Germania.";
      if (step === 6) return "Estate 1940: la costa di Huelva e le insenature di Ayamonte sono usate per il contrabbando e l'osservazione navale dello Stretto in clima di non belligeranza.";
      if (step === 7) return "Fine 1940: i minatori di Rio Tinto lavorano a orari prolungati in condizioni sanitarie precarie; severe sanzioni per chi interrompe il lavoro.";
      return "1941: le piriti e il rame di Huelva continuano ad alimentare le spedizioni strategiche per l'industria dell'Asse attraverso navi di bandiera neutrale.";
    }
  },
  "ES616": {
    nuts: "ES616",
    name: "Provincia de Jaén",
    modernName: "Jaén",
    historicalName: "Provincia de Jaén",
    region: "Andalucía",
    capital: "Jaén",
    keys: ["es616", "jan", "provincia_de_jan"],
    s0: "Capitale mondiale dell'olivicoltura e dell'olio d'oliva con le immense distese di ulivi della Sierra Morena; bacini minerari di piombo a Linares-La Carolina; feudo socialista.",
    s1: "1936-1938: Jaén è il cuore dell'Andalusia repubblicana (detta 'el Santo Reino republicano') rimasta fedele al governo di Madrid per quasi tutta la guerra; il poeta Miguel Hernández compone qui i suoi celebri canti di trincea 'Vientos del pueblo'; le miniere di piombo di Linares lavorano per la difesa repubblicana.",
    s2: "Autunno 1938: la provincia resiste ma soffre l'isolamento geografico e la penuria di farina, pur disponendo di immense riserve di olio d'oliva con cui rifornisce la Repubblica.",
    s3_4: "Fine marzo 1939: ingresso delle truppe franchiste durante il crollo generale; Miguel Hernández viene catturato e imprigionato; feroce repressione contro i sindacalisti dell'olio.",
    s5: "1939-1940: nella neutralità, l'olio d'oliva di Jaén è confiscato e razionato dallo Stato; l'ammasso obbligatorio e l'estraperlo dominano le campagne.",
    s6: "Estate 1940: le colline di ulivi della Sierra Morena diventano rifugio per i primi guerriglieri antifascisti andalusi (i partigiani della sierra).",
    s7: "Fine 1940: paradosso drammatico: la provincia produce milioni di litri d'olio ma i braccianti soffrono la fame nera per mancanza di pane e legumi.",
    s8: "1941: Jaén rimane sotto ferreo controllo della Guardia Civil; il piombo di Linares è esportato in Germania per le ogive dei proiettili bellici.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPR";
      if (step === 2) return "SPR";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Jaén",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPR" : (step === 2 ? "SPR" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Jaén";
      if (step < 3) return "Bando Nacional — Provincia de Jaén";
      return "Estado Español — Provincia de Jaén";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Comintern";
      if (step === 2) return "Comintern";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Capitale mondiale dell'olivicoltura e dell'olio d'oliva con le immense distese di ulivi della Sierra Morena; bacini minerari di piombo a Linares-La Carolina; feudo socialista.";
      if (step === 1) return "1936-1938: Jaén è il cuore dell'Andalusia repubblicana (detta 'el Santo Reino republicano') rimasta fedele al governo di Madrid per quasi tutta la guerra; il poeta Miguel Hernández compone qui i suoi celebri canti di trincea 'Vientos del pueblo'; le miniere di piombo di Linares lavorano per la difesa repubblicana.";
      if (step === 2) return "Autunno 1938: la provincia resiste ma soffre l'isolamento geografico e la penuria di farina, pur disponendo di immense riserve di olio d'oliva con cui rifornisce la Repubblica.";
      if (step === 3 || step === 4) return "Fine marzo 1939: ingresso delle truppe franchiste durante il crollo generale; Miguel Hernández viene catturato e imprigionato; feroce repressione contro i sindacalisti dell'olio.";
      if (step === 5) return "1939-1940: nella neutralità, l'olio d'oliva di Jaén è confiscato e razionato dallo Stato; l'ammasso obbligatorio e l'estraperlo dominano le campagne.";
      if (step === 6) return "Estate 1940: le colline di ulivi della Sierra Morena diventano rifugio per i primi guerriglieri antifascisti andalusi (i partigiani della sierra).";
      if (step === 7) return "Fine 1940: paradosso drammatico: la provincia produce milioni di litri d'olio ma i braccianti soffrono la fame nera per mancanza di pane e legumi.";
      return "1941: Jaén rimane sotto ferreo controllo della Guardia Civil; il piombo di Linares è esportato in Germania per le ogive dei proiettili bellici.";
    }
  },
  "ES617": {
    nuts: "ES617",
    name: "Provincia de Málaga",
    modernName: "Málaga",
    historicalName: "Provincia de Málaga",
    region: "Andalucía",
    capital: "Málaga",
    keys: ["es617", "mlaga", "provincia_de_mlaga"],
    s0: "Grande porto mediterraneo, polo turistico e commerciale della Costa del Sol; città operaia soprannominata 'Málaga la Roja' per la travolgente vittoria del Fronte Popolare.",
    s1: "Febbraio 1937: le truppe franchiste del generale Queipo de Llano e le colonne fasciste del Corpo Truppe Volontarie (CTV) italiano conquistano Malaga l'8 febbraio 1937; centinaia di migliaia di civili in fuga lungo la strada costiera per Almería vengono brutalmente mitragliati e bombardati da navi e aerei fascisti nella famigerata strage de **'La Desbandá'**.",
    s2: "1938: Malaga è una solida retrovia nazionalista; il porto movimenta convogli per l'esercito e la base navale controlla il mare d'Alborán.",
    s3_4: "1939: celebrazioni della vittoria e insediamento dei tribunali militari al cimitero di San Rafael, dove si consumano migliaia di fucilazioni sommarie.",
    s5: "1939-1940: nella neutralità, Malaga cerca di riattivare il commercio di vino moscato e agrumi; miseria profonda nei quartieri dei pescatori.",
    s6: "Estate 1940: il porto di Malaga accoglie unità ausiliarie della Marina franchista in clima di non belligeranza.",
    s7: "Fine 1940: fame e disoccupazione nelle campagne malagueñe; il razionamento disciplina rigorosamente i consumi alimentari.",
    s8: "1941: Malaga esporta frutta e vino per le commesse statali; reclutamento di disoccupati nella División Azul.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Málaga",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Málaga";
      if (step < 3) return "Bando Nacional — Provincia de Málaga";
      return "Estado Español — Provincia de Málaga";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Grande porto mediterraneo, polo turistico e commerciale della Costa del Sol; città operaia soprannominata 'Málaga la Roja' per la travolgente vittoria del Fronte Popolare.";
      if (step === 1) return "Febbraio 1937: le truppe franchiste del generale Queipo de Llano e le colonne fasciste del Corpo Truppe Volontarie (CTV) italiano conquistano Malaga l'8 febbraio 1937; centinaia di migliaia di civili in fuga lungo la strada costiera per Almería vengono brutalmente mitragliati e bombardati da navi e aerei fascisti nella famigerata strage de **'La Desbandá'**.";
      if (step === 2) return "1938: Malaga è una solida retrovia nazionalista; il porto movimenta convogli per l'esercito e la base navale controlla il mare d'Alborán.";
      if (step === 3 || step === 4) return "1939: celebrazioni della vittoria e insediamento dei tribunali militari al cimitero di San Rafael, dove si consumano migliaia di fucilazioni sommarie.";
      if (step === 5) return "1939-1940: nella neutralità, Malaga cerca di riattivare il commercio di vino moscato e agrumi; miseria profonda nei quartieri dei pescatori.";
      if (step === 6) return "Estate 1940: il porto di Malaga accoglie unità ausiliarie della Marina franchista in clima di non belligeranza.";
      if (step === 7) return "Fine 1940: fame e disoccupazione nelle campagne malagueñe; il razionamento disciplina rigorosamente i consumi alimentari.";
      return "1941: Malaga esporta frutta e vino per le commesse statali; reclutamento di disoccupati nella División Azul.";
    }
  },
  "ES618": {
    nuts: "ES618",
    name: "Provincia de Sevilla",
    modernName: "Sevilla",
    historicalName: "Provincia de Sevilla",
    region: "Andalucía",
    capital: "Sevilla",
    keys: ["es618", "provincia_de_sevilla", "sevilla"],
    s0: "Capitale dell'Andalusia, grande porto fluviale sul Guadalquivir, città di forti tradizioni cattoliche e aristocratiche ma con quartieri operai anarchici (Triana).",
    s1: "18 luglio 1936 - marzo 1938: il generale Gonzalo Queipo de Llano prende il controllo della città con un colpo di mano audace e instaura una spietata dittatura militare sostenuta dai suoi celebri e terrificanti discorsi radiofonici a Radio Sevilla; **Siviglia diviene la capitale e la base d'operazioni suprema del Bando Nacional nel Sud della Spagna**, da cui partono le colonne per conquistare Cordova, l'Estremadura e marciare su Madrid.",
    s2: "1938: Siviglia è il cuore pulsante delle retrovie nazionaliste: le fabbriche aeronautiche (Hispano Aviación di Triana) producono aerei e pezzi di ricambio per la Luftwaffe e la Regia Aeronautica; il porto fluviale movimenta milioni di tonnellate di rifornimenti bellici.",
    s3_4: "1939: con la vittoria finale, Queipo de Llano è acclamato 'viceré d'Andalusia'; sfilate trionfali per la Settimana Santa restaurata nel pieno splendore nazional-cattolico.",
    s5: "1939-1940: nella neutralità, Siviglia è la metropoli economica del Sud; le scorte di grano e olio dell'Andalusia vengono centralizzate sotto la supervisione militare.",
    s6: "Giugno 1940: celebrazioni di piazza per la vittoria dell'Asse e per la non belligeranza; l'aeroporto di Tablada accoglie voli di collegamento con Berlino e Roma.",
    s7: "Ottobre 1940: Queipo de Llano viene allontanato da Franco per divergenze politiche e inviato a Roma; la città soffre la carestia e il tesseramento annonario.",
    s8: "Primavera 1941: Siviglia è uno dei principali centri di raduno dei volontari falangisti andalusi destinati alla División Azul sul fronte russo.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Sevilla",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Sevilla";
      if (step < 3) return "Bando Nacional — Provincia de Sevilla";
      return "Estado Español — Provincia de Sevilla";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Capitale dell'Andalusia, grande porto fluviale sul Guadalquivir, città di forti tradizioni cattoliche e aristocratiche ma con quartieri operai anarchici (Triana).";
      if (step === 1) return "18 luglio 1936 - marzo 1938: il generale Gonzalo Queipo de Llano prende il controllo della città con un colpo di mano audace e instaura una spietata dittatura militare sostenuta dai suoi celebri e terrificanti discorsi radiofonici a Radio Sevilla; **Siviglia diviene la capitale e la base d'operazioni suprema del Bando Nacional nel Sud della Spagna**, da cui partono le colonne per conquistare Cordova, l'Estremadura e marciare su Madrid.";
      if (step === 2) return "1938: Siviglia è il cuore pulsante delle retrovie nazionaliste: le fabbriche aeronautiche (Hispano Aviación di Triana) producono aerei e pezzi di ricambio per la Luftwaffe e la Regia Aeronautica; il porto fluviale movimenta milioni di tonnellate di rifornimenti bellici.";
      if (step === 3 || step === 4) return "1939: con la vittoria finale, Queipo de Llano è acclamato 'viceré d'Andalusia'; sfilate trionfali per la Settimana Santa restaurata nel pieno splendore nazional-cattolico.";
      if (step === 5) return "1939-1940: nella neutralità, Siviglia è la metropoli economica del Sud; le scorte di grano e olio dell'Andalusia vengono centralizzate sotto la supervisione militare.";
      if (step === 6) return "Giugno 1940: celebrazioni di piazza per la vittoria dell'Asse e per la non belligeranza; l'aeroporto di Tablada accoglie voli di collegamento con Berlino e Roma.";
      if (step === 7) return "Ottobre 1940: Queipo de Llano viene allontanato da Franco per divergenze politiche e inviato a Roma; la città soffre la carestia e il tesseramento annonario.";
      return "Primavera 1941: Siviglia è uno dei principali centri di raduno dei volontari falangisti andalusi destinati alla División Azul sul fronte russo.";
    }
  },
  "ES620": {
    nuts: "ES620",
    name: "Provincia de Murcia",
    modernName: "Murcia",
    historicalName: "Provincia de Murcia",
    region: "Región de Murcia",
    capital: "Murcia",
    keys: ["es620", "murcia", "provincia_de_murcia"],
    s0: "Provincia del Sud-Est mediterraneo con la fertile Huerta murciana e la formidabile Piazzaforte e Base Navale di **Cartagena**, sede della flotta da battaglia e dell'arsenale della Seconda Repubblica.",
    s1: "1936-1938: fedele alla Repubblica per l'intera durata del conflitto; **Cartagena è la massima base navale della Marina Repubblicana** protetta da potenti batterie costiere (Castillitos e Cenizas); da qui salpano le unità navali per la Battaglia di Capo Palos (marzo 1938, affondamento dell'incrociatore franchista Baleares).",
    s2: "Autunno 1938: Cartagena e Murcia subiscono continui bombardamenti navali e aerei da parte delle squadriglie fasciste italo-tedesche; la città accoglie migliaia di feriti e profughi dal fronte.",
    s3_4: "Marzo 1939: nei giorni convulsi della fine della guerra civile, a Cartagena scoppia una rivolta filo-franchista e la flotta repubblicana (3 incrociatori e 8 cacciatorpediniere) salpa il 5 marzo 1939 per rifugiarsi e auto-internarsi a Biserta (Tunisia francese); le truppe nazionaliste occupano la base il 31 marzo 1939.",
    s5: "1939-1940: nella neutralità, l'Arsenale navale di Cartagena viene integrato nella Marina franchista e le batterie costiere presidiano il Mediterraneo sud-occidentale.",
    s6: "Estate 1940: in clima di non belligeranza, Cartagena sorveglia le rotte dei convogli navali francesi e britannici tra Orano e Gibilterra.",
    s7: "Fine 1940: la Huerta di Murcia garantisce agrumi e ortaggi per l'autarchia; la popolazione affronta privazioni severe mitigate dalla produzione agricola locale.",
    s8: "1941: Cartagena rimane il pilastro navale del Mediterraneo per la Spagna di Franco; volontari murciani si arruolano nella División Azul.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPR";
      if (step === 2) return "SPR";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Provincia de Murcia",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPR" : (step === 2 ? "SPR" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Provincia de Murcia";
      if (step < 3) return "Bando Nacional — Provincia de Murcia";
      return "Estado Español — Provincia de Murcia";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Comintern";
      if (step === 2) return "Comintern";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Provincia del Sud-Est mediterraneo con la fertile Huerta murciana e la formidabile Piazzaforte e Base Navale di **Cartagena**, sede della flotta da battaglia e dell'arsenale della Seconda Repubblica.";
      if (step === 1) return "1936-1938: fedele alla Repubblica per l'intera durata del conflitto; **Cartagena è la massima base navale della Marina Repubblicana** protetta da potenti batterie costiere (Castillitos e Cenizas); da qui salpano le unità navali per la Battaglia di Capo Palos (marzo 1938, affondamento dell'incrociatore franchista Baleares).";
      if (step === 2) return "Autunno 1938: Cartagena e Murcia subiscono continui bombardamenti navali e aerei da parte delle squadriglie fasciste italo-tedesche; la città accoglie migliaia di feriti e profughi dal fronte.";
      if (step === 3 || step === 4) return "Marzo 1939: nei giorni convulsi della fine della guerra civile, a Cartagena scoppia una rivolta filo-franchista e la flotta repubblicana (3 incrociatori e 8 cacciatorpediniere) salpa il 5 marzo 1939 per rifugiarsi e auto-internarsi a Biserta (Tunisia francese); le truppe nazionaliste occupano la base il 31 marzo 1939.";
      if (step === 5) return "1939-1940: nella neutralità, l'Arsenale navale di Cartagena viene integrato nella Marina franchista e le batterie costiere presidiano il Mediterraneo sud-occidentale.";
      if (step === 6) return "Estate 1940: in clima di non belligeranza, Cartagena sorveglia le rotte dei convogli navali francesi e britannici tra Orano e Gibilterra.";
      if (step === 7) return "Fine 1940: la Huerta di Murcia garantisce agrumi e ortaggi per l'autarchia; la popolazione affronta privazioni severe mitigate dalla produzione agricola locale.";
      return "1941: Cartagena rimane il pilastro navale del Mediterraneo per la Spagna di Franco; volontari murciani si arruolano nella División Azul.";
    }
  },
  "ES630": {
    nuts: "ES630",
    name: "Plaza de Soberanía de Ceuta",
    modernName: "Ceuta",
    historicalName: "Plaza de Soberanía de Ceuta",
    region: "Norte de África",
    capital: "Ceuta",
    keys: ["ceuta", "es630", "plaza_de_soberana_de_ceuta"],
    s0: "Storica piazzaforte militare spagnola sulla sponda africana dello Stretto di Gibilterra (di fronte a Gibilterra e Tarifa), sede di guarnigioni della Legione Spagnola (Tercio de Extranjeros) e dei Regulares.",
    s1: "17-18 luglio 1936: **Ceuta è la prima città a sollevarsi nell'Alzamiento militare** insieme a Melilla; il tenente colonnello Yagüe guida la Legione; il 5 agosto 1936 il 'Convoy de la Victoria' forza il blocco navale repubblicano dello Stretto trasportando le truppe africane a terraferma ad Algeciras; Ceuta è la testa di ponte essenziale dell'invasione franchista della penisola.",
    s2: "1938: porto militare protetto da sbarramenti costieri e cannoni da costa a Monte Hacho; centro di smistamento continuo di truppe mercenarie marocchine per il fronte spagnolo.",
    s3_4: "1939: trionfo franchista; Ceuta è celebrata come culla dell'esercito vittorioso; monumenti ai caduti della Legione e parate solenni con il jalifa del Marocco.",
    s5: "1939-1940: nella neutralità, Ceuta sorveglia a vista le mosse navali della base britannica di Gibilterra a poche miglia di distanza attraverso lo Stretto.",
    s6: "Giugno 1940: con la caduta della Francia e la non belligeranza, Ceuta diventa il centro d'avanzata delle truppe spagnole che occupano militarmente la Zona Internazionale di Tangeri (14 giugno 1940).",
    s7: "Ottobre 1940: le fortificazioni di Monte Hacho sono integrate nei piani per l'attacco combinato a Gibilterra (Operazione Felix); incontri segreti con ufficiali tedeschi della Wehrmacht.",
    s8: "Primavera 1941: Ceuta è in stato di mobilitazione permanente; severo razionamento alimentare e continuo controllo dei fari e dei radar dello Stretto.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Plaza de Soberanía de Ceuta",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Plaza de Soberanía de Ceuta";
      if (step < 3) return "Bando Nacional — Plaza de Soberanía de Ceuta";
      return "Estado Español — Plaza de Soberanía de Ceuta";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Storica piazzaforte militare spagnola sulla sponda africana dello Stretto di Gibilterra (di fronte a Gibilterra e Tarifa), sede di guarnigioni della Legione Spagnola (Tercio de Extranjeros) e dei Regulares.";
      if (step === 1) return "17-18 luglio 1936: **Ceuta è la prima città a sollevarsi nell'Alzamiento militare** insieme a Melilla; il tenente colonnello Yagüe guida la Legione; il 5 agosto 1936 il 'Convoy de la Victoria' forza il blocco navale repubblicano dello Stretto trasportando le truppe africane a terraferma ad Algeciras; Ceuta è la testa di ponte essenziale dell'invasione franchista della penisola.";
      if (step === 2) return "1938: porto militare protetto da sbarramenti costieri e cannoni da costa a Monte Hacho; centro di smistamento continuo di truppe mercenarie marocchine per il fronte spagnolo.";
      if (step === 3 || step === 4) return "1939: trionfo franchista; Ceuta è celebrata come culla dell'esercito vittorioso; monumenti ai caduti della Legione e parate solenni con il jalifa del Marocco.";
      if (step === 5) return "1939-1940: nella neutralità, Ceuta sorveglia a vista le mosse navali della base britannica di Gibilterra a poche miglia di distanza attraverso lo Stretto.";
      if (step === 6) return "Giugno 1940: con la caduta della Francia e la non belligeranza, Ceuta diventa il centro d'avanzata delle truppe spagnole che occupano militarmente la Zona Internazionale di Tangeri (14 giugno 1940).";
      if (step === 7) return "Ottobre 1940: le fortificazioni di Monte Hacho sono integrate nei piani per l'attacco combinato a Gibilterra (Operazione Felix); incontri segreti con ufficiali tedeschi della Wehrmacht.";
      return "Primavera 1941: Ceuta è in stato di mobilitazione permanente; severo razionamento alimentare e continuo controllo dei fari e dei radar dello Stretto.";
    }
  },
  "ES640": {
    nuts: "ES640",
    name: "Plaza de Soberanía de Melilla",
    modernName: "Melilla",
    historicalName: "Plaza de Soberanía de Melilla",
    region: "Norte de África",
    capital: "Melilla",
    keys: ["es640", "melilla", "plaza_de_soberana_de_melilla"],
    s0: "Antica piazzaforte spagnola sulla costa del Rif orientale, centro di comando militare per il Marocco Spagnolo; sede di reggimenti di Regulares e legionari; tensioni fortissime tra ufficiali e simpatizzanti del Fronte Popolare.",
    s1: "17 luglio 1936: **Melilla è il luogo esatto in cui ha inizio la Guerra Civile Spagnola nel pomeriggio del 17 luglio 1936** (il sollevamento anticipato dei colonnelli Seguí e Solans); la città viene conquistata con le armi in poche ore, le autorità repubblicane fucilate e scatta il segnale convenzionale per tutte le guarnigioni dell'esercito in Marocco e in Spagna.",
    s2: "1938: Melilla è un formidabile centro logistico per il reclutamento di soldati marocchini ('i mori di Franco') e per il traffico di minerali di ferro del massiccio del Gurugú.",
    s3_4: "1939: celebrazioni della vittoria e insediamento dei comandi coloniali del dopoguerra; repressione totale di ogni elemento repubblicano.",
    s5: "1939-1940: nella neutralità, il porto di Melilla esporta minerale di ferro verso la Spagna e verso l'Asse; sorveglianza delle acque del Mare d'Alborán.",
    s6: "Estate 1940: Melilla funge da base di supporto logistico e aereo per le truppe coloniali spagnole impegnate nell'occupazione di Tangeri in clima di non belligeranza.",
    s7: "Fine 1940: il porto e le batterie costiere sono in allerta contro possibili reazioni navali della flotta francese di Vichy o britannica.",
    s8: "1941: Melilla continua a fornire ferro e truppe regolari marocchine per la guarnigione della Spagna franchista; severo razionamento autarchico.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Plaza de Soberanía de Melilla",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Plaza de Soberanía de Melilla";
      if (step < 3) return "Bando Nacional — Plaza de Soberanía de Melilla";
      return "Estado Español — Plaza de Soberanía de Melilla";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Antica piazzaforte spagnola sulla costa del Rif orientale, centro di comando militare per il Marocco Spagnolo; sede di reggimenti di Regulares e legionari; tensioni fortissime tra ufficiali e simpatizzanti del Fronte Popolare.";
      if (step === 1) return "17 luglio 1936: **Melilla è il luogo esatto in cui ha inizio la Guerra Civile Spagnola nel pomeriggio del 17 luglio 1936** (il sollevamento anticipato dei colonnelli Seguí e Solans); la città viene conquistata con le armi in poche ore, le autorità repubblicane fucilate e scatta il segnale convenzionale per tutte le guarnigioni dell'esercito in Marocco e in Spagna.";
      if (step === 2) return "1938: Melilla è un formidabile centro logistico per il reclutamento di soldati marocchini ('i mori di Franco') e per il traffico di minerali di ferro del massiccio del Gurugú.";
      if (step === 3 || step === 4) return "1939: celebrazioni della vittoria e insediamento dei comandi coloniali del dopoguerra; repressione totale di ogni elemento repubblicano.";
      if (step === 5) return "1939-1940: nella neutralità, il porto di Melilla esporta minerale di ferro verso la Spagna e verso l'Asse; sorveglianza delle acque del Mare d'Alborán.";
      if (step === 6) return "Estate 1940: Melilla funge da base di supporto logistico e aereo per le truppe coloniali spagnole impegnate nell'occupazione di Tangeri in clima di non belligeranza.";
      if (step === 7) return "Fine 1940: il porto e le batterie costiere sono in allerta contro possibili reazioni navali della flotta francese di Vichy o britannica.";
      return "1941: Melilla continua a fornire ferro e truppe regolari marocchine per la guarnigione della Spagna franchista; severo razionamento autarchico.";
    }
  },
  "ES703": {
    nuts: "ES703",
    name: "Isla de El Hierro",
    modernName: "El Hierro",
    historicalName: "Isla de El Hierro",
    region: "Canarias",
    capital: "Valverde",
    keys: ["el_hierro", "es703", "isla_de_el_hierro", "valverde"],
    s0: "Isola più occidentale dell'arcipelago canario, antico meridiano zero dell'antichità; economia di sussistenza basata su pastorizia e pesca; presidio della Repubblica.",
    s1: "Luglio 1936: i militari insorti prendono il controllo delle Canarie; El Hierro cade rapidamente sotto l'autorità nazionalista senza scontri a fuoco.",
    s2: "1938: isolamento geografico totale nell'Atlantico; la popolazione sostiene l'ammasso di bestiame e prodotti agricoli per i presidi dell'arcipelago.",
    s3_4: "1939: vittoria franchista; l'isola rimane un punto di confino rurale per dissidenti politici repubblicani minori.",
    s5: "1939-1940: nella neutralità, El Hierro vive del proprio isolamento; scarsezza drammatica di petrolio per le lampade e beni manifatturieri.",
    s6: "Estate 1940: la non belligeranza spagnola e la vicinanza alle rotte atlantiche rendono l'isola un punto di avvistamento per la navigazione mercantile.",
    s7: "Fine 1940: sorveglianza militare contro possibili ricognizioni navali britanniche da Freetown o Gibilterra.",
    s8: "1941: l'isola mantiene la sua economia tradizionale di pastorizia e pesca all'interno dell'autarchia canaria.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Isla de El Hierro",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Isla de El Hierro";
      if (step < 3) return "Bando Nacional — Isla de El Hierro";
      return "Estado Español — Isla de El Hierro";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Isola più occidentale dell'arcipelago canario, antico meridiano zero dell'antichità; economia di sussistenza basata su pastorizia e pesca; presidio della Repubblica.";
      if (step === 1) return "Luglio 1936: i militari insorti prendono il controllo delle Canarie; El Hierro cade rapidamente sotto l'autorità nazionalista senza scontri a fuoco.";
      if (step === 2) return "1938: isolamento geografico totale nell'Atlantico; la popolazione sostiene l'ammasso di bestiame e prodotti agricoli per i presidi dell'arcipelago.";
      if (step === 3 || step === 4) return "1939: vittoria franchista; l'isola rimane un punto di confino rurale per dissidenti politici repubblicani minori.";
      if (step === 5) return "1939-1940: nella neutralità, El Hierro vive del proprio isolamento; scarsezza drammatica di petrolio per le lampade e beni manifatturieri.";
      if (step === 6) return "Estate 1940: la non belligeranza spagnola e la vicinanza alle rotte atlantiche rendono l'isola un punto di avvistamento per la navigazione mercantile.";
      if (step === 7) return "Fine 1940: sorveglianza militare contro possibili ricognizioni navali britanniche da Freetown o Gibilterra.";
      return "1941: l'isola mantiene la sua economia tradizionale di pastorizia e pesca all'interno dell'autarchia canaria.";
    }
  },
  "ES704": {
    nuts: "ES704",
    name: "Isla de Fuerteventura",
    modernName: "Fuerteventura",
    historicalName: "Isla de Fuerteventura",
    region: "Canarias",
    capital: "Puerto del Rosario",
    keys: ["es704", "fuerteventura", "isla_de_fuerteventura", "puerto_del_rosario"],
    s0: "Isola arida e ventosa dell'arcipelago orientale a poca distanza dalla costa del Sahara; celebre per essere stata luogo di confino di Miguel de Unamuno nel 1924.",
    s1: "Luglio 1936: le forze dell'Alzamiento prendono il controllo dell'isola; Fuerteventura diventa un presidio di retrovia costiera verso il continente africano.",
    s2: "1938: l'isola funge da ponte di collegamento tra le Canarie e i presidi coloniali spagnoli di Cabo Juby e del Sahara Español.",
    s3_4: "1939: consolidamento dell'amministrazione militare franchista; la pesca e l'allevamento caprino riforniscono le guarnigioni.",
    s5: "1939-1940: nella neutralità, le coste di Fuerteventura sono pattugliate dalla Marina franchista per monitorare il transito navale nell'Atlantico centrale.",
    s6: "Estate 1940: timori di colpi di mano navali britannici in caso di ingresso della Spagna in guerra a fianco dell'Asse (Operazione Pilgrim britannica per occupare le Canarie).",
    s7: "Fine 1940: fortificazione delle spiagge con bunker e postazioni di mitragliatrici per ordine del comando militare delle Canarie.",
    s8: "1941: Fuerteventura rimane in stato di allarme difensivo; severo razionamento di acqua potabile e generi alimentari.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Isla de Fuerteventura",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Isla de Fuerteventura";
      if (step < 3) return "Bando Nacional — Isla de Fuerteventura";
      return "Estado Español — Isla de Fuerteventura";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Isola arida e ventosa dell'arcipelago orientale a poca distanza dalla costa del Sahara; celebre per essere stata luogo di confino di Miguel de Unamuno nel 1924.";
      if (step === 1) return "Luglio 1936: le forze dell'Alzamiento prendono il controllo dell'isola; Fuerteventura diventa un presidio di retrovia costiera verso il continente africano.";
      if (step === 2) return "1938: l'isola funge da ponte di collegamento tra le Canarie e i presidi coloniali spagnoli di Cabo Juby e del Sahara Español.";
      if (step === 3 || step === 4) return "1939: consolidamento dell'amministrazione militare franchista; la pesca e l'allevamento caprino riforniscono le guarnigioni.";
      if (step === 5) return "1939-1940: nella neutralità, le coste di Fuerteventura sono pattugliate dalla Marina franchista per monitorare il transito navale nell'Atlantico centrale.";
      if (step === 6) return "Estate 1940: timori di colpi di mano navali britannici in caso di ingresso della Spagna in guerra a fianco dell'Asse (Operazione Pilgrim britannica per occupare le Canarie).";
      if (step === 7) return "Fine 1940: fortificazione delle spiagge con bunker e postazioni di mitragliatrici per ordine del comando militare delle Canarie.";
      return "1941: Fuerteventura rimane in stato di allarme difensivo; severo razionamento di acqua potabile e generi alimentari.";
    }
  },
  "ES705": {
    nuts: "ES705",
    name: "Isla de Gran Canaria",
    modernName: "Gran Canaria",
    historicalName: "Isla de Gran Canaria",
    region: "Canarias",
    capital: "Las Palmas de Gran Canaria",
    keys: ["es705", "gran_canaria", "isla_de_gran_canaria", "las_palmas_de_gran_canaria"],
    s0: "Cuore economico e marittimo delle Canarie orientali con il grande porto internazionale della Luz a Las Palmas; scalo carboniero atlantico primario; nel luglio 1936 Franco si reca a Las Palmas per il funerale del generale Amado Balmes.",
    s1: "18 luglio 1936: **Da Las Palmas de Gran Canaria Francisco Franco si imbarca sull'idrovolante britannico 'Dragon Rapide'** per volare in Marocco e assumere il comando dell'Ejército de África; le Canarie cadono immediatamente e totalmente sotto il controllo del Bando Nacional; il porto della Luz è una stazione di rifornimento strategica per le navi nazionaliste.",
    s2: "1938: Las Palmas e il porto della Luz riforniscono mercantili di bandiera neutrale; dura repressione della sinistra canaria nella famigerata Sima de Jinámar.",
    s3_4: "1939: fine della guerra; il porto della Luz celebra la vittoria franchista e torna a essere un perno del cabotaggio atlantico e della pesca d'alto mare.",
    s5: "1939-1940: nella neutralità, il porto della Luz a Las Palmas diventa una base segreta vitale per il rifornimento notturno dei sommergibili U-Boot della Kriegsmarine (petroliera Corrientes).",
    s6: "Giugno 1940: con la non belligeranza, Churchill e lo Stato Maggiore britannico preparano l'Operazione Pilgrim (invasione e occupazione preventiva delle Canarie); Franco rafforza le difese di Las Palmas con batterie d'artiglieria.",
    s7: "Ottobre 1940: l'incontro di Hendaye vede Hitler proporre basi tedesche alle Canarie, ma Franco rifiuta per evitare l'immediata reazione navale della Royal Navy britannica.",
    s8: "Primavera 1941: Las Palmas è in allarme permanente contro possibili sbarchi alleati; la popolazione civile soffre la paralisi del commercio marittimo e il tesseramento.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Isla de Gran Canaria",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Isla de Gran Canaria";
      if (step < 3) return "Bando Nacional — Isla de Gran Canaria";
      return "Estado Español — Isla de Gran Canaria";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Cuore economico e marittimo delle Canarie orientali con il grande porto internazionale della Luz a Las Palmas; scalo carboniero atlantico primario; nel luglio 1936 Franco si reca a Las Palmas per il funerale del generale Amado Balmes.";
      if (step === 1) return "18 luglio 1936: **Da Las Palmas de Gran Canaria Francisco Franco si imbarca sull'idrovolante britannico 'Dragon Rapide'** per volare in Marocco e assumere il comando dell'Ejército de África; le Canarie cadono immediatamente e totalmente sotto il controllo del Bando Nacional; il porto della Luz è una stazione di rifornimento strategica per le navi nazionaliste.";
      if (step === 2) return "1938: Las Palmas e il porto della Luz riforniscono mercantili di bandiera neutrale; dura repressione della sinistra canaria nella famigerata Sima de Jinámar.";
      if (step === 3 || step === 4) return "1939: fine della guerra; il porto della Luz celebra la vittoria franchista e torna a essere un perno del cabotaggio atlantico e della pesca d'alto mare.";
      if (step === 5) return "1939-1940: nella neutralità, il porto della Luz a Las Palmas diventa una base segreta vitale per il rifornimento notturno dei sommergibili U-Boot della Kriegsmarine (petroliera Corrientes).";
      if (step === 6) return "Giugno 1940: con la non belligeranza, Churchill e lo Stato Maggiore britannico preparano l'Operazione Pilgrim (invasione e occupazione preventiva delle Canarie); Franco rafforza le difese di Las Palmas con batterie d'artiglieria.";
      if (step === 7) return "Ottobre 1940: l'incontro di Hendaye vede Hitler proporre basi tedesche alle Canarie, ma Franco rifiuta per evitare l'immediata reazione navale della Royal Navy britannica.";
      return "Primavera 1941: Las Palmas è in allarme permanente contro possibili sbarchi alleati; la popolazione civile soffre la paralisi del commercio marittimo e il tesseramento.";
    }
  },
  "ES706": {
    nuts: "ES706",
    name: "Isla de La Gomera",
    modernName: "La Gomera",
    historicalName: "Isla de La Gomera",
    region: "Canarias",
    capital: "San Sebastián de La Gomera",
    keys: ["es706", "isla_de_la_gomera", "la_gomera", "san_sebastin_de_la_gomera"],
    s0: "Isola montuosa e vulcanica celebre per le sue foreste di laurisilva e per l'antico linguaggio fischiato (il 'silbo gomero'); porto storico di Colombo; forte presenza socialista nel 1936.",
    s1: "Luglio-agosto 1936: breve resistenza repubblicana a Vallehermoso ('i fatti dell'Altito'), repressa con l'invio di truppe falangiste da Tenerife; l'isola cade sotto il controllo militare nazionalista.",
    s2: "1938: la produzione di banane e pomodori di La Gomera è soggetta alle requisizioni per rifornire le truppe nazionaliste della penisola.",
    s3_4: "1939: fine del conflitto; pacificazione forzata ed epurazione degli insegnanti e dei sindacalisti agricoli locali.",
    s5: "1939-1940: nella neutralità, l'isola vive di agricoltura tradizionale e pesca; il commercio marittimo con la Spagna peninsulare è fortemente rallentato.",
    s6: "Estate 1940: presidi di vedetta costiera sorvegliano il canale tra La Gomera e Tenerife in clima di non belligeranza.",
    s7: "Fine 1940: la popolazione sopravvive grazie alle risorse alimentari dell'agricoltura terrazzata e al baratto locale.",
    s8: "1941: l'isola affronta l'austerità autarchica; controllo della Guardia Civil per prevenire disordini.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Isla de La Gomera",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Isla de La Gomera";
      if (step < 3) return "Bando Nacional — Isla de La Gomera";
      return "Estado Español — Isla de La Gomera";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Isola montuosa e vulcanica celebre per le sue foreste di laurisilva e per l'antico linguaggio fischiato (il 'silbo gomero'); porto storico di Colombo; forte presenza socialista nel 1936.";
      if (step === 1) return "Luglio-agosto 1936: breve resistenza repubblicana a Vallehermoso ('i fatti dell'Altito'), repressa con l'invio di truppe falangiste da Tenerife; l'isola cade sotto il controllo militare nazionalista.";
      if (step === 2) return "1938: la produzione di banane e pomodori di La Gomera è soggetta alle requisizioni per rifornire le truppe nazionaliste della penisola.";
      if (step === 3 || step === 4) return "1939: fine del conflitto; pacificazione forzata ed epurazione degli insegnanti e dei sindacalisti agricoli locali.";
      if (step === 5) return "1939-1940: nella neutralità, l'isola vive di agricoltura tradizionale e pesca; il commercio marittimo con la Spagna peninsulare è fortemente rallentato.";
      if (step === 6) return "Estate 1940: presidi di vedetta costiera sorvegliano il canale tra La Gomera e Tenerife in clima di non belligeranza.";
      if (step === 7) return "Fine 1940: la popolazione sopravvive grazie alle risorse alimentari dell'agricoltura terrazzata e al baratto locale.";
      return "1941: l'isola affronta l'austerità autarchica; controllo della Guardia Civil per prevenire disordini.";
    }
  },
  "ES707": {
    nuts: "ES707",
    name: "Isla de La Palma",
    modernName: "La Palma",
    historicalName: "Isla de La Palma",
    region: "Canarias",
    capital: "Santa Cruz de La Palma",
    keys: ["es707", "isla_de_la_palma", "la_palma", "santa_cruz_de_la_palma"],
    s0: "Isola verdeggiante e vulcanica, dominata dalla Caldera de Taburiente; all'inizio del 1936 sede di una solida maggioranza repubblicana democratica.",
    s1: "Luglio 1936: **'La Semana Roja' di La Palma**: per una settimana intera (18-25 luglio 1936) l'isola resiste al colpo di stato militare mantenendo l'autorità repubblicana legittima; il 25 luglio la cannoniera franchista Canalejas sbarca truppe nazionaliste che occupano Santa Cruz arrestando le autorità legittime.",
    s2: "1938: La Palma è integrata nel sistema nazionalista; le piantagioni di banane e la lavorazione del tabacco lavorano sotto la gestione corporativa.",
    s3_4: "1939: processi ed esecuzioni contro i protagonisti della Semana Roja; ripristino dell'ordine cattolico e franchista.",
    s5: "1939-1940: nella neutralità, l'esportazione di banane verso l'Europa è bloccata dalla guerra navale atlantica, causando una grave crisi economica locale.",
    s6: "Estate 1940: la costa di Santa Cruz è presidiata contro possibili incursioni navali britanniche in clima di non belligeranza.",
    s7: "Fine 1940: la popolazione palmera sopporta razionamenti e disoccupazione; ritorno all'agricoltura di pura sussistenza.",
    s8: "1941: La Palma garantisce prodotti agricoli per l'autarchia canaria; dura vigilanza militare sui lavoratori del tabacco.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Isla de La Palma",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Isla de La Palma";
      if (step < 3) return "Bando Nacional — Isla de La Palma";
      return "Estado Español — Isla de La Palma";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Isola verdeggiante e vulcanica, dominata dalla Caldera de Taburiente; all'inizio del 1936 sede di una solida maggioranza repubblicana democratica.";
      if (step === 1) return "Luglio 1936: **'La Semana Roja' di La Palma**: per una settimana intera (18-25 luglio 1936) l'isola resiste al colpo di stato militare mantenendo l'autorità repubblicana legittima; il 25 luglio la cannoniera franchista Canalejas sbarca truppe nazionaliste che occupano Santa Cruz arrestando le autorità legittime.";
      if (step === 2) return "1938: La Palma è integrata nel sistema nazionalista; le piantagioni di banane e la lavorazione del tabacco lavorano sotto la gestione corporativa.";
      if (step === 3 || step === 4) return "1939: processi ed esecuzioni contro i protagonisti della Semana Roja; ripristino dell'ordine cattolico e franchista.";
      if (step === 5) return "1939-1940: nella neutralità, l'esportazione di banane verso l'Europa è bloccata dalla guerra navale atlantica, causando una grave crisi economica locale.";
      if (step === 6) return "Estate 1940: la costa di Santa Cruz è presidiata contro possibili incursioni navali britanniche in clima di non belligeranza.";
      if (step === 7) return "Fine 1940: la popolazione palmera sopporta razionamenti e disoccupazione; ritorno all'agricoltura di pura sussistenza.";
      return "1941: La Palma garantisce prodotti agricoli per l'autarchia canaria; dura vigilanza militare sui lavoratori del tabacco.";
    }
  },
  "ES708": {
    nuts: "ES708",
    name: "Isla de Lanzarote",
    modernName: "Lanzarote",
    historicalName: "Isla de Lanzarote",
    region: "Canarias",
    capital: "Arrecife",
    keys: ["arrecife", "es708", "isla_de_lanzarote", "lanzarote"],
    s0: "Isola vulcanica e lunare delle Canarie orientali con le terre nere di Timanfaya; economia basata sulla coltivazione della vite nella cenere (La Geria), pesca e saline.",
    s1: "Luglio 1936: i militari insorti prendono il controllo di Arrecife senza combattimenti; Lanzarote diventa un presidio marittimo avanzato verso la costa africana.",
    s2: "1938: le saline e l'industria conserviera di pesce di Arrecife riforniscono le razioni dell'esercito nazionalista; arruolamento di giovani marinai.",
    s3_4: "1939: vittoria di Franco; celebrazioni patriottiche e instaurazione dell'amministrazione falangista.",
    s5: "1939-1940: nella neutralità, la flotta peschereccia di Lanzarote affronta la penuria di nafta e continua a pescare nel ricco banco saharianio.",
    s6: "Estate 1940: Arrecife rafforza le vedette e le difese costiere nel timore di un'operazione navale preventiva britannica contro le Canarie.",
    s7: "Fine 1940: penuria acuta di acqua dolce e farina; la popolazione affronta sacrifici severi per il blocco marittimo dell'Atlantico.",
    s8: "1941: la pesca e il sale di Lanzarote rimangono risorse alimentari strategiche per l'intero arcipelago canario.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Isla de Lanzarote",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Isla de Lanzarote";
      if (step < 3) return "Bando Nacional — Isla de Lanzarote";
      return "Estado Español — Isla de Lanzarote";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Isola vulcanica e lunare delle Canarie orientali con le terre nere di Timanfaya; economia basata sulla coltivazione della vite nella cenere (La Geria), pesca e saline.";
      if (step === 1) return "Luglio 1936: i militari insorti prendono il controllo di Arrecife senza combattimenti; Lanzarote diventa un presidio marittimo avanzato verso la costa africana.";
      if (step === 2) return "1938: le saline e l'industria conserviera di pesce di Arrecife riforniscono le razioni dell'esercito nazionalista; arruolamento di giovani marinai.";
      if (step === 3 || step === 4) return "1939: vittoria di Franco; celebrazioni patriottiche e instaurazione dell'amministrazione falangista.";
      if (step === 5) return "1939-1940: nella neutralità, la flotta peschereccia di Lanzarote affronta la penuria di nafta e continua a pescare nel ricco banco saharianio.";
      if (step === 6) return "Estate 1940: Arrecife rafforza le vedette e le difese costiere nel timore di un'operazione navale preventiva britannica contro le Canarie.";
      if (step === 7) return "Fine 1940: penuria acuta di acqua dolce e farina; la popolazione affronta sacrifici severi per il blocco marittimo dell'Atlantico.";
      return "1941: la pesca e il sale di Lanzarote rimangono risorse alimentari strategiche per l'intero arcipelago canario.";
    }
  },
  "ES709": {
    nuts: "ES709",
    name: "Isla de Tenerife",
    modernName: "Tenerife",
    historicalName: "Isla de Tenerife",
    region: "Canarias",
    capital: "Santa Cruz de Tenerife",
    keys: ["es709", "isla_de_tenerife", "santa_cruz_de_tenerife", "tenerife"],
    s0: "Isola maggiore delle Canarie occidentali dominata dal vulcano Teide; sede della Capitaneria Generale delle Canarie dove il governo repubblicano aveva confinato il generale **Francisco Franco** nel marzo 1936 per allontanarlo da Madrid; clima di intensa cospirazione militare nei boschi di La Esperanza.",
    s1: "17-18 luglio 1936: **Franco proclama lo stato di guerra a Santa Cruz de Tenerife**, trasmettendo il manifesto dell'Alzamiento a tutte le guarnigioni di Spagna; Tenerife cade immediatamente sotto il controllo militare; la prigione galleggiante della nave 'La Palma' ospita centinaia di prigionieri repubblicani; base navale nazionalista primaria nell'Atlantico.",
    s2: "1938: la raffineria di petrolio CEPSA di Santa Cruz de Tenerife è un impianto strategico supremo per la raffinazione di greggio e carburanti per la flotta franchista.",
    s3_4: "1939: celebrazioni della vittoria finale di Franco; Santa Cruz è consacrata come la città da cui partì la 'Cruzada'; dura epurazione dei funzionari repubblicani.",
    s5: "1939-1940: nella neutralità, la raffineria CEPSA raffina greggio d'importazione; il porto accoglie navi mercantili e petroliere per il rifornimento clandestino degli U-Boot tedeschi.",
    s6: "Giugno 1940: con la non belligeranza, il comando militare di Tenerife rafforza le batterie costiere del Teide contro i piani di invasione britannici (Operazione Pilgrim).",
    s7: "Ottobre 1940: Tenerife è in allarme bellico costante; truppe di fanteria e miliziani falangisti scavano trincee lungo le coste del nord e del sud.",
    s8: "Primavera 1941: la popolazione di Tenerife soffre la fame e l'isolamento; la raffineria CEPSA opera sotto stretto controllo degli ispettori petroliferi anglo-americani (Navicert).",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Isla de Tenerife",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Isla de Tenerife";
      if (step < 3) return "Bando Nacional — Isla de Tenerife";
      return "Estado Español — Isla de Tenerife";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Isola maggiore delle Canarie occidentali dominata dal vulcano Teide; sede della Capitaneria Generale delle Canarie dove il governo repubblicano aveva confinato il generale **Francisco Franco** nel marzo 1936 per allontanarlo da Madrid; clima di intensa cospirazione militare nei boschi di La Esperanza.";
      if (step === 1) return "17-18 luglio 1936: **Franco proclama lo stato di guerra a Santa Cruz de Tenerife**, trasmettendo il manifesto dell'Alzamiento a tutte le guarnigioni di Spagna; Tenerife cade immediatamente sotto il controllo militare; la prigione galleggiante della nave 'La Palma' ospita centinaia di prigionieri repubblicani; base navale nazionalista primaria nell'Atlantico.";
      if (step === 2) return "1938: la raffineria di petrolio CEPSA di Santa Cruz de Tenerife è un impianto strategico supremo per la raffinazione di greggio e carburanti per la flotta franchista.";
      if (step === 3 || step === 4) return "1939: celebrazioni della vittoria finale di Franco; Santa Cruz è consacrata come la città da cui partì la 'Cruzada'; dura epurazione dei funzionari repubblicani.";
      if (step === 5) return "1939-1940: nella neutralità, la raffineria CEPSA raffina greggio d'importazione; il porto accoglie navi mercantili e petroliere per il rifornimento clandestino degli U-Boot tedeschi.";
      if (step === 6) return "Giugno 1940: con la non belligeranza, il comando militare di Tenerife rafforza le batterie costiere del Teide contro i piani di invasione britannici (Operazione Pilgrim).";
      if (step === 7) return "Ottobre 1940: Tenerife è in allarme bellico costante; truppe di fanteria e miliziani falangisti scavano trincee lungo le coste del nord e del sud.";
      return "Primavera 1941: la popolazione di Tenerife soffre la fame e l'isolamento; la raffineria CEPSA opera sotto stretto controllo degli ispettori petroliferi anglo-americani (Navicert).";
    }
  },
  "ES_GUINEA": {
    nuts: "ES_GUINEA",
    name: "Territorios Españoles del Golfo de Guinea",
    modernName: "Equatorial Guinea",
    historicalName: "Territorios Españoles del Golfo de Guinea",
    region: "Golfo de Guinea",
    capital: "Santa Isabel (Fernando Póo)",
    keys: ["equatorial_guinea", "es_guinea", "santa_isabel_fernando_po", "territorios_espaoles_del_golfo_de_guinea"],
    s0: "Colonia spagnola nell'Africa subsahariana comprendente l'isola vulcanica di Fernando Póo (capitale Santa Isabel) e il territorio continentale di Río Muni (Bata), con ricche piantagioni di cacao, caffè e legname pregiato.",
    s1: "Luglio - ottobre 1936: a luglio il governatore Sánchez Guerra rimane fedele alla Repubblica a Santa Isabel; nel settembre-ottobre 1936 la nave da guerra franchista Ciudad de Mahón sbarca truppe nazionaliste che conquistano Fernando Póo e poi sbarcano a Bata (Río Muni), assicurando l'intera colonia a Franco.",
    s2: "1938: le esportazioni di cacao, caffè e legname della Guinea Spagnola sono una delle rare fonti di valuta pregiata e generi tropicali per la Spagna nazionalista.",
    s3_4: "1939: vittoria di Franco; istituzione del Governo Generale della Guinea Spagnola sotto stretta disciplina coloniale e missionaria cattolica.",
    s5: "1939-1940: nella neutralità, la Guinea Spagnola commercia cacao e legname con navi di paesi neutrali sotto l'occhio vigile delle colonie circostanti francesi (AEF/Camerun) e britanniche (Nigeria).",
    s6: "Estate-autunno 1940: con il passaggio del Camerun francese e dell'AEF alle Forces Françaises Libres di De Gaulle (agosto-ottobre 1940), la Guinea Spagnola è completamente circondata da territori alleati ostili.",
    s7: "Fine 1940: Santa Isabel e Río Muni vivono in uno stato di allerta militare permanente per prevenire incidenti di frontiera con i gollisti francesi del Camerun e del Gabon.",
    s8: "1941: la Guinea Spagnola mantiene una rigorosa neutralità continuando a spedire carichi di cacao alla madrepatria spagnola affamata.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Territorios Españoles del Golfo de Guinea",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Territorios Españoles del Golfo de Guinea";
      if (step < 3) return "Bando Nacional — Territorios Españoles del Golfo de Guinea";
      return "Estado Español — Territorios Españoles del Golfo de Guinea";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Colonia spagnola nell'Africa subsahariana comprendente l'isola vulcanica di Fernando Póo (capitale Santa Isabel) e il territorio continentale di Río Muni (Bata), con ricche piantagioni di cacao, caffè e legname pregiato.";
      if (step === 1) return "Luglio - ottobre 1936: a luglio il governatore Sánchez Guerra rimane fedele alla Repubblica a Santa Isabel; nel settembre-ottobre 1936 la nave da guerra franchista Ciudad de Mahón sbarca truppe nazionaliste che conquistano Fernando Póo e poi sbarcano a Bata (Río Muni), assicurando l'intera colonia a Franco.";
      if (step === 2) return "1938: le esportazioni di cacao, caffè e legname della Guinea Spagnola sono una delle rare fonti di valuta pregiata e generi tropicali per la Spagna nazionalista.";
      if (step === 3 || step === 4) return "1939: vittoria di Franco; istituzione del Governo Generale della Guinea Spagnola sotto stretta disciplina coloniale e missionaria cattolica.";
      if (step === 5) return "1939-1940: nella neutralità, la Guinea Spagnola commercia cacao e legname con navi di paesi neutrali sotto l'occhio vigile delle colonie circostanti francesi (AEF/Camerun) e britanniche (Nigeria).";
      if (step === 6) return "Estate-autunno 1940: con il passaggio del Camerun francese e dell'AEF alle Forces Françaises Libres di De Gaulle (agosto-ottobre 1940), la Guinea Spagnola è completamente circondata da territori alleati ostili.";
      if (step === 7) return "Fine 1940: Santa Isabel e Río Muni vivono in uno stato di allerta militare permanente per prevenire incidenti di frontiera con i gollisti francesi del Camerun e del Gabon.";
      return "1941: la Guinea Spagnola mantiene una rigorosa neutralità continuando a spedire carichi di cacao alla madrepatria spagnola affamata.";
    }
  },
  "ES_IFNI": {
    nuts: "ES_IFNI",
    name: "Territorio de Ifni",
    modernName: "Sidi Ifni / Ifni",
    historicalName: "Territorio de Ifni",
    region: "Norte de África",
    capital: "Sidi Ifni",
    keys: ["es_ifni", "ifni", "sidi_ifni", "sidi_ifni__ifni", "territorio_de_ifni"],
    s0: "Enclave spagnola sulla costa atlantica sud-marocchina occupata militarmente nel 1934 dal colonnello Capaz; base militare di frontiera e porto di pesca costiero (Santa Cruz de la Mar Pequeña).",
    s1: "Luglio 1936: la guarnigione di Sidi Ifni e i tiradores indigeni aderiscono immediatamente all'Alzamiento nazionalista di Franco, fornendo battaglioni di truppe coloniali (Tiradores de Ifni) per il fronte spagnolo.",
    s2: "1938: Sidi Ifni mobilita centinaia di fanti indigeni per l'esercito nazionalista; base di avvistamento aereo e navale.",
    s3_4: "1939: celebrazioni della vittoria e consolidamento dell'enclave come territorio militare governato da un governatore generale.",
    s5: "1939-1940: nella neutralità, Ifni mantiene i confini chiusi con il Marocco Francese meridionale.",
    s6: "Estate 1940: le fortificazioni e la pista di volo di Sidi Ifni sono poste in allerta difensiva in clima di non belligeranza.",
    s7: "Fine 1940: la guarnigione militare vigila sul traffico navale atlantico e sui movimenti delle tribù berbere circostanti.",
    s8: "1941: Ifni continua a fungere da presidio militare sovrano della Spagna franchista sulla costa atlantica africana.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Territorio de Ifni",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Territorio de Ifni";
      if (step < 3) return "Bando Nacional — Territorio de Ifni";
      return "Estado Español — Territorio de Ifni";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Enclave spagnola sulla costa atlantica sud-marocchina occupata militarmente nel 1934 dal colonnello Capaz; base militare di frontiera e porto di pesca costiero (Santa Cruz de la Mar Pequeña).";
      if (step === 1) return "Luglio 1936: la guarnigione di Sidi Ifni e i tiradores indigeni aderiscono immediatamente all'Alzamiento nazionalista di Franco, fornendo battaglioni di truppe coloniali (Tiradores de Ifni) per il fronte spagnolo.";
      if (step === 2) return "1938: Sidi Ifni mobilita centinaia di fanti indigeni per l'esercito nazionalista; base di avvistamento aereo e navale.";
      if (step === 3 || step === 4) return "1939: celebrazioni della vittoria e consolidamento dell'enclave come territorio militare governato da un governatore generale.";
      if (step === 5) return "1939-1940: nella neutralità, Ifni mantiene i confini chiusi con il Marocco Francese meridionale.";
      if (step === 6) return "Estate 1940: le fortificazioni e la pista di volo di Sidi Ifni sono poste in allerta difensiva in clima di non belligeranza.";
      if (step === 7) return "Fine 1940: la guarnigione militare vigila sul traffico navale atlantico e sui movimenti delle tribù berbere circostanti.";
      return "1941: Ifni continua a fungere da presidio militare sovrano della Spagna franchista sulla costa atlantica africana.";
    }
  },
  "ES_RIF": {
    nuts: "ES_RIF",
    name: "Protectorado Español de Marruecos (Zona del Rif / Tetuán)",
    modernName: "Spanish Morocco",
    historicalName: "Protectorado Español de Marruecos (Zona del Rif / Tetuán)",
    region: "Norte de África",
    capital: "Tetuán",
    keys: ["es_rif", "protectorado_espaol_de_marruecos_zona_del_rif", "protectorado_espaol_de_marruecos_zona_del_rif__tetun", "spanish_morocco", "tetun"],
    s0: "Territorio del Nord del Marocco sotto protettorato spagnolo (capitale Tetuán, con Larache, Xauen, Nador e le montagne del Rif); sede dell'Alta Comisaría di Spagna e del Jalifa (Muley Hassan); guarnigione d'élite dell'Ejército de África.",
    s1: "17-18 luglio 1936 - marzo 1938: **Culla e cuore dell'Alzamiento militare del 1936**. Il 19 luglio Franco assume il comando a Tetuán; grazie all'aiuto di aerei da trasporto tedeschi Junkers Ju 52 e italiani Savoia-Marchetti inviati da Hitler e Mussolini su richiesta di Franco, si compie il primo ponte aereo militare della storia attraverso lo Stretto; oltre 40.000 legionari e mercenari marocchini sbarcano in Andalusia costituendo il nerbo dell'esercito nazionalista.",
    s2: "1938: Tetuán è governata dal generale Juan Luis Beigbeder; il Marocco Spagnolo mobilita oltre 60.000 fanti marocchini che combattono con spietata efficacia su tutti i fronti iberici (fino alla Battaglia dell'Ebro).",
    s3_4: "1939: con la vittoria finale di Franco, Tetuán e il Rif celebrano la trionfale partecipazione dei Regulares alla 'Cruzada'; Franco promette riforme e protezione all'Islam marocchino.",
    s5: "1939-1940: nella neutralità, il generale Carlos Asensio Cabanillas guida l'Alta Comisaría; la Spagna mantiene 150.000 soldati in Marocco per controllare il confine con il Marocco Francese.",
    s6: "14 giugno 1940: approfittando della caduta della Francia, **le truppe spagnole del Marocco invadono e occupano la Zona Internazionale di Tangeri**, abolendo l'amministrazione internazionale e annettendola de facto al Protettorato spagnolo in un atto di aperta sfida diplomatica.",
    s7: "Ottobre 1940: all'incontro di Hendaye con Hitler, Franco chiede l'annessione dell'intero Marocco Francese e dell'Oranese algerino alla Spagna, ma Hitler rifiuta per non alienarsi il regime di Vichy di Pétain.",
    s8: "Primavera 1941: il Marocco Spagnolo e Tangeri sono un formidabile nido di spie, contrabbando e intrighi internazionali tra britannici, tedeschi e nazionalisti arabi.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Protectorado Español de Marruecos (Zona del Rif / Tetuán)",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Protectorado Español de Marruecos (Zona del Rif / Tetuán)";
      if (step < 3) return "Bando Nacional — Protectorado Español de Marruecos (Zona del Rif / Tetuán)";
      return "Estado Español — Protectorado Español de Marruecos (Zona del Rif / Tetuán)";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Territorio del Nord del Marocco sotto protettorato spagnolo (capitale Tetuán, con Larache, Xauen, Nador e le montagne del Rif); sede dell'Alta Comisaría di Spagna e del Jalifa (Muley Hassan); guarnigione d'élite dell'Ejército de África.";
      if (step === 1) return "17-18 luglio 1936 - marzo 1938: **Culla e cuore dell'Alzamiento militare del 1936**. Il 19 luglio Franco assume il comando a Tetuán; grazie all'aiuto di aerei da trasporto tedeschi Junkers Ju 52 e italiani Savoia-Marchetti inviati da Hitler e Mussolini su richiesta di Franco, si compie il primo ponte aereo militare della storia attraverso lo Stretto; oltre 40.000 legionari e mercenari marocchini sbarcano in Andalusia costituendo il nerbo dell'esercito nazionalista.";
      if (step === 2) return "1938: Tetuán è governata dal generale Juan Luis Beigbeder; il Marocco Spagnolo mobilita oltre 60.000 fanti marocchini che combattono con spietata efficacia su tutti i fronti iberici (fino alla Battaglia dell'Ebro).";
      if (step === 3 || step === 4) return "1939: con la vittoria finale di Franco, Tetuán e il Rif celebrano la trionfale partecipazione dei Regulares alla 'Cruzada'; Franco promette riforme e protezione all'Islam marocchino.";
      if (step === 5) return "1939-1940: nella neutralità, il generale Carlos Asensio Cabanillas guida l'Alta Comisaría; la Spagna mantiene 150.000 soldati in Marocco per controllare il confine con il Marocco Francese.";
      if (step === 6) return "14 giugno 1940: approfittando della caduta della Francia, **le truppe spagnole del Marocco invadono e occupano la Zona Internazionale di Tangeri**, abolendo l'amministrazione internazionale e annettendola de facto al Protettorato spagnolo in un atto di aperta sfida diplomatica.";
      if (step === 7) return "Ottobre 1940: all'incontro di Hendaye con Hitler, Franco chiede l'annessione dell'intero Marocco Francese e dell'Oranese algerino alla Spagna, ma Hitler rifiuta per non alienarsi il regime di Vichy di Pétain.";
      return "Primavera 1941: il Marocco Spagnolo e Tangeri sono un formidabile nido di spie, contrabbando e intrighi internazionali tra britannici, tedeschi e nazionalisti arabi.";
    }
  },
  "ES_SAHARA": {
    nuts: "ES_SAHARA",
    name: "Colonia y Protectorado del Sahara Español",
    modernName: "Spanish Sahara",
    historicalName: "Colonia y Protectorado del Sahara Español",
    region: "Sahara",
    capital: "Villa Cisneros",
    keys: ["colonia_y_protectorado_del_sahara_espaol", "es_sahara", "spanish_sahara", "villa_cisneros"],
    s0: "Territorio coloniale desertico lungo la costa atlantica sahariana (costituito da Río de Oro e Saguia el-Hamra, con le basi di Villa Cisneros e Cabo Juby / Tarfaya); scalo fondamentale per i voli postali della linea Aéropostale francese verso il Sudamerica.",
    s1: "Luglio 1936: le guarnigioni sahariane e la polizia coloniale aderiscono immediatamente all'Alzamiento nazionalista di Franco senza spargimento di sangue.",
    s2: "1938: Villa Cisneros e Cabo Juby fungono da basi aeree e di rifornimento per le squadriglie di collegamento tra le Canarie e l'Africa equatoriale.",
    s3_4: "1939: termine della guerra civile; consolidamento del governo militare del Sahara Español sotto il Governatore Generale residente a Cabo Juby.",
    s5: "1939-1940: nella neutralità spagnola, la costa sahariana è sorvegliata contro atterraggi di emergenza o attività navali non autorizzate.",
    s6: "Estate 1940: dopo la caduta della Francia, le autorità spagnole del Sahara mantengono un cordone di sicurezza lungo il confine con l'Africa Occidentale Francese (Mauritania).",
    s7: "Fine 1940: le piste aeree di Villa Cisneros e Cabo Juby sono utilizzate per voli di ricognizione meteorologica e postale verso l'Atlantico meridionale.",
    s8: "1941: il Sahara Spagnolo rimane saldamente sotto controllo franchista come avamposto strategico atlantico dell'impero coloniale spagnolo.",
    getOwner: (step: number): 'SPR' | 'SPA' => {
      if (step === 0) return 'SPR';
      if (step === 1) return "SPA";
      if (step === 2) return "SPA";
      return 'SPA';
    },
    getHistoricalName: (_step: number) => "Colonia y Protectorado del Sahara Español",
    getAdminTitle: (step: number): string => {
      const o = (step === 0) ? 'SPR' : (step === 1 ? "SPA" : (step === 2 ? "SPA" : 'SPA'));
      if (o === 'SPR') return "Segunda República Española — Colonia y Protectorado del Sahara Español";
      if (step < 3) return "Bando Nacional — Colonia y Protectorado del Sahara Español";
      return "Estado Español — Colonia y Protectorado del Sahara Español";
    },
    getFaction: (step: number): FactionType => {
      if (step === 0) return "Comintern";
      if (step === 1) return "Asse";
      if (step === 2) return "Asse";
      return "Asse";
    },
    getNote: (step: number) => {
      if (step === 0) return "Territorio coloniale desertico lungo la costa atlantica sahariana (costituito da Río de Oro e Saguia el-Hamra, con le basi di Villa Cisneros e Cabo Juby / Tarfaya); scalo fondamentale per i voli postali della linea Aéropostale francese verso il Sudamerica.";
      if (step === 1) return "Luglio 1936: le guarnigioni sahariane e la polizia coloniale aderiscono immediatamente all'Alzamiento nazionalista di Franco senza spargimento di sangue.";
      if (step === 2) return "1938: Villa Cisneros e Cabo Juby fungono da basi aeree e di rifornimento per le squadriglie di collegamento tra le Canarie e l'Africa equatoriale.";
      if (step === 3 || step === 4) return "1939: termine della guerra civile; consolidamento del governo militare del Sahara Español sotto il Governatore Generale residente a Cabo Juby.";
      if (step === 5) return "1939-1940: nella neutralità spagnola, la costa sahariana è sorvegliata contro atterraggi di emergenza o attività navali non autorizzate.";
      if (step === 6) return "Estate 1940: dopo la caduta della Francia, le autorità spagnole del Sahara mantengono un cordone di sicurezza lungo il confine con l'Africa Occidentale Francese (Mauritania).";
      if (step === 7) return "Fine 1940: le piste aeree di Villa Cisneros e Cabo Juby sono utilizzate per voli di ricognizione meteorologica e postale verso l'Atlantico meridionale.";
      return "1941: il Sahara Spagnolo rimane saldamente sotto controllo franchista come avamposto strategico atlantico dell'impero coloniale spagnolo.";
    }
  },
};

/**
 * Risolve dinamicamente una provincia o territorio spagnolo per ID o toponimo.
 */
export function resolveSpainProvince(
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
  let meta = SPAIN_PROVINCES_META[cleanId] || SPAIN_PROVINCES_META[cleanId.toUpperCase()];

  // 2. Alias speciali per territori d'oltremare
  if (!meta) {
    if (
      normId.includes('spanish_morocco') ||
      normId.includes('marruecos') ||
      normId.includes('rif') ||
      normId.includes('tetuan') ||
      normRaw.includes('spanish_morocco') ||
      normRaw.includes('marruecos') ||
      normRaw.includes('rif')
    ) {
      meta = SPAIN_PROVINCES_META['ES_RIF'];
    } else if (
      normId.includes('spanish_sahara') ||
      normId.includes('sahara_espanol') ||
      normId.includes('rio_de_oro') ||
      normRaw.includes('spanish_sahara') ||
      normRaw.includes('sahara_espanol') ||
      normRaw.includes('rio_de_oro')
    ) {
      meta = SPAIN_PROVINCES_META['ES_SAHARA'];
    } else if (
      normId.includes('equatorial_guinea') ||
      normId.includes('guinea_espanola') ||
      normId.includes('fernando_poo') ||
      normRaw.includes('equatorial_guinea') ||
      normRaw.includes('guinea_espanola')
    ) {
      meta = SPAIN_PROVINCES_META['ES_GUINEA'];
    } else if (
      normId.includes('ifni') ||
      normRaw.includes('ifni')
    ) {
      meta = SPAIN_PROVINCES_META['ES_IFNI'];
    }
  }

  // 3. Match per chiave normalizzata nel dizionario
  if (!meta) {
    for (const item of Object.values(SPAIN_PROVINCES_META)) {
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

  // 4. Fallback per toponimo parziale o prefisso
  if (!meta) {
    for (const item of Object.values(SPAIN_PROVINCES_META)) {
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

  const owner = meta.getOwner(s);
  return makeResult(
    owner,
    meta.getHistoricalName(s),
    meta.getNote(s),
    meta.getFaction(s),
    meta.getAdminTitle(s)
  );
}

/**
 * Popola il dizionario toponomastico storico con le 63 entita provinciali e coloniali della Spagna.
 */
export function populateSpainToponyms(dict: Record<string, any>): void {
  if (!dict['SPR']) dict['SPR'] = {};
  if (!dict['SPA']) dict['SPA'] = {};
  if (!dict['ES']) dict['ES'] = {};
  if (!dict['ESP']) dict['ESP'] = {};

  for (const [key, item] of Object.entries(SPAIN_PROVINCES_META)) {
    const match = {
      historicalName: item.historicalName,
      adminTitle: item.getAdminTitle(0),
      historicalNote: item.s0,
      name: item.name,
      modernName: item.modernName,
      region: item.region,
      note: item.s0,
      dynamicNote: (step: number) => item.getNote(step),
    };

    const normName = item.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const lowId = item.nuts.toLowerCase().replace(/[^a-z0-9]/g, '_');

    dict['SPR'][normName] = match;
    dict['SPR'][lowId] = match;
    dict['SPA'][normName] = match;
    dict['SPA'][lowId] = match;
    dict['ES'][normName] = match;
    dict['ES'][lowId] = match;
    dict['ESP'][normName] = match;
    dict['ESP'][lowId] = match;
    dict[lowId] = match;
    dict[normName] = match;

    for (const k of item.keys) {
      dict['SPR'][k] = match;
      dict['SPA'][k] = match;
      dict['ES'][k] = match;
      dict['ESP'][k] = match;
      dict[k] = match;
    }
  }
}
