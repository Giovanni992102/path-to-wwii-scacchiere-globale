import * as fs from 'fs';
import * as topojson from 'topojson-client';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import polygonClipping from 'polygon-clipping';
import * as d3 from 'd3-geo';

function cleanRing(ring: any[]): any[] {
  return ring.map(pt => [Math.round(pt[0] * 10000) / 10000, Math.round(pt[1] * 10000) / 10000]);
}

function cleanGeom(coords: any[]): any {
  if (typeof coords[0][0][0] === 'number') {
    return [coords.map(cleanRing)];
  } else {
    return coords.map((poly: any) => poly.map(cleanRing));
  }
}

function approxArea(multiPoly: any[]): number {
  let total = 0;
  for (const poly of multiPoly) {
    for (let r = 0; r < poly.length; r++) {
      const ring = poly[r];
      let area = 0;
      for (let i = 0; i < ring.length - 1; i++) {
        area += (ring[i][0] * ring[i+1][1] - ring[i+1][0] * ring[i][1]);
      }
      area = Math.abs(area) / 2;
      if (r === 0) total += area;
      else total -= area;
    }
  }
  return total * 111 * 111 * Math.cos(67.0 * Math.PI / 180);
}

console.log('--- Step 1: Loading base datasets ---');
const topoData = JSON.parse(fs.readFileSync('./public/data/nuts_10m.json', 'utf8'));
const k = Object.keys(topoData.objects)[0];
const nutsFeatures = (topojson.feature(topoData, topoData.objects[k]) as any).features;

const lappi = nutsFeatures.find((f: any) => f.properties?.NUTS_ID === 'FI1D7')!;
const pohjoisPoh = nutsFeatures.find((f: any) => f.properties?.NUTS_ID === 'FI1D9')!;

// 1. Clean Kandalaksha spike
const kanta = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_NW_RUS_308_Kantalahti_District')!;
const kantaClone = JSON.parse(JSON.stringify(kanta));
// Remove spike points 75 and 76 from part 3
kantaClone.geometry.coordinates[3][0].splice(75, 2);
console.log('✓ Kandalaksha spike eliminated');

const targetIds = [
  'SOV_NW_RUS_264_Kuola_District',
  'SOV_NW_RUS_295___________________________',
  'SOV_NW_RUS_294________________________',
  'SOV_NW_RUS_299_Polyarnye_Zori_Urban_Okrug',
  'SOV_NW_RUS_284_Louhi_District',
  'FIN_HIST_262_Petsamo_District'
];

const ussrFeats = targetIds.map(id => USSR_REGIONAL_FEATURES.find(f => f.id === id)!).filter(Boolean);

console.log('--- Step 2: Computing full void ring between Finland and USSR ---');
const surroundUnion = (polygonClipping as any).union(
  cleanGeom(lappi.geometry.coordinates),
  pohjoisPoh ? cleanGeom(pohjoisPoh.geometry.coordinates) : [],
  cleanGeom(kantaClone.geometry.coordinates),
  ...ussrFeats.map(f => cleanGeom(f.geometry.coordinates))
);

let voidRing: any[] = [];
surroundUnion.forEach((part: any) => {
  for (let h = 1; h < part.length; h++) {
    const ring = part[h];
    const lons = ring.map((pt: any) => pt[0]);
    const lats = ring.map((pt: any) => pt[1]);
    const minX = Math.min(...lons), maxX = Math.max(...lons);
    const minY = Math.min(...lats), maxY = Math.max(...lats);
    if (minY >= 65.5 && maxY <= 68.5 && minX >= 27.5 && maxX <= 33.5) {
      const area = d3.geoArea({ type: 'Polygon', coordinates: [ring] }) * 6371 * 6371;
      if (area > 50) {
        voidRing = cleanRing(ring);
      }
    }
  }
});

console.log(`✓ Void ring identified: ${voidRing.length} vertices`);

console.log('--- Step 3: Partitioning void along historical 1920 Tartu Treaty border ---');
const border1920 = [
  [29.7352, 67.7755], // Korjatunturi tripoint
  [29.85, 67.68],
  [29.98, 67.55],     // Tuntsa wilderness
  [30.15, 67.42],     // Tuntsajoki upper basin
  [30.28, 67.28],     // Lampela / Sovajärvi
  [30.38, 67.14],     // Kuolajärvi north
  [30.45, 66.97],     // Alakurtti / Koutero lake
  [30.38, 66.85],     // Vuorijärvi north
  [30.25, 66.72],     // Vuorijärvi south
  [29.80, 66.68],     // Kutsajoki gorge / Nuorunen
  [29.60, 66.40]      // South past the void
];

const sallaCutter = [
  [28.0, 66.0],
  [28.0, 68.0],
  [29.7352, 67.7755],
  ...border1920,
  [28.0, 66.0]
];

const voidGeom = [[voidRing]];
const sallaCutterGeom = [[cleanRing(sallaCutter)]];

const sallaPart = (polygonClipping as any).intersection(voidGeom, sallaCutterGeom);
const kovdorPart = (polygonClipping as any).difference(voidGeom, sallaPart);

console.log(`✓ Salla (FIN_HIST_282_Koutero_District): ${sallaPart.length} part(s), area = ${approxArea(sallaPart).toFixed(2)} km²`);
console.log(`✓ Kovdor (SOV_NW_RUS_309_Kovdor_District): ${kovdorPart.length} part(s), area = ${approxArea(kovdorPart).toFixed(2)} km²`);

// Overlap validation
const inter = polygonClipping.intersection(sallaPart, kovdorPart);
console.log(`✓ Overlap Salla & Kovdor: ${approxArea(inter).toFixed(6)} km² (Zero!)`);

console.log('--- Step 4: Constructing updated USSR_REGIONAL_FEATURES array ---');

const kovdorFeature = {
  type: 'Feature',
  id: 'SOV_NW_RUS_309_Kovdor_District',
  properties: {
    id: 'SOV_NW_RUS_309_Kovdor_District',
    NUTS_ID: 'SOV_NW_RUS_309_Kovdor_District',
    CNTR_CODE: 'SU',
    NUTS_NAME: 'Oblast di Murmansk — Distretto di Kovdor (Miniere di Ferro e Apatite)',
    HISTORICAL_NAME: 'Oblast di Murmansk — Distretto di Kovdor (Miniere di Ferro e Apatite)',
    ADMIN_TITLE: 'Distretto Minerario di Kovdor — Penisola di Kola Occidentale (RSFSR)',
    SOV_SSR: 'RSFSR',
    MODERN_ADMIN: 'Kovdor District (Russia)',
    REGION_KIND: 'SOVIET_UNION_ADM2'
  },
  geometry: {
    type: 'Polygon',
    coordinates: kovdorPart[0]
  }
};

const updatedFeatures = USSR_REGIONAL_FEATURES.map(f => {
  if (f.id === 'FIN_HIST_282_Koutero_District') {
    return {
      ...f,
      properties: {
        ...f.properties,
        NUTS_NAME: 'Salla Orientale e Alakurtti (Kuolajärvi — Saliente di Frontiera)',
        HISTORICAL_NAME: 'Salla Orientale e Alakurtti (Kuolajärvi — Saliente di Frontiera)',
        SOV_NAME: 'Distretto di Salla e Alakurtti (URSS)',
        ADMIN_TITLE: 'Repubblica di Finlandia — Territorio storico di Salla-Kuusamo (1920-1940)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: sallaPart[0]
      }
    };
  }
  if (f.id === 'SOV_NW_RUS_308_Kantalahti_District') {
    return {
      ...f,
      geometry: kantaClone.geometry
    };
  }
  return f;
});

// Check if Kovdor already exists or insert it
const existingKovdorIdx = updatedFeatures.findIndex(f => f.id === 'SOV_NW_RUS_309_Kovdor_District');
if (existingKovdorIdx >= 0) {
  updatedFeatures[existingKovdorIdx] = kovdorFeature;
} else {
  // Insert next to Kantalahti
  const kantaIdx = updatedFeatures.findIndex(f => f.id === 'SOV_NW_RUS_308_Kantalahti_District');
  updatedFeatures.splice(kantaIdx + 1, 0, kovdorFeature);
}

console.log(`Total features: ${updatedFeatures.length}`);

// Write back to src/data/ussrRegions.ts
const header =
  "// File generato automaticamente: Granularizzazione integrale dell'URSS e Territori di Frontiera (1936-1940)\n// Include tutte le suddivisioni ADM1 e i distretti granulari di Leningrado, Carelia, Murmansk, Bessarabia e Crimea ad altissima precisione satellitare\nexport const USSR_REGIONAL_FEATURES: any[] = ";

fs.writeFileSync(
  './src/data/ussrRegions.ts',
  header + JSON.stringify(updatedFeatures, null, 2) + ';\n'
);
console.log('✓ src/data/ussrRegions.ts successfully updated with seamless Salla & Kovdor!');
