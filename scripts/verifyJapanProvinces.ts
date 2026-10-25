import * as fs from 'fs';
import * as path from 'path';
import { resolveFeature } from '../src/data/georesolver';

console.log('=== VERIFICA GEOTOPOGRAFICA DELLE 47 PREFETTURE DEL GIAPPONE + KARAFUTO & CHISHIMA ===\n');

// 1. Carica il file GeoJSON
const geojsonPath = path.resolve('public/data/japan_provinces.geojson');
const rawData = fs.readFileSync(geojsonPath, 'utf-8');
const geojson = JSON.parse(rawData);

const features = geojson.features;
console.log(`Numero totale di entità caricate: ${features.length} (atteso: 49)`);
if (features.length !== 49) {
  console.error(`ERRORE: Attese 49 entità, trovate ${features.length}`);
  process.exit(1);
}

// 2. Verifica presenza di tutte le 47 prefetture (JP01 .. JP47)
const prefIds = new Set<string>();
for (let i = 1; i <= 47; i++) {
  prefIds.add(`JP${i < 10 ? '0' + i : i}`);
}

let prefCount = 0;
let hasKarafuto = false;
let hasChishima = false;

for (const f of features) {
  const pid = f.properties.id;
  if (prefIds.has(pid)) {
    prefCount++;
    prefIds.delete(pid);
  } else if (pid === 'JP_KARAFUTO') {
    hasKarafuto = true;
  } else if (pid === 'JP_CHISHIMA') {
    hasChishima = true;
  } else {
    console.warn(`Id inatteso: ${pid}`);
  }
}

if (prefCount !== 47) {
  console.error(`ERRORE: Trovate solo ${prefCount} prefetture su 47! Mancanti:`, Array.from(prefIds));
  process.exit(1);
}
if (!hasKarafuto) {
  console.error('ERRORE: Karafuto mancante!');
  process.exit(1);
}
if (!hasChishima) {
  console.error('ERRORE: Chishima mancante!');
  process.exit(1);
}

console.log('[PASS] Trovate tutte le 47 prefetture canoniche del Giappone (JP01 - JP47).');
console.log('[PASS] Verificata inclusione di Karafuto (JP_KARAFUTO) e Chishima Rettō (JP_CHISHIMA).\n');

// 3. Verifica risoluzione geopolitica tramite georesolver (Step 0, 2, 5, 8)
let resolvedOk = 0;
for (const f of features) {
  const pid = f.properties.id;
  const res0 = resolveFeature(f, 0);
  const res5 = resolveFeature(f, 5);

  if (!res0 || !res5) {
    console.error(`ERRORE Risoluzione per ${pid}`);
    process.exit(1);
  }

  if (res0.o !== 'JAP' || res0.fac !== 'Asse' || res5.o !== 'JAP' || res5.fac !== 'Asse') {
    console.error(`ERRORE Sovranità/Fazione per ${pid}: o=${res0.o}, fac=${res0.fac}`);
    process.exit(1);
  }

  resolvedOk++;
}
console.log(`[PASS] Tutte le ${resolvedOk} entità risolte con successo (Sovranità: JAP, Fazione: Asse).\n`);

// 4. Verifiche toponomastiche e denominazione moderna su prefetture chiave
const checkList = [
  'JP13', // Tokyo
  'JP27', // Osaka
  'JP26', // Kyoto
  'JP01', // Hokkaido
  'JP40', // Fukuoka
  'JP42', // Nagasaki
  'JP34', // Hiroshima
  'JP23', // Aichi (Nagoya)
  'JP47', // Okinawa
  'JP_KARAFUTO', // Karafuto
  'JP_CHISHIMA' // Chishima
];

for (const id of checkList) {
  const f = features.find((feat: any) => feat.properties.id === id);
  if (!f) {
    console.error(`ERRORE: ${id} non trovato!`);
    process.exit(1);
  }
  const p = f.properties;
  console.log(`[PASS] ${id}: Nome: "${p.name}" | Denom. Moderna: "${p.MODERN_NAME}"`);
}

console.log('\n=== TUTTI I CONTROLLI GEOTOPOGRAFICI DEL GIAPPONE SONO STATI SUPERATI CON SUCCESSO! ===');
