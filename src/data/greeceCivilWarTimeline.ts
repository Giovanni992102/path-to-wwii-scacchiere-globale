import { FactionType } from '../types';

/**
 * Estensione Geostorica Integrale della Guerra Civile Greca (1943–1947)
 * Copre tutte le 52 province NUTS-3 elleniche (EL301..EL653) attraverso le tre fasi storiche del conflitto:
 * - Steps 13–15 (SET 1943 – AGO 1944): Prima Fase — Scontro ELAS vs EDES ("Primo Round"), Patto di Plaka e "Governo della Montagna" (PEEA a Viniani).
 * - Step 16 (DIC 1944): Seconda Fase — I Dekemvriana (Battaglia di Atene 3 Dic 1944 – 11 Gen 1945): Atene-Pireo e isole sotto Scobie/Papandreou vs EAM-ELAS dominante sull'entroterra.
 * - Steps 17–18 (APR – SET 1945): Accordo di Varkiza (12 Feb 1945), disarmo dell'ELAS, Reggenza Damaskinos e "Terrore Bianco" (Lefki Tromokratia).
 * - Step 19 (SET 1947): Terza Fase — Guerra Civile aperta: Esercito Democratico di Grecia (DSE di Markos Vafiadis) arroccato sui bastioni montani di Grammos (EL532), Vitsi (EL533), Pindo settentrionale (EL531) ed Agrafa (EL643) vs Regno di Grecia (Re Paolo I, PM Sofoulis & Dottrina Truman / AMAG).
 */

export interface GreeceDistrictMetaLike {
  nuts: string;
  name: string;
  capitalOrChefLieu: string;
  historicalRegion: string;
}

export interface GreeceStepResolution {
  name: string;
  adminTitle: string;
  note: string;
  owner: string;
  fac?: FactionType;
}

/** Distretti metropolitani e capisaldi insulari mantenuti da Regno di Grecia & Forze Britanniche (Gen. Scobie) nei Dekemvriana (Dicembre 1944). */
const DEKEMVRIANA_GRE_STRONGHOLDS = new Set<string>([
  'EL301', // Atene Nord (Kifisia)
  'EL303', // Atene Centro (Syntagma / Acropoli / HQ Scobie)
  'EL304', // Atene Sud (Kallithea / Falero)
  'EL307', // Pireo (scalo vitale britannico)
  'EL511', // Evros / Alessandropoli (presidio frontiera turca)
  'EL522', // Salonicco (enclave presidiata)
  'EL632', // Acaia / Patrasso (guarnigione anglo-greca)
  'EL411', 'EL412', 'EL413', 'EL422', // Isole Egee sotto controllo Royal Navy / Marina Ellenica
  'EL621', 'EL622', 'EL623', 'EL624', // Isole Ionie (Corfù base evacuazione EDES fine dic 1944)
]);

/** Santuari montani consolidati di "Grecia Libera" del DSE (Markos Vafiadis) nel Settembre 1947 (Step 19). */
const DSE_1947_STRONGHOLDS: Record<string, { name: string; adminTitle: string; note: string }> = {
  EL532: {
    name: 'Kastoria & Monte Grammos (Quartier Generale DSE — "Grecia Libera")',
    adminTitle: 'Esercito Democratico di Grecia (DSE — Comando Supremo Montano di Markos Vafiadis)',
    note: 'Settembre 1947: mentre il capoluogo Kastoria resta presidiato dall\'Esercito Nazionale greco, i formidabili massicci alpini del Monte Grammos lungo la frontiera albanese costituiscono il principale bastione fortificato e quartier generale del DSE (Dimokratikos Stratos Elladas) sostenuto da retrovie oltreconfine.',
  },
  EL533: {
    name: 'Florina & Monti Vitsi (Roccaforte Settentrionale DSE — Confine Prespa)',
    adminTitle: 'Esercito Democratico di Grecia (DSE — Settore Vitsi / Fronte Macedone)',
    note: 'Settembre 1947: il massiccio boscoso dei Monti Vitsi (Vernon) e la conca dei laghi Prespa al confine jugoslavo-albanese formano con il Grammos la cerniera inespugnabile del DSE nella Macedonia occidentale, collegata ai centri logistici nella FNRJ di Tito.',
  },
  EL531: {
    name: 'Grevena & Pindo Settentrionale (Corridoio Montano DSE — Grammos / Hasia)',
    adminTitle: 'Esercito Democratico di Grecia (DSE — Brigata del Pindo / Hasia)',
    note: 'Settembre 1947: nonostante l\'offensiva governativa primaverile "Operazione Terminus", le brigate mobili del DSE mantengono il saldo controllo delle catene montuose tra Grevena, Smolikas e Hasia lungo la spina dorsale del Pindo tra il Grammos e la Tessaglia.',
  },
  EL643: {
    name: 'Karpenisi & Monti dell\'Agrafa / Evritania (Bastione Centrale DSE — Roumeli)',
    adminTitle: 'Esercito Democratico di Grecia (DSE — 2ª Divisione della Grecia Centrale)',
    note: 'Settembre 1947: storico epicentro dell\'antica "Grecia Libera" (PEEA 1944), l\'aspra regione alpina dell\'Evritania e dell\'Agrafa ospita il comando meridionale della guerriglia del DSE in Grecia centrale al di fuori delle pianure controllate da Atene.',
  },
};

/**
 * Arricchisce le note della Prima Fase (1943–AGO 1944) per i teatri della resistenza civile PEEA/ELAS vs EDES.
 */
export function getGreeceFirstPhaseContextNote(nuts: string): string | null {
  if (nuts === 'EL643') {
    return 'PEEA ("Governo della Montagna", 10 marzo 1944): a Viniani in Evritania l\'EAM fonda la Politiki Epitropi Ethnikis Apeleftherosis (Euripidis Bakirtzis, Alexandros Svolos), esercitando autogoverno democratico ed elezioni clandestine nella "Grecia Libera" montana nonostante i presidi tedeschi di fondo valle.';
  }
  if (nuts === 'EL641') {
    return 'Prima Fase & Rappresaglie Naziste: area di intensa attività dell\'ELAS in Beozia; il 10 giugno 1944 le Waffen-SS compiono la feroce strage di Distomo (218 civili uccisi) in rappresaglia agli scontri partigiani.';
  }
  if (nuts === 'EL541' || nuts === 'EL543') {
    return 'Prima Fase della Guerra Civile (ott 1943 – feb 1944): aspri scontri fratricidi tra le brigate dell\'ELAS comunista e i reparti repubblicani dell\'EDES di Napoleon Zervas in Epiro fino alla tregua dell\'Accordo di Plaka (29 febbraio 1944).';
  }
  if (nuts === 'EL611' || nuts === 'EL612' || nuts === 'EL644' || nuts === 'EL645') {
    return 'Cuore montano della "Grecia Libera" (EAM-ELAS & PEEA 1943–44): dopo la cattura degli armamenti della Divisione italiana Pinerolo (settembre 1943), l\'ELAS consolida vaste zone partigiane tra Tessaglia e Ftiotide sotto costante pressione dell\'Heeresgruppe E.';
  }
  return null;
}

/**
 * Risolve tutte le 52 province NUTS-3 greche negli Step 16–19 (DIC 1944 -> SET 1947)
 * coprendo Dekemvriana, Varkiza, Terrore Bianco e Terza Fase della Guerra Civile Greca (DSE vs Regno di Grecia / AMAG).
 */
export function resolveGreeceCivilWarStep(
  d: GreeceDistrictMetaLike,
  step: number
): GreeceStepResolution | null {
  if (step < 16) return null;

  // 1. Isola di Creta (EL431-434): Festung Kreta fino al maggio 1945 (Step 16-17), liberata agli Step 18-19
  if (d.nuts === 'EL431' || d.nuts === 'EL432' || d.nuts === 'EL433' || d.nuts === 'EL434') {
    if (step < 18) {
      return {
        name: `${d.capitalOrChefLieu} (Festung Kreta — Occupazione Militare Tedesca Wehrmacht)`,
        adminTitle: 'Deutsche Wehrmacht — Kommandant der Festung Kreta',
        note: 'Isola di Creta mantenuta come fortezza isolata ("Festung Kreta") dalla guarnigione della Wehrmacht fino alla capitolazione del 9–12 maggio 1945 a Cnosso (mentre partigiani dell\'EAM-ELAS e dell\'EOK controllano vaste zone interne).',
        owner: 'GER',
        fac: 'Asse',
      };
    }
    if (step >= 19) {
      return {
        name: `${d.capitalOrChefLieu} (Creta — Regno di Grecia / Guerra Civile Greca 1947)`,
        adminTitle: 'Vasileion tis Ellados — Creta (Re Paolo I & Governo Sofoulis / Dottrina Truman)',
        note: 'Settembre 1947: Creta costituisce una retrovia saldamente controllata dal Regno di Grecia durante la guerra civile sul continente, con sporadici nuclei partigiani montani residui sulle Montagne Bianche.',
        owner: 'GRE',
        fac: 'Alleati',
      };
    }
    return {
      name: `${d.capitalOrChefLieu} (Creta Liberata — Regno di Grecia, Maggio 1945)`,
      adminTitle: 'Vasileion tis Ellados — Creta (Reggenza Arcivescovo Damaskinos)',
      note: 'Il 9–12 maggio 1945 a Cnosso il generale tedesco Hans-Georg Benthack firma la resa della guarnigione di Creta dinanzi al generale britannico Colin Callander; l\'isola torna pienamente alla sovranità greca.',
      owner: 'GRE',
      fac: 'Alleati',
    };
  }

  // 2. Dodecaneso (EL421) — delegato ai passaggi storici 1945 (UK BMA) e 1947 (GRE Trattato di Parigi)
  if (d.nuts === 'EL421') {
    return null;
  }

  // 3. STEP 16 (DIC 1944): DEKEMVRIANA (Battaglia di Atene, 3 dicembre 1944 - 11 gennaio 1945)
  if (step === 16) {
    if (DEKEMVRIANA_GRE_STRONGHOLDS.has(d.nuts)) {
      const isAthens = d.nuts.startsWith('EL30');
      const isSalonika = d.nuts === 'EL522';
      const isIonian = d.nuts.startsWith('EL62');
      return {
        name: isAthens
          ? `${d.capitalOrChefLieu} (Atene–Pireo — Dekemvriana: Perimetro Britannico & Governo Papandreou)`
          : isSalonika
          ? 'Thessaloniki (Enclave Anglo-Greca durante i Dekemvriana)'
          : isIonian
          ? `${d.capitalOrChefLieu} (Isole Ionie — Royal Navy & Evacuazione EDES da Epiro)`
          : `${d.capitalOrChefLieu} (Caposaldo Anglo-Greco nei Dekemvriana — Dicembre 1944)`,
        adminTitle: 'Vasileion tis Ellados — Governo Georgios Papandreou & British Forces (Lt-Gen. Ronald Scobie)',
        note: isAthens
          ? 'DEKEMVRIANA (3 dic 1944 – 11 gen 1945): dopo la strage di Piazza Syntagma del 3 dicembre, infuria ad Atene la feroce battaglia urbana strada per strada. Le forze britanniche del Gen. Ronald Scobie (rinforzate d\'urgenza per ordine di Churchill) e il governo Papandreou difendono il centro di Atene e il porto del Pireo contro le unità cittadine e provinciali dell\'ELAS.'
          : isIonian
          ? 'Dicembre 1944: le Isole Ionie rimangono saldamente sotto protezione navale britannica; a fine dicembre la Royal Navy traghetta a Corfù i reparti dell\'EDES di Napoleon Zervas scacciati dall\'Epiro dall\'offensiva dell\'ELAS.'
          : 'Dicembre 1944: enclavato costiero/insulare presidiato dalle forze britanniche di Arkforce/Scobie e dalla Guardia Nazionale di Papandreou mentre l\'EAM-ELAS domina la maggior parte dell\'entroterra continentale greco.',
        owner: 'GRE',
        fac: 'Alleati',
      };
    }

    const isEpirus = d.nuts.startsWith('EL54');
    return {
      name: `${d.capitalOrChefLieu} (EAM-ELAS — Controllo dell'Entroterra nei Dekemvriana, Dic 1944)`,
      adminTitle: 'EAM-ELAS (Comitato Centrale ELAS — Stefanos Sarafis & Georgios Siantos)',
      note: isEpirus
        ? 'Dicembre 1944 (Dekemvriana): mentre ad Atene si combatte contro gli inglesi, le divisioni dell\'ELAS sferrano l\'offensiva finale in Epiro sconfiggendo l\'EDES di Napoleon Zervas e costringendolo all\'evacuazione a Corfù (21–30 dic 1944).'
        : 'Dicembre 1944 (Dekemvriana): ritiratasi la Wehrmacht nell\'autunno 1944, l\'EAM-ELAS controlla quasi interamente le province rurali e montane della Grecia continentale e cinge d\'assedio i settori anglo-governativi mentre Stalin rispetta il patto delle percentuali con Churchill senza intervenire.',
      owner: 'DSE',
      fac: 'Comintern',
    };
  }

  // 4. STEP 17 (APR 1945) & STEP 18 (SET 1945): Accordo di Varkiza & Terrore Bianco
  if (step === 17 || step === 18) {
    const isWhiteTerrorHeartland =
      d.nuts.startsWith('EL65') || d.nuts.startsWith('EL61') || d.nuts.startsWith('EL53') || d.nuts === 'EL633';
    if (step === 17) {
      return {
        name: `${d.capitalOrChefLieu} (Post-Varkiza — Regno di Grecia, Aprile 1945)`,
        adminTitle: 'Vasileion tis Ellados — Reggenza Arcivescovo Damaskinos & Governo Plastiras / Voulgaris',
        note: isWhiteTerrorHeartland
          ? 'Accordo di Varkiza (12 febbraio 1945) e alba del Terrore Bianco (Lefki Tromokratia): dopo il disarmo ufficiale dell\'ELAS sancito a Varkiza, milizie monarchiche (Organizzazione X) e Guardia Nazionale avviano dure persecuzioni contro gli ex partigiani di sinistra spingendo molti militanti a darsi alla macchia.'
          : 'Accordo di Varkiza (12 febbraio 1945): a seguito della sconfitta nei Dekemvriana l\'ELAS accetta di consegnare le armi in cambio di un\'amnistia parziale e futuri referendum, ripristinando l\'autorità amministrativa del Regno di Grecia sotto la reggenza di Damaskinos.',
        owner: 'GRE',
        fac: 'Alleati',
      };
    }
    return {
      name: `${d.capitalOrChefLieu} (Regno di Grecia — Terrore Bianco & Vigilia Guerra Civile, Set 1945)`,
      adminTitle: 'Vasileion tis Ellados — Reggenza Damaskinos (Crisi Economica & Polarizzazione 1945)',
      note: isWhiteTerrorHeartland
        ? 'Settembre 1945: nel pieno del "Terrore Bianco" (*Lefki Tromokratia*), migliaia di ex combattenti ELAS e slavomacedoni fuggono verso i campi jugoslavi di Bulkes e i confini albanesi o tornano sulle montagne preparando la futura autodifesa armata.'
        : 'Settembre 1945: la Grecia esce dalla guerra devastata economicamente e spaccata dalla polarizzazione politica post-Varkiza tra blocco monarchico-conservatore e KKE/EAM verso lo scontro elettorale boicottato del 1946.',
      owner: 'GRE',
      fac: 'Alleati',
    };
  }

  // 5. STEP >= 24 (DIC 1949): FINE DELLA GUERRA CIVILE GRECA (Operazione Torcia su Vitsi & Grammos, Cessate il Fuoco 16 Ottobre 1949)
  if (step >= 24) {
    const isFormerBastion = Boolean(DSE_1947_STRONGHOLDS[d.nuts]);
    return {
      name: isFormerBastion
        ? `${d.capitalOrChefLieu} (${d.historicalRegion} — Riconquistata in Operazione Torcia · 100% Regno di Grecia)`
        : d.nuts.startsWith('EL30')
        ? `${d.capitalOrChefLieu} (Atene — Fine Guerra Civile Greca, Dicembre 1949)`
        : `${d.capitalOrChefLieu} (${d.historicalRegion} — 100% Regno di Grecia, Dicembre 1949)`,
      adminTitle: 'Vasileion tis Ellados — Re Paolo I · P.M. Alexandros Diomidis · Maresciallo Alexandros Papagos (100% Sovranità)',
      note: isFormerBastion
        ? '16 Ottobre 1949 — Fine della Guerra Civile Greca (100% Regno di Grecia): dopo la sconfitta definitiva del DSE sui massicci di Vitsi (10–16 agosto) e Grammos (24–30 agosto 1949) nell\'Operazione Torcia (Pyrsos) guidata dal Gen. Alexandros Papagos, il Partito Comunista di Grecia (KKE) e il Governo Provvisorio Democratico annunciano il cessate il fuoco il 16 ottobre e ritirano i combattenti superstiti oltre confine in Albania. L\'entità insorgente cessa di esistere e l\'intera regione torna sotto il Regno di Grecia.'
        : '31 Dicembre 1949 (100% Regno di Grecia): con la vittoria dell\'Esercito Nazionale nell\'Operazione Torcia su Vitsi e Grammos (agosto 1949) e l\'annuncio del cessate il fuoco da parte del KKE/PDG il 16 ottobre 1949, cessa definitivamente la Guerra Civile Greca e l\'intero territorio ellenico è reunificato sotto il governo di Atene (Re Paolo I, P.M. Alexandros Diomidis).',
      owner: 'GRE',
      fac: 'Alleati',
    };
  }

  // 6. STEP 19-23 (SET 1947 - GIU 1949): TERZA FASE — GUERRA CIVILE GRECA (DSE / PDG vs Regno di Grecia + Papagos, Liberazione Peloponneso & Karpenisi)
  const isDec1947 = step >= 20;
  const isJune1948 = step >= 21;
  const isDec1948 = step >= 22;
  const isJune1949 = step >= 23;
  if (isJune1949 && d.nuts === 'EL643') {
    return {
      name: 'Karpenisi / Evrytania (Riconquistata dall\'Esercito Nazionale Ellenico — Febbraio 1949)',
      adminTitle: 'Vasileion tis Ellados — I Corpo d\'Armata Ellenico (Gen. Alexandros Papagos · Giu 1949)',
      note: 'Al 30 giugno 1949 l\'Evrytania e la cittadina montana di Karpenisi sono saldamente riconquistate dall\'Esercito Nazionale: dopo il raid invernale del DSE che occupò Karpenisi dal 20 gennaio all\'8 febbraio 1949, la controffensiva orchestrata dal Comandante in Capo Gen. Alexandros Papagos espelle definitivamente le forze comuniste dalla Grecia centrale.',
      owner: 'GRE',
      fac: 'Alleati',
    };
  }
  const dseBastion = DSE_1947_STRONGHOLDS[d.nuts];
  if (dseBastion) {
    return {
      name: isJune1949
        ? `${dseBastion.name} — Ultime Ridotte di Grammos & Vitsi (Giugno 1949 · Pre-Operazione Torch)`
        : isDec1948
        ? `${dseBastion.name} — Riorganizzazione su Vitsi-Prespa & Rientro sul Grammos (Dicembre 1948)`
        : isJune1948
        ? `${dseBastion.name} — Offensiva Governativa "Operazione Koronis" sul Grammos (Giugno 1948)`
        : isDec1947
        ? `${dseBastion.name} — Governo Democratico Provvisorio (24 Dic 1947)`
        : dseBastion.name,
      adminTitle: isJune1949
        ? 'Prosorini Dimokratiki Kyvernisi (PDG — Dimitrios Partsalidis · Comando DSE Nikos Zachariadis)'
        : isDec1947
        ? 'Prosorini Dimokratiki Kyvernisi (Governo Democratico Provvisorio — Primo Ministro e Gen. Markos Vafiadis)'
        : dseBastion.adminTitle,
      note: isJune1949
        ? `${dseBastion.note} Al 30 giugno 1949, sostituito Markos Vafiadis (febbraio 1949) da Nikos Zachariadis e Dimitrios Partsalidis e persi sia il Peloponneso (Op. Peristera) sia Karpenisi (febbraio), il DSE resiste ormai arroccato unicamente nei settori fortificati di confine tra Grammos, Vitsi e Pindo settentrionale in attesa dell'offensiva decisiva ellenica (Operazione Torch, agosto 1949).`
        : isDec1948
        ? `${dseBastion.note} Dopo la conclusione dell'Operazione Koronis (agosto 1948), in cui il DSE sgancia il proprio nucleo principale attraverso il territorio albanese riposizionandosi sui bastioni inespugnati dei Monti Vitsi e del bacino di Prespa, nell'autunno–dicembre 1948 le brigate del DSE reinfiltrano il Monte Grammos e il Pindo settentrionale, mentre ad Atene e nel Peloponneso proseguono aspri combattimenti.`
        : isJune1948
        ? `${dseBastion.note} A partire dal 14 giugno 1948 l'Esercito Nazionale Ellenico (70.000 uomini appoggiati dall'aviazione e dai consiglieri USA del gen. Van Fleet) scatena la grande offensiva estiva "Operazione Koronis" contro la roccaforte principale del Governo Democratico Provvisorio (DSE) sul massiccio del Monte Grammos: al 30 giugno 1948 infuriano aspri combattimenti in quota, mentre il DSE di Markos Vafiadis mantiene ancora le posizioni trincerate sul Grammos, sul Vitsi, sul Prespa e sui monti di confine settentrionali.`
        : isDec1947
        ? `${dseBastion.note} Il 24 dicembre 1947 il generale Markos Vafiadis proclama sulle montagne dell'Epiro e della Macedonia il Governo Democratico Provvisorio di Grecia (Prosorini Dimokratiki Kyvernisi), lanciando il giorno di Natale l'offensiva contro la città di Konitsa per farne la capitale ufficiale dello Stato insorto.`
        : dseBastion.note,
      owner: 'DSE',
      fac: 'Comintern',
    };
  }

  // Territori controllati dal Regno di Grecia nel Settembre 1947 - Giugno 1949 (dettagli regionali specifici Guerra Civile + Dottrina Truman)
  if (d.nuts.startsWith('EL30')) {
    return {
      name: `${d.capitalOrChefLieu} (Atene & Pireo — Regno di Grecia / Comando Gen. Papagos ${isJune1949 ? '1949' : isJune1948 ? '1948' : '1947'})`,
      adminTitle: isJune1949
        ? 'Vasileion tis Ellados — Re Paolo I · Governo Sofoulis (†24 Giu) / Diomidis · Comandante in Capo Gen. Alexandros Papagos'
        : 'Vasileion tis Ellados — Re Paolo I · Governo di Coalizione Themistoklis Sofoulis & JUSMAPG USA',
      note: isJune1949
        ? 'Giugno 1949: sotto la guida unificata del Comandante in Capo Gen. Alexandros Papagos (nominato nel gennaio 1949) e con gli aiuti USA JUSMAPG, l\'Esercito Nazionale ha ripulito il Peloponneso (marzo), riconquistato Karpenisi e la Grecia centrale; alla morte del premier Sofoulis (24 giugno) si prepara l\'offensiva finale d\'agosto su Vitsi e Grammos.'
        : isDec1948
        ? 'Dicembre 1948: dopo i contraccolpi dello stallo autunnale sui Monti Vitsi, il governo di Atene e i consiglieri USA del JUSMAPG (gen. Van Fleet) avviano il rastrellamento del Peloponneso (Operazione Peristera, 19 dicembre) e riorganizzano l\'Esercito Nazionale verso la svolta del 1949.'
        : isJune1948
        ? 'Giugno 1948: dopo l\'eliminazione delle sacche del DSE nella Grecia centrale (Operazione Haravgi in Roumeli, aprile–maggio 1948), il governo di Atene e il comando congiunto greco-statunitense (JUSMAPG, gen. James Van Fleet) coordinano dal 14 giugno l\'Operazione Koronis contro il bastione comunista del Monte Grammos.'
        : isDec1947
        ? 'Dicembre 1947: a seguito della proclamazione del Governo Democratico Provvisorio di Markos Vafiadis (24 dicembre), il governo di coalizione di Themistoklis Sofoulis ad Atene promulga la Legge di Emergenza n. 509 (27 dicembre 1947) che mette ufficialmente fuori legge il Partito Comunista di Grecia (KKE), l\'EAM e la stampa comunista, mentre affluiscono le forniture militari statunitensi dell\'AMAG.'
        : 'Settembre 1947: ad Atene (dopo la morte di Re Giorgio II il 1° aprile, gli succede Re Paolo I) il 7 settembre nasce il governo di coalizione Sofoulis–Tsaldaris, mentre al Pireo sbarcano armi e aiuti economici americani dell\'AMAG in attuazione della Dottrina Truman (12 marzo 1947); l\'isola di Makronisos diviene campo di internamento politico.',
      owner: 'GRE',
      fac: 'Alleati',
    };
  }
  if (d.nuts === 'EL543') {
    return {
      name: isJune1948
        ? 'Ioannina & Konitsa (Fronte Epiro — Operazione Koronis contro il Monte Grammos, Giugno 1948)'
        : isDec1947
        ? 'Ioannina & Assedio di Konitsa (Battaglia di Konitsa — 25–31 Dicembre 1947)'
        : 'Ioannina & Corridoio di Konitsa (Fronte Epiro — Regno di Grecia vs Grammos DSE)',
      adminTitle: 'Esercito Nazionale Ellenico (Ethnikos Stratos) — VIII Divisione Epiro & Offensiva Koronis',
      note: isJune1948
        ? 'Giugno 1948 (Operazione Koronis): dal settore epirota di Ioannina e Konitsa le divisioni dell\'Esercito Nazionale Ellenico muovono dal 14 giugno 1948 all\'attacco concentrico contro le linee fortificate del DSE sul massiccio del Monte Grammos.'
        : isDec1947
        ? '25–31 Dicembre 1947 (Battaglia di Konitsa): all\'indomani della proclamazione del Governo Democratico Provvisorio (24 dicembre), le brigate del DSE di Markos Vafiadis investono con l\'artiglieria da montagna la cittadina epirota di Konitsa (a ridosso del Grammos e del confine albanese) per conquistarla come capitale governativa; la guarnigione dell\'Esercito Nazionale Ellenico resiste accanitamente fino all\'arrivo dei rinforzi da Ioannina che spezzano l\'assedio a fine dicembre.'
        : 'Settembre 1947: il capoluogo Ioannina e la guarnigione avanzata di Konitsa formano lo sbarramento principale dell\'Esercito Nazionale contro i vicini bastioni del DSE sul Monte Grammos e lungo il confine albanese.',
      owner: 'GRE',
      fac: 'Alleati',
    };
  }
  if (d.nuts === 'EL522') {
    return {
      name: 'Thessaloniki (Comando Nord & Commissione ONU UNSCOB — Guerra Civile 1947)',
      adminTitle: 'Vasileion tis Ellados — III Corpo d\'Armata Ellenico (Macedonia)',
      note: 'Settembre 1947: Salonicco è il perno logistico settentrionale dell\'Esercito Nazionale e sede della Commissione Speciale ONU sui Balcani (UNSCOB) incaricata di vigilare sugli aiuti di Jugoslavia, Albania e Bulgaria al DSE.',
      owner: 'GRE',
      fac: 'Alleati',
    };
  }
  if (d.nuts === 'EL525') {
    return {
      name: 'Katerini & Monte Olimpo / Litochoro (Pieria — Culla della Terza Fase 1946–47)',
      adminTitle: 'Vasileion tis Ellados — Macedonia Centrale (Guerriglia DSE sull\'Olimpo)',
      note: 'A Litochoro alle pendici dell\'Olimpo scattò la notte del 30 marzo 1946 il raid comunista che inaugurò convenzionalmente la Terza Fase della Guerra Civile Greca; nel 1947 i reparti dell\'Olimpo operano in raccordo con il DSE della Tessaglia.',
      owner: 'GRE',
      fac: 'Alleati',
    };
  }
  if (d.nuts.startsWith('EL61') || d.nuts === 'EL644' || d.nuts === 'EL645' || d.nuts === 'EL641' || d.nuts === 'EL642') {
    return {
      name: isJune1949
        ? `${d.capitalOrChefLieu} (${d.historicalRegion} — Grecia Centrale & Tessaglia Liberate, Giugno 1949)`
        : `${d.capitalOrChefLieu} (${d.historicalRegion} — Operazione Terminus & Guerriglia DSE 1947)`,
      adminTitle: isJune1949
        ? 'Vasileion tis Ellados — Esercito Nazionale (Gen. Alexandros Papagos · 100% Regno di Grecia)'
        : 'Vasileion tis Ellados — Esercito Nazionale (Post-Operazione Terminus)',
      note: isJune1949
        ? 'Giugno 1949 (100% Regno di Grecia): completata la riconquista di Karpenisi (febbraio 1949) e le operazioni di rastrellamento primaverili in Tessaglia e Sterea Ellada sotto il Gen. Papagos, l\'intera regione è saldamente pacificata.'
        : 'Settembre 1947: città e assi viari restano sotto presidio dell\'Esercito Nazionale ellenico finanziato dalla Dottrina Truman, ma il massiccio rastrellamento primaverile "Operazione Terminus" non riesce a snidare le colonne mobili del DSE dalle montagne della Tessaglia e di Roumeli.',
      owner: 'GRE',
      fac: 'Alleati',
    };
  }
  if (d.nuts.startsWith('EL65') || d.nuts === 'EL632' || d.nuts === 'EL633') {
    return {
      name: isJune1949
        ? `${d.capitalOrChefLieu} (${d.historicalRegion} — Peloponneso Pacificato da Operazione Peristera, 1949)`
        : `${d.capitalOrChefLieu} (${d.historicalRegion} — Insurrezione 3ª Divisione DSE nel Peloponneso)`,
      adminTitle: isJune1949
        ? 'Vasileion tis Ellados — Peloponneso 100% Liberato (Post-Operazione Peristera, Mar 1949)'
        : 'Vasileion tis Ellados — Peloponneso (Esercito Nazionale & Controguerriglia MAY)',
      note: isJune1949
        ? 'Giugno 1949 (100% Regno di Grecia): tra dicembre 1948 e marzo 1949 la decisiva "Operazione Peristera" (Colomba) condotta dal I Corpo d\'Armata sotto il Gen. Thrasyvoulos Tsakalotos annienta interamente la 3ª Divisione isolata del DSE sul Taigeto, Parnone e Menalo, ripulendo e pacificando l\'intero Peloponneso.'
        : 'Settembre 1947: mentre Atene e Patrasso controllano le pianure e i porti, la 3ª Divisione del DSE mantiene attivi combattimenti di guerriglia sui massicci interni del Taigeto, Parnone e Menalo in pieno Peloponneso isolato dal nord.',
      owner: 'GRE',
      fac: 'Alleati',
    };
  }
  if (d.nuts === 'EL514' || d.nuts === 'EL524' || d.nuts === 'EL511' || d.nuts === 'EL512' || d.nuts === 'EL513') {
    return {
      name: `${d.capitalOrChefLieu} (${d.historicalRegion} — Fascia Confinaria Nord, Guerra Civile 1947)`,
      adminTitle: 'Vasileion tis Ellados — Comando Macedonia Orientale & Tracia (Kaimakchalan / Rodopi)',
      note: 'Settembre 1947: l\'Esercito Nazionale presidia i centri urbani e ferroviari della Macedonia settentrionale e Tracia contrastando le incursioni del DSE lungo le catene montuose del Kaimakchalan e dei Rodopi al confine con Jugoslavia e Bulgaria.',
      owner: 'GRE',
      fac: 'Alleati',
    };
  }

  return {
    name: `${d.capitalOrChefLieu} (${d.historicalRegion} — Regno di Grecia / Guerra Civile 1947)`,
    adminTitle: 'Vasileion tis Ellados — Re Paolo I · Governo Sofoulis & Dottrina Truman (1947)',
    note: 'Settembre 1947: regione sotto sovranità e controllo dell\'Esercito Nazionale ellenico durante la Terza Fase della Guerra Civile Greca, sostenuta dall\'assistenza militare ed economica statunitense AMAG.',
    owner: 'GRE',
    fac: 'Alleati',
  };
}
