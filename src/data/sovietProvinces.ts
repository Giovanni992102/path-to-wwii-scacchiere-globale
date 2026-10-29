/**
 * Censimento Geocartografico e Toponomastico dell'Unione delle Repubbliche Socialiste Sovietiche (1936-1941)
 * Copertura esaustiva e rigorosa di tutte le 239 entita territoriali sovietiche censite nel database unificato (layer 'prov'):
 * - RSFSR Core, Volga, Urali, Sud & Repubbliche del Volga (47 entita)
 * - RSFSR Nord-Ovest, Leningrado, Carelia, Murmansk, Kola, Komi (51 entita)
 * - RSFSR Siberia, Estremo Oriente, Pacifico & Tannu Tuva (26 entita)
 * - RSS Ucraina & RSSA Moldava / Transnistria (39 entita)
 * - RSS Bielorussa & Transcaucasia (29 entita: Bielorussia 4, Georgia 12, Armenia 11, Azerbaigian 2)
 * - Repubbliche dell'Asia Centrale (47 entita: Kazakistan 16, Uzbekistan 14, Turkmenistan 5, Tagikistan 5, Kirghizistan 7)
 *
 * Gestione dinamica degli status territoriali speciali:
 * - SOV_ADM1_RUS_55_Tuva: Tannu Tuva (TUV), protettorato alleato sovietico indipendente (Comintern)
 * - SOV_ADM1_UKR_89_Chernivtsi_Oblast: Bucovina Settentrionale (Cernivci / Cernăuți), Romania (ROM) fino a Step 5, URSS (SOV) da Step 6
 * - SOV_MASSR_310_Transnistria: RSSA Moldava (Tiraspol) fino a Step 5, poi RSS Moldava da Step 6
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

export interface SovietProvinceInfo {
  id: string;
  republic: string;
  modernName: string;
  historicalName: string;
  russianName: string;
  adminTitle: string;
  capital: string;
  keys: string[];
  notes: {
    s0: string;
    s1: string;
    s2: string;
    s3_4: string;
    s5: string;
    s6: string;
    s7: string;
    s8: string;
  };
  getOwner: (step: number) => string;
  getFaction: (step: number) => FactionType;
  getHistoricalName: (step: number) => string;
  getAdminTitle: (step: number) => string;
  getNote: (step: number) => string;
}

export const SOVIET_PROVINCES_META: Record<string, SovietProvinceInfo> = {
  "SOV_ADM1_ARM_117_Gegharkunik": {
    id: "SOV_ADM1_ARM_117_Gegharkunik",
    republic: "ARMENIA",
    modernName: "Gegharkunik",
    historicalName: "Gegharkunik (Lago Sevan \u2014 Cascata Idroelettrica Sevan-Hrazdan)",
    russianName: "Sevanskij rajon \u2014 Armyanskaya SSR",
    adminTitle: "Sevanskij Ispolkom \u2014 RSS Armena (URSS)",
    capital: "Gavar (Nor Bayazet)",
    keys: ["adm1_arm_117_gegharkunik", "armyanskaya", "gavar (nor bayazet)", "gavarnorbayazet", "gegharkunik", "rajon", "sevanskij", "sov_adm1_arm_117_gegharkunik"],
    notes: {
      s0: "Regioni storiche e minerarie dell'Armenia Sovietica; a Leninakan (Gyumri) ha sede la più grande guarnigione militare e base aerea di frontiera dell'Armata Rossa a ridosso del confine turco e storiche industrie tessili; a Zangezur (Syunik) operano le ricchissime miniere di rame e molibdeno di Kapan e Kajaran; ad Alaverdi (Lori) fondono il rame; il lago d'alta quota Sevan offre risorse idriche ed energetiche uniche.",
      s1: "Le fortificazioni di frontiera a Leninakan vengono presidiate da divisioni di fucilieri dell'Armata Rossa sotto massima allerta contro le provocazioni di confine turche; purghe tra i funzionari locali.",
      s2: "Le miniere di Kapan e Kajaran raddoppiano l'estrazione di concentrato di molibdeno, elemento di lega cruciale per gli acciai balistici della difesa sovietica.",
      s3_4: "I cantieri idroelettrici sul lago Sevan e sul fiume Hrazdan avanzano per garantire l'autosufficienza energetica della Transcaucasia.",
      s5: "Durante la guerra in Europa, il molibdeno e il rame armeno garantiscono all'URSS le risorse metallurgiche necessarie per non dipendere da importazioni navali britanniche.",
      s6: "Rafforzamento delle postazioni d'artiglieria e dei posti di vedetta lungo l'Araks di fronte ai presidi dell'esercito turco.",
      s7: "Sviluppo di stabilimenti chimici e conservieri ad Armavir (Oktemberyan) e nella valle dell'Ararat per le razioni K dell'esercito.",
      s8: "Le montagne dell'Armenia costituiscono una sentinella armata e un tesoro minerario strategico dell'URSS alla vigilia del conflitto.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Gegharkunik (Lago Sevan — Cascata Idroelettrica Sevan-Hrazdan)",
    getAdminTitle: (_step: number) => "Sevanskij Ispolkom — RSS Armena (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_ARM_118_Syunik": {
    id: "SOV_ADM1_ARM_118_Syunik",
    republic: "ARMENIA",
    modernName: "Syunik",
    historicalName: "Syunik (Zangezur \u2014 Miniere di Rame e Molibdeno di Kapan e Kajaran)",
    russianName: "Kapanskij rajon \u2014 Armyanskaya SSR",
    adminTitle: "Kapanskij Ispolkom \u2014 RSS Armena (URSS)",
    capital: "Kapan",
    keys: ["adm1_arm_118_syunik", "armyanskaya", "kapan", "kapanskij", "rajon", "sov_adm1_arm_118_syunik", "syunik"],
    notes: {
      s0: "Regioni storiche e minerarie dell'Armenia Sovietica; a Leninakan (Gyumri) ha sede la più grande guarnigione militare e base aerea di frontiera dell'Armata Rossa a ridosso del confine turco e storiche industrie tessili; a Zangezur (Syunik) operano le ricchissime miniere di rame e molibdeno di Kapan e Kajaran; ad Alaverdi (Lori) fondono il rame; il lago d'alta quota Sevan offre risorse idriche ed energetiche uniche.",
      s1: "Le fortificazioni di frontiera a Leninakan vengono presidiate da divisioni di fucilieri dell'Armata Rossa sotto massima allerta contro le provocazioni di confine turche; purghe tra i funzionari locali.",
      s2: "Le miniere di Kapan e Kajaran raddoppiano l'estrazione di concentrato di molibdeno, elemento di lega cruciale per gli acciai balistici della difesa sovietica.",
      s3_4: "I cantieri idroelettrici sul lago Sevan e sul fiume Hrazdan avanzano per garantire l'autosufficienza energetica della Transcaucasia.",
      s5: "Durante la guerra in Europa, il molibdeno e il rame armeno garantiscono all'URSS le risorse metallurgiche necessarie per non dipendere da importazioni navali britanniche.",
      s6: "Rafforzamento delle postazioni d'artiglieria e dei posti di vedetta lungo l'Araks di fronte ai presidi dell'esercito turco.",
      s7: "Sviluppo di stabilimenti chimici e conservieri ad Armavir (Oktemberyan) e nella valle dell'Ararat per le razioni K dell'esercito.",
      s8: "Le montagne dell'Armenia costituiscono una sentinella armata e un tesoro minerario strategico dell'URSS alla vigilia del conflitto.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Syunik (Zangezur — Miniere di Rame e Molibdeno di Kapan e Kajaran)",
    getAdminTitle: (_step: number) => "Kapanskij Ispolkom — RSS Armena (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_ARM_119_Tavush": {
    id: "SOV_ADM1_ARM_119_Tavush",
    republic: "ARMENIA",
    modernName: "Tavush",
    historicalName: "Tavush (Dilijan \u2014 Vallate Forestali del Piccolo Caucaso)",
    russianName: "Tavushskij rajon \u2014 Armyanskaya SSR",
    adminTitle: "Tavu\u0161skij Ispolkom \u2014 RSS Armena (URSS)",
    capital: "Ijevan",
    keys: ["adm1_arm_119_tavush", "armyanskaya", "ijevan", "rajon", "sov_adm1_arm_119_tavush", "tavush", "tavushskij"],
    notes: {
      s0: "Regioni storiche e minerarie dell'Armenia Sovietica; a Leninakan (Gyumri) ha sede la più grande guarnigione militare e base aerea di frontiera dell'Armata Rossa a ridosso del confine turco e storiche industrie tessili; a Zangezur (Syunik) operano le ricchissime miniere di rame e molibdeno di Kapan e Kajaran; ad Alaverdi (Lori) fondono il rame; il lago d'alta quota Sevan offre risorse idriche ed energetiche uniche.",
      s1: "Le fortificazioni di frontiera a Leninakan vengono presidiate da divisioni di fucilieri dell'Armata Rossa sotto massima allerta contro le provocazioni di confine turche; purghe tra i funzionari locali.",
      s2: "Le miniere di Kapan e Kajaran raddoppiano l'estrazione di concentrato di molibdeno, elemento di lega cruciale per gli acciai balistici della difesa sovietica.",
      s3_4: "I cantieri idroelettrici sul lago Sevan e sul fiume Hrazdan avanzano per garantire l'autosufficienza energetica della Transcaucasia.",
      s5: "Durante la guerra in Europa, il molibdeno e il rame armeno garantiscono all'URSS le risorse metallurgiche necessarie per non dipendere da importazioni navali britanniche.",
      s6: "Rafforzamento delle postazioni d'artiglieria e dei posti di vedetta lungo l'Araks di fronte ai presidi dell'esercito turco.",
      s7: "Sviluppo di stabilimenti chimici e conservieri ad Armavir (Oktemberyan) e nella valle dell'Ararat per le razioni K dell'esercito.",
      s8: "Le montagne dell'Armenia costituiscono una sentinella armata e un tesoro minerario strategico dell'URSS alla vigilia del conflitto.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Tavush (Dilijan — Vallate Forestali del Piccolo Caucaso)",
    getAdminTitle: (_step: number) => "Tavušskij Ispolkom — RSS Armena (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_ARM_120_Shirak": {
    id: "SOV_ADM1_ARM_120_Shirak",
    republic: "ARMENIA",
    modernName: "Shirak",
    historicalName: "Shirak (Leninakan / Gyumri \u2014 Presidio di Frontiera con la Turchia)",
    russianName: "Leninakanskij rajon \u2014 Armyanskaya SSR",
    adminTitle: "Leninakanskij Gorsovet \u2014 RSS Armena (URSS)",
    capital: "Leninakan",
    keys: ["adm1_arm_120_shirak", "armyanskaya", "leninakan", "leninakanskij", "rajon", "shirak", "sov_adm1_arm_120_shirak"],
    notes: {
      s0: "Regioni storiche e minerarie dell'Armenia Sovietica; a Leninakan (Gyumri) ha sede la più grande guarnigione militare e base aerea di frontiera dell'Armata Rossa a ridosso del confine turco e storiche industrie tessili; a Zangezur (Syunik) operano le ricchissime miniere di rame e molibdeno di Kapan e Kajaran; ad Alaverdi (Lori) fondono il rame; il lago d'alta quota Sevan offre risorse idriche ed energetiche uniche.",
      s1: "Le fortificazioni di frontiera a Leninakan vengono presidiate da divisioni di fucilieri dell'Armata Rossa sotto massima allerta contro le provocazioni di confine turche; purghe tra i funzionari locali.",
      s2: "Le miniere di Kapan e Kajaran raddoppiano l'estrazione di concentrato di molibdeno, elemento di lega cruciale per gli acciai balistici della difesa sovietica.",
      s3_4: "I cantieri idroelettrici sul lago Sevan e sul fiume Hrazdan avanzano per garantire l'autosufficienza energetica della Transcaucasia.",
      s5: "Durante la guerra in Europa, il molibdeno e il rame armeno garantiscono all'URSS le risorse metallurgiche necessarie per non dipendere da importazioni navali britanniche.",
      s6: "Rafforzamento delle postazioni d'artiglieria e dei posti di vedetta lungo l'Araks di fronte ai presidi dell'esercito turco.",
      s7: "Sviluppo di stabilimenti chimici e conservieri ad Armavir (Oktemberyan) e nella valle dell'Ararat per le razioni K dell'esercito.",
      s8: "Le montagne dell'Armenia costituiscono una sentinella armata e un tesoro minerario strategico dell'URSS alla vigilia del conflitto.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Shirak (Leninakan / Gyumri — Presidio di Frontiera con la Turchia)",
    getAdminTitle: (_step: number) => "Leninakanskij Gorsovet — RSS Armena (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_ARM_121_Lori": {
    id: "SOV_ADM1_ARM_121_Lori",
    republic: "ARMENIA",
    modernName: "Lori",
    historicalName: "Lori (Kirovakan / Vanadzor \u2014 Miniere di Rame di Alaverdi)",
    russianName: "Kirovakanskij rajon \u2014 Armyanskaya SSR",
    adminTitle: "Kirovakanskij Ispolkom \u2014 RSS Armena (URSS)",
    capital: "Kirovakan",
    keys: ["adm1_arm_121_lori", "armyanskaya", "kirovakan", "kirovakanskij", "lori", "rajon", "sov_adm1_arm_121_lori"],
    notes: {
      s0: "Regioni storiche e minerarie dell'Armenia Sovietica; a Leninakan (Gyumri) ha sede la più grande guarnigione militare e base aerea di frontiera dell'Armata Rossa a ridosso del confine turco e storiche industrie tessili; a Zangezur (Syunik) operano le ricchissime miniere di rame e molibdeno di Kapan e Kajaran; ad Alaverdi (Lori) fondono il rame; il lago d'alta quota Sevan offre risorse idriche ed energetiche uniche.",
      s1: "Le fortificazioni di frontiera a Leninakan vengono presidiate da divisioni di fucilieri dell'Armata Rossa sotto massima allerta contro le provocazioni di confine turche; purghe tra i funzionari locali.",
      s2: "Le miniere di Kapan e Kajaran raddoppiano l'estrazione di concentrato di molibdeno, elemento di lega cruciale per gli acciai balistici della difesa sovietica.",
      s3_4: "I cantieri idroelettrici sul lago Sevan e sul fiume Hrazdan avanzano per garantire l'autosufficienza energetica della Transcaucasia.",
      s5: "Durante la guerra in Europa, il molibdeno e il rame armeno garantiscono all'URSS le risorse metallurgiche necessarie per non dipendere da importazioni navali britanniche.",
      s6: "Rafforzamento delle postazioni d'artiglieria e dei posti di vedetta lungo l'Araks di fronte ai presidi dell'esercito turco.",
      s7: "Sviluppo di stabilimenti chimici e conservieri ad Armavir (Oktemberyan) e nella valle dell'Ararat per le razioni K dell'esercito.",
      s8: "Le montagne dell'Armenia costituiscono una sentinella armata e un tesoro minerario strategico dell'URSS alla vigilia del conflitto.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Lori (Kirovakan / Vanadzor — Miniere di Rame di Alaverdi)",
    getAdminTitle: (_step: number) => "Kirovakanskij Ispolkom — RSS Armena (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_ARM_122_Kotayk": {
    id: "SOV_ADM1_ARM_122_Kotayk",
    republic: "ARMENIA",
    modernName: "Kotayk",
    historicalName: "Kotayk (Altopiano di Hrazdan \u2014 Cave di Tufo Vulcanico e Basalto)",
    russianName: "Kotajkskij rajon \u2014 Armyanskaya SSR",
    adminTitle: "Kotajkskij Ispolkom \u2014 RSS Armena (URSS)",
    capital: "Hrazdan",
    keys: ["adm1_arm_122_kotayk", "armyanskaya", "hrazdan", "kotajkskij", "kotayk", "rajon", "sov_adm1_arm_122_kotayk"],
    notes: {
      s0: "Regioni storiche e minerarie dell'Armenia Sovietica; a Leninakan (Gyumri) ha sede la più grande guarnigione militare e base aerea di frontiera dell'Armata Rossa a ridosso del confine turco e storiche industrie tessili; a Zangezur (Syunik) operano le ricchissime miniere di rame e molibdeno di Kapan e Kajaran; ad Alaverdi (Lori) fondono il rame; il lago d'alta quota Sevan offre risorse idriche ed energetiche uniche.",
      s1: "Le fortificazioni di frontiera a Leninakan vengono presidiate da divisioni di fucilieri dell'Armata Rossa sotto massima allerta contro le provocazioni di confine turche; purghe tra i funzionari locali.",
      s2: "Le miniere di Kapan e Kajaran raddoppiano l'estrazione di concentrato di molibdeno, elemento di lega cruciale per gli acciai balistici della difesa sovietica.",
      s3_4: "I cantieri idroelettrici sul lago Sevan e sul fiume Hrazdan avanzano per garantire l'autosufficienza energetica della Transcaucasia.",
      s5: "Durante la guerra in Europa, il molibdeno e il rame armeno garantiscono all'URSS le risorse metallurgiche necessarie per non dipendere da importazioni navali britanniche.",
      s6: "Rafforzamento delle postazioni d'artiglieria e dei posti di vedetta lungo l'Araks di fronte ai presidi dell'esercito turco.",
      s7: "Sviluppo di stabilimenti chimici e conservieri ad Armavir (Oktemberyan) e nella valle dell'Ararat per le razioni K dell'esercito.",
      s8: "Le montagne dell'Armenia costituiscono una sentinella armata e un tesoro minerario strategico dell'URSS alla vigilia del conflitto.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Kotayk (Altopiano di Hrazdan — Cave di Tufo Vulcanico e Basalto)",
    getAdminTitle: (_step: number) => "Kotajkskij Ispolkom — RSS Armena (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_ARM_123_Vayots_Dzor": {
    id: "SOV_ADM1_ARM_123_Vayots_Dzor",
    republic: "ARMENIA",
    modernName: "Vayots Dzor",
    historicalName: "Vayots Dzor (Valle del Fiume Arpa \u2014 Gole di Yeghegnadzor)",
    russianName: "Eghegnadzorskij rajon \u2014 Armyanskaya SSR",
    adminTitle: "Echegnadzorskij Ispolkom \u2014 RSS Armena (URSS)",
    capital: "Yeghegnadzor",
    keys: ["adm1_arm_123_vayots_dzor", "armyanskaya", "eghegnadzorskij", "rajon", "sov_adm1_arm_123_vayots_dzor", "vayots", "vayots dzor", "vayots_dzor", "yeghegnadzor"],
    notes: {
      s0: "Regioni storiche e minerarie dell'Armenia Sovietica; a Leninakan (Gyumri) ha sede la più grande guarnigione militare e base aerea di frontiera dell'Armata Rossa a ridosso del confine turco e storiche industrie tessili; a Zangezur (Syunik) operano le ricchissime miniere di rame e molibdeno di Kapan e Kajaran; ad Alaverdi (Lori) fondono il rame; il lago d'alta quota Sevan offre risorse idriche ed energetiche uniche.",
      s1: "Le fortificazioni di frontiera a Leninakan vengono presidiate da divisioni di fucilieri dell'Armata Rossa sotto massima allerta contro le provocazioni di confine turche; purghe tra i funzionari locali.",
      s2: "Le miniere di Kapan e Kajaran raddoppiano l'estrazione di concentrato di molibdeno, elemento di lega cruciale per gli acciai balistici della difesa sovietica.",
      s3_4: "I cantieri idroelettrici sul lago Sevan e sul fiume Hrazdan avanzano per garantire l'autosufficienza energetica della Transcaucasia.",
      s5: "Durante la guerra in Europa, il molibdeno e il rame armeno garantiscono all'URSS le risorse metallurgiche necessarie per non dipendere da importazioni navali britanniche.",
      s6: "Rafforzamento delle postazioni d'artiglieria e dei posti di vedetta lungo l'Araks di fronte ai presidi dell'esercito turco.",
      s7: "Sviluppo di stabilimenti chimici e conservieri ad Armavir (Oktemberyan) e nella valle dell'Ararat per le razioni K dell'esercito.",
      s8: "Le montagne dell'Armenia costituiscono una sentinella armata e un tesoro minerario strategico dell'URSS alla vigilia del conflitto.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Vayots Dzor (Valle del Fiume Arpa — Gole di Yeghegnadzor)",
    getAdminTitle: (_step: number) => "Echegnadzorskij Ispolkom — RSS Armena (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_ARM_124_Armavir": {
    id: "SOV_ADM1_ARM_124_Armavir",
    republic: "ARMENIA",
    modernName: "Armavir",
    historicalName: "Armavir (Oktemberyan \u2014 Fiume Araks e Monumento di Sardarapat)",
    russianName: "Oktemberyanskij rajon \u2014 Armyanskaya SSR",
    adminTitle: "Oktemberjanskij Ispolkom \u2014 RSS Armena (URSS)",
    capital: "Oktemberyan (Armavir)",
    keys: ["adm1_arm_124_armavir", "armavir", "armyanskaya", "oktemberyan (armavir)", "oktemberyanarmavir", "oktemberyanskij", "rajon", "sov_adm1_arm_124_armavir"],
    notes: {
      s0: "Regioni storiche e minerarie dell'Armenia Sovietica; a Leninakan (Gyumri) ha sede la più grande guarnigione militare e base aerea di frontiera dell'Armata Rossa a ridosso del confine turco e storiche industrie tessili; a Zangezur (Syunik) operano le ricchissime miniere di rame e molibdeno di Kapan e Kajaran; ad Alaverdi (Lori) fondono il rame; il lago d'alta quota Sevan offre risorse idriche ed energetiche uniche.",
      s1: "Le fortificazioni di frontiera a Leninakan vengono presidiate da divisioni di fucilieri dell'Armata Rossa sotto massima allerta contro le provocazioni di confine turche; purghe tra i funzionari locali.",
      s2: "Le miniere di Kapan e Kajaran raddoppiano l'estrazione di concentrato di molibdeno, elemento di lega cruciale per gli acciai balistici della difesa sovietica.",
      s3_4: "I cantieri idroelettrici sul lago Sevan e sul fiume Hrazdan avanzano per garantire l'autosufficienza energetica della Transcaucasia.",
      s5: "Durante la guerra in Europa, il molibdeno e il rame armeno garantiscono all'URSS le risorse metallurgiche necessarie per non dipendere da importazioni navali britanniche.",
      s6: "Rafforzamento delle postazioni d'artiglieria e dei posti di vedetta lungo l'Araks di fronte ai presidi dell'esercito turco.",
      s7: "Sviluppo di stabilimenti chimici e conservieri ad Armavir (Oktemberyan) e nella valle dell'Ararat per le razioni K dell'esercito.",
      s8: "Le montagne dell'Armenia costituiscono una sentinella armata e un tesoro minerario strategico dell'URSS alla vigilia del conflitto.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Armavir (Oktemberyan — Fiume Araks e Monumento di Sardarapat)",
    getAdminTitle: (_step: number) => "Oktemberjanskij Ispolkom — RSS Armena (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_ARM_125_Aragatsotn": {
    id: "SOV_ADM1_ARM_125_Aragatsotn",
    republic: "ARMENIA",
    modernName: "Aragatsotn",
    historicalName: "Aragatsotn (Pendici del Monte Aragats \u2014 Valle del Kasakh)",
    russianName: "Aragackij rajon \u2014 Armyanskaya SSR",
    adminTitle: "A\u0161tarakskij Ispolkom \u2014 RSS Armena (URSS)",
    capital: "Ashtarak",
    keys: ["adm1_arm_125_aragatsotn", "aragackij", "aragatsotn", "armyanskaya", "ashtarak", "rajon", "sov_adm1_arm_125_aragatsotn"],
    notes: {
      s0: "Regioni storiche e minerarie dell'Armenia Sovietica; a Leninakan (Gyumri) ha sede la più grande guarnigione militare e base aerea di frontiera dell'Armata Rossa a ridosso del confine turco e storiche industrie tessili; a Zangezur (Syunik) operano le ricchissime miniere di rame e molibdeno di Kapan e Kajaran; ad Alaverdi (Lori) fondono il rame; il lago d'alta quota Sevan offre risorse idriche ed energetiche uniche.",
      s1: "Le fortificazioni di frontiera a Leninakan vengono presidiate da divisioni di fucilieri dell'Armata Rossa sotto massima allerta contro le provocazioni di confine turche; purghe tra i funzionari locali.",
      s2: "Le miniere di Kapan e Kajaran raddoppiano l'estrazione di concentrato di molibdeno, elemento di lega cruciale per gli acciai balistici della difesa sovietica.",
      s3_4: "I cantieri idroelettrici sul lago Sevan e sul fiume Hrazdan avanzano per garantire l'autosufficienza energetica della Transcaucasia.",
      s5: "Durante la guerra in Europa, il molibdeno e il rame armeno garantiscono all'URSS le risorse metallurgiche necessarie per non dipendere da importazioni navali britanniche.",
      s6: "Rafforzamento delle postazioni d'artiglieria e dei posti di vedetta lungo l'Araks di fronte ai presidi dell'esercito turco.",
      s7: "Sviluppo di stabilimenti chimici e conservieri ad Armavir (Oktemberyan) e nella valle dell'Ararat per le razioni K dell'esercito.",
      s8: "Le montagne dell'Armenia costituiscono una sentinella armata e un tesoro minerario strategico dell'URSS alla vigilia del conflitto.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Aragatsotn (Pendici del Monte Aragats — Valle del Kasakh)",
    getAdminTitle: (_step: number) => "Aštarakskij Ispolkom — RSS Armena (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_ARM_126_Yerevan": {
    id: "SOV_ADM1_ARM_126_Yerevan",
    republic: "ARMENIA",
    modernName: "Erevan (Citt\u00e0 Capitale)",
    historicalName: "Erevan (Capitale della RSS Armena \u2014 Fiume Hrazdan)",
    russianName: "Gorod Erevan",
    adminTitle: "Erevanskij Gorsovet \u2014 RSS Armena (URSS)",
    capital: "Erevan",
    keys: ["adm1_arm_126_yerevan", "capitale", "erevan", "gorod", "sov_adm1_arm_126_yerevan", "yerevan"],
    notes: {
      s0: "Capitale della Repubblica Socialista Sovietica Armena sul fiume Hrazdan, affacciata sulla maestosa sagoma del Monte Ararat (situato oltre il confine turco); trasformata dal piano urbanistico di Aleksandr Tamanjan con splendidi edifici in tufo rosa e basalto; sede dell'Accademia delle Scienze, dell'Università statale e delle fabbriche chimiche Nairit per la gomma sintetica chloroprene.",
      s1: "Le purghe staliniane devastano l'intelligencija armena: lo scrittore Aksel Bakunts viene fucilato, il poeta Yeghishe Charents muore in prigione, e il Primo Segretario del partito Aghasi Khanjian viene assassinato a Tbilisi da Berija nel 1936.",
      s2: "Entra in funzione lo stabilimento chimico Nairit a Erevan, secondo polo dell'URSS per la sintesi della gomma sintetica a base di carburo di calcio e acetilene.",
      s3_4: "La gomma di Nairit a Erevan rifornisce le fabbriche di pneumatici per autocarri militari e isolanti per cavi elettrici di Mosca e Leningrado.",
      s5: "Durante le tensioni della guerra europea, Erevan rafforza la sorveglianza militare lungo il fiume Araks di fronte all'esercito turco.",
      s6: "Avvio della pianificazione della colossale Cascata Idroelettrica Sevan-Hrazdan per alimentare la crescente industria chimica e metallurgica armena.",
      s7: "Erevan intensifica la produzione del celebre Cognac Armeno (Ararat), inserito tra le riserve governative per i banchetti di stato del Cremlino.",
      s8: "Alla vigilia del 22 giugno 1941, Erevan è il baluardo culturale e industriale dell'Armenia sovietica a presidio dell'estrema frontiera meridionale dell'URSS.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Erevan (Capitale della RSS Armena — Fiume Hrazdan)",
    getAdminTitle: (_step: number) => "Erevanskij Gorsovet — RSS Armena (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_ARM_127_Ararat": {
    id: "SOV_ADM1_ARM_127_Ararat",
    republic: "ARMENIA",
    modernName: "Ararat",
    historicalName: "Ararat (Valle dell'Ararat \u2014 Vigneti e Fabbrica del Cognac Armeno)",
    russianName: "Araratskij rajon \u2014 Armyanskaya SSR",
    adminTitle: "Araratskij Ispolkom \u2014 RSS Armena (URSS)",
    capital: "Artashat",
    keys: ["adm1_arm_127_ararat", "ararat", "araratskij", "armyanskaya", "artashat", "rajon", "sov_adm1_arm_127_ararat"],
    notes: {
      s0: "Regioni storiche e minerarie dell'Armenia Sovietica; a Leninakan (Gyumri) ha sede la più grande guarnigione militare e base aerea di frontiera dell'Armata Rossa a ridosso del confine turco e storiche industrie tessili; a Zangezur (Syunik) operano le ricchissime miniere di rame e molibdeno di Kapan e Kajaran; ad Alaverdi (Lori) fondono il rame; il lago d'alta quota Sevan offre risorse idriche ed energetiche uniche.",
      s1: "Le fortificazioni di frontiera a Leninakan vengono presidiate da divisioni di fucilieri dell'Armata Rossa sotto massima allerta contro le provocazioni di confine turche; purghe tra i funzionari locali.",
      s2: "Le miniere di Kapan e Kajaran raddoppiano l'estrazione di concentrato di molibdeno, elemento di lega cruciale per gli acciai balistici della difesa sovietica.",
      s3_4: "I cantieri idroelettrici sul lago Sevan e sul fiume Hrazdan avanzano per garantire l'autosufficienza energetica della Transcaucasia.",
      s5: "Durante la guerra in Europa, il molibdeno e il rame armeno garantiscono all'URSS le risorse metallurgiche necessarie per non dipendere da importazioni navali britanniche.",
      s6: "Rafforzamento delle postazioni d'artiglieria e dei posti di vedetta lungo l'Araks di fronte ai presidi dell'esercito turco.",
      s7: "Sviluppo di stabilimenti chimici e conservieri ad Armavir (Oktemberyan) e nella valle dell'Ararat per le razioni K dell'esercito.",
      s8: "Le montagne dell'Armenia costituiscono una sentinella armata e un tesoro minerario strategico dell'URSS alla vigilia del conflitto.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Ararat (Valle dell'Ararat — Vigneti e Fabbrica del Cognac Armeno)",
    getAdminTitle: (_step: number) => "Araratskij Ispolkom — RSS Armena (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_AZE_128_Nakhchivan_Autonomous_Republic": {
    id: "SOV_ADM1_AZE_128_Nakhchivan_Autonomous_Republic",
    republic: "AZERBAIJAN",
    modernName: "Repubblica Autonoma di Nax\u00e7\u0131van",
    historicalName: "RSSA di Nax\u00e7\u0131van (Exclave sul Fiume Araks \u2014 Frontiera con Iran e Turchia)",
    russianName: "Nakhichevanskaya ASSR \u2014 Azerbaydzhanskaya SSR",
    adminTitle: "Sovet Narodnykh Komissarov Nachi\u010devanskoj ASSR \u2014 URSS",
    capital: "Nax\u00e7\u0131van",
    keys: ["adm1_aze_128_nakhchivan_autonomous_republic", "autonoma", "azerbaydzhanskaya", "nakhchivan autonomous republic", "nakhchivan_autonomous_republic", "nakhichevanskaya", "naxvan", "naxçıvan", "repubblica", "sov_adm1_aze_128_nakhchivan_autonomous_republic"],
    notes: {
      s0: "Exclave autonoma dell'Azerbaigian Sovietico separata dal territorio armeno lungo il corso del fiume Araks; confina a sud con l'Iran (Persia) e a ovest per un breve tratto con la Turchia; centro storico di produzione di sale minerale, cotone, seta e viticoltura.",
      s1: "Chiusura totale della frontiera con l'Iran da parte delle truppe confinarie dell'NKVD; repressione dei commercianti transfrontalieri e purghe dei quadri azeri.",
      s2: "Ammodernamento delle storiche miniere di salgemma di Naxçıvan per il fabbisogno alimentare e chimico della Transcaucasia.",
      s3_4: "Istituzione di posti di guardia rinforzati e torrette di vedetta lungo la ferrovia di frontiera che costeggia il fiume Araks verso Julfa.",
      s5: "La stazione ferroviaria di Julfa funge da unico punto di contatto ferroviario diretto a scartamento misto tra l'URSS e la rete iraniana.",
      s6: "Sorveglianza militare intensiva delle comunicazioni stradali e ferroviarie lungo l'Araks per prevenire manovre d'intelligence tedesche in Iran.",
      s7: "Pianificazione logistica preventiva dei comandi sovietici per l'eventuale transito di truppe verso l'Iran settentrionale in caso di minaccia Asse.",
      s8: "Naxçıvan protegge l'estremo varco di frontiera meridionale dell'URSS sul corridoio iraniano alla vigilia dell'estate 1941.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSSA di Naxçıvan (Exclave sul Fiume Araks — Frontiera con Iran e Turchia)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Nachičevanskoj ASSR — URSS",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_AZE_129_Contiguous_Azerbaijan": {
    id: "SOV_ADM1_AZE_129_Contiguous_Azerbaijan",
    republic: "AZERBAIJAN",
    modernName: "Azerbaigian Metropolitano",
    historicalName: "RSS Azera (Baku \u2014 Distretto Petrolifero Primario dell'URSS e Caspio)",
    russianName: "Azerbaydzhanskaya SSR",
    adminTitle: "Sovet Narodnykh Komissarov Azerbajd\u017eanskoj SSR (Baku) \u2014 URSS",
    capital: "Baku",
    keys: ["adm1_aze_129_contiguous_azerbaijan", "azerbaigian", "azerbaydzhanskaya", "baku", "contiguous azerbaijan", "contiguous_azerbaijan", "metropolitano", "sov_adm1_aze_129_contiguous_azerbaijan"],
    notes: {
      s0: "Capitale petrolifera dell'URSS e regina del Mar Caspio; i giacimenti di Baku (Bibi-Ejbat, Suraxanı, Balaxanı) estraggono oltre 22 milioni di tonnellate di petrolio all'anno, pari a oltre il 75% dell'intera produzione sovietica di greggio! Il trust statale Azneft gestisce migliaia di torri di trivellazione a terra e le prime piattaforme marine nel Caspio, rifornendo le raffinerie e l'oleodotto transcontinentale Baku-Batumi.",
      s1: "Le purghe staliniane guidate dal sanguinario capo del partito Mir Džafar Bagirov decapitano l'intelligencija e i dirigenti di Azneft; centinaia di ingegneri petroliferi vengono accusati di sabotaggio per conto delle compagnie occidentali e giustiziati.",
      s2: "Potenziamento della flotta di petroliere della Caspian Shipping Company (KaspFlot) per il trasbordo continuo di greggio da Baku verso Astrachan' e il Volga.",
      s3_4: "Azneft mette a punto processi chimici avanzati per la produzione di benzina avio ad altissimo numero di ottani B-78, essenziale per i motori dei nuovi caccia sovietici.",
      s5: "Con il Patto Molotov-Ribbentrop, Baku rifornisce una quota primaria del milione di tonnellate di carburante che l'URSS esporta in Germania; la Gran Bretagna e la Francia pianificano segretamente l'Operazione Pike per bombardare i pozzi di Baku dal Medio Oriente e paralizzare sia l'URSS sia la Germania.",
      s6: "Nel giugno 1940, dopo il crollo della Francia, la minaccia di attacchi aerei anglo-francesi su Baku decade; la città incrementa ulteriormente la raffinazione di oli lubrificanti pesanti.",
      s7: "Massicce esercitazioni di difesa contraerea (PVO) a Baku: installazione di batterie di cannoni da 85 mm e schermi fumogeni giganti per occultare le torri petrolifere da ricognizioni aeree.",
      s8: "Alla vigilia del 22 giugno 1941, Baku è l'obiettivo strategico numero uno di Hitler per l'Operazione Barbarossa: senza il petrolio di Baku, l'Armata Rossa e l'intera URSS collasserebbero in pochi mesi.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSS Azera (Baku — Distretto Petrolifero Primario dell'URSS e Caspio)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Azerbajdžanskoj SSR (Baku) — URSS",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_BLR_100_Gomel": {
    id: "SOV_ADM1_BLR_100_Gomel",
    republic: "BELARUS",
    modernName: "Oblast di Gomel'",
    historicalName: "Oblast di Gomel' (Polesie Orientale \u2014 Fiume So\u017e e Fabbrica Gomsel'ma\u0161)",
    russianName: "Gomel'skaya oblast",
    adminTitle: "Gomel'skij Oblispolkom \u2014 BSSR (URSS)",
    capital: "Gomel'",
    keys: ["adm1_blr_100_gomel", "gomel", "gomel'", "gomelskaya", "oblast", "sov_adm1_blr_100_gomel"],
    notes: {
      s0: "Principali centri industriali e fluviali della Bielorussia orientale; Gomel' ospita la grande fabbrica di macchinari agricoli Gomsel'maš sul fiume Sož; Vitebsk domina la Dvina Occidentale con storiche industrie tessili e calzaturiere; Mogilëv sul Dnepr ospita la mastodontica fabbrica di seta artificiale Šëlk e viene considerata come capitale di riserva dell'URSS.",
      s1: "Le purghe staliniane decimano i comitati provinciali del partito e i quadri tecnici di Gomsel'maš e delle industrie tessili di Vitebsk.",
      s2: "Ammodernamento degli snodi ferroviari e dei ponti sul Dnepr e sulla Dvina per garantire il transito celere delle riserve del Distretto Militare Occidentale.",
      s3_4: "Gomsel'maš riconverte parzialmente le linee di montaggio alla produzione di casse per mine e vagoncini per l'artiglieria campale.",
      s5: "Nel settembre 1939 queste regioni garantiscono i collegamenti logistici e ferroviari per l'Armata Rossa impegnata nell'occupazione della Polonia orientale.",
      s6: "Le tre città accolgono nuove guarnigioni e scuole militari d'addestramento per carristi, pontieri e comunicatori dell'esercito sovietico.",
      s7: "Allestimento di magazzini e riserve di viveri a Mogilëv, considerata punto nevralgico della ritirata difensiva sul Dnepr.",
      s8: "Alla vigilia di Barbarossa, l'asse Vitebsk-Mogilëv-Gomel' rappresenta la linea di supporto vitale alle spalle delle armate sovietiche schierate sulla frontiera bielorussa.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Gomel' (Polesie Orientale — Fiume Sož e Fabbrica Gomsel'maš)",
    getAdminTitle: (_step: number) => "Gomel'skij Oblispolkom — BSSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_BLR_101_Vitebsk": {
    id: "SOV_ADM1_BLR_101_Vitebsk",
    republic: "BELARUS",
    modernName: "Oblast di Vicebsk",
    historicalName: "Oblast di Vitebsk (Polotsk \u2014 Fiume Dvina Occidentale)",
    russianName: "Vitebskaya oblast",
    adminTitle: "Vitebskij Oblispolkom \u2014 BSSR (URSS)",
    capital: "Vitebsk",
    keys: ["adm1_blr_101_vitebsk", "oblast", "sov_adm1_blr_101_vitebsk", "vicebsk", "vitebsk", "vitebskaya"],
    notes: {
      s0: "Principali centri industriali e fluviali della Bielorussia orientale; Gomel' ospita la grande fabbrica di macchinari agricoli Gomsel'maš sul fiume Sož; Vitebsk domina la Dvina Occidentale con storiche industrie tessili e calzaturiere; Mogilëv sul Dnepr ospita la mastodontica fabbrica di seta artificiale Šëlk e viene considerata come capitale di riserva dell'URSS.",
      s1: "Le purghe staliniane decimano i comitati provinciali del partito e i quadri tecnici di Gomsel'maš e delle industrie tessili di Vitebsk.",
      s2: "Ammodernamento degli snodi ferroviari e dei ponti sul Dnepr e sulla Dvina per garantire il transito celere delle riserve del Distretto Militare Occidentale.",
      s3_4: "Gomsel'maš riconverte parzialmente le linee di montaggio alla produzione di casse per mine e vagoncini per l'artiglieria campale.",
      s5: "Nel settembre 1939 queste regioni garantiscono i collegamenti logistici e ferroviari per l'Armata Rossa impegnata nell'occupazione della Polonia orientale.",
      s6: "Le tre città accolgono nuove guarnigioni e scuole militari d'addestramento per carristi, pontieri e comunicatori dell'esercito sovietico.",
      s7: "Allestimento di magazzini e riserve di viveri a Mogilëv, considerata punto nevralgico della ritirata difensiva sul Dnepr.",
      s8: "Alla vigilia di Barbarossa, l'asse Vitebsk-Mogilëv-Gomel' rappresenta la linea di supporto vitale alle spalle delle armate sovietiche schierate sulla frontiera bielorussa.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Vitebsk (Polotsk — Fiume Dvina Occidentale)",
    getAdminTitle: (_step: number) => "Vitebskij Oblispolkom — BSSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_BLR_102_Mogilev": {
    id: "SOV_ADM1_BLR_102_Mogilev",
    republic: "BELARUS",
    modernName: "Oblast di Mahil\u00eb\u016d",
    historicalName: "Oblast di Mogil\u00ebv (Fiume Dnepr \u2014 Fabbrica di Seta Artificiale)",
    russianName: "Mogilevskaya oblast",
    adminTitle: "Mogilevskij Oblispolkom \u2014 BSSR (URSS)",
    capital: "Mogil\u00ebv",
    keys: ["adm1_blr_102_mogilev", "mahil", "mogilev", "mogilevskaya", "mogilv", "mogilëv", "oblast", "sov_adm1_blr_102_mogilev"],
    notes: {
      s0: "Principali centri industriali e fluviali della Bielorussia orientale; Gomel' ospita la grande fabbrica di macchinari agricoli Gomsel'maš sul fiume Sož; Vitebsk domina la Dvina Occidentale con storiche industrie tessili e calzaturiere; Mogilëv sul Dnepr ospita la mastodontica fabbrica di seta artificiale Šëlk e viene considerata come capitale di riserva dell'URSS.",
      s1: "Le purghe staliniane decimano i comitati provinciali del partito e i quadri tecnici di Gomsel'maš e delle industrie tessili di Vitebsk.",
      s2: "Ammodernamento degli snodi ferroviari e dei ponti sul Dnepr e sulla Dvina per garantire il transito celere delle riserve del Distretto Militare Occidentale.",
      s3_4: "Gomsel'maš riconverte parzialmente le linee di montaggio alla produzione di casse per mine e vagoncini per l'artiglieria campale.",
      s5: "Nel settembre 1939 queste regioni garantiscono i collegamenti logistici e ferroviari per l'Armata Rossa impegnata nell'occupazione della Polonia orientale.",
      s6: "Le tre città accolgono nuove guarnigioni e scuole militari d'addestramento per carristi, pontieri e comunicatori dell'esercito sovietico.",
      s7: "Allestimento di magazzini e riserve di viveri a Mogilëv, considerata punto nevralgico della ritirata difensiva sul Dnepr.",
      s8: "Alla vigilia di Barbarossa, l'asse Vitebsk-Mogilëv-Gomel' rappresenta la linea di supporto vitale alle spalle delle armate sovietiche schierate sulla frontiera bielorussa.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Mogilëv (Fiume Dnepr — Fabbrica di Seta Artificiale)",
    getAdminTitle: (_step: number) => "Mogilevskij Oblispolkom — BSSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_BLR_103_Minsk": {
    id: "SOV_ADM1_BLR_103_Minsk",
    republic: "BELARUS",
    modernName: "Minsk (Citt\u00e0 Capitale)",
    historicalName: "Minsk (Capitale della RSS Bielorussa \u2014 Fiume Svisla\u010d)",
    russianName: "Gorod Minsk",
    adminTitle: "Minskij Gorsovet & Distretto Militare Occidentale (ZAPOVO) \u2014 BSSR (URSS)",
    capital: "Minsk",
    keys: ["adm1_blr_103_minsk", "capitale", "gorod", "minsk", "sov_adm1_blr_103_minsk"],
    notes: {
      s0: "Capitale della Repubblica Socialista Sovietica Bielorussa sul fiume Svislač; sede del governo repubblicano e del Quartier Generale del Distretto Militare Bielorusso (BVO); nel 1936 viene approvata la Costituzione della BSSR e inaugurata la monumentale Casa del Governo sulla piazza Lenin. La città dista appena 35 chilometri dalla frontiera polacca (posto di frontiera di Zaslavl').",
      s1: "Le Grandi Purghe dell'NKVD infuriano a Minsk: nelle fosse comuni della foresta di Kurapaty vengono fucilati segretamente oltre 30.000 cittadini, scrittori, accademici e comunisti polacchi e bielorussi; il comandante del distretto Ieronim Uborevič viene arrestato ed eliminato a Mosca.",
      s2: "Il comando del BVO viene riorganizzato sotto la guida del generale Dmitrij Pavlov; accelerazione dei lavori di fortificazione del Settore Fortificato di Minsk (MiUR) lungo il vecchio confine.",
      s3_4: "Minsk intensifica le manovre campali: le officine ferroviarie e le fabbriche chimiche cittadine vengono convertite all'assemblaggio di spolette e parti di ricambio militari.",
      s5: "Il 17 settembre 1939 Minsk è la base di comando per l'invasione della Bielorussia occidentale polacca (Białystok, Grodno, Brest, Pinsk). Nel novembre 1939 il Soviet Supremo di Minsk vota l'annessione formale di questi territori, raddoppiando l'estensione della repubblica e allontanando la frontiera fino al fiume Bug.",
      s6: "Nel 1940 Minsk sovrintende all'integrazione economica e all'epurazione dei proprietari terrieri e dei funzionari polacchi nei nuovi territori occidentali; il BVO viene ribattezzato Distretto Militare Speciale Occidentale (ZapOVO).",
      s7: "Pavlov e lo stato maggiore di Minsk completano i piani per la difesa della nuova Linea Molotov lungo il Bug, ma i ritardi nelle forniture e le carenze di munizioni lasciano le divisioni esposte a manovre d'accerchiamento.",
      s8: "Alla vigilia del 22 giugno 1941, Minsk è all'oscuro della trappola strategica che la travolgerà: entro soli sei giorni dall'attacco tedesco i panzer di Guderian e Hoth chiuderanno la gigantesca sacca di Minsk-Białystok, radendo al suolo la città.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Minsk (Capitale della RSS Bielorussa — Fiume Svislač)",
    getAdminTitle: (_step: number) => "Minskij Gorsovet & Distretto Militare Occidentale (ZAPOVO) — BSSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_GEO_105_Abkhazia": {
    id: "SOV_ADM1_GEO_105_Abkhazia",
    republic: "GEORGIA",
    modernName: "Repubblica di Abcasia",
    historicalName: "RSSA Abkhaza (Suchumi \u2014 Riviera Subtropicale del Mar Nero)",
    russianName: "Abkhazskaya ASSR \u2014 Gruzinskaya SSR",
    adminTitle: "Sovet Narodnykh Komissarov Abkhazskoj ASSR \u2014 RSS Georgiana (URSS)",
    capital: "Suchumi",
    keys: ["abcasia", "abkhazia", "abkhazskaya", "adm1_geo_105_abkhazia", "gruzinskaya", "repubblica", "sov_adm1_geo_105_abkhazia", "suchumi"],
    notes: {
      s0: "Perle litoranee della Georgia sul Mar Nero; Batumi in Agiaria è il terminale marittimo dell'oleodotto transcontinentale proveniente da Baku con enormi raffinerie e moli per petroliere; Suchumi in Abcasia è la capitale della riviera subtropicale sovietica, ricca di sanatori d'élite, piantagioni di mandarini, tabacco Samsun e stazioni botaniche.",
      s1: "Dure repressioni dell'NKVD contro le aristocrazie storiche e i commercianti abkhazi e agiari musulmani; stretta sorveglianza sulla frontiera turca a Sarpi.",
      s2: "I porti di Batumi e Poti accolgono navi cisterna oceaniche e ospitano flottiglie di guardacoste e cacciasommergibili della Flotta del Mar Nero.",
      s3_4: "Ampliamento delle capacità di stoccaggio delle cisterne petrolifere costiere di Batumi, collegate via ferrovia elettrificata a Tbilisi.",
      s5: "Durante l'allarme per l'Operazione Pike anglo-francese nel 1940, Batumi allestisce potenti sbarramenti fumogeni e postazioni di contraerea attorno ai moli petroliferi.",
      s6: "Suchumi e la costa abkhaza vengono designate come zone di riposo e convalescenza per i piloti e i comandanti dell'Armata Rossa.",
      s7: "Rafforzamento delle difese costiere e posa di campi minati marini nelle acque prospicienti Batumi per impedire blitz navali dalla Turchia.",
      s8: "Batumi e Suchumi proteggono lo sbocco marittimo dell'oro nero sovietico e la frontiera caucasica del Mar Nero alla vigilia del conflitto.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSSA Abkhaza (Suchumi — Riviera Subtropicale del Mar Nero)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Abkhazskoj ASSR — RSS Georgiana (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_GEO_106_Kakheti": {
    id: "SOV_ADM1_GEO_106_Kakheti",
    republic: "GEORGIA",
    modernName: "Cachezia (Kakheti)",
    historicalName: "Kakheti (Valle dell'Alazani \u2014 Vigneti e Vini della Georgia)",
    russianName: "Kakh\u00e9tinskij rajon \u2014 Gruzinskaya SSR",
    adminTitle: "Kachetskij Ispolkom \u2014 RSS Georgiana (URSS)",
    capital: "Telavi",
    keys: ["adm1_geo_106_kakheti", "cachezia", "gruzinskaya", "kakheti", "kakhtinskij", "rajon", "sov_adm1_geo_106_kakheti", "telavi"],
    notes: {
      s0: "Cuore storico, agricolo e minerario della Georgia; a Čiatura opera il più grande giacimento di manganese del mondo, minerale indispensabile per produrre acciai ad altissima resistenza per le corazze dei carri armati e i cannoni; a Gori sorge la casa natale di Iosif Stalin, trasformata nel 1937 in un sontuoso museo memoriale di stato; Kakheti e Imereti producono vini celebri, tè e agrumi.",
      s1: "Migliaia di minatori stachanovisti a Čiatura lavorano su turni forzati per estrarre oltre un milione di tonnellate di manganese all'anno per l'industria siderurgica dell'URSS; dure purghe tra i quadri minerari.",
      s2: "Il museo di Stalin a Gori diventa meta di pellegrinaggio ideologico obbligato per le delegazioni del Komsomol e dell'Armata Rossa da tutta l'URSS.",
      s3_4: "Il manganese di Čiatura alimenta direttamente le fonderie di Uralmaš, Magnitogorsk e Zaporostal', garantendo l'elasticità dell'acciaio delle blindature sovietiche.",
      s5: "Durante la guerra europea la Georgia garantisce all'URSS l'indipendenza mineraria assoluta per il manganese, materiale ricercato disperatamente anche dall'industria bellica tedesca.",
      s6: "Ampliamento delle ferrovie a scartamento ridotto nelle gole montane di Čiatura per accelerare il carico sui vagoni verso i porti del Mar Nero.",
      s7: "Sviluppo di stabilimenti di meccanica agraria e manifatturiera a Kutaisi a supporto del fronte transcaucasico.",
      s8: "Le valli e le miniere georgiane garantiscono le materie prime insostituibili per l'acciaio corazzato dei futuri carri armati della vittoria sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Kakheti (Valle dell'Alazani — Vigneti e Vini della Georgia)",
    getAdminTitle: (_step: number) => "Kachetskij Ispolkom — RSS Georgiana (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_GEO_107_Kvemo_Kartli": {
    id: "SOV_ADM1_GEO_107_Kvemo_Kartli",
    republic: "GEORGIA",
    modernName: "Bassa Cartalia (Kvemo Kartli)",
    historicalName: "Kvemo Kartli (Bassa Cartalia \u2014 Fiume Kura e Rustavi)",
    russianName: "Kvemo-Kartlijskij rajon \u2014 Gruzinskaya SSR",
    adminTitle: "Kvemo-Kartlijskij Ispolkom \u2014 RSS Georgiana (URSS)",
    capital: "Rustavi",
    keys: ["adm1_geo_107_kvemo_kartli", "bassa", "cartalia", "gruzinskaya", "kartli", "kvemo", "kvemo kartli", "kvemo_kartli", "kvemokartlijskij", "rajon", "rustavi", "sov_adm1_geo_107_kvemo_kartli"],
    notes: {
      s0: "Cuore storico, agricolo e minerario della Georgia; a Čiatura opera il più grande giacimento di manganese del mondo, minerale indispensabile per produrre acciai ad altissima resistenza per le corazze dei carri armati e i cannoni; a Gori sorge la casa natale di Iosif Stalin, trasformata nel 1937 in un sontuoso museo memoriale di stato; Kakheti e Imereti producono vini celebri, tè e agrumi.",
      s1: "Migliaia di minatori stachanovisti a Čiatura lavorano su turni forzati per estrarre oltre un milione di tonnellate di manganese all'anno per l'industria siderurgica dell'URSS; dure purghe tra i quadri minerari.",
      s2: "Il museo di Stalin a Gori diventa meta di pellegrinaggio ideologico obbligato per le delegazioni del Komsomol e dell'Armata Rossa da tutta l'URSS.",
      s3_4: "Il manganese di Čiatura alimenta direttamente le fonderie di Uralmaš, Magnitogorsk e Zaporostal', garantendo l'elasticità dell'acciaio delle blindature sovietiche.",
      s5: "Durante la guerra europea la Georgia garantisce all'URSS l'indipendenza mineraria assoluta per il manganese, materiale ricercato disperatamente anche dall'industria bellica tedesca.",
      s6: "Ampliamento delle ferrovie a scartamento ridotto nelle gole montane di Čiatura per accelerare il carico sui vagoni verso i porti del Mar Nero.",
      s7: "Sviluppo di stabilimenti di meccanica agraria e manifatturiera a Kutaisi a supporto del fronte transcaucasico.",
      s8: "Le valli e le miniere georgiane garantiscono le materie prime insostituibili per l'acciaio corazzato dei futuri carri armati della vittoria sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Kvemo Kartli (Bassa Cartalia — Fiume Kura e Rustavi)",
    getAdminTitle: (_step: number) => "Kvemo-Kartlijskij Ispolkom — RSS Georgiana (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_GEO_108_Tbilisi": {
    id: "SOV_ADM1_GEO_108_Tbilisi",
    republic: "GEORGIA",
    modernName: "Tbilisi (Citt\u00e0 Capitale)",
    historicalName: "Tbilisi (Tiflis \u2014 Capitale della Georgia e della Transcaucasia)",
    russianName: "Gorod Tbilisi (Tiflis)",
    adminTitle: "Tbilisskij Gorsovet & Distretto Militare Transcaucasico (ZakVO) \u2014 RSS Georgiana (URSS)",
    capital: "Tbilisi",
    keys: ["adm1_geo_108_tbilisi", "capitale", "gorod", "sov_adm1_geo_108_tbilisi", "tbilisi", "tiflis"],
    notes: {
      s0: "Storica capitale della Georgia e metropoli culturale della Transcaucasia sulle rive del fiume Kura; fino al dicembre 1936 sede della Repubblica Federale Transcaucasica (ZSFSR), poi sciolta con la Costituzione del 1936 che eleva la Georgia a Repubblica Socialista Sovietica autonoma; sede del Quartier Generale del Distretto Militare Transcaucasico (ZakVO) e del potente leader bolscevico Lavrentij Berija.",
      s1: "Lavrentij Berija conduce purghe spietate in Georgia eliminando scrittori, intellettuali e veterani bolscevichi; nel 1938 Berija viene chiamato a Mosca da Stalin per assumere la guida onnipotente dell'NKVD dell'intera Unione Sovietica al posto di Ežov.",
      s2: "Tbilisi ospita grandi scuole militari e il comando aereo del Caucaso; la città si arricchisce di monumentali edifici neoclassici in stile staliniano lungo il viale Rustaveli.",
      s3_4: "Potenziamento delle officine ferroviarie Lenin e della produzione di macchinari per la lavorazione del tabacco, del vino e della seta.",
      s5: "Durante la tensione internazionale per i possibili bombardamenti anglo-francesi sui pozzi petroliferi, il comando di Tbilisi allerta le divisioni di frontiera con la Turchia e l'Iran.",
      s6: "Tbilisi coordina la militarizzazione del Caucaso meridionale e la sorveglianza contro infiltrazioni di agenti stranieri lungo le frontiere transcaucasiche.",
      s7: "Viene avviata la costruzione del gigantesco stabilimento aeronautico n. 31 a Tbilisi per la produzione di caccia LaGG-3, sfruttando legnami speciali della Georgia.",
      s8: "Alla vigilia della guerra, Tbilisi è il centro nevralgico della sicurezza e della mobilitazione della Transcaucasia sovietica a guardia della frontiera meridionale dell'URSS.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Tbilisi (Tiflis — Capitale della Georgia e della Transcaucasia)",
    getAdminTitle: (_step: number) => "Tbilisskij Gorsovet & Distretto Militare Transcaucasico (ZakVO) — RSS Georgiana (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_GEO_109_Mtskheta_Mtianeti": {
    id: "SOV_ADM1_GEO_109_Mtskheta_Mtianeti",
    republic: "GEORGIA",
    modernName: "Mtskheta-Mtianeti",
    historicalName: "Mtskheta-Mtianeti (Strada Militare Georgiana \u2014 Monte Kazbek)",
    russianName: "Mckheta-Mtianetskij rajon \u2014 Gruzinskaya SSR",
    adminTitle: "Mcchetskij Ispolkom \u2014 RSS Georgiana (URSS)",
    capital: "Mtskheta",
    keys: ["adm1_geo_109_mtskheta_mtianeti", "gruzinskaya", "mckhetamtianetskij", "mtskheta", "mtskheta mtianeti", "mtskheta_mtianeti", "mtskhetamtianeti", "rajon", "sov_adm1_geo_109_mtskheta_mtianeti"],
    notes: {
      s0: "Cuore storico, agricolo e minerario della Georgia; a Čiatura opera il più grande giacimento di manganese del mondo, minerale indispensabile per produrre acciai ad altissima resistenza per le corazze dei carri armati e i cannoni; a Gori sorge la casa natale di Iosif Stalin, trasformata nel 1937 in un sontuoso museo memoriale di stato; Kakheti e Imereti producono vini celebri, tè e agrumi.",
      s1: "Migliaia di minatori stachanovisti a Čiatura lavorano su turni forzati per estrarre oltre un milione di tonnellate di manganese all'anno per l'industria siderurgica dell'URSS; dure purghe tra i quadri minerari.",
      s2: "Il museo di Stalin a Gori diventa meta di pellegrinaggio ideologico obbligato per le delegazioni del Komsomol e dell'Armata Rossa da tutta l'URSS.",
      s3_4: "Il manganese di Čiatura alimenta direttamente le fonderie di Uralmaš, Magnitogorsk e Zaporostal', garantendo l'elasticità dell'acciaio delle blindature sovietiche.",
      s5: "Durante la guerra europea la Georgia garantisce all'URSS l'indipendenza mineraria assoluta per il manganese, materiale ricercato disperatamente anche dall'industria bellica tedesca.",
      s6: "Ampliamento delle ferrovie a scartamento ridotto nelle gole montane di Čiatura per accelerare il carico sui vagoni verso i porti del Mar Nero.",
      s7: "Sviluppo di stabilimenti di meccanica agraria e manifatturiera a Kutaisi a supporto del fronte transcaucasico.",
      s8: "Le valli e le miniere georgiane garantiscono le materie prime insostituibili per l'acciaio corazzato dei futuri carri armati della vittoria sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Mtskheta-Mtianeti (Strada Militare Georgiana — Monte Kazbek)",
    getAdminTitle: (_step: number) => "Mcchetskij Ispolkom — RSS Georgiana (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_GEO_110_Samtskhe_Javakheti": {
    id: "SOV_ADM1_GEO_110_Samtskhe_Javakheti",
    republic: "GEORGIA",
    modernName: "Samtskhe-Javakheti",
    historicalName: "Samtskhe-Javakheti (Acque Minerali di Bor\u017eomi e Fortezza di Akhaltsikhe)",
    russianName: "Samckhe-D\u017eavakhetskij rajon \u2014 Gruzinskaya SSR",
    adminTitle: "Samcche-D\u017eavachetskij Ispolkom \u2014 RSS Georgiana (URSS)",
    capital: "Akhaltsikhe",
    keys: ["adm1_geo_110_samtskhe_javakheti", "akhaltsikhe", "gruzinskaya", "rajon", "samckhedavakhetskij", "samtskhe javakheti", "samtskhe_javakheti", "samtskhejavakheti", "sov_adm1_geo_110_samtskhe_javakheti"],
    notes: {
      s0: "Cuore storico, agricolo e minerario della Georgia; a Čiatura opera il più grande giacimento di manganese del mondo, minerale indispensabile per produrre acciai ad altissima resistenza per le corazze dei carri armati e i cannoni; a Gori sorge la casa natale di Iosif Stalin, trasformata nel 1937 in un sontuoso museo memoriale di stato; Kakheti e Imereti producono vini celebri, tè e agrumi.",
      s1: "Migliaia di minatori stachanovisti a Čiatura lavorano su turni forzati per estrarre oltre un milione di tonnellate di manganese all'anno per l'industria siderurgica dell'URSS; dure purghe tra i quadri minerari.",
      s2: "Il museo di Stalin a Gori diventa meta di pellegrinaggio ideologico obbligato per le delegazioni del Komsomol e dell'Armata Rossa da tutta l'URSS.",
      s3_4: "Il manganese di Čiatura alimenta direttamente le fonderie di Uralmaš, Magnitogorsk e Zaporostal', garantendo l'elasticità dell'acciaio delle blindature sovietiche.",
      s5: "Durante la guerra europea la Georgia garantisce all'URSS l'indipendenza mineraria assoluta per il manganese, materiale ricercato disperatamente anche dall'industria bellica tedesca.",
      s6: "Ampliamento delle ferrovie a scartamento ridotto nelle gole montane di Čiatura per accelerare il carico sui vagoni verso i porti del Mar Nero.",
      s7: "Sviluppo di stabilimenti di meccanica agraria e manifatturiera a Kutaisi a supporto del fronte transcaucasico.",
      s8: "Le valli e le miniere georgiane garantiscono le materie prime insostituibili per l'acciaio corazzato dei futuri carri armati della vittoria sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Samtskhe-Javakheti (Acque Minerali di Boržomi e Fortezza di Akhaltsikhe)",
    getAdminTitle: (_step: number) => "Samcche-Džavachetskij Ispolkom — RSS Georgiana (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_GEO_111_Adjara": {
    id: "SOV_ADM1_GEO_111_Adjara",
    republic: "GEORGIA",
    modernName: "Repubblica Autonoma di Agiaria",
    historicalName: "RSSA Agiara (Batumi \u2014 Terminal Petrolifero di Baku sul Mar Nero)",
    russianName: "Adzharskaya ASSR \u2014 Gruzinskaya SSR",
    adminTitle: "Sovet Narodnykh Komissarov Ad\u017earskoj ASSR \u2014 RSS Georgiana (URSS)",
    capital: "Batumi",
    keys: ["adjara", "adm1_geo_111_adjara", "adzharskaya", "agiaria", "autonoma", "batumi", "gruzinskaya", "repubblica", "sov_adm1_geo_111_adjara"],
    notes: {
      s0: "Perle litoranee della Georgia sul Mar Nero; Batumi in Agiaria è il terminale marittimo dell'oleodotto transcontinentale proveniente da Baku con enormi raffinerie e moli per petroliere; Suchumi in Abcasia è la capitale della riviera subtropicale sovietica, ricca di sanatori d'élite, piantagioni di mandarini, tabacco Samsun e stazioni botaniche.",
      s1: "Dure repressioni dell'NKVD contro le aristocrazie storiche e i commercianti abkhazi e agiari musulmani; stretta sorveglianza sulla frontiera turca a Sarpi.",
      s2: "I porti di Batumi e Poti accolgono navi cisterna oceaniche e ospitano flottiglie di guardacoste e cacciasommergibili della Flotta del Mar Nero.",
      s3_4: "Ampliamento delle capacità di stoccaggio delle cisterne petrolifere costiere di Batumi, collegate via ferrovia elettrificata a Tbilisi.",
      s5: "Durante l'allarme per l'Operazione Pike anglo-francese nel 1940, Batumi allestisce potenti sbarramenti fumogeni e postazioni di contraerea attorno ai moli petroliferi.",
      s6: "Suchumi e la costa abkhaza vengono designate come zone di riposo e convalescenza per i piloti e i comandanti dell'Armata Rossa.",
      s7: "Rafforzamento delle difese costiere e posa di campi minati marini nelle acque prospicienti Batumi per impedire blitz navali dalla Turchia.",
      s8: "Batumi e Suchumi proteggono lo sbocco marittimo dell'oro nero sovietico e la frontiera caucasica del Mar Nero alla vigilia del conflitto.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSSA Agiara (Batumi — Terminal Petrolifero di Baku sul Mar Nero)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Adžarskoj ASSR — RSS Georgiana (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_GEO_112_Guria": {
    id: "SOV_ADM1_GEO_112_Guria",
    republic: "GEORGIA",
    modernName: "Guria",
    historicalName: "Guria (Piantagioni di T\u00e8 di Ozurgeti \u2014 Mar Nero)",
    russianName: "Gurijskij rajon \u2014 Gruzinskaya SSR",
    adminTitle: "Gurijskij Ispolkom \u2014 RSS Georgiana (URSS)",
    capital: "Ozurgeti (Makharadze)",
    keys: ["adm1_geo_112_guria", "gruzinskaya", "guria", "gurijskij", "ozurgeti (makharadze)", "ozurgetimakharadze", "rajon", "sov_adm1_geo_112_guria"],
    notes: {
      s0: "Cuore storico, agricolo e minerario della Georgia; a Čiatura opera il più grande giacimento di manganese del mondo, minerale indispensabile per produrre acciai ad altissima resistenza per le corazze dei carri armati e i cannoni; a Gori sorge la casa natale di Iosif Stalin, trasformata nel 1937 in un sontuoso museo memoriale di stato; Kakheti e Imereti producono vini celebri, tè e agrumi.",
      s1: "Migliaia di minatori stachanovisti a Čiatura lavorano su turni forzati per estrarre oltre un milione di tonnellate di manganese all'anno per l'industria siderurgica dell'URSS; dure purghe tra i quadri minerari.",
      s2: "Il museo di Stalin a Gori diventa meta di pellegrinaggio ideologico obbligato per le delegazioni del Komsomol e dell'Armata Rossa da tutta l'URSS.",
      s3_4: "Il manganese di Čiatura alimenta direttamente le fonderie di Uralmaš, Magnitogorsk e Zaporostal', garantendo l'elasticità dell'acciaio delle blindature sovietiche.",
      s5: "Durante la guerra europea la Georgia garantisce all'URSS l'indipendenza mineraria assoluta per il manganese, materiale ricercato disperatamente anche dall'industria bellica tedesca.",
      s6: "Ampliamento delle ferrovie a scartamento ridotto nelle gole montane di Čiatura per accelerare il carico sui vagoni verso i porti del Mar Nero.",
      s7: "Sviluppo di stabilimenti di meccanica agraria e manifatturiera a Kutaisi a supporto del fronte transcaucasico.",
      s8: "Le valli e le miniere georgiane garantiscono le materie prime insostituibili per l'acciaio corazzato dei futuri carri armati della vittoria sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Guria (Piantagioni di Tè di Ozurgeti — Mar Nero)",
    getAdminTitle: (_step: number) => "Gurijskij Ispolkom — RSS Georgiana (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_GEO_113_Shida_Kartli": {
    id: "SOV_ADM1_GEO_113_Shida_Kartli",
    republic: "GEORGIA",
    modernName: "Cartalia Interna (Shida Kartli)",
    historicalName: "Shida Kartli (Gori \u2014 Citt\u00e0 Natale di Iosif Stalin)",
    russianName: "Gorijskij rajon \u2014 Gruzinskaya SSR",
    adminTitle: "Gorijskij Ispolkom \u2014 RSS Georgiana (URSS)",
    capital: "Gori",
    keys: ["adm1_geo_113_shida_kartli", "cartalia", "gori", "gorijskij", "gruzinskaya", "interna", "kartli", "rajon", "shida", "shida kartli", "shida_kartli", "sov_adm1_geo_113_shida_kartli"],
    notes: {
      s0: "Cuore storico, agricolo e minerario della Georgia; a Čiatura opera il più grande giacimento di manganese del mondo, minerale indispensabile per produrre acciai ad altissima resistenza per le corazze dei carri armati e i cannoni; a Gori sorge la casa natale di Iosif Stalin, trasformata nel 1937 in un sontuoso museo memoriale di stato; Kakheti e Imereti producono vini celebri, tè e agrumi.",
      s1: "Migliaia di minatori stachanovisti a Čiatura lavorano su turni forzati per estrarre oltre un milione di tonnellate di manganese all'anno per l'industria siderurgica dell'URSS; dure purghe tra i quadri minerari.",
      s2: "Il museo di Stalin a Gori diventa meta di pellegrinaggio ideologico obbligato per le delegazioni del Komsomol e dell'Armata Rossa da tutta l'URSS.",
      s3_4: "Il manganese di Čiatura alimenta direttamente le fonderie di Uralmaš, Magnitogorsk e Zaporostal', garantendo l'elasticità dell'acciaio delle blindature sovietiche.",
      s5: "Durante la guerra europea la Georgia garantisce all'URSS l'indipendenza mineraria assoluta per il manganese, materiale ricercato disperatamente anche dall'industria bellica tedesca.",
      s6: "Ampliamento delle ferrovie a scartamento ridotto nelle gole montane di Čiatura per accelerare il carico sui vagoni verso i porti del Mar Nero.",
      s7: "Sviluppo di stabilimenti di meccanica agraria e manifatturiera a Kutaisi a supporto del fronte transcaucasico.",
      s8: "Le valli e le miniere georgiane garantiscono le materie prime insostituibili per l'acciaio corazzato dei futuri carri armati della vittoria sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Shida Kartli (Gori — Città Natale di Iosif Stalin)",
    getAdminTitle: (_step: number) => "Gorijskij Ispolkom — RSS Georgiana (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_GEO_114_Imereti": {
    id: "SOV_ADM1_GEO_114_Imereti",
    republic: "GEORGIA",
    modernName: "Imereti",
    historicalName: "Imereti (Kutaisi \u2014 Miniere di Manganese di \u010ciatura)",
    russianName: "Kutaisskij rajon \u2014 Gruzinskaya SSR",
    adminTitle: "Kutaisskij Ispolkom & Chiaturnye rudniki \u2014 RSS Georgiana (URSS)",
    capital: "Kutaisi",
    keys: ["adm1_geo_114_imereti", "gruzinskaya", "imereti", "kutaisi", "kutaisskij", "rajon", "sov_adm1_geo_114_imereti"],
    notes: {
      s0: "Cuore storico, agricolo e minerario della Georgia; a Čiatura opera il più grande giacimento di manganese del mondo, minerale indispensabile per produrre acciai ad altissima resistenza per le corazze dei carri armati e i cannoni; a Gori sorge la casa natale di Iosif Stalin, trasformata nel 1937 in un sontuoso museo memoriale di stato; Kakheti e Imereti producono vini celebri, tè e agrumi.",
      s1: "Migliaia di minatori stachanovisti a Čiatura lavorano su turni forzati per estrarre oltre un milione di tonnellate di manganese all'anno per l'industria siderurgica dell'URSS; dure purghe tra i quadri minerari.",
      s2: "Il museo di Stalin a Gori diventa meta di pellegrinaggio ideologico obbligato per le delegazioni del Komsomol e dell'Armata Rossa da tutta l'URSS.",
      s3_4: "Il manganese di Čiatura alimenta direttamente le fonderie di Uralmaš, Magnitogorsk e Zaporostal', garantendo l'elasticità dell'acciaio delle blindature sovietiche.",
      s5: "Durante la guerra europea la Georgia garantisce all'URSS l'indipendenza mineraria assoluta per il manganese, materiale ricercato disperatamente anche dall'industria bellica tedesca.",
      s6: "Ampliamento delle ferrovie a scartamento ridotto nelle gole montane di Čiatura per accelerare il carico sui vagoni verso i porti del Mar Nero.",
      s7: "Sviluppo di stabilimenti di meccanica agraria e manifatturiera a Kutaisi a supporto del fronte transcaucasico.",
      s8: "Le valli e le miniere georgiane garantiscono le materie prime insostituibili per l'acciaio corazzato dei futuri carri armati della vittoria sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Imereti (Kutaisi — Miniere di Manganese di Čiatura)",
    getAdminTitle: (_step: number) => "Kutaisskij Ispolkom & Chiaturnye rudniki — RSS Georgiana (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_GEO_115_Racha_Lechkhumi_and_Kvemo_Svaneti": {
    id: "SOV_ADM1_GEO_115_Racha_Lechkhumi_and_Kvemo_Svaneti",
    republic: "GEORGIA",
    modernName: "Racha-Lechkhumi e Kvemo Svaneti",
    historicalName: "Racha-Lechkhumi e Bassa Svanezia (Fiume Rioni e Miniere di Arsenico)",
    russianName: "Ra\u010da-Le\u010dkhumskij rajon \u2014 Gruzinskaya SSR",
    adminTitle: "Ra\u010dinskij Ispolkom \u2014 RSS Georgiana (URSS)",
    capital: "Ambrolauri",
    keys: ["adm1_geo_115_racha_lechkhumi_and_kvemo_svaneti", "ambrolauri", "gruzinskaya", "kvemo", "raalekhumskij", "racha lechkhumi and kvemo svaneti", "racha_lechkhumi_and_kvemo_svaneti", "rachalechkhumi", "rajon", "sov_adm1_geo_115_racha_lechkhumi_and_kvemo_svaneti", "svaneti"],
    notes: {
      s0: "Cuore storico, agricolo e minerario della Georgia; a Čiatura opera il più grande giacimento di manganese del mondo, minerale indispensabile per produrre acciai ad altissima resistenza per le corazze dei carri armati e i cannoni; a Gori sorge la casa natale di Iosif Stalin, trasformata nel 1937 in un sontuoso museo memoriale di stato; Kakheti e Imereti producono vini celebri, tè e agrumi.",
      s1: "Migliaia di minatori stachanovisti a Čiatura lavorano su turni forzati per estrarre oltre un milione di tonnellate di manganese all'anno per l'industria siderurgica dell'URSS; dure purghe tra i quadri minerari.",
      s2: "Il museo di Stalin a Gori diventa meta di pellegrinaggio ideologico obbligato per le delegazioni del Komsomol e dell'Armata Rossa da tutta l'URSS.",
      s3_4: "Il manganese di Čiatura alimenta direttamente le fonderie di Uralmaš, Magnitogorsk e Zaporostal', garantendo l'elasticità dell'acciaio delle blindature sovietiche.",
      s5: "Durante la guerra europea la Georgia garantisce all'URSS l'indipendenza mineraria assoluta per il manganese, materiale ricercato disperatamente anche dall'industria bellica tedesca.",
      s6: "Ampliamento delle ferrovie a scartamento ridotto nelle gole montane di Čiatura per accelerare il carico sui vagoni verso i porti del Mar Nero.",
      s7: "Sviluppo di stabilimenti di meccanica agraria e manifatturiera a Kutaisi a supporto del fronte transcaucasico.",
      s8: "Le valli e le miniere georgiane garantiscono le materie prime insostituibili per l'acciaio corazzato dei futuri carri armati della vittoria sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Racha-Lechkhumi e Bassa Svanezia (Fiume Rioni e Miniere di Arsenico)",
    getAdminTitle: (_step: number) => "Račinskij Ispolkom — RSS Georgiana (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_GEO_116_Samegrelo_Zemo_Svaneti": {
    id: "SOV_ADM1_GEO_116_Samegrelo_Zemo_Svaneti",
    republic: "GEORGIA",
    modernName: "Samegrelo e Zemo Svaneti",
    historicalName: "Samegrelo e Alta Svanezia (Zugdidi \u2014 Torri di Mestia e Paludi della Colchide)",
    russianName: "Megrel'skij rajon \u2014 Gruzinskaya SSR",
    adminTitle: "Zugdidskij Ispolkom \u2014 RSS Georgiana (URSS)",
    capital: "Zugdidi",
    keys: ["adm1_geo_116_samegrelo_zemo_svaneti", "gruzinskaya", "megrelskij", "rajon", "samegrelo", "samegrelo zemo svaneti", "samegrelo_zemo_svaneti", "sov_adm1_geo_116_samegrelo_zemo_svaneti", "svaneti", "zugdidi"],
    notes: {
      s0: "Cuore storico, agricolo e minerario della Georgia; a Čiatura opera il più grande giacimento di manganese del mondo, minerale indispensabile per produrre acciai ad altissima resistenza per le corazze dei carri armati e i cannoni; a Gori sorge la casa natale di Iosif Stalin, trasformata nel 1937 in un sontuoso museo memoriale di stato; Kakheti e Imereti producono vini celebri, tè e agrumi.",
      s1: "Migliaia di minatori stachanovisti a Čiatura lavorano su turni forzati per estrarre oltre un milione di tonnellate di manganese all'anno per l'industria siderurgica dell'URSS; dure purghe tra i quadri minerari.",
      s2: "Il museo di Stalin a Gori diventa meta di pellegrinaggio ideologico obbligato per le delegazioni del Komsomol e dell'Armata Rossa da tutta l'URSS.",
      s3_4: "Il manganese di Čiatura alimenta direttamente le fonderie di Uralmaš, Magnitogorsk e Zaporostal', garantendo l'elasticità dell'acciaio delle blindature sovietiche.",
      s5: "Durante la guerra europea la Georgia garantisce all'URSS l'indipendenza mineraria assoluta per il manganese, materiale ricercato disperatamente anche dall'industria bellica tedesca.",
      s6: "Ampliamento delle ferrovie a scartamento ridotto nelle gole montane di Čiatura per accelerare il carico sui vagoni verso i porti del Mar Nero.",
      s7: "Sviluppo di stabilimenti di meccanica agraria e manifatturiera a Kutaisi a supporto del fronte transcaucasico.",
      s8: "Le valli e le miniere georgiane garantiscono le materie prime insostituibili per l'acciaio corazzato dei futuri carri armati della vittoria sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Samegrelo e Alta Svanezia (Zugdidi — Torri di Mestia e Paludi della Colchide)",
    getAdminTitle: (_step: number) => "Zugdidskij Ispolkom — RSS Georgiana (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KAZ_130_Pavlodar_Region": {
    id: "SOV_ADM1_KAZ_130_Pavlodar_Region",
    republic: "RSS Kazaka",
    modernName: "Regione di Pavlodar",
    historicalName: "Oblast di Pavlodar",
    russianName: "Pavlodarskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta Deputatov \u2014 Irtysh e Steppa Settentrionale",
    capital: "Pavlodar",
    keys: ["adm1_kaz_130_pavlodar_region", "oblast", "pavlodar", "pavlodar region", "pavlodar_region", "pavlodarskaja", "sov_adm1_kaz_130_pavlodar_region"],
    notes: {
      s0: "L'Oblast di Pavlodar, solcata dal grande corso del fiume Irtysh nella steppa settentrionale, viene integrata nel tessuto economico della nuova RSS Kazaka (costituita nel dicembre 1936). Polo strategico per l'estrazione di sale dai laghi, carbone e depositi alluvionali, nonché granaio cerealicolo della steppa.",
      s1: "Durante le purghe del 1938, l'apparato amministrativo di Pavlodar e le comunità di coloni subiscono severe indagini dell'NKVD volte a sradicare presunti elementi controrivoluzionari e sabotatori nelle forniture agricole destinate alla Siberia.",
      s2: "Nell'autunno 1938, i trasporti fluviali lungo l'Irtysh verso Omsk e i collegamenti ferroviari con la Siberia occidentale vengono potenziati per garantire il transito ininterrotto di risorse minerarie ed energetiche verso l'industria bellica sovietica.",
      s3_4: "Nella primavera 1939, mentre le tensioni con il Giappone sfociano nella battaglia di Chalchin Gol, l'Oblast di Pavlodar fornisce quote decisive di grano, bestiame e cavalli da traino per il Gruppo d'armate dell'Estremo Oriente.",
      s5: "Tra l'inverno 1939 e il 1940, in coincidenza con la Guerra d'Inverno e il Patto Molotov-Ribbentrop, la regione intensifica la produzione di farina, conserve di carne e carbone, operando come solida retrovia produttiva per le esigenze dell'Armata Rossa.",
      s6: "Nell'estate 1940, la pianificazione del Gosplan avvia la mappatura dei ricchi giacimenti di bauxite, carbone ed energia idroelettrica lungo l'Irtysh, ponendo le basi per la futura espansione dei complessi industriali pesanti della steppa.",
      s7: "Nel tardo 1940, con l'avvio della riorganizzazione bellica sovietica, Pavlodar viene inserita nelle rotte di evacuazione logistica d'emergenza designate per accogliere personale e stabilimenti industriali dalla Russia europea.",
      s8: "Nella primavera 1941, alla vigilia di Barbarossa, l'oblast si mobilita per la semina primaverile e l'arruolamento di riserve territoriali nei reggimenti di cavalleria e fanteria della steppa dell'Armata Rossa.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Pavlodar",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta Deputatov — Irtysh e Steppa Settentrionale",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KAZ_131_Jambyl_Region": {
    id: "SOV_ADM1_KAZ_131_Jambyl_Region",
    republic: "RSS Kazaka",
    modernName: "Regione di \u017dambyl",
    historicalName: "Oblast di D\u017eambul (Aulie-Ata)",
    russianName: "D\u017eambulskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Chimica dei Fosfati e Snodo Turksib",
    capital: "D\u017eambul",
    keys: ["adm1_kaz_131_jambyl_region", "ambyl", "dambul", "dambulskaja", "džambul", "jambyl region", "jambyl_region", "oblast", "sov_adm1_kaz_131_jambyl_region"],
    notes: {
      s0: "Storicamente nota come Aulie-Ata, la città viene ribattezzata Džambul nel 1936-1938 in onore del celebre akyn (bardo tradizionale kazako) Žambyl Žabaev. L'area costituisce un nodo cruciale della celebre ferrovia Turksib (Turkestano-Siberiana).",
      s1: "Nel 1938, l'NKVD conduce epurazioni capillari tra i funzionari del distretto e le cooperative di cotone e barbabietola da zucchero, mentre la propaganda sovietica esalta i poemi patriottici di Džambul Žabaev a sostegno del regime e dei processi di Mosca.",
      s2: "Nell'autunno 1938, il traffico ferroviario lungo la Turksib attraverso Džambul tocca volumi record, movimentando fertilizzanti, cotone e minerali tra l'Asia Centrale e le fonderie della Siberia.",
      s3_4: "Nella primavera 1939, viene accelerata l'esplorazione geologica dei giganteschi bacini di fosforite delle montagne di Karatau, destinati a trasformare la regione nel principale polo dell'industria agrochimica sovietica.",
      s5: "Tra il 1939 e l'inizio del 1940, la regione di Džambul rifornisce le divisioni sovietiche di cotone per divise militari, zuccheri e foraggio, mantenendo attiva la circolazione merci lungo la dorsale centroasiatica.",
      s6: "Nell'estate 1940, lo sviluppo dei canali di irrigazione derivati dal fiume Talas consente di espandere le colture industriali di barbabietola da zucchero e cotone, riducendo la dipendenza sovietica dalle importazioni estere.",
      s7: "Verso la fine del 1940, le officine ferroviarie di Džambul vengono adibite alla manutenzione rapida di locomotive pesanti e convogli blindati in previsione di una potenziale crisi internazionale su vasta scala.",
      s8: "Nell'aprile 1941, con il patto di neutralità sovietico-giapponese, la sicurezza della rotta della Turksib appare consolidata, consentendo di concentrare la mobilitazione di Džambul sul supporto logistico ai distretti occidentali dell'Unione.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Džambul (Aulie-Ata)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Chimica dei Fosfati e Snodo Turksib",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KAZ_132_Kostanay_Region": {
    id: "SOV_ADM1_KAZ_132_Kostanay_Region",
    republic: "RSS Kazaka",
    modernName: "Regione di Kostanay",
    historicalName: "Oblast di Kustanaj",
    russianName: "Kustanajskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Terre Nere e Granaio della Steppa",
    capital: "Kustanaj",
    keys: ["adm1_kaz_132_kostanay_region", "kostanay", "kostanay region", "kostanay_region", "kustanaj", "kustanajskaja", "oblast", "sov_adm1_kaz_132_kostanay_region"],
    notes: {
      s0: "Istituita come entità autonoma nella RSS Kazaka, l'Oblast di Kustanaj rappresenta un'immensa estensione di suoli neri e steppa arabile lungo il fiume Tobol, collegata tramite ferrovia ai distretti siderurgici degli Urali meridionali.",
      s1: "Nel 1938, durante l'Ežovščina, le autorità di Kustanaj affrontano estese purghe nei sovcos cerealicoli, accusati di occultamento del grano e di legami con dissidenti contadini e kulaki esiliati negli anni della collettivizzazione forzata.",
      s2: "Nell'autunno 1938, la vicinanza strategica a Magnitogorsk e Čeljabinsk conferisce a Kustanaj un ruolo chiave come fornitore alimentare diretto degli operai dell'industria pesante bellica degli Urali.",
      s3_4: "Nel 1939, spedizioni geologiche dell'Accademia delle Scienze dell'URSS confermano la presenza di vastissimi depositi di minerale di ferro e bauxite nell'area di Sokolovsko-Sarbajskoe, che diverranno fondamentali per l'industria sovietica.",
      s5: "Durante l'inverno 1939-1940, mentre l'Armata Rossa combatte in Finlandia, Kustanaj invia migliaia di tonnellate di grano di grano duro, grasso animale e capi di lana ai magazzini centrali del Commissariato della Difesa.",
      s6: "Nell'estate 1940, i colcos dell'oblast completano con successo i piani di bonifica e semina meccanizzata, registrando rese record di grano che vanno a costituire le riserve strategiche statali intoccabili dell'URSS.",
      s7: "Nel tardo 1940, Kustanaj viene designata tra le aree di riserva per lo smistamento di manodopera specializzata e materiali d'evacuazione industriale in caso di aggressione alla frontiera occidentale dell'URSS.",
      s8: "Nella primavera 1941, alla vigilia dell'attacco tedesco, l'oblast intensifica i preparativi per il raccolto estivo e allestisce squadroni di riserva per le divisioni di fanteria siberiano-kazake.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Kustanaj",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Terre Nere e Granaio della Steppa",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KAZ_133_Mangystau_Region": {
    id: "SOV_ADM1_KAZ_133_Mangystau_Region",
    republic: "RSS Kazaka",
    modernName: "Regione di Mangystau",
    historicalName: "Distretto di Mangy\u0161lak (Fort-\u0160ev\u010denko)",
    russianName: "Mangy\u0161lakskij Okrug",
    adminTitle: "Okru\u017enoj Ispolkom \u2014 Costa Caspica e Penisola Desertica",
    capital: "Fort-\u0160ev\u010denko",
    keys: ["adm1_kaz_133_mangystau_region", "fort-ševčenko", "fortevenko", "mangylakskij", "mangystau", "mangystau region", "mangystau_region", "okrug", "sov_adm1_kaz_133_mangystau_region"],
    notes: {
      s0: "La penisola desertica di Mangyšlak, affacciata sul Mar Caspio con capoluogo storico Fort Aleksandrovskij (ribattezzato Fort-Ševčenko in memoria del poeta ucraino Taras Ševčenko), è una frontiera aspra e remota dedita a pastorizia nomade, pesca e pattugliamento costiero.",
      s1: "Nel 1938, la sedentarizzazione forzata delle popolazioni nomadi kazake e le operazioni di sicurezza delle guardie costiere dell'NKVD completano il ferreo controllo sovietico sull'intero litorale caspico.",
      s2: "Nell'autunno 1938, le prime ricognizioni geologiche dell'URSS individuano potenziali strutture petrolifere e ricchi giacimenti di calcare e sale nella depressione di Karagie e sull'altopiano di Ustyurt.",
      s3_4: "Nella primavera 1939, la rotta marittima tra Mangyšlak, Baku e Astrachan' assume valore strategico per il trasporto di greggio e idrocarburi necessari alla Flottiglia del Caspio dell'Armata Rossa.",
      s5: "Tra il 1939 e l'inizio del 1940, il porto di Fort-Ševčenko e le stazioni telegrafiche costiere mantengono costante sorveglianza sulle rotte mercantili caspiche durante i mesi della Guerra d'Inverno e della spartizione polacca.",
      s6: "Nell'estate 1940, l'NKVD e il Commissariato dell'Industria Petrolifera intensificano le perforazioni esplorative nella penisola, avviando i rilievi per i futuri immensi giacimenti petroliferi della regione.",
      s7: "Nel tardo 1940, vengono rafforzate le batterie costiere e le stazioni fari per garantire la sicurezza del traffico di petroliere tra Baku, Krasnovodsk e le foci del Volga in previsione di blocchi marittimi o conflitti.",
      s8: "Nella primavera 1941, Mangyšlak garantisce il rifornimento ininterrotto di pesce salato, minerali e combustibile alle basi navali sovietiche del Caspio settentrionale prima dello scoppio di Barbarossa.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Distretto di Mangyšlak (Fort-Ševčenko)",
    getAdminTitle: (_step: number) => "Okružnoj Ispolkom — Costa Caspica e Penisola Desertica",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KAZ_134_Karaganda_Region": {
    id: "SOV_ADM1_KAZ_134_Karaganda_Region",
    republic: "RSS Kazaka",
    modernName: "Regione di Karaganda",
    historicalName: "Oblast di Karaganda (Bacino Karlag)",
    russianName: "Karagandinskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Terzo Bacino Carbonifero dell'URSS e Balcha\u0161",
    capital: "Karaganda",
    keys: ["adm1_kaz_134_karaganda_region", "karaganda", "karaganda region", "karaganda_region", "karagandinskaja", "oblast", "sov_adm1_kaz_134_karaganda_region"],
    notes: {
      s0: "Fondata attorno al gigantesco bacino carbonifero scoperto nella steppa centrale, Karaganda viene sviluppata a ritmi forzati durante il secondo piano quinquennale come terzo polo estrattivo dell'URSS dopo Donbass e Kuzbass, affiancata dal sinistro complesso del Karlag (rete di campi di lavoro dell'arcipelago Gulag).",
      s1: "Nel 1938, all'apice del Grande Terrore, il Karlag riceve centinaia di migliaia di detenuti politici, intellettuali e tecnici epurati dalle metropoli occidentali, impiegati nelle condizioni più estreme per lo scavo delle miniere e la costruzione di ferrovie.",
      s2: "Nell'autunno 1938, la ferrovia Karaganda-Balchaš entra pienamente in funzione, convogliando carbone кокsovabile di Karaganda alle fonderie di rame di Balchaš e Kounradskoe.",
      s3_4: "Nel 1939, l'inaugurazione del grande stabilimento per la lavorazione del rame di Balchaš e l'aumento dell'estrazione di carbone pongono Karaganda al centro della produzione di munizioni e metalli per la difesa sovietica.",
      s5: "Tra l'inverno 1939 e il 1940, i minatori di Karaganda e i prigionieri del Karlag sono sottoposti a quote di estrazione eccezionali per sopperire ai consumi energetici imposti dallo sforzo militare nell'Europa orientale e in Carelia.",
      s6: "Nell'estate 1940, la pianificazione sovietica consolida l'integrazione tra Karaganda e i complessi siderurgici di Magnitogorsk e Nižnij Tagil, formando l'asse energetico Urali-Kazakistan.",
      s7: "Nel tardo 1940, l'area industriale di Karaganda viene inserita nei piani segreti del Comitato di Difesa come sito primario per la delocalizzazione d'emergenza delle fabbriche di munizioni e macchinari pesanti.",
      s8: "Nell'aprile 1941, le miniere di Karaganda lavorano a pieno regime 24 ore su 24, fornendo il carbone fondamentale per sostenere la produzione bellica d'urgenza dell'intera Unione Sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Karaganda (Bacino Karlag)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Terzo Bacino Carbonifero dell'URSS e Balchaš",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KAZ_135_Kyzylorda_Region": {
    id: "SOV_ADM1_KAZ_135_Kyzylorda_Region",
    republic: "RSS Kazaka",
    modernName: "Regione di Kyzylorda",
    historicalName: "Oblast di Kzyl-Orda (Ak-Me\u010det)",
    russianName: "Kzyl-Ordinskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Basso Syr Darya e Risicoltura della Steppa",
    capital: "Kzyl-Orda",
    keys: ["adm1_kaz_135_kyzylorda_region", "kyzylorda", "kyzylorda region", "kyzylorda_region", "kzyl-orda", "kzylorda", "kzylordinskaja", "oblast", "sov_adm1_kaz_135_kyzylorda_region"],
    notes: {
      s0: "Fino al 1929 capitale della RSSA Kazaka (storicamente nota come Ak-Mečet o Perovsk), Kzyl-Orda è il fulcro della risicoltura e dell'irrigazione fluviale lungo il basso corso del Syr Darya, al limitare delle dune del deserto del Kyzylkum.",
      s1: "Nel 1938, l'area di Kzyl-Orda è teatro dell'insediamento forzato di decine di migliaia di coreani sovietici deportati dall'Estremo Oriente (Primor'e) per ordine di Stalin ed Ežov; le loro comunità trasformano le paludi del Syr Darya in risaie altamente produttive.",
      s2: "Nell'autunno 1938, la ferrovia Orenburg-Taškent che attraversa Kzyl-Orda gestisce un massiccio flusso di convogli militari e carichi di grano e cotone diretti verso la Russia centrale.",
      s3_4: "Nel 1939, i colcos risicoli di Kzyl-Orda raggiungono rese record, introducendo nuove tecniche irrigue e fornendo riso e cereali per i depositi dell'Armata Rossa impegnata a Chalchin Gol.",
      s5: "Durante l'inverno 1939-1940, la regione contribuisce con ingenti forniture alimentari alla sicurezza dell'URSS, mentre le stazioni idrometriche sul Syr Darya coordinano la distribuzione delle acque per i canali uzbeki e kazaki.",
      s6: "Nell'estate 1940, viene avviato il raddoppio dei canali irrigui per estendere le piantagioni di riso e cotone precoce lungo l'intera ansa fluviale fino alle rive del Lago d'Aral.",
      s7: "Nel tardo 1940, l'infrastruttura ferroviaria di Kzyl-Orda viene rafforzata con depositi di carbone e depositi locomotive per prevenire colli di bottiglia lungo l'asse strategico Mosca-Taškent.",
      s8: "Nella primavera 1941, Kzyl-Orda completa la semina del riso prima della scadenza stagionale, mentre i giovani della regione vengono mobilitati nei centri di addestramento dell'Asia Centrale.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Kzyl-Orda (Ak-Mečet)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Basso Syr Darya e Risicoltura della Steppa",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KAZ_136_East_Kazakhstan_Region": {
    id: "SOV_ADM1_KAZ_136_East_Kazakhstan_Region",
    republic: "RSS Kazaka",
    modernName: "Regione del Kazakistan Orientale",
    historicalName: "Oblast del Kazakistan Orientale (Altaj Minerario)",
    russianName: "Vosto\u010dno-Kazachstanskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Piombo e Metalli Rari di Leninogorsk e Ust-Kamenogorsk",
    capital: "Ust-Kamenogorsk",
    keys: ["adm1_kaz_136_east_kazakhstan_region", "east kazakhstan region", "east_kazakhstan_region", "kazakistan", "oblast", "orientale", "sov_adm1_kaz_136_east_kazakhstan_region", "ust-kamenogorsk", "ustkamenogorsk", "vostonokazachstanskaja"],
    notes: {
      s0: "Con capoluogo Ust-Kamenogorsk (Öskemen), l'Oblast del Kazakistan Orientale racchiude le leggendarie miniere dell'Altaj minerario (Rudnyj Altaj), fonte primaria dell'URSS per piombo, zinco, rame, argento e tungsteno.",
      s1: "Nel 1938, le indagini dell'NKVD colpiscono duramente gli ingegneri minerari e i geologi dei combinat metallurgici dell'Altaj, accusati di deviazioni trotskiste e sabotaggio delle quote di piombo per la produzione di proiettili.",
      s2: "Nell'autunno 1938, la vicinanza alle frontiere cinesi dello Xinjiang conferisce all'oblast un ruolo strategico per il transito degli aiuti sovietici al governo nazionalista cinese nella guerra contro il Giappone.",
      s3_4: "Nella primavera 1939, le fonderie di piombo e zinco di Leninogorsk (Ridder) lavorano a pieno regime per assicurare i metalli non ferrosi necessari alle fabbriche di munizioni dell'Armata Rossa a Chalchin Gol.",
      s5: "Tra l'inverno 1939 e l'inizio del 1940, il Gosplan accelera i lavori di costruzione della grande centrale idroelettrica di Ust-Kamenogorsk sull'Irtysh, destinata ad alimentare i complessi metallurgici pesanti.",
      s6: "Nell'estate 1940, l'oblast consolida la produzione di metalli strategici (inclusi berillio e tantalio), divenendo uno dei centri minerari più segreti e protetti dell'apparato militare sovietico.",
      s7: "Nel tardo 1940, vengono allestite nuove gallerie minerarie e potenziate le ferrovie a scartamento ridotto nelle gole montane per garantire una riserva strategica di piombo inattaccabile da raid aerei nemici.",
      s8: "Nell'aprile 1941, l'oblast del Kazakistan Orientale rappresenta il cardine metallurgico della difesa sovietica, garantendo oltre il 70% del piombo impiegato nelle cartucce dell'Armata Rossa.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast del Kazakistan Orientale (Altaj Minerario)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Piombo e Metalli Rari di Leninogorsk e Ust-Kamenogorsk",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KAZ_137_Aktobe_Region": {
    id: "SOV_ADM1_KAZ_137_Aktobe_Region",
    republic: "RSS Kazaka",
    modernName: "Regione di Aktobe",
    historicalName: "Oblast di Aktjubinsk",
    russianName: "Aktjubinskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Cromo di Chromtau e Ferrovia Urali-Turkestan",
    capital: "Aktjubinsk",
    keys: ["adm1_kaz_137_aktobe_region", "aktjubinsk", "aktjubinskaja", "aktobe", "aktobe region", "aktobe_region", "oblast", "sov_adm1_kaz_137_aktobe_region"],
    notes: {
      s0: "L'Oblast di Aktjubinsk, situata nella steppa occidentale lungo il fiume Ilek, è il crocevia ferroviario naturale tra Mosca, gli Urali meridionali (Orenburg/Orsk) e l'Asia Centrale sovietica.",
      s1: "Nel 1938, l'apparato dell'NKVD effettua arresti tra i tecnici delle officine ferroviarie di Aktjubinsk e nei colcos zootecnici della steppa, accusati di intralciare le consegne di carne per l'esercito.",
      s2: "Nell'autunno 1938, iniziano le operazioni per lo sfruttamento su vasta scala dei depositi di cromo di Chromtau (Donskoe), tra i più ricchi al mondo, indispensabili per la produzione di acciai speciali corazzati sovietici.",
      s3_4: "Nel 1939, il traffico sulla linea ferroviaria Čkalov-Taškent via Aktjubinsk raddoppia per sostenere la mobilitazione industriale e il trasporto di materie prime verso le fabbriche di carri armati di Stalingrado e Charkiv.",
      s5: "Durante l'inverno 1939-1940, la regione fornisce cromo, nichel e cereali, mentre la base aerea di Aktjubinsk funge da scalo per il trasferimento di caccia e bombardieri verso le guarnigioni orientali e meridionali.",
      s6: "Nell'estate 1940, viene fondato il grande combinat chimico e di ferroleghe di Aktjubinsk per la produzione di bicromati e additivi per leghe metalliche ad altissima resistenza.",
      s7: "Nel tardo 1940, Aktjubinsk viene equipaggiata come centro logistico di smistamento per l'accoglienza di rifugiati e magazzini governativi di sicurezza in caso di conflitto in Europa.",
      s8: "Nella primavera 1941, le miniere di cromo di Chromtau lavorano a ciclo continuo, assicurando all'industria bellica sovietica le leghe speciali necessarie alla corazzatura dei carri T-34.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Aktjubinsk",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Cromo di Chromtau e Ferrovia Urali-Turkestan",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KAZ_138_Atyrau_Region": {
    id: "SOV_ADM1_KAZ_138_Atyrau_Region",
    republic: "RSS Kazaka",
    modernName: "Regione di Atyrau",
    historicalName: "Oblast di Gur'ev (Bacino Petrolifero di Emba)",
    russianName: "Gur'evskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Petrolio di Emba e Foce dell'Ural",
    capital: "Gur'ev",
    keys: ["adm1_kaz_138_atyrau_region", "atyrau", "atyrau region", "atyrau_region", "gur'ev", "gurev", "gurevskaja", "oblast", "sov_adm1_kaz_138_atyrau_region"],
    notes: {
      s0: "Situata alla foce del fiume Ural sul Caspio, la storica città cosacca di Gur'ev è il centro del bacino petrolifero di Emba, un'area estrattiva vitale per il rifornimento di greggio e lubrificanti per l'URSS.",
      s1: "Nel 1938, le purghe staliniane decimano la dirigenza del trust petrolifero 'Embaneft', con accuse di sabotaggio delle pompe estrattive e di mancato raggiungimento degli obiettivi del piano statale.",
      s2: "Nell'autunno 1938, l'oleodotto Emba-Orsk pompa a pieno ritmo petrolio greggio verso le raffinerie degli Urali meridionali, assicurando carburante all'industria pesante di Magnitogorsk.",
      s3_4: "Nel 1939, il porto di Gur'ev amplia le sue banchine per accogliere petroliere e chiatte cariche di carburante e prodotti della pesca del Caspio (incluso il caviale nero per le riserve valutarie dello Stato).",
      s5: "Tra l'inverno 1939 e il 1940, il bacino di Emba garantisce combustibili a basso punto di congelamento, impiegati con successo sui motori dell'Armata Rossa durante le operazioni sul fronte careliano.",
      s6: "Nell'estate 1940, vengono completate nuove condotte e stazioni di pompaggio lungo il delta dell'Ural, proteggendo gli oleodotti con guarnigioni dell'NKVD contro possibili attacchi di sabotatori.",
      s7: "Nel tardo 1940, Gur'ev intensifica la produzione di bitumi, oli combustibili speciali e derivati chimici destinati all'aeronautica militare e alla Flotta Rossa.",
      s8: "Nell'aprile 1941, le raffinerie e i pozzi di Gur'ev sono dichiarati impianti di massima priorità difensiva, con guardie armate stabili e difese contraeree a protezione della foce dell'Ural.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Gur'ev (Bacino Petrolifero di Emba)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Petrolio di Emba e Foce dell'Ural",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KAZ_139_South_Kazakhstan_Region": {
    id: "SOV_ADM1_KAZ_139_South_Kazakhstan_Region",
    republic: "RSS Kazaka",
    modernName: "Regione del Kazakistan Meridionale",
    historicalName: "Oblast del Kazakistan Meridionale (\u010cimkent)",
    russianName: "Ju\u017eno-Kazachstanskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Piombo di \u010cimkent e Vallate del Cotone",
    capital: "\u010cimkent",
    keys: ["adm1_kaz_139_south_kazakhstan_region", "imkent", "junokazachstanskaja", "kazakistan", "meridionale", "oblast", "south kazakhstan region", "south_kazakhstan_region", "sov_adm1_kaz_139_south_kazakhstan_region", "čimkent"],
    notes: {
      s0: "Con capoluogo Čimkent (Shymkent), l'Oblast del Kazakistan Meridionale unisce fertili vallate irrigate da canali montani e pianure semiaride, sede della gigantesca fonderia di piombo 'M.I. Kalinin', tra le maggiori al mondo.",
      s1: "Nel 1938, l'NKVD indaga duramente sulla catena di comando dello stabilimento di piombo di Čimkent e sui comitati di distretto del partito kazako, imponendo un controllo ferreo sulla produzione strategica.",
      s2: "Nell'autunno 1938, la Turksib movimenta da Čimkent enormi quantità di lingotti di piombo verso le fabbriche di munizioni di Tula, Podol'sk e Leningrado.",
      s3_4: "Nel 1939, l'oblast espande le coltivazioni di cotone, tabacco e vigneti, fornendo materie prime indispensabili per l'industria leggera e la razione da campo dell'Armata Rossa.",
      s5: "Durante l'inverno 1939-1940, lo stabilimento di Čimkent copre da solo oltre la metà del fabbisogno di piombo per la fabbricazione di cartucce dell'esercito sovietico.",
      s6: "Nell'estate 1940, si intensificano i lavori di irrigazione lungo il fiume Arys e l'affluente Badam per incrementare le rese di cotone a ciclo rapido.",
      s7: "Nel tardo 1940, vengono modernizzati i forni e gli impianti chimici per il recupero di acido solforico a Čimkent, potenziando la filiera della chimica militare.",
      s8: "Nella primavera 1941, Čimkent è una fortezza industriale pienamente integrata nello sforzo bellico preventivo, pronta a sostenere consumi di munizioni su scala continentale.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast del Kazakistan Meridionale (Čimkent)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Piombo di Čimkent e Vallate del Cotone",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KAZ_140_Akmola_Region": {
    id: "SOV_ADM1_KAZ_140_Akmola_Region",
    republic: "RSS Kazaka",
    modernName: "Regione di Akmola",
    historicalName: "Oblast di Akmolinsk (Distretto AL\u017dIR)",
    russianName: "Akmolinskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Steppa dell'I\u0161im e Snodo Ferroviario",
    capital: "Akmolinsk",
    keys: ["adm1_kaz_140_akmola_region", "akmola", "akmola region", "akmola_region", "akmolinsk", "akmolinskaja", "oblast", "sov_adm1_kaz_140_akmola_region"],
    notes: {
      s0: "L'Oblast di Akmolinsk, estesa nella steppa aperta del fiume Išim, è il cuore della pastorizia e della futura cerealicoltura intensiva kazaka, nodo d'intersezione tra le ferrovie nord-sud della Repubblica.",
      s1: "Nel 1938, a 30 km a sud-ovest di Akmolinsk, entra in funzione il famigerato campo ALŽIR (Campo di Akmolinsk per le Mogli dei Traditori della Patria), dove vengono internate migliaia di donne, mogli di dirigenti ed eroi bolscevichi fucilati nelle purghe staliniane.",
      s2: "Nell'autunno 1938, la ferrovia Akmolinsk-Kartały entra nella fase conclusiva di posa dei binari, creando il corridoio diretto per convogliare il carbone di Karaganda verso la metallurgia di Magnitogorsk.",
      s3_4: "Nel 1939, il traffico merci e l'espansione dei depositi ferroviari trasformano la sonnolenta cittadina di Akmolinsk in un vitale centro logistico per l'Armata Rossa.",
      s5: "Tra l'inverno 1939 e l'inizio del 1940, l'oblast garantisce riserve strategiche di grano e foraggio, mentre il campo ALŽIR produce milioni di capi di sartoria e uniformi invernali per le truppe sovietiche.",
      s6: "Nell'estate 1940, la linea ferroviaria per Kartały viene aperta al traffico regolare, riducendo di centinaia di chilometri la rotta del carbone centroasiatico verso gli Urali.",
      s7: "Nel tardo 1940, vengono approvati piani per il raddoppio delle officine di riparazione vagoni e per la costruzione di silos granari a tenuta d'emergenza ad Akmolinsk.",
      s8: "Nella primavera 1941, Akmolinsk rappresenta il perno logistico delle comunicazioni interne dell'URSS tra Siberia, Urali e Asia Centrale, protetto da reparti ferroviari speciali.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Akmolinsk (Distretto ALŽIR)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Steppa dell'Išim e Snodo Ferroviario",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KAZ_141_Almaty_Region": {
    id: "SOV_ADM1_KAZ_141_Almaty_Region",
    republic: "RSS Kazaka",
    modernName: "Regione di Almaty",
    historicalName: "Oblast di Alma-Ata (Semire\u010d'e)",
    russianName: "Alma-Atinskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Monti Tien Shan e Corridoio Cinese",
    capital: "Alma-Ata",
    keys: ["adm1_kaz_141_almaty_region", "alma-ata", "almaata", "almaatinskaja", "almaty", "almaty region", "almaty_region", "oblast", "sov_adm1_kaz_141_almaty_region"],
    notes: {
      s0: "L'Oblast di Alma-Ata copre la fertile regione storica del Semireč'e (Sette Fiumi), estendendosi dalle vette innevate del Tien Shan e dell'Alatau trans-iliaco fino alle rive sabbiose del Lago Balchaš.",
      s1: "Nel 1938, le guardie di frontiera dell'NKVD rafforzano la vigilanza lungo i valichi montani del confine con lo Xinjiang cinese, arrestando presunti infiltrati e reprimendo ogni contatto transfrontaliero.",
      s2: "Nell'autunno 1938, la regione rifornisce la vicina capitale di frutta (le celebri mele Aport), cereali, carne e pelli, oltre a garantire scorte di foraggio per i reggimenti di cavalleria di frontiera.",
      s3_4: "Nel 1939, i passi montani dell'oblast vedono il transito di convogli di autocarri carichi di rifornimenti e munizioni sovietiche inviati segretamente alle forze cinesi in lotta contro il Giappone lungo l'autostrada di Saryozek.",
      s5: "Tra l'inverno 1939 e il 1940, le cooperative agricole e i colcos pedemontani mantengono la massima produttività per sostenere i depositi di sussistenza militare della RSS Kazaka.",
      s6: "Nell'estate 1940, vengono completati nuovi canali di irrigazione derivati dal fiume Ili, ampliando le colture di barbabietola da zucchero e foraggi intensivi.",
      s7: "Nel tardo 1940, l'oblast potenzia i punti di avvistamento aereo e le infrastrutture viarie tra Alma-Ata e il Lago Balchaš per prevenire minacce d'infiltrazione asiatica.",
      s8: "Nella primavera 1941, le truppe di frontiera dell'Oblast di Alma-Ata sono in stato di massima allerta, coordinando la difesa dei valichi del Tien Shan prima dell'apertura del fronte europeo.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Alma-Ata (Semireč'e)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Monti Tien Shan e Corridoio Cinese",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KAZ_142_North_Kazakhstan_Region": {
    id: "SOV_ADM1_KAZ_142_North_Kazakhstan_Region",
    republic: "RSS Kazaka",
    modernName: "Regione del Kazakistan Settentrionale",
    historicalName: "Oblast del Kazakistan Settentrionale (Petropavlovsk)",
    russianName: "Severo-Kazachstanskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Asse della Transiberiana e Granaio dell'I\u0161im",
    capital: "Petropavlovsk",
    keys: ["adm1_kaz_142_north_kazakhstan_region", "kazakistan", "north kazakhstan region", "north_kazakhstan_region", "oblast", "petropavlovsk", "settentrionale", "severokazachstanskaja", "sov_adm1_kaz_142_north_kazakhstan_region"],
    notes: {
      s0: "Con capoluogo Petropavlovsk sul fiume Išim, l'Oblast del Kazakistan Settentrionale è attraversata dal tracciato storico meridionale della Transiberiana, costituendo un corridoio logistico e cerealicolo strategico tra Russia europea e Siberia.",
      s1: "Nel 1938, l'NKVD conduce epurazioni sistematiche tra i ferrovieri di Petropavlovsk e i dirigenti agrari accusati di ritardi nella spedizione dei convogli carichi di grano verso Mosca e Leningrado.",
      s2: "Nell'autunno 1938, il traffico merci lungo la linea ferroviaria raggiunge la saturazione, spingendo le autorità a raddoppiare i binari e i depositi locomotive di Petropavlovsk.",
      s3_4: "Nel 1939, durante le operazioni militari a Chalchin Gol, l'oblast funge da corridoio vitale per il transito rapido di truppe, carri armati e munizioni inviati dal centro della Russia verso il fronte mongolo.",
      s5: "Durante l'inverno 1939-1940, i silos di Petropavlovsk forniscono enormi contingenti di farina e grano per le riserve strategiche dello Stato durante la Guerra d'Inverno contro la Finlandia.",
      s6: "Nell'estate 1940, vengono avviate le prime officine meccaniche per la riparazione di motori aeronautici e trattori, destinate a convertirsi in fabbriche d'armi in caso di necessità bellica.",
      s7: "Nel tardo 1940, la capacità di carico dei magazzini ferroviari dell'oblast viene aumentata per fungere da punto di trasbordo logistico in caso di evacuazione industriale verso est.",
      s8: "Nella primavera 1941, la regione di Petropavlovsk è pienamente mobilitata sul fronte agricolo e dei trasporti, pronta a garantire la continuità dei collegamenti transcontinentali dell'URSS.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast del Kazakistan Settentrionale (Petropavlovsk)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Asse della Transiberiana e Granaio dell'Išim",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KAZ_143_Almaty": {
    id: "SOV_ADM1_KAZ_143_Almaty",
    republic: "RSS Kazaka",
    modernName: "Citt\u00e0 di Almaty",
    historicalName: "Alma-Ata (Capitale della RSS Kazaka)",
    russianName: "Gorod Alma-Ata",
    adminTitle: "Alma-Atinskij Gorsovet \u2014 Sovnarkom della RSS Kazaka e Comando Turksib",
    capital: "Alma-Ata",
    keys: ["adm1_kaz_143_almaty", "alma-ata", "almaata", "almaty", "gorod", "sov_adm1_kaz_143_almaty"],
    notes: {
      s0: "Capitale della Repubblica Socialista Sovietica Kazaka (elevata a repubblica federata dell'Unione nel dicembre 1936), la splendida città giardino di Alma-Ata, adagiata sotto i picchi del Tien Shan, è il fulcro politico, culturale e accademico del Kazakistan.",
      s1: "Nel 1938, il Terrore staliniano decapita l'intera élite fondatrice della repubblica ad Alma-Ata: il primo segretario Levon Mirzojan, scrittori e accademici kazaki vengono arrestati e fucilati con l'accusa di 'nazionalismo borghese'.",
      s2: "Nell'autunno 1938, il nuovo apparato di partito fedele a Stalin consolida il controllo ideologico, inaugurando nuovi viali neoclassici, la sede del Consiglio dei Commissari del Popolo e l'Università Statale Kazaka.",
      s3_4: "Nella primavera 1939, Alma-Ata ospita riunioni strategiche per coordinare il ponte logistico verso la Cina attraverso la frontiera del Semireč'e in funzione antinipponica.",
      s5: "Tra il 1939 e l'inizio del 1940, la capitale coordina la mobilitazione agricola e mineraria della repubblica, mentre i teatri e gli studi cinematografici accolgono intellettuali e artisti inviati da Mosca.",
      s6: "Nell'estate 1940, viene varato il piano urbanistico generale per fare di Alma-Ata una metropoli moderna e sicura, lontana dai teatri di guerra occidentali.",
      s7: "Nel tardo 1940, le autorità cittadine predispongono edifici pubblici, università e magazzini per ospitare gli studi cinematografici centrali (Mosfilm e Lenfilm) e gli istituti dell'Accademia delle Scienze in caso di conflitto.",
      s8: "Nell'aprile 1941, Alma-Ata vive un clima di febbrile preparazione militare, mobilitando la 316ª Divisione di fanteria del generale Panfilov, destinata a passare alla storia pochi mesi dopo nella difesa di Mosca.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Alma-Ata (Capitale della RSS Kazaka)",
    getAdminTitle: (_step: number) => "Alma-Atinskij Gorsovet — Sovnarkom della RSS Kazaka e Comando Turksib",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KAZ_144_West_Kazakhstan_Region": {
    id: "SOV_ADM1_KAZ_144_West_Kazakhstan_Region",
    republic: "RSS Kazaka",
    modernName: "Regione del Kazakistan Occidentale",
    historicalName: "Oblast del Kazakistan Occidentale (Ural'sk)",
    russianName: "Zapadno-Kazachstanskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Medio Fiume Ural e Cerniera di Saratov",
    capital: "Ural'sk",
    keys: ["adm1_kaz_144_west_kazakhstan_region", "kazakistan", "oblast", "occidentale", "sov_adm1_kaz_144_west_kazakhstan_region", "ural'sk", "uralsk", "west kazakhstan region", "west_kazakhstan_region", "zapadnokazachstanskaja"],
    notes: {
      s0: "Con capoluogo la storica città fortificata cosacca di Ural'sk (Oral), l'Oblast del Kazakistan Occidentale presidia il medio corso del fiume Ural, cerniera strategica tra la regione del Volga (Saratov e Stalingrado) e la steppa centroasiatica.",
      s1: "Nel 1938, l'NKVD conduce estese operazioni contro le residue simpatie cosacche 'bianche' e i colcos rurali, rafforzando l'apparato politico del partito comunista lungo il fiume Ural.",
      s2: "Nell'autunno 1938, le vie fluviali e ferroviarie che collegano Ural'sk a Saratov convogliano tonnellate di grano, carne bovina e cuoio verso i centri industriali della Russia europea.",
      s3_4: "Nel 1939, la modernizzazione delle vie di comunicazione stradali e dei ponti sul fiume Ural rende la regione un nodo essenziale per la mobilitazione di contingenti di cavalleria della steppa.",
      s5: "Durante l'inverno 1939-1940, l'oblast fornisce uniformi in montone, stivali di feltro (valenki) e cibo in scatola per l'Armata Rossa sul fronte finnico.",
      s6: "Nell'estate 1940, i raccolti cerealicoli della sponda destra dell'Ural superano le aspettative, andando a consolidare le scorte statali del Commissariato per gli Approvvigionamenti.",
      s7: "Nel tardo 1940, vengono allestiti depositi militari avanzati e stazioni di rifornimento carburante lungo la linea ferroviaria Ural'sk-Ileck-Saratov.",
      s8: "Nella primavera 1941, alla vigilia dell'attacco tedesco, l'Oblast del Kazakistan Occidentale rafforza i controlli di sicurezza sui ponti strategici e le stazioni telegrafiche.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast del Kazakistan Occidentale (Ural'sk)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Medio Fiume Ural e Cerniera di Saratov",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KAZ_145_Astana": {
    id: "SOV_ADM1_KAZ_145_Astana",
    republic: "RSS Kazaka",
    modernName: "Citt\u00e0 di Astana",
    historicalName: "Akmolinsk (Citt\u00e0 Fortificata della Steppa)",
    russianName: "Gorod Akmolinsk",
    adminTitle: "Akmolinskij Gorsovet \u2014 Nodo della Ferrovia Karaganda-Karta\u0142y",
    capital: "Akmolinsk",
    keys: ["adm1_kaz_145_astana", "akmolinsk", "astana", "gorod", "sov_adm1_kaz_145_astana"],
    notes: {
      s0: "Storica fortezza cosacca fondata nel 1830 nella steppa dell'Išim, Akmolinsk (la futura Celinograd e oggi Astana) è un insediamento urbano in rapida crescita grazie al suo ruolo di snodo della ferrovia Karaganda-Kartały.",
      s1: "Nel 1938, la città ospita le sedi amministrative distrettuali dell'NKVD incaricate della gestione logistica del vasto sistema concentrazionario circostante e della sorveglianza delle deportazioni speciali.",
      s2: "Nell'autunno 1938, le officine ferroviarie e il deposito locomotive di Akmolinsk diventano un impianto modello per la manutenzione dei treni merci pesanti carichi di carbone e minerali.",
      s3_4: "Nel 1939, l'espansione demografica legata all'arrivo di ferrovieri, tecnici e personale militare trasforma la fisionomia urbana con l'apertura di nuovi quartieri, scuole e ospedali sovietici.",
      s5: "Tra l'inverno 1939 e il 1940, la guarnigione di Akmolinsk addestra reclute per le unità di fanteria e genio ferrovieri destinate ai fronti occidentali dell'Unione.",
      s6: "Nell'estate 1940, vengono collaudati nuovi scambiatori e raccordi industriali che consentono di raddoppiare la frequenza dei convogli di carbone diretti verso gli Urali.",
      s7: "Nel tardo 1940, la città viene inserita nella rete delle comunicazioni radio d'emergenza del Distretto Militare dell'Asia Centrale.",
      s8: "Nella primavera 1941, Akmolinsk è un vitale snodo della logistica continentale sovietica, pronto a garantire il transito ininterrotto di risorse da est a ovest.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Akmolinsk (Città Fortificata della Steppa)",
    getAdminTitle: (_step: number) => "Akmolinskij Gorsovet — Nodo della Ferrovia Karaganda-Kartały",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KGZ_170_Batken_Region": {
    id: "SOV_ADM1_KGZ_170_Batken_Region",
    republic: "RSS Kirghisa",
    modernName: "Regione di Batken",
    historicalName: "Distretto Minerario di Khaidarkan e Batken",
    russianName: "Batkenskij Rajon",
    adminTitle: "Rajispolkom \u2014 Miniere Strategiche di Antimonio e Mercurio dell'Alaj",
    capital: "Batken",
    keys: ["adm1_kgz_170_batken_region", "batken", "batken region", "batken_region", "batkenskij", "rajon", "sov_adm1_kgz_170_batken_region"],
    notes: {
      s0: "Incuneato tra le valli uzbeke e tajike ai piedi delle creste del Turkestan e dell'Alaj, il distretto di Batken racchiude oasi pedemontane famose per gli albicocchi e, soprattutto, i ricchissimi giacimenti di mercurio e antimonio di Khaidarkan e Chauvaj.",
      s1: "Nel 1938, l'NKVD istituisce uno stretto regime di sicurezza sui cantieri minerari di Khaidarkan, arrestando geologi e capi-cantiere accusati di ritardare l'estrazione di antimonio per le leghe metalliche militari.",
      s2: "Nell'autunno 1938, l'antimonio estratto a Khaidarkan diventa insostituibile per la fabbricazione di cuscinetti a sfera, proiettili e accumulatori al piombo per l'esercito sovietico.",
      s3_4: "Nel 1939, viene potenziata la pista carrabile che collega le miniere di Batken con la ferrovia della Valle di Fergana, accelerando la spedizione di minerali strategici.",
      s5: "Durante l'inverno 1939-1940, i minatori di Khaidarkan lavorano in gallerie sotterranee ad alta quota per garantire forniture continue al Commissariato della Difesa.",
      s6: "Nell'estate 1940, l'URSS raggiunge l'autosufficienza nell'antimonio e nel mercurio primario grazie all'espansione dei combinat di Batken.",
      s7: "Nel tardo 1940, vengono allestiti impianti di riserva e difese passive a protezione delle gallerie minerarie e delle scorte di metalli pesanti.",
      s8: "Nella primavera 1941, Batken è un baluardo minerario segreto e primario dell'industria bellica sovietica, indispensabile per la produzione di munizioni.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Distretto Minerario di Khaidarkan e Batken",
    getAdminTitle: (_step: number) => "Rajispolkom — Miniere Strategiche di Antimonio e Mercurio dell'Alaj",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KGZ_171_Osh_Region": {
    id: "SOV_ADM1_KGZ_171_Osh_Region",
    republic: "RSS Kirghisa",
    modernName: "Regione di Osh",
    historicalName: "Oblast di Osh",
    russianName: "O\u0161skaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Via della Seta, Seta e Partenza del Tratto Pamir",
    capital: "Osh",
    keys: ["adm1_kgz_171_osh_region", "oblast", "osh", "osh region", "osh_region", "oskaja", "sov_adm1_kgz_171_osh_region"],
    notes: {
      s0: "Fondata oltre tremila anni fa ai piedi della sacra montagna Sulayman-Too, Osh è la storica 'capitale meridionale' del Kirghizistan, snodo primario della Via della Seta tra la Valle di Fergana e l'Alaj, votata alla coltivazione del cotone, alla filatura della seta e al commercio.",
      s1: "Nel 1938, le purghe staliniane colpiscono duramente i quadri kirghisi e uzbeki di Osh, smantellando i centri religiosi attorno al monte sacro e imponendo l'ideologia atea di Stato.",
      s2: "Nell'autunno 1938, Osh è il punto di partenza della leggendaria Strada Militare del Pamir diretta a Chorog, garantendo il continuo transito di convogli di autocarri ZIS per la frontiera afghana.",
      s3_4: "Nel 1939, la costruzione del Canale di Fergana e la riorganizzazione dei colcos aumentano la produzione di cotone e tabacco della piana di Osh a livelli record.",
      s5: "Tra l'inverno 1939 e il 1940, le filande della seta di Osh lavorano giorno e notte per produrre tessuti da paracadute destinati alle divisioni aviotrasportate dell'Armata Rossa.",
      s6: "Nell'estate 1940, la città espande le sue infrastrutture ospedaliere e di magazzinaggio per fungere da base logistica avanzata per l'intera regione dell'Alaj.",
      s7: "Nel tardo 1940, vengono completate nuove caserme e campi di addestramento militare per le reclute di cavalleria da montagna kirghise.",
      s8: "Nella primavera 1941, Osh unisce la sua eredità millenaria all'efficienza produttiva e militare sovietica, pronta a sostenere le prove della guerra.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Osh",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Via della Seta, Seta e Partenza del Tratto Pamir",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KGZ_172_Talas_Region": {
    id: "SOV_ADM1_KGZ_172_Talas_Region",
    republic: "RSS Kirghisa",
    modernName: "Regione di Talas",
    historicalName: "Oblast di Talas (Valle di Manas)",
    russianName: "Talasskij Rajon",
    adminTitle: "Rajispolkom \u2014 Valle Montana Protetta, Pastorizia Equina e Tabacco",
    capital: "Talas",
    keys: ["adm1_kgz_172_talas_region", "rajon", "sov_adm1_kgz_172_talas_region", "talas", "talas region", "talas_region", "talasskij"],
    notes: {
      s0: "Racchiusa tra le imponenti catene montuose del Talas Alatau e del Kirghiz Alatau, la fertile vallata di Talas (culla leggendaria dell'eroe epico Manas e teatro della storica battaglia del 751 d.C.) è un'area montana votata a cerealicoltura, tabacco, fagioli e allevamento di cavalli.",
      s1: "Nel 1938, i narratori tradizionali (manasči) e gli intellettuali di Talas vengono esaminati dall'NKVD per verificare la conformità dell'epopea nazionale di Manas con i canoni della dottrina del realismo socialista.",
      s2: "Nell'autunno 1938, l'isolamento geografico della valle viene attenuato con l'apertura di nuovi tratti stradali attraverso i passi montani verso Džambul e la Turksib.",
      s3_4: "Nel 1939, i colcos zootecnici di Talas forniscono migliaia di robusti cavalli da sella e da tiro destinati ai reparti di cavalleria cosacca e centroasiatica dell'Armata Rossa.",
      s5: "Durante l'inverno 1939-1940, la valle garantisce eccedenze di grano montano, carne secca e lana per le scorte strategiche dell'URSS.",
      s6: "Nell'estate 1940, vengono realizzate nuove canalizzazioni irrigue derivate dal fiume Talas per sostenere l'espansione dei campi di barbabietola da zucchero e foraggi.",
      s7: "Nel tardo 1940, vengono istituiti depositi veterinari e centri di riproduzione equina per garantire riserve stabili di cavalli per l'esercito.",
      s8: "Nella primavera 1941, la valle di Talas mantiene la sua operosa tranquillità montuosa, con le sue comunità pronte a rispondere alla chiamata della Patria.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Talas (Valle di Manas)",
    getAdminTitle: (_step: number) => "Rajispolkom — Valle Montana Protetta, Pastorizia Equina e Tabacco",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KGZ_173_Jalal_Abad_Region": {
    id: "SOV_ADM1_KGZ_173_Jalal_Abad_Region",
    republic: "RSS Kirghisa",
    modernName: "Regione di Jalal-Abad",
    historicalName: "Oblast di Jalal-Abad (Arslanbob e Ta\u0161-Kumyr)",
    russianName: "D\u017ealal-Abadskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Carbone di Ta\u0161-Kumyr, Noce di Arslanbob e Terme",
    capital: "Jalal-Abad",
    keys: ["adm1_kgz_173_jalal_abad_region", "dalalabadskaja", "jalal abad region", "jalal-abad", "jalal_abad_region", "jalalabad", "oblast", "sov_adm1_kgz_173_jalal_abad_region"],
    notes: {
      s0: "Situata sulle pendici montuose nord-orientali della Valle di Fergana, Jalal-Abad è famosa per le sue sorgenti minerali curative, le sconfinate foreste naturali di noci di Arslanbob (le più grandi al mondo), i pozzi petroliferi di Mailuu-Suu e le miniere di carbone di Taš-Kumyr.",
      s1: "Nel 1938, l'NKVD intensifica le indagini nei centri minerari di Taš-Kumyr e Kočkor-Ata, arrestando ingegneri e capi-turno accusati di sabotaggio delle forniture energetiche.",
      s2: "Nell'autunno 1938, le miniere di carbone di Taš-Kumyr aumentano la produzione, alimentando le ferrovie e le centrali termiche della Valle di Fergana.",
      s3_4: "Nel 1939, il legno di noce di Arslanbob viene selezionato come materiale strategico d'eccellenza per la fabbricazione dei calci dei fucili Mosin-Nagant e delle eliche d'aereo dell'Armata Rossa.",
      s5: "Tra l'inverno 1939 e il 1940, gli stabilimenti termali di Jalal-Abad vengono riorganizzati come sanatori e case di riposo per i quadri e i militari convalescenti dell'esercito sovietico.",
      s6: "Nell'estate 1940, prime prospezioni minerarie individuano depositi di minerali radioattivi nell'area montuosa di Mailuu-Suu, avviando la nascita di un distretto industriale segreto.",
      s7: "Nel tardo 1940, viene completato il raccordo ferroviario per il trasporto diretto del carbone da Taš-Kumyr verso le fonderie uzbeke.",
      s8: "Nella primavera 1941, l'Oblast di Jalal-Abad rappresenta un bacino energetico e forestale prezioso, integrato nei piani di mobilitazione industriale dell'URSS.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Jalal-Abad (Arslanbob e Taš-Kumyr)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Carbone di Taš-Kumyr, Noce di Arslanbob e Terme",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KGZ_174_Issyk_Kul_Region": {
    id: "SOV_ADM1_KGZ_174_Issyk_Kul_Region",
    republic: "RSS Kirghisa",
    modernName: "Regione di Issyk-Kul",
    historicalName: "Oblast di Issyk-Kul (Pr\u017eeval'sk)",
    russianName: "Issyk-Kul'skaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Lago Alpino Salmastro e Ricerche Navali Sperimentali",
    capital: "Pr\u017eeval'sk",
    keys: ["adm1_kgz_174_issyk_kul_region", "issyk kul region", "issyk_kul_region", "issykkul", "issykkulskaja", "oblast", "prevalsk", "prževal'sk", "sov_adm1_kgz_174_issyk_kul_region"],
    notes: {
      s0: "Dominata dall'immenso e profondo lago alpino salmastro di Issyk-Kul che non gela mai in inverno (circondato dai monti innevati del Kungey e Terskey Alatau), l'oblast ha come centro storico Prževal'sk (Karakol, intitolata all'esploratore Nikolaj Prževal'skij che qui morì nel 1888).",
      s1: "Nel 1938, la vicinanza della frontiera con la Cina (Xinjiang) porta l'NKVD a un ferreo controllo militare sull'intero bacino lacustre e all'eliminazione di presunti ribelli e contrabbandieri.",
      s2: "Nell'autunno 1938, la flotta lacustre di Issyk-Kul assicura il trasporto rapido di grano, bestiame e legname tra i moli di Rybač'e e Prževal'sk.",
      s3_4: "Nel 1939, la Marina Militare Sovietica avvia i primi esperimenti segreti nelle acque profonde di Issyk-Kul per il collaudo di siluri, sensori subacquei e tecnologie navali d'immersione.",
      s5: "Durante l'inverno 1939-1940, la conca lacustre fornisce scorte alimentari di cereali, patate e trote d'allevamento per i centri di sussistenza militare della RSS Kirghisa.",
      s6: "Nell'estate 1940, si sviluppano le coltivazioni intensive di piante medicinali e oppio terapeutico nella conca di Karakol, sotto strettissimo monopolio statale per l'industria farmacologica militare.",
      s7: "Nel tardo 1940, le basi navali sperimentali di Issyk-Kul vengono blindate e dichiarate zone militari riservate ad accesso ristretto.",
      s8: "Nella primavera 1941, l'Oblast di Issyk-Kul è una gemma strategica e scientifica inestimabile, custode di segreti idrodinamici e risorse alimentari per l'URSS.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Issyk-Kul (Prževal'sk)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Lago Alpino Salmastro e Ricerche Navali Sperimentali",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KGZ_175_Chuy_Region": {
    id: "SOV_ADM1_KGZ_175_Chuy_Region",
    republic: "RSS Kirghisa",
    modernName: "Regione di Chuy",
    historicalName: "Oblast di Frunze (Valle di Chuy)",
    russianName: "Frunzenskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Barbabietola da Zucchero e Cintura della Capitale",
    capital: "Frunze",
    keys: ["adm1_kgz_175_chuy_region", "chuy region", "chuy_region", "frunze", "frunzenskaja", "oblast", "sov_adm1_kgz_175_chuy_region"],
    notes: {
      s0: "L'Oblast di Chuy (denominata anche Oblast di Frunze), bagnata dal fiume Chu ai piedi delle catene del Kirghiz Alatau, è il cuore agricolo e industriale primario del Kirghizistan, sede delle maggiori piantagioni di barbabietola da zucchero dell'Asia Centrale e di una fitta rete di canali irrigui.",
      s1: "Nel 1938, l'apparato repressivo staliniano colpisce le cooperative agricole e gli zuccherifici della valle di Chuy per presunti ritardi nelle consegne di saccarosio destinate alle riserve statali.",
      s2: "Nell'autunno 1938, i raccolti di barbabietola da zucchero toccano primati storici grazie al lavoro delle brigate stachanoviste guidate da celebri colcosiane kirghise.",
      s3_4: "Nel 1939, la costruzione del Grande Canale di Chuy viene avviata con l'apporto di decine di migliaia di lavoratori per moltiplicare le terre fertili lungo il confine con il Kazakistan.",
      s5: "Tra l'inverno 1939 e il 1940, gli zuccherifici e le industrie agroalimentari della valle forniscono decine di migliaia di tonnellate di zuccheri e sciroppi per l'Armata Rossa.",
      s6: "Nell'estate 1940, la valle di Chuy completa la meccanizzazione delle colture di cereali e foraggi con l'introduzione di moderni trattori e mietitrebbie sovietiche.",
      s7: "Nel tardo 1940, vengono costruiti nuovi silos granari e depositi industriali a guardia della ferrovia che unisce la vallata alla Turksib a Lugovaya.",
      s8: "Nell'aprile 1941, la Valle di Chuy è il motore agroindustriale del Kirghizistan, pronta a sostenere le massime quote di produzione per lo sforzo bellico imminente.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Frunze (Valle di Chuy)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Barbabietola da Zucchero e Cintura della Capitale",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_KGZ_176_Naryn_Region": {
    id: "SOV_ADM1_KGZ_176_Naryn_Region",
    republic: "RSS Kirghisa",
    modernName: "Regione di Naryn",
    historicalName: "Oblast del Tien Shan (Naryn)",
    russianName: "Tjan'-\u0160anskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Altipiani d'Alta Quota e Passo di Torugart verso la Cina",
    capital: "Naryn",
    keys: ["adm1_kgz_176_naryn_region", "naryn", "naryn region", "naryn_region", "oblast", "sov_adm1_kgz_176_naryn_region", "tjananskaja"],
    notes: {
      s0: "Con capoluogo Naryn lungo le gole del fiume omonimo e storicamente organizzata come Oblast del Tien Shan, la regione racchiude vastissimi altipiani d'alta quota (jailoo) dominati da una pastorizia nomade tradizionale di pecore e cavalli, a guardia dello strategico passo montano di Torugart verso la Cina.",
      s1: "Nel 1938, l'NKVD conduce epurazioni contro i leader tribali e i pastori kirghisi accusati di simpatie anticomuniste e di tentativi di fuggire con le proprie greggi oltre la frontiera cinese.",
      s2: "Nell'autunno 1938, i distaccamenti di frontiera dell'Armata Rossa a Torugart vengono equipaggiati con uniformi termiche speciali e cavalli addestrati alle bufere di neve d'alta quota.",
      s3_4: "Nel 1939, la pista militare che scende dal passo di Torugart verso Naryn e Frunze funge da corridoio protetto per le comunicazioni confinarie e le carovane statali sovietiche.",
      s5: "Durante il rigido inverno 1939-1940, i colcos zootecnici del Tien Shan inviano quintali di lana grezza e carne salata alle forze armate impegnate al fronte.",
      s6: "Nell'estate 1940, la transumanza estiva sui grandi pascoli di Son-Kul e Ak-Say fa registrare cifre record nel patrimonio ovino della repubblica.",
      s7: "Nel tardo 1940, la guarnigione di Naryn rafforza i posti d'avvistamento e le linee telefoniche stese attraverso le gole alpine del fiume Naryn.",
      s8: "Nella primavera 1941, l'Oblast del Tien Shan custodisce inviolata la frontiera montana più elevata dell'URSS, pronta alla mobilitazione generale patriottica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast del Tien Shan (Naryn)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Altipiani d'Alta Quota e Passo di Torugart verso la Cina",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_10_Krasnoyarsk_Krai": {
    id: "SOV_ADM1_RUS_10_Krasnoyarsk_Krai",
    republic: "RSFSR",
    modernName: "Territorio di Krasnojarsk",
    historicalName: "Territorio di Krasnojarsk (Fiume Enisej \u2014 Siberia Centrale)",
    russianName: "Krasnoyarskij kraj",
    adminTitle: "Krasnojarskij Kraiispolkom \u2014 RSFSR (URSS)",
    capital: "Krasnojarsk",
    keys: ["adm1_rus_10_krasnoyarsk_krai", "krasnojarsk", "krasnoyarsk krai", "krasnoyarsk_krai", "krasnoyarskij", "sov_adm1_rus_10_krasnoyarsk_krai", "territorio"],
    notes: {
      s0: "Immenso entroterra siberiano e artico solcato dai fiumi giganti Enisej, Lena e Ob'; comprende le ricchezze minerarie dell'Altaj, la fabbrica aeronautica n. 125 di Irkutsk (costruttrice dei bombardieri veloci SB e Pe-2), l'estrazione d'oro e diamanti in Jacuzia lungo l'Aldan, le renne dei Nenec e le foreste sconfinate della taiga siberiana.",
      s1: "Istituzione di campi di lavoro forestali del Gulag (Kraslag, Siblag) lungo la Transiberiana e i fiumi navigabili per il taglio del legname.",
      s2: "La fabbrica d'aviazione n. 125 di Irkutsk raggiunge la piena operatività, producendo bombardieri per la flotta dell'Estremo Oriente e per la Cina nazionalista contro i giapponesi.",
      s3_4: "I monti Altaj forniscono piombo, zinco e metalli non ferrosi essenziali per le munizioni dell'Armata Rossa.",
      s5: "Durante la Guerra d'Inverno e le campagne europee, la Siberia addestra reggimenti di sciatori e tiratori scelti abituati a sopravvivere a -40°C.",
      s6: "Sviluppo della rotta marittima del Nord (Glavsevmorput') con rompighiaccio a vapore che collegano la foce dell'Enisej e della Lena ad Arcangelo e Vladivostok.",
      s7: "Irkutsk e Krasnojarsk ampliano le officine meccaniche e le centrali elettriche per accogliere gli impianti pesanti da evacuare da Mosca e Leningrado.",
      s8: "Alla vigilia del 22 giugno 1941, le sconfinate distese della Siberia centrale e orientale rappresentano la riserva demografica, mineraria e strategica invincibile dell'Unione Sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Territorio di Krasnojarsk (Fiume Enisej — Siberia Centrale)",
    getAdminTitle: (_step: number) => "Krasnojarskij Kraiispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_11_Zabaykalsky_Krai": {
    id: "SOV_ADM1_RUS_11_Zabaykalsky_Krai",
    republic: "RSFSR",
    modernName: "Territorio della Transbajkalia",
    historicalName: "Oblast di \u010cita (Transbajkalia \u2014 Distretto Militare Transbajkalico)",
    russianName: "\u010citinskaya oblast",
    adminTitle: "\u010citinskij Oblispolkom & Comando ZabVO \u2014 RSFSR (URSS)",
    capital: "\u010cita",
    keys: ["adm1_rus_11_zabaykalsky_krai", "della", "ita", "itinskaya", "oblast", "sov_adm1_rus_11_zabaykalsky_krai", "territorio", "transbajkalia", "zabaykalsky krai", "zabaykalsky_krai", "čita"],
    notes: {
      s0: "Quartier Generale del Distretto Militare Transbajkalico (ZabVO) a Čita e cerniera strategica a est del Lago Bajkal confinante con la Mongolia e la Manciuria; a Ulan-Udè opera il colosso della costruzione e riparazione locomotive LVRZ.",
      s1: "Le purghe dell'NKVD eliminano decine di ufficiali transbajkalici e quadri del comitato di partito mongolo-buriato accusati di 'panturanismo' e spionaggio giapponese.",
      s2: "Militarizzazione accelerata della frontiera mongola: il comando di Čita predispone piani d'intervento immediato in territorio mongolo in base al Trattato di Mutua Assistenza sovietico-mongolo del 1936.",
      s3_4: "Nel maggio-settembre 1939 il comando di Čita coordina la titanica Battaglia di Chalchin Gol (Khalkhin Gol): il generale Georgij Žukov assume il comando del 1º Gruppo d'Armate Sovietico-Mongolo e sferra una brillante manovra a tenaglia corazzata che annienta la 6ª Armata giapponese del Kwantung, stroncando le mire espansionistiche nipponiche verso la Siberia.",
      s5: "Žukov viene promosso Generale d'Armata e nominato Eroe dell'Unione Sovietica a Mosca; la Transbajkalia consolida le difese mongole e transiberiane.",
      s6: "LVRZ a Ulan-Udè amplia le officine alla produzione di aeroplani militari e parti di ricambio pesanti per i mezzi cingolati dell'Armata Rossa.",
      s7: "Dispiegamento di divisioni corazzate e fucilieri siberiani perfettamente addestrati alle condizioni di freddo estremo.",
      s8: "Grazie al Patto di Neutralità con Tokyo del 13 aprile 1941, le divisioni d'élite del Distretto Transbajkalico si preparano a diventare la riserva strategica d'oro dell'URSS in vista dell'urto con la Wehrmacht.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Čita (Transbajkalia — Distretto Militare Transbajkalico)",
    getAdminTitle: (_step: number) => "Čitinskij Oblispolkom & Comando ZabVO — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_12_Sverdlovsk_Oblast": {
    id: "SOV_ADM1_RUS_12_Sverdlovsk_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Sverdlovsk",
    historicalName: "Oblast di Sverdlovsk (Ekaterinburg \u2014 Arsenale degli Urali)",
    russianName: "Sverdlovskaya oblast",
    adminTitle: "Sverdlovskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Sverdlovsk",
    keys: ["adm1_rus_12_sverdlovsk_oblast", "oblast", "sov_adm1_rus_12_sverdlovsk_oblast", "sverdlovsk", "sverdlovsk oblast", "sverdlovsk_oblast", "sverdlovskaya"],
    notes: {
      s0: "Capitale industriale e mineraria dei monti Urali, ribattezzata Sverdlovsk nel 1924 in onore di Jakov Sverdlov; fulcro del mastodontico impianto di costruzioni meccaniche pesanti Uralmaš (Zavod Ordžonikidze a Nižnij Tagil), inaugurato nel 1933, e dei combinati metallurgici metallo-estrattivi per ferro, rame e platino.",
      s1: "Le purghe colpiscono duramente la dirigenza di Uralmaš e i docenti dell'Istituto Minerario degli Urali; ciononostante il Terzo Piano Quinquennale fissa quote record di estrazione e laminazione dell'acciaio.",
      s2: "Ampliamento delle ferrovie trans-uraliche e dei depositi minerari strategici; gli Urali vengono designati dallo Stato Maggiore sovietico come ridotta industriale sicura e profonda in caso di guerra su due fronti.",
      s3_4: "Uralmaš avvia la lavorazione di acciai balistici per corazzature e telai per l'artiglieria d'assedio pesante dell'Armata Rossa.",
      s5: "Durante la Guerra d'Inverno e dopo l'annessione della Polonia orientale, la regione viene inserita nel piano statale di evacuazione d'emergenza (Ewakopunkt) come sito primario di accoglienza per le fabbriche dell'URSS occidentale in caso di invasione.",
      s6: "Nel 1940 a Nižnij Tagil viene potenziato lo stabilimento Uralvagonzavod (fabbrica di carri merci), predisposto alla conversione rapida per la fabbricazione di carri armati pesanti e medi.",
      s7: "Sverdlovsk diventa il fulcro segreto del secondo scaglione industriale sovietico: vengono predisposti capannoni, binari d'innesto e allacciamenti elettrici per accogliere dozzine di stabilimenti minacciati lungo le frontiere europee.",
      s8: "Nella primavera 1941 gli Urali operano a ritmi parossistici, pronti a trasformarsi da officina pacifica in 'Fucina della Vittoria' (Kuznica Pobedy) per l'Armata Rossa.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Sverdlovsk (Ekaterinburg — Arsenale degli Urali)",
    getAdminTitle: (_step: number) => "Sverdlovskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_13_Volgograd_Oblast": {
    id: "SOV_ADM1_RUS_13_Volgograd_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Volgograd",
    historicalName: "Oblast di Stalingrado (Caricyn \u2014 Fiume Volga)",
    russianName: "Stalingradskaya oblast",
    adminTitle: "Stalingradskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Stalingrad",
    keys: ["adm1_rus_13_volgograd_oblast", "oblast", "sov_adm1_rus_13_volgograd_oblast", "stalingrad", "stalingradskaya", "volgograd", "volgograd oblast", "volgograd_oblast"],
    notes: {
      s0: "Capitale industriale del Basso Volga, intitolata nel 1925 a Stalin per il suo ruolo nella difesa di Caricyn durante la Guerra Civile; sede del celebre Trattorificio di Stalingrado (STZ Dzeržinskij), del colosso metallurgico Krasnyj Oktjabr' e dell'acciaieria e fabbrica d'artiglieria Barrikady. Nel 1936 gli stabilimenti passano dalla produzione di trattori alla fabbricazione di massa del carro armato leggero T-26.",
      s1: "Le purghe dell'NKVD investono i vertici del comitato provinciale del partito e i quadri tecnici del Trattorificio STZ, accusati di sabotaggio industriale e legami con i 'blocchi trotskisti'; la produzione viene sottoposta a una disciplina paramilitare.",
      s2: "Potenziamento della navigazione fluviale sul Volga per il trasporto di greggio caucasico proveniente da Baku e del grano della steppa verso la Russia centrale e settentrionale.",
      s3_4: "Gli impianti Barrikady e STZ accelerano la produzione di motori diesel, pezzi d'artiglieria divisionale e veicoli cingolati per sostenere le esigenze delle unità sovietiche impegnate nelle battaglie di confine contro i giapponesi a Chalchin Gol.",
      s5: "Sotto la spinta del Patto Molotov-Ribbentrop, la STZ continua a pieno ritmo la fabbricazione dei carri T-26 e l'assemblaggio di componenti per i primi prototipi di carri armati da combattimento T-34.",
      s6: "Nel 1940 il Trattorificio STZ viene designato ufficialmente come secondo centro di produzione seriale del rivoluzionario carro medio T-34 accanto alla fabbrica n. 183 di Charkiv; il fiume Volga funge da via di transito vitale per le riforniture sovietiche.",
      s7: "Produzione febbrile di cannoni alle Barrikady e avvio delle linee di montaggio dei T-34 con corazza saldata alla STZ; Stalingrado si consolida come cardine industriale strategico dell'intera Russia meridionale.",
      s8: "Alla vigilia dell'invasione tedesca, Stalingrado sforna dozzine di carri armati T-34 e migliaia di tonnellate di acciaio speciale al mese, con le maestranze addestrate per la difesa territoriale in squadre di milizia operaia.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Stalingrado (Caricyn — Fiume Volga)",
    getAdminTitle: (_step: number) => "Stalingradskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_14_Irkutsk_Oblast": {
    id: "SOV_ADM1_RUS_14_Irkutsk_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Irkutsk",
    historicalName: "Oblast di Irkutsk (Lago Bajkal \u2014 Fabbrica Aeronautica n. 125)",
    russianName: "Irkutskaya oblast",
    adminTitle: "Irkutskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Irkutsk",
    keys: ["adm1_rus_14_irkutsk_oblast", "irkutsk", "irkutsk oblast", "irkutsk_oblast", "irkutskaya", "oblast", "sov_adm1_rus_14_irkutsk_oblast"],
    notes: {
      s0: "Immenso entroterra siberiano e artico solcato dai fiumi giganti Enisej, Lena e Ob'; comprende le ricchezze minerarie dell'Altaj, la fabbrica aeronautica n. 125 di Irkutsk (costruttrice dei bombardieri veloci SB e Pe-2), l'estrazione d'oro e diamanti in Jacuzia lungo l'Aldan, le renne dei Nenec e le foreste sconfinate della taiga siberiana.",
      s1: "Istituzione di campi di lavoro forestali del Gulag (Kraslag, Siblag) lungo la Transiberiana e i fiumi navigabili per il taglio del legname.",
      s2: "La fabbrica d'aviazione n. 125 di Irkutsk raggiunge la piena operatività, producendo bombardieri per la flotta dell'Estremo Oriente e per la Cina nazionalista contro i giapponesi.",
      s3_4: "I monti Altaj forniscono piombo, zinco e metalli non ferrosi essenziali per le munizioni dell'Armata Rossa.",
      s5: "Durante la Guerra d'Inverno e le campagne europee, la Siberia addestra reggimenti di sciatori e tiratori scelti abituati a sopravvivere a -40°C.",
      s6: "Sviluppo della rotta marittima del Nord (Glavsevmorput') con rompighiaccio a vapore che collegano la foce dell'Enisej e della Lena ad Arcangelo e Vladivostok.",
      s7: "Irkutsk e Krasnojarsk ampliano le officine meccaniche e le centrali elettriche per accogliere gli impianti pesanti da evacuare da Mosca e Leningrado.",
      s8: "Alla vigilia del 22 giugno 1941, le sconfinate distese della Siberia centrale e orientale rappresentano la riserva demografica, mineraria e strategica invincibile dell'Unione Sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Irkutsk (Lago Bajkal — Fabbrica Aeronautica n. 125)",
    getAdminTitle: (_step: number) => "Irkutskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_15_Perm_Krai": {
    id: "SOV_ADM1_RUS_15_Perm_Krai",
    republic: "RSFSR",
    modernName: "Territorio di Perm'",
    historicalName: "Oblast di Molotov (Perm' \u2014 Fiume Kama)",
    russianName: "Molotovskaya oblast",
    adminTitle: "Molotovskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Molotov",
    keys: ["adm1_rus_15_perm_krai", "molotov", "molotovskaya", "oblast", "perm krai", "perm_krai", "sov_adm1_rus_15_perm_krai", "territorio"],
    notes: {
      s0: "Importante centro siderurgico e meccanico sul fiume Kama, ai piedi degli Urali occidentali; sede dello stabilimento d'artiglieria pesante di Motovilicha (fabbrica Lenin n. 172) e della fabbrica di motori aeronautici n. 19 (Švecov).",
      s1: "Dure indagini dell'NKVD colpiscono i progettisti di motori d'aviazione e dell'arsenale di Motovilicha durante la campagna contro i 'sabotatori della difesa'.",
      s2: "Potenziamento delle centrali termoelettriche e delle miniere di carbone del bacino di Kizel per alimentare le acciaierie dell'Ural-Kuzbass.",
      s3_4: "La fabbrica Motovilicha intensifica la produzione di obici pesanti M-30 da 122 mm e cannoni ML-20 da 152 mm per l'Armata Rossa.",
      s5: "Nel 1940, in occasione del 50º compleanno del Primo Ministro e Commissario agli Esteri Vjačeslav Molotov, la città di Perm' viene ufficialmente ribattezzata Molotov e la regione diventa Molotovskaja Oblast'.",
      s6: "La fabbrica di motori n. 19 riceve commesse per la produzione in grande serie del potente motore radiale Švecov M-62 e M-82 per i nuovi velivoli sovietici.",
      s7: "Ampliamento delle banchine fluviali sul Kama per l'accoglienza di carichi industriali e petrolio raffinato; la regione si coordina con Sverdlovsk per la difesa industriale dell'URSS.",
      s8: "L'Oblast di Molotov è al vertice della produzione sovietica di artiglieria pesante da campagna e motori aeronautici a pistoni.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Molotov (Perm' — Fiume Kama)",
    getAdminTitle: (_step: number) => "Molotovskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_16_Pskov_Oblast": {
    id: "SOV_ADM1_RUS_16_Pskov_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Pskov",
    historicalName: "Distretto di Pskov (Lago dei Ciudi \u2014 Frontiera con Estonia e Lettonia)",
    russianName: "Pskovskij okrug \u2014 Leningradskaya oblast",
    adminTitle: "Pskovskij Okruzhnyj Ispolkom \u2014 RSFSR (URSS)",
    capital: "Pskov",
    keys: ["adm1_rus_16_pskov_oblast", "leningradskaya", "oblast", "okrug", "pskov", "pskov oblast", "pskov_oblast", "pskovskij", "sov_adm1_rus_16_pskov_oblast"],
    notes: {
      s0: "Storiche città-stato medievali della Russia nord-occidentale; Pskov è sentinella di frontiera sul Lago dei Ciudi al confine con Estonia e Lettonia; Velikij Novgorod domina il Lago Il'men'; Vologda è il crocevia ferroviario nodale che unisce Mosca, Leningrado, Arcangelo e gli Urali.",
      s1: "Pskov è sottoposta a strettissimo regime di zona fortificata di frontiera (Pskovskij UR); dure purghe colpiscono gli ufficiali del Distretto Militare di Leningrado e i ferrovieri di Vologda.",
      s2: "Potenziamento delle fortezze d'artiglieria e dei fossati anticarro del settore fortificato di Pskov a sbarramento delle vie d'invasione baltiche.",
      s3_4: "Vologda smista a getto continuo materiali metallurgici provenienti dagli Urali verso i cantieri navali di Leningrado e i porti del Mar Bianco.",
      s5: "Durante la Guerra d'Inverno, Pskov e Novgorod sono centri di riserva e rifornimento per le armate sovietiche; gli ospedali militari accolgono migliaia di feriti careliani.",
      s6: "Nel giugno 1940, con l'annessione sovietica di Estonia e Lettonia, le guarnigioni di Pskov avanzano per occupare Tartu, Riga e Tallinn; la frontiera di Pskov cessa di essere confine estero.",
      s7: "Vologda viene designata come nodo di smistamento logistico prioritario per le evacuazioni da Leningrado verso la Siberia.",
      s8: "Pskov e Novgorod costituiscono la cerniera di transito e il fulcro difensivo avanzato a protezione della Russia centrale e settentrionale.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Distretto di Pskov (Lago dei Ciudi — Frontiera con Estonia e Lettonia)",
    getAdminTitle: (_step: number) => "Pskovskij Okruzhnyj Ispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_17_Rostov_Oblast": {
    id: "SOV_ADM1_RUS_17_Rostov_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Rostov",
    historicalName: "Oblast di Rostov (Rostov sul Don \u2014 Porta del Caucaso)",
    russianName: "Rostovskaya oblast",
    adminTitle: "Rostovskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Rostov-na-Donu",
    keys: ["adm1_rus_17_rostov_oblast", "oblast", "rostov", "rostov oblast", "rostov-na-donu", "rostov_oblast", "rostovnadonu", "rostovskaya", "sov_adm1_rus_17_rostov_oblast"],
    notes: {
      s0: "Porta d'accesso strategica al Caucaso e al Mar d'Azov lungo il fiume Don; terra storica dei cosacchi del Don e metropoli industriale sede di Rostsel'maš (la più grande fabbrica di mietitrebbie e macchinari agricoli d'Europa) e dei cantieri fluviali-marittimi.",
      s1: "L'Oblast di Rostov viene formalmente istituita nel settembre 1937 dalla divisione del Territorio di Azov-Mar Nero; dure epurazioni colpiscono i vertici cosacchi e la dirigenza agraria.",
      s2: "Istituzione di corpi di cavalleria cosacca integrati nell'Armata Rossa sotto la supervisione di Semën Budënnyj; ammodernamento delle linee ferroviarie per il Caucaso.",
      s3_4: "Rostsel'maš avvia la diversificazione verso la produzione di carrelli e componentistica per artiglieria e bombe d'aereo pesanti.",
      s5: "Il porto di Rostov gestisce un volume eccezionale di cereali e idrocarburi diretti alla Russia centrale e verso il Mar Nero, a sostegno della neutralità armata sovietica.",
      s6: "Potenziamento della Flottiglia Militare dell'Azov con base a Taganrog e Azov a guardia degli accessi navali allo Stretto di Kerč'.",
      s7: "La fabbrica aeronautica n. 31 di Taganrog produce aerei da ricognizione navale Beriev MBR-2 e prepara l'avvio della produzione di caccia moderni.",
      s8: "Rostov sul Don è il cardine dei rifornimenti petroliferi tra il Caucaso e il fronte occidentale e il comando del Distretto Militare del Caucaso Settentrionale.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Rostov (Rostov sul Don — Porta del Caucaso)",
    getAdminTitle: (_step: number) => "Rostovskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_18_Ryazan_Oblast": {
    id: "SOV_ADM1_RUS_18_Ryazan_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Rjazan'",
    historicalName: "Oblast di Rjazan' (Fiume Oka \u2014 Patria di Esenin)",
    russianName: "Ryazanskaya oblast",
    adminTitle: "Rjazanskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Rjazan'",
    keys: ["adm1_rus_18_ryazan_oblast", "oblast", "rjazan", "rjazan'", "ryazan oblast", "ryazan_oblast", "ryazanskaya", "sov_adm1_rus_18_ryazan_oblast"],
    notes: {
      s0: "Antica capitale del principato di Rjazan' sull'ansa del fiume Oka; terra natale del grande poeta Sergej Esenin e del fisiologo Ivan Pavlov, importante centro agricolo, molitorio e di comunicazioni verso la Volga.",
      s1: "Istituita come Oblast nel settembre 1937 scorporata da Mosca; le purghe colpiscono gli agronomi e i funzionari delle cooperative cerealicole.",
      s2: "Ampliamento della scuola militare di fanteria di Rjazan' e potenziamento delle ferrovie radiali verso Kuibyshev e gli Urali.",
      s3_4: "Sviluppo di stabilimenti per la lavorazione del cuoio e la produzione di finimenti e selle per i reparti di cavalleria dell'Armata Rossa.",
      s5: "I kolchoz dell'Oblast conferiscono quote massime di grano, patate e carne per sostenere la mobilitazione sovietica.",
      s6: "Installazione di officine ausiliarie per la riparazione di motori di autocarri e veicoli agricoli.",
      s7: "Rjazan' funge da centro logistico di riserva per lo smistamento di materiali pesanti provenienti dall'est verso Mosca.",
      s8: "La regione opera come retrovia sicura e serbatoio di rifornimenti alimentari a sud-est della capitale.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Rjazan' (Fiume Oka — Patria di Esenin)",
    getAdminTitle: (_step: number) => "Rjazanskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_19_Adygea": {
    id: "SOV_ADM1_RUS_19_Adygea",
    republic: "RSFSR",
    modernName: "Repubblica di Adighezia",
    historicalName: "Oblast Autonoma di Adighezia (Majkop \u2014 Pozzi Petroliferi)",
    russianName: "Adygeyskaya AO",
    adminTitle: "Adygejskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Majkop",
    keys: ["adighezia", "adm1_rus_19_adygea", "adygea", "adygeyskaya", "majkop", "repubblica", "sov_adm1_rus_19_adygea"],
    notes: {
      s0: "Enclave autonoma adiacente al fiume Kuban'; il capoluogo Majkop è famoso a livello mondiale per il ricchissimo bacino petrolifero (Majkopskoe mestoroždenie) e l'industria del legno e dell'inscatolamento alimentare.",
      s1: "L'NKVD sorveglia capillarmente i pozzi petroliferi e le segherie dell'Adighezia; epurati diversi dirigenti del partito adighè.",
      s2: "Ammodernamento dell'oleodotto Majkop-Tuapse che pompa il greggio direttamente ai moli d'imbarco delle petroliere sul Mar Nero.",
      s3_4: "I pozzi di Majkop toccano livelli record di estrazione, garantendo carburante per le navi della Flotta del Mar Nero a Sebastopoli.",
      s5: "Durante il secondo anno del Terzo Piano Quinquennale viene potenziata la raffinazione in loco di benzine per autocarri e veicoli agricoli.",
      s6: "Misure speciali di protezione antincendio e antiaerea attorno ai campi petroliferi di Majkop e alle stazioni di pompaggio dell'oleodotto.",
      s7: "Sviluppo di infrastrutture sotterranee per rendere inagibili i pozzi con demolizioni controllate in caso di estrema minaccia nemica.",
      s8: "Alla vigilia dell'attacco tedesco, i pozzi di Majkop sono uno dei traguardi strategici più ambiti dall'Asse per la conquista delle risorse dell'URSS.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast Autonoma di Adighezia (Majkop — Pozzi Petroliferi)",
    getAdminTitle: (_step: number) => "Adygejskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_1_Altai_Krai": {
    id: "SOV_ADM1_RUS_1_Altai_Krai",
    republic: "RSFSR",
    modernName: "Territorio dell'Altaj",
    historicalName: "Territorio dell'Altaj (Barnaul \u2014 Fiume Ob')",
    russianName: "Altajskij kraj",
    adminTitle: "Altajskij Kraiispolkom \u2014 RSFSR (URSS)",
    capital: "Barnaul",
    keys: ["adm1_rus_1_altai_krai", "altai krai", "altai_krai", "altajskij", "barnaul", "dellaltaj", "sov_adm1_rus_1_altai_krai", "territorio"],
    notes: {
      s0: "Immenso entroterra siberiano e artico solcato dai fiumi giganti Enisej, Lena e Ob'; comprende le ricchezze minerarie dell'Altaj, la fabbrica aeronautica n. 125 di Irkutsk (costruttrice dei bombardieri veloci SB e Pe-2), l'estrazione d'oro e diamanti in Jacuzia lungo l'Aldan, le renne dei Nenec e le foreste sconfinate della taiga siberiana.",
      s1: "Istituzione di campi di lavoro forestali del Gulag (Kraslag, Siblag) lungo la Transiberiana e i fiumi navigabili per il taglio del legname.",
      s2: "La fabbrica d'aviazione n. 125 di Irkutsk raggiunge la piena operatività, producendo bombardieri per la flotta dell'Estremo Oriente e per la Cina nazionalista contro i giapponesi.",
      s3_4: "I monti Altaj forniscono piombo, zinco e metalli non ferrosi essenziali per le munizioni dell'Armata Rossa.",
      s5: "Durante la Guerra d'Inverno e le campagne europee, la Siberia addestra reggimenti di sciatori e tiratori scelti abituati a sopravvivere a -40°C.",
      s6: "Sviluppo della rotta marittima del Nord (Glavsevmorput') con rompighiaccio a vapore che collegano la foce dell'Enisej e della Lena ad Arcangelo e Vladivostok.",
      s7: "Irkutsk e Krasnojarsk ampliano le officine meccaniche e le centrali elettriche per accogliere gli impianti pesanti da evacuare da Mosca e Leningrado.",
      s8: "Alla vigilia del 22 giugno 1941, le sconfinate distese della Siberia centrale e orientale rappresentano la riserva demografica, mineraria e strategica invincibile dell'Unione Sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Territorio dell'Altaj (Barnaul — Fiume Ob')",
    getAdminTitle: (_step: number) => "Altajskij Kraiispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_20_Samara_Oblast": {
    id: "SOV_ADM1_RUS_20_Samara_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Samara",
    historicalName: "Oblast di Kujby\u0161ev (Samara \u2014 Fiume Volga)",
    russianName: "Kuybyshevskaya oblast",
    adminTitle: "Kujby\u0161evskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Kujby\u0161ev",
    keys: ["adm1_rus_20_samara_oblast", "kujbyev", "kujbyšev", "kuybyshevskaya", "oblast", "samara", "samara oblast", "samara_oblast", "sov_adm1_rus_20_samara_oblast"],
    notes: {
      s0: "Storica città mercantile del Volga, ribattezzata Kujbyšev nel 1935 in memoria del leader sovietico Valerian Kujbyšev; importante nodo di comunicazioni ferroviarie verso gli Urali e la Siberia, sede di industrie chimiche, meccaniche e molitorie di primaria grandezza.",
      s1: "Epurazione dei quadri dell'Oblast da parte dell'NKVD locale; rafforzamento della disciplina negli stabilimenti di cuscinetti a sfera e nelle fabbriche di raffinazione petrolifera.",
      s2: "Ammodernamento del porto fluviale di Kujbyšev per lo stoccaggio e la movimentazione di petrolio, minerali e cereali lungo la direttrice nord-sud del Volga.",
      s3_4: "Viene avviata la progettazione di un gigantesco bacino idroelettrico sul Volga (futura diga di Žiguli/Kujbyšev) per alimentare la nascente rete industriale della Russia centrale.",
      s5: "Con lo scoppio della Seconda Guerra Mondiale in Europa, la posizione geografica protetta dell'ansa di Samara (Samarskaja Luka) spinge il governo sovietico a individuare Kujbyšev come sede di riserva per le istituzioni governative e diplomatiche.",
      s6: "Vengono potenziati i centri aeronautici e le infrastrutture ferroviarie collegate alla Siberia e al bacino petrolifero Volga-Urali ('Secondo Baku').",
      s7: "Nel tardo 1940 partono i lavori segreti di scavo e fortificazione sotterranea per il bunker di comando di riserva di Stalin e del Consiglio dei Commissari del Popolo in caso di caduta di Mosca.",
      s8: "Kujbyšev è pienamente predisposta per assumere il ruolo di 'capitale di riserva' (Zapasnaja stolica) dell'Unione Sovietica, con alloggiamenti per le ambasciate straniere, il Bol'šoj e i ministeri chiave.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Kujbyšev (Samara — Fiume Volga)",
    getAdminTitle: (_step: number) => "Kujbyševskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_21_Khakassia": {
    id: "SOV_ADM1_RUS_21_Khakassia",
    republic: "RSFSR",
    modernName: "Repubblica di Chakassia",
    historicalName: "Oblast Autonoma della Chakassia (Abakan \u2014 Monti Sajany)",
    russianName: "Khakasskaya AO \u2014 Krasnoyarskij kraj",
    adminTitle: "Chakasskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Abakan",
    keys: ["abakan", "adm1_rus_21_khakassia", "chakassia", "khakassia", "khakasskaya", "krasnoyarskij", "repubblica", "sov_adm1_rus_21_khakassia"],
    notes: {
      s0: "Immenso entroterra siberiano e artico solcato dai fiumi giganti Enisej, Lena e Ob'; comprende le ricchezze minerarie dell'Altaj, la fabbrica aeronautica n. 125 di Irkutsk (costruttrice dei bombardieri veloci SB e Pe-2), l'estrazione d'oro e diamanti in Jacuzia lungo l'Aldan, le renne dei Nenec e le foreste sconfinate della taiga siberiana.",
      s1: "Istituzione di campi di lavoro forestali del Gulag (Kraslag, Siblag) lungo la Transiberiana e i fiumi navigabili per il taglio del legname.",
      s2: "La fabbrica d'aviazione n. 125 di Irkutsk raggiunge la piena operatività, producendo bombardieri per la flotta dell'Estremo Oriente e per la Cina nazionalista contro i giapponesi.",
      s3_4: "I monti Altaj forniscono piombo, zinco e metalli non ferrosi essenziali per le munizioni dell'Armata Rossa.",
      s5: "Durante la Guerra d'Inverno e le campagne europee, la Siberia addestra reggimenti di sciatori e tiratori scelti abituati a sopravvivere a -40°C.",
      s6: "Sviluppo della rotta marittima del Nord (Glavsevmorput') con rompighiaccio a vapore che collegano la foce dell'Enisej e della Lena ad Arcangelo e Vladivostok.",
      s7: "Irkutsk e Krasnojarsk ampliano le officine meccaniche e le centrali elettriche per accogliere gli impianti pesanti da evacuare da Mosca e Leningrado.",
      s8: "Alla vigilia del 22 giugno 1941, le sconfinate distese della Siberia centrale e orientale rappresentano la riserva demografica, mineraria e strategica invincibile dell'Unione Sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast Autonoma della Chakassia (Abakan — Monti Sajany)",
    getAdminTitle: (_step: number) => "Chakasskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_22_Tambov_Oblast": {
    id: "SOV_ADM1_RUS_22_Tambov_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Tambov",
    historicalName: "Oblast di Tambov (Terre Nere \u2014 Fiume Cna)",
    russianName: "Tambovskaya oblast",
    adminTitle: "Tambovskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Tambov",
    keys: ["adm1_rus_22_tambov_oblast", "oblast", "sov_adm1_rus_22_tambov_oblast", "tambov", "tambov oblast", "tambov_oblast", "tambovskaya"],
    notes: {
      s0: "Cuore delle feconde 'Terre Nere' (Černozëm) della Russia europea; teatro della celebre rivolta contadina di Antonov (1920-1921), nel 1936 è una regione interamente colletivizzata con enormi raccolti di grano, barbabietole e allevamenti bovini.",
      s1: "Istituita come Oblast nel settembre 1937; l'NKVD stermina gli ultimi reduci della rivolta contadina degli anni Venti e purga i quadri agrari.",
      s2: "Costruzione della grande fabbrica di carrozze e parti di ricambio ferroviarie a Mičurinsk (centro scientifico di genetica agraria fondato da Ivan Mičurin).",
      s3_4: "I centri scientifici di Mičurinsk sviluppano colture ibride resistenti al gelo per assicurare i rifornimenti di cereali dell'URSS.",
      s5: "L'Oblast fornisce riserve imponenti di grano e zucchero per le dispense strategiche dello Stato sovietico durante le campagne del 1939-1940.",
      s6: "Sviluppo di fabbriche chimiche a Tambov per la produzione di acido solforico e concimi azotati destinati alla sintesi di esplosivi.",
      s7: "Mobilitazione delle squadre di macchine e trattori (MTS) per turni continui di mietitura e stoccaggio sotterraneo.",
      s8: "Tambov rappresenta uno dei più saldi granai dell'Armata Rossa, pronto a sfamare le grandi città russe durante il conflitto.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Tambov (Terre Nere — Fiume Cna)",
    getAdminTitle: (_step: number) => "Tambovskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_23_Tatarstan": {
    id: "SOV_ADM1_RUS_23_Tatarstan",
    republic: "RSFSR",
    modernName: "Repubblica del Tatarstan",
    historicalName: "RSSA Tatara (Kazan' \u2014 Polo Aeronautico sul Volga)",
    russianName: "Tatarskaya ASSR",
    adminTitle: "Sovet Narodnykh Komissarov Tatarskoj ASSR \u2014 RSFSR (URSS)",
    capital: "Kazan'",
    keys: ["adm1_rus_23_tatarstan", "kazan", "kazan'", "repubblica", "sov_adm1_rus_23_tatarstan", "tatarskaya", "tatarstan"],
    notes: {
      s0: "Storica capitale tatara alla confluenza della Volga e del Kazanka; centro dell'industria aeronautica sovietica con la gigantesca fabbrica d'aviazione n. 124 (Zavod imeni Sergo Ordžonikidze) e la fabbrica di motori n. 27, oltre a colossi della chimica sintetica e della gomma (Kazan'rezina).",
      s1: "Dure purghe decapitano la leadership tatara del partito e dell'intelligencija culturale (tra cui il celebre poeta Musa Cälil, che sopravvive e continua l'attività letteraria).",
      s2: "La fabbrica n. 124 costruisce i mastodontici bombardieri quadrimotori pesanti ANT-20bis e Petljakov TB-7 (futuro Pe-8) per l'aviazione a lungo raggio.",
      s3_4: "Kazan' diventa sede di speciali 'šaraški' (uffici di progettazione carcerari dell'NKVD) dove lavorano ingegneri aeronautici prigionieri del calibro di Andrej Tupolev e Sergej Korolëv.",
      s5: "Avvio della produzione in serie del bombardiere tattico veloce bimotore Petljakov Pe-2, destinato a diventare il pilastro dell'aviazione da bombardamento sovietica.",
      s6: "La scoperta di tracce di greggio nel sottosuolo tataro apre la strada allo sviluppo del colossale bacino petrolifero Volga-Urali ('Secondo Baku').",
      s7: "Kazan' intensifica la produzione di gomma sintetica, polveri senza fumo e pellicole fotografiche speciali per la ricognizione aerea militare.",
      s8: "La RSSA Tatara è un polo strategico inattaccabile dell'aviazione militare pesante e della chimica bellica nel cuore dell'URSS.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSSA Tatara (Kazan' — Polo Aeronautico sul Volga)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Tatarskoj ASSR — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_24_Tomsk_Oblast": {
    id: "SOV_ADM1_RUS_24_Tomsk_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Tomsk",
    historicalName: "Distretto di Tomsk (Fiume Tom' \u2014 Centro Universitario Siberiano)",
    russianName: "Tomskij okrug \u2014 Novosibirskaja oblast",
    adminTitle: "Tomskij Gorsovet \u2014 RSFSR (URSS)",
    capital: "Tomsk",
    keys: ["adm1_rus_24_tomsk_oblast", "novosibirskaja", "oblast", "okrug", "sov_adm1_rus_24_tomsk_oblast", "tomsk", "tomsk oblast", "tomsk_oblast", "tomskij"],
    notes: {
      s0: "Cuore industriale e minerario della Siberia Occidentale; comprende la metropoli in vertiginosa ascesa di Novosibirsk (capitale amministrativa sul fiume Ob', sede della fabbrica aeronautica n. 153 intitolata a Čkalov), il colossale bacino carbonifero del Kuzbass con le acciaierie giganti KMK di Stalinsk (Novokuzneck), e il polo agricolo-meccanico di Omsk.",
      s1: "Dure purghe dell'NKVD nel Kuzbass contro ingegneri minerari e dirigenti stranieri del polo carbo-siderurgico Ural-Kuzbass; la fabbrica aeronautica n. 153 viene completata e avvia la produzione di caccia Polikarpov I-16.",
      s2: "Il Kuzbass fornisce milioni di tonnellate di carbone da coke di qualità eccelsa per alimentare a ciclo continuo le acciaierie di Magnitogorsk e Sverdlovsk.",
      s3_4: "La fabbrica d'aviazione n. 153 di Novosibirsk produce oltre mille caccia I-16 all'anno, diventando la più prolifica fabbrica di aerei da caccia a est degli Urali.",
      s5: "A Stalinsk (Novokuzneck) entra in funzione il laminatoio per rotaie pesanti e blindature per carri armati; la Siberia occidentale è individuata come il rifugio supremo dell'industria sovietica.",
      s6: "Nel 1940 a Novosibirsk partono le linee di assemblaggio del nuovo caccia moderno LaGG-3; Omsk predispone lo stabilimento n. 174 per la produzione di carri armati.",
      s7: "Piani dettagliati del Gosplan per la creazione di piattaforme ferroviarie di sbarco per centinaia di stabilimenti evacuandi da Ucraina, Bielorussia e Russia europea.",
      s8: "Alla vigilia della guerra, l'asse Novosibirsk-Kuzbass-Omsk è la spina dorsale energetica, metallurgica e aeronautica invulnerabile dell'URSS, pronta ad accogliere il più grande trasferimento industriale della storia umana.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Distretto di Tomsk (Fiume Tom' — Centro Universitario Siberiano)",
    getAdminTitle: (_step: number) => "Tomskij Gorsovet — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_25_Nizhny_Novgorod_Oblast": {
    id: "SOV_ADM1_RUS_25_Nizhny_Novgorod_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Ni\u017enij Novgorod",
    historicalName: "Oblast di Gor'kij (Ni\u017enij Novgorod \u2014 Fabbrica GAZ)",
    russianName: "Gor'kovskaya oblast",
    adminTitle: "Gor'kovskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Gor'kij",
    keys: ["adm1_rus_25_nizhny_novgorod_oblast", "gor'kij", "gorkij", "gorkovskaya", "ninij", "nizhny novgorod oblast", "nizhny_novgorod_oblast", "novgorod", "oblast", "sov_adm1_rus_25_nizhny_novgorod_oblast"],
    notes: {
      s0: "Ribattezzata Gor'kij nel 1932 in onore dello scrittore Maksim Gor'kij; ospita il mastodontico stabilimento automobilistico GAZ (Gor'kovskij Avtomobil'nyj Zavod), fondato in collaborazione con Ford, che produce la maggioranza degli autocarri pesanti GAZ-AA e delle autovetture GAZ-M1 per l'Armata Rossa, oltre ai cantieri navali Krasnoe Sormovo sul Volga.",
      s1: "Le purghe falcidiano gli ingegneri del GAZ e di Sormovo accusati di spionaggio industriale; la direzione della fabbrica passa sotto rigido controllo militare.",
      s2: "La GAZ avvia lo sviluppo dei primi autocarri a trazione integrale e blindati da ricognizione leggeri (BA-10, BA-20) su telai automobilistici rinforzati.",
      s3_4: "I cantieri Krasnoe Sormovo producono sommergibili costieri classe 'Malyutka' e 'Shchuka' per la Flotta del Baltico e del Mar Nero, trasbordati via canale Volga-Baltico.",
      s5: "Durante la Guerra d'Inverno e la spartizione della Polonia, gli autocarri GAZ garantiscono la mobilità motorizzata dell'Armata Rossa lungo le piste innevate e fangose dell'Est europeo.",
      s6: "Nel 1940 la fabbrica aeronautica n. 21 di Gor'kij (Ordžonikidze) viene selezionata per la produzione di serie del modernissimo caccia LaGG-3 sotto la guida dell'ingegnere Semën Lavočkin.",
      s7: "I cantieri Sormovo e la fabbrica GAZ vengono parzialmente convertiti alla produzione bellica urgente di scafi per carri armati T-34 e motori aeronautici.",
      s8: "Alla vigilia del 22 giugno 1941, Gor'kij rappresenta il più imponente polo sovietico per la mobilità motorizzata e la costruzione di aerei da caccia a est di Mosca.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Gor'kij (Nižnij Novgorod — Fabbrica GAZ)",
    getAdminTitle: (_step: number) => "Gor'kovskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_26_Arkhangelsk_Oblast": {
    id: "SOV_ADM1_RUS_26_Arkhangelsk_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Arcangelo",
    historicalName: "Oblast di Arcangelo (Mar Bianco \u2014 Porto di Severodvinsk)",
    russianName: "Arkhangel'skaya oblast",
    adminTitle: "Archangel'skij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Archangel'sk",
    keys: ["adm1_rus_26_arkhangelsk_oblast", "arcangelo", "archangel'sk", "archangelsk", "arkhangelsk oblast", "arkhangelsk_oblast", "arkhangelskaya", "oblast", "sov_adm1_rus_26_arkhangelsk_oblast"],
    notes: {
      s0: "Capitale marittima della Russia settentrionale alla foce della Dvina Settentrionale sul Mar Bianco; porto commerciale storico dell'esportazione di legname e cantieristica; nel 1936 iniziano i lavori segreti per il Cantiere Navale n. 402 a Molotovsk (futura Severodvinsk), destinato alla costruzione di corazzate e sommergibili nucleari.",
      s1: "Istituita come Oblast nel settembre 1937 scorporata dalla Regione del Nord; dure purghe colpiscono la dirigenza marittima e forestale dell'NKVD del Nord.",
      s2: "Il porto di Arcangelo gestisce un volume record di esportazioni di legname e pece verso l'Europa occidentale, rifornendo le casse valutarie dell'URSS.",
      s3_4: "I cantieri navali di Molotovsk procedono febbrilmente nell'allestimento dei primi bacini di carenaggio coperti per navi da guerra pesanti.",
      s5: "Durante la Guerra d'Inverno il porto di Arcangelo e la Flottiglia del Mar Bianco supportano le linee di rifornimento dell'Armata Rossa nell'Artico.",
      s6: "Nel 1940 la città di Molotovsk assume importanza strategica primaria come cantiere navale al sicuro da qualsiasi ricognizione aerea nemica.",
      s7: "Ampliamento dei moli di carico e potenziamento della ferrovia Arcangelo-Vologda-Mosca per il trasporto di combustibile e macchinari pesanti.",
      s8: "Arcangelo è il terminale atlantico e artico di riserva dell'URSS, destinato entro poche settimane ad accogliere il primo convoglio artico alleato ('Operation Dervish') nell'agosto 1941.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Arcangelo (Mar Bianco — Porto di Severodvinsk)",
    getAdminTitle: (_step: number) => "Archangel'skij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_27_Astrakhan_Oblast": {
    id: "SOV_ADM1_RUS_27_Astrakhan_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Astrachan'",
    historicalName: "Distretto di Astrachan' (Delta del Volga \u2014 Mar Caspio)",
    russianName: "Astrakhanskij okrug \u2014 Stalingradskaya oblast",
    adminTitle: "Astrachanskij Okruzhnyj Ispolkom \u2014 RSFSR (URSS)",
    capital: "Astrachan'",
    keys: ["adm1_rus_27_astrakhan_oblast", "astrachan", "astrachan'", "astrakhan oblast", "astrakhan_oblast", "astrakhanskij", "oblast", "okrug", "sov_adm1_rus_27_astrakhan_oblast", "stalingradskaya"],
    notes: {
      s0: "Metropoli fluviale e marittima sul delta del Volga dove il fiume incontra il Caspio; capitale mondiale del caviale di storione, della pesca e del trasbordo fluviale di petrolio e sale.",
      s1: "Le petroliere fluviali di Astrachan' trasportano a nord decine di milioni di tonnellate di petrolio di Baku; dure purghe colpiscono i vertici della flotta del Volga.",
      s2: "Ammodernamento dei cantieri navali Lenin e Kirov per la manutenzione delle navi cisterna e dei rimorchiatori fluviali a grande pescaggio.",
      s3_4: "La città funge da base secondaria della Flottiglia del Caspio e snodo vitale per le merci in transito dall'Iran e dal Medio Oriente.",
      s5: "Durante la guerra in Europa, Astrachan' è la cerniera commerciale indispensabile per mantenere operative le vie d'acqua interne sovietiche.",
      s6: "Avvio dei lavori d'emergenza per la ferrovia Astrachan'-Kizljar, che deve collegare direttamente le raffinerie del Caucaso alla rete russa evitando le strozzature di Rostov.",
      s7: "Sviluppo di difese antiaeree attorno alle cisterne di greggio e ai ponti ferroviari del delta del Volga.",
      s8: "Porto e snodo petrolifero insostituibile: l'interruzione di Astrachan' priverebbe l'URSS del combustibile liquido proveniente da Baku.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Distretto di Astrachan' (Delta del Volga — Mar Caspio)",
    getAdminTitle: (_step: number) => "Astrachanskij Okruzhnyj Ispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_28_Belgorod_Oblast": {
    id: "SOV_ADM1_RUS_28_Belgorod_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Belgorod",
    historicalName: "Distretto di Belgorod (Confine Ucraino \u2014 Bacino del Fiume Donec)",
    russianName: "Belgorodskij okrug \u2014 Kurskaya oblast",
    adminTitle: "Belgorodskij Gorsovet \u2014 RSFSR (URSS)",
    capital: "Belgorod",
    keys: ["adm1_rus_28_belgorod_oblast", "belgorod", "belgorod oblast", "belgorod_oblast", "belgorodskij", "kurskaya", "oblast", "okrug", "sov_adm1_rus_28_belgorod_oblast"],
    notes: {
      s0: "Storica città fortificata di frontiera sui gessi bianchi del fiume Severskij Donec, al confine tra Russia e Ucraina; all'epoca integrata nell'Oblast di Kursk, ricca di cave di gesso, cementifici e ferrovie strategiche.",
      s1: "Dure indagini dell'NKVD contro il personale delle ferrovie e delle cooperative agricole sul confine russo-ucraino.",
      s2: "Potenziamento del corridoio ferroviario Mosca-Kursk-Belgorod-Charkiv, spina dorsale dei trasporti pesanti della Russia meridionale.",
      s3_4: "Le cave e i cementifici di Belgorod riforniscono di materiali da costruzione le piazzeforti militari e le fortificazioni di confine.",
      s5: "Belgorod smista centinaia di treni carichi di grano e materiali metallurgici tra il bacino del Donec e la Russia centrale.",
      s6: "Rafforzamento dei presidi di sicurezza ferroviaria e sorveglianza militare dei nodi di scambio di Prochorovka e Valujki.",
      s7: "Istituzione di magazzini militari sussidiari per il carburante e le derrate alimentari dell'Armata Rossa.",
      s8: "Belgorod costituisce il trampolino ferroviario e logistico diretto verso Charkiv e il Donbass all'alba della guerra.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Distretto di Belgorod (Confine Ucraino — Bacino del Fiume Donec)",
    getAdminTitle: (_step: number) => "Belgorodskij Gorsovet — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_29_Bryansk_Oblast": {
    id: "SOV_ADM1_RUS_29_Bryansk_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Brjansk",
    historicalName: "Distretto di Brjansk (Impianto di Be\u017eica \u2014 Foreste di Brjansk)",
    russianName: "Bryanskij okrug \u2014 Orlovskaya oblast",
    adminTitle: "Brjanskij Gorsovet \u2014 RSFSR (URSS)",
    capital: "Brjansk",
    keys: ["adm1_rus_29_bryansk_oblast", "brjansk", "bryansk oblast", "bryansk_oblast", "bryanskij", "oblast", "okrug", "orlovskaya", "sov_adm1_rus_29_bryansk_oblast"],
    notes: {
      s0: "Cuore delle immense foreste di Brjansk sul fiume Desna; ospita la gigantesca fabbrica meccanica e siderurgica Krasnyj Profintern a Bežica, produttrice di locomotive pesanti, vagoni e treni blindati per l'URSS.",
      s1: "Le purghe dell'NKVD colpiscono le maestranze e i tecnici di Bežica; la fabbrica Krasnyj Profintern viene convertita alla riparazione di mezzi corazzati.",
      s2: "Le boscose foreste di Brjansk vengono mappate dettagliatamente dai comandi militari come terreno ideale per la guerra di movimento e imboscata.",
      s3_4: "Krasnyj Profintern produce vagoni corazzati e piattaforme per l'artiglieria antiaerea pesante dell'Armata Rossa.",
      s5: "Brjansk è un nodo di transito nevralgico per le divisioni sovietiche dirette verso la Bielorussia occidentale e la Polonia occupata.",
      s6: "Sviluppo di depositi forestali segreti di munizioni e carburante nei boschi della Desna per rifornire il fronte occidentale.",
      s7: "Ammodernamento delle ferrovie radiali verso Gomel', Smolensk e Kiev; addestramento di battaglioni territoriali dell'Armata Rossa.",
      s8: "Alla vigilia di Barbarossa, Brjansk è un colosso dell'industria ferroviaria pesante immerso nelle foreste che diventeranno il santuario dei partigiani sovietici.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Distretto di Brjansk (Impianto di Bežica — Foreste di Brjansk)",
    getAdminTitle: (_step: number) => "Brjanskij Gorsovet — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_2_Republic_of_Mordovia": {
    id: "SOV_ADM1_RUS_2_Republic_of_Mordovia",
    republic: "RSFSR",
    modernName: "Repubblica di Mordovia",
    historicalName: "RSSA di Mordovia (Saransk \u2014 Regione dei Boschi di Mok\u0161a)",
    russianName: "Mordovskaya ASSR",
    adminTitle: "Sovet Narodnykh Komissarov Mordovskoj ASSR \u2014 RSFSR (URSS)",
    capital: "Saransk",
    keys: ["adm1_rus_2_republic_of_mordovia", "mordovia", "mordovskaya", "repubblica", "republic of mordovia", "republic_of_mordovia", "saransk", "sov_adm1_rus_2_republic_of_mordovia"],
    notes: {
      s0: "Repubblica autonoma istituita nel 1934 per le popolazioni ugro-finniche dei mordvini (erzja e mokša); centro agricolo, forestale e ferroviario con capitale Saransk.",
      s1: "Le purghe staliniane decapitano il governo autonomo e il comitato provinciale del partito; viene istituito il famigerato complesso di campi di lavoro Temlag (Gulag di Temnikov).",
      s2: "I prigionieri del Temlag vengono impiegati nello sfruttamento intensivo delle foreste di quercia e pino per le commesse dell'Armata Rossa.",
      s3_4: "Sviluppo di industrie per la lavorazione della canapa e del lino destinate alla produzione di corde navali e teloni militari.",
      s5: "Saransk funge da nodo ferroviario di smistamento truppe verso ovest e accoglie i primi convogli di sfollati ed evacuati.",
      s6: "Installazione di officine meccaniche ausiliarie per la riparazione di autocarri e vagoni ferroviari.",
      s7: "Ampliamento dei campi di detenzione e potenziamento della produzione alimentare nei kolchoz mordvini.",
      s8: "La Mordovia è una salda base agricola e forestale della Russia centrale, pronta alla mobilitazione generale.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSSA di Mordovia (Saransk — Regione dei Boschi di Mokša)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Mordovskoj ASSR — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_30_Buryatia": {
    id: "SOV_ADM1_RUS_30_Buryatia",
    republic: "RSFSR",
    modernName: "Repubblica di Buriazia",
    historicalName: "RSSA Buriato-Mongola (Ulan-Ud\u00e8 \u2014 Fabbrica di Locomotive LVRZ)",
    russianName: "Buryat-Mongol'skaya ASSR",
    adminTitle: "Sovet Narodnykh Komissarov Burjat-Mongol'skoj ASSR \u2014 RSFSR (URSS)",
    capital: "Ulan-Ud\u00e8",
    keys: ["adm1_rus_30_buryatia", "buriazia", "buryatia", "buryatmongolskaya", "repubblica", "sov_adm1_rus_30_buryatia", "ulan-udè", "ulanud"],
    notes: {
      s0: "Quartier Generale del Distretto Militare Transbajkalico (ZabVO) a Čita e cerniera strategica a est del Lago Bajkal confinante con la Mongolia e la Manciuria; a Ulan-Udè opera il colosso della costruzione e riparazione locomotive LVRZ.",
      s1: "Le purghe dell'NKVD eliminano decine di ufficiali transbajkalici e quadri del comitato di partito mongolo-buriato accusati di 'panturanismo' e spionaggio giapponese.",
      s2: "Militarizzazione accelerata della frontiera mongola: il comando di Čita predispone piani d'intervento immediato in territorio mongolo in base al Trattato di Mutua Assistenza sovietico-mongolo del 1936.",
      s3_4: "Nel maggio-settembre 1939 il comando di Čita coordina la titanica Battaglia di Chalchin Gol (Khalkhin Gol): il generale Georgij Žukov assume il comando del 1º Gruppo d'Armate Sovietico-Mongolo e sferra una brillante manovra a tenaglia corazzata che annienta la 6ª Armata giapponese del Kwantung, stroncando le mire espansionistiche nipponiche verso la Siberia.",
      s5: "Žukov viene promosso Generale d'Armata e nominato Eroe dell'Unione Sovietica a Mosca; la Transbajkalia consolida le difese mongole e transiberiane.",
      s6: "LVRZ a Ulan-Udè amplia le officine alla produzione di aeroplani militari e parti di ricambio pesanti per i mezzi cingolati dell'Armata Rossa.",
      s7: "Dispiegamento di divisioni corazzate e fucilieri siberiani perfettamente addestrati alle condizioni di freddo estremo.",
      s8: "Grazie al Patto di Neutralità con Tokyo del 13 aprile 1941, le divisioni d'élite del Distretto Transbajkalico si preparano a diventare la riserva strategica d'oro dell'URSS in vista dell'urto con la Wehrmacht.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSSA Buriato-Mongola (Ulan-Udè — Fabbrica di Locomotive LVRZ)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Burjat-Mongol'skoj ASSR — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_31_Chechnya": {
    id: "SOV_ADM1_RUS_31_Chechnya",
    republic: "RSFSR",
    modernName: "Repubblica Cecena",
    historicalName: "RSSA Ceceno-Inguscia (Groznyj \u2014 Bacino Petrolifero del Caucaso)",
    russianName: "Checheno-Ingushskaya ASSR",
    adminTitle: "Sovet Narodnykh Komissarov \u010ce\u010deno-Ingu\u0161skoj ASSR \u2014 RSFSR (URSS)",
    capital: "Groznyj",
    keys: ["adm1_rus_31_chechnya", "cecena", "chechenoingushskaya", "chechnya", "groznyj", "repubblica", "sov_adm1_rus_31_chechnya"],
    notes: {
      s0: "Repubblica autonoma istituita nel 1936 con la fusione di Cecenia e Inguscezia; la capitale Groznyj è il secondo centro petrolifero dell'URSS dopo Baku, collegata da oleodotti strategici a Tuapse sul Mar Nero e Trudovaja nel Donbass, con raffinerie all'avanguardia per benzina avio ad alto numero di ottani.",
      s1: "Dure repressioni dell'NKVD colpiscono le popolazioni montane cecene e ingusce sospettate di ribellione antisovietica e banditismo montano (abreki); dirigenti locali vengono fucilati.",
      s2: "Rafforzamento della sorveglianza militare sui pozzi di Groznyj e sulle linee ferroviarie transcaucasiche; massiccio impiego di geologi per nuove prospezioni petrolifere.",
      s3_4: "Le raffinerie di Groznyj producono il carburante essenziale per i caccia e i bombardieri sovietici impegnati nei conflitti di frontiera in Asia.",
      s5: "Il petrolio raffinato di Groznyj rifornisce le armate sovietiche in Polonia e Carelia e costituisce una quota primaria delle esportazioni verso la Germania stabilite dagli accordi del 1939-1940.",
      s6: "Nel 1940 scoppiano focolai di guerriglia antisovietica sulle montagne cecene guidati da Chasan Israilov; l'NKVD intensifica i presidi di sicurezza armata attorno ai pozzi petroliferi.",
      s7: "Le raffinerie operano al massimo regime tecnologico per la produzione di carburante sintetico e lubrificanti resistenti alle basse temperature per i nuovi motori del T-34 e dei caccia VVS.",
      s8: "Alla vigilia dell'attacco tedesco, Groznyj è un obiettivo strategico di valore supremo per qualsiasi piano operativo della Wehrmacht verso il Caucaso.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSSA Ceceno-Inguscia (Groznyj — Bacino Petrolifero del Caucaso)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Čečeno-Ingušskoj ASSR — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_32_Chelyabinsk_Oblast": {
    id: "SOV_ADM1_RUS_32_Chelyabinsk_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di \u010celjabinsk",
    historicalName: "Oblast di \u010celjabinsk (Magnitogorsk \u2014 Futura Tankograd)",
    russianName: "Chelyabinskaya oblast",
    adminTitle: "\u010celjabinskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "\u010celjabinsk",
    keys: ["adm1_rus_32_chelyabinsk_oblast", "chelyabinsk oblast", "chelyabinsk_oblast", "chelyabinskaya", "eljabinsk", "oblast", "sov_adm1_rus_32_chelyabinsk_oblast", "čeljabinsk"],
    notes: {
      s0: "Gigantesco polo siderurgico e meccanico degli Urali meridionali; comprende la leggendaria città dell'acciaio di Magnitogorsk (MMK - Magnitogorskij Metallurgičeskij Kombinat), costruita ai piedi della montagna di ferro Magnetnaja dal 1929, e il Trattorificio di Čeljabinsk (ChTZ), colosso dei trattori cingolati pesanti Stalinets S-60 e S-65.",
      s1: "Le purghe staliniane colpiscono pesantemente i dirigenti stranieri e sovietici di Magnitogorsk e ChTZ; ciononostante la produzione di ghisa e acciaio grezzo tocca vertici mondiali.",
      s2: "I trattori pesanti diesel S-65 di ChTZ vengono convertiti massicciamente come trattori d'artiglieria pesante per trainare i cannoni d'assedio dell'Armata Rossa.",
      s3_4: "A ChTZ viene avviata la riconversione parziale delle officine per la produzione di telai e trasmissioni per carri armati pesanti sperimentali della serie KV.",
      s5: "Con il Patto Molotov-Ribbentrop e lo scoppio della guerra europea, l'Oblast diventa il principale fornitore di acciaio al nichel e al cromo per la produzione bellica sovietica.",
      s6: "Nel 1940 a ChTZ viene avviata ufficialmente la linea di montaggio del poderoso carro pesante KV-1 (Kliment Vorošilov), con corazzatura da 75 mm a prova di qualsiasi cannone anticarro esistente.",
      s7: "Piani segreti del Commissariato dell'Industria Pesante per trasformare Čeljabinsk in 'Tankograd' (Città dei Carri Armati), concentrando qui gli impianti evacuati da Leningrado (fabbrica Kirov) e Charkiv.",
      s8: "A poche settimane dall'inizio di Barbarossa, Čeljabinsk è la spina dorsale della produzione di carri armati pesanti e dell'acciaio speciale dell'Unione Sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Čeljabinsk (Magnitogorsk — Futura Tankograd)",
    getAdminTitle: (_step: number) => "Čeljabinskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_33_Chuvashia": {
    id: "SOV_ADM1_RUS_33_Chuvashia",
    republic: "RSFSR",
    modernName: "Repubblica Ciuvascia",
    historicalName: "RSSA Ciuvascia (\u010ceboksary \u2014 Fiume Volga)",
    russianName: "Chuvashskaya ASSR",
    adminTitle: "Sovet Narodnykh Komissarov Chuvashskoj ASSR \u2014 RSFSR (URSS)",
    capital: "\u010ceboksary",
    keys: ["adm1_rus_33_chuvashia", "chuvashia", "chuvashskaya", "ciuvascia", "eboksary", "repubblica", "sov_adm1_rus_33_chuvashia", "čeboksary"],
    notes: {
      s0: "Repubblica della valle del Volga popolata dal popolo turcofono dei ciuvasci; la capitale Čeboksary è un fiorente porto fluviale con industrie tessili, molitorie e del legno.",
      s1: "Le purghe dell'NKVD investono gli intellettuali e i linguisti ciuvasci; viene imposta l'ortografia cirillica standardizzata e la russificazione dei programmi scolastici.",
      s2: "Sviluppo di cooperative boschive per la fornitura di traversine ferroviarie e legname per i cantieri della Volga.",
      s3_4: "Istituzione di stabilimenti per la lavorazione di componenti in legno per aerei e veicoli militari dell'Armata Rossa.",
      s5: "I kolchoz ciuvasci incrementano la produzione di cereali e luppolo, essenziali per le derrate alimentari dell'URSS mobilitata.",
      s6: "Costruzione di banchine fluviali rinforzate a Čeboksary per la sosta e il rifornimento dei convogli navali carichi di rifornimenti bellici.",
      s7: "Pianificazione dell'accoglienza di stabilimenti tessili ed elettrici da Mosca ed Elenaburg/Leningrado.",
      s8: "La Ciuvascia costituisce un anello saldo della linea di retrovia del Volga, integrata nell'economia pianificata dello Stato sovietico.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSSA Ciuvascia (Čeboksary — Fiume Volga)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Chuvashskoj ASSR — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_34_Tyumen_Oblast": {
    id: "SOV_ADM1_RUS_34_Tyumen_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Tjumen'",
    historicalName: "Distretto di Tjumen' (Fiume Tura \u2014 Prima Citt\u00e0 della Siberia)",
    russianName: "Tjumenskij okrug \u2014 Omskaya oblast",
    adminTitle: "Tjumenskij Gorsovet \u2014 RSFSR (URSS)",
    capital: "Tjumen'",
    keys: ["adm1_rus_34_tyumen_oblast", "oblast", "okrug", "omskaya", "sov_adm1_rus_34_tyumen_oblast", "tjumen", "tjumen'", "tjumenskij", "tyumen oblast", "tyumen_oblast"],
    notes: {
      s0: "Cuore industriale e minerario della Siberia Occidentale; comprende la metropoli in vertiginosa ascesa di Novosibirsk (capitale amministrativa sul fiume Ob', sede della fabbrica aeronautica n. 153 intitolata a Čkalov), il colossale bacino carbonifero del Kuzbass con le acciaierie giganti KMK di Stalinsk (Novokuzneck), e il polo agricolo-meccanico di Omsk.",
      s1: "Dure purghe dell'NKVD nel Kuzbass contro ingegneri minerari e dirigenti stranieri del polo carbo-siderurgico Ural-Kuzbass; la fabbrica aeronautica n. 153 viene completata e avvia la produzione di caccia Polikarpov I-16.",
      s2: "Il Kuzbass fornisce milioni di tonnellate di carbone da coke di qualità eccelsa per alimentare a ciclo continuo le acciaierie di Magnitogorsk e Sverdlovsk.",
      s3_4: "La fabbrica d'aviazione n. 153 di Novosibirsk produce oltre mille caccia I-16 all'anno, diventando la più prolifica fabbrica di aerei da caccia a est degli Urali.",
      s5: "A Stalinsk (Novokuzneck) entra in funzione il laminatoio per rotaie pesanti e blindature per carri armati; la Siberia occidentale è individuata come il rifugio supremo dell'industria sovietica.",
      s6: "Nel 1940 a Novosibirsk partono le linee di assemblaggio del nuovo caccia moderno LaGG-3; Omsk predispone lo stabilimento n. 174 per la produzione di carri armati.",
      s7: "Piani dettagliati del Gosplan per la creazione di piattaforme ferroviarie di sbarco per centinaia di stabilimenti evacuandi da Ucraina, Bielorussia e Russia europea.",
      s8: "Alla vigilia della guerra, l'asse Novosibirsk-Kuzbass-Omsk è la spina dorsale energetica, metallurgica e aeronautica invulnerabile dell'URSS, pronta ad accogliere il più grande trasferimento industriale della storia umana.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Distretto di Tjumen' (Fiume Tura — Prima Città della Siberia)",
    getAdminTitle: (_step: number) => "Tjumenskij Gorsovet — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_35_North_Ossetia_Alania": {
    id: "SOV_ADM1_RUS_35_North_Ossetia_Alania",
    republic: "RSFSR",
    modernName: "Repubblica dell'Ossezia Settentrionale-Alania",
    historicalName: "RSSA dell'Ossezia Settentrionale (Ord\u017eonikidze / Vladikavkaz)",
    russianName: "Severo-Osetinskaya ASSR",
    adminTitle: "Sovet Narodnykh Komissarov Severo-Osetinskoj ASSR \u2014 RSFSR (URSS)",
    capital: "Ord\u017eonikidze",
    keys: ["adm1_rus_35_north_ossetia_alania", "dellossezia", "north ossetia alania", "north_ossetia_alania", "ordonikidze", "ordžonikidze", "repubblica", "settentrionalealania", "severoosetinskaya", "sov_adm1_rus_35_north_ossetia_alania"],
    notes: {
      s0: "Capitale della storica Vladikavkaz, ribattezzata Ordžonikidze nel 1931 in onore del leader rivoluzionario caucasico Sergo Ordžonikidze; snodo fondamentale della celebre Strada Militare Georgiana attraverso la Gola di Darial verso Tbilisi e sede di industrie per la fusione di piombo e zinco (Elektrocink).",
      s1: "Dure purghe colpiscono il partito e gli intellettuali osseti dopo la misteriosa morte di Ordžonikidze a Mosca nel febbraio 1937.",
      s2: "Lo stabilimento Elektrocink produce oltre la metà del piombo raffinato dell'URSS, componente indispensabile per munizioni e batterie militari.",
      s3_4: "La guarnigione militare e le scuole ufficiali di fanteria di Ordžonikidze preparano i quadri per le divisioni di montagna dell'Armata Rossa.",
      s5: "Elektrocink intensifica la produzione di zinco e leghe leggere per le blindature dei nuovi modelli di aerei da combattimento.",
      s6: "Fortificazione degli sbocchi della Gola di Darial e controllo stringente del transito militare verso la Transcaucasia.",
      s7: "Sviluppo di depositi di munizionamento e materiali strategici nella valle del Terek a protezione delle comunicazioni con la Georgia.",
      s8: "Ordžonikidze funge da perno della difesa e produzione metallurgica non ferrosa del Caucaso centrale alla vigilia del conflitto.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSSA dell'Ossezia Settentrionale (Ordžonikidze / Vladikavkaz)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Severo-Osetinskoj ASSR — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_36_Penza_Oblast": {
    id: "SOV_ADM1_RUS_36_Penza_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Penza",
    historicalName: "Oblast di Penza (Regione del Fiume Sura \u2014 Fabbrica ZIF)",
    russianName: "Penzenskaya oblast",
    adminTitle: "Penzenskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Penza",
    keys: ["adm1_rus_36_penza_oblast", "oblast", "penza", "penza oblast", "penza_oblast", "penzenskaya", "sov_adm1_rus_36_penza_oblast"],
    notes: {
      s0: "Regione agricola e meccanica della Russia centrale sul fiume Sura; a Penza ha sede la storica fabbrica di biciclette e spolette per munizioni ZIF (Zavod imeni Frunze) e la fabbrica di orologi di precisione Čajka.",
      s1: "Nel febbraio 1939 viene ufficialmente istituita l'Oblast di Penza scorporata da Tambov e Saratov; l'NKVD intensifica il controllo sulla produzione di spolette per granate.",
      s2: "Sviluppo di coltivazioni estensive di barbabietola da zucchero e foraggi per il bestiame statale.",
      s3_4: "La fabbrica ZIF converte gran parte delle officine alla produzione in serie di detonatori, spolette a tempo e spolette d'impatto per l'artiglieria dell'Armata Rossa.",
      s5: "Forniture record di munizionamento e meccanismi a orologeria per le esigenze delle forze armate sovietiche mobilitate a occidente.",
      s6: "Installazione di officine per la produzione di macchine tessili e attrezzature per la sanità militare.",
      s7: "Pianificazione dell'accoglienza di stabilimenti chimici e meccanici da Kiev e Voronež.",
      s8: "L'Oblast di Penza è un perno essenziale della produzione di componentistica per esplosivi e munizionamento pesante.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Penza (Regione del Fiume Sura — Fabbrica ZIF)",
    getAdminTitle: (_step: number) => "Penzenskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_37_Amur_Oblast": {
    id: "SOV_ADM1_RUS_37_Amur_Oblast",
    republic: "RSFSR",
    modernName: "Oblast dell'Amur",
    historicalName: "Oblast dell'Amur (Blagove\u0161\u010densk \u2014 Frontiera sul Fiume Amur con la Manciuria)",
    russianName: "Amurskaya oblast \u2014 Khabarovskij kraj",
    adminTitle: "Amurskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Blagove\u0161\u010densk",
    keys: ["adm1_rus_37_amur_oblast", "amur oblast", "amur_oblast", "amurskaya", "blagoveensk", "blagoveščensk", "dellamur", "khabarovskij", "oblast", "sov_adm1_rus_37_amur_oblast"],
    notes: {
      s0: "Vasto e strategico Estremo Oriente sovietico affacciato sul Pacifico settentrionale e sull'Oceano Artico; comprende il Territorio di Chabarovsk sull'Amur, il cantiere navale n. 199 e l'impianto aeronautico n. 126 nella neo-fondata 'città della gioventù' Komsomol'sk-na-Amure (1932), la frontiera mancese lungo l'Amur a Blagoveščensk, l'Oblast Autonoma Ebraica di Birobidžan, l'isola di Sachalin settentrionale con i pozzi di Ocha (concessi in parte al Giappone), la penisola di Kamčatka e il famigerato trust minerario Dal'stroj dell'NKVD nella Kolyma (Magadan).",
      s1: "La Kolyma e i campi del Sevvostlag a Magadan accolgono decine di migliaia di prigionieri politici costretti all'estrazione dell'oro fluviale nel gelo artico; dure purghe colpiscono l'Oblast dell'Amur e Chabarovsk.",
      s2: "Komsomol'sk-na-Amure vara i primi cacciatorpediniere e produce bombardieri Il-4 nel cuore della taiga dell'Estremo Oriente.",
      s3_4: "Le riserve auree estratte dalla Kolyma garantiscono all'URSS le valute estere necessarie per l'acquisto di macchinari industriali avanzati e materie prime strategiche.",
      s5: "Chabarovsk coordina la sorveglianza militare contro la potente Armata del Kwantung schierata oltre il fiume Amur in Manciuria.",
      s6: "Sviluppo di difese costiere nella baia dell'Avača a Petropavlovsk-Kamčatskij e aeroporti avanzati a guardia dello Stretto di Bering verso l'Alaska.",
      s7: "A Ocha (Sachalin) l'NKVD controlla strettamente i pozzi petroliferi, limitando le concessioni giapponesi e reindirizzando il greggio alla flotta sovietica.",
      s8: "Il Patto di Neutralità con il Giappone dell'aprile 1941 assicura una tregua vitale lungo l'immenso arco del Pacifico, permettendo all'Estremo Oriente sovietico di concentrarsi sul rifornimento di oro, navi e petrolio alla patria minacciata a occidente.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast dell'Amur (Blagoveščensk — Frontiera sul Fiume Amur con la Manciuria)",
    getAdminTitle: (_step: number) => "Amurskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_38_Kabardino_Balkaria": {
    id: "SOV_ADM1_RUS_38_Kabardino_Balkaria",
    republic: "RSFSR",
    modernName: "Repubblica di Cabardino-Balcaria",
    historicalName: "RSSA Cabardino-Balcara (Nal'\u010dik \u2014 Monte Elbrus e Miniere di Tyrnyauz)",
    russianName: "Kabardino-Balkarskaya ASSR",
    adminTitle: "Sovet Narodnykh Komissarov Kabardino-Balkarskoj ASSR \u2014 RSFSR (URSS)",
    capital: "Nal'\u010dik",
    keys: ["adm1_rus_38_kabardino_balkaria", "cabardinobalcaria", "kabardino balkaria", "kabardino_balkaria", "kabardinobalkarskaya", "nal'čik", "nalik", "repubblica", "sov_adm1_rus_38_kabardino_balkaria"],
    notes: {
      s0: "Repubblica caucasica che ospita la vetta più alta d'Europa, il Monte Elbrus (5.642 m); a Nal'čik e lungo la valle del Baksan sorgono ricche piantagioni agricole e l'Istituto di Ricerca Alpina dell'URSS.",
      s1: "Nel 1937 iniziano i lavori pionieristici per l'apertura del mastodontico combinato minerario di Tyrnyauz a 2.800 metri di quota, ricchissimo di tungsteno e molibdeno.",
      s2: "L'NKVD epura i quadri dirigenti cabardini e balcari, intensificando i lavori forzati per la costruzione della strada d'alta montagna verso Tyrnyauz.",
      s3_4: "Istituzione di battaglioni speciali di alpini e guide dell'Armata Rossa addestrati sui ghiacciai dell'Elbrus e del Piccolo Caucaso.",
      s5: "L'avvio dell'estrazione di tungsteno a Tyrnyauz assume valore supremo per la produzione di proiettili perforanti anticarro e acciai ultra-resistenti per l'industria sovietica.",
      s6: "Nel 1940 entra in funzione la prima sezione del combinato di Tyrnyauz, liberando l'URSS dalla dipendenza da importazioni estere di molibdeno.",
      s7: "Nal'čik diventa un centro primario per l'addestramento invernale e montano delle truppe dell'Armata Rossa destinate ai fronti settentrionali.",
      s8: "La repubblica protegge il cuore minerario del molibdeno sovietico, risorsa indispensabile per la costruzione dei carri T-34 e cannoni pesanti.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSSA Cabardino-Balcara (Nal'čik — Monte Elbrus e Miniere di Tyrnyauz)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Kabardino-Balkarskoj ASSR — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_39_Krasnodar_Krai": {
    id: "SOV_ADM1_RUS_39_Krasnodar_Krai",
    republic: "RSFSR",
    modernName: "Territorio di Krasnodar",
    historicalName: "Territorio di Krasnodar (Kuban' \u2014 Porto di Novorossijsk)",
    russianName: "Krasnodarskij kraj",
    adminTitle: "Krasnodarskij Kraiispolkom \u2014 RSFSR (URSS)",
    capital: "Krasnodar",
    keys: ["adm1_rus_39_krasnodar_krai", "krasnodar", "krasnodar krai", "krasnodar_krai", "krasnodarskij", "sov_adm1_rus_39_krasnodar_krai", "territorio"],
    notes: {
      s0: "Granaio d'Europa nella fertile pianura del fiume Kuban'; comprende il porto commerciale e navale di Novorossijsk sul Mar Nero (colossale terminal per l'esportazione di grano e cemento) e la penisola di Taman' a controllo dello Stretto di Kerč'.",
      s1: "Istituito come Krai nel settembre 1937; la collettivizzazione agricola forzata e le purghe del partito colpiscono i kolchoz cosacchi del Kuban' e i portuali di Novorossijsk.",
      s2: "Riorganizzazione delle divisioni di cavalleria cosacca del Kuban' che sfilano a Mosca e vengono equipaggiate con armamenti moderni dell'Armata Rossa.",
      s3_4: "I cantieri di Novorossijsk e Tuapse fungono da basi avanzate per i cacciatorpediniere e le motosiluranti della Flotta del Mar Nero.",
      s5: "L'enorme produzione cerealicola del Kuban' viene mobilitata dallo Stato per garantire le riserve strategiche dell'URSS e adempiere alle forniture del trattato economico con la Germania.",
      s6: "Sviluppo di difese costiere e batterie d'artiglieria pesante a Novorossijsk e Gelendžik a protezione del litorale caucasico del Mar Nero.",
      s7: "Potenziamento delle raffinerie di Tuapse collegate tramite oleodotto ai pozzi di Majkop e Groznyj; addestramento della fanteria di marina a Taman'.",
      s8: "Il Kuban' rappresenta la retrovia agricola e logistica essenziale per la Flotta del Mar Nero e la sicurezza del Caucaso occidentale.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Territorio di Krasnodar (Kuban' — Porto di Novorossijsk)",
    getAdminTitle: (_step: number) => "Krasnodarskij Kraiispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_3_Tula_Oblast": {
    id: "SOV_ADM1_RUS_3_Tula_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Tula",
    historicalName: "Oblast di Tula (Fabbrica d'Armi TOZ \u2014 Arsenale Storico di Russia)",
    russianName: "Tul'skaya oblast",
    adminTitle: "Tul'skij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Tula",
    keys: ["adm1_rus_3_tula_oblast", "oblast", "sov_adm1_rus_3_tula_oblast", "tula", "tula oblast", "tula_oblast", "tulskaya"],
    notes: {
      s0: "Antico arsenale della Russia zarista e sovietica fondato da Pietro il Grande sul fiume Upa; sede della leggendaria fabbrica d'armi TOZ (Tul'skij Oružejnyj Zavod) produttrice del fucile Mosin-Nagant 1891/30, della pistola TT Tokarev e del revolver Nagant, nonché delle mitragliatrici Maxim.",
      s1: "Sotto l'Ežovščina la fabbrica d'armi TOZ viene sottoposta a indagini draconiane dell'NKVD per scovare presunti sabotatori delle munizioni; le quote produttive vengono aumentate d'autorità.",
      s2: "A Tula parte la produzione del fucile semiautomatico SVT-38 progettato da Fëdor Tokarev, destinato a diventare la nuova arma d'ordinanza dei tiratori scelti e dei capisquadra sovietici.",
      s3_4: "Istituzione dell'Oblast autonoma di Tula nel 1937 scorporata dalla regione di Mosca; ammodernamento delle miniere di lignite del bacino carbonifero sub-moscovita.",
      s5: "TOZ e gli arsenali sussidiari producono milioni di fucili e decine di milioni di cartucce 7,62x54 mm R per la campagna polacca e la Guerra d'Inverno; entra in linea il fucile perfezionato SVT-40.",
      s6: "Sviluppo di nuove officine metallurgiche per canne di cannone contraereo e proiettili d'artiglieria; Tula intensifica i turni di lavoro h24 per colmare le carenze riscontrate in Finlandia.",
      s7: "Gli operai armaioli di Tula lavorano al riarmo totale delle nuove divisioni dell'Armata Rossa istituite in vista della minaccia tedesca.",
      s8: "Alla vigilia dell'attacco tedesco, Tula è il santuario dell'industria delle armi leggere dell'URSS, pronta a trasformarsi in baluardo fortificato a sbarramento della direttrice meridionale di Mosca.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Tula (Fabbrica d'Armi TOZ — Arsenale Storico di Russia)",
    getAdminTitle: (_step: number) => "Tul'skij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_40_Kursk_Oblast": {
    id: "SOV_ADM1_RUS_40_Kursk_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Kursk",
    historicalName: "Oblast di Kursk (Anomalia Magnetica di Kursk \u2014 KMA)",
    russianName: "Kurskaya oblast",
    adminTitle: "Kurskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Kursk",
    keys: ["adm1_rus_40_kursk_oblast", "kursk", "kursk oblast", "kursk_oblast", "kurskaya", "oblast", "sov_adm1_rus_40_kursk_oblast"],
    notes: {
      s0: "Regione agricola e mineraria della Russia meridionale, sede della leggendaria Anomalia Magnetica di Kursk (KMA), il più grande bacino di minerali di ferro al mondo, scoperto per la deviazione dell'ago della bussola; comprende miniere a cielo aperto e snodi ferroviari verso l'Ucraina.",
      s1: "Intensa repressione dell'NKVD contro presunti sabotatori delle prospezioni minerarie della KMA e funzionari del commercio cerealicolo.",
      s2: "Ampliamento delle miniere di ferro di Korobkovo e Gubkin e raddoppio della linea ferroviaria Kursk-Charkiv.",
      s3_4: "Il minerale di ferro ad altissimo tenore di Kursk alimenta gli altiforni del Donbass e delle acciaierie di Lipeck e Tula.",
      s5: "I kolchoz di Kursk forniscono grano e carne per l'esercito mobilitato a occidente; le stazioni di Kursk smistano decine di convogli militari al giorno.",
      s6: "Potenziamento delle officine di riparazione materiale rotabile e allestimento di piazzeforti difensive territoriali.",
      s7: "Sviluppo di depositi sotterranei di munizioni per l'Armata Rossa lungo la direttrice Orel-Kursk-Belgorod.",
      s8: "Alla vigilia della guerra, Kursk è un crocevia ferroviario cruciale tra Mosca, l'Ucraina e il Donbass, destinato a diventare due anni dopo il teatro della più grande battaglia di carri della storia.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Kursk (Anomalia Magnetica di Kursk — KMA)",
    getAdminTitle: (_step: number) => "Kurskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_41_Mari_El": {
    id: "SOV_ADM1_RUS_41_Mari_El",
    republic: "RSFSR",
    modernName: "Repubblica dei Mari (Mari El)",
    historicalName: "RSSA dei Mari (Jo\u0161kar-Ola \u2014 Foreste del Volga)",
    russianName: "Mariyskaya ASSR",
    adminTitle: "Sovet Narodnykh Komissarov Marijskoj ASSR \u2014 RSFSR (URSS)",
    capital: "Jo\u0161kar-Ola",
    keys: ["adm1_rus_41_mari_el", "jokarola", "joškar-ola", "mari el", "mari_el", "mariyskaya", "repubblica", "sov_adm1_rus_41_mari_el"],
    notes: {
      s0: "Repubblica autonoma della taiga del Volga popolata dal popolo ugro-finnico dei mari; la capitale Joškar-Ola ('Città Rossa', ex Carjovokokšajsk) ospita colossali cartiere e segherie a Volžsk.",
      s1: "Nel 1936 la regione viene elevata a RSSA; durissime purghe staliniane eliminano gli scrittori e i maestri della cultura mari.",
      s2: "La cartiera di Marbumprom a Volžsk diventa il principale fornitore di carta da stampa e cellulosa per le pubblicazioni di partito dell'URSS.",
      s3_4: "Forniture di legno speciale e cellulosa per la produzione di polvere da sparo e propellenti per munizioni pesanti.",
      s5: "Sfruttamento intensivo delle foreste per traversine ferroviarie a supporto della mobilitazione militare dell'URSS.",
      s6: "Installazione di stabilimenti per la lavorazione di compensato aeronautico (delta-drèvesina) impiegato nella costruzione dei caccia LaGG-3 e Yak-1.",
      s7: "Joškar-Ola accoglie i primi uffici scientifici ed evacuati di istituti ottici da Leningrado.",
      s8: "La repubblica rappresenta un centro primario della silvicoltura e della cellulosa strategica nel cuore della Russia europea.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSSA dei Mari (Joškar-Ola — Foreste del Volga)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Marijskoj ASSR — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_42_Moscow": {
    id: "SOV_ADM1_RUS_42_Moscow",
    republic: "RSFSR",
    modernName: "Mosca (Citt\u00e0 Federale)",
    historicalName: "Mosca (Moskva \u2014 Cremlino e Capitale dell'URSS)",
    russianName: "Gorod Moskva",
    adminTitle: "Moskovskij Gorsovet \u2014 Capitale dell'URSS e della RSFSR",
    capital: "Moskva",
    keys: ["adm1_rus_42_moscow", "gorod", "mosca", "moscow", "moskva", "sov_adm1_rus_42_moscow"],
    notes: {
      s0: "Capitale dell'Unione Sovietica e cuore pulsante del potere bolscevico; nel Cremlino si riuniscono il Politburo e il Segretario Generale Iosif Stalin. Nel 1936 viene approvata la Costituzione Sovietica ('Costituzione di Stalin') e completata la prima linea della metropolitana (Metropoliten Kaganovič), simbolo del trionfo socialista. Viene avviato l'invio segreto di consiglieri militari, piloti e carri armati T-26 in Spagna per sostenere la Repubblica.",
      s1: "Apice del Grande Terrore (Ežovščina) guidato dal capo dell'NKVD Nikolaj Ežov: si celebrano nella Sala delle Colonne della Casa dei Sindacati i grandi processi pubblici di Mosca contro Bucharin, Rykov e Jagoda, che completano l'epurazione dei 'vecchi bolscevichi' e la decapitazione dei vertici militari dell'Armata Rossa.",
      s2: "Profonda costernazione al Cremlino per la Conferenza di Monaco (settembre 1938), in cui Regno Unito e Francia escludono l'URSS dal tavolo dei negoziati europei; Stalin e Molotov riconsiderano radicalmente la politica di sicurezza collettiva di Litvinov. Celebrazione trionfale della vittoria contro i giapponesi al Lago Chasan.",
      s3_4: "Nel maggio 1939 Stalin sostituisce il Commissario agli Esteri Maksim Litvinov con il suo fedelissimo Vjačeslav Molotov, segnalando a Berlino e a Londra una svolta drastica della diplomazia sovietica. La città ospita negoziati paralleli con le missioni militari anglo-francesi e contatti economici riservati con la Germania.",
      s5: "Il 23 agosto 1939, al Cremlino, Molotov e Joachim von Ribbentrop firmano alla presenza di Stalin il Patto di non aggressione sovietico-tedesco con protocollo segreto che spartisce l'Europa orientale. Il 17 settembre Mosca ordina l'invasione della Polonia orientale; in inverno coordina la Guerra d'Inverno contro la Finlandia che porta all'espulsione dell'URSS dalla Società delle Nazioni.",
      s6: "Il Cremlino sfrutta la caduta della Francia per inviare gli ultimatum di annessione ai tre governi baltici (Estonia, Lettonia, Lituania) e alla Romania per la Bessarabia. Il 21 agosto 1940 l'agente dell'NKVD Ramón Mercader porta a termine a Coyoacán l'assassinio dell'acerrimo rivale di Stalin, Lev Trockij, pianificato da Mosca.",
      s7: "Negoziati ad altissima tensione: Molotov si reca a Berlino nel novembre 1940 per colloqui con Hitler, rivendicando il controllo sovietico su Bulgaria, Finlandia e Stretti dei Dardanelli, ma il fallimento delle trattative spinge Hitler a firmare la Direttiva 21 (Barbarossa). Mosca accelera la costruzione di fortificazioni e la produzione di carri pesanti.",
      s8: "Il 13 aprile 1941, al Cremlino, Stalin e il ministro degli esteri giapponese Matsuoka firmano lo storico Patto di Neutralità quinquennale che garantisce le spalle dell'URSS in Estremo Oriente. Nonostante i precisi rapporti d'allarme dell'intelligence e di Richard Sorge su un imminente attacco nazista, Stalin ordina di evitare qualsiasi 'provocazione' che possa scatenare il conflitto.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Mosca (Moskva — Cremlino e Capitale dell'URSS)",
    getAdminTitle: (_step: number) => "Moskovskij Gorsovet — Capitale dell'URSS e della RSFSR",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_43_Moscow_Oblast": {
    id: "SOV_ADM1_RUS_43_Moscow_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Mosca",
    historicalName: "Oblast di Mosca (Moskovskaja Oblast')",
    russianName: "Moskovskaya oblast",
    adminTitle: "Moskovskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Moskva",
    keys: ["adm1_rus_43_moscow_oblast", "mosca", "moscow oblast", "moscow_oblast", "moskovskaya", "moskva", "oblast", "sov_adm1_rus_43_moscow_oblast"],
    notes: {
      s0: "Cuore industriale e tecnologico della Russia centrale, che circonda la capitale sovietica; include grandi stabilimenti aeronautici (Zavod n. 1 a Frunze/Chodynka, Podol'sk, Kolomna costruttrice di locomotive e caldaie pesanti, Mitišči fabbrica di vagoni). Con la Costituzione del 1936 gli impianti della regione sono all'avanguardia del Secondo Piano Quinquennale.",
      s1: "Dure purghe colpiscono gli ingegneri, i direttori d'azienda e gli operai degli stabilimenti dell'Oblast; vengono intensificate le produzioni della fabbrica automobilistica ZIS e dei cantieri di Kolomna sotto rigida sorveglianza dell'NKVD.",
      s2: "Potenziamento dei nodi logistici radiali e delle officine di riparazione materiale rotabile in vista di possibili mobilitazioni generali dell'Armata Rossa; la regione registra una massiccia campagna di arruolamento tra i giovani operai del Komsomol.",
      s3_4: "Le fabbriche di Podol'sk, Noginsk e Serpuchov ricevono commesse militari speciali per munizionamento pesante e componenti per i nuovi modelli di carri e cannoni.",
      s5: "L'Oblast fornisce divisioni di fanteria e rifornimenti ferroviari continui per la campagna di Polonia (settembre 1939) e successivamente per la dura Guerra d'Inverno careliana, subendo le ripercussioni del rigido inverno 1939-1940.",
      s6: "Riorganizzazione della produzione manifatturiera e chimica dopo l'annessione dei paesi baltici e della Bessarabia; avvio della pianificazione per la dispersione industriale e la protezione antiaerea della corona periferica di Mosca.",
      s7: "Gli uffici di progettazione (OKB) di Jakovlev, Il'jušin e Lavočkin dislocati nell'Oblast lavorano febbrilmente ai prototipi dei nuovi caccia Yak-1, LaGG-3 e all'aereo d'attacco al suolo Il-2 Šturmovik, avviati alla produzione di serie urgente.",
      s8: "Massicce esercitazioni della difesa contraerea (PVO) a protezione del nodo di Mosca; fabbriche metallurgiche e chimiche operano a ciclo continuo su turni di dodici ore in previsione del conflitto imminente.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Mosca (Moskovskaja Oblast')",
    getAdminTitle: (_step: number) => "Moskovskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_44_Nenets_Autonomous_Okrug": {
    id: "SOV_ADM1_RUS_44_Nenets_Autonomous_Okrug",
    republic: "RSFSR",
    modernName: "Circondario Autonomo dei Nenec",
    historicalName: "Circondario Nazionale Nenec (Nar'jan-Mar \u2014 Tundra del Basso Pe\u010dora)",
    russianName: "Neneckij nacional'nyj okrug \u2014 Arkhangel'skaya oblast",
    adminTitle: "Neneckij Okrispolkom \u2014 RSFSR (URSS)",
    capital: "Nar'jan-Mar",
    keys: ["adm1_rus_44_nenets_autonomous_okrug", "arkhangelskaya", "autonomo", "circondario", "nacionalnyj", "nar'jan-mar", "narjanmar", "nenec", "neneckij", "nenets autonomous okrug", "nenets_autonomous_okrug", "oblast", "okrug", "sov_adm1_rus_44_nenets_autonomous_okrug"],
    notes: {
      s0: "Immenso entroterra siberiano e artico solcato dai fiumi giganti Enisej, Lena e Ob'; comprende le ricchezze minerarie dell'Altaj, la fabbrica aeronautica n. 125 di Irkutsk (costruttrice dei bombardieri veloci SB e Pe-2), l'estrazione d'oro e diamanti in Jacuzia lungo l'Aldan, le renne dei Nenec e le foreste sconfinate della taiga siberiana.",
      s1: "Istituzione di campi di lavoro forestali del Gulag (Kraslag, Siblag) lungo la Transiberiana e i fiumi navigabili per il taglio del legname.",
      s2: "La fabbrica d'aviazione n. 125 di Irkutsk raggiunge la piena operatività, producendo bombardieri per la flotta dell'Estremo Oriente e per la Cina nazionalista contro i giapponesi.",
      s3_4: "I monti Altaj forniscono piombo, zinco e metalli non ferrosi essenziali per le munizioni dell'Armata Rossa.",
      s5: "Durante la Guerra d'Inverno e le campagne europee, la Siberia addestra reggimenti di sciatori e tiratori scelti abituati a sopravvivere a -40°C.",
      s6: "Sviluppo della rotta marittima del Nord (Glavsevmorput') con rompighiaccio a vapore che collegano la foce dell'Enisej e della Lena ad Arcangelo e Vladivostok.",
      s7: "Irkutsk e Krasnojarsk ampliano le officine meccaniche e le centrali elettriche per accogliere gli impianti pesanti da evacuare da Mosca e Leningrado.",
      s8: "Alla vigilia del 22 giugno 1941, le sconfinate distese della Siberia centrale e orientale rappresentano la riserva demografica, mineraria e strategica invincibile dell'Unione Sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Circondario Nazionale Nenec (Nar'jan-Mar — Tundra del Basso Pečora)",
    getAdminTitle: (_step: number) => "Neneckij Okrispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_45_Novgorod_Oblast": {
    id: "SOV_ADM1_RUS_45_Novgorod_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Novgorod",
    historicalName: "Distretto di Novgorod (Velikij Novgorod \u2014 Lago Il'men')",
    russianName: "Novgorodskij okrug \u2014 Leningradskaya oblast",
    adminTitle: "Novgorodskij Okruzhnyj Ispolkom \u2014 RSFSR (URSS)",
    capital: "Novgorod",
    keys: ["adm1_rus_45_novgorod_oblast", "leningradskaya", "novgorod", "novgorod oblast", "novgorod_oblast", "novgorodskij", "oblast", "okrug", "sov_adm1_rus_45_novgorod_oblast"],
    notes: {
      s0: "Storiche città-stato medievali della Russia nord-occidentale; Pskov è sentinella di frontiera sul Lago dei Ciudi al confine con Estonia e Lettonia; Velikij Novgorod domina il Lago Il'men'; Vologda è il crocevia ferroviario nodale che unisce Mosca, Leningrado, Arcangelo e gli Urali.",
      s1: "Pskov è sottoposta a strettissimo regime di zona fortificata di frontiera (Pskovskij UR); dure purghe colpiscono gli ufficiali del Distretto Militare di Leningrado e i ferrovieri di Vologda.",
      s2: "Potenziamento delle fortezze d'artiglieria e dei fossati anticarro del settore fortificato di Pskov a sbarramento delle vie d'invasione baltiche.",
      s3_4: "Vologda smista a getto continuo materiali metallurgici provenienti dagli Urali verso i cantieri navali di Leningrado e i porti del Mar Bianco.",
      s5: "Durante la Guerra d'Inverno, Pskov e Novgorod sono centri di riserva e rifornimento per le armate sovietiche; gli ospedali militari accolgono migliaia di feriti careliani.",
      s6: "Nel giugno 1940, con l'annessione sovietica di Estonia e Lettonia, le guarnigioni di Pskov avanzano per occupare Tartu, Riga e Tallinn; la frontiera di Pskov cessa di essere confine estero.",
      s7: "Vologda viene designata come nodo di smistamento logistico prioritario per le evacuazioni da Leningrado verso la Siberia.",
      s8: "Pskov e Novgorod costituiscono la cerniera di transito e il fulcro difensivo avanzato a protezione della Russia centrale e settentrionale.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Distretto di Novgorod (Velikij Novgorod — Lago Il'men')",
    getAdminTitle: (_step: number) => "Novgorodskij Okruzhnyj Ispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_46_Novosibirsk_Oblast": {
    id: "SOV_ADM1_RUS_46_Novosibirsk_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Novosibirsk",
    historicalName: "Oblast di Novosibirsk (Capitale della Siberia \u2014 Fabbrica Aeronautica n. 153)",
    russianName: "Novosibirskaya oblast",
    adminTitle: "Novosibirskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Novosibirsk",
    keys: ["adm1_rus_46_novosibirsk_oblast", "novosibirsk", "novosibirsk oblast", "novosibirsk_oblast", "novosibirskaya", "oblast", "sov_adm1_rus_46_novosibirsk_oblast"],
    notes: {
      s0: "Cuore industriale e minerario della Siberia Occidentale; comprende la metropoli in vertiginosa ascesa di Novosibirsk (capitale amministrativa sul fiume Ob', sede della fabbrica aeronautica n. 153 intitolata a Čkalov), il colossale bacino carbonifero del Kuzbass con le acciaierie giganti KMK di Stalinsk (Novokuzneck), e il polo agricolo-meccanico di Omsk.",
      s1: "Dure purghe dell'NKVD nel Kuzbass contro ingegneri minerari e dirigenti stranieri del polo carbo-siderurgico Ural-Kuzbass; la fabbrica aeronautica n. 153 viene completata e avvia la produzione di caccia Polikarpov I-16.",
      s2: "Il Kuzbass fornisce milioni di tonnellate di carbone da coke di qualità eccelsa per alimentare a ciclo continuo le acciaierie di Magnitogorsk e Sverdlovsk.",
      s3_4: "La fabbrica d'aviazione n. 153 di Novosibirsk produce oltre mille caccia I-16 all'anno, diventando la più prolifica fabbrica di aerei da caccia a est degli Urali.",
      s5: "A Stalinsk (Novokuzneck) entra in funzione il laminatoio per rotaie pesanti e blindature per carri armati; la Siberia occidentale è individuata come il rifugio supremo dell'industria sovietica.",
      s6: "Nel 1940 a Novosibirsk partono le linee di assemblaggio del nuovo caccia moderno LaGG-3; Omsk predispone lo stabilimento n. 174 per la produzione di carri armati.",
      s7: "Piani dettagliati del Gosplan per la creazione di piattaforme ferroviarie di sbarco per centinaia di stabilimenti evacuandi da Ucraina, Bielorussia e Russia europea.",
      s8: "Alla vigilia della guerra, l'asse Novosibirsk-Kuzbass-Omsk è la spina dorsale energetica, metallurgica e aeronautica invulnerabile dell'URSS, pronta ad accogliere il più grande trasferimento industriale della storia umana.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Novosibirsk (Capitale della Siberia — Fabbrica Aeronautica n. 153)",
    getAdminTitle: (_step: number) => "Novosibirskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_47_Omsk_Oblast": {
    id: "SOV_ADM1_RUS_47_Omsk_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Omsk",
    historicalName: "Oblast di Omsk (Fiume Irty\u0161 \u2014 Fabbrica Carri e Motori)",
    russianName: "Omskaya oblast",
    adminTitle: "Omskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Omsk",
    keys: ["adm1_rus_47_omsk_oblast", "oblast", "omsk", "omsk oblast", "omsk_oblast", "omskaya", "sov_adm1_rus_47_omsk_oblast"],
    notes: {
      s0: "Cuore industriale e minerario della Siberia Occidentale; comprende la metropoli in vertiginosa ascesa di Novosibirsk (capitale amministrativa sul fiume Ob', sede della fabbrica aeronautica n. 153 intitolata a Čkalov), il colossale bacino carbonifero del Kuzbass con le acciaierie giganti KMK di Stalinsk (Novokuzneck), e il polo agricolo-meccanico di Omsk.",
      s1: "Dure purghe dell'NKVD nel Kuzbass contro ingegneri minerari e dirigenti stranieri del polo carbo-siderurgico Ural-Kuzbass; la fabbrica aeronautica n. 153 viene completata e avvia la produzione di caccia Polikarpov I-16.",
      s2: "Il Kuzbass fornisce milioni di tonnellate di carbone da coke di qualità eccelsa per alimentare a ciclo continuo le acciaierie di Magnitogorsk e Sverdlovsk.",
      s3_4: "La fabbrica d'aviazione n. 153 di Novosibirsk produce oltre mille caccia I-16 all'anno, diventando la più prolifica fabbrica di aerei da caccia a est degli Urali.",
      s5: "A Stalinsk (Novokuzneck) entra in funzione il laminatoio per rotaie pesanti e blindature per carri armati; la Siberia occidentale è individuata come il rifugio supremo dell'industria sovietica.",
      s6: "Nel 1940 a Novosibirsk partono le linee di assemblaggio del nuovo caccia moderno LaGG-3; Omsk predispone lo stabilimento n. 174 per la produzione di carri armati.",
      s7: "Piani dettagliati del Gosplan per la creazione di piattaforme ferroviarie di sbarco per centinaia di stabilimenti evacuandi da Ucraina, Bielorussia e Russia europea.",
      s8: "Alla vigilia della guerra, l'asse Novosibirsk-Kuzbass-Omsk è la spina dorsale energetica, metallurgica e aeronautica invulnerabile dell'URSS, pronta ad accogliere il più grande trasferimento industriale della storia umana.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Omsk (Fiume Irtyš — Fabbrica Carri e Motori)",
    getAdminTitle: (_step: number) => "Omskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_48_Oryol_Oblast": {
    id: "SOV_ADM1_RUS_48_Oryol_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Or\u00ebl",
    historicalName: "Oblast di Or\u00ebl (Fiume Oka \u2014 Snodo della Russia Centrale)",
    russianName: "Orlovskaya oblast",
    adminTitle: "Orlovskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Or\u00ebl",
    keys: ["adm1_rus_48_oryol_oblast", "oblast", "orl", "orlovskaya", "oryol oblast", "oryol_oblast", "orël", "sov_adm1_rus_48_oryol_oblast"],
    notes: {
      s0: "Città storica sul fiume Oka, celebre patria di scrittori come Turgenev e Leskov; importantissimo snodo ferroviario a cinque direttrici e centro manifatturiero e molitorio della Russia centrale.",
      s1: "Istituita come Oblast nel settembre 1937 scorporata da Kursk e Voronež; sede del famigerato carcere d'isolamento politico di Orël (Orlovskij Central) gestito dall'NKVD.",
      s2: "Ammodernamento delle officine ferroviarie e delle fonderie per la produzione di parti di vagoni merci.",
      s3_4: "L'Orlovskij Central ospita prigionieri politici di primo piano come Christian Rakovskij e Marija Spiridonova.",
      s5: "La ferrovia di Orël garantisce il rapido transito delle truppe del Distretto Militare di Mosca verso il fronte bielorusso e ucraino.",
      s6: "Installazione di officine sussidiarie per la riparazione dei motori degli autocarri dell'Armata Rossa.",
      s7: "Costruzione di rampe di carico e trinceramenti a difesa del nodo ferroviario contro attacchi aerei.",
      s8: "Orël costituisce il perno di raccordo logistico e ferroviario tra la capitale Mosca e il fronte ucraino meridionale.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Orël (Fiume Oka — Snodo della Russia Centrale)",
    getAdminTitle: (_step: number) => "Orlovskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_49_Saint_Petersburg": {
    id: "SOV_ADM1_RUS_49_Saint_Petersburg",
    republic: "RSFSR",
    modernName: "San Pietroburgo (Citt\u00e0 Federale)",
    historicalName: "Leningrado (Citt\u00e0 di Leningrado \u2014 Culla della Rivoluzione)",
    russianName: "Gorod Leningrad",
    adminTitle: "Leningradskij Gorsovet & LVO \u2014 RSFSR (URSS)",
    capital: "Leningrad",
    keys: ["adm1_rus_49_saint_petersburg", "gorod", "leningrad", "pietroburgo", "saint petersburg", "saint_petersburg", "sov_adm1_rus_49_saint_petersburg"],
    notes: {
      s0: "Seconda metropoli dell'URSS con oltre tre milioni di abitanti, culla della Rivoluzione bolscevica del 1917 e capitale navale della Flotta del Baltico (Bandiera Rossa); ospita colossi dell'industria pesante come gli Stabilimenti Kirov (costruttori di carri armati T-28), i cantieri navali Baltijskij e Ždanov, e gli stabilimenti Ižora. Sede del comitato cittadino del partito guidato dal potente Andrej Ždanov.",
      s1: "Le Grandi Purghe dell'NKVD infuriano a Leningrado: la memoria dell'assassinio di Kirov del 1934 viene usata come pretesto per epurare decine di migliaia di funzionari, operai e intellettuali; vengono arrestati e fucilati i vertici del Distretto Militare di Leningrado e della Flotta del Baltico.",
      s2: "In risposta alla crisi dei Sudeti e all'espansionismo tedesco, Ždanov e il comando militare avviano la revisione dei piani difensivi del Golfo di Finlandia e dell'istmo careliano, dove la frontiera con la Finlandia dista appena 32 chilometri dalla periferia nord della città.",
      s3_4: "Stalin e Ždanov tentano trattative territoriali con Helsinki per allontanare il confine da Leningrado; gli stabilimenti Kirov sviluppano i prototipi del carro pesante pluritorretta SMK e del nuovo KV-1 sotto la direzione di Žozef Kotin.",
      s5: "Il 30 novembre 1939 Leningrado è il centro di comando dell'attacco sovietico contro la Finlandia che apre la Guerra d'Inverno; le truppe del generale Mereckov assaltano la Linea Mannerheim e gli ospedali cittadini accolgono centinaia di migliaia di feriti e congelati. Con il Trattato di Mosca del 12 marzo 1940 la frontiera viene arretrata oltre Viipuri, mettendo al sicuro la città.",
      s6: "Nel giugno 1940 le basi navali e aeree di Leningrado e Kronštadt orchestrano l'occupazione militare e il blocco navale degli Stati Baltici (Estonia e Lettonia). Gli Stabilimenti Kirov avviano la produzione in grande serie del carro armato pesante KV-1 e KV-2.",
      s7: "Leningrado lavora a ritmo bellico serrato: Ždanov ordina l'esercitazione massiccia della difesa contraerea (PVO) e la militarizzazione dell'intera forza lavoro; gli uffici di progettazione navale accelerano il completamento della corazzata Sovetskij Sojuz al cantiere Baltijskij.",
      s8: "Alla vigilia del 22 giugno 1941, Leningrado è un immenso arsenale industriale e militare pronto alla difesa, ignorando che entro pochi mesi sarà cinta d'assedio dal blocco nazista per 872 tragici ed eroici giorni.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Leningrado (Città di Leningrado — Culla della Rivoluzione)",
    getAdminTitle: (_step: number) => "Leningradskij Gorsovet & LVO — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_4_Kurgan_Oblast": {
    id: "SOV_ADM1_RUS_4_Kurgan_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Kurgan",
    historicalName: "Distretto di Kurgan (Urali Meridionali \u2014 Fiume Tobol)",
    russianName: "Kurganskij okrug \u2014 Chelyabinskaya oblast",
    adminTitle: "Kurganskij Gorsovet \u2014 RSFSR (URSS)",
    capital: "Kurgan",
    keys: ["adm1_rus_4_kurgan_oblast", "chelyabinskaya", "kurgan", "kurgan oblast", "kurgan_oblast", "kurganskij", "oblast", "okrug", "sov_adm1_rus_4_kurgan_oblast"],
    notes: {
      s0: "Cuore industriale e minerario della Siberia Occidentale; comprende la metropoli in vertiginosa ascesa di Novosibirsk (capitale amministrativa sul fiume Ob', sede della fabbrica aeronautica n. 153 intitolata a Čkalov), il colossale bacino carbonifero del Kuzbass con le acciaierie giganti KMK di Stalinsk (Novokuzneck), e il polo agricolo-meccanico di Omsk.",
      s1: "Dure purghe dell'NKVD nel Kuzbass contro ingegneri minerari e dirigenti stranieri del polo carbo-siderurgico Ural-Kuzbass; la fabbrica aeronautica n. 153 viene completata e avvia la produzione di caccia Polikarpov I-16.",
      s2: "Il Kuzbass fornisce milioni di tonnellate di carbone da coke di qualità eccelsa per alimentare a ciclo continuo le acciaierie di Magnitogorsk e Sverdlovsk.",
      s3_4: "La fabbrica d'aviazione n. 153 di Novosibirsk produce oltre mille caccia I-16 all'anno, diventando la più prolifica fabbrica di aerei da caccia a est degli Urali.",
      s5: "A Stalinsk (Novokuzneck) entra in funzione il laminatoio per rotaie pesanti e blindature per carri armati; la Siberia occidentale è individuata come il rifugio supremo dell'industria sovietica.",
      s6: "Nel 1940 a Novosibirsk partono le linee di assemblaggio del nuovo caccia moderno LaGG-3; Omsk predispone lo stabilimento n. 174 per la produzione di carri armati.",
      s7: "Piani dettagliati del Gosplan per la creazione di piattaforme ferroviarie di sbarco per centinaia di stabilimenti evacuandi da Ucraina, Bielorussia e Russia europea.",
      s8: "Alla vigilia della guerra, l'asse Novosibirsk-Kuzbass-Omsk è la spina dorsale energetica, metallurgica e aeronautica invulnerabile dell'URSS, pronta ad accogliere il più grande trasferimento industriale della storia umana.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Distretto di Kurgan (Urali Meridionali — Fiume Tobol)",
    getAdminTitle: (_step: number) => "Kurganskij Gorsovet — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_50_Sakhalin_Oblast": {
    id: "SOV_ADM1_RUS_50_Sakhalin_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Sachalin",
    historicalName: "Oblast di Sachalin Settentrionale (Aleksandrovsk-Sachalinskij \u2014 Pozzi di Ocha)",
    russianName: "Sakhalinskaya oblast \u2014 Khabarovskij kraj",
    adminTitle: "Sachalinskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Aleksandrovsk-Sachalinskij",
    keys: ["adm1_rus_50_sakhalin_oblast", "aleksandrovsk-sachalinskij", "aleksandrovsksachalinskij", "khabarovskij", "oblast", "sachalin", "sakhalin oblast", "sakhalin_oblast", "sakhalinskaya", "sov_adm1_rus_50_sakhalin_oblast"],
    notes: {
      s0: "Vasto e strategico Estremo Oriente sovietico affacciato sul Pacifico settentrionale e sull'Oceano Artico; comprende il Territorio di Chabarovsk sull'Amur, il cantiere navale n. 199 e l'impianto aeronautico n. 126 nella neo-fondata 'città della gioventù' Komsomol'sk-na-Amure (1932), la frontiera mancese lungo l'Amur a Blagoveščensk, l'Oblast Autonoma Ebraica di Birobidžan, l'isola di Sachalin settentrionale con i pozzi di Ocha (concessi in parte al Giappone), la penisola di Kamčatka e il famigerato trust minerario Dal'stroj dell'NKVD nella Kolyma (Magadan).",
      s1: "La Kolyma e i campi del Sevvostlag a Magadan accolgono decine di migliaia di prigionieri politici costretti all'estrazione dell'oro fluviale nel gelo artico; dure purghe colpiscono l'Oblast dell'Amur e Chabarovsk.",
      s2: "Komsomol'sk-na-Amure vara i primi cacciatorpediniere e produce bombardieri Il-4 nel cuore della taiga dell'Estremo Oriente.",
      s3_4: "Le riserve auree estratte dalla Kolyma garantiscono all'URSS le valute estere necessarie per l'acquisto di macchinari industriali avanzati e materie prime strategiche.",
      s5: "Chabarovsk coordina la sorveglianza militare contro la potente Armata del Kwantung schierata oltre il fiume Amur in Manciuria.",
      s6: "Sviluppo di difese costiere nella baia dell'Avača a Petropavlovsk-Kamčatskij e aeroporti avanzati a guardia dello Stretto di Bering verso l'Alaska.",
      s7: "A Ocha (Sachalin) l'NKVD controlla strettamente i pozzi petroliferi, limitando le concessioni giapponesi e reindirizzando il greggio alla flotta sovietica.",
      s8: "Il Patto di Neutralità con il Giappone dell'aprile 1941 assicura una tregua vitale lungo l'immenso arco del Pacifico, permettendo all'Estremo Oriente sovietico di concentrarsi sul rifornimento di oro, navi e petrolio alla patria minacciata a occidente.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Sachalin Settentrionale (Aleksandrovsk-Sachalinskij — Pozzi di Ocha)",
    getAdminTitle: (_step: number) => "Sachalinskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_51_Sakha_Republic": {
    id: "SOV_ADM1_RUS_51_Sakha_Republic",
    republic: "RSFSR",
    modernName: "Repubblica di Sacha (Jacuzia)",
    historicalName: "RSSA Jakuta (Jakutsk \u2014 Bacino della Lena e Miniere d'Oro dell'Aldan)",
    russianName: "Yakutskaya ASSR",
    adminTitle: "Sovet Narodnykh Komissarov Jakutskoj ASSR \u2014 RSFSR (URSS)",
    capital: "Jakutsk",
    keys: ["adm1_rus_51_sakha_republic", "jacuzia", "jakutsk", "repubblica", "sacha", "sakha republic", "sakha_republic", "sov_adm1_rus_51_sakha_republic", "yakutskaya"],
    notes: {
      s0: "Immenso entroterra siberiano e artico solcato dai fiumi giganti Enisej, Lena e Ob'; comprende le ricchezze minerarie dell'Altaj, la fabbrica aeronautica n. 125 di Irkutsk (costruttrice dei bombardieri veloci SB e Pe-2), l'estrazione d'oro e diamanti in Jacuzia lungo l'Aldan, le renne dei Nenec e le foreste sconfinate della taiga siberiana.",
      s1: "Istituzione di campi di lavoro forestali del Gulag (Kraslag, Siblag) lungo la Transiberiana e i fiumi navigabili per il taglio del legname.",
      s2: "La fabbrica d'aviazione n. 125 di Irkutsk raggiunge la piena operatività, producendo bombardieri per la flotta dell'Estremo Oriente e per la Cina nazionalista contro i giapponesi.",
      s3_4: "I monti Altaj forniscono piombo, zinco e metalli non ferrosi essenziali per le munizioni dell'Armata Rossa.",
      s5: "Durante la Guerra d'Inverno e le campagne europee, la Siberia addestra reggimenti di sciatori e tiratori scelti abituati a sopravvivere a -40°C.",
      s6: "Sviluppo della rotta marittima del Nord (Glavsevmorput') con rompighiaccio a vapore che collegano la foce dell'Enisej e della Lena ad Arcangelo e Vladivostok.",
      s7: "Irkutsk e Krasnojarsk ampliano le officine meccaniche e le centrali elettriche per accogliere gli impianti pesanti da evacuare da Mosca e Leningrado.",
      s8: "Alla vigilia del 22 giugno 1941, le sconfinate distese della Siberia centrale e orientale rappresentano la riserva demografica, mineraria e strategica invincibile dell'Unione Sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSSA Jakuta (Jakutsk — Bacino della Lena e Miniere d'Oro dell'Aldan)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Jakutskoj ASSR — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_52_Saratov_Oblast": {
    id: "SOV_ADM1_RUS_52_Saratov_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Saratov",
    historicalName: "Oblast di Saratov (Fiume Volga \u2014 Fabbrica Aeronautica GAZ-292)",
    russianName: "Saratovskaya oblast",
    adminTitle: "Saratovskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Saratov",
    keys: ["adm1_rus_52_saratov_oblast", "oblast", "saratov", "saratov oblast", "saratov_oblast", "saratovskaya", "sov_adm1_rus_52_saratov_oblast"],
    notes: {
      s0: "Grande centro industriale e universitario sul medio corso del Volga; sede della fabbrica di mietitrebbie di Saratov (convertita nel 1937 in fabbrica aeronautica n. 292), dell'Università di Saratov e di raffinerie petrolifere alimentate dal greggio caucasico.",
      s1: "L'Oblast viene riorganizzata nel dicembre 1936; le purghe colpiscono docenti universitari, ingegneri aeronautici e funzionari del commercio cerealicolo.",
      s2: "Inaugurazione del grande ponte ferroviario sul Volga a Saratov, che velocizza il transito dei convogli militari verso gli Urali e l'Asia centrale.",
      s3_4: "La fabbrica n. 292 completa la riconversione industriale e avvia la produzione di componenti per aerei d'addestramento e ricognizione.",
      s5: "Nel 1940 lo stabilimento n. 292 viene incaricato della produzione in grande serie del modernissimo caccia Yak-1 progettato dall'OKB di Aleksandr Jakovlev.",
      s6: "Saratov riceve commesse per decine di migliaia di cuscinetti a sfera, vetri ottici e strumenti per l'aviazione militare sovietica.",
      s7: "Linee di montaggio dello Yak-1 operano a pieno regime, consegnando i primi reggimenti di caccia all'Aeronautica Sovietica (VVS).",
      s8: "Alla vigilia della guerra, Saratov è una delle città cardine per la modernizzazione della flotta da caccia dell'Armata Rossa.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Saratov (Fiume Volga — Fabbrica Aeronautica GAZ-292)",
    getAdminTitle: (_step: number) => "Saratovskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_53_Smolensk_Oblast": {
    id: "SOV_ADM1_RUS_53_Smolensk_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Smolensk",
    historicalName: "Oblast di Smolensk (La Porta di Mosca sul Fiume Dnepr)",
    russianName: "Smolenskaya oblast",
    adminTitle: "Smolenskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Smolensk",
    keys: ["adm1_rus_53_smolensk_oblast", "oblast", "smolensk", "smolensk oblast", "smolensk_oblast", "smolenskaya", "sov_adm1_rus_53_smolensk_oblast"],
    notes: {
      s0: "Baluardo secolare della Russia occidentale sul corso superiore del Dnepr, custode della fortezza murata di Boris Godunov; sede del Quartier Generale del Distretto Militare Bielorusso (BVO) e snodo dell'autostrada e ferrovia principale Minsk-Mosca.",
      s1: "Le purghe di Stalin decimano il comando del Distretto Militare Bielorusso a Smolensk; il comandante d'armata Ieronim Uborevič viene arrestato e fucilato con i suoi ufficiali di stato maggiore.",
      s2: "Smolensk viene riorganizzata come retrovia primaria di comando e deposito logistico del Distretto Militare Speciale Bielorusso.",
      s3_4: "La fabbrica aeronautica n. 35 di Smolensk lavora alla riparazione e all'assemblaggio di caccia e bombardieri per le forze aeree occidentali.",
      s5: "Nel settembre 1939 Smolensk è il quartier generale logistico da cui partono le divisioni sovietiche per l'invasione della Bielorussia occidentale polacca. Nella foresta di Katyn', 18 km a ovest di Smolensk, nella primavera 1940 l'NKVD massacra oltre 4.400 ufficiali polacchi.",
      s6: "Smolensk gestisce le comunicazioni con i territori annessi della Lituania e della Bielorussia occidentale; potenziamento dei depositi di carburante.",
      s7: "Rafforzamento delle guarnigioni dell'Armata Rossa lungo la direttrice storica percorsa da Napoleone verso Mosca; allestimento di campi d'aviazione militari.",
      s8: "A giugno 1941 Smolensk è la roccaforte di transito vitale tra la frontiera bielorussa e la capitale Mosca, destinata a essere investita dalla gigantesca Battaglia di Smolensk del luglio 1941.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Smolensk (La Porta di Mosca sul Fiume Dnepr)",
    getAdminTitle: (_step: number) => "Smolenskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_54_Stavropol_Krai": {
    id: "SOV_ADM1_RUS_54_Stavropol_Krai",
    republic: "RSFSR",
    modernName: "Territorio di Stavropol'",
    historicalName: "Territorio di Ord\u017eonikidze (Stavropol' \u2014 Ciscaucasia)",
    russianName: "Ordzhonikidzevskij kraj",
    adminTitle: "Ord\u017eonikidzevskij Kraiispolkom \u2014 RSFSR (URSS)",
    capital: "Voro\u0161ilovsk (Stavropol')",
    keys: ["adm1_rus_54_stavropol_krai", "ordzhonikidzevskij", "sov_adm1_rus_54_stavropol_krai", "stavropol", "stavropol krai", "stavropol_krai", "territorio", "voroilovskstavropol", "vorošilovsk (stavropol')"],
    notes: {
      s0: "Vasta regione steppica e pedemontana della Ciscaucasia, centro nevralgico dell'allevamento ovino e della produzione di grano; comprende le celebri terme minerali di Pjatigorsk, Kislovodsk ed Essentuki.",
      s1: "Nel 1937 la città di Stavropol' viene ribattezzata Vorošilovsk (in onore del Commissario alla Difesa Kliment Vorošilov) e il territorio assume il nome di Ordžonikidzevskij Krai (in memoria di Sergo Ordžonikidze).",
      s2: "Le stazioni termali di Kislovodsk e Pjatigorsk vengono integrate nel sistema sanitario statale dell'Armata Rossa per la cura e la riabilitazione degli alti ufficiali.",
      s3_4: "Ampliamento delle arterie stradali e ferroviarie che collegano Rostov sul Don a Baku e Tbilisi attraverso la gola di Mineral'nye Vody.",
      s5: "I kolchoz del territorio consegnano quote record di lana e grano per il fabbisogno del vestiario invernale dell'esercito impegnato in Finlandia.",
      s6: "Costruzione di aeroporti militari sussidiari e depositi carburante a supporto del Distretto Militare del Caucaso Settentrionale.",
      s7: "Pianificazione dell'assistenza medica d'emergenza con la conversione dei sanatori del Caucaso in grandi ospedali militari d'evacuazione (Evakogospital').",
      s8: "Il territorio costituisce una zona di retrovia strategica e snodo fondamentale di transito verso i pozzi petroliferi transcaucasici.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Territorio di Ordžonikidze (Stavropol' — Ciscaucasia)",
    getAdminTitle: (_step: number) => "Ordžonikidzevskij Kraiispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_55_Tuva": {
    id: "SOV_ADM1_RUS_55_Tuva",
    republic: "TANNU_TUVA",
    modernName: "Repubblica di Tuva",
    historicalName: "Repubblica Popolare di Tuva (Tannu Tuva \u2014 Capitale Kyzyl)",
    russianName: "Tyva Arat Respublika (Tuvinskaja Narodnaja Respublika)",
    adminTitle: "Malyj Chural Tuvinskoj Narodnoj Respubliki (Sal\u010dak Toka) \u2014 Protettorato Sovietico",
    capital: "Kyzyl",
    keys: ["adm1_rus_55_tuva", "kyzyl", "narodnaja", "repubblica", "respublika", "sov_adm1_rus_55_tuva", "tuva", "tuvinskaja"],
    notes: {
      s0: "Stato sovrano indipendente 'de jure' ma 'de facto' stretto protettorato dell'Unione Sovietica incastonato tra i monti Sajany e la Mongolia settentrionale; guidato dal Segretario Generale del Partito Rivoluzionario Popolare di Tuva, Salčak Toka; adotta la scrittura cirillica e integra l'economia pastorale con la pianificazione sovietica.",
      s1: "Repressioni staliniane coordinate da Toka ed emissari dell'NKVD: chiusura forzata dei monasteri buddisti lamaisti, soppressione dello sciamanesimo e purghe dei 'nazionalisti borghesi' tuvani.",
      s2: "Le truppe dell'Armata Popolare Rivoluzionaria di Tuva vengono equipaggiate con armi leggere sovietiche e addestrate da consiglieri militari dell'Armata Rossa.",
      s3_4: "Tuva supporta logisticamente le retrovie sovietiche e mongole durante i combattimenti contro l'esercito imperiale giapponese a Chalchin Gol.",
      s5: "Sviluppo minerario con l'avvio dell'estrazione di oro, cobalto e amianto da parte di tecnici sovietici della spedizione Tuva-Zoloto.",
      s6: "Toka dichiara la totale adesione di Tuva alla linea di politica estera di Stalin e alla difesa del campo socialista.",
      s7: "Forniture di migliaia di cavalli da sella tuvani, carne essiccata, pellicce e lana per i magazzini dell'Armata Rossa.",
      s8: "Il 22 giugno 1941, a poche ore dall'attacco tedesco contro l'URSS, la Repubblica Popolare di Tuva sarà il primo stato al mondo a dichiarare formalmente guerra alla Germania nazista al fianco dell'Unione Sovietica, donando l'intera riserva aurea statale a Mosca.",
    },
    getOwner: (_step: number) => 'TUV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => 'Repubblica Popolare di Tuva (Tannu Tuva / Kyzyl)',
    getAdminTitle: (_step: number) => 'Tyva Arat Respublika — Protettorato Alleato Sovietico',
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_56_Tver_Oblast": {
    id: "SOV_ADM1_RUS_56_Tver_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Tver'",
    historicalName: "Oblast di Kalinin (Tver' \u2014 Fiume Volga)",
    russianName: "Kalininskaya oblast",
    adminTitle: "Kalininskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Kalinin",
    keys: ["adm1_rus_56_tver_oblast", "kalinin", "kalininskaya", "oblast", "sov_adm1_rus_56_tver_oblast", "tver oblast", "tver_oblast"],
    notes: {
      s0: "Antica Tver', ribattezzata Kalinin nel 1931 in onore del 'Presidente dell'URSS' (Capo del Presidium del Soviet Supremo) Michail Kalinin; strategico nodo intermedio lungo la ferrovia principale Oktjabr'skaja che connette Mosca a Leningrado sul corso superiore del Volga.",
      s1: "Epurazione dei funzionari locali e dei ferrovieri lungo la tratta Mosca-Leningrado sotto le direttive draconiane di Kaganovič e dell'NKVD.",
      s2: "Ampliamento della grande fabbrica di carrozze ferroviarie di Kalinin (Kalininskij Vagonostroitel'nyj Zavod) e delle industrie tessili e del lino.",
      s3_4: "La fabbrica di vagoni di Kalinin viene integrata nella catena di fornitura militare per treni blindati e carrelli per l'artiglieria pesante.",
      s5: "Durante la Guerra d'Inverno, l'Oblast di Kalinin funge da centro di transito e smistamento medico per decine di migliaia di soldati feriti evacuati dal fronte careliano verso gli ospedali dell'entroterra.",
      s6: "Nell'aprile-maggio 1940, nella sede dell'NKVD di Kalinin, vengono fucilati segretamente oltre 6.000 ufficiali e poliziotti polacchi prigionieri del campo di Ostaškov (parte del massacro di Katyn').",
      s7: "La regione viene fortificata con la costruzione di barriere anticarro e linee difensive boschive a protezione delle vie d'accesso settentrionali a Mosca.",
      s8: "Alla vigilia di Barbarossa, l'Oblast di Kalinin è un nodo nevralgico della mobilitazione sovietica, direttamente posizionato sulla linea di marcia del futuro Heeresgruppe Mitte.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Kalinin (Tver' — Fiume Volga)",
    getAdminTitle: (_step: number) => "Kalininskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_57_Udmurtia": {
    id: "SOV_ADM1_RUS_57_Udmurtia",
    republic: "RSFSR",
    modernName: "Repubblica Udmurta",
    historicalName: "RSSA Udmurta (I\u017eevsk \u2014 Fabbrica d'Armi e Motocicli I\u017e)",
    russianName: "Udmurtskaya ASSR",
    adminTitle: "Sovet Narodnykh Komissarov Udmurtskoj ASSR \u2014 RSFSR (URSS)",
    capital: "I\u017eevsk",
    keys: ["adm1_rus_57_udmurtia", "ievsk", "iževsk", "repubblica", "sov_adm1_rus_57_udmurtia", "udmurta", "udmurtia", "udmurtskaya"],
    notes: {
      s0: "Storica fucina armiera della Russia sugli Urali occidentali; la capitale Iževsk ospita lo stabilimento metallurgico e armiero Ižstal' e la fabbrica meccanica Ižmaš, costruttori di centinaia di migliaia di fucili Mosin-Nagant e delle prime motociclette sovietiche Iž.",
      s1: "La RSSA Udmurta (istituita nel 1934) è sottoposta a strettissima sorveglianza militare; purgati decine di tecnici armieri accusati di difetti nelle canne dei fucili.",
      s2: "Avvio della produzione di serie della mitragliatrice pesante DŠK calibro 12,7 mm e di cannoni per aviazione progettati da Špital'nyj e Vladimirov.",
      s3_4: "Ižmaš tocca la quota record di oltre mille fucili al giorno; ampliamento delle officine d'acciaio rapido e leghe per proiettili speciali.",
      s5: "Durante la Guerra d'Inverno, Iževsk fornisce gran parte delle armi leggere e delle canne per mitragliatrici utilizzate dalle truppe sovietiche in Carelia.",
      s6: "Ampliamento degli impianti per la produzione del cannone automatico navale e aereo da 20 mm ŠVAK e del cannone controcarro da 45 mm.",
      s7: "Iževsk si prepara ad accogliere macchinari e maestranze dalla fabbrica d'armi di Tula in caso di invasione della Russia occidentale.",
      s8: "Alla vigilia dell'Operazione Barbarossa, l'Udmurtia è una delle capitali assolute della produzione di armi da fuoco dell'Armata Rossa.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSSA Udmurta (Iževsk — Fabbrica d'Armi e Motocicli Iž)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Udmurtskoj ASSR — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_58_Kaluga_Oblast": {
    id: "SOV_ADM1_RUS_58_Kaluga_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Kaluga",
    historicalName: "Distretto di Kaluga (Fiume Oka \u2014 Patria di Ciolkovskij)",
    russianName: "Kaluzhskij rajon \u2014 Tul'skaya oblast",
    adminTitle: "Kalu\u017eskij Gorsovet \u2014 RSFSR (URSS)",
    capital: "Kaluga",
    keys: ["adm1_rus_58_kaluga_oblast", "kaluga", "kaluga oblast", "kaluga_oblast", "kaluzhskij", "oblast", "rajon", "sov_adm1_rus_58_kaluga_oblast", "tulskaya"],
    notes: {
      s0: "Storica città sul fiume Oka a sud-ovest di Mosca, patria del pioniere della cosmonautica Konstantin Ciolkovskij (scomparso nel 1935); polo della lavorazione del legno, della meccanica ferroviaria e dei trasporti.",
      s1: "Epurazione dei funzionari locali e dei direttori degli stabilimenti ferroviari sotto il regime del terrore dell'NKVD.",
      s2: "Sviluppo dell'officina elettromeccanica di Kaluga per la fornitura di apparecchiature telefoniche da campo e telegrafi per l'Armata Rossa.",
      s3_4: "Ampliamento delle segherie e delle fabbriche di fiammiferi (stabilimento Gigant) per il rifornimento delle truppe sovietiche.",
      s5: "Kaluga funge da centro di addestramento e smistamento delle reclute del bacino moscovita verso le armate occidentali.",
      s6: "Potenziamento delle vie di raccordo stradale e ferroviario tra Tula, Brjansk e Mosca.",
      s7: "Allestimento di depositi sussidiari di equipaggiamento militare e preparazione di ospedali da campo.",
      s8: "Kaluga protegge il fianco sud-occidentale di Mosca, pronta a fungere da perno difensivo contro avanzate corazzate nemiche.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Distretto di Kaluga (Fiume Oka — Patria di Ciolkovskij)",
    getAdminTitle: (_step: number) => "Kalužskij Gorsovet — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_59_Lipetsk_Oblast": {
    id: "SOV_ADM1_RUS_59_Lipetsk_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Lipeck",
    historicalName: "Distretto di Lipeck (Impianto Novolipeck \u2014 Scuola d'Aviazione)",
    russianName: "Lipeckij rajon \u2014 Voronezhskaya oblast",
    adminTitle: "Lipeckij Gorsovet \u2014 RSFSR (URSS)",
    capital: "Lipeck",
    keys: ["adm1_rus_59_lipetsk_oblast", "lipeck", "lipeckij", "lipetsk oblast", "lipetsk_oblast", "oblast", "rajon", "sov_adm1_rus_59_lipetsk_oblast", "voronezhskaya"],
    notes: {
      s0: "Centro metallurgico e aeronautico sul fiume Voronež; celebre per aver ospitato fino al 1933 la scuola segreta d'aviazione militare tedesca (Reichswehr) in collaborazione con l'URSS; nel 1934 entra in funzione il primo altoforno del colosso metallurgico Novolipeck (NLMK).",
      s1: "Dure indagini dell'NKVD contro gli ufficiali e ingegneri sovietici che avevano avuto contatti con la passata missione militare tedesca di Lipeck.",
      s2: "NLMK espande la produzione di ghisa e acciai speciali per i blindati e le rotaie ferroviarie della Russia centrale.",
      s3_4: "La scuola di pilotaggio di Lipeck (Centro d'Addestramento Tattico Superiore VVS) forma i comandanti di squadriglia e i collaudatori dei nuovi caccia sovietici.",
      s5: "Lipeck fornisce ghisa e laminati per le fabbriche di carri armati di Stalingrado e Charkiv.",
      s6: "Ammodernamento degli impianti di colata per proiettili d'artiglieria di grosso calibro a Novolipeck.",
      s7: "Sviluppo di campi d'aviazione avanzati per la dispersione dei caccia a protezione dell'asse Voronež-Mosca.",
      s8: "Lipeck è un saldo polo della ghisa pesante e dell'élite dei piloti da caccia dell'Aeronautica Sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Distretto di Lipeck (Impianto Novolipeck — Scuola d'Aviazione)",
    getAdminTitle: (_step: number) => "Lipeckij Gorsovet — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_5_Ingushetia": {
    id: "SOV_ADM1_RUS_5_Ingushetia",
    republic: "RSFSR",
    modernName: "Repubblica d'Inguscezia",
    historicalName: "Inguscezia (Distretto di Nazran' e Monti del Caucaso)",
    russianName: "Ingushskij rajon \u2014 \u010ce\u010deno-Ingu\u0161skaja ASSR",
    adminTitle: "\u010ce\u010deno-Ingu\u0161skij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Nazran'",
    keys: ["adm1_rus_5_ingushetia", "dinguscezia", "eenoinguskaja", "ingushetia", "ingushskij", "nazran", "nazran'", "rajon", "repubblica", "sov_adm1_rus_5_ingushetia"],
    notes: {
      s0: "Territorio montuoso della Ciscaucasia centrale unificato nel 1936 all'interno della RSSA Ceceno-Inguscia; caratterizzato da secolari torri difensive in pietra sulle gole montane del fiume Sunža e della catena del Caucaso.",
      s1: "Operazioni di disarmo forzato e collettivizzazione da parte dei battaglioni dell'NKVD nei villaggi montani (auly) ingusci, con deportazioni di capi tradizionali e religiosi.",
      s2: "Ammodernamento della viabilità stradale verso la Georgia e sviluppo di coltivazioni di grano e foraggi nella pianura di Nazran'.",
      s3_4: "I giovani ingusci vengono arruolati nell'Armata Rossa, mettendosi in luce come abili tiratori scelti e soldati di montagna.",
      s5: "La regione partecipa allo sforzo logistico fornendo cavalli, carne e lana per l'esercito sovietico mobilitato sul fronte occidentale.",
      s6: "Stretta sorveglianza militare dell'NKVD lungo la strada militare georgiana e sui passi di montagna confinanti con la Georgia e l'Ossezia.",
      s7: "Presidio armato permanente dei ponti ferroviari e degli oleodotti che attraversano la pianura inguscia verso Groznyj e il Mar Caspio.",
      s8: "Inquadramento dei riservisti ingusci nelle unità di frontiera della RSFSR prima dell'invasione tedesca dell'URSS.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Inguscezia (Distretto di Nazran' e Monti del Caucaso)",
    getAdminTitle: (_step: number) => "Čečeno-Ingušskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_60_Magadan_Oblast": {
    id: "SOV_ADM1_RUS_60_Magadan_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Magadan",
    historicalName: "Territorio della Kolyma (Magadan \u2014 Trust Dal'stroj dell'NKVD e Miniere d'Oro)",
    russianName: "Sevoctlag / Dal'stroj NKVD SSSR",
    adminTitle: "Glavnoe Upravlenie Stroitel'stva Dal'nego Severa (Dal'stroj NKVD)",
    capital: "Magadan",
    keys: ["adm1_rus_60_magadan_oblast", "dalstroj", "magadan", "magadan oblast", "magadan_oblast", "sevoctlag", "sov_adm1_rus_60_magadan_oblast"],
    notes: {
      s0: "Vasto e strategico Estremo Oriente sovietico affacciato sul Pacifico settentrionale e sull'Oceano Artico; comprende il Territorio di Chabarovsk sull'Amur, il cantiere navale n. 199 e l'impianto aeronautico n. 126 nella neo-fondata 'città della gioventù' Komsomol'sk-na-Amure (1932), la frontiera mancese lungo l'Amur a Blagoveščensk, l'Oblast Autonoma Ebraica di Birobidžan, l'isola di Sachalin settentrionale con i pozzi di Ocha (concessi in parte al Giappone), la penisola di Kamčatka e il famigerato trust minerario Dal'stroj dell'NKVD nella Kolyma (Magadan).",
      s1: "La Kolyma e i campi del Sevvostlag a Magadan accolgono decine di migliaia di prigionieri politici costretti all'estrazione dell'oro fluviale nel gelo artico; dure purghe colpiscono l'Oblast dell'Amur e Chabarovsk.",
      s2: "Komsomol'sk-na-Amure vara i primi cacciatorpediniere e produce bombardieri Il-4 nel cuore della taiga dell'Estremo Oriente.",
      s3_4: "Le riserve auree estratte dalla Kolyma garantiscono all'URSS le valute estere necessarie per l'acquisto di macchinari industriali avanzati e materie prime strategiche.",
      s5: "Chabarovsk coordina la sorveglianza militare contro la potente Armata del Kwantung schierata oltre il fiume Amur in Manciuria.",
      s6: "Sviluppo di difese costiere nella baia dell'Avača a Petropavlovsk-Kamčatskij e aeroporti avanzati a guardia dello Stretto di Bering verso l'Alaska.",
      s7: "A Ocha (Sachalin) l'NKVD controlla strettamente i pozzi petroliferi, limitando le concessioni giapponesi e reindirizzando il greggio alla flotta sovietica.",
      s8: "Il Patto di Neutralità con il Giappone dell'aprile 1941 assicura una tregua vitale lungo l'immenso arco del Pacifico, permettendo all'Estremo Oriente sovietico di concentrarsi sul rifornimento di oro, navi e petrolio alla patria minacciata a occidente.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Territorio della Kolyma (Magadan — Trust Dal'stroj dell'NKVD e Miniere d'Oro)",
    getAdminTitle: (_step: number) => "Glavnoe Upravlenie Stroitel'stva Dal'nego Severa (Dal'stroj NKVD)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_61_Ulyanovsk_Oblast": {
    id: "SOV_ADM1_RUS_61_Ulyanovsk_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Uljanovsk",
    historicalName: "Distretto di Uljanovsk (Simbirsk \u2014 Patria di Lenin sul Volga)",
    russianName: "Ulyanovskij okrug \u2014 Kuybyshevskaya oblast",
    adminTitle: "Ul'janovskij Gorsovet \u2014 RSFSR (URSS)",
    capital: "Ul'janovsk",
    keys: ["adm1_rus_61_ulyanovsk_oblast", "kuybyshevskaya", "oblast", "okrug", "sov_adm1_rus_61_ulyanovsk_oblast", "ul'janovsk", "uljanovsk", "ulyanovsk oblast", "ulyanovsk_oblast", "ulyanovskij"],
    notes: {
      s0: "Storica Simbirsk sul fiume Volga, ribattezzata Uljanovsk nel 1924 in onore del suo più illustre cittadino, Vladimir Il'ič Ul'janov (Lenin); meta di pellegrinaggio ideologico e polo della costruzione di motori e della lavorazione agroindustriale.",
      s1: "Custodia sacrale dei musei dedicati alla giovinezza di Lenin; epurazione dei quadri provinciali che avevano militato con i menscevichi prima del 1917.",
      s2: "Sviluppo del porto fluviale di Uljanovsk e ampliamento dei magazzini statali di cereali lungo il Volga.",
      s3_4: "Installazione di officine meccaniche sussidiarie per componenti di precisione per la vicina industria aeronautica di Gor'kij e Kujbyšev.",
      s5: "La città gestisce grandi flussi di cereali e viveri per i centri urbani di Mosca e Leningrado durante la riorganizzazione dei rifornimenti.",
      s6: "Progettazione dell'insediamento di una nuova filiale della fabbrica automobilistica ZIS da evacuare da Mosca in caso di emergenza bellica.",
      s7: "Avvio delle opere preliminari per la nascita dello stabilimento automobilistico UAZ (futuro produttore degli autocarri ZIS-5V).",
      s8: "Uljanovsk è un saldo centro di retrovia del Volga, intriso di simbolismo leninista e di salda riserva industriale.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Distretto di Uljanovsk (Simbirsk — Patria di Lenin sul Volga)",
    getAdminTitle: (_step: number) => "Ul'janovskij Gorsovet — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_62_Vladimir_Oblast": {
    id: "SOV_ADM1_RUS_62_Vladimir_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Vladimir",
    historicalName: "Distretto di Vladimir (Anello d'Oro \u2014 Fabbrica di Kovrov)",
    russianName: "Vladimirskij rajon \u2014 Ivanovskaya oblast",
    adminTitle: "Vladimirskij Gorsovet \u2014 RSFSR (URSS)",
    capital: "Vladimir",
    keys: ["adm1_rus_62_vladimir_oblast", "ivanovskaya", "oblast", "rajon", "sov_adm1_rus_62_vladimir_oblast", "vladimir", "vladimir oblast", "vladimir_oblast", "vladimirskij"],
    notes: {
      s0: "Culla medievale della Rus' di Vladimir-Suzdal' ricca di monumenti dell'Anello d'Oro; comprende il formidabile arsenale di Kovrov (fabbrica n. 2 Kirkizh), patria dei geniali progettisti d'armi Vasilij Degtjarëv e Georgij Špagin, costruttori delle mitragliatrici DP-27 e DK.",
      s1: "A Kovrov Degtjarëv perfeziona la mitragliatrice pesante DŠK calibro 12,7 mm e il primo mitra sovietico PPD-34/38 sotto strettissima segretezza militare.",
      s2: "Sviluppo a Kovrov delle prime armi automatiche individuali per le truppe d'assalto dell'Armata Rossa.",
      s3_4: "Durante gli scontri di confine contro i giapponesi, le mitragliatrici DP e DŠK di Kovrov si dimostrano micidiali ed essenziali.",
      s5: "Durante la sanguinosa Guerra d'Inverno contro la Finlandia, l'Armata Rossa sperimenta l'efficacia del mitra Suomi; Stalin ordina a Kovrov di decuplicare la produzione del mitra Degtjarëv PPD-40.",
      s6: "Nel 1940 a Kovrov il progettista Georgij Špagin progetta il leggendario mitra PPŠ-41 (Pistolet-Pulemët Špagina) a tamburo da 71 colpi, facile da produrre in serie con stampaggio di lamiera.",
      s7: "Kovrov e Vladimir avviano l'allestimento delle presse per la produzione di massa del PPŠ-41, destinato a diventare il simbolo del soldato sovietico.",
      s8: "L'arsenale di Kovrov è il cuore pulsante delle armi automatiche individuali e pesanti dell'Armata Rossa alla vigilia di Barbarossa.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Distretto di Vladimir (Anello d'Oro — Fabbrica di Kovrov)",
    getAdminTitle: (_step: number) => "Vladimirskij Gorsovet — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_63_Vologda_Oblast": {
    id: "SOV_ADM1_RUS_63_Vologda_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Vologda",
    historicalName: "Oblast di Vologda (Fiume Suchona \u2014 Snodo della Russia del Nord)",
    russianName: "Vologodskaya oblast",
    adminTitle: "Vologodskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Vologda",
    keys: ["adm1_rus_63_vologda_oblast", "oblast", "sov_adm1_rus_63_vologda_oblast", "vologda", "vologda oblast", "vologda_oblast", "vologodskaya"],
    notes: {
      s0: "Storiche città-stato medievali della Russia nord-occidentale; Pskov è sentinella di frontiera sul Lago dei Ciudi al confine con Estonia e Lettonia; Velikij Novgorod domina il Lago Il'men'; Vologda è il crocevia ferroviario nodale che unisce Mosca, Leningrado, Arcangelo e gli Urali.",
      s1: "Pskov è sottoposta a strettissimo regime di zona fortificata di frontiera (Pskovskij UR); dure purghe colpiscono gli ufficiali del Distretto Militare di Leningrado e i ferrovieri di Vologda.",
      s2: "Potenziamento delle fortezze d'artiglieria e dei fossati anticarro del settore fortificato di Pskov a sbarramento delle vie d'invasione baltiche.",
      s3_4: "Vologda smista a getto continuo materiali metallurgici provenienti dagli Urali verso i cantieri navali di Leningrado e i porti del Mar Bianco.",
      s5: "Durante la Guerra d'Inverno, Pskov e Novgorod sono centri di riserva e rifornimento per le armate sovietiche; gli ospedali militari accolgono migliaia di feriti careliani.",
      s6: "Nel giugno 1940, con l'annessione sovietica di Estonia e Lettonia, le guarnigioni di Pskov avanzano per occupare Tartu, Riga e Tallinn; la frontiera di Pskov cessa di essere confine estero.",
      s7: "Vologda viene designata come nodo di smistamento logistico prioritario per le evacuazioni da Leningrado verso la Siberia.",
      s8: "Pskov e Novgorod costituiscono la cerniera di transito e il fulcro difensivo avanzato a protezione della Russia centrale e settentrionale.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Vologda (Fiume Suchona — Snodo della Russia del Nord)",
    getAdminTitle: (_step: number) => "Vologodskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_64_Yaroslavl_Oblast": {
    id: "SOV_ADM1_RUS_64_Yaroslavl_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Jaroslavl'",
    historicalName: "Oblast di Jaroslavl' (Fabbrica JaAZ \u2014 Bacino Idroelettrico di Rybinsk)",
    russianName: "Yaroslavskaya oblast",
    adminTitle: "Jaroslavskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Jaroslavl'",
    keys: ["adm1_rus_64_yaroslavl_oblast", "jaroslavl", "jaroslavl'", "oblast", "sov_adm1_rus_64_yaroslavl_oblast", "yaroslavl oblast", "yaroslavl_oblast", "yaroslavskaya"],
    notes: {
      s0: "Importante metropoli industriale sul Volga; ospita la fabbrica automobilistica JaAZ (specializzata in autocarri pesanti JaG da 5 tonnellate e filobus), la prima fabbrica al mondo di gomma sintetica (SK-1) e la vicina Rybinsk, sede della colossale fabbrica di motori aeronautici n. 26 (M-100, M-105).",
      s1: "Nel 1935 parte la mastodontica costruzione del bacino idroelettrico di Rybinsk (Rybinskoe vodochranilišče) con l'impiego forzato di decine di migliaia di detenuti del Gulag di Volgolag.",
      s2: "La gomma sintetica di Jaroslavl' e i motori Klimov di Rybinsk alimentano le linee di montaggio aeronautiche di Mosca e Gor'kij.",
      s3_4: "A Rybinsk il capo progettista Vladimir Klimov sviluppa il motore V12 a liquido M-105, propulsore dei moderni caccia Yak-1 e bombardieri Pe-2.",
      s5: "Gli autocarri pesanti JaAZ e gli pneumatici di Jaroslavl' garantiscono il traino dei pezzi d'artiglieria pesante d'assedio sovietici.",
      s6: "Nel 1940 a Rybinsk viene completata la diga e inizia l'allagamento della gigantesca pianura di Mologa per la creazione del Mare di Rybinsk.",
      s7: "La fabbrica di motori n. 26 sforna migliaia di motori M-105 al mese, costituendo il cuore propulsivo dell'aviazione da caccia sovietica.",
      s8: "Jaroslavl' e Rybinsk sono colossi insostituibili dell'aviazione, della gomma e dell'energia idroelettrica a protezione di Mosca.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Jaroslavl' (Fabbrica JaAZ — Bacino Idroelettrico di Rybinsk)",
    getAdminTitle: (_step: number) => "Jaroslavskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_65_Voronezh_Oblast": {
    id: "SOV_ADM1_RUS_65_Voronezh_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Vorone\u017e",
    historicalName: "Oblast di Vorone\u017e (Fabbrica Aeronautica n. 18 sul Fiume Don)",
    russianName: "Voronezhskaya oblast",
    adminTitle: "Vorone\u017eskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Vorone\u017e",
    keys: ["adm1_rus_65_voronezh_oblast", "oblast", "sov_adm1_rus_65_voronezh_oblast", "vorone", "voronezh oblast", "voronezh_oblast", "voronezhskaya", "voronež"],
    notes: {
      s0: "Capitale della Regione Centrale delle Terre Nere sul fiume Voronež; polo aeronautico di importanza strategica mondiale con la Fabbrica d'Aviazione n. 18 (inaugurata nel 1932), costruttrice dei bombardieri pesanti TB-3 e Tupolev SB.",
      s1: "Dure purghe colpiscono gli ingegneri aeronautici della fabbrica n. 18; ciononostante la produzione di bombardieri veloci bimotori SB raddoppia per la Spagna e la Cina.",
      s2: "Nel 1938 a Voronež viene avviata la costruzione dello stabilimento per la sintesi della gomma artificiale Sovpren a base di alcol etilico.",
      s3_4: "La fabbrica n. 18 avvia l'allestimento delle catene di montaggio per il nuovo bombardiere a lungo raggio Il'jušin DB-3 (Il-4).",
      s5: "Alla fine del 1939 il Commissariato dell'Industria Aeronautica designa la fabbrica n. 18 come centro primario per la produzione di serie del leggendario velivolo d'attacco corazzato Il-2 Šturmovik.",
      s6: "Nel 1940 a Voronež decollano i primi esemplari di serie dell'Il-2 monoposto, l'aereo blindato 'carro volante' destinato a diventare il velivolo militare più prodotto della storia.",
      s7: "Fabbrica di locomotive e cannoni Kominterm a Voronež riceve l'ordine segreto di sviluppare la rampa di lancio multipla per razzi BM-13 (i futuri 'Organi di Stalin' / Katjuša).",
      s8: "A giugno 1941 Voronež sforna i primi lotti operativi di Il-2 Šturmovik e le primissime rampe lanciarazzi Katjuša dell'Armata Rossa.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Voronež (Fabbrica Aeronautica n. 18 sul Fiume Don)",
    getAdminTitle: (_step: number) => "Voronežskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_66_Yamalo_Nenets_Autonomous_Okrug": {
    id: "SOV_ADM1_RUS_66_Yamalo_Nenets_Autonomous_Okrug",
    republic: "RSFSR",
    modernName: "Circondario Autonomo Jamalo-Nenec",
    historicalName: "Circondario Nazionale Jamalo-Nenec (Salechard / Obdorsk \u2014 Penisola di Jamal)",
    russianName: "Jamalo-Neneckij nacional'nyj okrug \u2014 Omskaya oblast",
    adminTitle: "Jamalo-Neneckij Okrispolkom \u2014 RSFSR (URSS)",
    capital: "Salechard",
    keys: ["adm1_rus_66_yamalo_nenets_autonomous_okrug", "autonomo", "circondario", "jamalonenec", "jamaloneneckij", "nacionalnyj", "oblast", "okrug", "omskaya", "salechard", "sov_adm1_rus_66_yamalo_nenets_autonomous_okrug", "yamalo nenets autonomous okrug", "yamalo_nenets_autonomous_okrug"],
    notes: {
      s0: "Immenso entroterra siberiano e artico solcato dai fiumi giganti Enisej, Lena e Ob'; comprende le ricchezze minerarie dell'Altaj, la fabbrica aeronautica n. 125 di Irkutsk (costruttrice dei bombardieri veloci SB e Pe-2), l'estrazione d'oro e diamanti in Jacuzia lungo l'Aldan, le renne dei Nenec e le foreste sconfinate della taiga siberiana.",
      s1: "Istituzione di campi di lavoro forestali del Gulag (Kraslag, Siblag) lungo la Transiberiana e i fiumi navigabili per il taglio del legname.",
      s2: "La fabbrica d'aviazione n. 125 di Irkutsk raggiunge la piena operatività, producendo bombardieri per la flotta dell'Estremo Oriente e per la Cina nazionalista contro i giapponesi.",
      s3_4: "I monti Altaj forniscono piombo, zinco e metalli non ferrosi essenziali per le munizioni dell'Armata Rossa.",
      s5: "Durante la Guerra d'Inverno e le campagne europee, la Siberia addestra reggimenti di sciatori e tiratori scelti abituati a sopravvivere a -40°C.",
      s6: "Sviluppo della rotta marittima del Nord (Glavsevmorput') con rompighiaccio a vapore che collegano la foce dell'Enisej e della Lena ad Arcangelo e Vladivostok.",
      s7: "Irkutsk e Krasnojarsk ampliano le officine meccaniche e le centrali elettriche per accogliere gli impianti pesanti da evacuare da Mosca e Leningrado.",
      s8: "Alla vigilia del 22 giugno 1941, le sconfinate distese della Siberia centrale e orientale rappresentano la riserva demografica, mineraria e strategica invincibile dell'Unione Sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Circondario Nazionale Jamalo-Nenec (Salechard / Obdorsk — Penisola di Jamal)",
    getAdminTitle: (_step: number) => "Jamalo-Neneckij Okrispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_67_Altai_Republic": {
    id: "SOV_ADM1_RUS_67_Altai_Republic",
    republic: "RSFSR",
    modernName: "Repubblica dell'Altaj",
    historicalName: "Oblast Autonoma di Ojrot (Ojrot-Tura \u2014 Monti Altaj e Frontiera Mongola)",
    russianName: "Ojrotskaya AO \u2014 Altajskij kraj",
    adminTitle: "Ojrotskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Ojrot-Tura (Gorno-Altajsk)",
    keys: ["adm1_rus_67_altai_republic", "altai republic", "altai_republic", "altajskij", "dellaltaj", "ojrot-tura (gorno-altajsk)", "ojrotskaya", "ojrotturagornoaltajsk", "repubblica", "sov_adm1_rus_67_altai_republic"],
    notes: {
      s0: "Immenso entroterra siberiano e artico solcato dai fiumi giganti Enisej, Lena e Ob'; comprende le ricchezze minerarie dell'Altaj, la fabbrica aeronautica n. 125 di Irkutsk (costruttrice dei bombardieri veloci SB e Pe-2), l'estrazione d'oro e diamanti in Jacuzia lungo l'Aldan, le renne dei Nenec e le foreste sconfinate della taiga siberiana.",
      s1: "Istituzione di campi di lavoro forestali del Gulag (Kraslag, Siblag) lungo la Transiberiana e i fiumi navigabili per il taglio del legname.",
      s2: "La fabbrica d'aviazione n. 125 di Irkutsk raggiunge la piena operatività, producendo bombardieri per la flotta dell'Estremo Oriente e per la Cina nazionalista contro i giapponesi.",
      s3_4: "I monti Altaj forniscono piombo, zinco e metalli non ferrosi essenziali per le munizioni dell'Armata Rossa.",
      s5: "Durante la Guerra d'Inverno e le campagne europee, la Siberia addestra reggimenti di sciatori e tiratori scelti abituati a sopravvivere a -40°C.",
      s6: "Sviluppo della rotta marittima del Nord (Glavsevmorput') con rompighiaccio a vapore che collegano la foce dell'Enisej e della Lena ad Arcangelo e Vladivostok.",
      s7: "Irkutsk e Krasnojarsk ampliano le officine meccaniche e le centrali elettriche per accogliere gli impianti pesanti da evacuare da Mosca e Leningrado.",
      s8: "Alla vigilia del 22 giugno 1941, le sconfinate distese della Siberia centrale e orientale rappresentano la riserva demografica, mineraria e strategica invincibile dell'Unione Sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast Autonoma di Ojrot (Ojrot-Tura — Monti Altaj e Frontiera Mongola)",
    getAdminTitle: (_step: number) => "Ojrotskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_68_Ivanovo_Oblast": {
    id: "SOV_ADM1_RUS_68_Ivanovo_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Ivanovo",
    historicalName: "Oblast di Ivanovo (La Capitale Tessile dell'URSS)",
    russianName: "Ivanovskaya oblast",
    adminTitle: "Ivanovskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Ivanovo",
    keys: ["adm1_rus_68_ivanovo_oblast", "ivanovo", "ivanovo oblast", "ivanovo_oblast", "ivanovskaya", "oblast", "sov_adm1_rus_68_ivanovo_oblast"],
    notes: {
      s0: "Capitale dell'industria tessile russa, nota storicamente come 'la città delle spose' e culla del primo Soviet operaio del 1905; i suoi stabilimenti tessili lavorano il cotone dell'Asia centrale producendo la maggioranza delle divise, teli tenda e bende mediche dell'URSS.",
      s1: "Stachanovismo estremo nelle filande e telerie sotto la guida dell'operaia tessile Evdokija Vinogradova; dure purghe colpiscono i sindacalisti e i funzionari dell'industria leggera.",
      s2: "Istituzione di stabilimenti per la fabbricazione di paracadute per le neonate truppe aviotrasportate (VDV) dell'Armata Rossa.",
      s3_4: "Ivanovo produce oltre l'80% delle tele per paracadute, delle bende e del tessuto impermeabile mimetico dell'esercito sovietico.",
      s5: "Durante la Guerra d'Inverno le filande di Ivanovo lavorano giorno e notte per produrre divise invernali imbottite (telogrejki) e tute mimetiche bianche per le truppe sciatori.",
      s6: "Ampliamento delle officine chimiche per coloranti tessili e tinture mimetiche speciali per veicoli e aerei.",
      s7: "Pianificazione dell'accoglienza di stabilimenti tessili da Minsk e Smolensk in caso di conflitto aperto.",
      s8: "Ivanovo è l'officina del guardaroba da combattimento e dei paracadute dell'Armata Rossa alla vigilia della guerra.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Ivanovo (La Capitale Tessile dell'URSS)",
    getAdminTitle: (_step: number) => "Ivanovskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_69_Jewish_Autonomous_Oblast": {
    id: "SOV_ADM1_RUS_69_Jewish_Autonomous_Oblast",
    republic: "RSFSR",
    modernName: "Oblast Autonoma Ebraica",
    historicalName: "Oblast Autonoma Ebraica (Birobid\u017ean \u2014 Fiume Amur e Transiberiana)",
    russianName: "Evreyskaya AO \u2014 Khabarovskij kraj",
    adminTitle: "Evrejskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Birobid\u017ean",
    keys: ["adm1_rus_69_jewish_autonomous_oblast", "autonoma", "birobidan", "birobidžan", "ebraica", "evreyskaya", "jewish autonomous oblast", "jewish_autonomous_oblast", "khabarovskij", "sov_adm1_rus_69_jewish_autonomous_oblast"],
    notes: {
      s0: "Vasto e strategico Estremo Oriente sovietico affacciato sul Pacifico settentrionale e sull'Oceano Artico; comprende il Territorio di Chabarovsk sull'Amur, il cantiere navale n. 199 e l'impianto aeronautico n. 126 nella neo-fondata 'città della gioventù' Komsomol'sk-na-Amure (1932), la frontiera mancese lungo l'Amur a Blagoveščensk, l'Oblast Autonoma Ebraica di Birobidžan, l'isola di Sachalin settentrionale con i pozzi di Ocha (concessi in parte al Giappone), la penisola di Kamčatka e il famigerato trust minerario Dal'stroj dell'NKVD nella Kolyma (Magadan).",
      s1: "La Kolyma e i campi del Sevvostlag a Magadan accolgono decine di migliaia di prigionieri politici costretti all'estrazione dell'oro fluviale nel gelo artico; dure purghe colpiscono l'Oblast dell'Amur e Chabarovsk.",
      s2: "Komsomol'sk-na-Amure vara i primi cacciatorpediniere e produce bombardieri Il-4 nel cuore della taiga dell'Estremo Oriente.",
      s3_4: "Le riserve auree estratte dalla Kolyma garantiscono all'URSS le valute estere necessarie per l'acquisto di macchinari industriali avanzati e materie prime strategiche.",
      s5: "Chabarovsk coordina la sorveglianza militare contro la potente Armata del Kwantung schierata oltre il fiume Amur in Manciuria.",
      s6: "Sviluppo di difese costiere nella baia dell'Avača a Petropavlovsk-Kamčatskij e aeroporti avanzati a guardia dello Stretto di Bering verso l'Alaska.",
      s7: "A Ocha (Sachalin) l'NKVD controlla strettamente i pozzi petroliferi, limitando le concessioni giapponesi e reindirizzando il greggio alla flotta sovietica.",
      s8: "Il Patto di Neutralità con il Giappone dell'aprile 1941 assicura una tregua vitale lungo l'immenso arco del Pacifico, permettendo all'Estremo Oriente sovietico di concentrarsi sul rifornimento di oro, navi e petrolio alla patria minacciata a occidente.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast Autonoma Ebraica (Birobidžan — Fiume Amur e Transiberiana)",
    getAdminTitle: (_step: number) => "Evrejskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_6_Khanty_Mansiysk_Autonomous_Okrug___Ugra": {
    id: "SOV_ADM1_RUS_6_Khanty_Mansiysk_Autonomous_Okrug___Ugra",
    republic: "RSFSR",
    modernName: "Circondario Autonomo degli Chanty-Mansi-Jugra",
    historicalName: "Circondario Nazionale di Ostiachia-Vogulia (Fiumi Ob' e Irty\u0161)",
    russianName: "Ostjako-Vogul'skij nacional'nyj okrug \u2014 Omskaya oblast",
    adminTitle: "Ostjako-Vogul'skij Okrispolkom \u2014 RSFSR (URSS)",
    capital: "Ostjako-Vogul'sk (Chanty-Mansijsk)",
    keys: ["adm1_rus_6_khanty_mansiysk_autonomous_okrug___ugra", "autonomo", "chantymansijugra", "circondario", "degli", "khanty mansiysk autonomous okrug   ugra", "khanty_mansiysk_autonomous_okrug___ugra", "nacionalnyj", "oblast", "okrug", "omskaya", "ostjako-vogul'sk (chanty-mansijsk)", "ostjakovogulskchantymansijsk", "ostjakovogulskij", "sov_adm1_rus_6_khanty_mansiysk_autonomous_okrug___ugra"],
    notes: {
      s0: "Immenso entroterra siberiano e artico solcato dai fiumi giganti Enisej, Lena e Ob'; comprende le ricchezze minerarie dell'Altaj, la fabbrica aeronautica n. 125 di Irkutsk (costruttrice dei bombardieri veloci SB e Pe-2), l'estrazione d'oro e diamanti in Jacuzia lungo l'Aldan, le renne dei Nenec e le foreste sconfinate della taiga siberiana.",
      s1: "Istituzione di campi di lavoro forestali del Gulag (Kraslag, Siblag) lungo la Transiberiana e i fiumi navigabili per il taglio del legname.",
      s2: "La fabbrica d'aviazione n. 125 di Irkutsk raggiunge la piena operatività, producendo bombardieri per la flotta dell'Estremo Oriente e per la Cina nazionalista contro i giapponesi.",
      s3_4: "I monti Altaj forniscono piombo, zinco e metalli non ferrosi essenziali per le munizioni dell'Armata Rossa.",
      s5: "Durante la Guerra d'Inverno e le campagne europee, la Siberia addestra reggimenti di sciatori e tiratori scelti abituati a sopravvivere a -40°C.",
      s6: "Sviluppo della rotta marittima del Nord (Glavsevmorput') con rompighiaccio a vapore che collegano la foce dell'Enisej e della Lena ad Arcangelo e Vladivostok.",
      s7: "Irkutsk e Krasnojarsk ampliano le officine meccaniche e le centrali elettriche per accogliere gli impianti pesanti da evacuare da Mosca e Leningrado.",
      s8: "Alla vigilia del 22 giugno 1941, le sconfinate distese della Siberia centrale e orientale rappresentano la riserva demografica, mineraria e strategica invincibile dell'Unione Sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Circondario Nazionale di Ostiachia-Vogulia (Fiumi Ob' e Irtyš)",
    getAdminTitle: (_step: number) => "Ostjako-Vogul'skij Okrispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_70_Kalmykia": {
    id: "SOV_ADM1_RUS_70_Kalmykia",
    republic: "RSFSR",
    modernName: "Repubblica di Calmucchia",
    historicalName: "RSSA di Calmucchia (\u00c8lista \u2014 Steppe Caspiche)",
    russianName: "Kalmytskaya ASSR",
    adminTitle: "Sovet Narodnykh Komissarov Kalmyckoj ASSR \u2014 RSFSR (URSS)",
    capital: "\u00c8lista",
    keys: ["adm1_rus_70_kalmykia", "calmucchia", "kalmykia", "kalmytskaya", "lista", "repubblica", "sov_adm1_rus_70_kalmykia", "èlista"],
    notes: {
      s0: "Repubblica autonoma delle steppe aride a ovest della foce del Volga, popolata da calmucchi di religione tradizionalmente buddista; il capoluogo Èlista è centro dell'allevamento estensivo di cavalli e pecore e della pesca nel Mar Caspio.",
      s1: "Campagna antireligiosa feroce condotta dall'NKVD: chiusura e distruzione di tutti i templi buddisti (churul) e arresto dei lama calmucchi.",
      s2: "Collettivizzazione forzata dei nomadi calmucchi in kolchoz zootecnici e sviluppo della bonifica dei canali d'irrigazione della steppa.",
      s3_4: "I cavalieri calmucchi vengono arruolati nell'Armata Rossa, formando reggimenti di cavalleria famosi per la loro resistenza nel deserto e nella steppa.",
      s5: "Forniture record di montone essiccato, pelli di pecora e lana grezza per le forniture invernali dei soldati sovietici al fronte.",
      s6: "Costruzione della ferrovia militare strategica Kizljar-Astrachan' attraverso la steppa per mettere al sicuro il flusso di petrolio caucasico.",
      s7: "La Calmucchia intensifica l'addestramento dei riservisti a cavallo e la sorveglianza contro infiltrazioni nemiche dal Caspio.",
      s8: "Le immense steppe della Calmucchia costituiscono la vasta retrovia meridionale dell'ansa del Volga tra Stalingrado e il Caspio.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSSA di Calmucchia (Èlista — Steppe Caspiche)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Kalmyckoj ASSR — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_71_Kamchatka_Krai": {
    id: "SOV_ADM1_RUS_71_Kamchatka_Krai",
    republic: "RSFSR",
    modernName: "Territorio della Kam\u010datka",
    historicalName: "Oblast della Kam\u010datka (Petropavlovsk \u2014 Baia dell'Ava\u010da e Isole Curili)",
    russianName: "Kamchatskaya oblast \u2014 Khabarovskij kraj",
    adminTitle: "Kam\u010datskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Petropavlovsk-Kam\u010datskij",
    keys: ["adm1_rus_71_kamchatka_krai", "della", "kamatka", "kamchatka krai", "kamchatka_krai", "kamchatskaya", "khabarovskij", "oblast", "petropavlovsk-kamčatskij", "petropavlovskkamatskij", "sov_adm1_rus_71_kamchatka_krai", "territorio"],
    notes: {
      s0: "Vasto e strategico Estremo Oriente sovietico affacciato sul Pacifico settentrionale e sull'Oceano Artico; comprende il Territorio di Chabarovsk sull'Amur, il cantiere navale n. 199 e l'impianto aeronautico n. 126 nella neo-fondata 'città della gioventù' Komsomol'sk-na-Amure (1932), la frontiera mancese lungo l'Amur a Blagoveščensk, l'Oblast Autonoma Ebraica di Birobidžan, l'isola di Sachalin settentrionale con i pozzi di Ocha (concessi in parte al Giappone), la penisola di Kamčatka e il famigerato trust minerario Dal'stroj dell'NKVD nella Kolyma (Magadan).",
      s1: "La Kolyma e i campi del Sevvostlag a Magadan accolgono decine di migliaia di prigionieri politici costretti all'estrazione dell'oro fluviale nel gelo artico; dure purghe colpiscono l'Oblast dell'Amur e Chabarovsk.",
      s2: "Komsomol'sk-na-Amure vara i primi cacciatorpediniere e produce bombardieri Il-4 nel cuore della taiga dell'Estremo Oriente.",
      s3_4: "Le riserve auree estratte dalla Kolyma garantiscono all'URSS le valute estere necessarie per l'acquisto di macchinari industriali avanzati e materie prime strategiche.",
      s5: "Chabarovsk coordina la sorveglianza militare contro la potente Armata del Kwantung schierata oltre il fiume Amur in Manciuria.",
      s6: "Sviluppo di difese costiere nella baia dell'Avača a Petropavlovsk-Kamčatskij e aeroporti avanzati a guardia dello Stretto di Bering verso l'Alaska.",
      s7: "A Ocha (Sachalin) l'NKVD controlla strettamente i pozzi petroliferi, limitando le concessioni giapponesi e reindirizzando il greggio alla flotta sovietica.",
      s8: "Il Patto di Neutralità con il Giappone dell'aprile 1941 assicura una tregua vitale lungo l'immenso arco del Pacifico, permettendo all'Estremo Oriente sovietico di concentrarsi sul rifornimento di oro, navi e petrolio alla patria minacciata a occidente.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast della Kamčatka (Petropavlovsk — Baia dell'Avača e Isole Curili)",
    getAdminTitle: (_step: number) => "Kamčatskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_72_Karachay_Cherkessia": {
    id: "SOV_ADM1_RUS_72_Karachay_Cherkessia",
    republic: "RSFSR",
    modernName: "Repubblica di Caraciai-Circassia",
    historicalName: "Oblast Autonoma Caraciai-Circassa (Monti Dombaj e Fiume Kuban')",
    russianName: "Karachaevo-Cherkesskaya AO",
    adminTitle: "Karachaevo-Cherkesskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Sulimov (\u010cerkessk)",
    keys: ["adm1_rus_72_karachay_cherkessia", "caraciaicircassia", "karachaevocherkesskaya", "karachay cherkessia", "karachay_cherkessia", "repubblica", "sov_adm1_rus_72_karachay_cherkessia", "sulimov (čerkessk)", "sulimoverkessk"],
    notes: {
      s0: "Regione montuosa e forestale delle sorgenti del Kuban'; comprende le spettacolari valli alpine di Dombaj e Teberda. Il capoluogo Čerkessk è ribattezzato Sulimov nel 1934 in onore del leader bolscevico Daniil Sulimov.",
      s1: "Nel 1937, con l'arresto e la fucilazione di Sulimov durante le purghe, la città viene ribattezzata Ježovo-Čerkessk in onore di Nikolaj Ežov.",
      s2: "Nel 1939, dopo la caduta in disgrazia di Ežov, la città assume il nome definitivo di Čerkessk; la regione rifornisce l'esercito di lana, carne e legname.",
      s3_4: "Sviluppo di sanatori montani e basi d'addestramento per scalatori militari sovietici nelle valli dell'Alto Kuban'.",
      s5: "Potenziamento dell'estrazione di rame e piombo nelle miniere di Urup e Kurdžinovo a sostegno della produzione bellica.",
      s6: "Addestramento di reparti di cavalleria da montagna tra i villaggi caraciai e circassi a presidio dei valichi transcaucasici.",
      s7: "Rafforzamento dei posti di guardia e pattugliamento delle gole verso la costa del Mar Nero attraverso i passi Kluchor e Maruch.",
      s8: "La regione montuosa funge da baluardo naturale e fornitrice di materie prime per il fronte meridionale dell'URSS.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast Autonoma Caraciai-Circassa (Monti Dombaj e Fiume Kuban')",
    getAdminTitle: (_step: number) => "Karachaevo-Cherkesskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_73_Kemerovo_Oblast": {
    id: "SOV_ADM1_RUS_73_Kemerovo_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Kemerovo",
    historicalName: "Bacino del Kuzbass (Stalinsk / Novokuzneck \u2014 Colosso Metallurgico KMK)",
    russianName: "Kuzneckij metallurgi\u010deskij kombinat imeni Stalina \u2014 Novosibirskaya oblast",
    adminTitle: "Kuzbasskij Gorsovet \u2014 RSFSR (URSS)",
    capital: "Stalinsk (Novokuzneck)",
    keys: ["adm1_rus_73_kemerovo_oblast", "imeni", "kemerovo", "kemerovo oblast", "kemerovo_oblast", "kombinat", "kuzneckij", "metallurgieskij", "novosibirskaya", "oblast", "sov_adm1_rus_73_kemerovo_oblast", "stalina", "stalinsk (novokuzneck)", "stalinsknovokuzneck"],
    notes: {
      s0: "Cuore industriale e minerario della Siberia Occidentale; comprende la metropoli in vertiginosa ascesa di Novosibirsk (capitale amministrativa sul fiume Ob', sede della fabbrica aeronautica n. 153 intitolata a Čkalov), il colossale bacino carbonifero del Kuzbass con le acciaierie giganti KMK di Stalinsk (Novokuzneck), e il polo agricolo-meccanico di Omsk.",
      s1: "Dure purghe dell'NKVD nel Kuzbass contro ingegneri minerari e dirigenti stranieri del polo carbo-siderurgico Ural-Kuzbass; la fabbrica aeronautica n. 153 viene completata e avvia la produzione di caccia Polikarpov I-16.",
      s2: "Il Kuzbass fornisce milioni di tonnellate di carbone da coke di qualità eccelsa per alimentare a ciclo continuo le acciaierie di Magnitogorsk e Sverdlovsk.",
      s3_4: "La fabbrica d'aviazione n. 153 di Novosibirsk produce oltre mille caccia I-16 all'anno, diventando la più prolifica fabbrica di aerei da caccia a est degli Urali.",
      s5: "A Stalinsk (Novokuzneck) entra in funzione il laminatoio per rotaie pesanti e blindature per carri armati; la Siberia occidentale è individuata come il rifugio supremo dell'industria sovietica.",
      s6: "Nel 1940 a Novosibirsk partono le linee di assemblaggio del nuovo caccia moderno LaGG-3; Omsk predispone lo stabilimento n. 174 per la produzione di carri armati.",
      s7: "Piani dettagliati del Gosplan per la creazione di piattaforme ferroviarie di sbarco per centinaia di stabilimenti evacuandi da Ucraina, Bielorussia e Russia europea.",
      s8: "Alla vigilia della guerra, l'asse Novosibirsk-Kuzbass-Omsk è la spina dorsale energetica, metallurgica e aeronautica invulnerabile dell'URSS, pronta ad accogliere il più grande trasferimento industriale della storia umana.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Bacino del Kuzbass (Stalinsk / Novokuzneck — Colosso Metallurgico KMK)",
    getAdminTitle: (_step: number) => "Kuzbasskij Gorsovet — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_74_Khabarovsk_Krai": {
    id: "SOV_ADM1_RUS_74_Khabarovsk_Krai",
    republic: "RSFSR",
    modernName: "Territorio di Chabarovsk",
    historicalName: "Territorio di Chabarovsk (Fiume Amur \u2014 Cantiere Navale n. 199 Komsomol'sk)",
    russianName: "Khabarovskij kraj",
    adminTitle: "Chabarovskij Kraiispolkom \u2014 RSFSR (URSS)",
    capital: "Chabarovsk",
    keys: ["adm1_rus_74_khabarovsk_krai", "chabarovsk", "khabarovsk krai", "khabarovsk_krai", "khabarovskij", "sov_adm1_rus_74_khabarovsk_krai", "territorio"],
    notes: {
      s0: "Vasto e strategico Estremo Oriente sovietico affacciato sul Pacifico settentrionale e sull'Oceano Artico; comprende il Territorio di Chabarovsk sull'Amur, il cantiere navale n. 199 e l'impianto aeronautico n. 126 nella neo-fondata 'città della gioventù' Komsomol'sk-na-Amure (1932), la frontiera mancese lungo l'Amur a Blagoveščensk, l'Oblast Autonoma Ebraica di Birobidžan, l'isola di Sachalin settentrionale con i pozzi di Ocha (concessi in parte al Giappone), la penisola di Kamčatka e il famigerato trust minerario Dal'stroj dell'NKVD nella Kolyma (Magadan).",
      s1: "La Kolyma e i campi del Sevvostlag a Magadan accolgono decine di migliaia di prigionieri politici costretti all'estrazione dell'oro fluviale nel gelo artico; dure purghe colpiscono l'Oblast dell'Amur e Chabarovsk.",
      s2: "Komsomol'sk-na-Amure vara i primi cacciatorpediniere e produce bombardieri Il-4 nel cuore della taiga dell'Estremo Oriente.",
      s3_4: "Le riserve auree estratte dalla Kolyma garantiscono all'URSS le valute estere necessarie per l'acquisto di macchinari industriali avanzati e materie prime strategiche.",
      s5: "Chabarovsk coordina la sorveglianza militare contro la potente Armata del Kwantung schierata oltre il fiume Amur in Manciuria.",
      s6: "Sviluppo di difese costiere nella baia dell'Avača a Petropavlovsk-Kamčatskij e aeroporti avanzati a guardia dello Stretto di Bering verso l'Alaska.",
      s7: "A Ocha (Sachalin) l'NKVD controlla strettamente i pozzi petroliferi, limitando le concessioni giapponesi e reindirizzando il greggio alla flotta sovietica.",
      s8: "Il Patto di Neutralità con il Giappone dell'aprile 1941 assicura una tregua vitale lungo l'immenso arco del Pacifico, permettendo all'Estremo Oriente sovietico di concentrarsi sul rifornimento di oro, navi e petrolio alla patria minacciata a occidente.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Territorio di Chabarovsk (Fiume Amur — Cantiere Navale n. 199 Komsomol'sk)",
    getAdminTitle: (_step: number) => "Chabarovskij Kraiispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_75_Chukotka_Autonomous_Okrug": {
    id: "SOV_ADM1_RUS_75_Chukotka_Autonomous_Okrug",
    republic: "RSFSR",
    modernName: "Circondario Autonomo della \u010cukotka",
    historicalName: "Circondario Nazionale di \u010cukotka (Anadyr' \u2014 Stretto di Bering e Frontiera USA)",
    russianName: "Chukotskij nacional'nyj okrug \u2014 Kamchatskaya oblast",
    adminTitle: "\u010cukotskij Okrispolkom \u2014 RSFSR (URSS)",
    capital: "Anadyr'",
    keys: ["adm1_rus_75_chukotka_autonomous_okrug", "anadyr", "anadyr'", "autonomo", "chukotka autonomous okrug", "chukotka_autonomous_okrug", "chukotskij", "circondario", "della", "kamchatskaya", "nacionalnyj", "oblast", "okrug", "sov_adm1_rus_75_chukotka_autonomous_okrug", "ukotka"],
    notes: {
      s0: "Vasto e strategico Estremo Oriente sovietico affacciato sul Pacifico settentrionale e sull'Oceano Artico; comprende il Territorio di Chabarovsk sull'Amur, il cantiere navale n. 199 e l'impianto aeronautico n. 126 nella neo-fondata 'città della gioventù' Komsomol'sk-na-Amure (1932), la frontiera mancese lungo l'Amur a Blagoveščensk, l'Oblast Autonoma Ebraica di Birobidžan, l'isola di Sachalin settentrionale con i pozzi di Ocha (concessi in parte al Giappone), la penisola di Kamčatka e il famigerato trust minerario Dal'stroj dell'NKVD nella Kolyma (Magadan).",
      s1: "La Kolyma e i campi del Sevvostlag a Magadan accolgono decine di migliaia di prigionieri politici costretti all'estrazione dell'oro fluviale nel gelo artico; dure purghe colpiscono l'Oblast dell'Amur e Chabarovsk.",
      s2: "Komsomol'sk-na-Amure vara i primi cacciatorpediniere e produce bombardieri Il-4 nel cuore della taiga dell'Estremo Oriente.",
      s3_4: "Le riserve auree estratte dalla Kolyma garantiscono all'URSS le valute estere necessarie per l'acquisto di macchinari industriali avanzati e materie prime strategiche.",
      s5: "Chabarovsk coordina la sorveglianza militare contro la potente Armata del Kwantung schierata oltre il fiume Amur in Manciuria.",
      s6: "Sviluppo di difese costiere nella baia dell'Avača a Petropavlovsk-Kamčatskij e aeroporti avanzati a guardia dello Stretto di Bering verso l'Alaska.",
      s7: "A Ocha (Sachalin) l'NKVD controlla strettamente i pozzi petroliferi, limitando le concessioni giapponesi e reindirizzando il greggio alla flotta sovietica.",
      s8: "Il Patto di Neutralità con il Giappone dell'aprile 1941 assicura una tregua vitale lungo l'immenso arco del Pacifico, permettendo all'Estremo Oriente sovietico di concentrarsi sul rifornimento di oro, navi e petrolio alla patria minacciata a occidente.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Circondario Nazionale di Čukotka (Anadyr' — Stretto di Bering e Frontiera USA)",
    getAdminTitle: (_step: number) => "Čukotskij Okrispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_76_Dagestan": {
    id: "SOV_ADM1_RUS_76_Dagestan",
    republic: "RSFSR",
    modernName: "Repubblica del Daghestan",
    historicalName: "RSSA del Daghestan (Macha\u010dkala \u2014 Mar Caspio e Pozzi di Izberba\u0161)",
    russianName: "Dagestanskaya ASSR",
    adminTitle: "Sovet Narodnykh Komissarov Dagestanskoj ASSR \u2014 RSFSR (URSS)",
    capital: "Macha\u010dkala",
    keys: ["adm1_rus_76_dagestan", "dagestan", "dagestanskaya", "daghestan", "machakala", "machačkala", "repubblica", "sov_adm1_rus_76_dagestan"],
    notes: {
      s0: "Mosaico etnico montuoso e costiero sul Mar Caspio con oltre trenta nazionalità; la capitale Machačkala (ex Petrovsk-Port) ospita un primario porto petrolifero e lo stabilimento meccanico Dvigatel'stroj (fabbrica n. 182) specializzato nella fabbricazione di siluri navali e armi per la marina.",
      s1: "Purghe dell'NKVD contro intellettuali e religiosi musulmani nei villaggi d'alta montagna; repressione dei residui focolai nazionalisti daghestani.",
      s2: "Sviluppo dell'estrazione petrolifera offshore e litoranea a Izberbaš e Derbent, con oleodotti collegati a Machačkala e Groznyj.",
      s3_4: "La fabbrica Dvigatel'stroj produce in segreto siluri navali pesanti 53-38 per i sommergibili e i cacciatorpediniere dell'Armata Rossa.",
      s5: "Il porto di Machačkala smista via petroliere milioni di tonnellate di greggio da Baku verso le ferrovie della Russia centrale.",
      s6: "Nel 1940 a Dvigatel'stroj viene ultimata la leggendaria stazione sperimentale di collaudo siluri in mezzo al mare (Padiglione n. 8), capolavoro ingegneristico marino.",
      s7: "Rafforzamento delle difese costiere del Caspio e delle guarnigioni a presidio della via ferroviaria Baku-Machačkala-Rostov.",
      s8: "Il Daghestan è il corridoio logistico e marittimo indispensabile per il transito del 70% del carburante che alimenta l'intera macchina bellica dell'URSS.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSSA del Daghestan (Machačkala — Mar Caspio e Pozzi di Izberbaš)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Dagestanskoj ASSR — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_77_Orenburg_Oblast": {
    id: "SOV_ADM1_RUS_77_Orenburg_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Orenburg",
    historicalName: "Oblast di \u010ckalov (Orenburg \u2014 Confine col Kazakistan)",
    russianName: "Chkalovskaya oblast",
    adminTitle: "\u010ckalovskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "\u010ckalov",
    keys: ["adm1_rus_77_orenburg_oblast", "chkalovskaya", "kalov", "oblast", "orenburg", "orenburg oblast", "orenburg_oblast", "sov_adm1_rus_77_orenburg_oblast", "čkalov"],
    notes: {
      s0: "Porta d'accesso dell'URSS verso l'Asia Centrale e il Kazakistan lungo il fiume Ural; snodo della ferrovia Tashkent-Mosca e centro agricolo e di allevamento di cavalli per la cavalleria cosacca dell'Armata Rossa.",
      s1: "Nel dicembre 1938, a seguito della tragica morte del leggendario aviatore ed Eroe dell'Unione Sovietica Valerij Čkalov, la città di Orenburg e l'intera Oblast vengono intitolate a Čkalov.",
      s2: "Ammodernamento degli impianti metallurgici e minerari di Orsk e Chalilovo per l'estrazione di nickel, cromo e ferro nella steppa meridionale degli Urali.",
      s3_4: "Sviluppo accelerato della scuola di pilotaggio militare di Čkalov per l'addestramento accelerato di piloti da caccia dell'Aeronautica Sovietica (VVS).",
      s5: "La ferrovia di Čkalov smista verso la Russia centrale imponenti quantitativi di grano kazako e cotone uzbeko durante il blocco economico conseguente alla guerra in Europa.",
      s6: "Viene avviata la costruzione di grandi stabilimenti meccanici e di montaggio di vagoni a Orsk sotto il programma speciale degli stabilimenti di riserva.",
      s7: "Pianificazione dell'accoglienza di impianti industriali evacuandi da Mosca e Leningrado nei poli di Čkalov e Orsk.",
      s8: "Alla vigilia dell'estate 1941, l'Oblast di Čkalov è un perno logistico ed estrattivo vitale che unisce l'Asia centrale sovietica all'arsenale degli Urali.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Čkalov (Orenburg — Confine col Kazakistan)",
    getAdminTitle: (_step: number) => "Čkalovskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_78_Primorsky_Krai": {
    id: "SOV_ADM1_RUS_78_Primorsky_Krai",
    republic: "RSFSR",
    modernName: "Territorio del Litorale (Primor'e)",
    historicalName: "Territorio del Litorale (Vladivostok \u2014 Flotta del Pacifico e Battaglia del Lago Chasan)",
    russianName: "Primorskij kraj",
    adminTitle: "Primorskij Kraiispolkom & Comando Flotta del Pacifico \u2014 RSFSR (URSS)",
    capital: "Vladivostok",
    keys: ["adm1_rus_78_primorsky_krai", "litorale", "primore", "primorskij", "primorsky krai", "primorsky_krai", "sov_adm1_rus_78_primorsky_krai", "territorio", "vladivostok"],
    notes: {
      s0: "Capolinea oceanico della Ferrovia Transiberiana e base navale principale della Flotta del Pacifico (TTOF); avamposto militare sovietico sull'Oceano Pacifico confinante con la Corea occupata dai giapponesi e il Manciukuò. Nel 1936 vengono fortificate le coste della baia del Corno d'Oro e l'isola Russkij con mastodontiche batterie corazzate da 305 mm (Batteria Vorošilov).",
      s1: "Dure purghe colpiscono i comandi dell'Armata Rossa dell'Estremo Oriente: il maresciallo Vasilij Bljucher guida la difesa ma l'NKVD arresta centinaia di ufficiali superiori; deportazione preventiva dell'intera minoranza etnica coreana (170.000 persone) verso l'Asia Centrale per timore di spionaggio pro-nipponico.",
      s2: "Nell'agosto 1938 la regione è teatro della Battaglia del Lago Chasan (Changkufeng): violenti scontri campali tra la 39ª Armata sovietica e la 19ª Divisione imperiale giapponese per il possesso delle alture dominanti sul confine; le truppe sovietiche respingono i giapponesi con massiccio impiego di carri armati BT-7 e artiglieria pesante.",
      s3_4: "Istituito formalmente il Territorio del Litorale (Primorskij Kraj) nell'ottobre 1938; Bljucher viene arrestato e muore sotto tortura a Mosca; il comando passa al generale Štern che fortifica le frontiere marittime.",
      s5: "Durante la Guerra d'Europa e dopo la sconfitta giapponese a Chalchin Gol, il Litorale mantiene uno stato di allerta permanente lungo la frontiera con il Manciukuò.",
      s6: "Potenziamento dei cantieri navali Dal'zavod a Vladivostok per la costruzione di cacciatorpediniere e sommergibili classe 'Leninec' e 'Ščuka'.",
      s7: "La Flotta del Pacifico riceve squadriglie aeree navali e allestisce campi minati difensivi negli stretti marittimi a protezione di Vladivostok e Nachodka.",
      s8: "Con la firma del Patto di Neutralità Sovietico-Giapponese (13 aprile 1941) tra Stalin e Matsuoka, la frontiera del Primor'e viene temporaneamente messa al sicuro, consentendo a Mosca di pianificare il trasferimento segreto di divisioni scelte siberiane ed estremo-orientali verso l'Europa.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Territorio del Litorale (Vladivostok — Flotta del Pacifico e Battaglia del Lago Chasan)",
    getAdminTitle: (_step: number) => "Primorskij Kraiispolkom & Comando Flotta del Pacifico — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_79_Bashkortostan": {
    id: "SOV_ADM1_RUS_79_Bashkortostan",
    republic: "RSFSR",
    modernName: "Repubblica di Baschiria",
    historicalName: "RSSA Baschira (Ufa \u2014 Il 'Secondo Baku' a I\u0161imbaj)",
    russianName: "Bashkirskaya ASSR",
    adminTitle: "Sovet Narodnykh Komissarov Bashkirskoj ASSR \u2014 RSFSR (URSS)",
    capital: "Ufa",
    keys: ["adm1_rus_79_bashkortostan", "baschiria", "bashkirskaya", "bashkortostan", "repubblica", "sov_adm1_rus_79_bashkortostan", "ufa"],
    notes: {
      s0: "Repubblica autonoma tra il fiume Volga e gli Urali meridionali; dal 1932, con la scoperta del petrolio a Išimbajevo, la Baschiria si trasforma nel fulcro del 'Secondo Baku', affiancando l'agricoltura e le secolari tradizioni a cavallo dei baschiri.",
      s1: "La raffineria di Ufa, inaugurata nel 1938, avvia la lavorazione su scala industriale del greggio baschiro per le regioni industriali degli Urali.",
      s2: "Intensa attività dell'NKVD contro presunti nazionalisti e 'sabotatori del petrolio' nei distretti di Sterlitamak e Ufa.",
      s3_4: "Costruzione dell'oleodotto Išimbaj-Ufa e ampliamento della ferrovia per il trasporto di combustibile pesante alle acciaierie di Magnitogorsk.",
      s5: "L'estrazione petrolifera baschira supera i 2 milioni di tonnellate annue, assumendo rilievo strategico durante la seconda guerra mondiale per diminuire la vulnerabilità di Baku.",
      s6: "Potenziamento dell'impianto motori aeronautici n. 26 a Ufa, predisposto per la fabbricazione di motori Klimov per caccia Yak.",
      s7: "Sviluppo di infrastrutture per accogliere industrie ed esperti evacuandi dai bacini petroliferi dell'Ucraina e del Caucaso.",
      s8: "La Baschiria è il cuore energetico e metallurgico emergente dell'URSS, pronta a sostenere lo sforzo bellico con milioni di tonnellate di idrocarburi.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSSA Baschira (Ufa — Il 'Secondo Baku' a Išimbaj)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Bashkirskoj ASSR — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_7_Kirov_Oblast": {
    id: "SOV_ADM1_RUS_7_Kirov_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Kirov",
    historicalName: "Oblast di Kirov (Vjatka \u2014 Bacino del Fiume Vjatka)",
    russianName: "Kirovskaya oblast",
    adminTitle: "Kirovskij Oblispolkom \u2014 RSFSR (URSS)",
    capital: "Kirov",
    keys: ["adm1_rus_7_kirov_oblast", "kirov", "kirov oblast", "kirov_oblast", "kirovskaya", "oblast", "sov_adm1_rus_7_kirov_oblast"],
    notes: {
      s0: "Storica città di Vjatka, ribattezzata Kirov nel dicembre 1934 dopo l'assassinio del dirigente bolscevico Sergej Kirov a Leningrado; snodo della Ferrovia Transiberiana tra la Russia europea settentrionale e gli Urali, ricca di estese foreste di conifere e industrie di lavorazione del legname.",
      s1: "Le purghe dell'NKVD colpiscono la cooperazione forestale e i vertici provinciali; centinaia di deportati vengono impiegati nel taglio del legname per i cantieri edili dell'URSS.",
      s2: "Potenziamento della linea ferrata Kotlas-Kirov per l'esportazione di legname e torba verso i centri metallurgici degli Urali.",
      s3_4: "Ampliamento delle industrie conciarie, tessili e calzaturiere di Kirov per la produzione in grande scala di stivali militari e uniformi per l'Armata Rossa.",
      s5: "Durante la Guerra d'Inverno la regione fornisce imponenti partite di sci militari, slitte e legname speciale per l'Armata Rossa impegnata tra le foreste finlandesi.",
      s6: "Sviluppo di stabilimenti chimici e per la lavorazione di polveri piriche e munizioni leggere nei distretti industriali lungo il fiume Vjatka.",
      s7: "Pianificazione dell'evacuazione industriale per accogliere impianti meccanici e fabbriche di strumenti di precisione da Leningrado e Pskov.",
      s8: "Kirov opera come retrovia logistica sicura e fulcro della produzione di vestiario invernale e attrezzature da campo per le forze armate sovietiche.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Kirov (Vjatka — Bacino del Fiume Vjatka)",
    getAdminTitle: (_step: number) => "Kirovskij Oblispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_8_Komi_Republic": {
    id: "SOV_ADM1_RUS_8_Komi_Republic",
    republic: "RSFSR",
    modernName: "Repubblica dei Komi",
    historicalName: "RSSA dei Komi (Syktyvkar \u2014 Bacino Carbonifero della Pe\u010dora e Vorkuta)",
    russianName: "Komi ASSR",
    adminTitle: "Sovet Narodnykh Komissarov Komi ASSR \u2014 RSFSR (URSS)",
    capital: "Syktyvkar",
    keys: ["adm1_rus_8_komi_republic", "komi republic", "komi_republic", "repubblica", "sov_adm1_rus_8_komi_republic", "syktyvkar"],
    notes: {
      s0: "Vasta repubblica autonoma della taiga e della tundra pedemontana degli Urali settentrionali; la capitale Syktyvkar sovrintende a un territorio ricchissimo di foreste vergini e del bacino carbonifero della Pečora, sviluppato attraverso il sistema concentrazionario dei Gulag dell'NKVD.",
      s1: "Nel 1936 la regione viene elevata a RSSA dei Komi; espansione esponenziale del complesso concentrazionario dell'Uchpečlag (poi Vorkutlag) con centinaia di migliaia di 'zek' impiegati nell'estrazione mineraria in condizioni climatiche estreme.",
      s2: "A Vorkuta, a nord del Circolo Polare Artico, entra a regime l'estrazione intensiva di carbone metallurgico da coke di altissima qualità per gli altiforni dell'URSS.",
      s3_4: "Inizio della costruzione della Ferrovia della Pečora (Severo-Pečorskaja magistral') da Konoša a Vorkuta attraverso la taiga e il permafrost per collegare le miniere alla Russia centrale.",
      s5: "Durante la guerra in Europa, il carbone della Pečora e il petrolio di Uchta assumono un'importanza vitale per compensare eventuali perdite del bacino del Donbass.",
      s6: "Nel 1940 i binari della ferrovia della Pečora avanzano verso Vorkuta a tappe forzate, impiegando battaglioni di detenuti e prigionieri di guerra.",
      s7: "Sviluppo dei pozzi di greggio leggero a Uchta e delle raffinerie locali per carburante resistente al gelo artico.",
      s8: "La Repubblica dei Komi è la riserva carbonifera e petrolifera strategica settentrionale dell'URSS, destinata a salvare Leningrado e Mosca dalla crisi energetica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSSA dei Komi (Syktyvkar — Bacino Carbonifero della Pečora e Vorkuta)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Komi ASSR — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_RUS_9_Kostroma_Oblast": {
    id: "SOV_ADM1_RUS_9_Kostroma_Oblast",
    republic: "RSFSR",
    modernName: "Oblast di Kostroma",
    historicalName: "Distretto di Kostroma (Fiume Volga \u2014 Regione del Lino e del Legname)",
    russianName: "Kostromskoj rajon \u2014 Yaroslavskaya oblast",
    adminTitle: "Kostromskoj Gorsovet \u2014 RSFSR (URSS)",
    capital: "Kostroma",
    keys: ["adm1_rus_9_kostroma_oblast", "kostroma", "kostroma oblast", "kostroma_oblast", "kostromskoj", "oblast", "rajon", "sov_adm1_rus_9_kostroma_oblast", "yaroslavskaya"],
    notes: {
      s0: "Antica città sul Volga e storico centro del lino e della silvicoltura della Russia settentrionale, integrata negli anni Trenta nell'Oblast di Jaroslavl'; famosa per le cattedrali e il monastero Ipat'ev.",
      s1: "Le segherie e le filande di lino di Kostroma vengono modernizzate per fornire corde, sacchi e tele per l'Armata Rossa; purghe tra gli intellettuali locali.",
      s2: "Potenziamento della flotta di zattere e rimorchiatori fluviali per il trasporto del legname galleggiante lungo il Volga.",
      s3_4: "Fornitura di travi da mina e puntelli in legno per le gallerie carbonifere del Donbass e del Kuzbass.",
      s5: "Durante la Guerra d'Inverno la regione fornisce decine di migliaia di paia di sci in legno di frassino per le divisioni siberiane e careliane.",
      s6: "Sviluppo di officine meccaniche ausiliarie per la riparazione di motori di battelli fluviali.",
      s7: "Allestimento di magazzini per le riserve statali di grano e alimenti essenziali nella valle del Volga.",
      s8: "Kostroma garantisce un flusso continuo di legname pregiato e prodotti in lino per le esigenze logistiche della difesa sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Distretto di Kostroma (Fiume Volga — Regione del Lino e del Legname)",
    getAdminTitle: (_step: number) => "Kostromskoj Gorsovet — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_TJK_165_Sughd_Region": {
    id: "SOV_ADM1_TJK_165_Sughd_Region",
    republic: "RSS Tagika",
    modernName: "Regione di Sughd",
    historicalName: "Oblast di Leninabad (Khujand)",
    russianName: "Leninabadskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Valle di Fergana Tagika e Seta sul Syr Darya",
    capital: "Leninabad",
    keys: ["adm1_tjk_165_sughd_region", "leninabad", "leninabadskaja", "oblast", "sov_adm1_tjk_165_sughd_region", "sughd", "sughd region", "sughd_region"],
    notes: {
      s0: "Fondata da Alessandro Magno come Alessandria Eschate sul fiume Syr Darya e storicamente nota come Khujand, la città viene ribattezzata Leninabad nel 1936 in onore di Lenin; rappresenta il vitale accesso settentrionale della RSS Tagika alla ricca Valle di Fergana, rinomata per le fabbriche di seta e la frutticoltura.",
      s1: "Nel 1938, il Grande Terrore colpisce l'amministrazione di Leninabad, con arresti mirati tra i dirigenti tajiki accusati di nazionalismo e deviazione controrivoluzionaria.",
      s2: "Nell'autunno 1938, il combinat della seta di Leninabad, uno dei più grandi dell'URSS, incrementa i ritmi di tessitura per fornire paracadute e tessuti tecnici alle forze armate sovietiche.",
      s3_4: "Nel 1939, le maestranze e i colcosiani dell'oblast partecipano con entusiasmo alla costruzione del canale di Fergana, collegando le risorse idriche locali con l'Uzbekistan.",
      s5: "Tra l'inverno 1939 e il 1940, l'area fornisce grano, frutta disidratata e minerali rari estratti dai vicini monti Karamazar per l'industria della difesa sovietica.",
      s6: "Nell'estate 1940, esplorazioni geologiche sovietiche nei monti adiacenti a Leninabad (Taboshar) individuano i primi significativi giacimenti di uranio e radio dell'URSS.",
      s7: "Nel tardo 1940, vengono potenziate le vie di collegamento attraverso i passi montani verso Stalinabad (Dushanbe) per garantire la continuità territoriale repubblicana.",
      s8: "Nella primavera 1941, Leninabad è un polo industriale serico e metallurgico in piena espansione, mobilitato per la difesa della patria sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Leninabad (Khujand)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Valle di Fergana Tagika e Seta sul Syr Darya",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_TJK_166_Gorno_Badakhshan_Autonomous_Region": {
    id: "SOV_ADM1_TJK_166_Gorno_Badakhshan_Autonomous_Region",
    republic: "RSS Tagika (AO)",
    modernName: "Regione Autonoma di Gorno-Badakhshan",
    historicalName: "Oblast Autonoma del Gorno-Badach\u0161an (Pamir)",
    russianName: "Gorno-Badach\u0161anskaja AO",
    adminTitle: "Oblastnoj Ispolkom GBAO \u2014 Tetto del Mondo, Picco Stalin e Frontiera del Pamir",
    capital: "Chorog",
    keys: ["adm1_tjk_166_gorno_badakhshan_autonomous_region", "autonoma", "chorog", "gorno badakhshan autonomous region", "gorno_badakhshan_autonomous_region", "gornobadachanskaja", "gornobadakhshan", "sov_adm1_tjk_166_gorno_badakhshan_autonomous_region"],
    notes: {
      s0: "L'Oblast Autonoma del Gorno-Badachšan (GBAO, capoluogo Chorog) copre l'immenso altopiano montuoso del Pamir ('Tetto del Mondo'), con vette superiori ai settemila metri dominanti il Picco Stalin (7.495 m, punto più alto dell'URSS), affacciata sull'Afghanistan (Corridoio di Wakhan) e sulla Cina (Xinjiang).",
      s1: "Nel 1938, i distaccamenti di frontiera dell'NKVD del Pamir subiscono verifiche rigorose e vengono rinforzati per sigillare i valichi d'alta quota contro infiltrati e trafficanti d'oppio.",
      s2: "Nell'autunno 1938, la rocambolesca Strada Militare del Pamir (Tratto Oš-Chorog), una delle vie carrozzabili più alte al mondo che supera passi a oltre 4.600 metri, garantisce il rifornimento di Chorog.",
      s3_4: "Nel 1939, vengono avviate stazioni scientifiche d'alta quota dell'Accademia delle Scienze per studiare i ghiacciai (tra cui il colossale Ghiacciaio Fedčenko) e i raggi cosmici sul Pamir.",
      s5: "Durante l'inverno 1939-1940, i villaggi montani del Badachšan mantengono i collegamenti grazie a carovane di yak e corrieri d'alta quota in condizioni estreme.",
      s6: "Nell'estate 1940, viene ultimato il prolungamento della strada carrabile militare Chorog-Stalinabad, superando le vertiginose gole del Panj e dell'Obikhingou.",
      s7: "Nel tardo 1940, i posti di blocco del Pamir vengono dotati di radio ricetrasmittenti a onde corte per trasmettere istantaneamente ogni movimento al confine afghano-cinese.",
      s8: "Nella primavera 1941, le sentinelle del Gorno-Badachšan vigilano sui ghiacciai e sui confini più impervi e inaccessibili dell'Unione Sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast Autonoma del Gorno-Badachšan (Pamir)",
    getAdminTitle: (_step: number) => "Oblastnoj Ispolkom GBAO — Tetto del Mondo, Picco Stalin e Frontiera del Pamir",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_TJK_167_Districts_of_Republican_Subordination": {
    id: "SOV_ADM1_TJK_167_Districts_of_Republican_Subordination",
    republic: "RSS Tagika",
    modernName: "Distretti di Subordinazione Repubblicana",
    historicalName: "Distretti di Subordinazione Repubblicana (Garm e Rasht)",
    russianName: "Rajony Respublikanskogo Pod\u010dinenija",
    adminTitle: "Pryamoe Pod\u010dinenie Sovnarkomu \u2014 Valli di Hissar, Vakhsh e Gole Alpine",
    capital: "Garm",
    keys: ["adm1_tjk_167_districts_of_republican_subordination", "distretti", "districts of republican subordination", "districts_of_republican_subordination", "garm", "podinenija", "rajony", "repubblicana", "respublikanskogo", "sov_adm1_tjk_167_districts_of_republican_subordination", "subordinazione"],
    notes: {
      s0: "I distretti centrali montani della RSS Tagika, imperniati sulle valli di Hissar, Garm e Rasht lungo il corso del fiume Vakhsh e del Surkhob, uniscono aspre gole montane a fertili conche pedemontane votate a orticoltura, allevamento e cereali.",
      s1: "Nel 1938, l'NKVD completa l'eliminazione definitiva degli ultimi nuclei clandestini dei guerriglieri basmaci nelle remote gole di Garm, consolidando il dominio bolscevico nelle valli alpine.",
      s2: "Nell'autunno 1938, i colcos montani della valle di Hissar incrementano le forniture di patate, carne bovina e lana per i centri urbani repubblicani.",
      s3_4: "Nel 1939, ingegneri sovietici compiono i primi rilievi topografici lungo le gole del Vakhsh per future colossali dighe idroelettriche montane (tra cui il sito di Nurek).",
      s5: "Tra l'inverno 1939 e il 1940, la regione affronta pesanti nevicate mantenendo aperti i passi grazie all'impiego coordinato di squadre di spalatori e cavalli locali.",
      s6: "Nell'estate 1940, si accelera la costruzione di scuole, dispensari medici e stazioni telegrafiche nei villaggi d'alta quota (kishlak) per integrare le popolazioni montane.",
      s7: "Nel tardo 1940, i distretti montani intensificano l'allevamento di cavalli da soma e muli specializzati per i reparti di fanteria da montagna dell'Armata Rossa.",
      s8: "Nella primavera 1941, le valli di Hissar e Garm sono pacifiche e produttive, pronte a mandare i loro forti montanari nei reggimenti scelti dell'esercito sovietico.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Distretti di Subordinazione Repubblicana (Garm e Rasht)",
    getAdminTitle: (_step: number) => "Pryamoe Podčinenie Sovnarkomu — Valli di Hissar, Vakhsh e Gole Alpine",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_TJK_168_Khatlon_Region": {
    id: "SOV_ADM1_TJK_168_Khatlon_Region",
    republic: "RSS Tagika",
    modernName: "Regione di Khatlon",
    historicalName: "Oblast di Kuljab e Kurgan-Tjube (Basso Vakhsh)",
    russianName: "Stalinabadskaja i Kuljabskaja Oblasti",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Piana del Panj, Bonifica del Vakhsh e Cotone Egiziano",
    capital: "Kurgan-Tjube",
    keys: ["adm1_tjk_168_khatlon_region", "khatlon", "khatlon region", "khatlon_region", "kuljabskaja", "kurgan-tjube", "kurgantjube", "oblasti", "sov_adm1_tjk_168_khatlon_region", "stalinabadskaja"],
    notes: {
      s0: "Comprendente le ricche pianure meridionali di Kurgan-Tjube (Bohtar) e Kuljab lungo i fiumi Vakhsh e Panj (confine afghano), la regione è l'epicentro della bonifica idraulica tagika per la coltivazione del pregiatissimo cotone a fibra lunga di tipo egiziano.",
      s1: "Nel 1938, le autorità dell'NKVD sorvegliano con estrema attenzione le migliaia di coloni trapiantati dalle montagne alle pianure del Vakhsh per scongiurare diserzioni e ammutinamenti nelle nuove piantagioni.",
      s2: "Nell'autunno 1938, il Canale Principale del Vakhsh assicura l'irrigazione di decine di migliaia di ettari, rendendo la regione il primo produttore di cotone a fibra extra-lunga dell'URSS.",
      s3_4: "Nel 1939, vengono introdotte nuove stazioni per la disinfestazione e sgranatura del cotone, con l'apertura di stabilimenti agroalimentari e oleifici a Kurgan-Tjube.",
      s5: "Durante l'inverno 1939-1940, i raccolti di cotone pregiato e riso di Khatlon riforniscono le riserve governative per l'industria paracadutistica e militare.",
      s6: "Nell'estate 1940, la linea ferroviaria a scartamento ridotto che unisce le valli del Vakhsh alla rete centrale consente lo smistamento accelerato delle merci verso la Russia.",
      s7: "Nel tardo 1940, vengono eretti nuovi posti di guardia e torrette d'osservazione lungo le rive boscose del fiume Panj a protezione della frontiera meridionale.",
      s8: "Nell'aprile 1941, la regione di Khatlon è un fiorente mosaico di canali e campi cotoniere, con la popolazione mobilitata a supporto della difesa dell'Unione.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Kuljab e Kurgan-Tjube (Basso Vakhsh)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Piana del Panj, Bonifica del Vakhsh e Cotone Egiziano",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_TJK_169_Dushanbe": {
    id: "SOV_ADM1_TJK_169_Dushanbe",
    republic: "RSS Tagika",
    modernName: "Citt\u00e0 di Dushanbe",
    historicalName: "Stalinabad (Capitale della RSS Tagika)",
    russianName: "Gorod Stalinabad",
    adminTitle: "Stalinabadskij Gorsovet \u2014 Sovnarkom della RSS Tagika e Viale Lenin",
    capital: "Stalinabad",
    keys: ["adm1_tjk_169_dushanbe", "dushanbe", "gorod", "sov_adm1_tjk_169_dushanbe", "stalinabad"],
    notes: {
      s0: "Fino al 1929 piccolo villaggio di mercato del lunedì (Dushanbe), la città viene ribattezzata Stalinabad in onore di Stalin e trasformata con slancio pionieristico nella moderna capitale della RSS Tagika, dotata di ampi viali alberati, palazzi istituzionali e teatri neoclassici.",
      s1: "Nel 1938, il Grande Terrore devasta l'élite politica tagika: i primi ministri e dirigenti storici Abdurrahim Hojibayev e Nusratullo Maksum vengono processati e fucilati, mentre il partito comunista locale viene totalmente rifondato con fedelissimi staliniani.",
      s2: "Nell'autunno 1938, l'inaugurazione del grande Teatro dell'Opera e Balletto 'Sadriddin Ayni' e della sede del Soviet Supremo segna la consacrazione monumentale della capitale socialista.",
      s3_4: "Nel 1939, la città espande le proprie officine meccaniche, l'Istituto Pedagogico e gli stabilimenti tessili, registrando una vertiginosa crescita demografica dovuta all'arrivo di ingegneri e medici russi.",
      s5: "Tra l'inverno 1939 e il 1940, Stalinabad coordina la produzione bellica di cotone e seta della repubblica, inviando rifornimenti per le truppe impegnate al fronte.",
      s6: "Nell'estate 1940, viene varato il nuovo piano regolatore per ampliare le strutture ospedaliere cittadine, destinate a diventare un polo di cura e riabilitazione per feriti di guerra.",
      s7: "Nel tardo 1940, la guarnigione militare e la scuola piloti di Stalinabad intensificano l'addestramento di giovani cadetti per l'aviazione e le divisioni di fanteria da montagna.",
      s8: "Nell'aprile 1941, Stalinabad è una moderna sentinella del socialismo ai piedi delle montagne del Pamir, pronta a resistere compatta all'imminente attacco contro l'URSS.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Stalinabad (Capitale della RSS Tagika)",
    getAdminTitle: (_step: number) => "Stalinabadskij Gorsovet — Sovnarkom della RSS Tagika e Viale Lenin",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_TKM_160_Balkan": {
    id: "SOV_ADM1_TKM_160_Balkan",
    republic: "RSS Turkmena",
    modernName: "Regione di Balkan",
    historicalName: "Oblast di Krasnovodsk (Nebit-Dag e Kara-Bogaz)",
    russianName: "Krasnovodskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Porto Caspico, Petrolio e Lagune Saline",
    capital: "Krasnovodsk",
    keys: ["adm1_tkm_160_balkan", "balkan", "krasnovodsk", "krasnovodskaja", "oblast", "sov_adm1_tkm_160_balkan"],
    notes: {
      s0: "Con capoluogo il grande porto di Krasnovodsk (oggi Türkmenbaşy), l'oblast racchiude la costa orientale del Caspio, i pozzi petroliferi di Nebit-Dag (Balkanabat) e Čeleken, e l'immensa laguna salina di Kara-Bogaz-Gol, riserva mondiale di solfato di sodio (mirabilite).",
      s1: "Nel 1938, l'NKVD epura i tecnici delle compagnie petrolifere 'Turkmenneft' e del porto di Krasnovodsk per presunto intralcio alle spedizioni di greggio verso Baku e Astrachan'.",
      s2: "Nell'autunno 1938, i traghetti e le petroliere caspiche collegano senza sosta Krasnovodsk alle raffinerie di Baku, trasportando il prezioso greggio estratto dal deserto turkmeno.",
      s3_4: "Nel 1939, l'estrazione mineraria nella laguna di Kara-Bogaz-Gol viene meccanizzata, assicurando solfato di sodio puro all'industria chimica, farmaceutica e degli esplosivi dell'URSS.",
      s5: "Durante l'inverno 1939-1940, il porto di Krasnovodsk mantiene aperti i collegamenti navali anche durante le tempeste invernali per rifornire la Flottiglia del Caspio e le forze armate.",
      s6: "Nell'estate 1940, la produzione dei pozzi di Nebit-Dag tocca il milione di tonnellate, sostenuta dall'apertura di nuovi oleodotti verso il litorale caspico.",
      s7: "Nel tardo 1940, la difesa costiera di Krasnovodsk viene dotata di batterie contraeree e guarnigioni navali a protezione delle rotte petrolifere caspiche.",
      s8: "Nella primavera 1941, Krasnovodsk è una roccaforte petrolifera ed energetica vitale per la flotta e l'aviazione sovietica, pronta a fronteggiare ogni emergenza bellica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Krasnovodsk (Nebit-Dag e Kara-Bogaz)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Porto Caspico, Petrolio e Lagune Saline",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_TKM_161_Ahai": {
    id: "SOV_ADM1_TKM_161_Ahai",
    republic: "RSS Turkmena",
    modernName: "Regione di Ahal",
    historicalName: "Oblast di Ashgabat (A\u0161khabad)",
    russianName: "A\u0161chabadskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Frontiera Persiana dei Kopet Dag e Sede del Governo",
    capital: "Ashgabat",
    keys: ["achabadskaja", "adm1_tkm_161_ahai", "ahai", "ashgabat", "oblast", "sov_adm1_tkm_161_ahai"],
    notes: {
      s0: "Estesa lungo la fertile striscia pedemontana dei monti Kopet Dag al confine con la Persia/Iran, l'Oblast di Ashgabat (Aškhabad) include la capitale della RSS Turkmena, snodo principale della Ferrovia Transcaspica e centro dell'allevamento dei leggendari cavalli akhal-teke e della tessitura di tappeti.",
      s1: "Nel 1938, il Terrore staliniano spazza via la dirigenza turkmena: Nedirbay Aytakov, presidente del Soviet supremo turkmeno, viene arrestato e fucilato a Mosca, mentre centinaia di intellettuali locali vengono internati.",
      s2: "Nell'autunno 1938, le guardie confinarie dell'NKVD rafforzano la militarizzazione della frontiera montuosa con l'Iran per bloccare attività di spionaggio e contrabbando.",
      s3_4: "Nel 1939, Ashgabat vede la costruzione di nuovi quartieri governativi, scuole e l'espansione delle officine meccaniche e manifatturiere tessili della seta.",
      s5: "Tra l'inverno 1939 e il 1940, gli allevamenti statali di cavalli akhal-teke dell'oasi forniscono magnifici quadrupedi per i reggimenti di cavalleria dell'Armata Rossa.",
      s6: "Nell'estate 1940, vengono completati nuovi acquedotti sotterranei (karez) e canali montani per incrementare la produzione di cotone, frutta e ortaggi nella cintura urbana.",
      s7: "Nel tardo 1940, le difese della frontiera dei Kopet Dag vengono integrate con fortini e postazioni telegrafiche permanenti collegate direttamente a Tashkent.",
      s8: "Nell'aprile 1941, Ashgabat è la sentinella tranquilla della frontiera meridionale dell'URSS, pronta a mobilitare le proprie risorse umane e industriali per la difesa del Paese.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Ashgabat (Aškhabad)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Frontiera Persiana dei Kopet Dag e Sede del Governo",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_TKM_162_Dasoguz": {
    id: "SOV_ADM1_TKM_162_Dasoguz",
    republic: "RSS Turkmena",
    modernName: "Regione di Da\u015foguz",
    historicalName: "Oblast di Tashauz",
    russianName: "Ta\u0161auzskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Sponda Sinistra dell'Amu Darya e Karakum",
    capital: "Tashauz",
    keys: ["adm1_tkm_162_dasoguz", "daoguz", "dasoguz", "oblast", "sov_adm1_tkm_162_dasoguz", "taauzskaja", "tashauz"],
    notes: {
      s0: "Situata nell'estremo nord del Turkmenistan, l'Oblast di Tashauz (Daşoguz) occupa la sponda sinistra del delta dell'Amu Darya, incuneata tra il deserto del Karakum e la Repubblica Karakalpaka, caratterizzata da agricoltura intensiva a cotone e riso.",
      s1: "Nel 1938, le indagini dell'NKVD colpiscono le élite tribali turkmene (yomud) accusate di resistenza alla collettivizzazione e di connivenza con elementi ribelli basmaci rifugiatisi nel deserto.",
      s2: "Nell'autunno 1938, i canali storici di Tashauz vengono riscavati e ripuliti dal limo fluviale per garantire portate idriche sufficienti ai colcos statali.",
      s3_4: "Nel 1939, l'introduzione di macchinari per la sgranatura meccanica del cotone aumenta l'efficienza della produzione locale destinata alle filande russe.",
      s5: "Durante l'inverno 1939-1940, la regione fornisce grano, foraggio e cammelli da trasporto impiegati nei distretti confinari dell'Asia Centrale.",
      s6: "Nell'estate 1940, le bonifiche idrauliche consentono di estendere la superficie coltivata a cotone e foraggi ad alta produttività.",
      s7: "Nel tardo 1940, Tashauz viene collegata tramite piste carovaniere rinforzate e stazioni radio alle basi di Krasnovodsk e Chardzhou.",
      s8: "Nella primavera 1941, i colcosiani di Tashauz completano la semina primaverile, mentre i contingenti giovanili turkmeni vengono arruolati nell'esercito sovietico.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Tashauz",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Sponda Sinistra dell'Amu Darya e Karakum",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_TKM_163_Lebap": {
    id: "SOV_ADM1_TKM_163_Lebap",
    republic: "RSS Turkmena",
    modernName: "Regione di Lebap",
    historicalName: "Oblast di Chardzhou (Ponte sull'Amu Darya)",
    russianName: "\u010card\u017eouskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Nodo Ferroviario della Transcaspica e Filande Seriche",
    capital: "Chardzhou",
    keys: ["adm1_tkm_163_lebap", "ardouskaja", "chardzhou", "lebap", "oblast", "sov_adm1_tkm_163_lebap"],
    notes: {
      s0: "Con capoluogo Chardzhou (oggi Türkmenabat), l'oblast domina il medio corso del possente fiume Amu Darya ed è celebre per il colossale ponte ferroviario della Transcaspica che unisce il Turkmenistan all'Uzbekistan.",
      s1: "Nel 1938, l'NKVD istituisce un regime di sorveglianza militare permanente sul ponte ferroviario di Chardzhou, arrestando ferrovieri e tecnici per sospetto tentato sabotaggio dell'infrastruttura strategica.",
      s2: "Nell'autunno 1938, il porto fluviale di Chardzhou movimenta enormi volumi di chiatte cariche di cotone, petrolio, sale e fertilizzanti diretti lungo l'asse dell'Amu Darya.",
      s3_4: "Nel 1939, vengono ampliate le grandi filande della seta di Chardzhou, la cui produzione rifornisce le manifatture di paracadute militari sovietiche.",
      s5: "Tra l'inverno 1939 e il 1940, il nodo ferroviario e fluviale di Chardzhou assicura il transito ininterrotto di risorse minerarie e agricole verso Mosca e gli Urali.",
      s6: "Nell'estate 1940, gli argini e i piloni del ponte sull'Amu Darya vengono rinforzati con gettate di cemento armato per reggere il transito di treni merci sempre più pesanti.",
      s7: "Nel tardo 1940, vengono installate postazioni di artiglieria contraerea a difesa del ponte e dei depositi carburante di Chardzhou.",
      s8: "Nell'aprile 1941, Chardzhou costituisce uno snodo nevralgico della logistica centroasiatica dell'Armata Rossa, pronto a sostenere lo sforzo bellico supremo.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Chardzhou (Ponte sull'Amu Darya)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Nodo Ferroviario della Transcaspica e Filande Seriche",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_TKM_164_Mary": {
    id: "SOV_ADM1_TKM_164_Mary",
    republic: "RSS Turkmena",
    modernName: "Regione di Mary",
    historicalName: "Oblast di Mary (Oasi di Merv e Ku\u0161ka)",
    russianName: "Maryjskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Bacino del Murghab e Avamposto Estremo Meridionale",
    capital: "Mary",
    keys: ["adm1_tkm_164_mary", "mary", "maryjskaja", "oblast", "sov_adm1_tkm_164_mary"],
    notes: {
      s0: "Erede della leggendaria oasi di Merv sull'antico corso del fiume Murghab, l'Oblast di Mary comprende anche l'avamposto fortificato di Kuška (Serhetabat), il punto geografico più meridionale dell'intero territorio dell'Unione Sovietica, affacciato sull'Afghanistan occidentale (Herat).",
      s1: "Nel 1938, la guarnigione militare e le guardie di frontiera di Kuška e Mary sono al centro di severe verifiche dell'NKVD volte a sradicare elementi sospetti e a consolidare il baluardo estremo dell'URSS.",
      s2: "Nell'autunno 1938, le dighe storiche e i canali del bacino del Murghab garantiscono una delle massime rese per ettaro di cotone a fibra fine dell'Asia Centrale.",
      s3_4: "Nel 1939, la ferrovia militare Mary-Kuška vede il transito continuo di rifornimenti, cannoni e materiali per il rafforzamento della linea fortificata di confine.",
      s5: "Durante l'inverno 1939-1940, la regione rifornisce l'Armata Rossa di lane pregiate, carne e grasso animale per le razioni militari invernali.",
      s6: "Nell'estate 1940, le dighe di Sultan-Bent e Hindu-Kush sul Murghab vengono ammodernate per prevenire perdite d'acqua ed espandere le colture industriali.",
      s7: "Nel tardo 1940, l'avamposto di Kuška viene dotato di potenti fari di ricerca confinari e postazioni bunker interrate per dominare la rotta verso Herat.",
      s8: "Nella primavera 1941, l'Oblast di Mary garantisce una frontiera austera e sicura, con le truppe confinarie in allerta pronte a difendere il confine più a sud dell'URSS.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Mary (Oasi di Merv e Kuška)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Bacino del Murghab e Avamposto Estremo Meridionale",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_178_Savran": {
    id: "SOV_ADM1_UKR_178_Savran",
    republic: "UKRAINE",
    modernName: "Distretto di Savran",
    historicalName: "Savran (Foreste di Savran e Fiume Bug Meridionale)",
    russianName: "Savranskij rajon \u2014 Odesskaya oblast",
    adminTitle: "Savranskij Rajispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Savran",
    keys: ["adm1_ukr_178_savran", "oblast", "odesskaya", "rajon", "savran", "savranskij", "sov_adm1_ukr_178_savran"],
    notes: {
      s0: "Fulgida metropoli portuale e mercantile sul Mar Nero, celebrata per la maestosa Scalinata Potëmkin, le catacombe calcaree e la vivace cultura cosmopolita ed ebraica; sede della storica fabbrica di macchinari pesanti Gen e del Cantiere Navale Marti n. 197; il suo porto commerciale è il principale sbocco del commercio marittimo estero ucraino.",
      s1: "Dure purghe colpiscono gli intellettuali e i marinai di Odessa; l'NKVD vigila con ossessione sul porto contro contatti clandestini con l'estero e commercio nero.",
      s2: "Sviluppo della base navale secondaria di Odessa e delle postazioni d'artiglieria costiera per la sorveglianza delle rotte verso la Romania.",
      s3_4: "I cantieri navali riparano cacciatorpediniere e sommergibili della Flotta del Mar Nero e allestiscono la Flottiglia Militare del Dnestr.",
      s5: "L'Oblast di Odessa controlla la frontiera fluviale sul Dnestr di fronte alla Bessarabia romena; strettissima allerta militare durante la campagna polacca del 1939.",
      s6: "Nel giugno 1940 Odessa è la base di partenza per le truppe sovietiche che avanzano in Bessarabia a seguito dell'ultimatum alla Romania, estendendo il controllo sovietico fino al Danubio.",
      s7: "Le fabbriche di Odessa vengono integrate nei piani di mobilitazione per munizioni e autoblindo improvvisate; addestramento della milizia operaia cittadina.",
      s8: "Odessa si prepara alla difesa; entro poche settimane l'Armata Costiera sovietica e i marinai della flotta scriveranno la leggendaria epopea dei 73 giorni di difesa di Odessa contro l'esercito romeno e tedesco.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Savran (Foreste di Savran e Fiume Bug Meridionale)",
    getAdminTitle: (_step: number) => "Savranskij Rajispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_179_Balta": {
    id: "SOV_ADM1_UKR_179_Balta",
    republic: "UKRAINE",
    modernName: "Distretto di Balta",
    historicalName: "Balta (Fiume Kodyma \u2014 Prima Capitale della RSSA Moldava 1924-1929)",
    russianName: "Baltskij rajon \u2014 Odesskaya oblast",
    adminTitle: "Baltskij Rajispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Balta",
    keys: ["adm1_ukr_179_balta", "balta", "baltskij", "oblast", "odesskaya", "rajon", "sov_adm1_ukr_179_balta"],
    notes: {
      s0: "Fulgida metropoli portuale e mercantile sul Mar Nero, celebrata per la maestosa Scalinata Potëmkin, le catacombe calcaree e la vivace cultura cosmopolita ed ebraica; sede della storica fabbrica di macchinari pesanti Gen e del Cantiere Navale Marti n. 197; il suo porto commerciale è il principale sbocco del commercio marittimo estero ucraino.",
      s1: "Dure purghe colpiscono gli intellettuali e i marinai di Odessa; l'NKVD vigila con ossessione sul porto contro contatti clandestini con l'estero e commercio nero.",
      s2: "Sviluppo della base navale secondaria di Odessa e delle postazioni d'artiglieria costiera per la sorveglianza delle rotte verso la Romania.",
      s3_4: "I cantieri navali riparano cacciatorpediniere e sommergibili della Flotta del Mar Nero e allestiscono la Flottiglia Militare del Dnestr.",
      s5: "L'Oblast di Odessa controlla la frontiera fluviale sul Dnestr di fronte alla Bessarabia romena; strettissima allerta militare durante la campagna polacca del 1939.",
      s6: "Nel giugno 1940 Odessa è la base di partenza per le truppe sovietiche che avanzano in Bessarabia a seguito dell'ultimatum alla Romania, estendendo il controllo sovietico fino al Danubio.",
      s7: "Le fabbriche di Odessa vengono integrate nei piani di mobilitazione per munizioni e autoblindo improvvisate; addestramento della milizia operaia cittadina.",
      s8: "Odessa si prepara alla difesa; entro poche settimane l'Armata Costiera sovietica e i marinai della flotta scriveranno la leggendaria epopea dei 73 giorni di difesa di Odessa contro l'esercito romeno e tedesco.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Balta (Fiume Kodyma — Prima Capitale della RSSA Moldava 1924-1929)",
    getAdminTitle: (_step: number) => "Baltskij Rajispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_180_Kodyma": {
    id: "SOV_ADM1_UKR_180_Kodyma",
    republic: "UKRAINE",
    modernName: "Distretto di Kodyma",
    historicalName: "Kodyma (Linea Ferroviaria Podolia-Odessa)",
    russianName: "Kodymskij rajon \u2014 Odesskaya oblast",
    adminTitle: "Kodymskij Rajispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Kodyma",
    keys: ["adm1_ukr_180_kodyma", "kodyma", "kodymskij", "oblast", "odesskaya", "rajon", "sov_adm1_ukr_180_kodyma"],
    notes: {
      s0: "Fulgida metropoli portuale e mercantile sul Mar Nero, celebrata per la maestosa Scalinata Potëmkin, le catacombe calcaree e la vivace cultura cosmopolita ed ebraica; sede della storica fabbrica di macchinari pesanti Gen e del Cantiere Navale Marti n. 197; il suo porto commerciale è il principale sbocco del commercio marittimo estero ucraino.",
      s1: "Dure purghe colpiscono gli intellettuali e i marinai di Odessa; l'NKVD vigila con ossessione sul porto contro contatti clandestini con l'estero e commercio nero.",
      s2: "Sviluppo della base navale secondaria di Odessa e delle postazioni d'artiglieria costiera per la sorveglianza delle rotte verso la Romania.",
      s3_4: "I cantieri navali riparano cacciatorpediniere e sommergibili della Flotta del Mar Nero e allestiscono la Flottiglia Militare del Dnestr.",
      s5: "L'Oblast di Odessa controlla la frontiera fluviale sul Dnestr di fronte alla Bessarabia romena; strettissima allerta militare durante la campagna polacca del 1939.",
      s6: "Nel giugno 1940 Odessa è la base di partenza per le truppe sovietiche che avanzano in Bessarabia a seguito dell'ultimatum alla Romania, estendendo il controllo sovietico fino al Danubio.",
      s7: "Le fabbriche di Odessa vengono integrate nei piani di mobilitazione per munizioni e autoblindo improvvisate; addestramento della milizia operaia cittadina.",
      s8: "Odessa si prepara alla difesa; entro poche settimane l'Armata Costiera sovietica e i marinai della flotta scriveranno la leggendaria epopea dei 73 giorni di difesa di Odessa contro l'esercito romeno e tedesco.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Kodyma (Linea Ferroviaria Podolia-Odessa)",
    getAdminTitle: (_step: number) => "Kodymskij Rajispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_181_Liubashhivka": {
    id: "SOV_ADM1_UKR_181_Liubashhivka",
    republic: "UKRAINE",
    modernName: "Distretto di Ljuba\u0161ivka",
    historicalName: "Ljuba\u0161ivka (Crocevia Ferroviario della Steppa di Odessa)",
    russianName: "Lyubashevskij rajon \u2014 Odesskaya oblast",
    adminTitle: "Ljuba\u0161evskij Rajispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Ljuba\u0161ivka",
    keys: ["adm1_ukr_181_liubashhivka", "liubashhivka", "ljubaivka", "ljubašivka", "lyubashevskij", "oblast", "odesskaya", "rajon", "sov_adm1_ukr_181_liubashhivka"],
    notes: {
      s0: "Fulgida metropoli portuale e mercantile sul Mar Nero, celebrata per la maestosa Scalinata Potëmkin, le catacombe calcaree e la vivace cultura cosmopolita ed ebraica; sede della storica fabbrica di macchinari pesanti Gen e del Cantiere Navale Marti n. 197; il suo porto commerciale è il principale sbocco del commercio marittimo estero ucraino.",
      s1: "Dure purghe colpiscono gli intellettuali e i marinai di Odessa; l'NKVD vigila con ossessione sul porto contro contatti clandestini con l'estero e commercio nero.",
      s2: "Sviluppo della base navale secondaria di Odessa e delle postazioni d'artiglieria costiera per la sorveglianza delle rotte verso la Romania.",
      s3_4: "I cantieri navali riparano cacciatorpediniere e sommergibili della Flotta del Mar Nero e allestiscono la Flottiglia Militare del Dnestr.",
      s5: "L'Oblast di Odessa controlla la frontiera fluviale sul Dnestr di fronte alla Bessarabia romena; strettissima allerta militare durante la campagna polacca del 1939.",
      s6: "Nel giugno 1940 Odessa è la base di partenza per le truppe sovietiche che avanzano in Bessarabia a seguito dell'ultimatum alla Romania, estendendo il controllo sovietico fino al Danubio.",
      s7: "Le fabbriche di Odessa vengono integrate nei piani di mobilitazione per munizioni e autoblindo improvvisate; addestramento della milizia operaia cittadina.",
      s8: "Odessa si prepara alla difesa; entro poche settimane l'Armata Costiera sovietica e i marinai della flotta scriveranno la leggendaria epopea dei 73 giorni di difesa di Odessa contro l'esercito romeno e tedesco.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Ljubašivka (Crocevia Ferroviario della Steppa di Odessa)",
    getAdminTitle: (_step: number) => "Ljubaševskij Rajispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_182_Podilsk": {
    id: "SOV_ADM1_UKR_182_Podilsk",
    republic: "UKRAINE",
    modernName: "Distretto di Podil's'k",
    historicalName: "Kotovsk (Birzula \u2014 Intitolata al Comandante Grigorij Kotovskij nel 1935)",
    russianName: "Kotovskij rajon \u2014 Odesskaya oblast",
    adminTitle: "Kotovskij Rajispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Kotovsk",
    keys: ["adm1_ukr_182_podilsk", "kotovsk", "kotovskij", "oblast", "odesskaya", "podilsk", "rajon", "sov_adm1_ukr_182_podilsk"],
    notes: {
      s0: "Fulgida metropoli portuale e mercantile sul Mar Nero, celebrata per la maestosa Scalinata Potëmkin, le catacombe calcaree e la vivace cultura cosmopolita ed ebraica; sede della storica fabbrica di macchinari pesanti Gen e del Cantiere Navale Marti n. 197; il suo porto commerciale è il principale sbocco del commercio marittimo estero ucraino.",
      s1: "Dure purghe colpiscono gli intellettuali e i marinai di Odessa; l'NKVD vigila con ossessione sul porto contro contatti clandestini con l'estero e commercio nero.",
      s2: "Sviluppo della base navale secondaria di Odessa e delle postazioni d'artiglieria costiera per la sorveglianza delle rotte verso la Romania.",
      s3_4: "I cantieri navali riparano cacciatorpediniere e sommergibili della Flotta del Mar Nero e allestiscono la Flottiglia Militare del Dnestr.",
      s5: "L'Oblast di Odessa controlla la frontiera fluviale sul Dnestr di fronte alla Bessarabia romena; strettissima allerta militare durante la campagna polacca del 1939.",
      s6: "Nel giugno 1940 Odessa è la base di partenza per le truppe sovietiche che avanzano in Bessarabia a seguito dell'ultimatum alla Romania, estendendo il controllo sovietico fino al Danubio.",
      s7: "Le fabbriche di Odessa vengono integrate nei piani di mobilitazione per munizioni e autoblindo improvvisate; addestramento della milizia operaia cittadina.",
      s8: "Odessa si prepara alla difesa; entro poche settimane l'Armata Costiera sovietica e i marinai della flotta scriveranno la leggendaria epopea dei 73 giorni di difesa di Odessa contro l'esercito romeno e tedesco.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Kotovsk (Birzula — Intitolata al Comandante Grigorij Kotovskij nel 1935)",
    getAdminTitle: (_step: number) => "Kotovskij Rajispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_183_Ananiv": {
    id: "SOV_ADM1_UKR_183_Ananiv",
    republic: "UKRAINE",
    modernName: "Distretto di Anan'\u00efv",
    historicalName: "Anan'\u00efv (Fiume Tiligul \u2014 Distretto Agricolo della Podolia)",
    russianName: "Anan'evskij rajon \u2014 Odesskaya oblast",
    adminTitle: "Anan'evskij Rajispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Anan'\u00efv",
    keys: ["adm1_ukr_183_ananiv", "anan'ïv", "ananevskij", "ananiv", "ananv", "oblast", "odesskaya", "rajon", "sov_adm1_ukr_183_ananiv"],
    notes: {
      s0: "Fulgida metropoli portuale e mercantile sul Mar Nero, celebrata per la maestosa Scalinata Potëmkin, le catacombe calcaree e la vivace cultura cosmopolita ed ebraica; sede della storica fabbrica di macchinari pesanti Gen e del Cantiere Navale Marti n. 197; il suo porto commerciale è il principale sbocco del commercio marittimo estero ucraino.",
      s1: "Dure purghe colpiscono gli intellettuali e i marinai di Odessa; l'NKVD vigila con ossessione sul porto contro contatti clandestini con l'estero e commercio nero.",
      s2: "Sviluppo della base navale secondaria di Odessa e delle postazioni d'artiglieria costiera per la sorveglianza delle rotte verso la Romania.",
      s3_4: "I cantieri navali riparano cacciatorpediniere e sommergibili della Flotta del Mar Nero e allestiscono la Flottiglia Militare del Dnestr.",
      s5: "L'Oblast di Odessa controlla la frontiera fluviale sul Dnestr di fronte alla Bessarabia romena; strettissima allerta militare durante la campagna polacca del 1939.",
      s6: "Nel giugno 1940 Odessa è la base di partenza per le truppe sovietiche che avanzano in Bessarabia a seguito dell'ultimatum alla Romania, estendendo il controllo sovietico fino al Danubio.",
      s7: "Le fabbriche di Odessa vengono integrate nei piani di mobilitazione per munizioni e autoblindo improvvisate; addestramento della milizia operaia cittadina.",
      s8: "Odessa si prepara alla difesa; entro poche settimane l'Armata Costiera sovietica e i marinai della flotta scriveranno la leggendaria epopea dei 73 giorni di difesa di Odessa contro l'esercito romeno e tedesco.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Anan'ïv (Fiume Tiligul — Distretto Agricolo della Podolia)",
    getAdminTitle: (_step: number) => "Anan'evskij Rajispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_184_Okny": {
    id: "SOV_ADM1_UKR_184_Okny",
    republic: "UKRAINE",
    modernName: "Distretto di Okny",
    historicalName: "Krasni Okny (Fiume Jahorlyk \u2014 Vecchia Frontiera con la Bessarabia)",
    russianName: "Krasnooknjanskij rajon \u2014 Odesskaya oblast",
    adminTitle: "Krasnooknjanskij Rajispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Krasni Okny",
    keys: ["adm1_ukr_184_okny", "krasni okny", "krasniokny", "krasnooknjanskij", "oblast", "odesskaya", "okny", "rajon", "sov_adm1_ukr_184_okny"],
    notes: {
      s0: "Fulgida metropoli portuale e mercantile sul Mar Nero, celebrata per la maestosa Scalinata Potëmkin, le catacombe calcaree e la vivace cultura cosmopolita ed ebraica; sede della storica fabbrica di macchinari pesanti Gen e del Cantiere Navale Marti n. 197; il suo porto commerciale è il principale sbocco del commercio marittimo estero ucraino.",
      s1: "Dure purghe colpiscono gli intellettuali e i marinai di Odessa; l'NKVD vigila con ossessione sul porto contro contatti clandestini con l'estero e commercio nero.",
      s2: "Sviluppo della base navale secondaria di Odessa e delle postazioni d'artiglieria costiera per la sorveglianza delle rotte verso la Romania.",
      s3_4: "I cantieri navali riparano cacciatorpediniere e sommergibili della Flotta del Mar Nero e allestiscono la Flottiglia Militare del Dnestr.",
      s5: "L'Oblast di Odessa controlla la frontiera fluviale sul Dnestr di fronte alla Bessarabia romena; strettissima allerta militare durante la campagna polacca del 1939.",
      s6: "Nel giugno 1940 Odessa è la base di partenza per le truppe sovietiche che avanzano in Bessarabia a seguito dell'ultimatum alla Romania, estendendo il controllo sovietico fino al Danubio.",
      s7: "Le fabbriche di Odessa vengono integrate nei piani di mobilitazione per munizioni e autoblindo improvvisate; addestramento della milizia operaia cittadina.",
      s8: "Odessa si prepara alla difesa; entro poche settimane l'Armata Costiera sovietica e i marinai della flotta scriveranno la leggendaria epopea dei 73 giorni di difesa di Odessa contro l'esercito romeno e tedesco.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Krasni Okny (Fiume Jahorlyk — Vecchia Frontiera con la Bessarabia)",
    getAdminTitle: (_step: number) => "Krasnooknjanskij Rajispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_185_Zakharivka": {
    id: "SOV_ADM1_UKR_185_Zakharivka",
    republic: "UKRAINE",
    modernName: "Distretto di Zacharivka",
    historicalName: "Frunzivka (Zacharivka \u2014 Intitolata a Michail Frunze nel 1927)",
    russianName: "Frunzovskij rajon \u2014 Odesskaya oblast",
    adminTitle: "Frunzovskij Rajispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Frunzivka",
    keys: ["adm1_ukr_185_zakharivka", "frunzivka", "frunzovskij", "oblast", "odesskaya", "rajon", "sov_adm1_ukr_185_zakharivka", "zacharivka", "zakharivka"],
    notes: {
      s0: "Fulgida metropoli portuale e mercantile sul Mar Nero, celebrata per la maestosa Scalinata Potëmkin, le catacombe calcaree e la vivace cultura cosmopolita ed ebraica; sede della storica fabbrica di macchinari pesanti Gen e del Cantiere Navale Marti n. 197; il suo porto commerciale è il principale sbocco del commercio marittimo estero ucraino.",
      s1: "Dure purghe colpiscono gli intellettuali e i marinai di Odessa; l'NKVD vigila con ossessione sul porto contro contatti clandestini con l'estero e commercio nero.",
      s2: "Sviluppo della base navale secondaria di Odessa e delle postazioni d'artiglieria costiera per la sorveglianza delle rotte verso la Romania.",
      s3_4: "I cantieri navali riparano cacciatorpediniere e sommergibili della Flotta del Mar Nero e allestiscono la Flottiglia Militare del Dnestr.",
      s5: "L'Oblast di Odessa controlla la frontiera fluviale sul Dnestr di fronte alla Bessarabia romena; strettissima allerta militare durante la campagna polacca del 1939.",
      s6: "Nel giugno 1940 Odessa è la base di partenza per le truppe sovietiche che avanzano in Bessarabia a seguito dell'ultimatum alla Romania, estendendo il controllo sovietico fino al Danubio.",
      s7: "Le fabbriche di Odessa vengono integrate nei piani di mobilitazione per munizioni e autoblindo improvvisate; addestramento della milizia operaia cittadina.",
      s8: "Odessa si prepara alla difesa; entro poche settimane l'Armata Costiera sovietica e i marinai della flotta scriveranno la leggendaria epopea dei 73 giorni di difesa di Odessa contro l'esercito romeno e tedesco.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Frunzivka (Zacharivka — Intitolata a Michail Frunze nel 1927)",
    getAdminTitle: (_step: number) => "Frunzovskij Rajispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_186_Mykolaivka": {
    id: "SOV_ADM1_UKR_186_Mykolaivka",
    republic: "UKRAINE",
    modernName: "Distretto di Mykola\u00efvka",
    historicalName: "Mykola\u00efvka (Fiume \u010cy\u010dyklija \u2014 Steppa Pontica)",
    russianName: "Nikolaevskij rajon \u2014 Odesskaya oblast",
    adminTitle: "Nikolaevskij Rajispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Mykola\u00efvka",
    keys: ["adm1_ukr_186_mykolaivka", "mykolaivka", "mykolavka", "mykolaïvka", "nikolaevskij", "oblast", "odesskaya", "rajon", "sov_adm1_ukr_186_mykolaivka"],
    notes: {
      s0: "Fulgida metropoli portuale e mercantile sul Mar Nero, celebrata per la maestosa Scalinata Potëmkin, le catacombe calcaree e la vivace cultura cosmopolita ed ebraica; sede della storica fabbrica di macchinari pesanti Gen e del Cantiere Navale Marti n. 197; il suo porto commerciale è il principale sbocco del commercio marittimo estero ucraino.",
      s1: "Dure purghe colpiscono gli intellettuali e i marinai di Odessa; l'NKVD vigila con ossessione sul porto contro contatti clandestini con l'estero e commercio nero.",
      s2: "Sviluppo della base navale secondaria di Odessa e delle postazioni d'artiglieria costiera per la sorveglianza delle rotte verso la Romania.",
      s3_4: "I cantieri navali riparano cacciatorpediniere e sommergibili della Flotta del Mar Nero e allestiscono la Flottiglia Militare del Dnestr.",
      s5: "L'Oblast di Odessa controlla la frontiera fluviale sul Dnestr di fronte alla Bessarabia romena; strettissima allerta militare durante la campagna polacca del 1939.",
      s6: "Nel giugno 1940 Odessa è la base di partenza per le truppe sovietiche che avanzano in Bessarabia a seguito dell'ultimatum alla Romania, estendendo il controllo sovietico fino al Danubio.",
      s7: "Le fabbriche di Odessa vengono integrate nei piani di mobilitazione per munizioni e autoblindo improvvisate; addestramento della milizia operaia cittadina.",
      s8: "Odessa si prepara alla difesa; entro poche settimane l'Armata Costiera sovietica e i marinai della flotta scriveranno la leggendaria epopea dei 73 giorni di difesa di Odessa contro l'esercito romeno e tedesco.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Mykolaïvka (Fiume Čyčyklija — Steppa Pontica)",
    getAdminTitle: (_step: number) => "Nikolaevskij Rajispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_187_Shyriaieve": {
    id: "SOV_ADM1_UKR_187_Shyriaieve",
    republic: "UKRAINE",
    modernName: "Distretto di \u0160yrjajeve",
    historicalName: "\u0160yrjajeve (Bacino del Fiume Velykyj Kujal'nyk)",
    russianName: "Shirjaevskij rajon \u2014 Odesskaya oblast",
    adminTitle: "\u0160irjaevskij Rajispolkom \u2014 RSS Ucraina (URSS)",
    capital: "\u0160yrjajeve",
    keys: ["adm1_ukr_187_shyriaieve", "oblast", "odesskaya", "rajon", "shirjaevskij", "shyriaieve", "sov_adm1_ukr_187_shyriaieve", "yrjajeve", "šyrjajeve"],
    notes: {
      s0: "Fulgida metropoli portuale e mercantile sul Mar Nero, celebrata per la maestosa Scalinata Potëmkin, le catacombe calcaree e la vivace cultura cosmopolita ed ebraica; sede della storica fabbrica di macchinari pesanti Gen e del Cantiere Navale Marti n. 197; il suo porto commerciale è il principale sbocco del commercio marittimo estero ucraino.",
      s1: "Dure purghe colpiscono gli intellettuali e i marinai di Odessa; l'NKVD vigila con ossessione sul porto contro contatti clandestini con l'estero e commercio nero.",
      s2: "Sviluppo della base navale secondaria di Odessa e delle postazioni d'artiglieria costiera per la sorveglianza delle rotte verso la Romania.",
      s3_4: "I cantieri navali riparano cacciatorpediniere e sommergibili della Flotta del Mar Nero e allestiscono la Flottiglia Militare del Dnestr.",
      s5: "L'Oblast di Odessa controlla la frontiera fluviale sul Dnestr di fronte alla Bessarabia romena; strettissima allerta militare durante la campagna polacca del 1939.",
      s6: "Nel giugno 1940 Odessa è la base di partenza per le truppe sovietiche che avanzano in Bessarabia a seguito dell'ultimatum alla Romania, estendendo il controllo sovietico fino al Danubio.",
      s7: "Le fabbriche di Odessa vengono integrate nei piani di mobilitazione per munizioni e autoblindo improvvisate; addestramento della milizia operaia cittadina.",
      s8: "Odessa si prepara alla difesa; entro poche settimane l'Armata Costiera sovietica e i marinai della flotta scriveranno la leggendaria epopea dei 73 giorni di difesa di Odessa contro l'esercito romeno e tedesco.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Šyrjajeve (Bacino del Fiume Velykyj Kujal'nyk)",
    getAdminTitle: (_step: number) => "Širjaevskij Rajispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_188_Berezivka": {
    id: "SOV_ADM1_UKR_188_Berezivka",
    republic: "UKRAINE",
    modernName: "Distretto di Berezivka",
    historicalName: "Berezivka (Valle del Fiume Tiligul \u2014 Ferrovia Odessa-Kolosivka)",
    russianName: "Berezovskij rajon \u2014 Odesskaya oblast",
    adminTitle: "Berezovskij Rajispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Berezivka",
    keys: ["adm1_ukr_188_berezivka", "berezivka", "berezovskij", "oblast", "odesskaya", "rajon", "sov_adm1_ukr_188_berezivka"],
    notes: {
      s0: "Fulgida metropoli portuale e mercantile sul Mar Nero, celebrata per la maestosa Scalinata Potëmkin, le catacombe calcaree e la vivace cultura cosmopolita ed ebraica; sede della storica fabbrica di macchinari pesanti Gen e del Cantiere Navale Marti n. 197; il suo porto commerciale è il principale sbocco del commercio marittimo estero ucraino.",
      s1: "Dure purghe colpiscono gli intellettuali e i marinai di Odessa; l'NKVD vigila con ossessione sul porto contro contatti clandestini con l'estero e commercio nero.",
      s2: "Sviluppo della base navale secondaria di Odessa e delle postazioni d'artiglieria costiera per la sorveglianza delle rotte verso la Romania.",
      s3_4: "I cantieri navali riparano cacciatorpediniere e sommergibili della Flotta del Mar Nero e allestiscono la Flottiglia Militare del Dnestr.",
      s5: "L'Oblast di Odessa controlla la frontiera fluviale sul Dnestr di fronte alla Bessarabia romena; strettissima allerta militare durante la campagna polacca del 1939.",
      s6: "Nel giugno 1940 Odessa è la base di partenza per le truppe sovietiche che avanzano in Bessarabia a seguito dell'ultimatum alla Romania, estendendo il controllo sovietico fino al Danubio.",
      s7: "Le fabbriche di Odessa vengono integrate nei piani di mobilitazione per munizioni e autoblindo improvvisate; addestramento della milizia operaia cittadina.",
      s8: "Odessa si prepara alla difesa; entro poche settimane l'Armata Costiera sovietica e i marinai della flotta scriveranno la leggendaria epopea dei 73 giorni di difesa di Odessa contro l'esercito romeno e tedesco.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Berezivka (Valle del Fiume Tiligul — Ferrovia Odessa-Kolosivka)",
    getAdminTitle: (_step: number) => "Berezovskij Rajispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_189_Velyks_Mykhailivka": {
    id: "SOV_ADM1_UKR_189_Velyks_Mykhailivka",
    republic: "UKRAINE",
    modernName: "Distretto di Velyka Mychajlivka",
    historicalName: "Velyka Mychajlivka (Grosulovo \u2014 Valle del Fiume Ku\u010durhan)",
    russianName: "Velikomikhajlovskij rajon \u2014 Odesskaya oblast",
    adminTitle: "Velikomichajlovskij Rajispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Velyka Mychajlivka",
    keys: ["adm1_ukr_189_velyks_mykhailivka", "mychajlivka", "oblast", "odesskaya", "rajon", "sov_adm1_ukr_189_velyks_mykhailivka", "velikomikhajlovskij", "velyka", "velyka mychajlivka", "velykamychajlivka", "velyks mykhailivka", "velyks_mykhailivka"],
    notes: {
      s0: "Fulgida metropoli portuale e mercantile sul Mar Nero, celebrata per la maestosa Scalinata Potëmkin, le catacombe calcaree e la vivace cultura cosmopolita ed ebraica; sede della storica fabbrica di macchinari pesanti Gen e del Cantiere Navale Marti n. 197; il suo porto commerciale è il principale sbocco del commercio marittimo estero ucraino.",
      s1: "Dure purghe colpiscono gli intellettuali e i marinai di Odessa; l'NKVD vigila con ossessione sul porto contro contatti clandestini con l'estero e commercio nero.",
      s2: "Sviluppo della base navale secondaria di Odessa e delle postazioni d'artiglieria costiera per la sorveglianza delle rotte verso la Romania.",
      s3_4: "I cantieri navali riparano cacciatorpediniere e sommergibili della Flotta del Mar Nero e allestiscono la Flottiglia Militare del Dnestr.",
      s5: "L'Oblast di Odessa controlla la frontiera fluviale sul Dnestr di fronte alla Bessarabia romena; strettissima allerta militare durante la campagna polacca del 1939.",
      s6: "Nel giugno 1940 Odessa è la base di partenza per le truppe sovietiche che avanzano in Bessarabia a seguito dell'ultimatum alla Romania, estendendo il controllo sovietico fino al Danubio.",
      s7: "Le fabbriche di Odessa vengono integrate nei piani di mobilitazione per munizioni e autoblindo improvvisate; addestramento della milizia operaia cittadina.",
      s8: "Odessa si prepara alla difesa; entro poche settimane l'Armata Costiera sovietica e i marinai della flotta scriveranno la leggendaria epopea dei 73 giorni di difesa di Odessa contro l'esercito romeno e tedesco.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Velyka Mychajlivka (Grosulovo — Valle del Fiume Kučurhan)",
    getAdminTitle: (_step: number) => "Velikomichajlovskij Rajispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_190_Ivanivka": {
    id: "SOV_ADM1_UKR_190_Ivanivka",
    republic: "UKRAINE",
    modernName: "Distretto di Ivanivka",
    historicalName: "Ivanivka (Balka Velykoho Kujal'nyka \u2014 Terre Nere)",
    russianName: "Ivanovskij rajon \u2014 Odesskaya oblast",
    adminTitle: "Ivanovskij Rajispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Ivanivka",
    keys: ["adm1_ukr_190_ivanivka", "ivanivka", "ivanovskij", "oblast", "odesskaya", "rajon", "sov_adm1_ukr_190_ivanivka"],
    notes: {
      s0: "Fulgida metropoli portuale e mercantile sul Mar Nero, celebrata per la maestosa Scalinata Potëmkin, le catacombe calcaree e la vivace cultura cosmopolita ed ebraica; sede della storica fabbrica di macchinari pesanti Gen e del Cantiere Navale Marti n. 197; il suo porto commerciale è il principale sbocco del commercio marittimo estero ucraino.",
      s1: "Dure purghe colpiscono gli intellettuali e i marinai di Odessa; l'NKVD vigila con ossessione sul porto contro contatti clandestini con l'estero e commercio nero.",
      s2: "Sviluppo della base navale secondaria di Odessa e delle postazioni d'artiglieria costiera per la sorveglianza delle rotte verso la Romania.",
      s3_4: "I cantieri navali riparano cacciatorpediniere e sommergibili della Flotta del Mar Nero e allestiscono la Flottiglia Militare del Dnestr.",
      s5: "L'Oblast di Odessa controlla la frontiera fluviale sul Dnestr di fronte alla Bessarabia romena; strettissima allerta militare durante la campagna polacca del 1939.",
      s6: "Nel giugno 1940 Odessa è la base di partenza per le truppe sovietiche che avanzano in Bessarabia a seguito dell'ultimatum alla Romania, estendendo il controllo sovietico fino al Danubio.",
      s7: "Le fabbriche di Odessa vengono integrate nei piani di mobilitazione per munizioni e autoblindo improvvisate; addestramento della milizia operaia cittadina.",
      s8: "Odessa si prepara alla difesa; entro poche settimane l'Armata Costiera sovietica e i marinai della flotta scriveranno la leggendaria epopea dei 73 giorni di difesa di Odessa contro l'esercito romeno e tedesco.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Ivanivka (Balka Velykoho Kujal'nyka — Terre Nere)",
    getAdminTitle: (_step: number) => "Ivanovskij Rajispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_191_Lyman": {
    id: "SOV_ADM1_UKR_191_Lyman",
    republic: "UKRAINE",
    modernName: "Distretto di Lyman",
    historicalName: "Kominternivs'ke (Antonovo-Kodyntseve \u2014 Intitolata al Comintern nel 1933)",
    russianName: "Kominternovskij rajon \u2014 Odesskaya oblast",
    adminTitle: "Kominternovskij Rajispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Kominternivs'ke",
    keys: ["adm1_ukr_191_lyman", "kominternivs'ke", "kominternivske", "kominternovskij", "lyman", "oblast", "odesskaya", "rajon", "sov_adm1_ukr_191_lyman"],
    notes: {
      s0: "Fulgida metropoli portuale e mercantile sul Mar Nero, celebrata per la maestosa Scalinata Potëmkin, le catacombe calcaree e la vivace cultura cosmopolita ed ebraica; sede della storica fabbrica di macchinari pesanti Gen e del Cantiere Navale Marti n. 197; il suo porto commerciale è il principale sbocco del commercio marittimo estero ucraino.",
      s1: "Dure purghe colpiscono gli intellettuali e i marinai di Odessa; l'NKVD vigila con ossessione sul porto contro contatti clandestini con l'estero e commercio nero.",
      s2: "Sviluppo della base navale secondaria di Odessa e delle postazioni d'artiglieria costiera per la sorveglianza delle rotte verso la Romania.",
      s3_4: "I cantieri navali riparano cacciatorpediniere e sommergibili della Flotta del Mar Nero e allestiscono la Flottiglia Militare del Dnestr.",
      s5: "L'Oblast di Odessa controlla la frontiera fluviale sul Dnestr di fronte alla Bessarabia romena; strettissima allerta militare durante la campagna polacca del 1939.",
      s6: "Nel giugno 1940 Odessa è la base di partenza per le truppe sovietiche che avanzano in Bessarabia a seguito dell'ultimatum alla Romania, estendendo il controllo sovietico fino al Danubio.",
      s7: "Le fabbriche di Odessa vengono integrate nei piani di mobilitazione per munizioni e autoblindo improvvisate; addestramento della milizia operaia cittadina.",
      s8: "Odessa si prepara alla difesa; entro poche settimane l'Armata Costiera sovietica e i marinai della flotta scriveranno la leggendaria epopea dei 73 giorni di difesa di Odessa contro l'esercito romeno e tedesco.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Kominternivs'ke (Antonovo-Kodyntseve — Intitolata al Comintern nel 1933)",
    getAdminTitle: (_step: number) => "Kominternovskij Rajispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_192_Rozdilna": {
    id: "SOV_ADM1_UKR_192_Rozdilna",
    republic: "UKRAINE",
    modernName: "Distretto di Rozdil'na",
    historicalName: "Rozdil'na (Nodo Ferroviario Strategico per Odessa, Kiev e Chi\u0219in\u0103u)",
    russianName: "Razdel'njanskij rajon \u2014 Odesskaya oblast",
    adminTitle: "Razdel'njanskij Rajispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Rozdil'na",
    keys: ["adm1_ukr_192_rozdilna", "oblast", "odesskaya", "rajon", "razdelnjanskij", "rozdil'na", "rozdilna", "sov_adm1_ukr_192_rozdilna"],
    notes: {
      s0: "Fulgida metropoli portuale e mercantile sul Mar Nero, celebrata per la maestosa Scalinata Potëmkin, le catacombe calcaree e la vivace cultura cosmopolita ed ebraica; sede della storica fabbrica di macchinari pesanti Gen e del Cantiere Navale Marti n. 197; il suo porto commerciale è il principale sbocco del commercio marittimo estero ucraino.",
      s1: "Dure purghe colpiscono gli intellettuali e i marinai di Odessa; l'NKVD vigila con ossessione sul porto contro contatti clandestini con l'estero e commercio nero.",
      s2: "Sviluppo della base navale secondaria di Odessa e delle postazioni d'artiglieria costiera per la sorveglianza delle rotte verso la Romania.",
      s3_4: "I cantieri navali riparano cacciatorpediniere e sommergibili della Flotta del Mar Nero e allestiscono la Flottiglia Militare del Dnestr.",
      s5: "L'Oblast di Odessa controlla la frontiera fluviale sul Dnestr di fronte alla Bessarabia romena; strettissima allerta militare durante la campagna polacca del 1939.",
      s6: "Nel giugno 1940 Odessa è la base di partenza per le truppe sovietiche che avanzano in Bessarabia a seguito dell'ultimatum alla Romania, estendendo il controllo sovietico fino al Danubio.",
      s7: "Le fabbriche di Odessa vengono integrate nei piani di mobilitazione per munizioni e autoblindo improvvisate; addestramento della milizia operaia cittadina.",
      s8: "Odessa si prepara alla difesa; entro poche settimane l'Armata Costiera sovietica e i marinai della flotta scriveranno la leggendaria epopea dei 73 giorni di difesa di Odessa contro l'esercito romeno e tedesco.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Rozdil'na (Nodo Ferroviario Strategico per Odessa, Kiev e Chișinău)",
    getAdminTitle: (_step: number) => "Razdel'njanskij Rajispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_193_Biliaivka": {
    id: "SOV_ADM1_UKR_193_Biliaivka",
    republic: "UKRAINE",
    modernName: "Distretto di Bilja\u00efvka",
    historicalName: "Bilja\u00efvka (Stazione di Pompaggio delle Acque del Fiume Dnestr per Odessa)",
    russianName: "Beljaevskij rajon \u2014 Odesskaya oblast",
    adminTitle: "Beljaevskij Rajispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Bilja\u00efvka",
    keys: ["adm1_ukr_193_biliaivka", "beljaevskij", "biliaivka", "biljavka", "biljaïvka", "oblast", "odesskaya", "rajon", "sov_adm1_ukr_193_biliaivka"],
    notes: {
      s0: "Fulgida metropoli portuale e mercantile sul Mar Nero, celebrata per la maestosa Scalinata Potëmkin, le catacombe calcaree e la vivace cultura cosmopolita ed ebraica; sede della storica fabbrica di macchinari pesanti Gen e del Cantiere Navale Marti n. 197; il suo porto commerciale è il principale sbocco del commercio marittimo estero ucraino.",
      s1: "Dure purghe colpiscono gli intellettuali e i marinai di Odessa; l'NKVD vigila con ossessione sul porto contro contatti clandestini con l'estero e commercio nero.",
      s2: "Sviluppo della base navale secondaria di Odessa e delle postazioni d'artiglieria costiera per la sorveglianza delle rotte verso la Romania.",
      s3_4: "I cantieri navali riparano cacciatorpediniere e sommergibili della Flotta del Mar Nero e allestiscono la Flottiglia Militare del Dnestr.",
      s5: "L'Oblast di Odessa controlla la frontiera fluviale sul Dnestr di fronte alla Bessarabia romena; strettissima allerta militare durante la campagna polacca del 1939.",
      s6: "Nel giugno 1940 Odessa è la base di partenza per le truppe sovietiche che avanzano in Bessarabia a seguito dell'ultimatum alla Romania, estendendo il controllo sovietico fino al Danubio.",
      s7: "Le fabbriche di Odessa vengono integrate nei piani di mobilitazione per munizioni e autoblindo improvvisate; addestramento della milizia operaia cittadina.",
      s8: "Odessa si prepara alla difesa; entro poche settimane l'Armata Costiera sovietica e i marinai della flotta scriveranno la leggendaria epopea dei 73 giorni di difesa di Odessa contro l'esercito romeno e tedesco.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Biljaïvka (Stazione di Pompaggio delle Acque del Fiume Dnestr per Odessa)",
    getAdminTitle: (_step: number) => "Beljaevskij Rajispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_194_Ovidiopol": {
    id: "SOV_ADM1_UKR_194_Ovidiopol",
    republic: "UKRAINE",
    modernName: "Distretto di Ovidiopol'",
    historicalName: "Ovidiopol' (Liman del Dnestr \u2014 Presidio Difensivo Costiero sul Mar Nero)",
    russianName: "Ovidiopol'skij rajon \u2014 Odesskaya oblast",
    adminTitle: "Ovidiopol'skij Rajispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Ovidiopol'",
    keys: ["adm1_ukr_194_ovidiopol", "oblast", "odesskaya", "ovidiopol", "ovidiopol'", "ovidiopolskij", "rajon", "sov_adm1_ukr_194_ovidiopol"],
    notes: {
      s0: "Fulgida metropoli portuale e mercantile sul Mar Nero, celebrata per la maestosa Scalinata Potëmkin, le catacombe calcaree e la vivace cultura cosmopolita ed ebraica; sede della storica fabbrica di macchinari pesanti Gen e del Cantiere Navale Marti n. 197; il suo porto commerciale è il principale sbocco del commercio marittimo estero ucraino.",
      s1: "Dure purghe colpiscono gli intellettuali e i marinai di Odessa; l'NKVD vigila con ossessione sul porto contro contatti clandestini con l'estero e commercio nero.",
      s2: "Sviluppo della base navale secondaria di Odessa e delle postazioni d'artiglieria costiera per la sorveglianza delle rotte verso la Romania.",
      s3_4: "I cantieri navali riparano cacciatorpediniere e sommergibili della Flotta del Mar Nero e allestiscono la Flottiglia Militare del Dnestr.",
      s5: "L'Oblast di Odessa controlla la frontiera fluviale sul Dnestr di fronte alla Bessarabia romena; strettissima allerta militare durante la campagna polacca del 1939.",
      s6: "Nel giugno 1940 Odessa è la base di partenza per le truppe sovietiche che avanzano in Bessarabia a seguito dell'ultimatum alla Romania, estendendo il controllo sovietico fino al Danubio.",
      s7: "Le fabbriche di Odessa vengono integrate nei piani di mobilitazione per munizioni e autoblindo improvvisate; addestramento della milizia operaia cittadina.",
      s8: "Odessa si prepara alla difesa; entro poche settimane l'Armata Costiera sovietica e i marinai della flotta scriveranno la leggendaria epopea dei 73 giorni di difesa di Odessa contro l'esercito romeno e tedesco.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Ovidiopol' (Liman del Dnestr — Presidio Difensivo Costiero sul Mar Nero)",
    getAdminTitle: (_step: number) => "Ovidiopol'skij Rajispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_195_Odessa_City": {
    id: "SOV_ADM1_UKR_195_Odessa_City",
    republic: "UKRAINE",
    modernName: "Odessa (Citt\u00e0 Capoluogo)",
    historicalName: "Odessa (Porto Principale sul Mar Nero \u2014 Scalinata Pot\u00ebmkin)",
    russianName: "Gorod Odessa",
    adminTitle: "Odesskij Gorsovet & Base Navale Flotta del Mar Nero \u2014 RSS Ucraina (URSS)",
    capital: "Odessa",
    keys: ["adm1_ukr_195_odessa_city", "capoluogo", "gorod", "odessa", "odessa city", "odessa_city", "sov_adm1_ukr_195_odessa_city"],
    notes: {
      s0: "Fulgida metropoli portuale e mercantile sul Mar Nero, celebrata per la maestosa Scalinata Potëmkin, le catacombe calcaree e la vivace cultura cosmopolita ed ebraica; sede della storica fabbrica di macchinari pesanti Gen e del Cantiere Navale Marti n. 197; il suo porto commerciale è il principale sbocco del commercio marittimo estero ucraino.",
      s1: "Dure purghe colpiscono gli intellettuali e i marinai di Odessa; l'NKVD vigila con ossessione sul porto contro contatti clandestini con l'estero e commercio nero.",
      s2: "Sviluppo della base navale secondaria di Odessa e delle postazioni d'artiglieria costiera per la sorveglianza delle rotte verso la Romania.",
      s3_4: "I cantieri navali riparano cacciatorpediniere e sommergibili della Flotta del Mar Nero e allestiscono la Flottiglia Militare del Dnestr.",
      s5: "L'Oblast di Odessa controlla la frontiera fluviale sul Dnestr di fronte alla Bessarabia romena; strettissima allerta militare durante la campagna polacca del 1939.",
      s6: "Nel giugno 1940 Odessa è la base di partenza per le truppe sovietiche che avanzano in Bessarabia a seguito dell'ultimatum alla Romania, estendendo il controllo sovietico fino al Danubio.",
      s7: "Le fabbriche di Odessa vengono integrate nei piani di mobilitazione per munizioni e autoblindo improvvisate; addestramento della milizia operaia cittadina.",
      s8: "Odessa si prepara alla difesa; entro poche settimane l'Armata Costiera sovietica e i marinai della flotta scriveranno la leggendaria epopea dei 73 giorni di difesa di Odessa contro l'esercito romeno e tedesco.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Odessa (Porto Principale sul Mar Nero — Scalinata Potëmkin)",
    getAdminTitle: (_step: number) => "Odesskij Gorsovet & Base Navale Flotta del Mar Nero — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_80_Kherson_Oblast": {
    id: "SOV_ADM1_UKR_80_Kherson_Oblast",
    republic: "UKRAINE",
    modernName: "Oblast di Cherson",
    historicalName: "Distretto di Cherson (Foce del Dnepr \u2014 Cantieri Fluviali e Porto)",
    russianName: "Khersonskij okrug \u2014 Nikolaevskaya oblast",
    adminTitle: "Chersonskij Gorsovet \u2014 RSS Ucraina (URSS)",
    capital: "Cherson",
    keys: ["adm1_ukr_80_kherson_oblast", "cherson", "kherson oblast", "kherson_oblast", "khersonskij", "nikolaevskaya", "oblast", "okrug", "sov_adm1_ukr_80_kherson_oblast"],
    notes: {
      s0: "Capitale della cantieristica navale della Russia meridionale alla confluenza del Bug Meridionale e del Dnepr sul Mar Nero; a Nikolaev opera il Cantiere Navale n. 198 (Marti) e il Cantiere n. 200 (61 Kommunara), gli unici cantieri navali dell'URSS dotati di scali inclinati giganti capaci di impostare navi da battaglia pesanti e incrociatori da 40.000 tonnellate.",
      s1: "Dure indagini dell'NKVD sui ritardi nei programmi navali d'altura di Stalin; arrestati e fucilati diversi ingegneri navali e progettisti di turbine a vapore.",
      s2: "Nel 1938-1939 a Nikolaev viene impostata sullo scalo 'O' del cantiere Marti la colossale corazzata Sovetskaja Ukraina (classe Sovetskij Sojuz da 65.000 tonnellate) e l'incrociatore pesante Frunze (classe Čapaev).",
      s3_4: "I cantieri di Nikolaev varano cacciatorpediniere conduttori classe 'Taškent' e sommergibili a grande autonomia per la Flotta del Mar Nero.",
      s5: "Durante la guerra europea i cantieri navali del Mar Nero lavorano a tappe forzate per dotare l'URSS di una flotta oceanica di superficie.",
      s6: "A Cherson vengono potenziati i bacini per chiatte fluviali e navi cisterna che trasportano i carichi di grano e petrolio attraverso il Dnepr.",
      s7: "Lo scafo corazzato della Sovetskaja Ukraina raggiunge il ponte principale al cantiere Marti, ma la carenza di piastre corazzate e turbine ne rallenta il completamento.",
      s8: "Nikolaev è il cuore pulsante delle ambizioni navali oceaniche di Stalin, pronto a difendere gli scali e i bacini di carenaggio contro la minaccia d'invasione.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Distretto di Cherson (Foce del Dnepr — Cantieri Fluviali e Porto)",
    getAdminTitle: (_step: number) => "Chersonskij Gorsovet — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_81_Zhytomyr_Oblast": {
    id: "SOV_ADM1_UKR_81_Zhytomyr_Oblast",
    republic: "UKRAINE",
    modernName: "Oblast di \u017dytomyr",
    historicalName: "Oblast di \u017dytomyr (Polesie Ucraino \u2014 Settore Fortificato di Korosten')",
    russianName: "Zhitomirskaya oblast",
    adminTitle: "\u017ditomirskij Oblispolkom \u2014 RSS Ucraina (URSS)",
    capital: "\u017dytomyr",
    keys: ["adm1_ukr_81_zhytomyr_oblast", "oblast", "sov_adm1_ukr_81_zhytomyr_oblast", "ytomyr", "zhitomirskaya", "zhytomyr oblast", "zhytomyr_oblast", "žytomyr"],
    notes: {
      s0: "Cuore agricolo e storico dell'Ucraina; comprende le fertili terre nere della riva destra e sinistra del Dnepr, i campi storici della battaglia di Poltava del 1709, le antiche cattedrali di Černihiv, i grandi zuccherifici della Podolia a Vinnica, la fortezza di confine di Kam'janec'-Podil's'kyj e le fabbriche di macchine agricole Červona Zirka a Kirovo.",
      s1: "Le ferite della collettivizzazione e della carestia dei primi anni Trenta sono ancora vivide; l'NKVD esegue arresti di massa tra gli agronomi, i sacerdoti e i dirigenti di kolchoz accusati di 'nazionalismo ucraino'.",
      s2: "Ammodernamento della rete ferroviaria e stradale che collega Kiev a Leopoli e Odessa; sviluppo di fortificazioni confinarie a Korosten' e Novograd-Volynskij (Linea Stalin).",
      s3_4: "La fabbrica Červona Zirka e gli zuccherifici podolici consegnano quote record per l'approvvigionamento alimentare dell'Armata Rossa.",
      s5: "Nel settembre 1939 queste regioni fungono da retrovia immediata per l'avanzata delle armate sovietiche in Galizia e Volinia.",
      s6: "Con lo spostamento del confine sovietico centinaia di chilometri più a ovest (fino al fiume Bug), le vecchie fortificazioni della Linea Stalin vengono parzialmente disarmate a favore della nuova Linea Molotov.",
      s7: "I kolchoz ucraini operano a regime febbrile per riempire i silos statali di grano e barbabietole, garantendo le forniture pattuite con la Germania.",
      s8: "Alla vigilia del 22 giugno 1941, le fertili pianure ucraine si trovano direttamente sulla direttrice strategica dell'Heeresgruppe Süd della Wehrmacht.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Žytomyr (Polesie Ucraino — Settore Fortificato di Korosten')",
    getAdminTitle: (_step: number) => "Žitomirskij Oblispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_82_Kyiv_Oblast": {
    id: "SOV_ADM1_UKR_82_Kyiv_Oblast",
    republic: "UKRAINE",
    modernName: "Oblast di Kiev",
    historicalName: "Oblast di Kiev (Bacino del Medio Dnepr)",
    russianName: "Kievskaya oblast",
    adminTitle: "Kievskij Oblispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Kiev",
    keys: ["adm1_ukr_82_kyiv_oblast", "kiev", "kievskaya", "kyiv oblast", "kyiv_oblast", "oblast", "sov_adm1_ukr_82_kyiv_oblast"],
    notes: {
      s0: "Capitale della Repubblica Socialista Sovietica Ucraina dal 1934 (quando le funzioni governative furono trasferite da Charkiv), adagiata sulle colline del maestoso fiume Dnepr; sede del Comitato Centrale del Partito Comunista dell'Ucraina (guidato da Stanislav Kosior) e del quartier generale del potentissimo Distretto Militare di Kiev (KOVO), comandato dal generale Iona Jakir. Nel 1936 vengono ampliate le officine ferroviarie di Darnytsja e la fabbrica Arsenal.",
      s1: "Le Grandi Purghe colpiscono con ferocia inaudita l'Ucraina: Iona Jakir viene arrestato e fucilato insieme a Tuchačevskij a Mosca; Kosior e gran parte del governo ucraino vengono eliminati dall'NKVD; nel gennaio 1938 Stalin invia Nikita Chruščëv come Primo Segretario del partito a Kiev per completare la 'pulizia' politica.",
      s2: "Chruščëv e il nuovo comandante militare Semën Timošenko riorganizzano il Distretto Militare di Kiev, accelerando la costruzione del Settore Fortificato di Kiev (KiUR - Kievskij Ukreplënnyj Rajon) lungo il fiume Irpin' con centinaia di bunker in cemento armato (DOT).",
      s3_4: "La fabbrica Arsenal e gli impianti di Kiev intensificano la produzione di apparecchiature ottiche militari, ponti di barche e telai d'artiglieria per le armate di prima linea.",
      s5: "Il 17 settembre 1939 dal quartier generale avanzato del KOVO parte l'ordine di attacco per la campagna della Polonia orientale: le armate del fronte ucraino occupano la Galizia e la Volinia (Leopoli, Stanislav, Tarnopol). Kiev accoglie con grandi parate le truppe reduci dalla vittoria.",
      s6: "Nel giugno 1940 il generale Georgij Žukov assume il comando del Distretto Militare di Kiev; Kiev coordina l'operazione militare per l'occupazione e l'annessione della Bessarabia e della Bucovina Settentrionale dalla Romania.",
      s7: "Žukov conduce colossali manovre sul terreno con simulazioni al computer cartografico che evidenziano i pericoli di sfondamento tedesco; nel gennaio 1941 Žukov viene promosso Capo di Stato Maggiore Generale a Mosca e il comando a Kiev passa al generale Michail Kirponos.",
      s8: "Alla vigilia del 22 giugno 1941, Kiev è difesa dalle migliori divisioni corazzate e meccanizzate dell'Armata Rossa, schierate lungo la frontiera occidentale sotto la guida di Kirponos, destinate entro poche settimane a essere coinvolte nella titanica sacca della Battaglia di Kiev.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Kiev (Bacino del Medio Dnepr)",
    getAdminTitle: (_step: number) => "Kievskij Oblispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_83_Chernihiv_Oblast": {
    id: "SOV_ADM1_UKR_83_Chernihiv_Oblast",
    republic: "UKRAINE",
    modernName: "Oblast di \u010cernihiv",
    historicalName: "Oblast di \u010cernihiv (Bacino della Desna \u2014 Confine Russo-Bielorusso)",
    russianName: "Chernigovskaya oblast",
    adminTitle: "\u010cernigovskij Oblispolkom \u2014 RSS Ucraina (URSS)",
    capital: "\u010cernihiv",
    keys: ["adm1_ukr_83_chernihiv_oblast", "chernigovskaya", "chernihiv oblast", "chernihiv_oblast", "ernihiv", "oblast", "sov_adm1_ukr_83_chernihiv_oblast", "černihiv"],
    notes: {
      s0: "Cuore agricolo e storico dell'Ucraina; comprende le fertili terre nere della riva destra e sinistra del Dnepr, i campi storici della battaglia di Poltava del 1709, le antiche cattedrali di Černihiv, i grandi zuccherifici della Podolia a Vinnica, la fortezza di confine di Kam'janec'-Podil's'kyj e le fabbriche di macchine agricole Červona Zirka a Kirovo.",
      s1: "Le ferite della collettivizzazione e della carestia dei primi anni Trenta sono ancora vivide; l'NKVD esegue arresti di massa tra gli agronomi, i sacerdoti e i dirigenti di kolchoz accusati di 'nazionalismo ucraino'.",
      s2: "Ammodernamento della rete ferroviaria e stradale che collega Kiev a Leopoli e Odessa; sviluppo di fortificazioni confinarie a Korosten' e Novograd-Volynskij (Linea Stalin).",
      s3_4: "La fabbrica Červona Zirka e gli zuccherifici podolici consegnano quote record per l'approvvigionamento alimentare dell'Armata Rossa.",
      s5: "Nel settembre 1939 queste regioni fungono da retrovia immediata per l'avanzata delle armate sovietiche in Galizia e Volinia.",
      s6: "Con lo spostamento del confine sovietico centinaia di chilometri più a ovest (fino al fiume Bug), le vecchie fortificazioni della Linea Stalin vengono parzialmente disarmate a favore della nuova Linea Molotov.",
      s7: "I kolchoz ucraini operano a regime febbrile per riempire i silos statali di grano e barbabietole, garantendo le forniture pattuite con la Germania.",
      s8: "Alla vigilia del 22 giugno 1941, le fertili pianure ucraine si trovano direttamente sulla direttrice strategica dell'Heeresgruppe Süd della Wehrmacht.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Černihiv (Bacino della Desna — Confine Russo-Bielorusso)",
    getAdminTitle: (_step: number) => "Černigovskij Oblispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_84_Sumy_Oblast": {
    id: "SOV_ADM1_UKR_84_Sumy_Oblast",
    republic: "UKRAINE",
    modernName: "Oblast di Sumy",
    historicalName: "Oblast di Sumy (Regione dello Zucchero e Fabbrica Frunze)",
    russianName: "Sumskaya oblast",
    adminTitle: "Sumskij Oblispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Sumy",
    keys: ["adm1_ukr_84_sumy_oblast", "oblast", "sov_adm1_ukr_84_sumy_oblast", "sumskaya", "sumy", "sumy oblast", "sumy_oblast"],
    notes: {
      s0: "Cuore agricolo e storico dell'Ucraina; comprende le fertili terre nere della riva destra e sinistra del Dnepr, i campi storici della battaglia di Poltava del 1709, le antiche cattedrali di Černihiv, i grandi zuccherifici della Podolia a Vinnica, la fortezza di confine di Kam'janec'-Podil's'kyj e le fabbriche di macchine agricole Červona Zirka a Kirovo.",
      s1: "Le ferite della collettivizzazione e della carestia dei primi anni Trenta sono ancora vivide; l'NKVD esegue arresti di massa tra gli agronomi, i sacerdoti e i dirigenti di kolchoz accusati di 'nazionalismo ucraino'.",
      s2: "Ammodernamento della rete ferroviaria e stradale che collega Kiev a Leopoli e Odessa; sviluppo di fortificazioni confinarie a Korosten' e Novograd-Volynskij (Linea Stalin).",
      s3_4: "La fabbrica Červona Zirka e gli zuccherifici podolici consegnano quote record per l'approvvigionamento alimentare dell'Armata Rossa.",
      s5: "Nel settembre 1939 queste regioni fungono da retrovia immediata per l'avanzata delle armate sovietiche in Galizia e Volinia.",
      s6: "Con lo spostamento del confine sovietico centinaia di chilometri più a ovest (fino al fiume Bug), le vecchie fortificazioni della Linea Stalin vengono parzialmente disarmate a favore della nuova Linea Molotov.",
      s7: "I kolchoz ucraini operano a regime febbrile per riempire i silos statali di grano e barbabietole, garantendo le forniture pattuite con la Germania.",
      s8: "Alla vigilia del 22 giugno 1941, le fertili pianure ucraine si trovano direttamente sulla direttrice strategica dell'Heeresgruppe Süd della Wehrmacht.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Sumy (Regione dello Zucchero e Fabbrica Frunze)",
    getAdminTitle: (_step: number) => "Sumskij Oblispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_85_Kharkiv_Oblast": {
    id: "SOV_ADM1_UKR_85_Kharkiv_Oblast",
    republic: "UKRAINE",
    modernName: "Oblast di Charkiv",
    historicalName: "Oblast di Charkiv (Fabbrica n. 183 Komintern \u2014 Culla del Carro T-34)",
    russianName: "Khar'kovskaya oblast",
    adminTitle: "Char'kovskij Oblispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Charkiv",
    keys: ["adm1_ukr_85_kharkiv_oblast", "charkiv", "kharkiv oblast", "kharkiv_oblast", "kharkovskaya", "oblast", "sov_adm1_ukr_85_kharkiv_oblast"],
    notes: {
      s0: "Prima capitale dell'Ucraina Sovietica (1919-1934) e colosso assoluto dell'ingegneria meccanica pesante; ospita la leggendaria Fabbrica di Locomotive di Charkiv n. 183 Komintern (ChPZ), il Trattorificio di Charkiv (ChTZ), la fabbrica elettromeccanica ChEMZ e la fabbrica di turbine ChTGZ. Nel 1936 a ChPZ l'ufficio di progettazione carri (KB) è guidato dal giovane e brillante Michail Koškin.",
      s1: "Le purghe dell'NKVD colpiscono i vertici della fabbrica n. 183: il precedente capo progettista Firsov viene arrestato; Koškin assume la direzione totale del progetto per un nuovo carro armato ad alta mobilità cingolato.",
      s2: "A ChPZ Koškin, Aleksandr Morozov e Nikolaj Kučerenko sviluppano il prototipo BT-20 (A-20) e convincono Stalin a puntare su un carro interamente cingolato con corazza inclinata innovativa e motore diesel d'alluminio V-2.",
      s3_4: "Nel 1939 a Charkiv nasce il prototipo A-32, armato con cannone da 76 mm, approvato personalmente da Stalin come base per il leggendario carro armato medio T-34.",
      s5: "Nel marzo 1940 Michail Koškin compie la storica e drammatica marcia su strada di 750 km da Charkiv a Mosca alla guida di due prototipi di T-34 nel fango e nella neve per mostrarli al Cremlino a Stalin; Koškin si ammala di polmonite e muore nel settembre 1940; Morozov assume la guida dell'ufficio tecnico.",
      s6: "Nel giugno 1940 a Charkiv parte la produzione di serie del carro T-34 alla fabbrica n. 183 e dei motori diesel V-2 alla fabbrica motori n. 75, affiancata dal Trattorificio ChTZ che produce trattori d'artiglieria Komintern e Vorošilovec.",
      s7: "La fabbrica n. 183 lavora a ciclo continuo: vengono risolti i problemi giovanili della torretta e del cambio del T-34, mentre Charkiv diventa il principale fornitore di carri armati moderni per le divisioni corazzate dell'Armata Rossa.",
      s8: "Alla vigilia dell'invasione tedesca, Charkiv è la capitale dei carri armati sovietici, con centinaia di T-34 già consegnati alle unità di prima linea e le maestranze preparate all'eventualità di un'evacuazione verso gli Urali.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Charkiv (Fabbrica n. 183 Komintern — Culla del Carro T-34)",
    getAdminTitle: (_step: number) => "Char'kovskij Oblispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_86_Luhansk_Oblast": {
    id: "SOV_ADM1_UKR_86_Luhansk_Oblast",
    republic: "UKRAINE",
    modernName: "Oblast di Luhans'k",
    historicalName: "Oblast di Voro\u0161ilovgrad (Fabbrica Locomotive e Miniere di Carbone)",
    russianName: "Voroshilovgradskaya oblast",
    adminTitle: "Voro\u0161ilovgradskij Oblispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Voro\u0161ilovgrad",
    keys: ["adm1_ukr_86_luhansk_oblast", "luhansk", "luhansk oblast", "luhansk_oblast", "oblast", "sov_adm1_ukr_86_luhansk_oblast", "voroilovgrad", "voroshilovgradskaya", "vorošilovgrad"],
    notes: {
      s0: "Cuore pulsante del Bacino Carbonifero e Metallurgico del Donbass; Stalino (ex Juzovka, ribattezzata in onore di Stalin nel 1924) e Vorošilovgrad (ex Lugansk, ribattezzata in onore di Voroscilov nel 1935) costituiscono il più grande polo carbonifero e siderurgico dell'URSS; qui nacque nel 1935 il movimento stachanovista nella miniera Central'naja-Irmino per opera del minatore Aleksej Stachanov.",
      s1: "Lo stachanovismo viene esasperato con quote produttive irrealistiche; l'NKVD processa e fucila decine di ingegneri e capi miniera accusati di 'sabotaggio carbo-siderurgico' per crolli o esplosioni di grisou nelle gallerie del Donbass.",
      s2: "A Vorošilovgrad la fabbrica di locomotive Oktjabr'skaja Revoljucija (la più grande d'Europa) produce le poderose locomotive a vapore FD (Feliks Dzeržinskij) e IS (Iosif Stalin) per i trasporti pesanti della Transiberiana e della rete europea.",
      s3_4: "Il Donbass estrae oltre il 50% di tutto il carbone fossile e l'antracite dell'Unione Sovietica, alimentando gli altiforni di Dnepropetrovsk, Zaporož'e e Krivoj Rog.",
      s5: "Le acciaierie e le miniere del Donbass garantiscono l'autonomia industriale totale dell'URSS durante il blocco economico causato dalla guerra europea.",
      s6: "Produzione record di acciai speciali per corazze e proiettili d'artiglieria; le fabbriche meccaniche di Stalino e Vorošilovgrad avviano la costruzione di vagoni cisterna blindati.",
      s7: "Pianificazione preventiva per la distruzione controllata o l'allagamento delle miniere di carbone in caso di improvvisa invasione nemica.",
      s8: "Il Donbass è la centrale termica e siderurgica insostituibile dell'URSS; la sua perdita rappresenterebbe un colpo mortale per l'economia bellica sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Vorošilovgrad (Fabbrica Locomotive e Miniere di Carbone)",
    getAdminTitle: (_step: number) => "Vorošilovgradskij Oblispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_87_Donetsk_Oblast": {
    id: "SOV_ADM1_UKR_87_Donetsk_Oblast",
    republic: "UKRAINE",
    modernName: "Oblast di Donec'k",
    historicalName: "Oblast di Stalino (Bacino del Donbass \u2014 Fabbriche Metallurgiche)",
    russianName: "Stalinskaya oblast",
    adminTitle: "Stalinskij Oblispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Stalino",
    keys: ["adm1_ukr_87_donetsk_oblast", "doneck", "donetsk oblast", "donetsk_oblast", "oblast", "sov_adm1_ukr_87_donetsk_oblast", "stalino", "stalinskaya"],
    notes: {
      s0: "Cuore pulsante del Bacino Carbonifero e Metallurgico del Donbass; Stalino (ex Juzovka, ribattezzata in onore di Stalin nel 1924) e Vorošilovgrad (ex Lugansk, ribattezzata in onore di Voroscilov nel 1935) costituiscono il più grande polo carbonifero e siderurgico dell'URSS; qui nacque nel 1935 il movimento stachanovista nella miniera Central'naja-Irmino per opera del minatore Aleksej Stachanov.",
      s1: "Lo stachanovismo viene esasperato con quote produttive irrealistiche; l'NKVD processa e fucila decine di ingegneri e capi miniera accusati di 'sabotaggio carbo-siderurgico' per crolli o esplosioni di grisou nelle gallerie del Donbass.",
      s2: "A Vorošilovgrad la fabbrica di locomotive Oktjabr'skaja Revoljucija (la più grande d'Europa) produce le poderose locomotive a vapore FD (Feliks Dzeržinskij) e IS (Iosif Stalin) per i trasporti pesanti della Transiberiana e della rete europea.",
      s3_4: "Il Donbass estrae oltre il 50% di tutto il carbone fossile e l'antracite dell'Unione Sovietica, alimentando gli altiforni di Dnepropetrovsk, Zaporož'e e Krivoj Rog.",
      s5: "Le acciaierie e le miniere del Donbass garantiscono l'autonomia industriale totale dell'URSS durante il blocco economico causato dalla guerra europea.",
      s6: "Produzione record di acciai speciali per corazze e proiettili d'artiglieria; le fabbriche meccaniche di Stalino e Vorošilovgrad avviano la costruzione di vagoni cisterna blindati.",
      s7: "Pianificazione preventiva per la distruzione controllata o l'allagamento delle miniere di carbone in caso di improvvisa invasione nemica.",
      s8: "Il Donbass è la centrale termica e siderurgica insostituibile dell'URSS; la sua perdita rappresenterebbe un colpo mortale per l'economia bellica sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Stalino (Bacino del Donbass — Fabbriche Metallurgiche)",
    getAdminTitle: (_step: number) => "Stalinskij Oblispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_88_Zaporizhia_Oblast": {
    id: "SOV_ADM1_UKR_88_Zaporizhia_Oblast",
    republic: "UKRAINE",
    modernName: "Oblast di Zapori\u017e\u017eja",
    historicalName: "Oblast di Zaporo\u017e'e (Centrale Idroelettrica DneproGES e Zaporostal')",
    russianName: "Zaporozhskaya oblast",
    adminTitle: "Zaporo\u017eskij Oblispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Zaporo\u017e'e",
    keys: ["adm1_ukr_88_zaporizhia_oblast", "oblast", "sov_adm1_ukr_88_zaporizhia_oblast", "zaporija", "zaporizhia oblast", "zaporizhia_oblast", "zaporoe", "zaporozhskaya", "zaporož'e"],
    notes: {
      s0: "Polo colossale dell'energia e della metallurgia pesante sul fiume Dnepr; a Zaporož'e troneggia la Centrale Idroelettrica DneproGES (inaugurata nel 1932, all'epoca la più potente del mondo), che alimenta il combinato siderurgico Zaporostal' (specializzato in lamiere sottili per carrozzerie e corazze) e la fabbrica di alluminio Dneprovskij; a Dnepropetrovsk operano gli storici altiforni Petrovskij e il vicino bacino di minerale ferroso di Krivoj Rog.",
      s1: "Le purghe staliniane colpiscono pesantemente i tecnici e gli ingegneri idroelettrici di DneproGES e i dirigenti di Krivoj Rog accusati di legami con il 'centro trotskista clandestino'.",
      s2: "DneproGES raggiunge la piena potenza erogando oltre 560 MW, rendendo navigabili le storiche rapide del Dnepr (Porogi) sommerse dal bacino artificiale.",
      s3_4: "Zaporostal' brevetta la laminazione continua a freddo dell'acciaio speciale per la costruzione di scafi di carri armati e aerei.",
      s5: "L'energia di DneproGES e l'acciaio del Dnepr garantiscono forniture ininterrotte all'industria bellica sovietica mobilitata per le campagne del 1939-1940.",
      s6: "Nel 1940 Krivoj Rog estrae oltre 18 milioni di tonnellate di minerale di ferro, fornendo il 60% della materia prima ferrosa per tutti gli altiforni dell'URSS.",
      s7: "Vengono predisposte cariche esplosive sotterranee nei piloni della diga di DneproGES da parte dei reparti genieri dell'Armata Rossa per farla brillare in caso di ritirata estrema.",
      s8: "Alla vigilia di Barbarossa, l'ansa del Dnepr tra Dnepropetrovsk e Zaporož'e è il sancta sanctorum dell'energia e dell'acciaio sovietico.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Zaporož'e (Centrale Idroelettrica DneproGES e Zaporostal')",
    getAdminTitle: (_step: number) => "Zaporožskij Oblispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_89_Chernivtsi_Oblast": {
    id: "SOV_ADM1_UKR_89_Chernivtsi_Oblast",
    republic: "UKRAINE",
    modernName: "Oblast di \u010cernivci",
    historicalName: "Bucovina Settentrionale e Hotin (Cern\u0103u\u021bi / \u010cernovcy \u2014 Annessione Giugno 1940)",
    russianName: "Chernovitskaya oblast (Jude\u021bul Cern\u0103u\u021bi)",
    adminTitle: "\u010cernovickij Oblispolkom (prima del 1940 Jude\u021bul Cern\u0103u\u021bi \u2014 Regno di Romania)",
    capital: "\u010cernovcy (Cern\u0103u\u021bi)",
    keys: ["adm1_ukr_89_chernivtsi_oblast", "cernui", "chernivtsi oblast", "chernivtsi_oblast", "chernovitskaya", "ernivci", "ernovcycernui", "judeul", "oblast", "sov_adm1_ukr_89_chernivtsi_oblast", "černovcy (cernăuți)"],
    notes: {
      s0: "Capoluogo storico della Bucovina Settentrionale (Cernăuți in romeno, Černovcy in russo, Czernowitz in tedesco e yiddish); nel 1936 è parte integrante e capoluogo di contea (Județul Cernăuți) del Regno di Romania sotto re Carlo II; splendida metropoli mitteleuropea con celebre università, vivace comunità ebraica, tedesca, ucraina e romena e la monumentale residenza metropolitana ortodossa.",
      s1: "Sotto il regime autoritario del re Carlo II di Romania, la regione subisce una rigida politica di romenizzazione e censura; le tensioni con l'URSS oltre il Dnestr rimangono latenti.",
      s2: "La Romania fortifica i confini orientali contro la minaccia bolscevica, mentre la popolazione ucraina locale guarda con speranza o timore agli sviluppi oltrefrontiera.",
      s3_4: "La Bucovina è inserita segretamente nel raggio d'interesse delle rivendicazioni sovietiche durante i colloqui preparatori con la Germania.",
      s5: "Nel Patto Molotov-Ribbentrop del 23 agosto 1939 l'URSS dichiara il proprio interesse per la Bessarabia; Mosca estende unilateralmente la rivendicazione alla Bucovina Settentrionale per ragioni di continuità etnica con gli ucraini.",
      s6: "Il 26-28 giugno 1940 l'URSS lancia un ultimatum perentorio alla Romania: l'Armata Rossa occupa Cernăuți e la Bucovina Settentrionale; il territorio viene annesso all'Unione Sovietica e incorporato il 2 agosto 1940 nella RSS Ucraina come Černovickaja Oblast' (Oblast di Černivci). La minoranza tedesca (Bukowinadeutsche) viene evacuata nel Terzo Reich.",
      s7: "L'NKVD avvia la collettivizzazione forzata, la nazionalizzazione delle proprietà e la deportazione in Siberia di migliaia di funzionari romeni, proprietari terrieri e commercianti ebrei.",
      s8: "Alla vigilia dell'attacco dell'Asse (Operazione München romeno-tedesca), Černivci è un presidio avanzato dell'Armata Rossa lungo la nuova frontiera con la Romania.",
    },
    getOwner: (step: number) => (step < 6 ? 'ROM' : 'SOV'),
    getFaction: (step: number) => (step < 6 ? 'Neutrale' : 'Comintern'),
    getHistoricalName: (step: number) => (step < 6 ? 'Bucovina Settentrionale (Cernăuți / Regatul României)' : 'Oblast di Cernovcy (Bucovina Settentrionale / RSS Ucraina)'),
    getAdminTitle: (step: number) => (step < 6 ? 'Județul Cernăuți — Regatul României' : 'Černovickij Oblastnoj Ispolkom — RSS Ucraina / URSS'),
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_90_Mykolaiv_Oblast": {
    id: "SOV_ADM1_UKR_90_Mykolaiv_Oblast",
    republic: "UKRAINE",
    modernName: "Oblast di Mykola\u00efv",
    historicalName: "Oblast di Nikolaev (Cantieri Navali Marti n. 198 sul Mar Nero)",
    russianName: "Nikolaevskaya oblast",
    adminTitle: "Nikolaevskij Oblispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Nikolaev",
    keys: ["adm1_ukr_90_mykolaiv_oblast", "mykolaiv oblast", "mykolaiv_oblast", "mykolav", "nikolaev", "nikolaevskaya", "oblast", "sov_adm1_ukr_90_mykolaiv_oblast"],
    notes: {
      s0: "Capitale della cantieristica navale della Russia meridionale alla confluenza del Bug Meridionale e del Dnepr sul Mar Nero; a Nikolaev opera il Cantiere Navale n. 198 (Marti) e il Cantiere n. 200 (61 Kommunara), gli unici cantieri navali dell'URSS dotati di scali inclinati giganti capaci di impostare navi da battaglia pesanti e incrociatori da 40.000 tonnellate.",
      s1: "Dure indagini dell'NKVD sui ritardi nei programmi navali d'altura di Stalin; arrestati e fucilati diversi ingegneri navali e progettisti di turbine a vapore.",
      s2: "Nel 1938-1939 a Nikolaev viene impostata sullo scalo 'O' del cantiere Marti la colossale corazzata Sovetskaja Ukraina (classe Sovetskij Sojuz da 65.000 tonnellate) e l'incrociatore pesante Frunze (classe Čapaev).",
      s3_4: "I cantieri di Nikolaev varano cacciatorpediniere conduttori classe 'Taškent' e sommergibili a grande autonomia per la Flotta del Mar Nero.",
      s5: "Durante la guerra europea i cantieri navali del Mar Nero lavorano a tappe forzate per dotare l'URSS di una flotta oceanica di superficie.",
      s6: "A Cherson vengono potenziati i bacini per chiatte fluviali e navi cisterna che trasportano i carichi di grano e petrolio attraverso il Dnepr.",
      s7: "Lo scafo corazzato della Sovetskaja Ukraina raggiunge il ponte principale al cantiere Marti, ma la carenza di piastre corazzate e turbine ne rallenta il completamento.",
      s8: "Nikolaev è il cuore pulsante delle ambizioni navali oceaniche di Stalin, pronto a difendere gli scali e i bacini di carenaggio contro la minaccia d'invasione.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Nikolaev (Cantieri Navali Marti n. 198 sul Mar Nero)",
    getAdminTitle: (_step: number) => "Nikolaevskij Oblispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_91_Autonomous_Republic_of_Crimea": {
    id: "SOV_ADM1_UKR_91_Autonomous_Republic_of_Crimea",
    republic: "UKRAINE",
    modernName: "Repubblica Autonoma di Crimea",
    historicalName: "RSSA di Crimea (Sinferopoli \u2014 Penisola Taurica)",
    russianName: "Krymskaya ASSR",
    adminTitle: "Sovet Narodnykh Komissarov Krymskoj ASSR \u2014 RSFSR (URSS)",
    capital: "Sinferopoli",
    keys: ["adm1_ukr_91_autonomous_republic_of_crimea", "autonoma", "autonomous republic of crimea", "autonomous_republic_of_crimea", "crimea", "krymskaya", "repubblica", "sinferopoli", "sov_adm1_ukr_91_autonomous_republic_of_crimea"],
    notes: {
      s0: "Penisola strategica nel Mar Nero e fortezza navale inespugnabile; Sebastopoli è la base principale della Flotta del Mar Nero, protetta da potenti batterie costiere corazzate (Batteria 30 'Maksim Gor'kij I' e Batteria 35); la RSSA di Crimea (con capitale Sinferopoli, facente parte della RSFSR fino al 1954) ospita le stazioni balneari di Jalta e il sanatorio di Livadija, vigneti, frutteti e la base pionieri di Artek.",
      s1: "Intensa ondata di epurazioni dell'NKVD contro la dirigenza tatara di Crimea e contro gli ammiragli della Flotta del Mar Nero accusati di spionaggio pro-britannico e filo-turco.",
      s2: "La Flotta del Mar Nero a Sebastopoli riceve le nuove navi da guerra e i bombardieri aerosiluranti dell'aviazione navale; ammodernamento delle difese aeree attorno alla baia.",
      s3_4: "Sebastopoli conduce grandi esercitazioni navali e da sbarco anfibio per il controllo degli accessi al Bosforo e al Danubio.",
      s5: "Durante la spartizione della Polonia e la guerra europea, la Crimea rimane in allerta navale per prevenire incursioni della flotta britannica o francese nel Mar Nero.",
      s6: "Nel giugno 1940 la Flotta del Mar Nero supporta l'ultimatum alla Romania per la cessione della Bessarabia con dimostrazioni navali al largo di Costanza e del delta del Danubio.",
      s7: "Rafforzamento dei campi minati navali, delle ostruzioni retali e delle batterie costiere attorno a Sebastopoli, Balaklava e Feodosija.",
      s8: "Alla vigilia del 22 giugno 1941, Sebastopoli sarà tra i primissimi bersagli colpiti alle ore 3:15 del mattino dai bombardieri della Luftwaffe con mine magnetiche marine paracadutate nella baia.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSSA di Crimea (Sinferopoli — Penisola Taurica)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Krymskoj ASSR — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_92_Vinnytsia_Oblast": {
    id: "SOV_ADM1_UKR_92_Vinnytsia_Oblast",
    republic: "UKRAINE",
    modernName: "Oblast di Vinnycja",
    historicalName: "Oblast di Vinnica (Podolia Sovietica \u2014 Fiume Bug Meridionale)",
    russianName: "Vinnitskaya oblast",
    adminTitle: "Vinnickij Oblispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Vinnycja",
    keys: ["adm1_ukr_92_vinnytsia_oblast", "oblast", "sov_adm1_ukr_92_vinnytsia_oblast", "vinnitskaya", "vinnycja", "vinnytsia oblast", "vinnytsia_oblast"],
    notes: {
      s0: "Cuore agricolo e storico dell'Ucraina; comprende le fertili terre nere della riva destra e sinistra del Dnepr, i campi storici della battaglia di Poltava del 1709, le antiche cattedrali di Černihiv, i grandi zuccherifici della Podolia a Vinnica, la fortezza di confine di Kam'janec'-Podil's'kyj e le fabbriche di macchine agricole Červona Zirka a Kirovo.",
      s1: "Le ferite della collettivizzazione e della carestia dei primi anni Trenta sono ancora vivide; l'NKVD esegue arresti di massa tra gli agronomi, i sacerdoti e i dirigenti di kolchoz accusati di 'nazionalismo ucraino'.",
      s2: "Ammodernamento della rete ferroviaria e stradale che collega Kiev a Leopoli e Odessa; sviluppo di fortificazioni confinarie a Korosten' e Novograd-Volynskij (Linea Stalin).",
      s3_4: "La fabbrica Červona Zirka e gli zuccherifici podolici consegnano quote record per l'approvvigionamento alimentare dell'Armata Rossa.",
      s5: "Nel settembre 1939 queste regioni fungono da retrovia immediata per l'avanzata delle armate sovietiche in Galizia e Volinia.",
      s6: "Con lo spostamento del confine sovietico centinaia di chilometri più a ovest (fino al fiume Bug), le vecchie fortificazioni della Linea Stalin vengono parzialmente disarmate a favore della nuova Linea Molotov.",
      s7: "I kolchoz ucraini operano a regime febbrile per riempire i silos statali di grano e barbabietole, garantendo le forniture pattuite con la Germania.",
      s8: "Alla vigilia del 22 giugno 1941, le fertili pianure ucraine si trovano direttamente sulla direttrice strategica dell'Heeresgruppe Süd della Wehrmacht.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Vinnica (Podolia Sovietica — Fiume Bug Meridionale)",
    getAdminTitle: (_step: number) => "Vinnickij Oblispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_93_Khmelnytskyi_Oblast": {
    id: "SOV_ADM1_UKR_93_Khmelnytskyi_Oblast",
    republic: "UKRAINE",
    modernName: "Oblast di Chmel'nyc'kyj",
    historicalName: "Oblast di Kam'janec'-Podil's'kyj (Fortezza sul Fiume Smotry\u010d \u2014 Vecchio Confine)",
    russianName: "Kamenets-Podol'skaya oblast",
    adminTitle: "Kamenec-Podol'skij Oblispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Kam'janec'-Podil's'kyj",
    keys: ["adm1_ukr_93_khmelnytskyi_oblast", "chmelnyckyj", "kam'janec'-podil's'kyj", "kamenetspodolskaya", "kamjanecpodilskyj", "khmelnytskyi oblast", "khmelnytskyi_oblast", "oblast", "sov_adm1_ukr_93_khmelnytskyi_oblast"],
    notes: {
      s0: "Cuore agricolo e storico dell'Ucraina; comprende le fertili terre nere della riva destra e sinistra del Dnepr, i campi storici della battaglia di Poltava del 1709, le antiche cattedrali di Černihiv, i grandi zuccherifici della Podolia a Vinnica, la fortezza di confine di Kam'janec'-Podil's'kyj e le fabbriche di macchine agricole Červona Zirka a Kirovo.",
      s1: "Le ferite della collettivizzazione e della carestia dei primi anni Trenta sono ancora vivide; l'NKVD esegue arresti di massa tra gli agronomi, i sacerdoti e i dirigenti di kolchoz accusati di 'nazionalismo ucraino'.",
      s2: "Ammodernamento della rete ferroviaria e stradale che collega Kiev a Leopoli e Odessa; sviluppo di fortificazioni confinarie a Korosten' e Novograd-Volynskij (Linea Stalin).",
      s3_4: "La fabbrica Červona Zirka e gli zuccherifici podolici consegnano quote record per l'approvvigionamento alimentare dell'Armata Rossa.",
      s5: "Nel settembre 1939 queste regioni fungono da retrovia immediata per l'avanzata delle armate sovietiche in Galizia e Volinia.",
      s6: "Con lo spostamento del confine sovietico centinaia di chilometri più a ovest (fino al fiume Bug), le vecchie fortificazioni della Linea Stalin vengono parzialmente disarmate a favore della nuova Linea Molotov.",
      s7: "I kolchoz ucraini operano a regime febbrile per riempire i silos statali di grano e barbabietole, garantendo le forniture pattuite con la Germania.",
      s8: "Alla vigilia del 22 giugno 1941, le fertili pianure ucraine si trovano direttamente sulla direttrice strategica dell'Heeresgruppe Süd della Wehrmacht.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Kam'janec'-Podil's'kyj (Fortezza sul Fiume Smotryč — Vecchio Confine)",
    getAdminTitle: (_step: number) => "Kamenec-Podol'skij Oblispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_94_Cherkasy_Oblast": {
    id: "SOV_ADM1_UKR_94_Cherkasy_Oblast",
    republic: "UKRAINE",
    modernName: "Oblast di \u010cerkasy",
    historicalName: "Distretto di \u010cerkasy (Medio Dnepr \u2014 Terra di Taras \u0160ev\u010denko)",
    russianName: "Cherkasskij okrug \u2014 Kievskaya oblast",
    adminTitle: "\u010cerkasskij Gorsovet \u2014 RSS Ucraina (URSS)",
    capital: "\u010cerkasy",
    keys: ["adm1_ukr_94_cherkasy_oblast", "cherkasskij", "cherkasy oblast", "cherkasy_oblast", "erkasy", "kievskaya", "oblast", "okrug", "sov_adm1_ukr_94_cherkasy_oblast", "čerkasy"],
    notes: {
      s0: "Cuore agricolo e storico dell'Ucraina; comprende le fertili terre nere della riva destra e sinistra del Dnepr, i campi storici della battaglia di Poltava del 1709, le antiche cattedrali di Černihiv, i grandi zuccherifici della Podolia a Vinnica, la fortezza di confine di Kam'janec'-Podil's'kyj e le fabbriche di macchine agricole Červona Zirka a Kirovo.",
      s1: "Le ferite della collettivizzazione e della carestia dei primi anni Trenta sono ancora vivide; l'NKVD esegue arresti di massa tra gli agronomi, i sacerdoti e i dirigenti di kolchoz accusati di 'nazionalismo ucraino'.",
      s2: "Ammodernamento della rete ferroviaria e stradale che collega Kiev a Leopoli e Odessa; sviluppo di fortificazioni confinarie a Korosten' e Novograd-Volynskij (Linea Stalin).",
      s3_4: "La fabbrica Červona Zirka e gli zuccherifici podolici consegnano quote record per l'approvvigionamento alimentare dell'Armata Rossa.",
      s5: "Nel settembre 1939 queste regioni fungono da retrovia immediata per l'avanzata delle armate sovietiche in Galizia e Volinia.",
      s6: "Con lo spostamento del confine sovietico centinaia di chilometri più a ovest (fino al fiume Bug), le vecchie fortificazioni della Linea Stalin vengono parzialmente disarmate a favore della nuova Linea Molotov.",
      s7: "I kolchoz ucraini operano a regime febbrile per riempire i silos statali di grano e barbabietole, garantendo le forniture pattuite con la Germania.",
      s8: "Alla vigilia del 22 giugno 1941, le fertili pianure ucraine si trovano direttamente sulla direttrice strategica dell'Heeresgruppe Süd della Wehrmacht.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Distretto di Čerkasy (Medio Dnepr — Terra di Taras Ševčenko)",
    getAdminTitle: (_step: number) => "Čerkasskij Gorsovet — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_95_Poltava_Oblast": {
    id: "SOV_ADM1_UKR_95_Poltava_Oblast",
    republic: "UKRAINE",
    modernName: "Oblast di Poltava",
    historicalName: "Oblast di Poltava (Campo della Battaglia Storica \u2014 Terre del Vorskla)",
    russianName: "Poltavskaya oblast",
    adminTitle: "Poltavskij Oblispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Poltava",
    keys: ["adm1_ukr_95_poltava_oblast", "oblast", "poltava", "poltava oblast", "poltava_oblast", "poltavskaya", "sov_adm1_ukr_95_poltava_oblast"],
    notes: {
      s0: "Cuore agricolo e storico dell'Ucraina; comprende le fertili terre nere della riva destra e sinistra del Dnepr, i campi storici della battaglia di Poltava del 1709, le antiche cattedrali di Černihiv, i grandi zuccherifici della Podolia a Vinnica, la fortezza di confine di Kam'janec'-Podil's'kyj e le fabbriche di macchine agricole Červona Zirka a Kirovo.",
      s1: "Le ferite della collettivizzazione e della carestia dei primi anni Trenta sono ancora vivide; l'NKVD esegue arresti di massa tra gli agronomi, i sacerdoti e i dirigenti di kolchoz accusati di 'nazionalismo ucraino'.",
      s2: "Ammodernamento della rete ferroviaria e stradale che collega Kiev a Leopoli e Odessa; sviluppo di fortificazioni confinarie a Korosten' e Novograd-Volynskij (Linea Stalin).",
      s3_4: "La fabbrica Červona Zirka e gli zuccherifici podolici consegnano quote record per l'approvvigionamento alimentare dell'Armata Rossa.",
      s5: "Nel settembre 1939 queste regioni fungono da retrovia immediata per l'avanzata delle armate sovietiche in Galizia e Volinia.",
      s6: "Con lo spostamento del confine sovietico centinaia di chilometri più a ovest (fino al fiume Bug), le vecchie fortificazioni della Linea Stalin vengono parzialmente disarmate a favore della nuova Linea Molotov.",
      s7: "I kolchoz ucraini operano a regime febbrile per riempire i silos statali di grano e barbabietole, garantendo le forniture pattuite con la Germania.",
      s8: "Alla vigilia del 22 giugno 1941, le fertili pianure ucraine si trovano direttamente sulla direttrice strategica dell'Heeresgruppe Süd della Wehrmacht.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Poltava (Campo della Battaglia Storica — Terre del Vorskla)",
    getAdminTitle: (_step: number) => "Poltavskij Oblispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_96_Dnipropetrovsk_Oblast": {
    id: "SOV_ADM1_UKR_96_Dnipropetrovsk_Oblast",
    republic: "UKRAINE",
    modernName: "Oblast di Dnipropetrovs'k",
    historicalName: "Oblast di Dnepropetrovsk (Acciaierie Petrovskij e Ferro di Krivoj Rog)",
    russianName: "Dnepropetrovskaya oblast",
    adminTitle: "Dnepropetrovskij Oblispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Dnepropetrovsk",
    keys: ["adm1_ukr_96_dnipropetrovsk_oblast", "dnepropetrovsk", "dnepropetrovskaya", "dnipropetrovsk", "dnipropetrovsk oblast", "dnipropetrovsk_oblast", "oblast", "sov_adm1_ukr_96_dnipropetrovsk_oblast"],
    notes: {
      s0: "Polo colossale dell'energia e della metallurgia pesante sul fiume Dnepr; a Zaporož'e troneggia la Centrale Idroelettrica DneproGES (inaugurata nel 1932, all'epoca la più potente del mondo), che alimenta il combinato siderurgico Zaporostal' (specializzato in lamiere sottili per carrozzerie e corazze) e la fabbrica di alluminio Dneprovskij; a Dnepropetrovsk operano gli storici altiforni Petrovskij e il vicino bacino di minerale ferroso di Krivoj Rog.",
      s1: "Le purghe staliniane colpiscono pesantemente i tecnici e gli ingegneri idroelettrici di DneproGES e i dirigenti di Krivoj Rog accusati di legami con il 'centro trotskista clandestino'.",
      s2: "DneproGES raggiunge la piena potenza erogando oltre 560 MW, rendendo navigabili le storiche rapide del Dnepr (Porogi) sommerse dal bacino artificiale.",
      s3_4: "Zaporostal' brevetta la laminazione continua a freddo dell'acciaio speciale per la costruzione di scafi di carri armati e aerei.",
      s5: "L'energia di DneproGES e l'acciaio del Dnepr garantiscono forniture ininterrotte all'industria bellica sovietica mobilitata per le campagne del 1939-1940.",
      s6: "Nel 1940 Krivoj Rog estrae oltre 18 milioni di tonnellate di minerale di ferro, fornendo il 60% della materia prima ferrosa per tutti gli altiforni dell'URSS.",
      s7: "Vengono predisposte cariche esplosive sotterranee nei piloni della diga di DneproGES da parte dei reparti genieri dell'Armata Rossa per farla brillare in caso di ritirata estrema.",
      s8: "Alla vigilia di Barbarossa, l'ansa del Dnepr tra Dnepropetrovsk e Zaporož'e è il sancta sanctorum dell'energia e dell'acciaio sovietico.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Dnepropetrovsk (Acciaierie Petrovskij e Ferro di Krivoj Rog)",
    getAdminTitle: (_step: number) => "Dnepropetrovskij Oblispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_97_Kirovohrad_Oblast": {
    id: "SOV_ADM1_UKR_97_Kirovohrad_Oblast",
    republic: "UKRAINE",
    modernName: "Oblast di Kirovohrad",
    historicalName: "Oblast di Kirovo (Kirovograd \u2014 Fabbrica Macchine Agricole \u010cervona Zirka)",
    russianName: "Kirovogradskaya oblast",
    adminTitle: "Kirovogradskij Oblispolkom \u2014 RSS Ucraina (URSS)",
    capital: "Kirovo (Kirovograd)",
    keys: ["adm1_ukr_97_kirovohrad_oblast", "kirovo (kirovograd)", "kirovogradskaya", "kirovohrad", "kirovohrad oblast", "kirovohrad_oblast", "kirovokirovograd", "oblast", "sov_adm1_ukr_97_kirovohrad_oblast"],
    notes: {
      s0: "Cuore agricolo e storico dell'Ucraina; comprende le fertili terre nere della riva destra e sinistra del Dnepr, i campi storici della battaglia di Poltava del 1709, le antiche cattedrali di Černihiv, i grandi zuccherifici della Podolia a Vinnica, la fortezza di confine di Kam'janec'-Podil's'kyj e le fabbriche di macchine agricole Červona Zirka a Kirovo.",
      s1: "Le ferite della collettivizzazione e della carestia dei primi anni Trenta sono ancora vivide; l'NKVD esegue arresti di massa tra gli agronomi, i sacerdoti e i dirigenti di kolchoz accusati di 'nazionalismo ucraino'.",
      s2: "Ammodernamento della rete ferroviaria e stradale che collega Kiev a Leopoli e Odessa; sviluppo di fortificazioni confinarie a Korosten' e Novograd-Volynskij (Linea Stalin).",
      s3_4: "La fabbrica Červona Zirka e gli zuccherifici podolici consegnano quote record per l'approvvigionamento alimentare dell'Armata Rossa.",
      s5: "Nel settembre 1939 queste regioni fungono da retrovia immediata per l'avanzata delle armate sovietiche in Galizia e Volinia.",
      s6: "Con lo spostamento del confine sovietico centinaia di chilometri più a ovest (fino al fiume Bug), le vecchie fortificazioni della Linea Stalin vengono parzialmente disarmate a favore della nuova Linea Molotov.",
      s7: "I kolchoz ucraini operano a regime febbrile per riempire i silos statali di grano e barbabietole, garantendo le forniture pattuite con la Germania.",
      s8: "Alla vigilia del 22 giugno 1941, le fertili pianure ucraine si trovano direttamente sulla direttrice strategica dell'Heeresgruppe Süd della Wehrmacht.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Kirovo (Kirovograd — Fabbrica Macchine Agricole Červona Zirka)",
    getAdminTitle: (_step: number) => "Kirovogradskij Oblispolkom — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_98_Kyiv": {
    id: "SOV_ADM1_UKR_98_Kyiv",
    republic: "UKRAINE",
    modernName: "Kiev (Citt\u00e0 Capitale)",
    historicalName: "Kiev (Ky\u00efv \u2014 Capitale della RSS Ucraina sul Fiume Dnepr)",
    russianName: "Gorod Kiev (Ky\u00efv)",
    adminTitle: "Kievskij Gorsovet & Distretto Militare di Kiev (KOVO) \u2014 RSS Ucraina (URSS)",
    capital: "Kiev",
    keys: ["adm1_ukr_98_kyiv", "capitale", "gorod", "kiev", "kyiv", "sov_adm1_ukr_98_kyiv"],
    notes: {
      s0: "Capitale della Repubblica Socialista Sovietica Ucraina dal 1934 (quando le funzioni governative furono trasferite da Charkiv), adagiata sulle colline del maestoso fiume Dnepr; sede del Comitato Centrale del Partito Comunista dell'Ucraina (guidato da Stanislav Kosior) e del quartier generale del potentissimo Distretto Militare di Kiev (KOVO), comandato dal generale Iona Jakir. Nel 1936 vengono ampliate le officine ferroviarie di Darnytsja e la fabbrica Arsenal.",
      s1: "Le Grandi Purghe colpiscono con ferocia inaudita l'Ucraina: Iona Jakir viene arrestato e fucilato insieme a Tuchačevskij a Mosca; Kosior e gran parte del governo ucraino vengono eliminati dall'NKVD; nel gennaio 1938 Stalin invia Nikita Chruščëv come Primo Segretario del partito a Kiev per completare la 'pulizia' politica.",
      s2: "Chruščëv e il nuovo comandante militare Semën Timošenko riorganizzano il Distretto Militare di Kiev, accelerando la costruzione del Settore Fortificato di Kiev (KiUR - Kievskij Ukreplënnyj Rajon) lungo il fiume Irpin' con centinaia di bunker in cemento armato (DOT).",
      s3_4: "La fabbrica Arsenal e gli impianti di Kiev intensificano la produzione di apparecchiature ottiche militari, ponti di barche e telai d'artiglieria per le armate di prima linea.",
      s5: "Il 17 settembre 1939 dal quartier generale avanzato del KOVO parte l'ordine di attacco per la campagna della Polonia orientale: le armate del fronte ucraino occupano la Galizia e la Volinia (Leopoli, Stanislav, Tarnopol). Kiev accoglie con grandi parate le truppe reduci dalla vittoria.",
      s6: "Nel giugno 1940 il generale Georgij Žukov assume il comando del Distretto Militare di Kiev; Kiev coordina l'operazione militare per l'occupazione e l'annessione della Bessarabia e della Bucovina Settentrionale dalla Romania.",
      s7: "Žukov conduce colossali manovre sul terreno con simulazioni al computer cartografico che evidenziano i pericoli di sfondamento tedesco; nel gennaio 1941 Žukov viene promosso Capo di Stato Maggiore Generale a Mosca e il comando a Kiev passa al generale Michail Kirponos.",
      s8: "Alla vigilia del 22 giugno 1941, Kiev è difesa dalle migliori divisioni corazzate e meccanizzate dell'Armata Rossa, schierate lungo la frontiera occidentale sotto la guida di Kirponos, destinate entro poche settimane a essere coinvolte nella titanica sacca della Battaglia di Kiev.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Kiev (Kyïv — Capitale della RSS Ucraina sul Fiume Dnepr)",
    getAdminTitle: (_step: number) => "Kievskij Gorsovet & Distretto Militare di Kiev (KOVO) — RSS Ucraina (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UKR_99_Sevastopol": {
    id: "SOV_ADM1_UKR_99_Sevastopol",
    republic: "UKRAINE",
    modernName: "Sebastopoli (Citt\u00e0 Federale)",
    historicalName: "Sebastopoli (Piazzaforte e Base Principale della Flotta del Mar Nero)",
    russianName: "Gorod Sevastopol'",
    adminTitle: "Sevastopol'skij Gorsovet & Comando Flotta del Mar Nero \u2014 RSFSR/URSS",
    capital: "Sebastopoli",
    keys: ["adm1_ukr_99_sevastopol", "gorod", "sebastopoli", "sevastopol", "sov_adm1_ukr_99_sevastopol"],
    notes: {
      s0: "Penisola strategica nel Mar Nero e fortezza navale inespugnabile; Sebastopoli è la base principale della Flotta del Mar Nero, protetta da potenti batterie costiere corazzate (Batteria 30 'Maksim Gor'kij I' e Batteria 35); la RSSA di Crimea (con capitale Sinferopoli, facente parte della RSFSR fino al 1954) ospita le stazioni balneari di Jalta e il sanatorio di Livadija, vigneti, frutteti e la base pionieri di Artek.",
      s1: "Intensa ondata di epurazioni dell'NKVD contro la dirigenza tatara di Crimea e contro gli ammiragli della Flotta del Mar Nero accusati di spionaggio pro-britannico e filo-turco.",
      s2: "La Flotta del Mar Nero a Sebastopoli riceve le nuove navi da guerra e i bombardieri aerosiluranti dell'aviazione navale; ammodernamento delle difese aeree attorno alla baia.",
      s3_4: "Sebastopoli conduce grandi esercitazioni navali e da sbarco anfibio per il controllo degli accessi al Bosforo e al Danubio.",
      s5: "Durante la spartizione della Polonia e la guerra europea, la Crimea rimane in allerta navale per prevenire incursioni della flotta britannica o francese nel Mar Nero.",
      s6: "Nel giugno 1940 la Flotta del Mar Nero supporta l'ultimatum alla Romania per la cessione della Bessarabia con dimostrazioni navali al largo di Costanza e del delta del Danubio.",
      s7: "Rafforzamento dei campi minati navali, delle ostruzioni retali e delle batterie costiere attorno a Sebastopoli, Balaklava e Feodosija.",
      s8: "Alla vigilia del 22 giugno 1941, Sebastopoli sarà tra i primissimi bersagli colpiti alle ore 3:15 del mattino dai bombardieri della Luftwaffe con mine magnetiche marine paracadutate nella baia.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Sebastopoli (Piazzaforte e Base Principale della Flotta del Mar Nero)",
    getAdminTitle: (_step: number) => "Sevastopol'skij Gorsovet & Comando Flotta del Mar Nero — RSFSR/URSS",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UZB_146_Andijan_Region": {
    id: "SOV_ADM1_UZB_146_Andijan_Region",
    republic: "RSS Uzbeka",
    modernName: "Regione di Andijan",
    historicalName: "Oblast di Andijan",
    russianName: "Andi\u017eanskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Conca Orientale di Fergana e Cotone",
    capital: "Andijan",
    keys: ["adm1_uzb_146_andijan_region", "andianskaja", "andijan", "andijan region", "andijan_region", "oblast", "sov_adm1_uzb_146_andijan_region"],
    notes: {
      s0: "Situata nella fertile conca orientale della Valle di Fergana, Andijan è una delle aree a più alta densità abitativa dell'Asia Centrale, interamente votata alla monocoltura del cotone per rifornire i lanifici e le fabbriche tessili di Mosca e Ivanovo.",
      s1: "Nel 1938, l'ondata di arresti dell'NKVD investe i dirigenti uzbeki locali, accusati di nazionalismo pan-turco e sabotaggio delle quote obbligatorie di consegna del cotone grezzo.",
      s2: "Nell'autunno 1938, la raccolta del cotone mobilita l'intera popolazione cittadina, studenti e colcosiani sotto rigida disciplina paramilitare per raggiungere gli obiettivi del piano.",
      s3_4: "Nell'estate 1939, Andijan partecipa con centomila lavoratori all'epica costruzione del Grande Canale di Fergana, completato a tempo di record in 45 giorni con metodi di lavoro manuale di massa (khashar).",
      s5: "Tra il 1939 e l'inizio del 1940, le acque irrigue del nuovo canale aumentano esponenzialmente le rese cotoniere, assicurando all'Armata Rossa cellulosa indispensabile per polveri da sparo e uniformi.",
      s6: "Nell'estate 1940, l'area consolida anche la produzione di seta grezza, frutta secca e riso per le razioni dell'esercito sovietico.",
      s7: "Nel tardo 1940, le officine meccaniche di sgranatura del cotone di Andijan vengono affiancate da impianti per la produzione di parti di ricambio per motori diesel.",
      s8: "Nella primavera 1941, Andijan completa la semina del cotone con mobilitazione patriottica, mentre le reclute locali partono per i distretti militari occidentali.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Andijan",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Conca Orientale di Fergana e Cotone",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UZB_147_Namangan_Region": {
    id: "SOV_ADM1_UZB_147_Namangan_Region",
    republic: "RSS Uzbeka",
    modernName: "Regione di Namangan",
    historicalName: "Oblast di Namangan",
    russianName: "Namanganskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Sponda Destra del Syr Darya e Seta Tradizionale",
    capital: "Namangan",
    keys: ["adm1_uzb_147_namangan_region", "namangan", "namangan region", "namangan_region", "namanganskaja", "oblast", "sov_adm1_uzb_147_namangan_region"],
    notes: {
      s0: "Adagiata sulla riva destra del Syr Darya nella parte settentrionale della Valle di Fergana, Namangan è un centro millenario di artigiani, filatori di seta e colcos cotoniere d'eccellenza.",
      s1: "Nel 1938, la campagna antireligiosa e le purghe del partito portano alla chiusura delle storiche madrase e all'arresto dei quadri tradizionali locali accusati di opposizione alla collettivizzazione.",
      s2: "Nell'autunno 1938, gli stabilimenti di sgranatura e filatura di Namangan lavorano a pieno ritmo per rifornire l'industria leggera di Leningrado e Vladimir.",
      s3_4: "Nel 1939, decine di migliaia di colcosiani di Namangan scavano a mano il tratto settentrionale del Grande Canale di Fergana, celebrato dalla propaganda sovietica come vittoria trionfale del socialismo.",
      s5: "Durante l'inverno 1939-1940, la città fornisce quintali di seta per la fabbricazione dei paracadute delle truppe d'assalto aereo (VDV) sovietiche.",
      s6: "Nell'estate 1940, la piena entrata in funzione della rete irrigua porta a un raccolto record di cotone a fibra fine.",
      s7: "Nel tardo 1940, vengono allestiti nuovi laboratori artigianali e manifatture per la produzione di calzature e gualdrappe per l'Armata Rossa.",
      s8: "Nella primavera 1941, Namangan prepara le scorte stagionali di cibo e manufatti tessili prima che la tempesta della guerra colpisca l'Unione Sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Namangan",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Sponda Destra del Syr Darya e Seta Tradizionale",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UZB_148_Fergana_Region": {
    id: "SOV_ADM1_UZB_148_Fergana_Region",
    republic: "RSS Uzbeka",
    modernName: "Regione di Fergana",
    historicalName: "Oblast di Fergana",
    russianName: "Ferganskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Industria Tessile, Canale Stalin e \u0160orsu",
    capital: "Fergana",
    keys: ["adm1_uzb_148_fergana_region", "fergana", "fergana region", "fergana_region", "ferganskaja", "oblast", "sov_adm1_uzb_148_fergana_region"],
    notes: {
      s0: "Fondata dai russi con il nome di Novyj Margelan (poi Skobelev, ribattezzata Fergana nel 1924), la città è il centro amministrativo e industriale della valle, affiancata dai giacimenti petroliferi di Šorsu e Čimion.",
      s1: "Nel 1938, l'apparato repressivo dell'NKVD colpisce sia le maestranze industriali russe sia i comitati uzbeki locali, accusati di sabotare la produzione petrolifera e tessile.",
      s2: "Nell'autunno 1938, le raffinerie e gli stabilimenti tessili di Fergana incrementano la produzione per sostenere i fabbisogni crescenti delle forze armate sovietiche.",
      s3_4: "Nell'estate 1939, Fergana è l'epicentro della mobilitazione per la costruzione del Grande Canale di Fergana intitolato a Stalin, inaugurato con grandiose cerimonie alla presenza dei leader del partito.",
      s5: "Tra l'inverno 1939 e il 1940, i derivati del petrolio di Šorsu (zolfo e lubrificanti) alimentano l'industria chimica militare dell'Asia Centrale.",
      s6: "Nell'estate 1940, la produzione tessile di Fergana e Margilan fornisce milioni di metri di tessuto mimetico e tela per tende all'Armata Rossa.",
      s7: "Nel tardo 1940, vengono rafforzate le difese dei pozzi petroliferi e delle centrali idroelettriche montane della regione.",
      s8: "Nell'aprile 1941, la regione di Fergana è il pilastro economico dell'Uzbekistan orientale, pronta a fungere da riserva strategica per la madrepatria sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Fergana",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Industria Tessile, Canale Stalin e Šorsu",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UZB_149_Republic_of_Karakalpakstan": {
    id: "SOV_ADM1_UZB_149_Republic_of_Karakalpakstan",
    republic: "RSSA Karakalpaka (RSS Uzbeka)",
    modernName: "Repubblica di Karakalpakstan",
    historicalName: "RSSA Karakalpaka (Nukus)",
    russianName: "Karakalpakskaja ASSR",
    adminTitle: "Prezidium Verchovnogo Soveta Karakalpakskoj ASSR \u2014 Delta dell'Amu Darya e Aral",
    capital: "Nukus",
    keys: ["adm1_uzb_149_republic_of_karakalpakstan", "karakalpakskaja", "karakalpakstan", "nukus", "repubblica", "republic of karakalpakstan", "republic_of_karakalpakstan", "sov_adm1_uzb_149_republic_of_karakalpakstan"],
    notes: {
      s0: "Trasferita dalla RSFSR alla RSS Uzbeka con la Costituzione del 1936, la Repubblica Socialista Sovietica Autonoma Karakalpaka (capitale Nukus) si estende sul vasto delta paludoso dell'Amu Darya e lungo le coste meridionali del Lago d'Aral, dominata da pesca, canneti e cotone.",
      s1: "Nel 1938, la dirigenza caracalpaca subisce pesanti epurazioni con accuse di separatismo nazionalista e cospirazione contro l'unione dei popoli sovietici.",
      s2: "Nell'autunno 1938, la flotta peschereccia dell'Aral a Muynak produce enormi quantitativi di pesce conservato essiccato e in scatola destinati ai magazzini militari dell'URSS.",
      s3_4: "Nel 1939, la costruzione di nuovi canali di derivazione nel delta dell'Amu Darya bonifica migliaia di ettari di canneti, convertiti a piantagioni di cotone e riso.",
      s5: "Tra l'inverno 1939 e il 1940, la regione di Nukus rifornisce la marina e l'esercito con conserve di pesce dell'Aral, resistendo all'isolamento climatico invernale.",
      s6: "Nell'estate 1940, iniziano i primi rilievi topografici e biologici militari segreti sulle isole isolate dell'Aral (tra cui l'Isola della Rinascita / Vozroždenija).",
      s7: "Nel tardo 1940, il porto di Muynak viene potenziato come snodo di trasbordo per le rotte fluviali dell'Amu Darya verso l'interno dell'Asia Centrale.",
      s8: "Nella primavera 1941, la RSSA Karakalpaka mantiene la sua silenziosa ma vitale produzione ittica e agricola a sostegno della sicurezza alimentare sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "RSSA Karakalpaka (Nukus)",
    getAdminTitle: (_step: number) => "Prezidium Verchovnogo Soveta Karakalpakskoj ASSR — Delta dell'Amu Darya e Aral",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UZB_150_Xorazm_Region": {
    id: "SOV_ADM1_UZB_150_Xorazm_Region",
    republic: "RSS Uzbeka",
    modernName: "Regione di Khorezm",
    historicalName: "Oblast di Corasmia (Urgench e Khiva)",
    russianName: "Chorezmskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Antica Oasi di Khiva e Cotone dell'Amu Darya",
    capital: "Urgench",
    keys: ["adm1_uzb_150_xorazm_region", "chorezmskaja", "khorezm", "oblast", "sov_adm1_uzb_150_xorazm_region", "urgench", "xorazm region", "xorazm_region"],
    notes: {
      s0: "L'Oblast di Corasmia (capoluogo Urgench, custode della città-museo millenaria di Khiva) è un'oasi fluviale isolata circondata dai deserti del Karakum e Kyzylkum, celebre per il cotone pregiato, i meloni e la tessitura di tappeti.",
      s1: "Nel 1938, gli intellettuali khorezmiani e gli storici custodi del patrimonio islamico di Khiva vengono perseguitati dall'NKVD, mentre la città storica viene laicizzata e posta sotto tutela museale statale.",
      s2: "Nell'autunno 1938, la flotta fluviale dell'Amu Darya assicura il collegamento logistico continuo tra la Corasmia, Čardžou e il Lago d'Aral.",
      s3_4: "Nel 1939, viene ampliata la rete di canalizzazioni tradizionali con l'introduzione di pompe idrauliche sovietiche per moltiplicare le superfici a cotone.",
      s5: "Durante l'inverno 1939-1940, le eccedenze di cotone grezzo e grano di Corasmia vengono spedite via chiatta e ferrovia verso i magazzini industriali di Taškent.",
      s6: "Nell'estate 1940, l'oasi festeggia il superamento dei piani di consegna del cotone a fibra lunga, indispensabile per la tessitura di tele tecniche per l'aviazione.",
      s7: "Nel tardo 1940, vengono completati nuovi argini protettivi sull'Amu Darya per scongiurare le disastrose piene alluvionali primaverili.",
      s8: "Nella primavera 1941, i canali della Corasmia operano a pieno regime per la stagione irrigua, mentre le reclute khorezmiate si arruolano nelle file dell'Armata Rossa.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Corasmia (Urgench e Khiva)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Antica Oasi di Khiva e Cotone dell'Amu Darya",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UZB_151_Navoiy_Region": {
    id: "SOV_ADM1_UZB_151_Navoiy_Region",
    republic: "RSS Uzbeka",
    modernName: "Regione di Navoiy",
    historicalName: "Distretto di Kermine e Kyzylkum",
    russianName: "Kermininskij Okrug",
    adminTitle: "Okru\u017enoj Ispolkom \u2014 Pascoli Karakul del Kyzylkum e Oasi di Nurata",
    capital: "Kermine",
    keys: ["adm1_uzb_151_navoiy_region", "kermine", "kermininskij", "navoiy", "navoiy region", "navoiy_region", "okrug", "sov_adm1_uzb_151_navoiy_region"],
    notes: {
      s0: "Storicamente imperniata sulla cittadina oasi di Kermine (poi rinominata Navoiy in epoca post-bellica) e sull'immenso entroterra desertico del Kyzylkum, la regione è rinomata per l'allevamento della pecora karakul (pellicce astrakan) e per le oasi montane di Nurata.",
      s1: "Nel 1938, le cooperative di allevatori del Kyzylkum vengono sottoposte a verifiche dell'NKVD per reprimere il contrabbando transfrontaliero di pelli karakul, fonte preziosa di valuta pregiata per lo Stato sovietico.",
      s2: "Nell'autunno 1938, la ferrovia Transcaspica che attraversa Kermine convoglia carichi di zolfo, pelli e cotone verso Samarcanda e Taškent.",
      s3_4: "Nel 1939, prime missioni geologiche sovietiche esplorano le catene desertiche di Muruntau e Nurata, dove nei decenni successivi verrà scoperta la più grande miniera d'oro a cielo aperto del pianeta.",
      s5: "Tra l'inverno 1939 e il 1940, le forniture di pellicce di karakul e lana della steppa riforniscono le sartorie militari sovietiche per cappotti e colbacchi invernali.",
      s6: "Nell'estate 1940, vengono scavati nuovi pozzi artesiani nel deserto per sostenere l'espansione del patrimonio ovino e caprino di Stato.",
      s7: "Nel tardo 1940, Kermine rafforza le sue stazioni di pompaggio idrico lungo il fiume Zeravshan per prevenire siccità nei distretti a valle.",
      s8: "Nell'aprile 1941, l'oasi mantiene la produzione zootecnica e carovaniera a supporto delle retrovie dell'Asia Centrale sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Distretto di Kermine e Kyzylkum",
    getAdminTitle: (_step: number) => "Okružnoj Ispolkom — Pascoli Karakul del Kyzylkum e Oasi di Nurata",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UZB_152_Surxondaryo_Region": {
    id: "SOV_ADM1_UZB_152_Surxondaryo_Region",
    republic: "RSS Uzbeka",
    modernName: "Regione di Surkhandarya",
    historicalName: "Oblast di Surkhandarya (Termez)",
    russianName: "Surchandar'inskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Fortezza Confinaria di Termez e Cotone Subtropicale",
    capital: "Termez",
    keys: ["adm1_uzb_152_surxondaryo_region", "oblast", "sov_adm1_uzb_152_surxondaryo_region", "surchandarinskaja", "surkhandarya", "surxondaryo region", "surxondaryo_region", "termez"],
    notes: {
      s0: "All'estremo sud dell'Uzbekistan, l'Oblast di Surkhandarya (capoluogo la storica città-fortezza di Termez sull'Amu Darya) è la sentinella meridionale dell'URSS affacciata sul Regno dell'Afghanistan, favorita da un clima quasi subtropicale ideale per il cotone a fibra finissima.",
      s1: "Nel 1938, le truppe di frontiera dell'NKVD a Termez sono in stato di massima allerta per sventare infiltrazioni di spie britanniche e guerriglieri basmaci operanti dalle montagne del nord afghano.",
      s2: "Nell'autunno 1938, il porto fluviale di Termez sull'Amu Darya gestisce gli scambi commerciali regolamentati con l'Afghanistan e il pattugliamento delle imbarcazioni armate sovietiche.",
      s3_4: "Nel 1939, vengono potenziate le fortificazioni confinarie e le piste d'atterraggio per i caccia da ricognizione dell'Armata Rossa a presidio della frontiera meridionale.",
      s5: "Durante l'inverno 1939-1940, i raccolti di cotone a fibra finissima di Surkhandarya vengono inviati con scorta speciale alle industrie chimiche militari della Russia centrale.",
      s6: "Nell'estate 1940, l'apertura di nuovi canali d'irrigazione dal fiume Surkhandarya estende la coltivazione di canna da zucchero, fichi e cotone egiziano.",
      s7: "Nel tardo 1940, la guarnigione militare di Termez viene rinforzata con unità d'artiglieria e reparti di cavalleria da montagna.",
      s8: "Nella primavera 1941, la frontiera afghana a Termez rimane rigidamente sigillata e tranquilla, permettendo all'URSS di concentrare l'attenzione strategica sul confine occidentale.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Surkhandarya (Termez)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Fortezza Confinaria di Termez e Cotone Subtropicale",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UZB_153_Samarqand_Region": {
    id: "SOV_ADM1_UZB_153_Samarqand_Region",
    republic: "RSS Uzbeka",
    modernName: "Regione di Samarcanda",
    historicalName: "Oblast di Samarcanda",
    russianName: "Samarkandskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Valle dello Zeravshan, Seta e Monumenti Timuridi",
    capital: "Samarcanda",
    keys: ["adm1_uzb_153_samarqand_region", "oblast", "samarcanda", "samarkandskaja", "samarqand region", "samarqand_region", "sov_adm1_uzb_153_samarqand_region"],
    notes: {
      s0: "Fino al 1930 capitale dell'Uzbekistan sovietico, Samarcanda unisce i monumenti leggendari della dinastia timuride (il Registan, Gur-e Amir, Bibi-Khanym) a una fiorente industria della seta, del vino, del cuoio e della lavorazione agroalimentare.",
      s1: "Nel 1938, le epurazioni colpiscono gli intellettuali uzbeki, professori universitari e funzionari di Samarcanda, accusati di deviazionismo feudale e di nostalgie verso l'Islam tradizionale.",
      s2: "Nell'autunno 1938, gli istituti di ricerca agronomica e serica di Samarcanda perfezionano ibridi di baco da seta ad alta resa per garantire forniture stabili all'industria paracadutistica sovietica.",
      s3_4: "Nel 1939, l'inaugurazione di nuovi rami irrigui lungo lo Zeravshan incrementa le colture ortofrutticole e i vigneti, alimentando una delle maggiori industrie di conserve e vino dell'URSS.",
      s5: "Tra l'inverno 1939 e il 1940, Samarcanda invia vagoni carichi di frutta secca, uva passa, riso e seta grezza alle città e agli ospedali militari dell'Unione.",
      s6: "Nell'estate 1940, la città consolida la sua funzione di polo accademico centroasiatico, con l'ampliamento dell'Università Statale di Samarcanda e delle scuole magistrali.",
      s7: "Nel tardo 1940, le manifatture tessili e calzaturiere cittadine iniziano a produrre buffetterie, borracce e calzari per le nuove divisioni mobilitate dell'Armata Rossa.",
      s8: "Nel giugno 1941, l'antropologo sovietico Mikhail Gerasimov apre la tomba di Tamerlano a Samarcanda per ricostruirne il volto: secondo la leggenda locale, la violazione del sepolcro liberò lo spirito della guerra, coincidente con l'invasione nazista del 22 giugno.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Samarcanda",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Valle dello Zeravshan, Seta e Monumenti Timuridi",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UZB_154_Tashkent_Region": {
    id: "SOV_ADM1_UZB_154_Tashkent_Region",
    republic: "RSS Uzbeka",
    modernName: "Regione di Tashkent",
    historicalName: "Oblast di Tashkent (Bacino del Chirchiq)",
    russianName: "Ta\u0161kentskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Chimica di Chirchikstroy e Centrali Idroelettriche",
    capital: "Tashkent",
    keys: ["adm1_uzb_154_tashkent_region", "oblast", "sov_adm1_uzb_154_tashkent_region", "takentskaja", "tashkent", "tashkent region", "tashkent_region"],
    notes: {
      s0: "L'Oblast di Tashkent, distesa nella fertile vallata del fiume Chirchiq ai piedi dei monti Chatkal, è il motore industriale e agricolo dell'Uzbekistan, sede del cantiere monumentale di Chirchikstroy per l'elettrochimica e la concimazione azotata.",
      s1: "Nel 1938, l'NKVD sorveglia con rigore estremo la costruzione della centrale idroelettrica e dell'impianto chimico di Chirchik, arrestando decine di tecnici per sospetto spionaggio industriale estero.",
      s2: "Nell'autunno 1938, le forniture agricole dell'oblast nutrono la crescente popolazione metropolitana della capitale e garantiscono scorte per l'Armata Rossa.",
      s3_4: "Nel 1939, l'entrata in funzione delle prime turbine idroelettriche sul Chirchiq fornisce energia a basso costo all'industria bellica e ai collegamenti ferroviari dell'area.",
      s5: "Durante l'inverno 1939-1940, il combinat chimico di Chirchik produce acido nitrico ed esplosivi per l'industria della difesa sovietica, operando a ciclo continuo.",
      s6: "Nell'estate 1940, l'area consolida la produzione intensiva di barbabietola da zucchero e cotone, supportata da una fitta rete di canali di bonifica e fertilizzanti locali.",
      s7: "Nel tardo 1940, vengono completate nuove linee di trasmissione elettrica e pianificati raccordi ferroviari speciali per collegare le fabbriche della vallata del Chirchiq.",
      s8: "Nella primavera 1941, l'Oblast di Tashkent è pronta a ricevere le fabbriche e gli operai evacuati dalle zone occidentali dell'URSS sotto attacco nazista.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Tashkent (Bacino del Chirchiq)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Chimica di Chirchikstroy e Centrali Idroelettriche",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UZB_155_Sirdaryo_Region": {
    id: "SOV_ADM1_UZB_155_Sirdaryo_Region",
    republic: "RSS Uzbeka",
    modernName: "Regione di Syrdarya",
    historicalName: "Steppa della Fame (Golodnaja Step')",
    russianName: "Golodnostepskij Rajon",
    adminTitle: "Rajispolkom \u2014 Bonifica Idraulica e Canale Kirov",
    capital: "Gulistan",
    keys: ["adm1_uzb_155_sirdaryo_region", "golodnostepskij", "gulistan", "rajon", "sirdaryo region", "sirdaryo_region", "sov_adm1_uzb_155_sirdaryo_region", "syrdarya"],
    notes: {
      s0: "Storicamente conosciuta come la 'Steppa della Fame' (Golodnaja Step', con capoluogo Gulistan), questa sterminata pianura alluvionale argillosa a sud del Syr Darya è il teatro della più imponente opera di bonifica ed espansione idraulica sovietica per la coltivazione del cotone.",
      s1: "Nel 1938, i colcos e i canali della Steppa della Fame vengono sottoposti a controlli draconiani contro presunti sabotatori dei sistemi di chiuse e delle stazioni di drenaggio salino.",
      s2: "Nell'autunno 1938, le nuove terre irrigate dai canali 'Kirov' e 'Nord' producono quantitativi record di cotone a fibra media, spedito subito verso le filande della Russia europea.",
      s3_4: "Nel 1939, l'esperienza pionieristica di scavo della Golodnaja Step' viene impiegata come modello organizzativo per la costruzione del Grande Canale di Fergana.",
      s5: "Tra l'inverno 1939 e il 1940, la regione fornisce cereali e foraggio per i convogli di cavalleria e per le mandrie collettivizzate dell'Asia Centrale.",
      s6: "Nell'estate 1940, l'avanzamento dei lavori di scavo idraulico vince la salinizzazione del terreno, raddoppiando le rese agricole dell'intera pianura.",
      s7: "Nel tardo 1940, la ferrovia Transcaspica che attraversa la steppa viene attrezzata con nuovi binari di raddoppio per smaltire il traffico pesante continuo.",
      s8: "Nella primavera 1941, la Steppa della Fame è trasformata in una florida distesa verde di canali e cotone, vanto dell'ingegneria idraulica socialista sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Steppa della Fame (Golodnaja Step')",
    getAdminTitle: (_step: number) => "Rajispolkom — Bonifica Idraulica e Canale Kirov",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UZB_156_Jizzakh_Region": {
    id: "SOV_ADM1_UZB_156_Jizzakh_Region",
    republic: "RSS Uzbeka",
    modernName: "Regione di Jizzakh",
    historicalName: "Oblast di Jizzakh (Porte di Tamerlano)",
    russianName: "D\u017eizakskij Rajon",
    adminTitle: "Rajispolkom \u2014 Gola del Sanzar e Corridoio Ta\u0161kent-Samarcanda",
    capital: "Jizzakh",
    keys: ["adm1_uzb_156_jizzakh_region", "dizakskij", "jizzakh", "jizzakh region", "jizzakh_region", "rajon", "sov_adm1_uzb_156_jizzakh_region"],
    notes: {
      s0: "Custode della famosa gola strategica delle 'Porte di Tamerlano' scavata dal fiume Sanzar tra le montagne del Nuratau e del Turkestan, Jizzakh controlla l'accesso naturale obbligato tra la valle del Chirchiq e l'oasi di Samarcanda.",
      s1: "Nel 1938, la sorveglianza della ferrovia e dei ponti nelle gole montane di Jizzakh è affidata a picchetti armati dell'NKVD per proteggere le comunicazioni tra le capitali uzbeke.",
      s2: "Nell'autunno 1938, la regione rifornisce le manifatture urbane di grano secco, pelli bovine e bestiame allevato sui pascoli montani.",
      s3_4: "Nel 1939, vengono effettuati lavori di rettifica del tracciato ferroviario nelle gole rocciose per incrementare la velocità e la portata dei treni merci pesanti.",
      s5: "Durante l'inverno 1939-1940, l'area assicura il passaggio senza intoppi di convogli carichi di forniture strategiche diretti verso i distretti militari occidentali.",
      s6: "Nell'estate 1940, si sviluppano progetti di canalizzazione per irrigare le pendici aride del distretto di Bakhmal con colture frutticole e cerealicole.",
      s7: "Nel tardo 1940, le fortificazioni e i tunnel ferroviari di Jizzakh vengono dotati di difese passive contro attacchi aerei e sabotaggi.",
      s8: "Nella primavera 1941, Jizzakh vigila sul corridoio strategico dell'Uzbekistan centrale, garantendo comunicazioni sicure prima dello scoppio del conflitto.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Jizzakh (Porte di Tamerlano)",
    getAdminTitle: (_step: number) => "Rajispolkom — Gola del Sanzar e Corridoio Taškent-Samarcanda",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UZB_157_Bukhara_Region": {
    id: "SOV_ADM1_UZB_157_Bukhara_Region",
    republic: "RSS Uzbeka",
    modernName: "Regione di Bukhara",
    historicalName: "Oblast di Bukhara (Antico Emirato)",
    russianName: "Bucharskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Basso Zeravshan, Oasi Storica e Karakul",
    capital: "Bukhara",
    keys: ["adm1_uzb_157_bukhara_region", "bucharskaja", "bukhara", "bukhara region", "bukhara_region", "oblast", "sov_adm1_uzb_157_bukhara_region"],
    notes: {
      s0: "Antica capitale dell'emirato soppresso nel 1920, la nobile città di Bukhara con i suoi minareti millenari (Kalyan), madrase e mura di fango domina l'oasi del basso Zeravshan, centro supremo del commercio carovaniero, del cotone e dell'astrakan.",
      s1: "Nel 1938, le purghe di Stalin spazzano via l'intera vecchia guardia dei Giovani Bukhari (tra cui Fayzulla Xoʻjayev, primo presidente del Consiglio uzbeko, condannato a morte nel processo di Mosca del 1938 insieme a Bucharin e Rykov).",
      s2: "Nell'autunno 1938, Bukhara viene sottoposta a una severa laicizzazione e russificazione burocratica, con la conversione di celebri monumenti in magazzini cooperativi o musei dell'ateismo.",
      s3_4: "Nel 1939, la costruzione di nuovi canali di adduzione idrica dal bacino di Katta-Kurgan rilancia la produzione agricola e limita le perdite d'acqua nel deserto circostante.",
      s5: "Tra l'inverno 1939 e il 1940, Bukhara fornisce quintali di pelli di carakul pregiate per il commercio estero sovietico e tessuti pesanti per l'esercito.",
      s6: "Nell'estate 1940, si espandono gli stabilimenti di sgranatura del cotone e le prime industrie tessili moderne all'esterno della cinta muraria storica.",
      s7: "Nel tardo 1940, vengono completati i depositi strategici di grano e idrocarburi alla stazione di Kagan, snodo ferroviario di Bukhara.",
      s8: "Nell'aprile 1941, Bukhara mantiene la massima disciplina produttiva, mentre la popolazione risponde alle chiamate di leva per la difesa dell'Unione Sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Bukhara (Antico Emirato)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Basso Zeravshan, Oasi Storica e Karakul",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UZB_158_Qashqadaryo_Region": {
    id: "SOV_ADM1_UZB_158_Qashqadaryo_Region",
    republic: "RSS Uzbeka",
    modernName: "Regione di Kashkadarya",
    historicalName: "Oblast di Kashkadarya (Karshi e Shakhrisabz)",
    russianName: "Ka\u0161kadar'inskaja Oblast",
    adminTitle: "Ispolkom Oblastnogo Soveta \u2014 Patria di Tamerlano e Valle del Kashkadarya",
    capital: "Karshi",
    keys: ["adm1_uzb_158_qashqadaryo_region", "kakadarinskaja", "karshi", "kashkadarya", "oblast", "qashqadaryo region", "qashqadaryo_region", "sov_adm1_uzb_158_qashqadaryo_region"],
    notes: {
      s0: "Con capoluogo Karshi (e comprendente la celebre Shakhrisabz, città natale di Tamerlano ai piedi della catena degli Zarafshan), l'Oblast di Kashkadarya unisce valli alpine montane a pianure irrigate a cotone e cereali.",
      s1: "Nel 1938, l'NKVD persegue gli esponenti dei clan locali accusati di simpatie per la guerriglia basmaci e di resistenza alle requisizioni forzate di grano e lana.",
      s2: "Nell'autunno 1938, i colcos montani e di pianura incrementano le consegne di carne ovina, grasso e lana per soddisfare i piani quinquennali dello Stato.",
      s3_4: "Nel 1939, vengono avviati studi idrotecnici per derivare parte delle portate del Kashkadarya verso la pianura di Karshi, gettando le basi per future colossali bonifiche.",
      s5: "Durante l'inverno 1939-1940, la regione rifornisce le forze armate di manufatti di cuoio, montone e frutta disidratata per le razioni speciali.",
      s6: "Nell'estate 1940, l'area di Shakhrisabz eccelle nella viticoltura e nella produzione di foraggi ad alta densità nutritiva per i cavalli dell'esercito.",
      s7: "Nel tardo 1940, vengono allestite nuove stazioni zootecniche per selezionare razze bovine e ovine resistenti al clima estremo centroasiatico.",
      s8: "Nella primavera 1941, Kashkadarya si mobilita a pieno regime per la semina del cotone e l'addestramento militare dei giovani colcosiani.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oblast di Kashkadarya (Karshi e Shakhrisabz)",
    getAdminTitle: (_step: number) => "Ispolkom Oblastnogo Soveta — Patria di Tamerlano e Valle del Kashkadarya",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_ADM1_UZB_159_Tashkent": {
    id: "SOV_ADM1_UZB_159_Tashkent",
    republic: "RSS Uzbeka",
    modernName: "Citt\u00e0 di Tashkent",
    historicalName: "Tashkent (Capitale della RSS Uzbeka)",
    russianName: "Gorod Ta\u0161kent",
    adminTitle: "Ta\u0161kentskij Gorsovet \u2014 Sede SAVO e Cuore dell'Asia Centrale Sovietica",
    capital: "Tashkent",
    keys: ["adm1_uzb_159_tashkent", "gorod", "sov_adm1_uzb_159_tashkent", "takent", "tashkent"],
    notes: {
      s0: "Capitale della RSS Uzbeka e metropoli più popolosa dell'Asia Centrale, Tashkent è il cuore politico, culturale, scientifico e ferroviario dell'intera regione, sede del Distretto Militare dell'Asia Centrale (SAVO) dell'Armata Rossa e delle grandi università sovietiche.",
      s1: "Nel 1938, il Terrore staliniano decapita l'intera dirigenza sovietica uzbeka: Akmal Ikramov, segretario del partito, viene processato a Mosca con Bucharin e giustiziato, seguito dall'annientamento di centinaia di quadri, poeti e scienziati a Tashkent.",
      s2: "Nell'autunno 1938, Usman Yusupov assume la guida ferrea del partito uzbeko sotto la diretta supervisione di Stalin, riallineando la repubblica a una devozione assoluta alla causa bolscevica.",
      s3_4: "Nella primavera 1939, Tashkent è il centro di pianificazione per le opere idrauliche della valle di Fergana e il comando logistico per il rafforzamento delle frontiere meridionali sovietiche.",
      s5: "Tra l'inverno 1939 e il 1940, la metropoli espande le proprie officine meccaniche (tra cui la futura fabbrica d'aviazione 'Čkalov' VAZ) e le università mediche che preparano migliaia di specialisti per l'Armata Rossa.",
      s6: "Nell'estate 1940, Tashkent ospita delegazioni industriali di Mosca per redigere i piani segreti di evacuazione delle industrie pesanti della Russia europea verso la città.",
      s7: "Nel tardo 1940, il comando del Distretto Militare dell'Asia Centrale a Tashkent conduce manovre di mobilitazione su larga scala e intensifica l'addestramento dei reparti corazzati e di cavalleria.",
      s8: "Nell'aprile 1941, Tashkent è un pilastro inespugnabile della retrovia sovietica, dotata di imponenti scorte industriali e pronta a diventare il rifugio strategico della nazione in guerra.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Tashkent (Capitale della RSS Uzbeka)",
    getAdminTitle: (_step: number) => "Taškentskij Gorsovet — Sede SAVO e Cuore dell'Asia Centrale Sovietica",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_MASSR_310_Transnistria": {
    id: "SOV_MASSR_310_Transnistria",
    republic: "MOLDAVIA",
    modernName: "Transnistria (Pridnestrovie)",
    historicalName: "RSSA Moldava (Tiraspol \u2014 Capitale dal 1929 al 1940 / Fiume Dnestr)",
    russianName: "Moldavskaya ASSR \u2014 Ukrainskaya SSR",
    adminTitle: "Sovet Narodnykh Komissarov Moldavskoj ASSR (dal 1940 Moldavskaya SSR) \u2014 URSS",
    capital: "Tiraspol",
    keys: ["massr_310_transnistria", "moldavskaya", "pridnestrovie", "sov massr 310 transnistria", "sov_massr_310_transnistria", "tiraspol", "transnistria", "ukrainskaya"],
    notes: {
      s0: "Striscia territoriale autonoma lungo la riva sinistra del fiume Dnestr, istituita nel 1924 all'interno della RSS Ucraina come 'testa di ponte rivoluzionaria' verso i Balcani e la Romania; capitale trasferita nel 1929 a Tiraspol; comprende Rîbnița e Dubăsari e la fortezza del Settore Fortificato di Tiraspol (TiUR).",
      s1: "Dure purghe colpiscono la leadership moldava e ucraina della RSSA; l'NKVD fucila i fondatori della repubblica autonoma accusati di spionaggio per conto di Bucarest.",
      s2: "Potenziamento dei bunker in cemento armato del TiUR lungo il Dnestr a sbarramento di qualsiasi offensiva romena oltre il fiume.",
      s3_4: "Le stazioni radio di Tiraspol irradiano propaganda quotidiana in lingua romena e moldava verso la popolazione della Bessarabia oltre il Dnestr.",
      s5: "Durante la campagna di Polonia la RSSA Moldava funge da base di concentramento per il fronte meridionale dell'Armata Rossa.",
      s6: "Nel giugno 1940 da Tiraspol parte l'avanzata delle truppe sovietiche che attraversano il Dnestr e occupano la Bessarabia; il 2 agosto 1940 la RSSA Moldava viene sciolta e unita alla maggior parte della Bessarabia per formare la Repubblica Socialista Sovietica Moldava (RSS Moldava) con capitale Chișinău.",
      s7: "Tiraspol perde lo status di capitale a favore di Chișinău ma rimane il principale polo industriale e manifatturiero della neonata RSS Moldava.",
      s8: "I bunker del TiUR lungo il Dnestr costituiscono la seconda linea difensiva sovietica all'alba dell'invasione romeno-tedesca dell'estate 1941.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (step: number) => (step < 6 ? 'RSSA Moldava (Tiraspol / Transnistria)' : 'RSS Moldava (Tiraspol / Chișinău)'),
    getAdminTitle: (step: number) => (step < 6 ? "Tiraspol'skij Gorsovet — RSSA Moldava (RSS Ucraina)" : 'Prezidium Verchovnogo Soveta Moldavskoj SSR'),
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_256_Kaarosta_District": {
    id: "SOV_NW_RUS_256_Kaarosta_District",
    republic: "RSFSR",
    modernName: "Lomonosov (Golfo di Finlandia)",
    historicalName: "Oranienbaum (Settore Fortificato di Kron\u0161tadt \u2014 Forti Krasnaja Gorka e Seraja Lo\u0161ad')",
    russianName: "Oranienbaumskij rajon \u2014 Leningradskaya oblast",
    adminTitle: "Oranienbaumskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Oranienbaum",
    keys: ["finlandia", "golfo", "leningradskaya", "lomonosov", "nw_rus_256_kaarosta_district", "oblast", "oranienbaum", "oranienbaumskij", "rajon", "sov nw rus 256 kaarosta district", "sov_nw_rus_256_kaarosta_district"],
    notes: {
      s0: "Distretto litoraneo meridionale del Golfo di Finlandia a presidio marittimo dell'isola-fortezza di Kronštadt e dell'accesso navale a Leningrado; sede dei formidabili forti corazzati Krasnaja Gorka e Seraja Lošad', armati con possenti torri binate da 305 mm e batterie ferroviarie pesanti TM-3-12.",
      s1: "Strettissima vigilanza dell'NKVD e del controspionaggio navale lungo le coste del golfo contro presunti infiltrati e sabotatori provenienti dall'Estonia e dalla Finlandia.",
      s2: "Ammodernamento degli apparati ottici di tiro e dei radar costieri dei forti di Kronštadt e Krasnaja Gorka per sbarrare il golfo a qualsiasi flotta ostile.",
      s3_4: "Le batterie pesanti di Krasnaja Gorka conducono esercitazioni a fuoco reale a lunga gittata sulle acque del golfo per testare le nuove tabelle balistiche.",
      s5: "Durante la Guerra d'Inverno le batterie corazzate di Krasnaja Gorka bombardano a lungo raggio i forti finlandesi dell'isola di Koivisto (Birkö) e di Ino, fornendo appoggio d'artiglieria alle divisioni dell'Armata Rossa.",
      s6: "Con l'annessione sovietica dell'Estonia (giugno 1940), le artiglierie di Oranienbaum e Kronštadt si integrano con le batterie costiere estoni di Naissaar e Aegna a chiusura totale della bocca del Golfo di Finlandia.",
      s7: "Allestimento di magazzini e bunker per munizioni pesanti e cisterne di carburante per i cacciatorpediniere e dragamine della Flotta del Baltico.",
      s8: "Il settore fortificato di Oranienbaum è pronto al combattimento; durante la futura invasione nazista non verrà mai espugnato, diventando la leggendaria 'Testa di ponte di Oranienbaum' (Oranienbaumskij placdarm).",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Oranienbaum (Settore Fortificato di Kronštadt — Forti Krasnaja Gorka e Seraja Lošad')",
    getAdminTitle: (_step: number) => "Oranienbaumskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_257_Mujej_rvi_District": {
    id: "SOV_NW_RUS_257_Mujej_rvi_District",
    republic: "RSFSR",
    modernName: "Distretto di Muezerskij",
    historicalName: "Mujej\u00e4rvi (Carelia Centrale \u2014 Foreste della Frontiera Finlandese)",
    russianName: "Muje\u017eerskij rajon \u2014 Karel'skaya ASSR",
    adminTitle: "Muje\u017eerskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Mujej\u00e4rvi",
    keys: ["karelskaya", "muezerskij", "mujeerskij", "mujejrvi", "mujejärvi", "nw_rus_257_mujej_rvi_district", "rajon", "sov nw rus 257 mujej rvi district", "sov_nw_rus_257_mujej_rvi_district"],
    notes: {
      s0: "Repubblica autonoma dei laghi e delle foreste della Carelia sovietica lungo la frontiera con la Finlandia; comprende la capitale Petrozavodsk sul Lago Onega (fabbrica di trattori e cannoni Onežskij Zavod), le grandi cartiere di Kondopoga e Segeža e il Canale Mar Bianco-Baltico (Belomorkanal, inaugurato nel 1933 da Stalin).",
      s1: "Dure purghe colpiscono i comunisti finlandesi 'rossi' rifugiatisi in Carelia dopo la guerra civile del 1918 (tra cui Edvard Gylling e Kustaa Rovio); la dirigenza carèlo-finlandese viene sterminata dall'NKVD.",
      s2: "Il Belomorkanal consente il rapido trasferimento interno di torpediniere e sommergibili leggeri dal cantiere navale di Leningrado al Mar Bianco senza circumnavigare la Scandinavia.",
      s3_4: "Medvež'egorsk e Belomorsk sono i centri direzionali delle chiuse del canale e dei campi di lavoro dell'NKVD; addestramento di truppe da frontiera della Carelia.",
      s5: "Nel novembre 1939 la Carelia è il teatro di partenza della Guerra d'Inverno contro la Finlandia; a Terijoki viene insediato il governo fantoccio di Otto Kuusinen ('Repubblica Democratica Finlandese'). Con il Trattato di Mosca del marzo 1940 l'URSS annette l'istmo di Carelia e le terre occidentali, elevando la Carelia a 12ª Repubblica dell'URSS: la Repubblica Socialista Sovietica Carelo-Finlandese (Karelo-Finskaja SSR) guidata da Kuusinen.",
      s6: "Nel giugno-agosto 1940 la neo-costituita RSS Carelo-Finlandese riorganizza i territori annessi (Viipuri, Sortavala, Käkisalmi) evacuati dai civili finlandesi, insediando coloni russi e bielorussi.",
      s7: "Sviluppo di fortificazioni confinarie a sbarramento della nuova frontiera con la Finlandia; potenziamento della ferrovia di Kirov e delle stazioni di smistamento.",
      s8: "Alla vigilia del 22 giugno 1941, la Carelia sovietica è un fronte avanzato a diretto contatto con la Finlandia, destinato a subire l'immediata offensiva della Guerra di Continuazione finnico-tedesca.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Mujejärvi (Carelia Centrale — Foreste della Frontiera Finlandese)",
    getAdminTitle: (_step: number) => "Muježerskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_258_Tusina_District": {
    id: "SOV_NW_RUS_258_Tusina_District",
    republic: "RSFSR",
    modernName: "Distretto di Tosno",
    historicalName: "Tosno (Corridoio Ferroviario Mosca-Leningrado / Fiume Tosna)",
    russianName: "Tosnenskij rajon \u2014 Leningradskaya oblast",
    adminTitle: "Tosnenskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Tosno",
    keys: ["leningradskaya", "nw_rus_258_tusina_district", "oblast", "rajon", "sov nw rus 258 tusina district", "sov_nw_rus_258_tusina_district", "tosnenskij", "tosno"],
    notes: {
      s0: "Nodo ferroviario e militare strategico a sud di Leningrado, attraversato dalle direttrici principali verso Pskov, Novgorod e Mosca; sede di grandi caserme della guarnigione militare e dell'aerodromo militare di Krasnogvardejsk (Gatčina, ribattezzata 'Città della Guardia Rossa' tra il 1929 e il 1944).",
      s1: "Dure purghe colpiscono il personale ferroviario e gli ufficiali dell'aviazione dislocati a Krasnogvardejsk e Tosno sotto accusa di 'spionaggio trotskista'.",
      s2: "Potenziamento delle rampe di sbarco merci e dei doppi binari elettrificati lungo la ferrovia Oktjabr'skaja per garantire il flusso di carichi pesanti verso Leningrado.",
      s3_4: "Esercitazioni delle divisioni motorizzate dell'Armata Rossa e delle squadriglie da caccia I-16 e I-153 del Distretto Militare di Leningrado.",
      s5: "Transito continuo di convogli militari e treni ospedale durante la campagna invernale careliana contro le linee difensive finlandesi.",
      s6: "Ampliamento dei depositi logistici e delle officine di revisione locomotive a Krasnogvardejsk e Tosno a supporto del fronte nord-occidentale.",
      s7: "Istituzione di posti di blocco e avvio delle prime opere di fortificazione campale lungo le linee ferroviarie meridionali.",
      s8: "Questi distretti costituiscono i cardini della mobilità su rotaia e della concentrazione delle riserve a protezione della seconda capitale sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Tosno (Corridoio Ferroviario Mosca-Leningrado / Fiume Tosna)",
    getAdminTitle: (_step: number) => "Tosnenskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_260_Slantsevsky_District": {
    id: "SOV_NW_RUS_260_Slantsevsky_District",
    republic: "RSFSR",
    modernName: "Distretto di Slancy",
    historicalName: "Slancy (Bacino degli Scisti Bituminosi del Narva)",
    russianName: "Slancevskij rajon \u2014 Leningradskaya oblast",
    adminTitle: "Slancevskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Slancy",
    keys: ["leningradskaya", "nw_rus_260_slantsevsky_district", "oblast", "rajon", "slancevskij", "slancy", "sov nw rus 260 slantsevsky district", "sov_nw_rus_260_slantsevsky_district"],
    notes: {
      s0: "Fascia occidentale e sud-occidentale dell'Oblast di Leningrado lungo il fiume Luga e il confine di stato con la Repubblica di Estonia stabilito dal Trattato di Tartu del 1920; comprende il bacino minerario degli scisti bituminosi di Slancy e la città fortificata di Kingisepp (Jamburg).",
      s1: "Presidio fortificato di frontiera dell'Armata Rossa e delle truppe confinarie dell'NKVD; chiusura rigorosa della zona di frontiera con l'Estonia e arresto di presunti contrabbandieri.",
      s2: "Sviluppo dell'estrazione di scisti combustibili a Slancy per alimentare la produzione di gas e combustibile per le centrali elettriche di Leningrado.",
      s3_4: "Manovre militari e collaudo di fortificazioni in calcestruzzo lungo il fiume Luga per sbarrare le direttrici d'invasione dai paesi baltici.",
      s5: "Durante la Guerra d'Inverno il settore funge da retrovia di sicurezza; le truppe di frontiera sorvegliano il confine estone durante le trattative per le basi sovietiche.",
      s6: "Nel giugno 1940 le divisioni dell'Armata Rossa varcano la frontiera a Kingisepp e Narva per occupare l'Estonia; il confine di Tartu viene declassato a linea amministrativa interna all'URSS.",
      s7: "Gli ingegneri militari sovietici avviano i rilievi per la linea difensiva campale del 'Lužskij Rubež' (Linea di Luga) imperniata sul corso del fiume.",
      s8: "Alla vigilia di Barbarossa, Luga e Kingisepp sono allertate come prima e seconda linea difensiva campale contro un'eventuale penetrazione corazzata tedesca verso Leningrado.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Slancy (Bacino degli Scisti Bituminosi del Narva)",
    getAdminTitle: (_step: number) => "Slancevskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_261_Petroskoi_District": {
    id: "SOV_NW_RUS_261_Petroskoi_District",
    republic: "RSFSR",
    modernName: "Petrozavodsk (Citt\u00e0 Capitale)",
    historicalName: "Petrozavodsk (Petroskoi \u2014 Capitale della Carelia sul Lago Onega)",
    russianName: "Gorod Petrozavodsk",
    adminTitle: "Sovet Narodnykh Komissarov Karel'skoj ASSR (Karelo-Finskoj SSR) \u2014 RSFSR/URSS",
    capital: "Petrozavodsk",
    keys: ["capitale", "gorod", "nw_rus_261_petroskoi_district", "petrozavodsk", "sov nw rus 261 petroskoi district", "sov_nw_rus_261_petroskoi_district"],
    notes: {
      s0: "Repubblica autonoma dei laghi e delle foreste della Carelia sovietica lungo la frontiera con la Finlandia; comprende la capitale Petrozavodsk sul Lago Onega (fabbrica di trattori e cannoni Onežskij Zavod), le grandi cartiere di Kondopoga e Segeža e il Canale Mar Bianco-Baltico (Belomorkanal, inaugurato nel 1933 da Stalin).",
      s1: "Dure purghe colpiscono i comunisti finlandesi 'rossi' rifugiatisi in Carelia dopo la guerra civile del 1918 (tra cui Edvard Gylling e Kustaa Rovio); la dirigenza carèlo-finlandese viene sterminata dall'NKVD.",
      s2: "Il Belomorkanal consente il rapido trasferimento interno di torpediniere e sommergibili leggeri dal cantiere navale di Leningrado al Mar Bianco senza circumnavigare la Scandinavia.",
      s3_4: "Medvež'egorsk e Belomorsk sono i centri direzionali delle chiuse del canale e dei campi di lavoro dell'NKVD; addestramento di truppe da frontiera della Carelia.",
      s5: "Nel novembre 1939 la Carelia è il teatro di partenza della Guerra d'Inverno contro la Finlandia; a Terijoki viene insediato il governo fantoccio di Otto Kuusinen ('Repubblica Democratica Finlandese'). Con il Trattato di Mosca del marzo 1940 l'URSS annette l'istmo di Carelia e le terre occidentali, elevando la Carelia a 12ª Repubblica dell'URSS: la Repubblica Socialista Sovietica Carelo-Finlandese (Karelo-Finskaja SSR) guidata da Kuusinen.",
      s6: "Nel giugno-agosto 1940 la neo-costituita RSS Carelo-Finlandese riorganizza i territori annessi (Viipuri, Sortavala, Käkisalmi) evacuati dai civili finlandesi, insediando coloni russi e bielorussi.",
      s7: "Sviluppo di fortificazioni confinarie a sbarramento della nuova frontiera con la Finlandia; potenziamento della ferrovia di Kirov e delle stazioni di smistamento.",
      s8: "Alla vigilia del 22 giugno 1941, la Carelia sovietica è un fronte avanzato a diretto contatto con la Finlandia, destinato a subire l'immediata offensiva della Guerra di Continuazione finnico-tedesca.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Petrozavodsk (Petroskoi — Capitale della Carelia sul Lago Onega)",
    getAdminTitle: (_step: number) => "Sovet Narodnykh Komissarov Karel'skoj ASSR (Karelo-Finskoj SSR) — RSFSR/URSS",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_263_Gatchinsky_District": {
    id: "SOV_NW_RUS_263_Gatchinsky_District",
    republic: "RSFSR",
    modernName: "Distretto di Gat\u010dina",
    historicalName: "Krasnogvardejsk (Gat\u010dina \u2014 Nodo Ferroviario e Presidio Militare)",
    russianName: "Krasnogvardejskij rajon \u2014 Leningradskaya oblast",
    adminTitle: "Krasnogvardejskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Krasnogvardejsk",
    keys: ["gatina", "krasnogvardejsk", "krasnogvardejskij", "leningradskaya", "nw_rus_263_gatchinsky_district", "oblast", "rajon", "sov nw rus 263 gatchinsky district", "sov_nw_rus_263_gatchinsky_district"],
    notes: {
      s0: "Nodo ferroviario e militare strategico a sud di Leningrado, attraversato dalle direttrici principali verso Pskov, Novgorod e Mosca; sede di grandi caserme della guarnigione militare e dell'aerodromo militare di Krasnogvardejsk (Gatčina, ribattezzata 'Città della Guardia Rossa' tra il 1929 e il 1944).",
      s1: "Dure purghe colpiscono il personale ferroviario e gli ufficiali dell'aviazione dislocati a Krasnogvardejsk e Tosno sotto accusa di 'spionaggio trotskista'.",
      s2: "Potenziamento delle rampe di sbarco merci e dei doppi binari elettrificati lungo la ferrovia Oktjabr'skaja per garantire il flusso di carichi pesanti verso Leningrado.",
      s3_4: "Esercitazioni delle divisioni motorizzate dell'Armata Rossa e delle squadriglie da caccia I-16 e I-153 del Distretto Militare di Leningrado.",
      s5: "Transito continuo di convogli militari e treni ospedale durante la campagna invernale careliana contro le linee difensive finlandesi.",
      s6: "Ampliamento dei depositi logistici e delle officine di revisione locomotive a Krasnogvardejsk e Tosno a supporto del fronte nord-occidentale.",
      s7: "Istituzione di posti di blocco e avvio delle prime opere di fortificazione campale lungo le linee ferroviarie meridionali.",
      s8: "Questi distretti costituiscono i cardini della mobilità su rotaia e della concentrazione delle riserve a protezione della seconda capitale sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Krasnogvardejsk (Gatčina — Nodo Ferroviario e Presidio Militare)",
    getAdminTitle: (_step: number) => "Krasnogvardejskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_264_Kuola_District": {
    id: "SOV_NW_RUS_264_Kuola_District",
    republic: "RSFSR",
    modernName: "Distretto di Kola",
    historicalName: "Kola (Antico Borgo Artico e Valle del Fiume Kola)",
    russianName: "Kol'skij rajon \u2014 Murmanskaya oblast",
    adminTitle: "Kol'skij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Kola",
    keys: ["kola", "kolskij", "murmanskaya", "nw_rus_264_kuola_district", "oblast", "rajon", "sov nw rus 264 kuola district", "sov_nw_rus_264_kuola_district"],
    notes: {
      s0: "Capitale e santuario navale dell'Artico sovietico sulla costa della penisola di Kola; porto di Murmansk libero dai ghiacci tutto l'anno grazie alla Corrente del Golfo, collegato a sud dalla ferrovia di Kirov (Kirovskaja železnaja doroga); sede a Poljarnyj del Quartier Generale della neonata Flotta del Nord (costituita nel 1933) e della base di Vajenga (Severomorsk).",
      s1: "L'Oblast di Murmansk viene istituita ufficialmente nel maggio 1938; dure purghe colpiscono i marinai e gli ingegneri navali della Flotta del Nord accusati di collusione con potenze straniere.",
      s2: "Ampliamento dei moli sommergibili a Poljarnyj e Ura-Guba per i battelli oceanici classe 'D' e 'S'; costruzione del porto commerciale e rompighiaccio di Murmansk.",
      s3_4: "La Flotta del Nord riceve nuovi cacciatorpediniere e pattugliatori per la scorta delle rotte mercantili artiche verso il Mar Bianco e la Siberia.",
      s5: "Nel novembre 1939-marzo 1940 la Flotta del Nord e la 14ª Armata conducono le operazioni della Guerra d'Inverno contro la Finlandia, occupando Petsamo e isolando la costa artica finlandese. Murmansk funge da base segreta di rifornimento navale ('Basis Nord') per i sommergibili tedeschi nell'ambito degli accordi del Patto Molotov-Ribbentrop.",
      s6: "Con la conclusione della Guerra d'Inverno e l'annessione della penisola di Rybačij (Trattato di Mosca), l'URSS blinda l'ingresso della baia di Kola; cessano gli accordi per Basis Nord.",
      s7: "Rafforzamento delle fortificazioni costiere sulla penisola dei Pescatori (Rybačij) e nei fiordi di Poljarnyj e Vajenga a presidio della Flotta del Nord.",
      s8: "Alla vigilia dell'attacco tedesco, Murmansk è una piazzaforte navale artica inespugnabile, destinata a ricevere i convogli alleati della rotta artica e a non essere mai conquistata dalle forze dell'Asse.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Kola (Antico Borgo Artico e Valle del Fiume Kola)",
    getAdminTitle: (_step: number) => "Kol'skij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_265___nisenranta_District": {
    id: "SOV_NW_RUS_265___nisenranta_District",
    republic: "RSFSR",
    modernName: "Distretto Prione\u017eskij",
    historicalName: "Prione\u017eskij (\u00c4\u00e4nisenranta \u2014 Litorale Occidentale del Lago Onega)",
    russianName: "Prione\u017eskij rajon \u2014 Karel'skaya ASSR",
    adminTitle: "Prione\u017eskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Ladva",
    keys: ["karelskaya", "ladva", "nw_rus_265___nisenranta_district", "prioneskij", "rajon", "sov nw rus 265   nisenranta district", "sov_nw_rus_265___nisenranta_district"],
    notes: {
      s0: "Repubblica autonoma dei laghi e delle foreste della Carelia sovietica lungo la frontiera con la Finlandia; comprende la capitale Petrozavodsk sul Lago Onega (fabbrica di trattori e cannoni Onežskij Zavod), le grandi cartiere di Kondopoga e Segeža e il Canale Mar Bianco-Baltico (Belomorkanal, inaugurato nel 1933 da Stalin).",
      s1: "Dure purghe colpiscono i comunisti finlandesi 'rossi' rifugiatisi in Carelia dopo la guerra civile del 1918 (tra cui Edvard Gylling e Kustaa Rovio); la dirigenza carèlo-finlandese viene sterminata dall'NKVD.",
      s2: "Il Belomorkanal consente il rapido trasferimento interno di torpediniere e sommergibili leggeri dal cantiere navale di Leningrado al Mar Bianco senza circumnavigare la Scandinavia.",
      s3_4: "Medvež'egorsk e Belomorsk sono i centri direzionali delle chiuse del canale e dei campi di lavoro dell'NKVD; addestramento di truppe da frontiera della Carelia.",
      s5: "Nel novembre 1939 la Carelia è il teatro di partenza della Guerra d'Inverno contro la Finlandia; a Terijoki viene insediato il governo fantoccio di Otto Kuusinen ('Repubblica Democratica Finlandese'). Con il Trattato di Mosca del marzo 1940 l'URSS annette l'istmo di Carelia e le terre occidentali, elevando la Carelia a 12ª Repubblica dell'URSS: la Repubblica Socialista Sovietica Carelo-Finlandese (Karelo-Finskaja SSR) guidata da Kuusinen.",
      s6: "Nel giugno-agosto 1940 la neo-costituita RSS Carelo-Finlandese riorganizza i territori annessi (Viipuri, Sortavala, Käkisalmi) evacuati dai civili finlandesi, insediando coloni russi e bielorussi.",
      s7: "Sviluppo di fortificazioni confinarie a sbarramento della nuova frontiera con la Finlandia; potenziamento della ferrovia di Kirov e delle stazioni di smistamento.",
      s8: "Alla vigilia del 22 giugno 1941, la Carelia sovietica è un fronte avanzato a diretto contatto con la Finlandia, destinato a subire l'immediata offensiva della Guerra di Continuazione finnico-tedesca.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Prionežskij (Äänisenranta — Litorale Occidentale del Lago Onega)",
    getAdminTitle: (_step: number) => "Prionežskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_266_________________": {
    id: "SOV_NW_RUS_266_________________",
    republic: "RSFSR",
    modernName: "Severomorsk (Citt\u00e0 Chiusa ZATO)",
    historicalName: "Vajenga (Severomorsk \u2014 Base Navale Principale della Flotta del Nord)",
    russianName: "Vajengskij voenno-morskoj rajon \u2014 Murmanskaya oblast",
    adminTitle: "Vajengskij Gorsovet & Comando Flotta del Nord \u2014 RSFSR (URSS)",
    capital: "Vajenga",
    keys: ["chiusa", "murmanskaya", "nw_rus_266_________________", "oblast", "rajon", "severomorsk", "sov nw rus 266                 ", "sov_nw_rus_266_________________", "vajenga", "vajengskij", "voennomorskoj"],
    notes: {
      s0: "Capitale e santuario navale dell'Artico sovietico sulla costa della penisola di Kola; porto di Murmansk libero dai ghiacci tutto l'anno grazie alla Corrente del Golfo, collegato a sud dalla ferrovia di Kirov (Kirovskaja železnaja doroga); sede a Poljarnyj del Quartier Generale della neonata Flotta del Nord (costituita nel 1933) e della base di Vajenga (Severomorsk).",
      s1: "L'Oblast di Murmansk viene istituita ufficialmente nel maggio 1938; dure purghe colpiscono i marinai e gli ingegneri navali della Flotta del Nord accusati di collusione con potenze straniere.",
      s2: "Ampliamento dei moli sommergibili a Poljarnyj e Ura-Guba per i battelli oceanici classe 'D' e 'S'; costruzione del porto commerciale e rompighiaccio di Murmansk.",
      s3_4: "La Flotta del Nord riceve nuovi cacciatorpediniere e pattugliatori per la scorta delle rotte mercantili artiche verso il Mar Bianco e la Siberia.",
      s5: "Nel novembre 1939-marzo 1940 la Flotta del Nord e la 14ª Armata conducono le operazioni della Guerra d'Inverno contro la Finlandia, occupando Petsamo e isolando la costa artica finlandese. Murmansk funge da base segreta di rifornimento navale ('Basis Nord') per i sommergibili tedeschi nell'ambito degli accordi del Patto Molotov-Ribbentrop.",
      s6: "Con la conclusione della Guerra d'Inverno e l'annessione della penisola di Rybačij (Trattato di Mosca), l'URSS blinda l'ingresso della baia di Kola; cessano gli accordi per Basis Nord.",
      s7: "Rafforzamento delle fortificazioni costiere sulla penisola dei Pescatori (Rybačij) e nei fiordi di Poljarnyj e Vajenga a presidio della Flotta del Nord.",
      s8: "Alla vigilia dell'attacco tedesco, Murmansk è una piazzaforte navale artica inespugnabile, destinata a ricevere i convogli alleati della rotta artica e a non essere mai conquistata dalle forze dell'Asse.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Vajenga (Severomorsk — Base Navale Principale della Flotta del Nord)",
    getAdminTitle: (_step: number) => "Vajengskij Gorsovet & Comando Flotta del Nord — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_267_Koskenala_District": {
    id: "SOV_NW_RUS_267_Koskenala_District",
    republic: "RSFSR",
    modernName: "Distretto di Podporo\u017e'e",
    historicalName: "Podporo\u017e'e (Koskenala \u2014 Centrale Idroelettrica dell'Alto Svir')",
    russianName: "Podporo\u017eskij rajon \u2014 Leningradskaya oblast",
    adminTitle: "Podporo\u017eskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Podporo\u017e'e",
    keys: ["leningradskaya", "nw_rus_267_koskenala_district", "oblast", "podporoe", "podporoskij", "podporož'e", "rajon", "sov nw rus 267 koskenala district", "sov_nw_rus_267_koskenala_district"],
    notes: {
      s0: "Settore orientale e fluviale dell'Oblast di Leningrado che collega la Neva, il Lago Ladoga e il fiume Svir'; comprende la storica fortezza di Šlissel'burg (Orešek), il nodo cruciale di Mga, la centrale idroelettrica pionieristica VolchovGES e le miniere di bauxite di Boksitogorsk collegate a Tichvin.",
      s1: "VolchovGES e le miniere di bauxite operano sotto rigido controllo statale per alimentare la prima industria dell'alluminio dell'URSS; epurazioni tra gli ingegneri idroelettrici.",
      s2: "Ampliamento delle chiuse e delle dighe sul fiume Svir' (Verchne-Svirskaja e Nižne-Svirskaja) lungo la rotta navigabile tra il Mar Baltico, il Ladoga e l'Onega.",
      s3_4: "Il nodo di Tichvin si consolida come crocevia ferroviario vitale che connette Leningrado con Vologda, gli Urali e le linee artiche per Murmansk e Arcangelo.",
      s5: "Durante la Guerra d'Inverno le ferrovie di Tichvin e Volchov smistano truppe, munizioni e rifornimenti alimentari continui per l'Armata Rossa sul fronte careliano.",
      s6: "Potenziamento della rete idroelettrica della Neva e delle comunicazioni navali sul Lago Ladoga; Boksitogorsk tocca quote record di estrazione di bauxite.",
      s7: "Sviluppo di difese contraeree a protezione della centrale VolchovGES e del viadotto ferroviario di Mga, arterie vitali per la sopravvivenza energetica di Leningrado.",
      s8: "Questi distretti rappresentano l'ancora vitale di rifornimento di Leningrado: la loro difesa sarà la chiave di volta per la futura apertura della 'Strada della Vita' sul Ladoga.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Podporož'e (Koskenala — Centrale Idroelettrica dell'Alto Svir')",
    getAdminTitle: (_step: number) => "Podporožskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_268_Turja_District": {
    id: "SOV_NW_RUS_268_Turja_District",
    republic: "RSFSR",
    modernName: "Distretto Terskij (Kuzomen')",
    historicalName: "Costa di Terskij (Litorale Meridionale di Kola sul Mar Bianco)",
    russianName: "Terskij rajon \u2014 Murmanskaya oblast",
    adminTitle: "Terskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Kuzomen'",
    keys: ["kuzomen", "kuzomen'", "murmanskaya", "nw_rus_268_turja_district", "oblast", "rajon", "sov nw rus 268 turja district", "sov_nw_rus_268_turja_district", "terskij"],
    notes: {
      s0: "Cuore minerario ed energetico della penisola di Kola oltre il Circolo Polare Artico; comprende il massiccio montuoso dei Chibiny con i colossali giacimenti di apatite di Kirovsk (Chibinogorsk) e Apatity, e lo stabilimento Severonikel' a Mončegorsk per l'estrazione e raffinazione di nichel e rame essenziali per la corazzatura dei carri.",
      s1: "Il lavoro forzato di decine di migliaia di detenuti del Gulag (Mončegorlag e Belbaltlag) costruisce la ferrovia elettrificata e gli altiforni di Severonikel' nella tundra subartica.",
      s2: "Inaugurazione della prima colata di nichel a Mončegorsk nel 1938; l'apatite di Kirovsk fertilizza l'intera agricoltura pianificata dell'Unione Sovietica.",
      s3_4: "Kandalakša sul Mar Bianco funge da snodo ferroviario strategico che unisce la penisola di Kola alla Carelia e a Leningrado; costruzione delle centrali idroelettriche sul fiume Niva.",
      s5: "Durante la Guerra d'Inverno, la ferrovia di Kandalakša è l'arteria su cui si muovono le armate sovietiche per l'offensiva di Salla verso il Golfo di Botnia.",
      s6: "Nel 1940 Severonikel' tocca la produzione di migliaia di tonnellate di nichel puro, materia prima vitale per le corazze del carro T-34 e del bombardiere Il-4.",
      s7: "Militarizzazione totale dei distretti minerari e allestimento di difese antiaeree attorno alle centrali idroelettriche della Niva e ai combinati chimici.",
      s8: "Questi distretti artici costituiscono il tesoro minerario e industriale della penisola di Kola, obiettivo primario dell'Operazione Silberfuchs tedesco-finlandese.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Costa di Terskij (Litorale Meridionale di Kola sul Mar Bianco)",
    getAdminTitle: (_step: number) => "Terskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_269_Kemsky_District": {
    id: "SOV_NW_RUS_269_Kemsky_District",
    republic: "RSFSR",
    modernName: "Distretto di Kem'",
    historicalName: "Kem' (Porto sul Mar Bianco \u2014 Accesso alle Isole Solovki)",
    russianName: "Kemskij rajon \u2014 Karel'skaya ASSR",
    adminTitle: "Kemskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Kem'",
    keys: ["karelskaya", "kem", "kem'", "kemskij", "nw_rus_269_kemsky_district", "rajon", "sov nw rus 269 kemsky district", "sov_nw_rus_269_kemsky_district"],
    notes: {
      s0: "Repubblica autonoma dei laghi e delle foreste della Carelia sovietica lungo la frontiera con la Finlandia; comprende la capitale Petrozavodsk sul Lago Onega (fabbrica di trattori e cannoni Onežskij Zavod), le grandi cartiere di Kondopoga e Segeža e il Canale Mar Bianco-Baltico (Belomorkanal, inaugurato nel 1933 da Stalin).",
      s1: "Dure purghe colpiscono i comunisti finlandesi 'rossi' rifugiatisi in Carelia dopo la guerra civile del 1918 (tra cui Edvard Gylling e Kustaa Rovio); la dirigenza carèlo-finlandese viene sterminata dall'NKVD.",
      s2: "Il Belomorkanal consente il rapido trasferimento interno di torpediniere e sommergibili leggeri dal cantiere navale di Leningrado al Mar Bianco senza circumnavigare la Scandinavia.",
      s3_4: "Medvež'egorsk e Belomorsk sono i centri direzionali delle chiuse del canale e dei campi di lavoro dell'NKVD; addestramento di truppe da frontiera della Carelia.",
      s5: "Nel novembre 1939 la Carelia è il teatro di partenza della Guerra d'Inverno contro la Finlandia; a Terijoki viene insediato il governo fantoccio di Otto Kuusinen ('Repubblica Democratica Finlandese'). Con il Trattato di Mosca del marzo 1940 l'URSS annette l'istmo di Carelia e le terre occidentali, elevando la Carelia a 12ª Repubblica dell'URSS: la Repubblica Socialista Sovietica Carelo-Finlandese (Karelo-Finskaja SSR) guidata da Kuusinen.",
      s6: "Nel giugno-agosto 1940 la neo-costituita RSS Carelo-Finlandese riorganizza i territori annessi (Viipuri, Sortavala, Käkisalmi) evacuati dai civili finlandesi, insediando coloni russi e bielorussi.",
      s7: "Sviluppo di fortificazioni confinarie a sbarramento della nuova frontiera con la Finlandia; potenziamento della ferrovia di Kirov e delle stazioni di smistamento.",
      s8: "Alla vigilia del 22 giugno 1941, la Carelia sovietica è un fronte avanzato a diretto contatto con la Finlandia, destinato a subire l'immediata offensiva della Guerra di Continuazione finnico-tedesca.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Kem' (Porto sul Mar Bianco — Accesso alle Isole Solovki)",
    getAdminTitle: (_step: number) => "Kemskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_271_Vsevolozhsky_District": {
    id: "SOV_NW_RUS_271_Vsevolozhsky_District",
    republic: "RSFSR",
    modernName: "Distretto di Vsevolo\u017esk",
    historicalName: "Vsevolo\u017esk (Ingria Settentrionale \u2014 Sponda Sud-Ovest del Lago Ladoga)",
    russianName: "Vsevolo\u017eskij rajon \u2014 Leningradskaya oblast",
    adminTitle: "Vsevolo\u017eskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Vsevolo\u017esk",
    keys: ["leningradskaya", "nw_rus_271_vsevolozhsky_district", "oblast", "rajon", "sov nw rus 271 vsevolozhsky district", "sov_nw_rus_271_vsevolozhsky_district", "vsevolosk", "vsevoloskij", "vsevoložsk"],
    notes: {
      s0: "Settore orientale e fluviale dell'Oblast di Leningrado che collega la Neva, il Lago Ladoga e il fiume Svir'; comprende la storica fortezza di Šlissel'burg (Orešek), il nodo cruciale di Mga, la centrale idroelettrica pionieristica VolchovGES e le miniere di bauxite di Boksitogorsk collegate a Tichvin.",
      s1: "VolchovGES e le miniere di bauxite operano sotto rigido controllo statale per alimentare la prima industria dell'alluminio dell'URSS; epurazioni tra gli ingegneri idroelettrici.",
      s2: "Ampliamento delle chiuse e delle dighe sul fiume Svir' (Verchne-Svirskaja e Nižne-Svirskaja) lungo la rotta navigabile tra il Mar Baltico, il Ladoga e l'Onega.",
      s3_4: "Il nodo di Tichvin si consolida come crocevia ferroviario vitale che connette Leningrado con Vologda, gli Urali e le linee artiche per Murmansk e Arcangelo.",
      s5: "Durante la Guerra d'Inverno le ferrovie di Tichvin e Volchov smistano truppe, munizioni e rifornimenti alimentari continui per l'Armata Rossa sul fronte careliano.",
      s6: "Potenziamento della rete idroelettrica della Neva e delle comunicazioni navali sul Lago Ladoga; Boksitogorsk tocca quote record di estrazione di bauxite.",
      s7: "Sviluppo di difese contraeree a protezione della centrale VolchovGES e del viadotto ferroviario di Mga, arterie vitali per la sopravvivenza energetica di Leningrado.",
      s8: "Questi distretti rappresentano l'ancora vitale di rifornimento di Leningrado: la loro difesa sarà la chiave di volta per la futura apertura della 'Strada della Vita' sul Ladoga.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Vsevoložsk (Ingria Settentrionale — Sponda Sud-Ovest del Lago Ladoga)",
    getAdminTitle: (_step: number) => "Vsevoložskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_272_Sosnovy_Bor": {
    id: "SOV_NW_RUS_272_Sosnovy_Bor",
    republic: "RSFSR",
    modernName: "Sosnovyj Bor (Citt\u00e0 Distrettuale)",
    historicalName: "Sosnovyj Bor (Golfo di Kopor'e \u2014 Baia Lu\u017eskaja)",
    russianName: "Sosnovoborskij rajon \u2014 Leningradskaya oblast",
    adminTitle: "Sosnovoborskij Ispolkom \u2014 RSFSR (URSS)",
    capital: "Sosnovyj Bor",
    keys: ["distrettuale", "leningradskaya", "nw_rus_272_sosnovy_bor", "oblast", "rajon", "sosnovoborskij", "sosnovyj", "sosnovyj bor", "sosnovyjbor", "sov nw rus 272 sosnovy bor", "sov_nw_rus_272_sosnovy_bor"],
    notes: {
      s0: "Distretto litoraneo meridionale del Golfo di Finlandia a presidio marittimo dell'isola-fortezza di Kronštadt e dell'accesso navale a Leningrado; sede dei formidabili forti corazzati Krasnaja Gorka e Seraja Lošad', armati con possenti torri binate da 305 mm e batterie ferroviarie pesanti TM-3-12.",
      s1: "Strettissima vigilanza dell'NKVD e del controspionaggio navale lungo le coste del golfo contro presunti infiltrati e sabotatori provenienti dall'Estonia e dalla Finlandia.",
      s2: "Ammodernamento degli apparati ottici di tiro e dei radar costieri dei forti di Kronštadt e Krasnaja Gorka per sbarrare il golfo a qualsiasi flotta ostile.",
      s3_4: "Le batterie pesanti di Krasnaja Gorka conducono esercitazioni a fuoco reale a lunga gittata sulle acque del golfo per testare le nuove tabelle balistiche.",
      s5: "Durante la Guerra d'Inverno le batterie corazzate di Krasnaja Gorka bombardano a lungo raggio i forti finlandesi dell'isola di Koivisto (Birkö) e di Ino, fornendo appoggio d'artiglieria alle divisioni dell'Armata Rossa.",
      s6: "Con l'annessione sovietica dell'Estonia (giugno 1940), le artiglierie di Oranienbaum e Kronštadt si integrano con le batterie costiere estoni di Naissaar e Aegna a chiusura totale della bocca del Golfo di Finlandia.",
      s7: "Allestimento di magazzini e bunker per munizioni pesanti e cisterne di carburante per i cacciatorpediniere e dragamine della Flotta del Baltico.",
      s8: "Il settore fortificato di Oranienbaum è pronto al combattimento; durante la futura invasione nazista non verrà mai espugnato, diventando la leggendaria 'Testa di ponte di Oranienbaum' (Oranienbaumskij placdarm).",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Sosnovyj Bor (Golfo di Kopor'e — Baia Lužskaja)",
    getAdminTitle: (_step: number) => "Sosnovoborskij Ispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_273_______________": {
    id: "SOV_NW_RUS_273_______________",
    republic: "RSFSR",
    modernName: "Ostrovnoj (Citt\u00e0 Chiusa ZATO)",
    historicalName: "Ostrovnoj (Jokanga / Gremicha \u2014 Costa di Murman sul Mare di Barents)",
    russianName: "Jokangskij rajon \u2014 Murmanskaya oblast",
    adminTitle: "Jokangskij Ispolkom & Flotta del Nord \u2014 RSFSR (URSS)",
    capital: "Jokanga",
    keys: ["chiusa", "jokanga", "jokangskij", "murmanskaya", "nw_rus_273_______________", "oblast", "ostrovnoj", "rajon", "sov nw rus 273               ", "sov_nw_rus_273_______________"],
    notes: {
      s0: "Cuore minerario ed energetico della penisola di Kola oltre il Circolo Polare Artico; comprende il massiccio montuoso dei Chibiny con i colossali giacimenti di apatite di Kirovsk (Chibinogorsk) e Apatity, e lo stabilimento Severonikel' a Mončegorsk per l'estrazione e raffinazione di nichel e rame essenziali per la corazzatura dei carri.",
      s1: "Il lavoro forzato di decine di migliaia di detenuti del Gulag (Mončegorlag e Belbaltlag) costruisce la ferrovia elettrificata e gli altiforni di Severonikel' nella tundra subartica.",
      s2: "Inaugurazione della prima colata di nichel a Mončegorsk nel 1938; l'apatite di Kirovsk fertilizza l'intera agricoltura pianificata dell'Unione Sovietica.",
      s3_4: "Kandalakša sul Mar Bianco funge da snodo ferroviario strategico che unisce la penisola di Kola alla Carelia e a Leningrado; costruzione delle centrali idroelettriche sul fiume Niva.",
      s5: "Durante la Guerra d'Inverno, la ferrovia di Kandalakša è l'arteria su cui si muovono le armate sovietiche per l'offensiva di Salla verso il Golfo di Botnia.",
      s6: "Nel 1940 Severonikel' tocca la produzione di migliaia di tonnellate di nichel puro, materia prima vitale per le corazze del carro T-34 e del bombardiere Il-4.",
      s7: "Militarizzazione totale dei distretti minerari e allestimento di difese antiaeree attorno alle centrali idroelettriche della Niva e ai combinati chimici.",
      s8: "Questi distretti artici costituiscono il tesoro minerario e industriale della penisola di Kola, obiettivo primario dell'Operazione Silberfuchs tedesco-finlandese.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Ostrovnoj (Jokanga / Gremicha — Costa di Murman sul Mare di Barents)",
    getAdminTitle: (_step: number) => "Jokangskij Ispolkom & Flotta del Nord — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_275_Olenegorsk": {
    id: "SOV_NW_RUS_275_Olenegorsk",
    republic: "RSFSR",
    modernName: "Olenegorsk (Citt\u00e0 Mineraria)",
    historicalName: "Olenegorsk (Stazione Olen'ja \u2014 Giacimenti Ferrosi di Kola)",
    russianName: "Olenegorskij rajon \u2014 Murmanskaya oblast",
    adminTitle: "Olenegorskij Ispolkom \u2014 RSFSR (URSS)",
    capital: "Olenegorsk",
    keys: ["mineraria", "murmanskaya", "nw_rus_275_olenegorsk", "oblast", "olenegorsk", "olenegorskij", "rajon", "sov nw rus 275 olenegorsk", "sov_nw_rus_275_olenegorsk"],
    notes: {
      s0: "Cuore minerario ed energetico della penisola di Kola oltre il Circolo Polare Artico; comprende il massiccio montuoso dei Chibiny con i colossali giacimenti di apatite di Kirovsk (Chibinogorsk) e Apatity, e lo stabilimento Severonikel' a Mončegorsk per l'estrazione e raffinazione di nichel e rame essenziali per la corazzatura dei carri.",
      s1: "Il lavoro forzato di decine di migliaia di detenuti del Gulag (Mončegorlag e Belbaltlag) costruisce la ferrovia elettrificata e gli altiforni di Severonikel' nella tundra subartica.",
      s2: "Inaugurazione della prima colata di nichel a Mončegorsk nel 1938; l'apatite di Kirovsk fertilizza l'intera agricoltura pianificata dell'Unione Sovietica.",
      s3_4: "Kandalakša sul Mar Bianco funge da snodo ferroviario strategico che unisce la penisola di Kola alla Carelia e a Leningrado; costruzione delle centrali idroelettriche sul fiume Niva.",
      s5: "Durante la Guerra d'Inverno, la ferrovia di Kandalakša è l'arteria su cui si muovono le armate sovietiche per l'offensiva di Salla verso il Golfo di Botnia.",
      s6: "Nel 1940 Severonikel' tocca la produzione di migliaia di tonnellate di nichel puro, materia prima vitale per le corazze del carro T-34 e del bombardiere Il-4.",
      s7: "Militarizzazione totale dei distretti minerari e allestimento di difese antiaeree attorno alle centrali idroelettriche della Niva e ai combinati chimici.",
      s8: "Questi distretti artici costituiscono il tesoro minerario e industriale della penisola di Kola, obiettivo primario dell'Operazione Silberfuchs tedesco-finlandese.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Olenegorsk (Stazione Olen'ja — Giacimenti Ferrosi di Kola)",
    getAdminTitle: (_step: number) => "Olenegorskij Ispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_276_Puutoisten_District": {
    id: "SOV_NW_RUS_276_Puutoisten_District",
    republic: "RSFSR",
    modernName: "Distretto di Pudo\u017e",
    historicalName: "Pudo\u017e (Puutoini \u2014 Sponda Orientale del Lago Onega)",
    russianName: "Pudo\u017eskij rajon \u2014 Karel'skaya ASSR",
    adminTitle: "Pudo\u017eskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Pudo\u017e",
    keys: ["karelskaya", "nw_rus_276_puutoisten_district", "pudo", "pudoskij", "pudož", "rajon", "sov nw rus 276 puutoisten district", "sov_nw_rus_276_puutoisten_district"],
    notes: {
      s0: "Repubblica autonoma dei laghi e delle foreste della Carelia sovietica lungo la frontiera con la Finlandia; comprende la capitale Petrozavodsk sul Lago Onega (fabbrica di trattori e cannoni Onežskij Zavod), le grandi cartiere di Kondopoga e Segeža e il Canale Mar Bianco-Baltico (Belomorkanal, inaugurato nel 1933 da Stalin).",
      s1: "Dure purghe colpiscono i comunisti finlandesi 'rossi' rifugiatisi in Carelia dopo la guerra civile del 1918 (tra cui Edvard Gylling e Kustaa Rovio); la dirigenza carèlo-finlandese viene sterminata dall'NKVD.",
      s2: "Il Belomorkanal consente il rapido trasferimento interno di torpediniere e sommergibili leggeri dal cantiere navale di Leningrado al Mar Bianco senza circumnavigare la Scandinavia.",
      s3_4: "Medvež'egorsk e Belomorsk sono i centri direzionali delle chiuse del canale e dei campi di lavoro dell'NKVD; addestramento di truppe da frontiera della Carelia.",
      s5: "Nel novembre 1939 la Carelia è il teatro di partenza della Guerra d'Inverno contro la Finlandia; a Terijoki viene insediato il governo fantoccio di Otto Kuusinen ('Repubblica Democratica Finlandese'). Con il Trattato di Mosca del marzo 1940 l'URSS annette l'istmo di Carelia e le terre occidentali, elevando la Carelia a 12ª Repubblica dell'URSS: la Repubblica Socialista Sovietica Carelo-Finlandese (Karelo-Finskaja SSR) guidata da Kuusinen.",
      s6: "Nel giugno-agosto 1940 la neo-costituita RSS Carelo-Finlandese riorganizza i territori annessi (Viipuri, Sortavala, Käkisalmi) evacuati dai civili finlandesi, insediando coloni russi e bielorussi.",
      s7: "Sviluppo di fortificazioni confinarie a sbarramento della nuova frontiera con la Finlandia; potenziamento della ferrovia di Kirov e delle stazioni di smistamento.",
      s8: "Alla vigilia del 22 giugno 1941, la Carelia sovietica è un fronte avanzato a diretto contatto con la Finlandia, destinato a subire l'immediata offensiva della Guerra di Continuazione finnico-tedesca.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Pudož (Puutoini — Sponda Orientale del Lago Onega)",
    getAdminTitle: (_step: number) => "Pudožskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_277_Aunus_District": {
    id: "SOV_NW_RUS_277_Aunus_District",
    republic: "RSFSR",
    modernName: "Distretto di Olonec",
    historicalName: "Olonec (Aunus \u2014 Pianura Agricola tra Ladoga e Svir')",
    russianName: "Oloneckij rajon \u2014 Karel'skaya ASSR",
    adminTitle: "Oloneckij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Olonec",
    keys: ["karelskaya", "nw_rus_277_aunus_district", "olonec", "oloneckij", "rajon", "sov nw rus 277 aunus district", "sov_nw_rus_277_aunus_district"],
    notes: {
      s0: "Repubblica autonoma dei laghi e delle foreste della Carelia sovietica lungo la frontiera con la Finlandia; comprende la capitale Petrozavodsk sul Lago Onega (fabbrica di trattori e cannoni Onežskij Zavod), le grandi cartiere di Kondopoga e Segeža e il Canale Mar Bianco-Baltico (Belomorkanal, inaugurato nel 1933 da Stalin).",
      s1: "Dure purghe colpiscono i comunisti finlandesi 'rossi' rifugiatisi in Carelia dopo la guerra civile del 1918 (tra cui Edvard Gylling e Kustaa Rovio); la dirigenza carèlo-finlandese viene sterminata dall'NKVD.",
      s2: "Il Belomorkanal consente il rapido trasferimento interno di torpediniere e sommergibili leggeri dal cantiere navale di Leningrado al Mar Bianco senza circumnavigare la Scandinavia.",
      s3_4: "Medvež'egorsk e Belomorsk sono i centri direzionali delle chiuse del canale e dei campi di lavoro dell'NKVD; addestramento di truppe da frontiera della Carelia.",
      s5: "Nel novembre 1939 la Carelia è il teatro di partenza della Guerra d'Inverno contro la Finlandia; a Terijoki viene insediato il governo fantoccio di Otto Kuusinen ('Repubblica Democratica Finlandese'). Con il Trattato di Mosca del marzo 1940 l'URSS annette l'istmo di Carelia e le terre occidentali, elevando la Carelia a 12ª Repubblica dell'URSS: la Repubblica Socialista Sovietica Carelo-Finlandese (Karelo-Finskaja SSR) guidata da Kuusinen.",
      s6: "Nel giugno-agosto 1940 la neo-costituita RSS Carelo-Finlandese riorganizza i territori annessi (Viipuri, Sortavala, Käkisalmi) evacuati dai civili finlandesi, insediando coloni russi e bielorussi.",
      s7: "Sviluppo di fortificazioni confinarie a sbarramento della nuova frontiera con la Finlandia; potenziamento della ferrovia di Kirov e delle stazioni di smistamento.",
      s8: "Alla vigilia del 22 giugno 1941, la Carelia sovietica è un fronte avanzato a diretto contatto con la Finlandia, destinato a subire l'immediata offensiva della Guerra di Continuazione finnico-tedesca.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Olonec (Aunus — Pianura Agricola tra Ladoga e Svir')",
    getAdminTitle: (_step: number) => "Oloneckij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_278_Kalevala_District": {
    id: "SOV_NW_RUS_278_Kalevala_District",
    republic: "RSFSR",
    modernName: "Distretto di Kalevala",
    historicalName: "Kalevala (Uhtua \u2014 Patria dei Canti del Poema Nazionale Kalevala)",
    russianName: "Kaleval'skij nacional'nyj rajon \u2014 Karel'skaya ASSR",
    adminTitle: "Kaleval'skij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Kalevala",
    keys: ["kalevala", "kalevalskij", "karelskaya", "nacionalnyj", "nw_rus_278_kalevala_district", "rajon", "sov nw rus 278 kalevala district", "sov_nw_rus_278_kalevala_district"],
    notes: {
      s0: "Repubblica autonoma dei laghi e delle foreste della Carelia sovietica lungo la frontiera con la Finlandia; comprende la capitale Petrozavodsk sul Lago Onega (fabbrica di trattori e cannoni Onežskij Zavod), le grandi cartiere di Kondopoga e Segeža e il Canale Mar Bianco-Baltico (Belomorkanal, inaugurato nel 1933 da Stalin).",
      s1: "Dure purghe colpiscono i comunisti finlandesi 'rossi' rifugiatisi in Carelia dopo la guerra civile del 1918 (tra cui Edvard Gylling e Kustaa Rovio); la dirigenza carèlo-finlandese viene sterminata dall'NKVD.",
      s2: "Il Belomorkanal consente il rapido trasferimento interno di torpediniere e sommergibili leggeri dal cantiere navale di Leningrado al Mar Bianco senza circumnavigare la Scandinavia.",
      s3_4: "Medvež'egorsk e Belomorsk sono i centri direzionali delle chiuse del canale e dei campi di lavoro dell'NKVD; addestramento di truppe da frontiera della Carelia.",
      s5: "Nel novembre 1939 la Carelia è il teatro di partenza della Guerra d'Inverno contro la Finlandia; a Terijoki viene insediato il governo fantoccio di Otto Kuusinen ('Repubblica Democratica Finlandese'). Con il Trattato di Mosca del marzo 1940 l'URSS annette l'istmo di Carelia e le terre occidentali, elevando la Carelia a 12ª Repubblica dell'URSS: la Repubblica Socialista Sovietica Carelo-Finlandese (Karelo-Finskaja SSR) guidata da Kuusinen.",
      s6: "Nel giugno-agosto 1940 la neo-costituita RSS Carelo-Finlandese riorganizza i territori annessi (Viipuri, Sortavala, Käkisalmi) evacuati dai civili finlandesi, insediando coloni russi e bielorussi.",
      s7: "Sviluppo di fortificazioni confinarie a sbarramento della nuova frontiera con la Finlandia; potenziamento della ferrovia di Kirov e delle stazioni di smistamento.",
      s8: "Alla vigilia del 22 giugno 1941, la Carelia sovietica è un fronte avanzato a diretto contatto con la Finlandia, destinato a subire l'immediata offensiva della Guerra di Continuazione finnico-tedesca.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Kalevala (Uhtua — Patria dei Canti del Poema Nazionale Kalevala)",
    getAdminTitle: (_step: number) => "Kaleval'skij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_279_Kontupohja_District": {
    id: "SOV_NW_RUS_279_Kontupohja_District",
    republic: "RSFSR",
    modernName: "Distretto di Kondopoga",
    historicalName: "Kondopoga (Kontupohja \u2014 Combinato della Carta e Centrale sul Lago Onega)",
    russianName: "Kondopo\u017eskij rajon \u2014 Karel'skaya ASSR",
    adminTitle: "Kondopo\u017eskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Kondopoga",
    keys: ["karelskaya", "kondopoga", "kondoposkij", "nw_rus_279_kontupohja_district", "rajon", "sov nw rus 279 kontupohja district", "sov_nw_rus_279_kontupohja_district"],
    notes: {
      s0: "Repubblica autonoma dei laghi e delle foreste della Carelia sovietica lungo la frontiera con la Finlandia; comprende la capitale Petrozavodsk sul Lago Onega (fabbrica di trattori e cannoni Onežskij Zavod), le grandi cartiere di Kondopoga e Segeža e il Canale Mar Bianco-Baltico (Belomorkanal, inaugurato nel 1933 da Stalin).",
      s1: "Dure purghe colpiscono i comunisti finlandesi 'rossi' rifugiatisi in Carelia dopo la guerra civile del 1918 (tra cui Edvard Gylling e Kustaa Rovio); la dirigenza carèlo-finlandese viene sterminata dall'NKVD.",
      s2: "Il Belomorkanal consente il rapido trasferimento interno di torpediniere e sommergibili leggeri dal cantiere navale di Leningrado al Mar Bianco senza circumnavigare la Scandinavia.",
      s3_4: "Medvež'egorsk e Belomorsk sono i centri direzionali delle chiuse del canale e dei campi di lavoro dell'NKVD; addestramento di truppe da frontiera della Carelia.",
      s5: "Nel novembre 1939 la Carelia è il teatro di partenza della Guerra d'Inverno contro la Finlandia; a Terijoki viene insediato il governo fantoccio di Otto Kuusinen ('Repubblica Democratica Finlandese'). Con il Trattato di Mosca del marzo 1940 l'URSS annette l'istmo di Carelia e le terre occidentali, elevando la Carelia a 12ª Repubblica dell'URSS: la Repubblica Socialista Sovietica Carelo-Finlandese (Karelo-Finskaja SSR) guidata da Kuusinen.",
      s6: "Nel giugno-agosto 1940 la neo-costituita RSS Carelo-Finlandese riorganizza i territori annessi (Viipuri, Sortavala, Käkisalmi) evacuati dai civili finlandesi, insediando coloni russi e bielorussi.",
      s7: "Sviluppo di fortificazioni confinarie a sbarramento della nuova frontiera con la Finlandia; potenziamento della ferrovia di Kirov e delle stazioni di smistamento.",
      s8: "Alla vigilia del 22 giugno 1941, la Carelia sovietica è un fronte avanzato a diretto contatto con la Finlandia, destinato a subire l'immediata offensiva della Guerra di Continuazione finnico-tedesca.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Kondopoga (Kontupohja — Combinato della Carta e Centrale sul Lago Onega)",
    getAdminTitle: (_step: number) => "Kondopožskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_280_Korotka_District": {
    id: "SOV_NW_RUS_280_Korotka_District",
    republic: "RSFSR",
    modernName: "Distretto di Kirovsk",
    historicalName: "Kirovsk e \u0160lissel'burg (Mga \u2014 Sbocco della Neva sul Lago Ladoga)",
    russianName: "Kirovskij rajon \u2014 Leningradskaya oblast",
    adminTitle: "Kirovskij Rajispolkom & Piazzaforte di \u0160lissel'burg \u2014 RSFSR (URSS)",
    capital: "Kirovsk",
    keys: ["kirovsk", "kirovskij", "leningradskaya", "nw_rus_280_korotka_district", "oblast", "rajon", "sov nw rus 280 korotka district", "sov_nw_rus_280_korotka_district"],
    notes: {
      s0: "Settore orientale e fluviale dell'Oblast di Leningrado che collega la Neva, il Lago Ladoga e il fiume Svir'; comprende la storica fortezza di Šlissel'burg (Orešek), il nodo cruciale di Mga, la centrale idroelettrica pionieristica VolchovGES e le miniere di bauxite di Boksitogorsk collegate a Tichvin.",
      s1: "VolchovGES e le miniere di bauxite operano sotto rigido controllo statale per alimentare la prima industria dell'alluminio dell'URSS; epurazioni tra gli ingegneri idroelettrici.",
      s2: "Ampliamento delle chiuse e delle dighe sul fiume Svir' (Verchne-Svirskaja e Nižne-Svirskaja) lungo la rotta navigabile tra il Mar Baltico, il Ladoga e l'Onega.",
      s3_4: "Il nodo di Tichvin si consolida come crocevia ferroviario vitale che connette Leningrado con Vologda, gli Urali e le linee artiche per Murmansk e Arcangelo.",
      s5: "Durante la Guerra d'Inverno le ferrovie di Tichvin e Volchov smistano truppe, munizioni e rifornimenti alimentari continui per l'Armata Rossa sul fronte careliano.",
      s6: "Potenziamento della rete idroelettrica della Neva e delle comunicazioni navali sul Lago Ladoga; Boksitogorsk tocca quote record di estrazione di bauxite.",
      s7: "Sviluppo di difese contraeree a protezione della centrale VolchovGES e del viadotto ferroviario di Mga, arterie vitali per la sopravvivenza energetica di Leningrado.",
      s8: "Questi distretti rappresentano l'ancora vitale di rifornimento di Leningrado: la loro difesa sarà la chiave di volta per la futura apertura della 'Strada della Vita' sul Ladoga.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Kirovsk e Šlissel'burg (Mga — Sbocco della Neva sul Lago Ladoga)",
    getAdminTitle: (_step: number) => "Kirovskij Rajispolkom & Piazzaforte di Šlissel'burg — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_281_Kostamus_City_District": {
    id: "SOV_NW_RUS_281_Kostamus_City_District",
    republic: "RSFSR",
    modernName: "Kostomuk\u0161a (Okrug Urbano)",
    historicalName: "Kostomuk\u0161a (Kostamus \u2014 Giacimenti di Ferro della Taiga di Frontiera)",
    russianName: "Kostomuk\u0161skij rajon \u2014 Karel'skaya ASSR",
    adminTitle: "Kostomuk\u0161skij Ispolkom \u2014 RSFSR (URSS)",
    capital: "Kostomuk\u0161a",
    keys: ["karelskaya", "kostomuka", "kostomukskij", "kostomukša", "nw_rus_281_kostamus_city_district", "okrug", "rajon", "sov nw rus 281 kostamus city district", "sov_nw_rus_281_kostamus_city_district", "urbano"],
    notes: {
      s0: "Repubblica autonoma dei laghi e delle foreste della Carelia sovietica lungo la frontiera con la Finlandia; comprende la capitale Petrozavodsk sul Lago Onega (fabbrica di trattori e cannoni Onežskij Zavod), le grandi cartiere di Kondopoga e Segeža e il Canale Mar Bianco-Baltico (Belomorkanal, inaugurato nel 1933 da Stalin).",
      s1: "Dure purghe colpiscono i comunisti finlandesi 'rossi' rifugiatisi in Carelia dopo la guerra civile del 1918 (tra cui Edvard Gylling e Kustaa Rovio); la dirigenza carèlo-finlandese viene sterminata dall'NKVD.",
      s2: "Il Belomorkanal consente il rapido trasferimento interno di torpediniere e sommergibili leggeri dal cantiere navale di Leningrado al Mar Bianco senza circumnavigare la Scandinavia.",
      s3_4: "Medvež'egorsk e Belomorsk sono i centri direzionali delle chiuse del canale e dei campi di lavoro dell'NKVD; addestramento di truppe da frontiera della Carelia.",
      s5: "Nel novembre 1939 la Carelia è il teatro di partenza della Guerra d'Inverno contro la Finlandia; a Terijoki viene insediato il governo fantoccio di Otto Kuusinen ('Repubblica Democratica Finlandese'). Con il Trattato di Mosca del marzo 1940 l'URSS annette l'istmo di Carelia e le terre occidentali, elevando la Carelia a 12ª Repubblica dell'URSS: la Repubblica Socialista Sovietica Carelo-Finlandese (Karelo-Finskaja SSR) guidata da Kuusinen.",
      s6: "Nel giugno-agosto 1940 la neo-costituita RSS Carelo-Finlandese riorganizza i territori annessi (Viipuri, Sortavala, Käkisalmi) evacuati dai civili finlandesi, insediando coloni russi e bielorussi.",
      s7: "Sviluppo di fortificazioni confinarie a sbarramento della nuova frontiera con la Finlandia; potenziamento della ferrovia di Kirov e delle stazioni di smistamento.",
      s8: "Alla vigilia del 22 giugno 1941, la Carelia sovietica è un fronte avanzato a diretto contatto con la Finlandia, destinato a subire l'immediata offensiva della Guerra di Continuazione finnico-tedesca.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Kostomukša (Kostamus — Giacimenti di Ferro della Taiga di Frontiera)",
    getAdminTitle: (_step: number) => "Kostomukšskij Ispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_284_Louhi_District": {
    id: "SOV_NW_RUS_284_Louhi_District",
    republic: "RSFSR",
    modernName: "Distretto di Louhi",
    historicalName: "Louhi (Carelia Settentrionale \u2014 Ferrovia di Kirov e Circolo Polare)",
    russianName: "Louchskij rajon \u2014 Karel'skaya ASSR",
    adminTitle: "Louchskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Louhi",
    keys: ["karelskaya", "louchskij", "louhi", "nw_rus_284_louhi_district", "rajon", "sov nw rus 284 louhi district", "sov_nw_rus_284_louhi_district"],
    notes: {
      s0: "Repubblica autonoma dei laghi e delle foreste della Carelia sovietica lungo la frontiera con la Finlandia; comprende la capitale Petrozavodsk sul Lago Onega (fabbrica di trattori e cannoni Onežskij Zavod), le grandi cartiere di Kondopoga e Segeža e il Canale Mar Bianco-Baltico (Belomorkanal, inaugurato nel 1933 da Stalin).",
      s1: "Dure purghe colpiscono i comunisti finlandesi 'rossi' rifugiatisi in Carelia dopo la guerra civile del 1918 (tra cui Edvard Gylling e Kustaa Rovio); la dirigenza carèlo-finlandese viene sterminata dall'NKVD.",
      s2: "Il Belomorkanal consente il rapido trasferimento interno di torpediniere e sommergibili leggeri dal cantiere navale di Leningrado al Mar Bianco senza circumnavigare la Scandinavia.",
      s3_4: "Medvež'egorsk e Belomorsk sono i centri direzionali delle chiuse del canale e dei campi di lavoro dell'NKVD; addestramento di truppe da frontiera della Carelia.",
      s5: "Nel novembre 1939 la Carelia è il teatro di partenza della Guerra d'Inverno contro la Finlandia; a Terijoki viene insediato il governo fantoccio di Otto Kuusinen ('Repubblica Democratica Finlandese'). Con il Trattato di Mosca del marzo 1940 l'URSS annette l'istmo di Carelia e le terre occidentali, elevando la Carelia a 12ª Repubblica dell'URSS: la Repubblica Socialista Sovietica Carelo-Finlandese (Karelo-Finskaja SSR) guidata da Kuusinen.",
      s6: "Nel giugno-agosto 1940 la neo-costituita RSS Carelo-Finlandese riorganizza i territori annessi (Viipuri, Sortavala, Käkisalmi) evacuati dai civili finlandesi, insediando coloni russi e bielorussi.",
      s7: "Sviluppo di fortificazioni confinarie a sbarramento della nuova frontiera con la Finlandia; potenziamento della ferrovia di Kirov e delle stazioni di smistamento.",
      s8: "Alla vigilia del 22 giugno 1941, la Carelia sovietica è un fronte avanzato a diretto contatto con la Finlandia, destinato a subire l'immediata offensiva della Guerra di Continuazione finnico-tedesca.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Louhi (Carelia Settentrionale — Ferrovia di Kirov e Circolo Polare)",
    getAdminTitle: (_step: number) => "Louchskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_285_Medvezhyegorsky_District": {
    id: "SOV_NW_RUS_285_Medvezhyegorsky_District",
    republic: "RSFSR",
    modernName: "Distretto di Medve\u017e'egorsk",
    historicalName: "Medve\u017e'egorsk (Kumsa \u2014 Quartier Generale del Canale Mar Bianco-Baltico)",
    russianName: "Medve\u017e'egorskij rajon \u2014 Karel'skaya ASSR",
    adminTitle: "Medve\u017e'egorskij Rajispolkom & Belomorkanal \u2014 RSFSR (URSS)",
    capital: "Medve\u017e'egorsk",
    keys: ["karelskaya", "medveegorsk", "medveegorskij", "medvež'egorsk", "nw_rus_285_medvezhyegorsky_district", "rajon", "sov nw rus 285 medvezhyegorsky district", "sov_nw_rus_285_medvezhyegorsky_district"],
    notes: {
      s0: "Repubblica autonoma dei laghi e delle foreste della Carelia sovietica lungo la frontiera con la Finlandia; comprende la capitale Petrozavodsk sul Lago Onega (fabbrica di trattori e cannoni Onežskij Zavod), le grandi cartiere di Kondopoga e Segeža e il Canale Mar Bianco-Baltico (Belomorkanal, inaugurato nel 1933 da Stalin).",
      s1: "Dure purghe colpiscono i comunisti finlandesi 'rossi' rifugiatisi in Carelia dopo la guerra civile del 1918 (tra cui Edvard Gylling e Kustaa Rovio); la dirigenza carèlo-finlandese viene sterminata dall'NKVD.",
      s2: "Il Belomorkanal consente il rapido trasferimento interno di torpediniere e sommergibili leggeri dal cantiere navale di Leningrado al Mar Bianco senza circumnavigare la Scandinavia.",
      s3_4: "Medvež'egorsk e Belomorsk sono i centri direzionali delle chiuse del canale e dei campi di lavoro dell'NKVD; addestramento di truppe da frontiera della Carelia.",
      s5: "Nel novembre 1939 la Carelia è il teatro di partenza della Guerra d'Inverno contro la Finlandia; a Terijoki viene insediato il governo fantoccio di Otto Kuusinen ('Repubblica Democratica Finlandese'). Con il Trattato di Mosca del marzo 1940 l'URSS annette l'istmo di Carelia e le terre occidentali, elevando la Carelia a 12ª Repubblica dell'URSS: la Repubblica Socialista Sovietica Carelo-Finlandese (Karelo-Finskaja SSR) guidata da Kuusinen.",
      s6: "Nel giugno-agosto 1940 la neo-costituita RSS Carelo-Finlandese riorganizza i territori annessi (Viipuri, Sortavala, Käkisalmi) evacuati dai civili finlandesi, insediando coloni russi e bielorussi.",
      s7: "Sviluppo di fortificazioni confinarie a sbarramento della nuova frontiera con la Finlandia; potenziamento della ferrovia di Kirov e delle stazioni di smistamento.",
      s8: "Alla vigilia del 22 giugno 1941, la Carelia sovietica è un fronte avanzato a diretto contatto con la Finlandia, destinato a subire l'immediata offensiva della Guerra di Continuazione finnico-tedesca.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Medvež'egorsk (Kumsa — Quartier Generale del Canale Mar Bianco-Baltico)",
    getAdminTitle: (_step: number) => "Medvež'egorskij Rajispolkom & Belomorkanal — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_286_Olhava_District": {
    id: "SOV_NW_RUS_286_Olhava_District",
    republic: "RSFSR",
    modernName: "Distretto di Volchov",
    historicalName: "Volchov (Centrale Idroelettrica VolchovGES e Fusione Alluminio)",
    russianName: "Volchovskij rajon \u2014 Leningradskaya oblast",
    adminTitle: "Volchovskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Volchov",
    keys: ["leningradskaya", "nw_rus_286_olhava_district", "oblast", "rajon", "sov nw rus 286 olhava district", "sov_nw_rus_286_olhava_district", "volchov", "volchovskij"],
    notes: {
      s0: "Settore orientale e fluviale dell'Oblast di Leningrado che collega la Neva, il Lago Ladoga e il fiume Svir'; comprende la storica fortezza di Šlissel'burg (Orešek), il nodo cruciale di Mga, la centrale idroelettrica pionieristica VolchovGES e le miniere di bauxite di Boksitogorsk collegate a Tichvin.",
      s1: "VolchovGES e le miniere di bauxite operano sotto rigido controllo statale per alimentare la prima industria dell'alluminio dell'URSS; epurazioni tra gli ingegneri idroelettrici.",
      s2: "Ampliamento delle chiuse e delle dighe sul fiume Svir' (Verchne-Svirskaja e Nižne-Svirskaja) lungo la rotta navigabile tra il Mar Baltico, il Ladoga e l'Onega.",
      s3_4: "Il nodo di Tichvin si consolida come crocevia ferroviario vitale che connette Leningrado con Vologda, gli Urali e le linee artiche per Murmansk e Arcangelo.",
      s5: "Durante la Guerra d'Inverno le ferrovie di Tichvin e Volchov smistano truppe, munizioni e rifornimenti alimentari continui per l'Armata Rossa sul fronte careliano.",
      s6: "Potenziamento della rete idroelettrica della Neva e delle comunicazioni navali sul Lago Ladoga; Boksitogorsk tocca quote record di estrazione di bauxite.",
      s7: "Sviluppo di difese contraeree a protezione della centrale VolchovGES e del viadotto ferroviario di Mga, arterie vitali per la sopravvivenza energetica di Leningrado.",
      s8: "Questi distretti rappresentano l'ancora vitale di rifornimento di Leningrado: la loro difesa sarà la chiave di volta per la futura apertura della 'Strada della Vita' sul Ladoga.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Volchov (Centrale Idroelettrica VolchovGES e Fusione Alluminio)",
    getAdminTitle: (_step: number) => "Volchovskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_287_Pr__s__District": {
    id: "SOV_NW_RUS_287_Pr__s__District",
    republic: "RSFSR",
    modernName: "Distretto di Prja\u017ea",
    historicalName: "Prja\u017ea (Pr\u00e4\u00e4s\u00e4 \u2014 Distretto dei Laghi della Carelia Meridionale)",
    russianName: "Prja\u017einskij rajon \u2014 Karel'skaya ASSR",
    adminTitle: "Prja\u017einskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Prja\u017ea",
    keys: ["karelskaya", "nw_rus_287_pr__s__district", "prjaa", "prjainskij", "prjaža", "rajon", "sov nw rus 287 pr  s  district", "sov_nw_rus_287_pr__s__district"],
    notes: {
      s0: "Repubblica autonoma dei laghi e delle foreste della Carelia sovietica lungo la frontiera con la Finlandia; comprende la capitale Petrozavodsk sul Lago Onega (fabbrica di trattori e cannoni Onežskij Zavod), le grandi cartiere di Kondopoga e Segeža e il Canale Mar Bianco-Baltico (Belomorkanal, inaugurato nel 1933 da Stalin).",
      s1: "Dure purghe colpiscono i comunisti finlandesi 'rossi' rifugiatisi in Carelia dopo la guerra civile del 1918 (tra cui Edvard Gylling e Kustaa Rovio); la dirigenza carèlo-finlandese viene sterminata dall'NKVD.",
      s2: "Il Belomorkanal consente il rapido trasferimento interno di torpediniere e sommergibili leggeri dal cantiere navale di Leningrado al Mar Bianco senza circumnavigare la Scandinavia.",
      s3_4: "Medvež'egorsk e Belomorsk sono i centri direzionali delle chiuse del canale e dei campi di lavoro dell'NKVD; addestramento di truppe da frontiera della Carelia.",
      s5: "Nel novembre 1939 la Carelia è il teatro di partenza della Guerra d'Inverno contro la Finlandia; a Terijoki viene insediato il governo fantoccio di Otto Kuusinen ('Repubblica Democratica Finlandese'). Con il Trattato di Mosca del marzo 1940 l'URSS annette l'istmo di Carelia e le terre occidentali, elevando la Carelia a 12ª Repubblica dell'URSS: la Repubblica Socialista Sovietica Carelo-Finlandese (Karelo-Finskaja SSR) guidata da Kuusinen.",
      s6: "Nel giugno-agosto 1940 la neo-costituita RSS Carelo-Finlandese riorganizza i territori annessi (Viipuri, Sortavala, Käkisalmi) evacuati dai civili finlandesi, insediando coloni russi e bielorussi.",
      s7: "Sviluppo di fortificazioni confinarie a sbarramento della nuova frontiera con la Finlandia; potenziamento della ferrovia di Kirov e delle stazioni di smistamento.",
      s8: "Alla vigilia del 22 giugno 1941, la Carelia sovietica è un fronte avanzato a diretto contatto con la Finlandia, destinato a subire l'immediata offensiva della Guerra di Continuazione finnico-tedesca.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Prjaža (Prääsä — Distretto dei Laghi della Carelia Meridionale)",
    getAdminTitle: (_step: number) => "Prjažinskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_288_Sorokka_District": {
    id: "SOV_NW_RUS_288_Sorokka_District",
    republic: "RSFSR",
    modernName: "Distretto di Belomorsk",
    historicalName: "Belomorsk (Soroka \u2014 Sbocco Marittimo del Canale Mar Bianco-Baltico)",
    russianName: "Belomorskij rajon \u2014 Karel'skaya ASSR",
    adminTitle: "Belomorskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Belomorsk",
    keys: ["belomorsk", "belomorskij", "karelskaya", "nw_rus_288_sorokka_district", "rajon", "sov nw rus 288 sorokka district", "sov_nw_rus_288_sorokka_district"],
    notes: {
      s0: "Repubblica autonoma dei laghi e delle foreste della Carelia sovietica lungo la frontiera con la Finlandia; comprende la capitale Petrozavodsk sul Lago Onega (fabbrica di trattori e cannoni Onežskij Zavod), le grandi cartiere di Kondopoga e Segeža e il Canale Mar Bianco-Baltico (Belomorkanal, inaugurato nel 1933 da Stalin).",
      s1: "Dure purghe colpiscono i comunisti finlandesi 'rossi' rifugiatisi in Carelia dopo la guerra civile del 1918 (tra cui Edvard Gylling e Kustaa Rovio); la dirigenza carèlo-finlandese viene sterminata dall'NKVD.",
      s2: "Il Belomorkanal consente il rapido trasferimento interno di torpediniere e sommergibili leggeri dal cantiere navale di Leningrado al Mar Bianco senza circumnavigare la Scandinavia.",
      s3_4: "Medvež'egorsk e Belomorsk sono i centri direzionali delle chiuse del canale e dei campi di lavoro dell'NKVD; addestramento di truppe da frontiera della Carelia.",
      s5: "Nel novembre 1939 la Carelia è il teatro di partenza della Guerra d'Inverno contro la Finlandia; a Terijoki viene insediato il governo fantoccio di Otto Kuusinen ('Repubblica Democratica Finlandese'). Con il Trattato di Mosca del marzo 1940 l'URSS annette l'istmo di Carelia e le terre occidentali, elevando la Carelia a 12ª Repubblica dell'URSS: la Repubblica Socialista Sovietica Carelo-Finlandese (Karelo-Finskaja SSR) guidata da Kuusinen.",
      s6: "Nel giugno-agosto 1940 la neo-costituita RSS Carelo-Finlandese riorganizza i territori annessi (Viipuri, Sortavala, Käkisalmi) evacuati dai civili finlandesi, insediando coloni russi e bielorussi.",
      s7: "Sviluppo di fortificazioni confinarie a sbarramento della nuova frontiera con la Finlandia; potenziamento della ferrovia di Kirov e delle stazioni di smistamento.",
      s8: "Alla vigilia del 22 giugno 1941, la Carelia sovietica è un fronte avanzato a diretto contatto con la Finlandia, destinato a subire l'immediata offensiva della Guerra di Continuazione finnico-tedesca.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Belomorsk (Soroka — Sbocco Marittimo del Canale Mar Bianco-Baltico)",
    getAdminTitle: (_step: number) => "Belomorskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_291_Tihvin__District": {
    id: "SOV_NW_RUS_291_Tihvin__District",
    republic: "RSFSR",
    modernName: "Distretto di Tichvin",
    historicalName: "Tichvin (Nodo Ferroviario Transcontinentale per gli Urali e Arcangelo)",
    russianName: "Tichvinskij rajon \u2014 Leningradskaya oblast",
    adminTitle: "Tichvinskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Tichvin",
    keys: ["leningradskaya", "nw_rus_291_tihvin__district", "oblast", "rajon", "sov nw rus 291 tihvin  district", "sov_nw_rus_291_tihvin__district", "tichvin", "tichvinskij"],
    notes: {
      s0: "Settore orientale e fluviale dell'Oblast di Leningrado che collega la Neva, il Lago Ladoga e il fiume Svir'; comprende la storica fortezza di Šlissel'burg (Orešek), il nodo cruciale di Mga, la centrale idroelettrica pionieristica VolchovGES e le miniere di bauxite di Boksitogorsk collegate a Tichvin.",
      s1: "VolchovGES e le miniere di bauxite operano sotto rigido controllo statale per alimentare la prima industria dell'alluminio dell'URSS; epurazioni tra gli ingegneri idroelettrici.",
      s2: "Ampliamento delle chiuse e delle dighe sul fiume Svir' (Verchne-Svirskaja e Nižne-Svirskaja) lungo la rotta navigabile tra il Mar Baltico, il Ladoga e l'Onega.",
      s3_4: "Il nodo di Tichvin si consolida come crocevia ferroviario vitale che connette Leningrado con Vologda, gli Urali e le linee artiche per Murmansk e Arcangelo.",
      s5: "Durante la Guerra d'Inverno le ferrovie di Tichvin e Volchov smistano truppe, munizioni e rifornimenti alimentari continui per l'Armata Rossa sul fronte careliano.",
      s6: "Potenziamento della rete idroelettrica della Neva e delle comunicazioni navali sul Lago Ladoga; Boksitogorsk tocca quote record di estrazione di bauxite.",
      s7: "Sviluppo di difese contraeree a protezione della centrale VolchovGES e del viadotto ferroviario di Mga, arterie vitali per la sopravvivenza energetica di Leningrado.",
      s8: "Questi distretti rappresentano l'ancora vitale di rifornimento di Leningrado: la loro difesa sarà la chiave di volta per la futura apertura della 'Strada della Vita' sul Ladoga.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Tichvin (Nodo Ferroviario Transcontinentale per gli Urali e Arcangelo)",
    getAdminTitle: (_step: number) => "Tichvinskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_292_Vidyayevo": {
    id: "SOV_NW_RUS_292_Vidyayevo",
    republic: "RSFSR",
    modernName: "Vidjaevo (Citt\u00e0 Chiusa ZATO)",
    historicalName: "Ura-Guba (Vidjaevo \u2014 Base Sommergibili del Mare di Barents)",
    russianName: "Ura-Gubskij rajon \u2014 Murmanskaya oblast",
    adminTitle: "Ura-Gubskij Ispolkom & Flotta del Nord \u2014 RSFSR (URSS)",
    capital: "Ura-Guba",
    keys: ["chiusa", "murmanskaya", "nw_rus_292_vidyayevo", "oblast", "rajon", "sov nw rus 292 vidyayevo", "sov_nw_rus_292_vidyayevo", "ura-guba", "uraguba", "uragubskij", "vidjaevo"],
    notes: {
      s0: "Capitale e santuario navale dell'Artico sovietico sulla costa della penisola di Kola; porto di Murmansk libero dai ghiacci tutto l'anno grazie alla Corrente del Golfo, collegato a sud dalla ferrovia di Kirov (Kirovskaja železnaja doroga); sede a Poljarnyj del Quartier Generale della neonata Flotta del Nord (costituita nel 1933) e della base di Vajenga (Severomorsk).",
      s1: "L'Oblast di Murmansk viene istituita ufficialmente nel maggio 1938; dure purghe colpiscono i marinai e gli ingegneri navali della Flotta del Nord accusati di collusione con potenze straniere.",
      s2: "Ampliamento dei moli sommergibili a Poljarnyj e Ura-Guba per i battelli oceanici classe 'D' e 'S'; costruzione del porto commerciale e rompighiaccio di Murmansk.",
      s3_4: "La Flotta del Nord riceve nuovi cacciatorpediniere e pattugliatori per la scorta delle rotte mercantili artiche verso il Mar Bianco e la Siberia.",
      s5: "Nel novembre 1939-marzo 1940 la Flotta del Nord e la 14ª Armata conducono le operazioni della Guerra d'Inverno contro la Finlandia, occupando Petsamo e isolando la costa artica finlandese. Murmansk funge da base segreta di rifornimento navale ('Basis Nord') per i sommergibili tedeschi nell'ambito degli accordi del Patto Molotov-Ribbentrop.",
      s6: "Con la conclusione della Guerra d'Inverno e l'annessione della penisola di Rybačij (Trattato di Mosca), l'URSS blinda l'ingresso della baia di Kola; cessano gli accordi per Basis Nord.",
      s7: "Rafforzamento delle fortificazioni costiere sulla penisola dei Pescatori (Rybačij) e nei fiordi di Poljarnyj e Vajenga a presidio della Flotta del Nord.",
      s8: "Alla vigilia dell'attacco tedesco, Murmansk è una piazzaforte navale artica inespugnabile, destinata a ricevere i convogli alleati della rotta artica e a non essere mai conquistata dalle forze dell'Asse.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Ura-Guba (Vidjaevo — Base Sommergibili del Mare di Barents)",
    getAdminTitle: (_step: number) => "Ura-Gubskij Ispolkom & Flotta del Nord — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_293_Volosovsky_District": {
    id: "SOV_NW_RUS_293_Volosovsky_District",
    republic: "RSFSR",
    modernName: "Distretto di Volosovo",
    historicalName: "Volosovo (Altopiano di I\u017eora \u2014 Ingria Sud-Occidentale)",
    russianName: "Volosovskij rajon \u2014 Leningradskaya oblast",
    adminTitle: "Volosovskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Volosovo",
    keys: ["leningradskaya", "nw_rus_293_volosovsky_district", "oblast", "rajon", "sov nw rus 293 volosovsky district", "sov_nw_rus_293_volosovsky_district", "volosovo", "volosovskij"],
    notes: {
      s0: "Nodo ferroviario e militare strategico a sud di Leningrado, attraversato dalle direttrici principali verso Pskov, Novgorod e Mosca; sede di grandi caserme della guarnigione militare e dell'aerodromo militare di Krasnogvardejsk (Gatčina, ribattezzata 'Città della Guardia Rossa' tra il 1929 e il 1944).",
      s1: "Dure purghe colpiscono il personale ferroviario e gli ufficiali dell'aviazione dislocati a Krasnogvardejsk e Tosno sotto accusa di 'spionaggio trotskista'.",
      s2: "Potenziamento delle rampe di sbarco merci e dei doppi binari elettrificati lungo la ferrovia Oktjabr'skaja per garantire il flusso di carichi pesanti verso Leningrado.",
      s3_4: "Esercitazioni delle divisioni motorizzate dell'Armata Rossa e delle squadriglie da caccia I-16 e I-153 del Distretto Militare di Leningrado.",
      s5: "Transito continuo di convogli militari e treni ospedale durante la campagna invernale careliana contro le linee difensive finlandesi.",
      s6: "Ampliamento dei depositi logistici e delle officine di revisione locomotive a Krasnogvardejsk e Tosno a supporto del fronte nord-occidentale.",
      s7: "Istituzione di posti di blocco e avvio delle prime opere di fortificazione campale lungo le linee ferroviarie meridionali.",
      s8: "Questi distretti costituiscono i cardini della mobilità su rotaia e della concentrazione delle riserve a protezione della seconda capitale sovietica.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Volosovo (Altopiano di Ižora — Ingria Sud-Occidentale)",
    getAdminTitle: (_step: number) => "Volosovskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_294________________________": {
    id: "SOV_NW_RUS_294________________________",
    republic: "RSFSR",
    modernName: "Apatity (Citt\u00e0 Industriale)",
    historicalName: "Apatity (Monti Chibiny \u2014 Estrazione Minerale di Apatite e Fosfati)",
    russianName: "Apatitskij rajon \u2014 Murmanskaya oblast",
    adminTitle: "Apatitskij Gorsovet \u2014 RSFSR (URSS)",
    capital: "Apatity",
    keys: ["apatitskij", "apatity", "industriale", "murmanskaya", "nw_rus_294________________________", "oblast", "rajon", "sov nw rus 294                        ", "sov_nw_rus_294________________________"],
    notes: {
      s0: "Cuore minerario ed energetico della penisola di Kola oltre il Circolo Polare Artico; comprende il massiccio montuoso dei Chibiny con i colossali giacimenti di apatite di Kirovsk (Chibinogorsk) e Apatity, e lo stabilimento Severonikel' a Mončegorsk per l'estrazione e raffinazione di nichel e rame essenziali per la corazzatura dei carri.",
      s1: "Il lavoro forzato di decine di migliaia di detenuti del Gulag (Mončegorlag e Belbaltlag) costruisce la ferrovia elettrificata e gli altiforni di Severonikel' nella tundra subartica.",
      s2: "Inaugurazione della prima colata di nichel a Mončegorsk nel 1938; l'apatite di Kirovsk fertilizza l'intera agricoltura pianificata dell'Unione Sovietica.",
      s3_4: "Kandalakša sul Mar Bianco funge da snodo ferroviario strategico che unisce la penisola di Kola alla Carelia e a Leningrado; costruzione delle centrali idroelettriche sul fiume Niva.",
      s5: "Durante la Guerra d'Inverno, la ferrovia di Kandalakša è l'arteria su cui si muovono le armate sovietiche per l'offensiva di Salla verso il Golfo di Botnia.",
      s6: "Nel 1940 Severonikel' tocca la produzione di migliaia di tonnellate di nichel puro, materia prima vitale per le corazze del carro T-34 e del bombardiere Il-4.",
      s7: "Militarizzazione totale dei distretti minerari e allestimento di difese antiaeree attorno alle centrali idroelettriche della Niva e ai combinati chimici.",
      s8: "Questi distretti artici costituiscono il tesoro minerario e industriale della penisola di Kola, obiettivo primario dell'Operazione Silberfuchs tedesco-finlandese.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Apatity (Monti Chibiny — Estrazione Minerale di Apatite e Fosfati)",
    getAdminTitle: (_step: number) => "Apatitskij Gorsovet — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_295___________________________": {
    id: "SOV_NW_RUS_295___________________________",
    republic: "RSFSR",
    modernName: "Mon\u010degorsk (Citt\u00e0 Mineraria)",
    historicalName: "Mon\u010degorsk (Stabilimento Severonikel' \u2014 Mon\u010da-Tundra)",
    russianName: "Mon\u010degorskij Gorsovet \u2014 Murmanskaya oblast",
    adminTitle: "Mon\u010degorskij Gorsovet \u2014 RSFSR (URSS)",
    capital: "Mon\u010degorsk",
    keys: ["gorsovet", "mineraria", "monegorsk", "monegorskij", "mončegorsk", "murmanskaya", "nw_rus_295___________________________", "oblast", "sov nw rus 295                           ", "sov_nw_rus_295___________________________"],
    notes: {
      s0: "Cuore minerario ed energetico della penisola di Kola oltre il Circolo Polare Artico; comprende il massiccio montuoso dei Chibiny con i colossali giacimenti di apatite di Kirovsk (Chibinogorsk) e Apatity, e lo stabilimento Severonikel' a Mončegorsk per l'estrazione e raffinazione di nichel e rame essenziali per la corazzatura dei carri.",
      s1: "Il lavoro forzato di decine di migliaia di detenuti del Gulag (Mončegorlag e Belbaltlag) costruisce la ferrovia elettrificata e gli altiforni di Severonikel' nella tundra subartica.",
      s2: "Inaugurazione della prima colata di nichel a Mončegorsk nel 1938; l'apatite di Kirovsk fertilizza l'intera agricoltura pianificata dell'Unione Sovietica.",
      s3_4: "Kandalakša sul Mar Bianco funge da snodo ferroviario strategico che unisce la penisola di Kola alla Carelia e a Leningrado; costruzione delle centrali idroelettriche sul fiume Niva.",
      s5: "Durante la Guerra d'Inverno, la ferrovia di Kandalakša è l'arteria su cui si muovono le armate sovietiche per l'offensiva di Salla verso il Golfo di Botnia.",
      s6: "Nel 1940 Severonikel' tocca la produzione di migliaia di tonnellate di nichel puro, materia prima vitale per le corazze del carro T-34 e del bombardiere Il-4.",
      s7: "Militarizzazione totale dei distretti minerari e allestimento di difese antiaeree attorno alle centrali idroelettriche della Niva e ai combinati chimici.",
      s8: "Questi distretti artici costituiscono il tesoro minerario e industriale della penisola di Kola, obiettivo primario dell'Operazione Silberfuchs tedesco-finlandese.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Mončegorsk (Stabilimento Severonikel' — Monča-Tundra)",
    getAdminTitle: (_step: number) => "Mončegorskij Gorsovet — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_297_Murmansk": {
    id: "SOV_NW_RUS_297_Murmansk",
    republic: "RSFSR",
    modernName: "Murmansk (Citt\u00e0 Capoluogo)",
    historicalName: "Murmansk (Porto Artico Libero dai Ghiacci \u2014 Fjord di Kola)",
    russianName: "Gorod Murmansk",
    adminTitle: "Murmanskij Gorsovet & Distretto Militare di Murmansk \u2014 RSFSR (URSS)",
    capital: "Murmansk",
    keys: ["capoluogo", "gorod", "murmansk", "nw_rus_297_murmansk", "sov nw rus 297 murmansk", "sov_nw_rus_297_murmansk"],
    notes: {
      s0: "Capitale e santuario navale dell'Artico sovietico sulla costa della penisola di Kola; porto di Murmansk libero dai ghiacci tutto l'anno grazie alla Corrente del Golfo, collegato a sud dalla ferrovia di Kirov (Kirovskaja železnaja doroga); sede a Poljarnyj del Quartier Generale della neonata Flotta del Nord (costituita nel 1933) e della base di Vajenga (Severomorsk).",
      s1: "L'Oblast di Murmansk viene istituita ufficialmente nel maggio 1938; dure purghe colpiscono i marinai e gli ingegneri navali della Flotta del Nord accusati di collusione con potenze straniere.",
      s2: "Ampliamento dei moli sommergibili a Poljarnyj e Ura-Guba per i battelli oceanici classe 'D' e 'S'; costruzione del porto commerciale e rompighiaccio di Murmansk.",
      s3_4: "La Flotta del Nord riceve nuovi cacciatorpediniere e pattugliatori per la scorta delle rotte mercantili artiche verso il Mar Bianco e la Siberia.",
      s5: "Nel novembre 1939-marzo 1940 la Flotta del Nord e la 14ª Armata conducono le operazioni della Guerra d'Inverno contro la Finlandia, occupando Petsamo e isolando la costa artica finlandese. Murmansk funge da base segreta di rifornimento navale ('Basis Nord') per i sommergibili tedeschi nell'ambito degli accordi del Patto Molotov-Ribbentrop.",
      s6: "Con la conclusione della Guerra d'Inverno e l'annessione della penisola di Rybačij (Trattato di Mosca), l'URSS blinda l'ingresso della baia di Kola; cessano gli accordi per Basis Nord.",
      s7: "Rafforzamento delle fortificazioni costiere sulla penisola dei Pescatori (Rybačij) e nei fiordi di Poljarnyj e Vajenga a presidio della Flotta del Nord.",
      s8: "Alla vigilia dell'attacco tedesco, Murmansk è una piazzaforte navale artica inespugnabile, destinata a ricevere i convogli alleati della rotta artica e a non essere mai conquistata dalle forze dell'Asse.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Murmansk (Porto Artico Libero dai Ghiacci — Fjord di Kola)",
    getAdminTitle: (_step: number) => "Murmanskij Gorsovet & Distretto Militare di Murmansk — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_298_Segezhsky_District": {
    id: "SOV_NW_RUS_298_Segezhsky_District",
    republic: "RSFSR",
    modernName: "Distretto di Sege\u017ea",
    historicalName: "Sege\u017ea (Lago Vygozero \u2014 Grande Fabbrica di Cellulosa e Carta Sege\u017eskij)",
    russianName: "Sege\u017eskij rajon \u2014 Karel'skaya ASSR",
    adminTitle: "Sege\u017eskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Sege\u017ea",
    keys: ["karelskaya", "nw_rus_298_segezhsky_district", "rajon", "segea", "segeskij", "segeža", "sov nw rus 298 segezhsky district", "sov_nw_rus_298_segezhsky_district"],
    notes: {
      s0: "Repubblica autonoma dei laghi e delle foreste della Carelia sovietica lungo la frontiera con la Finlandia; comprende la capitale Petrozavodsk sul Lago Onega (fabbrica di trattori e cannoni Onežskij Zavod), le grandi cartiere di Kondopoga e Segeža e il Canale Mar Bianco-Baltico (Belomorkanal, inaugurato nel 1933 da Stalin).",
      s1: "Dure purghe colpiscono i comunisti finlandesi 'rossi' rifugiatisi in Carelia dopo la guerra civile del 1918 (tra cui Edvard Gylling e Kustaa Rovio); la dirigenza carèlo-finlandese viene sterminata dall'NKVD.",
      s2: "Il Belomorkanal consente il rapido trasferimento interno di torpediniere e sommergibili leggeri dal cantiere navale di Leningrado al Mar Bianco senza circumnavigare la Scandinavia.",
      s3_4: "Medvež'egorsk e Belomorsk sono i centri direzionali delle chiuse del canale e dei campi di lavoro dell'NKVD; addestramento di truppe da frontiera della Carelia.",
      s5: "Nel novembre 1939 la Carelia è il teatro di partenza della Guerra d'Inverno contro la Finlandia; a Terijoki viene insediato il governo fantoccio di Otto Kuusinen ('Repubblica Democratica Finlandese'). Con il Trattato di Mosca del marzo 1940 l'URSS annette l'istmo di Carelia e le terre occidentali, elevando la Carelia a 12ª Repubblica dell'URSS: la Repubblica Socialista Sovietica Carelo-Finlandese (Karelo-Finskaja SSR) guidata da Kuusinen.",
      s6: "Nel giugno-agosto 1940 la neo-costituita RSS Carelo-Finlandese riorganizza i territori annessi (Viipuri, Sortavala, Käkisalmi) evacuati dai civili finlandesi, insediando coloni russi e bielorussi.",
      s7: "Sviluppo di fortificazioni confinarie a sbarramento della nuova frontiera con la Finlandia; potenziamento della ferrovia di Kirov e delle stazioni di smistamento.",
      s8: "Alla vigilia del 22 giugno 1941, la Carelia sovietica è un fronte avanzato a diretto contatto con la Finlandia, destinato a subire l'immediata offensiva della Guerra di Continuazione finnico-tedesca.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Segeža (Lago Vygozero — Grande Fabbrica di Cellulosa e Carta Segežskij)",
    getAdminTitle: (_step: number) => "Segežskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_299_Polyarnye_Zori_Urban_Okrug": {
    id: "SOV_NW_RUS_299_Polyarnye_Zori_Urban_Okrug",
    republic: "RSFSR",
    modernName: "Poljarnye Zori (Okrug Urbano)",
    historicalName: "Zasseeek (Poljarnye Zori \u2014 Cascate della Niva e Lago Imandra)",
    russianName: "Nivskij rajon \u2014 Murmanskaya oblast",
    adminTitle: "Nivskij Ispolkom \u2014 RSFSR (URSS)",
    capital: "Zasseeek",
    keys: ["murmanskaya", "nivskij", "nw_rus_299_polyarnye_zori_urban_okrug", "oblast", "okrug", "poljarnye", "rajon", "sov nw rus 299 polyarnye zori urban okrug", "sov_nw_rus_299_polyarnye_zori_urban_okrug", "urbano", "zasseeek"],
    notes: {
      s0: "Cuore minerario ed energetico della penisola di Kola oltre il Circolo Polare Artico; comprende il massiccio montuoso dei Chibiny con i colossali giacimenti di apatite di Kirovsk (Chibinogorsk) e Apatity, e lo stabilimento Severonikel' a Mončegorsk per l'estrazione e raffinazione di nichel e rame essenziali per la corazzatura dei carri.",
      s1: "Il lavoro forzato di decine di migliaia di detenuti del Gulag (Mončegorlag e Belbaltlag) costruisce la ferrovia elettrificata e gli altiforni di Severonikel' nella tundra subartica.",
      s2: "Inaugurazione della prima colata di nichel a Mončegorsk nel 1938; l'apatite di Kirovsk fertilizza l'intera agricoltura pianificata dell'Unione Sovietica.",
      s3_4: "Kandalakša sul Mar Bianco funge da snodo ferroviario strategico che unisce la penisola di Kola alla Carelia e a Leningrado; costruzione delle centrali idroelettriche sul fiume Niva.",
      s5: "Durante la Guerra d'Inverno, la ferrovia di Kandalakša è l'arteria su cui si muovono le armate sovietiche per l'offensiva di Salla verso il Golfo di Botnia.",
      s6: "Nel 1940 Severonikel' tocca la produzione di migliaia di tonnellate di nichel puro, materia prima vitale per le corazze del carro T-34 e del bombardiere Il-4.",
      s7: "Militarizzazione totale dei distretti minerari e allestimento di difese antiaeree attorno alle centrali idroelettriche della Niva e ai combinati chimici.",
      s8: "Questi distretti artici costituiscono il tesoro minerario e industriale della penisola di Kola, obiettivo primario dell'Operazione Silberfuchs tedesco-finlandese.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Zasseeek (Poljarnye Zori — Cascate della Niva e Lago Imandra)",
    getAdminTitle: (_step: number) => "Nivskij Ispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_300_Alexandrovsk__Murmansk_Oblast": {
    id: "SOV_NW_RUS_300_Alexandrovsk__Murmansk_Oblast",
    republic: "RSFSR",
    modernName: "Aleksandrovsk (Poljarnyj \u2014 Okrug Chiuso ZATO)",
    historicalName: "Poljarnyj (Aleksandrovsk \u2014 Quartier Generale Navale Flotta del Nord)",
    russianName: "Poljarnyj voenno-morskoj rajon \u2014 Murmanskaya oblast",
    adminTitle: "Poljarnyj Gorsovet & QG Flotta del Nord \u2014 RSFSR (URSS)",
    capital: "Poljarnyj",
    keys: ["aleksandrovsk", "chiuso", "murmanskaya", "nw_rus_300_alexandrovsk__murmansk_oblast", "oblast", "okrug", "poljarnyj", "rajon", "sov nw rus 300 alexandrovsk  murmansk oblast", "sov_nw_rus_300_alexandrovsk__murmansk_oblast", "voennomorskoj"],
    notes: {
      s0: "Capitale e santuario navale dell'Artico sovietico sulla costa della penisola di Kola; porto di Murmansk libero dai ghiacci tutto l'anno grazie alla Corrente del Golfo, collegato a sud dalla ferrovia di Kirov (Kirovskaja železnaja doroga); sede a Poljarnyj del Quartier Generale della neonata Flotta del Nord (costituita nel 1933) e della base di Vajenga (Severomorsk).",
      s1: "L'Oblast di Murmansk viene istituita ufficialmente nel maggio 1938; dure purghe colpiscono i marinai e gli ingegneri navali della Flotta del Nord accusati di collusione con potenze straniere.",
      s2: "Ampliamento dei moli sommergibili a Poljarnyj e Ura-Guba per i battelli oceanici classe 'D' e 'S'; costruzione del porto commerciale e rompighiaccio di Murmansk.",
      s3_4: "La Flotta del Nord riceve nuovi cacciatorpediniere e pattugliatori per la scorta delle rotte mercantili artiche verso il Mar Bianco e la Siberia.",
      s5: "Nel novembre 1939-marzo 1940 la Flotta del Nord e la 14ª Armata conducono le operazioni della Guerra d'Inverno contro la Finlandia, occupando Petsamo e isolando la costa artica finlandese. Murmansk funge da base segreta di rifornimento navale ('Basis Nord') per i sommergibili tedeschi nell'ambito degli accordi del Patto Molotov-Ribbentrop.",
      s6: "Con la conclusione della Guerra d'Inverno e l'annessione della penisola di Rybačij (Trattato di Mosca), l'URSS blinda l'ingresso della baia di Kola; cessano gli accordi per Basis Nord.",
      s7: "Rafforzamento delle fortificazioni costiere sulla penisola dei Pescatori (Rybačij) e nei fiordi di Poljarnyj e Vajenga a presidio della Flotta del Nord.",
      s8: "Alla vigilia dell'attacco tedesco, Murmansk è una piazzaforte navale artica inespugnabile, destinata a ricevere i convogli alleati della rotta artica e a non essere mai conquistata dalle forze dell'Asse.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Poljarnyj (Aleksandrovsk — Quartier Generale Navale Flotta del Nord)",
    getAdminTitle: (_step: number) => "Poljarnyj Gorsovet & QG Flotta del Nord — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_301_Boksitogorsky_District": {
    id: "SOV_NW_RUS_301_Boksitogorsky_District",
    republic: "RSFSR",
    modernName: "Distretto di Boksitogorsk",
    historicalName: "Boksitogorsk (Miniere di Bauxite Tichvinskie \u2014 Fabbrica d'Allumina)",
    russianName: "Boksitogorskij rajon \u2014 Leningradskaya oblast",
    adminTitle: "Boksitogorskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Boksitogorsk",
    keys: ["boksitogorsk", "boksitogorskij", "leningradskaya", "nw_rus_301_boksitogorsky_district", "oblast", "rajon", "sov nw rus 301 boksitogorsky district", "sov_nw_rus_301_boksitogorsky_district"],
    notes: {
      s0: "Settore orientale e fluviale dell'Oblast di Leningrado che collega la Neva, il Lago Ladoga e il fiume Svir'; comprende la storica fortezza di Šlissel'burg (Orešek), il nodo cruciale di Mga, la centrale idroelettrica pionieristica VolchovGES e le miniere di bauxite di Boksitogorsk collegate a Tichvin.",
      s1: "VolchovGES e le miniere di bauxite operano sotto rigido controllo statale per alimentare la prima industria dell'alluminio dell'URSS; epurazioni tra gli ingegneri idroelettrici.",
      s2: "Ampliamento delle chiuse e delle dighe sul fiume Svir' (Verchne-Svirskaja e Nižne-Svirskaja) lungo la rotta navigabile tra il Mar Baltico, il Ladoga e l'Onega.",
      s3_4: "Il nodo di Tichvin si consolida come crocevia ferroviario vitale che connette Leningrado con Vologda, gli Urali e le linee artiche per Murmansk e Arcangelo.",
      s5: "Durante la Guerra d'Inverno le ferrovie di Tichvin e Volchov smistano truppe, munizioni e rifornimenti alimentari continui per l'Armata Rossa sul fronte careliano.",
      s6: "Potenziamento della rete idroelettrica della Neva e delle comunicazioni navali sul Lago Ladoga; Boksitogorsk tocca quote record di estrazione di bauxite.",
      s7: "Sviluppo di difese contraeree a protezione della centrale VolchovGES e del viadotto ferroviario di Mga, arterie vitali per la sopravvivenza energetica di Leningrado.",
      s8: "Questi distretti rappresentano l'ancora vitale di rifornimento di Leningrado: la loro difesa sarà la chiave di volta per la futura apertura della 'Strada della Vita' sul Ladoga.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Boksitogorsk (Miniere di Bauxite Tichvinskie — Fabbrica d'Allumina)",
    getAdminTitle: (_step: number) => "Boksitogorskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_302_Lotinapelto_District": {
    id: "SOV_NW_RUS_302_Lotinapelto_District",
    republic: "RSFSR",
    modernName: "Distretto di Lodejnoe Pole",
    historicalName: "Lodejnoe Pole (Fiume Svir' \u2014 Centrale Idroelettrica Ni\u017ene-Svirskaja)",
    russianName: "Lodejnopol'skij rajon \u2014 Leningradskaya oblast",
    adminTitle: "Lodejnopol'skij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Lodejnoe Pole",
    keys: ["leningradskaya", "lodejnoe", "lodejnoe pole", "lodejnoepole", "lodejnopolskij", "nw_rus_302_lotinapelto_district", "oblast", "rajon", "sov nw rus 302 lotinapelto district", "sov_nw_rus_302_lotinapelto_district"],
    notes: {
      s0: "Settore orientale e fluviale dell'Oblast di Leningrado che collega la Neva, il Lago Ladoga e il fiume Svir'; comprende la storica fortezza di Šlissel'burg (Orešek), il nodo cruciale di Mga, la centrale idroelettrica pionieristica VolchovGES e le miniere di bauxite di Boksitogorsk collegate a Tichvin.",
      s1: "VolchovGES e le miniere di bauxite operano sotto rigido controllo statale per alimentare la prima industria dell'alluminio dell'URSS; epurazioni tra gli ingegneri idroelettrici.",
      s2: "Ampliamento delle chiuse e delle dighe sul fiume Svir' (Verchne-Svirskaja e Nižne-Svirskaja) lungo la rotta navigabile tra il Mar Baltico, il Ladoga e l'Onega.",
      s3_4: "Il nodo di Tichvin si consolida come crocevia ferroviario vitale che connette Leningrado con Vologda, gli Urali e le linee artiche per Murmansk e Arcangelo.",
      s5: "Durante la Guerra d'Inverno le ferrovie di Tichvin e Volchov smistano truppe, munizioni e rifornimenti alimentari continui per l'Armata Rossa sul fronte careliano.",
      s6: "Potenziamento della rete idroelettrica della Neva e delle comunicazioni navali sul Lago Ladoga; Boksitogorsk tocca quote record di estrazione di bauxite.",
      s7: "Sviluppo di difese contraeree a protezione della centrale VolchovGES e del viadotto ferroviario di Mga, arterie vitali per la sopravvivenza energetica di Leningrado.",
      s8: "Questi distretti rappresentano l'ancora vitale di rifornimento di Leningrado: la loro difesa sarà la chiave di volta per la futura apertura della 'Strada della Vita' sul Ladoga.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Lodejnoe Pole (Fiume Svir' — Centrale Idroelettrica Nižne-Svirskaja)",
    getAdminTitle: (_step: number) => "Lodejnopol'skij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_303________________________": {
    id: "SOV_NW_RUS_303________________________",
    republic: "RSFSR",
    modernName: "Kirovsk (Monti Chibiny)",
    historicalName: "Kirovsk (Chibinogorsk \u2014 Centro Minerario di Fertirrigazione dell'URSS)",
    russianName: "Kirovskij Gorsovet \u2014 Murmanskaya oblast",
    adminTitle: "Kirovskij Gorsovet \u2014 RSFSR (URSS)",
    capital: "Kirovsk",
    keys: ["chibiny", "gorsovet", "kirovsk", "kirovskij", "monti", "murmanskaya", "nw_rus_303________________________", "oblast", "sov nw rus 303                        ", "sov_nw_rus_303________________________"],
    notes: {
      s0: "Cuore minerario ed energetico della penisola di Kola oltre il Circolo Polare Artico; comprende il massiccio montuoso dei Chibiny con i colossali giacimenti di apatite di Kirovsk (Chibinogorsk) e Apatity, e lo stabilimento Severonikel' a Mončegorsk per l'estrazione e raffinazione di nichel e rame essenziali per la corazzatura dei carri.",
      s1: "Il lavoro forzato di decine di migliaia di detenuti del Gulag (Mončegorlag e Belbaltlag) costruisce la ferrovia elettrificata e gli altiforni di Severonikel' nella tundra subartica.",
      s2: "Inaugurazione della prima colata di nichel a Mončegorsk nel 1938; l'apatite di Kirovsk fertilizza l'intera agricoltura pianificata dell'Unione Sovietica.",
      s3_4: "Kandalakša sul Mar Bianco funge da snodo ferroviario strategico che unisce la penisola di Kola alla Carelia e a Leningrado; costruzione delle centrali idroelettriche sul fiume Niva.",
      s5: "Durante la Guerra d'Inverno, la ferrovia di Kandalakša è l'arteria su cui si muovono le armate sovietiche per l'offensiva di Salla verso il Golfo di Botnia.",
      s6: "Nel 1940 Severonikel' tocca la produzione di migliaia di tonnellate di nichel puro, materia prima vitale per le corazze del carro T-34 e del bombardiere Il-4.",
      s7: "Militarizzazione totale dei distretti minerari e allestimento di difese antiaeree attorno alle centrali idroelettriche della Niva e ai combinati chimici.",
      s8: "Questi distretti artici costituiscono il tesoro minerario e industriale della penisola di Kola, obiettivo primario dell'Operazione Silberfuchs tedesco-finlandese.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Kirovsk (Chibinogorsk — Centro Minerario di Fertirrigazione dell'URSS)",
    getAdminTitle: (_step: number) => "Kirovskij Gorsovet — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_304_Kirishsky_District": {
    id: "SOV_NW_RUS_304_Kirishsky_District",
    republic: "RSFSR",
    modernName: "Distretto di Kiri\u0161i",
    historicalName: "Kiri\u0161i (Bacino Fluviale del Basso Volchov \u2014 Asse Mga-\u010cudovo)",
    russianName: "Kiri\u0161skij rajon \u2014 Leningradskaya oblast",
    adminTitle: "Kiri\u0161skij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Kiri\u0161i",
    keys: ["kirii", "kiriskij", "kiriši", "leningradskaya", "nw_rus_304_kirishsky_district", "oblast", "rajon", "sov nw rus 304 kirishsky district", "sov_nw_rus_304_kirishsky_district"],
    notes: {
      s0: "Settore orientale e fluviale dell'Oblast di Leningrado che collega la Neva, il Lago Ladoga e il fiume Svir'; comprende la storica fortezza di Šlissel'burg (Orešek), il nodo cruciale di Mga, la centrale idroelettrica pionieristica VolchovGES e le miniere di bauxite di Boksitogorsk collegate a Tichvin.",
      s1: "VolchovGES e le miniere di bauxite operano sotto rigido controllo statale per alimentare la prima industria dell'alluminio dell'URSS; epurazioni tra gli ingegneri idroelettrici.",
      s2: "Ampliamento delle chiuse e delle dighe sul fiume Svir' (Verchne-Svirskaja e Nižne-Svirskaja) lungo la rotta navigabile tra il Mar Baltico, il Ladoga e l'Onega.",
      s3_4: "Il nodo di Tichvin si consolida come crocevia ferroviario vitale che connette Leningrado con Vologda, gli Urali e le linee artiche per Murmansk e Arcangelo.",
      s5: "Durante la Guerra d'Inverno le ferrovie di Tichvin e Volchov smistano truppe, munizioni e rifornimenti alimentari continui per l'Armata Rossa sul fronte careliano.",
      s6: "Potenziamento della rete idroelettrica della Neva e delle comunicazioni navali sul Lago Ladoga; Boksitogorsk tocca quote record di estrazione di bauxite.",
      s7: "Sviluppo di difese contraeree a protezione della centrale VolchovGES e del viadotto ferroviario di Mga, arterie vitali per la sopravvivenza energetica di Leningrado.",
      s8: "Questi distretti rappresentano l'ancora vitale di rifornimento di Leningrado: la loro difesa sarà la chiave di volta per la futura apertura della 'Strada della Vita' sul Ladoga.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Kiriši (Bacino Fluviale del Basso Volchov — Asse Mga-Čudovo)",
    getAdminTitle: (_step: number) => "Kirišskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_305_Luuj_rvi_District": {
    id: "SOV_NW_RUS_305_Luuj_rvi_District",
    republic: "RSFSR",
    modernName: "Distretto di Lovozero",
    historicalName: "Lovozero (Luuj\u00e4vr \u2014 Tundra Lappone e Allevamento di Renne dei Sami)",
    russianName: "Lovo\u017eerskij rajon \u2014 Murmanskaya oblast",
    adminTitle: "Lovo\u017eerskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Lovozero",
    keys: ["lovoerskij", "lovozero", "murmanskaya", "nw_rus_305_luuj_rvi_district", "oblast", "rajon", "sov nw rus 305 luuj rvi district", "sov_nw_rus_305_luuj_rvi_district"],
    notes: {
      s0: "Cuore minerario ed energetico della penisola di Kola oltre il Circolo Polare Artico; comprende il massiccio montuoso dei Chibiny con i colossali giacimenti di apatite di Kirovsk (Chibinogorsk) e Apatity, e lo stabilimento Severonikel' a Mončegorsk per l'estrazione e raffinazione di nichel e rame essenziali per la corazzatura dei carri.",
      s1: "Il lavoro forzato di decine di migliaia di detenuti del Gulag (Mončegorlag e Belbaltlag) costruisce la ferrovia elettrificata e gli altiforni di Severonikel' nella tundra subartica.",
      s2: "Inaugurazione della prima colata di nichel a Mončegorsk nel 1938; l'apatite di Kirovsk fertilizza l'intera agricoltura pianificata dell'Unione Sovietica.",
      s3_4: "Kandalakša sul Mar Bianco funge da snodo ferroviario strategico che unisce la penisola di Kola alla Carelia e a Leningrado; costruzione delle centrali idroelettriche sul fiume Niva.",
      s5: "Durante la Guerra d'Inverno, la ferrovia di Kandalakša è l'arteria su cui si muovono le armate sovietiche per l'offensiva di Salla verso il Golfo di Botnia.",
      s6: "Nel 1940 Severonikel' tocca la produzione di migliaia di tonnellate di nichel puro, materia prima vitale per le corazze del carro T-34 e del bombardiere Il-4.",
      s7: "Militarizzazione totale dei distretti minerari e allestimento di difese antiaeree attorno alle centrali idroelettriche della Niva e ai combinati chimici.",
      s8: "Questi distretti artici costituiscono il tesoro minerario e industriale della penisola di Kola, obiettivo primario dell'Operazione Silberfuchs tedesco-finlandese.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Lovozero (Luujävr — Tundra Lappone e Allevamento di Renne dei Sami)",
    getAdminTitle: (_step: number) => "Lovožerskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_306_Jaama_District": {
    id: "SOV_NW_RUS_306_Jaama_District",
    republic: "RSFSR",
    modernName: "Distretto di Kingisepp",
    historicalName: "Kingisepp (Jamburg \u2014 Distretto di Frontiera sul Fiume Luga)",
    russianName: "Kingiseppskij rajon \u2014 Leningradskaya oblast",
    adminTitle: "Kingiseppskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Kingisepp",
    keys: ["kingisepp", "kingiseppskij", "leningradskaya", "nw_rus_306_jaama_district", "oblast", "rajon", "sov nw rus 306 jaama district", "sov_nw_rus_306_jaama_district"],
    notes: {
      s0: "Fascia occidentale e sud-occidentale dell'Oblast di Leningrado lungo il fiume Luga e il confine di stato con la Repubblica di Estonia stabilito dal Trattato di Tartu del 1920; comprende il bacino minerario degli scisti bituminosi di Slancy e la città fortificata di Kingisepp (Jamburg).",
      s1: "Presidio fortificato di frontiera dell'Armata Rossa e delle truppe confinarie dell'NKVD; chiusura rigorosa della zona di frontiera con l'Estonia e arresto di presunti contrabbandieri.",
      s2: "Sviluppo dell'estrazione di scisti combustibili a Slancy per alimentare la produzione di gas e combustibile per le centrali elettriche di Leningrado.",
      s3_4: "Manovre militari e collaudo di fortificazioni in calcestruzzo lungo il fiume Luga per sbarrare le direttrici d'invasione dai paesi baltici.",
      s5: "Durante la Guerra d'Inverno il settore funge da retrovia di sicurezza; le truppe di frontiera sorvegliano il confine estone durante le trattative per le basi sovietiche.",
      s6: "Nel giugno 1940 le divisioni dell'Armata Rossa varcano la frontiera a Kingisepp e Narva per occupare l'Estonia; il confine di Tartu viene declassato a linea amministrativa interna all'URSS.",
      s7: "Gli ingegneri militari sovietici avviano i rilievi per la linea difensiva campale del 'Lužskij Rubež' (Linea di Luga) imperniata sul corso del fiume.",
      s8: "Alla vigilia di Barbarossa, Luga e Kingisepp sono allertate come prima e seconda linea difensiva campale contro un'eventuale penetrazione corazzata tedesca verso Leningrado.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Kingisepp (Jamburg — Distretto di Frontiera sul Fiume Luga)",
    getAdminTitle: (_step: number) => "Kingiseppskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_307_Luzhsky_District": {
    id: "SOV_NW_RUS_307_Luzhsky_District",
    republic: "RSFSR",
    modernName: "Distretto di Luga",
    historicalName: "Luga (Linea Difensiva Fortificata di Luga / Lu\u017eskij Rube\u017e)",
    russianName: "Lu\u017eskij rajon \u2014 Leningradskaya oblast",
    adminTitle: "Lu\u017eskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Luga",
    keys: ["leningradskaya", "luga", "luskij", "nw_rus_307_luzhsky_district", "oblast", "rajon", "sov nw rus 307 luzhsky district", "sov_nw_rus_307_luzhsky_district"],
    notes: {
      s0: "Fascia occidentale e sud-occidentale dell'Oblast di Leningrado lungo il fiume Luga e il confine di stato con la Repubblica di Estonia stabilito dal Trattato di Tartu del 1920; comprende il bacino minerario degli scisti bituminosi di Slancy e la città fortificata di Kingisepp (Jamburg).",
      s1: "Presidio fortificato di frontiera dell'Armata Rossa e delle truppe confinarie dell'NKVD; chiusura rigorosa della zona di frontiera con l'Estonia e arresto di presunti contrabbandieri.",
      s2: "Sviluppo dell'estrazione di scisti combustibili a Slancy per alimentare la produzione di gas e combustibile per le centrali elettriche di Leningrado.",
      s3_4: "Manovre militari e collaudo di fortificazioni in calcestruzzo lungo il fiume Luga per sbarrare le direttrici d'invasione dai paesi baltici.",
      s5: "Durante la Guerra d'Inverno il settore funge da retrovia di sicurezza; le truppe di frontiera sorvegliano il confine estone durante le trattative per le basi sovietiche.",
      s6: "Nel giugno 1940 le divisioni dell'Armata Rossa varcano la frontiera a Kingisepp e Narva per occupare l'Estonia; il confine di Tartu viene declassato a linea amministrativa interna all'URSS.",
      s7: "Gli ingegneri militari sovietici avviano i rilievi per la linea difensiva campale del 'Lužskij Rubež' (Linea di Luga) imperniata sul corso del fiume.",
      s8: "Alla vigilia di Barbarossa, Luga e Kingisepp sono allertate come prima e seconda linea difensiva campale contro un'eventuale penetrazione corazzata tedesca verso Leningrado.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Luga (Linea Difensiva Fortificata di Luga / Lužskij Rubež)",
    getAdminTitle: (_step: number) => "Lužskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_308_Kantalahti_District": {
    id: "SOV_NW_RUS_308_Kantalahti_District",
    republic: "RSFSR",
    modernName: "Distretto di Kandalak\u0161a",
    historicalName: "Kandalak\u0161a (Golfo di Kandalak\u0161a \u2014 Ferrovia Artica di Murmansk)",
    russianName: "Kandalak\u0161skij rajon \u2014 Murmanskaya oblast",
    adminTitle: "Kandalak\u0161skij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Kandalak\u0161a",
    keys: ["kandalaka", "kandalakskij", "kandalakša", "murmanskaya", "nw_rus_308_kantalahti_district", "oblast", "rajon", "sov nw rus 308 kantalahti district", "sov_nw_rus_308_kantalahti_district"],
    notes: {
      s0: "Cuore minerario ed energetico della penisola di Kola oltre il Circolo Polare Artico; comprende il massiccio montuoso dei Chibiny con i colossali giacimenti di apatite di Kirovsk (Chibinogorsk) e Apatity, e lo stabilimento Severonikel' a Mončegorsk per l'estrazione e raffinazione di nichel e rame essenziali per la corazzatura dei carri.",
      s1: "Il lavoro forzato di decine di migliaia di detenuti del Gulag (Mončegorlag e Belbaltlag) costruisce la ferrovia elettrificata e gli altiforni di Severonikel' nella tundra subartica.",
      s2: "Inaugurazione della prima colata di nichel a Mončegorsk nel 1938; l'apatite di Kirovsk fertilizza l'intera agricoltura pianificata dell'Unione Sovietica.",
      s3_4: "Kandalakša sul Mar Bianco funge da snodo ferroviario strategico che unisce la penisola di Kola alla Carelia e a Leningrado; costruzione delle centrali idroelettriche sul fiume Niva.",
      s5: "Durante la Guerra d'Inverno, la ferrovia di Kandalakša è l'arteria su cui si muovono le armate sovietiche per l'offensiva di Salla verso il Golfo di Botnia.",
      s6: "Nel 1940 Severonikel' tocca la produzione di migliaia di tonnellate di nichel puro, materia prima vitale per le corazze del carro T-34 e del bombardiere Il-4.",
      s7: "Militarizzazione totale dei distretti minerari e allestimento di difese antiaeree attorno alle centrali idroelettriche della Niva e ai combinati chimici.",
      s8: "Questi distretti artici costituiscono il tesoro minerario e industriale della penisola di Kola, obiettivo primario dell'Operazione Silberfuchs tedesco-finlandese.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Kandalakša (Golfo di Kandalakša — Ferrovia Artica di Murmansk)",
    getAdminTitle: (_step: number) => "Kandalakšskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
  "SOV_NW_RUS_309_Kovdor_District": {
    id: "SOV_NW_RUS_309_Kovdor_District",
    republic: "RSFSR",
    modernName: "Distretto di Kovdor",
    historicalName: "Kovdor (Giacimenti di Magnetite e Vermiculite di Frontiera)",
    russianName: "Kovdorskij rajon \u2014 Murmanskaya oblast",
    adminTitle: "Kovdorskij Rajispolkom \u2014 RSFSR (URSS)",
    capital: "Kovdor",
    keys: ["kovdor", "kovdorskij", "murmanskaya", "nw_rus_309_kovdor_district", "oblast", "rajon", "sov nw rus 309 kovdor district", "sov_nw_rus_309_kovdor_district"],
    notes: {
      s0: "Cuore minerario ed energetico della penisola di Kola oltre il Circolo Polare Artico; comprende il massiccio montuoso dei Chibiny con i colossali giacimenti di apatite di Kirovsk (Chibinogorsk) e Apatity, e lo stabilimento Severonikel' a Mončegorsk per l'estrazione e raffinazione di nichel e rame essenziali per la corazzatura dei carri.",
      s1: "Il lavoro forzato di decine di migliaia di detenuti del Gulag (Mončegorlag e Belbaltlag) costruisce la ferrovia elettrificata e gli altiforni di Severonikel' nella tundra subartica.",
      s2: "Inaugurazione della prima colata di nichel a Mončegorsk nel 1938; l'apatite di Kirovsk fertilizza l'intera agricoltura pianificata dell'Unione Sovietica.",
      s3_4: "Kandalakša sul Mar Bianco funge da snodo ferroviario strategico che unisce la penisola di Kola alla Carelia e a Leningrado; costruzione delle centrali idroelettriche sul fiume Niva.",
      s5: "Durante la Guerra d'Inverno, la ferrovia di Kandalakša è l'arteria su cui si muovono le armate sovietiche per l'offensiva di Salla verso il Golfo di Botnia.",
      s6: "Nel 1940 Severonikel' tocca la produzione di migliaia di tonnellate di nichel puro, materia prima vitale per le corazze del carro T-34 e del bombardiere Il-4.",
      s7: "Militarizzazione totale dei distretti minerari e allestimento di difese antiaeree attorno alle centrali idroelettriche della Niva e ai combinati chimici.",
      s8: "Questi distretti artici costituiscono il tesoro minerario e industriale della penisola di Kola, obiettivo primario dell'Operazione Silberfuchs tedesco-finlandese.",
    },
    getOwner: (_step: number) => 'SOV',
    getFaction: (_step: number) => 'Comintern',
    getHistoricalName: (_step: number) => "Kovdor (Giacimenti di Magnetite e Vermiculite di Frontiera)",
    getAdminTitle: (_step: number) => "Kovdorskij Rajispolkom — RSFSR (URSS)",
    getNote: function(step: number) {
      if (step <= 0) return this.notes.s0;
      if (step === 1) return this.notes.s1;
      if (step === 2) return this.notes.s2;
      if (step <= 4) return this.notes.s3_4;
      if (step === 5) return this.notes.s5;
      if (step === 6) return this.notes.s6;
      if (step === 7) return this.notes.s7;
      return this.notes.s8;
    },
  },
};

const SOVIET_INDEX = new Map<string, SovietProvinceInfo>();

for (const item of Object.values(SOVIET_PROVINCES_META)) {
  SOVIET_INDEX.set(item.id.toLowerCase(), item);
  const cleanId = item.id.replace(/^SOV_(ADM1_)?[A-Z]{3}_\d+_?/, '').toLowerCase();
  if (cleanId) SOVIET_INDEX.set(cleanId, item);
  for (const k of item.keys) {
    if (!SOVIET_INDEX.has(k)) {
      SOVIET_INDEX.set(k, item);
    }
  }
}

/**
 * Risolve un'entita territoriale sovietica per ID o toponimo allo step temporale specificato.
 */
export function resolveSovietProvince(
  idOrName: string,
  step: number = 0,
  rawName?: string
): ResolvedTerritory | null {
  if (!idOrName) return null;

  // 1. Ricerca esatta per ID
  let meta = SOVIET_PROVINCES_META[idOrName];

  // 2. Ricerca per chiave indicizzata minuscola
  if (!meta) {
    const low = idOrName.toLowerCase().trim();
    meta = SOVIET_INDEX.get(low) || null as any;
  }

  // 3. Ricerca per toponimo rawName
  if (!meta && rawName) {
    const lowRaw = rawName.toLowerCase().trim();
    meta = SOVIET_INDEX.get(lowRaw) || null as any;
  }

  // 4. Ricerca per corrispondenza parziale nei toponimi moderni o storici
  if (!meta) {
    const target = (rawName || idOrName).toLowerCase();
    for (const item of Object.values(SOVIET_PROVINCES_META)) {
      const mod = item.modernName.toLowerCase();
      const hist = item.historicalName.toLowerCase();
      const cap = item.capital.toLowerCase();
      if (
        (cap.length > 3 && target.includes(cap)) ||
        (mod.length > 4 && target.includes(mod)) ||
        (hist.length > 4 && target.includes(hist))
      ) {
        meta = item;
        break;
      }
    }
  }

  if (!meta) return null;

  return makeResult(
    meta.getOwner(step),
    meta.getHistoricalName(step),
    meta.getNote(step),
    meta.getFaction(step),
    meta.getAdminTitle(step)
  );
}

/**
 * Popola il dizionario toponomastico storico globale con le 239 entita sovietiche.
 */
export function populateSovietToponyms(dict: Record<string, any>): void {
  const countryCodes = ['SOV', 'SU', 'RU', 'UA', 'BY', 'KZ', 'UZ', 'TM', 'TJ', 'KG', 'GE', 'AM', 'AZ', 'TUV'];
  for (const c of countryCodes) {
    if (!dict[c]) dict[c] = {};
  }

  for (const [id, item] of Object.entries(SOVIET_PROVINCES_META)) {
    const match = {
      historicalName: item.historicalName,
      adminTitle: item.adminTitle,
      historicalNote: item.notes.s0,
      name: item.historicalName,
      modernName: item.modernName,
      region: item.republic,
      capital: item.capital,
      note: item.notes.s0,
      dynamicNote: (step: number) => item.getNote(step),
    };

    const normId = id.toLowerCase();
    const cleanId = id.replace(/^SOV_(ADM1_)?[A-Z]{3}_\d+_?/, '').toLowerCase();

    dict['SOV'][normId] = match;
    dict['SU'][normId] = match;
    if (cleanId) {
      dict['SOV'][cleanId] = match;
      dict['SU'][cleanId] = match;
    }

    for (const k of item.keys) {
      dict['SOV'][k] = match;
      dict['SU'][k] = match;
    }
  }
}
