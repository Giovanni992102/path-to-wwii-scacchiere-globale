import * as fs from 'fs';
import * as path from 'path';

// Simplification function (Douglas-Peucker)
function simplifyRing(ring: number[][], tolerance = 0.002): number[][] {
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

function simplifyCoords(coords: any, tol = 0.002): any {
  if (typeof coords[0][0] === 'number') {
    return simplifyRing(coords, tol).map(pt => [Math.round(pt[0] * 10000) / 10000, Math.round(pt[1] * 10000) / 10000]);
  }
  return coords.map((c: any) => simplifyCoords(c, tol));
}

function getCentroid(coords: any): [number, number] {
  let pts: [number, number][] = [];
  function extract(c: any) {
    if (typeof c[0] === 'number') pts.push(c as [number, number]);
    else c.forEach(extract);
  }
  extract(coords);
  const sumX = pts.reduce((a, b) => a + b[0], 0);
  const sumY = pts.reduce((a, b) => a + b[1], 0);
  return [sumX / pts.length, sumY / pts.length];
}

function normKey(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// 1. UPDATE KRESY POWIATS (ALL 140 HISTORICAL ADM2 UNITS WITH ZERO HOLES)
async function updateKresy() {
  console.log('Generating updated Kresy Powiats...');
  const ukrMeta = await (await fetch('https://www.geoboundaries.org/api/current/gbOpen/UKR/ADM2/')).json();
  const ukrData = await (await fetch(ukrMeta.gjDownloadURL)).json();

  const blrMeta = await (await fetch('https://www.geoboundaries.org/api/current/gbOpen/BLR/ADM2/')).json();
  const blrData = await (await fetch(blrMeta.gjDownloadURL)).json();

  const ltuMeta = await (await fetch('https://www.geoboundaries.org/api/current/gbOpen/LTU/ADM2/')).json();
  const ltuData = await (await fetch(ltuMeta.gjDownloadURL)).json();

  const kresyFeatures: any[] = [];
  let kCount = 0;

  // Belarus Kresy
  const BLR_MAP: Record<string, { voiv: string; pol: string }> = {
    'grodno': { voiv: 'Białostockie', pol: 'Grodzieński (Grodno)' },
    'hrodna': { voiv: 'Białostockie', pol: 'Grodzieński (Grodno)' },
    'brest': { voiv: 'Poleskie', pol: 'Brzeski (Brześć nad Bugiem)' },
    'astravyets': { voiv: 'Wileńskie', pol: 'Wileński (Ostrowiec)' },
    'smarhon': { voiv: 'Wileńskie', pol: 'Oszmiański (Smorgonie)' },
    'ashmyany': { voiv: 'Wileńskie', pol: 'Oszmiański (Oszmiana)' },
    'voranava': { voiv: 'Nowogródzkie', pol: 'Lidzki (Werenowo / Bieniakonie)' },
    'iwye': { voiv: 'Nowogródzkie', pol: 'Lidzki (Iwie)' },
    'karelichy': { voiv: 'Nowogródzkie', pol: 'Nowogródzki (Korelicze)' },
    'novogrudok': { voiv: 'Nowogródzkie', pol: 'Nowogródzki (Nowogródek)' },
    'lida': { voiv: 'Nowogródzkie', pol: 'Lidzki (Lida)' },
    'dzyatlava': { voiv: 'Nowogródzkie', pol: 'Nowogródzki (Zdzięcioł)' },
    'slonim': { voiv: 'Nowogródzkie', pol: 'Słonimski (Słonim)' },
    'zelva': { voiv: 'Białostockie', pol: 'Wołkowyski (Zelwa)' },
    'svislach': { voiv: 'Białostockie', pol: 'Wołkowyski (Świsłocz)' },
    'vawkavysk': { voiv: 'Białostockie', pol: 'Wołkowyski (Wołkowysk)' },
    'berestovitsa': { voiv: 'Białostockie', pol: 'Grodzieński (Brzostowica Wielka)' },
    'byerastavitsa': { voiv: 'Białostockie', pol: 'Grodzieński (Brzostowica Wielka)' },
    'mosty': { voiv: 'Białostockie', pol: 'Grodzieński (Mosty)' },
    'masty': { voiv: 'Białostockie', pol: 'Grodzieński (Mosty)' },
    'shchuchyn': { voiv: 'Nowogródzkie', pol: 'Szczuczyński (Szczuczyn Nowogródzki)' },
    'stolin': { voiv: 'Poleskie', pol: 'Stoliński (Stolin)' },
    'luninets': { voiv: 'Poleskie', pol: 'Łuniniecki (Łuniniec)' },
    'pinsk': { voiv: 'Poleskie', pol: 'Piński (Pińsk)' },
    'hantsavichy': { voiv: 'Poleskie', pol: 'Łuniniecki (Hancewicze)' },
    'baranovichy': { voiv: 'Nowogródzkie', pol: 'Baranowicki (Baranowicze)' },
    'baranovichi': { voiv: 'Nowogródzkie', pol: 'Baranowicki (Baranowicze)' },
    'byaroza': { voiv: 'Poleskie', pol: 'Prużański (Bereza Kartuska)' },
    'drahichyn': { voiv: 'Poleskie', pol: 'Drohicki (Drohiczyn)' },
    'ivanava': { voiv: 'Poleskie', pol: 'Drohicki (Janów Poleski)' },
    'ivatsevichy': { voiv: 'Poleskie', pol: 'Kosowski (Iwacewicze / Kosów)' },
    'kamenets': { voiv: 'Poleskie', pol: 'Brzeski (Kamieniec Litewski)' },
    'kobryn': { voiv: 'Poleskie', pol: 'Kobryński (Kobryń)' },
    'lyakhavichy': { voiv: 'Nowogródzkie', pol: 'Baranowicki (Lachowicze)' },
    'malaryta': { voiv: 'Poleskie', pol: 'Brzeski (Małoryta)' },
    'pruzhany': { voiv: 'Poleskie', pol: 'Prużański (Prużana)' },
    'zhabinka': { voiv: 'Poleskie', pol: 'Kobryński (Żabinka)' },
    'braslaw': { voiv: 'Wileńskie', pol: 'Brasławski (Brasław)' },
    'dokshytsy': { voiv: 'Wileńskie', pol: 'Dzisieński (Dokszyce)' },
    'hlybokaye': { voiv: 'Wileńskie', pol: 'Dzisieński (Głębokie)' },
    'miory': { voiv: 'Wileńskie', pol: 'Brasławski (Miory / Dzisna)' },
    'pastavy': { voiv: 'Wileńskie', pol: 'Postawski (Postawy)' },
    'sharkawshchyna': { voiv: 'Wileńskie', pol: 'Dzisieński (Szarkowszczyzna)' },
    'myadzyel': { voiv: 'Wileńskie', pol: 'Postawski (Miadzioł)' },
    'vileyka': { voiv: 'Wileńskie', pol: 'Wilejski (Wilejka)' },
    'valozhyn': { voiv: 'Nowogródzkie', pol: 'Wołożyński (Wołożyn)' },
    'maladzyechna': { voiv: 'Wileńskie', pol: 'Mołodeczański (Mołodeczno)' },
    'kletsk': { voiv: 'Nowogródzkie', pol: 'Nieświeski (Kleck)' },
    'nyasvizh': { voiv: 'Nowogródzkie', pol: 'Nieświeski (Nieśwież)' },
    'stowbtsy': { voiv: 'Nowogródzkie', pol: 'Stołpecki (Stołpce)' }
  };

  for (const f of blrData.features) {
    const rawName = f.properties.shapeName.trim();
    const nk = normKey(rawName);
    let matchKey = Object.keys(BLR_MAP).find(k => normKey(k) === nk);
    if (!matchKey) continue;
    kCount++;
    const info = BLR_MAP[matchKey];
    const id = `PL_KRESY_BLR_${kCount}_${rawName.replace(/[^a-zA-Z0-9]/g, '_')}`;
    kresyFeatures.push({
      type: 'Feature',
      id,
      properties: {
        id,
        NUTS_ID: id,
        CNTR_CODE: 'PL',
        NUTS_NAME: `Powiat ${info.pol}`,
        HISTORICAL_NAME: `Powiat ${info.pol}`,
        VOIVODESHIP: info.voiv,
        SOV_SSR: 'RSS Bielorussa',
        MODERN_ADMIN: `${rawName} (Bielorussia)`,
        REGION_KIND: 'POLISH_EASTERN_POWIAT'
      },
      geometry: {
        type: f.geometry.type,
        coordinates: simplifyCoords(f.geometry.coordinates, 0.002)
      }
    });
  }

  // Ukraine Kresy
  const UKR_EXCLUDED = new Set([
    // Zakarpattia (CZE):
    'uzhhorod', 'mukachevo', 'berehove', 'vynohradiv', 'irshava', 'khust', 'tiachiv', 'rakhiv',
    'volovets', 'velykobereznianskyi', 'velykyybereznyi', 'perechyn', 'svaliava', 'mizhhiria',
    // Chernivtsi (ROM):
    'chernivtsi', 'vyzhnytsia', 'putyla', 'kitsman', 'zastavna', 'novoselytsia', 'kelmentsi',
    'sokyriany', 'khotyn', 'hertsa', 'hlyboka', 'storozhynets',
    // Khmelnytskyi / Zhytomyr / Vinnytsia (SOV):
    'chemerivtsi', 'volochysk', 'bilohiria', 'iziaslav', 'shepetika', 'slavuta', 'teofipol',
    'polonne', 'dunaivtsi', 'dunaivti', 'novohradvolynskyi', 'baranivka', 'yemilchyne', 'olevsk',
    'khmelnytskyi', 'kamianetspodilskyi', 'starokostiantyniv', 'yarmolyntsi', 'vinkivtsi',
    'novoushytsia', 'letychiv', 'krasyliv', 'derazhnia', 'bar', 'mohylivpodilskyi',
    'murovanikurylivtsi', 'starasyniava', 'zviahel'
  ]);

  const UKR_MAP: Record<string, { voiv: string; pol: string }> = {
    'verkhovyna': { voiv: 'Stanisławowskie', pol: 'Kosowski (Żabie / Wierchowina)' },
    'kosiv': { voiv: 'Stanisławowskie', pol: 'Kosowski (Kosów Huculski)' },
    'sniatyn': { voiv: 'Stanisławowskie', pol: 'Śniatyński (Śniatyn)' },
    'horodenka': { voiv: 'Stanisławowskie', pol: 'Horodeński (Horodenka)' },
    'tlumach': { voiv: 'Stanisławowskie', pol: 'Tłumacki (Tłumacz)' },
    'kolomyia': { voiv: 'Stanisławowskie', pol: 'Kołomyjski (Kołomyja)' },
    'nadvirna': { voiv: 'Stanisławowskie', pol: 'Nadwórniański (Nadwórna)' },
    'tysmenytsia': { voiv: 'Stanisławowskie', pol: 'Stanisławowski (Stanisławów / Tyśmienica)' },
    'bohorodchany': { voiv: 'Stanisławowskie', pol: 'Bohorodczański (Bohorodczany)' },
    'rozhniativ': { voiv: 'Stanisławowskie', pol: 'Doliniański (Rożniatów)' },
    'dolyna': { voiv: 'Stanisławowskie', pol: 'Doliniański (Dolina)' },
    'kalush': { voiv: 'Stanisławowskie', pol: 'Kałuski (Kałusz)' },
    'halych': { voiv: 'Stanisławowskie', pol: 'Stanisławowski (Halicz)' },
    'rohatyn': { voiv: 'Stanisławowskie', pol: 'Rohatyński (Rohatyn)' },
    'skole': { voiv: 'Stanisławowskie', pol: 'Stryjski (Skole)' },
    'stryi': { voiv: 'Stanisławowskie', pol: 'Stryjski (Stryj)' },
    'zhydachiv': { voiv: 'Stanisławowskie', pol: 'Żydaczowski (Żydaczów)' },
    'turka': { voiv: 'Lwowskie', pol: 'Turczański (Turka)' },
    'drohobych': { voiv: 'Lwowskie', pol: 'Drohobycki (Drohobycz / Borysław)' },
    'staryisambir': { voiv: 'Lwowskie', pol: 'Starosamborski (Stary Sambor)' },
    'sambir': { voiv: 'Lwowskie', pol: 'Samborski (Sambor)' },
    'mostyska': { voiv: 'Lwowskie', pol: 'Mościcki (Mościska)' },
    'horodok': { voiv: 'Lwowskie', pol: 'Gródecki (Gródek Jagielloński)' },
    'pustomyty': { voiv: 'Lwowskie', pol: 'Lwowski (Lwów / Pustomyty)' },
    'yavoriv': { voiv: 'Lwowskie', pol: 'Jaworowski (Jaworów)' },
    'mykolaiv': { voiv: 'Lwowskie', pol: 'Żydaczowski (Mikołajów nad Dniestrem)' },
    'peremyshliany': { voiv: 'Lwowskie', pol: 'Przemyślański (Przemyślany)' },
    'zhovkva': { voiv: 'Lwowskie', pol: 'Żółkiewski (Żółkiew)' },
    'kamiankabuzka': { voiv: 'Tarnopolskie', pol: 'Kamionecki (Kamionka Strumiłowa)' },
    'radekhiv': { voiv: 'Tarnopolskie', pol: 'Radziechowski (Radziechów)' },
    'sokal': { voiv: 'Lwowskie', pol: 'Sokalski (Sokal)' },
    'brody': { voiv: 'Tarnopolskie', pol: 'Brodzki (Brody)' },
    'busk': { voiv: 'Tarnopolskie', pol: 'Kamionecki (Busk)' },
    'zolochiv': { voiv: 'Tarnopolskie', pol: 'Złoczowski (Złoczów / Sasów / Olesko)' },
    'zboriv': { voiv: 'Tarnopolskie', pol: 'Zborowski (Zborów)' },
    'zbarazh': { voiv: 'Tarnopolskie', pol: 'Zbaraski (Zbaraż)' },
    'ternopil': { voiv: 'Tarnopolskie', pol: 'Tarnopolski (Tarnopol)' },
    'berezhany': { voiv: 'Tarnopolskie', pol: 'Brzeżański (Brzeżany)' },
    'kozova': { voiv: 'Tarnopolskie', pol: 'Brzeżański (Kozowa)' },
    'pidhaitsi': { voiv: 'Tarnopolskie', pol: 'Podhajecki (Podhajce)' },
    'monastyryska': { voiv: 'Tarnopolskie', pol: 'Buczacki (Monasterzyska)' },
    'buchach': { voiv: 'Tarnopolskie', pol: 'Buczacki (Buczacz)' },
    'terebovlia': { voiv: 'Tarnopolskie', pol: 'Trembowelski (Trembowla)' },
    'pidvolochysk': { voiv: 'Tarnopolskie', pol: 'Skałacki (Podwołoczyska / Skałat)' },
    'husiatyn': { voiv: 'Tarnopolskie', pol: 'Kopyczyniecki (Husiatyn / Kopyczyńce)' },
    'chortkiv': { voiv: 'Tarnopolskie', pol: 'Czortkowski (Czortków)' },
    'zalishchyky': { voiv: 'Tarnopolskie', pol: 'Zaleszczycki (Zaleszczyki)' },
    'borschiv': { voiv: 'Tarnopolskie', pol: 'Borszczowski (Borszczów / Dniestr)' },
    'lanivtsi': { voiv: 'Wołyńskie', pol: 'Krzemieniecki (Łanowce)' },
    'shumsk': { voiv: 'Wołyńskie', pol: 'Krzemieniecki (Szumsk)' },
    'kremenets': { voiv: 'Wołyńskie', pol: 'Krzemieniecki (Krzemieniec)' },
    'berezne': { voiv: 'Wołyńskie', pol: 'Kostopolski (Bereźne)' },
    'korets': { voiv: 'Wołyńskie', pol: 'Rówieński (Korzec)' },
    'dubrovytsia': { voiv: 'Wołyńskie', pol: 'Sarneński (Dąbrowica)' },
    'zarichne': { voiv: 'Poleskie', pol: 'Piński (Zareczne / Pohost)' },
    'sarny': { voiv: 'Wołyńskie', pol: 'Sarneński (Sarny)' },
    'volodymyrets': { voiv: 'Wołyńskie', pol: 'Sarneński (Włodzimierzec)' },
    'kostopil': { voiv: 'Wołyńskie', pol: 'Kostopolski (Kostopol)' },
    'hoshcha': { voiv: 'Wołyńskie', pol: 'Rówieński (Hoszcza)' },
    'rivne': { voiv: 'Wołyńskie', pol: 'Rówieński (Równe)' },
    'ostroh': { voiv: 'Wołyńskie', pol: 'Ostrogski (Ostróg)' },
    'zdolbuniv': { voiv: 'Wołyńskie', pol: 'Zdołbunowski (Zdołbunów)' },
    'dubno': { voiv: 'Wołyńskie', pol: 'Dubieński (Dubno)' },
    'mlyniv': { voiv: 'Wołyńskie', pol: 'Dubieński (Młynów)' },
    'demydivka': { voiv: 'Wołyńskie', pol: 'Dubieński (Demidówka)' },
    'radyvyliv': { voiv: 'Wołyńskie', pol: 'Dubieński (Radziwiłłów)' },
    'rokytne': { voiv: 'Wołyńskie', pol: 'Sarneński (Rokitno)' },
    'manevychi': { voiv: 'Wołyńskie', pol: 'Łucki (Maniewicze)' },
    'kivertsi': { voiv: 'Wołyńskie', pol: 'Łucki (Kiwerce)' },
    'liubeshiv': { voiv: 'Poleskie', pol: 'Piński (Lubieszów)' },
    'lutsk': { voiv: 'Wołyńskie', pol: 'Łucki (Łuck)' },
    'horokhiv': { voiv: 'Wołyńskie', pol: 'Horochowski (Horochów)' },
    'ivanychi': { voiv: 'Wołyńskie', pol: 'Włodzimierski (Iwanicze)' },
    'lokachi': { voiv: 'Wołyńskie', pol: 'Horochowski (Lokacze)' },
    'rozhyshche': { voiv: 'Wołyńskie', pol: 'Łucki (Rożyszcze)' },
    'volodymyr': { voiv: 'Wołyńskie', pol: 'Włodzimierski (Włodzimierz Wołyński)' },
    'turiisk': { voiv: 'Wołyńskie', pol: 'Kowelski (Turzysk)' },
    'kovel': { voiv: 'Wołyńskie', pol: 'Kowelski (Kowel)' },
    'liuboml': { voiv: 'Wołyńskie', pol: 'Lubomelski (Luboml)' },
    'staravyzhivka': { voiv: 'Wołyńskie', pol: 'Kowelski (Stara Wyżwa)' },
    'shatsk': { voiv: 'Wołyńskie', pol: 'Lubomelski (Szack)' },
    'kaminkashyrskyi': { voiv: 'Poleskie', pol: 'Koszyrski (Kamień Koszyrski)' },
    'ratne': { voiv: 'Poleskie', pol: 'Kowelski (Ratno)' }
  };

  for (const f of ukrData.features) {
    const rawName = f.properties.shapeName.trim();
    const nk = normKey(rawName);
    if (UKR_EXCLUDED.has(nk)) continue;

    const c = getCentroid(f.geometry.coordinates);
    if (nk === 'horodok' && c[0] > 25.0) continue; // Skip Khmelnytskyi Horodok

    let matchKey = Object.keys(UKR_MAP).find(k => normKey(k) === nk);
    if (!matchKey) continue;

    const info = UKR_MAP[matchKey];
    kCount++;
    const id = `PL_KRESY_UKR_${kCount}_${rawName.replace(/[^a-zA-Z0-9]/g, '_')}`;
    kresyFeatures.push({
      type: 'Feature',
      id,
      properties: {
        id,
        NUTS_ID: id,
        CNTR_CODE: 'PL',
        NUTS_NAME: `Powiat ${info.pol}`,
        HISTORICAL_NAME: `Powiat ${info.pol}`,
        VOIVODESHIP: info.voiv,
        SOV_SSR: 'RSS Ucraina',
        MODERN_ADMIN: `${rawName} (Ucraina)`,
        REGION_KIND: 'POLISH_EASTERN_POWIAT'
      },
      geometry: {
        type: f.geometry.type,
        coordinates: simplifyCoords(f.geometry.coordinates, 0.002)
      }
    });
  }

  // Lithuania Vilnius region
  const LTU_MAP: Record<string, { voiv: string; pol: string }> = {
    'vilnius': { voiv: 'Wileńskie', pol: 'Wileński (Wilno — Miasto)' },
    'vilniusdistrict': { voiv: 'Wileńskie', pol: 'Wileńsko-Trocki (Wilno — Powiat)' },
    'salcininkai': { voiv: 'Wileńskie', pol: 'Wileńsko-Trocki (Soleczniki)' },
    'svencionys': { voiv: 'Wileńskie', pol: 'Święciański (Święciany)' },
    'trakai': { voiv: 'Wileńskie', pol: 'Wileńsko-Trocki (Troki)' },
    'varena': { voiv: 'Wileńskie', pol: 'Wileńsko-Trocki (Orany)' },
    'druskininkai': { voiv: 'Białostockie', pol: 'Grodzieński (Druskieniki)' },
    'ignalina': { voiv: 'Wileńskie', pol: 'Święciański (Ignalino)' }
  };

  for (const f of ltuData.features) {
    const rawName = f.properties.shapeName.trim();
    const nk = normKey(rawName);
    let matchKey = Object.keys(LTU_MAP).find(k => normKey(k) === nk);
    if (!matchKey) continue;

    kCount++;
    const info = LTU_MAP[matchKey];
    const id = `PL_KRESY_LTU_${kCount}_${rawName.replace(/[^a-zA-Z0-9]/g, '_')}`;
    kresyFeatures.push({
      type: 'Feature',
      id,
      properties: {
        id,
        NUTS_ID: id,
        CNTR_CODE: 'PL',
        NUTS_NAME: `Powiat ${info.pol}`,
        HISTORICAL_NAME: `Powiat ${info.pol}`,
        VOIVODESHIP: info.voiv,
        SOV_SSR: 'RSS Lituana / Lituania',
        MODERN_ADMIN: `${rawName} (Lituania)`,
        REGION_KIND: 'POLISH_EASTERN_POWIAT'
      },
      geometry: {
        type: f.geometry.type,
        coordinates: simplifyCoords(f.geometry.coordinates, 0.002)
      }
    });
  }

  // Perform Geodetic Seam-Weld against Eurostat Poland eastern boundary
  const nutsUrl = 'https://gisco-services.ec.europa.eu/distribution/v2/nuts/geojson/NUTS_RG_10M_2021_4326_LEVL_3.geojson';
  const nutsRes = await fetch(nutsUrl);
  const nutsData = await nutsRes.json();

  const borderNutsIds = new Set(['PL843', 'PL841', 'PL811', 'PL812', 'PL822', 'PL821']);
  const borderEdges: Array<[[number, number], [number, number]]> = [];

  for (const f of nutsData.features) {
    if (borderNutsIds.has(f.properties.NUTS_ID)) {
      function extractRings(coords: any) {
        if (typeof coords[0][0] === 'number') {
          const ring = coords as number[][];
          for (let i = 0; i < ring.length - 1; i++) {
            const p1 = [Math.round(ring[i][0] * 10000) / 10000, Math.round(ring[i][1] * 10000) / 10000] as [number, number];
            const p2 = [Math.round(ring[i+1][0] * 10000) / 10000, Math.round(ring[i+1][1] * 10000) / 10000] as [number, number];
            if (p1[0] > 22.5 || p2[0] > 22.5) {
              borderEdges.push([p1, p2]);
            }
          }
        } else {
          coords.forEach(extractRings);
        }
      }
      extractRings(f.geometry.coordinates);
    }
  }

  function distToSegment(p: [number, number], p1: [number, number], p2: [number, number]): { dist: number; nearest: [number, number] } {
    const x = p[0], y = p[1];
    const x1 = p1[0], y1 = p1[1], x2 = p2[0], y2 = p2[1];
    const dx = x2 - x1, dy = y2 - y1;
    if (dx === 0 && dy === 0) {
      const d = Math.hypot(x - x1, y - y1);
      return { dist: d, nearest: [x1, y1] };
    }
    const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)));
    const nx = x1 + t * dx;
    const ny = y1 + t * dy;
    return { dist: Math.hypot(x - nx, y - ny), nearest: [Math.round(nx * 10000) / 10000, Math.round(ny * 10000) / 10000] };
  }

  const weldedKresy = kresyFeatures.map(f => {
    function snapCoords(coords: any): any {
      if (typeof coords[0][0] === 'number') {
        return coords.map((pt: [number, number]) => {
          if (pt[0] < 24.8) {
            let minDist = 999;
            let bestNearest: [number, number] = pt;
            for (const edge of borderEdges) {
              const res = distToSegment(pt, edge[0], edge[1]);
              if (res.dist < minDist) {
                minDist = res.dist;
                bestNearest = res.nearest;
              }
            }
            if (minDist < 0.18) {
              return bestNearest;
            }
          }
          return pt;
        });
      }
      return coords.map(snapCoords);
    }

    return {
      ...f,
      geometry: {
        type: f.geometry.type,
        coordinates: snapCoords(f.geometry.coordinates)
      }
    };
  });

  console.log(`Saved ${weldedKresy.length} total seamless Kresy Powiat features!`);
  const tsContent = `// File generato: Granularizzazione integrale dei Powiat dei Kresy Wschodnie (1921-1939) con Snapping Geodetico Seam-Weld
export const KRESY_POWIAT_FEATURES: any[] = ${JSON.stringify(weldedKresy, null, 2)};
`;
  fs.writeFileSync(path.join(process.cwd(), 'src/data/kresyPowiats.ts'), tsContent, 'utf-8');
}

// 2. UPDATE USSR REGIONS WITH BUDJAK AND ODESSA SPLIT + CHERNIVTSI
async function updateUssr() {
  console.log('Generating updated USSR regions with Budjak and Odessa split...');
  const ssrCodes = ['RUS', 'UKR', 'BLR', 'GEO', 'ARM', 'AZE', 'KAZ', 'UZB', 'TKM', 'TJK', 'KGZ'];
  const allFeatures: any[] = [];
  let count = 0;

  const EXCLUDED_UKR_ADM1 = new Set([
    'Lviv Oblast',
    'Ivano-Frankivsk Oblast',
    'Ternopil Oblast',
    'Volyn Oblast',
    'Rivne Oblast',
    'Zakarpattia Oblast',
    'Odessa Oblast'
  ]);
  const EXCLUDED_BLR_ADM1 = new Set(['Brest', 'Grodno']);
  const EXCLUDED_RUS_ADM1 = new Set(['Kaliningrad']);

  // Fetch ADM1 for all republics
  for (const c of ssrCodes) {
    const meta = await (await fetch(`https://www.geoboundaries.org/api/current/gbOpen/${c}/ADM1/`)).json();
    const data = await (await fetch(meta.gjDownloadURL)).json();

    for (const f of data.features) {
      const rawName = (f.properties?.shapeName || '').trim();
      if (c === 'UKR' && EXCLUDED_UKR_ADM1.has(rawName)) continue;
      if (c === 'BLR' && EXCLUDED_BLR_ADM1.has(rawName)) continue;
      if (c === 'RUS' && EXCLUDED_RUS_ADM1.has(rawName)) continue;

      count++;
      const id = `SOV_ADM1_${c}_${count}_${rawName.replace(/[^a-zA-Z0-9]/g, '_')}`;

      // Special handling for Chernivtsi (Northern Bukovina): Romanian in steps 0-5, Soviet in step 6
      if (c === 'UKR' && rawName === 'Chernivtsi Oblast') {
        allFeatures.push({
          type: 'Feature',
          id,
          properties: {
            id,
            NUTS_ID: id,
            CNTR_CODE: 'RO_BUK',
            NUTS_NAME: 'Bucovina Settentrionale (Cernăuți / Cernovcy)',
            HISTORICAL_NAME: 'Bucovina Settentrionale e Hotin',
            ADMIN_TITLE: 'Regno di Romania (1918-1940) / RSS Ucraina (dal 28 giugno 1940)',
            SOV_SSR: 'RSS Ucraina',
            MODERN_ADMIN: 'Chernivtsi Oblast (UKR)',
            REGION_KIND: 'BUKOVINA_TERRITORY'
          },
          geometry: {
            type: f.geometry.type,
            coordinates: simplifyCoords(f.geometry.coordinates, 0.002)
          }
        });
        continue;
      }

      // Normal Soviet ADM1
      const histName = (rawName === 'Moscow City' || rawName === 'Moscow') ? 'Mosca (Moskva — Cremlino)' :
        rawName.includes('Petersburg') ? 'Leningrado (Pietrogrado)' :
        rawName.includes('Volgograd') ? 'Oblast di Stalingrado (Caricyn)' :
        rawName.includes('Samara') ? 'Oblast di Kujbyšev (Samara)' :
        rawName.includes('Nizhny') ? 'Oblast di Gor\'kij (Nižnij Novgorod)' :
        rawName.includes('Sverdlovsk') ? 'Oblast di Sverdlovsk (Ekaterinburg)' :
        rawName.includes('Chelyabinsk') ? 'Oblast di Čeljabinsk (Magnitogorsk)' :
        rawName.includes('Karelia') ? 'RSSA di Carelia (Petrozavodsk)' :
        rawName.includes('Murmansk') ? 'Oblast di Murmansk (Flotta del Nord)' :
        rawName.includes('Tatarstan') ? 'RSSA Tatara (Kazan)' :
        rawName.includes('Bashkortostan') ? 'RSSA Baschira (Ufa)' :
        rawName.includes('Dagestan') ? 'RSSA del Daghestan (Machačkala)' :
        rawName.includes('Chechnya') ? 'RSSA Ceceno-Inguscia (Groznyj)' :
        rawName.includes('Tuva') ? 'Repubblica Popolare di Tannu Tuva' :
        rawName === 'Kyiv' ? 'RSS Ucraina — Kiev (Kyïv — Capitale)' :
        rawName.includes('Kharkiv') ? 'RSS Ucraina — Oblast di Charkiv' :
        rawName.includes('Donetsk') ? 'RSS Ucraina — Oblast di Stalino (Donbass)' :
        rawName.includes('Luhansk') ? 'RSS Ucraina — Oblast di Vorošilovgrad' :
        rawName.includes('Dnipropetrovsk') ? 'RSS Ucraina — Oblast di Dnepropetrovsk' :
        rawName.includes('Zaporizhia') ? 'RSS Ucraina — Oblast di Zaporož\'e (DneproGES)' :
        rawName.includes('Crimea') ? 'RSSA di Crimea (Sinferopoli / Sebastopoli)' :
        rawName === 'Sevastopol' ? 'Sebastopoli (Base Navale della Flotta del Mar Nero)' :
        rawName === 'Minsk City' ? 'RSS Bielorussa — Minsk (Capitale)' :
        rawName === 'Minsk' ? 'RSS Bielorussa — Oblast di Minsk Orientale' :
        rawName === 'Vitebsk' ? 'RSS Bielorussa — Oblast di Vitebsk Orientale' :
        rawName === 'Georgia' ? 'RSS Georgiana (Tbilisi)' :
        rawName === 'Armenia' ? 'RSS Armena (Erevan)' :
        rawName === 'Azerbaijan' ? 'RSS Azera — Bacino Petrolifero di Baku e Caspio' :
        rawName === 'Kazakhstan' ? 'RSS Kazaka (Alma-Ata)' :
        rawName === 'Uzbekistan' ? 'RSS Uzbeka (Taškent)' :
        rawName === 'Turkmenistan' ? 'RSS Turkmena (Ašgabat)' :
        rawName === 'Tajikistan' ? 'RSS Tagika (Stalinabad / Dušanbe)' :
        rawName === 'Kyrgyzstan' ? 'RSS Kirghisa (Frunze / Biškek)' :
        `${rawName} (${c === 'RUS' ? 'RSFSR' : 'URSS'})`;

      allFeatures.push({
        type: 'Feature',
        id,
        properties: {
          id,
          NUTS_ID: id,
          CNTR_CODE: 'SU',
          NUTS_NAME: histName,
          HISTORICAL_NAME: histName,
          ADMIN_TITLE: c === 'RUS' ? 'RSFSR — Distretto dell\'URSS' : `Repubblica Socialista Sovietica — URSS`,
          SOV_SSR: c === 'RUS' ? 'RSFSR' : `RSS ${c}`,
          MODERN_ADMIN: `${rawName} (${c})`,
          REGION_KIND: 'SOVIET_UNION_ADM1'
        },
        geometry: {
          type: f.geometry.type,
          coordinates: simplifyCoords(f.geometry.coordinates, 0.002)
        }
      });
    }
  }

  // 3. ADD GRANULAR ODESSA RAIONS: BUDJAK (ROMANIA 1936) & EASTERN ODESSA (SOVIET 1936)
  const ukrAdm2Meta = await (await fetch('https://www.geoboundaries.org/api/current/gbOpen/UKR/ADM2/')).json();
  const ukrAdm2Data = await (await fetch(ukrAdm2Meta.gjDownloadURL)).json();

  const BUDJAK_RAIONS: Record<string, string> = {
    'Bilhorod Dnistrovskyi': 'Județul Cetatea Albă (Akkerman / Bilhorod)',
    'Sarata': 'Județul Cetatea Albă (Sărata)',
    'Tarutyne': 'Județul Cetatea Albă (Tarutino)',
    'Artsyi': 'Județul Cetatea Albă (Arciz / Artsyz)',
    'Tatarbunary': 'Județul Cetatea Albă (Tatarbunar)',
    'Bolhrad': 'Județul Ismail (Bolgrad)',
    'Kiliia': 'Județul Ismail (Chilia Nouă / Foce del Danubio)',
    'Izmali': 'Județul Ismail (Ismail / Porto sul Danubio)',
    'Reni': 'Județul Ismail (Reni / Confine sul Danubio)'
  };

  const EAST_ODESSA_RAIONS = new Set([
    'Biliaivka', 'Ovidiopol', 'Rozdilna', 'Lyman', 'Berezivka', 'Mykolaivka',
    'Shyriaieve', 'Velyks Mykhailivka', 'Ivanivka', 'Zakharivka', 'Okny',
    'Ananiv', 'Podilsk', 'Liubashhivka', 'Kodyma', 'Balta', 'Savran'
  ]);

  for (const f of ukrAdm2Data.features) {
    const rawName = f.properties.shapeName.trim();
    if (BUDJAK_RAIONS[rawName]) {
      count++;
      const id = `ROM_BUDJAK_${count}_${rawName.replace(/[^a-zA-Z0-9]/g, '_')}`;
      allFeatures.push({
        type: 'Feature',
        id,
        properties: {
          id,
          NUTS_ID: id,
          CNTR_CODE: 'RO_BUD',
          NUTS_NAME: BUDJAK_RAIONS[rawName],
          HISTORICAL_NAME: BUDJAK_RAIONS[rawName],
          ADMIN_TITLE: 'Regno di Romania — Basarabia Meridionale (Budjak) / RSS Ucraina (dal 28 giugno 1940)',
          SOV_SSR: 'RSS Ucraina — Oblast di Izmail',
          MODERN_ADMIN: `${rawName} (Oblast di Odessa)`,
          REGION_KIND: 'BUDJAK_TERRITORY'
        },
        geometry: {
          type: f.geometry.type,
          coordinates: simplifyCoords(f.geometry.coordinates, 0.002)
        }
      });
    } else if (EAST_ODESSA_RAIONS.has(rawName)) {
      count++;
      const id = `SOV_ADM1_UKR_${count}_${rawName.replace(/[^a-zA-Z0-9]/g, '_')}`;
      allFeatures.push({
        type: 'Feature',
        id,
        properties: {
          id,
          NUTS_ID: id,
          CNTR_CODE: 'SU',
          NUTS_NAME: `RSS Ucraina — Distretto di ${rawName} (Oblast di Odessa)`,
          HISTORICAL_NAME: `RSS Ucraina — Distretto di ${rawName} (Oblast di Odessa)`,
          ADMIN_TITLE: 'Distretto Militare di Odessa — RSS Ucraina / URSS',
          SOV_SSR: 'RSS Ucraina',
          MODERN_ADMIN: `${rawName} (Oblast di Odessa)`,
          REGION_KIND: 'SOVIET_UNION_ADM1'
        },
        geometry: {
          type: f.geometry.type,
          coordinates: simplifyCoords(f.geometry.coordinates, 0.002)
        }
      });
    }
  }

  console.log(`Saved ${allFeatures.length} total updated USSR and Bessarabia features!`);
  const tsContent = `// File generato automaticamente: Granularizzazione integrale dell'URSS e Territori di Frontiera (1936-1940)
export const USSR_REGIONAL_FEATURES: any[] = ${JSON.stringify(allFeatures, null, 2)};
`;
  fs.writeFileSync(path.join(process.cwd(), 'src/data/ussrRegions.ts'), tsContent, 'utf-8');
}

async function main() {
  await updateKresy();
  await updateUssr();
}

main().catch(err => {
  console.error('Error generating geo:', err);
  process.exit(1);
});
