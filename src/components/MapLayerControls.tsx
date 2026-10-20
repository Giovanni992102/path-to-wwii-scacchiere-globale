import React from 'react';
import {
  Shield,
  Crosshair,
  Anchor,
  Navigation,
  Landmark,
  Radio,
  Volume2,
  VolumeX,
  Layers,
  Camera,
} from 'lucide-react';
import { tacticalAudio } from '../data/audioSynthesizer';

export interface LayerVisibilityState {
  fortifications: boolean;
  battles: boolean;
  navalBases: boolean;
  seaLanes: boolean;
  cityLabels: boolean;
  hatchPatterns: boolean;
  islandBeacons: boolean;
}

interface MapLayerControlsProps {
  layers: LayerVisibilityState;
  onToggleLayer: (layerKey: keyof LayerVisibilityState) => void;
  isMuted: boolean;
  onToggleAudio: () => void;
  onExportMap?: () => void;
}

export const MapLayerControls: React.FC<MapLayerControlsProps> = ({
  layers,
  onToggleLayer,
  isMuted,
  onToggleAudio,
  onExportMap,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = (key: keyof LayerVisibilityState) => {
    tacticalAudio.playClick();
    onToggleLayer(key);
  };

  const handleAudioToggle = () => {
    onToggleAudio();
  };

  return (
    <div
      style={{ position: 'absolute' }}
      className="absolute left-3.5 bottom-[155px] sm:bottom-[170px] z-35 flex flex-col-reverse items-start gap-1.5 pointer-events-auto"
    >
      {/* Floating Toggle Button */}
      <button
        onClick={() => {
          tacticalAudio.playClick();
          setIsOpen(!isOpen);
        }}
        title="Layer cartografici e opzioni tattiche"
        className={`h-10 px-3 flex items-center gap-2 font-oswald text-xs tracking-wider border shadow-lg transition-all active:scale-95 ${
          isOpen
            ? 'bg-[#c9a557] text-black border-[#e8c979] font-bold'
            : 'bg-gradient-to-b from-[#1b1f23] to-[#101316] text-[#e8c979] border-[#6a5a2f] hover:border-[#c9a557] hover:text-white'
        }`}
      >
        <Layers className="h-4 w-4" />
        <span className="hidden sm:inline uppercase">LAYER TATTICI</span>
      </button>

      {/* Expanded Control Box */}
      {isOpen && (
        <div className="tactical-panel p-2.5 w-[210px] sm:w-[230px] flex flex-col gap-1.5 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150 text-xs">
          <div className="text-[10px] tracking-[1.5px] text-[#8b9298] uppercase font-semibold border-b border-[#3a3420]/60 pb-1 flex justify-between items-center">
            <span>LIVELLI MAPPA</span>
            <span className="font-mono-tech text-[9px] text-[#c9a557]">[HUD]</span>
          </div>

          {/* 1. Fortifications */}
          <button
            onClick={() => toggle('fortifications')}
            className={`flex items-center justify-between px-2 py-1.5 border transition-all text-[11.5px] ${
              layers.fortifications
                ? 'bg-[#4c6a9c]/25 border-[#5f87c0] text-[#f0e6c8]'
                : 'bg-black/30 border-[#2c2a20] text-[#8b9298] hover:text-[#cfd3d6]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Shield className="h-3.5 w-3.5 text-[#5f87c0]" />
              <span>Linee Difensive</span>
            </span>
            <span
              className={`w-2 h-2 rounded-full ${
                layers.fortifications ? 'bg-[#5f87c0] shadow-[0_0_6px_#5f87c0]' : 'bg-[#404040]'
              }`}
            />
          </button>

          {/* 2. Battles */}
          <button
            onClick={() => toggle('battles')}
            className={`flex items-center justify-between px-2 py-1.5 border transition-all text-[11.5px] ${
              layers.battles
                ? 'bg-[#b04540]/25 border-[#d9534f] text-[#f0e6c8]'
                : 'bg-black/30 border-[#2c2a20] text-[#8b9298] hover:text-[#cfd3d6]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Crosshair className="h-3.5 w-3.5 text-[#d9534f]" />
              <span>Battaglie & Fronti</span>
            </span>
            <span
              className={`w-2 h-2 rounded-full ${
                layers.battles ? 'bg-[#d9534f] shadow-[0_0_6px_#d9534f]' : 'bg-[#404040]'
              }`}
            />
          </button>

          {/* 3. Naval Bases */}
          <button
            onClick={() => toggle('navalBases')}
            className={`flex items-center justify-between px-2 py-1.5 border transition-all text-[11.5px] ${
              layers.navalBases
                ? 'bg-[#3b6b82]/25 border-[#5aa0c2] text-[#f0e6c8]'
                : 'bg-black/30 border-[#2c2a20] text-[#8b9298] hover:text-[#cfd3d6]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Anchor className="h-3.5 w-3.5 text-[#5aa0c2]" />
              <span>Basi Navali & Forti</span>
            </span>
            <span
              className={`w-2 h-2 rounded-full ${
                layers.navalBases ? 'bg-[#5aa0c2] shadow-[0_0_6px_#5aa0c2]' : 'bg-[#404040]'
              }`}
            />
          </button>

          {/* 4. Sea Lanes */}
          <button
            onClick={() => toggle('seaLanes')}
            className={`flex items-center justify-between px-2 py-1.5 border transition-all text-[11.5px] ${
              layers.seaLanes
                ? 'bg-[#c9a557]/20 border-[#c9a557] text-[#f0e6c8]'
                : 'bg-black/30 border-[#2c2a20] text-[#8b9298] hover:text-[#cfd3d6]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Navigation className="h-3.5 w-3.5 text-[#c9a557]" />
              <span>Rotte di Convoglio</span>
            </span>
            <span
              className={`w-2 h-2 rounded-full ${
                layers.seaLanes ? 'bg-[#c9a557] shadow-[0_0_6px_#c9a557]' : 'bg-[#404040]'
              }`}
            />
          </button>

          {/* 5. City Labels */}
          <button
            onClick={() => toggle('cityLabels')}
            className={`flex items-center justify-between px-2 py-1.5 border transition-all text-[11.5px] ${
              layers.cityLabels
                ? 'bg-[#7ec97e]/20 border-[#7ec97e] text-[#f0e6c8]'
                : 'bg-black/30 border-[#2c2a20] text-[#8b9298] hover:text-[#cfd3d6]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Landmark className="h-3.5 w-3.5 text-[#7ec97e]" />
              <span>Capitali & Città</span>
            </span>
            <span
              className={`w-2 h-2 rounded-full ${
                layers.cityLabels ? 'bg-[#7ec97e] shadow-[0_0_6px_#7ec97e]' : 'bg-[#404040]'
              }`}
            />
          </button>

          {/* 6. Strategic Island Beacons / Nuclei Luminosi */}
          <button
            onClick={() => toggle('islandBeacons')}
            className={`flex items-center justify-between px-2 py-1.5 border transition-all text-[11.5px] ${
              layers.islandBeacons
                ? 'bg-[#e8c979]/20 border-[#e8c979] text-[#f0e6c8]'
                : 'bg-black/30 border-[#2c2a20] text-[#8b9298] hover:text-[#cfd3d6]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Radio className="h-3.5 w-3.5 text-[#e8c979]" />
              <span>Nuclei Luminosi Isole</span>
            </span>
            <span
              className={`w-2 h-2 rounded-full ${
                layers.islandBeacons ? 'bg-[#e8c979] shadow-[0_0_6px_#e8c979]' : 'bg-[#404040]'
              }`}
            />
          </button>

          {/* Utility Row: Sound & Export */}
          <div className="pt-1.5 border-t border-[#3a3420]/60 flex items-center gap-1.5">
            <button
              onClick={handleAudioToggle}
              title={isMuted ? 'Attiva effetti sonori operativi' : 'Disattiva effetti sonori (Mute)'}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2 border text-[11px] font-oswald tracking-wider transition-colors ${
                !isMuted
                  ? 'border-[#6a5a2f] text-[#e8c979] bg-black/40 hover:border-[#c9a557]'
                  : 'border-[#403c2b] text-[#8b9298] bg-black/20 hover:text-white'
              }`}
            >
              {!isMuted ? <Volume2 className="h-3.5 w-3.5 text-[#7ec97e]" /> : <VolumeX className="h-3.5 w-3.5 text-[#8b9298]" />}
              <span>{isMuted ? 'AUDIO OFF' : 'AUDIO ON'}</span>
            </button>

            {onExportMap && (
              <button
                onClick={() => {
                  tacticalAudio.playClick();
                  onExportMap();
                }}
                title="Esporta mappa strategica (Snapshot)"
                className="p-1 border border-[#6a5a2f] text-[#e8c979] hover:text-white hover:border-[#c9a557] bg-black/40"
              >
                <Camera className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
