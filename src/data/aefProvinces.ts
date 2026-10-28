/**
 * Dettaglio Geocartografico e Toponomastico Storico dell'Africa Equatoriale Francese (1936-1941)
 * Gouvernement Général de l'Afrique-Équatoriale Française (AEF) & Capitale de la France Libre (Brazzaville)
 *
 * Copertura integrale di tutti i territori e colonie federali:
 * - Territoire du Tchad (AEF_TD): Capoluogo Fort-Lamy (N'Djamena) sul fiume Chari; Fort-Archambault (Sarh),
 *   Abéché nel Wadai, Largeau (Faya) nel BET (Borkou-Ennedi-Tibesti); Félix Éboué (governatore dal 1938);
 *   Ralliement storico del 26 agosto 1940 (prima colonia francese a unirsi a De Gaulle); base aerea della
 *   rotta transcontinentale di Takoradi; Colonna Leclerc, raid su Murzuk e Giuramento di Kufra (1 marzo 1941).
 * - Colonie de l'Oubangui-Chari (AEF_CF): Capoluogo Bangui sul fiume Ubangi; Bambari, Bouar, Berbérati;
 *   fiume Ubangi come arteria vitale di navigazione verso Brazzaville; cotone, caffè e diamanti;
 *   Ralliement del 29-30 agosto 1940 guidato dal governatore Pierre de Saint-Mart e dal capitano Robert de Roux;
 *   nodo logistico e formazione del Bataillon de Marche n° 2 (BM 2).
 * - Colonie du Moyen-Congo (AEF_CG): Capoluogo Brazzaville sul Pool Malebo e porto atlantico di Pointe-Noire;
 *   ferrovia strategica Congo-Océan (CFCO, completata nel 1934); Ralliement del 28 agosto 1940 (Edgard de Larminat);
 *   27 ottobre 1940: De Gaulle emana il Manifeste de Brazzaville e istituisce il Conseil de Défense de l'Empire;
 *   Brazzaville diviene la Capitale ufficiale dell'Impero della Francia Libera e sede di Radio Brazzaville;
 *   Félix Éboué nominato Governatore Generale dell'intera AEF.
 * - Colonie du Gabon (AEF_GA): Capoluogo Libreville sull'estuario del Gabon e porto forestale di Port-Gentil (Cap Lopez);
 *   legname okoumé e ospedale di Albert Schweitzer a Lambaréné; agosto 1940: il governatore Georges Masson
 *   rifiuta il ralliement mantenendo il Gabon leale al Regime di Vichy (unica enclave di Vichy in AEF);
 *   ottobre-novembre 1940: Campagna del Gabon condotta da Leclerc e Koenig, affondamento del Bougainville,
 *   presa di Libreville (10 novembre 1940) e completamento dell'unità territoriale dell'Afrique Française Libre.
 *
 * Dinamica Temporale (Step 0 - 8):
 * - Step 0-1 (1936 - mar 1938): Terza Repubblica e Fronte Popolare (Léon Blum). Governatore Generale François-Joseph
 *   Reste de Roca. Riforme del lavoro indigeno, espansione sanitaria, completamento della ferrovia Congo-Océan.
 * - Step 2-4 (ott 1938 - apr 1939): Riarmo coloniale post-Monaco. Nomina storica di Félix Éboué a Governatore del Ciad
 *   (novembre 1938) per blindare la frontiera sahariana contro le rivendicazioni dell'Italia fascista (Aouzou/Libia).
 * - Step 5 (set 1939 - mag 1940): Mobilitazione bellica generale sotto il Governatore Pierre Husson. Reclutamento del
 *   Régiment de Tirailleurs Sénégalais du Tchad (RTST) e dei battaglioni del Moyen-Congo e dell'Oubangui-Chari.
 * - Step 6 (giu - ago 1940): Armistizio del 22 giugno 1940. 26-28 Agosto 1940: Ralliement dell'AEF a De Gaulle:
 *   il Ciad di Félix Éboué (26 ago), il Camerun di Leclerc (27 ago), il Moyen-Congo di Larminat (28 ago) e
 *   l'Oubangui-Chari di Saint-Mart (29 ago). Il Gabon resta isolato a Vichy sotto Masson.
 * - Step 7 (set - dic 1940): 27 Ottobre 1940: Manifeste de Brazzaville. Brazzaville proclamata Capitale della Francia
 *   Libera. Félix Éboué Governatore Generale dell'AEF. 27 ott - 12 nov 1940: Campagna del Gabon guidata da Leclerc
 *   e Koenig: liberazione di Libreville, suicidio di Masson e annessione del Gabon alla Francia Libera.
 * - Step 8 (apr 1941): Consolidamento dell'AEF come base operativa della Francia Libera. Dal Ciad, il colonnello Leclerc
 *   conduce il raid su Murzuk e conquista l'oasi di Kufra (1 marzo 1941, Serment de Koufra). I battaglioni dell'AEF
 *   combattono in Eritrea, Siria e nel deserto occidentale.
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

export interface AEFProvinceInfo {
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
  getSovereign: (s: number, ctx?: any) => string;
  getFaction: (s: number, ctx?: any) => FactionType;
}

export const AEF_PROVINCES_META: Record<string, AEFProvinceInfo> = {
  AEF_TD: {
    id: 'AEF_TD',
    iso: 'TD',
    cntrCode: 'TD',
    name: 'Chad',
    modernName: 'République du Tchad',
    historicalName: 'Territoire du Tchad (AEF — Fort-Lamy)',
    adminTitle: "Gouvernement Général de l'AEF — Territoire du Tchad",
    capital: 'Fort-Lamy',
    region: 'Sahel / Sahara',
    historicalToponym: 'Fort-Lamy / Fort-Archambault / Abéché / Largeau / Fada / Tibesti / Bardaï',
    s0_1: "Territorio del Ciad, vasto dominio sahelo-sahariano dell'Africa Equatoriale Francese amministrato dal capoluogo Fort-Lamy (sul fiume Chari). Territorio militare nel BET (Borkou-Ennedi-Tibesti) e civile a sud. Economia rurale imperniata sulla coltivazione del cotone (monopolio della Cotonfran a Fort-Archambault) e sull'allevamento transumante nelle regioni di Abéché e del Lago Ciad. Compagnie mehariste per il controllo delle piste carovaniere.",
    s2_4: "Territorio del Ciad (Fort-Lamy). Nel novembre 1938 viene nominato Governatore Félix Éboué (primo governatore nero dell'impero coloniale francese). Allerta strategica e militarizzazione delle guarnigioni sahariane del Tibesti e del massiccio dell'Ennedi per contrastare le rivendicazioni territoriali dell'Italia fascista sulla Striscia di Aouzou (trattato Mussolini-Laval del 1935 mai ratificato dalla Francia).",
    s5: "Territorio del Ciad (settembre 1939 - maggio 1940). Piena mobilitazione bellica guidata dal Governatore Félix Éboué. Addestramento intensivo e potenziamento del Régiment de Tirailleurs Sénégalais du Tchad (RTST) sotto il comando del colonnello Jean-Baptiste Marchand. Fort-Lamy funge da bastione settentrionale dell'impero contro eventuali offensive provenienti dalla Libia italiana.",
    s6: "Territorio del Ciad (26 Agosto 1940: Le Ralliement du Tchad). All'indomani dell'armistizio di Compiègne, il governatore Félix Éboué e il colonnello Marchand rifiutano ogni sottomissione al Regime di Vichy e proclamano lo storico ralliement del Ciad al Generale Charles de Gaulle. Il Ciad diviene la prima colonia francese in assoluto a schierarsi con la Francia Libera, fornendo a De Gaulle una base territoriale sovrana, legittimità internazionale e una frontiera contigua con il Sudan e la Nigeria britannici.",
    s7: "Territorio del Ciad (Francia Libera — Fort-Lamy). Fort-Lamy diviene la retrovia avanzata e la base aerea strategica della 'Route de Takoradi' (aerovia di rifornimento anglo-americana Accra-Fort Lamy-Khartoum-Cairo). Il 2 dicembre 1940 giunge a Fort-Lamy il colonnello Philippe Leclerc de Hauteclocque, nominato Comandante Militare del Ciad, che unifica le truppe coloniali e prepara le incursioni motorizzate nel Sahara centrale.",
    s8: "Territorio del Ciad (Francia Libera / Campagna del Deserto — Serment de Koufra). Base di partenza delle leggendarie colonne mobili del colonnello Leclerc. Dopo il raid su Murzuk con il Long Range Desert Group britannico (gennaio 1941), Leclerc attraversa centinaia di chilometri di deserto e il 1º marzo 1941 espugna l'oasi italiana di Kufra, pronunciando il celebre Giuramento di Kufra: 'Jurez de ne déposer les armes que lorsque nos couleurs flotteront sur la cathédrale de Strasbourg!'.",
    getNote: (s: number) => {
      if (s >= 8) return AEF_PROVINCES_META['AEF_TD'].s8;
      if (s >= 7) return AEF_PROVINCES_META['AEF_TD'].s7;
      if (s >= 6) return AEF_PROVINCES_META['AEF_TD'].s6;
      if (s >= 5) return AEF_PROVINCES_META['AEF_TD'].s5;
      if (s >= 2) return AEF_PROVINCES_META['AEF_TD'].s2_4;
      return AEF_PROVINCES_META['AEF_TD'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s >= 8) return 'Tchad (Afrique Française Libre — Base di Leclerc / Giuramento di Kufra)';
      if (s >= 6) return 'Tchad (Afrique Française Libre — Fort-Lamy / Ralliement di Félix Éboué)';
      if (s >= 5) return 'Tchad (AEF — Mobilitazione Bellica RTST)';
      if (s >= 2) return 'Tchad (AEF — Fort-Lamy / Fronte Sahariano del Tibesti)';
      return 'Tchad (AEF — Fort-Lamy & Territoire Militaire du BET)';
    },
    getAdminTitle: (s: number) => {
      if (s >= 8) return 'Forces Françaises Libres — Commandement Militaire du Tchad (Général Leclerc)';
      if (s >= 6) return 'Afrique Française Libre — Gouvernement du Tchad (Félix Éboué & Colonel Marchand)';
      return "Gouvernement Général de l'AEF — Territoire du Tchad (Fort-Lamy)";
    },
    getSovereign: (s: number) => (s >= 6 ? 'FFL_AEF' : 'F_AEF'),
    getFaction: () => 'Alleati' as FactionType,
  },

  AEF_CF: {
    id: 'AEF_CF',
    iso: 'CF',
    cntrCode: 'CF',
    name: 'Central African Republic',
    modernName: 'République Centrafricaine',
    historicalName: "Colonie de l'Oubangui-Chari (AEF — Bangui)",
    adminTitle: "Gouvernement Général de l'AEF — Colonie de l'Oubangui-Chari",
    capital: 'Bangui',
    region: 'Oubangui / Savane équatoriale',
    historicalToponym: 'Bangui / Bambari / Bouar / Berbérati / Fort-Sibut / Bangassou / Bossangoa',
    s0_1: "Colonia dell'Oubangui-Chari (AEF), situata nel cuore del continente africano con capoluogo Bangui sul fiume Ubangi. Transizione dal vecchio regime delle compagnie concessionarie a un'amministrazione diretta dei cerchi coloniali; esportazione di cotone, caffè, gomma ed estrazione aurifera ed eluviale di diamanti. Il fiume Ubangi costituisce l'arteria vitale di navigazione fluviale verso Brazzaville e l'Oceano Atlantico.",
    s2_4: "Colonia dell'Oubangui-Chari (Bangui). Sviluppo della 'Route Trans-Équatoriale' che unisce Bangui a Yaoundé (Camerun) e a Fort-Lamy (Ciad). Lavori di modernizzazione del porto fluviale di Bangui e rafforzamento dei magazzini di deposito per garantire la continuità dei transiti strategici tra l'Africa Centrale e il litorale atlantico.",
    s5: "Colonia dell'Oubangui-Chari (settembre 1939 - maggio 1940). Mobilitazione generale delle risorse umane ed economiche della colonia sotto il governatore Pierre de Saint-Mart. Reclutamento del Bataillon de Tirailleurs de l'Oubangui-Chari (BTOC); intensificazione delle consegne obbligatorie di gomma, cotone e legname per le industrie belliche della madrepatria metropolitana.",
    s6: "Colonia dell'Oubangui-Chari (29-30 Agosto 1940: Ralliement all'Afrique Française Libre). Sulla scia del ralliement del Ciad e dell'arrivo del colonnello Leclerc in Camerun, il governatore Pierre de Saint-Mart e il capitano Robert de Roux proclamano a Bangui l'adesione entusiastica dell'Oubangui-Chari alla Francia Libera di De Gaulle. Il territorio consolida la continuità geografica tra Brazzaville e il Ciad.",
    s7: "Colonia dell'Oubangui-Chari (Francia Libera — Bangui). Integrazione nel dispositivo bellico della Francia Libera. Bangui funge da snodo logistico centrale fluviale e terrestre per l'inoltro di truppe, autocarri e carburante diretti al nord verso le basi sahariane di Leclerc in Ciad e verso il Sudan anglo-egiziano.",
    s8: "Colonia dell'Oubangui-Chari (Francia Libera — Pieno Sforzo Bellico). Il Bataillon de Marche n° 2 (BM 2), formato a Bangui sotto il comando del capitano de Roux, si distingue nei combattimenti in Medio Oriente e in Africa Orientale (Siria e Bir Hakeim). Produzione intensiva di diamanti industriali e gomma vegetale per rifornire la macchina industriale alleata britannica.",
    getNote: (s: number) => {
      if (s >= 8) return AEF_PROVINCES_META['AEF_CF'].s8;
      if (s >= 7) return AEF_PROVINCES_META['AEF_CF'].s7;
      if (s >= 6) return AEF_PROVINCES_META['AEF_CF'].s6;
      if (s >= 5) return AEF_PROVINCES_META['AEF_CF'].s5;
      if (s >= 2) return AEF_PROVINCES_META['AEF_CF'].s2_4;
      return AEF_PROVINCES_META['AEF_CF'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s >= 8) return 'Oubangui-Chari (Afrique Française Libre — Snodo Logistico & BM 2)';
      if (s >= 6) return 'Oubangui-Chari (Afrique Française Libre — Bangui / Saint-Mart & de Roux)';
      if (s >= 5) return 'Oubangui-Chari (AEF — Mobilitazione BTOC)';
      if (s >= 2) return 'Oubangui-Chari (AEF — Bangui & Route Trans-Équatoriale)';
      return 'Oubangui-Chari (AEF — Bangui & Bacino Fluviale dell\'Ubangi)';
    },
    getAdminTitle: (s: number) => {
      if (s >= 6) return "Afrique Française Libre — Colonie de l'Oubangui-Chari (Pierre de Saint-Mart)";
      return "Gouvernement Général de l'AEF — Colonie de l'Oubangui-Chari (Bangui)";
    },
    getSovereign: (s: number) => (s >= 6 ? 'FFL_AEF' : 'F_AEF'),
    getFaction: () => 'Alleati' as FactionType,
  },

  AEF_CG: {
    id: 'AEF_CG',
    iso: 'CG',
    cntrCode: 'CG',
    name: 'Congo (France)',
    modernName: 'République du Congo',
    historicalName: "Colonie du Moyen-Congo & Gouvernement Général de l'AEF (Brazzaville)",
    adminTitle: "Gouvernement Général de l'Afrique-Équatoriale Française (Brazzaville)",
    capital: 'Brazzaville',
    region: 'Bassin du Congo / Littoral Atlantique',
    historicalToponym: 'Brazzaville / Pointe-Noire / Dolisie / Ouesso / Gamboma / Loudima / Djambala',
    s0_1: "Colonia del Moyen-Congo e capitale federale dell'Africa Equatoriale Francese (AEF) a Brazzaville, affacciata sulla riva destra del Pool Malebo di fronte a Léopoldville (Congo Belga). Sede del Governatore Generale François-Joseph Reste de Roca. Spina dorsale economica e logistica dell'intera federazione imperniata sulla ferrovia Congo-Océan (CFCO, inaugurata nel 1934), che collega il porto oceanico in acque profonde di Pointe-Noire con il capolinea fluviale di Brazzaville; oleifici di palma e legname d'ebano.",
    s2_4: "Colonia del Moyen-Congo (Brazzaville). Potenziamento del traffico merci sulla ferrovia CFCO e ampliamento delle banchine portuali di Pointe-Noire per accogliere incrociatori della Marine Nationale. Brazzaville sviluppa i primi trasmettitori radiofonici e amplia le strutture amministrative e ospedaliere dell'AEF.",
    s5: "Colonia del Moyen-Congo (settembre 1939 - maggio 1940). Centro di coordinamento della mobilitazione coloniale dell'AEF sotto il Governatore Generale Pierre Husson. Reclutamento del Bataillon de Tirailleurs du Moyen-Congo; Pointe-Noire funge da scalo carboniero e di rifornimento per i convogli marittimi alleati nell'Atlantico meridionale.",
    s6: "Colonia del Moyen-Congo (28 Agosto 1940: Ralliement di Brazzaville alla Francia Libera). Di fronte all'atteggiamento attendista e lealista a Vichy del governatore generale Husson, il colonnello Edgard de Larminat giunge da Léopoldville e, con il sostegno della guarnigione militare e del comandante Delange, assume il controllo di Brazzaville rovesciando Husson. Il Moyen-Congo proclama l'adesione alla Francia Libera, assicurando a De Gaulle il controllo della capitale federale e dello sbocco atlantico di Pointe-Noire.",
    s7: "Colonia del Moyen-Congo (24-27 Ottobre 1940: Brazzaville Capitale della Francia Libera & Manifeste de Brazzaville). Il Generale Charles de Gaulle stabilisce a Brazzaville il proprio quartier generale. Il 27 ottobre emana il celebre 'Manifeste de Brazzaville' e promulga l'ordinanza istitutiva del Conseil de Défense de l'Empire: Brazzaville diviene la Capitale ufficiale dell'Impero della Francia Libera. Félix Éboué viene nominato Governatore Generale dell'AEF. Iniziano le trasmissioni di 'Radio Brazzaville' ('Ici Brazzaville, la voix de la France libre!'), organo radiofonico mondiale della resistenza gollista.",
    s8: "Colonia del Moyen-Congo (Francia Libera — Cuore Politico e Radiofonico dell'Impero). Brazzaville coordina l'intera amministrazione dell'Afrique Française Libre sotto Félix Éboué. Il porto di Pointe-Noire accoglie navi da guerra e rifornimenti anglo-americani; formazione e partenza per il fronte libico del 1er Bataillon de Fusiliers Marins e del Bataillon de Marche n° 1 (BM 1).",
    getNote: (s: number) => {
      if (s >= 8) return AEF_PROVINCES_META['AEF_CG'].s8;
      if (s >= 7) return AEF_PROVINCES_META['AEF_CG'].s7;
      if (s >= 6) return AEF_PROVINCES_META['AEF_CG'].s6;
      if (s >= 5) return AEF_PROVINCES_META['AEF_CG'].s5;
      if (s >= 2) return AEF_PROVINCES_META['AEF_CG'].s2_4;
      return AEF_PROVINCES_META['AEF_CG'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s >= 7) return 'Moyen-Congo (Capitale de la France Libre — Brazzaville / Conseil de Défense de l\'Empire)';
      if (s >= 6) return 'Moyen-Congo (Afrique Française Libre — Brazzaville / Larminat)';
      if (s >= 5) return 'Moyen-Congo (AEF — Mobilitazione & CFCO Pointe-Noire)';
      if (s >= 2) return 'Moyen-Congo (AEF — Riarmo Navale & Scalo Oceanico di Pointe-Noire)';
      return 'Moyen-Congo (AEF — Brazzaville & Ferrovia Congo-Océan)';
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return 'Capitale de la France Libre — Gouvernement Général de l\'AEF (Félix Éboué / De Gaulle)';
      if (s >= 6) return "Afrique Française Libre — Délégation Générale de l'AEF (Edgard de Larminat)";
      return "Gouvernement Général de l'Afrique-Équatoriale Française (Brazzaville)";
    },
    getSovereign: (s: number) => (s >= 6 ? 'FFL_AEF' : 'F_AEF'),
    getFaction: () => 'Alleati' as FactionType,
  },

  AEF_GA: {
    id: 'AEF_GA',
    iso: 'GA',
    cntrCode: 'GA',
    name: 'Gabon',
    modernName: 'République Gabonaise',
    historicalName: 'Colonie du Gabon (AEF — Libreville)',
    adminTitle: 'Gouvernement de la Colonie du Gabon (Libreville)',
    capital: 'Libreville',
    region: 'Golfe de Guinée / Forêt équatoriale',
    historicalToponym: 'Libreville / Port-Gentil / Lambaréné / Franceville / Mouila / Mayumba / Oyem',
    s0_1: "Colonia del Gabon (AEF), affacciata sull'estuario del Gabon e sul Golfo di Guinea con capoluogo Libreville e porto fluviale-marittimo di Port-Gentil (Cap Lopez). Economia dominata dallo sfruttamento forestale del pregiato legname okoumé, essenziale per la produzione di compensati aerei e navali. Lungo il fiume Ogooué si trova l'ospedale missionario fondato da Albert Schweitzer a Lambaréné.",
    s2_4: "Colonia del Gabon (Libreville). Crescita record delle esportazioni di okoumé e legnami tropicali verso la metropoli in vista del riarmo; dragaggio dei fondali e modernizzazione delle strutture di carico di Port-Gentil; presidio costiero della Marine Nationale a Libreville.",
    s5: "Colonia del Gabon (settembre 1939 - maggio 1940). Sforzo bellico e mobilitazione locale sotto il governatore Georges Masson. Reclutamento di manodopera indigena e contingenti coloniali per i cantieri forestali e la difesa costiera; Libreville funge da base secondaria per pattugliatori costieri francesi nel golfo.",
    s6: "Colonia del Gabon (Agosto - Settembre 1940: Bastione di Vichy sotto il Governatore Masson). L'eccezione dell'AEF: mentre Ciad, Camerun, Medio Congo e Oubangui-Chari compiono lo storico ralliement a De Gaulle, a Libreville il governatore Georges Masson, condizionato dalla comunità mercantile forestale e dagli ufficiali di marina lealisti, rifiuta il ralliement e proclama la fedeltà assoluta al Regime di Vichy del maresciallo Pétain. Il Gabon diviene l'unica enclave di Vichy in Africa Equatoriale, minacciando le retrovie della Francia Libera.",
    s7: "Colonia del Gabon (Ottobre - Novembre 1940: Campagna del Gabon & Ralliement della Francia Libera). Le Forze Francesi Libere guidate dal colonnello Philippe Leclerc e dal generale Marie-Pierre Kœnig lanciano un'operazione combinata aeronavale e terrestre da terra (Camerun e Moyen-Congo) e da mare con l'avviso Savorgnan de Brazza (che affonda l'omologo lealista Bougainville nella rada di Libreville). Il 10 novembre Libreville cade; il governatore Masson si toglie la vita. Il Gabon viene liberato e annesso all'Afrique Française Libre, completando l'unità geopolitica e marittima dell'impero gollista in Africa centrale.",
    s8: "Colonia del Gabon (Francia Libera — Integrazione Bellica Alleata). Pacificazione e riorganizzazione dell'amministrazione coloniale sotto la Francia Libera. Riapertura immediata delle esportazioni strategiche di okoumé verso la Gran Bretagna e gli Stati Uniti; la rada di Port-Gentil e la baia di Libreville fungono da stazioni di rifornimento e scorta per i convogli alleati nel golfo di Guinea.",
    getNote: (s: number) => {
      if (s >= 8) return AEF_PROVINCES_META['AEF_GA'].s8;
      if (s >= 7) return AEF_PROVINCES_META['AEF_GA'].s7;
      if (s >= 6) return AEF_PROVINCES_META['AEF_GA'].s6;
      if (s >= 5) return AEF_PROVINCES_META['AEF_GA'].s5;
      if (s >= 2) return AEF_PROVINCES_META['AEF_GA'].s2_4;
      return AEF_PROVINCES_META['AEF_GA'].s0_1;
    },
    getHistoricalName: (s: number) => {
      if (s >= 7) return 'Gabon (France Libre — Libreville / Parèvement de l\'Afrique Française Libre)';
      if (s === 6) return 'Colonie du Gabon (Vichy — Libreville / Georges Masson)';
      if (s >= 5) return 'Colonie du Gabon (AEF — Mobilitazione & Okoumé)';
      if (s >= 2) return 'Colonie du Gabon (AEF — Scalo Legnami di Port-Gentil)';
      return 'Colonie du Gabon (AEF — Libreville & Port-Gentil)';
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return 'Afrique Française Libre — Colonie du Gabon (Forces Françaises Libres)';
      if (s === 6) return 'Gouverneur Georges Masson (Régime de Vichy — Libreville)';
      return 'Gouvernement de la Colonie du Gabon (Libreville)';
    },
    getSovereign: (s: number, ctx?: any) => {
      // Se il contesto richiede specificamente Vichy (es. HB resolution o check Vichy)
      if (s === 6) {
        if (ctx?.isVichyGabon || ctx?.rawName?.includes('France') || ctx?.rawName?.includes('Vichy')) {
          return 'VIC_AEF';
        }
        // Nel blocco generale AEF resolveFeature supporta FFL_AEF
        return 'FFL_AEF';
      }
      return s >= 7 ? 'FFL_AEF' : 'F_AEF';
    },
    getFaction: (s: number, ctx?: any) => {
      if (s === 6 && (ctx?.isVichyGabon || ctx?.rawName?.includes('France') || ctx?.rawName?.includes('Vichy'))) {
        return 'Fantoccio' as FactionType;
      }
      return 'Alleati' as FactionType;
    },
  },
};

// Aliases per risoluzione rapida
AEF_PROVINCES_META['TD'] = AEF_PROVINCES_META['AEF_TD'];
AEF_PROVINCES_META['TCD'] = AEF_PROVINCES_META['AEF_TD'];
AEF_PROVINCES_META['CHAD'] = AEF_PROVINCES_META['AEF_TD'];
AEF_PROVINCES_META['TCHAD'] = AEF_PROVINCES_META['AEF_TD'];
AEF_PROVINCES_META['FORT-LAMY'] = AEF_PROVINCES_META['AEF_TD'];
AEF_PROVINCES_META['FORT_LAMY'] = AEF_PROVINCES_META['AEF_TD'];

AEF_PROVINCES_META['CF'] = AEF_PROVINCES_META['AEF_CF'];
AEF_PROVINCES_META['CAF'] = AEF_PROVINCES_META['AEF_CF'];
AEF_PROVINCES_META['CENTRAL AFRICAN REPUBLIC'] = AEF_PROVINCES_META['AEF_CF'];
AEF_PROVINCES_META['CENTRAFRICA'] = AEF_PROVINCES_META['AEF_CF'];
AEF_PROVINCES_META['OUBANGUI-CHARI'] = AEF_PROVINCES_META['AEF_CF'];
AEF_PROVINCES_META['OUBANGUI_CHARI'] = AEF_PROVINCES_META['AEF_CF'];
AEF_PROVINCES_META['UBANGI-SHARI'] = AEF_PROVINCES_META['AEF_CF'];
AEF_PROVINCES_META['UBANGI_SHARI'] = AEF_PROVINCES_META['AEF_CF'];
AEF_PROVINCES_META['BANGUI'] = AEF_PROVINCES_META['AEF_CF'];

AEF_PROVINCES_META['CG'] = AEF_PROVINCES_META['AEF_CG'];
AEF_PROVINCES_META['COG'] = AEF_PROVINCES_META['AEF_CG'];
AEF_PROVINCES_META['CONGO'] = AEF_PROVINCES_META['AEF_CG'];
AEF_PROVINCES_META['CONGO (FRANCE)'] = AEF_PROVINCES_META['AEF_CG'];
AEF_PROVINCES_META['MOYEN-CONGO'] = AEF_PROVINCES_META['AEF_CG'];
AEF_PROVINCES_META['MOYEN_CONGO'] = AEF_PROVINCES_META['AEF_CG'];
AEF_PROVINCES_META['MIDDLE CONGO'] = AEF_PROVINCES_META['AEF_CG'];
AEF_PROVINCES_META['BRAZZAVILLE'] = AEF_PROVINCES_META['AEF_CG'];
AEF_PROVINCES_META['POINTE-NOIRE'] = AEF_PROVINCES_META['AEF_CG'];
AEF_PROVINCES_META['POINTE_NOIRE'] = AEF_PROVINCES_META['AEF_CG'];

AEF_PROVINCES_META['GA'] = AEF_PROVINCES_META['AEF_GA'];
AEF_PROVINCES_META['GAB'] = AEF_PROVINCES_META['AEF_GA'];
AEF_PROVINCES_META['GABON'] = AEF_PROVINCES_META['AEF_GA'];
AEF_PROVINCES_META['GABON (FRANCE)'] = AEF_PROVINCES_META['AEF_GA'];
AEF_PROVINCES_META['LIBREVILLE'] = AEF_PROVINCES_META['AEF_GA'];
AEF_PROVINCES_META['PORT-GENTIL'] = AEF_PROVINCES_META['AEF_GA'];
AEF_PROVINCES_META['PORT_GENTIL'] = AEF_PROVINCES_META['AEF_GA'];

/**
 * Recupera i metadati di una provincia AEF per ID.
 */
export function getAEFProvinceById(id: string): AEFProvinceInfo | undefined {
  if (!id) return undefined;
  const cleanId = id.toUpperCase().trim().replace('-', '_');
  return (
    AEF_PROVINCES_META[cleanId] ||
    (cleanId.startsWith('AEF_') ? undefined : AEF_PROVINCES_META['AEF_' + cleanId])
  );
}

/**
 * Restituisce l'elenco delle 4 province/territori dell'AEF.
 */
export function getAllAEFProvinces(): AEFProvinceInfo[] {
  return [
    AEF_PROVINCES_META['AEF_TD'],
    AEF_PROVINCES_META['AEF_CF'],
    AEF_PROVINCES_META['AEF_CG'],
    AEF_PROVINCES_META['AEF_GA'],
  ];
}

/**
 * Risolutore timeline-sensitive per le Colonie e i Territori dell'AEF (1936-1941).
 */
export function resolveAEFProvince(
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

  let meta: AEFProvinceInfo | undefined =
    AEF_PROVINCES_META[cleanId] ||
    AEF_PROVINCES_META[cntrCode] ||
    AEF_PROVINCES_META[rawId.toUpperCase().trim()];

  if (!meta && cleanId.startsWith('AEF_')) {
    meta = AEF_PROVINCES_META[cleanId];
  }

  // Lookup fuzzy per nome
  if (!meta && provName) {
    const pNorm = provName.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const key of ['AEF_TD', 'AEF_CF', 'AEF_CG', 'AEF_GA']) {
      const item = AEF_PROVINCES_META[key];
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

  const isVichyGabon =
    meta.id === 'AEF_GA' &&
    s === 6 &&
    (provName.includes('(France)') || provName.includes('Vichy') || props?.SUBJECTO === 'Vichy');

  const ctx = { rawName: provName, isVichyGabon };
  const sov = meta.getSovereign(s, ctx);
  const fac = meta.getFaction(s, ctx);
  const histName = isVichyGabon ? 'Colonie du Gabon (Vichy — Libreville)' : meta.getHistoricalName(s);
  const adm = isVichyGabon ? 'Gouverneur Georges Masson (Régime de Vichy — Libreville)' : meta.getAdminTitle(s);
  const note = isVichyGabon
    ? "Il governatore Georges Masson rifiuta il ralliement all'AEF e mantiene il Gabon fedele al regime di Vichy fino alla campagna militare condotta da Leclerc e Koenig."
    : meta.getNote(s);

  return makeResult(sov, histName, note, fac, adm);
}

/**
 * Popola il dizionario storico con toponimi e denominazioni per tutte le entità dell'AEF.
 */
export function populateAEFToponyms(dict: Record<string, any>): void {
  if (!dict['F_AEF']) dict['F_AEF'] = {};
  if (!dict['FFL_AEF']) dict['FFL_AEF'] = {};
  if (!dict['VIC_AEF']) dict['VIC_AEF'] = {};

  for (const key of ['AEF_TD', 'AEF_CF', 'AEF_CG', 'AEF_GA']) {
    const item = AEF_PROVINCES_META[key];
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

    dict['F_AEF'][normName] = match;
    dict['F_AEF'][lowId] = match;
    dict['F_AEF'][lowIso] = match;

    dict['FFL_AEF'][normName] = match;
    dict['FFL_AEF'][lowId] = match;
    dict['FFL_AEF'][lowIso] = match;

    dict['VIC_AEF'][normName] = match;
    dict['VIC_AEF'][lowId] = match;
    dict['VIC_AEF'][lowIso] = match;

    // Flat compatibility
    dict[lowId] = match;
    dict[lowIso] = match;
    dict[normName] = match;
  }
}
