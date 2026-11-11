/**
 * Censimento Geocartografico e Toponomastico di Precisione di Cipro (1936-1945)
 * Copertura esaustiva e rigorosa delle 11 entità territoriali di Cipro:
 * - 2 Basi Sovrane Britanniche: Akrotiri (UK_AKROTIRI) e Dhekelia (UK_DHEKELIA)
 * - 1 Fascia Centrale: Buffer Zone ONU / Corridoio della Mesaoria (CY_UN_BUFFER)
 * - 3 Distretti Settentrionali (futura TRNC): Kyrenia (CY_KYRENIA), Nicosia Nord (CY_NICOSIA_N), Famagosta Nord (CY_FAMAGUSTA_N)
 * - 5 Distretti Meridionali (Repubblica di Cipro): Nicosia Sud (CY_NICOSIA_S), Famagosta Sud (CY_FAMAGUSTA_S), Larnaca (CY_LARNACA), Limassol (CY_LIMASSOL), Paphos (CY_PAPHOS)
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

export interface CyprusProvinceDossier {
  id: string;
  modernName: string;
  districtName: string;
  getHistoricalName: (s: number) => string;
  getAdminTitle: (s: number) => string;
  getNote: (s: number) => string;
}

export const CYPRUS_PROVINCES_META: Record<string, CyprusProvinceDossier> = {
  UK_AKROTIRI: {
    id: 'UK_AKROTIRI',
    modernName: 'Akrotiri Sovereign Base Area (Episkopi & RAF Akrotiri)',
    districtName: 'Akrotiri SBA',
    getHistoricalName: (s: number) => {
      if (s < 5) return 'Akrotiri (Presidio Navale e Idrovolanti della Royal Navy)';
      if (s <= 7) return 'Akrotiri (Stazione d\'Allerta Antisommergibile della Mediterranean Fleet)';
      if (s <= 9) return 'Akrotiri (Roccaforte Aeronavale del Levante — Operazione Exporter)';
      if (s <= 12) return 'Akrotiri (Cardine Difensivo del Canale di Suez & Radar di Capo Gata)';
      if (s === 13) return 'Akrotiri (Testa di Ponte per la Campagna del Dodecaneso)';
      if (s <= 17) return 'Akrotiri (Base Aeronavale di Riorganizzazione dell\'Egeo Liberato)';
      return 'Akrotiri (Presidio Sovrano dell\'Impero Britannico nel Levante)';
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return 'Crown Colony of Cyprus — Akrotiri Sovereign Base Area (Royal Navy Anchorage)';
      if (s <= 17) return 'British Armed Forces in the Mediterranean — Akrotiri & Episkopi Garrison';
      return 'Crown Colony of Cyprus — British Sovereign Base Area (WSBA Akrotiri & Episkopi)';
    },
    getNote: (s: number) => {
      if (s < 5) {
        return "Presidio strategico aeronavale e rada d'ancoraggio ausiliaria della Royal Navy nella penisola di Capo Gata e presso il lago salato; punto di vedetta e monitoraggio marittimo a salvaguardia delle rotte d'accesso orientali al Canale di Suez.";
      }
      if (s <= 7) {
        return "Con l'entrata in guerra dell'Italia (giugno 1940) e le incursioni della Regia Aeronautica dal Dodecaneso, il promontorio di Akrotiri e le scogliere di Capo Zevgari vengono presidiate da batterie d'artiglieria costiera e idrovolanti da ricognizione marittima.";
      }
      if (s <= 9) {
        return "Dopo la caduta di Creta (maggio 1941), Akrotiri viene fortificata d'urgenza contro possibili aviosbarchi tedeschi; funge da base d'appoggio per le squadriglie della RAF e le navi da guerra impiegate nell'Operazione Exporter per liberare Siria e Libano dal controllo di Vichy.";
      }
      if (s <= 12) {
        return "Durante la crisi di El Alamein e l'avanzata di Rommel in Egitto (1942), la base di Akrotiri costituisce il baluardo settentrionale a difesa del delta del Nilo, garantendo la scorta aeronavale ai convogli di rifornimento nel Levante.";
      }
      if (s === 13) {
        return "Settembre 1943: a seguito dell'armistizio di Cassibile, Akrotiri e la rada di Episkopi fungono da primaria base di partenza e rifornimento per i cacciatorpediniere britannici e le unità speciali (SBS, LRDG) lanciate nell'offensiva del Dodecaneso contro Kos, Leros e Samos.";
      }
      if (s <= 17) {
        return "Base di pattugliamento avanzato della Mediterranean Fleet per bonificare i campi minati nell'Egeo e intercettare le imbarcazioni della Wehrmacht in ritirata dalla Grecia continentale.";
      }
      return "Settembre 1945: definitiva affermazione del ruolo militare strategico di Akrotiri ed Episkopi come enclave sovrana permanente della Corona britannica (futura Western Sovereign Base Area istituita nel 1960).";
    },
  },

  UK_DHEKELIA: {
    id: 'UK_DHEKELIA',
    modernName: 'Dhekelia Sovereign Base Area (Ayios Nikolaos & Dhekelia Cantonment)',
    districtName: 'Dhekelia SBA',
    getHistoricalName: (s: number) => {
      if (s < 5) return 'Dhekelia (Accampamento Militare Coloniale & Baia di Larnaca)';
      if (s <= 7) return 'Dhekelia (Stazione Segnali di Ayios Nikolaos & Difesa Costiera)';
      if (s <= 9) return 'Dhekelia (Linea Trincerata Orientale & Staging per la Siria)';
      if (s <= 12) return 'Dhekelia (Centro d\'Intercettazione Radio e Decrittazione del Levante)';
      if (s === 13) return 'Dhekelia (Supporto Logistico all\'Offensiva nel Dodecaneso)';
      if (s <= 17) return 'Dhekelia (Centro Addestramento e Smistamento Forze Imperiali)';
      return 'Dhekelia (Base Sovrana di Telecomunicazioni e Presidio Permanente)';
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return 'Crown Colony of Cyprus — Dhekelia Military Cantonment';
      if (s <= 17) return 'British Army Headquarters Cyprus — Dhekelia & Ayios Nikolaos Garrison';
      return 'Crown Colony of Cyprus — British Sovereign Base Area (ESBA Dhekelia & Ayios Nikolaos)';
    },
    getNote: (s: number) => {
      if (s < 5) {
        return "Vasto accampamento militare dell'esercito britannico (Dhekelia Cantonment) e centro nevralgico delle telecomunicazioni imperiali telegrafiche verso il Mandato di Palestina e l'Egitto.";
      }
      if (s <= 7) {
        return "Militarizzazione del perimetro costiero della baia di Larnaca con bunker e batterie antinave campali; la stazione radio di Ayios Nikolaos avvia l'ascolto sistematico del traffico marittimo e aereo italo-tedesco nel Levante.";
      }
      if (s <= 9) {
        return "Primavera-estate 1941: posa di linee trincerate e campi minati sulla costa contro sbarchi anfibi nemici; la base funge da concentramento logistico per i reggimenti di fanteria britannici destinati all'invasione della Siria di Vichy.";
      }
      if (s <= 12) {
        return "La stazione d'ascolto elettronico di Ayios Nikolaos opera in collegamento con i centri di decrittazione Ultra, fornendo segnalazioni tempestive sui convogli nemici diretti a Tobruk e Bengasi.";
      }
      if (s === 13) {
        return "Autunno 1943: Dhekelia supporta i commando britannici impegnati nella drammatica battaglia di Leros e Kos, garantendo le trasmissioni radio cifrate e il rimpiazzo di materiali d'armamento.";
      }
      if (s <= 17) {
        return "Campo d'istruzione avanzata e smistamento truppe del Commonwealth (compresi reparti indiani e ciprioti) destinate al fronte italiano e alle operazioni nei Balcani meridionali.";
      }
      return "Settembre 1945: consolidamento definitivo della Sovereign Base Area orientale (ESBA Dhekelia) come roccaforte di telecomunicazioni, intelligence elettronica e presidio militare permanente britannico.";
    },
  },

  CY_UN_BUFFER: {
    id: 'CY_UN_BUFFER',
    modernName: 'Zona Cuscinetto ONU / UNFICYP (Piana della Mesaoria & Nicosia)',
    districtName: 'Mesaoria / Linea Verde',
    getHistoricalName: (s: number) => {
      if (s < 5) return 'Cipro Centrale (Piana della Mesaoria & Corridoio di Nicosia)';
      if (s <= 7) return 'Cipro Centrale (Mobilitazione Rurale del Cyprus Regiment)';
      if (s <= 9) return 'Cipro Centrale (Linea Difensiva Campale Anti-Paracadutisti)';
      if (s <= 12) return 'Cipro Centrale (Granaio di Guerra e Snodo Logistico della Mesaoria)';
      if (s === 13) return 'Cipro Centrale (Corridoio Ferroviario dei Rifornimenti dell\'Egeo)';
      if (s <= 17) return 'Cipro Centrale (Allentamento della Censura & Riorganizzazione Politica)';
      return 'Cipro Centrale (Ritorno dei Reduci del Cyprus Regiment & Dopoguerra)';
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return 'Crown Colony of Cyprus — Mesaoria Central Agricultural Corridor';
      if (s <= 17) return 'Crown Colony of Cyprus — Mesaoria & Nicosia Central Defence Sector';
      return 'Crown Colony of Cyprus — Mesaoria Central District (Futura Green Line / UNFICYP)';
    },
    getNote: (s: number) => {
      if (s < 5) {
        return "Fascia pianeggiante centrale della fertile piana della Mesaoria, asse viario e ferroviario di collegamento tra Nicosia e la costa orientale; sottoposta al ferreo controllo della Palmerocrazia dopo i moti filo-ellenici del 1931.";
      }
      if (s <= 7) {
        return "Migliaia di contadini greco-ciprioti e turco-ciprioti della piana si arruolano volontari nel neocostituito Cyprus Regiment, formando le celebri compagnie someggiate (Pack Transport) che si distingueranno per coraggio e resistenza fisica su tutti i fronti.";
      }
      if (s <= 9) {
        return "Maggio-agosto 1941: a seguito dell'aviosbarco tedesco a Creta (Unternehmen Merkur), la piana della Mesaoria viene disseminata di fossati anticarro, tralicci e ostacoli antialianti per impedire atterraggi di paracadutisti nemici a ridosso di Nicosia.";
      }
      if (s <= 12) {
        return "La Mesaoria opera a pieno regime come bacino di produzione granaria d'emergenza per sostenere le truppe alleate schierate nel Levante durante la battaglia d'arresto di El Alamein.";
      }
      if (s === 13) {
        return "Settembre 1943: la linea ferroviaria statale di Cipro (Cyprus Government Railway) che attraversa la Mesaoria trasporta giorno e notte tonnellate di proiettili d'artiglieria e munizionamento pesante verso i moli d'imbarco orientali.";
      }
      if (s <= 17) {
        return "I comitati rurali e le leghe contadine ottengono il ripristino di assemblee locali; prime mobilitazioni civili congiunte di lavoratori greci e turchi.";
      }
      return "Settembre 1945: rientro solenne dei soldati del Cyprus Regiment dai campi di battaglia d'Europa; la piana centrale rimane il cardine geografico ed economico dell'isola, su cui decenni dopo (1964-1974) si consoliderà la Zona Cuscinetto delle Nazioni Unite (UNFICYP Green Line).";
    },
  },

  CY_KYRENIA: {
    id: 'CY_KYRENIA',
    modernName: 'Kyrenia (Girne / Monti Pentadaktylos)',
    districtName: 'Kyrenia',
    getHistoricalName: (s: number) => {
      if (s < 5) return 'Kyrenia (Porto Storico & Castello del Pentadaktylos)';
      if (s <= 7) return 'Kyrenia (Vedetta Antiaerea sui Monti di Kyrenia)';
      if (s <= 9) return 'Kyrenia (Presidio Settentrionale & Supporto Operazione Exporter)';
      if (s <= 12) return 'Kyrenia (Base Clandestina del SOE & Caicchi per l\'Egeo Occupato)';
      if (s === 13) return 'Kyrenia (Trampolino per le Incursioni nel Dodecaneso)';
      if (s <= 17) return 'Kyrenia (Pattugliamento delle Acque Costiere dell\'Anatolia)';
      return 'Kyrenia (Girne — Riapertura dei Traffici Marittimi Costieri)';
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return 'Crown Colony of Cyprus — District of Kyrenia (Commissioner of Kyrenia)';
      if (s <= 17) return 'Crown Colony of Cyprus — Kyrenia Coastal & Mountain Defence Sector';
      return 'Crown Colony of Cyprus — District of Kyrenia (Futuro Settore TRNC / Girne)';
    },
    getNote: (s: number) => {
      if (s < 5) {
        return "Distretto settentrionale dominato dalla catena montuosa del Pentadaktylos e dall'antico porto fortificato di Kyrenia; sottoposto alle ordinanze restrittive del governatore Sir Richmond Palmer.";
      }
      if (s <= 7) {
        return "Postazioni di vedetta ottica sui castelli medievali di Sant'Ilario e Buffavento sorvegliano lo spazio aereo verso l'Anatolia e segnalano i bombardieri italiani decollati dalle basi di Rodi e Leros.";
      }
      if (s <= 9) {
        return "Giugno 1941: il piccolo porto di Kyrenia funge da base avanzata per motolance armate della Royal Navy impegnate nelle operazioni di blocco navale e sbarco in Siria e Libano contro il regime di Vichy.";
      }
      if (s <= 12) {
        return "Dal porto di Kyrenia salpano imbarcazioni clandestine (caicchi a vela) del SOE e dell'MI9 per infiltrare agenti, armi e apparecchi radio nella Grecia continentale e nelle isole dell'Egeo occupate dall'Asse.";
      }
      if (s === 13) {
        return "Autunno 1943: Kyrenia costituisce una delle teste di ponte settentrionali per i raid notturni dei commandos britannici dello Special Boat Squadron (SBS) verso Castelrosso e le Sporadi meridionali.";
      }
      if (s <= 17) {
        return "Sorveglianza delle acque territoriali antistanti la Turchia e intercettazione del traffico marittimo tedesco in ritirata verso il Pireo e Salonicco.";
      }
      return "Settembre 1945: fine dell'oscuramento bellico e ripristino delle rotte commerciali tradizionali; distretto settentrionale che in futuro costituirà il cuore della Repubblica Turca di Cipro del Nord.";
    },
  },

  CY_NICOSIA_N: {
    id: 'CY_NICOSIA_N',
    modernName: 'Nicosia Nord (Lefkoşa, Conca di Morphou & Enclave di Kokkina)',
    districtName: 'Nicosia Nord',
    getHistoricalName: (s: number) => {
      if (s < 5) return 'Nicosia Nord (Lefkoşa & Conca Agrumicola di Morphou)';
      if (s <= 7) return 'Nicosia Nord (Miniere di Rame CMC & Imbarco di Karavostasi)';
      if (s <= 9) return 'Nicosia Nord (Piste Aeree da Caccia della RAF a Morphou)';
      if (s <= 12) return 'Nicosia Nord (Estrazione Intensiva di Piriti e Rame di Skouriotissa)';
      if (s === 13) return 'Nicosia Nord (Allerta Strategica per le Operazioni nell\'Egeo)';
      if (s <= 17) return 'Nicosia Nord (Mobilitazione Sindacale Operaia a Morphou & Lefkoşa)';
      return 'Nicosia Nord (Lefkoşa & Morphou — Riconversione Civile Postbellica)';
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return 'Crown Colony of Cyprus — District of Nicosia (Northern & Morphou Sector)';
      if (s <= 17) return 'Crown Colony of Cyprus — Northern Nicosia & CMC Mining Defence Command';
      return 'Crown Colony of Cyprus — District of Nicosia North (Futuro Settore TRNC / Lefkoşa)';
    },
    getNote: (s: number) => {
      if (s < 5) {
        return "Vasto settore a nord delle mura veneziane comprendente la fertile piana agrumicola di Morphou (Güzelyurt), i giacimenti minerari della Cyprus Mines Corporation (CMC) a Skouriotissa e l'avamposto costiero di Kokkina (Erenköy).";
      }
      if (s <= 7) {
        return "Con l'entrata in guerra, i giacimenti di rame e piriti di Skouriotissa e Mavrovouni lavorano a pieno ritmo per fornire metalli strategici alle fabbriche d'armamenti britanniche, caricati sui mercantili al pontile di Karavostasi/Xeros.";
      }
      if (s <= 9) {
        return "Maggio 1941: allestimento di piste d'atterraggio d'emergenza della RAF nella piana di Morphou per i caccia Hurricane incaricati di difendere il cielo di Cipro contro i bombardieri della Luftwaffe.";
      }
      if (s <= 12) {
        return "Produzione mineraria strategica record; impiego di migliaia di minatori greco-ciprioti e turco-ciprioti che lavorano gomito a gomito nelle gallerie della CMC a sostegno dello sforzo bellico alleato.";
      }
      if (s === 13) {
        return "Settembre 1943: le stazioni d'avvistamento costiero del golfo di Morphou e Kokkina operano in stato d'allarme durante la battaglia aeronavale per il Dodecaneso.";
      }
      if (s <= 17) {
        return "Nascita delle prime grandi organizzazioni sindacali interetniche a Morphou e Lefkoşa, con storici scioperi congiunti per l'aumento delle paghe operaie e l'assistenza medica ai lavoratori.";
      }
      return "Settembre 1945: conclusione della Seconda Guerra Mondiale; rilancio delle esportazioni agrumicole di Morphou e ripresa del lavoro civile nella capitale e nelle miniere.";
    },
  },

  CY_FAMAGUSTA_N: {
    id: 'CY_FAMAGUSTA_N',
    modernName: 'Famagosta Nord (Gazimağusa, Salamina & Penisola di Karpass)',
    districtName: 'Famagusta Nord',
    getHistoricalName: (s: number) => {
      if (s < 5) return 'Famagosta Nord (Scalo Marittimo d\'Altura & Penisola di Karpass)';
      if (s <= 7) return 'Famagosta Nord (Raid dei Bombardieri della Regia Aeronautica)';
      if (s <= 9) return 'Famagosta Nord (Porto d\'Imbarco per l\'Invasione Alleata della Siria)';
      if (s <= 12) return 'Famagosta Nord (Faro di Capo Sant\'Andrea & Sorveglianza Levantina)';
      if (s === 13) return 'Famagosta Nord (Base d\'Attacco Navale per la Presa di Leros e Kos)';
      if (s <= 17) return 'Famagosta Nord (Polo di Riparazione Navale e Rifornimento Alleato)';
      return 'Famagosta Nord (Gazimağusa — Ritorno alla Prosperità Portuale)';
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return 'Crown Colony of Cyprus — District of Famagusta (Northern & Karpass Sector)';
      if (s <= 17) return 'Crown Colony of Cyprus — Royal Navy Naval Base Famagusta & Karpass Command';
      return 'Crown Colony of Cyprus — District of Famagusta North (Futuro Settore TRNC / Gazimağusa)';
    },
    getNote: (s: number) => {
      if (s < 5) {
        return "Principale porto d'altura e scalo ferroviario della colonia britannica, dominato dalle imponenti mura veneziane (Torre di Otello), dalle rovine classiche di Salamina e dalla penisola di Karpass.";
      }
      if (s <= 7) {
        return "Luglio-ottobre 1940: il porto di Famagosta e le banchine ferroviarie subiscono pesanti bombardamenti aerei da parte degli SM.79 della Regia Aeronautica decollati da Rodi; installazione di robuste batterie contraeree Bofors da 40 mm.";
      }
      if (s <= 9) {
        return "Giugno 1941: Famagosta è il principale scalo marittimo da cui salpano le truppe d'assalto australiane e della Francia Libera scortate dalla Royal Navy per l'Operazione Exporter contro le truppe fedeli a Vichy in Siria.";
      }
      if (s <= 12) {
        return "All'estremità della penisola di Karpass, il faro e la stazione radiogoniometrica di Capo Sant'Andrea sorvegliano il golfo di Alessandretta, impedendo a navi corsare nemiche di minacciare i porti petroliferi del Levante.";
      }
      if (s === 13) {
        return "Settembre-novembre 1943: Famagosta è la base marittima avanzata dei cacciatorpediniere britannici (HMS Faulknor, HMS Eclipse, HMS Hurworth) impegnati nella sanguinosa Campagna del Dodecaneso.";
      }
      if (s <= 17) {
        return "I cantieri di Famagosta lavorano senza sosta alla riparazione di navi da trasporto e dragamine impegnati nelle operazioni di liberazione delle isole greche.";
      }
      return "Settembre 1945: cessazione delle ostilità mondiali e riapertura delle banchine ai traffici mercantili civili mediterranei; solenne celebrazione per la vittoria alleata all'ombra delle mura veneziane.";
    },
  },

  CY_NICOSIA_S: {
    id: 'CY_NICOSIA_S',
    modernName: 'Nicosia Sud (Lefkosia, Sede Governatorato & Troodos Orientale)',
    districtName: 'Nicosia Sud',
    getHistoricalName: (s: number) => {
      if (s < 5) return 'Nicosia Sud (Government House & Sede del Governatorato Coloniale)';
      if (s <= 7) return 'Nicosia Sud (Quartier Generale Militare & Allestimento Rifugi)';
      if (s <= 9) return 'Nicosia Sud (Comando Difesa Cipro & Base Aerea RAF Nicosia)';
      if (s <= 12) return 'Nicosia Sud (Centro di Coordinamento Strategico per il Vicino Oriente)';
      if (s === 13) return 'Nicosia Sud (Stato Maggiore per le Operazioni nel Dodecaneso)';
      if (s <= 17) return 'Nicosia Sud (Prime Elezioni Municipali & Riforme di Sir Charles Woolley)';
      return 'Nicosia Sud (Lefkosia — Celebrazione della Vittoria & Prospettive Nazionali)';
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return 'Crown Colony of Cyprus — Government House Nicosia (Sir Richmond Palmer)';
      if (s <= 17) return 'British Middle East Command — Cyprus District HQ (Government House)';
      return 'Crown Colony of Cyprus — District of Nicosia South (Capitale della Repubblica di Cipro)';
    },
    getNote: (s: number) => {
      if (s < 5) {
        return "Centro politico dell'isola a Government House; il governatore Sir Richmond Palmer esercita un rigido regime autoritario (Palmerocrazia) con assemblea legislativa sospesa e ferrea censura a seguito della rivolta dell'ottobre 1931.";
      }
      if (s <= 7) {
        return "Con lo scoppio delle ostilità, a Nicosia viene istituito il Quartier Generale delle Forze Armate; costruzione di trincee paraschegge attorno alle mura storiche e allestimento dei rifugi sotterranei per la popolazione civile.";
      }
      if (s <= 9) {
        return "Primavera 1941: il Generale Sir Henry Maitland Wilson insedia a Nicosia il comando unificato delle forze imperiali; espansione imponente della base aerea di RAF Nicosia, presidiata da squadriglie di Hurricane per la difesa aerea dell'isola.";
      }
      if (s <= 12) {
        return "Nicosia ospita gli ufficiali di collegamento delle forze greche in esilio, della Francia Libera e dei servizi segreti britannici (MI6/SOE) che coordinano la rete clandestina nel Mediterraneo orientale.";
      }
      if (s === 13) {
        return "Settembre 1943: Government House è in costante contatto con Il Cairo e Churchill per pianificare le missioni aeree e marittime verso Kos, Leros e Samos dopo l'armistizio di Cassibile.";
      }
      if (s <= 17) {
        return "Il nuovo governatore Sir Charles Woolley avvia riforme distensive: riapertura delle elezioni municipali, legalizzazione del partito AKEL e concessione di maggiori libertà civili ai cittadini ciprioti.";
      }
      return "Settembre 1945: conclusione della guerra; Nicosia celebra la vittoria con solenni parate del Cyprus Regiment; ripresa aperta e vibrante delle aspirazioni greche per l'Enosis e della comunità turco-cipriota per la salvaguardia dei propri diritti.";
    },
  },

  CY_FAMAGUSTA_S: {
    id: 'CY_FAMAGUSTA_S',
    modernName: 'Famagosta Sud (Paralimni, Ayia Napa & Capo Greco)',
    districtName: 'Famagusta Sud',
    getHistoricalName: (s: number) => {
      if (s < 5) return 'Famagosta Sud (Comunità Costiera di Paralimni & Ayia Napa)';
      if (s <= 7) return 'Famagosta Sud (Postazione d\'Avvistamento Ottico di Capo Greco)';
      if (s <= 9) return 'Famagosta Sud (Fortificazioni Campali sulle Baie di Ayia Napa)';
      if (s <= 12) return 'Famagosta Sud (Pattugliamento Antisommergibile del Litorale)';
      if (s === 13) return 'Famagosta Sud (Ridosso Temporaneo per le Motosiluranti Alleate)';
      if (s <= 17) return 'Famagosta Sud (Rifornimento Agricolo dei Presidi Militari)';
      return 'Famagosta Sud (Paralimni — Ripresa dell\'Agricoltura e della Pesca)';
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return 'Crown Colony of Cyprus — District of Famagusta (Southern Rural Sector)';
      if (s <= 17) return 'Crown Colony of Cyprus — Cape Greco Coastal Watch & Paralimni Sector';
      return 'Crown Colony of Cyprus — District of Famagusta South (Futuro Settore Famagosta Libera)';
    },
    getNote: (s: number) => {
      if (s < 5) {
        return "Promontorio sud-orientale dell'isola compreso tra Capo Greco, le comunità rurali di Paralimni e Deryneia e il villaggio peschereccio attorno al monastero veneziano di Ayia Napa.";
      }
      if (s <= 7) {
        return "Il faro e le scogliere a picco di Capo Greco ospitano vedette ottiche della Royal Navy che sorvegliano il mare aperto verso Beirut e Haifa per segnalare la rotta di aerei o unità di superficie nemiche.";
      }
      if (s <= 9) {
        return "Maggio 1941: stesura di reticolati difensivi sulle calette sabbiose di Ayia Napa e Protaras per scongiurare colpi di mano o infiltrazioni di incursori della Xª Flottiglia MAS o incursori tedeschi.";
      }
      if (s <= 12) {
        return "Monitoraggio continuo delle acque costiere per prevenire attacchi di sommergibili nemici contro i piccoli convogli di cabotaggio diretti ai porti egiziani.";
      }
      if (s === 13) {
        return "Le baie riparate di Capo Greco offrono ancoraggio notturno d'emergenza alle motosiluranti (MTB) della Royal Navy impiegate nelle operazioni nel Dodecaneso.";
      }
      if (s <= 17) {
        return "Le cooperative agricole di Paralimni incrementano la produzione delle celebri patate rosse per sostenere le razioni alimentari delle guarnigioni militari dell'isola.";
      }
      return "Settembre 1945: smantellamento delle difese litoranee; ritorno della pace costiera nel settore che decenni più tardi costituirà la zona di Famagosta Libera della Repubblica di Cipro.";
    },
  },

  CY_LARNACA: {
    id: 'CY_LARNACA',
    modernName: 'Larnaca (Larnaka Port, Saline & Enclave di Ormidhia/Xylotymbou)',
    districtName: 'Larnaca',
    getHistoricalName: (s: number) => {
      if (s < 5) return 'Larnaca (Scalo Mercantile Consolare & Lago Salato di Kition)';
      if (s <= 7) return 'Larnaca (Incursioni della Regia Aeronautica sui Depositi di Nafta)';
      if (s <= 9) return 'Larnaca (Rada d\'Ancoraggio per l\'Invasione di Siria e Libano)';
      if (s <= 12) return 'Larnaca (Scorta ai Convogli Petroliferi del Canale di Suez)';
      if (s === 13) return 'Larnaca (Ospedale Militare e Smistamento Feriti dell\'Egeo)';
      if (s <= 17) return 'Larnaca (Riapertura delle Linee Mercantili con Egitto e Levante)';
      return 'Larnaca (Larnaka — Riconversione Civile e Riconsegna dei Moli)';
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return 'Crown Colony of Cyprus — District of Larnaca (Commissioner of Larnaca)';
      if (s <= 17) return 'Crown Colony of Cyprus — Larnaca Port & Oil Depot Defence Sector';
      return 'Crown Colony of Cyprus — District of Larnaca (Repubblica di Cipro)';
    },
    getNote: (s: number) => {
      if (s < 5) {
        return "Antico porto consolare e polo mercantile della costa meridionale, rinomato per le saline e la moschea di Hala Sultan Tekke; punto di transito commerciale con l'Egitto e la Siria.";
      }
      if (s <= 7) {
        return "Estate-autunno 1940: i bombardieri italiani SM.79 attaccano a più riprese i serbatoi di nafta e i moli commerciali di Larnaca; rischieramento di cannoni contraerei e reti parasiluro all'imbocco della rada.";
      }
      if (s <= 9) {
        return "Giugno 1941: la rada protetta di Larnaca accoglie navi da guerra e dragamine della Royal Navy e della Royal Australian Navy a supporto dell'offensiva alleata in Siria contro le forze di Vichy.";
      }
      if (s <= 12) {
        return "Punto di sosta obbligato per le navi cisterna che trasportano petrolio raffinato da Haifa verso le stazioni navali di Malta e Alessandria.";
      }
      if (s === 13) {
        return "Autunno 1943: le strutture ospedaliere civili e militari di Larnaca vengono mobilitate per curare centinaia di soldati e marinai britannici feriti negli scontri per la difesa di Leros e Kos.";
      }
      if (s <= 17) {
        return "Riapertura progressiva dei traffici marittimi passeggeri e commerciali con Haifa, Beirut e Port Said.";
      }
      return "Settembre 1945: fine della guerra; riconsegna delle banchine militari alla gestione commerciale civile e festeggiamenti popolari sul lungomare delle Finikoudes.";
    },
  },

  CY_LIMASSOL: {
    id: 'CY_LIMASSOL',
    modernName: 'Limassol (Lemesos Port, Vigneti del Troodos & Distillerie)',
    districtName: 'Limassol',
    getHistoricalName: (s: number) => {
      if (s < 5) return 'Limassol (Polo Portuale Mercantile & Vigneti del Troodos)';
      if (s <= 7) return 'Limassol (Attacchi Aerei Italiani & Mobilitazione Industriale)';
      if (s <= 9) return 'Limassol (Nodo Logistico per la 50ª Divisione Fanteria Britannica)';
      if (s <= 12) return 'Limassol (Cantiere di Riparazione Navale per Unità Ausiliarie)';
      if (s === 13) return 'Limassol (Base d\'Appoggio Navale per le Operazioni nell\'Egeo)';
      if (s <= 17) return 'Limassol (Culla del Movimento Operaio & Manifestazioni Democratiche)';
      return 'Limassol (Lemesos — Riconversione Industriale e Ritorno dei Reggimenti)';
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return 'Crown Colony of Cyprus — District of Limassol (Commissioner of Limassol)';
      if (s <= 17) return 'Crown Colony of Cyprus — Limassol Port & Industrial Defence Command';
      return 'Crown Colony of Cyprus — District of Limassol (Repubblica di Cipro)';
    },
    getNote: (s: number) => {
      if (s < 5) {
        return "Principale polo industriale, vinicolo ed esportatore dell'isola, affacciato sulla baia di Akrotiri e sostenuto dalla produzione delle distillerie (KEO) e dalla lavorazione del carrubo.";
      }
      if (s <= 7) {
        return "La città e le fabbriche portuali subiscono allarmi aerei e bombardamenti della Regia Aeronautica; le cantine e le industrie alimentari convertono la produzione per rifornire le razioni d'emergenza del Middle East Command.";
      }
      if (s <= 9) {
        return "Giugno 1941: Limassol è il perno logistico per lo spiegamento della 50ª Divisione di Fanteria (Northumbrian) e delle brigate australiane pronte a respingere sbarchi tedeschi.";
      }
      if (s <= 12) {
        return "Le officine meccaniche e le banchine di Limassol effettuano riparazioni rapide su dragamine, motolance e pattugliatori costieri alleati impegnati nella guerra antisommergibile.";
      }
      if (s === 13) {
        return "Settembre 1943: le motosiluranti della Royal Navy fanno tappa a Limassol prima di salpare per intercettare i convogli navali tedeschi nel Canale di Caso e nelle Cicladi meridionali.";
      }
      if (s <= 17) {
        return "Riconosciuta come la roccaforte del sindacalismo operaio di Cipro, la città è teatro di storiche adunate per il suffragio universale e la revoca definitiva delle leggi d'emergenza coloniale.";
      }
      return "Settembre 1945: fine della guerra; accoglienza trionfale della cittadinanza per i battaglioni del Cyprus Regiment di ritorno dai fronti d'Italia e d'oltremare.";
    },
  },

  CY_PAPHOS: {
    id: 'CY_PAPHOS',
    modernName: 'Paphos (Pafos, Polis Chrysochous & Penisola di Akamas)',
    districtName: 'Paphos',
    getHistoricalName: (s: number) => {
      if (s < 5) return 'Paphos (Distretto Occidentale, Foreste Demaniali & Monastero di Kykkos)';
      if (s <= 7) return 'Paphos (Produzione Forestale Bellica & Posto di Guardia Costiera)';
      if (s <= 9) return 'Paphos (Ridotto Montano del Troodos & Difesa a Oltranza)';
      if (s <= 12) return 'Paphos (Stazioni Radar Mobili della RAF sul Promontorio di Akamas)';
      if (s === 13) return 'Paphos (Sorveglianza dell\'Armistizio Italiano e delle Rotte di Rodi)';
      if (s <= 17) return 'Paphos (Addestramento alla Guerra Alpina e Anfibia di Reparti d\'Élite)';
      return 'Paphos (Pafos — Ritorno alla Pace Rurale e Benedizione dei Monasteri)';
    },
    getAdminTitle: (s: number) => {
      if (s < 5) return 'Crown Colony of Cyprus — District of Paphos (Commissioner of Paphos)';
      if (s <= 17) return 'Crown Colony of Cyprus — Paphos & Akamas Mountain Redoubt Command';
      return 'Crown Colony of Cyprus — District of Paphos (Repubblica di Cipro)';
    },
    getNote: (s: number) => {
      if (s < 5) {
        return "Distretto montano e costiero occidentale esteso tra Nea Paphos, Polis e la selvaggia penisola di Akamas; custode dei grandi boschi di pino e cedro di Cipro e dei monasteri storici di Kykkos e San Neofito.";
      }
      if (s <= 7) {
        return "I boscaioli di Paphos abbattono e lavorano tonnellate di legname strategico inviato ai cantieri ferroviari e militari del fronte egiziano; vedette costiere sorvegliano il mare aperto verso Rodi.";
      }
      if (s <= 9) {
        return "Maggio 1941: nei piani difensivi del Middle East Command, i contrafforti rocciosi e le gole boscose di Paphos sono designate come 'Ridotto di Guerriglia' in cui le forze imperiali avrebbero continuato la resistenza in caso di caduta delle coste.";
      }
      if (s <= 12) {
        return "Sulla cima delle scogliere di Akamas la RAF installa stazioni radar mobili segrete per intercettare i bombardieri a lungo raggio della Luftwaffe provenienti dalla Grecia e da Creta.";
      }
      if (s === 13) {
        return "Settembre 1943: le stazioni di Paphos monitorano l'uscita delle unità della Regia Marina dai porti del Dodecaneso dopo la proclamazione dell'armistizio per garantire il passaggio sicuro verso porti controllati dagli Alleati.";
      }
      if (s <= 17) {
        return "Le scogliere impervie di Akamas e le valli della foresta di Paphos fungono da campo d'addestramento estremo per i commando dell'SBS e del Long Range Desert Group destinati a missioni nei Balcani.";
      }
      return "Settembre 1945: conclusione vittoriosa della guerra mondiale; solenni cerimonie di rendimento di grazie a Kykkos e ripresa delle tradizionali attività marinare e agricole.";
    },
  },
};

export function isCyprusProvince(id: string): boolean {
  return (
    id === 'UK_AKROTIRI' ||
    id === 'UK_DHEKELIA' ||
    id.startsWith('CY_') ||
    id === 'CY000'
  );
}

export function resolveCyprusProvince(ft: any, s: number): ResolvedTerritory {
  const p = ft.properties || {};
  const cleanId = String(ft.id || p.id || p.NUTS_ID || '').toUpperCase().trim();
  const dossier = CYPRUS_PROVINCES_META[cleanId];

  const fac: FactionType = s >= 4 ? 'Alleati' : 'Neutrale';

  if (dossier) {
    return makeResult(
      'UK',
      dossier.getHistoricalName(s),
      dossier.getNote(s),
      fac,
      dossier.getAdminTitle(s)
    );
  }

  // Fallback for CY000 or generic Cyprus
  return makeResult(
    'UK',
    s >= 5 ? 'Cyprus (Crown Colony — Presidio Britannico in Guerra)' : 'Cyprus (Crown Colony of Cyprus — Sotto Palmerocrazia)',
    s >= 5
      ? 'Colonia della Corona britannica nel Mediterraneo orientale, perno strategico di supporto navale e aereo per le operazioni alleate in Medio Oriente e Nordafrica.'
      : 'Colonia della Corona britannica sotto la ferrea amministrazione autoritaria del governatore Sir Richmond Palmer.',
    fac,
    'Crown Colony of Cyprus'
  );
}
