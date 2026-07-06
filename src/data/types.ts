export type Accent = "cobalt" | "lime" | "teal" | "yellow";

export interface SocialLink {
  label: string;
  url: string;
  icon: "github" | "linkedin" | "email";
}

export interface AboutSegment {
  text: string;
  highlight?: Accent;
}

export interface TimelineEntry {
  kind: "work" | "education";
  title: string;
  org: string;
  start: string;
  end: string;
  location?: string;
  summary: string;
}

/** Expanded "work order" behind a Build Log row — the problem, what was
 *  built, and the outcome, in the language of an internal job sheet. */
export interface ProjectDossier {
  users: string;
  status: string;
  problem: string;
  build: string;
  outcome: string;
}

export interface Project {
  title: string;
  impact: string;
  tags: string[];
  accent: Accent;
  dossier?: ProjectDossier;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface SkillGroup {
  label: string;
  accent: Accent;
  skills: Skill[];
}

export interface Resume {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  resumePdf: string;
  tagline: string;
  intro: string;
  socials: SocialLink[];
  about: AboutSegment[][];
  timeline: TimelineEntry[];
  projects: Project[];
  skillGroups: SkillGroup[];
  certifications: string[];
}
