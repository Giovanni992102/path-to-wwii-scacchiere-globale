import fetch from 'node-fetch';
import * as topojson from 'topojson-client';
import * as fs from 'fs';
import * as d3 from 'd3';

async function exploreSourceDatasets() {
  console.log('=== RICERCA DATASET AD ALTA RISOLUZIONE (GADM / NUTS / NATURAL EARTH) ===\n');

  // 1. Fetch NUTS-3
  console.log('Scaricamento NUTS-3...');
  const topoNuts: any = await fetch('https://gisco-services.ec.europa.eu/distribution/v2/nuts/topojson/NUTS_RG_10M_2021_4326_LEVL_3.json').then(r => r.json());
  const nutsK = Object.keys(topoNuts.objects)[0];
  const nuts = (topojson.feature(topoNuts, topoNuts.objects[nutsK]) as any).features;
  console.log(`NUTS-3 features: ${nuts.length}`);

  // 2. Fetch CNTR
  console.log('Scaricamento CNTR...');
  const topoWorld: any = await fetch('https://gisco-services.ec.europa.eu/distribution/v2/countries/topojson/CNTR_RG_20M_2020_4326.json').then(r => r.json());
  const worldK = Object.keys(topoWorld.objects)[0];
  const world = (topojson.feature(topoWorld, topoWorld.objects[worldK]) as any).features;
  console.log(`CNTR features: ${world.length}`);

  // 3. Inspect Polish Pomeranian NUTS-3 features
  const pom = nuts.filter((f: any) => f.properties?.NUTS_ID?.startsWith('PL63') || f.properties?.NUTS_ID?.startsWith('PL42') || f.properties?.NUTS_ID?.startsWith('PL62'));
  console.log('\n--- NUTS-3 Polonia Settentrionale / Pomerania ---');
  pom.forEach((f: any) => console.log(`- ${f.properties?.NUTS_ID}: ${f.properties?.NUTS_NAME} (Vertici: ${countVertices(f)})`));

  // 4. Inspect Kosovo in world or Natural Earth
  console.log('\n--- Ricerca Geometria Kosovo ad Alta Risoluzione ---');
  // Check Natural Earth 10m admin 0 / 1
  try {
    const neKosovoUrl = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson';
    console.log('Verifica Natural Earth 10m...');
  } catch (e) {
    console.log('NE fetch note:', e);
  }
}

function countVertices(f: any): number {
  if (!f.geometry) return 0;
  const polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates];
  let count = 0;
  for (const p of polys) {
    for (const r of p) {
      count += r.length;
    }
  }
  return count;
}

exploreSourceDatasets().catch(console.error);
