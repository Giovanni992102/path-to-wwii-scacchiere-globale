/**
 * Dettaglio Geocartografico Storico delle 31 Province dell'Impero dell'Iran (1936-1941)
 *
 * Copertura esaustiva delle 31 province (Ostān) dell'Iran durante il regno di Reza Shah Pahlavi:
 * - Sovranità: Impero dell'Iran (Dinastia Pahlavi / Keshvar-e Shāhanshāhi-ye Irān)
 * - Fazione: Neutrale
 * - Capitale: Teheran
 * - Sovrano: Reza Shah Pahlavi
 * - Toponimi storici autentici, titoli amministrativi persiani e note geostoriche dinamiche (Step 0-8)
 */

import { ResolvedTerritory } from '../types';
import { makeResult } from './georesolver';

export interface IranProvinceInfo {
  id: string;
  name: string;
  nutsName: string;
  nameLatn: string;
  nameEngl: string;
  modernName: string;
  historicalName: string;
  adminTitle: string;
  getNote: (step: number) => string;
}

export const IRAN_PROVINCES_META: Record<string, IranProvinceInfo> = {
  IRN_TEH: {
    id: 'IRN_TEH',
    name: 'Tehran',
    nutsName: 'Teheran (Capitale)',
    nameLatn: 'Tehrān',
    nameEngl: 'Tehran Province',
    modernName: 'Provincia di Teheran (Capitale dell\'Iran)',
    historicalName: 'Impero dell\'Iran — Città e Provincia di Teheran',
    adminTitle: 'Ostān-e Tehrān · Capitale dell\'Impero dell\'Iran & Sede di Reza Shah Pahlavi (Palazzo Golestan)',
    getNote: (s) => {
      if (s <= 1) {
        return 'Teheran (Tehrān) · Capitale imperiale e fulcro della modernizzazione autoritaria di Reza Shah Pahlavi. La città subisce una vasta trasformazione urbanistica: apertura di ampi viali alberati, fondazione dell\'Università di Teheran (1934), istituzione della Banca Melli e promulgazione della legge di svelamento (Kashf-e hijab, gennaio 1936).';
      } else if (s <= 4) {
        return 'Teheran · Inaugurazione della grandiosa stazione ferroviaria centrale; punto d\'incontro nevralgico della Ferrovia Trans-Iraniana che connette il Golfo Persico al Mar Caspio. Presenza di ingegneri e ditte tecniche tedesche (Krupp, Siemens, Ferrostaal) per le opere pubbliche e industriali.';
      } else if (s <= 7) {
        return 'Teheran · Il 4 settembre 1939 Reza Shah proclama la stretta neutralità dell\'Iran nel conflitto mondiale. Il governo imperiale respinge le crescenti pressioni diplomatiche di Londra e Mosca, difendendo la sovranità statale e le commesse commerciali con le nazioni europee.';
      } else {
        return 'Teheran · Tensione al vertice dopo il colpo di Stato anti-britannico di Rashid Ali in Iraq (aprile 1941). Il governo imperiale presidia le ambasciate e rafforza la gendarmeria, stretto tra la sorveglianza militare britannica a sud e quella dell\'Armata Rossa a nord.';
      }
    },
  },

  IRN_KHZ: {
    id: 'IRN_KHZ',
    name: 'Khuzestan',
    nutsName: 'Khuzestan (Ahvaz e Abadan)',
    nameLatn: 'Khūzestān',
    nameEngl: 'Khuzestan Province',
    modernName: 'Provincia del Khuzestan (Ahvaz e Abadan, Iran)',
    historicalName: 'Impero dell\'Iran — Bacino Petrolifero del Khuzestan e Abadan',
    adminTitle: 'Ostān-e Khūzestān · Raffineria di Abadan (AIOC) & Capolinea Ferroviario di Bandar Shahpur',
    getNote: (s) => {
      if (s <= 1) {
        return 'Khuzestan · Cuore energetico primario dell\'Iran e del Medio Oriente; la monumentale raffineria di Abadan sull\'isola fluviale dello Shatt al-Arab, gestita dalla Anglo-Iranian Oil Company (AIOC), raffina milioni di tonnellate di greggio estratto dai campi di Masjed-e Soleyman e Haftkel.';
      } else if (s <= 4) {
        return 'Khuzestan · Apertura del grande porto marittimo in acque profonde di Bandar Shahpur (Golfo Persico), capolinea meridionale della Ferrovia Trans-Iraniana inaugurata solennemente nell\'agosto 1938; ponte logistico tra il mare e l\'altopiano.';
      } else if (s <= 7) {
        return 'Khuzestan · Con lo scoppio della Seconda Guerra Mondiale la produzione petrolifera di Abadan diviene la risorsa strategica vitale per la Royal Navy nel Mediterraneo e nell\'Oceano Indiano; motovedette della marina britannica vigilano costantemente l\'accesso allo Shatt al-Arab.';
      } else {
        return 'Khuzestan · Durante la guerra anglo-irachena (aprile 1941) truppe della British Indian Army sbarcano a Bassora a poche miglia da Abadan e Khorramshahr, presidiando l\'estuario per prevenire colpi di mano e mettere in sicurezza i complessi petroliferi.';
      }
    },
  },

  IRN_EAZ: {
    id: 'IRN_EAZ',
    name: 'East Azerbaijan',
    nutsName: 'Azerbaigian Orientale (Tabriz)',
    nameLatn: 'Āzarbāyjān-e Sharqī',
    nameEngl: 'East Azerbaijan Province',
    modernName: 'Provincia dell\'Azerbaigian Orientale (Tabriz, Iran)',
    historicalName: 'Impero dell\'Iran — Azerbaigian Orientale (Tabriz)',
    adminTitle: 'Ostān-e Āzarbāyjān-e Sharqī (Tabriz & Altopiano di Sahand)',
    getNote: (s) => {
      if (s <= 4) {
        return 'Tabriz · Seconda metropoli dell\'impero e centro economico dell\'Azerbaigian iraniano; famoso per il monumentale bazar storico coperto e le manifatture tessili di tappeti e cuoio; capolinea della ferrovia collegata a Julfa sul confine caucasico sovietico.';
      } else if (s <= 7) {
        return 'Tabriz · Posizione strategica al confine con la RSS Azera e Armena; transito di merci commerciali e monitoraggio rigoroso della frontiera fluviale dell\'Aras contro la penetrazione di emissari comunisti.';
      } else {
        return 'Tabriz · Presidio della 3ª Divisione dell\'esercito iraniano; la crescente concentrazione di forze dell\'Armata Rossa oltre l\'Aras alimenta forti allarmi nella comunità commerciale e tra i vertici militari di frontiera.';
      }
    },
  },

  IRN_WAZ: {
    id: 'IRN_WAZ',
    name: 'West Azerbaijan',
    nutsName: 'Azerbaigian Occidentale (Urmia)',
    nameLatn: 'Āzarbāyjān-e Gharbī',
    nameEngl: 'West Azerbaijan Province',
    modernName: 'Provincia dell\'Azerbaigian Occidentale (Urmia / Rezaieh, Iran)',
    historicalName: 'Impero dell\'Iran — Azerbaigian Occidentale (Rezaieh)',
    adminTitle: 'Ostān-e Āzarbāyjān-e Gharbī (Rezaieh / Urmia & Bacino Lacustre)',
    getNote: (s) => {
      if (s <= 4) {
        return 'Rezaieh (Urmia) · Fertile bacino agricolo sulla riva occidentale del grande lago salato di Urmia, ribattezzata Rezaieh in onore dello Shah; crocevia di popolazioni azere, curde, assire e armene; frontiera stabilizzata con la Turchia (accordo del 1932).';
      } else {
        return 'Rezaieh · Triplice cerniera geopolitica tra Iran, Turchia e Mandato d\'Iraq; pattugliamento delle piste montane dello Zagros settentrionale contro il contrabbando d\'armi e i moti delle tribù curde.';
      }
    },
  },

  IRN_ARD: {
    id: 'IRN_ARD',
    name: 'Ardabil',
    nutsName: 'Ardabil',
    nameLatn: 'Ardabīl',
    nameEngl: 'Ardabil Province',
    modernName: 'Provincia di Ardabil (Iran)',
    historicalName: 'Impero dell\'Iran — Territorio di Ardabil',
    adminTitle: 'Ostān-e Ardabīl (Santuario dello Sheikh Safi & Massiccio del Sabalan)',
    getNote: (s) => {
      return 'Ardabil · Culla spirituale della dinastia Safavide con il magnifico Santuario dello Sheikh Safi al-Din; altopiano montuoso dominato dal vulcano Sabalan; mercato di cereali e tappeti; posto di blocco di frontiera di Bileh Savar verso il Caspio sovietico.';
    },
  },

  IRN_GIL: {
    id: 'IRN_GIL',
    name: 'Gilan',
    nutsName: 'Gilan (Rasht)',
    nameLatn: 'Gīlān',
    nameEngl: 'Gilan Province',
    modernName: 'Provincia di Gilan (Rasht, Iran)',
    historicalName: 'Impero dell\'Iran — Costa Caspica del Gilan',
    adminTitle: 'Ostān-e Gīlān (Rasht & Scalo Navale Caspico di Bandar Pahlavi / Anzali)',
    getNote: (s) => {
      if (s <= 4) {
        return 'Gilan · Regione subtropicale caspica ricca di risaie, piantagioni di tè e sericoltura; Rasht è vivace polo intellettuale e commerciale; il vicino porto di Bandar Pahlavi (Bandar-e Anzali) è il principale scalo marittimo verso la Russia e l\'URSS.';
      } else {
        return 'Gilan · Bandar Pahlavi movimenta il commercio con Baku e Astrachan\'; scalo doganale e base delle motovedette della Flottiglia Caspica iraniana; monitoraggio della navigazione sovietica nel bacino meridionale del Caspio.';
      }
    },
  },

  IRN_MAZ: {
    id: 'IRN_MAZ',
    name: 'Mazandaran',
    nutsName: 'Mazandaran (Sari)',
    nameLatn: 'Māzandarān',
    nameEngl: 'Mazandaran Province',
    modernName: 'Provincia di Mazandaran (Sari, Iran)',
    historicalName: 'Impero dell\'Iran — Mazandaran e Viadotto di Veresk',
    adminTitle: 'Ostān-e Māzandarān (Sari, Babol, Alasht & Viadotto di Veresk)',
    getNote: (s) => {
      if (s <= 4) {
        return 'Mazandaran · Terra natale di Reza Shah (nato ad Alasht); rigogliose foreste caspiche e vette dell\'Alborz; sede della celebre impresa ingegneristica della Ferrovia Trans-Iraniana culminata nello spettacolare viadotto di Veresk (Pol-e Veresk), capolavoro di arditezza tecnica inaugurato nel 1938.';
      } else {
        return 'Mazandaran · Arteria di trasporto vitale dell\'impero; il viadotto di Veresk e le gallerie montane dell\'Alborz sono presidiati da distaccamenti armati della gendarmeria per garantire la continuità dei collegamenti tra Teheran e la costa settentrionale.';
      }
    },
  },

  IRN_GLS: {
    id: 'IRN_GLS',
    name: 'Golestan',
    nutsName: 'Golestan (Gorgan)',
    nameLatn: 'Golestān',
    nameEngl: 'Golestan Province',
    modernName: 'Provincia del Golestan (Gorgan, Iran)',
    historicalName: 'Impero dell\'Iran — Piana di Gorgan e Golestan',
    adminTitle: 'Ostān-e Golestān (Gorgan / Asterabad & Capolinea di Bandar Shah)',
    getNote: (s) => {
      return 'Gorgan (Golestan) · Fertile pianura alluvionale tra i monti dell\'Alborz e le steppe turkmene; floride coltivazioni di cotone, grano e tabacco; porto e capolinea settentrionale della Ferrovia Trans-Iraniana a Bandar Shah (Bandar Torkaman) sul Mar Caspio, a ridosso del confine con la RSS Turkmena.';
    },
  },

  IRN_ESF: {
    id: 'IRN_ESF',
    name: 'Esfahan',
    nutsName: 'Isfahan',
    nameLatn: 'Eṣfahān',
    nameEngl: 'Isfahan Province',
    modernName: 'Provincia di Isfahan (Iran)',
    historicalName: 'Impero dell\'Iran — Altopiano di Isfahan',
    adminTitle: 'Ostān-e Eṣfahān · Capitale Safavide & Polo Tessile dell\'Altopiano',
    getNote: (s) => {
      if (s <= 4) {
        return 'Isfahan (Eṣfahān) · Gloriosa capitale safavide ("Metà del Mondo"), celebre per i capolavori di Piazza Naqsh-e Jahan, il Palazzo Ali Qapu e il Ponte Khaju; centro di rapida industrializzazione con le moderne fabbriche tessili statali (cotone e lana) inaugurate sotto il patronato imperiale.';
      } else {
        return 'Isfahan · Nucleo produttivo e deposito logistico primario dell\'esercito iraniano, situato strategicamente nel cuore dell\'altopiano centrale al riparo dalle vulnerabilità confinarie.';
      }
    },
  },

  IRN_FRS: {
    id: 'IRN_FRS',
    name: 'Fars',
    nutsName: 'Fars (Shiraz)',
    nameLatn: 'Fārs',
    nameEngl: 'Fars Province',
    modernName: 'Provincia di Fars (Shiraz e Persepoli, Iran)',
    historicalName: 'Impero dell\'Iran — Culla del Fars e Persepoli',
    adminTitle: 'Ostān-e Fārs (Shiraz, Persepoli / Takht-e Jamshid & Culla della Persia)',
    getNote: (s) => {
      if (s <= 4) {
        return 'Fars · Culla millenaria della civiltà persiana achemenide e sassanide; scavi archeologici monumentali a Persepoli (Takht-e Jamshid) e Pasargade diretti dall\'archeologo Ernst Herzfeld; Shiraz è capitale d\'arte, giardini e poesia; campagne di disarmo forzato e sedentarizzazione delle potenti tribù nomadi Qashqai.';
      } else {
        return 'Fars · Presidio militare della 6ª Divisione imperiale a Shiraz; vigilanza delle comunicazioni carovaniere e controllo dei passi montani tra l\'altopiano interno e il Golfo Persico.';
      }
    },
  },

  IRN_KMS: {
    id: 'IRN_KMS',
    name: 'Kermanshah',
    nutsName: 'Kermanshah',
    nameLatn: 'Kermānshāh',
    nameEngl: 'Kermanshah Province',
    modernName: 'Provincia di Kermanshah (Iran)',
    historicalName: 'Impero dell\'Iran — Piazzaforte di Kermanshah',
    adminTitle: 'Ostān-e Kermānshāh (Piazzaforte dello Zagros, Raffineria & Passo di Khosravi)',
    getNote: (s) => {
      if (s <= 4) {
        return 'Kermanshah · Porta strategica occidentale dell\'Iran sullo Zagros; importante snodo per la raffineria petrolifera sussidiaria della AIOC alimentata dal campo di Naft Shahr; arteria viaria primaria verso Baghdad e i luoghi santi sciiti in Iraq attraverso il Passo di Khosravi.';
      } else {
        return 'Kermanshah · Nell\'aprile 1941 lo scoppio della guerra anglo-irachena di Rashid Ali accende le ostilità oltre il confine; le truppe iraniane presidiano il Passo di Khosravi e la raffineria di Kermanshah in stato di allerta difensiva per prevenire sconfinamenti o ribellioni tribali.';
      }
    },
  },

  IRN_KRD: {
    id: 'IRN_KRD',
    name: 'Kordestan',
    nutsName: 'Kurdistan (Sanandaj)',
    nameLatn: 'Kordestān',
    nameEngl: 'Kurdistan Province',
    modernName: 'Provincia del Kurdistan (Sanandaj, Iran)',
    historicalName: 'Impero dell\'Iran — Altopiano del Kurdistan',
    adminTitle: 'Ostān-e Kordestān (Sanandaj & Monti Zagros)',
    getNote: (s) => {
      return 'Kurdistan (Kordestān) · Regione montuosa degli Zagros popolata da comunità curde; capoluogo Sanandaj; rigida applicazione del programma statale di censimento, scolarizzazione in lingua persiana e coscrizione militare obbligatoria imposto dai governatori militari di Reza Shah.';
    },
  },

  IRN_ILM: {
    id: 'IRN_ILM',
    name: 'Ilam',
    nutsName: 'Ilam',
    nameLatn: 'Īlām',
    nameEngl: 'Ilam Province',
    modernName: 'Provincia di Ilam (Iran)',
    historicalName: 'Impero dell\'Iran — Territorio di Ilam (Pusht-e Kuh)',
    adminTitle: 'Ostān-e Īlām (Pusht-e Kuh & Catena del Kabir Kuh)',
    getNote: (s) => {
      return 'Ilam · Territorio frontaliero storicamente noto come Pusht-e Kuh; integrato con fermezza nell\'amministrazione centralizzata dopo la caduta dell\'ultimo Vali feudale; presidio confinaio della gendarmeria imperiale affacciato sulla piana mesopotamica di Amara e Kut.';
    },
  },

  IRN_LOR: {
    id: 'IRN_LOR',
    name: 'Lorestan',
    nutsName: 'Lorestan (Khorramabad)',
    nameLatn: 'Lorestān',
    nameEngl: 'Lorestan Province',
    modernName: 'Provincia di Lorestan (Khorramabad, Iran)',
    historicalName: 'Impero dell\'Iran — Lorestan e Fortezza di Falak-ol-Aflak',
    adminTitle: 'Ostān-e Lorestān (Khorramabad & Fortezza di Falak-ol-Aflak)',
    getNote: (s) => {
      return 'Lorestan · Cuore montano delle tribù dei Lori, pacificato con il ferro e con il fuoco dal Generale Amir Ahmadi; la fortezza sassanide di Falak-ol-Aflak a Khorramabad funge da presidio militare imperiale lungo la strada camionabile tra Teheran e il Khuzestan.';
    },
  },

  IRN_BSH: {
    id: 'IRN_BSH',
    name: 'Bushehr',
    nutsName: 'Bushehr',
    nameLatn: 'Būshehr',
    nameEngl: 'Bushehr Province',
    modernName: 'Provincia di Bushehr (Iran)',
    historicalName: 'Impero dell\'Iran — Porto di Bushehr e Golfo Persico',
    adminTitle: 'Ostān-e Būshehr (Porto di Bushehr, Sede Consolare Britannica & Isola di Kharg)',
    getNote: (s) => {
      if (s <= 4) {
        return 'Bushehr · Storico scalo commerciale marittimo del Golfo Persico e sede della residenza consolare britannica; punto d\'imbarco delle carovane verso Shiraz; base navale delle prime cannoniere della Marina Imperiale Iraniana (Babr e Palang).';
      } else {
        return 'Bushehr · Controllo navale britannico sulle rotte marittime mercantili nel Golfo; l\'Isola di Kharg funge da punto d\'ancoraggio strategico per il pattugliamento delle acque territoriali.';
      }
    },
  },

  IRN_HRZ: {
    id: 'IRN_HRZ',
    name: 'Hormozgan',
    nutsName: 'Hormozgan (Bandar Abbas)',
    nameLatn: 'Hormozgān',
    nameEngl: 'Hormozgan Province',
    modernName: 'Provincia di Hormozgan (Bandar Abbas, Iran)',
    historicalName: 'Impero dell\'Iran — Stretto di Hormuz e Isole del Golfo',
    adminTitle: 'Ostān-e Hormozgān (Bandar Abbas, Stretto di Hormuz & Isole di Qeshm e Kish)',
    getNote: (s) => {
      if (s <= 4) {
        return 'Hormozgan · Posizione di vertice sullo Stretto di Hormuz; Bandar Abbas è porto commerciale per il sud-est dell\'Iran; sovranità imperiale riaffermata sulle isole del Golfo (Qeshm, Hormuz, Larak, Lavan, Kish e Henjam, da cui la marina britannica ha evacuato le basi nel 1935).';
      } else {
        return 'Hormozgan · Snodo strategico primario per il transito delle petroliere nel Golfo Persico; batterie di costa e stazioni di vedetta iraniane vigilano sullo Stretto di Hormuz a guardia delle rotte verso l\'Oceano Indiano.';
      }
    },
  },

  IRN_SIS: {
    id: 'IRN_SIS',
    name: 'Sistan and Baluchestan',
    nutsName: 'Sistan e Baluchistan (Zahedan)',
    nameLatn: 'Sīstān va Balūchestān',
    nameEngl: 'Sistan and Baluchestan Province',
    modernName: 'Provincia del Sistan e Baluchistan (Zahedan e Chabahar, Iran)',
    historicalName: 'Impero dell\'Iran — Frontiera del Sistan e Baluchistan',
    adminTitle: 'Ostān-e Sīstān va Balūchestān (Zahedan, Bacino dell\'Helmand & Porto di Chabahar)',
    getNote: (s) => {
      if (s <= 4) {
        return 'Sistan e Baluchistan · Vasta frontiera orientale semiarida; Zahedan è capolinea della ferrovia a scartamento largo collegata alla rete del British Raj a Quetta; la piana del Sistan è alimentata dalle acque del fiume Helmand al confine afghano; il porto di Chabahar costituisce l\'unico sbocco oceanico diretto dell\'Iran sul Mare Arabico.';
      } else {
        return 'Sistan e Baluchistan · Settore di frontiera presidiato da contingenti di cavalleria e guardie di frontiera; monitoraggio delle carovane nomadi tra Baluchistan iraniano e Baluchistan britannico.';
      }
    },
  },

  IRN_KRR: {
    id: 'IRN_KRR',
    name: 'Razavi Khorasan',
    nutsName: 'Khorasan Razavi (Mashhad)',
    nameLatn: 'Khorāsān-e Razavī',
    nameEngl: 'Razavi Khorasan Province',
    modernName: 'Provincia del Khorasan Razavi (Mashhad, Iran)',
    historicalName: 'Impero dell\'Iran — Khorasan e Mashhad Sacra',
    adminTitle: 'Ostān-e Khorāsān-e Razavī (Mashhad & Santuario dell\'Imam Reza)',
    getNote: (s) => {
      if (s <= 4) {
        return 'Mashhad (Khorasan) · Capitale spirituale dell\'Iran sciita con il colossale complesso del Santuario dell\'Imam Reza; teatro della sanguinosa rivolta della moschea di Goharshad (1935) contro le riforme laiciste di Reza Shah; crocevia commerciale con l\'Afghanistan (Herat) e il Turkmenistan.';
      } else {
        return 'Mashhad · Centro di comando della 9ª Divisione dell\'esercito imperiale; guarnigione di frontiera schierata lungo la catena del Kopet Dag a protezione dei confini con l\'Unione Sovietica.';
      }
    },
  },

  IRN_KRN: {
    id: 'IRN_KRN',
    name: 'North Khorasan',
    nutsName: 'Khorasan Settentrionale (Bojnord)',
    nameLatn: 'Khorāsān-e Shomālī',
    nameEngl: 'North Khorasan Province',
    modernName: 'Provincia del Khorasan Settentrionale (Bojnord, Iran)',
    historicalName: 'Impero dell\'Iran — Khorasan Settentrionale',
    adminTitle: 'Ostān-e Khorāsān-e Shomālī (Bojnord & Monti Kopet Dag)',
    getNote: (s) => {
      return 'Bojnord · Territorio montuoso settentrionale del Kopet Dag popolato da comunità curde e turkmene; presidio di confine imperiale a nord della valle dell\'Atrek verso Ashgabat (RSS Turkmena).';
    },
  },

  IRN_KRS: {
    id: 'IRN_KRS',
    name: 'South Khorasan',
    nutsName: 'Khorasan Meridionale (Birjand)',
    nameLatn: 'Khorāsān-e Jonūbī',
    nameEngl: 'South Khorasan Province',
    modernName: 'Provincia del Khorasan Meridionale (Birjand, Iran)',
    historicalName: 'Impero dell\'Iran — Khorasan Meridionale (Birjand)',
    adminTitle: 'Ostān-e Khorāsān-e Jonūbī (Birjand & Deserto di Lut)',
    getNote: (s) => {
      return 'Birjand · Oasi mercantile e centro rinomato per la produzione di zafferano e berberis; storicamente amministrato dalla potente famiglia nobiliare degli Alam; frontiera carovaniera desertica verso l\'Afghanistan.';
    },
  },

  IRN_KRM: {
    id: 'IRN_KRM',
    name: 'Kerman',
    nutsName: 'Kerman',
    nameLatn: 'Kermān',
    nameEngl: 'Kerman Province',
    modernName: 'Provincia di Kerman (Iran)',
    historicalName: 'Impero dell\'Iran — Oasi di Kerman e Cittadella di Bam',
    adminTitle: 'Ostān-e Kermān (Cittadella di Bam, Miniere dell\'Altopiano & Deserto di Lut)',
    getNote: (s) => {
      return 'Kerman · Storico centro manifatturiero mondiale di tappeti persiani ai margini del Deserto di Lut; roccaforte millenaria della Cittadella fortificata di Bam (Arg-e Bam); nodo carovaniero protetto verso il sud-est e il Golfo.';
    },
  },

  IRN_YZD: {
    id: 'IRN_YZD',
    name: 'Yazd',
    nutsName: 'Yazd',
    nameLatn: 'Yazd',
    nameEngl: 'Yazd Province',
    modernName: 'Provincia di Yazd (Iran)',
    historicalName: 'Impero dell\'Iran — Oasi di Yazd',
    adminTitle: 'Ostān-e Yazd (Oasi della Via della Seta, Qanat Millenari & Torri del Vento)',
    getNote: (s) => {
      return 'Yazd · Oasi del deserto celebre per i qanat sotterranei, le torri del vento (badgir) e l\'architettura in argilla; santuario spirituale mondiale della fede zoroastriana con il Tempio del Fuoco Atash Behram e le Torri del Silenzio.';
    },
  },

  IRN_HAM: {
    id: 'IRN_HAM',
    name: 'Hamadan',
    nutsName: 'Hamadan (Ecbatana)',
    nameLatn: 'Hamadān',
    nameEngl: 'Hamadan Province',
    modernName: 'Provincia di Hamadan (Ecbatana, Iran)',
    historicalName: 'Impero dell\'Iran — Hamadan (Ecbatana)',
    adminTitle: 'Ostān-e Hamadān (Antica Ecbatana dei Medi & Mausoleo di Avicenna)',
    getNote: (s) => {
      return 'Hamadan · Antica Ecbatana capitale dell\'Impero Medo ai piedi del Monte Alvand; snodo viario primario tra Teheran, lo Zagros e l\'Iraq; florido mercato agricolo, cerealicolo e artigianale.';
    },
  },

  IRN_QOM: {
    id: 'IRN_QOM',
    name: 'Qom',
    nutsName: 'Qom',
    nameLatn: 'Qom',
    nameEngl: 'Qom Province',
    modernName: 'Provincia di Qom (Città Santa di Qom, Iran)',
    historicalName: 'Impero dell\'Iran — Città Santa di Qom',
    adminTitle: 'Ostān-e Qom (Città Santa Sciita & Santuario di Fatima Masumeh)',
    getNote: (s) => {
      return 'Qom · Roccaforte teologica dell\'Islam sciita con il venerato Santuario di Fatima Masumeh e gli haza (seminari); centro della rigorosa opposizione clericale alle riforme laiciste e al codice civile occidentale varato da Reza Shah.';
    },
  },

  IRN_MRK: {
    id: 'IRN_MRK',
    name: 'Markazi',
    nutsName: 'Markazi (Arak)',
    nameLatn: 'Markazī',
    nameEngl: 'Markazi Province',
    modernName: 'Provincia di Markazi (Arak, Iran)',
    historicalName: 'Impero dell\'Iran — Provincia Centrale (Arak)',
    adminTitle: 'Ostān-e Markazī (Arak / Sultanabad & Snodo della Ferrovia Trans-Iraniana)',
    getNote: (s) => {
      return 'Arak (Markazi) · Polo industriale e snodo fondamentale della Ferrovia Trans-Iraniana nel suo percorso tra l\'altopiano di Teheran e le valli del sud; famosa manifattura di tappeti di Sarouk esportati in tutto il mondo.';
    },
  },

  IRN_ALB: {
    id: 'IRN_ALB',
    name: 'Alborz',
    nutsName: 'Alborz (Karaj)',
    nameLatn: 'Alborz',
    nameEngl: 'Alborz Province',
    modernName: 'Provincia di Alborz (Karaj, Iran)',
    historicalName: 'Impero dell\'Iran — Massiccio dell\'Alborz e Karaj',
    adminTitle: 'Ostān-e Alborz (Karaj, Facoltà di Agraria & Passo di Chalous)',
    getNote: (s) => {
      return 'Karaj (Alborz) · Sbocco naturale a ovest di Teheran verso la spettacolare strada montana di Chalous attraverso la catena dell\'Alborz; sede della prestigiosa Facoltà di Agraria e delle piantagioni sperimentali statali.';
    },
  },

  IRN_QAZ: {
    id: 'IRN_QAZ',
    name: 'Qazvin',
    nutsName: 'Qazvin',
    nameLatn: 'Qazvīn',
    nameEngl: 'Qazvin Province',
    modernName: 'Provincia di Qazvin (Iran)',
    historicalName: 'Impero dell\'Iran — Piana di Qazvin',
    adminTitle: 'Ostān-e Qazvīn (Piazzaforte della Piana & Valico verso l\'Azerbaigian)',
    getNote: (s) => {
      return 'Qazvin · Antica capitale safavide e snodo strategico di collegamento tra Teheran, il Mar Caspio e l\'Azerbaigian; piazzaforte militare sede di caserme e depositi di rifornimento dell\'esercito imperiale.';
    },
  },

  IRN_ZAN: {
    id: 'IRN_ZAN',
    name: 'Zanjan',
    nutsName: 'Zanjan',
    nameLatn: 'Zanjān',
    nameEngl: 'Zanjan Province',
    modernName: 'Provincia di Zanjan (Iran)',
    historicalName: 'Impero dell\'Iran — Altopiano di Zanjan',
    adminTitle: 'Ostān-e Zanjān (Zanjan & Cupola di Soltaniyeh)',
    getNote: (s) => {
      return 'Zanjan · Altopiano strategico famoso per la vicina Cupola di Soltaniyeh (mausoleo ilkhanide del XIV secolo); fiorente artigianato di posateria e lavorazione del rame; corridoio obbligato tra Teheran e Tabriz.';
    },
  },

  IRN_SEM: {
    id: 'IRN_SEM',
    name: 'Semnan',
    nutsName: 'Semnan',
    nameLatn: 'Semnān',
    nameEngl: 'Semnan Province',
    modernName: 'Provincia di Semnan (Iran)',
    historicalName: 'Impero dell\'Iran — Fascia Oasica di Semnan',
    adminTitle: 'Ostān-e Semnān (Porta del Khorasan & Confine del Dasht-e Kavir)',
    getNote: (s) => {
      return 'Semnan · Fascia di oasi tra i versanti meridionali dell\'Alborz e l\'arida distesa salina del Dasht-e Kavir; passaggio chiave della strada militare e carovaniera verso il Khorasan e Mashhad.';
    },
  },

  IRN_CHB: {
    id: 'IRN_CHB',
    name: 'Chahar Mahall and Bakhtiari',
    nutsName: 'Chahar Mahal e Bakhtiari (Shahr-e Kord)',
    nameLatn: 'Chahār Maḥāl va Bakhtīārī',
    nameEngl: 'Chaharmahal and Bakhtiari Province',
    modernName: 'Provincia di Chahar Mahal e Bakhtiari (Shahr-e Kord, Iran)',
    historicalName: 'Impero dell\'Iran — Terre dei Bakhtiari',
    adminTitle: 'Ostān-e Chahār Maḥāl va Bakhtīārī (Terra dei Bakhtiari & Fiume Karun)',
    getNote: (s) => {
      return 'Chahar Mahal e Bakhtiari · Regione d\'alta quota dello Zagros e sorgente dei fiumi Karun e Zayandeh; culla delle potenti confederazioni tribali nomadi dei Bakhtiari, sottoposte a rigido disarmo e sorveglianza militare da parte di Reza Shah.';
    },
  },

  IRN_KBD: {
    id: 'IRN_KBD',
    name: 'Kohgiluyeh and Buyer Ahmad',
    nutsName: 'Kohgiluyeh e Buyer Ahmad (Yasuj)',
    nameLatn: 'Kohgīlūyeh va Būyer-Aḥmad',
    nameEngl: 'Kohgiluyeh and Boyer-Ahmad Province',
    modernName: 'Provincia di Kohgiluyeh e Buyer Ahmad (Yasuj, Iran)',
    historicalName: 'Impero dell\'Iran — Massiccio del Monte Dena',
    adminTitle: 'Ostān-e Kohgīlūyeh va Būyer-Aḥmad (Yasuj & Catena del Monte Dena)',
    getNote: (s) => {
      return 'Kohgiluyeh e Buyer Ahmad · Impervio territorio montuoso dominato dalla catena del Monte Dena; storicamente caratterizzato dalla resistenza armata dei clan guerrieri Buyer-Ahmad, pacificati dopo prolungate spedizioni militari negli anni Trenta.';
    },
  },
};

/**
 * Risolve lo stato geopolitico di una provincia iraniana per uno step temporale specifico.
 */
export function resolveIranProvince(ft: any, s: number): ResolvedTerritory {
  const p = (ft && ft.properties) ? ft.properties : {};
  const fid = String(ft.id || p.id || p.NUTS_ID || '').trim();

  // Match canonico via IRAN_PROVINCES_META
  if (IRAN_PROVINCES_META[fid]) {
    const meta = IRAN_PROVINCES_META[fid];
    return makeResult(
      'IRN',
      meta.historicalName,
      meta.getNote(s),
      'Neutrale',
      meta.adminTitle
    );
  }

  // Fallback per proprietà parziali
  for (const key of Object.keys(IRAN_PROVINCES_META)) {
    const meta = IRAN_PROVINCES_META[key];
    if (
      p.name === meta.name ||
      p.NUTS_NAME === meta.nutsName ||
      p.NAME_LATN === meta.nameLatn ||
      (p.NAME && p.NAME.includes(meta.name))
    ) {
      return makeResult(
        'IRN',
        meta.historicalName,
        meta.getNote(s),
        'Neutrale',
        meta.adminTitle
      );
    }
  }

  // Fallback generico per entità sovrana Iran
  const fallbackName = p.NAME || p.HISTORICAL_NAME || 'Impero dell\'Iran (Persia)';
  const fallbackAdmin = p.ADMIN || 'Keshvar-e Shāhanshāhi-ye Irān (Impero dell\'Iran)';
  const fallbackNote = s >= 8
    ? 'Impero dell\'Iran sotto il regno di Reza Shah Pahlavi; neutrale all\'inizio delle ostilità mondiali.'
    : 'Impero dell\'Iran (Dinastia Pahlavi) — Stato sovrano guidato da Reza Shah Pahlavi con capitale a Teheran; neutrale e impegnato nella modernizzazione infrastrutturale (Ferrovia Trans-Iraniana).';

  return makeResult('IRN', fallbackName, fallbackNote, 'Neutrale', fallbackAdmin);
}
