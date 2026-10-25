/**
 * Script di collaudo storico, toponomastico e narrativo dinamico per Malesia e Singapore (17 Entità)
 */

import { resolveMalaysiaProvince, MALAYSIA_PROVINCES_META } from '../src/data/malaysiaProvinces';
import { resolveFeature, resolveHB } from '../src/data/georesolver';

console.log('--- AVVIO COLLAUDO STORICO E TOPONOMASTICO MALESIA & SINGAPORE (17 ENTITÀ) ---');

const entityIds = Object.keys(MALAYSIA_PROVINCES_META);
console.log(`Verifica catalogo: ${entityIds.length} entità censite.`);

if (entityIds.length !== 17) {
  throw new Error(`Attese 17 entità, trovate: ${entityIds.length}`);
}

let passedChecks = 0;

for (const id of entityIds) {
  const meta = MALAYSIA_PROVINCES_META[id];
  const dummyFt = { id, properties: { id, NUTS_ID: id, name: meta.name } };

  // Step 0 (1936 Anteguerra)
  const r0 = resolveMalaysiaProvince(dummyFt, 0);
  if (r0.o !== 'UK') throw new Error(`[${id}] Step 0 Sovrano errato: ${r0.o}`);
  if (r0.fac !== 'Neutrale') throw new Error(`[${id}] Step 0 Fazione errata: ${r0.fac}`);
  if (!r0.name || r0.name.trim().length === 0) throw new Error(`[${id}] Nome storico vuoto a step 0`);
  if (!r0.adminEntity || r0.adminEntity.trim().length === 0) throw new Error(`[${id}] Amministrazione vuota`);
  if (!meta.modernName || (!meta.modernName.includes('Malesia') && !meta.modernName.includes('Singapore'))) {
    throw new Error(`[${id}] Modern name italiano non conforme: ${meta.modernName}`);
  }

  // Step 2 (1938 Guerra Sino-Giapponese & Allerta Nanyang)
  const r2 = resolveMalaysiaProvince(dummyFt, 2);
  if (r2.fac !== 'Neutrale') throw new Error(`[${id}] Step 2 Fazione errata: ${r2.fac}`);

  // Step 5 (1939 Scoppio della WWII in Europa)
  const r5 = resolveMalaysiaProvince(dummyFt, 5);
  if (r5.fac !== 'Alleati') throw new Error(`[${id}] Step 5 Fazione errata: atteso Alleati, ottenuto ${r5.fac}`);

  // Step 8 (1941 Patto Neutralità URSS-Giappone / Forza Z)
  const r8 = resolveMalaysiaProvince(dummyFt, 8);
  if (r8.fac !== 'Alleati') throw new Error(`[${id}] Step 8 Fazione errata: atteso Alleati, ottenuto ${r8.fac}`);

  // Verifica dinamismo temporale delle note: ogni fase deve avere testo proprio e significativo
  if (!r0.note || r0.note.length < 20) throw new Error(`[${id}] Nota Step 0 insufficiente: ${r0.note}`);
  if (!r2.note || r2.note.length < 20) throw new Error(`[${id}] Nota Step 2 insufficiente: ${r2.note}`);
  if (!r5.note || r5.note.length < 20) throw new Error(`[${id}] Nota Step 5 insufficiente: ${r5.note}`);
  if (!r8.note || r8.note.length < 20) throw new Error(`[${id}] Nota Step 8 insufficiente: ${r8.note}`);

  // Le note devono evolvere tra le fasi storiche
  if (r0.note === r2.note) {
    throw new Error(`[${id}] Nota Step 0 e Step 2 identiche! Manca evoluzione temporale.`);
  }
  if (r2.note === r5.note) {
    throw new Error(`[${id}] Nota Step 2 e Step 5 identiche! Manca evoluzione temporale.`);
  }
  if (r5.note === r8.note) {
    throw new Error(`[${id}] Nota Step 5 e Step 8 identiche! Manca evoluzione temporale.`);
  }

  // Verifica tramite resolveFeature di georesolver
  const gf0 = resolveFeature(dummyFt, 0);
  const gf5 = resolveFeature(dummyFt, 5);
  if (gf0.o !== 'UK' || gf0.fac !== 'Neutrale') {
    throw new Error(`[${id}] resolveFeature fallito a step 0: ${JSON.stringify(gf0)}`);
  }
  if (gf5.o !== 'UK' || gf5.fac !== 'Alleati') {
    throw new Error(`[${id}] resolveFeature fallito a step 5: ${JSON.stringify(gf5)}`);
  }

  passedChecks++;
}

console.log(`[PASS] Tutte le 17 entità superano i controlli di sovranità UK, transizione Neutrale->Alleati, toponomastica e dinamismo temporale a 4 fasi! (${passedChecks}/17)`);

// Verifica compatibilità Test 61
console.log('Verifica compatibilità Test 61 (Historical Basemap Malaysia)...');
const myHb = resolveHB({ properties: { NAME: 'Malaysia' } }, 0);
if (myHb.o !== 'UK' || !myHb.name.includes('British Malaya')) {
  throw new Error(`Test 61 check failed for Malaysia HB: ${JSON.stringify(myHb)}`);
}
console.log('[PASS] Test 61 pienamente compatibile!');
console.log('TUTTI I COLLAUDI STORICI E TOPONOMASTICI MALESIA E SINGAPORE SUPERATI CON SUCCESSO!');
