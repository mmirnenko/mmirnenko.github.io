export type Language = 'en' | 'de' | 'uk';

export type ProjectCategory = 'film' | 'poster' | 'design' | 'other';

export interface LocalizedString {
  en: string;
  de: string;
  uk: string;
}

export interface PortfolioProject {
  id: string;
  category: ProjectCategory;
  title: LocalizedString;
  shortDesc: LocalizedString;
  longDesc: LocalizedString;
  year: string;
  role: LocalizedString;
  tools: string[];
  imageUrl: string;
  videoUrl?: string; // Optional YouTube / Vimeo embedding or custom player link
  aspectRatio: 'video' | 'poster' | 'square';
  featured?: boolean;
}

export interface CustomizationOptions {
  theme: 'dark' | 'light' | 'cinematic' | 'sepia';
  accentColor: 'amber' | 'emerald' | 'blue' | 'crimson' | 'slate';
  fontFamily: 'sans' | 'serif' | 'mono';
  filmGrain: boolean;
  layoutDensity: 'comfortable' | 'compact';
}

export interface TranslationDictionary {
  brand: LocalizedString;
  aboutMe: LocalizedString;
  works: LocalizedString;
  contact: LocalizedString;
  all: LocalizedString;
  films: LocalizedString;
  posters: LocalizedString;
  designs: LocalizedString;
  others: LocalizedString;
  roleLabel: LocalizedString;
  yearLabel: LocalizedString;
  toolsLabel: LocalizedString;
  customizerTitle: LocalizedString;
  customizerDesc: LocalizedString;
  themeLabel: LocalizedString;
  accentLabel: LocalizedString;
  fontLabel: LocalizedString;
  grainLabel: LocalizedString;
  densityLabel: LocalizedString;
  aboutTitle: LocalizedString;
  aboutSubtitle: LocalizedString;
  aboutBio: LocalizedString;
  educationTitle: LocalizedString;
  educationList: {
    period: string;
    degree: LocalizedString;
    school: LocalizedString;
    description?: LocalizedString;
  }[];
  skillsTitle: LocalizedString;
  contactTitle: LocalizedString;
  contactDesc: LocalizedString;
  contactName: LocalizedString;
  contactEmail: LocalizedString;
  contactMessage: LocalizedString;
  contactSend: LocalizedString;
  contactSuccess: LocalizedString;
  viewProject: LocalizedString;
  closeProject: LocalizedString;
  watchVideo: LocalizedString;
  metaStudent: LocalizedString;
  resetCustomizer: LocalizedString;
}
