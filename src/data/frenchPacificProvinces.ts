/**
 * Censimento Geocartografico e Toponomastico di Precisione del Pacifico Francese (1936-1945)
 * 
 * Copertura esaustiva e rigorosa delle entità francesi dell'Oceania:
 * 1. Établissements Français de l'Océanie / Polinesia Francese (PF_POLYNESIA)
 *    - Arcipelaghi: Società (Tahiti, Moorea, Bora Bora, Raiatea, Huahine), Tuamotu, Gambier, Marchesi, Australi.
 *    - Capoluogo coloniale: Papeete (Tahiti).
 *    - Presidio e Base Operazione "Bobcat" USA: Bora Bora (aeroporto Motu Mute, idroscalo, batterie costiere).
 *    - Forza di spedizione d'oltremare: Bataillon du Pacifique (BP 1 / BIMP) formato dai "Tamarii Volontaires",
 *      eroico a Bir Hakeim (1942), sul Garigliano (1944) e nello sbarco in Provenza (Compagnons de la Libération).
 * 
 * 2. Nouvelle-Calédonie et Dépendances (NC_CALEDONIA / New Caledonia)
 *    - Capoluogo: Nouméa. Miniere di nichel di Thio, ralliement di Henri Sautot (sett. 1940),
 *      Quartier Generale supremo USA South Pacific Area (Base 44) per la Campagna di Guadalcanal.
 * 
 * 3. Condominium des Nouvelles-Hébrides (NH_HEBRIDES / New Hebrides)
 *    - Condominio Franco-Britannico, capoluogo Port-Vila. Primo ralliement alla France Libre (20 luglio 1940).
 *      Gigantesca base navale e aerea alleata di Espiritu Santo (Base Buttons / White).
 * 
 * 4. Wallis-et-Futuna (WF_WALLIS_FUTUNA / Wallis and Futuna Islands)
 *    - Protettorato di Mata-Utu, leale a Vichy fino al 27 maggio 1942; ralliement da parte dell'aviso FNFL Chevreuil
 *      e basi aeree Seabees USA a Hihifo.
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

export interface FrenchPacificDossier {
  id: string;
  modernName: string;
  archipelago: string;
  getHistoricalName: (s: number) => string;
  getAdminTitle: (s: number) => string;
  getNote: (s: number) => string;
  getOwner: (s: number) => string;
}

export const FRENCH_PACIFIC_META: Record<string, FrenchPacificDossier> = {
  PF_POLYNESIA: {
    id: 'PF_POLYNESIA',
    modernName: 'Polinesia Francese (Tahiti, Moorea, Bora Bora & Arcipelaghi Polinesiani)',
    archipelago: 'Archipelaghes de la Société, Tuamotu, Gambier, Marquises, Australes',
    getOwner: (s: number) => {
      if (s <= 5) return 'F_COL';
      if (s === 6) return 'VIC';
      if (s <= 13) return 'FFL_AEF'; // FFL coalition code compatible with App tests
      return 'FRA'; // GPRF / Quarta Repubblica francese riunificata
    },
    getHistoricalName: (s: number) => {
      if (s <= 5) return "Établissements Français de l'Océanie (Tahiti & Papeete)";
      if (s === 6) return "Établissements Français de l'Océanie (Crisi dell'Armistizio & Rifiuto di Vichy)";
      if (s === 7) return "Établissements Français de l'Océanie (France Libre — Tahiti)";
      if (s <= 9) return "Établissements Français de l'Océanie (I Tamarii del Bataillon du Pacifique)";
      if (s <= 12) return "Établissements Français de l'Océanie (Base Navale USA \"Bobcat\" — Bora Bora)";
      if (s === 13) return "Établissements Français de l'Océanie (Roccaforte Logistica del Pacifico & BIMP)";
      if (s <= 17) return "Établissements Français de l'Océanie (GPRF — Il BIMP sul Fronte Europeo)";
      return "Établissements Français de l'Océanie (Vittoria nel Pacifico & Eroi del BIMP)";
    },
    getAdminTitle: (s: number) => {
      if (s <= 5) return "Colonie des Établissements Français de l'Océanie (Gouverneur Jean Chastenet de Géry — Papeete)";
      if (s === 6) return "Comité de la France Libre d'Océanie (Papeete — Rifiuto dell'Armistizio di Vichy)";
      if (s === 7) return "Ralliés à la France Libre par Plébiscite (2 Settembre 1940 — Gouverneur Émile de Curton)";
      if (s <= 9) return "Forces Françaises Libres dans le Pacifique (Commandant Félix Broche & BIMP)";
      if (s <= 12) return "US Navy Forward Base \"Bobcat\" & Gouvernement des EFO (Gouverneur Georges Orselli)";
      if (s === 13) return "Haut-Commissariat de la France Libre dans le Pacifique (Gouverneur Georges Orselli)";
      if (s <= 17) return "Gouvernement Provisoire de la République Française (Gouverneur Jean-Charles Schwarz)";
      return "Territoire d'Outre-Mer de la République Française (Chef-lieu Papeete)";
    },
    getNote: (s: number) => {
      if (s <= 5) {
        return "Colonia d'oltremare francese del Pacifico meridionale con sede di governo a Papeete sull'isola di Tahiti. La giurisdizione abbraccia cinque grandi arcipelaghi: le Isole della Società (isole del Vento tra cui Tahiti e Moorea, e isole Sottovento con Bora Bora e Raiatea), le Tuamotu, le Gambier, le Isole Marchesi e le Isole Australi. Punto d'appoggio navale transoceanico e centro d'esportazione di copra, vaniglia, madreperla e dei fosfati dell'atollo di Makatea.";
      }
      if (s === 6) {
        return "All'annuncio dell'armistizio franco-tedesco del 22 giugno 1940, la popolazione tahitiana e i notabili coloniali di Papeete rifiutano categoricamente la capitolazione di Vichy. Sotto l'impulso del medico militare Émile de Curton, dell'ex sindaco Georges Bambridge, di Édouard Ahnne e del capitano d'infanteria coloniale Félix Broche, si costituisce il 'Comité de la France Libre', che isola il governatore Jean Chastenet de Géry e proclama la volontà incrollabile di proseguire la lotta armata contro l'Asse al fianco del generale De Gaulle e dell'Impero Britannico.";
      }
      if (s === 7) {
        return "2 Settembre 1940: Primo plebiscito democratico della Seconda Guerra Mondiale! Con uno schiacciante risultato di 5.564 voti a favore e soli 18 contrari, la popolazione della Polinesia approva il ralliement immediato alla Francia Libera. Il governatore Chastenet de Géry cede formalmente i poteri a un consiglio di governo provvisorio presieduto dal dottor Émile de Curton. Il capitano Félix Broche assume il comando militare della colonia e avvia l'arruolamento dei 'Tamarii Volontaires' polinesiani, costituendo il nucleo originario del leggendario Bataillon du Pacifique.";
      }
      if (s <= 9) {
        return "Il 21 aprile 1941, oltre 300 volontari polinesiani (i celebri Tamarii Volontaires) salpano dal molo di Papeete a bordo del mercantile neozelandese Monowai tra l'entusiasmo oceanico dell'intera popolazione. Raggiunta la Nuova Caledonia e poi l'Australia, i polinesiani si fondono con i commilitoni caledoniani ed ebridesi formando il 1er Bataillon d'Infanterie de Marine du Pacifique (BP 1) sotto il comando del tenente colonnello Félix Broche. Addestrati in Palestina e in Egitto, i fanti di marina polinesiani entrano in linea nella 1ª Brigata Francese Libera del generale Marie-Pierre Kœnig.";
      }
      if (s <= 12) {
        return "Nel febbraio 1942, in seguito all'attacco giapponese a Pearl Harbor, gli Alleati avviano l'imponente Operazione Bobcat: 4.500 militari e Seabees della US Navy sbarcano a Bora Bora per costruire una colossale base logistica e di rifornimento aeronavale (la prima pista d'atterraggio polinesiana a Motu Mute, idroscalo, depositi carburante e 8 cannoni pesanti costieri da 7 pollici sui rilievi dell'isola) a protezione vitale della rotta convogli USA-Australia. Contemporaneamente, nel deserto libico a Bir Hakeim (27 maggio - 11 giugno 1942), il Bataillon du Pacifique compie un'eroica resistenza contro le Panzerdivisionen dell'Afrikakorps di Rommel; il comandante Félix Broche cade gloriosamente sul campo col valore dei suoi uomini.";
      }
      if (s === 13) {
        return "Settembre 1943: la base Bobcat di Bora Bora garantisce il flusso ininterrotto di convogli navali, carburante e bombardieri alleati attraverso il Pacifico meridionale verso il fronte delle Salomone e della Nuova Guinea. I veterani polinesiani superstiti di Bir Hakeim e della campagna di Libia e Tunisia vengono fusi con il Bataillon de Marche n° 1 nel Bataillon d'Infanterie de Marine et du Pacifique (BIMP), preparandosi allo sbarco in Europa inquadrati nella 1ère Division Française Libre (1ère DFL).";
      }
      if (s <= 17) {
        return "Con la costituzione del Governo Provvisorio della Repubblica Francese (GPRF), la Polinesia rientra sotto l'autorità della Repubblica Francese sovrana. Sul teatro europeo, il BIMP scrive pagine memorabili di gloria militare: sfondamento della Linea Gustav sul Garigliano (maggio 1944), espugnazione della roccaforte del Belvedere e di Montefiascone, sbarco in Provenza (Operazione Dragoon, agosto 1944) con la liberazione di Tolone, Hyères e Lione, fino ai sanguinosi combattimenti invernali nell'Authion alpino. 76 polinesiani cadono in combattimento e il battaglione riceve la prestigiosa Croix de la Libération (Compagnons de la Libération).";
      }
      return "2 Settembre 1945: con la resa incondizionata dell'Impero Giapponese nella Baia di Tokyo, la pace trionfa nel Pacifico e nel mondo. Gli Établissements Français de l'Océanie accolgono a Papeete il rientro trionfale dei Tamarii del Bataillon du Pacifique, celebrati come eroi dell'indipendenza e dell'onore nazionale. La US Navy smobilita pacificamente la base 'Bobcat' lasciando in eredità a Bora Bora la pista d'aviazione di Motu Mute, pietra miliare dell'aviazione civile oceanica. Gli EFO si incamminano verso il nuovo assetto di Territorio d'Oltremare (TOM) nella IV Repubblica francese.";
    },
  },

  NC_CALEDONIA: {
    id: 'NC_CALEDONIA',
    modernName: 'Nuova Caledonia (Grande Terre, Isole della Lealtà & Isole Chesterfield)',
    archipelago: 'Grande Terre, Îles Loyauté, Île des Pins, Îles Belep',
    getOwner: (s: number) => {
      if (s <= 5) return 'F_COL';
      if (s === 6) return 'VIC';
      if (s <= 13) return 'FFL_AEF';
      return 'FRA';
    },
    getHistoricalName: (s: number) => {
      if (s <= 5) return 'Nouvelle-Calédonie (Nouméa)';
      if (s === 6) return 'Nouvelle-Calédonie (Nouméa — Amministrazione di Vichy)';
      if (s === 7) return 'Nouvelle-Calédonie (France Libre — Nouméa)';
      if (s <= 12) return 'Nouvelle-Calédonie (Quartier Generale Alleato South Pacific — Base 44)';
      if (s <= 17) return 'Nouvelle-Calédonie (GPRF — Roccaforte Navale Alleata)';
      return 'Nouvelle-Calédonie (Vittoria nel Pacifico & Presidio Francese)';
    },
    getAdminTitle: (s: number) => {
      if (s <= 5) return 'Colonie de la Nouvelle-Calédonie et Dépendances (Nouméa)';
      if (s === 6) return "Colonie sous Contrôle d'Armistice (Gouverneur Marie Denis — Vichy)";
      if (s === 7) return 'Ralliée à la France Libre (19 Settembre 1940 — Henri Sautot)';
      if (s <= 12) return 'US South Pacific Area Command HQ (Base 44 — Ammiraglio Halsey / Ghormley)';
      if (s <= 17) return 'Gouvernement Provisoire de la République Française (Gouverneur Jacques Tallec)';
      return "Territoire d'Outre-Mer de la République Française (Nouméa)";
    },
    getNote: (s: number) => {
      if (s <= 5) {
        return "Colonia francese dell'Oceania occidentale ricca di strategici giacimenti di nichel (miniere di Thio e fonderie di Doniambo), con capoluogo Nouméa. Snodo di navigazione tra Australia e isole del Pacifico.";
      }
      if (s === 6) {
        return "Dopo l'armistizio del 22 giugno 1940, il governatore coloniale Marie Denis mantiene la fedeltà al regime di Vichy, scontrandosi con la ferma ostilità del Consiglio generale e della popolazione caledoniana che reclama l'alleanza con la Gran Bretagna e l'Australia.";
      }
      if (s === 7) {
        return "19 Settembre 1940: Ralliement storico della Nuova Caledonia! Henri Sautot, inviato da De Gaulle dalle Nuove Ebridi, sbarca a Nouméa acclamato da una folla entusiasta di coloni e indigeni canachi. Il governatore di Vichy viene deposto senza spargimento di sangue e la colonia si schiera formalmente con la France Libre, fornendo il contingente per il Bataillon du Pacifique.";
      }
      if (s <= 12) {
        return "Dal marzo 1942, Nouméa viene trasformata nel Quartier Generale supremo delle forze alleate nel Pacifico meridionale (HQ South Pacific Area degli ammiragli Ghormley e poi Halsey, nota come 'Base 44'). Oltre 50.000 militari americani e neozelandesi stazionano sull'isola, coordinando l'offensiva di Guadalcanal e delle Isole Salomone e rifornendo le portaerei della US Navy con il nichel locale.";
      }
      if (s <= 17) {
        return "Sotto l'egida del Governo Provvisorio della Repubblica Francese (GPRF), la Nuova Caledonia prosegue il suo contributo logistico alleato nel Pacifico mentre i fanti di marina caledoniani del BIMP si battono valorosamente per la liberazione della Francia metropolitana.";
      }
      return "Settembre 1945: con la vittoria definitiva sul Giappone, la Nuova Caledonia celebra la pace postbellica e la fine della presenza militare di massa americana. La colonia viene elevata allo status di Territorio d'Oltremare (TOM) nella Repubblica Francese.";
    },
  },

  NH_HEBRIDES: {
    id: 'NH_HEBRIDES',
    modernName: 'Nuove Ebridi / Vanuatu (Espiritu Santo, Efate & Malakula)',
    archipelago: 'Espiritu Santo, Efate, Malakula, Erromango, Tanna',
    getOwner: (s: number) => {
      if (s <= 5) return 'F_COL';
      if (s === 6) return 'VIC';
      if (s <= 13) return 'FFL_AEF';
      return 'FRA';
    },
    getHistoricalName: (s: number) => {
      if (s <= 5) return 'Nouvelles-Hébrides (Condominium Franco-Britannique)';
      if (s === 6) return 'Nouvelles-Hébrides (Condominium Franco-Britannique — Armistice)';
      if (s === 7) return 'Nouvelles-Hébrides (Primo Ralliement alla France Libre)';
      if (s <= 12) return 'Nouvelles-Hébrides (Megabase Navale USA di Espiritu Santo — Buttons)';
      if (s <= 17) return 'Nouvelles-Hébrides (Condominio Franco-Britannico & Base Avanzata)';
      return 'Nouvelles-Hébrides (Condominio Franco-Britannico Postbellico)';
    },
    getAdminTitle: (s: number) => {
      if (s <= 5) return 'Condominium des Nouvelles-Hébrides (Port-Vila — Sovranità Congiunta)';
      if (s === 6) return "Condominium des Nouvelles-Hébrides (Commissaire Résident Henri Sautot)";
      if (s === 7) return 'Condominium Rallié à la France Libre (20 Luglio 1940 — Henri Sautot)';
      if (s <= 12) return 'US Naval Advance Base Espiritu Santo (Base Buttons) & Port-Vila (Base White)';
      if (s <= 17) return 'GPRF & British Western Pacific High Commission (Port-Vila)';
      return 'Condominium des Nouvelles-Hébrides / New Hebrides (Port-Vila)';
    },
    getNote: (s: number) => {
      if (s <= 5) {
        return "Arcipelago melanesiano retto dallo singolare statuto di condominio coloniale congiunto franco-britannico istituito nel 1906, con capoluogo a Port-Vila (sull'isola di Efate). Amministrazione duale con due commissari residenti, due tribunali e due polizie.";
      }
      if (s === 6) {
        return "A seguito della sconfitta militare francese in Europa, il commissario residente francese Henri Sautot e il collega britannico Richard Blandy preservano l'intesa e impediscono qualsiasi infiltrazione delle autorità fedeli a Pétain.";
      }
      if (s === 7) {
        return "20 Luglio 1940: Primo territorio dell'Impero coloniale francese nel mondo a proclamare ufficialmente il ralliement alla Francia Libera di De Gaulle! Il commissario Henri Sautot anticipa l'Africa Equatoriale Francese e schiera le Nuove Ebridi a fianco della causa alleata, prima di salpare per guidare il ralliement di Nouméa.";
      }
      if (s <= 12) {
        return "Nel 1942, l'isola di Espiritu Santo viene convertita dagli ingegneri Seabees americani nella seconda più grande base militare avanzata alleata del Pacifico (dopo Pearl Harbor): la Base Buttons (350.000 militari di transito, 4 piste di volo, bacini di carenaggio galleggianti e immensi ospedali da campo) che rifornisce direttamente le battaglie aeronavali di Guadalcanal e Santa Cruz.";
      }
      if (s <= 17) {
        return "Consolidamento delle retrovie alleate e cooperazione tra il governo della Francia risorta (GPRF) e l'Alto Commissariato britannico del Pacifico occidentale per il ripristino dell'ordine istituzionale.";
      }
      return "Settembre 1945: conclusione della guerra nel Pacifico e graduale smobilitazione della gigantesca installazione navale di Espiritu Santo (con il celebre scarico di materiali a Million Dollar Point). Ritorno al normale regime di condominio franco-britannico.";
    },
  },

  WF_WALLIS_FUTUNA: {
    id: 'WF_WALLIS_FUTUNA',
    modernName: 'Wallis e Futuna (Uvea, Sigave & Alo)',
    archipelago: 'Îles Wallis (Uvea), Îles Horn (Futuna e Alofi)',
    getOwner: (s: number) => {
      if (s <= 5) return 'F_COL';
      if (s <= 10) return 'VIC'; // Resta a Vichy fino al 27 maggio 1942
      if (s <= 13) return 'FFL_AEF'; // Ralliement maggio 1942
      return 'FRA';
    },
    getHistoricalName: (s: number) => {
      if (s <= 5) return 'Protectorat des Îles Wallis et Futuna';
      if (s <= 10) return 'Wallis-et-Futuna (Vichy — Amministrazione Vrignaud)';
      if (s <= 12) return 'Wallis-et-Futuna (France Libre & Base USA Seabees di Hihifo)';
      if (s <= 17) return 'Wallis-et-Futuna (GPRF — Protettorato Francese)';
      return 'Protectorat des Îles Wallis et Futuna (TOM Postbellico)';
    },
    getAdminTitle: (s: number) => {
      if (s <= 5) return 'Protectorat Français de Wallis-et-Futuna (Mata-Utu)';
      if (s <= 10) return 'Protectorat de Wallis-et-Futuna (Résident Léon Vrignaud — Régime de Vichy)';
      if (s <= 12) return "Forces Navales Françaises Libres (Aviso Chevreuil) & US Navy Base Hihifo";
      if (s <= 17) return 'Gouvernement Provisoire de la République Française (Mata-Utu)';
      return "Territoire d'Outre-Mer de la République Française (Mata-Utu)";
    },
    getNote: (s: number) => {
      if (s <= 5) {
        return "Tre regni tradizionali polinesiani (Uvea a Wallis, Sigave e Alo a Futuna) posti sotto protettorato francese dal 1887, amministrati da un medico-residente a Mata-Utu coadiuvato dai sovrani consuetudinari (Lavelua).";
      }
      if (s <= 10) {
        return "Dall'armistizio del 1940 fino al maggio 1942, il residente coloniale Léon Vrignaud e il vescovo cattolico Alexandre Poncet mantengono l'arcipelago sotto la rigida obbedienza al maresciallo Pétain e al governo di Vichy, isolati dal resto delle colonie oceaniche passate a De Gaulle.";
      }
      if (s <= 12) {
        return "27 Maggio 1942: Ralliement liberatorio! L'aviso delle Forces Navales Françaises Libres (FNFL) Chevreuil, comandato dal capitano di corvetta Philippe de Scitivaux, sbarca a Wallis. Il residente di Vichy viene arrestato senza spargimento di sangue e il re locale Lavelua accoglie la Francia Libera. Pochi giorni dopo, i Seabees della US Navy sbarcano per costruire la base aerea di Hihifo e idroscali a supporto delle comunicazioni alleate.";
      }
      if (s <= 17) {
        return "Reintegrazione istituzionale nel quadro del Governo Provvisorio della Repubblica Francese; cooperazione militare con le squadriglie aeree americane.";
      }
      return "Settembre 1945: pace vittoriosa nel Pacifico e avvio del processo che condurrà l'arcipelago a diventare Territorio d'Oltremare (TOM) della Repubblica Francese, conservando le istituzioni monarchiche tradizionali e i diritti fondiari consuetudinari.";
    },
  },
};

export function isFrenchPacificProvince(
  id?: string,
  rawName?: string,
  normKey?: string
): boolean {
  const cleanId = String(id || '').toUpperCase().trim();
  if (cleanId.startsWith('MY') || cleanId.startsWith('SG')) {
    return false;
  }

  if (
    cleanId === 'PF_POLYNESIA' ||
    cleanId === 'NC_CALEDONIA' ||
    cleanId === 'NC_NEWCALEDONIA' ||
    cleanId === 'NH_HEBRIDES' ||
    cleanId === 'WF_WALLIS_FUTUNA' ||
    cleanId === 'WF' ||
    cleanId === 'WLF' ||
    cleanId === 'PF' ||
    cleanId === 'PYF' ||
    cleanId === 'NC' ||
    cleanId === 'NCL' ||
    cleanId === 'VU' ||
    cleanId === 'VUT'
  ) {
    return true;
  }

  const nrm = String(normKey || rawName || '').toLowerCase().replace(/[^a-z0-9]/g, '_');
  if (
    nrm.includes('cornwallis') ||
    nrm.includes('penang') ||
    nrm.includes('malaya') ||
    nrm.includes('malaysia') ||
    nrm.includes('straits_settlements')
  ) {
    return false;
  }

  return (
    nrm.includes('polynesi') ||
    nrm.includes('tahiti') ||
    nrm.includes('papeete') ||
    nrm.includes('bora_bora') ||
    nrm.includes('oceanie') ||
    nrm.includes('oceania') ||
    nrm.includes('caledon') ||
    nrm.includes('noumea') ||
    nrm.includes('hebrid') ||
    nrm.includes('port_vila') ||
    (/(^|_)wallis(_|$)/.test(nrm) && !nrm.includes('cornwallis')) ||
    nrm.includes('futuna')
  );
}

export function matchFrenchPacificDossier(
  id?: string,
  rawName?: string,
  normKey?: string
): FrenchPacificDossier | null {
  const cleanId = String(id || '').toUpperCase().trim();
  if (cleanId.startsWith('MY') || cleanId.startsWith('SG')) {
    return null;
  }

  if (FRENCH_PACIFIC_META[cleanId]) {
    return FRENCH_PACIFIC_META[cleanId];
  }
  if (cleanId === 'NC_NEWCALEDONIA' || cleanId === 'NC' || cleanId === 'NCL') {
    return FRENCH_PACIFIC_META.NC_CALEDONIA;
  }
  if (cleanId === 'PF' || cleanId === 'PYF') {
    return FRENCH_PACIFIC_META.PF_POLYNESIA;
  }
  if (cleanId === 'VU' || cleanId === 'VUT') {
    return FRENCH_PACIFIC_META.NH_HEBRIDES;
  }
  if (cleanId === 'WF' || cleanId === 'WLF') {
    return FRENCH_PACIFIC_META.WF_WALLIS_FUTUNA;
  }

  const nrm = String(normKey || rawName || '').toLowerCase().replace(/[^a-z0-9]/g, '_');
  if (
    nrm.includes('cornwallis') ||
    nrm.includes('penang') ||
    nrm.includes('malaya') ||
    nrm.includes('malaysia') ||
    nrm.includes('straits_settlements')
  ) {
    return null;
  }

  if (
    nrm.includes('polynesi') ||
    nrm.includes('tahiti') ||
    nrm.includes('papeete') ||
    nrm.includes('bora') ||
    nrm.includes('oceanie') ||
    nrm.includes('oceania')
  ) {
    return FRENCH_PACIFIC_META.PF_POLYNESIA;
  }
  if (nrm.includes('caledon') || nrm.includes('noumea')) {
    return FRENCH_PACIFIC_META.NC_CALEDONIA;
  }
  if (nrm.includes('hebrid') || nrm.includes('port_vila') || nrm.includes('vanuatu')) {
    return FRENCH_PACIFIC_META.NH_HEBRIDES;
  }
  if ((/(^|_)wallis(_|$)/.test(nrm) && !nrm.includes('cornwallis')) || nrm.includes('futuna')) {
    return FRENCH_PACIFIC_META.WF_WALLIS_FUTUNA;
  }

  return null;
}

export function resolveFrenchPacificProvince(
  ft: any,
  s: number
): ResolvedTerritory {
  const p = ft.properties || {};
  const cleanId = String(ft.id || p.id || p.NUTS_ID || '').toUpperCase().trim();
  const rawName = String(p.NAME_LATN || p.NAME || p.HISTORICAL_NAME || p.NUTS_NAME || '');
  const dossier = matchFrenchPacificDossier(cleanId, rawName);

  if (dossier) {
    const o = dossier.getOwner(s);
    const fac: FactionType = o === 'VIC' ? 'Fantoccio' : 'Alleati';
    return makeResult(
      o,
      dossier.getHistoricalName(s),
      dossier.getNote(s),
      fac,
      dossier.getAdminTitle(s)
    );
  }

  // Generic fallback for French Pacific
  const o = s <= 5 ? 'F_COL' : s === 6 ? 'F_COL' : s <= 13 ? 'FFL_AEF' : 'FRA';
  return makeResult(
    o,
    s <= 5
      ? "Possessions Françaises du Pacifique (Papeete / Nouméa)"
      : s <= 13
      ? "Possessions Françaises du Pacifique (France Libre)"
      : "Territoires Français du Pacifique (GPRF)",
    "Territori e arcipelaghi francesi d'oltremare nel Pacifico meridionale.",
    'Alleati',
    "France d'Outre-Mer (Pacifique)"
  );
}
