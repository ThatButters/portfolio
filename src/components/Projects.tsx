"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { featuredProject, projects } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out p-4 sm:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-[90vw] max-h-[90vh] rounded-lg overflow-hidden border border-border shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={src}
            alt={alt}
            width={2880}
            height={1800}
            className="w-auto h-auto max-w-[90vw] max-h-[85vh] object-contain"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 border border-border flex items-center justify-center text-foreground hover:text-accent hover:border-accent/50 transition-colors"
            aria-label="Close preview"
          >
            &times;
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  return (
    <section id="projects" className="relative py-32">
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-accent/3 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading number="01." title="Featured Projects" />

        {/* Featured project */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="group relative mb-12 rounded-lg border border-border bg-card/50 backdrop-blur-sm p-8 hover:border-accent/30 transition-all duration-500 overflow-hidden"
        >
          {/* Animated top border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <p className="font-mono text-accent text-xs tracking-widest uppercase">
                Featured Project
              </p>
              <h3 className="font-sans text-2xl sm:text-3xl font-bold group-hover:text-accent transition-colors duration-300">
                {featuredProject.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {featuredProject.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {featuredProject.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 pt-4">
                <a
                  href={featuredProject.github}
                  className="text-muted hover:text-accent transition-colors"
                  aria-label="View source on GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon />
                </a>
                {featuredProject.live && (
                  <a
                    href={featuredProject.live}
                    className="text-muted hover:text-accent transition-colors"
                    aria-label="View live demo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalIcon />
                  </a>
                )}
              </div>
            </div>

            {/* Project preview */}
            <div className="lg:w-[400px] h-[250px] rounded-lg border border-border overflow-hidden group-hover:border-accent/20 group-hover:translate-x-1 transition-all duration-500">
              {featuredProject.image ? (
                <button
                  onClick={() =>
                    setLightboxImage({
                      src: featuredProject.image,
                      alt: `${featuredProject.title} screenshot`,
                    })
                  }
                  className="w-full h-full cursor-zoom-in"
                >
                  <Image
                    src={featuredProject.image}
                    alt={`${featuredProject.title} screenshot`}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent/10 via-accent/5 to-transparent flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-mono text-accent text-2xl mb-2">
                      &lt;/&gt;
                    </div>
                    <span className="font-mono text-muted text-xs">
                      Project Preview
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-lg border border-border bg-card/50 backdrop-blur-sm p-6 hover:border-accent/30 hover:-translate-y-1 transition-all duration-500"
            >
              {/* Animated top border */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-lg bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                {project.image && (
                  <button
                    onClick={() =>
                      setLightboxImage({
                        src: project.image!,
                        alt: `${project.title} screenshot`,
                      })
                    }
                    className="w-full rounded-md overflow-hidden border border-border mb-4 -mx-1 -mt-1 cursor-zoom-in block"
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      width={700}
                      height={400}
                      className="w-full h-[180px] object-cover object-top"
                    />
                  </button>
                )}
                <div className="flex justify-between items-start mb-4">
                  {!project.image ? (
                    <div className="w-10 h-10 rounded border border-border flex items-center justify-center text-accent font-mono text-sm group-hover:border-accent/50 transition-colors">
                      &lt;/&gt;
                    </div>
                  ) : (
                    <div />
                  )}
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        className="text-muted hover:text-accent transition-colors"
                        aria-label="View source on GitHub"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitHubIcon />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        className="text-muted hover:text-accent transition-colors"
                        aria-label="View live demo"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalIcon />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="font-sans text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs font-mono text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {lightboxImage && (
        <Lightbox
          src={lightboxImage.src}
          alt={lightboxImage.alt}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </section>
  );
}
