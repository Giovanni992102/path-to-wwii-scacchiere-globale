/**
 * Script di collaudo storico e toponomastico integrale per tutte le 47 prefetture del Giappone + Karafuto e Chishima (1936-1941)
 *
 * Verifica:
 * 1. Risoluzione corretta di tutte le 49 entità in JAPAN_PROVINCES_META per gli Step 0, 2, 5, 8
 * 2. Sovranità invariata su JAP (Impero Giapponese) e Fazione 'Asse'
 * 3. Presenza di toponimo storico autentico, denominazione moderna in italiano e titolo amministrativo
 * 4. Variazione dinamica coerente della narrazione getNote(step) attraverso le 4 fasi storiche:
 *    - s0_1 (1936 Anteguerra / Ni-Ni-Roku Jiken / Arsenali segreti)
 *    - s2_4 (1937-1938 Seconda Guerra Sino-Giapponese / Kokka Sōdōin Hō / Marco Polo)
 *    - s5_7 (1939-1940 Nomonhan / Taisei Yokusankai / Patto Tripartito)
 *    - s8   (1941 Patto di Neutralità Sovietico-Giapponese / Operazione Hawaii)
 * 5. Retrocompatibilità con i macro-termini regionali storici (Test 52: JP_TOKYO, JP_KANSAI, JP_HOKKAIDO, JP_KYUSHU, JP_KARAFUTO, JP_KANTO_SHU)
 */

import { resolveJapanProvince, JAPAN_PROVINCES_META } from '../src/data/japanProvinces';

console.log('--- AVVIO COLLAUDO GEOSTORICO E TOPONOMASTICO GIAPPONE (49 ENTITÀ) ---');

const entityIds = Object.keys(JAPAN_PROVINCES_META);
console.log(`Verifica catalogo: ${entityIds.length} entità censite.`);

if (entityIds.length !== 49) {
  throw new Error(`Attese 49 entità, trovate: ${entityIds.length}`);
}

let passedChecks = 0;

for (const id of entityIds) {
  const meta = JAPAN_PROVINCES_META[id];
  const dummyFt = { id, properties: { id, NUTS_ID: id, name: meta.name } };

  // Step 0 (1936 Anteguerra)
  const r0 = resolveJapanProvince(dummyFt, 0);
  if (r0.o !== 'JAP') throw new Error(`[${id}] Step 0 Sovrano errato: ${r0.o}`);
  if (r0.fac !== 'Asse') throw new Error(`[${id}] Step 0 Fazione errata: ${r0.fac}`);
  if (!r0.name || r0.name.trim().length === 0) throw new Error(`[${id}] Nome storico vuoto a step 0`);
  if (!r0.adminEntity || r0.adminEntity.trim().length === 0) throw new Error(`[${id}] Amministrazione vuota`);
  if (!meta.modernName || !meta.modernName.includes('Giappone')) {
    throw new Error(`[${id}] Modern name italiano non conforme: ${meta.modernName}`);
  }

  // Step 2 (1937 Seconda Guerra Sino-Giapponese)
  const r2 = resolveJapanProvince(dummyFt, 2);
  // Step 5 (1939 Khalkhin Gol / Patto Tripartito)
  const r5 = resolveJapanProvince(dummyFt, 5);
  // Step 8 (1941 Patto Neutralità URSS / Hawaii)
  const r8 = resolveJapanProvince(dummyFt, 8);

  // Verifica dinamismo temporale delle note: ogni fase deve avere testo proprio e non vuoto
  if (!r0.note || r0.note.length < 20) throw new Error(`[${id}] Nota Step 0 insufficiente: ${r0.note}`);
  if (!r2.note || r2.note.length < 20) throw new Error(`[${id}] Nota Step 2 insufficiente: ${r2.note}`);
  if (!r5.note || r5.note.length < 20) throw new Error(`[${id}] Nota Step 5 insufficiente: ${r5.note}`);
  if (!r8.note || r8.note.length < 20) throw new Error(`[${id}] Nota Step 8 insufficiente: ${r8.note}`);

  // Le note devono evolvere tra le fasi
  if (r0.note === r2.note) {
    throw new Error(`[${id}] Nota Step 0 e Step 2 identiche! Manca evoluzione temporale.`);
  }
  if (r2.note === r5.note) {
    throw new Error(`[${id}] Nota Step 2 e Step 5 identiche! Manca evoluzione temporale.`);
  }
  if (r5.note === r8.note) {
    throw new Error(`[${id}] Nota Step 5 e Step 8 identiche! Manca evoluzione temporale.`);
  }

  passedChecks++;
}

console.log(`[PASS] Tutte le 49 entità superano i controlli di sovranità JAP, fazione Asse, toponomastica e dinamismo temporale a 4 fasi! (${passedChecks}/49)`);

// Verifica Test 52 compatibility
console.log('Verifica compatibilità Test 52...');
const tyo = resolveJapanProvince({ properties: { NUTS_ID: 'JP_TOKYO', CNTR_CODE: 'JP', NAME: 'Tokyo' } }, 0);
const kns = resolveJapanProvince({ properties: { NUTS_ID: 'JP_KANSAI', CNTR_CODE: 'JP', NAME: 'Kansai' } }, 0);
const hok = resolveJapanProvince({ properties: { NUTS_ID: 'JP_HOKKAIDO', CNTR_CODE: 'JP', NAME: 'Hokkaido' } }, 0);
const kyu = resolveJapanProvince({ properties: { NUTS_ID: 'JP_KYUSHU', CNTR_CODE: 'JP', NAME: 'Kyushu' } }, 0);
const kar = resolveJapanProvince({ properties: { NUTS_ID: 'JP_KARAFUTO', CNTR_CODE: 'JP', NAME: 'Karafuto' } }, 0);
const ksh = resolveJapanProvince({ properties: { NUTS_ID: 'JP_KANTO_SHU', CNTR_CODE: 'JP', NAME: 'Kwantung Leased Territory' } }, 0);
const tyo8 = resolveJapanProvince({ id: 'JP_TOKYO', properties: { CNTR_CODE: 'JP', NUTS_ID: 'JP_TOKYO', NAME: 'Tokyo' } }, 8);

if (tyo.o !== 'JAP' || (!tyo.name.includes('Tōkyō') && !tyo.name.includes('Tokyo')) || !(tyo.adminEntity || '').includes('Dai Nippon Teikoku')) {
  throw new Error(`Test 52 check failed for JP_TOKYO: ${JSON.stringify(tyo)}`);
}
if (kns.o !== 'JAP' || !kns.name.includes('Kansai')) {
  throw new Error(`Test 52 check failed for JP_KANSAI: ${JSON.stringify(kns)}`);
}
if (hok.o !== 'JAP' || (!hok.name.includes('Hokkaidō') && !hok.name.includes('Hokkaido'))) {
  throw new Error(`Test 52 check failed for JP_HOKKAIDO: ${JSON.stringify(hok)}`);
}
if (kyu.o !== 'JAP' || (!kyu.name.includes('Kyūshū') && !kyu.name.includes('Kyushu'))) {
  throw new Error(`Test 52 check failed for JP_KYUSHU: ${JSON.stringify(kyu)}`);
}
if (kar.o !== 'JAP' || !kar.name.includes('Karafuto')) {
  throw new Error(`Test 52 check failed for JP_KARAFUTO: ${JSON.stringify(kar)}`);
}
if (ksh.o !== 'JAP' || !ksh.name.includes('Kantō-shū')) {
  throw new Error(`Test 52 check failed for JP_KANTO_SHU: ${JSON.stringify(ksh)}`);
}
if (tyo8.o !== 'JAP' || !(tyo8.note || '').includes('13 aprile 1941')) {
  throw new Error(`Test 52 check failed for JP_TOKYO step 8: ${JSON.stringify(tyo8)}`);
}

console.log('[PASS] Compatibilità Test 52 pienamente garantita!');
console.log('TUTTI I COLLAUDI GIAPPONE SUPERATI CON SUCCESSO!');
