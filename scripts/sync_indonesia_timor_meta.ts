import * as fs from 'fs';
import * as path from 'path';
import { INDONESIA_PROVINCES_META, TIMOR_LESTE_META } from '../src/data/indonesiaTimorProvinces';

const targetFiles = [
  'public/data/world_historical_1938_unified.json',
  'dist/data/world_historical_1938_unified.json',
  'public/data/indonesia_timor_provinces.geojson',
  'dist/data/indonesia_timor_provinces.geojson'
];

console.log(`Caricati 34 metadati Indonesia e 1 metadato Timor-Leste`);

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

    if (fid === 'TLS' || feat.properties?.CNTR_CODE === 'TL' || feat.properties?.ISO3_CODE === 'TLS') {
      const p = feat.properties || {};
      feat.id = 'TLS';
      p.id = 'TLS';
      p.name = TIMOR_LESTE_META.name;
      p.NAME = TIMOR_LESTE_META.historicalName;
      p.HISTORICAL_NAME = TIMOR_LESTE_META.historicalName;
      p.MODERN_NAME = TIMOR_LESTE_META.modernName;
      p.NUTS_NAME = TIMOR_LESTE_META.nutsName;
      p.NAME_LATN = TIMOR_LESTE_META.nameLatn;
      p.NAME_ENGL = TIMOR_LESTE_META.nameEngl;
      p.ADMIN = TIMOR_LESTE_META.adminTitle;
      p.ADMIN_TITLE = TIMOR_LESTE_META.adminTitle;
      p.SOVEREIGN = 'POR';
      p.SOVEREIGNT = 'Império Colonial Português';
      p.CNTR_CODE = 'TL';
      p.CNTR_NAME = 'Timor-Leste';
      p.ISO2 = 'TL';
      p.ISO3_CODE = 'TLS';
      p.REGION_KIND = 'TIMOR_LESTE';
      p.HISTORICAL_NOTE = TIMOR_LESTE_META.s0_1;
      p.CAPITAL = TIMOR_LESTE_META.capital;
      p.__layer = 'prov';
      feat.properties = p;
      updatedCount++;
    } else if (INDONESIA_PROVINCES_META[fid]) {
      const m = INDONESIA_PROVINCES_META[fid];
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
      p.SOVEREIGN = 'HOL';
      p.SOVEREIGNT = 'Koninkrijk der Nederlanden';
      p.CNTR_CODE = 'ID';
      p.CNTR_NAME = 'Indonesia';
      p.ISO2 = 'ID';
      p.ISO3_CODE = 'IDN';
      p.REGION_KIND = 'INDONESIA_PROVINCE';
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

console.log('Sincronizzazione completata con successo!');
