import React from 'react';
import { X, Crosshair, MapPin, Globe, Clock, Shield, Award, User, Landmark, Crown } from 'lucide-react';
import { STEPS } from '../data/historySteps';
import { getOwnerMeta, FACTION_COLORS, formatHierarchyBadge } from '../data/owners';
import { HISTORICAL_BATTLES } from '../data/historicalBattles';
import { tacticalAudio } from '../data/audioSynthesizer';
import { CountryFlag } from '../data/historicalFlags';
import * as d3 from 'd3';

interface OperationalFocusPanelProps {
  feature: any;
  currentStep: number;
  onClose: () => void;
  onZoomTo: () => void;
  onSelectStep: (step: number) => void;
}

export const OperationalFocusPanel: React.FC<OperationalFocusPanelProps> = ({
  feature,
  currentStep,
  onClose,
  onZoomTo,
  onSelectStep,
}) => {
  if (!feature) return null;

  const res = feature.__res ? feature.__res[currentStep] : null;
  if (!res) return null;

  const meta = getOwnerMeta(res.o);
  const fac = res.fac || meta.f;
  const p = feature.properties || {};
  const isHB = feature.__layer === 'hb';
  const modernName = p.NUTS_NAME || p.NAME_ENGL || p.CNTR_NAME || feature.__itname || '';
  const nutsId = p.NUTS_ID || p.CNTR_ID || '';

  // Approximate area in km²
  let km2 = 0;
  try {
    km2 = Math.round(d3.geoArea(feature) * 6371 * 6371);
  } catch (e) {
    km2 = 0;
  }

  const c = feature.__cent || [0, 0];
  const latStr = `${Math.abs(c[1]).toFixed(1)}°${c[1] >= 0 ? 'N' : 'S'}`;
  const lonStr = `${Math.abs(c[0]).toFixed(1)}°${c[0] >= 0 ? 'E' : 'W'}`;

  // Find battles near this feature's centroid for the current step
  const nearbyBattles = HISTORICAL_BATTLES.filter((b) => {
    if (b.step !== currentStep) return false;
    const dLon = Math.abs(b.coords[0] - c[0]);
    const dLat = Math.abs(b.coords[1] - c[1]);
    return dLon < 6.0 && dLat < 5.0;
  });

  return (
    <div
      id="focuspanel"
      style={{ position: 'absolute' }}
      className="tactical-panel absolute top-3.5 left-3.5 w-[340px] sm:w-[360px] max-w-[calc(100vw-28px)] z-40 max-h-[min(620px,calc(100vh-220px))] flex flex-col shadow-2xl animate-in fade-in slide-in-from-left duration-200 pointer-events-auto"
    >
      {/* Panel Header */}
      <div className="panel-title justify-between">
        <div className="flex items-center gap-2">
          <span>DOSSIER OPERATIVO</span>
          <span className="text-[10px] text-[#8b9298] font-mono-tech">
            [{nutsId || 'GEO'}]
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              tacticalAudio.playClick();
              onZoomTo();
            }}
            className="h-5 w-5 flex items-center justify-center border border-[#8a7440] text-[#e8c979] hover:text-white hover:border-[#c9a557] bg-transparent transition-colors"
            title="Centra visuale sul territorio"
          >
            <Crosshair className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => {
              tacticalAudio.playClick();
              onClose();
            }}
            className="h-5 w-5 flex items-center justify-center border border-[#8a7440] text-[#e8c979] hover:text-white hover:border-[#c9a557] bg-transparent text-sm leading-none transition-colors"
            title="Chiudi scheda (Esc)"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="overflow-y-auto p-3 text-xs leading-relaxed custom-scrollbar space-y-2.5">
        {/* Historical Toponym Name */}
        <div>
          <div className="font-oswald text-xl font-bold text-[#f0e6c8] tracking-[0.6px] leading-tight drop-shadow-[0_2px_4px_#000]">
            {res.name || modernName || 'Territorio'}
          </div>
          {res.adminEntity && (
            <div className="text-[11px] font-mono-tech text-[#c9a557] mt-0.5">
              {res.adminEntity}
            </div>
          )}
          <div className="text-[11px] text-[#8b9298] tracking-[0.3px] mt-0.5 pb-2 border-b border-[#3a3420] flex items-center justify-between">
            <span>{isHB ? 'Entità geopolitica storica' : `Denom. moderna: ${modernName}`}</span>
            {nutsId && <span className="font-mono-tech text-[10px] text-[#8b9298]">{nutsId}</span>}
          </div>
        </div>

        {/* Current Period Card */}
        <div className="border border-[#3a3420] bg-black/40 p-2.5 space-y-1.5">
          <div className="flex justify-between items-baseline">
            <span className="font-oswald font-bold text-sm text-[#e8c979] tracking-[1.5px]">
              {STEPS[currentStep].d}
            </span>
            <span className="text-[10px] text-[#8b9298] uppercase tracking-[0.8px] font-semibold">
              {STEPS[currentStep].t}
            </span>
          </div>

          <div className="flex items-center gap-3 p-2 bg-black/60 border border-[#3a3420] rounded-[2px] shadow-inner">
            <div className="w-13 h-8 rounded-[2px] overflow-hidden border border-[#c9a557]/60 shadow-[0_2px_6px_rgba(0,0,0,0.8)] flex-none relative bg-black/70 flex items-center justify-center">
              <CountryFlag owner={res.o} step={currentStep} className="w-full h-full" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-semibold text-[#f0e6c8] text-[13px] leading-tight truncate">
                {res.o === 'NEU' ? 'Indipendente / Neutrale' : meta.l(currentStep)}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono-tech text-[10px] px-1 py-0.2 bg-[#222a30] text-[#c9a557] border border-[#3d4852] rounded">
                  {res.o}
                </span>
                <span
                  className="font-oswald font-semibold text-[10.5px] tracking-[1px] uppercase"
                  style={{ color: FACTION_COLORS[fac] || '#ccc' }}
                >
                  {fac.toUpperCase()}
                </span>
              </div>
              {formatHierarchyBadge(res.o, currentStep) && (
                <div className="flex items-center gap-1.5 mt-1 text-[10px] text-[#e8c979] bg-[#c9a557]/15 border border-[#8a7440]/50 px-1.5 py-0.5 rounded-[1px] tracking-[0.2px]">
                  <Crown className="h-3 w-3 text-[#e8c979] flex-none" />
                  <span className="truncate font-medium">
                    {formatHierarchyBadge(res.o, currentStep)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Leader & Capital Metadata if available */}
          {(meta.leader || meta.capital) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1 text-[11px] border-t border-[#3a3420]/50 text-[#8b9298]">
              {meta.leader && (
                <div className="flex items-center gap-1 truncate">
                  <User className="h-3 w-3 text-[#c9a557] flex-none" />
                  <span className="truncate">{meta.leader}</span>
                </div>
              )}
              {meta.capital && (
                <div className="flex items-center gap-1 truncate">
                  <Landmark className="h-3 w-3 text-[#c9a557] flex-none" />
                  <span className="truncate">{meta.capital}</span>
                </div>
              )}
            </div>
          )}

          {(res.note || res.historicalContext) && (
            <div className="text-[11.5px] text-[#c8b98a] italic leading-snug pt-0.5 border-t border-[#3a3420]/40">
              {res.note || res.historicalContext}
            </div>
          )}
        </div>

        {/* Nearby Battle Hotspots in Current Step */}
        {nearbyBattles.length > 0 && (
          <div className="border border-[#b04540]/60 bg-[#b04540]/10 p-2 space-y-1">
            <div className="font-oswald text-[11.5px] font-bold text-[#f0e6c8] uppercase flex items-center gap-1.5">
              <Crosshair className="h-3.5 w-3.5 text-[#d9534f]" />
              <span>Operazioni Belliche nel Settore</span>
            </div>
            {nearbyBattles.map((b) => (
              <div key={b.id} className="text-[11px] text-[#cfd3d6] leading-snug">
                <b className="text-[#e8c979]">{b.name}</b> ({b.historicalDate}) — {b.result}
              </div>
            ))}
          </div>
        )}

        {/* Historical Evolution Timeline List */}
        <div>
          <div className="text-[10px] tracking-[2px] text-[#8b9298] uppercase font-semibold mb-1">
            Evoluzione del possesso · 1936–1940
          </div>

          <div className="border border-[#2c2a20] divide-y divide-white/5 bg-black/20">
            {STEPS.map((st, i) => {
              const stepRes = feature.__res ? feature.__res[i] : null;
              if (!stepRes) return null;
              const stepMeta = getOwnerMeta(stepRes.o);
              const isCur = i === currentStep;

              return (
                <div
                  key={i}
                  onClick={() => {
                    tacticalAudio.playClick();
                    onSelectStep(i);
                  }}
                  className={`flex items-center gap-2 px-2 py-1 text-[11.5px] cursor-pointer transition-colors hover:bg-white/5 ${
                    isCur ? 'bg-[#c9a557]/20 outline outline-1 outline-[#8a7440]' : ''
                  }`}
                >
                  <div className="w-5 h-3.5 rounded-[1px] overflow-hidden border border-[#554d33] flex-none shadow-sm bg-black/40">
                    <CountryFlag owner={stepRes.o} step={i} className="w-full h-full" />
                  </div>
                  <span
                    className={`w-[60px] flex-none font-oswald font-semibold text-[11px] tracking-[0.5px] ${
                      isCur ? 'text-[#e8c979]' : 'text-[#8b9298]'
                    }`}
                  >
                    {st.d}
                  </span>
                  <span className="flex-1 truncate tracking-[0.2px] text-[#cfd3d6]">
                    {stepRes.name || (stepRes.o === 'NEU' ? 'Indipendente' : stepMeta.l(i))}
                  </span>
                  {isCur && <span className="text-[#e8c979] text-xs font-bold">◄</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Geodetic Metadata Footer */}
        <div className="text-[10.5px] text-[#8b9298] tracking-[0.4px] flex items-center justify-between border-t border-[#3a3420]/60 pt-1.5 font-mono-tech">
          <span>SUP ≈ {km2 > 0 ? km2.toLocaleString('it-IT') : '—'} KM²</span>
          <span>
            {latStr} {lonStr}
          </span>
        </div>
      </div>
    </div>
  );
};
