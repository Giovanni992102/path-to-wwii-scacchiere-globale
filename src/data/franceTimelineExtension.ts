import { FactionType, ResolvedTerritory } from '../types';

/**
 * Estensione Geostorica e Cronologica Integrale della Francia Metropolitana e d'Oltremare
 * (Steps 9–19: DIC 1941 -> SET 1947 — 96 Dipartimenti Metropolitani + 5 DOM/TOM + Guiana Storica).
 *
 * - Steps 9–10 (DIC 1941 – AGO 1942): Quadripartizione armistiziale consolidata, Raid su Dieppe (ago 1942),
 *   lavori forzati dell'Organizzazione Todt sul Vallo Atlantico e nascita della Resistenza unificata.
 * - Steps 11–12 (NOV 1942 – LUG 1943): Operazione Anton (11 nov 1942), fine della Zone Libre,
 *   occupazione italiana a est del Rodano e Corsica, autoaffondamento di Tolone (27 nov 1942),
 *   ralliement di Réunion (nov 1942) e Antille/Guyana al CFLN (mar–lug 1943), STO e nascita del CNR (Lione).
 * - Step 13 (SET 1943): Corsica primo dipartimento metropolitano liberato (Casabianca & VII Corpo),
 *   subentro Wehrmacht (Operazione Achse) sull'intera Francia continentale.
 * - Step 14 (GIU 1944): Operazione Overlord (Manche USA, Calvados UK), terrore antipartigiano
 *   (Oradour-sur-Glane, Tulle, Vercors, Glières, Mont-Mouchet) e rete ferroviaria paralizzata.
 * - Step 15 (AGO 1944): Liberazione di Parigi (Leclerc, 25 ago), sacca di Falaise, Operazione Dragoon in Provenza
 *   (Tolone, Marsiglia 28 ago) e Alsazia-Mosella ancora sotto il Reich (CdZ-Gebiete).
 * - Step 16 (DIC 1944): Strasburgo (2e DB) e Metz (Patton) liberate dal GPRF vs Sacca di Colmar (FRF12 GER)
 *   e Tasche Atlantiche (Lorient FRH04, Saint-Nazaire FRG01, La Rochelle FRI32, Dunkerque).
 * - Step 17 (APR 1945): Liberazione dell'Alsazia (fine sacca di Colmar, feb 1945), passaggio del Reno,
 *   prime elezioni municipali con voto alle donne (29 apr 1945) e assedio finale alle tasche atlantiche.
 * - Step 18 (SET 1945): Francia interamente liberata (rese di maggio 1945), processi di Vichy,
 *   referendum Costituente e varo di Sécurité Sociale & nazionalizzazioni (Renault, banche, energia).
 * - Step 19 (SET 1947): Quatrième République (Pres. Vincent Auriol · PM Paul Ramadier), Piano Monnet,
 *   rottura del Tripartitismo (mag 1947), Trattato di Parigi 15 set 1947 (Briga e Tenda, Moncenisio,
 *   Chaberton/Montgenèvre) e Legge di Dipartimentalizzazione d'Oltremare (DOM).
 */

export type FrancePartitionType =
  | 'zone_occupee'
  | 'zone_libre'
  | 'alsace_moselle'
  | 'belgium_command'
  | 'dom_tom';

export interface FranceExtendableMeta {
  nuts: string;
  name: string;
  historicalName: string;
  cheflieu: string;
  region: string;
  deptNum: string;
  partition1940: FrancePartitionType;
}

interface FranceDeptLateProfile {
  s9_10?: string;
  s11_12?: string;
  s13?: string;
  s14?: string;
  s15?: string;
  s16?: string;
  s17?: string;
  s18?: string;
  s19?: string;
  hist14?: string;
  hist15?: string;
  hist16?: string;
  hist17?: string;
  hist18?: string;
  hist19?: string;
}

const FRANCE_ITALIAN_ZONE_1942 = new Set<string>([
  'FRM01', 'FRM02', 'FRK27', 'FRK28', 'FRK24', 'FRL02', 'FRK23', 'FRL01', 'FRL03', 'FRL05', 'FRL06',
]);

const FRANCE_ATLANTIC_POCKETS_16_17 = new Set<string>([]);

interface CoastalPocketProfile {
  id: string;
  preName: string;
  baseName: string;
  parentLabel: string;
  occAdmin: string;
  s0_1: string;
  s2_4: string;
  s5: string;
  s6: string;
  s7: string;
  s8_9: string;
  s10_11: string;
  s12_13: string;
  s14: string;
  siege15: string;
  siege16: string;
  apr45Status: 'GER' | 'FRA';
  apr45Note: string;
  postNote18: string;
  s19: string;
  s20: string;
  s21: string;
  s22: string;
  surrenderLabel: string;
}

const FRANCE_COASTAL_POCKET_PROFILES: Record<string, CoastalPocketProfile> = {
  FR_HIST_POCHE_DUNKERQUE: {
    id: 'FR_HIST_POCHE_DUNKERQUE',
    preName: 'Dunkerque / Littoral des Flandres',
    baseName: 'Poche de Dunkerque',
    parentLabel: 'Nord — Settore Costiero di Dunkerque / Gravelines / Bergues',
    occAdmin: 'Zone rattachée — Militärverwaltung in Belgien und Nordfrankreich (Brüssel)',
    s0_1: 'Terzo porto commerciale di Francia sul Mare del Nord (cantieri degli Ateliers et Chantiers de France e raffinerie); agitazioni operaie e scioperi del Fronte Popolare nel maggio–giugno 1936.',
    s2_4: 'Piazzaforte marittima della Terza Repubblica a guardia dello Stretto di Dover: rafforzamento delle batterie costiere di Zuydcoote e del Settore Difensivo delle Fiandre tra Gravelines e Bergues.',
    s5: 'Drôle de guerre (sett. 1939 – mag. 1940): mobilitazione del Settore Fortificato delle Fiandre (SF Flandres); Dunkerque funge da scalo marittimo e logistico per la 1ª Armata francese e la BEF britannica.',
    s6: 'Dopo l\'evacuazione anglo-francese dell\'Operazione Dynamo (26 maggio – 4 giugno 1940, oltre 338.000 uomini tratti in salvo), Dunkerque cade alla Wehrmacht ed è aggregata all\'amministrazione militare di Bruxelles (Belgien und Nordfrankreich).',
    s7: 'Autunno 1940: durante la Battaglia d\'Inghilterra e la sospesa Operazione Seelöwe, la Kriegsmarine installa a Dunkerque flottiglie di Schnellboote e dragamine contro i convogli nella Manica.',
    s8_9: 'Nel 1941 il porto di Dunkerque opera come base avanzata di motosiluranti S-Boote e artiglieria costiera lungo la costa fiamminga mentre si organizza la Resistenza clandestina nel dipartimento del Nord.',
    s10_11: 'Nel 1942 (Direttiva 40 sull\'Atlantikwall e allerta costiera dopo il raid di Dieppe / Operazione Jubilee dell\'agosto 1942) l\'Organizzazione Todt potenzia chiuse allagabili e bunker tra Gravelines, Dunkerque e Bray-Dunes.',
    s12_13: 'Nel 1943 la fascia costiera di Dunkerque è integrata nel settore difensivo della 15ª Armata tedesca (KVA Flandern) con vasti sbarramenti minati e casematte contro eventuali sbarchi nel Pas-de-Calais.',
    s14: 'Giugno 1944 (post-D-Day): designata Festung Dünkirchen da Hitler e già ispezionata dal Feldmaresciallo Rommel nei mesi precedenti, la piazzaforte predispone l\'allagamento difensivo dei polder delle Fiandre.',
    siege15: 'Agosto 1944: mentre la 1ª Armata canadese avanza verso Calais e il Belgio, il Vizeadmiral Friedrich Frisius trincera oltre 12.000 tedeschi nel perimetro allagato tra Gravelines, Bergues e Dunkerque.',
    siege16: 'Dicembre 1944: la piazzaforte di Festung Dünkirchen (Vizeadm. Frisius) resiste isolata sotto il blocco della 1ª Brigata Corazzata cecoslovacca (Gen. Alois Liška) e reparti britannico-francesi mentre Lille e il Nord sono già liberi.',
    apr45Status: 'GER',
    apr45Note: 'Aprile 1945 (al 30 aprile): la guarnigione di Festung Dünkirchen (Vizeadm. Friedrich Frisius) resiste ancora nell\'estrema sacca sul Mare del Nord davanti al contingente cecoslovacco del Gen. Alois Liška fino alla resa del 9 maggio 1945.',
    postNote18: 'Capitolata il 9 maggio 1945 (resa di Frisius ad Alois Liška), Dunkerque distrutta all\'80% avvia sminamento portuale e prosciugamento dei polder allagati sotto il GPRF.',
    s19: 'Settembre 1947: il Piano Monnet avvia la ricostruzione del bacino portuale, delle chiuse Watier e dei grandi cantieri navali di Dunkerque sotto la Quarta Repubblica.',
    s20: 'Dicembre 1947: scioperi portuali e carboniferi nel Nord-Pas-de-Calais durante la crisi sociale dell\'inverno 1947, mentre proseguono i lavori d\'urgenza sulle banchine.',
    s21: 'Giugno 1948: i primi crediti ERP (Piano Marshall) accelerano il riattamento delle gru, dei moli petroliferi e del porto franco di Dunkerque sul Mare del Nord.',
    s22: 'Dicembre 1948: completato il ripristino dei bacini principali di Dunkerque, che torna tra i primi scali marittimi francesi sotto la Quarta Repubblica.',
    surrenderLabel: 'Festung Dünkirchen (Vizeadm. Friedrich Frisius)',
  },
  FR_HIST_POCHE_LORIENT: {
    id: 'FR_HIST_POCHE_LORIENT',
    preName: 'Lorient / Arsenale di Keroman',
    baseName: 'Poche de Lorient',
    parentLabel: 'Morbihan — Settore Costiero di Lorient / Quiberon / Belle-Île / Groix',
    occAdmin: 'Zone occupée — Militärbefehlshaber in Frankreich',
    s0_1: 'Storico arsenale militare marittimo della Marine Nationale e porto peschereccio di Keroman sulla rada del Blavet e dello Scorff, con le isole strategiche di Groix e Belle-Île-en-Mer.',
    s2_4: 'Riarmo navale francese: i cantieri di Lorient allestiscono incrociatori e sommergibili mentre Groix e la penisola di Quiberon presidiano gli accessi marittimi della Bretagna meridionale.',
    s5: 'Drôle de guerre (sett. 1939 – mag. 1940): l\'arsenale di Lorient supporta la scorta dei convogli atlantici; il 17–19 giugno 1940 la Marine Nationale sabota depositi e bacini prima dell\'arrivo tedesco.',
    s6: 'Occupata dalla Wehrmacht il 21 giugno 1940: i primi sommergibili U-Boot della Kriegsmarine utilizzano provvisoriamente gli scali dell\'arsenale di Lorient dopo l\'armistizio di Compiègne.',
    s7: 'Autunno 1940: nell\'ottobre 1940 l\'ammiraglio Karl Dönitz trasferisce a Kernével (rada di Lorient) il quartier generale sottomarino (BdU — Befehlshaber der U-Boote), coordinando da qui i branchi di lupi nell\'Atlantico.',
    s8_9: 'Nel 1941 l\'Organizzazione Todt avvia la costruzione dei colossali bunker corazzati Kéroman I, II e III per la 2. e 10. U-Boot-Flottille (completati tra fine 1941 e il 1942), rendendo la base pressoché immune ai bombardamenti convenzionali.',
    s10_11: 'Nel 1942 Lorient-Keroman è all\'apice come principale base atlantica di U-Boot; nell\'ambito dell\'Atlantikwall vengono fortificate Port-Louis, Forte Penthièvre (Quiberon), Groix e Belle-Île.',
    s12_13: 'Tra gennaio e febbraio 1943 bombardamenti a tappeto della RAF radono al suolo la città civile di Lorient lasciando intatti i bunker Kéroman; dopo il trasferimento del BdU a Parigi (marzo 1943) e la sconfitta U-Boot nel Golfo di Biscaglia (maggio 1943), la base passa sulla difensiva.',
    s14: 'Giugno 1944 (Overlord): proclamata Festung Lorient da Hitler; mentre i sommergibili superstiti tentano di contrastare l\'invasione o ripiegano verso la Norvegia, la guarnigione prepara la difesa ad oltranza.',
    siege15: 'Agosto 1944: liberata Vannes e l\'interno del Morbihan dalla 4ª Corazzata USA e dalle FFI, oltre 26.000 tedeschi del Gen. Wilhelm Fahrmbacher restano asserragliati nella fascia costiera di Festung Lorient (dal fiume Laïta ad Étel) e sulle isole.',
    siege16: 'Dicembre 1944: Festung Lorient (Gen. Fahrmbacher) resiste accerchiata lungo il perimetro Laïta–Hennebont–Étel–Quiberon–Belle-Île dalle Forces Françaises de l\'Ouest (Gen. Edgard de Larminat).',
    apr45Status: 'GER',
    apr45Note: 'Aprile 1945 (al 30 aprile): la piazzaforte di Lorient (Gen. Wilhelm Fahrmbacher), Quiberon e le isole di Groix e Belle-Île restano ancora sotto controllo della Wehrmacht fino alla resa di Caudan del 10 maggio 1945.',
    postNote18: 'Liberata il 10 maggio 1945 a Caudan (resa di Fahrmbacher), la fascia costiera di Lorient-Keroman entra sotto amministrazione civile del GPRF avviando sminamento e baraccamenti provvisori.',
    s19: 'Settembre 1947: avvio dei grandi cantieri di ricostruzione urbanistica di Lorient e rilancio dell\'arsenale e del porto peschereccio di Keroman nel Piano Monnet.',
    s20: 'Dicembre 1947: tensioni sociali nei cantieri navali bretoni durante gli scioperi dell\'inverno 1947 mentre prosegue il ripristino della flotta peschereccia atlantica.',
    s21: 'Giugno 1948: i crediti ERP (Piano Marshall) finanziano i nuovi moli di Keroman e la riedificazione dei quartieri cittadini distrutti nel 1943.',
    s22: 'Dicembre 1948: l\'arsenale della Marine Nationale e il porto di Lorient-Keroman tornano pienamente operativi nella Quarta Repubblica francese.',
    surrenderLabel: 'Festung Lorient (Gen. Wilhelm Fahrmbacher)',
  },
  FR_HIST_POCHE_ST_NAZAIRE: {
    id: 'FR_HIST_POCHE_ST_NAZAIRE',
    preName: 'Saint-Nazaire / Estuario della Loira',
    baseName: 'Poche de Saint-Nazaire',
    parentLabel: 'Loire-Atlantique — Estuario da La Roche-Bernard / Bouvron a Pornic',
    occAdmin: 'Zone occupée — Militärbefehlshaber in Frankreich',
    s0_1: 'Grande porto transatlantico dell\'estuario della Loira: i Cantieri di Penhoët e il monumentale bacino di carenaggio Forme Joubert (costruito per il transatlantico Normandie) guidano la cantieristica francese.',
    s2_4: 'Potenziamento militare dei cantieri della Loira a Saint-Nazaire: sullo scalo di Penhoët è in allestimento la moderna corazzata francese Jean Bart.',
    s5: 'Drôle de guerre (sett. 1939 – mag. 1940): Saint-Nazaire è scalo logistico britannico sulla Loira; il 17 giugno 1940, mentre la Jean Bart incompleta fugge verso Casablanca, la Luftwaffe affonda al largo il trasporto HMS Lancastria.',
    s6: 'Caduta il 21 giugno 1940 subito dopo l\'affondamento dell\'HMS Lancastria e la partenza della Jean Bart: la Wehrmacht occupa i Cantieri di Penhoët e la Forme Joubert.',
    s7: 'Autunno 1940: dall\'ottobre 1940 i primi sommergibili della 7. U-Boot-Flottille operano da Saint-Nazaire mentre la Kriegsmarine individua nella Forme Joubert l\'unico bacino atlantico adatto alla corazzata Bismarck.',
    s8_9: 'Nel 1941 (con cantieri avviati tra febbraio e aprile 1941) l\'Organizzazione Todt edifica il gigantesco bunker U-Boot a 14 celle di Saint-Nazaire e le prime batterie costiere a guardia dell\'estuario.',
    s10_11: '28 marzo 1942 (Operazione Chariot): il cacciatorpediniere britannico HMS Campbeltown imbottito d\'esplosivo sperona e distrugge la porta del bacino Forme Joubert rendendolo inutilizzabile per la Tirpitz per tutta la guerra.',
    s12_13: 'Nel 1943 pesanti bombardamenti alleati (gennaio–maggio 1943) devastano la città di Saint-Nazaire ma lasciano intatti i bunker della 6. e 7. U-Boot-Flottille, mentre l\'estuario è potenziato nell\'Atlantikwall.',
    s14: 'Giugno 1944 (Overlord): proclamata Festung Saint-Nazaire da Hitler, la piazzaforte concentra capisaldi dalla foce della Vilaine a Pornic mentre gli ultimi U-Boot lasciano la base dopo lo sbarco in Normandia.',
    siege15: 'Agosto 1944: mentre Nantes è liberata il 12 agosto, il Gen. Hans Junck ritira 28.000 uomini nel vasto ridotto fortificato costiero dalla foce della Vilaine (La Roche-Bernard) via Guenrouët–Bouvron–Cordemais fino a Pornic (Festung Saint-Nazaire).',
    siege16: 'Dicembre 1944: la sacca costiera di Saint-Nazaire (Gen. Hans Junck, circa 1.600 km²) blocca l\'estuario della Loira sotto assedio FFI/FFO e della 66th US Infantry Division (Brig. Gen. Herman F. Kramer).',
    apr45Status: 'GER',
    apr45Note: 'Aprile 1945 (al 30 aprile): Festung Saint-Nazaire (Gen. Hans Junck) continua a resistere lungo l\'estuario davanti alla 66ª Divisione USA e alle FFO del Col. Raymond Chomel fino alla resa di Bouvron dell\'11 maggio 1945 (ultima piazzaforte tedesca in Francia).',
    postNote18: 'Arresasi l\'11 maggio 1945 a Bouvron (Gen. Junck al Brig. Gen. Kramer e al Col. Chomel), la regione dell\'estuario rientra sotto piena autorità del GPRF avviando lo sminamento di Saint-Nazaire e Pornic.',
    s19: 'Settembre 1947: riapertura graduale della navigazione verso Nantes e avvio del Piano Monnet nei Cantieri di Penhoët e della Loira.',
    s20: 'Dicembre 1947: mobilitazioni operaie nei cantieri navali della Bassa Loira durante gli scioperi dell\'inverno 1947 mentre prosegue lo sgombero urbano a Saint-Nazaire.',
    s21: 'Giugno 1948: i fondi del Piano Marshall (ERP) accelerano il ripristino dei bacini di carenaggio, delle gru portuali e delle banchine mercantili sull\'estuario.',
    s22: 'Dicembre 1948: pieno riassetto industriale dei cantieri navali di Saint-Nazaire e normalizzazione definitiva dei traffici marittimi verso Nantes nella Quarta Repubblica.',
    surrenderLabel: 'Festung Saint-Nazaire (Gen. Hans Junck)',
  },
  FR_HIST_POCHE_LA_ROCHELLE: {
    id: 'FR_HIST_POCHE_LA_ROCHELLE',
    preName: 'La Rochelle–La Pallice',
    baseName: 'Poche de La Rochelle–La Pallice',
    parentLabel: 'Charente-Maritime Nord — Marans, La Rochelle, Île de Ré & Oléron',
    occAdmin: 'Zone occupée — Militärbefehlshaber in Frankreich',
    s0_1: 'Porto atlantico d\'acque profonde di La Pallice, piazzaforte marittima di La Rochelle e isole costiere di Ré e Oléron nella Charente-Inférieure (ridenominata Charente-Maritime nel 1941).',
    s2_4: 'Potenziamento del grande molo d\'alto mare di La Pallice e delle batterie costiere su Île de Ré e Île d\'Oléron a guardia del Pertuis d\'Antioche e Pertuis Breton.',
    s5: 'Drôle de guerre (sett. 1939 – mag. 1940): porto atlantico di appoggio commerciale e convogli alleati riparato dall\'arcipelago charentese fino al ripiegamento del giugno 1940.',
    s6: 'Giugno 1940: occupazione tedesca del porto di La Pallice e delle isole di Ré e Oléron dopo l\'armistizio di giugno; la Kriegsmarine requisisce il molo d\'alto mare.',
    s7: 'Autunno 1940: La Pallice diviene scalo logistico della Kriegsmarine nel Golfo di Biscaglia con il dispiegamento delle prime batterie costiere tedesche su Ré e Oléron.',
    s8_9: 'Nel 1941 (dall\'aprile 1941) l\'Organizzazione Todt costruisce il grande bunker U-Boot a 10 celle di La Pallice per la 3. U-Boot-Flottille (insediata nell\'ottobre 1941); nel marzo 1941 vi sostano le corazzate Scharnhorst e Gneisenau.',
    s10_11: 'Nel 1942 La Rochelle–La Pallice è cardine dell\'Atlantikwall nel Golfo di Biscaglia con possenti casematte Todt sull\'Île de Ré e sull\'Île d\'Oléron dopo gli attacchi aerei alle unità di superficie.',
    s12_13: 'Nel 1943 la 3. U-Boot-Flottille opera da La Pallice sotto crescente caccia aeronavale alleata nel Golfo di Biscaglia mentre la Wehrmacht fortifica gli argini settentrionali verso Marans.',
    s14: 'Giugno 1944 (Overlord): proclamata Festung La Rochelle da Hitler; le isole di Ré e Oléron vengono sbarrate ad oltranza mentre gli U-Boot superstiti abbandonano la base nell\'agosto 1944.',
    siege15: 'Agosto–Settembre 1944: ritirandosi verso ovest, il Vizeadmiral Ernst Schirlitz organizza il ridotto fortificato costiero di Festung La Rochelle (Marans–La Pallice–Île de Ré–Oléron) mentre l\'entroterra si libera.',
    siege16: 'Dicembre 1944: la sacca costiera di La Rochelle–La Pallice (Vizeadm. Schirlitz) è assediata dalle forze francesi del Gen. Edgard de Larminat, teatro di aspri combattimenti intorno a Marans all\'inizio di gennaio 1945.',
    apr45Status: 'GER',
    apr45Note: 'Aprile 1945 (al 30 aprile): caduta Royan, il Vizeadmiral Ernst Schirlitz tiene ancora La Rochelle, La Pallice, l\'Île de Ré e l\'Île d\'Oléron (attaccata il 30 apr.–1° mag. con Op. Jupiter) fino alla capitolazione dell\'8 maggio 1945.',
    postNote18: 'Capitolata l\'8 maggio 1945 (resa di Ernst Schirlitz e grazie al patto di salvaguardia portuale), il porto quasi intatto di La Pallice torna subito operativo per il GPRF.',
    s19: 'Settembre 1947: il porto d\'acque profonde di La Pallice garantisce un intenso traffico commerciale di rifornimento nazionale sotto il Piano Monnet.',
    s20: 'Dicembre 1947: durante le agitazioni operaie dell\'inverno 1947 i bacini di La Pallice mantengono la continuità dei rifornimenti e riprende la pesca atlantica a La Rochelle.',
    s21: 'Giugno 1948: i primi cargo del Piano Marshall (ERP) sbarcano cereali, carbone e macchinari sul molo d\'alto mare di La Pallice.',
    s22: 'Dicembre 1948: La Rochelle–La Pallice consolida il proprio primato tra gli scali atlantici di commercio e pesca nella Quarta Repubblica francese.',
    surrenderLabel: 'Festung La Rochelle (Vizeadm. Ernst Schirlitz)',
  },
  FR_HIST_POCHE_ROYAN: {
    id: 'FR_HIST_POCHE_ROYAN',
    preName: 'Royan / Penisola d\'Arvert',
    baseName: 'Poche de Royan',
    parentLabel: 'Charente-Maritime Sud — Penisola d\'Arvert (Royan / Saujon–Cozes)',
    occAdmin: 'Zone occupée — Militärbefehlshaber in Frankreich',
    s0_1: 'Stazione balneare di Royan e penisola d\'Arvert (Charente-Inférieure) sulla riva settentrionale dell\'imbocco della Gironda, stazione pilota per il grande porto di Bordeaux.',
    s2_4: 'Sorveglianza marittima dell\'estuario della Gironda tra la Punta della Coubre e Royan nel dispositivo difensivo costiero della Terza Repubblica.',
    s5: 'Drôle de guerre (sett. 1939 – mag. 1940): intenso traffico mercantile lungo la Gironda verso Bordeaux; nel giugno 1940 profughi e unità alleate imbarcano davanti a Royan prima dell\'occupazione.',
    s6: 'Giugno 1940: occupazione tedesca di Royan e della penisola d\'Arvert dopo la caduta di Bordeaux e l\'armistizio di giugno; controllo tedesco dell\'estuario della Gironda.',
    s7: 'Autunno 1940: installazione delle prime batterie costiere tedesche e posti di blocco navale alla Pointe de la Coubre e intorno a Royan.',
    s8_9: 'Nel 1941 la Kriegsmarine integra la riva nord della Gironda nei settori di artiglieria costiera a scorta dei violatori di blocco navali diretti a Bordeaux (inclusa la base Betasom).',
    s10_11: 'Nel 1942 l\'Organizzazione Todt costruisce i bunker di Festung Gironde-Nord a Royan e La Coubre (Atlantikwall); nel dicembre 1942 i commando britannici dell\'Operazione Frankton sfilano di notte in kayak davanti a Royan verso Bordeaux.',
    s12_13: 'Nel 1943 la penisola d\'Arvert diventa uno dei perimetri più fittamente minati dell\'Atlantikwall sud-occidentale con batterie pesanti di marina puntate sul canale della Gironda.',
    s14: 'Giugno 1944 (Overlord): fortificata come Festung Gironde-Nord, la guarnigione si prepara ad isolarsi sull\'estuario qualora le armate tedesche evacuino la Francia sud-occidentale.',
    siege15: 'Agosto–Settembre 1944: dopo la liberazione dell\'entroterra aquitano, il Kontradmiral Hans Michahelles organizza la difesa della Poche de Royan lungo il perimetro Seudre–Saujon–Cozes.',
    siege16: 'Dicembre 1944: la Poche de Royan (Kontradm. Hans Michahelles) sbarra l\'accesso navale a Bordeaux insieme alla Pointe de Grave, poco prima del tragico bombardamento alleato del 5 gennaio 1945 che distrusse la città.',
    apr45Status: 'FRA',
    apr45Note: 'Aprile 1945 (al 30 aprile): LIBERATA tra il 14 e il 17 aprile 1945 dall\'offensiva franco-americana (Operazione Vénérable, Gen. Edgard de Larminat e 2ª Divisione Corazzata di Leclerc), con la cattura del Kontradmiral Hans Michahelles.',
    postNote18: 'Royan distrutta all\'85–90% dai bombardamenti di gennaio e dai combattimenti d\'aprile avvia lo sminamento della penisola d\'Arvert e i baraccamenti provvisori sotto il GPRF.',
    s19: 'Settembre 1947: il cantiere pilota diretto dall\'architetto Claude Ferret imposta il piano regolatore modernista per la ricostruzione di Royan.',
    s20: 'Dicembre 1947: avvio dei grandi cantieri edili in cemento armato e sminamento finale delle spiagge della Grande Côte durante l\'inverno 1947.',
    s21: 'Giugno 1948: i lavori urbanistici del piano Ferret consacrano Royan quale laboratorio di architettura moderna della Quarta Repubblica.',
    s22: 'Dicembre 1948: riapertura stabile dell\'accesso marittimo settentrionale della Gironda e avanzamento dei nuovi quartieri cittadini di Royan nella Quarta Repubblica.',
    surrenderLabel: 'Festung Gironde-Nord (Kontradm. Hans Michahelles)',
  },
  FR_HIST_POCHE_POINTE_GRAVE: {
    id: 'FR_HIST_POCHE_POINTE_GRAVE',
    preName: 'Pointe de Grave / Le Verdon',
    baseName: 'Poche de la Pointe de Grave',
    parentLabel: 'Gironde Nord — Le Verdon-sur-Mer / Soulac-sur-Mer (Bas-Médoc)',
    occAdmin: 'Zone occupée — Militärbefehlshaber in Frankreich',
    s0_1: 'Estremità settentrionale del Médoc tra Soulac-sur-Mer e l\'avamporto d\'acque profonde di Le Verdon-sur-Mer a guardia dell\'imbocco meridionale della Gironda verso Bordeaux.',
    s2_4: 'Molo transatlantico di Le Verdon e batterie costiere francesi a presidio del canale d\'accesso marittimo all\'estuario bordolese.',
    s5: 'Drôle de guerre (sett. 1939 – mag. 1940): l\'avamporto di Le Verdon smista i convogli marittimi verso Bordeaux fino alle evacuazioni navali e al passaggio dell\'oro e profughi nel giugno 1940.',
    s6: 'Giugno 1940: occupazione tedesca di Le Verdon e Soulac nel passaggio della costa atlantica alla Zone Occupée armistiziale.',
    s7: 'Autunno 1940: installazione di osservatori costieri e prime batterie d\'artiglieria tedesche nel Bas-Médoc per controllare ogni nave diretta a Bordeaux.',
    s8_9: 'Nel 1941 la Wehrmacht trasforma la Pointe de Grave in caposaldo difensivo a copertura dell\'avamporto di Le Verdon e delle rotte di accesso a Bordeaux.',
    s10_11: 'Nel 1942 l\'Organizzazione Todt costruisce i bunker corazzati di Festung Gironde-Süd tra Soulac e Le Verdon (Atlantikwall); nel dicembre 1942 il commando dell\'Operazione Frankton elude i campi minati dell\'imbocco della Gironda.',
    s12_13: 'Nel 1943 posa di estesi sbarramenti minati marittimi e terrestri tra Saint-Vivien-de-Médoc e Le Verdon a blocco permanente della riva sud dell\'estuario.',
    s14: 'Giugno 1944 (Overlord): fortificata come Festung Gironde-Süd con batterie pesanti e bunker antisbarco tra Soulac e Le Verdon, la punta estrema del Médoc prepara la resistenza isolata.',
    siege15: 'Agosto–Settembre 1944: mentre la Wehrmacht evacua Bordeaux (28 agosto 1944), circa 3.500–4.000 tedeschi restano asserragliati nella sacca isolata della Pointe de Grave fino a Saint-Vivien-de-Médoc.',
    siege16: 'Dicembre 1944: la sacca della Pointe de Grave (Festung Gironde-Süd) fronteggia la Brigata Carnot (FFI del Médoc), continuando a interdire con mine e batterie l\'accesso a Bordeaux.',
    apr45Status: 'FRA',
    apr45Note: 'Aprile 1945 (al 30 aprile): LIBERATA tra il 15 e il 20 aprile 1945 dalla Brigata Carnot / FFI del Médoc nell\'Operazione Vénérable; catturato a Le Verdon il comandante tedesco Oberst Fritz Prahl, riaprendo definitivamente il porto di Bordeaux.',
    postNote18: 'Bonifica prioritaria dei grandi campi minati di Soulac e Le Verdon-sur-Mer e riattivazione del canale navigabile di Bordeaux sotto il GPRF.',
    s19: 'Settembre 1947: ripristino graduale dei moli danneggiati di Le Verdon-sur-Mer e ripresa regolare dei traffici lungo la Gironda nel Piano Monnet.',
    s20: 'Dicembre 1947: sgombero dei relitti nell\'imbocco dell\'estuario e consolidamento delle difese costiere di Soulac nell\'inverno 1947.',
    s21: 'Giugno 1948: riattivazione progressiva degli scali dell\'estuario bordolese sostenuta dalla ricostruzione nazionale e dal Piano Marshall.',
    s22: 'Dicembre 1948: normalizzazione completa della navigazione verso Bordeaux attraverso Le Verdon e la Pointe de Grave nella Quarta Repubblica.',
    surrenderLabel: 'Festung Gironde-Süd (Oberst Fritz Prahl)',
  },
};

export const FRENCH_COASTAL_POCKET_IDS = new Set<string>(Object.keys(FRANCE_COASTAL_POCKET_PROFILES));

export function resolveFrenchCoastalPocket(id: string, s: number): ResolvedTerritory | null {
  const key = String(id || '').trim().toUpperCase();
  const prof = FRANCE_COASTAL_POCKET_PROFILES[key];
  if (!prof) return null;

  if (s <= 5) {
    const note = s <= 1 ? prof.s0_1 : s <= 4 ? prof.s2_4 : prof.s5;
    return makeFrRes(
      'FRA',
      `${prof.preName} (${prof.parentLabel})`,
      note,
      'Alleati',
      'Troisième République française'
    );
  }
  if (s <= 9) {
    const note = s === 6 ? prof.s6 : s === 7 ? prof.s7 : prof.s8_9;
    return makeFrRes(
      'GER',
      `${prof.preName} (Zone Occupée — Wehrmacht)`,
      note,
      'Asse',
      prof.occAdmin
    );
  }
  if (s <= 14) {
    const note = s <= 11 ? prof.s10_11 : s <= 13 ? prof.s12_13 : prof.s14;
    const isDnk = prof.id === 'FR_HIST_POCHE_DUNKERQUE';
    const name = s === 14
      ? `${prof.baseName} (Atlantikwall — Festung)`
      : `${prof.preName} (Atlantikwall — Zone Occupée)`;
    const admin = isDnk
      ? (s <= 13
          ? 'Militärverwaltung in Belgien und Nordfrankreich · AOK 15 (Atlantikwall)'
          : 'Deutsche Wehrmacht — Festung Dünkirchen / AOK 15 (Brüssel)')
      : 'Deutsche Wehrmacht — Atlantikwall / OB West';
    return makeFrRes('GER', name, note, 'Asse', admin);
  }
  if (s === 15) {
    return makeFrRes(
      'GER',
      `${prof.baseName} (Festung Costiera — Assedio FFI/Alleati)`,
      prof.siege15,
      'Asse',
      `Deutsche Wehrmacht — ${prof.surrenderLabel}`
    );
  }
  if (s === 16) {
    return makeFrRes(
      'GER',
      `${prof.baseName} (Festung Atlantica — Sacca Costiera)`,
      prof.siege16,
      'Asse',
      `Deutsche Wehrmacht — ${prof.surrenderLabel}`
    );
  }
  if (s === 17) {
    if (prof.apr45Status === 'GER') {
      return makeFrRes(
        'GER',
        `${prof.baseName} (Festung Atlantica — Assedio Alleato)`,
        prof.apr45Note,
        'Asse',
        `Deutsche Wehrmacht — ${prof.surrenderLabel}`
      );
    }
    return makeFrRes(
      'FRA',
      `${prof.preName} (Liberata — Operazione Vénérable, Apr 1945)`,
      prof.apr45Note,
      'Alleati',
      'Gouvernement Provisoire de la République Française (GPRF — Gen. de Larminat)'
    );
  }
  if (s === 18) {
    return makeFrRes(
      'FRA',
      `${prof.preName} (GPRF — Liberata)`,
      prof.postNote18,
      'Alleati',
      'Gouvernement Provisoire de la République Française (GPRF — Charles de Gaulle)'
    );
  }
  const postNote = s === 19 ? prof.s19 : s === 20 ? prof.s20 : s === 21 ? prof.s21 : prof.s22;
  const postAdmin =
    s <= 19
      ? 'Quatrième République Française — Pres. Vincent Auriol · PM Paul Ramadier'
      : s === 20
        ? 'Quatrième République Française — Pres. Vincent Auriol · PM Robert Schuman'
        : s === 21
          ? 'Quatrième République Française — Pres. Vincent Auriol · PM Robert Schuman / André Marie'
          : 'Quatrième République Française — Pres. Vincent Auriol · PM Henri Queuille';
  return makeFrRes(
    'FRA',
    `${prof.preName} (Quatrième République — Ricostruzione)`,
    postNote,
    'Alleati',
    postAdmin
  );
}

function makeFrRes(
  o: string,
  name: string,
  note: string,
  fac: FactionType,
  adminEntity: string
): ResolvedTerritory {
  return { o, name, note, fac, adminEntity };
}

const FRANCE_DEPT_OVERRIDES: Record<string, FranceDeptLateProfile> = {
  // === ÎLE-DE-FRANCE ===
  FR101: {
    s9_10: 'Parigi sotto rigoroso coprifuoco del Militärbefehlshaber (Hôtel Majestic): il 16–17 luglio 1942 la polizia collaborazionista esegue il tragico rastrellamento del Vélodrome d\'Hiver.',
    s11_12: 'Soppressione della linea di demarcazione; la Gestapo di avenue Foch e la Milice reprimono le reti clandestine del Musée de l\'Homme e del CNR.',
    s13: 'Parigi guida il coordinamento clandestino della Resistenza (COMAC / CNR) sotto guida di Georges Bidault dopo l\'arresto di Jean Moulin; pesanti incursioni aeree sugli scali di La Chapelle.',
    s14: 'Giugno 1944: la capitale in fermento attende lo sfondamento alleato dalla Normandia mentre il Comité Parisien de Libération prepara l\'insurrezione generale.',
    s15: '25 agosto 1944: la 2e Division Blindée del Gen. Philippe Leclerc e gli insorti delle FFI liberano Parigi; il generale Dietrich von Choltitz firma la capitolazione nella capitale alla presenza di Charles de Gaulle.',
    s16: 'Dicembre 1944: Parigi è sede del Governo Provvisorio della Repubblica Francese (GPRF) di Charles de Gaulle, che ripristina i ministeri repubblicani e il Patto franco-sovietico.',
    s17: 'Aprile 1945: l\'Hôtel Lutetia accoglie i primi migliaia di deportati e prigionieri di guerra liberati dai lager; 29 aprile: le parigine votano per la prima volta alle municipali.',
    s18: 'Settembre 1945: Parigi celebra la vittoria e i grandi processi all\'Alta Corte di Giustizia (Pétain condannato in agosto), mentre il GPRF prepara l\'Assemblea Costituente e la Sécurité Sociale.',
    s19: 'Settembre 1947: capitale della Quarta Repubblica (Pres. Vincent Auriol, PM Paul Ramadier); rottura del Tripartitismo nel maggio 1947, lancio del Piano Monnet e conferenza di Parigi sul Piano Marshall.',
    hist15: 'Paris (Libération de Paris — 25 Août 1944)',
    hist18: 'Paris (Capitale du GPRF — Retour des Déportés & Suffrage Féminin, 1945)',
    hist19: 'Paris (Capitale de la Quatrième République — Auriol & Ramadier, 1947)',
  },
  FR103: {
    s14: 'Yvelines (Seine-et-Oise): i bombardamenti alleati colpiscono pesantemente i grandi snodi ferroviari di Trappes e Mantes per paralizzare i rinforzi tedeschi verso la Normandia.',
    s15: '24–25 agosto 1944: le colonne corazzate di Leclerc avanzano attraverso Rambouillet, Toussus-le-Noble e Versailles aprendo la via per la liberazione di Parigi.',
    s19: 'Versailles torna sede cerimoniale parlamentare e ospita l\'organizzazione amministrativa della regione parigina occidentale sotto la Quarta Repubblica.',
  },
  FR105: {
    s9_10: 'Le officine Renault di Boulogne-Billancourt sono colpite dal massiccio bombardamento RAF del 3 marzo 1942 contro la produzione bellica per la Wehrmacht; fucilazioni al Mont-Valérien (Suresnes).',
    s18: 'Le fabbriche Renault di Billancourt, nazionalizzate con l\'ordinanza del gennaio 1945 (Régie Nationale des Usines Renault), diventano laboratorio industriale sociale del dopoguerra.',
    s19: 'A Boulogne-Billancourt entra in produzione di serie la popolare Renault 4CV (1947), simbolo della rinascita automobilistica statale sotto il Piano Monnet; Suresnes consacra il memoriale della France Combattante.',
    hist19: 'Hauts-de-Seine (Régie Renault Billancourt & Mémorial du Mont-Valérien, 1947)',
  },
  FR106: {
    s9_10: 'A Drancy viene aperto e ampliato il principale campo di internamento e transito delle deportazioni verso Auschwitz (estate 1942); scali merci di Le Bourget e Bobigny fortificati.',
    s15: 'Agosto 1944: liberazione del campo di Drancy (17 agosto, dopo la partenza dell\'ultimo convoglio) con l\'avanzata alleata alle porte settentrionali di Parigi.',
    s19: 'Industrializzazione operaia della cintura nord-orientale parigina (Aubervilliers, Saint-Denis) e rilancio dello scalo aereo civile e cargo di Le Bourget nel 1947.',
  },

  // === NORMANDIE & NORD ===
  FRD11: {
    s9_10: 'Costruzione accelerata delle batterie costiere dell\'Atlantikwall lungo la Côte de Nacre e la foce dell\'Orne; operazioni di intelligence del réseau Centurie sulla spiaggia normanna.',
    s14: 'Dipartimento di Calvados (Bayeux / Caen). Sbarco del 6 giugno 1944 (D-Day): le spiagge di Gold, Juno e Sword vengono espugnate dalle forze anglo-canadesi; Bayeux prima città liberata (7 giugno), porto artificiale Mulberry B ad Arromanches, aspri scontri attorno a Caen.',
    s15: 'Agosto 1944: chiusura della Sacca di Falaise (Falaise-Chambois, 19–21 agosto) con l\'annientamento della 7. Armee e 5. Panzerarmee tedesche; piena restaurazione civile del GPRF a Bayeux e nella distrutta Caen.',
    s18: 'Caen e Falaise giacciono in gran parte rase al suolo; imponenti cantieri di sminamento e baraccamenti provvisori ospitano la popolazione normanna.',
    s19: 'Avvio della ricostruzione monumentale di Caen e dei porti del Calvados con i primi fondi statali del Piano Monnet e dell\'MRU (Ministère de la Reconstruction et de l\'Urbanisme).',
    hist15: 'Calvados (Vittoria nella Sacca di Falaise — GPRF)',
    hist19: 'Calvados (Caen & Bayeux — Ricostruzione della Normandia, Quatrième République)',
  },
  FRD12: {
    s14: 'Dipartimento di Manche (Cotentin / Cherbourg). Sbarco del 6 giugno 1944 (D-Day): i paracadutisti americani (82ª e 101ª Airborne) e la 4ª Divisione USA sbarcano a Utah Beach e Sainte-Mère-Église, isolando il Cotentin ed espugnando il porto vitale di Cherbourg (27 giugno).',
    s15: 'Sfondamento decisivo di Saint-Lô ("capitale delle rovine") e dell\'Operazione Cobra ad Avranches (fine luglio 1944): liberazione totale della Manche con la 3ª Armata di Patton.',
    s18: 'Il porto di Cherbourg gestisce lo smistamento e il rimpatrio del materiale e dei militari americani attraverso il terminal Atlantico.',
    s19: 'Ricostruzione integrale di Saint-Lô e delle banchine marittime di Cherbourg sostenute dal Piano Monnet e dal rilancio lattiero-caseario normanno.',
  },
  FRD13: {
    s14: 'L\'Orne è attraversata da feroci combattimenti e interruzioni ferroviarie verso il fronte di Normandia mentre i partigiani dell\'OMF sabottano le retrovie tedesche.',
    s15: '12 agosto 1944: la 2e DB francese di Leclerc libera Alençon (prima città continentale liberata da truppe francesi regolari in Overlord) partecipando alla chiusura della sacca di Falaise-Argentan.',
    s19: 'Ricostruzione dei centri devastati dell\'Orne (Flers, Argentan, Vimoutiers) e rilancio agricolo sotto la Quarta Repubblica.',
  },
  FRD22: {
    s9_10: '19 agosto 1942: sanguinoso raid anfibio anglo-canadese su Dieppe (Operazione Jubilee) lungo le scogliere della Côte d\'Albâtre; preziose lezioni per il futuro sbarco di Normandia.',
    s14: 'Pesanti bombardamenti sulle installazioni della Kriegsmarine a Le Havre e sui ponti sulla Senna attorno a Rouen per isolare la riva destra.',
    s15: '30 agosto – 2 settembre 1944: canadesi e britannici varcano la Senna liberando Rouen e Dieppe e stringendo d\'assedio la guarnigione di Festung Le Havre.',
    s18: 'Le Havre (devastata al 80% dai raid di settembre 1944) avvia con l\'architetto Auguste Perret uno dei più ambiziosi piani urbanistici moderni d\'Europa.',
    s19: 'Cantiere simbolo dell\'urbanistica di Auguste Perret a Le Havre e ricostruzione dei bacini industriali e petrolchimici della bassa Senna (Gonfreville / Port-Jérôme).',
    hist19: 'Seine-Maritime (Le Havre & Rouen — Ricostruzione Auguste Perret & Grand Port)',
  },
  FRE11: {
    s9_10: 'Zona Nord-Pas-de-Calais subordinata al comando di Bruxelles (Oberfeldkommandantur 670 Lille): duro sfruttamento delle miniere di carbone, resistenza comunista FTP e rete Voix du Nord.',
    s15: 'Agosto 1944: sciopero generale insurrezionale dei minatori e ferrovieri del Nord; i britannici avanzano su Lille a inizio settembre mentre la guarnigione tedesca si barrica a Dunkerque.',
    s16: 'Lille e il bacino minerario operano sotto il GPRF (nazionalizzazione d\'emergenza delle Houillères du Nord, dic 1944), mentre la sacca costiera di Dunkerque resta presidiata dal Vizeadmiral Frisius contro la Brigata corazzata cecoslovacca.',
    s17: 'La guarnigione tedesca di Festung Dünkirchen resiste nell\'estrema fascia costiera fino alla resa del 9 maggio 1945 dinanzi al generale cecoslovacco Liška.',
    s18: 'Liberazione definitiva di Dunkerque (maggio 1945); fusione dei bacini minerari regionali nell\'ente pubblico nazionale Charbonnages de France.',
    s19: 'Bataille du Charbon 1946–47: i bacini carboniferi del Nord rappresentano il polmone energetico del Piano Monnet, teatro delle dure agitazioni sindacali CGT dell\'autunno 1947.',
    hist19: 'Nord (Lille & Dunkerque — Houillères Nationalisées & Bataille du Charbon 1947)',
  },
  FRE12: {
    s9_10: 'Zona Rattachée Bruxelles: i tedeschi costruiscono le colossali batterie transmanica (Batterie Todt) e fortificazioni bunkerizzate del Pas-de-Calais verso l\'Inghilterra.',
    s14: 'Berceau dell\'inganno **Operation Fortitude** e fittissimo bersaglio alleato (Operation Crossbow) per neutralizzare i siti di lancio delle bombe volanti **V-1** dirette su Londra.',
    s15: 'Settembre 1944 (alla soglia di fine agosto): truppe canadesi accerchiano Boulogne e Calais eliminando le batterie che avevano bombardato Dover per 4 anni.',
    s19: 'Nazionalizzazione del bacino minerario di Lens/Liévin-Béthune e rapida ricostruzione dei porti pescherecci di Boulogne-sur-Mer e Calais sotto la Quarta Repubblica.',
  },

  // === GRAND EST & ALSAZIA-MOSELLA ===
  FRF11: {
    s9_10: 'Bas-Rhin annesso de facto al Terzo Reich (CdZ-Gebiet Elsaß / Gau Baden-Elsaß): dall\'agosto 1942 scatta l\'arruolamento forzato nella Wehrmacht dei giovani alsaziani ("Malgré-nous"); lager di Natzweiler-Struthof sui Vosgi.',
    s14: 'Strasburgo e il Basso Reno sottoposti alla rigida germanizzazione di Robert Wagner; gli alleati preparano l\'avanzata dai Vosgi.',
    s15: 'Agosto 1944: Alsazia e Mosella restano ancora sotto controllo militare tedesco prima delle offensive autunnali della 1ª Armata francese e 7ª Armata USA.',
    s16: '23 novembre 1944: la 2e Division Blindée francese del Gen. Philippe Leclerc libera Strasburgo compiendo il Giuramento di Koufra ("Le drapeau français flotte sur la flèche de la cathédrale").',
    s17: 'Respinta l\'offensiva tedesca **Unternehmen Nordwind** del gennaio 1945 (saliente di Gambsheim/Hatten), il Bas-Rhin completa il ripristino dell\'amministrazione repubblicana.',
    s18: 'Smantellamento delle strutture naziste d\'annessione e apertura a Strasburgo del processo sui crimini di Natzweiler-Struthof e del rientro dei Malgré-nous.',
    s19: 'Strasburgo riprende la navigazione sul Reno come grande porto fluviale francese sotto la Quarta Repubblica e prepara la rinascita politica europea lungo l\'asse franco-tedesco.',
    hist16: 'Bas-Rhin — Strasbourg Liberata (2e DB Gen. Leclerc)',
    hist19: 'Bas-Rhin (Strasbourg — Rinascita Repubblicana d\'Alsazia & Porto sul Reno 1947)',
  },
  FRF12: {
    s9_10: 'Haut-Rhin annesso al Gau Baden-Elsaß sotto il Gauleiter Robert Wagner: proibizione della lingua francese, coscrizione coatta dei "Malgré-nous" verso il Fronte Orientale.',
    s15: 'Agosto 1944: Alsazia e Mosella restano ancora sotto controllo militare tedesco prima delle offensive autunnali.',
    s16: 'Dicembre 1944: la 19ª Armata della Wehrmacht presidia tenacemente la testa di ponte della Sacca di Colmar (Poche de Colmar) in Alsazia meridionale nonostante la spinta della 1ª Armata francese su Mulhouse.',
    s17: '2–9 febbraio 1945: la 1ª Armata francese (De Lattre de Tassigny) e il XXI Corpo USA annientano la Sacca di Colmar liberando l\'ultimo lembo alsaziano prima di varcare il Reno.',
    s18: 'Ricostruzione della fascia vinicola dell\'Alsazia e delle industrie tessili di Mulhouse devastate dai combattimenti invernali 1944–45.',
    s19: 'Colmar e Mulhouse pienamente reintegrate nei poteri civili della Quarta Repubblica e al polo chimico-minerario delle Potasses d\'Alsace.',
    hist16: 'Haut-Rhin — Sacca di Colmar (Poche de Colmar — 19. Armee)',
    hist17: 'Haut-Rhin — Colmar Liberata (1ère Armée De Lattre, Febbraio 1945)',
  },
  FRF33: {
    s9_10: 'Moselle annessa de facto al Reich (CdZ-Gebiet Lothringen / Gau Westmark sotto Josef Bürckel): espulsioni di francofoni, germanizzazione totale e coscrizione coatta nella Wehrmacht.',
    s15: 'Agosto 1944: Alsazia e Mosella restano ancora sotto controllo militare tedesco prima dell\'attacco verso il fiume Mosella.',
    s16: 'Novembre 1944: la 3ª Armata USA del Gen. George S. Patton espugna le fortezze di Metz liberando gran parte della Mosella dopo duri scontri sul fiume Seille e a Thionville.',
    s17: 'Con lo sfondamento verso la Saar e Bitche (marzo 1945) anche le ultime piazzeforti sulla Linea Maginot settentrionale vengono liberate.',
    s18: 'Riattivazione delle miniere di ferro lorenese (Minette) e dei grandi bacini siderurgici di Hayange/Thionville per la ricostruzione francese.',
    s19: 'La Mosella e il vicino bacino della Saar (collegato dall\'unione economica francese 1947) divengono il cardine siderurgico-carbonifero del Piano Monnet.',
    hist16: 'Moselle — Metz Liberata (3ª Armata USA Gen. Patton)',
    hist19: 'Moselle (Metz & Thionville — Siderurgia Lorenese & Piano Monnet 1947)',
  },
  FRF23: {
    s15: 'Fine agosto 1944: la 3ª Armata di Patton libera Reims, Épernay e Châlons-sur-Marne nell\'inseguimento attraverso la Champagne.',
    s17: '7 maggio 1945 (ore 02:41): nel quartier generale dello SHAEF di **Reims** (École technique / Musée de la Reddition), il generale Alfred Jodl firma davanti al generale Eisenhower la resa incondizionata di tutte le forze tedesche!',
    s19: 'La Marne celebra il memoriale della resa storica di Reims e riprende le esportazioni vinicole mondiali dello Champagne per la bilancia valutaria della Quarta Repubblica.',
    hist17: 'Marne (Reims SHAEF — Atto di Resa Tedesco del 7 Maggio 1945)',
  },

  // === TASCHE ATLANTICHE & OVEST (BRETAGNA, LOIRA, AQUITANIA) ===
  FRH02: {
    s9_10: 'La gigantesca base sommergibili di Brest (U-Boot-Bunker) diviene bersaglio prioritario del RAF Bomber Command; sosta delle corazzate Scharnhorst, Gneisenau e Prinz Eugen fino all\'Op. Cerberus (feb 1942).',
    s15: 'Agosto 1944: mentre il Finistère rurale viene liberato dall\'avanzata alleata in Bretagna, nella città-fortezza di Festung Brest infuria fino al 18–19 settembre 1944 il feroce assedio condotto dall\'VIII Corpo USA del Gen. Middleton contro i paracadutisti di Ramcke.',
    s18: 'Brest in rovina inizia lo sgombero delle macerie e il ripristino del porto militare Atlantico della Marine Nationale.',
    s19: 'Avvio del piano urbanistico di ricostruzione moderna di Brest (Mathon) e rilancio dei cantieri dell\'arsenale marittimo sotto la Quarta Repubblica.',
  },
  FRH04: {
    s9_10: 'A Lorient-Keroman l\'ammiraglio Dönitz spinge alla massima espansione i giganteschi bunker U-Boot ("Lorient invulnerabile"); incursioni di bombardamento alleate radono al suolo la città civile.',
    s15: 'Agosto 1944: Vannes, Pontivy e l\'interno del Morbihan vengono liberati dalle colonne USA e dai maquis bretoni FFI, mentre le truppe tedesche ripiegano nella stretta fascia costiera di **Festung Lorient**.',
    s16: 'Dicembre 1944: l\'interno del Morbihan (Vannes) è sotto piena amministrazione civile del GPRF, mentre la vicina piazzaforte costiera di Lorient resta accerchiata fino a maggio 1945.',
    s17: 'Aprile 1945: il Morbihan interno opera sotto il GPRF (prime elezioni municipali col voto femminile del 29 aprile) mentre la sacca costiera di Lorient sta per capitolare (10 maggio 1945).',
    s18: 'Con la resa della sacca di Lorient (10 maggio 1945), l\'intero Morbihan torna unito sotto il GPRF avviando la ricostruzione del litorale.',
    s19: 'Sotto la Quarta Repubblica l\'intero Morbihan e la risorta città martire di Lorient sviluppano la pesca industriale e la ricostruzione portuale.',
    hist16: 'Morbihan — Vannes Liberata (GPRF · Entroterra vs Poche de Lorient)',
    hist17: 'Morbihan — GPRF (Entroterra Liberato · Poche de Lorient al litorale)',
  },
  FRG01: {
    s9_10: '28 marzo 1942: leggendaria **Operazione Chariot** britannica — il cacciatorpediniere HMS *Campbeltown* sperona ed esplode nel gigantesco bacino di carenaggio Normandie a Saint-Nazaire!',
    s15: 'Agosto 1944: **Nantes è liberata il 12 agosto** insieme all\'entroterra fino a Châteaubriant e Ancenis, isolando i resti tedeschi nella fascia estuariale di Festung Saint-Nazaire.',
    s16: 'Dicembre 1944: Nantes e la maggior parte della Loire-Inférieure operano sotto il GPRF, mentre il settore costiero occidentale di Saint-Nazaire rimane una sacca assediata.',
    s17: 'Aprile 1945: la Loire-Inférieure interna e Nantes vivono la ripresa repubblicana sotto il GPRF, separati dal fronte statico attorno all\'estuario di Saint-Nazaire (arreso l\'11 maggio 1945).',
    s18: 'Resa della sacca dell\'estuario della Loira a Bouvron (11 maggio 1945) e riunificazione amministrativa completa della Loire-Inférieure attorno a Nantes e Saint-Nazaire.',
    s19: 'Ripresa dei grandi cantieri navali Chantiers de l\'Atlantique a Saint-Nazaire e del traffico portuale atlantico di Nantes sotto il Piano Monnet.',
    hist16: 'Loire-Inférieure — Nantes Liberata (GPRF · Estuario assediato a Saint-Nazaire)',
    hist17: 'Loire-Inférieure — Nantes / GPRF (Fronte costiero di Saint-Nazaire)',
  },
  FRI32: {
    s9_10: 'Base sottomarina della Pallice a La Rochelle e presidio tedesco dell\'estuario della Gironda a Royan; intensa attività della rete partigiana dell\'Ovest.',
    s15: 'Agosto–Settembre 1944: l\'entroterra di Saintes, Saint-Jean-d\'Angély e Jonzac viene liberato da FFI e alleati, spingendo i presidi tedeschi nelle due ridotte costiere di La Rochelle e Royan.',
    s16: 'Dicembre 1944: l\'interno della Charente-Maritime (Saintes, Jonzac) è liberato sotto il GPRF, mentre sul litorale restano assediate le fasce costiere di La Rochelle–La Pallice e Royan.',
    s17: 'Aprile 1945: con la liberazione di Royan (Operazione Vénérable, 14–17 aprile), l\'intero entroterra è saldamente al GPRF mentre sola La Rochelle e le isole resistono fino all\'8 maggio.',
    s18: 'Charente-Maritime interamente riunificata e liberata nel maggio 1945; avviato lo sminamento delle coste atlantiche e la ricostruzione di Royan rasa al suolo.',
    s19: 'Rilancio del porto atlantico di La Pallice e dei piani modernisti di ricostruzione balneare e urbana di Royan sotto la Quarta Repubblica.',
    hist16: 'Charente-Maritime — Saintes Liberata (GPRF · Sacche costiere di La Rochelle & Royan)',
    hist17: 'Charente-Maritime — GPRF (Royan liberata Apr 1945 · Poche de La Rochelle)',
  },
  FRI12: {
    s9_10: 'La base Betasom di Bordeaux ospita i sommergibili italiani della Regia Marina e gli U-Boot della 12. U-Flottille; exploit del comando britannico "Cockleshell Heroes" (Operazione Frankton, dic 1942!).',
    s15: '28 agosto 1944: la Wehrmacht evacua Bordeaux risparmiandone il porto grazie alle trattative locali e al ripiegamento, lasciando però la guarnigione isolata alla Pointe de Grave.',
    s17: 'Aprile 1945 (Operazione Vénérable): la brigata francese del Médoc libera la Pointe de Grave sulla riva sinistra della Gironda sbloccando definitivamente l\'accesso marittimo al porto di Bordeaux.',
    s19: 'Bordeaux riprende i commerci viticoli internazionali e atlantici sotto la Quarta Repubblica con l\'elezione a sindaco di Jacques Chaban-Delmas (1947).',
  },

  // === CENTRO, LIMOUSIN, ALVERNIA (RESISTENZA, VICHY & STRAGI NAZISTE) ===
  FRK11: {
    s9_10: 'Vichy capitale dell\'État Français: nell\'aprile 1942 Pierre Laval torna a capo del governo imponendo la *Relève* e l\'allineamento totale alla Germania.',
    s11_12: 'Sotto occupazione militare tedesca (Operazione Anton, nov 1942) e con l\'istituzione dello STO e della Milice (Joseph Darnand), il governo di Vichy diviene un fantoccio svuotato d\'ogni autonomia.',
    s15: 'Agosto 1944: i tedeschi deportano forzatamente Philippe Pétain e Pierre Laval da Vichy a Sigmaringen (20 agosto); il regime pétainista cessa di esistere e l\'Allier passa al GPRF.',
    s19: 'Vichy e l\'Allier rientrano nella normalità repubblicana della Quarta Repubblica con forte industrializzazione meccanica a Montluçon.',
  },
  FRI23: {
    s14: '10 giugno 1944 (Haute-Vienne): nel quadro del terrore antipartigiano seguìto allo sbarco in Normandia, la 2ª Divisione SS "Das Reich" compie il barbaro **massacro di Oradour-sur-Glane** sterminando 643 civili e radendo al suolo il villaggio.',
    s15: '21 agosto 1944: Limoges è liberata dal maquis dell\'AL (Georges Guingouin) per resa negoziata della guarnigione tedesca senza spargimento di sangue cittadino.',
    s18: 'De Gaulle consacra il villaggio martire di Oradour-sur-Glane come monumento perpetuo intatto ("Ne pas reconstruire") nella memoria repubblicana.',
    hist14: 'Haute-Vienne (Oradour-sur-Glane — Eccidio SS Das Reich, 10 Giugno 1944)',
  },
  FRI21: {
    s14: '9 giugno 1944 (Corrèze): all\'indomani della liberazione partigiana temporanea di Tulle, la Divisione SS "Das Reich" impicca per rappresaglia 99 ostaggi civili ai lampioni di Tulle.',
    s15: 'Brive-la-Gaillarde è la prima città francese a liberarsi autonomamente con le proprie forze FFI (15 agosto 1944)!',
  },
  FRK12: {
    s14: 'Maggio–Giugno 1944: al **Mont-Mouchet** (al confine tra Cantal e Haute-Loire), migliaia di maquisards dell\'Auvergne affrontano una divisione tedesca in una sanguinosa battaglia campale difensiva per trattenere i rinforzi diretti in Normandia.',
    s15: 'Agosto 1944: piena liberazione del Massiccio Centrale e ripristino delle prefetture repubblicane.',
  },

  // === RODANO-ALPI & PROVENZA (MAQUIS, VERCORS, OCCUPAZIONE ITALIANA, DRAGOON & PARIGI 1947) ===
  FRK26: {
    s9_10: 'Lione "Capitale della Resistenza": Jean Moulin unifica i movimenti Combat, Franc-Tireur e Libération-Sud creando i MUR e poi l\'Armée Secrète.',
    s11_12: 'La Gestapo di **Klaus Barbie** a Lione arresta Jean Moulin e i capi resistenziali a Caluire (21 giugno 1943) dopo l\'istituzione del CNR.',
    s15: 'Fine agosto / 3 settembre 1944: la 1ère DFL francese e i partigiani FFI liberano Lione dopo l\'insurrezione operaia di Villeurbanne (24–26 agosto) e la fuga della Wehrmacht lungo la Saona.',
    s18: 'Édouard Herriot torna sindaco di Lione; rapida ripresa delle industrie tessili, chimiche e meccaniche sul Rodano.',
    s19: 'Lione e la valle del Rodano sono il fulcro industriale ed elettrico del Piano Monnet nella Quarta Repubblica (progetti idroelettrici della CNR).',
  },
  FRK24: {
    s11_12: 'Occupazione militare italiana della 4ª Armata a Grenoble (novembre 1942 – settembre 1943); le forze italiane garantiscono relativa tolleranza verso i rifugiati ebrei nell\'Isère rispetto alla Gestapo.',
    s13: 'Settembre 1943: la Wehrmacht sostituisce gli italiani e arresta decine di resistenti a Grenoble ("Saint-Barthélemy grenobloise"); sui monti del **Vercors** nasce il grande bastione partigiano.',
    s14: 'Giugno 1944: allo sbarco in Normandia il **Maquis du Vercors** proclama la *République libre du Vercors* (luglio), prima di essere investito da un feroce assalto tedesco aviotrasportato a Vassieux-en-Vercors.',
    s15: '22 agosto 1944: la 36ª Divisione USA e le FFI liberano Grenoble dopo una rapida puntata alpina seguìta all\'Operazione Dragoon.',
    s19: 'Grenoble guida la ricostruzione elettrometallurgica alpina e la ricerca scientifica sotto la Quarta Repubblica.',
    hist14: 'Isère (Grenoble & Massif du Vercors — Repubblica Partigiana del Vercors)',
  },
  FRK23: {
    s14: 'Drôme: settore meridionale del bastione partigiano del **Vercors** (La Chapelle-en-Vercors / Col de Rousset) mobilitato a sostegno dello sbarco in Normandia.',
    s15: '21–31 agosto 1944: feroce **Battaglia di Montélimar** (Task Force Butler e FFI) lungo la valle del Rodano per tagliare la ritirata alla 19ª Armata tedesca.',
    s19: 'Avvio dei grandi cantieri della diga di Donzère-Mondragon lungo la bassa Drôme, emblema idroelettrico del Piano Monnet nel 1947.',
  },
  FRK28: {
    s11_12: 'Haute-Savoie occupata dalla 4ª Armata italiana (nov 1942 – set 1943) mentre tra le vette alpini nasce il celebre maquis des Glières.',
    s14: 'Ricostituzione delle unità FFI savoiarde dopo il sacrificio epico di Tom Morel sull\'altopiano delle **Glières** (marzo 1944) e sabotaggi ferroviari per il D-Day.',
    s15: '19 agosto 1944: Annecy e l\'Alta Savoia insorgono costringendo alla resa i presidi tedeschi prima ancora dell\'arrivo regolare alleato.',
    s19: 'Ripresa industriale della valle dell\'Arve (decolletage) e della cooperazione transfrontaliera svizzero-francese sotto la Quarta Repubblica.',
  },
  FRK27: {
    s11_12: 'Savoie occupata dalle divisioni alpine italiane (4ª Armata — Gen. Mario Vercellino) dopo l\'Operazione Anton del novembre 1942.',
    s13: 'Operazione Achse (settembre 1943): subentro della Wehrmacht sulle valli savoiarde lungo la frontiera del Moncenisio e Piccolo San Bernardo.',
    s15: 'Fine agosto 1944: liberazione di Chambéry e della Maurienne; combattimenti alpini fino all\'inverno lungo le creste della frontiera italo-francese.',
    s19: '15 settembre 1947 (Trattato di Pace di Parigi): la Savoia ingloba ufficialmente il territorio dell\'altopiano del **Moncenisio (Plateau du Mont-Cenis)** ceduto dall\'Italia, potenziando gli impianti idroelettrici del Piano Monnet.',
    hist19: 'Savoie (Quatrième République — Annessione del Moncenisio, Trattato di Parigi 1947)',
  },
  FRL02: {
    s11_12: 'Hautes-Alpes occupate dalla 4ª Armata italiana nel novembre 1942 a ridosso del Colle del Monginevro.',
    s15: 'Agosto 1944: Task Force Butler e FFI liberano Gap e Briançon risalendo la Durance verso le Alpi.',
    s19: '15 settembre 1947 (Trattato di Pace di Parigi): il dipartimento delle Hautes-Alpes incorpora le vette strategiche di **Montgenèvre**, **Chaberton** e la **Vallée Étroite (Valle Stretta)** cedute dall\'Italia.',
    hist19: 'Hautes-Alpes (Quatrième République — Montgenèvre, Chaberton & Valle Stretta 1947)',
  },
  FRL03: {
    s11_12: 'Alpes-Maritimes (Nizza e Costa Azzurra): occupazione militare italiana della 4ª Armata (novembre 1942 – settembre 1943), ove le autorità italiane bloccarono per mesi le deportazioni naziste verso la zona francese protetta di Nizza.',
    s13: 'Settembre 1943: dopo l\'armistizio italiano le SS (Alois Brunner) prendono il controllo di Nizza scatenando rastrellamenti spietati; Nizza diventa fronte alpino sud.',
    s15: '28 agosto 1944: l\'insurrezione popolare di Nizza e lo sbarco aviotrasportato USA della 1st Airborne Task Force dell\'Operazione Dragoon liberano la Costa Azzurra.',
    s16: 'Nell\'inverno 1944–45 il fronte alpino resta attivo sulle cime dell\'Authion (conquistate solo nell\'aprile 1945 dalla 1ère DFL franco-alleata).',
    s19: '15 settembre 1947 (Trattato di Pace di Parigi & plebiscito d\'ottobre): le Alpes-Maritimes annettono ufficialmente l\'alta valle della Roia con i comuni di **Briga (La Brigue)** e **Tenda (Tende)** ceduti dall\'Italia alla Quarta Repubblica.',
    hist19: 'Alpes-Maritimes (Quatrième République — Annessione di Tenda & Briga, Trattato di Parigi 1947)',
  },
  FRL04: {
    s11_12: 'Operazione Anton: la Wehrmacht occupa Marsiglia; nel gennaio 1943 i tedeschi dinamitano e radono al suolo lo storico quartiere popolare del Vieux-Port (Rafle de Marseille).',
    s15: '15-28 agosto 1944: Operazione Dragoon e sbarco alleato in Provenza; l\'Armée B del Gen. de Lattre de Tassigny e le FFI liberano Marsiglia il 28 agosto espugnando Notre-Dame de la Garde.',
    s18: 'Nonostante i moli sabotati dai tedeschi in ritirata, il porto di Marsiglia gestisce il rimpatrio militare alleato e l\'approvvigionamento alimentare nazionale.',
    s19: 'Marsiglia grande snodo portuale tra la Quarta Repubblica, l\'Union Française nordafricana e i convogli verso l\'Indocina nel 1947.',
    hist15: 'Bouches-du-Rhône (Operazione Dragoon — Liberazione di Marsiglia, 28 Agosto 1944)',
  },
  FRL05: {
    s11_12: 'Operazione Anton e **Autoaffondamento della Flotta a Tolone** (27 novembre 1942): all\'alba dell\'Operazione Lila tedesca, la flotta d\'alto mare dell\'ammiraglio de Laborde si autoaffonda nella rada (77 unità, incluse *Strasbourg*, *Dunkerque* e *Provence*) sotto occupazione italiana.',
    s15: '15-26 agosto 1944: sbarco dell\'Operazione Dragoon sulle spiagge del Var (Saint-Tropez, Cavalaire) e dura battaglia di liberazione di Tolone vinta dai tirailleurs e dall\'Armée B del Gen. de Lattre.',
    s18: 'Avvio del complesso recupero dei relitti nella rada di Tolone e ripristino dell\'Arsenale Militare Marittimo mediterraneo.',
    s19: 'Tolone torna arsenale primario della Marine Nationale mediterranea nella Quarta Repubblica.',
    hist15: 'Var (Operazione Dragoon — Sbarco in Provenza & Presa di Tolone, Ago 1944)',
  },

  // === CORSICA (PRIMO DIPARTIMENTO LIBERATO) & OLTREMARE DOM-TOM ===
  FRM01: {
    s11_12: 'Operazione Anton in Corsica (11 novembre 1942): sbarco dell\'VII Corpo d\'Armata italiano ad Ajaccio; forte resistenza clandestina corsa attorno alla missione "Pearl Harbour".',
    s13: 'Settembre 1943: all\'indomani dell\'armistizio di Cassibile, le truppe italiane del VII Corpo d\'Armata (Gen. Giovanni Magli) cooperano attivamente con i partigiani corsi e i commandos del 1er Bataillon de Choc giunti col sottomarino **Casabianca**, liberando Ajaccio e trasformando la Corsica nel **1er Département de France Libéré**.',
    s14: 'Corsica primo dipartimento metropolitano liberato, integrata sotto l\'autorità del **Gouvernement Provisoire de la République Française (GPRF)** ("USS Corsica": 17 aeroporti alleati per il fronte italiano e Dragoon).',
    s15: 'Agosto 1944: dalle basi aeree corse di Ajaccio e Propriano decollano le squadriglie di copertura per lo sbarco dell\'Operazione Dragoon in Provenza.',
    s19: 'Corse-du-Sud reintegrata nell\'economia insulare mediterranea della Quarta Repubblica con l\'avvio della modernizzazione idrica e portuale di Ajaccio.',
    hist14: 'Corse-du-Sud (Ajaccio — "USS Corsica" & GPRF)',
  },
  FRM02: {
    s11_12: 'Bastia e l\'Alta Corsica presidiate dalle divisioni Friuli e Cremona del VII Corpo italiano tra il novembre 1942 e l\'agosto 1943.',
    s13: 'Settembre–4 ottobre 1943: durissimi scontri a Bastia, Teghime e San Fiorenzo tra unità italiane, commandos del sottomarino **Casabianca**, tabors marocchini e partigiani corsi contro la brigata Sturmbrigade Reichsführer-SS, fino alla completa liberazione di Bastia (4 ottobre 1943).',
    s14: 'Haute-Corse primo bastione metropolitano dell\'autorità del **GPRF** ("USS Corsica") e perno della proiezione aeronavale alleata su Toscana ed Elba.',
    s19: 'Haute-Corse (Bastia e Cap Corse) ricostruisce il porto danneggiato nei bombardamenti del 1943–44 sotto la Quarta Repubblica.',
    hist14: 'Haute-Corse (Bastia — "USS Corsica" & GPRF)',
  },
  FRY10: {
    s11_12: 'Giugno 1943: insurrezione popolare e delle truppe locali contro il governatore pétainista Constant Sorin ("L\'An Sorin"); ralliement al CFLN.',
    s18: 'Settembre 1945: la Guadalupa rientra nei programmi del GPRF e partecipa al dibattito costituzionale francese per l\'abolizione dello status coloniale.',
    s19: 'Con la **Loi de départementalisation del 19 marzo 1946**, la Guadalupa cessa d\'essere colonia ed entra a pieno titolo come **Département d\'Outre-Mer (DOM 971)** della Quarta Repubblica (Union Française).',
    hist19: 'Guadeloupe (Département d\'Outre-Mer — Quatrième République, Loi 1946)',
  },
  FRY20: {
    s11_12: '14 luglio 1943: rivolta popolare e ammutinamento a Fort Desaix contro l\'ammiraglio Georges Robert; passaggio al CFLN con Henri Hoppenot e liberazione delle 286 tonnellate d\'oro della Banque de France.',
    s18: 'Settembre 1945: la Martinica di Aimé Césaire (eletto sindaco di Fort-de-France e deputato costituente nel 1945) promuove l\'integrazione giuridica paritaria con la metropoli.',
    s19: 'Con la **Loi de départementalisation del 19 marzo 1946** (relatore Aimé Césaire), la Martinica diviene **Département d\'Outre-Mer (DOM 972)** della Quarta Repubblica Francese.',
    hist19: 'Martinique (Département d\'Outre-Mer — Quatrième République, Loi 1946)',
  },
  FRY30: {
    s11_12: 'Marzo 1943: il Comité de Salut Public di Cayenne depone il governatore pétainista René Veber e sancisce il ralliement al CFLN e agli Alleati.',
    s18: 'Settembre 1945: soppressione definitiva e smantellamento amministrativo dell\'antico Bagno penale (Bagne de Cayenne); governo civico transitorio sotto il GPRF.',
    s19: 'Con la **Loi de départementalisation del 19 marzo 1946**, la Guyane Française diviene ufficialmente **Département d\'Outre-Mer (DOM 973)** della Quarta Repubblica, con chiusura progressiva dei penitenziari e sviluppo spaziale/minerario futuro.',
    hist19: 'Guyane Française (Département d\'Outre-Mer — Quatrième République, Loi 1946)',
  },
  FRY40: {
    s11_12: '28 novembre 1942: il cacciatorpediniere *Léopard* delle FNFL sbarca a Saint-Denis liberando La Réunion per la Francia Combattente (Gov. André Capagorry).',
    s18: 'Settembre 1945: l\'isola della Riunione prepara il passaggio giuridico postbellico sotto il GPRF con elezione di Raymond Vergès e Léon de Lepervanche.',
    s19: 'Con la **Loi de départementalisation del 19 marzo 1946**, La Réunion cessa lo status coloniale e diviene **Département d\'Outre-Mer (DOM 974)** della Quarta Repubblica Francese.',
    hist19: 'La Réunion (Département d\'Outre-Mer — Quatrième République, Loi 1946)',
  },
  FRY50: {
    s11_12: 'Occupazione britannica temporanea (luglio 1942) e ralliement al CFLN (1943) nel Canale del Mozambico contestualmente al Madagascar.',
    s19: 'Con la legge francese del 9 maggio 1946 l\'arcipelago delle Comore (inclusa Mayotte) è separato dal Madagascar ed elevato a **Territoire d\'Outre-Mer (TOM)** della Quarta Repubblica nell\'Union Française, con capoluogo Dzaoudzi.',
    hist19: 'Mayotte — Territoire d\'Outre-Mer des Comores (Dzaoudzi)',
  },
};

function buildRegionalFranceFallbackNote(meta: FranceExtendableMeta, s: number): string {
  const isItalian = FRANCE_ITALIAN_ZONE_1942.has(meta.nuts);
  const label = `${meta.name} (Dép. ${meta.deptNum}, ${meta.region})`;

  if (s >= 19) {
    return `${label} — SET 1947: territorio della Quarta Repubblica Francese (Pres. Vincent Auriol, PM Paul Ramadier) dopo la rottura del Tripartitismo nel maggio 1947; i settori produttivi e infrastrutturali di ${meta.cheflieu} aderiscono al Piano Monnet di modernizzazione e al razionamento postbellico del pane e del carbone, sullo sfondo delle tensioni sociali CGT dell'autunno 1947 e dei Trattati di Pace di Parigi.`;
  }
  if (s >= 18) {
    return `${label} — SET 1945: dipartimento metropolitano interamente liberato sotto il Governo Provvisorio della Repubblica Francese (GPRF di de Gaulle). Dopo le storiche elezioni col suffragio femminile (aprile-ottobre 1945), l'area attorno a ${meta.cheflieu} affronta il rimpatrio dei prigionieri (STO/POW), i processi per collaborazionismo, le prime nazionalizzazioni e il varo della Sécurité Sociale.`;
  }
  if (s === 17) {
    return `${label} — APR 1945: territorio sotto sovranità ricostituita del GPRF mentre l'Assemblea Consultiva prepara la vittoria europea (maggio 1945); il 29 aprile 1945 le elettrici di ${meta.cheflieu} votano per la prima volta nella storia alle elezioni municipali mentre la 1ère Armée francese varca il Reno.`;
  }
  if (s === 16) {
    return `${label} — DIC 1944: amministrazione civile restaurata dai Commissaires de la République del GPRF attorno a ${meta.cheflieu}; riorganizzazione ferroviaria e razionamento d'emergenza nell'inverno 1944–45 per alimentare il fronte della 1ª Armata e degli Alleati verso la Sacca di Colmar e le Ardenne.`;
  }
  if (s === 15) {
    return `${label} — AGO 1944: territorio liberato dall'insurrezione patriottica delle Forces Françaises de l'Intérieur (FFI) e dall'avanzata combinata Overlord/Dragoon; a ${meta.cheflieu} il Comitato Dipartimentale di Liberazione (CDL) instaura la nuova amministrazione del GPRF.`;
  }
  if (s === 14) {
    return `${label} — GIU 1944: dipartimento sottoposto all'occupazione tedesca della Wehrmacht mentre scattano le mobilitazioni clandestine FFI/FTP del Plan Vert e Plan Violet a supporto del D-Day alleato in Normandia, contrastate da rastrellamenti e rappresaglie della Gestapo e della Milice.`;
  }
  if (s === 13) {
    return `${label} — SET 1943: a seguito dell'armistizio italiano (Operazione Achse), l'intero territorio metropolitano attorno a ${meta.cheflieu} ricade sotto il controllo diretto militare della Wehrmacht e della Milice di Darnand mentre il rifiuto dello STO alimenta i nuovi maquis nei rilievi circostanti.`;
  }
  if (s >= 11) {
    if (isItalian) {
      return `${label} — Operazione Anton (novembre 1942): occupazione militare italiana della 4ª Armata del Gen. Mario Vercellino a est del Rodano fino all'armistizio del settembre 1943.`;
    }
    return `${label} — Operazione Anton (11 novembre 1942): scomparsa della linea armistiziale del 1940, la Wehrmacht occupa l'intero territorio attorno a ${meta.cheflieu}; il collaborazionismo di Laval e lo STO (1943) accelerano la crescita clandestina della Resistenza.`;
  }
  // Steps 9-10 (1941-1942)
  if (meta.partition1940 === 'zone_libre') {
    return `${label} — 1941–42 (Zone libre): dipartimento sotto l'autorità dello Stato Francese di Vichy (Amm. Darlan poi Pierre Laval nell'aprile 1942), segnato dal razionamento alimentare, dal servizio di propaganda légionnaire e dall'unificazione delle reti clandestine Combat, Libération e Franc-Tireur.`;
  }
  if (meta.partition1940 === 'belgium_command') {
    return `${label} — 1941–42 (Militärverwaltung Belgien-Nordfrankreich): sfruttamento carbonifero e industriale coatto sotto il comando di Bruxelles, scioperi operai e sabotaggi ferroviari.`;
  }
  if (meta.partition1940 === 'alsace_moselle') {
    return `${label} — 1941–42 (CdZ-Gebiet annesso al Reich): germanizzazione forzata, bando della lingua francese e introduzione nell'agosto 1942 della coscrizione coatta nella Wehrmacht ("Malgré-nous").`;
  }
  return `${label} — 1941–42 (Zone occupée): controllo militare del Militärbefehlshaber in Frankreich attorno a ${meta.cheflieu}, requisizioni agricole e industriali per il Terzo Reich e prime esecuzioni d'ostaggi contro i sabotaggi FTP/OCM.`;
}

/**
 * Risolve qualsiasi dipartimento francese (o DOM/TOM) negli Step 9–19 della timeline.
 * Restituisce `null` per `s < 9` lasciando inalterati gli Step 0–8 storici di franceProvinces.ts.
 */
export function resolveFranceExtendedStep(
  meta: FranceExtendableMeta,
  s: number
): ResolvedTerritory | null {
  if (s < 9) return null;

  const nuts = meta.nuts.toUpperCase();
  const ov = FRANCE_DEPT_OVERRIDES[nuts];

  // 1. Oltremare francese (DOM/TOM FRY10..FRY50)
  if (meta.partition1940 === 'dom_tom') {
    let sovereign = 'VIC';
    let fac: FactionType = 'Fantoccio';
    if (nuts === 'FRY30' && s >= 12) {
      sovereign = 'FRA';
      fac = 'Alleati';
    } else if (nuts === 'FRY30') {
      sovereign = 'VIC_COL';
    } else if ((nuts === 'FRY10' || nuts === 'FRY20') && s >= 12) {
      sovereign = 'FRA';
      fac = 'Alleati';
    } else if (nuts === 'FRY40' && s >= 11) {
      sovereign = 'FRA';
      fac = 'Alleati';
    } else if (nuts === 'FRY50') {
      if (s >= 12) {
        sovereign = 'FRA';
        fac = 'Alleati';
      } else if (s >= 10) {
        sovereign = 'UK';
        fac = 'Alleati';
      }
    }

    let admin = 'Administration coloniale de l\'État français (Vichy)';
    let hName = meta.historicalName;
    if (s >= 19) {
      admin = nuts === 'FRY50'
        ? 'Quatrième République (Union Française) — Territoire des Comores (Dzaoudzi)'
        : `Quatrième République (Union Française) — Département d'Outre-Mer (${meta.cheflieu})`;
      hName = ov?.hist19 || `${meta.name} (Département d'Outre-Mer — Quatrième République)`;
    } else if (s >= 14) {
      admin = `Gouvernement Provisoire de la République Française (GPRF) — ${meta.cheflieu}`;
      hName = ov?.hist18 || `${meta.name} (GPRF — Ralliée aux Alliés)`;
    } else if (s >= 12) {
      admin = nuts === 'FRY20'
        ? 'Comité Français de Libération Nationale (CFLN) — Haut-Commissariat aux Antilles (Henri Hoppenot)'
        : `Comité Français de Libération Nationale (CFLN) — ${meta.cheflieu}`;
      if (nuts === 'FRY30') hName = 'Guyane française (Ralliement CFLN — Comité de Salut Public de Cayenne, Marzo 1943)';
      else if (nuts === 'FRY20') hName = 'Martinica (Ralliement CFLN — Presa della Bastiglia & Henri Hoppenot, 14 Luglio 1943)';
      else if (nuts === 'FRY10') hName = 'Guadalupa (Ralliement CFLN — Sollevazione Popolare e Rimozione Sorin, Giugno 1943)';
      else if (nuts === 'FRY40') hName = 'La Réunion (Ralliée à la France Libre — 28 Novembre 1942)';
      else if (nuts === 'FRY50') hName = 'Mayotte et Archipel des Comores (Ralliement CFLN — 1943)';
    }

    let domNote = buildRegionalFranceFallbackNote(meta, s);
    if (s >= 19 && ov?.s19) domNote = ov.s19;
    else if (s >= 18 && ov?.s18) domNote = ov.s18;
    else if (s >= 11 && ov?.s11_12) domNote = ov.s11_12;
    else if (nuts === 'FRY10' && s < 12) domNote = 'Isolamento sotto l\'amministrazione pétainista di Constant Sorin ("L\'An Sorin") e resistenza della "Dissidence" via Dominica.';
    else if (nuts === 'FRY20' && s < 12) domNote = 'Quartier generale dell\'ammiraglio Georges Robert con 286 tonnellate d\'oro della Banque de France, Béarn ed Émile Bertin sotto sorveglianza navale USA.';
    else if (nuts === 'FRY30' && s < 12) domNote = 'Amministrazione coloniale del governatore pétainista René Veber a Cayenne fino al Comité de Salut Public del marzo 1943.';
    else if (nuts === 'FRY50' && s < 12) domNote = s >= 10 ? 'Occupazione britannica preventiva di Mayotte (luglio 1942) nel Canale del Mozambico prima del ralliement al CFLN nel 1943.' : 'Dipendenza delle Comore sotto autorità amministrativa del Governatore Generale di Vichy in Madagascar.';

    return makeFrRes(sovereign, hName, domNote, fac, admin);
  }

  // 2. Sovranità & Fazione per la Francia Metropolitana (Steps 9–19)
  let sovereign = 'GER';
  let fac: FactionType = 'Asse';
  const isCorsica = nuts === 'FRM01' || nuts === 'FRM02';
  const isAlsaceMoselle = nuts === 'FRF11' || nuts === 'FRF12' || nuts === 'FRF33';

  if (s >= 18) {
    sovereign = 'FRA';
    fac = 'Alleati';
  } else if (s === 17) {
    if (FRANCE_ATLANTIC_POCKETS_16_17.has(nuts)) {
      sovereign = 'GER';
      fac = 'Asse';
    } else {
      sovereign = 'FRA';
      fac = 'Alleati';
    }
  } else if (s === 16) {
    if (nuts === 'FRF12' || FRANCE_ATLANTIC_POCKETS_16_17.has(nuts)) {
      sovereign = 'GER';
      fac = 'Asse';
    } else {
      sovereign = 'FRA';
      fac = 'Alleati';
    }
  } else if (s === 15) {
    if (isAlsaceMoselle) {
      sovereign = 'GER';
      fac = 'Asse';
    } else {
      sovereign = 'FRA';
      fac = 'Alleati';
    }
  } else if (s === 14) {
    if (nuts === 'FRD12') {
      sovereign = 'USA';
      fac = 'Alleati';
    } else if (nuts === 'FRD11') {
      sovereign = 'UK';
      fac = 'Alleati';
    } else if (isCorsica) {
      sovereign = 'FRA';
      fac = 'Alleati';
    } else {
      sovereign = 'GER';
      fac = 'Asse';
    }
  } else if (s === 13) {
    if (isCorsica) {
      sovereign = 'FRA';
      fac = 'Alleati';
    } else {
      sovereign = 'GER';
      fac = 'Asse';
    }
  } else if (s >= 11) {
    if (FRANCE_ITALIAN_ZONE_1942.has(nuts)) {
      sovereign = 'ITA';
      fac = 'Asse';
    } else {
      sovereign = 'GER';
      fac = 'Asse';
    }
  } else {
    // Steps 9–10 (DIC 1941 – AGO 1942)
    if (meta.partition1940 === 'zone_libre') {
      sovereign = 'VIC';
      fac = 'Fantoccio';
    } else {
      sovereign = 'GER';
      fac = 'Asse';
    }
  }

  // 3. Note dettagliate per dipartimento & fase
  let note: string;
  if (s >= 19 && ov?.s19) note = ov.s19;
  else if (s === 18 && ov?.s18) note = ov.s18;
  else if (s === 17 && ov?.s17) note = ov.s17;
  else if (s === 16 && ov?.s16) note = ov.s16;
  else if (s === 15 && ov?.s15) note = ov.s15;
  else if (s === 14 && ov?.s14) note = ov.s14;
  else if (s === 13 && ov?.s13) note = ov.s13;
  else if ((s === 11 || s === 12) && ov?.s11_12) note = ov.s11_12;
  else if ((s === 9 || s === 10) && ov?.s9_10) note = ov.s9_10;
  else note = buildRegionalFranceFallbackNote(meta, s);

  // 4. Nome Storico e Titolo Amministrativo rigorosi per ciascuna tappa
  let histName = `${meta.name} (${s >= 19 ? 'Quatrième République' : 'GPRF'})`;
  let adminTitle = 'Gouvernement Provisoire de la République Française (GPRF)';

  if (s >= 19) {
    histName = ov?.hist19 || `${meta.name} (Quatrième République — Plan Monnet 1947)`;
    adminTitle = 'Quatrième République Française — Président Vincent Auriol · PM Paul Ramadier';
  } else if (s === 18) {
    histName = ov?.hist18 || `${meta.name} (GPRF — France Libérée, Septembre 1945)`;
    adminTitle = 'Gouvernement Provisoire de la République Française (GPRF — Charles de Gaulle)';
  } else if (s === 17) {
    if (FRANCE_ATLANTIC_POCKETS_16_17.has(nuts)) {
      histName = ov?.hist17 || `${meta.name} (Festung Atlantica — Assedio Alleato)`;
      adminTitle = 'Deutsche Wehrmacht — Festung Atlantik';
    } else {
      histName = ov?.hist17 || `${meta.name} (GPRF — Territorio Liberato)`;
      adminTitle = 'Gouvernement Provisoire de la République Française (GPRF)';
    }
  } else if (s === 16) {
    if (nuts === 'FRF12' || FRANCE_ATLANTIC_POCKETS_16_17.has(nuts)) {
      histName = ov?.hist16 || `${meta.name} (Festung Atlantica — Guarnigione Tedesca)`;
      adminTitle = nuts === 'FRF12'
        ? 'Deutsche Wehrmacht — Heeresgruppe Oberrhein (Sacca di Colmar)'
        : 'Deutsche Wehrmacht — Festung Atlantik';
    } else {
      histName = ov?.hist16 || `${meta.name} (GPRF — Territorio Liberato)`;
      adminTitle = nuts === 'FRF11'
        ? 'Gouvernement Provisoire de la République Française (GPRF — 2e DB Gen. Leclerc)'
        : nuts === 'FRF33'
        ? 'Gouvernement Provisoire de la République Française (GPRF — 3rd U.S. Army Gen. Patton)'
        : 'Gouvernement Provisoire de la République Française (GPRF)';
    }
  } else if (s === 15) {
    if (isAlsaceMoselle) {
      histName = `${meta.name} (CdZ-Gebiet — Occupazione Tedesca)`;
      adminTitle = 'CdZ-Gebiet — Deutsches Reich';
    } else {
      histName = ov?.hist15 || `${meta.name} (Libérée — GPRF)`;
      adminTitle = 'Gouvernement Provisoire de la République Française (GPRF — Charles de Gaulle)';
    }
  } else if (s === 14) {
    if (nuts === 'FRD12') {
      histName = 'Manche (Cotentin / Cherbourg — 1ª Armata USA)';
      adminTitle = 'First United States Army / 21st Army Group (Lt. Gen. Omar Bradley)';
    } else if (nuts === 'FRD11') {
      histName = 'Calvados (Bayeux / Testa di Ponte Britannica — Operazione Overlord)';
      adminTitle = 'British Second Army / 21st Army Group (General Bernard Montgomery)';
    } else if (isCorsica) {
      histName = ov?.hist14 || ov?.hist15 || `${meta.name} ("USS Corsica" — GPRF)`;
      adminTitle = 'Gouvernement Provisoire de la République Française (GPRF — Charles de Gaulle)';
    } else {
      histName = ov?.hist15 ? `${meta.name} (Zone Occupée)` : `${meta.name} (Zone Occupée — Wehrmacht)`;
      adminTitle = isAlsaceMoselle
        ? 'CdZ-Gebiet — Deutsches Reich (Gau Baden-Elsass / Westmark)'
        : 'Zone occupée — Militärbefehlshaber in Frankreich (Paris)';
    }
  } else if (s === 13) {
    if (isCorsica) {
      histName = `${meta.name} (Libération de la Corse — 1er Département Français Libéré)`;
      adminTitle = 'Comité Français de la Libération Nationale (CFLN — Charles de Gaulle) / VII Corpo d\'Armata';
    } else {
      histName = `${meta.name} (Zone Occupée — Operazione Achse / Wehrmacht)`;
      adminTitle = isAlsaceMoselle
        ? 'CdZ-Gebiet — Deutsches Reich (Annexion de facto)'
        : 'Zone occupée — Militärbefehlshaber in Frankreich (Settembre 1943)';
    }
  } else if (s >= 11) {
    if (FRANCE_ITALIAN_ZONE_1942.has(nuts)) {
      histName = isCorsica
        ? `${meta.name} (Occupazione Militare Italiana — VII Corpo d'Armata, Novembre 1942)`
        : nuts === 'FRL05'
        ? 'Var (Toulon — Occupazione Italiana & Autoaffondamento Flotta, 27 Novembre 1942)'
        : `${meta.name} (Zona d'Occupazione Italiana in Francia — 4ª Armata, Novembre 1942)`;
      adminTitle = isCorsica
        ? 'Zona d\'Occupazione Italiana della Corsica — VII Corpo d\'Armata (Gen. Giacomo Carboni)'
        : 'Zona d\'Occupazione Italiana in Francia — 4ª Armata del Regio Esercito (Gen. Mario Vercellino)';
    } else {
      histName = nuts === 'FRK11'
        ? 'Allier (Vichy — Sede État Français sotto Occupazione Tedesca, Novembre 1942)'
        : `${meta.name} (Zone Occupée — Operazione Anton, Novembre 1942)`;
      adminTitle = isAlsaceMoselle
        ? 'CdZ-Gebiet — Deutsches Reich (Gau Baden-Elsass / Westmark)'
        : meta.partition1940 === 'zone_libre'
        ? 'Zone occupée (Opération Anton) — Militärbefehlshaber in Frankreich / Heeresgruppe Felber'
        : 'Zone occupée — Militärbefehlshaber in Frankreich (Hôtel Majestic, Paris)';
    }
  } else {
    // Steps 9–10
    histName = meta.name;
    adminTitle = meta.partition1940 === 'zone_libre'
      ? 'État français — Gouvernement de Vichy (Maréchal Philippe Pétain / Pierre Laval)'
      : meta.partition1940 === 'alsace_moselle'
      ? 'CdZ-Gebiet (Annexion de facto au Troisième Reich)'
      : meta.partition1940 === 'belgium_command'
      ? 'Militärverwaltung in Belgien und Nordfrankreich (Bruxelles)'
      : 'Zone occupée — Militärbefehlshaber in Frankreich (Hôtel Majestic, Paris)';
  }

  return makeFrRes(sovereign, histName, note, fac, adminTitle);
}
