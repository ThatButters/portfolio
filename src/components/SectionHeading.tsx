"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  number: string;
  title: string;
}

export default function SectionHeading({ number, title }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-4 mb-12"
    >
      <span className="font-mono text-accent text-lg">{number}</span>
      <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight">
        {title}
      </h2>
      <div className="hidden sm:block flex-1 h-px bg-border ml-4" />
    </motion.div>
  );
}
