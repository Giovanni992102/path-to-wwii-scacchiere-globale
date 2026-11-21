/**
 * Risolutore Geostorico Completo per le 19 Regioni della Repubblica di Finlandia (Steps 0–31: Gen 1936 – Dic 1954)
 * Copertura:
 * - s0–s5 (1936–1939): Repubblica prebellica (inclusa creazione di Lapin lääni il 1° gen. 1938 -> s>=1)
 * - s6–s8 (1940–apr. 1941): Välirauha, Linea Salpa, affitto Hanko & reinsediamento 420.000 Siirtoväki
 * - s9–s13 (dic. 1941–1943): Jatkosota (Päämaja Mikkeli, 20. Gebirgs-Armee Lappi, produzione difesa, Kilpapurjehdus Åland)
 * - s14–s15 (giu.–ago. 1944): Crisi estiva 1944 (Tali–Ihantala, Ilomantsi, raid Helsinki, Operazione Birke)
 * - s16–s17 (dic. 1944–apr. 1945): Guerra di Lapponia (Tornio, Rovaniemi bruciata, liberazione 27 apr. 1945) & Commissione Alleata
 * - s18–s20 (set. 1945–dic. 1947): Maanhankintalaki, riparazioni SOTEVA, ricostruzione Lapponia & Trattato di Parigi 1947
 * - s21–s28 (giu. 1948–dic. 1951): Patto YYA 1948, idroelettrico Kemijoki/Oulujoki & Statuto d'Autonomia Åland 1951
 * - s29–s31 (dic. 1952–dic. 1954): XV Olimpiadi di Helsinki 1952, saldo finale riparazioni 18 set. 1952 & bandiera Åland 1954
 */

type FactionType = 'Alleati' | 'Asse' | 'Comintern' | 'Neutrale';

export interface FinlandResolved {
  o: string;
  name: string;
  note: string;
  fac?: FactionType;
  adminEntity: string;
}

interface FinlandRegionSpec {
  id: string;
  regionLabel: string;
  pre1936Admin?: string;
  preAdmin: string;
  preName: string;
  preNote: string;
  valirauhaName?: string;
  valirauhaNote: string;
  jatkoName?: string;
  jatkoNote: string;
  summer1944Note?: string;
  laplandWarNote: string;
  postwar45_47Note: string;
  yya48_51Note: string;
  post52_54Note: string;
}

const FINLAND_REGIONS: Record<string, FinlandRegionSpec> = {
  FI1B1: {
    id: 'FI1B1',
    regionLabel: 'Helsinki–Uusimaa',
    preAdmin: 'Suomen tasavalta — Uudenmaan lääni / Pääkaupunki (Helsinki)',
    preName: 'Helsinki–Uusimaa (Suomen tasavalta — Capitale & Suomenlinna)',
    preNote:
      'Capitale della Repubblica di Finlandia sul Golfo di Finlandia, sede dell\'Eduskunta e della fortezza marittima di Suomenlinna; il 30 novembre 1939 i bombardamenti sovietici su Helsinki aprono la Guerra d\'Inverno.',
    valirauhaName: 'Helsinki–Uusimaa (Suomen tasavalta — Post–Mosca 1940 & Confine su Hanko)',
    valirauhaNote:
      'Dopo il Trattato di Mosca (12 marzo 1940), Uusimaa accoglie sfollati dalla Carelia e da Hanko (ceduta in affitto militare sovietico all\'estremità occidentale della regione) mentre cresce l\'allerta militare sul Golfo.',
    jatkoNote:
      'Capitale politica e industriale finlandese durante la Guerra di Continuazione (Presidenza Risto Ryti), collegata dai convogli scortati nel Golfo di Finlandia e difesa dal reggimento antiaereo ItR 1 attorno a Helsinki.',
    summer1944Note:
      'Primavera–Estate 1944: dopo i tre grandi bombardamenti aerei sovietici del febbraio 1944 respinti dall\'ottima difesa contraerea di Helsinki ("Torjuntavoitto"), in agosto Risto Ryti lascia la presidenza al Maresciallo Mannerheim per aprire i negoziati d\'armistizio.',
    laplandWarNote:
      'Sede dell\'Armistizio di Mosca (19 settembre 1944) e della Commissione Alleata di Controllo (ACC, guidata da Andrej Ždanov all\'Hotel Torni): mentre la Finlandia combatte nella Guerra di Lapponia per espellere la Wehrmacht, Uusimaa cede in affitto cinquantennale la vicina penisola di Porkkala all\'URSS.',
    postwar45_47Note:
      'Settembre 1945 – Dicembre 1947: processi di responsabilità bellica a Helsinki (1945–46), Presidenza Juho Kusti Paasikivi, scioglimento della Commissione Alleata dopo il Trattato di Parigi (1947 — che conferma l\'affitto della vicina base navale di Porkkala all\'URSS) e coordinamento delle consegne SOTEVA.',
    yya48_51Note:
      '1948–1951: nella cornice del Trattato YYA con l\'URSS (6 aprile 1948), Helsinki consolida la neutralità pragmatica ("Linea Paasikivi"), ricostruisce il porto commerciale e prepara le infrastrutture per i Giochi Olimpici.',
    post52_54Note:
      '1952–1954: nel luglio–agosto 1952 Helsinki ospita i XV Giochi Olimpici Estivi nello Stadio Olimpico, suggellando il ritorno della Finlandia nella comunità internazionale poche settimane prima del saldo integrale delle riparazioni di guerra (18 settembre 1952).',
  },
  FI1C1: {
    id: 'FI1C1',
    regionLabel: 'Varsinais-Suomi (Turku)',
    preAdmin: 'Suomen tasavalta — Turun ja Porin lääni (Turku / Åbo)',
    preName: 'Varsinais-Suomi (Turku / Åbo — Antica Capitale & Cantieri Crichton-Vulcan)',
    preNote:
      'Antica capitale storica e porto invernale sempre accessibile grazie ai rompighiaccio; nei cantieri Crichton-Vulcan di Turku furono costruite le corazzate costiere Väinämöinen e Ilmarinen e i sommergibili classe Vetehinen.',
    valirauhaNote:
      'Durante la pace ad interim (1940–41), Turku mantiene l\'unico grande sbocco portuale baltico invernale insieme alla Svezia e ospita numerose famiglie evacuate da Viipuri e Hanko.',
    jatkoNote:
      'Base logistica della Marina Finlandese nell\'Arcipelago (Saaristomeri) e centro di riparazioni navali ai cantieri Wärtsilä Crichton-Vulcan per cacciatorpediniere, motosiluranti e dragamine nel Baltico.',
    laplandWarNote:
      'Fine 1944 – Aprile 1945: il porto di Turku gestisce lo sminamento d\'urgenza dell\'arcipelago e la riconversione dei cantieri navali alle prime commesse sovietiche in conto riparazioni (SOTEVA).',
    postwar45_47Note:
      '1945–1947: i cantieri Crichton-Vulcan e Wärtsilä di Turku costruiscono decine di navi cargo, rimorchiatori e motonavi destinate alle riparazioni di guerra verso l\'URSS, mentre l\'agricoltura della Finlandia sud-occidentale accoglie coloni careliani.',
    yya48_51Note:
      '1948–1951: espansione meccanica e cantieristica di Turku, polo accademico bilingue (Università di Turku e Åbo Akademi) e consolidamento dei collegamenti marittimi nel Mar d\'Arcipelago.',
    post52_54Note:
      '1952–1954: completate le consegne delle riparazioni di guerra (1952), i cantieri di Turku riconvertono la capacità costruttiva verso grandi rompighiaccio e mercantili per l\'esportazione nordica e sovietica.',
  },
  FI1C2: {
    id: 'FI1C2',
    regionLabel: 'Kanta-Häme (Hämeenlinna)',
    preAdmin: 'Suomen tasavalta — Hämeen lääni (Hämeenlinna)',
    preName: 'Kanta-Häme (Hämeenlinna — Castello di Häme & Campo Corazzato di Parola)',
    preNote:
      'Regione storica del Tavastland intorno al castello medievale di Hämeenlinna; la piana sabbiosa di Parolannummi ospita il principale campo di addestramento militare e dei primi reparti blindati finlandesi.',
    valirauhaNote:
      'Tra 1940 e 1941 le caserme di Hämeenlinna e Parola riorganizzano le brigate di fanteria e i carri catturati ai sovietici (T-26 e T-28) dopo le lezioni della Guerra d\'Inverno.',
    jatkoNote:
      'A Parolannummi viene costituita e addestrata la Divisione Corazzata finlandese (Panssaridivisioona, Gen. Ruben Lagus), equipaggiata con carri T-26, BT-42 e Sturmgeschütz III poi decisivi nell\'estate 1944.',
    laplandWarNote:
      'Autunno 1944 – Primavera 1945: i reparti della Panssaridivisioona trasferiti da Parola combattono come Gruppo Corazzato lungo la direttrice Kemi–Rovaniemi durante la Guerra di Lapponia.',
    postwar45_47Note:
      '1945–1947: smobilitazione ordinata a Parola, insediamento di piccoli poderi careliani nelle terre fertili dell\'Häme (Maanhankintalaki) e ripresa ferroviaria sulla dorsale Helsinki–Tampere.',
    yya48_51Note:
      '1948–1951: Kanta-Häme integra pienamente i nuovi insediati rurali e potenzia le fabbriche alimentari e lanieri di Hämeenlinna e Forssa.',
    post52_54Note:
      '1952–1954: consolidamento della brigata corazzata permanente di Parola (Panssariprikaati) e crescita industriale lungo la ferrovia meridionale finlandese.',
  },
  FI1C3: {
    id: 'FI1C3',
    regionLabel: 'Päijät-Häme (Lahti)',
    preAdmin: 'Suomen tasavalta — Hämeen lääni (Lahden Radioasema)',
    preName: 'Päijät-Häme (Lahti — Grande Trasmettitore Yle & Snodo del Päijänne)',
    preNote:
      'Crocevia ferroviario e lacustre lungo la morena del Salpausselkä; ospita la celebre stazione radiofonica di Radiomäki a Lahti, nodo delle trasmissioni nazionali di Yleisradio e dell\'allerta aerea.',
    valirauhaNote:
      'Dal marzo 1940 Lahti diventa uno dei centri di smistamento ferroviario per gli evacuati careliani (Siirtoväki) e la città si prepara al nuovo asse difensivo interno.',
    jatkoNote:
      'I trasmettitori a onde lunghe di Lahti diffondono i comunicati del Quartier Generale (Päämaja) in tutto il Paese, mentre le officine del legno e della meccanica sostengono l\'economia bellica.',
    laplandWarNote:
      'Fine 1944 – 1945: la stazione militare e ospedaliera di Hennala a Lahti gestisce i campi di smobilitazione e il rientro dei reparti dalla Carelia e dal fronte settentrionale.',
    postwar45_47Note:
      '1945–1947: Lahti riceve uno dei tassi di crescita demografica più alti della Finlandia per l\'afflusso permanente di profughi da Viipuri e dell\'Istmo, espandendo industria mobiliera e tessile.',
    yya48_51Note:
      '1948–1951: Lahti afferma il proprio ruolo di grande città industriale dell\'interno attorno al Salpausselkä e al turismo invernale nordico.',
    post52_54Note:
      '1952–1954: sviluppo del polo manifatturiero, meccanico e del legno a Lahti e Hollola dopo il completamento delle riparazioni SOTEVA.',
  },
  FI1C4: {
    id: 'FI1C4',
    regionLabel: 'Kymenlaakso (Kotka & Kouvola)',
    preAdmin: 'Suomen tasavalta — Viipurin lääni (länsiosa — Kotka & Hamina)',
    preName: 'Kymenlaakso (Kotka, Kouvola & Fortezza di Hamina — Valle del Kymi)',
    preNote:
      'Polo industriale cartario del fiume Kymijoki, porto esportatore di Kotka e scuola ufficiali della riserva nella città stellata di Hamina; pesanti bombardamenti sovietici sul porto di Kotka nella Guerra d\'Inverno.',
    valirauhaNote:
      'Dopo il marzo 1940 Kymenlaakso diviene regione di prima linea sul Golfo di Finlandia: inizia qui il settore costiero meridionale della gigantesca Linea Salpa (Salpalinja, Virolahti–Miehikkälä–Luumäki) con bunker in granito e denti di drago.',
    jatkoNote:
      'Retrovia vitale del fronte dell\'Istmo (snodo ferroviario di Kouvola, scuola RUK ad Hamina) e base di pattugliamento aeronavale a Kotka-Kymi a sbarramento della Flotta del Baltico sovietica.',
    summer1944Note:
      'Giugno–Agosto 1944: la Linea Salpa a Virolahti e Miehikkälä viene portata a piena efficienza difensiva come ultimo baluardo alle spalle della battaglia d\'arresto sull\'Istmo di Carelia.',
    laplandWarNote:
      'Settembre 1944 – Aprile 1945: Kymenlaakso resta frontiera internazionale con la nuova provincia sovietica di Leningrado; i cantieri e il porto di Kotka avviano sminamento e riparazioni.',
    postwar45_47Note:
      '1945–1947: il porto di Kotka e le grandi cartiere di Kuusankoski, Myllykoski e Sunila diventano il motore della produzione di cellulosa e carta destinata alle riparazioni SOTEVA e alla ricostruzione.',
    yya48_51Note:
      '1948–1951: nuova provincia autonoma di Kymen lääni (istituita nel 1945 con ciò che restava alla Finlandia della vecchia Viipurin lääni), centrata su Kouvola e il porto di Kotka.',
    post52_54Note:
      '1952–1954: liberata dai vincoli SOTEVA nel settembre 1952, l\'industria forestale e portuaria del Kymenlaakso guida il boom delle esportazioni finlandesi di carta e cellulosa.',
  },
  FI1C5: {
    id: 'FI1C5',
    regionLabel: 'Etelä-Karjala (Lappeenranta & Imatra)',
    preAdmin: 'Suomen tasavalta — Viipurin lääni (Lappeenranta & Imatra)',
    preName: 'Etelä-Karjala (Lappeenranta, Imatra & Rapide del Vuoksi — Saimaa)',
    preNote:
      'Cuore industriale ed energetico dell\'alto fiume Vuoksi attorno al lago Saimaa e alla grande centrale idroelettrica di Imatrankoski; retrovia logistica vitale per il fronte dell\'Istmo di Carelia nel 1939–40.',
    valirauhaNote:
      'Col Trattato di Mosca (1940) il nuovo confine sovietico taglia il canale del Saimaa subito a sud di Lappeenranta ed Enso: Lappeenranta, Joutseno e Imatra diventano il settore centrale fortificato della Linea Salpa.',
    jatkoNote:
      'Trampolino d\'attacco dell\'armata finlandese verso l\'Istmo nel luglio 1941 e retrovia agricola-forestale tra Saimaa e Vuoksi, protetta dalla scuola di cavalleria di Lappeenranta e dagli impianti energetici di Imatra.',
    summer1944Note:
      'Giugno–Luglio 1944: tra il margine orientale dell\'Etelä-Karjala e l\'Istmo di Carelia si combatte la decisiva Battaglia di Tali–Ihantala (25 giugno – 9 luglio 1944), dove l\'artiglieria concentrata e le riserve finlandesi fermano l\'offensiva sovietica impedendo lo sfondamento verso la Finlandia interna.',
    laplandWarNote:
      'Settembre 1944 – Primavera 1945: la frontiera si consolida definitivamente tra Imatra e Svetogorsk (ex Enso); smobilitazione del fronte del Vuoksi e presidio sulla nuova linea di confine.',
    postwar45_47Note:
      '1945–1947: il taglio permanente del Canale di Saimaa isola i porti lacustri, ma Imatrankoski e l\'acciaieria di Imatra (Ovako / Vuoksenniska) alimentano l\'industria pesante del Paese e l\'accoglienza dei profughi careliani.',
    yya48_51Note:
      '1948–1951: nuova Kymen lääni orientale; Lappeenranta eredita funzioni amministrative e commerciali un tempo appartenute a Viipuri come capoluogo della Carelia Meridionale finlandese.',
    post52_54Note:
      '1952–1954: espansione siderurgica e forestale a Imatra, Lappeenranta e Joutseno lungo il bacino meridionale del lago Saimaa.',
  },
  FI1D1: {
    id: 'FI1D1',
    regionLabel: 'Etelä-Savo (Mikkeli — Päämaja)',
    preAdmin: 'Suomen tasavalta — Mikkelin lääni (Päämaja Mikkeli)',
    preName: 'Etelä-Savo (Mikkeli — Päämaja, Quartier Generale di Mannerheim & Olavinlinna)',
    preNote:
      'A Mikkeli il Maresciallo Mannerheim stabilisce fin dall\'autunno 1939 il Quartier Generale Supremo delle Forze Armate (Päämaja), protetto dall\'esteso labirinto lacustre del Saimaa attorno al castello medievale di Olavinlinna (Savonlinna).',
    valirauhaNote:
      'Nel 1940–41 il Päämaja di Mikkeli pianifica il riarmo dell\'esercito finlandese e la costruzione della Linea Salpa da Kotka al Saimaa fino a Kuhmo e alla Lapponia.',
    jatkoNote:
      'Per l\'intera Guerra di Continuazione (1941–1944), Mikkeli ospita l\'Alto Comando di Mannerheim, i servizi di decrittazione radio e le riunioni politiche-strategiche supreme della Finlandia.',
    summer1944Note:
      'Estate 1944: dal Päämaja di Mikkeli Mannerheim dirige lo spostamento rapido delle divisioni dalla Carelia Orientale all\'Istmo per vincere la battaglia d\'arresto di Tali–Ihantala e di Ilomantsi prima di assumere la Presidenza della Repubblica (4 agosto 1944).',
    laplandWarNote:
      'Autunno 1944 – Aprile 1945: Mikkeli coordina la complessa smobilitazione imposta dall\'Armistizio di Mosca e contemporaneamente le operazioni del III Corpo d\'Armata nella Guerra di Lapponia.',
    postwar45_47Note:
      '1945–1947: il Päämaja è trasferito a Helsinki; Mikkelin lääni accoglie migliaia di agricoltori careliani reinsediati grazie alla legge Maanhankintalaki attorno al lago Saimaa e Savonlinna.',
    yya48_51Note:
      '1948–1951: trasformazione economica dell\'Etelä-Savo basata su silvicoltura, flottazione lacustre del legname sul Saimaa e piccole imprese agricole familiari.',
    post52_54Note:
      '1952–1954: consolidamento amministrativo della Mikkelin lääni attorno a Mikkeli, Pieksämäki e Savonlinna nella Finlandia postbellica.',
  },
  FI1D2: {
    id: 'FI1D2',
    regionLabel: 'Pohjois-Savo (Kuopio & Varkaus)',
    preAdmin: 'Suomen tasavalta — Kuopion lääni (Kuopio)',
    preName: 'Pohjois-Savo (Kuopio & Varkaus — Cuore Lacustre e Meccanico della Savo)',
    preNote:
      'Regione centrale del sistema lacustre del Kallavesi dominata da Kuopio e dalle grandi officine meccaniche e cartiere Ahlström di Varkaus, nodo logistico tra l\'interno finlandese e la Carelia Settentrionale.',
    valirauhaNote:
      'Nel 1940–41 Varkaus e Kuopio diventano centro vitale di accoglienza per gli sfollati careliani di lingua ortodossa e luterana da Sortavala e Suojärvi.',
    jatkoNote:
      'Le fonderie e cantieri fluviali di Varkaus riparano cannoni, chiatte lacustri per il Lago Ladoga e materiali ferroviari mentre la Savo fornisce interi reggimenti di fanteria sul fronte careliano.',
    laplandWarNote:
      'Fine 1944 – 1945: smobilitazione della popolazione alle armi e conversione delle officine meccaniche di Varkaus per costruire caldaie e macchine industriali destinate alle riparazioni SOTEVA.',
    postwar45_47Note:
      '1945–1947: intenso dissodamento forestale per le nuove fattorie create con la Maanhankintalaki (Kuopio, Iisalmi) e produzione di macchinari per cartiere a Varkaus in conto riparazioni.',
    yya48_51Note:
      '1948–1951: Kuopio consolida il ruolo di capitale culturale ed economica della Finlandia orientale interna; insediamento a Kuopio della nuova sede dell\'Arcivescovado Ortodosso finlandese evacuato da Sortavala.',
    post52_54Note:
      '1952–1954: completate le forniture belliche (1952), la meccanica di Varkaus e il settore lattiero-forestale della Savo Settentrionale si orientano al mercato interno ed estero.',
  },
  FI1D3: {
    id: 'FI1D3',
    regionLabel: 'Pohjois-Karjala (Joensuu & Ilomantsi)',
    preAdmin: 'Suomen tasavalta — Kuopion lääni (itäosa / Joensuu)',
    preName: 'Pohjois-Karjala (Joensuu, Ilomantsi & Pielinen — Frontiera della Taiga)',
    preNote:
      'Carelia Settentrionale tra il lago Pielinen e la taiga confinaria; nella Guerra d\'Inverno i reparti su sci (Gruppo Talvela / Pajari) fermano e distruggono colonne sovietiche provenienti dalla Carelia sovietica.',
    valirauhaNote:
      'Dal marzo 1940 Ilomantsi, Tuupovaara e Kiihtelysvaara diventano frontiera esterna della Finlandia dopo la cessione di Suojärvi: estesi sbarramenti anticarro e fortificazioni della Linea Salpa sorgono a est di Joensuu.',
    jatkoNote:
      'Base avanzata della 14ª Divisione del Col. Erkki Raappana (direttrice Ilomantsi–Repola–Rukajärvi) e dell\'Armata di Carelia verso Suojärvi nel 1941–1944; importante polo minerario del rame a Outokumpu.',
    summer1944Note:
      'Luglio–Agosto 1944: ad Ilomantsi, sull\'estremo margine orientale di Pohjois-Karjala, il Gruppo Raappana accerchia e sbaraglia due divisioni sovietiche (Battaglia di Ilomantsi, 26 lug. – 13 ago. 1944), chiudendo vittoriosamente le grandi offensive estive sul fronte orientale.',
    laplandWarNote:
      'Settembre 1944 – Aprile 1945: ripristino del confine del 1940 lungo Virmajärvi–Tohmajärvi–Ilomantsi; rientro e reinsediamento parziale dei profughi di Raja-Karjala nell\'ovest della regione.',
    postwar45_47Note:
      '1945–1947: il rame della miniera di Outokumpu fornisce rame grezzo e cavi indispensabili sia per l\'elettrificazione nazionale sia per le riparazioni di guerra SOTEVA.',
    yya48_51Note:
      '1948–1951: valorizzazione mineraria (Outokumpu), forestale (Enso-Gutzeit a Lieksa/Uimaharju) e creazione di decine di villaggi rurali di bonifica in Carelia Settentrionale.',
    post52_54Note:
      '1952–1954: consolidamento della Carelia Settentrionale finlandese (dal 1960 Pohjois-Karjalan lääni) attorno al porto fluviale di Joensuu, Lieksa e Outokumpu.',
  },
  FI1D5: {
    id: 'FI1D5',
    regionLabel: 'Keski-Pohjanmaa (Kokkola)',
    preAdmin: 'Suomen tasavalta — Vaasan lääni (pohjoisosa — Kokkola)',
    preName: 'Keski-Pohjanmaa (Kokkola / Gamlakarleby — Cantieri & Chimica del Quarken)',
    preNote:
      'Provincia costiera bilingue sul Golfo di Botnia tra Oulu e Vaasa, forte tradizione marinara e cantieristica attorno a Kokkola (Gamlakarleby).',
    valirauhaNote:
      'Nel 1940–41 Kokkola sostiene le comunicazioni costiere e accoglie contingenti di evacuati rurali dall\'Istmo e da Sortavala.',
    jatkoNote:
      'Retrovia agricola e marittima pacifica durante la Guerra di Continuazione; protezione delle rotte mercantili nel Golfo di Botnia.',
    laplandWarNote:
      'Autunno 1944 – 1945: la ferrovia e la litoranea dell\'Ostrobotnia Centrale fungono da asse logistico di evacuazione civile dalla Lapponia meridionale durante la Lapin sota.',
    postwar45_47Note:
      '1945–1947: a Kokkola (Ykspihlaja) si pongono le basi della nuova industria chimica e metallurgica pesante di Stato (Rikkihappo ja Superfosfaattitehtaat — Kemira) a supporto dell\'agricoltura.',
    yya48_51Note:
      '1948–1951: espansione chimica e portuale a Ykspihlaja–Kokkola e potenziamento dell\'economia lattiero-casearia lungo i fiumi Perhonjoki e Lestijoki.',
    post52_54Note:
      '1952–1954: crescita stabile del porto chimico-industriale di Kokkola nell\'ambito della ricostruita economia export finlandese.',
  },
  FI193: {
    id: 'FI193',
    regionLabel: 'Keski-Suomi (Jyväskylä)',
    preAdmin: 'Suomen tasavalta — Vaasan ja Hämeen läänit (Jyväskylä — Valtion asetehtaat)',
    preName: 'Keski-Suomi (Jyväskylä — Arsenali Nazionali VKT, Tourula & Tikkakoski)',
    preNote:
      'Cuore protetto dell\'industria bellica finlandese: a Tourula sorge la Valtion Kivääritehdas (VKT, fucile M/39 "Ukko-Pekka", pistola Lahti L-35), a Jyväskylä la fabbrica statale d\'artiglieria (VTT) e a Tikkakoski la celebre Oy Tikkakoski Ab (pistola mitragliatrice Suomi KP/-31).',
    valirauhaNote:
      'Durante il 1940–41 gli stabilimenti di Tourula, Rautpohja e Tikkakoski raddoppiano turni e linee produttive di armi individuali e obici in vista di un nuovo conflitto.',
    jatkoNote:
      'Produzione ininterrotta di armi automatiche Suomi KP/-31, fucili anticarro Lahti L-39 da 20 mm e cannoni campali a Rautpohja (Jyväskylä) per rifornire l\'intero fronte finlandese.',
    laplandWarNote:
      'Fine 1944 – Aprile 1945: cessata la produzione bellica per la Wehrmacht, gli arsenali statali di Jyväskylä e Tikkakoski avviano la riconversione civile e le prime lavorazioni meccaniche per le riparazioni SOTEVA.',
    postwar45_47Note:
      '1945–1947: gli arsenali bellici vengono riorganizzati in grandi officine civili statali (Valtion Metallitehtaat — poi Valmet, 1946–51), producendo macchine per cartiere, trattori e locomotive per l\'URSS (SOTEVA) e il Paese.',
    yya48_51Note:
      '1948–1951: consolidamento di Valmet a Rautpohja e Tourula (macchine da taglio, trattori Valmet dal 1951, macchine da cucire a Tikkakoski) come pilastro metalmeccanico civile della Finlandia.',
    post52_54Note:
      '1952–1954: con la fine delle riparazioni (settembre 1952), la Valmet di Jyväskylä diventa uno dei leader mondiali nella costruzione di macchine continue da carta per l\'esportazione.',
  },
  FI194: {
    id: 'FI194',
    regionLabel: 'Etelä-Pohjanmaa (Seinäjoki & Lapua)',
    preAdmin: 'Suomen tasavalta — Vaasan lääni (Seinäjoki / Lapua)',
    preName: 'Etelä-Pohjanmaa (Seinäjoki & Lapua — Fabbrica Statale Munizioni)',
    preNote:
      'Pianure agricole del Lakeus, nodo ferroviario di Seinäjoki e roccaforte delle Guardie Bianche (Suojeluskunta); a Lapua sorge la Fabbrica Statale di Cartucce (Lapuan Patruunatehdas).',
    valirauhaNote:
      'Nel 1940–41 Seinäjoki e Lapua ricostituiscono le riserve strategiche nazionali di munizioni e accolgono famiglie agricole profughe dalla Carelia.',
    jatkoNote:
      'La Lapuan Patruunatehdas fornisce centinaia di milioni di cartucce calibro 7,62×53R e 9 mm per le truppe sul fronte careliano e nell\'Estremo Nord; Seinäjoki smista i treni ospedale e truppe per Oulu.',
    laplandWarNote:
      'Novembre 1944: in ottemperanza all\'Armistizio di Mosca vengono sciolte le Suojeluskunta e i Lotta Svärd in tutto il Paese; Seinäjoki rimane perno ferroviario nord-sud per il rientro dei reparti dalla Lapponia.',
    postwar45_47Note:
      '1945–1947: riconversione civile delle fabbriche di munizioni di Lapua e valorizzazione delle fertili pianure del Kyrönjoki per la sicurezza alimentare postbellica.',
    yya48_51Note:
      '1948–1951: Seinäjoki cresce come principale polo amministrativo e ferroviario della Finlandia centro-occidentale interna, integrando cooperativismo agricolo e meccanizzazione.',
    post52_54Note:
      '1952–1954: sviluppo agricolo, alimentare e cartario dell\'Ostrobotnia Meridionale attorno a Seinäjoki, Lapua e Kurikka.',
  },
  FI195: {
    id: 'FI195',
    regionLabel: 'Pohjanmaa (Vaasa)',
    preAdmin: 'Suomen tasavalta — Vaasan lääni (Vaasa / Vasa)',
    preName: 'Pohjanmaa (Vaasa / Vasa — Ponte Strategico del Kvarken con la Svezia)',
    preNote:
      'Regione costiera bilingue sullo stretto del Kvarken (solo 80 km da Umeå in Svezia): durante la Guerra d\'Inverno Vaasa è il porto e ponte sul ghiaccio vitale per rifornimenti svedesi e volontari internazionali.',
    valirauhaNote:
      'Nel settembre 1940 attraverso i porti di Vaasa e Jakobstad/Pietarsaari iniziano gli sbarchi di truppe e materiali tedeschi in transito ferroviario verso la Norvegia settentrionale e Rovaniemi.',
    jatkoNote:
      'Retrovia industriale (officine meccaniche Wärtsilä-Wasa, tessile) e punto di imbarco verso la neutrale Svezia per i bambini evacuati finlandesi ("Sotalapset", oltre 70.000 bimbi accolti in famiglie svedesi 1941–44).',
    laplandWarNote:
      'Fine 1944 – Aprile 1945: Vaasa ospita migliaia di sfollati civili evacuati dalla Lapponia settentrionale in collaborazione con la Croce Rossa Svedese oltre il Kvarken.',
    postwar45_47Note:
      '1945–1947: le officine meccaniche Strömberg di Vaasa (impianti elettrici e motori industriali) assumono un ruolo chiave nelle forniture tecnologiche delle riparazioni SOTEVA.',
    yya48_51Note:
      '1948–1951: consolidamento di Strömberg / Vaasa nell\'industria elettrotecnica nazionale e ripresa dei traffici passeggeri e commerciali tra Vaasa e Umeå.',
    post52_54Note:
      '1952–1954: espansione manifatturiera bilingue a Vaasa, Jakobstad e Kristinestad nella ripresa economica nordica del dopoguerra.',
  },
  FI196: {
    id: 'FI196',
    regionLabel: 'Satakunta (Pori & Rauma)',
    preAdmin: 'Suomen tasavalta — Turun ja Porin lääni (Pori & Rauma)',
    preName: 'Satakunta (Pori & Rauma — Cantieri Navali, Rame & Metallurgia)',
    preNote:
      'Porti industriali del Mar di Botnia alla foce del Kokemäenjoki: fonderie di rame a Pori, legnami a Rauma e polo calzaturiero-cartario.',
    valirauhaNote:
      'Nel 1940–41 l\'aeroporto militare di Pori e i porti del Satakunta vengono ampliati mentre la regione assorbe sfollati provenienti dalla Carelia.',
    jatkoNote:
      'L\'aeroporto di Pori ospita reparti aerei di collegamento tedeschi e finlandesi; la raffineria di rame Outokumpu a Pori e la nuova fonderia di Harjavalta forniscono rame essenziale per munizioni e cavi militari.',
    laplandWarNote:
      'Fine 1944 – 1945: la raffineria di Pori e gli impianti di Harjavalta (costruiti dal 1944 per l\'estrazione del rame e nichel) diventano strategici per la ricostruzione elettrica e le riparazioni SOTEVA.',
    postwar45_47Note:
      '1945–1947: avvio dei grandi cantieri Rauma-Raahe / Rauma-Repola (costruzione di golette e navi in legno/acciaio per le riparazioni all\'URSS) e della prima colata alla fonderia di Harjavalta (1945–47).',
    yya48_51Note:
      '1948–1951: a Harjavalta l\'Outokumpu sviluppa la rivoluzionaria tecnologia metallurgica della fusione in sospensione ("flash smelting", 1949), mentre Rauma consegna decine di navi SOTEVA.',
    post52_54Note:
      '1952–1954: i cantieri Rauma-Repola e l\'industria metallurgica Pori–Harjavalta guidano l\'esportazione tecnologica finlandese dopo il saldo delle riparazioni del 1952.',
  },
  FI197: {
    id: 'FI197',
    regionLabel: 'Pirkanmaa (Tampere)',
    preAdmin: 'Suomen tasavalta — Hämeen lääni (Tampereen teollisuusalue)',
    preName: 'Pirkanmaa (Tampere — La "Manchester del Nord" & Officine Tampella/Lokomo)',
    preNote:
      'Capitale manifatturiera e metalmeccanica della Finlandia sulle rapide del Tammerkoski: sede delle officine Tampella (mortai pesanti Krh/38 e artiglierie), delle acciaierie Lokomo e della fabbrica aeronautica statale (Valtion Lentokonetehdas a Härmälä).',
    valirauhaNote:
      'Tra 1940 e 1941 gli impianti Tampella, Lokomo e VL di Tampere accrescono la produzione di mortai, granate e caccia/riparazioni aeronautiche (VL Myrsky e caccia alleati giunti nella Guerra d\'Inverno).',
    jatkoNote:
      'Motore dell\'industria pesante bellica finlandese nonostante gli allarmi aerei: Tampere produce quasi l\'intera dotazione nazionale di mortai d\'accompagnamento, locomotive e fusioni corazzate.',
    laplandWarNote:
      'Autunno 1944 – 1945: immediata riconversione di Tampella, Lokomo e Nokia (gomma e cavi) verso le commesse prioritarie di macchinari forestali, turbine e cavi elettrici per le riparazioni di guerra (SOTEVA).',
    postwar45_47Note:
      '1945–1947: Tampere diventa il cuore della produzione industriale SOTEVA (macchinari per cellulosa Tampella, locomotive, escavatori Lokomo) integrando migliaia di operai smobilitati e sfollati.',
    yya48_51Note:
      '1948–1951: crescita delle industrie tessili (Finlayson), meccaniche (Tampella, Lokomo) e dell\'elettronica/cavi Nokia nel distretto di Tampere.',
    post52_54Note:
      '1952–1954: superate le consegne forzate nel settembre 1952, Tampella, Lokomo e l\'area industriale di Tampere–Nokia guidano il decollo industriale e tecnologico della Finlandia.',
  },
  FI1D7: {
    id: 'FI1D7',
    regionLabel: 'Lappi (Rovaniemi)',
    pre1936Admin: 'Suomen tasavalta — Oulun lääni (Lapin kihlakunta, fino al 31 dic. 1937)',
    preAdmin: 'Suomen tasavalta — Lapin lääni (istituita il 1° gennaio 1938)',
    preName: 'Lappi (Rovaniemi & Jäämerentie — Porta della Lapponia Artica)',
    preNote:
      'Territorio artico staccato da Oulu il 1° gennaio 1938 come Lapin lääni con capoluogo Rovaniemi: testa di linea ferroviaria della Jäämerentie (Strada dell\'Oceano Artico verso Liinahamari) e teatro di sbarramento difensivo a Pelkosenniemi–Märkäjärvi nel 1939–40.',
    valirauhaNote:
      'Dopo la cessione di Salla Orientale (marzo 1940), la nuova frontiera taglia la Lapponia presso Kairala; l\'accordo di transito con il Reich (settembre 1940) trasforma Rovaniemi e la Jäämerentie in arteria logistica tedesca verso Petsamo e Kirkenes.',
    jatkoNote:
      'Dal giugno 1941 Rovaniemi ospita il Quartier Generale della 20ª Armata da Montagna tedesca (AOK Norwegen / 20. Gebirgs-Armee: Gen. Dietl, poi Gen. Rendulic), guidando l\'offensiva nel nord estremo e costruendo piste militari tra Kemi, Kemijärvi e Ivalo.',
    summer1944Note:
      'Agosto 1944: in vista del collasso del fronte meridionale, il comando tedesco prepara in Lapponia l\'Operazione Birke per difendere le rotte di ripiegamento dalla Penisola di Kola verso la Norvegia settentrionale.',
    laplandWarNote:
      'Guerra di Lapponia (settembre 1944 – 27 aprile 1945): in base all\'Armistizio di Mosca l\'esercito finlandese (Gen. Hjalmar Siilasvuo) sbarca a Tornio il 1° ottobre 1944 e respinge la Wehrmacht. In ritirata i tedeschi attuano una sistematica terra bruciata (incendio totale di Rovaniemi nell\'ottobre 1944), lasciando la provincia devastata fino alla liberazione dell\'ultimo villaggio (Kilpisjärvi, 27 aprile 1945).',
    postwar45_47Note:
      '1945–1947: immane opera di sminamento di decine di migliaia di ordigni tedeschi e ricostruzione dalle ceneri; Alvar Aalto redige il celebre "Piano a Corna di Renna" (Poronsarvi) per la rinascita urbana di Rovaniemi mentre gli sfollati di Petsamo trovano terra nel sud-ovest della Lapponia.',
    yya48_51Note:
      '1948–1951: completamento della centrale idroelettrica di Isohaara sul Kemijoki (1949) e avvio dello sfruttamento energetico dei grandi fiumi lapponi per la ricostruzione dell\'industria nordica.',
    post52_54Note:
      '1952–1954: ricostruzione completata dei principali centri lapponi (Rovaniemi, Kemi, Tornio, Kemijärvi), potenziamento forestale e diga di Petäjäskoski sul fiume Kemijoki lungo la frontiera orientale sovietica.',
  },
  FI1D8: {
    id: 'FI1D8',
    regionLabel: 'Kainuu (Kajaani & Suomussalmi)',
    preAdmin: 'Suomen tasavalta — Oulun lääni (Kainuun kihlakunta)',
    preName: 'Kainuu (Kajaani, Suomussalmi & Strada di Raate — La Leggenda dei Motti)',
    preNote:
      'Foreste della Finlandia nord-orientale: nella Guerra d\'Inverno (dic. 1939 – gen. 1940) a Suomussalmi e sulla Strada di Raate la 9ª Divisione del Col. Hjalmar Siilasvuo annienta con la tattica dei "motti" la 163ª e la 44ª Divisione sovietica, salvando la Finlandia dal taglio in due tronconi (anche scontri eroici a Kuhmo).',
    valirauhaNote:
      'Nel 1940–41 i settori confinari di Suomussalmi e Kuhmo (dove il Trattato di Mosca lascia intatto il confine del 1920) vengono rinforzati con sbarramenti della Linea Salpa a chiusura della rotta verso Kajaani.',
    jatkoNote:
      'Da Suomussalmi e Juntusranta muove nel luglio 1941 il III Corpo d\'Armata finlandese (Gruppo F / Div. J) verso Uhtua (Kalevala) e Kestenga lungo il fronte nord-careliano fino al 1944.',
    laplandWarNote:
      'Fine 1944 – Aprile 1945: ripristino pacifico della linea di confine del 1940 a est di Kuhmo e Suomussalmi; smobilitazione e riapertura delle vie ferroviarie e di Kajaani.',
    postwar45_47Note:
      '1945–1947: ricostruzione rurale dei villaggi di confine di Suomussalmi e Kuhmo devastati nel 1939–40; riavvio della grande cartiera di Kajaani (Kajaani Oy) e dell\'industria forestale.',
    yya48_51Note:
      '1948–1951: avvio dei primi grandi sbarramenti idroelettrici sul fiume Oulujoki–Emäjoki (bacino dell\'Oulujärvi) e bonifica delle torbiere del Kainuu.',
    post52_54Note:
      '1952–1954: scoperta e apertura della miniera di ferro di Otanmäki (1953, vicino al lago Oulujärvi) e crescita del polo cartario di Kajaani nel Kainuu.',
  },
  FI1D9: {
    id: 'FI1D9',
    regionLabel: 'Pohjois-Pohjanmaa (Oulu)',
    preAdmin: 'Suomen tasavalta — Oulun lääni (Oulun kaupunki)',
    preName: 'Pohjois-Pohjanmaa (Oulu / Uleåborg & Raahe — La Vita della Nazione)',
    preNote:
      'Grande porto settentrionale alla foce dell\'Oulujoki nella strozzatura più stretta tra frontiera URSS e Golfo di Botnia (130 km): snodo critico difeso indirettamente dalle vittorie finlandesi a Suomussalmi e Kuhmo.',
    valirauhaNote:
      'Nel 1940–41 l\'Oulun lääni perde la porzione orientale di Kuusamo (Paanajärvi) al Trattato di Mosca, mentre Oulu diviene nodo ferroviario di transito tedesco verso la Lapponia.',
    jatkoNote:
      'Base logistica e aeroportuale mista a Oulu per il fronte settentrionale finno-tedesco (Kiestinki/Uhtua), oltre a polo chimico-forestale dell\'Oulujoki.',
    laplandWarNote:
      'Autunno 1944 – Aprile 1945: Oulu diviene il quartier generale arretrato di smistamento per l\'offensiva finlandese della Guerra di Lapponia (verso Kemi–Tornio) e per decine di migliaia di evacuati lapponi.',
    postwar45_47Note:
      '1945–1947: avvio del programma di centrali idroelettriche sull\'Oulujoki (Merikoski, Pyhäkoski) per sostituire l\'energia perduta in Carelia sul fiume Vuoksi.',
    yya48_51Note:
      '1948–1951: costruzione degli impianti industriali Oulu Oy (cellulosa) e Typpi Oy (fertilizzanti azotati fondata a Oulu nel 1950–52) trasformando la città in metropoli industriale del Nord.',
    post52_54Note:
      '1952–1954: Oulu e Raahe avviano la modernizzazione chimica ed energetica del nord finlandese dopo la chiusura delle riparazioni SOTEVA.',
  },
  FI200: {
    id: 'FI200',
    regionLabel: 'Ahvenanmaa / Åland',
    preAdmin: 'Ahvenanmaan itsehallintoalue / Landskapet Åland (Convenzione 1921)',
    preName: 'Ahvenanmaa / Åland (Demilitarisoitu alue — Mariehamn)',
    preNote:
      'Suomen tasavalta — Ahvenanmaan itsehallintoalue. Zona demilitarizzata e neutrale garantita dalla Convenzione di Ginevra della Società delle Nazioni (1921). Divieto assoluto di installazioni militari e fortificazioni; patria della flotta di grandi velieri mercantili di Gustaf Erikson.',
    valirauhaName: 'Ahvenanmaa / Åland (Demilitarisoitu alue — Trattato di Mosca 1940)',
    valirauhaNote:
      'Convenzione di Ginevra del 1921 e accordo bilaterale sovietico-finlandese dell\'ottobre 1940: dopo le evacuazioni temporanee della Guerra d\'Inverno, l\'URSS impone il ripristino della smilitarizzazione delle Isole Åland e apre un consolato di controllo a Mariehamn.',
    jatkoName: 'Ahvenanmaa / Åland (Demilitarisoitu alue — Operazione Kilpapurjehdus 1941–44)',
    jatkoNote:
      'Allo scoppio della Guerra di Continuazione (22 giugno 1941), la Finlandia attua l\'Operazione Kilpapurjehdus sbarcando reparti difensivi su Ahvenanmaa / Åland per prevenire colpi di mano sulle rotte del Mar Baltico e del Golfo di Botnia (nel rispetto della Convenzione del 1921 fino al ritiro del 1944).',
    laplandWarNote:
      'Settembre 1944 – Aprile 1945: l\'Armistizio di Mosca (19 sett. 1944) rinnova la piena smilitarizzazione delle Isole Åland secondo l\'accordo del 1940 e l\'originaria Convenzione del 1921.',
    postwar45_47Note:
      '1945–1947: il Trattato di Pace di Parigi (1947) conferma solennemente la smilitarizzazione permanente delle Isole Ahvenanmaa / Åland, garantita anche dall\'accordo del 1921.',
    yya48_51Note:
      '1948–1951: negoziati costituzionali tra Helsinki e Mariehamn che culminano il 28 dicembre 1951 nella nuova Legge sull\'Autonomia delle Isole Åland (Ahvenanmaan itsehallintolaki), ampliando i poteri del Landsting (Parlamento locale) nell\'ambito dello statuto del 1921.',
    post52_54Note:
      '1952–1954: consolidamento dello statuto d\'autonomia del 1951 e riconoscimento internazionale della bandiera ufficiale delle Isole Ahvenanmaa / Åland (approvata nel marzo 1954 e issata per la prima volta il 3 aprile 1954).',
  },
};

const ALL_FINLAND_SPECS = Object.values(FINLAND_REGIONS);

export function resolveFinlandProvince(
  idOrNid: string,
  rawName: string,
  step: number
): FinlandResolved | null {
  const key = String(idOrNid || '').trim().toUpperCase();
  let spec: FinlandRegionSpec | undefined = FINLAND_REGIONS[key];
  if (!spec && rawName) {
    const low = rawName.toLowerCase();
    spec = ALL_FINLAND_SPECS.find(
      (s) =>
        low.includes(s.id.toLowerCase()) ||
        (s.id === 'FI200' && (low.includes('aland') || low.includes('ahvenanmaa') || low.includes('åland')))
    );
  }
  if (!spec) return null;

  const isAland = spec.id === 'FI200';

  // Fazione: FIN Neutrale (s0-8), Asse (s9-15; Åland resta Neutrale per statuto internazionale fino ai test #53!), Alleati (s16-17), Neutrale (s18+)
  const fac: FactionType | undefined = isAland
    ? 'Neutrale'
    : step >= 18
    ? 'Neutrale'
    : step >= 16
    ? 'Alleati'
    : step >= 9
    ? 'Asse'
    : undefined;

  // Titoli amministrativi storici e presidenziali coerenti con STEPS 0..31
  const getAdmin = (): string => {
    if (isAland) {
      if (step >= 28) return 'Ahvenanmaan itsehallintoalue / Landskapet Åland (Itsehallintolaki 1951)';
      if (step >= 9 && step < 16) return 'Ahvenanmaan itsehallintoalue — Ahvenanmaan suojajoukot (Kilpapurjehdus)';
      return 'Ahvenanmaan itsehallintoalue / Landskapet Åland (1921)';
    }
    if (step === 0 && spec.pre1936Admin) return spec.pre1936Admin;
    if (step <= 5) return spec.preAdmin;
    if (step <= 8) return `${spec.preAdmin} · Välirauha (Pres. Kyösti Kallio / Risto Ryti)`;
    if (step <= 15) return 'Suomen tasavalta — Päämaja (Sotamarsalkka C.G.E. Mannerheim / Pres. Ryti)';
    if (step <= 17) return 'Suomen tasavalta — Armistizio di Mosca & Guerra di Lapponia (Pres. Mannerheim)';
    if (step <= 20) {
      return step >= 19
        ? 'Suomen tasavalta (Helsinki — Pres. J.K. Paasikivi · Trattato di Parigi 1947)'
        : 'Suomen tasavalta — Ricostruzione & Legge Fondiaria Maanhankintalaki (1945)';
    }
    if (step <= 28) return 'Suomen tasavalta — Linea Paasikivi & Trattato YYA (1948–1951)';
    return 'Suomen tasavalta (Helsinki — Fine Riparazioni 1952 & Ricostruzione Nordica)';
  };

  // Nome storico e Note per ciascuna delle 8 ere (0..5, 6..8, 9..13, 14..15, 16..17, 18..20, 21..28, 29..31)
  if (step <= 5) {
    const name =
      spec.id === 'FI1D7' && step === 0
        ? 'Lappi (Oulun lääni — Rovaniemi & Jäämerentie)'
        : spec.preName;
    const note =
      spec.id === 'FI1D7' && step === 0
        ? 'Nel gennaio 1936 l\'estremo nord della Lapponia è ancora amministrato da Oulun lääni (la provincia autonoma di Lapin lääni sarà istituita solo il 1° gennaio 1938): Rovaniemi è testa della strada artica Jäämerentie verso Petsamo e Liinahamari.'
        : spec.preNote;
    return { o: 'FIN', name, note, fac, adminEntity: getAdmin() };
  }

  if (step <= 8) {
    return {
      o: 'FIN',
      name: spec.valirauhaName || `${spec.regionLabel} (Pace ad Interim / Välirauha 1940–41)`,
      note: spec.valirauhaNote,
      fac,
      adminEntity: getAdmin(),
    };
  }

  if (step <= 13) {
    return {
      o: 'FIN',
      name: isAland ? spec.jatkoName || spec.preName : `${spec.regionLabel} (Jatkosota — Fronte Interno & Militare 1941–43)`,
      note: spec.jatkoNote,
      fac,
      adminEntity: getAdmin(),
    };
  }

  if (step <= 15) {
    return {
      o: 'FIN',
      name: isAland
        ? spec.jatkoName || spec.preName
        : `${spec.regionLabel} (${step === 15 ? 'Crisi Estate 1944 — Vigilia Armistizio' : 'Estate 1944 — Difesa Strategica'})`,
      note: spec.summer1944Note || spec.jatkoNote,
      fac,
      adminEntity: getAdmin(),
    };
  }

  if (step <= 17) {
    return {
      o: 'FIN',
      name: isAland
        ? 'Ahvenanmaa / Åland (Demilitarisoitu alue — Ritorno Statuto 1944)'
        : `${spec.regionLabel} (${spec.id === 'FI1D7' ? 'Guerra di Lapponia / Lapin sota 1944–45' : 'Armistizio di Mosca & Riparazioni 1944–45'})`,
      note: spec.laplandWarNote,
      fac,
      adminEntity: getAdmin(),
    };
  }

  if (step <= 20) {
    const parisName =
      step >= 19
        ? `${spec.regionLabel} (Repubblica di Finlandia — Trattato di Pace di Parigi)`
        : `${spec.regionLabel} (Dopoguerra & Ricostruzione 1945)`;
    return {
      o: 'FIN',
      name: isAland && step < 19 ? 'Ahvenanmaa / Åland (Demilitarisoitu alue — 1945)' : isAland ? 'Ahvenanmaa / Åland (Demilitarisoitu alue — Parigi 1947)' : parisName,
      note: spec.postwar45_47Note,
      fac,
      adminEntity: getAdmin(),
    };
  }

  if (step <= 28) {
    return {
      o: 'FIN',
      name: isAland
        ? step >= 28
          ? 'Ahvenanmaa / Åland (Demilitarisoitu alue — Autonomia 1951)'
          : 'Ahvenanmaa / Åland (Demilitarisoitu alue — Trattato 1921/1947)'
        : `${spec.regionLabel} (Finlandia — Trattato YYA & Ricostruzione 1948–51)`,
      note: spec.yya48_51Note,
      fac,
      adminEntity: getAdmin(),
    };
  }

  return {
    o: 'FIN',
    name: isAland
      ? step >= 31
        ? 'Ahvenanmaa / Åland (Demilitarisoitu alue — Bandiera Åland 1954)'
        : 'Ahvenanmaa / Åland (Demilitarisoitu alue — Autonomia 1951–53)'
      : spec.id === 'FI1B1'
      ? 'Helsinki–Uusimaa (XV Olimpiadi di Helsinki 1952 & Fine Riparazioni)'
      : `${spec.regionLabel} (Finlandia — Post–Riparazioni SOTEVA 1952–54)`,
    note: spec.post52_54Note,
    fac,
    adminEntity: getAdmin(),
  };
}
