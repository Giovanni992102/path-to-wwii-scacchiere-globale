import * as fs from 'fs';
import * as d3 from 'd3';

const world1938 = JSON.parse(fs.readFileSync('scripts/world_1938.json', 'utf-8'));

console.log('=== ANALISI COMPLETA DI WORLD_1938.GEOJSON ===\n');
console.log(`Numero totale di feature: ${world1938.features.length}`);

// Group and list all unique country names
const names: { name: string; type: string; vertices: number; centroid: [number, number] }[] = [];

for (const f of world1938.features) {
  const p = f.properties || {};
  const name = p.NAME || p.name || p.ADMIN || 'Sconosciuto';
  const polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates];
  let v = 0;
  for (const poly of polys) {
    for (const ring of poly) v += ring.length;
  }
  const c = d3.geoCentroid(f);
  names.push({ name, type: f.geometry.type, vertices: v, centroid: [Number(c[0].toFixed(2)), Number(c[1].toFixed(2))] });
}

console.log(`Trovati ${names.length} stati/territori nel basemap storico:`);
names.sort((a, b) => a.name.localeCompare(b.name));
names.forEach((n, i) => {
  console.log(`${(i + 1).toString().padStart(3)}. ${n.name.padEnd(45)} | Vertici: ${n.vertices.toString().padStart(4)} | Centro: [${n.centroid[0]}, ${n.centroid[1]}]`);
});
