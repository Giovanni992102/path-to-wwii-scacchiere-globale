/**
 * Dettaglio Geocartografico Storico delle 106 Province dell'Indocina Francese (1936-1941)
 * Union Indochinoise (Gouvernement Général de l'Indochine)
 *
 * Copertura integrale di tutte le 106 province e territori:
 * - Cambogia: 25 province (Protectorat du Cambodge — Re Sisowath Monivong fino ad apr 1941, poi Norodom Sihanouk)
 * - Laos: 18 province (Protectorat du Laos — Regno di Luang Prabang con Re Sisavang Vong & Résidence Supérieure a Vientiane)
 * - Vietnam: 63 province suddivise nelle 3 regioni storiche:
 *   - Tonchino (Bắc Kỳ): 25 province (Capitale Hanoi, Haiphong, territori militari di frontiera sino-tonchinese)
 *   - Annam (Trung Kỳ): 19 province (Capitale Imperiale Huế con l'Imperatore Bảo Đại, Tourane, Baia di Cam Ranh, Altipiani)
 *   - Cocincina (Nam Kỳ): 19 province (Capitale Saigon-Cholon, Delta del Mekong, Grandi Concessioni Michelin)
 *
 * Evoluzione Geopolitica (Step 0 - 8):
 * - Step 0-1 (1936-mar 1938): Fronte Popolare (Léon Blum) e Governatore Jules Brévié; riforme e sviluppo delle infrastrutture.
 * - Step 2-4 (ott 1938-apr 1939): Presa giapponese di Canton e Hainan; la ferrovia Haiphong-Kunming diventa vitale per la Cina.
 * - Step 5 (set 1939-mag 1940): Scoppio della guerra in Europa, mobilitazione dei Tirailleurs Indochinois e governo Catroux.
 * - Step 6 (giu-ago 1940): Armistizio francese, allineamento al Regime di Vichy e nomina del Governatore Jean Decoux.
 * - Step 7 (sett 1940-feb 1941): Accordo di Hanoi (22 sett 1940), invasione/battaglia di Lạng Sơn, bombardamento di Haiphong e stazionamento giapponese; scoppio della Guerra Franco-Thailandese.
 * - Step 8 (apr-mag 1941): Battaglia navale di Koh Chang; Trattato di Tokyo (9 mag 1941) con cessione forzata a Phibunsongkhram di Battambang, Siem Reap, Sayaboury e Champasak; incoronazione di Norodom Sihanouk.
 */

import { ResolvedTerritory, FactionType } from '../types';
import { makeResult } from './georesolver';

export interface FrenchIndochinaProvinceInfo {
  id: string;
  cntrCode: 'KH' | 'LA' | 'VN';
  cntrName: string;
  name: string;
  nutsName: string;
  nameLatn: string;
  nameEngl: string;
  modernName: string;
  historicalName: string;
  historicalToponym: string;
  adminTitle: string;
  sovereign: string;
  overlord?: string;
  capital: string;
  subRegion: 'Cambodge' | 'Laos' | 'Tonkin' | 'Annam' | 'Cochinchine';
  regionKind: 'INDOCHINA_PROVINCE';
  faction: FactionType;
  s0_1: string;
  s2_4: string;
  s5_6: string;
  s7: string;
  s8: string;
  getNote: (s: number) => string;
  getFaction?: (s: number) => FactionType;
  getHistoricalName?: (s: number) => string;
  getAdminTitle?: (s: number) => string;
  getSovereign?: (s: number) => string;
}

export const FRENCH_INDOCHINA_PROVINCES_META: Record<string, FrenchIndochinaProvinceInfo> = {

  KH1: {
    id: "KH1",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Banteay Meanchey",
    nutsName: "Banteay Meanchey (បន្ទាយមានជ័យ)",
    nameLatn: "Banteay Meanchey",
    nameEngl: "Banteay Meanchey (Cambodia)",
    modernName: "Banteay Meanchey (បន្ទាយមានជ័យ)",
    historicalName: "Protectorat du Cambodge — Province de Sisophon",
    historicalToponym: "Sisophon",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Province de Sisophon",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Sisophon",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Sisophon). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Snodo di confine strategico nord-occidentale verso la Thailandia. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Sisophon). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Snodo di confine strategico nord-occidentale verso la Thailandia. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Snodo di confine strategico nord-occidentale verso la Thailandia.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Snodo di confine strategico nord-occidentale verso la Thailandia.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH1"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH1"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH1"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH1"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH1"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Province de Sisophon (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Province de Sisophon (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Province de Sisophon";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Province de Sisophon (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Province de Sisophon (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Province de Sisophon";
    },
  },
  KH2: {
    id: "KH2",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Battambang",
    nutsName: "Battambang (បាត់ដំបង)",
    nameLatn: "Battambang",
    nameEngl: "Battambang (Cambodia)",
    modernName: "Battambang (បាត់ដំបង)",
    historicalName: "Protectorat du Cambodge — Province de Battambang",
    historicalToponym: "Battambang / Phra Tabong",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Province de Battambang",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Battambang",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Battambang). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Granaio risicolo primario della Cambogia, contesa nella guerra franco-thailandese e ceduta temporaneamente a Phibun nel maggio 1941 col nome di Phra Tabong. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Battambang). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Granaio risicolo primario della Cambogia, contesa nella guerra franco-thailandese e ceduta temporaneamente a Phibun nel maggio 1941 col nome di Phra Tabong. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy). Post-Accordo di Hanoi del settembre 1940, mentre l'Esercito Giapponese staziona nel Tonchino, il regime thailandese di Plaek Phibunsongkhram lancia l'offensiva della Guerra Franco-Thailandese per rivendicare le province occidentali cambogiane. Granaio risicolo primario della Cambogia, contesa nella guerra franco-thailandese e ceduta temporaneamente a Phibun nel maggio 1941 col nome di Phra Tabong.",
    s8: "Territorio cambogiano ceduto al Regno di Thailandia (Siam) col Trattato di Pace di Tokyo del 9 maggio 1941 imposto dall'arbitrato giapponese dopo la vittoria navale francese di Koh Chang (provincia di Phra Tabong / Siam Nakhon). Nel contempo a Phnom Penh, alla morte di Re Monivong (aprile 1941), ascende al trono Re Norodom Sihanouk.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH2"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH2"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH2"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH2"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH2"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 8) return "Protectorat du Cambodge — Province de Battambang (Occupazione Siamese / Thailandia) [Trattato di Tokyo 1941]";
      if (s >= 7) return "Protectorat du Cambodge — Province de Battambang (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Province de Battambang (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Province de Battambang";
    },
    getAdminTitle: (s: number) => {
      if (s >= 8) return "Regno di Thailandia (Amministrazione Phibunsongkhram / Trattato di Tokyo 1941)";
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Province de Battambang (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Province de Battambang (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Province de Battambang";
    },
  },
  KH3: {
    id: "KH3",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Kampong Cham",
    nutsName: "Kampong Cham (កំពង់ចាម)",
    nameLatn: "Kampong Cham",
    nameEngl: "Kampong Cham (Cambodia)",
    modernName: "Kampong Cham (កំពង់ចាម)",
    historicalName: "Protectorat du Cambodge — Province de Kompong Cham",
    historicalToponym: "Kompong Cham",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Province de Kompong Cham",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Kompong Cham",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Kompong Cham). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Grande porto fluviale sul Mekong e centro delle grandi piantagioni coloniali di hevea e tabacco. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Kompong Cham). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Grande porto fluviale sul Mekong e centro delle grandi piantagioni coloniali di hevea e tabacco. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Grande porto fluviale sul Mekong e centro delle grandi piantagioni coloniali di hevea e tabacco.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Grande porto fluviale sul Mekong e centro delle grandi piantagioni coloniali di hevea e tabacco.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH3"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH3"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH3"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH3"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH3"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Province de Kompong Cham (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Province de Kompong Cham (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Province de Kompong Cham";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Province de Kompong Cham (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Province de Kompong Cham (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Province de Kompong Cham";
    },
  },
  KH4: {
    id: "KH4",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Kampong Chhnang",
    nutsName: "Kampong Chhnang (កំពង់ឆ្នាំង)",
    nameLatn: "Kampong Chhnang",
    nameEngl: "Kampong Chhnang (Cambodia)",
    modernName: "Kampong Chhnang (កំពង់ឆ្នាំង)",
    historicalName: "Protectorat du Cambodge — Province de Kompong Chhnang",
    historicalToponym: "Kompong Chhnang",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Province de Kompong Chhnang",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Kompong Chhnang",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Kompong Chhnang). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Centro lacustre sul lago Tonlé Sap rinomato per le ceramiche tradizionali e i villaggi galleggianti di pescatori. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Kompong Chhnang). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Centro lacustre sul lago Tonlé Sap rinomato per le ceramiche tradizionali e i villaggi galleggianti di pescatori. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Centro lacustre sul lago Tonlé Sap rinomato per le ceramiche tradizionali e i villaggi galleggianti di pescatori.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Centro lacustre sul lago Tonlé Sap rinomato per le ceramiche tradizionali e i villaggi galleggianti di pescatori.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH4"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH4"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH4"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH4"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH4"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Province de Kompong Chhnang (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Province de Kompong Chhnang (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Province de Kompong Chhnang";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Province de Kompong Chhnang (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Province de Kompong Chhnang (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Province de Kompong Chhnang";
    },
  },
  KH5: {
    id: "KH5",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Kampong Speu",
    nutsName: "Kampong Speu (កំពង់ស្ពឺ)",
    nameLatn: "Kampong Speu",
    nameEngl: "Kampong Speu (Cambodia)",
    modernName: "Kampong Speu (កំពង់ស្ពឺ)",
    historicalName: "Protectorat du Cambodge — Province de Kompong Speu",
    historicalToponym: "Kompong Speu",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Province de Kompong Speu",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Kompong Speu",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Kompong Speu). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Distretto pedemontano dei Monti Cardamomi celebre per la palma da zucchero (thnot) e le risaie. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Kompong Speu). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Distretto pedemontano dei Monti Cardamomi celebre per la palma da zucchero (thnot) e le risaie. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Distretto pedemontano dei Monti Cardamomi celebre per la palma da zucchero (thnot) e le risaie.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Distretto pedemontano dei Monti Cardamomi celebre per la palma da zucchero (thnot) e le risaie.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH5"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH5"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH5"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH5"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH5"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Province de Kompong Speu (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Province de Kompong Speu (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Province de Kompong Speu";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Province de Kompong Speu (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Province de Kompong Speu (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Province de Kompong Speu";
    },
  },
  KH6: {
    id: "KH6",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Kampong Thom",
    nutsName: "Kampong Thom (កំពង់ធំ)",
    nameLatn: "Kampong Thom",
    nameEngl: "Kampong Thom (Cambodia)",
    modernName: "Kampong Thom (កំពង់ធំ)",
    historicalName: "Protectorat du Cambodge — Province de Kompong Thom",
    historicalToponym: "Kompong Thom",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Province de Kompong Thom",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Kompong Thom",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Kompong Thom). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Sede del complesso archeologico pre-angkoriano di Sambor Prei Kuk e nodo di transito verso Siem Reap. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Kompong Thom). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Sede del complesso archeologico pre-angkoriano di Sambor Prei Kuk e nodo di transito verso Siem Reap. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Sede del complesso archeologico pre-angkoriano di Sambor Prei Kuk e nodo di transito verso Siem Reap.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Sede del complesso archeologico pre-angkoriano di Sambor Prei Kuk e nodo di transito verso Siem Reap.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH6"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH6"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH6"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH6"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH6"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Province de Kompong Thom (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Province de Kompong Thom (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Province de Kompong Thom";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Province de Kompong Thom (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Province de Kompong Thom (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Province de Kompong Thom";
    },
  },
  KH7: {
    id: "KH7",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Kampot",
    nutsName: "Kampot (កំពត)",
    nameLatn: "Kampot",
    nameEngl: "Kampot (Cambodia)",
    modernName: "Kampot (កំពត)",
    historicalName: "Protectorat du Cambodge — Circonscription de Kampot & Bokor",
    historicalToponym: "Kampot",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Circonscription de Kampot & Bokor",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Kampot",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Kampot). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Famoso per il celebre pepe nero di Kampot e la stazione climatica d'alta quota di Bokor Hill Station con il Grand Palace Hotel. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Kampot). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Famoso per il celebre pepe nero di Kampot e la stazione climatica d'alta quota di Bokor Hill Station con il Grand Palace Hotel. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Famoso per il celebre pepe nero di Kampot e la stazione climatica d'alta quota di Bokor Hill Station con il Grand Palace Hotel.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Famoso per il celebre pepe nero di Kampot e la stazione climatica d'alta quota di Bokor Hill Station con il Grand Palace Hotel.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH7"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH7"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH7"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH7"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH7"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Circonscription de Kampot & Bokor (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Circonscription de Kampot & Bokor (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Circonscription de Kampot & Bokor";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Circonscription de Kampot & Bokor (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Circonscription de Kampot & Bokor (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Circonscription de Kampot & Bokor";
    },
  },
  KH8: {
    id: "KH8",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Kandal",
    nutsName: "Kandal (កណ្តាល)",
    nameLatn: "Kandal",
    nameEngl: "Kandal (Cambodia)",
    modernName: "Kandal (កណ្តាល)",
    historicalName: "Protectorat du Cambodge — Province de Kandal",
    historicalToponym: "Kandal / Chaktomuk",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Province de Kandal",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Ta Khmau",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Ta Khmau). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Provincia circondante la capitale Phnom Penh all'incrocio fluviale dei Quattro Fiumi (Chaktomuk). Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Ta Khmau). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Provincia circondante la capitale Phnom Penh all'incrocio fluviale dei Quattro Fiumi (Chaktomuk). Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Provincia circondante la capitale Phnom Penh all'incrocio fluviale dei Quattro Fiumi (Chaktomuk).",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Provincia circondante la capitale Phnom Penh all'incrocio fluviale dei Quattro Fiumi (Chaktomuk).",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH8"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH8"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH8"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH8"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH8"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Province de Kandal (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Province de Kandal (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Province de Kandal";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Province de Kandal (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Province de Kandal (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Province de Kandal";
    },
  },
  KH9: {
    id: "KH9",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Koh Kong",
    nutsName: "Koh Kong (កោះកុង)",
    nameLatn: "Koh Kong",
    nameEngl: "Koh Kong (Cambodia)",
    modernName: "Koh Kong (កោះកុង)",
    historicalName: "Protectorat du Cambodge — Province de Koh Kong",
    historicalToponym: "Koh Kong",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Province de Koh Kong",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Khemarak Phoumin",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Khemarak Phoumin). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Costa litoranea montuosa e insulare del Golfo del Siam ricca di foreste vergini nei Monti Cardamomi marittimi. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Khemarak Phoumin). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Costa litoranea montuosa e insulare del Golfo del Siam ricca di foreste vergini nei Monti Cardamomi marittimi. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Costa litoranea montuosa e insulare del Golfo del Siam ricca di foreste vergini nei Monti Cardamomi marittimi.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Costa litoranea montuosa e insulare del Golfo del Siam ricca di foreste vergini nei Monti Cardamomi marittimi.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH9"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH9"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH9"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH9"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH9"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Province de Koh Kong (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Province de Koh Kong (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Province de Koh Kong";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Province de Koh Kong (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Province de Koh Kong (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Province de Koh Kong";
    },
  },
  KH10: {
    id: "KH10",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Kratie",
    nutsName: "Kratie (ក្រចេះ)",
    nameLatn: "Kratie",
    nameEngl: "Kratie (Cambodia)",
    modernName: "Kratie (ក្រចេះ)",
    historicalName: "Protectorat du Cambodge — Province de Kratié",
    historicalToponym: "Kratié",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Province de Kratié",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Kratié",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Kratié). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Scalo sul medio Mekong celebre per le rapide fluviali e le popolazioni Bunong. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Kratié). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Scalo sul medio Mekong celebre per le rapide fluviali e le popolazioni Bunong. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Scalo sul medio Mekong celebre per le rapide fluviali e le popolazioni Bunong.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Scalo sul medio Mekong celebre per le rapide fluviali e le popolazioni Bunong.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH10"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH10"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH10"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH10"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH10"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Province de Kratié (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Province de Kratié (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Province de Kratié";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Province de Kratié (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Province de Kratié (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Province de Kratié";
    },
  },
  KH11: {
    id: "KH11",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Mondul Kiri",
    nutsName: "Mondul Kiri (មណ្ឌលគិរី)",
    nameLatn: "Mondul Kiri",
    nameEngl: "Mondul Kiri (Cambodia)",
    modernName: "Mondul Kiri (មណ្ឌលគិរី)",
    historicalName: "Protectorat du Cambodge — Haut-Chhlong (Mondolkiri)",
    historicalToponym: "Mondolkiri",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Haut-Chhlong (Mondolkiri)",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Sen Monorom",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Sen Monorom). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Vasto altopiano boscoso orientale dell'Indocina popolato dalle etnie indigene Bunong (Phnong). Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Sen Monorom). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Vasto altopiano boscoso orientale dell'Indocina popolato dalle etnie indigene Bunong (Phnong). Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Vasto altopiano boscoso orientale dell'Indocina popolato dalle etnie indigene Bunong (Phnong).",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Vasto altopiano boscoso orientale dell'Indocina popolato dalle etnie indigene Bunong (Phnong).",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH11"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH11"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH11"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH11"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH11"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Haut-Chhlong (Mondolkiri) (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Haut-Chhlong (Mondolkiri) (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Haut-Chhlong (Mondolkiri)";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Haut-Chhlong (Mondolkiri) (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Haut-Chhlong (Mondolkiri) (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Haut-Chhlong (Mondolkiri)";
    },
  },
  KH12: {
    id: "KH12",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Phnom Penh",
    nutsName: "Phnom Penh (ភ្នំពេញ)",
    nameLatn: "Phnom Penh",
    nameEngl: "Phnom Penh (Cambodia)",
    modernName: "Phnom Penh (ភ្នំពេញ)",
    historicalName: "Protectorat du Cambodge — Capitale Royale de Phnom Penh",
    historicalToponym: "Phnom Penh",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Capitale Royale de Phnom Penh",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Phnom Penh",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Phnom Penh). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Capitale del Regno di Cambogia, residenza del Re Sisowath Monivong (poi Sihanouk) e sede della Résidence Supérieure de France. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Phnom Penh). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Capitale del Regno di Cambogia, residenza del Re Sisowath Monivong (poi Sihanouk) e sede della Résidence Supérieure de France. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Capitale del Regno di Cambogia, residenza del Re Sisowath Monivong (poi Sihanouk) e sede della Résidence Supérieure de France.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Capitale del Regno di Cambogia, residenza del Re Sisowath Monivong (poi Sihanouk) e sede della Résidence Supérieure de France.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH12"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH12"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH12"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH12"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH12"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Capitale Royale de Phnom Penh (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Capitale Royale de Phnom Penh (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Capitale Royale de Phnom Penh";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Capitale Royale de Phnom Penh (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Capitale Royale de Phnom Penh (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Capitale Royale de Phnom Penh";
    },
  },
  KH13: {
    id: "KH13",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Preah Vihear",
    nutsName: "Preah Vihear (ព្រះវិហារ)",
    nameLatn: "Preah Vihear",
    nameEngl: "Preah Vihear (Cambodia)",
    modernName: "Preah Vihear (ព្រះវិហារ)",
    historicalName: "Protectorat du Cambodge — Province de Preah Vihear",
    historicalToponym: "Preah Vihear",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Province de Preah Vihear",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Tbeng Meanchey",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Tbeng Meanchey). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Rilievi dei Monti Dângrêk dominati dal millenario tempio khmer di Prasat Preah Vihear sulla frontiera col Siam. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Tbeng Meanchey). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Rilievi dei Monti Dângrêk dominati dal millenario tempio khmer di Prasat Preah Vihear sulla frontiera col Siam. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Rilievi dei Monti Dângrêk dominati dal millenario tempio khmer di Prasat Preah Vihear sulla frontiera col Siam.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Rilievi dei Monti Dângrêk dominati dal millenario tempio khmer di Prasat Preah Vihear sulla frontiera col Siam.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH13"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH13"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH13"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH13"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH13"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Province de Preah Vihear (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Province de Preah Vihear (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Province de Preah Vihear";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Province de Preah Vihear (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Province de Preah Vihear (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Province de Preah Vihear";
    },
  },
  KH14: {
    id: "KH14",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Prey Veng",
    nutsName: "Prey Veng (ព្រៃវែង)",
    nameLatn: "Prey Veng",
    nameEngl: "Prey Veng (Cambodia)",
    modernName: "Prey Veng (ព្រៃវែង)",
    historicalName: "Protectorat du Cambodge — Province de Prey Veng",
    historicalToponym: "Prey Veng",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Province de Prey Veng",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Prey Veng",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Prey Veng). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Fitta pianura agricola e culla storica del regno di Ba Phnom sulla sponda sinistra del Mekong. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Prey Veng). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Fitta pianura agricola e culla storica del regno di Ba Phnom sulla sponda sinistra del Mekong. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Fitta pianura agricola e culla storica del regno di Ba Phnom sulla sponda sinistra del Mekong.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Fitta pianura agricola e culla storica del regno di Ba Phnom sulla sponda sinistra del Mekong.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH14"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH14"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH14"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH14"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH14"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Province de Prey Veng (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Province de Prey Veng (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Province de Prey Veng";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Province de Prey Veng (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Province de Prey Veng (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Province de Prey Veng";
    },
  },
  KH15: {
    id: "KH15",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Pursat",
    nutsName: "Pursat (ពោធិ៍សាត់)",
    nameLatn: "Pursat",
    nameEngl: "Pursat (Cambodia)",
    modernName: "Pursat (ពោធិ៍សាត់)",
    historicalName: "Protectorat du Cambodge — Province de Pouthisat",
    historicalToponym: "Pouthisat",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Province de Pouthisat",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Pursat",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Pursat). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Estesa dalle rive pescose del Tonlé Sap fino ai contrafforti dei Monti Cardamomi, ricca di marmo e legname. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Pursat). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Estesa dalle rive pescose del Tonlé Sap fino ai contrafforti dei Monti Cardamomi, ricca di marmo e legname. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Estesa dalle rive pescose del Tonlé Sap fino ai contrafforti dei Monti Cardamomi, ricca di marmo e legname.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Estesa dalle rive pescose del Tonlé Sap fino ai contrafforti dei Monti Cardamomi, ricca di marmo e legname.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH15"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH15"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH15"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH15"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH15"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Province de Pouthisat (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Province de Pouthisat (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Province de Pouthisat";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Province de Pouthisat (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Province de Pouthisat (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Province de Pouthisat";
    },
  },
  KH16: {
    id: "KH16",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Ratanak Kiri",
    nutsName: "Ratanak Kiri (រតនគិរី)",
    nameLatn: "Ratanak Kiri",
    nameEngl: "Ratanak Kiri (Cambodia)",
    modernName: "Ratanak Kiri (រតនគិរី)",
    historicalName: "Protectorat du Cambodge — Province de Ratanakiri",
    historicalToponym: "Ratanakiri",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Province de Ratanakiri",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Banlung",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Banlung). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Regione collinare nord-orientale ricca di giacimenti di gemme e pietre preziose, foreste di teak e minoranze Jarai. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Banlung). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Regione collinare nord-orientale ricca di giacimenti di gemme e pietre preziose, foreste di teak e minoranze Jarai. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Regione collinare nord-orientale ricca di giacimenti di gemme e pietre preziose, foreste di teak e minoranze Jarai.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Regione collinare nord-orientale ricca di giacimenti di gemme e pietre preziose, foreste di teak e minoranze Jarai.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH16"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH16"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH16"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH16"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH16"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Province de Ratanakiri (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Province de Ratanakiri (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Province de Ratanakiri";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Province de Ratanakiri (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Province de Ratanakiri (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Province de Ratanakiri";
    },
  },
  KH17: {
    id: "KH17",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Siemreap",
    nutsName: "Siem Reap (សៀមរាប)",
    nameLatn: "Siemreap",
    nameEngl: "Siemreap (Cambodia)",
    modernName: "Siem Reap (សៀមរាប)",
    historicalName: "Protectorat du Cambodge — Province d'Angkor / Siem Reap",
    historicalToponym: "Siem Reap / Angkor",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Province d'Angkor / Siem Reap",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Siem Reap",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Siem Reap). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Custode dei monumenti immortali di Angkor Wat e Angkor Thom, studiati e restaurati dall'École française d'Extrême-Orient (EFEO); contesa nel 1941 col Siam. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Siem Reap). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Custode dei monumenti immortali di Angkor Wat e Angkor Thom, studiati e restaurati dall'École française d'Extrême-Orient (EFEO); contesa nel 1941 col Siam. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy). Post-Accordo di Hanoi del settembre 1940, mentre l'Esercito Giapponese staziona nel Tonchino, il regime thailandese di Plaek Phibunsongkhram lancia l'offensiva della Guerra Franco-Thailandese per rivendicare le province occidentali cambogiane. Custode dei monumenti immortali di Angkor Wat e Angkor Thom, studiati e restaurati dall'École française d'Extrême-Orient (EFEO); contesa nel 1941 col Siam.",
    s8: "Territorio cambogiano ceduto al Regno di Thailandia (Siam) col Trattato di Pace di Tokyo del 9 maggio 1941 imposto dall'arbitrato giapponese dopo la vittoria navale francese di Koh Chang (provincia di Phra Tabong / Siam Nakhon). Nel contempo a Phnom Penh, alla morte di Re Monivong (aprile 1941), ascende al trono Re Norodom Sihanouk.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH17"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH17"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH17"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH17"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH17"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 8) return "Protectorat du Cambodge — Province d'Angkor / Siem Reap (Occupazione Siamese / Thailandia) [Trattato di Tokyo 1941]";
      if (s >= 7) return "Protectorat du Cambodge — Province d'Angkor / Siem Reap (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Province d'Angkor / Siem Reap (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Province d'Angkor / Siem Reap";
    },
    getAdminTitle: (s: number) => {
      if (s >= 8) return "Regno di Thailandia (Amministrazione Phibunsongkhram / Trattato di Tokyo 1941)";
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Province d'Angkor / Siem Reap (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Province d'Angkor / Siem Reap (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Province d'Angkor / Siem Reap";
    },
  },
  KH18: {
    id: "KH18",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Preah Sihanouk",
    nutsName: "Preah Sihanouk / Kompong Som (ព្រះសីហនុ)",
    nameLatn: "Preah Sihanouk",
    nameEngl: "Preah Sihanouk (Cambodia)",
    modernName: "Preah Sihanouk / Kompong Som (ព្រះសីហនុ)",
    historicalName: "Protectorat du Cambodge — Baie de Kompong Som",
    historicalToponym: "Kompong Som",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Baie de Kompong Som",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Sihanoukville",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Sihanoukville). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Baia costiera profonda sul Golfo del Siam, approdo strategico marittimo per le rotte del sud. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Sihanoukville). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Baia costiera profonda sul Golfo del Siam, approdo strategico marittimo per le rotte del sud. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Baia costiera profonda sul Golfo del Siam, approdo strategico marittimo per le rotte del sud.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Baia costiera profonda sul Golfo del Siam, approdo strategico marittimo per le rotte del sud.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH18"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH18"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH18"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH18"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH18"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Baie de Kompong Som (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Baie de Kompong Som (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Baie de Kompong Som";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Baie de Kompong Som (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Baie de Kompong Som (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Baie de Kompong Som";
    },
  },
  KH19: {
    id: "KH19",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Stung Treng",
    nutsName: "Stung Treng (ស្ទឹងត្រែង)",
    nameLatn: "Stung Treng",
    nameEngl: "Stung Treng (Cambodia)",
    modernName: "Stung Treng (ស្ទឹងត្រែង)",
    historicalName: "Protectorat du Cambodge — Province de Stung Treng",
    historicalToponym: "Stung Treng",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Province de Stung Treng",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Stung Treng",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Stung Treng). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Confluenza navigabile tra il Mekong, il fiume Sékong e il Sesan, porta d'ingresso fluviale per il Laos. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Stung Treng). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Confluenza navigabile tra il Mekong, il fiume Sékong e il Sesan, porta d'ingresso fluviale per il Laos. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Confluenza navigabile tra il Mekong, il fiume Sékong e il Sesan, porta d'ingresso fluviale per il Laos.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Confluenza navigabile tra il Mekong, il fiume Sékong e il Sesan, porta d'ingresso fluviale per il Laos.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH19"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH19"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH19"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH19"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH19"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Province de Stung Treng (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Province de Stung Treng (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Province de Stung Treng";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Province de Stung Treng (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Province de Stung Treng (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Province de Stung Treng";
    },
  },
  KH20: {
    id: "KH20",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Svay Rieng",
    nutsName: "Svay Rieng (ស្វាយរៀង)",
    nameLatn: "Svay Rieng",
    nameEngl: "Svay Rieng (Cambodia)",
    modernName: "Svay Rieng (ស្វាយរៀង)",
    historicalName: "Protectorat du Cambodge — Circonscription du Bec de Canard",
    historicalToponym: "Svay Rieng",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Circonscription du Bec de Canard",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Svay Rieng",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Svay Rieng). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Regione strategica del 'Becco d'Anatra' (Bec de Canard) incuneata verso la Cocincina e la rotta per Saigon. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Svay Rieng). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Regione strategica del 'Becco d'Anatra' (Bec de Canard) incuneata verso la Cocincina e la rotta per Saigon. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Regione strategica del 'Becco d'Anatra' (Bec de Canard) incuneata verso la Cocincina e la rotta per Saigon.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Regione strategica del 'Becco d'Anatra' (Bec de Canard) incuneata verso la Cocincina e la rotta per Saigon.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH20"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH20"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH20"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH20"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH20"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Circonscription du Bec de Canard (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Circonscription du Bec de Canard (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Circonscription du Bec de Canard";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Circonscription du Bec de Canard (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Circonscription du Bec de Canard (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Circonscription du Bec de Canard";
    },
  },
  KH21: {
    id: "KH21",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Takeo",
    nutsName: "Takeo (តាកែវ)",
    nameLatn: "Takeo",
    nameEngl: "Takeo (Cambodia)",
    modernName: "Takeo (តាកែវ)",
    historicalName: "Protectorat du Cambodge — Province de Takéo",
    historicalToponym: "Takéo",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Province de Takéo",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Doun Kaev",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Doun Kaev). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Culla archeologica della civiltà del Funan e siti pre-angkoriani di Angkor Borei e Phnom Da. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Doun Kaev). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Culla archeologica della civiltà del Funan e siti pre-angkoriani di Angkor Borei e Phnom Da. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Culla archeologica della civiltà del Funan e siti pre-angkoriani di Angkor Borei e Phnom Da.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Culla archeologica della civiltà del Funan e siti pre-angkoriani di Angkor Borei e Phnom Da.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH21"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH21"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH21"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH21"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH21"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Province de Takéo (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Province de Takéo (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Province de Takéo";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Province de Takéo (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Province de Takéo (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Province de Takéo";
    },
  },
  KH22: {
    id: "KH22",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Oddar Meanchey",
    nutsName: "Oddar Meanchey (ឧត្តរមានជ័យ)",
    nameLatn: "Oddar Meanchey",
    nameEngl: "Oddar Meanchey (Cambodia)",
    modernName: "Oddar Meanchey (ឧត្តរមានជ័យ)",
    historicalName: "Protectorat du Cambodge — Ot-dar Mean Chey",
    historicalToponym: "Oddar Meanchey",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Ot-dar Mean Chey",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Samraong",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Samraong). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Altopiano di frontiera sui Monti Dângrêk conteso e parzialmente ceduto alla Thailandia nel maggio 1941. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Samraong). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Altopiano di frontiera sui Monti Dângrêk conteso e parzialmente ceduto alla Thailandia nel maggio 1941. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy). Post-Accordo di Hanoi del settembre 1940, mentre l'Esercito Giapponese staziona nel Tonchino, il regime thailandese di Plaek Phibunsongkhram lancia l'offensiva della Guerra Franco-Thailandese per rivendicare le province occidentali cambogiane. Altopiano di frontiera sui Monti Dângrêk conteso e parzialmente ceduto alla Thailandia nel maggio 1941.",
    s8: "Territorio cambogiano ceduto al Regno di Thailandia (Siam) col Trattato di Pace di Tokyo del 9 maggio 1941 imposto dall'arbitrato giapponese dopo la vittoria navale francese di Koh Chang (provincia di Phra Tabong / Siam Nakhon). Nel contempo a Phnom Penh, alla morte di Re Monivong (aprile 1941), ascende al trono Re Norodom Sihanouk.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH22"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH22"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH22"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH22"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH22"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 8) return "Protectorat du Cambodge — Ot-dar Mean Chey (Occupazione Siamese / Thailandia) [Trattato di Tokyo 1941]";
      if (s >= 7) return "Protectorat du Cambodge — Ot-dar Mean Chey (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Ot-dar Mean Chey (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Ot-dar Mean Chey";
    },
    getAdminTitle: (s: number) => {
      if (s >= 8) return "Regno di Thailandia (Amministrazione Phibunsongkhram / Trattato di Tokyo 1941)";
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Ot-dar Mean Chey (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Ot-dar Mean Chey (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Ot-dar Mean Chey";
    },
  },
  KH23: {
    id: "KH23",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Kep",
    nutsName: "Kep (កែប)",
    nameLatn: "Kep",
    nameEngl: "Kep (Cambodia)",
    modernName: "Kep (កែប)",
    historicalName: "Protectorat du Cambodge — Station Balnéaire de Kep-sur-Mer",
    historicalToponym: "Kep-sur-Mer",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — Station Balnéaire de Kep-sur-Mer",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Kep",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Kep). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Rinomata stazione balneare fondata nel 1908 dall'élite coloniale francese, affacciata sulle acque calme del Golfo del Siam. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Kep). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Rinomata stazione balneare fondata nel 1908 dall'élite coloniale francese, affacciata sulle acque calme del Golfo del Siam. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Rinomata stazione balneare fondata nel 1908 dall'élite coloniale francese, affacciata sulle acque calme del Golfo del Siam.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Rinomata stazione balneare fondata nel 1908 dall'élite coloniale francese, affacciata sulle acque calme del Golfo del Siam.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH23"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH23"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH23"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH23"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH23"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — Station Balnéaire de Kep-sur-Mer (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — Station Balnéaire de Kep-sur-Mer (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — Station Balnéaire de Kep-sur-Mer";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — Station Balnéaire de Kep-sur-Mer (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — Station Balnéaire de Kep-sur-Mer (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — Station Balnéaire de Kep-sur-Mer";
    },
  },
  KH24: {
    id: "KH24",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Pailin",
    nutsName: "Pailin (ប៉ៃលិន)",
    nameLatn: "Pailin",
    nameEngl: "Pailin (Cambodia)",
    modernName: "Pailin (ប៉ៃលិន)",
    historicalName: "Protectorat du Cambodge — District Minier de Pailin",
    historicalToponym: "Pailin",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — District Minier de Pailin",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Pailin",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Pailin). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Celebre distretto minerario incastonato nei Monti Cardamomi per l'estrazione di zaffiri e rubini di altissima caratura. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Pailin). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Celebre distretto minerario incastonato nei Monti Cardamomi per l'estrazione di zaffiri e rubini di altissima caratura. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Celebre distretto minerario incastonato nei Monti Cardamomi per l'estrazione di zaffiri e rubini di altissima caratura.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Celebre distretto minerario incastonato nei Monti Cardamomi per l'estrazione di zaffiri e rubini di altissima caratura.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH24"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH24"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH24"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH24"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH24"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — District Minier de Pailin (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — District Minier de Pailin (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — District Minier de Pailin";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — District Minier de Pailin (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — District Minier de Pailin (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — District Minier de Pailin";
    },
  },
  KH25: {
    id: "KH25",
    cntrCode: "KH",
    cntrName: "Cambodia",
    name: "Tboung Khmum",
    nutsName: "Tboung Khmum (ត្បូងឃ្មុំ)",
    nameLatn: "Tboung Khmum",
    nameEngl: "Tboung Khmum (Cambodia)",
    modernName: "Tboung Khmum (ត្បូងឃ្មុំ)",
    historicalName: "Protectorat du Cambodge — District de Memot & Chhlong",
    historicalToponym: "Memot",
    adminTitle: "Union Indochinoise — Protectorat du Cambodge — District de Memot & Chhlong",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Suong",
    subRegion: "Cambodge",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Cambogia nell'Union Indochinoise (Capitale Suong). Regno sotto l'autorità di Re Sisowath Monivong (1927-1941) e la supervisione della Résidence Supérieure de France a Phnom Penh. Area di terra rossa vulcanica sede delle sterminate piantagioni di caucciù della Compagnie du Cambodge a Memot. Economia basata sulla risicoltura tradizionale lungo il Mekong e la pesca nel lago Tonlé Sap.",
    s2_4: "Protettorato del Cambogia (Capitale Suong). Mentre la guerra sino-giapponese si intensifica e Tokyo occupa Hainan (febbraio 1939), il Cambogia rafforza la produzione agricola e le concessioni di caucciù. Area di terra rossa vulcanica sede delle sterminate piantagioni di caucciù della Compagnie du Cambodge a Memot. Il Résidente Superiore intensifica la sorveglianza militare.",
    s5_6: "Protettorato del Cambogia sotto la sovranità francese (settembre 1939 - giugno 1940). Allo scoppio della Seconda Guerra Mondiale vengono mobilitati battaglioni di Tirailleurs Cambodgiens. Dopo l'armistizio del 22 giugno 1940, l'amministrazione coloniale riconosce l'autorità di Vichy e del Governatore Jean Decoux.",
    s7: "Protettorato del Cambogia (Amministrazione di Vichy e stazionamento militare giapponese post-Accordo di Hanoi del settembre 1940). Mentre truppe giapponesi transitano nell'Indocina, la frontiera occidentale è sottoposta a bombardamenti thailandesi nella Guerra Franco-Thailandese. Area di terra rossa vulcanica sede delle sterminate piantagioni di caucciù della Compagnie du Cambodge a Memot.",
    s8: "Protettorato del Cambogia (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto tutela giapponese). Il 23 aprile 1941 muore Re Sisowath Monivong e viene incoronato il diciannovenne Re Norodom Sihanouk. Il Trattato di Tokyo (9 maggio 1941) salvaguarda il cuore del regno e la capitale reale. Area di terra rossa vulcanica sede delle sterminate piantagioni di caucciù della Compagnie du Cambodge a Memot.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["KH25"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["KH25"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["KH25"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["KH25"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["KH25"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Cambodge — District de Memot & Chhlong (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Cambodge — District de Memot & Chhlong (Gouvernement de Vichy)";
      return "Protectorat du Cambodge — District de Memot & Chhlong";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Cambodge — District de Memot & Chhlong (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Cambodge — District de Memot & Chhlong (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Cambodge — District de Memot & Chhlong";
    },
  },
  LAVT: {
    id: "LAVT",
    cntrCode: "LA",
    cntrName: "Laos",
    name: "Vientiane Capital",
    nutsName: "Vientiane Capital (ນະຄອນຫຼວງວຽງຈັນ)",
    nameLatn: "Vientiane Capital",
    nameEngl: "Vientiane Capital (Laos)",
    modernName: "Vientiane Capital (ນະຄອນຫຼວງວຽງຈັນ)",
    historicalName: "Protectorat du Laos — Ville de Vientiane",
    historicalToponym: "Vientiane",
    adminTitle: "Union Indochinoise — Protectorat du Laos — Ville de Vientiane",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Vientiane",
    subRegion: "Laos",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Laos nell'Union Indochinoise (Capoluogo Vientiane). Amministrato dalla Résidence Supérieure de France au Laos con sede a Vientiane. Sede della Résidence Supérieure de France au Laos e cuore amministrativo e diplomatico del protettorato. Economia incentrata sul commercio fluviale sul Mekong, risaie, legname pregiato (teak) e piantagioni dei Bolovens.",
    s2_4: "Protettorato del Laos (Capoluogo Vientiane). Mentre il Giappone avanza in Cina e occupa Hainan, le valli del Laos e la via fluviale del Mekong assumono rilevanza logistica strategica. Sede della Résidence Supérieure de France au Laos e cuore amministrativo e diplomatico del protettorato. L'amministrazione francese consolida le piste carovaniere montane e la Route Coloniale 13.",
    s5_6: "Protettorato del Laos (settembre 1939 - giugno 1940). Mobilitazione coloniale allo scoppio della guerra in Europa con contingenti laotiani nei Tirailleurs Indochinois. Dopo la caduta della Francia del giugno 1940, il Laos e il Regno di Luang Prabang restano fedeli al Governo di Vichy e al Governatore Decoux.",
    s7: "Protettorato del Laos (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Difesa della frontiera del Mekong contro gli attacchi d'artiglieria e aerei thailandesi durante la Guerra Franco-Thailandese. Sede della Résidence Supérieure de France au Laos e cuore amministrativo e diplomatico del protettorato.",
    s8: "Protettorato del Laos (Union Indochinoise / Amministrazione Vichy di Decoux sotto occupazione militare giapponese). Nonostante le cessioni territoriali a ovest del Mekong imposte da Tokyo (maggio 1941), la Francia stipula un trattato rafforzato con Re Sisavang Vong a Luang Prabang ampliando la giurisdizione del regno. Sede della Résidence Supérieure de France au Laos e cuore amministrativo e diplomatico del protettorato.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["LAVT"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["LAVT"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["LAVT"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["LAVT"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["LAVT"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Laos — Ville de Vientiane (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Laos — Ville de Vientiane (Gouvernement de Vichy)";
      return "Protectorat du Laos — Ville de Vientiane";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Laos — Ville de Vientiane (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Laos — Ville de Vientiane (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Laos — Ville de Vientiane";
    },
  },
  LAVI: {
    id: "LAVI",
    cntrCode: "LA",
    cntrName: "Laos",
    name: "Vientiane",
    nutsName: "Vientiane Province (ແຂວງວຽງຈັນ)",
    nameLatn: "Vientiane",
    nameEngl: "Vientiane (Laos)",
    modernName: "Vientiane Province (ແຂວງວຽງຈັນ)",
    historicalName: "Protectorat du Laos — Province de Vientiane",
    historicalToponym: "Vientiane Rurale",
    adminTitle: "Union Indochinoise — Protectorat du Laos — Province de Vientiane",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Muang Phôn-Hông",
    subRegion: "Laos",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Laos nell'Union Indochinoise (Capoluogo Muang Phôn-Hông). Amministrato dalla Résidence Supérieure de France au Laos con sede a Vientiane. Vasta pianura risicola lungo il medio corso del Mekong con fitte foreste collinari. Economia incentrata sul commercio fluviale sul Mekong, risaie, legname pregiato (teak) e piantagioni dei Bolovens.",
    s2_4: "Protettorato del Laos (Capoluogo Muang Phôn-Hông). Mentre il Giappone avanza in Cina e occupa Hainan, le valli del Laos e la via fluviale del Mekong assumono rilevanza logistica strategica. Vasta pianura risicola lungo il medio corso del Mekong con fitte foreste collinari. L'amministrazione francese consolida le piste carovaniere montane e la Route Coloniale 13.",
    s5_6: "Protettorato del Laos (settembre 1939 - giugno 1940). Mobilitazione coloniale allo scoppio della guerra in Europa con contingenti laotiani nei Tirailleurs Indochinois. Dopo la caduta della Francia del giugno 1940, il Laos e il Regno di Luang Prabang restano fedeli al Governo di Vichy e al Governatore Decoux.",
    s7: "Protettorato del Laos (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Difesa della frontiera del Mekong contro gli attacchi d'artiglieria e aerei thailandesi durante la Guerra Franco-Thailandese. Vasta pianura risicola lungo il medio corso del Mekong con fitte foreste collinari.",
    s8: "Protettorato del Laos (Union Indochinoise / Amministrazione Vichy di Decoux sotto occupazione militare giapponese). Nonostante le cessioni territoriali a ovest del Mekong imposte da Tokyo (maggio 1941), la Francia stipula un trattato rafforzato con Re Sisavang Vong a Luang Prabang ampliando la giurisdizione del regno. Vasta pianura risicola lungo il medio corso del Mekong con fitte foreste collinari.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["LAVI"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["LAVI"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["LAVI"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["LAVI"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["LAVI"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Laos — Province de Vientiane (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Laos — Province de Vientiane (Gouvernement de Vichy)";
      return "Protectorat du Laos — Province de Vientiane";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Laos — Province de Vientiane (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Laos — Province de Vientiane (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Laos — Province de Vientiane";
    },
  },
  LALP: {
    id: "LALP",
    cntrCode: "LA",
    cntrName: "Laos",
    name: "Louangphabang",
    nutsName: "Luang Prabang (ແຂວງຫຼວງພະບາງ)",
    nameLatn: "Louangphabang",
    nameEngl: "Louangphabang (Laos)",
    modernName: "Luang Prabang (ແຂວງຫຼວງພະບາງ)",
    historicalName: "Protectorat du Laos — Royaume de Luang Prabang",
    historicalToponym: "Luang Prabang",
    adminTitle: "Union Indochinoise — Protectorat du Laos — Royaume de Luang Prabang",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Luang Prabang",
    subRegion: "Laos",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Laos nell'Union Indochinoise (Capoluogo Luang Prabang). Sede della Corte Reale del Regno di Luang Prabang sotto il Re Sisavang Vong (1904-1959). Capitale Reale storica del Regno di Luang Prabang sotto il venerato Re Sisavang Vong (1904-1959), custode del sacro Buddha Phra Bang. Economia incentrata sul commercio fluviale sul Mekong, risaie, legname pregiato (teak) e piantagioni dei Bolovens.",
    s2_4: "Protettorato del Laos (Capoluogo Luang Prabang). Mentre il Giappone avanza in Cina e occupa Hainan, le valli del Laos e la via fluviale del Mekong assumono rilevanza logistica strategica. Capitale Reale storica del Regno di Luang Prabang sotto il venerato Re Sisavang Vong (1904-1959), custode del sacro Buddha Phra Bang. L'amministrazione francese consolida le piste carovaniere montane e la Route Coloniale 13.",
    s5_6: "Protettorato del Laos (settembre 1939 - giugno 1940). Mobilitazione coloniale allo scoppio della guerra in Europa con contingenti laotiani nei Tirailleurs Indochinois. Dopo la caduta della Francia del giugno 1940, il Laos e il Regno di Luang Prabang restano fedeli al Governo di Vichy e al Governatore Decoux.",
    s7: "Protettorato del Laos (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Difesa della frontiera del Mekong contro gli attacchi d'artiglieria e aerei thailandesi durante la Guerra Franco-Thailandese. Capitale Reale storica del Regno di Luang Prabang sotto il venerato Re Sisavang Vong (1904-1959), custode del sacro Buddha Phra Bang.",
    s8: "Protettorato del Laos (Union Indochinoise / Amministrazione Vichy di Decoux sotto occupazione militare giapponese). Nonostante le cessioni territoriali a ovest del Mekong imposte da Tokyo (maggio 1941), la Francia stipula un trattato rafforzato con Re Sisavang Vong a Luang Prabang ampliando la giurisdizione del regno. Capitale Reale storica del Regno di Luang Prabang sotto il venerato Re Sisavang Vong (1904-1959), custode del sacro Buddha Phra Bang.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["LALP"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["LALP"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["LALP"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["LALP"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["LALP"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Laos — Royaume de Luang Prabang (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Laos — Royaume de Luang Prabang (Gouvernement de Vichy)";
      return "Protectorat du Laos — Royaume de Luang Prabang";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Laos — Royaume de Luang Prabang (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Laos — Royaume de Luang Prabang (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Laos — Royaume de Luang Prabang";
    },
  },
  LAAT: {
    id: "LAAT",
    cntrCode: "LA",
    cntrName: "Laos",
    name: "Attapeu",
    nutsName: "Attapeu (ແຂວງອັດຕະປື)",
    nameLatn: "Attapeu",
    nameEngl: "Attapeu (Laos)",
    modernName: "Attapeu (ແຂວງອັດຕະປື)",
    historicalName: "Protectorat du Laos — Province d'Attopu",
    historicalToponym: "Attopu",
    adminTitle: "Union Indochinoise — Protectorat du Laos — Province d'Attopu",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Attapeu",
    subRegion: "Laos",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Laos nell'Union Indochinoise (Capoluogo Attapeu). Amministrato dalla Résidence Supérieure de France au Laos con sede a Vientiane. Remota provincia meridionale alle pendici orientali dell'Altopiano dei Bolovens e confine con Annam e Cambogia. Economia incentrata sul commercio fluviale sul Mekong, risaie, legname pregiato (teak) e piantagioni dei Bolovens.",
    s2_4: "Protettorato del Laos (Capoluogo Attapeu). Mentre il Giappone avanza in Cina e occupa Hainan, le valli del Laos e la via fluviale del Mekong assumono rilevanza logistica strategica. Remota provincia meridionale alle pendici orientali dell'Altopiano dei Bolovens e confine con Annam e Cambogia. L'amministrazione francese consolida le piste carovaniere montane e la Route Coloniale 13.",
    s5_6: "Protettorato del Laos (settembre 1939 - giugno 1940). Mobilitazione coloniale allo scoppio della guerra in Europa con contingenti laotiani nei Tirailleurs Indochinois. Dopo la caduta della Francia del giugno 1940, il Laos e il Regno di Luang Prabang restano fedeli al Governo di Vichy e al Governatore Decoux.",
    s7: "Protettorato del Laos (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Difesa della frontiera del Mekong contro gli attacchi d'artiglieria e aerei thailandesi durante la Guerra Franco-Thailandese. Remota provincia meridionale alle pendici orientali dell'Altopiano dei Bolovens e confine con Annam e Cambogia.",
    s8: "Protettorato del Laos (Union Indochinoise / Amministrazione Vichy di Decoux sotto occupazione militare giapponese). Nonostante le cessioni territoriali a ovest del Mekong imposte da Tokyo (maggio 1941), la Francia stipula un trattato rafforzato con Re Sisavang Vong a Luang Prabang ampliando la giurisdizione del regno. Remota provincia meridionale alle pendici orientali dell'Altopiano dei Bolovens e confine con Annam e Cambogia.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["LAAT"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["LAAT"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["LAAT"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["LAAT"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["LAAT"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Laos — Province d'Attopu (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Laos — Province d'Attopu (Gouvernement de Vichy)";
      return "Protectorat du Laos — Province d'Attopu";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Laos — Province d'Attopu (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Laos — Province d'Attopu (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Laos — Province d'Attopu";
    },
  },
  LABK: {
    id: "LABK",
    cntrCode: "LA",
    cntrName: "Laos",
    name: "Bokeo",
    nutsName: "Bokeo (ແຂວງບໍ່ແກ້ວ)",
    nameLatn: "Bokeo",
    nameEngl: "Bokeo (Laos)",
    modernName: "Bokeo (ແຂວງບໍ່ແກ້ວ)",
    historicalName: "Protectorat du Laos — Circonscription du Haut-Mékong (Houei Sai)",
    historicalToponym: "Houei Sai",
    adminTitle: "Union Indochinoise — Protectorat du Laos — Circonscription du Haut-Mékong (Houei Sai)",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Houayxay",
    subRegion: "Laos",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Laos nell'Union Indochinoise (Capoluogo Houayxay). Amministrato dalla Résidence Supérieure de France au Laos con sede a Vientiane. Porta d'accesso al 'Triangolo d'Oro' lungo il Mekong, snodo carovaniero tra Laos, Birmania e Siam per gemme e legname. Economia incentrata sul commercio fluviale sul Mekong, risaie, legname pregiato (teak) e piantagioni dei Bolovens.",
    s2_4: "Protettorato del Laos (Capoluogo Houayxay). Mentre il Giappone avanza in Cina e occupa Hainan, le valli del Laos e la via fluviale del Mekong assumono rilevanza logistica strategica. Porta d'accesso al 'Triangolo d'Oro' lungo il Mekong, snodo carovaniero tra Laos, Birmania e Siam per gemme e legname. L'amministrazione francese consolida le piste carovaniere montane e la Route Coloniale 13.",
    s5_6: "Protettorato del Laos (settembre 1939 - giugno 1940). Mobilitazione coloniale allo scoppio della guerra in Europa con contingenti laotiani nei Tirailleurs Indochinois. Dopo la caduta della Francia del giugno 1940, il Laos e il Regno di Luang Prabang restano fedeli al Governo di Vichy e al Governatore Decoux.",
    s7: "Protettorato del Laos (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Difesa della frontiera del Mekong contro gli attacchi d'artiglieria e aerei thailandesi durante la Guerra Franco-Thailandese. Porta d'accesso al 'Triangolo d'Oro' lungo il Mekong, snodo carovaniero tra Laos, Birmania e Siam per gemme e legname.",
    s8: "Protettorato del Laos (Union Indochinoise / Amministrazione Vichy di Decoux sotto occupazione militare giapponese). Nonostante le cessioni territoriali a ovest del Mekong imposte da Tokyo (maggio 1941), la Francia stipula un trattato rafforzato con Re Sisavang Vong a Luang Prabang ampliando la giurisdizione del regno. Porta d'accesso al 'Triangolo d'Oro' lungo il Mekong, snodo carovaniero tra Laos, Birmania e Siam per gemme e legname.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["LABK"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["LABK"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["LABK"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["LABK"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["LABK"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Laos — Circonscription du Haut-Mékong (Houei Sai) (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Laos — Circonscription du Haut-Mékong (Houei Sai) (Gouvernement de Vichy)";
      return "Protectorat du Laos — Circonscription du Haut-Mékong (Houei Sai)";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Laos — Circonscription du Haut-Mékong (Houei Sai) (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Laos — Circonscription du Haut-Mékong (Houei Sai) (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Laos — Circonscription du Haut-Mékong (Houei Sai)";
    },
  },
  LABL: {
    id: "LABL",
    cntrCode: "LA",
    cntrName: "Laos",
    name: "Bolikhamxai",
    nutsName: "Bolikhamxai (ແຂວງບໍລິຄຳໄຊ)",
    nameLatn: "Bolikhamxai",
    nameEngl: "Bolikhamxai (Laos)",
    modernName: "Bolikhamxai (ແຂວງບໍລິຄຳໄຊ)",
    historicalName: "Protectorat du Laos — Circonscription de Borikhane",
    historicalToponym: "Paksane",
    adminTitle: "Union Indochinoise — Protectorat du Laos — Circonscription de Borikhane",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Paksane",
    subRegion: "Laos",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Laos nell'Union Indochinoise (Capoluogo Paksane). Amministrato dalla Résidence Supérieure de France au Laos con sede a Vientiane. Snodo idroviario alla foce del fiume Nam Kading nel Mekong lungo la Route Coloniale 13. Economia incentrata sul commercio fluviale sul Mekong, risaie, legname pregiato (teak) e piantagioni dei Bolovens.",
    s2_4: "Protettorato del Laos (Capoluogo Paksane). Mentre il Giappone avanza in Cina e occupa Hainan, le valli del Laos e la via fluviale del Mekong assumono rilevanza logistica strategica. Snodo idroviario alla foce del fiume Nam Kading nel Mekong lungo la Route Coloniale 13. L'amministrazione francese consolida le piste carovaniere montane e la Route Coloniale 13.",
    s5_6: "Protettorato del Laos (settembre 1939 - giugno 1940). Mobilitazione coloniale allo scoppio della guerra in Europa con contingenti laotiani nei Tirailleurs Indochinois. Dopo la caduta della Francia del giugno 1940, il Laos e il Regno di Luang Prabang restano fedeli al Governo di Vichy e al Governatore Decoux.",
    s7: "Protettorato del Laos (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Difesa della frontiera del Mekong contro gli attacchi d'artiglieria e aerei thailandesi durante la Guerra Franco-Thailandese. Snodo idroviario alla foce del fiume Nam Kading nel Mekong lungo la Route Coloniale 13.",
    s8: "Protettorato del Laos (Union Indochinoise / Amministrazione Vichy di Decoux sotto occupazione militare giapponese). Nonostante le cessioni territoriali a ovest del Mekong imposte da Tokyo (maggio 1941), la Francia stipula un trattato rafforzato con Re Sisavang Vong a Luang Prabang ampliando la giurisdizione del regno. Snodo idroviario alla foce del fiume Nam Kading nel Mekong lungo la Route Coloniale 13.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["LABL"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["LABL"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["LABL"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["LABL"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["LABL"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Laos — Circonscription de Borikhane (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Laos — Circonscription de Borikhane (Gouvernement de Vichy)";
      return "Protectorat du Laos — Circonscription de Borikhane";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Laos — Circonscription de Borikhane (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Laos — Circonscription de Borikhane (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Laos — Circonscription de Borikhane";
    },
  },
  LACH: {
    id: "LACH",
    cntrCode: "LA",
    cntrName: "Laos",
    name: "Champasack",
    nutsName: "Champasak (ແຂວງຈຳປາສັກ)",
    nameLatn: "Champasack",
    nameEngl: "Champasack (Laos)",
    modernName: "Champasak (ແຂວງຈຳປາສັກ)",
    historicalName: "Protectorat du Laos — Royaume de Champassak / Bassac",
    historicalToponym: "Bassac / Pakse",
    adminTitle: "Union Indochinoise — Protectorat du Laos — Royaume de Champassak / Bassac",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Pakse",
    subRegion: "Laos",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Laos nell'Union Indochinoise (Capoluogo Pakse). Amministrato dalla Résidence Supérieure de France au Laos con sede a Vientiane. Antico Regno di Champasak sulle Cascate di Khone; territorio della riva destra del Mekong ceduto alla Thailandia nel Trattato di Tokyo (1941). Economia incentrata sul commercio fluviale sul Mekong, risaie, legname pregiato (teak) e piantagioni dei Bolovens.",
    s2_4: "Protettorato del Laos (Capoluogo Pakse). Mentre il Giappone avanza in Cina e occupa Hainan, le valli del Laos e la via fluviale del Mekong assumono rilevanza logistica strategica. Antico Regno di Champasak sulle Cascate di Khone; territorio della riva destra del Mekong ceduto alla Thailandia nel Trattato di Tokyo (1941). L'amministrazione francese consolida le piste carovaniere montane e la Route Coloniale 13.",
    s5_6: "Protettorato del Laos (settembre 1939 - giugno 1940). Mobilitazione coloniale allo scoppio della guerra in Europa con contingenti laotiani nei Tirailleurs Indochinois. Dopo la caduta della Francia del giugno 1940, il Laos e il Regno di Luang Prabang restano fedeli al Governo di Vichy e al Governatore Decoux.",
    s7: "Protettorato del Laos (Amministrazione di Vichy). Post-Accordo di Hanoi del settembre 1940, la Thailandia di Phibunsongkhram scatena la Guerra Franco-Thailandese bombardando le postazioni francesi sul Mekong e avanzando a ovest del fiume. Antico Regno di Champasak sulle Cascate di Khone; territorio della riva destra del Mekong ceduto alla Thailandia nel Trattato di Tokyo (1941).",
    s8: "Territorio laotiano a ovest del Mekong ceduto forzatamente alla Thailandia col Trattato di Pace di Tokyo del 9 maggio 1941 imposto dall'arbitrato giapponese (provincia di Lan Chang / Nakhon Champassak). Presidio strategico di confine sul corso fluviale del Mekong.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["LACH"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["LACH"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["LACH"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["LACH"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["LACH"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 8) return "Protectorat du Laos — Royaume de Champassak / Bassac (Occupazione Siamese / Thailandia) [Trattato di Tokyo 1941]";
      if (s >= 7) return "Protectorat du Laos — Royaume de Champassak / Bassac (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Laos — Royaume de Champassak / Bassac (Gouvernement de Vichy)";
      return "Protectorat du Laos — Royaume de Champassak / Bassac";
    },
    getAdminTitle: (s: number) => {
      if (s >= 8) return "Regno di Thailandia (Amministrazione Phibunsongkhram / Trattato di Tokyo 1941)";
      if (s >= 7) return "Union Indochinoise — Protectorat du Laos — Royaume de Champassak / Bassac (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Laos — Royaume de Champassak / Bassac (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Laos — Royaume de Champassak / Bassac";
    },
  },
  LAHO: {
    id: "LAHO",
    cntrCode: "LA",
    cntrName: "Laos",
    name: "Houaphan",
    nutsName: "Houaphanh (ແຂວງຫົວພັນ)",
    nameLatn: "Houaphan",
    nameEngl: "Houaphan (Laos)",
    modernName: "Houaphanh (ແຂວງຫົວພັນ)",
    historicalName: "Protectorat du Laos — Province de Sam Neua",
    historicalToponym: "Sam Neua",
    adminTitle: "Union Indochinoise — Protectorat du Laos — Province de Sam Neua",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Xam Neua",
    subRegion: "Laos",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Laos nell'Union Indochinoise (Capoluogo Xam Neua). Amministrato dalla Résidence Supérieure de France au Laos con sede a Vientiane. Montagne impervie di confine con il Tonchino settentrionale abitate da popolazioni Tai Dam e Hmong. Economia incentrata sul commercio fluviale sul Mekong, risaie, legname pregiato (teak) e piantagioni dei Bolovens.",
    s2_4: "Protettorato del Laos (Capoluogo Xam Neua). Mentre il Giappone avanza in Cina e occupa Hainan, le valli del Laos e la via fluviale del Mekong assumono rilevanza logistica strategica. Montagne impervie di confine con il Tonchino settentrionale abitate da popolazioni Tai Dam e Hmong. L'amministrazione francese consolida le piste carovaniere montane e la Route Coloniale 13.",
    s5_6: "Protettorato del Laos (settembre 1939 - giugno 1940). Mobilitazione coloniale allo scoppio della guerra in Europa con contingenti laotiani nei Tirailleurs Indochinois. Dopo la caduta della Francia del giugno 1940, il Laos e il Regno di Luang Prabang restano fedeli al Governo di Vichy e al Governatore Decoux.",
    s7: "Protettorato del Laos (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Difesa della frontiera del Mekong contro gli attacchi d'artiglieria e aerei thailandesi durante la Guerra Franco-Thailandese. Montagne impervie di confine con il Tonchino settentrionale abitate da popolazioni Tai Dam e Hmong.",
    s8: "Protettorato del Laos (Union Indochinoise / Amministrazione Vichy di Decoux sotto occupazione militare giapponese). Nonostante le cessioni territoriali a ovest del Mekong imposte da Tokyo (maggio 1941), la Francia stipula un trattato rafforzato con Re Sisavang Vong a Luang Prabang ampliando la giurisdizione del regno. Montagne impervie di confine con il Tonchino settentrionale abitate da popolazioni Tai Dam e Hmong.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["LAHO"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["LAHO"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["LAHO"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["LAHO"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["LAHO"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Laos — Province de Sam Neua (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Laos — Province de Sam Neua (Gouvernement de Vichy)";
      return "Protectorat du Laos — Province de Sam Neua";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Laos — Province de Sam Neua (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Laos — Province de Sam Neua (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Laos — Province de Sam Neua";
    },
  },
  LAKH: {
    id: "LAKH",
    cntrCode: "LA",
    cntrName: "Laos",
    name: "Khammouan",
    nutsName: "Khammouane (ແຂວງຄຳມ່ວນ)",
    nameLatn: "Khammouan",
    nameEngl: "Khammouan (Laos)",
    modernName: "Khammouane (ແຂວງຄຳມ່ວນ)",
    historicalName: "Protectorat du Laos — Province de Thakhek",
    historicalToponym: "Thakhek",
    adminTitle: "Union Indochinoise — Protectorat du Laos — Province de Thakhek",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Thakhek",
    subRegion: "Laos",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Laos nell'Union Indochinoise (Capoluogo Thakhek). Amministrato dalla Résidence Supérieure de France au Laos con sede a Vientiane. Scalo commerciale sul Mekong e sede del bacino minerario di stagno di Phontiou, fondamentale risorsa strategica coloniale. Economia incentrata sul commercio fluviale sul Mekong, risaie, legname pregiato (teak) e piantagioni dei Bolovens.",
    s2_4: "Protettorato del Laos (Capoluogo Thakhek). Mentre il Giappone avanza in Cina e occupa Hainan, le valli del Laos e la via fluviale del Mekong assumono rilevanza logistica strategica. Scalo commerciale sul Mekong e sede del bacino minerario di stagno di Phontiou, fondamentale risorsa strategica coloniale. L'amministrazione francese consolida le piste carovaniere montane e la Route Coloniale 13.",
    s5_6: "Protettorato del Laos (settembre 1939 - giugno 1940). Mobilitazione coloniale allo scoppio della guerra in Europa con contingenti laotiani nei Tirailleurs Indochinois. Dopo la caduta della Francia del giugno 1940, il Laos e il Regno di Luang Prabang restano fedeli al Governo di Vichy e al Governatore Decoux.",
    s7: "Protettorato del Laos (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Difesa della frontiera del Mekong contro gli attacchi d'artiglieria e aerei thailandesi durante la Guerra Franco-Thailandese. Scalo commerciale sul Mekong e sede del bacino minerario di stagno di Phontiou, fondamentale risorsa strategica coloniale.",
    s8: "Protettorato del Laos (Union Indochinoise / Amministrazione Vichy di Decoux sotto occupazione militare giapponese). Nonostante le cessioni territoriali a ovest del Mekong imposte da Tokyo (maggio 1941), la Francia stipula un trattato rafforzato con Re Sisavang Vong a Luang Prabang ampliando la giurisdizione del regno. Scalo commerciale sul Mekong e sede del bacino minerario di stagno di Phontiou, fondamentale risorsa strategica coloniale.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["LAKH"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["LAKH"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["LAKH"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["LAKH"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["LAKH"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Laos — Province de Thakhek (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Laos — Province de Thakhek (Gouvernement de Vichy)";
      return "Protectorat du Laos — Province de Thakhek";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Laos — Province de Thakhek (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Laos — Province de Thakhek (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Laos — Province de Thakhek";
    },
  },
  LALM: {
    id: "LALM",
    cntrCode: "LA",
    cntrName: "Laos",
    name: "Louangnamtha",
    nutsName: "Luang Namtha (ແຂວງຫຼວງນ້ຳທາ)",
    nameLatn: "Louangnamtha",
    nameEngl: "Louangnamtha (Laos)",
    modernName: "Luang Namtha (ແຂວງຫຼວງນ້ຳທາ)",
    historicalName: "Protectorat du Laos — Haut-Mékong Septentrional",
    historicalToponym: "Luang Namtha",
    adminTitle: "Union Indochinoise — Protectorat du Laos — Haut-Mékong Septentrional",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Luang Namtha",
    subRegion: "Laos",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Laos nell'Union Indochinoise (Capoluogo Luang Namtha). Amministrato dalla Résidence Supérieure de France au Laos con sede a Vientiane. Avamposto montuoso di frontiera con lo Yunnan cinese e la Birmania Britannica, snodo commerciale per il té e la seta. Economia incentrata sul commercio fluviale sul Mekong, risaie, legname pregiato (teak) e piantagioni dei Bolovens.",
    s2_4: "Protettorato del Laos (Capoluogo Luang Namtha). Mentre il Giappone avanza in Cina e occupa Hainan, le valli del Laos e la via fluviale del Mekong assumono rilevanza logistica strategica. Avamposto montuoso di frontiera con lo Yunnan cinese e la Birmania Britannica, snodo commerciale per il té e la seta. L'amministrazione francese consolida le piste carovaniere montane e la Route Coloniale 13.",
    s5_6: "Protettorato del Laos (settembre 1939 - giugno 1940). Mobilitazione coloniale allo scoppio della guerra in Europa con contingenti laotiani nei Tirailleurs Indochinois. Dopo la caduta della Francia del giugno 1940, il Laos e il Regno di Luang Prabang restano fedeli al Governo di Vichy e al Governatore Decoux.",
    s7: "Protettorato del Laos (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Difesa della frontiera del Mekong contro gli attacchi d'artiglieria e aerei thailandesi durante la Guerra Franco-Thailandese. Avamposto montuoso di frontiera con lo Yunnan cinese e la Birmania Britannica, snodo commerciale per il té e la seta.",
    s8: "Protettorato del Laos (Union Indochinoise / Amministrazione Vichy di Decoux sotto occupazione militare giapponese). Nonostante le cessioni territoriali a ovest del Mekong imposte da Tokyo (maggio 1941), la Francia stipula un trattato rafforzato con Re Sisavang Vong a Luang Prabang ampliando la giurisdizione del regno. Avamposto montuoso di frontiera con lo Yunnan cinese e la Birmania Britannica, snodo commerciale per il té e la seta.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["LALM"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["LALM"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["LALM"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["LALM"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["LALM"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Laos — Haut-Mékong Septentrional (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Laos — Haut-Mékong Septentrional (Gouvernement de Vichy)";
      return "Protectorat du Laos — Haut-Mékong Septentrional";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Laos — Haut-Mékong Septentrional (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Laos — Haut-Mékong Septentrional (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Laos — Haut-Mékong Septentrional";
    },
  },
  LAOU: {
    id: "LAOU",
    cntrCode: "LA",
    cntrName: "Laos",
    name: "Oudomxai",
    nutsName: "Oudomxay (ແຂວງອຸດົມໄຊ)",
    nameLatn: "Oudomxai",
    nameEngl: "Oudomxai (Laos)",
    modernName: "Oudomxay (ແຂວງອຸດົມໄຊ)",
    historicalName: "Protectorat du Laos — Circonscription de Muang Xay",
    historicalToponym: "Muang Xay",
    adminTitle: "Union Indochinoise — Protectorat du Laos — Circonscription de Muang Xay",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Muang Xay",
    subRegion: "Laos",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Laos nell'Union Indochinoise (Capoluogo Muang Xay). Amministrato dalla Résidence Supérieure de France au Laos con sede a Vientiane. Incrocio geografico dei sentieri carovanieri del Laos settentrionale tra Luang Prabang e la Cina. Economia incentrata sul commercio fluviale sul Mekong, risaie, legname pregiato (teak) e piantagioni dei Bolovens.",
    s2_4: "Protettorato del Laos (Capoluogo Muang Xay). Mentre il Giappone avanza in Cina e occupa Hainan, le valli del Laos e la via fluviale del Mekong assumono rilevanza logistica strategica. Incrocio geografico dei sentieri carovanieri del Laos settentrionale tra Luang Prabang e la Cina. L'amministrazione francese consolida le piste carovaniere montane e la Route Coloniale 13.",
    s5_6: "Protettorato del Laos (settembre 1939 - giugno 1940). Mobilitazione coloniale allo scoppio della guerra in Europa con contingenti laotiani nei Tirailleurs Indochinois. Dopo la caduta della Francia del giugno 1940, il Laos e il Regno di Luang Prabang restano fedeli al Governo di Vichy e al Governatore Decoux.",
    s7: "Protettorato del Laos (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Difesa della frontiera del Mekong contro gli attacchi d'artiglieria e aerei thailandesi durante la Guerra Franco-Thailandese. Incrocio geografico dei sentieri carovanieri del Laos settentrionale tra Luang Prabang e la Cina.",
    s8: "Protettorato del Laos (Union Indochinoise / Amministrazione Vichy di Decoux sotto occupazione militare giapponese). Nonostante le cessioni territoriali a ovest del Mekong imposte da Tokyo (maggio 1941), la Francia stipula un trattato rafforzato con Re Sisavang Vong a Luang Prabang ampliando la giurisdizione del regno. Incrocio geografico dei sentieri carovanieri del Laos settentrionale tra Luang Prabang e la Cina.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["LAOU"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["LAOU"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["LAOU"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["LAOU"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["LAOU"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Laos — Circonscription de Muang Xay (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Laos — Circonscription de Muang Xay (Gouvernement de Vichy)";
      return "Protectorat du Laos — Circonscription de Muang Xay";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Laos — Circonscription de Muang Xay (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Laos — Circonscription de Muang Xay (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Laos — Circonscription de Muang Xay";
    },
  },
  LAPH: {
    id: "LAPH",
    cntrCode: "LA",
    cntrName: "Laos",
    name: "Phongsaly",
    nutsName: "Phongsaly (ແຂວງຜົ້ງສາລີ)",
    nameLatn: "Phongsaly",
    nameEngl: "Phongsaly (Laos)",
    modernName: "Phongsaly (ແຂວງຜົ້ງສາລີ)",
    historicalName: "Protectorat du Laos — 5e Territoire Militaire",
    historicalToponym: "Phongsali",
    adminTitle: "Union Indochinoise — Protectorat du Laos — 5e Territoire Militaire",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Phongsali",
    subRegion: "Laos",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Laos nell'Union Indochinoise (Capoluogo Phongsali). Amministrato dalla Résidence Supérieure de France au Laos con sede a Vientiane. Presidio militare speciale incuneato tra il Tonchino e la Cina, a guardia dei valichi montani del nord. Economia incentrata sul commercio fluviale sul Mekong, risaie, legname pregiato (teak) e piantagioni dei Bolovens.",
    s2_4: "Protettorato del Laos (Capoluogo Phongsali). Mentre il Giappone avanza in Cina e occupa Hainan, le valli del Laos e la via fluviale del Mekong assumono rilevanza logistica strategica. Presidio militare speciale incuneato tra il Tonchino e la Cina, a guardia dei valichi montani del nord. L'amministrazione francese consolida le piste carovaniere montane e la Route Coloniale 13.",
    s5_6: "Protettorato del Laos (settembre 1939 - giugno 1940). Mobilitazione coloniale allo scoppio della guerra in Europa con contingenti laotiani nei Tirailleurs Indochinois. Dopo la caduta della Francia del giugno 1940, il Laos e il Regno di Luang Prabang restano fedeli al Governo di Vichy e al Governatore Decoux.",
    s7: "Protettorato del Laos (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Difesa della frontiera del Mekong contro gli attacchi d'artiglieria e aerei thailandesi durante la Guerra Franco-Thailandese. Presidio militare speciale incuneato tra il Tonchino e la Cina, a guardia dei valichi montani del nord.",
    s8: "Protettorato del Laos (Union Indochinoise / Amministrazione Vichy di Decoux sotto occupazione militare giapponese). Nonostante le cessioni territoriali a ovest del Mekong imposte da Tokyo (maggio 1941), la Francia stipula un trattato rafforzato con Re Sisavang Vong a Luang Prabang ampliando la giurisdizione del regno. Presidio militare speciale incuneato tra il Tonchino e la Cina, a guardia dei valichi montani del nord.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["LAPH"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["LAPH"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["LAPH"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["LAPH"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["LAPH"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Laos — 5e Territoire Militaire (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Laos — 5e Territoire Militaire (Gouvernement de Vichy)";
      return "Protectorat du Laos — 5e Territoire Militaire";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Laos — 5e Territoire Militaire (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Laos — 5e Territoire Militaire (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Laos — 5e Territoire Militaire";
    },
  },
  LASL: {
    id: "LASL",
    cntrCode: "LA",
    cntrName: "Laos",
    name: "Salavan",
    nutsName: "Salavan (ແຂວງສາລະວັນ)",
    nameLatn: "Salavan",
    nameEngl: "Salavan (Laos)",
    modernName: "Salavan (ແຂວງສາລະວັນ)",
    historicalName: "Protectorat du Laos — Province de Saravane",
    historicalToponym: "Saravane",
    adminTitle: "Union Indochinoise — Protectorat du Laos — Province de Saravane",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Salavan",
    subRegion: "Laos",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Laos nell'Union Indochinoise (Capoluogo Salavan). Amministrato dalla Résidence Supérieure de France au Laos con sede a Vientiane. Cuore dell'Altopiano dei Bolovens celebre per il suolo vulcanico fertile e le piantagioni coloniali di caffè arabica. Economia incentrata sul commercio fluviale sul Mekong, risaie, legname pregiato (teak) e piantagioni dei Bolovens.",
    s2_4: "Protettorato del Laos (Capoluogo Salavan). Mentre il Giappone avanza in Cina e occupa Hainan, le valli del Laos e la via fluviale del Mekong assumono rilevanza logistica strategica. Cuore dell'Altopiano dei Bolovens celebre per il suolo vulcanico fertile e le piantagioni coloniali di caffè arabica. L'amministrazione francese consolida le piste carovaniere montane e la Route Coloniale 13.",
    s5_6: "Protettorato del Laos (settembre 1939 - giugno 1940). Mobilitazione coloniale allo scoppio della guerra in Europa con contingenti laotiani nei Tirailleurs Indochinois. Dopo la caduta della Francia del giugno 1940, il Laos e il Regno di Luang Prabang restano fedeli al Governo di Vichy e al Governatore Decoux.",
    s7: "Protettorato del Laos (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Difesa della frontiera del Mekong contro gli attacchi d'artiglieria e aerei thailandesi durante la Guerra Franco-Thailandese. Cuore dell'Altopiano dei Bolovens celebre per il suolo vulcanico fertile e le piantagioni coloniali di caffè arabica.",
    s8: "Protettorato del Laos (Union Indochinoise / Amministrazione Vichy di Decoux sotto occupazione militare giapponese). Nonostante le cessioni territoriali a ovest del Mekong imposte da Tokyo (maggio 1941), la Francia stipula un trattato rafforzato con Re Sisavang Vong a Luang Prabang ampliando la giurisdizione del regno. Cuore dell'Altopiano dei Bolovens celebre per il suolo vulcanico fertile e le piantagioni coloniali di caffè arabica.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["LASL"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["LASL"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["LASL"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["LASL"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["LASL"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Laos — Province de Saravane (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Laos — Province de Saravane (Gouvernement de Vichy)";
      return "Protectorat du Laos — Province de Saravane";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Laos — Province de Saravane (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Laos — Province de Saravane (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Laos — Province de Saravane";
    },
  },
  LASV: {
    id: "LASV",
    cntrCode: "LA",
    cntrName: "Laos",
    name: "Savannakhet",
    nutsName: "Savannakhet (ແຂວງສະຫວັນນະເຂດ)",
    nameLatn: "Savannakhet",
    nameEngl: "Savannakhet (Laos)",
    modernName: "Savannakhet (ແຂວງສະຫວັນນະເຂດ)",
    historicalName: "Protectorat du Laos — Province de Savannakhet",
    historicalToponym: "Savannakhet",
    adminTitle: "Union Indochinoise — Protectorat du Laos — Province de Savannakhet",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Kaysone Phomvihane",
    subRegion: "Laos",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Laos nell'Union Indochinoise (Capoluogo Kaysone Phomvihane). Amministrato dalla Résidence Supérieure de France au Laos con sede a Vientiane. Principale emporio fluviale del medio Mekong e punto di partenza della vitale Route Coloniale 9 verso Tourane e il Mar Cinese. Economia incentrata sul commercio fluviale sul Mekong, risaie, legname pregiato (teak) e piantagioni dei Bolovens.",
    s2_4: "Protettorato del Laos (Capoluogo Kaysone Phomvihane). Mentre il Giappone avanza in Cina e occupa Hainan, le valli del Laos e la via fluviale del Mekong assumono rilevanza logistica strategica. Principale emporio fluviale del medio Mekong e punto di partenza della vitale Route Coloniale 9 verso Tourane e il Mar Cinese. L'amministrazione francese consolida le piste carovaniere montane e la Route Coloniale 13.",
    s5_6: "Protettorato del Laos (settembre 1939 - giugno 1940). Mobilitazione coloniale allo scoppio della guerra in Europa con contingenti laotiani nei Tirailleurs Indochinois. Dopo la caduta della Francia del giugno 1940, il Laos e il Regno di Luang Prabang restano fedeli al Governo di Vichy e al Governatore Decoux.",
    s7: "Protettorato del Laos (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Difesa della frontiera del Mekong contro gli attacchi d'artiglieria e aerei thailandesi durante la Guerra Franco-Thailandese. Principale emporio fluviale del medio Mekong e punto di partenza della vitale Route Coloniale 9 verso Tourane e il Mar Cinese.",
    s8: "Protettorato del Laos (Union Indochinoise / Amministrazione Vichy di Decoux sotto occupazione militare giapponese). Nonostante le cessioni territoriali a ovest del Mekong imposte da Tokyo (maggio 1941), la Francia stipula un trattato rafforzato con Re Sisavang Vong a Luang Prabang ampliando la giurisdizione del regno. Principale emporio fluviale del medio Mekong e punto di partenza della vitale Route Coloniale 9 verso Tourane e il Mar Cinese.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["LASV"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["LASV"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["LASV"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["LASV"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["LASV"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Laos — Province de Savannakhet (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Laos — Province de Savannakhet (Gouvernement de Vichy)";
      return "Protectorat du Laos — Province de Savannakhet";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Laos — Province de Savannakhet (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Laos — Province de Savannakhet (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Laos — Province de Savannakhet";
    },
  },
  LAXE: {
    id: "LAXE",
    cntrCode: "LA",
    cntrName: "Laos",
    name: "Sekong",
    nutsName: "Sekong (ແຂວງເຊກອງ)",
    nameLatn: "Sekong",
    nameEngl: "Sekong (Laos)",
    modernName: "Sekong (ແຂວງເຊກອງ)",
    historicalName: "Protectorat du Laos — Haut-Sékong",
    historicalToponym: "Sekong",
    adminTitle: "Union Indochinoise — Protectorat du Laos — Haut-Sékong",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Lamam",
    subRegion: "Laos",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Laos nell'Union Indochinoise (Capoluogo Lamam). Amministrato dalla Résidence Supérieure de France au Laos con sede a Vientiane. Bacino fluviale selvaggio e incontaminato abitato da comunità etnolinguistiche Mon-Khmer. Economia incentrata sul commercio fluviale sul Mekong, risaie, legname pregiato (teak) e piantagioni dei Bolovens.",
    s2_4: "Protettorato del Laos (Capoluogo Lamam). Mentre il Giappone avanza in Cina e occupa Hainan, le valli del Laos e la via fluviale del Mekong assumono rilevanza logistica strategica. Bacino fluviale selvaggio e incontaminato abitato da comunità etnolinguistiche Mon-Khmer. L'amministrazione francese consolida le piste carovaniere montane e la Route Coloniale 13.",
    s5_6: "Protettorato del Laos (settembre 1939 - giugno 1940). Mobilitazione coloniale allo scoppio della guerra in Europa con contingenti laotiani nei Tirailleurs Indochinois. Dopo la caduta della Francia del giugno 1940, il Laos e il Regno di Luang Prabang restano fedeli al Governo di Vichy e al Governatore Decoux.",
    s7: "Protettorato del Laos (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Difesa della frontiera del Mekong contro gli attacchi d'artiglieria e aerei thailandesi durante la Guerra Franco-Thailandese. Bacino fluviale selvaggio e incontaminato abitato da comunità etnolinguistiche Mon-Khmer.",
    s8: "Protettorato del Laos (Union Indochinoise / Amministrazione Vichy di Decoux sotto occupazione militare giapponese). Nonostante le cessioni territoriali a ovest del Mekong imposte da Tokyo (maggio 1941), la Francia stipula un trattato rafforzato con Re Sisavang Vong a Luang Prabang ampliando la giurisdizione del regno. Bacino fluviale selvaggio e incontaminato abitato da comunità etnolinguistiche Mon-Khmer.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["LAXE"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["LAXE"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["LAXE"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["LAXE"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["LAXE"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Laos — Haut-Sékong (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Laos — Haut-Sékong (Gouvernement de Vichy)";
      return "Protectorat du Laos — Haut-Sékong";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Laos — Haut-Sékong (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Laos — Haut-Sékong (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Laos — Haut-Sékong";
    },
  },
  LAXA: {
    id: "LAXA",
    cntrCode: "LA",
    cntrName: "Laos",
    name: "Xaignabouly",
    nutsName: "Xaignabouli / Sayaboury (ແຂວງໄຊຍະບູລີ)",
    nameLatn: "Xaignabouly",
    nameEngl: "Xaignabouly (Laos)",
    modernName: "Xaignabouli / Sayaboury (ແຂວງໄຊຍະບູລີ)",
    historicalName: "Protectorat du Laos — Province de Sayaboury",
    historicalToponym: "Sayaboury",
    adminTitle: "Union Indochinoise — Protectorat du Laos — Province de Sayaboury",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Sainyabuli",
    subRegion: "Laos",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Laos nell'Union Indochinoise (Capoluogo Sainyabuli). Amministrato dalla Résidence Supérieure de France au Laos con sede a Vientiane. Provincia a ovest del Mekong; occupata e annessa dalla Thailandia nel Trattato di Tokyo (maggio 1941) col nome di Lan Chang. Economia incentrata sul commercio fluviale sul Mekong, risaie, legname pregiato (teak) e piantagioni dei Bolovens.",
    s2_4: "Protettorato del Laos (Capoluogo Sainyabuli). Mentre il Giappone avanza in Cina e occupa Hainan, le valli del Laos e la via fluviale del Mekong assumono rilevanza logistica strategica. Provincia a ovest del Mekong; occupata e annessa dalla Thailandia nel Trattato di Tokyo (maggio 1941) col nome di Lan Chang. L'amministrazione francese consolida le piste carovaniere montane e la Route Coloniale 13.",
    s5_6: "Protettorato del Laos (settembre 1939 - giugno 1940). Mobilitazione coloniale allo scoppio della guerra in Europa con contingenti laotiani nei Tirailleurs Indochinois. Dopo la caduta della Francia del giugno 1940, il Laos e il Regno di Luang Prabang restano fedeli al Governo di Vichy e al Governatore Decoux.",
    s7: "Protettorato del Laos (Amministrazione di Vichy). Post-Accordo di Hanoi del settembre 1940, la Thailandia di Phibunsongkhram scatena la Guerra Franco-Thailandese bombardando le postazioni francesi sul Mekong e avanzando a ovest del fiume. Provincia a ovest del Mekong; occupata e annessa dalla Thailandia nel Trattato di Tokyo (maggio 1941) col nome di Lan Chang.",
    s8: "Territorio laotiano a ovest del Mekong ceduto forzatamente alla Thailandia col Trattato di Pace di Tokyo del 9 maggio 1941 imposto dall'arbitrato giapponese (provincia di Lan Chang / Nakhon Champassak). Presidio strategico di confine sul corso fluviale del Mekong.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["LAXA"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["LAXA"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["LAXA"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["LAXA"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["LAXA"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 8) return "Protectorat du Laos — Province de Sayaboury (Occupazione Siamese / Thailandia) [Trattato di Tokyo 1941]";
      if (s >= 7) return "Protectorat du Laos — Province de Sayaboury (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Laos — Province de Sayaboury (Gouvernement de Vichy)";
      return "Protectorat du Laos — Province de Sayaboury";
    },
    getAdminTitle: (s: number) => {
      if (s >= 8) return "Regno di Thailandia (Amministrazione Phibunsongkhram / Trattato di Tokyo 1941)";
      if (s >= 7) return "Union Indochinoise — Protectorat du Laos — Province de Sayaboury (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Laos — Province de Sayaboury (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Laos — Province de Sayaboury";
    },
  },
  LAXS: {
    id: "LAXS",
    cntrCode: "LA",
    cntrName: "Laos",
    name: "Xaisomboon",
    nutsName: "Xaisomboun (ແຂວງໄຊສົມບູນ)",
    nameLatn: "Xaisomboon",
    nameEngl: "Xaisomboon (Laos)",
    modernName: "Xaisomboun (ແຂວງໄຊສົມບູນ)",
    historicalName: "Protectorat du Laos — Zone Spéciale du Phou Bia",
    historicalToponym: "Phou Bia",
    adminTitle: "Union Indochinoise — Protectorat du Laos — Zone Spéciale du Phou Bia",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Anouvong",
    subRegion: "Laos",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Laos nell'Union Indochinoise (Capoluogo Anouvong). Amministrato dalla Résidence Supérieure de France au Laos con sede a Vientiane. Imponente massiccio montuoso del Phou Bia, la vetta più alta del Laos, popolato da fiere tribù montane. Economia incentrata sul commercio fluviale sul Mekong, risaie, legname pregiato (teak) e piantagioni dei Bolovens.",
    s2_4: "Protettorato del Laos (Capoluogo Anouvong). Mentre il Giappone avanza in Cina e occupa Hainan, le valli del Laos e la via fluviale del Mekong assumono rilevanza logistica strategica. Imponente massiccio montuoso del Phou Bia, la vetta più alta del Laos, popolato da fiere tribù montane. L'amministrazione francese consolida le piste carovaniere montane e la Route Coloniale 13.",
    s5_6: "Protettorato del Laos (settembre 1939 - giugno 1940). Mobilitazione coloniale allo scoppio della guerra in Europa con contingenti laotiani nei Tirailleurs Indochinois. Dopo la caduta della Francia del giugno 1940, il Laos e il Regno di Luang Prabang restano fedeli al Governo di Vichy e al Governatore Decoux.",
    s7: "Protettorato del Laos (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Difesa della frontiera del Mekong contro gli attacchi d'artiglieria e aerei thailandesi durante la Guerra Franco-Thailandese. Imponente massiccio montuoso del Phou Bia, la vetta più alta del Laos, popolato da fiere tribù montane.",
    s8: "Protettorato del Laos (Union Indochinoise / Amministrazione Vichy di Decoux sotto occupazione militare giapponese). Nonostante le cessioni territoriali a ovest del Mekong imposte da Tokyo (maggio 1941), la Francia stipula un trattato rafforzato con Re Sisavang Vong a Luang Prabang ampliando la giurisdizione del regno. Imponente massiccio montuoso del Phou Bia, la vetta più alta del Laos, popolato da fiere tribù montane.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["LAXS"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["LAXS"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["LAXS"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["LAXS"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["LAXS"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Laos — Zone Spéciale du Phou Bia (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Laos — Zone Spéciale du Phou Bia (Gouvernement de Vichy)";
      return "Protectorat du Laos — Zone Spéciale du Phou Bia";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Laos — Zone Spéciale du Phou Bia (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Laos — Zone Spéciale du Phou Bia (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Laos — Zone Spéciale du Phou Bia";
    },
  },
  LAXI: {
    id: "LAXI",
    cntrCode: "LA",
    cntrName: "Laos",
    name: "Xiengkhouang",
    nutsName: "Xieng Khouang (ແຂວງຊຽງຂວາງ)",
    nameLatn: "Xiengkhouang",
    nameEngl: "Xiengkhouang (Laos)",
    modernName: "Xieng Khouang (ແຂວງຊຽງຂວາງ)",
    historicalName: "Protectorat du Laos — Province de Tran Ninh",
    historicalToponym: "Xieng Khouang",
    adminTitle: "Union Indochinoise — Protectorat du Laos — Province de Tran Ninh",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Phonsavan",
    subRegion: "Laos",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Laos nell'Union Indochinoise (Capoluogo Phonsavan). Amministrato dalla Résidence Supérieure de France au Laos con sede a Vientiane. Sede della celebre Piana delle Giare (Tran Ninh), altopiano strategico fortificato presidiato dalle truppe coloniali. Economia incentrata sul commercio fluviale sul Mekong, risaie, legname pregiato (teak) e piantagioni dei Bolovens.",
    s2_4: "Protettorato del Laos (Capoluogo Phonsavan). Mentre il Giappone avanza in Cina e occupa Hainan, le valli del Laos e la via fluviale del Mekong assumono rilevanza logistica strategica. Sede della celebre Piana delle Giare (Tran Ninh), altopiano strategico fortificato presidiato dalle truppe coloniali. L'amministrazione francese consolida le piste carovaniere montane e la Route Coloniale 13.",
    s5_6: "Protettorato del Laos (settembre 1939 - giugno 1940). Mobilitazione coloniale allo scoppio della guerra in Europa con contingenti laotiani nei Tirailleurs Indochinois. Dopo la caduta della Francia del giugno 1940, il Laos e il Regno di Luang Prabang restano fedeli al Governo di Vichy e al Governatore Decoux.",
    s7: "Protettorato del Laos (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Difesa della frontiera del Mekong contro gli attacchi d'artiglieria e aerei thailandesi durante la Guerra Franco-Thailandese. Sede della celebre Piana delle Giare (Tran Ninh), altopiano strategico fortificato presidiato dalle truppe coloniali.",
    s8: "Protettorato del Laos (Union Indochinoise / Amministrazione Vichy di Decoux sotto occupazione militare giapponese). Nonostante le cessioni territoriali a ovest del Mekong imposte da Tokyo (maggio 1941), la Francia stipula un trattato rafforzato con Re Sisavang Vong a Luang Prabang ampliando la giurisdizione del regno. Sede della celebre Piana delle Giare (Tran Ninh), altopiano strategico fortificato presidiato dalle truppe coloniali.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["LAXI"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["LAXI"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["LAXI"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["LAXI"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["LAXI"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Laos — Province de Tran Ninh (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Laos — Province de Tran Ninh (Gouvernement de Vichy)";
      return "Protectorat du Laos — Province de Tran Ninh";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Laos — Province de Tran Ninh (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Laos — Province de Tran Ninh (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Laos — Province de Tran Ninh";
    },
  },
  VNHN: {
    id: "VNHN",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Ha Noi",
    nutsName: "Hà Nội (Thủ đô Hà Nội)",
    nameLatn: "Ha Noi",
    nameEngl: "Ha Noi (Vietnam)",
    modernName: "Hà Nội (Thủ đô Hà Nội)",
    historicalName: "Protectorat du Tonkin — Capitale de l'Indochine (Hanoï)",
    historicalToponym: "Hanoï",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Capitale de l'Indochine (Hanoï)",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Hà Nội",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Hà Nội). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Capitale del Gouvernement Général de l'Indochine e sede della Résidence Supérieure du Tonkin; teatro dell'Accordo di Hanoi del 22 settembre 1940. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Hà Nội). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Capitale del Gouvernement Général de l'Indochine e sede della Résidence Supérieure du Tonkin; teatro dell'Accordo di Hanoi del 22 settembre 1940. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Hanoi, Capitale del Gouvernement Général de l'Indochine. Il 22 settembre 1940 l'Ammiraglio Jean Decoux firma lo storico Accordo di Hanoi con la missione giapponese del Gen. Nishihara, concedendo tre basi aeree nel Tonchino (Gia Lam, Lao Cai, Phu Lang Thuong) e lo stazionamento di 25.000 soldati giapponesi. Centro di comando militare di Vichy e delle forze dell'Asse.",
    s8: "Hanoi, centro politico dell'Union Indochinoise sotto l'amministrazione del Governatore Generale Jean Decoux (Regime di Vichy) e il comando militare dell'Esercito Imperiale Giapponese. Quartier generale della cooperazione economica e militare per l'espansione nel Sud-est Asiatico.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VNHN"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VNHN"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VNHN"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VNHN"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VNHN"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Capitale de l'Indochine (Hanoï) (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Capitale de l'Indochine (Hanoï) (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Capitale de l'Indochine (Hanoï)";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Capitale de l'Indochine (Hanoï) (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Capitale de l'Indochine (Hanoï) (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Capitale de l'Indochine (Hanoï)";
    },
  },
  VNHP: {
    id: "VNHP",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Hải Phòng",
    nutsName: "Hải Phòng (Thành phố Hải Phòng)",
    nameLatn: "Hải Phòng",
    nameEngl: "Hải Phòng (Vietnam)",
    modernName: "Hải Phòng (Thành phố Hải Phòng)",
    historicalName: "Protectorat du Tonkin — Port de Haïphong",
    historicalToponym: "Haïphong",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Port de Haïphong",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Hải Phòng",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Hải Phòng). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Primo scalo marittimo commerciale dell'Indocina e capolinea della ferrovia dello Yunnan; teatro di sbarco e bombardamento aeronavale giapponese nel settembre 1940. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Hải Phòng). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Primo scalo marittimo commerciale dell'Indocina e capolinea della ferrovia dello Yunnan; teatro di sbarco e bombardamento aeronavale giapponese nel settembre 1940. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Porto marittimo di Haiphong teatro dello sbarco e del bombardamento aeronavale giapponese (24-26 settembre 1940). A seguito dell'Accordo di Hanoi, le forze navali di Tokyo sbarcano truppe e mezzi pesanti per tagliare ogni rotta verso la Cina, trasformando lo scalo nella principale testa di ponte logistica giapponese nel Golfo del Tonchino.",
    s8: "Principale scalo marittimo e base aerea dell'Indocina settentrionale sotto amministrazione di Vichy e controllo militare della Marina Imperiale Giapponese. Snodo nevralgico per i convogli di scorta nel Mar Cinese Meridionale.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VNHP"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VNHP"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VNHP"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VNHP"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VNHP"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Port de Haïphong (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Port de Haïphong (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Port de Haïphong";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Port de Haïphong (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Port de Haïphong (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Port de Haïphong";
    },
  },
  VN01: {
    id: "VN01",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Lai Chau",
    nutsName: "Lai Châu (Tỉnh Lai Châu)",
    nameLatn: "Lai Chau",
    nameEngl: "Lai Chau (Vietnam)",
    modernName: "Lai Châu (Tỉnh Lai Châu)",
    historicalName: "Protectorat du Tonkin — 1er Territoire Militaire (Lai-Chau)",
    historicalToponym: "Lai-Chau",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — 1er Territoire Militaire (Lai-Chau)",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Lai Châu",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Lai Châu). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Presidio militare del Pays Taï Noir sulle gole del Fiume Nero (Song Da) lungo la frontiera cinese. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Lai Châu). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Presidio militare del Pays Taï Noir sulle gole del Fiume Nero (Song Da) lungo la frontiera cinese. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Presidio militare del Pays Taï Noir sulle gole del Fiume Nero (Song Da) lungo la frontiera cinese.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Presidio militare del Pays Taï Noir sulle gole del Fiume Nero (Song Da) lungo la frontiera cinese.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN01"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN01"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN01"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN01"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN01"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — 1er Territoire Militaire (Lai-Chau) (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — 1er Territoire Militaire (Lai-Chau) (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — 1er Territoire Militaire (Lai-Chau)";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — 1er Territoire Militaire (Lai-Chau) (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — 1er Territoire Militaire (Lai-Chau) (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — 1er Territoire Militaire (Lai-Chau)";
    },
  },
  VN02: {
    id: "VN02",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Lào Cai",
    nutsName: "Lào Cai (Tỉnh Lào Cai)",
    nameLatn: "Lào Cai",
    nameEngl: "Lào Cai (Vietnam)",
    modernName: "Lào Cai (Tỉnh Lào Cai)",
    historicalName: "Protectorat du Tonkin — Poste Frontière de Lao-Kay",
    historicalToponym: "Lao-Kay",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Poste Frontière de Lao-Kay",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Lào Cai",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Lào Cai). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Postazione di frontiera e ponte ferroviario strategico sul Fiume Rosso verso Kunming, sorvegliata da dogane e presidi. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Lào Cai). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Postazione di frontiera e ponte ferroviario strategico sul Fiume Rosso verso Kunming, sorvegliata da dogane e presidi. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Postazione di frontiera e ponte ferroviario strategico sul Fiume Rosso verso Kunming, sorvegliata da dogane e presidi.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Postazione di frontiera e ponte ferroviario strategico sul Fiume Rosso verso Kunming, sorvegliata da dogane e presidi.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN02"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN02"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN02"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN02"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN02"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Poste Frontière de Lao-Kay (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Poste Frontière de Lao-Kay (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Poste Frontière de Lao-Kay";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Poste Frontière de Lao-Kay (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Poste Frontière de Lao-Kay (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Poste Frontière de Lao-Kay";
    },
  },
  VN03: {
    id: "VN03",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Hà Giang",
    nutsName: "Hà Giang (Tỉnh Hà Giang)",
    nameLatn: "Hà Giang",
    nameEngl: "Hà Giang (Vietnam)",
    modernName: "Hà Giang (Tỉnh Hà Giang)",
    historicalName: "Protectorat du Tonkin — 3e Territoire Militaire (Ha-Giang)",
    historicalToponym: "Ha-Giang",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — 3e Territoire Militaire (Ha-Giang)",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Hà Giang",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Hà Giang). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Altopiani carsici e passi montani di frontiera settentrionale verso il Guizhou e lo Yunnan. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Hà Giang). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Altopiani carsici e passi montani di frontiera settentrionale verso il Guizhou e lo Yunnan. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Altopiani carsici e passi montani di frontiera settentrionale verso il Guizhou e lo Yunnan.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Altopiani carsici e passi montani di frontiera settentrionale verso il Guizhou e lo Yunnan.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN03"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN03"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN03"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN03"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN03"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — 3e Territoire Militaire (Ha-Giang) (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — 3e Territoire Militaire (Ha-Giang) (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — 3e Territoire Militaire (Ha-Giang)";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — 3e Territoire Militaire (Ha-Giang) (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — 3e Territoire Militaire (Ha-Giang) (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — 3e Territoire Militaire (Ha-Giang)";
    },
  },
  VN04: {
    id: "VN04",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Cao Bằng",
    nutsName: "Cao Bằng (Tỉnh Cao Bằng)",
    nameLatn: "Cao Bằng",
    nameEngl: "Cao Bằng (Vietnam)",
    modernName: "Cao Bằng (Tỉnh Cao Bằng)",
    historicalName: "Protectorat du Tonkin — 2e Territoire Militaire (Cao-Bang)",
    historicalToponym: "Cao-Bang",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — 2e Territoire Militaire (Cao-Bang)",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Cao Bằng",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Cao Bằng). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Piazzaforte militare lungo la Route Coloniale 4 a presidio delle gole di frontiera con la Cina. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Cao Bằng). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Piazzaforte militare lungo la Route Coloniale 4 a presidio delle gole di frontiera con la Cina. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Piazzaforte militare lungo la Route Coloniale 4 a presidio delle gole di frontiera con la Cina.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Piazzaforte militare lungo la Route Coloniale 4 a presidio delle gole di frontiera con la Cina.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN04"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN04"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN04"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN04"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN04"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — 2e Territoire Militaire (Cao-Bang) (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — 2e Territoire Militaire (Cao-Bang) (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — 2e Territoire Militaire (Cao-Bang)";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — 2e Territoire Militaire (Cao-Bang) (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — 2e Territoire Militaire (Cao-Bang) (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — 2e Territoire Militaire (Cao-Bang)";
    },
  },
  VN05: {
    id: "VN05",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Son La",
    nutsName: "Sơn La (Tỉnh Sơn La)",
    nameLatn: "Son La",
    nameEngl: "Son La (Vietnam)",
    modernName: "Sơn La (Tỉnh Sơn La)",
    historicalName: "Protectorat du Tonkin — Territoire Militaire de Son-La",
    historicalToponym: "Son-La",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Territoire Militaire de Son-La",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Sơn La",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Sơn La). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Cittadella fortificata francese e prigione coloniale nel cuore del territorio collinare Tai. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Sơn La). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Cittadella fortificata francese e prigione coloniale nel cuore del territorio collinare Tai. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Cittadella fortificata francese e prigione coloniale nel cuore del territorio collinare Tai.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Cittadella fortificata francese e prigione coloniale nel cuore del territorio collinare Tai.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN05"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN05"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN05"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN05"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN05"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Territoire Militaire de Son-La (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Territoire Militaire de Son-La (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Territoire Militaire de Son-La";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Territoire Militaire de Son-La (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Territoire Militaire de Son-La (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Territoire Militaire de Son-La";
    },
  },
  VN06: {
    id: "VN06",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Yên Bái",
    nutsName: "Yên Bái (Tỉnh Yên Bái)",
    nameLatn: "Yên Bái",
    nameEngl: "Yên Bái (Vietnam)",
    modernName: "Yên Bái (Tỉnh Yên Bái)",
    historicalName: "Protectorat du Tonkin — Province de Yen-Bay",
    historicalToponym: "Yen-Bay",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Province de Yen-Bay",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Yên Bái",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Yên Bái). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Presidio militare sul Fiume Rosso, celebre nella storia vietnamita per l'ammutinamento patriottico del VNQDĐ del 1930. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Yên Bái). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Presidio militare sul Fiume Rosso, celebre nella storia vietnamita per l'ammutinamento patriottico del VNQDĐ del 1930. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Presidio militare sul Fiume Rosso, celebre nella storia vietnamita per l'ammutinamento patriottico del VNQDĐ del 1930.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Presidio militare sul Fiume Rosso, celebre nella storia vietnamita per l'ammutinamento patriottico del VNQDĐ del 1930.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN06"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN06"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN06"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN06"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN06"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Province de Yen-Bay (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Province de Yen-Bay (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Province de Yen-Bay";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Province de Yen-Bay (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Province de Yen-Bay (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Province de Yen-Bay";
    },
  },
  VN07: {
    id: "VN07",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Tuyên Quang",
    nutsName: "Tuyên Quang (Tỉnh Tuyên Quang)",
    nameLatn: "Tuyên Quang",
    nameEngl: "Tuyên Quang (Vietnam)",
    modernName: "Tuyên Quang (Tỉnh Tuyên Quang)",
    historicalName: "Protectorat du Tonkin — Province de Tuyen-Quan",
    historicalToponym: "Tuyen-Quan",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Province de Tuyen-Quan",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Tuyên Quang",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Tuyên Quang). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Rinomato posto fortificato della Legione Straniera francese e snodo di collegamento fluviale sul Fiume Chiaro (Song Lo). Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Tuyên Quang). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Rinomato posto fortificato della Legione Straniera francese e snodo di collegamento fluviale sul Fiume Chiaro (Song Lo). Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Rinomato posto fortificato della Legione Straniera francese e snodo di collegamento fluviale sul Fiume Chiaro (Song Lo).",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Rinomato posto fortificato della Legione Straniera francese e snodo di collegamento fluviale sul Fiume Chiaro (Song Lo).",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN07"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN07"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN07"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN07"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN07"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Province de Tuyen-Quan (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Province de Tuyen-Quan (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Province de Tuyen-Quan";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Province de Tuyen-Quan (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Province de Tuyen-Quan (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Province de Tuyen-Quan";
    },
  },
  VN09: {
    id: "VN09",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Lạng Sơn",
    nutsName: "Lạng Sơn (Tỉnh Lạng Sơn)",
    nameLatn: "Lạng Sơn",
    nameEngl: "Lạng Sơn (Vietnam)",
    modernName: "Lạng Sơn (Tỉnh Lạng Sơn)",
    historicalName: "Protectorat du Tonkin — Province de Lang-Son (Porte de Chine)",
    historicalToponym: "Lang-Son",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Province de Lang-Son (Porte de Chine)",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Lạng Sơn",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Lạng Sơn). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Porta storica della Cina (Dong Dang); teatro della cruenta battaglia del 22-25 settembre 1940 contro la 5ª Divisione Giapponese. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Lạng Sơn). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Porta storica della Cina (Dong Dang); teatro della cruenta battaglia del 22-25 settembre 1940 contro la 5ª Divisione Giapponese. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Teatro della celebre Battaglia di Lạng Sơn (22-25 settembre 1940). Nonostante l'Accordo di Hanoi firmato da Decoux il 22 settembre, la 5ª Divisione dell'Esercito Giapponese attraversa a sorpresa il confine dal Guangxi assaltando la fortezza di Lạng Sơn; dopo aspri combattimenti contro la guarnigione coloniale e i tiratori indocinesi, la piazzaforte capitola prima del cessate il fuoco ordinato da Tokyo.",
    s8: "Piazzaforte di frontiera strategica del Tonchino sotto stazionamento dell'Esercito Imperiale Giapponese e amministrazione di Vichy. Base operativa avanzata dell'Armata della Cina del Sud a presidio della frontiera sino-tonchinese.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN09"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN09"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN09"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN09"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN09"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Province de Lang-Son (Porte de Chine) (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Province de Lang-Son (Porte de Chine) (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Province de Lang-Son (Porte de Chine)";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Province de Lang-Son (Porte de Chine) (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Province de Lang-Son (Porte de Chine) (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Province de Lang-Son (Porte de Chine)";
    },
  },
  VN13: {
    id: "VN13",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Quảng Ninh",
    nutsName: "Quảng Ninh (Hòn Gai / Baie d'Along)",
    nameLatn: "Quảng Ninh",
    nameEngl: "Quảng Ninh (Vietnam)",
    modernName: "Quảng Ninh (Hòn Gai / Baie d'Along)",
    historicalName: "Protectorat du Tonkin — Bassin Houiller de Hòn Gai & Baie d'Along",
    historicalToponym: "Hòn Gai",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Bassin Houiller de Hòn Gai & Baie d'Along",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Hạ Long",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Hạ Long). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Il più ricco bacino carbonifero d'antracite dell'Asia orientale (Société Française des Charbonnages du Tonkin) affacciato sulla Baia di Along. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Hạ Long). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Il più ricco bacino carbonifero d'antracite dell'Asia orientale (Société Française des Charbonnages du Tonkin) affacciato sulla Baia di Along. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Il più ricco bacino carbonifero d'antracite dell'Asia orientale (Société Française des Charbonnages du Tonkin) affacciato sulla Baia di Along.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Il più ricco bacino carbonifero d'antracite dell'Asia orientale (Société Française des Charbonnages du Tonkin) affacciato sulla Baia di Along.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN13"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN13"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN13"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN13"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN13"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Bassin Houiller de Hòn Gai & Baie d'Along (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Bassin Houiller de Hòn Gai & Baie d'Along (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Bassin Houiller de Hòn Gai & Baie d'Along";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Bassin Houiller de Hòn Gai & Baie d'Along (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Bassin Houiller de Hòn Gai & Baie d'Along (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Bassin Houiller de Hòn Gai & Baie d'Along";
    },
  },
  VN14: {
    id: "VN14",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Hòa Bình",
    nutsName: "Hòa Bình (Tỉnh Hòa Bình)",
    nameLatn: "Hòa Bình",
    nameEngl: "Hòa Bình (Vietnam)",
    modernName: "Hòa Bình (Tỉnh Hòa Bình)",
    historicalName: "Protectorat du Tonkin — Province de Hoa-Binh",
    historicalToponym: "Hoa-Binh",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Province de Hoa-Binh",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Hòa Bình",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Hòa Bình). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Regione pedemontana culla dell'etnia Muong e delle prime ricerche preistoriche della cultura Hoabinhiana. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Hòa Bình). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Regione pedemontana culla dell'etnia Muong e delle prime ricerche preistoriche della cultura Hoabinhiana. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Regione pedemontana culla dell'etnia Muong e delle prime ricerche preistoriche della cultura Hoabinhiana.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Regione pedemontana culla dell'etnia Muong e delle prime ricerche preistoriche della cultura Hoabinhiana.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN14"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN14"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN14"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN14"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN14"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Province de Hoa-Binh (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Province de Hoa-Binh (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Province de Hoa-Binh";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Province de Hoa-Binh (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Province de Hoa-Binh (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Province de Hoa-Binh";
    },
  },
  VN18: {
    id: "VN18",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Ninh Bình",
    nutsName: "Ninh Bình (Tỉnh Ninh Bình)",
    nameLatn: "Ninh Bình",
    nameEngl: "Ninh Bình (Vietnam)",
    modernName: "Ninh Bình (Tỉnh Ninh Bình)",
    historicalName: "Protectorat du Tonkin — Province de Ninh-Binh",
    historicalToponym: "Ninh-Binh",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Province de Ninh-Binh",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Ninh Bình",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Ninh Bình). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Paesaggi carsici della 'Baia di Along terrestre' (Tam Coc) e confine naturale tra Tonkino e Annam. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Ninh Bình). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Paesaggi carsici della 'Baia di Along terrestre' (Tam Coc) e confine naturale tra Tonkino e Annam. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Paesaggi carsici della 'Baia di Along terrestre' (Tam Coc) e confine naturale tra Tonkino e Annam.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Paesaggi carsici della 'Baia di Along terrestre' (Tam Coc) e confine naturale tra Tonkino e Annam.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN18"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN18"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN18"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN18"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN18"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Province de Ninh-Binh (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Province de Ninh-Binh (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Province de Ninh-Binh";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Province de Ninh-Binh (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Province de Ninh-Binh (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Province de Ninh-Binh";
    },
  },
  VN20: {
    id: "VN20",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Thái Bình",
    nutsName: "Thái Bình (Tỉnh Thái Bình)",
    nameLatn: "Thái Bình",
    nameEngl: "Thái Bình (Vietnam)",
    modernName: "Thái Bình (Tỉnh Thái Bình)",
    historicalName: "Protectorat du Tonkin — Province de Thai-Binh",
    historicalToponym: "Thai-Binh",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Province de Thai-Binh",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Thái Bình",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Thái Bình). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Intensissima risicoltura alluvionale nel delta del Fiume Rosso con una delle più alte densità rurali dell'Indocina. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Thái Bình). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Intensissima risicoltura alluvionale nel delta del Fiume Rosso con una delle più alte densità rurali dell'Indocina. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Intensissima risicoltura alluvionale nel delta del Fiume Rosso con una delle più alte densità rurali dell'Indocina.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Intensissima risicoltura alluvionale nel delta del Fiume Rosso con una delle più alte densità rurali dell'Indocina.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN20"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN20"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN20"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN20"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN20"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Province de Thai-Binh (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Province de Thai-Binh (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Province de Thai-Binh";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Province de Thai-Binh (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Province de Thai-Binh (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Province de Thai-Binh";
    },
  },
  VN53: {
    id: "VN53",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Đông Bắc",
    nutsName: "Bắc Kạn / Đông Bắc (Tỉnh Bắc Kạn)",
    nameLatn: "Đông Bắc",
    nameEngl: "Đông Bắc (Vietnam)",
    modernName: "Bắc Kạn / Đông Bắc (Tỉnh Bắc Kạn)",
    historicalName: "Protectorat du Tonkin — Province de Bac-Kan",
    historicalToponym: "Bac-Kan",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Province de Bac-Kan",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Bắc Kạn",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Bắc Kạn). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Regione montuosa e fitte foreste tropicali ricche di legname e giacimenti di piombo e zinco. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Bắc Kạn). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Regione montuosa e fitte foreste tropicali ricche di legname e giacimenti di piombo e zinco. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Regione montuosa e fitte foreste tropicali ricche di legname e giacimenti di piombo e zinco.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Regione montuosa e fitte foreste tropicali ricche di legname e giacimenti di piombo e zinco.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN53"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN53"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN53"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN53"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN53"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Province de Bac-Kan (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Province de Bac-Kan (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Province de Bac-Kan";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Province de Bac-Kan (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Province de Bac-Kan (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Province de Bac-Kan";
    },
  },
  VN54: {
    id: "VN54",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Bắc Giang",
    nutsName: "Bắc Giang (Tỉnh Bắc Giang)",
    nameLatn: "Bắc Giang",
    nameEngl: "Bắc Giang (Vietnam)",
    modernName: "Bắc Giang (Tỉnh Bắc Giang)",
    historicalName: "Protectorat du Tonkin — Circonscription de Phu Lang Thuong",
    historicalToponym: "Phủ Lạng Thương",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Circonscription de Phu Lang Thuong",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Bắc Giang",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Bắc Giang). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Importante base aerea coloniale (Phủ Lạng Thương) concessa in uso all'aviazione giapponese con l'Accordo di Hanoi del 1940. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Bắc Giang). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Importante base aerea coloniale (Phủ Lạng Thương) concessa in uso all'aviazione giapponese con l'Accordo di Hanoi del 1940. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Importante base aerea coloniale (Phủ Lạng Thương) concessa in uso all'aviazione giapponese con l'Accordo di Hanoi del 1940.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Importante base aerea coloniale (Phủ Lạng Thương) concessa in uso all'aviazione giapponese con l'Accordo di Hanoi del 1940.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN54"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN54"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN54"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN54"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN54"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Circonscription de Phu Lang Thuong (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Circonscription de Phu Lang Thuong (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Circonscription de Phu Lang Thuong";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Circonscription de Phu Lang Thuong (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Circonscription de Phu Lang Thuong (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Circonscription de Phu Lang Thuong";
    },
  },
  VN56: {
    id: "VN56",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Bắc Ninh",
    nutsName: "Bắc Ninh (Tỉnh Bắc Ninh)",
    nameLatn: "Bắc Ninh",
    nameEngl: "Bắc Ninh (Vietnam)",
    modernName: "Bắc Ninh (Tỉnh Bắc Ninh)",
    historicalName: "Protectorat du Tonkin — Province de Bac-Ninh",
    historicalToponym: "Bac-Ninh",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Province de Bac-Ninh",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Bắc Ninh",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Bắc Ninh). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Antico centro culturale della civiltà del Fiume Rosso, famoso per le manifatture tessili e la seteria. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Bắc Ninh). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Antico centro culturale della civiltà del Fiume Rosso, famoso per le manifatture tessili e la seteria. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Antico centro culturale della civiltà del Fiume Rosso, famoso per le manifatture tessili e la seteria.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Antico centro culturale della civiltà del Fiume Rosso, famoso per le manifatture tessili e la seteria.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN56"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN56"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN56"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN56"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN56"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Province de Bac-Ninh (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Province de Bac-Ninh (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Province de Bac-Ninh";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Province de Bac-Ninh (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Province de Bac-Ninh (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Province de Bac-Ninh";
    },
  },
  VN61: {
    id: "VN61",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Hải Dương",
    nutsName: "Hải Dương (Tỉnh Hải Dương)",
    nameLatn: "Hải Dương",
    nameEngl: "Hải Dương (Vietnam)",
    modernName: "Hải Dương (Tỉnh Hải Dương)",
    historicalName: "Protectorat du Tonkin — Province de Hai-Duong",
    historicalToponym: "Hai-Duong",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Province de Hai-Duong",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Hải Dương",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Hải Dương). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Snodo ferroviario e idroviario lungo l'asse principale Hanoi-Haiphong, cuore del commercio agricolo tonchinese. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Hải Dương). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Snodo ferroviario e idroviario lungo l'asse principale Hanoi-Haiphong, cuore del commercio agricolo tonchinese. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Snodo ferroviario e idroviario lungo l'asse principale Hanoi-Haiphong, cuore del commercio agricolo tonchinese.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Snodo ferroviario e idroviario lungo l'asse principale Hanoi-Haiphong, cuore del commercio agricolo tonchinese.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN61"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN61"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN61"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN61"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN61"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Province de Hai-Duong (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Province de Hai-Duong (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Province de Hai-Duong";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Province de Hai-Duong (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Province de Hai-Duong (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Province de Hai-Duong";
    },
  },
  VN63: {
    id: "VN63",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Hà Nam",
    nutsName: "Hà Nam (Tỉnh Hà Nam)",
    nameLatn: "Hà Nam",
    nameEngl: "Hà Nam (Vietnam)",
    modernName: "Hà Nam (Tỉnh Hà Nam)",
    historicalName: "Protectorat du Tonkin — Circonscription de Phu-Ly",
    historicalToponym: "Phủ Lý",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Circonscription de Phu-Ly",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Phủ Lý",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Phủ Lý). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Centro di smistamento agricolo e tessile nella pianura meridionale del delta. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Phủ Lý). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Centro di smistamento agricolo e tessile nella pianura meridionale del delta. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Centro di smistamento agricolo e tessile nella pianura meridionale del delta.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Centro di smistamento agricolo e tessile nella pianura meridionale del delta.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN63"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN63"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN63"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN63"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN63"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Circonscription de Phu-Ly (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Circonscription de Phu-Ly (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Circonscription de Phu-Ly";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Circonscription de Phu-Ly (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Circonscription de Phu-Ly (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Circonscription de Phu-Ly";
    },
  },
  VN66: {
    id: "VN66",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Đồng Bằng Sông Hồng",
    nutsName: "Hưng Yên (Đồng Bằng Sông Hồng)",
    nameLatn: "Đồng Bằng Sông Hồng",
    nameEngl: "Đồng Bằng Sông Hồng (Vietnam)",
    modernName: "Hưng Yên (Đồng Bằng Sông Hồng)",
    historicalName: "Protectorat du Tonkin — Province de Hung-Yen",
    historicalToponym: "Hung-Yen",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Province de Hung-Yen",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Hưng Yên",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Hưng Yên). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Cuore fertile del delta del Fiume Rosso, sede dell'antico scalo portuale di Phố Hiến. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Hưng Yên). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Cuore fertile del delta del Fiume Rosso, sede dell'antico scalo portuale di Phố Hiến. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Cuore fertile del delta del Fiume Rosso, sede dell'antico scalo portuale di Phố Hiến.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Cuore fertile del delta del Fiume Rosso, sede dell'antico scalo portuale di Phố Hiến.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN66"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN66"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN66"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN66"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN66"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Province de Hung-Yen (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Province de Hung-Yen (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Province de Hung-Yen";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Province de Hung-Yen (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Province de Hung-Yen (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Province de Hung-Yen";
    },
  },
  VN67: {
    id: "VN67",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Nam Định",
    nutsName: "Nam Định (Tỉnh Nam Định)",
    nameLatn: "Nam Định",
    nameEngl: "Nam Định (Vietnam)",
    modernName: "Nam Định (Tỉnh Nam Định)",
    historicalName: "Protectorat du Tonkin — Métropole Textile de Nam-Dinh",
    historicalToponym: "Nam-Dinh",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Métropole Textile de Nam-Dinh",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Nam Định",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Nam Định). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Grande capitale industriale e manifatturiera dell'Indocina, sede della celebre Société Cotonnière du Tonkin. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Nam Định). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Grande capitale industriale e manifatturiera dell'Indocina, sede della celebre Société Cotonnière du Tonkin. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Grande capitale industriale e manifatturiera dell'Indocina, sede della celebre Société Cotonnière du Tonkin.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Grande capitale industriale e manifatturiera dell'Indocina, sede della celebre Société Cotonnière du Tonkin.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN67"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN67"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN67"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN67"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN67"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Métropole Textile de Nam-Dinh (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Métropole Textile de Nam-Dinh (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Métropole Textile de Nam-Dinh";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Métropole Textile de Nam-Dinh (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Métropole Textile de Nam-Dinh (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Métropole Textile de Nam-Dinh";
    },
  },
  VN68: {
    id: "VN68",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Phú Thọ",
    nutsName: "Phú Thọ (Tỉnh Phú Thọ)",
    nameLatn: "Phú Thọ",
    nameEngl: "Phú Thọ (Vietnam)",
    modernName: "Phú Thọ (Tỉnh Phú Thọ)",
    historicalName: "Protectorat du Tonkin — Province de Phu-Tho",
    historicalToponym: "Phu-Tho",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Province de Phu-Tho",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Việt Trì",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Việt Trì). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Confluenza navigabile dei tre fiumi (Rosso, Nero e Chiaro) e colline coltivate a té. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Việt Trì). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Confluenza navigabile dei tre fiumi (Rosso, Nero e Chiaro) e colline coltivate a té. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Confluenza navigabile dei tre fiumi (Rosso, Nero e Chiaro) e colline coltivate a té.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Confluenza navigabile dei tre fiumi (Rosso, Nero e Chiaro) e colline coltivate a té.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN68"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN68"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN68"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN68"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN68"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Province de Phu-Tho (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Province de Phu-Tho (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Province de Phu-Tho";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Province de Phu-Tho (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Province de Phu-Tho (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Province de Phu-Tho";
    },
  },
  VN69: {
    id: "VN69",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Thái Nguyên",
    nutsName: "Thái Nguyên (Tỉnh Thái Nguyên)",
    nameLatn: "Thái Nguyên",
    nameEngl: "Thái Nguyên (Vietnam)",
    modernName: "Thái Nguyên (Tỉnh Thái Nguyên)",
    historicalName: "Protectorat du Tonkin — Province de Thai-Nguyen",
    historicalToponym: "Thai-Nguyen",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Province de Thai-Nguyen",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Thái Nguyên",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Thái Nguyên). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Polo metallurgico e minerario del Tonkino settentrionale con estese miniere di ferro. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Thái Nguyên). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Polo metallurgico e minerario del Tonkino settentrionale con estese miniere di ferro. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Polo metallurgico e minerario del Tonkino settentrionale con estese miniere di ferro.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Polo metallurgico e minerario del Tonkino settentrionale con estese miniere di ferro.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN69"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN69"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN69"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN69"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN69"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Province de Thai-Nguyen (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Province de Thai-Nguyen (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Province de Thai-Nguyen";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Province de Thai-Nguyen (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Province de Thai-Nguyen (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Province de Thai-Nguyen";
    },
  },
  VN70: {
    id: "VN70",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Vĩnh Phúc",
    nutsName: "Vĩnh Phúc (Vĩnh Yên & Phúc Yên)",
    nameLatn: "Vĩnh Phúc",
    nameEngl: "Vĩnh Phúc (Vietnam)",
    modernName: "Vĩnh Phúc (Vĩnh Yên & Phúc Yên)",
    historicalName: "Protectorat du Tonkin — Province de Vinh-Yen",
    historicalToponym: "Vinh-Yen",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Province de Vinh-Yen",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Vĩnh Yên",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Vĩnh Yên). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Distretto agricolo suburbano alle porte occidentali di Hanoi, noto per la stazione climatica collinare di Tam Đảo. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Vĩnh Yên). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Distretto agricolo suburbano alle porte occidentali di Hanoi, noto per la stazione climatica collinare di Tam Đảo. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Distretto agricolo suburbano alle porte occidentali di Hanoi, noto per la stazione climatica collinare di Tam Đảo.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Distretto agricolo suburbano alle porte occidentali di Hanoi, noto per la stazione climatica collinare di Tam Đảo.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN70"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN70"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN70"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN70"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN70"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Province de Vinh-Yen (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Province de Vinh-Yen (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Province de Vinh-Yen";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Province de Vinh-Yen (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Province de Vinh-Yen (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Province de Vinh-Yen";
    },
  },
  VN71: {
    id: "VN71",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Điện Biên",
    nutsName: "Điện Biên (Mường Thanh / Điện Biên Phủ)",
    nameLatn: "Điện Biên",
    nameEngl: "Điện Biên (Vietnam)",
    modernName: "Điện Biên (Mường Thanh / Điện Biên Phủ)",
    historicalName: "Protectorat du Tonkin — Vallée de Dien-Bien-Phu",
    historicalToponym: "Dien-Bien-Phu",
    adminTitle: "Union Indochinoise — Protectorat du Tonkin — Vallée de Dien-Bien-Phu",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Điện Biên Phủ",
    subRegion: "Tonkin",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato del Tonchino (Bắc Kỳ) nell'Union Indochinoise (Capoluogo Điện Biên Phủ). Sotto la guida della Résidence Supérieure du Tonkin e del Gouvernement Général dell'Indocina. Valle strategica di Mường Thanh, presidio avanzato sul confine con il Laos e capitale dell'aristocrazia Tai. Snodo economico vitale imperniato sulle risaie intensive del Delta del Fiume Rosso e sui bacini minerari montani.",
    s2_4: "Protettorato del Tonchino (Capoluogo Điện Biên Phủ). Durante la Seconda Guerra Sino-Giapponese (1937-1939), il Tonchino diventa il cordone ombelicale vitale per il governo nazionalista cinese di Chiang Kai-shek tramite la ferrovia Haiphong-Hanoi-Kunming. Valle strategica di Mường Thanh, presidio avanzato sul confine con il Laos e capitale dell'aristocrazia Tai. Tokyo intensifica i voli di ricognizione dopo la presa di Hainan.",
    s5_6: "Protettorato del Tonchino (settembre 1939 - giugno 1940). Sotto il comando del Governatore Georges Catroux, la ferrovia dello Yunnan lavora a ritmo febbrile trasportando autocarri, carburante e munizioni per la Cina. Con la caduta della Francia nel giugno 1940, Tokyo impone il blocco dei rifornimenti; Catroux è revocato e sostituito dall'Ammiraglio Decoux (Vichy).",
    s7: "Protettorato del Tonchino (Amministrazione di Vichy e stazionamento militare dell'Esercito Giapponese post-Accordo di Hanoi del settembre 1940). Le truppe giapponesi presidiano le basi aeree e le linee ferroviarie strategiche verso lo Yunnan e il Guangxi. Valle strategica di Mường Thanh, presidio avanzato sul confine con il Laos e capitale dell'aristocrazia Tai.",
    s8: "Protettorato del Tonchino (Union Indochinoise / Governo di Vichy sotto occupazione militare giapponese). Presidio strategico e produzione intensiva a sostegno dello sforzo bellico dell'Asse nell'Asia orientale. Valle strategica di Mường Thanh, presidio avanzato sul confine con il Laos e capitale dell'aristocrazia Tai.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN71"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN71"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN71"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN71"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN71"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat du Tonkin — Vallée de Dien-Bien-Phu (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat du Tonkin — Vallée de Dien-Bien-Phu (Gouvernement de Vichy)";
      return "Protectorat du Tonkin — Vallée de Dien-Bien-Phu";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat du Tonkin — Vallée de Dien-Bien-Phu (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat du Tonkin — Vallée de Dien-Bien-Phu (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat du Tonkin — Vallée de Dien-Bien-Phu";
    },
  },
  VN26: {
    id: "VN26",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Thừa Thiên - Huế",
    nutsName: "Thừa Thiên Huế (Cố đô Huế)",
    nameLatn: "Thừa Thiên - Huế",
    nameEngl: "Thừa Thiên - Huế (Vietnam)",
    modernName: "Thừa Thiên Huế (Cố đô Huế)",
    historicalName: "Protectorat de l'Annam — Capitale Impériale de Hué",
    historicalToponym: "Hué",
    adminTitle: "Union Indochinoise — Protectorat de l'Annam — Capitale Impériale de Hué",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Huế",
    subRegion: "Annam",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo Huế). Sede della Corte Imperiale della Dinastia Nguyễn con l'Imperatore Bảo Đại e il Primo Ministro Phạm Quỳnh, affiancati dalla Résidence Supérieure de France. Capitale dell'Impero d'Annam sotto la sovranità della Dinastia Nguyễn (Imperatore Bảo Đại) e residenza del Résident Supérieur. Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central.",
    s2_4: "Protettorato dell'Annam (Capoluogo Huế). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. Capitale dell'Impero d'Annam sotto la sovranità della Dinastia Nguyễn (Imperatore Bảo Đại) e residenza del Résident Supérieur. Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon.",
    s5_6: "Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux.",
    s7: "Huế, Capitale Imperiale dell'Annam. A seguito dell'Accordo di Hanoi del settembre 1940 firmato da Jean Decoux con Tokyo, l'Imperatore Bảo Đại e la corte mantengono il protocollo tradizionale sotto l'autorità di Vichy. L'ingresso giapponese nel Tonchino modifica gli equilibri politici, alimentando fermenti patriottici. Capitale dell'Impero d'Annam sotto la sovranità della Dinastia Nguyễn (Imperatore Bảo Đại) e residenza del Résident Supérieur.",
    s8: "Huế, sede della corona imperiale di Annam sotto il protettorato francese di Vichy e l'egemonia militare giapponese. Decoux promuove una politica di restaurazione tradizionale filo-francese per arginare l'influenza politica di Tokyo.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN26"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN26"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN26"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN26"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN26"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat de l'Annam — Capitale Impériale de Hué (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat de l'Annam — Capitale Impériale de Hué (Gouvernement de Vichy)";
      return "Protectorat de l'Annam — Capitale Impériale de Hué";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat de l'Annam — Capitale Impériale de Hué (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat de l'Annam — Capitale Impériale de Hué (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat de l'Annam — Capitale Impériale de Hué";
    },
  },
  VNDN: {
    id: "VNDN",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Đà Nẵng",
    nutsName: "Đà Nẵng / Tourane (Thành phố Đà Nẵng)",
    nameLatn: "Đà Nẵng",
    nameEngl: "Đà Nẵng (Vietnam)",
    modernName: "Đà Nẵng / Tourane (Thành phố Đà Nẵng)",
    historicalName: "Protectorat de l'Annam — Concession Navale de Tourane",
    historicalToponym: "Tourane",
    adminTitle: "Union Indochinoise — Protectorat de l'Annam — Concession Navale de Tourane",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Đà Nẵng",
    subRegion: "Annam",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo Đà Nẵng). Sotto l'autorità della Résidence Supérieure de France en Annam. Porto marittimo d'altura e concessione francese in Annam, base logistica della Route Coloniale 9. Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central.",
    s2_4: "Protettorato dell'Annam (Capoluogo Đà Nẵng). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. Porto marittimo d'altura e concessione francese in Annam, base logistica della Route Coloniale 9. Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon.",
    s5_6: "Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux.",
    s7: "Tourane (Đà Nẵng), porto marittimo militare e concessione francese in Annam. Snodo nevralgico della Route Coloniale 9 verso il Laos e base di supporto navale. Post-Accordo di Hanoi del settembre 1940, le strutture portuali operano sotto sorveglianza militare giapponese.",
    s8: "Tourane (Đà Nẵng), scalo oceanico dell'Annam centrale a disposizione delle operazioni navali e dei convogli di scorta della Marina Giapponese in cooperazione con le autorità francesi di Vichy.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VNDN"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VNDN"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VNDN"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VNDN"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VNDN"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat de l'Annam — Concession Navale de Tourane (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat de l'Annam — Concession Navale de Tourane (Gouvernement de Vichy)";
      return "Protectorat de l'Annam — Concession Navale de Tourane";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat de l'Annam — Concession Navale de Tourane (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat de l'Annam — Concession Navale de Tourane (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat de l'Annam — Concession Navale de Tourane";
    },
  },
  VN21: {
    id: "VN21",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Thanh Hóa",
    nutsName: "Thanh Hóa (Tỉnh Thanh Hóa)",
    nameLatn: "Thanh Hóa",
    nameEngl: "Thanh Hóa (Vietnam)",
    modernName: "Thanh Hóa (Tỉnh Thanh Hóa)",
    historicalName: "Protectorat de l'Annam — Province de Thanh-Hoa",
    historicalToponym: "Thanh-Hoa",
    adminTitle: "Union Indochinoise — Protectorat de l'Annam — Province de Thanh-Hoa",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Thanh Hóa",
    subRegion: "Annam",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo Thanh Hóa). Sotto l'autorità della Résidence Supérieure de France en Annam. Porta settentrionale dell'Annam, estesa pianura risicola e terra d'origine di illustri dinastie imperiali. Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central.",
    s2_4: "Protettorato dell'Annam (Capoluogo Thanh Hóa). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. Porta settentrionale dell'Annam, estesa pianura risicola e terra d'origine di illustri dinastie imperiali. Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon.",
    s5_6: "Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux.",
    s7: "Protettorato dell'Annam (Amministrazione di Vichy e stazionamento strategico giapponese post-Accordo di Hanoi del settembre 1940). Monitoraggio delle comunicazioni radio e pattugliamento delle rotte costiere e dell'altopiano. Porta settentrionale dell'Annam, estesa pianura risicola e terra d'origine di illustri dinastie imperiali.",
    s8: "Protettorato dell'Annam (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto il controllo militare giapponese). Stabilità interna presidiata dalla guardia indigena e dai reparti dell'Esercito Giapponese. Porta settentrionale dell'Annam, estesa pianura risicola e terra d'origine di illustri dinastie imperiali.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN21"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN21"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN21"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN21"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN21"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat de l'Annam — Province de Thanh-Hoa (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat de l'Annam — Province de Thanh-Hoa (Gouvernement de Vichy)";
      return "Protectorat de l'Annam — Province de Thanh-Hoa";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat de l'Annam — Province de Thanh-Hoa (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat de l'Annam — Province de Thanh-Hoa (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat de l'Annam — Province de Thanh-Hoa";
    },
  },
  VN22: {
    id: "VN22",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Nghệ An",
    nutsName: "Nghệ An (Vinh-Bến Thủy)",
    nameLatn: "Nghệ An",
    nameEngl: "Nghệ An (Vietnam)",
    modernName: "Nghệ An (Vinh-Bến Thủy)",
    historicalName: "Protectorat de l'Annam — Circonscription de Vinh",
    historicalToponym: "Vinh",
    adminTitle: "Union Indochinoise — Protectorat de l'Annam — Circonscription de Vinh",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Vinh",
    subRegion: "Annam",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo Vinh). Sotto l'autorità della Résidence Supérieure de France en Annam. Grande centro portuale fluviale di Vinh e polo operaio, celebre per le rivolte contadine dei 'Soviet di Nghệ-Tĩnh' del 1930-31. Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central.",
    s2_4: "Protettorato dell'Annam (Capoluogo Vinh). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. Grande centro portuale fluviale di Vinh e polo operaio, celebre per le rivolte contadine dei 'Soviet di Nghệ-Tĩnh' del 1930-31. Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon.",
    s5_6: "Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux.",
    s7: "Protettorato dell'Annam (Amministrazione di Vichy e stazionamento strategico giapponese post-Accordo di Hanoi del settembre 1940). Monitoraggio delle comunicazioni radio e pattugliamento delle rotte costiere e dell'altopiano. Grande centro portuale fluviale di Vinh e polo operaio, celebre per le rivolte contadine dei 'Soviet di Nghệ-Tĩnh' del 1930-31.",
    s8: "Protettorato dell'Annam (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto il controllo militare giapponese). Stabilità interna presidiata dalla guardia indigena e dai reparti dell'Esercito Giapponese. Grande centro portuale fluviale di Vinh e polo operaio, celebre per le rivolte contadine dei 'Soviet di Nghệ-Tĩnh' del 1930-31.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN22"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN22"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN22"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN22"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN22"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat de l'Annam — Circonscription de Vinh (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat de l'Annam — Circonscription de Vinh (Gouvernement de Vichy)";
      return "Protectorat de l'Annam — Circonscription de Vinh";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat de l'Annam — Circonscription de Vinh (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat de l'Annam — Circonscription de Vinh (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat de l'Annam — Circonscription de Vinh";
    },
  },
  VN23: {
    id: "VN23",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Ha Tinh",
    nutsName: "Hà Tĩnh (Tỉnh Hà Tĩnh)",
    nameLatn: "Ha Tinh",
    nameEngl: "Ha Tinh (Vietnam)",
    modernName: "Hà Tĩnh (Tỉnh Hà Tĩnh)",
    historicalName: "Protectorat de l'Annam — Province de Ha-Tinh",
    historicalToponym: "Ha-Tinh",
    adminTitle: "Union Indochinoise — Protectorat de l'Annam — Province de Ha-Tinh",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Hà Tĩnh",
    subRegion: "Annam",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo Hà Tĩnh). Sotto l'autorità della Résidence Supérieure de France en Annam. Fascia litoranea costiera e collinare ai piedi della Catena Annamita, dedita alla pesca e all'agricoltura. Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central.",
    s2_4: "Protettorato dell'Annam (Capoluogo Hà Tĩnh). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. Fascia litoranea costiera e collinare ai piedi della Catena Annamita, dedita alla pesca e all'agricoltura. Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon.",
    s5_6: "Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux.",
    s7: "Protettorato dell'Annam (Amministrazione di Vichy e stazionamento strategico giapponese post-Accordo di Hanoi del settembre 1940). Monitoraggio delle comunicazioni radio e pattugliamento delle rotte costiere e dell'altopiano. Fascia litoranea costiera e collinare ai piedi della Catena Annamita, dedita alla pesca e all'agricoltura.",
    s8: "Protettorato dell'Annam (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto il controllo militare giapponese). Stabilità interna presidiata dalla guardia indigena e dai reparti dell'Esercito Giapponese. Fascia litoranea costiera e collinare ai piedi della Catena Annamita, dedita alla pesca e all'agricoltura.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN23"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN23"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN23"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN23"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN23"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat de l'Annam — Province de Ha-Tinh (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat de l'Annam — Province de Ha-Tinh (Gouvernement de Vichy)";
      return "Protectorat de l'Annam — Province de Ha-Tinh";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat de l'Annam — Province de Ha-Tinh (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat de l'Annam — Province de Ha-Tinh (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat de l'Annam — Province de Ha-Tinh";
    },
  },
  VN24: {
    id: "VN24",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Quảng Bình",
    nutsName: "Quảng Bình (Tỉnh Quảng Bình)",
    nameLatn: "Quảng Bình",
    nameEngl: "Quảng Bình (Vietnam)",
    modernName: "Quảng Bình (Tỉnh Quảng Bình)",
    historicalName: "Protectorat de l'Annam — Province de Dong-Hoi",
    historicalToponym: "Dong-Hoi",
    adminTitle: "Union Indochinoise — Protectorat de l'Annam — Province de Dong-Hoi",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Đồng Hới",
    subRegion: "Annam",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo Đồng Hới). Sotto l'autorità della Résidence Supérieure de France en Annam. Storica fortificazione di Đồng Hới a presidio del passo di Đèo Ngang (Porte d'Annam) e grotte carsiche. Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central.",
    s2_4: "Protettorato dell'Annam (Capoluogo Đồng Hới). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. Storica fortificazione di Đồng Hới a presidio del passo di Đèo Ngang (Porte d'Annam) e grotte carsiche. Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon.",
    s5_6: "Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux.",
    s7: "Protettorato dell'Annam (Amministrazione di Vichy e stazionamento strategico giapponese post-Accordo di Hanoi del settembre 1940). Monitoraggio delle comunicazioni radio e pattugliamento delle rotte costiere e dell'altopiano. Storica fortificazione di Đồng Hới a presidio del passo di Đèo Ngang (Porte d'Annam) e grotte carsiche.",
    s8: "Protettorato dell'Annam (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto il controllo militare giapponese). Stabilità interna presidiata dalla guardia indigena e dai reparti dell'Esercito Giapponese. Storica fortificazione di Đồng Hới a presidio del passo di Đèo Ngang (Porte d'Annam) e grotte carsiche.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN24"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN24"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN24"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN24"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN24"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat de l'Annam — Province de Dong-Hoi (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat de l'Annam — Province de Dong-Hoi (Gouvernement de Vichy)";
      return "Protectorat de l'Annam — Province de Dong-Hoi";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat de l'Annam — Province de Dong-Hoi (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat de l'Annam — Province de Dong-Hoi (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat de l'Annam — Province de Dong-Hoi";
    },
  },
  VN25: {
    id: "VN25",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Quảng Trị",
    nutsName: "Quảng Trị (Tỉnh Quảng Trị)",
    nameLatn: "Quảng Trị",
    nameEngl: "Quảng Trị (Vietnam)",
    modernName: "Quảng Trị (Tỉnh Quảng Trị)",
    historicalName: "Protectorat de l'Annam — Province de Quang-Tri",
    historicalToponym: "Quang-Tri",
    adminTitle: "Union Indochinoise — Protectorat de l'Annam — Province de Quang-Tri",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Quảng Trị",
    subRegion: "Annam",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo Quảng Trị). Sotto l'autorità della Résidence Supérieure de France en Annam. Antica provincia di frontiera attorno al fiume Thạch Hãn e punto di congiunzione sulla costa centrale. Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central.",
    s2_4: "Protettorato dell'Annam (Capoluogo Quảng Trị). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. Antica provincia di frontiera attorno al fiume Thạch Hãn e punto di congiunzione sulla costa centrale. Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon.",
    s5_6: "Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux.",
    s7: "Protettorato dell'Annam (Amministrazione di Vichy e stazionamento strategico giapponese post-Accordo di Hanoi del settembre 1940). Monitoraggio delle comunicazioni radio e pattugliamento delle rotte costiere e dell'altopiano. Antica provincia di frontiera attorno al fiume Thạch Hãn e punto di congiunzione sulla costa centrale.",
    s8: "Protettorato dell'Annam (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto il controllo militare giapponese). Stabilità interna presidiata dalla guardia indigena e dai reparti dell'Esercito Giapponese. Antica provincia di frontiera attorno al fiume Thạch Hãn e punto di congiunzione sulla costa centrale.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN25"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN25"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN25"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN25"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN25"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat de l'Annam — Province de Quang-Tri (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat de l'Annam — Province de Quang-Tri (Gouvernement de Vichy)";
      return "Protectorat de l'Annam — Province de Quang-Tri";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat de l'Annam — Province de Quang-Tri (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat de l'Annam — Province de Quang-Tri (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat de l'Annam — Province de Quang-Tri";
    },
  },
  VN27: {
    id: "VN27",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Quàng Nam",
    nutsName: "Quảng Nam (Faifo / Hội An)",
    nameLatn: "Quàng Nam",
    nameEngl: "Quàng Nam (Vietnam)",
    modernName: "Quảng Nam (Faifo / Hội An)",
    historicalName: "Protectorat de l'Annam — Province de Faifo",
    historicalToponym: "Faifo",
    adminTitle: "Union Indochinoise — Protectorat de l'Annam — Province de Faifo",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Tam Kỳ",
    subRegion: "Annam",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo Tam Kỳ). Sotto l'autorità della Résidence Supérieure de France en Annam. Celeberrimo emporio commerciale marittimo di Faifo (Hội An) e santuario cham di Mỹ Sơn. Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central.",
    s2_4: "Protettorato dell'Annam (Capoluogo Tam Kỳ). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. Celeberrimo emporio commerciale marittimo di Faifo (Hội An) e santuario cham di Mỹ Sơn. Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon.",
    s5_6: "Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux.",
    s7: "Protettorato dell'Annam (Amministrazione di Vichy e stazionamento strategico giapponese post-Accordo di Hanoi del settembre 1940). Monitoraggio delle comunicazioni radio e pattugliamento delle rotte costiere e dell'altopiano. Celeberrimo emporio commerciale marittimo di Faifo (Hội An) e santuario cham di Mỹ Sơn.",
    s8: "Protettorato dell'Annam (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto il controllo militare giapponese). Stabilità interna presidiata dalla guardia indigena e dai reparti dell'Esercito Giapponese. Celeberrimo emporio commerciale marittimo di Faifo (Hội An) e santuario cham di Mỹ Sơn.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN27"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN27"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN27"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN27"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN27"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat de l'Annam — Province de Faifo (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat de l'Annam — Province de Faifo (Gouvernement de Vichy)";
      return "Protectorat de l'Annam — Province de Faifo";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat de l'Annam — Province de Faifo (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat de l'Annam — Province de Faifo (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat de l'Annam — Province de Faifo";
    },
  },
  VN29: {
    id: "VN29",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Quảng Ngãi",
    nutsName: "Quảng Ngãi (Tỉnh Quảng Ngãi)",
    nameLatn: "Quảng Ngãi",
    nameEngl: "Quảng Ngãi (Vietnam)",
    modernName: "Quảng Ngãi (Tỉnh Quảng Ngãi)",
    historicalName: "Protectorat de l'Annam — Province de Quang-Ngai",
    historicalToponym: "Quang-Ngai",
    adminTitle: "Union Indochinoise — Protectorat de l'Annam — Province de Quang-Ngai",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Quảng Ngãi",
    subRegion: "Annam",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo Quảng Ngãi). Sotto l'autorità della Résidence Supérieure de France en Annam. Territorio costiero di antica tradizione patriottica con ricche coltivazioni di canna da zucchero. Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central.",
    s2_4: "Protettorato dell'Annam (Capoluogo Quảng Ngãi). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. Territorio costiero di antica tradizione patriottica con ricche coltivazioni di canna da zucchero. Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon.",
    s5_6: "Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux.",
    s7: "Protettorato dell'Annam (Amministrazione di Vichy e stazionamento strategico giapponese post-Accordo di Hanoi del settembre 1940). Monitoraggio delle comunicazioni radio e pattugliamento delle rotte costiere e dell'altopiano. Territorio costiero di antica tradizione patriottica con ricche coltivazioni di canna da zucchero.",
    s8: "Protettorato dell'Annam (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto il controllo militare giapponese). Stabilità interna presidiata dalla guardia indigena e dai reparti dell'Esercito Giapponese. Territorio costiero di antica tradizione patriottica con ricche coltivazioni di canna da zucchero.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN29"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN29"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN29"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN29"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN29"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat de l'Annam — Province de Quang-Ngai (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat de l'Annam — Province de Quang-Ngai (Gouvernement de Vichy)";
      return "Protectorat de l'Annam — Province de Quang-Ngai";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat de l'Annam — Province de Quang-Ngai (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat de l'Annam — Province de Quang-Ngai (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat de l'Annam — Province de Quang-Ngai";
    },
  },
  VN31: {
    id: "VN31",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Bình Định",
    nutsName: "Bình Định (Quy Nhơn)",
    nameLatn: "Bình Định",
    nameEngl: "Bình Định (Vietnam)",
    modernName: "Bình Định (Quy Nhơn)",
    historicalName: "Protectorat de l'Annam — Port de Qui-Nhon",
    historicalToponym: "Qui-Nhon",
    adminTitle: "Union Indochinoise — Protectorat de l'Annam — Port de Qui-Nhon",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Quy Nhơn",
    subRegion: "Annam",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo Quy Nhơn). Sotto l'autorità della Résidence Supérieure de France en Annam. Grande porto dell'Annam centrale e capolinea della ferrovia e delle strade dirette agli Altipiani Centrali. Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central.",
    s2_4: "Protettorato dell'Annam (Capoluogo Quy Nhơn). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. Grande porto dell'Annam centrale e capolinea della ferrovia e delle strade dirette agli Altipiani Centrali. Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon.",
    s5_6: "Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux.",
    s7: "Protettorato dell'Annam (Amministrazione di Vichy e stazionamento strategico giapponese post-Accordo di Hanoi del settembre 1940). Monitoraggio delle comunicazioni radio e pattugliamento delle rotte costiere e dell'altopiano. Grande porto dell'Annam centrale e capolinea della ferrovia e delle strade dirette agli Altipiani Centrali.",
    s8: "Protettorato dell'Annam (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto il controllo militare giapponese). Stabilità interna presidiata dalla guardia indigena e dai reparti dell'Esercito Giapponese. Grande porto dell'Annam centrale e capolinea della ferrovia e delle strade dirette agli Altipiani Centrali.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN31"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN31"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN31"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN31"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN31"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat de l'Annam — Port de Qui-Nhon (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat de l'Annam — Port de Qui-Nhon (Gouvernement de Vichy)";
      return "Protectorat de l'Annam — Port de Qui-Nhon";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat de l'Annam — Port de Qui-Nhon (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat de l'Annam — Port de Qui-Nhon (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat de l'Annam — Port de Qui-Nhon";
    },
  },
  VN32: {
    id: "VN32",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Phú Yên",
    nutsName: "Phú Yên (Tuy Hòa)",
    nameLatn: "Phú Yên",
    nameEngl: "Phú Yên (Vietnam)",
    modernName: "Phú Yên (Tuy Hòa)",
    historicalName: "Protectorat de l'Annam — Province de Tuy-Hoa",
    historicalToponym: "Tuy-Hoa",
    adminTitle: "Union Indochinoise — Protectorat de l'Annam — Province de Tuy-Hoa",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Tuy Hòa",
    subRegion: "Annam",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo Tuy Hòa). Sotto l'autorità della Résidence Supérieure de France en Annam. Vasta pianura risicola alla foce del fiume Ba e promontorio oceanico strategico di Cap Varella. Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central.",
    s2_4: "Protettorato dell'Annam (Capoluogo Tuy Hòa). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. Vasta pianura risicola alla foce del fiume Ba e promontorio oceanico strategico di Cap Varella. Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon.",
    s5_6: "Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux.",
    s7: "Protettorato dell'Annam (Amministrazione di Vichy e stazionamento strategico giapponese post-Accordo di Hanoi del settembre 1940). Monitoraggio delle comunicazioni radio e pattugliamento delle rotte costiere e dell'altopiano. Vasta pianura risicola alla foce del fiume Ba e promontorio oceanico strategico di Cap Varella.",
    s8: "Protettorato dell'Annam (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto il controllo militare giapponese). Stabilità interna presidiata dalla guardia indigena e dai reparti dell'Esercito Giapponese. Vasta pianura risicola alla foce del fiume Ba e promontorio oceanico strategico di Cap Varella.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN32"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN32"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN32"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN32"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN32"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat de l'Annam — Province de Tuy-Hoa (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat de l'Annam — Province de Tuy-Hoa (Gouvernement de Vichy)";
      return "Protectorat de l'Annam — Province de Tuy-Hoa";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat de l'Annam — Province de Tuy-Hoa (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat de l'Annam — Province de Tuy-Hoa (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat de l'Annam — Province de Tuy-Hoa";
    },
  },
  VN34: {
    id: "VN34",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Khánh Hòa",
    nutsName: "Khánh Hòa (Nha Trang / Cam Ranh)",
    nameLatn: "Khánh Hòa",
    nameEngl: "Khánh Hòa (Vietnam)",
    modernName: "Khánh Hòa (Nha Trang / Cam Ranh)",
    historicalName: "Protectorat de l'Annam — Baie de Cam Ranh & Nha-Trang",
    historicalToponym: "Nha-Trang",
    adminTitle: "Union Indochinoise — Protectorat de l'Annam — Baie de Cam Ranh & Nha-Trang",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Nha Trang",
    subRegion: "Annam",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo Nha Trang). Sotto l'autorità della Résidence Supérieure de France en Annam. Sede dell'Institut Pasteur (Alexandre Yersin) a Nha Trang e della Baia di Cam Ranh, considerata tra i migliori ancoraggi navali del mondo. Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central.",
    s2_4: "Protettorato dell'Annam (Capoluogo Nha Trang). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. Sede dell'Institut Pasteur (Alexandre Yersin) a Nha Trang e della Baia di Cam Ranh, considerata tra i migliori ancoraggi navali del mondo. Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon.",
    s5_6: "Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux.",
    s7: "Baia di Cam Ranh, straordinario porto oceanico naturale della provincia di Khánh Hòa. Post-Accordo di Hanoi del settembre 1940, la baia viene ispezionata dalla Marina Imperiale Giapponese che ne pianifica l'uso come base d'ancoraggio primaria per la futura avanzata verso la Malesia e Singapore.",
    s8: "Baia di Cam Ranh, trasformata in una delle più formidabili basi d'ancoraggio e rifornimento della Flotta Imperiale Giapponese sotto accordo con l'amministrazione coloniale di Vichy. Punto di concentrazione per le future flotte d'invasione del Pacifico meridionale.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN34"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN34"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN34"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN34"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN34"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat de l'Annam — Baie de Cam Ranh & Nha-Trang (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat de l'Annam — Baie de Cam Ranh & Nha-Trang (Gouvernement de Vichy)";
      return "Protectorat de l'Annam — Baie de Cam Ranh & Nha-Trang";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat de l'Annam — Baie de Cam Ranh & Nha-Trang (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat de l'Annam — Baie de Cam Ranh & Nha-Trang (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat de l'Annam — Baie de Cam Ranh & Nha-Trang";
    },
  },
  VN36: {
    id: "VN36",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Ninh Thuận",
    nutsName: "Ninh Thuận (Phan Rang)",
    nameLatn: "Ninh Thuận",
    nameEngl: "Ninh Thuận (Vietnam)",
    modernName: "Ninh Thuận (Phan Rang)",
    historicalName: "Protectorat de l'Annam — Province de Phan-Rang",
    historicalToponym: "Phan-Rang",
    adminTitle: "Union Indochinoise — Protectorat de l'Annam — Province de Phan-Rang",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Phan Rang",
    subRegion: "Annam",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo Phan Rang). Sotto l'autorità della Résidence Supérieure de France en Annam. Regione arida della civiltà Champa ricca di torri sacre e snodo della ferrovia a cremagliera per Dalat. Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central.",
    s2_4: "Protettorato dell'Annam (Capoluogo Phan Rang). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. Regione arida della civiltà Champa ricca di torri sacre e snodo della ferrovia a cremagliera per Dalat. Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon.",
    s5_6: "Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux.",
    s7: "Protettorato dell'Annam (Amministrazione di Vichy e stazionamento strategico giapponese post-Accordo di Hanoi del settembre 1940). Monitoraggio delle comunicazioni radio e pattugliamento delle rotte costiere e dell'altopiano. Regione arida della civiltà Champa ricca di torri sacre e snodo della ferrovia a cremagliera per Dalat.",
    s8: "Protettorato dell'Annam (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto il controllo militare giapponese). Stabilità interna presidiata dalla guardia indigena e dai reparti dell'Esercito Giapponese. Regione arida della civiltà Champa ricca di torri sacre e snodo della ferrovia a cremagliera per Dalat.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN36"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN36"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN36"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN36"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN36"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat de l'Annam — Province de Phan-Rang (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat de l'Annam — Province de Phan-Rang (Gouvernement de Vichy)";
      return "Protectorat de l'Annam — Province de Phan-Rang";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat de l'Annam — Province de Phan-Rang (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat de l'Annam — Province de Phan-Rang (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat de l'Annam — Province de Phan-Rang";
    },
  },
  VN40: {
    id: "VN40",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Bình Thuận",
    nutsName: "Bình Thuận (Phan Thiết)",
    nameLatn: "Bình Thuận",
    nameEngl: "Bình Thuận (Vietnam)",
    modernName: "Bình Thuận (Phan Thiết)",
    historicalName: "Protectorat de l'Annam — Province de Phan-Thiet",
    historicalToponym: "Phan-Thiet",
    adminTitle: "Union Indochinoise — Protectorat de l'Annam — Province de Phan-Thiet",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Phan Thiết",
    subRegion: "Annam",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo Phan Thiết). Sotto l'autorità della Résidence Supérieure de France en Annam. Famosa per la produzione intensiva di salsa di pesce (nước mắm) e le piantagioni litoranee. Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central.",
    s2_4: "Protettorato dell'Annam (Capoluogo Phan Thiết). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. Famosa per la produzione intensiva di salsa di pesce (nước mắm) e le piantagioni litoranee. Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon.",
    s5_6: "Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux.",
    s7: "Protettorato dell'Annam (Amministrazione di Vichy e stazionamento strategico giapponese post-Accordo di Hanoi del settembre 1940). Monitoraggio delle comunicazioni radio e pattugliamento delle rotte costiere e dell'altopiano. Famosa per la produzione intensiva di salsa di pesce (nước mắm) e le piantagioni litoranee.",
    s8: "Protettorato dell'Annam (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto il controllo militare giapponese). Stabilità interna presidiata dalla guardia indigena e dai reparti dell'Esercito Giapponese. Famosa per la produzione intensiva di salsa di pesce (nước mắm) e le piantagioni litoranee.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN40"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN40"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN40"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN40"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN40"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat de l'Annam — Province de Phan-Thiet (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat de l'Annam — Province de Phan-Thiet (Gouvernement de Vichy)";
      return "Protectorat de l'Annam — Province de Phan-Thiet";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat de l'Annam — Province de Phan-Thiet (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat de l'Annam — Province de Phan-Thiet (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat de l'Annam — Province de Phan-Thiet";
    },
  },
  VN28: {
    id: "VN28",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Kon Tum",
    nutsName: "Kon Tum (Tỉnh Kon Tum)",
    nameLatn: "Kon Tum",
    nameEngl: "Kon Tum (Vietnam)",
    modernName: "Kon Tum (Tỉnh Kon Tum)",
    historicalName: "Protectorat de l'Annam — Haut-Plateau de Kontum",
    historicalToponym: "Kontum",
    adminTitle: "Union Indochinoise — Protectorat de l'Annam — Haut-Plateau de Kontum",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Kon Tum",
    subRegion: "Annam",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo Kon Tum). Sotto l'autorità della Résidence Supérieure de France en Annam. Altopiani settentrionali dominati da missioni cattoliche francesi e dalle etnie montanare Bahnar e Sedang. Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central.",
    s2_4: "Protettorato dell'Annam (Capoluogo Kon Tum). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. Altopiani settentrionali dominati da missioni cattoliche francesi e dalle etnie montanare Bahnar e Sedang. Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon.",
    s5_6: "Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux.",
    s7: "Protettorato dell'Annam (Amministrazione di Vichy e stazionamento strategico giapponese post-Accordo di Hanoi del settembre 1940). Monitoraggio delle comunicazioni radio e pattugliamento delle rotte costiere e dell'altopiano. Altopiani settentrionali dominati da missioni cattoliche francesi e dalle etnie montanare Bahnar e Sedang.",
    s8: "Protettorato dell'Annam (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto il controllo militare giapponese). Stabilità interna presidiata dalla guardia indigena e dai reparti dell'Esercito Giapponese. Altopiani settentrionali dominati da missioni cattoliche francesi e dalle etnie montanare Bahnar e Sedang.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN28"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN28"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN28"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN28"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN28"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat de l'Annam — Haut-Plateau de Kontum (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat de l'Annam — Haut-Plateau de Kontum (Gouvernement de Vichy)";
      return "Protectorat de l'Annam — Haut-Plateau de Kontum";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat de l'Annam — Haut-Plateau de Kontum (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat de l'Annam — Haut-Plateau de Kontum (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat de l'Annam — Haut-Plateau de Kontum";
    },
  },
  VN30: {
    id: "VN30",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Gia Lai",
    nutsName: "Gia Lai (Pleiku)",
    nameLatn: "Gia Lai",
    nameEngl: "Gia Lai (Vietnam)",
    modernName: "Gia Lai (Pleiku)",
    historicalName: "Protectorat de l'Annam — Garnison de Pleiku",
    historicalToponym: "Pleiku",
    adminTitle: "Union Indochinoise — Protectorat de l'Annam — Garnison de Pleiku",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Pleiku",
    subRegion: "Annam",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo Pleiku). Sotto l'autorità della Résidence Supérieure de France en Annam. Altopiano centrale strategicamente fortificato per il controllo delle vie d'accesso al Laos e piantagioni di té. Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central.",
    s2_4: "Protettorato dell'Annam (Capoluogo Pleiku). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. Altopiano centrale strategicamente fortificato per il controllo delle vie d'accesso al Laos e piantagioni di té. Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon.",
    s5_6: "Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux.",
    s7: "Protettorato dell'Annam (Amministrazione di Vichy e stazionamento strategico giapponese post-Accordo di Hanoi del settembre 1940). Monitoraggio delle comunicazioni radio e pattugliamento delle rotte costiere e dell'altopiano. Altopiano centrale strategicamente fortificato per il controllo delle vie d'accesso al Laos e piantagioni di té.",
    s8: "Protettorato dell'Annam (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto il controllo militare giapponese). Stabilità interna presidiata dalla guardia indigena e dai reparti dell'Esercito Giapponese. Altopiano centrale strategicamente fortificato per il controllo delle vie d'accesso al Laos e piantagioni di té.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN30"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN30"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN30"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN30"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN30"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat de l'Annam — Garnison de Pleiku (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat de l'Annam — Garnison de Pleiku (Gouvernement de Vichy)";
      return "Protectorat de l'Annam — Garnison de Pleiku";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat de l'Annam — Garnison de Pleiku (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat de l'Annam — Garnison de Pleiku (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat de l'Annam — Garnison de Pleiku";
    },
  },
  VN33: {
    id: "VN33",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Đắk Lắk",
    nutsName: "Đắk Lắk (Ban Mê Thuột)",
    nameLatn: "Đắk Lắk",
    nameEngl: "Đắk Lắk (Vietnam)",
    modernName: "Đắk Lắk (Ban Mê Thuột)",
    historicalName: "Protectorat de l'Annam — Province du Darlac",
    historicalToponym: "Ban Mé Thuot",
    adminTitle: "Union Indochinoise — Protectorat de l'Annam — Province du Darlac",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Buôn Ma Thuột",
    subRegion: "Annam",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo Buôn Ma Thuột). Sotto l'autorità della Résidence Supérieure de France en Annam. Centro delle concessioni di caucciù e riserve forestali per le grandi battute di caccia all'elefante. Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central.",
    s2_4: "Protettorato dell'Annam (Capoluogo Buôn Ma Thuột). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. Centro delle concessioni di caucciù e riserve forestali per le grandi battute di caccia all'elefante. Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon.",
    s5_6: "Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux.",
    s7: "Protettorato dell'Annam (Amministrazione di Vichy e stazionamento strategico giapponese post-Accordo di Hanoi del settembre 1940). Monitoraggio delle comunicazioni radio e pattugliamento delle rotte costiere e dell'altopiano. Centro delle concessioni di caucciù e riserve forestali per le grandi battute di caccia all'elefante.",
    s8: "Protettorato dell'Annam (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto il controllo militare giapponese). Stabilità interna presidiata dalla guardia indigena e dai reparti dell'Esercito Giapponese. Centro delle concessioni di caucciù e riserve forestali per le grandi battute di caccia all'elefante.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN33"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN33"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN33"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN33"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN33"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat de l'Annam — Province du Darlac (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat de l'Annam — Province du Darlac (Gouvernement de Vichy)";
      return "Protectorat de l'Annam — Province du Darlac";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat de l'Annam — Province du Darlac (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat de l'Annam — Province du Darlac (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat de l'Annam — Province du Darlac";
    },
  },
  VN35: {
    id: "VN35",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Lâm Đồng",
    nutsName: "Lâm Đồng (Đà Lạt / Lang Biang)",
    nameLatn: "Lâm Đồng",
    nameEngl: "Lâm Đồng (Vietnam)",
    modernName: "Lâm Đồng (Đà Lạt / Lang Biang)",
    historicalName: "Protectorat de l'Annam — Station Climatique de Dalat",
    historicalToponym: "Dalat",
    adminTitle: "Union Indochinoise — Protectorat de l'Annam — Station Climatique de Dalat",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Đà Lạt",
    subRegion: "Annam",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo Đà Lạt). Sotto l'autorità della Résidence Supérieure de France en Annam. Capitale estiva dell'Indocina voluta dal Governatore Paul Doumer, rinomata per il clima alpino e il palazzo estivo di Bảo Đại. Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central.",
    s2_4: "Protettorato dell'Annam (Capoluogo Đà Lạt). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. Capitale estiva dell'Indocina voluta dal Governatore Paul Doumer, rinomata per il clima alpino e il palazzo estivo di Bảo Đại. Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon.",
    s5_6: "Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux.",
    s7: "Đà Lạt (Lâm Đồng), stazione climatica d'alta quota e capitale estiva del Governatore Generale dell'Indocina e dell'Imperatore Bảo Đại. Durante le tensioni dell'Accordo di Hanoi del settembre 1940, l'Ammiraglio Decoux vi conduce colloqui riservati organizzando il governo coloniale al riparo dal clima tropicale.",
    s8: "Đà Lạt, sede del comando estivo di Jean Decoux e rifugio diplomatico nell'Annam meridionale, caratterizzata dal celebre Grand Hotel e dall'architettura coloniale liberty.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN35"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN35"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN35"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN35"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN35"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat de l'Annam — Station Climatique de Dalat (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat de l'Annam — Station Climatique de Dalat (Gouvernement de Vichy)";
      return "Protectorat de l'Annam — Station Climatique de Dalat";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat de l'Annam — Station Climatique de Dalat (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat de l'Annam — Station Climatique de Dalat (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat de l'Annam — Station Climatique de Dalat";
    },
  },
  VN72: {
    id: "VN72",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Đắk Nông",
    nutsName: "Đắk Nông (Cao nguyên M'Nông)",
    nameLatn: "Đắk Nông",
    nameEngl: "Đắk Nông (Vietnam)",
    modernName: "Đắk Nông (Cao nguyên M'Nông)",
    historicalName: "Protectorat de l'Annam — Plateau des Mnong",
    historicalToponym: "Gia Nghĩa",
    adminTitle: "Union Indochinoise — Protectorat de l'Annam — Plateau des Mnong",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Gia Nghĩa",
    subRegion: "Annam",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Protettorato dell'Annam (Trung Kỳ) nell'Union Indochinoise (Capoluogo Gia Nghĩa). Sotto l'autorità della Résidence Supérieure de France en Annam. Altopiani boscosi dell'estremità meridionale dell'Annam abitati dal fiero popolo M'Nông. Caratterizzato dalla costa frastagliata sul Mar Cinese, risaie litoranee e i vasti altipiani montagnosi del Plateau Central.",
    s2_4: "Protettorato dell'Annam (Capoluogo Gia Nghĩa). L'avanzata nipponica in Cina e la conquista di Hainan (febbraio 1939) proiettano la minaccia navale giapponese a ridosso delle coste dell'Annam. Altopiani boscosi dell'estremità meridionale dell'Annam abitati dal fiero popolo M'Nông. Vengono rafforzate le difese costiere e completata la ferrovia Transindocinese Hanoi-Saigon.",
    s5_6: "Protettorato dell'Annam (settembre 1939 - giugno 1940). Mobilitazione dei reggimenti di Tirailleurs Annamites allo scoppio della guerra in Europa. Dopo l'armistizio del giugno 1940, la corte imperiale di Huế e l'amministrazione coloniale riconoscono il governo di Vichy e il Governatore Decoux.",
    s7: "Protettorato dell'Annam (Amministrazione di Vichy e stazionamento strategico giapponese post-Accordo di Hanoi del settembre 1940). Monitoraggio delle comunicazioni radio e pattugliamento delle rotte costiere e dell'altopiano. Altopiani boscosi dell'estremità meridionale dell'Annam abitati dal fiero popolo M'Nông.",
    s8: "Protettorato dell'Annam (Union Indochinoise / Amministrazione Vichy dell'Ammiraglio Decoux sotto il controllo militare giapponese). Stabilità interna presidiata dalla guardia indigena e dai reparti dell'Esercito Giapponese. Altopiani boscosi dell'estremità meridionale dell'Annam abitati dal fiero popolo M'Nông.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN72"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN72"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN72"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN72"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN72"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Protectorat de l'Annam — Plateau des Mnong (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Protectorat de l'Annam — Plateau des Mnong (Gouvernement de Vichy)";
      return "Protectorat de l'Annam — Plateau des Mnong";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Protectorat de l'Annam — Plateau des Mnong (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Protectorat de l'Annam — Plateau des Mnong (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Protectorat de l'Annam — Plateau des Mnong";
    },
  },
  VNSG: {
    id: "VNSG",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Hồ Chí Minh city",
    nutsName: "Thành phố Hồ Chí Minh (Sài Gòn - Chợ Lớn)",
    nameLatn: "Hồ Chí Minh city",
    nameEngl: "Hồ Chí Minh city (Vietnam)",
    modernName: "Thành phố Hồ Chí Minh (Sài Gòn - Chợ Lớn)",
    historicalName: "Colonie de la Cochinchine — Saïgon-Cholon ('Perle de l'Orient')",
    historicalToponym: "Saïgon",
    adminTitle: "Union Indochinoise — Colonie de la Cochinchine — Saïgon-Cholon ('Perle de l'Orient')",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Hồ Chí Minh",
    subRegion: "Cochinchine",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo Hồ Chí Minh). Saigon-Cholon è la metropoli economica e finanziaria dell'Indocina, la 'Perla dell'Estremo Oriente', sede della Banque de l'Indochine e del grande porto fluviale oceanico. Capitale della Colonia della Cocincina, 'Perla dell'Estremo Oriente', sede del Governatore, della Banque de l'Indochine e del porto fluviale oceanico. Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges.",
    s2_4: "Colonia della Cocincina (Capoluogo Hồ Chí Minh). Straordinaria espansione delle esportazioni di riso e lattice grezzo. Capitale della Colonia della Cocincina, 'Perla dell'Estremo Oriente', sede del Governatore, della Banque de l'Indochine e del porto fluviale oceanico. Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali.",
    s5_6: "Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux.",
    s7: "Saïgon-Cholon, capitale coloniale della Cocincina. Post-Accordo di Hanoi del settembre 1940, la regione è scossa dall'Insurrezione comunista del Nam Kỳ (novembre 1940), duramente repressa dalle truppe di Decoux. Nel contempo missioni militari giapponesi aprono uffici di collegamento permanente a Saigon.",
    s8: "Saïgon-Cholon, centro nevralgico della Cocincina sotto amministrazione di Vichy e quartier generale avanzato delle forze aeronavali giapponesi del Sud. Cantieri navali, magazzini di riso di Cholon e l'aeroporto di Tan Son Nhut sono integrati nei piani d'invasione della Malesia e dell'Indonesia.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VNSG"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VNSG"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VNSG"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VNSG"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VNSG"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Colonie de la Cochinchine — Saïgon-Cholon ('Perle de l'Orient') (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Colonie de la Cochinchine — Saïgon-Cholon ('Perle de l'Orient') (Gouvernement de Vichy)";
      return "Colonie de la Cochinchine — Saïgon-Cholon ('Perle de l'Orient')";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Colonie de la Cochinchine — Saïgon-Cholon ('Perle de l'Orient') (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Colonie de la Cochinchine — Saïgon-Cholon ('Perle de l'Orient') (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Colonie de la Cochinchine — Saïgon-Cholon ('Perle de l'Orient')";
    },
  },
  VNCT: {
    id: "VNCT",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Can Tho",
    nutsName: "Cần Thơ (Thành phố Cần Thơ)",
    nameLatn: "Can Tho",
    nameEngl: "Can Tho (Vietnam)",
    modernName: "Cần Thơ (Thành phố Cần Thơ)",
    historicalName: "Colonie de la Cochinchine — Métropole du Bassac (Can-Tho)",
    historicalToponym: "Can-Tho",
    adminTitle: "Union Indochinoise — Colonie de la Cochinchine — Métropole du Bassac (Can-Tho)",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Cần Thơ",
    subRegion: "Cochinchine",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo Cần Thơ). Amministrata dal Governatore della Cocincina con sede a Saigon. Capitale economica del Delta occidentale del Mekong sul fiume Bassac e grande mercato di riso. Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges.",
    s2_4: "Colonia della Cocincina (Capoluogo Cần Thơ). Straordinaria espansione delle esportazioni di riso e lattice grezzo. Capitale economica del Delta occidentale del Mekong sul fiume Bassac e grande mercato di riso. Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali.",
    s5_6: "Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux.",
    s7: "Colonia della Cocincina (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Nell'autunno 1940 il delta è scosso dall'Insurrezione del Nam Kỳ guidata dal Partito Comunista Indocinese, repressa con rigore dalle forze coloniali, mentre la flotta francese affronta la Marina Thailandese nella Guerra Franco-Thailandese. Capitale economica del Delta occidentale del Mekong sul fiume Bassac e grande mercato di riso.",
    s8: "Colonia della Cocincina (Union Indochinoise / Governo di Vichy sotto tutela strategica dell'Impero Giapponese). Massima concentrazione della produzione risicola del Delta del Mekong a rifornimento delle forze dell'Asse. Capitale economica del Delta occidentale del Mekong sul fiume Bassac e grande mercato di riso.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VNCT"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VNCT"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VNCT"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VNCT"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VNCT"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Colonie de la Cochinchine — Métropole du Bassac (Can-Tho) (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Colonie de la Cochinchine — Métropole du Bassac (Can-Tho) (Gouvernement de Vichy)";
      return "Colonie de la Cochinchine — Métropole du Bassac (Can-Tho)";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Colonie de la Cochinchine — Métropole du Bassac (Can-Tho) (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Colonie de la Cochinchine — Métropole du Bassac (Can-Tho) (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Colonie de la Cochinchine — Métropole du Bassac (Can-Tho)";
    },
  },
  VN37: {
    id: "VN37",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Tây Ninh",
    nutsName: "Tây Ninh (Tỉnh Tây Ninh)",
    nameLatn: "Tây Ninh",
    nameEngl: "Tây Ninh (Vietnam)",
    modernName: "Tây Ninh (Tỉnh Tây Ninh)",
    historicalName: "Colonie de la Cochinchine — Siège du Caodaïsme (Tay-Ninh)",
    historicalToponym: "Tay-Ninh",
    adminTitle: "Union Indochinoise — Colonie de la Cochinchine — Siège du Caodaïsme (Tay-Ninh)",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Tây Ninh",
    subRegion: "Cochinchine",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo Tây Ninh). Amministrata dal Governatore della Cocincina con sede a Saigon. Sede della Santa Sede della religione Cao Đài con il celebre Tempio Divino e frontiera con la Cambogia. Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges.",
    s2_4: "Colonia della Cocincina (Capoluogo Tây Ninh). Straordinaria espansione delle esportazioni di riso e lattice grezzo. Sede della Santa Sede della religione Cao Đài con il celebre Tempio Divino e frontiera con la Cambogia. Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali.",
    s5_6: "Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux.",
    s7: "Colonia della Cocincina (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Nell'autunno 1940 il delta è scosso dall'Insurrezione del Nam Kỳ guidata dal Partito Comunista Indocinese, repressa con rigore dalle forze coloniali, mentre la flotta francese affronta la Marina Thailandese nella Guerra Franco-Thailandese. Sede della Santa Sede della religione Cao Đài con il celebre Tempio Divino e frontiera con la Cambogia.",
    s8: "Colonia della Cocincina (Union Indochinoise / Governo di Vichy sotto tutela strategica dell'Impero Giapponese). Massima concentrazione della produzione risicola del Delta del Mekong a rifornimento delle forze dell'Asse. Sede della Santa Sede della religione Cao Đài con il celebre Tempio Divino e frontiera con la Cambogia.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN37"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN37"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN37"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN37"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN37"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Colonie de la Cochinchine — Siège du Caodaïsme (Tay-Ninh) (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Colonie de la Cochinchine — Siège du Caodaïsme (Tay-Ninh) (Gouvernement de Vichy)";
      return "Colonie de la Cochinchine — Siège du Caodaïsme (Tay-Ninh)";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Colonie de la Cochinchine — Siège du Caodaïsme (Tay-Ninh) (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Colonie de la Cochinchine — Siège du Caodaïsme (Tay-Ninh) (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Colonie de la Cochinchine — Siège du Caodaïsme (Tay-Ninh)";
    },
  },
  VN39: {
    id: "VN39",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Đông Nam Bộ",
    nutsName: "Đồng Nai / Biên Hòa (Đông Nam Bộ)",
    nameLatn: "Đông Nam Bộ",
    nameEngl: "Đông Nam Bộ (Vietnam)",
    modernName: "Đồng Nai / Biên Hòa (Đông Nam Bộ)",
    historicalName: "Colonie de la Cochinchine — Province de Bien-Hoa",
    historicalToponym: "Bien-Hoa",
    adminTitle: "Union Indochinoise — Colonie de la Cochinchine — Province de Bien-Hoa",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Biên Hòa",
    subRegion: "Cochinchine",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo Biên Hòa). Amministrata dal Governatore della Cocincina con sede a Saigon. Grandi piantagioni di gomma della Michelin lungo il fiume Dong Nai e cave di granito. Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges.",
    s2_4: "Colonia della Cocincina (Capoluogo Biên Hòa). Straordinaria espansione delle esportazioni di riso e lattice grezzo. Grandi piantagioni di gomma della Michelin lungo il fiume Dong Nai e cave di granito. Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali.",
    s5_6: "Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux.",
    s7: "Colonia della Cocincina (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Nell'autunno 1940 il delta è scosso dall'Insurrezione del Nam Kỳ guidata dal Partito Comunista Indocinese, repressa con rigore dalle forze coloniali, mentre la flotta francese affronta la Marina Thailandese nella Guerra Franco-Thailandese. Grandi piantagioni di gomma della Michelin lungo il fiume Dong Nai e cave di granito.",
    s8: "Colonia della Cocincina (Union Indochinoise / Governo di Vichy sotto tutela strategica dell'Impero Giapponese). Massima concentrazione della produzione risicola del Delta del Mekong a rifornimento delle forze dell'Asse. Grandi piantagioni di gomma della Michelin lungo il fiume Dong Nai e cave di granito.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN39"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN39"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN39"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN39"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN39"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Colonie de la Cochinchine — Province de Bien-Hoa (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Colonie de la Cochinchine — Province de Bien-Hoa (Gouvernement de Vichy)";
      return "Colonie de la Cochinchine — Province de Bien-Hoa";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Colonie de la Cochinchine — Province de Bien-Hoa (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Colonie de la Cochinchine — Province de Bien-Hoa (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Colonie de la Cochinchine — Province de Bien-Hoa";
    },
  },
  VN41: {
    id: "VN41",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Long An",
    nutsName: "Long An (Tân An)",
    nameLatn: "Long An",
    nameEngl: "Long An (Vietnam)",
    modernName: "Long An (Tân An)",
    historicalName: "Colonie de la Cochinchine — Province de Tan-An",
    historicalToponym: "Tan-An",
    adminTitle: "Union Indochinoise — Colonie de la Cochinchine — Province de Tan-An",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Tân An",
    subRegion: "Cochinchine",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo Tân An). Amministrata dal Governatore della Cocincina con sede a Saigon. Cerniera fluviale e canale di transito privilegiato tra Saigon e il Delta del Mekong. Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges.",
    s2_4: "Colonia della Cocincina (Capoluogo Tân An). Straordinaria espansione delle esportazioni di riso e lattice grezzo. Cerniera fluviale e canale di transito privilegiato tra Saigon e il Delta del Mekong. Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali.",
    s5_6: "Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux.",
    s7: "Colonia della Cocincina (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Nell'autunno 1940 il delta è scosso dall'Insurrezione del Nam Kỳ guidata dal Partito Comunista Indocinese, repressa con rigore dalle forze coloniali, mentre la flotta francese affronta la Marina Thailandese nella Guerra Franco-Thailandese. Cerniera fluviale e canale di transito privilegiato tra Saigon e il Delta del Mekong.",
    s8: "Colonia della Cocincina (Union Indochinoise / Governo di Vichy sotto tutela strategica dell'Impero Giapponese). Massima concentrazione della produzione risicola del Delta del Mekong a rifornimento delle forze dell'Asse. Cerniera fluviale e canale di transito privilegiato tra Saigon e il Delta del Mekong.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN41"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN41"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN41"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN41"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN41"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Colonie de la Cochinchine — Province de Tan-An (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Colonie de la Cochinchine — Province de Tan-An (Gouvernement de Vichy)";
      return "Colonie de la Cochinchine — Province de Tan-An";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Colonie de la Cochinchine — Province de Tan-An (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Colonie de la Cochinchine — Province de Tan-An (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Colonie de la Cochinchine — Province de Tan-An";
    },
  },
  VN43: {
    id: "VN43",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Bà Rịa - Vũng Tàu",
    nutsName: "Bà Rịa - Vũng Tàu (Cap Saint-Jacques)",
    nameLatn: "Bà Rịa - Vũng Tàu",
    nameEngl: "Bà Rịa - Vũng Tàu (Vietnam)",
    modernName: "Bà Rịa - Vũng Tàu (Cap Saint-Jacques)",
    historicalName: "Colonie de la Cochinchine — Cap Saint-Jacques & Baria",
    historicalToponym: "Cap Saint-Jacques",
    adminTitle: "Union Indochinoise — Colonie de la Cochinchine — Cap Saint-Jacques & Baria",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Vũng Tàu",
    subRegion: "Cochinchine",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo Vũng Tàu). Amministrata dal Governatore della Cocincina con sede a Saigon. Capo fortificato all'imbocco marittimo del fiume Saigon, stazione di vedetta navale e rinomata stazione balneare. Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges.",
    s2_4: "Colonia della Cocincina (Capoluogo Vũng Tàu). Straordinaria espansione delle esportazioni di riso e lattice grezzo. Capo fortificato all'imbocco marittimo del fiume Saigon, stazione di vedetta navale e rinomata stazione balneare. Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali.",
    s5_6: "Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux.",
    s7: "Cap Saint-Jacques (Vũng Tàu), promontorio fortificato e stazione pilota all'imbocco del fiume Saigon. Le batterie costiere e le stazioni idrovolanti controllano l'accesso navale a Saigon durante la crisi dell'Accordo di Hanoi del settembre 1940.",
    s8: "Cap Saint-Jacques (Bà Rịa - Vũng Tàu), base aeronavale strategica condivisa tra l'amministrazione francese di Vichy e le squadriglie da ricognizione della Marina Giapponese.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN43"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN43"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN43"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN43"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN43"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Colonie de la Cochinchine — Cap Saint-Jacques & Baria (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Colonie de la Cochinchine — Cap Saint-Jacques & Baria (Gouvernement de Vichy)";
      return "Colonie de la Cochinchine — Cap Saint-Jacques & Baria";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Colonie de la Cochinchine — Cap Saint-Jacques & Baria (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Colonie de la Cochinchine — Cap Saint-Jacques & Baria (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Colonie de la Cochinchine — Cap Saint-Jacques & Baria";
    },
  },
  VN44: {
    id: "VN44",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "An Giang",
    nutsName: "An Giang (Châu Đốc & Long Xuyên)",
    nameLatn: "An Giang",
    nameEngl: "An Giang (Vietnam)",
    modernName: "An Giang (Châu Đốc & Long Xuyên)",
    historicalName: "Colonie de la Cochinchine — Province de Chau-Doc",
    historicalToponym: "Chau-Doc",
    adminTitle: "Union Indochinoise — Colonie de la Cochinchine — Province de Chau-Doc",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Long Xuyên",
    subRegion: "Cochinchine",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo Long Xuyên). Amministrata dal Governatore della Cocincina con sede a Saigon. Regione fluviale di confine sulla biforcazione Mekong-Bassac con forte presenza di comunità Khmer Krom e Cham. Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges.",
    s2_4: "Colonia della Cocincina (Capoluogo Long Xuyên). Straordinaria espansione delle esportazioni di riso e lattice grezzo. Regione fluviale di confine sulla biforcazione Mekong-Bassac con forte presenza di comunità Khmer Krom e Cham. Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali.",
    s5_6: "Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux.",
    s7: "Colonia della Cocincina (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Nell'autunno 1940 il delta è scosso dall'Insurrezione del Nam Kỳ guidata dal Partito Comunista Indocinese, repressa con rigore dalle forze coloniali, mentre la flotta francese affronta la Marina Thailandese nella Guerra Franco-Thailandese. Regione fluviale di confine sulla biforcazione Mekong-Bassac con forte presenza di comunità Khmer Krom e Cham.",
    s8: "Colonia della Cocincina (Union Indochinoise / Governo di Vichy sotto tutela strategica dell'Impero Giapponese). Massima concentrazione della produzione risicola del Delta del Mekong a rifornimento delle forze dell'Asse. Regione fluviale di confine sulla biforcazione Mekong-Bassac con forte presenza di comunità Khmer Krom e Cham.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN44"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN44"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN44"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN44"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN44"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Colonie de la Cochinchine — Province de Chau-Doc (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Colonie de la Cochinchine — Province de Chau-Doc (Gouvernement de Vichy)";
      return "Colonie de la Cochinchine — Province de Chau-Doc";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Colonie de la Cochinchine — Province de Chau-Doc (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Colonie de la Cochinchine — Province de Chau-Doc (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Colonie de la Cochinchine — Province de Chau-Doc";
    },
  },
  VN45: {
    id: "VN45",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Ðong Tháp",
    nutsName: "Đồng Tháp (Sa Đéc)",
    nameLatn: "Ðong Tháp",
    nameEngl: "Ðong Tháp (Vietnam)",
    modernName: "Đồng Tháp (Sa Đéc)",
    historicalName: "Colonie de la Cochinchine — Circonscription de Sadec",
    historicalToponym: "Sadec",
    adminTitle: "Union Indochinoise — Colonie de la Cochinchine — Circonscription de Sadec",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Cao Lãnh",
    subRegion: "Cochinchine",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo Cao Lãnh). Amministrata dal Governatore della Cocincina con sede a Saigon. Fascia fluviale affacciata sulla vasta 'Plaine des Joncs' (Pianura dei Giunchi), ricca di frutteti e commercio risicolo. Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges.",
    s2_4: "Colonia della Cocincina (Capoluogo Cao Lãnh). Straordinaria espansione delle esportazioni di riso e lattice grezzo. Fascia fluviale affacciata sulla vasta 'Plaine des Joncs' (Pianura dei Giunchi), ricca di frutteti e commercio risicolo. Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali.",
    s5_6: "Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux.",
    s7: "Colonia della Cocincina (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Nell'autunno 1940 il delta è scosso dall'Insurrezione del Nam Kỳ guidata dal Partito Comunista Indocinese, repressa con rigore dalle forze coloniali, mentre la flotta francese affronta la Marina Thailandese nella Guerra Franco-Thailandese. Fascia fluviale affacciata sulla vasta 'Plaine des Joncs' (Pianura dei Giunchi), ricca di frutteti e commercio risicolo.",
    s8: "Colonia della Cocincina (Union Indochinoise / Governo di Vichy sotto tutela strategica dell'Impero Giapponese). Massima concentrazione della produzione risicola del Delta del Mekong a rifornimento delle forze dell'Asse. Fascia fluviale affacciata sulla vasta 'Plaine des Joncs' (Pianura dei Giunchi), ricca di frutteti e commercio risicolo.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN45"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN45"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN45"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN45"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN45"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Colonie de la Cochinchine — Circonscription de Sadec (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Colonie de la Cochinchine — Circonscription de Sadec (Gouvernement de Vichy)";
      return "Colonie de la Cochinchine — Circonscription de Sadec";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Colonie de la Cochinchine — Circonscription de Sadec (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Colonie de la Cochinchine — Circonscription de Sadec (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Colonie de la Cochinchine — Circonscription de Sadec";
    },
  },
  VN46: {
    id: "VN46",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Tiền Giang",
    nutsName: "Tiền Giang (Mỹ Tho)",
    nameLatn: "Tiền Giang",
    nameEngl: "Tiền Giang (Vietnam)",
    modernName: "Tiền Giang (Mỹ Tho)",
    historicalName: "Colonie de la Cochinchine — Province de Mytho",
    historicalToponym: "Mytho",
    adminTitle: "Union Indochinoise — Colonie de la Cochinchine — Province de Mytho",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Mỹ Tho",
    subRegion: "Cochinchine",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo Mỹ Tho). Amministrata dal Governatore della Cocincina con sede a Saigon. Storico avamposto fluviale francese e capolinea della prima ferrovia d'Indocina inaugurata nel 1885 (Saigon-Mytho). Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges.",
    s2_4: "Colonia della Cocincina (Capoluogo Mỹ Tho). Straordinaria espansione delle esportazioni di riso e lattice grezzo. Storico avamposto fluviale francese e capolinea della prima ferrovia d'Indocina inaugurata nel 1885 (Saigon-Mytho). Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali.",
    s5_6: "Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux.",
    s7: "Colonia della Cocincina (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Nell'autunno 1940 il delta è scosso dall'Insurrezione del Nam Kỳ guidata dal Partito Comunista Indocinese, repressa con rigore dalle forze coloniali, mentre la flotta francese affronta la Marina Thailandese nella Guerra Franco-Thailandese. Storico avamposto fluviale francese e capolinea della prima ferrovia d'Indocina inaugurata nel 1885 (Saigon-Mytho).",
    s8: "Colonia della Cocincina (Union Indochinoise / Governo di Vichy sotto tutela strategica dell'Impero Giapponese). Massima concentrazione della produzione risicola del Delta del Mekong a rifornimento delle forze dell'Asse. Storico avamposto fluviale francese e capolinea della prima ferrovia d'Indocina inaugurata nel 1885 (Saigon-Mytho).",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN46"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN46"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN46"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN46"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN46"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Colonie de la Cochinchine — Province de Mytho (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Colonie de la Cochinchine — Province de Mytho (Gouvernement de Vichy)";
      return "Colonie de la Cochinchine — Province de Mytho";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Colonie de la Cochinchine — Province de Mytho (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Colonie de la Cochinchine — Province de Mytho (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Colonie de la Cochinchine — Province de Mytho";
    },
  },
  VN47: {
    id: "VN47",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Kiên Giang",
    nutsName: "Kiên Giang (Rạch Giá & Hà Tiên)",
    nameLatn: "Kiên Giang",
    nameEngl: "Kiên Giang (Vietnam)",
    modernName: "Kiên Giang (Rạch Giá & Hà Tiên)",
    historicalName: "Colonie de la Cochinchine — Province de Hatien & Rach-Gia",
    historicalToponym: "Rach-Gia",
    adminTitle: "Union Indochinoise — Colonie de la Cochinchine — Province de Hatien & Rach-Gia",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Rạch Giá",
    subRegion: "Cochinchine",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo Rạch Giá). Amministrata dal Governatore della Cocincina con sede a Saigon. Vasto litorale sul Golfo del Siam comprendente l'antico principato di Hà Tiên e l'isola di Phú Quốc. Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges.",
    s2_4: "Colonia della Cocincina (Capoluogo Rạch Giá). Straordinaria espansione delle esportazioni di riso e lattice grezzo. Vasto litorale sul Golfo del Siam comprendente l'antico principato di Hà Tiên e l'isola di Phú Quốc. Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali.",
    s5_6: "Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux.",
    s7: "Colonia della Cocincina (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Nell'autunno 1940 il delta è scosso dall'Insurrezione del Nam Kỳ guidata dal Partito Comunista Indocinese, repressa con rigore dalle forze coloniali, mentre la flotta francese affronta la Marina Thailandese nella Guerra Franco-Thailandese. Vasto litorale sul Golfo del Siam comprendente l'antico principato di Hà Tiên e l'isola di Phú Quốc.",
    s8: "Colonia della Cocincina (Union Indochinoise / Governo di Vichy sotto tutela strategica dell'Impero Giapponese). Massima concentrazione della produzione risicola del Delta del Mekong a rifornimento delle forze dell'Asse. Vasto litorale sul Golfo del Siam comprendente l'antico principato di Hà Tiên e l'isola di Phú Quốc.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN47"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN47"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN47"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN47"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN47"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Colonie de la Cochinchine — Province de Hatien & Rach-Gia (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Colonie de la Cochinchine — Province de Hatien & Rach-Gia (Gouvernement de Vichy)";
      return "Colonie de la Cochinchine — Province de Hatien & Rach-Gia";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Colonie de la Cochinchine — Province de Hatien & Rach-Gia (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Colonie de la Cochinchine — Province de Hatien & Rach-Gia (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Colonie de la Cochinchine — Province de Hatien & Rach-Gia";
    },
  },
  VN49: {
    id: "VN49",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Vĩnh Long",
    nutsName: "Vĩnh Long (Tỉnh Vĩnh Long)",
    nameLatn: "Vĩnh Long",
    nameEngl: "Vĩnh Long (Vietnam)",
    modernName: "Vĩnh Long (Tỉnh Vĩnh Long)",
    historicalName: "Colonie de la Cochinchine — Province de Vinh-Long",
    historicalToponym: "Vinh-Long",
    adminTitle: "Union Indochinoise — Colonie de la Cochinchine — Province de Vinh-Long",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Vĩnh Long",
    subRegion: "Cochinchine",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo Vĩnh Long). Amministrata dal Governatore della Cocincina con sede a Saigon. Cuore fertile incastonato tra i due bracci principali del Mekong, celebre per la navigazione fluviale. Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges.",
    s2_4: "Colonia della Cocincina (Capoluogo Vĩnh Long). Straordinaria espansione delle esportazioni di riso e lattice grezzo. Cuore fertile incastonato tra i due bracci principali del Mekong, celebre per la navigazione fluviale. Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali.",
    s5_6: "Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux.",
    s7: "Colonia della Cocincina (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Nell'autunno 1940 il delta è scosso dall'Insurrezione del Nam Kỳ guidata dal Partito Comunista Indocinese, repressa con rigore dalle forze coloniali, mentre la flotta francese affronta la Marina Thailandese nella Guerra Franco-Thailandese. Cuore fertile incastonato tra i due bracci principali del Mekong, celebre per la navigazione fluviale.",
    s8: "Colonia della Cocincina (Union Indochinoise / Governo di Vichy sotto tutela strategica dell'Impero Giapponese). Massima concentrazione della produzione risicola del Delta del Mekong a rifornimento delle forze dell'Asse. Cuore fertile incastonato tra i due bracci principali del Mekong, celebre per la navigazione fluviale.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN49"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN49"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN49"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN49"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN49"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Colonie de la Cochinchine — Province de Vinh-Long (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Colonie de la Cochinchine — Province de Vinh-Long (Gouvernement de Vichy)";
      return "Colonie de la Cochinchine — Province de Vinh-Long";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Colonie de la Cochinchine — Province de Vinh-Long (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Colonie de la Cochinchine — Province de Vinh-Long (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Colonie de la Cochinchine — Province de Vinh-Long";
    },
  },
  VN50: {
    id: "VN50",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Bến Tre",
    nutsName: "Bến Tre (Tỉnh Bến Tre)",
    nameLatn: "Bến Tre",
    nameEngl: "Bến Tre (Vietnam)",
    modernName: "Bến Tre (Tỉnh Bến Tre)",
    historicalName: "Colonie de la Cochinchine — Province de Ben-Tre",
    historicalToponym: "Ben-Tre",
    adminTitle: "Union Indochinoise — Colonie de la Cochinchine — Province de Ben-Tre",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Bến Tre",
    subRegion: "Cochinchine",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo Bến Tre). Amministrata dal Governatore della Cocincina con sede a Saigon. Provincia insulare del delta solcata da fitti canali e dominata da sterminate piantagioni di palme da cocco. Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges.",
    s2_4: "Colonia della Cocincina (Capoluogo Bến Tre). Straordinaria espansione delle esportazioni di riso e lattice grezzo. Provincia insulare del delta solcata da fitti canali e dominata da sterminate piantagioni di palme da cocco. Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali.",
    s5_6: "Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux.",
    s7: "Colonia della Cocincina (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Nell'autunno 1940 il delta è scosso dall'Insurrezione del Nam Kỳ guidata dal Partito Comunista Indocinese, repressa con rigore dalle forze coloniali, mentre la flotta francese affronta la Marina Thailandese nella Guerra Franco-Thailandese. Provincia insulare del delta solcata da fitti canali e dominata da sterminate piantagioni di palme da cocco.",
    s8: "Colonia della Cocincina (Union Indochinoise / Governo di Vichy sotto tutela strategica dell'Impero Giapponese). Massima concentrazione della produzione risicola del Delta del Mekong a rifornimento delle forze dell'Asse. Provincia insulare del delta solcata da fitti canali e dominata da sterminate piantagioni di palme da cocco.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN50"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN50"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN50"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN50"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN50"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Colonie de la Cochinchine — Province de Ben-Tre (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Colonie de la Cochinchine — Province de Ben-Tre (Gouvernement de Vichy)";
      return "Colonie de la Cochinchine — Province de Ben-Tre";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Colonie de la Cochinchine — Province de Ben-Tre (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Colonie de la Cochinchine — Province de Ben-Tre (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Colonie de la Cochinchine — Province de Ben-Tre";
    },
  },
  VN51: {
    id: "VN51",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Trà Vinh",
    nutsName: "Trà Vinh (Tỉnh Trà Vinh)",
    nameLatn: "Trà Vinh",
    nameEngl: "Trà Vinh (Vietnam)",
    modernName: "Trà Vinh (Tỉnh Trà Vinh)",
    historicalName: "Colonie de la Cochinchine — Province de Tra-Vinh",
    historicalToponym: "Tra-Vinh",
    adminTitle: "Union Indochinoise — Colonie de la Cochinchine — Province de Tra-Vinh",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Trà Vinh",
    subRegion: "Cochinchine",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo Trà Vinh). Amministrata dal Governatore della Cocincina con sede a Saigon. Caratterizzata da antiche pagode khmer theravada e coltivazioni costiere di riso. Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges.",
    s2_4: "Colonia della Cocincina (Capoluogo Trà Vinh). Straordinaria espansione delle esportazioni di riso e lattice grezzo. Caratterizzata da antiche pagode khmer theravada e coltivazioni costiere di riso. Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali.",
    s5_6: "Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux.",
    s7: "Colonia della Cocincina (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Nell'autunno 1940 il delta è scosso dall'Insurrezione del Nam Kỳ guidata dal Partito Comunista Indocinese, repressa con rigore dalle forze coloniali, mentre la flotta francese affronta la Marina Thailandese nella Guerra Franco-Thailandese. Caratterizzata da antiche pagode khmer theravada e coltivazioni costiere di riso.",
    s8: "Colonia della Cocincina (Union Indochinoise / Governo di Vichy sotto tutela strategica dell'Impero Giapponese). Massima concentrazione della produzione risicola del Delta del Mekong a rifornimento delle forze dell'Asse. Caratterizzata da antiche pagode khmer theravada e coltivazioni costiere di riso.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN51"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN51"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN51"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN51"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN51"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Colonie de la Cochinchine — Province de Tra-Vinh (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Colonie de la Cochinchine — Province de Tra-Vinh (Gouvernement de Vichy)";
      return "Colonie de la Cochinchine — Province de Tra-Vinh";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Colonie de la Cochinchine — Province de Tra-Vinh (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Colonie de la Cochinchine — Province de Tra-Vinh (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Colonie de la Cochinchine — Province de Tra-Vinh";
    },
  },
  VN52: {
    id: "VN52",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Sóc Trăng",
    nutsName: "Sóc Trăng (Tỉnh Sóc Trăng)",
    nameLatn: "Sóc Trăng",
    nameEngl: "Sóc Trăng (Vietnam)",
    modernName: "Sóc Trăng (Tỉnh Sóc Trăng)",
    historicalName: "Colonie de la Cochinchine — Province de Soc-Trang",
    historicalToponym: "Soc-Trang",
    adminTitle: "Union Indochinoise — Colonie de la Cochinchine — Province de Soc-Trang",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Sóc Trăng",
    subRegion: "Cochinchine",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo Sóc Trăng). Amministrata dal Governatore della Cocincina con sede a Saigon. Grande centro commerciale risicolo con una vivace e influente comunità mercantile cinese. Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges.",
    s2_4: "Colonia della Cocincina (Capoluogo Sóc Trăng). Straordinaria espansione delle esportazioni di riso e lattice grezzo. Grande centro commerciale risicolo con una vivace e influente comunità mercantile cinese. Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali.",
    s5_6: "Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux.",
    s7: "Colonia della Cocincina (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Nell'autunno 1940 il delta è scosso dall'Insurrezione del Nam Kỳ guidata dal Partito Comunista Indocinese, repressa con rigore dalle forze coloniali, mentre la flotta francese affronta la Marina Thailandese nella Guerra Franco-Thailandese. Grande centro commerciale risicolo con una vivace e influente comunità mercantile cinese.",
    s8: "Colonia della Cocincina (Union Indochinoise / Governo di Vichy sotto tutela strategica dell'Impero Giapponese). Massima concentrazione della produzione risicola del Delta del Mekong a rifornimento delle forze dell'Asse. Grande centro commerciale risicolo con una vivace e influente comunità mercantile cinese.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN52"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN52"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN52"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN52"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN52"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Colonie de la Cochinchine — Province de Soc-Trang (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Colonie de la Cochinchine — Province de Soc-Trang (Gouvernement de Vichy)";
      return "Colonie de la Cochinchine — Province de Soc-Trang";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Colonie de la Cochinchine — Province de Soc-Trang (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Colonie de la Cochinchine — Province de Soc-Trang (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Colonie de la Cochinchine — Province de Soc-Trang";
    },
  },
  VN55: {
    id: "VN55",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Bạc Liêu",
    nutsName: "Bạc Liêu (Tỉnh Bạc Liêu)",
    nameLatn: "Bạc Liêu",
    nameEngl: "Bạc Liêu (Vietnam)",
    modernName: "Bạc Liêu (Tỉnh Bạc Liêu)",
    historicalName: "Colonie de la Cochinchine — Province de Bac-Lieu",
    historicalToponym: "Bac-Lieu",
    adminTitle: "Union Indochinoise — Colonie de la Cochinchine — Province de Bac-Lieu",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Bạc Liêu",
    subRegion: "Cochinchine",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo Bạc Liêu). Amministrata dal Governatore della Cocincina con sede a Saigon. Terra dei ricchi proprietari terrieri coloniali ('Công tử Bạc Liêu') e immense saline marine. Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges.",
    s2_4: "Colonia della Cocincina (Capoluogo Bạc Liêu). Straordinaria espansione delle esportazioni di riso e lattice grezzo. Terra dei ricchi proprietari terrieri coloniali ('Công tử Bạc Liêu') e immense saline marine. Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali.",
    s5_6: "Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux.",
    s7: "Colonia della Cocincina (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Nell'autunno 1940 il delta è scosso dall'Insurrezione del Nam Kỳ guidata dal Partito Comunista Indocinese, repressa con rigore dalle forze coloniali, mentre la flotta francese affronta la Marina Thailandese nella Guerra Franco-Thailandese. Terra dei ricchi proprietari terrieri coloniali ('Công tử Bạc Liêu') e immense saline marine.",
    s8: "Colonia della Cocincina (Union Indochinoise / Governo di Vichy sotto tutela strategica dell'Impero Giapponese). Massima concentrazione della produzione risicola del Delta del Mekong a rifornimento delle forze dell'Asse. Terra dei ricchi proprietari terrieri coloniali ('Công tử Bạc Liêu') e immense saline marine.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN55"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN55"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN55"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN55"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN55"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Colonie de la Cochinchine — Province de Bac-Lieu (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Colonie de la Cochinchine — Province de Bac-Lieu (Gouvernement de Vichy)";
      return "Colonie de la Cochinchine — Province de Bac-Lieu";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Colonie de la Cochinchine — Province de Bac-Lieu (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Colonie de la Cochinchine — Province de Bac-Lieu (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Colonie de la Cochinchine — Province de Bac-Lieu";
    },
  },
  VN57: {
    id: "VN57",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Bình Dương",
    nutsName: "Bình Dương (Thủ Dầu Một)",
    nameLatn: "Bình Dương",
    nameEngl: "Bình Dương (Vietnam)",
    modernName: "Bình Dương (Thủ Dầu Một)",
    historicalName: "Colonie de la Cochinchine — Province de Thu-Dau-Mot",
    historicalToponym: "Thu-Dau-Mot",
    adminTitle: "Union Indochinoise — Colonie de la Cochinchine — Province de Thu-Dau-Mot",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Thủ Dầu Một",
    subRegion: "Cochinchine",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo Thủ Dầu Một). Amministrata dal Governatore della Cocincina con sede a Saigon. Rinomata per le piantagioni di hevea e la produzione di ceramiche e lacche tradizionali. Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges.",
    s2_4: "Colonia della Cocincina (Capoluogo Thủ Dầu Một). Straordinaria espansione delle esportazioni di riso e lattice grezzo. Rinomata per le piantagioni di hevea e la produzione di ceramiche e lacche tradizionali. Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali.",
    s5_6: "Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux.",
    s7: "Colonia della Cocincina (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Nell'autunno 1940 il delta è scosso dall'Insurrezione del Nam Kỳ guidata dal Partito Comunista Indocinese, repressa con rigore dalle forze coloniali, mentre la flotta francese affronta la Marina Thailandese nella Guerra Franco-Thailandese. Rinomata per le piantagioni di hevea e la produzione di ceramiche e lacche tradizionali.",
    s8: "Colonia della Cocincina (Union Indochinoise / Governo di Vichy sotto tutela strategica dell'Impero Giapponese). Massima concentrazione della produzione risicola del Delta del Mekong a rifornimento delle forze dell'Asse. Rinomata per le piantagioni di hevea e la produzione di ceramiche e lacche tradizionali.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN57"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN57"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN57"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN57"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN57"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Colonie de la Cochinchine — Province de Thu-Dau-Mot (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Colonie de la Cochinchine — Province de Thu-Dau-Mot (Gouvernement de Vichy)";
      return "Colonie de la Cochinchine — Province de Thu-Dau-Mot";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Colonie de la Cochinchine — Province de Thu-Dau-Mot (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Colonie de la Cochinchine — Province de Thu-Dau-Mot (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Colonie de la Cochinchine — Province de Thu-Dau-Mot";
    },
  },
  VN58: {
    id: "VN58",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Bình Phước",
    nutsName: "Bình Phước (Hớn Quản / Lộc Ninh)",
    nameLatn: "Bình Phước",
    nameEngl: "Bình Phước (Vietnam)",
    modernName: "Bình Phước (Hớn Quản / Lộc Ninh)",
    historicalName: "Colonie de la Cochinchine — Domaine des Terres Rouges (Loc-Ninh)",
    historicalToponym: "Loc-Ninh",
    adminTitle: "Union Indochinoise — Colonie de la Cochinchine — Domaine des Terres Rouges (Loc-Ninh)",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Đồng Xoài",
    subRegion: "Cochinchine",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo Đồng Xoài). Amministrata dal Governatore della Cocincina con sede a Saigon. Cuore delle leggendarie 'Terres Rouges' della Michelin, dominate dalle più vaste piantagioni industriali di caucciù del mondo. Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges.",
    s2_4: "Colonia della Cocincina (Capoluogo Đồng Xoài). Straordinaria espansione delle esportazioni di riso e lattice grezzo. Cuore delle leggendarie 'Terres Rouges' della Michelin, dominate dalle più vaste piantagioni industriali di caucciù del mondo. Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali.",
    s5_6: "Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux.",
    s7: "Colonia della Cocincina (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Nell'autunno 1940 il delta è scosso dall'Insurrezione del Nam Kỳ guidata dal Partito Comunista Indocinese, repressa con rigore dalle forze coloniali, mentre la flotta francese affronta la Marina Thailandese nella Guerra Franco-Thailandese. Cuore delle leggendarie 'Terres Rouges' della Michelin, dominate dalle più vaste piantagioni industriali di caucciù del mondo.",
    s8: "Colonia della Cocincina (Union Indochinoise / Governo di Vichy sotto tutela strategica dell'Impero Giapponese). Massima concentrazione della produzione risicola del Delta del Mekong a rifornimento delle forze dell'Asse. Cuore delle leggendarie 'Terres Rouges' della Michelin, dominate dalle più vaste piantagioni industriali di caucciù del mondo.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN58"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN58"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN58"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN58"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN58"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Colonie de la Cochinchine — Domaine des Terres Rouges (Loc-Ninh) (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Colonie de la Cochinchine — Domaine des Terres Rouges (Loc-Ninh) (Gouvernement de Vichy)";
      return "Colonie de la Cochinchine — Domaine des Terres Rouges (Loc-Ninh)";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Colonie de la Cochinchine — Domaine des Terres Rouges (Loc-Ninh) (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Colonie de la Cochinchine — Domaine des Terres Rouges (Loc-Ninh) (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Colonie de la Cochinchine — Domaine des Terres Rouges (Loc-Ninh)";
    },
  },
  VN59: {
    id: "VN59",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Cà Mau",
    nutsName: "Cà Mau (Mũi Cà Mau)",
    nameLatn: "Cà Mau",
    nameEngl: "Cà Mau (Vietnam)",
    modernName: "Cà Mau (Mũi Cà Mau)",
    historicalName: "Colonie de la Cochinchine — Pointe de Camau",
    historicalToponym: "Camau",
    adminTitle: "Union Indochinoise — Colonie de la Cochinchine — Pointe de Camau",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Cà Mau",
    subRegion: "Cochinchine",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo Cà Mau). Amministrata dal Governatore della Cocincina con sede a Saigon. Estremo lembo meridionale della penisola indocinese dominato da fittissime foreste di mangrovie e paludi costiere. Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges.",
    s2_4: "Colonia della Cocincina (Capoluogo Cà Mau). Straordinaria espansione delle esportazioni di riso e lattice grezzo. Estremo lembo meridionale della penisola indocinese dominato da fittissime foreste di mangrovie e paludi costiere. Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali.",
    s5_6: "Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux.",
    s7: "Colonia della Cocincina (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Nell'autunno 1940 il delta è scosso dall'Insurrezione del Nam Kỳ guidata dal Partito Comunista Indocinese, repressa con rigore dalle forze coloniali, mentre la flotta francese affronta la Marina Thailandese nella Guerra Franco-Thailandese. Estremo lembo meridionale della penisola indocinese dominato da fittissime foreste di mangrovie e paludi costiere.",
    s8: "Colonia della Cocincina (Union Indochinoise / Governo di Vichy sotto tutela strategica dell'Impero Giapponese). Massima concentrazione della produzione risicola del Delta del Mekong a rifornimento delle forze dell'Asse. Estremo lembo meridionale della penisola indocinese dominato da fittissime foreste di mangrovie e paludi costiere.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN59"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN59"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN59"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN59"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN59"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Colonie de la Cochinchine — Pointe de Camau (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Colonie de la Cochinchine — Pointe de Camau (Gouvernement de Vichy)";
      return "Colonie de la Cochinchine — Pointe de Camau";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Colonie de la Cochinchine — Pointe de Camau (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Colonie de la Cochinchine — Pointe de Camau (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Colonie de la Cochinchine — Pointe de Camau";
    },
  },
  VN73: {
    id: "VN73",
    cntrCode: "VN",
    cntrName: "Vietnam",
    name: "Hau Giang",
    nutsName: "Hậu Giang (Vị Thanh)",
    nameLatn: "Hau Giang",
    nameEngl: "Hau Giang (Vietnam)",
    modernName: "Hậu Giang (Vị Thanh)",
    historicalName: "Colonie de la Cochinchine — Bassin du Bas-Bassac",
    historicalToponym: "Vi-Thanh",
    adminTitle: "Union Indochinoise — Colonie de la Cochinchine — Bassin du Bas-Bassac",
    sovereign: "F_IND",
    overlord: "FRA",
    capital: "Vị Thanh",
    subRegion: "Cochinchine",
    regionKind: "INDOCHINA_PROVINCE",
    faction: "Alleati",
    s0_1: "Colonia della Cocincina (Nam Kỳ), unico territorio di dominazione diretta francese nell'Union Indochinoise (Capoluogo Vị Thanh). Amministrata dal Governatore della Cocincina con sede a Saigon. Pianura alluvionale del basso corso del fiume Bassac con estesi canali di bonifica agricola. Dominata dalle immense risaie d'esportazione del Delta del Mekong e dalle piantagioni di caucciù delle Terres Rouges.",
    s2_4: "Colonia della Cocincina (Capoluogo Vị Thanh). Straordinaria espansione delle esportazioni di riso e lattice grezzo. Pianura alluvionale del basso corso del fiume Bassac con estesi canali di bonifica agricola. Con la caduta di Canton e Hainan in mano giapponese (1938-1939), il porto di Saigon intensifica le misure di difesa costiera e i dragaggi fluviali.",
    s5_6: "Colonia della Cocincina (settembre 1939 - giugno 1940). Al conflitto europeo la Cocincina contribuisce con ingenti carichi di derrate agricole, gomma e truppe. Dopo la disfatta del giugno 1940, la colonia riconosce il Governo di Vichy del Maresciallo Pétain sotto il comando dell'Ammiraglio Decoux.",
    s7: "Colonia della Cocincina (Amministrazione di Vichy e stazionamento giapponese post-Accordo di Hanoi del settembre 1940). Nell'autunno 1940 il delta è scosso dall'Insurrezione del Nam Kỳ guidata dal Partito Comunista Indocinese, repressa con rigore dalle forze coloniali, mentre la flotta francese affronta la Marina Thailandese nella Guerra Franco-Thailandese. Pianura alluvionale del basso corso del fiume Bassac con estesi canali di bonifica agricola.",
    s8: "Colonia della Cocincina (Union Indochinoise / Governo di Vichy sotto tutela strategica dell'Impero Giapponese). Massima concentrazione della produzione risicola del Delta del Mekong a rifornimento delle forze dell'Asse. Pianura alluvionale del basso corso del fiume Bassac con estesi canali di bonifica agricola.",
    getNote: (s: number) => {
      if (s >= 8) return FRENCH_INDOCHINA_PROVINCES_META["VN73"].s8;
      if (s >= 7) return FRENCH_INDOCHINA_PROVINCES_META["VN73"].s7;
      if (s >= 5) return FRENCH_INDOCHINA_PROVINCES_META["VN73"].s5_6;
      if (s >= 2) return FRENCH_INDOCHINA_PROVINCES_META["VN73"].s2_4;
      return FRENCH_INDOCHINA_PROVINCES_META["VN73"].s0_1;
    },
    getFaction: (s: number): FactionType => (s >= 7 ? 'Fantoccio' : 'Alleati'),
    getSovereign: (s: number) => (s >= 7 ? 'VIC_IND' : 'F_IND'),
    getHistoricalName: (s: number) => {
      if (s >= 7) return "Colonie de la Cochinchine — Bassin du Bas-Bassac (Stazionamento Militare Giapponese / Vichy)";
      if (s >= 6) return "Colonie de la Cochinchine — Bassin du Bas-Bassac (Gouvernement de Vichy)";
      return "Colonie de la Cochinchine — Bassin du Bas-Bassac";
    },
    getAdminTitle: (s: number) => {
      if (s >= 7) return "Union Indochinoise — Colonie de la Cochinchine — Bassin du Bas-Bassac (Amministrazione Vichy / Stazionamento Giapponese)";
      if (s >= 6) return "Union Indochinoise — Colonie de la Cochinchine — Bassin du Bas-Bassac (Gouvernement Général de l'Indochine — Vichy)";
      return "Union Indochinoise — Colonie de la Cochinchine — Bassin du Bas-Bassac";
    },
  },
};

/**
 * Risolutore territoriale completo per le province dell'Indocina Francese
 */
export function resolveFrenchIndochinaProvince(ft: any, s: number): ResolvedTerritory {
  const p = ft.properties || {};
  const rawId = String(ft.id || p.id || '').trim();
  const rawName = String(p.NAME || p.name || p.NAME_LATN || p.NUTS_NAME || '').trim();

  // 1. Ricerca diretta per ID
  let meta = FRENCH_INDOCHINA_PROVINCES_META[rawId];

  // 2. Ricerca per fallback se non trovato
  if (!meta) {
    const cleanId = rawId.replace(/[^A-Za-z0-9]/g, '');
    meta = FRENCH_INDOCHINA_PROVINCES_META[cleanId];
  }

  // 3. Ricerca fuzzy per nome
  if (!meta) {
    const nrmRaw = rawName.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const key of Object.keys(FRENCH_INDOCHINA_PROVINCES_META)) {
      const item = FRENCH_INDOCHINA_PROVINCES_META[key];
      const nrmItem = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const nrmTop = item.historicalToponym.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (nrmRaw === nrmItem || nrmRaw === nrmTop || (nrmItem.length >= 5 && nrmRaw.includes(nrmItem))) {
        meta = item;
        break;
      }
    }
  }

  // 4. Risoluzione con meta trovato
  if (meta) {
    const sov = meta.getSovereign ? meta.getSovereign(s) : (s >= 7 ? 'VIC_IND' : 'F_IND');
    const fac = meta.getFaction ? meta.getFaction(s) : (s >= 7 ? 'Fantoccio' : 'Alleati');
    const histName = meta.getHistoricalName ? meta.getHistoricalName(s) : meta.historicalName;
    const admin = meta.getAdminTitle ? meta.getAdminTitle(s) : meta.adminTitle;
    const note = meta.getNote(s);

    return makeResult(sov, histName, note, fac, admin);
  }

  // 5. Fallback generico per territori indocinesi
  const defaultHistName = p.HISTORICAL_NAME || rawName || 'Union Indochinoise';
  const defaultAdmin = "Union Indochinoise — Gouvernement Général de l'Indochine (Hanoï)";
  const defaultNote = s >= 7
    ? "Provincia dell'Indocina Francese sotto l'amministrazione coloniale di Vichy (Jean Decoux) e lo stazionamento militare giapponese a seguito dell'Accordo di Hanoi del settembre 1940."
    : "Territorio della Federazione Indocinese sotto sovranità francese (Gouvernement Général de l'Indochine, Hanoï).";
  const defaultFaction: FactionType = s >= 7 ? 'Fantoccio' : 'Alleati';
  const defaultSov = s >= 7 ? 'VIC_IND' : 'F_IND';

  return makeResult(defaultSov, defaultHistName, defaultNote, defaultFaction, defaultAdmin);
}
