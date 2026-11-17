/**
 * Divisioni Administrative Level 1 (ADM1) dell'Etiopia — Evoluzione Storica & Geopolitica Integrale (Steps 0–22: 1936–1948)
 *
 * Basato sul dataset geometrico et.json (12 entità ADM1: ETAA, ETAF, ETAM, ETBE, ETDD, ETGA,
 * ETHA, ETOR, ETSI, ETSN, ETSO, ETTI) allineato in topologia watertight sul perimetro 1938.
 *
 * Fasi storiche coperte con precisione anti-anacronismo:
 * - Step 0 (GEN 1936): Impero d'Etiopia (ETH · Neutrale) con fronti attivi della Guerra d'Etiopia (Tigrè, Ogaden, Ganale Doria)
 * - Steps 1–2 (MAR–OTT 1938): Africa Orientale Italiana (ITA · Asse) — Governatorati AOI (Addis Abeba prima del cambio in Scioa Nov 1938)
 * - Steps 3–5 (MAR–SET 1939): AOI — Scioa (RDL 11 Nov 1938), Amara, Harar, Galla e Sidama, Eritrea (Tigrè), Somalia (Ogaden)
 * - Steps 6–7 (GIU–OTT 1940): Entrata in guerra 10 Giu 1940, isolamento strategico AOI, conquista Somaliland & Mission 101 nel Gojjam
 * - Step 8 (APR 1941): Frattura militare storica al 30 aprile 1941 — Est/Centro liberati (ETH · Alleati: Addis Abeba 6 Apr, Harar, Dire Dawa,
 *                      Ogaden, Asosa, Gambela, Tigrè con assedio sull'Amba Alagi) vs 3 ridotti AOI ancora italiani (ITA · Asse:
 *                      Amhara/Gondar del Gen. Nasi fino al 27 Nov 1941, Galla e Sidama/Gimma del Gen. Gazzera fino al 21 Giu 1941, Sidamo fino a Mag 1941)
 * - Step 9 (DIC 1941): Resa di Gondar (27 Nov 1941) -> 100% territorio etiopico restaurato (ETH · Alleati)
 * - Steps 10–14 (AGO 1942 – GIU 1944): Primo Accordo Anglo-Etiopico (31 Gen 1942), riforma Teklay Gizat, Rivolta Woyane in Tigrè (1943), BMA in Ogaden/Ferrovia
 * - Steps 15–18 (DIC 1944 – SET 1945): Secondo Accordo Anglo-Etiopico (19 Dic 1944, ripristino ferrovia Dire Dawa–Addis), Carta ONU 1945
 * - Steps 19–21 (SET 1947 – GIU 1948): Trattato di Pace di Parigi (15 Set 1947), rivendicazioni eritree all'ONU, Ogaden ancora sotto BMA
 * - Step 22 (DIC 1948): Restituzione amministrativa dell'Ogaden britannico all'Etiopia (Sett 1948) e dibattito ONU sulle ex colonie italiane
 */

import { ResolvedTerritory } from '../types';
import { makeResult } from './georesolver';

export interface EthiopiaProvinceInfo {
  id: string;
  sourceName: string;
  labelIt: string;
  modernName: string;
  step0Note: string;
  step1_2Gov: string;
  step3_5Gov: string;
  step6_7War: string;
  step8Status: {
    owner: 'ETH' | 'ITA';
    fac: 'Alleati' | 'Asse';
    title: string;
    note: string;
  };
  step9_13Note: string;
  step14_18Note: string;
  step19_21Note: string;
  step22Note: string;
}

export const ETHIOPIA_PROVINCES_META: Record<string, EthiopiaProvinceInfo> = {
  ETAA: {
    id: 'ETAA',
    sourceName: 'Addis Ababa',
    labelIt: 'Addis Abeba',
    modernName: 'City Administration of Addis Ababa',
    step0Note:
      "Addis Abeba · Capitale dell'Impero d'Etiopia (Ye’Ityōṗṗyā Nigūsa Negest Mengist): l'Imperatore Hailé Selassié I dirige la mobilitazione della Guardia Imperiale (Kebur Zabagna) e delle armate imperiali lungo l'asse di Dessiè contro l'avanzata italiana.",
    step1_2Gov:
      "Governatorato di Addis Abeba (AOI · Viceré Amedeo di Savoia Duca d'Aosta) · Dopo la feroce repressione grazianea seguita all'attentato del febbraio 1937 (Yekatit 12), dal dicembre 1937 il Duca d'Aosta insediato a Palazzo Guenete Leul avvia l'urbanistica imperiale e attenua la pressione militare.",
    step3_5Gov:
      "Governatorato dello Scioa (Addis Abeba · R.D.L. 11 novembre 1938, n. 1857) · Capitale vicereale dell'AOI ampliata nello Scioa centrale; nodo della nuova Autocamionale Asmara–Addis Abeba ('Strada della Vittoria') e capolinea della ferrovia per Gibuti.",
    step6_7War:
      "Addis Abeba (Quartier Generale Superiore dell'AOI) · Dall'entrata in guerra dell'Italia (10 giugno 1940), il blocco britannico di Suez e del Mar Rosso isola la capitale vicereale da Roma; il Duca d'Aosta raziona carburante e munizioni predisponendo la difesa perimetrale dell'Impero.",
    step8Status: {
      owner: 'ETH',
      fac: 'Alleati',
      title: "Impero d'Etiopia Restaurato — Addis Abeba (Liberazione 6 Aprile 1941)",
      note: "6 aprile 1941: l'11ª Divisione Africana britannica (Gen. Alan Cunningham) entra ad Addis Abeba abbandonata da Amedeo d'Aosta senza combattimenti per risparmiare la città; preparativi immediati per l'ingresso solenne del Negus Hailé Selassié I (5 maggio 1941).",
    },
    step9_13Note:
      "Addis Abeba · Sotto i termini del Primo Accordo Anglo-Etiopico (31 gennaio 1942), il governo imperiale di Hailé Selassié I riafferma l'amministrazione civile, avvia la riorganizzazione centralizzata dei ministeri e firma la Dichiarazione delle Nazioni Unite (ottobre 1942).",
    step14_18Note:
      "Addis Abeba · Con il Secondo Accordo Anglo-Etiopico (19 dicembre 1944) cessa la giurisdizione militare britannica sulla fascia ferroviaria della capitale; nel 1945 l'Etiopia partecipa come membro fondatore alla Conferenza di San Francisco (Carta ONU).",
    step19_21Note:
      "Addis Abeba · Capitale sovrana pienamente riconosciuta dal Trattato di Pace di Parigi (15 settembre 1947, che impegna inoltre l'Italia alla restituzione del monumento del Leone di Giuda ai sensi dell'Art. 37); hub centrale della neonata Ethiopian Airlines.",
    step22Note:
      "Addis Abeba (31 dicembre 1948) · Il governo imperiale del Primo Ministro Makonnen Endelkachew gestisce la reintegrazione civile dell'Ogaden (settembre 1948) e coordina la strategia diplomatica alla Prima Commissione ONU per l'unione dell'Eritrea.",
  },
  ETAF: {
    id: 'ETAF',
    sourceName: 'Afar',
    labelIt: 'Afar (Dancalia / Aussa)',
    modernName: 'Afar Regional State',
    step0Note:
      "Dancalia e Sultanato dell'Aussa (Afar) · Vasta depressione arida tra il Mar Rosso eritreo e l'altopiano dello Scioa; il Sultano di Aussa Mahammad Yayyo mantiene una posizione guardinga lungo la frontiera eritrea mentre le colonne motorizzate italiane preparano l'asse di penetrazione Assab–Sardò.",
    step1_2Gov:
      "Governo dell'Eritrea (AOI · Settore Dancalia ed Aussa) · Integrata nell'Eritrea vicereale dal 1° giugno 1936, la regione vede l'apertura della strada militare e logistica dell'Aussa tra il porto di Assab, Sardò e Dessiè attraverso il deserto dancalo.",
    step3_5Gov:
      "Governo dell'Eritrea (AOI · Dancalia Meridionale e Sardò) · Completata nel 1939, la grande arteria asfaltata Assab–Sardò–Combolcia–Addis Abeba trasforma l'Afar nell'asse di rifornimento diretto fra il Mar Rosso e l'altopiano etiopico.",
    step6_7War:
      "Settore Dancalia–Aussa (AOI) · Isolata dalla chiusura del Mar Rosso dal giugno 1940, la Strada della Dancalia vede transitare convogli razionati tra Assab e l'altopiano; pattuglie camelate controllano la frontiera della Somalia Francese (Gibuti) schierata con Vichy.",
    step8Status: {
      owner: 'ETH',
      fac: 'Alleati',
      title: "Impero d'Etiopia Restaurato — Dancalia & Corridoio Auasc (Aprile 1941)",
      note: "Aprile 1941: con la caduta di Addis Abeba e di Dessiè (26 aprile, Battaglia di Combolcia), il corridoio stradale dell'Auasc–Sardò cade in mano alleata isolando il presidio italiano costiero di Assab fino allo sbarco britannico dell'Operazione Chronometer (giugno 1941).",
    },
    step9_13Note:
      "Dancalia e Aussa (Impero d'Etiopia) · Ripristinato il protettorato imperiale sul Sultanato di Aussa (1941–1943); il governo di Addis Abeba integra l'Afar meridionale nell'ordinamento provinciale dello Scioa orientale e dell'Uollo, pacificando le carovaniere del sale.",
    step14_18Note:
      "Afar / Dancalia · Il riassetto stradale verso Assab diviene vitale nel 1944–1945 per il disegno geopolitico di Addis Abeba volto a ottenere uno sbocco sovrano sul Mar Rosso al Consiglio dei Ministri degli Esteri di Londra (settembre 1945).",
    step19_21Note:
      "Afar (1947–giugno 1948) · La regione funge da corridoio di collegamento diretto tra l'Etiopia centrale e il porto di Assab (tuttora sotto Amministrazione Militare Britannica eritrea), al centro delle audizioni della Commissione delle Quattro Potenze.",
    step22Note:
      "Afar / Dancalia (31 dicembre 1948) · Fascia strategica prioritaria per la delegazione etiopica all'ONU mentre la questione dell'Eritrea e dello sbocco marittimo ad Assab viene deferita all'Assemblea Generale delle Nazioni Unite.",
  },
  ETAM: {
    id: 'ETAM',
    sourceName: 'Amara',
    labelIt: 'Amhara (Gondar, Goggiam & Uollo)',
    modernName: 'Amhara Regional State',
    step0Note:
      "Altopiani Amhara (Begemder, Goggiam e Uollo) · Retrovia principale dell'esercito imperiale nel gennaio 1936: le colonne di Ras Imru (dal Goggiam verso lo Scirè) e di Ras Mulugeta (da Dessiè verso il Tigrè) risalgono verso la linea settentrionale di Mai Ceu.",
    step1_2Gov:
      "Governatorato dell'Amara (AOI · Capoluogo Gondar) · Nonostante l'espansione amministrativa attorno al Lago Tana e a Dessiè, il Goggiam e il Begemder divampano per la tenace guerriglia degli Arbegnoch guidati da Belay Zeleke, Mangascià Giambierè e Hailu Kebede.",
    step3_5Gov:
      "Governatorato dell'Amara (AOI · Gondar, Lago Tana, Uollo) · Nel 1939 il Governatore Ottorino Mezzetti e poi Luigi Frusci rafforzano i presidi sul Lago Tana e lungo la strada imperiale Gondar–Debre Tabor–Dessiè per contenere le rivolte patriottiche del Goggiam.",
    step6_7War:
      "Governatorato dell'Amara (AOI · Fronte Sudanese e Mission 101) · Nel luglio 1940 reparti italiani muovono dal fronte Amara-Eritreo su Gallabat e Kassala nel Sudan; ma dall'agosto 1940 la 'Mission 101' britannica del Col. Daniel Sandford si infiltra nel Goggiam per armare gli Arbegnoch di Belay Zeleke.",
    step8Status: {
      owner: 'ITA',
      fac: 'Asse',
      title: "AOI — Ridotto Settentrionale di Gondar (Gen. Guglielmo Nasi)",
      note: "30 aprile 1941: mentre la Gideon Force di Wingate e Belay Zeleke hanno liberato Debre Markos nel Goggiam (4 aprile) e i sudafricani hanno preso Dessiè (26 aprile), il Gen. Guglielmo Nasi concentra oltre 30.000 uomini nel bastione fortificato di Gondar, Passo Uolchefit, Debre Tabor e Culquaber (ultima roccaforte italiana che resisterà fino al 27 novembre 1941).",
    },
    step9_13Note:
      "Altopiani Amhara (Impero d'Etiopia) · Dopo la caduta eroica di Gondar (27 novembre 1941), ultima bandiera dell'AOI, le province di Begemder, Goggiam e Uollo rientrano pienamente nello Stato etiopico; nel 1942–1943 emergono tensioni tra il centralismo imperiale e capi patrioti autonomi come Belay Zeleke nel Goggiam.",
    step14_18Note:
      "Amhara (Begemder, Goggiam, Uollo) · Consolidata l'amministrazione imperiale dei Teklay Gizat con governatori fedeli ad Hailé Selassié I (arresto ed esecuzione di Belay Zeleke nel 1944–gennaio 1945) e ripristino delle comunicazioni stradali tra Gondar, Lago Tana e Addis Abeba.",
    step19_21Note:
      "Amhara (1947–giugno 1948) · Dopo il Trattato di Pace di Parigi (settembre 1947), Gondar e il Lago Tana divengono scali civili strategici dell'Etiopia nord-occidentale (collegamenti Ethiopian Airlines) a ridosso della frontiera con il Sudan Anglo-Egiziano.",
    step22Note:
      "Amhara (31 dicembre 1948) · Le province di Begemder-Semien, Goggiam e Uollo fungono da retrovia agricola, amministrativa e commerciale verso la frontiera settentrionale dell'Eritrea e il bacino del Nilo Azzurro.",
  },
  ETBE: {
    id: 'ETBE',
    sourceName: 'Benishangul Gumz',
    labelIt: 'Benishangul-Gumuz (Beni Sciangul / Metekel)',
    modernName: 'Benishangul-Gumuz Regional State',
    step0Note:
      "Beni Sciangul e Metekel (Frontiera del Nilo Azzurro) · Sotto il governo locale dello sceicco Khojali al-Hasan e di Ras Hailu, questa fascia aurifera e fluviale lungo l'Abbay presidia il confine occidentale con il Sudan Anglo-Egiziano.",
    step1_2Gov:
      "AOI — Ripartizione Occidentale tra Governatorato dell'Amara (Metekel) e Governatorato dei Galla e Sidama (Asosa) · Presidi confinari di frontiera lungo la valle del Dabus e del Nilo Azzurro in vista di possibili tracciati stradali verso il Sudan.",
    step3_5Gov:
      "AOI — Settore Confinario del Beni Sciangul (Asosa / Metekel) · L'amministrazione italiana sorveglia i confini sudanesi di Kurmuk e Roseires contrastando infiltrazioni di armi e staffette etiopiche provenienti dal Sudan britannico.",
    step6_7War:
      "Fronte Occidentale AOI (Beni Sciangul) · Nel luglio 1940 colonne leggere italo-coloniali conducono puntate offensive oltre il confine sudanese occupando temporaneamente gli avamposti di Kurmuk e Ghezzan; a fine 1940 la colonna 'Gideon Force' prepara la controffensiva lungo la pista di Um Idla.",
    step8Status: {
      owner: 'ETH',
      fac: 'Alleati',
      title: "Impero d'Etiopia Restaurato — Asosa & Beni Sciangul (Liberazione Marzo 1941)",
      note: "L'11 marzo 1941 reparti belgi della Force Publique provenienti dal Congo e truppe sudanesi espugnano la piazzaforte di Asosa, mentre la Gideon Force attraversa l'altopiano occidentale verso il Goggiam.",
    },
    step9_13Note:
      "Beni Sciangul e Metekel · Reintegrati nei Teklay Gizat occidentali dell'Impero d'Etiopia (Wollega e Begemder-Gojjam) a guardia della frontiera con la provincia sudanese del Nilo Azzurro.",
    step14_18Note:
      "Beni Sciangul · Fascia periferica pacifica integrata negli scambi fluviali con il Sudan britannico attraverso la dogana di Asosa e Kurmuk.",
    step19_21Note:
      "Beni Sciangul (1947–giugno 1948) · Frontiera occidentale etiopica stabilizzata tra l'altopiano del Wollega e il Sudan Anglo-Egiziano lungo l'estensione del Nilo Azzurro.",
    step22Note:
      "Beni Sciangul (31 dicembre 1948) · Amministrazione provinciale imperiale stabile sulle valli dell'Abbay e del Dabus senza contenziosi di confine.",
  },
  ETDD: {
    id: 'ETDD',
    sourceName: 'Dire Dawa',
    labelIt: 'Dire Daua',
    modernName: 'City Administration of Dire Dawa',
    step0Note:
      "Dire Daua (Snodo della Ferrovia Franco-Etiopica) · Principale polo ferroviario e doganale imperiale tra Addis Abeba e il porto franco-gibutino di Gibuti sul Mar Rosso; centro vitale di smistamento per armi e materiali dell'Impero.",
    step1_2Gov:
      "Governatorato di Harar (AOI · Distretto Ferroviario di Dire Daua) · Nodo ferroviario e industriale di rilevanza primaria dell'AOI, sede di officine ferroviarie e scali logistici militari italiani.",
    step3_5Gov:
      "Governatorato di Harar (AOI · Centro Logistico di Dire Daua) · Rafforzamento della linea ferroviaria Gibuti–Dire Daua–Addis Abeba e apertura dei raccordi camionabili diretti con Harar, Giggiga e Berbera.",
    step6_7War:
      "Piazzaforte Logistica di Dire Daua (AOI) · Dall'estate 1940 Dire Daua e l'attigua Harar fungono da base logistica avanzata della colonna del Gen. Guglielmo Nasi per l'invasione della Somalia Britannica (agosto 1940); subisce incursioni aeree della RAF da Aden.",
    step8Status: {
      owner: 'ETH',
      fac: 'Alleati',
      title: "Impero d'Etiopia Restaurato — Dire Daua (Liberazione 29 Marzo 1941)",
      note: "29 marzo 1941: le forze alleate del Gen. Alan Cunningham, risalite dall'Ogaden dopo la conquista di Harar, occupano Dire Daua tagliando la ferrovia per Gibuti (rimasta sotto amministrazione di Vichy) prima della marcia finale su Addis Abeba.",
    },
    step9_13Note:
      "Dire Daua (Regime Ferroviario Anglo-Etiopico 1942–1943) · Sotto il Primo Accordo Anglo-Etiopico (31 gennaio 1942), la ferrovia franco-etiopica passante per Dire Daua è soggetta a controllo militare strategico britannico dopo il ralliement di Gibuti alla Francia Libera (dicembre 1942).",
    step14_18Note:
      "Dire Daua · Con il Secondo Accordo Anglo-Etiopico del 19 dicembre 1944, la Gran Bretagna restituisce al governo di Addis Abeba il controllo pieno dell'intero corridoio ferroviario attraverso Dire Daua.",
    step19_21Note:
      "Dire Daua (1947–giugno 1948) · Principale centro ferroviario, manifatturiero (tessili e cementifici) ed aeroportuale dell'Etiopia orientale, servito dai voli commerciali verso Aden e Gibuti.",
    step22Note:
      "Dire Daua (31 dicembre 1948) · Polo commerciale di primaria importanza dell'Impero d'Etiopia collegato al porto franco di Gibuti e alla neorintegrata amministrazione etiopica dell'Ogaden.",
  },
  ETGA: {
    id: 'ETGA',
    sourceName: 'Gambela',
    labelIt: 'Gambela (Bacino del Baro)',
    modernName: "Gambela Peoples' Regional State",
    step0Note:
      "Gambela (Bacino del Baro) · Territorio fluviale sud-occidentale sul confine del Sudan Anglo-Egiziano, sede dell'enclave commerciale concessa in locazione alla Gran Bretagna (trattato del 1902) per la navigazione stagionale sul Baro–Sobat verso il Nilo Bianco.",
    step1_2Gov:
      "Governatorato dei Galla e Sidama (AOI · Residenza di Gambela) · L'amministrazione italiana assume il controllo politico dell'entroterra lasciando sussistere, in virtù di accordi diplomatici provvisori fino al 1940, l'enclave commerciale doganale britannica sul fiume Baro.",
    step3_5Gov:
      "Governatorato dei Galla e Sidama (AOI · Territorio del Baro) · Sorveglianza italiana sul corridoio fluviale verso Malakal e sull'attivismo dei commercianti britannici dell'enclave fino al deterioramento dei rapporti europei del 1939.",
    step6_7War:
      "Gambela (AOI · Sequestro dell'Enclave Britannica, Giugno 1940) · Allo scoppio della guerra nel giugno 1940 le truppe coloniali italiane espugnano e chiudono l'enclave commerciale britannica di Gambela, bloccando la rotta fluviale del Baro verso il Sudan.",
    step8Status: {
      owner: 'ETH',
      fac: 'Alleati',
      title: "Impero d'Etiopia Restaurato — Gambela (Liberazione 22 Marzo 1941)",
      note: "22 marzo 1941: colonne miste britanniche dei King's African Rifles e battaglioni della Force Publique belga provenienti dall'Alto Nilo riconquistano Gambela, lanciando l'avanzata sull'altopiano verso Saio/Dembidollo (dove resisterà fino a luglio l'ultima colonna del Gen. Gazzera).",
    },
    step9_13Note:
      "Gambela (Impero d'Etiopia · Ripristino Enclave Commerciale 1942) · Il Primo Accordo Anglo-Etiopico riattiva la stazione fluviale commerciale britannica sul Baro mentre il territorio rientra sotto la provincia imperiale dell'Ilubabor.",
    step14_18Note:
      "Gambela · Nel 1944–1945 prosegue l'esportazione fluviale stagionale di caffè dell'Etiopia sud-occidentale lungo il Baro–Sobat verso il Sudan, pur con crescente controllo sovrano etiopico.",
    step19_21Note:
      "Gambela (1947–giugno 1948) · Bassopiano periferico della provincia dell'Ilubabor sull'alto Sobat; stazione di transito verso il Sudan meridionale.",
    step22Note:
      "Gambela (31 dicembre 1948) · Regione stabile dell'Impero d'Etiopia sud-occidentale alla frontiera con le province dell'Alto Nilo nel Sudan Anglo-Egiziano.",
  },
  ETHA: {
    id: 'ETHA',
    sourceName: 'Harari',
    labelIt: 'Harar',
    modernName: "Harari People's Regional State",
    step0Note:
      "Harar (Capoluogo dell'Hararghe) · Baluardo orientale dell'Impero d'Etiopia: dalla città fortificata il Degiac Nasibù Emmanual e il consigliere ottomano Wehib Pasha coordinano la difesa dello sbarramento fortificato contro l'offensiva di Graziani dall'Ogaden.",
    step1_2Gov:
      "Governatorato di Harar (AOI · Gov. Gen. Guglielmo Nasi) · Capitale dell'omonimo Governatorato orientale; sotto la guida di Guglielmo Nasi (1936–1939) si attua un indirizzo amministrativo di equilibrio verso le élite musulmane e oromo dell'Hararghe.",
    step3_5Gov:
      "Governatorato di Harar (AOI · Amministrazione Enrico Cerulli) · Centro strategico di collegamento fra l'altopiano etiopico, Dire Daua, Giggiga e il confine della Somalia Britannica.",
    step6_7War:
      "Harar (Base d'Offensiva verso Berbera, Estate–Autunno 1940) · Nell'agosto 1940 dal comando di Harar scatta l'offensiva del Gen. Guglielmo Nasi che travolge il Passo di Tug Argan e conquista l'intera Somalia Britannica (Berbera occupata il 19 agosto).",
    step8Status: {
      owner: 'ETH',
      fac: 'Alleati',
      title: "Impero d'Etiopia Restaurato — Harar (Liberazione 26 Marzo 1941)",
      note: "26 marzo 1941: dopo lo sfondamento dell'Ogaden e del passo di Marda, le truppe sudafricane e nigeriane della East Africa Force di Alan Cunningham entrano ad Harar dichiarata città aperta, proseguendo su Dire Dawa e Addis Abeba.",
    },
    step9_13Note:
      "Harar (Impero d'Etiopia · Provincia dell'Hararghe) · Ristabilita l'autorità imperiale sul tradizionale feudo familiare dello Scioa-Harar sotto governatori di nomina imperiale (Duca di Harar principe Makonnen), mentre il settore ferroviario e l'Ogaden restano temporaneamente vigilati dalla BMA.",
    step14_18Note:
      "Harar · Nel 1944–1945 il Secondo Accordo Anglo-Etiopico riafferma la piena sovranità amministrativa sulla città e sui distretti dell'Hararghe centrale, sede della storica scuola militare etiopica.",
    step19_21Note:
      "Harar (1947–giugno 1948) · Centro nevralgico amministrativo ed economico dell'Hararghe imperiale, proiettato sul ritiro britannico dall'adiacente Ogaden.",
    step22Note:
      "Harar (31 dicembre 1948) · Capoluogo dell'estesa provincia imperiale dell'Hararghe, nuovamente ricollegata in modo diretto ai distretti dell'Ogaden restituiti dal Regno Unito nel settembre 1948.",
  },
  ETOR: {
    id: 'ETOR',
    sourceName: 'Oromia',
    labelIt: 'Oromia (Scioa, Arsi, Bale, Uollega & Hararghe)',
    modernName: 'Oromia Regional State',
    step0Note:
      "Altopiani Centro-Meridionali e Occidentali (Scioa, Arsi, Bale, Uollega, Borana) · Nel gennaio 1936 Ras Desta Damtew combatte sul fronte meridionale del Ganale Doria e a Neghelli nel Borana (raggiunta dalle colonne motorizzate di Graziani il 20 gennaio), mentre l'Uollega occidentale organizza l'amministrazione autonoma della Confederazione Oromo Occidentale.",
    step1_2Gov:
      "AOI — Territori divisi tra Governatorato dei Galla e Sidama (Uollega, Ilubabor), Harar (Arsi, Hararghe), Scioa/Addis Abeba e Amara · Nel giugno 1936 i capi dell'Uollega tentano brevemente la proposta di mandato britannico prima dell'occupazione italiana di Lekemti.",
    step3_5Gov:
      "AOI — Pieno assetto dei Governatorati (Scioa dal nov 1938, Harar e Galla e Sidama) · Apertura delle strade coloniali verso Lekemti, Bale e Mega–Moyale sul confine keniano; attività partigiana endemica nello Scioa settentrionale sotto Ras Abebe Aregai.",
    step6_7War:
      "Frontiera Sud e Centro AOI (Borana–Moyale & Uollega) · Nel luglio 1940 forze italiane conquistano il forte di confine di Moyale nel Kenya britannico (abbandonato e poi conteso); contemporaneamente le valli dello Scioa nord-orientale sono teatro di intensi combattimenti contro i patrioti di Abebe Aregai.",
    step8Status: {
      owner: 'ETH',
      fac: 'Alleati',
      title: "Impero d'Etiopia Restaurato — Scioa, Arsi, Hararghe & Uollo (Marzo–Aprile 1941)",
      note: "Aprile 1941: l'avanzata di Cunningham su Addis Abeba (6 aprile) e la vittoria sudafricana a Combolcia–Dessiè (26 aprile) liberano quasi tutto il settore centro-orientale dello Scioa, Arsi e Hararghe; sacche residue dell'Asse resistono solo nell'estremo Uollega occidentale (Dembidollo fino a luglio).",
    },
    step9_13Note:
      "Province Imperiali di Scioa, Uollega, Arsi, Bale ed Hararghe · L'Impero centralizzato abolisce le autonomie locali tradizionali e sopprime le rivolte postbelliche locali (incluso il movimento del Bale/Rayya), insediando governatori militari fedeli ad Addis Abeba.",
    step14_18Note:
      "Fascia Centro-Meridionale (Scioa, Arsi, Uollega, Bale) · Cuore agricolo, caffeicolo ed economico dell'Impero postbellico sotto piena amministrazione civile di Addis Abeba (ripristinata sulla fascia ferroviaria dal dicembre 1944).",
    step19_21Note:
      "Oromia Storica / Province Imperiali (1947–giugno 1948) · Dopo il Trattato di Parigi (settembre 1947) prosegue l'integrazione fiscale e infrastrutturale delle province di Uollega, Ilubabor, Scioa, Arsi, Bale e Borana lungo la frontiera del Kenya britannico.",
    step22Note:
      "Province Centro-Meridionali dell'Impero (31 dicembre 1948) · Asse produttivo ed infrastrutturale portante dell'Etiopia sovrana tra la Rift Valley, l'Uollega e il corridoio di Harar–Ogaden.",
  },
  ETSI: {
    id: 'ETSI',
    sourceName: 'Sidama',
    labelIt: 'Sidama (Auasa / Laghi della Rift Valley)',
    modernName: 'Sidama Regional State',
    step0Note:
      "Sidamo (Rift Valley / Irgalam) · Sotto il comando meridionale di Ras Desta Damtew, la regione sostiene il fronte contro l'avanzata di Graziani dal Borana verso i laghi della Rift Valley e le alture del Bale–Sidamo.",
    step1_2Gov:
      "Governatorato dei Galla e Sidama (AOI · Commissariato del Sidamo — Irgalam) · Caduta Irgalam all'inizio del 1937 con la sconfitta finale e cattura di Ras Desta Damtew a Goggetti (febbraio 1937), la regione è inserita nella nuova circoscrizione meridionale di Irgalam.",
    step3_5Gov:
      "Governatorato dei Galla e Sidama (AOI · Settore Sidamo / Laghi) · Valorizzazione agricola delle terre attorno al Lago Auasa (Awasa) e tracciamento dell'arteria stradale verso Mega, Yavello e Addis Abeba.",
    step6_7War:
      "Settore Sidamo (AOI · Retrovia Fronte del Kenya) · Dal giugno 1940 l'asse Irgalam–Mega sostiene i presidi italiani schierati lungo il confine settentrionale del Kenya contro la 11ª e 12ª Divisione Africana britannica.",
    step8Status: {
      owner: 'ITA',
      fac: 'Asse',
      title: "AOI — Governatorato Galla e Sidama (Fronte della Battaglia dei Laghi)",
      note: "30 aprile 1941: il Sidamo e la conca dei laghi della Rift Valley (Irgalam / Dalle / Soddo) rimangono sotto controllo militare italiano (21ª, 24ª e 25ª Divisione Coloniale del Gen. Pietro Gazzera), impegnate in aspri scontri difensivi nella Battaglia dei Laghi che cederanno solo a fine maggio 1941 (caduta di Soddo il 22 maggio).",
    },
    step9_13Note:
      "Provincia del Sidamo (Capoluogo Irgalam · Impero d'Etiopia) · Liberata a fine maggio 1941 dopo il crollo della linea dei Laghi, entra stabilmente nell'amministrazione centrale imperiale dei Teklay Gizat di Hailé Selassié I.",
    step14_18Note:
      "Sidamo · Area stabile dell'altopiano e dei laghi meridionali impegnata nella ripresa produttiva delle piantagioni di caffè sotto il governatorato imperiale di Irgalam.",
    step19_21Note:
      "Sidamo (1947–giugno 1948) · Provincia imperiale meridionale nella Rift Valley lungo l'arteria stradale Addis Abeba–Nairobi.",
    step22Note:
      "Sidamo (31 dicembre 1948) · Amministrazione provinciale imperiale consolidata tra il Lago Auasa e il confine keniano.",
  },
  ETSN: {
    id: 'ETSN',
    sourceName: 'SNNP',
    labelIt: 'Nazioni del Sud (Gimma / Kaffa, Gamo-Gofa & Omo)',
    modernName: "Southern Nations, Nationalities, and Peoples' Region",
    step0Note:
      "Sud-Ovest Etiopico (Gimma, Kaffa, Gamo-Gofa e Valle dell'Omo) · Territori autonomi e sultanati storici dell'altopiano sud-occidentale federati all'Impero d'Etiopia, lontani dai fronti principali del 1935–gennaio 1936 fino al crollo del maggio 1936.",
    step1_2Gov:
      "Governatorato dei Galla e Sidama (AOI · Capoluogo Gimma) · Il 1° giugno 1936 Gimma (Jimma) diviene capitale dell'esteso Governatorato dei Galla e Sidama sotto il Gen. Carlo Geloso e poi il Gen. Pietro Gazzera, con ampio programma infrastrutturale stradale.",
    step3_5Gov:
      "Governatorato dei Galla e Sidama (AOI · Gimma / Kaffa / Omo) · Consolidamento militare italiano nel bacino dell'Omo-Bottego e verso il Lago Rodolfo (Turkana) al triplice confine tra AOI, Sudan e Kenya.",
    step6_7War:
      "Quartier Generale di Gimma (AOI · Gen. Pietro Gazzera) · Nel giugno–ottobre 1940 le truppe coloniali del Galla e Sidama presidiano i confini sud-occidentali di Namuruputh (Lago Rodolfo) e il basso Omo contro le infiltrazioni anglo-sudanesi.",
    step8Status: {
      owner: 'ITA',
      fac: 'Asse',
      title: "AOI — Ridotto Meridionale di Gimma / Galla e Sidama (Gen. Pietro Gazzera)",
      note: "30 aprile 1941: il Gen. Pietro Gazzera (che di lì a poco assumerà il comando vicereale dopo la resa di Amba Alagi) mantiene intatto l'intero ridotto del sud-ovest (Gimma, Kaffa, Omo e Gamo-Gofa); l'offensiva alleata su Gimma si concluderà soltanto con la caduta della città il 21 giugno e la resa finale del settore il 3–6 luglio 1941.",
    },
    step9_13Note:
      "Province Imperiali di Kaffa-Gimma e Gemu-Gofa · Con la resa di Gazzera nel giugno–luglio 1941, il sud-ovest torna sotto sovranità etiopica; soppresso l'autonomismo dell'ex Regno di Gimma, l'area viene suddivisa nei nuovi Teklay Gizat di Kaffa e Gamo-Gofa.",
    step14_18Note:
      "Kaffa e Gamo-Gofa (Bacino dell'Omo) · Regioni integre dell'Impero d'Etiopia nel dopoguerra, fulcro della produzione di caffè del Kaffa e della frontiera con il Kenya sul Lago Rodolfo.",
    step19_21Note:
      "Kaffa e Gamo-Gofa (1947–giugno 1948) · Piena sovranità imperiale postbellica, con riapertura dei collegamenti aerei civili di Ethiopian Airlines verso Gimma (Jimma).",
    step22Note:
      "Kaffa e Gamo-Gofa (31 dicembre 1948) · Salde province sud-occidentali dell'Impero d'Etiopia lungo l'asta fluviale dell'Omo e la frontiera keniana.",
  },
  ETSO: {
    id: 'ETSO',
    sourceName: 'Somali',
    labelIt: 'Regione Somala / Ogaden',
    modernName: 'Somali Regional State',
    step0Note:
      "Ogaden (Fronte Meridionale — Dopo l'Incidente di Ual-Ual) · Teatro di duri scontri tra l'avanzata delle divisioni del Gen. Rodolfo Graziani (provenienti dalla Somalia Italiana attraverso Gorrahei e Gabredarre) e l'armata meridionale etiopica sul Fafan e sul Ganale Doria (gennaio 1936).",
    step1_2Gov:
      "Governo della Somalia (AOI · Incorporazione dell'Ogaden) · Con la Legge Organica dell'AOI del 1° giugno 1936 l'intero bassopiano dell'Ogaden (da Ual-Ual e Warder fino a Mustahil) è amministrativamente annesso al Governo della Somalia Italiana (Mogadiscio), mentre Giggiga resta in ambito Harar.",
    step3_5Gov:
      "Governo della Somalia (AOI · Settore Ogaden) · Consolidamento stradale lungo la 'Strada Imperiale' Mogadiscio–Ferfer–Dagabur–Giggiga a ridosso del confine con la Somalia Britannica.",
    step6_7War:
      "Ogaden (AOI · Base per l'Invasione del Somaliland Britannico, Agosto 1940) · Dal corridoio Giggiga–Hargeisa scattano le colonne italiane (Gen. Nasi) che in 16 giorni travolgono il Somaliland Britannico nell'agosto 1940, unificando temporaneamente l'intero Corno somalo sotto l'AOI.",
    step8Status: {
      owner: 'ETH',
      fac: 'Alleati',
      title: "Impero d'Etiopia — Ogaden Liberato (Marzo 1941, Transito Militare Britannico BMA)",
      note: "Marzo 1941: l'avanzata fulminea di Cunningham da Mogadiscio lungo l'asse Belet Uen–Dagabur–Giggiga (caduta il 17 marzo 1941) libera interamente l'Ogaden, posto provvisoriamente sotto amministrazione militare britannica (OETA/BMA) a tutela della sovranità etiopica restaurata.",
    },
    step9_13Note:
      "Ogaden (Sovranità Etiopica · Amministrazione Militare Britannica BMA) · Il Primo Accordo Anglo-Etiopico del 31 gennaio 1942 riconosce la sovranità etiopica ma lascia l'Ogaden e l'area confinaria dello Haud ('Reserved Area') sotto amministrazione militare britannica temporanea (BMA) per esigenze logistiche belliche e progetti britannici di 'Greater Somalia'.",
    step14_18Note:
      "Ogaden (Secondo Accordo Anglo-Etiopico, 19 Dicembre 1944 · BMA) · Pur restituendo la ferrovia e le altre regioni ad Addis Abeba nel dicembre 1944, Londra mantiene temporaneamente la BMA sull'Ogaden e sullo Haud/Reserved Area oltre la fine del conflitto nel 1945.",
    step19_21Note:
      "Ogaden (1947–giugno 1948 · Contenzioso Anglo-Etiopico sulla BMA) · Nonostante il Trattato di Parigi (settembre 1947) consacri i confini etiopici, al giugno 1948 l'Ogaden resta ancora sotto gestione della British Military Administration mentre a Londra fallisce il 'Bevin Plan' per una Grande Somalia; negoziati serrati per la restituzione civile.",
    step22Note:
      "Ogaden (31 dicembre 1948 · Restituzione all'Etiopia nel Settembre 1948) · Svolta decisiva: nel settembre 1948 il Regno Unito ritira la propria amministrazione militare dall'Ogaden restituendone il controllo civile diretto all'Impero d'Etiopia (tranne la stretta fascia della Reserved Area e dello Haud al confine col Somaliland, che rientrerà solo nel 1954–1955).",
  },
  ETTI: {
    id: 'ETTI',
    sourceName: 'Tigray',
    labelIt: 'Tigrè',
    modernName: 'Tigray Regional State',
    step0Note:
      "Tigrè (Fronte Settentrionale · Adua, Axum, Macallè, Tembien) · Regione epicentro della Guerra d'Etiopia al gennaio 1936: le armate di De Bono e poi del Maresciallo Badoglio occupano Adigrat, Adua, Axum e Macallè (caduta 8 novembre 1935), mentre le forze di Ras Kassa e Ras Seyoum contrattaccano sul Passo Dembeguina e nella Prima Battaglia del Tembien (20–24 gennaio 1936).",
    step1_2Gov:
      "Governo dell'Eritrea (AOI · Commissariati del Tigrè) · Nel giugno 1936 l'intero Tigrè storico (Adua, Axum, Macallè, Adigrat) è staccato dall'Etiopia e incorporato nella Grande Eritrea dell'AOI; nel 1937 la stele storica di Axum viene smontata e trasportata a Roma.",
    step3_5Gov:
      "Governo dell'Eritrea (AOI · Tigrè Orientale ed Occidentale) · L'asse della nuova strada Asmara–Adigrat–Macallè–Amba Alagi garantisce i collegamenti tra i porti eritrei e Addis Abeba attraverso il Tigrè.",
    step6_7War:
      "Tigrè (Governo dell'Eritrea AOI · Corridoio Strategico Nord) · Da giugno a dicembre 1940 le linee attraverso Adigrat e Macallè sostengono l'afflusso dei presidi verso il fronte eritreo di Cheren e Kassala.",
    step8Status: {
      owner: 'ETH',
      fac: 'Alleati',
      title: "Impero d'Etiopia Restaurato — Tigrè & Assedio dell'Amba Alagi (Aprile 1941)",
      note: "Aprile 1941: dopo la caduta di Cheren (27 marzo) e di Asmara (1° aprile), le colonne indo-britanniche e i reparti etiopici avanzano oltre il Mareb liberando Adua, Axum e Macallè, mentre i resti delle truppe vicereali di Amedeo di Savoia Duca d'Aosta ripiegano sul massiccio dell'Amba Alagi (confine meridionale del Tigrè, dove l'assedio si concluderà il 17–19 maggio 1941).",
    },
    step9_13Note:
      "Provincia del Tigrè (Impero d'Etiopia · Rivolta Weyane del 1943) · Ritornato allo Stato etiopico nel 1941, nel maggio–ottobre 1943 il Tigrè orientale (Endertà, Raya Azebo e Wajirat) è scosso dalla dura Rivolta contadino-nobiliare Weyane contro il fisco centralizzato e i governatori dello Scioa (guidata da Blatta Haile Mariam Redda), stroncata nell'ottobre 1943 dall'offensiva di Ras Abebe Aregai con supporto aereo britannico RAF da Aden.",
    step14_18Note:
      "Tigrè (Macallè / Adua / Axum) · Dopo la repressione della Prima Woyane (1943) ed il riassetto fiscale provinciale, il Tigrè sotto Ras Mengesha Seyoum / governatori imperiali funge da cerniera strategica etiopica verso l'Eritrea amministrata dagli inglesi.",
    step19_21Note:
      "Tigrè (1947–giugno 1948 · Articolo 37 di Parigi sull'Obelisco di Axum) · Con l'entrata in vigore del Trattato di Pace di Parigi (15 settembre 1947), l'Etiopia ottiene il riconoscimento giuridico alla restituzione dell'Obelisco di Axum mentre i partiti unionisti tigrino-eritrei intensificano i legami oltre il Mareb.",
    step22Note:
      "Tigrè (31 dicembre 1948 · Dossier Eritrea alle Nazioni Unite) · Frontiera settentrionale chiave al confine con l'Eritrea BMA al momento dell'iscrizione del futuro eritreo all'ordine del giorno dell'Assemblea Generale dell'ONU.",
  },
};

export const ETHIOPIA_ADM1_IDS = new Set<string>(Object.keys(ETHIOPIA_PROVINCES_META));

export function resolveEthiopiaProvince(ft: any, s: number): ResolvedTerritory | null {
  const p = ft?.properties || {};
  const candIds = [ft?.id, p.id, p.NUTS_ID, p.shapeISO]
    .filter(Boolean)
    .map((x) => String(x).trim().toUpperCase());

  let meta: EthiopiaProvinceInfo | undefined;
  for (const cid of candIds) {
    if (ETHIOPIA_PROVINCES_META[cid]) {
      meta = ETHIOPIA_PROVINCES_META[cid];
      break;
    }
  }

  if (!meta && p.REGION_KIND === 'ETHIOPIA_PROVINCE') {
    const raw = String(p.name || p.NAME_LATN || p.NUTS_NAME || p.NAME || '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
    for (const item of Object.values(ETHIOPIA_PROVINCES_META)) {
      const sNrm = item.sourceName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const lNrm = item.labelIt.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (raw && (raw === sNrm || raw === lNrm || raw.includes(sNrm))) {
        meta = item;
        break;
      }
    }
  }

  if (!meta) return null;

  // Step 0 (GEN 1936): Impero d'Etiopia sovrano durante la Guerra d'Etiopia
  if (s === 0) {
    return makeResult(
      'ETH',
      `Impero d'Etiopia — ${meta.labelIt}`,
      meta.step0Note,
      'Neutrale',
      `Ye’Ityōṗṗyā Nigūsa Negest Mengist — ${meta.labelIt} (Negus Hailé Selassié I)`
    );
  }

  // Steps 1–2 (MAR–OTT 1938): AOI — prima del cambio di Addis Abeba in Governatorato dello Scioa (11 Nov 1938)
  if (s >= 1 && s <= 2) {
    return makeResult(
      'ITA',
      `Africa Orientale Italiana (AOI) — ${meta.labelIt}`,
      meta.step1_2Gov,
      'Asse',
      `Regno d'Italia (AOI · Viceré Amedeo di Savoia Duca d'Aosta) — ${meta.labelIt}`
    );
  }

  // Steps 3–5 (MAR–SET 1939): AOI consolidata (Scioa nov 1938, reti stradali, vigilia WWII)
  if (s >= 3 && s <= 5) {
    return makeResult(
      'ITA',
      `Africa Orientale Italiana (AOI) — ${meta.labelIt}`,
      meta.step3_5Gov,
      'Asse',
      `Regno d'Italia (AOI) — ${meta.labelIt}`
    );
  }

  // Steps 6–7 (GIU–OTT 1940): Entrata in guerra, Somaliland & isolamento dell'AOI
  if (s >= 6 && s <= 7) {
    return makeResult(
      'ITA',
      `Africa Orientale Italiana (AOI in Guerra) — ${meta.labelIt}`,
      meta.step6_7War,
      'Asse',
      `Regno d'Italia (AOI — Fronti di Guerra 1940) — ${meta.labelIt}`
    );
  }

  // Step 8 (APR 1941): Mappa militare fedele al 30 aprile 1941 (ETAM, ETSN, ETSI ancora ridotti AOI ITA; resto ETH Alleati)
  if (s === 8) {
    return makeResult(
      meta.step8Status.owner,
      meta.step8Status.title,
      meta.step8Status.note,
      meta.step8Status.fac,
      meta.step8Status.owner === 'ITA'
        ? `Regno d'Italia (AOI — Ultima Resistenza 1941) — ${meta.labelIt}`
        : `Impero d'Etiopia Restaurato (Hailé Selassié I / Alleati) — ${meta.labelIt}`
    );
  }

  // Steps 9–13 (DIC 1941 – SET 1943): Resa di Gondar, Primo Accordo Anglo-Etiopico 1942 & Rivolta Woyane 1943
  if (s >= 9 && s <= 13) {
    return makeResult(
      'ETH',
      `Impero d'Etiopia Restaurato — ${meta.labelIt}`,
      meta.step9_13Note,
      'Alleati',
      `Impero d'Etiopia (Teklay Gizat — Negus Hailé Selassié I) — ${meta.labelIt}`
    );
  }

  // Steps 14–18 (GIU 1944 – SET 1945): Secondo Accordo Anglo-Etiopico Dic 1944 & Carta ONU 1945
  if (s >= 14 && s <= 18) {
    return makeResult(
      'ETH',
      `Impero d'Etiopia — ${meta.labelIt}`,
      meta.step14_18Note,
      'Alleati',
      `Impero d'Etiopia (Membro Fondatore ONU — Hailé Selassié I) — ${meta.labelIt}`
    );
  }

  // Steps 19–21 (SET 1947 – GIU 1948): Trattato di Parigi 1947 & negoziati BMA Ogaden / Eritrea
  if (s >= 19 && s <= 21) {
    return makeResult(
      'ETH',
      `Impero d'Etiopia — ${meta.labelIt}`,
      meta.step19_21Note,
      'Neutrale',
      `Ye’Ityōṗṗyā Nigūsa Negest Mengist — ${meta.labelIt} (Post-Parigi 1947)`
    );
  }

  // Step 22 (DIC 1948): Restituzione Ogaden Sett 1948 & Dibattito ONU Eritrea
  return makeResult(
    'ETH',
    `Impero d'Etiopia — ${meta.labelIt}`,
    meta.step22Note,
    'Neutrale',
    `Ye’Ityōṗṗyā Nigūsa Negest Mengist (PM Makonnen Endelkachew) — ${meta.labelIt}`
  );
}
