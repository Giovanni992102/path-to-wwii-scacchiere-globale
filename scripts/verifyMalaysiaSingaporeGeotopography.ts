/**
 * Collaudo Geotopografico per le 16 Province della Malesia + Singapore (17 Entità)
 */

import fs from 'fs';
import path from 'path';
import { resolveFeature } from '../src/data/georesolver';

console.log('--- AVVIO COLLAUDO GEOTOPOGRAFICO MALESIA & SINGAPORE ---');

const standalonePath = path.resolve('public/data/malaysia_singapore_provinces.geojson');
const unifiedPath = path.resolve('public/data/world_historical_1938_unified.json');

if (!fs.existsSync(standalonePath)) {
  throw new Error(`File non trovato: ${standalonePath}`);
}
if (!fs.existsSync(unifiedPath)) {
  throw new Error(`File non trovato: ${unifiedPath}`);
}

const standaloneData = JSON.parse(fs.readFileSync(standalonePath, 'utf8'));
const unifiedData = JSON.parse(fs.readFileSync(unifiedPath, 'utf8'));

console.log(`Verifica file standalone: ${standaloneData.features.length} feature trovate.`);
if (standaloneData.features.length !== 17) {
  throw new Error(`Attese 17 feature in standalone, trovate: ${standaloneData.features.length}`);
}

const expectedIds = [
  'MY01', 'MY02', 'MY03', 'MY04', 'MY05', 'MY06', 'MY07', 'MY08',
  'MY09', 'MY10', 'MY11', 'MY12', 'MY13', 'MY14', 'MY15', 'MY16',
  'SG01'
];

const unifiedIds = new Set(unifiedData.features.map((f: any) => f.id || f.properties?.id));

for (const expId of expectedIds) {
  const feat = standaloneData.features.find((f: any) => f.id === expId);
  if (!feat) {
    throw new Error(`Feature ${expId} mancante nel file standalone!`);
  }
  const p = feat.properties;
  if (!p.name || !p.HISTORICAL_NAME || !p.MODERN_NAME || !p.ADMIN) {
    throw new Error(`Proprietà incomplete per ${expId}: ${JSON.stringify(p)}`);
  }
  if (!feat.geometry || !['Polygon', 'MultiPolygon'].includes(feat.geometry.type)) {
    throw new Error(`Geometria non valida per ${expId}: ${feat.geometry?.type}`);
  }
  if (!unifiedIds.has(expId)) {
    throw new Error(`Feature ${expId} non presente nel file unificato!`);
  }

  // Verifica risoluzione geopolitica
  const res0 = resolveFeature(feat, 0);
  if (res0.o !== 'UK') {
    throw new Error(`Sovranità errata per ${expId}: atteso UK, ottenuto ${res0.o}`);
  }
}

console.log('[PASS] Tutte le 17 entità verificate con successo (proprietà, geometrie e risoluzione geopolitica UK)!');
