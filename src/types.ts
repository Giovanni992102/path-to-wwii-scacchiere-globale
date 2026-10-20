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

export type PoliticalTier =
  | 'sovereign'      // Stato sovrano indipendente
  | 'dominion'       // Dominion autonomo (es. Canada, Australia, Sudafrica, Nuova Zelanda)
  | 'colony'         // Colonia / possedimento oltremare (es. Gibilterra, Raj Britannico, AOF, AEF)
  | 'puppet'         // Stato cliente / fantoccio collaborazionista (es. Manciukuò, Mengjiang, Slovacchia, Vichy, Wang Jingwei)
  | 'protectorate'   // Protettorato o regno sotto tutela (es. Marocco, Egitto, Boemia-Moravia)
  | 'mandate'        // Mandato della Società delle Nazioni (es. Siria, Palestina, SWA)
  | 'satellite'      // Stato satellite / repubblica popolare satellite (es. Mongolia, Tannu Tuva)
  | 'condominium'    // Amministrazione congiunta (es. Sudan Anglo-Egiziano, Andorra)
  | 'autonomous'     // Regione/commonwealth autonomo speciale (es. Filippine, Xinjiang, Base Rossa)
  | 'free_forces'    // Forze della Francia Libera / governi in esilio
  | 'international'  // Territorio internazionale / Città Libera (es. Danzica, Tangeri)
  | 'neutral_misc';  // Nazione neutrale non allineata

export interface OwnerConfig {
  id?: string;
  c: string;
  f: FactionType;
  l: (step: number) => string;
  shortName?: string;
  leader?: string;
  capital?: string;
  tier?: PoliticalTier;
  overlordCode?: string | null;
  aliases?: string[];
  isSubject?: boolean;
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
