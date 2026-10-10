import * as fs from 'fs';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import * as topojson from 'topojson-client';

console.log('=== ANALISI DETTAGLIATA ANELLI INTERNI (BUCHI) E GEOMETRIE ===\n');

// 1. Check holes in Bessarabia features
const besFeatures = USSR_REGIONAL_FEATURES.filter(f => {
  const id = f.id || '';
  return id.includes('BES') || id.includes('BUDJAK') || id.includes('Transnistria');
});

console.log(`--- 1. BESSARABIA (${besFeatures.length} features) ---`);
let besHoles = 0;
for (const f of besFeatures) {
  const g = f.geometry;
  if (!g) continue;
  if (g.type === 'Polygon') {
    if (g.coordinates.length > 1) {
      console.log(`Hole found in ${f.id} (${f.properties?.HISTORICAL_NAME}): ${g.coordinates.length - 1} inner ring(s)`);
      besHoles += g.coordinates.length - 1;
    }
  } else if (g.type === 'MultiPolygon') {
    let mHoles = 0;
    for (const poly of g.coordinates) {
      if (poly.length > 1) mHoles += poly.length - 1;
    }
    if (mHoles > 0) {
      console.log(`Holes found in MultiPolygon ${f.id} (${f.properties?.HISTORICAL_NAME}): ${mHoles} inner ring(s), total polys: ${g.coordinates.length}`);
      besHoles += mHoles;
    }
  }
}
console.log(`Totale buchi interni in Bessarabia: ${besHoles}`);

// 2. Check Caucasus features
const caucFeatures = USSR_REGIONAL_FEATURES.filter(f => {
  const id = f.id || '';
  return id.includes('ARM') || id.includes('AZE') || id.includes('GEO');
});

console.log(`\n--- 2. CAUCASO (${caucFeatures.length} features) ---`);
let caucHoles = 0;
for (const f of caucFeatures) {
  const g = f.geometry;
  if (!g) continue;
  if (g.type === 'Polygon') {
    if (g.coordinates.length > 1) {
      console.log(`Hole in ${f.id} (${f.properties?.HISTORICAL_NAME}): ${g.coordinates.length - 1} inner ring(s)`);
      caucHoles += g.coordinates.length - 1;
    }
  } else if (g.type === 'MultiPolygon') {
    let mHoles = 0;
    for (const poly of g.coordinates) {
      if (poly.length > 1) mHoles += poly.length - 1;
    }
    if (mHoles > 0) {
      console.log(`Holes in MultiPolygon ${f.id} (${f.properties?.HISTORICAL_NAME}): ${mHoles} inner ring(s), total polys: ${g.coordinates.length}`);
      caucHoles += mHoles;
    }
  }
}
console.log(`Totale buchi interni in Caucaso: ${caucHoles}`);

// 3. Check Iran
console.log(`\n--- 3. IRAN in WORLD_1938_GEOJSON ---`);
const iran = WORLD_1938_GEOJSON.features.find((f: any) => (f.properties?.NAME || '').toLowerCase() === 'iran');
if (iran) {
  const g = iran.geometry;
  if (g.type === 'Polygon') {
    console.log(`Iran Polygon inner rings: ${g.coordinates.length - 1}`);
  } else if (g.type === 'MultiPolygon') {
    let iHoles = 0;
    for (const p of g.coordinates) {
      if (p.length > 1) iHoles += p.length - 1;
    }
    console.log(`Iran MultiPolygon parts: ${g.coordinates.length}, inner rings: ${iHoles}`);
  }
}

// 4. Check whether Gagauzia or other entities have weird multipolygons
console.log(`\n--- 4. DETTAGLIO GAGAUZIA E DISTRETTI BES / CAUCASO ---`);
const gagauzia = besFeatures.find(f => f.id.includes('Gagauzia'));
if (gagauzia) {
  console.log(`Gagauzia type: ${gagauzia.geometry.type}, parts: ${gagauzia.geometry.type === 'MultiPolygon' ? gagauzia.geometry.coordinates.length : 1}`);
}
const transnistria = besFeatures.find(f => f.id.includes('Transnistria'));
if (transnistria) {
  console.log(`Transnistria type: ${transnistria.geometry.type}, parts: ${transnistria.geometry.type === 'MultiPolygon' ? transnistria.geometry.coordinates.length : 1}`);
}
