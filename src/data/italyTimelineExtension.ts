import { FactionType, ResolvedTerritory } from '../types';
import { ITALY_TIMELINE_NORTH, ItalyTimelineProfile } from './italyTimelineNorth';
import { ITALY_TIMELINE_CENTER_SOUTH } from './italyTimelineCenterSouth';
import { ITALY_TIMELINE_ISLANDS_SPECIALS } from './italyTimelineIslandsSpecials';

const ALL_ITALY_PROFILES: Record<string, ItalyTimelineProfile> = {
  ...ITALY_TIMELINE_NORTH,
  ...ITALY_TIMELINE_CENTER_SOUTH,
  ...ITALY_TIMELINE_ISLANDS_SPECIALS,
};

/** Legacy NUTS 2006/2010 and alternate ID mappings to canonical IT_PROVINCES_META keys */
const NUTS_ALIAS_TO_CANONICAL: Record<string, string> = {
  ITG25: 'ITG2D',
  ITG26: 'ITG2E',
  ITG27: 'ITG2F',
  ITG28: 'ITG2G',
  ITF41: 'ITF46',
  ITF42: 'ITF47',
  ITH1: 'ITH10',
  ITH2: 'ITH20',
};

export function normalizeItalyCanonicalId(cleanId: string, normName: string): string {
  const upper = (cleanId || '').toUpperCase().trim();
  // Guard: legacy Test 100 calls { NUTS_ID: 'ITH37', NAME: 'Belluno' }, whereas NUTS-2021 ITH37 is Rovigo.
  if (upper === 'ITH37' && normName.includes('belluno')) return 'ITH33';
  if (NUTS_ALIAS_TO_CANONICAL[upper]) return NUTS_ALIAS_TO_CANONICAL[upper];
  return upper;
}

export function getItalyProfile(canonId: string): ItalyTimelineProfile | undefined {
  return ALL_ITALY_PROFILES[canonId];
}

function makeItResult(
  o: string,
  name: string,
  note: string,
  fac: FactionType,
  adminEntity: string
): ResolvedTerritory {
  return { o, name, note, fac, adminEntity };
}

/**
 * Resolves metropolitan NUTS-3 Italian provinces for Steps 9-19 (DIC 1941 -> SET 1947)
 * using per-province geostorical profiles combined with exact date sovereignty.
 */
export function resolveItalyExtendedStep(
  rawCleanId: string,
  rawName: string,
  normName: string,
  provBaseName: string,
  s: number
): ResolvedTerritory | null {
  const canonId = normalizeItalyCanonicalId(rawCleanId, normName);
  const profile = ALL_ITALY_PROFILES[canonId];
  const baseTitle = provBaseName || rawName || 'Provincia Italiana';

  if (s >= 9 && s <= 11) {
    const phaseTag =
      s === 9
        ? 'Dicembre 1941 — Economia di guerra e dichiarazione agli USA'
        : s === 10
        ? 'Agosto 1942 — Campagne estive dell\'Asse e fronte interno'
        : 'Novembre 1942 — Svolta strategica, area bombing & Operazione Anton';
    const note = profile
      ? `${phaseTag}: ${profile.w41_42}`
      : `${phaseTag}: mobilitazione totale della provincia di ${baseTitle} nello sforzo bellico del Regno d'Italia.`;
    return makeItResult(
      'ITA',
      s === 11 ? `${baseTitle} (Regno d'Italia — Crisi Nov. 1942)` : `${baseTitle} (Regno d'Italia)`,
      note,
      'Asse',
      `Regno d'Italia — Prefettura di ${baseTitle}`
    );
  }

  if (s === 12) {
    // Sicilia: Quadrilatero nord-orientale all'Asse vs Zona Alleata AMGOT
    const isNonSicily = /^(ITC|ITD|ITE|ITH|ITI|ITF|ITG2)/i.test(canonId) || (canonId.startsWith('IT') && !canonId.startsWith('ITG1'));
    const isWordEnna = /(?:^|[\s_—\-,.])enna(?:$|[\s_—\-,.])/.test(normName);

    if (canonId === 'ITG13' || (!isNonSicily && normName.includes('messina'))) {
      return makeItResult(
        'ITA',
        'Messina e Stretto (Quadrilatero Difensivo dell\'Etna — Presidio Asse)',
        profile ? `${profile.l43} Presidio italo-tedesco trincerato a difesa dello Stretto di Messina.` : 'Presidio italo-tedesco dello Stretto di Messina.',
        'Asse',
        "Regno d'Italia — Presidio dello Stretto di Messina (6ª Armata / XIV. Panzerkorps)"
      );
    }
    if (canonId === 'ITG17' || (!isNonSicily && normName.includes('catania'))) {
      return makeItResult(
        'ITA',
        'Catania e Pendici dell\'Etna (Linea Difensiva dell\'Asse — Hermann Göring & Livorno)',
        profile ? `${profile.l43} Fronte italo-tedesco attestato a sud di Catania e sull'Etna contro l'8ª Armata.` : 'Fronte dell\'Etna.',
        'Asse',
        "Regno d'Italia — Fronte dell'Etna (XIV. Panzerkorps / Divisione Hermann Göring)"
      );
    }
    if (canonId === 'ITG12' || (!isNonSicily && normName.includes('palermo'))) {
      return makeItResult(
        'USA',
        'Palermo (Liberata dalla 7ª Armata USA di Patton, 22 Luglio 1943)',
        profile?.l43 || 'Il 22 luglio 1943 la 7ª Armata USA libera Palermo (AMGOT).',
        'Alleati',
        'Allied Military Government of Occupied Territory (AMGOT) — 7th U.S. Army (Lt. Gen. George S. Patton)'
      );
    }
    if (canonId === 'ITG11' || (!isNonSicily && (normName.includes('trapani') || normName.includes('pantelleria')))) {
      return makeItResult(
        'USA',
        'Trapani e Pantelleria (Liberata dalla 7ª Armata USA — Operazione Husky)',
        profile?.l43 || 'Sicilia occidentale liberata dalle forze americane di Patton (AMGOT).',
        'Alleati',
        'Allied Military Government of Occupied Territory (AMGOT) — 7th U.S. Army'
      );
    }
    if (canonId === 'ITG14' || (!isNonSicily && (normName.includes('agrigento') || normName.includes('girgenti') || normName.includes('lampedusa') || normName.includes('licata')))) {
      return makeItResult(
        'USA',
        'Agrigento e Licata (Liberata dalla 7ª Armata USA — Joss Force)',
        profile?.l43 || 'Sbarco USA a Licata (10 luglio 1943) e liberazione di Agrigento (AMGOT).',
        'Alleati',
        'Allied Military Government of Occupied Territory (AMGOT) — 7th U.S. Army'
      );
    }
    if (canonId === 'ITG15' || (!isNonSicily && (normName.includes('caltanissetta') || normName.includes('gela')))) {
      return makeItResult(
        'USA',
        'Caltanissetta e Gela (Liberata dalla 7ª Armata USA — Dime Force)',
        profile?.l43 || 'Respinto a Gela il contrattacco dell\'Asse, la 1ª Divisione USA libera Caltanissetta (AMGOT).',
        'Alleati',
        'Allied Military Government of Occupied Territory (AMGOT) — 7th U.S. Army'
      );
    }
    if (canonId === 'ITG16' || (!isNonSicily && (isWordEnna || normName.includes('castrogiovanni') || normName.includes('provincia di enna')) && !normName.includes('ravenna'))) {
      return makeItResult(
        'USA',
        'Enna (Cuore della Sicilia Liberata — 1ª Divisione Canadese & USA)',
        profile?.l43 || 'Conquista di Enna ad opera di truppe canadesi e USA (AMGOT).',
        'Alleati',
        'Allied Military Government of Occupied Territory (AMGOT) — 15th Army Group'
      );
    }
    if (canonId === 'ITG19' || (!isNonSicily && (normName.includes('siracusa') || normName.includes('syracuse') || normName.includes('augusta')))) {
      return makeItResult(
        'UK',
        'Siracusa e Augusta (Presa dall\'8ª Armata Britannica di Montgomery)',
        profile?.l43 || 'Cattura britannica di Siracusa ed Augusta (10-13 luglio 1943, AMGOT).',
        'Alleati',
        'Allied Military Government of Occupied Territory (AMGOT) — British Eighth Army (General Bernard Montgomery)'
      );
    }
    if (canonId === 'ITG18' || (!isNonSicily && (normName.includes('ragusa') || normName.includes('comiso') || normName.includes('modica')))) {
      return makeItResult(
        'UK',
        'Ragusa e Modica (Liberata dall\'8ª Armata Britannica — XXX Corps)',
        profile?.l43 || 'Sbarco a Pachino e cattura degli aeroporti di Comiso nell\'altopiano ibleo (AMGOT).',
        'Alleati',
        'Allied Military Government of Occupied Territory (AMGOT) — British Eighth Army (XXX Corps)'
      );
    }

    return makeItResult(
      'ITA',
      `${baseTitle} (Governo Badoglio — "La guerra continua")`,
      `${profile?.l43 || `Luglio 1943 in ${baseTitle}.`} Dopo la sfiducia del Gran Consiglio e l'arresto di Mussolini (25 luglio), il governo Badoglio mantiene formalmente l'alleanza con l'Asse mentre tratta in segreto con gli Alleati.`,
      'Asse',
      `Regno d'Italia — Governo Militare del Maresciallo Pietro Badoglio (${baseTitle})`
    );
  }

  // Territory classifications for Steps 13..19
  const isOzav =
    canonId === 'ITH10' ||
    canonId === 'ITH20' ||
    canonId === 'ITH33' ||
    normName.includes('bolzano') ||
    normName.includes('bozen') ||
    normName.includes('trento') ||
    normName.includes('trient') ||
    normName.includes('belluno');

  const isOzak =
    canonId === 'ITH41' ||
    canonId === 'ITH42' ||
    canonId === 'ITH43' ||
    canonId === 'ITH44' ||
    canonId.startsWith('ITH4') ||
    normName.includes('trieste') ||
    normName.includes('gorizia') ||
    normName.includes('udine') ||
    normName.includes('pordenone') ||
    normName.includes('friuli');

  if (s >= 19) {
    if (canonId === 'ITH44' || normName.includes('trieste')) {
      return makeItResult(
        'AMG',
        'Territorio Libero di Trieste — Zona A (AMG-FTT)',
        profile?.post45_47 || 'Trattato di Pace di Parigi (15 settembre 1947): istituzione del TLT/FTT; Zona A amministrata dall\'AMG-FTT.',
        'Alleati',
        'Allied Military Government — Free Territory of Trieste (Maj. Gen. Terence Airey)'
      );
    }
    if (canonId === 'ITH43' || normName.includes('gorizia')) {
      return makeItResult(
        'ITA',
        'Gorizia (Repubblica Italiana — Confine Orientale 1947)',
        profile?.post45_47 || 'Trattato di Pace di Parigi: Gorizia torna all\'Italia cedendo i sobborghi orientali verso Nova Gorica.',
        'Alleati',
        'Repubblica Italiana — Prefettura di Gorizia'
      );
    }
    return makeItResult(
      'ITA',
      `${baseTitle} (Repubblica Italiana)`,
      `${profile?.post45_47 || `Ricostruzione democratica in ${baseTitle}.`} Repubblica Italiana nell'assetto dell'Assemblea Costituente (De Nicola / De Gasperi) e dei Trattati di Pace di Parigi del settembre 1947.`,
      'Alleati',
      `Repubblica Italiana — Prefettura di ${baseTitle}`
    );
  }

  if (s === 18) {
    if (canonId === 'ITH44' || canonId === 'ITH43' || normName.includes('trieste') || normName.includes('gorizia')) {
      const isTs = canonId === 'ITH44' || normName.includes('trieste');
      return makeItResult(
        'AMG',
        `${isTs ? 'Trieste' : 'Gorizia'} (Zona A Linea Morgan — Governo Militare Alleato AMG)`,
        profile?.post45_47 || 'Accordo di Duino (9 giugno 1945): Zona A della Venezia Giulia sotto Governo Militare Alleato (AMG-VG).',
        'Alleati',
        'Allied Military Government (AMG Venezia Giulia)'
      );
    }
    return makeItResult(
      'ITA',
      `${baseTitle} (Regno d'Italia Liberato — Governo Parri)`,
      `${profile?.post45_47 || `Settembre 1945 in ${baseTitle}.`} Regno d'Italia unito e liberato sotto la Luogotenenza di Umberto II e il Governo di Unità Nazionale di Ferruccio Parri.`,
      'Alleati',
      `Regno d'Italia — Prefettura di ${baseTitle}`
    );
  }

  // OZAV & OZAK for Steps 13..17
  if (s >= 13 && s <= 17 && isOzav) {
    const pName =
      canonId === 'ITH10' || normName.includes('bolzano') || normName.includes('bozen')
        ? 'Bolzano / Bozen'
        : canonId === 'ITH20' || normName.includes('trento') || normName.includes('trient')
        ? 'Trento'
        : 'Belluno';
    const note =
      s === 13
        ? `Franz Hofer — Commissario Supremo del Reich: ${profile?.sep43 || `annessione de facto di ${pName} all'Operationszone Alpenvorland (OZAV).`}`
        : s === 17
        ? `${profile?.apr45 || `Fine aprile 1945: ultimi giorni dell'OZAV a ${pName}.`} (Franz Hofer — OZAV)`
        : `${profile?.w44 || `1944: regime di annessione di fatto nell'OZAV a ${pName}.`} (Commissario Supremo Franz Hofer)`;
    return makeItResult(
      'OZAV',
      `${pName} (Operationszone Alpenvorland — Annessione de facto al Terzo Reich)`,
      note,
      'Asse',
      'Operationszone Alpenvorland (Gauleiter Franz Hofer — Bozen / Innsbruck)'
    );
  }

  if (s >= 13 && s <= 17 && isOzak) {
    const isTs = canonId === 'ITH44' || normName.includes('trieste');
    if (s === 17 && isTs) {
      return makeItResult(
        'ITA',
        'Trieste (Insurrezione del CLN — Aprile 1945)',
        profile?.apr45 || '30 aprile 1945: insurrezione armata del CLN di Trieste contro il presidio tedesco.',
        'Alleati',
        'Comitato di Liberazione Nazionale della Venezia Giulia'
      );
    }
    const pName = isTs
      ? 'Trieste'
      : canonId === 'ITH43' || normName.includes('gorizia')
      ? 'Gorizia'
      : canonId === 'ITH41' || normName.includes('pordenone')
      ? 'Pordenone (Friuli Occidentale)'
      : 'Udine / Litorale Adriatico';
    const note =
      s === 13
        ? `Gauleiter Friedrich Rainer — Commissario Supremo OZAK: ${profile?.sep43 || `distacco dalla RSI e annessione di fatto di ${pName} al Litorale Adriatico.`}`
        : s === 17
        ? `${profile?.apr45 || `Fine aprile 1945: crollo dell'OZAK a ${pName}.`} (Friedrich Rainer)`
        : `${profile?.w44 || `1944: repressione tedesca nell'OZAK a ${pName}.`} (Gauleiter Friedrich Rainer)`;
    return makeItResult(
      'OZAK',
      `${pName} (Operationszone Adriatisches Küstenland — Annessione de facto al Terzo Reich)`,
      note,
      'Asse',
      'Operationszone Adriatisches Küstenland (Gauleiter Friedrich Rainer — Trieste / Klagenfurt)'
    );
  }

  // Step 17: Aprile 1945 — Insurrezione CLNAI nel Nord vs Consolidamento/CIL nel Centro-Sud
  if (s === 17) {
    const isAlreadyLiberatedSouthCenter =
      canonId.startsWith('ITG') ||
      canonId.startsWith('ITF') ||
      canonId.startsWith('ITI') ||
      canonId === 'ITH57' ||
      canonId === 'ITH58' ||
      canonId === 'ITH59';
    if (canonId === 'ITI11' || (normName.includes('massa') && !normName.includes('macerata'))) {
      return makeItResult(
        'ITA',
        'Massa-Carrara (Liberata — Sfondamento 25 Aprile / 10 Aprile 1945)',
        profile?.apr45 || 'Aprile 1945: liberazione di Massa-Carrara sulla Linea Gotica occidentale.',
        'Alleati',
        "Regno d'Italia / Comitato di Liberazione Nazionale (CLN Apuano)"
      );
    }
    if (isAlreadyLiberatedSouthCenter) {
      return makeItResult(
        'ITA',
        `${baseTitle} (Italia Liberata — Primavera 1945 & Gruppi di Combattimento)`,
        profile?.apr45 || `Aprile 1945: la provincia di ${baseTitle} sostiene la ricostruzione civile e i Gruppi di Combattimento del Regio Esercito.`,
        'Alleati',
        `Regno d'Italia — Prefettura di ${baseTitle} (Governo Bonomi)`
      );
    }
    return makeItResult(
      'ITA',
      `${baseTitle} (Insurrezione del 25 Aprile — Liberazione CLNAI)`,
      profile?.apr45 || '25 aprile 1945: insurrezione nazionale del CLNAI e sfondamento alleato nella Pianura Padana.',
      'Alleati',
      `Regno d'Italia / Comitato di Liberazione Nazionale Alta Italia (CLNAI — ${baseTitle})`
    );
  }

  // Step 16: Dicembre 1944 — Senio & Gotica
  if (s === 16) {
    const isMassa = canonId === 'ITI11' || (normName.includes('massa') && !normName.includes('macerata'));
    const isLibRomagna =
      canonId === 'ITH57' ||
      canonId === 'ITH58' ||
      canonId === 'ITH59' ||
      normName.includes('ravenna') ||
      normName.includes('forli') ||
      normName.includes('cesena') ||
      normName.includes('rimini');
    const isSouthCenter16 =
      canonId.startsWith('ITG') ||
      canonId.startsWith('ITF') ||
      canonId.startsWith('ITI4') ||
      canonId.startsWith('ITI2') ||
      canonId.startsWith('ITI3') ||
      (canonId.startsWith('ITI1') && !isMassa) ||
      isLibRomagna ||
      normName.includes('roma') ||
      normName.includes('firenze') ||
      normName.includes('pesaro');

    if (isSouthCenter16 && !isMassa) {
      const senioTag = canonId === 'ITH57' || normName.includes('ravenna') ? ' (Fiume Senio)' : '';
      return makeItResult(
        'ITA',
        `${baseTitle} (Italia Liberata — Fronte sul Fiume Senio)`,
        `${profile?.w44 || `Dicembre 1944: provincia di ${baseTitle} liberata a sud del fronte del Senio${senioTag}.`}`,
        'Alleati',
        `Regno d'Italia — Governo Bonomi / Allied Control Commission (${baseTitle})`
      );
    }
    return makeItResult(
      'RSI',
      `${baseTitle} (Repubblica Sociale Italiana — Linea Gotica)`,
      profile?.w44 || `Dicembre 1944: provincia di ${baseTitle} sotto occupazione Wehrmacht/RSI a nord della Linea Gotica.`,
      'Asse',
      `Repubblica Sociale Italiana / Wehrmacht Heeresgruppe C (${baseTitle})`
    );
  }

  // Step 15: Agosto 1944 — Linea Gotica & Firenze / Ancona / Livorno / Siena
  if (s === 15) {
    const isMassa15 = canonId === 'ITI11' || (normName.includes('massa') && !normName.includes('macerata'));
    const isPesaro15 = canonId === 'ITI31' || normName.includes('pesaro');
    if (isMassa15) {
      return makeItResult(
        'RSI',
        'Massa-Carrara (Linea Gotica — Bastione Occidentale Wehrmacht & RSI)',
        profile?.w44 || 'Agosto 1944: bastione tirrenico della Linea Gotica tra Alpi Apuane e mare.',
        'Asse',
        'Repubblica Sociale Italiana / Wehrmacht 14. Armee (Linea Gotica)'
      );
    }
    if (isPesaro15) {
      return makeItResult(
        'RSI',
        'Pesaro e Urbino (Linea Gotica — Offensiva Alleata Imminente)',
        `${profile?.w44 || 'Agosto 1944: settore adriatico della Linea Gotica alla vigilia dell\'Operazione Olive.'} (Operazione Olive scattata il 25 agosto 1944).`,
        'Asse',
        'Repubblica Sociale Italiana / Wehrmacht 10. Armee (Linea Gotica)'
      );
    }
    if (canonId === 'ITI14' || normName.includes('firenze') || normName.includes('florence')) {
      return makeItResult(
        'ITA',
        'Firenze (Liberazione di Firenze — Insurrezione CTLN, Agosto 1944)',
        profile?.w44 || '11 agosto 1944: insurrezione del CTLN e brigate partigiane insieme all\'8ª Armata Britannica.',
        'Alleati',
        'Regno d\'Italia — Comitato Toscano di Liberazione Nazionale (CTLN)'
      );
    }
    if (canonId === 'ITI32' || normName.includes('ancona')) {
      return makeItResult(
        'ITA',
        'Ancona (Liberata dal 2° Corpo Polacco — Gen. Anders)',
        profile?.w44 || '18 luglio 1944: il 2° Corpo Polacco di Anders libera Ancona.',
        'Alleati',
        "Regno d'Italia / 2° Corpo Polacco (Gen. Władysław Anders)"
      );
    }
    // Note: Lucca (ITI12), Pistoia (ITI13), Prato (ITI15) fell in early September 1944, so on 1944-08-31 they are still RSI on the Gothic approach.
    const isLiberated15 =
      canonId.startsWith('ITG') ||
      canonId.startsWith('ITF') ||
      canonId.startsWith('ITI4') ||
      canonId.startsWith('ITI2') ||
      canonId === 'ITI33' ||
      canonId === 'ITI34' ||
      canonId === 'ITI35' ||
      canonId === 'ITI16' ||
      canonId === 'ITI17' ||
      canonId === 'ITI18' ||
      canonId === 'ITI19' ||
      canonId === 'ITI1A' ||
      normName.includes('siena') ||
      normName.includes('livorno') ||
      normName.includes('grosseto') ||
      normName.includes('arezzo') ||
      normName.includes('pisa') ||
      normName.includes('roma') ||
      normName.includes('perugia');
    if (isLiberated15) {
      return makeItResult(
        'ITA',
        `${baseTitle} (Italia Liberata — Avanzata Verso la Linea Gotica)`,
        profile?.w44 || `Agosto 1944: territorio di ${baseTitle} liberato sotto governo Bonomi.`,
        'Alleati',
        `Regno d'Italia — Governo Bonomi (${baseTitle})`
      );
    }
    return makeItResult(
      'RSI',
      `${baseTitle} (Repubblica Sociale Italiana — Ripiegamento sulla Linea Gotica)`,
      profile?.w44 || `Agosto 1944: provincia di ${baseTitle} ancora sotto controllo tedesco e RSI.`,
      'Asse',
      `Repubblica Sociale Italiana / Wehrmacht (${baseTitle})`
    );
  }

  // Step 14: Giugno 1944 — Roma Liberata, Trasimeno & Grosseto (15 giugno)
  if (s === 14) {
    if (canonId === 'ITI43' || normName.includes('roma')) {
      return makeItResult(
        'ITA',
        'Roma (Città Liberata — 4 Giugno 1944)',
        profile?.w44 || '4 giugno 1944: la 5ª Armata USA di Mark Clark libera Roma; Luogotenenza a Umberto II.',
        'Alleati',
        "Regno d'Italia / Fifth U.S. Army (Lt. Gen. Mark W. Clark)"
      );
    }
    if (canonId === 'ITF31' || normName.includes('caserta')) {
      return makeItResult(
        'ITA',
        'Caserta (AFHQ — Quartier Generale Supremo Alleato nel Mediterraneo)',
        profile?.w44 || 'La Reggia di Caserta ospita l\'Allied Force Headquarters (AFHQ).',
        'Alleati',
        "Allied Force Headquarters (AFHQ Caserta) & Regno d'Italia"
      );
    }
    if (canonId === 'ITI34' || normName.includes('ascoli')) {
      return makeItResult(
        'ITA',
        'Ascoli Piceno (Liberata — Corpo Italiano di Liberazione CIL)',
        profile?.w44 || '18 giugno 1944: unità del Corpo Italiano di Liberazione (CIL) liberano Ascoli Piceno.',
        'Alleati',
        "Regno d'Italia — Corpo Italiano di Liberazione (CIL)"
      );
    }
    if (canonId === 'ITI19' || normName.includes('siena')) {
      return makeItResult(
        'RSI',
        'Siena (Retroguardia Wehrmacht & RSI — Liberazione Imminente il 3 Luglio 1944)',
        profile?.w44 || 'Al 30 giugno 1944 Siena è alla vigilia dell\'ingresso del CEF francese che la libererà il 3 luglio 1944.',
        'Asse',
        'Repubblica Sociale Italiana / Wehrmacht 14. Armee'
      );
    }
    if (canonId === 'ITI31' || canonId === 'ITI32' || normName.includes('ancona') || normName.includes('pesaro')) {
      return makeItResult(
        'RSI',
        `${canonId === 'ITI32' || normName.includes('ancona') ? 'Ancona' : 'Pesaro'} (Linea Albert / Trasimeno-Chienti — Wehrmacht & RSI)`,
        `Fine giugno 1944 sulla Linea Albert (Trasimeno-Chienti): ${profile?.w44 || 'la 10ª Armata tedesca contende il passo agli alleati.'}`,
        'Asse',
        'Repubblica Sociale Italiana / Wehrmacht 10. Armee (Albert-Stellung)'
      );
    }
    // Note: Grosseto (ITI1A) was liberated on June 15, 1944! Macerata (ITI33) & Fermo (ITI35) June 19-30!
    const isLiberated14 =
      canonId.startsWith('ITG') ||
      canonId.startsWith('ITF') ||
      canonId.startsWith('ITI4') ||
      canonId.startsWith('ITI2') ||
      canonId === 'ITI33' ||
      canonId === 'ITI35' ||
      canonId === 'ITI1A' ||
      normName.includes('perugia') ||
      normName.includes('terni') ||
      normName.includes('macerata') ||
      normName.includes('grosseto');
    if (isLiberated14) {
      return makeItResult(
        'ITA',
        `${baseTitle} (Italia Liberata — Avanzata Alleata Centro-Italia)`,
        profile?.w44 || `Giugno 1944: provincia di ${baseTitle} liberata dopo il crollo della Linea Gustav e l'Operazione Diadem.`,
        'Alleati',
        `Regno d'Italia — Luogotenenza di Umberto II (${baseTitle})`
      );
    }
    return makeItResult(
      'RSI',
      `${baseTitle} (Repubblica Sociale Italiana — Occupazione Wehrmacht)`,
      profile?.w44 || `Giugno 1944: provincia di ${baseTitle} sotto controllo Wehrmacht/RSI.`,
      'Asse',
      `Repubblica Sociale Italiana / Wehrmacht Heeresgruppe C (${baseTitle})`
    );
  }

  // Step 13: Settembre 1943 — Armistizio, Regno del Sud, RSI
  if (s === 13) {
    const isSicily = canonId.startsWith('ITG1');
    if (isSicily) {
      return makeItResult(
        'USA',
        `${baseTitle} (Sicilia Interamente Liberata — AMGOT)`,
        `${profile?.sep43 || `Con la liberazione dell'intera Sicilia nel settembre 1943, ${baseTitle} opera sotto AMGOT alleato.`}`,
        'Alleati',
        'Allied Military Government of Occupied Territory (AMGOT) — 15th Army Group'
      );
    }
    if (canonId.startsWith('ITG2') || normName.includes('sardegn')) {
      return makeItResult(
        'ITA',
        `${baseTitle} (Regno del Sud — Evacuazione Tedesca & Controllo Governativo)`,
        `${profile?.sep43 || `Le truppe del generale Antonio Basso preservano la Sardegna per il Regno del Sud (Badoglio / Vittorio Emanuele III).`}`,
        'Alleati',
        "Regno d'Italia — Comando Militare della Sardegna (Generale Antonio Basso — Regno del Sud)"
      );
    }
    if (canonId.startsWith('ITF6') || normName.includes('calabria') || normName.includes('reggio calabria')) {
      return makeItResult(
        'ITA',
        `${baseTitle} (Regno del Sud — Liberazione Operazione Baytown)`,
        `${profile?.sep43 || `Liberata dall'avanzata dell'8ª Armata britannica (Operazione Baytown, settembre 1943) nel Regno del Sud cobelligerante.`}`,
        'Alleati',
        "Regno d'Italia — Governo Badoglio (Regno del Sud) / British Eighth Army"
      );
    }
    if (canonId.startsWith('ITF5')) {
      const isMat = canonId === 'ITF52' || normName.includes('matera');
      return makeItResult(
        'ITA',
        isMat ? 'Matera (Insurrezione del 21 Settembre 1943 — Regno del Sud)' : `${baseTitle} (Regno del Sud — Liberata)`,
        profile?.sep43 || `Settembre 1943 in Basilicata (${baseTitle}) integrata nel Regno del Sud.`,
        'Alleati',
        "Regno d'Italia — Governo Badoglio (Regno del Sud)"
      );
    }
    if (canonId.startsWith('ITF4')) {
      const title =
        canonId === 'ITF44' || normName.includes('brindisi')
          ? "Brindisi (Capitale Provvisoria del Regno d'Italia — Re Vittorio Emanuele III & Badoglio)"
          : canonId === 'ITF43' || normName.includes('taranto')
          ? 'Taranto (Base Navale Alleata — Sbarco Operazione Slapstick)'
          : canonId === 'ITF46' || normName.includes('foggia')
          ? "Foggia (Presa dall'8ª Armata Britannica & Grande Polo Aeroportuale Alleato)"
          : `${baseTitle} (Regno del Sud — Sede Istituzionale del Regno d'Italia)`;
      return makeItResult(
        'ITA',
        title,
        profile?.sep43 || `Settembre 1943 in Puglia (${baseTitle}) nel Regno del Sud cobelligerante.`,
        'Alleati',
        "Regno d'Italia — Governo Badoglio a Brindisi (Regno del Sud)"
      );
    }
    if (canonId === 'ITF35' || normName.includes('salerno')) {
      return makeItResult(
        'USA',
        'Salerno (Testa di Ponte Operazione Avalanche — 5ª Armata USA)',
        profile?.sep43 || 'Sbarco di Salerno (Operazione Avalanche, 9 settembre 1943) sotto la 5ª Armata statunitense.',
        'Alleati',
        'Allied 5th Army (Lt. Gen. Mark W. Clark / AMGOT)'
      );
    }
    if (canonId === 'ITF33' || normName.includes('napoli')) {
      return makeItResult(
        'ITA',
        'Napoli (Quattro Giornate di Napoli — Città Insorta e Liberata, 27-30 Settembre 1943)',
        profile?.sep43 || 'Quattro Giornate di Napoli (27-30 settembre 1943): insurrezione cittadina contro gli occupanti tedeschi.',
        'Alleati',
        "Regno d'Italia — Città di Napoli Liberata dall'Insurrezione Popolare (Medaglia d'Oro al Valor Militare)"
      );
    }
    if (canonId === 'ITF32' || canonId === 'ITF34') {
      return makeItResult(
        'ITA',
        `${baseTitle} (Campania Meridionale — Avanzata Alleata del Regno del Sud)`,
        profile?.sep43 || `Liberata a fine settembre 1943 dalle forze alleate nel Regno del Sud.`,
        'Alleati',
        "Regno d'Italia — Governo Badoglio (Regno del Sud)"
      );
    }
    if (canonId === 'ITF31' || normName.includes('caserta')) {
      return makeItResult(
        'RSI',
        'Caserta (Linea Difensiva del Volturno — Occupazione Wehrmacht & RSI)',
        profile?.sep43 || 'Linea difensiva tedesca sul Volturno (Volturno-Linie) presidiata da Wehrmacht e RSI.',
        'Asse',
        'Repubblica Sociale Italiana / Wehrmacht 10. Armee (Volturno-Linie)'
      );
    }

    const isRome = canonId === 'ITI43' || normName.includes('roma');
    return makeItResult(
      'RSI',
      isRome
        ? 'Roma (Occupazione Militare Wehrmacht & Governo della RSI — Fuga a Brindisi)'
        : `${baseTitle} (Repubblica Sociale Italiana — Occupazione Wehrmacht)`,
      profile?.sep43 || `A seguito dell'armistizio dell'8 settembre 1943 e della proclamazione della RSI (23 settembre), la provincia di ${baseTitle} è sotto occupazione militare tedesca e amministrazione fascista repubblicana.`,
      'Asse',
      isRome
        ? 'Wehrmacht — Militärkommandant Rom / Repubblica Sociale Italiana'
        : `Repubblica Sociale Italiana — Governo di Salò (${baseTitle})`
    );
  }

  return null;
}
