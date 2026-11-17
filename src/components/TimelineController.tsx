import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause, BookOpen, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Swords } from 'lucide-react';
import { STEPS } from '../data/historySteps';
import { HISTORICAL_BATTLES } from '../data/historicalBattles';
import { tacticalAudio } from '../data/audioSynthesizer';

interface TimelineControllerProps {
  currentStep: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSelectStep: (step: number) => void;
}

interface ParsedStepMeta {
  month: string;
  year: string;
  isYearStart: boolean;
  battleCount: number;
}

export const TimelineController: React.FC<TimelineControllerProps> = ({
  currentStep,
  isPlaying,
  onTogglePlay,
  onSelectStep,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const step = STEPS[currentStep] || STEPS[0];
  const [activeTheater, setActiveTheater] = useState<'all' | 'europe' | 'asia' | 'africa' | 'americas'>('all');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const stepMetaList = useMemo<ParsedStepMeta[]>(() => {
    const counts = new Array<number>(STEPS.length).fill(0);
    for (const b of HISTORICAL_BATTLES) {
      if (b.step >= 0 && b.step < counts.length) counts[b.step] += 1;
    }

    let prevYear = '';
    return STEPS.map((st, idx) => {
      const parts = st.d.trim().split(/\s+/);
      const month = parts[0] || st.d;
      const year = parts[1] || '';
      const isYearStart = year !== '' && year !== prevYear;
      if (year) prevYear = year;
      return {
        month,
        year,
        isYearStart,
        battleCount: counts[idx],
      };
    });
  }, []);

  // Auto-center active step inside scrollable container on narrow viewports
  useEffect(() => {
    const container = scrollContainerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    if (container.scrollWidth <= container.clientWidth + 4) return;
    const ratio = STEPS.length > 1 ? currentStep / (STEPS.length - 1) : 0;
    const targetX = ratio * track.clientWidth - container.clientWidth / 2;
    container.scrollTo({ left: Math.max(0, targetX), behavior: 'smooth' });
  }, [currentStep]);

  const handleTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const pad = 16;
    const usableWidth = Math.max(1, rect.width - pad * 2);
    const t = Math.max(0, Math.min(1, (e.clientX - rect.left - pad) / usableWidth));
    const s = Math.round(t * (STEPS.length - 1));
    tacticalAudio.playClick();
    onSelectStep(s);
  };

  const getTheaterSummary = () => {
    if (!step.theaterEvents) return step.desc;
    if (activeTheater === 'europe') return step.theaterEvents.europe;
    if (activeTheater === 'asia') return step.theaterEvents.asia;
    if (activeTheater === 'africa') return step.theaterEvents.africa;
    if (activeTheater === 'americas') return step.theaterEvents.americas;
    return step.desc;
  };

  const progressPct = STEPS.length > 1 ? (currentStep / (STEPS.length - 1)) * 100 : 0;
  const activeBattles = stepMetaList[currentStep]?.battleCount || 0;
  const hoveredStepData = hoveredStep !== null ? STEPS[hoveredStep] : null;
  const hoveredBattles = hoveredStep !== null ? stepMetaList[hoveredStep]?.battleCount || 0 : 0;

  const renderTheaterChips = () => {
    if (!step.theaterEvents) return null;
    const options: Array<{ key: 'all' | 'europe' | 'asia' | 'africa' | 'americas'; label: string }> = [
      { key: 'all', label: 'GENERALE' },
      { key: 'europe', label: 'EUROPA' },
      { key: 'asia', label: 'ASIA' },
      { key: 'africa', label: 'AFRICA' },
    ];
    if (step.theaterEvents.americas) options.push({ key: 'americas', label: 'AMERICHE' });

    return (
      <div className="flex flex-wrap items-center gap-1 font-mono-tech text-[9.5px]">
        {options.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => {
              tacticalAudio.playClick();
              setActiveTheater(key);
            }}
            className={`px-1.5 py-0.5 border transition-colors ${
              activeTheater === key
                ? 'bg-[#c9a557] text-black border-[#e8c979] font-bold'
                : 'border-[#3a3420] text-[#8b9298] hover:text-white bg-black/40'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="absolute left-1/2 bottom-3 -translate-x-1/2 w-[min(1160px,calc(100vw-28px))] z-30 pointer-events-none">
      <div className="tactical-panel pointer-events-auto px-3 py-2 sm:px-4 sm:py-2.5 shadow-2xl backdrop-blur-md transition-all duration-300">
        {/* Row 1: Transport Controls & Hierarchical Scrubber */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Play/Pause + Prev/Next */}
          <div className="flex items-center gap-1 flex-none">
            <button
              onClick={() => {
                if (currentStep > 0) {
                  tacticalAudio.playClick();
                  onSelectStep(currentStep - 1);
                }
              }}
              disabled={currentStep === 0}
              title="Fase precedente"
              aria-label="Fase precedente"
              className="w-6 h-9 flex items-center justify-center border border-[#4a3f22] bg-black/50 text-[#c9a557] hover:border-[#e8c979] hover:text-[#e8c979] hover:bg-[#c9a557]/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                tacticalAudio.playClick();
                onTogglePlay();
              }}
              title={isPlaying ? 'Pausa sequenza storica (Spazio)' : 'Riproduci sequenza storica (Spazio)'}
              aria-label={isPlaying ? 'Pausa' : 'Play'}
              className="w-9 h-9 flex-none flex items-center justify-center font-oswald text-black bg-gradient-to-b from-[#d8b96d] to-[#9a7c3c] border border-[#efd99a] shadow-md hover:brightness-110 active:scale-95 transition-all"
              style={{
                clipPath:
                  'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)',
              }}
            >
              {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => {
                if (currentStep < STEPS.length - 1) {
                  tacticalAudio.playClick();
                  onSelectStep(currentStep + 1);
                }
              }}
              disabled={currentStep === STEPS.length - 1}
              title="Fase successiva"
              aria-label="Fase successiva"
              className="w-6 h-9 flex items-center justify-center border border-[#4a3f22] bg-black/50 text-[#c9a557] hover:border-[#e8c979] hover:text-[#e8c979] hover:bg-[#c9a557]/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Scrollable on compact viewports, spacious single-view on desktop */}
          <div className="relative flex-1 min-w-0">
            {/* Floating Hover Preview Pill (above track) */}
            {hoveredStep !== null && hoveredStepData && (
              <div
                className="hidden sm:flex items-center gap-2 absolute -top-9 z-40 pointer-events-none px-2.5 py-1 bg-[#111417]/95 border border-[#c9a557]/70 shadow-lg text-[10.5px] whitespace-nowrap transition-all duration-75"
                style={{
                  left: `${Math.max(8, Math.min(92, (hoveredStep / Math.max(1, STEPS.length - 1)) * 100))}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <span className="font-oswald font-bold text-[#e8c979] tracking-wider">
                  {hoveredStepData.d}
                </span>
                {hoveredBattles > 0 && (
                  <span className="font-mono-tech text-[#e06c68] text-[9.5px]">
                    ⚔{hoveredBattles}
                  </span>
                )}
                <span className="text-[#cfd3d6] truncate max-w-[340px]">
                  {hoveredStepData.t}
                </span>
              </div>
            )}

            <div
              ref={scrollContainerRef}
              className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div
                ref={trackRef}
                onPointerDown={handleTrackPointerDown}
                onPointerLeave={() => setHoveredStep(null)}
                className="relative w-full min-w-[780px] h-[54px] cursor-pointer touch-none select-none"
              >
                {/* Background track line */}
                <div className="absolute left-[16px] right-[16px] top-[24px] h-[2.5px] bg-[#2e2c22]" />

                {/* Filled gold progress bar */}
                <div
                  className="absolute left-[16px] top-[24px] h-[2.5px] bg-gradient-to-r from-[#8a6f33] to-[#e8c979] shadow-[0_0_8px_rgba(201,165,87,0.45)] transition-all duration-300"
                  style={{
                    width: `calc(${progressPct}% - ${(progressPct / 100) * 32}px)`,
                  }}
                />

                {/* Step Ticks */}
                {STEPS.map((st, i) => {
                  const meta = stepMetaList[i];
                  const isActive = i === currentStep;
                  const isPast = i < currentStep;
                  const pct = STEPS.length > 1 ? i / (STEPS.length - 1) : 0;
                  const leftPos = `calc(16px + ${pct * 100}% - ${pct * 32}px)`;

                  return (
                    <button
                      key={st.d || i}
                      type="button"
                      onPointerEnter={() => setHoveredStep(i)}
                      onPointerLeave={() => setHoveredStep((prev) => (prev === i ? null : prev))}
                      onClick={(e) => {
                        e.stopPropagation();
                        tacticalAudio.playClick();
                        onSelectStep(i);
                      }}
                      title={`${st.d} — ${st.t}`}
                      className="absolute top-[2px] -translate-x-1/2 w-7 h-[50px] bg-transparent border-0 p-0 cursor-pointer group focus:outline-none"
                      style={{ left: leftPos }}
                    >
                      {/* Year Anchor above the diamond ONLY on first step of each year */}
                      {meta.isYearStart && (
                        <>
                          <span
                            className={`absolute top-0 left-1/2 -translate-x-1/2 text-[9px] font-mono-tech tracking-[0.6px] whitespace-nowrap transition-colors ${
                              meta.year === stepMetaList[currentStep]?.year
                                ? 'text-[#e8c979] font-bold'
                                : 'text-[#8c815c] group-hover:text-[#d8c48c]'
                            }`}
                          >
                            {meta.year}
                          </span>
                          <span className="absolute top-[13px] left-1/2 -translate-x-1/2 w-px h-[5px] bg-[#6a5a2f]/80" />
                        </>
                      )}

                      {/* Diamond Node centered on track y=25px */}
                      <i
                        className={`block mx-auto mt-[18px] rotate-45 transition-all duration-200 border ${
                          isActive
                            ? 'w-3 h-3 border-[#e8c979] bg-[#e8c979] shadow-[0_0_10px_#e8c979] scale-110'
                            : meta.isYearStart
                            ? `w-2.5 h-2.5 border-[#8a7440] ${
                                isPast ? 'bg-[#9a7c3c]' : 'bg-[#2a271c] group-hover:bg-[#7d6837]'
                              }`
                            : `w-2 h-2 border-[#5c4f2b] ${
                                isPast ? 'bg-[#7d652e]' : 'bg-[#363224] group-hover:bg-[#7d6837]'
                              }`
                        }`}
                      />

                      {/* Compact Month Label below the diamond (never collides horizontally) */}
                      <span
                        className={`absolute top-[36px] left-1/2 -translate-x-1/2 text-[9.5px] font-mono-tech tracking-[0.4px] whitespace-nowrap transition-colors ${
                          isActive
                            ? 'text-[#e8c979] font-bold'
                            : meta.isYearStart
                            ? 'text-[#aeb5bb] group-hover:text-white'
                            : 'text-[#737b82] group-hover:text-[#cfd3d6]'
                        }`}
                      >
                        {meta.month}
                      </span>
                    </button>
                  );
                })}

                {/* Outer Active Diamond Halo */}
                <div
                  className="absolute top-[13px] w-6 h-6 pointer-events-none -translate-x-1/2 transition-all duration-300"
                  style={{
                    left: `calc(16px + ${progressPct}% - ${(progressPct / 100) * 32}px)`,
                  }}
                >
                  <i className="block w-4 h-4 mx-auto mt-1 border border-[#e8c979]/90 rotate-45 shadow-[0_0_12px_rgba(201,165,87,0.55)]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Clean Event Briefing Header & Unified Dossier Toggle */}
        <div className="mt-1.5 pt-1.5 border-t border-[#3a3420]/60 flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2.5">
            <div
              onClick={() => {
                tacticalAudio.playClick();
                setIsExpanded((prev) => !prev);
              }}
              title="Clicca per espandere/comprimere il dossier storico completo"
              className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer group"
            >
              <span className="flex-none px-1.5 py-0.5 bg-[#c9a557]/15 border border-[#c9a557]/45 font-oswald font-bold text-[11px] sm:text-xs text-[#e8c979] tracking-[1.3px]">
                {step.d}
              </span>

              {activeBattles > 0 && (
                <span
                  title={`${activeBattles} focolai/operazioni attive in questa fase`}
                  className="hidden sm:inline-flex flex-none items-center gap-1 px-1.5 py-0.5 bg-[#8f2424]/20 border border-[#d9534f]/40 text-[#eb7b78] font-mono-tech text-[10px]"
                >
                  <Swords className="w-2.5 h-2.5" />
                  <span>{activeBattles}</span>
                </span>
              )}

              <span className="font-oswald font-medium text-[12px] sm:text-[13px] text-[#e8dcc0] group-hover:text-white tracking-[0.6px] uppercase truncate transition-colors">
                {step.t}
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-none">
              {/* Theater Filter Chips (Only in Expanded Mode) */}
              {step.theaterEvents && isExpanded && (
                <div className="hidden md:flex">{renderTheaterChips()}</div>
              )}

              {/* Unified Dossier Toggle Button */}
              <button
                onClick={() => {
                  tacticalAudio.playClick();
                  setIsExpanded((prev) => !prev);
                }}
                title={isExpanded ? 'Riduci dossier per massimizzare la mappa' : 'Espandi dossier storico completo'}
                className="flex items-center gap-1.5 px-2.5 py-0.5 border border-[#6a5a2f]/80 hover:border-[#e8c979] bg-black/55 hover:bg-[#c9a557]/15 text-[#e8c979] font-mono-tech text-[10px] transition-all"
              >
                <BookOpen className="w-3 h-3 text-[#e8c979]" />
                <span className="font-semibold tracking-wider">{isExpanded ? 'COMPRIMI' : 'DOSSIER'}</span>
                {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Collapsed Headline Summary (clean single clickable line, zero duplicate button) */}
          {!isExpanded && step.headline && (
            <div
              onClick={() => {
                tacticalAudio.playClick();
                setIsExpanded(true);
              }}
              title="Clicca per aprire il briefing storico completo"
              className="text-[11px] text-[#8d969d] hover:text-[#cfd3d6] truncate italic font-sans cursor-pointer transition-colors pl-0.5"
            >
              ▸ {step.headline}
            </div>
          )}

          {/* Expanded State: Scrollable Tactical Briefing */}
          {isExpanded && (
            <div className="mt-0.5 flex flex-col gap-1.5 transition-all">
              {step.theaterEvents && (
                <div className="flex md:hidden">{renderTheaterChips()}</div>
              )}
              {step.headline && activeTheater === 'all' && (
                <div className="text-[10.5px] sm:text-[11px] font-mono-tech text-[#e8c979] font-medium tracking-wide">
                  ▸ {step.headline}
                </div>
              )}
              <div className="max-h-[95px] sm:max-h-[115px] overflow-y-auto pr-2 text-[11px] sm:text-[11.5px] text-[#cfd3d6] leading-relaxed border-l-2 border-[#c9a557]/55 pl-2.5 py-1 bg-black/40 select-text shadow-inner">
                {getTheaterSummary()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
