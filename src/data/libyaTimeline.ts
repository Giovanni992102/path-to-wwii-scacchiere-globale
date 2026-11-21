/**
 * EVOLUZIONE CRONOLOGICA DELLE 22 PROVINCE DELLA LIBIA ITALIANA (1936–1942)
 * Copre l'intero periodo di amministrazione italiana ("Quarta Sponda" e "Territorio Militare del Sud")
 * fino alla caduta della Tripolitania e del Fezzan nel gennaio 1943 (Step 12).
 *
 * Scansione cronologica anti-anacronismo:
 * - s0 (GEN 1936): Governatorato Unificato di Italo Balbo (1934), Via Balbia in costruzione (no RDL 1939, no Arco dei Fileni 1937)
 * - s1 (MAR 1938): Via Balbia inaugurata (mar 1937), Ente Colonizzazione della Libia, basi Regia Aeronautica
 * - s2 (OTT 1938): Sbarco dei "Ventimila" coloni italiani (28 ott 1938) e nuovi comprensori rurali
 * - s3–s5 (MAR–SET 1939): R.D.L. 9 gennaio 1939 n. 70 — Incorporazione delle 4 province costiere (Tripoli, Misurata, Bengasi, Derna)
 *                         nel territorio metropolitano ("Quarta Sponda") vs Territorio Militare del Sud a regime speciale
 * - s6 (GIU 1940): Entrata in guerra (10 giu 1940), morte di Italo Balbo a Tobruk (28 giu) -> Maresciallo Rodolfo Graziani
 * - s7 (OTT 1940): Offensiva della 10ª Armata in Egitto (Sidi Barrani, set 1940), convogli e presidi di retrovia
 * - s8 (APR 1941): Post-Compass: sbarco DAK a Tripoli (Sonnenblume), riconquista Cirenaica, Assedio di Tobruk (Ratti di Tobruk),
 *                  caduta eroica di Giarabub (21 mar) e conquista FFL/Leclerc di Cufra (1 mar)
 * - s9 (DIC 1941): Post-Crusader: Cirenaica rioccupata dall'8ª Armata UK; Tripolitania/Fezzan tenuti da Bastico & Rommel a El Agheila
 * - s10 (AGO 1942): Riconquista italo-tedesca (gen-giu 1942), Gazala/Bir Hakeim, Caduta di Tobruk (21 giu 1942), spinta a El Alamein
 * - s11 (NOV 1942): Post-El Alamein: ritirata dalla Cirenaica verso El Agheila/Tripolitania, sbarco alleato Torch (8 nov) a ovest
 */

export interface LibyaToponymEntry {
  name: string;
  adminTitle: string;
  note: string;
}

interface LibyaDistrictRecord {
  id: string;
  region: 'tripolitania_coastal' | 'cyrenaica_coastal' | 'sahara_military' | 'cufra';
  matchTerms: string[];
  baseName: string;
  prewarAdmin: string;
  metroProvinceName?: string;
  metroNote?: string;
  /** GEN 1936 (senza anacronismi 1937/1938/1939) */
  s0: string;
  /** MAR 1938 (post Via Balbia 1937, prima dei Ventimila ott 1938) */
  s1: string;
  /** OTT 1938 (Ventimila 28 ott 1938) */
  s2: string;
  /** MAR-SET 1939 (RDL 9 gen 1939 n. 70) */
  s3_5: string;
  /** GIU 1940 (entrata in guerra, Balbo->Graziani) */
  s6: string;
  /** OTT 1940 (offensiva Graziani / presidi 1940) */
  s7: string;
  /** APR 1941 (post-Compass & Sonnenblume) */
  s8?: string | Partial<LibyaToponymEntry>;
  /** DIC 1941 (solo Tripolitania/Fezzan/Cufra — Cirenaica nord è UK Crusader) */
  s9?: string | Partial<LibyaToponymEntry>;
  /** AGO 1942 (apice Asse dopo Gazala e caduta Tobruk 21 giu 1942) */
  s10?: string | Partial<LibyaToponymEntry>;
  /** NOV 1942 (post El Alamein & Torch — Tripolitania/Sirtica/Fezzan ancora ITA, Cufra FFL) */
  s11?: string | Partial<LibyaToponymEntry>;
}

const GOV_ITALO_BALBO = 'Maresciallo dell\'Aria Italo Balbo';

function adminLibyaCommand(step: number, scope: string, isMetro = false): string {
  if (step >= 11) {
    return `Regno d'Italia — ${scope} (Maresciallo Ettore Bastico · Ripiegamento su El Agheila)`;
  }
  if (step === 10) {
    return `Regno d'Italia — ${scope} (Maresciallo Ettore Bastico & Panzerarmee Afrika · Feldm. Erwin Rommel)`;
  }
  if (step === 9) {
    return `Regno d'Italia — ${scope} (Maresciallo Ettore Bastico & Panzergruppe Afrika · Gen. Erwin Rommel)`;
  }
  if (step === 8) {
    return `Regno d'Italia — ${scope} (Gen. Italo Gariboldi & DAK Gen. Erwin Rommel)`;
  }
  if (step >= 6) {
    return `Regno d'Italia — ${scope} (Maresciallo Rodolfo Graziani)`;
  }
  if (step >= 3 && isMetro) {
    return `Regno d'Italia (Quarta Sponda Metropolitana · R.D.L. 9 gen 1939) — ${scope} (${GOV_ITALO_BALBO})`;
  }
  return `Regno d'Italia — ${scope} (${GOV_ITALO_BALBO})`;
}

const LIBYA_DISTRICTS: LibyaDistrictRecord[] = [
  {
    id: 'LYTB',
    region: 'tripolitania_coastal',
    matchTerms: ['tripoli'],
    baseName: 'Tripoli (Tripolitania Italiana)',
    prewarAdmin: 'Commissariato Generale di Tripoli',
    s0: 'Capoluogo della Tripolitania e sede del Governatore Generale Italo Balbo (colonia unificata dal 1934). Snodo portuale centrale della Libia, testa di ponte della costruenda litoranea libica (futura Via Balbia) e base aerea di Castel Benito.',
    s1: 'Capoluogo della Libia Italiana unificata e capolinea occidentale della Via Balbia (inaugurata da Balbo nel marzo 1937); Fiera Campionaria di Tripoli, potenziamento del porto mercantile e dell\'aeroscalo della Regia Aeronautica a Castel Benito.',
    s2: '28–29 ottobre 1938: nel porto di Tripoli sbarca il grosso della spedizione dei "Ventimila" coloni rurali italiani destinati ai nuovi comprensori agricoli della Tripolitania sotto l\'impulso diretto del Governatore Italo Balbo.',
    s3_5: 'Con il R.D.L. 9 gennaio 1939 n. 70, la Provincia di Tripoli entra a far parte integrante del territorio metropolitano nazionale del Regno d\'Italia ("Quarta Sponda"), capoluogo della diciannovesima regione d\'oltremare.',
    s6: 'Capoluogo della Tripolitania metropolitana e base logistica principale dell\'Africa Settentrionale all\'entrata in guerra (10 giugno 1940); dopo la tragica morte di Italo Balbo nei cieli di Tobruk (28 giugno), il Maresciallo Rodolfo Graziani assume il comando supremo.',
    s7: 'Principale porto d\'afflusso dei convogli militari della Regia Marina da Napoli e Palermo per sostenere l\'offensiva della 10ª Armata di Graziani sul confine egiziano, sotto crescente pressione aerea britannica da Malta.',
    s8: {
      name: 'Tripoli (Sbarco del Deutsches Afrikakorps — Operazione Sonnenblume)',
      adminTitle: 'Regno d\'Italia — Comando Superiore FF.AA. Africa Settentrionale (Gen. Italo Gariboldi & Gen. Erwin Rommel)',
      note: 'OPERAZIONE SONNENBLUME (febbraio–aprile 1941): Nel porto di Tripoli sbarcano i reparti corazzati del Deutsches Afrikakorps (5ª Divisione Leggera e 15ª Panzer) guidati dal Gen. Erwin Rommel accanto alle divisioni italiane Ariete, Trento e Brescia; Italo Gariboldi subentra a Graziani.',
    },
    s9: {
      name: 'Tripoli (Comando Superiore AS — Ripiegamento dopo Crusader)',
      note: 'Dicembre 1941: sotto il comando supremo del Maresciallo Ettore Bastico, il porto di Tripoli mantiene con enormi perdite sui convogli del Mediterraneo i rifornimenti di carburante e mezzi corazzati per il Panzergruppe Afrika attestato a El Agheila.',
    },
    s10: {
      name: 'Tripoli (Porto Strategico per El Alamein — Asse Italo-Tedesco)',
      note: 'Agosto 1942: dopo la caduta di Tobruk e l\'avanzata fino a El Alamein, Tripoli resta la retrovia amministrativa e il porto maggiore di sbarco per i rinforzi della Divisione Folgore e dei mezzi destinati alla Panzerarmee Afrika.',
    },
    s11: {
      name: 'Tripoli (Difesa dell\'Ultima Piazzaforte — Novembre 1942)',
      note: 'Dopo la sconfitta di El Alamein (4 novembre) e lo sbarco anglo-americano in Nordafrica (Torch, 8 novembre 1942), il comando di Bastico predispone lo sgombero della Tripolitania orientale e l\'eventuale ripiegamento sulla Tunisia.',
    },
  },
  {
    id: 'LYBA',
    region: 'cyrenaica_coastal',
    matchTerms: ['benghazi', 'bengasi'],
    baseName: 'Bengasi (Cirenaica Italiana)',
    prewarAdmin: 'Commissariato Generale Provinciale di Bengasi',
    s0: 'Capoluogo storico della Cirenaica e porto strategico sul Golfo della Sirte; base aerea di Berka e perno militare del Governatorato Generale di Balbo nella Libia orientale dopo la definitiva pacificazione senussita (1931).',
    s1: 'Polo marittimo della Cirenaica collegato direttamente a Tripoli dalla nuova Via Balbia asfaltata (marzo 1937), potenziamento delle banchine portuali e rete ferroviaria locale verso Barce e Soluch.',
    s2: 'Ottobre 1938: al porto di Bengasi sbarcano i convogli orientali dei "Ventimila" coloni rurali destinati alle fattorie dell\'Ente di Colonizzazione sul Gebel el-Achdar e nella piana di Barce.',
    s3_5: 'Dal gennaio 1939 (R.D.L. n. 70/1939) la Provincia di Bengasi è incorporata come provincia metropolitana del Regno d\'Italia (Quarta Sponda), base avanzata della 10ª Armata dell\'Africa Settentrionale.',
    s6: 'Porto avanzato e centro di comando cirenaico durante la mobilitazione di confine del giugno 1940; esposto ai primi bombardamenti della RAF dal fronte egiziano dopo la morte di Balbo.',
    s7: 'Principale snodo portuale e logistico alle spalle dell\'avanzata italiana fino a Sidi Barrani nell\'autunno 1940, prima del crollo invernale della 10ª Armata.',
    s8: {
      name: 'Bengasi (Riconquista Italo-Tedesca — Controffensiva di Rommel)',
      adminTitle: 'Regno d\'Italia / Deutsches Afrikakorps — Piazzaforte di Bengasi (Riconquistata il 4 aprile 1941)',
      note: 'Occupata dagli australiani di Wavell il 6 febbraio 1941 dopo l\'Operazione Compass, Bengasi viene riconquistata il 4 aprile 1941 dalle colonne mobili di Erwin Rommel e del Regio Esercito scattate da El Agheila, riaprendo il porto cirenaico ai convogli.',
    },
    s10: {
      name: 'Bengasi (Base Avanzata dell\'Asse per Gazala ed El Alamein)',
      note: 'Riconquistata dall\'Asse il 29 gennaio 1942 nella controffensiva invernale di Rommel e Bastico, Bengasi torna per tutta l\'estate 1942 il principale scalo avanzato verso il fronte di El Alamein nonostante i martellanti raid aerei alleati.',
    },
  },
  {
    id: 'LYDR',
    region: 'cyrenaica_coastal',
    matchTerms: ['derna'],
    baseName: 'Derna (Cirenaica Orientale)',
    prewarAdmin: 'Commissariato Generale Provinciale di Derna',
    s0: 'Porto costiero e capoluogo della Cirenaica nord-orientale; base navale secondaria e scalo di arroccamento verso il confine egiziano nella Libia orientale di Balbo.',
    s1: 'Snodo costiero chiave sul tratto cirenaico della nuova Via Balbia (1937), collegato agli altipiani agricoli del Gebel el-Achdar e alle piste desertiche interne verso Mechili.',
    s2: 'Ottobre 1938: transito e insediamento delle nuove famiglie contadine dei "Ventimila" dirette ai villaggi rurali del comprensorio di Derna e dell\'altopiano cirenaico.',
    s3_5: 'Dal gennaio 1939 (R.D.L. n. 70/1939) la Provincia di Derna entra a far parte del territorio metropolitano del Regno d\'Italia, ospitando crescenti guarnigioni di copertura sul fianco orientale.',
    s6: 'Retrovia immediata delle unità mobilitate alla frontiera egiziana (giugno 1940) e base aerea avanzata della 5ª Squadra Aerea nella Cirenaica orientale.',
    s7: 'Snodo di rifornimento delle divisioni italiane impegnate nell\'avanzata verso Sidi Barrani (settembre–ottobre 1940), collegato a Tobruk e Bardia lungo la litoranea.',
    s8: {
      name: 'Derna e Mechili (Riconquista dell\'Asse — Cattura dei Comandi Britannici)',
      adminTitle: 'Regno d\'Italia / Deutsches Afrikakorps — Commissariato di Derna (Riconquistata il 7–8 aprile 1941)',
      note: 'Attraverso un\'audace manovra a tenaglia sulle piste interne del Gebel fino a Mechili e Derna (7–8 aprile 1941), le forze italo-tedesche di Rommel e della Divisione Corazzata Ariete travolgono la 2ª Divisione Corazzata britannica catturando i generali O\'Connor e Neame.',
    },
    s10: {
      name: 'Derna (Base Logistica e Aerea di Retrovia — Estate 1942)',
      note: 'Rioccupata all\'inizio del febbraio 1942 dopo l\'offensiva di Bengasi, Derna e gli aeroporti di Martuba fungono nell\'estate 1942 da cruciale retrovia aereo-portuale durante Gazala e la spinta verso El Alamein.',
    },
  },
  {
    id: 'LYMI',
    region: 'tripolitania_coastal',
    matchTerms: ['misrata', 'misurata'],
    baseName: 'Misurata (Tripolitania Orientale)',
    prewarAdmin: 'Commissariato Generale Provinciale di Misurata',
    s0: 'Capoluogo della Tripolitania orientale e scalo di Misurata Marina; avvio delle bonifiche agrarie e dei primi centri rurali nella piana costiera ai margini della Sirtica.',
    s1: 'Collegata a Tripoli e alla Cirenaica dal tracciato costiero della Via Balbia (1937); espansione dell\'acquedotto rurale e dei comprensori agricoli di Tauorga e Zliten.',
    s2: 'Ottobre 1938: afflusso dei coloni dei "Ventimila" destinati ai nuovi villaggi di colonizzazione demografica fascista intitolati a Francesco Crispi e Marcello Gioda nella piana misuratina.',
    s3_5: 'Dal gennaio 1939 (R.D.L. n. 70/1939) la Provincia di Misurata diventa una delle quattro province metropolitane della Quarta Sponda italiana sul Mediterraneo centrale.',
    s6: 'Retrovia costiera e agricola della Tripolitania all\'entrata in guerra (giugno 1940); presidi territoriali della Milizia e campi d\'aviazione di riserva.',
    s7: 'Asse di transito strategico lungo la Via Balbia per le colonne motorizzate e gli autocarri di rifornimento diretti verso la Sirte e il fronte egiziano.',
    s8: 'Snodo intermedio lungo l\'arteria litoranea tra Tripoli e El Agheila per il trasferimento verso est dei reggimenti del Deutsches Afrikakorps e delle divisioni corazzate italiane.',
    s9: 'Zona di rischieramento arretrato e riparazione mezzi corazzati per il Panzergruppe Afrika dopo l\'arretramento dalla Cirenaica nel dicembre 1941.',
    s10: 'Distretto agricolo e snodo litoraneo sicuro al riparo delle conquiste estive dell\'Asse a El Alamein, fornitore di derrate e presidi di sorveglianza costiera.',
    s11: 'Area di passaggio delle colonne in ritirata dalla Cirenaica dopo El Alamein (novembre 1942), esposta agli attacchi dell\'aviazione da bombardamento alleata sulla Via Balbia.',
  },
  {
    id: 'LYBU',
    region: 'cyrenaica_coastal',
    matchTerms: ['tobruk', 'butnan', 'bardia'],
    baseName: 'Tobruch e Bardia (Piazzaforte di Tobruk)',
    prewarAdmin: 'Comando Piazza Marittima di Tobruk / Settore Difensivo di Bardia',
    s0: 'Piazzaforte marittima della Regia Marina con opere fortificate al confine egiziano (Bardia, Ridotta Capuzzo, Ridotta Maddalena); perno difensivo orientale previsto dal Governatore Balbo.',
    s1: 'Completamento della Via Balbia fino al confine di Bardia-Sollum (1937) e potenziamento delle batterie costiere, dei depositi sotterranei e dell\'aeroporto di Tmini/El Adem.',
    s2: 'Militarizzazione intensificata della piazzaforte durante la crisi europea del 1938 e lavori campali di rafforzamento lungo il perimetro difensivo esterno di Tobruk.',
    s3_5: 'Dal gennaio 1939 compresa nel territorio metropolitano della Provincia di Derna ("Quarta Sponda"); presidio rinforzato da divisioni metropolitane e libiche sul confine con l\'Egitto.',
    s6: 'Teatro immediato degli scontri di frontiera dal 10 giugno 1940 (cattura britannica di Ridotta Capuzzo) e del tragico abbattimento per fuoco amico del Governatore Generale Italo Balbo nei cieli di Tobruk il 28 giugno 1940.',
    s7: 'Base d\'appoggio ravvicinata e scalo d\'imbarco per l\'offensiva della 10ª Armata italiana fino a Sidi Barrani (settembre 1940) sotto la guida del Maresciallo Graziani.',
    s8: {
      name: 'Tobruk (Assedio Italo-Tedesco della Piazzaforte) & Bardia',
      adminTitle: 'Fronte d\'Assedio di Tobruk (DAK Gen. Erwin Rommel & Regio Esercito vs 9ª Div. Australiana Gen. Leslie Morshead)',
      note: 'ASSEDIO DI TOBRUK (dal 10–11 aprile 1941): Mentre Bardia e Sollum cadono in mano all\'Asse, la piazzaforte costiera di Tobruk resta tenacemente difesa dai "Ratti di Tobruk" della 9ª Divisione australiana del Gen. Leslie Morshead riforniti dalla Royal Navy. Gli assalti del 14 aprile e del 30 aprile vengono respinti, avviando un assedio di 241 giorni.',
    },
    s10: {
      name: 'Tobruk (Espugnata dall\'Asse il 21 Giugno 1942 — Caduta della Piazzaforte)',
      adminTitle: 'Regno d\'Italia / Panzerarmee Afrika — Piazzaforte di Tobruk (Conquistata il 21 Giugno 1942)',
      note: '21 GIUGNO 1942 — CADUTA DI TOBRUK: Dopo lo sfondamento della linea di Gazala–Bir Hakeim, le forze italo-tedesche di Erwin Rommel ed Ettore Bastico (Divisioni Ariete, Trieste e Littorio con la 15ª e 21ª Panzer) espugnano la piazzaforte catturando circa 33.000 prigionieri del Commonwealth e immensi depositi di carburante.',
    },
  },
  {
    id: 'LYKF',
    region: 'cufra',
    matchTerms: ['kufra', 'cufra'],
    baseName: 'Cufra (Oasi di Cufra / El Tag)',
    prewarAdmin: 'Territorio Militare del Sud (Comando Settore Sahariano di Cufra)',
    s0: 'Vasto comprensorio desertico sahariano comprendente l\'oasi di Cufra, santuario senussita occupato dalle truppe di Graziani nel 1931, Forte El Tag e aeroscalo per le rotte verso l\'Africa Orientale; a sud fronteggia l\'espansione verso il Tibesti prevista dagli accordi Mussolini–Laval (1935, mai ratificati).',
    s1: 'Postazione sahariana isolata della Compagnia Auto-Avio Sahariana di Cufra, snodo di volo strategico sulla direttrice mediterranea-AOI verso Asmara e Addis Abeba.',
    s2: 'Presidio meccanizzato del Territorio Militare del Sud presso il Forte di El Tag e pista d\'atterraggio desertica impiegata per collegamenti aerei con l\'Africa Orientale Italiana.',
    s3_5: 'Mantenuta nel Territorio Militare del Sud a regime speciale (esclusa dall\'annessione metropolitana costiera del 1939), vigilando i pozzi desertici tra il deserto libico, il Ciad francese e il Sudan.',
    s6: 'Allo scoppio della guerra nel giugno 1940, base della Compagnia Sahariana di Cufra incaricata di sorvegliare il confine del Ciad francese (poi schieratosi con la Francia Libera ad agosto 1940).',
    s7: 'Avamposto sahariano isolato esposto alle prime ricognizioni britanniche del Long Range Desert Group (LRDG) e della colonna Francia Libera proveniente dal Ciad.',
    s8: {
      name: 'Cufra (Conquistata dalla Colonna Leclerc — Francia Libera)',
      adminTitle: 'Forces Françaises Libres — Colonna Philippe Leclerc (Serment de Koufra, 1–2 marzo 1941)',
      note: '1° MARZO 1941 — CONQUISTA DI CUFRA: Partita da Fort-Lamy nel Ciad con sostegno del LRDG, la colonna FFL del Col. Philippe Leclerc de Hauteclocque espugna il Forte El Tag; il 2 marzo 1941 Leclerc pronuncia il celebre "Giuramento di Cufra" di non deporre le armi fino alla liberazione di Strasburgo.',
    },
    s9: {
      name: 'Cufra (Base Alleata Avanzata — Francia Libera & LRDG)',
      adminTitle: 'Forces Françaises Libres (FFL) & Long Range Desert Group (LRDG) — Oasi di Cufra',
      note: 'Dicembre 1941: saldamente in mano alleata dal marzo 1941, l\'oasi di Cufra funge da base avanzata di rifornimento nel deserto profondo per i raid del LRDG e della Francia Libera contro le oasi del Fezzan e la Cirenaica.',
    },
    s10: {
      name: 'Cufra (Base Transahariana Alleata — Preparativi Offensiva Fezzan)',
      adminTitle: 'Forces Françaises Libres (Gen. Philippe Leclerc) & LRDG / SAS — Base di Cufra',
      note: 'Agosto 1942: mentre l\'Asse combatte a El Alamein, Cufra rimane baluardo avanzato della Francia Libera e piattaforma per le incursioni a lungo raggio del LRDG su Gialo, Barce e il Sahara libico.',
    },
    s11: {
      name: 'Cufra (Base Logistica Force L verso il Fezzan — Novembre 1942)',
      adminTitle: 'Forces Françaises Libres (Force L — Gen. Philippe Leclerc) — Cufra',
      note: 'Novembre 1942: dall\'oasi di Cufra e dal Ciad muovono gli scaglioni della Force L di Leclerc per preparare l\'offensiva finale dell\'inverno 1942–43 contro i presidi italiani del Fezzan.',
    },
  },
  {
    id: 'LYMQ',
    region: 'sahara_military',
    matchTerms: ['murzuq', 'murzuch'],
    baseName: 'Murzuch (Fezzan Meridionale)',
    prewarAdmin: 'Territorio Militare del Sud (Circondario del Fezzan Meridionale — Murzuch)',
    s0: 'Antica capitale carovaniera del Fezzan meridionale e piazzaforte sahariana del Regio Esercito a guardia delle piste carovaniere verso il massiccio del Tibesti e il Ciad.',
    s1: 'Sede del distretto militare sahariano meridionale e punto di appoggio delle Compagnie Mehariste per il controllo dei confini interni e dell\'aeroporto sahariano.',
    s2: 'Rafforzamento della guarnigione di Murzuch e del campo d\'aviazione desertico nell\'ambito dell\'organizzazione sahariana del Governatorato Generale della Libia.',
    s3_5: 'Inquadrata nel Territorio Militare del Sud a giurisdizione militare speciale (esclusa dalle 4 province metropolitane del 1939), con pattugliamento motorizzato sul fronte ciadiano.',
    s6: 'Mobilitazione difensiva delle unità sahariane di Murzuch allo scoppio del conflitto (giugno 1940), poi messa in allerta dopo l\'adesione del Ciad alla Francia Libera (agosto 1940).',
    s7: 'Avamposto avanzato sahariano esposto al monitoraggio aereo delle forze francesi libere dal Ciad.',
    s8: 'Teatro dell\'audace incursione combinata franco-britannica (Colonna d\'Ornano / LRDG dell\'11 gennaio 1941) contro il forte e il campo d\'aviazione di Murzuch, che rafforza la vigilanza delle Compagnie Auto-Avio Sahariane.',
    s9: 'Presidio meridionale del Fezzan rafforzato da velivoli da ricognizione desertica per contrastare le incursioni della Francia Libera provenienti dal Tibesti e da Cufra.',
    s10: 'Caposaldo avanzato della linea sahariana meridionale italiana lungo i confini desertici con il Ciad, sotto costante pressione delle pattuglie del LRDG britannico.',
    s11: 'Baluardo meridionale del Fezzan esposto all\'imminente offensiva invernale della Force L del Gen. Leclerc proveniente dal Ciad (novembre–dicembre 1942).',
  },
  {
    id: 'LYSB',
    region: 'sahara_military',
    matchTerms: ['sabha', 'sebha'],
    baseName: 'Sebha (Forte Elena — Capoluogo del Fezzan)',
    prewarAdmin: 'Territorio Militare del Sud (Comando Militare del Fezzan — Forte Elena)',
    s0: 'Cuore politico e militare del Fezzan centrale dominato dal Forte Elena; perno delle truppe mehariste cammellate e della rete di comunicazioni radiotelegrafiche sahariane.',
    s1: 'Base centrale dell\'amministrazione militare fezzanese; ampliamento delle piste camionabili verso la Giofra (Hon) e dei campi di atterraggio per i reparti aerei sahariani.',
    s2: 'Potenziamento delle infrastrutture logistiche e di presidio a Forte Elena nel quadro del consolidamento sahariano promosso da Italo Balbo.',
    s3_5: 'Capoluogo del settore del Fezzan all\'interno del Territorio Militare del Sud (escluso dalla riforma metropolitana costiera del 1939), sede del comando desertico avanzato.',
    s6: 'Centro di coordinamento del fronte sahariano occidentale verso l\'Algeria francese e meridionale verso il Ciad all\'entrata in guerra dell\'Italia (giugno 1940).',
    s7: 'Sede dei comandi delle Compagnie Sahariane dopo la svolta gollista dell\'Africa Equatoriale Francese, trasformando il deserto meridionale in fronte attivo.',
    s8: 'Comando tattico per la difesa in profondità del Fezzan e per il rifornimento dei presidi di Murzuch, Umm el-Araneb e Ghat dopo la caduta di Cufra (marzo 1941).',
    s9: 'Ridotto militare centrale sahariano impegnato a contenere i raid motorizzati della Francia Libera su Uau el-Chebir e Tedjerhi.',
    s10: 'Retrovia aerea e comando sahariano meridionale del Governatorato Generale durante l\'estate 1942 mentre il grosso dello sforzo bellico converge verso El Alamein.',
    s11: 'Sotto pressione incrociata dall\'occupazione alleata del Nordafrica francese (Torch, novembre 1942) e dalla risalita della Force L dal Ciad verso il Fezzan.',
  },
  {
    id: 'LYWS',
    region: 'sahara_military',
    matchTerms: ['shati', 'sciati', 'brak'],
    baseName: 'Uadi Sciati (Oasi di Brak)',
    prewarAdmin: 'Territorio Militare del Sud (Presidio Sahariano di Brak)',
    s0: 'Valle di oasi fossili nel Fezzan settentrionale centrata su Brak; vitale cerniera di approvvigionamento idrico e carovaniero fra la Giofra e Sebha.',
    s1: 'Collegamento camionabile migliorato lungo la pista desertica Hon–Brak–Sebha per sostenere gli spostamenti delle truppe sahariane.',
    s2: 'Mantenimento dei presidi oasieni e dei pozzi di transito lungo la direttrice nord-sud verso il Fezzan centrale.',
    s3_5: 'Parte integrante del Territorio Militare del Sud a gestione militare speciale (R.D.L. n. 70/1939), a presidio dell\'accesso settentrionale al Fezzan.',
    s6: 'Linea logistica interna dell\'Uadi Sciati mobilitata a sostegno delle guarnigioni meridionali del Fezzan dall\'estate 1940.',
    s7: 'Fascia di transito vitale per colonne di autocarri tra la Tripolitania interna e Forte Elena a Sebha.',
    s8: 'Retrovia sahariana utilizzata dai reparti della Compagnia Auto-Avio Sahariana e dai piccoli convogli di rinforzo verso Sebha e Murzuch nel 1941.',
    s9: 'Settore d\'appoggio alle pattuglie mobili che sorvegliano il deserto dello Sciati e gli accessi verso Gadames e Mizda.',
    s10: 'Cerniera desertica arretrata protetta dalla distanza, essenziale per il mantenimento dell\'ultima presenza italiana nel Fezzan nell\'estate 1942.',
    s11: 'Linea d\'arroccamento tra Sebha e la Tripolitania meridionale esposta all\'avanzata alleata e francese libera dal novembre 1942.',
  },
  {
    id: 'LYWD',
    region: 'sahara_military',
    matchTerms: ['hayaa', 'agial', 'ubari'],
    baseName: 'Uadi el-Agial (Ubari e Valle dei Garamanti)',
    prewarAdmin: 'Territorio Militare del Sud (Presidio Sahariano di Ubari)',
    s0: 'Valle storica dei Garamanti (antica Germa / Garama) nel Fezzan occidentale; presidio di Ubari lungo l\'antica carovaniera da Sebha verso Ghat.',
    s1: 'Pattugliamento meharista dei passi dell\'erg sabbioso e prima valorizzazione archeologica delle necropoli garamantiche lungo la valle.',
    s2: 'Presidio oasieno di collegamento tra Forte Elena e il confine sud-occidentale verso il Tassili algerino.',
    s3_5: 'Incluso nel Territorio Militare del Sud (escluso dalle province metropolitane costiere 1939) a difesa del corridoio desertico tra Sebha e Ghat.',
    s6: 'Settore desertico di sorveglianza lungo la direttrice occidentale Ubari–Serdeles all\'apertura delle ostilità contro la Francia (giugno 1940).',
    s7: 'Zona tenuta da distaccamenti mobili italiani e truppe ausiliarie libiche a guardia dei pozzi dell\'Uadi el-Agial.',
    s8: 'Cerniera strategica di collegamento logistico tra Sebha e i presidi confinari occidentali di Ghat e Serdeles dopo l\'avvio dei raid alleati nel Sahara.',
    s9: 'Presidio di valle mantenuto sotto stretto controllo militare italiano durante le incursioni francesi nel Fezzan meridionale.',
    s10: 'Oasi presidiate e piste di collegamento sorvegliate dall\'aviazione sahariana italiana durante la campagna del 1942.',
    s11: 'Corridoio esposto alla duplice minaccia proveniente dall\'Algeria post-Torch (novembre 1942) e dalla Force L in movimento verso Sebha.',
  },
  {
    id: 'LYGT',
    region: 'sahara_military',
    matchTerms: ['ghat'],
    baseName: 'Ghat (Sahara Sud-Occidentale / Tassili)',
    prewarAdmin: 'Territorio Militare del Sud (Presidio di Frontiera di Ghat)',
    s0: 'Oasi fortezza all\'estremità sud-occidentale della Libia al triplice confine con Algeria (F_NAF) e Niger (F_AOF); presidiata dalla Compagnia Sahariana nel Forte Saraceno.',
    s1: 'Avamposto confinario del Sahara occidentale libico a controllo dei valichi del Tassili n\'Ajjer verso Djanet e il Sahara francese.',
    s2: 'Rafforzamento della guarnigione del Forte di Ghat e delle piste di collegamento verso Ubari e Gadames durante le tensioni italo-francesi del 1938.',
    s3_5: 'Mantenuta nel Territorio Militare del Sud (regime speciale 1939), con pattugliamenti motorizzati verso il confine algerino e del Niger.',
    s6: 'Nel giugno 1940 breve attività operativa alla frontiera di Djanet prima dell\'armistizio di Villa Incisa con la Francia e della vigilanza armistiziale (CIAF).',
    s7: 'Presidio desertico mantenuto con rifornimenti aerei e carovanieri lungo l\'estrema frontiera sud-occidentale sotto regime Vichy sul versante algerino.',
    s8: 'Sorveglianza armata lungo l\'erg orientale mentre il fronte caldo sahariano si sposta a sud-est dopo la perdita di Cufra.',
    s9: 'Avamposto isolato di estrema frontiera collegato a Sebha e Serdeles, rifornito via terra con scorte di automezzi sahariani.',
    s10: 'Presidio di Ghat in stato d\'allerta contro infiltrazioni sahariane lungo il confine del Niger francese.',
    s11: 'Dopo lo sbarco alleato Torch (novembre 1942) e il passaggio del Nordafrica francese agli Alleati, l\'oasi di Ghat rimane direttamente accerchiata a ovest dall\'Algeria gollista.',
  },
  {
    id: 'LYJU',
    region: 'sahara_military',
    matchTerms: ['jufrah', 'jufra', 'giofra', 'hon', 'socna', 'uaddan'],
    baseName: 'Giofra (Hon, Socna e Uaddan)',
    prewarAdmin: 'Territorio Militare del Sud (Comando Superiore Sahariano — Hon)',
    s0: 'Oasi strategiche della Giofra nel cuore della Libia; capoluogo a Hon, sede del Quartier Generale del Comando Militare del Territorio del Sud e campo d\'aviazione sahariano.',
    s1: 'Nodo viario centrale tra Misurata/Sirte e il Fezzan; potenziamento dell\'aeroporto militare di Hon e dei depositi logistici sahariani.',
    s2: 'Quartier Generale amministrativo e militare del Sahara Libico (Hon), dotato di centri di trasmissione, magazzini e piste per le Compagnie Auto-Avio Sahariane.',
    s3_5: 'Sede del Comando del Territorio Militare del Sud (distinto dalle quattro province costiere metropolitane istituite dal R.D.L. n. 70/1939).',
    s6: 'Centro di mobilitazione e schieramento aereo delle forze sahariane all\'entrata in guerra dell\'Italia (giugno 1940) sotto il comando superiore libico.',
    s7: 'Base di partenza aerea e motorizzata verso Cufra, Gialo e il Fezzan durante i primi mesi del conflitto nordafricano.',
    s8: 'Dopo la perdita di Cufra (marzo 1941), Hon diviene il principale perno difensivo avanzato e scalo aereo per proteggere il Fezzan e le retrovie della Sirtica.',
    s9: 'Cruciale raccordo interno tra le unità di Rommel attestate sulla linea di El Agheila (dicembre 1941) e i presidi sahariani del Fezzan.',
    s10: 'Base aerea arretrata delle Compagnie Sahariane dell\'Aeronautica per il pattugliamento desertico mentre l\'Armata corazzata avanza in Egitto (estate 1942).',
    s11: 'Snodo chiave esposto al ripiegamento generale delle forze dell\'Asse dalla Sirtica e all\'avanzata alleata verso la Tripolitania meridionale (novembre 1942).',
  },
  {
    id: 'LYSR',
    region: 'tripolitania_coastal',
    matchTerms: ['surt', 'sirte', 'fileni', 'nofilia', 'agheila'],
    baseName: 'Sirte ed El Agheila (Sirtica)',
    prewarAdmin: 'Commissariato Generale di Misurata (Circondario della Sirtica)',
    s0: 'Snodo costiero desertico lungo il Golfo della Sirte, cerniera geografica tra Tripolitania e Cirenaica attraversata dal cantiere della nuova litoranea libica; presidi a Sirte, Nofilia ed El Agheila.',
    s1: 'Completamento della Via Balbia lungo il deserto della Sirtica e inaugurazione monumentale dell\'Arco dei Fileni presso Ras Lanuf nel marzo 1937 al confine storico fra Tripolitania e Cirenaica.',
    s2: 'Arteria vitale di collegamento fra le colonne colonizzatrici dei "Ventimila" dirette verso Misurata/Tripoli e la Cirenaica orientale.',
    s3_5: 'Dal gennaio 1939 inclusa nella Provincia metropolitana di Misurata ("Quarta Sponda"), con basi militari costiere e campi d\'aviazione d\'appoggio lungo il golfo.',
    s6: 'Corridoio di transito prioritario per colonne motorizzate e artiglierie dirette verso la frontiera egiziana nel giugno 1940.',
    s7: 'Fascia litoranea percorsa dai rifornimenti destinati all\'offensiva autunnale della 10ª Armata in Cirenaica ed Egitto.',
    s8: {
      name: 'Sirte ed El Agheila (Trampolino della Controffensiva di Rommel)',
      adminTitle: 'Regno d\'Italia / Deutsches Afrikakorps — Stretta di El Agheila e Arco dei Fileni',
      note: 'Il 24 marzo 1941 dalla stretta paludosa-desertica di El Agheila e dall\'Arco dei Fileni il Gen. Erwin Rommel lancia la prima controffensiva italo-tedesca (Sonnenblume), travolgendo Mersa El Brega e riconquistando la Cirenaica.',
    },
    s9: {
      name: 'Linea Difensiva di El Agheila & Sirtica (Dicembre 1941)',
      note: 'Dicembre 1941: dopo il ripiegamento dall\'Operazione Crusader, la Panzerarmee italo-tedesca si attesta solidamente sulla posizione naturale di El Agheila–Mersa El Brega, bloccando l\'8ª Armata britannica e preparando la controffensiva del gennaio 1942.',
    },
    s10: {
      name: 'Sirtica e Sirte (Retrovia Costiera — Estate 1942)',
      note: 'Agosto 1942: con il fronte avanzato fino a El Alamein in Egitto, la Sirtica e la base aerea di Sirte tornano retrovia sicura e arteria stradale logistica lungo la Via Balbia.',
    },
    s11: {
      name: 'Linea di El Agheila — Ultimo Sbarramento Orientale (Novembre 1942)',
      note: 'Fine novembre 1942: dopo la perdita della Cirenaica seguita a El Alamein, i superstiti della Panzerarmee Afrika di Rommel e Bastico si attestano brevemente tra Marsa El Brega ed El Agheila prima dell\'ulteriore ripiegamento su Buerat e la Tripolitania.',
    },
  },
  {
    id: 'LYWA',
    region: 'cyrenaica_coastal',
    matchTerms: ['oases', 'wahat', 'gialo', 'augila', 'giarabub'],
    baseName: 'Al Wahat (Oasi di Gialo, Augila e Giarabub)',
    prewarAdmin: 'Territorio Militare del Sud / Cirenaica (Oasi di Gialo e Giarabub)',
    s0: 'Arcipelago di oasi desertiche cirenaiche comprendente Gialo, Augila, Marada e la città santa senussita di Giarabub, ceduta dall\'Egitto all\'Italia nel 1925 e fortificata sul confine orientale.',
    s1: 'Presidio permanente del Regio Esercito e delle truppe libiche a guardia del deserto cirenaico orientale, punto di partenza per pattugliamenti verso l\'oasi egiziana di Siwa.',
    s2: 'Rafforzamento della piazzaforte confinaria di Giarabub e delle piste desertiche di collegamento con la Via Balbia verso Agedabia e Tobruk.',
    s3_5: 'Settore desertico militare annesso alla difesa orientale della Libia alla vigilia del secondo conflitto mondiale, con presidi a Giarabub e Gialo.',
    s6: 'Dalla dichiarazione di guerra (10 giugno 1940), la guarnigione di Giarabub fronteggia le prime incursioni motorizzate britanniche e del LRDG lungo la frontiera desertica.',
    s7: 'Oasi di confine sempre più esposte e rifornite per via aerea e carovaniera durante la campagna d\'autunno verso Sidi Barrani.',
    s8: {
      name: 'Al Wahat — Giarabub (Eroica Resistenza del Magg. Castagna) e Gialo',
      adminTitle: 'Regno d\'Italia — Settore Sahariano di Gialo e Sacca di Giarabub (Dic 1940 – 21 Mar 1941)',
      note: 'L\'oasi fortificata di Giarabub, isolata nel deserto per oltre tre mesi dopo il crollo della 10ª Armata, fu strenuamente difesa dal presidio italiano del Magg. Salvatore Castagna fino all\'assalto finale australiano del 21 marzo 1941; Gialo resta invece caposaldo sahariano meridionale dell\'Asse.',
    },
    s10: {
      name: 'Al Wahat & Oasi di Gialo (Fianco Sahariano dell\'Asse — Estate 1942)',
      note: 'Riconquistate Gialo e Giarabub nell\'offensiva dell\'Asse del 1942, le oasi meridionali della Cirenaica fungono da retrovia desertica di copertura per la spinta in Egitto (fino all\'attacco britannico su Gialo del settembre 1942).',
    },
  },
  {
    id: 'LYJA',
    region: 'cyrenaica_coastal',
    matchTerms: ['akhdar', 'cirene', 'cyrene', 'apollonia'],
    baseName: 'Gebel el-Achdar (Cirene / Beda Littoria)',
    prewarAdmin: 'Commissariato Generale di Derna (Circondario del Gebel — Cirene)',
    s0: 'Altopiano fertile della Cirenaica settentrionale ("Montagna Verde"); culla archeologica di Cirene e Apollonia con i primi villaggi dell\'Ente per la Colonizzazione della Cirenaica ("Beda Littoria", "Luigi Razza", "Giovanni Berta").',
    s1: 'Completamento della litoranea e delle diramazioni stradali montane tra Apollonia, Cirene e Derna; espansione delle aziende agricole cerealicole ed olivicole.',
    s2: 'Ottobre 1938: intenso popolamento del Gebel da parte dei coloni "Ventimila" nei nuovi centri rurali di Beda Littoria, Luigi Razza e D\'Annunzio sull\'altopiano verde.',
    s3_5: 'Dal gennaio 1939 inserito nella Provincia metropolitana di Derna ("Quarta Sponda"), integrando il distretto agricolo colono nell\'amministrazione del Regno.',
    s6: 'Altopiano di retrovia mobilitato nell\'estate 1940 per fornire truppe locali e apprestamenti difensivi sulla dorsale cirenaica.',
    s7: 'Base di stazionamento e transito delle colonne dirette lungo i due rami della Via Balbia verso il fronte egiziano (autunno 1940).',
    s8: 'Aprile 1941: attraversato fulmineamente dal Kampfgruppe Schwerin / DAK e dalla Divisione Ariete nella corsa su Derna, Mechili e Tobruk (evacuazione parziale dei coloni italiani iniziata nel 1941–42).',
    s10: 'Agosto 1942: altopiano nuovamente controllato dall\'Asse dal febbraio 1942 e sede di presidi italo-tedeschi di sorveglianza costiera e antipartigiana tra Cirene e Apollonia.',
  },
  {
    id: 'LYMJ',
    region: 'cyrenaica_coastal',
    matchTerms: ['marj', 'barce'],
    baseName: 'Barce (Al Marj — Piana di Barce)',
    prewarAdmin: 'Commissariato Generale di Bengasi (Circondario di Barce)',
    s0: 'Conca cerealicola della Cirenaica occidentale servita dalla ferrovia per Bengasi; sede delle prime fattorie sperimentali dell\'Ente per la Colonizzazione della Cirenaica.',
    s1: 'Consolidamento dell\'infrastruttura agraria e collegamento con l\'altopiano del Gebel tramite il tronco superiore della Via Balbia (1937).',
    s2: 'Ottobre 1938: fondazione e ampliamento dei villaggi rurali per i "Ventimila" nella piana di Barce ("Maddalena", "Oberdan", "Baracca") e sviluppo degli aeroporti campali.',
    s3_5: 'Dal gennaio 1939 compresa nella Provincia metropolitana di Bengasi ("Quarta Sponda"), cuore della granicoltura coloniale cirenaica.',
    s6: 'Campo d\'aviazione avanzato della Regia Aeronautica e nodo ferroviario-stradale subito dietro la prima linea cirenaica all\'entrata in guerra (giugno 1940).',
    s7: 'Centro logistico e ospedaliero arretrato delle forze italiane operanti verso il confine egiziano (autunno 1940).',
    s8: 'Riconquistata nell\'aprile 1941 dalla manovra avvolgente di Rommel e del Regio Esercito su Bengasi–Barce, tornando caposaldo aeroportuale e viario verso Derna.',
    s10: 'Agosto 1942: importante base aerea avanzata italo-tedesca (aeroporto di Barce) a supporto dei rifornimenti verso il fronte egiziano (poco prima del celebre raid SAS/LRDG di settembre 1942).',
  },
  {
    id: 'LYMB',
    region: 'tripolitania_coastal',
    matchTerms: ['marqab', 'homs', 'leptis', 'tarhuna', 'cussabat'],
    baseName: 'Homs e Leptis Magna (Tripolitania Settentrionale)',
    prewarAdmin: 'Commissariato Generale di Tripoli (Circondario di Homs)',
    s0: 'Distretto litoraneo della Tripolitania comprendente il porto di Homs, gli scavi romani di Leptis Magna valorizzati dall\'archeologia italiana e le alture olivicole di Tarhuna e Cussabat.',
    s1: 'Attraversata dalla nuova Via Balbia asfaltata (1937), che facilita gli spostamenti da Tripoli verso Misurata e il turismo archeologico su Leptis Magna.',
    s2: 'Ottobre 1938: insediamento di nuovi nuclei rurali dei "Ventimila" nei comprensori agricoli di Tarhuna, Cussabat e della fascia costiera di Homs ("Breveglieri").',
    s3_5: 'Dal gennaio 1939 integrata nella Provincia metropolitana di Tripoli ("Quarta Sponda", R.D.L. n. 70/1939), con rafforzamento costiero intorno a Homs.',
    s6: 'Zona di retrovia e acquartieramento truppe alla vigilia ed esordio della guerra mediterranea nel giugno 1940.',
    s7: 'Asse di transito delle autocolonne da Tripoli verso la Sirtica e deposito rifornimenti agricoli dell\'Africa Settentrionale.',
    s8: 'Piazza secondaria d\'appoggio lungo la litoranea tripolina per lo spostamento verso est delle forze italo-tedesche dopo lo sbarco a Tripoli (marzo–aprile 1941).',
    s9: 'Retrovia sicura della Tripolitania sotto il comando di Ettore Bastico durante la stabilizzazione del fronte a El Agheila (dicembre 1941).',
    s10: 'Distretto agricolo costiero al servizio dell\'approvvigionamento militare della Tripolitania nell\'estate 1942.',
    s11: 'Area di schieramento difensivo sull\'altipiano di Tarhuna–Homs predisposta per coprire la ritirata delle forze italo-tedesche verso Tripoli (fine novembre 1942).',
  },
  {
    id: 'LYZA',
    region: 'tripolitania_coastal',
    matchTerms: ['zawiyah', 'zawia', 'sabratha', 'sorman'],
    baseName: 'Zawiya e Sabratha (Tripolitania Costiera)',
    prewarAdmin: 'Commissariato Generale di Tripoli (Circondario di Zawiya)',
    s0: 'Distretto agricolo e costiero subito ad ovest di Tripoli tra le oasi di Zawiya, Sorman e gli scavi archeologici romani di Sabratha; viticoltura e olivicoltura di concessione.',
    s1: 'Collegato a Tripoli e al confine tunisino dal tracciato occidentale della Via Balbia (1937) e dalla ferrovia costiera fino a Zuara.',
    s2: 'Ottobre 1938: inaugurazione dei comprensori rurali di "Oliveti", "Giordani" e "Corradini" per accogliere i coloni dei "Ventimila" a ovest della capitale.',
    s3_5: 'Dal gennaio 1939 parte integrante della Provincia metropolitana di Tripoli ("Quarta Sponda"), con postazioni di copertura verso la frontiera tunisina (1939).',
    s6: 'Settore d\'appoggio della 5ª Armata italiana schierata alla frontiera tunisina nel giugno 1940 fino all\'armistizio di Villa Incisa (24 giugno 1940).',
    s7: 'Zona rurale smilitarizzata lungo il confine armistiziale con la Tunisia di Vichy, produttiva di viveri per le guarnigioni di Tripoli.',
    s8: 'Area di sosta, addestramento e decentramento logistico per le unità italiane e dell\'Afrikakorps sbarcate al porto di Tripoli (primavera 1941).',
    s9: 'Deposito decentrato di munizioni e carburante a ovest di Tripoli per sfuggire alle incursioni della RAF sul porto cittadino (fine 1941).',
    s10: 'Retrovia agricola tripolina e nodi di transito ferroviario–stradale durante le operazioni estive del 1942.',
    s11: 'Dopo Torch (novembre 1942), il settore di Zawiya e Sabratha torna vitale arteria di ripiegamento verso la Tunisia attraverso il corridoio di Zuara.',
  },
  {
    id: 'LYNQ',
    region: 'tripolitania_coastal',
    matchTerms: ['nuqat', 'zuara', 'zuwarah', 'pisida'],
    baseName: 'Zuara e Frontiera Tunisina (Pisida)',
    prewarAdmin: 'Commissariato Generale di Tripoli (Circondario di Frontiera di Zuara)',
    s0: 'Distretto costiero dell\'estrema Tripolitania occidentale al confine con il protettorato francese di Tunisia (davanti alla Ligne Mareth); porto peschereccio di Zuara e caposaldo di Pisida.',
    s1: 'Completamento dell\'estremo tratto occidentale della Via Balbia fino a Ras Agedir e potenziamento delle batterie confinarie lungo il confine tunisino.',
    s2: 'Fortificazioni difensive lungo la frontiera occidentale libico-tunisina in risposta al rafforzamento francese della Linea del Mareth.',
    s3_5: 'Dal gennaio 1939 compreso nella Provincia metropolitana di Tripoli ("Quarta Sponda"); massimo spiegamento di copertura della 5ª Armata sul fronte occidentale (settembre 1939).',
    s6: 'Settore operativo del fronte occidentale nordafricano (giugno 1940) fra truppe italiane e francesi della Tunisia prima della smilitarizzazione imposta dall\'Armistizio di Villa Incisa.',
    s7: 'Posto di frontiera armistiziale tra Libia Italiana e Tunisia francese sotto controllo di Vichy, vigilato dalla Commissione Italiana d\'Armistizio.',
    s8: 'Perno occidentale di sicurezza sul mare a ridosso del confine tunisino mentre tutte le unità mobili muovono ad est verso Tobruk.',
    s9: 'Transito dei convogli clandestini/tollerati di rifornimenti sbarcati nei porti tunisini e avviati verso Tripoli nel tardo 1941.',
    s10: 'Frontiera armistiziale stabile a ridosso della Tunisia mentre le forze italo-tedesche tentano lo sfondamento in Egitto.',
    s11: 'Novembre 1942: subito dopo gli sbarchi anglo-americani Torch in Nordafrica (8 nov) e l\'occupazione tedesca della Tunisia, Zuara–Pisida torna il corridoio logistico chiave tra Tripolitania e Tunisia.',
  },
  {
    id: 'LYNL',
    region: 'tripolitania_coastal',
    matchTerms: ['nalut', 'cabao', 'giado'],
    baseName: 'Nalut e Gebel Nefusa Occidentale (Cabao / Giado)',
    prewarAdmin: 'Commissariato Generale di Tripoli (Circondario di Nalut)',
    s0: 'Bastione montano fortificato all\'estremità occidentale del Gebel Nefusa a ridosso della frontiera tunisina (Cabao, Giado, Qasr di Nalut); snodo delle piste desertiche verso Gadames.',
    s1: 'Fortificazione campale dei passi montani di Dehibat e Nalut lungo l\'altipiano occidentale e collegamento stradale potenziato con il comando di Tripoli.',
    s2: 'Completamento delle opere d\'arresto di frontiera contro la Tunisia francese durante la mobilitazione parziale del 1938.',
    s3_5: 'Dal gennaio 1939 parte della Provincia metropolitana di Tripoli ("Quarta Sponda"), caposaldo montano della 5ª Armata italiana alla vigilia del conflitto.',
    s6: 'Schieramento di copertura montana lungo la frontiera tunisina nel giugno 1940 durante le brevissime operazioni pre-armistiziali.',
    s7: 'Presidio di frontiera sull\'altopiano del Gebel occidentale a ridosso del confine tunisino (Dehibat / Foum Tatahouine), sotto vigilanza di Vichy.',
    s8: 'Guarnigione territoriale di sorveglianza d\'altura e controllo delle carovaniere montano-desertiche dirette a Gadames.',
    s9: 'Presidio d\'arroccamento interno occidentale nel dispositivo territoriale del comando libico del Maresciallo Bastico.',
    s10: 'Retrovia montana del settore tripolino durante l\'avanzata dell\'Asse nell\'estate 1942; a Giado è istituito un campo di internamento per civili ebrei della Cirenaica.',
    s11: 'Novembre 1942: posizione strategica elevata sul fianco meridionale della via di comunicazione verso il sud tunisino (Ligne Mareth) dopo gli sbarchi alleati in Nordafrica.',
  },
  {
    id: 'LYJG',
    region: 'tripolitania_coastal',
    matchTerms: ['gharbi', 'garian', 'nefusa', 'iefren', 'mizda'],
    baseName: 'Gebel Nefusa (Garian, Mizda e Iefren)',
    prewarAdmin: 'Commissariato Generale di Tripoli (Circondario di Garian)',
    s0: 'Altopiano della Tripolitania interna centrato su Garian (famose abitazioni trogloditiche); coltivazioni olivicole berbere, comando militare d\'altura e accesso verso Mizda.',
    s1: 'Potenziamento della rotabile di montagna Garian–Mizda e dei centri sperimentali per la tabacchicoltura (Tigrinna) e l\'olivicoltura collinare.',
    s2: 'Insediamento di nuove comunità rurali italiane dell\'ECL sul Gebel centrale ("Tigrinna" e Iefren) con i convogli dei "Ventimila".',
    s3_5: 'Dal gennaio 1939 integrato nella Provincia metropolitana di Tripoli ("Quarta Sponda"), fornendo acque e risorse agricole d\'altura alle guarnigioni tripoline.',
    s6: 'Perno difensivo arretrato sull\'altopiano interno a protezione della piana di Tripoli all\'entrata in guerra (giugno 1940).',
    s7: 'Via di transito interna per i rifornimenti diretti dall\'altopiano verso i presidi del Territorio Militare del Sud tramite Mizda.',
    s8: 'Sede di ospedali militari militari decentrati, depositi d\'artiglieria e campi di prigionia per catturati del fronte libico-egiziano.',
    s9: 'Area d\'appoggio difensiva sul margine meridionale tripolino lungo le piste che portano a Hon e alla Giofra.',
    s10: 'Distretto interno di retrovia durante le campagne del 1942, cerniera tra la Tripolitania costiera e il Sahara libico.',
    s11: 'Linea d\'altura essenziale nel novembre 1942 quale futuro bastione naturale di ripiegamento tra la Gefara e la Sirtica occidentale.',
  },
  {
    id: 'LYJI',
    region: 'tripolitania_coastal',
    matchTerms: ['jifarah', 'jifara', 'gefara', 'azizia'],
    baseName: 'Piana della Gefara (El-Azizia / Suani Ben Adem)',
    prewarAdmin: 'Commissariato Generale di Tripoli (Circondario della Gefara)',
    s0: 'Piana alluvionale suburbana immediatamente a sud di Tripoli; fascia delle grandi concessioni agricole italiane e snodo ferroviario–stradale verso El-Azizia (celebre per i picchi termici mondiali) e il Gebel.',
    s1: 'Espansione delle tenute di bonifica e irrigazione nella Gefara, affiancate dalle piste militari verso Castel Benito e il Gebel Garian.',
    s2: 'Ottobre 1938: forte concentrazione di poderi agricoli destinati ai coloni "Ventimila" nei centri rurali di Bianchi, Giordani e Suani Ben Adem.',
    s3_5: 'Dal gennaio 1939 compresa nella Provincia metropolitana di Tripoli ("Quarta Sponda"), fascia periurbana e aeroportuale vitale della capitale regionale.',
    s6: 'Retrovia immediata e fascia d\'addestramento attorno all\'aeroporto militare di Castel Benito (allo scoppio della guerra nel giugno 1940).',
    s7: 'Principale parco automezzi, depositi di carburante dispersi nella boscaglia d\'acacie e centri di smistamento per il fronte egiziano.',
    s8: 'Area di sbarco aereo, concentramento e acclimatazione delle prime unità tedesche del Deutsches Afrikakorps attorno a Suani Ben Adem e Castel Benito (febbraio–marzo 1941).',
    s9: 'Retrovia aeroportuale vitale (Castel Benito / El-Azizia) per i velivoli da trasporto e da caccia italiani e della Luftwaffe che coprono i convogli su Tripoli.',
    s10: 'Base logistica aerea e centro agricolo suburbano al servizio del ponte aereo mediterraneo verso la Sicilia e Creta nell\'estate 1942.',
    s11: 'Fascia esterna meridionale della cintura difensiva di Tripoli minacciata dopo il crollo di El Alamein e lo sbarco alleato in Nordafrica (novembre 1942).',
  },
];

function getPhaseKey(step: number): 's0' | 's1' | 's2' | 's3_5' | 's6' | 's7' | 's8' | 's9' | 's10' | 's11' {
  if (step <= 0) return 's0';
  if (step === 1) return 's1';
  if (step === 2) return 's2';
  if (step <= 5) return 's3_5';
  if (step === 6) return 's6';
  if (step === 7) return 's7';
  if (step === 8) return 's8';
  if (step === 9) return 's9';
  if (step === 10) return 's10';
  return 's11';
}

function buildDistrictResult(rec: LibyaDistrictRecord, step: number): LibyaToponymEntry {
  const pk = getPhaseKey(step);
  const isMetroCoast = rec.region === 'tripolitania_coastal' || rec.region === 'cyrenaica_coastal';

  const phaseVal = (rec as any)[pk];
  if (phaseVal && typeof phaseVal === 'object') {
    return {
      name: phaseVal.name || rec.baseName,
      adminTitle: phaseVal.adminTitle || adminLibyaCommand(step, rec.prewarAdmin, isMetroCoast),
      note: phaseVal.note || rec.s7,
    };
  }

  let noteText = typeof phaseVal === 'string' ? phaseVal : '';
  if (!noteText && pk === 's9') {
    noteText = typeof rec.s8 === 'string' ? rec.s8 : (rec.s8 && typeof rec.s8 === 'object' ? rec.s8.note || '' : '');
  }
  if (!noteText && pk === 's10') {
    noteText = typeof rec.s8 === 'string' ? rec.s8 : '';
  }
  if (!noteText) noteText = rec.s7;

  let displayName = rec.baseName;
  if (step >= 3 && step <= 5 && isMetroCoast && !displayName.includes('Quarta Sponda')) {
    displayName = `${rec.baseName} — Provincia Metropolitana ("Quarta Sponda")`;
  } else if (step === 2 && isMetroCoast) {
    displayName = `${rec.baseName} (Colonizzazione dei "Ventimila")`;
  }

  return {
    name: displayName,
    adminTitle: adminLibyaCommand(step, rec.prewarAdmin, isMetroCoast),
    note: noteText,
  };
}

/**
 * Risolve il toponimo storico, il comando amministrativo e la nota militare della Libia Italiana
 * (22 province LY* + entità aggregate Tripoli/Cirenaica/Fezzan/Libia) negli step 0–11.
 */
export function resolveLibyaColonyToponym(id: string, normKey: string, step: number): LibyaToponymEntry {
  const cleanId = String(id || '').trim().toUpperCase();
  for (const rec of LIBYA_DISTRICTS) {
    if (cleanId === rec.id) {
      return buildDistrictResult(rec, step);
    }
  }
  for (const rec of LIBYA_DISTRICTS) {
    if (rec.matchTerms.some((t) => normKey.includes(t))) {
      return buildDistrictResult(rec, step);
    }
  }

  if (normKey.includes('cyrenaica') || normKey.includes('cirenaica')) {
    return buildDistrictResult(LIBYA_DISTRICTS[1], step);
  }
  if (normKey.includes('fezzan')) {
    return buildDistrictResult(LIBYA_DISTRICTS[7], step);
  }
  if (normKey.includes('tripolitania')) {
    return buildDistrictResult(LIBYA_DISTRICTS[0], step);
  }

  // Fallback aggregato per l'entità "Libya" nel periodo italiano (s0..s11)
  if (step === 0) {
    return {
      name: 'Libia Italiana (Colonia Unificata — Governo Generale di Italo Balbo)',
      adminTitle: `Regno d'Italia — Governo Generale della Libia (${GOV_ITALO_BALBO})`,
      note: 'Possedimento nordafricano unificato nel 1934 (Tripolitania, Cirenaica e Territorio Militare del Sud) sotto il Governatore Generale Italo Balbo; avvio dei grandi cantieri della strada litoranea libica e della colonizzazione demografica.',
    };
  }
  if (step === 1) {
    return {
      name: 'Libia Italiana (Via Balbia & Colonizzazione Rurale)',
      adminTitle: `Regno d'Italia — Governo Generale della Libia (${GOV_ITALO_BALBO})`,
      note: 'Dopo l\'inaugurazione della litoranea Via Balbia (marzo 1937) e dell\'Arco dei Fileni lungo la Sirtica, la colonia consolida la rete dei villaggi agricoli dell\'ECL e potenzia porti e campi aerei di Tripoli e Bengasi.',
    };
  }
  if (step === 2) {
    return {
      name: 'Libia Italiana (Sbarco dei "Ventimila" — Ott 1938)',
      adminTitle: `Regno d'Italia — Governo Generale della Libia (${GOV_ITALO_BALBO})`,
      note: '28–29 ottobre 1938: sbarcano a Tripoli e Bengasi i "Ventimila" coloni italiani organizzati da Italo Balbo per popolare i nuovi comprensori agricoli di Tripolitania e Cirenaica.',
    };
  }
  if (step <= 5) {
    return {
      name: 'Libia Italiana — "Quarta Sponda" (R.D.L. 9 Gennaio 1939)',
      adminTitle: `Regno d'Italia (19ª Regione Metropolitana) — Governo Generale della Libia (${GOV_ITALO_BALBO})`,
      note: 'Con il R.D.L. 9 gennaio 1939 n. 70, le quattro province costiere (Tripoli, Misurata, Bengasi, Derna) vengono incorporate come territorio metropolitano del Regno d\'Italia ("Quarta Sponda"), mentre il Territorio Militare del Sud resta a regime sahariano speciale.',
    };
  }
  if (step === 6) {
    return {
      name: 'Libia Italiana ("Quarta Sponda" in Guerra — Giugno 1940)',
      adminTitle: 'Regno d\'Italia — Governo Generale della Libia (Maresciallo Rodolfo Graziani)',
      note: 'Entrata in guerra dell\'Italia (10 giugno 1940): scontri immediati sulla frontiera egiziana di Capuzzo/Bardia e morte del Governatore Generale Italo Balbo nei cieli di Tobruk (28 giugno 1940); Rodolfo Graziani assume il comando supremo.',
    };
  }
  if (step === 7) {
    return {
      name: 'Libia Italiana (Offensiva in Egitto su Sidi Barrani — Ott 1940)',
      adminTitle: 'Regno d\'Italia — Governo Generale della Libia (Maresciallo Rodolfo Graziani)',
      note: 'Settembre–ottobre 1940: la 10ª Armata del Maresciallo Graziani supera il confine libico-egiziano raggiungendo Sidi Barrani, mentre Tripoli e Bengasi sostengono il ponte logistico attraverso il Mediterraneo centrale.',
    };
  }
  if (step === 8) {
    return {
      name: 'Libia Italiana (Controffensiva dell\'Afrikakorps & Assedio di Tobruk)',
      adminTitle: 'Regno d\'Italia — Governo Generale della Libia (Gen. Italo Gariboldi & DAK Gen. Erwin Rommel)',
      note: 'In seguito allo sbarco a Tripoli del Deutsches Afrikakorps di Erwin Rommel (Operazione Sonnenblume, febbraio–aprile 1941), le forze italo-tedesche riconquistano la Cirenaica fino al confine egiziano, stringono d\'assedio Tobruk (10 aprile) mentre Cufra e Giarabub cadono in mano alleata.',
    };
  }
  if (step === 9) {
    return {
      name: 'Libia Italiana (Tripolitania e Fezzan — Linea di El Agheila, Dic 1941)',
      adminTitle: 'Regno d\'Italia — Governo Generale della Libia (Maresciallo Ettore Bastico & Panzergruppe Afrika)',
      note: 'Dicembre 1941: in seguito all\'Operazione Crusader britannica che libera la Cirenaica, l\'Italia conserva Tripolitania, Sirtica e Fezzan attestando la linea difensiva italo-tedesca di Bastico e Rommel sullo sbarramento di El Agheila.',
    };
  }
  if (step === 10) {
    return {
      name: 'Libia Italiana (Riconquista Cirenaica, Caduta di Tobruk & Spinta ad El Alamein)',
      adminTitle: 'Regno d\'Italia — Governo Generale della Libia (Maresciallo Ettore Bastico & Panzerarmee Afrika)',
      note: 'Agosto 1942: riconquistata la Cirenaica nell\'inverno 1942, travolta la linea di Gazala (26 mag – 21 giu) ed espugnata la piazzaforte di Tobruk (21 giugno 1942), l\'intera costa libica sostiene l\'avanzata italo-tedesca fino a El Alamein.',
    };
  }
  return {
    name: 'Libia Italiana (Tripolitania & Fezzan — Ritirata post-El Alamein, Nov 1942)',
    adminTitle: 'Regno d\'Italia — Governo Generale della Libia (Maresciallo Ettore Bastico)',
    note: 'Novembre 1942: persa nuovamente la Cirenaica dopo la Seconda Battaglia di El Alamein (Tobruk 13 nov, Bengasi 20 nov) e con lo sbarco anglo-americano Torch in Nordafrica (8 nov), le residue forze dell\'Asse difendono El Agheila e la Tripolitania prima del crollo del gennaio 1943.',
  };
}
