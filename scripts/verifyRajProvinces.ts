import * as fs from 'fs';
import * as path from 'path';

console.log('=== AUDIT GEOTOPOGRAFICO INTEGRALE PROVINCE BRITISH RAJ (65 PROVINCE) ===\n');

const worldPath = path.join(process.cwd(), 'public/data/world_historical_1938_unified.json');
const worldData = JSON.parse(fs.readFileSync(worldPath, 'utf-8'));

const rajFeatures = worldData.features.filter((f: any) => {
  const p = f.properties || {};
  return p.REGION_KIND === 'RAJ_PROVINCE' || ['PK', 'BD', 'MM', 'IN'].includes(p.CNTR_CODE);
});

console.log(`Numero province British Raj caricate nel database unificato: ${rajFeatures.length}/65\n`);

if (rajFeatures.length !== 65) {
  console.error(`ERRORE: Attese 65 province, trovate ${rajFeatures.length}`);
  process.exit(1);
}

let allPassed = true;
const counts = { PK: 0, BD: 0, MM: 0, IN: 0 };

for (const feat of rajFeatures) {
  const p = feat.properties || {};
  const fid = feat.id;

  // 1. Verifica proprietà geotopografiche
  if (!p.id || !p.NUTS_ID || !p.CNTR_CODE || !p.CNTR_NAME || !p.NAME || !p.MODERN_NAME || !p.__cent) {
    console.error(`ERRORE: Proprietà incomplete per ${fid}:`, p);
    allPassed = false;
  }

  if (['PK', 'BD', 'MM', 'IN'].includes(p.CNTR_CODE)) {
    counts[p.CNTR_CODE as keyof typeof counts]++;
  }

  // 2. Verifica geometria valida
  if (!feat.geometry || !feat.geometry.coordinates || feat.geometry.coordinates.length === 0) {
    console.error(`ERRORE: Geometria vuota o non valida per ${fid}`);
    allPassed = false;
  }

  // 3. Verifica centroide valido
  const [lon, lat] = p.__cent || [0, 0];
  if (lon < 60 || lon > 105 || lat < 5 || lat > 40) {
    console.error(`ERRORE: Centroide fuori dai limiti geografici per ${fid}: [${lon}, ${lat}]`);
    allPassed = false;
  }

  console.log(`✓ [${p.CNTR_CODE}] ${fid.padEnd(12)} -> ${p.NUTS_NAME || p.NAME} (Cent: ${lon.toFixed(2)}, ${lat.toFixed(2)})`);
}

console.log('\nRiepilogo Province per Nazione:');
console.log(` - Pakistan:   ${counts.PK}/7`);
console.log(` - Bangladesh: ${counts.BD}/8`);
console.log(` - Myanmar:    ${counts.MM}/14`);
console.log(` - India:      ${counts.IN}/36`);
console.log(` - Totale:     ${rajFeatures.length}/65`);

if (counts.PK !== 7 || counts.BD !== 8 || counts.MM !== 14 || counts.IN !== 36) {
  console.error('ERRORE: Il conteggio per paese non corrisponde alle 65 entità attese!');
  allPassed = false;
}

if (!allPassed) {
  console.error('\nAUDIT FALLITO!');
  process.exit(1);
} else {
  console.log('\nAUDIT GEOTOPOGRAFICO SUPERATO CON SUCCESSO! 65/65 PROVINCE CONFORMI.');
}
