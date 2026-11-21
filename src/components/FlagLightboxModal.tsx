import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Maximize2,
  RefreshCw,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { STEPS } from '../data/historySteps';
import { CountryFlag, getCountryFlagSvg, resolveHistoricalFlag } from '../data/historicalFlags';
import { tacticalAudio } from '../data/audioSynthesizer';

type BackdropTheme = 'dark' | 'parchment' | 'checker';
type ZoomLevel = 1 | 1.5 | 2.25;

export interface FlagInspectSlot {
  code: string;
  label: string;
  title?: string;
}

interface FlagLightboxModalProps {
  primary: FlagInspectSlot;
  secondary?: FlagInspectSlot | null;
  initialSlot?: 'primary' | 'secondary';
  currentStep: number;
  countryName: string;
  flagStatusLabels: Record<string, string>;
  flagCategoryLabels: Record<string, string>;
  onSelectMapStep: (step: number) => void;
  onClose: () => void;
}

function parseSvgDimensions(svg: string): { w: number; h: number } {
  const match = svg.match(/viewBox=["']\s*[\d.-]+\s+[\d.-]+\s+([\d.]+)\s+([\d.]+)\s*["']/i);
  if (match) {
    const w = parseFloat(match[1]);
    const h = parseFloat(match[2]);
    if (Number.isFinite(w) && Number.isFinite(h) && w > 0 && h > 0) {
      return { w, h };
    }
  }
  return { w: 3, h: 2 };
}

export const FlagLightboxModal: React.FC<FlagLightboxModalProps> = ({
  primary,
  secondary = null,
  initialSlot = 'primary',
  currentStep,
  countryName,
  flagStatusLabels,
  flagCategoryLabels,
  onSelectMapStep,
  onClose,
}) => {
  const [activeSlot, setActiveSlot] = useState<'primary' | 'secondary'>(
    initialSlot === 'secondary' && secondary ? 'secondary' : 'primary'
  );
  const [inspectStep, setInspectStep] = useState<number>(currentStep);
  const [zoom, setZoom] = useState<ZoomLevel>(1);
  const [backdrop, setBackdrop] = useState<BackdropTheme>('dark');

  useEffect(() => {
    setActiveSlot(initialSlot === 'secondary' && secondary ? 'secondary' : 'primary');
  }, [initialSlot, secondary]);

  useEffect(() => {
    setInspectStep(currentStep);
  }, [currentStep]);

  // Capture Escape and Arrow keys before App.tsx global listener so the background CountryProfileModal stays open.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        tacticalAudio.playClick();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopImmediatePropagation();
        setInspectStep((s) => Math.max(0, s - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopImmediatePropagation();
        setInspectStep((s) => Math.min(STEPS.length - 1, s + 1));
      }
    };
    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, [onClose]);

  const currentSlot = activeSlot === 'secondary' && secondary ? secondary : primary;
  const stepMeta = STEPS[inspectStep] || STEPS[0];
  const rawSvg = useMemo(
    () => getCountryFlagSvg(currentSlot.code, inspectStep),
    [currentSlot.code, inspectStep]
  );
  const { w: vbW, h: vbH } = useMemo(() => parseSvgDimensions(rawSvg), [rawSvg]);
  const flagMeta = useMemo(
    () => resolveHistoricalFlag(currentSlot.code, inspectStep),
    [currentSlot.code, inspectStep]
  );

  const stageBackdropStyle: React.CSSProperties =
    backdrop === 'parchment'
      ? { backgroundColor: '#dcd4c2' }
      : backdrop === 'checker'
        ? {
            backgroundColor: '#1a1f26',
            backgroundImage:
              'linear-gradient(45deg, #252c35 25%, transparent 25%), linear-gradient(-45deg, #252c35 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #252c35 75%), linear-gradient(-45deg, transparent 75%, #252c35 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          }
        : {
            background: 'radial-gradient(circle at center, #141a23 0%, #07090d 100%)',
          };

  const ratioLabel = `${Math.round(vbW)}:${Math.round(vbH)}`;
  const zoomStops: ZoomLevel[] = [1, 1.5, 2.25];

  return (
    <div
      className="fixed inset-0 z-[75] flex items-center justify-center bg-black/88 backdrop-blur-md p-3 sm:p-6 animate-fadeIn"
      onClick={() => {
        tacticalAudio.playClick();
        onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Ispezione ad alta definizione vessillo ${countryName}`}
    >
      <div
        className="w-[min(92vw,1120px)] max-h-[94vh] flex flex-col bg-[#0d1117] border-2 border-[#c9a557]/80 shadow-[0_24px_80px_rgba(0,0,0,0.95)] rounded-[2px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="px-3.5 sm:px-5 py-2.5 bg-[#12171e] border-b border-[#3a3420] flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <Flag className="h-4 w-4 text-[#e8c979] flex-none" />
            <div className="min-w-0">
              <div className="font-oswald text-sm sm:text-base font-bold uppercase tracking-[1.2px] text-[#f4ebd0] truncate">
                {flagMeta ? flagMeta.historical_name_at_date : currentSlot.title || `${countryName} (${currentSlot.code})`}
              </div>
              <div className="text-[10px] font-mono-tech text-[#8b9298] flex flex-wrap items-center gap-2">
                <span className="text-[#c9a557]">{stepMeta.d}</span>
                <span>•</span>
                <span>Vettore {ratioLabel}</span>
                {flagMeta && (
                  <>
                    <span>•</span>
                    <span className="text-[#7ec97e]">
                      {flagMeta.validity_window.valid_from} → {flagMeta.validity_window.valid_to}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Controls: Co-Flag Toggle, Backdrop, Zoom, Close */}
          <div className="flex flex-wrap items-center gap-2">
            {secondary && (
              <div className="inline-flex border border-[#3a3420] bg-black/50 rounded-[1px] overflow-hidden text-[10px] font-mono-tech">
                <button
                  type="button"
                  onClick={() => {
                    tacticalAudio.playClick();
                    setActiveSlot('primary');
                  }}
                  className={`px-2 py-1 uppercase transition-colors ${
                    activeSlot === 'primary'
                      ? 'bg-[#c9a557]/25 text-[#f4ebd0] font-bold'
                      : 'text-[#8b9298] hover:text-[#cfd3d6]'
                  }`}
                >
                  {primary.label}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    tacticalAudio.playClick();
                    setActiveSlot('secondary');
                  }}
                  className={`px-2 py-1 uppercase border-l border-[#3a3420] transition-colors ${
                    activeSlot === 'secondary'
                      ? 'bg-[#c9a557]/25 text-[#f4ebd0] font-bold'
                      : 'text-[#8b9298] hover:text-[#cfd3d6]'
                  }`}
                >
                  {secondary.label}
                </button>
              </div>
            )}

            <div
              className="inline-flex border border-[#3a3420] bg-black/50 rounded-[1px] overflow-hidden text-[10px] font-mono-tech"
              title="Sfondo di contrasto per ispezione araldica"
            >
              {(
                [
                  { id: 'dark', label: 'Scuro' },
                  { id: 'parchment', label: 'Carta' },
                  { id: 'checker', label: 'Griglia' },
                ] as { id: BackdropTheme; label: string }[]
              ).map((b, idx) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    tacticalAudio.playClick();
                    setBackdrop(b.id);
                  }}
                  className={`px-2 py-1 uppercase transition-colors ${idx > 0 ? 'border-l border-[#3a3420]' : ''} ${
                    backdrop === b.id
                      ? 'bg-[#e8c979]/20 text-[#e8c979] font-bold'
                      : 'text-[#8b9298] hover:text-[#cfd3d6]'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            <div className="inline-flex border border-[#3a3420] bg-black/50 rounded-[1px] overflow-hidden text-[10px] font-mono-tech items-center">
              <button
                type="button"
                onClick={() => {
                  tacticalAudio.playClick();
                  const i = zoomStops.indexOf(zoom);
                  setZoom(zoomStops[Math.max(0, i - 1)]);
                }}
                disabled={zoom === 1}
                className="px-1.5 py-1 text-[#cfd3d6] hover:bg-white/10 disabled:opacity-35"
                title="Riduci zoom"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              {zoomStops.map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => {
                    tacticalAudio.playClick();
                    setZoom(z);
                  }}
                  className={`px-2 py-1 border-l border-[#3a3420] transition-colors ${
                    zoom === z
                      ? 'bg-[#c9a557]/25 text-[#f4ebd0] font-bold'
                      : 'text-[#8b9298] hover:text-[#cfd3d6]'
                  }`}
                >
                  {z}×
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  tacticalAudio.playClick();
                  const i = zoomStops.indexOf(zoom);
                  setZoom(zoomStops[Math.min(zoomStops.length - 1, i + 1)]);
                }}
                disabled={zoom === 2.25}
                className="px-1.5 py-1 border-l border-[#3a3420] text-[#cfd3d6] hover:bg-white/10 disabled:opacity-35"
                title="Aumenta zoom dettagli"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                tacticalAudio.playClick();
                onClose();
              }}
              className="p-1.5 bg-black/60 border border-[#5a4e2e] hover:border-[#e8c979] text-[#e8c979] rounded-[1px] transition-colors"
              title="Chiudi ingrandimento (Esc)"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* High-Definition Stage (>= 25%–45% of screen area) */}
        <div
          className="relative w-full h-[min(56vh,540px)] min-h-[270px] overflow-auto flex items-center justify-center p-4 sm:p-7 select-none"
          style={stageBackdropStyle}
        >
          <div
            onClick={() => {
              tacticalAudio.playClick();
              setZoom((z) => (z === 1 ? 1.5 : z === 1.5 ? 2.25 : 1));
            }}
            title="Clicca per ciclare lo zoom (1× → 1.5× → 2.25×)"
            className="relative flex-none flex items-center justify-center shadow-[0_14px_48px_rgba(0,0,0,0.85)] ring-1 ring-white/15 cursor-zoom-in transition-all duration-200"
            style={{
              aspectRatio: `${vbW} / ${vbH}`,
              height: `${Math.round(zoom * 100)}%`,
              maxWidth: zoom === 1 ? '100%' : 'none',
              maxHeight: zoom === 1 ? '100%' : 'none',
            }}
          >
            <CountryFlag
              owner={currentSlot.code}
              step={inspectStep}
              className="w-full h-full [&_svg]:w-full [&_svg]:h-full [&_svg]:block"
            />
          </div>

          <div className="pointer-events-none absolute bottom-2.5 right-3 px-2 py-0.5 bg-black/75 border border-[#3a3420] text-[9.5px] font-mono-tech text-[#c8b98a] flex items-center gap-1.5 rounded-[1px]">
            <Maximize2 className="h-3 w-3 text-[#c9a557]" />
            <span>
              Zoom {zoom}× · ←/→ per scorrere le date
            </span>
          </div>
        </div>

        {/* Footer: Vexillology Rationale + Live Timeline Scrubber */}
        <div className="px-4 sm:px-5 py-3 bg-[#10141b] border-t border-[#3a3420] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex-1 min-w-0 space-y-1">
            {flagMeta ? (
              <>
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono-tech">
                  <span className="px-1.5 py-0.5 bg-black/50 border border-[#3a3420] text-[#c9a557]">
                    {flagStatusLabels[flagMeta.flag_status] || flagMeta.flag_status}
                  </span>
                  <span className="px-1.5 py-0.5 bg-black/50 border border-[#3a3420] text-[#8b9298]">
                    {flagCategoryLabels[flagMeta.flag_category] || flagMeta.flag_category}
                  </span>
                  <span className="px-1.5 py-0.5 bg-black/50 border border-[#3a3420] text-[#8b9298]">
                    {flagMeta.asset.file_name}
                  </span>
                  {flagMeta.wikidata_item_id && (
                    <span className="px-1.5 py-0.5 bg-black/50 border border-[#3a3420] text-[#c9a557]">
                      Wikidata {flagMeta.wikidata_item_id}
                    </span>
                  )}
                </div>
                <p className="text-[11.5px] text-[#d6cba7] leading-snug">
                  {flagMeta.historical_rationale}
                </p>
              </>
            ) : (
              <p className="text-[11.5px] text-[#8b9298] italic">
                Emblema storico sincronizzato al {stepMeta.d} ({currentSlot.code}).
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 flex-none font-mono-tech text-[10.5px]">
            <button
              type="button"
              disabled={inspectStep <= 0}
              onClick={() => {
                tacticalAudio.playClick();
                setInspectStep((s) => Math.max(0, s - 1));
              }}
              className="px-2 py-1 bg-black/50 border border-[#3a3420] text-[#cfd3d6] hover:border-[#c9a557] disabled:opacity-35 inline-flex items-center gap-1"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Prec.</span>
            </button>
            <div className="px-2.5 py-1 bg-[#181d25] border border-[#5a4e2e] text-[#e8c979] font-bold">
              Step {inspectStep + 1}/{STEPS.length} · {stepMeta.d}
            </div>
            <button
              type="button"
              disabled={inspectStep >= STEPS.length - 1}
              onClick={() => {
                tacticalAudio.playClick();
                setInspectStep((s) => Math.min(STEPS.length - 1, s + 1));
              }}
              className="px-2 py-1 bg-black/50 border border-[#3a3420] text-[#cfd3d6] hover:border-[#c9a557] disabled:opacity-35 inline-flex items-center gap-1"
            >
              <span>Succ.</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
            {inspectStep !== currentStep && (
              <button
                type="button"
                onClick={() => {
                  tacticalAudio.playClick();
                  onSelectMapStep(inspectStep);
                }}
                className="px-2.5 py-1 bg-[#c9a557]/20 border border-[#c9a557] text-[#f4ebd0] hover:bg-[#c9a557]/35 inline-flex items-center gap-1"
                title="Sincronizza la mappa principale su questo step"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Sincronizza Mappa</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
