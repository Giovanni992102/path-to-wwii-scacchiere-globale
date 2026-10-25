import * as fs from 'fs';
import * as path from 'path';
import { PHILIPPINES_PROVINCES_META } from '../src/data/philippinesProvinces';

const targetFiles = [
  'public/data/world_historical_1938_unified.json',
  'dist/data/world_historical_1938_unified.json',
  'public/data/philippines_provinces.geojson',
  'dist/data/philippines_provinces.geojson'
];

console.log(`Caricati ${Object.keys(PHILIPPINES_PROVINCES_META).length} metadati Filippine`);

for (const relPath of targetFiles) {
  const filePath = path.resolve(relPath);
  if (!fs.existsSync(filePath)) {
    console.warn(`File non trovato: ${filePath}`);
    continue;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  let updatedCount = 0;

  for (const feat of data.features) {
    const fid = (feat.id || feat.properties?.id || '').trim();

    if (PHILIPPINES_PROVINCES_META[fid]) {
      const m = PHILIPPINES_PROVINCES_META[fid];
      const p = feat.properties || {};
      feat.id = fid;
      p.id = fid;
      p.name = m.name;
      p.NAME = m.historicalName;
      p.HISTORICAL_NAME = m.historicalName;
      p.MODERN_NAME = m.modernName;
      p.NUTS_NAME = m.nutsName;
      p.NAME_LATN = m.nameLatn;
      p.NAME_ENGL = m.nameEngl;
      p.ADMIN = m.adminTitle;
      p.ADMIN_TITLE = m.adminTitle;
      p.SOVEREIGN = 'PHL';
      p.SOVEREIGNT = 'Commonwealth of the Philippines';
      p.OVERLORD = 'USA';
      p.CNTR_CODE = 'PH';
      p.CNTR_NAME = 'Philippines';
      p.ISO2 = 'PH';
      p.ISO3_CODE = 'PHL';
      p.REGION_KIND = 'PHILIPPINES_PROVINCE';
      p.HISTORICAL_NOTE = m.s0_1;
      p.CAPITAL = m.capital;
      p.ISLAND_GROUP = m.islandGroup;
      p.__layer = 'prov';
      feat.properties = p;
      updatedCount++;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
  console.log(`Aggiornate ${updatedCount} feature in ${relPath}`);
}

console.log('Sincronizzazione metadati Filippine completata con successo!');
