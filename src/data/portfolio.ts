export const siteConfig = {
  name: "Charles Beeman",
  url: "https://beeman.cloud",
  role: "Full-Stack Developer · Nurse (LPN)",
  tagline: "Code with a pulse.",
  subline:
    "Twenty years at the bedside, nineteen in IT. I build software that feels human.",
  description:
    "I lead technology at Buried in Work, where I build and run eight public sites that help families plan ahead, get through a death, and keep their stories. Before and alongside that: a career caring for medically complex kids, and a small IT business that's been fixing things since 2006.",
  social: {
    github: "https://github.com/thatbutters",
    linkedin: "https://www.linkedin.com/in/charles-beeman-bab50b79/",
  },
};

// Hero readouts, styled like bedside-monitor numerics (label, value, unit, channel colour).
export const stats = [
  { label: "Bedside", value: "20", unit: "yrs", sub: "LPN since 2006", tone: "accent" },
  { label: "IT", value: "19+", unit: "yrs", sub: "since 2003", tone: "cyan" },
  { label: "DAISY", value: "2020", unit: "", sub: "Extraordinary Nurse", tone: "amber" },
] as { label: string; value: string; unit: string; sub: string; tone: "accent" | "cyan" | "amber" }[];

// Section numbers match the headings on the page (Stack, 05, is left out of the nav for room).
export const navLinks = [
  { name: "Buried in Work", href: "#biw", number: "01" },
  { name: "Two Careers", href: "#story", number: "02" },
  { name: "Projects", href: "#projects", number: "03" },
  { name: "Vitals", href: "#vitals", number: "04" },
  { name: "Experience", href: "#experience", number: "06" },
  { name: "Contact", href: "#contact", number: "07" },
];

export const marqueeWords = [
  "AI Integration",
  "Full-Stack Dev",
  "Python",
  "TypeScript",
  "React",
  "Node.js",
  "Claude API",
  "Claude Code",
  "PostgreSQL",
  "Docker",
  "Flask",
  "FastAPI",
  "LLM Engineering",
  "RAG & Search",
  "Playwright",
  "GitHub Actions",
  "React Router",
  "Prisma",
  "MCP Servers",
  "WebRTC",
  "Privacy by Design",
  "SaaS",
  "Linux",
  "Prompt Engineering",
  "Home Automation",
  "Networking",
];

/* ── Buried in Work ─────────────────────────────────────────────
   Public-facing only: what the products do and numbers already visible
   on the sites. No hosting, infrastructure, or security internals. */

export const biw = {
  intro:
    "Buried in Work is Adam Zuckerman's estate-planning and end-of-life company. I'm its technology lead: I design, build, and run the sites, from the products families use to the tooling we run the business on. In 2026 that meant taking it from a single WordPress site to a family of custom apps that share one design system and one codebase.",
  stats: [
    { value: "8", label: "Public sites" },
    { value: "4,000+", label: "Pull requests merged in 2026" },
    { value: "56,000", label: "Directory listings" },
    { value: "1,800", label: "Articles migrated, every URL kept" },
  ],
  products: [
    {
      title: "Buried in Work",
      tagline: "Practical help for planning ahead and for what happens after a death.",
      description:
        "Rebuilt from WordPress into a custom app in October 2026 with every old address redirected. Information hubs that meet people at their hardest moment, a searchable directory of end-of-life professionals with paid listings, a signed-in planning workspace, CLEAR Kit Online for the company's flagship organizer, and an AI search box and guide that answer from the site's own library and cite what they used.",
      tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "Shopify", "LLM retrieval"],
      live: "https://buriedinwork.com",
      image: "/images/projects/buriedinwork.webp",
    },
    {
      title: "Heirloom & Tell",
      tagline: "A private place for a family's stories, photos, recipes, and belongings.",
      description:
        "A membership product where a parent or grandparent answers guided prompts by text, voice, video, or photo, and family read along and ask questions. AI interview follow-ups draw out names and details but never write the story. Privacy is the premise: per-person encryption, passwordless sign-in, voice transcribed on our own servers, a keepsake that opens offline, and we delete our copy.",
      tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "Claude API", "Speech-to-text"],
      live: "https://heirloomandtell.com",
      image: "/images/projects/heirloomandtell.webp",
    },
    {
      title: "AuthorChecklist",
      tagline: "The book-publishing checklist nobody handed you.",
      description:
        "A free reference for authors plus public author profiles, paid per-book workspaces, and a publisher portal. It was the template the Buried in Work rebuild was cut from, and the two now live in one shared codebase.",
      tech: ["TypeScript", "React", "Node.js", "PostgreSQL"],
      live: "https://authorchecklist.com",
      image: "/images/projects/authorchecklist.webp",
    },
  ],
  satellites: [
    { title: "endoflifecareers.org", note: "Careers in the end-of-life field", live: "https://endoflifecareers.org" },
    { title: "return.org", note: "Provider finder built on the BIW directory", live: "https://return.org" },
    { title: "buriedinwork.org", note: "The charitable side", live: "https://buriedinwork.org" },
    { title: "adamzuckerman.com", note: "Founder's site", live: "https://adamzuckerman.com" },
  ],
  practices: [
    "One shared component library and design language, so every site reads as one company",
    "Automated tests and required checks on every change; nothing merges red",
    "Zero-downtime deploys: the old version keeps serving until the new one is healthy",
    "AI-assisted development with Claude Code, run under written standards and review gates",
    "AI that suggests and cites, never decides: no model-computed numbers, no auto-sent replies",
  ],
};

/* ── Own projects ───────────────────────────────────────────── */

export const featuredProject: {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  status?: string;
  image?: string;
} = {
  title: "ForgetMeNots.net",
  description:
    "A SaaS platform for composing and scheduling heartfelt messages for delivery to loved ones. Solely developed and launched end-to-end with secure handling for sensitive content, intuitive UI/UX, deployment pipelines, and monitoring for long-term reliability.",
  tech: ["Node.js", "React", "Docker", "VPS"],
  status: "Parked",
  image: "/images/projects/forgetmenots.png",
};

export const projects: {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  status?: string;
  image?: string;
}[] = [
  {
    title: "3Dify",
    description:
      "Converts a photo into a 3D-printable STL using Hunyuan3D 2.1 running on a self-hosted RTX 5070 Ti. Web interface on a VPS, communicates with the GPU over WebSocket: upload a photo, and a graphics card in Phoenix, AZ builds your object into 3D geometry in real time.",
    tech: ["Hunyuan3D 2.1", "FastAPI", "React", "PostgreSQL", "WebSocket", "Docker"],
    github: "https://github.com/ThatButters/3Dify",
    status: "Offline for now",
    image: "/images/projects/3dify.png",
  },
  {
    title: "Roast My Code",
    description:
      "AI-powered code review tool using Flask and the Anthropic Claude API. Multiple review modes (Standard Roast, Serious Review, Statler & Waldorf), budget tracking, rate limiting, and shareable roast URLs with scores, at about a third of a cent per review.",
    tech: ["Python", "Flask", "Claude API", "Docker"],
    github: "https://github.com/ThatButters/roast-my-code",
    live: "https://roastmycode.beeman.cloud",
    image: "/images/projects/roastmycode.png",
  },
  {
    title: "Party Jukebox",
    description:
      "Web-based music player built with Flask, yt-dlp, and pygame.mixer with a vintage retro-styled interface. Iterated from desktop prototype to full web app with real-time playback controls.",
    tech: ["Python", "Flask", "yt-dlp", "pygame"],
    github: "https://github.com/ThatButters/party-jukebox",
    image: "/images/projects/partyjukebox.png",
  },
  {
    title: "Sound-Reactive Dimmer",
    description:
      "Home automation tool with audio classification that automatically dims screens based on sound detection. Integrates with Blue Iris for smart home camera management.",
    tech: ["Python", "Audio ML", "Blue Iris"],
  },
  {
    title: "Receipt Automation",
    description:
      "Automated pipeline for bulk expense categorization and reimbursement processing. Streamlines receipt sorting and financial record-keeping.",
    tech: ["Python", "Automation"],
  },
];

export const techStack = {
  "Languages & Web": [
    { name: "Python", icon: "PY" },
    { name: "TypeScript", icon: "TS" },
    { name: "JavaScript", icon: "JS" },
    { name: "SQL", icon: "SQL" },
    { name: "HTML/CSS", icon: "HTM" },
    { name: "PowerShell", icon: "PS" },
  ],
  Frameworks: [
    { name: "React", icon: "RCT" },
    { name: "React Router", icon: "RR" },
    { name: "Next.js", icon: "NXT" },
    { name: "Express", icon: "EXP" },
    { name: "Flask", icon: "FLK" },
    { name: "FastAPI", icon: "FST" },
    { name: "Tailwind", icon: "TW" },
    { name: "Django REST", icon: "DRF" },
  ],
  "AI & LLMs": [
    { name: "Claude API", icon: "CLD" },
    { name: "Claude Code", icon: "CC" },
    { name: "MCP Servers", icon: "MCP" },
    { name: "RAG & Search", icon: "RAG" },
    { name: "Speech-to-Text", icon: "STT" },
    { name: "Prompt Eng.", icon: "PRO" },
  ],
  "Data, Infra & Testing": [
    { name: "PostgreSQL", icon: "PG" },
    { name: "Prisma", icon: "PRS" },
    { name: "Docker", icon: "DKR" },
    { name: "Linux", icon: "LNX" },
    { name: "GitHub Actions", icon: "GHA" },
    { name: "Playwright", icon: "PW" },
    { name: "Vitest", icon: "VT" },
    { name: "LiveKit (WebRTC)", icon: "RTC" },
  ],
};

export const experiences = [
  {
    company: "Buried in Work",
    role: "Technology",
    period: "2026 — Present",
    description: [
      "Lead technology for an estate-planning and end-of-life company: Buried in Work, Heirloom & Tell, AuthorChecklist, and five smaller sites, all in production",
      "Moved buriedinwork.com off WordPress to a custom app with no reader-facing downtime: 1,800 articles and 56,000 directory listings carried over, every old URL redirected",
      "Built Heirloom & Tell, a privacy-first family-history product with per-person encryption, on-server transcription, and AI interview follow-ups",
      "Unified the sites into one shared codebase and design system, with automated tests, required checks, and zero-downtime deploys on every merge",
      "Run an AI-assisted development workflow with Claude Code under written standards and review gates: 4,000+ pull requests merged in 2026",
    ],
  },
  {
    company: "ForgetMeNots",
    role: "Founder & Full-Stack Developer",
    period: "Jan 2026 — Present",
    description: [
      "Solely developed and launched a SaaS platform for composing and scheduling heartfelt messages for delivery to loved ones",
      "Architected and built the full platform end-to-end using Node.js and React with secure data handling for sensitive content",
      "Designed the UI/UX, set up hosting, deployment pipelines, and monitoring for long-term reliability",
      "Iterated on the core product based on real user feedback and emotional use-case considerations",
    ],
  },
  {
    company: "Beeman CS",
    role: "IT Support Specialist & Software Developer",
    period: "2006 — Present",
    description: [
      "Provide desktop support, network management, and hardware/software troubleshooting for a diverse client base",
      "Develop Python-based tools and automation scripts to streamline workflows and solve client challenges",
      "Manage database administration, web development projects, and data recovery operations",
    ],
  },
  {
    company: "Thrive / DHS",
    role: "Private Duty Nurse (LPN)",
    period: "2007 — Present",
    description: [
      "Recipient of the DAISY Award for Extraordinary Nurses (2020), recognized for excellence and 11+ years of dedicated care",
      "Independently manage complex patient care including ventilators, tracheostomies, and wound management",
      "Apply critical thinking and rapid decision-making in high-stakes, autonomous work environments",
    ],
  },
];

/* ── Two careers ────────────────────────────────────────────── */

export const story = {
  lead:
    "I've been a nurse for twenty years and in IT for nineteen. People hear that and assume two different jobs. They're the same job: someone is depending on a system to keep working, and you're the one watching it.",
  timeline: [
    { year: "2001", lane: "it", text: "Starts an Information Science & Technology degree" },
    { year: "2003", lane: "it", text: "Network specialist: support for about 150 users, Cisco routers, backups" },
    { year: "2005", lane: "care", text: "Nursing school" },
    { year: "2006", lane: "it", text: "Opens Beeman Computer Services" },
    { year: "2006", lane: "care", text: "Licensed Practical Nurse" },
    { year: "2007", lane: "care", text: "Private-duty pediatric nursing: ventilators, trachs, wound care" },
    { year: "2020", lane: "care", text: "DAISY Award for Extraordinary Nurses" },
    { year: "2026", lane: "it", text: "Ships ForgetMeNots, then takes on technology at Buried in Work" },
    { year: "2026", lane: "both", text: "Both at once: software for the hardest days a family has" },
  ] as { year: string; lane: "it" | "care" | "both"; text: string }[],
  lessons: [
    {
      title: "Watch the patient, not the monitor.",
      body: "A monitor can read normal while the patient in the bed isn't. A green status code isn't proof something works either. I check the real outcome: did the email arrive, did the page load, did the person get what they came for.",
    },
    {
      title: "If you didn't chart it, it didn't happen.",
      body: "Every shift ends with a handoff someone else can pick up cold. I write code, commit history, and decisions the same way: for whoever comes next, including me at 3am.",
    },
    {
      title: "When in doubt, alarm.",
      body: "A good alarm would rather be wrong loudly than right too late. What I build fails safe: if it can't be sure someone should see something, they don't, and a person finds out why.",
    },
    {
      title: "Remember who's in the room.",
      body: "The person on the other side of the screen is often scared, grieving, or running on no sleep. So the AI in our products suggests and cites but never decides, and never speaks for a family.",
    },
  ],
};
