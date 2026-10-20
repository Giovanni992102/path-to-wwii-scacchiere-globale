/**
 * ARCHIVIO CARTOGRAFICO E GEOSTORICO COMPLETO DEI BALCANI (1936-1940)
 *
 * Audit e dossier provincia per provincia ad altissima risoluzione per:
 * 1. Regno d'Ungheria (Magyar Királyság - 20 Distretti NUTS-3 + Revisionismo Trianon)
 * 2. Regno di Romania (Regatul României - 42 Distretti NUTS-3 + Ținuturi 1938 & Cessioni 1940)
 * 3. Regno di Bulgaria (Tsarstvo Balgariya - 28 Distretti NUTS-3 + Trattato di Craiova)
 * 4. Regno di Grecia (Vasileion tis Ellados - 52 Distretti NUTS-3 + Regime Metaxas & Isole)
 * 5. Regno d'Albania (Mbretëria Shqiptare - 12 Prefetture NUTS-3 + Occupazione Italiana 1939)
 * 6. Regno di Jugoslavia (Kraljevina Jugoslavija - 71 Distretti: RS 25, HR 21, SI 12, BA 3, ME 1, MK 8, XK 1)
 *
 * Totale: 225 Distretti Geostorici NUTS-3 e Frontiere Strategiche Verificate al 100%.
 */

export interface BalkanDistrictDef {
  nuts: string;
  country: 'HU' | 'RO' | 'BG' | 'EL' | 'AL' | 'RS' | 'HR' | 'SI' | 'BA' | 'ME' | 'MK' | 'XK';
  defaultOwner: string; // 'HUN', 'ROM', 'BUL', 'GRE', 'ALB', 'YUG', 'ITA'
  name: string;
  capitalOrChefLieu: string;
  historicalRegion: string;
  keys: string[];
  preAdminTitle: string;
  preNote: string;
  postName?: string;
  postAdminTitle?: string;
  postNote?: string;
  postOwner?: string;
  transitionStep?: number;
}

export const BALKAN_DISTRICTS_CATALOG: BalkanDistrictDef[] = [
  {
    "nuts": "HU110",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Budapest (Székesfőváros)",
    "capitalOrChefLieu": "Budapest",
    "historicalRegion": "Közép-Magyarország",
    "keys": [
      "budapest",
      "szekesfovaros",
      "buda",
      "pest",
      "csepel",
      "kispest",
      "ujpest",
      "hu110"
    ],
    "preAdminTitle": "Magyar Királyság — Budapest Székesfőváros",
    "preNote": "Capitale del Regno d'Ungheria sotto la Reggenza dell'Ammiraglio Miklós Horthy. Residenza reale al Castello di Buda, Parlamento sul Danubio e colosso industriale e metallurgico dell'isola di Csepel (fabbriche d'armamenti Manfred Weiss) e officine Ganz."
  },
  {
    "nuts": "HU120",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Pest vármegye (Cegléd / Vác)",
    "capitalOrChefLieu": "Budapest / Cegléd",
    "historicalRegion": "Közép-Magyarország",
    "keys": [
      "pest",
      "cegled",
      "vac",
      "szentendre",
      "dunakeszi",
      "godollo",
      "nagykata",
      "hu120"
    ],
    "preAdminTitle": "Magyar Királyság — Pest-Pilis-Solt-Kiskun vármegye",
    "preNote": "Cintura agraria ed industriale attorno alla capitale; residenza estiva reale di Gödöllő, storiche diocesi e cantieri navali sul Danubio a Vác e centro artistico serbo-ortodosso di Szentendre."
  },
  {
    "nuts": "HU211",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Fejér vármegye (Székesfehérvár)",
    "capitalOrChefLieu": "Székesfehérvár",
    "historicalRegion": "Közép-Dunántúl",
    "keys": [
      "fejer",
      "szekesfehervar",
      "alba_regia",
      "mor",
      "bicske",
      "dunaujvaros",
      "hu211"
    ],
    "preAdminTitle": "Magyar Királyság — Fejér vármegye",
    "preNote": "Antica Alba Regia, storica città d'incoronazione e sepoltura dei sovrani magiari della dinastia degli Arpadi; snodo ferroviario cardinale tra Budapest e il lago Balaton e vigneti di Mór."
  },
  {
    "nuts": "HU212",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Komárom-Esztergom vármegye (Esztergom / Tatabánya)",
    "capitalOrChefLieu": "Esztergom",
    "historicalRegion": "Közép-Dunántúl",
    "keys": [
      "komarom_esztergom",
      "esztergom",
      "tatabanya",
      "dorog",
      "oroszany",
      "hu212"
    ],
    "preAdminTitle": "Magyar Királyság — Komárom és Esztergom k.e.e. vármegye",
    "preNote": "Sede primaziale della Chiesa cattolica d'Ungheria affacciata sull'ansa del Danubio; polo minerario carbonifero strategico di Tatabánya e Dorog per l'industria bellica nazionale."
  },
  {
    "nuts": "HU213",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Veszprém vármegye (Veszprém / Bakony)",
    "capitalOrChefLieu": "Veszprém",
    "historicalRegion": "Közép-Dunántúl",
    "keys": [
      "veszprem",
      "bakony",
      "papa",
      "ajka",
      "balatonfured",
      "varpalota",
      "fuzfo",
      "hu213"
    ],
    "preAdminTitle": "Magyar Királyság — Veszprém vármegye",
    "preNote": "\"Città delle Regine\" dominata dal castello sulla rupe; massiccio boscoso del Bakony con ricchi giacimenti di bauxite (alluminio per la Luftwaffe e l'aviazione ungherese) e industria bellico-chimica di Fűzfő."
  },
  {
    "nuts": "HU221",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Győr-Moson-Sopron vármegye (Győr / Sopron)",
    "capitalOrChefLieu": "Győr",
    "historicalRegion": "Nyugat-Dunántúl",
    "keys": [
      "gyor_moson_sopron",
      "gyor",
      "sopron",
      "mosonmagyarovar",
      "raab",
      "odenburg",
      "hu221"
    ],
    "preAdminTitle": "Magyar Királyság — Győr, Moson és Pozsony k.e.e. vármegye",
    "preNote": "Polo industriale meccanico e della trazione Rába (Magyar Waggon- és Gépgyár); Sopron \"Civitas Fidelissima\" (plebiscito del 1921 contro l'annessione austriaca) e confine di frontiera col Burgenland."
  },
  {
    "nuts": "HU222",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Vas vármegye (Szombathely)",
    "capitalOrChefLieu": "Szombathely",
    "historicalRegion": "Nyugat-Dunántúl",
    "keys": [
      "vas",
      "szombathely",
      "savaria",
      "kormend",
      "koszeg",
      "sarvar",
      "hu222"
    ],
    "preAdminTitle": "Magyar Királyság — Vas vármegye",
    "preNote": "Antica Savaria romana e sede vescovile dell'Ungheria occidentale; fortezza storica di Kőszeg che nel 1532 arrestò l'avanzata ottomana di Solimano verso Vienna."
  },
  {
    "nuts": "HU223",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Zala vármegye (Zalaegerszeg / Nagykanizsa)",
    "capitalOrChefLieu": "Zalaegerszeg",
    "historicalRegion": "Nyugat-Dunántúl",
    "keys": [
      "zala",
      "zalaegerszeg",
      "nagykanizsa",
      "keszthely",
      "lispe",
      "lovaszi",
      "hu223"
    ],
    "preAdminTitle": "Magyar Királyság — Zala vármegye",
    "preNote": "Sorgente energetica vitale: a Lispe e Lovászi la società MAORT scoprì i primi grandi giacimenti petroliferi d'Ungheria, cardine dei rifornimenti per le forze dell'Asse."
  },
  {
    "nuts": "HU231",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Baranya vármegye (Pécs / Mohács)",
    "capitalOrChefLieu": "Pécs",
    "historicalRegion": "Dél-Dunántúl",
    "keys": [
      "baranya",
      "pecs",
      "mohacs",
      "siklos",
      "szigetvar",
      "hu231"
    ],
    "preAdminTitle": "Magyar Királyság — Baranya vármegye",
    "preNote": "Bacino carbonifero delle colline Mecsek, manifattura di porcellane Zsolnay e università del 1367; pianura di Mohács celebre per la disfatta del 1526 contro gli Ottomani e porto danubiano."
  },
  {
    "nuts": "HU232",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Somogy vármegye (Kaposvár / Balaton déli part)",
    "capitalOrChefLieu": "Kaposvár",
    "historicalRegion": "Dél-Dunántúl",
    "keys": [
      "somogy",
      "kaposvar",
      "siofok",
      "marcali",
      "barcs",
      "hu232"
    ],
    "preAdminTitle": "Magyar Királyság — Somogy vármegye",
    "preNote": "Riva meridionale del lago Balaton (Siófok e Balatonföldvár), estese tenute agricole cerealicole e zuccheriere e confine meridionale sul fiume Drava con la Jugoslavia."
  },
  {
    "nuts": "HU233",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Tolna vármegye (Szekszárd)",
    "capitalOrChefLieu": "Szekszárd",
    "historicalRegion": "Dél-Dunántúl",
    "keys": [
      "tolna",
      "szekszard",
      "dombovar",
      "paks",
      "dunafoldvar",
      "hu233"
    ],
    "preAdminTitle": "Magyar Királyság — Tolna vármegye",
    "preNote": "Colline vitivinicole di Szekszárd celebri per il vino Kadarka; presenza di una consistente minoranza tedesca (Donauschwaben / Svevi del Danubio) nelle valli tra Danubio e colline di Tolna."
  },
  {
    "nuts": "HU311",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Borsod-Abaúj-Zemplén vármegye (Miskolc / Diósgyőr)",
    "capitalOrChefLieu": "Miskolc",
    "historicalRegion": "Észak-Magyarország",
    "keys": [
      "borsod_abauj_zemplen",
      "miskolc",
      "diosgyor",
      "ozd",
      "sarospatak",
      "satoraljaujhely",
      "tokaj",
      "hu311"
    ],
    "preAdminTitle": "Magyar Királyság — Borsod, Gömör és Kishont k.e.e. vármegye",
    "preNote": "Cuore pulsante della siderurgia pesante e dell'industria bellica ungherese: acciaierie e fucine reali di Diósgyőr e Ózd; regione vinicola di fama mondiale del Tokaji Aszú."
  },
  {
    "nuts": "HU312",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Heves vármegye (Eger)",
    "capitalOrChefLieu": "Eger",
    "historicalRegion": "Észak-Magyarország",
    "keys": [
      "heves",
      "eger",
      "gyongyos",
      "hatvan",
      "matra",
      "hu312"
    ],
    "preAdminTitle": "Magyar Királyság — Heves vármegye",
    "preNote": "Storica fortezza di Eger (simbolo dell'eroica difesa di István Dobó nel 1552 contro l'armata turca), vigneti del Sangue di Toro (Egri Bikavér) e vette del massiccio dei Mátra."
  },
  {
    "nuts": "HU313",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Nógrád vármegye (Salgótarján / Balassagyarmat)",
    "capitalOrChefLieu": "Balassagyarmat",
    "historicalRegion": "Észak-Magyarország",
    "keys": [
      "nograd",
      "salgotarjan",
      "balassagyarmat",
      "pasto",
      "szecseny",
      "hu313"
    ],
    "preAdminTitle": "Magyar Királyság — Nógrád és Hont k.e.e. vármegye",
    "preNote": "Bacino carbonifero e vetrario di Salgótarján; Balassagyarmat insignita del titolo di \"Civitas Fortissima\" per aver respinto manu militari nel gennaio 1919 le truppe cecoslovacche oltre l'Ipeľ."
  },
  {
    "nuts": "HU321",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Hajdú-Bihar vármegye (Debrecen)",
    "capitalOrChefLieu": "Debrecen",
    "historicalRegion": "Észak-Alföld",
    "keys": [
      "hajdu_bihar",
      "debrecen",
      "hajduszoboszlo",
      "hortobagy",
      "berettyoujfalu",
      "hu321"
    ],
    "preAdminTitle": "Magyar Királyság — Hajdú vármegye",
    "preNote": "Seconda metropoli d'Ungheria, la \"Roma calvinista\" e storica roccaforte protestante; comprende la celebre steppa della puszta di Hortobágy con allevamenti tradizionali e terme di Hajdúszoboszló."
  },
  {
    "nuts": "HU322",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Jász-Nagykun-Szolnok vármegye (Szolnok)",
    "capitalOrChefLieu": "Szolnok",
    "historicalRegion": "Észak-Alföld",
    "keys": [
      "jasz_nagykun_szolnok",
      "szolnok",
      "jaszbereny",
      "karcag",
      "kisujszallas",
      "hu322"
    ],
    "preAdminTitle": "Magyar Királyság — Jász-Nagykun-Szolnok vármegye",
    "preNote": "Snodo ferroviario vitale e ponte sul fiume Tibisco (Tisza); officine di riparazione locomotive MÁV, tradizioni storiche delle popolazioni autonome Iassiche (Jász) e Cumane (Nagykun)."
  },
  {
    "nuts": "HU323",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Szabolcs-Szatmár-Bereg vármegye (Nyíregyháza)",
    "capitalOrChefLieu": "Nyíregyháza",
    "historicalRegion": "Észak-Alföld",
    "keys": [
      "szabolcs_szatmar_bereg",
      "nyiregyhaza",
      "kisvarda",
      "mateszalka",
      "vasarosnameny",
      "hu323"
    ],
    "preAdminTitle": "Magyar Királyság — Szabolcs és Ung k.e.e. vármegye",
    "preNote": "Regione agricola e frutticola sabbiosa del Nyírség, snodo di transito per i collegamenti con la Rutenia subcarpatica (Kárpátalja) e la Polonia prebellica."
  },
  {
    "nuts": "HU331",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Bács-Kiskun vármegye (Kecskemét / Baja)",
    "capitalOrChefLieu": "Kecskemét",
    "historicalRegion": "Dél-Alföld",
    "keys": [
      "bacs_kiskun",
      "kecskemet",
      "baja",
      "kiskunfelegyhaza",
      "kalocsa",
      "kiskunhalas",
      "hu331"
    ],
    "preAdminTitle": "Magyar Királyság — Pest-Pilis-Solt-Kiskun (dél) és Bács-Bodrog vármegye",
    "preNote": "Vasto territorio della pianura tra Danubio e Tibisco; frutteti di albicocche (distillato Barackpálinka) di Kecskemét, sede arcivescovile cattolica e paprika di Kalocsa, porto fluviale di Baja."
  },
  {
    "nuts": "HU332",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Békés vármegye (Békéscsaba / Gyula)",
    "capitalOrChefLieu": "Gyula",
    "historicalRegion": "Dél-Alföld",
    "keys": [
      "bekes",
      "bekescsaba",
      "gyula",
      "oroshaza",
      "szarvas",
      "hu332"
    ],
    "preAdminTitle": "Magyar Királyság — Békés vármegye",
    "preNote": "Fortezza gotica in mattoni del XV secolo a Gyula sul fiume Fehér-Körös; granaio dell'Alföld orientale con rinomata industria molitoria, salumiera e centro della minoranza slovacca a Békéscsaba."
  },
  {
    "nuts": "HU333",
    "country": "HU",
    "defaultOwner": "HUN",
    "name": "Csongrád-Csanád vármegye (Szeged)",
    "capitalOrChefLieu": "Szeged",
    "historicalRegion": "Dél-Alföld",
    "keys": [
      "csongrad",
      "csongrad_csanad",
      "szeged",
      "hodmezovasarhely",
      "szentes",
      "mako",
      "hu333"
    ],
    "preAdminTitle": "Magyar Királyság — Csongrád vármegye",
    "preNote": "Capitale della Grande Pianura meridionale alla confluenza di Tibisco e Maros; università reale (vi operava Albert Szent-Györgyi, premio Nobel), culla del governo controrivoluzionario di Szeged nel 1919 e produzione di cipolle a Makó."
  },
  {
    "nuts": "RO321",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "București (Capitala Regatului)",
    "capitalOrChefLieu": "București",
    "historicalRegion": "Muntenia",
    "keys": [
      "bucuresti",
      "bucharest",
      "capitala_regatului",
      "palatul_regal",
      "ro321"
    ],
    "preAdminTitle": "Regatul României — Municipiul București (Capitala)",
    "preNote": "Il \"Piccolo Parigi\" dei Balcani, sede della corte reale di Re Carlo II fino al settembre 1940, poi del Generale Ion Antonescu e del giovane Re Michele I; piazzaforte politica, culturale e finanziaria della Grande Romania (România Mare)."
  },
  {
    "nuts": "RO322",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Ilfov (Snagov / Mogoșoaia)",
    "capitalOrChefLieu": "București",
    "historicalRegion": "Muntenia",
    "keys": [
      "ilfov",
      "snagov",
      "mogosoaia",
      "otopeni",
      "buftea",
      "ro322"
    ],
    "preAdminTitle": "Regatul României — Județul Ilfov (Ținutul Bucegi)",
    "preNote": "Cintura agricola, boschiva e lacustre attorno alla capitale; residenze patrizie e reali di Snagov e palazzo brâncovenesc di Mogoșoaia, snodo viario e ferroviario radiocentrico."
  },
  {
    "nuts": "RO316",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Prahova (Ploiești / Valea Prahovei)",
    "capitalOrChefLieu": "Ploiești",
    "historicalRegion": "Muntenia",
    "keys": [
      "prahova",
      "ploiesti",
      "sinaia",
      "campina",
      "valea_prahovei",
      "ro316"
    ],
    "preAdminTitle": "Regatul României — Județul Prahova (Ținutul Bucegi)",
    "preNote": "Il cuore energetico e strategico della Romania: il bacino petrolifero di Ploiești e Câmpina (raffinerie Astra Română, Steaua Română, Concordia) che forniva oltre il 30% del fabbisogno petrolifero bellico del Terzo Reich; residenza reale del Castello Peleș a Sinaia."
  },
  {
    "nuts": "RO311",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Argeș (Pitești / Curtea de Argeș)",
    "capitalOrChefLieu": "Pitești",
    "historicalRegion": "Muntenia",
    "keys": [
      "arges",
      "pitesti",
      "curtea_de_arges",
      "campulung",
      "ro311"
    ],
    "preAdminTitle": "Regatul României — Județul Argeș (Ținutul Argeș)",
    "preNote": "Antica culla della Valacchia e prima capitale a Câmpulung; cattedrale monumentale di Curtea de Argeș, necropoli dinastica della famiglia reale Hohenzollern-Sigmaringen di Romania."
  },
  {
    "nuts": "RO312",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Călărași (Bărăganul de Sud)",
    "capitalOrChefLieu": "Călărași",
    "historicalRegion": "Muntenia",
    "keys": [
      "calarasi",
      "oltenita",
      "baragan",
      "ro312"
    ],
    "preAdminTitle": "Regatul României — Județul Ialomița de Sud",
    "preNote": "Pianura cerealicola del Bărăgan meridionale affacciata sul Danubio; porto fluviale di Oltenița e traghetto per Silistra e la Dobrugia meridionale (Cadrilater)."
  },
  {
    "nuts": "RO313",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Dâmbovița (Târgoviște / Moreni)",
    "capitalOrChefLieu": "Târgoviște",
    "historicalRegion": "Muntenia",
    "keys": [
      "dambovita",
      "targoviste",
      "moreni",
      "gaesti",
      "ro313"
    ],
    "preAdminTitle": "Regatul României — Județul Dâmbovița (Ținutul Bucegi)",
    "preNote": "Antica capitale principesca valacca (Curtea Domnească con la Torre Chindia); ricchi pozzi petroliferi di Moreni e industria metalmeccanica pesante."
  },
  {
    "nuts": "RO314",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Giurgiu (Portul Dunărean)",
    "capitalOrChefLieu": "Giurgiu",
    "historicalRegion": "Muntenia",
    "keys": [
      "giurgiu",
      "vlasca",
      "danubio_giurgiu",
      "ro314"
    ],
    "preAdminTitle": "Regatul României — Județul Vlașca (Ținutul Bucegi)",
    "preNote": "Principale porto fluviale danubiano a sud di Bucarest collegato dalla prima linea ferroviaria del paese (1869); imbarco del petrolio di Ploiești e del grano valacco verso il Reich e l'Austria."
  },
  {
    "nuts": "RO315",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Ialomița (Slobozia / Bărăgan)",
    "capitalOrChefLieu": "Slobozia",
    "historicalRegion": "Muntenia",
    "keys": [
      "ialomita",
      "slobozia",
      "fetesti",
      "cernavoda_vest",
      "ro315"
    ],
    "preAdminTitle": "Regatul României — Județul Ialomița (Ținutul Mării)",
    "preNote": "Cuore della steppa del Bărăgan, immenso granaio dorato della Romania; snodo ferroviario di Fetești per il monumentale ponte Re Carlo I / Anghel Saligny sul Danubio verso Costanza."
  },
  {
    "nuts": "RO317",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Teleorman (Turnu Măgurele / Alexandria)",
    "capitalOrChefLieu": "Turnu Măgurele",
    "historicalRegion": "Muntenia",
    "keys": [
      "teleorman",
      "turnu_magurele",
      "alexandria",
      "rosiorii_de_vede",
      "zimnicea",
      "ro317"
    ],
    "preAdminTitle": "Regatul României — Județul Teleorman (Ținutul Argeș)",
    "preNote": "Pianura alluvionale meridionale tra i fiumi Olt, Teleorman e Danubio; porto fluviale di Turnu Măgurele dirimpetto alla piazzaforte bulgara di Nikopol."
  },
  {
    "nuts": "RO411",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Dolj (Craiova)",
    "capitalOrChefLieu": "Craiova",
    "historicalRegion": "Oltenia",
    "keys": [
      "dolj",
      "craiova",
      "bailesti",
      "calafat",
      "ro411"
    ],
    "preAdminTitle": "Regatul României — Județul Dolj (Ținutul Olt)",
    "preNote": "Capitale storica dell'Oltenia e residenza dei Grandi Bani di Craiova; teatro dei negoziati e della firma del Trattato di Craiova (7 settembre 1940) che sancì la cessione del Cadrilater alla Bulgaria."
  },
  {
    "nuts": "RO412",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Gorj (Târgu Jiu)",
    "capitalOrChefLieu": "Târgu Jiu",
    "historicalRegion": "Oltenia",
    "keys": [
      "gorj",
      "targu_jiu",
      "motru",
      "rovinari",
      "brancusi",
      "ro412"
    ],
    "preAdminTitle": "Regatul României — Județul Gorj (Ținutul Olt)",
    "preNote": "Valle del Jiu e bacino carbonifero di lignite; celebre per il complesso scultoreo monumentale di Constantin Brâncuși (Colonna dell'Infinito, Porta del Bacio, Tavolo del Silenzio) in onore dei caduti del 1916."
  },
  {
    "nuts": "RO413",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Mehedinți (Drobeta-Turnu Severin)",
    "capitalOrChefLieu": "Turnu Severin",
    "historicalRegion": "Oltenia",
    "keys": [
      "mehedinti",
      "turnu_severin",
      "drobeta",
      "portile_de_fier",
      "orsova",
      "ro413"
    ],
    "preAdminTitle": "Regatul României — Județul Mehedinți (Ținutul Olt)",
    "preNote": "Porte di Ferro (Porțile de Fier) dove il Danubio solca le gole tra Carpazi e Balcani; cantiere navale e castello medievale dei Cavalieri di San Giovanni sul confine con la Jugoslavia."
  },
  {
    "nuts": "RO414",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Olt (Slatina / Caracal)",
    "capitalOrChefLieu": "Slatina",
    "historicalRegion": "Oltenia",
    "keys": [
      "olt",
      "slatina",
      "caracal",
      "corabia",
      "ro414"
    ],
    "preAdminTitle": "Regatul României — Județul Olt (Ținutul Olt)",
    "preNote": "Fascia di pianura fertile lungo l'Olt e il Danubio con il porto granario di Corabia; nodo mercantile e manifatturiero dell'Oltenia orientale."
  },
  {
    "nuts": "RO415",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Vâlcea (Râmnicu Vâlcea)",
    "capitalOrChefLieu": "Râmnicu Vâlcea",
    "historicalRegion": "Oltenia",
    "keys": [
      "valcea",
      "ramnicu_valcea",
      "dragasani",
      "calimanesti",
      "cozia",
      "ro415"
    ],
    "preAdminTitle": "Regatul României — Județul Vâlcea (Ținutul Olt)",
    "preNote": "Gola dell'Olt ai piedi dei Monti Căpățânii; celebre monastero di Cozia fondato da Mircea il Vecchio nel 1388, stazioni termali di Călimănești-Căciulata e rinomati vigneti di Drăgășani."
  },
  {
    "nuts": "RO223",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Constanța (Portul Maritim)",
    "capitalOrChefLieu": "Constanța",
    "historicalRegion": "Dobrogea",
    "keys": [
      "constanta",
      "portul_constanta",
      "mamaia",
      "mangalia",
      "medgidia",
      "cernavoda",
      "ro223"
    ],
    "preAdminTitle": "Regatul României — Județul Constanța (Ținutul Mării)",
    "preNote": "Antica Tomis, principale porto marittimo della Romania sul Mar Nero, terminal dell'oleodotto da Ploiești, arsenale e base della Regia Marina Romena (flottiglia di cacciatorpediniere e sommergibile Delfinul)."
  },
  {
    "nuts": "RO225",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Tulcea (Delta Dunării)",
    "capitalOrChefLieu": "Tulcea",
    "historicalRegion": "Dobrogea",
    "keys": [
      "tulcea",
      "delta_dunarii",
      "sulina",
      "babadag",
      "sfantu_gheorghe",
      "ro225"
    ],
    "preAdminTitle": "Regatul României — Județul Tulcea (Ținutul Mării)",
    "preNote": "Capitale del Delta del Danubio; porto franco di Sulina sede della Commissione Europea del Danubio, riserva naturale di canneti e pesca dello storione per il caviale del Mar Nero."
  },
  {
    "nuts": "RO213",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Iași (Capitala Istorică a Moldovei)",
    "capitalOrChefLieu": "Iași",
    "historicalRegion": "Moldova",
    "keys": [
      "iasi",
      "jassy",
      "palatul_culturii",
      "copou",
      "pascani",
      "ro213"
    ],
    "preAdminTitle": "Regatul României — Județul Iași (Ținutul Prut)",
    "preNote": "Capitale storica del Principato di Moldavia e capitale di guerra della Romania (1916-1918); prestigiosa università Alexandru Ioan Cuza, Palazzo della Cultura e baluardo difensivo sul fiume Prut."
  },
  {
    "nuts": "RO211",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Bacău (Valea Siretului)",
    "capitalOrChefLieu": "Bacău",
    "historicalRegion": "Moldova",
    "keys": [
      "bacau",
      "onesti",
      "moinesti",
      "comanesti",
      "valea_trotusului",
      "ro211"
    ],
    "preAdminTitle": "Regatul României — Județul Bacău (Ținutul Trotuș)",
    "preNote": "Valle del Siret e del Trotuș; ricche concessioni petrolifere a Moinești (tra i primi pozzi industriali al mondo) e imponenti segherie e cartiere dei Carpazi orientali."
  },
  {
    "nuts": "RO212",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Botoșani (Nordul Moldovei)",
    "capitalOrChefLieu": "Botoșani",
    "historicalRegion": "Moldova",
    "keys": [
      "botosani",
      "dorohoi",
      "eminescu",
      "ro212"
    ],
    "preAdminTitle": "Regatul României — Județul Botoșani / Dorohoi (Ținutul Suceava)",
    "preNote": "Estremo nord moldavo tra Siret e Prut, centro mercantile ebraico e agrario; culla culturale dei sommi geni romeni: il poeta Mihai Eminescu (Ipotești) e il compositore George Enescu."
  },
  {
    "nuts": "RO214",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Neamț (Piatra Neamț)",
    "capitalOrChefLieu": "Piatra Neamț",
    "historicalRegion": "Moldova",
    "keys": [
      "neamt",
      "piatra_neamt",
      "targu_neamt",
      "cetatea_neamt",
      "ceahlau",
      "ro214"
    ],
    "preAdminTitle": "Regatul României — Județul Neamț (Ținutul Prut)",
    "preNote": "Imponente fortezza medievale di Neamț espugnata invano da Maometto II nel 1476; massiccio sacro del Ceahlău e celebri cenobi monastici di Agapia, Văratec e Neamț."
  },
  {
    "nuts": "RO215",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Suceava (Bucovina de Sud)",
    "capitalOrChefLieu": "Suceava",
    "historicalRegion": "Bucovina",
    "keys": [
      "suceava",
      "bucovina_de_sud",
      "radauti",
      "campulung_moldovenesc",
      "falticeni",
      "voronet",
      "ro215"
    ],
    "preAdminTitle": "Regatul României — Județul Suceava (Ținutul Suceava)",
    "preNote": "Porzione meridionale della Bucovina rimasta alla Romania dopo l'occupazione sovietica di Cernăuți nel giugno 1940; antica capitale moldava di Stefano il Grande e monasteri dipinti UNESCO di Voroneț e Humor."
  },
  {
    "nuts": "RO216",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Vaslui (Podișul Central)",
    "capitalOrChefLieu": "Vaslui",
    "historicalRegion": "Moldova",
    "keys": [
      "vaslui",
      "barlad",
      "husi",
      "podul_inalt",
      "ro216"
    ],
    "preAdminTitle": "Regatul României — Județul Vaslui / Tutova (Ținutul Prut)",
    "preNote": "Altopiano moldavo centrale; celebre campo di battaglia di Podul Înalt (1475) dove Stefano il Grande annientò l'armata ottomana di Hadım Suleiman Pascià; vigneti di Huși al confine col Prut."
  },
  {
    "nuts": "RO221",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Brăila (Portul Cerealier)",
    "capitalOrChefLieu": "Brăila",
    "historicalRegion": "Muntenia / Moldova",
    "keys": [
      "braila",
      "portul_braila",
      "danubio_marittimo",
      "insulamicabrailai",
      "ro221"
    ],
    "preAdminTitle": "Regatul României — Județul Brăila (Ținutul Dunării)",
    "preNote": "Grande porto commerciale per navi marittime sul Danubio; Borsa Cerealicola internazionale e imponenti silos granari progettati dall'ingegnere Anghel Saligny."
  },
  {
    "nuts": "RO222",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Buzău (Subcarpații de Curbură)",
    "capitalOrChefLieu": "Buzău",
    "historicalRegion": "Muntenia",
    "keys": [
      "buzau",
      "ramnicu_sarat",
      "vulcanistinsoriosi",
      "sarata_monteoru",
      "ro222"
    ],
    "preAdminTitle": "Regatul României — Județul Buzău (Ținutul Bucegi)",
    "preNote": "Snodo ferroviario strategico tra Muntenia e Moldavia; vulcani di fango di Berca, stazioni termali di Sărata-Monteoru e giacimenti di petrolio e ambra di Colți."
  },
  {
    "nuts": "RO224",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Galați (Arsenale Navale Danubian)",
    "capitalOrChefLieu": "Galați",
    "historicalRegion": "Moldova",
    "keys": [
      "galati",
      "arsenale_galati",
      "covurlui",
      "tecuci",
      "ro224"
    ],
    "preAdminTitle": "Regatul României — Județul Covurlui (Ținutul Dunării)",
    "preNote": "Polo cantieristico e porto franco alla confluenza di Siret, Prut e Danubio; cantiere navale militare e sede storica della Commissione Europea del Danubio istituita nel 1856."
  },
  {
    "nuts": "RO226",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Vrancea (Focșani / Poarta Focșanilor)",
    "capitalOrChefLieu": "Focșani",
    "historicalRegion": "Moldova",
    "keys": [
      "vrancea",
      "focsani",
      "marasti",
      "marasesti",
      "sloveanu",
      "ro226"
    ],
    "preAdminTitle": "Regatul României — Județul Putna (Ținutul Dunării)",
    "preNote": "La strategica \"Porta di Focșani\" tra Carpazi e Siret; mausoleo monumentale di Mărășești teatro della leggendaria resistenza dell'esercito romeno nel 1917 (\"Pe aici nu se trece!\")."
  },
  {
    "nuts": "RO424",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Timiș (Timișoara / Banat)",
    "capitalOrChefLieu": "Timișoara",
    "historicalRegion": "Banat",
    "keys": [
      "timis",
      "timisoara",
      "lugoj",
      "banat",
      "temeschburg",
      "temesvar",
      "ro424"
    ],
    "preAdminTitle": "Regatul României — Județul Timiș-Torontal (Ținutul Timiș)",
    "preNote": "Capoluogo cosmopolita del Banato romeno con secolare popolazione mista romena, tedesca (Svevi del Banato) e ungherese; polo industriale, politecnico e cattedrale ortodossa monumentale."
  },
  {
    "nuts": "RO422",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Caraș-Severin (Reșița / Oravița)",
    "capitalOrChefLieu": "Reșița / Oravița",
    "historicalRegion": "Banat",
    "keys": [
      "caras_severin",
      "resita",
      "oravita",
      "caransebes",
      "baile_herculane",
      "ro422"
    ],
    "preAdminTitle": "Regatul României — Județul Caraș / Severin (Ținutul Timiș)",
    "preNote": "Il gigante della siderurgia romena: gli stabilimenti UDR (Uzinele de Fier și Domeniile Reșița) con altiforni, fonderie, locomotive pesanti e produzione bellica; terme imperiali di Băile Herculane."
  },
  {
    "nuts": "RO421",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Arad (Crișana de Sud)",
    "capitalOrChefLieu": "Arad",
    "historicalRegion": "Crișana",
    "keys": [
      "arad",
      "valea_muresului",
      "lipova",
      "ineu",
      "ro421"
    ],
    "preAdminTitle": "Regatul României — Județul Arad (Ținutul Timiș)",
    "preNote": "Fortezza asburgica a stella di Vauban sul fiume Mureș; fabbrica di vagoni Astra Arad, vigneti di Miniș e pilastro meridionale della linea fortificata Linia Carol II."
  },
  {
    "nuts": "RO111",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Bihor (Oradea / Linia Carol II)",
    "capitalOrChefLieu": "Oradea",
    "historicalRegion": "Crișana",
    "keys": [
      "bihor",
      "oradea",
      "nagyvarad",
      "beius",
      "salonta",
      "ro111"
    ],
    "preAdminTitle": "Regatul României — Județul Bihor (Ținutul Crișuri)",
    "preNote": "Piazzaforte della Crișana e perno della linea difensiva fortificata Linia Carol II con casematte e fossati anticarro; ceduta all'Ungheria nel Secondo Arbitrato di Vienna del 30 agosto 1940 (Nagyvárad).",
    "postName": "Bihar vármegye (Nagyvárad)",
    "postAdminTitle": "Magyar Királyság — Bihar vármegye (Második bécsi döntés)",
    "postNote": "Riannessa al Regno d'Ungheria di Horthy in seguito all'arbitrato italo-tedesco di Vienna; ingresso trionfale dell'esercito magiaro il 6 settembre 1940.",
    "postOwner": "HUN",
    "transitionStep": 7
  },
  {
    "nuts": "RO112",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Bistrița-Năsăud (Năsăud)",
    "capitalOrChefLieu": "Bistrița",
    "historicalRegion": "Transilvania",
    "keys": [
      "bistrita_nasaud",
      "bistrita",
      "nasaud",
      "beszterce",
      "ro112"
    ],
    "preAdminTitle": "Regatul României — Județul Năsăud (Ținutul Someș)",
    "preNote": "Storico distretto militare dei reggimenti confinari romeni della Transilvania nord-orientale; ceduta all'Ungheria il 30 agosto 1940.",
    "postName": "Beszterce-Naszód vármegye (Beszterce)",
    "postAdminTitle": "Magyar Királyság — Beszterce-Naszód vármegye",
    "postNote": "Territorio montano dei Carpazi orientali annesso all'Ungheria nel Secondo Arbitrato di Vienna.",
    "postOwner": "HUN",
    "transitionStep": 7
  },
  {
    "nuts": "RO113",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Cluj (Cluj-Napoca / Inima Transilvaniei)",
    "capitalOrChefLieu": "Cluj",
    "historicalRegion": "Transilvania",
    "keys": [
      "cluj",
      "cluj_napoca",
      "kolozsvar",
      "turda",
      "dej",
      "ro113"
    ],
    "preAdminTitle": "Regatul României — Județul Cluj (Ținutul Someș)",
    "preNote": "Capitale storica e intellettuale della Transilvania, università Re Ferdinando I; ceduta all'Ungheria nel Secondo Arbitrato di Vienna il 30 agosto 1940.",
    "postName": "Kolozs vármegye (Kolozsvár)",
    "postAdminTitle": "Magyar Királyság — Kolozs vármegye (Észak-Erdély)",
    "postNote": "Sede del comando militare ungherese per la Transilvania settentrionale; ripristino dell'università magiara Ferenc József e celebrazioni con l'Ammiraglio Horthy.",
    "postOwner": "HUN",
    "transitionStep": 7
  },
  {
    "nuts": "RO114",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Maramureș (Sighetu Marmației / Baia Mare)",
    "capitalOrChefLieu": "Sighet / Baia Mare",
    "historicalRegion": "Maramureș",
    "keys": [
      "maramures",
      "sighet",
      "sighetu_marmatiei",
      "baia_mare",
      "maramarossziget",
      "ro114"
    ],
    "preAdminTitle": "Regatul României — Județul Maramureș / Satu Mare Est (Ținutul Someș)",
    "preNote": "Terre montane del Maramureș lungo il fiume Tisa al confine con la Rutenia subcarpatica; ricche miniere aurifere e argentifere di Baia Mare; ceduta all'Ungheria il 30 agosto 1940.",
    "postName": "Máramaros vármegye (Máramarossziget)",
    "postAdminTitle": "Magyar Királyság — Máramaros vármegye",
    "postNote": "Territorio annesso all'Ungheria nel Secondo Arbitrato di Vienna.",
    "postOwner": "HUN",
    "transitionStep": 7
  },
  {
    "nuts": "RO115",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Satu Mare (Capul de Pod Someșan)",
    "capitalOrChefLieu": "Satu Mare",
    "historicalRegion": "Crișana / Maramureș",
    "keys": [
      "satu_mare",
      "szatmar",
      "szatmarnemeti",
      "carei",
      "ro115"
    ],
    "preAdminTitle": "Regatul României — Județul Satu Mare (Ținutul Someș)",
    "preNote": "Settore nord della linea fortificata Linia Carol II a sbarramento della valle del Someș; ceduta all'Ungheria il 30 agosto 1940.",
    "postName": "Szatmár vármegye (Szatmárnémeti)",
    "postAdminTitle": "Magyar Királyság — Szatmár vármegye",
    "postNote": "Annessa all'Ungheria nel Secondo Arbitrato di Vienna; smantellamento delle fortificazioni romene.",
    "postOwner": "HUN",
    "transitionStep": 7
  },
  {
    "nuts": "RO116",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Sălaj (Zalău / Valea Crasnei)",
    "capitalOrChefLieu": "Zalău",
    "historicalRegion": "Crișana / Transilvania",
    "keys": [
      "salaj",
      "zalau",
      "szilagy",
      "simleu_silvaniei",
      "ro116"
    ],
    "preAdminTitle": "Regatul României — Județul Sălaj (Ținutul Someș)",
    "preNote": "Altopiano silvano e collinare tra la Crișana e la Transilvania; ceduto all'Ungheria il 30 agosto 1940.",
    "postName": "Szilágy vármegye (Zilah)",
    "postAdminTitle": "Magyar Királyság — Szilágy vármegye",
    "postNote": "Territorio annesso all'Ungheria nel Secondo Arbitrato di Vienna.",
    "postOwner": "HUN",
    "transitionStep": 7
  },
  {
    "nuts": "RO123",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Covasna (Sfântu Gheorghe / Ținutul Secuiesc)",
    "capitalOrChefLieu": "Sfântu Gheorghe",
    "historicalRegion": "Transilvania / Secuime",
    "keys": [
      "covasna",
      "sfantu_gheorghe",
      "sepsiszentgyorgy",
      "haromszek",
      "targu_secuiesc",
      "ro123"
    ],
    "preAdminTitle": "Regatul României — Județul Trei Scaune (Ținutul Mureș)",
    "preNote": "Cuore montano della Terra dei Siculi (Székelyföld) nei Carpazi di curvatura; ceduta all'Ungheria il 30 agosto 1940.",
    "postName": "Háromszék vármegye (Sepsiszentgyörgy)",
    "postAdminTitle": "Magyar Királyság — Háromszék vármegye (Székelyföld)",
    "postNote": "Riannessa all'Ungheria nel Secondo Arbitrato di Vienna col massimo giubilo della popolazione sicula di lingua ungherese.",
    "postOwner": "HUN",
    "transitionStep": 7
  },
  {
    "nuts": "RO124",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Harghita (Miercurea Ciuc / Odorheiu Secuiesc)",
    "capitalOrChefLieu": "Miercurea Ciuc",
    "historicalRegion": "Transilvania / Secuime",
    "keys": [
      "harghita",
      "miercurea_ciuc",
      "csikszereda",
      "odorheiu_secuiesc",
      "szekelyudvarhely",
      "gheorgheni",
      "ro124"
    ],
    "preAdminTitle": "Regatul României — Județul Ciuc / Odorhei (Ținutul Mureș)",
    "preNote": "Altopiano vulcanico dei Monti Harghita e conca di Ciuc a popolazione a schiacciante maggioranza sicula; ceduta all'Ungheria il 30 agosto 1940.",
    "postName": "Csík és Udvarhely vármegyék (Csíkszereda)",
    "postAdminTitle": "Magyar Királyság — Csík és Udvarhely vármegye (Székelyföld)",
    "postNote": "Annessa al Regno d'Ungheria nel Secondo Arbitrato di Vienna.",
    "postOwner": "HUN",
    "transitionStep": 7
  },
  {
    "nuts": "RO125",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Mureș (Târgu Mureș / Sighişoara)",
    "capitalOrChefLieu": "Târgu Mureș",
    "historicalRegion": "Transilvania / Secuime",
    "keys": [
      "mures",
      "targu_mures",
      "marosvasarhely",
      "sighisoara",
      "reghin",
      "ro125"
    ],
    "preAdminTitle": "Regatul României — Județul Mureș (Ținutul Mureș)",
    "preNote": "Capitale culturale e giudiziaria della Terra dei Siculi sul fiume Mureș; ceduta all'Ungheria il 30 agosto 1940 (la porzione sud con Sighișoara rimase alla Romania).",
    "postName": "Maros-Torda vármegye (Marosvásárhely)",
    "postAdminTitle": "Magyar Királyság — Maros-Torda vármegye",
    "postNote": "Capoluogo amministrativo della Székelyföld sotto sovranità ungherese dal settembre 1940.",
    "postOwner": "HUN",
    "transitionStep": 7
  },
  {
    "nuts": "RO121",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Alba (Alba Iulia / Marea Unire)",
    "capitalOrChefLieu": "Alba Iulia",
    "historicalRegion": "Transilvania",
    "keys": [
      "alba",
      "alba_iulia",
      "aiud",
      "sebes",
      "blaj",
      "marea_unire",
      "ro121"
    ],
    "preAdminTitle": "Regatul României — Județul Alba (Ținutul Mureș)",
    "preNote": "Città simbolo della Grande Unione della Romania (proclamata il 1° dicembre 1918) con la Cattedrale dell'Incoronazione di Re Ferdinando I e Maria; fortezza bastionata Alba Carolina, rimasta alla Romania dopo l'Arbitrato di Vienna."
  },
  {
    "nuts": "RO122",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Brașov (Kronstadt / IAR Brașov)",
    "capitalOrChefLieu": "Brașov",
    "historicalRegion": "Transilvania",
    "keys": [
      "brasov",
      "kronstadt",
      "iar_brasov",
      "fagaras",
      "bran",
      "ro122"
    ],
    "preAdminTitle": "Regatul României — Județul Brașov / Făgăraș (Ținutul Mureș)",
    "preNote": "Polo industriale aeronautico vitale: le officine di Stato IAR Brașov producevano i celebri caccia monoplani IAR 80 e motori d'aviazione; Chiesa Nera gotica e Castello di Bran, rimasta romena."
  },
  {
    "nuts": "RO126",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Sibiu (Hermannstadt / Capitala Sașilor)",
    "capitalOrChefLieu": "Sibiu",
    "historicalRegion": "Transilvania",
    "keys": [
      "sibiu",
      "hermannstadt",
      "medias",
      "valea_hartibaciului",
      "ro126"
    ],
    "preAdminTitle": "Regatul României — Județul Sibiu (Ținutul Mureș)",
    "preNote": "Capitale storica dei Sassoni di Transilvania (Siebenbürgen), sede del Museo Nazionale Brukenthal e centro bancario e manifatturiero; rimasta integralmente al Regno di Romania nel 1940."
  },
  {
    "nuts": "RO423",
    "country": "RO",
    "defaultOwner": "ROM",
    "name": "Județul Hunedoara (Castelul Corvinilor / Valea Jiului)",
    "capitalOrChefLieu": "Deva",
    "historicalRegion": "Transilvania",
    "keys": [
      "hunedoara",
      "deva",
      "petrosani",
      "castelul_corvinilor",
      "valea_jiului",
      "ro423"
    ],
    "preAdminTitle": "Regatul României — Județul Hunedoara (Ținutul Timiș)",
    "preNote": "Castello gotico dei Corvino a Hunedoara, fortezza di Deva sulla collina vulcanica e bacino carbonifero strategico di antracite della Valle del Jiu (Petroșani, Lupeni)."
  },
  {
    "nuts": "BG411",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Sofia (Stolitsa na Tsarstvo Balgariya)",
    "capitalOrChefLieu": "Sofiya",
    "historicalRegion": "Zapadna Balgariya",
    "keys": [
      "sofia",
      "sofia_stolitsa",
      "sofiya",
      "stolitsa",
      "bg411"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Stolitsa Sofiya",
    "preNote": "Capitale del Regno di Bulgaria, sede della corte di Zar Boris III, dell'Assemblea Nazionale (Săbranie) e della cattedrale patriarcale Aleksandr Nevskij; fulcro della politica di revisionismo pacifico e di neutralità armata."
  },
  {
    "nuts": "BG412",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Sofiyska oblast (Samokov / Rila)",
    "capitalOrChefLieu": "Sofiya",
    "historicalRegion": "Zapadna Balgariya",
    "keys": [
      "sofiyska_oblast",
      "samokov",
      "svoge",
      "botevgrad",
      "rila",
      "bg412"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Sofiyska oblast",
    "preNote": "Territorio montano circostante la capitale; massiccio del Rila con lo storico Monastero di Rila, centro spirituale della nazione bulgara, e valichi dei Balcani occidentali."
  },
  {
    "nuts": "BG414",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Pernik (Gradat na chernoto zlato)",
    "capitalOrChefLieu": "Pernik",
    "historicalRegion": "Zapadna Balgariya",
    "keys": [
      "pernik",
      "radomir",
      "minipernik",
      "bg414"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Pernishka koliya",
    "preNote": "La \"Città dell'Oro Nero\", bacino carbonifero primario della Bulgaria con le Miniere Statali di Pernik, fornitrici insostituibili per le ferrovie BDŽ, l'industria e il riscaldamento nazionale."
  },
  {
    "nuts": "BG415",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Kyustendil (Dolinata na Struma)",
    "capitalOrChefLieu": "Kyustendil",
    "historicalRegion": "Zapadna Balgariya",
    "keys": [
      "kyustendil",
      "struma",
      "dupnitsa",
      "bg415"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Kyustendilska oblast",
    "preNote": "Valle della Struma, rinomata per i frutteti e le fonti termali; settore fortificato di frontiera a ridosso del confine jugoslavo e delle valli macedoni."
  },
  {
    "nuts": "BG413",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Blagoevgrad (Pirinska Makedoniya / Gorna Dzhumaya)",
    "capitalOrChefLieu": "Gorna Dzhumaya",
    "historicalRegion": "Makedoniya",
    "keys": [
      "blagoevgrad",
      "gorna_dzhumaya",
      "pirin",
      "bansko",
      "sandanski",
      "petrich",
      "bg413"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Pirinski krai (Gorna Dzhumaya)",
    "preNote": "Macedonia Pirinica bulgara (all'epoca Gorna Dzhumaya); roccaforte montana dell'Organizzazione Rivoluzionaria Interna Macedone (VMRO/IMRO) di Ivan Mihailov, teatro di continue incursioni oltrefrontiera."
  },
  {
    "nuts": "BG311",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Vidin (Dunavska krepost Baba Vida)",
    "capitalOrChefLieu": "Vidin",
    "historicalRegion": "Severozapadna Balgariya",
    "keys": [
      "vidin",
      "baba_vida",
      "belogradchik",
      "kula",
      "bg311"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Vidinska oblast",
    "preNote": "Storica fortezza fluviale medievale di Baba Vida sul Danubio, cantiere navale e porto di frontiera al triplice confine tra Bulgaria, Romania e Jugoslavia; rocce monumentali di Belogradchik."
  },
  {
    "nuts": "BG312",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Montana (Ferdinand)",
    "capitalOrChefLieu": "Ferdinand",
    "historicalRegion": "Severozapadna Balgariya",
    "keys": [
      "montana",
      "ferdinand",
      "berkovitsa",
      "lom_juvest",
      "bg312"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Vrachanska oblast (Okolia Ferdinand)",
    "preNote": "Battezzata Ferdinand in onore di Re Ferdinando I di Bulgaria; snodo viario pedemontano tra la pianura danubiana e il passo di Petrohan verso Sofia."
  },
  {
    "nuts": "BG313",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Vratsa (Vrachanski Balkan)",
    "capitalOrChefLieu": "Vratsa",
    "historicalRegion": "Severozapadna Balgariya",
    "keys": [
      "vratsa",
      "mezdra",
      "vrachanski_balkan",
      "bg313"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Vrachanska oblast",
    "preNote": "Gola rocciosa di Vratsata nei Balcani occidentali; manifattura tessile e conciaria, teatro della morte eroica del poeta e rivoluzionario Hristo Botev sul monte Okolchitsa (1876)."
  },
  {
    "nuts": "BG314",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Pleven (Plevenska epopeya)",
    "capitalOrChefLieu": "Pleven",
    "historicalRegion": "Severna Balgariya",
    "keys": [
      "pleven",
      "levski",
      "nikopol",
      "cherven_bryag",
      "bg314"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Plevenska oblast",
    "preNote": "Celebre teatro dello storico assedio di Plevna del 1877 contro Osman Pascià; granaio della fertile pianura danubiana, viticoltura e porto fluviale di Nikopol."
  },
  {
    "nuts": "BG315",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Lovech (Pokritiyat most)",
    "capitalOrChefLieu": "Lovech",
    "historicalRegion": "Severna Balgariya",
    "keys": [
      "lovech",
      "troyan",
      "teteven",
      "lukovit",
      "bg315"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Plevenska oblast (Okolia Lovech)",
    "preNote": "Valle del fiume Osam col celebre ponte coperto in legno di Kolyo Ficheto; fortezza medievale di Hisarya e passo montano di Troyan attraverso la catena della Stara Planina."
  },
  {
    "nuts": "BG321",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Veliko Tarnovo (Tsarograd Tarnov)",
    "capitalOrChefLieu": "Veliko Tărnovo",
    "historicalRegion": "Severna Balgariya",
    "keys": [
      "veliko_tarnovo",
      "tarnovo",
      "tsarevets",
      "gorna_oryahovitsa",
      "bg321"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Tarnovska oblast",
    "preNote": "Capitale medievale del Secondo Impero Bulgaro col colle fortificato di Tsarevets; culla della Costituzione di Tărnovo e snodo ferroviario di Gorna Oryahovitsa."
  },
  {
    "nuts": "BG322",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Gabrovo (Balgarskiyat Manchester / Shipka)",
    "capitalOrChefLieu": "Gabrovo",
    "historicalRegion": "Severna Balgariya",
    "keys": [
      "gabrovo",
      "shipka",
      "sevlievo",
      "dryanovo",
      "bg322"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Tarnovska oblast (Okolia Gabrovo)",
    "preNote": "La \"Manchester bulgara\" per la densità di filande e manifatture tessili e meccaniche; sovrastata dal celebre Passo di Shipka con il monumento ai caduti della guerra del 1877-1878."
  },
  {
    "nuts": "BG323",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Ruse (Malkata Viena / Portul Dunărean)",
    "capitalOrChefLieu": "Ruse",
    "historicalRegion": "Severna Balgariya",
    "keys": [
      "ruse",
      "rustciuk",
      "malkata_viena",
      "dunav_ruse",
      "byala",
      "bg323"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Rusenska oblast",
    "preNote": "La \"Piccola Vienna\" per l'architettura neoclassica e barocca; principale porto fluviale danubiano della Bulgaria, testa di ponte dei traffici con la Romania e cantiere navale."
  },
  {
    "nuts": "BG324",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Razgrad (Ludogorie)",
    "capitalOrChefLieu": "Razgrad",
    "historicalRegion": "Severoiztochna Balgariya",
    "keys": [
      "razgrad",
      "isperih",
      "kubrat",
      "ludogorie",
      "bg324"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Shumenska oblast (Okolia Razgrad)",
    "preNote": "Altopiano selvoso e cerealicolo del Ludogorie (Deliorman); antica città romana di Abritus e centro agricolo con significativa presenza turco-bulgara."
  },
  {
    "nuts": "BG325",
    "country": "BG",
    "defaultOwner": "ROM",
    "name": "Silistra (Durostor / Cadrilater)",
    "capitalOrChefLieu": "Silistra",
    "historicalRegion": "Dobrogea de Sud",
    "keys": [
      "silistra",
      "durostor",
      "cadrilater",
      "dârstor",
      "bg325"
    ],
    "preAdminTitle": "Regatul României — Județul Durostor (Ținutul Mării)",
    "preNote": "Porto fluviale e antica piazzaforte di Durostorum sul Danubio; annessa alla Romania nel 1913 dopo la Seconda Guerra Balcanica come capoluogo del Județul Durostor.",
    "postName": "Silistra (Tsarstvo Balgariya — Yuzhna Dobrudzha)",
    "postAdminTitle": "Tsarstvo Balgariya — Okoliya Silistra (Spogodba ot Krayova)",
    "postNote": "Riannessa trionfalmente alla Bulgaria il 7 settembre 1940 col Trattato di Craiova sotto pressione italo-tedesca; scambio concordato di popolazioni tra bulgari e romeni.",
    "postOwner": "BUL",
    "transitionStep": 7
  },
  {
    "nuts": "BG332",
    "country": "BG",
    "defaultOwner": "ROM",
    "name": "Dobrich (Bazargic / Caliacra / Cadrilater)",
    "capitalOrChefLieu": "Dobrich / Bazargic",
    "historicalRegion": "Dobrogea de Sud",
    "keys": [
      "dobrich",
      "bazargic",
      "caliacra",
      "balcic",
      "kavarna",
      "bg332"
    ],
    "preAdminTitle": "Regatul României — Județul Caliacra (Ținutul Mării)",
    "preNote": "Cuore agricolo della Dobrugia meridionale e residenza estiva della Regina Maria di Romania nel castello e giardini esotici di Balcic sulle scogliere del Mar Nero.",
    "postName": "Dobrich (Tsarstvo Balgariya — Yuzhna Dobrudzha)",
    "postAdminTitle": "Tsarstvo Balgariya — Okoliya Dobrich (Spogodba ot Krayova)",
    "postNote": "Riconquistata pacificamente dalla Bulgaria col Trattato di Craiova (settembre 1940), acclamata come grande vittoria diplomatica nazionale senza spargimento di sangue.",
    "postOwner": "BUL",
    "transitionStep": 7
  },
  {
    "nuts": "BG331",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Varna (Morska stolitsa na Balgariya)",
    "capitalOrChefLieu": "Varna",
    "historicalRegion": "Severoiztochna Balgariya",
    "keys": [
      "varna",
      "morska_stolitsa",
      "evksinograd",
      "port_varna",
      "bg331"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Varnenska oblast",
    "preNote": "La \"Capitale Marittima\" della Bulgaria, principale base navale della Flotta Reale sul Mar Nero, arsenale e cantiere navale; palazzo reale estivo di Evksinograd."
  },
  {
    "nuts": "BG333",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Shumen (Shumenska krepost)",
    "capitalOrChefLieu": "Shumen",
    "historicalRegion": "Severoiztochna Balgariya",
    "keys": [
      "shumen",
      "kolarovgrad",
      "madara",
      "novi_pazar_bg",
      "bg333"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Shumenska oblast",
    "preNote": "Roccia monumentale del Cavaliere di Madara (simbolo nazionale bulgaro), colossale fortezza di Shumen e guarnigione divisionale strategica della Bulgaria nord-orientale."
  },
  {
    "nuts": "BG334",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Targovishte (Eski Dzhumaya)",
    "capitalOrChefLieu": "Targovishte",
    "historicalRegion": "Severoiztochna Balgariya",
    "keys": [
      "targovishte",
      "eski_dzhumaya",
      "popovo",
      "omurtag",
      "bg334"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Shumenska oblast (Okolia Targovishte)",
    "preNote": "Città di fiere e mercati agrari pedemontani tra il Danubio e i passi della Stara Planina; centro di produzione vinicola e di allevamento equino."
  },
  {
    "nuts": "BG341",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Burgas (Morski zaliv i rafinerii)",
    "capitalOrChefLieu": "Burgas",
    "historicalRegion": "Yugoiztochna Balgariya",
    "keys": [
      "burgas",
      "nesebar",
      "sozopol",
      "pomorie",
      "strandzha",
      "bg341"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Burgaska oblast",
    "preNote": "Grande porto marittimo nel golfo di Burgas, saline di Pomorie, borghi storici di Nessebar e Sozopol e massiccio montuoso della Strandzha al confine con la Turchia trace."
  },
  {
    "nuts": "BG342",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Sliven (Gradat na 100-te voyvodi)",
    "capitalOrChefLieu": "Sliven",
    "historicalRegion": "Yugoiztochna Balgariya",
    "keys": [
      "sliven",
      "kotel",
      "nova_zagora",
      "voyvodi",
      "bg342"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Burgaska oblast (Okolia Sliven)",
    "preNote": "\"Città dei Cento Voivodi\", prima manifattura tessile moderna dei Balcani fondata da Dobri Zhelyazkov nel 1834 per le divise dell'esercito; roccaforte montuosa dei Monti Sinite Kamani."
  },
  {
    "nuts": "BG343",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Yambol (Dolinata na Tundzha)",
    "capitalOrChefLieu": "Yambol",
    "historicalRegion": "Yugoiztochna Balgariya",
    "keys": [
      "yambol",
      "elhovo",
      "straldzha",
      "tundzha",
      "bg343"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Burgaska oblast (Okolia Yambol)",
    "preNote": "Bassa pianura della Tundzha; base dell'aviazione militare bulgara (aeroporto di Bezmer) e scalo di dirigibili Zeppelin durante la Prima Guerra Mondiale."
  },
  {
    "nuts": "BG344",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Stara Zagora (Trakijska nizinata)",
    "capitalOrChefLieu": "Stara Zagora",
    "historicalRegion": "Yuzhna Balgariya",
    "keys": [
      "stara_zagora",
      "kazanlak",
      "chirpan",
      "radnevo",
      "bg344"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Starozagorska oblast",
    "preNote": "Incrocio ferroviario e stradale maestro della Tracia settentrionale; comprende Kazanlak e la Valle delle Rose (Dolinata na rozite), produttrice dell'essenza di rosa più pregiata d'Europa."
  },
  {
    "nuts": "BG421",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Plovdiv (Filipopol / Sartseto na Trakiya)",
    "capitalOrChefLieu": "Plovdiv",
    "historicalRegion": "Trakiya",
    "keys": [
      "plovdiv",
      "filipopol",
      "asenovgrad",
      "karlovo",
      "sopot",
      "bg421"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Plovdivska oblast",
    "preNote": "Seconda città del regno e metropoli culturale della Tracia sui sette colli della Maritsa; Fiera Internazionale di Plovdiv, fortezza di Asen e arsenale aeronautico di Karlovo."
  },
  {
    "nuts": "BG422",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Haskovo (Tyutyuneviyat tsentar)",
    "capitalOrChefLieu": "Haskovo",
    "historicalRegion": "Trakiya",
    "keys": [
      "haskovo",
      "dimitrovgrad",
      "harmanli",
      "svilengrad",
      "bg422"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Haskovska oblast",
    "preNote": "Capitale bulgara del tabacco orientale da esportazione con estesi magazzini e fabbriche di lavorazione; snodo di frontiera di Svilengrad verso Istanbul e la Tracia turca."
  },
  {
    "nuts": "BG423",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Pazardzhik (Gorna Trakiya)",
    "capitalOrChefLieu": "Pazardzhik",
    "historicalRegion": "Trakiya",
    "keys": [
      "pazardzhik",
      "panagyurishte",
      "peshtera",
      "velingrad",
      "bg423"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Plovdivska oblast (Okolia Pazardzhik)",
    "preNote": "Alta pianura della Tracia bagnata dal fiume Maritsa; culla dell'Insurrezione d'Aprile del 1876 a Panagyurishte e terme alpine di Velingrad."
  },
  {
    "nuts": "BG424",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Smolyan (Rodopskite visini)",
    "capitalOrChefLieu": "Smolyan",
    "historicalRegion": "Rodopi",
    "keys": [
      "smolyan",
      "chepelare",
      "devingrad",
      "rodopi",
      "pamporovo",
      "bg424"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Plovdivska oblast (Rodopski djal)",
    "preNote": "Cuore dei Monti Rodopi centrali a quote elevate; fitte pinete, minoranza pomacca (bulgari musulmani) e valichi impervi verso la Tracia egea e il confine greco."
  },
  {
    "nuts": "BG425",
    "country": "BG",
    "defaultOwner": "BUL",
    "name": "Kardzhali (Iztochni Rodopi)",
    "capitalOrChefLieu": "Kardzhali",
    "historicalRegion": "Rodopi",
    "keys": [
      "kardzhali",
      "momchilgrad",
      "krumovgrad",
      "arba",
      "bg425"
    ],
    "preAdminTitle": "Tsarstvo Balgariya — Haskovska oblast (Okolia Kardzhali)",
    "preNote": "Bacino minerario dei Rodopi orientali lungo il fiume Arda, ricco di miniere di piombo, zinco e cromo; popolazione prevalentemente turcofona fedele alla corona bulgara."
  },
  {
    "nuts": "EL301",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Voreios Tomeas Athinon (Atene Settentrionale / Kifisia)",
    "capitalOrChefLieu": "Kifisia",
    "historicalRegion": "Attica",
    "keys": [
      "voreios_tomeas_athinon",
      "kifisia",
      "marousi",
      "chalandri",
      "pendeli",
      "el301"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Perifereia Protevousis (Voreia Proastia)",
    "preNote": "Quartieri residenziali settentrionali di Atene e pendici del Monte Pentelico (cave di marmo pentelico); residenze estive dell'aristocrazia ateniese e della corte reale."
  },
  {
    "nuts": "EL302",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Dytikos Tomeas Athinon (Atene Occidentale / Peristeri)",
    "capitalOrChefLieu": "Peristeri",
    "historicalRegion": "Attica",
    "keys": [
      "dytikos_tomeas_athinon",
      "peristeri",
      "aigaleo",
      "ilion",
      "petroupoli",
      "el302"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Perifereia Protevousis (Dytika Proastia)",
    "preNote": "Quartieri popolari e industriali nati dall'insediamento dei profughi greci dell'Asia Minore dopo la Catastrofe di Smirne del 1922; manifatture tessili e officine meccaniche."
  },
  {
    "nuts": "EL303",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Kentrikos Tomeas Athinon (Atene Centro / Acropoli)",
    "capitalOrChefLieu": "Athina",
    "historicalRegion": "Attica",
    "keys": [
      "kentrikos_tomeas_athinon",
      "athina",
      "atene",
      "acropoli",
      "syntagma",
      "kolonaki",
      "el303"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Dimos Athinaion (Protevousa)",
    "preNote": "Capitale del Regno di Grecia, culla della civiltà classica dominata dall'Acropoli e dal Partenone; sede del Palazzo Reale a Piazza Syntagma, del parlamento e della dittatura del Regime del 4 Agosto del Generale Ioannis Metaxas sotto Re Giorgio II."
  },
  {
    "nuts": "EL304",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Notios Tomeas Athinon (Atene Meridionale / Kallithea)",
    "capitalOrChefLieu": "Kallithea",
    "historicalRegion": "Attica",
    "keys": [
      "notios_tomeas_athinon",
      "kallithea",
      "glyfada",
      "palaio_faliro",
      "nea_smyrni",
      "el304"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Perifereia Protevousis (Notia Proastia)",
    "preNote": "Fascia litoranea del Golfo Saronico; insediamento dei rifugiati di Nea Smyrni, idroscalo civile e militare di Faliro e stazioni balneari di Glyfada."
  },
  {
    "nuts": "EL305",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Anatoliki Attiki (Maratona / Laurion)",
    "capitalOrChefLieu": "Pallini / Koropi",
    "historicalRegion": "Attica",
    "keys": [
      "anatoliki_attiki",
      "marathon",
      "maratona",
      "lavrio",
      "laurion",
      "rafina",
      "mesogeia",
      "el305"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Attikis (Anatoliki Attiki)",
    "preNote": "Piana fertile dei Mesogeia (vigneti di Retsina), storica piana di Maratona (diga di Maratona inaugurata nel 1929 per l'approvvigionamento idrico di Atene) e miniere di piombo e zinco di Laurion."
  },
  {
    "nuts": "EL306",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Dytiki Attiki (Eleusi / Megara)",
    "capitalOrChefLieu": "Elefsina",
    "historicalRegion": "Attica",
    "keys": [
      "dytiki_attiki",
      "elefsina",
      "eleusi",
      "megara",
      "aspropyrgos",
      "mandra",
      "el306"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Attikis (Dytiki Attiki)",
    "preNote": "Sede degli antichi Misteri Eleusini, golfo industriale e raffinerie; cantieri navali e aeroporto militare di Eleusi, snodo verso l'istmo di Megara e il Peloponneso."
  },
  {
    "nuts": "EL307",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Peiraias, Nisoi (Il Pireo & Base Navale di Salamina)",
    "capitalOrChefLieu": "Peiraias",
    "historicalRegion": "Attica / Saronico",
    "keys": [
      "peiraias",
      "pireo",
      "salamina",
      "salamis",
      "aigina",
      "hydra",
      "spetses",
      "poros",
      "el307"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Peiraios kai Nison",
    "preNote": "Principale porto mercantile ellenico e porta marittima di Atene; include l'isola di Salamina con l'Arsenale e la Base Navale Primaria della Regia Marina Ellenica (incrociatore corazzato Georgios Averof), oltre alle isole patrizie di Idra e Spetses."
  },
  {
    "nuts": "EL411",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Lesvos, Limnos (Mitilene e Lemno)",
    "capitalOrChefLieu": "Mytilini",
    "historicalRegion": "Voreio Aigaio",
    "keys": [
      "lesvos",
      "limnos",
      "mytilini",
      "mudros",
      "plomari",
      "el411"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Lesvou",
    "preNote": "Mitilene celebre per gli uliveti e l'ouzo; l'isola di Lemno con la rada naturale di Mudros controlla l'accesso strategico ai Dardanelli e al Mar di Marmara."
  },
  {
    "nuts": "EL412",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Ikaria, Samos (Samo e Icaria)",
    "capitalOrChefLieu": "Vathy / Samos",
    "historicalRegion": "Voreio Aigaio",
    "keys": [
      "samos",
      "ikaria",
      "vathy",
      "pythagorio",
      "el412"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Samou",
    "preNote": "Isole dell'Egeo orientale a poche miglia dalla costa anatolica; patria di Pitagora, rinomata per il vino moscato di Samo e le tradizioni marittime di Icaria."
  },
  {
    "nuts": "EL413",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Chios (Chio / Isola del Mastice)",
    "capitalOrChefLieu": "Chios",
    "historicalRegion": "Voreio Aigaio",
    "keys": [
      "chios",
      "chio",
      "mastiha",
      "vrontados",
      "kardamyla",
      "el413"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Chiou",
    "preNote": "Famosa nel mondo per i villaggi medievali del mastice (Mastihohoria: Pyrgi, Mesta); patria di grandi dinastie armatoriali della marina mercantile greca."
  },
  {
    "nuts": "EL421",
    "country": "EL",
    "defaultOwner": "ITA",
    "name": "Rodi e Dodecaneso (Isole Italiane dell'Egeo)",
    "capitalOrChefLieu": "Rodi",
    "historicalRegion": "Dodecaneso",
    "keys": [
      "dodecanese",
      "dodecaneso",
      "rodi",
      "rhodes",
      "kos",
      "leros",
      "kalymnos",
      "karpathos",
      "kasos",
      "castelrosso",
      "el421"
    ],
    "preAdminTitle": "Regno d'Italia — Possedimento delle Isole Italiane dell'Egeo",
    "preNote": "Possedimento sovrano del Regno d'Italia dal 1912 (Trattato di Losanna 1923), governato dal Quadrumviro Cesare Maria De Vecchi. Rodi capitale fortificata; l'isola di Lero (Portolago) trasformata in un'impenetrabile base aeronavale sotterranea (\"la Malta dell'Egeo\") per sommergibili e MAS."
  },
  {
    "nuts": "EL422",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Kyklades (Cicladi / Syros, Naxos, Tinos, Santorino)",
    "capitalOrChefLieu": "Ermoupoli",
    "historicalRegion": "Notio Aigaio",
    "keys": [
      "kyklades",
      "cicladi",
      "syros",
      "ermoupoli",
      "tinos",
      "naxos",
      "paros",
      "mykonos",
      "santorini",
      "thira",
      "milos",
      "andros",
      "el422"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Kykladon",
    "preNote": "Arcipelago circolare attorno a Delo con capoluogo a Ermoupoli (Syros); l'isola sacra di Tinos fu teatro il 15 agosto 1940 dell'affondamento a tradimento dell'incrociatore greco Elli ad opera del sommergibile italiano Delfino."
  },
  {
    "nuts": "EL431",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Irakleio (Candia / Cnosso)",
    "capitalOrChefLieu": "Irakleio",
    "historicalRegion": "Kriti",
    "keys": [
      "irakleio",
      "heraklion",
      "candia",
      "knossos",
      "cnosso",
      "mesara",
      "el431"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Irakleiou",
    "preNote": "Principale metropoli e porto di Creta cinta dalle mura veneziane, culla della civiltà minoica (palazzo di Cnosso); fertile pianura della Messarà produttrice di olio d'oliva e uva sultanina."
  },
  {
    "nuts": "EL432",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Lasithi (Agios Nikolaos / Sitia)",
    "capitalOrChefLieu": "Agios Nikolaos",
    "historicalRegion": "Kriti",
    "keys": [
      "lasithi",
      "agios_nikolaos",
      "ierapetra",
      "sitia",
      "spinalonga",
      "el432"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Lasithiou",
    "preNote": "Creta orientale, altopiano dei diecimila mulini a vento di Lasithi; fortezza isolana di Spinalonga e porto meridionale di Ierapetra prospiciente il Mar Libico."
  },
  {
    "nuts": "EL433",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Rethymni (Retimo / Monte Ida)",
    "capitalOrChefLieu": "Rethymno",
    "historicalRegion": "Kriti",
    "keys": [
      "rethymni",
      "rethymno",
      "arkadi",
      "psiloritis",
      "monte_ida",
      "el433"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Rethymnis",
    "preNote": "Fortezza veneziana della Fortezza a picco sul mare; sacro monastero di Arkadi e massiccio del Monte Ida (Psiloritis), culla montanara dei guerrieri cretesi e della resistenza."
  },
  {
    "nuts": "EL434",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Chania (La Canea / Rada di Suda)",
    "capitalOrChefLieu": "Chania",
    "historicalRegion": "Kriti",
    "keys": [
      "chania",
      "canea",
      "souda",
      "baia_di_suda",
      "akrotiri",
      "samaria",
      "el434"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Chanion",
    "preNote": "Capitale storica dell'isola di Creta e città natale dello statista Eleftherios Venizelos; la profonda Baia di Suda costituisce il miglior ancoraggio naturale del Mediterraneo orientale per la flotta alleata."
  },
  {
    "nuts": "EL511",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Evros (Alexandroupoli / Dedeagach)",
    "capitalOrChefLieu": "Alexandroupoli",
    "historicalRegion": "Thraki",
    "keys": [
      "evros",
      "alexandroupoli",
      "dedeagach",
      "orestiada",
      "didymoteicho",
      "soufli",
      "samothraki",
      "el511"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Evrou",
    "preNote": "Confine di frontiera cardinale della Grecia con la Turchia e la Bulgaria lungo il corso del fiume Evros; snodo ferroviario dell'Orient Express a Pythio e isola misterica di Samotracia."
  },
  {
    "nuts": "EL512",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Xanthi (Tracia Occidentale / Monti Rodopi)",
    "capitalOrChefLieu": "Xanthi",
    "historicalRegion": "Thraki",
    "keys": [
      "xanthi",
      "rodopi_xanthi",
      "stavroupoli",
      "echinos",
      "el512"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Xanthis",
    "preNote": "Famosa per il tabacco biondo orientale esportato in tutta Europa; settore fortificato della Linea Metaxas sui Monti Rodopi (Forti Echinos e Gorgona) a sbarramento delle vallate verso la Bulgaria."
  },
  {
    "nuts": "EL513",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Rodopi (Komotini / Forte Nymfaia)",
    "capitalOrChefLieu": "Komotini",
    "historicalRegion": "Thraki",
    "keys": [
      "rodopi",
      "komotini",
      "nymfaia",
      "iasmos",
      "sapes",
      "el513"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Rodopis",
    "preNote": "Capitale amministrativa della Tracia a popolazione mista cristiano-ortodossa e turco-musulmana; sbarramento del valico montano col celebre Forte Nymfaia della Linea Metaxas."
  },
  {
    "nuts": "EL514",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Drama (Piana di Drama / Linea Metaxas)",
    "capitalOrChefLieu": "Drama",
    "historicalRegion": "Anatoliki Makedonia",
    "keys": [
      "drama",
      "paranesti",
      "nevrokopi",
      "falakro",
      "el514"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Dramas",
    "preNote": "Ricca conca agricola ai piedi del Monte Falakro; sbarramento fortificato del Passo di Nevrokopi (Forte Perithori, Forte Lisse) che respinse gli assalti durante l'Operazione Marita."
  },
  {
    "nuts": "EL515",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Kavala, Thasos (Kavala / Porto del Tabacco)",
    "capitalOrChefLieu": "Kavala",
    "historicalRegion": "Anatoliki Makedonia",
    "keys": [
      "kavala",
      "thasos",
      "filippi",
      "chrysoupoli",
      "el515"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Kavalas",
    "preNote": "L'antica Neapolis biblica, spettacolare porto dominato dall'acquedotto romano e dalla fortezza ottomana; immenso centro di stoccaggio del tabacco e sito archeologico di Filippi."
  },
  {
    "nuts": "EL521",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Imathia (Veria / Naoussa)",
    "capitalOrChefLieu": "Veria",
    "historicalRegion": "Kentriki Makedonia",
    "keys": [
      "imathia",
      "veria",
      "naoussa",
      "vergina",
      "aigai",
      "el521"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Imathias",
    "preNote": "Antica capitale macedone di Aigai (Vergina con le tombe reali dei re argeadi), vigneti di Naoussa (vino Xinomavro) e frutteti della pianura macedone."
  },
  {
    "nuts": "EL522",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Thessaloniki (Salonicco / Metropoli della Macedonia)",
    "capitalOrChefLieu": "Thessaloniki",
    "historicalRegion": "Kentriki Makedonia",
    "keys": [
      "thessaloniki",
      "salonicco",
      "salonico",
      "lefkos_pyrgos",
      "termaikos",
      "el522"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Thessalonikis (Geniki Dioikisi Makedonias)",
    "preNote": "Seconda città della Grecia e metropoli economica dei Balcani meridionali; sede della Fiera Internazionale (TIF), della Torre Bianca, della cattedrale di San Demetrio e del quartier generale del Gen. Papagos."
  },
  {
    "nuts": "EL523",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Kilkis (Campo di Battaglia del 1913)",
    "capitalOrChefLieu": "Kilkis",
    "historicalRegion": "Kentriki Makedonia",
    "keys": [
      "kilkis",
      "polykastro",
      "doirani",
      "axioupoli",
      "el523"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Kilkis",
    "preNote": "Celebre teatro della sanguinosa battaglia di Kilkis-Lahanas (1913) contro l'esercito bulgaro; corridoio del fiume Axios (Vardar) e lago di Doiran al confine con la Jugoslavia."
  },
  {
    "nuts": "EL524",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Pella (Edessa / Pella di Alessandro)",
    "capitalOrChefLieu": "Edessa",
    "historicalRegion": "Kentriki Makedonia",
    "keys": [
      "pella",
      "edessa",
      "giannitsa",
      "cascate_edessa",
      "el524"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Pellas",
    "preNote": "Città natale di Alessandro Magno e Filippo II a Pella; spettacolari cascate d'acqua e filande tessili a Edessa, teatro della storica battaglia di Giannitsa (1912)."
  },
  {
    "nuts": "EL525",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Pieria (Katerini / Monte Olimpo)",
    "capitalOrChefLieu": "Katerini",
    "historicalRegion": "Kentriki Makedonia",
    "keys": [
      "pieria",
      "katerini",
      "olimpo",
      "olympos",
      "dion",
      "litohoro",
      "el525"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Pierias",
    "preNote": "Dominata dal massiccio del Monte Olimpo (Mytikas 2.917 m, dimora degli dei olimpici); antica città sacra macedone di Dion e costa del Golfo Termaico."
  },
  {
    "nuts": "EL526",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Serres (Valle dello Strimone / Forte Roupel)",
    "capitalOrChefLieu": "Serres",
    "historicalRegion": "Kentriki Makedonia",
    "keys": [
      "serres",
      "rupel",
      "roupel",
      "strimona",
      "siderokastro",
      "beles",
      "el526"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Serron",
    "preNote": "Settore chiave della Linea Metaxas: la gola dello Strimone scavata tra i monti Beles e Senghelska era presidiata dal leggendario Forte Roupel, i cui difensori nel 1941 pronunciarono la celebre frase: \"I forti non si arrendono, si conquistano!\"."
  },
  {
    "nuts": "EL527",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Chalkidiki (Penisola Calcidica & Monte Athos)",
    "capitalOrChefLieu": "Poligyros / Karyes",
    "historicalRegion": "Kentriki Makedonia",
    "keys": [
      "chalkidiki",
      "calcidica",
      "poligyros",
      "athos",
      "agion_oros",
      "kassandra",
      "sithonia",
      "el527"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Chalkidikis kai Agion Oros",
    "preNote": "Penisola a tre dita (Kassandra, Sithonia, Athos); la penisola orientale ospita lo Stato Monastico Autonomo del Monte Athos (Agion Oros), millenario centro spirituale dell'Ortodossia mondiale retto da venti monasteri sovrani."
  },
  {
    "nuts": "EL531",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Grevena, Kozani (Macedonia Sud-Occidentale)",
    "capitalOrChefLieu": "Kozani",
    "historicalRegion": "Dytiki Makedonia",
    "keys": [
      "kozani",
      "grevena",
      "ptolemaida",
      "siatista",
      "pindos_grevena",
      "el531"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Kozanis kai Grevenon",
    "preNote": "Altopiano montano attraversato dal fiume Aliakmonas; bacino minerario di lignite a Ptolemaida, zafferano di Krokos e massicci boscosi di Grevena verso il Pindo."
  },
  {
    "nuts": "EL532",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Kastoria (Lago Orestiada / Frontiera Albanese)",
    "capitalOrChefLieu": "Kastoria",
    "historicalRegion": "Dytiki Makedonia",
    "keys": [
      "kastoria",
      "orestiada_lago",
      "grammos",
      "nestorio",
      "pellicceria",
      "el532"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Kastorias",
    "preNote": "Suggestiva penisola sul Lago Orestiada cinta da oltre settanta chiese bizantine, plurisecolare capitale della lavorazione delle pellicce; massiccio del Grammos al confine con l'Albania, teatro bellico cruciale."
  },
  {
    "nuts": "EL533",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Florina (Laghi di Prespa / Bivio di Monastir)",
    "capitalOrChefLieu": "Florina",
    "historicalRegion": "Dytiki Makedonia",
    "keys": [
      "florina",
      "prespa",
      "amyntaio",
      "pisoderi",
      "varnous",
      "el533"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Florinas",
    "preNote": "Città montana e snodo ferroviario verso Bitola (Monastir in Jugoslavia); comprende i grandi laghi di Prespa al triplice confine con Albania e Jugoslavia e la stazione sciistica del Passo di Pisoderi."
  },
  {
    "nuts": "EL541",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Arta, Preveza (Golfo di Amvrakikos)",
    "capitalOrChefLieu": "Preveza / Arta",
    "historicalRegion": "Ipeiros",
    "keys": [
      "arta",
      "preveza",
      "amvrakikos",
      "ponte_di_arta",
      "nikopoli",
      "parga",
      "el541"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomoi Artis kai Prevezis",
    "preNote": "Leggendario ponte di pietra sul fiume Arachthos ad Arta, rovine romane della vittoria di Azio a Nikopoli e porto fortificato veneziano di Parga sul Mar Ionio."
  },
  {
    "nuts": "EL542",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Thesprotia (Igoumenitsa / Ciamuria)",
    "capitalOrChefLieu": "Igoumenitsa",
    "historicalRegion": "Ipeiros",
    "keys": [
      "thesprotia",
      "igoumenitsa",
      "paramythia",
      "syli",
      "acheron",
      "fiume_acheronte",
      "el542"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Thesprotias",
    "preNote": "Porto affacciato sull'isola di Corfù, leggendario fiume Acheronte dell'oltretomba mitologico; regione di frontiera (Ciamuria) abitata da una minoranza albanese musulmana (Ciam), fonte di gravi tensioni con l'Italia occupante l'Albania."
  },
  {
    "nuts": "EL543",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Ioannina (Giannina / Settore di Kalpaki)",
    "capitalOrChefLieu": "Ioannina",
    "historicalRegion": "Ipeiros",
    "keys": [
      "ioannina",
      "giannina",
      "kalpaki",
      "pamvotida",
      "metsovo",
      "zagori",
      "vikos",
      "el543"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Ioanninon",
    "preNote": "Capitale dell'Epiro sulle rive del Lago Pamvotis; sede del comando dell'8ª Divisione di Fanteria dell'Esercito Ellenico del Maggior Generale Charalambos Katsimitros, che a Kalpaki e sul fiume Elaia respinse l'invasione italiana dell'ottobre 1940."
  },
  {
    "nuts": "EL611",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Karditsa, Trikala (Meteora / Piana Tessalica)",
    "capitalOrChefLieu": "Trikala",
    "historicalRegion": "Thessalia",
    "keys": [
      "trikala",
      "karditsa",
      "meteora",
      "kalambaka",
      "pindos_thessalia",
      "el611"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomoi Trikalon kai Karditsis",
    "preNote": "I celebri monasteri ortodossi sospesi nel vuoto sulle torri di roccia arenaria delle Meteore a Kalambaka; pianura cerealicola e valico del Pindo verso l'Epiro."
  },
  {
    "nuts": "EL612",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Larisa (Capitale della Tessaglia)",
    "capitalOrChefLieu": "Larisa",
    "historicalRegion": "Thessalia",
    "keys": [
      "larisa",
      "larissa",
      "tempi",
      "pineios",
      "tyrnavos",
      "farsala",
      "el612"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Larisis",
    "preNote": "Cuore agricolo e logistico della Tessaglia sul fiume Pineios; la stretta gola di Tempe tra i monti Olimpo e Ossa e la base aerea militare di Larisa costituivano lo snodo tra la Grecia centrale e la Macedonia."
  },
  {
    "nuts": "EL613",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Magnisia, Sporades (Volos / Monte Pelio)",
    "capitalOrChefLieu": "Volos",
    "historicalRegion": "Thessalia",
    "keys": [
      "magnisia",
      "volos",
      "pelion",
      "pelio",
      "sporades",
      "skiathos",
      "skopelos",
      "alonnisos",
      "el613"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Magnisias",
    "preNote": "Porto industriale e mercantile del Golfo Pagasitico, patria mitologica di Giasone e degli Argonauti; boschi del Monte Pelio terra dei Centauri e isole Sporadi settentrionali (Skiathos, Skopelos)."
  },
  {
    "nuts": "EL621",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Zakynthos (Zante / Fiore di Levante)",
    "capitalOrChefLieu": "Zakynthos",
    "historicalRegion": "Ionia Nisia",
    "keys": [
      "zakynthos",
      "zante",
      "fiore_di_levante",
      "foscolo",
      "el621"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Zakynthou",
    "preNote": "La \"Fiore di Levante\" di ascendenza veneziana, patria del poeta Ugo Foscolo e di Dionysios Solomos (autore dell'Inno alla Libertà greco); isola di ricca cultura letteraria e musicale ionica."
  },
  {
    "nuts": "EL622",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Kerkyra (Corfù / Piazzaforte Ionica)",
    "capitalOrChefLieu": "Kerkyra",
    "historicalRegion": "Ionia Nisia",
    "keys": [
      "kerkyra",
      "corfu",
      "fortezza_vecchia",
      "achilleion",
      "paxi",
      "el622"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Kerkyras",
    "preNote": "Isola strategica all'imboccatura del Canale d'Otranto con imponenti fortezze veneziane; palazzo imperiale dell'Achilleion, storicamente ambita dal Regno d'Italia fascista come caposaldo adriatico."
  },
  {
    "nuts": "EL623",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Ithaki, Kefallinia (Cefalonia e Itaca)",
    "capitalOrChefLieu": "Argostoli",
    "historicalRegion": "Ionia Nisia",
    "keys": [
      "kefallinia",
      "cefalonia",
      "ithaki",
      "itaca",
      "argostoli",
      "lixouri",
      "enos",
      "el623"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Kefallinias",
    "preNote": "La leggendaria Itaca patria di Ulisse e l'isola maggiore di Cefalonia con il profondo golfo e porto di Argostoli e le vette di abeti neri del Monte Enos."
  },
  {
    "nuts": "EL624",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Lefkada (Santa Maura)",
    "capitalOrChefLieu": "Lefkada",
    "historicalRegion": "Ionia Nisia",
    "keys": [
      "lefkada",
      "santa_maura",
      "nidri",
      "porto_katsiki",
      "el624"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Lefkados",
    "preNote": "Isola ionica separata dalla terraferma da uno stretto canale navigabile scavato dai Corinzi e difeso dalla fortezza di Santa Maura; scogliere bianche di Capo Leucade celebri per il salto di Saffo."
  },
  {
    "nuts": "EL631",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Aitoloakarnania (Missolungi / Agrinio)",
    "capitalOrChefLieu": "Mesolongi / Agrinio",
    "historicalRegion": "Dytiki Ellada",
    "keys": [
      "aitoloakarnania",
      "mesolongi",
      "missolungi",
      "agrinio",
      "naupaktos",
      "acheloos",
      "el631"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Aitoloakarnanias",
    "preNote": "La \"Città Sacra\" di Missolungi cinta dalla laguna, simbolo del martirio della guerra d'indipendenza del 1826 e luogo della morte di Lord Byron; Agrinio capitale della produzione e commercio del tabacco."
  },
  {
    "nuts": "EL632",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Achaia (Patrasso / Porta d'Occidente)",
    "capitalOrChefLieu": "Patra",
    "historicalRegion": "Peloponnisos",
    "keys": [
      "achaia",
      "patra",
      "patrasso",
      "aigio",
      "kalavryta",
      "el632"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Achaias",
    "preNote": "Terzo polo urbano della Grecia e porto marittimo primario verso l'Italia e l'Europa occidentale; santuario di Agia Lavra a Kalavryta dove nel 1821 fu issato il vessillo della Rivoluzione Ellenica."
  },
  {
    "nuts": "EL633",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Ileia (Pyrgos / Olimpia Antica)",
    "capitalOrChefLieu": "Pyrgos",
    "historicalRegion": "Peloponnisos",
    "keys": [
      "ileia",
      "elide",
      "pyrgos",
      "olimpia",
      "olympia",
      "katakolo",
      "amaliada",
      "el633"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Ileias",
    "preNote": "La culla dei Giochi Olimpici nell'amena valle del fiume Alfeo ad Olimpia antica; fertile piana agricola cerealicola, olivicola e porto di Katakolo."
  },
  {
    "nuts": "EL641",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Voiotia (Beozia / Tebe e Livadeia)",
    "capitalOrChefLieu": "Livadeia",
    "historicalRegion": "Sterea Ellada",
    "keys": [
      "voiotia",
      "beozia",
      "livadeia",
      "thiva",
      "tebe",
      "aliartos",
      "el641"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Voiotias",
    "preNote": "La storica terra di Tebe e Cheronea; piana prosciugata del Lago Copaide bonificata per la coltivazione del cotone e sorgenti oracolari di Erchina a Livadeia."
  },
  {
    "nuts": "EL642",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Evvoia (Eubea / Calcide)",
    "capitalOrChefLieu": "Chalkida",
    "historicalRegion": "Sterea Ellada",
    "keys": [
      "evvoia",
      "eubea",
      "chalkida",
      "calcide",
      "euripo",
      "karystos",
      "kymi",
      "el642"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Evvoias",
    "preNote": "Seconda isola greca per estensione, collegata alla terraferma dal ponte sullo Stretto dell'Euripo a Calcide, celebre per il misterioso fenomeno delle correnti di marea invertite."
  },
  {
    "nuts": "EL643",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Evrytania (Karpenisi / Monti Agrafa)",
    "capitalOrChefLieu": "Karpenisi",
    "historicalRegion": "Sterea Ellada",
    "keys": [
      "evrytania",
      "karpenisi",
      "agrafa",
      "proussos",
      "el643"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Evrytanias",
    "preNote": "Il cuore alpestre e più impervio della Grecia, i Monti Agrafa (\"terre non censite\" poiché mai sottomesse dagli Ottomani); monastero rupestre di Panagia Prousiotissa."
  },
  {
    "nuts": "EL644",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Fthiotida (Lamia / Passo delle Termopili)",
    "capitalOrChefLieu": "Lamia",
    "historicalRegion": "Sterea Ellada",
    "keys": [
      "fthiotida",
      "lamia",
      "termopili",
      "thermopylae",
      "atalanti",
      "stilis",
      "el644"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Fthiotidos",
    "preNote": "Piazzaforte strategica di Lamia tra il nord e il sud greco; storico Passo delle Termopili dove Leonida e i suoi 300 spartani caddero nel 480 a.C. contro i Persiani di Serse."
  },
  {
    "nuts": "EL645",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Fokida (Focide / Delfi e Amfissa)",
    "capitalOrChefLieu": "Amfissa",
    "historicalRegion": "Sterea Ellada",
    "keys": [
      "fokida",
      "focide",
      "amfissa",
      "delfi",
      "delphi",
      "itea",
      "galaxidi",
      "parnassos",
      "el645"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Fokidos",
    "preNote": "L'Ombelico del Mondo (Omphalos) al Santuario di Apollo e Oracolo di Delfi sulle pendici del Monte Parnaso; immenso mare di ulivi di Amfissa e porto marittimo di Itea sul Golfo di Corinto."
  },
  {
    "nuts": "EL651",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Argolida, Arkadia (Nauplia e Tripoli)",
    "capitalOrChefLieu": "Nauplia / Tripoli",
    "historicalRegion": "Peloponnisos",
    "keys": [
      "argolida",
      "arkadia",
      "nafplio",
      "nauplia",
      "tripoli",
      "argo",
      "micene",
      "epidaurus",
      "el651"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomoi Argolidos kai Arkadias",
    "preNote": "Nauplia prima capitale della Grecia moderna (1829-1834) sovrastata dalla fortezza di Palamidi; teatro d'Epidauro, tombe reali di Micene e l'altopiano arcadico di Tripoli, roccaforte di Theodoros Kolokotronis."
  },
  {
    "nuts": "EL652",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Korinthia (Corinto / Canale di Corinto)",
    "capitalOrChefLieu": "Korinthos",
    "historicalRegion": "Peloponnisos",
    "keys": [
      "korinthia",
      "corinto",
      "korinthos",
      "canale_di_corinto",
      "acrocorinto",
      "loutraki",
      "kiato",
      "el652"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomos Korinthias",
    "preNote": "Lo strategico Istmo tagliato nel 1893 dal Canale di Corinto lungo 6,4 km, che unisce il Mar Ionio all'Egeo; rocca di Acrocorinto e stazione termale di Loutraki."
  },
  {
    "nuts": "EL653",
    "country": "EL",
    "defaultOwner": "GRE",
    "name": "Lakonia, Messinia (Sparta e Kalamata)",
    "capitalOrChefLieu": "Sparti / Kalamata",
    "historicalRegion": "Peloponnisos",
    "keys": [
      "lakonia",
      "messinia",
      "sparta",
      "sparti",
      "kalamata",
      "mystras",
      "mani",
      "pylos",
      "navarino",
      "el653"
    ],
    "preAdminTitle": "Vasileion tis Ellados — Nomoi Lakonias kai Messinias",
    "preNote": "Valle dell'Eurota con Sparta e la capitale bizantina di Mystras; porto oleario di Kalamata, baia di Navarino (Pylos) e aspra penisola fortificata di Mani con case-torri medievali."
  },
  {
    "nuts": "AL022",
    "country": "AL",
    "defaultOwner": "ALB",
    "name": "Qarku i Tiranës (Tirana / Kryeqyteti)",
    "capitalOrChefLieu": "Tiranë",
    "historicalRegion": "Shqipëria e Mesme",
    "keys": [
      "tirana",
      "tirane",
      "kryeqyteti",
      "kavaje",
      "dajt",
      "al022"
    ],
    "preAdminTitle": "Mbretëria Shqiptare — Kryeqyteti Tiranë (Mbreti Zog I)",
    "preNote": "Capitale del Regno d'Albania sotto Re Zog I (Ahmet Zogu); rimodellata negli anni '30 da architetti italiani (Piazza Scanderbeg, viale monumentale, ministeri razionalisti).",
    "postName": "Tirana (Prefettura di Tirana — Regno d'Albania)",
    "postAdminTitle": "Regno d'Italia — Luogotenenza Generale d'Albania (Francesco Jacomoni)",
    "postNote": "Sede della Luogotenenza Generale italiana dopo l'invasione del 7-12 aprile 1939; corona d'Albania offerta a Vittorio Emanuele III in unione personale.",
    "postOwner": "ITA",
    "transitionStep": 4
  },
  {
    "nuts": "AL012",
    "country": "AL",
    "defaultOwner": "ALB",
    "name": "Qarku i Durrësit (Durazzo / Porti Kryesor)",
    "capitalOrChefLieu": "Durrës",
    "historicalRegion": "Shqipëria e Mesme",
    "keys": [
      "durres",
      "durazzo",
      "kruje",
      "skanderbeg_kruje",
      "shijak",
      "al012"
    ],
    "preAdminTitle": "Mbretëria Shqiptare — Prefektura e Durrësit",
    "preNote": "Antica Dyrrhachium e capolinea della Via Egnatia, principale scalo marittimo verso Bari e Brindisi; comprende la storica fortezza di Kruja dell'eroe nazionale Scanderbeg.",
    "postName": "Durazzo (Prefettura di Durazzo / Sbarco Italiano)",
    "postAdminTitle": "Regno d'Italia — Comando Marina e Base Navale di Durazzo",
    "postNote": "Teatro dello sbarco principale del Corpo di Spedizione Italiano (Gen. Alfredo Guzzoni) il 7 aprile 1939; resistenza armata guidata dal sergente di marina Mujo Ulqinaku.",
    "postOwner": "ITA",
    "transitionStep": 4
  },
  {
    "nuts": "AL015",
    "country": "AL",
    "defaultOwner": "ALB",
    "name": "Qarku i Shkodrës (Scutari / Liqeni i Shkodrës)",
    "capitalOrChefLieu": "Shkodër",
    "historicalRegion": "Gegëria",
    "keys": [
      "shkoder",
      "shkodra",
      "scutari",
      "rozafa",
      "puke",
      "malesi_e_madhe",
      "al015"
    ],
    "preAdminTitle": "Mbretëria Shqiptare — Prefektura e Shkodrës",
    "preNote": "Capitale storica del nord albanese (Ghegaria), roccaforte cattolica e culturale sovrastata dal millenario Castello di Rozafa sul fiume Buna e Lago di Scutari al confine montenegrino.",
    "postName": "Scutari (Prefettura di Scutari)",
    "postAdminTitle": "Regno d'Italia — Luogotenenza Generale d'Albania",
    "postNote": "Presidiata dalla Divisione Alpina \"Julia\" e fanteria italiana per la sorveglianza della frontiera con la Jugoslavia.",
    "postOwner": "ITA",
    "transitionStep": 4
  },
  {
    "nuts": "AL035",
    "country": "AL",
    "defaultOwner": "ALB",
    "name": "Qarku i Vlorës (Valona / Gjiri i Vlorës)",
    "capitalOrChefLieu": "Vlorë",
    "historicalRegion": "Labëria",
    "keys": [
      "vlore",
      "vlora",
      "valona",
      "sarande",
      "porto_eddai",
      "himare",
      "sazan",
      "al035"
    ],
    "preAdminTitle": "Mbretëria Shqiptare — Prefektura e Vlorës",
    "preNote": "Culla dell'indipendenza albanese proclamata da Ismail Qemali nel 1912; baia strategica dirimpetto all'isola italiana fortificata di Saseno nel Canale d'Otranto.",
    "postName": "Valona e Porto Edda (Prefettura di Valona)",
    "postAdminTitle": "Regno d'Italia — Base Navale e Aeronavale di Valona",
    "postNote": "Principale base aeronavale della Regia Marina e Regia Aeronautica per il controllo del Canale d'Otranto; Saranda ribattezzata \"Porto Edda\" in onore di Edda Ciano Mussolini.",
    "postOwner": "ITA",
    "transitionStep": 4
  },
  {
    "nuts": "AL034",
    "country": "AL",
    "defaultOwner": "ALB",
    "name": "Qarku i Korçës (Coriza / Shqipëria Juglindore)",
    "capitalOrChefLieu": "Korçë",
    "historicalRegion": "Toskëria",
    "keys": [
      "korce",
      "korca",
      "corizza",
      "pogradec",
      "liqeni_ohrit",
      "devoll",
      "kolonje",
      "al034"
    ],
    "preAdminTitle": "Mbretëria Shqiptare — Prefektura e Korçës",
    "preNote": "Centro colto e commerciale dell'Albania sud-orientale, culla della prima scuola in lingua albanese (1887), affacciata sui laghi di Ocrida e Prespa.",
    "postName": "Coriza (Prefettura di Coriza — Base Avanzata)",
    "postAdminTitle": "Regno d'Italia — Comando IX Armata Italiana",
    "postNote": "Quartier generale avanzato del Generale Sebastiano Visconti Prasca per la pianificazione dell'offensiva dell'ottobre 1940 contro la Grecia nel settore del Pindo.",
    "postOwner": "ITA",
    "transitionStep": 4
  },
  {
    "nuts": "AL033",
    "country": "AL",
    "defaultOwner": "ALB",
    "name": "Qarku i Gjirokastrës (Argirocastro / Lugina e Drinos)",
    "capitalOrChefLieu": "Gjirokastër",
    "historicalRegion": "Labëria",
    "keys": [
      "gjirokaster",
      "argirocastro",
      "tepelene",
      "permet",
      "drinos",
      "al033"
    ],
    "preAdminTitle": "Mbretëria Shqiptare — Prefektura e Gjirokastrës",
    "preNote": "La monumentale \"Città di Pietra\" dominata dalla fortezza medievale nella valle del Drino; snodo montano strategico di Tepelena sul fiume Vojussa.",
    "postName": "Argirocastro (Prefettura di Argirocastro)",
    "postAdminTitle": "Regno d'Italia — Settore d'Operazione Epiro",
    "postNote": "Asse di marcia delle colonne corazzate italiane della Divisione \"Centauro\" verso il confine greco di Kakavia nell'autunno 1940.",
    "postOwner": "ITA",
    "transitionStep": 4
  },
  {
    "nuts": "AL031",
    "country": "AL",
    "defaultOwner": "ALB",
    "name": "Qarku i Beratit (Berat / Qyteti i njëmijë dritareve)",
    "capitalOrChefLieu": "Berat",
    "historicalRegion": "Toskeria",
    "keys": [
      "berat",
      "kucove",
      "skrapar",
      "tomorr",
      "osum",
      "al031"
    ],
    "preAdminTitle": "Mbretëria Shqiptare — Prefektura e Beratit",
    "preNote": "La \"Città dalle mille finestre\" patrimonio bizantino e ottomano sulle rive dell'Osum ai piedi del monte Tomorr; comprende il giacimento petrolifero di Kuçovë.",
    "postName": "Berat (Prefettura di Berat)",
    "postAdminTitle": "Regno d'Italia — Luogotenenza Generale d'Albania",
    "postNote": "Comprensorio agricolo e petrolifero controllato dall'Azienda Italiana Petroli Albania (AIPA).",
    "postOwner": "ITA",
    "transitionStep": 4
  },
  {
    "nuts": "AL021",
    "country": "AL",
    "defaultOwner": "ALB",
    "name": "Qarku i Elbasanit (Elbasan / Lugina e Shkumbinit)",
    "capitalOrChefLieu": "Elbasan",
    "historicalRegion": "Shqipëria e Mesme",
    "keys": [
      "elbasan",
      "shkumbin",
      "librazhd",
      "peqin",
      "gramsh",
      "al021"
    ],
    "preAdminTitle": "Mbretëria Shqiptare — Prefektura e Elbasanit",
    "preNote": "Valle dello Shkumbin lungo il tracciato della Via Egnatia; castello quadrangolare ottomano, olivicoltura e snodo di transito per i collegamenti con la Macedonia.",
    "postName": "Elbasan (Prefettura di Elbasan)",
    "postAdminTitle": "Regno d'Italia — Luogotenenza Generale d'Albania",
    "postNote": "Snodo logistico militare italiano verso il lago di Ocrida e la frontiera jugoslava.",
    "postOwner": "ITA",
    "transitionStep": 4
  },
  {
    "nuts": "AL032",
    "country": "AL",
    "defaultOwner": "ALB",
    "name": "Qarku i Fierit (Fier / Fushat e Myzeqesë / Apollonia)",
    "capitalOrChefLieu": "Fier",
    "historicalRegion": "Myzeqe",
    "keys": [
      "fier",
      "apollonia",
      "myzeqe",
      "lushnje",
      "mallakaster",
      "patos",
      "al032"
    ],
    "preAdminTitle": "Mbretëria Shqiptare — Prefektura e Fierit",
    "preNote": "Pianura alluvionale della Myzeqe (\"granaio d'Albania\") e scavi dell'antica città greca e romana di Apollonia; estrazione petrolifera a Patos-Marinza.",
    "postName": "Fier (Prefettura di Fier)",
    "postAdminTitle": "Regno d'Italia — Distretto Minerario e Petrolifero dell'AIPA",
    "postNote": "Giacimenti di bitume e petrolio greggio raffinati e convogliati verso il porto di Valona per la marina da guerra italiana.",
    "postOwner": "ITA",
    "transitionStep": 4
  },
  {
    "nuts": "AL011",
    "country": "AL",
    "defaultOwner": "ALB",
    "name": "Qarku i Dibrës (Dibra / Peshkopi)",
    "capitalOrChefLieu": "Peshkopi",
    "historicalRegion": "Gegëria",
    "keys": [
      "diber",
      "dibra",
      "peshkopi",
      "bulqize",
      "mat",
      "drin_i_zi",
      "al011"
    ],
    "preAdminTitle": "Mbretëria Shqiptare — Prefektura e Dibrës",
    "preNote": "Valle del Drin Nero e altopiani montani del massiccio del Korab (cima più alta d'Albania, 2.764 m); distretto di Mat culla della famiglia reale Zogu; miniere di cromo a Bulqizë.",
    "postName": "Dibra (Prefettura di Dibra)",
    "postAdminTitle": "Regno d'Italia — Luogotenenza Generale d'Albania",
    "postNote": "Presidio confinato sulle alture dirimpetto alla Vardarska Banovina jugoslava.",
    "postOwner": "ITA",
    "transitionStep": 4
  },
  {
    "nuts": "AL013",
    "country": "AL",
    "defaultOwner": "ALB",
    "name": "Qarku i Kukësit (Kukës / Alpet Shqiptare)",
    "capitalOrChefLieu": "Kukës",
    "historicalRegion": "Gegëria",
    "keys": [
      "kukes",
      "tropoje",
      "has",
      "drin",
      "alpet_shqiptare",
      "al013"
    ],
    "preAdminTitle": "Mbretëria Shqiptare — Prefektura e Kukësit",
    "preNote": "Confluenza del Drin Bianco e Drin Nero tra aspre gole montane; altopiani di Tropoja e Has popolati da fieri clan montanari gheghi al confine col Kosovo.",
    "postName": "Kukës (Prefettura di Kukës)",
    "postAdminTitle": "Regno d'Italia — Luogotenenza Generale d'Albania",
    "postNote": "Sorveglianza militare dei passi alpestri verso la Jugoslavia meridionale.",
    "postOwner": "ITA",
    "transitionStep": 4
  },
  {
    "nuts": "AL014",
    "country": "AL",
    "defaultOwner": "ALB",
    "name": "Qarku i Lezhës (Lezha / Alessio)",
    "capitalOrChefLieu": "Lezhë",
    "historicalRegion": "Gegëria",
    "keys": [
      "lezhe",
      "alessio",
      "kurbin",
      "mirdite",
      "shengjin",
      "san_giovanni_di_medua",
      "al014"
    ],
    "preAdminTitle": "Mbretëria Shqiptare — Prefektura e Lezhës",
    "preNote": "Foce del fiume Drin e piana di Zadrima; sito storico della Lega di Alessio (1444) e mausoleo di Giorgio Castriota Scanderbeg; porto adriatico di Shëngjin (San Giovanni di Medua).",
    "postName": "Alessio e San Giovanni di Medua (Prefettura di Alessio)",
    "postAdminTitle": "Regno d'Italia — Presidio Costiero e Portuale",
    "postNote": "Approdo settentrionale per lo sbarco dei reparti e dei rifornimenti del Regio Esercito dall'Adriatico.",
    "postOwner": "ITA",
    "transitionStep": 4
  },
  {
    "nuts": "RS110",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Beograd (Prestonica Kraljevine Jugoslavije)",
    "capitalOrChefLieu": "Beograd",
    "historicalRegion": "Srbija",
    "keys": [
      "beograd",
      "belgrado",
      "prestonica",
      "kalemegdan",
      "uprava_grada_beograda",
      "dedinje",
      "rs110"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Uprava grada Beograda",
    "preNote": "Capitale del Regno di Jugoslavia alla confluenza di Sava e Danubio; fortezza millenaria di Kalemegdan, residenza reale di Dedinje del Principe Reggente Paolo e del giovane Re Pietro II Karađorđević."
  },
  {
    "nuts": "RS121",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Zapadnobačka oblast (Sombor / Dunavska Banovina)",
    "capitalOrChefLieu": "Sombor",
    "historicalRegion": "Vojvodina / Bačka",
    "keys": [
      "zapadnobacka",
      "sombor",
      "apatin",
      "kula",
      "odjaci",
      "rs121"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dunavska Banovina (Zapadna Bačka)",
    "preNote": "Bačka occidentale nella pianura fertile della Vojvodina lungo il Danubio; Sombor città giardino con antica popolazione mista serba, ungherese e tedesca."
  },
  {
    "nuts": "RS122",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Južnobanatska oblast (Pančevo / Vršac)",
    "capitalOrChefLieu": "Pančevo",
    "historicalRegion": "Vojvodina / Banat",
    "keys": [
      "juznobanatska",
      "pancevo",
      "vrsac",
      "bela_crkva",
      "kovin",
      "deliblatska_pescara",
      "rs122"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dunavska Banovina (Južni Banat)",
    "preNote": "Banato meridionale sul Danubio di fronte a Belgrado; officine aeronautiche Utva a Pančevo, vigneti e colline di Vršac e deserto sabbioso di Deliblato al confine romeno."
  },
  {
    "nuts": "RS123",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Južnobačka oblast (Novi Sad / Petrovaradin)",
    "capitalOrChefLieu": "Novi Sad",
    "historicalRegion": "Vojvodina / Bačka",
    "keys": [
      "juznobacka",
      "novi_sad",
      "neoplanta",
      "petrovaradin",
      "becej",
      "backa_palanka",
      "rs123"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dunavska Banovina (Sedište Novi Sad)",
    "preNote": "Capoluogo della Dunavska Banovina (sede del Palazzo del Bano Banovina); \"Atene serba\", centro della Matica Srpska e colossale fortezza asburgica di Petrovaradin (\"Gibilterra del Danubio\")."
  },
  {
    "nuts": "RS124",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Severnobanatska oblast (Kikinda / Senta)",
    "capitalOrChefLieu": "Kikinda",
    "historicalRegion": "Vojvodina / Banat",
    "keys": [
      "severnobanatska",
      "kikinda",
      "senta",
      "kanjiza",
      "novi_knezevac",
      "rs124"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dunavska Banovina (Severni Banat)",
    "preNote": "Banato settentrionale lungo il fiume Tibisco (Tisza); Senta celebre per la vittoria del Principe Eugenio di Savoia sugli Ottomani (1697); popolazione mista serba e magiara."
  },
  {
    "nuts": "RS125",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Severnobačka oblast (Subotica / Szabadka)",
    "capitalOrChefLieu": "Subotica",
    "historicalRegion": "Vojvodina / Bačka",
    "keys": [
      "severnobacka",
      "subotica",
      "szabadka",
      "palic",
      "backa_topola",
      "rs125"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dunavska Banovina (Severna Bačka)",
    "preNote": "Metropoli settentrionale della Vojvodina celebre per lo stile Liberty ungherese (Palazzo Municipale, Sinagoga); lago di Palić, forte presenza della minoranza magiara e bunjevci."
  },
  {
    "nuts": "RS126",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Srednjobanatska oblast (Petrovgrad / Zrenjanin)",
    "capitalOrChefLieu": "Petrovgrad",
    "historicalRegion": "Vojvodina / Banat",
    "keys": [
      "srednjobanatska",
      "petrovgrad",
      "zrenjanin",
      "veliki_beckerek",
      "novi_becej",
      "rs126"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dunavska Banovina (Petrovgrad)",
    "preNote": "Battezzata Petrovgrad nel 1935 in onore di Re Pietro I il Liberatore (precedentemente Veliki Bečkerek); centro industriale agroalimentare lungo il fiume Bega."
  },
  {
    "nuts": "RS127",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Sremska oblast (Sremska Mitrovica / Fruška Gora)",
    "capitalOrChefLieu": "Sremska Mitrovica",
    "historicalRegion": "Vojvodina / Srem",
    "keys": [
      "sremska",
      "sremska_mitrovica",
      "sirmium",
      "fruska_gora",
      "sid",
      "indjija",
      "ruma",
      "zemun_srem",
      "rs127"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dunavska Banovina (Srem)",
    "preNote": "Antica Sirmium romana sul fiume Sava e massiccio montuoso sacro della Fruška Gora con sedici monasteri ortodossi serbi rinascimentali e barocchi."
  },
  {
    "nuts": "RS211",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Zlatiborska oblast (Užice / Zlatibor)",
    "capitalOrChefLieu": "Užice",
    "historicalRegion": "Zapadna Srbija",
    "keys": [
      "zlatiborska",
      "uzice",
      "zlatibor",
      "pozega_srb",
      "prijepolje",
      "nova_varos",
      "sjenica",
      "tara",
      "rs211"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Drinska Banovina / Zetska Banovina",
    "preNote": "Massicci alpestri di Zlatibor e Tara nella valle della Đetinja; comprende l'altopiano di Sjenica nel Sandžak e il monastero di Mileševa celebre per l'affresco dell'Angelo Bianco."
  },
  {
    "nuts": "RS212",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Kolubarska oblast (Valjevo / Kolubara)",
    "capitalOrChefLieu": "Valjevo",
    "historicalRegion": "Zapadna Srbija",
    "keys": [
      "kolubarska",
      "valjevo",
      "kolubara",
      "ub",
      "lajkovac",
      "mionica",
      "ljig",
      "rs212"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Drinska Banovina (Kolubara)",
    "preNote": "Valle della Kolubara celebre per l'epica battaglia del 1914 dove il generale Živojin Mišić sbaragliò l'esercito austro-ungarico; frutteti di prugne e sorgenti pedemontane."
  },
  {
    "nuts": "RS213",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Mačvanska oblast (Šabac / Mačva)",
    "capitalOrChefLieu": "Šabac",
    "historicalRegion": "Zapadna Srbija",
    "keys": [
      "macvanska",
      "sabac",
      "loznica",
      "macva",
      "cer",
      "drina_sabac",
      "rs213"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Drinska Banovina (Mačva)",
    "preNote": "Pianura della Mačva tra Sava e Drina; monte Cer teatro della prima vittoria alleata della Grande Guerra (agosto 1914) contro gli Asburgo; città patriottica di Šabac (\"la Piccola Parigi serba\")."
  },
  {
    "nuts": "RS214",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Moravička oblast (Čačak / Gornji Milanovac)",
    "capitalOrChefLieu": "Čačak",
    "historicalRegion": "Centralna Srbija",
    "keys": [
      "moravicka",
      "cacak",
      "gornji_milanovac",
      "lucani",
      "ivanica",
      "ovcar_kablar",
      "rs214"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Moravska Banovina",
    "preNote": "Valle della Zapadna Morava e spettacolare gola di Ovčar-Kablar (il \"Monte Athos serbo\" per i monasteri medievali); polo frutticolo e manifatturiero di Čačak."
  },
  {
    "nuts": "RS215",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Pomoravska oblast (Jagodina / Ćuprija / Paraćin)",
    "capitalOrChefLieu": "Jagodina",
    "historicalRegion": "Centralna Srbija",
    "keys": [
      "pomoravska",
      "jagodina",
      "cuprija",
      "paracin",
      "svilajnac",
      "velika_morava",
      "rs215"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Moravska Banovina (Pomoravlje)",
    "preNote": "Valle fertile della Velika Morava, asse di comunicazione principale dei Balcani verso Salonicco; monastero fortificato di Manasija (Resava) fondato dal despota Stefan Lazarević."
  },
  {
    "nuts": "RS216",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Rasinska oblast (Kruševac / Lazarica)",
    "capitalOrChefLieu": "Kruševac",
    "historicalRegion": "Centralna Srbija",
    "keys": [
      "rasinska",
      "krusevac",
      "lazarica",
      "trstenik",
      "aleksandrovac",
      "zupa",
      "jastrebac",
      "rs216"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Moravska Banovina (Kruševac)",
    "preNote": "Antica capitale medievale del Principe Lazar Hrebeljanović prima della Battaglia di Kosovo (1389); chiesa di Lazarica in stile moravo e rinomata regione vinicola della Župa."
  },
  {
    "nuts": "RS217",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Raška oblast (Kraljevo / Novi Pazar / Sandžak)",
    "capitalOrChefLieu": "Kraljevo / Novi Pazar",
    "historicalRegion": "Raška i Sandžak",
    "keys": [
      "raska",
      "kraljevo",
      "novi_pazar",
      "vrnjacka_banja",
      "raska_grad",
      "zica",
      "studenica",
      "sopocani",
      "sandzak_raska",
      "rs217"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Moravska Banovina / Zetska Banovina",
    "preNote": "Culla primigenia dello Stato medievale serbo (Stari Ras): monasteri di Studenica, Sopoćani e Žiča (sede dell'incoronazione dei re serbi); Novi Pazar centro storico del Sandžak e terme di Vrnjačka Banja."
  },
  {
    "nuts": "RS218",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Šumadijska oblast (Kragujevac / Zastava)",
    "capitalOrChefLieu": "Kragujevac",
    "historicalRegion": "Šumadija",
    "keys": [
      "sumadijska",
      "kragujevac",
      "arandjelovac",
      "topola",
      "oplenae",
      "vojnotehnicki_zavod",
      "rs218"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dunavska Banovina / Moravska Banovina",
    "preNote": "Il cuore storico della Serbia (Šumadija): fabbrica d'armi e cannoni di Stato Vojno-Tehnički Zavod (VTZ, poi Zastava) a Kragujevac; mausoleo reale dei Karađorđević a Oplenac (Topola)."
  },
  {
    "nuts": "RS221",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Borska oblast (Bor / Miniere di Rame)",
    "capitalOrChefLieu": "Bor",
    "historicalRegion": "Istočna Srbija",
    "keys": [
      "borska",
      "bor",
      "majdanpek",
      "negotin",
      "kladovo",
      "timok_bor",
      "rs221"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Moravska Banovina (Borski rudnici)",
    "preNote": "Uno dei più grandi bacini d'estrazione di rame e pirite d'Europa (Compagnie Française des Mines de Bor), risorsa strategica ambita dal Terzo Reich; pianura di Negotin sul Danubio."
  },
  {
    "nuts": "RS222",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Braničevska oblast (Požarevac / Golupac)",
    "capitalOrChefLieu": "Požarevac",
    "historicalRegion": "Istočna Srbija",
    "keys": [
      "branicevska",
      "pozarevac",
      "golubac",
      "veliko_gradiste",
      "viminacium",
      "homolje",
      "rs222"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dunavska Banovina (Braničevo)",
    "preNote": "Porta d'ingresso delle Gole del Danubio con la spettacolare fortezza medievale di Golubac; antica capitale romana di Viminacium e colline metallifere di Homolje."
  },
  {
    "nuts": "RS223",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Zaječarska oblast (Zaječar / Timočka Krajina)",
    "capitalOrChefLieu": "Zaječar",
    "historicalRegion": "Istočna Srbija",
    "keys": [
      "zajecarska",
      "zajecar",
      "knjazevac",
      "sokobanja",
      "timok",
      "romuliana",
      "rs223"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Moravska Banovina (Timok)",
    "preNote": "Valle del Timok al confine con la Bulgaria; residenza imperiale romana di Felix Romuliana (Gamzigrad) dell'imperatore Galerio e stazione termale di Sokobanja."
  },
  {
    "nuts": "RS224",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Jablanička oblast (Leskovac / Srpski Mančester)",
    "capitalOrChefLieu": "Leskovac",
    "historicalRegion": "Južna Srbija",
    "keys": [
      "jablanicka",
      "leskovac",
      "vlasotince",
      "lebane",
      "medvedja",
      "bojnik",
      "rs224"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Moravska Banovina (Leskovac)",
    "preNote": "Il \"Manchester serbo\" degli anni '30 per la straordinaria fioritura delle industrie tessili e di lavorazione della canapa e del lino; valle della Jablanica e della Južna Morava."
  },
  {
    "nuts": "RS225",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Nišavska oblast (Niš / Sedište Moravske Banovine)",
    "capitalOrChefLieu": "Niš",
    "historicalRegion": "Južna Srbija",
    "keys": [
      "nisavska",
      "nis",
      "sediste_moravske_banovine",
      "cegar",
      "cele_kula",
      "aleksinac",
      "rs225"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Moravska Banovina (Sedište Niš)",
    "preNote": "Sede del Bano della Moravska Banovina, seconda città della Serbia e nodo ferroviario cardinale tra l'Europa centrale, Istanbul e Salonicco; fortezza di Niš e Torre dei Teschi (Ćele Kula)."
  },
  {
    "nuts": "RS226",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Pirotska oblast (Pirot / Stara Planina)",
    "capitalOrChefLieu": "Pirot",
    "historicalRegion": "Istočna Srbija",
    "keys": [
      "pirotska",
      "pirot",
      "dimitrovgrad",
      "caribrod",
      "bela_palanka",
      "babushnica",
      "rs226"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Moravska Banovina (Pirot)",
    "preNote": "Famosa nel mondo per la tessitura artigianale dei tappeti Kilìm di Pirot e per il formaggio Kačkavalj; Caribrod (Dimitrovgrad) territorio di frontiera ceduto dalla Bulgaria nel Trattato di Neuilly (1919)."
  },
  {
    "nuts": "RS227",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Podunavska oblast (Smederevo / Dunavska tvrđava)",
    "capitalOrChefLieu": "Smederevo",
    "historicalRegion": "Centralna Srbija",
    "keys": [
      "podunavska",
      "smederevo",
      "semendria",
      "smederevska_palanka",
      "velika_plana",
      "rs227"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dunavska Banovina (Smederevo)",
    "preNote": "Colossale fortezza danubiana di Smederevo, ultima capitale del despotato medievale serbo (1430); porto fluviale e vigneti della Smederevka sul Danubio."
  },
  {
    "nuts": "RS228",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Pčinjska oblast (Vranje / Južno Pomoravlje)",
    "capitalOrChefLieu": "Vranje",
    "historicalRegion": "Južna Srbija",
    "keys": [
      "pcinjska",
      "vranje",
      "bujanovac",
      "presevo",
      "surdulica",
      "vlada",
      "rs228"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Vardarska Banovina (Vranje)",
    "preNote": "Gola di Grdelica e valle della Južna Morava verso il confine macedone; atmosfera orientaleggiante celebrata dallo scrittore Borisav Stanković e valico di Preševo."
  },
  {
    "nuts": "RS229",
    "country": "RS",
    "defaultOwner": "YUG",
    "name": "Toplička oblast (Prokuplje / Toplica)",
    "capitalOrChefLieu": "Prokuplje",
    "historicalRegion": "Južna Srbija",
    "keys": [
      "toplicka",
      "prokuplje",
      "kursumlija",
      "blace",
      "zitoradja",
      "djavolja_varos",
      "rs229"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Moravska Banovina (Toplica)",
    "preNote": "Valle della Toplica, culla della celebre Insurrezione di Toplica del 1917 contro l'occupazione bulgara e austro-ungarica; curiose formazioni geologiche piramidali di Đavolja Varoš."
  },
  {
    "nuts": "HR050",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Grad Zagreb (Glavni grad Banovine Hrvatske)",
    "capitalOrChefLieu": "Zagreb",
    "historicalRegion": "Hrvatska",
    "keys": [
      "zagreb",
      "grad_zagreb",
      "agram",
      "kaptol",
      "gradec",
      "banski_dvori",
      "hr050"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Savska Banovina (do avg 1939)",
    "preNote": "Metropoli croata ai piedi della Medvednica (Gradec e Kaptol); sede del Bano della Savska Banovina e dal 26 agosto 1939 capitale politica della Banovina Hrvatska autonoma guidata da Vladko Maček (HSS).",
    "postName": "Grad Zagreb (Glavni grad Banovine Hrvatske)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska (Sporazum Cvetković-Maček)",
    "postNote": "Sede del Governo autonomo della Banovina di Croazia presieduto dal Bano Ivan Šubašić a Banski Dvori.",
    "transitionStep": 4
  },
  {
    "nuts": "HR065",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Zagrebačka županija (Prigorje i Turopolje)",
    "capitalOrChefLieu": "Zagreb",
    "historicalRegion": "Hrvatska",
    "keys": [
      "zagrebacka",
      "velika_gorica",
      "samobor",
      "zapresic",
      "jastrebarsko",
      "vrbovec",
      "hr065"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Savska Banovina",
    "preNote": "Regione agraria e collinare di Turopolje e Prigorje circostante Zagabria; cittadina d'arte e artigianato di Samobor e vigneti di Plešivica.",
    "postName": "Zagrebačka županija (Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska",
    "postNote": "Inclusa nella Banovina Hrvatska autonoma dall'agosto 1939.",
    "transitionStep": 4
  },
  {
    "nuts": "HR061",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Međimurska županija (Čakovec / Medjumurje)",
    "capitalOrChefLieu": "Čakovec",
    "historicalRegion": "Međimurje",
    "keys": [
      "medimurska",
      "medjimurje",
      "cakovec",
      "mursko_sredisce",
      "prelog",
      "hr061"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Savska Banovina",
    "preNote": "Territorio alluvionale fertile tra i fiumi Mura e Drava; castello degli Zrinski a Čakovec, terra storicamente contesa col Regno d'Ungheria.",
    "postName": "Međimurje (Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska",
    "postNote": "Confluita nella Banovina Hrvatska dall'agosto 1939.",
    "transitionStep": 4
  },
  {
    "nuts": "HR062",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Varaždinska županija (Varaždin / Barokni grad)",
    "capitalOrChefLieu": "Varaždin",
    "historicalRegion": "Hrvatsko Zagorje",
    "keys": [
      "varazdinska",
      "varazdin",
      "ivanec",
      "novi_marof",
      "lepoglava",
      "hr062"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Savska Banovina",
    "preNote": "La \"Piccola Vienna\" croata per l'armonia dei palazzi barocchi e rococò; fortezza medievale di Stari Grad e carcere di Lepoglava.",
    "postName": "Varaždinska županija (Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska",
    "postNote": "Inclusa nella Banovina Hrvatska autonoma dall'agosto 1939.",
    "transitionStep": 4
  },
  {
    "nuts": "HR063",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Koprivničko-križevačka županija (Podravina / Križevci)",
    "capitalOrChefLieu": "Koprivnica",
    "historicalRegion": "Podravina",
    "keys": [
      "koprivnicko_krizevacka",
      "koprivnica",
      "krizevci",
      "djurdjevac",
      "podravina",
      "hr063"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Savska Banovina",
    "preNote": "Valle della Drava (Podravina) e antica città parlamentare di Križevci (sede della storica \"Dieta insanguinata\" del 1397); centro dell'arte naif a Hlebine.",
    "postName": "Podravina i Križevci (Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska",
    "postNote": "Inclusa nella Banovina Hrvatska autonoma dall'agosto 1939.",
    "transitionStep": 4
  },
  {
    "nuts": "HR064",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Krapinsko-zagorska županija (Hrvatsko Zagorje)",
    "capitalOrChefLieu": "Krapina",
    "historicalRegion": "Hrvatsko Zagorje",
    "keys": [
      "krapinsko_zagorska",
      "krapina",
      "zagorje",
      "trakošćan",
      "marija_bistrica",
      "kumrovec",
      "hr064"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Savska Banovina",
    "preNote": "Colline boscose dello Zagorje con il castello fiabesco di Trakošćan, santuario mariano nazionale di Marija Bistrica e villaggio natale di Josip Broz Tito a Kumrovec.",
    "postName": "Hrvatsko Zagorje (Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska",
    "postNote": "Inclusa nella Banovina Hrvatska autonoma dall'agosto 1939.",
    "transitionStep": 4
  },
  {
    "nuts": "HR021",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Bjelovarsko-bilogorska županija (Bjelovar / Bilogora)",
    "capitalOrChefLieu": "Bjelovar",
    "historicalRegion": "Slavonija",
    "keys": [
      "bjelovarsko_bilogorska",
      "bjelovar",
      "daruvar",
      "garesnica",
      "grubisno_polje",
      "hr021"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Savska Banovina",
    "preNote": "Altopiano collinare della Bilogora fondato come piazzaforte militare teresiana nel 1756; stazioni termali di Daruvar e presenza della minoranza ceca.",
    "postName": "Bjelovarsko-bilogorska županija (Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska",
    "postNote": "Inclusa nella Banovina Hrvatska autonoma dall'agosto 1939.",
    "transitionStep": 4
  },
  {
    "nuts": "HR022",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Virovitičko-podravska županija (Virovitica / Slatina)",
    "capitalOrChefLieu": "Virovitica",
    "historicalRegion": "Slavonija",
    "keys": [
      "viroviticko_podravska",
      "virovitica",
      "slatina",
      "orahovica",
      "papuk",
      "hr022"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Savska Banovina",
    "preNote": "Fascia di pianura podravina tra il monte Papuk e la riva destra della Drava al confine con l'Ungheria; castello Pejačević e coltivazione del tabacco.",
    "postName": "Virovitičko-podravska županija (Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska",
    "postNote": "Inclusa nella Banovina Hrvatska autonoma dall'agosto 1939.",
    "transitionStep": 4
  },
  {
    "nuts": "HR023",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Požeško-slavonska županija (Požega / Zlatna Dolina)",
    "capitalOrChefLieu": "Požega",
    "historicalRegion": "Slavonija",
    "keys": [
      "pozesko_slavonska",
      "pozega",
      "pakrac",
      "lipik",
      "zlatna_dolina",
      "hr023"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Savska Banovina",
    "preNote": "La \"Vallis Aurea\" cinta dai monti Psunj e Papuk; prestigiosa tradizione scolastica gesuitica a Požega e terme rinomate di Lipik.",
    "postName": "Požeško-slavonska županija (Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska",
    "postNote": "Inclusa nella Banovina Hrvatska autonoma dall'agosto 1939.",
    "transitionStep": 4
  },
  {
    "nuts": "HR024",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Brodsko-posavska županija (Slavonski Brod / Posavina)",
    "capitalOrChefLieu": "Slavonski Brod",
    "historicalRegion": "Slavonija",
    "keys": [
      "brodsko_posavska",
      "slavonski_brod",
      "nova_gradiska",
      "brod_na_savi",
      "hr024"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Savska Banovina",
    "preNote": "Imponente fortezza asburgica di Brod sulla riva sinistra della Sava dirimpetto alla Bosnia; stabilimento industriale e meccanico per locomotive Đuro Đaković.",
    "postName": "Brodsko-posavska županija (Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska",
    "postNote": "Inclusa nella Banovina Hrvatska autonoma dall'agosto 1939.",
    "transitionStep": 4
  },
  {
    "nuts": "HR025",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Osječko-baranjska županija (Osijek / Baranja)",
    "capitalOrChefLieu": "Osijek",
    "historicalRegion": "Slavonija / Baranja",
    "keys": [
      "osjecko_baranjska",
      "osijek",
      "baranja",
      "djakovo",
      "beli_manastir",
      "nasice",
      "hr025"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Savska Banovina",
    "preNote": "Metropoli della Slavonia orientale sul fiume Drava con la fortezza barocca di Tvrđa; cattedrale monumentale di Đakovo eretta dal vescovo Strossmayer e pianura della Baranja.",
    "postName": "Osječko-baranjska županija (Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska",
    "postNote": "Inclusa nella Banovina Hrvatska autonoma dall'agosto 1939.",
    "transitionStep": 4
  },
  {
    "nuts": "HR026",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Vukovarsko-srijemska županija (Vukovar / Vinkovci)",
    "capitalOrChefLieu": "Vukovar",
    "historicalRegion": "Srijem / Slavonija",
    "keys": [
      "vukovarsko_srijemska",
      "vukovar",
      "vinkovci",
      "ilok",
      "zupanja",
      "srijem_hr",
      "hr026"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Savska Banovina",
    "preNote": "Porto fluviale danubiano e castello Eltz a Vukovar; snodo ferroviario continentale cardinale a Vinkovci e vigneti medievali di Ilok affacciati sul Danubio.",
    "postName": "Vukovarsko-srijemska županija (Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska",
    "postNote": "Inclusa nella Banovina Hrvatska autonoma dall'agosto 1939.",
    "transitionStep": 4
  },
  {
    "nuts": "HR027",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Karlovačka županija (Karlovac / Città a Stella)",
    "capitalOrChefLieu": "Karlovac",
    "historicalRegion": "Kordun",
    "keys": [
      "karlovacka",
      "karlovac",
      "ogulin",
      "duga_resa",
      "slunj",
      "kordun",
      "hr027"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Savska Banovina",
    "preNote": "Città fortezza rinascimentale a stella a sei punte su quattro fiumi (Kupa, Korana, Mrežnica, Dobra); snodo verso il litorale adriatico e massiccio del Klek a Ogulin.",
    "postName": "Karlovačka županija (Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska",
    "postNote": "Inclusa nella Banovina Hrvatska autonoma dall'agosto 1939.",
    "transitionStep": 4
  },
  {
    "nuts": "HR028",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Sisačko-moslavačka županija (Sisak / Moslavina)",
    "capitalOrChefLieu": "Sisak",
    "historicalRegion": "Banovina / Moslavina",
    "keys": [
      "sisacko_moslavacka",
      "sisak",
      "kutina",
      "petrinja",
      "glina",
      "novska",
      "hr028"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Savska Banovina",
    "preNote": "Confluenza di Kupa e Sava con la fortezza triangolare della storica vittoria del 1593 contro i turchi; raffineria di petrolio di Sisak e colline vinicole di Moslavina.",
    "postName": "Sisačko-moslavačka županija (Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska",
    "postNote": "Inclusa nella Banovina Hrvatska autonoma dall'agosto 1939.",
    "transitionStep": 4
  },
  {
    "nuts": "HR032",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Ličko-senjska županija (Gospić / Senj / Velebit)",
    "capitalOrChefLieu": "Gospić",
    "historicalRegion": "Lika",
    "keys": [
      "licko_senjska",
      "gospic",
      "senj",
      "otocac",
      "plitvice",
      "velebit",
      "hr032"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Savska Banovina",
    "preNote": "Altopiano carsico della Lika e vette del Velebit; laghi fiabeschi di Plitvice, porto storico degli Uscocchi a Senj e città natale di Nikola Tesla a Smiljan.",
    "postName": "Ličko-senjska županija (Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska",
    "postNote": "Inclusa nella Banovina Hrvatska autonoma dall'agosto 1939.",
    "transitionStep": 4
  },
  {
    "nuts": "HR034",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Šibensko-kninska županija (Šibenik / Knin)",
    "capitalOrChefLieu": "Šibenik",
    "historicalRegion": "Dalmacija",
    "keys": [
      "sibensko_kninska",
      "sibenik",
      "knin",
      "krka",
      "skradin",
      "drnis",
      "hr034"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Primorska Banovina",
    "preNote": "Cattedrale di San Giacomo capolavoro rinascimentale di Giorgio da Sebenico sul fiordo della Krka; fortezza di Knin posta al confine tra Dalmazia, Bosnia e Lika.",
    "postName": "Šibensko-kninska županija (Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska",
    "postNote": "Inclusa nella Banovina Hrvatska autonoma dall'agosto 1939.",
    "transitionStep": 4
  },
  {
    "nuts": "HR035",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Splitsko-dalmatinska županija (Split / Palazzo di Diocleziano)",
    "capitalOrChefLieu": "Split",
    "historicalRegion": "Dalmacija",
    "keys": [
      "splitsko_dalmatinska",
      "split",
      "spalato",
      "trogir",
      "makarska",
      "sinj",
      "hvar",
      "brac",
      "hr035"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Primorska Banovina (Sedište Split)",
    "preNote": "Sede del Bano della Primorska Banovina fino al 1939; Palazzo di Diocleziano, cantiere navale Brodosplit, porto principale della Dalmazia centrale e isole di Brač e Hvar.",
    "postName": "Splitsko-dalmatinska županija (Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska",
    "postNote": "Centro marittimo ed economico della Banovina Hrvatska dall'agosto 1939.",
    "transitionStep": 4
  },
  {
    "nuts": "HR037",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Dubrovačko-neretvanska županija (Dubrovnik / Ragusa)",
    "capitalOrChefLieu": "Dubrovnik",
    "historicalRegion": "Dalmacija",
    "keys": [
      "dubrovacko_neretvanska",
      "dubrovnik",
      "ragusa",
      "korcula",
      "metkovic",
      "ploce",
      "peljesac",
      "hr037"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Zetska Banovina (do avg 1939)",
    "preNote": "L'antica Repubblica Marinara di Ragusa cinta da mura imponenti sul mare; aggregata alla Zetska Banovina fino all'accordo Cvetković-Maček del 26 agosto 1939.",
    "postName": "Dubrovački kotar (Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska",
    "postNote": "Riconnessa politicamente alla Croazia all'interno della Banovina Hrvatska autonoma.",
    "transitionStep": 4
  },
  {
    "nuts": "HR_HIST_PRIMORJE",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Litorale Croato e Gorski Kotar (Sušak / Krk / Rab)",
    "capitalOrChefLieu": "Sušak",
    "historicalRegion": "Hrvatsko Primorje",
    "keys": [
      "hr_hist_primorje",
      "croatian_littoral",
      "susak",
      "krk",
      "rab",
      "crikvenica",
      "delnice",
      "gorski_kotar",
      "vinodol"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Savska Banovina (Sušak)",
    "preNote": "Città di Sušak (porto gemello di Fiume sul fiume Eneo/Rječina), isole di Veglia (Krk) e Arbe (Rab); le confinanti Fiume, Cherso e Lussino costituivano la Provincia italiana del Carnaro.",
    "postName": "Hrvatsko Primorje (Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska",
    "postNote": "Incluso nella Banovina Hrvatska autonoma dal 1939.",
    "transitionStep": 4
  },
  {
    "nuts": "HR_HIST_ZADAR",
    "country": "HR",
    "defaultOwner": "YUG",
    "name": "Dalmazia Settentrionale (Benkovac / Nin / Pag)",
    "capitalOrChefLieu": "Benkovac",
    "historicalRegion": "Dalmacija",
    "keys": [
      "hr_hist_zadar",
      "zadar_dalmatia",
      "benkovac",
      "nin",
      "biograd",
      "ravni_kotari",
      "pag",
      "dugi_otok"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Primorska Banovina",
    "preNote": "Entroterra zaratino dei Ravni Kotari, Obrovac sul fiume Zrmanja e isole di Pag e Dugi Otok; la città di Zara costituiva un'enclave costiera fortificata del Regno d'Italia.",
    "postName": "Kotar Zadar-Benkovac (Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Banovina Hrvatska",
    "postNote": "Inclusa nella Banovina Hrvatska dall'agosto 1939.",
    "transitionStep": 4
  },
  {
    "nuts": "HR036",
    "country": "HR",
    "defaultOwner": "ITA",
    "name": "Provincia di Pola (Istria Italiana)",
    "capitalOrChefLieu": "Pola",
    "historicalRegion": "Istria",
    "keys": [
      "hr036",
      "pola",
      "pula",
      "istarska",
      "istria",
      "parenzo",
      "rovigno",
      "albona",
      "pisino"
    ],
    "preAdminTitle": "Regno d'Italia — Provincia di Pola (Istria)",
    "preNote": "Territorio metropolitano italiano annesso nel 1920 (Trattato di Rapallo): Pola base navale e anfiteatro romano, miniere di carbone dell'Arsa ad Albona, Parenzo e Rovigno."
  },
  {
    "nuts": "SI041",
    "country": "SI",
    "defaultOwner": "YUG",
    "name": "Osrednjeslovenska (Ljubljana / Dravska Banovina)",
    "capitalOrChefLieu": "Ljubljana",
    "historicalRegion": "Kranjska",
    "keys": [
      "osrednjeslovenska",
      "ljubljana",
      "lubiana",
      "drava_banovina",
      "sediste_drava",
      "kamnik",
      "vrhnika",
      "si041"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dravska Banovina (Sedište Ljubljana)",
    "preNote": "Capoluogo della Dravska Banovina sotto il Bano Marko Natlačen; città episcopale e culturale trasformata dagli interventi urbanistici dell'architetto Jože Plečnik."
  },
  {
    "nuts": "SI042",
    "country": "SI",
    "defaultOwner": "YUG",
    "name": "Gorenjska (Kranj / Linea Rupnik)",
    "capitalOrChefLieu": "Kranj",
    "historicalRegion": "Gorenjska",
    "keys": [
      "gorenjska",
      "kranj",
      "jesenice",
      "bled",
      "bohinj",
      "rupnikova_linija",
      "skofja_loka",
      "si042"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dravska Banovina (Gorenjska)",
    "preNote": "Alpi Giulie e Caravanche; acciaierie di Jesenice e lago di Bled; spina dorsale della Linea Rupnik (Rupnikova linija) con centinaia di bunker sotterranei a difesa dal Reich e dall'Italia."
  },
  {
    "nuts": "SI031",
    "country": "SI",
    "defaultOwner": "YUG",
    "name": "Pomurska (Murska Sobota / Prekmurje)",
    "capitalOrChefLieu": "Murska Sobota",
    "historicalRegion": "Prekmurje",
    "keys": [
      "pomurska",
      "murska_sobota",
      "lendava",
      "prekmurje",
      "mura_reka",
      "si031"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dravska Banovina (Prekmurje)",
    "preNote": "Regione d'oltre-Mura annessa alla Jugoslavia dopo la Prima Guerra Mondiale (Trattato del Trianon); pianura alluvionale agricola con minoranza magiara attorno a Lendava."
  },
  {
    "nuts": "SI032",
    "country": "SI",
    "defaultOwner": "YUG",
    "name": "Podravska (Maribor / Marburg an der Drau)",
    "capitalOrChefLieu": "Maribor",
    "historicalRegion": "Štajerska",
    "keys": [
      "podravska",
      "maribor",
      "marburg",
      "ptuj",
      "drava_maribor",
      "pohorje",
      "si032"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dravska Banovina (Štajerska)",
    "preNote": "Seconda città slovena sul fiume Drava con imponente polo industriale ferroviario e tessile; antica Ptuj e massiccio del Pohorje, territorio di frontiera con l'Austria (Ostmark tedesca)."
  },
  {
    "nuts": "SI033",
    "country": "SI",
    "defaultOwner": "YUG",
    "name": "Koroška (Dravograd / Carinzia Slovena)",
    "capitalOrChefLieu": "Ravne na Koroškem / Slovenj Gradec",
    "historicalRegion": "Koroška",
    "keys": [
      "koroska",
      "dravograd",
      "ravne",
      "slovenj_gradec",
      "mezica",
      "crna_na_koroskem",
      "si033"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dravska Banovina (Koroška)",
    "preNote": "Valli alpine della Meža e Mislinja; ricche miniere di piombo e zinco di Mežica e acciaierie di Ravne al confine con la Carinzia austriaca."
  },
  {
    "nuts": "SI034",
    "country": "SI",
    "defaultOwner": "YUG",
    "name": "Savinjska (Celje / Valle della Savinja)",
    "capitalOrChefLieu": "Celje",
    "historicalRegion": "Štajerska",
    "keys": [
      "savinjska",
      "celje",
      "cilli",
      "velenje",
      "zalec",
      "savinja",
      "si034"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dravska Banovina (Savinjska)",
    "preNote": "Città dei Conti di Celje (Cilli) con castello medievale; bacino carbonifero di Velenje e coltivazione del luppolo nella valle della Savinja."
  },
  {
    "nuts": "SI035",
    "country": "SI",
    "defaultOwner": "YUG",
    "name": "Zasavska (Trbovlje / Bacino Carbonifero)",
    "capitalOrChefLieu": "Trbovlje",
    "historicalRegion": "Zasavje",
    "keys": [
      "zasavska",
      "trbovlje",
      "zagorje_ob_savi",
      "hrastnik",
      "zasavje",
      "si035"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dravska Banovina (Zasavje)",
    "preNote": "Valle della Sava ricca di miniere di carbone scuro (Trbovlje, Zagorje, Hrastnik), vetrerie e centrali elettriche per l'alimentazione industriale di Lubiana e Zagabria."
  },
  {
    "nuts": "SI036",
    "country": "SI",
    "defaultOwner": "YUG",
    "name": "Posavska (Krško / Brežice)",
    "capitalOrChefLieu": "Krško",
    "historicalRegion": "Posavje",
    "keys": [
      "posavska",
      "krsko",
      "brezice",
      "sevnica",
      "kostanjevica_na_krki",
      "si036"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dravska Banovina (Posavje)",
    "preNote": "Bassa valle della Sava alla confluenza della Krka, castelli di Brežice e Mokrice e monastero cistercense di Kostanjevica na Krki."
  },
  {
    "nuts": "SI037",
    "country": "SI",
    "defaultOwner": "YUG",
    "name": "Jugovzhodna Slovenija (Novo Mesto / Dolenjska)",
    "capitalOrChefLieu": "Novo Mesto",
    "historicalRegion": "Dolenjska",
    "keys": [
      "jugovzhodna_slovenija",
      "novo_mesto",
      "kocevje",
      "dolenjska",
      "bela_krajina",
      "crnomelj",
      "si037"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dravska Banovina (Dolenjska)",
    "preNote": "Capoluogo della Bassa Carniola (Dolenjska) e Bela Krajina lungo il fiume Krka; foresta di Kočevje (Gottschee) popolata da una storica isola linguistica tedesca fin dal XIV secolo."
  },
  {
    "nuts": "SI038",
    "country": "SI",
    "defaultOwner": "YUG",
    "name": "Primorsko-notranjska (Postumia Jugoslava / Cerknica)",
    "capitalOrChefLieu": "Postojna / Ilirska Bistrica",
    "historicalRegion": "Notranjska",
    "keys": [
      "primorsko_notranjska",
      "postojna_yug",
      "cerknica",
      "ilirska_bistrica_yug",
      "pivka",
      "notranjska",
      "si038"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Dravska Banovina (Notranjska)",
    "preNote": "Carniola Interna carsica col lago intermittente di Cerknica; settore di confine italo-jugoslavo dove la linea di frontiera di Rapallo lasciava Postumia, Villa del Nevoso e San Pietro del Carso al Regno d'Italia."
  },
  {
    "nuts": "SI043",
    "country": "SI",
    "defaultOwner": "ITA",
    "name": "Provincia di Gorizia (Venezia Giulia Orientale)",
    "capitalOrChefLieu": "Gorizia",
    "historicalRegion": "Venezia Giulia",
    "keys": [
      "si043",
      "goriska",
      "gorizia",
      "isonzo",
      "tolmino",
      "caporetto",
      "idria",
      "aidussina"
    ],
    "preAdminTitle": "Regno d'Italia — Provincia di Gorizia",
    "preNote": "Territorio italiano del Trattato di Rapallo (1920): alta valle dell'Isonzo (Caporetto, Tolmino), miniere di mercurio di Idria e valle del Vipacco ad Aidussina."
  },
  {
    "nuts": "SI044",
    "country": "SI",
    "defaultOwner": "ITA",
    "name": "Provincia di Pola / Trieste (Capodistria e Carso)",
    "capitalOrChefLieu": "Capodistria / Trieste",
    "historicalRegion": "Istria / Carso",
    "keys": [
      "si044",
      "obalno_kraska",
      "koper",
      "capodistria",
      "pirano",
      "isola_d_istria",
      "sesana"
    ],
    "preAdminTitle": "Regno d'Italia — Province di Trieste e Pola",
    "preNote": "Istria costiera settentrionale e Carso di Sesana assegnati all'Italia: borghi veneti di Capodistria, Isola d'Istria e Pirano con le saline di Sicciole."
  },
  {
    "nuts": "BABIH",
    "country": "BA",
    "defaultOwner": "YUG",
    "name": "Federacija Bosne i Hercegovine (Sarajevo / Mostar / Tuzla)",
    "capitalOrChefLieu": "Sarajevo",
    "historicalRegion": "Bosna i Hercegovina",
    "keys": [
      "babih",
      "sarajevo",
      "mostar",
      "tuzla",
      "zenica",
      "travnik",
      "bihac",
      "livno"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Drinska i Primorska Banovina",
    "preNote": "Bosnia centrale, Erzegovina e bacini minerari di Tuzla e Zenica; divisa tra Drinska Banovina (Sarajevo) e Primorska Banovina (Mostar, Livno).",
    "postName": "Bosna (Sarajevo, Mostar i Banovina Hrvatska)",
    "postAdminTitle": "Kraljevina Jugoslavija — Drinska Banovina i Banovina Hrvatska",
    "postNote": "Nell'agosto 1939 Mostar, Travnik, Fojnica e la Posavina bosniaca confluirono nella Banovina Hrvatska autonoma.",
    "transitionStep": 4
  },
  {
    "nuts": "BASRP",
    "country": "BA",
    "defaultOwner": "YUG",
    "name": "Bosanska Krajina e Podrinje (Banja Luka / Trebinje / Bijeljina)",
    "capitalOrChefLieu": "Banja Luka",
    "historicalRegion": "Bosanska Krajina / Podrinje",
    "keys": [
      "basrp",
      "banja_luka",
      "trebinje",
      "bijeljina",
      "prijedor",
      "doboj",
      "foca",
      "visegrad"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Vrbaska Banovina (Sedište Banja Luka)",
    "preNote": "Sede della Vrbaska Banovina guidata da Svetislav Tisa Milosavljević a Banja Luka (chiesa del Redentore e Banski Dvor); comprende il Podrinje orientale e l'Erzegovina orientale di Trebinje (Zetska Banovina)."
  },
  {
    "nuts": "BABRC",
    "country": "BA",
    "defaultOwner": "YUG",
    "name": "Posavina (Srez Brčko / Corridoio sulla Sava)",
    "capitalOrChefLieu": "Brčko",
    "historicalRegion": "Posavina",
    "keys": [
      "babrc",
      "brcko",
      "posavina_brcko",
      "srez_brcko",
      "gunja"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Drinska Banovina (Srez Brčko)",
    "preNote": "Corridoio fluviale strategico e snodo mercantile della Posavina sulla riva destra della Sava, connettiere vitale tra la Bosnia nord-orientale, la Slavonia e la Sirmia."
  },
  {
    "nuts": "ME000",
    "country": "ME",
    "defaultOwner": "YUG",
    "name": "Crna Gora (Cetinje / Boka Kotorska / Zetska Banovina)",
    "capitalOrChefLieu": "Cetinje",
    "historicalRegion": "Crna Gora",
    "keys": [
      "me000",
      "crna_gora",
      "montenegro",
      "cetinje",
      "podgorica",
      "kotor",
      "cattaro",
      "boka_kotorska",
      "niksic",
      "bar",
      "ulcinj",
      "pljevlja"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Zetska Banovina (Sedište Cetinje)",
    "preNote": "Capitale storica a Cettigne (palazzo di Re Nicola I); Podgorica centro mercantile, massiccio del Durmitor e spettacolare fiordo fortificato delle Bocche di Cattaro (Boka Kotorska), base primaria della Reale Marina Jugoslava (Kraljevska mornarica)."
  },
  {
    "nuts": "MK008",
    "country": "MK",
    "defaultOwner": "YUG",
    "name": "Skopski region (Skoplje / Sedište Vardarske Banovine)",
    "capitalOrChefLieu": "Skoplje",
    "historicalRegion": "Vardarska Makedonija",
    "keys": [
      "mk008",
      "skopje",
      "skoplje",
      "vardar_skopje",
      "sediste_vardar",
      "kale_skopje"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Vardarska Banovina (Sedište Skoplje)",
    "preNote": "Capitale della Vardarska Banovina sul fiume Vardar dominata dalla fortezza di Kale e dal ponte ottomano di pietra; nodo ferroviario vitale verso Salonicco ed Egeo."
  },
  {
    "nuts": "MK001",
    "country": "MK",
    "defaultOwner": "YUG",
    "name": "Vardarski region (Veles / Kavadarci / Negotino)",
    "capitalOrChefLieu": "Veles",
    "historicalRegion": "Vardarska Makedonija",
    "keys": [
      "mk001",
      "veles",
      "kavadarci",
      "negotino",
      "tikves",
      "demir_kapija"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Vardarska Banovina",
    "preNote": "Valle centrale del Vardar e celebre bacino vinicolo di Tikveš; gola fortificata di Demir Kapija (\"Porta di Ferro\") e ponte ferroviario strategico."
  },
  {
    "nuts": "MK002",
    "country": "MK",
    "defaultOwner": "YUG",
    "name": "Istočen region (Štip / Kočani / Bregalnica)",
    "capitalOrChefLieu": "Štip",
    "historicalRegion": "Vardarska Makedonija",
    "keys": [
      "mk002",
      "stip",
      "kocani",
      "bregalnica",
      "delcevo",
      "berovo"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Vardarska Banovina",
    "preNote": "Valle della Bregalnica celebre per la battaglia del 1913; fortezza di Isar a Štip e risaie storiche di Kočani."
  },
  {
    "nuts": "MK003",
    "country": "MK",
    "defaultOwner": "YUG",
    "name": "Jugozapaden region (Ohrid / Struga / Lago di Ocrida)",
    "capitalOrChefLieu": "Ohrid",
    "historicalRegion": "Vardarska Makedonija",
    "keys": [
      "mk003",
      "ohrid",
      "struga",
      "kicevo",
      "debar",
      "liqeni_i_ohrit"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Vardarska Banovina",
    "preNote": "Patrimonio storico e spirituale slavo con 365 chiese sul Lago di Ocrida; monastero di San Naum e fortezza dello zar Samuele."
  },
  {
    "nuts": "MK004",
    "country": "MK",
    "defaultOwner": "YUG",
    "name": "Jugoistočen region (Strumica / Radoviš / Gevgelija)",
    "capitalOrChefLieu": "Strumica",
    "historicalRegion": "Vardarska Makedonija",
    "keys": [
      "mk004",
      "strumica",
      "gevgelija",
      "radovis",
      "valandovo",
      "dojran"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Vardarska Banovina",
    "preNote": "Piana fertile di Strumica e frontiera di Gevgelija con la Grecia; coltivazione precoce di ortaggi, tabacco e cotone."
  },
  {
    "nuts": "MK005",
    "country": "MK",
    "defaultOwner": "YUG",
    "name": "Pelagoniski region (Bitolj / Monastir / Prilep)",
    "capitalOrChefLieu": "Bitolj",
    "historicalRegion": "Pelagonija",
    "keys": [
      "mk005",
      "bitola",
      "bitolj",
      "monastir",
      "prilep",
      "pelagonija",
      "heraclea"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Vardarska Banovina",
    "preNote": "La \"Città dei Consoli\" a Bitolj (antica Monastir ottomana) con l'accademia militare frequentata da Atatürk; piana di Pelagonia e torri di re Marko a Prilep."
  },
  {
    "nuts": "MK006",
    "country": "MK",
    "defaultOwner": "YUG",
    "name": "Pološki region (Tetovo / Gostivar / Šar Planina)",
    "capitalOrChefLieu": "Tetovo",
    "historicalRegion": "Polog",
    "keys": [
      "mk006",
      "tetovo",
      "gostivar",
      "sar_planina",
      "mavrovo",
      "polog"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Vardarska Banovina",
    "preNote": "Conca del Polog cinta dalle cime innevate della Šar Planina; celebre Moschea Dipinta (Šarena Džamija) a Tetovo e sorgenti del Vardar a Vrutok."
  },
  {
    "nuts": "MK007",
    "country": "MK",
    "defaultOwner": "YUG",
    "name": "Severoistočen region (Kumanovo / Kratovo / Kriva Palanka)",
    "capitalOrChefLieu": "Kumanovo",
    "historicalRegion": "Vardarska Makedonija",
    "keys": [
      "mk007",
      "kumanovo",
      "kratovo",
      "kriva_palanka",
      "osogovo"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Vardarska Banovina",
    "preNote": "Teatro della decisiva battaglia di Kumanovo (1912) che pose fine a cinque secoli di dominio ottomano; monastero di San Procoro di Pčinja e città dei ponti di Kratovo."
  },
  {
    "nuts": "YUG_HIST_KOSOVO",
    "country": "XK",
    "defaultOwner": "YUG",
    "name": "Kosovo i Metohija (Priština / Prizren / Peć)",
    "capitalOrChefLieu": "Priština",
    "historicalRegion": "Kosovo i Metohija",
    "keys": [
      "yug_hist_kosovo",
      "kosovo",
      "metohija",
      "pristina",
      "prizren",
      "pec",
      "kosovska_mitrovica",
      "dakovica",
      "gracanica",
      "decani"
    ],
    "preAdminTitle": "Kraljevina Jugoslavija — Vardarska, Moravska i Zetska Banovina",
    "preNote": "Campo di battaglia di Kosovo Polje (1389); monastero di Gračanica, Patriarcato di Peć e Visoki Dečani (sede spirituale della Chiesa Serba); Prizren e le ricche miniere di piombo e zinco di Trepča a Kosovska Mitrovica."
  }
];

/**
 * Risolutore toponomastico, amministrativo e temporale di alta precisione
 * per tutti i 225 distretti dell'area balcanica e danubiana (1936-1940).
 */
export function resolveBalkansToponym(
  id: string,
  rawName: string,
  normKey: string,
  owner: string,
  yearStep?: number
): { name: string; adminTitle?: string; note?: string; owner?: string } | null {
  const step = yearStep !== undefined ? yearStep : 0;
  const cleanId = String(id || '').trim();

  // 1. Ricerca diretta per codice univoco NUTS-3
  let found = BALKAN_DISTRICTS_CATALOG.find(
    (d) => d.nuts === cleanId || cleanId.startsWith(d.nuts)
  );

  // 2. Ricerca per toponimo, chiavi secondarie e varianti storiche
  if (!found) {
    const normTokens = normKey.split('_').filter(Boolean);
    for (const d of BALKAN_DISTRICTS_CATALOG) {
      if (
        d.keys.some(
          (k) =>
            normKey === k ||
            normTokens.includes(k) ||
            (k.length >= 5 && normKey.includes(k)) ||
            (normKey.length >= 5 && k.includes(normKey))
        )
      ) {
        found = d;
        break;
      }
    }
  }

  if (!found) return null;

  const d = found;

  // 3. APR 1941 (Step >= 8): Invasione dell'Asse e smembramento della Jugoslavia (Operazione 25) + Operazione Marita in Grecia
  if (step >= 8) {
    // A. JUGOSLAVIA SMEMBRATA (HR, SI, BA, RS, ME, MK, XK)
    if (
      d.country === 'BA' ||
      d.country === 'HR' ||
      d.country === 'SI' ||
      d.country === 'RS' ||
      d.country === 'ME' ||
      d.country === 'MK' ||
      d.country === 'XK'
    ) {
      // 1. Bosnia ed Erzegovina -> Stato Indipendente di Croazia (NDH)
      if (d.country === 'BA') {
        if (d.nuts === 'BABIH') {
          return {
            name: 'Sarajevo & Mostar (NDH — Velike župe Vrhbosna i Hum)',
            adminTitle: 'Nezavisna Država Hrvatska (NDH) — Velike župe Vrhbosna (Sarajevo) i Hum (Mostar)',
            note: 'Con lo smembramento della Jugoslavia nell\'aprile 1941, l\'intera Bosnia ed Erzegovina viene annessa allo Stato Indipendente di Croazia (NDH) di Ante Pavelić. Sarajevo (Vrhbosna) cade il 15 aprile 1941; la linea di demarcazione di Vienna (21-22 aprile) divide il territorio tra zona di presidio militare tedesco a nord-est e italiano a sud-ovest (Mostar).',
            owner: 'CRO',
          };
        }
        if (d.nuts === 'BASRP') {
          return {
            name: 'Banja Luka & Bosanska Krajina (NDH — Velika župa Sana i Luka)',
            adminTitle: 'Nezavisna Država Hrvatska (NDH) — Velike župe Sana i Luka (Banja Luka), Krbava-Psat i Usora-Soli',
            note: 'Incorporata nello Stato Indipendente di Croazia (NDH) nell\'aprile 1941; Banja Luka viene designata da Ante Pavelić e dal vice-primo ministro Osman Kulenović come centro direzionale nel cuore geografico dello Stato, divenendo teatro di feroci persecuzioni del regime Ustaša.',
            owner: 'CRO',
          };
        }
        return {
          name: 'Posavina — Brčko (NDH — Velika župa Posavje)',
          adminTitle: 'Nezavisna Država Hrvatska (NDH) — Velika župa Posavje (Brod / Brčko)',
          note: 'Corridoio fluviale strategico sulla Sava annesso allo Stato Indipendente di Croazia (NDH) nella Velika župa Posavje sotto presidio lungo le linee ferroviarie della Wehrmacht.',
          owner: 'CRO',
        };
      }

      // 2. Territori annessi all'Ungheria (Délvidék: Bácska, Baranja, Međimurje, Prekmurje)
      if (
        d.nuts === 'RS121' ||
        d.nuts === 'RS123' ||
        d.nuts === 'RS125' ||
        d.nuts === 'HR061' ||
        d.nuts === 'SI031' ||
        owner === 'HUN'
      ) {
        return {
          name: `${d.capitalOrChefLieu} (Délvidék / Bácska, Muraköz és Muravidék — Ungheria)`,
          adminTitle: 'Magyar Királyság — Visszacsatolt Délvidéki Területek (3ª Armata Ungherese)',
          note: 'L\'11 aprile 1941, all\'indomani della proclamazione della Croazia indipendente e del tragico suicidio del Primo Ministro conte Pál Teleki (3 aprile), la 3ª Armata ungherese occupa la Bácska (Subotica/Szabadka, Sombor/Zombor, Novi Sad/Újvidék), la Baranja, il Međimurje (Muraköz) e l\'Oltremura (Muravidék).',
          owner: 'HUN',
        };
      }

      // 3. Territori annessi alla Bulgaria (Macedonia del Vardar & Pomoravie)
      if (
        (d.country === 'MK' && d.nuts !== 'MK006' && d.nuts !== 'MK003' && owner !== 'ITA') ||
        d.nuts === 'RS226' ||
        d.nuts === 'RS228' ||
        owner === 'BUL'
      ) {
        return {
          name: `${d.capitalOrChefLieu} (Vardarska Makedonija / Pomoravie — Occupazione Bulgara)`,
          adminTitle: 'Tsarstvo Balgariya — Skopska i Bitolska Oblast (5ª Armata Bulgara — Zar Boris III)',
          note: 'In seguito all\'adesione della Bulgaria al Patto Tripartito (1 marzo 1941) e al crollo della Jugoslavia, il 19 aprile 1941 la 5ª Armata bulgara entra in Macedonia del Vardar (Skopje, Bitola, Veles, Prilep, Štip, Kumanovo) e nei distretti serbi di confine (Pirot, Bosilegrad, Vranje), annettendoli de facto al Regno di Bulgaria.',
          owner: 'BUL',
        };
      }

      // 4. Territori annessi o occupati dall'Italia (Lubiana, Dalmazia, Montenegro, Grande Albania)
      if (
        d.country === 'XK' ||
        d.nuts === 'MK006' ||
        d.nuts === 'MK003'
      ) {
        return {
          name: `${d.capitalOrChefLieu} (Grande Albania / Shqipëria e Madhe — Corona d'Italia)`,
          adminTitle: "Regno d'Albania (Unione Personale con il Regno d'Italia — Luogotenente Francesco Jacomoni)",
          note: 'In seguito allo smembramento della Jugoslavia (aprile 1941) e agli accordi di Vienna tra Ciano e Ribbentrop, la Metohija, la maggior parte del Kosovo (Prizren, Peć, Pristina) e la Macedonia occidentale albanofona (Tetovo, Gostivar, Debar, Struga) vengono annesse al Regno d\'Albania sotto la Corona italiana.',
          owner: 'ITA',
        };
      }
      if (d.country === 'ME') {
        return {
          name: 'Montenegro e Provincia di Cattaro (Protettorato Italiano — Cettigne)',
          adminTitle: "Regno d'Italia — Alto Commissariato per il Montenegro (Serafino Mazzolini) & Provincia di Cattaro",
          note: 'Occupato dal Regio Esercito il 17 aprile 1941: le Bocche di Cattaro (Boka Kotorska) vengono annesse direttamente all\'Italia come Provincia di Cattaro (Governatorato della Dalmazia), mentre il Montenegro (Cettigne, Podgorica) è costituito in Governatorato/Protettorato italiano sotto l\'Alto Commissario Serafino Mazzolini.',
          owner: 'ITA',
        };
      }
      if (d.nuts === 'SI041' || d.nuts === 'SI037') {
        return {
          name: d.nuts === 'SI041'
            ? 'Provincia di Lubiana (Ljubljana — Annessione Italiana 1941)'
            : 'Novo Mesto e Bassa Carniola (Provincia Italiana di Lubiana)',
          adminTitle: "Regno d'Italia — Provincia Autonoma di Lubiana (Alto Commissario Emilio Grazioli)",
          note: 'Occupata dall\'11ª e 2ª Armata italiana l\'11 aprile 1941 durante l\'Operazione 25 e formalmente annessa al Regno d\'Italia come Provincia di Lubiana (R.D.L. 3 maggio 1941) sotto l\'Alto Commissario Emilio Grazioli.',
          owner: 'ITA',
        };
      }
      if (d.nuts === 'SI038' || d.nuts === 'SI043' || d.nuts === 'SI044' || d.nuts === 'HR036') {
        return {
          name: d.name,
          adminTitle: d.preAdminTitle,
          note: d.preNote,
          owner: 'ITA',
        };
      }
      if (d.nuts === 'HR031' || d.nuts === 'HR_HIST_PRIMORJE') {
        return {
          name: 'Fiume, Sušak, Veglia e Castua (Provincia del Carnaro Ampliata)',
          adminTitle: "Regno d'Italia — Provincia del Carnaro (Intendenza Civile per i Territori Annessi del Fiumano e della Kupa)",
          note: 'Nell\'aprile 1941 il Regio Esercito oltrepassa il confine sul fiume Eneo, occupando Sušak, Buccari, Veglia (Krk), Arbe (Rab) e l\'entroterra di Čabar fino alla Kupa, aggregati alla Provincia italiana del Carnaro.',
          owner: 'ITA',
        };
      }
      if (d.nuts === 'HR033' || d.nuts === 'HR_HIST_ZADAR' || d.nuts === 'HR034' || d.nuts === 'HR035') {
        return {
          name: `${d.capitalOrChefLieu} (Governatorato della Dalmazia — Annessione Italiana 1941)`,
          adminTitle: "Regno d'Italia — Governatorato della Dalmazia (Governatore Giuseppe Bastianini — Zara, Spalato, Cattaro)",
          note: 'Con il crollo della Jugoslavia nell\'aprile 1941 e i Patti di Roma, l\'Italia annette gran parte della costa e delle isole dalmate (Zara, Sebenico, Traù, Spalato, Curzola e Cattaro) istituendo il Governatorato della Dalmazia affidato a Giuseppe Bastianini.',
          owner: 'ITA',
        };
      }

      // 5. Territori sloveni annessi al Terzo Reich (CdZ-Gebiete Untersteiermark & Oberkrain)
      if (d.country === 'SI') {
        return {
          name: `${d.capitalOrChefLieu} (CdZ-Gebiet Untersteiermark / Oberkrain — Deutsches Reich)`,
          adminTitle: 'Deutsches Reich — Chef der Zivilverwaltung in der Untersteiermark (Uiberreither) & Oberkrain (Rainer)',
          note: 'Occupata dalla 2ª Armata tedesca (Generalfeldmarschall von Weichs) nell\'aprile 1941: la Stiria slovena (Marburg an der Drau / Maribor, Celje, Ptuj) e l\'Alta Carniola (Kranj, Bled) vengono poste sotto Amministrazione Civile tedesca (CdZ-Gebiete) per l\'incorporazione nei Reichsgaue Steiermark e Kärnten.',
          owner: 'GER',
        };
      }

      // 6. Stato Indipendente di Croazia (NDH — Zagabria, Slavonia, Lika, Ragusa, Sirmia)
      if (d.country === 'HR' || d.nuts === 'RS127' || owner === 'CRO') {
        if (d.nuts === 'HR050') {
          return {
            name: 'Zagreb (Glavni grad NDH — Poglavnik Ante Pavelić)',
            adminTitle: 'Nezavisna Država Hrvatska (NDH) — Glavni grad Zagreb (Poglavnik Ante Pavelić / Slavko Kvaternik)',
            note: 'Proclamazione dello Stato Indipendente di Croazia (10 aprile 1941) da parte del colonnello Slavko Kvaternik all\'ingresso della 14ª Panzer-Division tedesca, seguito il 15 aprile dall\'insediamento a Zagabria del Poglavnik Ante Pavelić e del regime degli Ustaša.',
            owner: 'CRO',
          };
        }
        if (d.nuts === 'RS127') {
          return {
            name: 'Srijem — Zemun i Sremska Mitrovica (NDH — Velika župa Vuka)',
            adminTitle: 'Nezavisna Država Hrvatska (NDH) — Velika župa Vuka (Vukovar / Zemun)',
            note: 'La Sirmia orientale (Srem/Srijem) fino a Zemun, alle porte di Belgrado sulla riva sinistra della Sava, viene annessa allo Stato Indipendente di Croazia (NDH) sotto amministrazione Ustaša e tutela della minoranza Volksdeutsche.',
            owner: 'CRO',
          };
        }
        return {
          name: `${d.capitalOrChefLieu} (${d.historicalRegion} — NDH)`,
          adminTitle: 'Nezavisna Država Hrvatska (NDH — Stato Indipendente di Croazia, Poglavnik Ante Pavelić)',
          note: `Incorporato nello Stato Indipendente di Croazia (NDH) proclamato il 10 aprile 1941 sotto il regime Ustaša di Ante Pavelić. ${d.preNote}`,
          owner: 'CRO',
        };
      }

      // 7. Serbia & Banato sotto Occupazione Militare Tedesca (Militärbefehlshaber in Serbien)
      if (d.nuts === 'RS110') {
        return {
          name: 'Belgrad (Befehlshaber Serbien — Occupazione Militare Tedesca)',
          adminTitle: 'Militärbefehlshaber in Serbien (Gen. Helmuth Förster / Ludwig von Schröder) — Komesarska uprava Milana Aćimovića',
          note: 'Devastata dal bombardamento aereo della Luftwaffe il 6-7 aprile 1941 (Operazione Castigo / Unternehmen Strafgericht) e occupata il 12 aprile dalle avanguardie delle Waffen-SS e della 1ª Panzergruppe di von Kleist. Il 17 aprile 1941 vi viene firmata la resa incondizionata dell\'Esercito Reale Jugoslavo; posta sotto amministrazione militare diretta della Wehrmacht con il Consiglio dei Commissari collaborazionista di Milan Aćimović.',
          owner: 'GER',
        };
      }
      if (d.nuts === 'RS122' || d.nuts === 'RS124' || d.nuts === 'RS126') {
        return {
          name: `${d.capitalOrChefLieu} (Autonomer Banat — Volksdeutsche Verwaltung / Serbien)`,
          adminTitle: 'Militärbefehlshaber in Serbien — Autonome Verwaltung des Banats (Vizebanus Sepp Janko — Großbetschkerek)',
          note: 'Il Banato serbo (Petrovgrad/Großbetschkerek, Pančevo, Vršac, Kikinda), pur formalmente incluso nel territorio del Comando Militare in Serbia, viene affidato dall\'aprile 1941 all\'amministrazione autonoma diretta della minoranza tedesca locale (Volksdeutsche guidati da Sepp Janko).',
          owner: 'GER',
        };
      }
      return {
        name: `${d.capitalOrChefLieu} (Gebiet des Militärbefehlshabers in Serbien)`,
        adminTitle: 'Militärbefehlshaber in Serbien — Savet komesara (Milan Aćimović)',
        note: 'Posta sotto occupazione militare diretta della Wehrmacht (aprile 1941) per garantire il controllo strategico del corridoio ferroviario danubiano-moravico verso Salonicco e lo sfruttamento intensivo delle miniere di rame di Bor e di piombo-zinco di Trepča.',
        owner: 'GER',
      };
    }

    // B. GRECIA INVASA E OCCUPATA (Operazione Marita — EL)
    if (d.country === 'EL' && d.nuts !== 'EL421') {
      // 1. Isola di Creta: Bastione del Governo Reale Greco e del Commonwealth (Alleati)
      if (
        d.nuts === 'EL431' ||
        d.nuts === 'EL432' ||
        d.nuts === 'EL433' ||
        d.nuts === 'EL434' ||
        owner === 'GRE'
      ) {
        return {
          name: `${d.capitalOrChefLieu} (Fortezza di Creta — Re Giorgio II & Creforce Alleata)`,
          adminTitle: 'Vasileion tis Ellados (Governo Reale a La Canea — PM Emmanouil Tsouderos & Gen. Bernard Freyberg)',
          note: 'Dopo la caduta di Atene (27 aprile 1941), Re Giorgio II, il Primo Ministro Emmanouil Tsouderos e le truppe del Commonwealth evacuate dal continente (Operazione Demon) si attestano a Creta (La Canea / Baia di Suda) sotto il comando del generale neozelandese Bernard Freyberg (Creforce), preparando la difesa contro l\'imminente assalto aviotrasportato tedesco (Operazione Merkur, maggio 1941).',
          owner: 'GRE',
        };
      }

      // 2. Tracia Occidentale e Macedonia Orientale occupate dalla Bulgaria (Belomorie)
      if (
        d.nuts === 'EL512' ||
        d.nuts === 'EL513' ||
        d.nuts === 'EL514' ||
        d.nuts === 'EL515' ||
        d.nuts === 'EL526' ||
        owner === 'BUL'
      ) {
        return {
          name: `${d.capitalOrChefLieu} (Belomorie / Tracia e Macedonia Orientale — Occupazione Bulgara)`,
          adminTitle: 'Tsarstvo Balgariya — Belomorska Oblast (2ª Armata Bulgara — Ksanthi / Kavala)',
          note: 'Il 20 aprile 1941, dopo lo sfondamento della Linea Metaxas da parte della 12ª Armata tedesca del feldmaresciallo Wilhelm List, le truppe bulgare occupano la Tracia occidentale e la Macedonia orientale greca tra i fiumi Strimone e Maritsa (Serres, Drama, Kavala, Xanthi, Komotini e l\'isola di Taso), realizzando lo sbocco bulgaro sul Mar Egeo (Belomorie).',
          owner: 'BUL',
        };
      }

      // 3. Zone strategiche sotto Occupazione Militare Tedesca (Atene/Pireo, Salonicco, Evros, Egeo Settentrionale)
      if (
        d.nuts.startsWith('EL30') ||
        d.nuts === 'EL521' ||
        d.nuts === 'EL522' ||
        d.nuts === 'EL523' ||
        d.nuts === 'EL524' ||
        d.nuts === 'EL525' ||
        d.nuts === 'EL527' ||
        d.nuts === 'EL533' ||
        d.nuts === 'EL511' ||
        d.nuts === 'EL411' ||
        d.nuts === 'EL413' ||
        owner === 'GER'
      ) {
        if (d.nuts.startsWith('EL30')) {
          return {
            name: `${d.capitalOrChefLieu} (Atene & Pireo — Occupazione Tedesca / Governo Tsolakoglou)`,
            adminTitle: 'Befehlshaber Süd-Griechenland (Athen) & Elliniki Politeia (Gen. Georgios Tsolakoglou)',
            note: 'OPERAZIONE MARITA (27 aprile 1941): Le truppe della 12ª Armata tedesca entrano ad Atene issando la bandiera di guerra del Reich sull\'Acropoli. Dopo il suicidio del Primo Ministro Alexandros Koryzis (18 aprile) e il trasferimento di Re Giorgio II a Creta, il generale Georgios Tsolakoglou insedia ad Atene il governo collaborazionista dello Stato Ellenico.',
            owner: 'GER',
          };
        }
        if (d.nuts === 'EL522') {
          return {
            name: 'Saloniki (Befehlshaber Saloniki-Ägäis — Occupazione Militare Tedesca)',
            adminTitle: 'Wehrmachtbefehlshaber Südost — Befehlshaber Saloniki-Ägäis (12ª Armata — Gen. Wilhelm List)',
            note: 'Occupata il 9 aprile 1941 dalla 2ª Panzer-Division tedesca dopo l\'aggiramento della Linea Metaxas attraverso la valle del Vardar; sede del Comando Militare Tedesco Salonicco-Egeo con giurisdizione sulla Macedonia centrale, sul Monte Athos, sulle isole di Lemno, Lesbo e Chio e sulla frontiera dell\'Evros con la Turchia.',
            owner: 'GER',
          };
        }
        return {
          name: `${d.capitalOrChefLieu} (Zona d'Occupazione Militare Tedesca — Befehlshaber Saloniki-Ägäis)`,
          adminTitle: 'Befehlshaber Saloniki-Ägäis (Occupazione Militare della Wehrmacht — Operazione Marita)',
          note: 'Settore strategico greco mantenuto sotto controllo militare diretto della Wehrmacht (aprile 1941) al termine dell\'Operazione Marita per il presidio dei porti dell\'Egeo settentrionale, degli accessi ai Dardanelli e della frontiera terrestre con la Turchia neutrale.',
          owner: 'GER',
        };
      }

      // 4. Zona d'Occupazione Italiana in Grecia (Isole Ionie, Epiro, Tessaglia, Grecia Centrale, Peloponneso, Cicladi, Samo)
      if (d.nuts.startsWith('EL62')) {
        return {
          name: `${d.capitalOrChefLieu} (Isole Ionie — Occupazione e Amministrazione Civile Italiana)`,
          adminTitle: "Regno d'Italia — Affari Civili per le Isole Ionie (Corfù, Cefalonia, Zante, Santa Maura)",
          note: 'Occupate dalle forze italiane tra il 20 e il 30 aprile 1941 e sottoposte a un\'amministrazione civile speciale italiana separata da Atene in vista della progettata annessione al Regno d\'Italia.',
          owner: 'ITA',
        };
      }
      return {
        name: `${d.capitalOrChefLieu} (Zona d'Occupazione Italiana in Grecia — 11ª Armata)`,
        adminTitle: "Regno d'Italia — Comando Superiore Forze Armate Grecia (11ª Armata — Gen. Carlo Geloso) / Elliniki Politeia",
        note: 'A conclusione della campagna italo-greca e dell\'Operazione Marita (resa dell\'Armata dell\'Epiro del 20-23 aprile 1941), la maggior parte della Grecia continentale (Epiro, Tessaglia, Grecia Centrale con le Termopili, Eubea, Peloponneso) e delle Cicladi passa sotto il controllo d\'occupazione dell\'11ª Armata italiana.',
        owner: 'ITA',
      };
    }
  }

  // 4. Verifica mutazioni temporali dinamiche (es. Banovina Hrvatska step >= 4, Albania step >= 4, Romania 1940 step >= 6)
  if (d.transitionStep !== undefined && step >= d.transitionStep) {
    return {
      name: d.postName || d.name,
      adminTitle: d.postAdminTitle || d.preAdminTitle,
      note: d.postNote || d.preNote,
      owner: d.postOwner || d.defaultOwner,
    };
  }

  return {
    name: d.name,
    adminTitle: d.preAdminTitle,
    note: d.preNote,
    owner: d.defaultOwner,
  };
}
