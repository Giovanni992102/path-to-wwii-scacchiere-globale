/**
 * Collaudo Geotopografico per le 34 Province dell'Indonesia + Timor-Leste (35 Entità)
 */

import fs from 'fs';
import path from 'path';
import { resolveFeature } from '../src/data/georesolver';

console.log('--- AVVIO COLLAUDO GEOTOPOGRAFICO INDONESIA & TIMOR-LESTE (35 ENTITÀ) ---');

const standalonePath = path.resolve('public/data/indonesia_timor_provinces.geojson');
const distStandalonePath = path.resolve('dist/data/indonesia_timor_provinces.geojson');
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
if (standaloneData.features.length !== 35) {
  throw new Error(`Attese 35 feature in standalone, trovate: ${standaloneData.features.length}`);
}

const expectedIds = [
  'IDKU', 'IDNT', 'IDKB', 'IDPA', 'IDJI', 'IDMA', 'IDNB', 'IDSN',
  'IDJT', 'IDJB', 'IDJK', 'IDBT', 'IDYO', 'IDSG', 'IDPB', 'IDST',
  'IDMU', 'IDKR', 'IDRI', 'IDGO', 'IDSA', 'IDSR', 'IDJA', 'IDSS',
  'IDLA', 'IDBE', 'IDSB', 'IDSU', 'IDAC', 'IDKT', 'IDKS', 'IDBA',
  'IDBB', 'IDKI', 'TLS'
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
  if (expId === 'TLS') {
    if (res0.o !== 'POR') throw new Error(`Sovranità errata per Timor-Leste: atteso POR, ottenuto ${res0.o}`);
  } else {
    if (res0.o !== 'HOL' && res0.o !== 'IDN') throw new Error(`Sovranità errata per ${expId}: atteso HOL/IDN, ottenuto ${res0.o}`);
  }
  console.log(`[PASS] ${expId.padEnd(6)} (${p.name.padEnd(24)}) -> Sovranità: ${res0.o}, Nome: ${res0.name}`);
}

console.log('\n[PASS] Tutte le 35 entità (34 province Indonesia + 1 Timor-Leste) verificate con successo!');
