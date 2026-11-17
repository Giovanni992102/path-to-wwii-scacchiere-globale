import type { FactionType, ResolvedTerritory } from '../types';

function res(
  o: string,
  name: string,
  note?: string,
  fac?: FactionType,
  adminEntity?: string
): ResolvedTerritory {
  return { o, name, note, fac, adminEntity };
}

export function getSlovakKrajLabel(nameOrId: string): string {
  const low = nameOrId.toLowerCase();
  if (low.includes('bratislav') || low.includes('zahorie') || low.includes('trnav') || low.includes('csallok') || low.includes('dunajska')) {
    return 'Bratislavský kraj';
  }
  if (low.includes('nitr') || low.includes('nove_zamky') || low.includes('nove zamky') || low.includes('komarno') || low.includes('ersekujvar') || low.includes('levice') || low.includes('galanta')) {
    return 'Nitriansky kraj';
  }
  if (low.includes('trencin') || low.includes('zilina') || low.includes('povaz') || low.includes('liptov') || low.includes('orava') || low.includes('martin')) {
    return 'Žilinský kraj';
  }
  if (low.includes('bansk') || low.includes('bystric') || low.includes('zvolen') || low.includes('pohronie') || low.includes('lucenec') || low.includes('rimav')) {
    return 'Banskobystrický kraj';
  }
  if (low.includes('saris') || low.includes('presov') || low.includes('zemplin') || low.includes('humenne') || low.includes('stakcin') || low.includes('sobrance')) {
    return 'Prešovský kraj';
  }
  return 'Košický kraj';
}

// Slovakia Core: CZE (Step 0-1) -> Autonomous CZE (Step 2) -> SLO Tiso (Step 3-16, with Aug 1944 SNP / Wehrmacht at s=15 & East Carpathians SOV at s=16) -> CZE Liberated (Step 17+)
export function resolveSlovakia(
  s: number,
  name: string,
  _itName: string,
  _deName: string,
  _note: string,
  nid = ''
): ResolvedTerritory {
  const low = `${name} ${nid}`.toLowerCase();
  if (s >= 23) {
    const kraj = getSlovakKrajLabel(low);
    return res(
      'CZE',
      `${name} (${kraj} — Cecoslovacchia Socialista, Riforma 1949)`,
      `Dal 1° gennaio 1949 la riforma amministrativa istituisce in Slovacchia sei nuove regioni (Kraje: ${kraj}) sotto il regime comunista di Klement Gottwald e il Corpo dei Commissari di Bratislava (Gustáv Husák).`,
      'Comintern',
      `Československá republika — ${kraj} (Zbor povereníkov · KSČ)`
    );
  }
  if (s >= 21) {
    return res(
      'CZE',
      `${name} (Slovensko — Repubblica Cecoslovacca Socialista / Costituzione del 9 Maggio 1948)`,
      "A seguito del colpo di Stato di Praga (25 febbraio 1948) e dell'estromissione del Partito Democratico dal Corpo dei Commissari slovacco a Bratislava, la Slovacchia è pienamente integrata nella Repubblica Cecoslovacca socialista di Klement Gottwald (Costituzione del 9 maggio 1948).",
      'Comintern',
      'Československá republika — Slovensko (Zbor povereníkov · Gustáv Husák / KSČ)'
    );
  }
  if (s >= 17) {
    const isBrat = low.includes('bratislav');
    const postNote =
      isBrat && s >= 20
        ? "Dal 15 ottobre 1947 (Trattato di Pace di Parigi del 10 febbraio 1947) la Cecoslovacchia acquisisce dall'Ungheria la testa di ponte di Jarovce-Rusovce-Čunovo sulla riva destra del Danubio a sud di Bratislava."
        : s >= 18
        ? "Terza Repubblica Cecoslovacca restaurata nei confini pre-Monaco (con la reintegrazione di Devín e Petržalka a Bratislava e l'annullamento del Primo Arbitrato di Vienna)."
        : "Aprile 1945: territorio slovacco liberato dal 2° e 4° Fronte Ucraino dell'Armata Rossa e dal 1° Corpo d'Armata Cecoslovacco (Gen. Ludvík Svoboda); il 4-5 aprile 1945 a Košice il Presidente Edvard Beneš proclama il Programma di Košice.";
    return res(
      'CZE',
      isBrat && s >= 20
        ? `${name} (Československá republika — Trattato di Parigi 1947)`
        : `${name} (Slovensko Oslobodené — Košický vládny program, Apríl 1945)`,
      postNote,
      'Alleati',
      s >= 18
        ? 'Československá republika — Slovensko (Slovenská národná rada)'
        : 'Československá republika — Slovensko'
    );
  }
  if (s < 2) {
    return res(
      'CZE',
      name,
      _note ? `${_note} — Krajina Slovenská (Československá republika)` : 'Krajina Slovenská (Československá republika)',
      undefined,
      'Československá republika — Krajina Slovenská'
    );
  }
  if (s === 2) {
    let postMunichExtra = 'Autonómna Slovenská krajina (Accordi di Žilina, 6 ott 1938 · Druhá republika)';
    if (low.includes('zilina') || low.includes('liptov') || low.includes('spis')) {
      postMunichExtra =
        "Autonómna Slovenská krajina (Druhá republika). Il 1° dicembre 1938 la delimitazione polacco-cecoslovacca cede alla Polonia 226 km² nei settori carpatici di Skalité/Svrčinovec (Kysuce), Suchá Hora/Hladovka (Orava) e Tatranská Javorina/Lesnica (Spiš).";
    } else if (low.includes('bratislav')) {
      postMunichExtra =
        "Autonómna Slovenská krajina (Druhá republika). Il 20 novembre 1938 Petržalka (Engerau) e Devín passano al Terzo Reich (Niederdonau), mentre Bratislava resta capitale dell'autonomia slovacca.";
    }
    return res(
      'CZE',
      name,
      _note ? `${_note} — ${postMunichExtra}` : postMunichExtra,
      undefined,
      'Česko-Slovenská republika — Autonómna Slovenská krajina'
    );
  }
  if (s === 15) {
    if (low.includes('bansk') || low.includes('bystric') || low.includes('pohronie')) {
      return res(
        'CZE',
        `${name} (Insurrezione Nazionale Slovacca — SNP)`,
        "29 agosto 1944: a Banská Bystrica i generali Ján Golian e Rudolf Viest proclamano l'Insurrezione Nazionale Slovacca (SNP); la Slovacchia centrale insorge contro la Wehrmacht giurando fedeltà alla Repubblica Cecoslovacca.",
        'Alleati',
        'Slovenská národná rada / Prvá československá armáda na Slovensku (Banská Bystrica)'
      );
    }
    return res(
      'GER',
      `${name} — Wehrmacht Militärverwaltung (Invasione Tedesca)`,
      "29 agosto 1944: in risposta all'Insurrezione Nazionale Slovacca, le truppe tedesche (Wehrmacht e Waffen-SS sotto Gottlob Berger) occupano militarmente la Slovacchia esautorando di fatto il governo di Tiso.",
      'Asse',
      'Deutscher Befehlshaber in der Slowakei / Militärverwaltung'
    );
  }
  if (s === 16 && (low.includes('saris') || low.includes('presov') || low.includes('zemplin') || low.includes('humenne'))) {
    return res(
      'SOV',
      `${name} (Liberata nei Carpazi — Armata Rossa & 1° Corpo Cecoslovacco)`,
      "Autunno-Dicembre 1944: dopo la battaglia del passo di Dukla e l'Offensiva dei Carpazi Orientali, il 4° Fronte Ucraino e il 1° Corpo Cecoslovacco liberano lo Šariš e lo Zemplín settentrionale (Bardejov, Humenné, Prešov).",
      'Comintern',
      'Armata Rossa — 4° Fronte Ucraino & 1. Čs. Armádny Zbor'
    );
  }
  const polishReclaimNote =
    s >= 5 && (low.includes('zilina') || low.includes('liptov') || low.includes('spis'))
      ? " — Dal settembre-novembre 1939 la Slovacchia di Tiso riannette i territori ceduti alla Polonia nel 1938 (Skalité, Suchá Hora, Javorina) e occupa l'Orawa e lo Spiš polacchi (Jabłonka, Jurgów — 770 km²)."
      : '';
  return res(
    'SLO',
    name,
    (_note ? `${_note} — Slovenská republika (Prezident Dr. Jozef Tiso)` : 'Slovenská republika (Prezident Dr. Jozef Tiso, marec 1939)') + polishReclaimNote,
    'Fantoccio',
    'Slovenská republika (Vláda Dr. Jozefa Tisa)'
  );
}

// Felvidek & South Ruthenia: CZE (Step 0-1) -> HUN First Vienna Award (Step 2-15/16) -> CZE / SOV (Step 16/17+)
export function resolveFelvidek(
  s: number,
  name: string,
  _itName: string,
  _deName: string,
  _note: string,
  nid = ''
): ResolvedTerritory {
  const low = `${name} ${nid}`.toLowerCase();
  const isSouthRuthenia =
    low.includes('ruthenia') || low.includes('karpatalja') || low.includes('uzhorod') || low.includes('mukacevo');

  if (s < 2) {
    return res(
      'CZE',
      name,
      _note ? `${_note} — Československá republika (Južné Slovensko / Podkarpatsko)` : 'Krajina Slovenská (Československá republika)',
      undefined,
      isSouthRuthenia ? 'Československá republika — Podkarpatská Rus' : 'Československá republika — Južné Slovensko'
    );
  }

  if (isSouthRuthenia) {
    if (s >= 19) {
      return res(
        'SOV',
        s >= 20
          ? "Užgorod & Mukačevo (Oblast' della Transcarpazia — RSS Ucraina, Dic. 1947)"
          : "Užgorod & Mukačevo (Zakarpatskaya Oblast' — RSS Ucraina, 1947)",
        s >= 20
          ? "Dicembre 1947 (Zakarpatskaya Oblast', RSS Ucraina): completata l'integrazione giuridico-monetaria nella RSS Ucraina con la riforma del rublo (14-16 dicembre), la chiusura della frontiera con Cecoslovacchia e Ungheria e la sovietizzazione rurale."
          : "Settembre 1947 (Zakarpatskaya Oblast', RSS Ucraina): istituita formalmente il 22 gennaio 1946 dopo il trattato sovietico-cecoslovacco del giugno 1945; nazionalizzazione delle foreste e delle imprese di Užgorod e Mukačevo.",
        'Comintern',
        'Zakarpatskij Oblispolkom — RSS Ucraina (URSS)'
      );
    }
    if (s === 18) {
      return res(
        'SOV',
        'Zakarpatska Ukrajina (Užhorod e Mukačevo — Annessa alla RSS Ucraina, 1945)',
        "Settembre 1945: in virtù del Trattato sovietico-cecoslovacco di Mosca del 29 giugno 1945, la Rutenia Subcarpatica viene ceduta formalmente all'URSS ed entra nella fase di incorporazione nella RSS Ucraina.",
        'Comintern',
        'Consiglio Popolare della Zakarpatska Ukrajina — URSS'
      );
    }
    if (s >= 16) {
      return res(
        'SOV',
        'Zakarpatska Ukrajina (Užhorod e Mukačevo — URSS)',
        'Offensiva dei Carpazi Orientali (ottobre-novembre 1944): espugnata Užhorod (27 ottobre) e Mukačevo; il 26 novembre 1944 il Congresso dei Comitati Popolari proclama la riunificazione con la RSS Ucraina.',
        'Comintern',
        'Zakarpatska Ukrajina — URSS'
      );
    }
    return res(
      'HUN',
      name,
      _note ? `${_note} — Kárpátalja (Magyar Királyság — Első bécsi döntés)` : 'Kárpátalja / Ungvár és Munkács (Első bécsi döntés, nov 1938)',
      s >= 7 ? 'Asse' : 'Neutrale',
      'Magyar Királyság — Visszatért Kárpátalja (Felvidék)'
    );
  }

  if (s >= 23) {
    const kraj = getSlovakKrajLabel(low);
    return res(
      'CZE',
      `${name} (${kraj} — Cecoslovacchia Socialista, Riforma 1949)`,
      `Dal 1° gennaio 1949 la Slovacchia meridionale reintegrata è ripartita nei nuovi Kraje socialisti (${kraj}) sotto il governo di Praga e il Corpo dei Commissari slovacco.`,
      'Comintern',
      `Československá republika — ${kraj} (KSČ)`
    );
  }
  if (s >= 17) {
    return res(
      'CZE',
      s >= 21
        ? `${name} (Južné Slovensko — Repubblica Cecoslovacca Socialista, Giugno 1948)`
        : `${name} (Južné Slovensko Reintegrované — Apríl 1945)`,
      s >= 21
        ? "Dopo il colpo di Stato di Praga (25 febbraio 1948) e la Costituzione del 9 maggio 1948 sotto il presidente Klement Gottwald, la Slovacchia meridionale fa parte della Repubblica Cecoslovacca socialista allineata al blocco sovietico."
        : "Aprile 1945: con la liberazione della Slovacchia meridionale (Komárno, Lučenec, Rožňava, Košice) da parte dell'Armata Rossa e l'annullamento del Primo Arbitrato di Vienna, il territorio viene reintegrato nella Repubblica Cecoslovacca restaurata.",
      s >= 21 ? 'Comintern' : 'Alleati',
      'Československá republika — Južné Slovensko'
    );
  }

  return res(
    'HUN',
    name,
    _note ? `${_note} — Felvidék (Magyar Királyság — Első bécsi döntés)` : 'Felvidék (Magyar Királyság — Első bécsi döntés, 2 nov 1938)',
    s >= 7 ? 'Asse' : 'Neutrale',
    'Magyar Királyság — Visszatért Felvidék'
  );
}

// Slovak-Hungarian Little War strip (Sobrance, Stakčín, Ulič): CZE (0-2) -> SLO (3) -> HUN (4-16) -> CZE (17+)
export function resolveLittleWar(
  s: number,
  name: string,
  _itName: string,
  _deName: string,
  _note: string
): ResolvedTerritory {
  if (s >= 23) {
    return res(
      'CZE',
      `${name} (Prešovský kraj — Cecoslovacchia Socialista, 1949)`,
      "Dal 1° gennaio 1949 la fascia di Sobrance, Stakčín e Snina confluisce nel Prešovský kraj della Cecoslovacchia socialista, lungo il nuovo confine con la RSS Ucraina.",
      'Comintern',
      'Československá republika — Prešovský kraj (KSČ)'
    );
  }
  if (s >= 21) {
    return res(
      'CZE',
      `${name} (Východné Slovensko — Cecoslovacchia Socialista, 1948)`,
      'Dopo il colpo di Stato di Praga (febbraio 1948) e la Costituzione del 9 maggio 1948, lo Zemplín orientale appartiene stabilmente alla Cecoslovacchia socialista.',
      'Comintern',
      'Československá republika — Slovensko (Zbor povereníkov · KSČ)'
    );
  }
  if (s >= 17) {
    return res(
      'CZE',
      `${name} (Reintegrato nella ČSR — Annullamento Protocollo del 4 Aprile 1939)`,
      "Aprile 1945: annullata l'annessione ungherese della 'Piccola Guerra' del 1939; Sobrance, Stakčín, Ulič e Ubľa tornano alla Slovacchia cecoslovacca (mentre la vicina Rutenia passa all'URSS).",
      'Alleati',
      'Československá republika — Slovensko'
    );
  }
  if (s < 2) {
    return res(
      'CZE',
      name,
      _note ? `${_note} — Krajina Slovenská (Zemplín)` : 'Krajina Slovenská — Zemplín (Československá republika)',
      undefined,
      'Československá republika — Krajina Slovenská'
    );
  }
  if (s === 2) {
    return res(
      'CZE',
      name,
      'Autonómna Slovenská krajina (Druhá republika) — Rimasta slovacca dopo il Primo Arbitrato di Vienna (2 nov 1938), prima dell\'offensiva ungherese del marzo 1939.',
      undefined,
      'Česko-Slovenská republika — Autonómna Slovenská krajina'
    );
  }
  if (s === 3) {
    return res(
      'SLO',
      'Sobrance & Stakčín (Slovenská republika — Vigilia della "Piccola Guerra")',
      '14–23 marzo 1939: distretti orientali della neoproclamata Slovacchia di Tiso difesi dalla 21ª Squadriglia di Spišská Nová Ves e dall\'esercito slovacco allo scoppio della "Piccola Guerra" contro l\'Ungheria.',
      'Fantoccio',
      'Slovenská republika (Zona di operazioni orientali · Mar 1939)'
    );
  }
  return res(
    'HUN',
    'Kárpátalja Orientale / Szobránc & Sztakcsin (Magyar Királyság)',
    'Protocollo di Budapest del 4 aprile 1939 al termine della "Piccola Guerra" slovacco-ungarica (Malá vojna, 23 mar – 4 apr 1939): l\'Ungheria ottiene 1.697 km² con Sobrance, Stakčín, Ulič e Ubľa per estendere la zona cuscinetto ad ovest dell\'Už.',
    s >= 7 ? 'Asse' : 'Neutrale',
    'Magyar Királyság — Kárpátaljai Kormányzóság (Szobránc / Ung vármegye)'
  );
}

// Carpatho-Ukraine (North / Chust): CZE (Step 0-1) -> Autonomous Chust (Step 2) -> HUN (Step 3-15) -> SOV (Step 16+)
export function resolveCarpathoUkraine(
  s: number,
  _name: string,
  _itName: string,
  _deName: string,
  _note: string
): ResolvedTerritory {
  if (s < 2) {
    return res(
      'CZE',
      'Podkarpatská Rus',
      _note ? `${_note} — Krajina Podkarpatoruská` : 'Krajina Podkarpatoruská (Československá republika)',
      undefined,
      'Československá republika — Podkarpatská Rus'
    );
  }
  if (s === 2) {
    return res(
      'CZE',
      'Karpatska Ukrajina (Chust)',
      _note ? `${_note} — Karpatska Ukrajina (Chust)` : 'Karpatska Ukrajina — Avtonomnyj kraj (Chust)',
      undefined,
      'Česko-Slovenská republika — Karpatska Ukrajina'
    );
  }
  if (s >= 19) {
    return res(
      'SOV',
      s >= 20
        ? "Chust & Transcarpazia (Zakarpatskaya Oblast' — RSS Ucraina, Dic. 1947)"
        : "Chust & Transcarpazia (Zakarpatskaya Oblast' — RSS Ucraina, 1947)",
      s >= 20
        ? "Dicembre 1947 (Zakarpatskaya Oblast', RSS Ucraina): collettivizzazione incipiente nelle valli carpatiche attorno a Chust, riforma monetaria sovietica del 14-16 dicembre e presidio militare lungo i Carpazi."
        : "Settembre 1947 (Zakarpatskaya Oblast', RSS Ucraina): istituita formalmente il 22 gennaio 1946; integrazione forestale, amministrativa ed educativa nel sistema sovietico della RSS Ucraina.",
      'Comintern',
      'Zakarpatskij Oblispolkom — RSS Ucraina (URSS)'
    );
  }
  if (s === 18) {
    return res(
      'SOV',
      "Chust (Zakarpatska Ukrajina — Cessione all'URSS, 1945)",
      "Settembre 1945: ratificato il Trattato del 29 giugno 1945 fra Mosca e Praga che trasferisce la Rutenia Subcarpatica all'Unione Sovietica; transizione verso l'Oblast' della Transcarpazia (RSS Ucraina).",
      'Comintern',
      'Consiglio Popolare della Zakarpatska Ukrajina — URSS'
    );
  }
  if (s >= 16) {
    return res(
      'SOV',
      'Zakarpatska Ukrajina (Chust)',
      "Offensiva dei Carpazi Orientali (ottobre-novembre 1944): l'Armata Rossa libera Chust e l'intera Carpato-Ucraina; il territorio viene integrato nell'amministrazione sovietica della Transcarpazia.",
      'Comintern',
      'Zakarpatska Ukrajina — URSS'
    );
  }
  return res(
    'HUN',
    'Kárpátalja',
    _note ? `${_note} — Kárpátaljai Kormányzóság (Magyar Királyság)` : 'Kárpátaljai Kormányzóság (Magyar Királyság, 15-18 mar 1939)',
    s >= 7 ? 'Asse' : 'Neutrale',
    'Magyar Királyság — Kárpátaljai Kormányzóság'
  );
}
