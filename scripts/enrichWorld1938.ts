import * as fs from 'fs';
import * as d3 from 'd3';

const world1938 = JSON.parse(fs.readFileSync('scripts/world_1938.json', 'utf-8'));

console.log('=== ASSEGNAZIONE ISOLE E TERRITORI DI WORLD_1938 ===\n');

for (const f of world1938.features) {
  const p = f.properties || {};
  if (!p.NAME && !p.name) {
    const c = d3.geoCentroid(f);
    // Identify by centroid
    if (c[1] > 50 && c[1] < 62 && c[0] > -12 && c[0] < 2) {
      if (c[1] > 61.5) {
        p.NAME = 'Faroe Islands (Denmark)';
        p.SUBJECTO = 'Denmark';
      } else if (c[0] > -5 && c[0] < -4 && c[1] > 53.8 && c[1] < 54.6) {
        p.NAME = 'Isle of Man (UK)';
        p.SUBJECTO = 'United Kingdom';
      } else {
        p.NAME = 'British Isles Islands (UK)';
        p.SUBJECTO = 'United Kingdom';
      }
    } else if (c[1] > 58 && c[1] < 59.5 && c[0] > 21 && c[0] < 24) {
      p.NAME = 'Saaremaa and Hiiumaa (Estonia)';
      p.SUBJECTO = 'Estonia';
    } else if (c[1] > 59.8 && c[1] < 60.5 && c[0] > 19 && c[0] < 21) {
      p.NAME = 'Åland Islands (Finland)';
      p.SUBJECTO = 'Finland';
    } else if (c[1] < 0 && c[1] > -15 && c[0] > 150 && c[0] < 170) {
      p.NAME = 'Solomon Islands (UK)';
      p.SUBJECTO = 'United Kingdom';
    } else if (c[1] > 0 && c[1] < 25 && c[0] > 130 && c[0] < 175) {
      p.NAME = 'South Seas Mandate (Japan)';
      p.SUBJECTO = 'Empire of Japan';
    } else if (c[0] > 12 && c[0] < 15 && c[1] > 54 && c[1] < 55) {
      p.NAME = 'Rügen (Germany)';
      p.SUBJECTO = 'Germany';
    } else if (c[0] > 36 && c[0] < 48 && c[1] > 26 && c[1] < 33) {
      p.NAME = 'Saudi Arabia (Northern Borders - Al-Jawf)';
      p.SUBJECTO = 'Saudi Arabia';
    } else if (c[1] < -80) {
      p.NAME = 'Antarctica (Queen Maud Land)';
      p.SUBJECTO = 'Norway';
    } else {
      p.NAME = `Territorio Insulare [${c[0].toFixed(1)}, ${c[1].toFixed(1)}]`;
    }
  }
}

fs.writeFileSync('scripts/world_1938_enriched.json', JSON.stringify(world1938, null, 2), 'utf-8');
console.log('✓ world_1938_enriched.json salvato con successo!');
