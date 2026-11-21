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

export interface SudanProvinceInfo {
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

export const SUDAN_PROVINCES_META: Record<string, SudanProvinceInfo> = {
  SSD: {
    id: 'SSD',
    iso: 'SS',
    cntrCode: 'SS',
    name: 'South Sudan',
    modernName: 'South Sudan',
    historicalName: 'Anglo-Egyptian Sudan — Southern Provinces (Juba)',
    adminTitle: 'Anglo-Egyptian Condominium — Closed Districts Administration (Juba)',
    capital: 'Juba',
    region: 'Equatoria, Bahr el Ghazal & Upper Nile',
    historicalToponym: 'Juba (Equatoria / Southern Sudan)',
    s0_1: '1936-1937: Province meridionali del Sudan Anglo-Egiziano (Equatoria, Bahr el Ghazal, Upper Nile), amministrate da Juba sul Nilo Bianco sotto il regime speciale dei "Closed Districts Ordinances" e della "Southern Policy" britannica (Sir Harold MacMichael). Il territorio è rigidamente isolato dall\'influenza arabo-islamica del Nord: l\'inglese e le lingue nilotiche autoctone (Dinka, Nuer, Shilluk, Bari) sono le uniche autorizzate, mentre l\'istruzione è affidata alle missioni cristiane (Comboniani cattolici a Juba e Wau, CMS anglicana a Malakal). L\'Equatorial Corps della Sudan Defence Force (SDF) presidia il confine con l\'Africa Orientale Italiana.',
    s2_4: '1938 - Settembre 1939: Consolidamento della grande Provincia di Equatoria (governatore Martin Parr) con capoluogo a Juba, cerniera geopolitica tra il Sudan e i protettorati britannici dell\'Uganda e del Kenya, nonché il Congo Belga. Con lo scoppio della guerra in Europa (settembre 1939), il Sud Sudan entra in stato di mobilitazione difensiva: la navigazione fluviale sui vapori del Nilo e le piste verso Entebbe e Kisumu garantiscono la continuità logistica con l\'Impero.',
    s5: 'Novembre 1939 - Maggio 1940: Vigilanza rafforzata lungo i 600 km di frontiera con l\'Etiopia occupata dagli italiani (Governi di Galla e Sidama e dell\'Amara nell\'AOI). L\'Equatorial Corps della SDF disloca pattuglie mobili da Torit e Kapoeta fino a Boma e Akobo per sorvegliare i movimenti delle bande di "shifta" e degli àscari italiani lungo i fiumi Pibor e Baro.',
    s6: 'Giugno - Agosto 1940: Entrata in guerra dell\'Italia fascista (10 giugno 1940). A inizio luglio colonne dell\'AOI conquistano la postazione di frontiera di Kurmuk sul Nilo Azzurro/Upper Nile e premono verso il Nilo Bianco. L\'Equatorial Corps a Torit e le compagnie della SDF, pur prive di artiglieria pesante e carri armati, conducono una tenace guerra di movimento e imboscate nella savana, negando agli italiani qualsiasi sfondamento verso Juba o Malakal.',
    s7: 'Autunno 1940: Nomina del Governatore Generale Sir Hubert Huddleston a Khartoum. Il Sud Sudan diviene retrovia sicura e piattaforma di concentramento truppe: i battaglioni del King\'s African Rifles (KAR) dal Kenya e le forze della Francia Libera (dall\'AEF di Félix Éboué e Saint-Mart) transitano per il Sud Sudan per congiungersi alle forze di difesa dell\'Impero.',
    s8: 'Aprile 1941: Riconquista e vittoria in Africa Orientale. Dalle basi dell\'Upper Nile e dell\'Equatoria, le colonne britannico-sudanesi riprendono Kurmuk, respingono le truppe italiane oltre il confine e avanzano verso l\'altopiano etiope a supporto della rivolta dei patrioti Arbegnoch e dell\'avanzata alleata su Addis Abeba (liberata il 6 aprile 1941). La rotta nilotica Juba-Khartoum è pienamente protetta e consolidata.',
    getNote(s: number): string {
      if (s >= 33) return '1° Gennaio – 31 Dicembre 1956 (Repubblica del Sudan Sovrana · Prima Guerra Civile Sudanese): con l\'indipendenza del Sudan (1° gennaio 1956), cessa il condominio anglo-egiziano e le tre province meridionali (Equatoria, Bahr el Ghazal, Upper Nile) passano sotto sovranità della Repubblica del Sudan (Khartoum), pur restando scosse dalla guerriglia separatista seguita all\'ammutinamento di Torit (18 agosto 1955) tra ex ribelli dell\'Equatorial Corps e reparti nord-sudanesi.';
      if (s >= 32) return '18 Agosto – 31 Dicembre 1955 (Condominio Anglo-Egiziano · Ammutinamento di Torit & Scoppio Prima Guerra Civile Sudanese): il 18 agosto 1955 le compagnie meridionali dell\'Equatorial Corps insorgono a Torit contro gli ufficiali nord-sudanesi e l\'amministrazione di Khartoum, accendendo la ribellione armata e la guerra civile in Equatoria, Bahr el Ghazal e Upper Nile. Sul piano giuridico internazionale, fino al 1° gennaio 1956 il Sudan rimane formalmente Condominio Anglo-Egiziano sotto l\'Alto Commissariato/Governatorato britannico di Sir Alexander Knox Helm.';
      if (s >= 30) return '12 Febbraio – 31 Dicembre 1953 (Condominio Anglo-Egiziano in Transizione all\'Autogoverno): dopo l\'Accordo Anglo-Egiziano sul Sudan del 12 febbraio 1953 tra Londra e la nuova dirigenza egiziana (Naguib), si tengono nel novembre–dicembre 1953 le prime elezioni parlamentari nazionali (vittoria del Partito Unionista Nazionale di Ismail al-Azhari), mentre il Governatore Generale britannico Sir Robert Howe mantiene l\'amministrazione del Sudan verso l\'autogoverno.';
      if (s >= 28) return 'Ottobre – 31 Dicembre 1951 (100% Amministrazione Effettiva Britannica): nell\'ottobre 1951 il Parlamento egiziano abroga unilateralmente il Trattato del 1936 e la Convenzione di Condominio del 1899 proclamando Re Faruq "Re d\'Egitto e del Sudan", ma il Regno Unito rifiuta di riconoscere l\'atto unilaterale del Cairo e mantiene il pieno ed esclusivo controllo amministrativo e militare sul Sudan meridionale (Equatoria, Bahr el Ghazal, Upper Nile) e sull\'intero Sudan Anglo-Egiziano sotto il Governatore Generale Sir Robert Howe.';
      if (s >= 19) return 'Giugno - Settembre 1947: Conferenza di Juba (12-13 giugno 1947) convocata dal segretario civile britannico James Robertson con i capi meridionali e i nazionalisti nord-sudanesi; apertura del processo di integrazione delle tre province meridionali (Equatoria, Bahr el Ghazal, Upper Nile) nell\'Assemblea Legislativa di Khartoum in vista dell\'unità del Sudan.';
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s >= 33) return 'Republic of Sudan — Southern Provinces (Equatoria, Bahr el Ghazal, Upper Nile · Prima Guerra Civile Sudanese)';
      if (s >= 32) return 'Anglo-Egyptian Sudan — Southern Provinces (Insurrezione Armata / Guerra Civile · Ammutinamento di Torit 18 Ago 1955)';
      if (s >= 30) return 'Anglo-Egyptian Sudan — Southern Provinces (Transizione all\'Autogoverno · Accordo Anglo-Egiziano 12 Feb 1953)';
      if (s >= 28) return 'Anglo-Egyptian Sudan — Southern Provinces (100% Amministrazione Effettiva Britannica · Abrogazione Egiziana Non Riconosciuta, Ott 1951)';
      if (s >= 19) return 'Anglo-Egyptian Sudan — Southern Provinces (Post-Conferenza di Juba 1947)';
      if (s <= 3) return 'Anglo-Egyptian Sudan — Southern Provinces (Juba)';
      if (s <= 5) return 'Southern Sudan — Closed Districts (Wartime Readiness)';
      if (s <= 7) return 'Equatoria & Upper Nile (Frontier Defense — Equatorial Corps)';
      return 'Southern Provinces / Equatoria (Allied Nile Front — Juba Command)';
    },
    getAdminTitle(s: number): string {
      if (s >= 33) return 'Repubblica del Sudan — Province Meridionali (Juba · Stato d\'Emergenza & Guerriglia Separatista del Sud)';
      if (s >= 32) return 'Anglo-Egyptian Condominium (Gov. Gen. Sir Alexander Knox Helm · Insurrezione del Sud — Torit, 18 Ago 1955 · Pre-Indipendenza 1° Gen 1956)';
      if (s >= 30) return 'Anglo-Egyptian Sudan (Gov. Gen. Sir Robert Howe · Accordo di Autogoverno 12 Feb & Elezioni Nov–Dic 1953)';
      if (s >= 28) return 'British Administration of Anglo-Egyptian Sudan — Juba (Gov. Gen. Sir Robert Howe · Abrogazione Egiziana del 1951 Respinta da Londra)';
      if (s >= 19) return 'Anglo-Egyptian Condominium — Juba Administration (Gov. Gen. Sir Robert Howe)';
      if (s <= 3) return 'Anglo-Egyptian Condominium — Closed Districts Administration (Juba)';
      if (s <= 5) return 'Condominium Southern Provinces — Equatoria Command (Juba)';
      return 'Sudan Defence Force — Equatorial Corps & Juba District Command';
    },
    getSovereign(s: number): string {
      if (s >= 33) return 'SUD';
      return 'UK';
    },
    getFaction(s: number): FactionType {
      if (s >= 33) return 'Neutrale';
      return s >= 4 ? 'Alleati' : 'Neutrale';
    },
  },

  SUD: {
    id: 'SUD',
    iso: 'SD',
    cntrCode: 'SD',
    name: 'Sudan',
    modernName: 'Sudan',
    historicalName: 'Anglo-Egyptian Sudan (Khartoum)',
    adminTitle: 'Anglo-Egyptian Condominium (British Governed — Khartoum)',
    capital: 'Khartoum',
    region: 'Northern & Central Sudan',
    historicalToponym: 'Khartoum (Anglo-Egyptian Sudan)',
    s0_1: '1936-1937: Condominio anglo-egiziano retto da un Governatore Generale britannico a Khartoum (Sir George Stewart Symes). Con il Trattato Anglo-Egiziano del 1936, la Gran Bretagna mantiene il controllo effettivo civile e militare dell\'intero paese. La Sudan Defence Force (SDF), creata nel 1925, presidia le province settentrionali (Khartoum, Blue Nile, Kordofan, Darfur, Kassala) a ridosso dell\'Eritrea e dell\'Etiopia cadute sotto sovranità italiana.',
    s2_4: '1938 - Settembre 1939: Piani di difesa per Port Sudan sul Mar Rosso e per la ferrovia strategica Khartoum-Wadi Halfa-Cairo. Allo scoppio del conflitto mondiale (settembre 1939), il Governatore Generale Symes mobilita la SDF per garantire la sicurezza del Canale di Suez e la continuità dell\'asse imperiale "Cairo to Cape".',
    s5: 'Novembre 1939 - Maggio 1940: Fase di attesa e sorveglianza militare. Le forze della SDF (comandate dal Tenente Generale William Platt, il Ka\'id) contano appena 4.500 uomini e un pugno di squadriglie della RAF contro le imponenti armate italiane dell\'Africa Orientale Italiana (AOI) guidate dal Duca d\'Aosta. I ponti sul Nilo e i nodi telegrafici vengono militarizzati.',
    s6: 'Giugno - Agosto 1940: 10 Giugno 1940: L\'Italia dichiara guerra agli Alleati. Il 4 luglio le forze dell\'AOI sferrano l\'offensiva conquistando Kassala e Gallabat sulla frontiera orientale del Sudan. Il comandante della SDF, William Platt, attua una dottrina di difesa elastica e azioni mordi-e-fuggi con autoblindo e cammellieri della SDF, contenendo il nemico e impedendo ogni sfondamento verso Port Sudan o Atbara.',
    s7: 'Autunno 1940: Ottobre 1940: Sir Hubert Huddleston subentra a Symes come Governatore Generale. Il Sudan diviene la base di lancio della controffensiva britannica nel teatro dell\'Africa Orientale: Platt riceve in rinforzo la 4th e 5th Indian Infantry Division, squadriglie di caccia Hurricane e reparti dell\'AEF della Francia Libera del Ciad.',
    s8: 'Aprile 1941: Storica riscossa e annientamento dell\'AOI: a gennaio le forze anglo-sudanesi di William Platt riconquistano Kassala e Gallabat; tra febbraio e marzo espugnano l\'impervia fortezza di Keren (Cheren) in Eritrea dopo una celebre battaglia d\'assedio. Il 1° aprile cade Asmara e l\'8 aprile cade Massaua sul Mar Rosso, liberando la rotta marittima per i rifornimenti navali statunitensi verso l\'Egitto.',
    getNote(s: number): string {
      if (s >= 33) return '1° Gennaio – 31 Dicembre 1956 (Repubblica del Sudan — Indipendenza): il 1° gennaio 1956 cessa il condominio del Sudan Anglo-Egiziano e nasce lo Stato sovrano della Repubblica del Sudan con capitale Khartoum (Primo Ministro Ismail al-Azhari fino al luglio 1956, poi Abdallah Khalil del partito Umma). Il Sudan aderisce alla Lega Araba (19 gennaio) e alle Nazioni Unite (12 novembre 1956), mentre nelle province meridionali prosegue la guerriglia della Prima Guerra Civile.';
      if (s >= 32) return '31 Dicembre 1955 (Vigilia dell\'Indipendenza — Condominio Anglo-Egiziano): il 19 dicembre 1955 il Parlamento sudanese guidato dal Premier Ismail al-Azhari vota la dichiarazione d\'indipendenza con effetto dal 1° gennaio 1956. Al 31 dicembre 1955 il Sudan resta pertanto ancora formalmente Condominio Anglo-Egiziano (Governatore Generale Sir Alexander Knox Helm), mentre le tre province meridionali sono scosse dall\'insurrezione armata seguita all\'ammutinamento di Torit (18 agosto 1955).';
      if (s >= 30) return '12 Febbraio – 31 Dicembre 1953 (Condominio Anglo-Egiziano in Transizione all\'Autogoverno): con l\'Accordo Anglo-Egiziano sul Sudan del 12 febbraio 1953 il Regno Unito e la Repubblica d\'Egitto avviano un periodo transitorio triennale di autogoverno; le prime elezioni parlamentari del novembre–dicembre 1953 vedono la vittoria del NUP di Ismail al-Azhari sotto la supervisione del Governatore Generale britannico Sir Robert Howe a Khartoum.';
      if (s >= 28) return 'Ottobre – 31 Dicembre 1951 (100% Amministrazione Effettiva Britannica): nell\'ottobre 1951 il governo egiziano di Mustafa el-Nahhas Pasha abroga unilateralmente il Trattato Anglo-Egiziano del 1936 e il Condominio del 1899 proclamando Re Faruq "Re d\'Egitto e del Sudan". Londra respinge formalmente la proclamazione unilaterale egiziana e mantiene il 100% dell\'amministrazione effettiva civile e militare sul Sudan Anglo-Egiziano a Khartoum (Governatore Generale Sir Robert Howe), accelerando i lavori della commissione costituzionale per l\'autogoverno sudanese.';
      if (s >= 19) return 'Estate - Settembre 1947: Il Condominio Anglo-Egiziano è al centro del contenzioso diplomatico tra Londra e Il Cairo davanti al Consiglio di Sicurezza dell\'ONU (luglio-settembre 1947). Sotto il Governatore Generale britannico Sir Robert Howe, il Congresso dei Diplomati di Ismail al-Azhari (Ashigga) chiede l\'unità della Valle del Nilo mentre il partito Umma rivendica l\'indipendenza separata del Sudan.';
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s >= 33) return 'Republic of the Sudan (Repubblica del Sudan — Indipendenza 1° Gen 1956 · Khartoum)';
      if (s >= 32) return 'Anglo-Egyptian Sudan (Condominio alla Vigilia dell\'Indipendenza 1° Gen 1956 · Gov. Gen. Sir A. Knox Helm — Khartoum)';
      if (s >= 30) return 'Anglo-Egyptian Sudan (Condominio in Transizione all\'Autogoverno — Accordo del 12 Febbraio & Elezioni 1953 · Khartoum)';
      if (s >= 28) return 'Anglo-Egyptian Sudan (100% Amministrazione Effettiva Britannica a Khartoum · Titolo Egiziano di Re Faruq Non Riconosciuto, Ott–Dic 1951)';
      if (s >= 19) return 'Anglo-Egyptian Sudan (Condominio Britannico — Khartoum 1947)';
      if (s <= 3) return 'Anglo-Egyptian Sudan (Khartoum)';
      if (s <= 5) return 'Anglo-Egyptian Sudan (General Mobilization — Khartoum)';
      if (s <= 7) return 'Sudan Front — SDF & Middle East Command (Khartoum)';
      return 'Anglo-Egyptian Sudan (Victory in East Africa — Gen. William Platt)';
    },
    getAdminTitle(s: number): string {
      if (s >= 33) return 'Repubblica del Sudan — Governo Parlamentare Sovrano (Khartoum · PM Ismail al-Azhari / Abdallah Khalil)';
      if (s >= 32) return 'Anglo-Egyptian Condominium — Khartoum (Gov. Gen. Sir A. Knox Helm · PM Ismail al-Azhari · Pre-Indipendenza 1° Gen 1956)';
      if (s >= 30) return 'British Administration of Anglo-Egyptian Sudan — Khartoum (Gov. Gen. Sir Robert Howe · Accordo 12 Feb 1953)';
      if (s >= 28) return 'British Administration of Anglo-Egyptian Sudan (Gov. Gen. Sir Robert Howe — Khartoum · Abrogazione Egiziana Ott 1951 Non Riconosciuta)';
      if (s >= 19) return 'Anglo-Egyptian Condominium (Gov. Gen. Sir Robert Howe — Khartoum)';
      if (s <= 3) return 'Anglo-Egyptian Condominium (Gov. Gen. Sir Stewart Symes — Khartoum)';
      if (s <= 5) return 'Condominium Administration & Middle East Command';
      return 'Anglo-Egyptian Condominium (Gov. Gen. Sir Hubert Huddleston / Ka\'id William Platt)';
    },
    getSovereign(s: number): string {
      if (s >= 33) return 'SUD';
      return 'UK';
    },
    getFaction(s: number): FactionType {
      if (s >= 33) return 'Neutrale';
      return s >= 4 ? 'Alleati' : 'Neutrale';
    },
  },
};

/**
 * Risolve un'entità del Sudan o Sud Sudan tenendo conto della timeline (step 0-8).
 */
export function resolveSudanProvince(
  idOrKey: string,
  s: number,
  ctx?: any
): ResolvedTerritory | null {
  if (!idOrKey) return null;
  const k = idOrKey.toLowerCase().trim();

  // Esclusione categorica di AEF, territori francesi, Soudan Français o altri teatri
  if (
    k.includes('french') ||
    k.includes('français') ||
    k.includes('française') ||
    k.includes('soudan') ||
    k.includes('aef') ||
    k.includes('equatorial africa') ||
    k.includes('équatoriale')
  ) {
    return null;
  }

  let meta: SudanProvinceInfo | undefined;

  if (
    k.includes('south sudan') ||
    k.includes('sud sudan') ||
    k.includes('southern provinces') ||
    k.includes('juba') ||
    (k.includes('equatoria') && !k.includes('equatorial')) ||
    k.includes('bahr el ghazal') ||
    k.includes('upper nile') ||
    k === 'ssd' ||
    k === 'ss'
  ) {
    meta = SUDAN_PROVINCES_META['SSD'];
  } else if (
    k.includes('sudan') ||
    k.includes('khartoum') ||
    k === 'sud' ||
    k.startsWith('sud_') ||
    k === 'sd' ||
    k === 'sdn' ||
    k === '729' ||
    k === '736'
  ) {
    meta = SUDAN_PROVINCES_META['SUD'];
  }

  if (!meta) return null;

  const sov = meta.getSovereign(s, ctx);
  const fac = meta.getFaction(s, ctx);
  const histName = meta.getHistoricalName(s);
  const adm = meta.getAdminTitle(s);
  const note = meta.getNote(s);

  return makeResult(sov, histName, note, fac, adm);
}

/**
 * Popola il dizionario storico con toponimi e denominazioni per Sudan e Sud Sudan.
 */
export function populateSudanToponyms(dict: Record<string, any>): void {
  if (!dict['UK']) dict['UK'] = {};

  for (const key of ['SSD', 'SUD']) {
    const item = SUDAN_PROVINCES_META[key];
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

    dict['UK'][normName] = match;
    dict['UK'][lowId] = match;
    dict['UK'][lowIso] = match;

    // Flat compatibility
    dict[lowId] = match;
    dict[lowIso] = match;
    dict[normName] = match;
  }
}
