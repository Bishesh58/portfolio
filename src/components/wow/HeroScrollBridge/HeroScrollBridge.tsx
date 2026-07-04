"use client";

import { useEffect, useRef, useState } from "react";
import Marquee from "@/components/Marquee";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./HeroScrollBridge.module.css";

const INITIAL_GAP = 300;
const SCROLL_START = 100;
const SCROLL_RANGE = 200;
const MIN_GAP = -30;

const WAVE_STROKE =
  "M0,15 Q10,5 20,15 T40,15 Q50,5 60,15 T80,15 Q90,20 100,15 T120,15 Q130,10 140,15 T160,15 Q170,5 180,15 T200,15 Q210,20 220,15 T240,15 Q250,8 260,15 T280,15 Q290,18 300,15 T320,15 Q330,5 340,15 T360,15 Q370,12 380,15 T400,15 Q410,20 420,15 T440,15 Q450,6 460,15 T480,15 Q490,16 500,15 T520,15 Q530,8 540,15 T560,15 Q570,20 580,15 T600,15 Q610,10 620,15 T640,15 Q650,5 660,15 T680,15 Q690,18 700,15 T720,15 Q730,12 740,15 T760,15 Q770,7 780,15 T800,15 Q810,20 820,15 T840,15 Q850,9 860,15 T880,15 Q890,14 900,15 T920,15 Q930,6 940,15 T960,15 Q970,19 980,15 T1000,15 Q1010,11 1020,15 T1040,15 Q1050,5 1060,15 T1080,15 Q1090,17 1100,15 T1120,15 Q1130,8 1140,15 T1160,15 Q1170,13 1180,15 T1200,15 Q1210,20 1220,15 T1240,15 Q1250,7 1260,15 T1280,15 Q1290,16 1300,15 T1320,15 Q1330,10 1340,15 T1360,15 Q1370,5 1380,15 T1400,15 Q1410,18 1420,15 T1440,15";

const WAVE_BODY = WAVE_STROKE.replace(/^M0,15/, "");

function TearTop() {
  return (
    <svg viewBox="0 0 1440 30" preserveAspectRatio="none" aria-hidden="true">
      <path d={`M0,30 L0,15${WAVE_BODY} L1440,30 Z`} fill="var(--bridge-muted)" />
      <path d={WAVE_STROKE} fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function TearBottom({ grayOpacity }: { grayOpacity: number }) {
  return (
    <svg viewBox="0 0 1440 30" preserveAspectRatio="none" aria-hidden="true">
      <path
        d={`M0,0 L0,15${WAVE_BODY} L1440,0 Z`}
        fill="var(--bridge-muted)"
        style={{ opacity: grayOpacity }}
      />
      <path d={`M0,30 L0,15${WAVE_BODY} L1440,30 Z`} fill="var(--paper)" />
      <path d={WAVE_STROKE} fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

interface Props {
  ticker: string[];
}

/**
 * Torn paper gap with marquee pinned in the tear zone — tears collapse behind the ticker on scroll.
 */
export default function HeroScrollBridge({ ticker }: Props) {
  const reduced = usePrefersReducedMotion();
  const gapRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [grayOpacity, setGrayOpacity] = useState(1);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || reduced) return;

    const gap = gapRef.current;
    const bottom = bottomRef.current;
    if (!gap || !bottom) return;

    const onScroll = () => {
      if (window.innerWidth <= 768) {
        gap.style.height = "0px";
        bottom.style.marginTop = "0px";
        setGrayOpacity(0);
        return;
      }

      const scrollY = window.scrollY;

      if (scrollY <= SCROLL_START) {
        gap.style.height = `${INITIAL_GAP}px`;
        bottom.style.marginTop = "0px";
        setGrayOpacity(1);
        return;
      }

      if (scrollY > SCROLL_START && scrollY <= SCROLL_START + SCROLL_RANGE) {
        const progress = (scrollY - SCROLL_START) / SCROLL_RANGE;
        const currentHeight = INITIAL_GAP - (INITIAL_GAP - MIN_GAP) * progress;

        if (currentHeight >= 0) {
          gap.style.height = `${currentHeight}px`;
          bottom.style.marginTop = "0px";
          setGrayOpacity(1);
        } else {
          gap.style.height = "0px";
          bottom.style.marginTop = `${currentHeight}px`;
          const negativePart = Math.abs(MIN_GAP);
          const negativeProgress = Math.abs(currentHeight) / negativePart;
          setGrayOpacity(1 - negativeProgress);
        }
        return;
      }

      gap.style.height = "0px";
      bottom.style.marginTop = `${MIN_GAP}px`;
      setGrayOpacity(0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mounted, reduced]);

  if (reduced) {
    return (
      <div className={styles.bridge} aria-hidden="true">
        <div className={styles.tearTop}>
          <TearTop />
        </div>
        <div className={styles.marqueeSlot}>
          <Marquee items={ticker} />
        </div>
        <div className={styles.tearBottom}>
          <TearBottom grayOpacity={0} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.bridge} aria-hidden="true">
      <div className={styles.tearTop}>
        <TearTop />
      </div>
      <div className={styles.tearZone}>
        <div ref={gapRef} className={styles.gap} style={{ height: INITIAL_GAP }} />
        <div className={styles.marqueeSlot}>
          <Marquee items={ticker} />
        </div>
      </div>
      <div ref={bottomRef} className={styles.tearBottom}>
        <TearBottom grayOpacity={grayOpacity} />
      </div>
    </div>
  );
}
