import { CHINA_REGIONAL_FEATURES } from '../src/data/chinaRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import { HB_EXCL } from '../src/data/georesolver';
import { resolveHistoricalTruth, sanitizeTopology } from '../src/data/historicalEngine';
import * as d3 from 'd3';

console.log('=== VERIFICA COMPLETA FRONTIERA SINO-INDIA / INDOCINA (1936-1940) ===\n');

// 1. Assemble all active map features
const provs: any[] = [];
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

// 2. Comprehensive strategic sample points along the entire Sino-Indian / Indochinese frontier
const testPoints = [
  // Xinjiang & Karakoram / Ladakh frontier
  { name: 'Kashgar / Kashi (Xinjiang)', pt: [75.99, 39.47], expectedOwner: 'XIN' },
  { name: 'Yarkand / Shache (Xinjiang)', pt: [77.25, 38.42], expectedOwner: 'XIN' },
  { name: 'Hotan / Hetian (Xinjiang)', pt: [79.92, 37.11], expectedOwner: 'XIN' },
  { name: 'Gilgit (Kashmir / British Raj)', pt: [74.31, 35.92], expectedOwner: 'RAJ' },
  { name: 'Skardu / Baltistan (British Raj)', pt: [75.63, 35.30], expectedOwner: 'RAJ' },
  { name: 'Srinagar (Kashmir / British Raj)', pt: [74.80, 34.08], expectedOwner: 'RAJ' },
  { name: 'Leh (Ladakh / British Raj)', pt: [77.58, 34.15], expectedOwner: 'RAJ' },
  { name: 'Shimla (British Raj)', pt: [77.17, 31.10], expectedOwner: 'RAJ' },
  { name: 'Dehradun (British Raj)', pt: [78.03, 30.32], expectedOwner: 'RAJ' },

  // Western & Southern Tibet
  { name: 'Ali / Shiquanhe (Ngari, Tibet)', pt: [80.10, 32.50], expectedOwner: 'TIB' },
  { name: 'Monte Kailash (Tibet)', pt: [81.31, 31.07], expectedOwner: 'TIB' },
  { name: 'Shigatse / Xigazê (Tibet)', pt: [88.88, 29.27], expectedOwner: 'TIB' },
  { name: 'Gyantse (Tibet)', pt: [89.60, 28.92], expectedOwner: 'TIB' },
  { name: 'Lhasa (Capitale del Tibet)', pt: [91.13, 29.65], expectedOwner: 'TIB' },
  { name: 'Yadong / Valle di Chumbi (Tibet)', pt: [88.90, 27.48], expectedOwner: 'TIB' },
  { name: 'Chamdo / Qamdo (Tibet Orientale)', pt: [97.18, 31.14], expectedOwner: 'TIB' },
  { name: 'Nyingchi / Linzhi (Tibet)', pt: [94.36, 29.65], expectedOwner: 'TIB' },

  // Nepal & Bhutan
  { name: 'Kathmandu (Nepal)', pt: [85.32, 27.72], expectedOwner: 'NEP' },
  { name: 'Pokhara (Nepal)', pt: [83.99, 28.21], expectedOwner: 'NEP' },
  { name: 'Rongbuk / Tingri (Tibet - Versante Nord Everest)', pt: [86.85, 28.20], expectedOwner: 'TIB' },
  { name: 'Everest / Sagarmatha (Versante Nepal)', pt: [86.91, 27.96], expectedOwner: 'NEP' },
  { name: 'Gangtok (Sikkim / British Raj)', pt: [88.61, 27.33], expectedOwner: 'RAJ' },
  { name: 'Thimphu (Capitale del Bhutan)', pt: [89.64, 27.47], expectedOwner: 'BHU' },
  { name: 'Paro (Bhutan)', pt: [89.42, 27.43], expectedOwner: 'BHU' },

  // Eastern Himalayas / McMahon Line & Assam
  { name: 'Tawang (British Raj / Arunachal)', pt: [91.86, 27.59], expectedOwner: 'RAJ' },
  { name: 'Dibrugarh (Assam / British Raj)', pt: [94.91, 27.48], expectedOwner: 'RAJ' },

  // Northern Burma (British Raj)
  { name: 'Putao (Birmania Settentrionale / British Raj)', pt: [97.43, 27.33], expectedOwner: 'RAJ' },
  { name: 'Myitkyina (Kachin / British Raj)', pt: [97.40, 25.38], expectedOwner: 'RAJ' },
  { name: 'Bhamo (Fiume Irrawaddy / British Raj)', pt: [96.90, 24.25], expectedOwner: 'RAJ' },
  { name: 'Lashio (Terminale Strada della Birmania / British Raj)', pt: [97.75, 22.93], expectedOwner: 'RAJ' },
  { name: 'Mandalay (Birmania / British Raj)', pt: [96.08, 21.98], expectedOwner: 'RAJ' },

  // Yunnan (China)
  { name: 'Tengchong (Yunnan Occidentale)', pt: [98.50, 25.02], expectedOwner: 'CHI' },
  { name: 'Baoshan (Yunnan)', pt: [99.16, 25.12], expectedOwner: 'CHI' },
  { name: 'Ruili / Wanting (Yunnan - Confine Birmano)', pt: [97.85, 24.01], expectedOwner: 'CHI' },
  { name: 'Dali (Yunnan)', pt: [100.23, 25.60], expectedOwner: 'CHI' },
  { name: 'Lijiang (Yunnan)', pt: [100.23, 26.87], expectedOwner: 'CHI' },
  { name: 'Kunming (Capitale dello Yunnan)', pt: [102.71, 25.04], expectedOwner: 'CHI' },
  { name: 'Jinghong (Xishuangbanna - Fiume Mekong / Yunnan)', pt: [100.80, 22.01], expectedOwner: 'CHI' },
  { name: 'Mengzi / Kaiyuan (Yunnan - Ferrovia dell\'Indocina)', pt: [103.40, 23.36], expectedOwner: 'CHI' },

  // Laos
  { name: 'Luang Namtha (Laos Settentrionale)', pt: [101.40, 20.95], expectedOwner: 'F_IND' },
  { name: 'Phongsaly (Laos Settentrionale - Confine Yunnan)', pt: [102.10, 21.68], expectedOwner: 'F_IND' },
  { name: 'Luang Prabang (Capitale Reale del Laos)', pt: [102.14, 19.89], expectedOwner: 'F_IND' },
  { name: 'Vientiane (Capitale Amministrativa del Laos)', pt: [102.63, 17.98], expectedOwner: 'F_IND' },

  // French Indo-China (Tonkin / Vietnam)
  { name: 'Lai Chau / Dien Bien Phu (Tonkino)', pt: [103.02, 21.39], expectedOwner: 'F_IND' },
  { name: 'Lao Cai (Tonkino - Frontiera Ferrovia Yunnan)', pt: [103.96, 22.48], expectedOwner: 'F_IND' },
  { name: 'Ha Giang (Tonkino Settentrionale)', pt: [104.98, 22.82], expectedOwner: 'F_IND' },
  { name: 'Cao Bang (Tonkino)', pt: [106.26, 22.67], expectedOwner: 'F_IND' },
  { name: 'Lang Son / Dong Dang (Porta dell\'Amicizia / Tonkino)', pt: [106.76, 21.85], expectedOwner: 'F_IND' },
  { name: 'Hanoi (Capitale dell\'Indocina Francese)', pt: [105.85, 21.03], expectedOwner: 'F_IND' },
  { name: 'Haiphong (Porto Principale del Tonkino)', pt: [106.68, 20.86], expectedOwner: 'F_IND' },
  { name: 'Mong Cai / Hai Ha (Tonkino Costiero)', pt: [107.78, 21.42], expectedOwner: 'F_IND' },

  // Guangxi & Guangdong (China)
  { name: 'Pingxiang (Guangxi - Passo dell\'Amicizia)', pt: [106.75, 22.10], expectedOwner: 'CHI' },
  { name: 'Dongxing (Guangxi - Confine Mong Cai)', pt: [107.95, 21.65], expectedOwner: 'CHI' },
  { name: 'Nanning (Capitale del Guangxi)', pt: [108.33, 22.82], expectedOwner: 'CHI' },
  { name: 'Guilin (Guangxi Settentrionale)', pt: [110.28, 25.27], expectedOwner: 'CHI' },
  { name: 'Guangzhou / Canton (Guangdong)', pt: [113.26, 23.13], expectedOwner: 'CHI' },
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
      errors++;
    } else {
      console.log(`✓ ${sp.name.padEnd(54)} -> ${owner.padEnd(5)} | ${res.name} [${f.id || f.properties?.NAME}]`);
    }
  }
}

console.log('\n--- RIEPILOGO AUDIT FRONTIERA SINO-INDIA / INDOCINA ---');
console.log(`Punti strategici analizzati: ${testPoints.length}`);
console.log(`Buchi Neri rilevati: ${holes}`);
console.log(`Sovrapposizioni (Overlaps) rilevate: ${overlaps}`);
console.log(`Discrepanze di attribuzione storica: ${errors}`);

if (holes === 0 && overlaps === 0 && errors === 0) {
  console.log('\n🌟 PERFEZIONE TOPOLOGICA E STORICA CERTIFICATA! Confine Sino-India / Indocina impeccabile.');
} else {
  process.exit(1);
}
