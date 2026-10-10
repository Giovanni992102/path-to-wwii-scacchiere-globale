import * as fs from 'fs';
import * as path from 'path';
import * as topojson from 'topojson-client';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import polygonClipping from 'polygon-clipping';
import * as d3 from 'd3';

function toMultiPoly(geom: any): polygonClipping.Polygon[] {
  if (geom.type === 'Polygon') return [geom.coordinates];
  if (geom.type === 'MultiPolygon') return geom.coordinates;
  return [];
}

async function verify() {
  console.log('=== VERIFICA GEOMETRICA E GEOSTORICA FRONTIERA IRAQ - TURCHIA ===');
  const nutsPath = path.resolve('public/data/nuts_10m.json');
  const topoNuts = JSON.parse(fs.readFileSync(nutsPath, 'utf8'));
  const nutsK = Object.keys(topoNuts.objects)[0];
  const nuts = (topojson.feature(topoNuts, topoNuts.objects[nutsK]) as any).features;

  const meso = WORLD_1938_GEOJSON.features.find((f: any) => f.properties?.NAME === 'Mesopotamia (GB)');
  const syria = WORLD_1938_GEOJSON.features.find((f: any) => f.properties?.NAME === 'Syria (France)');
  const iran = WORLD_1938_GEOJSON.features.find((f: any) => f.properties?.NAME === 'Iran');

  const trNuts = nuts.filter((p: any) => (p.properties?.NUTS_ID || p.id || '').startsWith('TR'));
  let allTurkeyUnion: any = [];
  for (const p of trNuts) {
    allTurkeyUnion = polygonClipping.union(allTurkeyUnion, toMultiPoly(p.geometry));
  }

  const syriaPoly = toMultiPoly(syria.geometry);
  const iranPoly = toMultiPoly(iran.geometry);
  const mesoPoly = toMultiPoly(meso.geometry);

  // 1. Overlaps
  const overlapTr = polygonClipping.intersection(mesoPoly, allTurkeyUnion);
  const overlapSyria = polygonClipping.intersection(mesoPoly, syriaPoly);
  const overlapIran = polygonClipping.intersection(mesoPoly, iranPoly);

  const northBox: polygonClipping.Polygon = [[
    [44.0, 36.5],
    [45.5, 36.5],
    [45.5, 37.5],
    [44.0, 37.5],
    [44.0, 36.5]
  ]];
  const northIranOverlap = polygonClipping.intersection(overlapIran, [northBox]);

  console.log(`1. Overlap Iraq - Turchia: ${overlapTr.length} poligoni (atteso: 0)`);
  console.log(`2. Overlap Iraq - Siria: ${overlapSyria.length} poligoni (atteso: 0)`);
  console.log(`3. Overlap Iraq - Iran (settore nord frontiera): ${northIranOverlap.length} poligoni (atteso: 0)`);

  // 2. Voids in the border focus box
  const borderFocusBox: polygonClipping.Polygon = [[
    [41.5, 36.5],
    [45.2, 36.5],
    [45.2, 37.6],
    [41.5, 37.6],
    [41.5, 36.5]
  ]];

  let occupied: any = polygonClipping.union([], allTurkeyUnion);
  occupied = polygonClipping.union(occupied, syriaPoly);
  occupied = polygonClipping.union(occupied, iranPoly);
  occupied = polygonClipping.union(occupied, mesoPoly);

  const remainingVoids = polygonClipping.difference([borderFocusBox], occupied);
  console.log(`4. Buchi neri residui tra Iraq e Turchia: ${remainingVoids.length} (atteso: 0)`);

  // 3. Proiezione Mercatore & Winding Order
  const area = d3.geoArea(meso);
  console.log(`5. Area sferica D3 Mesopotamia: ${area.toFixed(6)} steradianti (< 2*PI: ${area < 2 * Math.PI})`);

  if (overlapTr.length === 0 && overlapSyria.length === 0 && northIranOverlap.length === 0 && remainingVoids.length === 0 && area < 2 * Math.PI) {
    console.log('\n✓ TUTTE LE VERIFICHE SUPERATE CON SUCCESSO!');
  } else {
    throw new Error('Verifiche fallite!');
  }
}

verify().catch(console.error);
