"use client";

import { useEffect } from "react";
import { resume } from "@/data/resume";

let printed = false;

/** A calling card for anyone curious enough to open devtools. */
export default function ConsoleSignature() {
  useEffect(() => {
    if (printed) return;
    printed = true;

    const badge =
      "font-family: monospace; font-weight: 700; font-size: 22px;" +
      "background: #ffd02f; color: #14130f; padding: 8px 20px;" +
      "border: 3px solid #14130f;";
    const line =
      "font-family: monospace; font-weight: 700; font-size: 12px; color: #2440d8;";
    const dim = "font-family: monospace; font-size: 12px; color: #5b564a;";

    console.log("%cBUILD SHEET", badge);
    console.log(`%c${resume.name} — ${resume.role}, ${resume.location}`, line);
    console.log(
      "%cYou opened the console. I like you already.\n" +
        `→ ${resume.email}\n\n` +
        "While you're here, try:\n" +
        "  Ctrl+K   command palette\n" +
        "  X        blueprint x-ray\n" +
        "  ?        all shortcuts\n" +
        '  h-i-r-e  type it and see\n' +
        "  ↑↑↓↓←→←→BA   you know what this does",
      dim,
    );
  }, []);

  return null;
}
