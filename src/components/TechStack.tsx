"use client";

import { motion } from "framer-motion";
import { techStack } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

export default function TechStack() {
  const categories = Object.entries(techStack);

  // Bento grid layout: first category spans 2 cols + 2 rows, others fill in
  return (
    <section id="stack" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading number="02." title="Tech Stack" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map(([category, items], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: catIndex * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className={`rounded-lg border border-border bg-card/50 backdrop-blur-sm p-6 hover:border-accent/20 transition-colors duration-500 ${
                catIndex === 0
                  ? "md:col-span-2 lg:col-span-2 lg:row-span-2"
                  : catIndex === 1
                    ? "lg:col-span-2"
                    : ""
              }`}
            >
              <h3 className="font-mono text-accent text-xs tracking-widest uppercase mb-6">
                {category}
              </h3>
              <div
                className={`grid gap-3 ${catIndex === 0 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"}`}
              >
                {items.map((item) => (
                  <div
                    key={item.name}
                    className="group/item flex items-center gap-3 p-3 rounded border border-transparent hover:border-border hover:bg-card-hover transition-all duration-300"
                  >
                    <span className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center font-mono text-accent text-xs font-bold shrink-0 group-hover/item:bg-accent/20 transition-colors duration-300">
                      {item.icon}
                    </span>
                    <span className="text-sm text-muted group-hover/item:text-foreground transition-colors duration-300">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
