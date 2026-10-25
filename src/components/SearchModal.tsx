import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, MapPin, ArrowRight, Shield, Crosshair, Anchor } from 'lucide-react';
import { SearchResultItem } from '../types';
import { getOwnerMeta, getOverlord } from '../data/owners';
import { normStr } from '../data/georesolver';
import { HISTORICAL_BATTLES, HistoricalBattle } from '../data/historicalBattles';
import { HISTORICAL_FORTIFICATION_LINES, FortificationLine, HISTORICAL_NAVAL_BASES, NavalBase } from '../data/historicalFortifications';
import { tacticalAudio } from '../data/audioSynthesizer';
import { CountryFlag } from '../data/historicalFlags';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allFeatures: any[];
  currentStep: number;
  onSelectFeature: (feature: any) => void;
  onSelectBattle?: (battle: HistoricalBattle) => void;
  onSelectFortification?: (fort: FortificationLine) => void;
  onSelectNavalBase?: (base: NavalBase) => void;
}

export const ISLAND_SEARCH_ALIASES: Record<string, string[]> = {
  MV_MALDIVE: ['maldive', 'maldives', 'male', 'ceylon', 'oceano indiano'],
  PF_POLYNESIA: ['polinesia', 'polynesia', 'polinesia francese', 'tahiti', 'papeete', 'oceania', 'pacifico', 'societa', 'tuamotu'],
  US_HAWAII: ['hawaii', 'pearl harbor', 'oahu', 'honolulu', 'pacifico', 'stati uniti'],
  MU_MAURITIUS: ['mauritius', 'port louis', 'oceano indiano'],
  SC_SEYCHELLES: ['seychelles', 'victoria', 'mahe', 'oceano indiano'],
  RE_REUNION: ['reunion', 'la reunion', 'saint denis', 'oceano indiano'],
  KM_COMOROS: ['comore', 'comoros', 'comores', 'moroni', 'mayotte'],
  BM_BERMUDA: ['bermuda', 'hamilton', 'atlantico'],
  FK_FALKLAND: ['falkland', 'malvinas', 'isole falkland', 'islas malvinas', 'port stanley', 'stanley'],
  SH_HELENA: ["sant'elena", 'sant elena', 'saint helena', 'st helena', 'jamestown', 'ascension'],
  CV_CAPEVERDE: ['capo verde', 'cabo verde', 'cape verde', 'praia', 'mindelo', 'atlantico'],
  ST_SAOTOME: ['sao tome', 'san tome', 'sao tome e principe', 'principe', 'golfo di guinea'],
  GL_GREENLAND: ['groenlandia', 'greenland', 'gronland', 'nuuk', 'godthab', 'artico'],
  CK_COOK: ['cook', 'isole cook', 'cook islands', 'avarua', 'rarotonga'],
  NR_NAURU: ['nauru', 'pleasant island', 'fosfati'],
  TV_ELLICE: ['tuvalu', 'ellice', 'isole ellice', 'funafuti'],
  KI_GILBERT: ['gilbert', 'isole gilbert', 'kiribati', 'tarawa'],
};

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  allFeatures,
  currentStep,
  onSelectFeature,
  onSelectBattle,
  onSelectFortification,
  onSelectNavalBase,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const searchResults = useMemo(() => {
    if (!query || query.trim().length < 2) return { features: [], battles: [], forts: [], naval: [] };

    const q = normStr(query.trim());
    const features: SearchResultItem[] = [];
    const seen = new Set<string>();

    const isGermanQuery =
      q.includes('terzo reich') ||
      q.includes('third reich') ||
      q.includes('drittes reich') ||
      q.includes('reich tedesco') ||
      q.includes('grossdeutsch') ||
      q.includes('großdeutsch') ||
      q.includes('germania') ||
      q.includes('deutschland') ||
      q.includes('germany');

    const isItalianQuery =
      q.includes('italia') ||
      q.includes('italy') ||
      q.includes('regno d\'italia') ||
      q.includes('fascist');

    const isSovietQuery =
      q.includes('urss') ||
      q.includes('soviet') ||
      q.includes('unione sovietica') ||
      q.includes('sssr') ||
      q.includes('russia');

    const isFrenchQuery =
      q.includes('francia') ||
      q.includes('france') ||
      q.includes('repubblica francese') ||
      q.includes('troisieme republique') ||
      q.includes('stato francese') ||
      q.includes('etat francais') ||
      q.includes('vichy') ||
      q.includes('france libre') ||
      q.includes('impero coloniale francese') ||
      q.includes('empire colonial');

    const isBalkanQuery =
      q.includes('balcan') ||
      q.includes('balkan');

    const isYugoslavQuery =
      q.includes('jugoslav') ||
      q.includes('yugoslav') ||
      q.includes('serbi') ||
      q.includes('croaz') ||
      q.includes('croat') ||
      q.includes('sloven') ||
      q.includes('bosn') ||
      q.includes('montenegr') ||
      q.includes('macedon');

    const isHungarianQuery =
      q.includes('ungheria') ||
      q.includes('hungar') ||
      q.includes('magyar') ||
      q.includes('horthy');

    const isRomanianQuery =
      q.includes('romania') ||
      q.includes('romeni') ||
      q.includes('romeno') ||
      q.includes('transilvan') ||
      q.includes('basarab') ||
      q.includes('craiova');

    const isBulgarianQuery =
      q.includes('bulgaria') ||
      q.includes('bulgar') ||
      q.includes('cadrilater') ||
      q.includes('dobrug');

    const isGreekQuery =
      q.includes('grecia') ||
      q.includes('greec') ||
      q.includes('greco') ||
      q.includes('greca') ||
      q.includes('metaxas') ||
      q.includes('hellas');

    const isAlbanianQuery =
      q.includes('albania') ||
      q.includes('alban') ||
      q.includes('shqip') ||
      q.includes('zog');

    const isCzechoslovakQuery =
      q.includes('cecoslovacc') ||
      q.includes('czecho') ||
      q.includes('boemia') ||
      q.includes('moravia') ||
      q.includes('slovacc') ||
      q.includes('sudet') ||
      q.includes('ruten') ||
      q.includes('zaolzie') ||
      q.includes('benes');

    const isPolishQuery =
      q.includes('polon') ||
      q.includes('poland') ||
      q.includes('polska') ||
      q.includes('kresy') ||
      q.includes('rzeczpospolita') ||
      q.includes('volinia') ||
      q.includes('wolyn') ||
      q.includes('polesie') ||
      q.includes('galicja') ||
      q.includes('galizia');

    const isAfricaQuery =
      q.includes('africa') ||
      q.includes('afrique') ||
      q.includes('maghreb') ||
      q.includes('sahara') ||
      q.includes('sahel') ||
      q.includes('corno d\'africa') ||
      q.includes('horn of africa') ||
      q.includes('aoi') ||
      q.includes('aof') ||
      q.includes('aef') ||
      q.includes('congo');

    const isScandinavianQuery =
      q.includes('scandinav') ||
      q.includes('nordic') ||
      q.includes('nordik');

    const isDanishQuery =
      q.includes('danimarc') ||
      q.includes('denmark') ||
      q.includes('danmark') ||
      q.includes('danes') ||
      q.includes('danese') ||
      q.includes('danesi') ||
      q.includes('copenaghen') ||
      q.includes('copenhagen') ||
      q.includes('kobenhavn') ||
      q.includes('faroe') ||
      q.includes('groenland');

    const isSwedishQuery =
      q.includes('svezia') ||
      q.includes('sweden') ||
      q.includes('sverige') ||
      q.includes('svedes') ||
      q.includes('svedese') ||
      q.includes('svedesi') ||
      q.includes('stoccolma') ||
      q.includes('stockholm');

    const isNorwegianQuery =
      q.includes('norvegia') ||
      q.includes('norway') ||
      q.includes('norge') ||
      q.includes('norveges') ||
      q.includes('norvegese') ||
      q.includes('norvegesi') ||
      q.includes('oslo') ||
      q.includes('narvik') ||
      q.includes('quisling');

    const isFinnishQuery =
      q.includes('finland') ||
      q.includes('suomi') ||
      q.includes('finlandes') ||
      q.includes('finlandese') ||
      q.includes('finlandesi') ||
      q.includes('helsinki') ||
      q.includes('mannerheim') ||
      q.includes('karelia') ||
      q.includes('carelia') ||
      q.includes('talvisota') ||
      q.includes('petsamo') ||
      q.includes('salla');

    // 1. Search in geodetic features
    for (const f of allFeatures) {
      const p = f.properties || {};
      const res = f.__res ? f.__res[currentStep] : null;
      if (!res) continue;

      const rawModern = p.MODERN_NAME || p.NUTS_NAME || p.NAME_ENGL || p.CNTR_NAME || f.__itname || '';
      const modern = (rawModern && p.CNTR_NAME && !rawModern.includes(p.CNTR_NAME))
        ? `${rawModern} (${p.CNTR_NAME})`
        : rawModern;
      const hist = res.name || '';
      const nid = String(p.NUTS_ID || p.CNTR_ID || '');
      const note = res.note || res.historicalContext || '';
      const admin = res.adminEntity || '';
      const ownerMeta = getOwnerMeta(res.o);
      const ownerLabel = ownerMeta.l(currentStep);
      const ownerShort = ownerMeta.shortName || '';
      const ownerLeader = ownerMeta.leader || '';

      const normModern = normStr(modern);
      const normHist = normStr(hist);
      const normNid = normStr(nid);
      const normNote = normStr(note);
      const normAdmin = normStr(admin);
      const normOwner = normStr(ownerLabel);
      const normShort = normStr(ownerShort);
      const normLeader = normStr(ownerLeader);
      const normCntr = normStr(p.CNTR_NAME || '');
      const normLatn = normStr(p.NAME_LATN || '');
      const normEngl = normStr(p.NAME_ENGL || '');
      const normModernName = normStr(p.MODERN_NAME || '');

      const overlord = getOverlord(res.o, currentStep);
      const matchesOverlord = overlord
        ? normStr(overlord.shortName || '').includes(q) || normStr(overlord.l(currentStep)).includes(q)
        : false;

      const matchesAlias = ownerMeta.aliases
        ? ownerMeta.aliases.some((a) => normStr(a).includes(q))
        : false;

      const isFrenchOwner =
        res.o === 'FRA' ||
        res.o === 'VIC' ||
        res.o === 'FFL_AEF' ||
        res.o.startsWith('F_') ||
        res.o.startsWith('VIC_');

      const isBalkanOwner =
        res.o === 'YUG' ||
        res.o === 'HUN' ||
        res.o === 'ROM' ||
        res.o === 'BUL' ||
        res.o === 'GRE' ||
        res.o === 'ALB';

      const isCzechoslovakTerritory =
        res.o === 'CZE' ||
        res.o === 'SLO' ||
        String(f.id || '').startsWith('CZE_') ||
        String(p.NUTS_ID || '').startsWith('CZE_') ||
        String(p.CNTR_CODE || '') === 'CZ' ||
        String(p.CNTR_CODE || '') === 'SK';

      const isPolishTerritory =
        res.o === 'POL' ||
        String(f.id || '').startsWith('PL_KRESY_') ||
        String(p.NUTS_ID || '').startsWith('PL') ||
        String(p.CNTR_CODE || '') === 'PL' ||
        p.REGION_KIND === 'POLISH_EASTERN_POWIAT';

      const isAfricanTerritory =
        res.o === 'F_NAF' ||
        res.o === 'VIC_NAF' ||
        res.o === 'F_AOF' ||
        res.o === 'VIC_AOF' ||
        res.o === 'F_AEF' ||
        res.o === 'FFL_AEF' ||
        res.o === 'F_SOM' ||
        res.o === 'VIC_SOM' ||
        res.o === 'F_MAD' ||
        res.o === 'VIC_MAD' ||
        res.o === 'SAF' ||
        res.o === 'LBR' ||
        res.o === 'ETH' ||
        (res.o === 'ITA' && (normHist.includes('libia') || normHist.includes('tripoli') || normHist.includes('eritrea') || normHist.includes('somalia') || normHist.includes('aoi') || normHist.includes('etiopia') || normHist.includes('amhara') || normHist.includes('harar') || normHist.includes('galla'))) ||
        (res.o === 'BEL' && (normHist.includes('congo') || normHist.includes('ruanda') || normHist.includes('urundi'))) ||
        (res.o === 'POR' && (normHist.includes('angola') || normHist.includes('mocambique') || normHist.includes('mozambique') || normHist.includes('guine') || normHist.includes('cabo verde') || normHist.includes('sao tome'))) ||
        ((res.o === 'SPR' || res.o === 'SPA') && (normHist.includes('sahara') || normHist.includes('rio de oro') || normHist.includes('guinea') || normHist.includes('ifni') || normHist.includes('marruecos') || normHist.includes('rif') || normHist.includes('tanger') || normHist.includes('marocco'))) ||
        (res.o === 'UK' && (normHist.includes('egypt') || normHist.includes('egitto') || normHist.includes('sudan') || normHist.includes('nigeria') || normHist.includes('gold coast') || normHist.includes('sierra leone') || normHist.includes('gambia') || normHist.includes('kenya') || normHist.includes('uganda') || normHist.includes('tanganyika') || normHist.includes('zanzibar') || normHist.includes('nyasaland') || normHist.includes('rhodesia') || normHist.includes('bechuanaland') || normHist.includes('basutoland') || normHist.includes('swaziland') || normHist.includes('somaliland')));

      const isMoroccoQuery = q.includes('maroc') || q.includes('moroc') || q.includes('marruec');
      const isMoroccoTerritory =
        normHist.includes('maroc') ||
        normHist.includes('morocco') ||
        normHist.includes('marocco') ||
        normModern.includes('morocco') ||
        normModern.includes('maroc');

      const isScandinavianTerritory =
        res.o === 'DEN' ||
        res.o === 'SWE' ||
        res.o === 'NOR' ||
        res.o === 'FIN' ||
        res.o === 'ISL' ||
        String(p.CNTR_CODE || '') === 'DK' ||
        String(p.CNTR_CODE || '') === 'SE' ||
        String(p.CNTR_CODE || '') === 'NO' ||
        String(p.CNTR_CODE || '') === 'FI' ||
        String(p.CNTR_CODE || '') === 'IS' ||
        String(f.id || '').startsWith('DK') ||
        String(f.id || '').startsWith('SE') ||
        String(f.id || '').startsWith('NO') ||
        String(f.id || '').startsWith('FI') ||
        String(f.id || '').startsWith('FIN_HIST_') ||
        String(p.NUTS_ID || '').startsWith('DK') ||
        String(p.NUTS_ID || '').startsWith('SE') ||
        String(p.NUTS_ID || '').startsWith('NO') ||
        String(p.NUTS_ID || '').startsWith('FI');

      const matchesOwnerAlias =
        (res.o === 'GER' && isGermanQuery) ||
        (res.o === 'ITA' && isItalianQuery) ||
        (res.o === 'SOV' && isSovietQuery) ||
        (isFrenchOwner && isFrenchQuery) ||
        (isBalkanOwner && isBalkanQuery) ||
        (res.o === 'YUG' && isYugoslavQuery) ||
        (res.o === 'HUN' && isHungarianQuery) ||
        (res.o === 'ROM' && isRomanianQuery) ||
        (res.o === 'BUL' && isBulgarianQuery) ||
        (res.o === 'GRE' && isGreekQuery) ||
        (res.o === 'ALB' && isAlbanianQuery) ||
        (isCzechoslovakTerritory && isCzechoslovakQuery) ||
        (isPolishTerritory && isPolishQuery) ||
        (isAfricanTerritory && isAfricaQuery) ||
        (isMoroccoTerritory && isMoroccoQuery) ||
        (isScandinavianTerritory && isScandinavianQuery) ||
        ((res.o === 'DEN' || String(p.CNTR_CODE || '') === 'DK') && isDanishQuery) ||
        ((res.o === 'SWE' || String(p.CNTR_CODE || '') === 'SE') && isSwedishQuery) ||
        ((res.o === 'NOR' || String(p.CNTR_CODE || '') === 'NO') && isNorwegianQuery) ||
        ((res.o === 'FIN' || String(p.CNTR_CODE || '') === 'FI' || String(f.id || '').startsWith('FIN_HIST_')) && isFinnishQuery) ||
        matchesAlias ||
        matchesOverlord;

      const matchesIslandAlias = Boolean(
        f.id &&
        ISLAND_SEARCH_ALIASES[f.id] &&
        ISLAND_SEARCH_ALIASES[f.id].some((alias) => q.includes(alias) || alias.includes(q))
      );

      if (
        normModern.includes(q) ||
        normHist.includes(q) ||
        normNid.includes(q) ||
        normNote.includes(q) ||
        normAdmin.includes(q) ||
        normOwner.includes(q) ||
        normShort.includes(q) ||
        normLeader.includes(q) ||
        normCntr.includes(q) ||
        normLatn.includes(q) ||
        normEngl.includes(q) ||
        normModernName.includes(q) ||
        matchesOwnerAlias ||
        matchesIslandAlias
      ) {
        const uniqueKey = `${hist}_${modern}_${nid}`;
        if (!seen.has(uniqueKey)) {
          seen.add(uniqueKey);
          features.push({
            id: uniqueKey,
            historicalName: hist || modern,
            modernName: modern,
            ownerKey: res.o,
            ownerLabel: ownerLabel,
            featureRef: f,
          });
        }
      }

      if (features.length >= 35) break;
    }

    // 2. Search in battles
    const battles = HISTORICAL_BATTLES.filter((b) => {
      const nb = normStr(b.name);
      const ns = normStr(b.significance);
      const nr = normStr(b.result);
      const nbel = normStr(b.belligerents);
      const nca = normStr(b.commanderA || '');
      const ncb = normStr(b.commanderB || '');
      const isGermanBattle =
        isGermanQuery &&
        (nbel.includes('reich') ||
          nbel.includes('tedesc') ||
          nbel.includes('wehrmacht') ||
          nbel.includes('germania') ||
          nca.includes('hitler') ||
          ncb.includes('hitler'));
      const isFrenchBattle =
        isFrenchQuery &&
        (nbel.includes('frances') ||
          nbel.includes('francais') ||
          nbel.includes('france') ||
          nbel.includes('vichy') ||
          nb.includes('sedan') ||
          nb.includes('dunkerque') ||
          nb.includes('dakar') ||
          nb.includes('mers-el-kebir') ||
          nb.includes('alpi') ||
          nca.includes('de gaulle') ||
          ncb.includes('de gaulle') ||
          nca.includes('petain') ||
          ncb.includes('petain'));
      const isBalkanBattle =
        (isBalkanQuery || isYugoslavQuery || isHungarianQuery || isRomanianQuery || isBulgarianQuery || isGreekQuery || isAlbanianQuery) &&
        (nbel.includes('jugoslav') ||
          nbel.includes('ungheria') ||
          nbel.includes('romania') ||
          nbel.includes('bulgaria') ||
          nbel.includes('grecia') ||
          nbel.includes('albania') ||
          nb.includes('vienna') ||
          nb.includes('craiova') ||
          nb.includes('elli') ||
          nb.includes('ruthenia') ||
          nb.includes('kárpátalja'));
      const isPolishBattle =
        isPolishQuery &&
        (nbel.includes('polon') ||
          nbel.includes('polska') ||
          nbel.includes('kop') ||
          nb.includes('polonia') ||
          nb.includes('westerplatte') ||
          nb.includes('bzura') ||
          nb.includes('varsavia'));
      const isScandinavianBattle =
        (isScandinavianQuery || isDanishQuery || isSwedishQuery || isNorwegianQuery || isFinnishQuery) &&
        (nbel.includes('norve') ||
          nbel.includes('danimarc') ||
          nbel.includes('finland') ||
          nbel.includes('svezia') ||
          nb.includes('weserubung') ||
          nb.includes('narvik') ||
          nb.includes('drobak') ||
          nb.includes('hegra') ||
          nb.includes('inverno') ||
          nb.includes('suomussalmi') ||
          nb.includes('raate') ||
          nb.includes('kollaa') ||
          nb.includes('taipale') ||
          nb.includes('viipuri') ||
          nb.includes('mannerheim'));
      return (
        nb.includes(q) ||
        ns.includes(q) ||
        nr.includes(q) ||
        nbel.includes(q) ||
        nca.includes(q) ||
        ncb.includes(q) ||
        isGermanBattle ||
        isFrenchBattle ||
        isBalkanBattle ||
        isPolishBattle ||
        isScandinavianBattle
      );
    });

    // 3. Search in fortifications
    const forts = HISTORICAL_FORTIFICATION_LINES.filter((fline) => {
      const nf = normStr(fline.name);
      const nd = normStr(fline.description);
      const nn = normStr(fline.nation);
      const nbu = normStr(fline.builder);
      const nk = fline.keyForts.some((k) => normStr(k.name).includes(q) || normStr(k.desc).includes(q));
      const isGermanFort =
        isGermanQuery &&
        (nn.includes('germania') ||
          nbu.includes('reich') ||
          nbu.includes('wehrmacht') ||
          nf.includes('sigfrido') ||
          nf.includes('ostwall') ||
          nf.includes('heilsberg'));
      const isFrenchFort =
        isFrenchQuery &&
        (nn.includes('francia') ||
          nn.includes('france') ||
          nbu.includes('frances') ||
          nbu.includes('republique') ||
          nf.includes('maginot'));
      const isBalkanFort =
        (isBalkanQuery || isYugoslavQuery || isHungarianQuery || isRomanianQuery || isBulgarianQuery || isGreekQuery || isAlbanianQuery) &&
        (nn.includes('jugoslav') ||
          nn.includes('grecia') ||
          nn.includes('romania') ||
          nn.includes('bulgaria') ||
          nf.includes('rupnik') ||
          nf.includes('metaxas') ||
          nf.includes('carol'));
      const isPolishFort =
        isPolishQuery &&
        (nn.includes('polonia') ||
          nbu.includes('polon') ||
          nbu.includes('kop') ||
          nf.includes('sarny') ||
          nf.includes('brzesc') ||
          nf.includes('kresy'));
      const isScandinavianFort =
        (isScandinavianQuery || isDanishQuery || isSwedishQuery || isNorwegianQuery || isFinnishQuery) &&
        (nn.includes('norvegia') ||
          nn.includes('svezia') ||
          nn.includes('finlandia') ||
          nn.includes('danimarca') ||
          nf.includes('mannerheim') ||
          nf.includes('salpa') ||
          nf.includes('oscarsborg') ||
          nf.includes('hegra') ||
          nf.includes('boden') ||
          nf.includes('skane'));
      return nf.includes(q) || nd.includes(q) || nn.includes(q) || nbu.includes(q) || nk || isGermanFort || isFrenchFort || isBalkanFort || isPolishFort || isScandinavianFort;
    });

    // 4. Search in naval bases
    const naval = HISTORICAL_NAVAL_BASES.filter((base) => {
      const nn = normStr(base.name);
      const nh = normStr(base.historicalName);
      const nd = normStr(base.description);
      const nnat = normStr(base.nation);
      const isGermanBase =
        isGermanQuery &&
        (nnat.includes('germania') ||
          nd.includes('kriegsmarine') ||
          nh.includes('kriegsmarine') ||
          nn.includes('kiel') ||
          nn.includes('helgoland') ||
          nn.includes('wilhelmshaven') ||
          nn.includes('gotenhafen') ||
          nn.includes('swinemunde'));
      const isFrenchBase =
        isFrenchQuery &&
        (nnat.includes('francia') ||
          nnat.includes('france') ||
          nd.includes('marine nationale') ||
          nn.includes('brest') ||
          nn.includes('toulon') ||
          nn.includes('cherbourg') ||
          nn.includes('lorient') ||
          nn.includes('mers-el-kebir') ||
          nn.includes('bizerte') ||
          nn.includes('dakar') ||
          nn.includes('diego-suarez') ||
          nn.includes('saigon') ||
          nn.includes('gibuti'));
      const isBalkanBase =
        (isBalkanQuery || isYugoslavQuery || isHungarianQuery || isRomanianQuery || isBulgarianQuery || isGreekQuery || isAlbanianQuery) &&
        (nnat.includes('jugoslav') ||
          nnat.includes('grecia') ||
          nnat.includes('romania') ||
          nnat.includes('bulgaria') ||
          nnat.includes('albania') ||
          nn.includes('kotor') ||
          nn.includes('cattaro') ||
          nn.includes('salamis') ||
          nn.includes('salamina') ||
          nn.includes('constan') ||
          nn.includes('costanza') ||
          nn.includes('sazan') ||
          nn.includes('saseno') ||
          nn.includes('sibenik') ||
          nn.includes('sebenico') ||
          nn.includes('varna'));
      const isPolishBase =
        isPolishQuery &&
        (nnat.includes('polonia') ||
          nd.includes('polska') ||
          nd.includes('pinsk') ||
          nn.includes('pinsk') ||
          nn.includes('gdynia'));
      const isScandinavianBase =
        (isScandinavianQuery || isDanishQuery || isSwedishQuery || isNorwegianQuery || isFinnishQuery) &&
        (nnat.includes('svezia') ||
          nnat.includes('norvegia') ||
          nnat.includes('danimarca') ||
          nnat.includes('finlandia') ||
          nn.includes('karlskrona') ||
          nn.includes('copenhagen') ||
          nn.includes('holmen') ||
          nn.includes('horten') ||
          nn.includes('narvik') ||
          nn.includes('bergen') ||
          nn.includes('helsinki') ||
          nn.includes('turku'));
      return nn.includes(q) || nh.includes(q) || nd.includes(q) || nnat.includes(q) || isGermanBase || isFrenchBase || isBalkanBase || isPolishBase || isScandinavianBase;
    });

    return { features, battles, forts, naval };
  }, [query, allFeatures, currentStep]);

  if (!isOpen) return null;

  const totalResults =
    searchResults.features.length +
    searchResults.battles.length +
    searchResults.forts.length +
    searchResults.naval.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="tactical-panel w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Search Input */}
        <div className="flex items-center gap-3 p-3 border-b border-[#3a3420] bg-[#14171a]">
          <Search className="h-5 w-5 text-[#e8c979]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca toponimi, battaglie, linee fortificate o basi navali (es. Danzica, Maginot, Taranto, Khalkhin Gol)..."
            className="flex-1 bg-transparent text-sm text-[#f0e6c8] placeholder-[#8b9298] focus:outline-none font-['Rajdhani'] font-medium"
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
              if (e.key === 'Enter' && searchResults.features.length > 0) {
                onSelectFeature(searchResults.features[0].featureRef);
                onClose();
              }
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#8b9298] hover:text-white text-xs px-1"
            >
              Cancella
            </button>
          )}
          <button
            onClick={onClose}
            className="h-6 w-6 flex items-center justify-center border border-[#8a7440] text-[#e8c979] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-2 custom-scrollbar">
          {/* Battles Results */}
          {searchResults.battles.length > 0 && (
            <div>
              <div className="text-[10px] font-oswald tracking-widest text-[#d9534f] uppercase px-2 py-1 flex items-center gap-1.5">
                <Crosshair className="h-3.5 w-3.5" /> Battaglie ed Operazioni Storiche
              </div>
              <div className="divide-y divide-white/5 bg-black/20 border border-[#3a3420]/40">
                {searchResults.battles.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => {
                      tacticalAudio.playClick();
                      if (onSelectBattle) onSelectBattle(b);
                      onClose();
                    }}
                    className="p-2 hover:bg-[#d9534f]/15 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-oswald text-sm font-semibold text-[#f0e6c8]">
                        ⚔️ {b.name} <span className="text-[11px] text-[#e8c979] font-mono-tech">({b.historicalDate})</span>
                      </div>
                      <div className="text-[11px] text-[#8b9298] line-clamp-1">{b.belligerents} · {b.result}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#8a7440]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fortifications Results */}
          {searchResults.forts.length > 0 && (
            <div>
              <div className="text-[10px] font-oswald tracking-widest text-[#5f87c0] uppercase px-2 py-1 flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" /> Linee Fortificate
              </div>
              <div className="divide-y divide-white/5 bg-black/20 border border-[#3a3420]/40">
                {searchResults.forts.map((fline) => (
                  <div
                    key={fline.id}
                    onClick={() => {
                      tacticalAudio.playClick();
                      if (onSelectFortification) onSelectFortification(fline);
                      onClose();
                    }}
                    className="p-2 hover:bg-[#5f87c0]/15 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-oswald text-sm font-semibold text-[#f0e6c8]">
                        🛡️ {fline.name} <span className="text-[11px] text-[#5f87c0]">({fline.nation})</span>
                      </div>
                      <div className="text-[11px] text-[#8b9298] line-clamp-1">{fline.description}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#8a7440]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Naval Bases Results */}
          {searchResults.naval.length > 0 && (
            <div>
              <div className="text-[10px] font-oswald tracking-widest text-[#5aa0c2] uppercase px-2 py-1 flex items-center gap-1.5">
                <Anchor className="h-3.5 w-3.5" /> Basi Navali & Fortezze
              </div>
              <div className="divide-y divide-white/5 bg-black/20 border border-[#3a3420]/40">
                {searchResults.naval.map((base) => (
                  <div
                    key={base.id}
                    onClick={() => {
                      tacticalAudio.playClick();
                      if (onSelectNavalBase) onSelectNavalBase(base);
                      onClose();
                    }}
                    className="p-2 hover:bg-[#5aa0c2]/15 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-oswald text-sm font-semibold text-[#f0e6c8]">
                        ⚓ {base.name} <span className="text-[11px] text-[#5aa0c2]">({base.nation})</span>
                      </div>
                      <div className="text-[11px] text-[#8b9298] line-clamp-1">{base.historicalName}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#8a7440]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features / Toponyms Results */}
          {searchResults.features.length > 0 && (
            <div>
              <div className="text-[10px] font-oswald tracking-widest text-[#e8c979] uppercase px-2 py-1 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Territori e Toponimi Storici
              </div>
              <div className="divide-y divide-white/5 bg-black/20 border border-[#3a3420]/40">
                {searchResults.features.map((item) => {
                  const meta = getOwnerMeta(item.ownerKey);
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        tacticalAudio.playClick();
                        onSelectFeature(item.featureRef);
                        onClose();
                      }}
                      className="flex items-center justify-between p-2 hover:bg-[#c9a557]/10 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-3.5 flex-none rounded-[1px] overflow-hidden border border-[#554d33] shadow-[0_1px_3px_rgba(0,0,0,0.5)] bg-black/40">
                          <CountryFlag owner={item.ownerKey} step={currentStep} className="w-full h-full" />
                        </div>
                        <div>
                          <div className="font-oswald text-sm font-semibold text-[#f0e6c8] group-hover:text-[#e8c979] flex items-center gap-2">
                            {item.historicalName}
                          </div>
                          <div className="text-[11px] text-[#8b9298]">
                            Oggi: {item.modernName || '—'} · {item.ownerLabel}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#8a7440] group-hover:text-[#e8c979] transition-transform group-hover:translate-x-1" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {totalResults === 0 && query.trim().length >= 2 && (
            <div className="p-6 text-center text-xs text-[#8b9298]">
              Nessun territorio, battaglia o fortificazione trovata per "{query}".
            </div>
          )}

          {query.trim().length < 2 && (
            <div className="p-6 text-center text-xs text-[#8b9298] space-y-2">
              <div className="text-[#e8c979] font-oswald text-sm tracking-wider uppercase">
                Ricerche rapide consigliate:
              </div>
              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                {[
                  'Maginot',
                  'Sigfrido',
                  'Mannerheim',
                  'Danzica',
                  'Breslau',
                  'Königsberg',
                  'Rodi',
                  'Fiume',
                  'Zara',
                  'Westerplatte',
                  'Khalkhin Gol',
                  'Shanghai',
                  'Sedan',
                  'Dunkerque',
                  'Scapa Flow',
                  'Gibilterra',
                  'Malta',
                  'Alessandria',
                  'Taranto',
                  'Singapore',
                  'Pearl Harbor',
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      tacticalAudio.playClick();
                      setQuery(tag);
                    }}
                    className="px-2 py-0.5 border border-[#3a3420] bg-black/40 text-[#cfd3d6] hover:border-[#c9a557] hover:text-[#e8c979] text-[11px] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
