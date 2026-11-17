/**
 * Divisioni Administrative Level 1 (ADM1) della Tailandia — Evoluzione Geostorica Integrale (Steps 0–22: 1936–1948)
 *
 * Basato sulle 78 entità ADM1 (TH10–TH96 + THS Phatthaya) ritagliate in topologia watertight sul perimetro del Regno del Siam 1938.
 *
 * Fasi cronologiche anti-anacronismo:
 * - Steps 0–4 (GEN 1936 – APR 1939): Regno del Siam (Sayam — Reggenza per Re Ananda Mahidol / P.M. Phraya Phahon & dal Dic 1938 Phibun).
 *   Nota storica: la ridenominazione ufficiale da Siam a Thailandia (Rathaniyom n. 1) avviene il 24 giugno 1939 (tra Step 4 e Step 5).
 * - Steps 5–6 (SET 1939 – GIU 1940): Regno di Thailandia (Ratcha-anachak Thai) — Neutralità e Patti di Non Aggressione (12 Giu 1940).
 * - Step 7 (OTT 1940): Mobilitazione irredentista e primi scontri di frontiera lungo il Mekong e Aranyaprathet alla vigilia della Guerra Franco-Thailandese.
 * - Step 8 (APR 1941): Conclusione della Guerra Franco-Thailandese (Battaglia di Ko Chang 17 Gen 1941, offensiva di Sisophon/Champasak, armistizio 31 Gen e mediazione di Tokyo verso la Convenzione del 9 Maggio 1941).
 * - Step 9 (DIC 1941): Sbarchi giapponesi dell'8 Dicembre 1941 (Singora, Pattani, Bang Pu, Prachuap Khiri Khan, Chumphon, Surat Thani, Nakhon Si Thammarat), Alleanza del 21 Dicembre al Wat Phra Kaew e nascita clandestina del movimento Seri Thai.
 * - Steps 10–13 (AGO 1942 – SET 1943): Armata Phayap nello Shan (Saharat Thai Doem, Mag 1942), costruzione della Ferrovia della Morte (Ban Pong–Kanchanaburi–Tre Pagode, Giu 1942–Ott 1943) & Istmo di Kra, annessione dei 4 sultanati Si Rat Malai (Ago 1943).
 * - Steps 14–17 (GIU 1944 – APR 1945): Caduta di Phibun sulla legge per la capitale di Phetchabun (Lug 1944), governo civile Khuang Aphaiwong, reti clandestine Seri Thai / OSS / Force 136 e incursioni aeree B-24/B-29.
 * - Step 18 (SET 1945): Dichiarazione di Pace del 16 Agosto 1945 (Pridi Banomyong / Seni Pramoj), smobilitazione giapponese SEAC e avvio rimpatrio POW.
 * - Step 19 (SET 1947): Morte di Re Ananda Mahidol & ascesa di Rama IX (1946), Accordo di Washington (17 Nov 1946, restituzione territori indocinesi), ammissione ONU (16 Dic 1946).
 * - Steps 20–21 (DIC 1947 – GIU 1948): Colpo di Stato militare dell'8 Novembre 1947 (Khana Ratthaprahan), governo Khuang e ritorno di Plaek Phibunsongkhram (8 Aprile 1948), insurrezione di Dusun Nyor a Narathiwat (Apr 1948).
 * - Step 22 (DIC 1948): Consolidamento del regime Phibun dopo il fallito Complotto dello Stato Maggiore (1° Ott 1948), cooperazione anglo-thailandese al confine durante l'Emergenza Malese e tensioni islamiche nel Profondo Sud.
 */

import { ResolvedTerritory } from '../types';
import { makeResult } from './georesolver';

export type ThaiRegion = 'BANGKOK' | 'CENTRAL' | 'EAST' | 'ISAN' | 'NORTH' | 'WEST' | 'SOUTH';

export interface ThailandProvinceSpec {
  id: string;
  name: string;
  region: ThaiRegion;
  hist1936?: string;
  role: string;
  overrides?: Partial<Record<
    's0_4' | 's5_6' | 's7' | 's8' | 's9' | 's10_13' | 's14_17' | 's18' | 's19' | 's20_21' | 's22',
    string
  >>;
}

const RAW_PROVINCES: Array<[string, string, ThaiRegion, string, string?]> = [
  ['TH10', 'Bangkok Metropolis', 'BANGKOK', 'Polo politico, reale e militare del Paese (Phra Nakhon e Thon Buri, unificate nel 1971)', 'Changwat Phra Nakhon & Changwat Thon Buri'],
  ['TH11', 'Samut Prakan', 'CENTRAL', 'Foce fortificata del Chao Phraya (forti di Paknam e Phra Chulachomklao) e spiaggia di sbarco di Bang Pu', 'Changwat Samut Prakan'],
  ['TH12', 'Nonthaburi', 'CENTRAL', 'Fascia settentrionale del Grande Bangkok lungo il Chao Phraya, arsenali e stazioni fluviali', 'Changwat Nonthaburi'],
  ['TH13', 'Pathum Thani', 'CENTRAL', 'Piana risicola a nord della capitale e retrovia dell\'aeroporto strategico di Don Mueang', 'Changwat Pathum Thani'],
  ['TH14', 'Phra Nakhon Si Ayutthaya', 'CENTRAL', 'Snodo ferroviario settentrionale e granaio della piana alluvionale centrale del Chao Phraya', 'Changwat Phra Nakhon Si Ayutthaya'],
  ['TH15', 'Ang Thong', 'CENTRAL', 'Distretto agricolo irriguo sul corso centrale del Chao Phraya', 'Changwat Ang Thong'],
  ['TH16', 'Lop Buri', 'CENTRAL', 'Cittadella militare dell\'entroterra potenziata da Phibunsongkhram (1938–41) come centro d\'artiglieria e caserme', 'Changwat Lop Buri'],
  ['TH17', 'Sing Buri', 'CENTRAL', 'Piana agricola risicola sul medio Chao Phraya lungo la direttrice nord', 'Changwat Sing Buri'],
  ['TH18', 'Chai Nat', 'CENTRAL', 'Nodo idrografico alla diramazione Suphan/Chao Phraya nel bacino centrale', 'Changwat Chai Nat'],
  ['TH19', 'Saraburi', 'CENTRAL', 'Bivio strategico stradale e ferroviario fra la pianura centrale, l\'altopiano del Korat e Phetchabun', 'Changwat Saraburi'],
  ['TH20', 'Chon Buri', 'EAST', 'Sede a Sattahip della principale Base Navale d\'altura della Reale Marina (fondata negli anni \'30)', 'Changwat Chon Buri (incl. Sattahip)'],
  ['TH21', 'Rayong', 'EAST', 'Litorale orientale sul Golfo del Siam a guardia della rotta costiera verso Sattahip e Trat', 'Changwat Rayong'],
  ['TH22', 'Chanthaburi', 'EAST', 'Caposaldo marittimo orientale retrocesso dalla Francia nel 1904 e retrovia navale verso Ko Chang', 'Changwat Chanthaburi'],
  ['TH23', 'Trat', 'EAST', 'Estremo lembo costiero orientale (retrocesso nel 1907): acque della Battaglia Navale di Ko Chang (17 gennaio 1941)', 'Changwat Trat'],
  ['TH24', 'Chachoengsao', 'CENTRAL', 'Linea ferroviaria orientale verso Aranyaprathet e snodo del bacino del Bang Pakong', 'Changwat Chachoengsao'],
  ['TH25', 'Prachin Buri', 'EAST', 'Quartier generale avanzato dell\'Armata Orientale (Burapha) lungo l\'asse ferroviario verso la Cambogia', 'Changwat Prachin Buri'],
  ['TH26', 'Nakhon Nayok', 'CENTRAL', 'Retrovia pedemontana tra i monti Sankamphaeng e la piana orientale del Siam', 'Changwat Nakhon Nayok'],
  ['TH27', 'Sa Kaeo', 'EAST', 'Corridoio di frontiera di Aranyaprathet–Poipet sulla linea ferroviaria per Sisophon e Battambang', 'Amphoe Aranyaprathet / Sa Kaeo (in Changwat Prachin Buri fino al 1993)'],
  ['TH30', 'Nakhon Ratchasima', 'ISAN', 'Korat: porta principale dell\'altopiano dell\'Isan, nodo ferroviario militare e base aerea interna', 'Changwat Nakhon Ratchasima'],
  ['TH31', 'Buri Ram', 'ISAN', 'Altopiano meridionale dell\'Isan lungo la ferrovia Korat–Ubon e i valichi dei Monti Dângrêk', 'Changwat Buri Ram'],
  ['TH32', 'Surin', 'ISAN', 'Settore di confine sui Monti Dângrêk affacciato sul Protettorato francese della Cambogia (Oddar Meanchey)', 'Changwat Surin'],
  ['TH33', 'Si Sa Ket', 'ISAN', 'Fascia dei Monti Dângrêk e valichi verso Preah Vihear / Siem Reap durante la crisi del 1940–41', 'Changwat Si Sa Ket'],
  ['TH34', 'Ubon Ratchathani', 'ISAN', 'Capolinea ferroviario di Warin Chamrap sul fiume Mun e base di partenza verso Pakxe e Champasak', 'Changwat Ubon Ratchathani'],
  ['TH35', 'Yasothon', 'ISAN', 'Bacino inferiore del fiume Chi lungo le linee logistiche di rifornimento per Ubon Ratchathani', 'Amphoe Yasothon (in Changwat Ubon Ratchathani fino al 1972)'],
  ['TH36', 'Chaiyaphum', 'ISAN', 'Altopiano occidentale dell\'Isan fra i monti Phetchabun e il bacino del fiume Chi', 'Changwat Chaiyaphum'],
  ['TH37', 'Amnat Charoen', 'ISAN', 'Entroterra orientale tra Ubon Ratchathani e la sponda destra del medio Mekong', 'Amphoe Amnat Charoen (in Changwat Ubon Ratchathani fino al 1993)'],
  ['TH38', 'Bueng Kan', 'ISAN', 'Sponda destra del medio Mekong al confine con il Laos francese (settore Bolikhamxai)', 'Amphoe Bueng Kan (in Changwat Nong Khai fino al 2011)'],
  ['TH39', 'Nong Bua Lam Phu', 'ISAN', 'Fascia collinare di transizione tra Loei e la base militare di Udon Thani', 'Amphoe Nong Bua Lam Phu (in Changwat Udon Thani fino al 1993)'],
  ['TH40', 'Khon Kaen', 'ISAN', 'Snodo centrale della linea ferroviaria settentrionale dell\'Isan verso Udon Thani e Nong Khai', 'Changwat Khon Kaen'],
  ['TH41', 'Udon Thani', 'ISAN', 'Perno militare, ferroviario e aereo dell\'alto Isan rivolto verso Vientiane sul Mekong', 'Changwat Udon Thani'],
  ['TH42', 'Loei', 'ISAN', 'Valle montana sul Mekong di confine con le province laotiane di Xaignabouly e Vientiane', 'Changwat Loei'],
  ['TH43', 'Nong Khai', 'ISAN', 'Frontiera diretta sul Mekong dirimpetto a Vientiane: attraversamenti bellici 1941 e contatti Seri Thai / Lao Issara', 'Changwat Nong Khai'],
  ['TH44', 'Maha Sarakham', 'ISAN', 'Piana risicola centrale dell\'Isan tra Khon Kaen e Roi Et', 'Changwat Maha Sarakham'],
  ['TH45', 'Roi Et', 'ISAN', 'Bacino agricolo centrale del medio Isan e serbatoio di reclutamento dell\'esercito regionale', 'Changwat Roi Et'],
  ['TH46', 'Kalasin', 'ISAN', 'Valle del fiume Pao tra Khon Kaen e i contrafforti dei Monti Phu Phan', 'Changwat Kalasin'],
  ['TH47', 'Sakon Nakhon', 'ISAN', 'Massiccio dei Phu Phan: principale roccaforte partigiana di Tiang Sirikhanth e campi segreti Seri Thai (1944–45)', 'Changwat Sakon Nakhon'],
  ['TH48', 'Nakhon Phanom', 'ISAN', 'Città fluviale sul Mekong di fronte a Thakhek: scontri di frontiera del nov–dic 1940 e passaggio verso il Laos centrale', 'Changwat Nakhon Phanom'],
  ['TH49', 'Mukdahan', 'ISAN', 'Guado strategico sul Mekong dirimpetto a Savannakhet (corridoio laotiano verso il Vietnam)', 'Amphoe Mukdahan (in Changwat Nakhon Phanom fino al 1982)'],
  ['TH50', 'Chiang Mai', 'NORTH', 'Capitale storica del Lanna, capolinea ferroviario settentrionale e base arretrata dell\'Armata Phayap verso gli Stati Shan', 'Changwat Chiang Mai'],
  ['TH51', 'Lamphun', 'NORTH', 'Valle dell\'alto Ping lungo la ferrovia settentrionale subito a sud di Chiang Mai', 'Changwat Lamphun'],
  ['TH52', 'Lampang', 'NORTH', 'Nodo ferroviario e base logistica dell\'Armata Phayap lungo la direttrice verso Chiang Rai', 'Changwat Lampang'],
  ['TH53', 'Uttaradit', 'NORTH', 'Sbocco ferroviario del bacino del Nan verso i passi settentrionali di confine con Sayaboury', 'Changwat Uttaradit'],
  ['TH54', 'Phrae', 'NORTH', 'Bacino intermontano tra Lampang e la frontiera orientale di Nan', 'Changwat Phrae'],
  ['TH55', 'Nan', 'NORTH', 'Frontiera montuosa settentrionale davanti a Sayaboury / Pakbeng, base di partenza per l\'annessione del Lan Chang (1941)', 'Changwat Nan'],
  ['TH56', 'Phayao', 'NORTH', 'Bacino lacustre lungo la rotabile militare Lampang–Chiang Rai verso la frontiera Shan', 'Amphoe Phayao (in Changwat Chiang Rai fino al 1977)'],
  ['TH57', 'Chiang Rai', 'NORTH', 'Punta settentrionale (Mae Sai / Triangolo d\'Oro sul Mekong): base d\'attacco dell\'Armata Phayap verso Kengtung (maggio 1942)', 'Changwat Chiang Rai'],
  ['TH58', 'Mae Hong Son', 'NORTH', 'Frontiera montana nord-occidentale lungo il fiume Salween a ridosso degli Stati Karenni e Shan (Birmania)', 'Changwat Mae Hong Son'],
  ['TH60', 'Nakhon Sawan', 'NORTH', 'Pak Nam Pho: confluenza del Ping e del Nan nel Chao Phraya, cerniera ferroviaria tra pianura centrale e Nord', 'Changwat Nakhon Sawan'],
  ['TH61', 'Uthai Thani', 'CENTRAL', 'Margine occidentale del bacino centrale ai piedi dei monti del Tenasserim settentrionale', 'Changwat Uthai Thani'],
  ['TH62', 'Kamphaeng Phet', 'NORTH', 'Corridoio fluviale sul Ping verso Tak e le valli del settentrione', 'Changwat Kamphaeng Phet'],
  ['TH63', 'Tak', 'WEST', 'Passo strategico di Mae Sot–Myawaddy verso Moulmein (asse d\'invasione giapponese in Bassa Birmania del gen 1942)', 'Changwat Tak'],
  ['TH64', 'Sukhothai', 'NORTH', 'Valle del fiume Yom nel bacino superiore della pianura settentrionale', 'Changwat Sukhothai'],
  ['TH65', 'Phitsanulok', 'NORTH', 'Perno militare ed aereo della Regione Nord sullo snodo ferroviario per Chiang Mai', 'Changwat Phitsanulok'],
  ['TH66', 'Phichit', 'NORTH', 'Piana alluvionale del fiume Nan tra Nakhon Sawan e Phitsanulok', 'Changwat Phichit'],
  ['TH67', 'Phetchabun', 'NORTH', 'Valle montuosa scelta da Phibun nel 1943–44 come nuova capitale fortificata (bocciatura parlamentare del lug 1944)', 'Changwat Phetchabun'],
  ['TH70', 'Ratchaburi', 'WEST', 'Snodo ferroviario meridionale di Ban Pong e bivio di Nong Pladuk, punto di partenza della Ferrovia della Morte (1942–45)', 'Changwat Ratchaburi'],
  ['TH71', 'Kanchanaburi', 'WEST', 'Valle del Khwae Noi e Passo delle Tre Pagode: asse principale della Ferrovia Thailandia–Birmania e ponte sul fiume Kwai', 'Changwat Kanchanaburi'],
  ['TH72', 'Suphan Buri', 'CENTRAL', 'Pianura occidentale del bacino del Tha Chin tra Bangkok e le montagne del Tenasserim', 'Changwat Suphan Buri'],
  ['TH73', 'Nakhon Pathom', 'CENTRAL', 'Nodo ferroviario occidentale tra Bangkok e Ban Pong / Kanchanaburi lungo la linea sud-ovest', 'Changwat Nakhon Pathom'],
  ['TH74', 'Samut Sakhon', 'CENTRAL', 'Estuario del fiume Tha Chin sul Golfo del Siam a ovest di Bangkok', 'Changwat Samut Sakhon'],
  ['TH75', 'Samut Songkhram', 'CENTRAL', 'Foce del fiume Mae Klong tra la baia di Bangkok e l\'imbocco verso Ratchaburi', 'Changwat Samut Songkhram'],
  ['TH76', 'Phetchaburi', 'WEST', 'Pianura costiera dell\'Istmo settentrionale lungo la Ferrovia del Sud tra Ratchaburi e Hua Hin', 'Changwat Phetchaburi'],
  ['TH77', 'Prachuap Khiri Khan', 'WEST', 'Stretta striscia istmica: eroica resistenza dell\'Ala 5 dell\'aeronautica siamese ad Ao Manao contro lo sbarco giapponese (8–9 dic 1941)', 'Changwat Prachuap Khiri Khan'],
  ['TH80', 'Nakhon Si Thammarat', 'SOUTH', 'Principale guarnigione militare del Sud (6° Reggimento): luogo di sbarco giapponese all\'alba dell\'8 dicembre 1941', 'Changwat Nakhon Si Thammarat'],
  ['TH81', 'Krabi', 'SOUTH', 'Costa del Mare delle Andamane a sud di Phangnga con rotte costiere di cabotaggio', 'Changwat Krabi'],
  ['TH82', 'Phangnga', 'SOUTH', 'Distretto minerario di stagno sull\'Oceano Indiano a nord della baia di Phuket', 'Changwat Phangnga'],
  ['TH83', 'Phuket', 'SOUTH', 'Isola strategica per l\'estrazione dello stagno nel Mare delle Andamane lungo la rotta verso Penang e Rangoon', 'Changwat Phuket'],
  ['TH84', 'Surat Thani', 'SOUTH', 'Bivio costiero dell\'Istmo sul Golfo di Bandon (sbarco giapponese dell\'8 dicembre 1941)', 'Changwat Surat Thani'],
  ['TH85', 'Ranong', 'SOUTH', 'Porto sull\'estuario del Kraburi al confine con il Tenasserim (capolinea occidentale della Ferrovia dell\'Istmo di Kra, 1943)', 'Changwat Ranong'],
  ['TH86', 'Chumphon', 'SOUTH', 'Sbarco giapponese dell\'8 dicembre 1941 e capolinea orientale della ferrovia strategica giapponese dell\'Istmo di Kra (1943)', 'Changwat Chumphon'],
  ['TH90', 'Songkhla', 'SOUTH', 'Singora: grande porto e spiaggia dello sbarco principale della 25ª Armata giapponese (Gen. Yamashita, 8 dic 1941) verso la Malesia', 'Changwat Songkhla (Singora)'],
  ['TH91', 'Satun', 'SOUTH', 'Costa sulle Andamane al confine con Perlis (retrocesso alla Malesia britannica fino al trasferimento bellico Si Rat Malai 1943–45)', 'Changwat Satun'],
  ['TH92', 'Trang', 'SOUTH', 'Porto delle Andamane e snodo della ferrovia trasversale meridionale dal Golfo alla costa occidentale', 'Changwat Trang'],
  ['TH93', 'Phatthalung', 'SOUTH', 'Entroterra lacustre lungo la dorsale della Ferrovia del Sud tra Nakhon Si Thammarat e Hat Yai', 'Changwat Phatthalung'],
  ['TH94', 'Pattani', 'SOUTH', 'Sbarco giapponese dell\'8 dicembre 1941 sulla direttrice Betong–Kroh; culla del movimento autonomista malese-islamico di Haji Sulong (1947–48)', 'Changwat Pattani'],
  ['TH95', 'Yala', 'SOUTH', 'Corridoio interno di Betong verso Perak (linea di marcia giapponese del dic 1941 e frontiera dell\'Emergenza Malese nel 1948)', 'Changwat Yala'],
  ['TH96', 'Narathiwat', 'SOUTH', 'Frontiera con Kelantan: linea di rifornimento costiera verso Kota Bharu e teatro della rivolta di Dusun Nyor (26–28 aprile 1948)', 'Changwat Narathiwat'],
  ['THS', 'Phatthaya', 'EAST', 'Litorale costiero sul Golfo di Bangkok immediatamente a nord della base navale di Sattahip (area infiltrazioni costiere 1944–45)', 'Amphoe Bang Lamung (in Changwat Chon Buri; città speciale dal 1978)'],
];

export const THAILAND_PROVINCES_META: Record<string, ThailandProvinceSpec> = {};
for (const [id, name, region, role, hist1936] of RAW_PROVINCES) {
  THAILAND_PROVINCES_META[id] = { id, name, region, role, hist1936 };
}

// Sovrascritture puntuali sugli snodi cruciali per singole province storiche
const SPECIFIC_STEP_NOTES: Record<string, Partial<Record<'s7' | 's8' | 's9' | 's10_13' | 's14_17' | 's18' | 's19' | 's20_21' | 's22', string>>> = {
  TH10: {
    s8: 'Bangkok · Sotto la mediazione giapponese seguita all\'armistizio sulla nave Natori (31 gennaio 1941), il governo di Plaek Phibunsongkhram conclude i negoziati di Tokyo per recuperare i territori ceduti alla Francia nel 1904–1907.',
    s9: 'Bangkok (21 Dicembre 1941) · Dopo i brevi scontri dell\'8 dicembre, il Maresciallo Plaek Phibunsongkhram firma al Tempio del Buddha di Smeraldo (Wat Phra Kaew) il Trattato d\'Alleanza militare offensiva e difensiva con il Giappone; intanto il Reggente Pridi Banomyong getta le basi della rete clandestina antigiapponese Seri Thai.',
    s10_13: 'Bangkok · Capitale dell\'alleato thailandese e sede del comando di presidio giapponese; tra il 1942 e il 1943 la rete segreta Seri Thai opera tra l\'Università Thammasat (Pridi Banomyong) e gli addetti militari, mentre l\'USAAF/RAF inizia i bombardamenti sulle infrastrutture ferroviarie e portuali.',
    s14_17: 'Bangkok · Dopo la caduta parlamentare di Phibunsongkhram (luglio 1944), il nuovo governo civile di Khuang Aphaiwong collabora copertamente con la rete Seri Thai / OSS-Force 136 insediata in città; tra novembre 1944 e aprile 1945 i B-29 alleati distruggono le centrali elettriche di Samsen/Wat Liab e il ponte Rama VI.',
    s18: 'Bangkok (16 Agosto 1945) · Il Reggente Pridi Banomyong emana la Dichiarazione di Pace che annulla la dichiarazione di guerra del 1942; a settembre Seni Pramoj assume la guida del governo Seri Thai e accoglie i contingenti britannici SEAC per il disarmo delle truppe giapponesi.',
    s19: 'Bangkok · Dopo la morte di Re Ananda Mahidol (9 giugno 1946) e l\'ascesa di Re Bhumibol Adulyadej (Rama IX), il Paese firma l\'Accordo di Washington con la Francia (17 novembre 1946) ed entra alle Nazioni Unite (16 dicembre 1946).',
    s20_21: 'Bangkok · L\'8 novembre 1947 i militari golpisti (Khana Ratthaprahan) del Gen. Phin Choonhavan rovesciano il governo di Thawan Thamrongnawasawat costringendo Pridi all\'esilio; dopo la breve transizione di Khuang Aphaiwong, l\'8 aprile 1948 il Maresciallo Phibunsongkhram torna Primo Ministro.',
    s22: 'Bangkok (31 Dicembre 1948) · Superato il fallito Complotto dello Stato Maggiore (1° ottobre 1948) con arresti nell\'esercito e nei quadri Seri Thai, il regime filo-occidentale di Phibunsongkhram rafforza il controllo militare e il riallineamento strategico con Washington e Londra.',
  },
  TH20: {
    s8: 'Chon Buri & Base Navale di Sattahip · Principale arsenale della Reale Marina Thailandese; le sue squadre costiere forniscono copertura logistica e riparazioni navali all\'indomani dello scontro di Ko Chang (gennaio 1941).',
    s9: 'Chon Buri (Base di Sattahip) · Porto strategico sul Golfo del Siam inserito negli accordi logistici nippo-thailandesi del dicembre 1941 per i convogli marittimi diretti verso Singapore e l\'Indocina.',
    s10_13: 'Sattahip (Chon Buri) · Base navale operativa utilizzata in congiunto dalla Marina Reale Thailandese e dalla Marina Imperiale Giapponese a presidio del Golfo di Thailandia.',
  },
  TH23: {
    s8: 'Trat & Acque di Ko Chang (17 Gennaio 1941) · Teatro della Battaglia Navale di Ko Chang nella Guerra Franco-Thailandese: la squadra francese di Vichy guidata dall\'incrociatore Lamotte-Picquet attacca le navi da difesa costiera thailandesi (affondamento della HTMS Thonburi, Songkhla e Chonburi) poco prima dell\'armistizio mediato da Tokyo.',
  },
  TH27: {
    s7: 'Aranyaprathet / Sa Kaeo · Principale concentramento dell\'Armata Orientale (Burapha) lungo la ferrovia di frontiera verso Poipet alla vigilia dei combattimenti di confine con l\'Indocina francese.',
    s8: 'Aranyaprathet / Sa Kaeo · Testa di ponte dell\'avanzata terrestre thailandese su Sisophon e Battambang nel gennaio 1941; con la mediazione giapponese diviene il raccordo diretto con le province di Phra Tabong e Phibunsongkhram.',
    s19: 'Aranyaprathet (Changwat Prachin Buri) · Con l\'entrata in vigore dell\'Accordo di Washington (novembre 1946), torna linea di confine internazionale tra la Thailandia e la Cambogia dell\'Unione Francese.',
  },
  TH67: {
    s14_17: 'Phetchabun · Progetto di Phibunsongkhram (1943–luglio 1944) di trasferire qui una nuova capitale interna fortificata lontana dai bombardamenti navali ed aerei: il costo umano dei lavori e il rigetto parlamentare della legge nel luglio 1944 provocano le dimissioni di Phibun e la svolta civile.',
  },
  TH70: {
    s9: 'Ratchaburi (Ban Pong / Nong Pladuk) · Dal dicembre 1941 lo snodo ferroviario di Nong Pladuk diventa il punto d\'inoltro delle truppe giapponesi dirette attraverso l\'Istmo e verso la frontiera birmana.',
    s10_13: 'Ratchaburi (Ban Pong — Capolinea Ferrovia della Morte) · Dal giugno 1942 le autorità giapponesi istituiscono a Ban Pong il campo base meridionale e la diramazione ferroviaria per la costruzione della linea Thailandia–Birmania verso Kanchanaburi.',
  },
  TH71: {
    s10_13: 'Kanchanaburi (Ferrovia Thailandia–Birmania / Ponte sul Kwai) · Tra giugno 1942 e ottobre 1943 oltre 60.000 prigionieri di guerra alleati e 200.000 lavoratori asiatici (rōmusha) costruiscono tra enormi perdite la linea ferroviaria verso il Passo delle Tre Pagode e Thanbyuzayat.',
    s14_17: 'Kanchanaburi · I bombardieri pesanti B-24 e B-29 alleati colpiscono ripetutamente i ponti in acciaio e legno sul fiume Khwae Noi mentre reti clandestine Seri Thai forniscono soccorsi alimentari e medici ai prigionieri.',
    s18: 'Kanchanaburi · Nell\'agosto–settembre 1945 i reparti britannico-indiani SEAC ed i volontari Seri Thai liberano i campi di prigionia lungo la linea ferroviaria organizzando i cimiteri di guerra e il rimpatrio dei sopravvissuti.',
  },
  TH77: {
    s9: 'Prachuap Khiri Khan (Battaglia di Ao Manao, 8–9 Dicembre 1941) · All\'alba dell\'8 dicembre i piloti e avieri dello Stormo 5 thailandese oppongono oltre trenta ore di accanita resistenza allo sbarco del 143° Reggimento fanteria giapponese fino all\'arrivo dell\'ordine di cessate il fuoco da Bangkok.',
  },
  TH90: {
    s9: 'Songkhla / Singora (Sbarco Principale, 8 Dicembre 1941) · Principale testa di ponte anfibia della 25ª Armata del Gen. Tomoyuki Yamashita (5ª Divisione meccanizzata) che piega verso sud sfondando la Linea Jitra nella Malesia britannica.',
  },
  TH94: {
    s9: 'Pattani (8 Dicembre 1941) · Zona di sbarco di reparti d\'avanguardia giapponesi diretti via Yala–Betong sul fianco britannico di Kroh/Perak.',
    s20_21: 'Pattani · L\'arresto del leader religioso riformista Haji Sulong (gennaio 1948) e l\'opposizione alle politiche d\'assimilazione riaprono le tensioni autonomiste nelle province malesi-musulmane del Profondo Sud.',
    s22: 'Pattani (31 Dicembre 1948) · Provincia sotto stretta sorveglianza militare e di polizia dopo i moti primaverili nel Sud e l\'accordo di pattugliamento confinario con le autorità britanniche della Federazione della Malesia.',
  },
  TH95: {
    s22: 'Yala & Settore di Betong (31 Dicembre 1948) · Zona di frontiera montuosa pattugliata congiuntamente da forze thailandesi e britanniche per contenere le basi di retrovia dei guerriglieri comunisti dell\'Emergenza Malese.',
  },
  TH96: {
    s20_21: 'Narathiwat (Rivolta di Dusun Nyor, 26–28 Aprile 1948) · Esplosione armata contadina nel distretto di Rangae repressa duramente dalla polizia thailandese dopo l\'arresto di Haji Sulong, in concomitanza con l\'irrigidimento militare lungo la frontiera del Kelantan.',
    s22: 'Narathiwat (31 Dicembre 1948) · Frontiera meridionale presidiata dopo i fatti di Dusun Nyor e collegata alle operazioni anglo-thailandesi contro gli insorti dell\'MNLA al confine malese.',
  },
};

export const THAILAND_ADM1_IDS = new Set<string>(Object.keys(THAILAND_PROVINCES_META));

function buildRegionalNote(meta: ThailandProvinceSpec, s: number): string {
  const sp = SPECIFIC_STEP_NOTES[meta.id];
  const label = meta.name;
  const histTag = meta.hist1936 ? ` (${meta.hist1936})` : '';

  if (s <= 4) {
    return `${label}${histTag} · ${meta.role}. Regno del Siam sovrano e neutrale (fino al giugno 1939 lo Stato porta il nome ufficiale di Sayam sotto il Consiglio di Reggenza per il giovane Re Ananda Mahidol e i governi Phraya Phahon / primo gabinetto Phibunsongkhram dal dic 1938).`;
  }
  if (s <= 6) {
    return `${label}${histTag} · ${meta.role}. Dal 24 giugno 1939 (Rathaniyom n. 1) il Paese adotta il nome ufficiale di Regno di Thailandia (Ratcha-anachak Thai); nel giugno 1940 firma patti di non aggressione con Francia e Regno Unito mentre cresce la spinta irredentista sui territori del Mekong e cambogiani.`;
  }
  if (s === 7) {
    if (sp?.s7) return sp.s7;
    if (meta.region === 'EAST' || meta.region === 'ISAN') {
      return `${label}${histTag} · ${meta.role}. Ottobre 1940: mobilitazione lungo il confine orientale verso l'Indocina francese di Vichy e duelli aerei/d'artiglieria preliminari alla Guerra Franco-Thailandese.`;
    }
    return `${label}${histTag} · ${meta.role}. Mobilitazione nazionale del Regno di Thailandia (ottobre 1940) a sostegno della pressione diplomatica e militare sull'Indocina francese.`;
  }
  if (s === 8) {
    if (sp?.s8) return sp.s8;
    if (meta.region === 'EAST' || meta.region === 'ISAN' || meta.region === 'NORTH') {
      return `${label}${histTag} · ${meta.role}. Esito della Guerra Franco-Thailandese (nov 1940 – gen 1941): armistizio sotto mediazione giapponese (31 gennaio 1941) e preparazione degli accordi di Tokyo del 9 maggio 1941 per l'annessione di Battambang, Siem Reap, Champasak e Sayaboury.`;
    }
    return `${label}${histTag} · ${meta.role}. Retrovia nazionale al termine della Guerra Franco-Thailandese (primavera 1941), mentre la mediazione di Tokyo consolida le acquisizioni territoriali ai confini indocinesi.`;
  }
  if (s === 9) {
    if (sp?.s9) return sp.s9;
    if (meta.region === 'SOUTH' || meta.region === 'WEST') {
      return `${label}${histTag} · ${meta.role}. L'8 dicembre 1941 forze anfibie e terrestri giapponesi attraversano il territorio thailandese verso la Malesia e la Birmania; dopo l'ordine di cessate il fuoco di Bangkok e il Trattato d'Alleanza del 21 dicembre 1941 il Paese entra nell'orbita dell'Asse.`;
    }
    return `${label}${histTag} · ${meta.role}. Dicembre 1941: cessate le brevi resistenze dell'8 dicembre, il governo Phibunsongkhram firma il 21 dicembre 1941 il Trattato d'Alleanza con il Giappone concedendo il transito militare verso Birmania e Malesia.`;
  }
  if (s >= 10 && s <= 13) {
    if (sp?.s10_13) return sp.s10_13;
    if (meta.region === 'NORTH') {
      return `${label}${histTag} · ${meta.role}. Retrovie dell'Armata Phayap thailandese impiegata dal maggio 1942 nell'occupazione di Kengtung e Mongpan (Stati Shan — Saharat Thai Doem).`;
    }
    if (meta.region === 'SOUTH') {
      return `${label}${histTag} · ${meta.role}. Retrovia logistica costiera delle forze giapponesi fra il Golfo e la Malesia (con l'accordo di agosto 1943 vengono annessi alla Thailandia i 4 sultanati settentrionali Si Rat Malai).`;
    }
    return `${label}${histTag} · ${meta.role}. Provincia del Regno di Thailandia sotto l'alleanza militare con Tokyo (1942–1943): mobilitazione bellica, razionamenti e prima strutturazione segreta del movimento Seri Thai.`;
  }
  if (s >= 14 && s <= 17) {
    if (sp?.s14_17) return sp.s14_17;
    if (meta.region === 'ISAN' || meta.region === 'NORTH') {
      return `${label}${histTag} · ${meta.role}. Sotto il governo civile di Khuang Aphaiwong (dal luglio 1944), nelle zone rurali e boscose si espande la rete clandestina di guerriglia Seri Thai rifornita per via aerea da Force 136 e OSS in attesa dell'offensiva antigiapponese.`;
    }
    return `${label}${histTag} · ${meta.role}. Estate 1944 – aprile 1945: dopo la caduta parlamentare di Phibunsongkhram sulla questione di Phetchabun, il gabinetto Khuang Aphaiwong coordina copertamente con Pridi Banomyong la preparazione clandestina Seri Thai sotto crescenti raid aerei alleati.`;
  }
  if (s === 18) {
    if (sp?.s18) return sp.s18;
    return `${label}${histTag} · ${meta.role}. Agosto–settembre 1945: con la Dichiarazione di Pace del Reggente Pridi Banomyong (16 agosto) e il governo Seri Thai di Seni Pramoj (17 settembre), la Thailandia revoca gli atti bellici del 1942, avvia la smobilitazione giapponese e riconsegna i territori occupati.`;
  }
  if (s === 19) {
    if (sp?.s19) return sp.s19;
    return `${label}${histTag} · ${meta.role}. Settembre 1947: regnante Re Bhumibol Adulyadej (Rama IX), dopo gli accordi anglo-siamesi (gen 1946), l'Accordo di Washington con la Francia (17 nov 1946) e l'ingresso all'ONU (16 dic 1946), la Thailandia è rientrata nei confini prebellici del 1938.`;
  }
  if (s === 20 || s === 21) {
    if (sp?.s20_21) return sp.s20_21;
    return `${label}${histTag} · ${meta.role}. Dopo il colpo di Stato militare dell'8 novembre 1947 (Khana Ratthaprahan) che estromette Pridi Banomyong, la fazione militare affida una breve transizione a Khuang Aphaiwong e l'8 aprile 1948 riporta al potere il Maresciallo Plaek Phibunsongkhram.`;
  }
  if (sp?.s22) return sp.s22;
  return `${label}${histTag} · ${meta.role}. Dicembre 1948: consolidamento interno del governo Phibunsongkhram dopo il fallito Complotto dello Stato Maggiore (1° ottobre 1948) e crescente cooperazione anticomunista con il blocco occidentale nel Sud-Est Asiatico.`;
}

export function resolveThailandProvince(ft: any, s: number): ResolvedTerritory | null {
  const p = ft?.properties || {};
  const candIds = [ft?.id, p.id, p.NUTS_ID]
    .filter(Boolean)
    .map((x) => String(x).trim().toUpperCase());

  let meta: ThailandProvinceSpec | undefined;
  for (const cid of candIds) {
    if (THAILAND_PROVINCES_META[cid]) {
      meta = THAILAND_PROVINCES_META[cid];
      break;
    }
  }

  if (!meta && p.REGION_KIND === 'THAILAND_PROVINCE') {
    const raw = String(p.name || p.NAME_LATN || p.NUTS_NAME || p.NAME || '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
    for (const item of Object.values(THAILAND_PROVINCES_META)) {
      const sNrm = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (raw && (raw === sNrm || raw.includes(sNrm))) {
        meta = item;
        break;
      }
    }
  }

  if (!meta) return null;

  const note = buildRegionalNote(meta, s);

  // Steps 0–4: Regno del Siam (pre-Rathaniyom 24 Giu 1939)
  if (s <= 4) {
    const pm = s >= 3 ? 'P.M. Plaek Phibunsongkhram' : 'P.M. Phraya Phahon Phonphayuhasena';
    return makeResult(
      'SIA',
      `${meta.name} — Regno del Siam (Sayam)`,
      note,
      'Neutrale',
      `Prathet Sayam (Regno del Siam · Reggenza per Re Ananda Mahidol · ${pm})`
    );
  }

  // Steps 5–8: Regno di Thailandia (dal 24 Giu 1939) — Neutralità & Guerra Franco-Thailandese
  if (s <= 8) {
    return makeResult(
      'SIA',
      `${meta.name} — Regno di Thailandia (${s >= 7 ? 'Crisi Indocinese' : 'Ratcha-anachak Thai'})`,
      note,
      'Neutrale',
      'Ratcha-anachak Thai (Regno di Thailandia · P.M. Plaek Phibunsongkhram)'
    );
  }

  // Steps 9–17: Alleanza militare con il Giappone (Asse) fino al crollo del 1945
  if (s <= 17) {
    const pmWar = s >= 14 ? 'P.M. Khuang Aphaiwong (Rete Clandestina Seri Thai)' : 'Maresciallo Plaek Phibunsongkhram (Alleanza con il Giappone)';
    return makeResult(
      'SIA',
      `${meta.name} — Ratcha-anachak Thai (${s >= 14 ? 'Governo Khuang & Seri Thai' : 'Alleanza con il Giappone'})`,
      note,
      'Asse',
      `Ratcha-anachak Thai — ${pmWar}`
    );
  }

  // Step 18: Governo di Pace Seri Thai (Settembre 1945)
  if (s === 18) {
    return makeResult(
      'SIA',
      `${meta.name} — Regno di Thailandia (Governo di Pace Seri Thai)`,
      note,
      'Neutrale',
      'Ratcha-anachak Thai — Governo Seri Thai (Reggente Pridi Banomyong / P.M. Seni Pramoj)'
    );
  }

  // Step 19: Post-Trattato di Washington & ONU (Settembre 1947)
  if (s === 19) {
    return makeResult(
      'SIA',
      `${meta.name} — Regno di Thailandia (Post-Trattato di Washington & ONU)`,
      note,
      'Neutrale',
      'Ratcha-anachak Thai — Re Bhumibol Adulyadej (Rama IX) / P.M. Thawan Thamrongnawasawat'
    );
  }

  // Steps 20–22: Golpe dell'8 Nov 1947 & Ritorno di Phibunsongkhram (Apr–Dic 1948)
  const postLabel =
    s === 20
      ? `${meta.name} — Regno di Thailandia (Post-Golpe Militare dell'8 Novembre 1947)`
      : `${meta.name} — Regno di Thailandia (Governo Phibunsongkhram · ${s === 22 ? 'Dicembre 1948' : 'Giugno 1948'})`;
  const postAdmin =
    s === 20
      ? 'Ratcha-anachak Thai — Khana Ratthaprahan / P.M. Khuang Aphaiwong (Re Rama IX)'
      : 'Ratcha-anachak Thai — Maresciallo Plaek Phibunsongkhram (Re Bhumibol Adulyadej Rama IX)';
  return makeResult('SIA', postLabel, note, 'Neutrale', postAdmin);
}
