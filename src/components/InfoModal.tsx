import React from 'react';
import { X, BookOpen, Layers, Keyboard, Award, Shield, Crosshair, Anchor, Navigation } from 'lucide-react';
import { tacticalAudio } from '../data/audioSynthesizer';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="tactical-panel w-full max-w-2xl max-h-[85vh] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150 text-xs leading-relaxed"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="panel-title justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-[#e8c979]" />
            <span>ARCHIVIO OPERATIVO E NOTE METODOLOGICHE</span>
          </div>
          <button
            onClick={() => {
              tacticalAudio.playClick();
              onClose();
            }}
            className="h-5 w-5 flex items-center justify-center border border-[#8a7440] text-[#e8c979] hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {/* Section: Overview */}
          <div>
            <div className="font-oswald text-sm font-bold text-[#e8c979] tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" /> Motore Geospaziale & Fonti Storiche
            </div>
            <p className="text-[#cfd3d6]">
              L'atlante geopolitico adotta un'architettura ibrida ad altissima risoluzione per il periodo 1936–1940:
            </p>
            <ul className="list-disc list-inside mt-1.5 space-y-1 text-[#8b9298]">
              <li>
                <b className="text-[#e6d9ae]">Eurostat NUTS-3 & Precision Borders</b> per la micro-granulometria provinciale europea (Danzica, Slesia, Sudeti, Istria, Dalmazia, Alsazia-Lorena, Memelland, Rutenia Subcarpatica, Dodecaneso Italiano).
              </li>
              <li>
                <b className="text-[#e6d9ae]">Kresy Wschodnie & Distretti Sovietici/Cinesi</b>: oltre 80 powiat polacchi orientali, oblast sovietici del Trattato di Riga e province della Seconda Guerra Sino-Giapponese.
              </li>
              <li>
                <b className="text-[#e6d9ae]">Historical Basemaps (1938) & Planisfero</b>: imperi coloniali in Africa e Asia, Medio Oriente, America Latina e sfera d'influenza globale.
              </li>
            </ul>
          </div>

          {/* Section: Tactical Layers */}
          <div>
            <div className="font-oswald text-sm font-bold text-[#e8c979] tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" /> Layer Cartografici & Strumenti Tattici
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5 text-[11px]">
              <div className="border border-[#3a3420] p-2 bg-black/30 flex items-start gap-2">
                <Shield className="h-4 w-4 text-[#5f87c0] flex-none mt-0.5" />
                <div>
                  <b className="text-[#f0e6c8]">Linee Difensive Fortificate</b>
                  <div className="text-[#8b9298]">Linea Maginot, Linea Sigfrido (Westwall), Linea Mannerheim, Linea Metaxas, Linea Stalin e Vallo Alpino.</div>
                </div>
              </div>

              <div className="border border-[#3a3420] p-2 bg-black/30 flex items-start gap-2">
                <Crosshair className="h-4 w-4 text-[#d9534f] flex-none mt-0.5" />
                <div>
                  <b className="text-[#f0e6c8]">Battaglie & Operazioni per Step</b>
                  <div className="text-[#8b9298]">Focolai bellici sincronizzati con la timeline (Ponte Marco Polo, Ebro, Khalkhin Gol, Westerplatte, Dunkerque).</div>
                </div>
              </div>

              <div className="border border-[#3a3420] p-2 bg-black/30 flex items-start gap-2">
                <Anchor className="h-4 w-4 text-[#5aa0c2] flex-none mt-0.5" />
                <div>
                  <b className="text-[#f0e6c8]">Basi Navali & Fortezze</b>
                  <div className="text-[#8b9298]">Scapa Flow, Gibilterra, Malta, Alessandria, Brest, Tolone, Taranto, Wilhelmshaven, Kronstadt, Kure, Pearl Harbor.</div>
                </div>
              </div>

              <div className="border border-[#3a3420] p-2 bg-black/30 flex items-start gap-2">
                <Navigation className="h-4 w-4 text-[#c9a557] flex-none mt-0.5" />
                <div>
                  <b className="text-[#f0e6c8]">Rotte di Convoglio Oceaniche</b>
                  <div className="text-[#8b9298]">Corridoio del Nord Atlantico, Lifeline Mediterraneo-Suez, Rotta del Capo e rotte marittime asiatiche.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Extended Toponymy */}
          <div>
            <div className="font-oswald text-sm font-bold text-[#e8c979] tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5" /> Toponomastica Dinamica Contestuale
            </div>
            <p className="text-[#cfd3d6]">
              I toponimi si trasformano dinamicamente in base alla lingua e all'amministrazione del controllore politico:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 font-mono-tech text-[10.5px]">
              <div className="border border-[#3a3420] p-1.5 bg-black/30">
                <span className="text-[#e8c979]">Wrocław</span> ➔ <span className="text-white">Breslau (Niederschlesien)</span>
              </div>
              <div className="border border-[#3a3420] p-1.5 bg-black/30">
                <span className="text-[#e8c979]">Kaliningrad</span> ➔ <span className="text-white">Königsberg in Preußen</span>
              </div>
              <div className="border border-[#3a3420] p-1.5 bg-black/30">
                <span className="text-[#e8c979]">Rodos</span> ➔ <span className="text-white">Rodi (Isole Italiane dell'Egeo, ITA)</span>
              </div>
              <div className="border border-[#3a3420] p-1.5 bg-black/30">
                <span className="text-[#e8c979]">Pula / Rijeka</span> ➔ <span className="text-white">Pola (Istria) / Fiume (Carnaro)</span>
              </div>
              <div className="border border-[#3a3420] p-1.5 bg-black/30">
                <span className="text-[#e8c979]">Viipuri</span> ➔ <span className="text-white">Viipuri (FIN) ➔ Vyborg (SOV 1940)</span>
              </div>
              <div className="border border-[#3a3420] p-1.5 bg-black/30">
                <span className="text-[#e8c979]">Bessarabia</span> ➔ <span className="text-white">Chișinău (ROM) ➔ RSS Moldava (SOV 1940)</span>
              </div>
            </div>
          </div>

          {/* Section: Shortcuts */}
          <div>
            <div className="font-oswald text-sm font-bold text-[#e8c979] tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <Keyboard className="h-3.5 w-3.5" /> Scorciatoie da Tastiera
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] mt-1.5">
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 bg-black/60 border border-[#6a5a2f] text-[#e8c979] font-mono-tech text-[10px]">
                  Spazio
                </kbd>
                <span className="text-[#cfd3d6]">Play / Pausa</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 bg-black/60 border border-[#6a5a2f] text-[#e8c979] font-mono-tech text-[10px]">
                  ← / →
                </kbd>
                <span className="text-[#cfd3d6]">Cambia Data</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 bg-black/60 border border-[#6a5a2f] text-[#e8c979] font-mono-tech text-[10px]">
                  Ctrl+K
                </kbd>
                <span className="text-[#cfd3d6]">Cerca Tutto</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 bg-black/60 border border-[#6a5a2f] text-[#e8c979] font-mono-tech text-[10px]">
                  Esc
                </kbd>
                <span className="text-[#cfd3d6]">Chiudi Finestra</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-[#3a3420] bg-[#101316] flex justify-between items-center text-[10.5px] text-[#8b9298]">
          <span>© Eurostat GISCO · Historical Basemaps · Ricostruzione Cartografica 1936–1940</span>
          <button
            onClick={() => {
              tacticalAudio.playClick();
              onClose();
            }}
            className="px-4 py-1 font-oswald text-[#e8c979] border border-[#6a5a2f] hover:border-[#c9a557] bg-black/40"
          >
            CHIUDI
          </button>
        </div>
      </div>
    </div>
  );
};
