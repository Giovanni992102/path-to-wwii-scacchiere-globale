import * as fs from 'fs';
import * as path from 'path';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';

console.log('Original features in WORLD_1938_GEOJSON:', WORLD_1938_GEOJSON.features.length);

const filteredFeatures = WORLD_1938_GEOJSON.features.filter((f: any) => {
  const nm = f.properties?.NAME || '';
  if (nm === 'Armenia') {
    console.log('Removing phantom Armenia feature:', f.properties);
    return false;
  }
  return true;
});

console.log('Filtered features count:', filteredFeatures.length);

const updatedGeoJson = {
  ...WORLD_1938_GEOJSON,
  features: filteredFeatures
};

const worldPath = path.join(process.cwd(), 'src/data/world1938.ts');
const content = `// Basemap storico 1938 con confini Iran-Caucaso sigillati con perizia geografica
export const WORLD_1938_GEOJSON: any = ${JSON.stringify(updatedGeoJson)};
`;

fs.writeFileSync(worldPath, content, 'utf8');
console.log(`✓ Updated ${worldPath} successfully!`);
