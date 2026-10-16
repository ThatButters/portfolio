"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig, stats } from "@/data/portfolio";
import EcgMonitor from "./EcgMonitor";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4 + i * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const TONE = {
  accent: { text: "text-accent", border: "border-accent/25" },
  cyan: { text: "text-cyan", border: "border-cyan/25" },
  amber: { text: "text-amber", border: "border-amber/25" },
} as const;

function Heart({ beat }: { beat: number }) {
  return (
    <svg
      key={beat}
      viewBox="0 0 24 24"
      className="w-4 h-4 fill-accent animate-heartbeat"
      aria-hidden="true"
    >
      <path d="M12 21s-7.5-4.6-10-9.3C.4 8.3 2.3 4 6.3 4c2.3 0 3.9 1.4 5.7 3.4C13.8 5.4 15.4 4 17.7 4c4 0 5.9 4.3 4.3 7.7C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}

function EcgStrip({
  bpm,
  beat,
  onBeat,
  className,
}: {
  bpm: number;
  beat: number;
  onBeat: (b: number) => void;
  className: string;
}) {
  return (
    <motion.div
      custom={5}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={`${className} rounded-md border border-accent/20 bg-black/50 items-stretch overflow-hidden`}
    >
      <div className="relative flex-1 min-w-0">
        <div className="absolute top-2 left-3 flex gap-4 font-mono text-[10px] tracking-widest text-accent/70 pointer-events-none z-10">
          <span>II</span>
          <span>25 mm/s</span>
          <span className="hidden sm:inline">1 mV</span>
        </div>
        <EcgMonitor className="h-24 sm:h-28 w-full" onBeat={onBeat} />
      </div>
      <div
        className="shrink-0 w-28 sm:w-36 border-l border-accent/20 px-3 sm:px-4 py-2 flex flex-col justify-center"
        aria-live="off"
      >
        <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-accent">
          <span>HR</span>
          <Heart beat={beat} />
        </div>
        <div className="font-mono text-4xl sm:text-5xl font-bold text-accent tabular-nums [text-shadow:0_0_18px_currentColor]">
          {bpm}
        </div>
        <div className="font-mono text-[10px] text-muted tracking-wider">
          bpm
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [bpm, setBpm] = useState(72);
  const [beat, setBeat] = useState(0);
  const onBeat = useCallback((b: number) => {
    setBpm(b);
    setBeat((n) => n + 1);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center monitor-grid overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] animate-blob-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[100px] animate-blob-pulse [animation-delay:4s]" />

      <div className="mx-auto max-w-6xl px-6 pt-32 pb-24 w-full">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2 space-y-6">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-mono text-accent text-sm tracking-widest uppercase"
            >
              {siteConfig.role}
            </motion.p>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-sans text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              {siteConfig.name.split(" ")[0]}{" "}
              <span className="text-accent">
                {siteConfig.name.split(" ").slice(1).join(" ")}
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight"
            >
              {siteConfig.tagline}
            </motion.p>

            <EcgStrip
              bpm={bpm}
              beat={beat}
              onBeat={onBeat}
              className="flex lg:hidden"
            />

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-foreground/90 max-w-xl text-lg sm:text-xl leading-relaxed"
            >
              {siteConfig.subline}
            </motion.p>

            <motion.p
              custom={3.5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-muted max-w-xl leading-relaxed"
            >
              {siteConfig.description}
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href="#biw"
                className="group px-6 py-3 bg-accent text-background font-mono text-sm font-bold rounded hover:bg-accent/90 transition-all hover:shadow-[0_0_30px_rgba(51,224,122,0.3)]"
              >
                See the work
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-border text-foreground font-mono text-sm rounded hover:border-accent/50 hover:text-accent transition-colors"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>

          {/* Monitor numerics */}
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 lg:gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i + 2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className={`relative rounded-md border ${TONE[s.tone].border} bg-black/40 px-3 py-2 lg:px-5 lg:py-4`}
              >
                <div
                  className={`flex justify-between font-mono text-[10px] lg:text-xs tracking-widest uppercase ${TONE[s.tone].text}`}
                >
                  <span>{s.label}</span>
                  <span className="hidden sm:inline opacity-70">{s.unit}</span>
                </div>
                <div
                  className={`font-mono text-3xl lg:text-5xl font-bold tabular-nums ${TONE[s.tone].text} [text-shadow:0_0_18px_currentColor]`}
                >
                  {s.value}
                </div>
                <div className="hidden sm:block font-mono text-[10px] text-muted tracking-wider uppercase mt-1">
                  {s.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <EcgStrip
          bpm={bpm}
          beat={beat}
          onBeat={onBeat}
          className="hidden lg:flex mt-16"
        />
      </div>
    </section>
  );
}
