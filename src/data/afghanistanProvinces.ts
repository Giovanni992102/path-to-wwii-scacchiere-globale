/**
 * Dettaglio Geocartografico e Toponomastico Storico del Regno dell'Afghanistan (1936-1941)
 * Copertura integrale di tutte le 34 Province, nel contesto dell'era di Re Mohammed Zahir Shah
 * e del Primo Ministro Sardar Mohammad Hashim Khan (Dinastia Musahiban).
 *
 * Evoluzione Geopolitica e Temporale (Step 0 - 8):
 * - Step 0-1 (1936 - mar 1938): Consolidamento del giovane Re Mohammed Zahir Shah (salito al trono nel 1933
 *   dopo l'assassinio del padre Mohammad Nadir Shah) e del governo dello zio Mohammad Hashim Khan.
 *   Prudente modernizzazione istituzionale; relazioni privilegiate con Germania e Italia come 'terze forze'
 *   rispetto all'egemonia britannica (Raj sulla Durand Line) e sovietica (repubbliche centroasiatiche sull'Oxus).
 *   Sviluppo cotoniero della Spinzar a Qataghan (Kunduz) sotto Sher Khan Nasher. Luglio 1937: Trattato di Saadabad
 *   (patto di non aggressione con Turchia, Iran e Iraq).
 * - Step 2-4 (ott 1938 - apr 1939): Crisi dei Sudeti, smembramento della Cecoslovacchia e invasione dell'Albania.
 *   Kabul accoglie legazioni diplomatiche di Germania (Hans Pilger), Italia (Pietro Quaroni) e Giappone.
 *   Istruttori italiani per l'aviazione militare reale; linea aerea Lufthansa Berlino-Kabul.
 *   Prudenza assoluta dopo la firma del Patto Molotov-Ribbentrop tra i due temuti vicini e partner commerciali.
 * - Step 5 (set 1939): Scoppio della Seconda Guerra Mondiale in Europa. Il 6 settembre 1939 Re Zahir Shah
 *   e il Primo Ministro Hashim Khan proclamano la solenne, assoluta e rigorosa neutralità dell'Afghanistan.
 *   Vigilanza militare rafforzata lungo la Durand Line per impedire alle tribù Pashtun di varcare la frontiera.
 * - Step 6-7 (giu 1940 - ott 1940): Caduta della Francia ed entrata in guerra dell'Italia fascista (giugno 1940).
 *   L'Afghanistan si trova isolato geograficamente: tutte le vie marittime e terrestri transitano per il Raj o l'URSS.
 *   Pressioni dei ministri Quaroni e Pilger per appoggiare la rivolta tribale del Faqir di Ipi nel Waziristan;
 *   Hashim Khan rifiuta fermamente ogni avventurismo, negoziando scambi commerciali di sopravvivenza sia con Londra
 *   (via Karachi) sia con Mosca.
 * - Step 8 (apr 1941): Crisi in Medio Oriente (colpo di stato di Rashid Ali in Iraq) e transito clandestino a Kabul
 *   del leader indipendentista indiano Subhas Chandra Bose, che con l'aiuto della legazione italiana (Quaroni)
 *   ottiene un passaporto diplomatico ('Orlando Mazzotta') per raggiungere Berlino via Mosca. Nonostante le crescenti
 *   pressioni congiunte anglo-sovietiche, Zahir Shah e Hashim Khan mantengono con inflessibile fermezza la neutralità,
 *   preservando la sovranità, la pace e l'integrità territoriale dell'Afghanistan.
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

export interface AfghanistanProvinceInfo {
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

export const AFGHANISTAN_PROVINCES_META: Record<string, AfghanistanProvinceInfo> = {
  AF_KAB: {
    id: 'AF_KAB',
    iso: 'AF-KAB',
    cntrCode: 'AFG',
    name: 'Kabul',
    modernName: 'Wilayat-e Kabul (Provincia di Kabul)',
    historicalName: 'Vilayat-e Kabul / Capitale del Regno dell\'Afghanistan (Kabul — Arg Real Palace)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Corte Reale di Re Zahir Shah & Governo di Mohammad Hashim Khan',
    capital: 'Kabul',
    region: 'Regione della Capitale / Afghanistan Centrale',
    historicalToponym: 'Kabul / Arg-e Shahi / Bala Hissar / Deh Mazang / Paghman / Darulaman',
    s0_1: '1936-1937: Capitale del Regno dell\'Afghanistan (Da Afghānistān Shāhī Dawlat) sotto il giovane Re Mohammed Zahir Shah (salito al trono nel 1933) e la guida del Primo Ministro, lo zio Sardar Mohammad Hashim Khan. La corte nell\'Arg (Palazzo Reale) persegue una politica di cauta modernizzazione istituzionale e infrastrutturale. Vengono ingaggiati ingegneri e docenti tedeschi (per l\'Amani High School e la rete telegrafica) e aperta la rotta aerea Lufthansa Berlino-Kabul. Nel luglio 1937 l\'Afghanistan firma il Trattato di Saadabad (patto di non aggressione con Turchia, Iran e Iraq), consolidando la propria posizione internazionale.',
    s2_4: '1938 - Marzo 1939: Consolidamento diplomatico di Kabul come punto d\'equilibrio tra l\'Impero Britannico (Raj lungo la Durand Line) e l\'Unione Sovietica (repubbliche centroasiatiche oltre l\'Amu Darya). Per sottrarsi all\'abbraccio dei due colossi, Hashim Khan privilegia le relazioni economiche e tecniche con la Germania e l\'Italia. A Kabul operano le legazioni del Terzo Reich (ministro Hans Pilger) e del Regno d\'Italia (ministro Pietro Quaroni), mentre tecnici italiani curano l\'addestramento della neonata Regia Aeronautica Afghana.',
    s5: 'Settembre 1939: Scoppio della Seconda Guerra Mondiale in Europa. Il 6 settembre 1939 Re Zahir Shah e il Primo Ministro Hashim Khan proclamano la solenne e rigorosa neutralità dell\'Afghanistan nel conflitto. Viene convocata una riunione straordinaria dei notabili e dei ministri a Kabul: il governo ordina la rigorosa vigilanza su tutte le frontiere per evitare qualsiasi incidente diplomatico con Londra o Mosca.',
    s6: 'Giugno - Agosto 1940: Caduta della Francia ed entrata in guerra dell\'Italia fascista (10 giugno 1940). La legazione italiana di Pietro Quaroni e quella tedesca di Hans Pilger a Kabul si trovano isolate dalle rispettive madrepatrie, ma intensificano le operazioni d\'intelligence e propaganda antibritannica. Hashim Khan mantiene un controllo ferreo sul paese, respingendo ogni pressione dell\'Asse volta a provocare rivolte tribali contro il Raj Britannico.',
    s7: 'Autunno 1940: Pressione diplomatica congiunta di Gran Bretagna e Unione Sovietica sulla corte di Kabul per limitare le attività dei residenti tedeschi e italiani. Hashim Khan ribadisce la totale neutralità afghana: il governo negozia accordi commerciali di sopravvivenza (grano, cotone, manufatti) sia con il governo britannico di Nuova Delhi sia con Mosca, preservando la sovranità nazionale e la pace interna.',
    s8: 'Aprile 1941: Kabul crocevia segreto della diplomazia di guerra. A marzo 1941 giunge clandestinamente a Kabul il leader nazionalista indiano Subhas Chandra Bose, fuggito dagli arresti domiciliari a Calcutta. Grazie all\'intervento del ministro italiano Pietro Quaroni e della legazione tedesca, Bose ottiene un passaporto diplomatico italiano sotto l\'identità di \'Orlando Mazzotta\' e riparte via Termez e Mosca verso Berlino. Nonostante le turbolenze regionali (colpo di stato di Rashid Ali in Iraq), Zahir Shah e Hashim Khan mantengono con inflessibile fermezza la neutralità dell\'Afghanistan.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_HER: {
    id: 'AF_HER',
    iso: 'AF-HER',
    cntrCode: 'AFG',
    name: 'Hirat',
    modernName: 'Wilayat-e Herat (Provincia di Herat)',
    historicalName: 'Vilayat-e Herat (Herat — \'Perla del Khorasan\' & Cittadella di Ikhtiyaruddin)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Governatorato Generale di Herat (Primo Rango)',
    capital: 'Herat',
    region: 'Khorasan / Afghanistan Occidentale',
    historicalToponym: 'Herat / Ikhtiyaruddin / Musalla / Torghundi / Islam Qala / Ghorian',
    s0_1: '1936-1937: Terza metropoli del regno e capoluogo della storica provincia occidentale di Herat (\'Perla del Khorasan\'). Centro commerciale, culturale e religioso d\'eccellenza, dominato dall\'imponente Cittadella di Ikhtiyaruddin e dalla Grande Moschea del Venerdì (Masjid-e Jameh). Snodo strategico carovaniero e doganale verso l\'Impero Pahlavi dell\'Iran (via Islam Qala) e l\'URSS (stazione di Kushka).',
    s2_4: '1938 - Marzo 1939: Il governatore generale di Herat sovrintende al commercio di lana karakul, seta e tappeti verso l\'Iran e l\'Europa. In seguito al Trattato di Saadabad (1937), le relazioni transfrontaliere con la provincia persiana del Khorasan sono distese e regolari. Rafforzamento del presidio militare di frontiera lungo il fiume Hari Rud.',
    s5: 'Settembre 1939: Dichiarazione di neutralità del regno. Herat istituisce un cordone di sicurezza doganale sui valichi di Islam Qala verso l\'Iran e Torghundi verso la RSS Turkmena dell\'URSS. Le pattuglie di frontiera dell\'esercito reale sorvegliano le piste per scongiurare infiltrazioni armate e traffici di contrabbando.',
    s6: 'Giugno - Agosto 1940: Isolamento delle comunicazioni via terra con l\'Europa occidentale in seguito alla caduta della Francia. Herat diviene scalo vitale per i collegamenti telegrafici e commerciali che transitano attraverso l\'Iran neutrale. La guarnigione militare vigila sul delicato confine settentrionale con le truppe sovietiche stanziate a Kushka.',
    s7: 'Autunno 1940: Incremento degli scambi di frontiera con l\'Iran per il rifornimento di idrocarburi e manufatti industriali. La corte di Kabul dispone che le autorità di Herat mantengano un comportamento rigorosamente equidistante nei confronti dei cittadini sovietici e iraniani in transito.',
    s8: 'Aprile 1941: Roccaforte occidentale della sovranità afghana. Herat garantisce la totale stabilità lungo i confini con l\'Iran e l\'Unione Sovietica durante le tensioni in Medio Oriente legate alla crisi irachena di Rashid Ali al-Gaylani. La sicurezza carovaniera e urbana rimane intatta sotto il governo di Hashim Khan.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_KAN: {
    id: 'AF_KAN',
    iso: 'AF-KAN',
    cntrCode: 'AFG',
    name: 'Kandahar',
    modernName: 'Wilayat-e Kandahar (Provincia di Kandahar)',
    historicalName: 'Vilayat-e Qandahar (Kandahar — Cuore Storico Durrani & Tomba di Ahmad Shah Baba)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Governatorato Generale di Qandahar (Primo Rango)',
    capital: 'Kandahar',
    region: 'Kandahar / Afghanistan Meridionale',
    historicalToponym: 'Kandahar / Ahmad Shah Baba / Spin Boldak / Arghandab / Maiwand / Panjwai',
    s0_1: '1936-1937: Seconda città del regno e capitale storica fondata nel 1747 da Ahmad Shah Durrani (Ahmad Shah Baba), il cui sontuoso mausoleo con cupola ottagonale domina il centro urbano. Centro politico ed etnico di primaria grandezza delle confederazioni tribali Pashtun Durrani (Popalzai, Barakzai, Alikozai). Polo commerciale primario con il Raj Britannico via Chaman e Quetta.',
    s2_4: '1938 - Marzo 1939: Fervore commerciale e agricolo: le valli irrigate dell\'Arghandab producono celebri melograni, uva e fichi esportati in tutta l\'India britannica. La dogana di Spin Boldak genera cospicue entrate per l\'erario reale di Kabul. La fortezza di Kandahar ospita una delle principali divisioni dell\'Esercito Reale Afghano.',
    s5: 'Settembre 1939: Neutralità nel conflitto europeo. Le autorità di Kandahar e il comando militare di corpo d\'armata mobilitano le forze di sicurezza lungo la ferrovia di Chaman e la Durand Line. Notabili e capi tribali Durrani assicurano a Re Zahir Shah la propria lealtà, promettendo di non intraprendere azioni ostili contro i britannici al di là della frontiera.',
    s6: 'Giugno - Agosto 1940: Chiusura delle rotte marittime europee dopo l\'ingresso dell\'Italia in guerra. Kandahar diviene il varco obbligato per le importazioni ed esportazioni dell\'Afghanistan con i porti dell\'Oceano Indiano (Karachi) attraverso il Baluchistan britannico.',
    s7: 'Autunno 1940: Vigilanza rafforzata a Spin Boldak e lungo le piste del deserto del Registan. Il governo di Nuova Delhi garantisce la continuità del transito delle merci afghane attraverso la ferrovia del Sindh e del Baluchistan in cambio del mantenimento dell\'ordine tribale lungo la frontiera.',
    s8: 'Aprile 1941: Baluardo meridionale dell\'integrità afghana. Nonostante i tentativi di agitatori e spie dell\'Asse di sollevare le tribù della frontiera indo-afghana, la leadership Durrani di Kandahar rispetta scrupolosamente le direttive del Primo Ministro Hashim Khan, preservando la totale tranquillità della regione.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_BAL: {
    id: 'AF_BAL',
    iso: 'AF-BAL',
    cntrCode: 'AFG',
    name: 'Balkh',
    modernName: 'Wilayat-e Balkh (Provincia di Balkh)',
    historicalName: 'Vilayat-e Mazar-i-Sharif (Mazar-i-Sharif / Antica Balkh — Turkestan Afghano)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Governatorato Generale del Turkestan Afghano (Mazar-i-Sharif)',
    capital: 'Mazar-i-Sharif',
    region: 'Turkestan Afghano / Bacino dell\'Amu Darya',
    historicalToponym: 'Mazar-i-Sharif / Balkh (\'Madre delle Città\') / Dehdadi / Kelif / Sholgara / Khulm',
    s0_1: '1936-1937: Capitale della provincia storica del Turkestan Afghano (Vilayat-e Mazar-i-Sharif). Celebre in tutto il mondo islamico per la magnifica Moschea Blu (Santuario di Hazrat Ali). A pochi chilometri sorgono le leggendarie rovine di Balkh (la battriana \'Umm al-Bilaad\', Madre delle Città). Il porto fluviale di Kelif sull\'Amu Darya gestisce i traffici fluviali con la vicina Unione Sovietica (RSS Uzbeka).',
    s2_4: '1938 - Marzo 1939: Sviluppo del commercio di pelli di agnello karakul (astrakhan), grano e cotone. La caserma fortificata di Dehdadi ospita il quartier generale della divisione settentrionale dell\'Esercito Reale. Le autorità afghane mantengono rapporti di correttezza formale con i posti di guardia di frontiera dell\'NKVD sovietico oltre il fiume.',
    s5: 'Settembre 1939: Proclamazione della neutralità. Chiusura preventiva e monitoraggio serrato dei traghetti fluviali sull\'Amu Darya. Presidi di cavalleria e fanteria controllano le sponde del fiume da Kelif a Hairatan per scongiurare sconfinamenti e sorvegliare la presenza di profughi e fuggiaschi dall\'Asia centrale sovietica.',
    s6: 'Giugno - Agosto 1940: Fase di vigile osservazione. Con il Patto Molotov-Ribbentrop ancora in vigore e la sconfitta della Francia, la frontiera sovietica sul fiume Oxus (Amu Darya) rimane silenziosa ma presidiata. Mazar-i-Sharif garantisce l\'approvvigionamento alimentare delle valli settentrionali del regno.',
    s7: 'Autunno 1940: Scambi commerciali controllati di cotone e lana grezza con l\'agenzia commerciale sovietica Vneshtorg attraverso l\'imbarcadero di Kelif. Mantenimento rigoroso della calma e neutralità da parte del Governatore Generale afghano.',
    s8: 'Aprile 1941: Roccaforte del nord afghano. La presenza dell\'esercito reale a Dehdadi e la vigilanza lungo l\'Amu Darya garantiscono l\'inviolabilità territoriale dell\'Afghanistan settentrionale alla vigilia delle imminenti tensioni globali in Europa orientale.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_KDZ: {
    id: 'AF_KDZ',
    iso: 'AF-KDZ',
    cntrCode: 'AFG',
    name: 'Kunduz',
    modernName: 'Wilayat-e Kunduz (Provincia di Kunduz)',
    historicalName: 'Vilayat-e Qataghan (Khanabad / Kunduz — Spinzar Cotton Co. & \'Oro Bianco\')',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Vilayat-e Qataghan (Khanabad — Governatore Sher Khan Nasher)',
    capital: 'Kunduz (Sede Amministrativa Storica: Khanabad)',
    region: 'Qataghan Settentrionale',
    historicalToponym: 'Khanabad / Kunduz / Sher Khan Bandar / Aliabad / Imam Sahib / Qala-e Zal',
    s0_1: '1936-1937: Cuore pulsante della grande provincia storica di Qataghan, con capitale amministrativa a Khanabad. Sotto la straordinaria guida del governatore e pioniere industriale Sher Khan Nasher, le antiche paludi malariche vengono bonificate e trasformate in floride piantagioni di cotone. Viene fondata la celebre \'Spinzar Cotton Company\' (Società dell\'Oro Bianco), che attira tecnici cechi e tedeschi per impiantare moderni sgranatoi industriali.',
    s2_4: '1938 - Marzo 1939: Boom agroindustriale senza precedenti: il cotone di Kunduz rifornisce sia le fabbriche tessili di Kabul sia le esportazioni verso la Germania e l\'India. Lo scalo fluviale di Qizil Qala sull\'Amu Darya (in seguito ribattezzato Sher Khan Bandar) movimenta carichi pesanti con le chiatte sovietiche.',
    s5: 'Settembre 1939: Scoppio della guerra in Europa e neutralità afghana. La produzione di cotone viene riorientata verso il mercato interno e acquirenti neutrali. Presidio militare rinforzato a Imam Sahib lungo la sponda sinistra del fiume Panj/Amu Darya.',
    s6: 'Giugno - Agosto 1940: Interruzione dei rifornimenti di macchinari industriali dall\'Europa centrale. Gli stabilimenti della Spinzar a Kunduz e Khanabad continuano a lavorare a pieno regime con scorte di pezzi di ricambio; la provincia funge da motore economico per le casse dello Stato.',
    s7: 'Autunno 1940: Accordo per la fornitura di balle di cotone all\'URSS in cambio di petrolio raffinato e attrezzi agricoli. Sher Khan Nasher mantiene una stretta cooperazione con il governo di Hashim Khan per preservare l\'autonomia economica del regno.',
    s8: 'Aprile 1941: Polo produttivo primario dell\'Afghanistan. La valle di Kunduz e Khanabad costituisce il modello di successo dello sviluppo economico interbellico afghano, pienamente protetta dalla neutralità diplomatica di Re Zahir Shah.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_BDS: {
    id: 'AF_BDS',
    iso: 'AF-BDS',
    cntrCode: 'AFG',
    name: 'Badakhshan',
    modernName: 'Wilayat-e Badakhshan (Provincia del Badakhshan)',
    historicalName: 'Vilayat-e Badakhshan (Fayzabad / Pamir & Corridoio del Wakhan)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Badakhshan (Fayzabad)',
    capital: 'Fayzabad',
    region: 'Badakhshan / Tetto del Mondo / Pamir',
    historicalToponym: 'Fayzabad / Sar-i Sang / Ishkashim / Wakhan / Qala-e Panja / Shighnan',
    s0_1: '1936-1937: Vasta e impervia provincia montuosa incastonata tra l\'Hindu Kush e l\'altopiano del Pamir (\'Tetto del Mondo\'). Attraversata dal fiume Kokcha, ospita le leggendarie e millenarie miniere di lapislazzuli di Sar-i Sang e di rubini/spinelli. Include lo strategico **Corridoio del Wakhan**, creato nel 1895 durante il \'Great Game\' per separare l\'Impero Russo da quello Britannico e congiungere l\'Afghanistan ai passi del Pamir verso il Sinkiang/Cina.',
    s2_4: '1938 - Marzo 1939: Sorveglianza delle frontiere d\'alta quota: a nord il fiume Panj delimita il confine con la Repubblica Socialista Sovietica Tagika; a sud le vette dell\'Hindu Kush confinano con l\'agenzia britannica di Chitral; a est il Wakhan tocca la Cina nazionalista (Xinjiang). Il capoluogo Fayzabad funge da avamposto amministrativo e caserma di frontiera.',
    s5: 'Settembre 1939: Neutralità nel conflitto mondiale. I valichi del Pamir (Ishkashim, Qala-e Panja, Sarhad) vengono presidiati da reparti speciali di fanteria da montagna afghana per impedire qualsiasi infiltrazione clandestina tra URSS, India britannica e Cina.',
    s6: 'Giugno - Agosto 1940: Completo isolamento invernale e alpino delle vallate superiori del Wakhan e del Badakhshan. Le comunicazioni a cavallo mantengono il collegamento tra Fayzabad e Kabul; la popolazione tagika e pamiri vive secondo i ritmi secolari dell\'agricoltura a terrazze e della transumanza.',
    s7: 'Autunno 1940: Pattugliamento regolare lungo il fiume Panj. Gli avamposti afghani registrano tranquillità sul confine sovietico e respingono ogni tentativo di attraversamento non autorizzato.',
    s8: 'Aprile 1941: Sentinella del Wakhan. La sovranità afghana sul corridoio geopolitico più strategico dell\'Asia centrale è preservata intatta senza incidenti, confermando l\'efficacia della diplomazia neutrale di Zahir Shah.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_NAN: {
    id: 'AF_NAN',
    iso: 'AF-NAN',
    cntrCode: 'AFG',
    name: 'Nangarhar',
    modernName: 'Wilayat-e Nangarhar (Provincia di Nangarhar)',
    historicalName: 'Hukumat-e A\'la-ye Mashriqi (Jalalabad — Residenza Invernale Reale & Porta del Khyber)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Governatorato di Mashriqi (Jalalabad)',
    capital: 'Jalalabad',
    region: 'Mashriqi (Provincia Orientale)',
    historicalToponym: 'Jalalabad / Seraj-ul-Emarat / Torkham / Khyber Pass / Shinwar / Surkh Rod',
    s0_1: '1936-1937: Capoluogo della storica Provincia Orientale (Mashriqi) e residenza invernale prediletta della corte reale (Palazzo Seraj-ul-Emarat). Posta sulla sponda meridionale del fiume Kabul in una fertile conca subtropicale di aranceti e palme, Jalalabad è il cardine della grande strada carovaniera che conduce a Torkham, al celebre Passo Khyber e a Peshawar nel Raj Britannico.',
    s2_4: '1938 - Marzo 1939: Cerniera geopolitica di primaria importanza per i rapporti tra Kabul e il governo dell\'India britannica. Monitoraggio e sussidi alle potenti tribù Pashtun della frontiera (Shinwari, Mohmand, Afridi) per garantire la sicurezza del transito mercantile attraverso il Khyber. Costruzione della moderna strada carrozzabile Jalalabad-Kabul.',
    s5: 'Settembre 1939: Neutralità e mobilitazione di sicurezza. Con la dichiarazione di guerra in Europa, la frontiera di Torkham e il Passo Khyber sono sottoposti a rigido controllo congiunto con le autorità britanniche di Peshawar. Re Zahir Shah ordina ai capi tribali di Nangarhar di mantenere la pace e non prestare ascolto a incitamenti alla guerra santa.',
    s6: 'Giugno - Agosto 1940: Tensione lungo la frontiera tribale: emissari dell\'Asse cercano di raggiungere le tribù Shinwari e Mohmand per fomentare un\'insurrezione armata antibritannica. Il Governatore di Jalalabad interviene con fermezza, arrestando infiltrati e ribadendo il divieto assoluto di raid armati verso l\'India.',
    s7: 'Autunno 1940: Il Passo Khyber rimane il corridoio vitale per l\'approvvigionamento dell\'Afghanistan in carburante, zucchero, medicinali e tessuti dal porto di Karachi. La lealtà delle tribù di Mashriqi alla corona afghana assicura la stabilità della regione.',
    s8: 'Aprile 1941: Roccaforte della stabilità orientale. La via di transito Jalalabad-Torkham-Peshawar opera regolarmente sotto lo stretto controllo della gendarmeria reale afghana, tutelando la pace del regno nonostante i fermenti indipendentisti nel subcontinente indiano.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_PKA: {
    id: 'AF_PKA',
    iso: 'AF-PKA',
    cntrCode: 'AFG',
    name: 'Paktya',
    modernName: 'Wilayat-e Paktya (Provincia di Paktia)',
    historicalName: 'Hukumat-e A\'la-ye Janubi (Gardez — Cuore Militare delle Tribù Zadran e Mangal)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Governatorato della Provincia Meridionale (Gardez)',
    capital: 'Gardez',
    region: 'Janubi (Provincia Meridionale)',
    historicalToponym: 'Gardez / Bala Hissar di Gardez / Zurmat / Zadran / Jaji / Chamkani',
    s0_1: '1936-1937: Centro nevralgico della storica Provincia Meridionale (Janubi), dominato dalla massiccia fortezza di Bala Hissar a Gardez. Regione montuosa abitata da fiere e armate confederazioni Pashtun (Zadran, Mangal, Jaji, Ahmadzai), che nel 1929 avevano costituito la colonna vertebrale dell\'esercito di Mohammad Nadir Shah per la riconquista di Kabul e l\'instaurazione della dinastia regnante.',
    s2_4: '1938 - Marzo 1939: Amministrazione basata su un delicato equilibrio tra autorità statale e jirga tribali. I fratelli Musahiban (la famiglia reale) mantengono un filo diretto con i khan dei Zadran e dei Mangal, concedendo esenzioni fiscali e posti nell\'esercito in cambio della fedeltà alla corona.',
    s5: 'Settembre 1939: Neutralità nel conflitto europeo. Hashim Khan convoca i capi tribali di Gardez per notificare la decisione del regno di restare estraneo alla guerra mondiale, vietando l\'arruolamento di combattenti volontari diretti contro le guarnigioni britanniche della North-West Frontier.',
    s6: 'Giugno - Agosto 1940: La regione è scossa dalle eco della rivolta nel vicino Waziristan guidata dal Faqir di Ipi. Il comando militare di Gardez schiera battaglioni regolari lungo i valichi montani per impedire alle tribù afghane di varcare la Durand Line a sostegno dei ribelli wazir.',
    s7: 'Autunno 1940: Controllo efficace del territorio da parte delle truppe reali stanziate a Bala Hissar. I Zadran e i Mangal mantengono la disciplina imposta dal re, rifiutando le lusinghe degli agenti dell\'Abwehr tedesca.',
    s8: 'Aprile 1941: Presidio strategico meridionale. La fedeltà di Gardez e delle valli di Paktya garantisce a Re Zahir Shah la tenuta dell\'ordine interno lungo il settore più instabile e militarizzato della frontiera afghana.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_KHO: {
    id: 'AF_KHO',
    iso: 'AF-KHO',
    cntrCode: 'AFG',
    name: 'Khost',
    modernName: 'Wilayat-e Khost (Provincia di Khost)',
    historicalName: 'Khost (Matun — Conca di Khost & Confine con il Waziristan)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Khost (Matun)',
    capital: 'Khost (Matun)',
    region: 'Janubi / Frontiera Tribale Sud-Orientale',
    historicalToponym: 'Matun / Khost / Tani / Gurbuz / Alisher / Spera / Mandozayi',
    s0_1: '1936-1937: Distretto montuoso frontaliero con capoluogo a Matun (Khost), situato in una conca valliva al confine diretto con le turbolente agenzie tribali britanniche del Nord e Sud Waziristan (Miramshah, Razmak). Cuore delle tribù Pashtun Khostwal, Tani, Sabari e Gurbuz, da sempre refrattarie a ogni controllo esterno e custodi di antichi codici d\'onore Pashtunwali.',
    s2_4: '1938 - Marzo 1939: Nel 1936-1938 esplode nel Waziristan la grande rivolta anti-britannica del carismatico leader religioso Mirza Ali Khan, il celebre **Faqir di Ipi**. La conca di Khost diventa rifugio per fuggiaschi e zona di contatto clandestino. Il governo afghano di Kabul mantiene un atteggiamento di vigile neutralità per non offrire al governo britannico pretesti di rappresaglia o raid aerei della RAF oltre la Durand Line.',
    s5: 'Settembre 1939: Neutralità afghana proclamata. Khost viene dichiarata zona speciale di sicurezza militare: presidio rafforzato a Matun per intercettare il traffico illegale di fucili Lee-Enfield e munizioni verso le montagne del Waziristan.',
    s6: 'Giugno - Agosto 1940: Tentativi dell\'intelligence italo-tedesca di finanziare il Faqir di Ipi attraverso contatti a Khost. Il governo di Kabul ordina l\'espulsione immediata di ogni emissario sospetto e ribadisce ai notabili locali che l\'Afghanistan non tollererà violazioni della propria neutralità.',
    s7: 'Autunno 1940: Pattugliamento continuo delle piste alpine tra Matun e Miramshah. Le truppe afghane mantengono la calma nella vallata, impedendo attentati transfrontalieri contro i convogli militari britannici.',
    s8: 'Aprile 1941: Baluardo della sovranità afghana sul confine più caldo dell\'Asia meridionale. Grazie alla ferrea disciplina imposta dal Primo Ministro Hashim Khan, Khost non viene trascinata nel conflitto, preservando l\'integrità del regno.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_BAM: {
    id: 'AF_BAM',
    iso: 'AF-BAM',
    cntrCode: 'AFG',
    name: 'Bamyan',
    modernName: 'Wilayat-e Bamyan (Provincia di Bamyan)',
    historicalName: 'Bamyan / Hazarajat Settentrionale (Valle dei Grandi Buddha & Scavi DAFA)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Bamyan (Valle dei Buddha)',
    capital: 'Bamyan',
    region: 'Hazarajat Settentrionale / Koh-i Baba',
    historicalToponym: 'Bamyan / Buddha Giganti (Salsal e Shamama) / Shahr-e Gholghola / Band-e Amir / Yakawlang',
    s0_1: '1936-1937: Valle monumentale incastonata ai piedi della catena del Koh-i Baba, celebre in tutto il mondo per i due colossali Buddha scolpiti nella parete rocciosa (Salsal, alto 53 metri, e Shamama, 35 metri) risalenti al VI secolo d.C. Centro nevralgico della regione storica dell\'Hazarajat settentrionale, abitata dalla popolazione Hazara di fede sciita. Negli anni \'30 la missione archeologica francese della DAFA (Délégation Archéologique Française en Afghanistan), guidata dall\'illustre Joseph Hackin, compie scavi epocali portando alla luce affreschi e santuari rupestri unici.',
    s2_4: '1938 - Marzo 1939: Snodo carovaniero di grande suggestione lungo la pista storica tra Kabul e il Turkestan afghano via il passo Shibar. La valle di Bamyan accoglie diplomatici e viaggiatori internazionali affascinati dai laghi turchesi di Band-e Amir e dalle rovine della \'Città dei Sospiri\' (Shahr-e Gholghola), distrutta da Gengis Khan.',
    s5: 'Settembre 1939: Neutralità nel conflitto europeo. Le attività di scavo della missione francese DAFA vengono temporaneamente ridotte; l\'amministrazione distrettuale di Bamyan assicura la piena protezione dei monumenti storici e la continuità dei commerci di grano e bestiame verso Kabul.',
    s6: 'Giugno - Agosto 1940: Conseguenze della caduta della Francia: Joseph Hackin e sua moglie Ria lasciano l\'Afghanistan per unirsi alle Forze della Francia Libera del Generale de Gaulle a Londra. Il distretto di Bamyan rimane sotto la tranquilla e ordinata custodia delle autorità reali afghane.',
    s7: 'Autunno 1940: Transito regolare di merci e cereali attraverso il valico di Shibar per il rifornimento della capitale Kabul prima della chiusura invernale dei passi.',
    s8: 'Aprile 1941: Oasi di pace e patrimonio millenario protetto dalla neutralità del Regno afghano. La pacifica convivenza tra l\'amministrazione statale e le comunità Hazara di Bamyan conferma la stabilità interna voluta da Re Zahir Shah.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_GHA: {
    id: 'AF_GHA',
    iso: 'AF-GHA',
    cntrCode: 'AFG',
    name: 'Ghazni',
    modernName: 'Wilayat-e Ghazni (Provincia di Ghazni)',
    historicalName: 'Hukumat-e Ghazni (Ghazna — Minareti Ghaznavidi & Carovaniera Kabul-Kandahar)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e A\'la-ye Ghazni',
    capital: 'Ghazni',
    region: 'Altopiano Orientale / Asse Kabul-Kandahar',
    historicalToponym: 'Ghazni / Minareti di Mahmud e Mas\'ud / Jaghato / Qarabagh / Nawa / Deh Yak',
    s0_1: '1936-1937: Storica capitale dell\'Impero Ghaznavide (X-XII secolo), celebre per i monumentali minareti poligonali in mattoni cotti del Sultano Mahmud e Mas\'ud III e la tomba di Mahmud di Ghazni. Posta a 2.200 metri sull\'altopiano orientale, Ghazni è il caposaldo militare e logistico a metà strada lungo la grande rotta carrozzabile tra Kabul e Kandahar. Punto di incontro tra popolazioni Pashtun Ghilzai e comunità Hazara.',
    s2_4: '1938 - Marzo 1939: Sviluppo urbano e restauro delle cinte murarie storiche. Nodo per il commercio di lana, pelli e mandorle. Le caserme di Ghazni presidiano la via di comunicazione vitale che collega il nord e il sud del regno, impedendo blocchi stradali da parte delle tribù nomadi Ghilzai.',
    s5: 'Settembre 1939: Neutralità afghana. Rafforzamento dei posti di blocco gendarmeria lungo la direttrice strategica Kabul-Ghazni-Kandahar per garantire la sicurezza del traffico mercantile civile e statale.',
    s6: 'Giugno - Agosto 1940: Vigilanza interna: le autorità provinciali di Ghazni sorvegliano i movimenti dei nomadi Powindah che annualmente migrano tra gli altopiani afghani e le pianure dell\'Indo, assicurando il rispetto delle leggi di neutralità.',
    s7: 'Autunno 1940: Transito di convogli di cereali e scorte invernali diretti a Kabul. La popolazione partecipa alla mobilitazione economica neutrale promossa dal Primo Ministro Hashim Khan.',
    s8: 'Aprile 1941: Cerniera logistica inalterata e sicura. Ghazni assicura la perfetta continuità territoriale ed economica tra la corte di Kabul e il governatorato generale di Kandahar.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_HEL: {
    id: 'AF_HEL',
    iso: 'AF-HEL',
    cntrCode: 'AFG',
    name: 'Hilmand',
    modernName: 'Wilayat-e Helmand (Provincia di Helmand)',
    historicalName: 'Helmand / Bost (Lashkar Gah / Girishk — Bacino Fluviale del Sacro Helmand)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Girishk (Valle dell\'Helmand)',
    capital: 'Lashkar Gah (Girishk)',
    region: 'Valle dell\'Helmand / Afghanistan Sud-Occidentale',
    historicalToponym: 'Girishk / Bost (Qala-e Bost) / Lashkar Gah / Sangin / Marjah / Musa Qala',
    s0_1: '1936-1937: Vasta provincia attraversata dal fiume Helmand (Hermand), il più lungo e sacro corso d\'acqua dell\'Afghanistan, citato nell\'Avesta zoroastriana (Haetumant). Il capoluogo storico è l\'antica fortezza di Girishk, a guardia dell\'unico ponte di barche e guado sulla direttrice carovaniera Kandahar-Herat. Poco a sud sorgono le grandiose rovine di Bost (Qala-e Bost) con il celebre arco monumentale dell\'era ghaznavide.',
    s2_4: '1938 - Marzo 1939: Avvio dei primi rilievi idrologici e agronomici da parte di ingegneri statali per la canalizzazione delle acque del fiume Helmand, con l\'obiettivo di bonificare le terre aride e creare insediamenti agricoli stabili per le tribù nomadi.',
    s5: 'Settembre 1939: Neutralità nel conflitto europeo. Presidio gendarmeria al ponte strategico di Girishk, punto nevralgico obbligato per tutti i collegamenti stradali tra l\'Afghanistan occidentale (Herat) e meridionale (Kandahar).',
    s6: 'Giugno - Agosto 1940: Mantenimento della sicurezza lungo il deserto del Dasht-e Margo e la valle fluviale; la produzione di grano, cotone e frutta secca rifornisce regolarmente i mercati di Kandahar.',
    s7: 'Autunno 1940: Cooperazione tecnica per la manutenzione delle dighe tradizionali in terra e fascine lungo l\'Helmand; la provincia contribuisce all\'autosufficienza granaria del regno.',
    s8: 'Aprile 1941: Arteria idrica e strategica vitale. La valle dell\'Helmand rimane un\'oasi di pace e produttività protetta dalla politica di rigorosa neutralità di Re Zahir Shah.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_NIM: {
    id: 'AF_NIM',
    iso: 'AF-NIM',
    cntrCode: 'AFG',
    name: 'Nimroz',
    modernName: 'Wilayat-e Nimroz (Provincia di Nimroz)',
    historicalName: 'Chakhansur / Nimruz (Zaranj — Sistan Afghano & Bacino dell\'Hamun)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Chakhansur (Zaranj)',
    capital: 'Zaranj',
    region: 'Sistan Afghano / Bacino Terminale dell\'Helmand',
    historicalToponym: 'Chakhansur / Zaranj / Chahar Burjak / Hamun-e Helmand / Kang',
    s0_1: '1936-1937: Regione desertica e palustre dell\'estremo sud-ovest afghano, corrispondente allo storico Sistan (la leggendaria patria di Rostam nello Shahnameh persiano). Il centro amministrativo d\'epoca è la cittadella di Chakhansur, mentre Zaranj funge da avamposto doganale al confine con l\'Iran. Qui il fiume Helmand sfocia nella complessa laguna endoreica dell\'Hamun-e Helmand, soggetta al celebre e impetuoso \'Vento dei 120 giorni\' (Bad-e Sad-o-Bist Roz).',
    s2_4: '1938 - Marzo 1939: Gestione delle storiche dispute idriche per la spartizione delle acque dell\'Helmand con l\'Iran, condotte pacificamente in base agli accordi di frontiera e alla commissione arbitrale MacMahon. Presidi di frontiera a Chahar Burjak al confine triplo con Iran e Baluchistan britannico.',
    s5: 'Settembre 1939: Neutralità afghana. Monitoraggio serrato della frontiera nel deserto del Sistan; la gendarmeria afghana impedisce il contrabbando di armi e carburanti lungo i sentieri dell\'Hamun.',
    s6: 'Giugno - Agosto 1940: Difesa dell\'isolamento geostrategico: la rotta del Sistan verso l\'Iran e il golfo di Makran rimane aperta esclusivamente per il transito commerciale civile e postale.',
    s7: 'Autunno 1940: Pesca e pastorizia tradizionale nelle cannucciaie dell\'Hamun; rapporti pacifici e cooperativi con i posti di blocco della gendarmeria imperiale iraniana.',
    s8: 'Aprile 1941: Avamposto sud-occidentale incontaminato. Nimroz e il Sistan afghano preservano la piena tranquillità e integrità territoriale sotto la corona di Kabul.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_FRA: {
    id: 'AF_FRA',
    iso: 'AF-FRA',
    cntrCode: 'AFG',
    name: 'Farah',
    modernName: 'Wilayat-e Farah (Provincia di Farah)',
    historicalName: 'Hukumat-e Farah (Farah / Shindand — Antica Prophthasia & Valle del Farah Rud)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e A\'la-ye Farah',
    capital: 'Farah',
    region: 'Afghanistan Sud-Occidentale / Asse Herat-Kandahar',
    historicalToponym: 'Farah / Qala-e Farah / Shindand / Anar Dara / Khaki Safed / Bala Buluk',
    s0_1: '1936-1937: Vasta provincia occidentale bagnata dal fiume Farah Rud, dominata dalla ciclopica cittadella in mattoni crudi di Farah (Qala-e Farah), identificata con l\'antica Prophthasia ellenistica conquistata da Alessandro Magno. Snodo carovaniero intermedio tra Kandahar, Herat e la frontiera persiana.',
    s2_4: '1938 - Marzo 1939: Coltivazione di rinomati frutteti (melograni di Anar Dara), cereali e datteri. La cittadina settentrionale di Shindand (Sabzawar) è sede di un importante mercato di bestiame e lana delle tribù Pashtun e nomadi Baloch.',
    s5: 'Settembre 1939: Neutralità nel conflitto europeo. Vigilanza sui posti doganali lungo il confine con l\'Iran; le autorità provinciali di Farah assicurano il transito fluido dei viaggiatori e delle carovane commerciali autorizzate.',
    s6: 'Giugno - Agosto 1940: Sorveglianza delle piste desertiche verso il Sistan; rifornimento regolare delle guarnigioni dell\'esercito reale lungo la direttrice Herat-Kandahar.',
    s7: 'Autunno 1940: Manutenzione delle reti di canali sotterranei tradizionali (karez/qanat) per garantire la produzione agricola locale e la stabilità delle forniture alimentari.',
    s8: 'Aprile 1941: Stabilità e sicurezza consolidate. Farah conferma la propria fedeltà alle direttive di neutralità di Re Zahir Shah, mantenendo intatte le vie di comunicazione del regno.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_BDG: {
    id: 'AF_BDG',
    iso: 'AF-BDG',
    cntrCode: 'AFG',
    name: 'Badghis',
    modernName: 'Wilayat-e Badghis (Provincia di Badghis)',
    historicalName: 'Badghis (Qala-e Naw / Murghab — Boschi di Pistacchio & Frontiera Turkmena)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Badghis (Qala-e Naw)',
    capital: 'Qala-e Naw',
    region: 'Afghanistan Nord-Occidentale / Fiume Murghab',
    historicalToponym: 'Qala-e Naw / Bala Murghab / Kushk-e Kohna / Ghormach / Jawand / Ab Kamari',
    s0_1: '1936-1937: Regione collinare settentrionale compresa tra i bacini dell\'Hari Rud e del Murghab, con capoluogo a Qala-e Naw. Famosa per le vaste foreste naturali di pistacchio selvatico (Pistacia vera) e i ricchi pascoli montani per pecore karakul. Confinante a nord con la RSS Turkmena dell\'URSS lungo la linea di demarcazione del 1885 (fissata dopo il celebre incidente di Panjdeh).',
    s2_4: '1938 - Marzo 1939: Raccolta e commercializzazione dei pistacchi, monopolio statale esportato in India e Medio Oriente. Presidi militari a Bala Murghab e Kushk per sorvegliare la ferrovia militare sovietica che raggiunge la postazione di confine di Kushka.',
    s5: 'Settembre 1939: Neutralità proclamata. Rafforzamento dei posti d\'osservazione frontalieri lungo il Murghab; le guardie di frontiera afghane mantengono la rigorosa consegna di evitare ogni attrito con le truppe sovietiche.',
    s6: 'Giugno - Agosto 1940: Tranquillità lungo la frontiera: la firma del patto di non aggressione tra Mosca e Berlino mantiene stabile il settore di confine. Badghis garantisce il costante rifornimento di carne e lana per la città di Herat.',
    s7: 'Autunno 1940: Disciplina e controllo del territorio: le autorità di Qala-e Naw impediscono il pascolo abusivo oltre frontiera e confermano il totale rispetto del confine di stato.',
    s8: 'Aprile 1941: Territorio di confine pacifico e sicuro. Badghis preserva la propria integrità territoriale sotto la solida politica di neutralità della monarchia afghana.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_FYB: {
    id: 'AF_FYB',
    iso: 'AF-FYB',
    cntrCode: 'AFG',
    name: 'Faryab',
    modernName: 'Wilayat-e Faryab (Provincia di Faryab)',
    historicalName: 'Hukumat-e Maymana (Maymana / Faryab — Karakul & Cavalli Turcomanni)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e A\'la-ye Maymana',
    capital: 'Maymana',
    region: 'Turkestan Occidentale',
    historicalToponym: 'Maymana / Andkhoy / Almar / Pashtun Kot / Bilchiragh / Qaramqol',
    s0_1: '1936-1937: Storico khanato uzbeko di Maymana, annesso all\'Afghanistan alla fine del XIX secolo e retto come governatorato di secondo rango (Hukumat-e A\'la-ye Maymana). Centro primario per la produzione di pelli di agnello karakul nero e grigio, tappeti turcomanni (Bukhara/Mauri) e l\'allevamento dei celebri cavalli turcomanni. Popolato prevalentemente da uzbeki, turkmeni, tagiki e pashtun.',
    s2_4: '1938 - Marzo 1939: Fiorente mercato carovaniero a Maymana e Andkhoy; esportazione delle pelli karakul verso Londra e New York via Karachi, principale fonte di valuta estera forte (dollari e sterline) per il bilancio dello Stato afghano.',
    s5: 'Settembre 1939: Neutralità nel conflitto europeo. Riorganizzazione dei trasporti della lana e delle pelli per via carovaniera protetta; presidio delle piste montane verso l\'Amu Darya.',
    s6: 'Giugno - Agosto 1940: Ricadute del blocco navale e marittimo: la vendita delle pelli karakul afghane trova nuovi sbocchi verso gli Stati Uniti attraverso i porti indiani. Calma perfetta lungo la frontiera sovietica.',
    s7: 'Autunno 1940: Tutela della sicurezza rurale e pastorale: il governatore reale di Maymana assicura l\'ordine tra le tribù e la regolarità della riscossione fiscale per la corona.',
    s8: 'Aprile 1941: Roccaforte dell\'economia agro-pastorale afghana. Faryab e Maymana confermano la stabilità delle province del Turkestan sotto la guida sovrana di Re Zahir Shah.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_JOW: {
    id: 'AF_JOW',
    iso: 'AF-JOW',
    cntrCode: 'AFG',
    name: 'Jawzjan',
    modernName: 'Wilayat-e Jawzjan (Provincia di Jawzjan)',
    historicalName: 'Jawzjan (Sheberghan / Andkhoy — Oasi dei Tappeti Turcomanni & Amu Darya)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Sheberghan (Turkestan)',
    capital: 'Sheberghan',
    region: 'Turkestan Occidentale / Pianure dell\'Oxus',
    historicalToponym: 'Sheberghan / Andkhoy / Aqcha / Qarqin / Khamyab / Mingajik',
    s0_1: '1936-1937: Distretto pianeggiante del Turkestan afghano settentrionale con capoluogo a Sheberghan e polo commerciale ad Andkhoy. Terra di millenarie oasi irrigate dal fiume Shirin Tagab, rinomata in tutto l\'Oriente per la tessitura artigianale dei tappeti turcomanni Aqcha e la concia delle pelli. A nord raggiunge le sponde dell\'Amu Darya a Qarqin e Khamyab.',
    s2_4: '1938 - Marzo 1939: Prime prospezioni minerarie da parte di geologi statali e stranieri che confermano la presenza di ricchi giacimenti sotterranei di idrocarburi (gas naturale e petrolio) nell\'area di Sheberghan. Controllo dei commerci di confine con la RSS Turkmena.',
    s5: 'Settembre 1939: Neutralità afghana. Pattugliamento gendarmeria lungo le sponde sabbiose dell\'Amu Darya a Khamyab; vigilanza sui varchi doganali carovanieri.',
    s6: 'Giugno - Agosto 1940: Mantenimento della piena attività artigianale dei tappeti e del commercio granario; la provincia contribuisce alle scorte alimentari strategiche del Turkestan.',
    s7: 'Autunno 1940: Scambi pacifici e regolari di prodotti agricoli con i villaggi di frontiera sovietici sotto stretta sorveglianza doganale afghana.',
    s8: 'Aprile 1941: Territorio prospero e pacifico. Jawzjan e Sheberghan mantengono inalterata la propria operosità economica all\'interno del regno neutrale di Zahir Shah.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_SAR: {
    id: 'AF_SAR',
    iso: 'AF-SAR',
    cntrCode: 'AFG',
    name: 'Sari Pul',
    modernName: 'Wilayat-e Sar-e Pol (Provincia di Sar-i Pul)',
    historicalName: 'Sar-i Pul (Sar-e Pol — Valli di Transizione del Koh-i Baba & Risorse di Catrame)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Sar-i Pul',
    capital: 'Sar-e Pol',
    region: 'Turkestan Meridionale / Transizione Koh-i Baba',
    historicalToponym: 'Sar-e Pol / Sangcharak / Kohistanat / Balkhab / Sayyad / Sozma Qala',
    s0_1: '1936-1937: Vallata montana di transizione tra le pendici settentrionali della catena del Koh-i Baba e le pianure del Turkestan, con capoluogo a Sar-e Pol (\'Capo del Ponte\'). Abitata da popolazioni uzbeke, hazara e tagike, è rinomata per l\'allevamento ovino, i rigogliosi pascoli alpini e le storiche sorgenti superficiali di bitume e catrame minerale.',
    s2_4: '1938 - Marzo 1939: Amministrazione basata su governatori distrettuali inviati da Kabul; la vallata di Balkhab costituisce una cerniera naturale di transito verso l\'Hazarajat centrale e Bamyan.',
    s5: 'Settembre 1939: Neutralità nel conflitto europeo. Le autorità di Sar-e Pol vigilano sulle vie di transumanza e garantiscono l\'ordine nelle comunità pastorali.',
    s6: 'Giugno - Agosto 1940: Continuità produttiva agricola e zootecnica; rifornimento di lana e pelli per i mercati tessili di Mazar-i-Sharif.',
    s7: 'Autunno 1940: Stabilità sociale e pacifica convivenza interetnica tra le comunità uzbeke e hazara della provincia.',
    s8: 'Aprile 1941: Roccaforte rurale protetta. Sar-e Pol contribuisce alla quiete e alla stabilità del fronte interno afghano voluto dal Primo Ministro Hashim Khan.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_SAM: {
    id: 'AF_SAM',
    iso: 'AF-SAM',
    cntrCode: 'AFG',
    name: 'Samangan',
    modernName: 'Wilayat-e Samangan (Provincia di Samangan)',
    historicalName: 'Samangan / Aibak (Stupa Rupestre di Takht-e Rostam & Gola di Tashqurghan)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Aibak (Samangan)',
    capital: 'Aibak',
    region: 'Turkestan / Asse Salang-Mazar',
    historicalToponym: 'Aibak / Takht-e Rostam / Khuram wa Sarbagh / Dare-ye Suf / Tashqurghan / Ruyi Du Ab',
    s0_1: '1936-1937: Distretto montuoso a cavallo della principale arteria di comunicazione tra Kabul e Mazar-i-Sharif, con capoluogo ad Aibak (Samangan). Celebre per lo straordinario complesso rupestre buddista di **Takht-e Rostam** (il \'Trono di Rostam\'), uno stupa scavato interamente nella roccia viva risalente al IV-V secolo d.C. A nord controlla le famose gole e oasi di Tashqurghan (Khulm).',
    s2_4: '1938 - Marzo 1939: Snodo cruciale per il transito delle merci: carovane e i primi autocarri commerciali valicano le gole montane trasportando merci industriali verso il nord e karakul verso la capitale. Attive miniere di carbone a cielo aperto nella valle di Dare-ye Suf.',
    s5: 'Settembre 1939: Neutralità afghana. Presidio della gendarmeria reale lungo i passi rocciosi di Aibak e Tashqurghan per garantire la sicurezza del traffico stradale statale.',
    s6: 'Giugno - Agosto 1940: Incremento dell\'estrazione di carbone a Dare-ye Suf per alimentare le nascenti officine e fabbriche tessili statali di Kabul e Baghlan.',
    s7: 'Autunno 1940: Lavori di manutenzione della rotta carrozzabile prima dell\'inverno; transito regolare dei rifornimenti governativi.',
    s8: 'Aprile 1941: Corridoio strategico intatto. Samangan assicura il transito ininterrotto tra le due metà del regno, confermando la piena solidità amministrativa afghana.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_BGL: {
    id: 'AF_BGL',
    iso: 'AF-BGL',
    cntrCode: 'AFG',
    name: 'Baghlan',
    modernName: 'Wilayat-e Baghlan (Provincia di Baghlan)',
    historicalName: 'Baghlan / Pol-e Khomri (Valle del Kunduz — Zuccherifici & Centrali Idroelettriche Tedesche)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Baghlan (Pol-e Khomri)',
    capital: 'Pol-e Khomri',
    region: 'Qataghan Meridionale / Valle del Kunduz',
    historicalToponym: 'Pol-e Khomri / Baghlan / Dushi / Khost wa Fereng / Andarab / Dahana-i-Ghori',
    s0_1: '1936-1937: Polo industriale nascente dell\'Afghanistan interbellico nella valle del fiume Kunduz, con centri principali a Baghlan e Pol-e Khomri. Grazie alla cooperazione con la Germania di Weimar e del Terzo Reich, la ditta Siemens e ingegneri tedeschi avviano la costruzione della grande centrale idroelettrica e del modernissimo zuccherificio di Pol-e Khomri per la lavorazione della barbabietola da zucchero.',
    s2_4: '1938 - Marzo 1939: Entrano in funzione i macchinari idroelettrici e lo stabilimento tessile di Pol-e Khomri; la provincia diventa il cuore dell\'energia e dell\'industria manifatturiera moderna del paese, visitata con orgoglio dai ministri di Kabul.',
    s5: 'Settembre 1939: Neutralità nel conflitto europeo. Gli ingegneri e tecnici tedeschi operanti a Pol-e Khomri e Baghlan rimangono sul posto sotto stretta tutela e sorveglianza del governo afghano, che garantisce la continuità della produzione industriale.',
    s6: 'Giugno - Agosto 1940: Pressione britannica per l\'allontanamento dei tecnici dell\'Asse. Il Primo Ministro Hashim Khan rifiuta fermamente, dichiarando che i tecnici sono indispensabili per l\'economia neutrale dell\'Afghanistan e non svolgono compiti militari.',
    s7: 'Autunno 1940: Produzione record di zucchero raffinato e tessuti di cotone a Pol-e Khomri, che consente all\'Afghanistan di ridurre drasticamente la dipendenza da importazioni estere.',
    s8: 'Aprile 1941: Fabbrica della modernizzazione afghana. La centrale e gli impianti di Baghlan e Pol-e Khomri lavorano a pieno regime a beneficio esclusivo dello Stato afghano, simbolo di operosità e indipendenza sovrana.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_TAK: {
    id: 'AF_TAK',
    iso: 'AF-TAK',
    cntrCode: 'AFG',
    name: 'Takhar',
    modernName: 'Wilayat-e Takhar (Provincia di Takhar)',
    historicalName: 'Takhar / Taloqan (Qataghan Orientale — Saline & Agricoltura Irrigua)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Taloqan (Qataghan)',
    capital: 'Taloqan',
    region: 'Qataghan Orientale / Fiume Khanabad',
    historicalToponym: 'Taloqan / Farkhar / Kishim / Rustaq / Chah Ab / Kalafgan',
    s0_1: '1936-1937: Distretto orientale della provincia di Qataghan solcato dai fiumi Khanabad e Farkhar, con capoluogo a Taloqan. Centro agricolo fiorente rinomato per le risaie, i frutteti e l\'allevamento di cavalli da corsa qataghani. A Kalafgan e Farkhar operano storiche miniere di salgemma che riforniscono di sale l\'intero Afghanistan settentrionale.',
    s2_4: '1938 - Marzo 1939: Espansione della coltivazione del cotone collegata agli impianti della Spinzar di Kunduz; ponte naturale e carovaniero tra la pianura di Kunduz e le gole del Badakhshan.',
    s5: 'Settembre 1939: Neutralità afghana. Presidio della gendarmeria lungo le piste montane verso Rustaq e il confine fluviale del Panj con l\'URSS.',
    s6: 'Giugno - Agosto 1940: Tranquillità rurale e sicurezza carovaniera; rifornimento di sale e grano per le guarnigioni del nord-est afghano.',
    s7: 'Autunno 1940: Regolarità dei commerci locali e stabilità delle relazioni con i villaggi tagiki e uzbeki d\'oltre frontiera.',
    s8: 'Aprile 1941: Oasi agricola produttiva e serena. Takhar garantisce risorse alimentari preziose per la stabilità interna del Regno afghano.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_GHO: {
    id: 'AF_GHO',
    iso: 'AF-GHO',
    cntrCode: 'AFG',
    name: 'Ghor',
    modernName: 'Wilayat-e Ghor (Provincia di Ghor)',
    historicalName: 'Ghor (Chaghcharan / Firozkoh — Culla dei Re Ghuridi & Minareto di Jam)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Ghor (Chaghcharan)',
    capital: 'Chaghcharan (Firozkoh)',
    region: 'Altopiano Centrale Montuoso / Fiume Hari Rud',
    historicalToponym: 'Chaghcharan / Minareto di Jam / Firozkoh / Lal wa Sarjangal / Shahrak / Pasaband',
    s0_1: '1936-1937: Altopiano montuoso isolato nel cuore geografico dell\'Afghanistan, attraversato dal corso superiore dell\'Hari Rud. Culla storica della potente dinastia medievale Ghuride (XII-XIII secolo), che da Firozkoh (\'Montagna della Vittoria\') conquistò Delhi e l\'India settentrionale. Nella remota e spettacolare gola dell\'Hari Rud svetta l\'incomparabile **Minareto di Jam**, capolavoro in laterizio policromo e stucco alto 65 metri.',
    s2_4: '1938 - Marzo 1939: Territorio prevalentemente pastorale e fiero, abitato da popolazioni Aimaq e Hazara. L\'amministrazione di Chaghcharan opera con prudenza, rispettando le consuetudini tribali e garantendo la pacifica convivenza.',
    s5: 'Settembre 1939: Neutralità nel conflitto europeo. Completo isolamento naturale dalle vicende belliche mondiali; vita rurale scandita dalle stagioni e dalla transumanza delle greggi.',
    s6: 'Giugno - Agosto 1940: Conservazione intatta dell\'ordine tradizionale; i passi montani verso Herat e Bamyan rimangono aperti e sorvegliati.',
    s7: 'Autunno 1940: Raccolta delle scorte di cereali e foraggio prima dell\'inizio delle rigidissime nevicate invernali nell\'altopiano di Ghor.',
    s8: 'Aprile 1941: Roccaforte naturale inespugnabile. Ghor rappresenta il cuore pacifico e protetto dell\'Afghanistan sovrano di Re Zahir Shah.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_DAY: {
    id: 'AF_DAY',
    iso: 'AF-DAY',
    cntrCode: 'AFG',
    name: 'Daykundi',
    modernName: 'Wilayat-e Daykundi (Provincia di Daykundi)',
    historicalName: 'Daykundi (Nili — Cuore Impervio dell\'Hazarajat Centrale & Valle dell\'Helmand Superiore)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Daykundi (Nili)',
    capital: 'Nili',
    region: 'Hazarajat Centrale / Helmand Superiore',
    historicalToponym: 'Nili / Shahristan / Gizab / Miramor / Sang-e Takht / Ashtarlay',
    s0_1: '1936-1937: Cuore montuoso e impervio dell\'Hazarajat centrale, compreso tra le gole profonde dell\'alto corso dell\'Helmand e i crinali del Koh-i Baba. Abitato dalle tribù Hazara (Daizangi, Daikundi), che praticano un\'agricoltura eroica a terrazze e la pastorizia d\'alta quota. L\'amministrazione reale di Nili persegue una politica di graduale integrazione civile e pacificazione dopo le traumatiche campagne di fine Ottocento.',
    s2_4: '1938 - Marzo 1939: Mantenimento della stabilità interna attraverso capi tribali (mir e arbab) locali; la regione produce lana, tessuti tradizionali in feltro (barak) e frutta secca commerciata a Ghazni e Kabul.',
    s5: 'Settembre 1939: Neutralità afghana. La totale distanza dai confini internazionali preserva la regione da qualsiasi riflesso delle tensioni di guerra europee o asiatiche.',
    s6: 'Giugno - Agosto 1940: Vita montana ordinata e pacifica; fedeltà della popolazione Hazara alla corona di Zahir Shah in cambio di equità fiscale e rispetto religioso.',
    s7: 'Autunno 1940: Rifornimento delle vallate isolate e accumulo di provviste per i lunghi mesi di isolamento per neve.',
    s8: 'Aprile 1941: Territorio sereno e integrato. Daykundi e l\'Hazarajat centrale confermano la saldezza dell\'unità nazionale afghana nel quadro della neutralità monarchica.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_URU: {
    id: 'AF_URU',
    iso: 'AF-URU',
    cntrCode: 'AFG',
    name: 'Uruzgan',
    modernName: 'Wilayat-e Uruzgan (Provincia di Uruzgan)',
    historicalName: 'Uruzgan (Tarin Kowt — Altopiano Montuoso tra Hazara e Pashtun)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Uruzgan (Tarin Kowt)',
    capital: 'Tarin Kowt',
    region: 'Transizione Centro-Meridionale / Valli del Tirin',
    historicalToponym: 'Tarin Kowt / Chora / Deh Rahwod / Khas Uruzgan / Gizab',
    s0_1: '1936-1937: Aspera provincia montuosa situata a cerniera tra l\'Hazarajat centrale e le pianure pashtun meridionali di Kandahar, con capoluogo a Tarin Kowt nella valle del fiume Tirin. Popolata da confederazioni Pashtun Durrani e Ghilzai accanto a comunità Hazara. Presidi militari a guardia delle carovaniere che discendono dai monti verso l\'Helmand.',
    s2_4: '1938 - Marzo 1939: Interventi dell\'amministrazione statale per regolare i diritti di pascolo estivo e prevenire contese territoriali tra nomadi e contadini stanziali.',
    s5: 'Settembre 1939: Neutralità nel conflitto europeo. Il governatore distrettuale di Tarin Kowt assicura il mantenimento della calma e della disciplina in tutta la vallata.',
    s6: 'Giugno - Agosto 1940: Produzione regolare di grano, orzo e mandorle avviata ai mercati di Kandahar; pieno rispetto delle leggi di sicurezza reale.',
    s7: 'Autunno 1940: Controllo delle comunicazioni stradali montane prima delle precipitazioni invernali.',
    s8: 'Aprile 1941: Tranquillità e sicurezza preservate. Uruzgan rimane un pilastro stabile e tranquillo nel cuore geografico del Regno afghano.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_ZAB: {
    id: 'AF_ZAB',
    iso: 'AF-ZAB',
    cntrCode: 'AFG',
    name: 'Zabul',
    modernName: 'Wilayat-e Zabul (Provincia di Zabul)',
    historicalName: 'Zabul (Qalat-i-Ghilzai — Fortezza sul Tarnak & Bastione Ghilzai)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Qalat (Zabul)',
    capital: 'Qalat',
    region: 'Bacino del Tarnak / Corridoio Sud-Est',
    historicalToponym: 'Qalat-i-Ghilzai / Tarnak / Shah Joy / Shinkay / Arghandab / Daychopan',
    s0_1: '1936-1937: Provincia strategica lungo la valle del fiume Tarnak, dominata dalla vertiginosa rocca fortificata di Qalat-i-Ghilzai (storica fortezza naturale che domina l\'altopiano). Roccaforte primaria delle tribù Pashtun Ghilzai (Tokhi, Hotak), da cui discese Mirwais Hotak, liberatore di Kandahar all\'inizio del XVIII secolo. Snodo obbligato della carovaniera tra Ghazni e Kandahar.',
    s2_4: '1938 - Marzo 1939: Presidio militare permanente a Qalat a guardia della strada statale. La valle del Tarnak produce grano di alta qualità, uva e foraggio, fungendo da corridoio logistico primario per le forze armate del regno.',
    s5: 'Settembre 1939: Neutralità afghana. Pattuglie di cavalleria e gendarmeria vigilano sul transito regolare dei convogli lungo l\'asse stradale sud-orientale.',
    s6: 'Giugno - Agosto 1940: Pieno controllo statale sui valichi montani verso la frontiera baluca del Raj Britannico; rispetto unanime della proclamazione neutrale del re.',
    s7: 'Autunno 1940: Sicurezza assoluta dei trasporti mercantili e passeggeri tra la capitale Kabul e Kandahar.',
    s8: 'Aprile 1941: Bastione inespugnabile del sud. Qalat e la valle di Zabul confermano la fedeltà incrollabile alla sovranità di Zahir Shah e Hashim Khan.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_PIA: {
    id: 'AF_PIA',
    iso: 'AF-PIA',
    cntrCode: 'AFG',
    name: 'Paktika',
    modernName: 'Wilayat-e Paktika (Provincia di Paktika)',
    historicalName: 'Katawaz / Urgun (Paktika — Altopiano dei Sulaimankhel & Corridoio Powindah)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Katawaz (Urgun / Sharan)',
    capital: 'Sharan (Urgun)',
    region: 'Altopiani Sud-Orientali / Fiume Gomal',
    historicalToponym: 'Urgun / Sharan / Katawaz / Barmal / Gomal / Zarghun Shahr / Gayan',
    s0_1: '1936-1937: Vasto altopiano sud-orientale storicamente noto come Katawaz e Urgun, popolato dalle grandi confederazioni Pashtun nomadi e seminomadi Sulaimankhel, Kharoti e Zadran. Attraversato dal bacino del fiume Gomal, costituisce da millenni la rotta migratoria principale dei commercianti nomadi Powindah diretti nelle pianure dell\'Indo durante l\'inverno.',
    s2_4: '1938 - Marzo 1939: Amministrazione basata su forti presidi militari a Urgun e Barmal a ridosso della Durand Line con il Sud Waziristan britannico (Wana). Vigilanza sulle carovane nomadi armate per prevenire scontri con i posti di frontiera coloniali.',
    s5: 'Settembre 1939: Neutralità nel conflitto europeo. Le autorità di Katawaz impongono una rigida regolamentazione ai nomadi Powindah in transito per l\'India, vietando il trasporto di armi pesanti e munizioni.',
    s6: 'Giugno - Agosto 1940: Pressione britannica lungo il fiume Gomal; la gendarmeria afghana garantisce che nessun gruppo ribelle del Waziristan utilizzi l\'altopiano di Katawaz come base d\'attacco.',
    s7: 'Autunno 1940: Migrazione stagionale ordinata delle tribù Sulaimankhel verso l\'Indo sotto il controllo dei visti e dei salvacondotti afghani.',
    s8: 'Aprile 1941: Frontiera meridionale presidiata con successo. Paktika mantiene la calma e tutela la neutralità del regno senza incidenti diplomatici.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_KNR: {
    id: 'AF_KNR',
    iso: 'AF-KNR',
    cntrCode: 'AFG',
    name: 'Kunar',
    modernName: 'Wilayat-e Kunar (Provincia di Kunar)',
    historicalName: 'Kunar (Asadabad / Chigha Sarai — Valle del Kunar & Confine con Bajaur)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Kunar (Asadabad)',
    capital: 'Asadabad',
    region: 'Mashriqi / Fiume Kunar / Confine Nord-Orientale',
    historicalToponym: 'Asadabad / Chigha Sarai / Bar Kunar / Nari / Dangam / Marawara / Khas Kunar',
    s0_1: '1936-1937: Stretta e scoscesa vallata fluviale incisa dal maestoso fiume Kunar (Chitral), con capoluogo ad Asadabad (storicamente Chigha Sarai). Confinante a est con le agenzie tribali britanniche di Bajaur e Chitral lungo la Durand Line. Ricca di foreste di cedro deodara e pini, la cui legna pregiata viene fluitata sui tronchi lungo il fiume fino a Jalalabad.',
    s2_4: '1938 - Marzo 1939: Presidio militare e doganale di frontiera a Nari e Asadabad. La valle del Kunar è una rotta storica di pellegrinaggio e transito tra l\'Afghanistan e le valli del Kohistan di Swat; monitoraggio costante contro il contrabbando di armi.',
    s5: 'Settembre 1939: Neutralità afghana. Pattugliamento serrato dei sentieri di montagna verso Bajaur; divieto assoluto per i guerrieri tribali di interferire nelle operazioni britanniche oltre confine.',
    s6: 'Giugno - Agosto 1940: Rigorosa sorveglianza militare delle gole alpine; la popolazione valligiana assicura la piena cooperazione con le autorità reali di Jalalabad.',
    s7: 'Autunno 1940: Fluitazione regolare del legname verso i cantieri edili statali di Kabul e Jalalabad.',
    s8: 'Aprile 1941: Confine nord-orientale saldo e tranquillo. Kunar tutela l\'integrità territoriale e la sovranità afghana in piena conformità alle leggi di neutralità.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_LAG: {
    id: 'AF_LAG',
    iso: 'AF-LAG',
    cntrCode: 'AFG',
    name: 'Laghman',
    modernName: 'Wilayat-e Laghman (Provincia di Laghman)',
    historicalName: 'Laghman (Mihtarlam — Oasi Fluviale di Alingar e Alishing)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Laghman (Mihtarlam)',
    capital: 'Mihtarlam',
    region: 'Mashriqi Settentrionale / Valli dell\'Alingar e Alishing',
    historicalToponym: 'Mihtarlam / Alingar / Alishing / Qarghayi / Mandrawar / Dawlat Shah',
    s0_1: '1936-1937: Fertile e ridente conca valliva situata a nord del fiume Kabul lungo i corsi congiunti dell\'Alingar e dell\'Alishing, con capoluogo a Mihtarlam (sede del venerato santuario di Mihtarlam Baba, associato a Lamech). Rinomata per la straordinaria ricchezza agricola (frutteti, melograni, riso e canna da zucchero), funge da cerniera tra la pianura di Jalalabad e le montagne del Nuristan.',
    s2_4: '1938 - Marzo 1939: Popolata da pashtun, tagiki e pashai, Laghman gode di grande stabilità civile e floridezza commerciale. Costruzione di canali di irrigazione migliorati promossi dal Ministero dell\'Agricoltura di Kabul.',
    s5: 'Settembre 1939: Neutralità nel conflitto europeo. Rifornimento regolare di frutta fresca e riso per i mercati della capitale Kabul.',
    s6: 'Giugno - Agosto 1940: Manutenzione delle strade di accesso vallive; vigilanza ordinata da parte della gendarmeria locale.',
    s7: 'Autunno 1940: Raccolta abbondante e accumulo di granaglie per la sicurezza alimentare del regno.',
    s8: 'Aprile 1941: Oasi di serenità produttiva. Laghman partecipa con laboriosità alla pace e stabilità garantite dalla politica neutrale di Re Zahir Shah.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_NUR: {
    id: 'AF_NUR',
    iso: 'AF-NUR',
    cntrCode: 'AFG',
    name: 'Nuristan',
    modernName: 'Wilayat-e Nuristan (Provincia di Nuristan)',
    historicalName: 'Kafiristan / Nuristan (\'Terra della Luce\' — Valli Alpine dell\'Hindu Kush)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Distretto Speciale di Nuristan (Kamdesh / Parun)',
    capital: 'Parun',
    region: 'Hindu Kush Orientale / Valli Isolate',
    historicalToponym: 'Kamdesh / Parun / Wagal / Waygal / Mandol / Kantiwa / Barg-i Matal',
    s0_1: '1936-1937: Territorio montano tra i più remoti e spettacolari al mondo, costituito da profonde gole alpine e fittissime foreste sulle pendici meridionali dell\'Hindu Kush. Storicamente noto come **Kafiristan** (\'Terra degli Infedeli\') e reso immortale dal racconto di Rudyard Kipling, fu convertito all\'Islam alla fine del XIX secolo dall\'Emiro Abdur Rahman Khan e ribattezzato **Nuristan** (\'Terra della Luce\'). Le comunità nuristane (Kati, Vasi, Ashkun, Kalasha) vivono in villaggi arroccati con straordinarie case a terrazza in legno intagliato.',
    s2_4: '1938 - Marzo 1939: Amministrazione indiretta e rispettosa delle antiche usanze consuetudinarie da parte del governo reale di Kabul. Centri principali a Kamdesh e Parun; salvaguardia delle foreste di conifere e delle riserve di caccia montane.',
    s5: 'Settembre 1939: Neutralità afghana. La totale inaccessibilità geografica isola completamente le vallate del Nuristan dagli echi e dalle minacce del secondo conflitto mondiale.',
    s6: 'Giugno - Agosto 1940: Autonomia e pace rurale: gli abitanti proseguono le attività tradizionali di pastorizia caprina e intaglio del legno; armonia con i vicini distretti di Kunar e Badakhshan.',
    s7: 'Autunno 1940: Chiusura stagionale dei passi alpini per neve; autosufficienza alimentare garantita da scorte di noci, formaggi e cereali montani.',
    s8: 'Aprile 1941: Santuario alpino intatto. Il Nuristan testimonia l\'eccezionale mosaico etnico e culturale protetto e preservato dalla sovranità del Regno dell\'Afghanistan.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_PAR: {
    id: 'AF_PAR',
    iso: 'AF-PAR',
    cntrCode: 'AFG',
    name: 'Parwan',
    modernName: 'Wilayat-e Parwan (Provincia di Parwan)',
    historicalName: 'Parwan (Charikar — Valle di Ghorband & Porta del Salang)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Parwan (Charikar)',
    capital: 'Charikar',
    region: 'Valle di Ghorband / Salang / Hindu Kush',
    historicalToponym: 'Charikar / Jabal Saraj / Ghorband / Salang / Shinwari / Bagram',
    s0_1: '1936-1937: Provincia cruciale posta all\'imbocco meridionale dei passi dell\'Hindu Kush, con capoluogo a Charikar nella fertile vallata di Ghorband. A Jabal Saraj opera una delle prime centrali idroelettriche del regno e un\'importante fabbrica tessile statale. A Bagram la missione archeologica francese DAFA di Joseph Hackin compie nel 1937 la sensazionale scoperta del cosiddetto \'Tesoro di Bagram\' (avori indiani, vetri romani e lacche cinesi di epoca Kushan).',
    s2_4: '1938 - Marzo 1939: Nodo di transito essenziale per i convogli tra Kabul e il Turkestan afghano. Progettazione di nuove piste carrozzabili attraverso i contrafforti montani per superare le difficoltà del valico di Salang.',
    s5: 'Settembre 1939: Neutralità nel conflitto europeo. Presidio militare a Charikar e Jabal Saraj per la protezione degli impianti industriali e delle linee telegrafiche per il nord.',
    s6: 'Giugno - Agosto 1940: Manutenzione delle turbine idroelettriche e fornitura costante di energia elettrica alla capitale Kabul; piena sicurezza dei commerci.',
    s7: 'Autunno 1940: Transito delle carovane cariche di carbone da Dare-ye Suf e cotone da Kunduz dirette a Kabul.',
    s8: 'Aprile 1941: Cerniera energetica e logistica vitale. Parwan conferma la solidità dell\'infrastruttura statale voluta dalla monarchia neutrale di Zahir Shah.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_KAP: {
    id: 'AF_KAP',
    iso: 'AF-KAP',
    cntrCode: 'AFG',
    name: 'Kapisa',
    modernName: 'Wilayat-e Kapisa (Provincia di Kapisa)',
    historicalName: 'Kapisa / Kohistan (Mahmud-e Raqi — Valli del Panjshir Inferiore & Tagab)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Kohistan (Mahmud-e Raqi)',
    capital: 'Mahmud-e Raqi',
    region: 'Kohistan / Nord di Kabul',
    historicalToponym: 'Mahmud-e Raqi / Kohistan / Tagab / Nijrab / Alasay / Koh Band',
    s0_1: '1936-1937: Storica e popolosa regione del Kohistan (\'Paese delle Montagne\') a nord di Kabul, solcata dai fiumi Panjshir e Tagab, con capoluogo a Mahmud-e Raqi. Territorio abitato da fieri clan tagiki, culla del ribelle Habibullah Kalakani (\'Bacha-ye Saqao\') che aveva rovesciato Re Amanullah nel 1929. La dinastia Musahiban di Nadir e Zahir Shah mantiene nella zona un monitoraggio politico e militare vigile ma pacifico.',
    s2_4: '1938 - Marzo 1939: Integrazione economica e riconciliazione: la valle di Tagab produce rinomati melograni, uva e mandorle avviati ai mercati di Kabul. Graduale arruolamento di giovani kohistani nell\'esercito regolare.',
    s5: 'Settembre 1939: Neutralità afghana. Calma e ordine pubblico in tutto il Kohistan; i notabili locali rinnovano la fedeltà al trono di Re Zahir Shah.',
    s6: 'Giugno - Agosto 1940: Sviluppo dell\'agricoltura irrigua e stabilità civile; vigilanza contro ogni fermento antigovernativo.',
    s7: 'Autunno 1940: Rifornimento alimentare regolare per la capitale; pacifica convivenza e tranquillità rurale.',
    s8: 'Aprile 1941: Regione riconciliata e pacifica. Kapisa e il Kohistan costituiscono un solido retroterra di sicurezza per la vicina capitale Kabul.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_PAN: {
    id: 'AF_PAN',
    iso: 'AF-PAN',
    cntrCode: 'AFG',
    name: 'Panjshayr',
    modernName: 'Wilayat-e Panjshir (Provincia del Panjshir)',
    historicalName: 'Dara-ye Panjshir (Valle del Panjshir — Bazarak & Bastione Naturale dell\'Hindu Kush)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Panjshir (Bazarak)',
    capital: 'Bazarak',
    region: 'Hindu Kush Centrale / Gola del Panjshir',
    historicalToponym: 'Bazarak / Rokha / Anaba / Khenj / Passo di Khawak / Paryan / Dara',
    s0_1: '1936-1937: Mitica vallata montuosa scavata dal fiume Panjshir (\'Cinque Leoni\') nel cuore dell\'Hindu Kush, con capoluogo a Bazarak. Stretta gola inespugnabile abitata da tenaci comunità montanare tagike. A monte, il celebre **Passo di Khawak** (3.500 metri) rappresenta il valico storico percorso da Alessandro Magno e Tamerlano verso il nord. Ricche e storiche miniere di smeraldi a Khenj.',
    s2_4: '1938 - Marzo 1939: Commercio di pietre preziose e pascolo estivo d\'alta quota; l\'amministrazione reale gestisce la sicurezza del valico di Khawak come alternativa di riserva per le comunicazioni con l\'Andarab e il Badakhshan.',
    s5: 'Settembre 1939: Neutralità nel conflitto europeo. La naturale inaccessibilità della vallata garantisce la totale protezione della popolazione.',
    s6: 'Giugno - Agosto 1940: Vita montanara pacifica e autonoma; custodia dei passi alpini da parte delle comunità valligiane.',
    s7: 'Autunno 1940: Raccolta delle noci e delle scorte invernali prima della chiusura delle gole per ghiaccio.',
    s8: 'Aprile 1941: Bastione montano intatto e leale. Il Panjshir preserva la sua leggendaria fierezza all\'interno dell\'ordine monarchico neutrale afghano.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_LOG: {
    id: 'AF_LOG',
    iso: 'AF-LOG',
    cntrCode: 'AFG',
    name: 'Logar',
    modernName: 'Wilayat-e Logar (Provincia di Logar)',
    historicalName: 'Logar (Pul-i Alam — Valle Agricola del Logar & Porta di Gardez)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Logar (Pul-i Alam)',
    capital: 'Pul-i Alam',
    region: 'Regione di Kabul Meridionale / Fiume Logar',
    historicalToponym: 'Pul-i Alam / Baraki Barak / Charkh / Khoshi / Mohammad Agha / Azra',
    s0_1: '1936-1937: Valle agricola fertile e strategica posta immediatamente a sud della capitale lungo il corso del fiume Logar, con capoluogo a Pul-i Alam. Storica \'dispensa alimentare\' di Kabul, celebre per la coltivazione intensiva di grano, cipolle e frutti. Popolata da tribù Pashtun (Ahmadzai, Stanikzai) e comunità tagike, controlla la via verso Gardez e la Provincia Meridionale.',
    s2_4: '1938 - Marzo 1939: Connessione stradale migliorata con la capitale; a Mes Aynak sono noti fin dall\'antichità imponenti affioramenti di minerale di rame e antichi monasteri buddisti.',
    s5: 'Settembre 1939: Neutralità afghana. Posti di controllo gendarmeria lungo la direttrice Kabul-Gardez per la sicurezza dei convogli alimentari.',
    s6: 'Giugno - Agosto 1940: Rifornimento quotidiano di generi di prima necessità ai mercati urbani di Kabul; ordine pubblico ineccepibile.',
    s7: 'Autunno 1940: Conclusione positiva della raccolta cerealicola; le comunità rurali appoggiano pienamente la linea di neutralità dello Stato.',
    s8: 'Aprile 1941: Cerniera meridionale della capitale solida e operosa. Logar garantisce la sicurezza e il sostentamento del governo reale di Re Zahir Shah.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
  AF_WAR: {
    id: 'AF_WAR',
    iso: 'AF-WAR',
    cntrCode: 'AFG',
    name: 'Wardak',
    modernName: 'Wilayat-e Maidan Wardak (Provincia di Wardak)',
    historicalName: 'Maidan Wardak (Maidan Shahr — Altopiano Strategico per l\'Hazarajat)',
    adminTitle: 'Da Afghānistān Shāhī Dawlat — Hukumat-e Maidan (Wardak)',
    capital: 'Maidan Shahr',
    region: 'Regione di Kabul Occidentale / Valichi dell\'Onai',
    historicalToponym: 'Maidan Shahr / Saydabad / Chak / Jalrez / Behsud / Daimirdad / Nirkh',
    s0_1: '1936-1937: Altopiano strategico situato a ovest di Kabul, con capoluogo a Maidan Shahr. Cerniera fondamentale tra la capitale, la direttrice meridionale per Ghazni e la grande via carovaniera dell\'Hazarajat attraverso il Passo di Onai e la regione di Behsud. Popolato dalla confederazione Pashtun Wardak e da comunità Hazara.',
    s2_4: '1938 - Marzo 1939: Presidi militari a Chak e Saydabad per garantire la sicurezza del transito dei viaggiatori e delle carovane commerciali; coltivazione di mele e patate.',
    s5: 'Settembre 1939: Neutralità nel conflitto europeo. Vigilanza sui bivi stradali per Ghazni e l\'Hazarajat; piena conformità alle disposizioni governative.',
    s6: 'Giugno - Agosto 1940: Regolarità dei commerci montani e transito civile ininterrotto; stabilità dei rapporti intertribali.',
    s7: 'Autunno 1940: Manutenzione delle piste montane prima delle gelate invernali; scorte di foraggio accumulate.',
    s8: 'Aprile 1941: Avamposto occidentale della capitale sicuro e fedele. Wardak protegge gli accessi a Kabul sotto la ferma guida di Mohammad Hashim Khan.',
    getNote(s: number): string {
      if (s <= 1) return this.s0_1;
      if (s <= 4) return this.s2_4;
      if (s === 5) return this.s5;
      if (s === 6) return this.s6;
      if (s === 7) return this.s7;
      return this.s8;
    },
    getHistoricalName(s: number): string {
      if (s <= 3) return this.historicalName;
      if (s <= 5) return `${this.historicalName} — Proclamazione della Neutralità Reale`;
      if (s <= 7) return `${this.historicalName} — Rigorosa Neutralità & Sorveglianza Frontiere`;
      return `${this.historicalName} — Sovranità e Neutralità Integrale (Zahir Shah)`;
    },
    getAdminTitle(s: number): string {
      if (s <= 3) return this.adminTitle;
      if (s <= 5) return `${this.adminTitle} (Dichiarazione di Neutralità)`;
      return 'Da Afghānistān Shāhī Dawlat — Amministrazione di Rigorosa Neutralità (Primo Ministro Mohammad Hashim Khan)';
    },
    getSovereign(s: number): string {
      return 'AFG';
    },
    getFaction(s: number): FactionType {
      return 'Neutrale';
    },
  },
};

/**
 * Risolve un'entità provinciale dell'Afghanistan tenendo conto della timeline (step 0-8).
 */
export function resolveAfghanistanProvince(
  idOrKey: string,
  s: number,
  ctx?: any
): ResolvedTerritory | null {
  if (!idOrKey) return null;
  const k = idOrKey.toLowerCase().trim();

  // Esclusioni di sicurezza per evitare falsi positivi
  if (k.includes('french') || k.includes('british') || k.includes('african') || k.includes('persia')) {
    return null;
  }

  // Lookup diretto per ID o ISO
  const cleanUpper = idOrKey.toUpperCase().replace('-', '_').trim();
  if (AFGHANISTAN_PROVINCES_META[cleanUpper]) {
    const meta = AFGHANISTAN_PROVINCES_META[cleanUpper];
    return makeResult(
      meta.getSovereign(s, ctx),
      meta.getHistoricalName(s),
      meta.getNote(s),
      meta.getFaction(s, ctx),
      meta.getAdminTitle(s)
    );
  }

  // Match euristico per nome provincia
  let meta: AfghanistanProvinceInfo | undefined;

  for (const [key, item] of Object.entries(AFGHANISTAN_PROVINCES_META)) {
    const normName = item.name.toLowerCase();
    const lowId = item.id.toLowerCase();
    const lowIso = item.iso.toLowerCase();

    if (
      k === lowId ||
      k === lowIso ||
      k === normName ||
      k.includes(normName) ||
      normName.includes(k)
    ) {
      meta = item;
      break;
    }
  }

  if (!meta) {
    // Specific alias lookups
    if (k.includes('kabul')) meta = AFGHANISTAN_PROVINCES_META['AF_KAB'];
    else if (k.includes('herat') || k.includes('hirat')) meta = AFGHANISTAN_PROVINCES_META['AF_HER'];
    else if (k.includes('kandahar') || k.includes('qandahar')) meta = AFGHANISTAN_PROVINCES_META['AF_KAN'];
    else if (k.includes('balkh') || k.includes('mazar')) meta = AFGHANISTAN_PROVINCES_META['AF_BAL'];
    else if (k.includes('kunduz') || k.includes('qataghan')) meta = AFGHANISTAN_PROVINCES_META['AF_KDZ'];
    else if (k.includes('badakhshan') || k.includes('wakhan')) meta = AFGHANISTAN_PROVINCES_META['AF_BDS'];
    else if (k.includes('nangarhar') || k.includes('jalalabad') || k.includes('mashriqi')) meta = AFGHANISTAN_PROVINCES_META['AF_NAN'];
    else if (k.includes('paktya') || k.includes('paktia') || k.includes('gardez')) meta = AFGHANISTAN_PROVINCES_META['AF_PKA'];
    else if (k.includes('khost') || k.includes('matun')) meta = AFGHANISTAN_PROVINCES_META['AF_KHO'];
    else if (k.includes('bamyan') || k.includes('bamyian')) meta = AFGHANISTAN_PROVINCES_META['AF_BAM'];
    else if (k.includes('ghazni') || k.includes('ghazna')) meta = AFGHANISTAN_PROVINCES_META['AF_GHA'];
    else if (k.includes('helmand') || k.includes('hilmand') || k.includes('girishk')) meta = AFGHANISTAN_PROVINCES_META['AF_HEL'];
    else if (k.includes('nimroz') || k.includes('chakhansur') || k.includes('zaranj')) meta = AFGHANISTAN_PROVINCES_META['AF_NIM'];
    else if (k.includes('farah')) meta = AFGHANISTAN_PROVINCES_META['AF_FRA'];
    else if (k.includes('badghis')) meta = AFGHANISTAN_PROVINCES_META['AF_BDG'];
    else if (k.includes('faryab') || k.includes('maymana')) meta = AFGHANISTAN_PROVINCES_META['AF_FYB'];
    else if (k.includes('jawzjan') || k.includes('sheberghan')) meta = AFGHANISTAN_PROVINCES_META['AF_JOW'];
    else if (k.includes('sari pul') || k.includes('sar-e pol')) meta = AFGHANISTAN_PROVINCES_META['AF_SAR'];
    else if (k.includes('samangan') || k.includes('aibak')) meta = AFGHANISTAN_PROVINCES_META['AF_SAM'];
    else if (k.includes('baghlan') || k.includes('pol-e khomri')) meta = AFGHANISTAN_PROVINCES_META['AF_BGL'];
    else if (k.includes('takhar') || k.includes('taloqan')) meta = AFGHANISTAN_PROVINCES_META['AF_TAK'];
    else if (k.includes('ghor') || k.includes('chaghcharan')) meta = AFGHANISTAN_PROVINCES_META['AF_GHO'];
    else if (k.includes('daykundi') || k.includes('nili')) meta = AFGHANISTAN_PROVINCES_META['AF_DAY'];
    else if (k.includes('uruzgan') || k.includes('tarin kowt')) meta = AFGHANISTAN_PROVINCES_META['AF_URU'];
    else if (k.includes('zabul') || k.includes('qalat')) meta = AFGHANISTAN_PROVINCES_META['AF_ZAB'];
    else if (k.includes('paktika') || k.includes('katawaz') || k.includes('urgun')) meta = AFGHANISTAN_PROVINCES_META['AF_PIA'];
    else if (k.includes('kunar') || k.includes('asadabad')) meta = AFGHANISTAN_PROVINCES_META['AF_KNR'];
    else if (k.includes('laghman') || k.includes('mihtarlam')) meta = AFGHANISTAN_PROVINCES_META['AF_LAG'];
    else if (k.includes('nuristan') || k.includes('kafiristan')) meta = AFGHANISTAN_PROVINCES_META['AF_NUR'];
    else if (k.includes('parwan') || k.includes('charikar')) meta = AFGHANISTAN_PROVINCES_META['AF_PAR'];
    else if (k.includes('kapisa') || k.includes('kohistan')) meta = AFGHANISTAN_PROVINCES_META['AF_KAP'];
    else if (k.includes('panjshir') || k.includes('panjshayr')) meta = AFGHANISTAN_PROVINCES_META['AF_PAN'];
    else if (k.includes('logar') || k.includes('pul-i alam')) meta = AFGHANISTAN_PROVINCES_META['AF_LOG'];
    else if (k.includes('wardak') || k.includes('maidan')) meta = AFGHANISTAN_PROVINCES_META['AF_WAR'];
  }

  if (!meta) return null;

  return makeResult(
    meta.getSovereign(s, ctx),
    meta.getHistoricalName(s),
    meta.getNote(s),
    meta.getFaction(s, ctx),
    meta.getAdminTitle(s)
  );
}

/**
 * Popola il dizionario toponomastico storico con le 34 province dell'Afghanistan.
 */
export function populateAfghanistanToponyms(dict: Record<string, any>): void {
  if (!dict['AFG']) dict['AFG'] = {};

  for (const [key, item] of Object.entries(AFGHANISTAN_PROVINCES_META)) {
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

    dict['AFG'][normName] = match;
    dict['AFG'][lowId] = match;
    dict['AFG'][lowIso] = match;

    // Flat compatibility
    dict[lowId] = match;
    dict[lowIso] = match;
    dict[normName] = match;
  }
}
