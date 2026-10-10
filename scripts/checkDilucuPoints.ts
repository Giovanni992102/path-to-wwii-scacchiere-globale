import fs from 'fs';
import * as topojson from 'topojson-client';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import { geoContains } from 'd3-geo';

const nutsRaw = JSON.parse(fs.readFileSync('public/data/nuts_10m.json', 'utf8'));
const k = Object.keys(nutsRaw.objects)[0];
const nutsFeats = (topojson.feature(nutsRaw, nutsRaw.objects[k]) as any).features;

const igdir = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRA23');
const nakh = USSR_REGIONAL_FEATURES.find((f: any) => f.id?.includes('128'));
const iran = WORLD_1938_GEOJSON.features.find((f: any) => f.properties?.NAME === 'Iran');

// Check test points around Dilucu / Sadarak:
// lon 44.70 to 44.85, lat 39.60 to 39.72
console.log('Testing points around Dilucu/Sadarak:');
for (let lat = 39.62; lat <= 39.72; lat += 0.02) {
  for (let lon = 44.74; lon <= 44.84; lon += 0.02) {
    const pt: [number, number] = [Number(lon.toFixed(3)), Number(lat.toFixed(3))];
    const inIgdir = geoContains(igdir, pt);
    const inNakh = geoContains(nakh, pt);
    const inIran = geoContains(iran as any, pt);
    console.log(`Pt [${pt[0]}, ${pt[1]}]: Igdir=${inIgdir}, Nakh=${inNakh}, Iran=${inIran}`);
  }
}
