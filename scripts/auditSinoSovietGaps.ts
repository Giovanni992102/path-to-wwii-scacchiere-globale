import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { CHINA_REGIONAL_FEATURES } from '../src/data/chinaRegions';
import { WORLD_1938_GEOJSON } from '../src/data/world1938';
import { HB_EXCL } from '../src/data/georesolver';
import polygonClipping from 'polygon-clipping';
import * as d3 from 'd3';

function toGeom(g: any): any[] {
  if (!g) return [];
  if (g.type === 'Polygon') return [g.coordinates];
  if (g.type === 'MultiPolygon') return g.coordinates;
  return [];
}

function polyAreaSqKm(geom: any): number {
  if (!geom) return 0;
  try {
    let total = 0;
    if (geom.type === 'Polygon') {
      let a = d3.geoArea({ type: 'Feature', geometry: geom, properties: {} });
      if (a > 2 * Math.PI) a = 4 * Math.PI - a;
      total += a * 6371 * 6371;
    } else if (geom.type === 'MultiPolygon') {
      for (const coords of geom.coordinates) {
        let a = d3.geoArea({ type: 'Feature', geometry: { type: 'Polygon', coordinates: coords }, properties: {} });
        if (a > 2 * Math.PI) a = 4 * Math.PI - a;
        total += a * 6371 * 6371;
      }
    }
    return total;
  } catch (e) {
    return 0;
  }
}

async function findGapsAndOverlaps() {
  console.log('=== RIGOROUS SINO-SOVIET BORDER GAP & OVERLAP AUDIT ===\n');

  // 1. Check Xinjiang in HB
  console.log('--- 1. HB EXCLUSIONS AUDIT ---');
  console.log('HB_EXCL contains Xinjiang:', HB_EXCL.has('Xinjiang'));
  console.log('HB_EXCL contains Tibet:', HB_EXCL.has('Tibet'));
  console.log('HB_EXCL contains Hong Kong:', HB_EXCL.has('Hong Kong'));
  const hbXin = WORLD_1938_GEOJSON.features.find(f => f.properties?.NAME === 'Xinjiang');
  console.log('HB has Xinjiang feature:', !!hbXin);

  // 2. Focus Area 1: Far East (Amur, Ussuri, Argun)
  // USSR: Zabaykalsky, Amur, Jewish AO, Khabarovsk, Primorsky
  // China: CHN_MANCHUKUO_XINGAN_NORTH, CHN_HEILONGJIANG, CHN_JILIN
  console.log('\n--- 2. FOCUS AREA 1: FAR EAST / MANCHUKUO - USSR FRONTIER ---');
  const manUssrFeats = USSR_REGIONAL_FEATURES.filter(u =>
    /Zabaykalsky|Amur_Oblast|Jewish_Autonomous|Khabarovsk_Krai|Primorsky_Krai/i.test(u.id)
  );
  const manChinaFeats = CHINA_REGIONAL_FEATURES.filter(c =>
    /MANCHUKUO_XINGAN_NORTH|HEILONGJIANG|JILIN/i.test(c.id)
  );

  console.log('USSR Far East features:', manUssrFeats.map(f => f.id));
  console.log('Manchuria China features:', manChinaFeats.map(f => f.id));

  // Compute union of USSR Far East
  let ussrFarEastUnion = toGeom(manUssrFeats[0].geometry);
  for (let i = 1; i < manUssrFeats.length; i++) {
    ussrFarEastUnion = polygonClipping.union(ussrFarEastUnion, toGeom(manUssrFeats[i].geometry));
  }

  // Compute union of Manchuria
  let manchuriaUnion = toGeom(manChinaFeats[0].geometry);
  for (let i = 1; i < manChinaFeats.length; i++) {
    manchuriaUnion = polygonClipping.union(manchuriaUnion, toGeom(manChinaFeats[i].geometry));
  }

  // Overlap between Manchuria and USSR Far East
  const manOverlap = polygonClipping.intersection(manchuriaUnion, ussrFarEastUnion);
  const manOverlapArea = polyAreaSqKm({ type: 'MultiPolygon', coordinates: manOverlap });
  console.log(`Manchuria vs USSR Far East Overlap: ${manOverlapArea.toFixed(4)} km²`);

  // Now, what about GAPS along the border?
  // Let's create an envelope / bounding zone along the border:
  // Lon: 115 to 135, Lat: 42 to 54
  // Union of Manchuria + USSR Far East
  const combinedFarEast = polygonClipping.union(manchuriaUnion, ussrFarEastUnion);
  // Check if combinedFarEast has internal rings (holes / gaps)!
  let farEastHolesCount = 0;
  let farEastHolesArea = 0;
  for (const poly of combinedFarEast) {
    if (poly.length > 1) {
      // There are internal holes!
      for (let r = 1; r < poly.length; r++) {
        const holeGeom = { type: 'Polygon', coordinates: [poly[r]] };
        const hArea = polyAreaSqKm(holeGeom);
        // Check if hole is located along the border (Lon > 115, Lat between 42 and 54)
        console.log(`  -> HOLE / BUCO NERO in Far East border union: ${hArea.toFixed(2)} km² (first pt: [${poly[r][0][0]}, ${poly[r][0][1]}])`);
        farEastHolesCount++;
        farEastHolesArea += hArea;
      }
    }
  }
  console.log(`Total Far East internal holes / gaps: ${farEastHolesCount}, total area: ${farEastHolesArea.toFixed(2)} km²`);

  // 3. Focus Area 2: Central Asia / Xinjiang - USSR Frontier
  // USSR: Gorno-Badakhshan, Osh, Naryn, Issyk-Kul, Almaty, East Kazakhstan, Altai Republic
  // China: CHN_XINJIANG
  console.log('\n--- 3. FOCUS AREA 2: CENTRAL ASIA / XINJIANG - USSR FRONTIER ---');
  const xinUssrFeats = USSR_REGIONAL_FEATURES.filter(u =>
    /Gorno_Badakhshan|Osh_Region|Naryn_Region|Issyk_Kul|Almaty|East_Kazakhstan|Altai_Republic/i.test(u.id)
  );
  const xinChinaFeat = CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_XINJIANG')!;

  console.log('USSR Central Asia border features:', xinUssrFeats.map(f => f.id));

  let ussrCentralAsiaUnion = toGeom(xinUssrFeats[0].geometry);
  for (let i = 1; i < xinUssrFeats.length; i++) {
    ussrCentralAsiaUnion = polygonClipping.union(ussrCentralAsiaUnion, toGeom(xinUssrFeats[i].geometry));
  }
  const xinGeom = toGeom(xinChinaFeat.geometry);

  const xinOverlap = polygonClipping.intersection(xinGeom, ussrCentralAsiaUnion);
  const xinOverlapArea = polyAreaSqKm({ type: 'MultiPolygon', coordinates: xinOverlap });
  console.log(`Xinjiang vs USSR Central Asia Overlap: ${xinOverlapArea.toFixed(4)} km²`);

  const combinedCentralAsia = polygonClipping.union(xinGeom, ussrCentralAsiaUnion);
  let centralAsiaHolesCount = 0;
  let centralAsiaHolesArea = 0;
  for (const poly of combinedCentralAsia) {
    if (poly.length > 1) {
      for (let r = 1; r < poly.length; r++) {
        const holeGeom = { type: 'Polygon', coordinates: [poly[r]] };
        const hArea = polyAreaSqKm(holeGeom);
        console.log(`  -> HOLE / BUCO NERO in Central Asia union: ${hArea.toFixed(2)} km² (first pt: [${poly[r][0][0]}, ${poly[r][0][1]}])`);
        centralAsiaHolesCount++;
        centralAsiaHolesArea += hArea;
      }
    }
  }
  console.log(`Total Central Asia internal holes / gaps: ${centralAsiaHolesCount}, total area: ${centralAsiaHolesArea.toFixed(2)} km²`);

  // 4. Focus Area 3: Mongolia interface with China and USSR
  console.log('\n--- 4. FOCUS AREA 3: MONGOLIA INTERFACE ---');
  const monHb = WORLD_1938_GEOJSON.features.find(f => f.properties?.NAME === 'Mongolia')!;
  const monGeom = toGeom(monHb.geometry);
  console.log('Mongolia geometry parts:', monGeom.length);

  // Neighbors of Mongolia:
  // USSR: Altai Republic, Tuva, Buryatia, Zabaykalsky
  // China: Xinjiang, Gansu, Mengjiang (CHN_INNER_MONGOLIA), Xing'an North, Xing'an South
  const monNeighbors = [
    ...USSR_REGIONAL_FEATURES.filter(u => /Altai_Republic|Tuva|Buryatia|Zabaykalsky/i.test(u.id)).map(f => toGeom(f.geometry)),
    xinGeom,
    toGeom(CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_GANSU')!.geometry),
    toGeom(CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_INNER_MONGOLIA')!.geometry),
    toGeom(CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_MANCHUKUO_XINGAN_NORTH')!.geometry),
    toGeom(CHINA_REGIONAL_FEATURES.find(c => c.id === 'CHN_MANCHUKUO_XINGAN_SOUTH')!.geometry),
  ];

  let monNeighborsUnion = monNeighbors[0];
  for (let i = 1; i < monNeighbors.length; i++) {
    monNeighborsUnion = polygonClipping.union(monNeighborsUnion, monNeighbors[i]);
  }

  const monOverlap = polygonClipping.intersection(monGeom, monNeighborsUnion);
  const monOverlapArea = polyAreaSqKm({ type: 'MultiPolygon', coordinates: monOverlap });
  console.log(`Mongolia vs Neighbors Overlap: ${monOverlapArea.toFixed(4)} km²`);

  const combinedMon = polygonClipping.union(monGeom, monNeighborsUnion);
  let monHolesCount = 0;
  let monHolesArea = 0;
  for (const poly of combinedMon) {
    if (poly.length > 1) {
      for (let r = 1; r < poly.length; r++) {
        const holeGeom = { type: 'Polygon', coordinates: [poly[r]] };
        const hArea = polyAreaSqKm(holeGeom);
        if (hArea > 1) {
          console.log(`  -> HOLE / BUCO NERO around Mongolia: ${hArea.toFixed(2)} km² (first pt: [${poly[r][0][0]}, ${poly[r][0][1]}])`);
          monHolesCount++;
          monHolesArea += hArea;
        }
      }
    }
  }
  console.log(`Total Mongolia interface holes / gaps: ${monHolesCount}, total area: ${monHolesArea.toFixed(2)} km²`);
}

findGapsAndOverlaps().catch(console.error);
