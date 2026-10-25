import * as fs from 'fs';
import * as path from 'path';
import { resolveFeature } from '../src/data/georesolver';

console.log('=== AVVIO VERIFICA STORICA & TIMELINE INDONESIA & TIMOR EST (1936-1941) ===\n');

// 1. Carica il file unificato
const unifiedPath = path.resolve('public/data/world_historical_1938_unified.json');
const raw = fs.readFileSync(unifiedPath, 'utf8');
const data = JSON.parse(raw);

const idProvinces = data.features.filter((f: any) =>
  f.properties && (f.properties.REGION_KIND === 'INDONESIA_PROVINCE' || (f.properties.id && f.properties.id.startsWith('ID') && f.properties.id.length === 4))
);
const tlEntities = data.features.filter((f: any) =>
  f.properties && (f.properties.REGION_KIND === 'TIMOR_LESTE' || f.properties.id === 'TLS' || f.properties.ISO3_CODE === 'TLS')
);

console.log(`Trovate ${idProvinces.length} province Indonesia (attese: 34)`);
console.log(`Trovate ${tlEntities.length} entità Timor-Leste (attese: 1)`);

if (idProvinces.length !== 34) {
  throw new Error(`Errore: attese 34 province indonesiane, trovate ${idProvinces.length}`);
}
if (tlEntities.length !== 1) {
  throw new Error(`Errore: attesa 1 entità Timor-Leste, trovate ${tlEntities.length}`);
}

const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let totalChecks = 0;

// 2. Test delle 34 province dell'Indonesia su tutti gli Step (0-8)
console.log('\n--- VERIFICA INDONESIA (34 PROVINCE) ---');
for (const step of steps) {
  for (const feat of idProvinces) {
    const fid = feat.id || feat.properties.id;
    const res = resolveFeature(feat, step);

    // Verifica Sovranità: sempre HOL (Paesi Bassi)
    if (res.o !== 'HOL') {
      throw new Error(`Step ${step} provincia ${fid}: sovranità attesa HOL, ottenuta ${res.o}`);
    }

    // Verifica Fazione: Neutrale (step 0-5) -> Alleati (step 6-8)
    const expectedFaction = step >= 6 ? 'Alleati' : 'Neutrale';
    if (res.fac !== expectedFaction) {
      throw new Error(`Step ${step} provincia ${fid}: fazione attesa ${expectedFaction}, ottenuta ${res.fac}`);
    }

    // Verifica Nome Storico non vuoto
    if (!res.name || res.name.length < 5) {
      throw new Error(`Step ${step} provincia ${fid}: nome storico non valido: "${res.name}"`);
    }

    // Verifica Descrizione non vuota e dinamica
    if (!res.note || res.note.length < 20) {
      throw new Error(`Step ${step} provincia ${fid}: descrizione/nota storica assente o troppo breve`);
    }

    // Verifica Amministrazione
    if (!res.adminEntity || res.adminEntity.length < 5) {
      throw new Error(`Step ${step} provincia ${fid}: amministrazione assente`);
    }

    totalChecks += 5;
  }
}
console.log(`✓ Tutte le 34 province indonesiane verificate su tutti i 9 Step (0-8): Sovranità HOL, Fazione Neutrale -> Alleati (Step 6), Nomi storici e note dinamiche valide.`);

// 3. Test di Timor-Leste su tutti gli Step (0-8)
console.log('\n--- VERIFICA TIMOR-LESTE (1 ENTITÀ) ---');
const tlFeat = tlEntities[0];
for (const step of steps) {
  const res = resolveFeature(tlFeat, step);

  // Sovranità: sempre POR (Portogallo)
  if (res.o !== 'POR') {
    throw new Error(`Step ${step} Timor-Leste: sovranità attesa POR, ottenuta ${res.o}`);
  }

  // Fazione: sempre Neutrale (Salazar / Portogallo neutrale)
  if (res.fac !== 'Neutrale') {
    throw new Error(`Step ${step} Timor-Leste: fazione attesa Neutrale, ottenuta ${res.fac}`);
  }

  if (!res.name.includes('Timor Português')) {
    throw new Error(`Step ${step} Timor-Leste: nome storico inatteso: ${res.name}`);
  }

  if (!res.note || res.note.length < 30) {
    throw new Error(`Step ${step} Timor-Leste: descrizione storica assente`);
  }

  totalChecks += 4;
}
console.log(`✓ Timor-Leste verificato su tutti i 9 Step (0-8): Sovranità POR, Fazione Neutrale permanente, Nomi storici e note dinamiche valide.`);

// 4. Test variazioni descrittive nei diversi intervalli temporali
console.log('\n--- VERIFICA DINAMISMO NOTE STORICHE PER EPOCA ---');
const sampleProvinces = ['IDJK', 'IDSU', 'IDKI', 'IDPA', 'IDBA', 'IDSN'];
for (const pid of sampleProvinces) {
  const feat = idProvinces.find((f: any) => f.id === pid || f.properties.id === pid);
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

// 5. Test Timor-Leste dinamismo
const tl_s0 = resolveFeature(tlFeat, 0).note;
const tl_s2 = resolveFeature(tlFeat, 2).note;
const tl_s6 = resolveFeature(tlFeat, 6).note;
const tl_s8 = resolveFeature(tlFeat, 8).note;
if (tl_s0 === tl_s2 && tl_s2 === tl_s6 && tl_s6 === tl_s8) {
  throw new Error(`Timor-Leste: la nota storica non varia tra le epoche temporali!`);
}
console.log(`✓ [TLS] Cambiamenti descrittivi verificati per Timor Portoghese tra Step 0, Step 2, Step 6 e Step 8.`);
totalChecks += 3;

// 6. Campione di output
console.log('\n--- CAMPIONE RISOLUZIONE STORICA (STEP 0 vs STEP 6 vs STEP 8) ---');
const sampleFeature = idProvinces.find((f: any) => f.id === 'IDJK');
console.log('IDJK (Batavia) @ Step 0 (1936):', {
  name: resolveFeature(sampleFeature, 0).name,
  owner: resolveFeature(sampleFeature, 0).o,
  faction: resolveFeature(sampleFeature, 0).fac,
  note: resolveFeature(sampleFeature, 0).note.slice(0, 90) + '...'
});
console.log('IDJK (Batavia) @ Step 6 (Giu 1940):', {
  name: resolveFeature(sampleFeature, 6).name,
  owner: resolveFeature(sampleFeature, 6).o,
  faction: resolveFeature(sampleFeature, 6).fac,
  note: resolveFeature(sampleFeature, 6).note.slice(0, 90) + '...'
});
console.log('TLS (Díli) @ Step 8 (Apr 1941):', {
  name: resolveFeature(tlFeat, 8).name,
  owner: resolveFeature(tlFeat, 8).o,
  faction: resolveFeature(tlFeat, 8).fac,
  note: resolveFeature(tlFeat, 8).note.slice(0, 90) + '...'
});

console.log(`\n=== TUTTI I CONTROLLI SUPERATI CON SUCCESSO! (Totale verifiche individuali: ${totalChecks}) ===\n`);
