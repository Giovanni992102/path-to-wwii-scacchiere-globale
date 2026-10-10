import { KRESY_POWIAT_FEATURES } from '../src/data/kresyPowiats';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import * as d3 from 'd3';

const vitebsk = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_BLR_101_Vitebsk');
const minsk = USSR_REGIONAL_FEATURES.find(f => f.id === 'SOV_ADM1_BLR_103_Minsk');

console.log('Vitebsk bbox:', d3.geoBounds(vitebsk));
console.log('Vitebsk coords ring 0 length:', vitebsk.geometry.coordinates[0].length);

// Westernmost points of Vitebsk:
const westVitebsk = vitebsk.geometry.coordinates[0].filter((pt: number[]) => pt[0] < 28.5);
console.log('Vitebsk points with lon < 28.5 (count: ' + westVitebsk.length + '):');
console.log(westVitebsk.map((pt: number[]) => `[${pt[0].toFixed(3)}, ${pt[1].toFixed(3)}]`));

// Easternmost points of Kresy powiats:
const miory = KRESY_POWIAT_FEATURES.find(f => f.id === 'PL_KRESY_BLR_37_Miory');
const braslaw = KRESY_POWIAT_FEATURES.find(f => f.id === 'PL_KRESY_BLR_34_Braslaw');
const dokshytsy = KRESY_POWIAT_FEATURES.find(f => f.id === 'PL_KRESY_BLR_35_Dokshytsy');

console.log('\nMiory eastern points (lon > 27.5):');
console.log(miory.geometry.coordinates[0].filter((pt: number[]) => pt[0] > 27.5).map((pt: number[]) => `[${pt[0].toFixed(3)}, ${pt[1].toFixed(3)}]`));

console.log('\nBraslaw eastern points (lon > 27.0):');
console.log(braslaw.geometry.coordinates[0].filter((pt: number[]) => pt[0] > 27.0).map((pt: number[]) => `[${pt[0].toFixed(3)}, ${pt[1].toFixed(3)}]`));

console.log('\nMinsk western points (lon < 27.5):');
console.log(minsk.geometry.coordinates[0].filter((pt: number[]) => pt[0] < 27.5).map((pt: number[]) => `[${pt[0].toFixed(3)}, ${pt[1].toFixed(3)}]`));
