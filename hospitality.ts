export interface HospitalityExperience {
  id: string;
  property: string;
  propertyType: string;
  isFlagship: boolean;
  role: string;
  location: string;
  duration: string;
  project: Projcet[];
}

export interface Projcet {
  id: string;
  title: string;
  overview: string;
  launchDate: string;
  tool: string[];
  metrics: Record<string, any>;
  imageUrl?: string;
  initiatives?: Initiatives[];
  guestFeedback?: number[];
  modules?: Module;
  team?: Team[];
  documentLinks?: string[];
}

export interface Initiatives {
  name: string;
  result: string;
}

export interface Module {
  summary: string;
  tags: string[];
}

export interface Team {
  name: string;
  role: string;
  lead: boolean;
}
