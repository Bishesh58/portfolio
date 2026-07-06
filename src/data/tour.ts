import type { SectionId } from "./quips";

export type TourStop = { id: SectionId; text: string };

/** Script for the mascot-guided tour — one stop per section, same voice as
 *  the quips. Timing lives in the tour engine (Mascot.tsx). */
export const tourStops: TourStop[] = [
  { id: "hero", text: "Welcome to the build sheet. I'm the site robot — follow me." },
  { id: "about", text: "01 — Profile. Full stack, 4+ years, Auckland. The spec checks out." },
  { id: "journey", text: "02 — Experience. Unity games to NetSuite ERPs. Quite the road trip." },
  { id: "projects", text: "03 — Build log. Eight internal tools, all in production. I supervised." },
  { id: "skills", text: "04 — Toolkit. Vue by day, Laravel by night, SuiteScript when provoked." },
  { id: "contact", text: "05 — The important page. His inbox is open. Say hi!" },
];
