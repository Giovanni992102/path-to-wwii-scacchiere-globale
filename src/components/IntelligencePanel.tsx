import React from 'react';
import { StatsStep, FactionType } from '../types';
import { getOwnerMeta, FACTION_COLORS } from '../data/owners';
import { CountryFlag } from '../data/historicalFlags';

interface IntelligencePanelProps {
  stats: StatsStep[];
  currentStep: number;
}

export const IntelligencePanel: React.FC<IntelligencePanelProps> = ({
  stats,
  currentStep,
}) => {
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
    <aside className="hidden lg:flex tactical-panel absolute top-3.5 right-3.5 w-[260px] z-30 max-h-[calc(100vh-250px)] flex-col shadow-xl animate-in fade-in slide-in-from-right duration-200">
      <div className="panel-title">Rapporto Intelligence</div>

      {/* Factions chips */}
      <div className="flex gap-1.5 p-2 flex-wrap bg-black/20 border-b border-[#3a3420]/40">
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
      <div className="overflow-y-auto p-2 space-y-1 custom-scrollbar">
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
    </aside>
  );
};
