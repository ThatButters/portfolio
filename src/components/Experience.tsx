"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading number="03." title="Experience" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row gap-8"
        >
          {/* Tabs */}
          <div className="relative md:w-48 shrink-0">
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-border">
              {experiences.map((exp, i) => (
                <button
                  key={exp.company}
                  onClick={() => setActiveTab(i)}
                  className={`relative px-6 py-3 text-left text-sm font-mono whitespace-nowrap transition-colors ${
                    activeTab === i
                      ? "text-accent"
                      : "text-muted hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  {activeTab === i && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 md:bottom-auto md:top-0 left-0 md:left-0 h-0.5 md:h-full w-full md:w-0.5 bg-accent"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {exp.company}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-sans text-xl font-bold">
                  {experiences[activeTab].role}{" "}
                  <span className="text-accent">
                    @ {experiences[activeTab].company}
                  </span>
                </h3>
                <p className="font-mono text-muted text-sm mt-1 mb-6">
                  {experiences[activeTab].period}
                </p>
                <ul className="space-y-4">
                  {experiences[activeTab].description.map((item, i) => (
                    <li key={i} className="flex gap-3 text-muted">
                      <span className="text-accent mt-1 shrink-0">
                        &#9656;
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
