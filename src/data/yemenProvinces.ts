/**
 * Dettaglio Geocartografico Storico dei 22 Governatorati dello Yemen (1936-1941)
 *
 * Tripartizione geostorica fondamentale:
 * 1. Regno Mutawakkilita dello Yemen (Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah - YEM):
 *    - 14 Governatorati degli Altipiani e della Tihamah (Sana'a, Sa'dah, Hajjah, Hodeidah, Ta'iz, Ibb, ecc.)
 *    - Teocrazia zaidita sovrana e indipendente retta dall'Imam Yahya Muhammad Hamid ed-Din
 *    - Confine di Taif (1934) a nord con l'Arabia Saudita; status quo di Sana'a (1934) a sud con la Gran Bretagna
 * 2. Protettorato di Aden (British Aden Protectorate - UK):
 *    - 7 Governatorati e Confederazioni Sultanali (Lahj, Dhala, Abyan, Shabwah, Hadramawt, Mahrah, Socotra)
 *    - Sultanati, emirati e sceiccati arabi legati alla Corona britannica da Treaties of Protection
 * 3. Porto e Insediamento di Aden (Aden Settlement / Crown Colony of Aden - YEAD):
 *    - Dinamica temporale:
 *      * Step 0 (Gennaio 1936): Porto del Raj (Chief Commissioner's Province of British India - RAJ / IND)
 *      * Step 1..8 (1938-1941): Colonia della Corona di Aden (Crown Colony of Aden - UK / Colonial Office)
 */

export interface YemenDistrictMeta {
  nameLatn: string;
  nameArabic: string;
  historicalName: string;
  adminTitle: string;
  nameEngl: string;
  entityKind: 'KINGDOM_OF_YEMEN' | 'ADEN_PROTECTORATE' | 'ADEN_PORT';
  sovereign: 'YEM' | 'UK' | 'DYNAMIC_RAJ_UK';
  region: string;
  note: string;
}

export const YEMEN_PROVINCES_META: Record<string, YemenDistrictMeta> = {
  // ==========================================
  // REGNO MUTAWAKKILITA DELLO YEMEN (14)
  // ==========================================
  YESA: {
    nameLatn: "Sana'a (Capitale)",
    nameArabic: "أمانة العاصمة صنعاء",
    historicalName: "Sana'a (Capitale dell'Imamato Zaidita dello Yemen)",
    adminTitle: "Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah — Capitale Reale di Sana'a (Imam Yahya)",
    nameEngl: "Sana'a City (Amanat al-Asimah)",
    entityKind: 'KINGDOM_OF_YEMEN',
    sovereign: 'YEM',
    region: 'ALTIPIANI_OCCIDENTALI',
    note: "Capitale millenaria del Regno Mutawakkilita e residenza sovrana dell'Imam Yahya Muhammad Hamid ed-Din (Palazzo di Dar al-Hajar a Wadi Dhahr); roccaforte dell'Islam zaidita a 2.200 m di altitudine cinta da mura d'argilla turrite (Bab al-Yaman); cuore politico e spirituale dell'Arabia Felix indipendente."
  },
  YESN: {
    nameLatn: "Sana'a Rurale",
    nameArabic: "محافظة صنعاء",
    historicalName: "Sana'a Rurale e Altopiani Centrali (Haraz / Jabal Nabi Shu'ayb)",
    adminTitle: "Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah — Qada di Sana'a",
    nameEngl: "Sana'a Governorate (Central Highlands)",
    entityKind: 'KINGDOM_OF_YEMEN',
    sovereign: 'YEM',
    region: 'ALTIPIANI_OCCIDENTALI',
    note: "Altopiani terrazzati dell'Arabia Felix dominati dal massiccio del Jabal Nabi Shu'ayb (3.666 m, vetta culminante della Penisola Arabica); colture intensive di caffè arabico moka e cereali; territorio delle storiche confederazioni tribali Hashid e Bakil fedeli alla corona zaidita."
  },
  YEAM: {
    nameLatn: "Amran",
    nameArabic: "عمران",
    historicalName: "Amran e Altopiano Settentrionale (Thula / Raydah / Shibam Kawkaban)",
    adminTitle: "Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah — Governatorato di Amran",
    nameEngl: "Amran",
    entityKind: 'KINGDOM_OF_YEMEN',
    sovereign: 'YEM',
    region: 'ALTIPIANI_SETTENTRIONALI',
    note: "Regione montuosa a settentrione di Sana'a celebre per le cittadelle fortificate in pietra viva di Thula e Kawkaban arroccate sulle rupi; roccaforte centrale della potente confederazione tribale degli Hashid e baricentro delle guarnigioni dell'esercito dell'Imam (Al-Jaysh al-Muzaffar)."
  },
  YESD: {
    nameLatn: "Sa'dah",
    nameArabic: "صعدة",
    historicalName: "Sa'dah (Culla dell'Imamato Zaidita e Frontiera del Najran)",
    adminTitle: "Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah — Governatorato di Frontiera di Sa'dah",
    nameEngl: "Sa'dah",
    entityKind: 'KINGDOM_OF_YEMEN',
    sovereign: 'YEM',
    region: 'FRONTIERA_SETTENTRIONALE',
    note: "Storico santuario fondativo dell'Imamato zaidita (moschea dell'Imam al-Hadi Yahya, IX secolo) e bastione di frontiera settentrionale verso il Najran saudita; teatro principale della guerra saudita-yemenita del 1934 e perno delle delimitazioni territoriali stabilite dal Trattato di Taif (maggio 1934)."
  },
  YEHJ: {
    nameLatn: "Hajjah",
    nameArabic: "حجة",
    historicalName: "Hajjah e Frontiera di Haradh (Midi e Tihamah Settentrionale)",
    adminTitle: "Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah — Governatorato di Hajjah",
    nameEngl: "Hajjah",
    entityKind: 'KINGDOM_OF_YEMEN',
    sovereign: 'YEM',
    region: 'TIHAMAH_SETTENTRIONALE',
    note: "Formidabile fortezza naturale montuosa affacciata sulla pianura costiera della Tihamah; comprende il porto costiero di Midi e l'oasi confinaria di Haradh al confine con la provincia saudita di Jizan; sede di fortezze inespugnabili (Qasr al-Qashla) a presidio dei passi verso l'altopiano."
  },
  YEHU: {
    nameLatn: "Al Hodeidah",
    nameArabic: "الحديدة",
    historicalName: "Al Hodeidah (Porto della Tihamah sul Mar Rosso / Isole Kamaran)",
    adminTitle: "Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah — Governatorato Marittimo di Al Hodeidah",
    nameEngl: "Al Hudaydah (Tihamah Port)",
    entityKind: 'KINGDOM_OF_YEMEN',
    sovereign: 'YEM',
    region: 'TIHAMAH_COSTIERA',
    note: "Porto marittimo commerciale primario del Regno dello Yemen sul Mar Rosso; scalo per l'esportazione del celebre caffè arabico e polo d'ingresso dei rifornimenti via mare; fronteggia l'isola di Kamaran (occupata dai britannici come stazione di quarantena marittima per i pellegrini meccani)."
  },
  YEMW: {
    nameLatn: "Al Mahwit",
    nameArabic: "المحويت",
    historicalName: "Al Mahwit (Monti Occidentali e Vallate di Kawkaban)",
    adminTitle: "Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah — Distretto di Al Mahwit",
    nameEngl: "Al Mahwit",
    entityKind: 'KINGDOM_OF_YEMEN',
    sovereign: 'YEM',
    region: 'ALTIPIANI_OCCIDENTALI',
    note: "Spettacolari contrafforti montuosi terrazzati incastonati tra la pianura caldissima della Tihamah e l'altopiano di Sana'a; centro di coltivazione intensiva del caffè e delle essenze arboree dell'Arabia Felix, attraversato da gole impervie a difesa della capitale."
  },
  YERA: {
    nameLatn: "Raymah",
    nameArabic: "ريمة",
    historicalName: "Raymah (Jabal Raymah e Al-Jabin)",
    adminTitle: "Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah — Distretto Montano di Raymah",
    nameEngl: "Raymah",
    entityKind: 'KINGDOM_OF_YEMEN',
    sovereign: 'YEM',
    region: 'ALTIPIANI_OCCIDENTALI',
    note: "Massiccio montuoso isolato dell'anti-Tihamah celebre per le sue vertiginose terrazze agricole pluviali e la nebbia perenne; capoluogo Al-Jabin; baluardo difensivo naturale che sbarra l'accesso dal Mar Rosso verso Dhamar e la strada regia meridionale."
  },
  YEDH: {
    nameLatn: "Dhamar",
    nameArabic: "ذمار",
    historicalName: "Dhamar (Polo Teologico e Cavalleria di Yarim)",
    adminTitle: "Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah — Governatorato di Dhamar",
    nameEngl: "Dhamar",
    entityKind: 'KINGDOM_OF_YEMEN',
    sovereign: 'YEM',
    region: 'ALTIPIANI_MERIDIONALI',
    note: "Vasto altopiano culla della grande università teologica islamica zaidita e dell'allevamento dei celebri cavalli arabi yemeniti; comprende l'altopiano di Yarim e le rovine di Zafar (capitale dell'antico Regno himyarita); crocevia obbligato delle comunicazioni tra Sana'a, Ibb e Ta'iz."
  },
  YEIB: {
    nameLatn: "Ibb",
    nameArabic: "إب",
    historicalName: "Ibb (La Provincia Verde / Jibla della Regina Arwa)",
    adminTitle: "Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah — Governatorato di Ibb (Al-Liwa al-Akhdar)",
    nameEngl: "Ibb",
    entityKind: 'KINGDOM_OF_YEMEN',
    sovereign: 'YEM',
    region: 'ALTIPIANI_MERIDIONALI',
    note: "Il cuore più fertile e verdeggiante dell'Arabia Felix, bagnato dai monsoni estivi; comprende la storica capitale medievale di Jibla (sede dell'illustre Regina Arwa al-Sulayhi) e i monti terrazzati di Ba'dan e Sumara; granaio cerealicolo e frutticolo di primaria importanza per il Regno."
  },
  YETA: {
    nameLatn: "Ta'iz",
    nameArabic: "تعز",
    historicalName: "Ta'iz e Mokha (Capitale Meridionale e Porto del Caffè / Bab el-Mandeb)",
    adminTitle: "Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah — Governatorato di Ta'iz (Residenza di Ahmad Sayf al-Islam)",
    nameEngl: "Ta'iz (Taiz & Mocha)",
    entityKind: 'KINGDOM_OF_YEMEN',
    sovereign: 'YEM',
    region: 'ALTIPIANI_MERIDIONALI',
    note: "Metropoli meridionale adagiata ai piedi del Monte Sabir, residenza del principe ereditario Ahmad Sayf al-Islam; include lo storico porto di Mokha (Al-Mukha) che diede il nome al caffè esportato in tutto il mondo; cerniera di frontiera con il Protettorato britannico di Aden (Sultanato di Lahej) e affaccio sullo stretto di Bab el-Mandeb."
  },
  YEBA: {
    nameLatn: "Al Bayda",
    nameArabic: "البيضاء",
    historicalName: "Al Bayda e Rada' (Frontiera Orientale della Violet Line)",
    adminTitle: "Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah — Governatorato di Al Bayda",
    nameEngl: "Al Bayda",
    entityKind: 'KINGDOM_OF_YEMEN',
    sovereign: 'YEM',
    region: 'FRONTIERA_ORIENTALE',
    note: "Altopiano orientale di frontiera comprendente la città d'arte di Rada' (celebre per la Madrasa Amiriya del XVI secolo) e il principato tribale di Al Bayda; linea di attrito secolare tra le pretese territoriali dell'Imam Yahya e i protettorati britannici di Audhali, Upper Yafa e Beihan, stabilizzata dal Trattato anglo-yemenita di Sana'a del 1934."
  },
  YEMA: {
    nameLatn: "Ma'rib",
    nameArabic: "مأرب",
    historicalName: "Ma'rib (Regno di Saba / Tempio del Sole e Grande Diga Antica)",
    adminTitle: "Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah — Governatorato di Ma'rib",
    nameEngl: "Ma'rib (Marib)",
    entityKind: 'KINGDOM_OF_YEMEN',
    sovereign: 'YEM',
    region: 'DESERTO_ORIENTALE',
    note: "Culla millenaria della civiltà sudarabica e capitale leggendaria della Regina di Saba (Bilqis); conserva le rovine ciclopiche della Grande Diga di Ma'rib e i santuari di Mahram Bilqis (Awwam); oasi carovaniera all'imbocco del deserto di Ramlat al-Sab'atayn, sottoposta all'autorità dell'Imamato zaidita."
  },
  YEJA: {
    nameLatn: "Al Jawf",
    nameArabic: "الجوف",
    historicalName: "Al Jawf (Regno dei Minei / Qarnawu e Deserto Settentrionale)",
    adminTitle: "Al-Mamlakah al-Mutawakkiliyyah al-Yamaniyyah — Governatorato di Frontiera di Al Jawf",
    nameEngl: "Al Jawf",
    entityKind: 'KINGDOM_OF_YEMEN',
    sovereign: 'YEM',
    region: 'DESERTO_SETTENTRIONALE',
    note: "Vasta depressione desertica nel nord-est yemenita attraversata dal Wadi al-Jawf, antica patria del regno mercantile carovaniero dei Minei (Ma'in); terra delle tribù nomadi beduine di Dahm, cerniera verso il Rub' al Khali e frontiera de facto negoziata col Regno Saudita dopo il 1934."
  },

  // ==========================================
  // PROTETTORATO DI ADEN (7)
  // ==========================================
  YELA: {
    nameLatn: "Lahj",
    nameArabic: "لحج",
    historicalName: "Sultanato di Lahej (Sultanato Abdali di Al-Hawtah / Hauhabi e Subaihi)",
    adminTitle: "British Aden Protectorate (WAP) — Sultanate of Lahej (Sir ‘Abd al-Karim Fadl II)",
    nameEngl: "Lahj (Sultanate of Lahej)",
    entityKind: 'ADEN_PROTECTORATE',
    sovereign: 'UK',
    region: 'PROTETTORATO_OCCIDENTALE',
    note: "Il più prestigioso e potente sultanato del Protettorato Occidentale di Aden (WAP), retto dalla dinastia Abdali col titolo di Cavaliere dell'Impero Britannico; capoluogo Al-Hawtah, ricca oasi agricola che riforniva la guarnigione di Aden di ortaggi e foraggio; alleato chiave della Corona britannica a cuscinetto contro le incursioni zaidite dallo Yemen."
  },
  YEDA: {
    nameLatn: "Ad Dali'",
    nameArabic: "الضالع",
    historicalName: "Emirato di Dhala (Amiri / Upper & Lower Yafa — Frontier Pillar)",
    adminTitle: "British Aden Protectorate (WAP) — Emirate of Dhala & Yafa Confederations",
    nameEngl: "Ad Dali' (Dhala Emirate)",
    entityKind: 'ADEN_PROTECTORATE',
    sovereign: 'UK',
    region: 'PROTETTORATO_OCCIDENTALE',
    note: "Roccaforte montana di prima linea lungo la storica 'Violet Line' anglo-ottomana del 1914; comprende l'Emirato Amiri di Dhala e i fieri cantoni tribali guerrieri dell'Alto e Basso Yafa; presidio avanzato delle forze confinarie britanniche (Government Guards e Aden Protectorate Levies) a difesa degli accessi settentrionali ad Aden."
  },
  YEAB: {
    nameLatn: "Abyan",
    nameArabic: "أبين",
    historicalName: "Sultanato di Fadhli (Zinjibar / Shuqrah e Altopiano di Dathina)",
    adminTitle: "British Aden Protectorate (WAP) — Fadhli Sultanate & Audhali Confederation",
    nameEngl: "Abyan (Fadhli Sultanate)",
    entityKind: 'ADEN_PROTECTORATE',
    sovereign: 'UK',
    region: 'PROTETTORATO_OCCIDENTALE',
    note: "Vasto distretto costiero e sub-montano a levante di Aden; comprende il Sultanato di Fadhli con capitali Zinjibar e il porto carovaniero di Shuqrah sul Golfo di Aden, nonché la confederazione repubblicana di Dathina e il Sultanato di Audhali; perno del delta agricolo del Wadi Bana."
  },
  YESH: {
    nameLatn: "Shabwah",
    nameArabic: "شبوة",
    historicalName: "Shabwah (Sultanati Wahidi di Balhaf / Sceiccato di Beihan e Aulaqi)",
    adminTitle: "British Aden Protectorate (WAP/EAP) — Wahidi Sultanates & Upper/Lower Aulaqi",
    nameEngl: "Shabwah (Wahidi & Beihan)",
    entityKind: 'ADEN_PROTECTORATE',
    sovereign: 'UK',
    region: 'PROTETTORATO_ORIENTALE',
    note: "Cuore carovaniero dell'antica via dell'incenso con capitale storica a Shabwa; cerniera tra Protettorato Occidentale e Orientale comprendente lo Sceiccato hashemita di Beihan (Scheriffo Husayn), i Sultanati Wahidi di Balhaf, Mayfa'a e Bir Ali, e i domini tribali degli Aulaqi superiori e inferiori; sbarramento alle piste dell'Imamato di Ma'rib."
  },
  YEHD: {
    nameLatn: "Hadramawt",
    nameArabic: "حضرموت",
    historicalName: "Hadramawt (Sultanato Qu'aiti di Shihr e Mukalla / Sultanato Kathiri di Seiyun)",
    adminTitle: "British Aden Protectorate (EAP) — Qu'aiti State of Shihr and Mukalla & Kathiri State",
    nameEngl: "Hadhramaut (Qu'aiti & Kathiri)",
    entityKind: 'ADEN_PROTECTORATE',
    sovereign: 'UK',
    region: 'PROTETTORATO_ORIENTALE',
    note: "Il più esteso territorio del Protettorato Orientale di Aden (EAP); comprende il Sultanato Qu'aiti con il grande porto di Mukalla e l'entroterra del Wadi Hadramawt con i grattacieli di fango di Shibam ('la Manhattan del deserto') e la capitale Kathiri di Seiyun; pacificato nel 1937 dalla celebre 'Pace di Ingrams' (Ingrams' Peace) patrocinata dal consigliere britannico Harold Ingrams."
  },
  YEMR: {
    nameLatn: "Al Maharah",
    nameArabic: "المهرة",
    historicalName: "Sultanato Mahra di Qishn (Litorale Continentale di Al Ghaydah e Ras Fartak)",
    adminTitle: "British Aden Protectorate (EAP) — Mahra Sultanate of Qishn and Socotra",
    nameEngl: "Al Mahrah (Mahra Sultanate Mainland)",
    entityKind: 'ADEN_PROTECTORATE',
    sovereign: 'UK',
    region: 'PROTETTORATO_ORIENTALE',
    note: "Remoto lembo orientale del Protettorato di Aden confinante col Sultanato di Mascate e Oman a Ras Darbat Ali; retto dal Sultano della dinastia Banu Afrar con residenza continentale a Qishn e Al Ghaydah; popolazione di lingua semitica sudarabica (Mehri) dedita alla pesca e alla raccolta dell'incenso pregiato."
  },
  YESU: {
    nameLatn: "Socotra",
    nameArabic: "سقطرى",
    historicalName: "Arcipelago di Socotra (Sultanato Mahra di Qishn e Socotra / Tamrida - Hadibu)",
    adminTitle: "British Aden Protectorate (EAP) — Mahra Sultanate of Qishn and Socotra (Island Domain)",
    nameEngl: "Socotra Archipelago (British Protected Island)",
    entityKind: 'ADEN_PROTECTORATE',
    sovereign: 'UK',
    region: 'PROTETTORATO_INSULARE',
    note: "Arcipelago strategico nell'Oceano Indiano a guardia dell'imbocco del Golfo di Aden e delle rotte tra il Canale di Suez e l'India britannica; capoluogo Hadibu (Tamrida); residenza insulare dei sultani Mahra sotto protettorato britannico formale dal 1886; celebre per la sua flora endemica unica al mondo (Albero Sangue di Drago)."
  },

  // ==========================================
  // PORTO DEL RAJ / COLONIA DI ADEN (1)
  // ==========================================
  YEAD: {
    nameLatn: "Aden",
    nameArabic: "عدن",
    historicalName: "Aden (Porto Strategico di Tawahi, Cratere, Khormaksar e Little Aden)",
    adminTitle: "Porto del Raj (1936: Chief Commissioner's Province of British India) -> Colonia della Corona di Aden (1937-1941: Crown Colony of Aden)",
    nameEngl: "Aden (Port of Aden & Colony)",
    entityKind: 'ADEN_PORT',
    sovereign: 'DYNAMIC_RAJ_UK',
    region: 'PORTO_DI_ADEN',
    note: "Piazzaforte marittima imperiale della Gran Bretagna a guardia del Mar Rosso e della rotta per l'India. Conquistata nel 1839 dalla Compagnia delle Indie Orientali (Stafford Haines), fino al 31 marzo 1937 fu amministrata direttamente come Insediamento e Provincia dell'India Britannica sotto il Viceré di Nuova Delhi (Chief Commissioner's Province of British India, codice RAJ / British Raj). Il 1° aprile 1937, con il Government of India Act, fu elevata a Colonia della Corona autonoma (Crown Colony of Aden, codice UK) sotto il Colonial Office di Londra. Base di bunkeraggio navale tra le più trafficate del globo e sede del comando RAF Middle East ad Aden."
  }
};
