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

export interface DynamicBaseStatus {
  nation: string;
  historicalName?: string;
  theater?: 'Atlantic' | 'Mediterranean' | 'Pacific' | 'Baltic' | 'Indian';
  description: string;
  fillColor: string;
  strokeColor: string;
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
  getDynamicStatus?: (step: number) => DynamicBaseStatus;
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
    activeSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
    activeSteps: [6, 7, 8, 9, 10, 11], // Eretta nel giugno 1940 e presidiata durante la difesa della Gran Bretagna
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
    activeSteps: [5, 6, 7, 8, 9, 10, 11],
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
    activeSteps: [5, 6, 7, 8, 9, 10, 11],
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
    activeSteps: [6, 7, 8, 9, 10, 11], // Costruita a partire dalla primavera 1940 e presidiata
  },
  {
    id: 'mozhaysk_line',
    name: 'Linea di Difesa di Možajsk / Cintura di Mosca (MZO)',
    nation: 'URSS',
    builder: 'Comando Fronte Occidentale (Žukov) & Popolazione di Mosca (GKO)',
    description:
      'Imponente sistema fortificato campale su più fasce difensive allestito nell\'autunno-inverno 1941 per sbarrare l\'avanzata delle armate corazzate tedesche (Operazione Tifone) verso Mosca. Comprendeva la Linea di Možajsk (Volokolamsk - Možajsk - Malojaroslavec - Kaluga), centinaia di bunker in cemento armato, trincee anticarro e la Zona di Difesa di Mosca (MZO). Respinse l\'Operazione Tifone e fu la base di lancio della controffensiva sovietica del 5 dicembre 1941.',
    type: 'heavy',
    color: '#d9534f',
    coordinates: [
      [35.95, 56.03], // Volokolamsk
      [36.02, 55.50], // Možajsk / Borodino
      [36.50, 55.01], // Malojaroslavec
      [36.25, 54.52], // Kaluga (Fiume Oka)
      [37.60, 54.20], // Tula (Perno meridionale difeso dal Gen. Boldin)
    ],
    keyForts: [
      { name: 'Caposaldo di Možajsk & Campo di Borodino', coords: [36.02, 55.50], desc: 'Settore dell\'eroica resistenza della 32ª Divisione fucilieri di Polosuchin contro la 10ª Panzerdivision.' },
      { name: 'Baluardo Corazzato di Tula', coords: [37.60, 54.20], desc: 'Roccaforte operaia e anticarro che bloccò l\'accerchiamento meridionale del 2º Gruppo Corazzato di Guderian.' },
      { name: 'Sbarramento di Volokolamsk', coords: [35.95, 56.03], desc: 'Trincee e cannoni anticarro della 316ª Divisione di Panfilov lungo l\'autostrada per Mosca.' },
    ],
    activeSteps: [9, 10, 11],
  },
  {
    id: 'kaur_leningrad_line',
    name: 'Distretto Fortificato Careliano & Cintura di Leningrado (KaUR / Pulkovo)',
    nation: 'URSS',
    builder: 'Comando Fronte di Leningrado / Flotta del Baltico / Popolazione Civile',
    description:
      'Cintura difensiva titanica a protezione di Leningrado assediata (settembre 1941). A nord il Settore Fortificato Careliano (KaUR) bloccò l\'avanzata finlandese sulla vecchia frontiera del 1939; a sud la Linea dell\'Ižora, Kronštadt e le difese d\'artiglieria navale di Pulkovo respinsero il Gruppo d\'Armate Nord tedesco.',
    type: 'heavy',
    color: '#b04540',
    coordinates: [
      [29.85, 60.35], // Beloostrov / Sestroreck (KaUR sul Golfo di Finlandia)
      [30.15, 60.28], // Lembolovo (Settore centrale KaUR)
      [30.45, 60.25], // Fiume Neva / Sponda del Ladoga
      [30.30, 59.78], // Alture di Pulkovo (Cintura meridionale)
      [30.60, 59.75], // Distretto Fortificato di Ižora / Kolpino
    ],
    keyForts: [
      { name: 'Caposaldo KaUR di Sestroreck', coords: [29.95, 60.28], desc: 'Bunker pesanti e torrette corazzate a sbarramento della ferrovia e della strada costiera contro le forze finlandesi.' },
      { name: 'Alture di Pulkovo', coords: [30.32, 59.77], desc: 'Baluardo strategico dell\'artiglieria navale della Flotta del Baltico che impedì ai cannoni d\'assedio tedeschi di conquistare la città.' },
      { name: 'Forte Krasnaja Gorka', coords: [29.35, 59.97], desc: 'Gigantesche batterie costiere da 305 mm a protezione della sacca di Oranienbaum sul Golfo di Finlandia.' },
    ],
    activeSteps: [9, 10, 11],
  },
  {
    id: 'el_alamein_line',
    name: 'Linea di El Alamein & Cresta di Alam el Halfa (Stretta di Qattara)',
    nation: 'Regno Unito / Commonwealth',
    builder: '8th Army (Gen. Claude Auchinleck / Ten. Gen. Bernard Montgomery)',
    description:
      'L\'unica posizione difensiva nel Deserto Occidentale egiziano non aggirabile a sud dai mezzi corazzati grazie all\'invalicabile Depressione di Qattara. Lunga 60 km dal Mar Mediterraneo (stazione di El Alamein e Tell el Eisa) attraverso la cresta di Ruweisat e la cresta fortificata di Alam el Halfa fino a Qaret el Himeimat: con i suoi immensi "Giardini del Diavolo" (campi minati), "box" fortificati e sbarramenti anticarro, arrestò la Panzerarmee Afrika di Rommel nel luglio-agosto 1942 a soli 100 km da Alessandria.',
    type: 'heavy',
    color: '#3d7848',
    coordinates: [
      [28.95, 30.84], // El Alamein / Tell el Eisa (Mediterraneo)
      [29.02, 30.65], // Cresta di Miteiriya & Ruweisat Ridge
      [29.18, 30.62], // Cresta di Alam el Halfa (Quota 132)
      [29.08, 30.48], // Bab el Qattara / Depressione di Deir elinda
      [28.98, 30.35], // Qaret el Himeimat (Bordo della Depressione di Qattara)
    ],
    keyForts: [
      { name: 'Box di El Alamein & Tell el Eisa', coords: [28.95, 30.84], desc: 'Perno costiero fortificato presidiato dalla 1ª Divisione Sudafricana e dalla 9ª Divisione Australiana lungo la ferrovia per Alessandria.' },
      { name: 'Cresta di Ruweisat (Ruweisat Ridge)', coords: [29.02, 30.65], desc: 'Dorsale rocciosa centrale al cuore dei feroci scontri della Prima Battaglia di El Alamein (luglio 1942) tra carri dell\'Asse, divisioni indiane e neozelandesi.' },
      { name: 'Cresta Fortificata di Alam el Halfa', coords: [29.18, 30.62], desc: 'Perno difensivo arretrato presidiato dalla 44ª Divisione britannica e dai carri Grant interrati che infranse l\'ultimo assalto corazzato di Rommel (30 agosto - 5 settembre 1942).' },
    ],
    activeSteps: [10],
  },
  {
    id: 'stalingrad_volga_line',
    name: 'Anello Difensivo di Stalingrado & Fronte del Volga (Stalingradskij Obvod)',
    nation: 'URSS',
    builder: 'Fronte di Stalingrado (62ª e 64ª Armata) & Comitato di Difesa Urbano (A. S. Čujanov)',
    description:
      'Complesso di quattro anelli fortificati concentrici (Esterno, Medio, Interno e Urbano — Obvody "O", "S", "V", "G") per oltre 2.500 km di trincee, fossati anticarro e capisaldi industriali edificati tra il Don e il Volga. Il 23 agosto 1942 il XIV Corpo Panzer tedesco raggiunse il Volga a Rynok a nord della città, mentre a fine agosto la 4ª Armata Panzer di Hoth sfondò ad Abganerovo da sud. Sotto la vigenza dell\'Ordine N. 227 di Stalin ("Né un passo indietro!"), la 62ª Armata sovietica (guidata dal Ten. Gen. Anton Lopatin e, dalla battaglia urbana di settembre, dal Gen. Vasilij Čujkov) e la 64ª Armata del Gen. Šumilov difendono i perimetri d\'accesso e i colossi industriali lungo la sponda del Volga.',
    type: 'heavy',
    color: '#d9534f',
    coordinates: [
      [44.62, 48.83], // Rynok / Spartakovka (Riva del Volga a nord)
      [44.58, 48.79], // Fabbrica di Trattori Dzeržinskij (STZ) & Barrikady
      [44.54, 48.74], // Collina di Mamajev Kurgan (Quota 102,0)
      [44.51, 48.70], // Stazione Centrale, Casa di Pavlov & Imbarcadero sul Volga
      [44.43, 48.59], // Silo Granario & Beketovka
      [44.55, 48.51], // Krasnoarmejsk (Sbocco del futuro canale Volga-Don a sud)
    ],
    keyForts: [
      { name: 'Caposaldo di Rynok & Spartakovka (Corridoio Settentrionale)', coords: [44.62, 48.83], desc: 'Punto di contatto dove la 16ª Panzer-Division raggiunse il Volga il 23 agosto 1942; difeso all\'estremo dal 1077º Reggimento contraereo (giovani volontarie sovietiche che spararono ad alzo zero contro i panzer) e dagli operai armati della STZ.' },
      { name: 'Complesso Industriale STZ, Barrikady & Krasnyj Oktjabr\'', coords: [44.58, 48.79], desc: 'I colossali stabilimenti di trattori (STZ, produttori dei carri T-34), officine per cannoni (Barrikady) e acciaierie (Ottobre Rosso) fortificati per la difesa a oltranza.' },
      { name: 'Mamajev Kurgan (Quota 102,0)', coords: [44.54, 48.74], desc: 'Collina strategica dominante l\'intera città, la stazione ferroviaria e gli attraversamenti sul Volga, contesa metro per metro in sanguinosi assalti all\'arma bianca.' },
      { name: 'Imbarcadero Centrale e Traghetti sul Volga', coords: [44.52, 48.71], desc: 'Cordone ombelicale della difesa sovietica garantito dalla Flottiglia Militare del Volga (Contramm. Rogachev), indispensabile per il traghettamento continuo di munizioni, viveri e rinforzi sotto costante bombardamento aereo e d\'artiglieria.' },
      { name: 'Silo Granario & Beketovka (Caposaldo Sud della 64ª Armata)', coords: [44.43, 48.59], desc: 'Mastodontica torre granaria in cemento armato e perno difensivo meridionale retto dalla 64ª Armata del Gen. Šumilov contro la 4ª Armata Panzer di Hoth.' },
    ],
    activeSteps: [10],
  },
  {
    id: 'atlantic_wall_1942',
    name: 'Vallo Atlantico (Atlantikwall — Direttiva del Führer N. 40)',
    nation: 'Germania',
    builder: 'Organizzazione Todt & OB West (Feldm. Gerd von Rundstedt)',
    description:
      'Colossale sistema di fortificazioni costiere lungo le coste dell\'Europa occupata decretato da Hitler con la Direttiva N. 40 del 23 marzo 1942 dopo i raid dei Commandos britannici (Saint-Nazaire, Operazione Chariot, 28 marzo 1942). Articolato in Festungen portuali (porti-fortezza e bunker per U-Boot) e batterie pesanti sul Passo di Calais (Batteria Todt, Lindemann), respinse con gravi perdite alleate il grande sbarco anglo-canadese a Dieppe del 19 agosto 1942 (Operazione Jubilee).',
    type: 'heavy',
    color: '#707478',
    coordinates: [
      [3.22, 51.33],  // Zeebrugge / Ostenda
      [1.85, 50.95],  // Calais / Cap Gris-Nez (Batterie Todt & Lindemann)
      [1.61, 50.72],  // Boulogne-sur-Mer
      [1.08, 49.93],  // Dieppe (Teatro dell'Operazione Jubilee, 19 agosto 1942)
      [0.11, 49.49],  // Festung Le Havre
      [-1.62, 49.64], // Festung Cherbourg
      [-2.02, 48.65], // Festung Saint-Malo & Isole del Canale
      [-4.48, 48.39], // Festung Brest
      [-3.36, 47.75], // Festung Lorient
      [-2.21, 47.27], // Festung Saint-Nazaire (Teatro dell'Operazione Chariot, 28 marzo 1942)
    ],
    keyForts: [
      { name: 'Batterie Todt & Lindemann (Cap Gris-Nez / Calais)', coords: [1.58, 50.87], desc: 'Gigantesche casematte corazzate con cannoni navali da 380 mm e 406 mm puntate sullo Stretto di Dover.' },
      { name: 'Caposaldo Costiero di Dieppe (Widerstandsnest)', coords: [1.08, 49.93], desc: 'Falesie fortificate e bunker in cemento che il 19 agosto 1942 infransero il raid anfibio della 2ª Divisione Canadese (Operazione Jubilee).' },
      { name: 'Festung Saint-Nazaire & Chiusa Normandie', coords: [-2.21, 47.27], desc: 'Base U-Boot e grande bacino di carenaggio (Forme Joubert) assaltato dal cacciatorpediniere britannico HMS Campbeltown il 28 marzo 1942.' },
    ],
    activeSteps: [10, 11],
  },
  {
    id: 'stalingrad_kessel_line',
    name: 'Perimetro della Sacca di Stalingrado (Kessel della 6ª Armata Tedesca)',
    nation: 'Germania / Asse',
    builder: '6. Armee (Generaloberst Friedrich Paulus) & 4. Panzerarmee',
    description:
      'Perimetro difensivo circolare lungo circa 170 km stretto d\'assedio da sette armate sovietiche (Fronti del Don e di Stalingrado) dopo la chiusura della tenaglia dell\'Operazione Uranus a Kalač-na-Donu (23 novembre 1942). Nel Kessel rimasero intrappolati oltre 250.000 soldati dell\'Asse (20 divisioni tedesche e 2 romene), riforniti solo parzialmente dal precario ponte aereo della Luftwaffe (aeroporti di Pitomnik e Gumrak).',
    type: 'heavy',
    color: '#333333',
    coordinates: [
      [43.60, 48.70], // Marinovka (vertice occidentale)
      [43.85, 48.85], // Vertyachy / Baburkin
      [44.20, 48.95], // Rynok / Spartakovka
      [44.55, 48.75], // Volga / Stalingrado centro
      [44.40, 48.50], // Beketovka / Tsybenko
      [43.90, 48.55], // Karpovka / Kravtsov
      [43.60, 48.70], // Marinovka
    ],
    keyForts: [
      { name: 'Aeroporto Principale di Pitomnik', coords: [44.18, 48.74], desc: 'Principale scalo d\'atterraggio per i rifornimenti aerei della Luftwaffe e l\'evacuazione dei feriti del Kessel.' },
      { name: 'Aeroporto Ausiliario di Gumrak', coords: [44.35, 48.78], desc: 'Base di riserva per gli Heinkel He 111 e Ju 52 e quartier generale avanzato della 6ª Armata.' },
      { name: 'Perno Difensivo di Marinovka', coords: [43.60, 48.70], desc: 'Settore occidentale della sacca presidiato dal 3º e 29º reggimento motorizzato contro il Fronte del Don sovietico.' },
    ],
    activeSteps: [11],
  },
  {
    id: 'el_agheila_line',
    name: 'Linea Difensiva di El Agheila — Mersa el Brega (Stretta della Sirtica)',
    nation: 'Italia / Germania (Asse)',
    builder: 'Deutsch-Italienische Panzerarmee (Generalfeldmarschall Erwin Rommel)',
    description:
      'Stretta difensiva naturale e fortificata tra il Golfo della Sirte e le saline impraticabili (Sebcha di Chebira e Mugtaa) all\'estremità occidentale della Cirenaica. Dopo la ritirata da El Alamein e l\'abbandono di Tobruk e Bengasi (novembre 1942), Rommel attesta le provate divisioni dell\'Asse ("Ariete", "Trieste", "Littorio", 15ª e 21ª Panzer) su questa linea per sbarrare l\'avanzata dell\'8ª Armata di Montgomery verso Tripoli.',
    type: 'field',
    color: '#d9a74a',
    coordinates: [
      [19.57, 30.42], // Mersa el Brega (costa mediterranea)
      [19.26, 30.25], // El Agheila
      [19.05, 30.08], // Sebcha Mugtaa
      [18.80, 29.85], // Depressione desertica meridionale
    ],
    keyForts: [
      { name: 'Caposaldo Costiero di Mersa el Brega', coords: [19.57, 30.42], desc: 'Perno settentrionale fortificato a controllo della Via Balbia con estesi campi minati ("Devil\'s gardens").' },
      { name: 'Perno Difensivo di El Agheila', coords: [19.26, 30.25], desc: 'Quartier generale tattico e sbarramento carraio delle divisioni corazzate italo-tedesche.' },
      { name: 'Chiusura delle Saline (Sebcha di Chebira)', coords: [19.05, 30.08], desc: 'Bacini di sabbie mobili e depressioni salmastre che proteggevano il fianco meridionale dell\'Asse.' },
    ],
    activeSteps: [11],
  },
  {
    id: 'etna_quadrilateral_line',
    name: 'Quadrilatero Difensivo dell\'Etna (Linea San Fratello - Troina - Randazzo - Acireale - Catania)',
    nation: 'Italia / Germania (Asse)',
    builder: 'XIV. Panzerkorps (Gen. Hans-Valentin Hube) & 6ª Armata Italiana (Gen. Alfredo Guzzoni)',
    description:
      'Cintura fortificata naturale e di trincee campali scaglionata sulle pendici laviche dell\'Etna e lungo i rilievi dei Monti Nebrodi. Presidiata dalla Divisione corazzata paracadutisti Hermann Göring, dalla 15. Panzergrenadier, dalla 29. Panzergrenadier e dalla Divisione Livorno per bloccare l\'avanzata della 7ª Armata di Patton a nord (Troina/San Fratello) e dell\'8ª Armata di Montgomery a sud (Piana di Catania / Ponte Primosole), proteggendo la via di evacuazione verso lo Stretto di Messina.',
    type: 'field',
    color: '#d9534f',
    coordinates: [
      [14.60, 38.01], // San Fratello (costa tirrenica)
      [14.59, 37.78], // Troina
      [14.90, 37.91], // Randazzo (nodo settentrionale Etna)
      [15.16, 37.61], // Acireale (costa jonica)
      [15.08, 37.45], // Piana di Catania / Fiume Simeto (Ponte Primosole)
    ],
    keyForts: [
      { name: 'Rocca di Troina', coords: [14.59, 37.78], desc: 'Baluardo montano aspramente difeso dalla 15. Panzergrenadier contro la 1ª Divisione USA.' },
      { name: 'Nodo Stradale di Randazzo', coords: [14.90, 37.91], desc: 'Perno centrale di ritirata alle falde nord dell\'Etna.' },
      { name: 'Sbarramento del Ponte Primosole', coords: [15.08, 37.45], desc: 'Ponte sul Simeto a sud di Catania difeso dai paracadutisti tedeschi contro i parà britannici.' },
      { name: 'Batterie Costiere dello Stretto di Messina', coords: [15.55, 38.20], desc: 'Potente concentrazione di contraerea e artiglieria costiera a copertura dei traghetti di evacuazione.' },
    ],
    activeSteps: [12],
  },
  {
    id: 'gotenkopf_kuban_line',
    name: 'Gotenkopf-Stellung (Testa di Ponte del Kuban\' & Penisola di Taman\')',
    nation: 'Germania (Wehrmacht)',
    builder: '17. Armee (General der Gebirgstruppe Rudolf Konrad / Erwin Jaenecke)',
    description:
      'Linea fortificata ("Gotenkopf") trincerata lungo la penisola di Taman\' tra il Mar d\'Azov e il Mar Nero a est dello Stretto di Kerč\'. Costituita da una fitta trama di campi minati, fossati anticarro e capisaldi nei centri di Novorossijsk, Krymskaja e Temrjuk; permise alla 17ª Armata di resistere per mesi alle offensive sovietiche nel Caucaso fino all\'evacuazione in Crimea (Operazione Krimhild).',
    type: 'field',
    color: '#8b8f94',
    coordinates: [
      [37.38, 45.32], // Temrjuk (Mar d\'Azov)
      [37.78, 44.92], // Krymskaja
      [37.78, 44.72], // Novorossijsk (porto del Mar Nero)
    ],
    keyForts: [
      { name: 'Porto e Piazzaforte di Novorossijsk', coords: [37.78, 44.72], desc: 'Base navale del Mar Nero contesa casa per casa tra fanti di marina sovietici della "Malaja Zemlja" e Wehrmacht.' },
      { name: 'Snodo di Krymskaja', coords: [37.78, 44.92], desc: 'Perno logistico e ferroviario fortificato della Gotenkopf-Stellung.' },
      { name: 'Presidio Costiero di Temrjuk', coords: [37.38, 45.32], desc: 'Ancoraggio settentrionale della linea fortificata sul delta del Kuban\' e Mar d\'Azov.' },
    ],
    activeSteps: [12, 13],
  },
  {
    id: 'kursk_salient_defenses',
    name: 'Cinture Difensive del Saliente di Kursk (Fronte Centrale & Voronež)',
    nation: 'Unione Sovietica (Armata Rossa)',
    builder: 'Fronti Centrale, Voronež e della Steppa (Žukov, Rokossovskij, Vatutin)',
    description:
      'La più formidabile concentrazione difensiva campale della storia militare: 8 cinture fortificate scaglionate fino a 300 km in profondità, con oltre 500.000 mine anticarro e antiuomo (densità fino a 2.000 per km di fronte), trincee per 10.000 km e zone di sbarramento d\'artiglieria PAK-front sulle quali si è infranta la manovra tedesca Zitadelle a Prochorovka.',
    type: 'field',
    color: '#d9534f',
    coordinates: [
      [35.30, 52.30], // Settore settentrionale (fianco di Ponyri / Maloarchangel\'sk)
      [36.19, 51.73], // Kursk centro del saliente
      [36.83, 51.04], // Prochorovka
      [36.58, 50.60], // Settore meridionale (Belgorod / Tomarovka)
    ],
    keyForts: [
      { name: 'Nodo Fortificato di Ponyri', coords: [36.30, 52.32], desc: '"La Stalingrado di Kursk" a nord: caposaldo ferroviario dove la 9ª Armata di Model fu arrestata.' },
      { name: 'Campo di Battaglia Corazzato di Prochorovka', coords: [36.83, 51.04], desc: 'Scontro titanico del 12 luglio tra 1. SS-Panzerkorps e la 5ª Armata Corazzata delle Guardie di Rotmistrov.' },
      { name: 'Perno Difensivo di Obojan\'', coords: [36.28, 51.21], desc: 'Sbarramento anticarro che impedì alla 4ª Armata Panzer di raggiungere Kursk da sud.' },
    ],
    activeSteps: [12],
  },
  {
    id: 'volturno_line_1943',
    name: 'Linea del Volturno (Volturno-Stellung & Linea Viktor)',
    nation: 'Germania (Wehrmacht)',
    builder: 'Generalfeldmarschall Albert Kesselring / 10. Armee (Gen. von Vietinghoff)',
    description:
      'Prima linea difensiva campale allestita dalla Wehrmacht a sud di Roma per sbarrare l\'avanzata alleata dopo lo sbarco a Salerno e l\'insurrezione di Napoli. Corre dalla foce del fiume Volturno sul Tirreno attraverso Capua, le gole montane del Matese e Termoli sull\'Adriatico.',
    type: 'field',
    color: '#8b8f94',
    coordinates: [
      [13.95, 41.03], // Foce del Volturno (Castel Volturno)
      [14.21, 41.11], // Capua
      [14.37, 41.35], // Matese / Piedimonte d'Alife
      [14.99, 41.99], // Termoli (Adriatico)
    ],
    keyForts: [
      { name: 'Sbarramento Fluviale di Capua', coords: [14.21, 41.11], desc: 'Ponti minati e capisaldi d\'artiglieria a blocco della Via Appia e della ferrovia per Roma.' },
      { name: 'Bastione Montano del Matese', coords: [14.37, 41.35], desc: 'Trincee d\'alta quota e postazioni per mitragliatrici MG-42 dominanti la valle del Volturno.' },
      { name: 'Caposaldo Costiero di Termoli', coords: [14.99, 41.99], desc: 'Ancoraggio adriatico della linea, teatro di feroci contrattacchi della 16. Panzer-Division contro i commando britannici.' },
    ],
    activeSteps: [13],
  },
  {
    id: 'panther_wotan_line_1943',
    name: 'Ostwall — Linea Panther-Wotan sul Dniepr',
    nation: 'Germania (Wehrmacht)',
    builder: 'Generalfeldmarschall Erich von Manstein / Heeresgruppe Süd & Mitte',
    description:
      'Imponente barriera difensiva strategica voluta da Hitler lungo il grande corso del fiume Dniepr e la riva della Moločna per arrestare l\'offensiva generale dell\'Armata Rossa dopo la sconfitta di Kursk. Nonostante la poderosa barriera naturale dell\'alto argine destro, a fine settembre 1943 le avanguardie sovietiche sfondano la linea creando oltre 20 teste di ponte sulla riva occidentale.',
    type: 'field',
    color: '#a89d34',
    coordinates: [
      [31.05, 51.50], // Černigov / Desna
      [30.52, 50.45], // Kiev / Dniepr
      [31.46, 49.75], // Kanev / Bukrin
      [33.42, 49.07], // Kremenčuk
      [35.15, 47.85], // Zaporož'e
      [35.37, 46.85], // Linea Wotan (fiume Moločna / Melitopol')
    ],
    keyForts: [
      { name: 'Testa di Ponte di Bukrin', coords: [31.46, 49.75], desc: 'Spettacolare traversata d\'assalto del Dniepr a sud di Kiev con zattere e gommoni sotto il fuoco tedesco.' },
      { name: 'Piazzaforte Fluviale di Kremenčuk', coords: [33.42, 49.07], desc: 'Nodo logistico e ferroviario dell\'ansa del Dniepr espugnato dalle forze del generale Konev a fine settembre.' },
      { name: 'Sbarramento Wotan di Melitopol\'', coords: [35.37, 46.85], desc: 'Linea fortificata sul fiume Moločna a protezione dell\'accesso terrestre alla Crimea.' },
    ],
    activeSteps: [13],
  },
  {
    id: 'albert_trasimeno_line_1944',
    name: 'Linea Albert / Trasimeno (Albert-Linie)',
    nation: 'Germania (Wehrmacht) / RSI',
    builder: 'Generalfeldmarschall Albert Kesselring / 14. Armee & 10. Armee',
    description:
      'Linea difensiva campale allestita dalla Wehrmacht a fine giugno 1944 dopo la caduta di Roma per ritardare l\'avanzata alleata e guadagnare tempo vitale per il consolidamento della Linea Gotica. Corre dal litorale tirrenico di Cecina attraverso le colline di Siena, Chiusi e il Lago Trasimeno fino ad Ancona sull\'Adriatico.',
    type: 'field',
    color: '#8b8f94',
    coordinates: [
      [10.52, 43.31], // Foce del Cecina (Tirreno)
      [11.05, 43.10], // Colline a sud-ovest di Siena / Chiusdino
      [11.94, 43.01], // Chiusi / Valdichiana
      [12.10, 43.13], // Lago Trasimeno (Castiglione del Lago - Passignano)
      [12.60, 43.35], // Dorsale Appenninica / Gubbio
      [13.51, 43.61], // Ancona / Monte Conero (Adriatico)
    ],
    keyForts: [
      { name: 'Sbarramento del Lago Trasimeno', coords: [12.13, 43.15], desc: 'Posizioni d\'arresto del XIV. Panzerkorps che inchiodarono la British 8th Army e la 6th South African Armoured Division.' },
      { name: 'Caposaldo di Chiusi', coords: [11.94, 43.01], desc: 'Baluardo collinare difeso con estremo accanimento dal 1. Fallschirmjäger-Regiment contro gli Alleati.' },
      { name: 'Piazzaforte Costiera di Ancona', coords: [13.51, 43.61], desc: 'Ancoraggio adriatico e porto strategico minato dalla Wehrmacht a sbarramento del 2° Corpo d\'Armata Polacco del gen. Władysław Anders.' },
    ],
    activeSteps: [14],
  },
  {
    id: 'vkt_line_finland_1944',
    name: 'Linea VKT (Viipuri–Kuparsaari–Taipale)',
    nation: 'Finlandia',
    builder: 'Maresciallo Carl Gustaf Emil Mannerheim / Suomen maavoimat',
    description:
      'Linea difensiva principale allestita dall\'esercito finlandese sull\'istmo di Carelia dopo la rottura delle linee anteriori e la perdita di Viipuri (20 giugno 1944). Si snoda dalla baia di Viipuri attraverso Kuparsaari lungo il sistema fluviale del Vuoksi fino a Taipale sul Lago Ladoga, teatro della decisiva battaglia difensiva di Tali-Ihantala.',
    type: 'field',
    color: '#4c6a9c',
    coordinates: [
      [28.75, 60.71], // Viipuri (Vyborg)
      [29.25, 60.65], // Kuparsaari
      [29.80, 60.60], // Fiume Vuoksi (Vuosalmi)
      [30.50, 60.62], // Taipale / Lago Ladoga
    ],
    keyForts: [
      { name: 'Sbarramento di Ihantala', coords: [28.84, 60.79], desc: 'Settore a nord di Viipuri dove la massiccia concentrazione dell\'artiglieria finlandese fermò le divisioni corazzate sovietiche nella battaglia di Tali-Ihantala.' },
      { name: 'Testa di Ponte di Vuosalmi', coords: [29.80, 60.60], desc: 'Tratto conteso del fiume Vuoksi difeso dalla 2ª Divisione finlandese e dalla divisione corazzata del generale Ruben Lagus.' },
    ],
    activeSteps: [14],
  },
  {
    id: 'gothic_line_1944',
    name: 'Linea Gotica (Gotenstellung / Linea Verde)',
    nation: 'Germania (Wehrmacht) / RSI',
    builder: 'Generalfeldmarschall Albert Kesselring / Organizzazione Todt',
    description:
      'Ultima colossale linea difensiva campale e permanente allestita dalla Wehrmacht in Italia, estesa per oltre 300 km lungo la dorsale dell\'Appennino tosco-emiliano dal Mar Tirreno (Massa, Carrara, Montignoso) attraverso le Alpi Apuane, la Garfagnana, il Passo della Futa e l\'Appennino romagnolo fino a Pesaro e Rimini sull\'Adriatico. Fortificata dall\'Organizzazione Todt con migliaia di bunker in calcestruzzo, torrette di carro armato Panther interrate (Panzerturm), trincee coperte e reticolati anticarro; teatro dell\'offensiva alleata Operazione Olive a fine agosto 1944.',
    type: 'heavy',
    color: '#8b8f94',
    coordinates: [
      [10.14, 44.04], // Foce del Cinquale / Massa (Tirreno)
      [10.40, 44.15], // Castelnuovo di Garfagnana / Alpi Apuane
      [11.00, 44.05], // San Marcello Pistoiese / Porretta Terme
      [11.27, 44.09], // Passo della Futa / Giogo di Scarperia (Statale 65)
      [11.60, 44.18], // Firenzuola / Valle del Santerno
      [12.00, 43.95], // Passo dei Mandrioli / Bagno di Romagna
      [12.60, 43.85], // Valle del Foglia / Montecchio
      [12.91, 43.91], // Pesaro / Foglia (Adriatico)
    ],
    keyForts: [
      { name: 'Panzerturm della Valle del Foglia', coords: [12.60, 43.85], desc: 'Torrette corazzate di carro Panther interrate in casematte di cemento armato a sbarramento della valle del Foglia verso Pesaro.' },
      { name: 'Complesso Fortificato del Passo della Futa', coords: [11.27, 44.09], desc: 'Pilastro centrale della linea a guardia del valico appenninico principale verso Bologna, munito di reticolati, fossati anticarro e nidi di mitragliatrici.' },
      { name: 'Caposaldo Costiero di Pesaro', coords: [12.91, 43.91], desc: 'Terminale adriatico pesantemente minato investito dall\'8ª Armata britannica e dal 2° Corpo Polacco nell\'Operazione Olive.' },
      { name: 'Sbarramento del Cinquale e Alpi Apuane', coords: [10.14, 44.04], desc: 'Baluardo costiero tirrenico e postazioni d\'artiglieria scavate nelle vette di marmo apuane a difesa di Massa e Carrara.' },
    ],
    activeSteps: [14, 15, 16],
  },
  {
    id: 'shuri_line_okinawa_1945',
    name: 'Linea Shuri (Okinawa — Baluardo della 32ª Armata Giapponese)',
    nation: 'Giappone (Dai Nippon Teikoku / 32ª Armata IJA)',
    builder: 'Ten. Gen. Mitsuru Ushijima / Ten. Gen. Isamu Chō / Col. Hiromichi Yahara',
    description:
      'Formidabile sistema fortificato sotterraneo e montano scavato nel calcare corallino del sud di Okinawa, imperniato sul Castello di Shuri e sui crinali di Kakazu, Sugar Loaf e Conical Hill. Dotato di chilometri di gallerie sotterranee, bunker in cemento armato collegati e casematte d\'artiglieria scavate in roccia viva capaci di resistere ai bombardamenti aeronavali americani.',
    type: 'heavy',
    color: '#b03030',
    coordinates: [
      [127.67, 26.26], // Machinato / Kakazu Ridge
      [127.71, 26.24], // Sugar Loaf / Naha nord
      [127.73, 26.22], // Shuri Castle (Quartier Generale)
      [127.76, 26.21], // Conical Hill / Yonabaru (Baia di Nakagusuku)
    ],
    keyForts: [
      { name: 'Complesso Ipogeo del Castello di Shuri', coords: [127.73, 26.22], desc: 'Quartier generale sotterraneo della 32ª Armata scavato a decine di metri sotto le antiche mura del castello reale delle Ryūkyū.' },
      { name: 'Crinale di Kakazu (Kakazu Ridge)', coords: [127.67, 26.26], desc: 'Bastione roccioso avanzato a nido d\'aquila dove i difensori giapponesi respinsero ripetuti assalti della 96ª Divisione di Fanteria USA con un massiccio volume di fuoco di mortai pesanti.' },
      { name: 'Collina Sugar Loaf', coords: [127.71, 26.24], desc: 'Poggio isolato difeso da postazioni incrociate di mitragliatrici che cambiò mano oltre dieci volte durante l\'assalto della 6ª Divisione Marines.' },
    ],
    activeSteps: [17],
  },
  {
    id: 'berlin_defense_ring_1945',
    name: 'Perimetro Difensivo di Berlino (Verteidigungsbereich Berlin)',
    nation: 'Germania (Wehrmacht / Waffen-SS / Volkssturm)',
    builder: 'Generale Helmuth Weidling / Gauleiter Joseph Goebbels / Organizzazione Todt',
    description:
      'Cintura difensiva concentrica allestita attorno alla capitale del Reich, articolata sull\'anello esterno dei laghi e canali di Havel e Spree, sulla ferrovia circolare urbana (S-Bahn Ring) e sulla cittadella centrale del Settore Z (Regierungsviertel con la Cancelleria del Reich e il Reichstag). Presidiata da reparti regolari, formazioni Waffen-SS straniere (Charlemagne, Nordland), Volkssturm e Hitlerjugend muniti di Panzerfaust e cannoni FlaK da 88 e 128 mm delle gigantesche Torri Flakturm.',
    type: 'heavy',
    color: '#63666a',
    coordinates: [
      [13.25, 52.55], // Spandau / Havel nord
      [13.40, 52.58], // Pankow
      [13.52, 52.52], // Lichtenberg
      [13.45, 52.45], // Tempelhof / Neukölln
      [13.25, 52.48], // Schöneberg / Grunewald
      [13.25, 52.55], // Chiusura anello a Spandau
    ],
    keyForts: [
      { name: 'Flakturm Zoo (Torre Antiaerea del Giardino Zoologico)', coords: [13.33, 52.51], desc: 'Colossale fortezza in cemento armato con 4 torrette binate da 128 mm e rifugi corazzati per 15.000 civili, invulnerabile all\'artiglieria sovietica fino alla resa.' },
      { name: 'Flakturm Humboldthain', coords: [13.38, 52.54], desc: 'Torre FlaK nel nord di Berlino che fornì fuoco d\'appoggio pesante fino agli ultimi giorni della battaglia urbana.' },
      { name: 'Baluardo del Reichstag e Piazza Königsplatz', coords: [13.37, 52.51], desc: 'Edificio storico fortificato a fortezza con finestre murate, trincee anticarro e reticolati, teatro dell\'epico assalto della 150ª Divisione Fucilieri sovietica.' },
      { name: 'Führerbunker della Reichskanzlei', coords: [13.38, 52.51], desc: 'Bunker sotterraneo a due livelli sotto il giardino della Nuova Cancelleria del Reich, ultimo rifugio e luogo del suicidio di Adolf Hitler (30 aprile 1945).' },
    ],
    activeSteps: [17],
  },
  {
    id: 'festung_breslau_perimeter_1945',
    name: 'Cintura Trincerata di Festung Breslau',
    nation: 'Germania (Wehrmacht / Volkssturm)',
    builder: 'Generalleutnant Hermann Niehoff / Gauleiter Karl Hanke',
    description:
      'Perimetro difensivo circolare fortificato attorno alla città di Breslavia (Bassa Slesia), tagliata fuori e assediata dall\'Armata Rossa dal 15 febbraio al 6 maggio 1945. Barricate di macerie, bunker urbani, casematte improvvisate lungo l\'Oder e pista d\'atterraggio d\'emergenza ricavata radendo al suolo la Kaiserstraße.',
    type: 'medium',
    color: '#808080',
    coordinates: [
      [16.95, 51.15],
      [17.10, 51.15],
      [17.12, 51.05],
      [16.95, 51.05],
      [16.95, 51.15],
    ],
    keyForts: [
      { name: 'Pista Aerea Corazzata della Kaiserstraße', coords: [17.06, 51.11], desc: 'Striscia d\'atterraggio d\'emergenza di 1 km ricavata dai genieri demolendo a colpi di dinamite centinaia di palazzi storici sotto il fuoco d\'artiglieria sovietico.' },
      { name: 'Capisaldi della Festungsfront Oder', coords: [17.03, 51.11], desc: 'Nidi di mitragliatrici pesanti e postazioni anticarro allestiti sui ponti e lungo le sponde del fiume Oder a sbarramento delle colonne corazzate sovietiche.' },
    ],
    activeSteps: [17],
  },
  {
    id: 'oder_neisse_line_1945',
    name: 'Linea Oder-Neisse (Confine Tedesco-Polacco post-Potsdam)',
    nation: 'Polonia / Repubblica di Polonia & Consiglio di Controllo Alleato',
    builder: 'Conferenza di Potsdam (Accordi di Truman, Stalin e Attlee — Agosto 1945)',
    description:
      'Nuova frontiera di demarcazione tra Germania occupata e Polonia stabilita alla Conferenza di Potsdam: corre lungo i fiumi Oder e Neisse Lusaziano dal Mar Baltico a nord di Stettino fino al confine cecoslovacco. Tutti i territori a est (Pomerania orientale, Slesia e Brandeburgo orientale) passano sotto amministrazione civile polacca.',
    type: 'heavy',
    color: '#d44242',
    coordinates: [
      [14.28, 53.92],
      [14.43, 53.55],
      [14.38, 53.02],
      [14.24, 52.85],
      [14.45, 52.62],
      [14.61, 52.33],
      [14.73, 52.05],
      [14.71, 51.75],
      [14.98, 51.52],
      [15.02, 51.15],
      [14.82, 50.88],
    ],
    keyForts: [
      { name: 'Snodo di Świnoujście / Usedom', coords: [14.28, 53.92], desc: 'Sbocco marittimo fortificato sul Baltico e laguna di Stettino presidiato dalla guardia di frontiera polacca.' },
      { name: 'Confluenza Oder-Neisse a Ratzdorf', coords: [14.73, 52.05], desc: "Punto nevralgico di confluenza tra l'Oder e la Neisse Lusaziana a delimitazione della zona di occupazione sovietica e dei territori polacchi." },
      { name: 'Triplice Frontiera di Zittau', coords: [14.82, 50.88], desc: "Caposaldo meridionale della linea di confine all'intersezione tra Germania, Polonia e Cecoslovacchia." },
    ],
    activeSteps: [18, 19],
  },
  {
    id: 'morgan_line_1945',
    name: 'Linea Morgan (Demarcazione della Venezia Giulia — Duino 9 Giugno 1945)',
    nation: 'Governo Militare Alleato (AMG) & Jugoslavia (VUJA)',
    builder: 'Ten. Gen. Sir William Morgan & Magg. Gen. Vladimir Stojković',
    description:
      'Linea di demarcazione provvisoria concordata a Duino il 9 giugno 1945: separa la Zona A sotto amministrazione militare anglo-americana (AMG: Trieste, fascia costiera fino a Duino, Monfalcone, Gorizia e l\'enclave di Pola) dalla Zona B sotto amministrazione militare dell\'Esercito Jugoslavo (VUJA: Capodistria, Buie, Istria interna e Carsica).',
    type: 'medium',
    color: '#0088cc',
    coordinates: [
      [13.60, 45.77],
      [13.68, 45.72],
      [13.82, 45.68],
      [13.88, 45.63],
      [13.85, 45.58],
      [13.72, 45.57],
    ],
    keyForts: [
      { name: 'Posto di Blocco di San Giovanni di Duino', coords: [13.60, 45.77], desc: 'Varco di confine e controllo congiunto della polizia militare alleata lungo la Strada Statale 14 costiera.' },
      { name: 'Check-Point di Opicina / Villa Opicina', coords: [13.82, 45.68], desc: 'Presidio anglo-americano e jugoslavo lungo la ferrovia Transalpina e le alture sovrastanti la città di Trieste.' },
    ],
    activeSteps: [18],
  },
  {
    id: 'ftt_trieste_line_1947',
    name: 'Confine del Territorio Libero di Trieste (Zona A / Zona B — 15 Settembre 1947)',
    nation: 'AMG FTT (Zona A) & VUJA (Zona B)',
    builder: 'Trattato di Pace di Parigi del 10 Febbraio 1947 (In vigore 15 Settembre 1947)',
    description:
      'Linea di demarcazione definitiva tra la Zona A anglo-americana (Trieste, Duino, Muggia) e la Zona B jugoslava (Capodistria, Pirano, Umago, Buie) all\'entrata in vigore dello Statuto Permanente del Territorio Libero di Trieste, con evacuazione britannica da Pola e cessione dell\'Istria interna e di Gorizia orientale alla Jugoslavia.',
    type: 'medium',
    color: '#00a3cc',
    coordinates: [
      [13.60, 45.77],
      [13.81, 45.67],
      [13.86, 45.61],
      [13.79, 45.56],
      [13.66, 45.55],
    ],
    keyForts: [
      { name: 'Valico di Rabuiese / Škofije', coords: [13.81, 45.58], desc: 'Posto di frontiera tra Zona A anglo-americana (Muggia) e Zona B jugoslava (Capodistria).' },
      { name: 'Presidio di Duino / San Giovanni', coords: [13.60, 45.77], desc: 'Confine occidentale del TLT con la Repubblica Italiana.' },
    ],
    activeSteps: [19],
  },
  {
    id: 'korea_38th_parallel_1945',
    name: '38° Parallelo Nord (Linea di Demarcazione Sovietico-Americana in Corea)',
    nation: 'Unione Sovietica (25ª Armata) / Stati Uniti (USAMGIK)',
    builder: 'Accordi di Yalta e Potsdam / Generale John R. Hodge & Generale Ivan Čistjakov',
    description:
      "Linea di demarcazione orizzontale lungo il 38° parallelo stabilita nell'agosto 1945 e irrigidita nel 1947: assegna la penisola coreana a nord del parallelo alla zona sovietica (Pyongyang) e a sud al Governo Militare Statunitense (USAMGIK — Seul).",
    type: 'heavy',
    color: '#e67e22',
    coordinates: [
      [125.3, 38.0],
      [126.0, 38.0],
      [126.7, 38.0],
      [127.4, 38.0],
      [128.1, 38.0],
      [128.8, 38.0],
    ],
    keyForts: [
      { name: 'Snodo di Kaesong (Sud 38°)', coords: [126.55, 37.97], desc: "Antica capitale reale coreana situata a sud del 38° parallelo, presidiata dall'US Army." },
      { name: 'Fronte dell\'Imjin / Yeoncheon (Nord 38°)', coords: [127.05, 38.08], desc: "Fascia fluviale fortificata a nord del parallelo pattugliata dai reparti di frontiera dell'Armata Rossa." },
    ],
    activeSteps: [18, 19],
  },
  {
    id: 'van_mook_line_1947',
    name: 'Linea Van Mook (Demarcazione Olandese a Giava & Sumatra — 29 Agosto 1947)',
    nation: 'Regno dei Paesi Bassi (KNIL) vs Repubblica d\'Indonesia (TNI)',
    builder: 'Luogotenente Governatore Generale Hubertus van Mook (Operatie Product)',
    description:
      'Linea di cessate il fuoco proclamata unilateralmente dai Paesi Bassi il 29 agosto 1947 al termine dell\'Operatie Product: congiunge le punte più avanzate raggiunte dalle colonne meccanizzate olandesi, confinando la Repubblica d\'Indonesia a Giava centrale (Yogyakarta/Solo), Banten e alle regioni montane dell\'interno di Sumatra.',
    type: 'field',
    color: '#d9534f',
    coordinates: [
      [106.75, -6.30], // Sud di Batavia/Buitenzorg
      [108.56, -6.72], // Cirebon
      [110.42, -7.02], // Sud di Semarang
      [112.70, -7.30], // Fronte di Surabaya / Mojokerto
      [113.80, -7.90], // Estremità Giava Orientale
    ],
    keyForts: [
      { name: 'Settore Semarang–Ambarawa', coords: [110.42, -7.15], desc: 'Cuneo olandese rivolto verso la capitale repubblicana di Yogyakarta.' },
      { name: 'Sacca Repubblicana di Malang / Giava Est', coords: [112.63, -7.98], desc: 'Linea di arresto dell\'offensiva KNIL davanti al cessate il fuoco imposto dall\'ONU.' },
    ],
    activeSteps: [19],
  },
  {
    id: 'radcliffe_kashmir_line_1947',
    name: 'Linea Radcliffe (Partizione del Raj Britannico nel Punjab — 17 Agosto 1947)',
    nation: 'Dominion dell\'India vs Dominion del Pakistan',
    builder: 'Boundary Commission (Sir Cyril Radcliffe)',
    description:
      'Linea di confine tracciata nell\'agosto 1947 per spartire le province storiche del Punjab e del Bengala tra l\'Unione Indiana e il Dominion del Pakistan, teatro del grande esodo di profughi dell\'agosto-settembre 1947 e corridoio d\'accesso conteso verso il Jammu e Kashmir.',
    type: 'heavy',
    color: '#4ea864',
    coordinates: [
      [75.15, 32.35], // Gurdaspur / Pathankot
      [74.55, 31.60], // Settore Wagah (tra Amritsar e Lahore)
      [74.18, 30.88], // Kasur / Ferozepur
      [73.50, 30.05], // Bahawalpur / Confine del Sutlej
    ],
    keyForts: [
      { name: 'Settore di Wagah (Amritsar–Lahore)', coords: [74.57, 31.60], desc: 'Asse ferroviario e stradale centrale del Punjab diviso nell\'agosto 1947.' },
      { name: 'Corridoio di Gurdaspur–Pathankot', coords: [75.40, 32.15], desc: 'Unico collegamento terrestre assegnato all\'India verso il principato di Jammu e Kashmir.' },
    ],
    activeSteps: [19],
  },
  {
    id: 'dekemvriana_athens_perimeter_1944',
    name: 'Perimetro dei Dekemvriana (Battaglia di Atene — Scobie vs ELAS, Dicembre 1944)',
    nation: 'Regno di Grecia & Forze Britanniche (Arkforce / Gen. Scobie) vs EAM-ELAS',
    builder: 'Lt-Gen. Ronald Scobie & Comando Supremo ELAS',
    description:
      'Linea del fronte urbano durante i 37 giorni della battaglia di Atene (Dekemvriana, 3 dicembre 1944 – 11 gennaio 1945): le truppe britanniche e la Guardia Nazionale greca mantengono un ristretto perimetro dal centro di Syntagma fino al Pireo e al Falero accerchiato dall\'ELAS.',
    type: 'field',
    color: '#d9534f',
    coordinates: [
      [23.62, 37.94], // Pireo
      [23.70, 37.97], // Falero / Makriyannis
      [23.74, 37.98], // Syntagma / Acropoli
      [23.81, 38.06], // Kifisia / Monte Penteli
    ],
    keyForts: [
      { name: 'Piazza Syntagma & Quartier Generale Scobie', coords: [23.735, 37.975], desc: 'Fulcro difensivo britannico e del governo Papandreou nel cuore di Atene durante i combattimenti strada per strada.' },
      { name: 'Corridoio Portuale Pireo–Falero', coords: [23.65, 37.94], desc: 'Unica arteria di afflusso dei rinforzi britannici inviati da Churchill dal fronte italiano.' },
    ],
    activeSteps: [16],
  },
  {
    id: 'grammos_vitsi_civil_war_front_1947',
    name: 'Fronte Montano Grammos–Vitsi & Pindo (Guerra Civile Greca — Settembre 1947)',
    nation: 'Esercito Democratico di Grecia (DSE) vs Esercito Nazionale Ellenico & AMAG USA',
    builder: 'Markos Vafiadis (DSE) / Comando Militare Ellenico & Dottrina Truman',
    description:
      'Principale fascia fortificata alpina dei bastioni di "Grecia Libera" difesi dall\'Esercito Democratico di Grecia (DSE) lungo i massicci del Monte Grammos, dei Monti Vitsi e del Pindo settentrionale tra i laghi Prespa, Kastoria, Florina e il settore di Konitsa.',
    type: 'field',
    color: '#c9302c',
    coordinates: [
      [20.75, 40.06], // Konitsa / Pindo
      [20.84, 40.35], // Massiccio del Monte Grammos
      [21.08, 40.58], // Passo verso Kastoria
      [21.25, 40.76], // Monti Vitsi (Vernon)
      [21.05, 40.88], // Bacino di Prespa (confine Jugoslavia/Albania)
    ],
    keyForts: [
      { name: 'Monte Grammos — QG Markos Vafiadis (2.520 m)', coords: [20.84, 40.35], desc: 'Roccaforte alpina principale e centro logistico-sanitario del DSE lungo la frontiera albanese.' },
      { name: 'Monti Vitsi & Passo di Florina', coords: [21.25, 40.76], desc: 'Bastione fortificato settentrionale protetto dai laghi Prespa e dalle linee di rifornimento jugoslave.' },
      { name: 'Sbarramento Governativo di Konitsa', coords: [20.75, 40.05], desc: 'Capisaldo avanzato dell\'Esercito Nazionale in Epiro a guardia dell\'ingresso verso Ioannina.' },
    ],
    activeSteps: [19],
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
    id: 'fort_de_france_base',
    name: 'Fort-de-France (Fort Desaix & Fort Saint-Louis)',
    historicalName: 'Base Navale di Fort-de-France (Martinica) — Riserve Auree della Banque de France',
    nation: 'Francia',
    coords: [-61.07, 14.60],
    type: 'fleet_hq',
    theater: 'Atlantic',
    description: 'Rada fortificata e base strategica della Marine Nationale nei Caraibi. Nel giugno 1940 accoglie le 286 tonnellate d\'oro della Banca di Francia (trasportate dall\'incrociatore rapido Émile Bertin) e la portaerei Béarn con oltre 106 caccia americani, rimanendo immobilizzata sotto sorveglianza U.S. Navy fino al ralliement al CFLN del 14 luglio 1943.',
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
  {
    id: 'ryojun_naval',
    name: 'Port Arthur (Ryojun Keibifu)',
    historicalName: 'Distretto Navale di Guardia di Ryojun (Port Arthur — Kwantung)',
    nation: 'Giappone',
    coords: [121.24, 38.80],
    type: 'major_base',
    theater: 'Pacific',
    description: 'Roccaforte navale e bacino di carenaggio strategico all\'estremità meridionale della penisola di Liaodong, quartier generale del Distretto Navale di Guardia (Ryojun Keibifu) a protezione del Mar Giallo e del Golfo di Bohai.',
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

  // ================= TEATRO PACIFICO ED ESTREMO ORIENTE =================
  {
    id: 'hong_kong_naval',
    name: 'Hong Kong (HMS Tamar)',
    historicalName: 'HMS Tamar / Hong Kong Royal Naval Station',
    nation: 'Regno Unito',
    coords: [114.16, 22.28],
    type: 'fleet_hq',
    theater: 'Pacific',
    description: 'Base storica della China Station della Royal Navy con bacini di carenaggio, batterie d\'artiglieria costiera e quartier generale delle forze navali britanniche nel Mar Cinese Meridionale.',
  },
  {
    id: 'guam_naval',
    name: 'Guam (Apra Harbor)',
    historicalName: 'Naval Station Guam (Apra Harbor)',
    nation: 'USA',
    coords: [144.65, 13.44],
    type: 'major_base',
    theater: 'Pacific',
    description: 'Avamposto aeronavale strategico della US Navy nelle Isole Marianne, punto di scalo per idrovolanti e stazioni radio transpacifiche.',
  },
  {
    id: 'cavite_manila',
    name: 'Manila / Cavite',
    historicalName: 'Cavite Navy Yard & Corregidor (Manila Bay)',
    nation: 'USA / Filippine',
    coords: [120.91, 14.49],
    type: 'fleet_hq',
    theater: 'Pacific',
    description: 'Principale arsenale e base operativa della US Asiatic Fleet nella Baia di Manila a protezione delle Filippine, sostenuto dalla formidabile fortezza insulare di Corregidor.',
  },
  {
    id: 'base_beta_galapagos',
    name: 'Base Beta (Galápagos / Baltra)',
    historicalName: 'U.S. Army Air Forces / USN — Base Beta (Seymour Army Airfield / Baltra Island)',
    nation: 'USA / Ecuador',
    coords: [-90.28, -0.45],
    type: 'major_base',
    theater: 'Pacific',
    description: 'Base aeronavale strategica statunitense istituita sull\'isola di Baltra (Ecuador) nel 1942 per la protezione dell\'accesso occidentale al Canale di Panama contro incursioni sottomarine e aeronavali dell\'Asse nel Pacifico.',
  },
  {
    id: 'hvalfjordur_base',
    name: 'Hvalfjörður (Base Falcon / Cacapon)',
    historicalName: 'Base Navale di Hvalfjörður (Base Falcon / NOB Cacapon — Islanda)',
    nation: 'Islanda / UK / USA',
    coords: [-21.65, 64.33],
    type: 'fleet_hq',
    theater: 'Atlantic',
    description: 'Profondo fiordo protetto a nord di Reykjavík, convertito nel maggio 1940 nella base navale "Falcon" della Royal Navy e nel luglio 1941 nel Naval Operating Base "Cacapon" dell\'US Navy (Task Force 24). Punto di raduno e rifornimento per i convogli artici (serie PQ/QP verso Murmansk) e bastione della caccia agli U-Boot nel GIUK gap.',
    getDynamicStatus: (step: number) => {
      if (step <= 5) {
        return {
          nation: 'Islanda (Neutrale)',
          historicalName: 'Hvalfjörður — Fiordo Naturale del Regno d\'Islanda (Smilitarizzato)',
          theater: 'Atlantic',
          description: 'Fiordo naturale disarmato del Regno neutrale d\'Islanda sotto re Cristiano X.',
          fillColor: '#b3c7d6',
          strokeColor: '#3a4450',
        };
      }
      if (step <= 8) {
        return {
          nation: 'Regno Unito (Royal Navy Base Falcon)',
          historicalName: 'Royal Navy Base Falcon (Hvalfjörður — Base Navale Convogli)',
          theater: 'Atlantic',
          description: 'Base navale fortificata britannica con reti parasiluri, rifornimento carburante e stazione di scorta convogli per l\'Atlantico del Nord.',
          fillColor: '#8a4b38',
          strokeColor: '#ffbb88',
        };
      }
      if (step >= 18) {
        return {
          nation: 'Islanda (Ex Base Falcon / Cacapon — Smilitarizzata)',
          historicalName: 'Hvalfjörður — Base Navale Smantellata & Restituita alla Repubblica d\'Islanda',
          theater: 'Atlantic',
          description: 'Con la fine della Seconda Guerra Mondiale (1945) e l\'Accordo di Keflavík (1946–1947), l\'ancoraggio della Task Force 24 e della Base Cacapon viene smantellato; i moli e il fiordo tornano all\'uso civile pacifico sotto sovranità islandese.',
          fillColor: '#b3c7d6',
          strokeColor: '#3a4450',
        };
      }
      return {
        nation: 'Stati Uniti (US Navy Task Force 24 / NOB Cacapon)',
        historicalName: 'United States Naval Operating Base Cacapon (Task Force 24 — Hvalfjörður)',
        theater: 'Atlantic',
        description: 'Principale ancoraggio navale dell\'US Navy e della Royal Navy per la protezione dei convogli atlantici e l\'assemblaggio dei convogli artici per la Russia (PQ/QP).',
        fillColor: '#2b4c7e',
        strokeColor: '#88bbff',
      };
    },
  },
];

export function getDynamicNavalBaseStatus(base: NavalBase, step: number): DynamicBaseStatus {
  let nation = base.nation;
  let historicalName = base.historicalName;
  let description = base.description;
  let theater = base.theater;
  let fillColor = '#102434';
  let strokeColor = '#5aa0c2';

  switch (base.id) {
    case 'brest':
      if (step >= 18) {
        nation = 'Francia (Marine Nationale — Arsenale Restaurato)';
        historicalName = 'Arsenale Navale di Brest (Quatrième République / GPRF)';
        strokeColor = '#3a82c4';
        fillColor = '#152438';
        description = 'Dopo la ricostruzione degli impianti portuali distrutti nell\'assedio del 1944, l\'arsenale militare di Brest torna a ospitare le squadre atlantiche della Marine Nationale.';
      } else if (step >= 15) {
        nation = 'Francia / Alleati (U.S. VIII Corps)';
        historicalName = 'Arsenale Navale di Brest (Liberata il 19 Settembre 1944 — U.S. VIII Corps)';
        strokeColor = '#3a82c4';
        fillColor = '#152438';
        description = 'Dopo un duro assedio urbano condotto dal generale Middleton con tre divisioni di fanteria e il gruppo speciale di Rangers, il 19 settembre 1944 il generale Hermann-Bernhard Ramcke capitola. I genieri alleati riabilitano la base navale a supporto della logistica alleata in Europa occidentale.';
      } else if (step >= 6) {
        nation = 'Germania (Kriegsmarine)';
        historicalName = 'Kriegsmarine U-Boot-Stützpunkt Brest';
        strokeColor = '#8b8f94';
        fillColor = '#251b1b';
        description = 'Occupata dalla Wehrmacht il 19 giugno 1940; trasformata nella principale base atlantica della 1ª e 9ª Flottiglia U-Boot con imponenti bunker corazzati (U-Boot-Bunker) e rifugio per le navi da battaglia Scharnhorst, Gneisenau e Prinz Eugen.';
      }
      break;

    case 'lorient':
      if (step >= 18) {
        nation = 'Francia (Marine Nationale — Resa Sacca 10 Maggio 1945)';
        historicalName = 'Arsenale & Base di Lorient-Keroman (Liberata — 10 Maggio 1945)';
        strokeColor = '#3a82c4';
        fillColor = '#152438';
        description = 'Il 10 maggio 1945 la guarnigione tedesca della Festung Lorient (Gen. Fahrmbacher) si arrende alle truppe franco-americane; i bunker di Keroman passano alla Marine Nationale francese (Base Ingénieur Général Stocker).';
      } else if (step >= 6) {
        nation = 'Germania (Kriegsmarine)';
        historicalName = 'Kriegsmarine U-Boot-Stützpunkt Keroman (Lorient)';
        strokeColor = '#8b8f94';
        fillColor = '#251b1b';
        description = 'Occupata nel giugno 1940; sede del comando supremo dei sommergibili (BdU) dell\'ammiraglio Karl Dönitz e del colossale complesso di bunker sottomarini Keroman I, II e III.';
      }
      break;

    case 'cherbourg':
      if (step >= 18) {
        nation = 'Francia (Marine Nationale — Arsenale della Manica)';
        historicalName = 'Port Militaire de Cherbourg (Marine Nationale — Dopoguerra)';
        strokeColor = '#3a82c4';
        fillColor = '#152438';
        description = 'Restituito all\'amministrazione marittima francese dopo la fase logistica alleata (SHAEF/ETOUSA), l\'arsenale militare di Cherbourg riprende il presidio della Manica.';
      } else if (step >= 14) {
        nation = 'Stati Uniti / Alleati (1ª Armata USA)';
        historicalName = 'Cherbourg Naval Base (Liberata il 27 Giugno 1944 — First U.S. Army)';
        strokeColor = '#3a82c4';
        fillColor = '#152438';
        description = 'Il 27 giugno 1944, dopo aspri combattimenti casa per casa e l\'espugnazione dei forti costieri, la 1ª Armata USA del generale Omar Bradley ottiene la resa della Festung Cherbourg e del generale Karl-Wilhelm von Schlieben. Il porto d\'acque profonde viene rapidamente ripristinato dai genieri alleati per rifornire la testa di ponte e l\'avanzata in Francia.';
      } else if (step >= 6) {
        nation = 'Germania (Kriegsmarine)';
        historicalName = 'Seeverteidigung Cherbourg (Kriegsmarine)';
        strokeColor = '#8b8f94';
        fillColor = '#251b1b';
        description = 'Base navale della Manica occupata dalla Kriegsmarine; scalo per flottiglie di motosiluranti d\'assalto (S-Boot) e pesanti batterie costiere d\'interdizione marittima.';
      }
      break;

    case 'toulon':
      if (step >= 18) {
        nation = 'Francia (Marine Nationale — Escadre de la Méditerranée)';
        historicalName = 'Grand Arsenal de Toulon (Marine Nationale — Quatrième République)';
        strokeColor = '#1d5bc4';
        fillColor = '#0b2866';
        description = 'Principale base navale mediterranea della Marine Nationale nel dopoguerra, sede dei lavori di recupero e bonifica della rada dopo l\'autoaffondamento del 1942.';
      } else if (step >= 15) {
        nation = 'Francia / Alleati (1ère Armée Française)';
        historicalName = 'Grand Arsenal de Toulon (Liberazione della Provenza — 26-28 Agosto 1944)';
        strokeColor = '#1d5bc4';
        fillColor = '#0b2866';
        description = 'A seguito dello sbarco dell\'Operazione Dragoon, il 26-28 agosto 1944 la 1ère Armée française del generale Jean de Lattre de Tassigny (3ª Divisione di Fanteria Algerina e 1ª Divisione Corazzata) espugna Tolone catturando la guarnigione tedesca dell\'Ammiraglio Heinrich Ruhfus. La rada e i bacini dell\'arsenale tornano alla Marine Nationale della Francia Libera, fungendo da primario hub logistico per le operazioni alleate nel Mediterraneo.';
      } else if (step >= 11) {
        nation = 'Francia (Flotta Autoaffondata) / Occupazione Asse';
        historicalName = 'Arsenale di Tolone (Autoaffondamento della Flotta Francese — 27 Novembre 1942)';
        strokeColor = '#505357';
        fillColor = '#1c1e20';
        description = 'A seguito dell\'invasione tedesca della Zona libera (Operazione Anton) e dell\'assalto dei panzer del Kampfgruppe von Broich all\'arsenale (Operazione Lila), la Marine Nationale autoaffonda nel porto 77 unità da guerra (3 corazzate, 7 incrociatori, 32 cacciatorpediniere e 16 sommergibili) per impedirne la cattura da parte dell\'Asse.';
      } else if (step >= 6) {
        nation = 'Francia di Vichy';
        historicalName = 'Arsenale Navale di Tolone (Forces de Haute Mer — Vichy)';
        strokeColor = '#8d77a3';
        fillColor = '#241a29';
        description = 'Cuore della flotta d\'alto mare della Francia di Vichy nell\'armistizio; sede delle maggiori unità da battaglia (Strasbourg, Dunkerque, Algérie) nella Zona Libera.';
      }
      break;

    case 'mers_el_kebir':
      if (step >= 11) {
        nation = 'Francia / Alleati (Operazione Torch)';
        historicalName = 'Base Navale di Mers-el-Kébir (Controllo Alleato / Torch)';
        strokeColor = '#3a82c4';
        fillColor = '#152438';
        description = 'Dopo lo sbarco alleato a Orano (Operazione Torch) e il cessate il fuoco dell\'ammiraglio Darlan, la grande rada e base navale passa al servizio delle operazioni congiunte alleate nel Mediterraneo.';
      } else if (step >= 6) {
        nation = 'Francia di Vichy';
        historicalName = 'Base Navale di Mers-el-Kébir (Vichy / Op. Catapult)';
        strokeColor = '#8d77a3';
        fillColor = '#241a29';
        description = 'Base algerina della Marine Nationale rimasta sotto Vichy; teatro del drammatico attacco della Force H britannica il 3 luglio 1940 per impedire la consegna delle corazzate francesi all\'Asse.';
      }
      break;

    case 'bizerte':
      if (step >= 12) {
        nation = 'Francia / Alleati (Marine Nationale & Royal Navy)';
        historicalName = 'Piazzaforte Navale di Biserta (Liberata dagli Alleati — Maggio 1943)';
        strokeColor = '#3a82c4';
        fillColor = '#152438';
        description = 'Il 7 maggio 1943 le truppe del II Corpo d\'Armata USA entrano a Biserta; la base navale e l\'arsenale del lago interno tornano sotto bandiera alleata e vengono impiegati per allestire l\'Operazione Husky in Sicilia.';
      } else if (step >= 11) {
        nation = 'Germania / Asse (Kriegsmarine & Regia Marina)';
        historicalName = 'Piazzaforte Navale di Biserta (Testa di Ponte dell\'Asse in Tunisia)';
        strokeColor = '#8b8f94';
        fillColor = '#251b1b';
        description = 'Occupata fulmineamente a metà novembre 1942 dalle truppe italo-tedesche del generalleutnant Walther Nehring per costituire la testa di ponte navale e aerea dell\'Asse a protezione del Canale di Sicilia contro l\'avanzata alleata dall\'Algeria.';
      } else if (step >= 6) {
        nation = 'Francia di Vichy';
        strokeColor = '#8d77a3';
        fillColor = '#241a29';
        description = 'Piazzaforte navale e lago interno fortificato tunisino sotto l\'amministrazione di Vichy a controllo del Canale di Sicilia.';
      }
      break;

    case 'dakar_naval':
      if (step >= 11) {
        nation = 'Francia / Alleati (Accordo Boisson-Darlan)';
        historicalName = 'Base Navale di Dakar (Ralliement agli Alleati — 23 Novembre 1942)';
        strokeColor = '#3a82c4';
        fillColor = '#152438';
        description = 'Il 23 novembre 1942 il Governatore Boisson schiera l\'AOF con gli Alleati; la base atlantica di Dakar e la corazzata Richelieu vengono messe a disposizione delle rotte navali alleate.';
      } else if (step >= 6) {
        nation = 'Francia di Vichy';
        historicalName = 'Base Navale di Dakar (AOF — Vichy)';
        strokeColor = '#8d77a3';
        fillColor = '#241a29';
        description = 'Roccaforte di Vichy nell\'Africa Occidentale Francese con la corazzata Richelieu; respinse vittoriosamente il tentativo di sbarco anglo-gollista nel settembre 1940 (Operazione Menace).';
      }
      break;

    case 'fort_de_france_base':
      if (step >= 12) {
        nation = 'Francia / Alleati (CFLN — Henri Hoppenot)';
        historicalName = 'Base Navale di Fort-de-France (Ralliement CFLN — 14 Luglio 1943)';
        strokeColor = '#3a82c4';
        fillColor = '#152438';
        description = 'Il 14 luglio 1943 (Presa della Bastiglia), a seguito dell\'ammutinamento a Fort Desaix e dell\'accordo mediato con gli USA, l\'ammiraglio Robert rassegna i poteri a Henri Hoppenot (CFLN). Le 286 tonnellate d\'oro della Banca di Francia vengono sbloccate per lo sforzo bellico e la flotta (portaerei Béarn, incrociatore Émile Bertin) viene riarmata negli arsenali statunitensi per gli Alleati.';
      } else if (step >= 6) {
        nation = 'Francia di Vichy (Ammiraglio Georges Robert)';
        historicalName = 'Base Navale di Fort-de-France (Vichy — Custodia Oro Banque de France)';
        strokeColor = '#8d77a3';
        fillColor = '#241a29';
        description = 'Quartier generale dell\'Alto Commissario Georges Robert fedele a Vichy. La portaerei Béarn (con 106 aerei da combattimento americani), l\'incrociatore rapido Émile Bertin, l\'incrociatore Jeanne d\'Arc e 286 tonnellate d\'oro della Banque de France sono immobilizzati a Fort Desaix e sorvegliati a vista dalla U.S. Navy (Accordi Greenslade-Robert).';
      }
      break;

    case 'gotenhafen':
      if (step >= 17) {
        nation = 'Polonia / URSS (Liberata — 28 Marzo 1945)';
        historicalName = 'Port Wojenny Gdynia (Liberato — 2° Fronte Bielorusso, 28 Marzo 1945)';
        strokeColor = '#ad7e64';
        fillColor = '#241a15';
        description = 'Liberata il 28 marzo 1945 dalle truppe corazzate del 2° Fronte Bielorusso (Maresciallo Konstantin Rokossovskij) a seguito dell\'Offensiva della Pomerania Orientale; il porto militare e i bacini navali tornano sotto l\'autorità della Repubblica di Polonia e della Marynarka Wojenna.';
      } else if (step < 5) {
        nation = 'Polonia';
        historicalName = 'Port Wojenny Gdynia (Marynarka Wojenna)';
        strokeColor = '#d97736';
        fillColor = '#291810';
        description = 'Principale base navale e porto militare della Polonia sul Mar Baltico; base del cacciatorpediniere Wicher e del posamine Gryf fino all\'invasione del settembre 1939.';
      } else {
        nation = 'Germania (Kriegsmarine)';
        historicalName = 'Kriegsmarine-Hauptstützpunkt Gotenhafen (Ostsee)';
        strokeColor = '#8b8f94';
        fillColor = '#251b1b';
        description = 'Trasformata nel principale ancoraggio, centro addestramento e porto base per la flotta d\'alto mare della Kriegsmarine (Bismarck, Tirpitz, Lützow); capolinea delle evacuazioni di massa dell\'Operazione Hannibal.';
      }
      break;

    case 'pinsk_flotilla':
      if (step >= 15) {
        nation = 'URSS (Flottiglia del Dnepr)';
        historicalName = 'Base Fluviale di Pińsk (Liberata il 14 Luglio 1944 — Dneprovskaya Flotiliya)';
        strokeColor = '#d9534f';
        fillColor = '#291212';
        description = 'Liberata il 14 luglio 1944 durante l\'Operazione Bagration dalla 61ª Armata sovietica e dai battelli d\'assalto della Flottiglia Fluviale del Dnepr, che sbarcano fanti di marina direttamente sulle banchine portuali eliminando il presidio della Wehrmacht.';
      } else if (step >= 9) {
        nation = 'Germania (Wehrmacht)';
        historicalName = 'Pińsk (Flusssicherungsflottille Pripjet — Wehrmacht)';
        strokeColor = '#8b8f94';
        fillColor = '#251b1b';
        description = 'Occupata dalla Wehrmacht nel luglio 1941 dopo l\'autoaffondamento dei battelli della flottiglia fluviale sovietica del Pripjat\'; presidiata dalla Wehrmacht per il pattugliamento anti-guerriglia delle paludi del Polesie.';
      } else if (step >= 5) {
        nation = 'URSS (Pinskaya Voennaya Flotiliya)';
        historicalName = 'Base Fluviale di Pińsk (Flottiglia Sovietica del Pripjat\' — URSS)';
        strokeColor = '#d9534f';
        fillColor = '#291212';
        description = 'Costituita dall\'URSS nel 1939-1940 riarmando i monitori corazzati e i battelli fluviali polacchi catturati dopo l\'occupazione della Polonia orientale.';
      } else {
        nation = 'Polonia';
        strokeColor = '#d97736';
        fillColor = '#291810';
      }
      break;

    case 'constanta_naval_base':
      if (step >= 15) {
        nation = 'Romania / Alleati (Marina Regală Română & Flotta Sovietica)';
        historicalName = 'Baza Navală Constanța (Passaggio agli Alleati — 29-30 Agosto 1944)';
        strokeColor = '#d9534f';
        fillColor = '#291212';
        description = 'A seguito del colpo di stato di Re Michele I del 23 agosto 1944 e dell\'ingresso della Romania nella coalizione alleata contro la Germania nazista, il 29-30 agosto 1944 i marinai della Marina Romena e le avanguardie della Flotta sovietica del Mar Nero prendono possesso della piazzaforte navale di Costanza cacciando la Kriegsmarine.';
      } else if (step >= 7) {
        nation = 'Romania (Asse / Marina Regală Română)';
        historicalName = 'Baza Navală Constanța (Asse — Marina Regală Română & Kriegsmarine)';
        strokeColor = '#c8a846';
        fillColor = '#292212';
        description = 'Principale base navale dell\'Asse sul Mar Nero occidentale; quartier generale della flotta romena e base per la 30ª Flottiglia U-Boot della Kriegsmarine (U-9, U-18, U-24) e motosiluranti italo-tedesche contro il naviglio sovietico.';
      } else {
        nation = 'Romania';
        strokeColor = '#c8a846';
        fillColor = '#292212';
      }
      break;

    case 'hanko':
      if (step < 6) {
        nation = 'Finlandia';
        historicalName = 'Hankoniemen rannikkotykistö (Finlandia)';
        strokeColor = '#86b0d9';
        fillColor = '#102434';
        description = 'Piazzaforte costiera e promontorio fortificato finlandese a sbarramento del Golfo di Finlandia.';
      } else if (step < 9) {
        nation = 'URSS';
        historicalName = 'Voenno-Morskaya Baza Khanko (Affitto Sovietico)';
        strokeColor = '#d9534f';
        fillColor = '#291212';
        description = 'Base navale ottenuta in affitto per 30 anni dall\'URSS col Trattato di pace di Mosca (marzo 1940); difesa da oltre 25.000 marinai sovietici contro l\'assedio finlandese.';
      } else {
        nation = 'Finlandia';
        historicalName = 'Hanko (Riconquistata dalla Finlandia - 2 Dicembre 1941)';
        strokeColor = '#86b0d9';
        fillColor = '#102434';
        description = 'Completamente evacuata dalla Marina Sovietica a fine novembre 1941 ed espugnata dalle truppe finlandesi il 2 dicembre 1941 durante la Guerra di Continuazione.';
      }
      break;

    case 'massawa':
      if (step < 8) {
        nation = 'Italia (Regia Marina)';
        historicalName = 'Base Navale di Massaua (AOI / Mar Rosso)';
        strokeColor = '#6f7a3f';
        fillColor = '#1e2418';
        description = 'Base principale del Comando Navale Africa Orientale Italiana della Regia Marina e della Flottiglia Sommergibili del Mar Rosso.';
      } else {
        nation = 'Regno Unito (Royal Navy)';
        historicalName = 'Massawa Royal Naval Repair Yard (OETA)';
        strokeColor = '#5aa0c2';
        fillColor = '#102434';
        description = 'Caduta in mano alle forze britanniche e del Commonwealth l\'8 aprile 1941 dopo l\'autoaffondamento delle navi italiane; riattivata dagli Alleati per la manutenzione navale nel Mar Rosso.';
      }
      break;

    case 'tobruk_naval':
      if (step < 8) {
        nation = 'Italia (Regia Marina)';
        strokeColor = '#6f7a3f';
        fillColor = '#1e2418';
        description = 'Base navale avanzata della Regia Marina in Nordafrica, protetta dall\'incrociatore San Giorgio impiegato come fortezza galleggiante contraerea.';
      } else if (step < 10) {
        nation = 'Regno Unito / Commonwealth';
        historicalName = 'Piazzaforte Navale di Tobruk (Presidio Alleato)';
        strokeColor = '#5aa0c2';
        fillColor = '#102434';
        description = 'Presa dagli Alleati nel gennaio 1941; presidiata dai leggendari "Topi di Tobruk" (9ª Divisione Australiana e truppe polacche/britanniche) durante 240 giorni d\'assedio italo-tedesco e liberata nel dicembre 1941 (Operazione Crusader).';
      } else if (step === 10) {
        nation = 'Italia / Asse (Panzerarmee Afrika)';
        historicalName = 'Piazzaforte Navale di Tobruk (Espugnata da Rommel — 21 Giugno 1942)';
        strokeColor = '#6f7a3f';
        fillColor = '#1e2418';
        description = 'Espugnata il 21 giugno 1942 dalla Panzerarmee Afrika di Erwin Rommel con la cattura di 33.000 prigionieri alleati e immensi depositi di carburante e viveri; trasformata nella principale base logistica navale avanzata dell\'Asse per l\'offensiva su El Alamein.';
      } else {
        nation = 'Regno Unito / Alleati (British 8th Army)';
        historicalName = 'Piazzaforte Navale di Tobruk (Riconquista Alleata — 13 Novembre 1942)';
        strokeColor = '#5aa0c2';
        fillColor = '#102434';
        description = 'Riconquistata definitivamente il 13 novembre 1942 dall\'8ª Armata britannica del generale Montgomery dopo la disfatta italo-tedesca di El Alamein; riattivata immediatamente come porto logistico di sbarco rifornimenti per l\'inseguimento della Panzerarmee Afrika verso la Tripolitania.';
      }
      break;

    case 'odessa':
      if (step >= 14) {
        nation = 'URSS (Liberata il 10 Aprile 1944)';
        historicalName = 'Porto di Odessa (Città Eroe Liberata dal 3° Fronte Ucraino)';
        strokeColor = '#d9534f';
        fillColor = '#291212';
        description = 'Liberata il 10 aprile 1944 dall\'Armata Rossa (3° Fronte Ucraino del generale Rodion Malinovskij) nell\'ambito dell\'offensiva Dniepr-Carpazi; il Governatorato di Transnistria collassa e il porto strategico viene reintegrato nella Flotta del Mar Nero per le operazioni verso la Romania.';
      } else if (step >= 9) {
        nation = 'Romania / Asse (Governatorato di Transnistria)';
        historicalName = 'Porto di Odessa (Amministrazione Civile-Militare Romena)';
        strokeColor = '#3488aa';
        fillColor = '#12242b';
        description = 'Caduta in mano all\'esercito romeno e tedesco il 16 ottobre 1941 dopo un eroico assedio sovietico di 73 giorni; trasformata nel centro di comando marittimo della Transnistria romena.';
      } else {
        nation = 'URSS';
        strokeColor = '#d9534f';
        fillColor = '#291212';
      }
      break;

    case 'sevastopol':
      if (step >= 14) {
        nation = 'URSS (Liberata il 9 Maggio 1944)';
        historicalName = 'Glavnaya Baza Chernomorskogo Flota — Sevastopol (Città Eroe Liberata)';
        strokeColor = '#d9534f';
        fillColor = '#291212';
        description = 'Il 9 maggio 1944 l\'Armata Rossa (4° Fronte Ucraino del generale Fëdor Tolbuchin e Armata Costiera Indipendente) espugna la fortezza di Sebastopoli dopo aver espugnato il monte Sapun; il 12 maggio le ultime truppe della 17ª Armata tedesca e romena si arrendono a Capo Chersoneso, completando la liberazione della Crimea.';
      } else if (step >= 10) {
        nation = 'Germania / Asse (Kriegsmarine)';
        historicalName = 'Sevastopol\' (Espugnata dall\'11ª Armata di Manstein — 4 Luglio 1942)';
        strokeColor = '#8b8f94';
        fillColor = '#251b1b';
        description = 'Espugnata il 4 luglio 1942 al termine dell\'Operazione Störfang dopo 250 giorni di assedio e il bombardamento dei giganteschi mortai Dora (800 mm) e Karl; presidiata dalla Kriegsmarine e da flottiglie motosiluranti italo-tedesche.';
      } else if (step === 9) {
        nation = 'URSS (Eroica Difesa sotto Assedio)';
        historicalName = 'Fortezza Navale di Sebastopoli (Assedio dell\'11ª Armata di Manstein)';
        strokeColor = '#d9534f';
        fillColor = '#291212';
        description = 'Cinta d\'assedio dalle divisioni tedesche di von Manstein e dalle truppe romene dal 30 ottobre 1941; le fortificazioni Maxim Gorkij I e i marinai della Flotta del Mar Nero resistono strenuamente con rifornimenti via mare.';
      } else {
        nation = 'URSS';
        strokeColor = '#d9534f';
        fillColor = '#291212';
      }
      break;

    case 'singapore':
      if (step >= 19) {
        nation = 'Regno Unito (Crown Colony of Singapore)';
        historicalName = 'HMNB Singapore — Sembawang Royal Navy Base (British Far East Fleet)';
        strokeColor = '#5aa0c2';
        fillColor = '#102434';
        description = 'Principale roccaforte aeronavale britannica nel Sud-Est Asiatico nella Colonia della Corona separata di Singapore (bacini di carenaggio King George VI riattivati nel dopoguerra).';
      } else if (step >= 18) {
        nation = 'Regno Unito / SEAC (Admiral Lord Louis Mountbatten)';
        historicalName = 'HMNB Singapore (Resa Giapponese del 12 Settembre 1945 — SEAC HQ)';
        strokeColor = '#5aa0c2';
        fillColor = '#102434';
        description = 'Liberata nell\'Operazione Zipper / Tiderace: il 12 settembre 1945 il generale Itagaki firma la resa delle armate giapponesi del Sud-Est Asiatico dinanzi all\'Ammiraglio Mountbatten al Municipal Building di Singapore.';
      } else if (step >= 10) {
        nation = 'Giappone (Marina Imperiale)';
        historicalName = 'Shōnan-tō Kaigun Kichi (Ex-HMNB Singapore — Conquistata il 15 Febbraio 1942)';
        strokeColor = '#b33d4a';
        fillColor = '#2b1414';
        description = 'Caduta il 15 febbraio 1942 dopo la travolgente avanzata della 25ª Armata del Ten. Gen. Tomoyuki Yamashita lungo la Malesia; ribattezzata Shōnan-tō ("Luce del Sud") e divenuta il principale arsenale della Flotta di Spedizione Meridionale della Marina Imperiale Giapponese.';
      }
      break;

    case 'diego_suarez':
      if (step >= 6 && step < 10) {
        nation = 'Francia di Vichy';
        historicalName = 'Base Navale di Diego-Suarez (Madagascar — Vichy)';
        strokeColor = '#8d77a3';
        fillColor = '#241a29';
        description = 'Grande rada naturale del Madagascar settentrionale sotto il governatore Vichy Armand Annet, sorvegliata dalla Royal Navy per il timore di un suo utilizzo da parte dei sommergibili giapponesi.';
      } else if (step >= 10) {
        nation = step >= 18 ? 'Francia (Marine Nationale — Madagascar)' : 'Regno Unito (Royal Navy — Op. Ironclad)';
        historicalName = step >= 18
          ? 'Base Navale di Diego-Suarez (Union Française — Madagascar)'
          : 'Diego-Suarez (Occupata dalla Royal Navy — Operazione Ironclad, 5-7 Maggio 1942)';
        strokeColor = '#5aa0c2';
        fillColor = '#102434';
        description = step >= 18
          ? 'Grande porto strategico francese sull\'Oceano Indiano a presidio del Canale del Mozambico nell\'ambito dell\'Unione Francese.'
          : 'Conquistata dalle forze anfibie britanniche (Operazione Ironclad, 5-7 maggio 1942) per negare le basi del Madagascar ai sommergibili della Marina Imperiale Giapponese (che il 30 maggio 1942 vi danneggiarono la corazzata HMS Ramillies con sottomarini tascabili).';
      }
      break;

    case 'saigon_naval':
      if (step >= 18) {
        nation = 'Francia (Marine Nationale / CEFEO)';
        historicalName = step >= 19
          ? 'Arsenal de Saïgon (Marine Nationale — Unione Francese)'
          : 'Base Navale di Saigon (Ritorno Francese & Resa Giapponese — Settembre 1945)';
        strokeColor = '#3a82c4';
        fillColor = '#152438';
        description = step >= 19
          ? 'Principale base fluviale e marittima della Marine Nationale in Estremo Oriente a sostegno delle operazioni del CEFEO e delle forze anfibie fluviali (Dinassaut) nel delta del Mekong.'
          : 'Settembre 1945: sbarco delle forze britanniche del SEAC (Gen. Gracey) e dei reparti francesi del Gen. Leclerc, con resa della 38ª Armata e della Marina giapponese a Saigon.';
      } else if (step < 7) {
        nation = 'Francia';
        strokeColor = '#5aa0c2';
        fillColor = '#102434';
      } else if (step < 9) {
        nation = 'Francia di Vichy / Accordo con Tokyo';
        strokeColor = '#8d77a3';
        fillColor = '#241a29';
      } else {
        nation = 'Giappone (Marina Imperiale)';
        historicalName = 'Distretto Navale Occupato di Saigon (22ª Flottiglia Aerea IJN)';
        strokeColor = '#b33d4a';
        fillColor = '#2b1414';
        description = 'Interamente occupata dalle forze aeronavali giapponesi nel luglio 1941; base strategica di lancio per gli aerosiluranti G3M e G4M che affondarono le corazzate Prince of Wales e Repulse il 10 dicembre 1941.';
      }
      break;

    case 'hong_kong_naval':
      if (step >= 18) {
        nation = 'Regno Unito (Royal Navy / British Pacific Fleet)';
        historicalName = step >= 19
          ? 'HMS Tamar — Hong Kong Royal Naval Dockyard (Ricostruzione Postbellica)'
          : 'HMS Tamar — Hong Kong (Liberata dalla Royal Navy — 30 Agosto 1945)';
        strokeColor = '#5aa0c2';
        fillColor = '#102434';
        description = 'Il 30 agosto 1945 la Task Force della British Pacific Fleet guidata dal contrammiraglio Sir Cecil Harcourt entra a Victoria Harbour ripristinando la base storica della Royal Navy.';
      } else if (step < 9) {
        nation = 'Regno Unito';
        historicalName = 'HMS Tamar / Hong Kong Royal Naval Station';
        strokeColor = '#5aa0c2';
        fillColor = '#102434';
        description = 'Base storica della China Station della Royal Navy con bacini di carenaggio e difese costiere su Hong Kong Island.';
      } else {
        nation = 'Giappone (Occupazione)';
        historicalName = 'Hong Kong (Occupazione Giapponese — Resa 25 Dicembre 1941)';
        strokeColor = '#b33d4a';
        fillColor = '#2b1414';
        description = 'Conquistata dalla 23ª Armata e dalla Marina Imperiale Giapponese il giorno di Natale 1941 ("Black Christmas") dopo 18 giorni di assedio ed eroica difesa della guarnigione britannica, canadese e indiana.';
      }
      break;

    case 'guam_naval':
      if (step < 9) {
        nation = 'USA';
        historicalName = 'Naval Station Guam (Apra Harbor)';
        strokeColor = '#5aa0c2';
        fillColor = '#102434';
        description = 'Avamposto aeronavale statunitense e stazione idrovolanti Pan American Airways nelle Isole Marianne.';
      } else if (step >= 15) {
        nation = 'USA (Liberata)';
        historicalName = 'Naval Operating Base Guam (Apra Harbor & CINCPAC Forward HQ)';
        strokeColor = '#5aa0c2';
        fillColor = '#102434';
        description = 'Riconquistata il 10 agosto 1944 dalla 3ª Divisione Marines e 77ª Fanteria USA, trasformata nella gigantesca base aeronavale avanzata della Pacific Fleet e quartier generale avanzato dell\'Ammiraglio Chester Nimitz.';
      } else {
        nation = 'Giappone (Occupazione)';
        historicalName = 'Omiya Jima (Occupata dalle Forze d\'Assalto IJN - 10 Dicembre 1941)';
        strokeColor = '#b33d4a';
        fillColor = '#2b1414';
        description = 'Espugnata dalle truppe speciali della Marina e dell\'Armata Imperiale Giapponese il 10 dicembre 1941 dopo un breve scontro con la guarnigione della US Navy e dei Marine.';
      }
      break;

    case 'cavite_manila':
      if (step >= 19) {
        nation = 'Filippine / Stati Uniti (Subic Bay & Sangley Point Agreement 1947)';
        historicalName = 'Baia di Manila, Cavite & Sangley Point (Repubblica delle Filippine / U.S. Navy)';
        strokeColor = '#3a82c4';
        fillColor = '#152438';
        description = 'Dopo l\'indipendenza filippina (4 luglio 1946) e il Military Bases Agreement del marzo 1947, la Repubblica delle Filippine e gli Stati Uniti operano congiuntamente gli scali navali e aeronavali della Baia di Manila (Sangley Point e Cavite).';
      } else if (step >= 18) {
        nation = 'Stati Uniti / Commonwealth delle Filippine (Liberata)';
        historicalName = 'Manila Bay & Cavite Navy Yard (Ripristino USA / MacArthur — 1945)';
        strokeColor = '#3a82c4';
        fillColor = '#152438';
        description = 'Sgomberata dai relitti della battaglia di Manila (febbraio-marzo 1945), la rada di Cavite e Corregidor tornano al pieno servizio delle flotte statunitensi e filippine.';
      } else if (step < 9) {
        nation = 'USA / Commonwealth Filippino';
        historicalName = 'Cavite Navy Yard & Corregidor (Manila Bay)';
        strokeColor = '#5aa0c2';
        fillColor = '#102434';
        description = 'Quartier generale e arsenale della US Asiatic Fleet dell\'ammiraglio Thomas Hart a difesa dell\'ingresso della Baia di Manila.';
      } else if (step === 9) {
        nation = 'USA / Filippine (Sotto Assedio)';
        historicalName = 'Cavite Navy Yard distrutto / Ritiro a Bataan e Corregidor';
        strokeColor = '#d97736';
        fillColor = '#251b1b';
        description = 'Arsenale di Cavite distrutto dai raid aerei giapponesi il 10 dicembre 1941; le forze del Gen. MacArthur dichiarano Manila città aperta (26 dicembre) ripiegando nella penisola di Bataan e nella fortezza dell\'isola di Corregidor.';
      } else {
        nation = 'Giappone (Occupazione)';
        historicalName = 'Baia di Manila & Corregidor (Capitolazione USAFFE — 6 Maggio 1942)';
        strokeColor = '#b33d4a';
        fillColor = '#2b1414';
        description = 'Dopo la resa di Bataan (9 aprile 1942) e la capitolazione della fortezza insulare di Corregidor del Ten. Gen. Jonathan Wainwright (6 maggio 1942) alla 14ª Armata del Gen. Masaharu Homma, la Baia di Manila passa sotto il pieno controllo aeronavale giapponese.';
      }
      break;

    case 'kotor_naval_base':
      if (step >= 16) {
        nation = 'Jugoslavia (NOVJ — Bocche di Cattaro Liberate)';
        historicalName = 'Base Navale delle Bocche di Cattaro (Liberata — 21 Novembre 1944)';
        strokeColor = '#336b56';
        fillColor = '#122b22';
        description = 'Liberata il 21 novembre 1944 dal 2° Corpo d\'Assalto partigiano; i cantieri navali di Tivat e la rada di Cattaro tornano all\'autorità della Jugoslavia Democratica Federale.';
      } else if (step >= 13) {
        nation = 'Germania (Kriegsmarine & Wehrmacht — Operazione Achse)';
        historicalName = 'Base Navale delle Bocche di Cattaro (Deutsches Marinekommando Kotor)';
        strokeColor = '#4a545c';
        fillColor = '#251b1b';
        description = 'Operazione Achse (settembre 1943): all\'indomani dell\'armistizio di Cassibile, la Wehrmacht e la Kriegsmarine disarmano il presidio italiano e occupano la piazzaforte e l\'idroscalo delle Bocche di Cattaro (Feldkommandantur Cetinje / Kotor).';
      } else if (step >= 8) {
        nation = 'Italia (Regia Marina)';
        historicalName = 'Comando Militare Marittimo delle Bocche di Cattaro (Regia Marina)';
        strokeColor = '#6f7a3f';
        fillColor = '#1e2418';
        description = 'Occupata nell\'aprile 1941 dalla Regia Marina e annessa all\'Italia come Provincia di Cattaro (Governatorato di Dalmazia); base siluranti e idroscalo militare.';
      }
      break;

    case 'sibenik_naval_base':
      if (step >= 16) {
        nation = 'Jugoslavia (NOVJ — Base Navale di Sebenico Liberata)';
        historicalName = 'Pomorska Baza Šibenik (Liberata — 3 Novembre 1944)';
        strokeColor = '#336b56';
        fillColor = '#122b22';
        description = 'Liberata il 3 novembre 1944 dall\'8° Corpo d\'Armata della NOVJ durante la campagna di Dalmazia; diviene base operativa per la Marina partigiana jugoslava (Mornarica NOVJ).';
      } else if (step >= 13) {
        nation = 'Croazia (NDH) & Germania (Kriegsmarine)';
        historicalName = 'Pomorska Baza Šibenik (Hrvatska mornarica & Kriegsmarine)';
        strokeColor = '#7a5c58';
        fillColor = '#2b1414';
        description = 'Settembre 1943: con l\'armistizio italiano, Ante Pavelić dichiara l\'annessione della Dalmazia allo Stato Indipendente di Croazia (NDH); la base navale di Sebenico è presidiata congiuntamente da ustaša e Kriegsmarine.';
      } else if (step >= 8) {
        nation = 'Italia (Regia Marina)';
        historicalName = 'Comando Militare Marittimo di Sebenico (Regia Marina)';
        strokeColor = '#6f7a3f';
        fillColor = '#1e2418';
        description = 'Aprile 1941: occupata dalla Regia Marina nel Governatorato della Dalmazia; base siluranti e idroscalo militare per il presidio dell\'Adriatico centrale.';
      }
      break;

    case 'salamis_naval_base':
      if (step >= 16) {
        nation = 'Grecia / Regno Unito (Alleati — Base Navale Liberata)';
        historicalName = 'Vafstathmos Salaminas (Liberata — Ottobre 1944)';
        strokeColor = '#5aa0c2';
        fillColor = '#102434';
        description = 'Ottobre 1944: a seguito dell\'evacuazione della Wehrmacht e dell\'arrivo delle forze alleate, l\'arsenale e la base navale principale di Salamina tornano sotto il controllo della Regia Marina Greca e della Royal Navy.';
      } else if (step >= 8) {
        nation = 'Germania / Asse (Kriegsmarine)';
        historicalName = 'Kriegsmarine-Stützpunkt Salamis (Marinegruppenkommando Süd)';
        strokeColor = '#8b8f94';
        fillColor = '#251b1b';
        description = 'Occupata dalla Wehrmacht e dalla Kriegsmarine nell\'aprile 1941; base per flottiglie di scorta convogli e cacciasommergibili nell\'Egeo.';
      }
      break;

    case 'bergen_naval_base':
    case 'narvik_naval_base':
    case 'horten_karljohansvern_base':
      if (step >= 18) {
        nation = 'Norvegia (Kongelige Norske Marine)';
        strokeColor = '#5aa0c2';
        fillColor = '#102434';
        historicalName = `${base.historicalName} (Restaurata al Regno di Norvegia — Maggio 1945)`;
        description = 'Dopo la capitolazione tedesca in Norvegia l\'8 maggio 1945 (Operazione Doomsday), la base torna sotto la sovranità della Reale Marina Norvegese.';
      } else if (step >= 6) {
        nation = 'Germania (Kriegsmarine)';
        strokeColor = '#8b8f94';
        fillColor = '#251b1b';
        if (base.id === 'bergen_naval_base') {
          historicalName = 'U-Boot-Stützpunkt Bergen (Kriegsmarine / U-Boot-Bunker Bruno)';
          description = 'Occupata dalla Kriegsmarine nell\'aprile 1940 e trasformata in una delle più importanti basi per sommergibili operanti nel Mare del Nord e nell\'Atlantico settentrionale.';
        } else if (base.id === 'narvik_naval_base') {
          historicalName = 'Seeverteidigung Narvik (Kriegsmarine)';
          description = 'Presidio navale artico tedesco a tutela del porto di carico del minerale di ferro e base d\'appoggio per la caccia ai convogli artici verso la Russia.';
        }
      }
      break;

    case 'den_helder':
      if (step >= 18) {
        nation = 'Paesi Bassi (Koninklijke Marine)';
        historicalName = 'Rijkswerf Willemsoord / Den Helder (Liberata — Maggio 1945)';
        strokeColor = '#d98c36';
        fillColor = '#291c10';
        description = 'Dopo la resa di Wageningen del 5 maggio 1945, la principale base navale olandese torna sotto il comando della Koninklijke Marine.';
      } else if (step >= 6) {
        nation = 'Germania (Kriegsmarine)';
        strokeColor = '#8b8f94';
        fillColor = '#251b1b';
      }
      break;

    case 'rotterdam_hoek':
      if (step >= 18) {
        nation = 'Paesi Bassi (Porto Commerciale & Navale Restaurato)';
        historicalName = 'Haven van Rotterdam & Hoek van Holland (Ricostruzione Paesi Bassi)';
        strokeColor = '#d98c36';
        fillColor = '#291c10';
        description = 'Liberato nel maggio 1945 alla resa della Festung Holland, il grande estuario della Mosa avvia lo sminamento e la ricostruzione portuale.';
      } else if (step >= 6) {
        nation = 'Germania (Kriegsmarine — Festung Holland)';
        historicalName = 'Marinecomplex Rotterdam & Hoek van Holland (Festung Holland)';
        strokeColor = '#8b8f94';
        fillColor = '#251b1b';
        description = 'Complesso navale della Nieuwe Waterweg presidiato dalla Kriegsmarine; rimane isolato nella Festung Holland fino alla resa del 5 maggio 1945 a Wageningen.';
      }
      break;

    case 'vlissingen':
      if (step >= 16) {
        nation = 'Paesi Bassi / Regno Unito (Alleati — Liberazione della Schelda)';
        historicalName = 'Marinebasis Vlissingen (Liberata — Operazione Infatuate, Nov 1944)';
        strokeColor = '#3a82c4';
        fillColor = '#152438';
        description = 'Liberata l\'8 novembre 1944 dai Commandos britannici e dalla 52ª Divisione Lowland (Operazione Infatuate) durante la battaglia dell\'isola di Walcheren; lo sminamento della Schelda permette la riapertura del porto di Anversa.';
      } else if (step >= 6) {
        nation = 'Germania (Kriegsmarine)';
        strokeColor = '#8b8f94';
        fillColor = '#251b1b';
        description = 'Base navale occupata dalla Kriegsmarine a sbarramento della Schelda Occidentale e punto di appoggio per batterie costiere pesanti dell\'Atlantikwall.';
      }
      break;

    case 'zeebrugge':
      if (step >= 16) {
        nation = 'Belgio / Alleati (Liberazione delle Fiandre)';
        historicalName = 'Base Navale di Zeebrugge (Liberata — Autunno 1944)';
        strokeColor = '#7e6eb0';
        fillColor = '#1c1829';
        description = 'Liberata nell\'autunno 1944 dalle forze canadesi e britanniche durante la liberazione della costa fiamminga.';
      } else if (step >= 6) {
        nation = 'Germania (Kriegsmarine)';
        strokeColor = '#8b8f94';
        fillColor = '#251b1b';
        description = 'Base navale belga occupata dalla Kriegsmarine; scalo per flottiglie di dragamine e motosiluranti d\'assalto nel canale della Manica.';
      }
      break;

    case 'copenhagen_holmen_base':
      if (step >= 18) {
        nation = 'Danimarca (Søværnet — Flådestation Holmen Restaurata)';
        historicalName = 'Orlogsværftet & Flådestation Holmen (Liberata — Maggio 1945)';
        strokeColor = '#5aa0c2';
        fillColor = '#102434';
        description = 'Dopo la resa delle forze tedesche in Danimarca del 5 maggio 1945, la base navale di Holmen torna alla Marina Reale Danese.';
      } else if (step >= 6) {
        nation = 'Danimarca (Presidio Wehrmacht)';
        strokeColor = '#707478';
        fillColor = '#1e1e1e';
      }
      break;

    case 'taranto':
      if (step >= 19) {
        nation = 'Repubblica Italiana (Marina Militare)';
        historicalName = 'Arsenale e Base Navale di Taranto (Marina Militare Italiana — 1947)';
        strokeColor = '#3d8b5a';
        fillColor = '#14291b';
        description = 'Dopo l\'entrata in vigore del Trattato di Pace di Parigi (15 settembre 1947), la base navale di Taranto costituisce il principale polo mediterraneo della Marina Militare della Repubblica Italiana.';
      } else if (step >= 13) {
        nation = 'Regno Unito / Italia (Regno del Sud — Alleati)';
        historicalName = 'Arsenale e Base Navale di Taranto (Occupata dagli Alleati — Op. Slapstick, 9 Settembre 1943)';
        strokeColor = '#3a82c4';
        fillColor = '#152438';
        description = 'Il 9 settembre 1943 la 1ª Divisione Aviotrasportata britannica sbarca nel porto di Taranto senza incontrare resistenza; la base navale passa sotto il controllo alleato mentre le navi da battaglia della Regia Marina salpano per Malta in ottemperanza alle clausole dell\'armistizio.';
      } else {
        strokeColor = '#6f7a3f';
        fillColor = '#1e2418';
      }
      break;

    case 'la_spezia':
      if (step >= 19) {
        nation = 'Repubblica Italiana (Marina Militare)';
        historicalName = 'Arsenale Marittimo della Spezia (Marina Militare Italiana — 1947)';
        strokeColor = '#3d8b5a';
        fillColor = '#14291b';
        description = 'Arsenale militare alto-tirrenico della Marina Militare Italiana impegnato nello sminamento costiero e nella riorganizzazione postbellica.';
      } else if (step >= 17) {
        nation = 'Italia / Alleati (CLNAI & 92ª Divisione Buffalo USA)';
        historicalName = 'Arsenale e Golfo di La Spezia (Liberato — 24-25 Aprile 1945)';
        strokeColor = '#3a82c4';
        fillColor = '#152438';
        description = 'Il 24-25 aprile 1945 le formazioni partigiane della IV Zona Operativa ligure e i reparti della 92ª Divisione "Buffalo" dell\'US Army liberano La Spezia e l\'arsenale navale; le residue forze tedesche e della Xª Flottiglia MAS della RSI si arrendono o fuggono verso nord.';
      } else if (step >= 13) {
        nation = 'Germania (Wehrmacht — Occupazione Op. Achse)';
        historicalName = 'Arsenale di La Spezia (Occupazione Militare Tedesca — 9 Settembre 1943)';
        strokeColor = '#4a545c';
        fillColor = '#1e2124';
        description = 'All\'indomani dell\'annuncio dell\'armistizio, la flotta italiana dell\'ammiraglio Bergamini lascia precipitosamente La Spezia diretta all\'Asinara/Malta; l\'arsenale e la base navale vengono occupati dalla Wehrmacht.';
      } else {
        strokeColor = '#6f7a3f';
        fillColor = '#1e2418';
      }
      break;

    case 'pola_naval':
      if (step >= 19) {
        nation = 'Jugoslavia (JRM — Trattato di Parigi 15 Settembre 1947)';
        historicalName = 'Vojnopomorska Baza Pula (Cessione alla Jugoslavia — Settembre 1947)';
        strokeColor = '#336b56';
        fillColor = '#122b22';
        description = 'Il 15 settembre 1947, in attuazione del Trattato di Pace di Parigi e completato il grande esodo della popolazione italiana, le forze britanniche evacuano l\'enclave di Pola consegnando la base navale all\'Esercito e alla Marina Jugoslava.';
      } else if (step >= 18) {
        nation = 'Governo Militare Alleato (AMG — Enclave della Linea Morgan)';
        historicalName = 'Base Navale di Pola (Enclave AMG Anglo-Americana — Accordo di Duino 1945)';
        strokeColor = '#3a82c4';
        fillColor = '#152438';
        description = 'Dall\'Accordo di Duino (9 giugno 1945) alla ratifica del Trattato di Pace (settembre 1947), il porto e l\'arsenale di Pola costituiscono un\'enclave amministrata dal Governo Militare Alleato (AMG).';
      } else if (step >= 13) {
        nation = 'Germania (OZAK — Occupazione Militare Wehrmacht)';
        historicalName = 'Base Navale di Pola (Operationszone Adriatisches Küstenland)';
        strokeColor = '#4a545c';
        fillColor = '#1e2124';
        description = 'La base navale di Pola in Istria viene occupata dai reparti della Wehrmacht e integrata nell\'Operationszone Adriatisches Küstenland sotto il controllo del Gauleiter Friedrich Rainer.';
      } else {
        strokeColor = '#6f7a3f';
        fillColor = '#1e2418';
      }
      break;

    case 'leros_aegean':
      if (step >= 19) {
        nation = 'Grecia (Dodecaneso — Trattato di Parigi 1947)';
        historicalName = 'Base Navale di Lakki / Lero (Dodecaneso Unito al Regno di Grecia)';
        strokeColor = '#5aa0c2';
        fillColor = '#102434';
        description = 'Dal 1947 l\'ex base navale italiana di Portolago (Lakki) a Lero e l\'intero Dodecaneso passano alla sovranità del Regno di Grecia per effetto del Trattato di Pace con l\'Italia.';
      } else if (step >= 18) {
        nation = 'Regno Unito (BMA Dodecaneso — Resa di Simi 8 Maggio 1945)';
        historicalName = 'Portolago / Lero (Amministrazione Militare Britannica — BMA Dodecanese)';
        strokeColor = '#5aa0c2';
        fillColor = '#102434';
        description = 'Dopo la resa delle guarnigioni tedesche del Dodecaneso firmata sull\'isola di Simi l\'8 maggio 1945, la base navale di Lero è retta dall\'Amministrazione Militare Britannica in attesa dell\'unione alla Grecia.';
      } else if (step >= 14) {
        nation = 'Germania (Kriegsmarine & Wehrmacht — Festung Dodekanes)';
        historicalName = 'Base Navale di Portolago a Lero (Occupazione Tedesca — Festung Dodekanes)';
        strokeColor = '#8b8f94';
        fillColor = '#251b1b';
        description = 'Novembre 1943: a seguito della battaglia di Lero (Operazione Leopard), le truppe tedesche riconquistano l\'isola. La base navale di Portolago rimane un caposaldo isolato della Kriegsmarine nell\'Egeo (Festung Dodekanes) fino alla resa finale dell\'8 maggio 1945.';
      } else if (step >= 13) {
        nation = 'Regno Unito / Italia (Resistenza Mista Italo-Britannica nel Dodecaneso)';
        historicalName = 'Base Navale di Portolago a Lero (Battaglia del Dodecaneso, Settembre 1943)';
        strokeColor = '#3a82c4';
        fillColor = '#152438';
        description = 'Dopo la caduta di Rodi a metà settembre, la formidabile base navale fortificata di Portolago a Lero e l\'isola di Samo resistono presidiate da guarnigioni congiunte della Regia Marina italiana (Amm. Luigi Mascherpa) e dell\'esercito britannico sotto i bombardamenti della Luftwaffe.';
      } else {
        strokeColor = '#6f7a3f';
        fillColor = '#1e2418';
      }
      break;

    case 'sazan_naval_base':
      if (step >= 16) {
        nation = 'Albania (UNÇ — Isola di Saseno Liberata)';
        historicalName = 'Ishulli i Sazanit (Liberato dalle Forze Partigiane Albanesi)';
        strokeColor = '#a64d4d';
        fillColor = '#2b1414';
        description = 'Tardo autunno 1944: a seguito della ritirata del XXI. Gebirgs-Armeekorps tedesco dai Balcani e della liberazione di Valona, l\'isola di Saseno passa sotto il controllo dell\'Esercito di Liberazione Nazionale Albanese (UNÇ).';
      } else if (step >= 13) {
        nation = 'Germania (Wehrmacht — Occupazione Albania)';
        historicalName = 'Isola di Saseno (Occupazione Militare Tedesca dell\'Adriatico)';
        strokeColor = '#4a545c';
        fillColor = '#1e2124';
        description = 'Con l\'armistizio e l\'occupazione tedesca dell\'Albania, l\'avamposto navale di Saseno all\'imbocco della baia di Valona viene presidiato dalla Wehrmacht e dalla Kriegsmarine.';
      } else {
        strokeColor = '#6f7a3f';
        fillColor = '#1e2418';
      }
      break;

    case 'augusta_messina':
      if (step >= 13) {
        nation = step >= 19
          ? 'Repubblica Italiana (Marina Militare — Augusta/Messina)'
          : 'Regno Unito / Italia (Sicilia — Base Logistica Mediterranea)';
        historicalName = step >= 19
          ? 'Base Navale di Augusta & Stretto di Messina (Repubblica Italiana — 1947)'
          : 'Piazzaforte dello Stretto e Base Navale di Augusta (Base Logistica Alleata)';
        strokeColor = step >= 19 ? '#3d8b5a' : '#3a82c4';
        fillColor = step >= 19 ? '#14291b' : '#152438';
        description = step >= 19
          ? 'Principale base navale siciliana della Marina Militare della Repubblica Italiana a presidio del Mediterraneo centrale.'
          : 'Con l\'evacuazione italo-tedesca di metà agosto 1943 e la cattura di Messina, l\'intera Sicilia e le basi navali dello Stretto e di Augusta operano sotto comando alleato per supportare la campagna d\'Italia.';
      } else if (step === 12) {
        nation = 'Regno Unito / Italia (Asse a Messina, Alleati ad Augusta)';
        historicalName = 'Piazzaforte dello Stretto e Base di Augusta (Occupata dall\'8ª Armata Britannica a Luglio 1943)';
        strokeColor = '#3a82c4';
        fillColor = '#152438';
        description = 'A metà luglio 1943 la piazzaforte navale di Augusta viene conquistata intatta dall\'8ª Armata di Montgomery (13 luglio), mentre la base navale di Messina e le batterie dello Stretto restano presidiate dalle forze italo-tedesche per coprire l\'evacuazione in Calabria.';
      } else {
        strokeColor = '#6f7a3f';
        fillColor = '#1e2418';
      }
      break;

    case 'wilhelmshaven':
    case 'kiel':
    case 'helgoland':
      if (step >= 18) {
        nation = 'Regno Unito (Royal Navy — Zona d\'Occupazione Britannica)';
        historicalName = `${base.historicalName} (Smantellamento Alleato — Zona Britannica)`;
        strokeColor = '#5aa0c2';
        fillColor = '#102434';
        description = 'Maggio 1945 - 1947: base tedesca occupata dalla Royal Navy nella zona britannica per lo smantellamento degli impianti navali della Kriegsmarine (ad Helgoland detonazione delle fortificazioni nell\'aprile 1947).';
      } else {
        strokeColor = '#8b8f94';
        fillColor = '#251b1b';
      }
      break;

    case 'swinemunde':
      if (step >= 18) {
        nation = 'Polonia / URSS (Świnoujście — Accordi di Potsdam)';
        historicalName = 'Świnoujście / Base Baltica (Amministrazione Polacca & Flotta Sovietica del Baltico)';
        strokeColor = '#d9534f';
        fillColor = '#291212';
        description = 'Dal 1945 il porto di Swinemünde (Świnoujście) alla foce dell\'Oder è trasferito alla Polonia secondo la linea Oder-Neisse e ospita unità della Flotta Baltica sovietica e della marina polacca.';
      } else {
        strokeColor = '#8b8f94';
        fillColor = '#251b1b';
      }
      break;

    case 'kure':
    case 'yokosuka':
      if (step >= 18) {
        nation = base.id === 'yokosuka' ? 'Stati Uniti / SCAP (U.S. Navy)' : 'Commonwealth Britannico / SCAP (BCOF)';
        historicalName = base.id === 'yokosuka'
          ? 'U.S. Fleet Activities Yokosuka (Occupazione Alleata SCAP)'
          : 'Base Navale di Kure (British Commonwealth Occupation Force — SCAP)';
        strokeColor = '#3a82c4';
        fillColor = '#152438';
        description = base.id === 'yokosuka'
          ? 'Dal settembre 1945 lo storico arsenale di Yokosuka nella Baia di Tokyo diventa la principale base navale avanzata della U.S. Navy nel Giappone occupato (SCAP).'
          : 'Ex arsenale della Marina Imperiale di Kure, posto dal 1945 sotto il presidio delle forze del Commonwealth Britannico (BCOF) e smilitarizzazione SCAP.';
      } else {
        strokeColor = '#b33d4a';
        fillColor = '#2b1414';
      }
      break;

    case 'ryojun_naval':
      if (step >= 18) {
        nation = 'URSS (Flotta del Pacifico — Accordo Sino-Sovietico 1945)';
        historicalName = 'Voenno-Morskaja Baza Port-Artur (Base Navale Sovietica di Lüshun)';
        strokeColor = '#d9534f';
        fillColor = '#291212';
        description = 'Dall\'agosto 1945 al 1955 la rada fortificata di Port Arthur (Lüshunkou / ex-Ryojun) torna sotto controllo della Flotta Sovietica del Pacifico in attuazione degli accordi di Yalta e del Trattato Sino-Sovietico.';
      } else {
        strokeColor = '#b33d4a';
        fillColor = '#2b1414';
      }
      break;

    case 'kronstadt':
    case 'polyarny':
    case 'vladivostok':
      strokeColor = '#d9534f';
      fillColor = '#291212';
      break;

    case 'base_beta_galapagos':
      if (step >= 10) {
        nation = 'USA / Ecuador';
        historicalName = 'Base Beta — Seymour Army Airfield (Baltra, Galápagos)';
        description = 'Presidio aeronavale della Sixth Air Force e US Navy istituito nel 1942: bombardieri B-17, B-24 e idrovolanti PBY Catalina pattugliano il Pacifico orientale a protezione dell\'accesso occidentale al Canale di Panama contro sommergibili dell\'Asse.';
        strokeColor = '#5aa0c2';
        fillColor = '#102434';
      } else {
        nation = 'Ecuador';
        historicalName = 'Isla Seymour Sur / Baltra (Isole Galápagos)';
        description = 'Territorio insulare sovrano dell\'Ecuador nell\'Oceano Pacifico; prima degli accordi panamericani del 1942 non ospita installazioni militari permanenti.';
        strokeColor = '#b59e5b';
        fillColor = '#211e15';
      }
      break;

    case 'hvalfjordur_base':
      if (base.getDynamicStatus) {
        return base.getDynamicStatus(step);
      }
      break;

    case 'ceuta_naval_base':
    case 'melilla_naval_base':
    case 'karlskrona_naval_base':
      strokeColor = '#96999c';
      fillColor = '#1d2124';
      break;
  }

  return {
    nation,
    historicalName,
    theater,
    description,
    fillColor,
    strokeColor,
  };
}
