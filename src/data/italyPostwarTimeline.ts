/**
 * Approfondimento Geostorico Postbellico Italiano per Provincia (Steps 19–31: Set 1947 – Dic 1954)
 * Copre l'evoluzione delle 105 province metropolitane (escluse ITH44/ITH43 gestite con il regime TLT/Confine Orientale)
 * lungo 5 ere repubblicane:
 * - s19–20 (Set–Dic 1947): Trattato di Parigi, Assemblea Costituente & Promulgazione Costituzione (27 dic 1947)
 * - s21–22 (Giu–Dic 1948): Elezioni 18 Aprile, Statuti Speciali 1948 (VdA, TAA, Sardegna), ERP/Piano Marshall
 * - s23–25 (Giu 1949–Giu 1950): NATO (apr 1949), Piano INA-Casa, Metano Cortemaggiore & Legge Sila/Stralcio
 * - s26–28 (Dic 1950–Dic 1951): Cassa per il Mezzogiorno (1950), CECA/Finsider (1951) & Alluvione del Polesine (nov 1951)
 * - s29–31 (Dic 1952–Dic 1954): ENI (1953), RAI TV (1954), Miracolo Economico Nascente & Schema Vanoni
 */

import { ItalyTimelineProfile } from './italyTimelineNorth';

export interface ItalyPostwarResolved {
  name: string;
  note: string;
  adminEntity: string;
}

// Specificità provinciali documentate per il periodo 1948–1954 (Steps 20–31)
const PROVINCIAL_POSTWAR_HIGHLIGHTS: Record<
  string,
  {
    e48_50?: string;
    e51_54?: string;
  }
> = {
  ITC11: {
    e48_50:
      'Tra il 1949 e il 1950 Torino unisce la ricostruzione ERP al lancio della FIAT 1400 (prima vettura italiana a scocca portante) dopo la commozione nazionale per la tragedia di Superga del 4 maggio 1949.',
    e51_54:
      'Tra 1952 e 1954 la FIAT di Vittorio Valletta espande Mirafiori con la nuova 1100-103 mentre gli studi RAI di Torino inaugurano le trasmissioni televisive nazionali il 3 gennaio 1954 e il grande flusso migratorio meridionale muta il volto della città.',
  },
  ITC12: {
    e51_54:
      'Tra 1951 e 1954 il Biellese e il Vercellese consolidano il primato europeo nella filatura laniera e nella risicoltura meccanizzata della Pianura Padana.',
  },
  ITC15: {
    e48_50:
      'Nel 1949–50 il distretto orafo di Valenza e i cementifici di Casale Monferrato trainano la ripresa manifatturiera dell\'Alessandrino.',
  },
  ITC16: {
    e48_50:
      'Dopo l\'entrata in vigore del Trattato di Parigi (sett. 1947) e la cessione di Briga Marittima e Tenda alla Francia, il Cuneese avvia la ricostruzione alpina e il polo dolciario-agroalimentare di Alba (Ferrero).',
    e51_54:
      'Tra 1951 e 1954 la provincia di Cuneo sviluppa la meccanizzazione agricola della Granda e il collegamento transalpino di Tenda.',
  },
  ITC20: {
    e48_50:
      'Con la Legge Costituzionale n. 4 del 26 febbraio 1948 entra in vigore lo Statuto Speciale della Regione Autonoma Valle d\'Aosta (bilinguismo italiano-francese e zona franca), mentre la siderurgia Cogne alimenta l\'industria alpina.',
    e51_54:
      'Tra 1951 e 1954 la Regione Autonoma Valle d\'Aosta consolida gli impianti idroelettrici alpini e la produzione di acciai speciali Cogne nella cornice CECA.',
  },
  ITC31: {
    e48_50:
      'Dopo la rettifica di confine di Briga e Tenda (1947), l\'Imperiese rilancia floricoltura di Sanremo, olivicoltura e turismo invernale sulla Riviera dei Fiori.',
    e51_54:
      'Nel 1951 nasce a Sanremo il Festival della Canzone Italiana al Casinò municipale, simbolo della rinascita turistica e mediatica dell\'Italia del dopoguerra.',
  },
  ITC33: {
    e48_50:
      'Con i fondi del Piano Marshall e il Piano Sinigaglia (1948–50), i cantieri Ansaldo e il porto di Genova guidano il recupero marittimo nazionale.',
    e51_54:
      'Tra il 1951 e il 1954 entra in esercizio il grande stabilimento siderurgico pubblico a ciclo integrale Finsider "Oscar Sinigaglia" a Genova Cornigliano (1953), perno italiano della CECA insieme al varo di grandi turbonavi (Andrea Doria, 1953).',
  },
  ITC4C: {
    e48_50:
      'Con l\'arrivo dei fondi ERP e il Piano INA-Casa (1949), Milano diventa l\'officina finanziaria e tecnica della ricostruzione (Breda, Falck a Sesto San Giovanni, Innocenti Lambrate con la Lambretta, Pirelli).',
    e51_54:
      'Tra 1951 e 1954 Milano avvia la Fiera Campionaria del pre-miracolo economico, le ricerche di Giulio Natta al Politecnico sui polimeri isotattici (1954, polipropilene) e le trasmissioni televisive dagli studi di Corso Sempione (1954).',
  },
  ITC46: {
    e48_50:
      'Nel Bresciano tra il 1948 e il 1950 i forni elettrici delle acciaierie e la piccola meccanica della Val Trompia e Val Sabbia si riconvertono in edilizia e componentistica civile.',
    e51_54:
      'Tra 1951 e 1954 Brescia (OM, Beretta civile, tondino per cemento armato dei "tondinari") diviene uno dei distretti industriali più dinamici della Pianura Padana.',
  },
  ITH10: {
    e48_50:
      'Con la Legge Costituzionale n. 5 del 26 febbraio 1948 entra in vigore il primo Statuto d\'Autonomia del Trentino-Alto Adige in attuazione dell\'Accordo De Gasperi–Gruber (parità linguistica e tutela della minoranza sudtirolese a Bolzano).',
    e51_54:
      'Tra 1951 e 1954 la Provincia Autonoma di Bolzano sviluppa gli impianti idroelettrici alpini e l\'economia turistico-frutticola della Val d\'Adige fra persistenti tensioni politiche sull\'attuazione dello Statuto regionale.',
  },
  ITH20: {
    e48_50:
      'Con lo Statuto Speciale del 26 febbraio 1948 nasce la Regione Autonoma Trentino-Alto Adige con capoluogo Trento, coordinando ricostruzione montana e centrali idroelettriche.',
    e51_54:
      'Tra 1951 e 1954 il Trentino avvia le grandi opere idroelettriche sul Noce (Santa Giustina, 1951) e il recupero forestale e turistico delle Dolomiti.',
  },
  ITH35: {
    e48_50:
      'Tra il 1948 e il 1950 Porto Marghera avvia la riconversione chimica e cantieristica sul margine lagunare di Venezia grazie ai crediti ERP.',
    e51_54:
      'Tra 1951 e 1954 Marghera (Montecatini, SAVA, cantieri Breda) diventa il principale polo petrolchimico e metallurgico dell\'Alto Adriatico mentre la Biennale e la Mostra del Cinema rilanciano Venezia nel mondo.',
  },
  ITH37: {
    e48_50:
      'Nel Polesine tra il 1948 e il 1950 le opere di bonifica agraria e la riforma fondiaria del Delta del Po cercano di stabilizzare braccianti e piccoli fittavoli.',
    e51_54:
      'Il 14 novembre 1951 la rotta degli argini del Po ad Occhiobello provoca la catastrofica alluvione del Polesine (oltre 180.000 sfollati); tra 1952 e 1954 Rovigo affronta l\'emergenza della ricostruzione idraulica mentre migliaia di famiglie emigrano verso il Triangolo Industriale.',
  },
  ITH51: {
    e48_50:
      'Nel giugno 1949 l\'AGIP guidata da Enrico Mattei scopre il grande giacimento di metano e idrocarburi di Cortemaggiore (Piacenza), aprendo l\'era energetica del gas naturale italiano.',
    e51_54:
      'Dal 1953 Piacenza e Cortemaggiore sono il fulcro estrattivo dell\'appena istituita ENI (Legge 10 febbraio 1953), alimentando la rete di metanodotti verso Milano, Torino e Bologna.',
  },
  ITH55: {
    e48_50:
      'Tra il 1948 e il 1950 Bologna ricostruisce lo snodo ferroviario distrutto, rilancia la meccanica di precisione ("Packaging Valley") e inaugura quartieri INA-Casa.',
    e51_54:
      'Tra 1951 e 1954 Bologna si afferma come laboratorio amministrativo dell\'Emilia ricostruita, trainata da meccanica automatica, motori Ducati e cooperazione agroalimentare.',
  },
  ITH57: {
    e51_54:
      'Tra 1952 e 1954 la scoperta del metano ravennate apre la costruzione del grande stabilimento petrolchimico ANIC-ENI di Ravenna per gomma sintetica e fertilizzanti.',
  },
  ITI11: {
    e48_50:
      'Restaurato nel 1946 il nome storico di Provincia di Massa-Carrara (dopo la parentesi fascista "Apuania"), il bacino marmifero riprende le esportazioni e l\'area industriale di Massa avvia la riconversione.',
    e51_54:
      'Tra 1951 e 1954 il distretto lapideo apuano di Carrara e il porto esportatore di Marina di Carrara beneficiano della domanda edilizia europea della ricostruzione.',
  },
  ITI16: {
    e48_50:
      'Con il Piano Marshall vengono ricostruiti il porto di Livorno (retrovia logistica alleata e poi US Army Camp Darby dal 1951) e gli altiforni di Piombino.',
    e51_54:
      'Tra 1951 e 1954 lo stabilimento Ilva di Piombino rinasce nella siderurgia CECA e la base di Camp Darby a Livorno consolida la presenza logistica NATO sul Tirreno.',
  },
  ITI17: {
    e48_50:
      'Tra 1948 e 1950 a Pontedera (Pisa) la Piaggio di Enrico Piaggio e Corradino D\'Ascanio trasforma la Vespa in fenomeno di massa della mobilità italiana mentre l\'Università di Pisa riprende le ricerche di fisica.',
    e51_54:
      'Tra 1951 e 1954 lo stabilimento Piaggio di Pontedera supera le centinaia di migliaia di scooter prodotti mentre a Pisa si prepara il primo calcolatore elettronico italiano (CEP, 1954–55).',
  },
  ITI1A: {
    e48_50:
      'Con la Legge Stralcio dell\'ottobre 1950 la Maremma grossetana diviene uno dei teatri principali dell\'Ente Maremma per l\'assegnazione di poderi contadini ai braccianti.',
    e51_54:
      'Tra 1951 e 1954 l\'Ente Maremma bonifica e appodera migliaia di ettari nel Grossetano mentre riparte l\'attività mineraria dell\'Amiata e di Gavorrano.',
  },
  ITI22: {
    e51_54:
      'Tra 1951 e 1954 le acciaierie di Terni entrano nel perimetro pubblico Finsider / CECA (produzione di lamierino magnetico e acciaio inox) assieme al polo chimico di Papigno.',
  },
  ITI43: {
    e48_50:
      'Capitale della Repubblica Italiana dal 1° gennaio 1948 (Costituzione promulgata da Enrico De Nicola, presidenza Luigi Einaudi dall\'11 maggio 1948 e governi centristi di Alcide De Gasperi): nel 1949 Roma sigla il Patto Atlantico (NATO) e celebra l\'Anno Santo del 1950.',
    e51_54:
      'Tra 1951 e 1954 Roma consolida i grandi ministeri della Cassa per il Mezzogiorno, inaugura Cinecittà del neorealismo e della "Hollywood sul Tevere", e lancia da Roma le trasmissioni RAI TV (3 gennaio 1954) sotto i governi Pella (1953) e Scelba (1954).',
  },
  ITI44: {
    e48_50:
      'Rinominata Provincia di Latina già nel 1945 (in luogo di Littoria), dal 1950 rientra nei confini settentrionali d\'intervento della Cassa per il Mezzogiorno avviando i primi poli industriali nell\'Agro Pontino ricostruito.',
    e51_54:
      'Tra 1951 e 1954 Latina, Aprilia risorta dalle rovine e Pomezia beneficiano dei finanziamenti della Cassa per il Mezzogiorno (industrializzazione del Basso Lazio) e delle nuove vie di comunicazione tirreniche.',
  },
  ITF33: {
    e48_50:
      'Tra il 1948 e il 1950 Napoli ricostruisce le banchine portuali e i quartieri distrutti, ospitando forti tensioni sociali e la riorganizzazione dell\'Ilva di Bagnoli con i fondi ERP.',
    e51_54:
      'Dal 1951 Napoli diventa sede del Comando Supremo Alleato NATO per il Sud Europa (AFSOUTH a Bagnoli), mentre la Cassa per il Mezzogiorno finanzia il polo siderurgico Italsider/Ilva di Bagnoli e le infrastrutture dell\'area metropolitana (sotto le giunte laurino-monarchiche 1952–54).',
  },
  ITF46: {
    e48_50:
      'Con le leggi agrarie del 1950 nel Tavoliere foggiano inizia l\'esproprio dei grandi latifondi cerealicoli e la costruzione di borgate rurali dell\'Ente Riforma.',
    e51_54:
      'Tra 1951 e 1954 la Cassa per il Mezzogiorno finanzia le dighe sul Fortore e l\'acquedotto rurale nel Foggiano trasformando l\'agricoltura della Capitanata.',
  },
  ITF52: {
    e48_50:
      'Nel 1949–50 Matera diviene caso simbolo nazionale dei "Sassi" (denunciati da Carlo Levi e visitati da De Gasperi e Togliatti), portando alla legge speciale sul risanamento e alla Riforma Agraria del Metapontino.',
    e51_54:
      'Con la Legge speciale del 1952 per lo sfollamento dei Sassi e i fondi della Cassa per il Mezzogiorno, a Matera nascono nuovi borghi rurali razionalisti (La Martella) progettati da urbanisti italiani.',
  },
  ITF62: {
    e48_50:
      'Dopo l\'eccidio di Fragalà a Melissa (29 ottobre 1949) durante le occupazioni contadine delle terre incolte, il Parlamento vara nel maggio 1950 la Legge Sila dando avvio alla riforma agraria nel Crotonese e nel Catanzarese.',
    e51_54:
      'Tra 1951 e 1954 l\'Opera Valorizzazione Sila distribuisce terre ai braccianti di Catanzaro e Crotone con il sostegno della Cassa per il Mezzogiorno.',
  },
  ITG12: {
    e48_50:
      'Capitale della Regione Siciliana autonoma (Assemblea Regionale Siciliana dal 1947): il triennio 1948–50 è segnato dalle inchieste sul banditismo di Salvatore Giuliano (ucciso nel luglio 1950 a Castelvetrano) e dall\'avvio dell\'Ente Riforma Agraria in Sicilia (ERAS).',
    e51_54:
      'Tra 1951 e 1954 Palermo guida la Regione Autonoma Siciliana beneficiando degli interventi infrastrutturali della Cassa per il Mezzogiorno mentre iniziano grandi trasformazioni urbanistiche ed edilizie.',
  },
  ITG19: {
    e51_54:
      'Tra 1950 e 1954 nella rada di Augusta–Priolo (Siracusa) entra in funzione la raffineria RASIOM (1950–53) e la scoperta petrolifera di Ragusa (1953–54) trasforma la Sicilia sud-orientale in grande polo petrolchimico del Mediterraneo.',
  },
  ITG2D: {
    e48_50:
      'Con la Legge Costituzionale n. 3 del 26 febbraio 1948 nasce la Regione Autonoma della Sardegna (Sassari, Nuoro e Cagliari); la Fondazione Rockefeller completa con successo nel 1946–50 la storica eradicazione della malaria nell\'isola.',
    e51_54:
      'Tra 1951 e 1954 la Sardegna settentrionale beneficia della bonifica post-malarica, dell\'irrigazione sul Coghinas (Cassa per il Mezzogiorno) e della nascita dei primi collegamenti marittimi civili.',
  },
  ITG2F: {
    e48_50:
      'Nel 1948 la Regione Autonoma della Sardegna fissa il proprio capoluogo a Cagliari, dove la Cassa per il Mezzogiorno avvia nel 1950 opere portuali, idriche (bacini del Flumendosa) e di bonifica nel Campidano.',
    e51_54:
      'Tra 1951 e 1954 prosegue la crisi carbonifera nel bacino del Sulcis (Carbonia) mentre la Cassa per il Mezzogiorno costruisce le dighe del Flumendosa e i nuovi quartieri di Cagliari ricostruita.',
  },
};

function getRegionalPostwarTheme(canonId: string, step: number): string {
  const isNorthEast = canonId.startsWith('ITH');
  const isSouth = canonId.startsWith('ITF');
  const isSicily = canonId.startsWith('ITG1');
  const isSardinia = canonId.startsWith('ITG2');

  if (step === 20) {
    return 'Dicembre 1947: l\'Assemblea Costituente approva a larghissima maggioranza la Costituzione della Repubblica Italiana (22–27 dicembre), mentre entra in vigore la linea deflazionistica di Luigi Einaudi e giungono gli aiuti americani Interim Aid.';
  }
  if (step <= 22) {
    if (isSicily || isSardinia) {
      return '1948: dopo la svolta politica delle elezioni del 18 aprile 1948, l\'isola applica l\'autonomia speciale costituzionale e avvia la lotta contro la malaria e il latifondo grazie ai primi fondi del Piano Marshall (ERP).';
    }
    if (isSouth) {
      return '1948: la svolta elettorale del 18 aprile e l\'avvio del Piano Marshall (ERP) riaprono la "Questione Meridionale", fra tensioni contadine sulle terre incolte e primi lavori infrastrutturali.';
    }
    return '1948: con l\'entrata in vigore della Costituzione repubblicana (1° gen. 1948), l\'elezione di Luigi Einaudi al Quirinale (11 mag.) e il varo del Piano Marshall (ERP), la provincia accelera la ricostruzione civile e produttiva nonostante le tensioni sociali post-14 luglio.';
  }
  if (step <= 25) {
    if (isSouth || isSicily || isSardinia) {
      return '1949–Giugno 1950: l\'Italia aderisce al Patto Atlantico (NATO, 4 aprile 1949); nel Mezzogiorno le lotte bracciantili per la terra sfociano nella Legge Sila (maggio 1950) e nei primi cantieri popolari del Piano INA-Casa.';
    }
    return '1949–Giugno 1950: con l\'ingresso dell\'Italia nella NATO (4 aprile 1949) e l\'avvio del Piano INA-Casa (1949), si moltiplicano i cantieri d\'edilizia operaia e la meccanizzazione manifatturiera e agricola.';
  }
  if (step <= 28) {
    if (isSouth || isSicily || isSardinia) {
      return 'Dicembre 1950–1951: entra in funzione la Cassa per il Mezzogiorno (istituita il 10 agosto 1950) insieme alla Legge Stralcio di Riforma Agraria, finanziando acquedotti, bonifiche, dighe e strade nella provincia.';
    }
    if (isNorthEast) {
      return 'Dicembre 1950–1951: aderente alla CECA (aprile 1951), l\'Italia consolida la ricostruzione industriale; nel tardo autunno 1951 il Nord-Est si mobilita per soccorrere il Veneto sconvolto dall\'alluvione del Polesine.';
    }
    return 'Dicembre 1950–1951: con la firma del Trattato CECA (18 aprile 1951) e i crediti ERP al culmine, la provincia sperimenta una crescita sostenuta dell\'acciaio, della chimica, dell\'edilizia INA-Casa e dell\'energia.';
  }
  if (isSouth || isSicily || isSardinia) {
    return '1952–1954: i programmi della Cassa per il Mezzogiorno e della Riforma Agraria trasformano campagne e infrastrutture civili mentre nasce l\'ENI (1953) e lo Schema Vanoni (1954) punta a colmare il divario occupazionale col Nord.';
  }
  return '1952–1954: superata la ricostruzione bellica tra l\'adesione alla CECA (1952), la nascita dell\'ENI (1953) e l\'avvio della RAI TV (3 gennaio 1954), la provincia entra nella fase ascendente del nascente Miracolo Economico italiano.';
}

export function getItalyCanonicalPostwarTitle(canonId: string, baseTitle: string, step: number): string {
  if (canonId === 'ITI44' && step >= 18) return 'Provincia di Latina';
  if (canonId === 'ITI11' && step >= 19) return 'Provincia di Massa-Carrara';
  return baseTitle;
}

export function resolveItalyPostwarStep(
  canonId: string,
  baseTitle: string,
  profile: ItalyTimelineProfile | undefined,
  s: number
): ItalyPostwarResolved {
  const effectiveTitle = getItalyCanonicalPostwarTitle(canonId, baseTitle, s);
  const provPost47 = profile?.post45_47 || `Ricostruzione democratica in ${effectiveTitle}.`;

  // Admin entity e suffisso storico evolutivo
  const eraNameSuffix =
    s === 19
      ? 'Repubblica Italiana'
      : s === 20
      ? 'Repubblica Italiana — Costituzione Dic. 1947'
      : s <= 22
      ? 'Repubblica Italiana — Piano Marshall 1948'
      : s <= 25
      ? 'Repubblica Italiana — NATO & INA-Casa 1949–50'
      : s <= 28
      ? 'Repubblica Italiana — Cassa Mezzogiorno & CECA 1950–51'
      : 'Repubblica Italiana — ENI, RAI TV & Sviluppo 1952–54';

  const adminRegionNote =
    canonId === 'ITC20' && s >= 21
      ? 'Regione Autonoma Valle d\'Aosta (Statuto Speciale Feb. 1948 — Repubblica Italiana)'
      : (canonId === 'ITH10' || canonId === 'ITH20') && s >= 21
      ? `Regione Autonoma Trentino-Alto Adige (Statuto Feb. 1948) — ${effectiveTitle}`
      : canonId.startsWith('ITG1')
      ? `Regione Siciliana (Statuto 1946) — Prefettura di ${effectiveTitle}`
      : canonId.startsWith('ITG2') && s >= 21
      ? `Regione Autonoma della Sardegna (Statuto Feb. 1948) — Prefettura di ${effectiveTitle}`
      : `Repubblica Italiana — Prefettura di ${effectiveTitle}`;

  if (s === 19) {
    return {
      name: `${effectiveTitle} (${eraNameSuffix})`,
      note: `${provPost47} Repubblica Italiana nell'assetto dell'Assemblea Costituente (Enrico De Nicola / Alcide De Gasperi) e del Trattato di Pace di Parigi entrato in vigore il 15 settembre 1947.`,
      adminEntity: adminRegionNote,
    };
  }

  const custom = PROVINCIAL_POSTWAR_HIGHLIGHTS[canonId];
  const specific =
    s >= 26
      ? custom?.e51_54 || custom?.e48_50 || ''
      : s >= 21
      ? custom?.e48_50 || ''
      : '';

  const theme = getRegionalPostwarTheme(canonId, s);
  const note = specific ? `${theme} ${specific} [${provPost47}]` : `${theme} ${provPost47}`;

  return {
    name: `${effectiveTitle} (${eraNameSuffix})`,
    note,
    adminEntity: adminRegionNote,
  };
}
