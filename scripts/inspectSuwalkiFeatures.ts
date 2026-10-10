import { KRESY_POWIAT_FEATURES } from '../src/data/kresyPowiats';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import * as topojson from 'topojson-client';
import * as fs from 'fs';
import * as path from 'path';
import * as d3 from 'd3';

async function main() {
  const nutsPath = path.resolve('public/data/nuts_10m.json');
  const topoNuts = JSON.parse(fs.readFileSync(nutsPath, 'utf8'));
  const nutsK = Object.keys(topoNuts.objects)[0];
  const nuts = (topojson.feature(topoNuts, topoNuts.objects[nutsK]) as any).features;

  // Let's inspect the triangle void around Suwalki / Alytus / East Prussia
  // Void bbox: [23.515, 53.893] to [23.666, 53.957]
  console.log('--- Features near Suwalki / Alytus / East Prussia void (23.5..23.7, 53.8..54.1) ---');
  
  // Check NUTS (Lithuania, Poland, Germany)
  for (const f of nuts) {
    const id = f.properties?.NUTS_ID || f.id || '';
    if (id.startsWith('LT') || id.startsWith('PL') || id.startsWith('DE')) {
      const bb = d3.geoBounds(f);
      if (bb[1][0] >= 23.0 && bb[0][0] <= 24.2 && bb[1][1] >= 53.5 && bb[0][1] <= 54.5) {
        console.log(`- NUTS: ${id} (${f.properties?.NUTS_NAME})`);
      }
    }
  }

  // Check Kresy
  for (const f of KRESY_POWIAT_FEATURES) {
    const coords = f.geometry.coordinates[0];
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    coords.forEach((pt: number[]) => {
      minX = Math.min(minX, pt[0]);
      minY = Math.min(minY, pt[1]);
      maxX = Math.max(maxX, pt[0]);
      maxY = Math.max(maxY, pt[1]);
    });
    if (maxX >= 23.0 && minX <= 24.2 && maxY >= 53.5 && minY <= 54.5) {
      console.log(`- Kresy: ${f.id} (${f.properties?.name || f.properties?.NUTS_NAME}) bbox: [${minX.toFixed(2)}, ${minY.toFixed(2)}] to [${maxX.toFixed(2)}, ${maxY.toFixed(2)}]`);
    }
  }
}

main().catch(console.error);
