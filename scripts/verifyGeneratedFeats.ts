import * as fs from 'fs';
import * as d3 from 'd3';

const feats = JSON.parse(fs.readFileSync('scripts/generatedPrecisionFeatures.json', 'utf8'));

for (const [key, geom] of Object.entries(feats)) {
  const f = { type: 'Feature', geometry: geom as any };
  const area = d3.geoArea(f as any) * 6371 * 6371;
  const bounds = d3.geoBounds(f as any);
  console.log(`${key}: type=${(geom as any).type}, area=${area.toFixed(1)} km2, bounds=[[${bounds[0].map((v: number) => v.toFixed(3))}], [${bounds[1].map((v: number) => v.toFixed(3))}]]`);
}
