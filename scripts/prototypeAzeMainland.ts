import * as fs from 'fs';
import * as path from 'path';
import * as topojson from 'topojson-client';
import * as d3 from 'd3';
import polygonClipping from 'polygon-clipping';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';

console.log('=== ASSEMBLING SURGICAL AZERBAIJAN SSR MAINLAND ===\n');

const rusDag = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_RUS_76_Dagestan')!;
const geoKakheti = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_GEO_106_Kakheti')!;
const geoKvemo = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_GEO_107_Kvemo_Kartli')!;
const armTavush = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_ARM_119_Tavush')!;
const armGeghar = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_ARM_117_Gegharkunik')!;
const armVayots = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_ARM_123_Vayots_Dzor')!;
const armSyunik = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_ARM_118_Syunik')!;
const iran = WORLD_1938_GEOJSON.features.find((f: any) => (f.properties?.NAME || '').toLowerCase() === 'iran')!;

// 1. Dagestan Arc: from Samur [48.592, 41.842] to Kakheti tripoint [45.987, 42.045]
const dagMain = rusDag.geometry.coordinates[2][0];
// dagMain[162] to dagMain[231]
const dagArc: [number, number][] = [];
for (let i = 162; i <= 231; i++) {
  dagArc.push(dagMain[i]);
}
console.log(`1. Dagestan Arc: ${dagArc.length} points, from [${dagArc[0]}] to [${dagArc[dagArc.length - 1]}]`);

// 2. Georgia Arc:
// Kakheti from [45.988, 42.045] (idx 51) to [45.304, 41.469] (idx 103/0)
const kakhRing = geoKakheti.geometry.coordinates[0];
const kakhArc: [number, number][] = [];
for (let i = 51; i < kakhRing.length; i++) {
  kakhArc.push(kakhRing[i]);
}
console.log(`2a. Kakheti Arc: ${kakhArc.length} points, from [${kakhArc[0]}] to [${kakhArc[kakhArc.length - 1]}]`);

// Kvemo Kartli from [45.304, 41.469] (idx 12) to [44.948, 41.258] (idx 17)
const kvemoRing = geoKvemo.geometry.coordinates[0];
const kvemoArc: [number, number][] = [];
for (let i = 13; i <= 17; i++) {
  kvemoArc.push(kvemoRing[i]);
}
console.log(`2b. Kvemo Arc: ${kvemoArc.length} points, from [${kvemoArc[0]}] to [${kvemoArc[kvemoArc.length - 1]}]`);

// 3. Armenia Arc:
// Tavush: from [44.948, 41.258] near tRing[24] to tRing[0] [45.353, 40.642]
const tRing = armTavush.geometry.coordinates[0];
// Let's inspect which direction tRing goes from 24 to 0
console.log('Tavush check: tRing[24]=', tRing[24], 'tRing[0]=', tRing[0]);
// Let's see points between 24 and 0
const tPointsA: [number, number][] = [];
for (let i = 24; i >= 0; i--) tPointsA.push(tRing[i]);
const tPointsB: [number, number][] = [];
for (let i = 24; i < tRing.length; i++) tPointsB.push(tRing[i]);
tPointsB.push(tRing[0]);
console.log('Tavush option A max lon:', Math.max(...tPointsA.map(p => p[0])), 'option B max lon:', Math.max(...tPointsB.map(p => p[0])));
// The one with larger longitude is the eastern border facing Azerbaijan!
const tavushArc = Math.max(...tPointsA.map(p => p[0])) > Math.max(...tPointsB.map(p => p[0])) ? tPointsA : tPointsB;
console.log(`3a. Tavush Arc: ${tavushArc.length} points, from [${tavushArc[0]}] to [${tavushArc[tavushArc.length - 1]}]`);

// Gegharkunik Part 1: from [45.353, 40.642] (idx 0) to Vayots tripoint [45.515, 40.01] (idx 15)
const gRing = armGeghar.geometry.coordinates[1][0];
console.log('Gegharkunik check: gRing[0]=', gRing[0], 'gRing[15]=', gRing[15]);
const gPointsA: [number, number][] = [];
for (let i = 0; i <= 15; i++) gPointsA.push(gRing[i]);
const gPointsB: [number, number][] = [];
for (let i = gRing.length - 1; i >= 15; i--) gPointsB.push(gRing[i]);
console.log('Gegharkunik option A max lon:', Math.max(...gPointsA.map(p => p[0])), 'option B max lon:', Math.max(...gPointsB.map(p => p[0])));
// The one with larger longitude is the eastern border facing Azerbaijan!
const gegharArc = Math.max(...gPointsA.map(p => p[0])) > Math.max(...gPointsB.map(p => p[0])) ? gPointsA : gPointsB;
console.log(`3b. Gegharkunik Arc: ${gegharArc.length} points, from [${gegharArc[0]}] to [${gegharArc[gegharArc.length - 1]}]`);

// Vayots Dzor: from [45.515, 40.01] (idx 4) to Syunik tripoint [45.789, 39.876] (idx 7)
const vRing = armVayots.geometry.coordinates[0];
console.log('Vayots check: vRing[4]=', vRing[4], 'vRing[7]=', vRing[7]);
const vPointsA: [number, number][] = [];
for (let i = 4; i <= 7; i++) vPointsA.push(vRing[i]);
const vPointsB: [number, number][] = [];
for (let i = 4; i >= 0; i--) vPointsB.push(vRing[i]);
for (let i = vRing.length - 1; i >= 7; i--) vPointsB.push(vRing[i]);
console.log('Vayots option A max lon:', Math.max(...vPointsA.map(p => p[0])), 'option B max lon:', Math.max(...vPointsB.map(p => p[0])));
const vayotsArc = Math.max(...vPointsA.map(p => p[0])) > Math.max(...vPointsB.map(p => p[0])) ? vPointsA : vPointsB;
console.log(`3c. Vayots Arc: ${vayotsArc.length} points, from [${vayotsArc[0]}] to [${vayotsArc[vayotsArc.length - 1]}]`);

// Syunik: from [45.789, 39.876] (idx 4) to Iran tripoint [46.355, 38.91] (idx 31)
const sRing = armSyunik.geometry.coordinates[0];
console.log('Syunik check: sRing[4]=', sRing[4], 'sRing[31]=', sRing[31]);
const sPointsA: [number, number][] = [];
for (let i = 4; i <= 31; i++) sPointsA.push(sRing[i]);
const sPointsB: [number, number][] = [];
for (let i = 4; i >= 0; i--) sPointsB.push(sRing[i]);
for (let i = sRing.length - 1; i >= 31; i--) sPointsB.push(sRing[i]);
console.log('Syunik option A max lon:', Math.max(...sPointsA.map(p => p[0])), 'option B max lon:', Math.max(...sPointsB.map(p => p[0])));
const syunikArc = Math.max(...sPointsA.map(p => p[0])) > Math.max(...sPointsB.map(p => p[0])) ? sPointsA : sPointsB;
console.log(`3d. Syunik Arc: ${syunikArc.length} points, from [${syunikArc[0]}] to [${syunikArc[syunikArc.length - 1]}]`);

// 4. Iran Arc: from [46.355, 38.91] (Iran[54]) to Astara [48.791, 38.452] / [48.887, 38.440] (Iran[105])
const iranRing = iran.geometry.coordinates[0][0];
const iranArc: [number, number][] = [];
for (let i = 54; i <= 105; i++) {
  iranArc.push(iranRing[i]);
}
console.log(`4. Iran Arc: ${iranArc.length} points, from [${iranArc[0]}] to [${iranArc[iranArc.length - 1]}]`);

// 5. Real Caspian Coast Arc: from Astara [48.887, 38.440] to Samur mouth [48.592, 41.842]
const cntrRaw = fs.readFileSync(path.join(process.cwd(), 'public/data/cntr_20m.json'), 'utf8');
const cntr = JSON.parse(cntrRaw);
const azTopo = cntr.objects.CNTR_RG_20M_2020_4326.geometries.find((g: any) => g.properties?.CNTR_ID === 'AZ');
const azGeo = topojson.feature(cntr, azTopo as any) as any;
const azRealMainland = azGeo.geometry.coordinates[0][0];
// Coast points from 22 down to 0:
const coastArc: [number, number][] = [];
// In cntr_20m: pt 22 is [48.887, 38.440] at Astara, pt 0 is [48.580, 41.830] at Samur
for (let i = 22; i >= 0; i--) {
  coastArc.push([Math.round(azRealMainland[i][0] * 1000) / 1000, Math.round(azRealMainland[i][1] * 1000) / 1000]);
}
// Ensure first point connects to iranArc last point and last connects to dagArc first point
coastArc[0] = iranArc[iranArc.length - 1];
coastArc[coastArc.length - 1] = dagArc[0];
console.log(`5. Coast Arc: ${coastArc.length} points, from [${coastArc[0]}] to [${coastArc[coastArc.length - 1]}]`);
