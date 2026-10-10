import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import { HB_EXCL } from '../src/data/georesolver';

console.log('Total features in WORLD_1938_GEOJSON:', WORLD_1938_GEOJSON.features.length);

const unexcluded: string[] = [];
for (const f of WORLD_1938_GEOJSON.features) {
  const nm = f.properties?.NAME || '';
  if (!HB_EXCL.has(nm)) {
    // Check where this feature is located
    unexcluded.push(nm);
  }
}

console.log('Unexcluded features count:', unexcluded.length);
console.log('Unexcluded features list:\n', unexcluded.sort().join(', '));
