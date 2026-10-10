/**
 * Precision Historical Geometries & Enclaves (1936-1940)
 *
 * Preserves full Eurostat NUTS provincial granularity across Europe while
 * providing specialized historical enclaves and non-NUTS territories:
 *
 * 1. Subcarpathian Ruthenia / Kárpátalja (Podkarpatská Rus: Užhorod, Mukačevo, Chust, Rachiv)
 * 2. Free City of Danzig / Freie Stadt Danzig (League of Nations -> German Reich 1939)
 * 3. Memel Territory / Klaipėdos kraštas (Lithuanian autonomy -> German Reich Mar 1939)
 * 4. Province of Zara (Italian Dalmatian enclave & Adriatic islands)
 * 5. Province of Carnaro / Fiume (Fiume, Abbazia, Cherso, Lussino)
 * 6. Panama Canal Zone (USA)
 * 7. Kresy Wschodnie — Województwo Wileńskie (Wilno, Brasław, Oszmiana, Święciany, Mołodeczno)
 * 8. Kresy Wschodnie — Województwo Nowogródzkie (Nowogródek, Baranowicze, Lida, Nieśwież, Słonim, Stołpce)
 * 9. Kresy Wschodnie — Województwo Poleskie (Brześć nad Bugiem, Pińsk, Kobryń, Łuniniec, Prużana, Stolin)
 * 10. Kresy Wschodnie — Województwo Wołyńskie (Łuck, Równe, Dubno, Kowel, Krzemieniec, Kostopol)
 * 11. Kresy Wschodnie — Województwo Tarnopolskie (Tarnopol, Brody, Brzeżany, Buczacz, Czortków, Zaleszczyki)
 * 12. Kresy Wschodnie — Województwo Stanisławowskie (Stanisławów, Kołomyja, Stryj, Kałusz, Nadwórna, Hoverla)
 * 13. Kresy Wschodnie — Województwo Lwowskie Orientale (Lwów, Drohobycz, Borysław, Sambor, Rawa Ruska)
 */

import { makeResult } from './georesolver';
import { ResolvedTerritory } from '../types';
import {
  BOSNIA_FEDERATION_FEATURE,
  BOSNIA_SRPSKA_FEATURE,
  BOSNIA_BRCKO_FEATURE,
  BOSNIA_REGIONAL_FEATURES,
  BOSNIA_HERZEGOVINA_FEATURE,
} from './bosniaRegions';

// ----------------------------------------------------------------------------
// 1. RUTENIA SUBCARPATICA / CARPATHIAN RUTHENIA (Kárpátalja / Podkarpatská Rus)
// Užhorod, Mukačevo, Berehove, Chust, Tjačiv, Rachiv, Jasina
// Arco carpatico storicamente integrato nella Cecoslovacchia (1919-1939) e poi Ungheria (1939+)
// ----------------------------------------------------------------------------
export const CARPATHIAN_RUTHENIA_FEATURE: any = {
  type: 'Feature',
  properties: {
    NAME: 'Carpathian Ruthenia',
    NUTS_NAME: 'Rutenia Subcarpatica (Podkarpatská Rus / Kárpátalja)',
    NAME_ENGL: 'Carpathian Ruthenia',
    CNTR_NAME: 'Rutenia Subcarpatica',
    CNTR_ID: 'RUTHENIA',
    CNTR_CODE: 'RUTHENIA',
    ADMIN: 'Carpathian Ruthenia',
    SOVEREIGNT: 'Czechoslovakia / Hungary',
    CAPITAL: 'Chust (Khust) / Užhorod (Ungvár)',
    HISTORICAL_NOTE:
      'Podkarpatská Rus — Terra autonoma cecoslovacca (1919-1938). Con il Primo Arbitrato di Vienna (nov 1938) la fascia con Užhorod e Mukačevo passa all\'Ungheria; a Chust si forma il governo autonomo di Avhustyn Vološyn che proclama la Repubblica di Carpato-Ucraina il 15 marzo 1939 prima dell\'invasione ungherese.',
  },
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [
                22.155753,
                48.403496
        ],
        [
                22.248351,
                48.411842
        ],
        [
                22.364519,
                48.255359
        ],
        [
                22.500891,
                48.23971
        ],
        [
                22.606958,
                48.107221
        ],
        [
                22.820775,
                48.110351
        ],
        [
                22.871283,
                48.042541
        ],
        [
                22.849396,
                47.991423
        ],
        [
                22.896537,
                47.953867
        ],
        [
                22.935259,
                47.969516
        ],
        [
                22.938627,
                48.011245
        ],
        [
                23.073315,
                48.011245
        ],
        [
                23.125506,
                48.0874
        ],
        [
                23.174331,
                48.109308
        ],
        [
                23.251776,
                48.096789
        ],
        [
                23.357843,
                48.014374
        ],
        [
                23.494214,
                47.967429
        ],
        [
                23.534621,
                48.011245
        ],
        [
                23.768641,
                47.992467
        ],
        [
                23.854505,
                47.945522
        ],
        [
                24.007712,
                47.9643
        ],
        [
                24.233315,
                47.901706
        ],
        [
                24.430296,
                47.965343
        ],
        [
                24.588554,
                47.960127
        ],
        [
                24.661482,
                47.884326
        ],
        [
                24.6459,
                47.9144
        ],
        [
                24.6066,
                48.0102
        ],
        [
                24.6642,
                48.0213
        ],
        [
                24.6066,
                48.0867
        ],
        [
                24.6242,
                48.2273
        ],
        [
                24.477,
                48.272
        ],
        [
                24.4119,
                48.3648
        ],
        [
                24.3113,
                48.3388
        ],
        [
                24.1884,
                48.5131
        ],
        [
                24.0904,
                48.4591
        ],
        [
                24.032,
                48.4909
        ],
        [
                23.9593,
                48.4575
        ],
        [
                23.9202,
                48.5427
        ],
        [
                23.8915,
                48.5831
        ],
        [
                23.8878,
                48.5882
        ],
        [
                23.7698,
                48.5764
        ],
        [
                23.717,
                48.637
        ],
        [
                23.6232,
                48.6804
        ],
        [
                23.5541,
                48.6592
        ],
        [
                23.4873,
                48.6804
        ],
        [
                23.4873,
                48.7253
        ],
        [
                23.4122,
                48.7205
        ],
        [
                23.2541,
                48.7947
        ],
        [
                23.0725,
                48.7842
        ],
        [
                23.0499,
                48.8447
        ],
        [
                22.8798,
                49.0147
        ],
        [
                22.8407,
                49.0239
        ],
        [
                22.840802,
                49.024026
        ],
        [
                22.566551,
                49.088894
        ],
        [
                22.541297,
                49.015868
        ],
        [
                22.467219,
                48.977269
        ],
        [
                22.383039,
                48.862515
        ],
        [
                22.339265,
                48.693512
        ],
        [
                22.167538,
                48.572499
        ],
        [
                22.155753,
                48.403496
        ]
]
    ],
  },
  __layer: 'prov',
  __kind: 'CARPATHIAN_RUTHENIA',
  __resolve: (s: number): ResolvedTerritory => {
    if (s < 2) {
      return makeResult(
        'CZE',
        'Podkarpatská Rus',
        'Krajina Podkarpatoruská (Československá republika)'
      );
    }
    if (s === 2) {
      return makeResult(
        'CZE',
        'Karpatska Ukrajina (Chust)',
        'Karpatska Ukrajina — Avtonomnyj kraj (Chust)'
      );
    }
    return makeResult(
      'HUN',
      'Kárpátalja',
      'Kárpátaljai Kormányzóság (Magyar Királyság, 1939)'
    );
  },
};

// ----------------------------------------------------------------------------
// 2. CITTÀ LIBERA DI DANZICA (Freie Stadt Danzig / Wolne Miasto Gdańsk)
// Foce della Vistola, Zoppot, Westerplatte, Tiegenhof
// ----------------------------------------------------------------------------
export const DANZIG_FREE_CITY_FEATURE: any = {
  type: 'Feature',
  properties: {
    NAME: 'Free City of Danzig',
    NUTS_NAME: 'Città Libera di Danzica (Freie Stadt Danzig)',
    NAME_ENGL: 'Free City of Danzig',
    CNTR_NAME: 'Danzica',
    CNTR_ID: 'DANZIG',
    CNTR_CODE: 'DANZIG',
    ADMIN: 'Freie Stadt Danzig',
    SOVEREIGNT: 'League of Nations / Germany',
    CAPITAL: 'Danzig (Gdańsk)',
    HISTORICAL_NOTE:
      'Città-stato semi-indipendente istituita dal Trattato di Versailles (1920) sotto la Società delle Nazioni e unione doganale polacca. Il 1° settembre 1939 l\'attacco alla guarnigione polacca della Westerplatte segna l\'inizio della Seconda Guerra Mondiale; incorporata nel Reichsgau Danzig-Westpreußen.',
  },
  geometry: {"type":"Polygon","coordinates":[[[18.44,54.37],[18.48,54.41],[18.52,54.44],[18.555,54.462],[18.572371368568394,54.46323251869534],[18.611776076428306,54.42497972932601],[18.751514828526204,54.37490502433043],[18.95017956042441,54.358213455998566],[19.359294220180892,54.37281857828894],[19.63877172437669,54.45836286598973],[19.648873320913886,54.45314675088602],[19.266696251923257,54.342565110687445],[19.25659465538606,54.27892850642223],[19.317204234609243,54.20381644892886],[19.217871868660133,54.1161857151866],[18.995636744841796,54.18086554247256],[18.692588848725883,54.14956885185033],[18.661893165964905,54.13873788935673],[18.6,54.18],[18.5,54.28],[18.44,54.37]]]},
  __layer: 'prov',
  __kind: 'DANZIG_CITY',
  __resolve: (s: number): ResolvedTerritory => {
    if (s < 5) {
      return makeResult(
        'DANZIG',
        'Freie Stadt Danzig',
        'Freie Stadt Danzig (Völkerbund-Mandat)'
      );
    }
    return makeResult(
      'GER',
      'Danzig (Reichsgau Danzig-Westpreußen)',
      'Reichsgau Danzig-Westpreußen (Gauleiter Albert Forster)'
    );
  },
};

// ----------------------------------------------------------------------------
// 3. TERRITORIO DI MEMEL (Memelland / Klaipėdos kraštas)
// Riva destra del fiume Nemunas / Neman: Klaipėda, Šilutė, Pagėgiai fino a Smalininkai
// ----------------------------------------------------------------------------
export const MEMEL_TERRITORY_FEATURE: any = {
  type: 'Feature',
  properties: {
    NAME: 'Memel Territory',
    NUTS_NAME: 'Territorio di Memel (Memelland)',
    NAME_ENGL: 'Memel Territory (Klaipėda)',
    CNTR_NAME: 'Memelland',
    CNTR_ID: 'MEMEL',
    CNTR_CODE: 'MEMEL',
    ADMIN: 'Memelland',
    SOVEREIGNT: 'Lithuania / Germany',
    CAPITAL: 'Memel (Klaipėda)',
    HISTORICAL_NOTE:
      'Regione autonoma sotto sovranità lituana dal 1923 (Convenzione di Klaipėda). Il 20-22 marzo 1939, a seguito dell\'ultimatum tedesco, viene ceduta al Reich ed incorporata nella Provincia della Prussia Orientale (Regierungsbezirk Gumbinnen).',
  },
  geometry: {"type":"Polygon","coordinates":[[[20.957030072480926,55.281465829354545],[21.022690449972707,55.3638804479931],[21.03615924535564,55.3868313544494],[21.096768824578824,55.61112430390877],[21.08229059554893,55.818407814603646],[21.2,55.81],[21.3,55.78],[21.43,55.7],[21.55,55.58],[21.65,55.5],[21.75,55.35],[21.971532903531333,55.35],[21.864490161405804,55.273120045188605],[21.864490161405804,55.213656333006355],[21.76684139487957,55.227218232276],[21.687712222004855,55.204267325819686],[21.650673034701803,55.18027319634264],[21.49409828837525,55.194878318633016],[21.38298072646608,55.28563872143751],[21.273546763979773,55.24599624664934],[21.229773178985248,55.47446208819166],[21.17084719918494,55.570438606099856],[21.07824923092729,55.395177138615324],[21.002487256898313,55.27416326820935],[20.957030072480926,55.281465829354545]]]},
  __layer: 'prov',
  __kind: 'MEMEL_TERRITORY',
  __resolve: (s: number): ResolvedTerritory => {
    if (s < 3) {
      return makeResult(
        'LIT',
        'Klaipėdos kraštas',
        'Lietuvos Respublika (Klaipėdos krašto direktorija)'
      );
    }
    return makeResult(
      'GER',
      'Memelland (Regierungsbezirk Gumbinnen)',
      'Provinz Ostpreußen (Deutsches Reich)'
    );
  },
};

// ----------------------------------------------------------------------------
// 4. PROVINCIA DI ZARA (Trattato di Rapallo 1920)
// Enclave costiera di Zara + Arcipelago di Lagosta (Lastovo), Cazza e Pelagosa + Isola di Saseno
// ----------------------------------------------------------------------------
export const ZARA_ENCLAVE_FEATURE: any = {
  type: 'Feature',
  properties: {
    NAME: 'Zara',
    NUTS_NAME: 'Provincia di Zara (Dalmazia Italiana)',
    NAME_ENGL: 'Province of Zara (Italian Dalmatia)',
    CNTR_NAME: 'Provincia di Zara',
    CNTR_ID: 'IT_ZARA',
    CNTR_CODE: 'IT_ZARA',
    ADMIN: 'Provincia di Zara',
    SOVEREIGNT: 'Kingdom of Italy',
    CAPITAL: 'Zara (Zadar)',
    HISTORICAL_NOTE:
      'Trattato di Rapallo (12 novembre 1920) — Enclave italiana sulla costa dalmata (comune di Zara, Borgo Erizzo, Boccagnazzo, Cerno, Diclo) e isole adriatiche di Lagosta (Lastovo), Cazza (Sušac), Pelagosa (Palagruža) e Saseno (Sazan). Circondata dalla Banovina di Croazia / Jugoslavia.',
  },
  geometry: {"type":"MultiPolygon","coordinates":[[[[15.175,44.172],[15.215,44.182],[15.275,44.178],[15.335,44.152],[15.348,44.115],[15.312,44.082],[15.275,44.068],[15.242,44.095],[15.228,44.118],[15.205,44.158],[15.175,44.172]]],[[[16.943329048367893,42.76591924952224],[16.90628986106484,42.726276774734075],[16.82379348934439,42.73149288983778],[16.786754302041338,42.76174635743928],[16.855781878378856,42.77843792577113],[16.943329048367893,42.76591924952224]]],[[[16.485,42.772],[16.525,42.768],[16.518,42.745],[16.478,42.752],[16.485,42.772]]],[[[16.33554965671319,42.37262417070281],[16.273256478067147,42.36845127861984],[16.253053284992752,42.38827251601392],[16.320397261907395,42.408093753408004],[16.33554965671319,42.37262417070281]]],[[[19.265,40.512],[19.298,40.518],[19.308,40.485],[19.272,40.478],[19.265,40.512]]]]},
  __layer: 'prov',
  __kind: 'ZARA_ENCLAVE',
  __resolve: (s: number): ResolvedTerritory => {
    return makeResult(
      'ITA',
      'Provincia di Zara (Enclave Italiana in Dalmazia)',
      'Regno d\'Italia — Trattato di Rapallo 1920 (Prefettura di Zara, Lagosta, Pelagosa e Saseno)'
    );
  },
};

// ----------------------------------------------------------------------------
// 5. PROVINCIA DEL CARNARO (Trattato di Roma 1924)
// Fiume, Abbazia, Laurana, Castua, Mattuglie, Cherso (Cres), Lussino (Lošinj), Unie e Sansego
// Il confine occidentale tocca e combacia perfettamente con l'Istria (HR036) lungo il Monte Maggiore
// ----------------------------------------------------------------------------
export const FIUME_CARNARO_FEATURE: any = {
  type: 'Feature',
  properties: {
    NAME: 'Fiume and Carnaro',
    NUTS_NAME: 'Provincia del Carnaro (Fiume, Cherso e Lussino)',
    NAME_ENGL: 'Province of Carnaro (Fiume)',
    CNTR_NAME: 'Provincia del Carnaro',
    CNTR_ID: 'IT_FIUME',
    CNTR_CODE: 'IT_FIUME',
    ADMIN: 'Provincia del Carnaro',
    SOVEREIGNT: 'Kingdom of Italy',
    CAPITAL: 'Fiume (Rijeka)',
    HISTORICAL_NOTE:
      'Trattato di Roma (27 gennaio 1924) — Assegnazione della città di Fiume all\'Italia. La Provincia del Carnaro comprendeva il capoluogo Fiume, Abbazia, Laurana, Castua, Mattuglie, Klana (congiungendosi direttamente con l\'Istria e il Carso) e le isole quarnarine di Cherso (Cres), Lussino (Lošinj), Unie e Sansego.',
  },
  geometry: {"type":"MultiPolygon","coordinates":[[[[14.111514819106937,45.48247199553235],[14.11824921679841,45.481428772511606],[14.290097130651274,45.476954672362744],[14.335,45.456],[14.368,45.421],[14.412,45.385],[14.435,45.352],[14.444,45.326],[14.43977220081268,45.313893120509036],[14.348902337731069,45.346853002836],[14.311863150428017,45.33120465752488],[14.225999579861842,45.15385674399887],[14.18896039255879,45.286346067633005],[14.204112787364586,45.35415556398118],[14.111514819106937,45.48247199553235]]],[[[14.473488695023171,44.962946931203234],[14.451601902525915,44.86175429819133],[14.5071606834805,44.66667159331273],[14.530731075400631,44.628072341545305],[14.495375487520441,44.610337550192696],[14.419613513491463,44.66667159331273],[14.397726720994193,44.66667159331273],[14.397726720994193,44.63015878758678],[14.387625124456996,44.619726557379366],[14.355636735422543,44.646850355918644],[14.345535138885346,44.66667159331273],[14.390992323302733,44.729264974557196],[14.318597548119477,44.88887809673061],[14.30176155389082,44.9139154492284],[14.305128752736557,44.935823132663955],[14.318597548119477,44.945212139850625],[14.364054732536879,44.90974255714542],[14.392675922725594,44.91808834131136],[14.350585937153944,45.04014543473808],[14.318597548119477,45.06309634119438],[14.279874761393565,45.104825262024036],[14.276507562547827,45.12047360733516],[14.296710755622222,45.1444677368122],[14.303445153313682,45.164288974206286],[14.318597548119477,45.173677981392956],[14.353953135999667,45.15489996701962],[14.40109391983993,45.0130216361988],[14.473488695023171,44.962946931203234]]],[[[14.574504660395142,44.45176765104003],[14.532414674823492,44.43298963666669],[14.518945879440558,44.474718557496345],[14.456652700794514,44.5268797085334],[14.463387098485974,44.54461449988601],[14.512211481749098,44.52166359342969],[14.54251627136069,44.47576178051709],[14.574504660395142,44.45176765104003]]],[[[14.42971511002866,44.5696518523838],[14.36573833195974,44.56130606821786],[14.390992323302733,44.6155536652964],[14.40782831753139,44.61451044227566],[14.42971511002866,44.5696518523838]]],[[[14.288292758507886,44.66667159331273],[14.256304369473433,44.646850355918644],[14.251253571204835,44.66667159331273],[14.276507562547827,44.687536053727555],[14.288292758507886,44.66667159331273]]],[[[14.269773164856367,44.631202010607524],[14.256304369473433,44.612423996234185],[14.2377847758219,44.63015878758678],[14.256304369473433,44.64372068685641],[14.269773164856367,44.631202010607524]]],[[[14.285,44.512],[14.322,44.508],[14.318,44.485],[14.278,44.492],[14.285,44.512]]]]},
  __layer: 'prov',
  __kind: 'FIUME_CARNARO',
  __resolve: (s: number): ResolvedTerritory => {
    return makeResult(
      'ITA',
      'Provincia del Carnaro (Fiume, Abbazia, Cherso e Lussino)',
      'Regno d\'Italia — Trattato di Roma 1924 (Prefettura del Carnaro)'
    );
  },
};

// ----------------------------------------------------------------------------
// 6. ZONA DEL CANALE DI PANAMA (Panama Canal Zone - USA)
// ----------------------------------------------------------------------------
export const PANAMA_CANAL_ZONE_FEATURE: any = {
  type: 'Feature',
  properties: {
    NAME: 'Panama Canal Zone',
    NUTS_NAME: 'Zona del Canale di Panama (USA)',
    NAME_ENGL: 'Panama Canal Zone',
    CNTR_NAME: 'Zona del Canale di Panama',
    CNTR_ID: 'US_PCZ',
    CNTR_CODE: 'US_PCZ',
    ADMIN: 'Panama Canal Zone',
    SOVEREIGNT: 'United States',
    CAPITAL: 'Balboa / Cristóbal',
    HISTORICAL_NOTE:
      'Trattato Hay-Bunau-Varilla (1903) — Striscia di 5 miglia su ciascun lato dell\'asse del Canale di Panama controllata e fortificata dagli Stati Uniti per il passaggio strategico tra l\'Oceano Atlantico e il Pacifico.',
  },
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-80.02, 9.38],
        [-79.88, 9.35],
        [-79.52, 8.95],
        [-79.60, 8.88],
        [-79.95, 9.24],
        [-80.02, 9.38],
      ],
    ],
  },
  __layer: 'prov',
  __kind: 'PANAMA_CANAL_ZONE',
  __resolve: (s: number): ResolvedTerritory => {
    return makeResult(
      'USA',
      'Panama Canal Zone',
      'Unorganized U.S. Territory (Military Governor)'
    );
  },
};

// ----------------------------------------------------------------------------
// 7. CORRIDOIO POLACCO / GDYNIA (Województwo Pomorskie)
// Gdynia, Puck, Wejherowo, Penisola di Hel
// ----------------------------------------------------------------------------
export const POLISH_CORRIDOR_GDYNIA_FEATURE: any = {
  type: 'Feature',
  id: 'PL_HIST_CORRIDOR',
  properties: {
    NAME: 'Polish Corridor',
    NUTS_NAME: 'Województwo Pomorskie — Gdynia e Corridoio Polacco (Puck / Hel)',
    NAME_ENGL: 'Polish Corridor (Gdynia)',
    CNTR_NAME: 'Polonia',
    CNTR_ID: 'POL_CORRIDOR',
    CNTR_CODE: 'POL',
    ADMIN: 'Województwo Pomorskie',
    SOVEREIGNT: 'Poland',
    CAPITAL: 'Gdynia',
    HISTORICAL_NOTE: 'Corridoio di Danzica (Polski Korytarz) — Accesso sovrano della Polonia al Mar Baltico con il porto strategico di Gdynia e la penisola di Hel.',
  },
  geometry: {"type":"MultiPolygon","coordinates":[[[[17.667276800200362,54.78280522544024],[17.970324696316275,54.82975026137359],[18.33061497280965,54.83183670741508],[18.40806054626149,54.79532390168913],[18.406376946838627,54.72960085138244],[18.541064900667926,54.58459285149941],[18.56126809374232,54.47401121130085],[18.572371368568394,54.46323251869534],[18.555,54.462],[18.52,54.44],[18.48,54.41],[18.44,54.37],[18.5,54.28],[18.6,54.18],[18.661893165964905,54.13873788935673],[18.571369690279518,54.10679670799993],[18.32724777396391,54.14122306768439],[18.180774624174553,54.19442744174219],[17.8002811546068,54.17773587341034],[17.717784782886348,54.21737834819851],[17.721151981732085,54.3185709812104],[17.80869915172112,54.40620171495266],[17.869308730944304,54.4145474991186],[17.87267592979004,54.47401121130085],[17.796913955761063,54.591895412644604],[17.8053319528754,54.67326680826241],[17.73630437653788,54.75359498085949],[17.667276800200362,54.78280522544024]]],[[[18.741413231989007,54.661791355034254],[18.754882027371927,54.66909391617945],[18.825593203132307,54.62527854930832],[18.81549160659511,54.591895412644604],[18.77845241929206,54.61275987305942],[18.741413231989007,54.661791355034254]]]]},
  __layer: 'prov',
  __kind: 'POLISH_CORRIDOR',
};
POLISH_CORRIDOR_GDYNIA_FEATURE.__resolve = (s: number): ResolvedTerritory => {
  if (s < 5) {
    return makeResult(
      'POL',
      'Województwo Pomorskie (Gdynia)',
      'Rzeczpospolita Polska (Gdynia, Puck, Hel)'
    );
  }
  return makeResult(
    'GER',
    'Gotenhafen (Reichsgau Danzig-Westpreußen)',
    'Reichsgau Danzig-Westpreußen'
  );
};

// ----------------------------------------------------------------------------
// 8. KOSOVO E METOCHIA (Regno di Jugoslavia 1918-1941)
// ----------------------------------------------------------------------------
export const KOSOVO_METOHIJA_FEATURE: any = {
  type: 'Feature',
  id: 'YUG_HIST_KOSOVO',
  properties: {
    NAME: 'Kosovo and Metohija',
    NUTS_NAME: 'Kosovo e Metochia (Pristina / Prizren)',
    NAME_ENGL: 'Kosovo and Metohija',
    CNTR_NAME: 'Regno di Jugoslavia',
    CNTR_ID: 'XK',
    CNTR_CODE: 'XK',
    ADMIN: 'Kosovo',
    SOVEREIGNT: 'Kingdom of Yugoslavia',
    CAPITAL: 'Pristina',
    HISTORICAL_NOTE: 'Regno di Jugoslavia — Territorio integrato nella Banovina del Vardar e Morava (1929-1941).',
  },
  geometry: {"type":"Polygon","coordinates":[[[20.029366790481653,42.7116716524437],[20.036101188173113,42.758616688377046],[20.0815583725905,42.776351479729655],[20.221297124688398,42.75340057327334],[20.278539505065844,42.823296515663],[20.35261787967196,42.83372874587042],[20.468786239849727,42.8535499832645],[20.512559824844253,42.886933119928216],[20.50582542715278,42.955785839297135],[20.65903297463361,43.02881145074903],[20.682603366553728,43.11644218449129],[20.652298576942137,43.151911767196495],[20.618626588484823,43.19259746500539],[20.818974919805903,43.27292563760247],[20.874533700760487,43.17381945063205],[20.923358084023597,43.145652429072044],[21.116972017653218,43.11957185355351],[21.169163599762065,43.01629277450013],[21.228089579562386,43.005860544292716],[21.268495965711175,42.90884080336379],[21.435172308574927,42.87232799763784],[21.409918317231934,42.748184458169646],[21.571543861827088,42.72940644379629],[21.660774631239,42.682461407862945],[21.753372599496636,42.701239422236284],[21.77862659083963,42.651164717240704],[21.709599014502125,42.53745340797992],[21.687712222004855,42.50198382527471],[21.650673034701803,42.469643911631735],[21.563125864712752,42.34341392612205],[21.586696256632884,42.263085753524976],[21.46716069760938,42.26517219956646],[21.443590305689263,42.23491873196497],[21.367828331660284,42.226572947799035],[21.3072187524371,42.109731969476016],[21.21293718475659,42.11077519249676],[21.165796400916342,42.18693047301087],[21.135491611304737,42.19110336509383],[21.095085225155948,42.19736270321828],[20.783619331925713,42.073219163750075],[20.753314542314122,42.013755451567825],[20.76341613885132,41.93760017105372],[20.714591755588195,41.864574559601834],[20.59505619656469,41.87709323585073],[20.608524991947625,41.95950785448928],[20.514243424267114,42.20988137946718],[20.366086675054895,42.306901120396105],[20.26001991141431,42.33402491893538],[20.18930873565393,42.469643911631735],[20.0765075743219,42.55623142235326],[20.100077966242033,42.65429438630294],[20.029366790481653,42.7116716524437]]]},
  __layer: 'prov',
  __kind: 'KOSOVO',
};
KOSOVO_METOHIJA_FEATURE.__resolve = (s: number): ResolvedTerritory => {
  return makeResult(
    'YUG',
    'Kosovo i Metohija',
    'Kraljevina Jugoslavija (Vardarska, Zetska i Moravska banovina)'
  );
};

// ----------------------------------------------------------------------------
// 9. KÖNIGSBERG IN PREUSSEN / OSTPREUSSEN (Nord-Ostpreußen — Versailles 1919-1945)
// Königsberg, Insterburg, Gumbinnen, Tilsit, Pillau
// ----------------------------------------------------------------------------
export const KONIGSBERG_OSTPREUSSEN_FEATURE: any = {
  type: 'Feature',
  id: 'DE_HIST_KONIGSBERG',
  properties: {
    NAME: 'Königsberg',
    NUTS_NAME: 'Königsberg in Preußen',
    NAME_ENGL: 'Königsberg in Prussia',
    CNTR_NAME: 'Reich Tedesco',
    CNTR_ID: 'DE_KONIGSBERG',
    CNTR_CODE: 'DE',
    ADMIN: 'Provinz Ostpreußen',
    SOVEREIGNT: 'Germany',
    CAPITAL: 'Königsberg in Preußen',
    HISTORICAL_NOTE:
      'Hauptstadt der Provinz Ostpreußen — Enclave tedesca separata dal Corridoio Polacco a seguito del Trattato di Versailles (1919). Roccaforte del Baltico e centro del I Armeekorps della Wehrmacht.',
  },
  geometry: {"type":"MultiPolygon","coordinates":[[[[21.271592614065696,55.24463212704518],[21.381229148141387,55.27895223363177],[21.65110369355841,55.18089478624154],[22.0812162503168,55.04116292371043],[22.587231022973725,55.07058015792751],[22.86553914793504,54.8180822308976],[22.692650767277257,54.56558430386772],[22.79385372180863,54.36456653671772],[21.558334318571298,54.32289212157684],[20.314381335789676,54.40133807948905],[19.80414977336062,54.4430124946299],[20.187877642625438,54.63667595322565],[20.010772472195526,54.7567963262787],[20.023422841511945,54.89652818880981],[21.136655341357198,54.94065404013543],[21.216774347027865,55.014197125678095],[21.271592614065696,55.24463212704518]]],[[[19.850534460854163,54.65138457033419],[19.909569517664153,54.70286473021406],[19.960170994929825,54.693058985475034],[19.98968852333482,54.62687020848662],[19.884268779031288,54.614613027562854],[19.850534460854163,54.65138457033419]]]]},
  __layer: 'prov',
  __kind: 'KONIGSBERG',
};
KONIGSBERG_OSTPREUSSEN_FEATURE.__resolve = (s: number): ResolvedTerritory => {
  return makeResult(
    'GER',
    'Königsberg in Preußen (Ostpreußen)',
    'Provinz Ostpreußen (Hauptstadt Königsberg / I. Armeekorps)'
  );
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// 10. BOSNIA ED ERZEGOVINA (Regno di Jugoslavia 1918-1941) — Alta Risoluzione ba.json
// Sarajevo, Banja Luka, Mostar, Tuzla, Zenica, Bihać, Brčko
// Suddivisa nelle 3 entità storiche: Federacija BiH, Republika Srpska e Distretto di Brčko
// ----------------------------------------------------------------------------
export {
  BOSNIA_FEDERATION_FEATURE,
  BOSNIA_SRPSKA_FEATURE,
  BOSNIA_BRCKO_FEATURE,
  BOSNIA_REGIONAL_FEATURES,
  BOSNIA_HERZEGOVINA_FEATURE,
};

// ----------------------------------------------------------------------------
// 11. LITORALE LITUANO — PALANGA E KRETINGA (Nord Klaipėdos apskritis)
// ----------------------------------------------------------------------------
export const LITHUANIA_PALANGA_FEATURE: any = {
  type: 'Feature',
  id: 'LT_HIST_PALANGA',
  properties: {
    NAME: 'Palanga and Kretinga',
    NUTS_NAME: 'Litorale Lituano (Palanga / Kretinga)',
    NAME_ENGL: 'Lithuanian Coast (Palanga)',
    CNTR_NAME: 'Lituania',
    CNTR_ID: 'LT',
    CNTR_CODE: 'LT',
    ADMIN: 'Klaipėdos apskritis (Nord)',
    SOVEREIGNT: 'Lithuania',
    CAPITAL: 'Palanga / Kretinga',
    HISTORICAL_NOTE: 'Costa baltica storicamente lituana (Palanga, Kretinga, Skuodas). Accesso marittimo sovrano della Repubblica di Lituania.',
  },
  geometry: {"type":"Polygon","coordinates":[[[21.064780435544357,56.06909921001416],[21.201151988796532,56.084747555325265],[21.244925573791043,56.161946058860124],[21.52440307798684,56.30278116666018],[21.687712222004855,56.31217017384685],[21.97897492216071,56.385195785298734],[21.940252135434783,56.32886174217872],[21.970556925046374,56.30799728176389],[22.00254531408084,56.203674979689765],[21.918365342937527,56.12960614521714],[21.751689000073775,56.10143912365713],[21.687712222004855,56.052407641682294],[21.59511425374722,55.99294392950004],[21.598481452592956,55.877146174197776],[21.52440307798684,55.81455279295329],[21.687712222004855,55.75508908077104],[21.750005400650913,55.74674329660512],[21.805564181605497,55.629902318282106],[21.8796425562116,55.59651918161839],[21.834185371794213,55.557919929850954],[21.83250177237135,55.504715555793155],[21.8796425562116,55.43168994434127],[21.989076518697907,55.42334416017535],[22.012646910618038,55.37952879330422],[21.971532903531333,55.35],[21.75,55.35],[21.65,55.5],[21.55,55.58],[21.43,55.7],[21.3,55.78],[21.2,55.81],[21.08229059554893,55.818407814603646],[21.064780435544357,56.06909921001416]]]},
  __layer: 'prov',
  __kind: 'PALANGA',
};
LITHUANIA_PALANGA_FEATURE.__resolve = (s: number): ResolvedTerritory => {
  if (s < 6) {
    return makeResult(
      'LIT',
      'Palanga ir Kretinga',
      'Lietuvos Respublika (Klaipėdos apskritis)'
    );
  }
  return makeResult(
    'SOV',
    'Palanga (Litovskaya SSR)',
    'Litovskaya SSR'
  );
};

// ----------------------------------------------------------------------------
// 12. MONTE ARARAT E DISTRETTO DI DOĞUBAYAZIT (Frontiera Turco-Iraniana e Caucaso)
// ----------------------------------------------------------------------------
export const TURKEY_MOUNT_ARARAT_FEATURE: any = {
  type: 'Feature',
  id: 'TUR_HIST_ARARAT',
  properties: {
    NAME: 'Mount Ararat and Doğubayazıt',
    NUTS_NAME: 'Monte Ararat e Doğubayazıt (Ağrı Dağı)',
    NAME_ENGL: 'Mount Ararat and Doğubayazıt',
    CNTR_NAME: 'Turchia',
    CNTR_ID: 'TR',
    CNTR_CODE: 'TR',
    ADMIN: 'Provincia di Ağrı / Iğdır (Frontiera Orientale)',
    SOVEREIGNT: 'Republic of Turkey',
    CAPITAL: 'Doğubayazıt',
    HISTORICAL_NOTE:
      'Massiccio del Monte Ararat (Büyük Ağrı e Küçük Ağrı) e distretto confinario di Doğubayazıt — Territorio sovrano della Repubblica di Turchia. Il settore del Piccolo Ararat venne unificato alla Turchia a seguito dell\'accordo confinario turco-iraniano del 1932 (scambio territoriale di Kotur), sigillando la frontiera con l\'Iran e il Caucaso sovietico.',
  },
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [44.40957003300715, 39.42656236012963],
        [44.502168001264785, 39.716578359895685],
        [44.60991836432823, 39.778128518119416],
        [44.68062954008861, 39.735356374269024],
        [44.736188321043194, 39.70197323760531],
        [44.749657116426114, 39.68945456135641],
        [44.40957003300715, 39.42656236012963],
      ],
    ],
  },
  __layer: 'prov',
  __kind: 'ARARAT',
};
TURKEY_MOUNT_ARARAT_FEATURE.__resolve = (_s: number): ResolvedTerritory => {
  return makeResult(
    'TUR',
    'Ağrı Dağı ve Doğubayazıt',
    'Türkiye Cumhuriyeti (Ağrı İli)'
  );
};

// ----------------------------------------------------------------------------
// 13. GUIANA FRANCESE / FRENCH GUIANA (Colonie de Guyane — Cayenne)
// ----------------------------------------------------------------------------
export const FRENCH_GUIANA_FEATURE: any = {
  type: 'Feature',
  id: 'FR_HIST_GUIANA',
  properties: {
    NAME: 'French Guiana',
    NUTS_ID: 'FRY30',
    NUTS_NAME: 'Guiana Francese (Cayenne)',
    NAME_ENGL: 'French Guiana',
    CNTR_NAME: 'Guiana Francese',
    CNTR_ID: 'GF',
    CNTR_CODE: 'FR',
    ADMIN: 'Colonie de Guyane',
    SOVEREIGNT: 'France',
    CAPITAL: 'Cayenne',
    HISTORICAL_NOTE:
      'Colonie de Guyane (Cayenne) — Territorio coloniale della Repubblica Francese in Sud America. Confinante a ovest con la Guiana Olandese (Suriname) lungo il fiume Maroni e a sud ed est con gli Stati Uniti del Brasile lungo la catena montuosa dei Tumuc-Humac e il fiume Oyapock.',
  },
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-51.62341782132032, 4.215936265901369],
        [-51.616723027619145, 4.025991044954104],
        [-52.112790074738285, 3.285596452668948],
        [-52.30506607571485, 2.941168390229983],
        [-52.502839055451176, 2.495001874879641],
        [-52.71179672757032, 2.188624940828127],
        [-52.8463868764961, 2.092475019410891],
        [-53.09821030178907, 2.10368450732593],
        [-53.59794327298047, 2.278708539918703],
        [-53.994721379669926, 2.002992235139651],
        [-54.09599014798047, 2.034172855333132],
        [-54.388329472931645, 2.261286817506594],
        [-54.16830917874219, 2.694873414949221],
        [-53.97731110134961, 3.357142053560061],
        [-53.99023529568555, 3.554147563890261],
        [-54.224938359650395, 3.934184871629519],
        [-54.26356979885938, 4.232750497773928],
        [-54.323883977326176, 4.518472276643557],
        [-54.36608978787305, 4.689873300508303],
        [-54.30420013943555, 4.957256875947756],
        [-54.12839218655469, 5.295245252565188],
        [-53.83686157742383, 5.689471326783938],
        [-53.73890396633985, 5.647584997133059],
        [-53.27408310452344, 5.515142522767825],
        [-53.02668091336133, 5.426703058198733],
        [-52.66687866726758, 5.179635606721682],
        [-52.09794708767774, 4.691536985353274],
        [-51.85281845608594, 4.437868677095217],
        [-51.71012589016797, 4.228457056001467],
        [-51.62341782132032, 4.215936265901369],
      ],
    ],
  },
  __layer: 'prov',
  __kind: 'FRENCH_GUIANA',
};

FRENCH_GUIANA_FEATURE.__resolve = (step: number): ResolvedTerritory => {
  return step < 6
    ? makeResult(
        'F_COL',
        'Guyane française (Cayenne)',
        'Colonie de Guyane (Troisième République)',
        'Alleati',
        'Colonie de Guyane — Chef-lieu Cayenne'
      )
    : makeResult(
        'F_COL',
        'Guyane française (Cayenne)',
        'Colonie de Guyane (État français)',
        'Fantoccio',
        'Colonie de Guyane — Gouverneur René Veber'
      );
};


// ----------------------------------------------------------------------------
// 6. LITORALE CROATO / HRVATSKO PRIMORJE (Sušak, Krk, Rab, Gorski Kotar)
// Trattati di Rapallo (1920) e Roma (1924) — Regno di Jugoslavia
// ----------------------------------------------------------------------------
export const CROATIAN_LITTORAL_FEATURE: any = {
  type: 'Feature',
  id: 'HR_HIST_PRIMORJE',
  properties: {
    NAME: 'Croatian Littoral',
    NUTS_NAME: 'Litorale Croato (Sušak / Krk / Rab / Gorski Kotar)',
    NAME_ENGL: 'Croatian Littoral (Sušak)',
    CNTR_NAME: 'Regno di Jugoslavia',
    CNTR_ID: 'HR031',
    CNTR_CODE: 'HR',
    ADMIN: 'Hrvatsko Primorje',
    SOVEREIGNT: 'Kingdom of Yugoslavia',
    CAPITAL: 'Sušak (Rijeka est)',
    HISTORICAL_NOTE:
      'Regno di Jugoslavia — Comprensorio di Sušak, Delnice, Čabar, Vinodol, e le isole di Veglia (Krk) e Arbe (Rab). Assegnato alla Jugoslavia a seguito dei Trattati di Rapallo (1920) e Roma (1924). Dal 1939 integrato nella Banovina Hrvatska.',
  },
  geometry: {"type":"MultiPolygon","coordinates":[[[[14.290097130651274,45.476954672362744],[14.318597548119477,45.4762126574079],[14.475172294446047,45.53254670052793],[14.569453862126544,45.67338180832799],[14.700774617110106,45.533589923548675],[14.82031017613361,45.46891009626272],[14.896072150162588,45.480385549490876],[14.938162135734252,45.52107124729977],[15.15534646128399,45.42926762147455],[15.22605763704437,45.42718117543306],[15.19070204916418,45.35415556398118],[15.106522078020866,45.28947573669522],[15.017291308608954,45.314513089193014],[14.980252121305902,45.295735074819675],[14.98361932015164,45.160116082123324],[15.017291308608954,45.12256005337663],[15.003822513226034,45.08083113254699],[14.91290814439126,45.07248534838105],[14.880919755356793,45.03075642755141],[14.821993775556486,45.114214269210706],[14.633430640195463,45.19975855691149],[14.621645444235405,45.183066988579625],[14.682255023458588,45.08500402462995],[14.783270988830559,44.970249492348415],[14.704141815955843,44.94938503193359],[14.594707853469536,45.01928097432325],[14.481906692137507,45.04118865775882],[14.453285501948777,45.0860472476507],[14.529047475977755,45.15072707493664],[14.555985066743624,45.27174094534263],[14.43977220081268,45.313893120509036],[14.444,45.326],[14.435,45.352],[14.412,45.385],[14.368,45.421],[14.335,45.456],[14.290097130651274,45.476954672362744]]],[[[14.74286460268177,44.81480926225798],[14.832095372093683,44.75325910403424],[14.867450959973873,44.706314068100895],[14.838829769785143,44.70109795299719],[14.788321787099157,44.74387009684757],[14.74286460268177,44.765777780283145],[14.700774617110106,44.757431996117205],[14.65531743269272,44.78872868673945],[14.683938622881449,44.79707447090537],[14.704141815955843,44.83776016871428],[14.746231801527493,44.85236529100466],[14.747915400950369,44.88679165068912],[14.773169392293362,44.86801363631578],[14.74286460268177,44.81480926225798]]],[[[14.574504660395142,44.94729858589211],[14.54251627136069,44.94208247078841],[14.492008288674704,44.98068172255583],[14.515578680594835,45.00154618297066],[14.574504660395142,44.94729858589211]]],[[[14.840513369208004,44.9066128880832],[14.82031017613361,44.8836619816269],[14.751282599796092,44.92539090245654],[14.754649798641829,44.94416891682988],[14.840513369208004,44.9066128880832]]]]},
  __layer: 'prov',
  __kind: 'CROATIAN_LITTORAL',
};
CROATIAN_LITTORAL_FEATURE.__resolve = (s: number): ResolvedTerritory => {
  return makeResult(
    'YUG',
    s >= 4
      ? 'Hrvatsko primorje i Gorski kotar (Banovina Hrvatska)'
      : 'Hrvatsko primorje i Gorski kotar (Savska banovina)',
    'Kraljevina Jugoslavija — Srez Sušak, Delnice, Čabar i Krk'
  );
};


// ----------------------------------------------------------------------------
// 4b. DALMAZIA SETTENTRIONALE / ENTROTERRA ZARATINO (Zadarska županija)
// Benkovac, Nin, Pag, Dugi Otok, Ugljan, Pašman — Regno di Jugoslavia
// ----------------------------------------------------------------------------
export const ZADAR_DALMATIA_FEATURE: any = {
  type: 'Feature',
  id: 'HR_HIST_ZADAR',
  properties: {
    NAME: 'Zadar and Northern Dalmatia',
    NUTS_NAME: 'Dalmazia Settentrionale (Benkovac / Nin / Pag / Dugi Otok)',
    NAME_ENGL: 'Northern Dalmatia (Benkovac)',
    CNTR_NAME: 'Regno di Jugoslavia',
    CNTR_ID: 'HR033',
    CNTR_CODE: 'HR',
    ADMIN: 'Zadarsko Okružje',
    SOVEREIGNT: 'Kingdom of Yugoslavia',
    CAPITAL: 'Benkovac / Biograd',
    HISTORICAL_NOTE:
      'Regno di Jugoslavia — Entroterra zaratino (Ravni Kotari, Benkovac, Nona, Pago) e arcipelago dalmata (Isola Lunga, Ugliano, Pasmano). La città di Zara costituiva un enclave sovrana del Regno d\'Italia a seguito del Trattato di Rapallo (1920). Dal 1939 integrata nella Banovina Hrvatska.',
  },
  geometry: {"type":"MultiPolygon","coordinates":[[[[14.64353223673266,44.40169294604446],[14.668786228075653,44.42360062948002],[14.7209778101845,44.399606500002974],[14.697407418264383,44.371439478442966],[14.64353223673266,44.40169294604446]]],[[[14.761384196333289,44.36726658636],[14.761384196333289,44.41734129135557],[14.810208579596413,44.40064972302372],[14.796739784213493,44.38291493167111],[14.821993775556486,44.35161824104888],[14.795056184790617,44.33909956479998],[14.761384196333289,44.36726658636]]],[[[14.768118594024763,44.27337651449329],[14.800106983059216,44.28380874470071],[14.833778971516544,44.23895015480883],[14.801790582482091,44.220172140435494],[14.768118594024763,44.27337651449329]]],[[[14.843880568053741,44.229561147622164],[14.88428695420253,44.246252715954014],[14.921326141505581,44.208696687207336],[14.901122948431187,44.189918672834],[14.843880568053741,44.229561147622164]]],[[[14.896072150162588,44.527922931554144],[14.916275343236983,44.53835516176156],[15.114940075135202,44.431946413645946],[15.195752847432779,44.340142787820724],[15.116623674558063,44.33284022667554],[14.896072150162588,44.527922931554144]]],[[[14.958365328808647,44.083509924718385],[14.992037317265961,44.09602860096729],[15.057697694757742,44.01257075930799],[15.037494501683348,43.99692241399687],[14.958365328808647,44.083509924718385]]],[[[14.980252121305902,44.15549231314954],[15.042545299951946,44.1826161116888],[15.039178101106224,44.13045496065175],[15.022342106877552,44.12315239950655],[14.980252121305902,44.15549231314954]]],[[[15.012240510340355,44.32553766553035],[15.072850089563538,44.32032155042664],[15.089686083792209,44.302586759074046],[15.066115691872078,44.28172229865922],[15.02570930572329,44.29841386699108],[15.012240510340355,44.32553766553035]]],[[[15.042545299951946,44.08142347867691],[15.066115691872078,44.091855708884324],[15.113256475712326,44.06994802544875],[15.106522078020866,44.02926232763984],[15.042545299951946,44.08142347867691]]],[[[15.05601409533488,43.99066307587242],[15.069482890717815,44.00005208305909],[15.210905242238574,43.91868068744128],[15.222690438198633,43.879038212653114],[15.185651250895582,43.87382209754941],[15.121674472826662,43.91450779535832],[15.05601409533488,43.99066307587242]]],[[[15.06274849302634,44.133584629713965],[15.079584487255012,44.1471465289836],[15.150295663015392,44.10541760815396],[15.212588841661436,44.07933703263542],[15.236159233581567,44.02926232763984],[15.21932323935291,44.01987332045317],[15.143561265323918,44.07516414055246],[15.114940075135202,44.1064608311747],[15.06274849302634,44.133584629713965]]],[[[15.195752847432779,44.18470255773029],[15.214272441084312,44.255641723140684],[15.387683181639524,44.27963585261773],[15.29003441511329,44.363093694277026],[15.345593196067874,44.40273616906519],[15.599816708920663,44.29319775188738],[15.758075054670094,44.27441973751402],[15.818684633893277,44.31719188136442],[15.77996184716735,44.41003873021039],[15.90959900272805,44.48828045676598],[16.047654155403073,44.44550831291559],[16.131834126546387,44.45489732010226],[16.207596100575365,44.34327245688296],[16.209279699998227,44.23269081668438],[16.172240512695176,44.208696687207336],[16.08469334270614,44.13254140669322],[15.965157783682635,44.168010989398425],[15.919700599265248,44.149232975025086],[15.847305824081992,44.08768281680135],[15.811950236201803,43.95936638525018],[15.734504662749963,43.87277887452866],[15.559410322771875,43.87173565150792],[15.36747998856513,43.95310704712574],[15.280690706368835,44.07015324024766],[15.312,44.082],[15.348,44.115],[15.335,44.152],[15.275,44.178],[15.215,44.182],[15.200453353187307,44.178363338296826],[15.195752847432779,44.18470255773029]]]]},
  __layer: 'prov',
  __kind: 'ZADAR_DALMATIA',
};
ZADAR_DALMATIA_FEATURE.__resolve = (s: number): ResolvedTerritory => {
  return makeResult(
    'YUG',
    s >= 4
      ? 'Severna Dalmacija (Banovina Hrvatska)'
      : 'Severna Dalmacija (Primorska banovina)',
    'Kraljevina Jugoslavija — Srez Benkovac, Ravni kotari'
  );
};

// ----------------------------------------------------------------------------
// 14. SERENISSIMA REPUBBLICA DI SAN MARINO
// Monte Titano, Città di San Marino, Borgo Maggiore, Serravalle
// Microstato sovrano neutrale (coordinate originali general_world_countries_geojson.txt con buffer di visualizzazione Mercatore)
// ----------------------------------------------------------------------------
export const SAN_MARINO_FEATURE: any = {
  type: 'Feature',
  id: 'SMR_HIST',
  properties: {
    NAME: 'San Marino',
    NUTS_NAME: 'Repubblica di San Marino',
    NAME_ENGL: 'San Marino',
    CNTR_NAME: 'San Marino',
    CNTR_ID: 'SMR',
    CNTR_CODE: 'SM',
    ADMIN: 'Repubblica di San Marino',
    SOVEREIGNT: 'Republic of San Marino',
    CAPITAL: 'Città di San Marino',
    HISTORICAL_NOTE:
      'Antichissima repubblica sovrana incastonata tra Romagna e Marche. Rimase rigorosamente neutrale durante la Seconda Guerra Mondiale sotto la guida dei Capitani Reggenti, accogliendo oltre 100.000 rifugiati durante il passaggio del fronte (Linea Gotica, settembre 1944).',
  },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [12.42945, 43.892056],
      [12.399581, 43.903218],
      [12.385629, 43.924534],
      [12.395654, 43.948409],
      [12.411049, 43.959661],
      [12.421389, 43.967219],
      [12.453325, 43.979053],
      [12.48216, 43.982567],
      [12.489188, 43.97311],
      [12.492392, 43.956419],
      [12.490325, 43.939159],
      [12.483094, 43.929205],
      [12.48216, 43.927919],
      [12.479576, 43.9258],
      [12.478026, 43.923216],
      [12.477494, 43.920051],
      [12.478287, 43.917038],
      [12.460456, 43.895259],
      [12.42945, 43.892056],
    ]],
  },
  __layer: 'prov',
  __kind: 'SAN_MARINO',
  __resolve: (_s: number): ResolvedTerritory => {
    return makeResult(
      'SMR',
      'Repubblica di San Marino',
      'Serenissima Repubblica di San Marino (Stato Neutrale)'
    );
  },
};

// ----------------------------------------------------------------------------
// 15. STATO DELLA CITTÀ DEL VATICANO
// San Pietro, Musei Vaticani, Castel Sant\'Angelo
// Stato sovrano papale neutrale (Patti Lateranensi 1929, enclave chirurgica sui colli vaticani)
// ----------------------------------------------------------------------------
export const VATICAN_CITY_FEATURE: any = {
  type: 'Feature',
  id: 'VAT_HIST',
  properties: {
    NAME: 'Vatican City',
    NUTS_NAME: 'Stato della Città del Vaticano',
    NAME_ENGL: 'Vatican City',
    CNTR_NAME: 'Città del Vaticano',
    CNTR_ID: 'VAT',
    CNTR_CODE: 'VA',
    ADMIN: 'Stato della Città del Vaticano',
    SOVEREIGNT: 'Holy See / Vatican City',
    CAPITAL: 'Città del Vaticano',
    HISTORICAL_NOTE:
      'Stato sovrano indipendente istituito dai Patti Lateranensi dell\'11 febbraio 1929 tra la Santa Sede e il Regno d\'Italia. Mantenne una rigida neutralità per tutto il conflitto sotto i pontificati di Pio XI (fino a feb 1939) e Pio XII.',
  },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [12.452884, 41.902174],
      [12.452038, 41.902702],
      [12.452144, 41.903548],
      [12.452672, 41.904500],
      [12.454576, 41.904394],
      [12.454680, 41.902174],
      [12.452884, 41.902174],
    ]],
  },
  __layer: 'prov',
  __kind: 'VATICAN_CITY',
  __resolve: (s: number): ResolvedTerritory => {
    return makeResult(
      'VAT',
      'Stato della Città del Vaticano',
      s < 4
        ? 'Stato della Città del Vaticano (Papa Pio XI - Neutralità)'
        : 'Stato della Città del Vaticano (Papa Pio XII - Neutralità)'
    );
  },
};

// ----------------------------------------------------------------------------
// 16. GIBILTERRA (Gibraltar Crown Colony & Fortress)
// Rocca di Gibilterra, Punto Europa, Stretto di Gibilterra
// Piazzaforte britannica (Force H, Royal Navy, base d\'accesso al Mediterraneo)
// Coordinate autentiche da general_world_countries_geojson.txt
// ----------------------------------------------------------------------------
export const GIBRALTAR_COLONY_FEATURE: any = {
  type: 'Feature',
  id: 'GIB_HIST',
  properties: {
    NAME: 'Gibraltar',
    NUTS_NAME: 'Gibraltar (Crown Colony)',
    NAME_ENGL: 'Gibraltar',
    CNTR_NAME: 'Gibilterra',
    CNTR_ID: 'GIB',
    CNTR_CODE: 'GI',
    ADMIN: 'Gibraltar',
    SOVEREIGNT: 'United Kingdom',
    CAPITAL: 'Gibraltar',
    HISTORICAL_NOTE:
      'Colonia della Corona Britannica e fondamentale piazzaforte aeronavale fortificata a controllo dello Stretto di Gibilterra ("The Rock"). Base della Force H della Royal Navy, fu oggetto di incursioni aeree italiane e dell\'Operazione Felix pianificata dall\'Asse.',
  },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-5.358387, 36.141109],
      [-5.338773, 36.141120],
      [-5.339915, 36.129828],
      [-5.339060, 36.123847],
      [-5.342030, 36.110500],
      [-5.350250, 36.119289],
      [-5.358387, 36.141109],
    ]],
  },
  __layer: 'prov',
  __kind: 'GIBRALTAR_COLONY',
  __resolve: (_s: number): ResolvedTerritory => {
    return makeResult(
      'GIB',
      'Gibraltar (Crown Colony)',
      'Gibraltar — Fortezza Navale Britannica (Force H)'
    );
  },
};

// Exported precision non-NUTS historical features
export const PRECISION_HISTORICAL_FEATURES: any[] = [
  CARPATHIAN_RUTHENIA_FEATURE,
  DANZIG_FREE_CITY_FEATURE,
  MEMEL_TERRITORY_FEATURE,
  ZARA_ENCLAVE_FEATURE,
  ZADAR_DALMATIA_FEATURE,
  FIUME_CARNARO_FEATURE,
  CROATIAN_LITTORAL_FEATURE,
  PANAMA_CANAL_ZONE_FEATURE,
  POLISH_CORRIDOR_GDYNIA_FEATURE,
  KOSOVO_METOHIJA_FEATURE,
  KONIGSBERG_OSTPREUSSEN_FEATURE,
  ...BOSNIA_REGIONAL_FEATURES,
  LITHUANIA_PALANGA_FEATURE,
  TURKEY_MOUNT_ARARAT_FEATURE,
  FRENCH_GUIANA_FEATURE,
  SAN_MARINO_FEATURE,
  VATICAN_CITY_FEATURE,
  GIBRALTAR_COLONY_FEATURE,
];

