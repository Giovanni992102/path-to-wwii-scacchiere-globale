import * as fs from 'fs';

const data = fs.readFileSync('scripts/world_1938_enriched.json', 'utf-8');
console.log(`Dimensione world_1938_enriched.json: ${(data.length / 1024).toFixed(1)} KB`);

// Create src/data/world1938.ts
const code = `// File generato: Mappa Geopolitica Globale Storica Completa (1938 Basemap - Alexandre Ourednik)
// Contiene 254 entità statali e territoriali storiche complete ad incastro senza buchi o discontinuità
export const WORLD_1938_GEOJSON: any = ${data};
`;

fs.writeFileSync('src/data/world1938.ts', code, 'utf-8');
console.log('✓ src/data/world1938.ts generato con successo!');
