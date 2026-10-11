import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BarChart2 } from 'lucide-react';
import { StatsStep, FactionType } from '../types';
import { getOwnerMeta, FACTION_COLORS } from '../data/owners';
import { CountryFlag } from '../data/historicalFlags';
import { tacticalAudio } from '../data/audioSynthesizer';

interface IntelligencePanelProps {
  stats: StatsStep[];
  currentStep: number;
}

export const IntelligencePanel: React.FC<IntelligencePanelProps> = ({
  stats,
  currentStep,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const stepStats = stats[currentStep];
  if (!stepStats) return null;

  const factions: FactionType[] = ['Asse', 'Alleati', 'Comintern', 'Neutrale', 'Fantoccio'];

  const rows: { o: string; count: number; label: string }[] = [];
  for (const o in stepStats.own) {
    if (o === 'NEU') continue;
    rows.push({
      o,
      count: stepStats.own[o],
      label: getOwnerMeta(o).l(currentStep),
    });
  }
  rows.sort((a, b) => b.count - a.count);

  if (stepStats.own['NEU']) {
    rows.push({
      o: 'NEU',
      count: stepStats.own['NEU'],
      label: 'Nazioni Indipendenti / Neutrali',
    });
  }

  const maxCount = rows.length > 0 ? rows[0].count : 1;

  return (
    <aside
      style={{ position: 'absolute' }}
      className={`hidden lg:flex tactical-panel absolute top-3.5 right-3.5 w-[265px] sm:w-[280px] z-30 flex-col shadow-2xl transition-all duration-200 pointer-events-auto ${
        isCollapsed
          ? 'max-h-[42px] overflow-hidden'
          : 'max-h-[min(540px,calc(100vh-530px))] min-h-[190px]'
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
          {/* Factions chips */}
          <div className="flex gap-1.5 p-2 flex-wrap bg-black/20 border-b border-[#3a3420]/40 flex-none">
            {factions.map((f) => {
              const count = stepStats.fac[f] || 0;
              return (
                <div
                  key={f}
                  className="flex-1 min-w-[75px] flex items-center gap-1.5 text-[11px] tracking-[0.5px] px-1.5 py-1 bg-black/40 border border-[#2c2a20]"
                >
                  <span
                    className="w-2 h-2 border border-black flex-none"
                    style={{ background: FACTION_COLORS[f] }}
                  />
                  <span className="truncate text-[#cfd3d6]">{f}</span>
                  <b className="font-oswald text-[12px] text-[#e8c979] ml-auto">
                    {count}
                  </b>
                </div>
              );
            })}
          </div>

          {/* Territory distribution ranking list */}
          <div className="overflow-y-auto p-2 space-y-1 custom-scrollbar flex-1">
            {rows.slice(0, 18).map((r) => {
              const meta = getOwnerMeta(r.o);
              const pct = Math.min(100, Math.round((r.count / maxCount) * 100));

              return (
                <div
                  key={r.o}
                  className="relative flex items-center gap-2 px-1.5 py-1 text-[12px] border-b border-white/5 overflow-hidden group hover:bg-white/5 transition-colors"
                >
                  {/* Background proportional bar */}
                  <div
                    className="absolute left-0 bottom-0 top-0 bg-[#c9a557]/10 pointer-events-none transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />

                  <div className="w-5 h-3.5 flex-none rounded-[1px] overflow-hidden border border-[#554d33] shadow-[0_1px_3px_rgba(0,0,0,0.5)] z-10 bg-black/40">
                    <CountryFlag owner={r.o} step={currentStep} className="w-full h-full" />
                  </div>
                  <span className="flex-1 truncate tracking-[0.2px] text-[#cfd3d6] z-10">
                    {r.label}
                  </span>
                  <span className="font-oswald font-semibold text-[#e8c979] text-[12px] z-10">
                    {r.count}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </aside>
  );
};
