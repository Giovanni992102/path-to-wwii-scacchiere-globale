/**
 * Dettaglio Geocartografico e Toponomastico Storico degli Stati Uniti Messicani (1936-1941)
 * Copertura integrale di tutti i 31 Stati, Territori Federali (Baja California Norte, Baja California Sur, Quintana Roo)
 * e Distretto Federale (Ciudad de México), nel contesto dell'era di Lázaro Cárdenas e Manuel Ávila Camacho.
 *
 * Evoluzione Geopolitica e Temporale (Step 0 - 8):
 * - Step 0-1 (1936 - mar 1938): Presidenza del Gen. Lázaro Cárdenas del Río. Riforme sociali avanzate, esilio di Calles (1936),
 *   creazione della CTM (Vicente Lombardo Toledano), asilo politico a Leon Trotsky a Coyoacán (gen 1937), massicce riforme agrarie
 *   (ejidos collettivi della Comarca Lagunera e henequén dello Yucatán), nazionalizzazione delle Ferrovie Nazionali (FNM, giu 1937).
 *   Baja California divisa nei Territori Federali Nord e Sud; Quintana Roo ripristinato come Territorio Federale nel 1935.
 * - Step 2-4 (ott 1938 - apr 1939): 18 Marzo 1938: Storico Decreto di Espropriazione Petrolifera di Cárdenas contro le concessioni
 *   straniere (Standard Oil, Royal Dutch Shell, El Águila). Creazione di PEMEX (7 giugno 1938). Boicottaggio commerciale anglo-americano
 *   e temporanee vendite di greggio all'Asse per autodifesa economica. Repressione della ribellione del generale Saturnino Cedillo a
 *   San Luis Potosí (1938-1939). Accoglienza dei rifugiati repubblicani della Guerra Civile Spagnola (Niños de Morelia, nave Sinaia).
 * - Step 5-6 (set 1939 - giu 1940): Scoppio della Seconda Guerra Mondiale in Europa. Il Messico dichiara la rigorosa neutralità armata
 *   e la difesa del diritto internazionale panamericano. Cessazione immediata delle esportazioni petrolifere verso la Germania nazista.
 *   Agosto 1940: assassinio di Leon Trotsky a Coyoacán per mano dell'agente sovietico Ramón Mercader. Elezioni presidenziali del luglio 1940
 *   e vittoria del moderato generale Manuel Ávila Camacho contro Juan Andrew Almazán.
 * - Step 7 (ott 1940): Transizione presidenziale verso Manuel Ávila Camacho (in carica dal 1° dicembre 1940). Distensione diplomatica
 *   con Washington (Roosevelt invia il vicepresidente Henry Wallace alla cerimonia d'insediamento). Avvio della cooperazione di sicurezza
 *   emisferica e controspionaggio contro le reti dell'Abwehr operanti nei porti del Golfo di Messico e nel Pacifico.
 * - Step 8 (apr 1941): Presidenza Manuel Ávila Camacho ("El Presidente Caballero"). Politica di unità nazionale e riconciliazione con la
 *   Chiesa cattolica. Accordo generale di indennizzo petrolifero con gli Stati Uniti. Sequestro cautelare nei porti di Tampico e Veracruz
 *   di navi mercantili e petroliere italiane e tedesche bloccate dal blocco britannico. Negoziati per la Commissione Congiunta di Difesa
 *   Messico-USA e fornitura massiccia di rame, piombo e zinco per l'Arsenale della Democrazia.
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

export interface MexicoProvinceInfo {
  id: string;
  iso: string;
  name: string;
  modernName: string;
  historicalName: string;
  adminTitle: string;
  capital: string;
  region: string;
  isTerritory: boolean;
  historicalToponym: string;
  s0_1: string;
  s2_4: string;
  s5_6: string;
  s7: string;
  s8: string;
  getNote: (s: number) => string;
  getHistoricalName: (s: number) => string;
  getAdminTitle: (s: number) => string;
  getSovereign: (s: number) => string;
  getFaction: (s: number) => FactionType;
}

export const MEXICO_PROVINCES_META: Record<string, MexicoProvinceInfo> = {
  MX_SON: {
    id: "MX_SON",
    iso: "MX-SON",
    name: "Sonora",
    modernName: "Estado Libre y Soberano de Sonora",
    historicalName: "Sonora (Hermosillo - Rame di Cananea & Valle del Yaqui)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Sonora (Gobernador Gen. Román Yocupicio / Anselmo Macías)",
    capital: "Hermosillo",
    region: "Noroeste",
    isTerritory: false,
    historicalToponym: "Hermosillo / Cananea / Nogales / Guaymas / Ciudad Obregón",
    s0_1: "Stato di Sonora. Roccaforte del nord guidata dal generale yaqui Román Yocupicio. A Cananea opera la gigantesca miniera di rame a cielo aperto (Cananea Consolidated Copper Co.), perno minerario strategico dell'America del Nord. Nella Valle del Yaqui avanzano i lavori di bonifica e irrigazione della diga Angostura; presidio di confine a Nogales e porto peschereccio a Guaymas.",
    s2_4: "Stato di Sonora. La produzione di rame di Cananea e molibdeno lavora a ritmo serrato; Yocupicio mantiene una linea di autonomia regionale e mediazione con le comunità indigene yaqui e mayo; intensificazione dei transiti ferroviari verso l'Arizona.",
    s5_6: "Stato di Sonora (settembre 1939 - giugno 1940). Con l'inizio del conflitto in Europa, le forniture di rame e minerali metallurgici di Sonora vengono indirizzate in via prioritaria verso gli Stati Uniti per la produzione di munizioni; sorveglianza costiera nel Golfo di California.",
    s7: "Stato di Sonora (ottobre 1940). Elezione del generale Anselmo Macías Valenzuela a governatore; accordi di cooperazione transfrontaliera tra Hermosillo e le autorità militari di Tucson e Nogales per la sicurezza dei valichi ferroviari.",
    s8: "Stato di Sonora (aprile 1941). Piena integrazione dell'industria estrattiva di Cananea nei contratti di fornitura strategica per l'Arsenale della Democrazia statunitense; la flotta peschereccia di Guaymas coopera alla sorveglianza delle rotte marittime verso la Baja California.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_SON"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_SON"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_SON"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_SON"].s2_4;
      return MEXICO_PROVINCES_META["MX_SON"].s0_1;
    },
    getHistoricalName: (s: number) => "Sonora (Hermosillo - Rame di Cananea & Valle del Yaqui)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Sonora",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_BCN: {
    id: "MX_BCN",
    iso: "MX-BCN",
    name: "Baja California",
    modernName: "Estado Libre y Soberano de Baja California",
    historicalName: "Territorio Norte de la Baja California (Mexicali, Tijuana & Ensenada)",
    adminTitle: "Estados Unidos Mexicanos — Territorio Norte de la Baja California (Gobernador Gen. Rodolfo Sánchez Taboada)",
    capital: "Mexicali",
    region: "Noroeste",
    isTerritory: true,
    historicalToponym: "Mexicali / Tijuana / Ensenada / Tecate / Isla Guadalupe",
    s0_1: "Territorio Federale Nord della Bassa California (capitale Mexicali). Territorio federale strategico governato dal generale Rodolfo Sánchez Taboada. Nel gennaio 1937, Cárdenas attua l'epico 'Asalto a las Tierras', espropriando i latifondi della Colorado River Land Company nella Valle de Mexicali per creare comunità agricole ejidali messicane; polo turistico e doganale di Tijuana e porto di Ensenada.",
    s2_4: "Territorio Norte de Baja California. Consolidamento degli ejidi cotoniere della Valle de Mexicali e potenziamento dell'acquedotto; fortificazione dei posti di dogana a Tijuana e Tecate; istituzione di una stazione radio d'avvistamento sull'Isola di Guadalupe nel Pacifico.",
    s5_6: "Territorio Norte de Baja California (settembre 1939 - giugno 1940). Dopo lo scoppio della guerra europea, il governatore Sánchez Taboada coordina con Città del Messico la sorveglianza militare del litorale pacifico e della frontiera californiana; rigoroso controllo dei passaporti e delle telecomunicazioni marittime.",
    s7: "Territorio Norte de Baja California (ottobre 1940). Nel quadro della difesa emisferica concordata tra Cárdenas e Roosevelt, la penisola viene inclusa nei piani aeronavali di allerta precoce per proteggere la base navale statunitense di San Diego e gli accessi al Golfo di California.",
    s8: "Territorio Norte de Baja California (aprile 1941). Piena cooperazione di pattugliamento tra la Marina messicana a Ensenada e l'US Navy (11th Naval District); la produzione di cotone di Mexicali e le conserve ittiche di Ensenada riforniscono i mercati nordamericani.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_BCN"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_BCN"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_BCN"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_BCN"].s2_4;
      return MEXICO_PROVINCES_META["MX_BCN"].s0_1;
    },
    getHistoricalName: (s: number) => "Territorio Norte de la Baja California (Mexicali, Tijuana & Ensenada)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Territorio Norte de la Baja California",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_BCS: {
    id: "MX_BCS",
    iso: "MX-BCS",
    name: "Baja California Sur",
    modernName: "Estado Libre y Soberano de Baja California Sur",
    historicalName: "Territorio Sur de la Baja California (La Paz, Santa Rosalía & Bahía Magdalena)",
    adminTitle: "Estados Unidos Mexicanos — Territorio Sur de la Baja California (Gobernador Gen. Juan Domínguez Cota / Gen. Francisco J. Múgica)",
    capital: "La Paz",
    region: "Noroeste",
    isTerritory: true,
    historicalToponym: "La Paz / Santa Rosalía (Compagnie du Boleo) / Bahía Magdalena / San José del Cabo",
    s0_1: "Territorio Federale Sud della Bassa California (capitale La Paz). Frontiera marittima celebre per le perle e le saline. A Santa Rosalía operano le miniere e fonderie di rame della francese Compagnie du Boleo. Nella vasta rada naturale oceanica di Bahía Magdalena si affacciano le rotte transpacifiche, presidiate da guardacoste federali.",
    s2_4: "Territorio Sur de Baja California. Modernizzazione delle comunicazioni telegrafiche e delle saline; a Santa Rosalía la produzione di rame viene mantenuta attiva nonostante le difficoltà dei mercati europei; Cárdenas conferma la sovranità federale sull'ancoraggio di Bahía Magdalena smentendo voci di concessioni estere.",
    s5_6: "Territorio Sur de Baja California (settembre 1939 - giugno 1940). Con l'inizio delle ostilità globali, Cárdenas nomina governatore del territorio il fidato generale Francisco J. Múgica (padre nobile della Costituzione del 1917 ed ex ministro); Múgica assume il comando politico e militare per blindare la penisola da infiltrazioni dell'Asse.",
    s7: "Territorio Sur de Baja California (ottobre 1940). Il generale Múgica stabilisce posti di vedetta costiera a Bahía Magdalena, Cabo San Lucas e Loreto; pattuglie della marina vigilano per impedire a sommergibili non identificati di rifornirsi d'acqua o carburante nelle baie isolate.",
    s8: "Territorio Sur de Baja California (aprile 1941). Bahía Magdalena diventa il perno del dispositivo difensivo congiunto aero-marittimo messicano sul Pacifico; incremento dell'estrazione di rame a Santa Rosalía destinato all'industria metallurgica di guerra.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_BCS"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_BCS"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_BCS"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_BCS"].s2_4;
      return MEXICO_PROVINCES_META["MX_BCS"].s0_1;
    },
    getHistoricalName: (s: number) => "Territorio Sur de la Baja California (La Paz, Santa Rosalía & Bahía Magdalena)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Territorio Sur de la Baja California",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_CHH: {
    id: "MX_CHH",
    iso: "MX-CHH",
    name: "Chihuahua",
    modernName: "Estado Libre y Soberano de Chihuahua",
    historicalName: "Chihuahua (Ciudad Juárez, Santa Eulalia & Miniere di Parral)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Chihuahua (Gobernador Gustavo L. Talamantes / Alfredo Chávez)",
    capital: "Chihuahua",
    region: "Norte",
    isTerritory: false,
    historicalToponym: "Chihuahua / Ciudad Juárez / Hidalgo del Parral / Santa Eulalia / Delicias",
    s0_1: "Stato di Chihuahua. Lo stato più esteso della Repubblica Messicana. Snodo ferroviario internazionale vitale a Ciudad Juárez (collegata a El Paso). A Santa Eulalia e Parral operano i giganteschi impianti di estrazione di piombo, zinco e argento (ASARCO). Agricoltura irrigua a Delicias e colonie mennonite a Cuauhtémoc; estesa riforma agraria contro i latifondi.",
    s2_4: "Stato di Chihuahua. Le miniere di Parral e Santa Eulalia aumentano la produzione di concentrati di piombo e zinco per le riserve metalliche d'oltreconfine; ampliamento della rete viaria federale tra Chihuahua e Juárez.",
    s5_6: "Stato di Chihuahua (settembre 1939 - giugno 1940). Allo scoppio del conflitto, lo scalo di Ciudad Juárez sperimenta un incremento senza precedenti nel transito di merci, bestiame e minerali verso gli Stati Uniti; rafforzamento della sorveglianza doganale sui ponti internazionali del Rio Bravo.",
    s7: "Stato di Chihuahua (ottobre 1940). Elezione di Alfredo Chávez a governatore; cooperazione con le agenzie federali statunitensi per il controllo dell'immigrazione clandestina e la repressione dello spionaggio commerciale lungo il confine.",
    s8: "Stato di Chihuahua (aprile 1941). I complessi estrattivi di piombo e zinco di Chihuahua lavorano a pieno regime per l'industria degli armamenti alleata; esportazioni record di legname dalla Sierra Tarahumara e carni bovine per il vettovagliamento nordamericano.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_CHH"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_CHH"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_CHH"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_CHH"].s2_4;
      return MEXICO_PROVINCES_META["MX_CHH"].s0_1;
    },
    getHistoricalName: (s: number) => "Chihuahua (Ciudad Juárez, Santa Eulalia & Miniere di Parral)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Chihuahua",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_COA: {
    id: "MX_COA",
    iso: "MX-COA",
    name: "Coahuila",
    modernName: "Estado Libre y Soberano de Coahuila de Zaragoza",
    historicalName: "Coahuila (Saltillo, La Laguna di Torreón & Carbone di Sabinas)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Coahuila (Gobernador Jesús Valdés Sánchez)",
    capital: "Saltillo",
    region: "Norte",
    isTerritory: false,
    historicalToponym: "Saltillo / Torreón (Comarca Lagunera) / Monclova / Sabinas / Piedras Negras",
    s0_1: "Stato di Coahuila. Fulcro della grande riforma agraria cardenista: nell'ottobre 1936, Cárdenas decreta l'espropriazione di circa 450.000 ettari nella Comarca Lagunera attorno a Torreón, creando il più grande ejido collettivo di cotone e grano del Messico (Banco Ejidal). A Sabinas e Nueva Rosita si estraggono i carboni fossili indispensabili per la siderurgia nazionale.",
    s2_4: "Stato di Coahuila. Il bacino carbonifero di Sabinas alimenta le industrie pesanti di Monterrey; nella Comarca Lagunera si consolidano le cooperative tessili e agricole; pianificazione dei primi altiforni di Monclova; valico di frontiera di Piedras Negras attivo.",
    s5_6: "Stato di Coahuila (settembre 1939 - giugno 1940). La produzione di carbone e coke metallurgico tocca punte storiche per sostenere la domanda industriale messicana; il cotone lagunero garantisce l'autosufficienza dell'industria tessile militare e civile.",
    s7: "Stato di Coahuila (ottobre 1940). Transizione politica ordinata; accordi tra i minatori di Sabinas e le fonderie per massimizzare la produzione; vigilanza sul ponte internazionale di Piedras Negras.",
    s8: "Stato di Coahuila (aprile 1941). Accelerazione del progetto industriale siderurgico di Altos Hornos de México (AHMSA) a Monclova con capitali congiunti messicani e crediti della Export-Import Bank statunitense per produrre lamiere e acciai speciali.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_COA"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_COA"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_COA"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_COA"].s2_4;
      return MEXICO_PROVINCES_META["MX_COA"].s0_1;
    },
    getHistoricalName: (s: number) => "Coahuila (Saltillo, La Laguna di Torreón & Carbone di Sabinas)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Coahuila",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_TAM: {
    id: "MX_TAM",
    iso: "MX-TAM",
    name: "Tamaulipas",
    modernName: "Estado Libre y Soberano de Tamaulipas",
    historicalName: "Tamaulipas (Tampico - Raffinerie PEMEX & Porti del Golfo)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Tamaulipas (Gobernador Marte R. Gómez / Magdaleno Aguilar)",
    capital: "Ciudad Victoria",
    region: "Noreste",
    isTerritory: false,
    historicalToponym: "Tampico (Refinería Árbol Grande) / Nuevo Laredo / Matamoros / Ciudad Victoria / Reynosa",
    s0_1: "Stato di Tamaulipas. Cuore pulsante dell'industria petrolifera del Golfo a Tampico e Ciudad Madero (raffinerie Árbol Grande). Nel 1937 scoppia il duro sciopero del sindacato petrolifero (STPRM) contro le compagnie anglo-olandesi e americane. A Nuevo Laredo ha sede la principale dogana terrestre per i traffici ferroviari con gli USA; agrumi e canna da zucchero a Victoria.",
    s2_4: "Stato di Tamaulipas (18 Marzo 1938). Epocale momento storico: Tampico è l'epicentro dell'Espropriazione Petrolifera cardenista; i tecnici e gli operai messicani assumono il controllo diretto delle raffinerie e degli oleodotti di PEMEX. Di fronte al boicottaggio britannico e statunitense, navi cisterna caricano petrolio per acquirenti internazionali.",
    s5_6: "Stato di Tamaulipas (settembre 1939 - giugno 1940). Allo scoppio del conflitto europeo, il governo ordina la sospensione immediata dei carichi diretti verso la Germania; il porto di Tampico applica le norme di neutralità panamericana; le raffinerie lavorano a pieno regime per soddisfare la domanda interna e del Centroamerica.",
    s7: "Stato di Tamaulipas (ottobre 1940). Il governatore Marte R. Gómez (autorevole agronomo e diplomatico) collabora con Cárdenas e Ávila Camacho; pattugliamento delle acque costiere della Laguna Madre e del porto di Tampico contro navi corsare.",
    s8: "Stato di Tamaulipas (aprile 1941). Svolta strategica: nel porto di Tampico la Marina messicana procede al sequestro cautelare e all'internamento di numerose petroliere e mercantili dell'Asse (italiane e tedesche) bloccate dall'inizio della guerra; PEMEX incrementa le forniture energetiche destinate agli alleati.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_TAM"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_TAM"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_TAM"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_TAM"].s2_4;
      return MEXICO_PROVINCES_META["MX_TAM"].s0_1;
    },
    getHistoricalName: (s: number) => "Tamaulipas (Tampico - Raffinerie PEMEX & Porti del Golfo)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Tamaulipas",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_NLE: {
    id: "MX_NLE",
    iso: "MX-NLE",
    name: "Nuevo León",
    modernName: "Estado Libre y Soberano de Nuevo León",
    historicalName: "Nuevo León (Monterrey - Heartland Siderurgico & Manifatturiero)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Nuevo León (Gobernador Gen. Anacleto Guerrero / Bonifacio Salinas)",
    capital: "Monterrey",
    region: "Noreste",
    isTerritory: false,
    historicalToponym: "Monterrey (Fundidora de Acero) / Linares / Montemorelos / Sabinas Hidalgo",
    s0_1: "Stato di Nuevo León. Capitale industriale e finanziaria del nord a Monterrey: Compañía Fundidora de Fierro y Acero de Monterrey (altiforni e laminatoi), Cervecería Cuauhtémoc, Vidriera Monterrey (vetro), fabbriche di imballaggi e cementifici. Nel 1936 forti attriti sociali tra la classe imprenditoriale locale e le politiche sindacali cardeniste.",
    s2_4: "Stato di Nuevo León. Gli altiforni della Fundidora lavorano a ciclo continuo rifornendosi di minerale di ferro da Durango e carbone da Coahuila; la camera industriale di Monterrey espande le esportazioni di manufatti in metallo e vetro; agrumicoltura a Montemorelos.",
    s5_6: "Stato di Nuevo León (settembre 1939 - giugno 1940). La siderurgia di Monterrey diventa un pilastro dell'autarchia manifatturiera messicana durante i primi mesi del conflitto mondiale; produzione su larga scala di profilati di ferro, binari ferroviari e tubazioni per gli oleodotti di PEMEX.",
    s7: "Stato di Nuevo León (ottobre 1940). Il governatore generale Bonifacio Salinas Leal favorisce la convergenza tra industriali e il nuovo governo federale di Ávila Camacho, inaugurando un'era di cooperazione produttiva e pace sindacale.",
    s8: "Stato di Nuevo León (aprile 1941). Monterrey consolida la propria posizione di capitale pesante del Messico; accordi commerciali per l'esportazione di manufatti d'acciaio e prodotti chimici integrati nella catena produttiva continentale.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_NLE"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_NLE"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_NLE"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_NLE"].s2_4;
      return MEXICO_PROVINCES_META["MX_NLE"].s0_1;
    },
    getHistoricalName: (s: number) => "Nuevo León (Monterrey - Heartland Siderurgico & Manifatturiero)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Nuevo León",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_ROO: {
    id: "MX_ROO",
    iso: "MX-ROO",
    name: "Quintana Roo",
    modernName: "Estado Libre y Soberano de Quintana Roo",
    historicalName: "Territorio Federal de Quintana Roo (Chetumal, Cozumel & Giungla del Chicle)",
    adminTitle: "Estados Unidos Mexicanos — Territorio Federal de Quintana Roo (Gobernador Gen. Rafael E. Melgar)",
    capital: "Chetumal",
    region: "Sureste",
    isTerritory: true,
    historicalToponym: "Chetumal (ex Payo Obispo) / Cozumel / Isla Mujeres / Felipe Carrillo Puerto",
    s0_1: "Territorio Federale di Quintana Roo. Ripristinato come territorio federale autonomo da Cárdenas nel gennaio 1935 dopo lo smembramento del 1931. Il governatore Rafael E. Melgar ribattezza la capitale Payo Obispo col nome storico maya di Chetumal (1936), edifica scuole, ospedali e promuove le cooperative forestali per l'estrazione della gomma chicle nelle foreste pluviali.",
    s2_4: "Territorio Federal de Quintana Roo. Riorganizzazione delle comunità maya dell'ex feudo ribelle di Chan Santa Cruz (Felipe Carrillo Puerto); le cooperative chiclere esportano milioni di libbre di chicle verso i mercati internazionali attraverso i porti di Cozumel e Chetumal.",
    s5_6: "Territorio Federal de Quintana Roo (settembre 1939 - giugno 1940). Data la posizione geostrategica d'ingresso al Mar dei Caraibi e la vicinanza con l'Honduras Britannico (Belize), la costa orientale di Quintana Roo e le isole di Cozumel e Isla Mujeres vengono fortificate con posti d'avvistamento aeronavali.",
    s7: "Territorio Federal de Quintana Roo (ottobre 1940). Il governatore Melgar coordina con le autorità federali la sorveglianza delle acque del canale dello Yucatán; accordi di controllo doganale sul fiume Hondo al confine col Belize.",
    s8: "Territorio Federal de Quintana Roo (aprile 1941). Piena operatività della pista aerea di Cozumel e delle stazioni d'ascolto radio costiere; sorveglianza congiunta delle rotte marittime caraibiche che convergono verso il Canale di Panama.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_ROO"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_ROO"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_ROO"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_ROO"].s2_4;
      return MEXICO_PROVINCES_META["MX_ROO"].s0_1;
    },
    getHistoricalName: (s: number) => "Territorio Federal de Quintana Roo (Chetumal, Cozumel & Giungla del Chicle)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Territorio Federal de Quintana Roo",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_CAM: {
    id: "MX_CAM",
    iso: "MX-CAM",
    name: "Campeche",
    modernName: "Estado Libre y Soberano de Campeche",
    historicalName: "Campeche (San Francisco de Campeche, Ciudad del Carmen & Chicle)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Campeche (Gobernador Eduardo R. Mena Córdova / Héctor Pérez Martínez)",
    capital: "San Francisco de Campeche",
    region: "Sureste",
    isTerritory: false,
    historicalToponym: "San Francisco de Campeche / Ciudad del Carmen / Champotón / Escárcega",
    s0_1: "Stato di Campeche. Storica città fortificata affacciata sul Golfo. Economia fondata sulla pesca d'altura e gamberi a Ciudad del Carmen, sull'estrazione forestale del chicle e legname pregiato (mogano e cedro) nella giungla di Calakmul. Riforma agraria promossa da Cárdenas tra le comunità contadine maya.",
    s2_4: "Stato di Campeche. Consolidamento dei confini orientali dopo il ripristino del vicino Territorio di Quintana Roo; ammodernamento delle banchine portuali a Ciudad del Carmen e sviluppo della ferrovia del sud-est.",
    s5_6: "Stato di Campeche (settembre 1939 - giugno 1940). La flotta peschereccia del Banco de Campeche opera sotto sorveglianza costiera federale; la gomma chicle di Campeche rappresenta una risorsa d'esportazione vitale verso il mercato statunitense.",
    s7: "Stato di Campeche (ottobre 1940). Il governatore Héctor Pérez Martínez (intellettuale e storico) assume la guida dello stato, incentivando le scuole rurali e l'integrazione delle popolazioni indigene della giungla.",
    s8: "Stato di Campeche (aprile 1941). Incremento del pattugliamento delle acque costiere della Laguna de Términos; cooperazione logistica con la marina militare a guardia degli accessi meridionali al Golfo del Messico.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_CAM"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_CAM"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_CAM"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_CAM"].s2_4;
      return MEXICO_PROVINCES_META["MX_CAM"].s0_1;
    },
    getHistoricalName: (s: number) => "Campeche (San Francisco de Campeche, Ciudad del Carmen & Chicle)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Campeche",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_TAB: {
    id: "MX_TAB",
    iso: "MX-TAB",
    name: "Tabasco",
    modernName: "Estado Libre y Soberano de Tabasco",
    historicalName: "Tabasco (Villahermosa - Bacino del Grijalva & Usumacinta)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Tabasco (Gobernador Víctor Fernández Manero / Augusto Hernández Olivé)",
    capital: "Villahermosa",
    region: "Sureste",
    isTerritory: false,
    historicalToponym: "Villahermosa / Frontera / Cárdenas / Comalcalco / Paraíso",
    s0_1: "Stato di Tabasco. Vasta pianura alluvionale attraversata dai possenti fiumi Grijalva e Usumacinta. Dopo la caduta nel 1935 del governatore Tomás Garrido Canabal e delle sue milizie anticlericali ('Camisas Rojas'), Cárdenas ristabilisce la concordia civile e la libertà religiosa; coltivazioni di banane, cacao e prime prospezioni petrolifere costiere.",
    s2_4: "Stato di Tabasco. Rinascita della produzione agricola tropicale; PEMEX avvia studi geologici lungo il litorale di Paraíso e Frontera; riapertura delle chiese e normalizzazione della vita pubblica.",
    s5_6: "Stato di Tabasco (settembre 1939 - giugno 1940). Il porto fluviale di Frontera registra intenso traffico fluviale di legnami e cacao; piena lealtà dello stato al governo cardenista durante le elezioni presidenziali.",
    s7: "Stato di Tabasco (ottobre 1940). Transizione sotto il governatore Augusto Hernández Olivé; completamento di canali di scolo e argini per il controllo delle periodiche esondazioni fluviali tropicali.",
    s8: "Stato di Tabasco (aprile 1941). Rilevamento geofisico e primi pozzi esplorativi di idrocarburi da parte di PEMEX; le riserve agricole tabaschine garantiscono forniture regolari di alimenti tropicali per i mercati nazionali.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_TAB"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_TAB"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_TAB"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_TAB"].s2_4;
      return MEXICO_PROVINCES_META["MX_TAB"].s0_1;
    },
    getHistoricalName: (s: number) => "Tabasco (Villahermosa - Bacino del Grijalva & Usumacinta)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Tabasco",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_CHP: {
    id: "MX_CHP",
    iso: "MX-CHP",
    name: "Chiapas",
    modernName: "Estado Libre y Soberano de Chiapas",
    historicalName: "Chiapas (Tuxtla Gutiérrez, Caffè del Soconusco & Confine Guatemala)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Chiapas (Gobernador Efraín A. Gutiérrez / Rafael Pascacio Gamboa)",
    capital: "Tuxtla Gutiérrez",
    region: "Suroeste",
    isTerritory: false,
    historicalToponym: "Tuxtla Gutiérrez / Tapachula / San Cristóbal de las Casas / Comitán / Arriaga",
    s0_1: "Stato di Chiapas. Frontiera meridionale della Repubblica al confine col Guatemala (retto dal dittatore Jorge Ubico). Nella fertile regione costiera del Soconusco (Tapachula) operano grandi piantagioni di caffè di proprietà tedesca e messicana; altopiani indigeni a San Cristóbal de las Casas. Cárdenas applica la riforma agraria nel Soconusco espropriando parte delle tenute straniere.",
    s2_4: "Stato di Chiapas. Distribuzione di terre ejidali ai braccianti indigeni e creazione del sindacato dei lavoratori del caffè; presidi dell'Esercito messicano lungo il fiume Suchiate per blindare la frontiera col Guatemala.",
    s5_6: "Stato di Chiapas (settembre 1939 - giugno 1940). Con l'inizio della guerra in Europa, il governo federale dispone la stretta vigilanza sui proprietari terrieri di nazionalità tedesca nel Soconusco; controllo rigoroso del traffico transfrontaliero a Tapachula e Ciudad Hidalgo.",
    s7: "Stato di Chiapas (ottobre 1940). Insediamento del governatore Rafael Pascacio Gamboa; potenziamento della ferrovia panamericana tra Arriaga e il confine centroamericano.",
    s8: "Stato di Chiapas (aprile 1941). Messa sotto custodia preventiva dei beni di interesse strategico dell'Asse nella regione caffeicola; Chiapas si conferma bastione della sovranità e della sicurezza meridionale della nazione.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_CHP"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_CHP"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_CHP"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_CHP"].s2_4;
      return MEXICO_PROVINCES_META["MX_CHP"].s0_1;
    },
    getHistoricalName: (s: number) => "Chiapas (Tuxtla Gutiérrez, Caffè del Soconusco & Confine Guatemala)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Chiapas",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_COL: {
    id: "MX_COL",
    iso: "MX-COL",
    name: "Colima",
    modernName: "Estado Libre y Soberano de Colima",
    historicalName: "Colima (Manzanillo - Porto del Pacifico & Isole Revillagigedo)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Colima (Gobernador Miguel G. Santana / Pedro Torres Ortiz)",
    capital: "Colima",
    region: "Occidente",
    isTerritory: false,
    historicalToponym: "Colima / Manzanillo / Tecomán / Islas Revillagigedo",
    s0_1: "Stato di Colima. Il porto naturale d'altura di Manzanillo è uno dei principali sbocchi marittimi messicani sul Pacifico. Coltivazioni costiere di limoni, noci di cocco e canna da zucchero; sotto la giurisdizione federale/statale ricadono le remote e disabitate Isole Revillagigedo (Socorro, Clarión, San Benedicto).",
    s2_4: "Stato di Colima. Ammodernamento delle infrastrutture ferroviarie che collegano Manzanillo a Guadalajara; lavori di dragaggio nel porto; missioni periodiche della marina militare alle Isole Revillagigedo.",
    s5_6: "Stato di Colima (settembre 1939 - giugno 1940). Manzanillo assume il ruolo di base operativa di pattugliamento navale della Marina messicana nel Pacifico centrale per garantire la neutralità delle acque territoriali.",
    s7: "Stato di Colima (ottobre 1940). Monitoraggio rafforzato sul transito delle navi mercantili giapponesi e americane al largo delle coste di Colima; installazione di nuovi fari marittimi.",
    s8: "Stato di Colima (aprile 1941). Il porto di Manzanillo si prepara ad accogliere convogli di rifornimento marittimo strategico; cooperazione aeronavale con le forze di difesa del Pacifico.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_COL"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_COL"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_COL"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_COL"].s2_4;
      return MEXICO_PROVINCES_META["MX_COL"].s0_1;
    },
    getHistoricalName: (s: number) => "Colima (Manzanillo - Porto del Pacifico & Isole Revillagigedo)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Colima",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_NAY: {
    id: "MX_NAY",
    iso: "MX-NAY",
    name: "Nayarit",
    modernName: "Estado Libre y Soberano de Nayarit",
    historicalName: "Nayarit (Tepic, San Blas & Colonia Penale Islas Marías)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Nayarit (Gobernador Juventino Espinosa / Candelario Miramontes)",
    capital: "Tepic",
    region: "Occidente",
    isTerritory: false,
    historicalToponym: "Tepic / San Blas / Acaponeta / Compostela / Islas Marías",
    s0_1: "Stato di Nayarit. Agricoltura fiorente di tabacco, mais e canna da zucchero lungo le valli costiere; storico porto coloniale di San Blas. Al largo delle coste si trova l'arcipelago delle Islas Marías, sede della colonia penale federale senza mura istituita per la riabilitazione attraverso il lavoro agricolo.",
    s2_4: "Stato di Nayarit. Avanzamento della riforma agraria e apertura di cooperative di coltivatori di tabacco; potenziamento della strada statale tra Tepic e Guadalajara.",
    s5_6: "Stato di Nayarit (settembre 1939 - giugno 1940). Sorveglianza navale delle acque circostanti le Islas Marías e la foce del fiume Santiago per assicurare il rispetto della neutralità marittima.",
    s7: "Stato di Nayarit (ottobre 1940). Elezione del governatore Candelario Miramontes; coordinamento tra le forze rurali e l'esercito federale per il mantenimento dell'ordine pubblico.",
    s8: "Stato di Nayarit (aprile 1941). Le produzioni di tabacco e cereali di Nayarit alimentano i mercati urbani del centro del paese; continuità della sorveglianza costiera nel Pacifico.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_NAY"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_NAY"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_NAY"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_NAY"].s2_4;
      return MEXICO_PROVINCES_META["MX_NAY"].s0_1;
    },
    getHistoricalName: (s: number) => "Nayarit (Tepic, San Blas & Colonia Penale Islas Marías)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Nayarit",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_SIN: {
    id: "MX_SIN",
    iso: "MX-SIN",
    name: "Sinaloa",
    modernName: "Estado Libre y Soberano de Sinaloa",
    historicalName: "Sinaloa (Culiacán, Porto di Mazatlán & Valli Agricole)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Sinaloa (Gobernador Alfredo Delgado / Rodolfo T. Loaiza)",
    capital: "Culiacán",
    region: "Noroeste",
    isTerritory: false,
    historicalToponym: "Culiacán / Mazatlán / Los Mochis / Guasave / Topolobampo",
    s0_1: "Stato di Sinaloa. Grande produttore agroalimentare: zuccherifici a Los Mochis e ortaggi/pomodori d'esportazione nelle ricche valli fluviali di Culiacán e Fuerte. Il porto marittimo di Mazatlán è uno snodo turistico e peschereccio chiave sul Pacifico, dotato di una base navale federale.",
    s2_4: "Stato di Sinaloa. Espansione della rete di canali d'irrigazione promossa dal governo Cárdenas; crescita delle esportazioni orticole verso la California; ampliamento delle banchine di Mazatlán.",
    s5_6: "Stato di Sinaloa (settembre 1939 - giugno 1940). Pattugliamento aeronavale regolare da Mazatlán a Topolobampo per la protezione del Golfo di California; l'agricoltura sinaloense garantisce forniture caloriche essenziali per il paese.",
    s7: "Stato di Sinaloa (ottobre 1940). Il colonnello Rodolfo T. Loaiza viene eletto governatore, consolidando i legami con l'amministrazione federale di Ávila Camacho; modernizzazione dell'arsenale navale di Mazatlán.",
    s8: "Stato di Sinaloa (aprile 1941). Piena integrazione dei porti di Mazatlán e Topolobampo nella catena logistica difensiva del Pacifico settentrionale; esportazioni record di pomodori e zucchero verso gli USA.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_SIN"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_SIN"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_SIN"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_SIN"].s2_4;
      return MEXICO_PROVINCES_META["MX_SIN"].s0_1;
    },
    getHistoricalName: (s: number) => "Sinaloa (Culiacán, Porto di Mazatlán & Valli Agricole)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Sinaloa",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_YUC: {
    id: "MX_YUC",
    iso: "MX-YUC",
    name: "Yucatán",
    modernName: "Estado Libre y Soberano de Yucatán",
    historicalName: "Yucatán (Mérida, Porto di Progreso & Oro Verde dell'Henequén)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Yucatán (Gobernador Florencio Palomo / Humberto Canto Echeverría)",
    capital: "Mérida",
    region: "Sureste",
    isTerritory: false,
    historicalToponym: "Mérida / Progreso / Valladolid / Ticul / Motul",
    s0_1: "Stato dello Yucatán. Patria mondiale dell''Oro Verde' (henequén, fibra di sisal), vitale per le corde navali e spaghi da mietitura dell'agricoltura globale. Nell'agosto 1937, Cárdenas giunge personalmente a Mérida e firma l'epocale decreto che espropria oltre 360.000 ettari delle ricche haciendas henequeneras per creare il 'Gran Ejido de Yucatán'. Porto oceanico a Progreso.",
    s2_4: "Stato dello Yucatán. Gestione cooperativa delle haciendas henequeneras attraverso la società pubblica Henequeneros de Yucatán; ripresa delle esportazioni di cordami verso i mercati marittimi internazionali; tutela del patrimonio archeologico maya.",
    s5_6: "Stato dello Yucatán (settembre 1939 - giugno 1940). Con l'inizio della guerra navale europea, la domanda di fibra di henequén per gomene e funi da ormeggio navale registra un'impennata; il porto di Progreso intensifica i carichi verso i porti dell'Atlantico.",
    s7: "Stato dello Yucatán (ottobre 1940). Il governatore Humberto Canto Echeverría coordina con Città del Messico la stabilità dei prezzi del sisal; rafforzamento della sorveglianza delle coste settentrionali della penisola.",
    s8: "Stato dello Yucatán (aprile 1941). L'henequén yucateco diventa un materiale strategico bellico prioritario per la marina e l'agricoltura alleata; le banchine di Progreso lavorano a ritmo serrato per rifornire la flotta mercantile transatlantica.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_YUC"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_YUC"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_YUC"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_YUC"].s2_4;
      return MEXICO_PROVINCES_META["MX_YUC"].s0_1;
    },
    getHistoricalName: (s: number) => "Yucatán (Mérida, Porto di Progreso & Oro Verde dell'Henequén)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Yucatán",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_VER: {
    id: "MX_VER",
    iso: "MX-VER",
    name: "Veracruz",
    modernName: "Estado Libre y Soberano de Veracruz de Ignacio de la Llave",
    historicalName: "Veracruz (Porto di Veracruz, Petrolio di Poza Rica & Minatitlán)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Veracruz (Gobernador Miguel Alemán Valdés / Jorge Cerdán)",
    capital: "Jalapa Enríquez (Xalapa)",
    region: "Oriente",
    isTerritory: false,
    historicalToponym: "Puerto de Veracruz / Poza Rica / Minatitlán / Orizaba / Coatzacoalcos / Tuxpan",
    s0_1: "Stato di Veracruz. Polo strategico per eccellenza: il porto marittimo di Veracruz è la porta atlantica del Messico; a Poza Rica esplode il più ricco giacimento petrolifero della nazione; raffineria di Minatitlán e terminale di Tuxpan. A Orizaba operano i colossi tessili e birrari. Il governatore Miguel Alemán Valdés (futuro presidente) gestisce con perizia politica la transizione.",
    s2_4: "Stato di Veracruz (18 Marzo 1938). Requisizione pacifica degli impianti petroliferi di Poza Rica e Minatitlán per conto della neocostituita PEMEX; a giugno 1939 il porto di Veracruz accoglie tra ali di folla commossa il piroscafo Sinaia con 1.600 esuli repubblicani spagnoli in fuga dalla dittatura franchista.",
    s5_6: "Stato di Veracruz (settembre 1939 - giugno 1940). Poza Rica produce oltre il 60% dell'intero greggio nazionale; gli oleodotti pompano petrolio verso la costa per il consumo nazionale; Veracruz applica rigorosi protocolli di neutralità marittima per tutte le navi straniere.",
    s7: "Stato di Veracruz (ottobre 1940). Miguel Alemán conclude il proprio brillante mandato governativo per assumere la direzione della vittoriosa campagna presidenziale di Manuel Ávila Camacho; Veracruz rimane il cuore logistico ed energetico della Repubblica.",
    s8: "Stato di Veracruz (aprile 1941). Nel porto di Veracruz, la Marina da Guerra messicana prende in custodia e interna le navi mercantili e petroliere dell'Asse (tedesche e italiane) per prevenire sabotaggi; Poza Rica e Minatitlán aumentano le quote di greggio per l'industria alleata.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_VER"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_VER"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_VER"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_VER"].s2_4;
      return MEXICO_PROVINCES_META["MX_VER"].s0_1;
    },
    getHistoricalName: (s: number) => "Veracruz (Porto di Veracruz, Petrolio di Poza Rica & Minatitlán)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Veracruz",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_JAL: {
    id: "MX_JAL",
    iso: "MX-JAL",
    name: "Jalisco",
    modernName: "Estado Libre y Soberano de Jalisco",
    historicalName: "Jalisco (Guadalajara - Perla de Occidente, Tequila & Los Altos)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Jalisco (Gobernador Everardo Topete / Silvano Barba González)",
    capital: "Guadalajara",
    region: "Occidente",
    isTerritory: false,
    historicalToponym: "Guadalajara / Puerto Vallarta / Ciudad Guzmán / Lagos de Moreno / Tequila",
    s0_1: "Stato di Jalisco. Seconda metropoli e capitale culturale del Messico a Guadalajara; manifatture tessili, calzaturiere e alimentari. Regione di Tequila per la distillazione dell'agave; florido bacino lattiero-caseario e agricolo di Los Altos. Cuore della tradizione cattolica messicana, teatro di tensioni post-cristeras e nascita dell'Unión Nacional Sinarquista nel 1937.",
    s2_4: "Stato di Jalisco. Cárdenas applica una politica di conciliazione religiosa che attenua le storiche frizioni con il clero; espansione industriale e commerciale a Guadalajara; modernizzazione della rete idrica e stradale.",
    s5_6: "Stato di Jalisco (settembre 1939 - giugno 1940). Il governatore Silvano Barba González mantiene la concordia sociale; Guadalajara si afferma come nodo di smistamento per i rifornimenti agricoli dell'ovest messicano.",
    s7: "Stato di Jalisco (ottobre 1940). Forte mobilitazione civile e politica in occasione delle elezioni presidenziali; Jalisco accoglie con favore l'orientamento conciliante e moderato di Manuel Ávila Camacho.",
    s8: "Stato di Jalisco (aprile 1941). Piena ripresa della fiducia economica; le fabbriche di Guadalajara lavorano a ritmo serrato; sviluppo del litorale peschereccio di Puerto Vallarta e della costa occidentale.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_JAL"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_JAL"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_JAL"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_JAL"].s2_4;
      return MEXICO_PROVINCES_META["MX_JAL"].s0_1;
    },
    getHistoricalName: (s: number) => "Jalisco (Guadalajara - Perla de Occidente, Tequila & Los Altos)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Jalisco",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_MIC: {
    id: "MX_MIC",
    iso: "MX-MIC",
    name: "Michoacán",
    modernName: "Estado Libre y Soberano de Michoacán de Ocampo",
    historicalName: "Michoacán (Morelia, Jiquilpan & Ejidos Collettivi di Nueva Italia)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Michoacán (Gobernador Dámaso Cárdenas / Félix Ireta Viveros)",
    capital: "Morelia",
    region: "Occidente",
    isTerritory: false,
    historicalToponym: "Morelia / Uruapan / Pátzcuaro / Jiquilpan / Apatzingán / Nueva Italia",
    s0_1: "Stato di Michoacán. Stato natale del presidente Lázaro Cárdenas (nato a Jiquilpan), guidato dal fratello Dámaso Cárdenas. Modello dell'avanguardia sociale messicana: nel 1937 la città coloniale di Morelia accoglie con immenso affetto i 456 'Niños de Morelia' (orfani e figli di repubblicani spagnoli). Nel 1938 espropriazione dei latifondi di Lombardía e Nueva Italia nella Tierra Caliente per creare floridi ejidos cooperativi.",
    s2_4: "Stato di Michoacán. Pieno successo produttivo degli ejidos di riso e agrumi di Nueva Italia; valorizzazione delle comunità artigiane indigene purépecha di Pátzcuaro e Uruapan; Cárdenas trascorre frequenti soggiorni nella sua terra natale per sovrintendere ai progetti agrari.",
    s5_6: "Stato di Michoacán (settembre 1939 - giugno 1940). Piena lealtà politica ed economica al governo federale; le scuole rurali e gli istituti tecnici di Morelia formano migliaia di nuovi maestri e tecnici agrari.",
    s7: "Stato di Michoacán (ottobre 1940). Elezione del generale Félix Ireta Viveros a governatore; continuità delle riforme socio-agrarie e ammodernamento delle strade montane verso la capitale federale.",
    s8: "Stato di Michoacán (aprile 1941). Michoacán rifornisce di legname, frutta e riso i centri industriali della nazione; la costa pacifica e la rada di Melchor Ocampo (futura Lázaro Cárdenas) vengono inserite nei piani di sviluppo marittimo.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_MIC"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_MIC"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_MIC"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_MIC"].s2_4;
      return MEXICO_PROVINCES_META["MX_MIC"].s0_1;
    },
    getHistoricalName: (s: number) => "Michoacán (Morelia, Jiquilpan & Ejidos Collettivi di Nueva Italia)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Michoacán",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_GRO: {
    id: "MX_GRO",
    iso: "MX-GRO",
    name: "Guerrero",
    modernName: "Estado Libre y Soberano de Guerrero",
    historicalName: "Guerrero (Chilpancingo, Porto di Acapulco & Argento di Taxco)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Guerrero (Gobernador Alberto F. Berber / Gerardo R. Catalán)",
    capital: "Chilpancingo de los Bravo",
    region: "Suroeste",
    isTerritory: false,
    historicalToponym: "Chilpancingo / Acapulco / Taxco de Alarcón / Iguala / Zihuatanejo",
    s0_1: "Stato di Guerrero. Territorio montuoso e litorale pacifico. A Taxco de Alarcón rinasce l'oreficeria e l'artigianato dell'argento grazie al celebre laboratorio di William Spratling; storico porto marittimo di Acapulco, collegato alla capitale dalla nuova arteria carrozzabile e destinato a divenire scalo aeronavale.",
    s2_4: "Stato di Guerrero. Espansione delle piantagioni di palma da cocco (copra) e sesamo lungo la Costa Grande e Costa Chica; incremento dell'estrazione di argento a Taxco; Acapulco amplia le strutture portuali per la marina da guerra.",
    s5_6: "Stato di Guerrero (settembre 1939 - giugno 1940). La baia di Acapulco funge da punto d'appoggio per i pattugliatori navali della marina militare nel Pacifico meridionale; stretta vigilanza su velivoli ed imbarcazioni straniere.",
    s7: "Stato di Guerrero (ottobre 1940). Elezione del generale Gerardo R. Catalán Calvo; potenziamento della pista d'atterraggio di Acapulco per consentire collegamenti aerei rapidi con Città del Messico.",
    s8: "Stato di Guerrero (aprile 1941). Acapulco viene integrata nelle rotte di ricognizione aerea marittima per la difesa delle coste occidentali mesoamericane; l'argento di Taxco alimenta le riserve valutarie federali.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_GRO"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_GRO"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_GRO"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_GRO"].s2_4;
      return MEXICO_PROVINCES_META["MX_GRO"].s0_1;
    },
    getHistoricalName: (s: number) => "Guerrero (Chilpancingo, Porto di Acapulco & Argento di Taxco)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Guerrero",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_OAX: {
    id: "MX_OAX",
    iso: "MX-OAX",
    name: "Oaxaca",
    modernName: "Estado Libre y Soberano de Oaxaca",
    historicalName: "Oaxaca (Oaxaca de Juárez, Istmo di Tehuantepec & Salina Cruz)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Oaxaca (Gobernador Constantino Chapital / Vicente González)",
    capital: "Oaxaca de Juárez",
    region: "Suroeste",
    isTerritory: false,
    historicalToponym: "Oaxaca de Juárez / Salina Cruz / Santo Domingo Tehuantepec / Juchitán / Tuxtepec",
    s0_1: "Stato di Oaxaca. Ricchezza culturale zapoteca e mixteca. Nodo geostrategico fondamentale nell'Istmo di Tehuantepec, con la ferrovia transistmica che collega il porto pacifico di Salina Cruz al Golfo del Messico (Coatzacoalcos). Caffè nella Sierra Sur, tabacco nel bacino del Papaloapan e tutela delle terre comunali indigene voluta da Cárdenas.",
    s2_4: "Stato di Oaxaca. Ammodernamento dei binari ferroviari dell'Istmo di Tehuantepec per garantire una via di comunicazione interoceanica alternativa protetta; rafforzamento della base navale di Salina Cruz.",
    s5_6: "Stato di Oaxaca (settembre 1939 - giugno 1940). L'Istmo di Tehuantepec acquisisce valore strategico continentale di primo piano per la sicurezza dell'America centrale; truppe federali presidiano i ponti ferroviari e il porto petrolifero di Salina Cruz.",
    s7: "Stato di Oaxaca (ottobre 1940). Il governatore Vicente González Fernández assume la guida dello stato, consolidando le scuole bilingui rurali e la sanità comunitaria nelle valli centrali e nella Sierra.",
    s8: "Stato di Oaxaca (aprile 1941). Salina Cruz opera a pieno ritmo come terminale per le cisterne petrolifere di PEMEX dirette ai porti del Pacifico; la ferrovia transistmica trasporta materiali strategici a ritmo continuo.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_OAX"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_OAX"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_OAX"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_OAX"].s2_4;
      return MEXICO_PROVINCES_META["MX_OAX"].s0_1;
    },
    getHistoricalName: (s: number) => "Oaxaca (Oaxaca de Juárez, Istmo di Tehuantepec & Salina Cruz)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Oaxaca",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_MEX: {
    id: "MX_MEX",
    iso: "MX-MEX",
    name: "México",
    modernName: "Estado Libre y Soberano de México",
    historicalName: "Estado de México (Toluca - Valle di Toluca & Cintura Industriale)",
    adminTitle: "Estados Unidos Mexicanos — Estado de México (Gobernador Eucario López Contreras / Alfredo Zárate Albarrán)",
    capital: "Toluca de Lerdo",
    region: "Centro-Sur",
    isTerritory: false,
    historicalToponym: "Toluca / Tlalnepantla / Naucalpan / Texcoco / Valle de Bravo",
    s0_1: "Stato del Messico (capitale Toluca). Circonda il Distretto Federale su tre lati. Polo agricolo e manifatturiero nella valle di Toluca (tessuti, birra, cereali); prime zone di espansione industriale a Tlalnepantla e Naucalpan; centrali idroelettriche e bacini montani del Nevado de Toluca.",
    s2_4: "Estado de México. Riforma agraria estesa nelle valli rurali di Ixtlahuaca e Texcoco; le industrie tessili e meccaniche di Toluca e della periferia settentrionale crescono a supporto del mercato metropolitano.",
    s5_6: "Estado de México (settembre 1939 - giugno 1940). Pieno supporto alla politica di mobilitazione industriale del governo federale; incremento della fornitura di energia elettrica verso la capitale.",
    s7: "Estado de México (ottobre 1940). Transizione politica ordinata; pianificazione dell'ampliamento delle vie di comunicazione e ferrovie radiali convergenti su Città del Messico.",
    s8: "Estado de México (aprile 1941). Elezione di Alfredo Zárate Albarrán; accelerazione dell'insediamento di stabilimenti manifatturieri e chimici per sostenere la produzione continentale.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_MEX"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_MEX"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_MEX"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_MEX"].s2_4;
      return MEXICO_PROVINCES_META["MX_MEX"].s0_1;
    },
    getHistoricalName: (s: number) => "Estado de México (Toluca - Valle di Toluca & Cintura Industriale)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de México",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_CMX: {
    id: "MX_CMX",
    iso: "MX-CMX",
    name: "Ciudad de México",
    modernName: "Ciudad de México (Distrito Federal 1936-1941)",
    historicalName: "Distrito Federal (Ciudad de México - Palacio Nacional & Zócalo)",
    adminTitle: "Estados Unidos Mexicanos — Departamento del Distrito Federal (Regente Cosme Hinojosa / José Siurob / Javier Rojo Gómez)",
    capital: "Ciudad de México",
    region: "Centro",
    isTerritory: false,
    historicalToponym: "Palacio Nacional / Zócalo / Coyoacán / Chapultepec / Los Pinos / Tlatelolco",
    s0_1: "Distretto Federale (Città del Messico). Capitale federale della Repubblica. Sede del potere politico (Palacio Nacional, residenza presidenziale di Los Pinos inaugurata da Cárdenas). Nel gennaio 1937, accoglie il rifugiato politico Leon Trotsky nella casa-fortezza di Coyoacán. Fondazione della CTM e della Casa de España (poi El Colegio de México) per gli intellettuali esuli spagnoli.",
    s2_4: "Distrito Federal (18 Marzo 1938). Il Zócalo è teatro della più grande manifestazione patriottica della storia messicana: centinaia di migliaia di cittadini acclamano il Decreto di Espropriazione Petrolifera di Cárdenas; folle di donne donano gioielli e risparmi al Palacio de Bellas Artes per pagare l'indennizzo petrolifero; quartier generale di PEMEX e FNM.",
    s5_6: "Distrito Federal (settembre 1939 - giugno 1940). Centro della diplomazia panamericana neutrale. Il 20 agosto 1940, nella sua casa di Coyoacán, Leon Trotsky viene mortalmente ferito dal sicario stalinista Ramón Mercader; Cárdenas garantisce funerali solenni e protegge la vedova Natalya Sedova; elezioni presidenziali combattute del luglio 1940.",
    s7: "Distrito Federal (ottobre 1940). Il reggente Javier Rojo Gómez organizza i preparativi per il passaggio di poteri presidenziali al generale Manuel Ávila Camacho (1° dicembre 1940); delegazioni diplomatiche da tutto il continente affollano la capitale.",
    s8: "Distrito Federal (aprile 1941). Presidenza Ávila Camacho: firma della pace petrolifera e cooperazione economica con Washington; Città del Messico si afferma come fulcro cosmopolita dell'antifascismo intellettuale e artistico delle Americhe (muralisti Rivera, Orozco, Siqueiros).",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_CMX"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_CMX"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_CMX"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_CMX"].s2_4;
      return MEXICO_PROVINCES_META["MX_CMX"].s0_1;
    },
    getHistoricalName: (s: number) => "Distrito Federal (Ciudad de México - Palacio Nacional & Zócalo)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Departamento del Distrito Federal",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_MOR: {
    id: "MX_MOR",
    iso: "MX-MOR",
    name: "Morelos",
    modernName: "Estado Libre y Soberano de Morelos",
    historicalName: "Morelos (Cuernavaca, Cuautla & Cooperativa Zuccheriera di Zacatepec)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Morelos (Gobernador José Refugio Bustamante / Elpidio Perdomo)",
    capital: "Cuernavaca",
    region: "Centro-Sur",
    isTerritory: false,
    historicalToponym: "Cuernavaca / Cuautla / Zacatepec (Ingenio Emiliano Zapata) / Jojutla",
    s0_1: "Stato di Morelos. 'Culla dello Zapatismo'. Nel febbraio 1938, Cárdenas realizza gli ideali di Emiliano Zapata inaugurando a Zacatepec il gigantesco Ingenio Emiliano Zapata, il più moderno zuccherificio del paese, gestito direttamente come cooperativa dai campesinos locali. Cuernavaca è un rinomato centro climatico e residenziale con i murales di Diego Rivera al Palacio de Cortés.",
    s2_4: "Stato di Morelos. Piena entrata a regime dell'Ingenio di Zacatepec, simbolo dell'emancipazione contadina; produzione record di zucchero e alcool industriale; pace sociale consolidata nelle comunità zapatiste.",
    s5_6: "Stato di Morelos (settembre 1939 - giugno 1940). Lo zucchero di Morelos soddisfa la domanda alimentare nazionale ed estera; Cuernavaca ospita personalità diplomatiche e culturali internazionali.",
    s7: "Stato di Morelos (ottobre 1940). Il governatore Elpidio Perdomo supervisiona la stabilità dei prezzi agricoli e la modernizzazione delle scuole agrarie statali.",
    s8: "Stato di Morelos (aprile 1941). Zacatepec produce a ritmo serrato melassa e zucchero raffinato; sviluppo delle comunicazioni stradali verso il sud e il Pacifico.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_MOR"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_MOR"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_MOR"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_MOR"].s2_4;
      return MEXICO_PROVINCES_META["MX_MOR"].s0_1;
    },
    getHistoricalName: (s: number) => "Morelos (Cuernavaca, Cuautla & Cooperativa Zuccheriera di Zacatepec)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Morelos",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_PUE: {
    id: "MX_PUE",
    iso: "MX-PUE",
    name: "Puebla",
    modernName: "Estado Libre y Soberano de Puebla",
    historicalName: "Puebla (Puebla de Zaragoza, Atlixco - Polo Tessile & Tehuacán)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Puebla (Gobernador Gen. Maximino Ávila Camacho / Gonzalo Bautista)",
    capital: "Puebla de Zaragoza",
    region: "Oriente",
    isTerritory: false,
    historicalToponym: "Puebla de Zaragoza / Atlixco / Tehuacán / Huauchinango / Cholula",
    s0_1: "Stato di Puebla. Grande potenza manifatturiera tessile (filature di cotone di Atlixco e Puebla) e artigianale (ceramica Talavera). Retto con mano ferma dal generale Maximino Ávila Camacho (fratello maggiore di Manuel), che controlla la politica locale con metodi autoritari e favorisce l'ascesa presidenziale del fratello; agricoltura e sorgenti termali a Tehuacán.",
    s2_4: "Stato di Puebla. Maximino Ávila Camacho reprime l'attivismo comunista e consolida la propria influenza politica nazionale; le fabbriche tessili di Atlixco producono tessuti e uniformi per il fabbisogno repubblicano.",
    s5_6: "Stato di Puebla (settembre 1939 - giugno 1940). Puebla funge da quartier generale elettorale e strategico per la candidatura di Manuel Ávila Camacho alla presidenza del Messico; forte disciplina militare e controllo delle vie di comunicazione verso Veracruz.",
    s7: "Stato di Puebla (ottobre 1940). Trionfo politico della famiglia Ávila Camacho con l'imminente insediamento presidenziale di Manuel; Maximino prepara la transizione al governatore Gonzalo Bautista Castillo.",
    s8: "Stato di Puebla (aprile 1941). L'industria tessile e meccanica di Puebla si espande rapidamente per soddisfare la crescente domanda di commesse manifatturiere alleate; Tehuacán consolida la propria notorietà agroalimentare.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_PUE"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_PUE"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_PUE"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_PUE"].s2_4;
      return MEXICO_PROVINCES_META["MX_PUE"].s0_1;
    },
    getHistoricalName: (s: number) => "Puebla (Puebla de Zaragoza, Atlixco - Polo Tessile & Tehuacán)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Puebla",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_TLA: {
    id: "MX_TLA",
    iso: "MX-TLA",
    name: "Tlaxcala",
    modernName: "Estado Libre y Soberano de Tlaxcala",
    historicalName: "Tlaxcala (Tlaxcala de Xicohténcatl & Snodo Ferroviario di Apizaco)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Tlaxcala (Gobernador Isidro Candia / Manuel Santillán)",
    capital: "Tlaxcala de Xicohténcatl",
    region: "Oriente",
    isTerritory: false,
    historicalToponym: "Tlaxcala / Apizaco (Officine FNM) / Huamantla / Calpulalpan",
    s0_1: "Stato di Tlaxcala. Lo stato più piccolo della federazione. Polo ferroviario strategico ad Apizaco, sede delle officine di riparazione del materiale rotabile della FNM sulla linea Messico-Veracruz; produzione di pulque, mais e tessuti di lana; riforma agraria promossa dal governatore Isidro Candia.",
    s2_4: "Stato di Tlaxcala. Gli operai ferroviari di Apizaco mantengono in perfetta efficienza i convogli cisterna carichi di greggio e carburante dopo la nazionalizzazione petrolifera; cooperative tessili a Huamantla.",
    s5_6: "Stato di Tlaxcala (settembre 1939 - giugno 1940). Il nodo di Apizaco gestisce volumi crescenti di traffico mercantile diretto al porto di Veracruz; stabilità sociale e politica.",
    s7: "Stato di Tlaxcala (ottobre 1940). Elezione dell'ingegnere geologo Manuel Santillán a governatore; sostegno incondizionato alla presidenza di Manuel Ávila Camacho.",
    s8: "Stato di Tlaxcala (aprile 1941). Piena operatività degli scali ferroviari; la produzione agricola e tessile contribuisce all'approvvigionamento del centro del paese.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_TLA"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_TLA"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_TLA"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_TLA"].s2_4;
      return MEXICO_PROVINCES_META["MX_TLA"].s0_1;
    },
    getHistoricalName: (s: number) => "Tlaxcala (Tlaxcala de Xicohténcatl & Snodo Ferroviario di Apizaco)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Tlaxcala",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_GUA: {
    id: "MX_GUA",
    iso: "MX-GUA",
    name: "Guanajuato",
    modernName: "Estado Libre y Soberano de Guanajuato",
    historicalName: "Guanajuato (León, Calzature, Miniere d'Argento & Granaio del Bajío)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Guanajuato (Gobernador Enrique Fernández Martínez / Enrique Hernández Álvarez)",
    capital: "Guanajuato",
    region: "Centro-Norte",
    isTerritory: false,
    historicalToponym: "Guanajuato / León / Irapuato / Celaya / Salamanca / San Miguel de Allende",
    s0_1: "Stato di Guanajuato. Cuore storico della guerra d'indipendenza e del Bajío. A León fiorisce la capitale nazionale della calzatura e del cuoio; a Guanajuato operano le storiche miniere d'argento (Valenciana e Rayas); agricoltura fertile a Celaya e Irapuato. Roccaforte del cattolicesimo tradizionale, vede la nascita del movimento sinarchista (UNS) nel maggio 1937.",
    s2_4: "Stato di Guanajuato. Cárdenas gestisce con prudenza le tensioni con i movimenti cattolici del Bajío; espansione delle botteghe calzaturiere di León e incremento delle estrazioni d'argento.",
    s5_6: "Stato di Guanajuato (settembre 1939 - giugno 1940). Il Bajío rifornisce di grano, fagioli e verdure l'intero paese; a Salamanca si pongono le basi per i futuri impianti di raffinazione petrolifera di PEMEX; le calzature di León equipaggiano le forze armate.",
    s7: "Stato di Guanajuato (ottobre 1940). Elezione del dottor Enrique Hernández Álvarez; distensione sociale e accoglienza calorosa alla politica di pacificazione nazionale annunciata da Ávila Camacho.",
    s8: "Stato di Guanajuato (aprile 1941). Piena ripresa delle attività minerarie e industriali; Salamanca viene confermata come futuro nodo di raffinazione centrale; León registra commesse record di stivali e cuoio per l'esportazione.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_GUA"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_GUA"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_GUA"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_GUA"].s2_4;
      return MEXICO_PROVINCES_META["MX_GUA"].s0_1;
    },
    getHistoricalName: (s: number) => "Guanajuato (León, Calzature, Miniere d'Argento & Granaio del Bajío)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Guanajuato",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_QUE: {
    id: "MX_QUE",
    iso: "MX-QUE",
    name: "Querétaro",
    modernName: "Estado Libre y Soberano de Querétaro",
    historicalName: "Querétaro (Santiago de Querétaro - Culla della Costituzione del 1917)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Querétaro (Gobernador Ramón Rodríguez Familiar / Noradino Rubio)",
    capital: "Santiago de Querétaro",
    region: "Centro-Norte",
    isTerritory: false,
    historicalToponym: "Santiago de Querétaro / San Juan del Río / Cadereyta / Jalpan de Serra",
    s0_1: "Stato di Querétaro. 'Culla della Costituzione del 1917' (promulgata al Teatro de la República). Importante crocevia geografico tra la capitale e il nord; manifatture tessili (La Hércules), cave di opali, allevamento e agricoltura fertile nel Bajío queretano.",
    s2_4: "Stato di Querétaro. Il governatore Ramón Rodríguez Familiar consolida le scuole rurali e le riforme agrarie nel distretto di San Juan del Río; rispetto dei monumenti storici e costituzionali.",
    s5_6: "Stato di Querétaro (settembre 1939 - giugno 1940). Piena efficienza dei raccordi ferroviari che attraversano la capitale; le industrie tessili lavorano a pieno organico; stabilità politica.",
    s7: "Stato di Querétaro (ottobre 1940). Transizione sotto il governatore Noradino Rubio Ortiz; accordi agricoli per incrementare i raccolti di mais e frumento.",
    s8: "Stato di Querétaro (aprile 1941). Querétaro consolida la propria vocazione logistica e agroindustriale lungo l'asse centrale della repubblica.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_QUE"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_QUE"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_QUE"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_QUE"].s2_4;
      return MEXICO_PROVINCES_META["MX_QUE"].s0_1;
    },
    getHistoricalName: (s: number) => "Querétaro (Santiago de Querétaro - Culla della Costituzione del 1917)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Querétaro",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_HID: {
    id: "MX_HID",
    iso: "MX-HID",
    name: "Hidalgo",
    modernName: "Estado Libre y Soberano de Hidalgo",
    historicalName: "Hidalgo (Pachuca de Soto - Miniere d'Argento di Real del Monte)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Hidalgo (Gobernador Javier Rojo Gómez / José Lugo Guerrero)",
    capital: "Pachuca de Soto",
    region: "Centro-Oriente",
    isTerritory: false,
    historicalToponym: "Pachuca de Soto / Real del Monte / Tulancingo / Tula de Allende / Actopan",
    s0_1: "Stato di Hidalgo. Uno dei più celebri distretti argentiferi del mondo a Pachuca e Real del Monte (Compañía de Real del Monte y Pachuca). Forte tradizione sindacale tra i minatori (Sindicato Minero). Nella Valle del Mezquital fiorisce la coltivazione del maguey pulquero e a Tulancingo le manifatture tessili di lana.",
    s2_4: "Stato di Hidalgo. Il governatore Javier Rojo Gómez applica riforme agrarie e sostiene i diritti dei lavoratori delle miniere; Pachuca produce milioni di once d'argento per la coniazione e per le riserve monetarie internazionali.",
    s5_6: "Stato di Hidalgo (settembre 1939 - giugno 1940). La domanda di argento, piombo e zinco cresce costantemente con l'inizio delle ostilità in Europa; le fonderie di Pachuca garantiscono metalli pesanti all'industria.",
    s7: "Stato di Hidalgo (ottobre 1940). Javier Rojo Gómez viene nominato da Ávila Camacho capo del Dipartimento del Distretto Federale; a Hidalgo subentra José Lugo Guerrero, che prosegue l'espansione delle infrastrutture.",
    s8: "Stato di Hidalgo (aprile 1941). Piena militarizzazione della vigilanza sui depositi minerari e fornitura regolare di metalli strategici alle potenze alleate; Tulancingo sforna coperte e uniformi militari in lana.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_HID"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_HID"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_HID"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_HID"].s2_4;
      return MEXICO_PROVINCES_META["MX_HID"].s0_1;
    },
    getHistoricalName: (s: number) => "Hidalgo (Pachuca de Soto - Miniere d'Argento di Real del Monte)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Hidalgo",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_SLP: {
    id: "MX_SLP",
    iso: "MX-SLP",
    name: "San Luis Potosí",
    modernName: "Estado Libre y Soberano de San Luis Potosí",
    historicalName: "San Luis Potosí (Fonderie ASARCO, Huasteca & Rivolta di Cedillo)",
    adminTitle: "Estados Unidos Mexicanos — Estado de San Luis Potosí (Gobernador Gen. Mateo Hernández / Reynaldo Pérez)",
    capital: "San Luis Potosí",
    region: "Centro-Norte",
    isTerritory: false,
    historicalToponym: "San Luis Potosí / Ciudad Valles / Matehuala / Rioverde / Tamazunchale",
    s0_1: "Stato di San Luis Potosí. Snodo ferroviario e polo minerario-metallurgico con le grandi fonderie ASARCO nella capitale. Agricoltura tropicale nella Huasteca Potosina (canna, agrumi). Lo stato è dominato dal potente cacicco generale Saturnino Cedillo, già ministro dell'Agricoltura di Cárdenas, che controlla milizie agrarie personali.",
    s2_4: "Stato di San Luis Potosí (Maggio 1938 - Gennaio 1939). La Rivolta di Cedillo: in rottura con Cárdenas sull'espropriazione petrolifera e l'educazione socialista, Cedillo si solleva in armi con il sostegno di compagnie petrolifere estere; Cárdenas giunge personalmente a San Luis Potosí alla testa dell'esercito federale e stronca la ribellione; Cedillo muore in combattimento nel gennaio 1939.",
    s5_6: "Stato di San Luis Potosí (settembre 1939 - giugno 1940). Pacificazione integrale dello stato sotto il comando federale; le fonderie ASARCO lavorano a pieno ritmo; apertura del tratto montano strategico della Carretera Panamericana attraverso Tamazunchale.",
    s7: "Stato di San Luis Potosí (ottobre 1940). Il governatore Reynaldo Pérez Gallardo ristabilisce le organizzazioni ejidali e la cooperazione contadina; Ciudad Valles diventa polo di raffinazione dello zucchero.",
    s8: "Stato di San Luis Potosí (aprile 1941). Fonderie e miniere di Matehuala e Charcas producono concentrati metallurgici essenziali per l'industria della difesa continentale; normalità politica consolidata.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_SLP"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_SLP"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_SLP"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_SLP"].s2_4;
      return MEXICO_PROVINCES_META["MX_SLP"].s0_1;
    },
    getHistoricalName: (s: number) => "San Luis Potosí (Fonderie ASARCO, Huasteca & Rivolta di Cedillo)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de San Luis Potosí",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_ZAC: {
    id: "MX_ZAC",
    iso: "MX-ZAC",
    name: "Zacatecas",
    modernName: "Estado Libre y Soberano de Zacatecas",
    historicalName: "Zacatecas (Fresnillo - Capitale Mondiale dell'Argento & Sombrerete)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Zacatecas (Gobernador Félix Bañuelos / Gen. Pánfilo Natera)",
    capital: "Zacatecas",
    region: "Centro-Norte",
    isTerritory: false,
    historicalToponym: "Zacatecas / Fresnillo (Mina Proaño) / Sombrerete / Jerez / Mazapil",
    s0_1: "Stato di Zacatecas. Cuore argentifero storico: la miniera Proaño a Fresnillo è la maggiore produttrice mondiale di argento primario; importanti giacimenti di piombo, zinco e rame a Sombrerete e Mazapil. Allevamento bovino e colture di fagioli e peperoncino negli altopiani semiaridi; governo del veterano rivoluzionario Félix Bañuelos.",
    s2_4: "Stato di Zacatecas. Le estrazioni minerarie di Fresnillo battono record di tonnellaggio; Cárdenas visita le comunità contadine per accelerare l'assegnazione di titoli ejidali.",
    s5_6: "Stato di Zacatecas (settembre 1939 - giugno 1940). La domanda internazionale di metalli industriali (piombo e zinco per le leghe) traina l'economia statale; elezione del leggendario generale rivoluzionario Pánfilo Natera a governatore.",
    s7: "Stato di Zacatecas (ottobre 1940). Il generale Pánfilo Natera assicura ordine, disciplina militare e piena lealtà al governo federale di Manuel Ávila Camacho.",
    s8: "Stato di Zacatecas (aprile 1941). Fresnillo e Sombrerete operano senza sosta per le forniture di metalli non ferrosi destinate agli accordi commerciali panamericani.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_ZAC"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_ZAC"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_ZAC"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_ZAC"].s2_4;
      return MEXICO_PROVINCES_META["MX_ZAC"].s0_1;
    },
    getHistoricalName: (s: number) => "Zacatecas (Fresnillo - Capitale Mondiale dell'Argento & Sombrerete)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Zacatecas",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_AGU: {
    id: "MX_AGU",
    iso: "MX-AGU",
    name: "Aguascalientes",
    modernName: "Estado Libre y Soberano de Aguascalientes",
    historicalName: "Aguascalientes (Officine Ferroviarie Centrali FNM & Vigneti)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Aguascalientes (Gobernador Juan G. Alvarado / Alberto del Valle)",
    capital: "Aguascalientes",
    region: "Centro-Norte",
    isTerritory: false,
    historicalToponym: "Aguascalientes / Rincón de Romos / Calvillo / Jesús María",
    s0_1: "Stato di Aguascalientes. Snodo ferroviario cardine della Repubblica: a Aguascalientes hanno sede le gigantesche Officine Centrali di Riparazione delle Ferrovie Nazionali (FNM), dove operano migliaia di esperti meccanici e calderai consorziati nella CTM. Coltivazione di uva, guayaba a Calvillo e industrie tessili.",
    s2_4: "Stato di Aguascalientes. Durante la gestione operaia delle ferrovie (Amministrazione Operaia della FNM stabilita da Cárdenas nel 1937-1938), le officine di Aguascalientes riparano e costruiscono locomotive e vagoni per il trasporto del petrolio e dei minerali.",
    s5_6: "Stato di Aguascalientes (settembre 1939 - giugno 1940). Il traffico ferroviario raggiunge picchi storici; le officine lavorano su turni continuativi per garantire la mobilità delle merci verso il nord e la capitale.",
    s7: "Stato di Aguascalientes (ottobre 1940). Transizione ordinata sotto la guida del governatore Alberto del Valle; stabilità sindacale e forte crescita dei raccolti agricoli.",
    s8: "Stato di Aguascalientes (aprile 1941). Aguascalientes si conferma nodo insostituibile per la manutenzione dei treni merci che trasportano materie prime belliche e generi alimentari verso la frontiera statunitense.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_AGU"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_AGU"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_AGU"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_AGU"].s2_4;
      return MEXICO_PROVINCES_META["MX_AGU"].s0_1;
    },
    getHistoricalName: (s: number) => "Aguascalientes (Officine Ferroviarie Centrali FNM & Vigneti)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Aguascalientes",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  },

  MX_DUR: {
    id: "MX_DUR",
    iso: "MX-DUR",
    name: "Durango",
    modernName: "Estado Libre y Soberano de Durango",
    historicalName: "Durango (Cerro del Mercado - Montagna di Ferro & Legname)",
    adminTitle: "Estados Unidos Mexicanos — Estado de Durango (Gobernador Enrique R. Calderón / Elpidio G. Velázquez)",
    capital: "Victoria de Durango",
    region: "Norte",
    isTerritory: false,
    historicalToponym: "Victoria de Durango / Gómez Palacio / Lerdo / El Salto / Santiago Papasquiaro",
    s0_1: "Stato di Durango. Ai margini della capitale sorge il Cerro del Mercado, una delle più imponenti montagne di minerale di ferro ematite e magnetite del pianeta, che alimenta gli altiforni di Monterrey. A Gómez Palacio e Lerdo si estende la quota duranguense della Comarca Lagunera; foreste di pini della Sierra Madre a El Salto.",
    s2_4: "Stato di Durango. L'estrazione di ferro al Cerro del Mercado cresce per soddisfare la siderurgia nazionale; partecipazione attiva degli operai tessili e dei contadini di Gómez Palacio alle cooperative della Laguna.",
    s5_6: "Stato di Durango (settembre 1939 - giugno 1940). Il governatore generale Elpidio G. Velázquez coordina le riserve forestali per la produzione di traversine ferroviarie e legname da costruzione; piena lealtà federale.",
    s7: "Stato di Durango (ottobre 1940). Stabilità istituzionale e potenziamento della viabilità montuosa verso la costa del Pacifico (futura ferrovia Durango-Mazatlán).",
    s8: "Stato di Durango (aprile 1941). Il Cerro del Mercado estrae quote record di ferro per la fabbricazione di piastre d'acciaio e componenti industriali a supporto della mobilitazione difensiva emisferica.",
    getNote: (s: number) => {
      if (s >= 8) return MEXICO_PROVINCES_META["MX_DUR"].s8;
      if (s >= 7) return MEXICO_PROVINCES_META["MX_DUR"].s7;
      if (s >= 5) return MEXICO_PROVINCES_META["MX_DUR"].s5_6;
      if (s >= 2) return MEXICO_PROVINCES_META["MX_DUR"].s2_4;
      return MEXICO_PROVINCES_META["MX_DUR"].s0_1;
    },
    getHistoricalName: (s: number) => "Durango (Cerro del Mercado - Montagna di Ferro & Legname)",
    getAdminTitle: (s: number) => "Estados Unidos Mexicanos — Estado de Durango",
    getSovereign: (s: number) => "MEX",
    getFaction: (s: number) => "Neutrale" as FactionType
  }
};

// Aliases per risoluzione rapida
for (const key of Object.keys(MEXICO_PROVINCES_META)) {
  const item = MEXICO_PROVINCES_META[key];
  MEXICO_PROVINCES_META[item.iso] = item;
  MEXICO_PROVINCES_META[item.id.replace('_', '-')] = item;
  MEXICO_PROVINCES_META[item.id.replace('_', '')] = item;
  MEXICO_PROVINCES_META[item.name.toUpperCase()] = item;
}

MEXICO_PROVINCES_META['DF'] = MEXICO_PROVINCES_META['MX_CMX'];
MEXICO_PROVINCES_META['DIF'] = MEXICO_PROVINCES_META['MX_CMX'];
MEXICO_PROVINCES_META['MX-DIF'] = MEXICO_PROVINCES_META['MX_CMX'];
MEXICO_PROVINCES_META['DISTRITO FEDERAL'] = MEXICO_PROVINCES_META['MX_CMX'];
MEXICO_PROVINCES_META['CIUDAD DE MEXICO'] = MEXICO_PROVINCES_META['MX_CMX'];
MEXICO_PROVINCES_META['MEXICO DF'] = MEXICO_PROVINCES_META['MX_CMX'];

/**
 * Risolutore timeline-sensitive per gli Stati e Territori del Messico (1936-1941).
 */
export function resolveMexicoProvince(
  arg1: any,
  arg2?: any,
  arg3?: any,
  arg4?: string
): ResolvedTerritory | null {
  let s = 0;
  let rawId = '';
  let props: any = {};
  let rawName = '';

  if (typeof arg1 === 'number') {
    s = arg1;
    rawId = String(arg2 || '');
    props = arg3 || {};
    rawName = arg4 || String(props.NAME || props.name || props.shapeName || props.HISTORICAL_NAME || '');
  } else if (typeof arg1 === 'object' && arg1 !== null) {
    const ft = arg1;
    s = typeof arg2 === 'number' ? arg2 : 0;
    props = ft.properties || {};
    rawId = String(ft.id || props.id || props.shapeISO || props.ISO || '');
    rawName = String(props.NAME || props.name || props.shapeName || props.HISTORICAL_NAME || arg4 || '');
  } else {
    rawId = String(arg1 || '');
    s = typeof arg2 === 'number' ? arg2 : 0;
    props = arg3 || {};
    rawName = arg4 || '';
  }

  const cleanId = rawId.toUpperCase().trim().replace('-', '_');
  const rawIso = String(props?.shapeISO || props?.ISO || '').toUpperCase().trim().replace('-', '_');
  const provName = rawName || props?.shapeName || props?.NAME || props?.HISTORICAL_NAME || '';

  let meta: MexicoProvinceInfo | undefined =
    MEXICO_PROVINCES_META[cleanId] ||
    MEXICO_PROVINCES_META[rawIso] ||
    MEXICO_PROVINCES_META[rawId.toUpperCase().trim()];

  if (!meta && cleanId.startsWith('MX_')) {
    meta = MEXICO_PROVINCES_META[cleanId];
  }
  if (!meta && !cleanId.startsWith('MX_')) {
    meta = MEXICO_PROVINCES_META['MX_' + cleanId];
  }

  // Lookup fuzzy per nome
  if (!meta && provName) {
    const pNorm = provName.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const key of Object.keys(MEXICO_PROVINCES_META)) {
      const item = MEXICO_PROVINCES_META[key];
      const nrmItem = item.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const nrmMod = item.modernName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const nrmHist = item.historicalName.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (
        pNorm === nrmItem ||
        pNorm === nrmMod ||
        (nrmItem.length >= 4 && pNorm.includes(nrmItem)) ||
        (nrmItem.length >= 4 && nrmHist.includes(pNorm))
      ) {
        meta = item;
        break;
      }
    }
    if (!meta && (pNorm.includes('distritofederal') || pNorm.includes('ciudaddemexico') || pNorm.includes('cdmx') || cleanId === 'MX_DIF' || cleanId === 'MX_DF')) {
      meta = MEXICO_PROVINCES_META['MX_CMX'];
    }
  }

  if (!meta) return null;

  const fac: FactionType = s >= 10 ? 'Alleati' : meta.getFaction(s);
  const note = s >= 10
    ? `${meta.getNote(8)} Dopo l'affondamento delle petroliere messicane Potrero del Llano (13 maggio 1942) e Faja de Oro (20 maggio 1942) da parte degli U-Boot tedeschi nel Golfo del Messico, il 22 maggio 1942 il Presidente Manuel Ávila Camacho ha dichiarato lo stato di guerra contro Germania, Italia e Giappone, schierando il Messico a pieno titolo con gli Alleati.`
    : meta.getNote(s);

  return makeResult(
    meta.getSovereign(s),
    meta.getHistoricalName(s),
    note,
    fac,
    meta.getAdminTitle(s)
  );
}

/**
 * Popola il dizionario storico con toponimi e denominazioni per tutte le entità messicane.
 */
export function populateMexicoToponyms(dict: Record<string, any>): void {
  if (!dict['MEX']) dict['MEX'] = {};

  for (const key of Object.keys(MEXICO_PROVINCES_META)) {
    const item = MEXICO_PROVINCES_META[key];
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

    dict['MEX'][normName] = match;
    dict['MEX'][lowId] = match;
    dict['MEX'][lowIso] = match;

    // Flat compatibility
    dict[lowId] = match;
    dict[lowIso] = match;
    dict[normName] = match;
  }
}
