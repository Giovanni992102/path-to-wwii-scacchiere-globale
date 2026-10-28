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

export interface NamibiaProvinceInfo {
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

export const NAMIBIA_PROVINCES_META: Record<string, NamibiaProvinceInfo> = {
  SAF_SWA: {
    id: 'SAF_SWA',
    iso: 'NA',
    cntrCode: 'NA',
    name: 'South West Africa',
    modernName: 'Namibia',
    historicalName: 'Suidwes-Afrika / South West Africa (Windhoek)',
    adminTitle: 'League of Nations Mandate (Union of South Africa)',
    capital: 'Windhoek',
    region: 'South West Africa',
    historicalToponym: 'Suidwes-Afrika (Windhoek)',
    s0_1: '1936-1937: Mandato di Classe C della Società delle Nazioni amministrato dall\'Unione Sudafricana (Amministratore David Gideon Conradie). Il territorio è scosso dalle frizioni tra i coloni boero-britannici e la minoranza tedesca (Deutscher Bund für Südwestafrika) galvanizzata dalla propaganda nazionalsocialista del Terzo Reich. La Commissione van Zyl suggerisce di incorporare il SWA come quinta provincia dell\'Unione, suscitando le vibranti proteste diplomatiche di Berlino a Ginevra.',
    s2_4: '1938 - Settembre 1939: Alta tensione per le attività della gioventù hitleriana e delle cellule NSDAP/Auslandsorganisation. Nell\'aprile 1939 il governo di Pretoria invia 300 agenti armati della South African Police a presidiare Windhoek e Swakopmund per sventare tentativi di sovversione. Il 6 settembre 1939, con l\'insediamento del Generale Jan Smuts a Primo Ministro dell\'Unione Sudafricana, il SWA entra formalmente in guerra a fianco della Gran Bretagna.',
    s5: 'Novembre 1939 - Maggio 1940: Applicazione delle leggi d\'emergenza bellica nel SWA. Centinaia di residenti tedeschi di cittadinanza del Reich vengono arrestati e internati nei campi di sicurezza dell\'Unione (Andalusia e Baviaanspoort). Reclutamento di volontari per la Union Defence Force (UDF) tra la popolazione locale e controllo serrato delle comunicazioni radio e costiere.',
    s6: 'Giugno - Agosto 1940: Dichiarazione di guerra all\'Italia fascista (11 giugno 1940). Le truppe sudafricane della 1st South African Infantry Division partono per l\'Africa Orientale (Kenya). La costa del South West Africa e le rotte atlantiche vengono sorvegliate da squadriglie marittime della South African Air Force (SAAF) da Windhoek e Walvis Bay contro corsari e sommergibili tedeschi.',
    s7: 'Autunno 1940: Mobilitazione economica e mineraria totale del Mandato. La Consolidated Diamond Mines (CDM) di Ernest Oppenheimer a Oranjemund, le miniere di piombo, zinco e vanadio di Tsumeb e Grootfontein e l\'allevamento di karakul forniscono valuta pregiata e materiali strategici vitali per lo sforzo bellico dell\'Impero Britannico.',
    s8: 'Aprile 1941: Mentre le divisioni del Sudafrica entrano vittoriose ad Addis Abeba (6 aprile 1941) sconfiggendo le forze dell\'AOI italiana, il South West Africa consolida la propria sicurezza interna. Smuts ribadisce che il Mandato costituisce parte integrante della sfera geostrategica sudafricana, escludendo ogni futura cessione territoriale a potenze straniere.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return 'Suidwes-Afrika / South West Africa (Windhoek)';
      if (s <= 5) return 'South West Africa — Mandated Territory (UDF Wartime Control)';
      if (s <= 7) return 'South West Africa (Allied War Mobilization — Windhoek)';
      return 'South West Africa / Suidwes-Afrika (Allied Base — Jan Smuts Administration)';
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return 'League of Nations Mandate (Union of South Africa — Administrator David G. Conradie)';
      if (s <= 5) return 'Union of South Africa Mandate (National Emergency Regulations)';
      return 'South African Mandate / Allied Strategic Territory (Gov. David G. Conradie)';
    },
    getSovereign(s: number): string {
      return 'SAF';
    },
    getFaction(s: number): FactionType {
      return s >= 4 ? 'Alleati' : 'Neutrale';
    },
  },

  WALVIS_BAY: {
    id: 'WALVIS_BAY',
    iso: 'ZA',
    cntrCode: 'ZA',
    name: 'Walvis Bay',
    modernName: 'Walvis Bay (Namibia)',
    historicalName: 'Walvis Bay (Exclave of the Union of South Africa)',
    adminTitle: 'Port and Settlement of Walvis Bay (Cape Province, South Africa)',
    capital: 'Walvis Bay',
    region: 'South Africa / Atlantic Coast',
    historicalToponym: 'Walvisbaai (Walvis Bay)',
    s0_1: '1936-1937: Porto franco ed exclave costiera atlantica appartenente de jure alla Provincia del Capo dell\'Unione Sudafricana (annessa dalla Corona britannica nel 1878 e incorporata nel 1884). Sebbene amministrata civilmente per prossimità dal South West Africa in base all\'Atto 24 del 1922, costituisce territorio sovrano inalienabile del Sudafrica e il principale sbocco portuale di acque profonde dell\'Africa Sud-Occidentale.',
    s2_4: '1938 - Settembre 1939: Con l\'entrata in guerra del Sudafrica il 6 settembre 1939 sotto il premier Jan Smuts, il porto di Walvis Bay viene elevato a punto di controllo strategico per l\'intercettazione delle navi mercantili tedesche in navigazione nell\'Atlantico meridionale e l\'interdizione del contrabbando verso il SWA.',
    s5: 'Novembre 1939 - Maggio 1940: Istituzione della Walvis Bay Naval Detachment e installazione di batterie costiere d\'artiglieria per la difesa del porto. La Seaward Defence Force (SDF) del Sudafrica avvia il pattugliamento delle acque territoriali contro incursioni di navi corsare come l\'Atlantis o l\'Orion della Kriegsmarine.',
    s6: 'Giugno - Agosto 1940: Dopo la caduta della Francia e l\'entrata in guerra dell\'Italia (giugno 1940), il Mediterraneo viene interdetto alla flotta mercantile alleata. Walvis Bay diviene una stazione di rifornimento carbone e scalo d\'emergenza di prim\'ordine lungo la circumnavigazione dell\'Africa (Cape Route) verso l\'Egitto e l\'India.',
    s7: 'Autunno 1940: Potenziamento della base aerea costiera per idrovolanti e aerei da pattugliamento della SAAF (South African Air Force). Il porto gestisce l\'imbarco dei concentrati di minerali strategici e delle scorte alimentari dirette in Gran Bretagna.',
    s8: 'Aprile 1941: Roccaforte atlantica consolidata della marina e dell\'aviazione sudafricana. Walvis Bay garantisce la protezione dei convogli oceanici WS ("Winston Specials") diretti in Medio Oriente attraverso il Capo di Buona Speranza, respingendo ogni minaccia sottomarina dell\'Asse.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return 'Walvis Bay (Exclave of the Union of South Africa)';
      if (s <= 5) return 'Walvis Bay Naval Station (Cape Province, South Africa)';
      return 'Walvis Bay Fortress & Allied Port (Union of South Africa)';
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return 'Port and Settlement of Walvis Bay (Cape Province Administration)';
      if (s <= 6) return 'South African Seaward Defence Force & Port Command (Walvis Bay)';
      return 'Union Defence Force — Walvis Bay Fortress Command';
    },
    getSovereign(s: number): string {
      return 'SAF';
    },
    getFaction(s: number): FactionType {
      return s >= 4 ? 'Alleati' : 'Neutrale';
    },
  },
};

/**
 * Risolve un'entità del South West Africa o Walvis Bay tenendo conto della timeline (step 0-8).
 */
export function resolveNamibiaProvince(
  idOrKey: string,
  s: number,
  ctx?: any
): ResolvedTerritory | null {
  if (!idOrKey) return null;
  const k = idOrKey.toLowerCase().trim();
  let meta: NamibiaProvinceInfo | undefined;

  if (k.includes('walvis') || k.includes('walbis') || k === 'walvis_bay') {
    meta = NAMIBIA_PROVINCES_META['WALVIS_BAY'];
  } else if (
    k.includes('south west africa') ||
    k.includes('south-west africa') ||
    k.includes('suidwes') ||
    k.includes('südwest') ||
    k.includes('namibia') ||
    k === 'saf_swa' ||
    k === 'na'
  ) {
    meta = NAMIBIA_PROVINCES_META['SAF_SWA'];
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
 * Popola il dizionario storico con toponimi e denominazioni per SWA e Walvis Bay.
 */
export function populateNamibiaToponyms(dict: Record<string, any>): void {
  if (!dict['SAF']) dict['SAF'] = {};

  for (const key of ['SAF_SWA', 'WALVIS_BAY']) {
    const item = NAMIBIA_PROVINCES_META[key];
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

    dict['SAF'][normName] = match;
    dict['SAF'][lowId] = match;
    dict['SAF'][lowIso] = match;

    // Flat compatibility
    dict[lowId] = match;
    dict[lowIso] = match;
    dict[normName] = match;
  }
}
