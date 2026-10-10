import * as fs from 'fs';
import * as path from 'path';
import polygonClipping from 'polygon-clipping';

// Simplification function (Douglas-Peucker)
function simplifyRing(ring: number[][], tolerance = 0.0035): number[][] {
  if (ring.length <= 4) return ring;
  function getSqSegDist(p: number[], p1: number[], p2: number[]) {
    let x = p1[0], y = p1[1], dx = p2[0] - x, dy = p2[1] - y;
    if (dx !== 0 || dy !== 0) {
      const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
      if (t > 1) {
        x = p2[0];
        y = p2[1];
      } else if (t > 0) {
        x += dx * t;
        y += dy * t;
      }
    }
    dx = p[0] - x;
    dy = p[1] - y;
    return dx * dx + dy * dy;
  }

  function dpStep(points: number[][], first: number, last: number, sqTol: number, simplified: number[][]) {
    let maxSqDist = sqTol, index = 0;
    for (let i = first + 1; i < last; i++) {
      const sqDist = getSqSegDist(points[i], points[first], points[last]);
      if (sqDist > maxSqDist) {
        index = i;
        maxSqDist = sqDist;
      }
    }
    if (maxSqDist > sqTol) {
      if (index - first > 1) dpStep(points, first, index, sqTol, simplified);
      simplified.push(points[index]);
      if (last - index > 1) dpStep(points, index, last, sqTol, simplified);
    }
  }

  const sqTol = tolerance * tolerance;
  const last = ring.length - 1;
  const simplified = [ring[0]];
  dpStep(ring, 0, last, sqTol, simplified);
  simplified.push(ring[last]);
  return simplified;
}

function simplifyCoords(coords: any, tol: number): any {
  if (typeof coords[0][0] === 'number') {
    return simplifyRing(coords, tol).map(pt => [Math.round(pt[0] * 10000) / 10000, Math.round(pt[1] * 10000) / 10000]);
  }
  return coords.map((c: any) => simplifyCoords(c, tol));
}

async function run() {
  console.log('Fetching CHN ADM1 data from geoBoundaries...');
  const metaRes = await fetch('https://www.geoboundaries.org/api/current/gbOpen/CHN/ADM1/');
  const meta = await metaRes.json();
  const dataRes = await fetch(meta.gjDownloadURL);
  const data = await dataRes.json();

  console.log('Total features:', data.features.length);
  const features: any[] = [];

  const PROVINCE_MAP: Record<string, { id: string; nutsName: string; histName: string; adminTitle: string; kind: string }> = {
    'Beijing Municipality': {
      id: 'CHN_BEIJING',
      nutsName: 'Beiping (Pechino) — Ponte Marco Polo',
      histName: 'Beiping (Pechino)',
      adminTitle: 'Municipalità Speciale di Beiping / Sede dell\'Incidente di Lugouqiao (7 Luglio 1937)',
      kind: 'CHINA_PROVINCE'
    },
    'Tianjin Municipality': {
      id: 'CHN_TIANJIN',
      nutsName: 'Tianjin (Tientsin)',
      histName: 'Tianjin (Tientsin)',
      adminTitle: 'Municipalità Speciale e Porto di Tianjin',
      kind: 'CHINA_PROVINCE'
    },
    'Hebei Province': {
      id: 'CHN_HEBEI',
      nutsName: 'Hebei (Hopei)',
      histName: 'Provincia dello Hebei (Hopei)',
      adminTitle: 'Provincia dello Hebei — Corridoio Ferroviario Ping-Han',
      kind: 'CHINA_PROVINCE'
    },
    'Shanxi Province': {
      id: 'CHN_SHANXI',
      nutsName: 'Shanxi (Shansi — Taiyuan)',
      histName: 'Provincia dello Shanxi',
      adminTitle: 'Provincia dello Shanxi — Bastione del Gen. Yan Xishan & Monti Taihang',
      kind: 'CHINA_PROVINCE'
    },
    'Shandong Province': {
      id: 'CHN_SHANDONG',
      nutsName: 'Shandong (Shantung — Jinan & Qingdao)',
      histName: 'Provincia dello Shandong',
      adminTitle: 'Provincia dello Shandong — Jinan, Qingdao & Battaglia di Tai\'erzhuang',
      kind: 'CHINA_PROVINCE'
    },
    'Shanghai Municipality': {
      id: 'CHN_SHANGHAI',
      nutsName: 'Shanghai — Battaglia di Shanghai (1937)',
      histName: 'Municipalità di Shanghai',
      adminTitle: 'Shanghai — Settore Internazionale, Concessione Francese & Delta dello Yangtze',
      kind: 'CHINA_PROVINCE'
    },
    'Jiangsu Province': {
      id: 'CHN_JIANGSU',
      nutsName: 'Jiangsu (Kiangsu — Nanchino)',
      histName: 'Provincia del Jiangsu (Nanchino)',
      adminTitle: 'Provincia del Jiangsu — Nanchino (Capitale 1936-37) & Nodo di Xuzhou',
      kind: 'CHINA_PROVINCE'
    },
    'Anhui Province': {
      id: 'CHN_ANHUI',
      nutsName: 'Anhui (Anhwei — Hefei)',
      histName: 'Provincia dell\'Anhui',
      adminTitle: 'Provincia dell\'Anhui — Valle dello Yangtze & Hefei',
      kind: 'CHINA_PROVINCE'
    },
    'Henan Province': {
      id: 'CHN_HENAN',
      nutsName: 'Henan (Honan — Fiume Giallo)',
      histName: 'Provincia dello Henan',
      adminTitle: 'Provincia dello Henan — Kaifeng, Zhengzhou & Allagamento di Huayuankou (1938)',
      kind: 'CHINA_PROVINCE'
    },
    'Hubei Province': {
      id: 'CHN_HUBEI',
      nutsName: 'Hubei (Hupeh — Wuhan)',
      histName: 'Provincia dello Hubei (Wuhan)',
      adminTitle: 'Provincia dello Hubei — Wuhan (Hankou-Wuchang-Hanyang) & Yichang',
      kind: 'CHINA_PROVINCE'
    },
    'Hunan Province': {
      id: 'CHN_HUNAN',
      nutsName: 'Hunan (Changsha)',
      histName: 'Provincia dello Hunan (Changsha)',
      adminTitle: 'Provincia dello Hunan — Bastione di Changsha (Gen. Xue Yue)',
      kind: 'CHINA_PROVINCE'
    },
    'Jiangxi Province': {
      id: 'CHN_JIANGXI',
      nutsName: 'Jiangxi (Kiangsi — Nanchang)',
      histName: 'Provincia del Jiangxi',
      adminTitle: 'Provincia del Jiangxi — Nanchang & Fiume Gan',
      kind: 'CHINA_PROVINCE'
    },
    'Zhejiang Province': {
      id: 'CHN_ZHEJIANG',
      nutsName: 'Zhejiang (Chekiang — Hangzhou & Ningbo)',
      histName: 'Provincia dello Zhejiang',
      adminTitle: 'Provincia dello Zhejiang — Hangzhou, Ningbo & Baia di Hangzhou',
      kind: 'CHINA_PROVINCE'
    },
    'Guangzhou Province': {
      id: 'CHN_GUANGDONG',
      nutsName: 'Guangdong (Kwangtung — Canton)',
      histName: 'Provincia del Guangdong (Canton)',
      adminTitle: 'Provincia del Guangdong — Canton / Delta del Fiume delle Perle & Shantou',
      kind: 'CHINA_PROVINCE'
    },
    'Hainan Province': {
      id: 'CHN_HAINAN',
      nutsName: 'Hainan (Isola di Hainan)',
      histName: 'Isola di Hainan',
      adminTitle: 'Isola di Hainan — Base Navale e Aeronavale del Mar Cinese Meridionale',
      kind: 'CHINA_PROVINCE'
    },
    'Guangxi Zhuang Autonomous Region': {
      id: 'CHN_GUANGXI',
      nutsName: 'Guangxi (Kwangsi — Cricca di Li Zongren)',
      histName: 'Provincia del Guangxi',
      adminTitle: 'Provincia del Guangxi — Guilin, Nanning & Passo di Kunlun',
      kind: 'CHINA_PROVINCE'
    },
    'Fujian Province': {
      id: 'CHN_FUJIAN',
      nutsName: 'Fujian (Fukien — Fuzhou & Xiamen)',
      histName: 'Provincia del Fujian',
      adminTitle: 'Provincia del Fujian — Fuzhou & Stretto di Formosa',
      kind: 'CHINA_PROVINCE'
    },
    'Inner Mongolia Autonomous Region': {
      id: 'CHN_INNER_MONGOLIA',
      nutsName: 'Mengjiang (Mongolia Interna — Chahar & Suiyuan)',
      histName: 'Governo Autonomo del Mengjiang (Menkyo)',
      adminTitle: 'Governo Autonomo del Mengjiang — Principe Demchugdongrub (De Wang) / Kalgan',
      kind: 'CHINA_PROVINCE'
    },
    'Liaoning Province': {
      id: 'CHN_LIAONING',
      nutsName: 'Manciuria Meridionale (Liaoning — Fengtian/Mukden)',
      histName: 'Manciukuò — Provincia di Fengtian',
      adminTitle: 'Impero del Manciukuò — Mukden (Shenyang) & Ferrovia della Manciuria del Sud',
      kind: 'CHINA_PROVINCE'
    },
    'Jilin Province': {
      id: 'CHN_JILIN',
      nutsName: 'Manciuria Centrale (Jilin — Hsinking/Changchun)',
      histName: 'Manciukuò — Capitale Hsinking (Jilin)',
      adminTitle: 'Impero del Manciukuò — Capitale Imperiale di Hsinking (Changchun)',
      kind: 'CHINA_PROVINCE'
    },
    'Heilongjiang Province': {
      id: 'CHN_HEILONGJIANG',
      nutsName: 'Manciuria Settentrionale (Heilongjiang — Harbin)',
      histName: 'Manciukuò — Provincia dello Heilongjiang',
      adminTitle: 'Impero del Manciukuò — Harbin & Fiume Amur (Confine Sovietico)',
      kind: 'CHINA_PROVINCE'
    },
    'Shaanxi Province': {
      id: 'CHN_SHAANXI',
      nutsName: 'Shaanxi (Yan\'an / Shaan-Gan-Ning & Xi\'an)',
      histName: 'Regione di Frontiera di Yan\'an (Shaan-Gan-Ning)',
      adminTitle: 'Base Rossa del Partito Comunista Cinese — Mao Zedong & 8ª Armata di Strada',
      kind: 'CHINA_PROVINCE'
    },
    'Chongqing Municipality': {
      id: 'CHN_CHONGQING',
      nutsName: 'Chongqing (Chungking — Capitale di Guerra)',
      histName: 'Capitale di Guerra di Chongqing',
      adminTitle: 'Repubblica di Cina — Sede del Generalissimo Chiang Kai-shek (dal 1938)',
      kind: 'CHINA_PROVINCE'
    },
    'Sichuan Province': {
      id: 'CHN_SICHUAN',
      nutsName: 'Sichuan (Szechwan — Chengdu)',
      histName: 'Provincia del Sichuan',
      adminTitle: 'Provincia del Sichuan — Bastione Strategico e Riserva della Resistenza Cinese',
      kind: 'CHINA_PROVINCE'
    },
    'Guizhou Province': {
      id: 'CHN_GUIZHOU',
      nutsName: 'Guizhou (Kweichow — Guiyang)',
      histName: 'Provincia del Guizhou',
      adminTitle: 'Provincia del Guizhou — Guiyang & Snodo di Collegamento Sud-Ovest',
      kind: 'CHINA_PROVINCE'
    },
    'Yunnan Province': {
      id: 'CHN_YUNNAN',
      nutsName: 'Yunnan (Kunming — Strada della Birmania)',
      histName: 'Provincia dello Yunnan',
      adminTitle: 'Provincia dello Yunnan — Governatore Long Yun / Terminale Burma Road',
      kind: 'CHINA_PROVINCE'
    },
    'Gansu Province': {
      id: 'CHN_GANSU',
      nutsName: 'Gansu (Kansu — Lanzhou)',
      histName: 'Provincia del Gansu',
      adminTitle: 'Provincia del Gansu — Lanzhou & Corridoio dei Rifornimenti Sovietici (Operazione Zet)',
      kind: 'CHINA_PROVINCE'
    },
    'Ningxia Ningxia Hui Autonomous Region': {
      id: 'CHN_NINGXIA',
      nutsName: 'Ningxia (Cricca Ma — Ma Hongkui)',
      histName: 'Provincia del Ningxia',
      adminTitle: 'Provincia del Ningxia — Generale Ma Hongkui (Fronte Unito Nazionalista)',
      kind: 'CHINA_PROVINCE'
    },
    'Qinghai Province': {
      id: 'CHN_QINGHAI',
      nutsName: 'Qinghai (Chinghai — Ma Bufang)',
      histName: 'Provincia del Qinghai',
      adminTitle: 'Provincia del Qinghai — Generale Ma Bufang (Cavalleria Musulmana)',
      kind: 'CHINA_PROVINCE'
    },
    'Xinjiang Uyghur Autonomous Region': {
      id: 'CHN_XINJIANG',
      nutsName: 'Xinjiang (Sinkiang — Dihua/Ürümqi)',
      histName: 'Governo Provinciale dello Xinjiang',
      adminTitle: 'Xinjiang — Regime del Generale Sheng Shicai (Allineato all\'URSS)',
      kind: 'CHINA_PROVINCE'
    },
    'Tibet Autonomous Region': {
      id: 'CHN_TIBET',
      nutsName: 'Tibet (Regno Teocratico — Lhasa)',
      histName: 'Regno del Tibet (Governo del Kashag)',
      adminTitle: 'Tibet — Reggenza del 14° Dalai Lama (Tenzin Gyatso) / Stato Neutrale',
      kind: 'CHINA_PROVINCE'
    },
    'Taiwan Province': {
      id: 'CHN_TAIWAN',
      nutsName: 'Taiwan (Formosa — Taihoku)',
      histName: 'Governo Generale di Formosa (Taiwan)',
      adminTitle: 'Impero del Giappone — Colonia di Formosa (Trattato di Shimonoseki 1895)',
      kind: 'CHINA_PROVINCE'
    },
    'Hong Kong Special Administrative Region': {
      id: 'CHN_HONGKONG',
      nutsName: 'Hong Kong (Colonia Britannica della Corona)',
      histName: 'Colonia della Corona di Hong Kong',
      adminTitle: 'Impero Britannico — Hong Kong, Kowloon & Nuovi Territori (Gov. Geoffry Northcote)',
      kind: 'CHINA_PROVINCE'
    },
    'Macau Special Administrative Region': {
      id: 'CHN_MACAU',
      nutsName: 'Macao (Provincia Portoghese d\'Oltremare)',
      histName: 'Macao Portoghese',
      adminTitle: 'Repubblica Portoghese — Macao / Porto Franco Neutrale',
      kind: 'CHINA_PROVINCE'
    }
  };

  // Process all ADM1 provinces except Inner Mongolia
  for (const f of data.features) {
    const rawName = (f.properties?.shapeName || '').trim();
    if (rawName === 'Inner Mongolia Autonomous Region') continue; // Handled granularly below
    const mapping = PROVINCE_MAP[rawName];
    if (!mapping) {
      console.warn('Unmapped province:', rawName);
      continue;
    }

    const simplifiedGeom = {
      type: f.geometry.type,
      coordinates: simplifyCoords(f.geometry.coordinates, 0.005)
    };

    features.push({
      type: 'Feature',
      id: mapping.id,
      properties: {
        id: mapping.id,
        NUTS_ID: mapping.id,
        CNTR_CODE: 'CN_PROV',
        NUTS_NAME: mapping.nutsName,
        HISTORICAL_NAME: mapping.histName,
        ADMIN_TITLE: mapping.adminTitle,
        MODERN_ADMIN: rawName,
        REGION_KIND: mapping.kind
      },
      geometry: simplifiedGeom
    });
  }

  // Fetch ADM2 to granularize Inner Mongolia into authentic historical Mengjiang and Manchukuo Xing'an/Hulunbuir
  console.log('Fetching CHN ADM2 for Inner Mongolia / Manchukuo border precision...');
  const meta2Res = await fetch('https://www.geoboundaries.org/api/current/gbOpen/CHN/ADM2/');
  const meta2 = await meta2Res.json();
  const data2Res = await fetch(meta2.gjDownloadURL);
  const data2 = await data2Res.json();

  const im1 = data.features.find((f: any) => f.properties?.shapeName === 'Inner Mongolia Autonomous Region');

  // Slicing Inner Mongolia into 3 seamless regions with zero gaps:
  // 1. Xing'an North (Hulunbuir, Hailar, Manzhouli, Greater Khingan)
  // 2. Xing'an South & Ju Ud / Rehe (Tongliao, Hinggan, Chifeng)
  // 3. Mengjiang (Chahar, Xilin Gol, Suiyuan, Baotou, Ordos, Alxa)
  const im1Geom = im1.geometry.type === 'MultiPolygon' ? im1.geometry.coordinates : [im1.geometry.coordinates];
  const simplifiedIm1 = simplifyCoords(im1Geom, 0.0035);

  const northCutter: any = [[
    [114.5, 47.05],
    [127.5, 47.05],
    [127.5, 54.5],
    [114.5, 54.5],
    [114.5, 47.05]
  ]];

  const southCutter: any = [[
    [114.5, 47.05],
    [127.5, 47.05],
    [127.5, 40.5],
    [116.2, 40.5],
    [115.8, 42.0],
    [116.0, 43.5],
    [116.5, 44.5],
    [117.0, 45.5],
    [114.5, 47.05]
  ]];

  const northPart = polygonClipping.intersection(simplifiedIm1 as any, [northCutter] as any);
  const southPart = polygonClipping.intersection(simplifiedIm1 as any, [southCutter] as any);
  const manchukuoCombined = polygonClipping.union(northPart as any, southPart as any);
  const mengjiangPart = polygonClipping.difference(simplifiedIm1 as any, manchukuoCombined as any);

  function toGeometry(polyList: any[]): any {
    if (polyList.length === 1) {
      return {
        type: 'Polygon',
        coordinates: polyList[0]
      };
    }
    return {
      type: 'MultiPolygon',
      coordinates: polyList
    };
  }

  // 1. Mengjiang (Central & Western Inner Mongolia: Chahar, Xilin Gol, Suiyuan, Hohhot, Baotou, Ordos, Bayannur, Alxa)
  features.push({
    type: 'Feature',
    id: 'CHN_INNER_MONGOLIA',
    properties: {
      id: 'CHN_INNER_MONGOLIA',
      NUTS_ID: 'CHN_INNER_MONGOLIA',
      CNTR_CODE: 'CN_PROV',
      NUTS_NAME: 'Mengjiang (Mongolia Interna — Chahar & Suiyuan)',
      HISTORICAL_NAME: 'Governo Autonomo del Mengjiang (Menkyo)',
      ADMIN_TITLE: 'Governo Autonomo del Mengjiang — Kalgan (Zhangjiakou) & Guisui (Hohhot) / Principe De Wang',
      MODERN_ADMIN: 'Inner Mongolia Autonomous Region (Chahar & Suiyuan)',
      REGION_KIND: 'CHINA_PROVINCE'
    },
    geometry: toGeometry(mengjiangPart)
  });

  // 2. Manchukuo North Hsingan (Hulunbuir, Hailar, Manzhouli, Grande Khingan)
  features.push({
    type: 'Feature',
    id: 'CHN_MANCHUKUO_XINGAN_NORTH',
    properties: {
      id: 'CHN_MANCHUKUO_XINGAN_NORTH',
      NUTS_ID: 'CHN_MANCHUKUO_XINGAN_NORTH',
      CNTR_CODE: 'CN_PROV',
      NUTS_NAME: 'Manciukuò — Xing\'an Settentrionale (Hulunbuir & Hailar)',
      HISTORICAL_NAME: 'Manciukuò — Provincia di Xing\'an Settentrionale (Hsingan North)',
      ADMIN_TITLE: 'Impero del Grande Manciukuò — Hailar, Manzhouli & Settore del Nomonhan / Khalkhin Gol (1939)',
      MODERN_ADMIN: 'Inner Mongolia (Hulunbuir)',
      REGION_KIND: 'CHINA_PROVINCE'
    },
    geometry: toGeometry(northPart)
  });

  // 3. Manchukuo South/East Hsingan & Rehe (Ulanhot, Tongliao, Chifeng & Ju Ud)
  features.push({
    type: 'Feature',
    id: 'CHN_MANCHUKUO_XINGAN_SOUTH',
    properties: {
      id: 'CHN_MANCHUKUO_XINGAN_SOUTH',
      NUTS_ID: 'CHN_MANCHUKUO_XINGAN_SOUTH',
      CNTR_CODE: 'CN_PROV',
      NUTS_NAME: 'Manciukuò — Xing\'an Meridionale & Ju Ud (Tongliao, Hinggan & Chifeng)',
      HISTORICAL_NAME: 'Manciukuò — Province di Xing\'an Meridionale, Orientale & Ju Ud (Rehe)',
      ADMIN_TITLE: 'Impero del Grande Manciukuò — Territori Mongoli e Rehe annessi al Manciukuò (1933-1934)',
      MODERN_ADMIN: 'Inner Mongolia (Hinggan, Tongliao, Chifeng)',
      REGION_KIND: 'CHINA_PROVINCE'
    },
    geometry: toGeometry(southPart)
  });

  console.log(`Generated ${features.length} Chinese granular features!`);
  const tsContent = `// File generato: Granularizzazione integrale della Cina e Teatro Sino-Giapponese (1936-1940)
// Include tutte le 34 province, municipalità, teatri operativi del Ponte Marco Polo, Manciukuò, Mengjiang, Yan'an e Chongqing
export const CHINA_REGIONAL_FEATURES: any[] = ${JSON.stringify(features)};
`;

  fs.writeFileSync(path.join(process.cwd(), 'src/data/chinaRegions.ts'), tsContent, 'utf-8');
  console.log('Saved src/data/chinaRegions.ts successfully!');
}

run().catch(err => {
  console.error('Error generating China geo:', err);
  process.exit(1);
});
