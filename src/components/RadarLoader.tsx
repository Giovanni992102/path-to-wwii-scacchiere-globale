import React from 'react';
import { RefreshCw } from 'lucide-react';

interface RadarLoaderProps {
  progress: number;
  logs: { text: string; type?: 'ok' | 'warn' | 'info' }[];
  error: string | null;
  onRetry: () => void;
  isVisible: boolean;
}

export const RadarLoader: React.FC<RadarLoaderProps> = ({
  progress,
  logs,
  error,
  onRetry,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[radial-gradient(900px_600px_at_50%_45%,#0b100d_0%,#05070a_75%)] text-[#cfd3d6] transition-opacity duration-700">
      {/* Title Header */}
      <div className="text-center">
        <h1 className="font-oswald text-3xl font-bold tracking-[8px] text-[#dfe6d8]">
          PATH TO WWII
        </h1>
        <p className="mt-1 text-xs tracking-[3px] text-[#7a8a76] uppercase">
          SALA OPERATIVA — SCANSIONE RADAR GLOBALE (1936–1940)
        </p>
      </div>

      {/* Military Radar Display */}
      <div
        id="radar"
        className="relative h-[240px] w-[240px] overflow-hidden rounded-full border-2 border-[#3f5a44] shadow-[0_0_30px_rgba(38,64,44,0.4),inset_0_0_40px_rgba(0,0,0,0.6)]"
        style={{
          background: `radial-gradient(circle, transparent 0 38px, rgba(126,201,126,0.06) 38px 39px, transparent 39px 78px, rgba(126,201,126,0.06) 78px 79px, transparent 79px 118px, rgba(126,201,126,0.06) 118px 119px, transparent 119px)`,
        }}
      >
        {/* Crosshairs */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] -translate-y-1/2 bg-[rgba(126,201,126,0.2)] pointer-events-none" />
        <div className="absolute inset-y-0 left-1/2 w-[1px] -translate-x-1/2 bg-[rgba(126,201,126,0.2)] pointer-events-none" />

        {/* Sweep cone */}
        <div
          className="animate-radar-spin absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(126,201,126,0) 0deg, rgba(126,201,126,0.05) 200deg, rgba(126,201,126,0.45) 340deg, rgba(190,255,190,0.9) 359deg, transparent 360deg)',
          }}
        />

        {/* Blips */}
        <div
          className="animate-blip absolute h-[6px] w-[6px] rounded-full bg-[#9ef09e] shadow-[0_0_8px_#9ef09e]"
          style={{ left: '62%', top: '34%' }}
        />
        <div
          className="animate-blip absolute h-[6px] w-[6px] rounded-full bg-[#9ef09e] shadow-[0_0_8px_#9ef09e]"
          style={{ left: '38%', top: '58%', animationDelay: '0.9s' }}
        />
        <div
          className="animate-blip absolute h-[6px] w-[6px] rounded-full bg-[#9ef09e] shadow-[0_0_8px_#9ef09e]"
          style={{ left: '55%', top: '70%', animationDelay: '1.7s' }}
        />
      </div>

      {/* Progress Bar */}
      <div className="w-[320px] max-w-[85vw] border border-[#3f5a44] bg-[#0a0f0b] p-[2px]">
        <div
          className="h-[8px] bg-gradient-to-r from-[#3f6a44] to-[#9ef09e] shadow-[0_0_10px_rgba(126,201,126,0.4)] transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>

      <div className="font-oswald text-sm tracking-[2px] text-[#9ef09e]">
        {Math.min(100, Math.round(progress))}%
      </div>

      {/* Live Log Console */}
      <div className="h-[105px] w-[520px] max-w-[90vw] overflow-hidden border border-[#27352a] bg-[#070a07]/80 p-2.5 font-['Rajdhani'] text-xs leading-relaxed text-[#8fae8a]">
        {logs.slice(-5).map((log, index) => (
          <div
            key={index}
            className={`truncate ${
              log.type === 'ok'
                ? 'text-[#bfe6b8]'
                : log.type === 'warn'
                ? 'text-[#c9a557]'
                : 'text-[#8fae8a]'
            }`}
          >
            » {log.text}
          </div>
        ))}
      </div>

      {error && (
        <button
          onClick={onRetry}
          className="mt-2 flex items-center gap-2 border border-[#c9a557] bg-[#c9a557] px-6 py-2 font-oswald text-xs font-semibold tracking-[2px] text-[#0e0f10] transition-transform hover:scale-105"
        >
          <RefreshCw className="h-3.5 w-3.5" /> RIPROVA
        </button>
      )}
    </div>
  );
};
