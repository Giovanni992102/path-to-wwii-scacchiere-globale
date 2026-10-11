import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, MapPin, Globe, ArrowRight, Shield, Crosshair, Anchor } from 'lucide-react';
import { SearchResultItem } from '../types';
import { getOwnerMeta } from '../data/owners';
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

    // 1. Search in geodetic features
    for (const f of allFeatures) {
      const p = f.properties || {};
      const res = f.__res ? f.__res[currentStep] : null;
      if (!res) continue;

      const modern = p.NUTS_NAME || p.NAME_ENGL || p.CNTR_NAME || f.__itname || '';
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

      const isFrenchOwner =
        res.o === 'FRA' ||
        res.o === 'VIC' ||
        res.o === 'FFL_AEF' ||
        res.o.startsWith('F_') ||
        res.o.startsWith('VIC_');

      const matchesOwnerAlias =
        (res.o === 'GER' && isGermanQuery) ||
        (res.o === 'ITA' && isItalianQuery) ||
        (res.o === 'SOV' && isSovietQuery) ||
        (isFrenchOwner && isFrenchQuery);

      if (
        normModern.includes(q) ||
        normHist.includes(q) ||
        normNid.includes(q) ||
        normNote.includes(q) ||
        normAdmin.includes(q) ||
        normOwner.includes(q) ||
        normShort.includes(q) ||
        normLeader.includes(q) ||
        matchesOwnerAlias
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
      return (
        nb.includes(q) ||
        ns.includes(q) ||
        nr.includes(q) ||
        nbel.includes(q) ||
        nca.includes(q) ||
        ncb.includes(q) ||
        isGermanBattle ||
        isFrenchBattle
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
      return nf.includes(q) || nd.includes(q) || nn.includes(q) || nbu.includes(q) || nk || isGermanFort || isFrenchFort;
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
      return nn.includes(q) || nh.includes(q) || nd.includes(q) || nnat.includes(q) || isGermanBase || isFrenchBase;
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
