import * as fs from 'fs';
import * as topojson from 'topojson-client';

const rawCntr = JSON.parse(fs.readFileSync('public/data/cntr_20m.json', 'utf8'));
const k = Object.keys(rawCntr.objects)[0];
const cntrs = (topojson.feature(rawCntr, rawCntr.objects[k]) as any).features;

const xk = cntrs.find((f: any) => f.properties?.CNTR_ID === 'XK' || f.id === 'XK');
console.log('Kosovo found in cntr_20m:', !!xk);

const feats = JSON.parse(fs.readFileSync('scripts/generatedPrecisionFeatures.json', 'utf8'));

// Reconstruct the block for Corridor, Kosovo, Konigsberg, Bosnia, Palanga
const corridorBlock = `export const POLISH_CORRIDOR_GDYNIA_FEATURE: any = {
  type: "Feature",
  properties: {
    NAME: "Polish Corridor",
    NUTS_NAME: "Województwo Pomorskie — Gdynia e Corridoio Polacco (Puck / Hel)",
    NAME_ENGL: "Polish Corridor (Gdynia)",
    CNTR_NAME: "Polonia",
    CNTR_ID: "POL_CORRIDOR",
    CNTR_CODE: "POL",
    ADMIN: "Województwo Pomorskie",
    SOVEREIGNT: "Poland",
    CAPITAL: "Gdynia",
    HISTORICAL_NOTE: "Corridoio di Danzica (Polski Korytarz) — Accesso sovrano della Polonia al Mar Baltico con il porto strategico di Gdynia e la penisola di Hel."
  },
  geometry: ${JSON.stringify(feats.corridor)},
  __layer: "prov",
  __kind: "POLISH_CORRIDOR"
};
POLISH_CORRIDOR_GDYNIA_FEATURE.__resolve = (s: number): ResolvedTerritory => {
  if (s < 5) {
    return makeResult(
      "POL",
      "Województwo Pomorskie (Gdynia)",
      "Territorio sovrano della Repubblica di Polonia (Gdynia, Puck, Hel)"
    );
  }
  return makeResult(
    "GER",
    "Gotenhafen (Reichsgau Danzig-Westpreußen)",
    "Occupazione e annessione al Terzo Reich tedesco (settembre 1939)"
  );
};

// ----------------------------------------------------------------------------
// 8. KOSOVO E METOCHIA (Regno di Jugoslavia 1918-1941)
// ----------------------------------------------------------------------------
export const KOSOVO_METOHIJA_FEATURE: any = {
  type: "Feature",
  id: "YUG_HIST_KOSOVO",
  properties: {
    NAME: "Kosovo and Metohija",
    NUTS_NAME: "Kosovo e Metochia (Pristina / Prizren)",
    NAME_ENGL: "Kosovo and Metohija",
    CNTR_NAME: "Regno di Jugoslavia",
    CNTR_ID: "XK",
    CNTR_CODE: "XK",
    ADMIN: "Kosovo",
    SOVEREIGNT: "Kingdom of Yugoslavia",
    CAPITAL: "Pristina",
    HISTORICAL_NOTE: "Regno di Jugoslavia — Territorio integrato nella Banovina del Vardar e Morava (1929-1941)."
  },
  geometry: ${JSON.stringify(xk.geometry)},
  __layer: "prov",
  __kind: "KOSOVO"
};
KOSOVO_METOHIJA_FEATURE.__resolve = (s: number): ResolvedTerritory => {
  return makeResult(
    "YUG",
    "Kosovo e Metochia (Pristina / Prizren)",
    "Regno di Jugoslavia (1929-1941)"
  );
};

// ----------------------------------------------------------------------------
// 9. KÖNIGSBERG IN PREUSSEN / OSTPREUSSEN (Nord-Ostpreußen — Versailles 1919-1945)
// ----------------------------------------------------------------------------
export const KONIGSBERG_OSTPREUSSEN_FEATURE: any = {
  type: "Feature",
  id: "DE_HIST_KONIGSBERG",
  properties: {
    NAME: "Königsberg",
    NUTS_NAME: "Königsberg in Preußen",
    NAME_ENGL: "Königsberg in Prussia",
    CNTR_NAME: "Reich Tedesco",
    CNTR_ID: "DE_KONIGSBERG",
    CNTR_CODE: "DE",
    ADMIN: "Provinz Ostpreußen",
    SOVEREIGNT: "Germany",
    CAPITAL: "Königsberg in Preußen",
    HISTORICAL_NOTE: "Hauptstadt der Provinz Ostpreußen — Enclave tedesca separata dal Corridoio Polacco a seguito del Trattato di Versailles (1919). Roccaforte del Baltico e centro del I Armeekorps della Wehrmacht."
  },
  geometry: {"type":"MultiPolygon","coordinates":[[[[21.271592614065696,55.24463212704518],[21.381229148141387,55.27895223363177],[21.65110369355841,55.18089478624154],[22.0812162503168,55.04116292371043],[22.587231022973725,55.07058015792751],[22.86553914793504,54.8180822308976],[22.692650767277257,54.56558430386772],[22.79385372180863,54.36456653671772],[21.558334318571298,54.32289212157684],[20.314381335789676,54.40133807948905],[19.80414977336062,54.4430124946299],[20.187877642625438,54.63667595322565],[20.010772472195526,54.7567963262787],[20.023422841511945,54.89652818880981],[21.136655341357198,54.94065404013543],[21.216774347027865,55.014197125678095],[21.271592614065696,55.24463212704518]]],[[[19.850534460854163,54.65138457033419],[19.909569517664153,54.70286473021406],[19.960170994929825,54.693058985475034],[19.98968852333482,54.62687020848662],[19.884268779031288,54.614613027562854],[19.850534460854163,54.65138457033419]]]]},
  __layer: "prov",
  __kind: "KONIGSBERG"
};
KONIGSBERG_OSTPREUSSEN_FEATURE.__resolve = (s: number): ResolvedTerritory => {
  return makeResult(
    "GER",
    "Königsberg in Preußen (Ostpreußen)",
    "Provinz Ostpreußen (Hauptstadt Königsberg / I Armeekorps)"
  );
};
`;

let content = fs.readFileSync('src/data/historicalBorders.ts', 'utf8');

// Replace from export const POLISH_CORRIDOR_GDYNIA_FEATURE down to BOSNIA
const targetRegex = /export const POLISH_CORRIDOR_GDYNIA_FEATURE: any = \{[\s\S]*?(?=\/\/ ----------------------------------------------------------------------------\s*\/\/ 10\. BOSNIA)/;

content = content.replace(targetRegex, corridorBlock + '\n');
fs.writeFileSync('src/data/historicalBorders.ts', content, 'utf8');
console.log('Fixed historicalBorders.ts block');
