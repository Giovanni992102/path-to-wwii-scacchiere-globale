import { resolveFeature } from '../src/data/georesolver';

console.log('=== AUDIT GEOSTORICO INTEGRALE MANDATO DI SIRIA (14 PROVINCE) ===\n');

const testCases = [
  { id: 'SYR_DAM', name: 'Damascus', expected: 'Damasco' },
  { id: 'SYR_GHT', name: 'Rif Dimashq', expected: 'Ghouta' },
  { id: 'SYR_ALP', name: 'Aleppo', expected: 'Aleppo' },
  { id: 'SYR_IDL', name: 'Idlib', expected: 'Idlib' },
  { id: 'SYR_LTK', name: 'Lattakia', expected: 'Latakia' },
  { id: 'SYR_TAR', name: 'Tartus', expected: 'Tartus' },
  { id: 'SYR_HMS', name: 'Homs', expected: 'Homs' },
  { id: 'SYR_HMA', name: 'Hamah', expected: 'Hama' },
  { id: 'SYR_JAZ', name: 'Hasaka', expected: 'Giazira' },
  { id: 'SYR_RAQ', name: 'Ar Raqqah', expected: 'Raqqa' },
  { id: 'SYR_DEZ', name: 'Dayr Az Zawr', expected: 'Deir ez-Zor' },
  { id: 'SYR_DRU', name: 'As Suwayda', expected: 'Druso' },
  { id: 'SYR_HAU', name: 'Dar`a', expected: 'Hauran' },
  { id: 'SYR_GOL', name: 'Quneitra', expected: 'Golan' },
];

let allPassed = true;

for (const tc of testCases) {
  // Step 0 (1936 - Mandato Repubblica Francese)
  const resPre = resolveFeature({ properties: { CNTR_CODE: 'SYR', NUTS_ID: tc.id, NAME: tc.name } }, 0);
  const okPre = resPre.o === 'F_SYR' && resPre.fac === 'Alleati' && resPre.name.includes(tc.expected);

  // Step 7 (Ottobre 1940 - Regime di Vichy)
  const resVic = resolveFeature({ properties: { CNTR_CODE: 'SYR', NUTS_ID: tc.id, NAME: tc.name } }, 7);
  const okVic = resVic.o === 'VIC_SYR' && resVic.fac === 'Fantoccio' && resVic.name.includes(tc.expected);

  if (okPre && okVic) {
    console.log(`✓ ${tc.id.padEnd(8)} -> [1936: ${resPre.o} | ${resPre.fac}] ==> [1940: ${resVic.o} | ${resVic.fac}] (${resPre.name})`);
  } else {
    console.error(`✗ Errore su ${tc.id}:`, { resPre, resVic });
    allPassed = false;
  }
}

if (!allPassed) {
  process.exit(1);
}

console.log('\nTUTTE LE 14 PROVINCE DEL MANDATO DI SIRIA SONO VALIDE AL 100%! ✓');