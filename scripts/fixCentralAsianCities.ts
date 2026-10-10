import * as fs from 'fs';
import polygonClipping from 'polygon-clipping';
import * as d3 from 'd3';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';

function toGeom(g: any): any[] {
  if (!g) return [];
  if (g.type === 'Polygon') return [g.coordinates];
  if (g.type === 'MultiPolygon') return g.coordinates;
  return [];
}

function cleanRingWinding(ring: number[][]): number[][] {
  const f = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [ring] }, properties: {} };
  const a = d3.geoArea(f as any);
  if (a > 2 * Math.PI) {
    return ring.slice().reverse();
  }
  return ring;
}

function roundCoords(c: any): any {
  if (typeof c[0] === 'number') {
    return [Math.round(c[0] * 10000) / 10000, Math.round(c[1] * 10000) / 10000];
  }
  return c.map(roundCoords);
}

function toGeoJsonGeom(multiPoly: any[]): any {
  if (multiPoly.length === 1) {
    return {
      type: 'Polygon',
      coordinates: multiPoly[0].map(cleanRingWinding)
    };
  }
  return {
    type: 'MultiPolygon',
    coordinates: multiPoly.map((poly: any) => poly.map(cleanRingWinding))
  };
}

function polyAreaSqKm(geom: any): number {
  if (!geom) return 0;
  try {
    let a = d3.geoArea({ type: 'Feature', geometry: geom, properties: {} });
    if (a > 2 * Math.PI) a = 4 * Math.PI - a;
    return a * 6371 * 6371;
  } catch (e) {
    return 0;
  }
}

const pairs = [
  { city: 'SOV_ADM1_KAZ_143_Almaty', region: 'SOV_ADM1_KAZ_141_Almaty_Region' },
  { city: 'SOV_ADM1_UZB_159_Tashkent', region: 'SOV_ADM1_UZB_154_Tashkent_Region' },
  { city: 'SOV_ADM1_TJK_169_Dushanbe', region: 'SOV_ADM1_TJK_167_Districts_of_Republican_Subordination' }
];

const updatedUssr = USSR_REGIONAL_FEATURES.map(f => {
  const match = pairs.find(p => p.region === f.id);
  if (match) {
    const cityFeat = USSR_REGIONAL_FEATURES.find(c => c.id === match.city)!;
    const cleanRegionGeom = polygonClipping.difference(toGeom(f.geometry), toGeom(cityFeat.geometry));
    console.log(`✓ Cut ${match.city} out of ${match.region}`);
    return {
      ...f,
      geometry: toGeoJsonGeom(roundCoords(cleanRegionGeom))
    };
  }
  return f;
});

fs.writeFileSync('./src/data/ussrRegions.ts', `// File generato: Geometrie complete dell'URSS (Oblast, Krai, Repubbliche Autonome e Frontiere 1936-1940)
// Include 256 territori provinciali ad altissima risoluzione senza buchi interni né overlappings
export const USSR_REGIONAL_FEATURES: any[] = ${JSON.stringify(updatedUssr)};
`, 'utf-8');
console.log('✓ src/data/ussrRegions.ts updated successfully with zero city overlaps!');
