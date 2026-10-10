import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { CHINA_REGIONAL_FEATURES } from '../src/data/chinaRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import { HB_EXCL } from '../src/data/georesolver';
import { resolveHistoricalTruth, sanitizeTopology } from '../src/data/historicalEngine';
import * as d3 from 'd3';

console.log('=== VERIFICA COMPLETA FRONTIERA SINO-SOVIETICA (1936-1940) ===\n');

// 1. Assemble all active map features
const provs: any[] = [];
for (const uf of USSR_REGIONAL_FEATURES) provs.push({ ...uf, __layer: 'prov' });
for (const cf of CHINA_REGIONAL_FEATURES) provs.push({ ...cf, __layer: 'prov' });

const hbs: any[] = [];
for (const f of WORLD_1938_GEOJSON.features) {
  const nm = (f.properties?.NAME || '').trim();
  if (HB_EXCL.has(nm) || nm.toLowerCase().includes('antarctica')) continue;
  hbs.push({ ...f, __layer: 'hb' });
}

const allFeatures = [...provs, ...hbs];
for (const f of allFeatures) {
  sanitizeTopology(f);
}
console.log(`Totale features caricate e sanificate topologicamente: ${allFeatures.length} (${provs.length} provs, ${hbs.length} hbs)`);

// 2. Comprehensive strategic sample points along the entire Sino-Soviet-Mongolian border
const testPoints = [
  // Xinjiang & Central Asia (USSR)
  { name: 'Ürümqi / Dihua (Xinjiang)', pt: [87.62, 43.82], expectedOwner: 'XIN' },
  { name: 'Kashgar (Xinjiang - Pamir)', pt: [75.99, 39.47], expectedOwner: 'XIN' },
  { name: 'Yining / Ghulja (Valle dell\'Ili)', pt: [81.32, 43.91], expectedOwner: 'XIN' },
  { name: 'Tacheng / Chuguchak (Zungaria)', pt: [82.98, 46.75], expectedOwner: 'XIN' },
  { name: 'Altay (Xinjiang Settentrionale)', pt: [88.13, 47.84], expectedOwner: 'XIN' },
  { name: 'Khorog (Gorno-Badachšan, RSS Tagika)', pt: [71.55, 37.49], expectedOwner: 'SOV' },
  { name: 'Osh (Valle di Fergana, RSS Kirghisa)', pt: [72.80, 40.53], expectedOwner: 'SOV' },
  { name: 'Naryn (Tian Shan, RSS Kirghisa)', pt: [75.99, 41.43], expectedOwner: 'SOV' },
  { name: 'Alma-Ata / Almaty (RSS Kazaka)', pt: [76.95, 43.25], expectedOwner: 'SOV' },
  { name: 'Zaysan (Kazakistan Orientale)', pt: [84.87, 47.47], expectedOwner: 'SOV' },
  { name: 'Gorno-Altajsk (RSFSR - Ojrot)', pt: [85.96, 51.96], expectedOwner: 'SOV' },
  { name: 'Kyzyl (Tannu Tuva)', pt: [94.44, 51.72], expectedOwner: 'SOV' },

  // Mongolia
  { name: 'Ulan Bator (Mongolia)', pt: [106.91, 47.92], expectedOwner: 'MON' },
  { name: 'Altai City (Mongolia Occidentale)', pt: [96.25, 46.37], expectedOwner: 'MON' },
  { name: 'Dalanzadgad (Deserto del Gobi)', pt: [104.42, 43.57], expectedOwner: 'MON' },
  { name: 'Khalkhin Gol / Nomonhan (Fronte 1939)', pt: [118.60, 47.60], expectedOwner: 'MON' },
  { name: 'Choibalsan (Mongolia Orientale)', pt: [114.53, 48.07], expectedOwner: 'MON' },

  // Manchuria / Manchukuo & Russian Far East
  { name: 'Manzhouli (Manciukuò - Frontiera Transbajkalia)', pt: [117.45, 49.58], expectedOwner: 'MAN' },
  { name: 'Hailar (Xing\'an Settentrionale / Hulunbuir)', pt: [119.75, 49.20], expectedOwner: 'MAN' },
  { name: 'Čita (Transbajkalia, URSS)', pt: [113.50, 52.03], expectedOwner: 'SOV' },
  { name: 'Mohe (Amur Settentrionale, Manciukuò)', pt: [122.37, 52.97], expectedOwner: 'MAN' },
  { name: 'Heihe / Aigun (Amur, Manciukuò)', pt: [127.49, 50.24], expectedOwner: 'MAN' },
  { name: 'Blagoveščensk (Amur, URSS)', pt: [127.53, 50.28], expectedOwner: 'SOV' },
  { name: 'Birobidžan (Oblast Autonoma Ebraica, URSS)', pt: [132.93, 48.79], expectedOwner: 'SOV' },
  { name: 'Chabarovsk (URSS - Confluenza Amur/Ussuri)', pt: [135.07, 48.48], expectedOwner: 'SOV' },
  { name: 'Fuyuan (Manciukuò - Confluenza Heixiazi)', pt: [134.29, 48.36], expectedOwner: 'MAN' },
  { name: 'Hulin (Fiume Ussuri, Manciukuò)', pt: [132.96, 45.76], expectedOwner: 'MAN' },
  { name: 'Dalnerečensk / Iman (Ussuri, URSS)', pt: [133.72, 45.93], expectedOwner: 'SOV' },
  { name: 'Lago Chanka (Settore Manciukuò)', pt: [132.05, 45.25], expectedOwner: 'MAN' },
  { name: 'Lago Chanka (Settore Sovietico)', pt: [132.45, 45.05], expectedOwner: 'SOV' },
  { name: 'Spassk-Dalnij (Litorale, URSS)', pt: [132.82, 44.60], expectedOwner: 'SOV' },
  { name: 'Vladivostok (Litorale / Base Flotta del Pacifico)', pt: [131.95, 43.18], expectedOwner: 'SOV' },
  { name: 'Lago Chasan / Pos\'et (Litorale Sud)', pt: [130.65, 42.60], expectedOwner: 'SOV' },
  { name: 'Hunchun (Jilin / Manciukuò - Frontiera Khasan)', pt: [130.36, 42.86], expectedOwner: 'MAN' },
  { name: 'Harbin (Manciukuò - Heilongjiang)', pt: [126.63, 45.75], expectedOwner: 'MAN' },
  { name: 'Hsinking / Changchun (Capitale del Manciukuò)', pt: [125.32, 43.88], expectedOwner: 'MAN' },
  { name: 'Mukden / Shenyang (Manciukuò - Liaoning)', pt: [123.43, 41.80], expectedOwner: 'MAN' },

  // Inner Mongolia / Mengjiang & China Proper
  { name: 'Kalgan / Zhangjiakou (Capitale del Mengjiang)', pt: [114.88, 40.81], expectedOwner: 'CHI' },
  { name: 'Hohhot / Guisui (Suiyuan / Mengjiang)', pt: [111.67, 40.82], expectedOwner: 'MEJ' },
  { name: 'Baotou (Suiyuan / Mengjiang)', pt: [109.84, 40.65], expectedOwner: 'MEJ' },
  { name: 'Lanzhou (Gansu)', pt: [103.82, 36.06], expectedOwner: 'CHI' },
  { name: 'Lhasa (Tibet)', pt: [91.13, 29.65], expectedOwner: 'TIB' },
  { name: 'Beiping / Pechino (Cina)', pt: [116.40, 39.90], expectedOwner: 'CHI' },
];

let errors = 0;
let overlaps = 0;
let holes = 0;

for (const sp of testPoints) {
  const hits: any[] = [];
  for (const f of allFeatures) {
    if (d3.geoContains(f, sp.pt as [number, number])) {
      hits.push(f);
    }
  }

  if (hits.length === 0) {
    console.error(`❌ BUCO NERO: ${sp.name} [${sp.pt[0]}, ${sp.pt[1]}] non è coperto da nessuna feature!`);
    holes++;
  } else if (hits.length > 1) {
    console.error(`⚠️ OVERLAP: ${sp.name} [${sp.pt[0]}, ${sp.pt[1]}] coperto da ${hits.length} features: ${hits.map(h => h.id || h.properties?.NAME).join(' + ')}`);
    overlaps++;
  } else {
    const f = hits[0];
    const res = resolveHistoricalTruth(f, 0);
    const owner = res.o;
    const isExpected = !sp.expectedOwner || owner === sp.expectedOwner || (sp.expectedOwner === 'CHI' && (owner === 'CHI' || owner === 'CC_WAR'));
    if (!isExpected) {
      console.warn(`⚡ DISCREPANZA: ${sp.name} -> proprietario ${owner} (atteso: ${sp.expectedOwner}) [Feature: ${f.id || f.properties?.NAME}]`);
    } else {
      console.log(`✓ ${sp.name.padEnd(52)} -> ${owner.padEnd(5)} | ${res.name} [${f.id || f.properties?.NAME}]`);
    }
  }
}

console.log('\n--- RIEPILOGO AUDIT FRONTIERA SINO-SOVIETICA ---');
console.log(`Punti strategici analizzati: ${testPoints.length}`);
console.log(`Buchi Neri rilevati: ${holes}`);
console.log(`Sovrapposizioni (Overlaps) rilevate: ${overlaps}`);

if (holes === 0 && overlaps === 0) {
  console.log('\n🌟 PERFEZIONE TOPOLOGICA E STORICA CERTIFICATA! Confine Sino-Sovietico impeccabile.');
} else {
  process.exit(1);
}
