import fs from 'fs';

// Let's read src/App.tsx and extract the entire runSelfTests function!
const appContent = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = appContent.indexOf('const runSelfTests = useCallback(() => {');
const endIdx = appContent.indexOf('}, [addLog]);');

const runSelfTestsCode = appContent.slice(startIdx, endIdx + 15);

// Let's create an executable script that imports what App.tsx imports and executes runSelfTests
const runnerScript = `
import { getExtendedToponym } from '../src/data/historicalToponyms';
import {
  NUTS_URLS,
  CNTR_URLS,
  HB_URL1,
  HB_EXCL,
  HB_NAME,
  METRO_FRAG,
  assignUnnamedHB,
  resolveFeature,
  resolveHB,
  makeResult,
} from '../src/data/georesolver';
import {
  PRECISION_HISTORICAL_FEATURES,
  CARPATHIAN_RUTHENIA_FEATURE,
  DANZIG_FREE_CITY_FEATURE,
  MEMEL_TERRITORY_FEATURE,
  ZARA_ENCLAVE_FEATURE,
  ZADAR_DALMATIA_FEATURE,
  FIUME_CARNARO_FEATURE,
  CROATIAN_LITTORAL_FEATURE,
  PANAMA_CANAL_ZONE_FEATURE,
  TURKEY_MOUNT_ARARAT_FEATURE,
  FRENCH_GUIANA_FEATURE,
} from '../src/data/historicalBorders';
import { CZECHOSLOVAKIA_REGIONAL_FEATURES } from '../src/data/czechoslovakiaRegions';
import { getCountryFlagSvg } from '../src/data/historicalFlags';
import { getOwnerMeta } from '../src/data/owners';

const addLog = (text: string, type?: string) => {
  console.log('[LOG ' + type + ']: ' + text);
};
const useCallback = (fn: any, _deps?: any[]) => fn;

${runSelfTestsCode}

console.log('--- EXECUTING runSelfTests() FROM App.tsx ---');
runSelfTests();
`;

fs.writeFileSync('scripts/execAppSelfTests.ts', runnerScript, 'utf8');
console.log('Created scripts/execAppSelfTests.ts');
