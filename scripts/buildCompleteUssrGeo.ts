import * as fs from 'fs';
import * as path from 'path';

// Douglas-Peucker simplification function
function simplifyRing(ring: number[][], tolerance = 0.006): number[][] {
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

const SIMPLIFY_TOL = 0.012;

function simplifyCoords(coords: any, tol = SIMPLIFY_TOL): any {
  if (typeof coords[0][0] === 'number') {
    return simplifyRing(coords, tol).map(pt => [Math.round(pt[0] * 1000) / 1000, Math.round(pt[1] * 1000) / 1000]);
  }
  return coords.map((c: any) => simplifyCoords(c, tol));
}

function getHistoricalMetadata(rawName: string, c: string): { itName: string; adminTitle: string; ssr: string } {
  const norm = rawName.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 1. RUSSIAN SFSR
  if (c === 'RUS') {
    if (norm.includes('saintpetersburg') || norm === 'spb') {
      return { itName: 'Leningrado (Pietrogrado)', adminTitle: 'Città di Leningrado — Culla della Rivoluzione d\'Ottobre', ssr: 'RSFSR' };
    }
    if (norm === 'moscow' || norm === 'moscowcity') {
      return { itName: 'Mosca (Moskva — Cremlino)', adminTitle: 'Capitale dell\'URSS e della RSFSR', ssr: 'RSFSR' };
    }
    if (norm.includes('moscow')) {
      return { itName: 'Oblast di Mosca (Moskva)', adminTitle: 'Distretto Militare di Mosca — RSFSR', ssr: 'RSFSR' };
    }
    if (norm.includes('arkhangelsk') || norm.includes('arcangel')) {
      return { itName: 'Oblast di Arcangelo (Mar Bianco)', adminTitle: 'Distretto Militare Settentrionale — RSFSR', ssr: 'RSFSR' };
    }
    if (norm.includes('vologda')) return { itName: 'Oblast di Vologda', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('pskov')) return { itName: 'Oblast di Pskov', adminTitle: 'Frontiera Occidentale — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('novgorod')) return { itName: 'Oblast di Novgorod', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('tver') || norm.includes('kalinin')) return { itName: 'Oblast di Kalinin (Tver)', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('smolensk')) return { itName: 'Oblast di Smolensk (Porta di Mosca)', adminTitle: 'Distretto Militare Bielorusso-Occidentale', ssr: 'RSFSR' };
    if (norm.includes('yaroslavl')) return { itName: 'Oblast di Jaroslavl', adminTitle: 'Distretto Industriale dell\'Alto Volga — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('kostroma')) return { itName: 'Oblast di Kostroma', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('ivanovo')) return { itName: 'Oblast di Ivanovo (Centro Tessile)', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('vladimir')) return { itName: 'Oblast di Vladimir', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('ryazan')) return { itName: 'Oblast di Rjazan', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('tula')) return { itName: 'Oblast di Tula (Arsenale di Tula)', adminTitle: 'Centro Industriale e Metallurgico — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('kaluga')) return { itName: 'Oblast di Kaluga', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('oryol') || norm.includes('orel')) return { itName: 'Oblast di Orël', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('bryansk')) return { itName: 'Oblast di Brjansk (Foreste di Brjansk)', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('kursk')) return { itName: 'Oblast di Kursk (Anomalia Magnetica)', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('belgorod')) return { itName: 'Oblast di Belgorod', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('voronezh')) return { itName: 'Oblast di Voronež', adminTitle: 'Distretto Militare di Voronež — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('lipetsk')) return { itName: 'Oblast di Lipeck', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('tambov')) return { itName: 'Oblast di Tambov', adminTitle: 'Terre Nere — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('penza')) return { itName: 'Oblast di Penza', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('saratov')) return { itName: 'Oblast di Saratov (Volga)', adminTitle: 'Distretto Militare del Volga — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('volgograd') || norm.includes('stalingrad')) return { itName: 'Oblast di Stalingrado (Caricyn)', adminTitle: 'Centro Industriale e dei Trattori di Stalingrado (STZ)', ssr: 'RSFSR' };
    if (norm.includes('rostov')) return { itName: 'Oblast di Rostov (Rostov sul Don)', adminTitle: 'Territorio dei Cosacchi del Don — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('krasnodar') || norm.includes('kuban')) return { itName: 'Territorio di Krasnodar (Kuban)', adminTitle: 'Cosacchi del Kuban / Mar Nero — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('stavropol')) return { itName: 'Territorio di Stavropol (Caucaso Settentrionale)', adminTitle: 'Distretto Militare del Caucaso Settentrionale', ssr: 'RSFSR' };
    if (norm.includes('adygea') || norm.includes('adygeya')) return { itName: 'Oblast Autonoma di Adighezia (Majkop)', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('karachay') || norm.includes('cherkessia')) return { itName: 'Oblast Autonoma Caraciai-Circassa', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('kabardino') || norm.includes('balkar')) return { itName: 'RSSA Cabardino-Balcara (Nalčik)', adminTitle: 'Repubblica Autonoma — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('northossetia') || norm.includes('alania')) return { itName: 'RSSA dell\'Ossezia Settentrionale (Ordžonikidze)', adminTitle: 'Repubblica Autonoma — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('ingushetia') || norm.includes('ingush')) return { itName: 'Inguscezia (Caucaso Settentrionale)', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('chechnya') || norm.includes('chechen')) return { itName: 'RSSA Ceceno-Inguscia (Groznyj — Pozzi Petroliferi)', adminTitle: 'Repubblica Autonoma — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('dagestan')) return { itName: 'RSSA del Daghestan (Machačkala — Mar Caspio)', adminTitle: 'Repubblica Autonoma — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('kalmyk')) return { itName: 'RSSA di Calmucchia (Èlista)', adminTitle: 'Repubblica Autonoma — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('astrakhan')) return { itName: 'Oblast di Astrachan (Delta del Volga)', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('samara') || norm.includes('kuibyshev')) return { itName: 'Oblast di Kujbyšev (Samara)', adminTitle: 'Distretto Militare del Volga — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('ulyanovsk') || norm.includes('simbirsk')) return { itName: 'Oblast di Uljanovsk (Simbirsk)', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('nizhnynovgorod') || norm.includes('gorky')) return { itName: 'Oblast di Gor\'kij (Nižnij Novgorod)', adminTitle: 'Fabbrica Automobilistica GAZ di Gor\'kij — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('kirov') || norm.includes('vyatka')) return { itName: 'Oblast di Kirov (Vjatka)', adminTitle: 'Distretto Militare degli Urali — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('chuvash')) return { itName: 'RSSA Ciuvascia (Čeboksary)', adminTitle: 'Repubblica Autonoma — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('mariel') || norm.includes('mari')) return { itName: 'RSSA dei Mari (Joškar-Ola)', adminTitle: 'Repubblica Autonoma — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('mordov')) return { itName: 'RSSA di Mordovia (Saransk)', adminTitle: 'Repubblica Autonoma — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('tatar')) return { itName: 'RSSA Tatara (Kazan)', adminTitle: 'Repubblica Autonoma sul Volga — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('udmurt')) return { itName: 'RSSA Udmurta (Iževsk — Fabbrica Armi)', adminTitle: 'Repubblica Autonoma — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('bashkort') || norm.includes('bashkir')) return { itName: 'RSSA Baschira (Ufa — Secondo Bacino di Baku)', adminTitle: 'Repubblica Autonoma — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('perm') || norm.includes('molotov')) return { itName: 'Oblast di Molotov (Perm — Urali)', adminTitle: 'Bacino Industriale degli Urali — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('sverdlovsk') || norm.includes('yekaterinburg')) return { itName: 'Oblast di Sverdlovsk (Ekaterinburg)', adminTitle: 'Complesso Industriale-Militare degli Urali (Uralmaš)', ssr: 'RSFSR' };
    if (norm.includes('chelyabinsk') || norm.includes('magnitogorsk')) return { itName: 'Oblast di Čeljabinsk (Magnitogorsk)', adminTitle: 'Gigante Siderurgico di Magnitogorsk e ČTZ', ssr: 'RSFSR' };
    if (norm.includes('orenburg') || norm.includes('chkalov')) return { itName: 'Oblast di Čkalov (Orenburg)', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('kurgan')) return { itName: 'Oblast di Kurgan', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('tyumen')) return { itName: 'Oblast di Tjumen (Siberia Occidentale)', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('khantymansi') || norm.includes('ugra')) return { itName: 'Circondario Nazionale di Ostiachia-Vogulia', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('yamalo') || norm.includes('nenets')) return { itName: 'Circondario Nazionale Jamalo-Nenec', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('komi')) return { itName: 'RSSA dei Komi (Syktyvkar / Pečora)', adminTitle: 'Repubblica Autonoma — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('omsk')) return { itName: 'Oblast di Omsk (Siberia Occidentale)', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('tomsk')) return { itName: 'Oblast di Tomsk', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('novosibirsk')) return { itName: 'Oblast di Novosibirsk', adminTitle: 'Centro della Siberia — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('kemerovo') || norm.includes('kuzbass')) return { itName: 'Oblast di Kemerovo (Bacino del Kuzbass)', adminTitle: 'Gigante del Carbone e dell\'Acciaio Kuzneck', ssr: 'RSFSR' };
    if (norm.includes('altaikrai')) return { itName: 'Territorio dell\'Altaj (Barnaul)', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('altai')) return { itName: 'Oblast Autonoma di Ojrot (Gorno-Altajsk)', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('krasnoyarsk')) return { itName: 'Territorio di Krasnojarsk (Fiume Enisej)', adminTitle: 'Siberia Centrale — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('khakass')) return { itName: 'Oblast Autonoma della Chakassia (Abakan)', adminTitle: 'RSFSR', ssr: 'RSFSR' };
    if (norm.includes('tuva') || norm.includes('tyva')) return { itName: 'Repubblica Popolare di Tuva (Tannu Tuva)', adminTitle: 'Stato Socialista Protetto dall\'URSS', ssr: 'RSFSR' };
    if (norm.includes('irkutsk')) return { itName: 'Oblast di Irkutsk (Lago Bajkal)', adminTitle: 'Siberia Orientale — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('buryat')) return { itName: 'RSSA Buriato-Mongola (Ulan-Udè)', adminTitle: 'Repubblica Autonoma — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('zabaykal') || norm.includes('chita')) return { itName: 'Territorio della Transbajkalia (Čita)', adminTitle: 'Distretto Militare della Transbajkalia — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('sakha') || norm.includes('yakut')) return { itName: 'RSSA Jakuta (Jakutsk — Bacino della Lena)', adminTitle: 'Repubblica Autonoma — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('amur')) return { itName: 'Oblast dell\'Amur (Blagoveščensk)', adminTitle: 'Frontiera dell\'Amur — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('jewish') || norm.includes('birobidzhan')) return { itName: 'Oblast Autonoma Ebraica (Birobidžan)', adminTitle: 'Regione Autonoma dell\'Estremo Oriente — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('khabarovsk')) return { itName: 'Territorio di Chabarovsk (Fiume Amur)', adminTitle: 'Distretto Militare dell\'Estremo Oriente — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('primorsky') || norm.includes('vladivostok')) return { itName: 'Territorio del Litorale (Vladivostok)', adminTitle: 'Base Principale della Flotta del Pacifico dell\'URSS', ssr: 'RSFSR' };
    if (norm.includes('magadan') || norm.includes('kolyma')) return { itName: 'Territorio della Kolyma (Magadan)', adminTitle: 'Distretto Settentrionale — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('kamchatka')) return { itName: 'Penisola di Kamčatka (Petropavlovsk)', adminTitle: 'Base del Pacifico Settentrionale — RSFSR', ssr: 'RSFSR' };
    if (norm.includes('sakhalin')) return { itName: 'Oblast di Sachalin Settentrionale (Aleksandrovsk)', adminTitle: 'Sachalin Sovietica (a nord del 50° parallelo)', ssr: 'RSFSR' };
    if (norm.includes('chukotka')) return { itName: 'Circondario Nazionale di Čukotka (Stretto di Bering)', adminTitle: 'Estremo Oriente Artico — RSFSR', ssr: 'RSFSR' };

    return { itName: `Oblast di ${rawName}`, adminTitle: 'RSFSR — Distretto dell\'URSS', ssr: 'RSFSR' };
  }

  // 2. UKRAINIAN SSR
  if (c === 'UKR') {
    if (norm === 'kyiv' || norm === 'kiev') return { itName: 'RSS Ucraina — Kiev (Kyïv)', adminTitle: 'Capitale della Repubblica Socialista Sovietica Ucraina', ssr: 'RSS Ucraina' };
    if (norm.includes('kyiv') || norm.includes('kiev')) return { itName: 'RSS Ucraina — Oblast di Kiev', adminTitle: 'Distretto Militare di Kiev (KVO)', ssr: 'RSS Ucraina' };
    if (norm.includes('kharkiv') || norm.includes('kharkov')) return { itName: 'RSS Ucraina — Oblast di Charkiv', adminTitle: 'Fabbrica di Locomotive e Carri Armati KhPZ (T-34)', ssr: 'RSS Ucraina' };
    if (norm.includes('dnipropetrovsk') || norm.includes('dnepr')) return { itName: 'RSS Ucraina — Oblast di Dnepropetrovsk', adminTitle: 'Bacino Metallurgico del Dnepr — RSS Ucraina', ssr: 'RSS Ucraina' };
    if (norm.includes('zaporizhia') || norm.includes('zaporozhye')) return { itName: 'RSS Ucraina — Oblast di Zaporož\'e (DneproGES)', adminTitle: 'Centrale Idroelettrica del Dnepr e Impianti Siderurgici', ssr: 'RSS Ucraina' };
    if (norm.includes('donetsk') || norm.includes('stalino')) return { itName: 'RSS Ucraina — Oblast di Stalino (Donbass)', adminTitle: 'Bacino Carbonifero e Industriale del Donbass', ssr: 'RSS Ucraina' };
    if (norm.includes('luhansk') || norm.includes('voroshilovgrad')) return { itName: 'RSS Ucraina — Oblast di Vorošilovgrad', adminTitle: 'Fabbrica di Locomotive Vorošilovgrad — Donbass', ssr: 'RSS Ucraina' };
    if (norm.includes('mykolaiv') || norm.includes('nikolaev')) return { itName: 'RSS Ucraina — Oblast di Nikolaev', adminTitle: 'Cantieri Navali del Mar Nero (Marti / 61 Communards)', ssr: 'RSS Ucraina' };
    if (norm.includes('kherson')) return { itName: 'RSS Ucraina — Oblast di Cherson (Foce del Dnepr)', adminTitle: 'RSS Ucraina', ssr: 'RSS Ucraina' };
    if (norm.includes('crimea') || norm.includes('krym')) return { itName: 'RSSA di Crimea (Sinferopoli / Sebastopoli)', adminTitle: 'Base Navale Principale della Flotta del Mar Nero — RSFSR/URSS', ssr: 'RSFSR' };
    if (norm.includes('sevastopol')) return { itName: 'Sebastopoli (Base Navale)', adminTitle: 'Fortezza e Quartier Generale della Flotta del Mar Nero', ssr: 'RSFSR' };
    if (norm.includes('chernihiv') || norm.includes('chernigov')) return { itName: 'RSS Ucraina — Oblast di Černihiv', adminTitle: 'RSS Ucraina', ssr: 'RSS Ucraina' };
    if (norm.includes('sumy')) return { itName: 'RSS Ucraina — Oblast di Sumy', adminTitle: 'RSS Ucraina', ssr: 'RSS Ucraina' };
    if (norm.includes('poltava')) return { itName: 'RSS Ucraina — Oblast di Poltava', adminTitle: 'Granaio dell\'Ucraina — RSS Ucraina', ssr: 'RSS Ucraina' };
    if (norm.includes('kirovohrad') || norm.includes('kirovo')) return { itName: 'RSS Ucraina — Oblast di Kirovo (Kirovohrad)', adminTitle: 'RSS Ucraina', ssr: 'RSS Ucraina' };
    if (norm.includes('cherkasy')) return { itName: 'RSS Ucraina — Oblast di Čerkasy', adminTitle: 'RSS Ucraina', ssr: 'RSS Ucraina' };
    if (norm.includes('vinnytsia') || norm.includes('vinnitsa')) return { itName: 'RSS Ucraina — Oblast di Vinnica (Podolia Sovietica)', adminTitle: 'RSS Ucraina', ssr: 'RSS Ucraina' };
    if (norm.includes('zhytomyr') || norm.includes('zhitomir')) return { itName: 'RSS Ucraina — Oblast di Žytomyr', adminTitle: 'Distretto Militare Speciale di Kiev', ssr: 'RSS Ucraina' };
    if (norm.includes('khmelnytskyi') || norm.includes('kamianets')) return { itName: 'RSS Ucraina — Oblast di Kam\'janec\'-Podil\'s\'kyj', adminTitle: 'Frontiera Sovietica sul confine del 1921', ssr: 'RSS Ucraina' };

    return { itName: `RSS Ucraina — Oblast di ${rawName}`, adminTitle: 'Repubblica Socialista Sovietica Ucraina', ssr: 'RSS Ucraina' };
  }

  // 3. BYELORUSSIAN SSR
  if (c === 'BLR') {
    if (norm.includes('minskcity')) return { itName: 'RSS Bielorussa — Minsk (Capitale)', adminTitle: 'Capitale della RSS Bielorussa e Distretto Speciale', ssr: 'RSS Bielorussa' };
    if (norm === 'minsk') return { itName: 'RSS Bielorussa — Oblast di Minsk Orientale', adminTitle: 'Distretto Militare Bielorusso', ssr: 'RSS Bielorussa' };
    if (norm.includes('vitebsk')) return { itName: 'RSS Bielorussa — Oblast di Vitebsk Orientale', adminTitle: 'Distretto Militare Bielorusso', ssr: 'RSS Bielorussa' };
    if (norm.includes('mogilev')) return { itName: 'RSS Bielorussa — Oblast di Mogilev', adminTitle: 'Distretto Militare Bielorusso', ssr: 'RSS Bielorussa' };
    if (norm.includes('gomel')) return { itName: 'RSS Bielorussa — Oblast di Gomel (Polesie Orientale)', adminTitle: 'Distretto Militare Bielorusso', ssr: 'RSS Bielorussa' };

    return { itName: `RSS Bielorussa — Oblast di ${rawName}`, adminTitle: 'Repubblica Socialista Sovietica Bielorussa', ssr: 'RSS Bielorussa' };
  }

  // 4. TRANSCAUCASIAN SSRs
  if (c === 'GEO') {
    if (norm.includes('abkhaz')) return { itName: 'RSSA Abkhaza (Suchumi — Mar Nero)', adminTitle: 'Repubblica Autonoma — RSS Georgiana', ssr: 'RSS Georgiana' };
    if (norm.includes('adjar') || norm.includes('ajaria')) return { itName: 'RSSA Agiara (Batumi — Porto Petrolifero)', adminTitle: 'Repubblica Autonoma — RSS Georgiana', ssr: 'RSS Georgiana' };
    if (norm.includes('tbilisi') || norm.includes('tiflis')) return { itName: 'RSS Georgiana — Tbilisi (Tiflis — Capitale)', adminTitle: 'Capitale della Repubblica Socialista Sovietica Georgiana', ssr: 'RSS Georgiana' };
    if (norm.includes('ossetia')) return { itName: 'Oblast Autonoma dell\'Ossezia del Sud (Cchinvali)', adminTitle: 'RSS Georgiana', ssr: 'RSS Georgiana' };
    return { itName: `RSS Georgiana — ${rawName}`, adminTitle: 'Repubblica Socialista Sovietica Georgiana', ssr: 'RSS Georgiana' };
  }

  if (c === 'ARM') {
    if (norm.includes('yerevan') || norm.includes('erevan')) return { itName: 'RSS Armena — Erevan (Capitale)', adminTitle: 'Capitale della Repubblica Socialista Sovietica Armena', ssr: 'RSS Armena' };
    return { itName: `RSS Armena — ${rawName}`, adminTitle: 'Repubblica Socialista Sovietica Armena', ssr: 'RSS Armena' };
  }

  if (c === 'AZE') {
    if (norm.includes('nakhchivan')) return { itName: 'RSSA di Naxçıvan (Exclave sul confine Persiano)', adminTitle: 'Repubblica Autonoma — RSS Azera', ssr: 'RSS Azera' };
    return { itName: 'RSS Azera — Distretto Petrolifero di Baku e Caspio', adminTitle: 'Cuore Energetico dell\'URSS — RSS Azera', ssr: 'RSS Azera' };
  }

  // 5. CENTRAL ASIAN SSRs
  if (c === 'KAZ') {
    if (norm.includes('almaty') || norm.includes('almaata')) return { itName: 'RSS Kazaka — Alma-Ata (Capitale)', adminTitle: 'Capitale della RSS Kazaka', ssr: 'RSS Kazaka' };
    return { itName: `RSS Kazaka — Oblast di ${rawName}`, adminTitle: 'Repubblica Socialista Sovietica Kazaka', ssr: 'RSS Kazaka' };
  }

  if (c === 'UZB') {
    if (norm.includes('tashkent')) return { itName: 'RSS Uzbeka — Taškent (Capitale)', adminTitle: 'Capitale della RSS Uzbeka', ssr: 'RSS Uzbeka' };
    if (norm.includes('karakalpak')) return { itName: 'RSSA Karakalpaka (Nukus / Lago d\'Aral)', adminTitle: 'Repubblica Autonoma — RSS Uzbeka', ssr: 'RSS Uzbeka' };
    if (norm.includes('samarkand')) return { itName: 'RSS Uzbeka — Samarcanda (Via della Seta)', adminTitle: 'RSS Uzbeka', ssr: 'RSS Uzbeka' };
    return { itName: `RSS Uzbeka — ${rawName}`, adminTitle: 'Repubblica Socialista Sovietica Uzbeka', ssr: 'RSS Uzbeka' };
  }

  if (c === 'TKM') {
    if (norm.includes('ashgabat') || norm.includes('ashkhabad')) return { itName: 'RSS Turkmena — Ašgabat (Capitale)', adminTitle: 'Capitale della RSS Turkmena', ssr: 'RSS Turkmena' };
    return { itName: `RSS Turkmena — ${rawName}`, adminTitle: 'Repubblica Socialista Sovietica Turkmena', ssr: 'RSS Turkmena' };
  }

  if (c === 'TJK') {
    if (norm.includes('dushanbe') || norm.includes('stalinabad')) return { itName: 'RSS Tagika — Stalinabad (Dušanbe — Capitale)', adminTitle: 'Capitale della RSS Tagika', ssr: 'RSS Tagika' };
    if (norm.includes('badakhshan') || norm.includes('pamir')) return { itName: 'Oblast Autonoma del Gorno-Badachšan (Pamir)', adminTitle: 'RSS Tagika', ssr: 'RSS Tagika' };
    return { itName: `RSS Tagika — ${rawName}`, adminTitle: 'Repubblica Socialista Sovietica Tagika', ssr: 'RSS Tagika' };
  }

  if (c === 'KGZ') {
    if (norm.includes('bishkek') || norm.includes('frunze')) return { itName: 'RSS Kirghisa — Frunze (Biškek — Capitale)', adminTitle: 'Capitale della RSS Kirghisa', ssr: 'RSS Kirghisa' };
    return { itName: `RSS Kirghisa — ${rawName}`, adminTitle: 'Repubblica Socialista Sovietica Kirghisa', ssr: 'RSS Kirghisa' };
  }

  return {
    itName: `${rawName} (${c === 'RUS' ? 'RSFSR' : 'URSS'})`,
    adminTitle: 'Suddivisione Territoriale — URSS',
    ssr: c === 'RUS' ? 'RSFSR' : `RSS ${c}`
  };
}

// Complete NW Russia and Finnish Border raion configurations
const NW_DISTRICT_CONFIGS: Record<string, {
  id: string;
  isFinnishHist?: boolean;
  cntrCode?: string;
  itName: string;
  adminTitle: string;
  sovSsr: string;
  sovName?: string;
}> = {
  // FINNISH HISTORICAL BORDER TERRITORIES (TARTU BORDER 1920-1940)
  'Vyborgsky District': {
    id: 'FIN_HIST_259_Vyborgsky_District',
    isFinnishHist: true,
    cntrCode: 'FIN_KARELIA',
    itName: 'Viipurin lääni — Viipuri e Koivisto (Istmo Careliano Occidentale)',
    adminTitle: 'Repubblica di Finlandia — Confini storici del Trattato di Tartu (1920-1940)',
    sovSsr: 'RSFSR / Carelia',
    sovName: 'Distretto di Vyborg (Oblast di Leningrado / Carelia)'
  },
  'Käkisalmi District': {
    id: 'FIN_HIST_274_K_kisalmi_District',
    isFinnishHist: true,
    cntrCode: 'FIN_KARELIA',
    itName: 'Viipurin lääni — Käkisalmi (Kexholm / Istmo Careliano Orientale)',
    adminTitle: 'Repubblica di Finlandia — Confini storici del Trattato di Tartu (1920-1940)',
    sovSsr: 'RSFSR / Carelia',
    sovName: 'Distretto di Priozersk (Käkisalmi / URSS)'
  },
  'Lahdenpohja District': {
    id: 'FIN_HIST_283_Lahdenpohja_District',
    isFinnishHist: true,
    cntrCode: 'FIN_KARELIA',
    itName: 'Laatokan Karjala — Lahdenpohja e Jaakkima (Carelia Ladogana)',
    adminTitle: 'Repubblica di Finlandia — Confini storici del Trattato di Tartu (1920-1940)',
    sovSsr: 'RSSA di Carelia',
    sovName: 'Distretto di Lahdenpohja (RSSA di Carelia / URSS)'
  },
  'Sortavala District': {
    id: 'FIN_HIST_289_Sortavala_District',
    isFinnishHist: true,
    cntrCode: 'FIN_KARELIA',
    itName: 'Laatokan Karjala — Sortavala e Valamo (Carelia Ladogana)',
    adminTitle: 'Repubblica di Finlandia — Confini storici del Trattato di Tartu (1920-1940)',
    sovSsr: 'RSSA di Carelia',
    sovName: 'Distretto di Sortavala (RSSA di Carelia / URSS)'
  },
  'Pitkäranta District': {
    id: 'FIN_HIST_270_Pitk_ranta_District',
    isFinnishHist: true,
    cntrCode: 'FIN_KARELIA',
    itName: 'Laatokan Karjala — Pitkäranta e Salmi (Carelia Ladogana Orientale)',
    adminTitle: 'Repubblica di Finlandia — Confini storici del Trattato di Tartu (1920-1940)',
    sovSsr: 'RSSA di Carelia',
    sovName: 'Distretto di Pitkäranta (RSSA di Carelia / URSS)'
  },
  'Suojärvi District': {
    id: 'FIN_HIST_290_Suoj_rvi_District',
    isFinnishHist: true,
    cntrCode: 'FIN_KARELIA',
    itName: 'Raja-Karjala — Suojärvi e Korpiselkä (Carelia di Frontiera)',
    adminTitle: 'Repubblica di Finlandia — Confini storici del Trattato di Tartu (1920-1940)',
    sovSsr: 'RSSA di Carelia',
    sovName: 'Distretto di Suojärvi (RSSA di Carelia / URSS)'
  },
  'Koutero District': {
    id: 'FIN_HIST_282_Koutero_District',
    isFinnishHist: true,
    cntrCode: 'FIN_SALLA',
    itName: 'Salla Settentrionale e Kovdor (Kuolajärvi / Settore Settentrionale)',
    adminTitle: 'Repubblica di Finlandia — Territorio storico di Salla-Kuusamo (1920-1940)',
    sovSsr: 'Oblast di Murmansk',
    sovName: 'Distretto di Kovdor e Salla Nord (URSS)'
  },
  'Petsamo District': {
    id: 'FIN_HIST_262_Petsamo_District',
    isFinnishHist: true,
    cntrCode: 'FIN_PETSAMO',
    itName: 'Petsamo (Petsamon lääni / Liinahamari — Sbocco Artico)',
    adminTitle: 'Repubblica di Finlandia — Corridoio Artico e Miniere di Nichel (1920-1944)',
    sovSsr: 'Oblast di Murmansk',
    sovName: 'Distretto di Pečenga (Petsamo / URSS)'
  },

  // ALL 16 LENINGRAD OBLAST DISTRICTS (INCLUDING LUGA / LAUKAA)
  'Laukaa District': {
    id: 'SOV_NW_RUS_307_Luzhsky_District',
    itName: 'Oblast di Leningrado — Luga (Linea Difensiva di Luga / Lužskij Rubež)',
    adminTitle: 'Distretto Militare di Leningrado — Linea Fortificata sul Fiume Luga (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Kaarosta District': {
    id: 'SOV_NW_RUS_256_Kaarosta_District',
    itName: 'Oblast di Leningrado — Lomonosov (Oranienbaum)',
    adminTitle: 'Distretto Militare di Leningrado — Costa Sud del Golfo di Finlandia (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Tusina District': {
    id: 'SOV_NW_RUS_258_Tusina_District',
    itName: 'Oblast di Leningrado — Tosno (Ljusina)',
    adminTitle: 'Distretto Militare di Leningrado — Corridoio Ferroviario Principale Mosca-Leningrado (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Slantsevsky District': {
    id: 'SOV_NW_RUS_260_Slantsevsky_District',
    itName: 'Oblast di Leningrado — Slancy (Bacino degli Scisti Bituminosi)',
    adminTitle: 'Distretto Industriale ed Energetico — Confine con l\'Estonia (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Gatchinsky District': {
    id: 'SOV_NW_RUS_263_Gatchinsky_District',
    itName: 'Oblast di Leningrado — Gatčina (Krasnogvardejsk)',
    adminTitle: 'Distretto Militare e Nodo Ferroviario di Krasnogvardejsk (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Vsevolozhsky District': {
    id: 'SOV_NW_RUS_271_Vsevolozhsky_District',
    itName: 'Oblast di Leningrado — Vsevoložsk (Ingria Settentrionale)',
    adminTitle: 'Distretto Settentrionale di Leningrado — Tra San Pietroburgo e il Lago Ladoga (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Sosnovy Bor': {
    id: 'SOV_NW_RUS_272_Sosnovy_Bor',
    itName: 'Oblast di Leningrado — Sosnovyj Bor (Golfo di Finlandia)',
    adminTitle: 'Distretto Costiero Sud del Golfo di Finlandia (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Korotka District': {
    id: 'SOV_NW_RUS_280_Korotka_District',
    itName: 'Oblast di Leningrado — Kirovsk (Mga / Šlissel\'burg)',
    adminTitle: 'Punto Strategico della Neva e Sbocco sul Lago Ladoga (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Olhava District': {
    id: 'SOV_NW_RUS_286_Olhava_District',
    itName: 'Oblast di Leningrado — Volchov (Centrale Idroelettrica VolchovGES)',
    adminTitle: 'Centrale Idroelettrica e Nodo Fluviale di Volchov (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Tihvinä District': {
    id: 'SOV_NW_RUS_291_Tihvin__District',
    itName: 'Oblast di Leningrado — Tichvin (Nodo Ferroviario Strategico)',
    adminTitle: 'Nodo Ferroviario Vitale di Rifornimento verso Leningrado (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Volosovsky District': {
    id: 'SOV_NW_RUS_293_Volosovsky_District',
    itName: 'Oblast di Leningrado — Volosovo (Ingria Meridionale)',
    adminTitle: 'Distretto Agricolo e Ferroviario a Sud-Ovest di Leningrado (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Boksitogorsky District': {
    id: 'SOV_NW_RUS_301_Boksitogorsky_District',
    itName: 'Oblast di Leningrado — Boksitogorsk (Miniere di Bauxite)',
    adminTitle: 'Bacino Minerario di Alluminio e Bauxite di Boksitogorsk (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Lotinapelto District': {
    id: 'SOV_NW_RUS_302_Lotinapelto_District',
    itName: 'Oblast di Leningrado — Lodejnoe Pole (Fiume Svir\')',
    adminTitle: 'Distretto Navale e Idroelettrico del Basso Svir\' (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Koskenala District': {
    id: 'SOV_NW_RUS_267_Koskenala_District',
    itName: 'Oblast di Leningrado — Podporož\'e (Koskenala / Alto Svir\')',
    adminTitle: 'Distretto Idroelettrico e Fluviale dell\'Alto Svir\' (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Kirishsky District': {
    id: 'SOV_NW_RUS_304_Kirishsky_District',
    itName: 'Oblast di Leningrado — Kiriši (Basso Volchov)',
    adminTitle: 'Distretto sul Fiume Volchov a Sud-Est di Leningrado (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Jaama District': {
    id: 'SOV_NW_RUS_306_Jaama_District',
    itName: 'Oblast di Leningrado — Kingisepp (Jamburg)',
    adminTitle: 'Distretto di Frontiera sul Fiume Luga e Confine Estone (RSFSR)',
    sovSsr: 'RSFSR'
  },

  // KARELIA ASSR & MURMANSK OBLAST RAIONS
  'Kantalahti District': {
    id: 'SOV_NW_RUS_308_Kantalahti_District',
    itName: 'Oblast di Murmansk — Kandalakša (Golfo di Kandalakša / Mar Bianco)',
    adminTitle: 'Distretto Ferroviario e Portuale di Kandalakša — Mar Bianco (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Petroskoi District': {
    id: 'SOV_NW_RUS_261_Petroskoi_District',
    itName: 'RSSA di Carelia — Petrozavodsk (Capitale)',
    adminTitle: 'Capitale della Repubblica Autonoma di Carelia — Sponda del Lago Onega (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Kuola District': {
    id: 'SOV_NW_RUS_264_Kuola_District',
    itName: 'Oblast di Murmansk — Distretto di Kola',
    adminTitle: 'Distretto della Penisola di Kola — Settore Artico (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Äänisenranta District': {
    id: 'SOV_NW_RUS_265___nisenranta_District',
    itName: 'RSSA di Carelia — Prionežskij (Lago Onega)',
    adminTitle: 'Distretto Costiero del Lago Onega (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'ЗАТО Североморск': {
    id: 'SOV_NW_RUS_266_________________',
    itName: 'Oblast di Murmansk — Severomorsk (Vajenga / Base Navale)',
    adminTitle: 'Comando della Flotta Sovietica del Nord — Fiordo di Kola (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Turja District': {
    id: 'SOV_NW_RUS_268_Turja_District',
    itName: 'Oblast di Murmansk — Penisola di Kola (Tersky / Mar Bianco)',
    adminTitle: 'Costa Meridionale della Penisola di Kola (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Kemsky District': {
    id: 'SOV_NW_RUS_269_Kemsky_District',
    itName: 'RSSA di Carelia — Kem\' (Mar Bianco)',
    adminTitle: 'Porto e Distretto Ferroviario di Kem\' — Golfo di Onega (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'ЗАТО Островной': {
    id: 'SOV_NW_RUS_273_______________',
    itName: 'Oblast di Murmansk — Ostrovnoj (Jokanga / Costa di Murman)',
    adminTitle: 'Base Navale Artica — Mare di Barents (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Olenegorsk': {
    id: 'SOV_NW_RUS_275_Olenegorsk',
    itName: 'Oblast di Murmansk — Olenegorsk (Miniere di Ferro)',
    adminTitle: 'Bacino Minerario Centrale di Kola (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Puutoisten District': {
    id: 'SOV_NW_RUS_276_Puutoisten_District',
    itName: 'RSSA di Carelia — Pudož (Sponda Est dell\'Onega)',
    adminTitle: 'Distretto Forestale e Fluviale della Carelia Orientale (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Aunus District': {
    id: 'SOV_NW_RUS_277_Aunus_District',
    itName: 'RSSA di Carelia — Olonec (Aunus / Sponda Est del Ladoga)',
    adminTitle: 'Distretto Storico di Olonec — Lago Ladoga (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Kalevala District': {
    id: 'SOV_NW_RUS_278_Kalevala_District',
    itName: 'RSSA di Carelia — Kalevala (Uhtua)',
    adminTitle: 'Distretto Nazionale di Kalevala — Carelia Settentrionale (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Kontupohja District': {
    id: 'SOV_NW_RUS_279_Kontupohja_District',
    itName: 'RSSA di Carelia — Kondopoga (Cartiere e Lago Onega)',
    adminTitle: 'Centro Industriale e Idroelettrico di Kondopoga (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Kostamus City District': {
    id: 'SOV_NW_RUS_281_Kostamus_City_District',
    itName: 'RSSA di Carelia — Kostomukša',
    adminTitle: 'Distretto Minerario di Frontiera della Carelia (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Louhi District': {
    id: 'SOV_NW_RUS_284_Louhi_District',
    itName: 'RSSA di Carelia — Louhi (Circolo Polare Artico)',
    adminTitle: 'Distretto Settentrionale di Carelia sulla Ferrovia di Murmansk (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Medvezhyegorsky District': {
    id: 'SOV_NW_RUS_285_Medvezhyegorsky_District',
    itName: 'RSSA di Carelia — Medvež\'egorsk (Canale Mar Bianco-Baltico)',
    adminTitle: 'Nodo Strategico del Canale Stalin Mar Bianco-Baltico (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Prääsä District': {
    id: 'SOV_NW_RUS_287_Pr__s__District',
    itName: 'RSSA di Carelia — Prjaža (Prääsä)',
    adminTitle: 'Distretto Rurale della Carelia Meridionale (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Sorokka District': {
    id: 'SOV_NW_RUS_288_Sorokka_District',
    itName: 'RSSA di Carelia — Belomorsk (Soroka / Foce Canale Mar Bianco)',
    adminTitle: 'Porto sul Mar Bianco e Terminale Nord del Canale Stalin (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Vidyayevo': {
    id: 'SOV_NW_RUS_292_Vidyayevo',
    itName: 'Oblast di Murmansk — Vidjaevo (Ura Guba / Mare di Barents)',
    adminTitle: 'Posto Navale Avanzato nel Fiordo di Ura (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'городской округ Апатиты': {
    id: 'SOV_NW_RUS_294________________________',
    itName: 'Oblast di Murmansk — Apatity (Monti Chibiny)',
    adminTitle: 'Bacino Minerario di Apatite dei Monti Chibiny (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'городской округ Мончегорск': {
    id: 'SOV_NW_RUS_295___________________________',
    itName: 'Oblast di Murmansk — Mončegorsk (Miniere di Nichel Severonikel)',
    adminTitle: 'Complesso Metallurgico e Minerario di Mončegorsk (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Murmansk': {
    id: 'SOV_NW_RUS_297_Murmansk',
    itName: 'Oblast di Murmansk — Città di Murmansk (Porto Libero dai Ghiacci)',
    adminTitle: 'Capoluogo dell\'Oblast di Murmansk e Porto Artico Strategico (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Segezhsky District': {
    id: 'SOV_NW_RUS_298_Segezhsky_District',
    itName: 'RSSA di Carelia — Segeža (Lago Vygozero)',
    adminTitle: 'Distretto Industriale e Fluviale sul Lago Vygozero (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Polyarnye Zori Urban Okrug': {
    id: 'SOV_NW_RUS_299_Polyarnye_Zori_Urban_Okrug',
    itName: 'Oblast di Murmansk — Poljarnye Zori (Lago Imandra / Fiume Niva)',
    adminTitle: 'Bacino Idroelettrico del Fiume Niva (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Alexandrovsk, Murmansk Oblast': {
    id: 'SOV_NW_RUS_300_Alexandrovsk__Murmansk_Oblast',
    itName: 'Oblast di Murmansk — Aleksandrovsk (Poljarnyj / Base Flotta del Nord)',
    adminTitle: 'Base Navale Principale della Flotta del Nord a Poljarnyj (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'городской округ Кировск': {
    id: 'SOV_NW_RUS_303________________________',
    itName: 'Oblast di Murmansk — Kirovsk (Chibinogorsk)',
    adminTitle: 'Centro Minerario Artico di Chibinogorsk (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Luujärvi District': {
    id: 'SOV_NW_RUS_305_Luuj_rvi_District',
    itName: 'Oblast di Murmansk — Lovozero (Tundra Centrale di Kola)',
    adminTitle: 'Distretto Nazionale Sami di Lovozero (RSFSR)',
    sovSsr: 'RSFSR'
  },
  'Mujejärvi District': {
    id: 'SOV_NW_RUS_257_Mujej_rvi_District',
    itName: 'RSSA di Carelia — Distretto di Mujejärvi',
    adminTitle: 'Distretto di Frontiera della Carelia Sovietica (RSFSR)',
    sovSsr: 'RSFSR'
  }
};

const BUDJAK_RAIONS: Record<string, string> = {
  'Bilhorod-Dnistrovskyi': 'Județul Cetatea Albă (Akkerman / Bilhorod)',
  'Bilhorod-Dnistrovs\'kyi': 'Județul Cetatea Albă (Akkerman / Bilhorod)',
  'Bilhorod Dnistrovskyi': 'Județul Cetatea Albă (Akkerman / Bilhorod)',
  'Sarata': 'Județul Cetatea Albă (Sărata)',
  'Tarutyne': 'Județul Cetatea Albă (Tarutino)',
  'Artsyz': 'Județul Cetatea Albă (Arciz / Artsyz)',
  'Artsyi': 'Județul Cetatea Albă (Arciz / Artsyz)',
  'Tatarbunary': 'Județul Cetatea Albă (Tatarbunar)',
  'Bolhrad': 'Județul Ismail (Bolgrad)',
  'Kiliia': 'Județul Ismail (Chilia Nouă / Foce del Danubio)',
  'Izmail': 'Județul Ismail (Ismail / Porto sul Danubio)',
  'Izmali': 'Județul Ismail (Ismail / Porto sul Danubio)',
  'Reni': 'Județul Ismail (Reni / Confine sul Danubio)'
};

const BESSARABIA_DISTRICT_NAMES: Record<string, { itName: string; roName: string }> = {
  'Chişinău': { itName: 'Provincia di Bessarabia — Chișinău (Capitale Regionale)', roName: 'Județul Lăpușna (Chișinău)' },
  'Bălţi': { itName: 'Provincia di Bessarabia — Bălți (Bessarabia Centrale)', roName: 'Județul Bălți' },
  'Bender': { itName: 'Provincia di Bessarabia — Tighina (Bender / Fiume Dnestr)', roName: 'Județul Tighina' },
  'Cahul': { itName: 'Provincia di Bessarabia — Cahul (Bessarabia Meridionale)', roName: 'Județul Cahul' },
  'Soroca': { itName: 'Provincia di Bessarabia — Soroca (Fortezza sul Dnestr)', roName: 'Județul Soroca' },
  'Orhei': { itName: 'Provincia di Bessarabia — Orhei (Codrii)', roName: 'Județul Orhei' },
  'Briceni': { itName: 'Provincia di Bessarabia — Briceni (Hotin Meridionale)', roName: 'Județul Hotin' },
  'Edineţ': { itName: 'Provincia di Bessarabia — Edineț (Bessarabia Settentrionale)', roName: 'Județul Hotin' },
  'Ocniţa': { itName: 'Provincia di Bessarabia — Ocnița (Ansa del Dnestr)', roName: 'Județul Soroca' },
  'Donduseni': { itName: 'Provincia di Bessarabia — Dondușeni', roName: 'Județul Soroca' },
  'Drochia': { itName: 'Provincia di Bessarabia — Drochia', roName: 'Județul Soroca' },
  'Rîşcani': { itName: 'Provincia di Bessarabia — Rîșcani', roName: 'Județul Bălți' },
  'Glodeni': { itName: 'Provincia di Bessarabia — Glodeni (Fiume Prut)', roName: 'Județul Bălți' },
  'Făleşti': { itName: 'Provincia di Bessarabia — Fălești', roName: 'Județul Bălți' },
  'Sîngerei': { itName: 'Provincia di Bessarabia — Sîngerei', roName: 'Județul Bălți' },
  'Floreşti': { itName: 'Provincia di Bessarabia — Florești', roName: 'Județul Soroca' },
  'Şoldăneşti': { itName: 'Provincia di Bessarabia — Șoldănești', roName: 'Județul Orhei' },
  'Rezina': { itName: 'Provincia di Bessarabia — Rezina (Fiume Dnestr)', roName: 'Județul Orhei' },
  'Teleneşti': { itName: 'Provincia di Bessarabia — Telenești', roName: 'Județul Orhei' },
  'Ungheni': { itName: 'Provincia di Bessarabia — Ungheni (Ponte sul Prut)', roName: 'Județul Bălți' },
  'Calarasi': { itName: 'Provincia di Bessarabia — Călărași', roName: 'Județul Lăpușna' },
  'Nisporeni': { itName: 'Provincia di Bessarabia — Nisporeni', roName: 'Județul Lăpușna' },
  'Străşeni': { itName: 'Provincia di Bessarabia — Strășeni (Codrii)', roName: 'Județul Lăpușna' },
  'Criuleni': { itName: 'Provincia di Bessarabia — Criuleni (Fiume Dnestr)', roName: 'Județul Orhei' },
  'Dubăsari': { itName: 'Provincia di Bessarabia — Dubăsari Ovest (Riva Destra)', roName: 'Județul Lăpușna' },
  'AneniiNoi': { itName: 'Provincia di Bessarabia — Anenii Noi', roName: 'Județul Tighina' },
  'Ialoveni': { itName: 'Provincia di Bessarabia — Ialoveni', roName: 'Județul Lăpușna' },
  'Hîncesti': { itName: 'Provincia di Bessarabia — Hîncești', roName: 'Județul Lăpușna' },
  'Causeni': { itName: 'Provincia di Bessarabia — Căușeni', roName: 'Județul Tighina' },
  'ŞtefanVoda': { itName: 'Provincia di Bessarabia — Ștefan Vodă (Liman del Dnestr)', roName: 'Județul Cetatea Albă' },
  'Cimişlia': { itName: 'Provincia di Bessarabia — Cimișlia', roName: 'Județul Tighina' },
  'Leova': { itName: 'Provincia di Bessarabia — Leova (Fiume Prut)', roName: 'Județul Cahul' },
  'Cantemir': { itName: 'Provincia di Bessarabia — Cantemir (Fiume Prut)', roName: 'Județul Cahul' },
  'Basarabeasca': { itName: 'Provincia di Bessarabia — Basarabeasca', roName: 'Județul Tighina' },
  'Găgăuzia': { itName: 'Provincia di Bessarabia — Comrat (Gagauzia / Steppa del Bugeac)', roName: 'Județul Cahul / Tighina' },
  'Taraclia': { itName: 'Provincia di Bessarabia — Taraclia (Bugeac Settentrionale)', roName: 'Județul Cahul' }
};

const EAST_ODESSA_RAIONS = new Set([
  'Biliaivka', 'Ovidiopol', 'Rozdilna', 'Lyman', 'Berezivka', 'Mykolaivka',
  'Shyriaieve', 'Velyka Mykhailivka', 'Velyks Mykhailivka', 'Ivanivka', 'Zakharivka', 'Okny',
  'Ananiv', 'Podilsk', 'Liubashivka', 'Liubashhivka', 'Kodyma', 'Balta', 'Savran'
]);

async function main() {
  console.log('1. Generating updated USSR regions...');
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
  // Exclude Kaliningrad, Leningrad Oblast, Karelia, Murmansk (these 3 replaced by granular ADM2 districts)
  const EXCLUDED_RUS_ADM1 = new Set(['Kaliningrad', 'Leningrad oblast', 'Republic of Karelia', 'Murmansk Oblast']);

  // Fetch ADM1 for all republics
  for (const c of ssrCodes) {
    console.log(`Fetching ADM1 for ${c}...`);
    const meta = await (await fetch(`https://www.geoboundaries.org/api/current/gbOpen/${c}/ADM1/`)).json();
    const data = await (await fetch(meta.gjDownloadURL)).json();

    for (const f of data.features) {
      const rawName = (f.properties?.shapeName || '').trim();
      if (c === 'UKR' && EXCLUDED_UKR_ADM1.has(rawName)) continue;
      if (c === 'BLR' && EXCLUDED_BLR_ADM1.has(rawName)) continue;
      if (c === 'RUS' && EXCLUDED_RUS_ADM1.has(rawName)) continue;

      count++;
      const id = `SOV_ADM1_${c}_${count}_${rawName.replace(/[^a-zA-Z0-9]/g, '_')}`;

      // Chernivtsi (Northern Bukovina): Romanian in steps 0-5, Soviet in step 6
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

      const metaInfo = getHistoricalMetadata(rawName, c);
      allFeatures.push({
        type: 'Feature',
        id,
        properties: {
          id,
          NUTS_ID: id,
          CNTR_CODE: 'SU',
          NUTS_NAME: metaInfo.itName,
          HISTORICAL_NAME: metaInfo.itName,
          ADMIN_TITLE: metaInfo.adminTitle,
          SOV_SSR: metaInfo.ssr,
          MODERN_ADMIN: `${rawName} (${c})`,
          REGION_KIND: 'SOVIET_UNION_ADM1'
        },
        geometry: {
          type: f.geometry.type,
          coordinates: simplifyCoords(f.geometry.coordinates)
        }
      });
    }
  }

  // 2. Fetch RUS ADM2 for Leningrad Oblast, Karelia, Murmansk raions and Finnish border territories
  console.log('Fetching RUS ADM2 for NW Russia, Leningrad Oblast, Karelia, Murmansk...');
  const rus2Meta = await (await fetch('https://www.geoboundaries.org/api/current/gbOpen/RUS/ADM2/')).json();
  const rus2Data = await (await fetch(rus2Meta.gjDownloadURL)).json();

  let nwCount = 0;
  for (const f of rus2Data.features) {
    const rawName = (f.properties?.shapeName || '').trim();
    const config = NW_DISTRICT_CONFIGS[rawName];
    if (config) {
      nwCount++;
      const id = config.id;
      allFeatures.push({
        type: 'Feature',
        id,
        properties: {
          id,
          NUTS_ID: id,
          CNTR_CODE: config.cntrCode || (config.isFinnishHist ? 'FI_HIST' : 'SU'),
          NUTS_NAME: config.itName,
          HISTORICAL_NAME: config.itName,
          SOV_NAME: config.sovName,
          ADMIN_TITLE: config.adminTitle,
          SOV_SSR: config.sovSsr,
          MODERN_ADMIN: `${rawName} (Russia)`,
          REGION_KIND: config.isFinnishHist ? 'FINNISH_HISTORICAL_ADM2' : 'SOVIET_UNION_ADM2'
        },
        geometry: {
          type: f.geometry.type,
          coordinates: simplifyCoords(f.geometry.coordinates)
        }
      });
    }
  }
  console.log(`Added ${nwCount} granular NW Russia / Finnish border districts.`);

  // 3. Fetch UKR ADM2 for Budjak and East Odessa raions
  console.log('Fetching UKR ADM2 for Budjak and Odessa split...');
  const ukr2Meta = await (await fetch('https://www.geoboundaries.org/api/current/gbOpen/UKR/ADM2/')).json();
  const ukr2Data = await (await fetch(ukr2Meta.gjDownloadURL)).json();

  for (const f of ukr2Data.features) {
    const rawName = (f.properties?.shapeName || '').trim();
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
          coordinates: simplifyCoords(f.geometry.coordinates)
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
          coordinates: simplifyCoords(f.geometry.coordinates)
        }
      });
    }
  }

  // 4. Fetch MDA ADM1 for Bessarabia and Transnistria
  console.log('Fetching MDA ADM1 for Bessarabia and Transnistria (MASSR)...');
  const mdaMeta = await (await fetch('https://www.geoboundaries.org/api/current/gbOpen/MDA/ADM1/')).json();
  const mdaData = await (await fetch(mdaMeta.gjDownloadURL)).json();

  let mdaCount = 0;
  for (const f of mdaData.features) {
    const rawName = (f.properties?.shapeName || '').trim();
    const isTransnistria = rawName === 'Transnistria' || rawName.toLowerCase().includes('transnistr') || rawName.toLowerCase().includes('stanga nistrului');

    if (isTransnistria) {
      count++;
      mdaCount++;
      const id = 'SOV_MASSR_310_Transnistria';
      allFeatures.push({
        type: 'Feature',
        id,
        properties: {
          id,
          NUTS_ID: id,
          CNTR_CODE: 'SOV_MASSR',
          NUTS_NAME: 'RSSA Moldava — Transnistria (Tiraspol / Rîbnița / Dubăsari)',
          HISTORICAL_NAME: 'RSSA Moldava — Transnistria (Capitale Tiraspol 1929-1940)',
          SOV_NAME: 'RSSA Moldava (URSS / RSS Ucraina)',
          ADMIN_TITLE: 'Repubblica Socialista Sovietica Autonoma Moldava (MASSR / URSS) — Capitale Tiraspol (1924-1940)',
          SOV_SSR: 'RSSA Moldava / RSS Ucraina',
          MODERN_ADMIN: 'Transnistria / Stânga Nistrului',
          REGION_KIND: 'SOVIET_UNION_ADM1'
        },
        geometry: {
          type: f.geometry.type,
          coordinates: simplifyCoords(f.geometry.coordinates)
        }
      });
    } else {
      count++;
      mdaCount++;
      const cleanKey = rawName.replace(/[^a-zA-Z]/g, '');
      const besInfo = BESSARABIA_DISTRICT_NAMES[rawName] || BESSARABIA_DISTRICT_NAMES[cleanKey] || {
        itName: `Provincia di Bessarabia — ${rawName}`,
        roName: `Județul ${rawName}`
      };
      const id = `ROM_BES_${count}_${rawName.replace(/[^a-zA-Z0-9]/g, '_')}`;
      allFeatures.push({
        type: 'Feature',
        id,
        properties: {
          id,
          NUTS_ID: id,
          CNTR_CODE: 'RO_BES',
          NUTS_NAME: besInfo.itName,
          HISTORICAL_NAME: `Regno di Romania — Provincia di Bessarabia (${besInfo.roName})`,
          SOV_NAME: `RSS Moldava — Distretto di ${rawName} (URSS)`,
          ADMIN_TITLE: `Regno di Romania — Provincia di Bessarabia (${besInfo.roName}) / RSS Moldava (dal 28 giugno 1940)`,
          SOV_SSR: 'RSS Moldava',
          MODERN_ADMIN: `${rawName} (Moldova)`,
          REGION_KIND: 'BESSARABIA_TERRITORY'
        },
        geometry: {
          type: f.geometry.type,
          coordinates: simplifyCoords(f.geometry.coordinates)
        }
      });
    }
  }
  console.log(`Added ${mdaCount} districts for Bessarabia and Transnistria (MASSR).`);

  // Double check special Salla-Alakurtti district if separate
  const hasAlakurtti = allFeatures.some(f => f.id.includes('Salla_Alakurtti'));
  if (!hasAlakurtti) {
    // Look up in rus2Data for Kandalakshsky or Salla
    const kand = rus2Data.features.find((f: any) => f.properties?.shapeName?.includes('Kandalaksh'));
    if (kand) {
      allFeatures.push({
        type: 'Feature',
        id: 'FIN_HIST_296_Salla_Alakurtti_District',
        properties: {
          id: 'FIN_HIST_296_Salla_Alakurtti_District',
          NUTS_ID: 'FIN_HIST_296_Salla_Alakurtti_District',
          CNTR_CODE: 'FI_HIST',
          NUTS_NAME: 'Salla Orientale e Alakurtti (Kuolajärvi / Märkäjärvi)',
          HISTORICAL_NAME: 'Salla Orientale e Alakurtti (Kuolajärvi / Märkäjärvi)',
          SOV_NAME: 'Distretto di Alakurtti (Salla Ceduta all\'URSS)',
          ADMIN_TITLE: 'Repubblica di Finlandia — Territorio storico di Salla-Kuusamo (1920-1940)',
          SOV_SSR: 'Oblast di Murmansk',
          MODERN_ADMIN: 'Alakurtti / West Kandalaksha (Russia)',
          REGION_KIND: 'FINNISH_HISTORICAL_ADM2'
        },
        geometry: {
          type: kand.geometry.type,
          coordinates: simplifyCoords(kand.geometry.coordinates)
        }
      });
    }
  }

  console.log(`Total features compiled: ${allFeatures.length}`);

  // Write with standard formatting and atomic safety
  const tempPath = path.join(process.cwd(), 'src/data/ussrRegions.ts.tmp');
  const finalPath = path.join(process.cwd(), 'src/data/ussrRegions.ts');

  const tsHeader = `// File generato automaticamente: Granularizzazione integrale dell'URSS e Territori di Frontiera (1936-1940)
// Include tutte le suddivisioni ADM1 e i distretti granulari di Leningrado, Carelia, Murmansk e Bessarabia
export const USSR_REGIONAL_FEATURES: any[] = `;

  const jsonStr = JSON.stringify(allFeatures);
  const fullContent = `${tsHeader}${jsonStr};\n`;

  fs.writeFileSync(tempPath, fullContent, 'utf-8');
  fs.renameSync(tempPath, finalPath);

  console.log(`Successfully wrote ${fullContent.length} bytes to ${finalPath}`);
}

main().catch(err => {
  console.error('Error generating complete USSR geo:', err);
  process.exit(1);
});
