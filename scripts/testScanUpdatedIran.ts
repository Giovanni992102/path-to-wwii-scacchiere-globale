import fs from 'fs';
import * as topojson from 'topojson-client';
import { geoContains } from 'd3-geo';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import { HB_EXCL } from '../src/data/georesolver';
import * as d3 from 'd3';

const nutsRaw = JSON.parse(fs.readFileSync('public/data/nuts_10m.json', 'utf8'));
const k = Object.keys(nutsRaw.objects)[0];
const nutsFeats = (topojson.feature(nutsRaw, nutsRaw.objects[k]) as any).features;

function fixWinding(f: any) {
  if (!f || !f.geometry) return f;
  try {
    if (f.geometry.type === 'Polygon') {
      const area = d3.geoArea(f);
      if (area > 2 * Math.PI) {
        f.geometry.coordinates = f.geometry.coordinates.map((ring: any[]) => [...ring].reverse());
      }
    } else if (f.geometry.type === 'MultiPolygon') {
      f.geometry.coordinates = f.geometry.coordinates.map((poly: any[]) => {
        const singlePoly = { type: 'Polygon', coordinates: poly };
        const area = d3.geoArea(singlePoly as any);
        if (area > 2 * Math.PI) {
          return poly.map((ring: any[]) => [...ring].reverse());
        }
        return poly;
      });
    }
  } catch (e) {}
  return f;
}

const provs: any[] = [];
nutsFeats.forEach((f: any) => {
  if (f.geometry) provs.push(fixWinding(f));
});
USSR_REGIONAL_FEATURES.forEach((f: any) => {
  if (f.geometry) provs.push(fixWinding(f));
});

// Add TURKEY_MOUNT_ARARAT_FEATURE
const TURKEY_MOUNT_ARARAT_FEATURE = {
  type: 'Feature',
  id: 'TUR_HIST_ARARAT',
  properties: {
    NAME: 'Mount Ararat and Doğubayazıt',
    NUTS_NAME: 'Monte Ararat e Doğubayazıt (Ağrı Dağı)',
    NAME_ENGL: 'Mount Ararat and Doğubayazıt',
    CNTR_NAME: 'Turchia',
    CNTR_ID: 'TR',
    CNTR_CODE: 'TR',
    ADMIN: 'Provincia di Ağrı / Iğdır (Frontiera Orientale)',
    SOVEREIGNT: 'Republic of Turkey',
  },
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [44.40957003300715, 39.42656236012963],
        [44.502168001264785, 39.716578359895685],
        [44.60991836432823, 39.778128518119416],
        [44.68062954008861, 39.735356374269024],
        [44.736188321043194, 39.70197323760531],
        [44.749657116426114, 39.68945456135641],
        [44.40957003300715, 39.42656236012963],
      ],
    ],
  },
};
provs.push(fixWinding(TURKEY_MOUNT_ARARAT_FEATURE));

// Build updated Iran
const van = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRB21');
const agri = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRA21');
const vanArc: [number, number][] = [];
for (let i = 5; i >= 0; i--) vanArc.push(van.geometry.coordinates[0][i]);
const agriArc: [number, number][] = [];
for (let i = 10; i >= 8; i--) agriArc.push(agri.geometry.coordinates[0][i]);
const detailedTrIranArc = [...vanArc, ...agriArc];

const origIran = WORLD_1938_GEOJSON.features.find((f: any) => f.properties?.NAME === 'Iran');
const iranRing = origIran.geometry.coordinates[0][0];
const newIranRing = [
  ...iranRing.slice(0, 6),
  ...detailedTrIranArc,
  ...iranRing.slice(8)
];

const updatedIran = {
  ...origIran,
  geometry: {
    type: 'MultiPolygon',
    coordinates: [[newIranRing]]
  }
};

const hbs: any[] = [];
WORLD_1938_GEOJSON.features.forEach((f: any) => {
  const nm = f.properties?.NAME;
  if (!HB_EXCL.has(nm) && f.geometry) {
    if (nm === 'Iran') {
      hbs.push(fixWinding(updatedIran));
    } else {
      hbs.push(fixWinding(f));
    }
  }
});

console.log('--- SCANNING REGION lon [43.8..45.2], lat [38.2..40.0] with step 0.02 ---');
const holePts: { lon: number; lat: number }[] = [];

for (let lat = 38.3; lat <= 40.0; lat += 0.02) {
  for (let lon = 43.8; lon <= 45.2; lon += 0.02) {
    const pt: [number, number] = [Number(lon.toFixed(3)), Number(lat.toFixed(3))];
    let coveredBy: string | null = null;

    for (const p of provs) {
      if (geoContains(p, pt)) {
        coveredBy = 'PROV: ' + (p.properties?.NAME_LATN || p.properties?.NUTS_NAME || p.properties?.NAME || p.id);
        break;
      }
    }

    if (!coveredBy) {
      for (const h of hbs) {
        if (geoContains(h, pt)) {
          coveredBy = 'HB: ' + h.properties?.NAME;
          break;
        }
      }
    }

    if (!coveredBy) {
      holePts.push({ lon: pt[0], lat: pt[1] });
    }
  }
}

console.log(`Scan result: Found ${holePts.length} uncovered points!`);
if (holePts.length > 0) {
  console.log('Remaining hole points:', holePts);
}
