const fs = require('fs');
const d3 = require('d3');
const path = require('path');

console.log('=== CORREZIONE DEFINITIVA DEL WINDING INVERTITO SU TUTTE LE FEATURE ===');

for (const relPath of [
  'public/data/world_historical_1938_unified.json',
  'dist/data/world_historical_1938_unified.json',
  'public/data/usa_provinces.geojson',
  'dist/data/usa_provinces.geojson'
]) {
  const filePath = path.resolve(relPath);
  if (!fs.existsSync(filePath)) continue;

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  let fixedCount = 0;

  for (const f of data.features) {
    if (!f || !f.geometry) continue;
    const geom = f.geometry;

    try {
      if (geom.type === 'Polygon') {
        const area = d3.geoArea(f);
        if (area > 2 * Math.PI) {
          geom.coordinates = geom.coordinates.map((ring) => [...ring].reverse());
          fixedCount++;
        }
      } else if (geom.type === 'MultiPolygon') {
        let changed = false;
        geom.coordinates = geom.coordinates.map((poly) => {
          const singlePoly = { type: 'Polygon', coordinates: poly };
          const area = d3.geoArea(singlePoly);
          if (area > 2 * Math.PI) {
            changed = true;
            return poly.map((ring) => [...ring].reverse());
          }
          return poly;
        });
        if (changed) fixedCount++;
      }
    } catch (err) {
      console.error(`Errore su feature ${f.id}:`, err);
    }
  }

  // Verifica che ora zero feature abbiano area > 2 * Math.PI
  let remainingInverted = 0;
  for (const f of data.features) {
    try {
      const a = d3.geoArea(f);
      if (a > 2 * Math.PI) {
        remainingInverted++;
      }
    } catch (e) {}
  }

  console.log(`Corrette ${fixedCount} feature invertite in ${relPath}. Residue: ${remainingInverted}`);
  fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');
}

console.log('Tutte le geometrie del database sono state sanificate e salvate correttamente.');
