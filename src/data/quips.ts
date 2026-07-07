export type SectionId = "hero" | "about" | "journey" | "projects" | "skills" | "contact";

export const quips: Record<SectionId, string[]> = {
  hero: ["Beep boop. Welcome aboard!", "He codes. I supervise."],
  about: ["4+ years. I was there for most of the commits.", "Bored? Click me. I know a game."],
  journey: ["Unity games to NetSuite ERPs — quite the road trip."],
  projects: ["I built 8 dashboards. I count them in my sleep.", "Kanban boards? We ship those."],
  skills: ["Vue by day, Laravel by night.", "Yes, he really does write SuiteScript."],
  contact: ["Say hi — he replies faster than a cron job."],
};
