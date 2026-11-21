export type OrgCategory = 'universal' | 'europe' | 'security' | 'regional';

export type OrgLifecycleStatus = 'inactive' | 'forming' | 'active' | 'crisis' | 'dissolved';

export type MemberRole =
  | 'Fondatore'
  | 'P5 · Veto'
  | 'Consiglio Permanente'
  | 'Membro'
  | 'Associato'
  | 'Osservatore'
  | 'Uscito'
  | 'Espulso'
  | 'Sospeso / Occupato';

export interface OrgMemberEntry {
  code: string;
  label?: string;
  role: MemberRole;
  joinStep: number;
  leaveStep?: number; // primo step in cui lo Stato non è più membro attivo (es. uscita/annessione/espulsione)
  exitReason?: string;
  exitType?: 'Uscito' | 'Espulso' | 'Sospeso / Occupato';
}

export interface OrgPhaseNote {
  fromStep: number;
  toStep: number;
  status: OrgLifecycleStatus;
  statusLabel: string;
  phaseTitle: string;
  summary: string;
}

export interface OrgMilestone {
  step: number;
  dateLabel: string;
  title: string;
  detail: string;
}

export interface OrgOrgan {
  name: string;
  role: string;
}

export interface InternationalOrganization {
  id: string;
  acronym: string;
  name: string;
  officialName: string;
  category: OrgCategory;
  categoryLabel: string;
  accentColor: string;
  headquarters: string;
  foundedDate: string;
  dissolvedDate?: string;
  treaty: string;
  keyFigures: string;
  mission: string;
  keyArticles: string[];
  organs: OrgOrgan[];
  phases: OrgPhaseNote[];
  milestones: OrgMilestone[];
  members: OrgMemberEntry[];
}

export interface ResolvedOrgState {
  status: OrgLifecycleStatus;
  statusLabel: string;
  phaseTitle: string;
  summary: string;
  activeMembers: OrgMemberEntry[];
  formerMembers: OrgMemberEntry[];
}

// Normalizza eventuali alias cartografici per collegare le feature sulla mappa agli elenchi dei membri
const OWNER_ALIAS_MAP: Record<string, string> = {
  THA: 'SIA',
  PER: 'PRU',
  AUT: 'AUS',
  DFJ: 'YUG',
  KHM: 'CAM',
  VNM: 'VIE',
  ROK: 'KOR',
};

export function normalizeOwnerForOrg(code: string): string {
  const c = String(code || '').trim().toUpperCase();
  return OWNER_ALIAS_MAP[c] || c;
}

export const INTERNATIONAL_ORGANIZATIONS: InternationalOrganization[] = [
  // 1. SOCIETÀ DELLE NAZIONI
  {
    id: 'sdn',
    acronym: 'SdN',
    name: 'Società delle Nazioni',
    officialName: 'Société des Nations / League of Nations',
    category: 'universal',
    categoryLabel: 'Istituzione Universale',
    accentColor: '#5aa0c2',
    headquarters: 'Ginevra (Palais des Nations)',
    foundedDate: '10 Gennaio 1920',
    dissolvedDate: '20 Aprile 1946',
    treaty: 'Patto della Società delle Nazioni (Parte I del Trattato di Versailles, 1919)',
    keyFigures: 'Joseph Avenol (Segretario Gen. 1933–40) · Seán Lester (1940–46) · Aristide Briand · Édouard Benes',
    mission:
      'Prima organizzazione intergovernativa permanente a vocazione universale per il mantenimento della pace, la sicurezza collettiva, il disarmo e l’amministrazione dei Mandati coloniali.',
    keyArticles: [
      'Art. 10: Garanzia dell’integrità territoriale e dell’indipendenza politica di tutti i Membri contro aggressioni esterne.',
      'Art. 16: Sanzioni economiche, finanziarie e facoltà di espulsione contro lo Stato che ricorra illegalmente alla guerra.',
      'Art. 22: Sistema dei Mandati (Classe A, B, C) affidati alle potenze alleate sui territori ex-ottomani ed ex-tedeschi.',
    ],
    organs: [
      { name: 'Assemblea Generale', role: 'Organo plenario con un voto per ciascuno Stato membro (regola dell’unanimità).' },
      { name: 'Consiglio della SdN', role: 'Organo esecutivo con seggi permanenti (UK, FRA, URSS fino al dic 1939, ITA fino al dic 1937).' },
      { name: 'Segretariato Permanente', role: 'Apparato amministrativo internazionale con sede a Ginevra (ridotto a Princeton dal 1940).' },
      { name: 'Corte Permanente di Giustizia Internazionale (CPGI)', role: 'Tribunale internazionale con sede all’Aja (precursore della CIG ONU).' },
    ],
    phases: [
      {
        fromStep: 0,
        toStep: 1,
        status: 'crisis',
        statusLabel: 'In Crisi',
        phaseTitle: 'Sanzioni all’Italia, Guerra d’Etiopia & Ritiro Italo-Tedesco',
        summary:
          'Dopo l’uscita di Germania e Giappone (1933) e il fallimento delle sanzioni contro l’Italia per l’Etiopia (revocate nel luglio 1936), l’Italia lascia la SdN l’11 dicembre 1937 e l’Anschluss del marzo 1938 cancella l’Austria senza reazioni di Ginevra.',
      },
      {
        fromStep: 2,
        toStep: 4,
        status: 'crisis',
        statusLabel: 'Paralisi Diplomatica',
        phaseTitle: 'Accordi di Monaco & Scomparsa della Cecoslovacchia',
        summary:
          'Ginevra è scavalcata dagli accordi di Monaco (ott 1938) e dallo smembramento cecoslovacco (mar 1939). Escono Ungheria e Spagna (apr 1939), mentre la crisi dei Mandati e dell’Albania resta priva di sanzioni.',
      },
      {
        fromStep: 5,
        toStep: 5,
        status: 'crisis',
        statusLabel: 'Crollo Operativo',
        phaseTitle: 'Scoppio della WWII — Espulsione dell’URSS (Dicembre 1939)',
        summary:
          'Con l’invasione di Polonia e Finlandia il sistema di sicurezza collettiva collassa. Il 14 dicembre 1939 l’Assemblea approva l’unico atto punitivo estremo dell’ente: l’espulsione dell’Unione Sovietica per la Guerra d’Inverno.',
      },
      {
        fromStep: 6,
        toStep: 18,
        status: 'crisis',
        statusLabel: 'Sospesa / Dormiente',
        phaseTitle: 'Ginevra Isolata — Trasferimento Uffici Economici a Princeton',
        summary:
          'Durante la Seconda Guerra Mondiale l’attività politica cessa; sopravvivono le sezioni tecniche, sanitarie ed economiche (trasferite a Princeton/Washington) fino alla fondazione dell’ONU nel 1945.',
      },
      {
        fromStep: 19,
        toStep: 34,
        status: 'dissolved',
        statusLabel: 'Sciolta (Apr 1946)',
        phaseTitle: 'Ultima Assemblea di Ginevra & Passaggio dei Mandati all’ONU',
        summary:
          'Sciolta formalmente il 20 aprile 1946: tutti gli immobili (Palais des Nations), archivi e Mandati residui passano alle Nazioni Unite e al Consiglio di Tutela.',
      },
    ],
    milestones: [
      { step: 0, dateLabel: 'Lug 1936', title: 'Fine delle Sanzioni all’Italia', detail: 'La SdN revoca le sanzioni economiche dopo la conquista italiana di Addis Abeba.' },
      { step: 1, dateLabel: '11 Dic 1937', title: 'L’Italia lascia Ginevra', detail: 'Dopo Germania e Giappone (1933), anche il Regno d’Italia notifica il ritiro.' },
      { step: 5, dateLabel: '14 Dic 1939', title: 'Espulsione dell’URSS', detail: 'Per l’aggressione alla Finlandia, l’Unione Sovietica viene espulsa ai sensi dell’Art. 16.' },
      { step: 18, dateLabel: '20 Apr 1946', title: 'Scioglimento Ufficiale', detail: 'La 21ª Assemblea chiude la Società delle Nazioni trasferendo beni e mandati all’ONU.' },
    ],
    members: [
      { code: 'UK', role: 'Consiglio Permanente', joinStep: 0, leaveStep: 19, exitReason: 'Scioglimento SdN (1946)' },
      { code: 'FRA', role: 'Consiglio Permanente', joinStep: 0, leaveStep: 19, exitReason: 'Scioglimento SdN (1946)' },
      { code: 'SOV', role: 'Consiglio Permanente', joinStep: 0, leaveStep: 6, exitType: 'Espulso', exitReason: 'Espulsa il 14 dicembre 1939 per l’invasione della Finlandia' },
      { code: 'ITA', role: 'Consiglio Permanente', joinStep: 0, leaveStep: 1, exitType: 'Uscito', exitReason: 'Ritiro notificato l’11 dicembre 1937' },
      { code: 'CHI', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'POL', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'RAJ', label: 'India Britannica', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'CAN', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'AST', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'NZL', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'SAF', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'IRE', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'AUS', role: 'Membro', joinStep: 0, leaveStep: 1, exitType: 'Sospeso / Occupato', exitReason: 'Anschluss al Reich (marzo 1938)' },
      { code: 'CZE', role: 'Membro', joinStep: 0, leaveStep: 3, exitType: 'Sospeso / Occupato', exitReason: 'Smembramento cecoslovacco (marzo 1939)' },
      { code: 'SPR', label: 'Spagna', role: 'Membro', joinStep: 0, leaveStep: 5, exitType: 'Uscito', exitReason: 'Ritiro della Spagna franchista (aprile/maggio 1939)' },
      { code: 'HUN', role: 'Membro', joinStep: 0, leaveStep: 4, exitType: 'Uscito', exitReason: 'Notifica di ritiro (aprile 1939)' },
      { code: 'ROM', role: 'Membro', joinStep: 0, leaveStep: 7, exitType: 'Uscito', exitReason: 'Ritiro romeno sotto regime Antonescu (luglio 1940)' },
      { code: 'BUL', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'YUG', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'GRE', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'ALB', role: 'Membro', joinStep: 0, leaveStep: 4, exitType: 'Sospeso / Occupato', exitReason: 'Annessione italiana (aprile 1939)' },
      { code: 'BEL', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'HOL', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'LUX', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'SWI', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'SWE', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'NOR', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'DEN', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'FIN', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'POR', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'TUR', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'EST', role: 'Membro', joinStep: 0, leaveStep: 6, exitType: 'Sospeso / Occupato', exitReason: 'Annessione sovietica (1940)' },
      { code: 'LAT', role: 'Membro', joinStep: 0, leaveStep: 6, exitType: 'Sospeso / Occupato', exitReason: 'Annessione sovietica (1940)' },
      { code: 'LIT', role: 'Membro', joinStep: 0, leaveStep: 6, exitType: 'Sospeso / Occupato', exitReason: 'Annessione sovietica (1940)' },
      { code: 'MEX', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'ARG', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'CHL', role: 'Membro', joinStep: 0, leaveStep: 7, exitType: 'Uscito', exitReason: 'Ritiro del Cile (1938/40)' },
      { code: 'COL', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'PRU', role: 'Membro', joinStep: 0, leaveStep: 5, exitType: 'Uscito', exitReason: 'Ritiro del Perù (1939)' },
      { code: 'VEN', role: 'Membro', joinStep: 0, leaveStep: 3, exitType: 'Uscito', exitReason: 'Ritiro del Venezuela (1938/40)' },
      { code: 'EGY', role: 'Membro', joinStep: 1, leaveStep: 19 },
      { code: 'IRQ', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'IRN', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'AFG', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'SIA', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'ETH', role: 'Membro', joinStep: 0, leaveStep: 19 },
      { code: 'LBR', role: 'Membro', joinStep: 0, leaveStep: 19 },
    ],
  },

  // 2. ORGANIZZAZIONE DELLE NAZIONI UNITE (ONU)
  {
    id: 'onu',
    acronym: 'ONU',
    name: 'Organizzazione delle Nazioni Unite',
    officialName: 'United Nations Organization (UNO) / Organisation des Nations Unies',
    category: 'universal',
    categoryLabel: 'Istituzione Universale',
    accentColor: '#3b82f6',
    headquarters: 'San Francisco (1945) → Lake Success / New York',
    foundedDate: '1° Gen 1942 (Dichiarazione) · 24 Ott 1945 (Carta)',
    treaty: 'Dichiarazione delle Nazioni Unite (1942) · Carta di San Francisco (26 Giugno 1945)',
    keyFigures: 'Franklin D. Roosevelt · Winston Churchill · Trygve Lie (1946–52) · Dag Hammarskjöld (2° Segretario Gen. dal 10 Apr 1953) · Eleanor Roosevelt',
    mission:
      'Garantire la pace e la sicurezza internazionale tramite il Consiglio di Sicurezza con diritto di veto delle 5 grandi potenze, promuovere i diritti umani, la cooperazione economica e la decolonizzazione guidata.',
    keyArticles: [
      'Cap. V (Art. 23–27): Consiglio di Sicurezza con 5 Membri Permanenti (USA, UK, URSS, Francia, Cina) dotati di potere di veto.',
      'Cap. VII: Azioni coercitive e impiego della forza autorizzata contro minacce alla pace (applicato per la prima volta in Corea, giu–lug 1950).',
      'Cap. XII: Sistema delle Amministrazioni Fiduciarie ONU (es. AFIS in Somalia dal 1° aprile 1950).',
    ],
    organs: [
      { name: 'Consiglio di Sicurezza (UNSC)', role: '5 Membri Permanenti (P5) + 6 non permanenti; decisioni vincolanti per la sicurezza.' },
      { name: 'Assemblea Generale (UNGA)', role: 'Foro universale (51 fondatori nel 1945 → 60 membri nel dic 1950); adotta la Risoluzione 181 e la Dichiarazione dei Diritti Umani (1948).' },
      { name: 'Segretariato Generale', role: 'Guidato da Trygve Lie (1946–52) e dal 10 aprile 1953 da Dag Hammarskjöld al Palazzo di Vetro di New York.' },
      { name: 'Consiglio di Tutela (Trusteeship Council)', role: 'Supervisiona i territori in amministrazione fiduciaria (Somalia AFIS, Pacifico, Camerun, Togo, Tanganica).' },
    ],
    phases: [
      {
        fromStep: 0,
        toStep: 9,
        status: 'inactive',
        statusLabel: 'Pre-Fondazione',
        phaseTitle: 'Carta Atlantica (Agosto 1941) — Prima della Coalizione ONU',
        summary:
          'L’organizzazione non è ancora nata. Nell’agosto 1941 Roosevelt e Churchill fissano nella Carta Atlantica i principi che porteranno alla Dichiarazione delle Nazioni Unite.',
      },
      {
        fromStep: 10,
        toStep: 17,
        status: 'forming',
        statusLabel: 'Coalizione Bellica',
        phaseTitle: 'Nazioni Unite (1942) → Conferenze di Dumbarton Oaks & San Francisco',
        summary:
          'Dal 1° gennaio 1942 "Nazioni Unite" indica l’alleanza di 26+ Stati in guerra contro l’Asse. Ad aprile 1945 si apre a San Francisco la Conferenza istitutiva della Carta ONU.',
      },
      {
        fromStep: 18,
        toStep: 24,
        status: 'active',
        statusLabel: 'Attiva (Carta 1945)',
        phaseTitle: 'Entrata in Vigore della Carta, Partizione Palestina & Diritti Umani',
        summary:
          'Attiva dal 24 ottobre 1945 con 51 membri fondatori. L’ONU vara la Risoluzione 181 sulla Palestina (nov 1947), la Dichiarazione Universale dei Diritti Umani (dic 1948) e ammette Pakistan, Yemen, Birmania e Israele (1947–49).',
      },
      {
        fromStep: 25,
        toStep: 26,
        status: 'active',
        statusLabel: 'Attiva · Guerra di Corea',
        phaseTitle: 'Mandato AFIS in Somalia, Comando ONU in Corea & Risoluzione Eritrea',
        summary:
          'Nel 1950 l’ONU affida l’AFIS in Somalia all’Italia (apr 1950), approva le Risoluzioni 82–84 istituendo il Comando ONU in Corea (approfittando del boicottaggio sovietico), ammette l’Indonesia (set 1950) e vota la federazione Eritrea-Etiopia (dic 1950).',
      },
      {
        fromStep: 27,
        toStep: 27,
        status: 'active',
        statusLabel: 'Attiva · Linea Kansas (Corea)',
        phaseTitle: 'Stabilizzazione Linea Kansas, Offerta Armistizio & Libia Provvisoria',
        summary:
          'Nel primo semestre 1951 le forze del Comando ONU (UNC, Gen. Ridgway dall’11 apr) stabilizzano il fronte sulla Linea Kansas/Wyoming oltre il 38° parallelo e trasmettono il 30 giugno l’offerta radiofonica di negoziati (Kaesong inizierà solo il 10 lug). In Libia nasce il Governo Federale Provvisorio (29 mar 1951) sotto supervisione ONU/UK/FRA verso l’indipendenza di dicembre.',
      },
      {
        fromStep: 28,
        toStep: 28,
        status: 'active',
        statusLabel: 'Attiva · Indipendenza Libia & Panmunjom',
        phaseTitle: 'Indipendenza del Regno Unito di Libia (24 Dic 1951) & Linea di Demarcazione a Panmunjom',
        summary:
          'Il 24 dicembre 1951, in attuazione della Risoluzione ONU 289 (IV) e sotto la supervisione del Commissario ONU Adrian Pelt, nasce il Regno Unito di Libia sotto Re Idris I (primo Stato reso indipendente sotto egida ONU). In Corea i colloqui d’armistizio aperti a Kaesong (10 lug) e trasferiti a Panmunjom (25 ott) fissano il 27 novembre 1951 la Linea di Demarcazione Militare (MDL) provvisoria.',
      },
      {
        fromStep: 29,
        toStep: 29,
        status: 'active',
        statusLabel: 'Attiva · Federazione Eritrea & Panmunjom',
        phaseTitle: 'Federazione Etiopia–Eritrea (15 Set 1952), Stallo sui Prigionieri a Panmunjom & Palazzo di Vetro NY',
        summary:
          'Il 15 settembre 1952 entra in vigore la Risoluzione ONU 390 A(V): cessa l’Amministrazione Militare Britannica (BMA) e l’Eritrea viene federata come unità autonoma con proprio parlamento e bandiera sotto la corona dell’Impero d’Etiopia. In Corea prosegue la guerra di trincea lungo la MDL (*White Horse*, *Triangle Hill*) mentre i negoziati a Panmunjom restano bloccati sulla questione del rimpatrio dei prigionieri (POW); ad ottobre 1952 si completa il complesso permanente del Palazzo di Vetro a New York e il 10 novembre Trygve Lie annuncia le dimissioni.',
      },
      {
        fromStep: 30,
        toStep: 30,
        status: 'active',
        statusLabel: 'Attiva · Hammarskjöld & Armistizio Corea',
        phaseTitle: 'Segretario Gen. Dag Hammarskjöld (10 Apr 1953) & Armistizio di Panmunjom in Corea (27 Luglio 1953)',
        summary:
          'Il 10 aprile 1953 lo svedese Dag Hammarskjöld assume la carica di 2° Segretario Generale delle Nazioni Unite al Palazzo di Vetro di New York. Il 27 luglio 1953 il Comando ONU (UNC), Corea del Nord e Volontari Cinesi firmano l’Armistizio di Panmunjom istituendo la Zona Demilitarizzata (DMZ) lungo la MDL e la Commissione Neutrale di Supervisione. Restano ancora fuori dall’ONU (fino al compromesso del dicembre 1955) i nuovi Stati indipendenti di Laos e Cambogia.',
      },
      {
        fromStep: 31,
        toStep: 31,
        status: 'active',
        statusLabel: 'Attiva · ICSC Indocina & TLT',
        phaseTitle: 'Accordi di Ginevra (ICSC India–Canada–Polonia), Scomparsa del TLT & Veto Incrociato sulle Ammissioni (Dic 1954)',
        summary:
          'Nel 1954 l’ONU prende atto della partizione del Territorio Libero di Trieste (Memorandum di Londra del 5 ottobre) e affianca il monitoraggio armistiziale coreano, mentre gli Accordi di Ginevra del 20–21 luglio istituiscono le Commissioni Internazionali di Controllo (ICSC: India, Canada e Polonia) sul 17° parallelo in Vietnam, in Laos e in Cambogia. Restano bloccate dal veto sino al dicembre 1955 le ammissioni di Italia, Austria, Giappone, Laos e Cambogia (al CdS siede la Cina ROC).',
      },
      {
        fromStep: 32,
        toStep: 32,
        status: 'active',
        statusLabel: 'Attiva · Allargamento in Blocco (+16 Stati)',
        phaseTitle: 'Storico Compresso del "Package Deal" del 14 Dicembre 1955 (+16 Nuovi Membri ONU)',
        summary:
          'Il 14 dicembre 1955 l’Assemblea Generale e il Consiglio di Sicurezza sbloccano anni di veti incrociati della Guerra Fredda ammettendo simultaneamente 16 Stati: Italia, Austria, Irlanda, Portogallo, Spagna, Finlandia, Albania, Bulgaria, Romania, Ungheria, Giordania, Libia, Nepal, Ceylon, Cambogia e Laos (restano esclusi Giappone, Mongolia e gli Stati divisi di Germania, Corea e Vietnam).',
      },
      {
        fromStep: 33,
        toStep: 33,
        status: 'active',
        statusLabel: 'Attiva · 80 Stati & Prima Forza UNEF (Suez)',
        phaseTitle: 'Ammissione di Sudan, Marocco, Tunisia (12 Nov) e Giappone (18 Dic 1956) · Creazione Caschi Blu UNEF',
        summary:
          'Nel 1956 l’ONU sale a 80 membri con l’ingresso dei nuovi Stati indipendenti di Sudan (`SUD`), Marocco (`MAR`) e Tunisia (`TUN`) il 12 novembre e del Giappone (`JAP`) il 18 dicembre 1956 (dopo la Dichiarazione nippo-sovietica di ottobre). Sotto Dag Hammarskjöld e Lester Pearson, durante la Crisi di Suez di novembre nasce la prima forza di mantenimento della pace (UNEF — Risoluzioni 998/1000), schierata sul Canale di Suez entro il 22 dicembre, mentre l’Assemblea condanna l’intervento sovietico in Ungheria.',
      },
      {
        fromStep: 34,
        toStep: 34,
        status: 'active',
        statusLabel: 'Attiva · 82 Stati (Ghana & Malesia) · UNEF a Gaza/Sinai',
        phaseTitle: 'Ammissione di Ghana (8 Mar) e Federazione della Malesia (17 Set 1957) · UNEF a Gaza e Stretto di Tiran',
        summary:
          'Nel 1957 le Nazioni Unite salgono a 82 membri con l’ingresso del Ghana (`GHA`, 8 marzo, due giorni dopo l’indipendenza) e della Federazione della Malesia (`MAL`, 17 settembre). Sotto il Segretario Generale Dag Hammarskjöld (rieletto nel set 1957), l’UNEF presidia il ritiro israeliano da Gaza e dal Sinai (marzo 1957) e garantisce lo Stretto di Tiran mentre il Canale di Suez riapre in aprile.',
      },
    ],
    milestones: [
      { step: 10, dateLabel: '1° Gen 1942', title: 'Dichiarazione delle Nazioni Unite', detail: '26 nazioni alleate firmano a Washington la Carta dell’alleanza contro il Patto Tripartito.' },
      { step: 18, dateLabel: '24 Ott 1945', title: 'Entrata in Vigore della Carta ONU', detail: 'Ratificata da 51 Stati originari tra cui i 5 permanenti del Consiglio di Sicurezza.' },
      { step: 20, dateLabel: '29 Nov 1947', title: 'Risoluzione 181 sulla Palestina', detail: 'L’Assemblea Generale approva il piano di spartizione del Mandato britannico.' },
      { step: 22, dateLabel: '10 Dic 1948', title: 'Dichiarazione Universale dei Diritti Umani', detail: 'Adottata a Parigi (Palais de Chaillot) su impulso della commissione di Eleanor Roosevelt.' },
      { step: 25, dateLabel: '25 Giu – 7 Lug 1950', title: 'Risoluzioni 82–84 · Comando ONU (UNC)', detail: 'In assenza del delegato sovietico Malik, il CdS condanna l’invasione della Corea del Sud e lancia la forza ONU.' },
      { step: 27, dateLabel: '30 Giu 1951', title: 'Offerta Armistizio UNC in Corea', detail: 'Attestato sulla Linea Kansas, il Gen. Ridgway trasmette via radio la proposta di colloqui (apertura a Kaesong il 10 lug 1951).' },
      { step: 28, dateLabel: '27 Nov & 24 Dic 1951', title: 'MDL di Panmunjom & Indipendenza della Libia', detail: 'Fissata a Panmunjom la Linea di Demarcazione Militare provvisoria in Corea; il 24 dicembre nasce sotto egida ONU il Regno Unito di Libia.' },
      { step: 29, dateLabel: '15 Set 1952', title: 'Entrata in Vigore Federazione Etiopia–Eritrea', detail: 'In attuazione della Risoluzione ONU 390 A(V), cessa la BMA britannica e l’Eritrea diviene unità autonoma federata all’Impero d’Etiopia.' },
      { step: 30, dateLabel: '10 Apr & 27 Lug 1953', title: 'Nomina di Hammarskjöld & Armistizio Coreano', detail: 'Hammarskjöld nuovo Segretario Generale ONU; a Panmunjom il Comando ONU firma l’armistizio che sospende la guerra di Corea.' },
      { step: 31, dateLabel: '20 Lug & 5 Ott 1954', title: 'Ginevra ICSC & Nota TLT al CdS', detail: 'Commissioni ICSC (India–Canada–Polonia) in Indocina; Italia e Jugoslavia notificano al Consiglio di Sicurezza il Memorandum di Londra su Trieste.' },
      { step: 32, dateLabel: '14 Dic 1955', title: 'Package Deal — Ammissione in Blocco di 16 Stati', detail: 'Ammessi simultaneamente ALB, AUS, BUL, CAM, CEY, FIN, HUN, IRE, ITA, JOR, LAO, LBY, NEP, POR, ROM, SPA (Risoluzione 995).' },
      { step: 33, dateLabel: 'Nov – 18 Dic 1956', title: 'Creazione Caschi Blu UNEF · Ingresso SUD, MAR, TUN e Giappone (80 Membri)', detail: 'Sessione speciale su Suez e Ungheria; prima forza di pace UNEF in Egitto (Risoluzione 1000) e ingresso all’ONU di SUD, MAR, TUN (12 nov) e JAP (18 dic).' },
      { step: 34, dateLabel: '6 Mar – 17 Set 1957', title: 'Dispiegamento UNEF a Gaza/Tiran · Ingresso di Ghana (81°) e Malesia (82°)', detail: 'UNEF subentra al ritiro israeliano da Gaza e Sharm el-Sheikh (marzo 1957); ammessi Ghana (8 mar) e Federazione della Malesia (17 set).' },
    ],
    members: [
      { code: 'USA', role: 'P5 · Veto', joinStep: 10 },
      { code: 'UK', role: 'P5 · Veto', joinStep: 10 },
      { code: 'SOV', role: 'P5 · Veto', joinStep: 10 },
      { code: 'CHI', label: 'Rep. di Cina (ROC)', role: 'P5 · Veto', joinStep: 10 },
      { code: 'FRA', role: 'P5 · Veto', joinStep: 14 },
      { code: 'CAN', role: 'Fondatore', joinStep: 10 },
      { code: 'AST', role: 'Fondatore', joinStep: 10 },
      { code: 'NZL', role: 'Fondatore', joinStep: 10 },
      { code: 'SAF', role: 'Fondatore', joinStep: 10 },
      { code: 'RAJ', role: 'Fondatore', joinStep: 10, leaveStep: 19 },
      { code: 'IND', role: 'Fondatore', joinStep: 19 },
      { code: 'POL', role: 'Fondatore', joinStep: 10 },
      { code: 'CZE', role: 'Fondatore', joinStep: 10 },
      { code: 'DFJ', label: 'Jugoslavia', role: 'Fondatore', joinStep: 14 },
      { code: 'GRE', role: 'Fondatore', joinStep: 10 },
      { code: 'BEL', role: 'Fondatore', joinStep: 10 },
      { code: 'HOL', role: 'Fondatore', joinStep: 10 },
      { code: 'LUX', role: 'Fondatore', joinStep: 10 },
      { code: 'NOR', role: 'Fondatore', joinStep: 10 },
      { code: 'DEN', role: 'Fondatore', joinStep: 18 },
      { code: 'TUR', role: 'Fondatore', joinStep: 17 },
      { code: 'BRA', role: 'Fondatore', joinStep: 11 },
      { code: 'MEX', role: 'Fondatore', joinStep: 10 },
      { code: 'ARG', role: 'Fondatore', joinStep: 17 },
      { code: 'CHL', role: 'Fondatore', joinStep: 17 },
      { code: 'COL', role: 'Fondatore', joinStep: 14 },
      { code: 'PRU', role: 'Fondatore', joinStep: 17 },
      { code: 'VEN', role: 'Fondatore', joinStep: 17 },
      { code: 'CUB', role: 'Fondatore', joinStep: 10 },
      { code: 'EGY', role: 'Fondatore', joinStep: 17 },
      { code: 'IRQ', role: 'Fondatore', joinStep: 12 },
      { code: 'IRN', role: 'Fondatore', joinStep: 13 },
      { code: 'SAU', role: 'Fondatore', joinStep: 17 },
      { code: 'SYR', role: 'Fondatore', joinStep: 18 },
      { code: 'LEB', role: 'Fondatore', joinStep: 18 },
      { code: 'ETH', role: 'Fondatore', joinStep: 12 },
      { code: 'LBR', role: 'Fondatore', joinStep: 14 },
      { code: 'PHL', role: 'Fondatore', joinStep: 10 },
      { code: 'AFG', role: 'Membro', joinStep: 19 },
      { code: 'ICE', role: 'Membro', joinStep: 19 },
      { code: 'SWE', role: 'Membro', joinStep: 19 },
      { code: 'SIA', label: 'Thailandia', role: 'Membro', joinStep: 19 },
      { code: 'PAK', role: 'Membro', joinStep: 19 },
      { code: 'YEM', role: 'Membro', joinStep: 19 },
      { code: 'BUR', role: 'Membro', joinStep: 21 },
      { code: 'ISR', role: 'Membro', joinStep: 23 },
      { code: 'IDN', role: 'Membro', joinStep: 26 },
      { code: 'ALB', label: 'Albania', role: 'Membro', joinStep: 32 },
      { code: 'AUS', label: 'Austria', role: 'Membro', joinStep: 32 },
      { code: 'BUL', label: 'Bulgaria', role: 'Membro', joinStep: 32 },
      { code: 'CAM', label: 'Cambogia', role: 'Membro', joinStep: 32 },
      { code: 'CEY', label: 'Ceylon', role: 'Membro', joinStep: 32 },
      { code: 'FIN', label: 'Finlandia', role: 'Membro', joinStep: 32 },
      { code: 'HUN', label: 'Ungheria', role: 'Membro', joinStep: 32 },
      { code: 'IRE', label: 'Irlanda', role: 'Membro', joinStep: 32 },
      { code: 'ITA', label: 'Italia', role: 'Membro', joinStep: 32 },
      { code: 'JOR', label: 'Giordania', role: 'Membro', joinStep: 32 },
      { code: 'LAO', label: 'Laos', role: 'Membro', joinStep: 32 },
      { code: 'LBY', label: 'Libia', role: 'Membro', joinStep: 32 },
      { code: 'NEP', label: 'Nepal', role: 'Membro', joinStep: 32 },
      { code: 'POR', label: 'Portogallo', role: 'Membro', joinStep: 32 },
      { code: 'ROM', label: 'Romania', role: 'Membro', joinStep: 32 },
      { code: 'SPA', label: 'Spagna', role: 'Membro', joinStep: 32 },
      { code: 'SUD', label: 'Sudan', role: 'Membro', joinStep: 33 },
      { code: 'MAR', label: 'Marocco', role: 'Membro', joinStep: 33 },
      { code: 'TUN', label: 'Tunisia', role: 'Membro', joinStep: 33 },
      { code: 'JAP', label: 'Giappone', role: 'Membro', joinStep: 33 },
      { code: 'GHA', label: 'Ghana', role: 'Membro', joinStep: 34 },
      { code: 'MAL', label: 'Federazione della Malesia', role: 'Membro', joinStep: 34 },
    ],
  },

  // 3. CECA — COMUNITÀ EUROPEA DEL CARBONE E DELL'ACCIAIO
  {
    id: 'ceca',
    acronym: 'CECA',
    name: 'Comunità Europea del Carbone e dell’Acciaio',
    officialName: 'Communauté Européenne du Charbon et de l’Acier (CECA / ECSC)',
    category: 'europe',
    categoryLabel: 'Integrazione Europea',
    accentColor: '#eab308',
    headquarters: 'Parigi (Conferenza 1950–51) → Lussemburgo (Alta Autorità dal 10 Ago 1952)',
    foundedDate: '9 Mag 1950 (Dichiarazione Schuman) · 18 Apr 1951 (Trattato) · 23 Lug 1952 (In vigore)',
    treaty: 'Dichiarazione Schuman (9 Maggio 1950) · Trattato di Parigi (firmato il 18 Aprile 1951; in vigore il 23 Luglio 1952)',
    keyFigures: 'Jean Monnet (1° Presidente Alta Autorità, Ago 1952) · Robert Schuman · Konrad Adenauer (BRD) · Alcide De Gasperi (ITA) · Paul-Henri Spaak',
    mission:
      'Mettere in comune la produzione franco-tedesca ed europea di carbone e acciaio sotto un’Alta Autorità sovranazionale indipendente, rendendo materialmente impossibile una nuova guerra in Europa.',
    keyArticles: [
      'Dichiarazione Schuman (9 Mag 1950): "L’Europa non potrà farsi in una sola volta [...] sorgerà da realizzazioni concrete che creino anzitutto una solidarietà di fatto."',
      'Alta Autorità Sovranazionale (insediata a Lussemburgo il 10 Ago 1952): primo organo esecutivo europeo indipendente dai singoli governi nazionali per quote, prezzi e investimenti siderurgici.',
      'Mercato Comune del Carbone e dell’Acciaio: abolizione progressiva di dazi e contingenti tra i Sei (inclusa la Ruhr e la Lorena).',
    ],
    organs: [
      { name: 'Alta Autorità (Lussemburgo, dal 10 Ago 1952)', role: 'Esecutivo collegiale sovranazionale a 9 membri presieduto da Jean Monnet con poteri vincolanti diretti sulle imprese.' },
      { name: 'Consiglio Speciale dei Ministri', role: 'Raccordo intergovernativo tra l’Alta Autorità e i governi nazionali dei Sei (FRA, BRD, ITA, BEL, HOL, LUX).' },
      { name: 'Assemblea Comune (Strasburgo) & Corte di Giustizia (Lussemburgo)', role: 'Controllo parlamentare (1ª sessione 10 set 1952 sotto Paul-Henri Spaak) e giurisdizionale (insediata il 4 dic 1952).' },
    ],
    phases: [
      {
        fromStep: 0,
        toStep: 23,
        status: 'inactive',
        statusLabel: 'Non Istituita',
        phaseTitle: 'Pre-Storia — Piano Monnet & Autorità Internazionale della Ruhr',
        summary:
          'La CECA non esiste ancora. Dal 1949 gli Alleati occidentali gestiscono la siderurgia tedesca tramite l’Autorità Internazionale della Ruhr, fonte di forti attriti franco-tedeschi.',
      },
      {
        fromStep: 24,
        toStep: 24,
        status: 'inactive',
        statusLabel: 'Pre-Proposta (Dic 1949)',
        phaseTitle: 'Vigilia della Dichiarazione Schuman',
        summary:
          'Con la nascita della Repubblica Federale Tedesca (1949), Parigi prepara un nuovo quadro politico per integrare stabilmente la Germania Ovest nel campo democratico occidentale.',
      },
      {
        fromStep: 25,
        toStep: 26,
        status: 'forming',
        statusLabel: 'In Negoziato (Piano Schuman)',
        phaseTitle: 'Dichiarazione Schuman (9 Mag 1950) & Negoziati di Parigi dei Sei',
        summary:
          'Il 9 maggio 1950 Robert Schuman propone il pool carbosiderurgico su progetto di Jean Monnet. Il 20 giugno 1950 Francia, Germania Ovest, Italia e Benelux aprono i negoziati a Parigi; il Regno Unito declina per non cedere sovranità. Il Trattato di Parigi sarà firmato il 18 aprile 1951.',
      },
      {
        fromStep: 27,
        toStep: 28,
        status: 'forming',
        statusLabel: 'Trattato Firmato (18 Apr 1951) · Ratifiche',
        phaseTitle: 'Firma del Trattato di Parigi (18 Aprile 1951) — Iter di Ratifica Parlamentare (In Vigore Lug 1952)',
        summary:
          'Il 18 aprile 1951 Francia, Repubblica Federale Tedesca, Italia, Belgio, Paesi Bassi e Lussemburgo firmano a Parigi il Trattato istitutivo della CECA. Nel secondo semestre 1951 procedono le ratifiche parlamentari (Paesi Bassi ott 1951, Assemblée Nationale francese 13 dic 1951), ma il Trattato entrerà formalmente in vigore solo il 23 luglio 1952 (e nessuna bandiera CECA esiste nel 1951).',
      },
      {
        fromStep: 29,
        toStep: 29,
        status: 'active',
        statusLabel: 'Attiva (Alta Autorità a Lussemburgo)',
        phaseTitle: 'Entrata in Vigore del Trattato di Parigi (23 Luglio 1952) & Insediamento dell’Alta Autorità (10 Agosto 1952)',
        summary:
          'Il 23 luglio 1952 entra ufficialmente in vigore il Trattato di Parigi tra Francia, Repubblica Federale Tedesca, Italia, Belgio, Paesi Bassi e Lussemburgo (contestualmente viene sciolta l’Autorità Internazionale della Ruhr). Il 10 agosto 1952 s’insedia a Lussemburgo l’Alta Autorità sovranazionale presieduta da Jean Monnet, seguita il 10 settembre dalla prima sessione dell’Assemblea Comune a Strasburgo e il 4 dicembre dalla Corte di Giustizia.',
      },
      {
        fromStep: 30,
        toStep: 30,
        status: 'active',
        statusLabel: 'Attiva · Mercato Comune Carbo-Siderurgico',
        phaseTitle: 'Apertura del Mercato Comune per Carbone & Ferro (10 Feb 1953) e per l’Acciaio (1° Mag 1953)',
        summary:
          'Nel 1953 la CECA diviene pienamente operativa sul piano economico: il 10 febbraio 1953 cade la barriera doganale tra i Sei (inclusa la Saar rappresentata dalla Francia) per carbone, minerale di ferro e rottami; il 1° maggio 1953 apre il mercato comune dell’acciaio sotto la vigilanza dell’Alta Autorità guidata da Jean Monnet a Lussemburgo, mentre resta bloccata nei parlamenti nazionali la ratifica della Comunità Europea di Difesa (CED).',
      },
      {
        fromStep: 31,
        toStep: 31,
        status: 'active',
        statusLabel: 'Attiva · Post-Bocciatura CED (30 Ago 1954)',
        phaseTitle: 'Consolidamento del Mercato Carbo-Siderurgico tra i Sei dopo il Naufragio della CED (30 Agosto 1954)',
        summary:
          'Dopo che l’Assemblea Nazionale francese respinge la Comunità Europea di Difesa (CED) il 30 agosto 1954 affossando anche la Comunità Politica Europea (CPE), la CECA rimane l’unica istituzione sovranazionale operativa tra i Sei sotto Jean Monnet (che annuncia nel novembre 1954 l’intenzione di rilanciare l’integrazione economica verso il futuro Benelux–Messina).',
      },
      {
        fromStep: 32,
        toStep: 32,
        status: 'active',
        statusLabel: 'Attiva · Rilancio di Messina (Giu 1955)',
        phaseTitle: 'Conferenza di Messina (1–3 Giu 1955), Presidenza René Mayer & Rilancio verso Mercato Comune ed Euratom',
        summary:
          'Dopo le dimissioni di Jean Monnet (succeduto da René Mayer alla guida dell’Alta Autorità CECA), i Ministri degli Esteri dei Sei riuniti alla Conferenza di Messina (1–3 giugno 1955) affidano al Comitato Spaak lo studio per il Mercato Comune Europeo e l’Euratom (Saar ancora rappresentata dalla Francia fino al 1957).',
      },
      {
        fromStep: 33,
        toStep: 33,
        status: 'active',
        statusLabel: 'Attiva · Rapporto Spaak & Val Duchesse (Pre-Trattati di Roma)',
        phaseTitle: 'Rapporto Spaak (21 Apr 1956), Negoziati di Val Duchesse & Trattato del Lussemburgo sulla Saar (27 Ott 1956)',
        summary:
          'Nel 1956 i Sei della CECA approvano il Rapporto Spaak (Conferenza di Venezia, maggio 1956) aprendo i negoziati intergovernativi a Val Duchesse; al 31 dicembre 1956 CEE ed Euratom NON sono tuttavia ancora stati firmati (firma dei Trattati di Roma solo il 25 marzo 1957). Con il Trattato del Lussemburgo (27 ott 1956), la Saar passa politicamente alla Germania Ovest allo scoccare del 1° gennaio 1957.',
      },
      {
        fromStep: 34,
        toStep: 34,
        status: 'active',
        statusLabel: 'Attiva · Firma Trattati di Roma (CEE & Euratom, 25 Mar 1957)',
        phaseTitle: 'Saarland nella RFT (1° Gen 1957) & Firma dei Trattati di Roma in Campidoglio (25 Marzo 1957)',
        summary:
          'Dal 1° gennaio 1957 il Saarland rientra politicamente nella Repubblica Federale Tedesca (`BRD`) pur mantenendo il regime economico transitorio con la Francia fino al 1959. Il 25 marzo 1957 i Sei della CECA (`BEL`, `FRA`, `BRD`, `ITA`, `LUX`, `HOL`) firmano a Roma i Trattati di Roma istitutivi della Comunità Economica Europea (CEE — Mercato Comune) e dell’Euratom, ratificati entro fine 1957 (entrata in vigore 1° gennaio 1958).',
      },
    ],
    milestones: [
      { step: 23, dateLabel: '28 Apr 1949', title: 'Autorità Internazionale della Ruhr', detail: 'Regime alleato di controllo sul carbone della Ruhr prima dell’iniziativa francese.' },
      { step: 25, dateLabel: '9 Mag 1950', title: 'Dichiarazione Schuman al Quai d’Orsay', detail: 'Proposta storica di porre carbone e acciaio franco-tedeschi sotto un’Alta Autorità comune.' },
      { step: 25, dateLabel: '20 Giu 1950', title: 'Apertura Conferenza dei Sei a Parigi', detail: 'Inizio dei negoziati tra FRA, BRD, ITA, BEL, HOL e LUX (bozza completata fine 1950; firma apr 1951).' },
      { step: 27, dateLabel: '18 Apr 1951', title: 'Firma del Trattato di Parigi (CECA)', detail: 'I Sei firmano il trattato istitutivo della CECA (entrata in vigore luglio 1952; nessuna bandiera sovranazionale fino al 1958).' },
      { step: 29, dateLabel: '23 Lug & 10 Ago 1952', title: 'Entrata in Vigore CECA & Alta Autorità a Lussemburgo', detail: 'Entra in vigore il Trattato di Parigi tra i Sei; il 10 agosto 1952 Jean Monnet inaugura a Lussemburgo l’Alta Autorità sovranazionale della CECA.' },
      { step: 30, dateLabel: '10 Feb & 1° Mag 1953', title: 'Mercato Comune Carbone-Acciaio Operativo', detail: 'Abolizione di dazi e contingenti tra i Sei per carbone e minerale di ferro (10 feb) e acciaio (1° mag).' },
      { step: 31, dateLabel: '30 Ago 1954', title: 'Bocciatura CED a Parigi — CECA Pilastro Unico', detail: 'Caduta la CED, l’Alta Autorità CECA a Lussemburgo resta il solo nucleo sovranazionale europeo dei Sei.' },
      { step: 32, dateLabel: '1–3 Giu 1955', title: 'Conferenza di Messina & Comitato Spaak', detail: 'I Sei rilanciano il processo d’integrazione europea ponendo le basi dei futuri Trattati di Roma (CEE ed Euratom).' },
      { step: 33, dateLabel: '21 Apr – 27 Ott 1956', title: 'Rapporto Spaak & Trattato del Lussemburgo (Saar)', detail: 'Avvio negoziati di Val Duchesse verso CEE/Euratom (non ancora firmati fino al mar 1957); accordi franco-tedeschi sul rientro della Saar dal 1° gen 1957.' },
      { step: 34, dateLabel: '25 Mar 1957', title: 'Firma dei Trattati di Roma (CEE ed Euratom)', detail: 'I Sei (BEL, FRA, BRD, ITA, LUX, HOL) firmano in Campidoglio i trattati istitutivi del Mercato Comune (CEE) e dell’Euratom (in vigore 1° gen 1958); la Saar è già Land della RFT dal 1° gen.' },
    ],
    members: [
      { code: 'FRA', role: 'Fondatore', joinStep: 25 },
      { code: 'BRD', role: 'Fondatore', joinStep: 25 },
      { code: 'ITA', role: 'Fondatore', joinStep: 25 },
      { code: 'BEL', role: 'Fondatore', joinStep: 25 },
      { code: 'HOL', role: 'Fondatore', joinStep: 25 },
      { code: 'LUX', role: 'Fondatore', joinStep: 25 },
    ],
  },

  // 4. CONSIGLIO D'EUROPA
  {
    id: 'coe',
    acronym: 'CdE',
    name: 'Consiglio d’Europa',
    officialName: 'Council of Europe / Conseil de l’Europe',
    category: 'europe',
    categoryLabel: 'Integrazione Europea',
    accentColor: '#38bdf8',
    headquarters: 'Strasburgo (Palais de l’Europe / Casa d’Europa)',
    foundedDate: '5 Maggio 1949',
    treaty: 'Trattato di Londra (Statuto del Consiglio d’Europa, 5 Maggio 1949)',
    keyFigures: 'Paul-Henri Spaak (1° Presidente Assemblea) · Ernest Bevin · Alcide De Gasperi · Winston Churchill (Congresso dell’Aja 1948)',
    mission:
      'Prima istituzione politica paneuropea del dopoguerra dedicata alla tutela dei diritti umani, della democrazia pluralista e dello Stato di diritto, nata dal Congresso dell’Aja (maggio 1948).',
    keyArticles: [
      'Art. 3 Statuto di Londra: Obbligo per ogni membro di accettare il principio della preminenza del diritto e i diritti umani.',
      'CEDU (Roma, 4 Novembre 1950): Firma a Palazzo Barberini della Convenzione Europea per la salvaguardia dei Diritti dell’Uomo e delle Libertà Fondamentali.',
    ],
    organs: [
      { name: 'Comitato dei Ministri', role: 'Organo decisionale composto dai Ministri degli Esteri dei paesi membri.' },
      { name: 'Assemblea Consultiva', role: 'Prima assemblea parlamentare europea nella storia (sede a Strasburgo).' },
      { name: 'Corte EDU (prevista dalla CEDU 1950)', role: 'Sistema giurisdizionale sovranazionale di tutela dei diritti fondamentali.' },
    ],
    phases: [
      {
        fromStep: 0,
        toStep: 22,
        status: 'inactive',
        statusLabel: 'Non Istituito',
        phaseTitle: 'Dal Congresso dell’Aja (Maggio 1948) ai Negoziati di Londra',
        summary:
          'Dopo il Congresso dell’Aja promosso da Churchill e dai movimenti federalisti nel maggio 1948, i cinque del Patto di Bruxelles preparano lo Statuto del Consiglio d’Europa.',
      },
      {
        fromStep: 23,
        toStep: 34,
        status: 'active',
        statusLabel: 'Attivo (Strasburgo · Bandiera 12 Stelle)',
        phaseTitle: '10 Fondatori → RFT (1951), Austria (16 Apr 1956) & Bandiera Europea (8 Dic 1955)',
        summary:
          'Fondato il 5 maggio 1949 a Londra da 10 democrazie europee; nel 1951 entra la RFT, nel 1953 entra in vigore la CEDU, l’8–9 dicembre 1955 adotta la bandiera europea a 12 stelle e il 16 aprile 1956 aderisce l’Austria neutrale (Saar associata fino al 31 dic 1956).',
      },
    ],
    milestones: [
      { step: 23, dateLabel: '5 Mag 1949', title: 'Firma del Trattato di Londra', detail: '10 Stati europei istituiscono il Consiglio d’Europa con sede a Strasburgo.' },
      { step: 24, dateLabel: 'Ago 1949', title: 'Allargamento a Grecia e Turchia', detail: 'Prima sessione dell’Assemblea Consultiva presieduta da Paul-Henri Spaak.' },
      { step: 26, dateLabel: '4 Nov 1950', title: 'Firma della CEDU a Roma', detail: 'Firmata a Palazzo Barberini la Convenzione Europea dei Diritti dell’Uomo; associati BRD e Saar.' },
      { step: 30, dateLabel: '3 Set 1953', title: 'Entrata in Vigore della CEDU', detail: 'Raggiunta la decima ratifica (Lussemburgo), la Convenzione Europea dei Diritti dell’Uomo entra ufficialmente in vigore.' },
      { step: 32, dateLabel: '8 Dic 1955', title: 'Adozione della Bandiera Europea a 12 Stelle', detail: 'Il Comitato dei Ministri approva a Parigi l’emblema azzurro con dodici stelle d’oro (disegno Arsène Heitz / Paul M.G. Lévy).' },
      { step: 33, dateLabel: '16 Apr 1956', title: 'Adesione della Repubblica d’Austria', detail: 'Dopo il Trattato di Stato e la neutralità del 1955, l’Austria entra a pieno titolo nel Consiglio d’Europa.' },
    ],
    members: [
      { code: 'UK', role: 'Fondatore', joinStep: 23 },
      { code: 'FRA', role: 'Fondatore', joinStep: 23 },
      { code: 'ITA', role: 'Fondatore', joinStep: 23 },
      { code: 'BEL', role: 'Fondatore', joinStep: 23 },
      { code: 'HOL', role: 'Fondatore', joinStep: 23 },
      { code: 'LUX', role: 'Fondatore', joinStep: 23 },
      { code: 'DEN', role: 'Fondatore', joinStep: 23 },
      { code: 'NOR', role: 'Fondatore', joinStep: 23 },
      { code: 'SWE', role: 'Fondatore', joinStep: 23 },
      { code: 'IRE', role: 'Fondatore', joinStep: 23 },
      { code: 'GRE', role: 'Membro', joinStep: 24 },
      { code: 'TUR', role: 'Membro', joinStep: 24 },
      { code: 'ICE', role: 'Membro', joinStep: 25 },
      { code: 'BRD', role: 'Associato', joinStep: 26 },
      { code: 'SAAR', role: 'Associato', joinStep: 26 },
      { code: 'AUS', label: 'Austria', role: 'Membro', joinStep: 33 },
    ],
  },

  // 5. OECE — PIANO MARSHALL
  {
    id: 'oece',
    acronym: 'OECE',
    name: 'OECE · Piano Marshall (ERP)',
    officialName: 'Organizzazione Europea per la Cooperazione Economica (OEEC)',
    category: 'europe',
    categoryLabel: 'Integrazione Europea',
    accentColor: '#10b981',
    headquarters: 'Parigi (Château de la Muette)',
    foundedDate: '16 Aprile 1948',
    treaty: 'Convenzione per la Cooperazione Economica Europea (Parigi, 16 Aprile 1948)',
    keyFigures: 'George C. Marshall · Paul G. Hoffman (ECA) · Robert Marjolin (Segretario Gen. OECE)',
    mission:
      'Coordinare la ripartizione dei 13 miliardi di dollari del Piano Marshall (ERP), liberalizzare gli scambi intraeuropei e istituire nel 1950 l’Unione Europea dei Pagamenti (EPU).',
    keyArticles: [
      'Distribuzione congiunta dei fondi ERP sulla base di piani produttivi concordati tra i paesi europei beneficiari.',
      'Unione Europea dei Pagamenti (EPU, settembre 1950): compensazione multilaterale delle valute europee verso la convertibilità.',
    ],
    organs: [
      { name: 'Consiglio dell’OECE', role: 'Organo intergovernativo all’unanimità con rappresentanti dei 16+ Paesi europei.' },
      { name: 'Comitato Esecutivo & Segretariato', role: 'Diretto da Robert Marjolin per il monitoraggio industriale e valutario.' },
      { name: 'Unione Europea dei Pagamenti (1950)', role: 'Camera di compensazione presso la BRI di Basilea per sbloccare il commercio intraeuropeo.' },
    ],
    phases: [
      {
        fromStep: 0,
        toStep: 19,
        status: 'inactive',
        statusLabel: 'Non Istituita',
        phaseTitle: 'Pre-Piano Marshall — Annuncio ad Harvard (5 Giu 1947)',
        summary:
          'Dopo il discorso del Segretario di Stato USA George Marshall (5 giu 1947) e il rifiuto imposto dall’URSS ai Paesi dell’Est, le nazioni occidentali avviano il Comitato per la Cooperazione Economica Europea.',
      },
      {
        fromStep: 20,
        toStep: 20,
        status: 'forming',
        statusLabel: 'Comitato Preparatorio',
        phaseTitle: 'CEEC di Parigi & Approvazione Finanziamenti Intermedi USA',
        summary:
          'I sedici paesi dell’Europa occidentale elaborano a Parigi il fabbisogno quadriennale per l’European Recovery Program in attesa della Convenzione formale.',
      },
      {
        fromStep: 21,
        toStep: 34,
        status: 'active',
        statusLabel: 'Attiva (EPU · EMA & Crisi Energetica Suez)',
        phaseTitle: 'Gestione Aiuti ERP, EPU, Accordo Monetario Europeo (1955) & Rifornimenti Petroliferi Emergenza Suez (Dic 1956)',
        summary:
          'Dal 16 aprile 1948 l’OECE coordina l’European Recovery Program (con Germania Ovest dal 1949), l’Unione Europea dei Pagamenti (EPU) e l’Accordo Monetario Europeo (5 agosto 1955). Nel novembre–dicembre 1956 il Comitato Petrolio OECE attiva il piano di emergenza per compensare la chiusura del Canale di Suez.',
      },
    ],
    milestones: [
      { step: 21, dateLabel: '16 Apr 1948', title: 'Convenzione OECE di Parigi', detail: '16 Stati europei più le Zone Occidentali Tedesche firmano lo statuto al Quai d’Orsay.' },
      { step: 24, dateLabel: 'Ott 1949', title: 'Ammissione Piena della BRD', detail: 'La neo-costituita Repubblica Federale Tedesca diventa membro a pieno titolo dell’OECE.' },
      { step: 26, dateLabel: '19 Set 1950', title: 'Accordo sull’Unione Europea dei Pagamenti', detail: 'Lancio della compensazione valutaria multilaterale tra i membri OECE.' },
      { step: 32, dateLabel: '5 Ago 1955', title: 'Firma dell’Accordo Monetario Europeo (EMA)', detail: 'Prepara il ritorno alla convertibilità valutaria dell’Europa occidentale.' },
    ],
    members: [
      { code: 'UK', role: 'Fondatore', joinStep: 21 },
      { code: 'FRA', role: 'Fondatore', joinStep: 21 },
      { code: 'ITA', role: 'Fondatore', joinStep: 21 },
      { code: 'BEL', role: 'Fondatore', joinStep: 21 },
      { code: 'HOL', role: 'Fondatore', joinStep: 21 },
      { code: 'LUX', role: 'Fondatore', joinStep: 21 },
      { code: 'SWI', role: 'Fondatore', joinStep: 21 },
      { code: 'AUS', label: 'Austria', role: 'Fondatore', joinStep: 21 },
      { code: 'DEN', role: 'Fondatore', joinStep: 21 },
      { code: 'NOR', role: 'Fondatore', joinStep: 21 },
      { code: 'SWE', role: 'Fondatore', joinStep: 21 },
      { code: 'ICE', role: 'Fondatore', joinStep: 21 },
      { code: 'IRE', role: 'Fondatore', joinStep: 21 },
      { code: 'POR', role: 'Fondatore', joinStep: 21 },
      { code: 'GRE', role: 'Fondatore', joinStep: 21 },
      { code: 'TUR', role: 'Fondatore', joinStep: 21 },
      { code: 'BRD', label: 'Germania Ovest', role: 'Membro', joinStep: 23 },
      { code: 'AMG', label: 'Trieste (Zona A TLT)', role: 'Membro', joinStep: 21 },
      { code: 'USA', role: 'Associato', joinStep: 21 },
      { code: 'CAN', role: 'Associato', joinStep: 23 },
    ],
  },

  // 6. PATTO DI BRUXELLES (UNIONE OCCIDENTALE)
  {
    id: 'bruxelles',
    acronym: 'UEO',
    name: 'Patto di Bruxelles (Unione Occidentale)',
    officialName: 'Trattato di Collaborazione Economica, Sociale e Legittima Difesa Collettiva',
    category: 'security',
    categoryLabel: 'Sicurezza & Difesa',
    accentColor: '#60a5fa',
    headquarters: 'Londra · Comando Militare di Fontainebleau',
    foundedDate: '17 Marzo 1948',
    treaty: 'Patto di Bruxelles (17 Marzo 1948)',
    keyFigures: 'Ernest Bevin (UK) · Georges Bidault (FRA) · Bernard Montgomery (Comandante C-in-C Uniforce)',
    mission:
      'Prima alleanza di mutua assistenza militare automatica dell’Europa occidentale postbellica (dopo il Colpo di Praga del feb 1948), nucleo preparatorio della NATO e della futura UEO.',
    keyArticles: [
      'Art. IV (Difesa Automatica): in caso di aggressione armata in Europa, i firmatari prestano "tutto l’aiuto e l’assistenza militare e di altra natura in loro potere".',
      'Art. I–III: Cooperazione economica, sociale e culturale tra Gran Bretagna, Francia e Benelux.',
    ],
    organs: [
      { name: 'Consiglio Consultivo dei Cinque', role: 'Composto dai Ministri degli Esteri di UK, FRA, BEL, HOL e LUX.' },
      { name: 'Comando di Fontainebleau (Uniforce)', role: 'Stato maggiore congiunto guidato dal Maresciallo Bernard Montgomery.' },
    ],
    phases: [
      {
        fromStep: 0,
        toStep: 20,
        status: 'inactive',
        statusLabel: 'Non Istituito',
        phaseTitle: 'Trattato di Dunkerque Anglo-Francese (4 Marzo 1947)',
        summary:
          'Prima del 1948 esiste solo l’alleanza bilaterale anglo-francese di Dunkerque, inizialmente concepita contro un eventuale riarmo tedesco.',
      },
      {
        fromStep: 21,
        toStep: 30,
        status: 'active',
        statusLabel: 'Attivo (I Cinque)',
        phaseTitle: 'Difesa Collettiva Europea Occidentale & Convergenza in SHAPE/NATO (1948–53)',
        summary:
          'Firmato il 17 marzo 1948 in risposta al Colpo di Praga. Il comando di Fontainebleau converge in SHAPE/NATO; il trattato CED firmato il 27 maggio 1952 resta ancora in sospeso nei parlamenti nazionali nel 1953 (nessuna UEO né ingresso della RFT fino al 1954–55).',
      },
      {
        fromStep: 31,
        toStep: 31,
        status: 'active',
        statusLabel: 'Attivo (Accordi Parigi Firmati · Pre-UEO)',
        phaseTitle: 'Caduta CED (30 Ago 1954) & Firma degli Accordi di Parigi per la Futura UEO (23 Ottobre 1954)',
        summary:
          'Dopo il voto francese contro la CED (30 agosto 1954), la Conferenza di Londra–Parigi porta il 23 ottobre 1954 alla firma dei Protocolli che modificano il Patto di Bruxelles per creare l’Unione Europea Occidentale (UEO) con BRD e Italia. Al 31 dicembre 1954 le ratifiche sono tuttavia ancora in corso (l’ingresso di BRD/ITA avverrà solo nel maggio 1955): restano attivi i Cinque firmatari originari.',
      },
      {
        fromStep: 32,
        toStep: 34,
        status: 'active',
        statusLabel: 'Attiva · UEO a Sette (BRD & ITA)',
        phaseTitle: 'Unione Europea Occidentale — UEO a Sette Membri (6 Mag 1955) & Trattato del Lussemburgo sulla Saar (27 Ott 1956)',
        summary:
          'Con gli Accordi di Parigi in vigore (5–6 maggio 1955), il Patto di Bruxelles opera come Unione Europea Occidentale (UEO) con BRD e Italia accanto a UK, Francia e Benelux. Con gli Accordi del Lussemburgo del 27 ottobre 1956 la Saar torna alla Germania Ovest dal 1° gennaio 1957 (fino al 31 dicembre 1956 resta ancora protettorato autonomo).',
      },
    ],
    milestones: [
      { step: 21, dateLabel: '17 Mar 1948', title: 'Firma del Patto di Bruxelles', detail: 'Regno Unito, Francia, Belgio, Paesi Bassi e Lussemburgo firmano la difesa comune cinquantennale.' },
      { step: 22, dateLabel: 'Set 1948', title: 'Quartier Generale di Fontainebleau', detail: 'Istituito il Comando dell’Unione Occidentale sotto Bernard Montgomery e Jean de Lattre de Tassigny.' },
      { step: 31, dateLabel: '23 Ott 1954', title: 'Firma degli Accordi di Parigi', detail: 'Accordo per modificare il Patto di Bruxelles nella futura UEO con BRD e Italia (entrata in vigore rimandata a maggio 1955).' },
      { step: 32, dateLabel: '6 Mag 1955', title: 'Nascita Operativa della UEO (7 Membri)', detail: 'Entrano ufficialmente Repubblica Federale Tedesca e Italia accanto ai Cinque di Bruxelles.' },
    ],
    members: [
      { code: 'UK', role: 'Fondatore', joinStep: 21 },
      { code: 'FRA', role: 'Fondatore', joinStep: 21 },
      { code: 'BEL', role: 'Fondatore', joinStep: 21 },
      { code: 'HOL', role: 'Fondatore', joinStep: 21 },
      { code: 'LUX', role: 'Fondatore', joinStep: 21 },
      { code: 'BRD', role: 'Membro', joinStep: 32 },
      { code: 'ITA', role: 'Membro', joinStep: 32 },
    ],
  },

  // 7. NATO (PATTO ATLANTICO)
  {
    id: 'nato',
    acronym: 'NATO',
    name: 'Patto Atlantico (NATO)',
    officialName: 'North Atlantic Treaty Organization (OTAN)',
    category: 'security',
    categoryLabel: 'Sicurezza & Difesa',
    accentColor: '#2563eb',
    headquarters: 'Londra (Consiglio 1949–52) → Parigi (Palais de Chaillot & SHAPE Rocquencourt, 1951–52)',
    foundedDate: '4 Aprile 1949 (In vigore: 24 Agosto 1949)',
    treaty: 'Trattato Nord Atlantico (Washington, D.C., 4 Aprile 1949)',
    keyFigures: 'Dean Acheson · Ernest Bevin · Robert Schuman · Carlo Sforza · Gen. Dwight D. Eisenhower & Gen. Matthew Ridgway (SACEUR) · Lord Ismay (1° Segretario Gen. Mar 1952)',
    mission:
      'Alleanza difensiva euro-atlantica per la deterrenza e la difesa collettiva dell’Europa occidentale, del Nord Atlantico e del Mediterraneo orientale durante la Guerra Fredda.',
    keyArticles: [
      'Art. 5: Un attacco armato contro una o più parti in Europa o Nord America sarà considerato un attacco diretto contro tutte le parti.',
      'Art. 6 (emendato dal Protocollo Grecia-Turchia 1951–52): Estende la copertura geografica alle forze alleate in Europa, al Mediterraneo, alla Turchia asiatica e ai Dipartimenti francesi d’Algeria.',
    ],
    organs: [
      { name: 'Consiglio Nord Atlantico (NAC) & Segretariato Generale', role: 'Massimo organo politico permanente trasferito a Parigi dopo la Conferenza di Lisbona (feb 1952) sotto il 1° Segretario Generale Lord Ismay.' },
      { name: 'Comitato Militare & Gruppo Permanente', role: 'Pianificazione strategica (USA, UK, FRA) attivata dal 1949.' },
      { name: 'SHAPE (Rocquencourt, Parigi)', role: 'Comando Supremo Alleato in Europa: guidato da Dwight D. Eisenhower (dic 1950 – mag 1952) e poi da Matthew Ridgway (dal mag 1952).' },
    ],
    phases: [
      {
        fromStep: 0,
        toStep: 22,
        status: 'inactive',
        statusLabel: 'Non Istituita',
        phaseTitle: 'Risoluzione Vandenberg & Blocco di Berlino (1948)',
        summary:
          'Durante il Blocco di Berlino (1948) il Senato USA approva la Risoluzione Vandenberg che apre la strada ad alleanze difensive euro-americane in tempo di pace.',
      },
      {
        fromStep: 23,
        toStep: 24,
        status: 'active',
        statusLabel: 'Attiva (12 Fondatori)',
        phaseTitle: 'Trattato di Washington (4 Apr 1949) & Ratifiche d’Estate',
        summary:
          'Dodici Stati dell’Europa occidentale e del Nord America (inclusi Italia e Portogallo) firmano il Patto Atlantico a Washington; entra in vigore il 24 agosto 1949.',
      },
      {
        fromStep: 25,
        toStep: 26,
        status: 'active',
        statusLabel: 'Attiva · Riarmo COREA',
        phaseTitle: 'Svolta Strategica della Guerra di Corea & Nomina di Eisenhower',
        summary:
          'Dopo il 25 giugno 1950 la NATO si trasforma da garanzia politica in alleanza militare integrata: a dicembre 1950 il NAC vara il riarmo atlantico e nomina Dwight D. Eisenhower Comandante Supremo (SHAPE).',
      },
      {
        fromStep: 27,
        toStep: 28,
        status: 'active',
        statusLabel: 'Attiva · SHAPE Operativo',
        phaseTitle: 'Attivazione Operativa di SHAPE (2 Aprile 1951) & Protocollo d’Adesione per Grecia e Turchia (Ott 1951)',
        summary:
          'Il 2 aprile 1951 diventa ufficialmente operativo a Rocquencourt presso Parigi il Comando Supremo delle Forze Alleate in Europa (SHAPE) guidato dal Gen. Dwight D. Eisenhower. Il 17–22 ottobre 1951 viene firmato a Londra il protocollo per il futuro ingresso di Grecia e Turchia (che diverrà effettivo solo nel febbraio 1952).',
      },
      {
        fromStep: 29,
        toStep: 29,
        status: 'active',
        statusLabel: 'Attiva · 14 Membri (Grecia & Turchia)',
        phaseTitle: 'Primo Allargamento NATO a Regno di Grecia e Repubblica di Turchia (18 Febbraio 1952) & Conferenza di Lisbona',
        summary:
          'Il 18 febbraio 1952 il Regno di Grecia e la Repubblica di Turchia aderiscono ufficialmente al Patto Atlantico (primo allargamento dell’Alleanza a 14 membri, presidiando il fianco sud-orientale, l’Egeo e gli Stretti). Alla Conferenza di Lisbona (20–25 feb 1952) il NAC istituisce il Segretariato Generale permanente a Parigi (Lord Ismay, mar 1952); a maggio 1952 il Gen. Matthew Ridgway succede a Eisenhower come SACEUR.',
      },
      {
        fromStep: 30,
        toStep: 30,
        status: 'active',
        statusLabel: 'Attiva · 14 Membri (Gruenther SACEUR)',
        phaseTitle: '14 Membri Attivi, Comando SHAPE al Gen. Alfred Gruenther (Lug 1953) & RFT Ancora Fuori',
        summary:
          'Al 31 dicembre 1953 la NATO resta salda a 14 membri (i 12 fondatori più Grecia e Turchia; la Repubblica Federale Tedesca NON fa ancora parte dell’Alleanza fino al maggio 1955). L’11 luglio 1953 il Gen. Alfred Gruenther succede a Ridgway quale SACEUR presso SHAPE a Rocquencourt; gli USA firmano accordi bilaterali per basi militari in Spagna (Patti di Madrid, 26 set 1953 — Spagna extra-NATO) e in Grecia (ott 1953).',
      },
      {
        fromStep: 31,
        toStep: 31,
        status: 'active',
        statusLabel: 'Attiva · 14 Membri (RFT Non Ancora Ammessa)',
        phaseTitle: 'Accordi di Parigi Firmati (23 Ott 1954) · Ratifiche Pendenti & Alleanza Ancora a 14 Membri',
        summary:
          'Dopo il rigetto francese della CED (30 agosto 1954), il 23 ottobre 1954 vengono firmati gli Accordi di Londra–Parigi che aprono la via al futuro ingresso della Repubblica Federale Tedesca nella NATO. Al 31 dicembre 1954 la ratifica non è tuttavia conclusa: la NATO resta rigorosamente a 14 membri (i 12 fondatori + Grecia e Turchia) e la BRD NON entra nell’Alleanza prima del 6–9 maggio 1955 (mentre la Grecia ospita il fianco balcanico e prosegue la questione di Trieste risolta a Londra tra Italia e Jugoslavia).',
      },
      {
        fromStep: 32,
        toStep: 32,
        status: 'active',
        statusLabel: 'Attiva · 15 Membri (RFT / BRD Ammessa)',
        phaseTitle: 'Secondo Allargamento: Piena Sovranità Tedesca (5 Mag) & Ingresso della RFT nella NATO (9 Maggio 1955)',
        summary:
          'Con l’entrata in vigore degli Accordi di Parigi (5 maggio 1955) cessa lo Statuto d’Occupazione alleato nella Germania Ovest e il 9 maggio 1955 la Repubblica Federale Tedesca (`BRD`) aderisce ufficialmente al Patto Atlantico quale 15° membro (provocando cinque giorni dopo la risposta sovietica con il Patto di Varsavia). Cessa intanto l’occupazione alleata dell’Austria (Staatsvertrag, neutralità 26 ottobre).',
      },
      {
        fromStep: 33,
        toStep: 33,
        status: 'active',
        statusLabel: 'Attiva · 15 Membri (Tensioni Suez · Norstad SACEUR)',
        phaseTitle: 'Crisi Atlantica su Suez (Ott–Dic 1956), SACEUR Lauris Norstad & Rapporto dei Tre Saggi (Dic 1956)',
        summary:
          'Al 31 dicembre 1956 la NATO resta a 15 membri con il Gen. USA Lauris Norstad nuovo SACEUR (dal 20 novembre 1956). Nel novembre 1956 l’intervento anglo-francese a Suez provoca la più grave frattura politico-diplomatica tra Stati Uniti e Regno Unito/Francia dalla fondazione dell’Alleanza, cui risponde a dicembre il Rapporto dei "Tre Saggi" (Martino, Lange, Pearson) per rafforzare la consultazione politica.',
      },
      {
        fromStep: 34,
        toStep: 34,
        status: 'active',
        statusLabel: 'Attiva · 15 Membri (Saar in BRD · Vertice Parigi Dic 1957)',
        phaseTitle: 'Reintegrazione del Saarland nella RFT (1° Gen 1957) & Vertice dei Capi di Governo NATO a Parigi (16–19 Dic 1957)',
        summary:
          'Nel 1957 il Saarland entra politicamente nella Repubblica Federale Tedesca (coperto dal Patto Atlantico come decimo Land della RFT) mentre la distensione anglo-americana sotto Harold Macmillan e il Vertice NATO di Parigi del 16–19 dicembre rispondono allo shock strategico dello Sputnik sovietico.',
      },
    ],
    milestones: [
      { step: 23, dateLabel: '4 Apr 1949', title: 'Firma del Trattato Nord Atlantico', detail: '12 Paesi firmano a Washington (USA, CAN, UK, FRA, ITA, BEL, HOL, LUX, NOR, DEN, ICE, POR).' },
      { step: 26, dateLabel: '19 Dic 1950', title: 'Eisenhower nominato SACEUR', detail: 'In risposta all’escalation in Corea, nasce il comando integrato SHAPE in Europa.' },
      { step: 27, dateLabel: '2 Apr 1951', title: 'Attivazione Operativa di SHAPE', detail: 'Diventa operativo in Francia il Comando Supremo delle Forze Alleate in Europa della NATO (Gen. Eisenhower).' },
      { step: 29, dateLabel: '18 Feb 1952', title: 'Primo Allargamento: Grecia e Turchia nella NATO', detail: 'Il Regno di Grecia e la Repubblica di Turchia entrano ufficialmente nel Patto Atlantico portando gli Alleati a 14 membri.' },
      { step: 30, dateLabel: '11 Lug 1953', title: 'Alfred Gruenther SACEUR · Alleanza a 14 Membri', detail: 'Gruenther succede a Ridgway al comando SHAPE; la RFT resta esclusa fino al 1955.' },
      { step: 31, dateLabel: '23 Ott 1954', title: 'Accordi di Parigi Firmati (Ratifiche 1955)', detail: 'Firmato il protocollo d’accesso della BRD alla NATO, ma l’ingresso effettivo avverrà solo nel maggio 1955 (14 membri al 31 dic 1954).' },
      { step: 32, dateLabel: '5–9 Mag 1955', title: 'Ingresso della Germania Ovest (15° Membro NATO)', detail: 'Con gli Accordi di Parigi in vigore (5 mag), il 9 maggio 1955 la RFT diviene il 15° Paese membro del Patto Atlantico.' },
      { step: 33, dateLabel: 'Nov–Dic 1956', title: 'Frattura su Suez & Rapporto dei Tre Saggi', detail: 'Lauris Norstad SACEUR (20 nov); il Consiglio Atlantico adotta il Rapporto Martino–Lange–Pearson sulla cooperazione non militare.' },
    ],
    members: [
      { code: 'USA', role: 'Fondatore', joinStep: 23 },
      { code: 'CAN', role: 'Fondatore', joinStep: 23 },
      { code: 'UK', role: 'Fondatore', joinStep: 23 },
      { code: 'FRA', role: 'Fondatore', joinStep: 23 },
      { code: 'ITA', role: 'Fondatore', joinStep: 23 },
      { code: 'BEL', role: 'Fondatore', joinStep: 23 },
      { code: 'HOL', role: 'Fondatore', joinStep: 23 },
      { code: 'LUX', role: 'Fondatore', joinStep: 23 },
      { code: 'NOR', role: 'Fondatore', joinStep: 23 },
      { code: 'DEN', role: 'Fondatore', joinStep: 23 },
      { code: 'ICE', role: 'Fondatore', joinStep: 23 },
      { code: 'POR', role: 'Fondatore', joinStep: 23 },
      { code: 'GRE', role: 'Membro', joinStep: 29 },
      { code: 'TUR', role: 'Membro', joinStep: 29 },
      { code: 'BRD', label: 'Germania Ovest (RFT)', role: 'Membro', joinStep: 32 },
    ],
  },

  // 8. COMECON (CMEA)
  {
    id: 'comecon',
    acronym: 'COMECON',
    name: 'Consiglio di Mutua Assistenza Economica (Comecon)',
    officialName: 'Sovet Ekonomičeskoj Vzaimopomošči (SEV / CMEA)',
    category: 'security',
    categoryLabel: 'Blocco Sovietico',
    accentColor: '#dc2626',
    headquarters: 'Mosca',
    foundedDate: '5–8 Gennaio 1949 (Annuncio ufficiale: 25 Gen 1949)',
    treaty: 'Comunicato della Conferenza Economica di Mosca (Gennaio 1949)',
    keyFigures: 'Vjačeslav Molotov · Anastas Mikojan · Bolesław Bierut · Klement Gottwald · Walter Ulbricht',
    mission:
      'Coordinare la pianificazione economica, gli scambi commerciali e il mutuo sostegno tecnico-industriale tra l’Unione Sovietica e le democrazie popolari in risposta al Piano Marshall (OECE).',
    keyArticles: [
      'Integrazione dei piani quinquennali nazionali su base bilaterale con l’URSS e compensazione commerciale nel blocco socialista.',
      'Esclusione della Jugoslavia titoista dopo lo strappo col Cominform del giugno 1948.',
    ],
    organs: [
      { name: 'Sessione del Consiglio', role: 'Massimo organo dei rappresentanti governativi dei Paesi membri.' },
      { name: 'Ufficio di Mosca (1949–50)', role: 'Organo permanente di coordinamento tecnico-commerciale con sede a Mosca.' },
    ],
    phases: [
      {
        fromStep: 0,
        toStep: 22,
        status: 'inactive',
        statusLabel: 'Non Istituito',
        phaseTitle: 'Pre-Comecon — Rifiuto del Piano Marshall & Cominform (1947)',
        summary:
          'Nel luglio 1947 Mosca vieta a Polonia e Cecoslovacchia di partecipare al Piano Marshall, sostituendo gli aiuti occidentali con il Piano Molotov bilaterale e il Cominform (settembre 1947).',
      },
      {
        fromStep: 23,
        toStep: 29,
        status: 'active',
        statusLabel: 'Attivo (Blocco Orientale)',
        phaseTitle: 'Nascita del Comecon (Gen 1949), Adesione Albania e RDT & Costituzioni Socialiste 1952',
        summary:
          'Istituito nel gennaio 1949 da URSS, Polonia, Cecoslovacchia, Ungheria, Romania e Bulgaria. Nel febbraio 1949 entra l’Albania e nel settembre 1950 aderisce la Repubblica Democratica Tedesca (DDR); nel 1952 Polonia (PRL, 22 lug) e Romania (RPR, 24 set) adottano le nuove Costituzioni socialiste.',
      },
      {
        fromStep: 30,
        toStep: 30,
        status: 'active',
        statusLabel: 'Attivo · Post-Stalin & Nuovo Corso',
        phaseTitle: 'Morte di Stalin (5 Mar 1953), Insurrezione nella RDT (17 Giu 1953) & Rinuncia alle Riparazioni',
        summary:
          'Dopo la morte di Stalin (5 mar 1953) il "Nuovo Corso" di Malenkov e Imre Nagy in Ungheria (lug 1953) ricalibra gli investimenti verso i beni di consumo. A seguito dell’insurrezione operaia del 17 giugno 1953 a Berlino Est e nella RDT, il 22 agosto 1953 l’URSS rinuncia alle residue riparazioni belliche dalla Germania Est (dal 1° gen 1954). Non esiste ancora il Patto di Varsavia (1955).',
      },
      {
        fromStep: 31,
        toStep: 31,
        status: 'active',
        statusLabel: 'Attivo · Piani Quinquennali 1954 (Pre-Varsavia)',
        phaseTitle: 'Coordinamento Economico Orientale, Dichiarazione Sovranità RDT (25 Mar 1954) & Pre-Patto di Varsavia',
        summary:
          'Nel corso del 1954 il Comecon coordina gli 8 Stati socialisti europei: dal 1° gennaio 1954 cessano le riparazioni di guerra della RDT verso Mosca e il 25 marzo l’URSS dichiara la sovranità della RDT, mentre a novembre–dicembre la Conferenza di Mosca reagisce agli Accordi di Parigi minacciando un’alleanza militare che verrà tuttavia istituita solo il 14 maggio 1955 (nessun Patto di Varsavia al 31 dicembre 1954).',
      },
      {
        fromStep: 32,
        toStep: 34,
        status: 'active',
        statusLabel: 'Attivo · Blocco Orientale Post-XX Congresso',
        phaseTitle: 'Coordinamento Piani Quinquennali (1955–56), Commissioni Permanenti & Crisi Autunnale in Polonia/Ungheria',
        summary:
          'Istituite nel maggio 1956 le prime Commissioni Permanenti settoriali, il Comecon coordina l’integrazione economica degli otto Stati socialisti europei nel corso del 1956, sostenendo con crediti e forniture la stabilizzazione dei governi Gomułka in Polonia e Kádár in Ungheria dopo la crisi d’ottobre–novembre.',
      },
    ],
    milestones: [
      { step: 23, dateLabel: '8 Gen 1949', title: 'Fondazione del Comecon a Mosca', detail: 'Sei Stati del blocco sovietico formalizzano l’organizzazione economica alternativa all’OECE.' },
      { step: 26, dateLabel: '29 Set 1950', title: 'Ingresso della Germania Est (RDT)', detail: 'La Repubblica Democratica Tedesca viene ammessa come ottavo membro del Comecon.' },
      { step: 30, dateLabel: '17 Giu & 22 Ago 1953', title: 'Crisi RDT & Fine Riparazioni Sovietiche', detail: 'Dopo la rivolta operaia nella RDT, Mosca avvia il Nuovo Corso e cancella le riparazioni tedesche dal 1954.' },
      { step: 31, dateLabel: '25 Mar & Dic 1954', title: 'Fine Riparazioni RDT & Avvertimento Pre-Varsavia', detail: 'Sovranità dichiarata per la RDT e conferenza di Mosca del dic 1954 in attesa del Patto di Varsavia del maggio 1955.' },
      { step: 32, dateLabel: '14 Mag & 20 Set 1955', title: 'Piena Sovranità RDT & Blocco Orientale Integrato', detail: 'Tutti gli 8 membri Comecon aderiscono al Patto di Varsavia; Trattato di Sovranità URSS–DDR (20 set).' },
    ],
    members: [
      { code: 'SOV', role: 'Fondatore', joinStep: 23 },
      { code: 'POL', role: 'Fondatore', joinStep: 23 },
      { code: 'CZE', role: 'Fondatore', joinStep: 23 },
      { code: 'HUN', role: 'Fondatore', joinStep: 23 },
      { code: 'ROM', role: 'Fondatore', joinStep: 23 },
      { code: 'BUL', role: 'Fondatore', joinStep: 23 },
      { code: 'ALB', role: 'Membro', joinStep: 23 },
      { code: 'DDR', role: 'Membro', joinStep: 26 },
    ],
  },

  // 9. COMINTERN -> COMINFORM
  {
    id: 'cominform',
    acronym: 'COMINFORM',
    name: 'Comintern / Cominform (Internazionale Comunista)',
    officialName: 'Internazionale Comunista (1919–43) → Ufficio d’Informazione dei Partiti Comunisti (1947–56)',
    category: 'security',
    categoryLabel: 'Blocco Sovietico',
    accentColor: '#b91c1c',
    headquarters: 'Mosca (1936–43) → Belgrado (1947–48) → Bucarest (dal 1948)',
    foundedDate: '1919 (Comintern) · 27 Settembre 1947 (Cominform)',
    treaty: 'Statuto Comintern · Risoluzione di Szklarska Poręba (27 Settembre 1947)',
    keyFigures: 'Georgi Dimitrov · Andrej Ždanov · Palmiro Togliatti · Maurice Thorez · Josip Broz Tito (fino al giu 1948)',
    mission:
      'Coordinamento ideologico e politico dei partiti comunisti: dal Fronte Popolare antifascista (1935–43) alla dottrina dei "due campi" di Ždanov nella Guerra Fredda (1947–50).',
    keyArticles: [
      'Dottrina Ždanov (Set 1947): divisione del mondo in "campo imperialista" e "campo democratico antimperialista".',
      'Risoluzione di Bucarest (28 Giu 1948): condanna ed espulsione del Partito Comunista Jugoslavo di Tito (Rottura Tito-Stalin).',
    ],
    organs: [
      { name: 'Comitato Esecutivo Comintern (IKKI, fino al Mag 1943)', role: 'Sciolto da Stalin il 15 maggio 1943 per consolidare la Grande Alleanza con USA e UK.' },
      { name: 'Ufficio d’Informazione (Cominform, dal Set 1947)', role: 'Coordinamento tra URSS, 6 Paesi dell’Est, PCI italiano e PCF francese.' },
    ],
    phases: [
      {
        fromStep: 0,
        toStep: 11,
        status: 'active',
        statusLabel: 'Comintern Attivo',
        phaseTitle: 'Terza Internazionale — Dai Fronti Popolari alla Guerra Patriottica',
        summary:
          'Sotto la guida di Georgi Dimitrov a Mosca, il Comintern coordina i partiti comunisti mondiali, le Brigate Internazionali in Spagna e la svolta del 1941 dopo l’Operazione Barbarossa.',
      },
      {
        fromStep: 12,
        toStep: 19,
        status: 'dissolved',
        statusLabel: 'Comintern Sciolto (Mag 1943)',
        phaseTitle: 'Scioglimento della Terza Internazionale (1943–1947)',
        summary:
          'Il 15 maggio 1943 Stalin scioglie il Comintern per rassicurare gli Alleati occidentali; nel settembre 1947 l’ente rinasce in forma nuova come Cominform.',
      },
      {
        fromStep: 20,
        toStep: 20,
        status: 'active',
        statusLabel: 'Cominform (Sede Belgrado)',
        phaseTitle: 'Conferenza di Szklarska Poręba & Dottrina dei Due Campi',
        summary:
          'Fondato nel settembre 1947 in Polonia con sede iniziale a Belgrado; riunisce l’URSS, i partiti dell’Europa orientale (inclusa la Jugoslavia) oltre a PCI e PCF.',
      },
      {
        fromStep: 21,
        toStep: 29,
        status: 'crisis',
        statusLabel: 'Cominform · Rottura Tito',
        phaseTitle: 'Espulsione della Jugoslavia (28 Giu 1948) & Sede a Bucarest',
        summary:
          'Il 28 giugno 1948 il Cominform condanna ed espelle la Jugoslavia di Tito, spostando la sede a Bucarest e avviando le epurazioni contro il "titoismo" nell’Est europeo (fino al XIX Congresso PCUS dell’ottobre 1952 e al processo Slánský del novembre 1952).',
      },
      {
        fromStep: 30,
        toStep: 30,
        status: 'crisis',
        statusLabel: 'Cominform · Post-Stalin & Epurazione Berija',
        phaseTitle: 'Transizione Post-Stalin (Mar 1953), Caduta di Berija & Scisma con Tito Ancora Aperto',
        summary:
          'Con la scomparsa di Stalin (5 mar 1953) il blocco sovietico entra nella direzione collegiale Malenkov–Chruščëv–Molotov: cade l’affare dei medici al Cremlino, ma dopo la rivolta del 17 giugno nella RDT Lavrentij Berija viene arrestato (26 giu) e fucilato (dic 1953). La rottura tra Cominform e Jugoslavia permane sino al 1955.',
      },
      {
        fromStep: 31,
        toStep: 31,
        status: 'crisis',
        statusLabel: 'Cominform · Vigilia Distensione & Pre-Varsavia',
        phaseTitle: 'Diplomazia di Ginevra (1954), Attività PCI–PCF & Scisma con Tito Ancora Aperto',
        summary:
          'Nel 1954 il Cominform coordina le campagne dei partiti comunisti contro il riarmo tedesco e gli Accordi di Parigi, sostenendo la diplomazia sovietica e cinese a Ginevra. La riconciliazione con Belgrado e la nascita del Patto di Varsavia avverranno solo nel maggio 1955.',
      },
      {
        fromStep: 32,
        toStep: 32,
        status: 'crisis',
        statusLabel: 'Cominform · Dichiarazione di Belgrado (2 Giu 1955)',
        phaseTitle: 'Visita di Chruščëv–Bulganin a Tito (Dichiarazione di Belgrado 2 Giu 1955) — Cominform ancora Formalmente Esistente',
        summary:
          'Il 2 giugno 1955 Chruščëv e Bulganin firmano a Belgrado con Tito la riconciliazione statale e ideologica ("vie nazionali al socialismo"), svuotando politicamente il Cominform (la Jugoslavia non vi rientra e il Cominform verrà formalmente sciolto solo nell’aprile 1956).',
      },
      {
        fromStep: 33,
        toStep: 34,
        status: 'dissolved',
        statusLabel: 'Sciolto (17 Apr 1956)',
        phaseTitle: 'Scioglimento Ufficiale del Cominform (17 Aprile 1956 — Dopo il XX Congresso PCUS)',
        summary:
          'Sulla scia del XX Congresso del PCUS (25 febbraio 1956, rapporto segreto di Chruščëv contro i crimini di Stalin) e del riavvicinamento con la Jugoslavia di Tito, il 17 aprile 1956 i partiti membri annunciano ufficialmente lo scioglimento del Cominform (Ufficio d’Informazione dei Partiti Comunisti e Operai) e la chiusura del periodico di Bucarest.',
      },
    ],
    milestones: [
      { step: 12, dateLabel: '15 Mag 1943', title: 'Scioglimento del Comintern', detail: 'Mosca chiude la Terza Internazionale per facilitare l’alleanza con Roosevelt e Churchill.' },
      { step: 20, dateLabel: '27 Set 1947', title: 'Fondazione del Cominform', detail: 'Istituito in Slesia su iniziativa di Ždanov con sede a Belgrado.' },
      { step: 21, dateLabel: '28 Giu 1948', title: 'Rottura Tito-Stalin', detail: 'La Jugoslavia viene espulsa dal Cominform; la sede si trasferisce a Bucarest.' },
      { step: 33, dateLabel: '17 Apr 1956', title: 'Scioglimento del Cominform', detail: 'Dopo il XX Congresso del PCUS (febbraio 1956), l’organizzazione viene sciolta definitivamente.' },
    ],
    members: [
      { code: 'SOV', role: 'Fondatore', joinStep: 0 },
      { code: 'MON', role: 'Membro', joinStep: 0, leaveStep: 12 },
      { code: 'TUV', role: 'Membro', joinStep: 0, leaveStep: 12 },
      { code: 'CCP_CHI', label: 'PCC / RPC', role: 'Membro', joinStep: 0, leaveStep: 12 },
      { code: 'POL', role: 'Fondatore', joinStep: 20 },
      { code: 'CZE', role: 'Fondatore', joinStep: 20 },
      { code: 'HUN', role: 'Fondatore', joinStep: 20 },
      { code: 'ROM', role: 'Fondatore', joinStep: 20 },
      { code: 'BUL', role: 'Fondatore', joinStep: 20 },
      { code: 'DFJ', label: 'Jugoslavia (Tito)', role: 'Fondatore', joinStep: 20, leaveStep: 21, exitType: 'Espulso', exitReason: 'Espulsa il 28 giugno 1948 (Rottura Tito-Stalin)' },
      { code: 'FRA', label: 'PCF (Francia)', role: 'Osservatore', joinStep: 20 },
      { code: 'ITA', label: 'PCI (Italia)', role: 'Osservatore', joinStep: 20 },
    ],
  },

  // 10. BRETTON WOODS (FMI / BANCA MONDIALE) & GATT
  {
    id: 'bretton_woods',
    acronym: 'FMI · GATT',
    name: 'Sistema di Bretton Woods (FMI / BIRS) & GATT',
    officialName: 'Fondo Monetario Internazionale · Banca Mondiale · Accordo Generale sulle Tariffe e sul Commercio',
    category: 'regional',
    categoryLabel: 'Economia Globale',
    accentColor: '#14b8a6',
    headquarters: 'Washington, D.C. (FMI/BIRS) · Ginevra (GATT)',
    foundedDate: '22 Lug 1944 (Accordi) · 27 Dic 1945 (FMI) · 30 Ott 1947 (GATT)',
    treaty: 'Accordi di Bretton Woods (Lug 1944) · GATT di Ginevra (30 Ott 1947)',
    keyFigures: 'John Maynard Keynes · Harry Dexter White · Camille Gutt (1° Direttore FMI) · Ivar Rooth (FMI dal 1951)',
    mission:
      'Regime monetario e commerciale multilaterale postbellico basato sulla parità fissa dollaro-oro (35 $/oncia), credito per gli squilibri di bilancia dei pagamenti (FMI), prestiti per la ricostruzione (BIRS) e riduzione dei dazi (GATT).',
    keyArticles: [
      'Gold-Exchange Standard: convertibilità del dollaro USA in oro a 35 $ l’oncia e cambi fissi ma aggiustabili.',
      'Clausola della Nazione Più Favorita (Art. I GATT, 1947): riduzione multilaterale delle barriere tariffarie tra 23 Paesi fondatori.',
    ],
    organs: [
      { name: 'Fondo Monetario Internazionale (FMI)', role: 'Stabilità valutaria e prestiti a breve termine per i conti con l’estero.' },
      { name: 'Banca Internazionale per la Ricostruzione e lo Sviluppo (BIRS)', role: 'Finanziamenti a lungo termine per infrastrutture e ricostruzione.' },
      { name: 'GATT (dal 1° Gen 1948)', role: 'Cicli negoziali tariffari multilaterali di Ginevra (1947), Annecy (1949) e Torquay (1950–51).' },
    ],
    phases: [
      {
        fromStep: 0,
        toStep: 13,
        status: 'inactive',
        statusLabel: 'Non Istituito',
        phaseTitle: 'Frammentazione Monetaria degli Anni ’30 & Autarchie Belliche',
        summary:
          'Dopo il crollo del Gold Standard negli anni ’30 e la fallita Conferenza di Londra, l’economia mondiale è divisa in blocchi valutari chiusi (sterlina, marco, yen).',
      },
      {
        fromStep: 14,
        toStep: 18,
        status: 'forming',
        statusLabel: 'Accordi Firmati (Lug 1944)',
        phaseTitle: 'Conferenza di Bretton Woods (44 Nazioni) & Ratifiche',
        summary:
          'Nel luglio 1944 nel New Hampshire i delegati di 44 Stati alleati approvano l’architettura FMI e BIRS disegnata da White e Keynes. L’URSS firma i verbali ma non ratifica nel dicembre 1945.',
      },
      {
        fromStep: 19,
        toStep: 34,
        status: 'active',
        statusLabel: 'Attivo (FMI · BIRS · GATT)',
        phaseTitle: 'Operatività FMI/BIRS, GATT, Ruolo FMI nella Crisi di Suez (Dic 1956) & Sostegno alla Sterlina',
        summary:
          'FMI, Banca Mondiale e GATT coordinano i cambi fissi e il commercio internazionale. Nel dicembre 1956, durante la crisi finanziaria britannica provocata dalla Crisi di Suez, il FMI concede al Regno Unito un maxi-pacchetto di sostegno valutario per difendere la parità della sterlina.',
      },
    ],
    milestones: [
      { step: 14, dateLabel: '22 Lug 1944', title: 'Conferenza di Bretton Woods', detail: '44 nazioni firmano gli articoli istitutivi del FMI e della Banca Mondiale.' },
      { step: 19, dateLabel: '30 Ott 1947', title: 'Firma del GATT a Ginevra', detail: '23 Paesi firmano l’Accordo Generale sulle Tariffe (in vigore dal 1° gen 1948).' },
      { step: 25, dateLabel: 'Mar–Lug 1950', title: 'Ritiro Polonia dal FMI · Ingresso Pakistan', detail: 'Consolidamento della separazione economica tra blocchi nella Guerra Fredda.' },
      { step: 29, dateLabel: '13–14 Ago 1952', title: 'Adesione di Giappone e Germania Ovest a FMI e BIRS', detail: 'Dopo il Trattato di San Francisco, Giappone e RFT entrano a pieno titolo nelle istituzioni di Bretton Woods.' },
      { step: 31, dateLabel: '31 Dic 1954', title: 'Uscita Cecoslovacchia da FMI e BIRS', detail: 'A decorrere dal 31 dicembre 1954 la Cecoslovacchia cessa di essere membro delle istituzioni di Bretton Woods.' },
    ],
    members: [
      { code: 'USA', role: 'Fondatore', joinStep: 14 },
      { code: 'UK', role: 'Fondatore', joinStep: 14 },
      { code: 'FRA', role: 'Fondatore', joinStep: 14 },
      { code: 'CAN', role: 'Fondatore', joinStep: 14 },
      { code: 'CHI', role: 'Fondatore', joinStep: 14 },
      { code: 'BEL', role: 'Fondatore', joinStep: 14 },
      { code: 'HOL', role: 'Fondatore', joinStep: 14 },
      { code: 'LUX', role: 'Fondatore', joinStep: 14 },
      { code: 'NOR', role: 'Fondatore', joinStep: 14 },
      { code: 'IND', role: 'Fondatore', joinStep: 19 },
      { code: 'RAJ', role: 'Fondatore', joinStep: 14, leaveStep: 19 },
      { code: 'AST', role: 'Membro', joinStep: 19 },
      { code: 'NZL', label: 'GATT', role: 'Membro', joinStep: 20 },
      { code: 'SAF', role: 'Fondatore', joinStep: 14 },
      { code: 'BRA', role: 'Fondatore', joinStep: 14 },
      { code: 'MEX', role: 'Fondatore', joinStep: 14 },
      { code: 'ITA', role: 'Membro', joinStep: 19 },
      { code: 'TUR', role: 'Membro', joinStep: 19 },
      { code: 'POL', role: 'Fondatore', joinStep: 14, leaveStep: 25, exitType: 'Uscito', exitReason: 'Ritiro dal FMI nel marzo 1950' },
      { code: 'CZE', role: 'Fondatore', joinStep: 14, leaveStep: 31, exitType: 'Espulso', exitReason: 'Cessazione partecipazione Cecoslovacchia da FMI e BIRS (31 dicembre 1954)' },
      { code: 'DFJ', role: 'Fondatore', joinStep: 14 },
      { code: 'PAK', role: 'Membro', joinStep: 25 },
      { code: 'CEY', role: 'Membro', joinStep: 26 },
      { code: 'BRD', role: 'Membro', joinStep: 29 },
      { code: 'JAP', role: 'Membro', joinStep: 29 },
    ],
  },

  // 11. LEGA ARABA
  {
    id: 'lega_araba',
    acronym: 'LEGA ARABA',
    name: 'Lega degli Stati Arabi',
    officialName: 'Gāmiʿat ad-Duwal al-ʿArabiyya / League of Arab States',
    category: 'regional',
    categoryLabel: 'Organizzazione Regionale',
    accentColor: '#22c55e',
    headquarters: 'Il Cairo',
    foundedDate: '22 Marzo 1945',
    treaty: 'Patto del Cairo (22 Marzo 1945) · Protocollo di Alessandria (7 Ottobre 1944)',
    keyFigures: 'Abdul Rahman Azzam Pasha (1° Segretario Gen. 1945–52) · Abdel Khalek Hassouna (dal Set 1952) · Re Farouk I / Gen. Naguib',
    mission:
      'Coordinamento politico, indipendenza degli Stati arabi, opposizione alla spartizione della Palestina e difesa comune inter-araba (Trattato di Difesa Comune del giu 1950).',
    keyArticles: [
      'Patto del Cairo (1945): riconoscimento della sovranità paritaria dei sette Stati fondatori e allegato speciale sulla Palestina.',
      'Patto di Sicurezza Collettiva Araba (17 Giugno 1950): coordinamento militare e clausola di mutua assistenza.',
    ],
    organs: [
      { name: 'Consiglio della Lega', role: 'Riunione dei Capi di Stato o Ministri degli Esteri al Cairo.' },
      { name: 'Segretariato Generale', role: 'Guidato da Azzam Pasha (1945–52) e dal settembre 1952 da Abdel Khalek Hassouna con sede al Cairo.' },
    ],
    phases: [
      {
        fromStep: 0,
        toStep: 16,
        status: 'inactive',
        statusLabel: 'Pre-Fondazione',
        phaseTitle: 'Protocollo di Alessandria (Ott 1944)',
        summary:
          'Prima del marzo 1945 non è ancora istituita la Lega Araba; nell’ottobre 1944 i governi arabi firmano il Protocollo preparatorio di Alessandria.',
      },
      {
        fromStep: 17,
        toStep: 21,
        status: 'active',
        statusLabel: 'Attiva (7 Fondatori)',
        phaseTitle: 'Patto del Cairo (Mar 1945) → Rifiuto Risoluzione 181 & Guerra 1948',
        summary:
          'Fondata il 22 marzo 1945 da Egitto, Iraq, Siria, Libano, Transgiordania, Arabia Saudita e Yemen. Nel maggio 1948 gli eserciti della Lega intervengono contro la nascita di Israele.',
      },
      {
        fromStep: 22,
        toStep: 29,
        status: 'active',
        statusLabel: 'Attiva · Rivoluzione Egiziana & Re Hussein',
        phaseTitle: 'Armistizi di Rodi (1949), Crisi di Suez (1951), Rivoluzione degli Ufficiali Liberi al Cairo (Lug 1952) & Re Hussein in Giordania (Ago 1952)',
        summary:
          'Dopo gli armistizi del 1949 la Lega sostiene il Governo di Tutto-Palestina a Gaza (`APG`). Nel luglio 1952 il Movimento degli Ufficiali Liberi (Naguib e Nasser) rovescia Re Farouk in Egitto (sale al trono il piccolo Re Fuad II sotto Consiglio di Reggenza, restando formalmente Regno d’Egitto fino al giu 1953); l’11 agosto 1952 Re Hussein succede a Re Talal in Giordania e a settembre Abdel Khalek Hassouna diventa 2° Segretario Generale della Lega.',
      },
      {
        fromStep: 30,
        toStep: 30,
        status: 'active',
        statusLabel: 'Attiva · Repubblica d’Egitto & Ingresso Libia',
        phaseTitle: 'Ammissione del Regno Unito di Libia (28 Mar 1953) & Proclamazione della Repubblica d’Egitto al Cairo (18 Giu 1953)',
        summary:
          'Il 28 marzo 1953 il Regno Unito di Libia (`LBY`) entra ufficialmente nella Lega Araba quale ottavo Stato membro. Il 18 giugno 1953 il Consiglio del Comando della Rivoluzione al Cairo depone Re Fuad II e proclama la Repubblica d’Egitto (Muhammad Naguib primo Presidente e Primo Ministro, Gamal Abdel Nasser Vice Primo Ministro). Sul confine giordano-israeliano cresce la tensione (incidente di Qibya, ott 1953).',
      },
      {
        fromStep: 31,
        toStep: 31,
        status: 'active',
        statusLabel: 'Attiva · Accordo Suez 1954 & Guerra d’Algeria',
        phaseTitle: 'Accordo Anglo-Egiziano sul Canale di Suez (19 Ott 1954), Leadership Nasser & Sostegno alla Causa Algerina',
        summary:
          'Il 19 ottobre 1954 il Primo Ministro egiziano Gamal Abdel Nasser sigla con Londra lo storico Accordo per lo sgombero della base militare del Canale di Suez entro 20 mesi, consolidando la guida al Cairo dopo la rimozione di Naguib (14 nov 1954). Da novembre 1954 il Cairo e la Lega sostengono politicamente il neonato FLN algerino.',
      },
      {
        fromStep: 32,
        toStep: 32,
        status: 'crisis',
        statusLabel: 'Frattura · Patto di Baghdad vs Asse Cairo–Damasco',
        phaseTitle: 'Rottura sul Patto di Baghdad (24 Feb 1955), Bandung, Armi Ceche al Cairo (Set) & Guerra d’Algeria (1955)',
        summary:
          'La Lega Araba è divisa tra l’Iraq hashemita (co-fondatore del filo-occidentale Patto di Baghdad il 24 feb 1955) e il blocco guidato dall’Egitto di Nasser (protagonista a Bandung in aprile e artefice dello storico accordo sugli armamenti con la Cecoslovacchia/URSS nel settembre 1955). Il Cairo sostiene intanto il Nord Costantinese algerino e l’indipendenza sudanese del 1° gen 1956.',
      },
      {
        fromStep: 33,
        toStep: 33,
        status: 'active',
        statusLabel: 'Attiva · 9 Membri (Sudan) & Crisi di Suez',
        phaseTitle: 'Ammissione del Sudan (19 Gen 1956), Nazionalizzazione & Crisi di Suez (Lug–Dic 1956)',
        summary:
          'Il 19 gennaio 1956 la neo-indipendente Repubblica del Sudan (`SUD`) entra come nono Stato membro della Lega Araba (Marocco e Tunisia vi aderiranno solo nel 1958). Dopo la nazionalizzazione del Canale di Suez (26 lug) e l’attacco israelo-anglo-francese (ott–nov), al vertice di Beirut di novembre gli Stati arabi esprimono solidarietà all’Egitto di Nasser, mentre la Striscia di Gaza (`APG`) e il Sinai restano occupati da Israele al 31 dic 1956.',
      },
      {
        fromStep: 34,
        toStep: 34,
        status: 'active',
        statusLabel: 'Attiva · 9 Membri (Sinai & Gaza Liberati · NO RAU fino Feb 1958)',
        phaseTitle: 'Ritiro Israeliano da Gaza e Sinai (Mar 1957) & Riapertura del Canale di Suez (Apr 1957)',
        summary:
          'Tra il 6 e l’8 marzo 1957 Israele completa lo sgombero della Striscia di Gaza (`APG`) e del Sinai (`EGY`) sotto vigilanza UNEF, e in aprile l’Egitto di Nasser riapre il Canale di Suez; la Lega Araba rimane a 9 membri al 31 dic 1957 (Marocco e Tunisia aderiranno nell’ottobre 1958; nessuna Repubblica Araba Unita fino al feb 1958).',
      },
    ],
    milestones: [
      { step: 17, dateLabel: '22 Mar 1945', title: 'Firma del Patto del Cairo', detail: 'Istituita formalmente la Lega Araba tra Egitto, Iraq, Siria, Libano, Transgiordania, Arabia Saudita e Yemen.' },
      { step: 21, dateLabel: '15 Mag 1948', title: 'Intervento in Palestina', detail: 'I paesi della Lega Araba avviano le operazioni militari alla scadenza del Mandato Britannico.' },
      { step: 25, dateLabel: 'Apr–Giu 1950', title: 'Crisi Cisgiordania & Patto di Difesa', detail: 'Tensione sull’annessione giordana della Cisgiordania e firma del Trattato di Difesa Comune.' },
      { step: 29, dateLabel: '23 Lug & 11 Ago 1952', title: 'Rivoluzione degli Ufficiali Liberi in Egitto & Re Hussein in Giordania', detail: 'Abdicazione di Re Farouk in favore di Fuad II sotto tutela militare al Cairo; ascesa di Re Hussein ad Amman.' },
      { step: 30, dateLabel: '28 Mar & 18 Giu 1953', title: 'Libia nella Lega Araba & Repubblica d’Egitto', detail: 'Ammissione del Regno Unito di Libia (LBY); proclamazione della Repubblica d’Egitto con Naguib Presidente e Nasser Vice PM.' },
      { step: 31, dateLabel: '19 Ott & 1° Nov 1954', title: 'Accordo di Suez & Toussaint Rouge', detail: 'Firmato l’accordo di evacuazione britannica da Suez; dal Cairo appoggio al neonato FLN algerino.' },
      { step: 32, dateLabel: '24 Feb & 27 Set 1955', title: 'Patto di Baghdad Iracheno & Accordo Armamenti Egitto', detail: 'Baghdad rompe l’isolamento filo-egiziano firmando con la Turchia; Nasser ottiene armamenti cecoslovacco-sovietici.' },
      { step: 33, dateLabel: '19 Gen & Nov 1956', title: 'Ingresso del Sudan & Vertice di Beirut su Suez', detail: 'La Repubblica del Sudan diviene il 9° membro della Lega; solidarietà panaraba con il Cairo durante la Guerra di Suez (Gaza ancora occupata da ISR).' },
    ],
    members: [
      { code: 'EGY', role: 'Fondatore', joinStep: 17 },
      { code: 'IRQ', role: 'Fondatore', joinStep: 17 },
      { code: 'SYR', label: 'Siria', role: 'Fondatore', joinStep: 17 },
      { code: 'LEB', label: 'Libano', role: 'Fondatore', joinStep: 17 },
      { code: 'JOR', label: 'Giordania', role: 'Fondatore', joinStep: 17 },
      { code: 'SAU', role: 'Fondatore', joinStep: 17 },
      { code: 'YEM', role: 'Fondatore', joinStep: 17 },
      { code: 'LBY', label: 'Libia', role: 'Membro', joinStep: 30 },
      { code: 'SUD', label: 'Sudan', role: 'Membro', joinStep: 33 },
      { code: 'APG', label: 'Tutto-Palestina', role: 'Osservatore', joinStep: 22 },
    ],
  },

  // 12. OSA / UNIONE PANAMERICANA
  {
    id: 'osa',
    acronym: 'OSA / OAS',
    name: 'OSA · Unione Panamericana',
    officialName: 'Organizzazione degli Stati Americani (OAS / OEA) — Carta di Bogotà 1948',
    category: 'regional',
    categoryLabel: 'Organizzazione Regionale',
    accentColor: '#f59e0b',
    headquarters: 'Washington, D.C.',
    foundedDate: '1890 (Unione Panamericana) · 30 Aprile 1948 (Carta OSA)',
    treaty: 'Atto di Chapultepec (1945) · Trattato di Rio / TIAR (1947) · Carta di Bogotà (30 Apr 1948)',
    keyFigures: 'Alberto Lleras Camargo (1° Segretario Gen. OSA) · George Marshall · Oswaldo Aranha',
    mission:
      'Cooperazione emisferica e sicurezza collettiva delle 21 Repubbliche Americane: dalla neutralità continentale (Dichiarazione di Panama 1939) alla Carta dell’OSA e al Patto di Rio del 1947–48.',
    keyArticles: [
      'Trattato Interamericano di Assistenza Reciproca (TIAR / Rio, 2 Set 1947): difesa collettiva emisferica.',
      'Carta di Bogotà (30 Apr 1948): trasforma l’Unione Panamericana nella moderna Organizzazione degli Stati Americani.',
    ],
    organs: [
      { name: 'Conferenza Interamericana', role: 'Organo supremo delle 21 repubbliche sovrane delle Americhe.' },
      { name: 'Consiglio dell’OSA / Segretariato Panamericano', role: 'Sede permanente a Washington, D.C.' },
    ],
    phases: [
      {
        fromStep: 0,
        toStep: 16,
        status: 'active',
        statusLabel: 'Unione Panamericana',
        phaseTitle: 'Solidarietà Emisferica — Lima (1938), Panama (1939) & Rio (1942)',
        summary:
          'Durante il periodo prebellico e la WWII l’Unione Panamericana coordina la Zona di Sicurezza atlantica (1939) e l’allineamento dei paesi americani dopo Pearl Harbor.',
      },
      {
        fromStep: 17,
        toStep: 20,
        status: 'active',
        statusLabel: 'Patto di Rio (TIAR 1947)',
        phaseTitle: 'Atto di Chapultepec & Trattato di Rio de Janeiro (Set 1947)',
        summary:
          'Con la fine della WWII le repubbliche americane sanciscono il sistema di difesa emisferica reciproca a Petrópolis/Rio (settembre 1947).',
      },
      {
        fromStep: 21,
        toStep: 29,
        status: 'active',
        statusLabel: 'Attiva · Carta OSA (1948–52)',
        phaseTitle: 'Carta di Bogotà (1948), Entrata in Vigore (Dic 1951), Colpo di Stato a Cuba & Rivoluzione Boliviana (1952)',
        summary:
          'Entrata formalmente in vigore il 13 dicembre 1951 tra le 21 repubbliche americane, nel 1952 l’area interamericana è segnata dal colpo di Stato militare di Fulgencio Batista a Cuba (10 mar 1952) e dalla Rivoluzione Nazionale del MNR di Víctor Paz Estenssoro in Bolivia (9–11 apr 1952, nazionalizzazione dello stagno COMIBOL il 31 ott 1952).',
      },
      {
        fromStep: 30,
        toStep: 30,
        status: 'active',
        statusLabel: 'Attiva · Golpe in Colombia & Crisi Emisferica',
        phaseTitle: 'Colpo di Stato in Colombia (13 Giu 1953), Assalto alla Caserma Moncada a Cuba & Riforma Agraria in Bolivia',
        summary:
          'Il 13 giugno 1953 il Generale Gustavo Rojas Pinilla assume il potere in Colombia con il golpe militare sostenuto dai conservatori moderati contro Laureano Gómez durante La Violencia. A Cuba il 26 luglio 1953 Fidel Castro guida l’assalto alla caserma Moncada contro il regime Batista; in Bolivia prosegue la riforma agraria del governo MNR.',
      },
      {
        fromStep: 31,
        toStep: 31,
        status: 'active',
        statusLabel: 'Attiva · Caracas 1954 & Golpe Guatemala',
        phaseTitle: 'Dichiarazione di Caracas (Mar 1954), Colpo di Stato in Guatemala (Giu 1954) & Suicidio di Vargas in Brasile (24 Ago 1954)',
        summary:
          'Alla X Conferenza Interamericana di Caracas (marzo 1954) gli USA fanno approvare la risoluzione anticomunista mirata contro il governo Árbenz in Guatemala, rovesciato poi dal golpe dell’Operazione PBSuccess (giu 1954, Col. Carlos Castillo Armas). In Brasile il 24 agosto 1954 il Presidente Getúlio Vargas si suicida al Catete lasciando la guida al Vicepresidente Café Filho.',
      },
      {
        fromStep: 32,
        toStep: 32,
        status: 'active',
        statusLabel: 'Attiva · Revolución Libertadora (Argentina)',
        phaseTitle: 'Colpo di Stato Militare in Argentina (Revolución Libertadora, Set 1955) & Esilio di Perón',
        summary:
          'Tra il 16 e il 23 settembre 1955 una sollevazione delle Forze Armate argentine ("Revolución Libertadora") rovescia ed esilia il Presidente Juan Domingo Perón; dopo la breve presidenza del gen. Eduardo Lonardi, in novembre il gen. Pedro Eugenio Aramburu instaura il regime militare sciogliendo il Partito Peronista. Prosegue il coordinamento emisferico OSA.',
      },
      {
        fromStep: 33,
        toStep: 34,
        status: 'active',
        statusLabel: 'Attiva · Vertice Panama & Guerriglia Sierra Maestra (Cuba)',
        phaseTitle: 'Dichiarazione di Panama (Lug 1956), Regime Batista & Sbarco del Granma a Cuba (2 Dic 1956)',
        summary:
          'Nel luglio 1956 i Presidenti americani si riuniscono a Città di Panama per il 130° anniversario del Congresso di Bolívar (Pres. Eisenhower USA). In America Latina permangono i regimi militari di Aramburu (Argentina), Rojas Pinilla (Colombia), Pérez Jiménez (Venezuela) e Batista (Cuba), ma il 2 dicembre 1956 lo sbarco del Granma sulla Sierra Maestra apre la rivoluzione cubana.',
      },
    ],
    milestones: [
      { step: 2, dateLabel: 'Dic 1938', title: 'Dichiarazione di Lima', detail: 'Conferenza panamericana contro penetrazioni extra-continentali nelle Americhe.' },
      { step: 19, dateLabel: '2 Set 1947', title: 'Trattato di Rio (TIAR)', detail: 'Primo patto regionale di sicurezza collettiva del dopoguerra ai sensi dell’Art. 51 ONU.' },
      { step: 21, dateLabel: '30 Apr 1948', title: 'Carta di Bogotà', detail: 'Nasce formalmente l’Organizzazione degli Stati Americani (OSA / OAS).' },
      { step: 31, dateLabel: 'Mar & Giu 1954', title: 'X Conferenza di Caracas & Golpe Guatemala', detail: 'Risoluzione anticomunista interamericana e successivo rovesciamento del governo Árbenz (PBSuccess).' },
      { step: 32, dateLabel: '16–23 Set 1955', title: 'Revolución Libertadora in Argentina', detail: 'Colpo di Stato militare contro Perón; governo de facto del gen. Aramburu da novembre.' },
      { step: 33, dateLabel: 'Lug & 2 Dic 1956', title: 'Vertice di Panama & Sbarco del Granma (Cuba)', detail: 'Conferenza presidenziale americana a Panama; a Cuba Fidel Castro sbarca con il Granma nella Sierra Maestra.' },
    ],
    members: [
      { code: 'USA', role: 'Fondatore', joinStep: 0 },
      { code: 'MEX', role: 'Fondatore', joinStep: 0 },
      { code: 'BRA', role: 'Fondatore', joinStep: 0 },
      { code: 'ARG', role: 'Fondatore', joinStep: 0 },
      { code: 'CHL', role: 'Fondatore', joinStep: 0 },
      { code: 'COL', role: 'Fondatore', joinStep: 0 },
      { code: 'PRU', role: 'Fondatore', joinStep: 0 },
      { code: 'VEN', role: 'Fondatore', joinStep: 0 },
      { code: 'ECU', role: 'Fondatore', joinStep: 0 },
      { code: 'BOL', role: 'Fondatore', joinStep: 0 },
      { code: 'PAR', role: 'Fondatore', joinStep: 0 },
      { code: 'URY', role: 'Fondatore', joinStep: 0 },
      { code: 'CUB', role: 'Fondatore', joinStep: 0 },
      { code: 'DOM', role: 'Fondatore', joinStep: 0 },
      { code: 'HAI', role: 'Fondatore', joinStep: 0 },
      { code: 'GTM', role: 'Fondatore', joinStep: 0 },
      { code: 'HND', role: 'Fondatore', joinStep: 0 },
      { code: 'SLV', role: 'Fondatore', joinStep: 0 },
      { code: 'NIC', role: 'Fondatore', joinStep: 0 },
      { code: 'CRI', role: 'Fondatore', joinStep: 0 },
      { code: 'PAN', role: 'Fondatore', joinStep: 0 },
    ],
  },

  // 13. COMMONWEALTH DELLE NAZIONI
  {
    id: 'commonwealth',
    acronym: 'COMMONWEALTH',
    name: 'Commonwealth delle Nazioni',
    officialName: 'British Commonwealth of Nations (1931–49) → Commonwealth of Nations (Dichiarazione di Londra 1949)',
    category: 'regional',
    categoryLabel: 'Comunità Interstatale',
    accentColor: '#e11d48',
    headquarters: 'Londra',
    foundedDate: '11 Dic 1931 (Statuto di Westminster) · 26 Apr 1949 (Dichiarazione di Londra)',
    treaty: 'Statuto di Westminster (1931) · Dichiarazione di Londra (26 Aprile 1949)',
    keyFigures: 'Re Giorgio VI (fino al 6 Feb 1952) · Regina Elisabetta II (Capo del Commonwealth dal 6 Feb 1952) · Winston Churchill · Jawaharlal Nehru',
    mission:
      'Associazione libera di Stati sovrani nati dall’Impero Britannico; dal 1949 permette l’appartenenza anche alle repubbliche riconoscendo il Sovrano quale "simbolo della libera associazione".',
    keyArticles: [
      'Dichiarazione di Londra (26 Apr 1949): sopprime il prefisso "British" e permette all’India di restare nel Commonwealth diventando Repubblica (26 gen 1950).',
      'Uscita della Repubblica d’Irlanda (18 Apr 1949) e di Terranova (unita al Canada il 31 mar 1949).',
    ],
    organs: [
      { name: 'Conferenza dei Primi Ministri del Commonwealth', role: 'Consultazione al vertice tra i governi membri (Londra 1949, Colombo 1950, Londra nov–dic 1952).' },
      { name: 'Piano di Colombo (Gen 1950)', role: 'Programma di cooperazione economica e sviluppo tecnico nel Sud e Sud-Est Asiatico.' },
    ],
    phases: [
      {
        fromStep: 0,
        toStep: 18,
        status: 'active',
        statusLabel: 'British Commonwealth',
        phaseTitle: 'Dominions di Westminster — Sforzo Bellico Unitario (1939–45)',
        summary:
          'I Dominions sovrani (Canada, Australia, Nuova Zelanda, Sudafrica, Irlanda — neutrale in WWII) condividono la Corona britannica sotto lo Statuto di Westminster.',
      },
      {
        fromStep: 19,
        toStep: 22,
        status: 'active',
        statusLabel: 'Allargamento Asiatico (1947–48)',
        phaseTitle: 'Indipendenza di India, Pakistan & Ceylon (1947–48)',
        summary:
          'Con l’Indian Independence Act (1947) e l’indipendenza di Ceylon (feb 1948) entrano i nuovi Dominions asiatici, mentre la Birmania sceglie l’uscita totale al momento dell’indipendenza (gen 1948).',
      },
      {
        fromStep: 23,
        toStep: 29,
        status: 'active',
        statusLabel: 'Commonwealth · Regina Elisabetta II',
        phaseTitle: 'Dichiarazione di Londra (1949), Repubblica dell’India (1950) & Ascesa della Regina Elisabetta II (6 Febbraio 1952)',
        summary:
          'Con la scomparsa di Re Giorgio VI il 6 febbraio 1952, sale al trono del Regno Unito e dei Reami del Commonwealth (Canada, Australia, Nuova Zelanda, Sudafrica, Pakistan e Ceylon) la Regina Elisabetta II, riconosciuta anche dalla Repubblica dell’India quale Capo del Commonwealth. Il 20 ottobre 1952 viene proclamato lo stato d’emergenza nella colonia del Kenya contro l’insurrezione Mau Mau.',
      },
      {
        fromStep: 30,
        toStep: 30,
        status: 'active',
        statusLabel: 'Commonwealth · Incoronazione & Federazione FRN',
        phaseTitle: 'Incoronazione di Elisabetta II (2 Giu 1953), Federazione di Rhodesia e Nyasaland (Set 1953) & Emergenza Kenya',
        summary:
          'Il 2 giugno 1953 si celebra a Londra l’Incoronazione della Regina Elisabetta II quale Capo del Commonwealth. Dal 7 settembre / 23 ottobre 1953 la Corona unifica Rhodesia Meridionale, Rhodesia Settentrionale e Nyasaland nella Federazione coloniale di Rhodesia e Nyasaland (`FRN`, capitale Salisbury, autonoma sotto la Corona ma non ancora Dominion indipendente); prosegue intanto lo stato d’emergenza Mau Mau in Kenya.',
      },
      {
        fromStep: 31,
        toStep: 31,
        status: 'active',
        statusLabel: 'Commonwealth · Tour Reale & Colombo 1954',
        phaseTitle: 'Tour Reale di Elisabetta II, Flags Act in Australia (14 Apr 1954), Conferenza di Colombo & SEATO (Set 1954)',
        summary:
          'Nel 1954 la Regina Elisabetta II conclude lo storico Royal Tour attraverso Nuova Zelanda, Australia, Ceylon, Aden e Gibilterra; il 14 aprile 1954 entra in vigore il Flags Act australiano che consacra la Blue Ensign come bandiera nazionale. Sul piano asiatico le Potenze di Colombo (IND, PAK, CEY, BUR, IDN) si riuniscono in aprile–maggio preparando Bandung, mentre Australia, Nuova Zelanda e Pakistan firmano a Manila la SEATO (8 settembre) insieme a Regno Unito e USA.',
      },
      {
        fromStep: 32,
        toStep: 32,
        status: 'active',
        statusLabel: 'Commonwealth · Patto Baghdad · Cipro & Bandung',
        phaseTitle: 'Governo Eden (Apr 1955), Patto di Baghdad (UK & PAK), Emergenza Cipro & Sudan alla Vigilia dell’Indipendenza',
        summary:
          'Sotto la Regina Elisabetta II e il nuovo Premier britannico Anthony Eden (dal 6 apr 1955), Regno Unito (5 apr) e Pakistan (23 set, "One Unit") entrano nel Patto di Baghdad, Ceylon entra all’ONU (14 dic), mentre India e Ceylon sono tra i promotori di Bandung. A Cipro scoppia l’insurrezione EOKA (1° apr; emergenza 26 nov), mentre nel Sudan Anglo-Egiziano infuria l’ammutinamento di Torit (18 ago) alla vigilia dell’indipendenza del 1° gen 1956.',
      },
      {
        fromStep: 33,
        toStep: 33,
        status: 'crisis',
        statusLabel: 'Commonwealth · Pakistan Repubblica & Crisi Suez',
        phaseTitle: 'Pakistan Repubblica Islamica (23 Mar 1956), Riordino India (1° Nov), Indipendenza Sudan (Fuori) & Spaccatura su Suez',
        summary:
          'Il 1° gennaio 1956 il Sudan diviene indipendente al di fuori del Commonwealth; il 23 marzo 1956 il Pakistan promulga la prima Costituzione diventando Repubblica Islamica nel Commonwealth (come già l’India dal 1950, che il 1° novembre attua lo States Reorganisation Act). A fine anno l’intervento militare britannico a Suez genera aspre tensioni tra Londra (Anthony Eden), India, Pakistan, Ceylon e Canada (mentre Gold Coast e Malesia restano colonie fino al 1957).',
      },
      {
        fromStep: 34,
        toStep: 34,
        status: 'active',
        statusLabel: 'Commonwealth · Indipendenza di Ghana (6 Mar) & Malesia (31 Ago 1957)',
        phaseTitle: 'Premier Harold Macmillan, Dominion del Ghana (6 Mar 1957) & Federazione della Malesia Sovrana (31 Ago 1957)',
        summary:
          'Nel 1957 entrano nel Commonwealth come Stati sovrani il Dominion del Ghana (`GHA`, 6 marzo 1957 — primo Stato dell’Africa subsahariana coloniale a conquistare l’indipendenza, PM Kwame Nkrumah) e la Federazione della Malesia (`MAL`, 31 agosto 1957 — Hari Merdeka, PM Tunku Abdul Rahman), mentre Singapore, Sarawak, Sabah/Labuan e Brunei restano ancora britannici e il Canada aggiorna la Red Ensign (8 ott 1957).',
      },
    ],
    milestones: [
      { step: 19, dateLabel: '15 Ago 1947', title: 'Nuovi Dominions di India e Pakistan', detail: 'Prima adesione di Stati asiatici sovrani al Commonwealth.' },
      { step: 23, dateLabel: '18 & 26 Apr 1949', title: 'Uscita Irlanda · Dichiarazione di Londra', detail: 'Nasce il moderno Commonwealth of Nations compatibile con la forma repubblicana.' },
      { step: 25, dateLabel: '26 Gen 1950', title: 'India Repubblica nel Commonwealth', detail: 'Entra in vigore la Costituzione indiana; varato nello stesso gennaio il Piano di Colombo.' },
      { step: 29, dateLabel: '6 Feb 1952', title: 'Ascesa al Trono della Regina Elisabetta II', detail: 'Alla morte di Re Giorgio VI, Elisabetta II diviene Regina dei Reami e Capo del Commonwealth.' },
      { step: 30, dateLabel: '2 Giu & Set 1953', title: 'Incoronazione di Elisabetta II & Federazione FRN', detail: 'Incoronazione a Westminster; istituzione della Federazione coloniale di Rhodesia e Nyasaland con capitale a Salisbury.' },
      { step: 31, dateLabel: '14 Apr & 8 Set 1954', title: 'Flags Act Australia · Colombo & SEATO', detail: 'Entra in vigore la Blue Ensign australiana; conferenza delle Potenze di Colombo e ingresso di AST, NZL, PAK e UK nella SEATO.' },
      { step: 32, dateLabel: 'Apr–Nov 1955', title: 'Patto di Baghdad (UK/PAK) · Emergenza Cipro · Ceylon all’ONU', detail: 'Londra e Karachi nel Patto di Baghdad; EOKA a Cipro; Ceylon ammessa all’ONU il 14 dic 1955.' },
      { step: 33, dateLabel: '23 Mar & Nov 1956', title: 'Pakistan Repubblica nel Commonwealth · Crisi di Suez', detail: 'Costituzione repubblicana del Pakistan (23 mar); frattura tra Regno Unito e reami/repubbliche su Suez (Ghana e Malesia ancora UK al 31 dic).' },
      { step: 34, dateLabel: '6 Mar & 31 Ago 1957', title: 'Indipendenza di Ghana e Federazione della Malesia', detail: 'Il Ghana (6 mar) e la Federazione della Malesia (31 ago) diventano nuovi membri sovrani del Commonwealth; Red Ensign canadese con foglie rosse (8 ott).' },
    ],
    members: [
      { code: 'UK', role: 'Fondatore', joinStep: 0 },
      { code: 'CAN', role: 'Fondatore', joinStep: 0 },
      { code: 'AST', role: 'Fondatore', joinStep: 0 },
      { code: 'NZL', role: 'Fondatore', joinStep: 0 },
      { code: 'SAF', role: 'Fondatore', joinStep: 0 },
      { code: 'IRE', role: 'Fondatore', joinStep: 0, leaveStep: 23, exitType: 'Uscito', exitReason: 'Republic of Ireland Act (18 aprile 1949)' },
      { code: 'IND', role: 'Membro', joinStep: 19 },
      { code: 'PAK', role: 'Membro', joinStep: 19 },
      { code: 'CEY', role: 'Membro', joinStep: 21 },
      { code: 'GHA', label: 'Ghana', role: 'Membro', joinStep: 34 },
      { code: 'MAL', label: 'Federazione della Malesia', role: 'Membro', joinStep: 34 },
    ],
  },

  // 14. PATTO TRIPARTITO & ASSE
  {
    id: 'tripartito',
    acronym: 'ASSE · TRIPARTITO',
    name: 'Patto Tripartito & Blocco dell’Asse',
    officialName: 'Patto Anticomintern (1936) → Patto d’Acciaio (1939) → Patto Tripartito (27 Set 1940)',
    category: 'security',
    categoryLabel: 'Alleanza Bellica',
    accentColor: '#78716c',
    headquarters: 'Berlino · Roma · Tokyo',
    foundedDate: '25 Nov 1936 (Anticomintern) · 27 Set 1940 (Tripartito)',
    dissolvedDate: '1945 (Resa Germania Mag 1945 & Giappone Set 1945)',
    treaty: 'Patto d’Acciaio (22 Mag 1939) · Patto Tripartito di Berlino (27 Set 1940)',
    keyFigures: 'Joachim von Ribbentrop · Galeazzo Ciano · Saburō Kurusu · Ion Antonescu · Miklós Horthy',
    mission:
      'Sistema di alleanze revisioniste e militari di Germania, Italia e Giappone con ripartizione delle sfere d’egemonia ("Ordine Nuovo" europeo e "Sfera di Co-Prosperità" asiatica).',
    keyArticles: [
      'Art. 1–3 Patto Tripartito: mutuo riconoscimento dell’egemonia italo-tedesca in Europa e giapponese nella Grande Asia Orientale, con assistenza militare contro terze potenze.',
    ],
    organs: [
      { name: 'Commissioni Miste di Berlino, Roma e Tokyo', role: 'Coordinamento politico, economico e di armistizio (1940–43).' },
      { name: 'Conferenza Grande Asia Orientale (Nov 1943)', role: 'Vertice di Tokyo tra Giappone, Cina di Wang Jingwei, Manciukuò, Thailandia, Birmania e Filippine.' },
    ],
    phases: [
      {
        fromStep: 0,
        toStep: 3,
        status: 'forming',
        statusLabel: 'Asse & Anticomintern',
        phaseTitle: 'Asse Roma-Berlino (Ott 1936) & Patto Anticomintern',
        summary:
          'Germania e Giappone firmano il Patto Anticomintern nel novembre 1936, cui aderiscono Italia (nov 1937), Ungheria, Manciukuò e Spagna (1939).',
      },
      {
        fromStep: 4,
        toStep: 6,
        status: 'active',
        statusLabel: 'Patto d’Acciaio',
        phaseTitle: 'Patto d’Acciaio (Mag 1939) → Entrata in Guerra dell’Italia (Giu 1940)',
        summary:
          'Italia e Germania stringono alleanza militare offensiva e difensiva il 22 maggio 1939; Roma entra nel conflitto il 10 giugno 1940.',
      },
      {
        fromStep: 7,
        toStep: 12,
        status: 'active',
        statusLabel: 'Patto Tripartito',
        phaseTitle: 'Allargamento Balcanico & Apogeo 1940–42',
        summary:
          'Firmato il 27 settembre 1940, si estende a Ungheria, Romania, Slovacchia (nov 1940), Bulgaria (mar 1941) e Croazia NDH (giu 1941).',
      },
      {
        fromStep: 13,
        toStep: 17,
        status: 'crisis',
        statusLabel: 'In Defezione / Crollo',
        phaseTitle: 'Armistizio Italiano (Set 1943) → Rese Balcaniche 1944 & Crollo Finale',
        summary:
          'Con l’8 settembre 1943 l’Italia esce dall’Asse (resta la RSI satellite); nell’estate-autunno 1944 Romania e Bulgaria cambiano fronte; nella primavera 1945 il blocco crolla totalmente.',
      },
      {
        fromStep: 18,
        toStep: 34,
        status: 'dissolved',
        statusLabel: 'Sciolto (1945)',
        phaseTitle: 'Capitolazione Totale dell’Asse (Mag–Set 1945)',
        summary:
          'Dissolto irrevocabilmente con la resa incondizionata di Germania e Giappone e i processi di Norimberga e Tokyo.',
      },
    ],
    milestones: [
      { step: 4, dateLabel: '22 Mag 1939', title: 'Firma del Patto d’Acciaio', detail: 'Alleanza militare totale tra Terzo Reich e Regno d’Italia.' },
      { step: 7, dateLabel: '27 Set 1940', title: 'Patto Tripartito a Berlino', detail: 'Germania, Italia e Giappone formalizzano l’alleanza tripolare, seguiti dagli Stati balcanici.' },
      { step: 13, dateLabel: '8 Set 1943', title: 'Defezione del Regno d’Italia', detail: 'L’Armistizio di Cassibile spezza il nucleo europeo dell’Asse (nasce la RSI al Nord).' },
    ],
    members: [
      { code: 'GER', role: 'Fondatore', joinStep: 0, leaveStep: 18 },
      { code: 'ITA', role: 'Fondatore', joinStep: 1, leaveStep: 13, exitType: 'Uscito', exitReason: 'Armistizio di Cassibile (8 settembre 1943)' },
      { code: 'JAP', role: 'Fondatore', joinStep: 0, leaveStep: 18 },
      { code: 'MAN', role: 'Membro', joinStep: 3, leaveStep: 18 },
      { code: 'HUN', role: 'Membro', joinStep: 3, leaveStep: 17, exitType: 'Uscito', exitReason: 'Occupazione sovietica / Governo provvisorio (1944–45)' },
      { code: 'ROM', role: 'Membro', joinStep: 7, leaveStep: 16, exitType: 'Uscito', exitReason: 'Colpo di Stato di Re Michele e passaggio agli Alleati (23 ago 1944)' },
      { code: 'SLO', role: 'Membro', joinStep: 7, leaveStep: 17 },
      { code: 'BUL', role: 'Membro', joinStep: 8, leaveStep: 16, exitType: 'Uscito', exitReason: 'Rivoluzione del 9 settembre 1944' },
      { code: 'CRO', role: 'Membro', joinStep: 8, leaveStep: 18 },
      { code: 'RSI', role: 'Membro', joinStep: 13, leaveStep: 17 },
      { code: 'SIA', label: 'Thailandia', role: 'Membro', joinStep: 9, leaveStep: 18 },
    ],
  },

  // 15. SEATO — PATTO DI MANILA (8 SETTEMBRE 1954)
  {
    id: 'seato',
    acronym: 'SEATO',
    name: 'SEATO · Patto di Manila',
    officialName: 'Southeast Asia Treaty Organization (Trattato di Difesa Collettiva del Sud-Est Asiatico)',
    category: 'security',
    categoryLabel: 'Sicurezza & Difesa',
    accentColor: '#0284c7',
    headquarters: 'Bangkok',
    foundedDate: '8 Settembre 1954',
    treaty: 'Trattato di Difesa Collettiva per l’Asia Sud-Orientale (Manila, 8 Settembre 1954)',
    keyFigures: 'John Foster Dulles · Anthony Eden · Richard Casey · Plaek Phibunsongkhram · Ramon Magsaysay',
    mission:
      'Contenimento collettivo dell’espansione comunista nel Sud-Est Asiatico dopo la caduta di Điện Biên Phủ e gli Accordi di Ginevra sul 17° parallelo in Vietnam, offrendo un ombrello protettivo (Protocollo) a Stato del Vietnam, Laos e Cambogia.',
    keyArticles: [
      'Art. IV (Patto di Manila): Impegno di consultazione e reazione contro attacchi armati e sovversione nell’area del trattato (limitato dagli USA all’aggressione comunista).',
      'Protocollo Aggiuntivo di Manila: Estende la designazione di area protetta a Stato del Vietnam (`SVN`), Regno del Laos (`LAO`) e Regno di Cambogia (`CAM`), impossibilitati ad aderire formalmente dagli Accordi di Ginevra.',
    ],
    organs: [
      { name: 'Consiglio dei Ministri SEATO', role: 'Organo politico annuale di consultazione strategica tra le otto potenze firmatarie.' },
      { name: 'Segretariato Permanente di Bangkok', role: 'Coordinamento politico, intelligence antinsurrezionale e scambi militari regionali in Thailandia.' },
    ],
    phases: [
      {
        fromStep: 0,
        toStep: 30,
        status: 'inactive',
        statusLabel: 'Non Istituita',
        phaseTitle: 'Pre-Manila (1936–1953)',
        summary:
          'Prima della caduta di Điện Biên Phủ e degli Accordi di Ginevra del luglio 1954 non esiste la SEATO (solo il trattato trilaterale ANZUS firmato nel settembre 1951).',
      },
      {
        fromStep: 31,
        toStep: 31,
        status: 'active',
        statusLabel: 'Attiva · 8 Membri Firmatari',
        phaseTitle: 'Firma del Patto di Manila (8 Settembre 1954) & Protocollo su Indocina Meridionale',
        summary:
          'L’8 settembre 1954 Stati Uniti, Regno Unito, Francia, Australia, Nuova Zelanda, Pakistan, Filippine e Thailandia firmano a Manila il Trattato istitutivo della SEATO (con sede designata a Bangkok) in risposta alla partizione del Vietnam, estendendo tramite protocollo separato una garanzia di sicurezza a Stato del Vietnam (`SVN`), Laos (`LAO`) e Cambogia (`CAM`). India, Indonesia e Birmania rifiutano di aderire privilegiando il non-allineamento.',
      },
      {
        fromStep: 32,
        toStep: 34,
        status: 'active',
        statusLabel: 'Attiva · 8 Membri (Bangkok)',
        phaseTitle: 'Patto di Manila (SEATO) — Vertice di Karachi (Mar 1956) & Ombrello su Vietnam del Sud / Laos / Cambogia',
        summary:
          'Nel marzo 1956 il secondo Consiglio dei Ministri SEATO riunito a Karachi ribadisce il protocollo protettivo verso Repubblica del Vietnam (`SVN`), Regno del Laos (`LAO`) e Regno di Cambogia (`CAM`), mentre la Thailandia e il Pakistan (neo-proclamata Repubblica Islamica) restano pilastri regionali accanto a USA, UK, Francia, Australia, Nuova Zelanda e Filippine.',
      },
    ],
    milestones: [
      { step: 31, dateLabel: '8 Set 1954', title: 'Firma del Patto di Manila (SEATO)', detail: '8 nazioni firmano il Trattato di Difesa Collettiva del Sud-Est Asiatico a Manila con protocollo protettivo per SVN, LAO e CAM.' },
      { step: 32, dateLabel: '19–25 Feb 1955', title: 'Entrata in Vigore & Consiglio di Bangkok', detail: 'Ratificato il Patto di Manila; il 26 ott 1955 la neonata Repubblica del Vietnam (SVN) resta sotto il protocollo di sicurezza SEATO.' },
    ],
    members: [
      { code: 'USA', role: 'Fondatore', joinStep: 31 },
      { code: 'UK', role: 'Fondatore', joinStep: 31 },
      { code: 'FRA', role: 'Fondatore', joinStep: 31 },
      { code: 'AST', role: 'Fondatore', joinStep: 31 },
      { code: 'NZL', role: 'Fondatore', joinStep: 31 },
      { code: 'PAK', role: 'Fondatore', joinStep: 31 },
      { code: 'PHL', role: 'Fondatore', joinStep: 31 },
      { code: 'SIA', label: 'Thailandia', role: 'Fondatore', joinStep: 31 },
    ],
  },

  // 16. PATTO DI VARSAVIA (14 Maggio 1955)
  {
    id: 'patto_varsavia',
    acronym: 'PATTO DI VARSAVIA',
    name: 'Patto di Varsavia (OTV)',
    officialName: 'Trattato di Amicizia, Cooperazione e Mutua Assistenza — Organizzazione del Trattato di Varsavia',
    category: 'security',
    categoryLabel: 'Sicurezza & Blocchi',
    accentColor: '#dc2626',
    headquarters: 'Mosca (Comando Unificato) · Firma a Varsavia',
    foundedDate: '14 Maggio 1955',
    treaty: 'Trattato di Varsavia del 14 Maggio 1955',
    keyFigures: 'Nikolaj Bulganin · Nikita Chruščëv · Maresciallo Ivan Konev (1° Comandante in Capo) · Józef Cyrankiewicz',
    mission:
      'Alleanza militare integrata degli otto Stati socialisti dell’Europa orientale e centrale, istituita in risposta all’ingresso della Repubblica Federale Tedesca (Germania Ovest) nella NATO e nella UEO.',
    keyArticles: [
      'Art. 4 (Mutua Difesa): in caso di attacco armato in Europa contro uno o più firmatari, ciascuna parte presta immediata assistenza con ogni mezzo necessario, incluso l’uso della forza armata.',
      'Art. 5 (Comando Militare Unificato): istituzione del Comando Unificato delle Forze Armate a Mosca sotto il Maresciallo URSS Ivan Konev.',
    ],
    organs: [
      { name: 'Comitato Politico Consultivo', role: 'Organo politico supremo formato dai segretari generali e capi di governo degli 8 Stati membri.' },
      { name: 'Comando Unificato delle Forze Armate', role: 'Direzione strategica congiunta guidata dal Maresciallo sovietico Ivan Konev.' },
    ],
    phases: [
      {
        fromStep: 0,
        toStep: 31,
        status: 'inactive',
        statusLabel: 'Non Istituito',
        phaseTitle: 'Trattati Bilaterali Orientali & Conferenza di Mosca (Pre-Maggio 1955)',
        summary:
          'Prima del 14 maggio 1955 il blocco sovietico si regge su trattati bilaterali e sul Comecon; solo dopo l’ingresso della Germania Ovest nella NATO (9 maggio 1955) nasce il Patto di Varsavia.',
      },
      {
        fromStep: 32,
        toStep: 32,
        status: 'active',
        statusLabel: 'Attivo · 8 Membri (Comando Konev)',
        phaseTitle: 'Fondazione a Varsavia (14 Maggio 1955) & Trattato di Sovranità URSS–RDT (20 Settembre 1955)',
        summary:
          'Cinque giorni dopo l’ingresso della BRD nella NATO, il 14 maggio 1955 URSS, Albania, Bulgaria, Cecoslovacchia, Germania Est (`DDR`), Polonia, Romania e Ungheria firmano a Varsavia il trattato ventennale di difesa reciproca sotto il Comando Unificato del Mar. Ivan Konev. Il 20 settembre 1955 Mosca firma il trattato di piena sovranità con la RDT (contemporaneamente la neutralità austriaca del Trattato di Stato 15 mag sblocca il ritiro sovietico dall’Austria).',
      },
      {
        fromStep: 33,
        toStep: 33,
        status: 'crisis',
        statusLabel: 'Crisi 1956 · Ungheria & Polonia',
        phaseTitle: 'Ottobre Polacco (19–21 Ott) · Ritiro Annunciato di Nagy (1° Nov) & Operazione Turbine in Ungheria (4–11 Nov 1956)',
        summary:
          'Nel 1956 il Patto di Varsavia affronta la sua prima grande crisi interna: nell’Ottobre Polacco (19–21 ott), Władysław Gomułka ottiene il rimpatrio dei consiglieri sovietici (mar. Rokossovskij) mantenendo però la Polonia (`POL`) nell’Alleanza; in Ungheria il governo Imre Nagy proclama l’1° novembre l’uscita dal Patto di Varsavia e la neutralità, provocando l’intervento corazzato sovietico dell’Operazione Turbine (4–11 nov) che riporta l’Ungheria (`HUN`) sotto János Kádár nel Patto.',
      },
      {
        fromStep: 34,
        toStep: 34,
        status: 'active',
        statusLabel: 'Attivo · 8 Membri (Normalizzazione & Era Sputnik 1957)',
        phaseTitle: 'Accordi Militari Sovietico–Ungheresi (27 Mag 1957), Consolidamento Chruščëv & Sputnik 1 (4 Ott 1957)',
        summary:
          'Dopo la crisi del 1956, gli 8 membri del Patto di Varsavia consolidano la propria coesione militare (accordo di stazionamento truppe URSS in Ungheria del 27 maggio 1957) mentre Mosca inaugura l’era missilistica intercontinentale con Sputnik 1 (4 ott) e Sputnik 2 (3 nov 1957).',
      },
    ],
    milestones: [
      { step: 32, dateLabel: '14 Mag 1955', title: 'Firma del Patto di Varsavia (8 Stati)', detail: 'Risposta immediata al riarmo e all’ingresso della Germania Ovest nella NATO (9 maggio 1955).' },
      { step: 32, dateLabel: '20 Set 1955', title: 'Trattato di Sovranità URSS–DDR', detail: 'Abolita l’Alta Commissione Sovietica; la Germania Est diviene pilastro sovrano avanzato del Patto.' },
      { step: 33, dateLabel: '19 Ott – 11 Nov 1956', title: 'Crisi di Polonia & Rivoluzione Ungherese', detail: 'Gomułka mantiene la Polonia nel Patto; l’Operazione Turbine annulla il ritiro ungherese di Nagy insediando Kádár.' },
    ],
    members: [
      { code: 'SOV', role: 'Fondatore', joinStep: 32 },
      { code: 'ALB', role: 'Fondatore', joinStep: 32 },
      { code: 'BUL', role: 'Fondatore', joinStep: 32 },
      { code: 'CZE', role: 'Fondatore', joinStep: 32 },
      { code: 'DDR', label: 'Germania Est (RDT)', role: 'Fondatore', joinStep: 32 },
      { code: 'HUN', role: 'Fondatore', joinStep: 32 },
      { code: 'POL', role: 'Fondatore', joinStep: 32 },
      { code: 'ROM', role: 'Fondatore', joinStep: 32 },
    ],
  },

  // 17. PATTO DI BAGHDAD (METO / FUTURA CENTO, 1955)
  {
    id: 'patto_baghdad',
    acronym: 'PATTO DI BAGHDAD',
    name: 'Patto di Baghdad (METO / CENTO)',
    officialName: 'Organizzazione del Trattato del Medio Oriente (Patto di Mutua Cooperazione di Baghdad)',
    category: 'security',
    categoryLabel: 'Sicurezza & Blocchi',
    accentColor: '#0ea5e9',
    headquarters: 'Baghdad',
    foundedDate: '24 Febbraio 1955',
    treaty: 'Patto di Mutua Cooperazione Iraq–Turchia (Baghdad, 24 Febbraio 1955)',
    keyFigures: 'Nuri al-Sa\'id (Iraq) · Adnan Menderes (Turchia) · Anthony Eden / Harold Macmillan (UK) · Hossein Ala\' (Iran)',
    mission:
      'Alleanza difensiva mediorientale lungo la "fascia settentrionale" (Northern Tier) promossa da Regno Unito e Stati Uniti per contenere la penetrazione sovietica in Medio Oriente.',
    keyArticles: [
      'Art. 1 (Cooperazione per la Sicurezza e la Difesa): impegno alla mutua assistenza difensiva tra gli Stati del Levante, dell’altopiano iranico e della frontiera meridionale sovietica.',
    ],
    organs: [
      { name: 'Consiglio Permanente dei Ministri di Baghdad', role: 'Coordinamento politico-militare (prima sessione inaugurale a Baghdad, nov 1955).' },
      { name: 'Comitato Militare & Segretariato', role: 'Pianificazione di difesa aerea e controllo strategico tra Golfo Persico, Turchia e Balucistan.' },
    ],
    phases: [
      {
        fromStep: 0,
        toStep: 31,
        status: 'inactive',
        statusLabel: 'Non Istituito',
        phaseTitle: 'Pre-1955 — Trattato Bilaterale Turco-Pakistano (Apr 1954)',
        summary:
          'Fino al dicembre 1954 esiste soltanto l’accordo bilaterale di amicizia tra Turchia e Pakistan (2 apr 1954): il Patto di Baghdad nascerà il 24 febbraio 1955.',
      },
      {
        fromStep: 32,
        toStep: 34,
        status: 'active',
        statusLabel: 'Attivo · 5 Membri (Baghdad · Pre-1958)',
        phaseTitle: 'Patto di Baghdad (IRQ, TUR, UK, PAK, IRN) — Impatto Politico della Crisi di Suez (Nov–Dic 1956)',
        summary:
          'Al 31 dicembre 1956 il Patto di Baghdad riunisce i cinque firmatari (Iraq, Turchia, Regno Unito, Pakistan e Iran), pur attraversando forti tensioni interne nel novembre 1956 quando i quattro membri musulmani condannano l’attacco anglo-francese-israeliano a Suez riunendosi temporaneamente senza Londra a Teheran.',
      },
    ],
    milestones: [
      { step: 32, dateLabel: '24 Feb 1955', title: 'Firma del Patto a Baghdad (Iraq & Turchia)', detail: 'Nuri al-Sa\'id e Adnan Menderes varano il perno mediorientale anti-sovietico.' },
      { step: 32, dateLabel: '5 Apr – 3 Nov 1955', title: 'Ingresso di Regno Unito, Pakistan e Iran', detail: 'Con l’adesione britannica (apr), pakistana (set) e iraniana (nov) si chiude la cintura del Northern Tier.' },
    ],
    members: [
      { code: 'IRQ', label: 'Iraq', role: 'Fondatore', joinStep: 32 },
      { code: 'TUR', label: 'Turchia', role: 'Fondatore', joinStep: 32 },
      { code: 'UK', label: 'Regno Unito', role: 'Membro', joinStep: 32 },
      { code: 'PAK', label: 'Pakistan', role: 'Membro', joinStep: 32 },
      { code: 'IRN', label: 'Iran', role: 'Membro', joinStep: 32 },
    ],
  },
];

export function getOrgStateAtStep(org: InternationalOrganization, step: number): ResolvedOrgState {
  let activePhase = org.phases[0];
  for (const ph of org.phases) {
    if (step >= ph.fromStep && step <= ph.toStep) {
      activePhase = ph;
      break;
    }
  }

  const activeMembers: OrgMemberEntry[] = [];
  const formerMembers: OrgMemberEntry[] = [];

  for (const m of org.members) {
    if (step >= m.joinStep) {
      if (m.leaveStep !== undefined && step >= m.leaveStep) {
        if (m.exitType) {
          formerMembers.push(m);
        }
      } else {
        activeMembers.push(m);
      }
    }
  }

  return {
    status: activePhase.status,
    statusLabel: activePhase.statusLabel,
    phaseTitle: activePhase.phaseTitle,
    summary: activePhase.summary,
    activeMembers,
    formerMembers,
  };
}

export function getOwnerMembershipsAtStep(
  ownerCode: string,
  step: number
): { org: InternationalOrganization; state: ResolvedOrgState; role: MemberRole }[] {
  const norm = normalizeOwnerForOrg(ownerCode);
  const res: { org: InternationalOrganization; state: ResolvedOrgState; role: MemberRole }[] = [];

  for (const org of INTERNATIONAL_ORGANIZATIONS) {
    const st = getOrgStateAtStep(org, step);
    if (st.status === 'inactive' || st.status === 'dissolved') continue;
    const found = st.activeMembers.find((m) => normalizeOwnerForOrg(m.code) === norm);
    if (found) {
      res.push({ org, state: st, role: found.role });
    }
  }
  return res;
}

export function countActiveOrgsAtStep(step: number): number {
  let count = 0;
  for (const org of INTERNATIONAL_ORGANIZATIONS) {
    const st = getOrgStateAtStep(org, step);
    if (st.status === 'active' || st.status === 'forming' || st.status === 'crisis') {
      count++;
    }
  }
  return count;
}

export function computeOrgLiveMetrics(
  activeMembers: OrgMemberEntry[],
  ownPop?: Record<string, number>,
  ownArea?: Record<string, number>
): { popMillions: number; areaKm2: number; worldPopPct: number; worldAreaPct: number } {
  const totalPop = ownPop ? Object.values(ownPop).reduce((a, b) => a + (Number(b) || 0), 0) : 0;
  const totalArea = ownArea ? Object.values(ownArea).reduce((a, b) => a + (Number(b) || 0), 0) : 0;

  // Raccoglie sia il codice diretto che eventuali alias nella stats map
  const seenOwners = new Set<string>();
  let popMillions = 0;
  let areaKm2 = 0;

  const lookupKeys = (code: string): string[] => {
    const c = code.toUpperCase();
    const keys = [c];
    for (const [alias, target] of Object.entries(OWNER_ALIAS_MAP)) {
      if (target === c) keys.push(alias);
      if (alias === c) keys.push(target);
    }
    return keys;
  };

  for (const m of activeMembers) {
    for (const k of lookupKeys(m.code)) {
      if (seenOwners.has(k)) continue;
      if ((ownArea && ownArea[k] !== undefined) || (ownPop && ownPop[k] !== undefined)) {
        seenOwners.add(k);
        popMillions += Number(ownPop?.[k]) || 0;
        areaKm2 += Number(ownArea?.[k]) || 0;
      }
    }
  }

  return {
    popMillions,
    areaKm2,
    worldPopPct: totalPop > 0 ? Math.min(100, (popMillions / totalPop) * 100) : 0,
    worldAreaPct: totalArea > 0 ? Math.min(100, (areaKm2 / totalArea) * 100) : 0,
  };
}
