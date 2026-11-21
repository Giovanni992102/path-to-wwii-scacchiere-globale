import React, { useMemo, useState } from 'react';
import {
  X,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Crown,
  Flag,
  Globe,
  Landmark,
  Layers,
  MapPin,
  Shield,
  TrendingDown,
  TrendingUp,
  User,
  Users,
  ExternalLink,
  Activity,
  ZoomIn,
} from 'lucide-react';
import { StatsStep } from '../types';
import { STEPS } from '../data/historySteps';
import { FACTION_COLORS } from '../data/owners';
import { CountryFlag, getSecondaryCoFlag } from '../data/historicalFlags';
import { FlagLightboxModal } from './FlagLightboxModal';
import { buildCountryProfile, CountryProfileData } from '../data/countryInsights';
import { tacticalAudio } from '../data/audioSynthesizer';

interface CountryProfileModalProps {
  ownerCode: string | null;
  currentStep: number;
  stats: StatsStep[];
  allFeatures: any[];
  canGoBack?: boolean;
  backLabel?: string;
  onBack?: () => void;
  onClose: () => void;
  onSelectStep: (stepIndex: number) => void;
  onSelectCountry: (ownerCode: string) => void;
  onOpenOrg: (orgId: string) => void;
  onZoomToCoords?: (coords: [number, number], zoom?: number) => void;
  onSelectTerritoryFeature?: (feature: any) => void;
}

type CountryTab = 'overview' | 'territory' | 'evolution';

function formatArea(km2: number): string {
  if (km2 >= 1_000_000) return `${(km2 / 1_000_000).toFixed(2)}M km²`;
  if (km2 >= 10_000) return `${Math.round(km2 / 1_000).toLocaleString('it-IT')}k km²`;
  if (km2 >= 1_000) return `${(km2 / 1_000).toFixed(1)}k km²`;
  if (km2 > 0) return `${Math.round(km2).toLocaleString('it-IT')} km²`;
  return '—';
}

function formatPop(millions: number): string {
  if (millions >= 100) return `${Math.round(millions).toLocaleString('it-IT')}M`;
  if (millions >= 1) return `${millions.toFixed(1)}M`;
  if (millions >= 0.01) return `${Math.round(millions * 1000).toLocaleString('it-IT')}k`;
  if (millions > 0) return '< 10k';
  return '—';
}

function formatDeltaBadge(pct: number | null) {
  if (pct === null || !Number.isFinite(pct) || Math.abs(pct) < 0.1) return null;
  const positive = pct > 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[10px] font-mono-tech px-1.5 py-0.5 rounded-sm border ${
        positive
          ? 'bg-[#1c3d2d]/70 text-[#86efac] border-[#2e7d52]'
          : 'bg-[#451d22]/70 text-[#fca5a5] border-[#8f3b44]'
      }`}
      title="Variazione rispetto allo step temporale precedente"
    >
      {positive ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
      {positive ? '+' : ''}
      {pct.toFixed(1)}%
    </span>
  );
}

const FLAG_STATUS_LABELS: Record<string, string> = {
  official: 'Bandiera Ufficiale di Stato',
  de_facto: 'Insegna De Facto',
  civil: 'Bandiera Civile / Mercantile',
  war_state: 'Insegna di Stato / Guerra',
};

const FLAG_CATEGORY_LABELS: Record<string, string> = {
  state_and_national: 'Nazionale e di Stato',
  state_war: 'Stato e Guerra',
  civil_merchant: 'Civile / Mercantile',
  transitional: 'Transitoria / D’Occupazione',
};

export const CountryProfileModal: React.FC<CountryProfileModalProps> = ({
  ownerCode,
  currentStep,
  stats,
  allFeatures,
  canGoBack = false,
  backLabel = 'Indietro',
  onBack,
  onClose,
  onSelectStep,
  onSelectCountry,
  onOpenOrg,
  onZoomToCoords,
  onSelectTerritoryFeature,
}) => {
  const [activeTab, setActiveTab] = useState<CountryTab>('overview');
  const [lightboxSlot, setLightboxSlot] = useState<'primary' | 'secondary' | null>(null);

  const profile: CountryProfileData | null = useMemo(() => {
    if (!ownerCode) return null;
    return buildCountryProfile(ownerCode, currentStep, stats, allFeatures);
  }, [ownerCode, currentStep, stats, allFeatures]);

  if (!ownerCode || !profile) return null;

  const stepInfo = STEPS[currentStep] || STEPS[0];
  const factionColor = FACTION_COLORS[profile.faction] || '#c9a557';

  // Compute SVG chart scales for Tab 3 (Area + Pop across 0..STEPS.length - 1)
  const chartWidth = 680;
  const chartHeight = 165;
  const padX = 28;
  const padY = 18;
  const plotW = chartWidth - padX * 2;
  const plotH = chartHeight - padY * 2;
  const maxAreaSeries = Math.max(1, ...profile.timelineSeries.map((pt) => pt.areaKm2));
  const maxPopSeries = Math.max(0.01, ...profile.timelineSeries.map((pt) => pt.popMillions));
  const lastIdx = Math.max(1, profile.timelineSeries.length - 1);

  const areaPoints = profile.timelineSeries.map((pt, i) => {
    const x = padX + (i / lastIdx) * plotW;
    const y = padY + plotH - (pt.areaKm2 / maxAreaSeries) * plotH;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const popPoints = profile.timelineSeries.map((pt, i) => {
    const x = padX + (i / lastIdx) * plotW;
    const y = padY + plotH - (pt.popMillions / maxPopSeries) * plotH;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const curChartX = padX + (currentStep / lastIdx) * plotW;

  return (
    <div
      className="fixed inset-0 z-[55] flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-150"
      onClick={() => {
        tacticalAudio.playClick();
        onClose();
      }}
    >
      <div
        className="tactical-panel w-full max-w-[960px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden bg-[#101419]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header Bar */}
        <div className="panel-title justify-between flex-none bg-[#12171d] border-b border-[#3a3420]">
          <div className="flex items-center gap-2 min-w-0">
            {canGoBack && onBack && (
              <button
                onClick={() => {
                  tacticalAudio.playClick();
                  onBack();
                }}
                className="px-2 py-0.5 border border-[#6a5a2f] bg-black/40 hover:bg-[#c9a557]/20 text-[#e8c979] hover:text-white text-[10.5px] font-oswald tracking-wider uppercase flex items-center gap-1 transition-colors flex-none"
                title={backLabel}
              >
                <ArrowLeft className="h-3 w-3" />
                <span>{backLabel}</span>
              </button>
            )}
            <Flag className="h-3.5 w-3.5 text-[#e8c979] flex-none" />
            <span className="truncate">COUNTRY VIZ · SCHEDA STATUALE</span>
            <span className="hidden sm:inline font-mono-tech text-[10px] text-[#c9a557] px-1.5 py-0.5 bg-black/50 border border-[#3a3420] rounded">
              {profile.code}
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-none">
            {/* Step Scrubber right inside Country Viz */}
            <div className="flex items-center border border-[#4a4128] bg-black/50 rounded-sm overflow-hidden">
              <button
                disabled={currentStep <= 0}
                onClick={() => {
                  tacticalAudio.playClick();
                  onSelectStep(Math.max(0, currentStep - 1));
                }}
                className="p-1 text-[#c9a557] hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Step precedente"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="px-2 font-oswald text-[11px] font-bold tracking-[1px] text-[#e8c979] min-w-[68px] text-center">
                {stepInfo.d}
              </span>
              <button
                disabled={currentStep >= STEPS.length - 1}
                onClick={() => {
                  tacticalAudio.playClick();
                  onSelectStep(Math.min(STEPS.length - 1, currentStep + 1));
                }}
                className="p-1 text-[#c9a557] hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title="Step successivo"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {profile.primaryFocusCoords && onZoomToCoords && (
              <button
                onClick={() => {
                  tacticalAudio.playClick();
                  onZoomToCoords(profile.primaryFocusCoords!, 4.2);
                  onClose();
                }}
                className="px-2 py-0.5 border border-[#8a7440] text-[#e8c979] hover:text-white hover:bg-[#c9a557]/20 text-[10.5px] font-oswald tracking-wider uppercase flex items-center gap-1 transition-colors"
                title="Centra la mappa sullo Stato"
              >
                <Crosshair className="h-3 w-3" />
                <span className="hidden sm:inline">Mappa</span>
              </button>
            )}

            <button
              onClick={() => {
                tacticalAudio.playClick();
                onClose();
              }}
              className="h-6 w-6 flex items-center justify-center border border-[#8a7440] text-[#e8c979] hover:text-white hover:border-[#c9a557] transition-colors"
              title="Chiudi scheda Stato (Esc)"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Country Hero Banner */}
        <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#141920] via-[#12161b] to-[#0f1318] border-b border-[#3a3420] flex-none">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Framed Flag Showcase (1 riquadro = 1 bandiera; 2 riquadri separati per co-esposizione; click = zoom >= 1/5 schermo) */}
            {(() => {
              const heroSecondary = getSecondaryCoFlag(profile.code, currentStep, {
                displayFlagCode: profile.displayFlagCode,
              });
              const boxSizeClass = heroSecondary
                ? 'w-28 sm:w-32 h-20 sm:h-22'
                : 'w-36 sm:w-44 h-24 sm:h-28';
              return (
                <>
                  <div className="flex items-center gap-2.5 flex-none">
                    <button
                      type="button"
                      onClick={() => {
                        tacticalAudio.playClick();
                        setLightboxSlot('primary');
                      }}
                      title="Clicca per ingrandire e ispezionare i dettagli del vessillo"
                      aria-label={`Ingrandisci bandiera di ${profile.officialName}`}
                      className={`group relative ${boxSizeClass} rounded-[2px] overflow-hidden border-2 border-[#c9a557]/80 hover:border-[#f4ebd0] shadow-[0_6px_22px_rgba(0,0,0,0.85)] bg-black/75 flex items-center justify-center p-1 cursor-zoom-in transition-all focus:outline-none focus:ring-2 focus:ring-[#e8c979]`}
                    >
                      <CountryFlag
                        owner={profile.displayFlagCode}
                        step={currentStep}
                        className="w-full h-full [&_svg]:w-full [&_svg]:h-full [&_svg]:object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                      />
                      <span className="pointer-events-none absolute top-1 left-1 px-1 py-0.5 bg-black/80 border border-[#6a5a2f] text-[#e8c979] rounded-[1px] opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-0.5 text-[8.5px] font-mono-tech">
                        <ZoomIn className="h-2.5 w-2.5" />
                        <span>Zoom</span>
                      </span>
                      <span
                        className="absolute bottom-1 right-1 px-1.5 py-0.2 bg-black/80 border border-[#6a5a2f] text-[9px] font-mono-tech text-[#e8c979] rounded-[1px]"
                        title="Colore cartografico assegnato allo Stato"
                      >
                        <span
                          className="inline-block w-2 h-2 rounded-full mr-1 align-middle border border-white/30"
                          style={{ backgroundColor: profile.meta.c }}
                        />
                        {profile.code}
                      </span>
                    </button>
                    {heroSecondary && (
                      <button
                        type="button"
                        onClick={() => {
                          tacticalAudio.playClick();
                          setLightboxSlot('secondary');
                        }}
                        className={`group relative ${boxSizeClass} rounded-[2px] overflow-hidden border-2 border-[#c9a557]/70 hover:border-[#f4ebd0] shadow-[0_6px_22px_rgba(0,0,0,0.85)] bg-black/75 flex items-center justify-center p-1 cursor-zoom-in transition-all focus:outline-none focus:ring-2 focus:ring-[#e8c979]`}
                        title={`${heroSecondary.title} — Clicca per ingrandire`}
                        aria-label={`Ingrandisci bandiera secondaria: ${heroSecondary.title}`}
                      >
                        <CountryFlag
                          owner={heroSecondary.code}
                          step={currentStep}
                          className="w-full h-full [&_svg]:w-full [&_svg]:h-full [&_svg]:object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                        />
                        <span className="pointer-events-none absolute top-1 left-1 px-1 py-0.5 bg-black/80 border border-[#6a5a2f] text-[#e8c979] rounded-[1px] opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-0.5 text-[8.5px] font-mono-tech">
                          <ZoomIn className="h-2.5 w-2.5" />
                        </span>
                      </button>
                    )}
                    {profile.autonomousFlagTitle && (
                      <div className="text-[10px] font-mono-tech text-[#c9a557] max-w-[110px] leading-snug border-l border-[#3a3420] pl-2">
                        {profile.autonomousFlagTitle}
                      </div>
                    )}
                  </div>
                  {lightboxSlot && (
                    <FlagLightboxModal
                      primary={{
                        code: profile.displayFlagCode,
                        label: `Principale (${profile.code})`,
                        title: profile.flagMeta?.historical_name_at_date || profile.officialName,
                      }}
                      secondary={
                        heroSecondary
                          ? {
                              code: heroSecondary.code,
                              label: 'Co-Bandiera',
                              title: heroSecondary.title,
                            }
                          : null
                      }
                      initialSlot={lightboxSlot}
                      currentStep={currentStep}
                      countryName={profile.officialName}
                      flagStatusLabels={FLAG_STATUS_LABELS}
                      flagCategoryLabels={FLAG_CATEGORY_LABELS}
                      onSelectMapStep={onSelectStep}
                      onClose={() => setLightboxSlot(null)}
                    />
                  )}
                </>
              );
            })()}

            {/* Country Core Identity, State Form & Leadership */}
            <div className="flex-1 min-w-0 space-y-2">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-oswald text-xl sm:text-2xl font-bold text-[#f4ebd0] tracking-[0.6px] leading-tight">
                    {profile.officialName}
                  </h2>
                </div>
                {profile.meta.shortName && (
                  <div className="text-[11px] font-mono-tech text-[#8b9298] mt-0.5">
                    Entità canonica: <span className="text-[#cfd3d6]">{profile.meta.shortName}</span> · Situazione al{' '}
                    <span className="text-[#e8c979]">{stepInfo.d}</span> ({stepInfo.t})
                  </div>
                )}
              </div>

              {/* Badges Row: Forma di Stato + Status + Fazione */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10.5px] font-semibold bg-[#c9a557]/15 text-[#f0e6c8] border border-[#8a7440]/80 rounded-[2px]">
                  <Shield className="h-3 w-3 text-[#e8c979]" />
                  <span>{profile.stateForm.regimeType}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10.5px] font-mono-tech bg-black/50 text-[#c9a557] border border-[#3a3420] rounded-[2px]">
                  <Crown className="h-3 w-3 text-[#c9a557]" />
                  <span>{profile.hierarchyBadge || profile.stateForm.tierLabel}</span>
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10.5px] font-oswald font-semibold tracking-[0.8px] uppercase bg-black/55 border rounded-[2px]"
                  style={{ borderColor: factionColor, color: factionColor }}
                  title={profile.factionChronoLabel.full}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: factionColor }} />
                  {profile.factionChronoLabel.short}
                </span>
              </div>

              {/* Leader & Capital Strip */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 pt-1 border-t border-[#3a3420]/60 text-[11.5px]">
                <div className="flex items-start gap-1.5 text-[#cfd3d6] min-w-0">
                  <User className="h-3.5 w-3.5 text-[#c9a557] flex-none mt-0.5" />
                  <span className="leading-snug">
                    <b className="text-[#8b9298] font-normal mr-1">Governo/Leadership:</b>
                    {profile.meta.leader || 'Amministrazione ordinaria d’epoca'}
                  </span>
                </div>
                <div className="flex items-start gap-1.5 text-[#cfd3d6] min-w-0">
                  <Landmark className="h-3.5 w-3.5 text-[#c9a557] flex-none mt-0.5" />
                  <span className="leading-snug">
                    <b className="text-[#8b9298] font-normal mr-1">Capitale / Sede:</b>
                    {profile.meta.capital ||
                      profile.cities.find((c) => c.isCapital)?.name ||
                      '—'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#3a3420] bg-[#0e1217] px-3 sm:px-4 gap-1 flex-none">
          {[
            { id: 'overview' as CountryTab, label: 'Panoramica, Governo & KPI', Icon: Activity },
            {
              id: 'territory' as CountryTab,
              label: `Territorio & Sfera (${profile.kpis.provincesCount}${profile.subjects.length > 0 ? ` + ${profile.subjects.length} dip.` : ''})`,
              Icon: Layers,
            },
            {
              id: 'evolution' as CountryTab,
              label: `Evoluzione 1936–${STEPS[STEPS.length - 1]?.d.slice(-4) || '1954'} (${profile.transitions.length})`,
              Icon: Flag,
            },
          ].map(({ id, label, Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => {
                  tacticalAudio.playClick();
                  setActiveTab(id);
                }}
                className={`px-3 py-2 text-[11px] font-oswald tracking-[1px] uppercase flex items-center gap-1.5 border-b-2 transition-colors ${
                  active
                    ? 'border-[#e8c979] text-[#f4ebd0] bg-[#c9a557]/10'
                    : 'border-transparent text-[#8b9298] hover:text-[#cfd3d6] hover:bg-white/5'
                }`}
              >
                <Icon className="h-3.5 w-3.5 text-[#c9a557]" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-4 custom-scrollbar text-xs">
          {/* TAB 1: OVERVIEW & KPI */}
          {activeTab === 'overview' && (
            <>
              {/* 4 KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                {/* Area */}
                <div className="border border-[#3a3420] bg-black/40 p-3 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono-tech uppercase text-[#8b9298]">
                    <span>Superficie</span>
                    {profile.kpis.globalAreaRank && (
                      <span className="text-[#c9a557]">#{profile.kpis.globalAreaRank} Mondo</span>
                    )}
                  </div>
                  <div className="font-oswald text-xl font-bold text-[#e8c979] leading-tight">
                    {formatArea(profile.kpis.areaKm2)}
                  </div>
                  <div className="flex items-center justify-between gap-1 pt-0.5">
                    <span className="text-[10.5px] font-mono-tech text-[#8b9298]">
                      {profile.kpis.areaGlobalPct.toFixed(1)}% terre emerse
                    </span>
                    {formatDeltaBadge(profile.kpis.deltaAreaPct)}
                  </div>
                </div>

                {/* Population */}
                <div className="border border-[#3a3420] bg-black/40 p-3 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono-tech uppercase text-[#8b9298]">
                    <span>Popolazione</span>
                    {profile.kpis.globalPopRank && (
                      <span className="text-[#c9a557]">#{profile.kpis.globalPopRank} Mondo</span>
                    )}
                  </div>
                  <div className="font-oswald text-xl font-bold text-[#7ec97e] leading-tight">
                    {formatPop(profile.kpis.popMillions)}
                  </div>
                  <div className="flex items-center justify-between gap-1 pt-0.5">
                    <span className="text-[10.5px] font-mono-tech text-[#8b9298]">
                      {profile.kpis.popGlobalPct.toFixed(1)}% pop. mondiale
                    </span>
                    {formatDeltaBadge(profile.kpis.deltaPopPct)}
                  </div>
                </div>

                {/* Density & Admin Divisions */}
                <div className="border border-[#3a3420] bg-black/40 p-3 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono-tech uppercase text-[#8b9298]">
                    <span>Densità & Unità</span>
                    <Users className="h-3 w-3 text-[#c9a557]" />
                  </div>
                  <div className="font-oswald text-xl font-bold text-[#f0e6c8] leading-tight">
                    {profile.kpis.densityPerKm2 > 0
                      ? `${profile.kpis.densityPerKm2.toFixed(1)} ab/km²`
                      : '—'}
                  </div>
                  <div className="text-[10.5px] font-mono-tech text-[#8b9298] pt-0.5">
                    {profile.kpis.provincesCount}{' '}
                    {profile.kpis.provincesCount === 1 ? 'provincia/unità ADM1' : 'province/unità ADM1'}
                  </div>
                </div>

                {/* Cities & Diplomacy */}
                <div className="border border-[#3a3420] bg-black/40 p-3 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono-tech uppercase text-[#8b9298]">
                    <span>Centri & Org. Int.</span>
                    <Globe className="h-3 w-3 text-[#c9a557]" />
                  </div>
                  <div className="font-oswald text-xl font-bold text-[#7dd3fc] leading-tight">
                    {profile.kpis.citiesCount}{' '}
                    <span className="text-sm font-normal text-[#cfd3d6]">
                      {profile.kpis.citiesCount === 1 ? 'Centro' : 'Centri'}
                    </span>
                  </div>
                  <div className="text-[10.5px] font-mono-tech text-[#8b9298] pt-0.5">
                    {profile.orgs.length}{' '}
                    {profile.orgs.length === 1 ? 'organizzazione attiva' : 'organizzazioni attive'}
                  </div>
                </div>
              </div>

              {/* Combined Empire Banner if this country holds colonies/dominions/subjects */}
              {profile.empireKpis && (
                <div className="border border-[#8a7440]/70 bg-[#c9a557]/10 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="space-y-0.5">
                    <div className="font-oswald text-xs font-bold uppercase tracking-wider text-[#e8c979] flex items-center gap-1.5">
                      <Crown className="h-3.5 w-3.5" />
                      <span>
                        Sfera Imperiale & Possedimenti Aggregati ({profile.empireKpis.subjectsCount} entità subordinate)
                      </span>
                    </div>
                    <div className="text-[11px] text-[#cfd3d6]">
                      Include la madrepatria più colonie, dominion, protettorati o Stati clienti rilevati allo step{' '}
                      <b>{stepInfo.d}</b>.
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-none font-mono-tech text-[11px]">
                    <div>
                      <div className="text-[#8b9298] text-[9.5px] uppercase">Sup. Totale</div>
                      <div className="text-[#e8c979] font-bold">
                        {formatArea(profile.empireKpis.areaKm2)} ({profile.empireKpis.areaGlobalPct.toFixed(1)}%)
                      </div>
                    </div>
                    <div>
                      <div className="text-[#8b9298] text-[9.5px] uppercase">Pop. Totale</div>
                      <div className="text-[#7ec97e] font-bold">
                        {formatPop(profile.empireKpis.popMillions)} ({profile.empireKpis.popGlobalPct.toFixed(1)}%)
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Two-column Institutional & Vexillological Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* Institutional / Government Dossier */}
                <div className="border border-[#3a3420] bg-black/35 p-3 space-y-2">
                  <div className="font-oswald text-xs font-bold uppercase tracking-[1.2px] text-[#e8c979] flex items-center gap-1.5 border-b border-[#3a3420]/70 pb-1.5">
                    <Shield className="h-3.5 w-3.5" />
                    <span>Forma di Stato, Governo & Sovranità</span>
                  </div>
                  <dl className="grid grid-cols-[125px_1fr] gap-y-1.5 gap-x-2 text-[11.5px]">
                    <dt className="text-[#8b9298] font-mono-tech text-[10.5px]">Forma di Stato:</dt>
                    <dd className="text-[#f0e6c8] font-semibold">{profile.stateForm.regimeType}</dd>

                    <dt className="text-[#8b9298] font-mono-tech text-[10.5px]">Classe / Tier:</dt>
                    <dd className="text-[#cfd3d6]">{profile.stateForm.tierLabel}</dd>

                    <dt className="text-[#8b9298] font-mono-tech text-[10.5px]">Allineamento:</dt>
                    <dd style={{ color: factionColor }} className="font-semibold">
                      {profile.factionChronoLabel.full}
                    </dd>

                    <dt className="text-[#8b9298] font-mono-tech text-[10.5px]">Leadership:</dt>
                    <dd className="text-[#cfd3d6]">{profile.meta.leader || '—'}</dd>

                    <dt className="text-[#8b9298] font-mono-tech text-[10.5px]">Capitale:</dt>
                    <dd className="text-[#cfd3d6]">
                      {profile.meta.capital || profile.cities.find((c) => c.isCapital)?.name || '—'}
                    </dd>

                    {profile.overlord && profile.overlord.id && (
                      <>
                        <dt className="text-[#8b9298] font-mono-tech text-[10.5px]">Sovrano / Tutela:</dt>
                        <dd>
                          <button
                            onClick={() => {
                              tacticalAudio.playClick();
                              onSelectCountry(profile.overlord!.id!);
                            }}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-[#6a5a2f] bg-[#c9a557]/10 hover:bg-[#c9a557]/25 text-[#e8c979] text-[11px] rounded-[2px] transition-colors"
                          >
                            <div className="w-4 h-3 overflow-hidden rounded-[1px] border border-[#554d33]">
                              <CountryFlag owner={profile.overlord.id} step={currentStep} className="w-full h-full" />
                            </div>
                            <span>{profile.overlord.shortName || profile.overlord.l(currentStep)}</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </button>
                        </dd>
                      </>
                    )}
                  </dl>
                </div>

                {/* Authentic Vexillology Card */}
                <div className="border border-[#3a3420] bg-black/35 p-3 space-y-2">
                  <div className="font-oswald text-xs font-bold uppercase tracking-[1.2px] text-[#e8c979] flex items-center justify-between gap-2 border-b border-[#3a3420]/70 pb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Flag className="h-3.5 w-3.5" />
                      <span>Scheda Vessillologica Storica</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        tacticalAudio.playClick();
                        setLightboxSlot('primary');
                      }}
                      className="px-2 py-0.5 text-[10px] font-mono-tech bg-[#c9a557]/15 border border-[#c9a557]/60 text-[#f4ebd0] hover:bg-[#c9a557]/30 rounded-[1px] inline-flex items-center gap-1 transition-colors"
                      title="Apri la bandiera ingrandita (>= 1/5 schermo)"
                    >
                      <ZoomIn className="h-3 w-3 text-[#e8c979]" />
                      <span>Ispeziona Vessillo</span>
                    </button>
                  </div>
                  {profile.flagMeta ? (
                    <div className="space-y-1.5 text-[11.5px]">
                      <div className="text-[#f0e6c8] font-semibold">
                        {profile.flagMeta.historical_name_at_date}
                      </div>
                      <div className="flex flex-wrap gap-1.5 text-[10px] font-mono-tech">
                        <span className="px-1.5 py-0.5 bg-black/50 border border-[#3a3420] text-[#c9a557]">
                          {FLAG_STATUS_LABELS[profile.flagMeta.flag_status] || profile.flagMeta.flag_status}
                        </span>
                        <span className="px-1.5 py-0.5 bg-black/50 border border-[#3a3420] text-[#8b9298]">
                          {FLAG_CATEGORY_LABELS[profile.flagMeta.flag_category] || profile.flagMeta.flag_category}
                        </span>
                        <span className="px-1.5 py-0.5 bg-black/50 border border-[#3a3420] text-[#7ec97e]">
                          Validità: {profile.flagMeta.validity_window.valid_from} →{' '}
                          {profile.flagMeta.validity_window.valid_to}
                        </span>
                      </div>
                      <p className="text-[#c8b98a] italic leading-snug">
                        {profile.flagMeta.historical_rationale}
                      </p>
                      <div className="text-[10px] font-mono-tech text-[#8b9298] pt-1 border-t border-[#3a3420]/50 flex flex-wrap items-center justify-between gap-2">
                        <span>
                          Archivio: {profile.flagMeta.asset.source_repository} ({profile.flagMeta.asset.file_name})
                        </span>
                        {profile.flagMeta.wikidata_item_id && (
                          <span className="text-[#c9a557]">Wikidata {profile.flagMeta.wikidata_item_id}</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-[#8b9298] italic">
                      Emblema storico canonico sincronizzato con lo step <b className="text-[#e8c979]">{stepInfo.d}</b>{' '}
                      per il codice entità <b className="text-[#cfd3d6]">{profile.displayFlagCode}</b>.
                    </div>
                  )}
                </div>
              </div>

              {/* International Organizations */}
              {profile.orgs.length > 0 && (
                <div className="border border-[#3a3420] bg-black/30 p-3 space-y-2">
                  <div className="font-oswald text-xs font-bold uppercase tracking-[1.2px] text-[#e8c979] flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5" />
                    <span>Organizzazioni Internazionali & Alleanze al {stepInfo.d}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.orgs.map(({ org, state, role }) => (
                      <button
                        key={org.id}
                        onClick={() => {
                          tacticalAudio.playClick();
                          onOpenOrg(org.id);
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[#473c22] bg-black/50 hover:bg-[#c9a557]/20 hover:border-[#c9a557] text-[#f0e6c8] transition-colors rounded-[2px]"
                        title={`${org.officialName} — ${state.phaseTitle}`}
                      >
                        <span
                          className="w-2 h-2 rounded-full flex-none"
                          style={{ backgroundColor: org.accentColor }}
                        />
                        <span className="font-oswald font-bold text-[11.5px]">{org.acronym}</span>
                        <span className="text-[10px] text-[#8b9298] font-mono-tech">· {role}</span>
                        <span className="text-[9.5px] text-[#c9a557]">({state.statusLabel})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Current Step Operational Context / Battles */}
              {profile.battles.length > 0 && (
                <div className="border border-[#b04540]/60 bg-[#b04540]/10 p-3 space-y-2">
                  <div className="font-oswald text-xs font-bold uppercase tracking-[1.2px] text-[#f0e6c8] flex items-center gap-1.5">
                    <Crosshair className="h-3.5 w-3.5 text-[#d9534f]" />
                    <span>Operazioni & Crisi Rilevanti al {stepInfo.d}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {profile.battles.map((b) => (
                      <div
                        key={b.id}
                        className="border border-[#5a2826] bg-black/40 p-2 space-y-0.5 text-[11px]"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-[#e8c979]">{b.name}</span>
                          {onZoomToCoords && (
                            <button
                              onClick={() => {
                                tacticalAudio.playClick();
                                onZoomToCoords(b.coords, 5.2);
                                onClose();
                              }}
                              className="text-[9.5px] font-mono-tech text-[#c9a557] hover:text-white flex items-center gap-0.5 flex-none"
                            >
                              <MapPin className="h-2.5 w-2.5" /> Zoom
                            </button>
                          )}
                        </div>
                        <div className="text-[10px] text-[#8b9298] font-mono-tech">{b.historicalDate}</div>
                        <div className="text-[#cfd3d6] leading-snug">{b.result}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB 2: TERRITORY & SPHERE */}
          {activeTab === 'territory' && (
            <div className="space-y-4">
              {profile.subjects.length > 0 && (
                <div className="space-y-2">
                  <div className="font-oswald text-xs font-bold uppercase tracking-[1.2px] text-[#e8c979] flex items-center gap-1.5">
                    <Crown className="h-3.5 w-3.5" />
                    <span>Possedimenti, Dominion & Stati Subordinati ({profile.subjects.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {profile.subjects.map((sub) => (
                      <button
                        key={sub.code}
                        onClick={() => {
                          tacticalAudio.playClick();
                          onSelectCountry(sub.code);
                        }}
                        className="text-left border border-[#3a3420] bg-black/40 hover:bg-[#c9a557]/15 hover:border-[#c9a557] p-2.5 flex items-center gap-2.5 transition-colors group"
                      >
                        <div className="w-8 h-5.5 rounded-[1px] overflow-hidden border border-[#6a5a2f] flex-none bg-black/60">
                          <CountryFlag owner={sub.code} step={currentStep} className="w-full h-full" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[11.5px] font-semibold text-[#f0e6c8] group-hover:text-[#e8c979] truncate">
                            {sub.name}
                          </div>
                          <div className="text-[10px] font-mono-tech text-[#8b9298] flex items-center justify-between gap-2">
                            <span className="truncate">{sub.tierLabel}</span>
                            <span className="text-[#c9a557] flex-none">
                              {formatArea(sub.areaKm2)} · {formatPop(sub.popMillions)}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* Controlled Provinces */}
                <div className="border border-[#3a3420] bg-black/35 p-3 space-y-2">
                  <div className="font-oswald text-xs font-bold uppercase tracking-[1.2px] text-[#e8c979] flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5" />
                      Principali Territori & Province Controllate
                    </span>
                    <span className="text-[10px] font-mono-tech text-[#8b9298]">
                      Tot: {profile.kpis.provincesCount}
                    </span>
                  </div>
                  {profile.topTerritories.length === 0 ? (
                    <div className="text-[#8b9298] italic py-2">
                      Nessuna provincia territoriale attiva al {stepInfo.d}.
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5 border border-[#2c2a20] bg-black/25 max-h-[260px] overflow-y-auto custom-scrollbar">
                      {profile.topTerritories.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            tacticalAudio.playClick();
                            if (onSelectTerritoryFeature) onSelectTerritoryFeature(t.featureRef);
                            if (t.centroid && onZoomToCoords) onZoomToCoords(t.centroid, 4.8);
                            onClose();
                          }}
                          className="w-full text-left px-2.5 py-1.5 hover:bg-[#c9a557]/15 flex items-center justify-between gap-2 transition-colors group"
                        >
                          <div className="min-w-0">
                            <div className="text-[11.5px] text-[#f0e6c8] group-hover:text-[#e8c979] font-medium truncate">
                              {t.name}
                            </div>
                            {t.adminEntity && (
                              <div className="text-[10px] text-[#8b9298] font-mono-tech truncate">
                                {t.adminEntity}
                              </div>
                            )}
                          </div>
                          <span className="text-[10.5px] font-mono-tech text-[#c9a557] flex-none">
                            {formatArea(t.areaKm2)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Controlled Cities */}
                <div className="border border-[#3a3420] bg-black/35 p-3 space-y-2">
                  <div className="font-oswald text-xs font-bold uppercase tracking-[1.2px] text-[#e8c979] flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      Capitali & Centri Strategici
                    </span>
                    <span className="text-[10px] font-mono-tech text-[#8b9298]">
                      Tot: {profile.cities.length}
                    </span>
                  </div>
                  {profile.cities.length === 0 ? (
                    <div className="text-[#8b9298] italic py-2">
                      Nessun centro strategico censito sotto questo controllo allo step {stepInfo.d}.
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5 border border-[#2c2a20] bg-black/25 max-h-[260px] overflow-y-auto custom-scrollbar">
                      {profile.cities.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            tacticalAudio.playClick();
                            if (onZoomToCoords) onZoomToCoords(c.coords, 5.4);
                            onClose();
                          }}
                          className="w-full text-left px-2.5 py-1.5 hover:bg-[#c9a557]/15 flex items-center justify-between gap-2 transition-colors group"
                        >
                          <div className="min-w-0">
                            <div className="text-[11.5px] text-[#f0e6c8] group-hover:text-[#e8c979] font-medium flex items-center gap-1.5 truncate">
                              {c.isCapital && (
                                <span className="px-1 py-0.2 bg-[#c9a557]/25 border border-[#8a7440] text-[#e8c979] text-[9px] font-mono-tech uppercase rounded-[1px]">
                                  Capitale
                                </span>
                              )}
                              <span className="truncate">{c.historicalName}</span>
                            </div>
                          </div>
                          <Crosshair className="h-3 w-3 text-[#8a7440] group-hover:text-[#e8c979] flex-none" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CHRONOLOGICAL EVOLUTION 1936-1954 */}
          {activeTab === 'evolution' && (
            <div className="space-y-4">
              {/* Dual-Series SVG Chart */}
              <div className="border border-[#3a3420] bg-black/40 p-3 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-oswald text-xs font-bold uppercase tracking-[1.2px] text-[#e8c979]">
                    Traiettoria Storica Superficie & Popolazione (1936–{STEPS[STEPS.length - 1]?.d.slice(-4)})
                  </div>
                  <div className="flex items-center gap-3 text-[10.5px] font-mono-tech">
                    <span className="inline-flex items-center gap-1 text-[#e8c979]">
                      <span className="w-2.5 h-0.5 bg-[#e8c979]" /> Superficie ({formatArea(profile.kpis.areaKm2)})
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#7ec97e]">
                      <span className="w-2.5 h-0.5 bg-[#7ec97e]" /> Popolazione ({formatPop(profile.kpis.popMillions)})
                    </span>
                  </div>
                </div>

                <div className="w-full overflow-x-auto">
                  <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="w-full min-w-[540px] h-40 select-none"
                  >
                    {/* Grid lines */}
                    {[0.25, 0.5, 0.75, 1].map((frac) => {
                      const y = padY + plotH - frac * plotH;
                      return (
                        <line
                          key={frac}
                          x1={padX}
                          y1={y}
                          x2={chartWidth - padX}
                          y2={y}
                          stroke="#2b2619"
                          strokeDasharray="3 3"
                          strokeWidth="1"
                        />
                      );
                    })}

                    {/* Current Step Cursor */}
                    <line
                      x1={curChartX}
                      y1={padY - 4}
                      x2={curChartX}
                      y2={padY + plotH + 4}
                      stroke="#e8c979"
                      strokeWidth="1.5"
                      strokeDasharray="3 2"
                    />

                    {/* Area polyline */}
                    <polyline
                      fill="none"
                      stroke="#e8c979"
                      strokeWidth="2.2"
                      points={areaPoints.join(' ')}
                    />
                    {/* Population polyline */}
                    <polyline
                      fill="none"
                      stroke="#7ec97e"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                      points={popPoints.join(' ')}
                    />

                    {/* Interactive step nodes */}
                    {profile.timelineSeries.map((pt, i) => {
                      const x = padX + (i / lastIdx) * plotW;
                      const yArea = padY + plotH - (pt.areaKm2 / maxAreaSeries) * plotH;
                      const isCur = i === currentStep;
                      return (
                        <g
                          key={pt.step}
                          className="cursor-pointer"
                          onClick={() => {
                            tacticalAudio.playClick();
                            onSelectStep(i);
                          }}
                        >
                          <circle
                            cx={x}
                            cy={yArea}
                            r={isCur ? 4.5 : 2.8}
                            fill={isCur ? '#fde047' : '#e8c979'}
                            stroke="#0c1014"
                            strokeWidth="1"
                          />
                          <title>{`${pt.dateLabel}: ${formatArea(pt.areaKm2)} · ${formatPop(pt.popMillions)}`}</title>
                        </g>
                      );
                    })}

                    {/* Axis Endpoints */}
                    <text x={padX} y={chartHeight - 3} fill="#8b9298" fontSize="9.5" fontFamily="monospace">
                      {STEPS[0]?.d}
                    </text>
                    <text
                      x={chartWidth - padX}
                      y={chartHeight - 3}
                      fill="#8b9298"
                      fontSize="9.5"
                      fontFamily="monospace"
                      textAnchor="end"
                    >
                      {STEPS[STEPS.length - 1]?.d}
                    </text>
                  </svg>
                </div>
              </div>

              {/* Key Regime & Flag Transitions */}
              <div className="space-y-2">
                <div className="font-oswald text-xs font-bold uppercase tracking-[1.2px] text-[#e8c979]">
                  Svolte Storiche: Bandiera, Forma di Stato & Fazione
                </div>
                <div className="divide-y divide-white/5 border border-[#3a3420] bg-black/30">
                  {profile.transitions.map((tr) => {
                    const isCur = tr.step === currentStep;
                    const trFacColor = FACTION_COLORS[tr.faction] || '#ccc';
                    return (
                      <button
                        key={tr.step}
                        onClick={() => {
                          tacticalAudio.playClick();
                          onSelectStep(tr.step);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-white/5 transition-colors ${
                          isCur ? 'bg-[#c9a557]/15 outline outline-1 outline-[#8a7440]' : ''
                        }`}
                      >
                        <div className="w-8 h-5.5 rounded-[1px] overflow-hidden border border-[#6a5a2f] flex-none bg-black/60">
                          <CountryFlag owner={profile.code} step={tr.step} className="w-full h-full" />
                        </div>
                        <span className="w-[70px] flex-none font-oswald font-bold text-xs text-[#e8c979]">
                          {tr.dateLabel}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="text-[11.5px] font-semibold text-[#f0e6c8] truncate">
                            {tr.label}
                          </div>
                          <div className="text-[10px] font-mono-tech text-[#8b9298] flex flex-wrap gap-2">
                            <span className="text-[#c9a557]">{tr.reason}</span>
                            <span>· {tr.tierLabel}</span>
                          </div>
                        </div>
                        <span
                          className="text-[10px] font-oswald font-semibold uppercase tracking-wider flex-none"
                          style={{ color: trFacColor }}
                        >
                          {tr.faction}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
