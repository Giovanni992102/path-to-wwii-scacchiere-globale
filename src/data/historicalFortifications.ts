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
    activeSteps: [0, 1, 2, 3, 4, 5, 6],
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
    activeSteps: [1, 2, 3, 4, 5, 6],
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6],
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6],
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
    activeSteps: [6], // Iniziata nella primavera 1940
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6],
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
    activeSteps: [6], // Eretta nel giugno 1940
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
    activeSteps: [0, 1, 2, 3, 4, 5, 6],
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
    activeSteps: [5, 6],
  },
];

export const HISTORICAL_NAVAL_BASES: NavalBase[] = [
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
];
