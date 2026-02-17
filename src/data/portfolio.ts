export const siteConfig = {
  name: "Charles Beeman",
  role: "Software Developer & AI Integration Specialist",
  tagline: "I build AI-powered apps and ship them.",
  description:
    "Full-stack developer and founder with 19+ years of IT expertise. I combine Python, Node.js, React, and LLM integration to take products from concept to production — containerized and deployed.",
  email: "beeman82@gmail.com",
  resumeUrl: "/resume.pdf",
  social: {
    github: "https://github.com/thatbutters",
    linkedin: "https://www.linkedin.com/in/charles-beeman-bab50b79/",
  },
};

export const stats = [
  { value: "19+", label: "Years in IT" },
  { value: "DAISY", label: "Award Winner" },
  { value: "SaaS", label: "Founder" },
];

export const navLinks = [
  { name: "Projects", href: "#projects" },
  { name: "Stack", href: "#stack" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export const marqueeWords = [
  "AI Integration",
  "Full-Stack Dev",
  "Python",
  "React",
  "Node.js",
  "Claude API",
  "Docker",
  "Flask",
  "LLM Engineering",
  "SaaS",
  "JavaScript",
  "SQL",
  "PowerShell",
  "Django REST",
  "Linux",
  "VPS Deploy",
  "Prompt Engineering",
  "Home Automation",
  "Networking",
  "Database Admin",
];

export const featuredProject = {
  title: "ForgetMeNots.net",
  description:
    "A SaaS platform empowering users to compose and schedule heartfelt messages for delivery to loved ones. Solely developed and launched end-to-end with secure data handling for sensitive content, intuitive UI/UX, deployment pipelines, and monitoring for long-term reliability.",
  tech: ["Node.js", "React", "Docker", "VPS"],
  github: "https://github.com/thatbutters/forgetmenots",
  live: "https://forgetmenots.net",
  image: "/images/projects/forgetmenots.png",
};

export const projects: {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  image?: string;
}[] = [
  {
    title: "Roast My Code",
    description:
      "AI-powered code review tool using Flask and the Anthropic Claude API. Features multiple review modes (Standard Roast, Serious Review, Statler & Waldorf), budget tracking, rate limiting, and shareable roast URLs with scores.",
    tech: ["Python", "Flask", "Claude API", "Docker"],
    github: "https://github.com/thatbutters/roastmycode",
    live: "https://roastmycode.beeman.cloud",
    image: "/images/projects/roastmycode.png",
  },
  {
    title: "Party Jukebox",
    description:
      "Web-based music player built with Flask, yt-dlp, and pygame.mixer featuring a vintage retro-styled interface. Iterated from desktop prototype to full web app with real-time playback controls.",
    tech: ["Python", "Flask", "yt-dlp", "pygame"],
    github: "https://github.com/thatbutters/party-jukebox",
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
    { name: "JavaScript", icon: "JS" },
    { name: "HTML/CSS", icon: "HTM" },
    { name: "PowerShell", icon: "PS" },
    { name: "SQL", icon: "SQL" },
  ],
  "Frameworks": [
    { name: "React", icon: "RCT" },
    { name: "Flask", icon: "FLK" },
    { name: "Node.js", icon: "NJS" },
    { name: "Django REST", icon: "DRF" },
  ],
  "AI & LLMs": [
    { name: "Claude API", icon: "CLD" },
    { name: "Prompt Eng.", icon: "PRO" },
    { name: "Claude Code", icon: "CC" },
  ],
  "Infra & Tools": [
    { name: "Linux", icon: "LNX" },
    { name: "Docker", icon: "DKR" },
    { name: "GitHub", icon: "GIT" },
    { name: "MySQL", icon: "SQL" },
    { name: "SQLite", icon: "SLT" },
    { name: "VPS Deploy", icon: "VPS" },
  ],
};

export const experiences = [
  {
    company: "ForgetMeNots",
    role: "Founder & Full-Stack Developer",
    period: "Jan 2026 — Present",
    description: [
      "Solely developed and launched a SaaS platform for composing and scheduling heartfelt messages for delivery to loved ones",
      "Architected and built the full platform end-to-end using Node.js and React with secure data handling for sensitive content",
      "Designed intuitive UI/UX, set up hosting, deployment pipelines, and monitoring for long-term reliability",
      "Iterated on core product based on real user feedback and emotional use-case considerations",
    ],
  },
  {
    company: "Beeman CS",
    role: "IT Support Specialist & Software Developer",
    period: "2006 — Present",
    description: [
      "Provide desktop support, network management, and hardware/software troubleshooting for diverse client base",
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
