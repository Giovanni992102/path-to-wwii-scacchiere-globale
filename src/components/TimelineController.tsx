import React, { useRef } from 'react';
import { Play, Pause, ChevronRight, Globe2 } from 'lucide-react';
import { STEPS } from '../data/historySteps';
import { HISTORICAL_BATTLES } from '../data/historicalBattles';
import { tacticalAudio } from '../data/audioSynthesizer';

interface TimelineControllerProps {
  currentStep: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSelectStep: (step: number) => void;
}

export const TimelineController: React.FC<TimelineControllerProps> = ({
  currentStep,
  isPlaying,
  onTogglePlay,
  onSelectStep,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const step = STEPS[currentStep] || STEPS[0];
  const [activeTheater, setActiveTheater] = React.useState<'all' | 'europe' | 'asia' | 'africa' | 'americas'>('all');

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const t = Math.max(0, Math.min(1, (e.clientX - rect.left - 10) / (rect.width - 20)));
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

  return (
    <div className="absolute left-1/2 bottom-3.5 -translate-x-1/2 w-[min(1120px,calc(100vw-28px))] z-30 pointer-events-none">
      <div className="tactical-panel pointer-events-auto p-3 sm:px-5 sm:py-2.5 shadow-2xl backdrop-blur-md">
        {/* Row 1: Scrubber and Play Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              tacticalAudio.playClick();
              onTogglePlay();
            }}
            title={isPlaying ? 'Pausa sequenza storica (Spazio)' : 'Riproduci sequenza storica (Spazio)'}
            className="w-10 h-10 flex-none flex items-center justify-center font-oswald text-black bg-gradient-to-b from-[#d8b96d] to-[#9a7c3c] border border-[#efd99a] shadow-md hover:brightness-110 active:scale-95 transition-all"
            style={{
              clipPath:
                'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
            }}
          >
            {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
          </button>

          {/* Scrubber Track */}
          <div
            ref={trackRef}
            onPointerDown={handlePointerDown}
            className="relative flex-1 h-[48px] cursor-pointer touch-none select-none py-2"
          >
            {/* Background line */}
            <div className="absolute left-[10px] right-[10px] top-[17px] h-[3px] bg-[#2e2c22]" />

            {/* Filled progress bar */}
            <div
              className="absolute left-[10px] top-[17px] h-[3px] bg-gradient-to-r from-[#8a6f33] to-[#e8c979] shadow-[0_0_8px_rgba(201,165,87,0.4)] transition-all duration-500"
              style={{
                width: `calc(${(currentStep / (STEPS.length - 1)) * 100}% - ${
                  (currentStep / (STEPS.length - 1)) * 20
                }px)`,
              }}
            />

            {/* Step Ticks */}
            {STEPS.map((st, i) => {
              const isActive = i === currentStep;
              const isPast = i < currentStep;
              const leftPos = `calc(10px + ${(i / (STEPS.length - 1)) * 100}% - ${
                (i / (STEPS.length - 1)) * 20
              }px)`;
              const stepBattleCount = HISTORICAL_BATTLES.filter((b) => b.step === i).length;

              return (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    tacticalAudio.playClick();
                    onSelectStep(i);
                  }}
                  className="absolute top-[8px] -translate-x-1/2 w-6 h-6 bg-transparent border-0 p-0 cursor-pointer group"
                  style={{ left: leftPos }}
                >
                  <i
                    className={`block w-3 h-3 mx-auto mt-[3px] rotate-45 transition-all duration-200 border border-[#6a5a2f] ${
                      isActive
                        ? 'bg-[#e8c979] shadow-[0_0_10px_#e8c979] scale-125'
                        : isPast
                        ? 'bg-[#8a6f33]'
                        : 'bg-[#403c2b] group-hover:bg-[#8a7440]'
                    }`}
                  />
                  <span
                    className={`absolute top-[22px] left-1/2 -translate-x-1/2 text-[10px] sm:text-[11px] tracking-[0.5px] font-semibold whitespace-nowrap transition-colors text-center ${
                      isActive
                        ? 'text-[#e8c979] font-bold'
                        : 'text-[#8b9298] group-hover:text-[#cfd3d6]'
                    }`}
                  >
                    {st.d}
                  </span>
                  {stepBattleCount > 0 && (
                    <span className="hidden sm:block absolute -top-[14px] left-1/2 -translate-x-1/2 text-[8.5px] font-mono-tech text-[#d9534f] opacity-80 group-hover:opacity-100">
                      ⚔{stepBattleCount}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Indicator Knob */}
            <div
              className="absolute top-[6px] w-6 h-6 pointer-events-none -translate-x-1/2 transition-all duration-500"
              style={{
                left: `calc(10px + ${(currentStep / (STEPS.length - 1)) * 100}% - ${
                  (currentStep / (STEPS.length - 1)) * 20
                }px)`,
              }}
            >
              <i className="block w-4 h-4 mx-auto mt-1 border-2 border-[#e8c979] rotate-45 shadow-[0_0_12px_rgba(201,165,87,0.55)] bg-[#14171a]" />
            </div>
          </div>
        </div>

        {/* Row 2: Event Briefing & Theater Tabs */}
        <div className="mt-1 pt-2 border-t border-[#3a3420]/40 flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <div className="flex items-center gap-2">
              <span className="font-oswald font-bold text-sm text-[#e8c979] tracking-[1.5px]">
                {step.d}
              </span>
              <span className="font-oswald font-semibold text-[13px] sm:text-[14px] text-[#e8dcc0] tracking-[0.8px] uppercase truncate max-w-[280px] sm:max-w-[420px]">
                · {step.t}
              </span>
            </div>

            {/* Theater Filter Chips */}
            {step.theaterEvents && (
              <div className="flex items-center gap-1 font-mono-tech text-[10px]">
                <button
                  onClick={() => {
                    tacticalAudio.playClick();
                    setActiveTheater('all');
                  }}
                  className={`px-1.5 py-0.5 border transition-colors ${
                    activeTheater === 'all'
                      ? 'bg-[#c9a557] text-black border-[#e8c979] font-bold'
                      : 'border-[#3a3420] text-[#8b9298] hover:text-white bg-black/30'
                  }`}
                >
                  GENERALE
                </button>
                <button
                  onClick={() => {
                    tacticalAudio.playClick();
                    setActiveTheater('europe');
                  }}
                  className={`px-1.5 py-0.5 border transition-colors ${
                    activeTheater === 'europe'
                      ? 'bg-[#c9a557] text-black border-[#e8c979] font-bold'
                      : 'border-[#3a3420] text-[#8b9298] hover:text-white bg-black/30'
                  }`}
                >
                  EUROPA
                </button>
                <button
                  onClick={() => {
                    tacticalAudio.playClick();
                    setActiveTheater('asia');
                  }}
                  className={`px-1.5 py-0.5 border transition-colors ${
                    activeTheater === 'asia'
                      ? 'bg-[#c9a557] text-black border-[#e8c979] font-bold'
                      : 'border-[#3a3420] text-[#8b9298] hover:text-white bg-black/30'
                  }`}
                >
                  ASIA
                </button>
                <button
                  onClick={() => {
                    tacticalAudio.playClick();
                    setActiveTheater('africa');
                  }}
                  className={`px-1.5 py-0.5 border transition-colors ${
                    activeTheater === 'africa'
                      ? 'bg-[#c9a557] text-black border-[#e8c979] font-bold'
                      : 'border-[#3a3420] text-[#8b9298] hover:text-white bg-black/30'
                  }`}
                >
                  AFRICA
                </button>
              </div>
            )}
          </div>

          <div className="text-[11.5px] sm:text-[12px] text-[#cfd3d6] leading-snug">
            {getTheaterSummary()}
          </div>
        </div>
      </div>
    </div>
  );
};
