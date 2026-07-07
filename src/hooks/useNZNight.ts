"use client";

import { useEffect, useState } from "react";

function nzHour(): number {
  return Number(
    new Intl.DateTimeFormat("en-NZ", {
      timeZone: "Pacific/Auckland",
      hour: "numeric",
      hourCycle: "h23",
    }).format(new Date()),
  );
}

/** True between 23:00 and 06:00 Auckland time — the site's quiet hours.
 *  Re-checked every minute; `?night=1` forces it on for previewing. */
export function useNZNight(): boolean {
  const [night, setNight] = useState(false);

  useEffect(() => {
    const check = () => {
      const forced = new URLSearchParams(window.location.search).get("night") === "1";
      const h = nzHour();
      setNight(forced || h >= 23 || h < 6);
    };
    check();
    const id = window.setInterval(check, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return night;
}
