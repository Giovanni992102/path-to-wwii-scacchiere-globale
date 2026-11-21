/**
 * Dettaglio Geocartografico Storico delle 65 Province del British Raj (1936-1941)
 *
 * Copertura integrale di tutte le 65 province e territori:
 * - Pakistan: 7 province e territori (Baluchistan, NWFP, Punjab Occidentale, Sind, Gilgit-Baltistan, Azad Kashmir, Islamabad)
 * - Bangladesh: 8 divisioni della Presidenza del Bengala (Dacca, Chittagong, Sylhet, Barisal, Khulna, Rajshahi, Rangpur, Mymensingh)
 * - Birmania / Myanmar: 14 stati e regioni (Rangoon, Mandalay, Sagaing, Bago, Magway, Tenasserim, Delta Irrawaddy, Kachin, Shan, Kayah, Kayin, Chin, Mon, Rakhine)
 * - India: 36 stati, presidenze e territori (Delhi, Bombay, Bengala, Madras, Uttar Pradesh, Punjab, Rajasthan, Gujarat, Hyderabad, Mysore, Kerala, Kashmir, Ladakh, Assam, Arunachal, Goa, Pondicherry, ecc.)
 *
 * Dinamica Storica 1936-1941:
 * - Government of India Act 1935 e riforme costituzionali (1936)
 * - Separazione della Birmania dall'India (1° aprile 1937): Indian Empire -> Crown Colony
 * - Elezioni provinciali del 1937 e governi del Congresso Nazionale Indiano / Partito Unionista
 * - Apertura della Burma Road (1938) per il rifornimento della Cina contro l'invasione giapponese
 * - Scoppio della Seconda Guerra Mondiale (settembre 1939): dichiarazione del Viceré Linlithgow, dimissioni del Congresso, Day of Deliverance
 * - Risoluzione di Lahore (marzo 1940 / "Pakistan Resolution")
 * - Campagna in Nordafrica (1940-1941): 4ª e 5ª Divisione Indiana a Sidi Barrani e Cheren
 * - Operazione Sabine (aprile 1941): sbarco truppe indiane a Bassora da Karachi e Bombay contro il golpe di Rashid Ali in Iraq
 * - Fuga segreta di Subhas Chandra Bose da Calcutta verso Berlino (gennaio-aprile 1941)
 */

import { ResolvedTerritory, FactionType } from '../types';
import { makeResult } from './georesolver';

export interface BritishRajProvinceInfo {
  id: string;
  origId?: string;
  cntrCode: string;
  cntrName: string;
  name: string;
  nutsName: string;
  nameLatn: string;
  nameEngl: string;
  modernName: string;
  historicalName: string;
  adminTitle: string;
  sovereign: string;
  overlord?: string;
  faction: FactionType;
  s0_1: string;
  s2_4: string;
  s5_7: string;
  s8: string;
  getNote: (step: number) => string;
  getHistoricalName?: (step: number) => string;
  getAdminTitle?: (step: number) => string;
  getSovereign?: (step: number) => string;
  getFaction?: (step: number) => FactionType;
}

export const BRITISH_RAJ_PROVINCES_META: Record<string, BritishRajProvinceInfo> = {

  'PK_BAL': {
    id: 'PK_BAL',
    origId: 'PKBA',
    cntrCode: 'PK',
    cntrName: 'Pakistan',
    name: 'Baluchistan',
    nutsName: 'Belucistan (Quetta)',
    nameLatn: 'Balūchistān',
    nameEngl: 'Balochistan Province',
    modernName: 'Provincia del Belucistan (Quetta, Pakistan) · Balūchistān',
    historicalName: 'Impero Anglo-Indiano — Provincia e Agenzia di Baluchistan',
    adminTitle: 'Chief Commissionership of Baluchistan & Agenzia degli Stati di Kalat, Makran e Las Bela',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Belucistan · Roccaforte strategica della frontiera occidentale imperiale dopo il catastrofico terremoto di Quetta del maggio 1935 (30.000 vittime); presidio della guarnigione britannica a guardia del Passo Bolan e accordi con il Khanato di Kalat.',
    s2_4: 'Belucistan · Consolidamento delle difese confinarie lungo la Linea Durand e potenziamento della linea ferroviaria strategica verso Chaman al confine afghano; pattugliamento delle piste carovaniere verso il deserto del Registan.',
    s5_7: 'Belucistan · Con lo scoppio della Seconda Guerra Mondiale il porto di Gwadar e la costa del Makran sorvegliano il Golfo di Oman; mobilitazione del 10° Reggimento Baluch (Baluch Regiment) inviato in Medio Oriente ed Egitto.',
    s8: 'Belucistan · Aprile 1941: il colpo di Stato filo-Asse di Rashid Ali in Iraq e le tensioni in Iran elevano Quetta a quartier generale avanzato per il monitoraggio militare e logistico del confine iraniano lungo la ferrovia di Zahedan.',
    getNote: (s: number) => {
      if (s <= 1) return 'Belucistan · Roccaforte strategica della frontiera occidentale imperiale dopo il catastrofico terremoto di Quetta del maggio 1935 (30.000 vittime); presidio della guarnigione britannica a guardia del Passo Bolan e accordi con il Khanato di Kalat.';
      if (s <= 4) return 'Belucistan · Consolidamento delle difese confinarie lungo la Linea Durand e potenziamento della linea ferroviaria strategica verso Chaman al confine afghano; pattugliamento delle piste carovaniere verso il deserto del Registan.';
      if (s <= 7) return 'Belucistan · Con lo scoppio della Seconda Guerra Mondiale il porto di Gwadar e la costa del Makran sorvegliano il Golfo di Oman; mobilitazione del 10° Reggimento Baluch (Baluch Regiment) inviato in Medio Oriente ed Egitto.';
      return 'Belucistan · Aprile 1941: il colpo di Stato filo-Asse di Rashid Ali in Iraq e le tensioni in Iran elevano Quetta a quartier generale avanzato per il monitoraggio militare e logistico del confine iraniano lungo la ferrovia di Zahedan.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'PK_KPK': {
    id: 'PK_KPK',
    origId: 'PKKP',
    cntrCode: 'PK',
    cntrName: 'Pakistan',
    name: 'Khyber Pakhtunkhwa',
    nutsName: 'Frontiera del Nord-Ovest (Peshawar)',
    nameLatn: 'Khaibar Pakhtūnkhwā',
    nameEngl: 'Khyber Pakhtunkhwa Province',
    modernName: 'Provincia di Khyber Pakhtunkhwa / NWFP (Peshawar, Pakistan) · Khaibar Pakhtūnkhwā',
    historicalName: 'Impero Anglo-Indiano — Provincia della Frontiera del Nord-Ovest (NWFP — Peshawar)',
    adminTitle: 'North-West Frontier Province · Sede Governativa di Peshawar & Agenzie Tribali del Passo Khyber',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Frontiera del Nord-Ovest (NWFP) · Cuore del \'Great Game\' e perno della difesa imperiale verso l\'Afghanistan; il leggendario forte di Jamrud sorveglia il Passo Khyber. Forte radicamento del movimento nonviolento pashtun dei Khudai Khidmatgar (\'Camicie Rosse\') di Khan Abdul Ghaffar Khan.',
    s2_4: 'Peshawar · Nelle storiche elezioni del 1937 il dottor Khan Sahib (Congresso) forma il governo provinciale in una regione a schiacciante maggioranza musulmana. Nel Waziristan l\'esercito britannico conduce dure campagne di pacificazione contro la ribellione tribale del Faqir di Ipi.',
    s5_7: 'Peshawar · Nel novembre 1939 il ministero provinciale si dimette in blocco per protesta contro l\'entrata in guerra decisa senza mandato popolare; il governatore Sir George Cunningham assume i pieni poteri mentre i Frontier Corps presidiano la frontiera afghana.',
    s8: 'Peshawar · Gennaio-aprile 1941: l\'eroe nazionalista Subhas Chandra Bose attraversa clandestinamente la provincia travestito da mercante pashtun sordomuto (Ziauddin), scortato attraverso le montagne tribali verso Kabul per raggiungere Mosca e Berlino.',
    getNote: (s: number) => {
      if (s <= 1) return 'Frontiera del Nord-Ovest (NWFP) · Cuore del \'Great Game\' e perno della difesa imperiale verso l\'Afghanistan; il leggendario forte di Jamrud sorveglia il Passo Khyber. Forte radicamento del movimento nonviolento pashtun dei Khudai Khidmatgar (\'Camicie Rosse\') di Khan Abdul Ghaffar Khan.';
      if (s <= 4) return 'Peshawar · Nelle storiche elezioni del 1937 il dottor Khan Sahib (Congresso) forma il governo provinciale in una regione a schiacciante maggioranza musulmana. Nel Waziristan l\'esercito britannico conduce dure campagne di pacificazione contro la ribellione tribale del Faqir di Ipi.';
      if (s <= 7) return 'Peshawar · Nel novembre 1939 il ministero provinciale si dimette in blocco per protesta contro l\'entrata in guerra decisa senza mandato popolare; il governatore Sir George Cunningham assume i pieni poteri mentre i Frontier Corps presidiano la frontiera afghana.';
      return 'Peshawar · Gennaio-aprile 1941: l\'eroe nazionalista Subhas Chandra Bose attraversa clandestinamente la provincia travestito da mercante pashtun sordomuto (Ziauddin), scortato attraverso le montagne tribali verso Kabul per raggiungere Mosca e Berlino.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'PK_PUN': {
    id: 'PK_PUN',
    origId: 'PKPB',
    cntrCode: 'PK',
    cntrName: 'Pakistan',
    name: 'West Punjab',
    nutsName: 'Punjab Occidentale (Lahore)',
    nameLatn: 'Panjāb',
    nameEngl: 'Punjab Province (Pakistan)',
    modernName: 'Provincia del Punjab Occidentale (Lahore, Rawalpindi e Multan, Pakistan) · Panjāb',
    historicalName: 'Impero Anglo-Indiano — Provincia del Punjab (Settore Occidentale — Lahore)',
    adminTitle: 'Punjab Province · Governo di Lahore (Sir Sikandar Hayat Khan — Partito Unionista)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Punjab Occidentale · Capitale storica e culturale del Punjab; Lahore è il fulcro politico dell\'India settentrionale con la ferrovia North Western State Railway, mentre Rawalpindi ospita il più grande quartier generale militare dell\'Impero Indiano (Northern Command).',
    s2_4: 'Lahore · Il Primo Ministro Sir Sikandar Hayat Khan guida il governo provinciale del Partito Unionista (storica alleanza laica tra proprietari terrieri musulmani, sikh e indù); nell\'ottobre 1937 stipula il Patto Jinnah-Sikandar integrando la Lega Musulmana.',
    s5_7: 'Lahore · Nel marzo 1940 la sessione plenaria della All-India Muslim League al Minto Park approva all\'unanimità la \'Risoluzione di Lahore\' (Pakistan Resolution), sancendo formalmente la richiesta di uno Stato sovrano separato per i musulmani indiani.',
    s8: 'Lahore · Il Punjab è la spina dorsale dell\'arruolamento imperiale: oltre 100.000 volontari combattono con distinzione nella 4ª Divisione Indiana contro gli italiani a Sidi Barrani e nella battaglia decisiva di Cheren in Eritrea.',
    getNote: (s: number) => {
      if (s <= 1) return 'Punjab Occidentale · Capitale storica e culturale del Punjab; Lahore è il fulcro politico dell\'India settentrionale con la ferrovia North Western State Railway, mentre Rawalpindi ospita il più grande quartier generale militare dell\'Impero Indiano (Northern Command).';
      if (s <= 4) return 'Lahore · Il Primo Ministro Sir Sikandar Hayat Khan guida il governo provinciale del Partito Unionista (storica alleanza laica tra proprietari terrieri musulmani, sikh e indù); nell\'ottobre 1937 stipula il Patto Jinnah-Sikandar integrando la Lega Musulmana.';
      if (s <= 7) return 'Lahore · Nel marzo 1940 la sessione plenaria della All-India Muslim League al Minto Park approva all\'unanimità la \'Risoluzione di Lahore\' (Pakistan Resolution), sancendo formalmente la richiesta di uno Stato sovrano separato per i musulmani indiani.';
      return 'Lahore · Il Punjab è la spina dorsale dell\'arruolamento imperiale: oltre 100.000 volontari combattono con distinzione nella 4ª Divisione Indiana contro gli italiani a Sidi Barrani e nella battaglia decisiva di Cheren in Eritrea.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'PK_SIN': {
    id: 'PK_SIN',
    origId: 'PKSD',
    cntrCode: 'PK',
    cntrName: 'Pakistan',
    name: 'Sind',
    nutsName: 'Sind (Porto di Karachi)',
    nameLatn: 'Sindh',
    nameEngl: 'Sindh Province',
    modernName: 'Provincia del Sindh (Karachi e Hyderabad, Pakistan) · Sindh',
    historicalName: 'Impero Anglo-Indiano — Provincia del Sind (Porto di Karachi)',
    adminTitle: 'Sind Province · Separata da Bombay nel 1936 (Sede Governativa di Karachi)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Sindh · Il 1° aprile 1936 il Sind ottiene lo statuto di provincia autonoma separata da Bombay; Karachi è uno scalo portuale in fortissima espansione e nodo aereo fondamentale per le rotte Imperial Airways verso l\'Australia.',
    s2_4: 'Sindh · Lo sbarramento monumentale Sukkur Barrage (Lloyd Barrage) sull\'Indo fertilizza milioni di acri di cotone e grano. Vita parlamentare vivace guidata da Sir Ghulam Hussain Hidayatullah e Allah Bux Soomro.',
    s5_7: 'Karachi · Con l\'inizio della guerra, il porto di Karachi diviene la base navale logistica principale della Royal Indian Navy per il Mare Arabico e l\'accesso al Golfo Persico; mobilitazione di contingenti logistici e depositi rifornimenti.',
    s8: 'Karachi · Aprile 1941: dal porto di Karachi salpano in fretta i convogli con le truppe della 10ª Divisione Fanteria Indiana (Operazione Sabine) per sbarcare a Bassora e sventare la ribellione anti-britannica di Rashid Ali in Iraq.',
    getNote: (s: number) => {
      if (s <= 1) return 'Sindh · Il 1° aprile 1936 il Sind ottiene lo statuto di provincia autonoma separata da Bombay; Karachi è uno scalo portuale in fortissima espansione e nodo aereo fondamentale per le rotte Imperial Airways verso l\'Australia.';
      if (s <= 4) return 'Sindh · Lo sbarramento monumentale Sukkur Barrage (Lloyd Barrage) sull\'Indo fertilizza milioni di acri di cotone e grano. Vita parlamentare vivace guidata da Sir Ghulam Hussain Hidayatullah e Allah Bux Soomro.';
      if (s <= 7) return 'Karachi · Con l\'inizio della guerra, il porto di Karachi diviene la base navale logistica principale della Royal Indian Navy per il Mare Arabico e l\'accesso al Golfo Persico; mobilitazione di contingenti logistici e depositi rifornimenti.';
      return 'Karachi · Aprile 1941: dal porto di Karachi salpano in fretta i convogli con le truppe della 10ª Divisione Fanteria Indiana (Operazione Sabine) per sbarcare a Bassora e sventare la ribellione anti-britannica di Rashid Ali in Iraq.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'PK_GB': {
    id: 'PK_GB',
    origId: 'PKGB',
    cntrCode: 'PK',
    cntrName: 'Pakistan',
    name: 'Gilgit-Baltistan',
    nutsName: 'Gilgit-Baltistan (Karakorum)',
    nameLatn: 'Gilgit-Baltistān',
    nameEngl: 'Gilgit-Baltistan',
    modernName: 'Gilgit-Baltistan / Territori del Nord (Gilgit, Hunza e Baltistan, Pakistan) · Gilgit-Baltistān',
    historicalName: 'Impero Anglo-Indiano — Agenzia di Gilgit e Frontiera del Karakorum',
    adminTitle: 'Gilgit Agency · Amministrazione Speciale Britannica & Stati Principeschi di Hunza e Nagar',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Gilgit-Baltistan · Confluenza strategica del Karakorum tra India Britannica, Cina (Xinjiang), Corridoio del Wakhan (Afghanistan) e Unione Sovietica; sorveglianza militare dei Gilgit Scouts e del Political Agent britannico.',
    s2_4: 'Gilgit · Nel 1935 la Gran Bretagna ottiene dal Maharaja di Jammu e Kashmir un contratto di locazione sessantennale dell\'Agenzia di Gilgit per monitorare direttamente i valichi trans-asiatici.',
    s5_7: 'Gilgit · Rafforzamento del pattugliamento montano durante la guerra europea; osservazione delle carovane dello Xinjiang e controllo delle piste d\'alta quota.',
    s8: 'Gilgit · I passi himalayani rimangono presidiati dagli esploratori indigeni fedeli alla Corona, garantendo l\'impermeabilità della frontiera settentrionale.',
    getNote: (s: number) => {
      if (s <= 1) return 'Gilgit-Baltistan · Confluenza strategica del Karakorum tra India Britannica, Cina (Xinjiang), Corridoio del Wakhan (Afghanistan) e Unione Sovietica; sorveglianza militare dei Gilgit Scouts e del Political Agent britannico.';
      if (s <= 4) return 'Gilgit · Nel 1935 la Gran Bretagna ottiene dal Maharaja di Jammu e Kashmir un contratto di locazione sessantennale dell\'Agenzia di Gilgit per monitorare direttamente i valichi trans-asiatici.';
      if (s <= 7) return 'Gilgit · Rafforzamento del pattugliamento montano durante la guerra europea; osservazione delle carovane dello Xinjiang e controllo delle piste d\'alta quota.';
      return 'Gilgit · I passi himalayani rimangono presidiati dagli esploratori indigeni fedeli alla Corona, garantendo l\'impermeabilità della frontiera settentrionale.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'PK_AJK': {
    id: 'PK_AJK',
    origId: 'PKJK',
    cntrCode: 'PK',
    cntrName: 'Pakistan',
    name: 'Azad Kashmir',
    nutsName: 'Kashmir Libero (Muzaffarabad)',
    nameLatn: 'Āzād Kashmīr',
    nameEngl: 'Azad Jammu and Kashmir',
    modernName: 'Azad Kashmir (Muzaffarabad, Mirpur e Poonch, Pakistan) · Āzād Kashmīr',
    historicalName: 'Impero Anglo-Indiano — Settore Occidentale del Jammu e Kashmir (Muzaffarabad)',
    adminTitle: 'Stato Principesco di Jammu e Kashmir · Distretti Occidentali di Muzaffarabad, Poonch e Mirpur',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Kashmir Occidentale · Valli fluviali del Jhelum e del Neelum dominate dal principato vassallo di Poonch e dal distretto di Mirpur; popolazione a forte maggioranza musulmana sotto la sovranità del Maharaja Hari Singh.',
    s2_4: 'Muzaffarabad · Tensioni agrarie e proteste comunitarie contro le tasse del governo feudale di Srinagar; il distretto di Poonch è una fertile riserva di reclutamento per i reggimenti di fanteria della British Army.',
    s5_7: 'Poonch · Massiccio arruolamento di giovani contadini e veterani per la guerra in Medio Oriente; migliaia di soldati del Poonch partono per il fronte nordafricano.',
    s8: 'Poonch e Mirpur · Con il protrarsi della guerra mondiale la lealtà militare delle famiglie dei soldati si affianca alle prime rivendicazioni di autonomia politica rispetto alla corte di Srinagar.',
    getNote: (s: number) => {
      if (s <= 1) return 'Kashmir Occidentale · Valli fluviali del Jhelum e del Neelum dominate dal principato vassallo di Poonch e dal distretto di Mirpur; popolazione a forte maggioranza musulmana sotto la sovranità del Maharaja Hari Singh.';
      if (s <= 4) return 'Muzaffarabad · Tensioni agrarie e proteste comunitarie contro le tasse del governo feudale di Srinagar; il distretto di Poonch è una fertile riserva di reclutamento per i reggimenti di fanteria della British Army.';
      if (s <= 7) return 'Poonch · Massiccio arruolamento di giovani contadini e veterani per la guerra in Medio Oriente; migliaia di soldati del Poonch partono per il fronte nordafricano.';
      return 'Poonch e Mirpur · Con il protrarsi della guerra mondiale la lealtà militare delle famiglie dei soldati si affianca alle prime rivendicazioni di autonomia politica rispetto alla corte di Srinagar.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'PK_ICT': {
    id: 'PK_ICT',
    origId: 'PKIS',
    cntrCode: 'PK',
    cntrName: 'Pakistan',
    name: 'Islamabad',
    nutsName: 'Islamabad (Territorio della Capitale)',
    nameLatn: 'Islāmābād',
    nameEngl: 'Islamabad Capital Territory',
    modernName: 'Territorio della Capitale Islamabad (Pakistan) · Islāmābād',
    historicalName: 'Impero Anglo-Indiano — Altopiano di Potohar e Colline di Margalla',
    adminTitle: 'Divisione di Rawalpindi · Altopiano di Potohar (Distretto Militare di Rawalpindi)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Altopiano di Potohar · Regione rurale pedemontana dominata dalle scenografiche colline di Margalla; retrovia logistica, campi d\'addestramento e riserve del limitrofo comando d\'armata di Rawalpindi.',
    s2_4: 'Margalla · Snodo viario e ferroviario della Grand Trunk Road verso Peshawar e Taxila; passaggio costante di convogli militari e rifornimenti per le guarnigioni di frontiera.',
    s5_7: 'Altopiano di Potohar · Espansione delle basi aeree e dei depositi munizioni a sostegno dello sforzo bellico dell\'India nord-occidentale.',
    s8: 'Margalla · Zona strategica di transito rapido delle divisioni coloniali inviate d\'urgenza verso i porti d\'imbarco per la guerra in Medio Oriente.',
    getNote: (s: number) => {
      if (s <= 1) return 'Altopiano di Potohar · Regione rurale pedemontana dominata dalle scenografiche colline di Margalla; retrovia logistica, campi d\'addestramento e riserve del limitrofo comando d\'armata di Rawalpindi.';
      if (s <= 4) return 'Margalla · Snodo viario e ferroviario della Grand Trunk Road verso Peshawar e Taxila; passaggio costante di convogli militari e rifornimenti per le guarnigioni di frontiera.';
      if (s <= 7) return 'Altopiano di Potohar · Espansione delle basi aeree e dei depositi munizioni a sostegno dello sforzo bellico dell\'India nord-occidentale.';
      return 'Margalla · Zona strategica di transito rapido delle divisioni coloniali inviate d\'urgenza verso i porti d\'imbarco per la guerra in Medio Oriente.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'BD_DHA': {
    id: 'BD_DHA',
    origId: 'BDC',
    cntrCode: 'BD',
    cntrName: 'Bangladesh',
    name: 'Dhaka',
    nutsName: 'Dacca (Capitale del Bengala Orientale)',
    nameLatn: 'Dhākā',
    nameEngl: 'Dhaka Division',
    modernName: 'Divisione di Dacca (Capitale del Bangladesh) · Dhākā',
    historicalName: 'Impero Anglo-Indiano — Presidenza del Bengala Orientale (Metropoli di Dacca)',
    adminTitle: 'Bengal Presidency · Dacca Division (Dacca, Narayanganj & Fiume Buriganga)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Dacca · Storica capitale del Bengala Moghul e centro spirituale musulmano; sede della prestigiosa Università di Dacca (1921), polo della cultura intellettuale bengalese; Narayanganj è il centro mondiale del commercio della iuta grezza.',
    s2_4: 'Dacca · Nelle elezioni del 1937 A.K. Fazlul Huq (Krishak Praja Party) sconfigge i proprietari terrieri aristocratici e forma un governo di coalizione con la Lega Musulmana a Calcutta, tutelando i contadini musulmani.',
    s5_7: 'Dacca · La fibra dorata di iuta diventa risorsa di guerra strategica: milioni di sacchi protettivi vengono tessuti a Narayanganj per le trincee e le fortificazioni della Gran Bretagna e degli Alleati.',
    s8: 'Dacca · Centro di fervente dibattito politico dopo la Risoluzione di Lahore del 1940; Fazlul Huq, che ne fu il primo proponente, difende i diritti e l\'autonomia del Bengala nel quadro dell\'Impero in guerra.',
    getNote: (s: number) => {
      if (s <= 1) return 'Dacca · Storica capitale del Bengala Moghul e centro spirituale musulmano; sede della prestigiosa Università di Dacca (1921), polo della cultura intellettuale bengalese; Narayanganj è il centro mondiale del commercio della iuta grezza.';
      if (s <= 4) return 'Dacca · Nelle elezioni del 1937 A.K. Fazlul Huq (Krishak Praja Party) sconfigge i proprietari terrieri aristocratici e forma un governo di coalizione con la Lega Musulmana a Calcutta, tutelando i contadini musulmani.';
      if (s <= 7) return 'Dacca · La fibra dorata di iuta diventa risorsa di guerra strategica: milioni di sacchi protettivi vengono tessuti a Narayanganj per le trincee e le fortificazioni della Gran Bretagna e degli Alleati.';
      return 'Dacca · Centro di fervente dibattito politico dopo la Risoluzione di Lahore del 1940; Fazlul Huq, che ne fu il primo proponente, difende i diritti e l\'autonomia del Bengala nel quadro dell\'Impero in guerra.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'BD_CTG': {
    id: 'BD_CTG',
    origId: 'BDB',
    cntrCode: 'BD',
    cntrName: 'Bangladesh',
    name: 'Chittagong',
    nutsName: 'Chittagong (Porto Orientale del Bengala)',
    nameLatn: 'Chaṭṭogrām',
    nameEngl: 'Chittagong Division',
    modernName: 'Divisione di Chittagong (Porto di Chattogram, Bangladesh) · Chaṭṭogrām',
    historicalName: 'Impero Anglo-Indiano — Porto di Chittagong e Colline del Bengala',
    adminTitle: 'Bengal Presidency · Chittagong Division & Chittagong Hill Tracts',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Chittagong · Grande porto marittimo sull\'estuario del fiume Karnaphuli; memorabile teatro dell\'audace assalto all\'armeria britannica del 1930 condotto dai rivoluzionari bengalesi guidati da Surya Sen (\'Masterda\').',
    s2_4: 'Chittagong · Scalo merci primario della Assam-Bengal Railway per l\'esportazione di tè e petrolio; amministrazione speciale protetta nei Chittagong Hill Tracts per le popolazioni tribali Chakma e Marma.',
    s5_7: 'Chittagong · Con la guerra in Europa e le crescenti minacce giapponesi in Asia, il porto viene militarizzato: la Royal Navy e la Royal Indian Navy installano postazioni costiere e stazioni idrovolanti.',
    s8: 'Chittagong · Hub logistico e cerniera vitale di collegamento marittimo e ferroviario con l\'Assam e la vicina Birmania, nodo di retrovia per i convogli rifornimenti alleati.',
    getNote: (s: number) => {
      if (s <= 1) return 'Chittagong · Grande porto marittimo sull\'estuario del fiume Karnaphuli; memorabile teatro dell\'audace assalto all\'armeria britannica del 1930 condotto dai rivoluzionari bengalesi guidati da Surya Sen (\'Masterda\').';
      if (s <= 4) return 'Chittagong · Scalo merci primario della Assam-Bengal Railway per l\'esportazione di tè e petrolio; amministrazione speciale protetta nei Chittagong Hill Tracts per le popolazioni tribali Chakma e Marma.';
      if (s <= 7) return 'Chittagong · Con la guerra in Europa e le crescenti minacce giapponesi in Asia, il porto viene militarizzato: la Royal Navy e la Royal Indian Navy installano postazioni costiere e stazioni idrovolanti.';
      return 'Chittagong · Hub logistico e cerniera vitale di collegamento marittimo e ferroviario con l\'Assam e la vicina Birmania, nodo di retrovia per i convogli rifornimenti alleati.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'BD_SYL': {
    id: 'BD_SYL',
    origId: 'BDG',
    cntrCode: 'BD',
    cntrName: 'Bangladesh',
    name: 'Sylhet',
    nutsName: 'Sylhet (Terre del Tè della Valle del Surma)',
    nameLatn: 'Sileṭ',
    nameEngl: 'Sylhet Division',
    modernName: 'Divisione di Sylhet (Bangladesh) · Sileṭ',
    historicalName: 'Impero Anglo-Indiano — Distretto di Sylhet (Valle del Surma — Assam)',
    adminTitle: 'Assam Province · Sylhet District (Piantagioni di Tè della Valle del Surma & Fiume Surma)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Sylhet · Storicamente annesso alla provincia dell\'Assam sotto l\'amministrazione coloniale; celebre per le sterminate piantagioni di tè create dai coloni britannici lungo le valli del Surma e del Kushiyara.',
    s2_4: 'Sylhet · Forte movimento per il ricongiungimento linguistico e culturale con il Bengala; vivace attività della comunità musulmana e produzione massiccia di tè esportato in tutto l\'Impero Britannico.',
    s5_7: 'Sylhet · Il tè di Sylhet è inserito nelle razioni standard delle truppe imperiali al fronte; espansione delle vie di comunicazione fluviali e ferroviarie verso Calcutta.',
    s8: 'Sylhet · La regione diventa retrovia di rifornimento essenziale per l\'India orientale, con aeroporti sussidiari della RAF per la sorveglianza delle frontiere con l\'Indocina e la Birmania.',
    getNote: (s: number) => {
      if (s <= 1) return 'Sylhet · Storicamente annesso alla provincia dell\'Assam sotto l\'amministrazione coloniale; celebre per le sterminate piantagioni di tè create dai coloni britannici lungo le valli del Surma e del Kushiyara.';
      if (s <= 4) return 'Sylhet · Forte movimento per il ricongiungimento linguistico e culturale con il Bengala; vivace attività della comunità musulmana e produzione massiccia di tè esportato in tutto l\'Impero Britannico.';
      if (s <= 7) return 'Sylhet · Il tè di Sylhet è inserito nelle razioni standard delle truppe imperiali al fronte; espansione delle vie di comunicazione fluviali e ferroviarie verso Calcutta.';
      return 'Sylhet · La regione diventa retrovia di rifornimento essenziale per l\'India orientale, con aeroporti sussidiari della RAF per la sorveglianza delle frontiere con l\'Indocina e la Birmania.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'BD_BAR': {
    id: 'BD_BAR',
    origId: 'BDA',
    cntrCode: 'BD',
    cntrName: 'Bangladesh',
    name: 'Barisal',
    nutsName: 'Barisal (Delta del Gange)',
    nameLatn: 'Bariśāl',
    nameEngl: 'Barisal Division',
    modernName: 'Divisione di Barisal (Bangladesh) · Bariśāl',
    historicalName: 'Impero Anglo-Indiano — Distretti Costieri di Bakarganj (Delta del Gange)',
    adminTitle: 'Bengal Presidency · Bakarganj District & Labirinto Fluviale del Meghna',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Barisal · Il \'Granaio del Bengala\' nel dedalo fluviale del delta del Gange-Brahmaputra; rinomato per le immense risaie alluvionali (varietà Balam) e la navigazione a vapore della Flotilla Company.',
    s2_4: 'Barisal · Centro di forte attivismo politico contadino; la popolazione rurale sostiene con convinzione il programma di riforme agrarie e liberazione dall\'usura del Primo Ministro bengalese Fazlul Huq.',
    s5_7: 'Barisal · La produzione risicola garantisce il sostentamento essenziale per Calcutta e per i contingenti operai mobilitati nelle industrie di guerra.',
    s8: 'Barisal · Monitoraggio navale contro il contrabbando marittimo nel Golfo del Bengala e protezione della complessa rete di canali deltaici.',
    getNote: (s: number) => {
      if (s <= 1) return 'Barisal · Il \'Granaio del Bengala\' nel dedalo fluviale del delta del Gange-Brahmaputra; rinomato per le immense risaie alluvionali (varietà Balam) e la navigazione a vapore della Flotilla Company.';
      if (s <= 4) return 'Barisal · Centro di forte attivismo politico contadino; la popolazione rurale sostiene con convinzione il programma di riforme agrarie e liberazione dall\'usura del Primo Ministro bengalese Fazlul Huq.';
      if (s <= 7) return 'Barisal · La produzione risicola garantisce il sostentamento essenziale per Calcutta e per i contingenti operai mobilitati nelle industrie di guerra.';
      return 'Barisal · Monitoraggio navale contro il contrabbando marittimo nel Golfo del Bengala e protezione della complessa rete di canali deltaici.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'BD_KHU': {
    id: 'BD_KHU',
    origId: 'BDD',
    cntrCode: 'BD',
    cntrName: 'Bangladesh',
    name: 'Khulna',
    nutsName: 'Khulna e Sundarbans',
    nameLatn: 'Khulnā',
    nameEngl: 'Khulna Division',
    modernName: 'Divisione di Khulna (Bangladesh) · Khulnā',
    historicalName: 'Impero Anglo-Indiano — Distretto di Khulna e Sundarbans Orientali',
    adminTitle: 'Bengal Presidency · Khulna & Jessore Districts (Foreste di Mangrovie delle Sundarbans)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Khulna · Porta d\'accesso al grandioso ecosistema di mangrovie delle Sundarbans, popolato dalla tigre reale del Bengala; scalo fluviale del Rupsha connesso per via d\'acqua e rotaia a Calcutta e Jessore.',
    s2_4: 'Khulna · Esportazione di legname, melassa, pesce e riso; centro nevralgico della navigazione fluviale interna e dogana fluviale sul delta.',
    s5_7: 'Khulna · Durante la guerra le imbarcazioni fluviali del distretto vengono requisite per trasporti logistici della Royal Indian Navy.',
    s8: 'Khulna · I cantieri navali fluviali incrementano la produzione di chiatte e naviglio leggero per il rifornimento dei porti militari del Golfo del Bengala.',
    getNote: (s: number) => {
      if (s <= 1) return 'Khulna · Porta d\'accesso al grandioso ecosistema di mangrovie delle Sundarbans, popolato dalla tigre reale del Bengala; scalo fluviale del Rupsha connesso per via d\'acqua e rotaia a Calcutta e Jessore.';
      if (s <= 4) return 'Khulna · Esportazione di legname, melassa, pesce e riso; centro nevralgico della navigazione fluviale interna e dogana fluviale sul delta.';
      if (s <= 7) return 'Khulna · Durante la guerra le imbarcazioni fluviali del distretto vengono requisite per trasporti logistici della Royal Indian Navy.';
      return 'Khulna · I cantieri navali fluviali incrementano la produzione di chiatte e naviglio leggero per il rifornimento dei porti militari del Golfo del Bengala.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'BD_RAJ': {
    id: 'BD_RAJ',
    origId: 'BDE',
    cntrCode: 'BD',
    cntrName: 'Bangladesh',
    name: 'Rajshahi',
    nutsName: 'Rajshahi (Piana del Padma)',
    nameLatn: 'Rājśāhī',
    nameEngl: 'Rajshahi Division',
    modernName: 'Divisione di Rajshahi (Bangladesh) · Rājśāhī',
    historicalName: 'Impero Anglo-Indiano — Divisione di Rajshahi (Bengala)',
    adminTitle: 'Bengal Presidency · Rajshahi Division (Fiume Padma & Sericoltura)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Rajshahi · Celebre centro della sericoltura e della produzione della seta pregiata del Bengala; bagnata dal possente fiume Padma (Gange), sede del prestigioso Rajshahi College fondato nel 1873.',
    s2_4: 'Rajshahi · Nodo ferroviario fondamentale della Eastern Bengal Railway per i collegamenti verso il Bengala settentrionale, la stazione collinare di Darjeeling e il Sikkim.',
    s5_7: 'Rajshahi · Mobilitazione dell\'agricoltura locale per la produzione di grano, riso e seta per paracadute destinati alle forze armate imperiali.',
    s8: 'Rajshahi · Presidio della frontiera fluviale e snodo strategico di smistamento logistico per i treni militari verso il fronte orientale.',
    getNote: (s: number) => {
      if (s <= 1) return 'Rajshahi · Celebre centro della sericoltura e della produzione della seta pregiata del Bengala; bagnata dal possente fiume Padma (Gange), sede del prestigioso Rajshahi College fondato nel 1873.';
      if (s <= 4) return 'Rajshahi · Nodo ferroviario fondamentale della Eastern Bengal Railway per i collegamenti verso il Bengala settentrionale, la stazione collinare di Darjeeling e il Sikkim.';
      if (s <= 7) return 'Rajshahi · Mobilitazione dell\'agricoltura locale per la produzione di grano, riso e seta per paracadute destinati alle forze armate imperiali.';
      return 'Rajshahi · Presidio della frontiera fluviale e snodo strategico di smistamento logistico per i treni militari verso il fronte orientale.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'BD_RAN': {
    id: 'BD_RAN',
    origId: 'BDF',
    cntrCode: 'BD',
    cntrName: 'Bangladesh',
    name: 'Rangpur',
    nutsName: 'Rangpur (Nord del Bengala)',
    nameLatn: 'Raṅpur',
    nameEngl: 'Rangpur Division',
    modernName: 'Divisione di Rangpur (Bangladesh) · Raṅpur',
    historicalName: 'Impero Anglo-Indiano — Distretti di Rangpur e Dinajpur (Nord del Bengala)',
    adminTitle: 'Bengal Presidency · Rangpur & Dinajpur Districts (Bacino del Teesta)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Rangpur · Pianura agricola solcata dal fiume Teesta e dal Jamuna; rinomata per la coltivazione del tabacco, della canna da zucchero e della fibra di iuta nel nord del Bengala.',
    s2_4: 'Rangpur · Cerniera geografica e ferroviaria verso il Corridoio di Siliguri, il Regno del Bhutan e l\'Assam; intensa attività associativa rurale dei contadini.',
    s5_7: 'Rangpur · Aumento della pressione fiscale e delle requisizioni cerealicole con l\'ingresso dell\'India nel secondo conflitto mondiale.',
    s8: 'Rangpur · Punto di transito logistico chiave lungo le direttrici ferroviarie strategiche verso l\'Alta Birmania e l\'Assam.',
    getNote: (s: number) => {
      if (s <= 1) return 'Rangpur · Pianura agricola solcata dal fiume Teesta e dal Jamuna; rinomata per la coltivazione del tabacco, della canna da zucchero e della fibra di iuta nel nord del Bengala.';
      if (s <= 4) return 'Rangpur · Cerniera geografica e ferroviaria verso il Corridoio di Siliguri, il Regno del Bhutan e l\'Assam; intensa attività associativa rurale dei contadini.';
      if (s <= 7) return 'Rangpur · Aumento della pressione fiscale e delle requisizioni cerealicole con l\'ingresso dell\'India nel secondo conflitto mondiale.';
      return 'Rangpur · Punto di transito logistico chiave lungo le direttrici ferroviarie strategiche verso l\'Alta Birmania e l\'Assam.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'BD_MYM': {
    id: 'BD_MYM',
    origId: 'BDH',
    cntrCode: 'BD',
    cntrName: 'Bangladesh',
    name: 'Mymensingh',
    nutsName: 'Mymensingh (Fiume Brahmaputra)',
    nameLatn: 'Maẏmansiṅha',
    nameEngl: 'Mymensingh Division',
    modernName: 'Divisione di Mymensingh (Bangladesh) · Maẏmansiṅha',
    historicalName: 'Impero Anglo-Indiano — Distretto di Mymensingh (Fiume Brahmaputra)',
    adminTitle: 'Bengal Presidency · Mymensingh District (Antico Corso del Brahmaputra)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Mymensingh · Il distretto rurale più popoloso e vasto di tutta l\'India Britannica; dominato dall\'antico corso del Brahmaputra, banchiere mondiale della iuta grezza esportata tramite le fabbriche scozzesi di Dundee.',
    s2_4: 'Mymensingh · Roccaforte del movimento contadino Krishak Praja di Fazlul Huq; forti tensioni tra mezzadri (bargadar) e grandi latifondisti terrieri (zamindar).',
    s5_7: 'Mymensingh · La produzione record di iuta viene completamente assorbita dal Ministero dei Rifornimenti di Londra per l\'imballaggio logistico militare.',
    s8: 'Mymensingh · Rafforzamento dei collegamenti ferroviari verso il fronte birmano e protezione dei ponti fluviali strategici.',
    getNote: (s: number) => {
      if (s <= 1) return 'Mymensingh · Il distretto rurale più popoloso e vasto di tutta l\'India Britannica; dominato dall\'antico corso del Brahmaputra, banchiere mondiale della iuta grezza esportata tramite le fabbriche scozzesi di Dundee.';
      if (s <= 4) return 'Mymensingh · Roccaforte del movimento contadino Krishak Praja di Fazlul Huq; forti tensioni tra mezzadri (bargadar) e grandi latifondisti terrieri (zamindar).';
      if (s <= 7) return 'Mymensingh · La produzione record di iuta viene completamente assorbita dal Ministero dei Rifornimenti di Londra per l\'imballaggio logistico militare.';
      return 'Mymensingh · Rafforzamento dei collegamenti ferroviari verso il fronte birmano e protezione dei ponti fluviali strategici.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'MM_RAN': {
    id: 'MM_RAN',
    origId: 'MM06',
    cntrCode: 'MM',
    cntrName: 'Birmania',
    name: 'Yangon',
    nutsName: 'Rangoon (Yangon - Capitale)',
    nameLatn: 'Ran-kun / Yangon',
    nameEngl: 'Yangon Region',
    modernName: 'Regione di Yangon (Rangoon, Birmania) · Ran-kun',
    historicalName: 'British Burma — Capitale e Porto di Rangoon',
    adminTitle: 'Government of Burma · Capitale di Rangoon (Governatore Sir Archibald Cochrane)',
    sovereign: 'UK',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Rangoon (Yangon) · Fino al 1937 Rangoon è amministrata come capoluogo di una provincia dell\'Impero Anglo-Indiano; metropoli cosmopolita dominata dalla sacra Pagoda Shwedagon, porto fluviale sul fiume Hlaing e polo delle immense raffinerie petrolifere di Syriam (Burmah Oil Company).',
    s2_4: 'Rangoon · Il 1° aprile 1937 entra in vigore la Costituzione della Birmania: la colonia viene ufficialmente separata dall\'India, diventando una Colonia della Corona britannica con Parlamento a Rangoon e governatore Sir Archibald Cochrane; proteste studentesche nazionaliste dei Thakin (Aung San e U Nu).',
    s5_7: 'Rangoon · Con lo scoppio della Seconda Guerra Mondiale la città è il porto di sbarco primario per migliaia di tonnellate di materiale bellico alleato diretto in Cina lungo la ferrovia di Lashio e la Burma Road; tensioni con i nazionalisti birmani filo-indipendentisti.',
    s8: 'Rangoon · Aprile 1941: Rangoon si prepara a un possibile attacco giapponese mentre i \'Trenta Compagni\' guidati da Aung San fuggono in Giappone per ricevere addestramento militare e fondare l\'Esercito per l\'Indipendenza della Birmania.',
    getNote: (s: number) => {
      if (s <= 1) return 'Rangoon (Yangon) · Fino al 1937 Rangoon è amministrata come capoluogo di una provincia dell\'Impero Anglo-Indiano; metropoli cosmopolita dominata dalla sacra Pagoda Shwedagon, porto fluviale sul fiume Hlaing e polo delle immense raffinerie petrolifere di Syriam (Burmah Oil Company).';
      if (s <= 4) return 'Rangoon · Il 1° aprile 1937 entra in vigore la Costituzione della Birmania: la colonia viene ufficialmente separata dall\'India, diventando una Colonia della Corona britannica con Parlamento a Rangoon e governatore Sir Archibald Cochrane; proteste studentesche nazionaliste dei Thakin (Aung San e U Nu).';
      if (s <= 7) return 'Rangoon · Con lo scoppio della Seconda Guerra Mondiale la città è il porto di sbarco primario per migliaia di tonnellate di materiale bellico alleato diretto in Cina lungo la ferrovia di Lashio e la Burma Road; tensioni con i nazionalisti birmani filo-indipendentisti.';
      return 'Rangoon · Aprile 1941: Rangoon si prepara a un possibile attacco giapponese mentre i \'Trenta Compagni\' guidati da Aung San fuggono in Giappone per ricevere addestramento militare e fondare l\'Esercito per l\'Indipendenza della Birmania.';
    },
    getHistoricalName: (s: number) => {
      if (s <= 1) return 'Yangon (Province of the Indian Empire — Rangoon)';
      return 'British Burma (Crown Colony of Burma — Rangoon (Yangon - Capitale))';
    },
    getAdminTitle: (s: number) => {
      if (s <= 1) return 'Province of the Indian Empire · Burma Division (Rangoon (Yangon - Capitale))';
      return 'British Crown Colony · Governor of Burma (Government of Burma · Capitale di Rangoon (Governatore Sir Archibald Cochrane))';
    },
    getSovereign: (s: number) => {
      if (s <= 1) return 'RAJ';
      return 'UK';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'MM_MDY': {
    id: 'MM_MDY',
    origId: 'MM04',
    cntrCode: 'MM',
    cntrName: 'Birmania',
    name: 'Mandalay',
    nutsName: 'Mandalay (Alta Birmania)',
    nameLatn: 'Man:tale:',
    nameEngl: 'Mandalay Region',
    modernName: 'Regione di Mandalay (Birmania) · Man:tale:',
    historicalName: 'British Burma — Divisione di Mandalay (Alta Birmania)',
    adminTitle: 'Upper Burma · Mandalay Division (Palazzo Reale di Mandalay & Fort Dufferin)',
    sovereign: 'UK',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Mandalay · Ultima capitale dell\'indipendente Regno birmano prima dell\'annessione britannica del 1885; cuore culturale del buddismo Theravada dominato dalla collina di Mandalay, dal maestoso Palazzo Reale in legno di teak e dalla cittadella militare di Fort Dufferin.',
    s2_4: 'Mandalay · Con la separazione della Birmania nel 1937 la città diventa il perno amministrativo e ferroviario dell\'Alta Birmania; vivace centro della stampa patriottica birmana e dei monasteri buddisti.',
    s5_7: 'Mandalay · Snodo logistico nevralgico della linea ferroviaria per Lashio; transito quotidiano dei convogli di camion riforniti dagli Alleati per la Burma Road.',
    s8: 'Mandalay · Roccaforte interna di transito delle divisioni coloniali birmane e indiane in addestramento; quartier generale di supporto per la sorveglianza delle frontiere orientali.',
    getNote: (s: number) => {
      if (s <= 1) return 'Mandalay · Ultima capitale dell\'indipendente Regno birmano prima dell\'annessione britannica del 1885; cuore culturale del buddismo Theravada dominato dalla collina di Mandalay, dal maestoso Palazzo Reale in legno di teak e dalla cittadella militare di Fort Dufferin.';
      if (s <= 4) return 'Mandalay · Con la separazione della Birmania nel 1937 la città diventa il perno amministrativo e ferroviario dell\'Alta Birmania; vivace centro della stampa patriottica birmana e dei monasteri buddisti.';
      if (s <= 7) return 'Mandalay · Snodo logistico nevralgico della linea ferroviaria per Lashio; transito quotidiano dei convogli di camion riforniti dagli Alleati per la Burma Road.';
      return 'Mandalay · Roccaforte interna di transito delle divisioni coloniali birmane e indiane in addestramento; quartier generale di supporto per la sorveglianza delle frontiere orientali.';
    },
    getHistoricalName: (s: number) => {
      if (s <= 1) return 'Mandalay (Province of the Indian Empire — Rangoon)';
      return 'British Burma (Crown Colony of Burma — Mandalay (Alta Birmania))';
    },
    getAdminTitle: (s: number) => {
      if (s <= 1) return 'Province of the Indian Empire · Burma Division (Mandalay (Alta Birmania))';
      return 'British Crown Colony · Governor of Burma (Upper Burma · Mandalay Division (Palazzo Reale di Mandalay & Fort Dufferin))';
    },
    getSovereign: (s: number) => {
      if (s <= 1) return 'RAJ';
      return 'UK';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'MM_SAG': {
    id: 'MM_SAG',
    origId: 'MM01',
    cntrCode: 'MM',
    cntrName: 'Birmania',
    name: 'Sagaing',
    nutsName: 'Sagaing (Valle del Chindwin)',
    nameLatn: 'Cakuiñ:',
    nameEngl: 'Sagaing Region',
    modernName: 'Regione di Sagaing (Birmania) · Cakuiñ:',
    historicalName: 'British Burma — Divisione di Sagaing',
    adminTitle: 'Upper Burma · Sagaing Division (Bacino del Fiume Chindwin & Ponte Ava)',
    sovereign: 'UK',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Sagaing · Centro spirituale punteggiato da centinaia di pagode sulle colline lungo l\'Irrawaddy; nel 1934 viene completato il maestoso Ponte Ava (Inwa Bridge), l\'unico che attraversa l\'Irrawaddy unendo ferrovia e strada tra Mandalay e Sagaing.',
    s2_4: 'Sagaing · Amministrazione britannica del bacino del fiume Chindwin; ricchezza forestale di legname di teak, miniere di rame e giacimenti di carbone dell\'Alta Birmania.',
    s5_7: 'Sagaing · Posizione strategica di raccordo fluviale verso il confine indiano dell\'Assam e Manipur lungo la valle di Kabaw.',
    s8: 'Sagaing · Il ponte Ava e la direttrice del Chindwin vengono militarizzati per garantire le comunicazioni d\'emergenza con l\'India nord-orientale.',
    getNote: (s: number) => {
      if (s <= 1) return 'Sagaing · Centro spirituale punteggiato da centinaia di pagode sulle colline lungo l\'Irrawaddy; nel 1934 viene completato il maestoso Ponte Ava (Inwa Bridge), l\'unico che attraversa l\'Irrawaddy unendo ferrovia e strada tra Mandalay e Sagaing.';
      if (s <= 4) return 'Sagaing · Amministrazione britannica del bacino del fiume Chindwin; ricchezza forestale di legname di teak, miniere di rame e giacimenti di carbone dell\'Alta Birmania.';
      if (s <= 7) return 'Sagaing · Posizione strategica di raccordo fluviale verso il confine indiano dell\'Assam e Manipur lungo la valle di Kabaw.';
      return 'Sagaing · Il ponte Ava e la direttrice del Chindwin vengono militarizzati per garantire le comunicazioni d\'emergenza con l\'India nord-orientale.';
    },
    getHistoricalName: (s: number) => {
      if (s <= 1) return 'Sagaing (Province of the Indian Empire — Rangoon)';
      return 'British Burma (Crown Colony of Burma — Sagaing (Valle del Chindwin))';
    },
    getAdminTitle: (s: number) => {
      if (s <= 1) return 'Province of the Indian Empire · Burma Division (Sagaing (Valle del Chindwin))';
      return 'British Crown Colony · Governor of Burma (Upper Burma · Sagaing Division (Bacino del Fiume Chindwin & Ponte Ava))';
    },
    getSovereign: (s: number) => {
      if (s <= 1) return 'RAJ';
      return 'UK';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'MM_BAG': {
    id: 'MM_BAG',
    origId: 'MM02',
    cntrCode: 'MM',
    cntrName: 'Birmania',
    name: 'Bago',
    nutsName: 'Bago (Pegu)',
    nameLatn: 'Pakhū: / Bago',
    nameEngl: 'Bago Region',
    modernName: 'Regione di Bago (Pegu, Birmania) · Pakhū:',
    historicalName: 'British Burma — Divisione di Pegu',
    adminTitle: 'Lower Burma · Pegu Division (Fiume Sittaung & Risaie del Basso Corso)',
    sovereign: 'UK',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Bago (Pegu) · Antica capitale del Regno Mon e della dinastia Taungoo; celebre per la pagoda Shwemawdaw e la statua colossale del Buddha sdraiato Shwethalyaung; pianura alluvionale fertilissima per la risicoltura.',
    s2_4: 'Bago · Arteria ferroviaria e stradale obbligata che collega Rangoon a Mandalay e al porto di Moulmein attraversando il fiume Sittaung.',
    s5_7: 'Bago · Produzione intensiva di riso per l\'esportazione imperiale verso l\'India e la Gran Bretagna; snodo logistico di transito delle truppe coloniali.',
    s8: 'Bago · La ferrovia di Pegu viene posta sotto sorveglianza militare rinforzata in vista delle manovre giapponesi in Indocina e Tailandia.',
    getNote: (s: number) => {
      if (s <= 1) return 'Bago (Pegu) · Antica capitale del Regno Mon e della dinastia Taungoo; celebre per la pagoda Shwemawdaw e la statua colossale del Buddha sdraiato Shwethalyaung; pianura alluvionale fertilissima per la risicoltura.';
      if (s <= 4) return 'Bago · Arteria ferroviaria e stradale obbligata che collega Rangoon a Mandalay e al porto di Moulmein attraversando il fiume Sittaung.';
      if (s <= 7) return 'Bago · Produzione intensiva di riso per l\'esportazione imperiale verso l\'India e la Gran Bretagna; snodo logistico di transito delle truppe coloniali.';
      return 'Bago · La ferrovia di Pegu viene posta sotto sorveglianza militare rinforzata in vista delle manovre giapponesi in Indocina e Tailandia.';
    },
    getHistoricalName: (s: number) => {
      if (s <= 1) return 'Bago (Province of the Indian Empire — Rangoon)';
      return 'British Burma (Crown Colony of Burma — Bago (Pegu))';
    },
    getAdminTitle: (s: number) => {
      if (s <= 1) return 'Province of the Indian Empire · Burma Division (Bago (Pegu))';
      return 'British Crown Colony · Governor of Burma (Lower Burma · Pegu Division (Fiume Sittaung & Risaie del Basso Corso))';
    },
    getSovereign: (s: number) => {
      if (s <= 1) return 'RAJ';
      return 'UK';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'MM_MAG': {
    id: 'MM_MAG',
    origId: 'MM03',
    cntrCode: 'MM',
    cntrName: 'Birmania',
    name: 'Magway',
    nutsName: 'Magway (Campi Petroliferi di Yenangyaung)',
    nameLatn: 'Makve:',
    nameEngl: 'Magway Region',
    modernName: 'Regione di Magway (Birmania) · Makve:',
    historicalName: 'British Burma — Distretto Petrolifero di Minbu e Magwe',
    adminTitle: 'Government of Burma · Magwe Division (Giacimenti Petroliferi BOC di Yenangyaung & Chauk)',
    sovereign: 'UK',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Magway · Cuore petrolifero dell\'Asia sud-orientale; i celebri campi di Yenangyaung e Chauk della Burmah Oil Company (BOC) estraggono milioni di barili di greggio pompati tramite oleodotto fino a Rangoon.',
    s2_4: 'Magway · Nel 1938-1939 i campi petroliferi di Yenangyaung sono l\'epicentro della storica marcia e dello sciopero generale degli operai petroliferi birmani, momento fondante del movimento per l\'indipendenza nazionale.',
    s5_7: 'Magway · La produzione petrolifera di Magway è classificata come risorsa militare di massima priorità per il rifornimento della RAF e della Royal Navy in Asia.',
    s8: 'Magway · Piani speciali di sicurezza britannici per la difesa delle torri di trivellazione e dei terminali di pompaggio fluviali lungo l\'Irrawaddy.',
    getNote: (s: number) => {
      if (s <= 1) return 'Magway · Cuore petrolifero dell\'Asia sud-orientale; i celebri campi di Yenangyaung e Chauk della Burmah Oil Company (BOC) estraggono milioni di barili di greggio pompati tramite oleodotto fino a Rangoon.';
      if (s <= 4) return 'Magway · Nel 1938-1939 i campi petroliferi di Yenangyaung sono l\'epicentro della storica marcia e dello sciopero generale degli operai petroliferi birmani, momento fondante del movimento per l\'indipendenza nazionale.';
      if (s <= 7) return 'Magway · La produzione petrolifera di Magway è classificata come risorsa militare di massima priorità per il rifornimento della RAF e della Royal Navy in Asia.';
      return 'Magway · Piani speciali di sicurezza britannici per la difesa delle torri di trivellazione e dei terminali di pompaggio fluviali lungo l\'Irrawaddy.';
    },
    getHistoricalName: (s: number) => {
      if (s <= 1) return 'Magway (Province of the Indian Empire — Rangoon)';
      return 'British Burma (Crown Colony of Burma — Magway (Campi Petroliferi di Yenangyaung))';
    },
    getAdminTitle: (s: number) => {
      if (s <= 1) return 'Province of the Indian Empire · Burma Division (Magway (Campi Petroliferi di Yenangyaung))';
      return 'British Crown Colony · Governor of Burma (Government of Burma · Magwe Division (Giacimenti Petroliferi BOC di Yenangyaung & Chauk))';
    },
    getSovereign: (s: number) => {
      if (s <= 1) return 'RAJ';
      return 'UK';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'MM_TAN': {
    id: 'MM_TAN',
    origId: 'MM05',
    cntrCode: 'MM',
    cntrName: 'Birmania',
    name: 'Tanintharyi',
    nutsName: 'Tenasserim (Tanintharyi)',
    nameLatn: 'Tanintharyi',
    nameEngl: 'Tanintharyi Region',
    modernName: 'Regione di Tanintharyi (Tenasserim, Birmania) · Tanintharyi',
    historicalName: 'British Burma — Divisione Costiera del Tenasserim',
    adminTitle: 'Lower Burma · Tenasserim Division (Moulmein, Tavoy, Mergui & Arcipelago)',
    sovereign: 'UK',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Tenasserim · Lunga e spettacolare striscia costiera tra il Golfo di Martaban, il Mare delle Andamane e l\'Istmo di Kra (confine siamese); ricchissime miniere di stagno e tungsteno a Tavoy e Mergui.',
    s2_4: 'Tenasserim · Porto di Tavoy e arcipelago delle Mergui (oltre 800 isole popolate dai nomadi del mare Moken); concessioni minerarie britanniche vitali per la produzione di metalli strategici.',
    s5_7: 'Tenasserim · Con lo scoppio della guerra il tungsteno di Tavoy diventa fondamentale per le corazzature belliche britanniche; sorveglianza navale contro sommergibili nemici.',
    s8: 'Tenasserim · Posizione di prima linea al confine con la Tailandia filo-giapponese; dispiegamento di battaglioni della Burma Rifles a difesa della pista aerea di Victoria Point (Kawthaung).',
    getNote: (s: number) => {
      if (s <= 1) return 'Tenasserim · Lunga e spettacolare striscia costiera tra il Golfo di Martaban, il Mare delle Andamane e l\'Istmo di Kra (confine siamese); ricchissime miniere di stagno e tungsteno a Tavoy e Mergui.';
      if (s <= 4) return 'Tenasserim · Porto di Tavoy e arcipelago delle Mergui (oltre 800 isole popolate dai nomadi del mare Moken); concessioni minerarie britanniche vitali per la produzione di metalli strategici.';
      if (s <= 7) return 'Tenasserim · Con lo scoppio della guerra il tungsteno di Tavoy diventa fondamentale per le corazzature belliche britanniche; sorveglianza navale contro sommergibili nemici.';
      return 'Tenasserim · Posizione di prima linea al confine con la Tailandia filo-giapponese; dispiegamento di battaglioni della Burma Rifles a difesa della pista aerea di Victoria Point (Kawthaung).';
    },
    getHistoricalName: (s: number) => {
      if (s <= 1) return 'Tanintharyi (Province of the Indian Empire — Rangoon)';
      return 'British Burma (Crown Colony of Burma — Tenasserim (Tanintharyi))';
    },
    getAdminTitle: (s: number) => {
      if (s <= 1) return 'Province of the Indian Empire · Burma Division (Tenasserim (Tanintharyi))';
      return 'British Crown Colony · Governor of Burma (Lower Burma · Tenasserim Division (Moulmein, Tavoy, Mergui & Arcipelago))';
    },
    getSovereign: (s: number) => {
      if (s <= 1) return 'RAJ';
      return 'UK';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'MM_AYE': {
    id: 'MM_AYE',
    origId: 'MM07',
    cntrCode: 'MM',
    cntrName: 'Birmania',
    name: 'Ayeyarwady',
    nutsName: 'Delta dell\'Irrawaddy (Bassein)',
    nameLatn: 'Ayeyarwady',
    nameEngl: 'Ayeyarwady Region',
    modernName: 'Regione di Ayeyarwady (Delta dell\'Irrawaddy, Birmania) · Ayeyarwady',
    historicalName: 'British Burma — Divisione del Delta dell\'Irrawaddy',
    adminTitle: 'Lower Burma · Irrawaddy Division (Bassein, Henzada & Granaio di Riso d\'Asia)',
    sovereign: 'UK',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Delta dell\'Irrawaddy · Il \'Granaio di Riso d\'Asia\'; un immenso dedalo alluvionale dove milioni di acri bonificati nell\'era coloniale producono la più grande riserva esportabile di riso del pianeta tramite il porto di Bassein (Pathein).',
    s2_4: 'Delta dell\'Irrawaddy · Forte penetrazione del capitale finanziario e dei mercanti Chettiar indiani; tensioni agrarie crescenti tra proprietari terrieri e contadini birmani.',
    s5_7: 'Delta dell\'Irrawaddy · Il riso del delta nutre l\'India britannica e le isole dell\'Oceano Indiano durante le perturbazioni commerciali causate dalla guerra.',
    s8: 'Delta dell\'Irrawaddy · Massima intensificazione delle spedizioni navali di cereali da Bassein e presidio dei canali navigabili.',
    getNote: (s: number) => {
      if (s <= 1) return 'Delta dell\'Irrawaddy · Il \'Granaio di Riso d\'Asia\'; un immenso dedalo alluvionale dove milioni di acri bonificati nell\'era coloniale producono la più grande riserva esportabile di riso del pianeta tramite il porto di Bassein (Pathein).';
      if (s <= 4) return 'Delta dell\'Irrawaddy · Forte penetrazione del capitale finanziario e dei mercanti Chettiar indiani; tensioni agrarie crescenti tra proprietari terrieri e contadini birmani.';
      if (s <= 7) return 'Delta dell\'Irrawaddy · Il riso del delta nutre l\'India britannica e le isole dell\'Oceano Indiano durante le perturbazioni commerciali causate dalla guerra.';
      return 'Delta dell\'Irrawaddy · Massima intensificazione delle spedizioni navali di cereali da Bassein e presidio dei canali navigabili.';
    },
    getHistoricalName: (s: number) => {
      if (s <= 1) return 'Ayeyarwady (Province of the Indian Empire — Rangoon)';
      return 'British Burma (Crown Colony of Burma — Delta dell\'Irrawaddy (Bassein))';
    },
    getAdminTitle: (s: number) => {
      if (s <= 1) return 'Province of the Indian Empire · Burma Division (Delta dell\'Irrawaddy (Bassein))';
      return 'British Crown Colony · Governor of Burma (Lower Burma · Irrawaddy Division (Bassein, Henzada & Granaio di Riso d\'Asia))';
    },
    getSovereign: (s: number) => {
      if (s <= 1) return 'RAJ';
      return 'UK';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'MM_KAC': {
    id: 'MM_KAC',
    origId: 'MM11',
    cntrCode: 'MM',
    cntrName: 'Birmania',
    name: 'Kachin',
    nutsName: 'Stato Kachin (Myitkyina)',
    nameLatn: 'Kakhyaṅ',
    nameEngl: 'Kachin State',
    modernName: 'Stato Kachin (Myitkyina, Birmania) · Kakhyaṅ',
    historicalName: 'British Burma — Trattati delle Colline Kachin (Myitkyina)',
    adminTitle: 'Frontier Areas Administration · Kachin Hill Tracts (Sorgenti dell\'Irrawaddy)',
    sovereign: 'UK',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Kachin · Regione montuosa settentrionale tra le sorgenti dell\'Irrawaddy (Mali e Nmai Hka), famosissima nel mondo per le miniere di giada verde imperiale di Hpakant e i giacimenti di ambra.',
    s2_4: 'Myitkyina · Amministrazione speciale delle Frontier Areas non soggetta al parlamento di Rangoon; i guerrieri Kachin (Kachin Levies) sono considerati truppe d\'élite della Corona britannica.',
    s5_7: 'Myitkyina · Piattaforma strategica di confine con lo Yunnan cinese; ampliamento della pista aerea di Myitkyina e monitoraggio dei sentieri montani dell\'Himalaya orientale.',
    s8: 'Myitkyina · Postazione chiave di retrovia per i collegamenti alleati verso Kunming e la Cina nazionalista.',
    getNote: (s: number) => {
      if (s <= 1) return 'Kachin · Regione montuosa settentrionale tra le sorgenti dell\'Irrawaddy (Mali e Nmai Hka), famosissima nel mondo per le miniere di giada verde imperiale di Hpakant e i giacimenti di ambra.';
      if (s <= 4) return 'Myitkyina · Amministrazione speciale delle Frontier Areas non soggetta al parlamento di Rangoon; i guerrieri Kachin (Kachin Levies) sono considerati truppe d\'élite della Corona britannica.';
      if (s <= 7) return 'Myitkyina · Piattaforma strategica di confine con lo Yunnan cinese; ampliamento della pista aerea di Myitkyina e monitoraggio dei sentieri montani dell\'Himalaya orientale.';
      return 'Myitkyina · Postazione chiave di retrovia per i collegamenti alleati verso Kunming e la Cina nazionalista.';
    },
    getHistoricalName: (s: number) => {
      if (s <= 1) return 'Kachin (Province of the Indian Empire — Rangoon)';
      return 'British Burma (Crown Colony of Burma — Stato Kachin (Myitkyina))';
    },
    getAdminTitle: (s: number) => {
      if (s <= 1) return 'Province of the Indian Empire · Burma Division (Stato Kachin (Myitkyina))';
      return 'British Crown Colony · Governor of Burma (Frontier Areas Administration · Kachin Hill Tracts (Sorgenti dell\'Irrawaddy))';
    },
    getSovereign: (s: number) => {
      if (s <= 1) return 'RAJ';
      return 'UK';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'MM_SHA': {
    id: 'MM_SHA',
    origId: 'MM17',
    cntrCode: 'MM',
    cntrName: 'Birmania',
    name: 'Shan',
    nutsName: 'Stati Federati Shan (Taunggyi)',
    nameLatn: 'Hram:',
    nameEngl: 'Shan State',
    modernName: 'Stato Shan (Taunggyi, Birmania) · Hram:',
    historicalName: 'British Burma — Stati Federati Shan (Federated Shan States)',
    adminTitle: 'Federated Shan States · Altopiano Shan (Principati dei Sawbwa & Capolinea di Lashio)',
    sovereign: 'UK',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Stati Shan · Vasto e suggestivo altopiano collinare a est dell\'Irrawaddy retto da oltre 30 principi ereditari (Sawbwa) fedeli alla Corona; capitale amministrativa a Taunggyi e ricche miniere di piombo e argento a Bawdwin.',
    s2_4: 'Lashio e la Burma Road · Nel 1937-1938 viene inaugurata la leggendaria \'Strada della Birmania\' (Burma Road), che parte dal capolinea ferroviario di Lashio attraversando le montagne per raggiungere Kunming nello Yunnan.',
    s5_7: 'Lashio · Nel 1939-1940 la Burma Road è l\'unica arteria vitale per rifornire la Cina di Chiang Kai-shek contro l\'invasione giapponese; convogli continui di autocarri attraversano l\'altopiano Shan.',
    s8: 'Altopiano Shan · Aprile 1941: a Lashio affluiscono consiglieri e piloti americani dei Flying Tigers (AVG di Claire Chennault) in rotta verso le basi cinesi per proteggere la Burma Road.',
    getNote: (s: number) => {
      if (s <= 1) return 'Stati Shan · Vasto e suggestivo altopiano collinare a est dell\'Irrawaddy retto da oltre 30 principi ereditari (Sawbwa) fedeli alla Corona; capitale amministrativa a Taunggyi e ricche miniere di piombo e argento a Bawdwin.';
      if (s <= 4) return 'Lashio e la Burma Road · Nel 1937-1938 viene inaugurata la leggendaria \'Strada della Birmania\' (Burma Road), che parte dal capolinea ferroviario di Lashio attraversando le montagne per raggiungere Kunming nello Yunnan.';
      if (s <= 7) return 'Lashio · Nel 1939-1940 la Burma Road è l\'unica arteria vitale per rifornire la Cina di Chiang Kai-shek contro l\'invasione giapponese; convogli continui di autocarri attraversano l\'altopiano Shan.';
      return 'Altopiano Shan · Aprile 1941: a Lashio affluiscono consiglieri e piloti americani dei Flying Tigers (AVG di Claire Chennault) in rotta verso le basi cinesi per proteggere la Burma Road.';
    },
    getHistoricalName: (s: number) => {
      if (s <= 1) return 'Shan (Province of the Indian Empire — Rangoon)';
      return 'British Burma (Crown Colony of Burma — Stati Federati Shan (Taunggyi))';
    },
    getAdminTitle: (s: number) => {
      if (s <= 1) return 'Province of the Indian Empire · Burma Division (Stati Federati Shan (Taunggyi))';
      return 'British Crown Colony · Governor of Burma (Federated Shan States · Altopiano Shan (Principati dei Sawbwa & Capolinea di Lashio))';
    },
    getSovereign: (s: number) => {
      if (s <= 1) return 'RAJ';
      return 'UK';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'MM_KAY': {
    id: 'MM_KAY',
    origId: 'MM12',
    cntrCode: 'MM',
    cntrName: 'Birmania',
    name: 'Kayah',
    nutsName: 'Stato Kayah (Stati Karenni)',
    nameLatn: 'Kayā:',
    nameEngl: 'Kayah State',
    modernName: 'Stato Kayah (Stati Karenni, Birmania) · Kayā:',
    historicalName: 'British Burma — Stati Indipendenti dei Karenni',
    adminTitle: 'Protected Karenni States (Bawlake, Kantarawaddi & Kyebogyi)',
    sovereign: 'UK',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Stati Karenni · Storici principati autonomi non annessi alla Birmania britannica ma legati da trattati speciali della Regina Vittoria (1875); sede della miniera di Mawchi, all\'epoca il più ricco giacimento di tungsteno del pianeta.',
    s2_4: 'Karenni · Sfruttamento industriale intensivo delle miniere di Mawchi da parte di compagnie britanniche; produzione strategica di wolframite esportata via fiume.',
    s5_7: 'Karenni · Protezione armata delle miniere per garantire il tungsteno all\'industria degli armamenti pesanti della Gran Bretagna.',
    s8: 'Karenni · Presidio delle valli montane verso il confine siamese per scongiurare incursioni nemiche.',
    getNote: (s: number) => {
      if (s <= 1) return 'Stati Karenni · Storici principati autonomi non annessi alla Birmania britannica ma legati da trattati speciali della Regina Vittoria (1875); sede della miniera di Mawchi, all\'epoca il più ricco giacimento di tungsteno del pianeta.';
      if (s <= 4) return 'Karenni · Sfruttamento industriale intensivo delle miniere di Mawchi da parte di compagnie britanniche; produzione strategica di wolframite esportata via fiume.';
      if (s <= 7) return 'Karenni · Protezione armata delle miniere per garantire il tungsteno all\'industria degli armamenti pesanti della Gran Bretagna.';
      return 'Karenni · Presidio delle valli montane verso il confine siamese per scongiurare incursioni nemiche.';
    },
    getHistoricalName: (s: number) => {
      if (s <= 1) return 'Kayah (Province of the Indian Empire — Rangoon)';
      return 'British Burma (Crown Colony of Burma — Stato Kayah (Stati Karenni))';
    },
    getAdminTitle: (s: number) => {
      if (s <= 1) return 'Province of the Indian Empire · Burma Division (Stato Kayah (Stati Karenni))';
      return 'British Crown Colony · Governor of Burma (Protected Karenni States (Bawlake, Kantarawaddi & Kyebogyi))';
    },
    getSovereign: (s: number) => {
      if (s <= 1) return 'RAJ';
      return 'UK';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'MM_KAR': {
    id: 'MM_KAR',
    origId: 'MM13',
    cntrCode: 'MM',
    cntrName: 'Birmania',
    name: 'Kayin',
    nutsName: 'Stato Kayin (Karen - Hpa-An)',
    nameLatn: 'Kayin',
    nameEngl: 'Kayin State',
    modernName: 'Stato Kayin (Karen, Birmania) · Kayin',
    historicalName: 'British Burma — Colline dei Karen e Fiume Salween',
    adminTitle: 'Lower Burma · Karen Hill Tracts & Salween District',
    sovereign: 'UK',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Colline Karen · Territorio montuoso tra il bacino del Salween (Thanlwin) e il confine siamese; la comunità Karen, ampiamente convertita al cristianesimo e fedelissima alle istituzioni britanniche, fornisce eccellenti contingenti militari.',
    s2_4: 'Karen Hill Tracts · Amministrazione speciale delle colline; i soldati Karen formano il nucleo portante dei battaglioni della Burma Rifles dell\'esercito coloniale.',
    s5_7: 'Salween · Pattugliamento della frontiera orientale contro infiltrazioni dal Siam; reclutamento intensivo di guide e fucilieri Karen.',
    s8: 'Colline Karen · Costituzione di unità di resistenza locale coordinate da ufficiali britannici a difesa della frontiera sud-orientale.',
    getNote: (s: number) => {
      if (s <= 1) return 'Colline Karen · Territorio montuoso tra il bacino del Salween (Thanlwin) e il confine siamese; la comunità Karen, ampiamente convertita al cristianesimo e fedelissima alle istituzioni britanniche, fornisce eccellenti contingenti militari.';
      if (s <= 4) return 'Karen Hill Tracts · Amministrazione speciale delle colline; i soldati Karen formano il nucleo portante dei battaglioni della Burma Rifles dell\'esercito coloniale.';
      if (s <= 7) return 'Salween · Pattugliamento della frontiera orientale contro infiltrazioni dal Siam; reclutamento intensivo di guide e fucilieri Karen.';
      return 'Colline Karen · Costituzione di unità di resistenza locale coordinate da ufficiali britannici a difesa della frontiera sud-orientale.';
    },
    getHistoricalName: (s: number) => {
      if (s <= 1) return 'Kayin (Province of the Indian Empire — Rangoon)';
      return 'British Burma (Crown Colony of Burma — Stato Kayin (Karen - Hpa-An))';
    },
    getAdminTitle: (s: number) => {
      if (s <= 1) return 'Province of the Indian Empire · Burma Division (Stato Kayin (Karen - Hpa-An))';
      return 'British Crown Colony · Governor of Burma (Lower Burma · Karen Hill Tracts & Salween District)';
    },
    getSovereign: (s: number) => {
      if (s <= 1) return 'RAJ';
      return 'UK';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'MM_CHI': {
    id: 'MM_CHI',
    origId: 'MM14',
    cntrCode: 'MM',
    cntrName: 'Birmania',
    name: 'Chin',
    nutsName: 'Stato Chin (Monti Chin)',
    nameLatn: 'Khyang:',
    nameEngl: 'Chin State',
    modernName: 'Stato Chin (Birmania) · Khyang:',
    historicalName: 'British Burma — Amministrazione Speciale delle Colline Chin',
    adminTitle: 'Frontier Areas Administration · Chin Hills Special Division (Falam)',
    sovereign: 'UK',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Monti Chin · Catena montuosa aspra e selvaggia al confine con l\'India (Mizoram e Manipur); capoluogo a Falam; popolazione organizzata in clan tradizionali fedeli agli accordi speciali con la Corona.',
    s2_4: 'Chin Hills · I guerrieri Chin, maestri dell\'imboscata nella fitta giungla tropicale d\'alta quota, formano i leggendari Chin Levies.',
    s5_7: 'Chin Hills · Rafforzamento delle comunicazioni di sentiero tra Falam, Tiddim e la pianura indiana di Manipur (Imphal).',
    s8: 'Chin Hills · Baluardo montano naturale di difesa della frontiera occidentale della Birmania.',
    getNote: (s: number) => {
      if (s <= 1) return 'Monti Chin · Catena montuosa aspra e selvaggia al confine con l\'India (Mizoram e Manipur); capoluogo a Falam; popolazione organizzata in clan tradizionali fedeli agli accordi speciali con la Corona.';
      if (s <= 4) return 'Chin Hills · I guerrieri Chin, maestri dell\'imboscata nella fitta giungla tropicale d\'alta quota, formano i leggendari Chin Levies.';
      if (s <= 7) return 'Chin Hills · Rafforzamento delle comunicazioni di sentiero tra Falam, Tiddim e la pianura indiana di Manipur (Imphal).';
      return 'Chin Hills · Baluardo montano naturale di difesa della frontiera occidentale della Birmania.';
    },
    getHistoricalName: (s: number) => {
      if (s <= 1) return 'Chin (Province of the Indian Empire — Rangoon)';
      return 'British Burma (Crown Colony of Burma — Stato Chin (Monti Chin))';
    },
    getAdminTitle: (s: number) => {
      if (s <= 1) return 'Province of the Indian Empire · Burma Division (Stato Chin (Monti Chin))';
      return 'British Crown Colony · Governor of Burma (Frontier Areas Administration · Chin Hills Special Division (Falam))';
    },
    getSovereign: (s: number) => {
      if (s <= 1) return 'RAJ';
      return 'UK';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'MM_MON': {
    id: 'MM_MON',
    origId: 'MM15',
    cntrCode: 'MM',
    cntrName: 'Birmania',
    name: 'Mon',
    nutsName: 'Stato Mon (Mawlamyine)',
    nameLatn: 'Mvan',
    nameEngl: 'Mon State',
    modernName: 'Stato Mon (Mawlamyine, Birmania) · Mvan',
    historicalName: 'British Burma — Territorio Mon di Moulmein',
    adminTitle: 'Lower Burma · Amherst District (Porto di Moulmein & Fiume Thanlwin)',
    sovereign: 'UK',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Moulmein (Mawlamyine) · Prima capitale della Birmania britannica dopo la guerra anglo-birmana del 1826; celebrata da Rudyard Kipling (\'By the old Moulmein Pagoda\') e George Orwell; porto di esportazione del pregiatissimo legno di teak.',
    s2_4: 'Moulmein · Scalo fluviale monumentale alla foce del fiume Salween; industrie di segheria, cantieri navali in legno e commercio di riso e caucciù.',
    s5_7: 'Moulmein · Installazione di postazioni difensive marittime costiere e stazioni idrovolanti della RAF.',
    s8: 'Moulmein · Posizione di prima linea lungo la costa del Golfo di Martaban per contrastare manovre navali o terrestri dalla Tailandia.',
    getNote: (s: number) => {
      if (s <= 1) return 'Moulmein (Mawlamyine) · Prima capitale della Birmania britannica dopo la guerra anglo-birmana del 1826; celebrata da Rudyard Kipling (\'By the old Moulmein Pagoda\') e George Orwell; porto di esportazione del pregiatissimo legno di teak.';
      if (s <= 4) return 'Moulmein · Scalo fluviale monumentale alla foce del fiume Salween; industrie di segheria, cantieri navali in legno e commercio di riso e caucciù.';
      if (s <= 7) return 'Moulmein · Installazione di postazioni difensive marittime costiere e stazioni idrovolanti della RAF.';
      return 'Moulmein · Posizione di prima linea lungo la costa del Golfo di Martaban per contrastare manovre navali o terrestri dalla Tailandia.';
    },
    getHistoricalName: (s: number) => {
      if (s <= 1) return 'Mon (Province of the Indian Empire — Rangoon)';
      return 'British Burma (Crown Colony of Burma — Stato Mon (Mawlamyine))';
    },
    getAdminTitle: (s: number) => {
      if (s <= 1) return 'Province of the Indian Empire · Burma Division (Stato Mon (Mawlamyine))';
      return 'British Crown Colony · Governor of Burma (Lower Burma · Amherst District (Porto di Moulmein & Fiume Thanlwin))';
    },
    getSovereign: (s: number) => {
      if (s <= 1) return 'RAJ';
      return 'UK';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'MM_RAK': {
    id: 'MM_RAK',
    origId: 'MM16',
    cntrCode: 'MM',
    cntrName: 'Birmania',
    name: 'Rakhine',
    nutsName: 'Arakan (Rakhine - Akyab)',
    nameLatn: 'Rakhuiṅ',
    nameEngl: 'Rakhine State',
    modernName: 'Stato Rakhine (Arakan, Birmania) · Rakhuiṅ',
    historicalName: 'British Burma — Divisione Costiera dell\'Arakan',
    adminTitle: 'Lower Burma · Arakan Division (Porto di Akyab / Sittwe & Golfo del Bengala)',
    sovereign: 'UK',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Arakan (Rakhine) · Antico regno costiero separato dal resto della Birmania dall\'imponente catena montuosa degli Arakan Yoma; porto principale ad Akyab (Sittwe), nodo commerciale di riso nel Golfo del Bengala a ridosso del Bengala britannico.',
    s2_4: 'Akyab · Forte presenza mercantile indiana e legami strettissimi con il vicino distretto di Chittagong; scalo fondamentale dei traghetti a vapore costieri.',
    s5_7: 'Akyab · L\'aeroporto militare e il porto di Akyab vengono espansi dalla Royal Air Force come testa di ponte avanzata nel Golfo del Bengala.',
    s8: 'Arakan · Baluardo marittimo occidentale di collegamento strategico diretto tra l\'India orientale e la Birmania.',
    getNote: (s: number) => {
      if (s <= 1) return 'Arakan (Rakhine) · Antico regno costiero separato dal resto della Birmania dall\'imponente catena montuosa degli Arakan Yoma; porto principale ad Akyab (Sittwe), nodo commerciale di riso nel Golfo del Bengala a ridosso del Bengala britannico.';
      if (s <= 4) return 'Akyab · Forte presenza mercantile indiana e legami strettissimi con il vicino distretto di Chittagong; scalo fondamentale dei traghetti a vapore costieri.';
      if (s <= 7) return 'Akyab · L\'aeroporto militare e il porto di Akyab vengono espansi dalla Royal Air Force come testa di ponte avanzata nel Golfo del Bengala.';
      return 'Arakan · Baluardo marittimo occidentale di collegamento strategico diretto tra l\'India orientale e la Birmania.';
    },
    getHistoricalName: (s: number) => {
      if (s <= 1) return 'Rakhine (Province of the Indian Empire — Rangoon)';
      return 'British Burma (Crown Colony of Burma — Arakan (Rakhine - Akyab))';
    },
    getAdminTitle: (s: number) => {
      if (s <= 1) return 'Province of the Indian Empire · Burma Division (Arakan (Rakhine - Akyab))';
      return 'British Crown Colony · Governor of Burma (Lower Burma · Arakan Division (Porto di Akyab / Sittwe & Golfo del Bengala))';
    },
    getSovereign: (s: number) => {
      if (s <= 1) return 'RAJ';
      return 'UK';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_DEL': {
    id: 'IN_DEL',
    origId: 'INDL',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Delhi',
    nutsName: 'Delhi (Nuova Delhi - Sede Vicereale)',
    nameLatn: 'Dillī',
    nameEngl: 'Delhi NCT',
    modernName: 'Territorio della Capitale Nazionale di Delhi (Nuova Delhi, India) · Dillī',
    historicalName: 'Impero Anglo-Indiano — Capitale Imperiale di Nuova Delhi',
    adminTitle: 'Capital of the Indian Empire · Residenza del Viceré d\'India Lord Linlithgow (Viceroy\'s House)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Nuova Delhi · Capitale imperiale dell\'Impero Anglo-Indiano, inaugurata nel 1931 con i grandiosi complessi monumentali progettati da Edwin Lutyens e Herbert Baker; il Viceré Lord Linlithgow risiede alla Viceroy\'s House (oggi Rashtrapati Bhavan).',
    s2_4: 'Nuova Delhi · Centro della diplomazia e dei negoziati politici; il Parlamento ospita i dibattiti tra il governo vicereale, il Partito del Congresso e la Lega Musulmana sull\'applicazione del Government of India Act 1935.',
    s5_7: 'Nuova Delhi · Il 3 settembre 1939 il Viceré Lord Linlithgow dichiara unilateralmente l\'India in guerra contro la Germania senza consultare i rappresentanti eletti del popolo indiano, innescando le dimissioni di massa di tutti i ministeri provinciali del Congresso.',
    s8: 'Nuova Delhi · Aprile 1941: la capitale dirige l\'imponente espansione della British Indian Army (fino a oltre 2 milioni di uomini) e pianifica la risposta militare al colpo di Stato anti-britannico di Rashid Ali in Iraq.',
    getNote: (s: number) => {
      if (s <= 1) return 'Nuova Delhi · Capitale imperiale dell\'Impero Anglo-Indiano, inaugurata nel 1931 con i grandiosi complessi monumentali progettati da Edwin Lutyens e Herbert Baker; il Viceré Lord Linlithgow risiede alla Viceroy\'s House (oggi Rashtrapati Bhavan).';
      if (s <= 4) return 'Nuova Delhi · Centro della diplomazia e dei negoziati politici; il Parlamento ospita i dibattiti tra il governo vicereale, il Partito del Congresso e la Lega Musulmana sull\'applicazione del Government of India Act 1935.';
      if (s <= 7) return 'Nuova Delhi · Il 3 settembre 1939 il Viceré Lord Linlithgow dichiara unilateralmente l\'India in guerra contro la Germania senza consultare i rappresentanti eletti del popolo indiano, innescando le dimissioni di massa di tutti i ministeri provinciali del Congresso.';
      return 'Nuova Delhi · Aprile 1941: la capitale dirige l\'imponente espansione della British Indian Army (fino a oltre 2 milioni di uomini) e pianifica la risposta militare al colpo di Stato anti-britannico di Rashid Ali in Iraq.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_BOM': {
    id: 'IN_BOM',
    origId: 'INMH',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Maharashtra',
    nutsName: 'Presidenza di Bombay (Maharashtra)',
    nameLatn: 'Mahārāṣṭra',
    nameEngl: 'Maharashtra',
    modernName: 'Stato del Maharashtra (Bombay / Mumbai, India) · Mahārāṣṭra',
    historicalName: 'Impero Anglo-Indiano — Presidenza di Bombay (Porta dell\'India)',
    adminTitle: 'Bombay Presidency · Governo di Bombay (Governor\'s Seat & Gateway of India)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Presidenza di Bombay · La \'Porta dell\'India\' (Gateway of India) e capitale finanziaria dell\'impero; sede della borsa valori, dei colossali cotonifici industriali e del comando marittimo della Royal Indian Navy.',
    s2_4: 'Bombay · Nelle elezioni del 1937 B.G. Kher forma il governo provinciale del Congresso; polo del movimento operaio tessile e delle grandi assemblee del Comitato del Congresso a Gowalia Tank.',
    s5_7: 'Bombay · Dimissioni del ministero provinciale nell\'autunno 1939; i cantieri navali di Mazagon Dock e i cotonifici vengono convertiti a pieno ritmo alla produzione di forniture militari per gli Alleati.',
    s8: 'Bombay · Aprile 1941: il porto di Bombay è il molo d\'imbarco principale per le truppe della 10ª Divisione Indiana inviate d\'urgenza nel Golfo Persico per l\'Operazione Sabine.',
    getNote: (s: number) => {
      if (s <= 1) return 'Presidenza di Bombay · La \'Porta dell\'India\' (Gateway of India) e capitale finanziaria dell\'impero; sede della borsa valori, dei colossali cotonifici industriali e del comando marittimo della Royal Indian Navy.';
      if (s <= 4) return 'Bombay · Nelle elezioni del 1937 B.G. Kher forma il governo provinciale del Congresso; polo del movimento operaio tessile e delle grandi assemblee del Comitato del Congresso a Gowalia Tank.';
      if (s <= 7) return 'Bombay · Dimissioni del ministero provinciale nell\'autunno 1939; i cantieri navali di Mazagon Dock e i cotonifici vengono convertiti a pieno ritmo alla produzione di forniture militari per gli Alleati.';
      return 'Bombay · Aprile 1941: il porto di Bombay è il molo d\'imbarco principale per le truppe della 10ª Divisione Indiana inviate d\'urgenza nel Golfo Persico per l\'Operazione Sabine.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_BEN': {
    id: 'IN_BEN',
    origId: 'INWB',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'West Bengal',
    nutsName: 'Presidenza del Bengala (Calcutta)',
    nameLatn: 'Paścimbaṅga',
    nameEngl: 'West Bengal',
    modernName: 'Stato del Bengala Occidentale (Calcutta / Kolkata, India) · Paścimbaṅga',
    historicalName: 'Impero Anglo-Indiano — Presidenza del Bengala Occidentale (Calcutta)',
    adminTitle: 'Bengal Presidency · Sede Governativa di Fort William & Metropoli Industriale di Calcutta',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Calcutta (Kolkata) · Ex capitale dell\'India britannica (fino al 1911) e seconda città dell\'Impero Britannico; dominata da Fort William, dal Victoria Memorial e dai complessi industriali siderurgici e tessili lungo il fiume Hooghly.',
    s2_4: 'Calcutta · Sede del governo di coalizione del Bengala guidato da A.K. Fazlul Huq; nel 1938-1939 Subhas Chandra Bose guida il Comitato provinciale del Congresso e fonda il blocco radicale \'Forward Bloc\'.',
    s5_7: 'Calcutta · Con lo scoppio della guerra Calcutta diventa il polo manifatturiero militare supremo dell\'India orientale, producendo munizioni, armamenti leggeri e forniture per tutto l\'Oriente.',
    s8: 'Calcutta · Nel gennaio 1941 la città è scossa dalla clamorosa fuga segreta di Subhas Chandra Bose dai domiciliari della sua casa di Elgin Road, evadendo la sorveglianza della polizia coloniale per guidare la lotta anti-britannica dall\'estero.',
    getNote: (s: number) => {
      if (s <= 1) return 'Calcutta (Kolkata) · Ex capitale dell\'India britannica (fino al 1911) e seconda città dell\'Impero Britannico; dominata da Fort William, dal Victoria Memorial e dai complessi industriali siderurgici e tessili lungo il fiume Hooghly.';
      if (s <= 4) return 'Calcutta · Sede del governo di coalizione del Bengala guidato da A.K. Fazlul Huq; nel 1938-1939 Subhas Chandra Bose guida il Comitato provinciale del Congresso e fonda il blocco radicale \'Forward Bloc\'.';
      if (s <= 7) return 'Calcutta · Con lo scoppio della guerra Calcutta diventa il polo manifatturiero militare supremo dell\'India orientale, producendo munizioni, armamenti leggeri e forniture per tutto l\'Oriente.';
      return 'Calcutta · Nel gennaio 1941 la città è scossa dalla clamorosa fuga segreta di Subhas Chandra Bose dai domiciliari della sua casa di Elgin Road, evadendo la sorveglianza della polizia coloniale per guidare la lotta anti-britannica dall\'estero.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_MAD': {
    id: 'IN_MAD',
    origId: 'INTN',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Tamil Nadu',
    nutsName: 'Presidenza di Madras (Tamil Nadu)',
    nameLatn: 'Tamiḻ Nāḍu',
    nameEngl: 'Tamil Nadu',
    modernName: 'Stato del Tamil Nadu (Madras / Chennai, India) · Tamiḻ Nāḍu',
    historicalName: 'Impero Anglo-Indiano — Presidenza di Madras (Fort St. George)',
    adminTitle: 'Madras Presidency · Fort St. George & Costa del Coromandel (Premier C. Rajagopalachari)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Presidenza di Madras · Storico bastione britannico della costa del Coromandel incentrato sullo storico Fort St. George fondato nel 1644; grande centro intellettuale, portuale e manifatturiero del sud dell\'India.',
    s2_4: 'Madras · Nelle elezioni del 1937 il leader del Congresso C. Rajagopalachari (\'Rajaji\') diventa Premier della Presidenza, introducendo il divieto dell\'alcol e promuovendo l\'alfabetizzazione popolare.',
    s5_7: 'Madras · Dimissioni del ministero Rajagopalachari nel 1939 in linea con la direttiva nazionale del Congresso; militarizzazione del porto di Madras a difesa delle rotte marittime dell\'Oceano Indiano.',
    s8: 'Madras · Fortificazione delle difese costiere e mobilitazione del Madras Regiment per il servizio attivo nelle campagne d\'oltremare.',
    getNote: (s: number) => {
      if (s <= 1) return 'Presidenza di Madras · Storico bastione britannico della costa del Coromandel incentrato sullo storico Fort St. George fondato nel 1644; grande centro intellettuale, portuale e manifatturiero del sud dell\'India.';
      if (s <= 4) return 'Madras · Nelle elezioni del 1937 il leader del Congresso C. Rajagopalachari (\'Rajaji\') diventa Premier della Presidenza, introducendo il divieto dell\'alcol e promuovendo l\'alfabetizzazione popolare.';
      if (s <= 7) return 'Madras · Dimissioni del ministero Rajagopalachari nel 1939 in linea con la direttiva nazionale del Congresso; militarizzazione del porto di Madras a difesa delle rotte marittime dell\'Oceano Indiano.';
      return 'Madras · Fortificazione delle difese costiere e mobilitazione del Madras Regiment per il servizio attivo nelle campagne d\'oltremare.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_UP': {
    id: 'IN_UP',
    origId: 'INUP',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Uttar Pradesh',
    nutsName: 'Province Unite di Agra e Oudh (Uttar Pradesh)',
    nameLatn: 'Uttar Pradeś',
    nameEngl: 'Uttar Pradesh',
    modernName: 'Stato dell\'Uttar Pradesh (Lucknow, Kanpur e Agra, India) · Uttar Pradeś',
    historicalName: 'Impero Anglo-Indiano — Province Unite di Agra e Oudh',
    adminTitle: 'United Provinces of British India (Governo di Lucknow, Allahabad & Cawnpore)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Province Unite (UP) · Cuore demografico, politico e spirituale dell\'India gangetica; include Lucknow (palazzo dei Nawab), Allahabad (sede ancestrale della famiglia Nehru ad Anand Bhavan), Agra (Taj Mahal) e la metropoli industriale di Cawnpore (Kanpur).',
    s2_4: 'Lucknow · Nel 1937 Govind Ballabh Pant forma il governo provinciale del Congresso; Cawnpore diventa il centro tessile bellico primario per le uniformi e il cuoio dell\'esercito imperiale.',
    s5_7: 'Lucknow · Dimissioni di massa del governo Pant nel 1939; Allahabad e Benares sono focolai di fervente contestazione nazionalista contro il governo del Viceré.',
    s8: 'Province Unite · Nel 1940-1941 Jawaharlal Nehru e i dirigenti provinciali guidano la campagna di Satyagraha individuale venendo arrestati dalle autorità coloniali.',
    getNote: (s: number) => {
      if (s <= 1) return 'Province Unite (UP) · Cuore demografico, politico e spirituale dell\'India gangetica; include Lucknow (palazzo dei Nawab), Allahabad (sede ancestrale della famiglia Nehru ad Anand Bhavan), Agra (Taj Mahal) e la metropoli industriale di Cawnpore (Kanpur).';
      if (s <= 4) return 'Lucknow · Nel 1937 Govind Ballabh Pant forma il governo provinciale del Congresso; Cawnpore diventa il centro tessile bellico primario per le uniformi e il cuoio dell\'esercito imperiale.';
      if (s <= 7) return 'Lucknow · Dimissioni di massa del governo Pant nel 1939; Allahabad e Benares sono focolai di fervente contestazione nazionalista contro il governo del Viceré.';
      return 'Province Unite · Nel 1940-1941 Jawaharlal Nehru e i dirigenti provinciali guidano la campagna di Satyagraha individuale venendo arrestati dalle autorità coloniali.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_PUN': {
    id: 'IN_PUN',
    origId: 'INPB',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Punjab',
    nutsName: 'Punjab Orientale (Amritsar)',
    nameLatn: 'Panjāb',
    nameEngl: 'Punjab (India)',
    modernName: 'Stato del Punjab Orientale (Amritsar e Jalandhar, India) · Panjāb',
    historicalName: 'Impero Anglo-Indiano — Provincia del Punjab (Settore Orientale)',
    adminTitle: 'Punjab Province · Distretti Orientali di Amritsar (Tempio d\'Oro & Distretti Sikh)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Punjab Orientale · Culla sacra della religione Sikh incentrata sul Tempio d\'Oro (Harmandir Sahib) ad Amritsar e teatro della memoria del massacro di Jallianwala Bagh (1919); regione agricola trainata da canali irrigui d\'avanguardia.',
    s2_4: 'Amritsar · Nelle elezioni del 1937 il Partito Unionista e il partito Sikh Akali Dal cooperano nel parlamento provinciale; ricchissima produzione di grano e cotone.',
    s5_7: 'Amritsar · I distretti sikh di Amritsar, Jalandhar e Hoshiarpur forniscono decine di migliaia di volontari per i celebri reggimenti Sikh (Sikh Regiment) dell\'esercito imperiale.',
    s8: 'Amritsar · Le truppe sikh del Punjab combattono con indomito valore in Libia ed Eritrea, distinguendosi nello sfondamento delle fortificazioni nemiche.',
    getNote: (s: number) => {
      if (s <= 1) return 'Punjab Orientale · Culla sacra della religione Sikh incentrata sul Tempio d\'Oro (Harmandir Sahib) ad Amritsar e teatro della memoria del massacro di Jallianwala Bagh (1919); regione agricola trainata da canali irrigui d\'avanguardia.';
      if (s <= 4) return 'Amritsar · Nelle elezioni del 1937 il Partito Unionista e il partito Sikh Akali Dal cooperano nel parlamento provinciale; ricchissima produzione di grano e cotone.';
      if (s <= 7) return 'Amritsar · I distretti sikh di Amritsar, Jalandhar e Hoshiarpur forniscono decine di migliaia di volontari per i celebri reggimenti Sikh (Sikh Regiment) dell\'esercito imperiale.';
      return 'Amritsar · Le truppe sikh del Punjab combattono con indomito valore in Libia ed Eritrea, distinguendosi nello sfondamento delle fortificazioni nemiche.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_RAJ': {
    id: 'IN_RAJ',
    origId: 'INRJ',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Rajasthan',
    nutsName: 'Agenzia del Rajputana (Rajasthan)',
    nameLatn: 'Rājasthān',
    nameEngl: 'Rajasthan',
    modernName: 'Stato del Rajasthan (Jaipur, Jodhpur e Udaipur, India) · Rājasthān',
    historicalName: 'Impero Anglo-Indiano — Agenzia degli Stati del Rajputana',
    adminTitle: 'Rajputana Agency (Stati Principeschi di Jaipur, Jodhpur, Udaipur, Bikaner & Kota)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Rajputana · Regno leggendario dei sovrani Rajput fedeli all\'Imperatore Britannico; include grandi principati cavallereschi come Jaipur, Jodhpur, Udaipur (Mewar) e Bikaner con 21 salve di cannone d\'onore.',
    s2_4: 'Bikaner e Jodhpur · Il Maharaja Ganga Singh di Bikaner, eminente statista firmatario del Trattato di Versailles, promuove la modernizzazione del deserto col canale Ganga Canal; creazione delle unità cammellate Ganga Risala.',
    s5_7: 'Rajputana · I Maharaja di Jaipur, Jodhpur e Bikaner mettono immediatamente tutte le proprie forze principesche e tesori a disposizione della Corona britannica per la guerra.',
    s8: 'Rajputana · I reparti di cavalleria e fanteria rajput e i corpi a cammello vengono dispiegati per la difesa della frontiera con la Persia e nel teatro mediorientale.',
    getNote: (s: number) => {
      if (s <= 1) return 'Rajputana · Regno leggendario dei sovrani Rajput fedeli all\'Imperatore Britannico; include grandi principati cavallereschi come Jaipur, Jodhpur, Udaipur (Mewar) e Bikaner con 21 salve di cannone d\'onore.';
      if (s <= 4) return 'Bikaner e Jodhpur · Il Maharaja Ganga Singh di Bikaner, eminente statista firmatario del Trattato di Versailles, promuove la modernizzazione del deserto col canale Ganga Canal; creazione delle unità cammellate Ganga Risala.';
      if (s <= 7) return 'Rajputana · I Maharaja di Jaipur, Jodhpur e Bikaner mettono immediatamente tutte le proprie forze principesche e tesori a disposizione della Corona britannica per la guerra.';
      return 'Rajputana · I reparti di cavalleria e fanteria rajput e i corpi a cammello vengono dispiegati per la difesa della frontiera con la Persia e nel teatro mediorientale.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_GUJ': {
    id: 'IN_GUJ',
    origId: 'INGJ',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Gujarat',
    nutsName: 'Gujarat e Agenzia degli Stati Occidentali',
    nameLatn: 'Gujarāt',
    nameEngl: 'Gujarat',
    modernName: 'Stato del Gujarat (Ahmedabad, Surat e Baroda, India) · Gujarāt',
    historicalName: 'Impero Anglo-Indiano — Stati e Divisioni del Gujarat',
    adminTitle: 'Western India States Agency & Baroda Residency (Maharaja Gaekwad & Distretti di Ahmedabad)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Gujarat · Culla del Mahatma Gandhi e del movimento Satyagraha (marcia del sale di Dandi del 1930); include la potente metropoli industriale tessile di Ahmedabad (la \'Manchester dell\'India\') e l\'avanzato Stato Principesco di Baroda dei Gaekwad.',
    s2_4: 'Ahmedabad · Vallabhbhai Patel (\'Sardar\') guida il movimento nazionalista e la rete organizzativa del Congresso; Baroda vanta uno dei sistemi educativi e sociali più moderni di tutta l\'Asia.',
    s5_7: 'Gujarat · I cotonifici di Ahmedabad e i porti commerciali di Surat e del Golfo di Cambay riforniscono di tessuti e materiali le armate alleate.',
    s8: 'Gujarat · Centro di mobilitazione patriottica per il Satyagraha nonviolento e sorveglianza delle coste del Kathiawar.',
    getNote: (s: number) => {
      if (s <= 1) return 'Gujarat · Culla del Mahatma Gandhi e del movimento Satyagraha (marcia del sale di Dandi del 1930); include la potente metropoli industriale tessile di Ahmedabad (la \'Manchester dell\'India\') e l\'avanzato Stato Principesco di Baroda dei Gaekwad.';
      if (s <= 4) return 'Ahmedabad · Vallabhbhai Patel (\'Sardar\') guida il movimento nazionalista e la rete organizzativa del Congresso; Baroda vanta uno dei sistemi educativi e sociali più moderni di tutta l\'Asia.';
      if (s <= 7) return 'Gujarat · I cotonifici di Ahmedabad e i porti commerciali di Surat e del Golfo di Cambay riforniscono di tessuti e materiali le armate alleate.';
      return 'Gujarat · Centro di mobilitazione patriottica per il Satyagraha nonviolento e sorveglianza delle coste del Kathiawar.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_HYD': {
    id: 'IN_HYD',
    origId: 'INTG',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Telangana',
    nutsName: 'Stato Principesco di Hyderabad (Nizam)',
    nameLatn: 'Telangāṇa',
    nameEngl: 'Telangana',
    modernName: 'Stato del Telangana (Hyderabad, India) · Telangāṇa',
    historicalName: 'Impero Anglo-Indiano — Dominio del Nizam di Hyderabad',
    adminTitle: 'Hyderabad State · Dinastia Asaf Jahi (S.E.H. Mir Osman Ali Khan, 7° Nizam di Hyderabad)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Hyderabad · Il più grande, ricco e popoloso Stato Principesco di tutta l\'India; guidato da S.E.H. il Nizam Mir Osman Ali Khan (nominato dal Time \'uomo più ricco del mondo\' nel 1937 con un patrimonio superiore al 2% del PIL USA); vanta propria moneta (rupia Osmania), ferrovia statale e l\'Università Osmania.',
    s2_4: 'Hyderabad · Il Nizam mantiene uno statuto di fedelissimo alleato della Corona (\'Faithful Ally of the British Government\') con 21 salve di cannone; sviluppo urbanistico moderno della capitale Hyderabad.',
    s5_7: 'Hyderabad · Allo scoppio della guerra il Nizam dona milioni di sterline alla Gran Bretagna, finanziando due squadriglie della RAF (No. 110 e No. 152 \'Hyderabad\' Squadrons) e una corvetta navale della Royal Navy.',
    s8: 'Hyderabad · I reggimenti dell\'Hyderabad State Forces vengono mobilitati e inviati nei teatri operativi imperiali per compiti di presidio e supporto avanzato.',
    getNote: (s: number) => {
      if (s <= 1) return 'Hyderabad · Il più grande, ricco e popoloso Stato Principesco di tutta l\'India; guidato da S.E.H. il Nizam Mir Osman Ali Khan (nominato dal Time \'uomo più ricco del mondo\' nel 1937 con un patrimonio superiore al 2% del PIL USA); vanta propria moneta (rupia Osmania), ferrovia statale e l\'Università Osmania.';
      if (s <= 4) return 'Hyderabad · Il Nizam mantiene uno statuto di fedelissimo alleato della Corona (\'Faithful Ally of the British Government\') con 21 salve di cannone; sviluppo urbanistico moderno della capitale Hyderabad.';
      if (s <= 7) return 'Hyderabad · Allo scoppio della guerra il Nizam dona milioni di sterline alla Gran Bretagna, finanziando due squadriglie della RAF (No. 110 e No. 152 \'Hyderabad\' Squadrons) e una corvetta navale della Royal Navy.';
      return 'Hyderabad · I reggimenti dell\'Hyderabad State Forces vengono mobilitati e inviati nei teatri operativi imperiali per compiti di presidio e supporto avanzato.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_MYS': {
    id: 'IN_MYS',
    origId: 'INKA',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Karnataka',
    nutsName: 'Stato Principesco di Mysore (Karnataka)',
    nameLatn: 'Karnāṭaka',
    nameEngl: 'Karnataka',
    modernName: 'Stato del Karnataka (Bangalore / Bengaluru e Mysore, India) · Karnāṭaka',
    historicalName: 'Impero Anglo-Indiano — Stato Principesco di Mysore',
    adminTitle: 'Kingdom of Mysore · Dinastia Wadiyar (Maharaja Krishnaraja Wadiyar IV / Jayachamarajendra Wadiyar)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Mysore · Considerato lo \'Stato modello\' dell\'India britannica per progresso tecnologico e industriale; include il monumentale palazzo reale di Mysore e la stazione militare e polo scientifico di Bangalore (Indian Institute of Science).',
    s2_4: 'Bangalore · Sfruttamento pionieristico dell\'energia idroelettrica alle cascate di Shivanasamudra e miniere d\'oro di Kolar (KGF), le più profonde del pianeta.',
    s5_7: 'Bangalore · Nel 1940 a Bangalore viene fondata la Hindustan Aircraft Limited (HAL) per la revisione e assemblaggio di aerei militari della RAF e dell\'USAAF.',
    s8: 'Mysore · I battaglioni delle Mysore Lancers e delle fanterie dello Stato vengono dispiegati per la sicurezza imperiale in Medio Oriente.',
    getNote: (s: number) => {
      if (s <= 1) return 'Mysore · Considerato lo \'Stato modello\' dell\'India britannica per progresso tecnologico e industriale; include il monumentale palazzo reale di Mysore e la stazione militare e polo scientifico di Bangalore (Indian Institute of Science).';
      if (s <= 4) return 'Bangalore · Sfruttamento pionieristico dell\'energia idroelettrica alle cascate di Shivanasamudra e miniere d\'oro di Kolar (KGF), le più profonde del pianeta.';
      if (s <= 7) return 'Bangalore · Nel 1940 a Bangalore viene fondata la Hindustan Aircraft Limited (HAL) per la revisione e assemblaggio di aerei militari della RAF e dell\'USAAF.';
      return 'Mysore · I battaglioni delle Mysore Lancers e delle fanterie dello Stato vengono dispiegati per la sicurezza imperiale in Medio Oriente.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_KER': {
    id: 'IN_KER',
    origId: 'INKL',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Kerala',
    nutsName: 'Stati di Travancore e Cochin (Kerala)',
    nameLatn: 'Kēraḷam',
    nameEngl: 'Kerala',
    modernName: 'Stato del Kerala (Trivandrum / Kochi, India) · Kēraḷam',
    historicalName: 'Impero Anglo-Indiano — Stati di Travancore e Cochin (Costa Malabarica)',
    adminTitle: 'Madras States Agency (Regni Principeschi di Travancore & Cochin, Porto di Cochin)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Travancore e Cochin · Stati principeschi meridionali della costa del Malabar famosi per le spezie e l\'altissimo livello di alfabetizzazione; nel 1936 il Maharaja di Travancore emana il celebre Proclama di apertura dei templi agli intoccabili.',
    s2_4: 'Porto di Cochin · Inaugurazione del moderno porto marittimo in acque profonde di Willingdon Island a Cochin, snodo marittimo imperiale.',
    s5_7: 'Travancore · Importante produzione di gomma naturale, caucciù e sabbie monazitiche (torio) classificate come risorse strategiche segrete della Corona.',
    s8: 'Cochin · Base navale di riparazione e scalo di rifornimento per i convogli alleati nell\'Oceano Indiano.',
    getNote: (s: number) => {
      if (s <= 1) return 'Travancore e Cochin · Stati principeschi meridionali della costa del Malabar famosi per le spezie e l\'altissimo livello di alfabetizzazione; nel 1936 il Maharaja di Travancore emana il celebre Proclama di apertura dei templi agli intoccabili.';
      if (s <= 4) return 'Porto di Cochin · Inaugurazione del moderno porto marittimo in acque profonde di Willingdon Island a Cochin, snodo marittimo imperiale.';
      if (s <= 7) return 'Travancore · Importante produzione di gomma naturale, caucciù e sabbie monazitiche (torio) classificate come risorse strategiche segrete della Corona.';
      return 'Cochin · Base navale di riparazione e scalo di rifornimento per i convogli alleati nell\'Oceano Indiano.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_JK': {
    id: 'IN_JK',
    origId: 'INJK',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Jammu and Kashmir',
    nutsName: 'Stato Principesco di Jammu e Kashmir (Srinagar)',
    nameLatn: 'Jammū va Kaśmīr',
    nameEngl: 'Jammu and Kashmir',
    modernName: 'Stato del Jammu e Kashmir (Srinagar e Jammu, India) · Jammū va Kaśmīr',
    historicalName: 'Impero Anglo-Indiano — Stato Principesco di Jammu e Kashmir',
    adminTitle: 'Jammu and Kashmir State · Dinastia Dogra (Maharaja Hari Singh, Sede Estiva di Srinagar)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Valle del Kashmir · Incantevole principato himalayano retto dal Maharaja Hari Singh; capitale estiva a Srinagar sulle rive del Lago Dal; vivace fermento politico guidato dallo Sheikh Abdullah e dalla National Conference.',
    s2_4: 'Srinagar · Riforme politiche limitate con l\'Assemblea Praja Sabha; polo turistico d\'élite per gli ufficiali britannici con le tipiche case galleggianti (houseboat) sul Lago Dal.',
    s5_7: 'Kashmir · Il Maharaja offre le proprie truppe di montagna (1st e 2nd Kashmir Mountain Batteries) e fondi cospicui al governo imperiale per lo sforzo bellico.',
    s8: 'Srinagar · Le batterie da montagna del Kashmir vengono dispiegate in Medio Oriente e Nordafrica, distinguendosi nei combattimenti in quota.',
    getNote: (s: number) => {
      if (s <= 1) return 'Valle del Kashmir · Incantevole principato himalayano retto dal Maharaja Hari Singh; capitale estiva a Srinagar sulle rive del Lago Dal; vivace fermento politico guidato dallo Sheikh Abdullah e dalla National Conference.';
      if (s <= 4) return 'Srinagar · Riforme politiche limitate con l\'Assemblea Praja Sabha; polo turistico d\'élite per gli ufficiali britannici con le tipiche case galleggianti (houseboat) sul Lago Dal.';
      if (s <= 7) return 'Kashmir · Il Maharaja offre le proprie truppe di montagna (1st e 2nd Kashmir Mountain Batteries) e fondi cospicui al governo imperiale per lo sforzo bellico.';
      return 'Srinagar · Le batterie da montagna del Kashmir vengono dispiegate in Medio Oriente e Nordafrica, distinguendosi nei combattimenti in quota.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_LAD': {
    id: 'IN_LAD',
    origId: 'INLA',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Ladakh',
    nutsName: 'Ladakh (Leh e Zanskar)',
    nameLatn: 'Ladākh',
    nameEngl: 'Ladakh',
    modernName: 'Territorio del Ladakh (Leh e Kargil, India) · Ladākh',
    historicalName: 'Impero Anglo-Indiano — Territorio di Ladakh (Leh e Zanskar)',
    adminTitle: 'Stato Principesco di Jammu e Kashmir · Distretto Frontierale del Ladakh (Leh & Zanskar)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Ladakh (\'Piccolo Tibet\') · Altopiano desertico d\'alta quota cinto da vette himalayane e popolato da comunità buddiste; Leh è lo snodo carovaniero secolare della Via della Seta verso Yarkand e Kashgar nello Xinjiang.',
    s2_4: 'Leh · Monitoraggio britannico della frontiera con il Tibet teocratico del Dalai Lama e il turbolento bacino del Tarim dominato dal generale Sheng Shicai.',
    s5_7: 'Ladakh · Vigilanza dei passi montani di Khardung La e Chang La; le carovane continuano a trasportare lana pashmina e merci attraverso l\'Himalaya.',
    s8: 'Ladakh · Presidio pacifico dei monasteri buddisti di Hemis e Thiksey a guardia del confine nord-orientale dell\'Impero.',
    getNote: (s: number) => {
      if (s <= 1) return 'Ladakh (\'Piccolo Tibet\') · Altopiano desertico d\'alta quota cinto da vette himalayane e popolato da comunità buddiste; Leh è lo snodo carovaniero secolare della Via della Seta verso Yarkand e Kashgar nello Xinjiang.';
      if (s <= 4) return 'Leh · Monitoraggio britannico della frontiera con il Tibet teocratico del Dalai Lama e il turbolento bacino del Tarim dominato dal generale Sheng Shicai.';
      if (s <= 7) return 'Ladakh · Vigilanza dei passi montani di Khardung La e Chang La; le carovane continuano a trasportare lana pashmina e merci attraverso l\'Himalaya.';
      return 'Ladakh · Presidio pacifico dei monasteri buddisti di Hemis e Thiksey a guardia del confine nord-orientale dell\'Impero.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_MP': {
    id: 'IN_MP',
    origId: 'INMP',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Madhya Pradesh',
    nutsName: 'Province Centrali e Berar (Madhya Pradesh)',
    nameLatn: 'Madhya Pradeś',
    nameEngl: 'Madhya Pradesh',
    modernName: 'Stato del Madhya Pradesh (Bhopal, Jabalpur e Gwalior, India) · Madhya Pradeś',
    historicalName: 'Impero Anglo-Indiano — Province Centrali e Berar (Nagpur e Jabalpur)',
    adminTitle: 'Central Provinces and Berar · Governo di Nagpur (Premier N.B. Khare / R.S. Shukla)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Province Centrali e Berar · Vasto territorio centrale che unisce i distretti britannici di Nagpur e Jabalpur con l\'amministrazione del Berar (in concessione perenne dal Nizam di Hyderabad) e principati come Gwalior e Bhopal.',
    s2_4: 'Nagpur · Nel 1937 si insedia il governo provinciale del Congresso guidato da N.B. Khare e poi Pandit Ravi Shankar Shukla; Jabalpur ospita la grande fabbrica imperiale di munizioni e armamenti Gun Carriage Factory.',
    s5_7: 'Nagpur · Dimissioni del governo provinciale nel 1939; la Gun Carriage Factory di Jabalpur lavora a ritmo continuo per la produzione di pezzi d\'artiglieria.',
    s8: 'Province Centrali · Centro logistico ferroviario e deposito di munizioni centrale protetto nel cuore geografico del subcontinente indiano.',
    getNote: (s: number) => {
      if (s <= 1) return 'Province Centrali e Berar · Vasto territorio centrale che unisce i distretti britannici di Nagpur e Jabalpur con l\'amministrazione del Berar (in concessione perenne dal Nizam di Hyderabad) e principati come Gwalior e Bhopal.';
      if (s <= 4) return 'Nagpur · Nel 1937 si insedia il governo provinciale del Congresso guidato da N.B. Khare e poi Pandit Ravi Shankar Shukla; Jabalpur ospita la grande fabbrica imperiale di munizioni e armamenti Gun Carriage Factory.';
      if (s <= 7) return 'Nagpur · Dimissioni del governo provinciale nel 1939; la Gun Carriage Factory di Jabalpur lavora a ritmo continuo per la produzione di pezzi d\'artiglieria.';
      return 'Province Centrali · Centro logistico ferroviario e deposito di munizioni centrale protetto nel cuore geografico del subcontinente indiano.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_BIH': {
    id: 'IN_BIH',
    origId: 'INBR',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Bihar',
    nutsName: 'Provincia del Bihar (Patna)',
    nameLatn: 'Bihār',
    nameEngl: 'Bihar',
    modernName: 'Stato del Bihar (Patna e Gaya, India) · Bihār',
    historicalName: 'Impero Anglo-Indiano — Provincia di Bihar',
    adminTitle: 'Bihar Province · Separata dall\'Orissa nel 1936 (Sede Governativa di Patna, Premier Sri Krishna Sinha)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Bihar · Il 1° aprile 1936 il Bihar viene separato dall\'Orissa diventando provincia autonoma; culla millenaria del buddismo (Bodh Gaya) e della cultura maurya (Patna/Pataliputra); valle gangetica intensamente coltivata a canna da zucchero e riso.',
    s2_4: 'Patna · Nel 1937 Sri Krishna Sinha forma il governo del Congresso; celebre per le riforme di tutela dei contadini contro i proprietari fondiari e il movimento Kisan Sabha di Swami Sahajanand Saraswati.',
    s5_7: 'Patna · Dimissioni del ministero provinciale nel novembre 1939; mobilitazione di contingenti di fanteria e forniture agricole per lo sforzo bellico.',
    s8: 'Patna · La provincia è uno dei centri più caldi della protesta anticoloniale; arresti di massa dei leader del Congresso.',
    getNote: (s: number) => {
      if (s <= 1) return 'Bihar · Il 1° aprile 1936 il Bihar viene separato dall\'Orissa diventando provincia autonoma; culla millenaria del buddismo (Bodh Gaya) e della cultura maurya (Patna/Pataliputra); valle gangetica intensamente coltivata a canna da zucchero e riso.';
      if (s <= 4) return 'Patna · Nel 1937 Sri Krishna Sinha forma il governo del Congresso; celebre per le riforme di tutela dei contadini contro i proprietari fondiari e il movimento Kisan Sabha di Swami Sahajanand Saraswati.';
      if (s <= 7) return 'Patna · Dimissioni del ministero provinciale nel novembre 1939; mobilitazione di contingenti di fanteria e forniture agricole per lo sforzo bellico.';
      return 'Patna · La provincia è uno dei centri più caldi della protesta anticoloniale; arresti di massa dei leader del Congresso.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_JHA': {
    id: 'IN_JHA',
    origId: 'INJH',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Jharkhand',
    nutsName: 'Chota Nagpur e Bacini Minerari (Jharkhand)',
    nameLatn: 'Jhārkhaṇḍ',
    nameEngl: 'Jharkhand',
    modernName: 'Stato del Jharkhand (Ranchi e Jamshedpur, India) · Jhārkhaṇḍ',
    historicalName: 'Impero Anglo-Indiano — Divisione di Chota Nagpur e Acciaierie Tata',
    adminTitle: 'Chota Nagpur Division · Distretto Siderurgico di Jamshedpur (TISCO) & Ranchi',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Chota Nagpur (Jharkhand) · Cuore minerario e siderurgico dell\'Asia meridionale; include Ranchi (capitale estiva del Bihar) e la città industriale di Jamshedpur, sede della Tata Iron and Steel Company (TISCO), il più grande complesso siderurgico dell\'Impero Britannico.',
    s2_4: 'Jamshedpur · Gli stabilimenti Tata producono milioni di tonnellate di acciaio e rotaie ferroviarie; forte presenza di comunità indigene adivasi (Santali e Munda) nell\'altopiano di Chota Nagpur.',
    s5_7: 'Jamshedpur · L\'acciaieria TISCO viene posta sotto stretta sorveglianza militare come bersaglio e risorsa strategica primaria: produce le piastre corazzate per i carri armati e i veicoli da combattimento alleati \'Tatanagar\'.',
    s8: 'Jamshedpur · La produzione siderurgica tocca picchi record rifornendo l\'Esercito Anglo-Indiano e i teatri operativi del Medio Oriente e della Birmania.',
    getNote: (s: number) => {
      if (s <= 1) return 'Chota Nagpur (Jharkhand) · Cuore minerario e siderurgico dell\'Asia meridionale; include Ranchi (capitale estiva del Bihar) e la città industriale di Jamshedpur, sede della Tata Iron and Steel Company (TISCO), il più grande complesso siderurgico dell\'Impero Britannico.';
      if (s <= 4) return 'Jamshedpur · Gli stabilimenti Tata producono milioni di tonnellate di acciaio e rotaie ferroviarie; forte presenza di comunità indigene adivasi (Santali e Munda) nell\'altopiano di Chota Nagpur.';
      if (s <= 7) return 'Jamshedpur · L\'acciaieria TISCO viene posta sotto stretta sorveglianza militare come bersaglio e risorsa strategica primaria: produce le piastre corazzate per i carri armati e i veicoli da combattimento alleati \'Tatanagar\'.';
      return 'Jamshedpur · La produzione siderurgica tocca picchi record rifornendo l\'Esercito Anglo-Indiano e i teatri operativi del Medio Oriente e della Birmania.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_ORI': {
    id: 'IN_ORI',
    origId: 'INOR',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Orissa',
    nutsName: 'Provincia di Orissa (Odisha)',
    nameLatn: 'Oḍiśā',
    nameEngl: 'Orissa Province',
    modernName: 'Stato dell\'Odisha (Cuttack, Puri e Bhubaneswar, India) · Oḍiśā',
    historicalName: 'Impero Anglo-Indiano — Provincia di Orissa',
    adminTitle: 'Orissa Province · Istituita su base linguistica nel 1936 (Sede Governativa di Cuttack, Premier Biswanath Das)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Orissa · Il 1° aprile 1936 l\'Orissa viene costituita come prima provincia su base linguistica dell\'India britannica; capitale a Cuttack, centro spirituale a Puri con il celebre Tempio di Jagannath; costa solcata dal delta del Mahanadi.',
    s2_4: 'Cuttack · Nelle elezioni del 1937 Biswanath Das forma il governo provinciale del Congresso, promuovendo il soccorso per le periodiche alluvioni e la tutela dei contadini.',
    s5_7: 'Cuttack · Dimissioni del ministero nel 1939; militarizzazione della costa del Golfo del Bengala e del porto di Chandbali.',
    s8: 'Orissa · Difesa costiera rinforzata per proteggere le vie marittime di collegamento tra Madras e Calcutta.',
    getNote: (s: number) => {
      if (s <= 1) return 'Orissa · Il 1° aprile 1936 l\'Orissa viene costituita come prima provincia su base linguistica dell\'India britannica; capitale a Cuttack, centro spirituale a Puri con il celebre Tempio di Jagannath; costa solcata dal delta del Mahanadi.';
      if (s <= 4) return 'Cuttack · Nelle elezioni del 1937 Biswanath Das forma il governo provinciale del Congresso, promuovendo il soccorso per le periodiche alluvioni e la tutela dei contadini.';
      if (s <= 7) return 'Cuttack · Dimissioni del ministero nel 1939; militarizzazione della costa del Golfo del Bengala e del porto di Chandbali.';
      return 'Orissa · Difesa costiera rinforzata per proteggere le vie marittime di collegamento tra Madras e Calcutta.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_ASS': {
    id: 'IN_ASS',
    origId: 'INAS',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Assam',
    nutsName: 'Provincia dell\'Assam (Valle del Brahmaputra)',
    nameLatn: 'Asam',
    nameEngl: 'Assam Province',
    modernName: 'Stato dell\'Assam (Guwahati e Shillong, India) · Asam',
    historicalName: 'Impero Anglo-Indiano — Provincia di Assam',
    adminTitle: 'Assam Province · Sede Governativa a Shillong (Premier Sir Muhammad Saadulla / Gopinath Bordoloi)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Assam · Vasta provincia nord-orientale incentrata sulla maestosa valle del fiume Brahmaputra e sulle colline di Shillong; capitale mondiale del tè e sede a Digboi della più antica raffineria petrolifera d\'Asia (Assam Oil Company).',
    s2_4: 'Shillong · Alternanza politica tra il governo di Sir Muhammad Saadulla (Lega Musulmana) e Gopinath Bordoloi (Congresso); espansione della ferrovia strategica Assam-Bengal Railway.',
    s5_7: 'Digboi · La produzione di greggio e benzina avio di Digboi diventa vitale per le operazioni aeree alleate; forte espansione delle basi aeree britanniche lungo il Brahmaputra.',
    s8: 'Assam · Piattaforma strategica avanzata di retrovia e rifornimento per la Burma Road e per la difesa contro ogni potenziale minaccia asiatica.',
    getNote: (s: number) => {
      if (s <= 1) return 'Assam · Vasta provincia nord-orientale incentrata sulla maestosa valle del fiume Brahmaputra e sulle colline di Shillong; capitale mondiale del tè e sede a Digboi della più antica raffineria petrolifera d\'Asia (Assam Oil Company).';
      if (s <= 4) return 'Shillong · Alternanza politica tra il governo di Sir Muhammad Saadulla (Lega Musulmana) e Gopinath Bordoloi (Congresso); espansione della ferrovia strategica Assam-Bengal Railway.';
      if (s <= 7) return 'Digboi · La produzione di greggio e benzina avio di Digboi diventa vitale per le operazioni aeree alleate; forte espansione delle basi aeree britanniche lungo il Brahmaputra.';
      return 'Assam · Piattaforma strategica avanzata di retrovia e rifornimento per la Burma Road e per la difesa contro ogni potenziale minaccia asiatica.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_ARU': {
    id: 'IN_ARU',
    origId: 'INAR',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Arunachal Pradesh',
    nutsName: 'Frontiera Nord-Orientale (Linea McMahon)',
    nameLatn: 'Aruṇācal Pradeś',
    nameEngl: 'North-East Frontier Agency',
    modernName: 'Stato dell\'Arunachal Pradesh (Itanagar e Tawang, India) · Aruṇācal Pradeś',
    historicalName: 'Impero Anglo-Indiano — Trattati della Frontiera Nord-Orientale (NEFA / Linea McMahon)',
    adminTitle: 'North-East Frontier Agency (NEFA) · Controllo di Frontiera della Linea McMahon (Tawang & Pasighat)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Frontiera Nord-Orientale (NEFA) · Aspra barriera montuosa himalayana tra l\'Assam e il Tibet, formalizzata dal Trattato di Simla del 1914 con la celebre \'Linea McMahon\'; sede del monumentale monastero buddista tibetano di Tawang.',
    s2_4: 'NEFA · Pattugliamento britannico dei passi himalayani e amministrazione tribale indiretta attraverso agenti politici delle frontiere (Pasighat e Balipara Frontier Tracts).',
    s5_7: 'Linea McMahon · Consolidamento delle postazioni di confine e monitoraggio rigoroso delle valli montane verso Lhasa e la Cina.',
    s8: 'Tawang · Presidio pacifico dei passi di frontiera himalayani a protezione della vallata del Brahmaputra.',
    getNote: (s: number) => {
      if (s <= 1) return 'Frontiera Nord-Orientale (NEFA) · Aspra barriera montuosa himalayana tra l\'Assam e il Tibet, formalizzata dal Trattato di Simla del 1914 con la celebre \'Linea McMahon\'; sede del monumentale monastero buddista tibetano di Tawang.';
      if (s <= 4) return 'NEFA · Pattugliamento britannico dei passi himalayani e amministrazione tribale indiretta attraverso agenti politici delle frontiere (Pasighat e Balipara Frontier Tracts).';
      if (s <= 7) return 'Linea McMahon · Consolidamento delle postazioni di confine e monitoraggio rigoroso delle valli montane verso Lhasa e la Cina.';
      return 'Tawang · Presidio pacifico dei passi di frontiera himalayani a protezione della vallata del Brahmaputra.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_GOA': {
    id: 'IN_GOA',
    origId: 'INGA',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Goa',
    nutsName: 'Goa (India Portoghese / Estado da Índia)',
    nameLatn: 'Goā',
    nameEngl: 'Portuguese India (Goa)',
    modernName: 'Stato di Goa (Panaji / Nova Goa, India) · Goā',
    historicalName: 'Stato Portoghese dell\'India — Governo di Goa (Nova Goa)',
    adminTitle: 'Estado Português da Índia · Governo-Geral de Goa (Palácio do Idalcão, Nova Goa)',
    sovereign: 'POR',
    overlord: 'POR',
    faction: 'Neutrale',
    s0_1: 'Goa (Estado da Índia) · Possedimento portoghese sin dal 1510 guidato dal Governatore Generale a Nova Goa (Panaji); capitale asiatica della fede cattolica con la Basilica del Bom Jesus (tomba di San Francesco Saverio); neutrale.',
    s2_4: 'Goa · Il porto neutrale di Mormugao accoglie navi mercantili internazionali; il governo di Lisbona (Estado Novo di Salazar) ribadisce la piena neutralità dei territori d\'oltremare.',
    s5_7: 'Mormugao · Con lo scoppio della guerra tre mercantili tedeschi e uno italiano si rifugiano nel porto neutrale di Mormugao per sfuggire al blocco navale della Royal Navy.',
    s8: 'Goa · Mormugao resta un\'oasi neutrale sorvegliata a distanza dai servizi segreti britannici (SOE) a Bombay per prevenire trasmissioni radio clandestine verso gli U-Boot nell\'Oceano Indiano.',
    getNote: (s: number) => {
      if (s <= 1) return 'Goa (Estado da Índia) · Possedimento portoghese sin dal 1510 guidato dal Governatore Generale a Nova Goa (Panaji); capitale asiatica della fede cattolica con la Basilica del Bom Jesus (tomba di San Francesco Saverio); neutrale.';
      if (s <= 4) return 'Goa · Il porto neutrale di Mormugao accoglie navi mercantili internazionali; il governo di Lisbona (Estado Novo di Salazar) ribadisce la piena neutralità dei territori d\'oltremare.';
      if (s <= 7) return 'Mormugao · Con lo scoppio della guerra tre mercantili tedeschi e uno italiano si rifugiano nel porto neutrale di Mormugao per sfuggire al blocco navale della Royal Navy.';
      return 'Goa · Mormugao resta un\'oasi neutrale sorvegliata a distanza dai servizi segreti britannici (SOE) a Bombay per prevenire trasmissioni radio clandestine verso gli U-Boot nell\'Oceano Indiano.';
    },
  },
  'IN_PON': {
    id: 'IN_PON',
    origId: 'INPY',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Puducherry',
    nutsName: 'Pondichéry (Stabilimenti Francesi dell\'India)',
    nameLatn: 'Puduccēri',
    nameEngl: 'French India (Pondicherry)',
    modernName: 'Territorio di Puducherry (Pondichéry, India) · Puduccēri',
    historicalName: 'Stabilimenti Francesi dell\'India — Comptoir de Pondichéry',
    adminTitle: 'Établissements français dans l\'Inde · Gouverneur de Pondichéry (Louis Bonvin)',
    sovereign: 'FRA',
    overlord: 'FRA',
    faction: 'Alleati',
    s0_1: 'Pondichéry · Capitale dei cinque stabilimenti commerciali francesi in India (Pondichéry, Karikal, Mahé, Yanaon e Chandernagor); città costiera divisa tra la \'Ville Blanche\' coloniale e la \'Ville Noire\' tamil; sede dell\'Ashram di Sri Aurobindo.',
    s2_4: 'Pondichéry · Amministrazione del Governatore Louis Bonvin; accordi doganali e convivenza pacifica con l\'accerchiante Presidenza di Madras britannica.',
    s5_7: 'Pondichéry · Nel giugno 1940, dopo la resa della Francia e l\'armistizio, il Governatore Louis Bonvin e la popolazione rifiutano il regime collaborazionista di Vichy e nel settembre 1940 proclamano lo storico ralliement al generale Charles de Gaulle e alla Francia Libera (France Libre).',
    s8: 'Pondichéry · Baluardo fedele della Francia Libera e degli Alleati; volontari franco-indiani si arruolano nelle Forces Françaises Libres per combattere in Africa ed Europa.',
    getNote: (s: number) => {
      if (s <= 1) return 'Pondichéry · Capitale dei cinque stabilimenti commerciali francesi in India (Pondichéry, Karikal, Mahé, Yanaon e Chandernagor); città costiera divisa tra la \'Ville Blanche\' coloniale e la \'Ville Noire\' tamil; sede dell\'Ashram di Sri Aurobindo.';
      if (s <= 4) return 'Pondichéry · Amministrazione del Governatore Louis Bonvin; accordi doganali e convivenza pacifica con l\'accerchiante Presidenza di Madras britannica.';
      if (s <= 7) return 'Pondichéry · Nel giugno 1940, dopo la resa della Francia e l\'armistizio, il Governatore Louis Bonvin e la popolazione rifiutano il regime collaborazionista di Vichy e nel settembre 1940 proclamano lo storico ralliement al generale Charles de Gaulle e alla Francia Libera (France Libre).';
      return 'Pondichéry · Baluardo fedele della Francia Libera e degli Alleati; volontari franco-indiani si arruolano nelle Forces Françaises Libres per combattere in Africa ed Europa.';
    },
    getSovereign: (s: number) => {
      return s >= 7 ? 'FFL_AEF' : 'FRA';
    },
    getFaction: (s: number) => {
      return 'Alleati';
    },
  },
  'IN_DNH_DAM': {
    id: 'IN_DNH_DAM',
    origId: 'INDH',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Dadra & Nagar Haveli and Daman & Diu',
    nutsName: 'Dadra, Nagar Haveli, Daman e Diu',
    nameLatn: 'Dādrā va Nagar Havelī and Damān va Dīv',
    nameEngl: 'Daman, Diu and Dadra-Nagar Haveli',
    modernName: 'Territorio di Dadra e Nagar Haveli e Daman e Diu (India)',
    historicalName: 'Stato Portoghese dell\'India — Distretti di Damão, Diu e Enclave di Dadra-Nagar Haveli',
    adminTitle: 'Estado Português da Índia · Distritos de Damão e Diu & Enclave de Dadrá e Nagar Aveli',
    sovereign: 'POR',
    overlord: 'POR',
    faction: 'Neutrale',
    s0_1: 'Damão e Diu · Storiche fortezze marittime portoghesi del XVI secolo all\'imboccatura del Golfo di Cambay con l\'enclave rurale interna di Dadra e Nagar Haveli (Silvassa); territori neutrali dell\'Estado da Índia.',
    s2_4: 'Damão e Diu · Pacifica vita doganale e marinara circondata dalle terre della Presidenza di Bombay; neutralità salazarista.',
    s5_7: 'Damão e Diu · Rigorosa neutralità durante il conflitto mondiale ed esenzione dalle requisizioni belliche britanniche.',
    s8: 'Damão e Diu · Sentinelle di pietra fortificate sul litorale gujarati testimoni della secolare presenza lusitana in Asia.',
    getNote: (s: number) => {
      if (s <= 1) return 'Damão e Diu · Storiche fortezze marittime portoghesi del XVI secolo all\'imboccatura del Golfo di Cambay con l\'enclave rurale interna di Dadra e Nagar Haveli (Silvassa); territori neutrali dell\'Estado da Índia.';
      if (s <= 4) return 'Damão e Diu · Pacifica vita doganale e marinara circondata dalle terre della Presidenza di Bombay; neutralità salazarista.';
      if (s <= 7) return 'Damão e Diu · Rigorosa neutralità durante il conflitto mondiale ed esenzione dalle requisizioni belliche britanniche.';
      return 'Damão e Diu · Sentinelle di pietra fortificate sul litorale gujarati testimoni della secolare presenza lusitana in Asia.';
    },
  },
  'IN_DNH': {
    id: 'IN_DNH',
    origId: 'INDH_INLAND',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Dadra and Nagar Haveli',
    nutsName: 'Dadra e Nagar Haveli (Silvassa)',
    nameLatn: 'Dādrā va Nagar Havelī',
    nameEngl: 'Dadra and Nagar Haveli',
    modernName: 'Territorio di Dadra e Nagar Haveli (India)',
    historicalName: 'Enclave Portoghese di Dadra e Nagar Haveli (Silvassa)',
    adminTitle: 'Estado Português da Índia · Distrito de Damão — Concelho de Nagar Aveli e Enclave de Dadrá',
    sovereign: 'POR',
    overlord: 'POR',
    faction: 'Neutrale',
    s0_1: "Enclavi interne portoghesi di Dadrá e Nagar Haveli (Silvassa), interamente circondate dalla Presidenza britannica di Bombay sin dal trattato maratha del 1779; territorio neutrale dell'Estado da Índia.",
    s2_4: 'Dadrá e Nagar Haveli · Pacifica amministrazione forestale e rurale nella valle del fiume Daman Ganga; neutralità salazarista.',
    s5_7: 'Dadrá e Nagar Haveli · Enclave neutrale lusitana circondata dall\'India britannica.',
    s8: 'Dadrá e Nagar Haveli · Exclave interna portoghese nell\'entroterra del Gujarat.',
    getNote: (s: number) => {
      if (s <= 1) return "Enclavi interne portoghesi di Dadrá e Nagar Haveli (Silvassa), interamente circondate dalla Presidenza britannica di Bombay sin dal trattato maratha del 1779; territorio neutrale dell'Estado da Índia.";
      if (s <= 4) return 'Dadrá e Nagar Haveli · Pacifica amministrazione forestale e rurale nella valle del fiume Daman Ganga; neutralità salazarista.';
      if (s <= 7) return 'Dadrá e Nagar Haveli · Enclave neutrale lusitana circondata dall\'India britannica.';
      return 'Dadrá e Nagar Haveli · Exclave interna portoghese nell\'entroterra del Gujarat.';
    },
  },
  'IN_SIK': {
    id: 'IN_SIK',
    origId: 'INSK',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Sikkim',
    nutsName: 'Regno del Sikkim (Protettorato Britannico)',
    nameLatn: 'Sikkim',
    nameEngl: 'Kingdom of Sikkim',
    modernName: 'Stato del Sikkim (Gangtok, India) · Sikkim',
    historicalName: 'Regno del Sikkim — Protettorato Britannico (Gangtok)',
    adminTitle: 'Kingdom of Sikkim · Chogyal Dinastia Namgyal (Tashi Namgyal & Political Officer Britannico)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Sikkim · Regno himalayano governato dal sovrano Chogyal Tashi Namgyal sotto protettorato britannico; capitale a Gangtok, all\'ombra del massiccio maestoso del Kangchenjunga; corridoio principale attraverso il valico di Nathu La verso la Valle di Chumbi e Lhasa.',
    s2_4: 'Gangtok · Residenza del Political Officer britannico in Sikkim (Hugh Richardson), responsabile delle relazioni diplomatiche dirette con il governo teocratico del Tibet.',
    s5_7: 'Sikkim · Controllo strategico del valico di Nathu La per garantire il commercio di lana e le comunicazioni con il Kashag tibetano durante la guerra.',
    s8: 'Gangtok · Presidio della frontiera himalayana e cooperazione militare con le unità da montagna anglo-indiane.',
    getNote: (s: number) => {
      if (s <= 1) return 'Sikkim · Regno himalayano governato dal sovrano Chogyal Tashi Namgyal sotto protettorato britannico; capitale a Gangtok, all\'ombra del massiccio maestoso del Kangchenjunga; corridoio principale attraverso il valico di Nathu La verso la Valle di Chumbi e Lhasa.';
      if (s <= 4) return 'Gangtok · Residenza del Political Officer britannico in Sikkim (Hugh Richardson), responsabile delle relazioni diplomatiche dirette con il governo teocratico del Tibet.';
      if (s <= 7) return 'Sikkim · Controllo strategico del valico di Nathu La per garantire il commercio di lana e le comunicazioni con il Kashag tibetano durante la guerra.';
      return 'Gangtok · Presidio della frontiera himalayana e cooperazione militare con le unità da montagna anglo-indiane.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_HP': {
    id: 'IN_HP',
    origId: 'INHP',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Himachal Pradesh',
    nutsName: 'Stati Collinari del Punjab (Simla)',
    nameLatn: 'Himācal Pradeś',
    nameEngl: 'Himachal Pradesh',
    modernName: 'Stato dell\'Himachal Pradesh (Shimla, India) · Himācal Pradeś',
    historicalName: 'Impero Anglo-Indiano — Simla (Capitale Estiva dell\'Impero Britannico)',
    adminTitle: 'Punjab Hill States Agency & Sede Vicereale Estiva di Simla (Viceregal Lodge)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Simla (Shimla) · La celeberrima \'Capitale Estiva\' dell\'Impero Britannico in India; nei mesi caldi l\'intero governo imperiale, il Viceré e il Comandante supremo dell\'esercito si trasferiscono a Simla al maestoso Viceregal Lodge, collegato dalla spettacolare ferrovia a scartamento ridotto Kalka-Shimla.',
    s2_4: 'Simla · Decine di principati collinari (Punjab Hill States) federati nell\'agenzia imperiale; centro aristocratico di villeggiatura e decisioni governative.',
    s5_7: 'Simla · Con la guerra in Europa, Simla diventa il centro di pianificazione estivo delle grandi riforme logistiche e degli arruolamenti dell\'Esercito Indiano.',
    s8: 'Simla · Centro nevralgico della direzione strategica imperiale e residenza dei vertici dello Stato Maggiore britannico in Asia.',
    getNote: (s: number) => {
      if (s <= 1) return 'Simla (Shimla) · La celeberrima \'Capitale Estiva\' dell\'Impero Britannico in India; nei mesi caldi l\'intero governo imperiale, il Viceré e il Comandante supremo dell\'esercito si trasferiscono a Simla al maestoso Viceregal Lodge, collegato dalla spettacolare ferrovia a scartamento ridotto Kalka-Shimla.';
      if (s <= 4) return 'Simla · Decine di principati collinari (Punjab Hill States) federati nell\'agenzia imperiale; centro aristocratico di villeggiatura e decisioni governative.';
      if (s <= 7) return 'Simla · Con la guerra in Europa, Simla diventa il centro di pianificazione estivo delle grandi riforme logistiche e degli arruolamenti dell\'Esercito Indiano.';
      return 'Simla · Centro nevralgico della direzione strategica imperiale e residenza dei vertici dello Stato Maggiore britannico in Asia.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_UTT': {
    id: 'IN_UTT',
    origId: 'INUT',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Uttarakhand',
    nutsName: 'Divisioni di Kumaon e Garhwal (Uttarakhand)',
    nameLatn: 'Uttarākhaṇḍ',
    nameEngl: 'Uttarakhand',
    modernName: 'Stato dell\'Uttarakhand (Dehradun, Nainital e Haridwar, India) · Uttarākhaṇḍ',
    historicalName: 'Impero Anglo-Indiano — Divisioni Montane di Kumaon e Garhwal',
    adminTitle: 'United Provinces · Kumaon & Garhwal Divisions (Accademia Militare Indiana di Dehradun)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Kumaon e Garhwal · Valli sacre himalayane delle sorgenti del Gange (Gangotri) e dello Yamuna; Dehradun ospita la prestigiosa Accademia Militare Indiana (IMA fondata nel 1932) che addestra i giovani ufficiali indiani della Corona; Nainital è la stazione collinare estiva.',
    s2_4: 'Dehradun · Addestramento dei cadetti militari che guideranno le divisioni indiane nei campi di battaglia della Seconda Guerra Mondiale; il Garhwal Rifles e il Kumaon Regiment formano soldati di montagna formidabili.',
    s5_7: 'Dehradun · Massiccia espansione dei corsi per ufficiali dell\'IMA; Dehradun ospita anche il campo d\'internamento centrale per cittadini tedeschi e austriaci in India (tra cui l\'alpinista Heinrich Harrer).',
    s8: 'Kumaon e Garhwal · Centinaia di ufficiali diplomati a Dehradun guidano i battaglioni alleati nella vittoriosa campagna d\'Eritrea e in Africa Settentrionale.',
    getNote: (s: number) => {
      if (s <= 1) return 'Kumaon e Garhwal · Valli sacre himalayane delle sorgenti del Gange (Gangotri) e dello Yamuna; Dehradun ospita la prestigiosa Accademia Militare Indiana (IMA fondata nel 1932) che addestra i giovani ufficiali indiani della Corona; Nainital è la stazione collinare estiva.';
      if (s <= 4) return 'Dehradun · Addestramento dei cadetti militari che guideranno le divisioni indiane nei campi di battaglia della Seconda Guerra Mondiale; il Garhwal Rifles e il Kumaon Regiment formano soldati di montagna formidabili.';
      if (s <= 7) return 'Dehradun · Massiccia espansione dei corsi per ufficiali dell\'IMA; Dehradun ospita anche il campo d\'internamento centrale per cittadini tedeschi e austriaci in India (tra cui l\'alpinista Heinrich Harrer).';
      return 'Kumaon e Garhwal · Centinaia di ufficiali diplomati a Dehradun guidano i battaglioni alleati nella vittoriosa campagna d\'Eritrea e in Africa Settentrionale.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_HAR': {
    id: 'IN_HAR',
    origId: 'INHR',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Haryana',
    nutsName: 'Haryana (Ambala e Rohtak)',
    nameLatn: 'Hariyāṇā',
    nameEngl: 'Haryana',
    modernName: 'Stato dell\'Haryana (Ambala, Rohtak e Panipat, India) · Hariyāṇā',
    historicalName: 'Impero Anglo-Indiano — Distretti di Ambala e Rohtak',
    adminTitle: 'Punjab Province · Ambala Division (Piana Pedemontana dei Siwalik)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Haryana · Piana fertile tra lo Yamuna e il Punjab, culla della storica battaglia di Panipat; Rohtak e Hissar sono rinomate per l\'allevamento di bestiame e l\'arruolamento dei vigorosi guerrieri Jat nell\'esercito coloniale.',
    s2_4: 'Ambala · Grande base aerea e accampamento militare britannico d\'Ambala; rappresentanza politica rurale integrata nel Partito Unionista di Sir Chhotu Ram a difesa dei contadini Jat.',
    s5_7: 'Rohtak e Ambala · Migliaia di contadini Jat si arruolano volontari nel Jat Regiment dell\'esercito imperiale per combattere oltreoceano.',
    s8: 'Haryana · I battaglioni Jat partecipano alle operazioni in Medio Oriente e Nordafrica con eccezionale reputazione combattiva.',
    getNote: (s: number) => {
      if (s <= 1) return 'Haryana · Piana fertile tra lo Yamuna e il Punjab, culla della storica battaglia di Panipat; Rohtak e Hissar sono rinomate per l\'allevamento di bestiame e l\'arruolamento dei vigorosi guerrieri Jat nell\'esercito coloniale.';
      if (s <= 4) return 'Ambala · Grande base aerea e accampamento militare britannico d\'Ambala; rappresentanza politica rurale integrata nel Partito Unionista di Sir Chhotu Ram a difesa dei contadini Jat.';
      if (s <= 7) return 'Rohtak e Ambala · Migliaia di contadini Jat si arruolano volontari nel Jat Regiment dell\'esercito imperiale per combattere oltreoceano.';
      return 'Haryana · I battaglioni Jat partecipano alle operazioni in Medio Oriente e Nordafrica con eccezionale reputazione combattiva.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_CHA': {
    id: 'IN_CHA',
    origId: 'INCH',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Chandigarh',
    nutsName: 'Chandigarh (Piana del Punjab)',
    nameLatn: 'Caṇḍīgaṛh',
    nameEngl: 'Chandigarh',
    modernName: 'Territorio di Chandigarh (India) · Caṇḍīgaṛh',
    historicalName: 'Impero Anglo-Indiano — Distretto di Ambala (Piana dei Siwalik)',
    adminTitle: 'Punjab Province · Distretto di Ambala (Piana Pedemontana dei Siwalik)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Chandigarh · Area rurale all\'ombra delle colline Siwalik incentrata sul tempio sacro di Chandi Mandir; territorio agricolo attraversato dalla direttrice tra Ambala e Kalka.',
    s2_4: 'Piana dei Siwalik · Passaggio obbligato per convogli e comitive che salgono verso la residenza estiva del governo imperiale a Simla.',
    s5_7: 'Piana dei Siwalik · Presidio militare campestre e supporto alla base logistica di Ambala durante la mobilitazione bellica.',
    s8: 'Piana dei Siwalik · Zona di retrovia protetta lungo la principale arteria strategica dell\'India settentrionale.',
    getNote: (s: number) => {
      if (s <= 1) return 'Chandigarh · Area rurale all\'ombra delle colline Siwalik incentrata sul tempio sacro di Chandi Mandir; territorio agricolo attraversato dalla direttrice tra Ambala e Kalka.';
      if (s <= 4) return 'Piana dei Siwalik · Passaggio obbligato per convogli e comitive che salgono verso la residenza estiva del governo imperiale a Simla.';
      if (s <= 7) return 'Piana dei Siwalik · Presidio militare campestre e supporto alla base logistica di Ambala durante la mobilitazione bellica.';
      return 'Piana dei Siwalik · Zona di retrovia protetta lungo la principale arteria strategica dell\'India settentrionale.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_CHH': {
    id: 'IN_CHH',
    origId: 'INCT',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Chhattisgarh',
    nutsName: 'Agenzia degli Stati Orientali (Chhattisgarh)',
    nameLatn: 'Chattīsgaṛh',
    nameEngl: 'Chhattisgarh',
    modernName: 'Stato del Chhattisgarh (Raipur e Bilaspur, India) · Chattīsgaṛh',
    historicalName: 'Impero Anglo-Indiano — Agenzia degli Stati di Chhattisgarh',
    adminTitle: 'Eastern States Agency · Chhattisgarh Division & Principati Tribali di Bastar e Surguja',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Chhattisgarh · Regione boschiva e mineraria bagnata dal fiume Mahanadi; include i distretti britannici di Raipur e Bilaspur e grandi principati tribali autonomi come Bastar, ricchi di miniere di ferro incontaminate e foreste di legno sal.',
    s2_4: 'Raipur · Centro nevralgico della linea ferroviaria Bengal Nagpur Railway per il trasporto del carbone e del riso tra il Bengala e il centro dell\'India.',
    s5_7: 'Raipur · Estrazione intensificata di minerali di ferro e carbone per le acciaierie di Jamshedpur impegnate nella produzione bellica.',
    s8: 'Chhattisgarh · Le riserve forestali forniscono milioni di traverse di legno per la manutenzione delle ferrovie militari dell\'Impero.',
    getNote: (s: number) => {
      if (s <= 1) return 'Chhattisgarh · Regione boschiva e mineraria bagnata dal fiume Mahanadi; include i distretti britannici di Raipur e Bilaspur e grandi principati tribali autonomi come Bastar, ricchi di miniere di ferro incontaminate e foreste di legno sal.';
      if (s <= 4) return 'Raipur · Centro nevralgico della linea ferroviaria Bengal Nagpur Railway per il trasporto del carbone e del riso tra il Bengala e il centro dell\'India.';
      if (s <= 7) return 'Raipur · Estrazione intensificata di minerali di ferro e carbone per le acciaierie di Jamshedpur impegnate nella produzione bellica.';
      return 'Chhattisgarh · Le riserve forestali forniscono milioni di traverse di legno per la manutenzione delle ferrovie militari dell\'Impero.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_AND': {
    id: 'IN_AND',
    origId: 'INAP',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Andhra Pradesh',
    nutsName: 'Andhra (Circar Settentrionali)',
    nameLatn: 'Āndhra Pradēś',
    nameEngl: 'Andhra Pradesh',
    modernName: 'Stato dell\'Andhra Pradesh (Visakhapatnam e Vijayawada, India) · Āndhra Pradēś',
    historicalName: 'Impero Anglo-Indiano — Divisione dei Circar Settentrionali (Madras)',
    adminTitle: 'Madras Presidency · Northern Circars & Porto Strategico di Visakhapatnam',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Andhra (Circar Settentrionali) · Vasta fascia costiera orientale della Presidenza di Madras dominata dai delta dei fiumi Godavari e Krishna; nel 1933 viene inaugurato il grandioso porto marittimo moderno in acque profonde di Visakhapatnam.',
    s2_4: 'Visakhapatnam · Il porto di Visakhapatnam diventa il polo primario di esportazione mineraria di manganese verso la Gran Bretagna e gli Stati Uniti; fervore del movimento per l\'autonomia dello Stato di lingua telugu (Andhra).',
    s5_7: 'Visakhapatnam · Con la guerra il porto e la base navale di Visakhapatnam vengono fortemente potenziati dalla Royal Navy e Royal Indian Navy per il pattugliamento del Golfo del Bengala.',
    s8: 'Visakhapatnam · Nodo navale strategico e cantieristica per la difesa delle rotte mercantili contro incursioni sottomarine nemiche.',
    getNote: (s: number) => {
      if (s <= 1) return 'Andhra (Circar Settentrionali) · Vasta fascia costiera orientale della Presidenza di Madras dominata dai delta dei fiumi Godavari e Krishna; nel 1933 viene inaugurato il grandioso porto marittimo moderno in acque profonde di Visakhapatnam.';
      if (s <= 4) return 'Visakhapatnam · Il porto di Visakhapatnam diventa il polo primario di esportazione mineraria di manganese verso la Gran Bretagna e gli Stati Uniti; fervore del movimento per l\'autonomia dello Stato di lingua telugu (Andhra).';
      if (s <= 7) return 'Visakhapatnam · Con la guerra il porto e la base navale di Visakhapatnam vengono fortemente potenziati dalla Royal Navy e Royal Indian Navy per il pattugliamento del Golfo del Bengala.';
      return 'Visakhapatnam · Nodo navale strategico e cantieristica per la difesa delle rotte mercantili contro incursioni sottomarine nemiche.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_ANI': {
    id: 'IN_ANI',
    origId: 'INAN',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Andaman and Nicobar',
    nutsName: 'Isole Andamane e Nicobare (Port Blair)',
    nameLatn: 'Aṇḍamān va Nikōbār',
    nameEngl: 'Andaman and Nicobar Islands',
    modernName: 'Territorio delle Isole Andamane e Nicobare (Port Blair, India) · Aṇḍamān va Nikōbār',
    historicalName: 'Impero Anglo-Indiano — Isole Andamane e Nicobare (Penitenziario di Port Blair)',
    adminTitle: 'Chief Commissionership of Andaman and Nicobar Islands (Cellular Jail, Port Blair)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Isole Andamane e Nicobare · Arcipelago strategico nell\'Oceano Indiano a guardia dello Stretto di Malacca; capoluogo a Port Blair, tristemente noto per il celebre carcere penale di Cellular Jail (\'Kala Pani\'), dove i britannici imprigionano i più radicali dissidenti e combattenti per la libertà indiani.',
    s2_4: 'Port Blair · Nel 1937-1938 i prigionieri politici conducono scioperi della fame storici, sostenuti da Gandhi e Tagore; il governo coloniale concede il rimpatrio di molti patrioti sulla terraferma indiana.',
    s5_7: 'Port Blair · Con la guerra le isole assumono una valenza strategica suprema per il controllo navale tra India, Birmania e la base navale di Singapore.',
    s8: 'Port Blair · Presidio militare della Royal Navy e della guarnigione britannica a sorveglianza delle rotte di rifornimento dell\'Oceano Indiano.',
    getNote: (s: number) => {
      if (s <= 1) return 'Isole Andamane e Nicobare · Arcipelago strategico nell\'Oceano Indiano a guardia dello Stretto di Malacca; capoluogo a Port Blair, tristemente noto per il celebre carcere penale di Cellular Jail (\'Kala Pani\'), dove i britannici imprigionano i più radicali dissidenti e combattenti per la libertà indiani.';
      if (s <= 4) return 'Port Blair · Nel 1937-1938 i prigionieri politici conducono scioperi della fame storici, sostenuti da Gandhi e Tagore; il governo coloniale concede il rimpatrio di molti patrioti sulla terraferma indiana.';
      if (s <= 7) return 'Port Blair · Con la guerra le isole assumono una valenza strategica suprema per il controllo navale tra India, Birmania e la base navale di Singapore.';
      return 'Port Blair · Presidio militare della Royal Navy e della guarnigione britannica a sorveglianza delle rotte di rifornimento dell\'Oceano Indiano.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_LAK': {
    id: 'IN_LAK',
    origId: 'INLD',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Lakshadweep',
    nutsName: 'Isole Laccadive (Lakshadweep)',
    nameLatn: 'Lakṣadvīp',
    nameEngl: 'Lakshadweep',
    modernName: 'Territorio delle Isole Laccadive (Kavaratti, India) · Lakṣadvīp',
    historicalName: 'Impero Anglo-Indiano — Isole Laccadive, Amindivi e Minicoy',
    adminTitle: 'Madras Presidency · Distretto di Malabar (Isole Laccadive, Amindivi & Minicoy)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Isole Laccadive · Suggestivo arcipelago corallino di atolli e lagune nel Mare Arabico amministrato dal Collector del distretto di Malabar (Presidenza di Madras); popolazione marinara musulmana dedita alla pesca e alla fibra di cocco.',
    s2_4: 'Minicoy · Lo storico faro di Minicoy (Minicoy Lighthouse eretto nel 1885) guida i mercantili imperiali lungo la rotta marittima dal Canale di Suez verso Colombo e l\'Estremo Oriente.',
    s5_7: 'Laccadive · Punto di osservazione e avvistamento marittimo avanzato della marina britannica contro possibili corsari nemici.',
    s8: 'Laccadive · Sorveglianza delle rotte dei convogli di rifornimento tra l\'Africa orientale, Aden e i porti dell\'India occidentale.',
    getNote: (s: number) => {
      if (s <= 1) return 'Isole Laccadive · Suggestivo arcipelago corallino di atolli e lagune nel Mare Arabico amministrato dal Collector del distretto di Malabar (Presidenza di Madras); popolazione marinara musulmana dedita alla pesca e alla fibra di cocco.';
      if (s <= 4) return 'Minicoy · Lo storico faro di Minicoy (Minicoy Lighthouse eretto nel 1885) guida i mercantili imperiali lungo la rotta marittima dal Canale di Suez verso Colombo e l\'Estremo Oriente.';
      if (s <= 7) return 'Laccadive · Punto di osservazione e avvistamento marittimo avanzato della marina britannica contro possibili corsari nemici.';
      return 'Laccadive · Sorveglianza delle rotte dei convogli di rifornimento tra l\'Africa orientale, Aden e i porti dell\'India occidentale.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_MAN': {
    id: 'IN_MAN',
    origId: 'INMN',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Manipur',
    nutsName: 'Stato Principesco di Manipur (Imphal)',
    nameLatn: 'Maṇipur',
    nameEngl: 'Manipur State',
    modernName: 'Stato del Manipur (Imphal, India) · Maṇipur',
    historicalName: 'Impero Anglo-Indiano — Stato Principesco di Manipur (Imphal)',
    adminTitle: 'Manipur State · Maharaja Dinastia Meitei (Maharaja Churachand Singh & Political Agent di Imphal)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Manipur · Antico regno principesco retto dal Maharaja Churachand Singh nella fertile valle di Imphal, culla secolare del gioco del polo e della danza classica manipuri, cinto da colline popolate da tribù Naga e Kuki al confine birmano.',
    s2_4: 'Imphal · Sede del Political Agent britannico; sviluppo della strada montuosa che collega la ferrovia di Dimapur (Assam) a Imphal e alla frontiera birmana.',
    s5_7: 'Imphal · Con lo scoppio della guerra in Europa, Manipur intensifica la sorveglianza sui valichi montani della valle di Kabaw verso la Birmania.',
    s8: 'Imphal · Posizione geografica di primaria importanza strategica; Imphal viene scelta per ospitare nuove piste d\'atterraggio avanzate della RAF a difesa della frontiera indo-birmana.',
    getNote: (s: number) => {
      if (s <= 1) return 'Manipur · Antico regno principesco retto dal Maharaja Churachand Singh nella fertile valle di Imphal, culla secolare del gioco del polo e della danza classica manipuri, cinto da colline popolate da tribù Naga e Kuki al confine birmano.';
      if (s <= 4) return 'Imphal · Sede del Political Agent britannico; sviluppo della strada montuosa che collega la ferrovia di Dimapur (Assam) a Imphal e alla frontiera birmana.';
      if (s <= 7) return 'Imphal · Con lo scoppio della guerra in Europa, Manipur intensifica la sorveglianza sui valichi montani della valle di Kabaw verso la Birmania.';
      return 'Imphal · Posizione geografica di primaria importanza strategica; Imphal viene scelta per ospitare nuove piste d\'atterraggio avanzate della RAF a difesa della frontiera indo-birmana.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_MEG': {
    id: 'IN_MEG',
    origId: 'INML',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Meghalaya',
    nutsName: 'Colline di Khasi e Jaintia (Shillong)',
    nameLatn: 'Meghālaya',
    nameEngl: 'Meghalaya',
    modernName: 'Stato del Meghalaya (Shillong, India) · Meghālaya',
    historicalName: 'Impero Anglo-Indiano — Distretti e Stati delle Colline di Khasi, Jaintia e Garo',
    adminTitle: 'Assam Province · Khasi and Jaintia Hills District (Capitale di Shillong & Stati dei Syiem Khasi)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Meghalaya (\'Dimora delle Nuvole\') · Altopiano montuoso tra i più piovosi della Terra (Cherrapunji); la capitale Shillong è definita la \'Scozia dell\'Est\' per il clima fresco, sede governativa dell\'Assam e residenza dei coloni britannici.',
    s2_4: 'Shillong · Autonomia tradizionale dei capi tribali Khasi (Syiem) confederati sotto la supervisione del Deputy Commissioner; centri missionari e collegi d\'élite.',
    s5_7: 'Shillong · La città ospita il quartier generale logistico di comando per le operazioni militari nell\'India nord-orientale durante il conflitto bellico.',
    s8: 'Shillong · Centro di coordinamento e ospedale militare per le truppe imperiali schierate lungo il settore orientale.',
    getNote: (s: number) => {
      if (s <= 1) return 'Meghalaya (\'Dimora delle Nuvole\') · Altopiano montuoso tra i più piovosi della Terra (Cherrapunji); la capitale Shillong è definita la \'Scozia dell\'Est\' per il clima fresco, sede governativa dell\'Assam e residenza dei coloni britannici.';
      if (s <= 4) return 'Shillong · Autonomia tradizionale dei capi tribali Khasi (Syiem) confederati sotto la supervisione del Deputy Commissioner; centri missionari e collegi d\'élite.';
      if (s <= 7) return 'Shillong · La città ospita il quartier generale logistico di comando per le operazioni militari nell\'India nord-orientale durante il conflitto bellico.';
      return 'Shillong · Centro di coordinamento e ospedale militare per le truppe imperiali schierate lungo il settore orientale.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_NAG': {
    id: 'IN_NAG',
    origId: 'INNL',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Nagaland',
    nutsName: 'Colline dei Naga (Kohima)',
    nameLatn: 'Nāgālaiṇḍ',
    nameEngl: 'Naga Hills',
    modernName: 'Stato del Nagaland (Kohima e Dimapur, India) · Nāgālaiṇḍ',
    historicalName: 'Impero Anglo-Indiano — Distretto delle Colline dei Naga (Kohima)',
    adminTitle: 'Assam Province · Naga Hills District (Sede di Kohima & Linea di Esclusione Tribale)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Colline dei Naga · Territorio montuoso aspro e fittamente boscato lungo il confine birmano; sede amministrativa a Kohima; le fiere tribù Naga (Angami, Ao, Sema) sono governate con speciali \'linee di esclusione\' che ne preservano i costumi tradizionali.',
    s2_4: 'Kohima · Fondazione del Naga Club e prime petizioni alla commissione britannica per il riconoscimento dell\'identità distinta del popolo Naga.',
    s5_7: 'Kohima · Posto di blocco montano e sentinella di frontiera; i guerrieri Naga vengono reclutati come scout d\'élite per la sorveglianza delle foreste.',
    s8: 'Kohima · Perno montuoso strategico lungo la pista che da Dimapur sale verso le alture di Kohima e il confine birmano.',
    getNote: (s: number) => {
      if (s <= 1) return 'Colline dei Naga · Territorio montuoso aspro e fittamente boscato lungo il confine birmano; sede amministrativa a Kohima; le fiere tribù Naga (Angami, Ao, Sema) sono governate con speciali \'linee di esclusione\' che ne preservano i costumi tradizionali.';
      if (s <= 4) return 'Kohima · Fondazione del Naga Club e prime petizioni alla commissione britannica per il riconoscimento dell\'identità distinta del popolo Naga.';
      if (s <= 7) return 'Kohima · Posto di blocco montano e sentinella di frontiera; i guerrieri Naga vengono reclutati come scout d\'élite per la sorveglianza delle foreste.';
      return 'Kohima · Perno montuoso strategico lungo la pista che da Dimapur sale verso le alture di Kohima e il confine birmano.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_MIZ': {
    id: 'IN_MIZ',
    origId: 'INMZ',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Mizoram',
    nutsName: 'Colline dei Lushai (Aizawl)',
    nameLatn: 'Mizōram',
    nameEngl: 'Lushai Hills',
    modernName: 'Stato del Mizoram (Aizawl, India) · Mizōram',
    historicalName: 'Impero Anglo-Indiano — Distretto delle Colline dei Lushai (Aizawl)',
    adminTitle: 'Assam Province · Lushai Hills District (Sede Governativa di Aizawl & Capi Lal Tradizionali)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Colline dei Lushai (Mizoram) · Dorsale montuosa coperta da fitte foreste di bambù tra il Bengala, l\'Assam e la Birmania; capoluogo arroccato sulle creste ad Aizawl; i capi tradizionali (Lal) amministrano i villaggi.',
    s2_4: 'Aizawl · Vasta opera di scolarizzazione e conversione condotta dalle missioni presbiteriane gallesi; eccezionale tasso di alfabetizzazione tra i giovani Mizo.',
    s5_7: 'Aizawl · Pattugliamento della triplice frontiera tra India, Birmania e i Chittagong Hill Tracts.',
    s8: 'Colline dei Lushai · Sorveglianza delle gole montane e cooperazione delle comunità locali con i comandi militari coloniali a difesa della frontiera.',
    getNote: (s: number) => {
      if (s <= 1) return 'Colline dei Lushai (Mizoram) · Dorsale montuosa coperta da fitte foreste di bambù tra il Bengala, l\'Assam e la Birmania; capoluogo arroccato sulle creste ad Aizawl; i capi tradizionali (Lal) amministrano i villaggi.';
      if (s <= 4) return 'Aizawl · Vasta opera di scolarizzazione e conversione condotta dalle missioni presbiteriane gallesi; eccezionale tasso di alfabetizzazione tra i giovani Mizo.';
      if (s <= 7) return 'Aizawl · Pattugliamento della triplice frontiera tra India, Birmania e i Chittagong Hill Tracts.';
      return 'Colline dei Lushai · Sorveglianza delle gole montane e cooperazione delle comunità locali con i comandi militari coloniali a difesa della frontiera.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  'IN_TRI': {
    id: 'IN_TRI',
    origId: 'INTR',
    cntrCode: 'IN',
    cntrName: 'India',
    name: 'Tripura',
    nutsName: 'Stato Principesco di Tripura (Agartala)',
    nameLatn: 'Tripurā',
    nameEngl: 'Tripura State',
    modernName: 'Stato del Tripura (Agartala, India) · Tripurā',
    historicalName: 'Impero Anglo-Indiano — Regno Principesco di Tripura (Hill Tippera)',
    adminTitle: 'Tripura State · Dinastia Manikya (Maharaja Bir Bikram Kishore Debbarman Manikya, Agartala)',
    sovereign: 'RAJ',
    overlord: 'UK',
    faction: 'Alleati',
    s0_1: 'Tripura (Hill Tippera) · Regno principesco indipendente governato dall\'illuminato Maharaja Bir Bikram Kishore Manikya; capitale ad Agartala con lo splendido palazzo reale Ujjayanta; terra di colline boscose e piantagioni di tè circondata dalle pianure del Bengala.',
    s2_4: 'Agartala · Il Maharaja Bir Bikram pianifica la prima università e l\'aeroporto moderno di Agartala, mantenendo strettissimi legami culturali con Rabindranath Tagore.',
    s5_7: 'Tripura · Il Maharaja Bir Bikram dichiara la totale lealtà del regno alla causa alleata, mettendo le Tripura Rifles a disposizione dell\'Esercito Britannico.',
    s8: 'Agartala · Le forze del Tripura proteggono la frontiera orientale e l\'aeroporto di Agartala viene predisposto per ospitare squadriglie della RAF.',
    getNote: (s: number) => {
      if (s <= 1) return 'Tripura (Hill Tippera) · Regno principesco indipendente governato dall\'illuminato Maharaja Bir Bikram Kishore Manikya; capitale ad Agartala con lo splendido palazzo reale Ujjayanta; terra di colline boscose e piantagioni di tè circondata dalle pianure del Bengala.';
      if (s <= 4) return 'Agartala · Il Maharaja Bir Bikram pianifica la prima università e l\'aeroporto moderno di Agartala, mantenendo strettissimi legami culturali con Rabindranath Tagore.';
      if (s <= 7) return 'Tripura · Il Maharaja Bir Bikram dichiara la totale lealtà del regno alla causa alleata, mettendo le Tripura Rifles a disposizione dell\'Esercito Britannico.';
      return 'Agartala · Le forze del Tripura proteggono la frontiera orientale e l\'aeroporto di Agartala viene predisposto per ospitare squadriglie della RAF.';
    },
    getFaction: (s: number) => {
      return s >= 5 ? 'Alleati' : 'Neutrale';
    },
  },
  // Alias per ID alternativo Tripura
  IN_TR: null as any,
};
BRITISH_RAJ_PROVINCES_META['IN_TR'] = BRITISH_RAJ_PROVINCES_META['IN_TRI'];

// Step 10 (AGO 1942 — 31 agosto 1942): Conquista giapponese della Birmania (marzo-maggio 1942, taglio della Strada della Birmania verso la Cina) e delle Isole Andamane e Nicobare (23 marzo 1942); Movimento "Quit India" nel Raj (8 agosto 1942)
for (const meta of new Set(Object.values(BRITISH_RAJ_PROVINCES_META))) {
  if (!meta) continue;
  const origSov = meta.getSovereign ? meta.getSovereign.bind(meta) : () => meta.sovereign;
  const origFac = meta.getFaction ? meta.getFaction.bind(meta) : () => meta.faction;
  const origHist = meta.getHistoricalName ? meta.getHistoricalName.bind(meta) : () => meta.historicalName;
  const origAdmin = meta.getAdminTitle ? meta.getAdminTitle.bind(meta) : () => meta.adminTitle;
  const origNote = meta.getNote.bind(meta);
  const isBurma = meta.cntrCode === 'MM' || meta.id.startsWith('MM_');
  const isAndaman = meta.id === 'IN_ANI';

  meta.getSovereign = (s: number) => {
    if (s >= 18 && (isBurma || isAndaman)) {
      return 'UK';
    }
    if (s >= 17 && isBurma) {
      if (meta.id === 'MM_TAN' || meta.id === 'MM_SHA' || meta.id === 'MM_MON') return 'JAP';
      return 'UK';
    }
    if (s >= 10 && (isBurma || isAndaman)) return 'JAP';
    return origSov(s);
  };
  meta.getFaction = (s: number) => {
    if (s >= 18 && (isBurma || isAndaman)) {
      return 'Alleati';
    }
    if (s >= 17 && isBurma) {
      if (meta.id === 'MM_TAN' || meta.id === 'MM_SHA' || meta.id === 'MM_MON') return 'Asse';
      return 'Alleati';
    }
    if (s >= 10 && (isBurma || isAndaman)) return 'Asse';
    return origFac(s);
  };
  meta.getHistoricalName = (s: number) => {
    if (s >= 18 && isAndaman) {
      return s >= 19
        ? 'Isole Andamane e Nicobare (Dominion dell\'India — Port Blair)'
        : 'Isole Andamane e Nicobare (Colonia Anglo-Indiana Restaurata — Resa Giapponese, Settembre 1945)';
    }
    if (s >= 18 && isBurma) {
      if (s >= 19) return `${origHist(8)} (Birmania Britannica in Transizione — Governo Provvisorio di U Nu)`;
      if (meta.id === 'MM_SHA') return 'Stati Shan e Lashio (Ripristino Amministrazione Britannica & Retrocessione di Kengtung)';
      return `${origHist(8)} (Colonia Britannica Restaurata — Amministrazione SEAC / CAS(B), Settembre 1945)`;
    }
    if (s >= 17 && isBurma) {
      if (meta.id === 'MM_RAN') return 'Rangoon (Operazione Dracula — 14ª Armata Britannica alle Porte della Capitale, Aprile 1945)';
      if (meta.id === 'MM_MDY') return 'Mandalay & Alta Birmania (Liberata dalla 14ª Armata Britannica — 20 Marzo 1945)';
      if (meta.id === 'MM_RAK') return 'Arakan & Akyab (Liberata dal 15° Corpo Indiano — Operazione Romulus, Inizio 1945)';
      if (meta.id === 'MM_KAC') return 'Kachin & Myitkyina (Riapertura della Strada della Birmania / Ledo Road)';
      if (meta.id === 'MM_SAG') return 'Sagaing & Valle del Chindwin (Liberata dal 33° Corpo Britannico, Febbraio 1945)';
      if (meta.id === 'MM_BAG') return 'Pegu / Bago (Presa dalla 14ª Armata Britannica — 30 Aprile 1945)';
      if (meta.id === 'MM_MAG') return 'Magway & Pozzi di Yenangyaung (Riconquista Alleata dei Giacimenti BOC, Aprile 1945)';
      if (meta.id === 'MM_AYE') return 'Delta dell\'Irrawaddy (Avanzata Alleata & Insurrezione dell\'Esercito Nazionale Birmano)';
      if (meta.id === 'MM_CHI') return 'Colline Chin (Liberate dalle Forze Indo-Britanniche)';
      if (meta.id === 'MM_KAY') return 'Stati Karenni (Guerriglia Antigiapponese delle Forze Speciali SOE Force 136)';
      if (meta.id === 'MM_KAR') return 'Colline dei Karen (Rivolta Antigiapponese e Sostegno alla 14ª Armata)';
      if (meta.id === 'MM_MON') return 'Stato Mon e Moulmein (Quartier Generale dell\'Armata Regionale Birmana del Gen. Kimura dopo l\'evacuazione di Rangoon, 23 Aprile 1945)';
      if (meta.id === 'MM_SHA') return 'Stati Shan e Lashio (Ritiro delle Forze d\'Occupazione Giapponesi verso la Thailandia)';
      if (meta.id === 'MM_TAN') return 'Tenasserim (Corridoio Costiero Giapponese in Ritirata verso la Malesia)';
    }
    if (s >= 10) {
      if (isAndaman) return 'Isole Andamane e Nicobare (Occupazione Imperiale Giapponese — Port Blair, 23 Marzo 1942)';
      if (meta.id === 'MM_RAN') return 'Rangoon (Occupazione Imperiale Giapponese — 15ª Armata & Governo Esecutivo di Ba Maw, 1942)';
      if (meta.id === 'MM_MDY') return 'Mandalay & Alta Birmania (Occupazione Giapponese — Taglio della Strada della Birmania, Maggio 1942)';
      if (meta.id === 'MM_SHA') return 'Stati Shan e Lashio (Occupazione Giapponese & Armata Phayap Thailandese a Kengtung — Maggio 1942)';
      if (isBurma) return `${origHist(8)} (Occupazione Militare Giapponese — 15ª Armata, Maggio 1942)`;
    }
    return origHist(s);
  };
  meta.getAdminTitle = (s: number) => {
    if (s >= 18 && isAndaman) {
      return s >= 19
        ? 'Dominion of India — Chief Commissioner (Andaman & Nicobar Islands)'
        : 'British Indian Empire — Chief Commissioner (Andaman & Nicobar Islands / SEAC)';
    }
    if (s >= 18 && isBurma) {
      return s >= 19
        ? 'Crown Colony of Burma — Governatorato Sir Hubert Rance & Consiglio Esecutivo (U Nu)'
        : 'British Burma — Civil Affairs Service (Burma) / SEAC (Admiral Lord Louis Mountbatten)';
    }
    if (s >= 17 && isBurma) {
      if (meta.id === 'MM_TAN' || meta.id === 'MM_SHA' || meta.id === 'MM_MON') {
        return 'Impero Giapponese — Armata Regionale Birmana (Gen. Kimura) & 28ª/33ª Armata in Ritirata';
      }
      return 'British Fourteenth Army (Lt. Gen. William Slim) & Allied Land Forces South East Asia';
    }
    if (s >= 10) {
      if (isAndaman) return 'Impero Giapponese — Guarnigione Navale delle Andamane e Nicobare (Port Blair — 1ª Flotta di Spedizione del Sud)';
      if (isBurma) return 'Impero Giapponese — Amministrazione Militare della Birmania (15ª Armata — Ten. Gen. Shōjirō Iida & Amministrazione Centrale Birmana di Ba Maw)';
    }
    return origAdmin(s);
  };
  meta.getNote = (s: number) => {
    if (s >= 18 && isAndaman) {
      return s >= 19
        ? "Al 30 settembre 1947 l'arcipelago strategico delle Andamane e Nicobare (Port Blair) fa parte del neo-istituito Dominion dell'India."
        : "Settembre 1945: crollo dell'Impero Giapponese e reintegrazione delle Andamane e Nicobare sotto l'amministrazione anglo-indiana di Nuova Delhi (resa formale a Port Blair completata il 7 ottobre 1945).";
    }
    if (s >= 18 && isBurma) {
      return s >= 19
        ? "Al 30 settembre 1947, a seguito dell'assassinio di Aung San (luglio 1947), il governo provvisorio birmano guidato da U Nu negozia a Londra il trattato d'indipendenza del gennaio 1948."
        : "Settembre 1945: con l'Atto di Resa giapponese (2 settembre a Tokyo e 12 settembre a Singapore dinanzi a Lord Mountbatten), l'intera Birmania — inclusi gli Stati Shan (Kengtung e Mongpan retrocessi dalla Thailandia), il Mon e il Tenasserim — rientra sotto amministrazione britannica (CAS(B)/SEAC) mentre Aung San e l'AFPFL guidano la transizione verso l'indipendenza.";
    }
    if (s >= 17 && isBurma) {
      return "Campagna di Birmania (aprile 1945): la 14ª Armata britannica del generale William Slim incalza le truppe giapponesi in rotta lungo la valle dell'Irrawaddy ed è alle porte di Rangoon, dopo aver liberato Mandalay (20 marzo) e i campi petroliferi di Yenangyaung; l'Esercito Nazionale Birmano (BNA) guidato dal generale Aung San è insorto il 27 marzo 1945 al fianco degli Alleati (AFPFL), braccando i contingenti nipponici in ritirata verso la Thailandia. Il 1° maggio scatta l'Operazione Dracula che porterà alla presa di Rangoon.";
    }
    if (s >= 10) {
      if (isAndaman) {
        return "Isole Andamane e Nicobare (Port Blair) · All'alba del 23 marzo 1942 (Operazione D) la forza d'invasione della Marina Imperiale Giapponese ha occupato senza opposizione Port Blair, trasformando l'arcipelago nell'avamposto aeronavale più occidentale dell'Impero Giapponese nel Golfo del Bengala a copertura del fianco marittimo della campagna di Birmania.";
      }
      if (isBurma) {
        if (meta.id === 'MM_SHA') {
          return "Stati Shan, Lashio e Kengtung · Il 29 aprile 1942 le colonne motorizzate della 56ª Divisione giapponese hanno espugnato Lashio, capolinea ferroviario della celebre Strada della Birmania (Burma Road), tagliando l'ultima arteria terrestre di rifornimento alleata verso la Cina nazionalista di Chiang Kai-shek; nel maggio 1942 l'Armata Phayap thailandese del Gen. Phin Choonhavan ha occupato gli Stati Shan orientali di Kengtung e Möngpan.";
        }
        return `${origNote(8)} Tra gennaio e maggio 1942 la 15ª Armata giapponese (Ten. Gen. Shōjirō Iida), affiancata dall'Esercito d'Indipendenza Birmano (BIA) di Aung San, ha conquistato l'intera Birmania (caduta di Rangoon l'8 marzo, di Yenangyaung ad aprile, di Lashio il 29 aprile e di Mandalay e Myitkyina a maggio), costringendo il Burma Corps britannico del Gen. William Slim e le forze cinesi del Gen. Joseph Stilwell a una drammatica ritirata attraverso la giungla monsonica verso l'Assam e tagliando la Strada della Birmania verso la Cina.`;
      }
      if (meta.id === 'IN_BOM') {
        return `${origNote(8)} L'8 agosto 1942, al Gowalia Tank Maidan di Bombay, il Mahatma Gandhi e il Congresso Nazionale Indiano lanciano la storica risoluzione 'Quit India' (Bharat Chodo Andolan) chiedendo l'immediata fine del dominio britannico; all'alba del 9 agosto il governo vicereale arresta Gandhi, Nehru e l'intera leadership del Congresso.`;
      }
      if (meta.id === 'IN_ASS' || meta.id === 'IN_MAN' || meta.id === 'IN_NAG') {
        return `${origNote(8)} Nell'estate 1942, dopo la caduta della Birmania e il taglio della Burma Road, l'Assam, il Manipur (Imphal) e le colline Naga (Kohima) diventano la prima linea difensiva dell'Impero Britannico contro il Giappone e la base di partenza del leggendario ponte aereo statunitense 'The Hump' (La Gobba) sopra l'Himalaya per rifornire la Cina di Chiang Kai-shek.`;
      }
    }
    return origNote(s);
  };
}

/**
 * Risolve lo stato geopolitico di una provincia del British Raj per uno step temporale specifico (0-8).
 */

function resolveBritishRajPartition(fid: string, meta: any, p: any, s: number = 19): ResolvedTerritory {
  const rawName = String(p.NAME || p.name || p.NUTS_NAME || (meta ? meta.name : '') || fid);
  const isDec1947 = s >= 20;
  const isJune1948 = s >= 21;
  const isDec1948 = s >= 22;
  const isJune1949 = s >= 23;
  const isDec1949 = s >= 24;
  const isJune1950 = s >= 25;
  const isDec1956 = s >= 33;

  // 0. Ceylon (LK_) — Dominion of Ceylon from 4 February 1948 (s >= 21)
  if (fid.startsWith('LK_') || fid === 'LK' || fid === 'LKA' || (meta && meta.cntrCode === 'LK')) {
    if (isJune1948) {
      return makeResult(
        'CEY',
        'Dominion di Ceylon (Reame Indipendente del Commonwealth — 4 Febbraio 1948)',
        "Il 4 febbraio 1948 entra in vigore il Ceylon Independence Act 1947: l'isola di Ceylon cessa di essere una Colonia della Corona britannica e diviene il Dominion di Ceylon, reame indipendente all'interno del Commonwealth delle Nazioni sotto il Primo Ministro Don Stephen Senanayake e il Governatore Generale Sir Henry Monck-Mason Moore, adottando la storica bandiera del Leone d'oro di Kandy.",
        'Alleati',
        'Dominion of Ceylon (PM D.S. Senanayake · Gov.-Gen. Sir Henry Monck-Mason Moore)'
      );
    }
    return makeResult(
      'UK',
      'Colonia della Corona di Ceylon (Transizione verso lo Status di Dominion — Costituzione Soulbury)',
      "Colonia britannica dotata di autogoverno interno secondo la Costituzione Soulbury; nel novembre-dicembre 1947 il Parlamento britannico approva il Ceylon Independence Act che sancisce l'indipendenza del Dominion di Ceylon per il 4 febbraio 1948 sotto D.S. Senanayake.",
      'Alleati',
      'Crown Colony of Ceylon (Gov. Sir Henry Monck-Mason Moore · PM D.S. Senanayake)'
    );
  }

  // 1. Burma / Birmania (MM_) — Independent Union of Burma from 4 January 1948 (s >= 21)
  if (fid.startsWith('MM_') || (meta && meta.cntrCode === 'MM')) {
    if (isJune1948) {
      const isInsurgentProv = fid === 'MM_BAG' || fid === 'MM_IRR' || fid === 'MM_MAG' || fid === 'MM_RAK';
      const provLabel = (meta && (meta.nutsName || meta.name)) || rawName || 'Birmania';
      return makeResult(
        'BUR',
        isInsurgentProv
          ? `Unione della Birmania — ${provLabel} (Indipendenza 4 Gen 1948 & Insurrezione Comunista CPB)`
          : `Unione della Birmania — ${provLabel} (Repubblica Sovrana Indipendente — 4 Gennaio 1948)`,
        isInsurgentProv
          ? `Alle ore 04:20 del 4 gennaio 1948 viene proclamata a Rangoon la Repubblica sovrana dell'Unione della Birmania fuori dal Commonwealth britannico (Presidente Sao Shwe Thaik, Primo Ministro U Nu). Nel marzo 1948 il Partito Comunista della Birmania (CPB, 'Bandiera Bianca' di Thakin Than Tun, affiancato dalla 'Bandiera Rossa' di Thakin Soe e dall'organizzazione paramilitare PVO) scatena una vasta insurrezione armata rurale nelle campagne della Birmania centrale e meridionale (${provLabel}, monti Pegu Yoma, delta dell'Irrawaddy e Arakan), mentre il governo dell'AFPFL mantiene il controllo di Rangoon, Mandalay e delle principali città.`
          : "Alle ore 04:20 del 4 gennaio 1948, in attuazione del Trattato Nu-Attlee e del Burma Independence Act, cessa il dominio coloniale britannico e nasce l'Unione della Birmania (Pyidaungzu Myanma Naingngandaw), repubblica sovrana pienamente indipendente al di fuori del Commonwealth delle Nazioni, guidata dal Presidente Sao Shwe Thaik e dal Primo Ministro U Nu.",
        'Neutrale',
        isInsurgentProv
          ? 'Union of Burma (PM U Nu) · Fronte Interno Contro-Insurrezionale (Guerriglia Comunista CPB)'
          : 'Union of Burma · Pyidaungzu Myanma Naingngandaw (Pres. Sao Shwe Thaik · PM U Nu)'
      );
    }
    return makeResult(
      'UK',
      isDec1947
        ? 'Birmania Britannica in Transizione (Trattato Nu-Attlee & Burma Independence Act — Vigilia dell\'Indipendenza)'
        : 'Birmania Britannica in Transizione (Governo Provvisorio di U Nu — Pre-Indipendenza)',
      isDec1947
        ? "Al 31 dicembre 1947 la Birmania rimane de jure sotto sovranit\u00e0 britannica per gli ultimi quattro giorni: dopo la firma del Trattato Nu-Attlee (17 ottobre 1947) e l'approvazione del Burma Independence Act (10 dicembre 1947), il Primo Ministro U Nu e il Governatore Sir Hubert Rance preparano la proclamazione dell'indipendenza dell'Unione di Birmania fuori dal Commonwealth, fissata per le ore 04:20 del 4 gennaio 1948."
        : "Al 30 settembre 1947, a seguito del tragico assassinio del leader indipendentista Aung San e di sei membri del consiglio esecutivo (19 luglio 1947), U Nu guida il governo provvisorio birmano. Sono in corso a Londra i negoziati con il governo laburista di Clement Attlee per il Trattato Nu-Attlee (firmato il 17 ottobre 1947), che sancir\u00e0 la piena indipendenza della Birmania e l'uscita dal Commonwealth il 4 gennaio 1948.",
      'Alleati',
      isDec1947
        ? 'British Crown Colony of Burma · Nu-Attlee Treaty Transition (PM U Nu · Independence on 4 Jan 1948)'
        : 'British Crown Colony of Burma · Interim Government (Prime Minister U Nu)'
    );
  }

  // 2. Disputed Princely State: Jammu & Kashmir (IN_JK, IN_LAD, PK_AJK, PK_GB)
  if (fid === 'IN_JK' || fid === 'IN_LAD' || fid === 'PK_AJK' || fid === 'PK_GB') {
    if (isDec1956) {
      if (fid === 'IN_JK' || fid === 'IN_LAD') {
        const isLadakh = fid === 'IN_LAD';
        return makeResult(
          'IND',
          isLadakh
            ? "Repubblica dell'India — Stato di Jammu e Kashmir · Settore del Ladakh (States Reorganisation Act 1° Nov 1956)"
            : "Repubblica dell'India — Stato di Jammu e Kashmir (Costituzione J&K Nov 1956 · States Reorganisation Act)",
          isLadakh
            ? "31 Dicembre 1956: con l'abolizione delle categorie A/B/C/D (1° novembre 1956), Jammu e Kashmir è uno dei 14 Stati della Repubblica dell'India; il Ladakh (Leh, Dras, Kargil) resta sotto amministrazione indiana lungo la Linea del Cessate il Fuoco ONU."
            : "31 Dicembre 1956 (States Reorganisation Act, 1° Novembre 1956): abolite le categorie A/B/C/D, Jammu e Kashmir è uno dei 14 Stati dell'Unione Indiana; il 17 novembre 1956 l'Assemblea Costituente statale (governo Bakshi Ghulam Mohammad) adotta la Costituzione statale che sancisce l'adesione all'India.",
          'Neutrale',
          isLadakh
            ? 'Republic of India · State of Jammu & Kashmir — Ladakh Sector (14 States Reorganization 1956)'
            : 'Republic of India · State of Jammu & Kashmir (PM Bakshi Ghulam Mohammad · J&K Constitution Nov 1956)'
        );
      }
      const isGilgit = fid === 'PK_GB';
      return makeResult(
        'PAK',
        isGilgit
          ? 'Repubblica Islamica del Pakistan — Gilgit-Baltistan (Costituzione 23 Mar 1956)'
          : 'Repubblica Islamica del Pakistan — Azad Jammu e Kashmir (Costituzione 23 Mar 1956)',
        isGilgit
          ? '31 Dicembre 1956: Gilgit e il Baltistan (Skardu) restano sotto amministrazione della neonata Repubblica Islamica del Pakistan (proclamata il 23 marzo 1956 con la prima Costituzione; Presidente Iskander Mirza) a nord della Ceasefire Line ONU.'
          : '31 Dicembre 1956: l\'Azad Jammu e Kashmir (Muzaffarabad, Mirpur) permane sotto protezione della Repubblica Islamica del Pakistan (proclamata il 23 marzo 1956 · Membro del Commonwealth, SEATO e Patto di Baghdad) lungo la Linea del Cessate il Fuoco ONU.',
        'Alleati',
        isGilgit
          ? 'Islamic Republic of Pakistan · Gilgit Agency & Baltistan (Const. 23 Mar 1956)'
          : 'Islamic Republic of Pakistan · Azad Jammu & Kashmir (UN Ceasefire Line · Const. 23 Mar 1956)'
      );
    }
    if (isJune1949) {
      if (fid === 'IN_JK' || fid === 'IN_LAD') {
        const isLadakh = fid === 'IN_LAD';
        if (isJune1950) {
          return makeResult(
            'IND',
            isLadakh
              ? 'Repubblica dell\'India — Stato di Categoria B: Jammu e Kashmir · Settore del Ladakh (Linea ONU)'
              : 'Repubblica dell\'India — Stato di Categoria B: Jammu e Kashmir (Costituzione 26 Gennaio 1950)',
            isLadakh
              ? "30 Giugno 1950: con la proclamazione della Repubblica dell'India (26 gennaio 1950), Jammu e Kashmir entra tra gli Stati di Categoria B (con statuto costituzionale speciale); il settore del Ladakh (Leh, Dras, Kargil) resta sotto controllo indiano lungo la Ceasefire Line ONU."
              : "30 Giugno 1950: con la Costituzione della Repubblica dell'India (26 gennaio 1950), Jammu e Kashmir è Stato di Categoria B (PM Sheikh Abdullah, regime costituzionale speciale Art. 370) lungo la Ceasefire Line ONU.",
            'Alleati',
            isLadakh
              ? 'Republic of India · Part B State: Jammu & Kashmir — Ladakh Sector (UN Ceasefire Line)'
              : 'Republic of India · Part B State: Jammu & Kashmir (PM Sheikh Abdullah)'
          );
        }
        return makeResult(
          'IND',
          isLadakh
            ? 'Dominion dell\'India — Ladakh (Tregua ONU del 1° Gennaio 1949 · Leh, Dras & Kargil)'
            : 'Dominion dell\'India — Valle del Kashmir e Jammu (Linea del Cessate il Fuoco ONU, 1° Gennaio 1949)',
          isLadakh
            ? "Dal 1° gennaio 1949 entra in vigore il cessate il fuoco ONU in Kashmir: il settore di Leh, Dras e Kargil resta presidiato dall'Esercito Indiano lungo la nuova Ceasefire Line vigilata dagli osservatori UNCIP / UNMOGIP."
            : "Dal 1° gennaio 1949 entra in vigore il cessate il fuoco mediato dall'ONU (UNCIP) tra India e Pakistan: Srinagar, la Valle del Kashmir, Jammu e Poonch restano sotto sovranità dell'India (governo di Sheikh Abdullah) lungo la Ceasefire Line.",
          'Alleati',
          isLadakh
            ? 'Dominion of India · Ladakh Sector (UN Ceasefire Line, 1 Jan 1949)'
            : 'Dominion of India · Jammu & Kashmir (PM Sheikh Abdullah · UN Ceasefire Line, 1 Jan 1949)'
        );
      }
      const isGilgit = fid === 'PK_GB';
      return makeResult(
        'PAK',
        isGilgit
          ? 'Dominion del Pakistan — Gilgit-Baltistan (Tregua ONU del 1° Gennaio 1949 · Skardu)'
          : 'Dominion del Pakistan — Azad Jammu e Kashmir (Linea del Cessate il Fuoco ONU, 1° Gennaio 1949)',
        isGilgit
          ? "Dal 1° gennaio 1949 la Linea del Cessate il Fuoco ONU cristallizza il controllo pakistano su Gilgit e sul Baltistan (inclusa Skardu) a nord della fascia himalayana tenuta dall'India."
          : "Dal 1° gennaio 1949 il cessate il fuoco ONU stabilizza la fascia occidentale dell'Azad Kashmir (Muzaffarabad, Mirpur, Bagh e Rawalakot) sotto amministrazione azad-kashmira e protezione pakistana.",
        'Alleati',
        isGilgit
          ? 'Dominion of Pakistan · Gilgit Agency & Baltistan (UN Ceasefire Line, 1 Jan 1949)'
          : 'Dominion of Pakistan · Azad Jammu & Kashmir (Sardar Ibrahim Khan · UN Ceasefire Line, 1 Jan 1949)'
      );
    }
    if (isDec1948) {
      if (fid === 'IN_JK' || fid === 'IN_LAD') {
        const isLadakh = fid === 'IN_LAD';
        return makeResult(
          'IND',
          isLadakh
            ? 'Dominion dell\'India — Ladakh (Riconquista di Zoji La, Dras & Kargil in Op. Bison; Vigilia Cessate il Fuoco ONU)'
            : 'Dominion dell\'India — Valle del Kashmir e Jammu (Sblocco di Poonch in Op. Easy; Linea del Cessate il Fuoco Finale)',
          isLadakh
            ? "Nel novembre 1948 (Operazione Bison) i carri leggeri Stuart e la fanteria dell'Esercito Indiano sfondano il passo himalayano dello Zoji La nella tormenta e riconquistano Dras e Kargil, riaprendo i collegamenti terrestri con Leh; dopo la caduta della guarnigione indiana di Skardu nell'agosto 1948, il settore Ladakh–Leh si stabilizza sotto controllo indiano alla vigilia del cessate il fuoco ONU (1° gennaio 1949)."
            : "Con le offensive autunnali di novembre 1948 (Operazione Easy) le forze indiane liberano definitivamente dall'assedio la piazzaforte di Poonch collegandola al Jammu, consolidando l'intera Valle del Kashmir (Srinagar, Baramulla, Uri, Tithwal) e il Jammu lungo la linea del fronte destinata a divenire la Linea del Cessate il Fuoco ONU (1° gennaio 1949).",
          'Alleati',
          isLadakh
            ? 'Dominion of India · Ladakh Sector (Post-Operation Bison: Leh, Dras & Kargil · Ceasefire Line)'
            : 'Dominion of India · Jammu & Kashmir Sector (PM Sheikh Abdullah · Post-Operation Easy: Valley, Jammu & Poonch)'
        );
      }
      const isGilgit = fid === 'PK_GB';
      return makeResult(
        'PAK',
        isGilgit
          ? 'Dominion del Pakistan — Gilgit-Baltistan (Presa di Skardu, Ago 1948 & Linea del Cessate il Fuoco)'
          : 'Dominion del Pakistan — Azad Jammu e Kashmir (Linea del Cessate il Fuoco ONU, Dicembre 1948)',
        isGilgit
          ? "Dopo la resa della guarnigione indiana del forte di Skardu il 14 agosto 1948 e la controffensiva indiana di novembre su Dras e Kargil (Operazione Bison), il Pakistan mantiene stabilmente Gilgit e il Baltistan (inclusa Skardu) lungo la linea del cessate il fuoco ONU del 1° gennaio 1949."
          : "Al 31 dicembre 1948, dopo la riconquista indiana di Poonch (Operazione Easy, novembre 1948), l'Esercito Pakistano e le forze dell'Azad Kashmir mantengono l'intera fascia occidentale (Muzaffarabad, Mirpur, Bagh, Kotli e Rawalakot) lungo la linea che il 1° gennaio 1949 diverrà la Linea del Cessate il Fuoco ONU.",
        'Alleati',
        isGilgit
          ? 'Dominion of Pakistan · Gilgit Agency & Baltistan (Skardu · Ceasefire Line)'
          : 'Dominion of Pakistan · Azad Jammu & Kashmir (Muzaffarabad & Mirpur · Ceasefire Line)'
      );
    }
    if (isJune1948) {
      if (fid === 'IN_JK' || fid === 'IN_LAD') {
        const isLadakh = fid === 'IN_LAD';
        return makeResult(
          'IND',
          isLadakh
            ? 'Dominion dell\'India — Ladakh (Leh Difesa per Via Aerea; Dras e Kargil Cadute in Mano Pakistana, Maggio 1948)'
            : 'Dominion dell\'India — Valle del Kashmir e Jammu (Riconquista Indiana di Rajauri e Tithwal, Primavera 1948)',
          isLadakh
            ? "Nel maggio 1948 le forze regolari dell'Esercito Pakistano entrano ufficialmente nel conflitto del Kashmir: nel settore settentrionale i Gilgit Scouts e gli irregolari pakistani conquistano Dras e Kargil (maggio 1948), interrompendo i collegamenti terrestri tra Srinagar e Leh e stringendo d'assedio la guarnigione indiano-dogra di Skardu (che al 30 giugno 1948 resiste ancora sotto il ten. col. Sher Jung Thapa), mentre il generale Thimayya e i Dakota dell'aeronautica indiana blindano la difesa di Leh e della valle dell'Indo."
            : "Nell'offensiva di primavera (aprile–maggio 1948) l'Esercito Indiano riconquista Rajauri nel Jammu (12 aprile) e avanza fino a Tithwal (23 maggio) minacciando Muzaffarabad, provocando l'intervento ufficiale delle brigate regolari dell'Esercito Pakistano. Al 30 giugno 1948 l'India consolida il controllo sulla Valle del Kashmir (Srinagar, Baramulla, Anantnag), sulla pianura del Jammu e sulla piazzaforte assediata di Poonch.",
          'Alleati',
          'Dominion of India · Jammu & Kashmir Emergency Administration (PM Sheikh Abdullah · Maj. Gen. K.S. Thimayya)'
        );
      }
      const isGilgit = fid === 'PK_GB';
      return makeResult(
        'PAK',
        isGilgit
          ? 'Dominion del Pakistan — Gilgit-Baltistan (Presa di Dras e Kargil e Assedio di Skardu, Maggio–Giugno 1948)'
          : 'Dominion del Pakistan — Azad Jammu e Kashmir (Intervento Regolare dell\'Esercito Pakistano, Maggio 1948)',
        isGilgit
          ? "Nel maggio–giugno 1948 i Gilgit Scouts e le colonne pakistane consolidano il controllo dell'intero Gilgit-Baltistan, stringono d'assedio la guarnigione indiana del forte di Skardu (che cadrà solo nell'agosto 1948) e catturano Dras e Kargil tagliando la via terrestre per Leh."
          : "Nel maggio 1948 l'Esercito regolare del Pakistan entra ufficialmente in linea a fianco delle milizie dell'Azad Kashmir per arrestare l'offensiva indiana dopo la caduta di Tithwal, stabilizzando il fronte occidentale lungo la fascia Muzaffarabad–Uri–Poonch–Mirpur.",
        'Alleati',
        isGilgit
          ? 'Dominion of Pakistan · Gilgit Agency & Baltistan Front (Assedio di Skardu · Presa di Kargil)'
          : 'Dominion of Pakistan · Azad Jammu & Kashmir & Pakistan Army Regular Front'
      );
    }
    if (isDec1947) {
      if (fid === 'IN_JK' || fid === 'IN_LAD') {
        const isLadakh = fid === 'IN_LAD';
        return makeResult(
          'IND',
          isLadakh
            ? 'Dominion dell\'India — Ladakh (Leh & Kargil — Prima Guerra del Kashmir)'
            : 'Dominion dell\'India — Valle del Kashmir e Jammu (Srinagar, Jammu & Poonch — Prima Guerra del Kashmir)',
          isLadakh
            ? "A seguito dell'invasione tribale pashtun (22 ottobre 1947) e della firma dell'Instrument of Accession all'India da parte del Maharaja Hari Singh (26 ottobre 1947), il vasto altopiano himalayano del Ladakh (Leh e Kargil) passa all'Unione dell'India, mentre lungo l'alto Indo si accendono gli scontri invernali con gli insorti di Gilgit."
            : "In seguito all'invasione delle milizie tribali pashtun (22 ottobre 1947), il Maharaja Hari Singh firma l'Instrument of Accession all'India (26 ottobre 1947): il 27 ottobre i Dakota indiani sbarcano la 161ª Brigata a Srinagar salvando la capitale (Battaglia di Shalateng, 7 novembre) e nominando Sheikh Abdullah a capo dell'Amministrazione di Emergenza. Al 31 dicembre 1947 l'India controlla la Valle del Kashmir (Srinagar, Baramulla, Anantnag), Jammu e la città assediata di Poonch.",
          'Alleati',
          'Dominion of India · Emergency Administration of Jammu & Kashmir (Sheikh Abdullah / Indian Army JAK Force)'
        );
      }
      const isGilgit = fid === 'PK_GB';
      return makeResult(
        'PAK',
        isGilgit
          ? 'Dominion del Pakistan — Agenzia di Gilgit e Baltistan (Rivolta dei Gilgit Scouts, Nov 1947)'
          : 'Dominion del Pakistan — Azad Jammu e Kashmir (Governo Provvisorio di Muzaffarabad, 24 Ott 1947)',
        isGilgit
          ? "Tra il 1° e il 4 novembre 1947 i Gilgit Scouts comandati dal maggiore britannico William Brown insorgono contro il governatore Dogra brigadiere Ghansara Singh a Gilgit, proclamando l'adesione al Pakistan; il 16 novembre l'agente politico pakistano Sardar Mohammad Alam assume l'amministrazione diretta di Gilgit e Hunza per conto di Karachi."
          : "Il 24 ottobre 1947, due giorni dopo l'ingresso delle milizie tribali pashtun (Lashkar) nella valle del Jhelum, viene proclamato a Palandri/Muzaffarabad il Governo Provvisorio di Azad Jammu e Kashmir sotto la presidenza di Sardar Muhammad Ibrahim Khan, sostenuto militarmente e politicamente dal Dominion del Pakistan. Al 31 dicembre 1947 controlla la fascia occidentale (Muzaffarabad, Mirpur, Bagh, Rawalakot).",
        'Alleati',
        isGilgit
          ? 'Dominion of Pakistan · Gilgit Agency (Political Agent Sardar Mohammad Alam / Gilgit Scouts)'
          : 'Dominion of Pakistan · Provisional Government of Azad Jammu & Kashmir (Pres. Sardar Ibrahim Khan · Cap. Muzaffarabad)'
      );
    }
    return makeResult(
      'KAS',
      'Regno Principesco di Jammu e Kashmir (Indipendenza Provvisoria — Maharaja Hari Singh)',
      "Al 30 settembre 1947 il Maharaja Hari Singh mantiene provvisoriamente la piena indipendenza del principato himalayano, avendo rifiutato di aderire sia all'India sia al Pakistan e firmando un accordo di Standstill con Karachi. La situazione precipiter\u00e0 il 22 ottobre 1947 con l'invasione delle trib\u00f9 pashtun appoggiate dall'esercito pakistano (Operazione Gulmarg), costringendo il Maharaja a firmare l'accessione all'India il 26 ottobre in cambio dell'immediato soccorso militare aerotrasportato a Srinagar.",
      'Neutrale',
      'Stato Principesco Indipendente di Jammu e Kashmir (Maharaja Hari Singh · Standstill Agreement)'
    );
  }

  // 3. Disputed Princely State: Hyderabad (IN_HYD)
  if (fid === 'IN_HYD') {
    if (isDec1956) {
      return makeResult(
        'IND',
        "Repubblica dell'India — Stato dell'Andhra Pradesh (Scioglimento di Hyderabad · States Reorganisation Act 1° Nov 1956)",
        "1° Novembre – 31 Dicembre 1956 (States Reorganisation Act): cessa di esistere l'ex Stato di Categoria B di Hyderabad, ripartito su base linguistica: la regione telugu del Telangana (con capitale Hyderabad) si fonde con lo Stato dell'Andhra formando il nuovo Stato dell'Andhra Pradesh (PM Neelam Sanjiva Reddy), mentre Marathwada passa a Bombay e Hyderabad-Karnataka a Mysore.",
        'Neutrale',
        'Republic of India · State of Andhra Pradesh (Hyderabad Capital · States Reorganisation Act 1 Nov 1956)'
      );
    }
    if (isJune1950) {
      return makeResult(
        'IND',
        "Repubblica dell'India — Stato di Categoria B: Hyderabad (Costituzione del 26 Gennaio 1950)",
        "30 Giugno 1950: con l'entrata in vigore della Costituzione repubblicana il 26 gennaio 1950 (Presidente Rajendra Prasad, PM Jawaharlal Nehru), Hyderabad diviene uno Stato di Categoria B della Repubblica dell'India (l'ex Nizam Asaf Jah VII con il titolo cerimoniale di Rajpramukh e il governo civile di M.K. Vellodi).",
        'Alleati',
        'Republic of India · Part B State: Hyderabad (26 Jan 1950)'
      );
    }
    if (isDec1948) {
      return makeResult(
        'IND',
        'Dominion dell\'India — Stato di Hyderabad (Annessione post-Operazione Polo, 17 Settembre 1948)',
        "Tra il 13 e il 17 settembre 1948 l'Esercito Indiano guidato dal Magg. Gen. Jayanto Nath Chaudhuri lancia l'Operazione Polo («Azione di Polizia»), sbaragliando le forze armate dello Stato e le milizie irregolari Razakar di Qasim Razvi in cinque giorni. Il 17 settembre il Nizam Mir Osman Ali Khan annuncia la resa e accetta l'integrazione di Hyderabad (Telangana, Marathwada e Hyderabad-Karnataka) nell'Unione dell'India sotto il governatorato militare del Gen. Chaudhuri.",
        'Alleati',
        'Dominion of India · State of Hyderabad (Governatore Militare Magg. Gen. J.N. Chaudhuri — Post-Operazione Polo, Set 1948)'
      );
    }
    return makeResult(
      'HYD',
      isJune1948
        ? 'Stato Sovrano di Hyderabad (Autonomia de facto Non Allineata — Blocco Indiano & Crisi dei Razakar, Giugno 1948)'
        : isDec1947
        ? 'Stato Sovrano di Hyderabad (Autonomia de facto — Standstill Agreement del 29 Novembre 1947)'
        : 'Stato Sovrano di Hyderabad (Indipendenza Non Allineata — Nizam Asaf Jah VII)',
      isJune1948
        ? "Al 30 giugno 1948 lo Stato di Hyderabad sotto il Nizam Mir Osman Ali Khan Asaf Jah VII e il primo ministro Mir Laik Ali rimane ancora de facto indipendente e non annesso all'Unione Indiana: in seguito alle violenze delle milizie paramilitari Razakar di Qasim Razvi e all'insurrezione comunista del Telangana, Nuova Delhi stringe il blocco economico attorno al principato (che sarà annesso dall'esercito indiano solo nel settembre 1948 con l'Operazione Polo)."
        : isDec1947
        ? "Il 29 novembre 1947 il Nizam Mir Osman Ali Khan Asaf Jah VII e il Governatore Generale dell'India Lord Mountbatten firmano uno Standstill Agreement della durata di un anno, che congela lo status quo costituzionale: al 31 dicembre 1947 l'Hyderabad rimane uno stato autonomo de facto non integrato nell'Unione Indiana, con proprio esercito, moneta (Hyderabadi rupee) e milizie paramilitari Razakar di Kasim Razvi, fino all'Operazione Polo del settembre 1948."
        : "Al 30 settembre 1947 il settimo Nizam, Mir Osman Ali Khan Asaf Jah VII, sovrano dello stato principesco pi\u00f9 vasto e ricco dell'India con oltre 16 milioni di abitanti, moneta, ferrovie e poste proprie, ha proclamato la piena sovranit\u00e0 e indipendenza, rifiutando l'adesione all'Unione Indiana e avvalendosi del sostegno delle milizie irregolari filoislamiche Razakar guidate da Kasim Razvi. Il contenzioso culminer\u00e0 nel settembre 1948 con l'invasione militare indiana (Operazione Polo) e l'annessione forzata.",
      'Neutrale',
      isJune1948
        ? 'Stato Sovrano di Hyderabad (Nizam Asaf Jah VII · PM Mir Laik Ali — Autonomo al 30 Giugno 1948)'
        : isDec1947
        ? 'Stato Principesco di Hyderabad (Nizam Asaf Jah VII · Standstill Agreement con l\'India del 29 Nov 1947)'
        : 'Stato Sovrano di Hyderabad (Nizam-ul-Mulk Mir Osman Ali Khan · Dichiarazione di Indipendenza)'
    );
  }

  // 4. European Enclaves: Portuguese India (Goa, Daman, Diu, Dadra & Nagar Haveli)
  if (fid === 'IN_DNH') {
    if (s >= 33) {
      return makeResult(
        'IND',
        'Dadra e Nagar Haveli — "Free Dadra & Nagar Haveli" (Amministrazione Pro-Indiana · Vertenza CIG, Dic 1956)',
        "31 Dicembre 1956 (Controllo de facto Indiano / Free Dadra & Nagar Haveli): le enclavi interne di Dadra e Nagar Haveli (Silvassa), sottratte al controllo portoghese nel luglio–agosto 1954, restano sotto amministrazione autonoma del Varishta Panchayat strettamente allineata all'Unione Indiana mentre pende alla Corte Internazionale di Giustizia il ricorso portoghese sul diritto di transito (Goa, Damão e Diu restano al Portogallo).",
        'Neutrale',
        'Varishta Panchayat of Free Dadra and Nagar Haveli (Controllo de facto Indiano · Causa Portogallo vs India alla CIG)'
      );
    }
    if (s >= 31) {
      return makeResult(
        'IND',
        'Dadra e Nagar Haveli — Amministrazione Autonoma Pro-Indiana ("Free Dadra & Nagar Haveli", 2 Agosto 1954)',
        "31 Dicembre 1954 (Controllo de facto Indiano / Free Dadra and Nagar Haveli): tra il 22 luglio e il 2 agosto 1954 forze nazionaliste e volontari dell'Azad Gomantak Dal e del RSS occupano le enclavi interne di Dadra e di Nagar Haveli (Silvassa) espellendo la guarnigione portoghese; la Corte Internazionale dell'Aia rifiuterà in seguito il diritto di transito armato portoghese attraverso il territorio indiano (Goa, Damão e Diu restano portoghesi).",
        'Neutrale',
        'Varishta Panchayat of Free Dadra and Nagar Haveli (Amministrazione de facto Integrata nell\'Unione Indiana, 2 Ago 1954)'
      );
    }
    return makeResult(
      'POR',
      'Stato Portoghese dell\'India — Enclavi di Dadra e Nagar Haveli (Silvassa)',
      "Enclavi portoghesi nell'entroterra del Gujarat dipendenti amministrativamente dal Distretto di Damão (Estado Português da Índia).",
      'Neutrale',
      'Estado Portugu\u00eas da \u00cdndia · Concelho de Nagar Aveli e Dadr\u00e1 (Silvassa)'
    );
  }
  if (fid === 'IN_GOA' || fid === 'IN_DNH_DAM') {
    if (s >= 33) {
      return makeResult(
        'POR',
        'Stato Portoghese dell\'India — Goa, Damão e Diu (Provincia Oltremare Portoghese · Dic 1956)',
        "31 Dicembre 1956: nonostante la perdita de facto delle enclavi interne di Dadra e Nagar Haveli (1954) e il blocco economico-doganale di Nuova Delhi, Goa, Damão e Diu restano saldamente sotto sovranità portoghese come Provincia Ultramarina del regime dell'Estado Novo di Salazar (Governatore Generale Paulo Bénard Guedes).",
        'Neutrale',
        'Estado Português da Índia · Província Ultramarina de Goa, Damão e Diu (Gov. Paulo Bénard Guedes, Dic 1956)'
      );
    }
    if (s >= 31) {
      return makeResult(
        'POR',
        'Stato Portoghese dell\'India — Goa, Damão e Diu (Escl. Dadra & Nagar Haveli, Persa Ago 1954)',
        "31 Dicembre 1954 (Ancora Provincia Oltremare Portoghese): nonostante la perdita de facto delle enclavi interne di Dadra e Nagar Haveli (luglio–agosto 1954) e il fallimento dei primi cortei satyagraha del 15 agosto 1954, il governo di António de Oliveira Salazar mantiene saldamente sotto sovranità portoghese i territori costieri di Goa, Damão e Diu (respingendo ogni richiesta di cessione avanzata da Nuova Delhi).",
        'Neutrale',
        'Estado Português da Índia · Província Ultramarina de Goa, Damão e Diu (Gov. Paulo Bénard Guedes, Dic 1954)'
      );
    }
    return makeResult(
      'POR',
      'Stato Portoghese dell\'India — Governo di Goa (Nova Goa)',
      "Enclave sovrana dell'Impero Coloniale Portoghese guidata dal Governatore Generale Jos\u00e9 Ferreira Bossa a Nova Goa (Panaji); nonostante la proclamazione dell'indipendenza indiana, il governo dell'Estado Novo di Ant\u00f3nio de Oliveira Salazar a Lisbona ribadisce che i possedimenti di Goa, Dam\u00e3o e Diu costituiscono territorio metropolitano inalienabile del Portogallo.",
      'Neutrale',
      'Estado Portugu\u00eas da \u00cdndia · Governo-Geral de Goa (Pal\u00e1cio do Idalc\u00e3o, Nova Goa)'
    );
  }

  // 5. European Enclaves: French India (Pondicherry, Karikal, Yanaon, Mahé, Chandernagore)
  if (fid === 'IN_PON') {
    if (s >= 33) {
      return makeResult(
        'IND',
        "Pondichéry, Karikal, Mahé & Yanam — Trattato di Cessione Franco-Indiano (28 Maggio 1956 · Unione Indiana)",
        "28 Maggio – 31 Dicembre 1956 (Unione Indiana): dopo il trasferimento de facto del 1° novembre 1954, Francia e India firmano a Nuova Delhi il 28 maggio 1956 il Trattato di Cessione formale dei quattro comptoir (Pondichéry, Karikal, Mahé e Yanam — che sarà ratificato dal Parlamento francese nel 1962), amministrati dallo Stato di Pondicherry dell'Unione Indiana.",
        'Neutrale',
        'Republic of India — State of Pondicherry (Trattato di Cessione Franco-Indiano del 28 Maggio 1956)'
      );
    }
    if (s >= 31) {
      return makeResult(
        'IND',
        "Pondichéry, Karikal, Mahé & Yanam — Trasferimento de facto all'India (1° Novembre 1954)",
        "31 Dicembre 1954 (Unione Indiana — Controllo de facto dal 1° Novembre 1954): in attuazione dell'Accordo franco-indiano di Nuova Delhi del 21 ottobre 1954 (preceduto dal voto favorevole del congresso di Kizhoor del 18 ottobre), il 1° novembre 1954 la Francia trasferisce pacificamente all'India l'amministrazione de facto dei quattro ultimi comptoir di Pondichéry, Karikal, Mahé e Yanam.",
        'Neutrale',
        'Republic of India — State of Pondicherry (Trasferimento Franco-Indiano de facto del 1° Novembre 1954)'
      );
    }
    if (s >= 30) {
      return makeResult(
        'FRA',
        "Stabilimenti Francesi dell'India — Pondichéry, Karikal, Mahé e Yanam (Ancora Sotto Sovranità Francese al 31 Dicembre 1953)",
        "31 Dicembre 1953 (Quarta Repubblica Francese · Esclusa Chandernagore ceduta il 2 maggio 1950): i quattro comptoir francesi di Pondichéry, Karikal, Mahé e Yanam restano ancora sotto amministrazione della Francia al 31 dicembre 1953 nonostante le crescenti tensioni con Nuova Delhi e il movimento pro-integrazione (il trasferimento de facto all'India avverrà solo il 1° novembre 1954).",
        'Alleati',
        "Établissements français dans l'Inde (Pondichéry, Karikal, Mahé, Yanam — Commissario André Ménard, Dic 1953)"
      );
    }
    if (isJune1950) {
      return makeResult(
        'FRA',
        "Stabilimenti Francesi dell'India — Pondichéry, Karikal, Mahé e Yanam (Chandernagore Ceduta il 2 Maggio 1950)",
        "Il 2 maggio 1950, in attuazione del referendum del giugno 1949, la Francia trasferisce l'amministrazione de facto dell'enclave bengalese di Chandernagore alla Repubblica dell'India (integrata nel West Bengal); restano francesi i quattro comptoir di Pondichéry, Karikal, Mahé e Yanam (Commissario André Ménard).",
        'Alleati',
        "Établissements français dans l'Inde (Pondichéry, Karikal, Mahé, Yanam — Escl. Chandernagore)"
      );
    }
    return makeResult(
      'FRA',
      'Stabilimenti Francesi dell\'India — Comptoir de Pondich\u00e9ry',
      "I cinque stabilimenti coloniali francesi in India (Pondich\u00e9ry, Karikal, Yanaon, Mah\u00e9 e Chandernagore) rimangono sotto la sovranit\u00e0 della Quarta Repubblica Francese, retti dal Governatore Charles-Fran\u00e7ois Baron. Parigi avvia trattative con il governo di Nuova Delhi per concordare consultazioni popolari sul futuro assetto dei territori.",
      'Alleati',
      '\u00c9tablissements fran\u00e7ais dans l\'Inde (Gouverneur Charles-Fran\u00e7ois Baron)'
    );
  }

  // 6. Pakistan — West Pakistan (PK_) and East Pakistan / East Bengal (BD_)
  if (fid.startsWith('PK_') || fid.startsWith('BD_') || (meta && (meta.cntrCode === 'PK' || meta.cntrCode === 'BD'))) {
    if (isDec1956) {
      const divName = (meta && meta.nutsName) || rawName || fid;
      if (fid.startsWith('BD_')) {
        return makeResult(
          'PAK',
          `Repubblica Islamica del Pakistan — Pakistan Orientale: ${divName} (Costituzione 23 Marzo 1956)`,
          "23 Marzo – 31 Dicembre 1956 (Repubblica Islamica del Pakistan): con l'entrata in vigore della prima Costituzione del 23 marzo 1956 (Presidente Iskander Mirza; PM Huseyn Shaheed Suhrawardy dal settembre 1956), cessa lo status di Dominion britannico e nasce la Repubblica Islamica del Pakistan (restando membro del Commonwealth, SEATO e Patto di Baghdad). L'ex Bengala Orientale forma la provincia del Pakistan Orientale (capitale Dacca).",
          'Alleati',
          'Islamic Republic of Pakistan · Province of East Pakistan (Dacca · Costituzione 23 Mar 1956)'
        );
      }
      if (fid === 'PK_SIN') {
        return makeResult(
          'PAK',
          'Repubblica Islamica del Pakistan — Karachi Capitale Federale & Sindh (Pakistan Occidentale · 23 Mar 1956)',
          "23 Marzo – 31 Dicembre 1956: il 23 marzo 1956 entra in vigore la prima Costituzione che trasforma il Pakistan in Repubblica Islamica del Pakistan con capitale federale a Karachi (Presidente Iskander Mirza, già ultimo Governatore Generale; Primo Ministro Chaudhry Muhammad Ali poi H.S. Suhrawardy). Le province occidentali formano l'unica provincia del West Pakistan (schema 'One Unit').",
          'Alleati',
          'Islamic Republic of Pakistan · Federal Capital Territory Karachi & West Pakistan (Pres. Iskander Mirza · 23 Mar 1956)'
        );
      }
      return makeResult(
        'PAK',
        `Repubblica Islamica del Pakistan — Pakistan Occidentale: ${divName} (Costituzione 23 Marzo 1956 · One Unit)`,
        "23 Marzo – 31 Dicembre 1956 (Repubblica Islamica del Pakistan): con la Costituzione del 23 marzo 1956 il Pakistan cessa di essere un Dominion della Corona britannica e diviene Repubblica Islamica del Pakistan all'interno del Commonwealth (Presidente Iskander Mirza, membro di SEATO e Patto di Baghdad). Dal 14 ottobre 1955 le regioni occidentali (Punjab, Sindh, NWFP, Baluchistan) sono unite nella provincia unica del West Pakistan (capitale Lahore).",
        'Alleati',
        'Islamic Republic of Pakistan · Province of West Pakistan (Lahore · One Unit · Costituzione 23 Mar 1956)'
      );
    }
    // Sylhet Transfer Referendum
    if (fid === 'BD_SYL') {
      return makeResult(
        'PAK',
        'Dominion del Pakistan — Distretto di Sylhet (Bengala Orientale)',
        "A seguito del referendum popolare del 6-7 luglio 1947, il distretto a larghissima maggioranza musulmana di Sylhet si \u00e8 separato dall'Assam per confluire nel Bengala Orientale (Pakistan Orientale), come formalizzato dalla Radcliffe Commission il 17 agosto 1947.",
        'Alleati',
        'Dominion of Pakistan · Province of East Bengal (Sylhet Referendum Transfer)'
      );
    }
    // East Bengal / Dhaka
    if (fid === 'BD_DHA' || fid.startsWith('BD_')) {
      const divName = (meta && meta.nutsName) || rawName || 'Bengala Orientale';
      return makeResult(
        'PAK',
        `Dominion del Pakistan — ${divName} (Pakistan Orientale)`,
        "Al 30 settembre 1947 il Bengala Orientale costituisce l'ala orientale discontinua del Dominion del Pakistan (futuro Bangladesh), separata da oltre 1.600 chilometri di territorio indiano dalla capitale Karachi nel Pakistan Occidentale. La provincia \u00e8 governata dal Premier Khawaja Nazimuddin e dal governatore britannico Sir Frederick Bourne.",
        'Alleati',
        'Dominion of Pakistan · Province of East Bengal (Premier Khawaja Nazimuddin · Cap. Dacca)'
      );
    }
    // West Pakistan provinces
    if (fid === 'PK_PUN') {
      return makeResult(
        'PAK',
        'Dominion del Pakistan — Provincia del Punjab Occidentale (Lahore & Rawalpindi)',
        "Il 17 agosto 1947 la Linea Radcliffe spacca in due il Punjab: Lahore, Rawalpindi e Multan passano al Pakistan, mentre il Punjab orientale va all'India. La drammatica partizione innesca violenze comunitarie devastanti e il pi\u00f9 imponente esodo forzato di milioni di profughi tra musulmani verso ovest e ind\u00f9/sikh verso est.",
        'Alleati',
        'Dominion of Pakistan · West Punjab (Gov. Sir Francis Mudie · Cap. Lahore)'
      );
    }
    if (fid === 'PK_SIN') {
      return makeResult(
        'PAK',
        'Dominion del Pakistan — Provincia del Sindh (Capitale Federale di Karachi)',
        "Capitale inaugurale del neonato Dominion del Pakistan; il 14 agosto 1947 Muhammad Ali Jinnah giura come Governatore Generale (Quaid-e-Azam) e Liaquat Ali Khan come Primo Ministro. Karachi accoglie centinaia di migliaia di rifugiati Muhajir e gestisce la costruzione dell'apparato statale pakistano.",
        'Alleati',
        'Dominion of Pakistan · Federal Capital & Government of Pakistan (Governor-General M.A. Jinnah)'
      );
    }
    if (fid === 'PK_KPK') {
      return makeResult(
        'PAK',
        'Dominion del Pakistan — Provincia della Frontiera del Nord-Ovest (NWFP — Peshawar)',
        "A seguito del referendum del luglio 1947, la provincia ha votato a larghissima maggioranza per l'adesione al Pakistan, nonostante il boicottaggio del movimento dei Khudai Khidmatgar guidato da Abdul Ghaffar Khan (Frontier Gandhi). Al 30 settembre 1947 \u00e8 presidiata dal governo di Karachi.",
        'Alleati',
        'Dominion of Pakistan · North-West Frontier Province (Gov. Sir George Cunningham)'
      );
    }
    if (fid === 'PK_BAL') {
      return makeResult(
        'PAK',
        'Dominion del Pakistan — Provincia del Baluchistan (Quetta)',
        "Al 30 settembre 1947 la provincia del Baluchistan fa parte integrante del Dominion del Pakistan istituito il 14 agosto 1947 sotto il Governatore Generale Muhammad Ali Jinnah. Gli stati principeschi di Kalat, Kharan, Las Bela e Makran mantengono ancora accordi speciali prima dell'integrazione finale.",
        'Alleati',
        'Dominion of Pakistan · Chief Commissioner\'s Province of Baluchistan (Quetta)'
      );
    }
    if (fid === 'PK_ICT') {
      return makeResult(
        'PAK',
        'Dominion del Pakistan — Distretto di Rawalpindi e Altopiano di Potohar',
        "Sede del General Headquarters (GHQ) del neonato Esercito del Pakistan guidato dal generale britannico Frank Messervy; snodo militare strategico dell'altopiano di Potohar alle porte del Kashmir.",
        'Alleati',
        'Dominion of Pakistan · Northern Command & General Headquarters (GHQ Rawalpindi)'
      );
    }
    return makeResult(
      'PAK',
      'Dominion del Pakistan (Pakistan Occidentale)',
      "Territorio sovrano del Dominion del Pakistan istituito il 14 agosto 1947 con la partizione dell'India Britannica sotto il Governatore Generale Muhammad Ali Jinnah.",
      'Alleati',
      'Dominion of Pakistan · Government of Pakistan (Karachi)'
    );
  }

  // 7b. Repubblica dell'India — States Reorganisation Act (1° Novembre 1956: 14 Stati Linguistici & 6 Territori dell'Unione; Abolite Cat. A/B/C/D)
  if (isDec1956) {
    if (s >= 34 && fid === 'IN_NAG') {
      return makeResult(
        'IND',
        "Repubblica dell'India — Naga Hills–Tuensang Area (NHTA · Dal 1° Dicembre 1957)",
        "1° – 31 Dicembre 1957 (Naga Hills–Tuensang Area Act, 1° Dicembre 1957): il Parlamento di Nuova Delhi stacca il distretto delle Naga Hills dallo Stato dell'Assam e la Tuensang Frontier Division dalla NEFA, riunendoli nella nuova unità amministrativa centrale della Naga Hills–Tuensang Area (NHTA, capoluogo Kohima) sotto il Governatore dell'Assam quale agente del Presidente e del Ministero degli Esteri (precursore dello Stato del Nagaland nel 1963).",
        'Neutrale',
        "Republic of India · Naga Hills–Tuensang Area (NHTA — Est. 1 Dec 1957 · Centrally Administered)"
      );
    }

    const sraMap: Record<string, { kind: 'Stato' | 'Territorio dell’Unione' | 'Protettorato'; title: string; note: string }> = {
      IN_ASS: { kind: 'Stato', title: 'Assam', note: s >= 34 ? "Uno dei 14 Stati dell'Unione Indiana (capitale Shillong): dal 1° dicembre 1957 il distretto delle Naga Hills viene staccato per confluire nella nuova unità centrale della Naga Hills–Tuensang Area (NHTA), mentre restano in Assam Khasi–Jaintia–Garo e Mizo Hills." : "Uno dei 14 Stati dell'Unione Indiana dopo il riordino del 1° novembre 1956 (capitale Shillong; include le regioni collinari NEFA, Khasi, Jaintia, Lushai/Mizo e Naga)." },
      IN_ARU: { kind: 'Stato', title: 'Assam (NEFA — North-East Frontier Agency)', note: s >= 34 ? "Settore himalayano della North-East Frontier Agency (NEFA): il 1° dicembre 1957 la Tuensang Frontier Division viene trasferita dalla NEFA alla nuova Naga Hills–Tuensang Area (NHTA), mentre le restanti cinque divisioni restano collegate all'Assam." : "Settore himalayano della North-East Frontier Agency (NEFA) amministrato costituzionalmente in collegamento con lo Stato dell'Assam (Arunachal Pradesh sorgerà solo nel 1972/1987)." },
      IN_MEG: { kind: 'Stato', title: 'Assam (Distretti Autonomi Khasi–Jaintia e Garo)', note: "Nel novembre 1956 le colline Khasi, Jaintia e Garo restano distretti autonomi nello Stato dell'Assam (il Meghalaya sarà staccato solo nel 1972)." },
      IN_MIZ: { kind: 'Stato', title: 'Assam (Distretto Autonomo Mizo Hills)', note: "Nel novembre 1956 il distretto di Mizo Hills (ex Lushai Hills) permane parte dello Stato dell'Assam." },
      IN_NAG: { kind: 'Stato', title: 'Assam (Naga Hills — Rivolta Indipendentista Naga)', note: "Nel 1956 il distretto delle Naga Hills resta nello Stato dell'Assam mentre infuria l'insurrezione armata del Naga National Council (NNC di Phizo) e l'esercito indiano presidia Kohima (lo Stato del Nagaland nascerà nel 1963)." },
      IN_BIH: { kind: 'Stato', title: 'Bihar', note: "Uno dei 14 Stati della Repubblica dell'India (States Reorganisation Act, 1° novembre 1956): con il Bihar and West Bengal (Transfer of Territories) Act cede al West Bengal le aree bengalofone di Purulia/Manbhum e Islampur." },
      IN_JHA: { kind: 'Stato', title: 'Bihar (Altopiano Industriale del Chota Nagpur)', note: "Regione industriale di Ranchi–Jamshedpur parte dello Stato del Bihar nel riordino del 1° novembre 1956 (il Jharkhand nascerà solo nel 2000)." },
      IN_BOM: { kind: 'Stato', title: 'Bombay (Stato Bilingue Marathi–Gujarati Allargato)', note: "1° Novembre 1956 (States Reorganisation Act): abolite le categorie A/B/C, lo Stato bilingue di Bombay è notevolmente ampliato incorporando Saurashtra, Kutch, Marathwada (dall'ex Hyderabad) e Vidarbha/Nagpur (dal Madhya Pradesh), suscitando forti campagne del Samyukta Maharashtra e Mahagujarat (scissione solo nel 1960)." },
      IN_GUJ: { kind: 'Stato', title: 'Bombay (Settore Gujarat, Saurashtra e Kutch)', note: "1° Novembre 1956 (States Reorganisation Act): vengono sciolti lo Stato di Cat. B di Saurashtra e quello di Cat. C di Kutch, entrambi fusi nel grande Stato bilingue di Bombay (il separato Stato del Gujarat verrà creato solo nel 1960)." },
      IN_MP: { kind: 'Stato', title: 'Madhya Pradesh (Capitale Bhopal · Fusione con Madhya Bharat e Vindhya Pradesh)', note: "1° Novembre 1956 (States Reorganisation Act): il nuovo Stato ampliato del Madhya Pradesh (capitale Bhopal) unifica il nucleo hindi di Mahakoshal con gli ex Stati di Madhya Bharat, Vindhya Pradesh e Bhopal, cedendo gli 8 distretti marathi di Vidarbha allo Stato di Bombay." },
      IN_CHH: { kind: 'Stato', title: 'Madhya Pradesh (Settore Orientale del Chhattisgarh)', note: "Fascia orientale (Raipur–Bilaspur–Bastar) confermata nello Stato ristrutturato del Madhya Pradesh il 1° novembre 1956 (il Chhattisgarh nascerà solo nel 2000)." },
      IN_MAD: { kind: 'Stato', title: 'Madras', note: "Uno dei 14 Stati dell'India dopo il 1° novembre 1956 (States Reorganisation Act): lo Stato di Madras assume profilo prettamente tamilofono cedendo il distretto del Malabar allo Stato del Kerala, South Kanara a Mysore e trasferendo le Laccadive in Territorio dell'Unione (assumerà il nome Tamil Nadu solo nel 1969)." },
      IN_AND: { kind: 'Stato', title: 'Andhra Pradesh (Unito al Telangana il 1° Novembre 1956)', note: "1° Novembre 1956 (States Reorganisation Act): primo grande Stato linguistico dell'India unificata, l'Andhra Pradesh nasce dalla fusione dello Stato dell'Andhra (1953) con il Telangana dell'ex Stato di Hyderabad (capitale Hyderabad; primo governatore B. Ramakrishna Rao / CM Neelam Sanjiva Reddy)." },
      IN_ORI: { kind: 'Stato', title: 'Orissa', note: "Uno dei 14 Stati della Repubblica dell'India confermato dal States Reorganisation Act (1° novembre 1956; capitale Bhubaneswar/Cuttack)." },
      IN_PUN: { kind: 'Stato', title: 'Punjab (Fusione con il PEPSU il 1° Novembre 1956)', note: "1° Novembre 1956 (States Reorganisation Act): lo Stato del Punjab assorbe l'ex unione principesca del PEPSU (Patiala and East Punjab States Union, Cat. B) comprendendo sia le aree punjabi sia Haryana e Chandigarh (divisione solo nel 1966)." },
      IN_HAR: { kind: 'Stato', title: 'Punjab (Divisione di Ambala / Haryana)', note: "Nel riordino del 1° novembre 1956 i distretti meridionali hindi di Ambala/Rohtak/Hisar fanno parte dello Stato unificato del Punjab (Haryana separato solo nel 1966)." },
      IN_CHA: { kind: 'Stato', title: 'Punjab (Nuova Capitale Chandigarh & Ex-PEPSU)', note: "Sede della nuova capitale modernista del Punjab progettata da Le Corbusier dopo l'assorbimento del PEPSU nel 1° novembre 1956 (Territorio dell'Unione solo dal 1966)." },
      IN_UP: { kind: 'Stato', title: 'Uttar Pradesh', note: "Uno dei 14 Stati della Repubblica dell'India confermato dal States Reorganisation Act (1° novembre 1956; capitale Lucknow)." },
      IN_UTT: { kind: 'Stato', title: 'Uttar Pradesh (Settore Himalayano Garhwal & Kumaon)', note: "Distretti montani himalayani integrati nello Stato dell'Uttar Pradesh nel riordino del 1° novembre 1956." },
      IN_BEN: { kind: 'Stato', title: 'West Bengal (Annessione di Purulia & Islampur dal Bihar, 1° Nov 1956)', note: "1° Novembre 1956: confermato tra i 14 Stati della Repubblica dell'India, il West Bengal (capitale Calcutta) riceve dal Bihar i territori bengalofoni di Purulia e Islampur creando il corridoio territoriale tra Bengala meridionale e settentrionale." },
      IN_MYS: { kind: 'Stato', title: 'Mysore (Stato Unificato di Lingua Kannada — 1° Novembre 1956)', note: "1° Novembre 1956 (States Reorganisation Act): lo Stato di Mysore (ribattezzato Karnataka solo nel 1973) viene ampliato fondendo l'ex Mysore con i distretti di lingua kannada ceduti da Bombay, Hyderabad, Madras (South Kanara/Bellary) e l'ex Stato Coorg." },
      IN_RAJ: { kind: 'Stato', title: 'Rajasthan (Fusione di Ajmer · Abu Road, 1° Novembre 1956)', note: "1° Novembre 1956 (States Reorganisation Act): uno dei 14 Stati della Repubblica dell'India (capitale Jaipur), allargato con l'assorbimento dell'ex Stato di Cat. C di Ajmer, Abu Road (da Bombay) e Sunel Tappa (da Madhya Bharat)." },
      IN_KER: { kind: 'Stato', title: 'Kerala (Nascita dello Stato Linguistico il 1° Novembre 1956)', note: "1° Novembre 1956 (States Reorganisation Act): nasce lo Stato del Kerala (lingua malayalam) dalla fusione di Travancore–Cochin con il distretto del Malabar e Kasaragod staccati da Madras (cedendo i taluk tamil meridionali di Kanyakumari allo Stato di Madras)." },
      IN_LAK: { kind: 'Territorio dell’Unione', title: 'Laccadive, Minicoy e Amindivi (Nuovo Territorio dell\'Unione, 1° Nov 1956)', note: "1° Novembre 1956 (States Reorganisation Act): le isole Laccadive, Minicoy e Amindivi vengono staccate dallo Stato di Madras e istituite come uno dei 6 nuovi Territori dell'Unione (Union Territories) amministrati direttamente dal governo centrale di Nuova Delhi." },
      IN_DEL: { kind: 'Territorio dell’Unione', title: 'Delhi (Capitale Federale & Territorio dell\'Unione · 1° Nov 1956)', note: "1° Novembre 1956 (States Reorganisation Act & VII Emendamento Costituzionale): Delhi cessa di essere Stato di Categoria C e diviene Territorio dell'Unione e capitale federale della Repubblica dell'India (Presidente Rajendra Prasad, Primo Ministro Jawaharlal Nehru)." },
      IN_HP: { kind: 'Territorio dell’Unione', title: 'Himachal Pradesh (Territorio dell\'Unione · 1° Nov 1956)', note: "1° Novembre 1956 (States Reorganisation Act): Himachal Pradesh (che ha già assorbito Bilaspur nel 1954) è convertito da Stato di Categoria C in uno dei 6 Territori dell'Unione della Repubblica dell'India." },
      IN_MAN: { kind: 'Territorio dell’Unione', title: 'Manipur (Territorio dell\'Unione · 1° Nov 1956)', note: "1° Novembre 1956 (States Reorganisation Act): il Manipur diviene uno dei 6 Territori dell'Unione (Union Territories) sotto amministrazione centrale (Stato federato solo nel 1972)." },
      IN_TRI: { kind: 'Territorio dell’Unione', title: 'Tripura (Territorio dell\'Unione · 1° Nov 1956)', note: "1° Novembre 1956 (States Reorganisation Act): il Tripura diviene uno dei 6 Territori dell'Unione (Union Territories) sotto amministrazione centrale (Stato federato solo nel 1972)." },
      IN_ANI: { kind: 'Territorio dell’Unione', title: 'Isole Andamane e Nicobare (Territorio dell\'Unione · 1° Nov 1956)', note: "1° Novembre 1956 (VII Emendamento Costituzionale): abolita la Categoria D, le Isole Andamane e Nicobare (Port Blair) divengono uno dei 6 nuovi Territori dell'Unione della Repubblica dell'India." },
      IN_SIK: { kind: 'Protettorato', title: 'Regno del Sikkim (Protettorato Speciale dell\'India)', note: "31 Dicembre 1956: monarchia himalayana dei Chogyal (Tashi Namgyal) legata all'India dal Trattato del 1950 come protettorato speciale (non compresa nei 14 Stati fino all'annessione del 1975)." },
    };

    const sraEntry = sraMap[fid] || {
      kind: 'Stato' as const,
      title: (meta && meta.nutsName) || (meta && meta.name) || rawName || fid,
      note: "31 Dicembre 1956 (States Reorganisation Act, 1° Novembre 1956): entità territoriale della Repubblica dell'India nel nuovo assetto federale a 14 Stati linguistici e 6 Territori dell'Unione.",
    };
    const isUT = sraEntry.kind === 'Territorio dell’Unione';
    return makeResult(
      'IND',
      `Repubblica dell'India — ${sraEntry.kind} di ${sraEntry.title}`,
      sraEntry.note,
      'Neutrale',
      isUT
        ? `Republic of India · Union Territory (1 Nov 1956 · Pres. Rajendra Prasad · PM Jawaharlal Nehru)`
        : sraEntry.kind === 'Protettorato'
        ? `Kingdom of Sikkim (Special Protectorate of the Republic of India — Treaty of 1950)`
        : `Republic of India · ${sraEntry.title} (States Reorganisation Act 1 Nov 1956 · 14 States & 6 UTs)`
    );
  }

  // 7. Repubblica dell'India (dal 26 Gennaio 1950 — Stati di Categoria A, B, C e D + Chandernagore 2 Maggio 1950)
  if (isJune1950) {
    const partLabelMap: Record<string, { cat: 'A' | 'B' | 'C' | 'D'; title: string; note: string }> = {
      IN_ASS: { cat: 'A', title: 'Assam', note: "Stato di Categoria A della Repubblica dell'India (ex provincia britannica nord-orientale, confinante con NEFA/Assam Tribal Areas, Manipur e Tripura)." },
      IN_ARU: { cat: 'A', title: 'Assam / NEFA (North-East Frontier)', note: "Fascia himalayana nord-orientale (North-East Frontier Tracts) amministrata costituzionalmente nell'ambito dello Stato di Categoria A dell'Assam della Repubblica dell'India." },
      IN_MEG: { cat: 'A', title: 'Assam (Colline Khasi, Jaintia e Garo)', note: "Distretti montani autonomi integrati nello Stato di Categoria A dell'Assam (Sesto Allegato della Costituzione della Repubblica dell'India del 26 gennaio 1950)." },
      IN_MIZ: { cat: 'A', title: 'Assam (Lushai Hills)', note: "Distretto autonomo delle Lushai Hills nello Stato di Categoria A dell'Assam della Repubblica dell'India." },
      IN_NAG: { cat: 'A', title: 'Assam (Naga Hills)', note: "Distretto autonomo delle Naga Hills nello Stato di Categoria A dell'Assam della Repubblica dell'India." },
      IN_BIH: { cat: 'A', title: 'Bihar', note: "Stato di Categoria A della Repubblica dell'India (ex provincia britannica del Bihar con fusione degli stati di Seraikela e Kharsawan)." },
      IN_JHA: { cat: 'A', title: 'Bihar (Chota Nagpur / Acciaierie Tata)', note: "Altopiano industriale di Chota Nagpur (Jamshedpur/Ranchi) nello Stato di Categoria A del Bihar della Repubblica dell'India." },
      IN_BOM: { cat: 'A', title: 'Bombay', note: "Stato di Categoria A della Repubblica dell'India (ex Presidenza di Bombay ampliata con Baroda e gli stati del Deccan)." },
      IN_GUJ: { cat: 'B', title: 'Saurashtra (Cat. B), Kutch (Cat. C) & Gujarat Settentrionale (Bombay Cat. A)', note: "Nella Costituzione repubblicana del 26 gennaio 1950 la penisola comprende lo Stato di Categoria B di Saurashtra, lo Stato di Categoria C di Kutch e i distretti del Gujarat nello Stato di Categoria A di Bombay." },
      IN_MP: { cat: 'A', title: 'Madhya Pradesh (ex Central Provinces & Berar) · Madhya Bharat (Cat. B) · Bhopal & Vindhya Pradesh (Cat. C)', note: "La fascia centrale della Repubblica dell'India comprende lo Stato di Categoria A del Madhya Pradesh (ex Central Provinces and Berar), lo Stato di Categoria B di Madhya Bharat e gli Stati di Categoria C di Bhopal e Vindhya Pradesh." },
      IN_CHH: { cat: 'A', title: 'Madhya Pradesh Orientale (Chhattisgarh e Bastar)', note: "Ex principati orientali integrati nello Stato di Categoria A del Madhya Pradesh della Repubblica dell'India (26 gennaio 1950)." },
      IN_MAD: { cat: 'A', title: 'Madras', note: "Stato di Categoria A della Repubblica dell'India (ex Presidenza di Madras sulla costa sud-orientale, escluso l'enclave francese di Pondichéry/Karikal)." },
      IN_AND: { cat: 'A', title: 'Madras Settentrionale (Circar / Andhra)', note: "Distretti costieri settentrionali integrati nello Stato di Categoria A di Madras nella Repubblica dell'India (esclusa l'enclave francese di Yanam)." },
      IN_ORI: { cat: 'A', title: 'Orissa', note: "Stato di Categoria A della Repubblica dell'India ampliato con l'unione degli stati principeschi orientali (Mayurbhanj e Feudatory States)." },
      IN_PUN: { cat: 'A', title: 'Punjab (ex East Punjab) & PEPSU (Cat. B)', note: "Stato di Categoria A del Punjab (ex East Punjab) accanto all'unione principesca PEPSU (Patiala and East Punjab States Union, Stato di Categoria B) nella Repubblica dell'India." },
      IN_HAR: { cat: 'A', title: 'Punjab Meridionale (Ambala / Haryana) & PEPSU (Cat. B)', note: "Divisioni meridionali dello Stato di Categoria A del Punjab e distretti confinanti di PEPSU (Categoria B) nella Repubblica dell'India." },
      IN_CHA: { cat: 'B', title: 'PEPSU (Patiala and East Punjab States Union) & Ambala (Punjab Cat. A)', note: "Sede dell'unione principesca del PEPSU (Stato di Categoria B, Patiala) e del settore di Ambala dello Stato di Categoria A del Punjab nella Repubblica dell'India." },
      IN_UP: { cat: 'A', title: 'Uttar Pradesh (ex United Provinces)', note: "Con la Costituzione del 26 gennaio 1950 le ex United Provinces assumono ufficialmente il nome di Uttar Pradesh come Stato di Categoria A della Repubblica dell'India (incluse Tehri Garhwal, Rampur e Benares)." },
      IN_UTT: { cat: 'A', title: 'Uttar Pradesh Settentrionale (Garhwal & Kumaon)', note: "Settore himalayano di Kumaon e dell'ex principato di Tehri Garhwal integrato nello Stato di Categoria A dell'Uttar Pradesh." },
      IN_BEN: { cat: 'A', title: 'West Bengal (Cooch Behar 1° Gen & Chandernagore 2 Mag 1950)', note: "Stato di Categoria A della Repubblica dell'India: il 1° gennaio 1950 vi viene fuso l'ex principato di Cooch Behar e il 2 maggio 1950 la Francia trasferisce de facto all'India l'enclave bengalese di Chandernagore (restano francesi Pondichéry, Karikal, Mahé e Yanam)." },
      IN_MYS: { cat: 'B', title: 'Mysore & Coorg (Cat. C)', note: "Stato di Categoria B di Mysore (con il Maharaja Jayachamarajendra Wadiyar quale Rajpramukh) accanto al vicino Stato di Categoria C di Coorg nella Repubblica dell'India." },
      IN_RAJ: { cat: 'B', title: 'Rajasthan (Cat. B) & Ajmer (Cat. C)', note: "Stato di Categoria B del Rajasthan (capitale Jaipur) con l'enclave centrale di Ajmer (Stato di Categoria C) nella Repubblica dell'India." },
      IN_KER: { cat: 'B', title: 'Travancore–Cochin (Cat. B) · Malabar (Madras Cat. A)', note: "Stato di Categoria B di Travancore–Cochin nella Repubblica dell'India (costituito dal 1° luglio 1949; lungo la costa del Malabar resta francese la sola enclave di Mahé)." },
      IN_LAK: { cat: 'A', title: 'Isole Laccadive e Minicoy (Madras Cat. A)', note: "Arcipelago amministrato nell'ambito dello Stato di Categoria A di Madras della Repubblica dell'India." },
      IN_DEL: { cat: 'C', title: 'Delhi (Capitale della Repubblica dell\'India — 26 Gennaio 1950)', note: "Il 26 gennaio 1950 entra in vigore la Costituzione che proclama la sovrana Repubblica dell'India (fine della sovranità formale di Re Giorgio VI, pur restando nel Commonwealth): Rajendra Prasad giura come primo Presidente della Repubblica a Nuova Delhi accanto al Premier Jawaharlal Nehru (Stato di Categoria C)." },
      IN_HP: { cat: 'C', title: 'Himachal Pradesh (Cat. C) & Bilaspur (Cat. C)', note: "Stato di Categoria C dell'Himachal Pradesh (con accanto lo Stato di Categoria C di Bilaspur) nella Repubblica dell'India." },
      IN_MAN: { cat: 'C', title: 'Manipur', note: "Stato di Categoria C della Repubblica dell'India (entrato il 15 ottobre 1949 e retto da un Commissario Capo)." },
      IN_TRI: { cat: 'C', title: 'Tripura', note: "Stato di Categoria C della Repubblica dell'India (entrato il 15 ottobre 1949 e retto da un Commissario Capo)." },
      IN_ANI: { cat: 'D', title: 'Isole Andamane e Nicobare (Territorio di Categoria D)', note: "Unico Territorio di Categoria D (Part D Territory) previsto dalla Costituzione del 26 gennaio 1950, retto direttamente dal Presidente della Repubblica dell'India tramite un Commissario Capo a Port Blair." },
      IN_SIK: { cat: 'C', title: 'Regno del Sikkim (Protettorato Speciale della Repubblica dell\'India)', note: "Monarchia himalayana dei Chogyal in regime di protettorato speciale con la Repubblica dell'India (Trattato Indo-Sikkimese)." },
    };

    const entry = partLabelMap[fid] || {
      cat: 'A',
      title: (meta && meta.nutsName) || (meta && meta.name) || rawName || fid,
      note: "Stato integrante della sovrana Repubblica dell'India istituita dalla Costituzione del 26 gennaio 1950 (Presidente Rajendra Prasad, PM Jawaharlal Nehru).",
    };
    return makeResult(
      'IND',
      `Repubblica dell'India — Stato di Categoria ${entry.cat}: ${entry.title}`,
      entry.note,
      'Alleati',
      `Republic of India · Bhārat Gaṇarājya (Cat. ${entry.cat} · Pres. Rajendra Prasad · PM J. Nehru)`
    );
  }

  // 7. Dominion of India (IND)
  // Specific crisis & Princely Unions (1947–1949): Greater Rajasthan (IN_RAJ), Baroda-Bombay (IN_BOM), Travancore-Cochin (IN_KER), Junagadh/Saurashtra (IN_GUJ), Himachal Pradesh (IN_HP), Madhya Bharat & Vindhya Pradesh (IN_MP)
  if (isJune1949 && fid === 'IN_RAJ') {
    return makeResult(
      'IND',
      'Dominion dell\'India — Stato Unito del Grande Rajasthan (30 Marzo 1949)',
      "Il 30 marzo 1949 Sardar Vallabhbhai Patel inaugura a Jaipur il Grande Rajasthan (Greater Rajasthan), unificando i grandi stati principeschi di Jaipur, Jodhpur, Bikaner e Jaisalmer con il precedente Rajasthan e il Matsya Union.",
      'Alleati',
      'Dominion of India · United State of Greater Rajasthan (30 Mar 1949 · Jaipur)'
    );
  }
  if (isJune1949 && fid === 'IN_BOM') {
    return makeResult(
      'IND',
      'Dominion dell\'India — Stato di Bombay (Fusione di Baroda, 1° Maggio 1949)',
      "Il 1° maggio 1949 lo storico principato di Baroda (Gaekwad) e gli stati del Deccan completano la fusione amministrativa nella Provincia di Bombay all'interno dell'Unione Indiana.",
      'Alleati',
      'Dominion of India · Bombay Province (Integrazione di Baroda, 1 May 1949)'
    );
  }
  if (isJune1949 && fid === 'IN_KER') {
    return makeResult(
      'IND',
      isDec1949
        ? 'Dominion dell\'India — Stati Uniti di Travancore e Cochin (In Vigore dal 1° Luglio 1949)'
        : 'Dominion dell\'India — Stati Uniti di Travancore e Cochin (Patto di Fusione, Vigilia 1° Luglio 1949)',
      isDec1949
        ? "Dal 1° luglio 1949 entra ufficialmente in vigore l'unione degli Stati Principeschi di Travancore e Cochin nello Stato di Travancore–Cochin (Rajpramukh Bala Rama Varma II) all'interno del Dominion dell'India (ancora retto dal Governatore Generale C. Rajagopalachari fino alla proclamazione della Repubblica il 26 gennaio 1950)."
        : "Nel maggio 1949 i Maharaja di Travancore e Cochin sottoscrivono il Covenant d'integrazione che sancisce la nascita dello Stato Unito di Travancore–Cochin con effetto formale dal 1° luglio 1949 nel quadro del consolidamento federale di Vallabhbhai Patel.",
      'Alleati',
      isDec1949
        ? 'Dominion of India · United State of Travancore–Cochin (1 Lug 1949)'
        : 'Dominion of India · Covenant di Travancore–Cochin (Maggio 1949 · Effettivo 1 Lug 1949)'
    );
  }
  if (isDec1949 && fid === 'IN_TRI') {
    return makeResult(
      'IND',
      'Dominion dell\'India — Tripura (Integrazione nell\'Unione Indiana, 15 Ottobre 1949)',
      "Il 15 ottobre 1949 entra in vigore il Tripura Merger Agreement (firmato dalla Reggente Maharani Kanchan Prabha Devi il 9 settembre 1949): lo Stato principesco del Tripura viene formalmente integrato nel Dominion dell'India come provincia amministrata da un Commissario Capo (Part C State nella Costituzione approvata il 26 novembre 1949, effettiva dal 26 gennaio 1950).",
      'Alleati',
      'Dominion of India · Chief Commissioner\'s Province of Tripura (15 Ott 1949)'
    );
  }
  if (isDec1949 && fid === 'IN_MAN') {
    return makeResult(
      'IND',
      'Dominion dell\'India — Manipur (Integrazione nell\'Unione Indiana, 15 Ottobre 1949)',
      "Il 15 ottobre 1949, in attuazione del Manipur Merger Agreement sottoscritto il 21 settembre 1949 dal Maharaja Bodhchandra Singh a Shillong, lo Stato del Manipur passa sotto piena amministrazione del Dominion dell'India come provincia a Commissario Capo (mantenendo lo status di Dominion fino al 26 gennaio 1950).",
      'Alleati',
      'Dominion of India · Chief Commissioner\'s Province of Manipur (15 Ott 1949)'
    );
  }
  if (isDec1949 && fid === 'IN_UP') {
    return makeResult(
      'IND',
      'Dominion dell\'India — Province Unite (Integrazione di Tehri Garhwal, Ago 1949 · Rampur & Benares)',
      "Nell'agosto 1949 lo stato himalayano di Tehri Garhwal (seguito in ottobre da Benares e dal completamento di Rampur) viene fuso nelle Province Unite (United Provinces, futura Uttar Pradesh) all'interno del Dominion dell'India, mentre il 26 novembre 1949 l'Assemblea Costituente di Nuova Delhi adotta la nuova Costituzione repubblicana (che entrerà in vigore solo il 26 gennaio 1950).",
      'Alleati',
      'Dominion of India · United Provinces (Integrazione Tehri Garhwal, Ago 1949)'
    );
  }
  if (fid === 'IN_GUJ') {
    return makeResult(
      'IND',
      isJune1948
        ? 'Dominion dell\'India — Gujarat e Saurashtra (Stato Unito di Kathiawar, 15 Feb 1948 & Plebiscito di Junagadh)'
        : isDec1947
        ? 'Dominion dell\'India — Gujarat e Kathiawar (Annessione di Junagadh, 9 Novembre 1947)'
        : 'Dominion dell\'India — Gujarat e Agenzia degli Stati di Kathiawar (Crisi di Junagadh)',
      isJune1948
        ? "Il 15 febbraio 1948 Sardar Vallabhbhai Patel inaugura lo Stato Unito di Kathiawar (rinominato Saurashtra), fondendo oltre 200 principati della penisola sotto il Rajpramukh Jam Sahib Digvijaysinhji; il 20 febbraio 1948 il plebiscito popolare nell'ex principato di Junagadh sancisce con il 99,95% dei voti l'unione definitiva all'India."
        : isDec1947
        ? "Il 9 novembre 1947, a seguito del collasso dell'amministrazione del Nawab Mahabat Khan III (fuggito a Karachi) e su invito del Dewan Sir Shah Nawaz Bhutto, l'esercito indiano e Sardar Vallabhbhai Patel assumono il pieno controllo dello stato principesco di Junagadh (nonché dei feudi di Mangrol e Babariawad), integrandolo nell'Unione dell'India in vista del plebiscito di ratifica del febbraio 1948."
        : "La vasta regione del Gujarat fa parte dell'Unione Indiana. Al 30 settembre 1947 si consuma la crisi dello stato principesco costiero di Junagadh: il Nawab Mahabat Khan III ha firmato l'adesione al Pakistan a met\u00e0 agosto (accettata da Karachi il 13 settembre); l'India reagisce con il blocco economico e militare circostante, mentre a fine settembre il movimento di liberazione popolare istituisce a Bombay il governo provvisorio dell'Aarzi Hukumat prima dell'annessione indiana a novembre.",
      'Alleati',
      isJune1948
        ? 'Dominion of India · United State of Kathiawar / Saurashtra (15 Feb 1948) & Junagadh Plebiscite'
        : isDec1947
        ? 'Dominion of India · Kathiawar States & Junagadh Integration (9 Nov 1947)'
        : 'Dominion of India · Kathiawar States Agency & Aarzi Hukumat Blockade'
    );
  }
  if (fid === 'IN_HP' && isJune1948) {
    return makeResult(
      'IND',
      'Dominion dell\'India — Provincia di Himachal Pradesh (Costituita il 15 Aprile 1948)',
      "Il 15 aprile 1948, mediante l'integrazione di 28 stati principeschi delle colline del Punjab (Simla Hill States tra cui Chamba, Mandi, Sirmur e Suket), viene istituita la Chief Commissioner's Province di Himachal Pradesh all'interno del Dominion dell'India.",
      'Alleati',
      'Dominion of India · Chief Commissioner\'s Province of Himachal Pradesh (15 Apr 1948)'
    );
  }
  if (fid === 'IN_MP' && isJune1948) {
    return makeResult(
      'IND',
      'Dominion dell\'India — Province Centrali, Vindhya Pradesh (Aprile 1948) e Madhya Bharat (28 Maggio 1948)',
      "Nella primavera del 1948 l'opera di integrazione di Sardar Vallabhbhai Patel e V.P. Menon ridisegna l'India centrale: in aprile 35 principati del Bundelkhand e Baghelkhand formano l'unione del Vindhya Pradesh (cap. Rewa), e il 28 maggio 1948 Jawaharlal Nehru inaugura l'unione di Madhya Bharat (Gwalior, Indore e 23 stati di Malwa) accanto alle Province Centrali e Berar.",
      'Alleati',
      'Dominion of India · Central Provinces, Madhya Bharat (28 May 1948) & Vindhya Pradesh (Apr 1948)'
    );
  }
  if (fid === 'IN_PUN') {
    return makeResult(
      'IND',
      'Dominion dell\'India — Provincia del Punjab Orientale (Amritsar & Simla)',
      "Assegnato all'India dalla Radcliffe Line del 17 agosto 1947, con capitale provvisoria a Simla e la citt\u00e0 santa sikh di Amritsar. La provincia \u00e8 sconvolta da scontri interreligiosi devastanti e dall'arrivo simultaneo di oltre 4 milioni di profughi sikh e ind\u00f9 in fuga dal Punjab Occidentale.",
      'Alleati',
      'Dominion of India · East Punjab (Gov. Chandulal Trivedi · Cap. Simla)'
    );
  }
  if (fid === 'IN_BEN') {
    return makeResult(
      'IND',
      'Dominion dell\'India — Provincia del Bengala Occidentale (Calcutta)',
      "Ripartito dalla Radcliffe Line dell'agosto 1947, Calcutta e i distretti occidentali rimangono all'India sotto la guida del Governatore C. Rajagopalachari. Mahatma Gandhi digiuna a Calcutta all'inizio di settembre 1947 (Miracolo di Calcutta) riuscendo a placare i massacri comunitari tra ind\u00f9 e musulmani.",
      'Alleati',
      'Dominion of India · West Bengal (Gov. C. Rajagopalachari · Premier P.C. Ghosh)'
    );
  }
  if (fid === 'IN_ASS') {
    return makeResult(
      'IND',
      'Dominion dell\'India — Provincia dell\'Assam (Shillong)',
      "Provincia nord-orientale dell'Unione Indiana; a seguito del referendum del luglio 1947 ha ceduto il distretto di Sylhet al Pakistan Orientale, mantenendo il controllo delle grandi piantagioni di t\u00e8 e del corridoio strategico verso il Bengala.",
      'Alleati',
      'Dominion of India · Province of Assam (Gov. Sir Muhammad Saleh Akbar Hydari · Premier Gopinath Bordoloi)'
    );
  }
  if (fid === 'IN_DEL') {
    return makeResult(
      'IND',
      isDec1949
        ? 'Dominion dell\'India — Nuova Delhi (Costituzione Approvata il 26 Nov 1949 · Vigilia della Repubblica 1950)'
        : 'Dominion dell\'India — Capitale Federale di Nuova Delhi',
      isDec1949
        ? "Al 31 dicembre 1949 Nuova Delhi è ancora la capitale del Dominion dell'India (Governatore Generale C. Rajagopalachari, Primo Ministro Jawaharlal Nehru): il 26 novembre 1949 l'Assemblea Costituente adotta ufficialmente la Costituzione dell'India, ma il passaggio formale a Repubblica sovrana avverrà solo il 26 gennaio 1950."
        : "Capitale del neonato Dominion dell'India; il 15 agosto 1947, al tocco della mezzanotte, Jawaharlal Nehru pronuncia lo storico discorso \"Tryst with Destiny\" (\"Un appuntamento con il destino\") salutando la libert\u00e0 dell'India. Lord Mountbatten assume la carica di Governatore Generale e Nehru quella di Primo Ministro.",
      'Alleati',
      isDec1949
        ? 'Dominion of India · Gov.-Gen. C. Rajagopalachari · PM J. Nehru (Pre-Repubblica 26 Gen 1950)'
        : 'Dominion of India · Federal Capital & Union Government (PM Jawaharlal Nehru)'
    );
  }

  // All other Indian Union provinces
  const provName = (meta && meta.nutsName) || (meta && meta.name) || rawName || fid;
  return makeResult(
    'IND',
    `Dominion dell'India — ${provName}`,
    "Al 30 settembre 1947 la provincia fa parte integrante del neonato Dominion dell'India, sorto il 15 agosto 1947 a seguito dell'Indian Independence Act britannico, guidato dal Primo Ministro Jawaharlal Nehru e dal Vice Primo Ministro Sardar Vallabhbhai Patel (l'Uomo di Ferro), impegnato nell'integrazione diplomatica degli oltre 500 stati principeschi nell'Unione Indiana.",
    'Alleati',
    'Dominion of India · Union Government (Prime Minister Jawaharlal Nehru)'
  );
}

export function resolveBritishRajProvince(ft: any, s: number): ResolvedTerritory {
  const p = (ft && ft.properties) ? ft.properties : {};
  let fid = String(ft.id || p.id || p.NUTS_ID || '').trim();

  // Alias IN_TR to IN_TRI and Burma alternative ISO codes if needed
  if (fid === 'IN_TR') fid = 'IN_TRI';
  if (fid === 'MM_YGN') fid = 'MM_RAN';
  if (fid === 'MM_SHN') fid = 'MM_SHA';

  // Match canonico tramite BRITISH_RAJ_PROVINCES_META
  let meta = BRITISH_RAJ_PROVINCES_META[fid];

  // Fallback con ricerca su proprietà
  if (!meta) {
    for (const key of Object.keys(BRITISH_RAJ_PROVINCES_META)) {
      const m = BRITISH_RAJ_PROVINCES_META[key];
      if (!m) continue;
      if (
        (p.id && (p.id === m.id || p.id === m.origId)) ||
        (p.NUTS_ID && p.NUTS_ID === m.id) ||
        (p.ORIG_ID && p.ORIG_ID === m.origId) ||
        (p.name && (p.name === m.name || p.name === m.nutsName)) ||
        (p.NUTS_NAME && p.NUTS_NAME === m.nutsName) ||
        (p.NAME_LATN && p.NAME_LATN === m.nameLatn)
      ) {
        meta = m;
        break;
      }
    }
  }

  // STEP 19+ (Settembre 1947 - Dicembre 1947): La Partizione dell'Impero Anglo-Indiano, Nascita di India e Pakistan, e Stati Principeschi Contesi
  if (s >= 19) {
    return resolveBritishRajPartition(fid, meta, p, s);
  }

  if (meta) {
    const sov = meta.getSovereign ? meta.getSovereign(s) : meta.sovereign;
    const fac = meta.getFaction ? meta.getFaction(s) : meta.faction;
    const histName = meta.getHistoricalName ? meta.getHistoricalName(s) : meta.historicalName;
    const admin = meta.getAdminTitle ? meta.getAdminTitle(s) : meta.adminTitle;
    const note = meta.getNote(s);

    return makeResult(sov, histName, note, fac, admin);
  }

  // Fallback specifico per feature generica Burma (MM)
  const cntr = String(p.CNTR_CODE || p.CNTR_ID || '').toUpperCase();
  const rawName = String(p.NAME || p.name || '');
  if (cntr === 'MM' || rawName.toLowerCase().includes('burma') || rawName.toLowerCase().includes('birmania')) {
    if (s >= 21) {
      return makeResult(
        'BUR',
        'Unione della Birmania (Repubblica Sovrana Indipendente — 4 Gennaio 1948)',
        "Il 4 gennaio 1948 nasce l'Unione della Birmania (Pyidaungzu Myanma Naingngandaw), repubblica sovrana indipendente fuori dal Commonwealth sotto il Presidente Sao Shwe Thaik e il Primo Ministro U Nu.",
        'Neutrale',
        'Union of Burma (Pres. Sao Shwe Thaik · PM U Nu)'
      );
    }
    if (s >= 17) {
      return makeResult(
        'UK',
        'Burma / Birmania (Operazione Dracula — 14ª Armata Britannica alle Porte di Rangoon, Aprile 1945)',
        "A fine aprile 1945 la 14ª Armata britannica del generale William Slim incalza le truppe giapponesi in rotta lungo la valle dell'Irrawaddy ed è alle porte di Rangoon; il 1° maggio scatta l'assalto anfibio e aviotrasportato (Operazione Dracula) e la capitale birmana è liberata il 2-3 maggio 1945.",
        'Alleati',
        'British Crown Colony of Burma — 14th Army (Lt. Gen. William Slim)'
      );
    }
    if (s >= 10) {
      return makeResult(
        'JAP',
        'Birmania Occupata (Amministrazione Militare Giapponese — 15ª Armata / Birma Gun政監部)',
        "Conquistata dall'Esercito Imperiale Giapponese (15ª Armata del tenente generale Shōjirō Iida) tra marzo e maggio 1942 con la caduta di Rangoon (8 marzo), Lashio (29 aprile) e Mandalay (1º maggio), tagliando definitivamente la Strada della Birmania (Burma Road) verso la Cina nazionalista e costringendo le forze britanniche del gen. Alexander e cinesi del gen. Stilwell a ripiegare in Assam attraverso la giungla monsonica.",
        'Asse',
        'Occupazione Militare Giapponese (15ª Armata Imperiale)'
      );
    } else if (s <= 1) {
      return makeResult(
        'UK',
        'Burma (Province of the Indian Empire — Rangoon)',
        "Provincia dell'Impero Anglo-Indiano fino al 1° aprile 1937, data in cui il Government of Burma Act 1935 la separò da Nuova Delhi erigendola a colonia della Corona autonoma.",
        'Neutrale',
        'Province of the Indian Empire'
      );
    } else {
      return makeResult(
        'UK',
        'British Burma (Crown Colony of Burma — Rangoon)',
        "Colonia della Corona autonoma dal 1° aprile 1937. Capolinea meridionale della celebre Burma Road (Strada della Birmania) aperta nel 1938 per rifornire la Repubblica di Cina nazionalista contro l'invasione nipponica; ricca di giacimenti di petrolio (BOC a Yenangyaung), piombo, tungsteno e riso.",
        s >= 5 ? 'Alleati' : 'Neutrale',
        'British Crown Colony'
      );
    }
  }

  // Fallback generico per territori non mappati del British Raj
  const facGen: FactionType = s >= 5 ? 'Alleati' : 'Neutrale';
  return makeResult(
    'RAJ',
    p.HISTORICAL_NAME || p.NAME || rawName || 'British Raj (Empire of India)',
    p.HISTORICAL_NOTE || "Impero Anglo-Indiano sotto l'autorità del Governatore Generale e Viceré d'India a Nuova Delhi.",
    facGen,
    p.ADMIN || 'British Raj · Government of India'
  );
}
