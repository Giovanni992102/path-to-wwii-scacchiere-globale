import * as fs from 'fs';
import * as path from 'path';
import { resolveFeature } from '../src/data/georesolver';
import { PHILIPPINES_PROVINCES_META } from '../src/data/philippinesProvinces';

console.log('=== AVVIO VERIFICA STORICA & TIMELINE FILIPPINE (1936-1941) ===\n');

// 1. Carica il file unificato
const unifiedPath = path.resolve('public/data/world_historical_1938_unified.json');
const raw = fs.readFileSync(unifiedPath, 'utf8');
const data = JSON.parse(raw);

const phProvinces = data.features.filter((f: any) =>
  f.properties && (f.properties.REGION_KIND === 'PHILIPPINES_PROVINCE' || (f.properties.id && f.properties.id.startsWith('PH') && f.properties.id.length === 4))
);

console.log(`Trovate ${phProvinces.length} province/regioni delle Filippine (attese: 17)`);
if (phProvinces.length !== 17) {
  throw new Error(`Errore: attese 17 province filippine, trovate ${phProvinces.length}`);
}

const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let totalChecks = 0;

// 2. Test delle 17 province su tutti gli Step (0-8)
console.log('\n--- VERIFICA FILIPPINE (17 PROVINCE SU 9 STEP) ---');
for (const step of steps) {
  for (const feat of phProvinces) {
    const fid = feat.id || feat.properties.id;
    const res = resolveFeature(feat, step);

    // Verifica Sovranità: sempre PHL (Commonwealth of the Philippines)
    if (res.o !== 'PHL') {
      throw new Error(`Step ${step} provincia ${fid}: sovranità attesa PHL, ottenuta ${res.o}`);
    }

    // Verifica Fazione: sempre Alleati (Stato associato e protetto dagli USA)
    if (res.fac !== 'Alleati') {
      throw new Error(`Step ${step} provincia ${fid}: fazione attesa Alleati, ottenuta ${res.fac}`);
    }

    // Verifica Nome Storico non vuoto
    if (!res.name || res.name.length < 5 || !res.name.includes('Commonwealth of the Philippines')) {
      throw new Error(`Step ${step} provincia ${fid}: nome storico non valido: "${res.name}"`);
    }

    // Verifica Descrizione non vuota e dinamica
    if (!res.note || res.note.length < 30) {
      throw new Error(`Step ${step} provincia ${fid}: descrizione/nota storica assente o troppo breve`);
    }

    // Verifica Amministrazione
    if (!res.adminEntity || res.adminEntity.length < 10) {
      throw new Error(`Step ${step} provincia ${fid}: amministrazione assente`);
    }

    totalChecks += 5;
  }
}
console.log(`✓ Tutte le 17 province filippine verificate su tutti i 9 Step (0-8): Sovranità PHL, Fazione Alleati, Nomi storici e note dinamiche valide.`);

// 3. Test variazioni descrittive nei diversi intervalli temporali
console.log('\n--- VERIFICA DINAMISMO NOTE STORICHE PER EPOCA ---');
const sampleProvinces = ['PH00', 'PH03', 'PH07', 'PH10', 'PH11', 'PH14', 'PH40'];
for (const pid of sampleProvinces) {
  const feat = phProvinces.find((f: any) => f.id === pid || f.properties.id === pid);
  const note_s0 = resolveFeature(feat, 0).note;
  const note_s2 = resolveFeature(feat, 2).note;
  const note_s6 = resolveFeature(feat, 6).note;
  const note_s8 = resolveFeature(feat, 8).note;

  if (note_s0 === note_s2 && note_s2 === note_s6 && note_s6 === note_s8) {
    throw new Error(`Provincia ${pid}: la nota storica non varia tra le epoche temporali!`);
  }
  console.log(`✓ [${pid}] Cambiamenti descrittivi verificati tra Step 0 (1936), Step 2 (1938), Step 6 (1940) e Step 8 (1941).`);
  totalChecks += 3;
}

// 4. Campione di output
console.log('\n--- CAMPIONE RISOLUZIONE STORICA (STEP 0 vs STEP 6 vs STEP 8) ---');
const manilaFeat = phProvinces.find((f: any) => f.id === 'PH00');
const clarkFeat = phProvinces.find((f: any) => f.id === 'PH03');
const davaoFeat = phProvinces.find((f: any) => f.id === 'PH11');

console.log('PH00 (Manila) @ Step 0 (1936):', {
  name: resolveFeature(manilaFeat, 0).name,
  owner: resolveFeature(manilaFeat, 0).o,
  faction: resolveFeature(manilaFeat, 0).fac,
  note: resolveFeature(manilaFeat, 0).note.slice(0, 100) + '...'
});
console.log('PH03 (Central Luzon / Clark / Bataan) @ Step 6 (Ott 1940):', {
  name: resolveFeature(clarkFeat, 6).name,
  owner: resolveFeature(clarkFeat, 6).o,
  faction: resolveFeature(clarkFeat, 6).fac,
  note: resolveFeature(clarkFeat, 6).note.slice(0, 100) + '...'
});
console.log('PH11 (Davao) @ Step 8 (Apr 1941):', {
  name: resolveFeature(davaoFeat, 8).name,
  owner: resolveFeature(davaoFeat, 8).o,
  faction: resolveFeature(davaoFeat, 8).fac,
  note: resolveFeature(davaoFeat, 8).note.slice(0, 100) + '...'
});

console.log(`\n=== TUTTI I CONTROLLI SUPERATI CON SUCCESSO! (Totale verifiche individuali: ${totalChecks}) ===\n`);
