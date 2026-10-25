import * as fs from 'fs';
import * as path from 'path';
import { resolveFeature } from '../src/data/georesolver';

console.log('--- VERIFICA INTEGRITA GEOSTORICA E TOPOLOGICA GUANTANAMO BAY ---');

const publicUnifiedPath = path.resolve('public/data/world_historical_1938_unified.json');
const distUnifiedPath = path.resolve('dist/data/world_historical_1938_unified.json');
const standalonePath = path.resolve('public/data/guantanamo_bay.geojson');

// 1. Check standalone file
if (!fs.existsSync(standalonePath)) {
  throw new Error(`File ${standalonePath} non trovato!`);
}
const standalone = JSON.parse(fs.readFileSync(standalonePath, 'utf-8'));
console.log(`[PASS] Standalone geojson valido: ${standalone.features.length} feature trovata.`);

// 2. Check public & dist unified files
for (const [name, filePath] of [['public', publicUnifiedPath], ['dist', distUnifiedPath]]) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File ${filePath} non trovato!`);
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const gtmo = data.features.find((f: any) => f.id === 'US_GUANTANAMO');
  const cuba = data.features.find((f: any) => f.properties?.NAME === 'Cuba' && f.properties?.__layer === 'hb');

  if (!gtmo) {
    throw new Error(`US_GUANTANAMO non presente in ${name}!`);
  }
  if (!cuba) {
    throw new Error(`Cuba non presente in ${name}!`);
  }

  console.log(`[PASS] ${name}: US_GUANTANAMO e Cuba presenti.`);

  // Test georesolver for both
  const resGtmo = resolveFeature(gtmo, 0);
  console.log(`[PASS] ${name} Guantanamo resolution:`, resGtmo);
  if (resGtmo.o !== 'USA') throw new Error(`Owner atteso USA, ottenuto: ${resGtmo.o}`);
  if (resGtmo.fac !== 'Alleati') throw new Error(`Faction attesa Alleati, ottenuta: ${resGtmo.fac}`);
  if (!resGtmo.name.includes('Guantanamo')) throw new Error(`Name non include Guantanamo: ${resGtmo.name}`);
  if (!resGtmo.adminEntity?.includes('Treaty of 1934')) throw new Error(`adminEntity non include Treaty of 1934: ${resGtmo.adminEntity}`);

  const resCuba = resolveFeature(cuba, 0);
  console.log(`[PASS] ${name} Cuba resolution:`, resCuba);
  if (resCuba.o !== 'CUB') throw new Error(`Owner atteso CUB, ottenuto: ${resCuba.o}`);
  if (resCuba.fac !== 'Neutrale') throw new Error(`Faction attesa Neutrale, ottenuta: ${resCuba.fac}`);
}

console.log('--- TUTTI I CONTROLLI DI RISOLUZIONE E INTEGRITA COMPLETATI CON SUCCESSO! ---');
