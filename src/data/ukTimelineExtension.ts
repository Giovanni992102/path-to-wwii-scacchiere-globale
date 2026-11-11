import { FactionType, ResolvedTerritory } from '../types';

/**
 * Estensione Cronologica & Geostorica Integrale per il Regno Unito di Gran Bretagna e Irlanda del Nord
 * e le Dipendenze della Corona (Isola di Man, Baliato di Jersey, Baliato di Guernsey) — Steps 9-19 (DIC 1941 -> SET 1947).
 *
 * Copre tutte le 182 entita (179 distretti NUTS-3 metropolitani + 3 Crown Dependencies):
 * - Step 9-11 (DIC 1941 - NOV 1942): Entrata USA, "Friendly Invasion" (USAAF 8th Air Force), Convogli Artici,
 *   coscrizione femminile, picco produttivo bellico e Battaglia d'Atlantico.
 * - Step 12-13 (LUG - SET 1943): Svolta atlantica ("Black May"), incursioni Pointblank/Ruhr/Dam Busters,
 *   pianificazione COSSAC/Overlord, ricerca Colossus e radar centimetrico H2S.
 * - Step 14-15 (GIU - AGO 1944): Operazione Overlord/Neptune (SHAEF a Southwick House, Mulberry, PLUTO),
 *   Operazione Fortitude South e offensiva tedesca delle bombe volanti V-1 ("Diver Belt").
 * - Step 16-17 (DIC 1944 - APR 1945): Missili balistici V-2 su Londra e Sud-Est (ultimo razzo a Orpington,
 *   27 marzo 1945), Market Garden, inverno di carestia nelle Isole del Canale occupate e vigilia del VE Day.
 * - Step 18 (SET 1945): Post-VE Day e VJ Day, Liberazione delle Isole del Canale (9 maggio 1945 — GG/JE tornano
 *   sotto sovranita UK/Alleati), vittoria laburista di Clement Attlee (26 luglio 1945) e smobilitazione imperiale.
 * - Step 19 (SET 1947): Crisi dell'inverno 1946-47, nazionalizzazione del carbone (NCB, 1° gen 1947) e trasporti,
 *   istituzione del Welfare State / NHS Act 1946, New Towns Act, austerita/crisi della sterlina, Harwell/Windscale
 *   nucleari e avvio della decolonizzazione britannica (India/Pakistan, Palestina).
 */

export interface UKExtendableMeta {
  nuts: string;
  name: string;
  modernName: string;
  historicalName: string;
  historicCounty: string;
  country: 'England' | 'Scotland' | 'Wales' | 'Northern Ireland' | 'Crown Dependency';
  capital: string;
  region: string;
}

interface UKLateDistrictProfile {
  s9_11?: string;
  s12_13?: string;
  s14_15?: string;
  s16_17?: string;
  s18?: string;
  s19?: string;
  hist12_13?: string;
  hist14_15?: string;
  hist16_17?: string;
  hist18?: string;
  hist19?: string;
}

function makeUKRes(
  o: string,
  name: string,
  note: string,
  fac: FactionType,
  adminEntity: string
): ResolvedTerritory {
  return { o, name, note, fac, adminEntity };
}

export function getUKAdminTitle(
  country: UKExtendableMeta['country'],
  s: number
): string {
  if (country === 'Northern Ireland') {
    if (s >= 19) {
      return 'Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Laburista Attlee · Stormont Sir Basil Brooke)';
    }
    if (s >= 18) {
      return 'Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Laburista Attlee · Stormont Brooke)';
    }
    if (s >= 12) {
      return 'Regno Unito di Gran Bretagna e Irlanda del Nord (Coalizione Churchill · Stormont Sir Basil Brooke)';
    }
    return 'Regno Unito di Gran Bretagna e Irlanda del Nord (Coalizione Churchill · Governo Stormont Andrews)';
  }
  if (country === 'Scotland') {
    if (s >= 19) {
      return 'Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Laburista Attlee · Scottish Office)';
    }
    if (s >= 18) {
      return 'Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Laburista Attlee · Joseph Westwood)';
    }
    return 'Regno Unito di Gran Bretagna e Irlanda del Nord (Coalizione Churchill · Scottish Office Tom Johnston)';
  }
  if (s >= 19) {
    return 'Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Laburista Attlee · Stato Sociale & Nazionalizzazioni)';
  }
  if (s >= 18) {
    return 'Regno Unito di Gran Bretagna e Irlanda del Nord (Governo Laburista Clement Attlee · Re Giorgio VI)';
  }
  return 'Regno Unito di Gran Bretagna e Irlanda del Nord (Governo di Coalizione Nazionale Churchill)';
}

const UK_DISTRICT_OVERRIDES: Record<string, UKLateDistrictProfile> = {
  // === LONDRA & CORONA METROPOLITANA ===
  UKI31: {
    s9_11: 'Ricostruzione di emergenza nella City attorno a St Paul e avvio degli studi urbanistici per il County of London Plan.',
    s12_13: 'Banche, assicurazioni e uffici della Square Mile sostengono il finanziamento globale dello sforzo bellico alleato e la cooperazione Lend-Lease.',
    s14_15: 'Estremamente esposta all\'offensiva delle bombe volanti V-1 (giugno-agosto 1944): stazioni ferroviarie e magazzini del centro subiscono gravi danni.',
    s16_17: 'Colpita dai razzi balistici V-2 fino alla primavera 1945 (attacco al mercato di Smithfield dell\'8 marzo 1945); esultanza dell\'8 maggio 1945 a St Paul.',
    s18: 'Riorganizzazione finanziaria postbellica con la fine brusca del Lend-Lease americano; la Banca d\'Inghilterra si avvia verso la nazionalizzazione.',
    s19: 'Bank of England Act e drammatica crisi della convertibilità della sterlina (agosto 1947); approvazione dei piani di ricostruzione della City bombardata.',
    hist19: 'City of London & Camden (Square Mile — Crisi della Sterlina 1947 & Ricostruzione)',
  },
  UKI32: {
    s9_11: 'Cabinet War Rooms sotto Whitehall e comando strategico di Winston Churchill dopo Pearl Harbor; nascita della Grande Alleanza anglo-sovietico-americana.',
    s12_13: 'Conferenze interalleate di Washington, Casablanca e Teheran coordinate da Whitehall; pubblicazione dello storico Rapporto Beveridge (dicembre 1942).',
    s14_15: 'Centrale politica dell\'Operazione Overlord nonostante le V-1 su Whitehall e Guards Chapel; preparazione dei piani del governo di coalizione per il dopoguerra.',
    s16_17: 'Churchill affaccia dal balcone di Whitehall l\'8 maggio 1945 (VE Day) davanti a una folla oceanica; fine della Coalizione Nazionale e campagna elettorale del 1945.',
    s18: '26 luglio 1945: trionfo elettorale laburista; Clement Attlee nuovo Primo Ministro a Downing Street con Ernest Bevin agli Esteri e Stafford Cripps al Board of Trade.',
    s19: 'Palazzo di Westminster vara il National Health Service Act, l\'Indian Independence Act (1947) e la nazionalizzazione del carbone, ferrovie ed elettricità nel clima di austerità.',
    hist18: 'Westminster & Whitehall (Downing Street — Vittoria Laburista di Clement Attlee, Luglio 1945)',
    hist19: 'Westminster & Whitehall (Palace of Westminster — Governo Attlee, Welfare State & Decolonizzazione)',
  },
  UKI41: {
    s9_11: 'I docks di West Ham e East Ham gestiscono i grandi convogli Lend-Lease e la riparazione delle navi scorta atlantiche.',
    s14_15: 'L\'East End torna in prima linea sotto il tiro continuo delle V-1 lanciate dalla Francia e dal Belgio contro il corridoio industriale del Tamigi.',
    s16_17: 'Gravi distruzioni causate dai missili V-2 su Newham, Plaistow e Stratford; fabbriche e banchine operano fino all\'armistizio.',
    s18: 'Nei Royal Docks rientrano reggimenti smobilitati e prigionieri di guerra britannici; avvio dei primi quartieri di alloggi prefabbricati (Prefabs).',
    s19: 'Attuazione del Great Abercrombie Plan per i sobborghi orientali con massiccio programma di edilizia pubblica laburista (Council Housing) al posto degli slum bombardati.',
    hist19: 'Hackney & Newham (Royal Docks — Ricostruzione Postbellica dell\'East End)',
  },
  UKI42: {
    s9_11: 'I Royal e West India Docks operano sotto pesante controllo antiaereo come principale scalo logistico della capitale.',
    s14_15: 'Costruzione dei cassoni frangiflutti Phoenix dei porti artificiali Mulberry per la Normandia e intensi bombardamenti V-1 lungo il Tamigi.',
    s16_17: 'Stepney e Whitechapel colpiti duramente dai razzi V-2 (l\'ultimo razzo V-2 caduto su Londra esplode a Stepney il 27 marzo 1945).',
    s18: 'Fine del coprifuoco e graduale ripresa commerciale del Port of London; smobilitazione della flotta mercantile d\'emergenza.',
    s19: 'Iniziative sindacali nei docks sotto il National Dock Labour Scheme (1947) e bonifica delle aree devastate di Poplar e Stepney.',
    hist19: 'Tower Hamlets (Port of London & Stepney — National Dock Labour Scheme 1947)',
  },
  UKI44: {
    s14_15: 'Sottoposta a fitte cadute di V-1 lungo l\'asse ferroviario del Kent verso Londra; allarme costante e sfollamento di bambini nel nord.',
    s16_17: '25 novembre 1944: tragico impatto di un razzo V-2 sui magazzini Woolworth di New Cross Gate (168 vittime civili).',
    s18: 'Sgombero dei rifugi pubblici, ritorno degli sfollati e ripristino delle linee elettrificate del Southern Railway.',
    s19: 'Ricostruzione residenziale a Lewisham, Deptford e Peckham con insediamenti modulari postbellici e riforma sanitaria municipale.',
  },
  UKI52: {
    s9_11: 'Lo stabilimento Ford di Dagenham raggiunge il picco nella produzione di cingolati Bren Carrier, motori Rolls-Royce Merlin e autocarri militari.',
    s14_15: 'Forte esecuzione di mezzi anfibi e motori per la testa di ponte in Normandia; bersaglio della traiettoria di V-1 attraverso l\'estuario.',
    s18: 'Riconversione immediata delle linee Ford Dagenham dalla produzione bellica a trattori agricoli Fordson Major e berline civili.',
    s19: 'Campagna nazionale "Export or Die": Ford Dagenham diventa uno dei principali esportatori britannici per sostenere la bilancia dei pagamenti del 1947.',
    hist19: 'Barking & Dagenham (Ford Motor Works — Riconversione & Campagna "Export or Die" 1947)',
  },
  UKI61: {
    s9_11: 'L\'aeroporto di RAF Biggin Hill coordina le sweep offensive sulla Francia occupata con squadriglie della RAF, del Canada e polacche.',
    s14_15: 'Cuore della "Gun Belt" di difesa antiaerea contro le bombe volanti V-1 intercettate prima della cintura urbana londinese.',
    s16_17: '27 marzo 1945: l\'ultimissimo missile balistico tedesco V-2 caduto sul suolo britannico colpisce Kynaston Road a Orpington (Bromley).',
    s18: 'Smobilitazione del Biggin Hill Fighter Sector e passaggio alla RAF Reserve Command dopo la vittoria alleata.',
    s19: 'Conservazione memoriale di Biggin Hill e crescita dei sobborghi meridionali nel quadro del Greater London Plan.',
    hist19: 'Bromley (RAF Biggin Hill & Orpington — Memoria dell\'Ultimo V-2, 27 Marzo 1945)',
  },
  UKI62: {
    s14_15: 'Croydon subisce l\'ondata più intensa dell\'offensiva V-1 in tutta la Gran Bretagna ("Bomb Alley"), con centinaia di impatti tra giugno e agosto 1944.',
    s16_17: 'Ulteriori incursioni V-2 a fine guerra; rimozione delle difese antiaeree di Thornton Heath e Purley.',
    s18: 'Croydon Airport torna scalo dell\'aviazione civile e militare del Transport Command verso il continente europeo liberato.',
    s19: 'Riconversione dell\'aeroporto di Croydon a scalo continentale regionale mentre i grandi voli transatlantici traslocano a Heathrow.',
  },
  UKI72: {
    s12_13: 'Presso la GPO Research Station di Dollis Hill (Brent), l\'ingegnere Tommy Flowers progetta in gran segreto nel 1943 il rivoluzionario calcolatore elettronico Colossus.',
    s14_15: 'L\'operatività dei primi calcolatori Colossus di Dollis Hill decritta a Bletchley i messaggi Lorenz dell\'OKW durante Overlord e Bagration.',
    s18: 'Dollis Hill consolida le tecnologie elettroniche e di telecomunicazione civili e governative britanniche del dopoguerra.',
    s19: 'Proseguimento della ricerca statale postale, sui transistori e sulle telecomunicazioni transatlantiche a Dollis Hill sotto amministrazione Attlee.',
    hist19: 'Brent (GPO Research Station Dollis Hill — Culla del Calcolatore Colossus)',
  },
  UKI74: {
    s12_13: 'RAF Northolt ospita le celebri squadriglie da caccia polacche (No. 303 Squadron); Bunker di comando dell\'11° Gruppo a RAF Uxbridge.',
    s14_15: 'Il bunker Fighter Command di RAF Uxbridge dirige la copertura aerea sulla Manica e il contrasto alle rampe V-1 nel Pas-de-Calais.',
    s18: 'RAF Northolt diventa provvisoriamente il principale aeroporto civile di Londra in attesa del completamento delle piste di Heathrow.',
    s19: 'Nel 1946–47 Eastcote (Harrow/Hillingdon) ospita la nuova sede di GCHQ trasferita da Bletchley Park all\'alba della Guerra Fredda.',
    hist19: 'Harrow & Hillingdon (RAF Northolt & GCHQ Eastcote — Intelligence Postbellica)',
  },
  UKI75: {
    s14_15: '8 settembre 1944 (ore 18:43): il primissimo missile balistico V-2 caduto su suolo inglese esplode su Staveley Road a Chiswick (Hounslow).',
    s16_17: 'Proseguimento dei lavori di espansione dell\'aerodromo di Heathrow per il comando trasporti verso l\'Estremo Oriente.',
    s18: 'Conversione ufficiale di Heathrow ad aeroporto internazionale civile di Londra (trasferito al Ministry of Civil Aviation nel 1946).',
    s19: 'Apertura dei primi terminali passeggeri transatlantici BOAC e BSAA a London Airport (Heathrow) e rilancio dei cantieri aeronautici.',
    hist19: 'Hounslow & Richmond (Chiswick V-2 & Nuovo Aeroporto Internazionale di Heathrow)',
  },

  // === SOUTH EAST, D-DAY / OVERLORD, ENIGMA & NUCLEARE ===
  UKJ11: {
    s12_13: 'L\'aerodromo di RAF Aldermaston e Greenham Common divengono basi nevralgiche del IX Troop Carrier Command americano per le truppe aviotrasportate.',
    s14_15: 'La notte del 5-6 giugno 1944 i C-47 Skytrain decollano da Aldermaston e Greenham Common portando in Normandia la 101ª Airborne USA.',
    s16_17: 'Operazioni di rifornimento aereo per Market Garden, Ardenne (Bastogne) e Operazione Varsity sul Reno.',
    s18: 'Rientro delle formazioni americane dagli aeroporti del Berkshire; trasformazione della Royal Aircraft Establishment locale.',
    s19: 'Pianificazione iniziale del sito atomico di Aldermaston e designazione delle aree postbelliche del Berkshire (futura Bracknell New Town).',
    hist19: 'Berkshire (RAF Aldermaston & Greenham — Verso il Programma Atomico Britannico)',
  },
  UKJ12: {
    s9_11: 'La Government Code & Cypher School di Bletchley Park espande gli Hut decrittando le chiavi Shark degli U-Boot e la rete Luftwaffe ed Enigma.',
    s12_13: 'Decisivo successo dell\'intelligence Ultra sulla Battaglia d\'Atlantico (primavera 1943) e avvio dei primi computer Colossus Mark 1 contro i cifrari Lorenz Tunny.',
    s14_15: 'Colossus Mark 2 entra in funzione il 1° giugno 1944 garantendo a Eisenhower la certezza che Hitler ritenga Pas-de-Calais il vero obiettivo D-Day (Fortitude).',
    s16_17: 'Circa 9.000 specialisti tra militari, donne WRNS (Wrens) e matematici operano a Bletchley fino alla resa del Terzo Reich nel maggio 1945.',
    s18: 'Chiusura progressiva dei reparti di guerra a Bletchley Park (marzo 1946) e distruzione segreta dei macchinari Colossus su ordine di Churchill/Attlee.',
    s19: 'Trasferimento di GCHQ a Eastcote e Cheltenham; l\'area di Bletchley riprende il ruolo ferroviario ed educativo civile nel segreto assoluto di Stato su Ultra.',
    hist14_15: 'Milton Keynes (Bletchley Park Station X — Colossus II & Inganno Strategico D-Day)',
    hist19: 'Milton Keynes (Ex-Station X Bletchley Park — Silenzio di Stato & Transizione GCHQ)',
  },
  UKJ14: {
    s9_11: 'Morris Motors di Cowley e l\'aeroporto di RAF Benson / Medmenham effettuano ricognizione fotografica strategica sulle rampe V tedesche e Peenemünde.',
    s12_13: 'Le foto aeree di Medmenham/Oxfordshire svelano al War Cabinet il centro missilistico tedesco di Peenemünde guidando il bombardamento alleato.',
    s14_15: 'RAF Brize Norton e Broadwell lanciano gli alianti Horsa dell\'Operazione Overlord e successivamente dell\'Operazione Market Garden.',
    s18: 'Decisione governativa del governo Attlee (ottobre 1945) di trasformare l\'ex base RAF Harwell nel principale centro nucleare nazionale.',
    s19: 'Gennaio 1946–1947: John Cockcroft dirige ad AERE Harwell il primo reattore nucleare dell\'Europa occidentale (GLEEP, avviato il 15 agosto 1947).',
    hist19: 'Oxfordshire (Cowley Motor Works & AERE Harwell — Primo Reattore Atomico GLEEP 1947)',
  },
  UKJ28: {
    s12_13: 'L\'aeroporto di RAF Tangmere opera i voli clandestini notturni dei Lysander SOE per agenti e resistenza nella Francia occupata.',
    s14_15: 'Basi avanzate di caccia Hawker Typhoon e campi di ammassamento truppe tra gli alberi del West Sussex per le spiagge normanne.',
    s18: 'Smobilitazione delle basi aeree d\'assalto di Tangmere e Ford e avvio della pianificazione urbana per decongestione di Londra.',
    s19: '9 gennaio 1947: il governo Attlee designa **Crawley** tra le primissime New Towns britanniche (New Towns Act 1946) nell\'area Nord-Est del West Sussex.',
    hist19: 'West Sussex North East (Crawley New Town Designata 1947 & Ex-Base RAF Tangmere)',
  },
  UKJ31: {
    s9_11: 'Il Royal Navy Dockyard di Portsmouth ripara navi capitali e prepara le formazioni anfibie dei raid di St-Nazaire e Dieppe (1942).',
    s12_13: 'Allestimento del comando congiunto interalleato attorno allo Stretto del Solent in preparazione dell\'invasione della Francia.',
    s14_15: '5-6 giugno 1944: epicentro assoluto di **Operazione Overlord/Neptune**; il Royal Navy Dockyard fa salpare migliaia di mezzi mentre le spiagge di Southsea assistono all\'armata.',
    s16_17: 'Traffico logistico verso i porti della Normandia e di Anversa; celebrazione navale della vittoria in Europa.',
    s18: 'Disarmo graduale delle flottiglie anfibie di Spithead e ritorno delle squadre della Royal Navy dai teatri del Pacifico.',
    s19: 'Portsmouth Naval Base riadattata alle esigenze della Guerra Fredda nordatlantica; ricostruzione civile del centro bombardato.',
    hist14_15: 'Portsmouth (Spithead & Dockyard — Cuore Marittimo di Operazione Neptune / D-Day)',
    hist19: 'Portsmouth (HMNB Portsmouth — Riconversione Postbellica & Ricostruzione Civica)',
  },
  UKJ32: {
    s12_13: 'I bacini di Southampton costruiscono chiatte e componenti del porto artificiale Mulberry sotto rigoroso segreto militare.',
    s14_15: 'Nel giugno 1944 Southampton è il più grande porto d\'imbarco alleato (Area C) verso Omaha e Utah Beach: oltre 2 milioni di soldati imbarcati verso la Francia.',
    s16_17: 'Flusso continuo di rifornimenti USA verso Cherbourg e Le Havre fino alla resa della Germania.',
    s18: 'I transatlantici *Queen Mary* e *Queen Elizabeth* tornano a Southampton riportando le divisioni canadesi, americane e le spose di guerra.',
    s19: 'Rilancio dei collegamenti civili passeggeri Cunard White Star dall\'Ocean Terminal di Southampton e ricostruzione dei quartieri centrali.',
    hist14_15: 'Southampton (Area C — Primo Porto d\'Imbarco D-Day & Cantieri Mulberry)',
    hist19: 'Southampton (Docks Transatlantici Cunard & Ricostruzione Urbana Postbellica)',
  },
  UKJ34: {
    s12_13: 'Prove segrete lungo i fondali del Solent per l\'oleodotto sottomarino dell\'operazione PLUTO e per gli hovercraft/idrovolanti.',
    s14_15: 'Stazione di pompaggio segreta dell\'Operazione **PLUTO** (Pipe-Lines Under The Ocean) tra Shanklin/Sandown e Cherbourg, camuffata in finte ville costiere.',
    s18: 'Recupero delle tubazioni subacquee PLUTO dal Canale della Manica; la Saunders-Roe di Cowes avvia il progetto di idrovolanti civili.',
    s19: 'Saunders-Roe a East Cowes sviluppa lo sfortunato ma colossale idrovolante *SR.45 Princess*; l\'Isola di Wight riparte dal turismo balneare britannico.',
    hist14_15: 'Isle of Wight (Sandown / Shanklin — Terminale Oleodotto Sottomarino PLUTO)',
  },
  UKJ36: {
    s12_13: 'Concentramento segreto delle divisioni d\'assalto alleate nelle foreste e tenute di campagna dell\'Hampshire centrale.',
    s14_15: 'A **Southwick House** (Hampshire), quartier generale avanzato dello SHAEF, il 5 giugno 1944 Eisenhower pronuncia la decisione storica: *"Okay, let\'s go"*.',
    s18: 'Chiusura dei vasti accampamenti temporanei dell\'Hampshire e riconversione agricola dei terreni requisiti.',
    s19: 'Southwick House diviene sede della Scuola di Difesa navale; il Central Hampshire avvia la pianificazione urbana della valle dello Itchen.',
    hist14_15: 'Central Hampshire (Southwick House SHAEF HQ — Decisione di Eisenhower, 5 Giugno 1944)',
  },
  UKJ41: {
    s14_15: 'I cantieri navali di Chatham completano incrociatori e sommergibili per la Royal Navy nel Pacifico (British Pacific Fleet) e nella Manica.',
    s18: 'Ritorno e disarmo di numerose unità minori alleate nell\'estuario del Medway.',
    s19: 'Chatham Dockyard resta arsenale strategico della Royal Navy nel Mare del Nord mentre l\'area di Rochester/Gillingham si riconverte all\'industria leggera.',
  },
  UKJ44: {
    s12_13: 'Stretto di Dover fortificato da batterie pesanti a lungo raggio; scalo radar di precisione Chain Home Low.',
    s14_15: 'Teatro della colossale finta armata **Operation Fortitude South** (carri finti FUSAG del gen. Patton a Dover/Folkestone) e **PLUTO Dumbo** da Dungeness al Pas-de-Calais.',
    s16_17: 'Settembre 1944: le batterie tedesche di Cap Gris-Nez tacciono dopo la liberazione canadese di Calais; fine di 4 anni di bombardamenti su Dover (*Hellfire Corner*).',
    s18: 'Sminamento dello Stretto di Dover e riapertura traghetti Dover-Calais e Dover-Ostenda; accoglienza degli ex prigionieri di guerra.',
    s19: 'Ripresa del traffico turistico ferroviario sulla Golden Arrow Dover-Parigi; bacini carboniferi del Kent nazionalizzati sotto il National Coal Board.',
    hist14_15: 'East Kent (Dover / Dungeness — Operazione Fortitude South & PLUTO Dumbo)',
    hist19: 'East Kent (Dover & Miniere del Kent — Sminamento Manica & NCB 1947)',
  },

  // === SOUTH WEST, WEST & EAST MIDLANDS, EAST ANGLIA ===
  UKK11: {
    s9_11: 'Filton produce bombardieri Bristol Beaufighter e prepara l\'infrastruttura logistica e ospedaliera per il Western Base Section statunitense.',
    s14_15: 'Importante polo ferroviario e portuale di Avonmouth per i rifornimenti petroliferi destinati alle armate in Europa.',
    s18: 'Bristol Aeroplane Company spinge sull\'aviazione civile postbellica avviando la mega-pista di Filton.',
    s19: 'Assemblaggio del colosso civile transatlantico **Bristol Brabazon** (simbolo delle grandi scommesse tecnologiche britanniche 1946–47) e ricostruzione del centro civico.',
    hist19: 'City of Bristol (Filton Aircraft Works — Progetto Bristol Brabazon & Port of Avonmouth)',
  },
  UKK41: {
    s12_13: 'Base principale delle corvette e cacciatorpediniere di scorta dei convogli occidentali (Western Approaches Plymouth Command).',
    s14_15: 'Dall\'Hamoaze di Plymouth e dalle spiagge del Devon salpano la **Task Force O / Force U** e migliaia di soldati americani verso Utah ed Omaha Beach.',
    s16_17: 'Adozione dello storico Piano di ricostruzione urbanistica di Patrick Abercrombie (*A Plan for Plymouth*, 1944) per la città devastata dal Blitz.',
    s18: 'Rientro delle squadre della Royal Navy e trasformazione dei cantieri di Devonport alle unità moderne dell\'era postbellica.',
    s19: 'Inizio effettivo dei grandi viali ortogonali del piano di ricostruzione di Plymouth (Royal Parade, ottobre 1947 inaugurata da Re Giorgio VI).',
    hist14_15: 'Plymouth (HMNB Devonport — Imbarco Task Force USA per Utah & Omaha Beach)',
    hist19: 'Plymouth (HMNB Devonport — Ricostruzione Abercrombie & Royal Parade 1947)',
  },
  UKK43: {
    s14_15: '**Slapton Sands (Devon)**: segretissima prova generale anfibia americana (**Exercise Tiger**, aprile 1944, tragico attacco di E-Boat tedesche) prima di Utah Beach.',
    s18: 'Ritorno degli sfollati di South Hams alle fattorie requisite nel 1943 per le esercitazioni D-Day.',
    s19: 'Rilancio agricolo della contea e ricostruzione del centro storico di Exeter colpito dal Baedeker Blitz del 1942.',
    hist14_15: 'Devon CC (Slapton Sands Exercise Tiger & Base Addestrativa Overlord)',
  },
  UKG31: {
    s9_11: 'Fabbrica statale di **Castle Bromwich** produce al massimo regime caccia Spitfire; BSA fabbrica armi leggere e biciclette paracadutiste.',
    s12_13: 'Intensificazione del contributo industriale alle brigate corazzate alleate e ai bombardieri Avro Lancaster assemblati nelle Midlands.',
    s14_15: 'Ultima grande produzione bellica a getto continuo per sostenere gli eserciti sbarcati in Francia.',
    s18: 'Giugno 1945: esce da Castle Bromwich l\'ultimo dei **12.129 Supermarine Spitfire** costruiti a Birmingham; rapida riconversione automobilistica.',
    s19: 'Austin a Longbridge e le officine delle West Midlands guidano le esportazioni britanniche di auto e acciaio nell\'austerità postbellica.',
    hist18: 'Birmingham (Castle Bromwich & Longbridge — Fine Produzione Spitfire, Estate 1945)',
    hist19: 'Birmingham (Longbridge Austin Works — Riconversione Automobilistica Postbellica)',
  },
  UKG33: {
    s9_11: 'Nonostante la devastazione del novembre 1940, le fabbriche ombra di Coventry producono motori Hercules, radar e autoblindo a pieno ritmo.',
    s14_15: 'Fornitura di propulsori, pompe aeronautiche e carri alle divisioni alleate in Italia e Normandia.',
    s18: 'Proposte civiche innovative di ricostruzione e gemellaggio di riconciliazione internazionale (Stalingrado e poi Kiel).',
    s19: 'Standard Motor, Jaguar e Rootes Group rilanciano l\'esportazione di vetture da Coventry; avvio dei progetti per la nuova Cattedrale moderna.',
    hist19: 'Coventry (Motor & Aerospace City — Riconversione Civile & Ricostruzione)',
  },
  UKF11: {
    s12_13: 'La Rolls-Royce di Derby avvia lo sviluppo dei motori a reazione (**Welland**, **Derwent**, **Nene**) a fianco del mito aeronautico **Merlin**.',
    s14_15: 'Propulsori Merlin e Griffon equipaggiano i Mustang P-51 di scorta su Berlino e i nuovi caccia Spitfire Mk XIV.',
    s18: 'Il Rolls-Royce **Derwent** spinge il Gloster Meteor britannico al primato mondiale di velocità a reazione (novembre 1945).',
    s19: 'Derby guida la supremazia aeroturbopropulsori civile e militare europea con gli sviluppi del *Nene* e dei futuri motori Dart.',
    hist19: 'Derby (Rolls-Royce Aero Engines — Supremazia dei Motori a Reazione 1945–47)',
  },
  UKF25: {
    s14_15: 'Gli stabilimenti siderurgici **Stewarts & Lloyds di Corby** producono migliaia di chilometri di tubi flessibili HAMEL e condutture per **PLUTO**; aeroporti USA/RAF lanciano gli alianti di Market Garden.',
    s19: 'Forte espansione siderurgica di Corby nell\'Inghilterra centrale durante i preparativi laburisti per la nazionalizzazione dell\'acciaio.',
  },
  UKF30: {
    s9_11: 'Il Lincolnshire consolida il soprannome di *"Bomber County"*: decine di nuovi campi di volo per bombardieri pesanti Lancaster e Halifax del RAF Bomber Command.',
    s12_13: '16-17 maggio 1943 (**Operation Chastise — Dambusters**): il No. 617 Squadron di Guy Gibson decolla da **RAF Scampton** con le bombe rimbalzanti contro le dighe della Ruhr.',
    s14_15: 'Bomber Command di Coningsby, Scampton, Woodhall Spa e Waddington colpisce le reti ferroviarie francesi per isolare il campo di battaglia di Normandia.',
    s16_17: 'Incursioni finali sulle vie di comunicazione tedesche e Operazione **Manna** (aprile-maggio 1945): Lancaster del Lincolnshire lanciano viveri ai Paesi Bassi affamati.',
    s18: 'Rapida riduzione delle decine di stazioni Bomber Command; il No. 617 Squadron diviene forza elitaria di deterrenza strategica.',
    s19: 'L\'agricoltura meccanizzata dei Fen e delle Wolds torna protagonista; solo le basi strategiche chiave (Scampton, Coningsby, Waddington) restano attive.',
    hist12_13: 'Lincolnshire ("Bomber County" — RAF Scampton & Incursione Dambusters 1943)',
    hist19: 'Lincolnshire (Ritorno Agricolo dei Fen & Basi Strategiche RAF Bomber Command)',
  },
  UKH12: {
    s9_11: 'Il Cambridgeshire accoglie sterminate piste in cemento americano per l\'Eighth Air Force a Bottisham, Steeple Morden e Duxford.',
    s14_15: 'Da Duxford e dalle basi del Cambridgeshire decollano i caccia P-51 Mustang di scorta a lungo raggio a protezione dei bombardieri verso la Germania.',
    s18: 'Chiusura delle basi USAAF tra il 1945 e il 1946; l\'Università di Cambridge riassorbe migliaia di studenti ed ex militari.',
    s19: 'Ripresa scientifica ai Cavendish Laboratories di Cambridge e bonifica agricola delle vecchie piste militari.',
  },
  UKH14: {
    s9_11: 'Il Suffolk ospita il massiccio insediamento dell\'8th USAAF ("The Friendly Invasion") tra Ipswich, Bury St Edmunds, Framlingham e Martlesham Heath.',
    s12_13: 'Decollo delle grandi formazioni di B-17 Flying Fortress da Horham, Thorpe Abbotts e Parham nelle dure battaglie aeree dell\'estate 1943.',
    s14_15: 'Intensissime missioni di bombardamento diurno su Germania ed Europa occidentale; le stazioni radar e costiere sorvegliano il Mare del Nord.',
    s18: 'Rimpatrio delle unità americane; il porto di Lowestoft e i cantieri costieri riprendono l\'attività peschereccia dopo lo sminamento.',
    s19: 'Le basi USAAF chiave di Lakenheath e Mildenhall si preparano a tornare strategiche nell\'incipiente tensione della Guerra Fredda (1947).',
    hist14_15: 'Suffolk ("Little America" — Basi B-17 dell\'8th USAAF verso Normandia & Reich)',
    hist19: 'Suffolk (Sminamento Marittimo & Basi Aeree Lakenheath/Mildenhall alla Guerra Fredda)',
  },
  UKH15: {
    s9_11: 'Norwich subisce pesanti raid **Baedeker Blitz** nell\'aprile 1942 contro il centro storico; le basi dell\'East Norfolk accolgono i B-24 Liberator americani.',
    s14_15: 'Il 2nd Bombardment Division dell\'8th USAAF schiera i Liberator attorno a Norwich sostenendo lo sforzo aereo su Overlord e la Germania.',
    s18: 'Smobilitazione degli aerodromi dell\'East Norfolk e cerimonie commemorative per i caduti americani.',
    s19: 'Ricostruzione civile a Norwich e modernizzazione dell\'agricoltura del Norfolk sotto le tutele dell\'Agriculture Act 1947.',
  },
  UKH23: {
    s12_13: 'La de Havilland di **Hatfield** produce in massa l\'inarrestabile cacciabombardiere multiruolo in legno **Mosquito**, fiore all\'occhiello dell\'industria britannica.',
    s14_15: 'I Mosquito dell\'Hertfordshire guidano le operazioni chirurgiche a bassa quota (Amiens, Gestapo HQ) e segnalano i bersagli in Europa.',
    s18: 'De Havilland Hatfield fa volare il nuovo caccia a reazione **de Havilland Vampire** e progetta il rivoluzionario Comet a reazione.',
    s19: 'L\'11 novembre 1946 **Stevenage (Hertfordshire)** è proclamata **prima New Town ufficiale del Regno Unito** ai sensi del New Towns Act 1946!',
    hist19: 'Hertfordshire (Hatfield De Havilland & Stevenage — Prima New Town Britannica 1946–47)',
  },
  UKH35: {
    s14_15: 'Le basi aeree dell\'Essex occidentale lanciano stormi medi da bombardamento Marauder e Spitfire tattici in supporto della campagna di Francia.',
    s19: 'Marzo 1947: designazione di **Harlow** nell\'Essex occidentale tra le grandi **New Towns** del piano Abercrombie del governo Attlee.',
  },
  UKH21: {
    s12_13: 'Gli stabilimenti Vauxhall di Luton costruiscono migliaia di carri pesanti **Churchill** schierati in Tunisia, Italia e Normandia.',
    s18: 'Riconversione immediata della produzione Vauxhall di Luton verso automobili popolari e veicoli commerciali leggeri.',
    s19: 'Luton diviene centro trainante delle esportazioni automobilistiche inglesi nel 1947 insieme a Birmingham e Coventry.',
  },

  // === NORD INGHILTERRA: NORD-OVEST, YORKSHIRE, NORD-EST & NUCLEARE ===
  UKD11: {
    s9_11: 'Le acciaierie Workington, i porti di Whitehaven e i depositi d\'armi di Sellafield/Drigg producono esplosivi e ferro per l\'industria navale.',
    s16_17: 'I cantieri Vickers di Barrow-in-Furness e le fabbriche chimiche della Cumbria operano al massimo della produzione sottomarina e chimica.',
    s18: 'Chiusura delle fabbriche di cordite ed esplosivi Royal Ordnance Factory di Sellafield e Drigg nel 1945.',
    s19: 'Settembre 1947: il sito ex ROF di **Sellafield / Windscale** viene selezionato per ospitare i primi reattori militari britannici al plutonio (Progetto Windscale)!',
    hist19: 'West Cumbria (Sellafield / Windscale — Avvio Sito Nucleare Militare Britannico, Set 1947)',
  },
  UKD33: {
    s12_13: 'A **Trafford Park (Manchester)** le officine Metropolitan-Vickers e A.V. Roe (Avro) intensificano l\'assemblaggio dei quadrimotori **Lancaster** e turbine a getto.',
    s14_15: 'Il nodo ferroviario e industriale di Manchester alimenta l\'esercito britannico e canadese dal fronte normanno fino al Reno.',
    s18: 'Trafford Park riconverte le linee belliche ad apparati elettromeccanici, turbine energetiche e aerei di linea Avro Tudor.',
    s19: 'All\'Università di Manchester il team di Freddie Williams, Tom Kilburn e Max Newman progetta la memoria elettrostatica verso lo storico calcolatore **Baby** (1947).',
    hist19: 'Manchester (Trafford Park & Università — Riconversione Industriale & Precursore del Manchester Baby)',
  },
  UKD45: {
    s14_15: 'Aeroporti militari attorno a Preston e centro manutentivo aeronautico britannico-statunitense dell\'Air Depot a Warton.',
    s18: 'La fabbrica di gas velenosi Ministry of Supply di **Springfields (Salwick, Preston)** viene smantellata a fine guerra.',
    s19: 'Nel 1946–47 **Springfields** entra in funzione come primo impianto statale britannico di raffinazione e produzione di barre di uranio per i reattori nucleari.',
    hist19: 'Mid Lancashire (Springfields Salwick — Impianto Atomico del Combustibile Uranio 1946–47)',
  },
  UKD72: {
    s9_11: 'Il comando congiunto di **Derby House (Liverpool)** dirige la durissima scorta ai convogli nell\'Atlantico settentrionale contro gli U-Boot tedeschi.',
    s12_13: 'Maggio 1943 (**"Black May"**): dalla stanza operazioni di Derby House a Liverpool, l\'Ammiraglio Sir Max Horton spezza definitivamente la campagna U-Boot nell\'Atlantico.',
    s14_15: 'Dopo il D-Day il Mersey concentra decine di migliaia di tonnellate di equipaggiamento americano e convogli diretti verso la Francia e l\'Italia.',
    s18: '15 agosto 1945: il Western Approaches HQ di Derby House chiude i battenti celebrando la vittoria nella Battaglia dell\'Atlantico durata tutta la guerra.',
    s19: 'Liverpool riavvia la ricostruzione dei docks di Bootle e Gladstone e gestisce la ripresa dei commerci transatlantici nonostante il duro razionamento 1947.',
    hist12_13: 'Liverpool (Derby House HQ — Vittoria di "Black May" nella Battaglia dell\'Atlantico 1943)',
    hist18: 'Liverpool (Mersey Docks — Chiusura Trionfale del Western Approaches HQ, Agosto 1945)',
    hist19: 'Liverpool (Port of Liverpool — Ricostruzione Mersey Docks & Commercio Atlantico 1947)',
  },
  UKD74: {
    s12_13: 'I cantieri **Cammell Laird di Birkenhead** varano sommergibili, fregate e l\'incrociatore per la Royal Navy nel Pacifico e Atlantico.',
    s18: 'I cantieri della penisola di Wirral completano la portaerei *HMS Venerable* e riconvertono il naviglio mercantile alleato.',
    s19: 'Birkenhead torna ad essere uno dei massimi poli europei di cantieristica mercantile e riparazione petroliere.',
  },
  UKE32: {
    s9_11: 'Le acciaierie Vickers/Firth-Brown di Sheffield fondono acciai speciali per canne di artiglieria, blindature corazzate e alberi motori aeronautici.',
    s14_15: 'Fornitura continua di corazze e utensileria meccanica ad altissima precisione per l\'esercito d\'invasione alleato.',
    s18: 'Riconversione dell\'acciaieria verso macchinari industriali per l\'esportazione e infrastrutture civili.',
    s19: 'Le miniere e le cokerie attorno a Sheffield entrano sotto gestione **National Coal Board** (1° gennaio 1947); pesante impatto dell\'inverno glaciale 1947 sui forni.',
    hist19: 'Sheffield (Acciaierie Speciali & Crisi Energetica dell\'Inverno 1947)',
  },
  UKE31: {
    s14_15: 'Bacino carbonifero dello **Yorkshire Meridionale**: estraggono milioni di tonnellate i "Bevin Boys" (coscritti di leva inviati nelle miniere per reggere lo sforzo bellico).',
    s18: 'Alta tensione sindacale ed entusiasmante attesa della promessa elettorale laburista sulla proprietà pubblica del carbone.',
    s19: '1° gennaio 1947: il **Coal Industry Nationalisation Act** entra in vigore — festa alle miniere di Barnsley, Doncaster e Rotherham sotto la bandiera blu del National Coal Board (NCB), subito sfidate dal gelo ferroviario.',
    hist19: 'Barnsley, Doncaster & Rotherham (Yorkshire Coalfield — Nazionalizzazione Carbone NCB, 1° Gen 1947)',
  },
  UKC14: {
    s12_13: 'Le miniere del County Durham alimentano l\'industria dell\'acciaio settentrionale con forte contributo dei *Bevin Boys* introdotti nel dicembre 1943.',
    s18: 'Massiccio sostegno dei minatori del Durham al nuovo governo laburista Attlee.',
    s19: '1° gennaio 1947: le miniere del Durham passano al **National Coal Board**; il 19 aprile 1947 viene designata la nuova città operaia di **Newton Aycliffe** per sostituire l\'antica ROF.',
    hist19: 'Durham CC (National Coal Board 1947 & Newton Aycliffe New Town Designata Apr 1947)',
  },
  UKC22: {
    s12_13: 'I cantieri Swan Hunter, Hawthorn Leslie e Vickers-Armstrongs sul Tyne costruiscono cacciatorpediniere di squadra, incrociatori e portaerei leggere.',
    s14_15: 'Il Tyne funge da porto di scorta costiero chiave e riparazione di naviglio danneggiato lungo la East Coast.',
    s18: 'Smobilitazione delle costruzioni militari navali sul Tyne; lancio delle nuove portaerei di classe *Centaur* e *Majestic* per il Commonwealth.',
    s19: 'I cantieri navali di Tyneside godono di un imponente boom di commesse mercantili mondiali per rimpiazzare il tonnellaggio perduto tra il 1939 e il 1945.',
    hist19: 'Tyneside (Cantieri Navali del Tyne — Boom Cantieristico Mercantile Postbellico)',
  },
  UKC23: {
    s12_13: 'Sunderland sul fiume Wear continua a detenere il primato britannico per quantità di navi mercantili standard (*Liberty/Empire Ships*) varate.',
    s19: 'Le miniere costiere di Wearside passano all\'NCB mentre i cantieri navali costruiscono petroliere e mercantili da esportazione.',
  },

  // === GALLES ===
  UKL16: {
    s12_13: 'I bacini carboniferi di Monmouthshire ed Ebbw Vale producono carbone da vapore e acciaio a ritmo bellico; il deputato locale **Aneurin Bevan** guida il dibattito riformista ai Comuni.',
    s18: 'Agosto 1945: Clement Attlee nomina **Aneurin Bevan** (deputato di Ebbw Vale) Ministro della Salute incaricato di fondare il servizio sanitario pubblico.',
    s19: 'Sotto la spinta di Aneurin Bevan viene varato il **National Health Service Act 1946** (in preparazione al lancio 1948), mentre tutte le miniere delle Gwent Valleys passano all\'NCB il 1° gennaio 1947.',
    hist19: 'Gwent Valleys (Ebbw Vale — Aneurin Bevan Architetto dell\'NHS & Miniere Nazionalizzate NCB)',
  },
  UKL15: {
    s14_15: 'Le valli minerarie della Rhondda e di Merthyr Tydfil riforniscono porti navali e centrali elettriche di guerra per la preparazione di Overlord.',
    s18: 'Fervore sindacale minerario per la trasformazione sociale delle valli gallesi dopo decenni di disoccupazione.',
    s19: '1° gennaio 1947: il *Vesting Day* del **National Coal Board** segna il trasferimento allo Stato dei grandi pozzi della Rhondda e del Galles meridionale; nuove fabbriche pubbliche nelle valli.',
    hist19: 'Central Valleys (Rhondda & Merthyr — Vesting Day Minerario NCB 1947)',
  },
  UKL17: {
    s12_13: 'Le aree di Port Talbot e Bridgend ospitano enormi stabilimenti munizioni Royal Ordnance (Waterton/Brackla) con decine di migliaia di operaie.',
    s19: '1947: avvio dei lavori della gigantesca acciaieria a nastri continui della **Steel Company of Wales (Abbey Works)** a Port Talbot e riconversione della ROF Bridgend in parco industriale civile.',
    hist19: 'Bridgend & Neath Port Talbot (Abbey Works Steel 1947 & Riconversione ROF)',
  },
  UKL18: {
    s18: 'Dopo le pesanti ferite del "Three Nights\' Blitz" del febbraio 1941, Swansea inaugura un piano di risanamento commerciale e portuale.',
    s19: 'Ricostruzione del centro di Swansea (Kingsway) e rilancio dei docks metallurgici e petroliferi.',
  },
  UKL22: {
    s14_15: 'Il porto di Cardiff e gli impianti dell\'aerodromo di RAF St Athan servono l\'enorme afflusso logistico statunitense e alleato in direzione dei fronti continentali.',
    s18: 'Ritorno all\'amministrazione civile nei docks carboniferi e commerciali di Tiger Bay a Cardiff.',
    s19: 'Cardiff consolida il ruolo amministrativo, portuale e manifatturiero del Galles meridionale nell\'età delle nazionalizzazioni laburiste.',
  },

  // === SCOZIA ===
  UKM65: {
    s9_11: 'La base navale di **Scapa Flow** ospita le corazzate *HMS King George V*, *Duke of York* e la Home Fleet impegnate a intercettare la *Tirpitz* e scortare i convogli artici (PQ/JW) per Murmansk.',
    s12_13: 'Completamento delle **Churchill Barriers** costruite dai prigionieri di guerra italiani del Campo 60 sulle isole Orientali (1943-44), che erigono anche la celebre **Italian Chapel** a Lamb Holm.',
    s14_15: 'Da Scapa Flow decollano i bombardamenti aeronavali dell\'operazione Tungsten (aprile 1944) e della Fleet Air Arm contro la *Tirpitz* nei fiordi norvegesi.',
    s16_17: 'Maggio 1945: apertura ufficiale delle **Churchill Barriers** al traffico stradale e fine della lunga caccia alle grandi unità navali tedesche.',
    s18: 'Graduale disarmo operativo della piazzaforte navale di Scapa Flow a fine ostilità; rimpatrio delle guarnigioni e dei prigionieri.',
    s19: 'Scapa Flow passa in riserva navale postbellica (verrà ridimensionata definitivamente nel decennio seguente) mentre le Orcadi valorizzano i nuovi collegamenti stradali delle Churchill Barriers.',
    hist14_15: 'Orkney Islands (Scapa Flow Home Fleet HQ & Completamento Churchill Barriers)',
    hist19: 'Orkney Islands (Scapa Flow in Riserva Postbellica & Eredità delle Churchill Barriers)',
  },
  UKM66: {
    s9_11: 'Le Shetland ospitano l\'aeroporto strategico di **Sullom Voe** e la base segreta SOE di **Lunna/Scalloway**: il leggendario **Shetland Bus** trasporta agenti, armi ed esuli da/per la Norvegia occupata.',
    s14_15: 'Grazie ai veloci cacciasommergibili americani ceduti alla resistenza norvegese (*Vigra*, *Hitra*, *Hessa*), il Shetland Bus compie decine di traversate invernali senza più alcuna perdita.',
    s18: 'Maggio 1945: trionfale rientro finale in Norvegia delle imbarcazioni dello Shetland Bus da Scalloway verso Bergen.',
    s19: 'Ripresa della pesca pelagica delle aringhe nelle Shetland e fine della militarizzazione strategica dell\'arcipelago.',
    hist19: 'Shetland Islands (Scalloway & Sullom Voe — Post-Shetland Bus & Rilancio Ittico)',
  },
  UKM72: {
    s12_13: 'L\'arsenale navale di **Rosyth (Fife)** ripara le navi di scorta artiche della Home Fleet e ospita i minisommergibili *X-Craft* contro la corazzata *Tirpitz*.',
    s18: 'Smobilitazione parziale di Rosyth; le miniere del Fife tornano al mercato carbonifero civile.',
    s19: 'Nazionalizzazione dei grandi bacini minerari del Fife sotto l\'NCB (1947, costruzione del moderno pozzo di Rothes) che porterà subito dopo alla creazione della New Town di Glenrothes.',
    hist19: 'Clackmannanshire & Fife (Rosyth Naval Base & Bacino Minerario del Fife NCB 1947)',
  },
  UKM75: {
    s14_15: 'Il porto di Leith e il Forth fungono da stazione di smistamento per navi scorta, dragamine e unità navali norvegesi/polacche.',
    s18: 'La capitale scozzese coordina con lo Scottish Office la transizione verso il piano industriale ed energetico delle Highlands (Hydro Board).',
    s19: 'Agosto-Settembre 1947: nasce la prima storica edizione dell\'**Edinburgh International Festival** per celebrare la rinascita culturale dell\'Europa postbellica!',
    hist19: 'City of Edinburgh (Scottish Office & Prima Edizione dell\'Edinburgh International Festival, Ago–Set 1947)',
  },
  UKM81: {
    s9_11: 'Ripresi dalla devastazione del Blitz 1941, i cantieri **John Brown & Co. di Clydebank** varano portaerei e impostano la corazzata più moderna della Royal Navy.',
    s16_17: '30 novembre 1944: la principessa Elisabetta vara a Clydebank la gigantesca **HMS Vanguard**, l\'ultima nave da battaglia britannica della storia.',
    s18: 'Allestimento finale dell\'HMS *Vanguard* (entrata in servizio nel maggio 1946) mentre il Clyde avvia la riconversione navale civile.',
    s19: 'I cantieri John Brown di Clydebank riconvertono transatlantici e varano grandi navi da carico refrigerate per i traffici imperiali e transatlantici.',
    hist16_17: 'Clydebank (Cantieri John Brown — Varo dell\'Ultima Corazzata HMS Vanguard, Nov 1944)',
    hist19: 'Clydebank (John Brown & Co. — Riconversione Transatlantica Postbellica)',
  },
  UKM82: {
    s9_11: 'Il Firth of Clyde ("Tail of the Bank") diviene il porto d\'approdo transatlantico più sicuro del Regno Unito: *Queen Mary* e *Queen Elizabeth* sbarcano intere divisioni USA.',
    s14_15: 'Massimo sforzo cantieristico, ferroviario e aeronautico (motori Merlin a Hillington Rolls-Royce) a sostegno dei fronti europei ed estremo-orientali.',
    s18: 'Ritorno delle grandi unità mercantili sul Clyde e vivaci rivendicazioni operaie per la piena occupazione e la ricostruzione delle abitazioni.',
    s19: 'Glasgow affronta il razionamento e il gelo del 1947 avviando il piano di decentramento metropolitano della Valle del Clyde e i primi sfoltimenti verso East Kilbride.',
    hist19: 'Glasgow City (Firth of Clyde — Riconversione Cantieristica & Piano Valle del Clyde 1947)',
  },
  UKM95: {
    s12_13: 'I grandi giacimenti e le acciaierie del Lanarkshire attorno a Motherwell, Coatbridge e Hamilton alimentano il picco della metallurgia scozzese.',
    s18: 'Il governo laburista programma la diversificazione industriale dello Scottish Lowlands al di fuori delle industrie pesanti tradizionali.',
    s19: '6 maggio 1947: **East Kilbride (South Lanarkshire)** è designata come **prima New Town della Scozia**, simbolo della pianificazione sociale postbellica!',
    hist19: 'South Lanarkshire (East Kilbride — Prima New Town Scozzese Designata Maggio 1947)',
  },

  // === IRLANDA DEL NORD ===
  UKN06: {
    s9_11: 'Belfast ricostruisce i bacini **Harland & Wolff** dopo l\'Easter Blitz 1941 e ospita massicce installazioni della US Navy e US Army dal 1942.',
    s12_13: 'Sotto il nuovo Primo Ministro unionista nordirlandese Sir Basil Brooke (da maggio 1943), i cantieri di Belfast varano incrociatori e portaerei (*HMS Campania*).',
    s14_15: 'I porti del Belfast Lough imbarcano grandi contingenti americani (incluse brigate destinate alle divisioni D-Day) trasferiti via Inghilterra meridionale.',
    s18: '1945: Harland & Wolff vanta oltre il 10% dell\'intera produzione navale bellica britannica e avvia la riconversione a grandi transatlantici civili Union-Castle.',
    s19: 'Stormont applica con adattamenti autonomi lo Stato Sociale dell\'NHS e della previdenza nell\'Irlanda del Nord sotto il governo laburista di Londra.',
    hist19: 'Belfast (Harland & Wolff & Stormont — Riconversione Cantieri & Welfare State in Ulster)',
  },
  UKN0A: {
    s9_11: 'Porto militare alleato (**HMS Ferret**): base avanzata nordatlantica condivisa da Royal Navy, RCN canadese e U.S. Navy (Base Londonderry) a scorta dei convogli occidentali.',
    s12_13: 'Nel pieno della Battaglia dell\'Atlantico (1943) il Foyle ospita decine di gruppi di scorta EG e fregate caccia-sommergibili.',
    s14_15: 'Fino alla chiusura operativa della base USA di Beechwood, Londonderry protegge la rotta atlantica vitale per l\'alimentazione di Overlord.',
    s18: '14–22 maggio 1945: storico arrivo a **Lisahally (Lough Foyle)** dei primi U-Boot tedeschi arresi scortati nella base di Londonderry al termine della guerra!',
    s19: 'Ridimensionamento della base navale di **HMS Sea Eagle (Derry)**, riconvertita nel dopoguerra in scuola congiunta antisommergibile dell\'Ammiragliato.',
    hist18: 'Derry City & Strabane (Lisahally / Lough Foyle — Storica Resa della Flotta U-Boot, Maggio 1945)',
    hist19: 'Derry City & Strabane (HMS Sea Eagle — Scuola Antisommergibile Postbellica)',
  },
  UKN0F: {
    s9_11: 'Dal porto di Larne-Stranraer e dalle caserme di Carrickfergus passa lo sbarco dei primi contingenti US Army (gennaio 1942) e nasce il primo **1st Ranger Battalion** USA.',
    s14_15: 'Transito verso la Gran Bretagna di truppe statunitensi per l\'Operazione Overlord e produzione di alluminio aeronautico British Aluminium a Larne.',
    s18: 'Smobilitazione delle basi americane dell\'Antrim e normalizzazione dei collegamenti traghetti Larne-Stranraer con la Scozia.',
    s19: 'Consolidamento industriale del corridoio Ballymena-Larne-Carrickfergus nell\'economia nordirlandese postbellica.',
  },
  UKN0G: {
    s9_11: 'Grazie al **Donegal Corridor** con l\'Irlanda neutrale, gli idrovolanti Sunderland e Catalina di **RAF Castle Archdale (Lough Erne)** proteggono instancabilmente il varco atlantico.',
    s14_15: 'Pattugliamento aereo continuo ad altissimo raggio contro gli U-Boot dotati di Schnorchel nella fase finale dell\'Atlantico.',
    s18: 'Cessazione dei voli di combattimento da Castle Archdale dopo la resa della flotta sottomarina tedesca nel maggio 1945.',
    s19: 'Progressivo disimpegno militare su Lough Erne (la stazione rimarrà solo ridotta fino alla chiusura negli anni Cinquanta) e ritorno rurale di Fermanagh/Tyrone.',
    hist19: 'Fermanagh & Omagh (Ex-Base Idrovolanti RAF Castle Archdale — Smobilitazione Postbellica)',
  },
};

function buildRegionalFallbackNote(meta: UKExtendableMeta, s: number): string {
  const nationLabel =
    meta.country === 'Scotland'
      ? 'Scozia'
      : meta.country === 'Wales'
      ? 'Galles'
      : meta.country === 'Northern Ireland'
      ? "Irlanda del Nord"
      : meta.historicCounty;

  if (s >= 19) {
    return `${meta.name} (${meta.capital}, ${nationLabel}): fase postbellica sotto il governo laburista Attlee (SET 1947). Il distretto affronta l'austerità del razionamento e il gelido inverno energetico 1946–47, accompagnando la nazionalizzazione del carbone (NCB 1° gen 1947) e dei trasporti, l'avvio del Welfare State (NHS Act 1946) e la riconversione civile delle industrie di guerra per l'export britannico.`;
  }
  if (s >= 18) {
    return `${meta.name} (${meta.capital}, ${nationLabel}): immediato dopoguerra dopo VE Day e VJ Day (SET 1945). Sotto il nuovo governo laburista di Clement Attlee (eletto il 26 luglio 1945), il territorio avvia la smobilitazione dei militari e delle opere di difesa civile, riconvertendo officine, ferrovie e terreni rurali all'economia di pace e alla ricostruzione sociale.`;
  }
  if (s >= 16) {
    return `${meta.name} (${meta.capital}, ${nationLabel}): inverno 1944–45 e vigilia della vittoria in Europa (DIC 1944 – APR 1945). Mentre gli Alleati avanzano oltre le Ardenne verso il Reno e l'Elba, il distretto sostiene il massimo sforzo finale di produzione, coscrizione e trasporto ferroviario bellico fino al crollo del Terzo Reich.`;
  }
  if (s >= 14) {
    return `${meta.name} (${meta.capital}, ${nationLabel}): estate di **Operazione Overlord** (GIU – AGO 1944). Il territorio partecipa alla colossale macchina logistica, addestrativa e produttiva britannico-statunitense di supporto allo sbarco in Normandia e alla liberazione della Francia, sotto protezione delle reti antiaeree e civili.`;
  }
  if (s >= 12) {
    return `${meta.name} (${meta.capital}, ${nationLabel}): anno decisivo 1943 (LUG – SET 1943). Con la vittoria alleata nella Battaglia dell'Atlantico e l'offensiva aerea combinata sul continente, il distretto intensifica mobilitazione produttiva, raccolta agricola obbligatoria (Women's Land Army) e logistica per gli eserciti destinati al fronte europeo.`;
  }
  return `${meta.name} (${meta.capital}, ${nationLabel}): guerra totale globale 1941–42 (DIC 1941 – NOV 1942). Dopo l'entrata in guerra degli USA e il National Service Act con coscrizione femminile estesa, l'economia locale si salda al flusso Lend-Lease e all'arrivo dei reparti americani (Operazione Bolero).`;
}

function resolveCrownDependencyLate(
  meta: UKExtendableMeta,
  s: number
): ResolvedTerritory {
  const id = meta.nuts.toUpperCase();

  if (id === 'GG') {
    if (s >= 19) {
      return makeUKRes(
        'UK',
        'Guernsey (Bailiwick of Guernsey — Ricostruzione Postbellica & Crown Dependency)',
        "Baliato autonomo della Corona Britannica nelle Isole del Canale (SET 1947). Completato il rimpatrio degli sfollati e degli scolari rientrati dall'Inghilterra nel 1945–46, Guernsey intraprende lo sminamento costiero dei bunker del Vallo Atlantico (Alderney/Guernsey), le riforme costituzionali degli Stati e la ripresa orticola. Bandiera: Union Flag (nessuna bandiera ufficiale autonoma con croce d'oro fino al 1985).",
        'Alleati',
        'Bailiwick of Guernsey (British Crown Dependency — Attlee Era Reconstruction)'
      );
    }
    if (s >= 18) {
      return makeUKRes(
        'UK',
        'Guernsey (Bailiwick of Guernsey — Liberata 9 Maggio 1945)',
        "9 maggio 1945 (Liberation Day): a bordo del cacciatorpediniere HMS Bulldog al largo di Saint Peter Port, le forze britanniche della Task Force 135 ricevono la resa della guarnigione tedesca, riportando il Baliato di Guernsey e Alderney sotto sovranità britannica dopo cinque anni d'occupazione nazista e il durissimo inverno di fame 1944–45. A settembre 1945 prosegue il disarmo dei bunker e il rientro degli sfollati.",
        'Alleati',
        'Bailiwick of Guernsey (British Crown Dependency — Task Force 135 Liberation)'
      );
    }
    if (s >= 14) {
      return makeUKRes(
        'GER',
        'Guernsey (Festung Guernsey — Assediata dopo D-Day)',
        "Dall'agosto 1944, liberata la Normandia dagli Alleati, Guernsey (Festung Guernsey) resta completamente isolata dal continente europeo: il 1944–45 segna il drammatico \"Starvation Winter\" per civili e guarnigione, mitigato solo dagli arrivi della nave della Croce Rossa SS Vega da dicembre 1944; resisterà fino alla resa del 9 maggio 1945.",
        'Asse',
        'Befehlshaber der Kanalinseln (Deutsche Wehrmacht / Festung Guernsey Assediata)'
      );
    }
    return makeUKRes(
      'GER',
      'Guernsey (Deutsche Dienststelle / Festung Guernsey)',
      "Nel periodo 1941–44 la Wehrmacht e l'Organisation Todt completano imponenti fortificazioni costiere dell'Atlantikwall su Guernsey e i lager SS Norderney e Sylt ad Alderney, con deportazioni di residenti nati in Gran Bretagna verso la Germania nel settembre 1942.",
      'Asse',
      'Militärverwaltung in Frankreich (Deutsche Wehrmacht / Festung Channel Islands)'
    );
  }

  if (id === 'JE') {
    if (s >= 19) {
      return makeUKRes(
        'UK',
        'Jersey (Bailiwick of Jersey — Riforma Costituzionale & Crown Dependency)',
        "Baliato autonomo della Corona Britannica (SET 1947). Sotto gli Stati di Jersey si prepara la profonda modernizzazione parlamentare (Assembly Reforms 1947–48) dopo l'occupazione bellica, bonificando i tunnel ospedalieri e le batterie dell'Atlantikwall e rilanciando agricoltura e turismo. Bandiera: Union Flag fino alla legge araldica locale del 1979–81.",
        'Alleati',
        'Bailiwick of Jersey (British Crown Dependency — Post-War Constitutional Reform)'
      );
    }
    if (s >= 18) {
      return makeUKRes(
        'UK',
        'Jersey (Bailiwick of Jersey — Liberata 9 Maggio 1945)',
        "9 maggio 1945: al Pomme d'Or Hotel di Saint Helier viene issata nuovamente la Union Jack tra l'esultanza popolare dopo la resa della guarnigione tedesca di Festung Jersey (Admiral Hüffmeier) al comando britannico; termina l'unica occupazione tedesca di suolo della Corona britannica nella WWII.",
        'Alleati',
        'Bailiwick of Jersey (British Crown Dependency — Liberation Day 9 May 1945)'
      );
    }
    if (s >= 14) {
      return makeUKRes(
        'GER',
        'Jersey (Festung Jersey — Blocco Navale & Starvation Winter)',
        "Isolata dal continente dopo la caduta di Saint-Malo e della Normandia (agosto 1944), l'isola di Jersey vive razionamenti estremi nell'inverno 1944–45 e tagli di elettricità e carbone, sostenuta da cinque viaggi umanitari della SS Vega fino al 9 maggio 1945.",
        'Asse',
        'Befehlshaber der Kanalinseln (Deutsche Wehrmacht / Festung Jersey Assediata)'
      );
    }
    return makeUKRes(
      'GER',
      'Jersey (Deutsche Wehrmacht Kommandantur / Festung Jersey)',
      "1941–1944: la fortezza di Jersey è irrobustita con tunnel sotterranei scavati a St Lawrence (Hohlgangsanlage 8) e gigantesche torri telemetriche della Kriegsmarine, mentre il Baliato subisce deportazioni in Germania nel 1942–43 e la confisca delle radio.",
      'Asse',
      'Militärverwaltung in Frankreich (Deutsche Wehrmacht / Festung Channel Islands)'
    );
  }

  // IM: Isle of Man
  if (s >= 19) {
    return makeUKRes(
      'UK',
      'Isle of Man (Tynwald — Executive Council & Ritorno del Tourist Trophy 1947)',
      "Dipendenza della Corona Britannica (SET 1947). Nell'ottobre 1946–1947 prende forma il rinnovato Executive Council del Tynwald; nel giugno 1947 si corrono per la prima volta dal 1939 gli storici Isle of Man TT motociclistici, sancendo il pieno ritorno alla pace e al turismo nel Mare d'Irlanda.",
      'Alleati',
      'Crown Dependency of the Isle of Man (Tynwald Post-War Reform)'
    );
  }
  if (s >= 18) {
    return makeUKRes(
      'UK',
      'Isle of Man (Smobilitazione Postbellica — Crown Dependency)',
      "Settembre 1945: chiusura definitiva dei grandi campi d'internamento di Douglas (Hutchinson/Onchan), Ramsey (Mooragh) e Port Erin; rientro dei marinai della Manx Steam Packet Company e smobilitazione della base navale HMS St George.",
      'Alleati',
      'Crown Dependency of the Isle of Man'
    );
  }
  return makeUKRes(
    'UK',
    meta.historicalName,
    "1941–1945: progressivo svuotamento dei campi d'internamento civili di Douglas e Ramsey e riconversione parziale in campi prigionieri di guerra; le stazioni RAF Jurby e RAF Andreas e HMS St George addestrano migliaia di navigatori ed equipaggi per la battaglia finale in Europa.",
    'Alleati',
    'Crown Dependency of the Isle of Man'
  );
}

/**
 * Risolve una provincia britannica (o Crown Dependency) negli step tardi della timeline (s >= 9).
 * Restituisce `null` per s < 9 lasciando intatto il resolver storico 1936–1941.
 */
export function resolveUKExtendedStep(
  meta: UKExtendableMeta,
  s: number
): ResolvedTerritory | null {
  if (s < 9) return null;

  if (meta.country === 'Crown Dependency') {
    return resolveCrownDependencyLate(meta, s);
  }

  const ov = UK_DISTRICT_OVERRIDES[meta.nuts];
  let note: string;
  if (ov) {
    if (s >= 19 && ov.s19) note = ov.s19;
    else if (s >= 18 && ov.s18) note = ov.s18;
    else if (s >= 16 && ov.s16_17) note = ov.s16_17;
    else if (s >= 14 && ov.s14_15) note = ov.s14_15;
    else if (s >= 12 && ov.s12_13) note = ov.s12_13;
    else if (s >= 9 && ov.s9_11) note = ov.s9_11;
    else note = buildRegionalFallbackNote(meta, s);
  } else {
    note = buildRegionalFallbackNote(meta, s);
  }

  let histName = meta.historicalName;
  if (s >= 19 && ov?.hist19) histName = ov.hist19;
  else if (s >= 18 && ov?.hist18) histName = ov.hist18;
  else if (s >= 16 && ov?.hist16_17) histName = ov.hist16_17;
  else if (s >= 14 && ov?.hist14_15) histName = ov.hist14_15;
  else if (s >= 12 && ov?.hist12_13) histName = ov.hist12_13;
  else if (s >= 19) {
    histName = `${meta.name} (${meta.historicCounty} — Era Attlee 1947)`;
  }

  return makeUKRes(
    'UK',
    histName,
    note,
    'Alleati',
    getUKAdminTitle(meta.country, s)
  );
}
