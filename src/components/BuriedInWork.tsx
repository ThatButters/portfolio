"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { biw } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

function ArrowOut() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export default function BuriedInWork() {
  return (
    <section id="biw" className="relative py-32 scroll-mt-16 overflow-x-clip">
      <div className="absolute top-40 right-0 w-[700px] h-[500px] rounded-full bg-accent/3 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading number="01." title="Buried in Work" />

        {/* Intro + numbers */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-5 gap-10 mb-20"
        >
          <div className="lg:col-span-3 space-y-4">
            <p className="font-mono text-accent text-xs tracking-widest uppercase">
              What I&apos;m building now
            </p>
            <p className="text-foreground/90 text-lg leading-relaxed">{biw.intro}</p>
          </div>
          <dl className="lg:col-span-2 grid grid-cols-2 gap-px rounded-lg overflow-hidden border border-border bg-border self-start">
            {biw.stats.map((s) => (
              <div key={s.label} className="bg-card p-5">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-sans text-3xl font-bold text-accent">{s.value}</dd>
                <dd className="font-mono text-[11px] text-muted mt-1 tracking-wider uppercase leading-snug">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Products */}
        <div className="space-y-24">
          {biw.products.map((p, i) => (
            <motion.article
              key={p.title}
              variants={rise}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="group grid lg:grid-cols-12 gap-8 items-center"
            >
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${p.title}`}
                className={`lg:col-span-7 block rounded-lg overflow-hidden border border-border group-hover:border-accent/30 transition-colors duration-500 ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={p.image}
                  alt={`${p.title} home page`}
                  width={1440}
                  height={900}
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="w-full h-auto group-hover:scale-[1.015] transition-transform duration-700"
                />
              </a>

              <div className={`lg:col-span-5 space-y-4 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <h3 className="font-sans text-2xl sm:text-3xl font-bold group-hover:text-accent transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="text-foreground/80 italic">{p.tagline}</p>
                <p className="text-muted leading-relaxed">{p.description}</p>
                <ul className="flex flex-wrap gap-2 pt-1" aria-label="Built with">
                  {p.tech.map((t) => (
                    <li key={t} className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded">
                      {t}
                    </li>
                  ))}
                </ul>
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 pt-2 font-mono text-sm text-muted hover:text-accent transition-colors"
                >
                  {p.live.replace("https://", "")}
                  <ArrowOut />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Smaller sites + how it's built */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid lg:grid-cols-2 gap-6 mt-24"
        >
          <div className="rounded-lg border border-border bg-card/50 p-6">
            <h3 className="font-mono text-accent text-xs tracking-widest uppercase mb-5">
              Also in the family
            </h3>
            <ul className="divide-y divide-border">
              {biw.satellites.map((s) => (
                <li key={s.title}>
                  <a
                    href={s.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 py-3 group/row"
                  >
                    <span>
                      <span className="block font-sans font-semibold group-hover/row:text-accent transition-colors">
                        {s.title}
                      </span>
                      <span className="block text-sm text-muted">{s.note}</span>
                    </span>
                    <span className="text-muted group-hover/row:text-accent transition-colors shrink-0">
                      <ArrowOut />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card/50 p-6">
            <h3 className="font-mono text-accent text-xs tracking-widest uppercase mb-5">
              How it&apos;s built
            </h3>
            <ul className="space-y-4">
              {biw.practices.map((item) => (
                <li key={item} className="flex gap-3 text-muted">
                  <span className="text-accent mt-1 shrink-0" aria-hidden="true">
                    &#9656;
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
