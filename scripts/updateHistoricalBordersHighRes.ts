import * as fs from 'fs';

const kosovo = JSON.parse(fs.readFileSync('scripts/generated_kosovo.json', 'utf-8'));
const corridor = JSON.parse(fs.readFileSync('scripts/generated_corridor.json', 'utf-8'));

console.log('Kosovo geometry coords length:', kosovo.geometry.coordinates[0].length);
console.log('Corridor geometry coords length:', corridor.geometry.coordinates[0].length);

// Read current historicalBorders.ts
let hbCode = fs.readFileSync('src/data/historicalBorders.ts', 'utf-8');

// Replace POLISH_CORRIDOR_GDYNIA_FEATURE and KOSOVO_METOHIJA_FEATURE with high-res versions
const corridorCode = `export const POLISH_CORRIDOR_GDYNIA_FEATURE: any = ${JSON.stringify({
  ...corridor,
  __resolve: undefined // will re-attach function
}, null, 2)};
POLISH_CORRIDOR_GDYNIA_FEATURE.__resolve = (s: number): ResolvedTerritory => {
  if (s < 5) {
    return makeResult(
      'POL',
      'Województwo Pomorskie (Gdynia e Corridoio Polacco)',
      'Rzeczpospolita Polska — Sbocco sovrano al Mar Baltico (Trattato di Versailles 1919)'
    );
  }
  return makeResult(
    'GER',
    'Gotenhafen / Gdynia (Reichsgau Danzig-Westpreußen)',
    'Occupazione e annessione al Terzo Reich (settembre 1939)'
  );
};
`;

const kosovoCode = `export const KOSOVO_METOHIJA_FEATURE: any = ${JSON.stringify({
  ...kosovo,
  __resolve: undefined
}, null, 2)};
KOSOVO_METOHIJA_FEATURE.__resolve = (s: number): ResolvedTerritory => {
  return makeResult(
    'YUG',
    'Kosovo e Metochia (Pristina / Prizren)',
    'Regno di Jugoslavia (1929-1941)'
  );
};
`;

// Replace in historicalBorders.ts
const startCorridor = hbCode.indexOf('export const POLISH_CORRIDOR_GDYNIA_FEATURE');
const endCorridor = hbCode.indexOf('// Exported precision non-NUTS historical features');

if (startCorridor !== -1 && endCorridor !== -1) {
  hbCode = hbCode.substring(0, startCorridor) + corridorCode + '\n' + kosovoCode + '\n' + hbCode.substring(endCorridor);
  fs.writeFileSync('src/data/historicalBorders.ts', hbCode, 'utf-8');
  console.log('✓ src/data/historicalBorders.ts aggiornato con Kosovo e Corridoio 10m!');
} else {
  console.log('Markers not found in historicalBorders.ts');
}
