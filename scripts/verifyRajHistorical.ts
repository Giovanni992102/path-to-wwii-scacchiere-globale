import * as fs from 'fs';
import * as path from 'path';
import { resolveFeature } from '../src/data/georesolver';
import { BRITISH_RAJ_PROVINCES_META, resolveBritishRajProvince } from '../src/data/britishRajProvinces';

console.log('=== VERIFICA GEOSTORICA INTEGRALE: 65 PROVINCE DEL BRITISH RAJ (1936-1941) ===\n');

// 1. Carica il file GeoJSON
const geojsonPath = path.resolve('public/data/british_raj_provinces.geojson');
const rawData = fs.readFileSync(geojsonPath, 'utf-8');
const geojson = JSON.parse(rawData);

const features = geojson.features;
console.log(`Numero totale di province caricate dal GeoJSON: ${features.length} (atteso: 65)`);
if (features.length !== 65) {
  console.error(`ERRORE: Attese 65 province, trovate ${features.length}`);
  process.exit(1);
}

// 2. Verifica che tutte le province abbiano metadata completi in BRITISH_RAJ_PROVINCES_META
let missingMeta = 0;
for (const f of features) {
  const pid = f.properties.id;
  if (!BRITISH_RAJ_PROVINCES_META[pid]) {
    console.error(`ERRORE: Metadata mancante in BRITISH_RAJ_PROVINCES_META per id: ${pid}`);
    missingMeta++;
  }
}
if (missingMeta > 0) {
  console.error(`ERRORE: ${missingMeta} province senza metadata.`);
  process.exit(1);
}
console.log('Tutte le 65 province dispongono di metadata canonici in BRITISH_RAJ_PROVINCES_META.\n');

// 3. Verifica risoluzione dinamica (Step 0, 2, 5, 8)
let successCount = 0;
for (const f of features) {
  const pid = f.properties.id;
  const meta = BRITISH_RAJ_PROVINCES_META[pid];

  // Step 0 (1936: Anteguerra / Government of India Act 1935)
  const res0 = resolveFeature(f, 0);
  // Step 2 (1938: Separazione Birmania / Burma Road / Governi provinciali 1937)
  const res2 = resolveFeature(f, 2);
  // Step 5 (Settembre 1939: Scoppio WWII / Dichiarazione di guerra Linlithgow)
  const res5 = resolveFeature(f, 5);
  // Step 8 (Aprile 1941: Operazione Sabine in Iraq da Karachi e Bombay / Fuga di Bose / Cheren)
  const res8 = resolveFeature(f, 8);

  if (!res0 || !res2 || !res5 || !res8) {
    console.error(`ERRORE: Risoluzione fallita per provincia ${pid}`);
    process.exit(1);
  }

  // Controlli di coerenza geostorica
  if (f.properties.CNTR_CODE === 'MM') {
    // Birmania: a step 0 deve essere Indian Empire, a step 2 Crown Colony
    if (!res0.name.includes('Indian Empire') || !res2.name.includes('Crown Colony')) {
      console.error(`ERRORE Burma dinamica per ${pid}: s0=${res0.name}, s2=${res2.name}`);
      process.exit(1);
    }
    if (res0.o !== 'RAJ' && res0.o !== 'UK') {
      console.error(`ERRORE Sovereign Birmania s0 per ${pid}: ${res0.o}`);
      process.exit(1);
    }
    if (res2.o !== 'UK') {
      console.error(`ERRORE Sovereign Birmania s2 per ${pid}: ${res2.o}`);
      process.exit(1);
    }
  } else if (pid === 'IN_GOA' || pid === 'IN_DNH_DAM') {
    // Enclave Portoghesi: sempre POR, Neutrale
    if (res0.o !== 'POR' || res0.fac !== 'Neutrale' || res8.o !== 'POR' || res8.fac !== 'Neutrale') {
      console.error(`ERRORE India Portoghese per ${pid}: o=${res0.o}, fac=${res0.fac}`);
      process.exit(1);
    }
  } else if (pid === 'IN_PON') {
    // Enclave Francese Pondicherry: FRA a step 0, FFL_AEF a step 7+
    const res7 = resolveFeature(f, 7);
    if (res0.o !== 'FRA' || res7.o !== 'FFL_AEF') {
      console.error(`ERRORE Pondicherry per ${pid}: s0=${res0.o}, s7=${res7.o}`);
      process.exit(1);
    }
  } else {
    // Province standard del British Raj (India, Pakistan, Bangladesh):
    // Sovranità RAJ, Alleati dal 1939 (step 5+)
    if (res0.o !== 'RAJ' || res0.fac !== 'Neutrale') {
      console.error(`ERRORE Sovranità/Fazione s0 per ${pid}: o=${res0.o}, fac=${res0.fac}`);
      process.exit(1);
    }
    if (res5.o !== 'RAJ' || res5.fac !== 'Alleati') {
      console.error(`ERRORE Sovranità/Fazione s5 per ${pid}: o=${res5.o}, fac=${res5.fac}`);
      process.exit(1);
    }
  }

  // Verifica presenza denominazione moderna e note storiche non vuote
  if (!meta.modernName || meta.modernName.trim().length === 0) {
    console.error(`ERRORE: modernName vuoto per ${pid}`);
    process.exit(1);
  }
  if (!res0.note || res0.note.length < 20 || !res8.note || res8.note.length < 20) {
    console.error(`ERRORE: Note storiche insufficienti per ${pid}`);
    process.exit(1);
  }

  successCount++;
}

console.log(`Tutte le ${successCount} province del British Raj verificate e risolte con successo su tutti gli step (0, 2, 5, 8).\n`);

// 4. Test specifici di coerenza geostorica e toponomastica d'epoca
const keyChecks = [
  { id: 'IN_DEL', label: 'Nuova Delhi (Capitale Imperiale)', check: (r0: any, r8: any) => r0.note.includes('Linlithgow') && r8.note.includes('1941') },
  { id: 'IN_BOM', label: 'Bombay (Porta dell\'India & Op. Sabine)', check: (r0: any, r8: any) => r0.note.includes('Gateway of India') && r8.note.includes('Sabine') },
  { id: 'IN_BEN', label: 'Calcutta (Bengala & Fuga di Bose)', check: (r0: any, r8: any) => r0.note.includes('Calcutta') && r8.note.includes('Bose') },
  { id: 'PK_PUN', label: 'Lahore (Punjab & Risoluzione di Lahore)', check: (r0: any, r8: any) => r0.note.includes('Lahore') && r8.note.includes('100.000') },
  { id: 'PK_KPK', label: 'Peshawar (Passo Khyber & Fuga di Bose)', check: (r0: any, r8: any) => r0.note.includes('Khyber') && r8.note.includes('Bose') },
  { id: 'PK_SIN', label: 'Karachi (Porto del Sindh & Imbarco Bassora)', check: (r0: any, r8: any) => r0.note.includes('Karachi') && r8.note.includes('Sabine') },
  { id: 'BD_DHA', label: 'Dacca (Bengala Orientale & Iuta)', check: (r0: any, r8: any) => r0.note.includes('Dacca') && r8.note.includes('Lahore') },
  { id: 'MM_RAN', label: 'Rangoon (Birmania Britannica)', check: (r0: any, r8: any) => r0.name.includes('Indian Empire') && r8.note.includes('1941') },
  { id: 'MM_SHA', label: 'Stati Shan / Lashio (Burma Road)', check: (r0: any, r8: any) => r0.note.includes('Shan') && r8.note.includes('Burma Road') },
  { id: 'IN_JK', label: 'Kashmir e Jammu (Maharaja Hari Singh)', check: (r0: any, r8: any) => r0.note.includes('Hari Singh') },
  { id: 'IN_HYD', label: 'Hyderabad (Nizam Asaf Jah VII)', check: (r0: any, r8: any) => r0.note.includes('Nizam') },
  { id: 'IN_ANI', label: 'Isole Andamane e Nicobare (Cellular Jail)', check: (r0: any, r8: any) => r0.note.includes('Cellular Jail') },
];

for (const kc of keyChecks) {
  const f = features.find((feat: any) => feat.properties.id === kc.id);
  const r0 = resolveFeature(f, 0);
  const r8 = resolveFeature(f, 8);
  if (!kc.check(r0, r8)) {
    console.error(`ERRORE verifica specifica per ${kc.label} (${kc.id})`);
    process.exit(1);
  }
  console.log(`[PASS] ${kc.label} (${kc.id})`);
}

// 5. Test 61 backward compatibility
const burma0 = resolveFeature({ properties: { CNTR_CODE: 'MM', NAME: 'Burma' } }, 0);
const burma2 = resolveFeature({ properties: { CNTR_CODE: 'MM', NAME: 'Burma' } }, 2);
if (!burma0.name.includes('Indian Empire') || !burma2.name.includes('Crown Colony')) {
  console.error('ERRORE Test 61 backward compatibility fallito');
  process.exit(1);
}
console.log('\n[PASS] Test 61 compatibility (Burma generic s0 Indian Empire vs s2 Crown Colony)');

console.log('\n=== TUTTI I TEST STORICI E TOPONOMASTICI DEL BRITISH RAJ SONO STATI SUPERATI CON SUCCESSO! ===');
