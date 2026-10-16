"use client";

import { motion } from "framer-motion";
import { story } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import PulseLine from "./PulseLine";

const ease = [0.22, 1, 0.36, 1] as const;

const laneLabel = { it: "In IT", care: "At the bedside", both: "Both" } as const;

export default function TwoCareers() {
  const lanes = story.timeline.filter((e) => e.lane !== "both");
  const finale = story.timeline.find((e) => e.lane === "both");

  return (
    <section id="story" className="relative py-32 scroll-mt-16 overflow-x-clip">
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading number="02." title="Two Careers" />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="max-w-3xl font-sans text-2xl sm:text-3xl leading-snug tracking-tight mb-20"
        >
          {story.lead}
        </motion.p>

        {/* Timeline: IT on the left, care on the right, one spine of years */}
        <div className="relative">
          <div className="hidden md:grid grid-cols-[1fr_88px_1fr] mb-6 font-mono text-xs tracking-widest uppercase">
            <span className="text-right text-muted">In IT</span>
            <span />
            <span className="text-accent">At the bedside</span>
          </div>

          <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-0 md:top-10 bottom-24 w-px bg-gradient-to-b from-border via-border to-accent/60" />

          <ol className="relative space-y-6 md:space-y-4">
            {lanes.map((e, i) => (
              <motion.li
                key={`${e.year}-${e.text}`}
                initial={{ opacity: 0, x: e.lane === "it" ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease, delay: (i % 3) * 0.05 }}
                className="relative grid grid-cols-[24px_1fr] md:grid-cols-[1fr_88px_1fr] items-center gap-4 md:gap-0"
              >
                {/* left (IT) */}
                <div className={`hidden md:block text-right pr-6 ${e.lane === "it" ? "" : "invisible"}`}>
                  <p className="text-foreground/90 leading-snug">{e.text}</p>
                </div>

                {/* spine */}
                <div className="flex md:flex-col items-center justify-center">
                  <span
                    className={`relative z-10 w-[11px] h-[11px] rounded-full border-2 bg-background ${
                      e.lane === "care" ? "border-accent" : "border-muted"
                    }`}
                  />
                  <span className="hidden md:block font-mono text-xs text-muted mt-1">{e.year}</span>
                </div>

                {/* right (care), and the single-column mobile layout */}
                <div className="md:pl-6">
                  <p className="md:hidden font-mono text-[11px] tracking-wider uppercase mb-0.5">
                    <span className="text-muted">{e.year}</span>
                    <span className={e.lane === "care" ? "text-accent" : "text-muted"}> · {laneLabel[e.lane]}</span>
                  </p>
                  <p className={`leading-snug ${e.lane === "care" ? "" : "md:invisible"} text-foreground/90`}>
                    {e.text}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>

          {finale && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease }}
              className="relative mt-10 md:mx-auto md:max-w-xl rounded-lg border border-accent/40 bg-card/70 p-6 md:text-center shadow-[0_0_60px_rgba(233,115,22,0.08)]"
            >
              <p className="font-mono text-xs tracking-widest uppercase text-accent">{finale.year} · Both</p>
              <p className="font-sans text-xl sm:text-2xl font-bold mt-2">{finale.text}</p>
              <PulseLine className="w-full h-8 mt-4 text-accent" />
            </motion.div>
          )}
        </div>

        {/* What the bedside taught me */}
        <h3 className="font-mono text-accent text-xs tracking-widest uppercase mt-28 mb-8">
          What the bedside taught me about software
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {story.lessons.map((l, i) => (
            <motion.article
              key={l.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease, delay: (i % 2) * 0.1 }}
              className="group relative rounded-lg border border-border bg-card/50 p-6 hover:border-accent/30 transition-colors duration-500"
            >
              <span className="font-mono text-accent/70 text-sm">0{i + 1}</span>
              <h4 className="font-sans text-xl font-bold mt-2 mb-3 group-hover:text-accent transition-colors">
                {l.title}
              </h4>
              <p className="text-muted leading-relaxed">{l.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
