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
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return 'Anglo-Egyptian Sudan — Southern Provinces (Juba)';
      if (s <= 5) return 'Southern Sudan — Closed Districts (Wartime Readiness)';
      if (s <= 7) return 'Equatoria & Upper Nile (Frontier Defense — Equatorial Corps)';
      return 'Southern Provinces / Equatoria (Allied Nile Front — Juba Command)';
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return 'Anglo-Egyptian Condominium — Closed Districts Administration (Juba)';
      if (s <= 5) return 'Condominium Southern Provinces — Equatoria Command (Juba)';
      return 'Sudan Defence Force — Equatorial Corps & Juba District Command';
    },
    getSovereign(s: number): string {
      return 'UK';
    },
    getFaction(s: number): FactionType {
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
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return 'Anglo-Egyptian Sudan (Khartoum)';
      if (s <= 5) return 'Anglo-Egyptian Sudan (General Mobilization — Khartoum)';
      if (s <= 7) return 'Sudan Front — SDF & Middle East Command (Khartoum)';
      return 'Anglo-Egyptian Sudan (Victory in East Africa — Gen. William Platt)';
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return 'Anglo-Egyptian Condominium (Gov. Gen. Sir Stewart Symes — Khartoum)';
      if (s <= 5) return 'Condominium Administration & Middle East Command';
      return 'Anglo-Egyptian Condominium (Gov. Gen. Sir Hubert Huddleston / Ka\'id William Platt)';
    },
    getSovereign(s: number): string {
      return 'UK';
    },
    getFaction(s: number): FactionType {
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
