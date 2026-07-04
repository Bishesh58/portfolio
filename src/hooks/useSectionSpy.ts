"use client";

import { useEffect } from "react";
import { setActiveSection } from "@/lib/sectionStore";
import type { SectionId } from "@/data/quips";

export function useSectionSpy() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-section]");
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection((entry.target as HTMLElement).dataset.section as SectionId);
          }
        }
      },
      // A horizontal band around 40% viewport height decides the active section.
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
}
