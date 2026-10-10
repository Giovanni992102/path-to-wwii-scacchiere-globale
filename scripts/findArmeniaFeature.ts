import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { PRECISION_HISTORICAL_FEATURES } from '../src/data/historicalBorders';
import * as d3 from 'd3';

console.log('Searching for "Armenia" feature with ~163k km²...');

// 1. In WORLD_1938_GEOJSON
console.log('--- In WORLD_1938_GEOJSON ---');
for (const f of WORLD_1938_GEOJSON.features) {
  const name = (f.properties?.NAME || '').toLowerCase();
  if (name.includes('armenia')) {
    const area = (d3.geoArea(f as any) / (4 * Math.PI)) * 510072000;
    const cent = d3.geoCentroid(f as any);
    console.log(`Found in world1938: ID=${f.id}, NAME="${f.properties?.NAME}", Area=${Math.round(area)} km², Centroid=[${cent[0].toFixed(2)}, ${cent[1].toFixed(2)}]`);
    console.log('Properties:', f.properties);
  }
}

// 2. In USSR_REGIONAL_FEATURES
console.log('--- In USSR_REGIONAL_FEATURES ---');
for (const f of USSR_REGIONAL_FEATURES) {
  const name = (f.properties?.NAME || f.properties?.NUTS_NAME || f.id || '').toLowerCase();
  if (name === 'armenia' || f.id === 'ARM' || f.properties?.NAME === 'Armenia') {
    const area = (d3.geoArea(f as any) / (4 * Math.PI)) * 510072000;
    const cent = d3.geoCentroid(f as any);
    console.log(`Found in ussrRegions: ID=${f.id}, NAME="${f.properties?.NUTS_NAME}", Area=${Math.round(area)} km², Centroid=[${cent[0].toFixed(2)}, ${cent[1].toFixed(2)}]`);
  }
}

// 3. In PRECISION_HISTORICAL_FEATURES
console.log('--- In PRECISION_HISTORICAL_FEATURES ---');
for (const f of PRECISION_HISTORICAL_FEATURES) {
  const name = (f.properties?.NAME || f.properties?.NUTS_NAME || f.id || '').toLowerCase();
  if (name.includes('armenia')) {
    const area = (d3.geoArea(f as any) / (4 * Math.PI)) * 510072000;
    const cent = d3.geoCentroid(f as any);
    console.log(`Found in precisionHistoricalGeo: ID=${f.id}, NAME="${f.properties?.NAME}", Area=${Math.round(area)} km², Centroid=[${cent[0].toFixed(2)}, ${cent[1].toFixed(2)}]`);
  }
}
