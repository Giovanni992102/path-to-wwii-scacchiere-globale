import { KRESY_POWIAT_FEATURES } from '../src/data/kresyPowiats';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import fs from 'fs';
import * as topojson from 'topojson-client';

// Load NUTS
const nutsRaw = fs.readFileSync('public/data/nuts_10m.json', 'utf8');
const topo = JSON.parse(nutsRaw);
const key = Object.keys(topo.objects)[0];
const nutsFeats = (topojson.feature(topo, topo.objects[key]) as any).features;

console.log('--- KRESY POWIATS NEAR LAT 47.5-49.5, LON 25-27 ---');
for (const f of KRESY_POWIAT_FEATURES) {
  // compute simple bounds
  const coords: number[][] = [];
  function extract(c: any) {
    if (typeof c[0] === 'number') coords.push(c);
    else c.forEach(extract);
  }
  extract(f.geometry.coordinates);
  const minX = Math.min(...coords.map(c => c[0]));
  const maxX = Math.max(...coords.map(c => c[0]));
  const minY = Math.min(...coords.map(c => c[1]));
  const maxY = Math.max(...coords.map(c => c[1]));
  
  if (maxX >= 25.5 && minX <= 27 && maxY >= 48.0 && minY <= 49.5) {
    console.log(`KRESY: ${f.id} | ${f.properties.NUTS_NAME || f.properties.NAME} | X:[${minX.toFixed(2)}, ${maxX.toFixed(2)}] Y:[${minY.toFixed(2)}, ${maxY.toFixed(2)}]`);
  }
}

console.log('\n--- USSR FEATURES NEAR LAT 47.5-49.5, LON 25.5-28.5 ---');
for (const f of USSR_REGIONAL_FEATURES) {
  const coords: number[][] = [];
  function extract(c: any) {
    if (typeof c[0] === 'number') coords.push(c);
    else c.forEach(extract);
  }
  extract(f.geometry.coordinates);
  const minX = Math.min(...coords.map(c => c[0]));
  const maxX = Math.max(...coords.map(c => c[0]));
  const minY = Math.min(...coords.map(c => c[1]));
  const maxY = Math.max(...coords.map(c => c[1]));
  
  if (maxX >= 25.5 && minX <= 28.5 && maxY >= 47.5 && minY <= 49.5) {
    console.log(`USSR: ${f.id} | ${f.properties.NUTS_NAME || f.properties.NAME || f.properties.HISTORICAL_NAME} | X:[${minX.toFixed(2)}, ${maxX.toFixed(2)}] Y:[${minY.toFixed(2)}, ${maxY.toFixed(2)}]`);
  }
}

console.log('\n--- NUTS FEATURES (ROMANIA/BUKOVINA) NEAR LAT 47.5-49.0, LON 25-27 ---');
for (const f of nutsFeats) {
  const nid = f.properties?.NUTS_ID || f.id;
  if (!nid || !nid.startsWith('RO')) continue;
  const coords: number[][] = [];
  function extract(c: any) {
    if (typeof c[0] === 'number') coords.push(c);
    else c.forEach(extract);
  }
  extract(f.geometry.coordinates);
  const minX = Math.min(...coords.map(c => c[0]));
  const maxX = Math.max(...coords.map(c => c[0]));
  const minY = Math.min(...coords.map(c => c[1]));
  const maxY = Math.max(...coords.map(c => c[1]));
  
  if (maxX >= 25.0 && minX <= 27.5 && maxY >= 47.0 && minY <= 49.0) {
    console.log(`RO NUTS: ${nid} | ${f.properties.NAME_LATN} | X:[${minX.toFixed(2)}, ${maxX.toFixed(2)}] Y:[${minY.toFixed(2)}, ${maxY.toFixed(2)}]`);
  }
}
