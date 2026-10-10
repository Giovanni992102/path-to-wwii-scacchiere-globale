import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { KRESY_POWIAT_FEATURES } from '../src/data/kresyPowiats';
import { CHINA_REGIONAL_FEATURES } from '../src/data/chinaRegions';
import { PRECISION_HISTORICAL_FEATURES } from '../src/data/historicalBorders';
import { HB_EXCL } from '../src/data/georesolver';
import * as d3 from 'd3';
import * as fs from 'fs';
import * as topojson from 'topojson-client';

async function testAll() {
  console.log('=== VERIFICA PROFONDA MAPPA: POLIGONI INVERTITI, BUCHI NERI E SOVRAPPOSIZIONI ===\n');

  // 1. Check winding order on all regional features
  const allProvs = [
    ...PRECISION_HISTORICAL_FEATURES,
    ...KRESY_POWIAT_FEATURES,
    ...USSR_REGIONAL_FEATURES,
    ...CHINA_REGIONAL_FEATURES
  ];

  console.log(`Verifica orientamento coordinate (winding order) su ${allProvs.length} feature statiche:`);
  let invertedCount = 0;
  for (const f of allProvs) {
    try {
      const a = d3.geoArea(f);
      if (a > Math.PI) {
        invertedCount++;
        console.log(`- INVERTITA (area = ${(a / (4*Math.PI)).toFixed(3)} del globo): ${f.id} (${f.properties?.NUTS_NAME || f.properties?.NAME || f.properties?.HISTORICAL_NAME})`);
      }
    } catch (e: any) {
      console.log(`- ERRORE GEOMETRIA: ${f.id} -> ${e.message}`);
    }
  }
  console.log(`Totale feature invertite: ${invertedCount}\n`);

  // 2. Check HB 1938 GeoJSON
  console.log('Verifica HB 1938 Basemap...');
  const hbRaw = JSON.parse(fs.readFileSync('public/data/world_1938.geojson', 'utf-8'));
  console.log(`Totale feature in world_1938.geojson: ${hbRaw.features.length}`);

  let hbInverted = 0;
  for (const f of hbRaw.features) {
    try {
      const a = d3.geoArea(f);
      if (a > Math.PI) {
        hbInverted++;
        console.log(`- HB INVERTITA: ${f.properties?.NAME}`);
      }
    } catch (e: any) {
      console.log(`- ERRORE HB: ${f.properties?.NAME} -> ${e.message}`);
    }
  }
  console.log(`Totale feature HB invertite: ${hbInverted}\n`);

  // 3. Check HB Exclusions vs What is actually provided in provs
  console.log('Verifica esclusioni HB_EXCL vs provs:');
  const hbKept: any[] = [];
  const hbDropped: any[] = [];
  for (const f of hbRaw.features) {
    const nm = f.properties?.NAME || '';
    if (HB_EXCL.has(nm)) {
      hbDropped.push(nm);
    } else {
      hbKept.push(nm);
    }
  }
  console.log(`Feature HB mantenute: ${hbKept.length}`);
  console.log(`Feature HB scartate da HB_EXCL: ${hbDropped.length}`);
  console.log('Scartate:', hbDropped);
}

testAll().catch(console.error);
