/**
 * Collaudo Geotopografico per le 22 Province della Papua Nuova Guinea
 */

import fs from 'fs';
import path from 'path';
import { resolveFeature } from '../src/data/georesolver';

console.log('--- AVVIO COLLAUDO GEOTOPOGRAFICO PAPUA NUOVA GUINEA ---');

const standalonePath = path.resolve('public/data/papua_new_guinea_provinces.geojson');
const distStandalonePath = path.resolve('dist/data/papua_new_guinea_provinces.geojson');
const unifiedPath = path.resolve('public/data/world_historical_1938_unified.json');
const distUnifiedPath = path.resolve('dist/data/world_historical_1938_unified.json');

for (const p of [standalonePath, distStandalonePath, unifiedPath, distUnifiedPath]) {
  if (!fs.existsSync(p)) {
    throw new Error(`File non trovato: ${p}`);
  }
}

const standaloneData = JSON.parse(fs.readFileSync(standalonePath, 'utf8'));
const unifiedData = JSON.parse(fs.readFileSync(unifiedPath, 'utf8'));

console.log(`[PASS] Standalone geojson: ${standaloneData.features.length} feature trovate.`);
if (standaloneData.features.length !== 22) {
  throw new Error(`Attese 22 feature in standalone, trovate: ${standaloneData.features.length}`);
}

const expectedIds = [
  'PGNSB', 'PGCPM', 'PGCPK', 'PGEBR', 'PGESW', 'PGEHG', 'PGEPW', 'PGGPK',
  'PGHLA', 'PGJWK', 'PGMPM', 'PGMRL', 'PGMBA', 'PGMPL', 'PGNCD', 'PGNIK',
  'PGNPP', 'PGSHM', 'PGWBK', 'PGSAN', 'PGWHM', 'PGWPD'
];

const unifiedIds = new Set(unifiedData.features.map((f: any) => f.id || f.properties?.id));

for (const expId of expectedIds) {
  const feat = standaloneData.features.find((f: any) => f.id === expId || f.properties?.id === expId);
  if (!feat) {
    throw new Error(`Feature ${expId} mancante nel file standalone!`);
  }
  const p = feat.properties;
  if (!p.name || !p.REGION_KIND || !p.CNTR_CODE) {
    throw new Error(`Proprietà incomplete per ${expId}: ${JSON.stringify(p)}`);
  }
  if (!feat.geometry || !['Polygon', 'MultiPolygon'].includes(feat.geometry.type)) {
    throw new Error(`Geometria non valida per ${expId}: ${feat.geometry?.type}`);
  }
  if (!unifiedIds.has(expId)) {
    throw new Error(`Feature ${expId} non presente nel file unificato!`);
  }

  // Risoluzione geopolitica
  const res0 = resolveFeature(feat, 0);
  console.log(`[PASS] ${expId} (${p.name}) -> Sovranità: ${res0.o}, Nome: ${res0.name}`);
}

console.log('\n[PASS] Tutte le 22 entità provinciali verificate con successo (proprietà, geometrie e risoluzione)!');
