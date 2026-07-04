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
  tech?: string[];
}

export interface Project {
  title: string;
  impact: string;
  tags: string[];
  accent: Accent;
}

export interface SkillGroup {
  label: string;
  accent: Accent;
  skills: string[];
}

export interface Resume {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  tagline: string;
  intro: string;
  socials: SocialLink[];
  techBadges: string[];
  about: AboutSegment[][];
  timeline: TimelineEntry[];
  projects: Project[];
  skillGroups: SkillGroup[];
  certifications: string[];
}
