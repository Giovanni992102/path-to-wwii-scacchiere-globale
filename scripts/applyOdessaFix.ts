import * as fs from 'fs';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import polygonClipping from 'polygon-clipping';
import * as d3 from 'd3';

console.log('=== APPLICAZIONE DEFINITIVA FIX TOPOLOGICO ODESSA E TRANSNISTRIA ===\n');

function cleanRing(ring: number[][]): number[][] {
  let r = ring.map(pt => [
    Math.round(Number(pt[0]) * 10000) / 10000,
    Math.round(Number(pt[1]) * 10000) / 10000
  ]);
  if (r[0][0] !== r[r.length - 1][0] || r[0][1] !== r[r.length - 1][1]) {
    r.push([r[0][0], r[0][1]]);
  }
  const f = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [r] } };
  const a = d3.geoArea(f as any);
  if (a > 2 * Math.PI) {
    r = r.slice().reverse();
  }
  return r;
}

function cleanGeom(coords: any): any {
  if (typeof coords[0][0] === 'number') {
    return cleanRing(coords);
  }
  return coords.map(cleanGeom);
}

function toGeom(f: any): polygonClipping.Geom {
  return cleanGeom(f.geometry.coordinates);
}

const trueOdessaIds = [
  'SOV_ADM1_UKR_178_Savran', 'SOV_ADM1_UKR_179_Balta', 'SOV_ADM1_UKR_180_Kodyma',
  'SOV_ADM1_UKR_181_Liubashhivka', 'SOV_ADM1_UKR_182_Podilsk', 'SOV_ADM1_UKR_183_Ananiv',
  'SOV_ADM1_UKR_184_Okny', 'SOV_ADM1_UKR_185_Zakharivka', 'SOV_ADM1_UKR_186_Mykolaivka',
  'SOV_ADM1_UKR_187_Shyriaieve', 'SOV_ADM1_UKR_188_Berezivka', 'SOV_ADM1_UKR_189_Velyks_Mykhailivka',
  'SOV_ADM1_UKR_190_Ivanivka', 'SOV_ADM1_UKR_191_Lyman', 'SOV_ADM1_UKR_192_Rozdilna',
  'SOV_ADM1_UKR_193_Biliaivka', 'SOV_ADM1_UKR_194_Ovidiopol', 'SOV_ADM1_UKR_195_Odessa_City'
];

const odessaFeatures = USSR_REGIONAL_FEATURES.filter((f: any) => trueOdessaIds.includes(f.id));
const transnistria = USSR_REGIONAL_FEATURES.find((f: any) => f.id === 'SOV_MASSR_310_Transnistria')!;
const vinnytsia = USSR_REGIONAL_FEATURES.find((f: any) => f.id === 'SOV_ADM1_UKR_92_Vinnytsia_Oblast')!;
const kirovohrad = USSR_REGIONAL_FEATURES.find((f: any) => f.id === 'SOV_ADM1_UKR_97_Kirovohrad_Oblast')!;
const mykolaiv = USSR_REGIONAL_FEATURES.find((f: any) => f.id === 'SOV_ADM1_UKR_90_Mykolaiv_Oblast')!;
const bessarabiaJude = USSR_REGIONAL_FEATURES.filter((f: any) => f.id.startsWith('ROM_BES_JUD_'));

const allCandidateFeatures = [transnistria, ...odessaFeatures, vinnytsia, kirovohrad, mykolaiv];
const featureGeoms: Map<string, any> = new Map();
allCandidateFeatures.forEach(f => featureGeoms.set(f.id, toGeom(f)));

// Subtract Odessa City from Ovidiopol and Biliaivka
const cityGeom = featureGeoms.get('SOV_ADM1_UKR_195_Odessa_City')!;
featureGeoms.set('SOV_ADM1_UKR_194_Ovidiopol', (polygonClipping as any).difference(featureGeoms.get('SOV_ADM1_UKR_194_Ovidiopol')!, cityGeom));
featureGeoms.set('SOV_ADM1_UKR_193_Biliaivka', (polygonClipping as any).difference(featureGeoms.get('SOV_ADM1_UKR_193_Biliaivka')!, cityGeom));

const besUnion = (polygonClipping as any).union(...bessarabiaJude.map(toGeom));
const grandUnion = (polygonClipping as any).union(besUnion, ...Array.from(featureGeoms.values()));

const holesToAbsorb: Array<{ ring: any; area: number; bbox: number[] }> = [];
grandUnion.forEach((part: any) => {
  for (let h = 1; h < part.length; h++) {
    const ring = part[h];
    const lons = ring.map((pt: any) => pt[0]);
    const lats = ring.map((pt: any) => pt[1]);
    const minX = Math.min(...lons), maxX = Math.max(...lons);
    const minY = Math.min(...lats), maxY = Math.max(...lats);
    if (maxX >= 28.3 && minX <= 31.5 && maxY >= 45.8 && minY <= 48.6) {
      const area = d3.geoArea({ type: 'Polygon', coordinates: [ring] }) * 6371 * 6371;
      let holePolyCoords = cleanRing(ring);
      holesToAbsorb.push({ ring: holePolyCoords, area, bbox: [minX, minY, maxX, maxY] });
    }
  }
});

console.log(`Buchi da assorbire: ${holesToAbsorb.length}`);

const holeMap: Map<string, any[]> = new Map();
allCandidateFeatures.forEach(f => holeMap.set(f.id, []));

holesToAbsorb.forEach((h) => {
  // Northern large gap > 300 km2
  if (h.area > 300 && h.bbox[1] > 47.9) {
    const holeGeom = [[cleanRing(h.ring)]];

    // Sector 1: West of 28.95 -> Transnistria
    const boxTrans = [[[ [28.0, 47.8], [28.95, 47.8], [28.95, 48.5], [28.0, 48.5], [28.0, 47.8] ]]];
    const partTrans = (polygonClipping as any).intersection(holeGeom, boxTrans);
    if (partTrans.length > 0) partTrans.forEach((poly: any) => holeMap.get('SOV_MASSR_310_Transnistria')!.push(cleanRing(poly[0])));

    // Sector 2: 28.95 to 29.35 -> Kodyma
    const boxKodyma = [[[ [28.95, 47.8], [29.35, 47.8], [29.35, 48.5], [28.95, 48.5], [28.95, 47.8] ]]];
    const partKodyma = (polygonClipping as any).intersection(holeGeom, boxKodyma);
    if (partKodyma.length > 0) partKodyma.forEach((poly: any) => holeMap.get('SOV_ADM1_UKR_180_Kodyma')!.push(cleanRing(poly[0])));

    // Sector 3: 29.35 to 29.85 -> Balta
    const boxBalta = [[[ [29.35, 47.8], [29.85, 47.8], [29.85, 48.5], [29.35, 48.5], [29.35, 47.8] ]]];
    const partBalta = (polygonClipping as any).intersection(holeGeom, boxBalta);
    if (partBalta.length > 0) partBalta.forEach((poly: any) => holeMap.get('SOV_ADM1_UKR_179_Balta')!.push(cleanRing(poly[0])));

    // Sector 4: East of 29.85 -> Savran
    const boxSavran = [[[ [29.85, 47.8], [30.60, 47.8], [30.60, 48.5], [29.85, 48.5], [29.85, 47.8] ]]];
    const partSavran = (polygonClipping as any).intersection(holeGeom, boxSavran);
    if (partSavran.length > 0) partSavran.forEach((poly: any) => holeMap.get('SOV_ADM1_UKR_178_Savran')!.push(cleanRing(poly[0])));

    return;
  }

  // Vinnytsia / Kirovohrad north-east seam
  if (h.bbox[1] > 48.2 && h.bbox[0] > 29.7) {
    holeMap.get('SOV_ADM1_UKR_92_Vinnytsia_Oblast')!.push(h.ring);
    return;
  }

  // Northwest seam at [28.3 .. 28.5]
  if (h.bbox[2] < 28.5) {
    holeMap.get('SOV_ADM1_UKR_92_Vinnytsia_Oblast')!.push(h.ring);
    return;
  }

  // General hole
  const holePts = h.ring;
  let bestId = '';
  let maxSharedPts = -1;

  for (const [id, geom] of featureGeoms.entries()) {
    let sharedCount = 0;
    function checkRing(r: any) {
      for (const pt of r) {
        for (const hpt of holePts) {
          const dx = pt[0] - hpt[0], dy = pt[1] - hpt[1];
          if (dx * dx + dy * dy < 0.0001) sharedCount++;
        }
      }
    }
    geom.forEach((poly: any) => {
      if (typeof poly[0][0] === 'number') {
        checkRing(poly);
      } else {
        poly.forEach((r: any) => checkRing(r));
      }
    });
    if (sharedCount > maxSharedPts) {
      maxSharedPts = sharedCount;
      bestId = id;
    }
  }

  holeMap.get(bestId)!.push(h.ring);
});

// Union holes into recipients
console.log('Unione buchi nei poligoni riceventi...');
for (const [id, rings] of holeMap.entries()) {
  if (rings.length === 0) continue;
  const currentGeom = featureGeoms.get(id)!;
  const holeGeoms = rings.map(r => [[cleanRing(r)]]);
  try {
    const updated = (polygonClipping as any).union(currentGeom, ...holeGeoms);
    featureGeoms.set(id, cleanGeom(updated));
  } catch (e: any) {
    console.error(`Errore unione in ${id}:`, e.message);
  }
}

// Rebuild clean solid geometry objects
const finalGeometries: Record<string, any> = {};

for (const f of allCandidateFeatures) {
  const merged = featureGeoms.get(f.id)!;

  if (f.id === 'SOV_ADM1_UKR_195_Odessa_City') {
    const validParts = merged.filter((poly: any) => {
      const outer = cleanRing(poly[0]);
      const a = d3.geoArea({ type: 'Polygon', coordinates: [outer] });
      const km2 = (a / (4 * Math.PI)) * 510072000;
      return km2 >= 0.1;
    });
    finalGeometries[f.id] = {
      type: 'MultiPolygon',
      coordinates: validParts.map((p: any) => [cleanRing(p[0])])
    };
    console.log(`✓ ${f.id}: MultiPolygon (${validParts.length} parti)`);
    continue;
  }

  // Normalize merged to array of Polygons
  const polyList = (typeof merged[0][0][0] === 'number') ? [merged] : merged;

  let bestPoly: number[][] = [];
  let maxArea = -1;

  for (const poly of polyList) {
    const ring = poly[0];
    if (!ring || ring.length < 3) continue;
    const outer = cleanRing(ring);
    const a = d3.geoArea({ type: 'Polygon', coordinates: [outer] });
    const km2 = (a / (4 * Math.PI)) * 510072000;
    if (km2 > maxArea) {
      maxArea = km2;
      bestPoly = outer;
    }
  }

  if (bestPoly.length < 4) {
    console.warn(`Warning: empty polygon for ${f.id}`);
    continue;
  }

  finalGeometries[f.id] = {
    type: 'Polygon',
    coordinates: [bestPoly]
  };
  console.log(`✓ ${f.id}: Polygon solido (${maxArea.toFixed(1)} km2)`);
}

// Update USSR_REGIONAL_FEATURES in memory
console.log('\nAggiornamento dataset USSR_REGIONAL_FEATURES...');
const toRemoveIds = new Set(['SOV_ADM1_UKR_177_Ivanivka', 'SOV_ADM1_UKR_204_Lyman']);

const updatedUssrFeatures = USSR_REGIONAL_FEATURES
  .filter(f => !toRemoveIds.has(f.id))
  .map(f => {
    if (finalGeometries[f.id]) {
      return {
        ...f,
        geometry: finalGeometries[f.id]
      };
    }
    return f;
  });

console.log(`Features prima: ${USSR_REGIONAL_FEATURES.length}, dopo: ${updatedUssrFeatures.length}`);

// Write to ussrRegions.ts
const header =
  "// File generato automaticamente: Granularizzazione integrale dell'URSS e Territori di Frontiera (1936-1940)\n// Include tutte le suddivisioni ADM1 e i distretti granulari di Leningrado, Carelia, Murmansk, Bessarabia e Crimea ad altissima precisione satellitare\nexport const USSR_REGIONAL_FEATURES: any[] = ";

fs.writeFileSync(
  './src/data/ussrRegions.ts',
  header + JSON.stringify(updatedUssrFeatures, null, 2) + ';\n'
);

console.log('\n✓ src/data/ussrRegions.ts aggiornato con successo!');
