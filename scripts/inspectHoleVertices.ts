import fs from 'fs';
import * as topojson from 'topojson-client';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';

const nutsRaw = JSON.parse(fs.readFileSync('public/data/nuts_10m.json', 'utf8'));
const k = Object.keys(nutsRaw.objects)[0];
const nutsFeats = (topojson.feature(nutsRaw, nutsRaw.objects[k]) as any).features;

// Find the Turkish provinces nearby
const agri = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRA21');
const igdir = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRA23');
const van = nutsFeats.find((f: any) => f.properties?.NUTS_ID === 'TRB21');

const nakh = USSR_REGIONAL_FEATURES.find((f: any) => f.properties?.NUTS_ID?.includes('128') || f.id?.includes('128'));
const ararat = USSR_REGIONAL_FEATURES.find((f: any) => f.properties?.NUTS_ID?.includes('127') || f.id?.includes('127'));
const iran = WORLD_1938_GEOJSON.features.find((f: any) => f.properties?.NAME === 'Iran');

console.log('Nakhchivan ID:', nakh?.id, 'Ararat ID:', ararat?.id);

// Let's print coordinates in the box [lon 44.0 to 45.2, lat 39.0 to 39.9]
function extractPointsInBox(feat: any, name: string) {
  const pts: [number, number][] = [];
  function walk(c: any) {
    if (typeof c[0] === 'number') {
      if (c[0] >= 44.0 && c[0] <= 45.2 && c[1] >= 39.0 && c[1] <= 39.9) {
        pts.push([Number(c[0].toFixed(4)), Number(c[1].toFixed(4))]);
      }
    } else {
      c.forEach(walk);
    }
  }
  walk(feat.geometry.coordinates);
  console.log(`${name} points in box (${pts.length}):`, pts.slice(0, 15));
}

extractPointsInBox(agri, 'Agri (TRA21)');
extractPointsInBox(igdir, 'Igdir (TRA23)');
extractPointsInBox(van, 'Van (TRB21)');
extractPointsInBox(nakh, 'Nakhchivan');
extractPointsInBox(ararat, 'Ararat (ARM)');
extractPointsInBox(iran, 'Iran');
