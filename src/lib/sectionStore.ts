import { useSyncExternalStore } from "react";
import type { SectionId } from "@/data/quips";

let activeSection: SectionId = "hero";
const listeners = new Set<() => void>();

export function setActiveSection(id: SectionId) {
  if (id === activeSection) return;
  activeSection = id;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useActiveSection(): SectionId {
  return useSyncExternalStore(subscribe, () => activeSection, () => "hero" as SectionId);
}
