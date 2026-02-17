"use client";

import { motion } from "framer-motion";
import { siteConfig, stats } from "@/data/portfolio";

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

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center dot-grid overflow-hidden">
      {/* Gradient blobs */}
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] animate-blob-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[100px] animate-blob-pulse [animation-delay:4s]" />

      <div className="mx-auto max-w-6xl px-6 py-32 w-full">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Left content */}
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
              className="font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold text-muted tracking-tight"
            >
              {siteConfig.tagline}
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-muted max-w-lg text-lg leading-relaxed"
            >
              {siteConfig.description}
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href="#projects"
                className="group px-6 py-3 bg-accent text-background font-mono text-sm font-bold rounded hover:bg-accent/90 transition-all hover:shadow-[0_0_30px_rgba(233,115,22,0.3)]"
              >
                View Projects
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

          {/* Right stats */}
          <div className="hidden lg:flex flex-col gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i + 2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="relative p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm group hover:border-accent/30 transition-all duration-500"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-lg bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="font-sans text-4xl font-bold text-accent">
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs text-muted mt-1 tracking-wider uppercase">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
