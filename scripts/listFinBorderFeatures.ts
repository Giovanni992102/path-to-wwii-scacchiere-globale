import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';

console.log('Total features:', USSR_REGIONAL_FEATURES.length);

const finOrBorder = USSR_REGIONAL_FEATURES.filter(f => {
  const str = JSON.stringify(f.properties || {});
  return str.includes('Salla') || str.includes('Alakurtti') || str.includes('Kantalahti') || str.includes('Kandalaksha') || str.includes('Kovdor') || str.includes('FIN_') || str.includes('Murmansk') || str.includes('Carelia');
});

console.log(`Found ${finOrBorder.length} border/Fin features:`);
for (const f of finOrBorder) {
  console.log(` - ${f.id}: ${f.properties.NUTS_NAME} (CNTR_CODE: ${f.properties.CNTR_CODE})`);
}
