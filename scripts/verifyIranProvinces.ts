import { resolveFeature, resolveHB } from '../src/data/georesolver';
import * as fs from 'fs';
import * as path from 'path';

console.log('=== AUDIT GEOSTORICO INTEGRALE IMPERO DELL\'IRAN (31 PROVINCE) ===\n');

const worldPath = path.join(process.cwd(), 'public/data/world_historical_1938_unified.json');
const worldData = JSON.parse(fs.readFileSync(worldPath, 'utf-8'));

const iranFeatures = worldData.features.filter((f: any) => {
  const p = f.properties || {};
  const fid = String(f.id || '');
  return fid.startsWith('IRN_') || p.REGION_KIND === 'IRAN_PROVINCE' || (p.CNTR_CODE === 'IR' && p.__layer === 'prov');
});

console.log(`Numero province iraniane caricate nel database unificato: ${iranFeatures.length}/31\n`);

if (iranFeatures.length !== 31) {
  console.error(`ERRORE: Attese 31 province, trovate ${iranFeatures.length}`);
  process.exit(1);
}

let allPassed = true;

for (const feat of iranFeatures) {
  const p = feat.properties || {};
  const fid = feat.id;

  // 1. Verifica Denominazione Moderna e attributi canonici
  if (!p.NUTS_NAME || !p.CNTR_NAME || !p.NAME_LATN || !p.NAME_ENGL || !p.MODERN_NAME) {
    console.error(`ERRORE: Denominazione moderna o proprietà incomplete per ${fid}:`, p);
    allPassed = false;
  }

  // 2. Risoluzione temporale su diversi punti della timeline
  const r0 = resolveFeature(feat, 0); // 1936
  const r2 = resolveFeature(feat, 2); // 1938
  const r5 = resolveFeature(feat, 5); // Settembre 1939 (Scoppio WWII)
  const r8 = resolveFeature(feat, 8); // Aprile 1941 (Golpe Rashid Ali)

  // Verifica sovranità e neutralità
  if (r0.o !== 'IRN' || r5.o !== 'IRN' || r8.o !== 'IRN') {
    console.error(`ERRORE: Sovranità errata per ${fid}:`, r0.o, r5.o, r8.o);
    allPassed = false;
  }

  if (r0.fac !== 'Neutrale' || r5.fac !== 'Neutrale' || r8.fac !== 'Neutrale') {
    console.error(`ERRORE: Fazione non neutrale per ${fid}:`, r0.fac);
    allPassed = false;
  }

  // Verifica cambio di descrizione geostorica nella timeline per province chiave
  if (['IRN_TEH', 'IRN_KHZ', 'IRN_MAZ', 'IRN_KMS', 'IRN_EAZ'].includes(fid)) {
    if (r0.note === r8.note) {
      console.error(`ERRORE: La descrizione temporale non evolve tra 1936 e 1941 per la provincia cardine ${fid}`);
      allPassed = false;
    }
  }

  console.log(`✓ ${fid.padEnd(8)} -> [1936-1941: ${r0.o} | ${r0.fac}]`);
  console.log(`         Toponimo Storico: ${r0.name}`);
  console.log(`         Denom. Moderna:   ${p.NUTS_NAME} (${p.CNTR_NAME}) · ${p.NAME_LATN}`);
  console.log(`         Entità Ammin.:    ${r0.adminEntity}`);
  console.log(`         Nota 1936:        ${r0.note.slice(0, 85)}...`);
  console.log(`         Nota 1941:        ${r8.note.slice(0, 85)}...\n`);
}

// Verifica assenza vecchio poligono monolitico HB
const oldIran = worldData.features.find((f: any) => {
  const p = f.properties || {};
  return (p.NAME === 'Iran' || p.SUBJECTO === 'Iran') && p.__layer === 'hb';
});

if (oldIran) {
  console.error('ERRORE: Il vecchio poligono monolitico HB di Iran è ancora presente!');
  allPassed = false;
} else {
  console.log('✓ Vecchio poligono monolitico HB rimosso (zero duplicazioni cartografiche)');
}

// Verifica compatibilità retroattiva resolveHB
const hbTest = resolveHB({ properties: { NAME: 'Iran' } }, 0);
if (hbTest.o === 'IRN') {
  console.log('✓ Compatibilità retroattiva resolveHB("Iran") confermata al 100% (IRN)');
} else {
  console.error('ERRORE: resolveHB("Iran") ha fallito:', hbTest);
  allPassed = false;
}

if (!allPassed) {
  console.error('\nAUDIT FALLITO!');
  process.exit(1);
}

console.log('\nTUTTE LE 31 PROVINCE DELL\'IMPERO DELL\'IRAN SONO PERFETTAMENTE VALIDE E ALLINEATE ALLA TIMELINE AL 100%! ✓');
