import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BarChart2, Globe, Crown, Users, Landmark } from 'lucide-react';
import { StatsStep, FactionType } from '../types';
import { getOwnerMeta, FACTION_COLORS, getOverlord, getRootSovereign } from '../data/owners';
import { CountryFlag } from '../data/historicalFlags';
import { tacticalAudio } from '../data/audioSynthesizer';

interface IntelligencePanelProps {
  stats: StatsStep[];
  currentStep: number;
}

export type IntelligenceMetric = 'area' | 'pop' | 'cities';

function formatArea(km2: number): string {
  if (km2 >= 1_000_000) {
    return `${(km2 / 1_000_000).toFixed(1)}M km²`;
  }
  if (km2 >= 10_000) {
    return `${Math.round(km2 / 1_000)}k km²`;
  }
  if (km2 >= 1_000) {
    return `${(km2 / 1_000).toFixed(1)}k km²`;
  }
  return `${Math.round(km2)} km²`;
}

function formatPop(millions: number): string {
  if (millions >= 10.0) {
    return `${Math.round(millions)}M ab.`;
  }
  if (millions >= 1.0) {
    return `${millions.toFixed(1)}M ab.`;
  }
  if (millions >= 0.01) {
    return `${Math.round(millions * 1000)}k ab.`;
  }
  return `< 10k ab.`;
}

export const IntelligencePanel: React.FC<IntelligencePanelProps> = ({
  stats,
  currentStep,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'territories' | 'empires'>('empires');
  const [metric, setMetric] = useState<IntelligenceMetric>('area');

  const stepStats = stats[currentStep];
  if (!stepStats) return null;

  const factions: FactionType[] = ['Asse', 'Alleati', 'Comintern', 'Neutrale', 'Fantoccio'];

  // Calcolo totali mondiali per normalizzazione e percentuali con type casting esplicito
  const totalArea: number = stepStats.ownArea
    ? (Object.values(stepStats.ownArea) as number[]).reduce((acc: number, v: number) => acc + (Number(v) || 0), 0)
    : 148_940_000;

  const totalPop: number = stepStats.ownPop
    ? (Object.values(stepStats.ownPop) as number[]).reduce((acc: number, v: number) => acc + (Number(v) || 0), 0)
    : 1_800;

  const totalCities: number = stepStats.ownCities
    ? (Object.values(stepStats.ownCities) as number[]).reduce((acc: number, v: number) => acc + (Number(v) || 0), 0)
    : 149;

  const activeTotal: number = metric === 'area' ? totalArea : metric === 'pop' ? totalPop : totalCities;

  // 1. Dettaglio territoriale individuale
  const territoryRows: {
    o: string;
    value: number;
    area: number;
    pop: number;
    cities: number;
    label: string;
    overlordCode?: string | null;
  }[] = [];

  const rawKeys = stepStats.ownArea ? Object.keys(stepStats.ownArea) : Object.keys(stepStats.own || {});
  for (const o of rawKeys) {
    if (o === 'NEU') continue;
    const overlord = getOverlord(o, currentStep);
    const area = Number(stepStats.ownArea?.[o]) || 0;
    const pop = Number(stepStats.ownPop?.[o]) || 0;
    const cities = Number(stepStats.ownCities?.[o]) || 0;

    const val = metric === 'area' ? area : metric === 'pop' ? pop : cities;

    // Includi se ha un valore significativo per la metrica attiva
    if (val > 0 || (metric === 'cities' && area > 50_000)) {
      territoryRows.push({
        o,
        value: val,
        area,
        pop,
        cities,
        label: getOwnerMeta(o).l(currentStep),
        overlordCode: overlord ? (overlord.id || null) : null,
      });
    }
  }
  territoryRows.sort((a, b) => b.value - a.value);

  // 2. Aggregazione per blocchi imperiali / potenze sovrane
  const empireMap = new Map<string, {
    area: number;
    pop: number;
    cities: number;
    label: string;
    subjectsCount: number;
  }>();

  for (const o of rawKeys) {
    if (o === 'NEU') continue;
    const root = getRootSovereign(o, currentStep);
    const rootId = root.id || o;
    if (!empireMap.has(rootId)) {
      empireMap.set(rootId, {
        area: 0,
        pop: 0,
        cities: 0,
        label: root.l(currentStep),
        subjectsCount: 0,
      });
    }
    const entry = empireMap.get(rootId)!;
    entry.area += Number(stepStats.ownArea?.[o]) || 0;
    entry.pop += Number(stepStats.ownPop?.[o]) || 0;
    entry.cities += Number(stepStats.ownCities?.[o]) || 0;
    if (o !== rootId) {
      entry.subjectsCount++;
    }
  }

  const empireRows: {
    o: string;
    value: number;
    area: number;
    pop: number;
    cities: number;
    label: string;
    subjectsCount?: number;
  }[] = [];

  for (const [code, data] of empireMap.entries()) {
    const val = metric === 'area' ? data.area : metric === 'pop' ? data.pop : data.cities;
    if (val > 0 || data.area > 50_000) {
      empireRows.push({
        o: code,
        value: val,
        area: data.area,
        pop: data.pop,
        cities: data.cities,
        label: data.label,
        subjectsCount: data.subjectsCount,
      });
    }
  }
  empireRows.sort((a, b) => b.value - a.value);

  const rows = viewMode === 'territories' ? territoryRows : empireRows;
  const maxVal: number = rows.length > 0 ? Math.max(...rows.map((r) => r.value)) : 1;

  return (
    <aside
      style={{ position: 'absolute' }}
      className={`hidden lg:flex tactical-panel absolute top-3.5 right-3.5 w-[285px] sm:w-[310px] z-30 flex-col shadow-2xl transition-all duration-200 pointer-events-auto ${
        isCollapsed
          ? 'max-h-[42px] overflow-hidden'
          : 'max-h-[min(560px,calc(100vh-530px))] min-h-[220px]'
      }`}
    >
      {/* Header bar with title, badge and collapse toggle */}
      <div
        onClick={() => {
          tacticalAudio.playClick();
          setIsCollapsed(!isCollapsed);
        }}
        className="panel-title justify-between cursor-pointer select-none group hover:bg-white/5 transition-colors"
        title={isCollapsed ? 'Espandi Rapporto Intelligence (Clicca)' : 'Comprimi Rapporto Intelligence (Clicca)'}
      >
        <div className="flex items-center gap-2">
          <BarChart2 className="h-3.5 w-3.5 text-[#e8c979]" />
          <span>Rapporto Intelligence</span>
          <span className="font-mono-tech text-[9px] text-[#c9a557] px-1 py-0.5 bg-black/50 border border-[#3a3420] rounded">
            {rows.length}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            tacticalAudio.playClick();
            setIsCollapsed(!isCollapsed);
          }}
          className="p-0.5 text-[#c9a557] group-hover:text-white transition-colors"
          title={isCollapsed ? 'Espandi ranking' : 'Riduci ranking'}
        >
          {isCollapsed ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
        </button>
      </div>

      {!isCollapsed && (
        <>
          {/* Selettore della Metrica Intelligence: Superficie, Popolazione o Centri Strategici */}
          <div className="flex bg-black/60 border-b border-[#3a3420]/60 p-1 gap-1 text-[9.5px] flex-none">
            <button
              onClick={() => {
                tacticalAudio.playClick();
                setMetric('area');
              }}
              className={`flex-1 py-1 px-1 flex items-center justify-center gap-1 font-mono-tech tracking-[0.3px] transition-colors rounded-[2px] ${
                metric === 'area'
                  ? 'bg-[#c9a557]/25 text-[#e8c979] border border-[#8a7440] font-bold shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]'
                  : 'text-[#8b9298] hover:text-[#cfd3d6] border border-transparent'
              }`}
              title="Classifica per Superficie Territoriale Reale (km² calcolati geodeticamente e % del globo)"
            >
              <Globe className="h-3 w-3 text-[#e8c979]" />
              <span>SUPERFICIE</span>
            </button>
            <button
              onClick={() => {
                tacticalAudio.playClick();
                setMetric('pop');
              }}
              className={`flex-1 py-1 px-1 flex items-center justify-center gap-1 font-mono-tech tracking-[0.3px] transition-colors rounded-[2px] ${
                metric === 'pop'
                  ? 'bg-[#c9a557]/25 text-[#e8c979] border border-[#8a7440] font-bold shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]'
                  : 'text-[#8b9298] hover:text-[#cfd3d6] border border-transparent'
              }`}
              title="Classifica per Popolazione Sotto Controllo (Milioni di abitanti censiti)"
            >
              <Users className="h-3 w-3 text-[#e8c979]" />
              <span>POPOLAZIONE</span>
            </button>
            <button
              onClick={() => {
                tacticalAudio.playClick();
                setMetric('cities');
              }}
              className={`flex-1 py-1 px-1 flex items-center justify-center gap-1 font-mono-tech tracking-[0.3px] transition-colors rounded-[2px] ${
                metric === 'cities'
                  ? 'bg-[#c9a557]/25 text-[#e8c979] border border-[#8a7440] font-bold shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]'
                  : 'text-[#8b9298] hover:text-[#cfd3d6] border border-transparent'
              }`}
              title="Classifica per Centri Strategici e Capitali Controllate"
            >
              <Landmark className="h-3 w-3 text-[#e8c979]" />
              <span>BASI & CITTÀ</span>
            </button>
          </div>

          {/* Factions chips dinamiche sulla metrica selezionata */}
          <div className="flex gap-1.5 p-2 flex-wrap bg-black/30 border-b border-[#3a3420]/40 flex-none">
            {factions.map((f) => {
              const facVal: number =
                metric === 'area'
                  ? Number(stepStats.facArea?.[f]) || 0
                  : metric === 'pop'
                  ? Number(stepStats.facPop?.[f]) || 0
                  : Number(stepStats.facCities?.[f]) || 0;

              const pct = activeTotal > 0 ? ((facVal / activeTotal) * 100).toFixed(1) : '0';

              const displayVal =
                metric === 'area'
                  ? `${pct}%`
                  : metric === 'pop'
                  ? `${Math.round(facVal)}M`
                  : `${facVal}`;

              const tooltipDesc =
                metric === 'area'
                  ? `${f}: ${formatArea(facVal)} (${pct}% delle terre emerse)`
                  : metric === 'pop'
                  ? `${f}: ${formatPop(facVal)} (${pct}% della popolazione mondiale)`
                  : `${f}: ${facVal} capitali e basi d'altura presidiate`;

              return (
                <div
                  key={f}
                  title={tooltipDesc}
                  className="flex-1 min-w-[85px] flex items-center gap-1.5 text-[11px] tracking-[0.5px] px-1.5 py-1 bg-black/40 border border-[#2c2a20]"
                >
                  <span
                    className="w-2 h-2 border border-black flex-none"
                    style={{ background: FACTION_COLORS[f] }}
                  />
                  <span className="truncate text-[#cfd3d6]">{f}</span>
                  <b className="font-oswald text-[12px] text-[#e8c979] ml-auto">
                    {displayVal}
                  </b>
                </div>
              );
            })}
          </div>

          {/* View mode toggle: Territori vs Imperi e Blocchi */}
          <div className="flex bg-black/40 border-b border-[#3a3420]/40 p-1 gap-1 text-[10px] flex-none">
            <button
              onClick={() => {
                tacticalAudio.playClick();
                setViewMode('empires');
              }}
              className={`flex-1 py-0.5 px-1 flex items-center justify-center gap-1 font-mono-tech tracking-[0.3px] transition-colors rounded-[1px] ${
                viewMode === 'empires'
                  ? 'bg-[#c9a557]/20 text-[#e8c979] border border-[#8a7440]'
                  : 'text-[#8b9298] hover:text-[#cfd3d6] border border-transparent'
              }`}
              title="Aggrega colonie, domini e fantocci sotto la rispettiva potenza sovrana (visione imperiale)"
            >
              <Crown className="h-2.5 w-2.5" />
              <span>IMPERI E BLOCCHI</span>
            </button>
            <button
              onClick={() => {
                tacticalAudio.playClick();
                setViewMode('territories');
              }}
              className={`flex-1 py-0.5 px-1 flex items-center justify-center gap-1 font-mono-tech tracking-[0.3px] transition-colors rounded-[1px] ${
                viewMode === 'territories'
                  ? 'bg-[#c9a557]/20 text-[#e8c979] border border-[#8a7440]'
                  : 'text-[#8b9298] hover:text-[#cfd3d6] border border-transparent'
              }`}
              title="Visualizza ranking dettagliato per singola entità o territorio coloniale"
            >
              <Globe className="h-2.5 w-2.5" />
              <span>TERRITORI SINGOLI</span>
            </button>
          </div>

          {/* Distribution ranking list */}
          <div className="overflow-y-auto p-2 space-y-1 custom-scrollbar flex-1">
            {rows.slice(0, 18).map((r) => {
              const pctOfMax = maxVal > 0 ? Math.min(100, Math.round((r.value / maxVal) * 100)) : 0;
              const pctOfWorld = activeTotal > 0 ? ((r.value / activeTotal) * 100).toFixed(1) : '0';

              const formattedVal =
                metric === 'area'
                  ? formatArea(r.area)
                  : metric === 'pop'
                  ? formatPop(r.pop)
                  : `${r.cities} ${r.cities === 1 ? 'Centro' : 'Centri'}`;

              const tooltipDetails = `• Superficie: ${formatArea(r.area)} (${((r.area / totalArea) * 100).toFixed(1)}% del globo)\n• Popolazione: ${formatPop(r.pop)}\n• Centri Strategici: ${r.cities} basi/capitali`;

              return (
                <div
                  key={r.o}
                  title={`${r.label}\n${tooltipDetails}`}
                  className="relative flex items-center gap-2 px-1.5 py-1 text-[12px] border-b border-white/5 overflow-hidden group hover:bg-white/5 transition-colors"
                >
                  {/* Background proportional bar */}
                  <div
                    className="absolute left-0 bottom-0 top-0 bg-[#c9a557]/10 pointer-events-none transition-all duration-500"
                    style={{ width: `${pctOfMax}%` }}
                  />

                  <div className="w-5 h-3.5 flex-none rounded-[1px] overflow-hidden border border-[#554d33] shadow-[0_1px_3px_rgba(0,0,0,0.5)] z-10 bg-black/40">
                    <CountryFlag owner={r.o} step={currentStep} className="w-full h-full" />
                  </div>
                  <span className="flex-1 truncate tracking-[0.2px] text-[#cfd3d6] z-10">
                    {r.label}
                  </span>

                  {viewMode === 'territories' && (r as any).overlordCode && (
                    <span
                      className="text-[9px] font-mono-tech px-1 py-0.2 bg-[#222a30] text-[#c9a557] border border-[#3a3420] rounded-[1px] z-10 flex-none"
                      title={`Sotto sovranità di: ${(r as any).overlordCode}`}
                    >
                      {(r as any).overlordCode}
                    </span>
                  )}
                  {viewMode === 'empires' && (r as any).subjectsCount > 0 && (
                    <span
                      className="text-[9px] font-mono-tech px-1 py-0.2 bg-[#2a2414] text-[#e8c979] border border-[#8a7440]/60 rounded-[1px] z-10 flex-none"
                      title={`${(r as any).subjectsCount} entità subordinate/colonie aggregate`}
                    >
                      +{(r as any).subjectsCount}
                    </span>
                  )}

                  {/* Valore e Badge % Globale */}
                  <div className="flex items-center gap-1.5 z-10 ml-auto flex-none text-right">
                    <span className="font-oswald font-semibold text-[#e8c979] text-[12px]">
                      {formattedVal}
                    </span>
                    {metric !== 'cities' && (
                      <span className="font-mono-tech text-[9.5px] text-[#8b9298] w-[34px] text-right">
                        {pctOfWorld}%
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </aside>
  );
};
