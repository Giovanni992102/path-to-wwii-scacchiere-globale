/**
 * Post-WWII Geopolitical, Administrative & Economic Data for ALL 240 Soviet Entities (Steps 18, 19, 20)
 * - Step 18: Settembre 1945 (Vittoria, smobilitazione, Potsdam, carestia post-bellica incipiente, epurazioni/deportazioni)
 * - Step 19: Settembre 1947 (Quarto Piano Quinquennale 1946-50, Sovnarkom -> Sovet Ministrov marzo 1946, carestia 1946-47, progetto atomico)
 * - Step 20: Dicembre 1947 (Riforma Monetaria 10:1 & abolizione tessere annonarie 14-16 dic 1947, Cominform/Guerra Fredda, bilancio fine 1947)
 */

export interface SovietPostwarSpec {
  capital: string;
  modernName: string;
  histBase?: string;
}

export interface SovietPostwarResolved {
  adminTitle: string;
  historicalName: string;
  note: string;
}

interface CustomPostwarDef {
  adm18?: string;
  adm19?: string;
  name18: string;
  name19: string;
  name20?: string;
  note18: string;
  note19: string;
  note20: string;
}

// Dati specifici provincia per provincia per entita con trasformazioni amministrative, nucleari, industriali o geopolitiche chiave 1945-1947
const SPECIFIC_POSTWAR: Record<string, CustomPostwarDef> = {
  // === RSFSR: CAPITALI, CITTÀ CHIUSE, SITI NUCLEARI & CAMBIAMENTI AMMINISTRATIVI 1945-47 ===
  SOV_ADM1_RUS_42_Moscow: {
    adm18: 'Moskovskij Gorsovet & SNK SSSR — Capitale dell\'URSS (RSFSR)',
    adm19: 'Moskovskij Gorsovet & Sovet Ministrov SSSR — Capitale dell\'URSS (RSFSR)',
    name18: 'Moskva (Capitale dell\'URSS — Smobilitazione & Dopoguerra, 1945)',
    name19: 'Moskva (800° Anniversario & Quarto Piano Quinquennale, Set. 1947)',
    name20: 'Moskva (Riforma Monetaria & Fine Razionamento, Dic. 1947)',
    note18: 'Settembre 1945: dopo la Parata della Vittoria sulla Piazza Rossa, Mosca avvia la riconversione dell\'industria bellica (ZiS, Mikojan, Dinamo) e la riorganizzazione strategica postbellica.',
    note19: 'Settembre 1947: celebrazioni dell\'800° anniversario di Mosca (7 settembre 1947) e posa delle prime pietre degli otto grattacieli staliniani (Vysotki); sede del Sovet Ministrov guidato da Stalin.',
    note20: 'Dicembre 1947: il Cremlino vara la riforma monetaria (14-16 dicembre, cambio 10:1 del rublo in contanti) e l\'abolizione delle tessere annonarie di guerra; irrigidimento ideologico del Cominform.',
  },
  SOV_ADM1_RUS_43_Moscow_Oblast: {
    adm18: 'Moskovskij Oblispolkom — RSFSR (URSS)',
    adm19: 'Moskovskij Oblispolkom — RSFSR (URSS, Sovet Ministrov)',
    name18: 'Moskovskaya Oblast\' (Cintura Industriale & Ricostruzione 1945)',
    name19: 'Moskovskaya Oblast\' (Podmoskov\'e — Podol\'sk, Kolomna, Elektrostal\', 1947)',
    name20: 'Moskovskaya Oblast\' (Fine Razionamento & Polo Missilistico-Nucleare, Dic. 1947)',
    note18: 'Settembre 1945: riconversione civile delle fabbriche di carri e locomotive di Kolomna, Mytišči ed Elektrostal\' nell\'anello industriale attorno alla capitale.',
    note19: 'Settembre 1947: sviluppo dei primi impianti segreti di ricerca missilistica a Kaliningrad (Korolëv, NII-88) e dell\'acceleratore di Dubna nella regione di Mosca.',
    note20: 'Dicembre 1947: estensione della riforma monetaria del 14-16 dicembre e pieno rifornimento dei magazzini statali senza tessere nel bacino di Mosca.',
  },
  SOV_ADM1_RUS_49_Saint_Petersburg: {
    adm18: 'Leningradskij Gorsovet — Seconda Capitale dell\'URSS (RSFSR)',
    adm19: 'Leningradskij Gorsovet — Seconda Capitale dell\'URSS (RSFSR, Era Ždanov)',
    name18: 'Leningrad (Rinascita Post-Assedio & Cantieri del Baltico, 1945)',
    name19: 'Leningrad (Ricostruzione Kirov/Baltijskij & Ždanovščina, 1947)',
    name20: 'Leningrad (Riforma Monetaria & Primato Industriale del Baltico, Dic. 1947)',
    note18: 'Settembre 1945: rimossi i danni dell\'assedio di 872 giorni; ripresa delle Officine Kirov, Elektrosila e dei cantieri navali della Neva con il rientro degli evacuati.',
    note19: 'Settembre 1947: fulcro industriale del Nord-Ovest nel Quarto Piano Quinquennale (turbine e navi), segnato però dalla stretta culturale della Ždanovščina (riviste Zvezda e Leningrad).',
    note20: 'Dicembre 1947: abolizione delle tessere annonarie e cambio valutario 10:1 nella seconda capitale dell\'URSS; tensione politica crescente tra l\'apparato locale e il centro staliniano.',
  },
  SOV_ADM1_RUS_13_Volgograd_Oblast: {
    adm18: 'Stalingradskij Oblispolkom — RSFSR (URSS)',
    adm19: 'Stalingradskij Oblispolkom — RSFSR (URSS)',
    name18: 'Stalingrad (Ricostruzione dalle Macerie & Basso Volga, 1945)',
    name19: 'Stalingrad (Movimento Čerkasova & Rinascita STZ / Ottobre Rosso, 1947)',
    name20: 'Stalingrad (Piano di Ricostruzione Generale del Basso Volga, Dic. 1947)',
    note18: 'Settembre 1945: la città simbolo della vittoria sovietica sul Volga affronta una ricostruzione totale dalle macerie grazie alle brigate civili del movimento Čerkasova.',
    note19: 'Settembre 1947: riattivazione piena delle linee di produzione alla Fabbrica di Trattori (STZ), alle acciaierie Ottobre Rosso e alle officine Barrikady lungo il Volga.',
    note20: 'Dicembre 1947: consolidamento urbano della Stalingrad postbellica, abolizione del razionamento e preparazione dei piani idroelettrici del Basso Volga.',
  },
  SOV_STALINGRAD_KESSEL: {
    adm18: 'Stalingradskij Gorsovet — Settore Urbano Centrale (RSFSR / URSS)',
    adm19: 'Stalingradskij Gorsovet — Settore Urbano Centrale (RSFSR / URSS)',
    name18: 'Stalingrad (Centro Urbano & Mamajev Kurgan — Ricostruzione 1945)',
    name19: 'Stalingrad (Settore Centrale — Nuova Pianificazione Urbana 1947)',
    name20: 'Stalingrad (Settore Centrale — Ripresa Civile & Fine Tessera, Dic. 1947)',
    note18: 'Settembre 1945: ex perimetro della battaglia invernale interamente sgomberato dalle macerie belliche; ricostruzione del centro cittadino tra Piazza dei Combattenti Caduti e il Volga.',
    note19: 'Settembre 1947: riedificazione integrale dei quartieri centrali di Stalingrad, delle banchine fluviali e degli impianti metallurgici lungo la riva destra.',
    note20: 'Dicembre 1947: completamento dei principali assi viari della Stalingrad ricostruita e abolizione del razionamento annonario nell\'area metropolitana.',
  },
  SOV_ADM1_RUS_25_Nizhny_Novgorod_Oblast: {
    adm18: 'Gor\'kovskij Oblispolkom — RSFSR (URSS)',
    adm19: 'Gor\'kovskij Oblispolkom & Settore Speciale KB-11 (RSFSR / URSS)',
    name18: 'Gor\'kij (Polo Industriale GAZ & Sormovo, 1945)',
    name19: 'Gor\'kij & Sarov / Arzamas-16 (GAZ Pobeda & Progetto Atomico KB-11, 1947)',
    name20: 'Gor\'kij & Arzamas-16 (Ricerca Nucleare Segreta & Industria Volga, Dic. 1947)',
    note18: 'Settembre 1945: il complesso automobilistico GAZ e i cantieri Krasnoe Sormovo di Gor\'kij riconvertono la produzione verso autocarri civili e vascelli fluviali.',
    note19: 'Settembre 1947: oltre alla produzione di serie della berlina GAZ-M20 Pobeda (1946), a Sarov (Arzamas-16, KB-11 fondato nell\'aprile 1946) opera il centro di progettazione della prima bomba atomica sovietica.',
    note20: 'Dicembre 1947: il laboratorio nucleare segreto di Arzamas-16 entra nella fase critica di assemblaggio per l\'RDS-1 mentre la regione adotta la riforma monetaria di fine 1947.',
  },
  SOV_ADM1_RUS_32_Chelyabinsk_Oblast: {
    adm18: 'Čeljabinskij Oblispolkom — RSFSR (URSS)',
    adm19: 'Čeljabinskij Oblispolkom & Kombinat 817 / Čeljabinsk-40 (RSFSR / URSS)',
    name18: 'Čeljabinsk (Riconversione Tankograd & Magnitogorsk, 1945)',
    name19: 'Čeljabinsk & Čeljabinsk-40 / Majak (Plutonio Urali & Acciaio, 1947)',
    name20: 'Čeljabinsk (Kombinat Nucleare Majak & Metallurgia Urali, Dic. 1947)',
    note18: 'Settembre 1945: l\'immenso bacino industriale di Tankograd (ČTZ) e gli altiforni di Magnitogorsk passano alla produzione di trattori pesanti e acciaio per la ricostruzione.',
    note19: 'Settembre 1947: nell\'area chiusa di Kyštym/Ozersk (Čeljabinsk-40, futuro Kombinat Majak) decine di migliaia di operai costruiscono il primo reattore al plutonio sovietico.',
    note20: 'Dicembre 1947: accelerazione massima del cantiere nucleare Čeljabinsk-40 verso la criticità del plutonio militare; abolizione del razionamento nei grandi poli siderurgici degli Urali.',
  },
  SOV_ADM1_RUS_12_Sverdlovsk_Oblast: {
    adm18: 'Sverdlovskij Oblispolkom — RSFSR (URSS)',
    adm19: 'Sverdlovskij Oblispolkom — RSFSR (Uralmaš & Sverdlovsk-44, 1947)',
    name18: 'Sverdlovsk (Capitale Industriale degli Urali, 1945)',
    name19: 'Sverdlovsk & Sverdlovsk-44 (Uralmaš & Arricchimento Uranio, 1947)',
    name20: 'Sverdlovsk (Polo Metallurgico & Impianto Nucleare Urali, Dic. 1947)',
    note18: 'Settembre 1945: Uralmaš, Uralvagonzavod (Nižnij Tagil) e gli impianti degli Urali medi avviano la riconversione verso escavatori, laminatoi e carri ferroviari.',
    note19: 'Settembre 1947: a Verch-Nejvinskij (città chiusa Sverdlovsk-44, Novoural\'sk) avanza la costruzione del primo impianto a diffusione gassosa per uranio arricchito.',
    note20: 'Dicembre 1947: consolidamento del cuore industriale degli Urali e adeguamento alla riforma valutaria sovietica di fine 1947.',
  },
  SOV_ADM1_RUS_24_Tomsk_Oblast: {
    adm18: 'Tomskij Oblispolkom — RSFSR (URSS)',
    adm19: 'Tomskij Oblispolkom — RSFSR (URSS)',
    name18: 'Tomsk (Oblast\' di Tomsk — Industrie Evacuate & Siberia, 1945)',
    name19: 'Tomsk (Consolidamento Scientifico & Industriale Siberiano, 1947)',
    name20: 'Tomsk (Quarto Piano Quinquennale in Siberia Occidentale, Dic. 1947)',
    note18: 'Settembre 1945: la neonata Oblast\' di Tomsk (istituita nell\'agosto 1944) trattiene stabilimenti elettrotecnici evacuati e amplia la ricerca politecnica siberiana.',
    note19: 'Settembre 1947: sviluppo dell\'industria meccanica, forestale e dei trasporti fluviali lungo il bacino dell\'Ob\'.',
    note20: 'Dicembre 1947: potenziamento delle infrastrutture energetiche siberiane e cessazione del tesseramento annonario nei centri urbani.',
  },
  SOV_ADM1_RUS_50_Sakhalin_Oblast: {
    adm18: 'Chabarovskij Krajispolkom — Sachalinskaja Oblast\' & Amm. Civile Sachalin Sud (RSFSR)',
    adm19: 'Sachalinskij Oblispolkom — Subordinazione Diretta RSFSR (dal 2 Gennaio 1947)',
    name18: 'Aleksandrovsk-Sachalinskij (Sachalin Unificata & Occupazione Sud-Sachalin, 1945)',
    name19: 'Južno-Sachalinsk (Oblast\' Unificata di Sachalin — RSFSR, 1947)',
    name20: 'Južno-Sachalinsk (Sovietizzazione Integrale di Sachalin e Curili, Dic. 1947)',
    note18: 'Settembre 1945: dopo l\'offensiva dell\'agosto 1945 sul Karafuto giapponese e sulle Curili, la metà settentrionale (Oblast\' di Sachalin) coordina l\'integrazione della metà meridionale.',
    note19: 'Settembre 1947: il 2 gennaio 1947 Sachalin Nord e Sud vengono fuse in un\'unica Oblast\' di Sachalin staccata dal Chabarovskij Krai e posta sotto controllo diretto della RSFSR, con capoluogo spostato a Južno-Sachalinsk.',
    note20: 'Dicembre 1947: prosegue il rimpatrio della popolazione giapponese residua e il ripopolamento con coloni sovietici nelle miniere di carbone, petrolio (Ocha) e pesca del Pacifico.',
  },
  SOV_ADM1_RUS_60_Magadan_Oblast: {
    adm18: 'Chabarovskij Krajispolkom & Dal\'stroj MVD — Estremo Nord-Est (RSFSR)',
    adm19: 'Chabarovskij Krajispolkom & Dal\'stroj MVD — Kolyma (RSFSR, pre-Oblast\' 1953)',
    name18: 'Magadan (Dal\'stroj & Bacino Aurifero della Kolyma — Chabarovsk Krai, 1945)',
    name19: 'Magadan (Dal\'stroj MVD — Oro e Uranio della Kolyma, 1947)',
    name20: 'Magadan (Sistema Dal\'stroj & Porto di Nagaevo sul Mare di Ochotsk, Dic. 1947)',
    note18: 'Settembre 1945: fino al 1953 il territorio non è ancora Oblast\' autonoma: Magadan è il porto-base del complesso estrattivo Dal\'stroj (Krai di Chabarovsk) sull\'alta Kolyma.',
    note19: 'Settembre 1947: intensificazione dell\'estrazione di oro, stagno e giacimenti uraniferi di Butugyčag gestiti dal Dal\'stroj MVD con manodopera coatta.',
    note20: 'Dicembre 1947: massima espansione del sistema minerario-penitenziario di Kolyma sotto il controllo diretto di Mosca e Chabarovsk.',
  },
  SOV_ADM1_RUS_31_Chechnya: {
    adm18: 'Groznenskij Oblispolkom — RSFSR (ex RSSA Ceceno-Inguscia Abolita)',
    adm19: 'Groznenskij Oblispolkom — RSFSR (URSS)',
    name18: 'Groznyj (Oblast\' di Groznyj — Bacino Petrolifero Postbellico, 1945)',
    name19: 'Groznyj (Oblast\' di Groznyj — Raffinerie & Ripopolamento, 1947)',
    name20: 'Groznyj (Oblast\' di Groznyj — Estrazione Petrolifera Ciscaucasica, Dic. 1947)',
    note18: 'Settembre 1945: in seguito all\'abolizione della RSSA Ceceno-Inguscia (marzo 1944) e alla deportazione della popolazione in Asia Centrale, il territorio è inquadrato nella nuova Oblast\' di Groznyj (RSFSR).',
    note19: 'Settembre 1947: integrale riattivazione dei pozzi petroliferi e delle raffinerie di Groznyj, con insediamento di nuovi lavoratori da Russia e Ucraina.',
    note20: 'Dicembre 1947: consolidamento dell\'Oblast\' di Groznyj (esistita fino al 1957) nel Quarto Piano Quinquennale petrolifero del Caucaso settentrionale.',
  },
  SOV_ADM1_RUS_5_Ingushetia: {
    adm18: 'Groznenskij Oblispolkom & RSSA Ossezia Settentrionale — RSFSR',
    adm19: 'Groznenskij Oblispolkom & RSSA Ossezia Settentrionale — RSFSR',
    name18: 'Inguscezia / Nazran\' (Oblast\' di Groznyj & Ossezia Nord, 1945)',
    name19: 'Kostachetagurovskoe / Nazran\' (Oblast\' di Groznyj — RSFSR, 1947)',
    name20: 'Nazran\' (Settore Occidentale Oblast\' di Groznyj — RSFSR, Dic. 1947)',
    note18: 'Settembre 1945: dopo la dissoluzione della RSSA Ceceno-Inguscia (1944), i distretti di Nazran\' e Malgobek appartengono all\'Oblast\' di Groznyj mentre il distretto Prigorodnyj passa all\'Ossezia del Nord.',
    note19: 'Settembre 1947: assetto amministrativo transitorio post-deportazione tra Oblast\' di Groznyj e Ossezia Settentrionale, con valorizzazione agricola e petrolifera a Malgobek.',
    note20: 'Dicembre 1947: mantenimento della giurisdizione mista RSFSR (Groznyj / Vladikavkaz) nell\'area dell\'Inguscezia storica.',
  },
  SOV_ADM1_RUS_70_Kalmykia: {
    adm18: 'Astrachanskij & Stalingradskij Oblispolkom — RSFSR (ex RSSA Calmucca Abolita)',
    adm19: 'Astrachanskij & Stalingradskij Oblispolkom — RSFSR (Steppe del Basso Volga)',
    name18: 'Stepnoj / Ėlista (Ex Calmuccia Ripartita tra Astrachan\' e Volga, 1945)',
    name19: 'Stepnoj (Steppa Ciscaspica — Oblast\' di Astrachan\', 1947)',
    name20: 'Stepnoj / Ėlista (Amministrazione Astrachan\'-Stalingrad RSFSR, Dic. 1947)',
    note18: 'Settembre 1945: soppressa la RSSA Calmucca nel dicembre 1943, il capoluogo Ėlista (ribattezzato Stepnoj) e i distretti ciscaspici sono ripartiti tra Oblast\' di Astrachan\', Stalingrad, Rostov e Krai di Stavropol\'.',
    note19: 'Settembre 1947: rilancio pastorale e foraggero delle steppe aride ciscaspiche all\'interno dell\'Oblast\' di Astrachan\' (assetto rimasto in vigore fino al 1957).',
    note20: 'Dicembre 1947: applicazione della riforma monetaria nella fascia del Basso Volga/Mar Caspio nord-occidentale sotto giurisdizione di Astrachan\'.',
  },
  SOV_ADM1_RUS_38_Kabardino_Balkaria: {
    adm18: 'Sovet Narodnykh Komissarov Kabardinskoj ASSR — RSFSR (URSS)',
    adm19: 'Sovet Ministrov Kabardinskoj ASSR — RSFSR (URSS)',
    name18: 'Nal\'čik (RSSA Cabarda — RSFSR, 1945)',
    name19: 'Nal\'čik (RSSA Cabarda — Tungsteno Tyrnyauz & Caucaso, 1947)',
    name20: 'Nal\'čik (RSSA Cabarda — Ricostruzione Caucaso Centrale, Dic. 1947)',
    note18: 'Settembre 1945: in seguito alla deportazione della popolazione balcara (marzo 1944), l\'entità porta la denominazione ufficiale di Repubblica Socialista Sovietica Autonoma Cabarda (1944-1957).',
    note19: 'Settembre 1947: ripresa estrattiva dello strategico combinato di tungsteno e molibdeno di Tyrnyauz e della centrale idroelettrica del Baksan.',
    note20: 'Dicembre 1947: consolidamento agro-industriale della RSSA Cabarda nella regione centrale del Grande Caucaso.',
  },
  SOV_ADM1_RUS_72_Karachay_Cherkessia: {
    adm18: 'Čerkesskij Oblispolkom (Stavropol\'skij Krai) & Kluchori (RSS Georgiana)',
    adm19: 'Čerkesskij Oblispolkom (Stavropol\'skij Krai RSFSR) & Kluchori (RSS Georgiana)',
    name18: 'Čerkessk (AO Circassa & Settore Mer. Kluchori alla Georgia, 1945)',
    name19: 'Čerkessk (AO Circassa — Krai di Stavropol\' / RSFSR, 1947)',
    name20: 'Čerkessk (AO Circassa — Zootecnia & Idroelettrico Caucaso Nord, Dic. 1947)',
    note18: 'Settembre 1945: dopo l\'abolizione dell\'OA dei Karacai (1943), la porzione meridionale (distretto di Kluchori) è annessa alla RSS Georgiana, mentre il nord resta Oblast\' Autonoma Circassa nel Krai di Stavropol\'.',
    note19: 'Settembre 1947: ricostruzione della rete idroelettrica del Kuban\' superiore e delle aziende collettive nella circoscrizione di Čerkessk.',
    note20: 'Dicembre 1947: integrazione produttiva dell\'AO Circassa nel Caucaso settentrionale e fine del tesseramento annonario.',
  },
  SOV_ADM1_RUS_28_Belgorod_Oblast: {
    adm18: 'Kurskij & Voronežskij Oblispolkom — Settore di Belgorod — RSFSR (URSS)',
    adm19: 'Kurskij & Voronežskij Oblispolkom — Settore di Belgorod — RSFSR (URSS)',
    name18: 'Belgorod (Terre Nere Meridionali — Kursk/Voronež RSFSR, 1945)',
    name19: 'Belgorod (Oblast\' di Kursk/Voronež — Carestia & Ricostruzione 1947)',
    name20: 'Belgorod (Ripresa Agricola Terre Nere Meridionali, Dic. 1947)',
    note18: 'Settembre 1945: fino al 1954 Belgorod rientra nelle Oblast\' di Kursk e Voronež; enorme opera di sminamento dei campi ex Saliente di Kursk-Prochorovka.',
    note19: 'Settembre 1947: l\'area meridionale delle Terre Nere è colpita duramente dalla siccità del 1946 e dalla carestia del 1946-47 pur riattivando cementifici e ferrovie per il Donbass.',
    note20: 'Dicembre 1947: graduale normalizzazione agricola e cessazione delle carte annonarie nei distretti di Belgorod e Staryj Oskol.',
  },
  SOV_ADM1_RUS_59_Lipetsk_Oblast: {
    adm18: 'Voronežskij & Orlovskij Oblispolkom — Polo di Lipeck — RSFSR (URSS)',
    adm19: 'Voronežskij & Orlovskij Oblispolkom — Polo di Lipeck — RSFSR (URSS)',
    name18: 'Lipeck (Settore Siderurgico Novolipeck — Voronež/Orël RSFSR, 1945)',
    name19: 'Lipeck (Siderurgia & Trattori LTZ — Pre-Oblast\' 1954, 1947)',
    name20: 'Lipeck (Quarto Piano Quinquennale nelle Terre Nere, Dic. 1947)',
    note18: 'Settembre 1945: fino all\'istituzione dell\'Oblast\' di Lipeck nel 1954 il territorio è diviso tra Voronež, Orël, Rjazan\' e Tambov; riavvio del polo metallurgico Novolipeck.',
    note19: 'Settembre 1947: produzione di trattori cingolati presso la nuova fabbrica LTZ e ripristino delle acciaierie nell\'area di Lipeck e Elec.',
    note20: 'Dicembre 1947: consolidamento industriale della fascia dell\'alto Don dopo le difficoltà agricole del 1946-47.',
  },
  SOV_ADM1_RUS_55_Tuva: {
    adm18: 'Tuvinskij Oblispolkom — Oblast\' Autonoma di Tuva (RSFSR / URSS)',
    adm19: 'Tuvinskij Oblispolkom — Oblast\' Autonoma di Tuva (RSFSR / URSS)',
    name18: 'Kyzyl (Oblast\' Autonoma di Tuva — RSFSR / URSS, 1945)',
    name19: 'Kyzyl (Oblast\' Autonoma di Tuva — RSFSR, Collettivizzazione 1947)',
    name20: 'Kyzyl (Oblast\' Autonoma di Tuva — Integrazione Siberiana, Dic. 1947)',
    note18: 'Settembre 1945: incorporata nell\'URSS l\'11 ottobre 1944 come Oblast\' Autonoma della RSFSR sotto la guida di Salčak Toka; passaggio graduale dall\'economia nomade all\'assetto sovietico.',
    note19: 'Settembre 1947: diffusione dell\'alfabeto cirillico tuvano, avvio della collettivizzazione degli allevamenti (arat) e sviluppo minerario lungo l\'Alto Enisej.',
    note20: 'Dicembre 1947: piena integrazione amministrativa ed economica dell\'Oblast\' Autonoma di Tuva nel sistema monetario e pianificato della RSFSR.',
  },
  SOV_ADM1_RUS_23_Tatarstan: {
    adm18: 'SNK Tatarskoj ASSR — RSFSR (URSS)',
    adm19: 'Sovet Ministrov Tatarskoj ASSR — RSFSR (URSS)',
    name18: 'Kazan\' (RSSA Tatara — Aviazione & Industria Volga, 1945)',
    name19: 'Kazan\' (RSSA Tatara — Ricerche "Secondo Baku", 1947)',
    name20: 'Kazan\' (RSSA Tatara — Svolta Petrolifera del Tatarstan, Dic. 1947)',
    note18: 'Settembre 1945: l\'industria aeronautica di Kazan\' (bombardieri Pe-2) e i centri chimici del medio Volga passano alla produzione postbellica.',
    note19: 'Settembre 1947: intense prospezioni geologiche nel Tatarstan sud-orientale preludono alla scoperta del giacimento gigante di Romaškino nel "Secondo Baku".',
    note20: 'Dicembre 1947: ascesa del Tatarstan a snodo energetico e aeronautico strategico tra Mosca e gli Urali.',
  },
  SOV_ADM1_RUS_79_Bashkortostan: {
    adm18: 'SNK Baškirskoj ASSR — RSFSR (URSS)',
    adm19: 'Sovet Ministrov Baškirskoj ASSR — RSFSR (URSS)',
    name18: 'Ufa (RSSA Baschira — Petrolio Tujmazy & "Secondo Baku", 1945)',
    name19: 'Ufa (RSSA Baschira — Cuore del "Secondo Baku", 1947)',
    name20: 'Ufa (RSSA Baschira — Raffinazione Urali-Volga, Dic. 1947)',
    note18: 'Settembre 1945: i giacimenti devoniani di Tujmazy e Išimbaj affermano la Baschiria come motore petrolifero principale del "Secondo Baku".',
    note19: 'Settembre 1947: espansione degli impianti chimici di Ufa e Sterlitamak con manodopera ed equipaggiamenti evacuati durante la guerra.',
    note20: 'Dicembre 1947: primato produttivo della RSSA Baschira nell\'estrazione di greggio e avio-carburanti per l\'economia sovietica del dopoguerra.',
  },
  SOV_ADM1_RUS_20_Samara_Oblast: {
    adm18: 'Kujbyševskij Oblispolkom — RSFSR (URSS)',
    adm19: 'Kujbyševskij Oblispolkom — RSFSR (URSS)',
    name18: 'Kujbyšev (Aviazione & Industria del Medio Volga, 1945)',
    name19: 'Kujbyšev (Petrolio Žiguli & Industria Aeronautica, 1947)',
    name20: 'Kujbyšev (Polo Energetico-Aeronautico del Volga, Dic. 1947)',
    note18: 'Settembre 1945: gli stabilimenti aeronautici n. 1 e n. 18 di Kujbyšev smobilitano parte degli impianti e riconvertono le catene d\'assemblaggio dagli Il-2 ai velivoli del dopoguerra.',
    note19: 'Settembre 1947: sviluppo dei campi petroliferi dell\'Ansa di Samara e delle officine meccaniche di Syzran\' e Kujbyšev nel Quarto Piano Quinquennale.',
    note20: 'Dicembre 1947: Kujbyšev prepara i cantieri propedeutici alla futura diga sul Volga e adotta la riforma monetaria di fine 1947.',
  },
  SOV_ADM1_RUS_15_Perm_Krai: {
    adm18: 'Molotovskij Oblispolkom — RSFSR (URSS)',
    adm19: 'Molotovskij Oblispolkom — RSFSR (URSS)',
    name18: 'Molotov / Perm\' (Motori Švecov & Bacino Kama, 1945)',
    name19: 'Molotov / Perm\' (Industria Chimica & Metalmeccanica Kama, 1947)',
    name20: 'Molotov / Perm\' (Potenziamento Industriale Pre-Uralico, Dic. 1947)',
    note18: 'Settembre 1945: denominata Molotov dal 1940 al 1957; le officine di artiglieria Motovilicha e i motori aeronautici n. 19 riconvertono la capacità produttiva per l\'aviazione civile e militare.',
    note19: 'Settembre 1947: crescita di Berezniki e Solikamsk come poli fondamentali per i fertilizzanti potassici e la chimica di base degli Urali occidentali.',
    note20: 'Dicembre 1947: espansione dei cantieri idroelettrici della Kama e normalizzazione commerciale nella regione di Molotov.',
  },
  SOV_ADM1_RUS_73_Kemerovo_Oblast: {
    adm18: 'Kemerovskij Oblispolkom — Bacino del Kuzbass (RSFSR / URSS)',
    adm19: 'Kemerovskij Oblispolkom — Bacino del Kuzbass (RSFSR / URSS)',
    name18: 'Kemerovo & Stalinsk (Kuzbass — Carbone & Acciaio Siberiano, 1945)',
    name19: 'Kemerovo & Stalinsk (Kuzbass — Espansione Quarto Piano, 1947)',
    name20: 'Kemerovo & Stalinsk (Pilastro Carbonifero-Siderurgico Siberiano, Dic. 1947)',
    note18: 'Settembre 1945: l\'Oblast\' di Kemerovo (istituita nel 1943) coordina la produzione di carbone da coke del Kuzbass e gli altiforni del Kombinat di Stalinsk (Novokuzneck).',
    note19: 'Settembre 1947: il Kuzbass supplisce alla lenta ricostruzione del Donbass devastato fornendo combustibile e rotaie per tutta la rete sovietica.',
    note20: 'Dicembre 1947: superamento dei volumi carboniferi bellici nelle miniere di Prokop\'evsk, Leninsk-Kuzneckij e Stalinsk.',
  },
  SOV_ADM1_RUS_10_Krasnoyarsk_Krai: {
    adm18: 'Krasnojarskij Krajispolkom — RSFSR (URSS)',
    adm19: 'Krasnojarskij Krajispolkom — RSFSR (URSS)',
    name18: 'Krasnojarsk (Siberia Centrale & Kombinat Nichel di Noril\'sk, 1945)',
    name19: 'Krasnojarsk (Industria dell\'Enisej & Estremo Nord Artico, 1947)',
    name20: 'Krasnojarsk (Ricostruzione Meccanica & Nichel di Noril\'sk, Dic. 1947)',
    note18: 'Settembre 1945: gli stabilimenti evacuati di Krasnojarsk (locomotive e mietitrebbie) e il combinat di Noril\'sk consolidano il peso strategico della Siberia centrale.',
    note19: 'Settembre 1947: incremento produttivo di nichel e rame a Noril\'sk tramite il sistema Norillag e sviluppo dei primi progetti idroelettrici sull\'Enisej.',
    note20: 'Dicembre 1947: avvio degli studi preliminari per le grandi strutture industriali lungo l\'Enisej e applicazione della riforma monetaria.',
  },
  SOV_ADM1_RUS_52_Saratov_Oblast: {
    adm18: 'Saratovskij Oblispolkom — RSFSR (ex ASSR Tedeschi del Volga)',
    adm19: 'Saratovskij Oblispolkom — RSFSR (Gasdotto Saratov-Mosca, 1947)',
    name18: 'Saratov (Basso Volga & Primo Gasdotto per Mosca, 1945)',
    name19: 'Saratov (Gasdotto Elšanka-Mosca & Carestia Rurale, 1947)',
    name20: 'Saratov (Fornitura Energetica a Mosca & Stabilità Basso Volga, Dic. 1947)',
    note18: 'Settembre 1945: l\'Oblast\' di Saratov (che ha assorbito gran parte dell\'abolita ASSR dei Tedeschi del Volga nel 1941) ultima il gasdotto strategico Elšanka-Mosca.',
    note19: 'Settembre 1947: inaugurato nel 1946, il primo grande gasdotto sovietico Saratov-Mosca fornisce metano alla capitale mentre le campagne del Volga risentono della siccità 1946-47.',
    note20: 'Dicembre 1947: rilancio delle officine aeronautiche e meccaniche di Saratov e Ėngel\'s e abolizione del razionamento urbano.',
  },

  // === UCRAINA & MOLDAVIA: RICOSTRUZIONE, DNEPROGES, CARESTIA 1946-47 & CRITICITÀ ===
  SOV_ADM1_UKR_98_Kyiv: {
    adm18: 'Kievskij Gorsovet & SNK Ukrainskoj SSR — Capitale RSS Ucraina (URSS)',
    adm19: 'Kievskij Gorsovet & Sovet Ministrov USSR (Segretario Kaganovič/Chruščëv, 1947)',
    name18: 'Kiev (Capitale della RSS Ucraina — Ricostruzione della Chreščatyk, 1945)',
    name19: 'Kiev (Quarto Piano Quinquennale & Crisi Agricola Ucraina, 1947)',
    name20: 'Kiev (Riforma Monetaria & Ritorno di Chruščëv a Capo del PC(b)U, Dic. 1947)',
    note18: 'Settembre 1945: la capitale della RSS Ucraina avvia il piano urbanistico per riedificare la Chreščatyk minata durante la guerra e riattivare la Fabbrica Arsenal e Lenin\'s Forge.',
    note19: 'Settembre 1947: mentre Stalin invia temporaneamente Lazar Kaganovič (marzo-dicembre 1947) a dirigere il PC(b)U al fianco di Chruščëv, l\'Ucraina soffre la carestia 1946-47 e la stretta sui trasporti fluviali.',
    note20: 'Dicembre 1947: Nikita Chruščëv riassume pienamente la guida del partito ucraino (26 dic. 1947) al termine della missione di Kaganovič; entrano in vigore il cambio 10:1 del rublo e la fine delle tessere.',
  },
  SOV_ADM1_UKR_82_Kyiv_Oblast: {
    adm18: 'Kievskij Oblispolkom — RSS Ucraina (URSS)',
    adm19: 'Kievskij Oblispolkom — RSS Ucraina (URSS)',
    name18: 'Oblast\' di Kiev (Ricostruzione Postbellica del Medio Dnepr, 1945)',
    name19: 'Oblast\' di Kiev (Ripristino Rete Rurale & Industrie Zuccheriere, 1947)',
    name20: 'Oblast\' di Kiev (Superamento della Carestia 1946-47, Dic. 1947)',
    note18: 'Settembre 1945: sminamento delle campagne intorno a Bila Cerkva e Fastiv, ricostruzione dei ponti ferroviari e delle stazioni lungo il Dnepr.',
    note19: 'Settembre 1947: ripresa dei kolchoz e degli zuccherifici regionali in un quadro segnato dalla severa penuria alimentare del 1946-47.',
    note20: 'Dicembre 1947: primo raccolto di ripresa del 1947 e abolizione del razionamento nel bacino centrale del Dnepr.',
  },
  SOV_ADM1_UKR_85_Kharkiv_Oblast: {
    adm18: 'Char\'kovskij Oblispolkom — RSS Ucraina (URSS)',
    adm19: 'Char\'kovskij Oblispolkom — RSS Ucraina (URSS)',
    name18: 'Char\'kov (Ricostruzione CHTZ & Officine Malyshev T-44/T-54, 1945)',
    name19: 'Char\'kov (Polo Meccanico, Turbine & Trattori dell\'Ucraina, 1947)',
    name20: 'Char\'kov (Centro Industriale & Scientifico Postbellico, Dic. 1947)',
    note18: 'Settembre 1945: l\'ex capitale ricostruisce con rapidità le gigantesche fabbriche di trattori (ChTZ), turbine elettriche e lo stabilimento corazzati n. 75 (T-44/T-54).',
    note19: 'Settembre 1947: Char\'kov torna ad essere il maggiore polo ingegneristico e ferroviario dell\'Ucraina orientale nonostante le tensioni alimentari del 1946-47.',
    note20: 'Dicembre 1947: completamento della ricostruzione dei grandi plessi industriali cittadini ed estensione della riforma valutaria sovietica.',
  },
  SOV_ADM1_UKR_87_Donetsk_Oblast: {
    adm18: 'Stalinskij Oblispolkom — Bacino del Donbass (RSS Ucraina / URSS)',
    adm19: 'Stalinskij Oblispolkom — Bacino del Donbass (RSS Ucraina / URSS)',
    name18: 'Stalino / Doneck (Drenaggio Miniere Allagate del Donbass, 1945)',
    name19: 'Stalino / Doneck (Rinascita Siderurgica & Carbonifera del Donbass, 1947)',
    name20: 'Stalino / Doneck (Superamento Quota Bellica nel Donbass, Dic. 1947)',
    note18: 'Settembre 1945: imponente campagna per pompare via centinaia di milioni di metri cubi d\'acqua dalle miniere del Donbass allagate e riaccendere gli altiforni di Azovstal\' e Makeevka.',
    note19: 'Settembre 1947: l\'Oblast\' di Stalino ritorna fulcro carbonifero dell\'URSS europea grazie alla mobilitazione di decine di migliaia di minatori e prigionieri di guerra.',
    note20: 'Dicembre 1947: pieno riavvio degli stabilimenti siderurgici e chimici del bacino di Stalino-Mariupol\' nel secondo anno del Piano Quinquennale.',
  },
  SOV_ADM1_UKR_86_Luhansk_Oblast: {
    adm18: 'Vorošilovgradskij Oblispolkom — Donbass Orientale (RSS Ucraina / URSS)',
    adm19: 'Vorošilovgradskij Oblispolkom — Donbass Orientale (RSS Ucraina / URSS)',
    name18: 'Vorošilovgrad / Luhans\'k (Fabbrica Locomotive & Miniere Donbass Est, 1945)',
    name19: 'Vorošilovgrad / Luhans\'k (Ripresa Locomotive & Coke del Donbass, 1947)',
    name20: 'Vorošilovgrad / Luhans\'k (Rete Ferroviaria & Acciaio, Dic. 1947)',
    note18: 'Settembre 1945: ripartono le storiche officine di locomotive a vapore di Vorošilovgrad e gli impianti carboniferi dell\'estremo oriente ucraino.',
    note19: 'Settembre 1947: aumento della produzione di locomotive serie L per ricostruire la rete ferroviaria dell\'Unione Sovietica.',
    note20: 'Dicembre 1947: completamento del ripristino dei pozzi principali nel bacino orientale del Donbass.',
  },
  SOV_ADM1_UKR_88_Zaporizhia_Oblast: {
    adm18: 'Zaporožskij Oblispolkom — Basso Dnepr (RSS Ucraina / URSS)',
    adm19: 'Zaporožskij Oblispolkom — Segretario L.I. Brežnev (RSS Ucraina, 1947)',
    name18: 'Zaporož\'e (Cantiere Ricostruzione DneproGES & Zaporožstal\', 1945)',
    name19: 'Zaporož\'e (Riavvio Turbina DneproGES & Zaporožstal\', 1947)',
    name20: 'Zaporož\'e (Elettrificazione Basso Dnepr & Siderurgia, Dic. 1947)',
    note18: 'Settembre 1945: epico cantiere di ricostruzione della diga e centrale idroelettrica del DneproGES e delle grandi acciaierie Zaporožstal\' gravemente minate nella ritirata tedesca.',
    note19: 'Settembre 1947: sotto la guida del segretario locale Leonid Brežnev (1946-47), nel marzo 1947 riparte la prima grande turbina del DneproGES insieme alla colata di Zaporožstal\'.',
    note20: 'Dicembre 1947: fornitura stabile di energia idroelettrica al Donbass e a Krivoj Rog nella fase decisiva della ricostruzione meridionale.',
  },
  SOV_ADM1_UKR_96_Dnipropetrovsk_Oblast: {
    adm18: 'Dnepropetrovskij Oblispolkom — RSS Ucraina (URSS)',
    adm19: 'Dnepropetrovskij Oblispolkom — RSS Ucraina (Segretario L.I. Brežnev da Nov. 1947)',
    name18: 'Dnepropetrovsk (Krivoj Rog & Officine Metallurgiche Dnepr, 1945)',
    name19: 'Dnepropetrovsk (Miniere di Ferro di Krivoj Rog & Južmaš, 1947)',
    name20: 'Dnepropetrovsk (Cuore Siderurgico & Missilistico Nascente, Dic. 1947)',
    note18: 'Settembre 1945: drenaggio e riapertura delle miniere di ferro di Krivoj Rog e dei complessi metallurgici Petrovskij e Dzeržinskij lungo il Dnepr.',
    note19: 'Settembre 1947: trasformazione dello stabilimento automobilistico DAZ (futuro Južmaš) e ripresa dei laminatoi pesanti nella valle del Dnepr.',
    note20: 'Dicembre 1947: Leonid Brežnev subentra come primo segretario regionale a Dnepropetrovsk (novembre 1947) per accelerare il completamento dell\'industria pesante ucraina.',
  },
  SOV_ADM1_UKR_91_Autonomous_Republic_of_Crimea: {
    adm18: 'Krymskij Oblispolkom — RSFSR (Declassata da RSSA il 30 Giugno 1945)',
    adm19: 'Krymskij Oblispolkom — Oblast\' di Crimea, RSFSR (URSS)',
    name18: 'Simferopol\' (Oblast\' di Crimea RSFSR — Post-Deportazione Tatari, 1945)',
    name19: 'Simferopol\' (Oblast\' di Crimea RSFSR — Ripopolamento Slavo, 1947)',
    name20: 'Simferopol\' (Oblast\' di Crimea RSFSR — Ricostruzione & Vigneti, Dic. 1947)',
    note18: 'Settembre 1945: il 30 giugno 1945 il Presidium del Soviet Supremo degrada formalmente la RSSA di Crimea a ordinaria Oblast\' della RSFSR dopo la deportazione di massa del popolo tataro (maggio 1944).',
    note19: 'Settembre 1947: massiccia campagna di insediamento di coloni russi e ucraini nelle valli interne e nelle città costiere (Jalta, Kerč\', Feodosija) della Crimea amministrata da Mosca.',
    note20: 'Dicembre 1947: consolidamento dell\'Oblast\' di Crimea entro la RSFSR (status mantenuto fino al trasferimento all\'Ucraina nel 1954).',
  },
  SOV_ADM1_UKR_99_Sevastopol: {
    adm18: 'Sevastopol\'skij Gorsovet — Base Principale Flotta del Mar Nero (RSFSR)',
    adm19: 'Sevastopol\'skij Gorsovet — Base Navale Flotta del Mar Nero (RSFSR)',
    name18: 'Sevastopol\' (Ricostruzione Integrale & Flotta del Mar Nero, 1945)',
    name19: 'Sevastopol\' (Città Eroica — Arsenale Navale Mar Nero, 1947)',
    name20: 'Sevastopol\' (Caposaldo Strategico Sovietico sul Mar Nero, Dic. 1947)',
    note18: 'Settembre 1945: la città semidistrutta avvia una massiccia riedificazione neoclassica e il ripristino dei bacini di carenaggio della Flotta del Mar Nero sotto giurisdizione RSFSR.',
    note19: 'Settembre 1947: potenziamento della piazzaforte navale nel contesto della pressione diplomatica sovietica sugli Stretti Turchi.',
    note20: 'Dicembre 1947: centro chiuso e bastione navale meridionale dell\'URSS in piena operatività all\'alba della Guerra Fredda.',
  },
  SOV_ADM1_UKR_195_Odessa_City: {
    adm18: 'Odesskij Gorsovet — Porto Principale sul Mar Nero (RSS Ucraina / URSS)',
    adm19: 'Odesskij Gorsovet — Città Eroica & Porto Commerciale (RSS Ucraina / URSS)',
    name18: 'Odessa (Riattivazione Porto & Cantieri sul Mar Nero, 1945)',
    name19: 'Odessa (Traffici Marittimi & Carestia nel Mezzogiorno Ucraino, 1947)',
    name20: 'Odessa (Polo Portuale & Riforma Monetaria sul Mar Nero, Dic. 1947)',
    note18: 'Settembre 1945: sminamento delle acque portuali di Odessa e ripresa dei collegamenti marittimi verso il Danubio, i Balcani e il Medio Oriente.',
    note19: 'Settembre 1947: massimo scalo commerciale dell\'URSS meridionale per importazioni e spedizioni di riparazione, in una provincia colpita dalla crisi alimentare del 1946-47.',
    note20: 'Dicembre 1947: stabilizzazione dei traffici marittimi e fine del tesseramento annonario nella metropoli portuale ucraina.',
  },
  SOV_ADM1_UKR_89_Chernivtsi_Oblast: {
    adm18: 'Černovickij Oblispolkom — Bucovina Settentrionale (RSS Ucraina / URSS)',
    adm19: 'Černovickij Oblispolkom — RSS Ucraina (URSS, Trattato Parigi 1947)',
    name18: 'Černovcy / Černivci (Bucovina Settentrionale — Riconferma Sovietica, 1945)',
    name19: 'Černovcy / Černivci (Bucovina Ratificata — Trattato di Parigi 1947)',
    name20: 'Černovcy / Černivci (Sovietizzazione & Confine Rumeno, Dic. 1947)',
    note18: 'Settembre 1945: riorganizzazione amministrativa e linguistica della Bucovina settentrionale (ex romena) nella RSS Ucraina con partenza di migliaia di ebrei e polacchi.',
    note19: 'Settembre 1947: il Trattato di Pace di Parigi (10 febbraio 1947) sancisce de jure l\'appartenenza sovietica della Bucovina settentrionale; prime fasi di collettivizzazione e carestia 1946-47.',
    note20: 'Dicembre 1947: pieno consolidamento dell\'Oblast\' di Černivci al confine con la neonata Repubblica Popolare Romena (30 dicembre 1947).',
  },
  SOV_ADM1_UKR_94_Cherkasy_Oblast: {
    adm18: 'Kievskij & Poltavskij Oblispolkom — Circondario di Čerkasy (RSS Ucraina)',
    adm19: 'Kievskij & Poltavskij Oblispolkom — Circondario di Čerkasy (RSS Ucraina)',
    name18: 'Čerkasy (Medio Dnepr — Amm. Kiev/Poltava pre-Oblast\' 1954, 1945)',
    name19: 'Čerkasy (Bacino Zuccheriero del Medio Dnepr — Carestia 1947)',
    name20: 'Čerkasy (Ripresa Agricola sulla Riva Destra del Dnepr, Dic. 1947)',
    note18: 'Settembre 1945: fino al gennaio 1954 il territorio di Čerkasy e Uman\' appartiene alle Oblast\' di Kiev, Poltava e Kirovohrad; ricostruzione di ponti e zuccherifici.',
    note19: 'Settembre 1947: le campagne cerealicole e bieticole tra Korsun\' e Smila fronteggiano la grave crisi alimentare del 1946-47.',
    note20: 'Dicembre 1947: superamento della fase acuta della carestia rurale e consolidamento delle stazioni di trattori sul Medio Dnepr.',
  },
  SOV_MASSR_310_Transnistria: {
    adm18: 'SNK Moldavskoj SSR — Tiraspol\' / Kišinëv (URSS)',
    adm19: 'Sovet Ministrov Moldavskoj SSR — Tiraspol\' / Kišinëv (URSS)',
    name18: 'Tiraspol\' & RSS Moldava (Ricostruzione sul Dnestr, 1945)',
    name19: 'Tiraspol\' & RSS Moldava (Carestia 1946-47 & Ratifica Parigi, 1947)',
    name20: 'Tiraspol\' & RSS Moldava (Sovietizzazione Rurale Post-Carestia, Dic. 1947)',
    note18: 'Settembre 1945: riattivazione della RSS Moldava tra Bessarabia e riva sinistra del Dnestr (Tiraspol\', Rîbnița), con riparazione delle ferrovie e dell\'industria conserviera.',
    note19: 'Settembre 1947: il Trattato di Parigi conferma il confine sul Prut, mentre la RSS Moldava è tra le repubbliche più duramente devastate dalla carestia 1946-47 e dalle requisizioni di grano.',
    note20: 'Dicembre 1947: la popolazione stremata dalla carestia del 1946-47 entra nella fase di collettivizzazione accelerata della riva destra moldava e riforma monetaria.',
  },

  // === BIELORUSSIA ===
  SOV_ADM1_BLR_103_Minsk: {
    adm18: 'Minskij Gorsovet & SNK Belorusskoj SSR (P.K. Ponomarenko) — URSS',
    adm19: 'Minskij Gorsovet & Sovet Ministrov BSSR (N.I. Gusarov) — URSS',
    name18: 'Minsk (Capitale della BSSR — Riedificazione delle Rovine, 1945)',
    name19: 'Minsk (Fondazione MTZ / MAZ-200 & Rinascita BSSR, 1947)',
    name20: 'Minsk (Polo Automobilistico MAZ & Capitale Ricostruita, Dic. 1947)',
    note18: 'Settembre 1945: la capitale della Bielorussia, rasa al suolo all\'80% durante l\'occupazione, avvia uno spettacolare piano monumentale intorno al viale centrale e accoglie prigionieri e brigate di ricostruzione.',
    note19: 'Settembre 1947: sorgono la Fabbrica di Trattori di Minsk (MTZ, maggio 1946) e l\'industria automobilistica MAZ (prototipo MAZ-200 nell\'ottobre 1947); seggio autonomo BSSR all\'ONU dal 1945.',
    note20: 'Dicembre 1947: avviata la produzione pesante di autocarri MAZ e completati i principali lotti abitativi nel centro di Minsk alla fine del tesseramento.',
  },
  SOV_ADM1_BLR_100_Gomel: {
    adm18: 'Gomel\'skij Oblispolkom — BSSR (URSS)',
    adm19: 'Gomel\'skij Oblispolkom — BSSR (URSS)',
    name18: 'Gomel\' (Poles\'e Orientale — Ricostruzione Ferroviaria & Gomel\'sel\'maš, 1945)',
    name19: 'Gomel\' (Industria Meccanica & Risanamento Poles\'e, 1947)',
    name20: 'Gomel\' (Snodo Meridionale BSSR & Riforma 1947, Dic. 1947)',
    note18: 'Settembre 1945: ricostruzione del grande nodo ferroviario di Gomel\' e riavvio delle officine di macchine agricole Gomel\'sel\'maš al confine tra Bielorussia, Russia e Ucraina.',
    note19: 'Settembre 1947: ripresa dell\'industria del legno, del vetro e delle comunicazioni sul fiume Sož dopo enormi perdite demografiche.',
    note20: 'Dicembre 1947: consolidamento urbano e industriale dell\'Oblast\' di Gomel\' e piena adozione della riforma valutaria.',
  },
  SOV_ADM1_BLR_101_Vitebsk: {
    adm18: 'Vitebskij Oblispolkom — BSSR (URSS)',
    adm19: 'Vitebskij Oblispolkom — BSSR (URSS)',
    name18: 'Vitebsk (Daugava Occidentale — Ricostruzione Urbano-Industriale, 1945)',
    name19: 'Vitebsk (Corridoio Nord-Est BSSR & Tessile, 1947)',
    name20: 'Vitebsk (Ripresa sulla Dvina Occidentale, Dic. 1947)',
    note18: 'Settembre 1945: tra le città più devastate dell\'intera URSS (oltre il 90% di edifici distrutti), Vitebsk avvia il rientro degli sfollati e la ricostruzione delle manifatture tessili e ferroviarie.',
    note19: 'Settembre 1947: ripristino degli impianti industriali di Orša e Polock e normalizzazione dell\'agricoltura nella Bielorussia settentrionale.',
    note20: 'Dicembre 1947: completamento dei collegamenti ferroviari verso Smolensk e i Paesi Baltici alla chiusura del razionamento.',
  },
  SOV_ADM1_BLR_102_Mogilev: {
    adm18: 'Mogilëvskij Oblispolkom — BSSR (URSS)',
    adm19: 'Mogilëvskij Oblispolkom — BSSR (URSS)',
    name18: 'Mogilëv & Bobrujsk (Ricostruzione sull\'Alto Dnepr, 1945)',
    name19: 'Mogilëv & Bobrujsk (Fibre Artificiali & Industria Legno, 1947)',
    name20: 'Mogilëv (Oblast\' dell\'Alto Dnepr — BSSR, Dic. 1947)',
    note18: 'Settembre 1945: ricostruzione di Mogilëv e Bobrujsk lungo il bacino dell\'Alto Dnepr e della Berezina dopo le distruzioni dell\'Offensiva Bagration.',
    note19: 'Settembre 1947: ripresa dello storico stabilimento di seta artificiale di Mogilëv e delle segherie industriali di Bobrujsk.',
    note20: 'Dicembre 1947: avanzamento del Quarto Piano Quinquennale nella Bielorussia orientale.',
  },

  // === ASIA CENTRALE: POLIGONO SEMIPALATINSK, URANIO FERGANO-TAGIKO & COTONE ===
  SOV_ADM1_KAZ_136_East_Kazakhstan_Region: {
    adm18: 'Vostočno-Kazachstanskij & Semipalatinskij Oblispolkom — RSS Kazaka (URSS)',
    adm19: 'Vostočno-Kazachstanskij Oblispolkom & Poligono Nucleare n. 2 (RSS Kazaka)',
    name18: 'Ust\'-Kamenogorsk & Semipalatinsk (Metallurgia Non-Ferrosa Altai, 1945)',
    name19: 'Ust\'-Kamenogorsk & Semipalatinsk (Decreto Poligono Nucleare Ago. 1947)',
    name20: 'Ust\'-Kamenogorsk & Poligono Semipalatinsk (Cantiere Atomico, Dic. 1947)',
    note18: 'Settembre 1945: bacino estrattivo fondamentale di piombo, zinco, argento e metalli rari dell\'Altai minerario (Ust\'-Kamenogorsk, Leninogorsk) nel Kazakistan orientale.',
    note19: 'Settembre 1947: il 21 agosto 1947 il Consiglio dei Ministri dell\'URSS decreta la creazione del Poligono Nucleare di Semipalatinsk (Polygon-2 / Kurchatov) nelle steppe lungo l\'Irtyš.',
    note20: 'Dicembre 1947: ingegneri militari e operai costruiscono a marce forzate le infrastrutture segrete del Poligono di Semipalatinsk e l\'impianto metallurgico di Ulba.',
  },
  SOV_ADM1_KAZ_134_Karaganda_Region: {
    adm18: 'Karagandinskij Oblispolkom — RSS Kazaka (URSS)',
    adm19: 'Karagandinskij Oblispolkom — RSS Kazaka (URSS)',
    name18: 'Karaganda (Terzo Bacino Carbonifero dell\'URSS & Temirtau, 1945)',
    name19: 'Karaganda (Carbone, Acciaio Temirtau & Rame Žezkazgan, 1947)',
    name20: 'Karaganda (Cuore Industriale del Kazakistan Centrale, Dic. 1947)',
    note18: 'Settembre 1945: Karaganda produce carbone da coke essenziale per gli altiforni degli Urali, mentre l\'impianto siderurgico di Temirtau consolida i primi laminatoi kazaki.',
    note19: 'Settembre 1947: potenziamento del combinat cuprifero di Balchaš-Žezkazgan e impiego estensivo dei prigionieri e confinati speciali del sistema Karlag.',
    note20: 'Dicembre 1947: produzione record di carbone nella steppa centrale kazaka alla fine del secondo anno del Quarto Piano Quinquennale.',
  },
  SOV_ADM1_KAZ_145_Astana: {
    adm18: 'Akmolinskij Gorsovet — Kazakistan Settentrionale (RSS Kazaka / URSS)',
    adm19: 'Akmolinskij Gorsovet — Nodo Ferroviario della Steppa (RSS Kazaka)',
    name18: 'Akmolinsk (Snodo Ferroviario della Steppa Settentrionale, 1945)',
    name19: 'Akmolinsk (Macchine Agricole & Collegamento Karaganda-Urali, 1947)',
    name20: 'Akmolinsk (Centro Logistico della Steppa Kazaka, Dic. 1947)',
    note18: 'Settembre 1945: Akmolinsk ospita officine meccaniche evacuate da Melitopol\' (Kazachsel\'maš) e smista il traffico tra Siberia, Urali e Karaganda.',
    note19: 'Settembre 1947: espansione ferroviaria verso Kartaly e produzione di macchinari agricoli per i sovchoz della steppa settentrionale.',
    note20: 'Dicembre 1947: snodo strategico dell\'economia kazaka settentrionale in attesa della futura campagna delle Terre Vergini.',
  },
  SOV_ADM1_KAZ_143_Almaty: {
    adm18: 'Alma-Atinskij Gorsovet & SNK Kazachskoj SSR — Capitale RSS Kazaka',
    adm19: 'Alma-Atinskij Gorsovet & Sovet Ministrov Kazachskoj SSR — Capitale',
    name18: 'Alma-Ata (Capitale della RSS Kazaka — Smobilitazione & Cinema/Scienza, 1945)',
    name19: 'Alma-Ata (Accademia delle Scienze Kazaka & Industria, 1947)',
    name20: 'Alma-Ata (Capitale dell\'Asia Centrale Sovietica, Dic. 1947)',
    note18: 'Settembre 1945: molti istituti scientifici ed evocatori culturali evacuati rientrano a Mosca/Leningrado lasciando ad Alma-Ata solide fondazioni accademiche e di industria pesante.',
    note19: 'Settembre 1947: fondazione dell\'Accademia delle Scienze della RSS Kazaka (1946) sotto Kanyš Satpaev per coordinare lo sfruttamento minerario della repubblica.',
    note20: 'Dicembre 1947: adozione della riforma monetaria ad Alma-Ata e rafforzamento del confine centro-asiatico verso il Turkestan Orientale (Xinjiang).',
  },
  SOV_ADM1_UZB_159_Tashkent: {
    adm18: 'Taškentskij Gorsovet & SNK Uzbekskoj SSR — Capitale RSS Uzbeka',
    adm19: 'Taškentskij Gorsovet & Sovet Ministrov Uzbekskoj SSR — Capitale',
    name18: 'Taškent (Capitale RSS Uzbeka — Polo Aeronautico TAPOiČ, 1945)',
    name19: 'Taškent (Grande Metropoli Centroasiatica — Cotone & Aviazione, 1947)',
    name20: 'Taškent (Capitale Industriale dell\'Asia Centrale, Dic. 1947)',
    note18: 'Settembre 1945: Taškent conserva le grandi fabbriche evacuate nel 1941, fra cui lo stabilimento aeronautico Čkalov (Li-2) e i poli tessili e di macchine per la raccolta del cotone.',
    note19: 'Settembre 1947: epicentro logistico, accademico e militare del Distretto del Turkestan e motore della ricostruzione idroelettrica uzbeka.',
    note20: 'Dicembre 1947: riforma valutaria e cessazione del tesseramento alimentare nella maggiore metropoli dell\'Asia Centrale sovietica.',
  },
  SOV_ADM1_UZB_149_Republic_of_Karakalpakstan: {
    adm18: 'SNK Karakalpakskoj ASSR — RSS Uzbeka (URSS)',
    adm19: 'Sovet Ministrov Karakalpakskoj ASSR — RSS Uzbeka (URSS)',
    name18: 'Nukus (RSSA del Karakalpakstan — Basso Amudar\'ja & Aral, 1945)',
    name19: 'Nukus (RSSA del Karakalpakstan — Irrigazione & Cotonicoltura, 1947)',
    name20: 'Nukus (RSSA del Karakalpakstan — Delta dell\'Amudar\'ja, Dic. 1947)',
    note18: 'Settembre 1945: nella Repubblica Autonoma del Karakalpakstan il capoluogo Nukus consolida le strutture amministrative tra il delta dell\'Amudar\'ja e la pesca sul Lago d\'Aral.',
    note19: 'Settembre 1947: lavori sui canali di irrigazione del Basso Amudar\'ja per espandere la monocoltura cotoniera del Quarto Piano Quinquennale.',
    note20: 'Dicembre 1947: collegamento fluviale-ferroviario del Karakalpakstan e adozione delle misure economiche di fine 1947.',
  },
  SOV_ADM1_TJK_165_Sughd_Region: {
    adm18: 'Leninabadskij Oblispolkom — RSS Tagika (Tabošar / Čkalovsk Uranio, 1945)',
    adm19: 'Leninabadskij Oblispolkom — RSS Tagika (Kombinat n. 6 Uranio Atomico, 1947)',
    name18: 'Leninabad / Chujand (Miniere di Uranio Tabošar & Fergana Sud, 1945)',
    name19: 'Leninabad & Čkalovsk (Kombinat n. 6 — Prima Materia Fissile URSS, 1947)',
    name20: 'Leninabad & Čkalovsk (Fornitura Uranio al Progetto Atomico, Dic. 1947)',
    note18: 'Settembre 1945: l\'Oblast\' di Leninabad (Tagikistan settentrionale) ospita il Kombinat n. 6 (istituito maggio 1945), primo polo industriale sovietico di estrazione dell\'uranio a Tabošar e Adrasman.',
    note19: 'Settembre 1947: il minerale uranifero estratto nell\'area di Leninabad-Čkalovsk alimenta il reattore sperimentale F-1 di Kurčatov e la corsa all\'atomica sovietica.',
    note20: 'Dicembre 1947: espansione della città chiusa di Čkalovsk (Sotsgorod) nella valle occidentale del Fergana come retrovia nucleare dell\'URSS.',
  },
  SOV_ADM1_TJK_166_Gorno_Badakhshan_Autonomous_Region: {
    adm18: 'Oblispolkom GBAO — Pamir (RSS Tagika / URSS)',
    adm19: 'Oblispolkom GBAO — Pamir (RSS Tagika / URSS)',
    name18: 'Chorog (Oblast\' Autonoma del Gorno-Badachšan — Tetto del Pamir, 1945)',
    name19: 'Chorog (GBAO — Frontiera del Pamir verso Afghanistan & Cina, 1947)',
    name20: 'Chorog (GBAO — Presidio Alpino & Strada del Pamir, Dic. 1947)',
    note18: 'Settembre 1945: consolidamento della Strada del Pamir (Oš-Chorog) e delle postazioni di frontiera sovietiche al crocevia con Afghanistan e Kashmir/Xinjiang.',
    note19: 'Settembre 1947: integrazione scolastica ed energetica delle valli ad alta quota attorno a Chorog e al Lago Sarez.',
    note20: 'Dicembre 1947: controllo strategico dei passi dell\'Hindukush e del Pamir nello scenario post-spartizione del subcontinente indiano.',
  },
  SOV_ADM1_KGZ_173_Jalal_Abad_Region: {
    adm18: 'Džalal-Abadskij Oblispolkom — RSS Kirghisa (Uranio Mailuu-Suu, 1945)',
    adm19: 'Džalal-Abadskij Oblispolkom — RSS Kirghisa (Bacino Uranio Mailuu-Suu, 1947)',
    name18: 'Džalal-Abad (Fergana Orientale & Miniere Uranio Mailuu-Suu, 1945)',
    name19: 'Džalal-Abad (Estrazione Strategica Uranio & Carbone Kok-Jangak, 1947)',
    name20: 'Džalal-Abad (Polo Minerario Atomico nel Fergana Kirghiso, Dic. 1947)',
    note18: 'Settembre 1945: sviluppo accelerato delle miniere di uranio di Mailuu-Suu nella fascia pre-alpina del Fergana, integrate nel programma atomico di Berija.',
    note19: 'Settembre 1947: Mailuu-Suu diviene uno dei principali fornitori centroasiatici di minerale uranifero per l\'URSS accanto a carbone e cotone.',
    note20: 'Dicembre 1947: potenziamento degli impianti di arricchimento primario del minerale uranifero nella regione di Džalal-Abad.',
  },

  // === TRANSCAUCASIA: TURCHIA / IRAN / NERGAAGHT ===
  SOV_ADM1_AZE_129_Contiguous_Azerbaijan: {
    adm18: 'SNK Azerbajdžanskoj SSR — Baku (M.D. Bagirov) — URSS',
    adm19: 'Sovet Ministrov Azerbajdžanskoj SSR — Baku (M.D. Bagirov) — URSS',
    name18: 'Baku (RSS Azera — Petrolio del Caspio & Retrovia Iran Nord, 1945)',
    name19: 'Baku (RSS Azera — Piattaforme Offshore Caspio & Mingəçevir, 1947)',
    name20: 'Baku (RSS Azera — Espansione Petrolifera del Caspio, Dic. 1947)',
    note18: 'Settembre 1945: Baku coordina il sostegno politico di Mosca al movimento autonomista nell\'Azerbaigian iraniano (Tabriz) mentre riconverte i campi petroliferi della penisola di Abšeron.',
    note19: 'Settembre 1947: dopo il ritiro sovietico dall\'Iran settentrionale (1946), Baku concentra gli investimenti sulle trivellazioni offshore nel Mar Caspio e sul cantiere idroelettrico di Mingəçevir.',
    note20: 'Dicembre 1947: espansione delle prospezioni sottomarine attorno alle Pietre Nere (futuro Neft Daşları) e abolizione delle carte annonarie.',
  },
  SOV_ADM1_AZE_128_Nakhchivan_Autonomous_Republic: {
    adm18: 'SNK Nachičevanskoj ASSR — RSS Azera (URSS)',
    adm19: 'Sovet Ministrov Nachičevanskoj ASSR — RSS Azera (URSS)',
    name18: 'Nachičevan\' (RSSA del Nachičevan\' — Confine Iran-Turchia, 1945)',
    name19: 'Nachičevan\' (RSSA del Nachičevan\' — Frontiera Arasse, 1947)',
    name20: 'Nachičevan\' (RSSA del Nachičevan\' — Salgemma & Confine Sud, Dic. 1947)',
    note18: 'Settembre 1945: exclave sovietica lungo il fiume Arasse e nodo di transito ferroviario verso l\'Azerbaigian iraniano occupato fino alla primavera 1946.',
    note19: 'Settembre 1947: rafforzamento delle difese confinarie lungo l\'Arasse verso Turchia e Iran nell\'incipiente Guerra Fredda.',
    note20: 'Dicembre 1947: estrazione mineraria di salgemma, frutticoltura irrigua e chiusura dei varchi di frontiera meridionali.',
  },
  SOV_ADM1_ARM_126_Yerevan: {
    adm18: 'Erevanskij Gorsovet & SNK Armjanskoj SSR — Capitale RSS Armena',
    adm19: 'Erevanskij Gorsovet & Sovet Ministrov Armjanskoj SSR — Nergaght 1947',
    name18: 'Erevan (Capitale RSS Armena — Industria & Rivendicazioni Kars, 1945)',
    name19: 'Erevan (Campagna Rimpatrio Diaspora Nergaght 1946-47, 1947)',
    name20: 'Erevan (Metropoli Industriale & Accoglienza Rimpatriati, Dic. 1947)',
    note18: 'Settembre 1945: l\'Armenia sovietica sostiene la campagna diplomatica di Mosca per la restituzione delle province turche di Kars e Ardahan e avvia il rilancio chimico-energetico.',
    note19: 'Settembre 1947: culmine del Grande Rimpatrio (Nergaght, 1946-1948): decine di migliaia di armeni provenienti da Siria, Libano, Grecia ed Egitto si stabiliscono a Erevan e nei sobborghi.',
    note20: 'Dicembre 1947: mentre le pressioni territoriali su Ankara si arrestano sotto la Dottrina Truman, Erevan integra i nuovi arrivati e adotta la riforma monetaria di fine anno.',
  },
  SOV_ADM1_GEO_108_Tbilisi: {
    adm18: 'Tbilisskij Gorsovet & SNK Gruzinskoj SSR (K. Čarkviani) — URSS',
    adm19: 'Tbilisskij Gorsovet & Sovet Ministrov Gruzinskoj SSR — URSS',
    name18: 'Tbilisi (Capitale della RSS Georgiana — Postbellico Caucasico, 1945)',
    name19: 'Tbilisi (Acciaieria di Rustavi & Industria Caucasica, 1947)',
    name20: 'Tbilisi (Centro Politico-Industriale della Transcaucasia, Dic. 1947)',
    note18: 'Settembre 1945: Tbilisi guida la ricostruzione della RSS Georgiana e sostiene le rivendicazioni diplomatiche sul confine turco nord-orientale insieme alle élite caucasiche vicine a Berija.',
    note19: 'Settembre 1947: avanzamento del grande cantiere siderurgico di Rustavi alle porte della capitale e ampliamento degli impianti aeronautici e ferroviari di Tbilisi.',
    note20: 'Dicembre 1947: stabilizzazione economica della capitale georgiana e adozione della riforma del rublo e fine del tesseramento.',
  },
  SOV_ADM1_GEO_111_Adjara: {
    adm18: 'SNK Adžarskoj ASSR — Batumi (RSS Georgiana / URSS)',
    adm19: 'Sovet Ministrov Adžarskoj ASSR — Batumi (RSS Georgiana / URSS)',
    name18: 'Batumi (RSSA d\'Agiaria — Porto Petrolifero & Confine Turco, 1945)',
    name19: 'Batumi (RSSA d\'Agiaria — Presidio Confine Mar Nero / Turchia, 1947)',
    name20: 'Batumi (RSSA d\'Agiaria — Frontiera Guerra Fredda sul Mar Nero, Dic. 1947)',
    note18: 'Settembre 1945: terminale petrolifero del Caucaso meridionale e base militare sul confine con la Turchia durante la crisi delle rivendicazioni sovietiche su Ardahan e Artvin.',
    note19: 'Settembre 1947: rafforzamento delle guarnigioni confinarie sovietiche a Batumi in risposta alla Dottrina Truman a sostegno della Turchia.',
    note20: 'Dicembre 1947: pieno controllo militare-marittimo della costa dell\'Agiaria sul Mar Nero sud-orientale.',
  },
  SOV_ADM1_GEO_105_Abkhazia: {
    adm18: 'SNK Abchazskoj ASSR — Suchumi (RSS Georgiana / URSS)',
    adm19: 'Sovet Ministrov Abchazskoj ASSR — Suchumi (RSS Georgiana / URSS)',
    name18: 'Suchumi (RSSA d\'Abcasia — Ricostruzione & Sanatori Mar Nero, 1945)',
    name19: 'Suchumi (RSSA d\'Abcasia — Programma Nucleare Sinop / Agudzeri, 1947)',
    name20: 'Suchumi (RSSA d\'Abcasia — Ricerca Fisica & Agrumi, Dic. 1947)',
    note18: 'Settembre 1945: l\'Abcasia riconverte gli ospedali militari del Mar Nero in sanatori statali e riorganizza il settore del tabacco e degli agrumi.',
    note19: 'Settembre 1947: negli istituti segreti di Sinop e Agudzeri presso Suchumi fisici tedeschi (Manfred von Ardenne, Gustav Hertz) lavorano al processo di separazione isotopica per l\'atomica sovietica.',
    note20: 'Dicembre 1947: continuazione delle ricerche fisiche classificate sulla costa di Suchumi e integrazione economica della RSSA Abcasa.',
  },
};

// Profili tematici concisi e specifici per ciascuna delle restanti province (1945-1947)
interface ProvinceShortProfile {
  theme: string;
  famine46_47?: boolean;
  pre1954?: string;
}

const REGION_PROFILES: Record<string, ProvinceShortProfile> = {
  // === RSFSR RESTO ===
  SOV_ADM1_RUS_1_Altai_Krai: { theme: 'grandi sovchoz cerealicoli della Siberia sud-occidentale e industrie meccaniche di Barnaul-Rubcovsk (trattori ATZ evacuati)' },
  SOV_ADM1_RUS_2_Republic_of_Mordovia: { theme: 'distretto agricolo e forestale della RSSA Mordvina tra Saransk e il bacino del Sura, con potenziamento ferroviario' },
  SOV_ADM1_RUS_3_Tula_Oblast: { theme: 'arsenali d\'armi di Tula, bacino lignitifero di Mosca-Sud e riconversione chimica di Stalinogorsk (Novomoskovsk)' },
  SOV_ADM1_RUS_4_Kurgan_Oblast: { theme: 'nuova Oblast\' transuralica (istituita nel 1943) con fabbriche meccaniche evacuate, zootecnia e nodo ferroviario Transiberiano' },
  SOV_ADM1_RUS_6_Khanty_Mansiysk_Autonomous_Okrug___Ugra: { theme: 'Okrug Nazionale dei Chanty-Mansi (Oblast\' di Tjumen\' dal 1944): legname della taiga dell\'Ob\', pesca artica e pellicce' },
  SOV_ADM1_RUS_7_Kirov_Oblast: { theme: 'industria forestale, concimi fosfatici della Vjatka e stabilimenti meccanici evacuati nella Russia nord-orientale' },
  SOV_ADM1_RUS_8_Komi_Republic: { theme: 'RSSA dei Komi: estrazione carbonifera vitale del bacino della Pečora (Vorkuta e Inta) e petrolio di Uchta collegati via ferrovia al Nord-Ovest' },
  SOV_ADM1_RUS_9_Kostroma_Oblast: { theme: 'nuova Oblast\' di Kostroma (dal 1944) sull\'Alto Volga: industria del lino, legname da flottazione e cantieri fluviali' },
  SOV_ADM1_RUS_11_Zabaykalsky_Krai: { theme: 'Oblast\' di Čita: retrovia dell\'offensiva in Manciuria (1945), miniere d\'oro/stagno di Balej e snodo della Ferrovia Transbaikalica verso la Cina' },
  SOV_ADM1_RUS_14_Irkutsk_Oblast: { theme: 'polo industriale ed energetico attorno al Lago Baikal, bacino carbonifero di Čeremchovo e industria aeronautica di Irkutsk' },
  SOV_ADM1_RUS_16_Pskov_Oblast: { theme: 'Oblast\' di Pskov (costituita agosto 1944): ricostruzione delle città rase al suolo, sminamento della Linea Panther e coltivazione del lino' },
  SOV_ADM1_RUS_17_Rostov_Oblast: { theme: 'Rostov sul Don, Taganrog e bacino del Donbass orientale: ricostruzione di Rostsel\'maš e ricostruzione portuaria sul Mar d\'Azov', famine46_47: true },
  SOV_ADM1_RUS_18_Ryazan_Oblast: { theme: 'polo agricolo e torbiero dell\'Oka lungo la direttrice Mosca-Sud-Est, con cantieri ferroviari e industrie leggere a Rjazan\'' },
  SOV_ADM1_RUS_19_Adygea: { theme: 'Oblast\' Autonoma Adighea (Krai di Krasnodar): recupero dei campi agricoli del Kuban\', tabacco e industria del legno pedemontana a Majkop' },
  SOV_ADM1_RUS_21_Khakassia: { theme: 'Oblast\' Autonoma di Chakassia (Krai di Krasnojarsk): estrazione carbonifera di Černogorsk, oro e silvicoltura dell\'Alto Enisej' },
  SOV_ADM1_RUS_22_Tambov_Oblast: { theme: 'Terre Nere centrali, industria chimica di Kotovsk e ricostruzione meccanica a Tambov e Mičurinsk', famine46_47: true },
  SOV_ADM1_RUS_26_Arkhangelsk_Oblast: { theme: 'porto strategico sul Mar Bianco, chiusura dei convogli artici alleati (1945), cantieri navali Molotovsk (Severodvinsk) e legname del Nord' },
  SOV_ADM1_RUS_27_Astrakhan_Oblast: { theme: 'nuova Oblast\' di Astrachan\' (1943, ampliata coi distretti calmucche): flotta peschereccia del Caspio, traffico petrolifero fluviale e saline di Baskunčak' },
  SOV_ADM1_RUS_29_Bryansk_Oblast: { theme: 'nuova Oblast\' di Brjansk (luglio 1944): riedificazione di Bežica/Brjansk e delle grandi officine di locomotive e vagoni dopo l\'occupazione' },
  SOV_ADM1_RUS_30_Buryatia: { theme: 'RSSA Buriato-Mongola: stabilimento aeronautico e riparazioni ferroviarie di Ulan-Udė lungo la Transiberiana verso la Mongolia' },
  SOV_ADM1_RUS_33_Chuvashia: { theme: 'RSSA Ciuvascia: nodo ferroviario tra Mosca e il Volga, officine elettrotecniche di Čeboksary e risorse forestali del Sura' },
  SOV_ADM1_RUS_34_Tyumen_Oblast: { theme: 'nuova Oblast\' di Tjumen\' (agosto 1944): cantieri navali sul Tura, legname della Siberia occidentale e prime ricerche geologiche del bacino Ob\'-Irtyš' },
  SOV_ADM1_RUS_35_North_Ossetia_Alania: { theme: 'RSSA dell\'Ossezia Settentrionale (Ordžonikidze/Dzaudžikau fino al 1954): metallurgia dello zinco/piombo (Elektrocink) e passo strategico di Darial' },
  SOV_ADM1_RUS_36_Penza_Oblast: { theme: 'fabbriche meccaniche e orologiere evacuate a Penza e bacino cerealicolo del medio Sura' },
  SOV_ADM1_RUS_37_Amur_Oblast: { theme: 'settore di Blagoveščensk sull\'Amur (Krai di Chabarovsk fino al 1948): rifornimenti verso la Manciuria, oro dell\'Aldan-Zeya e ferrovia dell\'Estremo Oriente' },
  SOV_ADM1_RUS_39_Krasnodar_Krai: { theme: 'granaio meridionale del Kuban\', porto di Novorossijsk e pozzi petroliferi di Majkop-Neftegorsk in ricostruzione postbellica', famine46_47: true },
  SOV_ADM1_RUS_40_Kursk_Oblast: { theme: 'campi del Saliente di Kursk sminati, ricostruzione rurale e zuccherifici nelle Terre Nere centrali', famine46_47: true },
  SOV_ADM1_RUS_41_Mari_El: { theme: 'RSSA dei Mari: sfruttamento forestale lungo l\'Alto Volga, industria della cellulosa (Volžsk) e stabilimenti ottici di Joškar-Ola' },
  SOV_ADM1_RUS_44_Nenets_Autonomous_Okrug: { theme: 'Okrug Nazionale dei Nenec (Oblast\' di Arcangelo): allevamento di renne nella tundra artica, porti di Nar\'jan-Mar e caccia marittima nel Mare di Barents' },
  SOV_ADM1_RUS_45_Novgorod_Oblast: { theme: 'nuova Oblast\' di Novgorod (luglio 1944): ricostruzione integrale dei monumenti e delle infrastrutture distrutte attorno al Lago Il\'men\'' },
  SOV_ADM1_RUS_46_Novosibirsk_Oblast: { theme: 'metropoli scientifica e industriale della Siberia occidentale: officine Čkalov (aviazione), Sibsel\'maš e snodo ferroviario sull\'Ob\'' },
  SOV_ADM1_RUS_47_Omsk_Oblast: { theme: 'polo chimico-industriale di Omsk sull\'Irtyš: officine di motori aeronautici Baranov, carri armati e grande raffinazione siberiana' },
  SOV_ADM1_RUS_48_Oryol_Oblast: { theme: 'ricostruzione della città distrutta di Orël, sminamento agricolo e ripristino dell\'asse ferroviario Mosca-Char\'kov', famine46_47: true },
  SOV_ADM1_RUS_51_Sakha_Republic: { theme: 'RSSA Jakuta: estrazione aurifera dell\'Aldan, legname siberiano e rotta aerea artica/fluviale lungo la Lena (ALSIB smobilitata 1945)' },
  SOV_ADM1_RUS_53_Smolensk_Oblast: { theme: 'baluardo occidentale della RSFSR sul Dnepr: sgombero delle rovine di Smolensk e Vjaz\'ma e ripresa agricola del lino' },
  SOV_ADM1_RUS_54_Stavropol_Krai: { theme: 'granaio ciscaucasico del Krai di Stavropol\' (ex Ordžonikidzevskij), pastorizia della steppa e stazioni termali delle Acque Minerali del Caucaso', famine46_47: true },
  SOV_ADM1_RUS_56_Tver_Oblast: { theme: 'Oblast\' di Kalinin (Tver\'): ricostruzione dell\'asse ferroviario Mosca-Leningrado, filature tessili e centrali sul bacino di Ivankovo-Rybinsk' },
  SOV_ADM1_RUS_57_Udmurtia: { theme: 'RSSA Udmurta: arsenali di Iževsk (produzione armi leggere e avvio della serie AK-47 nel 1947!) e acciaierie della Kama' },
  SOV_ADM1_RUS_58_Kaluga_Oblast: { theme: 'nuova Oblast\' di Kaluga (luglio 1944): ricostruzione delle vie ferrate verso Brjansk e avvio delle ricerche energetiche a Obninsk (dal 1946)' },
  SOV_ADM1_RUS_61_Ulyanovsk_Oblast: { theme: 'Oblast\' di Ul\'janovsk (dal 1943): stabilimento automobilistico UAZ evacuato da Mosca sul Volga e industria tessile' },
  SOV_ADM1_RUS_62_Vladimir_Oblast: { theme: 'nuova Oblast\' di Vladimir (agosto 1944): fabbrica di trattori VTZ, armamenti di Kovrov e distretto tessile sull\'alto Kljaz\'ma' },
  SOV_ADM1_RUS_63_Vologda_Oblast: { theme: 'industria casearia, forestale e ferroviaria del Nord europeo, con progettazione del grande impianto metallurgico di Čerepovec (1947)' },
  SOV_ADM1_RUS_64_Yaroslavl_Oblast: { theme: 'gomma sintetica, pneumatici e motori diesel di Jaroslavl\' insieme all\'idroelettrico di Rybinsk sull\'Alto Volga' },
  SOV_ADM1_RUS_65_Voronezh_Oblast: { theme: 'ricostruzione completa di Voronež semidistrutta sul fronte del Don, fabbrica aerea n. 64 e Terre Nere centrali', famine46_47: true },
  SOV_ADM1_RUS_66_Yamalo_Nenets_Autonomous_Okrug: { theme: 'Okrug Nazionale Jamalo-Nenec (Oblast\' di Tjumen\' dal 1944): tundra artica di Salechard, pesca nell\'estuario dell\'Ob\' e rotta polare' },
  SOV_ADM1_RUS_67_Altai_Republic: { theme: 'Oblast\' Autonoma di Ojrotia (dal 1948 Gorno-Altaj) nel Krai dell\'Altaj: allevamento alpino sulla Čuja e collegamento verso la Mongolia' },
  SOV_ADM1_RUS_68_Ivanovo_Oblast: { theme: 'storica "città dei tessuti" della RSFSR: filature e cotonerie a sostegno della ricostruzione civile sovietica' },
  SOV_ADM1_RUS_69_Jewish_Autonomous_Oblast: { theme: 'Oblast\' Autonoma Ebraica di Birobidžan (Krai di Chabarovsk): ultima ondata migratoria ebraica del 1946-47, industria leggera e agricoltura lungo l\'Amur' },
  SOV_ADM1_RUS_71_Kamchatka_Krai: { theme: 'Oblast\' della Kamčatka (nel Krai di Chabarovsk): porto peschereccio e base navale del Pacifico a Petropavlovsk, logistica per le Isole Curili' },
  SOV_ADM1_RUS_74_Khabarovsk_Krai: { theme: 'capitale politico-militare dell\'Estremo Oriente sovietico: cantiere navale dell\'Amur a Komsomol\'sk, aviazione e direzione amministrativa su Amur/Kolyma' },
  SOV_ADM1_RUS_75_Chukotka_Autonomous_Okrug: { theme: 'Okrug Nazionale della Čukotka (Krai di Chabarovsk / Dal\'stroj fino al 1953): miniere di stagno e oro artico a Pevek e guardia sullo Stretto di Bering' },
  SOV_ADM1_RUS_76_Dagestan: { theme: 'RSSA del Daghestan: porto caspian di Machačkala, petrolio costiero, idroelettrico caucasico e frutticoltura montana' },
  SOV_ADM1_RUS_77_Orenburg_Oblast: { theme: 'Oblast\' di Čkalov (1938-1957): siderurgia di Orsk-Chalilovo, raffinazione petrolifera e steppe granarie degli Urali meridionali' },
  SOV_ADM1_RUS_78_Primorsky_Krai: { theme: 'Vladivostok e bacino dell\'Ussuri: base principale della Flotta del Pacifico, ritorno dalle operazioni in Manciuria/Corea (1945-47) e porti pescherecci' },

  // === RSFSR NORD-OVEST, CARELIA & PENISOLA DI KOLA (45 entità SOV_NW_RUS_*) ===
  SOV_NW_RUS_256_Kaarosta_District: { theme: 'Lomonosov (Oranienbaum fino al 1948): ricostruzione dei palazzi sul Golfo di Finlandia e supporto alla base navale di Kronštadt' },
  SOV_NW_RUS_257_Mujej_rvi_District: { theme: 'distretto forestale della Karelo-Finskaja SSR lungo la frontiera occidentale: taglio del legname e riparazione ferroviaria' },
  SOV_NW_RUS_258_Tusina_District: { theme: 'Tosno (Oblast\' di Leningrado): sminamento e riedificazione totale delle località rase al suolo lungo la ferrovia Mosca-Leningrado' },
  SOV_NW_RUS_260_Slantsevsky_District: { theme: 'Slancy (Oblast\' di Leningrado): riattivazione delle miniere di scisti bituminosi per fornire gas illuminante e combustibile a Leningrado' },
  SOV_NW_RUS_261_Petroskoi_District: { theme: 'Petrozavodsk, capitale della RSS Carelo-Finlandese (O.V. Kuusinen): ricostruzione della città sul Lago Onega, officine Onego e governo repubblicano' },
  SOV_NW_RUS_263_Gatchinsky_District: { theme: 'Gatčina (ribattezzata da Krasnogvardejsk nel 1944, Oblast\' di Leningrado): sgombero bellico, restauro del palazzo e snodo ferroviario verso il Baltico' },
  SOV_NW_RUS_264_Kuola_District: { theme: 'distretto di Kola (Oblast\' di Murmansk): protezione dell\'arteria ferroviaria di Murmansk e retrovia portuale artica nel dopoguerra' },
  SOV_NW_RUS_265___nisenranta_District: { theme: 'distretto Prionežskij (RSS Carelo-Finlandese): cava di quarzite/diabase di Šokša per la ricostruzione monumentale di Mosca e Leningrado' },
  SOV_NW_RUS_266_________________: { theme: 'Vajenga (futura Severomorsk dal 1951): cantiere di espansione a base principale strategica della Flotta del Nord sul Fiordo di Kola' },
  SOV_NW_RUS_267_Koskenala_District: { theme: 'Podporož\'e (Oblast\' di Leningrado): ripristino degli sbarramenti dell\'Alto Svir\' e avvio del cantiere per la centrale idroelettrica Verchne-Svirskaja' },
  SOV_NW_RUS_268_Turja_District: { theme: 'distretto Terskij (Oblast\' di Murmansk): villaggi costieri Pomory sul Mar Bianco, pesca e taglio forestale artico' },
  SOV_NW_RUS_269_Kemsky_District: { theme: 'Kem\' (RSS Carelo-Finlandese): scalo ferroviario e portuale sul Mar Bianco per il trasporto di legname e collegamento alle Isole Solovki' },
  SOV_NW_RUS_271_Vsevolozhsky_District: { theme: 'Vsevoložsk (Oblast\' di Leningrado): riorganizzazione postbellica dell\'Ingria settentrionale lungo la ex "Strada della Vita" verso il Lago Ladoga' },
  SOV_NW_RUS_272_Sosnovy_Bor: { theme: 'Golfo di Kopor\'e (Oblast\' di Leningrado): villaggi costieri e bonifica militare lungo la baia di Lužskaja dopo il blocco di Oranienbaum' },
  SOV_NW_RUS_273_______________: { theme: 'Jokanga / Gremicha (Oblast\' di Murmansk): stazione navale avanzata della Flotta del Nord lungo la costa orientale di Murman sul Mare di Barents' },
  SOV_NW_RUS_275_Olenegorsk: { theme: 'Olenegorsk (stazione Olen\'ja, Oblast\' di Murmansk): avvio delle ricerche e dei cantieri minerari ferrosi (1946-47) per rifornire la futura siderurgia del Nord-Ovest' },
  SOV_NW_RUS_276_Puutoisten_District: { theme: 'Pudož (RSS Carelo-Finlandese): bacino forestale e di flottazione sulla sponda orientale del Lago Onega' },
  SOV_NW_RUS_277_Aunus_District: { theme: 'Olonec (RSS Carelo-Finlandese): ricostruzione delle fattorie della pianura agricola dell\'Aunus tra il Lago Ladoga e il basso Svir\'' },
  SOV_NW_RUS_278_Kalevala_District: { theme: 'Uchta / Kalevala (RSS Carelo-Finlandese): ripopolamento e industria boschiva nella Carelia settentrionale lungo il confine finlandese' },
  SOV_NW_RUS_279_Kontupohja_District: { theme: 'Kondopoga (RSS Carelo-Finlandese): ricostruzione prioritaria della grande cartiera e centrale idroelettrica sul Lago Onega' },
  SOV_NW_RUS_280_Korotka_District: { theme: 'Mga / Šlissel\'burg (Petrokreposť dal 1944, Oblast\' di Leningrado): sminamento del corridoio vitale sulla Neva e ricostruzione della cittadina-fortezza' },
  SOV_NW_RUS_281_Kostamus_City_District: { theme: 'area mineraria di Kostomukša (RSS Carelo-Finlandese): prime prospezioni geologiche dei giacimenti ferrosi nella taiga di frontiera (1946)' },
  SOV_NW_RUS_284_Louhi_District: { theme: 'Louhi (RSS Carelo-Finlandese): snodo lungo la ferrovia Kirov-Murmansk, legname di Kestenga ed estrazione di mica e feldspati' },
  SOV_NW_RUS_285_Medvezhyegorsky_District: { theme: 'Medvež\'egorsk (RSS Carelo-Finlandese): ripristino delle chiuse danneggiate sul Canale Mar Bianco-Baltico (riapertura 1946)' },
  SOV_NW_RUS_286_Olhava_District: { theme: 'Volchov (Oblast\' di Leningrado): ripristino pieno delle turbine della centrale VolchovGES e dell\'impianto dell\'alluminio (VAZ)' },
  SOV_NW_RUS_287_Pr__s__District: { theme: 'Prjaža (RSS Carelo-Finlandese): industria forestale e allevamenti della regione lacustre a sud-ovest di Petrozavodsk' },
  SOV_NW_RUS_288_Sorokka_District: { theme: 'Belomorsk (RSS Carelo-Finlandese): ex capitale bellica provvisoria della Carelia (1941-44) e terminale marittimo del ripristinato Canale Mar Bianco-Baltico' },
  SOV_NW_RUS_291_Tihvin__District: { theme: 'Tichvin (Oblast\' di Leningrado): ricostruzione dello storico nodo ferroviario che salvò Leningrado e sviluppo estrattivo-forestale' },
  SOV_NW_RUS_292_Vidyayevo: { theme: 'baia di Ura-Guba (Oblast\' di Murmansk): fiordo della penisola di Kola sotto presidio marittimo della Flotta del Nord nel dopoguerra artico' },
  SOV_NW_RUS_293_Volosovsky_District: { theme: 'Volosovo (Oblast\' di Leningrado): bonifica dell\'altopiano di Ižora e ripresa lattiero-casearia per i mercati di Leningrado' },
  SOV_NW_RUS_294________________________: { theme: 'settore di Apatity (Oblast\' di Murmansk): espansione della ferrovia e dei centri minerari ai piedi dei monti Chibiny' },
  SOV_NW_RUS_295___________________________: { theme: 'Mončegorsk (Oblast\' di Murmansk): riavvio a pieno regime del grande complesso estrattivo-metallurgico Severonikel\' per la produzione di nichel e rame artico' },
  SOV_NW_RUS_297_Murmansk: { theme: 'Murmansk (Oblast\' di Murmansk): ricostruzione integrale del porto artico devastato dai bombardamenti e base della Flotta peschereccia del Nord' },
  SOV_NW_RUS_298_Segezhsky_District: { theme: 'Segeža (RSS Carelo-Finlandese): ricostruzione e ampliamento della grande fabbrica di cellulosa e sacchi di carta lungo il Lago Vygozero' },
  SOV_NW_RUS_299_Polyarnye_Zori_Urban_Okrug: { theme: 'cascate della Niva (Oblast\' di Murmansk): riattivazione delle centrali idroelettriche Niva-2 e avvio di Niva-3 per alimentare l\'industria di Kola' },
  SOV_NW_RUS_300_Alexandrovsk__Murmansk_Oblast: { theme: 'Poljarnyj / Aleksandrovsk (Oblast\' di Murmansk): quartier generale operativo dei sommergibili e delle navi di superficie della Flotta del Nord' },
  SOV_NW_RUS_301_Boksitogorsky_District: { theme: 'Boksitogorsk (Oblast\' di Leningrado): ripresa dell\'estrazione di bauxite tichviniana per la produzione di allumina strategica' },
  SOV_NW_RUS_302_Lotinapelto_District: { theme: 'Lodejnoe Pole (Oblast\' di Leningrado): ricostruzione della centrale idroelettrica Nižne-Svirskaja e della linea ferroviaria di Murmansk sul fiume Svir\'' },
  SOV_NW_RUS_303________________________: { theme: 'Kirovsk (Monti Chibiny, Oblast\' di Murmansk): combinat Apatit in piena ripresa per garantire fosfati ai fertilizzanti dell\'intera agricoltura sovietica' },
  SOV_NW_RUS_304_Kirishsky_District: { theme: 'Kiriši (Oblast\' di Leningrado): bonifica della testa di ponte sul fiume Volchov e riedificazione rurale tra Mga e Čudovo' },
  SOV_NW_RUS_305_Luuj_rvi_District: { theme: 'Lovozero (Oblast\' di Murmansk): tundra interna di Kola dedicata all\'allevamento di renne dei Sami e alle prospezioni di terre rare (loparite)' },
  SOV_NW_RUS_306_Jaama_District: { theme: 'Kingisepp (Oblast\' di Leningrado): ricostruzione lungo il fiume Luga e retrovia diretta del confine con la RSS Estone lungo la ferrovia baltica' },
  SOV_NW_RUS_307_Luzhsky_District: { theme: 'Luga (Oblast\' di Leningrado): sminamento delle linee difensive lungo la M20 e ripristino dell\'agricoltura e dell\'industria leggera' },
  SOV_NW_RUS_308_Kantalahti_District: { theme: 'Kandalakša (Oblast\' di Murmansk): snodo ferroviario vitale per Kola sul Mar Bianco e preparazione dell\'impianto per alluminio di Kandalakša' },
  SOV_NW_RUS_309_Kovdor_District: { theme: 'bacino di Kovdor (Oblast\' di Murmansk): avvio dello sfruttamento di mica flogopite e preparazione mineraria di ferro/magnetite al confine finlandese' },

  // === UCRAINA RESTO (38 entità totali; 12 già dettagliate sopra, 26 qui incluse le 17 ex-Transnistria di Odessa) ===
  SOV_ADM1_UKR_80_Kherson_Oblast: { theme: 'nuova Oblast\' di Cherson (marzo 1944): ricostruzione dei cantieri navali fluviali, dei porti di Skadovsk-Cherson e dell\'agricoltura steppica', famine46_47: true },
  SOV_ADM1_UKR_81_Zhytomyr_Oblast: { theme: 'Oblast\' di Žitomir: ricostruzione postbellica della Volinia orientale, cave di granito, zuccherifici e azioni contro sacche residue UPA' },
  SOV_ADM1_UKR_83_Chernihiv_Oblast: { theme: 'Oblast\' di Černigov (Desna): ricostruzione di fabbriche di strumenti e tessuti in città e ripresa agricola della Polesia ucraina' },
  SOV_ADM1_UKR_84_Sumy_Oblast: { theme: 'Oblast\' di Sumy: ripristino dell\'industria chimica, meccanica (compressori) e del principale distretto bieticolo-zuccheriero nord-orientale' },
  SOV_ADM1_UKR_90_Mykolaiv_Oblast: { theme: 'Oblast\' di Nikolaev: riattivazione dei grandi cantieri navali sul Bug Meridionale per la Flotta del Mar Nero e la flotta mercantile', famine46_47: true },
  SOV_ADM1_UKR_92_Vinnytsia_Oblast: { theme: 'Oblast\' di Vinnica: ripresa dei grandi zuccherifici della Podolia, delle stazioni ferroviarie e stabilizzazione alimentare dopo la siccità', famine46_47: true },
  SOV_ADM1_UKR_93_Khmelnytskyi_Oblast: { theme: 'Oblast\' di Kamenec-Podol\'skij (futura Chmel\'nickij dal 1954): Podolia occidentale, ripristino ferroviario sul Dnestr e lotta contro formazioni clandestine nazionaliste' },
  SOV_ADM1_UKR_95_Poltava_Oblast: { theme: 'Oblast\' di Poltava: riedificazione di Poltava e Kremenčug, ripristino dell\'asse Kiev-Char\'kov e ripresa cerealicola della riva sinistra', famine46_47: true },
  SOV_ADM1_UKR_97_Kirovohrad_Oblast: { theme: 'Oblast\' di Kirovograd: ricostruzione della fabbrica di macchine agricole Červona Zirka e delle steppe cerealicole tra Dnepr e Bug', famine46_47: true },
  SOV_ADM1_UKR_178_Savran: { theme: 'distretto di Savran\' (Oblast\' di Odessa): valle del Bug Meridionale, ricostruzione rurale post-Transnistria e crisi alimentare 1946-47', famine46_47: true },
  SOV_ADM1_UKR_179_Balta: { theme: 'distretto di Balta (Oblast\' di Odessa): ex capitale della RSSA Moldava storica, nodo ferroviario e ripresa agro-alimentare', famine46_47: true },
  SOV_ADM1_UKR_180_Kodyma: { theme: 'distretto di Kodyma (Oblast\' di Odessa): fascia confinaria con la RSS Moldava, snodo ferroviario verso Podolia e Balta', famine46_47: true },
  SOV_ADM1_UKR_181_Liubashhivka: { theme: 'distretto di Ljubašivka (Oblast\' di Odessa): steppa settentrionale di Odessa lungo la direttrice Pervomajsk-Anan\'ïv', famine46_47: true },
  SOV_ADM1_UKR_182_Podilsk: { theme: 'distretto di Kotovsk (Podil\'s\'k, Oblast\' di Odessa): principale nodo ferroviario dell\'entroterra nord-occidentale di Odessa sulla linea Kiev-Odessa', famine46_47: true },
  SOV_ADM1_UKR_183_Ananiv: { theme: 'distretto di Anan\'ïv (Oblast\' di Odessa): ripristino dei kolchoz della valle del Tylihul nella steppa nord-odessita', famine46_47: true },
  SOV_ADM1_UKR_184_Okny: { theme: 'distretto di Krasnye Okny (Oblast\' di Odessa): settore occidentale confinante con la RSS Moldava sul versante del Dnestr', famine46_47: true },
  SOV_ADM1_UKR_185_Zakharivka: { theme: 'distretto di Frunzivka (Zacharivka, Oblast\' di Odessa): riorganizzazione cerealicola delle steppe tra Dnestr e Kučurhan', famine46_47: true },
  SOV_ADM1_UKR_186_Mykolaivka: { theme: 'distretto di Nikolaevka (Oblast\' di Odessa): ripristino della viabilità agricola nel bacino interno di Čyčyklija', famine46_47: true },
  SOV_ADM1_UKR_187_Shyriaieve: { theme: 'distretto di Šyrjaeve (Oblast\' di Odessa): bacino rurale del Velykyj Kujal\'nyk in ripresa dopo le devastazioni belliche', famine46_47: true },
  SOV_ADM1_UKR_188_Berezivka: { theme: 'distretto di Berezivka (Oblast\' di Odessa): pianura di steppe lungo il basso Tylihul e rifornimento alimentare di Odessa', famine46_47: true },
  SOV_ADM1_UKR_189_Velyks_Mykhailivka: { theme: 'distretto di Velyka Mychajlivka (Oblast\' di Odessa): corridoio agricolo al confine con la riva sinistra del Dnestr', famine46_47: true },
  SOV_ADM1_UKR_190_Ivanivka: { theme: 'distretto di Ivanivka (Oblast\' di Odessa): entroterra rurale settentrionale della laguna di Hadžibej-Kujal\'nyk', famine46_47: true },
  SOV_ADM1_UKR_191_Lyman: { theme: 'distretto Kominternovskij (Lyman, Oblast\' di Odessa): fascia costiera nord-orientale e difese marittime verso Ochakov', famine46_47: true },
  SOV_ADM1_UKR_192_Rozdilna: { theme: 'distretto di Rozdil\'na (Oblast\' di Odessa): giunzione ferroviaria vitale tra la linea per Kišinëv/Tiraspol\' e il porto di Odessa', famine46_47: true },
  SOV_ADM1_UKR_193_Biliaivka: { theme: 'distretto di Biljaïvka (Oblast\' di Odessa): stazione di captazione idrica sul basso Dnestr fondamentale per l\'approvvigionamento di Odessa', famine46_47: true },
  SOV_ADM1_UKR_194_Ovidiopol: { theme: 'distretto di Ovidiopoli (Oblast\' di Odessa): sponda orientale dell\'estuario del Dnestr e collegamenti costieri verso Akkerman', famine46_47: true },

  // === GEORGIA, ARMENIA, AZERBAIJAN ===
  SOV_ADM1_GEO_106_Kakheti: { theme: 'Kachetia (Telavi, RSS Georgiana): grande bacino vitivinicolo georgiano ed elettrificazione delle valli dell\'Alazani' },
  SOV_ADM1_GEO_107_Kvemo_Kartli: { theme: 'Kvemo Kartli (Rustavi / Marneuli, RSS Georgiana): costruzione del gigante metallurgico di Rustavi (avvio altoforni 1947) per la Transcaucasia' },
  SOV_ADM1_GEO_109_Mtskheta_Mtianeti: { theme: 'Mccheta-Mtianeti (RSS Georgiana): asse della Strada Militare Georgiana e tutela delle dighe idroelettriche lungo la Kura/Aragvi' },
  SOV_ADM1_GEO_110_Samtskhe_Javakheti: { theme: 'Samcche-Giavachezia (Achalciche, RSS Georgiana): fascia frontaliera blindata con la Turchia dopo le deportazioni dei turchi mescheti (nov. 1944)' },
  SOV_ADM1_GEO_112_Guria: { theme: 'Guria (Macharadze/Ozurgeti, RSS Georgiana): piantagioni di tè e agrumi sub-tropicali e retrovia marittima verso il porto di Batumi' },
  SOV_ADM1_GEO_113_Shida_Kartli: { theme: 'Šida Kartli (Gori e Oblast\' Autonoma Sud-Ossa): snodo ferroviario transcaucasico e frutticoltura nella piana interna di Kartli' },
  SOV_ADM1_GEO_114_Imereti: { theme: 'Imerezia (Kutaisi e Čiatura, RSS Georgiana): miniere strategiche di manganese di Čiatura e cantiere dello stabilimento automobilistico di Kutaisi (KAZ, avviato 1945)' },
  SOV_ADM1_GEO_115_Racha_Lechkhumi_and_Kvemo_Svaneti: { theme: 'Rača-Lečchumi e Bassa Svanezia: bacino montano dell\'Alto Rioni e centrali idroelettriche alpine nel Grande Caucaso' },
  SOV_ADM1_GEO_116_Samegrelo_Zemo_Svaneti: { theme: 'Mingrelia e Alta Svanezia (Zugdidi e Poti, RSS Georgiana): porto chiave di Poti sul Mar Nero e miniere carbonifere di Tkvibuli/Tkvarčeli' },
  SOV_ADM1_ARM_117_Gegharkunik: { theme: 'bacino del Lago Sevan (RSS Armena): avvio dei lavori sulla cascata idroelettrica Sevan-Razdan (abbassamento controllato del bacino per energia industriale)' },
  SOV_ADM1_ARM_118_Syunik: { theme: 'Zangezur (Kapan/Kadžaran, RSS Armena): espansione delle miniere di rame-molibdeno di Kadžaran al confine con l\'Azerbaigian iraniano' },
  SOV_ADM1_ARM_119_Tavush: { theme: 'fascia boschiva nord-orientale dell\'Armenia (Idževan/Dilijan): risorse forestali e collegamenti caucasici lungo il fiume Aghstev' },
  SOV_ADM1_ARM_120_Shirak: { theme: 'Leninakan (Gjumri, RSS Armena): secondo polo tessile e ferroviario armeno, guarnigione di frontiera sul fiume Achurjan davanti a Kars (Turchia)' },
  SOV_ADM1_ARM_121_Lori: { theme: 'Lori (Kirovakan/Vanadzor e Alaverdi, RSS Armena): fonderie di rame di Alaverdi e grande industria chimica-calcica di Kirovakan' },
  SOV_ADM1_ARM_122_Kotayk: { theme: 'fascia centrale del Hrazdan (RSS Armena): cascata energetica di Kanaker-Gjumuš e insediamento di nuovi quartieri industriali per rimpatriati' },
  SOV_ADM1_ARM_123_Vayots_Dzor: { theme: 'altopiano meridionale armeno (Echegnadzor): viticoltura e passaggio stradale montano verso lo Zangezur e il Nachičevan\'' },
  SOV_ADM1_ARM_124_Armavir: { theme: 'piana dell\'Ararat occidentale (Ečmiadzin, RSS Armena): sede del Catholicosato di tutti gli Armeni (riabilitazione parziale di Kevork VI nel 1945) e agricoltura irrigua' },
  SOV_ADM1_ARM_125_Aragatsotn: { theme: 'pendici del Monte Aragats (Byurakan, RSS Armena): inaugurazione nel 1946 del celebre Osservatorio Astrofisico di Byurakan diretto da V. Ambartsumyan' },
  SOV_ADM1_ARM_127_Ararat: { theme: 'valle dell\'Ararat orientale lungo il confine turco-iraniano sull\'Arasse: coltivazioni irrigue, cementifici e sorveglianza frontaliera' },

  // === KAZAKISTAN, UZBEKISTAN, TURKMENISTAN, TAGIKISTAN, KIRGHIZISTAN RESTO ===
  SOV_ADM1_KAZ_130_Pavlodar_Region: { theme: 'bacino dell\'Irtyš settentrionale: estrazione incipiente del carbone di Ėkibastuz, allevamento e transito fluviale verso Omsk' },
  SOV_ADM1_KAZ_131_Jambyl_Region: { theme: 'Oblast\' di Džambul: sviluppo della grande industria dei fosforiti di Karatau per i fertilizzanti dell\'Asia Centrale' },
  SOV_ADM1_KAZ_132_Kostanay_Region: { theme: 'Oblast\' di Kustanaj: steppe settentrionali cerealicole e avvio delle ricerche sui grandi giacimenti ferriferi di Sokolov-Sarbaj' },
  SOV_ADM1_KAZ_133_Mangystau_Region: { theme: 'penisola del Mangyšlak (Oblast\' di Gur\'ev fino al 1973): costa caspica desertica, pesca a Fort-Ševčenko e prospezioni geologiche di frontiera' },
  SOV_ADM1_KAZ_135_Kyzylorda_Region: { theme: 'Oblast\' di Kzyl-Orda lungo il basso Syr-Dar\'ja: risicoltura irrigua (anche tramite deportati coreani dal 1937) e fascio ferroviario Tashkent-Orenburg' },
  SOV_ADM1_KAZ_137_Aktobe_Region: { theme: 'Oblast\' di Aktjubinsk: ferro-leghe di Aktjubinsk, cromiti di Chromtau e traffico strategico tra gli Urali meridionali e l\'Asia Centrale' },
  SOV_ADM1_KAZ_138_Atyrau_Region: { theme: 'Oblast\' di Gur\'ev (Atyrau): estrazione petrolifera del bacino dell\'Emba (Dossor, Makat) e oleodotto strategico verso Orsk' },
  SOV_ADM1_KAZ_139_South_Kazakhstan_Region: { theme: 'Oblast\' del Kazakistan Meridionale (Čimkent): grande fonderia di piombo di Čimkent, industria chimico-farmaceutica e cotone sul Syr-Dar\'ja' },
  SOV_ADM1_KAZ_140_Akmola_Region: { theme: 'Oblast\' di Akmolinsk: giacimenti auriferi di Stepnják, miniere di bauxite e infrastrutture cerealicole della steppa centro-settentrionale' },
  SOV_ADM1_KAZ_141_Almaty_Region: { theme: 'Semireč\'e (Oblast\' di Alma-Ata): agricoltura irrigua pedemontana, zuccherifici e guardia confinaria lungo il fiume Ili verso lo Xinjiang' },
  SOV_ADM1_KAZ_142_North_Kazakhstan_Region: { theme: 'Oblast\' del Kazakistan Settentrionale (Petropavlovsk): fabbriche evacuate lungo la Transiberiana, zootecnia e grano della steppa dell\'Išim' },
  SOV_ADM1_KAZ_144_West_Kazakhstan_Region: { theme: 'Oblast\' del Kazakistan Occidentale (Ural\'sk): industria alimentare e meccanica sul fiume Ural, al raccordo con Saratov e il Basso Volga' },
  SOV_ADM1_UZB_146_Andijan_Region: { theme: 'Valle di Fergana orientale (Andijan): intensificazione della cotonicoltura, petrolio del Fergana e stabilimenti meccanici' },
  SOV_ADM1_UZB_147_Namangan_Region: { theme: 'Valle di Fergana settentrionale (Namangan): grande canale settentrionale del Fergana, irrigazione agricola e industria serica' },
  SOV_ADM1_UZB_148_Fergana_Region: { theme: 'Fergana & Kokand: raffinazione petrolifera di Vannovskij/Fergana, fertilizzanti azotati di Kokand e cuore cotoniero dell\'Uzbekistan' },
  SOV_ADM1_UZB_150_Xorazm_Region: { theme: 'Oasi di Chorezm (Urgenč): risanamento agricolo del basso Amudar\'ja e produzione intensiva di cotone e riso' },
  SOV_ADM1_UZB_151_Navoiy_Region: { theme: 'deserto del Kyzylkum orientale (Oblast\' di Buchara/Samarcanda fino al 1982): oasi pastorali di karakul e prime prospezioni aurifere-uranifere' },
  SOV_ADM1_UZB_152_Surxondaryo_Region: { theme: 'Oblast\' di Surchandar\'ja (Termez): ponte strategico e presidio militare meridionale sull\'Amudar\'ja al confine con l\'Afghanistan' },
  SOV_ADM1_UZB_153_Samarqand_Region: { theme: 'Samarcanda: nodo ferroviario e culturale uzbeko, industrie chimiche (perfosfati), seta e agricoltura nella valle dello Zeravšan' },
  SOV_ADM1_UZB_154_Tashkent_Region: { theme: 'Oblast\' di Taškent (Čirčik & Almalyk): grande polo chimico-elettrochimico di Čirčik (azoto/fertilizzanti), carbone di Angren e cantiere diga di Farchad (1947)' },
  SOV_ADM1_UZB_155_Sirdaryo_Region: { theme: 'Steppa della Fame (Oblast\' di Taškent/Samarcanda fino al 1963): grandi lavori di bonifica e irrigazione per i nuovi kolchoz cotonieri sull\'Syr-Dar\'ja' },
  SOV_ADM1_UZB_156_Jizzakh_Region: { theme: 'distretto di Džizak (Oblast\' di Samarcanda fino al 1973): valico delle Porte di Tamerlano tra Taškent e Samarcanda e cerealicoltura pedemontana' },
  SOV_ADM1_UZB_157_Bukhara_Region: { theme: 'Oblast\' di Buchara: filature di seta, pelletteria karakul e rilievi geologici preliminari sul potenziale di gas naturale nel Kyzylkum' },
  SOV_ADM1_UZB_158_Qashqadaryo_Region: { theme: 'Oblast\' di Kaškadar\'ja (Karši): allevamento di pecore karakul e cerealicoltura secca nelle oasi sud-uzbeke' },
  SOV_ADM1_TKM_160_Balkan: { theme: 'Oblast\' di Krasnovodsk / Ašchabad ovest: porto petrolifero di Krasnovodsk sul Mar Caspio, campi di Nebit-Dag (Vyška) e sali chimici del Kara-Bogaz-Gol' },
  SOV_ADM1_TKM_161_Ahai: { theme: 'Oblast\' di Ašchabad (capitale RSS Turkmena): ricostruzione civile, tessile-vetraria e snodo frontaliero dell\'Iran settentrionale lungo il Kopet Dag' },
  SOV_ADM1_TKM_162_Dasoguz: { theme: 'Oblast\' di Tašauz: oasi settentrionale turkmena sul delta dell\'Amudar\'ja, produzione cotoniera e allevamento' },
  SOV_ADM1_TKM_163_Lebap: { theme: 'Oblast\' di Čardžou (Lebap): grande ponte ferroviario transcaspico sull\'Amudar\'ja, industria serica e superfosfati' },
  SOV_ADM1_TKM_164_Mary: { theme: 'Oblast\' di Mary (Merv) e Kuška: punto più meridionale dell\'URSS al confine afghano (Kuška) e bacino del cotone fine sul fiume Murgab' },
  SOV_ADM1_TJK_167_Districts_of_Republican_Subordination: { theme: 'valli di Gissar e Vachš (subordinazione repubblicana, RSS Tagika): cotone a fibra lunga, strade alpine e sviluppo industriale attorno alla capitale' },
  SOV_ADM1_TJK_168_Khatlon_Region: { theme: 'Oblast\' di Kuljab e Kurgan-Tjube (RSS Tagika): valle meridionale del Vachš e del Pjandž al confine afghano, cotone irrigato e agricoltura' },
  SOV_ADM1_TJK_169_Dushanbe: { theme: 'Stalinabad (Dušanbe dal 1961), capitale della RSS Tagika: consolidamento urbano, istituti accademici e industrie tessili-meccaniche' },
  SOV_ADM1_KGZ_170_Batken_Region: { theme: 'distretti sud-occidentali di Oš (Chajdarkan e Kadamžaj, RSS Kirghisa): principali impianti sovietici di mercurio e antimonio sul margine meridionale del Fergana' },
  SOV_ADM1_KGZ_171_Osh_Region: { theme: 'Oblast\' di Oš (RSS Kirghisa): capitale meridionale kirghisa, combinat serico, miniere di carbone di Kyzyl-Kija/Suljukta e imbocco per il Pamir' },
  SOV_ADM1_KGZ_172_Talas_Region: { theme: 'Oblast\' di Talas (istituita nel 1944, RSS Kirghisa): zootecnia alpina, coltivazioni di barbabietola e tabacco lungo il confine kazako' },
  SOV_ADM1_KGZ_174_Issyk_Kul_Region: { theme: 'Oblast\' di Issyk-Kul\' (Prževal\'sk, RSS Kirghisa): agricoltura alpina, sanatori lacustri e prime prospezioni uranifere di Kadži-Saj (dal 1947)' },
  SOV_ADM1_KGZ_175_Chuy_Region: { theme: 'Frunze (Biškek), capitale della RSS Kirghisa, e Valle del Čuj: industrie agricole meccaniche evacuate, zuccherifici e centro politico repubblicano' },
  SOV_ADM1_KGZ_176_Naryn_Region: { theme: 'Oblast\' di Tien-Šan\' (Naryn, RSS Kirghisa): passo alpino di Torugart verso lo Xinjiang e pastorizia di alta montagna' },
};

function getRepublicLabel(pid: string, step: number): string {
  if (pid.includes('_UKR_')) return 'RSS Ucraina (URSS)';
  if (pid.includes('_BLR_')) return 'RSS Bielorussa (URSS)';
  if (pid.includes('_GEO_')) return 'RSS Georgiana (URSS)';
  if (pid.includes('_ARM_')) return 'RSS Armena (URSS)';
  if (pid.includes('_AZE_')) return 'RSS Azera (URSS)';
  if (pid.includes('_KAZ_')) return 'RSS Kazaka (URSS)';
  if (pid.includes('_UZB_')) return 'RSS Uzbeka (URSS)';
  if (pid.includes('_KGZ_')) return 'RSS Kirghisa (URSS)';
  if (pid.includes('_TKM_')) return 'RSS Turkmena (URSS)';
  if (pid.includes('_TJK_')) return 'RSS Tagika (URSS)';
  if (pid === 'SOV_MASSR_310_Transnistria') return 'RSS Moldava (URSS)';
  if (
    pid.startsWith('SOV_NW_RUS_261') ||
    pid.startsWith('SOV_NW_RUS_257') ||
    pid.startsWith('SOV_NW_RUS_265') ||
    pid.startsWith('SOV_NW_RUS_269') ||
    pid.startsWith('SOV_NW_RUS_276') ||
    pid.startsWith('SOV_NW_RUS_277') ||
    pid.startsWith('SOV_NW_RUS_278') ||
    pid.startsWith('SOV_NW_RUS_279') ||
    pid.startsWith('SOV_NW_RUS_281') ||
    pid.startsWith('SOV_NW_RUS_284') ||
    pid.startsWith('SOV_NW_RUS_285') ||
    pid.startsWith('SOV_NW_RUS_287') ||
    pid.startsWith('SOV_NW_RUS_288') ||
    pid.startsWith('SOV_NW_RUS_298')
  ) {
    return step >= 19 ? 'RSS Carelo-Finlandese (Sovet Ministrov — URSS)' : 'RSS Carelo-Finlandese (URSS)';
  }
  return 'RSFSR (URSS)';
}

export function getSovietPostwarData(
  pid: string,
  spec: SovietPostwarSpec,
  step: number,
  origAdmin8: string
): SovietPostwarResolved {
  const custom = SPECIFIC_POSTWAR[pid];
  if (custom) {
    const adminTitle = step >= 19 ? (custom.adm19 || custom.adm18 || origAdmin8) : (custom.adm18 || origAdmin8);
    const historicalName =
      step >= 20
        ? (custom.name20 || custom.name19)
        : step >= 19
        ? custom.name19
        : custom.name18;
    const note = step >= 20 ? custom.note20 : step >= 19 ? custom.note19 : custom.note18;
    return { adminTitle, historicalName, note };
  }

  const prof = REGION_PROFILES[pid];
  const repLabel = getRepublicLabel(pid, step);
  const shortTitle = origAdmin8 && !/Wehrmacht|Reich|Heeresgebiet|Kommissariat/i.test(origAdmin8)
    ? origAdmin8
    : `Ispolkom Regionale — ${repLabel}`;

  const adminTitle =
    step >= 19
      ? `${shortTitle.replace(/Sovet Narodnykh Komissarov|SNK/g, 'Sovet Ministrov')}`
      : shortTitle;

  const baseName = spec.histBase || spec.capital;
  const historicalName =
    step >= 20
      ? `${baseName} (${spec.modernName} — Piano Quinquennale & Riforma Dic. 1947)`
      : step >= 19
      ? `${baseName} (${spec.modernName} — Ricostruzione 1947, ${repLabel.replace(' (URSS)', '')})`
      : `${baseName} (${spec.modernName} — URSS Postbellica, Set. 1945)`;

  if (prof) {
    const note =
      step >= 20
        ? `Dicembre 1947 (${spec.modernName}): entra in vigore la riforma monetaria (cambio 10:1) con fine del razionamento bellico; prosegue il consolidamento su ${prof.theme}.`
        : step >= 19
        ? `Settembre 1947 (${spec.modernName}): secondo anno del Quarto Piano Quinquennale (1946-1950)${prof.famine46_47 ? ', segnato dai gravi effetti della siccità e carestia del 1946-47' : ''}; attività centrata su ${prof.theme}.`
        : `Settembre 1945 (${spec.modernName}): territorio dell'Unione Sovietica in smobilitazione postbellica dopo la vittoria del 1945; ripresa di ${prof.theme}.`;
    return { adminTitle, historicalName, note };
  }

  // Fallback impossibile se tutte le 240 entità sono coperte, mantenuto solo come sicurezza tipizzata
  const note =
    step >= 20
      ? `Dicembre 1947 (${spec.modernName}): attuazione della riforma monetaria sovietica (14-16 dicembre) e abolizione del razionamento.`
      : step >= 19
      ? `Settembre 1947 (${spec.modernName}): ricostruzione e sviluppo del Quarto Piano Quinquennale dell'URSS.`
      : `Settembre 1945 (${spec.modernName}): territorio dell'URSS avviato alla smobilitazione postbellica.`;

  return { adminTitle, historicalName, note };
}
