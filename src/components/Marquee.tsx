"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { marqueeWords } from "@/data/portfolio";

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(0);

  useEffect(() => {
    function measure() {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        setOverflow(Math.max(0, contentWidth - containerWidth));
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative py-6 border-y border-border overflow-hidden"
    >
      <motion.div
        ref={contentRef}
        className="flex whitespace-nowrap"
        animate={
          overflow > 0
            ? { x: [0, -overflow, 0] }
            : {}
        }
        transition={
          overflow > 0
            ? {
                x: {
                  duration: 30,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop" as const,
                },
              }
            : undefined
        }
      >
        {marqueeWords.map((word, i) => (
          <span key={i} className="mx-6 font-mono text-sm text-muted">
            {word}
            <span className="text-accent ml-6">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
