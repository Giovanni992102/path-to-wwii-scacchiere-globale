import fs from 'fs';
import esbuild from 'esbuild';
import { loadUnifiedGeoDatabase } from '../src/data/unifiedGeoDatabase';
import { processHistoricalCartographyPipeline } from '../src/data/historicalEngine';
import { resolveFeature, resolveHB, HB_NAME } from '../src/data/georesolver';
import { getExtendedToponym } from '../src/data/historicalToponyms';
import { getCountryFlagSvg } from '../src/data/historicalFlags';
import { getOwnerMeta, getOverlord, isSubjectOf } from '../src/data/owners';
import { BALKAN_DISTRICTS_CATALOG, resolveBalkansToponym } from '../src/data/balkanDistricts';
import { STEPS } from '../src/data/historySteps';
import { FRANCE_PROVINCES_META, resolveFranceProvince } from '../src/data/franceProvinces';
import { UK_PROVINCES_META, resolveUKProvince } from '../src/data/ukProvinces';
import { IT_PROVINCES_META, resolveItalyProvince } from '../src/data/italyProvinces';
import { SPAIN_PROVINCES_META, resolveSpainProvince } from '../src/data/spainProvinces';
import { SOVIET_PROVINCES_META, resolveSovietProvince } from '../src/data/sovietProvinces';
import {
  HISTORICAL_FORTIFICATION_LINES,
  HISTORICAL_NAVAL_BASES,
  getDynamicNavalBaseStatus,
} from '../src/data/historicalFortifications';
import {
  HISTORICAL_SEA_LANES,
  getDynamicSeaLaneStatus,
} from '../src/data/historicalSeaLanes';
import { getStrategicIslandLabel } from '../src/components/TacticalMap';

async function verifyAll() {
  const { provFeatures: provs, hbFeatures: hbs } = await loadUnifiedGeoDatabase();
  const pipeline = processHistoricalCartographyPipeline(provs, hbs, [], true);
  const loadedProvs = pipeline.provFeatures;
  const loadedHbs = pipeline.hbFeatures;

  const appSrc = fs.readFileSync('src/App.tsx', 'utf-8');
  const startIdx = appSrc.indexOf('const tests = [');
  const endIdx = appSrc.indexOf('let passed = 0;', startIdx);
  const testsCode = appSrc.slice(startIdx, endIdx);
  const jsCode = esbuild.transformSync(testsCode, { loader: 'ts' }).code;

  // Evaluate the tests in scope
  const evalFn = new Function(
    'loadedProvs', 'loadedHbs', 'resolveFeature', 'resolveHB', 'HB_NAME',
    'getExtendedToponym', 'getCountryFlagSvg', 'getOwnerMeta', 'getOverlord', 'isSubjectOf',
    'BALKAN_DISTRICTS_CATALOG', 'resolveBalkansToponym', 'STEPS', 'FRANCE_PROVINCES_META', 'resolveFranceProvince', 'UK_PROVINCES_META', 'resolveUKProvince', 'IT_PROVINCES_META', 'resolveItalyProvince', 'SPAIN_PROVINCES_META', 'resolveSpainProvince', 'SOVIET_PROVINCES_META', 'resolveSovietProvince',
    'HISTORICAL_FORTIFICATION_LINES', 'HISTORICAL_NAVAL_BASES', 'getDynamicNavalBaseStatus',
    'HISTORICAL_SEA_LANES', 'getDynamicSeaLaneStatus', 'getStrategicIslandLabel',
    `${jsCode}; return tests;`
  );

  const tests = evalFn(
    loadedProvs, loadedHbs, resolveFeature, resolveHB, HB_NAME,
    getExtendedToponym, getCountryFlagSvg, getOwnerMeta, getOverlord, isSubjectOf,
    BALKAN_DISTRICTS_CATALOG, resolveBalkansToponym, STEPS, FRANCE_PROVINCES_META, resolveFranceProvince, UK_PROVINCES_META, resolveUKProvince, IT_PROVINCES_META, resolveItalyProvince, SPAIN_PROVINCES_META, resolveSpainProvince, SOVIET_PROVINCES_META, resolveSovietProvince,
    HISTORICAL_FORTIFICATION_LINES, HISTORICAL_NAVAL_BASES, getDynamicNavalBaseStatus,
    HISTORICAL_SEA_LANES, getDynamicSeaLaneStatus, getStrategicIslandLabel
  );

  console.log(`Esecuzione di ${tests.length} test da App.tsx...`);
  let passed = 0;
  for (let i = 0; i < tests.length; i++) {
    const t = tests[i];
    try {
      const res = t.run();
      if (res) {
        passed++;
        console.log(`[PASS ${passed}/${tests.length}] ${t.name}`);
      } else {
        console.error(`[FAIL] ${t.name}`);
      }
    } catch (e: any) {
      console.error(`[ERROR] ${t.name}:`, e.message);
    }
  }

  console.log(`\nRisultato finale: ${passed}/${tests.length} test superati con successo!`);
  if (passed !== tests.length) {
    process.exit(1);
  }
}

verifyAll().catch(err => {
  console.error(err);
  process.exit(1);
});
