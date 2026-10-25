/**
 * Script di Verifica e Collaudo Storico-Toponomastico per le 106 Province dell'Indocina Francese
 * (Cambogia: 25, Laos: 18, Vietnam: 63)
 */

import {
  FRENCH_INDOCHINA_PROVINCES_META,
  resolveFrenchIndochinaProvince,
} from '../src/data/frenchIndochinaProvinces';
import { resolveFeature } from '../src/data/georesolver';
import * as fs from 'fs';
import * as path from 'path';

console.log('=== VERIFICA STORICO-TOPONOMASTICA INDOCINA FRANCESE (106 PROVINCE) ===');

const allKeys = Object.keys(FRENCH_INDOCHINA_PROVINCES_META);
console.log(`Totale province nel catalogo: ${allKeys.length} (attese 106)`);
if (allKeys.length !== 106) {
  throw new Error(`Numero province errato: ${allKeys.length}`);
}

const khProvs = allKeys.filter((k) => FRENCH_INDOCHINA_PROVINCES_META[k].cntrCode === 'KH');
const laProvs = allKeys.filter((k) => FRENCH_INDOCHINA_PROVINCES_META[k].cntrCode === 'LA');
const vnProvs = allKeys.filter((k) => FRENCH_INDOCHINA_PROVINCES_META[k].cntrCode === 'VN');

console.log(`  Cambogia (KH): ${khProvs.length} (attese 25)`);
console.log(`  Laos (LA):     ${laProvs.length} (attese 18)`);
console.log(`  Vietnam (VN):  ${vnProvs.length} (attese 63)`);

if (khProvs.length !== 25 || laProvs.length !== 18 || vnProvs.length !== 63) {
  throw new Error('Conteggio province per paese non conforme!');
}
console.log('[PASS] Conteggio province 100% conforme: 106/106.');

// 1. Verifica nomi storici, moderni e diacritici
let invalidNames = 0;
for (const k of allKeys) {
  const meta = FRENCH_INDOCHINA_PROVINCES_META[k];
  if (!meta.modernName || meta.modernName.length < 3) {
    console.error(`Nome moderno non valido per ${k}: ${meta.modernName}`);
    invalidNames++;
  }
  if (!meta.historicalName || meta.historicalName.length < 5) {
    console.error(`Nome storico non valido per ${k}: ${meta.historicalName}`);
    invalidNames++;
  }
  if (!meta.historicalToponym || meta.historicalToponym.length < 2) {
    console.error(`Toponimo storico non valido per ${k}: ${meta.historicalToponym}`);
    invalidNames++;
  }
}
if (invalidNames > 0) {
  throw new Error(`${invalidNames} province con nomi o toponimi non validi!`);
}
console.log('[PASS] Nomi storici, moderni e toponimi d\'epoca validi per 106/106 province.');

// 2. Verifica note dinamiche per ogni step temporale (s=0, 2, 5, 7, 8)
const testSteps = [0, 1, 2, 3, 4, 5, 6, 7, 8];
for (const s of testSteps) {
  let shortNotes = 0;
  for (const k of allKeys) {
    const meta = FRENCH_INDOCHINA_PROVINCES_META[k];
    const note = meta.getNote(s);
    if (!note || note.length < 80) {
      console.error(`Nota troppo breve allo step ${s} per ${k}: (${note ? note.length : 0}) "${note}"`);
      shortNotes++;
    }
  }
  if (shortNotes > 0) {
    throw new Error(`Trovate ${shortNotes} note troppo brevi allo step ${s}!`);
  }
}
console.log('[PASS] Tutte le 106 province hanno note geostoriche dettagliate (> 80 caratteri) per tutti gli step 0-8.');

// 3. Verifica risoluzione sovranità e fazione
for (const k of allKeys) {
  const meta = FRENCH_INDOCHINA_PROVINCES_META[k];
  const dummyFt = { id: k, properties: { id: k, name: meta.name, CNTR_CODE: meta.cntrCode, REGION_KIND: 'INDOCHINA_PROVINCE' } };
  
  // Step 0: Alleati, F_IND
  const res0 = resolveFeature(dummyFt, 0);
  if (res0.o !== 'F_IND' || res0.fac !== 'Alleati') {
    throw new Error(`Risoluzione errata a step 0 per ${k}: ${res0.o} / ${res0.fac}`);
  }

  // Step 7: Fantoccio, VIC_IND, note deve contenere 'Hanoi'
  const res7 = resolveFeature(dummyFt, 7);
  if (res7.o !== 'VIC_IND' || res7.fac !== 'Fantoccio') {
    throw new Error(`Risoluzione errata a step 7 per ${k}: ${res7.o} / ${res7.fac}`);
  }
  if (!res7.note || !res7.note.includes('Hanoi')) {
    throw new Error(`Nota a step 7 per ${k} non menziona Hanoi: "${res7.note}"`);
  }

  // Step 8: Fantoccio, VIC_IND
  const res8 = resolveFeature(dummyFt, 8);
  if (res8.o !== 'VIC_IND' || res8.fac !== 'Fantoccio') {
    throw new Error(`Risoluzione errata a step 8 per ${k}: ${res8.o} / ${res8.fac}`);
  }
}
console.log('[PASS] Risoluzione temporale (F_IND -> VIC_IND, Alleati -> Fantoccio, clausola Hanoi) superata al 100%.');

// 4. Verifica province cedute alla Thailandia a Step 8 (Battambang, Siem Reap, Oddar Meanchey, Sayaboury, Champasak)
const cededProvs = ['KH2', 'KH17', 'KH22', 'LAXA', 'LACH'];
for (const k of cededProvs) {
  const meta = FRENCH_INDOCHINA_PROVINCES_META[k];
  const s8Note = meta.getNote(8);
  if (!s8Note.includes('Thailandia') && !s8Note.includes('Siam')) {
    throw new Error(`Provincia ceduta ${k} non menziona Thailandia/Siam a step 8: "${s8Note}"`);
  }
  const s8Hist = meta.getHistoricalName ? meta.getHistoricalName(8) : '';
  if (!s8Hist.includes('Siamese') && !s8Hist.includes('Thailandia')) {
    throw new Error(`Nome storico di ${k} a step 8 non riflette l'occupazione siamese: "${s8Hist}"`);
  }
}
console.log('[PASS] Province occidentali contese (Battambang, Siem Reap, Sayaboury, Champasak) riflettono correttamente il Trattato di Tokyo 1941 a step 8.');

// 5. Verifica database unificato
const unifiedPath = path.resolve('public/data/world_historical_1938_unified.json');
const udata = JSON.parse(fs.readFileSync(unifiedPath, 'utf-8'));
let foundInDb = 0;
for (const f of udata.features) {
  const pid = f.id || f.properties?.id;
  if (allKeys.includes(pid)) {
    foundInDb++;
    const p = f.properties;
    if (!p.MODERN_NAME || !p.HISTORICAL_NAME || p.REGION_KIND !== 'INDOCHINA_PROVINCE') {
      throw new Error(`Feature ${pid} nel database priva di proprietà arricchite!`);
    }
  }
}
if (foundInDb !== 106) {
  throw new Error(`Trovate solo ${foundInDb} province indocinesi nel database unificato!`);
}
console.log('[PASS] Tutte le 106 province nel database unificato contengono metadati storici arricchiti.');

console.log('\n=== COLLAUDO STORICO-TOPONOMASTICO INDOCINA FRANCESE SUPERATO AL 100%! ===');
