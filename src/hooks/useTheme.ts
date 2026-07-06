"use client";

import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

type DocumentWithVT = Document & {
  startViewTransition?: (callback: () => void) => unknown;
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const read = () =>
      setTheme((document.documentElement.dataset.theme as Theme) ?? "light");
    read();
    // Stay in sync when the theme is changed elsewhere (e.g. command palette)
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const toggle = useCallback(() => {
    const current = (document.documentElement.dataset.theme as Theme) ?? "light";
    const next: Theme = current === "dark" ? "light" : "dark";

    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
      setTheme(next);
    };

    const doc = document as DocumentWithVT;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && typeof doc.startViewTransition === "function") {
      // Stepped wipe between themes — see globals.css ::view-transition rules
      doc.startViewTransition(apply);
    } else {
      apply();
    }
  }, []);

  return { theme, toggle };
}
