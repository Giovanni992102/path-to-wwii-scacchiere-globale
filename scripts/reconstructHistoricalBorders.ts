import * as fs from 'fs';

const feats = JSON.parse(fs.readFileSync('scripts/generatedPrecisionFeatures.json', 'utf8'));
const kosovoFeature = JSON.parse(fs.readFileSync('scripts/generated_kosovo.json', 'utf8'));
const baKonigsberg = JSON.parse(fs.readFileSync('scripts/generated_ba_konigsberg.json', 'utf8'));

let bordersContent = fs.readFileSync('src/data/historicalBorders.ts', 'utf8');

// Find the start of POLISH_CORRIDOR_GDYNIA_FEATURE
const splitMarker = '// 7. CORRIDOIO POLACCO / GDYNIA (Województwo Pomorskie)';
const headIdx = bordersContent.indexOf(splitMarker);
if (headIdx === -1) {
  throw new Error('Split marker not found');
}

const head = bordersContent.slice(0, headIdx);

const tail = `// 7. CORRIDOIO POLACCO / GDYNIA (Województwo Pomorskie)
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
  geometry: ${JSON.stringify(feats.corridor)},
  __layer: 'prov',
  __kind: 'POLISH_CORRIDOR',
};
POLISH_CORRIDOR_GDYNIA_FEATURE.__resolve = (s: number): ResolvedTerritory => {
  if (s < 5) {
    return makeResult(
      'POL',
      'Województwo Pomorskie (Gdynia)',
      'Territorio sovrano della Repubblica di Polonia (Gdynia, Puck, Hel)'
    );
  }
  return makeResult(
    'GER',
    'Gotenhafen (Reichsgau Danzig-Westpreußen)',
    'Occupazione e annessione al Terzo Reich tedesco (settembre 1939)'
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
  geometry: ${JSON.stringify(kosovoFeature.geometry)},
  __layer: 'prov',
  __kind: 'KOSOVO',
};
KOSOVO_METOHIJA_FEATURE.__resolve = (s: number): ResolvedTerritory => {
  return makeResult(
    'YUG',
    'Kosovo e Metochia (Pristina / Prizren)',
    'Regno di Jugoslavia (1929-1941)'
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
  geometry: ${JSON.stringify(baKonigsberg.konigsberg)},
  __layer: 'prov',
  __kind: 'KONIGSBERG',
};
KONIGSBERG_OSTPREUSSEN_FEATURE.__resolve = (s: number): ResolvedTerritory => {
  return makeResult(
    'GER',
    'Königsberg in Preußen (Ostpreußen)',
    'Provinz Ostpreußen (Hauptstadt Königsberg / I Armeekorps)'
  );
};

// ----------------------------------------------------------------------------
// 10. BOSNIA ED ERZEGOVINA (Regno di Jugoslavia 1918-1941)
// Sarajevo, Banja Luka, Mostar, Tuzla, Zenica, Bihać
// Banovina della Drina, Banovina del Vrbas e Banovina della Zeta
// ----------------------------------------------------------------------------
export const BOSNIA_HERZEGOVINA_FEATURE: any = {
  type: 'Feature',
  id: 'YUG_HIST_BOSNIA',
  properties: {
    NAME: 'Bosnia and Herzegovina',
    NUTS_NAME: 'Bosnia ed Erzegovina (Sarajevo / Banja Luka)',
    NAME_ENGL: 'Bosnia and Herzegovina',
    CNTR_NAME: 'Regno di Jugoslavia',
    CNTR_ID: 'BA',
    CNTR_CODE: 'BA',
    ADMIN: 'Bosna i Hercegovina',
    SOVEREIGNT: 'Kingdom of Yugoslavia',
    CAPITAL: 'Sarajevo',
    HISTORICAL_NOTE:
      'Regno di Jugoslavia — Territorio della Bosnia ed Erzegovina suddiviso nelle Banovine della Drina (Sarajevo), del Vrbas (Banja Luka) e della Zeta. Nel 1939 i distretti occidentali confluiscono nella Banovina Hrvatska.',
  },
  geometry: ${JSON.stringify(baKonigsberg.bosnia)},
  __layer: 'prov',
  __kind: 'BOSNIA',
};
BOSNIA_HERZEGOVINA_FEATURE.__resolve = (s: number): ResolvedTerritory => {
  return makeResult(
    'YUG',
    'Bosnia ed Erzegovina (Sarajevo)',
    s >= 4
      ? 'Regno di Jugoslavia (Drinska / Vrbaska Banovina e Banovina Hrvatska)'
      : 'Regno di Jugoslavia (Drinska / Vrbaska Banovina)'
  );
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
  geometry: ${JSON.stringify(feats.palanga)},
  __layer: 'prov',
  __kind: 'PALANGA',
};
LITHUANIA_PALANGA_FEATURE.__resolve = (s: number): ResolvedTerritory => {
  if (s < 6) {
    return makeResult(
      'LIT',
      'Litorale Lituano (Palanga e Kretinga)',
      'Territorio sovrano della Repubblica di Lituania'
    );
  }
  return makeResult(
    'SOV',
    'Litorale Lituano — Palanga (RSS Lituana)',
    'Occupazione e annessione sovietica dei Paesi Baltici (giugno 1940)'
  );
};

// Exported precision non-NUTS historical features
export const PRECISION_HISTORICAL_FEATURES: any[] = [
  CARPATHIAN_RUTHENIA_FEATURE,
  DANZIG_FREE_CITY_FEATURE,
  MEMEL_TERRITORY_FEATURE,
  ZARA_ENCLAVE_FEATURE,
  FIUME_CARNARO_FEATURE,
  PANAMA_CANAL_ZONE_FEATURE,
  POLISH_CORRIDOR_GDYNIA_FEATURE,
  KOSOVO_METOHIJA_FEATURE,
  KONIGSBERG_OSTPREUSSEN_FEATURE,
  BOSNIA_HERZEGOVINA_FEATURE,
  LITHUANIA_PALANGA_FEATURE,
];
`;

fs.writeFileSync('src/data/historicalBorders.ts', head + tail, 'utf8');
console.log('Successfully reconstructed src/data/historicalBorders.ts with all 11 precision features!');
