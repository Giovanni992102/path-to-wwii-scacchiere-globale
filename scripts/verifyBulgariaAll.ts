import { resolveFeature } from '../src/data/georesolver';
import fs from 'fs';
import * as topojson from 'topojson-client';

const raw = fs.readFileSync('public/data/nuts_10m.json', 'utf8');
const topo = JSON.parse(raw);
const key = Object.keys(topo.objects)[0];
const feats = (topojson.feature(topo, topo.objects[key]) as any).features;

const bgFeats = feats.filter((f: any) => {
  const nid = f.properties?.NUTS_ID || f.id;
  return nid && nid.startsWith('BG');
});

console.log(`Found ${bgFeats.length} Bulgarian NUTS features.`);

// Step 1: 1938 (matches user historical map 1938 boundary!)
console.log('\n--- EVALUATING STEP 1 (MAR 1938) ---');
for (const f of bgFeats) {
  const res = resolveFeature(f, 1);
  const nid = f.properties.NUTS_ID || f.id;
  console.log(`${nid.padEnd(6)} | Owner: ${res.o.padEnd(4)} | Name: ${res.name.padEnd(35)} | Note: ${res.note || ''}`);
}

// Check specifically:
// BG323 (Ruse) must be BUL
// BG331 (Varna) must be BUL
// BG325 (Silistra) must be ROM (in 1938)
// BG332 (Dobrich) must be ROM (in 1938)
const ruse = bgFeats.find((f: any) => (f.properties?.NUTS_ID || f.id) === 'BG323');
const varna = bgFeats.find((f: any) => (f.properties?.NUTS_ID || f.id) === 'BG331');
const silistra = bgFeats.find((f: any) => (f.properties?.NUTS_ID || f.id) === 'BG325');
const dobrich = bgFeats.find((f: any) => (f.properties?.NUTS_ID || f.id) === 'BG332');

const ruseRes = resolveFeature(ruse, 1);
const varnaRes = resolveFeature(varna, 1);
const silRes = resolveFeature(silistra, 1);
const dobRes = resolveFeature(dobrich, 1);

console.log('\n--- VERIFICATION CHECKS ---');
console.log('Ruse (BG323):', ruseRes.o, ruseRes.name);
console.log('Varna (BG331):', varnaRes.o, varnaRes.name);
console.log('Silistra (BG325):', silRes.o, silRes.name);
console.log('Dobrich (BG332):', dobRes.o, dobRes.name);

if (ruseRes.o !== 'BUL') throw new Error('Ruse must be BUL!');
if (varnaRes.o !== 'BUL') throw new Error('Varna must be BUL!');
if (silRes.o !== 'ROM') throw new Error('Silistra must be ROM in 1938!');
if (dobRes.o !== 'ROM') throw new Error('Dobrich must be ROM in 1938!');

console.log('\nALL BULGARIAN CHECKS PASSED PERFECTLY!');
