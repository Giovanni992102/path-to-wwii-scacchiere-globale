import * as fs from 'fs';
import * as path from 'path';

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
    if (norm.includes('leningrad')) {
      return { itName: 'Oblast di Leningrado', adminTitle: 'Distretto Militare di Leningrado — RSFSR', ssr: 'RSFSR' };
    }
    if (norm.includes('karelia')) {
      return { itName: 'RSSA di Carelia (Petrozavodsk)', adminTitle: 'Repubblica Socialista Sovietica Autonoma di Carelia', ssr: 'RSFSR' };
    }
    if (norm.includes('murmansk')) {
      return { itName: 'Oblast di Murmansk (Penisola di Kola)', adminTitle: 'Base Navale della Flotta del Nord dell\'URSS', ssr: 'RSFSR' };
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
    if (norm.includes('odessa')) return { itName: 'RSS Ucraina — Oblast di Odessa', adminTitle: 'Porto Principale sul Mar Nero e Distretto Militare di Odessa', ssr: 'RSS Ucraina' };
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

async function main() {
  console.log('Fetching all SSR ADM1 features from geoBoundaries...');
  const ssrCodes = ['RUS', 'UKR', 'BLR', 'GEO', 'ARM', 'AZE', 'KAZ', 'UZB', 'TKM', 'TJK', 'KGZ'];
  const allFeatures: any[] = [];
  let count = 0;

  // Western Ukraine & Western Belarus exclusions (already handled with ultra-precision in KRESY_POWIAT_FEATURES)
  const EXCLUDED_UKR = new Set([
    'Lviv Oblast',
    'Ivano-Frankivsk Oblast',
    'Ternopil Oblast',
    'Volyn Oblast',
    'Rivne Oblast',
    'Zakarpattia Oblast', // Czechoslovakia / Hungary
    'Chernivtsi Oblast'   // Romania until June 1940
  ]);
  const EXCLUDED_BLR = new Set([
    'Brest',
    'Grodno'
  ]);
  const EXCLUDED_RUS = new Set([
    'Kaliningrad' // In 1938 was East Prussia (Germany)
  ]);

  for (const c of ssrCodes) {
    console.log(`Downloading ${c}...`);
    const meta = await (await fetch(`https://www.geoboundaries.org/api/current/gbOpen/${c}/ADM1/`)).json();
    const data = await (await fetch(meta.gjDownloadURL)).json();

    for (const f of data.features) {
      const rawName = (f.properties?.shapeName || '').trim();
      if (c === 'UKR' && EXCLUDED_UKR.has(rawName)) continue;
      if (c === 'BLR' && EXCLUDED_BLR.has(rawName)) continue;
      if (c === 'RUS' && EXCLUDED_RUS.has(rawName)) continue;

      count++;
      const id = `SOV_ADM1_${c}_${count}_${rawName.replace(/[^a-zA-Z0-9]/g, '_')}`;
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
          coordinates: simplifyCoords(f.geometry.coordinates, 0.0032)
        }
      });
    }
  }

  console.log(`Generated ${allFeatures.length} Soviet Union granular features!`);
  const tsContent = `// File generato automaticamente: Granularizzazione integrale dell'URSS (1936-1940)
// Include tutte le suddivisioni ADM1 della RSFSR, RSS Ucraina, RSS Bielorussa, Caucaso e Asia Centrale
export const USSR_REGIONAL_FEATURES: any[] = ${JSON.stringify(allFeatures, null, 2)};
`;

  fs.writeFileSync(path.join(process.cwd(), 'src/data/ussrRegions.ts'), tsContent, 'utf-8');
  console.log('Saved src/data/ussrRegions.ts successfully!');
}

main().catch(err => {
  console.error('Error generating USSR geojson:', err);
  process.exit(1);
});
