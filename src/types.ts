export type FactionType = 'Asse' | 'Alleati' | 'Comintern' | 'Neutrale' | 'Fantoccio';

export interface StepInfo {
  d: string;
  t: string;
  desc: string;
  headline?: string;
  theaterEvents?: {
    europe: string;
    asia: string;
    africa: string;
    americas: string;
  };
}

export interface OwnerConfig {
  c: string;
  f: FactionType;
  l: (step: number) => string;
  shortName?: string;
  leader?: string;
  capital?: string;
}

export interface ResolvedTerritory {
  o: string;
  name: string;
  note?: string;
  fac?: FactionType;
  historicalContext?: string;
  adminEntity?: string;
}

export interface StatsStep {
  own: Record<string, number>;
  fac: Record<string, number>;
}

export interface ToponymMatch {
  historicalName: string;
  adminTitle?: string;
  altNames?: string[];
  historicalNote?: string;
  languageCode?: string;
}

export interface SearchResultItem {
  id: string;
  historicalName: string;
  modernName: string;
  ownerKey: string;
  ownerLabel: string;
  featureRef: any;
}
