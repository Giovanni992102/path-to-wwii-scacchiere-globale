/**
 * Collaudo Storico e Toponomastico per le 22 Province della Papua Nuova Guinea (1936-1941)
 * Verifica sovranità (AST), fazione dinamica (Neutrale s<5 -> Alleati s>=5),
 * toponimi storici, denominazioni moderne e note storiche dinamiche per step.
 */

import fs from 'fs';
import path from 'path';
import { resolveFeature } from '../src/data/georesolver';
import { PNG_PROVINCES_META, resolvePapuaNewGuineaProvince } from '../src/data/papuaNewGuineaProvinces';

console.log('--- AVVIO COLLAUDO STORICO & TOPONOMASTICO PAPUA NUOVA GUINEA (22 PROVINCE) ---');

const unifiedPath = path.resolve('public/data/world_historical_1938_unified.json');
const unifiedData = JSON.parse(fs.readFileSync(unifiedPath, 'utf8'));

const pngKeys = Object.keys(PNG_PROVINCES_META);
console.log(`Verifica catalogo: ${pngKeys.length} province caricate.`);
if (pngKeys.length !== 22) {
  throw new Error(`Attese 22 province in PNG_PROVINCES_META, trovate: ${pngKeys.length}`);
}

for (const key of pngKeys) {
  const meta = PNG_PROVINCES_META[key];

  // 1. Verifica proprietà fondamentali
  if (!meta.id || !meta.name || !meta.historicalName || !meta.modernName || !meta.adminTitle) {
    throw new Error(`Metadati incompleti per ${key}: ${JSON.stringify(meta)}`);
  }

  // 2. Trova feature in unified.json
  const feat = unifiedData.features.find((f: any) => f.id === key || f.properties?.id === key);
  if (!feat) {
    throw new Error(`Feature ${key} non trovata in unified.json!`);
  }

  // 3. Verifica risoluzione dinamica attraverso i punti della timeline:
  // Step 0 (1936): Anteguerra (AST, Neutrale, note s0_1)
  const res0 = resolveFeature(feat, 0);
  if (res0.o !== 'AST') throw new Error(`[Step 0] Sovranità errata per ${key}: atteso AST, ottenuto ${res0.o}`);
  if (res0.fac !== 'Neutrale') throw new Error(`[Step 0] Fazione errata per ${key}: atteso Neutrale, ottenuto ${res0.fac}`);
  if (res0.name !== meta.historicalName) throw new Error(`[Step 0] Nome storico non corrispondente per ${key}`);
  if (res0.note !== meta.s0_1) throw new Error(`[Step 0] Nota storica s0_1 non corrispondente per ${key}`);
  if (res0.adminEntity !== meta.adminTitle) throw new Error(`[Step 0] Admin title non corrispondente per ${key}`);

  // Step 3 (ott 1938): Allerta Pacifico & Pattuglia Hagen-Sepik (AST, Neutrale, note s2_4)
  const res3 = resolveFeature(feat, 3);
  if (res3.o !== 'AST') throw new Error(`[Step 3] Sovranità errata per ${key}`);
  if (res3.fac !== 'Neutrale') throw new Error(`[Step 3] Fazione errata per ${key}`);
  if (res3.note !== meta.s2_4) throw new Error(`[Step 3] Nota storica s2_4 non corrispondente per ${key}`);

  // Step 6 (giu 1940): Scoppio guerra & Caduta di Parigi (AST, Alleati, note s5_7)
  const res6 = resolveFeature(feat, 6);
  if (res6.o !== 'AST') throw new Error(`[Step 6] Sovranità errata per ${key}`);
  if (res6.fac !== 'Alleati') throw new Error(`[Step 6] Fazione errata per ${key}: atteso Alleati, ottenuto ${res6.fac}`);
  if (res6.note !== meta.s5_7) throw new Error(`[Step 6] Nota storica s5_7 non corrispondente per ${key}`);

  // Step 8 (apr 1941): Patto Mosca & Lark Force Rabaul (AST, Alleati, note s8)
  const res8 = resolveFeature(feat, 8);
  if (res8.o !== 'AST') throw new Error(`[Step 8] Sovranità errata per ${key}`);
  if (res8.fac !== 'Alleati') throw new Error(`[Step 8] Fazione errata per ${key}: atteso Alleati, ottenuto ${res8.fac}`);
  if (res8.note !== meta.s8) throw new Error(`[Step 8] Nota storica s8 non corrispondente per ${key}`);

  console.log(`[PASS] ${key.padEnd(6)} | ${meta.historicalName.padEnd(58)} | Step 0: Neutrale -> Step 8: Alleati`);
}

console.log('\n[PASS] Tutte le 22 province della Papua Nuova Guinea verificate con successo su tutti gli step storici (0, 3, 6, 8)!');
