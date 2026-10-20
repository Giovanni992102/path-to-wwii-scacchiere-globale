/**
 * GRANDI LINEE DIFENSIVE E BASI NAVALI STRATEGICHE (1936-1940)
 * Geometrie vettoriali e punti chiave per l'accuratezza cartografica e tattica.
 */

export interface FortificationLine {
  id: string;
  name: string;
  nation: string;
  builder: string;
  description: string;
  type: 'heavy' | 'medium' | 'field';
  color: string;
  coordinates: [number, number][]; // [lon, lat]
  keyForts: { name: string; coords: [number, number]; desc: string }[];
  activeSteps: number[]; // Step indices when the line was garrisoned / relevant
}

export interface NavalBase {
  id: string;
  name: string;
  historicalName: string;
  nation: string;
  coords: [number, number]; // [lon, lat]
  type: 'fleet_hq' | 'major_base' | 'fortress_chokepoint';
  theater: 'Atlantic' | 'Mediterranean' | 'Pacific' | 'Baltic' | 'Indian';
  description: string;
}

export const HISTORICAL_FORTIFICATION_LINES: FortificationLine[] = [
  {
    id: 'maginot_line',
    name: 'Linea Maginot (Ligne Maginot)',
    nation: 'Francia',
    builder: 'André Maginot / Repubblica Francese',
    description:
      'Imponente complesso di fortificazioni in calcestruzzo armato e acciaio costruito tra il 1929 e il 1938 per sbarrare l\'invasione dal confine tedesco. Dotata di torrette a scomparsa, gallerie elettrificate e casematte sotterranee.',
    type: 'heavy',
    color: '#4c6a9c',
    coordinates: [
      [5.78, 49.52], // Longuyon / Fermont
      [6.12, 49.42], // Thionville / Hackenberg
      [6.42, 49.35], // Veckring / Mont des Welches
      [6.75, 49.12], // Saint-Avold / Laudrefang
      [7.28, 49.02], // Bitche / Simserhof
      [7.65, 48.98], // Lembach / Hochwald
      [7.98, 48.95], // Schoenenbourg
      [8.05, 48.88], // Lauterbourg / Valle del Reno
      [7.75, 48.55], // Strasburgo (Sbarramento del Reno)
      [7.55, 47.95], // Colmar / Neuf-Brisach
      [7.52, 47.58], // Huningue / Basilea
    ],
    keyForts: [
      { name: 'Ouvrage Hackenberg', coords: [6.36, 49.34], desc: 'Il più grande forte della Linea Maginot (19 blocchi, 1.040 uomini di guarnigione).' },
      { name: 'Ouvrage Simserhof', coords: [7.32, 49.06], desc: 'Fortezza d\'artiglieria a protezione del corridoio di Bitche.' },
      { name: 'Ouvrage Fermont', coords: [5.73, 49.47], desc: 'Grosso sbarramento d\'arresto del settore fortificato della Crusnes.' },
      { name: 'Ouvrage Schoenenbourg', coords: [7.91, 48.97], desc: 'Forte d\'artiglieria protagonista di intensi duelli di fuoco nel 1940.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 'siegfried_line',
    name: 'Linea Sigfrido (Westwall)',
    nation: 'Germania',
    builder: 'Organizzazione Todt / Terzo Reich',
    description:
      'Sistema difensivo tedesco contrapposto alla Maginot esteso per 630 km da Kleve a Weil am Rhein. Comprendeva oltre 18.000 bunker, postazioni di artiglieria e campi di "denti di drago" (Höckerlinie) anticarro.',
    type: 'heavy',
    color: '#8b8f94',
    coordinates: [
      [6.05, 51.78], // Kleve
      [6.15, 51.25], // Mönchengladbach
      [6.18, 50.78], // Aachen (Aquisgrana)
      [6.45, 50.45], // Eifel / Hürtgenwald
      [6.55, 49.95], // Bitburg
      [6.75, 49.65], // Trier (Treviri)
      [6.98, 49.25], // Saarbrücken (Saarland)
      [7.55, 49.18], // Pirmasens
      [7.85, 49.08], // Bienwald / Bad Bergzabern
      [8.15, 48.75], // Karlsruhe / Rastatt
      [8.02, 48.45], // Kehl (di fronte a Strasburgo)
      [7.85, 48.05], // Friburgo
      [7.62, 47.59], // Weil am Rhein / Confine Svizzero
    ],
    keyForts: [
      { name: 'Bastione di Aquisgrana (Aachen)', coords: [6.12, 50.77], desc: 'Nodo settentrionale fortificato con campi di denti di drago e bunker Regelbau.' },
      { name: 'Sbarramento della Saar (Pirmasens)', coords: [7.60, 49.20], desc: 'Settore centrale ad altissima densità difensiva lungo il Reno.' },
    ],
    activeSteps: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 'ostwall_line',
    name: 'Festungsfront Oder-Warthe-Bogen (Ostwall)',
    nation: 'Germania',
    builder: 'Wehrmacht / Heeresbauamt (1934-1938)',
    description:
      'Imponente linea fortificata tedesca orientale concepita per sbarrare le direttrici d\'invasione verso Berlino tra i fiumi Oder e Warthe. Comprendeva decine di Panzerwerke sotterranei a più livelli collegati da oltre 30 km di gallerie con ferrovia elettrica a scartamento ridotto.',
    type: 'heavy',
    color: '#707478',
    coordinates: [
      [15.58, 52.88], // Schwerin an der Warthe (Skwierzyna)
      [15.52, 52.68], // Bentschen (Zbąszyń)
      [15.48, 52.45], // Meseritz (Międzyrzecz / Pz.W. 717)
      [15.50, 52.32], // Hochwalde (Kursko / Laghi di Kęszyca)
      [15.42, 52.18], // Liebenau (Lubrza)
      [15.40, 52.02], // Züllichau (Sulechów / Fiume Oder)
    ],
    keyForts: [
      { name: 'Panzerwerk 717 (Werkgruppe Scharnhorst)', coords: [15.48, 52.42], desc: 'Complesso corazzato ipogeo a tre piani con cupole d\'acciaio da 200 mm, mitragliatrici binate e lanciafiamme M19.' },
      { name: 'Burschener Schleife', coords: [15.50, 52.47], desc: 'Sistema idraulico strategico con chiuse mobili e canali allagabili per creare fossati anticarro invalicabili.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 'heilsberg_line',
    name: 'Heilsberg-Dreieck (Triangolo di Heilsberg)',
    nation: 'Germania',
    builder: 'Wehrmacht / Wehrkreis I (Ostpreußen, 1932-1937)',
    description:
      'Cintura difensiva fortificata in calcestruzzo armato e acciaio costruita nella Prussia Orientale per proteggere Königsberg e la foce del Pregel da avanzate polacche e sovietiche da sud ed est. Oltre 500 casematte e fossati anticarro integrati.',
    type: 'medium',
    color: '#7d828a',
    coordinates: [
      [19.85, 54.42], // Braunsberg (Braniewo / Frisches Haff)
      [20.25, 54.28], // Zinten (Kornevo)
      [20.58, 54.18], // Heilsberg (Lidzbark Warmiński / Fiume Alle)
      [20.95, 54.22], // Bartenstein (Bartoszyce)
      [21.32, 54.38], // Gerdauen (Zheleznodorozhny)
      [21.65, 54.62], // Tapiau (Gvardeysk / Fiume Pregel)
    ],
    keyForts: [
      { name: 'Stützpunkt Heilsberg', coords: [20.58, 54.18], desc: 'Centro d\'arresto dell\'artiglieria pesante alla confluenza delle valli dell\'Alle e del Simser.' },
      { name: 'Sperrwerk Braunsberg', coords: [19.85, 54.42], desc: 'Sbarramento costiero di bunker e sbarre d\'acciaio a protezione dell\'accesso marittimo alla Laguna della Vistola.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 'mannerheim_line',
    name: 'Linea Mannerheim (Mannerheim-linja)',
    nation: 'Finlandia',
    builder: 'Maresciallo Carl Gustaf Mannerheim / Finlandia',
    description:
      'Complesso difensivo finlandese sull\'Istmo Careliano tra il Golfo di Finlandia e il Lago Ladoga. Nella Guerra d\'Inverno (1939-1940) respinse per oltre due mesi le soverchianti divisioni dell\'Armata Rossa.',
    type: 'heavy',
    color: '#86b0d9',
    coordinates: [
      [28.75, 60.45], // Baia di Viipuri / Gulf of Finland
      [29.05, 60.52], // Summa / Lähde sector
      [29.45, 60.58], // Muolaa / Lago Äyräpäänjärvi
      [29.85, 60.62], // Fiume Vuoksi
      [30.25, 60.65], // Kiviniemi
      [30.55, 60.62], // Taipale / Sponda occidentale del Lago Ladoga
    ],
    keyForts: [
      { name: 'Forte Summa (Settore Lähde)', coords: [29.12, 60.54], desc: 'Epicentro delle più violente offensive sovietiche durante la Guerra d\'Inverno.' },
      { name: 'Forte Taipale', coords: [30.48, 60.61], desc: 'Pilastro orientale della linea sul Lago Ladoga; resistette intatto fino alla pace.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: 'metaxas_line',
    name: 'Linea Metaxas (Grammi Metaxa)',
    nation: 'Grecia',
    builder: 'Generale Ioannis Metaxas / Regno di Grecia',
    description:
      'Catena di 21 forti e fortificazioni sotterranee scavate nelle montagne della Macedonia e Tracia lungo il confine bulgaro, con il celebre Forte Roupel a guardia della gola dello Strimone.',
    type: 'medium',
    color: '#5b8bb8',
    coordinates: [
      [23.25, 41.35], // Monte Beles (Kerkini)
      [23.38, 41.33], // Passo di Rupel (Gola dello Strimone)
      [23.75, 41.28], // Monti Vrontous / Perithori
      [24.15, 41.32], // Paranesti
      [24.75, 41.40], // Monti Rodopi
      [25.35, 41.38], // Komotini / Nymfaia
    ],
    keyForts: [
      { name: 'Fort Roupel', coords: [23.37, 41.34], desc: 'Fortezza leggendaria a controllo del varco della Valle dello Strimone.' },
      { name: 'Forte Nymfaia', coords: [25.42, 41.36], desc: 'Sbarramento fortificato della Tracia orientale verso la Bulgaria.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 'stalin_line',
    name: 'Linea Stalin (Stalin-Linie)',
    nation: 'URSS',
    builder: 'Armata Rossa / Unione Sovietica',
    description:
      'Vasta linea di Distretti Fortificati (UR) costruita lungo il confine occidentale sovietico degli anni \'20-\'30 dal Mar Baltico al Mar Nero (Pskov, Polotsk, Minsk, Slutsk, Korosten, Kiev, Letichev, Tiraspol).',
    type: 'heavy',
    color: '#b04540',
    coordinates: [
      [28.32, 57.82], // Pskov UR
      [28.48, 56.55], // Sebezh UR
      [28.75, 55.48], // Polotsk UR
      [27.55, 53.95], // Minsk UR
      [27.60, 53.02], // Slutsk UR
      [28.05, 51.52], // Mozyr UR
      [28.65, 50.95], // Korosten UR
      [30.45, 50.45], // Kiev UR
      [28.25, 49.32], // Letichev UR
      [28.65, 48.05], // Mogilev-Podolsky UR
      [29.62, 46.85], // Tiraspol UR (sul Dnestr)
    ],
    keyForts: [
      { name: 'Distretto Fortificato di Minsk', coords: [27.42, 53.92], desc: 'Oltre 300 bunker in cemento a protezione della direttrice verso Mosca.' },
      { name: 'Distretto Fortificato di Kiev (KiUR)', coords: [30.38, 50.48], desc: 'Cintura fortificata sul fiume Dnepr a difesa della capitale ucraina.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 'molotov_line',
    name: 'Linea Molotov (Liniya Molotova)',
    nation: 'URSS',
    builder: 'Generale Dmitrij Karbyšev / Boris Šapošnikov / URSS',
    description:
      'Imponente linea di Distretti Fortificati (UR) costruita a partire dalla primavera 1940 lungo la nuova frontiera occidentale sovietica scaturita dal Patto Molotov-Ribbentrop, dal Mar Baltico ai Carpazi (Telšiai, Kaunas, Grodno, Osowiec, Zambrów, Brest-Litovsk, Rawa Ruska, Przemyśl). Dotata di casematte pesanti in cemento armato con cannoni da 76 mm e postazioni anticarro da 45 mm DOT.',
    type: 'heavy',
    color: '#a3332e',
    coordinates: [
      [21.15, 55.70], // Memel / Klaipeda border (Telšiai UR)
      [22.25, 55.15], // Tauragė UR
      [23.90, 54.90], // Kaunas / Alytus UR (fiume Nemunas)
      [23.85, 53.68], // Grodno UR
      [22.65, 53.48], // Osowiec UR
      [22.25, 52.98], // Zambrów UR
      [23.68, 52.09], // Brest-Litovsk UR (fiume Bug)
      [23.55, 51.55], // Włodawa UR
      [24.15, 50.75], // Strumiłowa / Sokal UR
      [23.60, 50.25], // Rawa Ruska UR
      [22.78, 49.78], // Przemyśl UR (fiume San)
    ],
    keyForts: [
      { name: 'Distretto Fortificato di Brest (Brest UR)', coords: [23.66, 52.08], desc: 'Bunker pesanti e sbarramenti d\'arresto sulla riva orientale del fiume Bug attorno alla fortezza.' },
      { name: 'Distretto Fortificato di Przemyśl', coords: [22.77, 49.78], desc: 'Casematte e postazioni d\'artiglieria a protezione del varco tra la Galizia e i Carpazi sul fiume San.' },
      { name: 'Distretto Fortificato di Osowiec e Grodno', coords: [23.10, 53.55], desc: 'Opere sotterranee e bunker in calcestruzzo a sbarramento della direttrice verso Minsk.' },
    ],
    activeSteps: [6, 7, 8], // Iniziata nella primavera 1940
  },
  {
    id: 'vallo_alpino',
    name: 'Vallo Alpino del Littorio',
    nation: 'Italia',
    builder: 'Regno d\'Italia (Guardia alla Frontiera)',
    description:
      'Sistema di fortificazioni permanenti lungo tutto l\'arco alpino italiano dal confine francese a quello svizzero e jugoslavo, a difesa dei valichi montani e delle valli d\'accesso.',
    type: 'medium',
    color: '#6f7a3f',
    coordinates: [
      [7.52, 43.78], // Ventimiglia / Frontiera Francese
      [7.15, 44.25], // Colle di Tenda
      [6.95, 44.85], // Monginevro / Bardonecchia
      [6.98, 45.22], // Moncenisio
      [6.88, 45.68], // Piccolo San Bernardo
      [8.15, 46.25], // Sempione
      [9.85, 46.55], // Passo dello Spluga
      [11.55, 46.98], // Brennero
      [12.35, 46.72], // Monte Croce di Comelico
      [13.68, 46.52], // Tarvisio
      [14.25, 45.78], // Postumia (Confine Italo-Jugoslavo)
      [14.35, 45.35], // Fiume / Carnaro
    ],
    keyForts: [
      { name: 'Forte Bramafam & Chaberton', coords: [6.75, 44.96], desc: 'Batterie corazzate a 3.130 metri di quota dominanti Briançon.' },
      { name: 'Sbarramento Passo Monte Croce', coords: [12.42, 46.68], desc: 'Opere sotterranee blindate per il blocco delle direttrici verso il Friuli.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 'benes_line',
    name: 'Linea Beneš (Československé opevnění)',
    nation: 'Cecoslovacchia',
    builder: 'Ředitelství opevňovacích prací (ROP) / Repubblica Cecoslovacca (1935-1938)',
    description:
      'Imponente sistema difensivo permanente in cemento armato e acciaio costruito lungo le frontiere con la Germania e l\'Austria per sbarrare le direttrici d\'invasione della Wehrmacht. Ispirato alle dottrine della Linea Maginot francese, comprendeva imponenti fortezze d\'artiglieria ipogee (dělostřelecké tvrze) come Stachelberg, Bouda, Hůrka, Hanička, Dobrošov e Smolkov, collegate a migliaia di casematte pesanti (pěchotní sruby) e postazioni leggere d\'arresto (řopíky vz. 37). Totalmente presidiata durante la mobilitazione generale del settembre 1938, fu ceduta intatta senza combattere in base agli Accordi di Monaco.',
    type: 'heavy',
    color: '#d4883b',
    coordinates: [
      [12.35, 50.15], // Cheb / Egerland
      [12.85, 50.40], // Monti Metalliferi (Krušné hory / Boží Dar)
      [13.60, 50.60], // Most / Teplice
      [14.15, 50.78], // Děčín / Fiume Elba
      [15.05, 50.80], // Liberec / Jizerské hory
      [15.91, 50.63], // Trutnov / Forte Stachelberg (Riesengebirge)
      [16.20, 50.40], // Náchod / Forte Dobrošov
      [16.51, 50.19], // Rokytnice / Forte Hanička (Orlické hory)
      [16.68, 50.07], // Králíky / Forti Bouda & Hůrka
      [17.30, 50.28], // Jeseník / Altvatergebirge
      [17.90, 49.94], // Opava / Forte Smolkov
      [18.30, 49.90], // Bohumín / Ostrava (Porta Moravica)
    ],
    keyForts: [
      { name: 'Dělostřelecká tvrz Stachelberg (Trutnov)', coords: [15.91, 50.63], desc: 'La più grande fortezza d\'artiglieria del complesso cecoslovacco, con 12 blocchi ipogei e oltre 34 sale sotterranee a protezione del varco di Žacléř.' },
      { name: 'Dělostřelecká tvrz Dobrošov (Náchod)', coords: [16.20, 50.40], desc: 'Fortezza strategica dominante la sella di Náchod verso la Slesia prussiana, con casematte e torrette corazzate a scomparsa.' },
      { name: 'Dělostřelecká tvrz Bouda (Králíky)', coords: [16.68, 50.07], desc: 'Fortezza d\'arresto completata al 100% prima della crisi di Monaco, con ferrovia ipogea a scartamento ridotto e casematte d\'acciaio.' },
      { name: 'Dělostřelecká tvrz Hůrka (Králíky)', coords: [16.78, 50.09], desc: 'Caposaldo pesante a guardia del corridoio di Králíky, dotato di magazzini munizioni e pozzi montacarichi blindati.' },
      { name: 'Dělostřelecká tvrz Hanička (Rokytnice)', coords: [16.51, 50.19], desc: 'Complesso fortificato d\'artiglieria nei monti Orlické, con cupole per obici da 100 mm a sbarramento della frontiera settentrionale.' },
      { name: 'Dělostřelecká tvrz Smolkov (Opava)', coords: [18.10, 49.90], desc: 'Bastione difensivo in Slesia a sbarramento della pianura di Opava e degli accessi industriali di Moravská Ostrava.' },
    ],
    activeSteps: [0, 1, 2], // Smantellata / ceduta al Reich col Patto di Monaco (ottobre 1938)
  },
  {
    id: 'ghq_line',
    name: 'Linea GHQ (General Headquarters Line)',
    nation: 'Regno Unito',
    builder: 'Generale Sir Edmund Ironside / War Office',
    description:
      'Spina dorsale del dispositivo anti-invasione britannico eretto nell\'estate 1940 dopo la caduta della Francia (Operazione Leone Marino). Lunga centinaia di miglia da Somerset all\'estuario del Tamigi e nello Yorkshire, contava migliaia di casematte (pillbox), fossati anticarro e ponti predisposti per la demolizione.',
    type: 'field',
    color: '#3d7848',
    coordinates: [
      [-2.95, 51.15], // Somerset Levels / Highbridge
      [-2.45, 51.25], // Frome / Wiltshire Stop Line
      [-1.95, 51.35], // Devizes / Kennet and Avon Canal
      [-1.40, 51.40], // Newbury / Berkshire
      [-0.95, 51.45], // Reading
      [-0.72, 51.28], // Aldershot / Farnham
      [-0.58, 51.23], // Guildford Gap / Hog's Back
      [-0.20, 51.24], // Reigate / Surrey Hills
      [0.25, 51.20],  // Edenbridge / Medway Line
      [0.55, 51.38],  // Rochester / Chatham (Fiume Medway)
      [0.85, 51.42],  // Isle of Sheppey / Estuario del Tamigi
    ],
    keyForts: [
      { name: 'Sbarramento del Guildford Gap', coords: [-0.58, 51.23], desc: 'Chiusura strategica tra le North Downs per impedire ai panzer l\'avanzata verso Londra.' },
      { name: 'Linea d\'Arresto del Medway', coords: [0.52, 51.35], desc: 'Bunker e fossati a protezione degli accessi meridionali all\'arsenale di Chatham e a Londra.' },
      { name: 'Wiltshire Stop Line (Kennet & Avon)', coords: [-1.98, 51.35], desc: 'Linea di pillbox scaglionata lungo il canale navigabile per tagliare fuori il South West.' },
    ],
    activeSteps: [6, 7, 8], // Eretta nel giugno 1940 e presidiata durante la Battaglia d'Inghilterra
  },

  // --- BENELUX (Belgio, Paesi Bassi, Lussemburgo) ---
  {
    id: 'eben_emael_pfl',
    name: 'Posizione Fortificata di Liegi & Fort d\'Eben-Emael (PFL / Canale Alberto)',
    nation: 'Belgio',
    builder: 'Genio Militare Belga (Génie Militaire)',
    description:
      'Imponente cintura difensiva a sbarramento della valle della Mosa e della congiunzione col Canale Alberto. Il suo perno, il modernissimo Fort d\'Eben-Emael con cupole corazzate rotanti d\'artiglieria e gallerie sotterranee, fu espugnato il 10-11 maggio 1940 dai paracadutisti tedeschi (Sturmabteilung Koch) atterrati con alianti DFS 230 ed equipaggiati con cariche cave, aprendo la via dell\'invasione.',
    type: 'heavy',
    color: '#8d77a3',
    coordinates: [
      [5.57, 50.64], // Liegi (PFL 1 e 2)
      [5.68, 50.79], // Fort d'Eben-Emael / Kanne
      [5.62, 50.93], // Canale Alberto / Lanaken
      [5.78, 51.05], // Maaseik (Sbarramento della Mosa)
    ],
    keyForts: [
      { name: 'Fort d\'Eben-Emael', coords: [5.674, 50.797], desc: 'La fortezza più moderna d\'Europa, neutralizzata in poche ore con cariche cave dai pionieri aviotrasportati tedeschi.' },
      { name: 'Fort de Battice', coords: [5.82, 50.65], desc: 'Grande fortezza d\'artiglieria del settore est di Liegi, resistette per dodici giorni sotto pesanti bombardamenti Stuka.' },
      { name: 'Fort d\'Aubin-Neufchâteau', coords: [5.78, 50.73], desc: 'Opera fortificata a protezione del corridoio tra Liegi e la frontiera olandese.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: 'kw_stelling',
    name: 'Linea KW / Linea Dyle (Koningshooikt — Wavre)',
    nation: 'Belgio / Alleati',
    builder: 'Esercito Belga & Comando Supremo Alleato (BEF / 1ère Armée)',
    description:
      'Spina dorsale della difesa del Belgio centrale e perno della manovra Dyle-Breda del generale Gamelin. Comprendeva centinaia di bunker in cemento armato, fossati anticarro e le caratteristiche barriere mobili d\'acciaio Cointet (elementi Cointet) stese da Koningshooikt (Anversa) attraverso Mechelen, Leuven, Wavre fino a Namur e al varco di Gembloux.',
    type: 'heavy',
    color: '#a08db3',
    coordinates: [
      [4.53, 51.13], // Koningshooikt (Anversa)
      [4.48, 51.02], // Mechelen
      [4.70, 50.88], // Leuven (Settore BEF)
      [4.61, 50.71], // Wavre
      [4.69, 50.56], // Gembloux Gap
      [4.87, 50.46], // Namur (Posizione Fortificata di Namur)
    ],
    keyForts: [
      { name: 'Bastione di Koningshooikt', coords: [4.53, 51.13], desc: 'Cerniera di raccordo tra la linea KW e la Ridotta Nazionale di Anversa.' },
      { name: 'Settore Dyle di Lovanio (Leuven)', coords: [4.70, 50.88], desc: 'Trinceramento difeso con successo dalla 3ª Divisione di Fanteria britannica di Bernard Montgomery.' },
      { name: 'Varco di Gembloux (Gembloux Gap)', coords: [4.69, 50.56], desc: 'Pianura non coperta da ostacoli naturali, difesa dai carri Somua francesi contro le Panzer-Divisionen a Hannut.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: 'grebbelinie',
    name: 'Grebbelinie (Linea della Grebbe)',
    nation: 'Paesi Bassi',
    builder: 'Koninklijke Landmacht (Genio Militare Olandese)',
    description:
      'Linea difensiva avanzata olandese imperniata sull\'inondazione controllata delle valli della Grebbe e dell\'Eem tra l\'IJsselmeer e il Reno. Teatro dell\'epica battaglia del colle Grebbeberg (11-13 maggio 1940), dove i fanti olandesi resistettero per tre giorni prima di essere sopraffatti dall\'assalto del reggimento SS Germania.',
    type: 'medium',
    color: '#b57f3f',
    coordinates: [
      [5.38, 52.25], // Spakenburg / IJsselmeer
      [5.40, 52.16], // Amersfoort
      [5.55, 52.05], // Veenendaal
      [5.58, 51.95], // Grebbeberg / Rhenen (Reno)
    ],
    keyForts: [
      { name: 'Grebbeberg (Rhenen)', coords: [5.58, 51.95], desc: 'Colle fortificato chiave lungo il Basso Reno, perno della resistenza olandese contro le truppe scelte tedesche.' },
      { name: 'Sbarramento di Amersfoort', coords: [5.40, 52.16], desc: 'Postazioni di casematte e chiuse idrauliche per l\'allagamento a nord della linea.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: 'waterlinie',
    name: 'Nieuwe Hollandse Waterlinie (Nuova Linea d\'Acqua d\'Olanda)',
    nation: 'Paesi Bassi',
    builder: 'Genio Militare Olandese',
    description:
      'Storica linea maestra di difesa concepita per isolare la Vesting Holland (Amsterdam, Rotterdam, Den Haag, Utrecht) trasformandola in un\'isola inaccessibile. Mediante chiuse idrauliche, le campagne venivano inondate con 40-50 cm d\'acqua: troppo poco per navigare con barche, troppo profondo per carri e fanteria.',
    type: 'heavy',
    color: '#9e6e33',
    coordinates: [
      [5.05, 52.32], // Muiden / Forte Pampus
      [5.09, 52.20], // Weesp / Vreeland
      [5.12, 52.09], // Forti di Utrecht
      [4.95, 51.85], // Gorinchem (Fiume Waal)
      [4.68, 51.72], // Biesbosch / Moerdijk
    ],
    keyForts: [
      { name: 'Forte Pampus e Muiden', coords: [5.07, 52.33], desc: 'Forte marittimo a protezione dell\'accesso a sud dell\'IJsselmeer e di Amsterdam.' },
      { name: 'Forti di Utrecht (Vesting Utrecht)', coords: [5.12, 52.09], desc: 'Complesso di 16 opere fortificate anulari a sbarramento della ferrovia e delle strade maestre.' },
      { name: 'Ponti di Moerdijk', coords: [4.68, 51.72], desc: 'I giganteschi ponti sulla Hollands Diep, presi con un colpo di mano dai paracadutisti tedeschi il 10 maggio 1940.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: 'afsluitdijk_kornwerderzand',
    name: 'Stelling Kornwerderzand & Wonsstelling (Afsluitdijk)',
    nation: 'Paesi Bassi',
    builder: 'Koninklijke Landmacht / Genio Militare Olandese',
    description:
      'Imponenti casematte in calcestruzzo armato con cupole d\'acciaio poste al chilometro 4 della grande diga dell\'Afsluitdijk. Tra il 12 e il 14 maggio 1940, la guarnigione olandese guidata dal capitano Boers respinse con successo tutti gli attacchi della 1ª Divisione di Cavalleria tedesca, infliggendo pesanti perdite e mantenendo inviolata la posizione fino alla resa nazionale.',
    type: 'heavy',
    color: '#8b7d6b',
    coordinates: [
      [5.43, 53.07], // Wons / Wonsstelling (Testa di ponte in Frisia)
      [5.33, 53.07], // Kornwerderzand (Casematte principali sulla diga)
      [5.25, 53.04], // Breezanddijk
      [5.06, 52.93], // Den Oever (Testata dell\'Olanda Settentrionale)
    ],
    keyForts: [
      { name: 'Casematte di Kornwerderzand', coords: [5.33, 53.07], desc: 'L\'unica fortificazione olandese che resistette vittoriosamente a tutti gli assalti della Wehrmacht nel 1940.' },
      { name: 'Wonsstelling', coords: [5.43, 53.07], desc: 'Linea campale avanzata a semicerchio posta a difesa della testa di ponte della Frisia.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: 'schuster_linn',
    name: 'Schuster-Linn (Linea Schuster del Lussemburgo)',
    nation: 'Lussemburgo',
    builder: 'Governo del Granducato di Lussemburgo / Ing. Schuster',
    description:
      'Catena di sbarramenti stradali, porte blindate in acciaio scorrevoli e blocchi di cemento allestita lungo i confini con la Germania e la Francia per tutelare la neutralità disarmata del Granducato. All\'alba del 10 maggio 1940 le porte d\'acciaio furono chiuse, ma vennero sfondate o aggirate dai reparti d\'assalto tedeschi e dai sabotatori della divisione Brandenburg.',
    type: 'field',
    color: '#a38c92',
    coordinates: [
      [6.14, 50.13], // Clervaux / Fiume Our
      [6.26, 49.91], // Vianden
      [6.36, 49.80], // Echternach (Fiume Sauer / Sûre)
      [6.53, 49.68], // Wasserbillig (Confluenza con la Mosella)
      [6.37, 49.47], // Schengen (Triplice frontiera con Francia e Germania)
    ],
    keyForts: [
      { name: 'Porta Blindata di Wasserbillig', coords: [6.53, 49.68], desc: 'Sbarramento principale sul ponte della Mosella di fronte a Treviri.' },
      { name: 'Sbarramento di Vianden', coords: [6.26, 49.91], desc: 'Chiusura confinaria della valle dell\'Our contro i blindati leggeri.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6],
  },

  // --- SVIZZERA (Schweizer Réduit & Limmatstellung) ---
  {
    id: 'reduit_national_ch',
    name: 'Ridotto Nazionale Svizzero (Schweizer Réduit / Réduit national)',
    nation: 'Svizzera',
    builder: 'Generale Henri Guisan / Esercito Svizzero (Armée suisse)',
    description:
      'Il grandioso dispositivo di difesa alpino concepito dal Generale Henri Guisan nell\'estate del 1940 per dissuadere l\'invasione congiunta italo-tedesca (Operazione Tannenbaum). Il piano prevedeva di cedere l\'Altopiano (Mittelland) e di concentrare l\'intero esercito e le riserve nelle roccaforti scavate nel granito delle Alpi, imperniate sui tre complessi fortificati del San Gottardo (Festung Gotthard), di Saint-Maurice (Festung Saint-Maurice) e di Sargans (Festung Sargans), tenendo sotto tiro i valichi e le gallerie transalpine già minate.',
    type: 'heavy',
    color: '#a83232',
    coordinates: [
      [7.00, 46.22], // Saint-Maurice / Bassa valle del Rodano
      [7.62, 46.40], // Gemmipass / Kandersteg
      [8.56, 46.55], // San Gottardo (Airolo / Passo del San Gottardo)
      [8.67, 46.66], // Andermatt / Passo dell'Oberalp
      [9.10, 46.77], // Disentis / Valle del Reno Anteriore
      [9.44, 47.05], // Sargans / Valle del Reno
    ],
    keyForts: [
      { name: 'Festung Saint-Maurice', coords: [7.00, 46.22], desc: 'Forti Cindey, Dailly e Savatan: sbarramento della gola del Rodano e cardine occidentale del Ridotto a guardia dell\'accesso al Vallese.' },
      { name: 'Festung Gotthard', coords: [8.56, 46.55], desc: 'Forti Hospiz, Sasso da Pigna, San Carlo e Gütsch: cuore nevralgico della difesa alpina svizzera con batterie corazzate scavate nella roccia.' },
      { name: 'Festung Sargans', coords: [9.44, 47.05], desc: 'Forti Magletsch, Schollberg e Kastels: perno orientale del Ridotto a sbarramento della valle del Reno contro le divisioni del Terzo Reich.' },
      { name: 'Fortezza di Crestawald', coords: [9.42, 46.57], desc: 'Opera fortificata a sbarramento del Passo del San Bernardino verso il Grigioni e il Ticino.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 'limmatstellung_ch',
    name: 'Linea della Limmat (Limmatstellung)',
    nation: 'Svizzera',
    builder: 'Generale Henri Guisan / Esercito Svizzero',
    description:
      'Linea difensiva campale e fortificata approntata a partire dall\'autunno 1939 dall\'esercito svizzero lungo il corso dei fiumi Aare e Limmat, del Lago di Zurigo e del Linth per contenere un attacco corazzato tedesco proveniente dal Reno e proteggere i centri industriali della Svizzera settentrionale, prima dell\'arretramento generale nel Ridotto Alpino.',
    type: 'medium',
    color: '#8b4513',
    coordinates: [
      [8.21, 47.48], // Brugg / confluenza Aare-Limmat
      [8.31, 47.48], // Baden
      [8.42, 47.41], // Dietikon
      [8.54, 47.37], // Zurigo / Lago di Zurigo
      [8.82, 47.22], // Rapperswil / Diga del lago
      [9.00, 47.14], // Piana della Linth / Walensee
      [9.44, 47.05], // Sargans
    ],
    keyForts: [
      { name: 'Sbarramento dell\'Aare a Brugg', coords: [8.21, 47.48], desc: 'Fossati anticarro e casematte d\'arresto alla confluenza dei fiumi Aare, Reuss e Limmat.' },
      { name: 'Posizione fortificata di Dietikon-Zurigo', coords: [8.42, 47.41], desc: 'Centinaia di bunker in calcestruzzo a protezione della periferia e delle arterie ferroviarie zurighesi.' },
      { name: 'Sbarramento della Piana della Linth', coords: [8.96, 47.19], desc: 'Casematte e canali allagabili tra il Lago di Zurigo e il Walensee per bloccare l\'avanzata verso le Prealpi.' },
    ],
    activeSteps: [5, 6, 7, 8],
  },

  // --- REGNO D'ITALIA (Vallo Alpino del Littorio) ---
  {
    id: 'vallo_alpino_occidentale',
    name: 'Vallo Alpino Occidentale (Frontiera delle Alpi)',
    nation: 'Regno d\'Italia',
    builder: 'Genio Militare / Regio Esercito Italiano',
    description:
      'Imponente sistema difensivo permanente scavato nel granito lungo i 500 km di frontiera alpina con la Francia, dal Piccolo San Bernardo fino a Ventimiglia. Articolato in Centri di Resistenza, capisaldi in caverna e batterie corazzate d\'alta quota. Perno leggendario fu la Batteria dello Chaberton a 3.130 metri (la "Fortezza delle Nubi"), forte di 8 torri corazzate girevoli armate di cannoni da 149/35, che duellò il 21 giugno 1940 contro i mortai pesanti francesi prima dell\'armistizio di Villa Incisa.',
    type: 'heavy',
    color: '#556b2f',
    coordinates: [
      [6.88, 45.68], // Piccolo San Bernardo / Thuile
      [6.90, 45.26], // Moncenisio / Malamot / Varisello
      [6.70, 45.08], // Bardonecchia / Forte Bramafam
      [6.75, 44.96], // Monte Chaberton (3.130 m) / Claviere
      [6.73, 44.93], // Colle del Monginevro
      [6.90, 44.42], // Colle della Maddalena / Larche
      [7.56, 44.15], // Colle di Tenda
      [7.52, 43.87], // Val Roia / Olivetta San Michele
      [7.53, 43.78], // Ventimiglia / Balzi Rossi
    ],
    keyForts: [
      { name: 'Batteria dello Chaberton (3.130 m)', coords: [6.75, 44.96], desc: 'La "Fortezza delle Nubi": la batteria corazzata più alta d\'Europa (8 torri girevoli con cannoni da 149/35) a dominare Briançon e la valle della Durance.' },
      { name: 'Forte Bramafam e Sbarramento di Bardonecchia', coords: [6.70, 45.08], desc: 'Caposaldo di comando e sbarramento ferroviario della galleria del Frejus e del Colle della Scala.' },
      { name: 'Sbarramento del Moncenisio', coords: [6.90, 45.26], desc: 'Batterie in caverna del Forte Malamot, Ronce e Varisello a protezione della discesa verso la Val di Susa.' },
      { name: 'Sbarramento di Ventimiglia e Balzi Rossi', coords: [7.53, 43.78], desc: 'Casematte e fossati anticarro a controllo della costa ligure e della via Aurelia.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 'vallo_alpino_orientale',
    name: 'Vallo Alpino Orientale (Frontiera Giulia e del Carnaro)',
    nation: 'Regno d\'Italia',
    builder: 'Genio Militare / Regio Esercito Italiano',
    description:
      'Linea difensiva permanente in caverna estesa lungo la frontiera italo-jugoslava dal Passo del Predil e Tarvisio fino a Fiume e al Golfo del Quarnaro. Costituita da opere sotterranee in calcestruzzo armato, cupole d\'acciaio e sbarramenti a protezione delle Grotte di Postumia, del Monte Nevoso e delle valli dell\'Isonzo.',
    type: 'medium',
    color: '#4f5d34',
    coordinates: [
      [13.62, 46.52], // Tarvisio / Coccau
      [13.57, 46.42], // Passo del Predil
      [13.73, 46.18], // Tolmino / Canale d'Isonzo
      [14.14, 45.93], // Circhina / Hotedršica
      [14.21, 45.77], // Postumia Grotte / Bivio San Pietro
      [14.45, 45.58], // Monte Nevoso (Snežnik)
      [14.44, 45.33], // Fiume (Rijeka) / Abbazia
    ],
    keyForts: [
      { name: 'Sbarramento di Sella Predil', coords: [13.57, 46.42], desc: 'Opere corazzate d\'arresto tra la Val Canale e la conca di Plezzo.' },
      { name: 'Sbarramento di Postumia', coords: [14.21, 45.77], desc: 'Bunker d\'arresto sulla strada maestra e sulla ferrovia Trieste-Lubiana.' },
      { name: 'Piazza di Fiume e Monte Calvario', coords: [14.44, 45.33], desc: 'Cintura fortificata a protezione dell\'enclave del Carnaro e del porto mercantile.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 'maginot_alpine',
    name: 'Linea Maginot Alpina (Secteurs Fortifiés des Alpes)',
    nation: 'Francia',
    builder: 'Armée des Alpes (Général René Olry) / Repubblica Francese',
    description:
      'Complesso fortificato alpino scaglionato tra la Savoia, il Delfinato e le Alpi Marittime fino al Mediterraneo (Mentone). Munito di formidabili opere in caverna (ouvrages), respinse con successo l\'offensiva del Regio Esercito nel giugno 1940.',
    type: 'heavy',
    color: '#3f5d8a',
    coordinates: [
      [6.95, 45.68], // Bourg-Saint-Maurice / Piccolo San Bernardo
      [6.72, 45.20], // Modane / Maurienne (Ouvrage Saint-Gobain)
      [6.63, 44.90], // Briançon / Monginevro / Janus (di fronte allo Chaberton)
      [6.85, 44.45], // Ubaye / Tournoux / Saint-Ours
      [7.05, 44.18], // Tinée / Isola
      [7.28, 43.90], // Vésubie / Gordolon
      [7.48, 43.88], // Sospel / Bevera (Ouvrage Saint-Roch)
      [7.44, 43.76], // Mont Agel / Peille
      [7.51, 43.76], // Roquebrune-Cap-Martin (Ouvrage Cap Martin / Golfo di Mentone)
    ],
    keyForts: [
      { name: 'Ouvrage du Janus (Briançon)', coords: [6.71, 44.93], desc: 'Opera d\'alta quota del settore del Delfinato a 2.540 m; neutralizzò le torri dello Chaberton con mortai d\'assedio Schneider da 280 mm.' },
      { name: 'Ouvrage Saint-Gobain (Modane)', coords: [6.72, 45.20], desc: 'Grosso sbarramento in caverna a protezione della ferrovia internazionale del Moncenisio/Frejus.' },
      { name: 'Ouvrage Saint-Roch (Sospel)', coords: [7.45, 43.88], desc: 'Fortezza corazzata a quattro blocchi a controllo del colle di Braus e della valle della Bevera.' },
      { name: 'Ouvrage de Mont Agel (Peille)', coords: [7.42, 43.77], desc: 'Perno d\'artiglieria pesante del settore Alpi Marittime a 1.140 m a dominare il Principato di Monaco e la costa ligure.' },
      { name: 'Ouvrage Cap Martin (Menton)', coords: [7.48, 43.75], desc: 'Opera costiera avanzata a Roquebrune-Cap-Martin; bloccò l\'avanzata della divisione Cosseria lungo la litoranea dei Balzi Rossi.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 'rupnik_line',
    name: 'Linea Rupnik (Rupnikova linija)',
    nation: 'Jugoslavia',
    builder: 'Generale Leon Rupnik / Regno di Jugoslavia',
    description:
      'Complesso fortificato di sbarramento montano e casematte in cemento armato costruito dal Regno di Jugoslavia a partire dal 1937 lungo la frontiera di Rapallo per contrastare una possibile invasione dal Vallo Alpino italiano. Si estendeva dal Monte Tricorno (Triglav) attraverso Žiri e le valli della Carniola fino a Fiume.',
    type: 'medium',
    color: '#d4883b',
    coordinates: [
      [13.84, 46.38], // Triglav / Valle dell'Isonzo
      [14.02, 46.20], // Bohinj / Soriška Planina
      [14.11, 46.12], // Blegoš
      [14.11, 46.05], // Žiri
      [14.19, 45.96], // Logatec
      [14.28, 45.85], // Rakek / Cerknica
      [14.38, 45.62], // Sviščaki / Snežnik
      [14.42, 45.45], // Klana / Kastav (sopra Fiume)
    ],
    keyForts: [
      { name: 'Forte Blegoš', coords: [14.11, 46.12], desc: 'Opera corazzata sotterranea a quota 1.562 m con osservatorio panoramico a controllo delle valli di Poljane e Selca.' },
      { name: 'Sbarramento di Žiri', coords: [14.11, 46.05], desc: 'Fitta rete di bunker d\'arresto anticarro e nidi di mitragliatrici a protezione del corridoio verso Lubiana.' },
      { name: 'Sbarramento di Logatec / Hotedršica', coords: [14.19, 45.96], desc: 'Casematte e trincee blindate a presidio della strada maestra Lubiana-Trieste.' },
      { name: 'Fortificazioni di Klana', coords: [14.38, 45.45], desc: 'Sbarramento meridionale a ridosso dell\'enclave italiana di Fiume.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 'carol_line',
    name: 'Linea Carol II (Linia Carol al II-lea)',
    nation: 'Romania',
    builder: 'Re Carol II / Maresciallo Ion Antonescu / Regno di Romania',
    description:
      'Cintura difensiva fortificata edificata tra il 1939 e il 1940 lungo la frontiera occidentale della Romania per bloccare una potenziale invasione ungherese verso la Transilvania. Comprendeva oltre 320 casematte in calcestruzzo armato, fossati anticarro allagati e sbarramenti fluviali da Satu Mare a Timișoara (settore settentrionale ceduto all\'Ungheria nell\'agosto 1940 col Secondo Arbitrato di Vienna).',
    type: 'medium',
    color: '#3488aa',
    coordinates: [
      [22.88, 47.79], // Satu Mare (Valle del Someș)
      [22.47, 47.68], // Carei
      [21.93, 47.05], // Oradea (Crișul Repede)
      [21.60, 46.75], // Salonta
      [21.31, 46.18], // Arad (Fiume Mureș)
      [21.23, 45.75], // Timișoara (Banato romeno)
    ],
    keyForts: [
      { name: 'Piazzaforte di Satu Mare', coords: [22.88, 47.79], desc: 'Blocco settentrionale di casematte a guardia dell\'accesso alla valle del Someș.' },
      { name: 'Sbarramento d\'Arresto di Oradea', coords: [21.93, 47.05], desc: 'Complesso di bunker d\'artiglieria e fossati anticarro a difesa del principale asse ferroviario transilvano.' },
      { name: 'Forte Mureș / Arad', coords: [21.31, 46.18], desc: 'Sbarramento fortificato fluviale sulla sponda del fiume Mureș.' },
    ],
    activeSteps: [3, 4, 5, 6],
  },
  {
    id: 'sarny_fortified_area',
    name: 'Settore Fortificato di Sarny (Rejon Umocniony Sarny)',
    nation: 'Polonia',
    builder: 'Korpus Ochrony Pogranicza (KOP) / Rzeczpospolita Polska',
    description:
      'Baluardo difensivo avanzato eretto tra il 1936 e il 1939 lungo il fiume Słucz e le paludi della Volinia e del Polesie per sbarrare il varco strategico verso l\'interno della Polonia. Costituito da circa 170 bunker in calcestruzzo armato pesante con cupole d\'acciaio corazzate e casematte d\'artiglieria. Dal 17 al 20 settembre 1939 i battaglioni del KOP opposero una disperata ed eroica resistenza all\'avanzata della 60ª Divisione Fucilieri dell\'Armata Rossa.',
    type: 'heavy',
    color: '#d97736',
    coordinates: [
      [26.60, 51.52], // Dąbrowica
      [26.65, 51.33], // Sarny
      [26.72, 51.15], // Tynne
      [26.78, 51.02], // Berducha
      [26.75, 50.85], // Berezne
      [27.05, 50.62], // Korzec
    ],
    keyForts: [
      { name: 'Schron Bojowy Tynne (Bunker Tynne)', coords: [26.72, 51.15], desc: 'Caposaldo pesante del Reggimento KOP "Sarny" guidato dal tenente Jan Bołbott, che resistette fino all\'ultimo uomo contro l\'Armata Rossa venendo fatto saltare con le cariche da demolizione.' },
      { name: 'Piazzaforte Ferroviaria di Sarny', coords: [26.62, 51.33], desc: 'Nodo di scambio ferroviario blindato con postazioni anticarro, trincee comunicanti e comando del settore fortificato.' },
      { name: 'Caposaldo Berducha', coords: [26.78, 51.02], desc: 'Complesso di casematte corazzate a sbarramento delle vie di penetrazione fluviale lungo il corso dello Słucz.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5],
  },
  {
    id: 'twierdza_brzesc',
    name: 'Fortezza di Brześć (Twierdza Brześć nad Bugiem)',
    nation: 'Polonia',
    builder: 'Rzeczpospolita Polska / Gen. Konstanty Plisowski',
    description:
      'Monumentale piazzaforte ottocentesca modernizzata dall\'esercito polacco alla confluenza del Muchawiec nel Bug. Dotata di una vasta cittadella centrale e quattro forti corazzati. Dal 14 al 17 settembre 1939 resistette strenuamente all\'assalto del XIX Corpo d\'Armata corazzato di Heinz Guderian, prima che la guarnigione evacuasse a sud e la città fosse consegnata ai sovietici del generale Krivoshein nella storica parata congiunta nazi-sovietica del 22 settembre.',
    type: 'heavy',
    color: '#bf3b3b',
    coordinates: [
      [23.64, 52.12], // Fort Kobryński
      [23.66, 52.08], // Cytadela Centrale
      [23.63, 52.06], // Fort Terespolski
      [23.67, 52.05], // Fort Wołyński
    ],
    keyForts: [
      { name: 'Cytadela Brzeska', coords: [23.66, 52.08], desc: 'Cuore della fortezza difeso dal generale Konstanty Plisowski contro gli attacchi combinati della 20ª Divisione Motorizzata e della 10ª Panzerdivision.' },
      { name: 'Fort Kobryński', coords: [23.65, 52.11], desc: 'Settore settentrionale teatro di sanguinosi combattimenti ravvicinati contro i genieri d\'assalto della Wehrmacht nel settembre 1939.' },
      { name: 'Fort Terespolski', coords: [23.62, 52.07], desc: 'Testa di ponte occidentale sul Bug che permise l\'evacuazione notturna dei difensori polacchi rimasti.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5],
  },
  {
    id: 'mareth_line',
    name: 'Linea Mareth (Ligne Mareth)',
    nation: 'Francia / Tunisia',
    builder: 'Général Georges Catroux / Armée de Terre (1936-1939)',
    description:
      'Imponente complesso difensivo fortificato in calcestruzzo armato eretto dalla Francia nel sud della Tunisia per sbarrare un\'eventuale invasione corazzata fascista proveniente dalla Libia italiana (Quarta Sponda). Conosciuta come la "Maginot del Deserto", si snodava per 45 km dal Golfo di Gabès attraverso l\'Uadi Zigzaou e la gola di Ksar El Hallouf fino ai monti del Dahar.',
    type: 'heavy',
    color: '#4c6a9c',
    coordinates: [
      [10.35, 33.68], // Golfo di Gabès / Mareth Plage
      [10.28, 33.60], // Mareth (Centro di comando)
      [10.22, 33.52], // Wadi Zigzaou
      [10.15, 33.42], // Ksar El Hallouf
      [10.05, 33.35], // Altopiano del Dahar (Beni Kheddache)
    ],
    keyForts: [
      { name: 'Caposaldo di Ksar El Hallouf', coords: [10.15, 33.42], desc: 'Opera fortificata pesante in caverna e calcestruzzo a sbarramento della gola montana verso Médenine.' },
      { name: 'Bastione dell\'Uadi Zigzaou', coords: [10.22, 33.52], desc: 'Profondo letto fluviale secco trasformato in imponente fossato anticarro con casematte d\'artiglieria a tiro incrociato.' },
      { name: 'Ridotta Costiera di Mareth', coords: [10.35, 33.68], desc: 'Postazioni corazzate e sbarramenti di mine a protezione del fianco marittimo della linea sul Golfo di Gabès.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 'frontier_wire_libya',
    name: 'Reticolato di Frontiera Italo-Egiziano & Ridotta Capuzzo (Frontier Wire)',
    nation: 'Regno d\'Italia / Libia',
    builder: 'Generale Rodolfo Graziani / Regio Esercito Italiano (1931-1934 / 1939-1940)',
    description:
      'Imponente barriera fortificata e reticolato di filo spinato continuo steso dall\'Italia per oltre 270 km lungo la frontiera tra la Libia Italiana (Cirenaica) e il Regno d\'Egitto, dal Mar Mediterraneo (Bardia/Ridotta Capuzzo) fino all\'Oasi di Giarabub. Costellato di capisaldi blindati, ridotte d\'artiglieria e postazioni campali, fu l\'epicentro dei primi scontri tra il Regio Esercito e le forze corazzate del Western Desert Force britannico (7th Armoured Division / "Desert Rats") nel giugno 1940 e base di partenza dell\'avanzata su Sidi Barrani nel settembre 1940.',
    type: 'medium',
    color: '#6f7a3f',
    coordinates: [
      [25.09, 31.60], // Bardia (Sbocco a mare)
      [25.05, 31.58], // Ridotta Capuzzo
      [25.04, 31.42], // Musaid / Passo di Halfaya
      [25.03, 30.82], // Fort Maddalena
      [24.95, 30.25], // Pozzo di Bir Sheferzen
      [24.85, 29.75], // Oasi di Giarabub
    ],
    keyForts: [
      { name: 'Ridotta Capuzzo', coords: [25.05, 31.58], desc: 'Celebre piazzaforte quadrangolare italo-libica con mura merlate, torrette per mitragliatrici e cannoni, contesa duramente a partire dall\'11 giugno 1940 dall\'11th Hussars britannico.' },
      { name: 'Forte Maddalena', coords: [25.03, 30.82], desc: 'Presidio fortificato avanzato della Guardia alla Frontiera e dei battaglioni sahariani nel deserto cirenaico.' },
      { name: 'Piazzaforte dell\'Oasi di Giarabub', coords: [24.85, 29.75], desc: 'Roccaforte meridionale della Cirenaica dotata di trincee e postazioni d\'artiglieria, santuario della confraternita dei Senussi e sede dell\'eroica resistenza del maggiore Castagna.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },

  // ================= SCANDINAVIA (1936-1940) =================
  {
    id: 'oscarsborg_fortress',
    name: 'Fortezza di Oscarsborg (Drøbaksundet)',
    nation: 'Norvegia',
    builder: 'Regno di Norvegia (Colonnello Birger Eriksen)',
    description:
      'Fortezza marittima strategica posta nella strozzatura di Drøbak sull\'Oslofjord. Il 9 aprile 1940 aprì il fuoco a bruciapelo con i cannoni Krupp da 28 cm ("Moses" e "Aron") e siluri sottomarini, affondando l\'incrociatore pesante tedesco Blücher e salvando il Re e le riserve auree della Banca di Norvegia.',
    type: 'heavy',
    color: '#708a9e',
    coordinates: [
      [10.60, 59.72],
      [10.63, 59.68],
      [10.62, 59.66],
      [10.61, 59.64],
    ],
    keyForts: [
      { name: 'Oscarsborg Hovedfort (Kaholmen)', coords: [10.61, 59.67], desc: 'Batteria principale con cannoni pesanti da 28 cm Krupp e stazione lanciasiluri ipogea sommersa.' },
      { name: 'Kopås batteri', coords: [10.64, 59.68], desc: 'Batteria d\'appoggio rapido da 15 cm a protezione del passaggio est.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 'boden_fortress',
    name: 'Fortezza di Boden (Boden fästning — Il Baluardo del Ferro)',
    nation: 'Svezia',
    builder: 'Regno di Svezia (Ingegneria Reale Svedese)',
    description:
      'Colossale complesso difensivo ipogeo scavato nel granito del Norrbotten, armato di torrette corazzate Bofors a scomparsa per proteggere le strategiche miniere di minerale di ferro di Kiruna e Gällivare e la ferrovia Malmbanan.',
    type: 'heavy',
    color: '#3b6b82',
    coordinates: [
      [21.65, 65.85],
      [21.72, 65.82],
      [21.75, 65.78],
      [21.68, 65.75],
      [21.58, 65.78],
      [21.65, 65.85],
    ],
    keyForts: [
      { name: 'Rödbergsfortet', coords: [21.68, 65.82], desc: 'Il più grande forte ipogeo d\'artiglieria pesante in caverna granitica armato di cannoni da 15 cm.' },
      { name: 'Degerbergsfortet', coords: [21.64, 65.84], desc: 'Forte corazzato a sbarramento della ferrovia verso Luleå e la costa.' },
    ],
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 'hegra_fortress',
    name: 'Fortezza di Hegra (Ingstadkleiven fort)',
    nation: 'Norvegia',
    builder: 'Maggiore Hans Reidar Holtermann / Norvegia',
    description:
      'Fortezza montana nel Trøndelag a presidio della linea ferroviaria verso la Svezia. Nell\'aprile-maggio 1940, 250 volontari norvegesi resistettero a un feroce assedio tedesco e a continui raid della Luftwaffe fino al 5 maggio 1940.',
    type: 'medium',
    color: '#5b7385',
    coordinates: [
      [11.12, 63.45],
      [11.18, 63.46],
      [11.22, 63.47],
    ],
    keyForts: [
      { name: 'Ingstadkleiven Hovedverk', coords: [11.16, 63.46], desc: 'Opere sotterranee armate di cannoni Armstrong da 10,5 cm e 7,5 cm su affusto a scomparsa.' },
    ],
    activeSteps: [5], // Campagna di Norvegia 1940
  },
  {
    id: 'skanelinjen',
    name: 'Linea di Scania (Skånelinjen / Per Albin-linjen)',
    nation: 'Svezia',
    builder: 'Generale Archibald Douglas / Primo Ministro Per Albin Hansson',
    description:
      'Linea difensiva costiera di oltre 1.000 bunker in cemento armato, sbarramenti anticarro e nidi di mitragliatrici costruita tra il 1939 e il 1940 lungo tutta la costa della Scania per sventare qualsiasi sbarco d\'invasione tedesca.',
    type: 'medium',
    color: '#4a6f87',
    coordinates: [
      [12.52, 56.28], // Kullen
      [12.68, 56.05], // Helsingborg (Øresund)
      [12.85, 55.85], // Landskrona
      [12.98, 55.60], // Malmö
      [12.85, 55.40], // Falsterbo / Skanör
      [13.15, 55.37], // Trelleborg
      [13.82, 55.42], // Ystad
      [14.35, 55.55], // Simrishamn
      [14.30, 55.95], // Åhus
    ],
    keyForts: [
      { name: 'Batteri Helsingborg', coords: [12.68, 56.05], desc: 'Batterie pesanti d\'artiglieria a sbarramento della strozzatura dell\'Øresund verso la Danimarca occupata.' },
      { name: 'Skanör-Falsterbo Kustspärr', coords: [12.85, 55.40], desc: 'Sbarramento bunker e campi minati sulla punta sud-occidentale della Scania.' },
    ],
    activeSteps: [5, 6, 7, 8],
  },
  {
    id: 'salpa_line',
    name: 'Linea Salpa (Suomen Salpalinja — Il Baluardo Nazionale)',
    nation: 'Finlandia',
    builder: 'Maresciallo Carl Gustaf Emil Mannerheim / Generale Edvard Hanell',
    description:
      'Colossale linea difensiva permanente di oltre 1.200 km costruita a partire dalla primavera 1940 lungo il nuovo confine orientale scaturito dal Trattato di Mosca. Dotata di 728 bunker pesanti in cemento armato e oltre 350 km di sbarramenti anticarro costituiti da quattro file di massi granitici a dente di drago (kiviesterivi).',
    type: 'heavy',
    color: '#7f8a72',
    coordinates: [
      [27.60, 60.50], // Virolahti (Golfo di Finlandia)
      [27.52, 60.75], // Miehikkälä
      [27.75, 60.95], // Luumäki (Lago Kivijärvi)
      [28.25, 61.20], // Lappeenranta (Lago Saimaa)
      [28.75, 61.50], // Imatra / Ruokolahti
      [29.35, 61.85], // Punkaharju / Puruvesi
      [29.80, 62.45], // Joensuu
      [30.15, 63.30], // Lieksa (Lago Pielinen)
      [29.50, 64.15], // Kuhmo
      [29.25, 65.00], // Suomussalmi
      [29.10, 66.00], // Kuusamo
      [28.50, 66.75], // Kemijärvi
      [26.50, 69.25], // Inari / Jäämeri
    ],
    keyForts: [
      { name: 'Bunker Pesanti di Miehikkälä', coords: [27.52, 60.75], desc: 'Casematte corazzate con cannoni anticarro da 45 mm, postazioni mitragliatrici Maxim e ricoveri truppa sotterranei per 40 uomini.' },
      { name: 'Sbarramento Granitico di Luumäki', coords: [27.75, 60.95], desc: 'Quattro file ininterrotte di monoliti granitici da 3 tonnellate ciascuno posizionati per bloccare i carri armati pesanti sovietici.' },
      { name: 'Caposaldo di Joensuu & Pielisjoki', coords: [29.80, 62.45], desc: 'Opere d\'arresto fluviali e bunker d\'artiglieria a protezione del corridoio della Carelia Settentrionale.' },
    ],
    activeSteps: [6, 7, 8], // Costruita a partire dalla primavera 1940
  },
];

export const HISTORICAL_NAVAL_BASES: NavalBase[] = [
  // Polonia
  {
    id: 'pinsk_flotilla',
    name: 'Base Fluviale di Pińsk (Flotylla Pińska)',
    historicalName: 'Flotylla Rzeczna Marynarki Wojennej (Pińsk)',
    nation: 'Polonia',
    coords: [26.10, 52.12],
    type: 'major_base',
    theater: 'Baltic',
    description: 'Quartier generale e cantiere navale della Flottiglia Fluviale della Marina Polacca nelle paludi del Polesie. Forte di monitori corazzati fluviali (ORP Kraków, Warszawa, Wilno, Toruń, Pińsk, Horodyszcze), cannoniere e navi officina armate per il controllo strategico del bacino del Prypeć, della Pina e del Canale Reale.',
  },
  // Gran Bretagna & Alleati
  {
    id: 'scapa_flow',
    name: 'Scapa Flow',
    historicalName: 'HMNB Scapa Flow (Isole Orcadi)',
    nation: 'Regno Unito',
    coords: [-3.05, 58.91],
    type: 'fleet_hq',
    theater: 'Atlantic',
    description: 'Quartier generale e rada fortificata principale della Home Fleet britannica.',
  },
  {
    id: 'devonport',
    name: 'Devonport (Plymouth)',
    historicalName: 'HMNB Devonport (Western Approaches)',
    nation: 'Regno Unito',
    coords: [-4.18, 50.38],
    type: 'fleet_hq',
    theater: 'Atlantic',
    description: 'Il più esteso arsenale navale dell\'Europa occidentale; base di comando per le forze di superficie e di scorta nel contrasto agli U-Boot atlantici.',
  },
  {
    id: 'portsmouth',
    name: 'Portsmouth',
    historicalName: 'HMNB Portsmouth',
    nation: 'Regno Unito',
    coords: [-1.11, 50.80],
    type: 'major_base',
    theater: 'Atlantic',
    description: 'Principale arsenale navale e base della Manica della Royal Navy.',
  },
  {
    id: 'rosyth',
    name: 'Rosyth (Firth of Forth)',
    historicalName: 'HMNB Rosyth (Scottish Command)',
    nation: 'Regno Unito',
    coords: [-3.43, 56.02],
    type: 'major_base',
    theater: 'Atlantic',
    description: 'Base primaria della Royal Navy nel Mare del Nord con bacini di carenaggio per corazzate e portaerei; bersaglio del primo raid aereo tedesco del 1939.',
  },
  {
    id: 'gibraltar',
    name: 'Gibilterra',
    historicalName: 'Fortezza Navale di Gibilterra (The Rock)',
    nation: 'Regno Unito',
    coords: [-5.353, 36.133],
    type: 'fortress_chokepoint',
    theater: 'Mediterranean',
    description: 'Chokepoint strategico fondamentale: controlla l\'accesso tra Oceano Atlantico e Mediterraneo e sede della Force H.',
  },
  {
    id: 'malta',
    name: 'Malta',
    historicalName: 'Fortezza Navale di Malta (Valletta Grand Harbour)',
    nation: 'Regno Unito',
    coords: [14.52, 35.89],
    type: 'fortress_chokepoint',
    theater: 'Mediterranean',
    description: 'Perno aeronavale insulare britannico al centro del Canale di Sicilia e delle rotte per la Libia.',
  },
  {
    id: 'alexandria',
    name: 'Alessandria d\'Egitto',
    historicalName: 'Base Navale di Alessandria',
    nation: 'Regno Unito',
    coords: [29.89, 31.19],
    type: 'fleet_hq',
    theater: 'Mediterranean',
    description: 'Base della Mediterranean Fleet e guardiana dell\'accesso al Canale di Suez.',
  },
  {
    id: 'freetown',
    name: 'Freetown (Sierra Leone)',
    historicalName: 'Freetown Convoy Staging Base',
    nation: 'Regno Unito',
    coords: [-13.23, 8.48],
    type: 'major_base',
    theater: 'Atlantic',
    description: 'Rada naturale strategica nell\'Africa occidentale, snodo nevralgico obbligato per il raggruppamento dei convogli Alleati (rotta del Capo di Buona Speranza).',
  },
  {
    id: 'simons_town',
    name: 'Simon\'s Town (Sudafrica)',
    historicalName: 'HMNB Simon\'s Town (Cape of Good Hope)',
    nation: 'Regno Unito / Sudafrica',
    coords: [18.43, -34.19],
    type: 'fleet_hq',
    theater: 'Atlantic',
    description: 'Base navale oceanica e quartier generale dell\'Africa Station della Royal Navy e dell\'Unione Sudafricana a guardia del Capo di Buona Speranza (Cape Route); cardine imperiale irrinunciabile per la protezione delle linee di navigazione marittima verso il Canale di Suez, l\'India e l\'Oceano Indiano.',
  },
  {
    id: 'trincomalee',
    name: 'Trincomalee (Ceylon)',
    historicalName: 'Trincomalee Royal Naval Dockyard',
    nation: 'Regno Unito',
    coords: [81.23, 8.57],
    type: 'major_base',
    theater: 'Indian',
    description: 'Porto naturale d\'altura a Ceylon e quartier generale dell\'East Indies Fleet della Royal Navy nell\'Oceano Indiano.',
  },
  {
    id: 'singapore',
    name: 'Singapore',
    historicalName: 'Fortezza Navale di Singapore (Sembawang Naval Base)',
    nation: 'Regno Unito',
    coords: [103.82, 1.29],
    type: 'fortress_chokepoint',
    theater: 'Pacific',
    description: 'La "Gibilterra d\'Oriente": base oceanica imperiale per il controllo degli Stretti di Malacca.',
  },
  {
    id: 'halifax',
    name: 'Halifax (Canada)',
    historicalName: 'HMC Dockyard Halifax',
    nation: 'Regno Unito / Canada',
    coords: [-63.58, 44.66],
    type: 'major_base',
    theater: 'Atlantic',
    description: 'Punto di partenza principale di tutti i convogli HX e SC diretti in Gran Bretagna attraverso il Nord Atlantico.',
  },

  // Francia
  {
    id: 'brest',
    name: 'Brest',
    historicalName: 'Arsenale Navale di Brest (Bretagna)',
    nation: 'Francia',
    coords: [-4.48, 48.38],
    type: 'fleet_hq',
    theater: 'Atlantic',
    description: 'Base oceanica principale della Marine Nationale francese sull\'Atlantico.',
  },
  {
    id: 'toulon',
    name: 'Tolone',
    historicalName: 'Arsenale Navale di Tolone (Toulon)',
    nation: 'Francia',
    coords: [5.93, 43.12],
    type: 'fleet_hq',
    theater: 'Mediterranean',
    description: 'Cuore della flotta francese nel Mediterraneo e sede delle maggiori corazzate.',
  },
  {
    id: 'cherbourg',
    name: 'Cherbourg',
    historicalName: 'Arsenale Navale di Cherbourg (Cotentin / Normandia)',
    nation: 'Francia',
    coords: [-1.62, 49.64],
    type: 'major_base',
    theater: 'Atlantic',
    description: 'Grande porto militare e arsenale fortificato sulla Manica munito di rada artificiale; base per flottiglie di sommergibili e cacciatorpediniere.',
  },
  {
    id: 'lorient',
    name: 'Lorient',
    historicalName: 'Arsenale Navale di Lorient (Bretagna)',
    nation: 'Francia',
    coords: [-3.36, 47.74],
    type: 'major_base',
    theater: 'Atlantic',
    description: 'Storico arsenale marittimo alla foce dello Scorff e base navale atlantica (successivamente base sottomarina Keroman della Kriegsmarine).',
  },
  {
    id: 'mers_el_kebir',
    name: 'Mers-el-Kébir',
    historicalName: 'Base Navale di Mers-el-Kébir (Oran, Algeria)',
    nation: 'Francia',
    coords: [-0.69, 35.74],
    type: 'fleet_hq',
    theater: 'Mediterranean',
    description: 'Principale base navale d\'altura francese in Nordafrica, sede della Force de Raid (corazzate Dunkerque, Strasbourg, Bretagne, Provence); teatro dell\'Operazione Catapult britannica il 3 luglio 1940.',
  },
  {
    id: 'bizerte',
    name: 'Bizerte',
    historicalName: 'Base Navale e Arsenale di Bizerte (Sidi Abdallah, Tunisia)',
    nation: 'Francia',
    coords: [9.87, 37.27],
    type: 'fortress_chokepoint',
    theater: 'Mediterranean',
    description: 'Piazzaforte navale strategica e lago interno fortificato a presidio del Canale di Sicilia e delle comunicazioni marittime tra Mediterraneo occidentale e orientale.',
  },
  {
    id: 'dakar_naval',
    name: 'Dakar',
    historicalName: 'Base Navale di Dakar (Sénégal / AOF)',
    nation: 'Francia',
    coords: [-17.43, 14.67],
    type: 'major_base',
    theater: 'Atlantic',
    description: 'Grande base navale dell\'Africa Occidentale Francese all\'estremità della penisola di Cap-Vert; ormeggio della corazzata Richelieu e teatro della Battaglia di Dakar (Operazione Menace, settembre 1940).',
  },
  {
    id: 'diego_suarez',
    name: 'Diego-Suarez',
    historicalName: 'Base Navale di Diego-Suarez (Antsiranana, Madagascar)',
    nation: 'Francia',
    coords: [49.29, -12.27],
    type: 'major_base',
    theater: 'Indian',
    description: 'Una delle più vaste e munite baie naturali del mondo, base strategica della Marine Nationale a guardia delle rotte dell\'Oceano Indiano e del Canale di Mozambico.',
  },
  {
    id: 'saigon_naval',
    name: 'Saigon',
    historicalName: 'Arsenale Navale di Saigon (Cocincina / Indocina)',
    nation: 'Francia',
    coords: [106.70, 10.77],
    type: 'major_base',
    theater: 'Pacific',
    description: 'Quartier generale delle Forze Navali francesi in Estremo Oriente (FNEO), dotato di bacino di carenaggio galleggiante sul fiume Saigon.',
  },
  {
    id: 'djibouti_naval',
    name: 'Gibuti',
    historicalName: 'Base Navale e Porto di Gibuti (Côte Française des Somalis)',
    nation: 'Francia',
    coords: [43.14, 11.59],
    type: 'fortress_chokepoint',
    theater: 'Indian',
    description: 'Scalo navale strategico all\'imbocco dello Stretto di Bab-el-Mandeb nel Mar Rosso, testa di ponte coloniale e capolinea della ferrovia per Addis Abeba.',
  },

  // Italia
  {
    id: 'taranto',
    name: 'Taranto',
    historicalName: 'Base Navale di Taranto (Mar Grande & Piccolo)',
    nation: 'Italia',
    coords: [17.23, 40.47],
    type: 'fleet_hq',
    theater: 'Mediterranean',
    description: 'Base principale della flotta da battaglia della Regia Marina (Squadra Navale).',
  },
  {
    id: 'la_spezia',
    name: 'La Spezia',
    historicalName: 'Regio Arsenale Militare Marittimo di La Spezia',
    nation: 'Italia',
    coords: [9.82, 44.10],
    type: 'major_base',
    theater: 'Mediterranean',
    description: 'Storico arsenale e quartier generale del Dipartimento Marittimo dell\'Alto Tirreno.',
  },
  {
    id: 'massawa',
    name: 'Massaua',
    historicalName: 'Base Navale di Massaua (AOI / Mar Rosso)',
    nation: 'Italia',
    coords: [39.46, 15.61],
    type: 'major_base',
    theater: 'Indian',
    description: 'Base della Flottiglia del Mar Rosso della Regia Marina a presidio del Corno d\'Africa.',
  },
  {
    id: 'pola_naval',
    name: 'Pola (Istria)',
    historicalName: 'Regio Arsenale e Base Navale di Pola (Alto Adriatico)',
    nation: 'Italia',
    coords: [13.84, 44.87],
    type: 'major_base',
    theater: 'Mediterranean',
    description: 'Arsenale marittimo, base sommergibili e quartier generale del Comando Militare Marittimo dell\'Alto Adriatico della Regia Marina.',
  },
  {
    id: 'augusta_messina',
    name: 'Augusta e Messina',
    historicalName: 'Piazzaforte Navale di Augusta e Messina (Canale di Sicilia)',
    nation: 'Italia',
    coords: [15.22, 37.23],
    type: 'fleet_hq',
    theater: 'Mediterranean',
    description: 'Perno strategico della Regia Marina per il controllo dello Stretto di Messina e del Canale di Sicilia sulle rotte dei convogli per la Libia.',
  },
  {
    id: 'leros_aegean',
    name: 'Lero (Isole Italiane dell\'Egeo)',
    historicalName: 'Piazzaforte Aeronavale di Lero (Portolago / Egeo)',
    nation: 'Italia',
    coords: [26.85, 37.13],
    type: 'fortress_chokepoint',
    theater: 'Mediterranean',
    description: 'La più munita base navale insulare dell\'Egeo, con la rada di Portolago protetta da 24 batterie d\'artiglieria, idroscalo e base sommergibili.',
  },
  {
    id: 'tobruk_naval',
    name: 'Tobruk (Cirenaica)',
    historicalName: 'Piazzaforte Militare Marittima di Tobruk (Libia Italiana)',
    nation: 'Italia',
    coords: [23.98, 32.08],
    type: 'major_base',
    theater: 'Mediterranean',
    description: 'Base navale avanzata della Regia Marina in Nordafrica, sede dell\'incrociatore San Giorgio impiegato come batteria galleggiante contraerea.',
  },

  // Germania
  {
    id: 'wilhelmshaven',
    name: 'Wilhelmshaven',
    historicalName: 'Kriegsmarinewerft Wilhelmshaven',
    nation: 'Germania',
    coords: [8.14, 53.52],
    type: 'fleet_hq',
    theater: 'Atlantic',
    description: 'Base navale principale della Kriegsmarine sul Mare del Nord.',
  },
  {
    id: 'kiel',
    name: 'Kiel',
    historicalName: 'Reichsmarine / Kriegsmarine Base Kiel',
    nation: 'Germania',
    coords: [10.15, 54.34],
    type: 'major_base',
    theater: 'Baltic',
    description: 'Sbocco del Canale di Kiel e centro di comando per le operazioni nel Mar Baltico.',
  },
  {
    id: 'helgoland',
    name: 'Helgoland',
    historicalName: 'Seefestung Helgoland (Nordsee-Stützpunkt)',
    nation: 'Germania',
    coords: [7.89, 54.18],
    type: 'fortress_chokepoint',
    theater: 'Atlantic',
    description: 'Piazzalunga insulare fortificata e base sommergibili avanzata nel Mare del Nord (Progetto Hummerschere), dotata di batterie costiere pesanti a protezione dei golfi dell\'Elba e del Weser.',
  },
  {
    id: 'gotenhafen',
    name: 'Gotenhafen (Gdynia)',
    historicalName: 'Kriegsmarine-Hauptstützpunkt Gotenhafen (Ostsee)',
    nation: 'Germania',
    coords: [18.55, 54.52],
    type: 'fleet_hq',
    theater: 'Baltic',
    description: 'Dopo l\'occupazione della Polonia (settembre 1939), trasformata nel principale ancoraggio e centro addestramento della flotta d\'alto mare della Kriegsmarine (porto base delle corazzate Bismarck e Tirpitz).',
  },
  {
    id: 'swinemunde',
    name: 'Swinemünde',
    historicalName: 'Marinestützpunkt Swinemünde (Pommern)',
    nation: 'Germania',
    coords: [14.28, 53.91],
    type: 'major_base',
    theater: 'Baltic',
    description: 'Base navale, idroscalo e stazione siluri della Kriegsmarine sull\'isola di Usedom a controllo dell\'accesso alla Laguna di Stettino.',
  },

  // Spagna
  {
    id: 'ceuta_naval_base',
    name: 'Base Navale di Ceuta',
    historicalName: 'Base Naval y Plaza de Soberanía de Ceuta (Estrecho)',
    nation: 'Spagna',
    coords: [-5.32, 35.89],
    type: 'fortress_chokepoint',
    theater: 'Mediterranean',
    description: 'Piazzaforte marittima strategica sullo Stretto di Gibilterra (Plaza de Soberanía). Base d\'appoggio e controllo del traffico navale tra Atlantico e Mediterraneo, munita di potenti batterie costiere e punto chiave per il passaggio dell\'Ejército de África verso la penisola nel luglio 1936.',
  },
  {
    id: 'melilla_naval_base',
    name: 'Base Navale e Porto di Melilla',
    historicalName: 'Base Naval y Plaza de Soberanía de Melilla (Rif Oriental)',
    nation: 'Spagna',
    coords: [-2.93, 35.29],
    type: 'major_base',
    theater: 'Mediterranean',
    description: 'Antica piazzaforte e porto militare spagnolo sul litorale del Rif (Plaza de Soberanía dal 1497). Porto d\'imbarco principale della Legione Spagnola e dei reparti Regulares Indígenas del Kert.',
  },

  // URSS
  {
    id: 'kronstadt',
    name: 'Kronstadt',
    historicalName: 'Base Navale di Kronstadt (Leningrado)',
    nation: 'URSS',
    coords: [29.77, 59.99],
    type: 'fleet_hq',
    theater: 'Baltic',
    description: 'Fortezza navale insulare a difesa di Leningrado e quartier generale della Flotta del Baltico.',
  },
  {
    id: 'sevastopol',
    name: 'Sebastopoli',
    historicalName: 'Base Navale di Sebastopoli (Crimea)',
    nation: 'URSS',
    coords: [33.52, 44.61],
    type: 'fleet_hq',
    theater: 'Mediterranean',
    description: 'Quartier generale e porto principale della Flotta del Mar Nero sovietica.',
  },
  {
    id: 'polyarny',
    name: 'Poljarnyj / Murmansk',
    historicalName: 'Glavnaya Baza Severnogo Flota (Polyarnyy / Kola Bay)',
    nation: 'URSS',
    coords: [33.45, 69.20],
    type: 'fleet_hq',
    theater: 'Atlantic',
    description: 'Quartier generale e base principale della Flotta del Nord sovietica istituita nel 1933/1937 nella Baia di Kola; porto artico libero dai ghiacci tutto l\'anno per sommergibili e cacciatorpediniere.',
  },
  {
    id: 'vladivostok',
    name: 'Vladivostok',
    historicalName: 'Glavnaya Baza Tikhookeanskogo Flota (Zolotoj Rog)',
    nation: 'URSS',
    coords: [131.89, 43.12],
    type: 'fleet_hq',
    theater: 'Pacific',
    description: 'Quartier generale della Flotta del Pacifico sovietica nella Baia del Corno d\'Oro, perno strategico di difesa contro l\'espansionismo della Marina Imperiale Giapponese.',
  },
  {
    id: 'hanko',
    name: 'Hanko (Gangut)',
    historicalName: 'Voenno-Morskaya Baza Khanko (Leased Base 1940)',
    nation: 'URSS',
    coords: [22.95, 59.83],
    type: 'fortress_chokepoint',
    theater: 'Baltic',
    description: 'Base navale concessa in affitto per 30 anni dalla Finlandia all\'URSS col Trattato di pace di Mosca (marzo 1940); controlla con batterie costiere pesanti l\'accesso al Golfo di Finlandia e a Leningrado.',
  },
  {
    id: 'odessa',
    name: 'Odessa',
    historicalName: 'Voenno-Morskaya Baza Odessa',
    nation: 'URSS',
    coords: [30.73, 46.48],
    type: 'major_base',
    theater: 'Mediterranean',
    description: 'Grande base navale e porto commerciale sul Mar Nero per l\'esportazione del grano e il rifornimento della flotta.',
  },

  // Giappone
  {
    id: 'kure',
    name: 'Kure',
    historicalName: 'Distretto Navale di Kure (Giappone)',
    nation: 'Giappone',
    coords: [132.55, 34.23],
    type: 'fleet_hq',
    theater: 'Pacific',
    description: 'Arsenale e base principale della Marina Imperiale Giapponese, cantiere della corazzata Yamato.',
  },
  {
    id: 'yokosuka',
    name: 'Yokosuka',
    historicalName: 'Distretto Navale di Yokosuka (Baia di Tokyo)',
    nation: 'Giappone',
    coords: [139.66, 35.28],
    type: 'major_base',
    theater: 'Pacific',
    description: 'Grande base navale all\'imbocco della Baia di Tokyo per la flotta combinata.',
  },

  // USA
  {
    id: 'pearl_harbor',
    name: 'Pearl Harbor',
    historicalName: 'Pearl Harbor Naval Base (Hawaii)',
    nation: 'USA',
    coords: [-157.97, 21.36],
    type: 'fleet_hq',
    theater: 'Pacific',
    description: 'Quartier generale avanzato della Flotta del Pacifico degli Stati Uniti (US Pacific Fleet).',
  },

  // Paesi Bassi & Belgio (Benelux)
  {
    id: 'den_helder',
    name: 'Den Helder (Willemsoord)',
    historicalName: 'Rijkswerf Willemsoord — Base Principale della Reale Marina Olandese',
    nation: 'Paesi Bassi',
    coords: [4.76, 52.96],
    type: 'fleet_hq',
    theater: 'Atlantic',
    description: 'Quartier generale e arsenale principale della Koninklijke Marine nei Paesi Bassi europei. Sede di cantieri di carenaggio, flottiglie di cacciatorpediniere, torpediniere e sommergibili a guardia dell\'imbocco dell\'IJsselmeer e del Mare del Nord.',
  },
  {
    id: 'vlissingen',
    name: 'Vlissingen (Flushing)',
    historicalName: 'Marinebasis Vlissingen & Cantieri De Schelde',
    nation: 'Paesi Bassi',
    coords: [3.57, 51.44],
    type: 'major_base',
    theater: 'Atlantic',
    description: 'Base navale strategica e stabilimenti della Koninklijke Maatschappij De Schelde alla foce della Schelda Occidentale; chiave di volta per il controllo delle rotte marittime verso Anversa.',
  },
  {
    id: 'rotterdam_hoek',
    name: 'Rotterdam / Hoek van Holland',
    historicalName: 'Marinecomplex Rotterdam & Nieuwe Waterweg',
    nation: 'Paesi Bassi',
    coords: [4.12, 51.98],
    type: 'major_base',
    theater: 'Atlantic',
    description: 'Grande scalo marittimo e base navale ausiliaria all\'imbocco della Nieuwe Waterweg. Nel maggio 1940 i fanti di marina olandesi (Korps Mariniers) vi opposero una leggendaria resistenza ai ponti della Mosa prima del bombardamento della Luftwaffe.',
  },
  {
    id: 'zeebrugge',
    name: 'Zeebrugge & Oostende',
    historicalName: 'Base Navale di Zeebrugge / Corps de Marine Belge',
    nation: 'Belgio',
    coords: [3.21, 51.33],
    type: 'major_base',
    theater: 'Atlantic',
    description: 'Principale scalo costiero del Belgio sul Mare del Nord, base di posamine e pattugliatori costieri del Corps de Marine belga; nodo vitale per l\'evacuazione delle truppe alleate verso Dunkerque e l\'Inghilterra nel maggio 1940.',
  },

  // Area Balcanica, Danubiana ed Egea
  {
    id: 'kotor_naval_base',
    name: 'Bocche di Cattaro (Boka Kotorska)',
    historicalName: 'Glavna Pomorska Baza Boka Kotorska — Kraljevska mornarica',
    nation: 'Jugoslavia',
    coords: [18.69, 42.43],
    type: 'fleet_hq',
    theater: 'Mediterranean',
    description: 'Quartier generale navale e arsenale di Tivat per la Regia Marina Jugoslava (Kraljevska mornarica). Base principale per cacciatorpediniere (Dubrovnik, Beograd, Zagreb, Ljubljana), flottiglie di sommergibili (Hrabri, Nebojša, Smeli, Osvetnik) e idroscalo della Regia Aeronautica Navale a Kumbor.',
  },
  {
    id: 'salamis_naval_base',
    name: 'Salamina (Salamis / Atene)',
    historicalName: 'Vafstathmos Salaminas — Arsenale Principale della Regia Marina Greca',
    nation: 'Grecia',
    coords: [23.53, 37.97],
    type: 'fleet_hq',
    theater: 'Mediterranean',
    description: 'Principale base navale e arsenale della Vasiliko Naftiko greca nel golfo di Sarònico. Base d\'armamento dell\'incrociatore corazzato Georgios Averof, di 10 moderni cacciatorpediniere (classi Kountouriotis e Vasilefs Georgios) e delle flottiglie sommergibili a difesa dell\'Egeo.',
  },
  {
    id: 'constanta_naval_base',
    name: 'Costanza (Constanța)',
    historicalName: 'Baza Navală Constanța — Marina Regală Română',
    nation: 'Romania',
    coords: [28.66, 44.17],
    type: 'fleet_hq',
    theater: 'Mediterranean',
    description: 'Grande porto commerciale e base strategica principale della Marina Reale Romena sul Mar Nero. Quartier generale della divisione cacciatorpediniere (Regele Ferdinand, Regina Maria, Mărăști, Mărășești), posamine e del sommergibile Delfinul a guardia dei terminali petroliferi di Ploiești.',
  },
  {
    id: 'sazan_naval_base',
    name: 'Isola di Saseno (Sazan / Valona)',
    historicalName: 'Comando Militare Marittimo dell\'Isola di Saseno — Regia Marina',
    nation: 'Italia',
    coords: [19.28, 40.50],
    type: 'fortress_chokepoint',
    theater: 'Mediterranean',
    description: 'Isola fortificata italiana all\'imbocco della baia di Valona a controllo dello Stretto d\'Otranto (Trattato di Rapallo 1920). Munita di potenti batterie costiere antinave in caverna, stazione per torpediniere e idroscalo militare.',
  },
  {
    id: 'sibenik_naval_base',
    name: 'Sebenico (Šibenik)',
    historicalName: 'Pomorska Baza Šibenik — Kraljevska mornarica',
    nation: 'Jugoslavia',
    coords: [15.89, 43.73],
    type: 'major_base',
    theater: 'Mediterranean',
    description: 'Seconda base navale e centro addestramento della marina jugoslava protetta dal canale di Sant\'Antonio e dai forti veneziani. Base operativa di siluranti, posamine e flottiglie di MAS costieri.',
  },
  {
    id: 'varna_naval_base',
    name: 'Varna',
    historicalName: 'Morska Baza Varna — Voennomorski sili na Balgariya',
    nation: 'Bulgaria',
    coords: [27.91, 43.20],
    type: 'major_base',
    theater: 'Mediterranean',
    description: 'Principale base costiera della Regia Marina Bulgara sul Mar Nero, sede della flottiglia torpediniere (Drazki, Smeli, Hrabri), stazioni costiere d\'idrovolanti e batterie a guardia del golfo.',
  },

  // ================= BASI NAVALI SCANDINAVE (1936-1940) =================
  {
    id: 'karlskrona_naval_base',
    name: 'Karlskrona',
    historicalName: 'Karlskrona Örlogsbas — Kungliga Flottan',
    nation: 'Svezia',
    coords: [15.58, 56.16],
    type: 'fleet_hq',
    theater: 'Baltic',
    description: 'Quartier generale supremo e arsenale principale della Regia Marina Svedese sin dal 1680. Disposta su 30 isole protetta dalle fortezze di Kungsholmen e Drottningskär; base delle navi da battaglia costiere classe Sverige, cacciatorpediniere e sommergibili.',
  },
  {
    id: 'copenhagen_holmen_base',
    name: 'Copenaghen (Holmen)',
    historicalName: 'Orlogsværftet & Flådestation Holmen — Kongelige Danske Marine',
    nation: 'Danimarca',
    coords: [12.60, 55.68],
    type: 'fleet_hq',
    theater: 'Baltic',
    description: 'Base navale storica e cantiere militare della Regia Marina Danese su sei isole artificiali all\'interno del porto di Copenaghen. Sede della flottiglia sommergibili, torpediniere e della nave guardacoste Niels Juel.',
  },
  {
    id: 'horten_karljohansvern_base',
    name: 'Horten (Karljohansvern)',
    historicalName: 'Karljohansvern Hovedorlogsverft — Den Kongelige Norske Marine',
    nation: 'Norvegia',
    coords: [10.49, 59.43],
    type: 'fleet_hq',
    theater: 'Atlantic',
    description: 'Principale base navale e arsenale della Regia Marina Norvegese sull\'Oslofjord, sede delle officine costruttive di torpediniere, posamine (Olav Tryggvason) e sottomarini classe B.',
  },
  {
    id: 'narvik_naval_base',
    name: 'Narvik',
    historicalName: 'Narvik Orlogsstasjon & Malmhavn',
    nation: 'Norvegia',
    coords: [17.43, 68.44],
    type: 'fortress_chokepoint',
    theater: 'Atlantic',
    description: 'Porto minerario oceanico strategico nell\'Ofotfjord artico, scalo insostituibile per l\'esportazione del ferro svedese. Teatro delle storiche battaglie navali dell\'aprile 1940 tra la Royal Navy e la Kriegsmarine, culminate nell\'affondamento delle corazzate costiere norvegesi Eidsvold e Norge e di 10 cacciatorpediniere tedeschi.',
  },
  {
    id: 'bergen_naval_base',
    name: 'Bergen (Marineholmen)',
    historicalName: 'Marineholmen Orlogsstasjon (Kvarven fort)',
    nation: 'Norvegia',
    coords: [5.32, 60.39],
    type: 'major_base',
    theater: 'Atlantic',
    description: 'Base navale occidentale della Marina Norvegese protetta dalla fortezza di Kvarven e dal Byfjorden. Occupata nell\'aprile 1940 dopo l\'affondamento dell\'incrociatore tedesco Königsberg ad opera di aerei navali britannici; trasformata dalla Kriegsmarine nella base sommergibili U-Boot-Bunker Bruno.',
  },
];
