import React from 'react';
import { Search, Info, Volume2, VolumeX, Shield, Crosshair, Camera } from 'lucide-react';
import { STEPS } from '../data/historySteps';
import { HISTORICAL_BATTLES } from '../data/historicalBattles';
import { tacticalAudio } from '../data/audioSynthesizer';

interface TopBarProps {
  currentStep: number;
  isMuted: boolean;
  onToggleAudio: () => void;
  onOpenSearch: () => void;
  onToggleInfo: () => void;
  onExportMap?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentStep,
  isMuted,
  onToggleAudio,
  onOpenSearch,
  onToggleInfo,
  onExportMap,
}) => {
  const step = STEPS[currentStep] || STEPS[0];
  const stepBattlesCount = HISTORICAL_BATTLES.filter((b) => b.step === currentStep).length;

  return (
    <header className="absolute top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-stretch gap-2.5 pointer-events-none max-w-[calc(100vw-28px)]">
      {/* Main Title Banner */}
      <div className="tactical-panel pointer-events-auto px-4 py-2 flex flex-col justify-center shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="font-oswald text-xl sm:text-2xl font-bold tracking-[3.5px] text-[#e6d9ae] uppercase leading-none drop-shadow-[0_2px_8px_#000]">
            PATH TO WWII
          </div>
          <span className="hidden sm:inline-block h-3.5 w-[1px] bg-[#6a5a2f]" />
          <div className="hidden sm:block text-[11.5px] tracking-[2px] text-[#8b9298] uppercase font-semibold">
            Scacchiere Globale · 1936–1940
          </div>
        </div>
      </div>

      {/* Date Indicator Box */}
      <div className="tactical-panel pointer-events-auto px-4 py-1.5 flex flex-col justify-center items-center min-w-[130px] sm:min-w-[145px] shadow-2xl">
        <div className="text-[9.5px] tracking-[2.5px] text-[#8b9298] uppercase leading-none">
          SITUAZIONE AL
        </div>
        <div className="font-oswald text-2xl font-bold tracking-[2px] text-[#e8c979] drop-shadow-[0_0_12px_rgba(201,165,87,0.35)] leading-tight">
          {step.d}
        </div>
      </div>

      {/* Active Battle Hotspots Badge */}
      <div className="hidden md:flex tactical-panel pointer-events-auto px-3 py-1.5 flex-col justify-center items-center shadow-xl">
        <div className="text-[9px] tracking-[2px] text-[#8b9298] uppercase leading-none">
          FOCOLAI ATTIVI
        </div>
        <div className="font-oswald text-lg font-bold text-[#d9534f] flex items-center gap-1.5 leading-tight">
          <Crosshair className="h-3.5 w-3.5" />
          <span>{stepBattlesCount} OPERAZIONI</span>
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="tactical-panel pointer-events-auto px-2 flex items-center gap-1.5 shadow-2xl">
        {/* Search */}
        <button
          onClick={() => {
            tacticalAudio.playClick();
            onOpenSearch();
          }}
          title="Cerca territorio, toponimo o battaglia (Ctrl+K)"
          className="p-2 text-[#e8c979] hover:text-white hover:bg-white/10 rounded transition-colors"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Audio Toggle */}
        <button
          onClick={() => {
            onToggleAudio();
          }}
          title={isMuted ? 'Attiva audio tattico' : 'Disattiva audio (Mute)'}
          className="p-2 text-[#e8c979] hover:text-white hover:bg-white/10 rounded transition-colors"
        >
          {!isMuted ? <Volume2 className="h-4 w-4 text-[#7ec97e]" /> : <VolumeX className="h-4 w-4 text-[#8b9298]" />}
        </button>

        {/* Info */}
        <button
          onClick={() => {
            tacticalAudio.playClick();
            onToggleInfo();
          }}
          title="Archivio informativo e note metodologiche"
          className="p-2 text-[#e8c979] hover:text-white hover:bg-white/10 rounded transition-colors"
        >
          <Info className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};
