import React, { useEffect, useMemo, useState } from 'react';
import {
  X,
  Landmark,
  Search,
  Users,
  Scale,
  Clock,
  MapPin,
  FileText,
  ArrowRight,
  Building2,
  ShieldAlert,
  CheckCircle2,
  Hourglass,
  Ban,
} from 'lucide-react';
import { StatsStep } from '../types';
import { STEPS } from '../data/historySteps';
import { getOwnerMeta } from '../data/owners';
import { CountryFlag } from '../data/historicalFlags';
import { tacticalAudio } from '../data/audioSynthesizer';
import {
  INTERNATIONAL_ORGANIZATIONS,
  InternationalOrganization,
  OrgCategory,
  OrgLifecycleStatus,
  computeOrgLiveMetrics,
  getOrgStateAtStep,
} from '../data/internationalOrganizations';

interface InternationalOrgsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  stats: StatsStep[];
  initialOrgId?: string | null;
  onSelectStep: (stepIndex: number) => void;
  onOpenCountry?: (ownerCode: string) => void;
}

type CategoryFilter = 'all' | OrgCategory;
type InspectorTab = 'overview' | 'members' | 'timeline';

function formatAreaCompact(km2: number): string {
  if (km2 >= 1_000_000) return `${(km2 / 1_000_000).toFixed(1)}M km²`;
  if (km2 >= 10_000) return `${Math.round(km2 / 1_000)}k km²`;
  if (km2 >= 1_000) return `${(km2 / 1_000).toFixed(1)}k km²`;
  return `${Math.round(km2)} km²`;
}

function formatPopCompact(millions: number): string {
  if (millions >= 10) return `${Math.round(millions)}M ab.`;
  if (millions >= 1) return `${millions.toFixed(1)}M ab.`;
  if (millions >= 0.01) return `${Math.round(millions * 1000)}k ab.`;
  return '< 10k ab.';
}

function getStatusBadgeStyle(status: OrgLifecycleStatus): {
  bg: string;
  text: string;
  border: string;
  Icon: React.FC<{ className?: string }>;
} {
  switch (status) {
    case 'active':
      return {
        bg: 'bg-[#1f4d36]/75',
        text: 'text-[#86efac]',
        border: 'border-[#2e7d52]',
        Icon: CheckCircle2,
      };
    case 'forming':
      return {
        bg: 'bg-[#5c4518]/75',
        text: 'text-[#fde047]',
        border: 'border-[#a17822]',
        Icon: Hourglass,
      };
    case 'crisis':
      return {
        bg: 'bg-[#6b2f16]/75',
        text: 'text-[#fdba74]',
        border: 'border-[#c25927]',
        Icon: ShieldAlert,
      };
    case 'dissolved':
      return {
        bg: 'bg-[#3f2024]/75',
        text: 'text-[#fca5a5]',
        border: 'border-[#8f3b44]',
        Icon: Ban,
      };
    default:
      return {
        bg: 'bg-[#1a222d]/80',
        text: 'text-[#94a3b8]',
        border: 'border-[#334155]',
        Icon: Clock,
      };
  }
}

const STATUS_SORT_WEIGHT: Record<OrgLifecycleStatus, number> = {
  active: 0,
  forming: 1,
  crisis: 2,
  dissolved: 3,
  inactive: 4,
};

export const InternationalOrgsModal: React.FC<InternationalOrgsModalProps> = ({
  isOpen,
  onClose,
  currentStep,
  stats,
  initialOrgId,
  onSelectStep,
  onOpenCountry,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [onlyActive, setOnlyActive] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedOrgId, setSelectedOrgId] = useState<string>('sdn');
  const [inspectorTab, setInspectorTab] = useState<InspectorTab>('overview');

  useEffect(() => {
    if (!isOpen) return;
    if (initialOrgId && INTERNATIONAL_ORGANIZATIONS.some((o) => o.id === initialOrgId)) {
      setSelectedOrgId(initialOrgId);
      setCategoryFilter('all');
      setOnlyActive(false);
    } else if (currentStep >= 25) {
      setSelectedOrgId((prev) => (prev === 'sdn' ? 'ceca' : prev));
    } else if (currentStep >= 18) {
      setSelectedOrgId((prev) => (prev === 'sdn' ? 'onu' : prev));
    }
  }, [isOpen, initialOrgId, currentStep]);

  const enrichedList = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INTERNATIONAL_ORGANIZATIONS.map((org) => ({
      org,
      state: getOrgStateAtStep(org, currentStep),
    }))
      .filter(({ org, state }) => {
        if (categoryFilter !== 'all' && org.category !== categoryFilter) return false;
        if (onlyActive && (state.status === 'inactive' || state.status === 'dissolved')) return false;
        if (!q) return true;
        const hay = `${org.acronym} ${org.name} ${org.officialName} ${org.headquarters} ${org.treaty} ${state.phaseTitle}`.toLowerCase();
        return hay.includes(q);
      })
      .sort((a, b) => STATUS_SORT_WEIGHT[a.state.status] - STATUS_SORT_WEIGHT[b.state.status]);
  }, [categoryFilter, onlyActive, query, currentStep]);

  const activeSelection = useMemo(() => {
    const exact = INTERNATIONAL_ORGANIZATIONS.find((o) => o.id === selectedOrgId);
    if (exact) return exact;
    return enrichedList[0]?.org || INTERNATIONAL_ORGANIZATIONS[0];
  }, [selectedOrgId, enrichedList]);

  const activeState = useMemo(
    () => getOrgStateAtStep(activeSelection, currentStep),
    [activeSelection, currentStep]
  );

  const stepStats = stats[currentStep];
  const liveMetrics = useMemo(
    () => computeOrgLiveMetrics(activeState.activeMembers, stepStats?.ownPop, stepStats?.ownArea),
    [activeState.activeMembers, stepStats]
  );

  if (!isOpen) return null;

  const stepInfo = STEPS[currentStep] || STEPS[0];
  const statusStyle = getStatusBadgeStyle(activeState.status);
  const StatusIcon = statusStyle.Icon;

  const eraPresets = [
    { label: '1936 SdN', step: 0 },
    { label: '1945 ONU', step: 18 },
    { label: '1948 OECE/OSA', step: 21 },
    { label: '1949 NATO/CdE', step: 23 },
    { label: '1950 CECA', step: 25 },
  ];

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'Tutte (14)' },
    { id: 'universal', label: 'Universali' },
    { id: 'europe', label: 'Europa & CECA' },
    { id: 'security', label: 'Sicurezza & Blocchi' },
    { id: 'regional', label: 'Economia & Regionali' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="tactical-panel w-full max-w-5xl h-[88vh] max-h-[840px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150 text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="panel-title justify-between py-2.5 px-3.5 border-b border-[#5a4a24]">
          <div className="flex items-center gap-2.5 min-w-0">
            <Landmark className="h-4 w-4 text-[#e8c979] flex-none" />
            <span className="truncate tracking-[2px]">
              OSSERVATORIO ORGANIZZAZIONI INTERNAZIONALI
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 bg-[#c9a557]/20 border border-[#8a7440] text-[#e8c979] font-mono-tech text-[10px] rounded-sm">
              SITUAZIONE AL {stepInfo.d}
            </span>
          </div>

          <button
            onClick={() => {
              tacticalAudio.playClick();
              onClose();
            }}
            title="Chiudi (Esc)"
            className="h-6 w-6 flex items-center justify-center border border-[#8a7440] text-[#e8c979] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Filter Bar + Historical Era Quick-Jump */}
        <div className="bg-[#09121d] border-b border-[#3a3420] px-3.5 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  tacticalAudio.playClick();
                  setCategoryFilter(cat.id);
                }}
                className={`px-2 py-1 text-[10.5px] font-oswald uppercase tracking-wider border transition-colors ${
                  categoryFilter === cat.id
                    ? 'bg-[#c9a557]/25 border-[#c9a557] text-[#f0e6c8]'
                    : 'bg-black/30 border-[#2f2b1c] text-[#8b9298] hover:text-[#cfd3d6] hover:border-[#5a4e2f]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search input */}
            <div className="relative">
              <Search className="h-3 w-3 text-[#8b9298] absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cerca SdN, CECA, ONU, sede..."
                className="bg-black/45 border border-[#3a3420] focus:border-[#c9a557] outline-none text-[#e6d9ae] placeholder:text-[#5c6268] pl-6 pr-2 py-1 text-[11px] w-[170px] sm:w-[200px]"
              />
            </div>

            {/* Only Active Toggle */}
            <button
              onClick={() => {
                tacticalAudio.playClick();
                setOnlyActive((v) => !v);
              }}
              className={`px-2 py-1 text-[10.5px] font-semibold border transition-colors ${
                onlyActive
                  ? 'bg-[#1f4d36]/60 border-[#2e7d52] text-[#86efac]'
                  : 'bg-black/30 border-[#2f2b1c] text-[#8b9298] hover:text-[#cfd3d6]'
              }`}
            >
              {onlyActive ? '✓ Solo attive' : 'Solo attive'}
            </button>

            {/* Quick historical era jump pills */}
            <div className="hidden lg:flex items-center gap-1 pl-1 border-l border-[#3a3420]">
              <span className="text-[9.5px] uppercase tracking-wider text-[#6e7781] mr-0.5">Era:</span>
              {eraPresets.map((ep) => (
                <button
                  key={ep.label}
                  onClick={() => {
                    tacticalAudio.playClick();
                    onSelectStep(ep.step);
                  }}
                  className={`px-1.5 py-0.5 text-[10px] font-mono-tech border transition-colors ${
                    currentStep === ep.step
                      ? 'bg-[#c9a557]/30 border-[#e8c979] text-[#e8c979]'
                      : 'bg-black/30 border-[#2b291f] text-[#8b9298] hover:text-white'
                  }`}
                >
                  {ep.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Dual-Pane Body */}
        <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
          {/* Left Master List */}
          <div className="w-full md:w-[320px] lg:w-[350px] flex-none border-b md:border-b-0 md:border-r border-[#3a3420] bg-[#08101a]/90 overflow-y-auto custom-scrollbar max-h-[210px] md:max-h-none divide-y divide-[#1f2630]">
            {enrichedList.length === 0 ? (
              <div className="p-6 text-center text-[#8b9298]">
                Nessuna organizzazione corrisponde ai filtri per lo step <b>{stepInfo.d}</b>.
              </div>
            ) : (
              enrichedList.map(({ org, state }) => {
                const isSelected = org.id === activeSelection.id;
                const badge = getStatusBadgeStyle(state.status);
                const BIcon = badge.Icon;
                const isPresent = state.status !== 'inactive' && state.status !== 'dissolved';

                return (
                  <button
                    key={org.id}
                    onClick={() => {
                      tacticalAudio.playClick();
                      setSelectedOrgId(org.id);
                    }}
                    className={`w-full text-left px-3 py-2.5 transition-colors relative flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-[#c9a557]/15 border-l-[3px] border-l-[#e8c979]'
                        : 'hover:bg-white/[0.04] border-l-[3px] border-l-transparent'
                    } ${!isPresent ? 'opacity-70' : ''}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span
                          className="w-2 h-2 rounded-full flex-none"
                          style={{ backgroundColor: org.accentColor }}
                        />
                        <span className="font-oswald font-bold text-[12.5px] tracking-wider text-[#f0e6c8] truncate">
                          {org.acronym}
                        </span>
                        <span className="text-[10px] text-[#7c858e] truncate hidden sm:inline">
                          · {org.categoryLabel}
                        </span>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[9.5px] font-semibold border rounded-sm flex-none ${badge.bg} ${badge.text} ${badge.border}`}
                      >
                        <BIcon className="h-2.5 w-2.5" />
                        {state.statusLabel}
                      </span>
                    </div>

                    <div className="text-[11.5px] font-medium text-[#cfd3d6] leading-tight truncate">
                      {org.name}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#7c858e] font-mono-tech">
                      <span className="truncate pr-2">{org.headquarters.split('→')[0].trim()}</span>
                      {isPresent && (
                        <span className="text-[#c9a557] flex-none">
                          {state.activeMembers.length} membri
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right Detailed Inspector */}
          <div className="flex-1 min-w-0 overflow-y-auto custom-scrollbar p-3.5 sm:p-4 space-y-3.5 bg-[#0b1521]">
            {/* Hero Banner */}
            <div className="border border-[#473c22] bg-black/35 p-3 space-y-2.5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="px-2 py-0.5 text-[10px] font-oswald font-bold uppercase tracking-widest text-black rounded-sm"
                      style={{ backgroundColor: activeSelection.accentColor }}
                    >
                      {activeSelection.acronym}
                    </span>
                    <span className="text-[10px] uppercase tracking-[1.5px] text-[#8b9298] font-semibold">
                      {activeSelection.categoryLabel}
                    </span>
                  </div>
                  <h2 className="font-oswald text-lg sm:text-xl font-bold text-[#f4ead0] tracking-wide mt-1">
                    {activeSelection.name}
                  </h2>
                  <div className="text-[11px] text-[#9ca3af] italic">
                    {activeSelection.officialName}
                  </div>
                </div>

                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold border rounded-sm ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                >
                  <StatusIcon className="h-3.5 w-3.5" />
                  <span>{activeState.statusLabel}</span>
                </div>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] pt-1.5 border-t border-[#3a3420]/70">
                <div className="flex items-start gap-1.5 text-[#cfd3d6]">
                  <MapPin className="h-3.5 w-3.5 text-[#c9a557] flex-none mt-0.5" />
                  <span>
                    <b className="text-[#8b9298]">Sede:</b> {activeSelection.headquarters}
                  </span>
                </div>
                <div className="flex items-start gap-1.5 text-[#cfd3d6]">
                  <Clock className="h-3.5 w-3.5 text-[#c9a557] flex-none mt-0.5" />
                  <span>
                    <b className="text-[#8b9298]">Istituzione:</b> {activeSelection.foundedDate}
                    {activeSelection.dissolvedDate ? ` · Sciolta: ${activeSelection.dissolvedDate}` : ''}
                  </span>
                </div>
                <div className="flex items-start gap-1.5 text-[#cfd3d6] sm:col-span-2">
                  <FileText className="h-3.5 w-3.5 text-[#c9a557] flex-none mt-0.5" />
                  <span>
                    <b className="text-[#8b9298]">Trattato / Base Giuridica:</b> {activeSelection.treaty}
                  </span>
                </div>
                <div className="flex items-start gap-1.5 text-[#cfd3d6] sm:col-span-2">
                  <Users className="h-3.5 w-3.5 text-[#c9a557] flex-none mt-0.5" />
                  <span>
                    <b className="text-[#8b9298]">Protagonisti:</b> {activeSelection.keyFigures}
                  </span>
                </div>
              </div>
            </div>

            {/* Dynamic Context Callout for Current Step */}
            <div className="border-l-2 border-[#e8c979] bg-[#c9a557]/10 px-3 py-2.5 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-oswald text-[12px] font-bold uppercase tracking-wider text-[#e8c979]">
                  Quadro Storico al {stepInfo.d} — {activeState.phaseTitle}
                </span>
              </div>
              <p className="text-[11.5px] text-[#e2e5e9] leading-relaxed">{activeState.summary}</p>
            </div>

            {/* Live Geopolitical Weight Strip */}
            {activeState.status !== 'inactive' && activeState.status !== 'dissolved' && (
              <div className="grid grid-cols-3 gap-2">
                <div className="border border-[#3a3420] bg-black/30 px-2.5 py-2">
                  <div className="text-[9.5px] uppercase tracking-wider text-[#8b9298]">
                    Membri Attivi ({stepInfo.d})
                  </div>
                  <div className="font-oswald text-base font-bold text-[#e8c979]">
                    {activeState.activeMembers.length} Stati
                  </div>
                </div>
                <div className="border border-[#3a3420] bg-black/30 px-2.5 py-2">
                  <div className="text-[9.5px] uppercase tracking-wider text-[#8b9298]">
                    Popolazione Rappresentata
                  </div>
                  <div className="font-oswald text-base font-bold text-[#f0e6c8]">
                    {formatPopCompact(liveMetrics.popMillions)}{' '}
                    <span className="text-[10.5px] font-normal text-[#8b9298] font-mono-tech">
                      ({liveMetrics.worldPopPct.toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="border border-[#3a3420] bg-black/30 px-2.5 py-2">
                  <div className="text-[9.5px] uppercase tracking-wider text-[#8b9298]">
                    Superficie Coperta
                  </div>
                  <div className="font-oswald text-base font-bold text-[#f0e6c8]">
                    {formatAreaCompact(liveMetrics.areaKm2)}{' '}
                    <span className="text-[10.5px] font-normal text-[#8b9298] font-mono-tech">
                      ({liveMetrics.worldAreaPct.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tabs */}
            <div className="flex border-b border-[#3a3420] gap-1">
              {[
                { id: 'overview' as InspectorTab, label: 'Struttura & Articoli', Icon: Scale },
                {
                  id: 'members' as InspectorTab,
                  label: `Membri (${activeState.activeMembers.length})`,
                  Icon: Users,
                },
                {
                  id: 'timeline' as InspectorTab,
                  label: `Cronologia 1936–1951 (${activeSelection.milestones.length})`,
                  Icon: Clock,
                },
              ].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    tacticalAudio.playClick();
                    setInspectorTab(id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-oswald uppercase tracking-wider border-t border-x transition-colors ${
                    inspectorTab === id
                      ? 'bg-[#14202e] border-[#5a4a24] text-[#e8c979] -mb-[1px]'
                      : 'bg-transparent border-transparent text-[#8b9298] hover:text-[#cfd3d6]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* TAB 1: OVERVIEW */}
            {inspectorTab === 'overview' && (
              <div className="space-y-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[1.5px] text-[#c9a557] font-semibold mb-1">
                    Finalità & Mandato Storico
                  </div>
                  <p className="text-[#cfd3d6] leading-relaxed">{activeSelection.mission}</p>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-[1.5px] text-[#c9a557] font-semibold mb-1.5">
                    Clausole & Principi Fondamentali
                  </div>
                  <div className="space-y-1.5">
                    {activeSelection.keyArticles.map((art, i) => (
                      <div
                        key={i}
                        className="border border-[#332d1c] bg-black/25 px-2.5 py-2 text-[11px] text-[#d6dadf] leading-snug"
                      >
                        {art}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-[1.5px] text-[#c9a557] font-semibold mb-1.5 flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" /> Organi Principali
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeSelection.organs.map((org, i) => (
                      <div key={i} className="border border-[#2b291f] bg-black/30 p-2.5 space-y-0.5">
                        <div className="font-oswald text-[12px] font-bold text-[#f0e6c8]">
                          {org.name}
                        </div>
                        <div className="text-[11px] text-[#9ca3af] leading-snug">{org.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MEMBERS */}
            {inspectorTab === 'members' && (
              <div className="space-y-3.5">
                {activeState.activeMembers.length === 0 ? (
                  <div className="border border-[#3a3420] bg-black/25 p-4 text-center text-[#8b9298]">
                    Allo step <b>{stepInfo.d}</b> l’organizzazione è {activeState.statusLabel.toLowerCase()} e non conta Stati membri attivi.
                  </div>
                ) : (
                  <div>
                    <div className="text-[10px] uppercase tracking-[1.5px] text-[#c9a557] font-semibold mb-1.5">
                      Stati Membri al {stepInfo.d} ({activeState.activeMembers.length})
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
                      {activeState.activeMembers.map((m) => {
                        const meta = getOwnerMeta(m.code, currentStep);
                        const label = m.label || meta.shortName || m.code;
                        const isSpecial =
                          m.role === 'P5 · Veto' || m.role === 'Consiglio Permanente';
                        return (
                          <button
                            type="button"
                            key={`${m.code}-${m.joinStep}`}
                            onClick={() => {
                              if (!onOpenCountry) return;
                              tacticalAudio.playClick();
                              onOpenCountry(m.code);
                            }}
                            title={onOpenCountry ? `Apri Country Viz di ${label} (${m.code})` : label}
                            className={`text-left flex items-center justify-between gap-2 px-2 py-1.5 border transition-colors ${
                              onOpenCountry ? 'cursor-pointer hover:border-[#e8c979] hover:bg-[#c9a557]/15' : ''
                            } ${
                              isSpecial
                                ? 'border-[#8a7440] bg-[#c9a557]/10'
                                : 'border-[#2b291f] bg-black/30'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-5 h-3.5 rounded-[1px] overflow-hidden border border-[#554d33] flex-none bg-black/40">
                                <CountryFlag
                                  owner={m.code}
                                  step={currentStep}
                                  className="w-full h-full"
                                />
                              </div>
                              <span className="text-[11px] text-[#e6d9ae] font-medium truncate">
                                {label}
                              </span>
                            </div>
                            <span
                              className={`text-[9px] font-mono-tech px-1 py-0.5 rounded-sm flex-none ${
                                isSpecial
                                  ? 'bg-[#c9a557]/25 text-[#fde047] border border-[#8a7440]'
                                  : 'text-[#8b9298]'
                              }`}
                            >
                              {m.role}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeState.formerMembers.length > 0 && (
                  <div>
                    <div className="text-[10px] uppercase tracking-[1.5px] text-[#f87171] font-semibold mb-1.5">
                      Usciti, Espulsi o Sospesi ({activeState.formerMembers.length})
                    </div>
                    <div className="space-y-1">
                      {activeState.formerMembers.map((m) => {
                        const meta = getOwnerMeta(m.code, currentStep);
                        const label = m.label || meta.shortName || m.code;
                        return (
                          <button
                            type="button"
                            key={`ex-${m.code}`}
                            onClick={() => {
                              if (!onOpenCountry) return;
                              tacticalAudio.playClick();
                              onOpenCountry(m.code);
                            }}
                            title={onOpenCountry ? `Apri Country Viz di ${label} (${m.code})` : label}
                            className={`w-full text-left flex items-center justify-between gap-2 px-2.5 py-1.5 border border-[#52282d] bg-[#2a1216]/60 transition-colors ${
                              onOpenCountry ? 'cursor-pointer hover:border-[#fca5a5] hover:bg-[#3d181e]/75' : ''
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="w-5 h-3.5 rounded-[1px] overflow-hidden border border-[#61343a] flex-none bg-black/40 opacity-80">
                                <CountryFlag
                                  owner={m.code}
                                  step={currentStep}
                                  className="w-full h-full"
                                />
                              </div>
                              <span className="text-[11px] text-[#fca5a5] font-medium">
                                {label}
                              </span>
                              <span className="text-[10px] text-[#9ca3af] truncate">
                                — {m.exitReason || 'Ritiro'}
                              </span>
                            </div>
                            <span className="text-[9.5px] font-mono-tech px-1.5 py-0.5 bg-[#5f2128] text-[#fecaca] border border-[#8f3b44] flex-none">
                              {m.exitType || 'Uscito'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: TIMELINE */}
            {inspectorTab === 'timeline' && (
              <div className="space-y-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[1.5px] text-[#c9a557] font-semibold mb-1.5">
                    Date Chiave & Tappe Interattive
                  </div>
                  <div className="space-y-1.5">
                    {activeSelection.milestones.map((ms, idx) => {
                      const targetStep = STEPS[ms.step];
                      const isCur = currentStep === ms.step;
                      return (
                        <div
                          key={idx}
                          className={`border p-2.5 flex items-start justify-between gap-3 ${
                            isCur
                              ? 'border-[#e8c979] bg-[#c9a557]/15'
                              : 'border-[#2f2b1c] bg-black/30'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-mono-tech text-[10.5px] text-[#e8c979] font-bold">
                                {ms.dateLabel}
                              </span>
                              <span className="font-oswald text-[12px] font-bold text-[#f0e6c8]">
                                {ms.title}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#9ca3af] leading-snug">{ms.detail}</p>
                          </div>

                          {targetStep && (
                            <button
                              onClick={() => {
                                tacticalAudio.playClick();
                                onSelectStep(ms.step);
                              }}
                              className="flex-none inline-flex items-center gap-1 px-2 py-1 text-[10px] font-mono-tech border border-[#8a7440] bg-[#c9a557]/15 hover:bg-[#c9a557]/30 text-[#e8c979] transition-colors"
                            >
                              <span>{targetStep.d}</span>
                              <ArrowRight className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-[1.5px] text-[#c9a557] font-semibold mb-1.5">
                    Ciclo Storico Completo (1936–1951)
                  </div>
                  <div className="space-y-1">
                    {activeSelection.phases.map((ph, i) => {
                      const isIn = currentStep >= ph.fromStep && currentStep <= ph.toStep;
                      return (
                        <div
                          key={i}
                          className={`px-2.5 py-1.5 border text-[11px] flex items-center justify-between gap-2 ${
                            isIn
                              ? 'border-[#c9a557] bg-[#c9a557]/10 text-[#f0e6c8]'
                              : 'border-[#25241c] bg-black/20 text-[#7c858e]'
                          }`}
                        >
                          <span className="truncate">
                            <b>{ph.statusLabel}:</b> {ph.phaseTitle}
                          </span>
                          <span className="font-mono-tech text-[10px] flex-none">
                            {STEPS[ph.fromStep]?.d} → {STEPS[ph.toStep]?.d}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
