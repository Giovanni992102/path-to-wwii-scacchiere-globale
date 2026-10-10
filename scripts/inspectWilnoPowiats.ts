import { KRESY_POWIAT_FEATURES } from '../src/data/kresyPowiats';
import * as d3 from 'd3';

console.log('Kresy Powiat Features matching Wilno / Troki / etc:');
const wilnoPowiats = KRESY_POWIAT_FEATURES.filter(f => {
  const bb = d3.geoBounds(f);
  // around Lon: 23..27, Lat: 53.5..56.0
  return bb[1][0] >= 23 && bb[0][0] <= 27 && bb[1][1] >= 53.5 && bb[0][1] <= 56.0;
});

wilnoPowiats.forEach(f => {
  const bb = d3.geoBounds(f);
  console.log(`- ${f.id}: "${f.properties?.name || f.properties?.NUTS_NAME}" bbox: [${bb[0].map(v => v.toFixed(3))}] to [${bb[1].map(v => v.toFixed(3))}]`);
});
