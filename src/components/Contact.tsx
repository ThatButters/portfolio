"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="relative py-32">
      {/* Background gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <p className="font-mono text-accent text-sm tracking-widest">
            04. What&apos;s Next?
          </p>
          <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Let&apos;s Build
            <br />
            <span className="text-accent">Something Great</span>
          </h2>
          <p className="text-muted max-w-md mx-auto text-lg leading-relaxed">
            I&apos;m always open to new opportunities and interesting projects.
            Whether you have a question or just want to say hi, my inbox is
            always open.
          </p>
          <div className="pt-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-block px-8 py-4 font-mono text-sm text-accent border border-accent rounded hover:bg-accent/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(233,115,22,0.15)]"
            >
              Say Hello
            </a>
          </div>
          <div className="flex justify-center gap-6 pt-8">
            {Object.entries(siteConfig.social).map(([name, url]) => (
              <a
                key={name}
                href={url}
                className="text-muted hover:text-accent transition-colors font-mono text-sm capitalize"
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
