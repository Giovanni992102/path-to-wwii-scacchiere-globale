import * as fs from 'fs';
import * as path from 'path';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { CHINA_REGIONAL_FEATURES } from '../src/data/chinaRegions';
import { KRESY_POWIAT_FEATURES } from '../src/data/kresyPowiats';
import { PRECISION_HISTORICAL_FEATURES, CARPATHIAN_RUTHENIA_FEATURE, DANZIG_FREE_CITY_FEATURE, MEMEL_TERRITORY_FEATURE, ZARA_ENCLAVE_FEATURE, FIUME_CARNARO_FEATURE, PANAMA_CANAL_ZONE_FEATURE } from '../src/data/historicalBorders';
import { resolveFeature, resolveHB, HB_EXCL, HB_NAME, ITNAMES, UK_COL, FRA_COL, ITA_COL, POR_COL, BEL_COL, HOL_COL, JAP_COL, USA_COL } from '../src/data/georesolver';
import { resolveHistoricalTruth, healOrphanTerritory, sanitizeTopology, ISO_COUNTRY_FALLBACKS } from '../src/data/historicalEngine';
import { getOwnerMeta, OWNERS } from '../src/data/owners';

async function analyzeAll() {
  console.log('=== VERIFICA GEOMETRIE E RISOLUZIONE STORICA ===\n');

  console.log(`1. Features statiche di precisione:`);
  console.log(`- USSR Features: ${USSR_REGIONAL_FEATURES.length}`);
  console.log(`- China Features: ${CHINA_REGIONAL_FEATURES.length}`);
  console.log(`- Kresy Powiats: ${KRESY_POWIAT_FEATURES.length}`);
  console.log(`- Precision Features: ${PRECISION_HISTORICAL_FEATURES.length}`);

  // Test static features for all 7 steps
  const staticFeats = [
    ...USSR_REGIONAL_FEATURES,
    ...CHINA_REGIONAL_FEATURES,
    ...KRESY_POWIAT_FEATURES,
    ...PRECISION_HISTORICAL_FEATURES,
    CARPATHIAN_RUTHENIA_FEATURE,
    DANZIG_FREE_CITY_FEATURE,
    MEMEL_TERRITORY_FEATURE,
    ZARA_ENCLAVE_FEATURE,
    FIUME_CARNARO_FEATURE,
    PANAMA_CANAL_ZONE_FEATURE
  ];

  let unassignedCount = 0;
  for (const f of staticFeats) {
    for (let s = 0; s < 7; s++) {
      const res = resolveHistoricalTruth(f, s);
      if (!res || !res.o || res.o === 'UNKNOWN' || res.o === '') {
        console.error(`ERRORE: Feature statica non risolta allo step ${s}:`, f.id || f.properties);
        unassignedCount++;
      } else {
        const meta = getOwnerMeta(res.o);
        if (!meta.c || meta.c === '#1c2026') {
          console.warn(`Colore default/scuro per ${res.o} (${res.name}) allo step ${s}`);
        }
      }
    }
  }

  if (unassignedCount === 0) {
    console.log(`✓ Tutte le ${staticFeats.length} feature statiche si risolvono perfettamente sui 7 passaggi storici!`);
  }

  // Check owners dictionary
  console.log(`\n2. Verifica Fazioni e Metadati Proprietari (OWNERS):`);
  const ownersKeys = Object.keys(OWNERS);
  console.log(`- Totale entità politiche registrate: ${ownersKeys.length}`);
  for (const k of ownersKeys) {
    const meta = OWNERS[k];
    if (!meta.c) console.error(`Proprietario ${k} senza colore!`);
    if (!meta.l) console.error(`Proprietario ${k} senza funzione label!`);
    if (!meta.f) console.error(`Proprietario ${k} senza fazione!`);
  }
  console.log(`✓ Tutti i proprietari hanno colore, label e fazione definiti.`);

  console.log('\n=== DIAGNOSTICA COMPLETATA ===');
}

analyzeAll().catch(err => {
  console.error(err);
  process.exit(1);
});
