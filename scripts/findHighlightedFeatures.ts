import { KRESY_POWIAT_FEATURES } from '../src/data/kresyPowiats';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import * as d3 from 'd3';

// Highlighted powiat in Poland:
// It is between Wilno and Minsk, roughly Lat 54.2..54.5, Lon 26.5..27.5
console.log('--- Checking Kresy Powiats around Lat 54.0..54.7, Lon 26.0..28.0 ---');
for (const f of KRESY_POWIAT_FEATURES) {
  const coords = f.geometry.coordinates[0];
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  coords.forEach((pt: number[]) => {
    minX = Math.min(minX, pt[0]);
    minY = Math.min(minY, pt[1]);
    maxX = Math.max(maxX, pt[0]);
    maxY = Math.max(maxY, pt[1]);
  });
  if (minX >= 25.5 && maxX <= 28.5 && minY >= 54.0 && maxY <= 55.0) {
    console.log(`- ${f.id}: "${f.properties?.name || f.properties?.NUTS_NAME}" bbox: [${minX.toFixed(3)}, ${minY.toFixed(3)}] to [${maxX.toFixed(3)}, ${maxY.toFixed(3)}]`);
  }
}

// Highlighted region in USSR:
// In southern/eastern Belarus, Lat 53..54, Lon 28..31
console.log('\n--- Checking USSR features in Belarus ---');
for (const f of USSR_REGIONAL_FEATURES) {
  if (f.id.startsWith('SOV_ADM1_BLR')) {
    console.log(`- ${f.id}: "${f.properties?.NUTS_NAME}"`);
  }
}
