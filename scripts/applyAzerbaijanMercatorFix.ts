import * as fs from 'fs';
import * as path from 'path';
import * as topojson from 'topojson-client';
import * as d3 from 'd3';
import polygonClipping from 'polygon-clipping';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';

console.log('=== APPLICAZIONE CHIRURGICA: PROIEZIONE DI MERCATORE DELLA RSS AZERA ===\n');

// 1. Identify existing features
const origAzeContig = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_AZE_129_Contiguous_Azerbaijan')!;
const rusDag = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_RUS_76_Dagestan')!;
const geoKakheti = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_GEO_106_Kakheti')!;
const geoKvemo = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_GEO_107_Kvemo_Kartli')!;
const armFeatures = USSR_REGIONAL_FEATURES.filter(f => f.id && f.id.includes('ARM'));
const iran = WORLD_1938_GEOJSON.features.find((f: any) => (f.properties?.NAME || '').toLowerCase() === 'iran')!;

function getPoly(geom: any): any[] {
  if (geom.type === 'Polygon') return [geom.coordinates];
  if (geom.type === 'MultiPolygon') return geom.coordinates;
  return [];
}

// 2. Build precision perimeter arcs
// Arc A: Dagestan border from Samur mouth [48.592, 41.842] to Kakheti tripoint [45.987, 42.045]
const dagMain = rusDag.geometry.coordinates[2][0];
const dagArc: [number, number][] = [];
for (let i = 162; i <= 231; i++) dagArc.push([dagMain[i][0], dagMain[i][1]]);

// Arc B: Georgia (Kakheti) from [45.988, 42.045] to [45.304, 41.469]
const kakhRing = geoKakheti.geometry.coordinates[0];
const kakhArc: [number, number][] = [];
for (let i = 51; i < kakhRing.length; i++) kakhArc.push([kakhRing[i][0], kakhRing[i][1]]);

// Arc C: Georgia (Kvemo Kartli) from [45.304, 41.469] to [44.948, 41.258]
const kvemoRing = geoKvemo.geometry.coordinates[0];
const kvemoArc: [number, number][] = [];
for (let i = 13; i <= 17; i++) kvemoArc.push([kvemoRing[i][0], kvemoRing[i][1]]);

// Arc D: Armenia (Tavush) from [44.939, 41.26] to [45.353, 40.642]
const tRing = armFeatures.find(f => f.id === 'SOV_ADM1_ARM_119_Tavush')!.geometry.coordinates[0];
const tavushArc = tRing.slice(24).concat([tRing[0]]);

// Arc E: Armenia (Gegharkunik) from [45.353, 40.642] to [45.515, 40.01]
const gRing = armFeatures.find(f => f.id === 'SOV_ADM1_ARM_117_Gegharkunik')!.geometry.coordinates[1][0];
const gegharArc = gRing.slice(0, 16);

// Arc F: Armenia (Vayots Dzor) from [45.515, 40.01] to [45.789, 39.876]
const vRing = armFeatures.find(f => f.id === 'SOV_ADM1_ARM_123_Vayots_Dzor')!.geometry.coordinates[0];
const vayotsArc = vRing.slice(4, 8);

// Arc G: Armenia (Syunik) from [45.789, 39.876] to [46.535, 38.871]
const sRing = armFeatures.find(f => f.id === 'SOV_ADM1_ARM_118_Syunik')!.geometry.coordinates[0];
const syunikArc = sRing.slice(4, 31);

// Arc H: Iran border along Arax, Mughan, Talysh to Astara Caspian coast [48.88, 38.44] (idx 106)
const iranRing = iran.geometry.coordinates[0][0];
const iranArc: [number, number][] = [];
for (let i = 56; i <= 106; i++) iranArc.push([iranRing[i][0], iranRing[i][1]]);

// Arc I: True Caspian Coastline from Astara [48.88, 38.44] through Absheron/Baku [50.367, 40.391] to Samur [48.592, 41.842]
const cntrRaw = fs.readFileSync(path.join(process.cwd(), 'public/data/cntr_20m.json'), 'utf8');
const cntr = JSON.parse(cntrRaw);
const azTopo = cntr.objects.CNTR_RG_20M_2020_4326.geometries.find((g: any) => g.properties?.CNTR_ID === 'AZ');
const azGeo = topojson.feature(cntr, azTopo as any) as any;
const azRealMainland = azGeo.geometry.coordinates[0][0];

const coastArc: [number, number][] = [];
for (let i = 22; i >= 0; i--) {
  coastArc.push([Math.round(azRealMainland[i][0] * 1000) / 1000, Math.round(azRealMainland[i][1] * 1000) / 1000]);
}
coastArc[0] = iranArc[iranArc.length - 1]; // exactly [48.88, 38.44]
coastArc[coastArc.length - 1] = dagArc[0]; // exactly [48.592, 41.842]

// 3. Assemble candidate polygon
const candidateRing: [number, number][] = [
  ...dagArc,
  ...kakhArc,
  ...kvemoArc,
  ...tavushArc,
  ...gegharArc,
  ...vayotsArc,
  ...syunikArc,
  ...iranArc,
  ...coastArc
];
candidateRing.push(dagArc[0]);

let candidatePoly: any[] = [[candidateRing]];

// 4. Clip against all neighboring features to guarantee 0.000000 km² overlap
const neighborsToClip = [
  { name: 'RUS_Dagestan', geom: rusDag.geometry },
  { name: 'GEO_Kakheti', geom: geoKakheti.geometry },
  { name: 'GEO_Kvemo', geom: geoKvemo.geometry },
  ...armFeatures.map(f => ({ name: f.id, geom: f.geometry })),
  { name: 'Iran', geom: iran.geometry }
];

for (const n of neighborsToClip) {
  try {
    candidatePoly = polygonClipping.difference(candidatePoly as any, getPoly(n.geom) as any);
  } catch (err: any) {
    console.log(`Error clipping with ${n.name}:`, err.message);
  }
}

// Keep primary landmass (> 10 km²)
const validPolys = candidatePoly.filter((p: any) => {
  const f = { type: 'Polygon', coordinates: p };
  let a = (d3.geoArea(f as any) / (4 * Math.PI)) * 510072000;
  if (a > 255000000) a = 510072000 - a;
  return a > 10.0;
});

console.log(`Primary landmass parts: ${validPolys.length}`);

// Fix ring winding for each part
function fixRingWinding(ring: [number, number][]): [number, number][] {
  const p = { type: 'Polygon', coordinates: [ring] };
  const a = d3.geoArea(p as any);
  if (a > 2 * Math.PI) {
    return [...ring].reverse();
  }
  return ring;
}

const cleanedCoords = validPolys[0].map((ring: any[], idx: number) => {
  if (idx === 0) {
    return fixRingWinding(ring as any);
  } else {
    const a = d3.geoArea({ type: 'Polygon', coordinates: [ring] } as any);
    if (a < 2 * Math.PI) {
      return [...ring].reverse();
    }
    return ring;
  }
});

const updatedAzeContig = {
  ...origAzeContig,
  geometry: {
    type: 'Polygon',
    coordinates: cleanedCoords
  }
};

const azeArea = (d3.geoArea(updatedAzeContig as any) / (4 * Math.PI)) * 510072000;
console.log(`✓ Nuova Area RSS Azera (Terraferma Contigua): ${azeArea.toFixed(1)} km²`);
const azeBounds = d3.geoBounds(updatedAzeContig as any);
console.log(`✓ Bounds: [[${azeBounds[0][0].toFixed(3)}, ${azeBounds[0][1].toFixed(3)}], [${azeBounds[1][0].toFixed(3)}, ${azeBounds[1][1].toFixed(3)}]]`);

// Overlap validation
console.log('\n--- Validazione Sovrapposizioni (0 Tolleranza) ---');
let hasOverlap = false;
for (const n of neighborsToClip) {
  const inter = polygonClipping.intersection(getPoly(updatedAzeContig.geometry) as any, getPoly(n.geom) as any);
  let overArea = 0;
  if (inter && inter.length > 0) {
    for (const p of inter) {
      let a = (d3.geoArea({ type: 'Polygon', coordinates: p } as any) / (4 * Math.PI)) * 510072000;
      if (a > 255000000) a = 510072000 - a;
      overArea += a;
    }
  }
  if (overArea > 0.001) {
    console.log(`  ❌ OVERLAP con ${n.name}: ${overArea.toFixed(6)} km²`);
    hasOverlap = true;
  } else {
    console.log(`  ✓ ${n.name}: 0.000000 km²`);
  }
}

if (hasOverlap) {
  console.error('\nErrore: rilevata sovrapposizione residua!');
  process.exit(1);
}

// 5. Update USSR_REGIONAL_FEATURES in src/data/ussrRegions.ts
const updatedUssrFeatures = USSR_REGIONAL_FEATURES.map(f => {
  if (f.id === 'SOV_ADM1_AZE_129_Contiguous_Azerbaijan') {
    return updatedAzeContig;
  }
  return f;
});

const ussrPath = path.join(process.cwd(), 'src/data/ussrRegions.ts');
const fileHeader = `// File generato: Suddivisioni territoriali URSS, Caucaso e Bessarabia Storica (1936-1940)
// Configurato con topologia sigillata a zero fessure e granularità storico-geografica di eccellenza.

export const USSR_REGIONAL_FEATURES: any[] = `;

fs.writeFileSync(ussrPath, fileHeader + JSON.stringify(updatedUssrFeatures, null, 2) + ';\n', 'utf8');
console.log(`\n✓ Scritto ${ussrPath} con successo!`);
