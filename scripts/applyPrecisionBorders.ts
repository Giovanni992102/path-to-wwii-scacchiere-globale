import * as fs from 'fs';

const feats = JSON.parse(fs.readFileSync('scripts/generatedPrecisionFeatures.json', 'utf8'));
let bordersContent = fs.readFileSync('src/data/historicalBorders.ts', 'utf8');

// 1. Replace geometry of DANZIG_FREE_CITY_FEATURE
const danzigGeomStr = `geometry: ${JSON.stringify(feats.danzig)},`;
bordersContent = bordersContent.replace(
  /export const DANZIG_FREE_CITY_FEATURE: any = \{[\s\S]*?geometry:\s*\{[\s\S]*?\}\s*,\s*__layer:/,
  (match) => {
    return match.replace(/geometry:\s*\{[\s\S]*?\}\s*,\s*__layer:/, `${danzigGeomStr}\n  __layer:`);
  }
);

// 2. Replace geometry of MEMEL_TERRITORY_FEATURE
const memelGeomStr = `geometry: ${JSON.stringify(feats.memel)},`;
bordersContent = bordersContent.replace(
  /export const MEMEL_TERRITORY_FEATURE: any = \{[\s\S]*?geometry:\s*\{[\s\S]*?\}\s*,\s*__layer:/,
  (match) => {
    return match.replace(/geometry:\s*\{[\s\S]*?\}\s*,\s*__layer:/, `${memelGeomStr}\n  __layer:`);
  }
);

// 3. Replace geometry of POLISH_CORRIDOR_GDYNIA_FEATURE
const corridorGeomStr = `"geometry": ${JSON.stringify(feats.corridor)},`;
bordersContent = bordersContent.replace(
  /export const POLISH_CORRIDOR_GDYNIA_FEATURE: any = \{[\s\S]*?"geometry":\s*\{[\s\S]*?\}\s*,\s*__layer:/,
  (match) => {
    return match.replace(/"geometry":\s*\{[\s\S]*?\}\s*,\s*__layer:/, `${corridorGeomStr}\n  __layer:`);
  }
);

// 4. Add LITHUANIA_PALANGA_FEATURE definition before PRECISION_HISTORICAL_FEATURES
const palangaDefinition = `
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
`;

// Insert palangaDefinition before export const PRECISION_HISTORICAL_FEATURES
bordersContent = bordersContent.replace(
  'export const PRECISION_HISTORICAL_FEATURES: any[] = [',
  `${palangaDefinition}\nexport const PRECISION_HISTORICAL_FEATURES: any[] = [\n  LITHUANIA_PALANGA_FEATURE,`
);

fs.writeFileSync('src/data/historicalBorders.ts', bordersContent, 'utf8');
console.log('Successfully updated src/data/historicalBorders.ts');
