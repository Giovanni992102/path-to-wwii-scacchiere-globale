import fetch from 'node-fetch';
import * as topojson from 'topojson-client';
import { USSR_REGIONAL_FEATURES } from '../src/data/ussrRegions';
import { KRESY_POWIAT_FEATURES } from '../src/data/kresyPowiats';
import { CHINA_REGIONAL_FEATURES } from '../src/data/chinaRegions';
import { PRECISION_HISTORICAL_FEATURES } from '../src/data/historicalBorders';
import { HB_EXCL, METRO_FRAG, resolveFeature, resolveHB } from '../src/data/georesolver';
import { processHistoricalCartographyPipeline } from '../src/data/historicalEngine';
import * as d3 from 'd3';

async function audit() {
  console.log('=== AUDIT COMPLETO CARTEGGIO E VISUALIZZAZIONE MAPPA ===\n');

  console.log('1. Download dati reali usati da App.tsx...');
  const [topoNuts, topoWorld, hbGeo] = await Promise.all([
    fetch('https://gisco-services.ec.europa.eu/distribution/v2/nuts/topojson/NUTS_RG_10M_2021_4326_LEVL_3.json').then(r => r.json()),
    fetch('https://gisco-services.ec.europa.eu/distribution/v2/countries/topojson/CNTR_RG_20M_2020_4326.json').then(r => r.json()),
    fetch('https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/world_1938.geojson').then(r => r.json()),
  ]);

  const nutsK = Object.keys((topoNuts as any).objects)[0];
  const worldK = Object.keys((topoWorld as any).objects)[0];
  const nuts = (topojson.feature(topoNuts as any, (topoNuts as any).objects[nutsK]) as any).features;
  const world = (topojson.feature(topoWorld as any, (topoWorld as any).objects[worldK]) as any).features;
  const hb = (hbGeo as any).features;

  console.log(`- NUTS-3: ${nuts.length}`);
  console.log(`- CNTR: ${world.length}`);
  console.log(`- HB: ${hb.length}`);

  // Replicate exact App.tsx assembly
  const worldOut: any[] = [];
  let kal: any = null;
  for (const f of world) {
    const cid = (f.properties && (f.properties.CNTR_ID || f.properties.CNTR_CODE)) || '';
    if (cid === 'RU' && f.geometry) {
      const polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates];
      const keep: any[] = [];
      const kparts: any[] = [];
      for (const poly of polys) {
        let minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
        for (const ring of poly) for (const pt of ring) {
          if (pt[0] < minx) minx = pt[0];
          if (pt[0] > maxx) maxx = pt[0];
          if (pt[1] < miny) miny = pt[1];
          if (pt[1] > maxy) maxy = pt[1];
        }
        if (maxx < 24 && minx > 18 && miny > 53.5 && maxy < 56.2) kparts.push(poly);
        else keep.push(poly);
      }
      if (kparts.length) {
        kal = {
          type: 'Feature',
          properties: { NUTS_NAME: 'Königsberg', NAME_ENGL: 'Kaliningrad' },
          geometry: {
            type: kparts.length > 1 ? 'MultiPolygon' : 'Polygon',
            coordinates: kparts.length > 1 ? kparts : kparts[0],
          },
          __kind: 'KALININGRAD',
        };
      }
      if (keep.length) {
        worldOut.push({ ...f, geometry: { type: keep.length > 1 ? 'MultiPolygon' : 'Polygon', coordinates: keep.length > 1 ? keep : keep[0] } });
      }
    } else {
      worldOut.push(f);
    }
  }

  const provs: any[] = [];
  for (const f of nuts) {
    if (f.geometry) {
      if (f.properties && (f.properties.NUTS_ID === 'PL633' || f.properties.NUTS_CODE === 'PL633')) continue;
      f.__layer = 'prov';
      provs.push(f);
    }
  }
  if (kal) {
    kal.__layer = 'prov';
    provs.push(kal);
  }
  for (const hf of PRECISION_HISTORICAL_FEATURES) provs.push({ ...hf, __layer: 'prov' });
  for (const kf of KRESY_POWIAT_FEATURES) provs.push({ ...kf, __layer: 'prov' });
  for (const uf of USSR_REGIONAL_FEATURES) provs.push({ ...uf, __layer: 'prov' });
  for (const cf of CHINA_REGIONAL_FEATURES) provs.push({ ...cf, __layer: 'prov' });

  for (const wf of worldOut) {
    const cid = (wf.properties && (wf.properties.CNTR_ID || wf.properties.CNTR_CODE)) || '';
    if (cid === 'BA' || cid === 'XK' || cid === 'XKX' || cid === 'BIH') {
      provs.push({
        ...wf,
        properties: {
          ...wf.properties,
          CNTR_CODE: cid === 'BA' || cid === 'BIH' ? 'BA' : 'XK',
          NUTS_NAME: cid === 'BA' || cid === 'BIH' ? 'Bosnia ed Erzegovina' : 'Kosovo',
        },
        __layer: 'prov',
      });
    }
  }

  const hbs: any[] = [];
  for (const f of hb) {
    if (!f.geometry) continue;
    const rawNm = (f.properties || {}).NAME;
    if (rawNm === null || rawNm === undefined) continue;
    const nm = String(rawNm).trim();
    if (!nm || nm === 'null' || nm === 'None' || nm === 'undefined') continue;
    if (nm.toLowerCase().includes('antarctica') || nm.toLowerCase().includes('antarctic')) continue;

    if (HB_EXCL.has(nm)) {
      if (METRO_FRAG[nm]) {
        // overseas fragments
      }
    } else {
      f.__layer = 'hb';
      hbs.push(f);
    }
  }

  console.log(`\n2. Esecuzione Pipeline Cartografica su ${provs.length} provs e ${hbs.length} hbs...`);
  const pipeline = processHistoricalCartographyPipeline(provs, hbs, [], true);
  console.log(`Pipeline completata: ${pipeline.allFeatures.length} feature finali.`);

  // 3. Check for any feature whose area > Math.PI (inverted polygons)
  console.log('\n3. Controllo Poligoni Invertiti post-pipeline:');
  let postInverted = 0;
  for (const f of pipeline.allFeatures) {
    try {
      const a = d3.geoArea(f);
      if (a > Math.PI) {
        postInverted++;
        console.log(`- POST-PIPELINE INVERTITO: ${f.id || f.properties?.NUTS_NAME || f.properties?.NAME} (area: ${(a / (4*Math.PI)).toFixed(3)} globo)`);
      }
    } catch (e: any) {
      console.log(`- POST-PIPELINE ERRORE GEOM: ${f.id} -> ${e.message}`);
    }
  }
  console.log(`Totale post-pipeline invertiti: ${postInverted}`);

  // 4. Test spatial sample grid for "Black Holes"
  console.log('\n4. Test Grid Spaziale: Ricerca Buchi Neri sulla Terraferma...');
  // We test major land coordinates across Europe, USSR, Central Asia, Americas, Asia, Africa
  const samplePoints = [
    { name: 'Varsavia (Polonia)', pt: [21.0, 52.2] },
    { name: 'Cracovia (Polonia)', pt: [19.9, 50.0] },
    { name: 'Poznan (Polonia)', pt: [16.9, 52.4] },
    { name: 'Gdynia / Corridoio (Polonia)', pt: [18.5, 54.5] },
    { name: 'Wilno / Vilnius (Kresy/Lituania)', pt: [25.3, 54.7] },
    { name: 'Brest (Kresy)', pt: [23.7, 52.1] },
    { name: 'Grodno (Kresy)', pt: [23.8, 53.7] },
    { name: 'Lwów (Kresy)', pt: [24.0, 49.8] },
    { name: 'Tarnopol (Kresy)', pt: [25.6, 49.5] },
    { name: 'Pinsk (Kresy)', pt: [26.1, 52.1] },
    { name: 'Helsinki (Finlandia)', pt: [24.9, 60.2] },
    { name: 'Tampere (Finlandia)', pt: [23.8, 61.5] },
    { name: 'Oulu (Finlandia)', pt: [25.5, 65.0] },
    { name: 'Rovaniemi (Finlandia)', pt: [25.7, 66.5] },
    { name: 'Viipuri / Vyborg (Carelia)', pt: [28.75, 60.71] },
    { name: 'Sortavala (Carelia)', pt: [30.7, 61.7] },
    { name: 'Petsamo / Pechenga (Artico)', pt: [31.2, 69.5] },
    { name: 'Salla / Alakurtti', pt: [29.5, 66.8] },
    { name: 'Mosca (URSS)', pt: [37.6, 55.7] },
    { name: 'Leningrado (URSS)', pt: [30.3, 59.9] },
    { name: 'Kiev (URSS)', pt: [30.5, 50.4] },
    { name: 'Minsk (URSS)', pt: [27.6, 53.9] },
    { name: 'Kharkiv (URSS)', pt: [36.2, 50.0] },
    { name: 'Stalingrado / Volgograd (URSS)', pt: [44.5, 48.7] },
    { name: 'Sverdlovsk / Ekaterinburg (URSS)', pt: [60.6, 56.8] },
    { name: 'Novosibirsk (URSS)', pt: [82.9, 55.0] },
    { name: 'Irkutsk (URSS)', pt: [104.3, 52.3] },
    { name: 'Vladivostok (URSS)', pt: [131.9, 43.1] },
    { name: 'Alma-Ata / Almaty (Kazakistan)', pt: [76.9, 43.2] },
    { name: 'Tashkent (Uzbekistan)', pt: [69.2, 41.3] },
    { name: 'Ashgabat (Turkmenistan)', pt: [58.4, 37.9] },
    { name: 'Dushanbe (Tagikistan)', pt: [68.8, 38.5] },
    { name: 'Bishkek (Kirghizistan)', pt: [74.6, 42.9] },
    { name: 'Tbilisi (Georgia)', pt: [44.8, 41.7] },
    { name: 'Yerevan (Armenia)', pt: [44.5, 40.2] },
    { name: 'Baku (Azerbaigian)', pt: [49.9, 40.4] },
    { name: 'Sarajevo (Bosnia)', pt: [18.4, 43.8] },
    { name: 'Pristina (Kosovo)', pt: [21.2, 42.7] },
    { name: 'Bucarest (Romania)', pt: [26.1, 44.4] },
    { name: 'Chisinau (Bessarabia)', pt: [28.8, 47.0] },
    { name: 'Silistra (Dobrugia)', pt: [27.3, 44.1] },
    { name: 'Dobrich (Dobrugia)', pt: [27.8, 43.6] },
    { name: 'Berlino (Germania)', pt: [13.4, 52.5] },
    { name: 'Breslavia / Wroclaw (Slesia tedesca 1936)', pt: [17.0, 51.1] },
    { name: 'Stettino / Szczecin (Pomerania tedesca 1936)', pt: [14.5, 53.4] },
    { name: 'Königsberg (Prussia Orientale)', pt: [20.5, 54.7] },
    { name: 'Danzica (Città Libera)', pt: [18.6, 54.3] },
    { name: 'Memel / Klaipeda', pt: [21.1, 55.7] },
  ];

  console.log('\nVerifica copertura territoriale sui punti di campionamento:');
  for (const sp of samplePoints) {
    const hits: any[] = [];
    for (const f of pipeline.allFeatures) {
      if (d3.geoContains(f, sp.pt as [number, number])) {
        hits.push(f);
      }
    }
    if (hits.length === 0) {
      console.log(`❌ BUCO NERO RILEVATO a ${sp.name} [${sp.pt[0]}, ${sp.pt[1]}]! Nessuna feature copre questo punto.`);
    } else if (hits.length > 1) {
      console.log(`⚠️ SOVRAPPOSIZIONE a ${sp.name}: coperto da ${hits.length} feature: ${hits.map(h => h.id || h.properties?.NUTS_NAME || h.properties?.NAME).join(' + ')}`);
    } else {
      const h = hits[0];
      const res = h.__res ? h.__res[0] : null;
      console.log(`✓ ${sp.name.padEnd(45)} -> ${res ? `${res.o} (${res.name})` : 'NO RES'} [Feature: ${h.id || h.properties?.NUTS_NAME || h.properties?.NAME}]`);
    }
  }
}

audit().catch(console.error);
