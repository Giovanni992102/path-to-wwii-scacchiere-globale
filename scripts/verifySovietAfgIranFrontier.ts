import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { CHINA_REGIONAL_FEATURES } from '../src/data/chinaRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import { HB_EXCL } from '../src/data/georesolver';
import { resolveHistoricalTruth, sanitizeTopology } from '../src/data/historicalEngine';
import * as d3 from 'd3';

console.log('=== VERIFICA COMPLETA FRONTIERA URSS - AFGHANISTAN - IRAN (1936-1940) ===\n');

// 1. Gather all active features
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

// 2. Comprehensive strategic sample points along the entire Soviet-Afghan-Iranian frontier
const testPoints = [
  // Transcaucasia & Aras river / Astara
  { name: 'Nakhchivan (URSS - Naxçıvan)', pt: [45.41, 39.20], expectedOwner: 'SOV' },
  { name: 'Julfa / Jolfa (Iran - Sponda Aras)', pt: [45.63, 38.93], expectedOwner: 'IRN' },
  { name: 'Tabriz (Iran - Azerbaigian Iraniano)', pt: [46.29, 38.08], expectedOwner: 'IRN' },
  { name: 'Astara (URSS - Caspio Nord)', pt: [48.87, 38.45], expectedOwner: 'SOV' },
  { name: 'Astara (Iran - Caspio Sud)', pt: [48.86, 38.42], expectedOwner: 'IRN' },
  { name: 'Bandar Anzali (Iran - Porto sul Caspio)', pt: [49.46, 37.47], expectedOwner: 'IRN' },
  { name: 'Rasht (Iran - Gilan)', pt: [49.58, 37.28], expectedOwner: 'IRN' },
  { name: 'Tehran (Capitale dell\'Iran)', pt: [51.38, 35.68], expectedOwner: 'IRN' },

  // Turkmenistan / Iran frontier (Caspian to Sarakhs)
  { name: 'Hasan Kuli / Esenguly (URSS - Caspio)', pt: [53.97, 37.46], expectedOwner: 'SOV' },
  { name: 'Bandar Shah / Bandar Torkaman (Iran - Caspio)', pt: [54.07, 36.90], expectedOwner: 'IRN' },
  { name: 'Gorgan (Iran - Golestan)', pt: [54.43, 36.84], expectedOwner: 'IRN' },
  { name: 'Kizyl-Atrek / Gyzyletrek (URSS - Fiume Atrek)', pt: [54.77, 37.65], expectedOwner: 'SOV' },
  { name: 'Gonbad-e Kavus (Iran)', pt: [55.17, 37.25], expectedOwner: 'IRN' },
  { name: 'Bojnurd (Iran - Khorasan)', pt: [57.32, 37.47], expectedOwner: 'IRN' },
  { name: 'Ashgabat (Capitale RSS Turkmena)', pt: [58.38, 37.95], expectedOwner: 'SOV' },
  { name: 'Bajgiran / Quchan (Iran - Monti Kopet Dag)', pt: [58.42, 37.62], expectedOwner: 'IRN' },
  { name: 'Mashhad (Iran - Khorasan)', pt: [59.60, 36.29], expectedOwner: 'IRN' },
  { name: 'Sarakhs (URSS - Fiume Tejen / Sponda Est)', pt: [61.21, 36.53], expectedOwner: 'SOV' },
  { name: 'Sarakhs (Iran - Sponda Ovest)', pt: [61.15, 36.48], expectedOwner: 'IRN' },

  // Soviet / Afghanistan / Iran tripoint & Kushka
  { name: 'Passo di Zulfikar (Tri-confine Hari Rud)', pt: [61.22, 35.55], expectedOwner: 'AFG' },
  { name: 'Torghundi / Towraghondi (Afghanistan - Confine Kushka)', pt: [62.21, 35.25], expectedOwner: 'AFG' },
  { name: 'Kushka / Serhetabat (Punto piu a Sud dell\'URSS)', pt: [62.34, 35.28], expectedOwner: 'SOV' },
  { name: 'Herat (Afghanistan Occidentale)', pt: [62.19, 34.34], expectedOwner: 'AFG' },
  { name: 'Mary / Merv (RSS Turkmena)', pt: [61.83, 37.59], expectedOwner: 'SOV' },

  // Amu Darya / Termez / Mazar-i-Sharif
  { name: 'Kerki / Atamyrat (RSS Turkmena - Amu Darya)', pt: [65.20, 37.83], expectedOwner: 'SOV' },
  { name: 'Andkhoy (Afghanistan)', pt: [65.12, 36.95], expectedOwner: 'AFG' },
  { name: 'Sheberghan (Afghanistan)', pt: [65.75, 36.66], expectedOwner: 'AFG' },
  { name: 'Termez (RSS Uzbeka - Fiume Amu Darya)', pt: [67.27, 37.22], expectedOwner: 'SOV' },
  { name: 'Hairatan (Afghanistan - Sponda Sud Amu Darya)', pt: [67.41, 37.21], expectedOwner: 'AFG' },
  { name: 'Mazar-i-Sharif (Afghanistan)', pt: [67.11, 36.70], expectedOwner: 'AFG' },
  { name: 'Kunduz (Afghanistan)', pt: [68.86, 36.72], expectedOwner: 'AFG' },

  // Panj river / Tajikistan / Badakhshan / Wakhan Corridor
  { name: 'Nizhny Panj / Panji Poyon (RSS Tagika - Fiume Panj)', pt: [68.617, 37.205], expectedOwner: 'SOV' },
  { name: 'Sher Khan Bandar (Afghanistan - Sponda Panj)', pt: [68.617, 37.185], expectedOwner: 'AFG' },
  { name: 'Khatlon / Qurghonteppa (RSS Tagika)', pt: [68.78, 37.83], expectedOwner: 'SOV' },
  { name: 'Khorog (Gorno-Badakhshan / Pamir - URSS)', pt: [71.55, 37.49], expectedOwner: 'SOV' },
  { name: 'Sheghnan / Shighnan (Afghanistan - Sponda Panj)', pt: [71.50, 37.50], expectedOwner: 'AFG' },
  { name: 'Feyzabad (Badakhshan - Afghanistan)', pt: [70.58, 37.11], expectedOwner: 'AFG' },
  { name: 'Ishkashim (RSS Tagika - Pamir)', pt: [71.60, 36.74], expectedOwner: 'SOV' },
  { name: 'Eshkashem (Afghanistan - Ingresso Corridoio Wakhan)', pt: [71.54, 36.68], expectedOwner: 'AFG' },
  { name: 'Qila-e Panja (Afghanistan - Wakhan)', pt: [72.588, 37.002], expectedOwner: 'AFG' },
  { name: 'Sarhad-e Broghil (Afghanistan - Wakhan)', pt: [73.44, 37.00], expectedOwner: 'AFG' },
  { name: 'Lago Zorkul (Pamir - Frontiera URSS)', pt: [73.68, 37.45], expectedOwner: 'SOV' },
  { name: 'Passo Tegermansu (Triplo confine URSS-Afghanistan-Cina)', pt: [74.88, 37.22], expectedOwner: 'XIN' },

  // Afghanistan - Iran frontier
  { name: 'Taybad (Iran - Confine Islam Qala)', pt: [60.77, 34.73], expectedOwner: 'IRN' },
  { name: 'Islam Qala / Eslam Qaleh (Afghanistan)', pt: [61.06, 34.66], expectedOwner: 'AFG' },
  { name: 'Zabol (Iran - Sistan)', pt: [61.49, 31.03], expectedOwner: 'IRN' },
  { name: 'Zaranj (Afghanistan - Nimruz)', pt: [61.86, 30.96], expectedOwner: 'AFG' },

  // Afghanistan - British Raj frontier (Durand Line)
  { name: 'Kabul (Capitale dell\'Afghanistan)', pt: [69.17, 34.53], expectedOwner: 'AFG' },
  { name: 'Jalalabad (Afghanistan)', pt: [70.45, 34.43], expectedOwner: 'AFG' },
  { name: 'Passo Khyber (British Raj / Frontiera)', pt: [71.15, 34.10], expectedOwner: 'RAJ' },
  { name: 'Peshawar (British Raj)', pt: [71.54, 34.01], expectedOwner: 'RAJ' },
  { name: 'Kandahar (Afghanistan)', pt: [65.71, 31.62], expectedOwner: 'AFG' },
  { name: 'Quetta (British Raj - Belucistan)', pt: [67.01, 30.18], expectedOwner: 'RAJ' },

  // Iran - British Raj frontier
  { name: 'Zahedan (Iran - Belucistan)', pt: [60.86, 29.49], expectedOwner: 'IRN' },
  { name: 'Taftan (British Raj - Stazione di Confine)', pt: [61.58, 28.97], expectedOwner: 'RAJ' },
  { name: 'Chah Bahar / Chabahar (Iran - Golfo di Oman)', pt: [60.64, 25.29], expectedOwner: 'IRN' }
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
    const isExpected = !sp.expectedOwner || owner === sp.expectedOwner;
    if (!isExpected) {
      console.warn(`⚡ DISCREPANZA: ${sp.name} -> proprietario ${owner} (atteso: ${sp.expectedOwner}) [Feature: ${f.id || f.properties?.NAME}]`);
      errors++;
    } else {
      console.log(`✓ ${sp.name.padEnd(54)} -> ${owner.padEnd(5)} | ${res.name} [${f.id || f.properties?.NAME}]`);
    }
  }
}

console.log('\n--- RIEPILOGO AUDIT FRONTIERA URSS - AFGHANISTAN - IRAN ---');
console.log(`Punti strategici analizzati: ${testPoints.length}`);
console.log(`Buchi Neri rilevati: ${holes}`);
console.log(`Sovrapposizioni (Overlaps) rilevate: ${overlaps}`);
console.log(`Discrepanze di attribuzione storica: ${errors}`);

if (holes === 0 && overlaps === 0 && errors === 0) {
  console.log('\n🌟 PERFEZIONE TOPOLOGICA E STORICA CERTIFICATA! Confine URSS-Afghanistan-Iran impeccabile.');
} else {
  process.exit(1);
}
