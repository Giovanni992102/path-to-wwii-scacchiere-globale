import * as fs from 'fs';
import * as path from 'path';
import { resolveFeature } from '../src/data/georesolver';

console.log('=== VERIFICA GEO-TOPOGRAFICA DELLE 33 PROVINCE DELLA COREA (38° PARALLELO) ===\n');

// 1. Carica il file GeoJSON delle province della Corea
const geojsonPath = path.resolve('public/data/korea_provinces.geojson');
const rawData = fs.readFileSync(geojsonPath, 'utf-8');
const geojson = JSON.parse(rawData);

const features = geojson.features;
console.log(`Numero totale di province coreane: ${features.length} (atteso: 33)`);
if (features.length !== 33) {
  console.error(`ERRORE: Attese 33 province, trovate ${features.length}`);
  process.exit(1);
}

// 2. Verifica divisione rigorosa al 38° Parallelo
let northCount = 0;
let southCount = 0;

for (const f of features) {
  const p = f.properties;
  const side = p.PARALLEL_38_SIDE;
  const coords: number[][] = [];
  
  const extractCoords = (cList: any) => {
    if (typeof cList[0] === 'number') {
      coords.push(cList);
    } else {
      for (const item of cList) extractCoords(item);
    }
  };
  extractCoords(f.geometry.coordinates);

  const lats = coords.map(c => c[1]);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);

  if (side === 'NORTH') {
    northCount++;
    if (minLat < 37.99999) {
      console.error(`ERRORE: Feature ${p.id} designata NORTH ma ha minLat=${minLat} < 38.0°`);
      process.exit(1);
    }
  } else if (side === 'SOUTH') {
    southCount++;
    if (maxLat > 38.00001) {
      console.error(`ERRORE: Feature ${p.id} designata SOUTH ma ha maxLat=${maxLat} > 38.0°`);
      process.exit(1);
    }
  } else {
    console.error(`ERRORE: Feature ${p.id} priva di PARALLEL_38_SIDE ('NORTH' o 'SOUTH')`);
    process.exit(1);
  }

  // Risoluzione geopolitica: sotto sovranità coloniale Chōsen (JAP/Asse) per il periodo 1936-1941
  const res0 = resolveFeature(f, 0);
  if (!res0 || res0.o !== 'JAP') {
    console.error(`ERRORE Risoluzione per ${p.id}: o=${res0?.o} (atteso: JAP)`);
    process.exit(1);
  }
}

console.log(`[PASS] Verifica 38° Parallelo: ${northCount} province/settori a NORD (>= 38.0°), ${southCount} province/settori a SUD (<= 38.0°).`);
console.log(`[PASS] Tutte le 33 province coreane sono assegnate alla sovranità imperiale di Chōsen (JAP / Asse).\n`);

// 3. Verifica features specifiche di split al 38° parallelo
const splitChecks = [
  'KR42_N', 'KR42_S', // Gangwon
  'KR41_N', 'KR41_S', // Gyeonggi
  'KP05_N', 'KP05_S', // South Hwanghae (Ongjin)
  'KP06_N', 'KP06_S', // North Hwanghae (Kaesong)
];

for (const sc of splitChecks) {
  const feat = features.find((f: any) => f.properties.id === sc);
  if (!feat) {
    console.error(`ERRORE: Feature di split mancante: ${sc}`);
    process.exit(1);
  }
  console.log(`[PASS] Verificata entità split: ${sc} -> ${feat.properties.name} (${feat.properties.PARALLEL_38_SIDE})`);
}

console.log('\n=== TUTTI I CONTROLLI GEO-TOPOGRAFICI DELLA COREA SONO STATI SUPERATI CON SUCCESSO! ===');
