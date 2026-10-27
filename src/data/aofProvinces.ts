/**
 * Dettaglio Geocartografico e Toponomastico Storico dell'Africa Occidentale Francese (1936-1941)
 * Gouvernement Général de l'Afrique-Occidentale Française (AOF) & Haut-Commissariat de Dakar
 *
 * Copertura integrale di tutti i territori e colonie federali:
 * - Sénégal (AOF_SN): Capitale coloniale Saint-Louis e capitale federale Dakar; Quatre Communes (cittadinanza piena);
 *   base navale della Marine Nationale, rada della corazzata Richelieu, riserve auree della Banca di Francia,
 *   Battaglia di Dakar / Operazione Menace (23-25 settembre 1940).
 * - Mauritanie (AOF_MR): Territori sahariani nomadi amministrati da Saint-Louis; cerchi militari dell'Adrar e Tagant;
 *   presidi di Atar, Chinguetti, Port-Étienne (Nouadhibou) e Fort-Gouraud (F'dérik); compagnie mehariste.
 * - Soudan Français (AOF_ML): Capitale Bamako sul fiume Niger; città storiche di Tombouctou, Gao, Ségou, Mopti, Kayes;
 *   ferrovia strategica Dakar-Niger; colossale opera idraulica dell'Office du Niger e diga di Sansanding.
 * - Guinée Française (AOF_GN): Capitale Conakry; altipiani del Fouta Djallon; ferrovia transguineana Conakry-Kankan;
 *   fronte nevralgico di contatto e controspionaggio con la roccaforte navale britannica di Freetown (Sierra Leone).
 * - Côte d'Ivoire (AOF_CI): Capitale Abidjan (trasferita da Bingerville); tra il 1932 e il 1947 include la vasta regione
 *   dell'Alta Costa d'Avorio (Haute-Côte d'Ivoire) con Ouagadougou, Bobo-Dioulasso e il regno Mossi del Mogho Naba;
 *   porto lagunare di Vridi, cacao, caffè e legname.
 * - Dahomey (AOF_BJ): Capitale Porto-Novo e scalo marittimo di Cotonou (wharf metallico); antico regno di Abomey;
 *   olio di palma; stretto tra il mandato del Togo francese e la potente colonia britannica della Nigeria (Lagos).
 * - Territoires du Niger & Haute-Volta (AOF_NER_HV): Capitale Niamey sul Niger; Zinder, Agadez, Bilma; Dori nell'Haute-Volta
 *   orientale; carovane transahariane del sale (Azalaï); guarnigioni sahariane e mehariste di frontiera a ridosso del Fezzan
 *   italiano (Libia) e dell'AEF gollista (Ciad / Colonna Leclerc).
 *
 * Dinamica Temporale (Step 0 - 8):
 * - Step 0-1 (1936 - mar 1938): Terza Repubblica e governo del Fronte Popolare (Léon Blum). Governatore Generale Jules Marcel de Coppet.
 *   Allentamento dell'indigénat, riconoscimento dei sindacati indigeni, rappresentanza parlamentare a Parigi (Galandou Diouf).
 * - Step 2-4 (ott 1938 - apr 1939): Riarmo coloniale post-Monaco. Fortificazione e ampliamento della base navale atlantica di Dakar
 *   (batterie pesanti di Cap Manuel e Gorée), addestramento intensivo dei Tirailleurs Sénégalais.
 * - Step 5 (set 1939 - mag 1940): Mobilitazione bellica generale sotto il Governatore Léon Cayla. Invio di decine di battaglioni coloniali
 *   al fronte francese; evacuazione a Dakar delle riserve auree della Banca di Francia, di Polonia e del Belgio; arrivo della corazzata Richelieu.
 * - Step 6 (giu 1940 - ago 1940): Armistizio del 22 giugno 1940. L'Alto Commissario Pierre Boisson schiera fermamente l'AOF con il Regime
 *   di Vichy del Maresciallo Pétain. L'8 luglio 1940 aerosiluranti britannici della portaerei HMS Hermes attaccano la Richelieu a Dakar (Op. Catapult).
 * - Step 7 (set 1940 - mar 1941): 23-25 Settembre 1940: Battaglia di Dakar (Operazione Menace). Flotta anglo-gollista respinta con gravi perdite
 *   (HMS Resolution silurata). Boisson trionfa e Dakar diventa il simbolo della resistenza intransigente di Vichy. Irrigidimento repressivo.
 * - Step 8 (apr 1941): Consolidamento del regime di Pierre Boisson. Blocco aeronavale asfissiante della Royal Navy da Freetown e Lagos;
 *   requisizioni forzate di arachidi, olio di palma e gomma; allarme costante ai confini sahariani dopo le incursioni della Colonna Leclerc da Kufra.
 */

import { ResolvedTerritory, FactionType } from '../types';

function makeResult(
  o: string,
  name: string,
  note?: string,
  fac?: FactionType,
  adminEntity?: string
): ResolvedTerritory {
  return { o, name, note, fac, adminEntity };
}

export interface AOFProvinceInfo {
  id: string;
  iso: string;
  cntrCode: string;
  name: string;
  modernName: string;
  historicalName: string;
  adminTitle: string;
  capital: string;
  region: string;
  historicalToponym: string;
  s0_1: string;
  s2_4: string;
  s5: string;
  s6: string;
  s7: string;
  s8: string;
  getNote: (s: number) => string;
  getHistoricalName: (s: number) => string;
  getAdminTitle: (s: number) => string;
  getSovereign: (s: number) => string;
  getFaction: (s: number) => FactionType;
}

export const AOF_PROVINCES_META: Record<string, AOFProvinceInfo> = {
  AOF_SN: {
    id: 'AOF_SN',
    iso: 'SN',
    cntrCode: 'SN',
    name: 'Senegal',
    modernName: 'République du Sénégal',
    historicalName: 'Colonie du Sénégal & Circonscription de Dakar et Dépendances',
    adminTitle: "Gouvernement Général de l'AOF — Colonie du Sénégal (Dakar)",
    capital: 'Saint-Louis / Dakar',
    region: 'Atlantique',
    historicalToponym: 'Saint-Louis / Dakar / Gorée / Rufisque / Thiès / Kaolack / Ziguinchor',
    s0_1: "Colonia del Senegal e capoluogo federale dell'AOF a Dakar. Sede del Governatore Generale Jules Marcel de Coppet nominato dal Fronte Popolare. Status speciale delle 'Quatre Communes' (Dakar, Gorée, Rufisque, Saint-Louis) i cui abitanti godono della piena cittadinanza francese, rappresentati a Parigi dal deputato Galandou Diouf. Grande porto atlantico di Dakar, aerodromo di Ouakam e capolinea della ferrovia Dakar-Niger; monocultura dell'arachide.",
    s2_4: "Colonia del Senegal (Dakar). Fase di riarmo post-Monaco: potenziamento delle difese costiere di Dakar come base aeronavale primaria della Marine Nationale nell'Atlantico meridionale; installazione delle batterie pesanti a Cap Manuel, isola di Gorée e Yoff; addestramento intensivo dei reggimenti di Tirailleurs Sénégalais.",
    s5: "Colonia del Senegal (settembre 1939 - maggio 1940). Piena mobilitazione bellica sotto il Governatore Léon Cayla: decine di migliaia di soldati senegalesi imbarcati per il fronte metropolitano. Nel giugno 1940 la modernissima corazzata Richelieu ripara a Dakar, dove vengono evacuate e custodite in gran segreto oltre 200 tonnellate d'oro della Banca di Francia, della Banca Nazionale di Polonia e del Belgio.",
    s6: "Colonia del Senegal (giugno - agosto 1940). A seguito dell'armistizio del 22 giugno, il Governatore Generale Pierre Boisson proclama l'obbedienza assoluta al Regime di Vichy e al Maresciallo Pétain. L'8 luglio 1940 aerosiluranti Swordfish della portaerei britannica HMS Hermes attaccano la corazzata Richelieu nella rada di Dakar (Operazione Catapult), immobilizzandone i timoni ma senza affondarla.",
    s7: "Colonia del Senegal (23-25 Settembre 1940: Battaglia di Dakar / Operazione Menace). Una flotta anglo-gollista guidata dall'ammiraglio Cunningham e dal generale Charles de Gaulle tenta di forzare il porto. Pierre Boisson respinge ogni ultimatum ('La France m'a confié Dakar, je la défendrai jusqu'au bout!'). I cannoni da 380 mm della Richelieu, le batterie di terra e il sommergibile Bévéziers infliggono pesanti danni alla flotta alleata (corazzata HMS Resolution silurata, HMS Barham danneggiata), respingendo l'attacco. Dakar si trasforma nel bastione inespugnabile di Vichy in Africa.",
    s8: "Colonia del Senegal (aprile 1941). Consolidamento del regime autoritario di Pierre Boisson e applicazione integrale della 'Révolution Nationale' pétainista. La Royal Navy impone un rigido blocco aeronavale al largo delle coste senegalesi; requisizioni obbligatorie di arachidi, tesseramento civile e sorveglianza militare delle frontiere con l'enclave britannica del Gambia.",
    getNote: (s: number) => {
      if (s >= 8) return AOF_PROVINCES_META['AOF_SN'].s8;
      if (s >= 7) return AOF_PROVINCES_META['AOF_SN'].s7;
      if (s >= 6) return AOF_PROVINCES_META['AOF_SN'].s6;
      if (s >= 5) return AOF_PROVINCES_META['AOF_SN'].s5;
      if (s >= 2) return AOF_PROVINCES_META['AOF_SN'].s2_4;
      return AOF_PROVINCES_META['AOF_SN'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s >= 6) return 'Sénégal (AOF — Vichy / Roccaforte di Dakar)';
      if (s >= 5) return 'Sénégal (AOF — Mobilitazione & Base Navale di Dakar)';
      return 'Sénégal (AOF — Saint-Louis & Circonscription de Dakar)';
    },
    getAdminTitle: (s: number) => {
      if (s >= 6) return "Haut-Commissariat de l'Afrique Française (Dakar — Pierre Boisson / Vichy)";
      return "Gouvernement Général de l'AOF — Colonie du Sénégal";
    },
    getSovereign: (s: number) => (s >= 6 ? 'VIC_AOF' : 'F_AOF'),
    getFaction: (s: number) => (s >= 6 ? ('Fantoccio' as FactionType) : ('Alleati' as FactionType)),
  },

  AOF_MR: {
    id: 'AOF_MR',
    iso: 'MR',
    cntrCode: 'MR',
    name: 'Mauritania',
    modernName: 'République Islamique de Mauritanie',
    historicalName: 'Colonie de la Mauritanie (Territoire Civil & Cercles Militaires du Sahara)',
    adminTitle: "Gouvernement Général de l'AOF — Colonie de la Mauritanie",
    capital: 'Saint-Louis (amministrazione) / Atar',
    region: 'Sahara',
    historicalToponym: 'Saint-Louis / Port-Étienne / Atar / Chinguetti / Fort-Gouraud / Tidjikja / Kaédi',
    s0_1: "Colonia della Mauritania, amministrata congiuntamente dalla residenza di Saint-Louis in Senegal. Territorio sahariano suddiviso in cerchi civili fluviali a sud e cerchi militari a nord (Adrar, Tagant, Inchiri, Hodh). Controllo francese affidato alle compagnie mehariste indigene a dorso di dromedario; porto peschereccio e scalo aeropostale dell'Aéropostale a Port-Étienne (Nouadhibou).",
    s2_4: "Colonia della Mauritania. Pattugliamento delle piste carovaniere verso il Marocco e il Sahara Spagnolo (Rio de Oro); presidi fortificati ad Atar e Chinguetti; pacificazione delle tribù nomadi maure e controllo dei traffici carovanieri.",
    s5: "Colonia della Mauritania (settembre 1939 - maggio 1940). Arruolamento di meharisti e goumiers per la sorveglianza delle rotte di confine; protezione della baia del Levriero a Port-Étienne come scalo di sicurezza per i convogli marittimi atlantici.",
    s6: "Colonia della Mauritania (giugno - agosto 1940). Il governatore coloniale applica l'ordine di Pierre Boisson allineando la Mauritania a Vichy. Rafforzamento dei posti di blocco a nord verso il Rio de Oro spagnolo e a est verso i territori sahariani algerini.",
    s7: "Colonia della Mauritania (autunno 1940). A seguito della vittoria di Vichy a Dakar, la Mauritania costituisce il cuscinetto di sicurezza settentrionale per la rada di Dakar contro possibili incursioni di reparti speciali della Francia Libera o britannici. Presidio meharista a Fort-Gouraud e Atar.",
    s8: "Colonia della Mauritania (aprile 1941). Isolamento della rada di Port-Étienne causato dal blocco aeronavale britannico. Economia limitata alla pastorizia nomade transumante, alla raccolta della gomma arabica e al sale delle saline costiere.",
    getNote: (s: number) => {
      if (s >= 8) return AOF_PROVINCES_META['AOF_MR'].s8;
      if (s >= 7) return AOF_PROVINCES_META['AOF_MR'].s7;
      if (s >= 6) return AOF_PROVINCES_META['AOF_MR'].s6;
      if (s >= 5) return AOF_PROVINCES_META['AOF_MR'].s5;
      if (s >= 2) return AOF_PROVINCES_META['AOF_MR'].s2_4;
      return AOF_PROVINCES_META['AOF_MR'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s >= 6) return 'Mauritanie (AOF — Vichy / Territoire Saharien)';
      return 'Mauritanie (AOF — Cercles Militaires du Sahara & Port-Étienne)';
    },
    getAdminTitle: (s: number) => {
      if (s >= 6) return "Haut-Commissariat de l'Afrique Française — Colonie de Mauritanie (Vichy)";
      return "Gouvernement Général de l'AOF — Colonie de la Mauritanie";
    },
    getSovereign: (s: number) => (s >= 6 ? 'VIC_AOF' : 'F_AOF'),
    getFaction: (s: number) => (s >= 6 ? ('Fantoccio' as FactionType) : ('Alleati' as FactionType)),
  },

  AOF_ML: {
    id: 'AOF_ML',
    iso: 'ML',
    cntrCode: 'ML',
    name: 'Mali',
    modernName: 'République du Mali',
    historicalName: 'Colonie du Soudan Français (Haut-Sénégal et Niger)',
    adminTitle: "Gouvernement Général de l'AOF — Colonie du Soudan Français (Bamako)",
    capital: 'Bamako',
    region: 'Sahel',
    historicalToponym: 'Bamako / Tombouctou / Gao / Ségou / Kayes / Mopti / Sikasso / Sansanding',
    s0_1: "Colonia del Sudan Francese (capitale Bamako sul fiume Niger). Spina dorsale geografica ed economica dell'AOF, collegata alla costa atlantica dalla ferrovia strategica Dakar-Niger. Sono in pieno svolgimento i grandi lavori dell'Office du Niger promossi da Émile Bélime con la costruzione della diga di Sansanding per irrigare il delta interno del Niger e produrre riso e cotone su scala industriale.",
    s2_4: "Colonia del Sudan Francese (Bamako). Espansione delle infrastrutture lungo l'ansa del Niger e scali fluviali commerciali a Mopti, Tombouctou e Gao; snodo centrale di reclutamento dei reggimenti di fanteria dei Tirailleurs Soudanais per i quadri d'oltremare dell'esercito francese.",
    s5: "Colonia del Sudan Francese (settembre 1939 - maggio 1940). Sforzo bellico prioritario: fornitura forzata di cereali, cotone e decine di migliaia di fanti soudanais inviati al fronte in Francia. Nodo di transito logistico tra la costa atlantica e il bacino del lago Ciad.",
    s6: "Colonia del Sudan Francese (giugno - agosto 1940). Il governatore coloniale recepisce le direttive di Pierre Boisson e si allinea al Regime di Vichy; sgomento nelle caserme e nei villaggi per le notizie dei massacri razziali di prigionieri neri perpetrati dalla Wehrmacht a Chasselay e sul fronte francese.",
    s7: "Colonia del Sudan Francese (autunno 1940). Chiusura totale della frontiera orientale: il confinante Ciad e l'Africa Equatoriale Francese (AEF) sono passati nell'agosto 1940 sotto il controllo della Francia Libera di Félix Éboué e De Gaulle. Il confine del Sudan Francese diventa zona militare sorvegliata per bloccare la penetrazione gaullista.",
    s8: "Colonia del Sudan Francese (aprile 1941). Difficoltà economiche per il blocco atlantico; la costruzione della diga di Sansanding subisce rallentamenti per mancanza di carburante e pezzi di ricambio. Imposizione di requisizioni forzate di riso e miglio per rifornire le guarnigioni fedeli a Pétain a Dakar e sulla costa.",
    getNote: (s: number) => {
      if (s >= 8) return AOF_PROVINCES_META['AOF_ML'].s8;
      if (s >= 7) return AOF_PROVINCES_META['AOF_ML'].s7;
      if (s >= 6) return AOF_PROVINCES_META['AOF_ML'].s6;
      if (s >= 5) return AOF_PROVINCES_META['AOF_ML'].s5;
      if (s >= 2) return AOF_PROVINCES_META['AOF_ML'].s2_4;
      return AOF_PROVINCES_META['AOF_ML'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s >= 6) return 'Soudan Français (AOF — Vichy / Bamako)';
      if (s >= 5) return 'Soudan Français (AOF — Mobilitazione & Office du Niger)';
      return 'Soudan Français (AOF — Bamako, Ségou & Tombouctou)';
    },
    getAdminTitle: (s: number) => {
      if (s >= 6) return "Haut-Commissariat de l'Afrique Française — Soudan Français (Vichy)";
      return "Gouvernement Général de l'AOF — Colonie du Soudan Français";
    },
    getSovereign: (s: number) => (s >= 6 ? 'VIC_AOF' : 'F_AOF'),
    getFaction: (s: number) => (s >= 6 ? ('Fantoccio' as FactionType) : ('Alleati' as FactionType)),
  },

  AOF_GN: {
    id: 'AOF_GN',
    iso: 'GN',
    cntrCode: 'GN',
    name: 'Guinea',
    modernName: 'République de Guinée',
    historicalName: 'Colonie de la Guinée Française (Rivières du Sud)',
    adminTitle: "Gouvernement Général de l'AOF — Colonie de la Guinée Française (Conakry)",
    capital: 'Conakry',
    region: 'Golfe de Guinée',
    historicalToponym: 'Conakry / Kindia / Kankan / Mamou / Labé / Boké / Macenta',
    s0_1: "Colonia della Guinea Francese (capitale Conakry). Territorio montuoso del massiccio del Fouta Djallon, sorgente dei fiumi Niger, Senegal e Gambia. Economia fondata sulle piantagioni di banane, caffè e caucciù, collegate al porto marittimo di Conakry dalla ferrovia transguineana fino a Kankan.",
    s2_4: "Colonia della Guinea Francese. Rilevamenti geologici sui depositi di bauxite e ferro delle isole de Los; ammodernamento delle banchine portuali di Conakry e addestramento delle guarnigioni indigene di fanteria coloniale.",
    s5: "Colonia della Guinea Francese (settembre 1939 - maggio 1940). Mobilitazione di contigenti militari guineani e derrate per la Francia in guerra. Conakry opera come porto di rifornimento ausiliario per i convogli mercantili atlantici.",
    s6: "Colonia della Guinea Francese (giugno - agosto 1940). Il governatore si allinea al Regime di Vichy sotto la guida di Pierre Boisson. Posizione geografica assai delicata: confina a sud con la Sierra Leone britannica, sede della strategica base navale imperiale di Freetown.",
    s7: "Colonia della Guinea Francese (autunno 1940). Dopo la battaglia di Dakar, la Guinea diventa il fronte caldo dello spionaggio e delle provocazioni confinarie: la vicinanza tra Conakry e Freetown scatena una guerra clandestina tra i servizi segreti britannici (SOE) e la polizia coloniale di Vichy per sventare defezioni gaulliste.",
    s8: "Colonia della Guinea Francese (aprile 1941). Rigido blocco marittimo britannico imposto dalla marina di Freetown: paralisi delle esportazioni di frutta e minerali. Presidio armato sui passi montani del Fouta Djallon e fortificazioni costiere a guardia di Conakry.",
    getNote: (s: number) => {
      if (s >= 8) return AOF_PROVINCES_META['AOF_GN'].s8;
      if (s >= 7) return AOF_PROVINCES_META['AOF_GN'].s7;
      if (s >= 6) return AOF_PROVINCES_META['AOF_GN'].s6;
      if (s >= 5) return AOF_PROVINCES_META['AOF_GN'].s5;
      if (s >= 2) return AOF_PROVINCES_META['AOF_GN'].s2_4;
      return AOF_PROVINCES_META['AOF_GN'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s >= 6) return 'Guinée Française (AOF — Vichy / Conakry)';
      return 'Guinée Française (AOF — Fouta Djallon & Conakry)';
    },
    getAdminTitle: (s: number) => {
      if (s >= 6) return "Haut-Commissariat de l'Afrique Française — Guinée Française (Vichy)";
      return "Gouvernement Général de l'AOF — Colonie de la Guinée Française";
    },
    getSovereign: (s: number) => (s >= 6 ? 'VIC_AOF' : 'F_AOF'),
    getFaction: (s: number) => (s >= 6 ? ('Fantoccio' as FactionType) : ('Alleati' as FactionType)),
  },

  AOF_CI: {
    id: 'AOF_CI',
    iso: 'CI',
    cntrCode: 'CI',
    name: "Côte d'Ivoire",
    modernName: 'République de Côte d\'Ivoire',
    historicalName: "Colonie de la Côte d'Ivoire (incluse la Haute-Côte d'Ivoire 1932–1947)",
    adminTitle: "Gouvernement Général de l'AOF — Colonie de la Côte d'Ivoire (Abidjan)",
    capital: 'Abidjan',
    region: 'Golfe de Guinée',
    historicalToponym: 'Abidjan / Grand-Bassam / Bouaké / Ouagadougou / Bobo-Dioulasso / Sassandra',
    s0_1: "Colonia della Costa d'Avorio (capitale Abidjan dal 1934). A seguito dello smembramento della Haute-Volta nel settembre 1932, incorpora la vasta regione dell'Alta Costa d'Avorio comprendente Ouagadougou, Bobo-Dioulasso e il popolo Mossi del Mogho Naba. Grande polo di piantagione (cacao, caffè, legname di mogano e banane); avvio degli scavi del canale di Vridi per collegare la laguna Ébrié all'oceano.",
    s2_4: "Colonia della Costa d'Avorio. Prosecuzione della ferrovia Abidjan-Niger verso Bobo-Dioulasso; espansione delle piantagioni private dei coloni europei e reclutamento di manodopera indigena regolata dal regime dell'indigénat.",
    s5: "Colonia della Costa d'Avorio (settembre 1939 - maggio 1940). Partecipazione allo sforzo bellico francese con contingenti di soldati e massicci carichi di cacao, caffè e legname per la madrepatria in guerra.",
    s6: "Colonia della Costa d'Avorio (giugno - agosto 1940). Passaggio sotto il Regime di Vichy per ordine di Pierre Boisson. Confine delicato a est con la Gold Coast britannica (Ghana) e a ovest con la Liberia; fermento tra le popolazioni dell'interno favorevoli agli Alleati.",
    s7: "Colonia della Costa d'Avorio (autunno 1940). Il governatore coloniale reprime con durezza le correnti favorevoli a De Gaulle; contatti segreti tra il Mogho Naba Kom II a Ouagadougou e le autorità britanniche della Gold Coast; sorveglianza militare delle piantagioni.",
    s8: "Colonia della Costa d'Avorio (aprile 1941). Crisi economica causata dal blocco navale britannico che impedisce le esportazioni di cacao; requisizioni coatte di gomma selvatica e cereali per rifornire la roccaforte di Dakar; completamento forzato di piste militari verso il Sahel.",
    getNote: (s: number) => {
      if (s >= 8) return AOF_PROVINCES_META['AOF_CI'].s8;
      if (s >= 7) return AOF_PROVINCES_META['AOF_CI'].s7;
      if (s >= 6) return AOF_PROVINCES_META['AOF_CI'].s6;
      if (s >= 5) return AOF_PROVINCES_META['AOF_CI'].s5;
      if (s >= 2) return AOF_PROVINCES_META['AOF_CI'].s2_4;
      return AOF_PROVINCES_META['AOF_CI'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s >= 6) return "Côte d'Ivoire (AOF — Vichy / Abidjan)";
      return "Côte d'Ivoire (AOF — Abidjan, Grand-Bassam & Haute-Côte d'Ivoire)";
    },
    getAdminTitle: (s: number) => {
      if (s >= 6) return "Haut-Commissariat de l'Afrique Française — Côte d'Ivoire (Vichy)";
      return "Gouvernement Général de l'AOF — Colonie de la Côte d'Ivoire";
    },
    getSovereign: (s: number) => (s >= 6 ? 'VIC_AOF' : 'F_AOF'),
    getFaction: (s: number) => (s >= 6 ? ('Fantoccio' as FactionType) : ('Alleati' as FactionType)),
  },

  AOF_BJ: {
    id: 'AOF_BJ',
    iso: 'BJ',
    cntrCode: 'BJ',
    name: 'Benin',
    modernName: 'République du Bénin',
    historicalName: 'Colonie du Dahomey (Établissements Français du Golfe de Bénin)',
    adminTitle: "Gouvernement Général de l'AOF — Colonie du Dahomey (Porto-Novo)",
    capital: 'Porto-Novo / Cotonou',
    region: 'Golfe de Guinée',
    historicalToponym: 'Porto-Novo / Cotonou / Ouidah / Abomey / Parakou / Grand-Popo',
    s0_1: "Colonia del Dahomey (capitale Porto-Novo, scalo atlantico a Cotonou con pontile / wharf metallico). Territorio dello storico regno di Dahomey (Abomey). Principale esportatore di olio di palma e palmisti nell'AOF, trasportati dalla ferrovia dell'Oceano fino a Parakou; vivace ceto intellettuale indigeno ('Quartiere Latino dell'Africa').",
    s2_4: "Colonia del Dahomey. Sviluppo delle cooperative agricole e dei centri di lavorazione dell'olio di palma; fedeltà all'amministrazione coloniale francese e reclutamento nei battaglioni di Tirailleurs Dahoméens.",
    s5: "Colonia del Dahomey (settembre 1939 - maggio 1940). Massiccia esportazione di grassi vegetali e lubrificanti per l'industria degli armamenti francese; mobilitazione di contingenti indigeni inviati in Francia.",
    s6: "Colonia del Dahomey (giugno - agosto 1940). Allineamento al Regime di Vichy deciso da Pierre Boisson. Stretto in una morsa geografica critica: a ovest il Togo francese e a est la sterminata colonia della Nigeria britannica (con la capitale Lagos a brevissima distanza).",
    s7: "Colonia del Dahomey (autunno 1940). Blocco e chiusura totale della frontiera con la Nigeria imposti dai britannici di Lagos. Presidio armato di marinai e tirailleurs a Porto-Novo e Cotonou nel timore di incursioni o sbarchi da parte delle forze navali britanniche.",
    s8: "Colonia del Dahomey (aprile 1941). Soffocamento delle attività commerciali per l'impossibilità di esportare l'olio di palma via mare; intensa propaganda della 'Révolution Nationale' del Maresciallo Pétain promossa dall'amministrazione di Vichy tra le comunità urbane.",
    getNote: (s: number) => {
      if (s >= 8) return AOF_PROVINCES_META['AOF_BJ'].s8;
      if (s >= 7) return AOF_PROVINCES_META['AOF_BJ'].s7;
      if (s >= 6) return AOF_PROVINCES_META['AOF_BJ'].s6;
      if (s >= 5) return AOF_PROVINCES_META['AOF_BJ'].s5;
      if (s >= 2) return AOF_PROVINCES_META['AOF_BJ'].s2_4;
      return AOF_PROVINCES_META['AOF_BJ'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s >= 6) return 'Dahomey (AOF — Vichy / Porto-Novo & Cotonou)';
      return 'Dahomey (AOF — Porto-Novo, Cotonou & Abomey)';
    },
    getAdminTitle: (s: number) => {
      if (s >= 6) return "Haut-Commissariat de l'Afrique Française — Colonie du Dahomey (Vichy)";
      return "Gouvernement Général de l'AOF — Colonie du Dahomey";
    },
    getSovereign: (s: number) => (s >= 6 ? 'VIC_AOF' : 'F_AOF'),
    getFaction: (s: number) => (s >= 6 ? ('Fantoccio' as FactionType) : ('Alleati' as FactionType)),
  },

  AOF_NER_HV: {
    id: 'AOF_NER_HV',
    iso: 'NE-BF',
    cntrCode: 'NE',
    name: 'French West Africa',
    modernName: 'République du Niger & Burkina Faso',
    historicalName: 'Colonie du Niger & Territoires Saharo-Sahéliens (incluse Haute-Volta Orientale)',
    adminTitle: "Gouvernement Général de l'AOF — Colonie du Niger (Niamey)",
    capital: 'Niamey / Zinder',
    region: 'Sahel',
    historicalToponym: 'Niamey / Zinder / Agadez / Bilma / Tahoua / Maradi / Dori',
    s0_1: "Colonia del Niger (capitale Niamey sul fiume Niger) e territori orientali della smembrata Haute-Volta (Dori). Spazio desertico e saheliano strategico di cerniera tra l'AOF, il Ciad e il Sahara centrale. Perno del commercio del sale con le grandi carovane carovaniere Azalaï tra Agadez e le saline di Bilma; difesa affidata ai plotoni meharisti tuareg.",
    s2_4: "Colonia del Niger. Consolidamento dei posti sahariani dell'Air e del Tibesti; sorveglianza delle frontiere a nord a ridosso del Fezzan libico, occupato dalle forze dell'Italia fascista.",
    s5: "Colonia del Niger (settembre 1939 - maggio 1940). Rinforzo dei presidi sahariani lungo il confine libico (Fort de Madama e Bilma); fornitura di bestiame e contingenti di truppe coloniali per la difesa della Francia.",
    s6: "Colonia del Niger (giugno - agosto 1940). Dopo la dichiarazione di guerra dell'Italia fascista (10 giugno) e l'armistizio, il Niger resta fedele a Vichy per ordine di Pierre Boisson, trovandosi a fronteggiare a nord le forze italo-libiche.",
    s7: "Colonia del Niger (autunno 1940). Situazione di accerchiamento: ad est il Ciad ha aderito alla Francia Libera di De Gaulle ed Éboué (agosto 1940), a sud la Nigeria britannica è ostile; il Niger di Vichy si trova isolato in una posizione di estrema vulnerabilità sahariana.",
    s8: "Colonia del Niger (aprile 1941). Allarme costante lungo il deserto orientale a seguito delle vittorie della Colonna Leclerc della Francia Libera (presa dell'oasi di Kufra nel marzo 1941). Le guarnigioni pétainiste di Agadez, Bilma e Zinder sono consegnate a una rigida vigilanza difensiva.",
    getNote: (s: number) => {
      if (s >= 8) return AOF_PROVINCES_META['AOF_NER_HV'].s8;
      if (s >= 7) return AOF_PROVINCES_META['AOF_NER_HV'].s7;
      if (s >= 6) return AOF_PROVINCES_META['AOF_NER_HV'].s6;
      if (s >= 5) return AOF_PROVINCES_META['AOF_NER_HV'].s5;
      if (s >= 2) return AOF_PROVINCES_META['AOF_NER_HV'].s2_4;
      return AOF_PROVINCES_META['AOF_NER_HV'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s >= 6) return 'Niger & Haute-Volta (AOF — Vichy / Niamey & Agadez)';
      return 'Niger & Haute-Volta (AOF — Niamey, Zinder & Azalaï di Bilma)';
    },
    getAdminTitle: (s: number) => {
      if (s >= 6) return "Haut-Commissariat de l'Afrique Française — Colonie du Niger (Vichy)";
      return "Gouvernement Général de l'AOF — Colonie du Niger";
    },
    getSovereign: (s: number) => (s >= 6 ? 'VIC_AOF' : 'F_AOF'),
    getFaction: (s: number) => (s >= 6 ? ('Fantoccio' as FactionType) : ('Alleati' as FactionType)),
  },
};

// Aliases per lookup rapido
AOF_PROVINCES_META['SN'] = AOF_PROVINCES_META['AOF_SN'];
AOF_PROVINCES_META['SEN'] = AOF_PROVINCES_META['AOF_SN'];
AOF_PROVINCES_META['SENEGAL'] = AOF_PROVINCES_META['AOF_SN'];

AOF_PROVINCES_META['MR'] = AOF_PROVINCES_META['AOF_MR'];
AOF_PROVINCES_META['MRT'] = AOF_PROVINCES_META['AOF_MR'];
AOF_PROVINCES_META['MAURITANIA'] = AOF_PROVINCES_META['AOF_MR'];
AOF_PROVINCES_META['MAURITANIE'] = AOF_PROVINCES_META['AOF_MR'];

AOF_PROVINCES_META['ML'] = AOF_PROVINCES_META['AOF_ML'];
AOF_PROVINCES_META['MLI'] = AOF_PROVINCES_META['AOF_ML'];
AOF_PROVINCES_META['MALI'] = AOF_PROVINCES_META['AOF_ML'];
AOF_PROVINCES_META['SOUDAN'] = AOF_PROVINCES_META['AOF_ML'];
AOF_PROVINCES_META['FRENCH SUDAN'] = AOF_PROVINCES_META['AOF_ML'];

AOF_PROVINCES_META['GN'] = AOF_PROVINCES_META['AOF_GN'];
AOF_PROVINCES_META['GIN'] = AOF_PROVINCES_META['AOF_GN'];
AOF_PROVINCES_META['GUINEA'] = AOF_PROVINCES_META['AOF_GN'];
AOF_PROVINCES_META['GUINEE'] = AOF_PROVINCES_META['AOF_GN'];
AOF_PROVINCES_META['FRENCH GUINEA'] = AOF_PROVINCES_META['AOF_GN'];

AOF_PROVINCES_META['CI'] = AOF_PROVINCES_META['AOF_CI'];
AOF_PROVINCES_META['CIV'] = AOF_PROVINCES_META['AOF_CI'];
AOF_PROVINCES_META['IVORY COAST'] = AOF_PROVINCES_META['AOF_CI'];
AOF_PROVINCES_META["COTE D'IVOIRE"] = AOF_PROVINCES_META['AOF_CI'];
AOF_PROVINCES_META["CÔTE D'IVOIRE"] = AOF_PROVINCES_META['AOF_CI'];

AOF_PROVINCES_META['BJ'] = AOF_PROVINCES_META['AOF_BJ'];
AOF_PROVINCES_META['BEN'] = AOF_PROVINCES_META['AOF_BJ'];
AOF_PROVINCES_META['BENIN'] = AOF_PROVINCES_META['AOF_BJ'];
AOF_PROVINCES_META['DAHOMEY'] = AOF_PROVINCES_META['AOF_BJ'];

AOF_PROVINCES_META['NE'] = AOF_PROVINCES_META['AOF_NER_HV'];
AOF_PROVINCES_META['NER'] = AOF_PROVINCES_META['AOF_NER_HV'];
AOF_PROVINCES_META['NIGER'] = AOF_PROVINCES_META['AOF_NER_HV'];
AOF_PROVINCES_META['BF'] = AOF_PROVINCES_META['AOF_NER_HV'];
AOF_PROVINCES_META['BFA'] = AOF_PROVINCES_META['AOF_NER_HV'];
AOF_PROVINCES_META['BURKINA FASO'] = AOF_PROVINCES_META['AOF_NER_HV'];
AOF_PROVINCES_META['UPPER VOLTA'] = AOF_PROVINCES_META['AOF_NER_HV'];
AOF_PROVINCES_META['HAUTE-VOLTA'] = AOF_PROVINCES_META['AOF_NER_HV'];

/**
 * Risolutore timeline-sensitive per le Colonie e i Territori dell'AOF (1936-1941).
 */
export function resolveAOFProvince(
  arg1: any,
  arg2?: any,
  arg3?: any,
  arg4?: string
): ResolvedTerritory | null {
  let s = 0;
  let rawId = '';
  let props: any = {};
  let rawName = '';

  if (typeof arg1 === 'number') {
    s = arg1;
    rawId = String(arg2 || '');
    props = arg3 || {};
    rawName = arg4 || String(props.NAME || props.name || props.shapeName || props.HISTORICAL_NAME || '');
  } else if (typeof arg1 === 'object' && arg1 !== null) {
    const ft = arg1;
    s = typeof arg2 === 'number' ? arg2 : 0;
    props = ft.properties || {};
    rawId = String(ft.id || props.id || props.shapeISO || props.ISO || props.CNTR_CODE || '');
    rawName = String(props.NAME || props.name || props.shapeName || props.HISTORICAL_NAME || arg4 || '');
  } else {
    rawId = String(arg1 || '');
    s = typeof arg2 === 'number' ? arg2 : 0;
    props = arg3 || {};
    rawName = arg4 || '';
  }

  const cleanId = rawId.toUpperCase().trim().replace('-', '_');
  const cntrCode = String(props?.CNTR_CODE || props?.shapeISO || '').toUpperCase().trim();
  const provName = rawName || props?.shapeName || props?.NAME || props?.HISTORICAL_NAME || '';

  let meta: AOFProvinceInfo | undefined =
    AOF_PROVINCES_META[cleanId] ||
    AOF_PROVINCES_META[cntrCode] ||
    AOF_PROVINCES_META[rawId.toUpperCase().trim()];

  if (!meta && cleanId.startsWith('AOF_')) {
    meta = AOF_PROVINCES_META[cleanId];
  }

  // Lookup fuzzy per nome
  if (!meta && provName) {
    const pNorm = provName.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const key of Object.keys(AOF_PROVINCES_META)) {
      const item = AOF_PROVINCES_META[key];
      const nrmItem = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const nrmMod = item.modernName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const nrmHist = item.historicalName.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (
        pNorm === nrmItem ||
        pNorm === nrmMod ||
        (nrmItem.length >= 4 && pNorm.includes(nrmItem)) ||
        (nrmItem.length >= 4 && nrmHist.includes(pNorm))
      ) {
        meta = item;
        break;
      }
    }
  }

  if (!meta) return null;

  return makeResult(
    meta.getSovereign(s),
    meta.getHistoricalName(s),
    meta.getNote(s),
    meta.getFaction(s),
    meta.getAdminTitle(s)
  );
}

/**
 * Popola il dizionario storico con toponimi e denominazioni per tutte le entità dell'AOF.
 */
export function populateAOFToponyms(dict: Record<string, any>): void {
  if (!dict['F_AOF']) dict['F_AOF'] = {};
  if (!dict['VIC_AOF']) dict['VIC_AOF'] = {};

  for (const key of Object.keys(AOF_PROVINCES_META)) {
    const item = AOF_PROVINCES_META[key];
    const match = {
      historicalName: item.historicalName,
      adminTitle: item.adminTitle,
      historicalNote: item.s0_1,
      name: item.name,
      modernName: item.modernName,
      capital: item.capital,
      note: item.s0_1,
    };
    const normName = item.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const lowId = item.id.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const lowIso = item.iso.toLowerCase().replace(/[^a-z0-9]/g, '_');

    dict['F_AOF'][normName] = match;
    dict['F_AOF'][lowId] = match;
    dict['F_AOF'][lowIso] = match;

    dict['VIC_AOF'][normName] = match;
    dict['VIC_AOF'][lowId] = match;
    dict['VIC_AOF'][lowIso] = match;

    // Flat compatibility
    dict[lowId] = match;
    dict[lowIso] = match;
    dict[normName] = match;
  }
}
