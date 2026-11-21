/**
 * APPROFONDIMENTO STORICO PER ERITREA ITALIANA (1936–1940) E SOMALIA ITALIANA / AFIS (1936–1940, 1950–1954)
 * Copre esclusivamente i periodi di amministrazione italiana effettiva ("finché esistono"):
 * - Colonia / Governo dell'Eritrea (Steps 0–7: GEN 1936 – OTT 1940, prima di Cheren/Massaua Apr 1941)
 * - Colonia / Governo della Somalia (Steps 0–7: GEN 1936 – OTT 1940, prima di Chisimaio/Mogadiscio Feb 1941)
 * - AFIS — Amministrazione Fiduciaria Italiana della Somalia (Steps 25–31: GIU 1950 – DIC 1954, Mandato ONU)
 */

export interface ColonyPhaseEntry {
  name: string;
  adminTitle: string;
  note: string;
}

export function resolveEritreaItalianPhase(step: number): ColonyPhaseEntry {
  if (step <= 0) {
    return {
      name: "Colonia Eritrea (Regno d'Italia — Base della Campagna d'Etiopia)",
      adminTitle: "Colonia del Regno d'Italia — Governo dell'Eritrea (Pietro Badoglio / Asmara)",
      note: "Colonia primogenita fondata nel 1890: nel gennaio 1936 Asmara (Quartier Generale del Maresciallo Pietro Badoglio), Massaua e gli aeroporti di Gura e Otumlo fungono da principale retrovia logistica per le armate italiane impegnate sul fronte settentrionale etiopico (Tembien e Amba Aradam).",
    };
  }
  if (step <= 2) {
    return {
      name: "Governo dell'Eritrea (AOI — \"Grande Eritrea\" & Teleferica Massaua–Asmara)",
      adminTitle: "Governo Generale dell'AOI — Governo dell'Eritrea (Asmara / Massaua)",
      note: "Con la Legge Organica dell'AOI (1° giugno 1936, n. 1019) nasce la \"Grande Eritrea\", ampliata con il Tigrè storico e la Dancalia. Nel 1937 entra in funzione la monumentale teleferica Massaua–Asmara (75 km) mentre Asmara assume il volto urbanistico razionalista della \"Piccola Roma\".",
    };
  }
  if (step <= 5) {
    return {
      name: "Governo dell'Eritrea (AOI — Strada della Vittoria & Base Navale Mar Rosso)",
      adminTitle: "Governo Generale dell'AOI — Governo dell'Eritrea (Gov. Giuseppe Daodice)",
      note: "Vigilia del conflitto (1939): completati i grandi assi asfaltati Asmara–Dessiè–Addis Abeba (\"Strada della Vittoria\") e Assab–Sardò; potenziamento della base navale di Massaua (Comando Superiore Navale AOI) e apprestamenti difensivi ai passi di Cheren e Tessenei sul confine sudanese.",
    };
  }
  if (step === 6) {
    return {
      name: "Governo dell'Eritrea (AOI in Guerra — Isolamento di Suez & Mar Rosso)",
      adminTitle: "Governo Generale dell'AOI — Governo dell'Eritrea (Gen. Luigi Frusci · Giugno 1940)",
      note: "10 giugno 1940: con l'entrata in guerra dell'Italia, il blocco britannico di Suez e di Aden isola completamente la colonia dalla madrepatria. Da Massaua salpano i sommergibili (tra cui Galileo Galilei e Macallè) e i cacciatorpediniere della Flottiglia del Mar Rosso mentre le truppe di Frusci si schierano sul confine del Sudan.",
    };
  }
  return {
    name: "Governo dell'Eritrea (AOI — Presa di Cassala & Flottiglia del Mar Rosso)",
    adminTitle: "Governo Generale dell'AOI — Governo dell'Eritrea (Gen. Luigi Frusci · Ottobre 1940)",
    note: "Autunno 1940: le colonne coloniali del Gen. Luigi Frusci mantengono la città sudanese di Cassala (Kassala, conquistata il 4 luglio 1940) e Gallabat, mentre i cacciatorpediniere (Pantera, Tigre, Leone, Sauro, Battisti) e i MAS basati a Massaua conducono incursioni contro i convogli alleati del Mar Rosso.",
  };
}

export function resolveSomaliaItalianAndAfisPhase(step: number): ColonyPhaseEntry {
  // 1. AFIS — Amministrazione Fiduciaria Italiana della Somalia (1° aprile 1950 – 1960)
  if (step >= 31) {
    return {
      name: "Amministrazione Fiduciaria Italiana della Somalia (AFIS — Bandiera Somala 12 Ott 1954)",
      adminTitle: "Amministrazione Fiduciaria Italiana della Somalia — AFIS (ONU / Repubblica Italiana — Amb. Enrico Martino, Mogadiscio)",
      note: "Dicembre 1954: consolidamento politico dell'AFIS sotto l'Amministratore Enrico Martino dopo le prime elezioni municipali della storia somala (28 marzo 1954, ampia affermazione della Lega dei Giovani Somali / SYL). Il 12 ottobre 1954 viene ufficialmente adottata e issata a Mogadiscio, accanto al vessillo ONU e al Tricolore italiano, la bandiera nazionale somala azzurra con stella bianca a cinque punte disegnata da Mohammed Awale Liban.",
    };
  }
  if (step === 30) {
    return {
      name: "Amministrazione Fiduciaria Italiana della Somalia (AFIS — Amministratore Enrico Martino, Dic 1953)",
      adminTitle: "Amministrazione Fiduciaria Italiana della Somalia — AFIS (ONU / Repubblica Italiana — Amb. Enrico Martino, Mogadiscio)",
      note: "Dicembre 1953: nel settembre 1953 l'Ambasciatore Enrico Martino succede a Giovanni Fornari alla guida dell'AFIS; promulgazione dell'ordinamento per le prime elezioni amministrative a suffragio municipale e intesa con il Consiglio Territoriale e la SYL verso la transizione costituzionale.",
    };
  }
  if (step === 29) {
    return {
      name: "Amministrazione Fiduciaria Italiana della Somalia (AFIS — Commissariati Regionali & Riforme, 1952)",
      adminTitle: "Amministrazione Fiduciaria Italiana della Somalia — AFIS (ONU / Repubblica Italiana — Amb. Giovanni Fornari, Mogadiscio)",
      note: "Dicembre 1952: sotto la guida dell'Amministratore Giovanni Fornari l'AFIS consolida i sei commissariati regionali (Benadir, Alto Giuba, Basso Giuba, Mudugh, Migiurtinia, Hiran), espande l'istruzione pubblica somala e i programmi idraulico-agricoli lungo lo Uebi Scebeli e il Giuba.",
    };
  }
  if (step >= 27) {
    return {
      name: "Amministrazione Fiduciaria Italiana della Somalia (AFIS — Consiglio Territoriale, 1951)",
      adminTitle: "Amministrazione Fiduciaria Italiana della Somalia — AFIS (ONU / Repubblica Italiana — Amb. Giovanni Fornari, Mogadiscio)",
      note: "1951 (Mandato ONU AFIS): insediamento a Mogadiscio del primo Consiglio Territoriale consultivo somalo (gennaio 1951) con delegati regionali e dei partiti politici (SYL e Hisbia Digil Mirifle); apertura della Scuola di Politica e Amministrazione per formare la futura classe dirigente somala in vista dell'indipendenza del 1960.",
    };
  }
  if (step === 26) {
    return {
      name: "Amministrazione Fiduciaria Italiana della Somalia (AFIS — Accordo di Tutela ONU 2 Dic 1950)",
      adminTitle: "Amministrazione Fiduciaria Italiana della Somalia — AFIS (ONU / Repubblica Italiana — Amb. Giovanni Fornari, Mogadiscio)",
      note: "31 Dicembre 1950: il 2 dicembre 1950 l'Assemblea Generale dell'ONU ratifica formalmente l'Accordo di Tutela per l'AFIS guidata dall'Amministratore Giovanni Fornari e vigilata dal Consiglio Consultivo ONU (Colombia, Egitto, Filippine); in corso la circolazione della nuova moneta ('somalo') e la formazione del Corpo di Sicurezza della Somalia con i Carabinieri.",
    };
  }
  if (step >= 25) {
    return {
      name: "Amministrazione Fiduciaria Italiana della Somalia (AFIS — Mandato ONU dal 1° Aprile 1950, Mogadiscio)",
      adminTitle: "Amministrazione Fiduciaria Italiana della Somalia — AFIS (ONU / Repubblica Italiana — Amb. Giovanni Fornari, Mogadiscio)",
      note: "Il 1° aprile 1950 cessa l'amministrazione militare britannica (BMA) nell'ex Somalia Italiana e inizia ufficialmente il mandato decennale (1950–1960) dell'Amministrazione Fiduciaria Italiana della Somalia (AFIS) per conto delle Nazioni Unite (Risoluzione ONU 289 del 21 novembre 1949), con esposizione congiunta della bandiera ONU e del Tricolore della Repubblica Italiana sotto l'Amministratore Giovanni Fornari a Mogadiscio (il Somaliland Britannico e l'Ogaden restano rispettivamente a Regno Unito ed Etiopia).",
    };
  }

  // 2. Colonia / Governo della Somalia Italiana (Steps 0–7: 1936–1940)
  if (step <= 0) {
    return {
      name: "Colonia della Somalia Italiana (Mogadiscio / Oltregiuba — Fronte Sud)",
      adminTitle: "Colonia del Regno d'Italia (Capoluogo Mogadiscio — Gen. Rodolfo Graziani)",
      note: "Possedimento italiano sull'Oceano Indiano unificato nel 1908 e ampliato nel 1924–25 con l'annessione dell'Oltregiuba (Chisimaio). Nel gennaio 1936 Mogadiscio e Dolo sostengono l'offensiva meridionale del Gen. Rodolfo Graziani sul Ganale Doria e su Neghelli contro l'Impero d'Etiopia.",
    };
  }
  if (step <= 2) {
    return {
      name: "Governo della Somalia (AOI — Ogaden, SAIS & Genale)",
      adminTitle: "Governo Generale dell'AOI — Governo della Somalia (Mogadiscio · Gov. Francesco Saverio Caroselli)",
      note: "Organizzato come Governo della Somalia dell'AOI dal R.D.L. 1° giugno 1936 n. 1019 con l'incorporazione dell'Ogaden; polo agro-industriale SAIS (zucchero e cotone) al Villaggio Duca degli Abruzzi (Giohar), comprensorio irriguo di Genale e porti di Mogadiscio, Merca e Chisimaio.",
    };
  }
  if (step <= 5) {
    return {
      name: "Governo della Somalia (AOI — Strada Imperiale & Bande Dubat)",
      adminTitle: "Governo Generale dell'AOI — Governo della Somalia (Gov. Francesco Saverio Caroselli)",
      note: "1939: completamento della grande arteria 'Strada Imperiale' Mogadiscio–Belet Uen–Ferfer–Giggiga, piena integrazione degli ex sultanati settentrionali (Migiurtinia, Obbia e Nogal) e schieramento dei Gruppi Bande Dubat a presidio delle frontiere del Kenya e della Somalia Britannica.",
    };
  }
  if (step === 6) {
    return {
      name: "Governo della Somalia (AOI in Guerra — Fronte del Giuba)",
      adminTitle: "Governo Generale dell'AOI — Settore Meridionale Somalia (Gen. Carlo De Simone · Giugno 1940)",
      note: "Giugno 1940: allo scoppio del conflitto la 101ª e 102ª Divisione Somala (Gen. Carlo De Simone) e i reparti Dubat presidiano la linea fluviale del Giuba (Chisimaio–Bardera–Dolo) contro le forze del Commonwealth in Kenya, mentre la costa sull'Oceano Indiano è isolata dalla madrepatria.",
    };
  }
  return {
    name: "Governo della Somalia (AOI — Incursioni in Kenya & Blocco Navale sul Benadir)",
    adminTitle: "Governo Generale dell'AOI — Governo della Somalia (Mogadiscio · Ottobre 1940)",
    note: "Ottobre 1940: in concomitanza con la conquista italiana della Somalia Britannica a nord, colonne mobili dalla Somalia e dal Borana occupano i posti di confine keniani di El Wak, Buna e Moyale, mentre Mogadiscio e Chisimaio subiscono il blocco marittimo e i raid navali della Royal Navy.",
  };
}
