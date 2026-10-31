/**
 * Dettaglio Geocartografico e Toponomastico Storico degli Stati Uniti d'America (1936-1941)
 * Copertura integrale di tutti i 48 Stati dell'Unione, Distretto Federale di Columbia,
 * Territori organizzati (Alaska, Hawaii), Territori d'Oltremare (Puerto Rico, Isole Vergini,
 * Guam, Samoa Americane, Midway, Wake) e Basi Strategiche (Panama Canal Zone, Guantanamo Bay).
 *
 * Evoluzione Geopolitica (Step 0 - 8):
 * - Step 0-1 (1936-mar 1938): New Deal rooseveltiano, ripresa industriale, isolazionismo e Neutrality Acts.
 * - Step 2-4 (ott 1938-apr 1939): Crisi europea e asiatica; Second Vinson Act (riarmo navale), difesa emisferica.
 * - Step 5-6 (set 1939-giu 1940): Scoppio della guerra europea, Cash and Carry, Two-Ocean Navy Act (+70% tonnellaggio navale), Destroyers for Bases.
 * - Step 7 (ott 1940): Selective Training and Service Act (leva obbligatoria), rielezione di FDR al Terzo Mandato, Discorso dell'Arsenale della Democrazia, embargo metallico a Tokyo.
 * - Step 8 (apr 1941): Lend-Lease Act (Affitti e Prestiti), mobilitazione industriale di massa, protezione militare della Groenlandia, estensione della Neutrality Patrol nell'Atlantico.
 */

import { ResolvedTerritory, FactionType, ToponymMatch } from '../types';

function makeResult(
  o: string,
  name: string,
  note?: string,
  fac?: FactionType,
  adminEntity?: string
): ResolvedTerritory {
  return { o, name, note, fac, adminEntity };
}

export interface USAProvinceInfo {
  id: string;
  iso: string;
  name: string;
  modernName: string;
  historicalName: string;
  adminTitle: string;
  capital: string;
  region: string;
  isState: boolean;
  historicalToponym: string;
  s0_1: string;
  s2_4: string;
  s5_6: string;
  s7: string;
  s8: string;
  getNote: (s: number) => string;
  getHistoricalName: (s: number) => string;
  getAdminTitle: (s: number) => string;
  getSovereign: (s: number) => string;
  getFaction: (s: number) => FactionType;
}

export const USA_PROVINCES_META: Record<string, USAProvinceInfo> = {
  US_AL: {
    id: "US_AL",
    iso: "US-AL",
    name: "Alabama",
    modernName: "State of Alabama",
    historicalName: "Alabama (Heart of Dixie — Birmingham & Mobile)",
    adminTitle: "United States of America — State of Alabama (Gov. Bibb Graves / Frank M. Dixon)",
    capital: "Montgomery",
    region: "South",
    isState: true,
    historicalToponym: "Montgomery (Capitale) / Birmingham / Mobile",
    s0_1: "Stato dell'Alabama (Capitale Montgomery). Polo siderurgico e metallurgico di Birmingham (\"la Pittsburgh del Sud\") favorito dai giacimenti congiunti di ferro, carbone e calcare. Nel porto di Mobile, sul Golfo del Messico, operano i cantieri navali mercantili dell'Alabama Drydock and Shipbuilding Company (ADDSCO). Ripresa agricola dopo la Grande Depressione grazie ai piani rurali del New Deal.",
    s2_4: "Stato dell'Alabama. Con l'approvazione del Naval Expansion Act del 1938, i cantieri navali di Mobile espandono i bacini di carenaggio per le commesse federali. Le acciaierie di Birmingham incrementano la laminazione per blindature e binari ferroviari ad uso strategico nazionale.",
    s5_6: "Stato dell'Alabama (settembre 1939 - giugno 1940). Allo scoppio del conflitto europeo e con la clausola Cash and Carry, la ADDSCO di Mobile avvia la produzione in serie di navi mercantili e petroliere veloci; a Maxwell Field (Montgomery) si intensifica l'addestramento dei piloti dell'US Army Air Corps.",
    s7: "Stato dell'Alabama (ottobre 1940). Dopo il Selective Training and Service Act e la rielezione di Roosevelt, l'Alabama diventa un hub di addestramento primario con l'avvio della costruzione della base di Brookley Field a Mobile e l'ampliamento delle acciaierie di Birmingham per l'Arsenale della Democrazia.",
    s8: "Stato dell'Alabama (aprile 1941). Con l'approvazione del Lend-Lease Act, i cantieri navali di Mobile lavorano a pieno regime 24 ore su 24 nella costruzione di mercantili per i convogli atlantici; Maxwell Field coordina il Southeast Air Corps Training Center per migliaia di aviatori destinati alla difesa emisferica.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_AL"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_AL"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_AL"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_AL"].s2_4;
      return USA_PROVINCES_META["US_AL"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Alabama (Heart of Dixie — Birmingham & Mobile)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Alabama (Gov. Bibb Graves / Frank M. Dixon)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_AZ: {
    id: "US_AZ",
    iso: "US-AZ",
    name: "Arizona",
    modernName: "State of Arizona",
    historicalName: "Arizona (Grand Canyon State — Bisbee & Phoenix)",
    adminTitle: "United States of America — State of Arizona (Gov. Rawghlie C. Stanford / Robert T. Jones / Sidney P. Osborn)",
    capital: "Phoenix",
    region: "Mountain West",
    isState: true,
    historicalToponym: "Phoenix (Capitale) / Tucson / Bisbee",
    s0_1: "Stato dell'Arizona (Capitale Phoenix). Leader nazionale nell'estrazione del rame con i colossali giacimenti a cielo aperto e sotterranei di Bisbee, Morenci, Jerome e Ajo (Phelps Dodge Corporation). Risorsa metallurgica vitale per cavi, conduttori elettrici e munizionamento. Agricoltura irrigua della Salt River Valley alimentata dalla Diga Roosevelt.",
    s2_4: "Stato dell'Arizona. Le tensioni internazionali e i programmi di riarmo navale provocano un incremento degli acquisti federali di rame per le corazzate e l'industria aerospaziale. Il clima secco e soleggiato del deserto attira le prime commissioni militari per futuri campi di volo d'addestramento.",
    s5_6: "Stato dell'Arizona (1939-1940). Mobilitazione mineraria ad alta intensità a Morenci e Bisbee per sopperire alla domanda britannica e francese sotto il regime Cash and Carry. Vengono mappate le aree per l'insediamento di basi aeree militari (futura Luke Field e Thunderbird Field a Phoenix).",
    s7: "Stato dell'Arizona (ottobre 1940). Il Congresso classifica il rame dell'Arizona materiale critico di prim'ordine. A Tucson e Phoenix si insediano i primi battaglioni della Guardia Nazionale mobilitati dal Selective Service Act; potenziamento dell'aerodromo di Davis-Monthan a Tucson.",
    s8: "Stato dell'Arizona (aprile 1941). Piena operatività del Lend-Lease: la Phelps Dodge avvia lo scavo a gradoni del Morenci Open Pit, la più grande miniera di rame dello Stato. A Phoenix e Tucson sorgono i centri d'addestramento al volo per piloti americani e della Royal Air Force britannica.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_AZ"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_AZ"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_AZ"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_AZ"].s2_4;
      return USA_PROVINCES_META["US_AZ"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Arizona (Grand Canyon State — Bisbee & Phoenix)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Arizona (Gov. Rawghlie C. Stanford / Robert T. Jones / Sidney P. Osborn)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_AR: {
    id: "US_AR",
    iso: "US-AR",
    name: "Arkansas",
    modernName: "State of Arkansas",
    historicalName: "Arkansas (Natural State — Little Rock & Bauxite)",
    adminTitle: "United States of America — State of Arkansas (Gov. Carl E. Bailey / Homer M. Adkins)",
    capital: "Little Rock",
    region: "South",
    isState: true,
    historicalToponym: "Little Rock (Capitale) / Bauxite / Fort Smith",
    s0_1: "Stato dell'Arkansas (Capitale Little Rock). Detiene il quasi monopolio (oltre il 95%) della produzione nazionale di bauxite, estratta nella Contea di Saline (cittadina di Bauxite), minerale indispensabile per la raffinazione dell'alluminio. Agricoltura basata sulle piantagioni di cotone nel delta del Mississippi e silvicoltura sui monti Ozark.",
    s2_4: "Stato dell'Arkansas. L'espansione dell'industria aeronautica militare americana spinge al massimo l'estrazione della bauxite della Alcoa (Aluminum Company of America). Il Genio Militare avvia la bonifica e il controllo delle piene lungo il bacino del fiume Arkansas.",
    s5_6: "Stato dell'Arkansas (1939-1940). Con l'impennata della produzione aeronautica alleata e statunitense, la bauxite dell'Arkansas diventa l'anello strategico fondamentale per le leghe leggere dei caccia e bombardieri. Little Rock si consolida come centro logistico e snodo ferroviario del Sud.",
    s7: "Stato dell'Arkansas (ottobre 1940). Viene avviata l'espansione della storica base militare di Camp Joseph T. Robinson a Little Rock, destinata all'addestramento della fanteria e della 35ª Divisione; il governo federale finanzia nuovi impianti di lavorazione dell'alluminio a Hurricane Creek.",
    s8: "Stato dell'Arkansas (aprile 1941). Con il Lend-Lease Act a pieno regime, le miniere di bauxite lavorano a ciclo continuo per rifornire le fabbriche di velivoli di tutto il continente; Camp Robinson ospita oltre 30.000 reclute in addestramento intensivo per l'Esercito degli Stati Uniti.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_AR"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_AR"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_AR"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_AR"].s2_4;
      return USA_PROVINCES_META["US_AR"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Arkansas (Natural State — Little Rock & Bauxite)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Arkansas (Gov. Carl E. Bailey / Homer M. Adkins)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_CA: {
    id: "US_CA",
    iso: "US-CA",
    name: "California",
    modernName: "State of California",
    historicalName: "California (Pacific Coast — San Diego & San Francisco)",
    adminTitle: "United States of America — State of California (Gov. Frank Merriam / Culbert Olson)",
    capital: "Sacramento",
    region: "Pacific Coast",
    isState: true,
    historicalToponym: "Sacramento (Capitale) / San Francisco / Los Angeles / San Diego",
    s0_1: "Stato della California (Capitale Sacramento). Cerniera strategica del Pacifico e polo demografico in rapidissima ascesa favorita dai programmi di sviluppo del New Deal (Central Valley Project, ponti Golden Gate e Bay Bridge). Sede della base navale di San Diego per la Flotta del Pacifico, dei cantieri navali militari di Mare Island a Vallejo e Hunters Point a San Francisco. Giganti dell'industria aeronautica in espansione: Douglas Aircraft a Santa Monica, Lockheed a Burbank, Consolidated Aircraft a San Diego e North American Aviation a Inglewood.",
    s2_4: "Stato della California. Di fronte all'aggressione giapponese in Cina e all'occupazione di Canton e Hainan, la California diventa il cuore del riarmo aeronavale: la Consolidated riceve gli ordini per gli idrovolanti PBY Catalina e i bombardieri B-24 Liberator; San Diego e la Baia di San Francisco vedono un massiccio rafforzamento dei presidi navali.",
    s5_6: "Stato della California (1939-1940). Dopo lo scoppio della guerra europea, il governatore Culbert Olson coordina la conversione industriale: gli stabilimenti aeronautici quintuplicano la forza lavoro. Con il Two-Ocean Navy Act del giugno 1940 e il trasferimento della Flotta da Battaglia verso Pearl Harbor, la California funge da primaria base di rifornimento marittimo e riparazione navale.",
    s7: "Stato della California (ottobre 1940). Polo dell'Arsenale della Democrazia sul Pacifico. A San Diego aprono i nuovi stabilimenti della Consolidated per i bombardieri pesanti; a Richmond (Baia di San Francisco) Henry J. Kaiser avvia la costruzione dei rivoluzionari cantieri navali per mercantili Ocean e Liberty.",
    s8: "Stato della California (aprile 1941). Piena mobilitazione sotto il Lend-Lease: la California produce oltre il 40% degli aerei da guerra dell'Unione; i cantieri navali di Mare Island varano sommergibili a ritmo record; le basi aeronavali di Alameda e North Island presidiano le rotte verso le Hawaii e l'Asia.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_CA"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_CA"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_CA"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_CA"].s2_4;
      return USA_PROVINCES_META["US_CA"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "California (Pacific Coast — San Diego & San Francisco)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of California (Gov. Frank Merriam / Culbert Olson)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_CO: {
    id: "US_CO",
    iso: "US-CO",
    name: "Colorado",
    modernName: "State of Colorado",
    historicalName: "Colorado (Centennial State — Denver & Climax)",
    adminTitle: "United States of America — State of Colorado (Gov. Teller Ammons / Ralph Carr)",
    capital: "Denver",
    region: "Mountain West",
    isState: true,
    historicalToponym: "Denver (Capitale) / Colorado Springs / Climax / Pueblo",
    s0_1: "Stato del Colorado (Capitale Denver). Cuore delle Montagne Rocciose; sede della miniera di molibdeno di Climax a oltre 3.400 metri di quota, il più grande giacimento al mondo, che fornisce l'80% del molibdeno globale, metallo strategico irrinunciabile per temprare gli acciai delle corazze navali e delle canne d'artiglieria. Acciaierie CF&I a Pueblo.",
    s2_4: "Stato del Colorado. Il governo federale potenzia la presenza militare a Denver con l'istituzione nel 1938 del Lowry Field, base aerea destinata all'addestramento specialistico in bombardamento e fotografia aerea dell'Air Corps. Climax raggiunge ritmi record di estrazione per il riarmo navale.",
    s5_6: "Stato del Colorado (1939-1940). Il molibdeno del Colorado è categorizzato come risorsa di massima priorità bellica. A Denver viene insediata la Denver Ordnance Plant per la produzione massiccia di cartucce e munizionamento per armi leggere (Remington Arms).",
    s7: "Stato del Colorado (ottobre 1940). Con il programma dell'Arsenale della Democrazia, la Denver Ordnance Plant impiega oltre 15.000 operai; le acciaierie di Pueblo producono rotaie e travi per basi militari; a Lowry Field migliaia di allievi apprendono l'uso del mirino di puntamento Norden.",
    s8: "Stato del Colorado (aprile 1941). Sotto il Lend-Lease, il molibdeno di Climax viene spedito in Gran Bretagna per la corazzatura dei carri armati e dei caccia Spitfire; Denver si afferma come capitale logistica e militare delle Montagne Rocciose.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_CO"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_CO"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_CO"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_CO"].s2_4;
      return USA_PROVINCES_META["US_CO"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Colorado (Centennial State — Denver & Climax)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Colorado (Gov. Teller Ammons / Ralph Carr)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_CT: {
    id: "US_CT",
    iso: "US-CT",
    name: "Connecticut",
    modernName: "State of Connecticut",
    historicalName: "Connecticut (Constitution State — Groton & Hartford)",
    adminTitle: "United States of America — State of Connecticut (Gov. Wilbur L. Cross / Raymond E. Baldwin / Robert A. Hurley)",
    capital: "Hartford",
    region: "New England",
    isState: true,
    historicalToponym: "Hartford (Capitale) / Groton / New Haven / Bridgeport",
    s0_1: "Stato del Connecticut (Capitale Hartford). Capitale mondiale della costruzione sottomarina a Groton, dove opera la Electric Boat Company (futura General Dynamics), unico cantiere privato specializzato nei sommergibili oceanici della US Navy (classe Porpoise e Salmon). Hartford è sede della Pratt & Whitney (motori aeronautici Wasp) e della Colt's Patent Fire Arms (pistole 1911 e mitragliatrici Browning).",
    s2_4: "Stato del Connecticut. L'approvazione del Naval Expansion Act del 1938 porta una pioggia di contratti alla Electric Boat di Groton per i nuovi sommergibili d'attacco oceanici. La Pratt & Whitney espande gli stabilimenti di East Hartford per far fronte agli ordini dei motori a doppia stella R-2800 Double Wasp.",
    s5_6: "Stato del Connecticut (1939-1940). Dopo la caduta della Francia e con il Two-Ocean Navy Act del giugno 1940, la Electric Boat raddoppia i propri scali di varo sul fiume Thames per la classe Gato; la Pratt & Whitney rifornisce i caccia navali F4F Wildcat e i caccia della RAF britannica tramite Cash and Carry.",
    s7: "Stato del Connecticut (ottobre 1940). Centro nevralgico dell'Arsenale della Democrazia. La Colt a Hartford produce centinaia di migliaia di mitragliatrici pesanti M2 calibro .50 per i velivoli militari; a Bridgeport e New Haven le fabbriche Winchester e Remington sfornano fucili Garand M1 e munizioni a ritmo incalzante.",
    s8: "Stato del Connecticut (aprile 1941). Piena operatività del Lend-Lease: i cantieri di Groton varano un sommergibile ogni poche settimane; la Pratt & Whitney fornisce i motori radiali per i caccia Thunderbolt P-47 e Corsair F4U per gli Alleati atlantici e del Pacifico.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_CT"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_CT"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_CT"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_CT"].s2_4;
      return USA_PROVINCES_META["US_CT"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Connecticut (Constitution State — Groton & Hartford)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Connecticut (Gov. Wilbur L. Cross / Raymond E. Baldwin / Robert A. Hurley)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_DE: {
    id: "US_DE",
    iso: "US-DE",
    name: "Delaware",
    modernName: "State of Delaware",
    historicalName: "Delaware (First State — Wilmington)",
    adminTitle: "United States of America — State of Delaware (Gov. C. Douglass Buck / Richard McMullen / Walter W. Bacon)",
    capital: "Dover",
    region: "Mid-Atlantic",
    isState: true,
    historicalToponym: "Dover (Capitale) / Wilmington / Newark",
    s0_1: "Stato del Delaware (Capitale Dover). Wilmington è la capitale mondiale dell'industria chimica e dei materiali avanzati grazie alla sede centrale e ai laboratori di ricerca della E.I. du Pont de Nemours and Company (DuPont). Nel 1935 la DuPont brevetta il Nylon, destinato a rimpiazzare la seta giapponese nei paracadute e nelle corde navali. Cantieri navali Dravo Corporation e Pusey & Jones sul fiume Christina.",
    s2_4: "Stato del Delaware. La DuPont riceve i primi contratti federali per l'espansione della produzione di polvere da sparo senza fumo e chimica organica per la difesa. I cantieri di Wilmington costruiscono dragamine e chiatte per la marina.",
    s5_6: "Stato del Delaware (1939-1940). Con l'inizio del conflitto in Europa, la DuPont assume la progettazione e gestione dei giganteschi impianti federali per esplosivi bellici; il nylon viene classificato materiale militare strategico prioritario per l'aviazione.",
    s7: "Stato del Delaware (ottobre 1940). La DuPont espande la sintesi di gomma sintetica Neoprene per ovviare alla dipendenza dal caucciù naturale asiatico; la Dravo Corporation avvia a Wilmington la costruzione in serie di cacciatorpediniere scorta e mezzi da sbarco.",
    s8: "Stato del Delaware (aprile 1941). Sotto il Lend-Lease, il Delaware alimenta la fornitura chimico-militare della Gran Bretagna; la base navale e aeroportuale di New Castle coordina la difesa della baia del Delaware e l'accesso atlantico a Philadelphia.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_DE"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_DE"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_DE"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_DE"].s2_4;
      return USA_PROVINCES_META["US_DE"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Delaware (First State — Wilmington)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Delaware (Gov. C. Douglass Buck / Richard McMullen / Walter W. Bacon)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_FL: {
    id: "US_FL",
    iso: "US-FL",
    name: "Florida",
    modernName: "State of Florida",
    historicalName: "Florida (Sunshine State — Pensacola & Key West)",
    adminTitle: "United States of America — State of Florida (Gov. Fred P. Cone / Spessard Holland)",
    capital: "Tallahassee",
    region: "South",
    isState: true,
    historicalToponym: "Tallahassee (Capitale) / Miami / Jacksonville / Pensacola / Key West",
    s0_1: "Stato della Florida (Capitale Tallahassee). Bastione aeronavale meridionale degli Stati Uniti a presidio dei Caraibi e del Golfo del Messico. La Naval Air Station Pensacola è la storica \"Culla dell'Aviazione Navale\" dove vengono addestrati tutti i piloti della marina; base sottomarini e idrovolanti di Key West all'imbocco dello Stretto di Florida.",
    s2_4: "Stato della Florida. L'acuirsi delle tensioni marittime spinge il Congresso a finanziare nel 1939 la costruzione della gigantesca Naval Air Station Jacksonville sul fiume St. Johns e della vicina base aerea navale di Banana River.",
    s5_6: "Stato della Florida (1939-1940). Con la dichiarazione della Neutrality Patrol atlantica (Zona di Sicurezza di 300 miglia), Key West e Pensacola diventano le basi operative per il pattugliamento aereo e navale antisommergibile contro gli U-Boot tedeschi nel Golfo del Messico e nelle rotte verso il Canale di Panama.",
    s7: "Stato della Florida (ottobre 1940). Entra in servizio operativo la NAS Jacksonville; a Tampa i cantieri Tampa Shipbuilding Company accelerano la costruzione di cacciatorpediniere e navi da carico; a Miami si espandono le basi di idrovolanti della Pan Am e della marina a Dinner Key.",
    s8: "Stato della Florida (aprile 1941). Piena operatività del Lend-Lease: la Florida è la principale palestra di volo degli Alleati con decine di campi scuola aerei (Pensacola, Whiting, Banana River); la Naval Station Key West vigila le rotte vitali delle petroliere texane dirette nel Regno Unito.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_FL"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_FL"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_FL"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_FL"].s2_4;
      return USA_PROVINCES_META["US_FL"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Florida (Sunshine State — Pensacola & Key West)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Florida (Gov. Fred P. Cone / Spessard Holland)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_GA: {
    id: "US_GA",
    iso: "US-GA",
    name: "Georgia",
    modernName: "State of Georgia",
    historicalName: "Georgia (Empire State of the South — Atlanta & Savannah)",
    adminTitle: "United States of America — State of Georgia (Gov. Eurith D. Rivers / Eugene Talmadge)",
    capital: "Atlanta",
    region: "South",
    isState: true,
    historicalToponym: "Atlanta (Capitale) / Savannah / Columbus / Fort Benning",
    s0_1: "Stato della Georgia (Capitale Atlanta). Centro logistico, bancario e ferroviario del Sud-Est ad Atlanta. Presso Columbus si erge Fort Benning, la \"Casa della Fanteria\" e la più grande scuola militare terrestre dell'esercito statunitense; porti marittimi di Savannah e Brunswick sull'Atlantico.",
    s2_4: "Stato della Georgia. Il Genio Militare e l'esercito espandono i poligoni e le strutture di Fort Benning per sperimentare le nuove dottrine di combattimento combinato fanteria-carri armati; a Savannah iniziano i rilievi per nuovi bacini di carenaggio navali.",
    s5_6: "Stato della Georgia (1939-1940). Con lo scoppio della guerra in Europa, a Fort Benning viene istituita la storica Airborne Infantry Test Platoon (luglio 1940): nasce qui il corpo dei paracadutisti dell'esercito americano.",
    s7: "Stato della Georgia (ottobre 1940). Con l'approvazione della coscrizione in tempo di pace, Fort Benning accoglie decine di migliaia di nuove reclute da formare come sottufficiali e ufficiali d'assalto; a Savannah e Brunswick il governo federale commissiona cantieri navali per navi Liberty.",
    s8: "Stato della Georgia (aprile 1941). Sotto il Lend-Lease, Fort Benning diploma migliaia di ufficiali di fanteria e paracadutisti al mese; ad Atlanta si pianifica la conversione industriale per futuri colossi aeronautici della difesa.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_GA"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_GA"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_GA"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_GA"].s2_4;
      return USA_PROVINCES_META["US_GA"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Georgia (Empire State of the South — Atlanta & Savannah)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Georgia (Gov. Eurith D. Rivers / Eugene Talmadge)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_ID: {
    id: "US_ID",
    iso: "US-ID",
    name: "Idaho",
    modernName: "State of Idaho",
    historicalName: "Idaho (Gem State — Boise & Coeur d'Alene)",
    adminTitle: "United States of America — State of Idaho (Gov. C. Ben Ross / Barzilla W. Clark / C.A. Bottolfsen / Chase A. Clark)",
    capital: "Boise",
    region: "Mountain West",
    isState: true,
    historicalToponym: "Boise (Capitale) / Pocatello / Coeur d'Alene / Lewiston",
    s0_1: "Stato dell'Idaho (Capitale Boise). Regno montano dei fiumi Snake e Salmon; ricchissimo di minerali strategici con le miniere d'argento, piombo e zinco del Coeur d'Alene Mining District nel Panhandle settentrionale. Foreste secolari di pino bianco per travi e costruzioni, colture irrigue di patate e cereali lungo il fiume Snake.",
    s2_4: "Stato dell'Idaho. I programmi di riarmo navale aumentano la domanda di piombo e zinco del distretto minerario di Coeur d'Alene (Bunker Hill Mine), essenziali per accumulatori navali, cuscinetti e schermature per la marina.",
    s5_6: "Stato dell'Idaho (1939-1940). L'Idaho espande la produzione agroalimentare e boschiva; i minerali non ferrosi del nord dello Stato vengono inclusi nelle riserve strategiche nazionali di emergenza del War Department.",
    s7: "Stato dell'Idaho (ottobre 1940). La Guardia Nazionale dell'Idaho viene mobilitata con il Selective Service; a Pocatello e Boise si potenziano gli scali ferroviari della Union Pacific per il trasporto transcontinentale verso i porti di imbarco del Pacifico.",
    s8: "Stato dell'Idaho (aprile 1941). Sotto il regime del Lend-Lease, l'Idaho intensifica l'estrazione mineraria e le forniture di legname; la Marina seleziona l'isolato e profondo lago Pend Oreille per futuri collaudi acustici e basi d'addestramento navale (futura Farragut Naval Training Station).",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_ID"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_ID"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_ID"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_ID"].s2_4;
      return USA_PROVINCES_META["US_ID"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Idaho (Gem State — Boise & Coeur d'Alene)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Idaho (Gov. C. Ben Ross / Barzilla W. Clark / C.A. Bottolfsen / Chase A. Clark)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_IL: {
    id: "US_IL",
    iso: "US-IL",
    name: "Illinois",
    modernName: "State of Illinois",
    historicalName: "Illinois (Prairie State — Chicago)",
    adminTitle: "United States of America — State of Illinois (Gov. Henry Horner / John Henry Stelle / Dwight H. Green)",
    capital: "Springfield",
    region: "Midwest",
    isState: true,
    historicalToponym: "Springfield (Capitale) / Chicago / Peoria / Rockford",
    s0_1: "Stato dell'Illinois (Capitale Springfield). Chicago è la seconda metropoli degli Stati Uniti, il più grande snodo ferroviario continentale del pianeta, borsa merci e cerealicola mondiale (Chicago Board of Trade), e colosso dei macelli Union Stock Yards. Sulla costa del Lago Michigan opera la Great Lakes Naval Training Station, la principale scuola reclute della marina americana.",
    s2_4: "Stato dell'Illinois. L'industria pesante di Chicago, Peoria (trattori e cingolati Caterpillar) e Moline (John Deere) inizia a pianificare la conversione dei veicoli pesanti da lavoro a mezzi di trasporto truppe e trattori d'artiglieria.",
    s5_6: "Stato dell'Illinois (1939-1940). Con lo scoppio della guerra europea, le acciaierie e officine meccaniche di Chicago (South Works della U.S. Steel) registrano ordini record per travi, rotaie e motori; la Great Lakes Naval Station raddoppia i corsi d'istruzione per i marinai.",
    s7: "Stato dell'Illinois (ottobre 1940). Cuore dell'Arsenale della Democrazia. La Chrysler e la General Motors allestiscono stabilimenti a Chicago per motori aeronautici; la Caterpillar a Peoria rifornisce l'esercito con cingolati; a Rock Island Arsenal si moltiplica la revisione e montaggio di pezzi d'artiglieria.",
    s8: "Stato dell'Illinois (aprile 1941). Sotto il Lend-Lease, l'Illinois è il gigante logistico-manifatturiero d'America: convogli ferroviari ininterrotti partono da Chicago verso la costa atlantica; la Great Lakes Naval Station addestra oltre 50.000 coscritti destinati alla flotta oceanica.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_IL"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_IL"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_IL"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_IL"].s2_4;
      return USA_PROVINCES_META["US_IL"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Illinois (Prairie State — Chicago)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Illinois (Gov. Henry Horner / John Henry Stelle / Dwight H. Green)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_IN: {
    id: "US_IN",
    iso: "US-IN",
    name: "Indiana",
    modernName: "State of Indiana",
    historicalName: "Indiana (Hoosier State — Gary & Indianapolis)",
    adminTitle: "United States of America — State of Indiana (Gov. M. Clifford Townsend / Henry F. Schricker)",
    capital: "Indianapolis",
    region: "Midwest",
    isState: true,
    historicalToponym: "Indianapolis (Capitale) / Gary / South Bend / Fort Wayne",
    s0_1: "Stato dell'Indiana (Capitale Indianapolis). La città di Gary sulle rive del Lago Michigan ospita i Gary Works della U.S. Steel, uno dei più vasti complessi siderurgici integrati della Terra. A Indianapolis ha sede la Allison Engineering Company (divisione General Motors), pioniera nei potenti motori aerei a V a raffreddamento a liquido V-1710; a South Bend operano gli stabilimenti automobilistici Studebaker.",
    s2_4: "Stato dell'Indiana. L'Air Corps commissiona alla Allison di Indianapolis la fornitura su larga scala dei motori V-1710 per i caccia da guerra di nuova generazione (P-38 Lightning, P-39 Airacobra e P-40 Warhawk); Gary Works espande la produzione di lamiere speciali.",
    s5_6: "Stato dell'Indiana (1939-1940). Con l'approvazione del Cash and Carry, la produzione dei motori aeronautici Allison a Indianapolis diventa vitale per le squadriglie francesi e britanniche; a Jeffersonville sul fiume Ohio rinascono i cantieri navali per chiatte e naviglio da sbarco.",
    s7: "Stato dell'Indiana (ottobre 1940). Polo trainante dell'Arsenale della Democrazia. A Fort Wayne la International Harvester avvia le linee per autocarri militari pesanti a trazione integrale; a South Bend la Studebaker converte la produzione civile nei celebri camion da trasporto truppe US6.",
    s8: "Stato dell'Indiana (aprile 1941). Piena operatività del Lend-Lease: la Allison sforna oltre 1.000 motori aeronautici al mese; le acciaierie di Gary lavorano senza sosta rifornendo l'intera rete industriale dei Grandi Laghi di acciaio laminato a freddo.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_IN"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_IN"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_IN"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_IN"].s2_4;
      return USA_PROVINCES_META["US_IN"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Indiana (Hoosier State — Gary & Indianapolis)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Indiana (Gov. M. Clifford Townsend / Henry F. Schricker)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_IA: {
    id: "US_IA",
    iso: "US-IA",
    name: "Iowa",
    modernName: "State of Iowa",
    historicalName: "Iowa (Hawkeye State — Des Moines)",
    adminTitle: "United States of America — State of Iowa (Gov. Clyde L. Herring / Nelson G. Kraschel / George A. Wilson)",
    capital: "Des Moines",
    region: "Midwest",
    isState: true,
    historicalToponym: "Des Moines (Capitale) / Cedar Rapids / Davenport / Sioux City",
    s0_1: "Stato dell'Iowa (Capitale Des Moines). Cuore incontrastato della Corn Belt americana, primatista assoluto nella produzione di mais, soia, carne suina e foraggio. Il fertile terreno nero tra i fiumi Mississippi e Missouri alimenta la nazione; stabilimenti metalmeccanici a Cedar Rapids e Davenport per macchinari agricoli.",
    s2_4: "Stato dell'Iowa. L'Iowa beneficia dei programmi di sostegno agricolo federale dell'Agricultural Adjustment Act (AAA) del New Deal, che stabilizzano le riserve alimentari strategiche della nazione in vista di emergenze internazionali.",
    s5_6: "Stato dell'Iowa (1939-1940). Dopo lo scoppio della guerra in Europa, la produzione agricola e zootecnica dell'Iowa assume un ruolo strategico di rifornimento per le nazioni libere; il governo federale seleziona Burlington per la futura Iowa Ordnance Plant.",
    s7: "Stato dell'Iowa (ottobre 1940). Viene avviata a Burlington la costruzione della monumentale Iowa Ordnance Plant (estesa su oltre 19.000 acri) per il caricamento di bombe d'aereo, proiettili d'artiglieria e munizionamento pesante gestita dalla Day & Zimmermann.",
    s8: "Stato dell'Iowa (aprile 1941). Sotto il Lend-Lease, l'Iowa non solo fornisce centinaia di migliaia di tonnellate di derrate alimentari per la popolazione e le truppe britanniche, ma con l'apertura della Iowa Ordnance Plant diventa uno dei massimi poli di caricamento munizioni d'America.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_IA"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_IA"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_IA"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_IA"].s2_4;
      return USA_PROVINCES_META["US_IA"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Iowa (Hawkeye State — Des Moines)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Iowa (Gov. Clyde L. Herring / Nelson G. Kraschel / George A. Wilson)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_KS: {
    id: "US_KS",
    iso: "US-KS",
    name: "Kansas",
    modernName: "State of Kansas",
    historicalName: "Kansas (Sunflower State — Wichita Aviation Capital)",
    adminTitle: "United States of America — State of Kansas (Gov. Alf Landon / Walter A. Huxman / Payne Ratner)",
    capital: "Topeka",
    region: "Great Plains",
    isState: true,
    historicalToponym: "Topeka (Capitale) / Wichita / Kansas City / Dodge City",
    s0_1: "Stato del Kansas (Capitale Topeka). Wichita è la riconosciuta \"Capitale dell'Aviazione\": qui operano gli stabilimenti Stearman Aircraft (filiale Boeing), Cessna, Beechcraft e Mooney. Lo stabilimento Stearman produce il biplano d'addestramento primario Kaydet (PT-13/PT-17) utilizzato da marina ed esercito. Nelle Grandi Pianure, vastissimi granai di grano duro invernale e centri carni a Kansas City.",
    s2_4: "Stato del Kansas. La Boeing espande lo stabilimento Plant II a Wichita per la produzione di parti per i bombardieri B-17 Flying Fortress e accetta ordini di massa per l'addestratore Stearman Kaydet in virtù del programma d'addestramento piloti civili (CPTP).",
    s5_6: "Stato del Kansas (1939-1940). Dopo lo scoppio delle ostilità in Europa, Wichita registra un afflusso massiccio di migliaia di operai e tecnici; la Beechcraft espande gli stabilimenti per i bimotori da trasporto e addestramento AT-7/C-45, la Cessna per i bimotori Bobcat AT-17.",
    s7: "Stato del Kansas (ottobre 1940). Snodo chiave dell'Arsenale della Democrazia. La Boeing Wichita viene selezionata dal War Department come polo prioritario per la futura produzione di bombardieri pesanti strategici; a Parsons viene avviata la costruzione della Kansas Ordnance Plant.",
    s8: "Stato del Kansas (aprile 1941). Sotto il Lend-Lease, a Wichita viene inaugurato l'ampliamento del gigantesco Boeing Plant II destinato ad assemblare i bombardieri B-29 Superfortress; migliaia di Stearman formano i piloti che combatteranno nei cieli d'Europa e del Pacifico.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_KS"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_KS"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_KS"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_KS"].s2_4;
      return USA_PROVINCES_META["US_KS"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Kansas (Sunflower State — Wichita Aviation Capital)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Kansas (Gov. Alf Landon / Walter A. Huxman / Payne Ratner)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_KY: {
    id: "US_KY",
    iso: "US-KY",
    name: "Kentucky",
    modernName: "Commonwealth of Kentucky",
    historicalName: "Kentucky (Bluegrass State — Fort Knox & Louisville)",
    adminTitle: "United States of America — Commonwealth of Kentucky (Gov. Happy Chandler / Keen Johnson)",
    capital: "Frankfort",
    region: "South",
    isState: true,
    historicalToponym: "Frankfort (Capitale) / Louisville / Fort Knox / Lexington",
    s0_1: "Commonwealth del Kentucky (Capitale Frankfort). Nel 1936 il Dipartimento del Tesoro inaugura a Fort Knox lo United States Bullion Depository, fortezza sotterranea inespugnabile progettata per custodire la quasi totalità delle riserve auree federali della nazione. Presso Fort Knox si insedia la neocostituita 7ª Brigata di Cavalleria Meccanizzata dell'esercito, primo embrione delle forze corazzate statunitensi. Ricche miniere di carbone negli Appalachi e porto fluviale di Louisville.",
    s2_4: "Commonwealth del Kentucky. Le riserve auree di Fort Knox aumentano vertiginosamente a seguito della fuga di capitali e metalli preziosi dall'Europa minacciata da Hitler. L'esercito intensifica l'addestramento dei carristi a Fort Knox sotto la guida del Gen. Adna R. Chaffee Jr.",
    s5_6: "Commonwealth del Kentucky (1939-1940). Nel luglio 1940 viene formalmente istituita a Fort Knox la Armored Force dell'US Army (Armored Corps), segnando la nascita dottrinale e tattica delle moderne divisioni corazzate americane; a Louisville la Ford converte le linee di montaggio.",
    s7: "Commonwealth del Kentucky (ottobre 1940). Fort Knox diventa la capitale dottrinale e formativa della neonata arma corazzata, dove affluiscono decine di migliaia di coscritti del Selective Service; il carbone dei bacini orientali alimenta le acciaierie dell'Ohio e della Pennsylvania.",
    s8: "Commonwealth del Kentucky (aprile 1941). Sotto il Lend-Lease, la Armored Force School di Fort Knox addestra a ritmo incessante gli equipaggi dei nuovi carri medi M3 Lee e Grant destinati all'esercito britannico impegnato contro Rommel in Nordafrica.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_KY"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_KY"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_KY"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_KY"].s2_4;
      return USA_PROVINCES_META["US_KY"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Kentucky (Bluegrass State — Fort Knox & Louisville)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — Commonwealth of Kentucky (Gov. Happy Chandler / Keen Johnson)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_LA: {
    id: "US_LA",
    iso: "US-LA",
    name: "Louisiana",
    modernName: "State of Louisiana",
    historicalName: "Louisiana (Pelican State — New Orleans & Higgins Boats)",
    adminTitle: "United States of America — State of Louisiana (Gov. Richard W. Leche / Earl K. Long / Sam H. Jones)",
    capital: "Baton Rouge",
    region: "South",
    isState: true,
    historicalToponym: "Baton Rouge (Capitale) / New Orleans / Shreveport",
    s0_1: "Stato della Louisiana (Capitale Baton Rouge). New Orleans è il grandioso porto oceanico e fluviale alla foce del fiume Mississippi, capolinea dell'intero commercio del bacino centrale americano. Andrew Higgins, fondatore della Higgins Industries, brevetta battelli a fondo piatto resistenti per le paludi (bayou), embrione dei futuri rivoluzionari mezzi da sbarco anfibi della fanteria.",
    s2_4: "Stato della Louisiana. La U.S. Navy e i Marines intuiscono il potenziale rivoluzionario dei battelli Eureka di Higgins e avviano collaudi segreti per l'impiego anfibio; le raffinerie petrolifere di Baton Rouge (Standard Oil of Louisiana) espandono gli impianti.",
    s5_6: "Stato della Louisiana (1939-1940). Dopo la caduta della Francia e l'evacuazione di Dunkerque, la marina comprende che la riconquista dei continenti richiederà giganteschi sbarchi anfibi: la Higgins Industries riceve i primi ordini ufficiali per i mezzi da sbarco LCVP (Landing Craft, Vehicle, Personnel).",
    s7: "Stato della Louisiana (ottobre 1940). La Higgins Industries apre nuovi cantieri navali a New Orleans per fabbricare centinaia di Higgins Boat al mese; nel centro della Louisiana (Contea di Rapides) l'esercito istituisce Camp Claiborne e Camp Livingston per grandi manovre.",
    s8: "Stato della Louisiana (aprile 1941). Nell'estate 1941 la Louisiana ospita le leggendarie Louisiana Maneuvers, le più colossali esercitazioni militari della storia americana (oltre 400.000 soldati comandati da Marshall, Eisenhower e Patton); New Orleans sforna battelli da sbarco per il Lend-Lease atlantico e pacifico.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_LA"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_LA"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_LA"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_LA"].s2_4;
      return USA_PROVINCES_META["US_LA"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Louisiana (Pelican State — New Orleans & Higgins Boats)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Louisiana (Gov. Richard W. Leche / Earl K. Long / Sam H. Jones)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_ME: {
    id: "US_ME",
    iso: "US-ME",
    name: "Maine",
    modernName: "State of Maine",
    historicalName: "Maine (Pine Tree State — Bath Iron Works)",
    adminTitle: "United States of America — State of Maine (Gov. Louis J. Brann / Lewis O. Barrows / Sumner Sewall)",
    capital: "Augusta",
    region: "New England",
    isState: true,
    historicalToponym: "Augusta (Capitale) / Portland / Bath / Bangor",
    s0_1: "Stato del Maine (Capitale Augusta). All'estremità nord-orientale dell'Unione; sulle rive del fiume Kennebec sorgono i prestigiosi cantieri navali della Bath Iron Works (BIW), storici specialisti nella costruzione dei più veloci e avanzati cacciatorpediniere della U.S. Navy (classe Mahan e Sims). Porto oceanico di Portland e Portsmouth Naval Shipyard (situato a Kittery sul confine tra Maine e New Hampshire) per sottomarini.",
    s2_4: "Stato del Maine. Con il Second Vinson Act del 1938, la Bath Iron Works amplia gli scali per costruire in parallelo i cacciatorpediniere di squadra; il Portsmouth Navy Yard espande la costruzione dei sommergibili d'attacco oceanici.",
    s5_6: "Stato del Maine (1939-1940). Con l'avvio della Neutrality Patrol e l'accordo Destroyers for Bases del settembre 1940, Bath Iron Works opera come cantiere prioritario della marina; a Portland il porto naturale di Casco Bay viene fortificato e designato futuro ancoraggio primario per la flotta atlantica.",
    s7: "Stato del Maine (ottobre 1940). A Portland la Todd-Bath Iron Shipbuilding Corporation avvia la costruzione di un nuovo immenso cantiere navale a South Portland per costruire 30 navi mercantili Ocean Class per conto del governo britannico sotto assedio.",
    s8: "Stato del Maine (aprile 1941). Sotto il Lend-Lease, Casco Bay (Portland) diventa la Naval Operating Base per la Support Force Atlantic Fleet dell'ammiraglio Bristol: decine di cacciatorpediniere americani salpano da qui per scortare i convogli transatlantici fino all'Islanda.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_ME"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_ME"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_ME"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_ME"].s2_4;
      return USA_PROVINCES_META["US_ME"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Maine (Pine Tree State — Bath Iron Works)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Maine (Gov. Louis J. Brann / Lewis O. Barrows / Sumner Sewall)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_MD: {
    id: "US_MD",
    iso: "US-MD",
    name: "Maryland",
    modernName: "State of Maryland",
    historicalName: "Maryland (Old Line State — Baltimore & Annapolis)",
    adminTitle: "United States of America — State of Maryland (Gov. Harry Nice / Herbert R. O'Conor)",
    capital: "Annapolis",
    region: "Mid-Atlantic",
    isState: true,
    historicalToponym: "Annapolis (Capitale) / Baltimore / Aberdeen / Bethesda",
    s0_1: "Stato del Maryland (Capitale Annapolis). Ad Annapolis sorge la gloriosa United States Naval Academy, tempio dell'istruzione di tutti gli ufficiali di linea della marina. Baltimora è un polo industriale, portuale e chimico marittimo con i cantieri navali Bethlehem-Fairfield e le acciaierie di Sparrows Point (le più grandi sulla costa atlantica). Ad Aberdeen opera il prestigioso Aberdeen Proving Ground dell'esercito per il collaudo di armi ed esplosivi.",
    s2_4: "Stato del Maryland. L'aerodromo di Middle River a Baltimora ospita gli stabilimenti della Glenn L. Martin Company, pioniera nei bombardieri bimotori B-26 Marauder e nei giganteschi idrovolanti PBM Mariner per la ricognizione oceanica.",
    s5_6: "Stato del Maryland (1939-1940). La Martin Company espande la produzione per gli ordini francesi e britannici sotto Cash and Carry; Sparrows Point fornisce acciaio per navi da guerra e lamiere corazzate per i cantieri atlantici.",
    s7: "Stato del Maryland (ottobre 1940). Cuore dell'Arsenale della Democrazia. A Baltimora viene istituito il cantiere navale d'emergenza Bethlehem-Fairfield per assemblare centinaia di navi Liberty prefabbricate; ad Aberdeen il personale militare collauda i carri armati e i cannoni d'artiglieria.",
    s8: "Stato del Maryland (aprile 1941). Sotto il Lend-Lease, la Martin Company consegna i primi bombardieri d'assalto B-26 Marauder; a Baltimora viene posata la chiglia della prima celebre nave Liberty, la SS Patrick Henry, varata in presenza di Roosevelt nel settembre 1941.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_MD"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_MD"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_MD"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_MD"].s2_4;
      return USA_PROVINCES_META["US_MD"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Maryland (Old Line State — Baltimore & Annapolis)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Maryland (Gov. Harry Nice / Herbert R. O'Conor)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_MA: {
    id: "US_MA",
    iso: "US-MA",
    name: "Massachusetts",
    modernName: "Commonwealth of Massachusetts",
    historicalName: "Massachusetts (Bay State — Boston & Quincy)",
    adminTitle: "United States of America — Commonwealth of Massachusetts (Gov. James M. Curley / Charles F. Hurley / Leverett Saltonstall)",
    capital: "Boston",
    region: "New England",
    isState: true,
    historicalToponym: "Boston (Capitale) / Quincy / Worcester / Springfield",
    s0_1: "Commonwealth del Massachusetts (Capitale Boston). Vertice storico, intellettuale e tecnologico degli Stati Uniti. Boston Navy Yard a Charlestown storico arsenale militare della marina; a Quincy operano i cantieri navali Bethlehem Fore River Shipyard, capaci di costruire corazzate pesanti (USS Massachusetts) e portaerei. A Springfield ha sede lo Springfield Armory, arsenale statale creatore e produttore del rivoluzionario fucile semiautomatico M1 Garand. Laboratori del MIT e di Harvard impegnati nella ricerca scientifica avanzata.",
    s2_4: "Commonwealth del Massachusetts. Nel 1938 i laboratori del Massachusetts Institute of Technology (MIT) avviano progetti d'avanguardia nei servomeccanismi e nella fisica elettronica; la Springfield Armory accelera l'assemblaggio dei fucili M1 Garand per dotare ogni fante americano.",
    s5_6: "Commonwealth del Massachusetts (1939-1940). A Fore River viene posata la chiglia della corazzata USS Massachusetts (BB-59) e dell'incrociatore pesante Quincy; nell'ottobre 1940 presso il MIT viene fondato il leggendario Radiation Laboratory (Rad Lab) in collaborazione con la Missione britannica Tizard per lo sviluppo del radar a microonde (cavity magnetron).",
    s7: "Commonwealth del Massachusetts (ottobre 1940). Il Radiation Laboratory del MIT diventa il centro mondiale della tecnologia radar alleata, coordinando migliaia di scienziati; a Springfield la produzione del fucile Garand raggiunge i 600 pezzi al giorno per l'Arsenale della Democrazia.",
    s8: "Commonwealth del Massachusetts (aprile 1941). Piena mobilitazione del Lend-Lease: i cantieri di Boston e Fore River varano cacciatorpediniere e incrociatori; il MIT consegna i primi apparati radar centimetrici aviotrasportati che ribalteranno la Battaglia dell'Atlantico contro i sommergibili dell'Asse.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_MA"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_MA"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_MA"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_MA"].s2_4;
      return USA_PROVINCES_META["US_MA"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Massachusetts (Bay State — Boston & Quincy)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — Commonwealth of Massachusetts (Gov. James M. Curley / Charles F. Hurley / Leverett Saltonstall)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_MI: {
    id: "US_MI",
    iso: "US-MI",
    name: "Michigan",
    modernName: "State of Michigan",
    historicalName: "Michigan (Detroit — Motor City & Arsenal of Democracy)",
    adminTitle: "United States of America — State of Michigan (Gov. Frank Murphy / Frank Fitzgerald / Luren Dickinson / Murray Van Wagoner)",
    capital: "Lansing",
    region: "Midwest",
    isState: true,
    historicalToponym: "Lansing (Capitale) / Detroit / Flint / Grand Rapids",
    s0_1: "Stato del Michigan (Capitale Lansing). Detroit è la capitale mondiale assoluta dell'industria automobilistica e della catena di montaggio (Ford a River Rouge, General Motors, Chrysler, Packard). River Rouge di Henry Ford è il più colossale complesso manifatturiero integrato della storia umana, capace di ricevere minerale ferroso grezzo e trasformarlo in automobili in poche ore. Polo siderurgico, chimico e delle macchine utensili.",
    s2_4: "Stato del Michigan. I giganti di Detroit iniziano a dialogare con il War Department per piani di riconversione bellica in caso di conflitto globale: la Packard sperimenta motori marini per motosiluranti PT Boat; la General Motors adegua le fonderie per monoblocchi pesanti.",
    s5_6: "Stato del Michigan (1939-1940). Con la caduta della Francia nel giugno 1940, William S. Knudsen (presidente General Motors) viene nominato da Roosevelt a capo della National Defense Advisory Commission. Knudsen convince la Chrysler a costruire da zero l'immenso Detroit Arsenal Tank Plant a Warren per la produzione di massa di carri armati.",
    s7: "Stato del Michigan (ottobre 1940). Detroit diventa la punta di diamante del Discorso del Caminetto di Roosevelt sull'Arsenale della Democrazia: la Packard avvia la produzione su licenza britannica del leggendario motore aeronautico Rolls-Royce Merlin (Packard V-1650); la Ford pianifica il colossale impianto Willow Run per produrre un bombardiere B-24 ogni ora.",
    s8: "Stato del Michigan (aprile 1941). Con l'approvazione del Lend-Lease Act, a Warren la Chrysler completa e inaugura il Detroit Tank Arsenal, consegnando i primi carri medi M3 Lee per l'esercito britannico; l'intera industria dell'auto si converte alla vittoria delle democrazie.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_MI"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_MI"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_MI"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_MI"].s2_4;
      return USA_PROVINCES_META["US_MI"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Michigan (Detroit — Motor City & Arsenal of Democracy)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Michigan (Gov. Frank Murphy / Frank Fitzgerald / Luren Dickinson / Murray Van Wagoner)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_MN: {
    id: "US_MN",
    iso: "US-MN",
    name: "Minnesota",
    modernName: "State of Minnesota",
    historicalName: "Minnesota (North Star State — Mesabi Iron Range & Duluth)",
    adminTitle: "United States of America — State of Minnesota (Gov. Floyd B. Olson / Elmer Benson / Harold Stassen)",
    capital: "Saint Paul",
    region: "Midwest",
    isState: true,
    historicalToponym: "Saint Paul (Capitale) / Minneapolis / Duluth / Hibbing",
    s0_1: "Stato del Minnesota (Capitale Saint Paul). Nella Contea di St. Louis a nord si trova la Mesabi Iron Range, il più ricco bacino di minerale ferroso della Terra (miniera a cielo aperto Hull-Rust-Mahoning a Hibbing). Dal porto di Duluth sul Lago Superiore partono i giganteschi mercantili lacustri che convogliano il ferro verso le acciaierie di Chicago, Gary, Detroit, Cleveland e Pittsburgh. Minneapolis è il centro molitorio cerealicolo dell'Unione.",
    s2_4: "Stato del Minnesota. Il giovane governatore repubblicano internazionalista Harold Stassen (eletto nel 1938) sostiene la modernizzazione delle infrastrutture e l'efficienza dei trasporti lacustri; la Mesabi Range incrementa i turni di scavo per le commesse del Second Vinson Act.",
    s5_6: "Stato del Minnesota (1939-1940). Durante la navigazione primaverile del 1940, dal porto di Duluth transita un quantitativo senza precedenti di minerale di ferro per alimentare la fabbricazione dell'acciaio per la Two-Ocean Navy e i rifornimenti alleati sotto Cash and Carry.",
    s7: "Stato del Minnesota (ottobre 1940). La Mesabi Range estrae oltre il 60% dell'intero minerale di ferro consumato negli Stati Uniti; a Minneapolis e St. Paul le officine meccaniche si convertono alla fabbricazione di parti per mitragliatrici e munizioni; a Duluth i cantieri navali lacustri allestiscono navi da carico.",
    s8: "Stato del Minnesota (aprile 1941). Sotto il Lend-Lease, i battelli lacustri carichi di minerale infrangono tutti i record storici di tonnellaggio attraverso le chiuse di Sault Ste. Marie; il ferro del Minnesota costituisce la vera materia prima fondante dell'Arsenale delle Democrazie.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_MN"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_MN"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_MN"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_MN"].s2_4;
      return USA_PROVINCES_META["US_MN"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Minnesota (North Star State — Mesabi Iron Range & Duluth)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Minnesota (Gov. Floyd B. Olson / Elmer Benson / Harold Stassen)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_MS: {
    id: "US_MS",
    iso: "US-MS",
    name: "Mississippi",
    modernName: "State of Mississippi",
    historicalName: "Mississippi (Magnolia State — Pascagoula & Jackson)",
    adminTitle: "United States of America — State of Mississippi (Gov. Hugh L. White / Paul B. Johnson Sr.)",
    capital: "Jackson",
    region: "South",
    isState: true,
    historicalToponym: "Jackson (Capitale) / Pascagoula / Biloxi / Vicksburg",
    s0_1: "Stato del Mississippi (Capitale Jackson). Stato prevalentemente agricolo del profondo Sud, primatista nella produzione di cotone lungo le fertili pianure del delta del Mississippi. Nel 1936 il governatore Hugh L. White lancia il programma Balance Agriculture With Industry (BAWI) per attirare manifatture industriali. Nel 1938 a Pascagoula sul Golfo del Messico viene fondata la Ingalls Shipbuilding Corporation.",
    s2_4: "Stato del Mississippi. La neonata Ingalls Shipbuilding di Pascagoula introduce una tecnologia costruttiva rivoluzionaria: la saldatura elettrica integrale dello scafo al posto della tradizionale rivettatura, riducendo peso e tempi di costruzione per i mercantili della U.S. Maritime Commission.",
    s5_6: "Stato del Mississippi (1939-1940). Con l'approvazione del programma navale d'emergenza, la Ingalls vara la SS Exemplar, prima nave mercantile oceanica al mondo a scafo interamente saldato; la United States Maritime Commission quadruplica le ordinazioni di navi da carico C3.",
    s7: "Stato del Mississippi (ottobre 1940). La Ingalls Shipbuilding di Pascagoula riceve contratti per convertire scafi mercantili C3 nelle prime portaerei di scorta (Escort Carriers / CVE) della U.S. Navy; a Hattiesburg viene ampliato Camp Shelby, uno dei più vasti campi d'addestramento della nazione per la fanteria federale.",
    s8: "Stato del Mississippi (aprile 1941). Sotto il Lend-Lease, a Pascagoula si accelerano i lavori per la conversione della prima portaerei di scorta destinata alla Royal Navy britannica (classe Long Island / Avenger); Camp Shelby ospita oltre 50.000 coscritti in addestramento.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_MS"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_MS"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_MS"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_MS"].s2_4;
      return USA_PROVINCES_META["US_MS"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Mississippi (Magnolia State — Pascagoula & Jackson)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Mississippi (Gov. Hugh L. White / Paul B. Johnson Sr.)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_MO: {
    id: "US_MO",
    iso: "US-MO",
    name: "Missouri",
    modernName: "State of Missouri",
    historicalName: "Missouri (Show Me State — St. Louis & Kansas City)",
    adminTitle: "United States of America — State of Missouri (Gov. Guy B. Park / Lloyd C. Stark / Forrest C. Donnell)",
    capital: "Jefferson City",
    region: "Midwest",
    isState: true,
    historicalToponym: "Jefferson City (Capitale) / St. Louis / Kansas City / Springfield",
    s0_1: "Stato del Missouri (Capitale Jefferson City). St. Louis è la storica \"Porta del West\" e grandioso crocevia continentale alla confluenza dei fiumi Mississippi e Missouri; secondo snodo ferroviario della nazione, grande centro manifatturiero, chimico (Monsanto) e birrario (Anheuser-Busch). Nel 1939 James Smith McDonnell fonda a St. Louis la McDonnell Aircraft Corporation; a Kansas City operano giganteschi mercati di bestiame e sili di grano.",
    s2_4: "Stato del Missouri. Gli stabilimenti aeronautici Curtiss-Wright di St. Louis e la neonata McDonnell iniziano a ricevere commesse governative per addestratori e caccia; la Monsanto espande la sintesi di resine e composti chimici per l'Air Corps.",
    s5_6: "Stato del Missouri (1939-1940). Con lo scoppio della guerra europea, il Missouri converte le linee produttive: le calzaturifici di St. Louis producono milioni di stivali da combattimento; a Kansas City si insediano i primi stabilimenti per motori e munizionamento.",
    s7: "Stato del Missouri (ottobre 1940). Nel centro dello Stato, nella Contea di Pulaski, l'esercito istituisce nel dicembre 1940 l'immenso campo d'addestramento Fort Leonard Wood per il corpo degli ingegneri (US Army Corps of Engineers); Curtiss-Wright a St. Louis costruisce il caccia d'attacco navale SB2C Helldiver.",
    s8: "Stato del Missouri (aprile 1941). Sotto il Lend-Lease, il Missouri è un pilastro logistico centrale dell'Arsenale delle Democrazie: Fort Leonard Wood addestra decine di migliaia di genieri pontieri e pionieri; la Curtiss-Wright e la McDonnell lavorano a pieno regime per l'aviazione alleata.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_MO"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_MO"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_MO"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_MO"].s2_4;
      return USA_PROVINCES_META["US_MO"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Missouri (Show Me State — St. Louis & Kansas City)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Missouri (Gov. Guy B. Park / Lloyd C. Stark / Forrest C. Donnell)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_MT: {
    id: "US_MT",
    iso: "US-MT",
    name: "Montana",
    modernName: "State of Montana",
    historicalName: "Montana (Treasure State — Butte & Anaconda Copper)",
    adminTitle: "United States of America — State of Montana (Gov. Elmer Holt / Roy E. Ayers / Sam C. Ford)",
    capital: "Helena",
    region: "Mountain West",
    isState: true,
    historicalToponym: "Helena (Capitale) / Butte / Billings / Great Falls / Missoula",
    s0_1: "Stato del Montana (Capitale Helena). Dominato dalle vette delle Montagne Rocciose a ovest e dalle Grandi Pianure a est. Cuore minerario d'America a Butte, soprannominata \"la Collina più Ricca della Terra\", dove la Anaconda Copper Mining Company estrae imponenti quantitativi di rame, zinco, piombo e manganese; a breve distanza sorgono le colossali fonderie di Anaconda. Allevamenti di bestiame e grano duro; la Diga di Fort Peck sul fiume Missouri, monumentale opera idroelettrica del New Deal, viene completata.",
    s2_4: "Stato del Montana. Il completamento della Diga di Fort Peck sul Missouri e l'inaugurazione delle turbine idroelettriche assicurano energia a basso costo per l'industria estrattiva e metallurgica; la domanda di rame per il riarmo navale raddoppia i turni di lavoro nelle gallerie di Butte.",
    s5_6: "Stato del Montana (1939-1940). Il rame, lo zinco e il manganese della Anaconda Mining vengono dichiarati metalli strategici per la difesa nazionale; la centrale idroelettrica di Fort Peck è posta sotto sorveglianza federale armata contro possibili sabotaggi.",
    s7: "Stato del Montana (ottobre 1940). Dopo il Selective Service Act, i giovani del Montana affluiscono nei centri di reclutamento; a Great Falls e Billings gli scali ferroviari della Great Northern e della Northern Pacific lavorano senza sosta nel trasporto di metalli e grano verso i porti dell'Atlantico e del Pacifico.",
    s8: "Stato del Montana (aprile 1941). Piena operatività del Lend-Lease: Butte e Anaconda estraggono e raffinano metalli non ferrosi essenziali per munizioni e impianti radar della Royal Navy britannica; a Great Falls si allestiscono le piste per il futuro corridoio aereo transpolare ALSIB verso l'URSS.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_MT"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_MT"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_MT"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_MT"].s2_4;
      return USA_PROVINCES_META["US_MT"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Montana (Treasure State — Butte & Anaconda Copper)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Montana (Gov. Elmer Holt / Roy E. Ayers / Sam C. Ford)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_NE: {
    id: "US_NE",
    iso: "US-NE",
    name: "Nebraska",
    modernName: "State of Nebraska",
    historicalName: "Nebraska (Cornhusker State — Omaha)",
    adminTitle: "United States of America — State of Nebraska (Gov. Robert L. Cochran / Dwight Griswold)",
    capital: "Lincoln",
    region: "Great Plains",
    isState: true,
    historicalToponym: "Lincoln (Capitale) / Omaha / Grand Island / North Platte",
    s0_1: "Stato del Nebraska (Capitale Lincoln). Centro nevralgico delle Grandi Pianure; Omaha ospita il quartier generale della Union Pacific Railroad, la più celebre ferrovia transcontinentale, e grandiosi stabilimenti di lavorazione delle carni (Union Stock Yards di Omaha). Agricoltura estensiva di mais, frumento e allevamento di bovini da carne.",
    s2_4: "Stato del Nebraska. Unico Stato dell'Unione dotato di una legislatura unicamerale apartitica (Unicameral) istituita nel 1937 su iniziativa del senatore progressista George W. Norris. I piani di difesa emisferica valorizzano la posizione centrale e protetta del Nebraska per futuri stabilimenti militari.",
    s5_6: "Stato del Nebraska (1939-1940). La Union Pacific Railroad a Omaha organizza il transito continuo di treni merci pesanti carichi di materie prime dalle coste occidentali ai poli industriali orientali; Fort Crook nei pressi di Omaha viene selezionato per l'insediamento di una nuova fabbrica di bombardieri pesanti.",
    s7: "Stato del Nebraska (ottobre 1940). A Fort Crook (Bellevue, presso Omaha) il War Department avvia la costruzione dell'imponente stabilimento aeronautico della Glenn L. Martin Company (Martin-Nebraska Bomber Plant) per la produzione su licenza dei bombardieri B-26 Marauder e futuri bombardieri strategici.",
    s8: "Stato del Nebraska (aprile 1941). Sotto il Lend-Lease, il Nebraska alimenta gli Alleati con carni lavorate e cereali conservati; a Fort Crook si completano le catene di montaggio della Martin, pronte a sfornare centinaia di velivoli da guerra.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_NE"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_NE"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_NE"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_NE"].s2_4;
      return USA_PROVINCES_META["US_NE"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Nebraska (Cornhusker State — Omaha)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Nebraska (Gov. Robert L. Cochran / Dwight Griswold)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_NV: {
    id: "US_NV",
    iso: "US-NV",
    name: "Nevada",
    modernName: "State of Nevada",
    historicalName: "Nevada (Silver State — Boulder Dam & Las Vegas)",
    adminTitle: "United States of America — State of Nevada (Gov. Richard Kirman Sr. / Edward P. Carville)",
    capital: "Carson City",
    region: "Mountain West",
    isState: true,
    historicalToponym: "Carson City (Capitale) / Las Vegas / Reno / Ely",
    s0_1: "Stato del Nevada (Capitale Carson City). Vasto territorio desertico del Gran Bacino. Nel settembre 1936 il presidente Franklin D. Roosevelt inaugura sul fiume Colorado la colossale Diga di Hoover (all'epoca Boulder Dam), la più imponente diga in calcestruzzo del mondo, capolavoro ingegneristico del New Deal fornitore di energia idroelettrica a basso costo e riserva idrica per l'intera California del Sud e l'Arizona. Miniere di rame di Ely (Kennecott Copper).",
    s2_4: "Stato del Nevada. L'abbondanza di energia idroelettrica della Diga di Hoover rende il Nevada meridionale il sito ideale per future industrie elettrochimiche e metallurgiche ad alto assorbimento energetico.",
    s5_6: "Stato del Nevada (1939-1940). Con l'inizio delle ostilità in Europa, la Diga di Hoover viene blindata e presidiata militarmente per timore di attentati dell'Asse; il governo federale seleziona i deserti pianeggianti a nord di Las Vegas per il futuro Las Vegas Army Airfield (addestramento mitraglieri di bordo).",
    s7: "Stato del Nevada (ottobre 1940). A Henderson, tra Las Vegas e la Diga di Hoover, viene pianificata la costruzione dell'immenso impianto Basic Magnesium Incorporated (BMI), destinato a diventare il massimo produttore mondiale di magnesio metallico per leghe aeronautiche e bombe incendiarie.",
    s8: "Stato del Nevada (aprile 1941). Sotto il Lend-Lease, l'avvio della costruzione del complesso del magnesio di Henderson trasforma il Nevada meridionale in un polo industriale strategico di prima grandezza, mentre a Reno ed Ely l'estrazione mineraria lavora a ciclo continuo.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_NV"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_NV"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_NV"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_NV"].s2_4;
      return USA_PROVINCES_META["US_NV"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Nevada (Silver State — Boulder Dam & Las Vegas)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Nevada (Gov. Richard Kirman Sr. / Edward P. Carville)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_NH: {
    id: "US_NH",
    iso: "US-NH",
    name: "New Hampshire",
    modernName: "State of New Hampshire",
    historicalName: "New Hampshire (Granite State — Portsmouth Navy Yard)",
    adminTitle: "United States of America — State of New Hampshire (Gov. H. Styles Bridges / Francis P. Murphy / Robert O. Blood)",
    capital: "Concord",
    region: "New England",
    isState: true,
    historicalToponym: "Concord (Capitale) / Manchester / Portsmouth / Nashua",
    s0_1: "Stato del New Hampshire (Capitale Concord). Cuore del New England dominato dalle White Mountains. Portsmouth è lo storico porto marittimo sull'Atlantico prospiciente il Portsmouth Naval Shipyard (situato sulle isole fluviali del Piscataqua), cantiere navale federale d'eccellenza per la progettazione e costruzione di sottomarini per la U.S. Navy. Industria tessile e calzaturiera a Manchester e Nashua lungo il fiume Merrimack.",
    s2_4: "Stato del New Hampshire. Il Portsmouth Naval Shipyard riceve contratti per i sommergibili oceanici classe Sargo e Tambor; gli ingegneri navali introducono innovazioni nell'apparato di salvataggio dei sommergibili (campana McCann) dopo l'affondamento dell'USS Squalus al largo dell'isola di Shoals nel maggio 1939.",
    s5_6: "Stato del New Hampshire (1939-1940). Dopo lo scoppio della guerra europea, Portsmouth accelera il ritmo di completamento dei battelli subacquei; l'USS Squalus viene recuperato, ristrutturato e ribattezzato USS Sailfish per la marina.",
    s7: "Stato del New Hampshire (ottobre 1940). Con il programma Two-Ocean Navy e il Selective Service, il Portsmouth Naval Shipyard quintuplica gli organici operai, lavorando su tre turni per varare i sommergibili d'attacco classe Gato destinati alle profondità atlantiche e pacifiche.",
    s8: "Stato del New Hampshire (aprile 1941). Sotto il Lend-Lease, il New Hampshire produce sommergibili a ciclo continuo per presidiare le rotte transatlantiche; le fabbriche tessili di Manchester forniscono milioni di uniformi e coperte di lana per le forze armate alleate.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_NH"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_NH"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_NH"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_NH"].s2_4;
      return USA_PROVINCES_META["US_NH"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "New Hampshire (Granite State — Portsmouth Navy Yard)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of New Hampshire (Gov. H. Styles Bridges / Francis P. Murphy / Robert O. Blood)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_NJ: {
    id: "US_NJ",
    iso: "US-NJ",
    name: "New Jersey",
    modernName: "State of New Jersey",
    historicalName: "New Jersey (Garden State — Camden & New York Ship)",
    adminTitle: "United States of America — State of New Jersey (Gov. Harold G. Hoffman / A. Harry Moore / Charles Edison)",
    capital: "Trenton",
    region: "Mid-Atlantic",
    isState: true,
    historicalToponym: "Trenton (Capitale) / Newark / Camden / Jersey City / Bayonne",
    s0_1: "Stato del New Jersey (Capitale Trenton). Situato tra New York City e Philadelphia; grandioso polo manifatturiero, chimico ed elettronico. A Camden sul fiume Delaware operano i cantieri navali della New York Shipbuilding Corporation (New York Ship), fra i più imponenti cantieri navali del mondo, costruttori di incrociatori pesanti e navi da battaglia. A Bayonne opera la base navale e terminal petrolifero; a Newark e Harrison i colossi della radiofonia e dell'elettronica (RCA Victor) e laboratori Bell Labs a Murray Hill.",
    s2_4: "Stato del New Jersey. Charles Edison (figlio dell'inventore Thomas Edison), Segretario alla Marina nel 1939 e governatore del New Jersey dal 1941, spinge al massimo l'innovazione tecnologica navale; la New York Ship riceve ordini per le corazzate classe South Dakota e incrociatori pesanti.",
    s5_6: "Stato del New Jersey (1939-1940). Con il Two-Ocean Navy Act del giugno 1940, la New York Shipbuilding a Camden assume oltre 30.000 operai per impostare le corazzate USS South Dakota (BB-57), le navi da battaglia veloci e le grandi portaerei; a Fort Dix si prepara il più grande centro di mobilitazione e transito dell'esercito della costa orientale.",
    s7: "Stato del New Jersey (ottobre 1940). Fulcro dell'Arsenale della Democrazia. A Bayonne la marina costruisce il Bayonne Naval Drydock, il più grande bacino di carenaggio per corazzate della costa atlantica; a Paterson la Wright Aeronautical produce a ritmi industriali i motori aerei stellari Cyclone per i caccia e bombardieri alleati.",
    s8: "Stato del New Jersey (aprile 1941). Sotto il Lend-Lease, il New Jersey è una fucina industriale imponente: la New York Ship vara corazzate e portaerei; Fort Dix accoglie e forma fino a 50.000 coscritti al mese; le industrie chimiche e farmaceutiche di Newark riforniscono l'intero fronte atlantico.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_NJ"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_NJ"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_NJ"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_NJ"].s2_4;
      return USA_PROVINCES_META["US_NJ"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "New Jersey (Garden State — Camden & New York Ship)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of New Jersey (Gov. Harold G. Hoffman / A. Harry Moore / Charles Edison)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_NM: {
    id: "US_NM",
    iso: "US-NM",
    name: "New Mexico",
    modernName: "State of New Mexico",
    historicalName: "New Mexico (Land of Enchantment — Santa Fe & Albuquerque)",
    adminTitle: "United States of America — State of New Mexico (Gov. Clyde Tingley / John E. Miles)",
    capital: "Santa Fe",
    region: "Mountain West",
    isState: true,
    historicalToponym: "Santa Fe (Capitale) / Albuquerque / Las Cruces / Roswell",
    s0_1: "Stato del New Mexico (Capitale Santa Fe). Vasti altopiani semiaridi, mesas e catene montuose del Sud-Ovest. Snodo ferroviario e commerciale ad Albuquerque; ricche miniere di potassio a Carlsbad indispensabili per fertilizzanti e chimica agraria, miniere di rame a Chino (Kennecott Copper) e pozzi petroliferi nel bacino Permiano a sud-est.",
    s2_4: "Stato del New Mexico. I vasti spazi spopolati, l'altitudine e la visibilità meteorologica ideale attirano l'attenzione del War Department e dell'Air Corps per la creazione di poligoni d'addestramento e campi di tiro per il bombardamento.",
    s5_6: "Stato del New Mexico (1939-1940). Con l'approvazione del programma di difesa emisferica, ad Albuquerque viene ampliato il campo d'aviazione municipale trasformato nell'Albuquerque Army Air Base (futura Kirtland Air Force Base) per l'addestramento dei piloti di bombardieri.",
    s7: "Stato del New Mexico (ottobre 1940). Il 200º Reggimento d'Artiglieria Contraerea della Guardia Nazionale del New Mexico (composto da fanti che parlano sia inglese che spagnolo) viene mobilitato per l'invio all'avamposto strategico delle Isole Filippine a difesa del Pacifico.",
    s8: "Stato del Mexico (aprile 1941). Sotto il Lend-Lease, la base aerea di Albuquerque espande la scuola di bombardamento e navigazione; nei deserti remoti dell'Alamogordo Bombing Range e sui plateau montani di Los Alamos iniziano i primi sopralluoghi militari segreti per la futura ricerca nucleare avanzata.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_NM"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_NM"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_NM"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_NM"].s2_4;
      return USA_PROVINCES_META["US_NM"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "New Mexico (Land of Enchantment — Santa Fe & Albuquerque)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of New Mexico (Gov. Clyde Tingley / John E. Miles)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_NY: {
    id: "US_NY",
    iso: "US-NY",
    name: "New York",
    modernName: "State of New York",
    historicalName: "New York (Empire State — New York City & Brooklyn Navy Yard)",
    adminTitle: "United States of America — State of New York (Gov. Herbert H. Lehman)",
    capital: "Albany",
    region: "Mid-Atlantic",
    isState: true,
    historicalToponym: "Albany (Capitale) / New York City / Buffalo / Rochester / Syracuse",
    s0_1: "Stato di New York (Capitale Albany). Lo Stato più popoloso dell'Unione e la capitale finanziaria, commerciale e culturale del mondo occidentale (New York City, Wall Street). Il porto di New York gestisce quasi la metà dell'intero commercio oceanico estero statunitense. A Brooklyn opera il leggendario New York Naval Shipyard (Brooklyn Navy Yard), cantiere federale capofila per la costruzione di corazzate monumentali (USS North Carolina, USS Iowa). A Buffalo operano colossi metallurgici e la Curtiss-Wright (caccia P-40 Warhawk); a Rochester l'ottica di precisione Eastman Kodak e Bausch & Lomb.",
    s2_4: "Stato di New York. La Curtiss-Wright di Buffalo riceve commesse internazionali per il celebre caccia monomotore Curtiss P-40 Warhawk (usato dai Flying Tigers in Cina); al Brooklyn Navy Yard viene posata la chiglia della corazzata veloce USS North Carolina (BB-55) e si allestiscono i nuovi scali navali coperti.",
    s5_6: "Stato di New York (1939-1940). Dopo lo scoppio della Seconda Guerra Mondiale e l'approvazione del Cash and Carry, il porto di New York diventa il gigantesco terminale di imbarco dei convogli atlantici verso la Gran Bretagna; al Brooklyn Navy Yard Roosevelt supervisiona i lavori per le super-corazzate classe Iowa; a Long Island opera la Republic Aviation (caccia P-47 Thunderbolt) e la Grumman (caccia navali F4F Wildcat).",
    s7: "Stato di New York (ottobre 1940). Cuore pulsante dell'Arsenale della Democrazia. Il governatore Herbert H. Lehman e il sindaco di NYC Fiorello La Guardia coordinano la massima mobilitazione civile ed economica: il Brooklyn Navy Yard impiega oltre 45.000 operai; a Bethpage la Grumman accelera la produzione di aerosiluranti Avenger.",
    s8: "Stato di New York (aprile 1941). Sotto il Lend-Lease, la flotta mercantile alleata salpa dal porto di New York sotto la protezione della marina da guerra; a Buffalo la Curtiss-Wright lavora su tre turni sfornando caccia P-40 per la RAF, la Cina e le squadriglie americane; la finanza di New York sostiene il più imponente sforzo logistico della storia.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_NY"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_NY"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_NY"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_NY"].s2_4;
      return USA_PROVINCES_META["US_NY"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "New York (Empire State — New York City & Brooklyn Navy Yard)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of New York (Gov. Herbert H. Lehman)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_NC: {
    id: "US_NC",
    iso: "US-NC",
    name: "North Carolina",
    modernName: "State of North Carolina",
    historicalName: "North Carolina (Tar Heel State — Fort Bragg & Wilmington)",
    adminTitle: "United States of America — State of North Carolina (Gov. Clyde R. Hoey / J. Melville Broughton)",
    capital: "Raleigh",
    region: "South",
    isState: true,
    historicalToponym: "Raleigh (Capitale) / Charlotte / Wilmington / Fort Bragg",
    s0_1: "Stato della North Carolina (Capitale Raleigh). Centro mondiale della manifattura del tabacco e primatista nazionale nell'industria tessile del cotone e del mobile. Presso Fayetteville si estende Fort Bragg, la più grande base militare d'addestramento per artiglieria dell'esercito americano; porto oceanico di Wilmington sull'Atlantico.",
    s2_4: "Stato della North Carolina. Fort Bragg viene designato dal War Department come base di sperimentazione e addestramento per le nuove unità d'artiglieria campale e contraerea; le industrie tessili dello Stato ricevono i primi contratti federali per tele per uniformi, tende e paracadute.",
    s5_6: "Stato della North Carolina (1939-1940). Con l'approvazione del programma di mobilitazione, Fort Bragg raddoppia le strutture accogliendo decine di migliaia di soldati della 9ª Divisione di Fanteria; la marina seleziona le lagune costiere di Jacksonville per la futura immensa base dei Marines (Camp Lejeune).",
    s7: "Stato della North Carolina (ottobre 1940). A Wilmington il governo federale finanzia l'apertura del nuovo cantiere navale d'emergenza della North Carolina Shipbuilding Company (filiale della Newport News) per la costruzione in serie di navi mercantili Liberty; a Fort Bragg si insediano i reparti paracadutisti in addestramento.",
    s8: "Stato della North Carolina (aprile 1941). Sotto il Lend-Lease, il cantiere navale di Wilmington vara i suoi primi mercantili per la flotta oceanica; a Jacksonville apre la base d'addestramento anfibio di Camp Lejeune per i Marine; Fort Bragg è una formidabile città militare di oltre 60.000 uomini in armi.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_NC"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_NC"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_NC"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_NC"].s2_4;
      return USA_PROVINCES_META["US_NC"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "North Carolina (Tar Heel State — Fort Bragg & Wilmington)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of North Carolina (Gov. Clyde R. Hoey / J. Melville Broughton)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_ND: {
    id: "US_ND",
    iso: "US-ND",
    name: "North Dakota",
    modernName: "State of North Dakota",
    historicalName: "North Dakota (Peace Garden State — Bismarck & Red River)",
    adminTitle: "United States of America — State of North Dakota (Gov. Walter Welford / William Langer / John Moses)",
    capital: "Bismarck",
    region: "Great Plains",
    isState: true,
    historicalToponym: "Bismarck (Capitale) / Fargo / Grand Forks / Minot",
    s0_1: "Stato del North Dakota (Capitale Bismarck). Al confine settentrionale con il Canada lungo il 49° parallelo. Terre sterminate della Red River Valley e delle Grandi Pianure, primatiste assolute nella coltivazione di grano duro primaverile (Spring Wheat) per farine di alta qualità, orzo, segale e lino. Ripresa economica dopo le devastanti tempeste di sabbia del Dust Bowl grazie ai bacini idrici del New Deal.",
    s2_4: "Stato del North Dakota. Sotto la guida del governatore John Moses (eletto nel 1938), il North Dakota consolida i raccolti cerealicoli, fondamentali per le riserve alimentari federali; la frontiera canadese è presidiata pacificamente senza fortificazioni, simbolo della fratellanza nordamericana.",
    s5_6: "Stato del North Dakota (1939-1940). Con lo scoppio della guerra in Europa, la domanda internazionale di grano duro e sementi fa registrare un boom delle esportazioni; gli scali ferroviari della Great Northern a Fargo e Grand Forks lavorano a ritmo sostenuto verso i porti oceanici.",
    s7: "Stato del North Dakota (ottobre 1940). I giovani agricoltori del North Dakota rispondono alla chiamata del Selective Service Act, formando i reggimenti di fanteria della 34ª e 164ª Divisione; il grano dello Stato viene immagazzinato nei depositi strategici per l'Arsenale della Democrazia.",
    s8: "Stato del North Dakota (aprile 1941). Sotto il Lend-Lease, il North Dakota garantisce milioni di tonnellate di frumento per la Gran Bretagna e gli Alleati, mentre la 164ª Divisione di Fanteria (Guardia Nazionale del North Dakota) si addestra per missioni oltremare.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_ND"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_ND"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_ND"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_ND"].s2_4;
      return USA_PROVINCES_META["US_ND"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "North Dakota (Peace Garden State — Bismarck & Red River)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of North Dakota (Gov. Walter Welford / William Langer / John Moses)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_OH: {
    id: "US_OH",
    iso: "US-OH",
    name: "Ohio",
    modernName: "State of Ohio",
    historicalName: "Ohio (Buckeye State — Cleveland, Cincinnati & Akron)",
    adminTitle: "United States of America — State of Ohio (Gov. Martin L. Davey / John W. Bricker)",
    capital: "Columbus",
    region: "Midwest",
    isState: true,
    historicalToponym: "Columbus (Capitale) / Cleveland / Cincinnati / Akron / Dayton / Toledo",
    s0_1: "Stato dell'Ohio (Capitale Columbus). Gigante manifatturiero e siderurgico dei Grandi Laghi. Cleveland è una colossale metropoli dell'acciaio e della chimica sul Lago Erie (Republic Steel); Akron è la \"Capitale Mondiale della Gomma\" (sede di Goodyear, Firestone, Goodrich, General Tire). A Dayton (Wright Field) opera il centro ricerche e sperimentazioni aeronautiche avanzate dell'US Army Air Corps; Cincinnati polo delle macchine utensili.",
    s2_4: "Stato dell'Ohio. Il Wright Field a Dayton coordina lo sviluppo dei nuovi motori aeronautici sovralimentati, delle eliche a passo variabile e delle strumentazioni di volo cieco; ad Akron la Goodyear espande la produzione di dirigibili di pattugliamento navale e gomma per pneumatici militari.",
    s5_6: "Stato dell'Ohio (1939-1940). Dopo lo scoppio della guerra europea, le industrie dell'Ohio sono sommerse di ordini: le fabbriche di macchine utensili di Cincinnati e Cleveland equipaggiano le nuove linee belliche di tutti gli Stati Uniti; la Goodyear e la Firestone ad Akron avviano esperimenti su larga scala per la gomma sintetica.",
    s7: "Stato dell'Ohio (ottobre 1940). Pilastro dell'Arsenale della Democrazia. A Cleveland le acciaierie e fonderie lavorano a getto continuo; a Toledo la Willys-Overland vince il bando governativo per perfezionare e produrre in serie il rivoluzionario veicolo fuoristrada 4x4 leggero: la leggendaria Jeep Willys MB.",
    s8: "Stato dell'Ohio (aprile 1941). Sotto il Lend-Lease, la Willys a Toledo e la Ford producono migliaia di Jeep al mese per i fronti alleati; Akron rifornisce ogni aereo, carro armato e autocarro di pneumatici ad alta resistenza; il Wright Field a Dayton supervisiona il riarmo aereo dell'Unione.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_OH"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_OH"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_OH"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_OH"].s2_4;
      return USA_PROVINCES_META["US_OH"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Ohio (Buckeye State — Cleveland, Cincinnati & Akron)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Ohio (Gov. Martin L. Davey / John W. Bricker)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_OK: {
    id: "US_OK",
    iso: "US-OK",
    name: "Oklahoma",
    modernName: "State of Oklahoma",
    historicalName: "Oklahoma (Sooner State — Tulsa Oil Capital & Tinker Field)",
    adminTitle: "United States of America — State of Oklahoma (Gov. E.W. Marland / Leon C. Phillips)",
    capital: "Oklahoma City",
    region: "South",
    isState: true,
    historicalToponym: "Oklahoma City (Capitale) / Tulsa / Lawton / Fort Sill",
    s0_1: "Stato dell'Oklahoma (Capitale Oklahoma City). Tulsa è la celebre \"Capitale Mondiale del Petrolio\", sede dei quartier generali delle maggiori compagnie idrocarburiche e della International Petroleum Exposition. Bacini petroliferi dell'Oklahoma centrale e del bacino di Seminole. A Lawton si trova Fort Sill, storica sede della U.S. Army Field Artillery School, la principale scuola d'artiglieria dell'esercito.",
    s2_4: "Stato dell'Oklahoma. Il petrolio e il carburante avio raffinato dell'Oklahoma diventano strategici per l'alimentazione delle squadriglie dell'Air Corps; Fort Sill modernizza la dottrina del tiro rapido concentrato dell'artiglieria pesante.",
    s5_6: "Stato dell'Oklahoma (1939-1940). Con la guerra europea e il Cash and Carry, il petrolio dell'Oklahoma viene convogliato via oleodotto verso i porti del Golfo per i convogli atlantici; l'Air Corps seleziona Oklahoma City per l'insediamento di un immenso deposito e officina di riparazione aerea (futuro Tinker Field).",
    s7: "Stato dell'Oklahoma (ottobre 1940). Viene avviata a Oklahoma City la costruzione del Midwest Air Depot (Tinker Field) e a Tulsa Douglas Aircraft allestisce un immenso stabilimento per assemblare bombardieri B-24; a Fort Sill si addestrano migliaia di artiglieri della 45ª Divisione di Fanteria (Thunderbird).",
    s8: "Stato dell'Oklahoma (aprile 1941). Sotto il Lend-Lease, la 45ª Divisione di Fanteria (Oklahoma National Guard) è tra le formazioni più preparate dell'esercito; Tinker Field e la Douglas a Tulsa inaugurano le linee produttive per l'Arsenale delle Democrazie.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_OK"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_OK"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_OK"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_OK"].s2_4;
      return USA_PROVINCES_META["US_OK"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Oklahoma (Sooner State — Tulsa Oil Capital & Tinker Field)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Oklahoma (Gov. E.W. Marland / Leon C. Phillips)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_OR: {
    id: "US_OR",
    iso: "US-OR",
    name: "Oregon",
    modernName: "State of Oregon",
    historicalName: "Oregon (Beaver State — Portland & Bonneville Dam)",
    adminTitle: "United States of America — State of Oregon (Gov. Charles H. Martin / Charles A. Sprague)",
    capital: "Salem",
    region: "Pacific Coast",
    isState: true,
    historicalToponym: "Salem (Capitale) / Portland / Eugene / Astoria",
    s0_1: "Stato dell'Oregon (Capitale Salem). Affacciato sull'Oceano Pacifico nord-occidentale. Il porto fluviale di Portland sui fiumi Willamette e Columbia è un grande snodo commerciale oceanico e di legname da costruzione. Nel 1937 viene completata la monumentale Diga di Bonneville sul fiume Columbia, grandiosa opera idroelettrica del New Deal che fornisce immense quantità di energia a bassissimo costo.",
    s2_4: "Stato dell'Oregon. L'energia idroelettrica a basso costo della Diga di Bonneville attira a Portland e lungo il Columbia i primi impianti di fusione e raffinazione dell'alluminio (Alcoa a Vancouver/Portland), minerale chiave per l'industria aeronautica della costa occidentale.",
    s5_6: "Stato dell'Oregon (1939-1940). Con l'approvazione del Two-Ocean Navy Act e del programma marittimo d'emergenza, il magnate industriale Henry J. Kaiser seleziona Portland per la creazione dei cantieri navali Oregon Shipbuilding Corporation sul fiume Willamette.",
    s7: "Stato dell'Oregon (ottobre 1940). La Oregon Shipbuilding di Kaiser a Portland apre le prime banchine di montaggio modulare prefabbricato per costruire mercantili Liberty e Ocean per la Gran Bretagna; la fusione dell'alluminio a Bonneville lavora a pieno regime.",
    s8: "Stato dell'Oregon (aprile 1941). Sotto il Lend-Lease, i cantieri Kaiser di Portland infrangono i primati mondiali di velocità costruttiva navale, assemblando e varando mercantili Liberty in poche settimane; l'Oregon diventa uno dei massimi costruttori navali del Pacifico.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_OR"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_OR"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_OR"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_OR"].s2_4;
      return USA_PROVINCES_META["US_OR"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Oregon (Beaver State — Portland & Bonneville Dam)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Oregon (Gov. Charles H. Martin / Charles A. Sprague)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_PA: {
    id: "US_PA",
    iso: "US-PA",
    name: "Pennsylvania",
    modernName: "Commonwealth of Pennsylvania",
    historicalName: "Pennsylvania (Keystone State — Pittsburgh & Philadelphia)",
    adminTitle: "United States of America — Commonwealth of Pennsylvania (Gov. George H. Earle / Arthur H. James)",
    capital: "Harrisburg",
    region: "Mid-Atlantic",
    isState: true,
    historicalToponym: "Harrisburg (Capitale) / Philadelphia / Pittsburgh / Bethlehem / Erie",
    s0_1: "Commonwealth della Pennsylvania (Capitale Harrisburg). La \"Capitale Mondiale dell'Acciaio\": le acciaierie di Pittsburgh (U.S. Steel, Jones & Laughlin, Crucible, Bethlehem Steel) da sole producono più acciaio dell'intera Germania nazista e del Giappone messi insieme. Miniere carbonifere di antracite e carbone bituminoso negli Appalachi; a Philadelphia sorge il Philadelphia Naval Shipyard a League Island, monumentale arsenale militare federale costruttore di corazzate (USS Washington) e portaerei. A Bethlehem opera la Bethlehem Steel.",
    s2_4: "Commonwealth della Pennsylvania. Con l'approvazione del Second Vinson Act del 1938, le acciaierie di Pittsburgh e Bethlehem forgiano le piastre corazzate più spesse del mondo per le corazzate da guerra; al Philadelphia Navy Yard viene impostata la corazzata veloce USS Washington (BB-56).",
    s5_6: "Commonwealth della Pennsylvania (1939-1940). Dopo lo scoppio delle ostilità in Europa e con il Two-Ocean Navy Act del giugno 1940, la Pennsylvania è il motore siderurgico della civiltà industriale: il Philadelphia Navy Yard raddoppia i bacini per impostare la super-corazzata USS New Jersey (BB-62) e la portaerei Antietam; a Berwick la American Car & Foundry costruisce carri armati leggeri M3 Stuart.",
    s7: "Commonwealth della Pennsylvania (ottobre 1940). Pilastro insostituibile dell'Arsenale della Democrazia. A Pittsburgh i colossi dell'acciaio lavorano a ciclo continuo 24 ore su 24; a Philadelphia la marina mobilita oltre 40.000 operai navali; a Chester la Sun Shipbuilding sforna decine di petroliere oceaniche T2.",
    s8: "Commonwealth della Pennsylvania (aprile 1941). Sotto il Lend-Lease, la Pennsylvania produce l'acciaio che corazza le navi, i carri armati e i cannoni di tutto il fronte alleato mondiale: il Philadelphia Navy Yard vara la corazzata USS Washington; a Berwick migliaia di carri M3 Stuart escono dalle linee di montaggio.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_PA"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_PA"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_PA"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_PA"].s2_4;
      return USA_PROVINCES_META["US_PA"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Pennsylvania (Keystone State — Pittsburgh & Philadelphia)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — Commonwealth of Pennsylvania (Gov. George H. Earle / Arthur H. James)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_RI: {
    id: "US_RI",
    iso: "US-RI",
    name: "Rhode Island",
    modernName: "State of Rhode Island",
    historicalName: "Rhode Island (Ocean State — Newport Naval Station)",
    adminTitle: "United States of America — State of Rhode Island (Gov. Robert E. Quinn / William H. Vanderbilt III / J. Howard McGrath)",
    capital: "Providence",
    region: "New England",
    isState: true,
    historicalToponym: "Providence (Capitale) / Newport / Quonset Point / Warwick",
    s0_1: "Stato del Rhode Island (Capitale Providence). Il più piccolo Stato dell'Unione, affacciato sulle acque riparate della Narragansett Bay. Newport è la capitale della dottrina navale e dell'intelligence della U.S. Navy: sede del prestigioso Naval War College (fondato da Luce e Mahan), della Naval Station Newport e della Naval Torpedo Station di Goat Island, unico centro nazionale federale progettista e fabbricante dei siluri navali e sottomarini (Mark 14 e Mark 13).",
    s2_4: "Stato del Rhode Island. Il Naval War College di Newport aggiorna i wargames strategici navali (War Plan Orange) in previsione di uno scontro su vasta scala nel Pacifico contro la Marina Imperiale Giapponese; a Goat Island gli operai lavorano a pieno ritmo per i siluri dei sommergibili.",
    s5_6: "Stato del Rhode Island (1939-1940). Nel 1940 la marina acquisisce l'intera penisola di Quonset Point nella Narragansett Bay per costruire la grandiosa Naval Air Station Quonset Point e il centro d'addestramento dei battaglioni da costruzione navale (Seabees); qui nasce e viene prodotta la celebre capanna modulare prefabbricata Quonset Hut.",
    s7: "Stato del Rhode Island (ottobre 1940). A Goat Island la Torpedo Station quadruplica i turni di produzione per fabbricare i siluri Mark 14; a Quonset Point sorge la fabbrica delle Quonset Huts destinate ad alloggiare le truppe americane in ogni teatro di guerra dal Circolo Polare ai Tropici.",
    s8: "Stato del Rhode Island (aprile 1941). Sotto il Lend-Lease, Newport e Quonset Point costituiscono il cuore operativo dell'Atlantic Fleet Support Force: le squadriglie di idrovolanti PBY Catalina di Quonset scortano i convogli diretti in Gran Bretagna e pattugliano le rotte contro gli U-Boot.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_RI"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_RI"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_RI"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_RI"].s2_4;
      return USA_PROVINCES_META["US_RI"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Rhode Island (Ocean State — Newport Naval Station)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Rhode Island (Gov. Robert E. Quinn / William H. Vanderbilt III / J. Howard McGrath)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_SC: {
    id: "US_SC",
    iso: "US-SC",
    name: "South Carolina",
    modernName: "State of South Carolina",
    historicalName: "South Carolina (Palmetto State — Charleston Navy Yard)",
    adminTitle: "United States of America — State of South Carolina (Gov. Olin D. Johnston / Burnet R. Maybank)",
    capital: "Columbia",
    region: "South",
    isState: true,
    historicalToponym: "Columbia (Capitale) / Charleston / Greenville / Spartanburg",
    s0_1: "Stato della South Carolina (Capitale Columbia). Charleston è uno storico porto marittimo sull'Atlantico e sede del Charleston Navy Yard (Charleston Naval Shipyard), arsenale federale specializzato nella manutenzione, riparazione e costruzione di cacciatorpediniere e naviglio sottile per la marina. A Parris Island opera il celebre Marine Corps Recruit Depot, dove vengono forgiati i Marines; manifattura tessile del cotone nel Piedmont.",
    s2_4: "Stato della South Carolina. Il Charleston Navy Yard beneficia del Naval Expansion Act del 1938, ampliando i bacini di carenaggio e le officine macchine; a Parris Island si intensificano i corsi d'istruzione militare per i reclutamenti dei Marine.",
    s5_6: "Stato della South Carolina (1939-1940). Con lo scoppio della guerra europea, il Charleston Navy Yard assume migliaia di nuovi carpentieri e saldatori per impostare i cacciatorpediniere e le navi ausiliarie d'appoggio della flotta atlantica; Parris Island accoglie contingenti record di volontari.",
    s7: "Stato della South Carolina (ottobre 1940). Con l'approvazione del Selective Service e del Two-Ocean Navy Act, il Charleston Navy Yard riceve contratti per cacciatorpediniere di scorta e navi officina; a Columbia viene espanso Fort Jackson, trasformato in uno dei massimi centri d'addestramento della fanteria.",
    s8: "Stato della South Carolina (aprile 1941). Sotto il Lend-Lease, il Charleston Navy Yard lavora su tre turni riparando e allestendo il naviglio da scorta alleato; a Parris Island migliaia di Marines si addestrano per le future operazioni anfibie d'assalto.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_SC"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_SC"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_SC"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_SC"].s2_4;
      return USA_PROVINCES_META["US_SC"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "South Carolina (Palmetto State — Charleston Navy Yard)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of South Carolina (Gov. Olin D. Johnston / Burnet R. Maybank)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_SD: {
    id: "US_SD",
    iso: "US-SD",
    name: "South Dakota",
    modernName: "State of South Dakota",
    historicalName: "South Dakota (Mount Rushmore State — Black Hills & Homestake)",
    adminTitle: "United States of America — State of South Dakota (Gov. Tom Berry / Leslie Jensen / Harlan J. Bushfield)",
    capital: "Pierre",
    region: "Great Plains",
    isState: true,
    historicalToponym: "Pierre (Capitale) / Sioux Falls / Rapid City / Lead",
    s0_1: "Stato del South Dakota (Capitale Pierre). Dominato dalle praterie a est del fiume Missouri e dalle Black Hills a ovest. Presso Lead si trova la Homestake Mine, la più grande e profonda miniera d'oro sotterranea dell'emisfero occidentale, che fornisce metallo prezioso fondamentale per le riserve del Tesoro. Sulle Black Hills lo scultore Gutzon Borglum sta completando il monumentale Mount Rushmore National Memorial (i volti dei presidenti Washington, Jefferson, Lincoln e Theodore Roosevelt scolpiti nel granito).",
    s2_4: "Stato del South Dakota. L'estrazione aurifera di Homestake e le colture cerealicole e zootecniche del South Dakota sostengono l'economia e le riserve federali; il completamento del volto di Lincoln a Mount Rushmore nel 1937 rafforza l'identità patriottica nazionale.",
    s5_6: "Stato del South Dakota (1939-1940). Dopo lo scoppio del conflitto europeo, il South Dakota intensifica la produzione di carne bovina e grano; il War Department effettua ricognizioni a Sioux Falls e Rapid City per l'insediamento di basi d'addestramento aereo.",
    s7: "Stato del South Dakota (ottobre 1940). I giovani delle praterie rispondono alla coscrizione del Selective Service, inquadrati nella 34ª Divisione di Fanteria (\"Red Bull\"); nel 1941 Borglum completa l'ultima scultura di Mount Rushmore alla vigilia dell'ingresso in guerra.",
    s8: "Stato del South Dakota (aprile 1941). Sotto il Lend-Lease, il South Dakota fornisce derrate agroalimentari strategiche per la Gran Bretagna; a Sioux Falls e Rapid City iniziano i cantieri per immense basi di volo destinate all'addestramento dell'Air Corps.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_SD"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_SD"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_SD"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_SD"].s2_4;
      return USA_PROVINCES_META["US_SD"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "South Dakota (Mount Rushmore State — Black Hills & Homestake)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of South Dakota (Gov. Tom Berry / Leslie Jensen / Harlan J. Bushfield)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_TN: {
    id: "US_TN",
    iso: "US-TN",
    name: "Tennessee",
    modernName: "State of Tennessee",
    historicalName: "Tennessee (Volunteer State — TVA & Oak Ridge)",
    adminTitle: "United States of America — State of Tennessee (Gov. Gordon Browning / Prentice Cooper)",
    capital: "Nashville",
    region: "South",
    isState: true,
    historicalToponym: "Nashville (Capitale) / Memphis / Knoxville / Chattanooga / Oak Ridge",
    s0_1: "Stato del Tennessee (Capitale Nashville). Celebre per la Tennessee Valley Authority (TVA), la più grandiosa agenzia pubblica di sviluppo regionale del New Deal di Roosevelt, che ha imbrigliato il fiume Tennessee con una catena di dighe idroelettriche (Norris, Wheeler, Pickwick Landing), trasformando un'area depressa nel più potente bacino idroelettrico dell'Unione. Memphis è il mercato fluviale primario del cotone; alluminio Alcoa a Blount County.",
    s2_4: "Stato del Tennessee. L'immensa disponibilità di energia idroelettrica a bassissimo costo della TVA permette alla Alcoa di costruire a Maryville/Alcoa (Knoxville) il più grande laminatoio di alluminio del mondo per le fusoliere degli aerei militari della nazione.",
    s5_6: "Stato del Tennessee (1939-1940). Con il programma Cash and Carry e la domanda alleata di caccia e bombardieri, le centrali della TVA lavorano a pieno regime per alimentare le industrie elettrochimiche e siderurgiche; a Nashville la Vultee Aircraft apre una fabbrica di bombardieri leggeri (Vengeance).",
    s7: "Stato del Tennessee (ottobre 1940). Ruolo strategico chiave nell'Arsenale della Democrazia. La TVA approva la costruzione d'urgenza di nuove dighe per soddisfare il fabbisogno energetico delle industrie militari; a Camp Peay (futuro Camp Forrest) a Tullahoma si allestiscono campi d'addestramento di fanteria.",
    s8: "Stato del Tennessee (aprile 1941). Sotto il Lend-Lease, il Tennessee produce la maggior parte dell'alluminio aeronautico degli Alleati; la sconfinata energia della TVA porta il governo federale a selezionare l'isolata valle di Oak Ridge per l'insediamento del Progetto Manhattan per l'arricchimento dell'uranio.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_TN"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_TN"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_TN"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_TN"].s2_4;
      return USA_PROVINCES_META["US_TN"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Tennessee (Volunteer State — TVA & Oak Ridge)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Tennessee (Gov. Gordon Browning / Prentice Cooper)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_TX: {
    id: "US_TX",
    iso: "US-TX",
    name: "Texas",
    modernName: "State of Texas",
    historicalName: "Texas (Lone Star State — Houston & Permian Basin)",
    adminTitle: "United States of America — State of Texas (Gov. James V. Allred / W. Lee O'Daniel)",
    capital: "Austin",
    region: "South",
    isState: true,
    historicalToponym: "Austin (Capitale) / Houston / San Antonio / Dallas / Fort Worth / El Paso / Corpus Christi",
    s0_1: "Stato del Texas (Capitale Austin). Gigante territoriale ed energetico dell'Unione. Primo produttore mondiale assoluto di petrolio grazie ai colossali giacimenti dell'East Texas e del Permian Basin; Houston e Beaumont sono capitali mondiali della raffinazione e della petrolchimica. San Antonio è la \"Madre dell'Esercito\", sede dello storico comando di Fort Sam Houston e dei campi di volo d'addestramento Randolph Field e Kelly Field. Allevamenti bovini e cotone.",
    s2_4: "Stato del Texas. Di fronte all'inasprirsi della situazione internazionale, il Texas è il perno dell'addestramento aeronautico dell'Air Corps a Randolph Field (\"il West Point dell'Aria\"); l'oleodotto e la flotta di petroliere dal Golfo del Messico garantiscono la sicurezza energetica della marina.",
    s5_6: "Stato del Texas (1939-1940). Con l'approvazione del Cash and Carry e del Two-Ocean Navy Act del giugno 1940, il petrolio texano diventa il sangue vitale delle democrazie occidentali: la marina commissiona nel 1940 la costruzione della gigantesca Naval Air Station Corpus Christi per addestrare centinaia di piloti navali.",
    s7: "Stato del Texas (ottobre 1940). Gigante trainante dell'Arsenale della Democrazia. A Fort Worth la Consolidated Aircraft avvia la costruzione dell'immenso impianto Fort Worth Assembly Plant per produrre i bombardieri pesanti B-24 Liberator; la NAS Corpus Christi entra in servizio; a Orange i cantieri navali varano cacciatorpediniere.",
    s8: "Stato del Texas (aprile 1941). Sotto il Lend-Lease, il Texas fornisce oltre il 60% dell'intero fabbisogno di carburante, benzina avio ad alto numero d'ottano e lubrificanti per la flotta e le squadriglie alleate; decine di migliaia di piloti e carristi si addestrano nei suoi sconfinati territori.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_TX"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_TX"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_TX"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_TX"].s2_4;
      return USA_PROVINCES_META["US_TX"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Texas (Lone Star State — Houston & Permian Basin)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Texas (Gov. James V. Allred / W. Lee O'Daniel)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_UT: {
    id: "US_UT",
    iso: "US-UT",
    name: "Utah",
    modernName: "State of Utah",
    historicalName: "Utah (Beehive State — Salt Lake City & Bingham Canyon)",
    adminTitle: "United States of America — State of Utah (Gov. Henry H. Blood / Herbert B. Maw)",
    capital: "Salt Lake City",
    region: "Mountain West",
    isState: true,
    historicalToponym: "Salt Lake City (Capitale) / Ogden / Provo / Logan",
    s0_1: "Stato dello Utah (Capitale Salt Lake City). Situato nel cuore del Gran Bacino montano. Presso Bingham Canyon sui monti Oquirrh opera la Kennecott Copper Corporation nella più vasta miniera di rame a cielo aperto della Terra, che fornisce quasi un terzo del rame consumato dagli Stati Uniti, metallo primario per munizioni ed equipaggiamenti militari. Ogden è uno snodo ferroviario transcontinentale cruciale; giacimenti di carbone e ferro nella contea di Iron.",
    s2_4: "Stato dello Utah. La posizione centrale e protetta tra le Montagne Rocciose e la Sierra Nevada spinge il War Department a selezionare l'area di Ogden per la creazione di un grande deposito logistico e base di manutenzione aerea dell'Air Corps (Hill Field, istituito nel 1939).",
    s5_6: "Stato dello Utah (1939-1940). Con l'inizio dei conflitti mondiali, a Bingham Canyon lo scavo del rame raggiunge ritmi record; a Hill Field (Ogden) si avvia la costruzione di piste e hangar per la revisione dei bombardieri B-17.",
    s7: "Stato dello Utah (ottobre 1940). Lo Utah si consolida come snodo di stoccaggio e rifornimento per l'intero teatro del Pacifico: l'Ogden Arsenal espande la produzione di munizioni; a Tooele viene pianificato un immenso deposito d'artiglieria dell'esercito.",
    s8: "Stato dello Utah (aprile 1941). Sotto il Lend-Lease, il rame e i metalli dello Utah riforniscono le industrie navali e aeronautiche americane e britanniche; Hill Field diventa il principale centro logistico e officina aerea del West.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_UT"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_UT"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_UT"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_UT"].s2_4;
      return USA_PROVINCES_META["US_UT"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Utah (Beehive State — Salt Lake City & Bingham Canyon)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Utah (Gov. Henry H. Blood / Herbert B. Maw)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_VT: {
    id: "US_VT",
    iso: "US-VT",
    name: "Vermont",
    modernName: "State of Vermont",
    historicalName: "Vermont (Green Mountain State — Burlington & Springfield)",
    adminTitle: "United States of America — State of Vermont (Gov. Charles M. Smith / George D. Aiken / William H. Wills)",
    capital: "Montpelier",
    region: "New England",
    isState: true,
    historicalToponym: "Montpelier (Capitale) / Burlington / Rutland / Springfield",
    s0_1: "Stato del Vermont (Capitale Montpelier). Dominato dalle Green Mountains e dalle acque del Lago Champlain al confine canadese. Nella valle del fiume Black sorge la cittadina di Springfield, soprannominata la \"Precision Valley\", rinomata a livello mondiale per l'industria meccanica di precisione e la fabbricazione di macchine utensili avanzate (Jones & Lamson Machine Company, Fellows Gear Shaper). Cave di marmo e granito a Rutland e Barre, produzione lattiero-casearia.",
    s2_4: "Stato del Vermont. Sotto il governatore progressista George D. Aiken, il Vermont modernizza la rete idroelettrica e promuove le officine meccaniche della Precision Valley, che ricevono i primi contratti per macchine rettificatrici e tagliatrici di ingranaggi per l'aviazione militare.",
    s5_6: "Stato del Vermont (1939-1940). Con lo scoppio della guerra europea, le macchine utensili di Springfield (Vermont) diventano il presupposto tecnologico irrinunciabile per la creazione di qualsiasi nuova catena di montaggio di motori aeronautici in America e in Gran Bretagna.",
    s7: "Stato del Vermont (ottobre 1940). La Precision Valley di Springfield lavora a pieno regime giorno e notte per l'Arsenale della Democrazia; il governatore William H. Wills istituisce il consiglio statale di difesa per la protezione delle centrali del Lago Champlain.",
    s8: "Stato del Vermont (aprile 1941). Sotto il Lend-Lease, il Vermont è il gioiello tecnologico del New England: gli ingranaggi e gli alesatori di precisione di Springfield permettono la produzione di massa dei motori Rolls-Royce e Allison dei caccia alleati.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_VT"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_VT"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_VT"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_VT"].s2_4;
      return USA_PROVINCES_META["US_VT"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Vermont (Green Mountain State — Burlington & Springfield)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Vermont (Gov. Charles M. Smith / George D. Aiken / William H. Wills)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_VA: {
    id: "US_VA",
    iso: "US-VA",
    name: "Virginia",
    modernName: "Commonwealth of Virginia",
    historicalName: "Virginia (Old Dominion — Hampton Roads & Norfolk)",
    adminTitle: "United States of America — Commonwealth of Virginia (Gov. George C. Peery / James H. Price)",
    capital: "Richmond",
    region: "Mid-Atlantic",
    isState: true,
    historicalToponym: "Richmond (Capitale) / Norfolk / Newport News / Portsmouth / Alexandria",
    s0_1: "Commonwealth della Virginia (Capitale Richmond). Il cuore nevralgico della potenza navale atlantica degli Stati Uniti nella rada protetta di Hampton Roads. A Norfolk sorge la Naval Station Norfolk, la più grande base aeronavale del pianeta e quartier generale della Flotta Atlantica. Sull'altra sponda della rada operano i colossali cantieri navali privati della Newport News Shipbuilding and Drydock Company, i costruttori d'elezione delle grandi portaerei (USS Yorktown, USS Enterprise, USS Hornet). Portsmouth ospita il Norfolk Navy Yard.",
    s2_4: "Commonwealth della Virginia. Con l'approvazione del Second Vinson Act del 1938, Newport News Shipyard e Norfolk Navy Yard lavorano al massimo ritmo per completare le portaerei Yorktown ed Enterprise e impostare la Hornet (CV-8); Hampton Roads è la sentinella atlantica dell'Unione.",
    s5_6: "Commonwealth della Virginia (1939-1940). All'indomani dello scoppio del conflitto europeo, da Norfolk salpano i cacciatorpediniere e gli idrovolanti della Neutrality Patrol; con il Two-Ocean Navy Act del giugno 1940, la Newport News Shipbuilding firma il contratto per impostare le gigantesche portaerei d'attacco classe Essex.",
    s7: "Commonwealth della Virginia (ottobre 1940). Capitale militare del fronte atlantico dell'Arsenale della Democrazia. A Newport News e Norfolk oltre 60.000 operai lavorano su turni continui; a Langley Field opera il laboratorio aeronautico della NACA (futura NASA) per gallerie del vento ad alta velocità.",
    s8: "Commonwealth della Virginia (aprile 1941). Sotto il Lend-Lease, da Norfolk salpano le scorte convogli oceaniche e la portaerei Hornet viene varata; all'inizio del 1941 iniziano i lavori sulla sponda virginiana del Potomac ad Arlington per la costruzione dell'immenso edificio del Pentagono.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_VA"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_VA"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_VA"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_VA"].s2_4;
      return USA_PROVINCES_META["US_VA"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Virginia (Old Dominion — Hampton Roads & Norfolk)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — Commonwealth of Virginia (Gov. George C. Peery / James H. Price)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_WA: {
    id: "US_WA",
    iso: "US-WA",
    name: "Washington",
    modernName: "State of Washington",
    historicalName: "Washington (Evergreen State — Seattle & Puget Sound)",
    adminTitle: "United States of America — State of Washington (Gov. Clarence D. Martin / Arthur B. Langlie)",
    capital: "Olympia",
    region: "Pacific Coast",
    isState: true,
    historicalToponym: "Olympia (Capitale) / Seattle / Spokane / Tacoma / Bremerton",
    s0_1: "Stato di Washington (Capitale Olympia). Porta nord-occidentale dell'Unione verso il Pacifico e l'Alaska lungo il fiordo di Puget Sound. A Seattle ha sede la Boeing Airplane Company con lo storico stabilimento Plant 2, patria dei leggendari bombardieri quadrimotori strategici B-17 Flying Fortress. A Bremerton opera il Puget Sound Naval Shipyard, unico arsenale federale della costa occidentale dotato di bacini di carenaggio capaci di accogliere le più imponenti corazzate della marina. Grandi foreste di conifere e porto di Tacoma.",
    s2_4: "Stato di Washington. Di fronte alle minacce nipponiche nel Pacifico, la Boeing riceve i contratti per la produzione in serie del B-17B/C; a Bremerton il Puget Sound Navy Yard modernizza le corazzate della Flotta del Pacifico; sul fiume Columbia procedono a ritmo serrato i lavori per la Diga di Grand Coulee.",
    s5_6: "Stato di Washington (1939-1940). Dopo lo scoppio delle ostilità in Europa e l'invasione della Francia, il B-17 Flying Fortress della Boeing di Seattle viene riconosciuto come l'arma aerea strategica indispensabile per la deterrenza oceanica; a Bremerton si allestiscono i bacini per riparazioni belliche pesanti.",
    s7: "Stato di Washington (ottobre 1940). Pilastro dell'Arsenale della Democrazia. La Boeing espande lo stabilimento Plant 2 assumendo decine di migliaia di operai per sfornare decine di B-17 al mese; sul fiume Columbia entra in funzione la Diga di Grand Coulee, che con i suoi generatori idroelettrici alimenta la fusione dell'alluminio a Spokane e Longview.",
    s8: "Stato di Washington (aprile 1941). Sotto il Lend-Lease, centinaia di bombardieri B-17 decollano da Seattle per rifornire la RAF britannica e le basi del Pacifico; la sconfinata energia elettrica di Grand Coulee porta il governo federale a selezionare la remota area di Hanford per il futuro impianto nucleare di produzione del plutonio.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_WA"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_WA"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_WA"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_WA"].s2_4;
      return USA_PROVINCES_META["US_WA"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Washington (Evergreen State — Seattle & Puget Sound)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Washington (Gov. Clarence D. Martin / Arthur B. Langlie)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_WV: {
    id: "US_WV",
    iso: "US-WV",
    name: "West Virginia",
    modernName: "State of West Virginia",
    historicalName: "West Virginia (Mountain State — Charleston & Kanawha Valley)",
    adminTitle: "United States of America — State of West Virginia (Gov. Herman G. Kump / Homer A. Holt / Matthew M. Neely)",
    capital: "Charleston",
    region: "Mid-Atlantic",
    isState: true,
    historicalToponym: "Charleston (Capitale) / Huntington / Wheeling / Morgantown",
    s0_1: "Stato della West Virginia (Capitale Charleston). Cuore minerario carbonifero degli Appalachi, primatista nazionale nell'estrazione di carbone bituminoso ad alto potere calorifico, combustibile essenziale per le centrali termoelettriche e le acciaierie di tutto l'Est americano. Nella Kanawha Valley presso Charleston opera la cosiddetta \"Chemical Valley\" (Union Carbide, DuPont), uno dei massimi poli al mondo per la chimica organica di base e le resine sintetiche. Acciaierie a Wheeling sul fiume Ohio.",
    s2_4: "Stato della West Virginia. L'espansione dei programmi industriali e navali raddoppia i convogli ferroviari di carbone che dai monti della West Virginia alimentano le acciaierie di Pittsburgh, Gary e Cleveland; la chimica di Charleston produce i composti base per esplosivi e gomma sintetica.",
    s5_6: "Stato della West Virginia (1939-1940). Con l'approvazione del Cash and Carry, il carbone e la chimica della West Virginia lavorano al limite della capacità per rifornire la mobilitazione industriale atlantica; a South Charleston la U.S. Navy espande il Naval Ordnance Plant per corazzature e fucinatura di cannoni.",
    s7: "Stato della West Virginia (ottobre 1940). La Naval Ordnance Plant di South Charleston viene riattivata a pieno regime per produrre armature speciali e parti per canne d'artiglieria navale; i minatori della West Virginia garantiscono il fabbisogno energetico dell'Arsenale della Democrazia.",
    s8: "Stato della West Virginia (aprile 1941). Sotto il Lend-Lease, il carbone e i polimeri sintetici della Kanawha Valley sono indispensabili per le fonderie e le fabbriche aeronautiche alleate; a Morgantown viene costruito un immenso impianto federale per la sintesi dell'ammoniaca bellica.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_WV"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_WV"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_WV"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_WV"].s2_4;
      return USA_PROVINCES_META["US_WV"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "West Virginia (Mountain State — Charleston & Kanawha Valley)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of West Virginia (Gov. Herman G. Kump / Homer A. Holt / Matthew M. Neely)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_WI: {
    id: "US_WI",
    iso: "US-WI",
    name: "Wisconsin",
    modernName: "State of Wisconsin",
    historicalName: "Wisconsin (Badger State — Milwaukee & Manitowoc Submarines)",
    adminTitle: "United States of America — State of Wisconsin (Gov. Philip La Follette / Julius P. Heil)",
    capital: "Madison",
    region: "Midwest",
    isState: true,
    historicalToponym: "Madison (Capitale) / Milwaukee / Manitowoc / Green Bay / Kenosha",
    s0_1: "Stato del Wisconsin (Capitale Madison). Posizionato strategicamente tra il Lago Michigan e il fiume Mississippi. Milwaukee è un gigante dell'industria meccanica pesante, macchinari agricoli (Allis-Chalmers), turbine idrauliche, motori e macchine utensili. Sulle rive del Lago Michigan a Manitowoc opera la Manitowoc Shipbuilding Company, cantiere navale d'avanguardia. Grande tradizione lattiero-casearia (Dairy State) e cooperativa.",
    s2_4: "Stato del Wisconsin. La Allis-Chalmers a Milwaukee espande le fonderie per produrre turbine pesanti, compressori e generatori per la U.S. Navy in virtù del Naval Expansion Act del 1938.",
    s5_6: "Stato del Wisconsin (1939-1940). Con il Two-Ocean Navy Act del giugno 1940, la marina compie una scelta audace: commissionare alla Manitowoc Shipbuilding la costruzione di sommergibili oceanici classe Gato nelle acque interne dei Grandi Laghi (da trasferire poi verso il Golfo del Messico via fiume Mississippi su speciali chiatte galleggianti).",
    s7: "Stato del Wisconsin (ottobre 1940). Alla Manitowoc Shipbuilding operano oltre 7.000 operai navali per allestire 28 sommergibili d'attacco per la flotta; a Milwaukee la Allis-Chalmers produce caricatori d'aria e componenti per le centrali dei cacciatorpediniere dell'Arsenale della Democrazia.",
    s8: "Stato del Wisconsin (aprile 1941). Sotto il Lend-Lease, a Manitowoc viene varato il primo sommergibile oceanico d'acqua dolce (USS Peto, SS-265); il Wisconsin rifornisce gli Alleati di tonnellate di formaggio, carne e macchinari industriali pesanti.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_WI"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_WI"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_WI"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_WI"].s2_4;
      return USA_PROVINCES_META["US_WI"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Wisconsin (Badger State — Milwaukee & Manitowoc Submarines)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Wisconsin (Gov. Philip La Follette / Julius P. Heil)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_WY: {
    id: "US_WY",
    iso: "US-WY",
    name: "Wyoming",
    modernName: "State of Wyoming",
    historicalName: "Wyoming (Equality State — Cheyenne & Yellowstone)",
    adminTitle: "United States of America — State of Wyoming (Gov. Leslie A. Miller / Nels H. Smith)",
    capital: "Cheyenne",
    region: "Mountain West",
    isState: true,
    historicalToponym: "Cheyenne (Capitale) / Casper / Laramie / Sheridan",
    s0_1: "Stato del Wyoming (Capitale Cheyenne). Nel cuore delle Montagne Rocciose e delle alte pianure; sede del Parco Nazionale di Yellowstone, primo parco nazionale al mondo (1872). A Cheyenne si trova Fort Francis E. Warren (Fort D.A. Russell), grandioso presidio logistico e campo militare dell'esercito statunitense; snodo ferroviario primario della Union Pacific attraverso lo Sherman Hill. Ricchi bacini petroliferi a Salt Creek e Teapot Dome presso Casper.",
    s2_4: "Stato del Wyoming. Le riserve petrolifere e le raffinerie di Casper e Sinclair incrementano la produzione per i depositi strategici occidentali; la ferrovia Union Pacific a Cheyenne acquista le più potenti locomotive a vapore al mondo (Big Boy) per trainare convogli bellici pesanti sulle Montagne Rocciose.",
    s5_6: "Stato del Wyoming (1939-1940). Fort Francis E. Warren a Cheyenne viene convertito nel Quartermaster Replacement Training Center, il più grande centro d'addestramento per i servizi logistici e di commissariato dell'esercito americano.",
    s7: "Stato del Wyoming (ottobre 1940). Fort Warren accoglie oltre 20.000 reclute del Selective Service per addestrarle nella logistica, manutenzione autocarri e rifornimenti sul campo; il petrolio e il carbone del Wyoming alimentano l'Arsenale della Democrazia.",
    s8: "Stato del Wyoming (aprile 1941). Sotto il Lend-Lease, il Wyoming coordina il transito ferroviario strategico verso i porti del Pacifico; la Union Pacific a Cheyenne fa viaggiare convogli record di materiale bellico attraverso i passi montani.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_WY"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_WY"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_WY"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_WY"].s2_4;
      return USA_PROVINCES_META["US_WY"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Wyoming (Equality State — Cheyenne & Yellowstone)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — State of Wyoming (Gov. Leslie A. Miller / Nels H. Smith)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_DC: {
    id: "US_DC",
    iso: "US-DC",
    name: "District of Columbia",
    modernName: "District of Columbia",
    historicalName: "Washington, D.C. (Federal Capital & Seat of Government)",
    adminTitle: "United States of America — Federal Capital of the United States (Pres. Franklin D. Roosevelt)",
    capital: "Washington, D.C.",
    region: "Mid-Atlantic",
    isState: false,
    historicalToponym: "Washington, D.C. (Capitale Federale)",
    s0_1: "Distretto Federale di Columbia (Capitale Federale Washington, D.C.). Sede del governo degli Stati Uniti d'America, della Casa Bianca (Presidente Franklin Delano Roosevelt), del Campidoglio (Congresso) e della Corte Suprema. Lungo il fiume Anacostia opera lo storico Washington Navy Yard, arsenale navale di precisione per la fabbricazione e l'ispezione dei grandi cannoni navali della marina da guerra (Naval Gun Factory). Anni delle riforme economico-sociali del New Deal.",
    s2_4: "Distretto Federale di Columbia. A Washington, D.C. il presidente Roosevelt e il capo di stato maggiore George C. Marshall pianificano il riarmo e la modernizzazione delle forze armate; al Washington Navy Yard la Naval Gun Factory lavora su turni raddoppiati per fondere i cannoni da 16 pollici delle nuove corazzate.",
    s5_6: "Distretto Federale di Columbia (1939-1940). Dopo lo scoppio della Seconda Guerra Mondiale in Europa, Roosevelt coordina dalla Casa Bianca la modifica dei Neutrality Acts (Cash and Carry nel novembre 1939) e, all'indomani della caduta di Parigi nel giugno 1940, promulga il Two-Ocean Navy Act e firma l'accordo Destroyers for Bases.",
    s7: "Distretto Federale di Columbia (ottobre 1940). Cuore politico e strategico mondiale. Nel settembre 1940 Roosevelt promulga il Selective Training and Service Act; a novembre viene trionfalmente rieletto al Terzo Mandato; il 29 dicembre 1940 pronuncia lo storico Discorso del Caminetto proclamando che gli USA devono diventare l'Arsenale della Democrazia.",
    s8: "Distretto Federale di Columbia (aprile 1941). L'11 marzo 1941 il Congresso approva e Roosevelt firma lo storico Lend-Lease Act (Legge Affitti e Prestiti); a Washington operano le delegazioni diplomatico-militari congiunte britanniche e cinesi; inizia la progettazione del Pentagono oltre il fiume Potomac.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_DC"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_DC"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_DC"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_DC"].s2_4;
      return USA_PROVINCES_META["US_DC"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Washington, D.C. (Federal Capital & Seat of Government)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — Federal Capital of the United States (Pres. Franklin D. Roosevelt)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_AK: {
    id: "US_AK",
    iso: "US-AK",
    name: "Alaska",
    modernName: "Territory of Alaska",
    historicalName: "Territory of Alaska (Dutch Harbor & Aleutian Defense)",
    adminTitle: "United States of America — Territory of Alaska (Gov. John W. Troy / Ernest Gruening)",
    capital: "Juneau",
    region: "Pacific Outpost",
    isState: false,
    historicalToponym: "Juneau (Capitale) / Anchorage / Fairbanks / Dutch Harbor / Sitka",
    s0_1: "Territorio dell'Alaska (Capitale Juneau). Vasto territorio incorporato degli Stati Uniti (non ancora Stato federato fino al 1959). Con i suoi oltre 1,7 milioni di km², domina l'accesso settentrionale all'Oceano Pacifico, al Mare di Bering e allo Stretto di Bering dirimpetto alla Siberia sovietica. Economia basata sulla pesca del salmone, miniere d'oro a Juneau e Fairbanks e pellicce.",
    s2_4: "Territorio dell'Alaska. Il generale Billy Mitchell aveva avvertito: \"Chi controlla l'Alaska controllerà il mondo\". Di fronte all'espansionismo navale giapponese nel Pacifico settentrionale, il governatore Ernest Gruening e il War Department avviano la pianificazione di basi militari aeronavali a Sitka, Anchorage e Dutch Harbor nelle Isole Aleutine.",
    s5_6: "Territorio dell'Alaska (1939-1940). Vengono avviati i cantieri d'urgenza per la Naval Operating Base Dutch Harbor sull'isola di Unalaska e per la base dell'esercito a Fort Richardson (Elmendorf Field ad Anchorage) e Ladd Field a Fairbanks, concepita per i collaudi di volo e motori in condizioni polari estreme.",
    s7: "Territorio dell'Alaska (ottobre 1940). Sotto la guida del generale Simon Bolivar Buckner Jr. (Alaska Defense Command), l'Alaska viene fortificata come baluardo settentrionale contro possibili incursioni giapponesi; Dutch Harbor nelle Aleutine è presidiata da cacciatorpediniere, idrovolanti PBY Catalina e guarnigioni dell'esercito.",
    s8: "Territorio dell'Alaska (aprile 1941). Sotto il Lend-Lease, l'Alaska viene integrata nella rotta strategica aerea del Pacifico settentrionale: iniziano i lavori per la rotta ALSIB (Alaska-Siberia) per il futuro trasferimento di migliaia di aerei da combattimento americani verso l'Armata Rossa sovietica; Dutch Harbor è un bastione armato.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_AK"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_AK"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_AK"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_AK"].s2_4;
      return USA_PROVINCES_META["US_AK"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Territory of Alaska (Dutch Harbor & Aleutian Defense)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — Territory of Alaska (Gov. John W. Troy / Ernest Gruening)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_HAWAII: {
    id: "US_HAWAII",
    iso: "US-HI",
    name: "Hawaii",
    modernName: "Territory of Hawaii",
    historicalName: "Territory of Hawaii (Pearl Harbor & Pacific Fleet)",
    adminTitle: "United States of America — Territory of Hawaii (Gov. Joseph B. Poindexter)",
    capital: "Honolulu",
    region: "Pacific Outpost",
    isState: false,
    historicalToponym: "Honolulu (Capitale) / Pearl Harbor / Oahu / Hilo",
    s0_1: "Territorio delle Hawaii (Capitale Honolulu). Territorio incorporato degli Stati Uniti nell'arcipelago polinesiano del Pacifico centrale (non ancora Stato federato fino al 1959). L'isola di Oahu è il perno della difesa transpacifica americana: ospita la grandiosa base navale di Pearl Harbor, con bacini di carenaggio, depositi carburante di Red Hill e ancoraggi a Battleship Row, la base dell'esercito a Schofield Barracks e gli aeroporti militari di Hickam e Wheeler Field.",
    s2_4: "Territorio delle Hawaii. Con l'aumentare delle ostilità sino-giapponesi, Pearl Harbor accoglie regolarmente le grandi manovre annuali (Fleet Problem) della United States Fleet; l'isola di Oahu viene trasformata in una delle piazze d'armi più fortificate della terra.",
    s5_6: "Territorio delle Hawaii (1939-1940). Svolta geopolitica epocale: nel maggio 1940 il presidente Roosevelt ordina alla United States Fleet (divenuta Pacific Fleet) dell'ammiraglio James O. Richardson (poi ammiraglio Husband E. Kimmel) di rimanere di stanza in via permanente a Pearl Harbor come deterrente diretto contro l'aggressione nipponica.",
    s7: "Territorio delle Hawaii (ottobre 1940). Pearl Harbor è il quartier generale della Flotta del Pacifico: corazzate, portaerei (USS Enterprise, USS Lexington, USS Saratoga) e decine di incrociatori stazionano a Oahu; la base idrovolanti di Kaneohe Bay vigila le rotte oceaniche; il comando crittografico Combat Intelligence Unit (Station HYPO) decifra i codici segreti navali giapponesi.",
    s8: "Territorio delle Hawaii (aprile 1941). Di fronte alle crescenti tensioni e all'embargo contro Tokyo, le guarnigioni di Oahu (ammiraglio Kimmel e generale Short) mantengono lo stato di allerta contro sabotaggi interni; Pearl Harbor è la massima sentinella armata della democrazia nell'immensità del Pacifico.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_HAWAII"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_HAWAII"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_HAWAII"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_HAWAII"].s2_4;
      return USA_PROVINCES_META["US_HAWAII"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Territory of Hawaii (Pearl Harbor & Pacific Fleet)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — Territory of Hawaii (Gov. Joseph B. Poindexter)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_GUANTANAMO: {
    id: "US_GUANTANAMO",
    iso: "US-GTMO",
    name: "Guantanamo Bay Naval Base",
    modernName: "Guantanamo Bay Naval Base",
    historicalName: "Guantanamo Bay Naval Base (U.S. Navy — Cuba)",
    adminTitle: "United States of America — U.S. Naval Operating Base Guantanamo Bay (Treaty of 1934)",
    capital: "Guantanamo Bay",
    region: "Caribbean Outpost",
    isState: false,
    historicalToponym: "Guantanamo Bay (Base Navale USA)",
    s0_1: "Base Navale di Guantánamo (Cuba). Territorio marittimo di 116 km² affittato in perpetuità dagli Stati Uniti nel sud-est dell'isola di Cuba in virtù del Trattato Cubano-Americano del 1903, confermato dal Trattato del 1934 con il presidente Franklin D. Roosevelt. Presidio navale permanente primario per la sorveglianza del Paso de los Vientos (Windward Passage) tra Cuba e Haiti e la protezione dell'approccio al Canale di Panama.",
    s2_4: "Base Navale di Guantánamo. La U.S. Navy espande i depositi di nafta, gli scali per idrovolanti a McCalla Hill e le banchine di rifornimento rapido per le squadriglie della flotta atlantica e caraibica.",
    s5_6: "Base Navale di Guantánamo (1939-1940). Con l'attivazione della Neutrality Patrol atlantica, Guantanamo funge da snodo operativo avanzato per gli idrovolanti PBY Catalina e i cacciatorpediniere che vigilano il Mar dei Caraibi contro infiltrazioni di sommergibili dell'Asse.",
    s7: "Base Navale di Guantánamo (ottobre 1940). Dopo la firma dell'accordo Destroyers for Bases e l'approvazione del Two-Ocean Navy Act, Guantanamo si raccorda con la nuova rete di basi navali nei Caraibi (Trinidad, Bermuda, Giamaica) a protezione del Canale di Panama.",
    s8: "Base Navale di Guantánamo (aprile 1941). Sotto il Lend-Lease, la base è il cardine della rotta dei convogli petroliferi che risalgono dal Venezuela e da Aruba verso gli Stati Uniti e la Gran Bretagna, presidiata da unità antisommergibile della marina americana.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_GUANTANAMO"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_GUANTANAMO"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_GUANTANAMO"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_GUANTANAMO"].s2_4;
      return USA_PROVINCES_META["US_GUANTANAMO"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Guantanamo Bay Naval Base (U.S. Navy — Cuba)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — U.S. Naval Operating Base Guantanamo Bay (Treaty of 1934)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  US_PCZ: {
    id: "US_PCZ",
    iso: "US-PCZ",
    name: "Panama Canal Zone",
    modernName: "Panama Canal Zone",
    historicalName: "Panama Canal Zone (Balboa Heights / Quarry Heights — USA)",
    adminTitle: "United States of America — Panama Canal Zone (Strategic Military Outpost — Gov. Clarence S. Ridley / Glen E. Edgerton)",
    capital: "Balboa Heights",
    region: "Strategic Chokepoint",
    isState: false,
    historicalToponym: "Balboa Heights (Capitale) / Cristobal / Quarry Heights",
    s0_1: "Zona del Canale di Panama. Fascia territoriale e idroviaria strategica di 553 miglia quadrate controllata in perpetuità dagli Stati Uniti secondo il Trattato Hay-Bunau-Varilla del 1903. Chokepoint marittimo vitale della sicurezza emisferica globale, che consente il transito rapido delle navi da guerra tra Atlantico e Pacifico senza circumnavigare Capo Horn. Fortificazioni costiere, chiuse di Miraflores, Pedro Miguel e Gatun, basi aeree di Albrook e Howard Field.",
    s2_4: "Zona del Canale di Panama. Con il trattato Hull-Alfaro del 1936 (ratificato nel 1939) gli Stati Uniti ridefiniscono i rapporti con la Repubblica di Panama, ma mantengono il controllo militare esclusivo e assoluto delle difese del Canale. Nel 1939 il Congresso autorizza il progetto per un terzo set di chiuse per consentire il transito delle nuove super-corazzate.",
    s5_6: "Zona del Canale di Panama (1939-1940). All'indomani dello scoppio del conflitto europeo, il generale Daniel Van Voorhis assume il comando del Panama Canal Department: le difese aeree vengono triplicate, le chiuse dotate di reti antisiluro e palloni frenati e i transiti marittimi sottoposti a strettissima censura e ispezione militare.",
    s7: "Zona del Canale di Panama (ottobre 1940). Con l'approvazione del Two-Ocean Navy Act e l'inizio del Terzo Mandato di Roosevelt, il Canale è l'arteria vitale attraverso cui transitano corazzate, incrociatori e convogli bellici tra i due oceani; pattugliamento aereo esteso fino alle Isole Galápagos e Cocos.",
    s8: "Zona del Canale di Panama (aprile 1941). Sotto il Lend-Lease, il Canale gestisce il passaggio di milioni di tonnellate di materiale bellico diretto ai fronti atlantico e pacifico; la guarnigione militare statunitense supera i 40.000 effettivi rendendolo una delle piazzeforti più impenetrabili della Terra.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["US_PCZ"].s8;
      if (s >= 7) return USA_PROVINCES_META["US_PCZ"].s7;
      if (s >= 5) return USA_PROVINCES_META["US_PCZ"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["US_PCZ"].s2_4;
      return USA_PROVINCES_META["US_PCZ"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Panama Canal Zone (Balboa Heights / Quarry Heights — USA)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — Panama Canal Zone (Strategic Military Outpost — Gov. Clarence S. Ridley / Glen E. Edgerton)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  PR: {
    id: "PR",
    iso: "US-PR",
    name: "Puerto Rico",
    modernName: "Commonwealth of Puerto Rico",
    historicalName: "Puerto Rico (Unincorporated U.S. Territory — San Juan)",
    adminTitle: "United States of America — Territory of Puerto Rico (Gov. Blanton Winship / Adm. William D. Leahy / Guy J. Swope)",
    capital: "San Juan",
    region: "Caribbean Outpost",
    isState: false,
    historicalToponym: "San Juan (Capitale) / Ponce / Roosevelt Roads / Borinquen",
    s0_1: "Territorio di Puerto Rico (Capitale San Juan). Territorio insulare non incorporato degli Stati Uniti nelle Grandi Antille acquisito nel 1898. Governato da un governatore nominato dal presidente degli Stati Uniti. Anni segnati da riforme socio-economiche (Puerto Rico Reconstruction Administration) ma anche da tensioni nazionaliste guidate da Pedro Albizu Campos (Massacro di Ponce del 1937).",
    s2_4: "Territorio di Puerto Rico. Nel 1939 il presidente Franklin D. Roosevelt nomina governatore l'ammiraglio William D. Leahy (ex Capo delle Operazioni Navali) con la missione strategica di trasformare Puerto Rico nella \"Gibilterra dei Caraibi\", bastione avanzato a guardia delle rotte caraibiche e del Canale di Panama.",
    s5_6: "Territorio di Puerto Rico (1939-1940). Sotto l'amministrazione dell'ammiraglio Leahy si accelerano i lavori per la Naval Air Station Isla Grande a San Juan, la monumentale base aerea di Borinquen (Ramey Air Force Base) a nord-ovest e l'immenso complesso navale di Roosevelt Roads a Ensenada Honda.",
    s7: "Territorio di Puerto Rico (ottobre 1940). Puerto Rico è il fulcro del 10th Naval District della marina americana e del Caribbean Defense Command; i portoricani rispondono alla chiamata del Selective Service formando il celebre 65º Reggimento di Fanteria (\"The Borinqueneers\").",
    s8: "Territorio di Puerto Rico (aprile 1941). Sotto il Lend-Lease, le basi aeree e navali di Puerto Rico coordinano le missioni di scorta ai convogli marittimi tra il Sud America, i Caraibi e gli Stati Uniti; la flotta atlantica usa regolarmente le acque di Roosevelt Roads per le grandi manovre.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["PR"].s8;
      if (s >= 7) return USA_PROVINCES_META["PR"].s7;
      if (s >= 5) return USA_PROVINCES_META["PR"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["PR"].s2_4;
      return USA_PROVINCES_META["PR"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Puerto Rico (Unincorporated U.S. Territory — San Juan)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — Territory of Puerto Rico (Gov. Blanton Winship / Adm. William D. Leahy / Guy J. Swope)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  VI: {
    id: "VI",
    iso: "US-VI",
    name: "United States Virgin Islands",
    modernName: "Territory of the United States Virgin Islands",
    historicalName: "United States Virgin Islands (Charlotte Amalie — St. Thomas)",
    adminTitle: "United States of America — Territory of the Virgin Islands (Gov. Lawrence W. Cramer / Charles Harwood)",
    capital: "Charlotte Amalie",
    region: "Caribbean Outpost",
    isState: false,
    historicalToponym: "Charlotte Amalie (Capitale) / Saint Thomas / Saint Croix / Saint John",
    s0_1: "Isole Vergini degli Stati Uniti (Capitale Charlotte Amalie sull'isola di Saint Thomas). Territorio non incorporato acquistato nel 1917 dalla Danimarca (ex Indie Occidentali Danesi) per scongiurare l'installazione di basi sottomarine tedesche durante la Grande Guerra. Amministrate sotto la supervisione del Dipartimento dell'Interno. Porto naturale profondo di Charlotte Amalie, presidio per idrovolanti e sommergibili a guardia del Canale di Anegada.",
    s2_4: "Isole Vergini degli Stati Uniti. L'acuirsi delle tensioni internazionali porta alla modernizzazione della base idrovolanti della U.S. Navy a Lindbergh Bay (Saint Thomas) e della pista aerea di Benedict Field a Saint Croix per il pattugliamento delle Antille.",
    s5_6: "Isole Vergini degli Stati Uniti (1939-1940). Con l'attivazione della Neutrality Patrol atlantica, le Isole Vergini fungono da vedetta orientale per le rotte d'accesso al Canale di Panama; a Saint Thomas viene insediata una guarnigione permanente di Marines.",
    s7: "Isole Vergini degli Stati Uniti (ottobre 1940). Il governatore Lawrence W. Cramer e la marina coordinano le difese antisommergibile dell'arcipelago, integrato nel sistema difensivo di Puerto Rico e delle basi concesse dai britannici ad Antigua e Saint Lucia.",
    s8: "Isole Vergini degli Stati Uniti (aprile 1941). Sotto il Lend-Lease, il porto di Charlotte Amalie è uno scalo di rifornimento sicuro per il naviglio leggero della marina e per gli idrovolanti da ricognizione antisommergibile.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["VI"].s8;
      if (s >= 7) return USA_PROVINCES_META["VI"].s7;
      if (s >= 5) return USA_PROVINCES_META["VI"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["VI"].s2_4;
      return USA_PROVINCES_META["VI"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "United States Virgin Islands (Charlotte Amalie — St. Thomas)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — Territory of the Virgin Islands (Gov. Lawrence W. Cramer / Charles Harwood)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  GU: {
    id: "GU",
    iso: "US-GU",
    name: "Guam",
    modernName: "Territory of Guam",
    historicalName: "Island of Guam (Apra Harbor — U.S. Navy)",
    adminTitle: "United States of America — Guam Naval Station (Gov. Capt. James T. Alexander / Capt. George J. McMillin)",
    capital: "Agaña",
    region: "Pacific Outpost",
    isState: false,
    historicalToponym: "Agaña (Capitale) / Apra Harbor / Sumay",
    s0_1: "Isola di Guam (Capitale Agaña). Territorio non incorporato in Micronesia (Arcipelago delle Marianne), amministrato direttamente dalla U.S. Navy sin dal 1898. Presso Apra Harbor opera la Guam Naval Station; a Sumay la Pan American Airways mantiene una stazione idrovolanti per il celebre \"China Clipper\" San Francisco-Manila. Circondata a nord dalle isole del Mandato Giapponese del Pacifico (Saipan, Rota, Tinian). Priva di fortificazioni pesanti a causa delle restrizioni del Trattato Navale di Washington.",
    s2_4: "Isola di Guam. Nel 1938 il rapporto della Commissione Hepburn raccomanda la fortificazione d'urgenza di Guam come base avanzata per la flotta, ma il Congresso boccia i fondi per non provocare una reazione militare da parte dell'Impero Giapponese.",
    s5_6: "Isola di Guam (1939-1940). Isolata a oltre 3.000 miglia dalle Hawaii e a sole 1.500 miglia da Tokyo, Guam vive in una condizione di estrema vulnerabilità strategica; la guarnigione navale conta meno di 500 marinai e marines affiancati dalla milizia locale (Guam Insular Force Guard).",
    s7: "Isola di Guam (ottobre 1940). Dopo la firma del Patto Tripartito tra Tokyo, Berlino e Roma, il governatore George J. McMillin avvia l'evacuazione delle famiglie e del personale civile americano verso gli Stati Uniti continentali.",
    s8: "Isola di Guam (aprile 1941). Con l'evacuazione completata, la guarnigione di Guam rimane come sentinella solitaria e disarmata nel cuore dell'oceano controllato dai giapponesi, mantenendo le comunicazioni telegrafiche e marittime fino all'inevitabile scontro.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["GU"].s8;
      if (s >= 7) return USA_PROVINCES_META["GU"].s7;
      if (s >= 5) return USA_PROVINCES_META["GU"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["GU"].s2_4;
      return USA_PROVINCES_META["GU"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Island of Guam (Apra Harbor — U.S. Navy)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — Guam Naval Station (Gov. Capt. James T. Alexander / Capt. George J. McMillin)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  AS: {
    id: "AS",
    iso: "US-AS",
    name: "American Samoa",
    modernName: "Territory of American Samoa",
    historicalName: "American Samoa (Pago Pago / Tutuila — U.S. Navy)",
    adminTitle: "United States of America — U.S. Naval Station Tutuila (Gov. Capt. Edward W. Hanson / Capt. Laurence Wild)",
    capital: "Pago Pago",
    region: "Pacific Outpost",
    isState: false,
    historicalToponym: "Pago Pago (Capitale) / Tutuila / Ta'u / Ofu-Olosega",
    s0_1: "Samoa Americane (Capitale Pago Pago sull'isola di Tutuila). Territorio non incorporato della Polinesia meridionale amministrato come stazione navale della U.S. Navy sin dal 1900. Il profondo fiordo naturale di Pago Pago costituisce il più sicuro porto di rifornimento carbonifero e nafta per le rotte navali transpacifiche verso le Fiji, l'Australia e la Nuova Zelanda. Guarnigione locale della Fita Fita Guard.",
    s2_4: "Samoa Americane. Con il deteriorarsi dei rapporti con Tokyo, Pago Pago acquista un ruolo strategico insostituibile per garantire le linee di comunicazione marittime e aeree tra gli Stati Uniti e i Dominions britannici del Pacifico meridionale.",
    s5_6: "Samoa Americane (1939-1940). La U.S. Navy espande le banchine di rifornimento di Pago Pago, installa serbatoi sotterranei di carburante e fortifica le alture circostanti con postazioni d'artiglieria costiera per prevenire incursioni di corsari tedeschi o sommergibili nemici.",
    s7: "Samoa Americane (ottobre 1940). Il governatore Laurence Wild intensifica l'addestramento della Fita Fita Guard e organizza i piani di difesa per Tutuila; la base funge da scalo regolare per le squadriglie oceaniche della marina.",
    s8: "Samoa Americane (aprile 1941). Sotto il Lend-Lease, la Naval Station Tutuila di Pago Pago è il perno del corridoio meridionale di rifornimento per l'Australia e la Nuova Zelanda, garantendo l'ancoraggio protetto per le flotte alleate nel Pacifico meridionale.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["AS"].s8;
      if (s >= 7) return USA_PROVINCES_META["AS"].s7;
      if (s >= 5) return USA_PROVINCES_META["AS"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["AS"].s2_4;
      return USA_PROVINCES_META["AS"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "American Samoa (Pago Pago / Tutuila — U.S. Navy)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — U.S. Naval Station Tutuila (Gov. Capt. Edward W. Hanson / Capt. Laurence Wild)";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  UM_MIDWAY: {
    id: "UM_MIDWAY",
    iso: "UM-MID",
    name: "Midway Atoll",
    modernName: "Midway Atoll",
    historicalName: "Midway Atoll (Sand & Eastern Islands — U.S. Navy)",
    adminTitle: "United States of America — Midway Islands Naval Air Station",
    capital: "Sand Island",
    region: "Pacific Outpost",
    isState: false,
    historicalToponym: "Midway Atoll (Isole Midway)",
    s0_1: "Atollo di Midway nel Pacifico centrale (isole Sand ed Eastern). Scalo oceanico per gli idrovolanti commerciali Pan American Clipper (rotta San Francisco-Honolulu-Manila) e stazione telegrafica sottomarina della Commercial Pacific Cable Company. Presidiato dalla marina statunitense.",
    s2_4: "Atollo di Midway. In seguito alle raccomandazioni del Rapporto Hepburn del 1938, la U.S. Navy avvia i lavori per trasformare l'atollo in una base aeronavale fortificata, dragando il canale d'accesso alla laguna e spianando piste per caccia e bombardieri.",
    s5_6: "Atollo di Midway (1939-1940). La marina istituisce la Naval Air Station Midway Islands; l'atollo viene blindato con batterie d'artiglieria costiera e contraerea dei Marines a protezione delle rotte verso le Hawaii.",
    s7: "Atollo di Midway (ottobre 1940). Dopo la firma del Patto Tripartito e il trasferimento della Flotta del Pacifico a Pearl Harbor, Midway è il bastione d'allerta avanzato a 1.100 miglia a nord-ovest di Oahu, costantemente sorvegliato da squadriglie di idrovolanti PBY Catalina.",
    s8: "Atollo di Midway (aprile 1941). Sotto il Lend-Lease e con l'avvicinarsi della guerra nel Pacifico, la guarnigione del 6º Battaglione di Difesa dei Marines fortifica ogni duna; Midway è la sentinella avanzata della Flotta del Pacifico contro qualsiasi mossa della Marina Imperiale Giapponese.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["UM_MIDWAY"].s8;
      if (s >= 7) return USA_PROVINCES_META["UM_MIDWAY"].s7;
      if (s >= 5) return USA_PROVINCES_META["UM_MIDWAY"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["UM_MIDWAY"].s2_4;
      return USA_PROVINCES_META["UM_MIDWAY"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Midway Atoll (Sand & Eastern Islands — U.S. Navy)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — Midway Islands Naval Air Station";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
  UM_WAKE: {
    id: "UM_WAKE",
    iso: "UM-WAK",
    name: "Wake Island",
    modernName: "Wake Island",
    historicalName: "Wake Island (Pan American Clipper & U.S. Navy)",
    adminTitle: "United States of America — Wake Island Naval Aviation Outpost",
    capital: "Wake Island",
    region: "Pacific Outpost",
    isState: false,
    historicalToponym: "Wake Island (Isola di Wake)",
    s0_1: "Atollo corallino di Wake nel Pacifico settentrionale, a metà strada tra le Hawaii e Guam. Nel 1935 la Pan American Airways vi ha costruito una base per idrovolanti e un albergo per la celebre rotta transpacifica dei China Clipper; presidio civile e postale isolato nell'oceano.",
    s2_4: "Atollo di Wake. La posizione strategica a sole 600 miglia dalle basi giapponesi delle Isole Marshall (Mandato del Pacifico) spinge la U.S. Navy a includere Wake nei piani d'emergenza per la creazione di una stazione d'appoggio per idrovolanti e sottomarini.",
    s5_6: "Atollo di Wake (1939-1940). Nel 1940 il governo federale invia a Wake i primi contingenti di centinaia di operai civili edili (Contractors Pacific Naval Air Bases) per dragare la laguna, costruire piste aeree e allestire postazioni per cannoni costieri.",
    s7: "Atollo di Wake (ottobre 1940). I lavori militari procedono a ritmo forzato; a Wake vengono installati i primi serbatoi di carburante navale e aereo per supportare le squadriglie di pattugliamento a lungo raggio nel Pacifico.",
    s8: "Atollo di Wake (aprile 1941). Sotto il Lend-Lease, la marina approva lo schieramento di un distaccamento del 1º Battaglione di Difesa dei Marines del maggiore James Devereux; Wake si prepara a resistere come avamposto isolato nel cuore della sfera d'influenza nipponica.",
    getNote: (s: number) => {
      if (s >= 8) return USA_PROVINCES_META["UM_WAKE"].s8;
      if (s >= 7) return USA_PROVINCES_META["UM_WAKE"].s7;
      if (s >= 5) return USA_PROVINCES_META["UM_WAKE"].s5_6;
      if (s >= 2) return USA_PROVINCES_META["UM_WAKE"].s2_4;
      return USA_PROVINCES_META["UM_WAKE"].s0_1;
    },
    getHistoricalName: (s: number) => {
      const base = "Wake Island (Pan American Clipper & U.S. Navy)";
      if (s >= 7) return base + " (Arsenale della Democrazia)";
      if (s >= 5) return base + " (Two-Ocean Navy & Cash and Carry)";
      if (s >= 2) return base + " (Riarmo Navale)";
      return base;
    },
    getAdminTitle: (s: number) => {
      return "United States of America — Wake Island Naval Aviation Outpost";
    },
    getSovereign: () => "USA",
    getFaction: () => "Alleati",
  },
};

// Alias per chiavi alternative
USA_PROVINCES_META['US_HI'] = USA_PROVINCES_META['US_HAWAII'];
USA_PROVINCES_META['HI'] = USA_PROVINCES_META['US_HAWAII'];
USA_PROVINCES_META['US_GTMO'] = USA_PROVINCES_META['US_GUANTANAMO'];
USA_PROVINCES_META['GTMO'] = USA_PROVINCES_META['US_GUANTANAMO'];
USA_PROVINCES_META['PCZ'] = USA_PROVINCES_META['US_PCZ'];
USA_PROVINCES_META['MIDWAY'] = USA_PROVINCES_META['UM_MIDWAY'];
USA_PROVINCES_META['WAKE'] = USA_PROVINCES_META['UM_WAKE'];
USA_PROVINCES_META['DC'] = USA_PROVINCES_META['US_DC'];

/**
 * Risoluzione Geostorica e Toponomastica Completa per qualsiasi Provincia, Stato o Territorio USA
 */
// Override Step 9 (DIC 1941): Attacco a Pearl Harbor (7 dicembre 1941), ingresso degli USA nella Seconda Guerra Mondiale e conquista giapponese di Guam (10 dicembre) e Wake (23 dicembre)
for (const meta of new Set(Object.values(USA_PROVINCES_META))) {
  const origSov = meta.getSovereign.bind(meta);
  const origFac = meta.getFaction.bind(meta);
  const origHist = meta.getHistoricalName.bind(meta);
  const origAdmin = meta.getAdminTitle.bind(meta);
  const origNote = meta.getNote.bind(meta);

  meta.getSovereign = (s: number) => {
    if (s >= 9 && (meta.id === 'GU' || meta.id === 'UM_WAKE')) return 'JAP';
    return origSov(s);
  };
  meta.getFaction = (s: number) => {
    if (s >= 9 && (meta.id === 'GU' || meta.id === 'UM_WAKE')) return 'Asse';
    if (s >= 9) return 'Alleati';
    return origFac(s);
  };
  meta.getHistoricalName = (s: number) => {
    if (s >= 9) {
      if (meta.id === 'GU') return 'Ōmiya-jima / Guam (Occupazione Militare Giapponese — 10 Dicembre 1941)';
      if (meta.id === 'UM_WAKE') return 'Ōtori-jima / Wake Island (Occupazione Militare Giapponese — 23 Dicembre 1941)';
      if (meta.id === 'US_HAWAII') return 'Territory of Hawaii (Attack on Pearl Harbor — 7 December 1941 & Martial Law)';
      if (meta.id === 'US_DC') return 'District of Columbia — Washington D.C. (Capitale Alleata & Conferenza Arcadia, Dicembre 1941)';
      return `${origHist(8)} (Stati Uniti in Guerra — Mobilitazione Post-Pearl Harbor)`;
    }
    return origHist(s);
  };
  meta.getAdminTitle = (s: number) => {
    if (s >= 9) {
      if (meta.id === 'GU') return 'Impero Giapponese — Guarnigione Imperiale di Guam / Ōmiya-jima (Distaccamento dei Mari del Sud — Magg. Gen. Tomitarō Horii)';
      if (meta.id === 'UM_WAKE') return 'Impero Giapponese — Guarnigione Navale dell\'Isola di Wake / Ōtori-jima (4ª Flotta Imperiale — Contramm. Sadamichi Kajioka)';
      if (meta.id === 'US_HAWAII') return 'Territory of Hawaii — U.S. Pacific Fleet (Adm. Chester W. Nimitz) & Hawaiian Department Martial Law';
    }
    return origAdmin(s);
  };
  meta.getNote = (s: number) => {
    if (s >= 9) {
      if (meta.id === 'GU') {
        return "Guam (Ōmiya-jima) · Isolata nel mezzo delle Marianne giapponesi, Guam viene bombardata dall'aviazione di Saipan l'8 dicembre 1941; all'alba del 10 dicembre i 5.500 uomini del Distaccamento dei Mari del Sud (Magg. Gen. Tomitarō Horii) e della 5ª Forza da Sbarco Navale sbarcano a Dungcas Beach e Tumon Bay. Dopo un breve scontro a fuoco in Plaza de España ad Agaña, il Governatore navale Cap. George J. McMillin e la piccola guarnigione di Marines e Insular Force Guard sono costretti alla resa: Guam è il primo territorio sovrano statunitense occupato dall'Asse e viene ribattezzata 'Ōmiya-jima' (Isola del Grande Santuario).";
      }
      if (meta.id === 'UM_WAKE') {
        return "Isola di Wake (Ōtori-jima) · Investita dai bombardieri giapponesi l'8 dicembre 1941, la guarnigione statunitense di 449 Marines (1° Battaglione Difesa del Magg. James P.S. Devereux e squadriglia caccia VMF-211 del Magg. Paul Putnam) al comando del C.F. Winfield S. Cunningham respinge eroicamente il primo tentativo di sbarco giapponese l'11 dicembre, affondando i cacciatorpediniere Hayate e Kisaragi. Ritornata il 23 dicembre con il supporto delle portaerei Sōryū e Hiryū distaccate da Pearl Harbor, la forza d'invasione del Contramm. Sadamichi Kajioka sbarca sull'atollo, costringendo il presidio alla resa dopo ore di combattimento ravvicinato; l'isola è ribattezzata 'Ōtori-jima'.";
      }
      if (meta.id === 'US_HAWAII') {
        return "Hawaii (Attacco a Pearl Harbor — 7 Dicembre 1941) · Alle 07:48 del 7 dicembre 1941 ('A Date Which Will Live in Infamy'), 353 aerei giapponesi lanciati in due ondate dalle sei portaerei della Kidō Butai dell'Amm. Chūichi Nagumo attaccano di sorpresa la Flotta del Pacifico statunitense a Pearl Harbor e le basi aeree di Oahu (Hickam, Wheeler, Kaneohe, Ewa). L'attacco affonda o mette fuori combattimento 8 corazzate (tra cui l'USS Arizona e l'USS Oklahoma), distrugge 188 aerei e causa 2.403 caduti americani, ma risparmia le tre portaerei (Enterprise, Lexington, Saratoga) e i depositi di carburante. L'arcipelago è posto sotto legge marziale e il 31 dicembre 1941 l'Amm. Chester W. Nimitz assume il comando della Pacific Fleet (CINCPAC).";
      }
      if (meta.id === 'US_DC') {
        return "Washington D.C. · L'8 dicembre 1941, all'indomani di Pearl Harbor, il Presidente Franklin D. Roosevelt pronuncia davanti al Congresso il celebre discorso dell'Infamia ('A date which will live in infamy'), ottenendo la dichiarazione di guerra al Giappone; l'11 dicembre Germania e Italia dichiarano guerra agli Stati Uniti. Dal 22 dicembre 1941 Washington ospita la storica Conferenza Arcadia tra Roosevelt e Winston Churchill, che sancisce la strategia globale 'Europe First', l'istituzione del Combined Chiefs of Staff e la redazione della Dichiarazione delle Nazioni Unite.";
      }
      return `${origNote(8)} Dopo l'attacco giapponese a Pearl Harbor (7 dicembre 1941) e le dichiarazioni di guerra di Germania e Italia (11 dicembre), lo Stato è impegnato nella mobilitazione bellica totale dell'industria e delle forze armate statunitensi a sostegno dello sforzo globale degli Alleati.`;
    }
    return origNote(s);
  };
}

export function resolveUSAProvince(ft: any, s: number): ResolvedTerritory | null {
  const p = ft.properties || {};
  const rawId = String(ft.id || p.id || '').trim();
  const rawName = String(p.NAME || p.name || p.shapeName || '').trim();
  const rawIso = String(p.shapeISO || '').trim().replace('-', '_');

  // 1. Ricerca diretta per ID esatto
  let meta: USAProvinceInfo | undefined = USA_PROVINCES_META[rawId] || USA_PROVINCES_META[rawIso];

  // 2. Normalizzazione ID
  if (!meta) {
    const cleanId = rawId.replace(/[^A-Za-z0-9_]/g, '');
    meta = USA_PROVINCES_META[cleanId];
    if (!meta && !cleanId.startsWith('US_')) {
      meta = USA_PROVINCES_META['US_' + cleanId];
    }
  }

  // 3. Ricerca fuzzy per nome o toponimo
  if (!meta && rawName) {
    const nrmRaw = rawName.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const key of Object.keys(USA_PROVINCES_META)) {
      const item = USA_PROVINCES_META[key];
      const nrmItem = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const nrmMod = item.modernName.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (nrmRaw === nrmItem || nrmRaw === nrmMod || (nrmItem.length >= 4 && nrmRaw.includes(nrmItem))) {
        meta = item;
        break;
      }
    }
  }

  if (meta) {
    const sov = meta.getSovereign(s);
    const fac = meta.getFaction(s);
    const histName = meta.getHistoricalName(s);
    const admin = meta.getAdminTitle(s);
    const note = meta.getNote(s);
    return makeResult(sov, histName, note, fac, admin);
  }

  return null;
}

/**
 * Popola e sincronizza il dizionario toponomastico storico con tutti i 50 Stati, DC e Territori USA
 */
export function populateUSAToponyms(dict: Record<string, Record<string, ToponymMatch>>): void {
  if (!dict['USA']) dict['USA'] = {};
  for (const key of Object.keys(USA_PROVINCES_META)) {
    const item = USA_PROVINCES_META[key];
    const match: ToponymMatch = {
      historicalName: item.historicalName,
      adminTitle: item.adminTitle,
      historicalNote: item.s0_1,
    };
    const normName = item.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    dict['USA'][normName] = match;
    dict['USA'][item.id.toLowerCase()] = match;
    if (item.iso) {
      dict['USA'][item.iso.toLowerCase().replace(/[^a-z0-9]/g, '_')] = match;
    }
  }
}