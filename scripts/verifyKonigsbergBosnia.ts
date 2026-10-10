import { PRECISION_HISTORICAL_FEATURES } from '../src/data/historicalBorders';
import { resolveHistoricalTruth } from '../src/data/historicalEngine';
import * as d3 from 'd3';

console.log('--- Checking Königsberg and Bosnia features ---');
const konigsberg = PRECISION_HISTORICAL_FEATURES.find(f => f.id === 'DE_HIST_KONIGSBERG');
console.log('Konigsberg feature found:', !!konigsberg);
if (konigsberg) {
  const r0 = resolveHistoricalTruth(konigsberg, 0);
  console.log('Konigsberg step 0 owner:', r0.o, r0.name, r0.historicalContext);
  console.log('Contains [20.5, 54.7]:', d3.geoContains(konigsberg, [20.5, 54.7]));
}

const bosnia = PRECISION_HISTORICAL_FEATURES.find(f => f.id === 'YUG_HIST_BOSNIA');
console.log('Bosnia feature found:', !!bosnia);
if (bosnia) {
  const r0 = resolveHistoricalTruth(bosnia, 0);
  console.log('Bosnia step 0 owner:', r0.o, r0.name, r0.historicalContext);
  console.log('Contains [18.0, 44.0]:', d3.geoContains(bosnia, [18.0, 44.0]));
}
