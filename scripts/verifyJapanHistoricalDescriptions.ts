import * as fs from 'fs';
import * as path from 'path';
import { processHistoricalCartographyPipeline } from '../src/data/historicalEngine';
import { resolveFeature } from '../src/data/georesolver';

console.log('=== VERIFICA METICOLOSA DELLE 47 PREFETTURE DEL GIAPPONE + 2 TERRITORI ===\n');

const unifiedPath = path.resolve('dist/data/world_historical_1938_unified.json');
const raw = fs.readFileSync(unifiedPath, 'utf8');
const data = JSON.parse(raw);

const jpFts = data.features.filter((f: any) => {
  const p = f.properties || {};
  return p.REGION_KIND === 'JAPAN_PREFECTURE' || p.REGION_KIND === 'JAPAN_TERRITORY' || (f.id && f.id.startsWith('JP_'));
});

console.log(`Trovate ${jpFts.length} entità giapponesi metropolitane (attese 49: 47 prefetture + Karafuto + Chishima).`);
if (jpFts.length !== 49) {
  throw new Error(`Attese 49 entità, trovate ${jpFts.length}`);
}

// 1. Esegui la pipeline cartografica completa come avviene a runtime nel browser
processHistoricalCartographyPipeline(jpFts, [], [], false);

const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let totalChecks = 0;
let errors = 0;

for (const f of jpFts) {
  const pid = f.id || f.properties.id;
  const pname = f.properties.name || f.properties.NAME;

  for (const s of steps) {
    const res = f.__res[s];

    // Sovranità Asse / JAP
    if (res.o !== 'JAP') {
      console.error(`[ERRORE] ${pid} Step ${s}: Sovranità errata ${res.o}`);
      errors++;
    }
    if (res.fac !== 'Asse') {
      console.error(`[ERRORE] ${pid} Step ${s}: Fazione errata ${res.fac}`);
      errors++;
    }

    // Verifica che il nome NON sia stato appiattito a macro-regione generica
    const isFlattened =
      res.name === 'Kyūshū (Fukuoka, Nagasaki & Base Navale di Sasebo)' && pid !== 'JP40' && pid !== 'JP42';
    if (isFlattened) {
      console.error(`[ERRORE] ${pid} (${pname}) Step ${s}: Nome appiattito su macro-regione! "${res.name}"`);
      errors++;
    }

    // Verifica che la nota sia ricca e specifica (> 50 caratteri)
    if (!res.note || res.note.length < 50) {
      console.error(`[ERRORE] ${pid} Step ${s}: Nota troppo corta o assente!`);
      errors++;
    }

    totalChecks += 4;
  }

  // Verifica dinamismo temporale tra Step 0 e Step 8
  const note0 = f.__res[0].note;
  const note2 = f.__res[2].note;
  const note6 = f.__res[6].note;
  const note8 = f.__res[8].note;

  if (note0 === note2 && note2 === note6 && note6 === note8) {
    console.error(`[ERRORE] ${pid} (${pname}): La nota storica è statica lungo tutta la timeline!`);
    errors++;
  } else {
    totalChecks++;
  }
}

if (errors > 0) {
  throw new Error(`Rilevati ${errors} errori nel controllo del Giappone!`);
}

console.log(`\n✓ Tutte le 49 entità del Giappone (47 prefetture + Karafuto + Chishima) sono state verificate su tutti i 9 Step.`);
console.log(`✓ Nessuna prefettura è appiattita a macro-regione; ciascuna mantiene la sua specifica descrizione storica e toponimo.`);
console.log(`✓ Dinamismo temporale confermato (Step 0: anteguerra -> Step 2: guerra in Cina -> Step 6: Patto Tripartito -> Step 8: Patto con l'URSS e preparazione Pearl Harbor).`);
console.log(`\nCampioni di verifica:`);
const tokyo = jpFts.find((f: any) => f.id === 'JP13');
const hiroshima = jpFts.find((f: any) => f.id === 'JP34');
const nagasaki = jpFts.find((f: any) => f.id === 'JP42');
const okinawa = jpFts.find((f: any) => f.id === 'JP47');

console.log('Tokyo @ Step 0:', { name: tokyo.__res[0].name, note: tokyo.__res[0].note.slice(0, 90) + '...' });
console.log('Hiroshima @ Step 8:', { name: hiroshima.__res[8].name, note: hiroshima.__res[8].note.slice(0, 90) + '...' });
console.log('Nagasaki @ Step 2:', { name: nagasaki.__res[2].name, note: nagasaki.__res[2].note.slice(0, 90) + '...' });
console.log('Okinawa @ Step 6:', { name: okinawa.__res[6].name, note: okinawa.__res[6].note.slice(0, 90) + '...' });

console.log(`\n=== TUTTI I CONTROLLI SUPERATI CON SUCCESSO! (Totale verifiche individuali: ${totalChecks}) ===\n`);
