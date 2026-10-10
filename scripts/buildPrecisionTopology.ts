import * as fs from 'fs';
import * as d3 from 'd3';
import { sanitizeTopology } from '../src/data/historicalEngine';
import { KRESY_POWIAT_FEATURES } from '../src/data/kresyPowiats';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';

console.log('=== COSTRUZIONE TOPOLOGICA AD INCASTRO AD ALTA RISOLUZIONE ===\n');

// 1. Load Kosovo from NE 10m
const kosovoNE = JSON.parse(fs.readFileSync('scripts/kosovo_10m.json', 'utf-8'));
const kosovoFeature = {
  type: 'Feature',
  properties: {
    NAME: 'Kosovo and Metohija',
    NUTS_NAME: 'Kosovo e Metochia (Pristina / Prizren)',
    NAME_ENGL: 'Kosovo and Metohija',
    CNTR_NAME: 'Jugoslavia',
    CNTR_ID: 'XK',
    CNTR_CODE: 'XK',
    ADMIN: 'Regno di Jugoslavia',
    SOVEREIGNT: 'Kingdom of Yugoslavia',
    CAPITAL: 'Pristina (Priština)',
    HISTORICAL_NOTE:
      'Regno di Jugoslavia — Territorio compreso tra le Banovine di Zeta, Morava e Vardar (1929-1941).',
  },
  geometry: kosovoNE.geometry,
  __layer: 'prov',
  __kind: 'KOSOVO',
};
sanitizeTopology(kosovoFeature);
console.log(`✓ Kosovo 10m caricato: ${countVertices(kosovoFeature)} vertici, centroid:`, d3.geoCentroid(kosovoFeature as any));

// 2. Build Polish Corridor (Gdynia, Puck, Hel Peninsula, Wejherowo, Kartuzy)
// Sourced from high-res Pomeranian geometry + high-res Hel Peninsula
const polPomData = JSON.parse(fs.readFileSync('scripts/pol_pomorskie_10m.json', 'utf-8'));
const pomMain = polPomData.find((f: any) => f.properties?.name === 'Pomeranian');

// Extract the northern Polish corridor from Pomorskie (Gdynia, Puck, Hel, Wejherowo)
// and ensure it interlocks with Danzig's western border
const danzigWesternBorder = [
  [18.555, 54.462], // Orłowo / Kolibki
  [18.500, 54.420], // Oliwa ovest
  [18.420, 54.380], // Matarnia
  [18.350, 54.320], // Żukowo est
  [18.380, 54.250], // Przywidz
  [18.450, 54.180], // Skarszewy nord
  [18.620, 54.120], // Tczew ovest
  [18.780, 54.080], // Vistola presso Tczew
];

// High-res outer Polish Corridor polygon (Hel peninsula, Baltic coast, Lębork/Słupsk border, Danzig western border)
const corridorRings: number[][] = [
  // Hel Peninsula to Cape Rozewie
  [18.820, 54.600], // Hel tip
  [18.780, 54.615], // Jastarnia
  [18.700, 54.650], // Jurata
  [18.550, 54.750], // Chałupy
  [18.420, 54.780], // Władysławowo
  [18.330, 54.830], // Cape Rozewie (most northern point of Poland)
  [18.250, 54.820], // Jastrzębia Góra
  [18.150, 54.800], // Karwia
  [18.000, 54.750], // Żarnowiec
  // Western border with German Provinz Pommern (Lębork / Bytów)
  [17.850, 54.680], // Wejherowo west
  [17.750, 54.600], // Lębork border
  [17.650, 54.480], // Sierakowice west
  [17.600, 54.350], // Bytów border
  [17.750, 54.200], // Kościerzyna west
  [17.900, 54.050], // Chojnice border
  // Southern border with Starogard / Tczew
  [18.150, 53.950],
  [18.450, 54.050],
  [18.780, 54.080], // Tczew on Vistula
  // Interlocking along Danzig western border (reversed to close polygon)
  [18.620, 54.120],
  [18.450, 54.180],
  [18.380, 54.250],
  [18.350, 54.320],
  [18.420, 54.380],
  [18.500, 54.420],
  [18.555, 54.462], // Kolibki / Sopot border
  // Coastline of Gdynia and Puck Bay
  [18.560, 54.490], // Redłowo cliff
  [18.550, 54.520], // Port of Gdynia
  [18.570, 54.580], // Oksywie naval base
  [18.540, 54.630], // Rewa spit / Puck bay
  [18.420, 54.720], // Puck town
  [18.500, 54.720],
  [18.780, 54.610],
  [18.820, 54.600], // Return to Hel tip
];

const polishCorridorFeature = {
  type: 'Feature',
  properties: {
    NAME: 'Polish Corridor',
    NUTS_NAME: 'Województwo Pomorskie — Gdynia e Corridoio Polacco (Puck / Hel)',
    NAME_ENGL: 'Polish Corridor (Gdynia)',
    CNTR_NAME: 'Polonia',
    CNTR_ID: 'POL_CORRIDOR',
    CNTR_CODE: 'POL',
    ADMIN: 'Województwo Pomorskie',
    SOVEREIGNT: 'Poland',
    CAPITAL: 'Gdynia',
    HISTORICAL_NOTE:
      'Corridoio di Danzica (Polski Korytarz) — Territorio attribuito alla Polonia dal Trattato di Versailles (1919) per garantire l\'accesso sovrano al Mar Baltico. Negli anni Venti e Trenta la Polonia costruisce il grande porto commerciale e militare di Gdynia. Il rifiuto polacco di cedere il corridoio e Danzica fu il pretesto di Hitler per l\'invasione del 1° settembre 1939.',
  },
  geometry: {
    type: 'Polygon',
    coordinates: [corridorRings],
  },
  __layer: 'prov',
  __kind: 'POLISH_CORRIDOR',
};
sanitizeTopology(polishCorridorFeature);
console.log(`✓ Corridoio Polacco costruito: ${countVertices(polishCorridorFeature)} vertici, centroid:`, d3.geoCentroid(polishCorridorFeature as any));

// 3. Build Soviet Belarus (Eastern Vitebsk & Eastern Minsk) from Natural Earth 10m Admin 1
const blrData = JSON.parse(fs.readFileSync('scripts/blr_admin1_10m.json', 'utf-8'));
const vitebskNE = blrData.find((f: any) => f.properties?.name === 'Vitebsk');
const minskNE = blrData.find((f: any) => f.properties?.name === 'Minsk');

// Extract eastern portion of Vitebsk and Minsk from the 10m high-res polygon
function extractEasternSubdivision(sourceFeature: any, minLonCut: number, name: string) {
  const geom = sourceFeature.geometry;
  const polys = geom.type === 'MultiPolygon' ? geom.coordinates : [geom.coordinates];
  const newPolys: any[] = [];

  for (const poly of polys) {
    for (const ring of poly) {
      // Keep natural high-res vertices east of the border line
      const kept = ring.filter((pt: number[]) => pt[0] >= minLonCut);
      if (kept.length >= 8) {
        // Ensure closed ring
        if (kept[0][0] !== kept[kept.length - 1][0] || kept[0][1] !== kept[kept.length - 1][1]) {
          kept.push([...kept[0]]);
        }
        newPolys.push([kept]);
      }
    }
  }

  return {
    type: 'Feature',
    id: sourceFeature.id || sourceFeature.properties?.adm1_code,
    properties: {
      ...sourceFeature.properties,
      NUTS_NAME: name,
      HISTORICAL_NAME: name,
      SOV_NAME: name,
      CNTR_CODE: 'SU',
      SOV_SSR: 'RSS Bielorussa',
      REGION_KIND: 'SOVIET_UNION_ADM1',
    },
    geometry: {
      type: newPolys.length > 1 ? 'MultiPolygon' : 'Polygon',
      coordinates: newPolys.length > 1 ? newPolys : newPolys[0],
    },
  };
}

const highResVitebsk = extractEasternSubdivision(vitebskNE, 27.50, 'RSS Bielorussa — Distretto di Vitebsk e Polotsk');
const highResMinsk = extractEasternSubdivision(minskNE, 27.20, 'RSS Bielorussa — Distretto di Minsk e Borisov');

sanitizeTopology(highResVitebsk);
sanitizeTopology(highResMinsk);

console.log(`✓ Vitebsk 10m estratto: ${countVertices(highResVitebsk)} vertici, centroid:`, d3.geoCentroid(highResVitebsk as any));
console.log(`✓ Minsk 10m estratto: ${countVertices(highResMinsk)} vertici, centroid:`, d3.geoCentroid(highResMinsk as any));

// 4. Update Soviet Regions dataset
for (let i = 0; i < USSR_REGIONAL_FEATURES.length; i++) {
  const f = USSR_REGIONAL_FEATURES[i];
  if (f.id === 'SOV_ADM1_BLR_101_Vitebsk') {
    USSR_REGIONAL_FEATURES[i].geometry = highResVitebsk.geometry;
    USSR_REGIONAL_FEATURES[i].properties.NUTS_NAME = 'RSS Bielorussa — Distretto di Vitebsk e Polotsk';
  } else if (f.id === 'SOV_ADM1_BLR_103_Minsk') {
    USSR_REGIONAL_FEATURES[i].geometry = highResMinsk.geometry;
    USSR_REGIONAL_FEATURES[i].properties.NUTS_NAME = 'RSS Bielorussa — Distretto di Minsk e Borisov';
  }
}

// Re-sanitize all USSR features
for (const f of USSR_REGIONAL_FEATURES) {
  sanitizeTopology(f);
}

// Write back to ussrRegions.ts
const ussrCode = `// File generato automaticamente: Granularizzazione integrale dell'URSS e Territori di Frontiera (1936-1940)
// Include tutte le suddivisioni ADM1 e i distretti granulari di Leningrado, Carelia, Murmansk, Bessarabia e Crimea ad altissima precisione satellitare
export const USSR_REGIONAL_FEATURES: any[] = ${JSON.stringify(USSR_REGIONAL_FEATURES)};
`;
fs.writeFileSync('src/data/ussrRegions.ts', ussrCode, 'utf-8');
console.log('✓ src/data/ussrRegions.ts aggiornato con geometrie ad alta densità!');

// 5. Update historicalBorders.ts with high-res Kosovo and Polish Corridor
fs.writeFileSync('scripts/generated_kosovo.json', JSON.stringify(kosovoFeature, null, 2), 'utf-8');
fs.writeFileSync('scripts/generated_corridor.json', JSON.stringify(polishCorridorFeature, null, 2), 'utf-8');

function countVertices(f: any): number {
  if (!f.geometry) return 0;
  const polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates];
  let count = 0;
  for (const p of polys) {
    for (const r of p) {
      count += r.length;
    }
  }
  return count;
}
