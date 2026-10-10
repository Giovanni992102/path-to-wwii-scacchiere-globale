import * as d3 from 'd3';
import { geoContains, geoArea } from 'd3-geo';

// The void polygon ring
const voidRing: [number, number][] = [
  [44.40957003300715, 39.42656236012963],
  [44.502168001264785, 39.716578359895685],
  [44.60991836432823, 39.778128518119416],
  [44.68062954008861, 39.735356374269024],
  [44.736188321043194, 39.70197323760531],
  [44.749657116426114, 39.68945456135641],
  [44.40957003300715, 39.42656236012963],
];

const voidFeature = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [voidRing]
  }
};

const area = geoArea(voidFeature as any);
const km2 = (area / (4 * Math.PI)) * 510072000;
console.log('Void polygon area:', Math.round(km2), 'km²');
console.log('Spherical area (steradians):', area);

// Check if winding is correct
if (area > 2 * Math.PI) {
  console.log('Winding needs reversal!');
} else {
  console.log('Winding is correct! (Area < 2pi)');
}

// Now let's test if all the 123 points found earlier are inside this polygon!
const testPts = [
  [44.46, 39.48],
  [44.5, 39.52],
  [44.54, 39.56],
  [44.58, 39.60],
  [44.62, 39.64],
  [44.66, 39.68],
  [44.50, 39.70],
  [44.60, 39.74],
];

testPts.forEach(pt => {
  console.log(`Pt [${pt[0]}, ${pt[1]}] inside void polygon?`, geoContains(voidFeature as any, pt as any));
});
