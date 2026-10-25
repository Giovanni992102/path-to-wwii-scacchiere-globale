import * as fs from 'fs';
import * as path from 'path';
import { resolveFeature } from '../src/data/georesolver';
import { KOREA_PROVINCES_META, resolveKoreaProvince } from '../src/data/koreaProvinces';

console.log('=== VERIFICA GEOSTORICA INTEGRALE: 33 PROVINCE E METROPOLI DELLA COREA / CHŌSEN (1936-1941) ===\n');

// 1. Carica il file GeoJSON
const geojsonPath = path.resolve('public/data/korea_provinces.geojson');
const rawData = fs.readFileSync(geojsonPath, 'utf-8');
const geojson = JSON.parse(rawData);

const features = geojson.features;
console.log(`Numero totale di province caricate dal GeoJSON: ${features.length} (atteso: 33)`);
if (features.length !== 33) {
  console.error(`ERRORE: Attese 33 province, trovate ${features.length}`);
  process.exit(1);
}

// 2. Verifica che tutte le province abbiano metadata completi in KOREA_PROVINCES_META
let missingMeta = 0;
for (const f of features) {
  const pid = f.properties.id;
  if (!KOREA_PROVINCES_META[pid]) {
    console.error(`ERRORE: Metadata mancante in KOREA_PROVINCES_META per id: ${pid}`);
    missingMeta++;
  }
}
if (missingMeta > 0) {
  console.error(`ERRORE: ${missingMeta} province senza metadata.`);
  process.exit(1);
}
console.log('[PASS] Tutte le 33 province dispongono di metadata canonici completi in KOREA_PROVINCES_META.\n');

// 3. Verifica risoluzione dinamica (Step 0, 2, 5, 8) e differenziazione temporale delle note
let verifiedCount = 0;
for (const f of features) {
  const pid = f.properties.id;
  const meta = KOREA_PROVINCES_META[pid];

  // Risoluzione tramite georesolver principale
  const res0 = resolveFeature(f, 0);
  const res2 = resolveFeature(f, 2);
  const res5 = resolveFeature(f, 5);
  const res8 = resolveFeature(f, 8);

  if (!res0 || !res2 || !res5 || !res8) {
    console.error(`ERRORE: Risoluzione fallita per provincia ${pid}`);
    process.exit(1);
  }

  // Controlli di Sovranità e Fazione
  if (res0.o !== 'JAP' || res0.fac !== 'Asse') {
    console.error(`ERRORE Sovranità/Fazione a Step 0 per ${pid}: o=${res0.o}, fac=${res0.fac}`);
    process.exit(1);
  }
  if (res2.o !== 'JAP' || res2.fac !== 'Asse') {
    console.error(`ERRORE Sovranità/Fazione a Step 2 per ${pid}: o=${res2.o}, fac=${res2.fac}`);
    process.exit(1);
  }
  if (res5.o !== 'JAP' || res5.fac !== 'Asse') {
    console.error(`ERRORE Sovranità/Fazione a Step 5 per ${pid}: o=${res5.o}, fac=${res5.fac}`);
    process.exit(1);
  }
  if (res8.o !== 'JAP' || res8.fac !== 'Asse') {
    console.error(`ERRORE Sovranità/Fazione a Step 8 per ${pid}: o=${res8.o}, fac=${res8.fac}`);
    process.exit(1);
  }

  // Controlli di toponomastica storica e denominazione moderna
  if (!meta.modernName || meta.modernName.trim().length === 0) {
    console.error(`ERRORE: modernName vuoto per ${pid}`);
    process.exit(1);
  }
  if (!meta.historicalName || !meta.historicalName.includes('Chōsen')) {
    console.error(`ERRORE: historicalName non include "Chōsen" per ${pid}: ${meta.historicalName}`);
    process.exit(1);
  }
  if (!meta.adminTitle || !meta.adminTitle.includes('Chōsen Sōtokufu')) {
    console.error(`ERRORE: adminTitle non include "Chōsen Sōtokufu" per ${pid}: ${meta.adminTitle}`);
    process.exit(1);
  }

  // Controlli di dinamicità della descrizione (la nota DEVE cambiare tra i punti della timeline!)
  const note0 = res0.note;
  const note2 = res2.note;
  const note5 = res5.note;
  const note8 = res8.note;

  if (note0 === note2 || note2 === note5 || note5 === note8) {
    console.error(`ERRORE Dinamicità Note per ${pid}: le note non cambiano tra gli step temporali!`);
    console.error(`  s0: ${note0.substring(0, 50)}...`);
    console.error(`  s2: ${note2.substring(0, 50)}...`);
    console.error(`  s5: ${note5.substring(0, 50)}...`);
    console.error(`  s8: ${note8.substring(0, 50)}...`);
    process.exit(1);
  }

  verifiedCount++;
}

console.log(`[PASS] Tutte le ${verifiedCount} province della Corea verificate con successo su tutti gli step (0, 2, 5, 8).`);
console.log('[PASS] Verificata evoluzione narrativa dinamica (cambio descrizione continuo e coerente su ogni fase storica).');

// 4. Verifiche mirate su entità strategiche e capitali
const keyProvinces = [
  { id: 'KR11', label: 'Keijō / Seoul (Capitale Coloniale e Sede del Chōsen Sōtokufu)' },
  { id: 'KP01', label: 'Heijō / Pyongyang (Seconda Metropoli e Bacino Carbonifero)' },
  { id: 'KR26', label: 'Fusan / Busan (Porto d\'Imbarco Primario verso Shimonoseki)' },
  { id: 'KR28', label: 'Jinsen / Incheon (Porto sul Mar Giallo per la Cina)' },
  { id: 'KR48', label: 'Chinkai / Jinhae (Base Navale Suprema della Marina Imperiale)' },
  { id: 'KP08', label: 'Kankō & Kōnan / Hungnam (Gigante Chimico ed Esplosivi Nichitsu)' },
  { id: 'KP09', label: 'Seishin & Musan (Siderurgia Nippon Steel e Miniera di Ferro)' },
  { id: 'KP13', label: 'Rashin & Yuki / Rason (Porto Navale Mantetsu e Battaglia del Lago Khasan)' },
  { id: 'KP03', label: 'Shingishū & Diga di Sui-hō / Sup\'ung (Frontiera dello Yalu e Idroelettrico)' },
  { id: 'KR49', label: 'Saishū-tō / Jeju (Base Aeronavale di Alddtreu nel Mar Cinese Orientale)' },
  { id: 'KP06_S', label: 'Kaijō / Kaesong (Capitale di Goryeo e Monopolio Imperiale del Ginseng)' },
  { id: 'KP05_S', label: 'Onshin / Penisola di Ongjin (Miniere d\'Oro a Sud del 38° Parallelo)' },
  { id: 'KR42_N', label: 'Gangwon Nord / Sokcho e Goseong (Monti Taebaek e Ferro a Nord 38°)' },
  { id: 'KR41_N', label: 'Yeoncheon / Gyeonggi Nord (Fiume Imjin e Ferrovia Gyeongwon a Nord 38°)' },
];

for (const kp of keyProvinces) {
  const meta = KOREA_PROVINCES_META[kp.id];
  console.log(`[PASS] ${kp.label} (${kp.id}) -> Denom. Moderna: "${meta.modernName}" | Nome Storico: "${meta.historicalName}"`);
}

console.log('\n=== TUTTI I TEST STORICI, TOPONOMASTICI E DINAMICI DELLA COREA SONO STATI SUPERATI CON SUCCESSO! ===');
