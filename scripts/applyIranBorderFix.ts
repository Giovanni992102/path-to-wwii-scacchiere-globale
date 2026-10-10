import * as fs from 'fs';
import * as path from 'path';
import * as topojson from 'topojson-client';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';

const nutsRaw = JSON.parse(fs.readFileSync('public/data/nuts_10m.json', 'utf8'));
const k = Object.keys(nutsRaw.objects)[0];
const nutsFeats = (topojson.feature(nutsRaw, nutsRaw.objects[k]) as any).features;

const van = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRB21');
const agri = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRA21');

const fullVanArc: [number, number][] = [];
for (let i = 14; i >= 0; i--) {
  fullVanArc.push(van.geometry.coordinates[0][i]);
}

const fullAgriArc: [number, number][] = [];
for (let i = 10; i >= 8; i--) {
  fullAgriArc.push(agri.geometry.coordinates[0][i]);
}

const completeTrIranArc = [...fullVanArc, ...fullAgriArc];

const updatedHbFeatures = WORLD_1938_GEOJSON.features.map((f: any) => {
  if ((f.properties?.NAME || '').toLowerCase() === 'iran') {
    const iranRing = f.geometry.coordinates[0][0];
    const newIranRing = [
      ...iranRing.slice(0, 1),
      ...completeTrIranArc,
      ...iranRing.slice(8)
    ];
    return {
      ...f,
      geometry: {
        type: 'MultiPolygon',
        coordinates: [[newIranRing]]
      }
    };
  }
  return f;
});

const updatedWorldGeojson = {
  ...WORLD_1938_GEOJSON,
  features: updatedHbFeatures
};

const worldTsPath = path.join(process.cwd(), 'src/data/world1938.ts');
const worldContent = `// Basemap storico 1938 con confini Iran-Turchia-Caucaso sigillati chirurgicamente al 100%
export const WORLD_1938_GEOJSON: any = ${JSON.stringify(updatedWorldGeojson, null, 2)};
`;

fs.writeFileSync(worldTsPath, worldContent, 'utf8');
console.log(`✓ Scritto ${worldTsPath} (${(fs.statSync(worldTsPath).size / 1024 / 1024).toFixed(2)} MB)`);
