import { CHINA_REGIONAL_FEATURES } from '../src/data/chinaRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import polygonClipping from 'polygon-clipping';
import * as d3 from 'd3';

function toGeom(g: any): any[] {
  if (!g) return [];
  if (g.type === 'Polygon') return [g.coordinates];
  if (g.type === 'MultiPolygon') return g.coordinates;
  return [];
}

function polyAreaSqKm(geom: any): number {
  if (!geom) return 0;
  try {
    let total = 0;
    if (geom.type === 'Polygon') {
      let a = d3.geoArea({ type: 'Feature', geometry: geom, properties: {} });
      if (a > 2 * Math.PI) a = 4 * Math.PI - a;
      total += a * 6371 * 6371;
    } else if (geom.type === 'MultiPolygon') {
      for (const coords of geom.coordinates) {
        let a = d3.geoArea({ type: 'Feature', geometry: { type: 'Polygon', coordinates: coords }, properties: {} });
        if (a > 2 * Math.PI) a = 4 * Math.PI - a;
        total += a * 6371 * 6371;
      }
    }
    return total;
  } catch (e) {
    return 0;
  }
}

async function auditSinoSouthBorders() {
  console.log('=== AUDIT OVERLAPS & GAPS: CINA VS INDIA / INDOCINA ===\n');

  const chinaSouth = CHINA_REGIONAL_FEATURES.filter(f => /XINJIANG|TIBET|YUNNAN|GUANGXI|GUANGDONG/i.test(f.id));
  const neighborNames = ['British Raj', 'Nepal', 'Bhutan', 'Laos', 'French Indo-China', 'Afghanistan', 'Siam'];
  const neighbors = neighborNames.map(nm => WORLD_1938_GEOJSON.features.find((f: any) => f.properties?.NAME === nm)).filter(Boolean);

  console.log('--- 1. OVERLAP AUDIT ---');
  let totalOverlapArea = 0;
  for (const cp of chinaSouth) {
    const cpGeom = toGeom(cp.geometry);
    for (const nb of neighbors) {
      const nbGeom = toGeom(nb.geometry);
      const inter = polygonClipping.intersection(cpGeom, nbGeom);
      const a = polyAreaSqKm({ type: 'MultiPolygon', coordinates: inter });
      if (a > 0.001) {
        console.log(`[OVERLAP] ${cp.id.padEnd(20)} vs ${nb.properties.NAME.padEnd(18)} : ${a.toFixed(2)} km²`);
        totalOverlapArea += a;
      }
    }
  }
  console.log(`Total Overlap Area: ${totalOverlapArea.toFixed(2)} km²\n`);

  console.log('--- 2. GAP / BUCHI NERI AUDIT ---');
  // Combine all southern China provinces
  let chinaUnion = toGeom(chinaSouth[0].geometry);
  for (let i = 1; i < chinaSouth.length; i++) {
    chinaUnion = polygonClipping.union(chinaUnion, toGeom(chinaSouth[i].geometry));
  }

  // Combine all neighbors
  let neighborsUnion = toGeom(neighbors[0].geometry);
  for (let i = 1; i < neighbors.length; i++) {
    neighborsUnion = polygonClipping.union(neighborsUnion, toGeom(neighbors[i].geometry));
  }

  // Combine China South + Neighbors to detect internal gap rings
  const combined = polygonClipping.union(chinaUnion, neighborsUnion);
  let holeCount = 0;
  let totalHoleArea = 0;
  for (const poly of combined) {
    if (poly.length > 1) {
      for (let r = 1; r < poly.length; r++) {
        const ring = poly[r];
        let minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
        for (const pt of ring) {
          if (pt[0] < minx) minx = pt[0];
          if (pt[0] > maxx) maxx = pt[0];
          if (pt[1] < miny) miny = pt[1];
          if (pt[1] > maxy) maxy = pt[1];
        }
        // Only inspect holes along the southern border interface (lat 20 to 38, lon 70 to 110)
        if (minx >= 70 && maxx <= 112 && miny >= 20 && maxy <= 38) {
          const hArea = polyAreaSqKm({ type: 'Polygon', coordinates: [ring] });
          if (hArea > 0.05) {
            console.log(`[BUCO NERO] Area: ${hArea.toFixed(2)} km² | BBox: [${minx.toFixed(2)}, ${miny.toFixed(2)}] -> [${maxx.toFixed(2)}, ${maxy.toFixed(2)}]`);
            holeCount++;
            totalHoleArea += hArea;
          }
        }
      }
    }
  }
  console.log(`Total Significant Border Holes: ${holeCount}, Total Area: ${totalHoleArea.toFixed(2)} km²`);
}

auditSinoSouthBorders().catch(console.error);
