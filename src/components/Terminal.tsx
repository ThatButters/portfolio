"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import activity from "@/data/activity.json";
import { biw, experiences, projects, featuredProject, siteConfig, story, techStack } from "@/data/portfolio";

/* A hidden terminal. Open with ~ or ` (or the >_ button), close with Esc or `exit`. */

type Line = { kind: "in" | "out" | "err" | "accent"; text: string };

const PROMPT = "charlie@beeman.cloud:~$";

const LINKS: Record<string, string> = {
  biw: "https://buriedinwork.com",
  buriedinwork: "https://buriedinwork.com",
  ht: "https://heirloomandtell.com",
  heirloom: "https://heirloomandtell.com",
  ac: "https://authorchecklist.com",
  authorchecklist: "https://authorchecklist.com",
  roast: "https://roastmycode.beeman.cloud",
  github: siteConfig.social.github,
  linkedin: siteConfig.social.linkedin,
};

const FILES: Record<string, string> = {
  "about.txt": `${siteConfig.name}. ${siteConfig.tagline}\n${siteConfig.subline}\n\n${siteConfig.description}`,
  "story.txt": story.lead + "\n\n" + story.lessons.map((l, i) => `${i + 1}. ${l.title}\n   ${l.body}`).join("\n\n"),
  "stack.txt": Object.entries(techStack)
    .map(([k, v]) => `${k.padEnd(22)} ${v.map((x) => x.name).join(", ")}`)
    .join("\n"),
  "projects.md": [featuredProject, ...projects]
    .map((p) => `- ${p.title}${p.status ? ` [${p.status.toLowerCase()}]` : ""}`)
    .join("\n"),
  "biw.md": biw.products.map((p) => `- ${p.title}: ${p.tagline} (${p.live})`).join("\n"),
  ".secrets": "Nice try.",
};

const HELP = `Commands:
  whoami            who is this guy
  ls                list files
  cat <file>        read a file           (try: cat about.txt)
  experience        where I've worked
  pulse             vitals check
  open <name>       biw | ht | ac | roast | github | linkedin
  neofetch          the obligatory one
  contact           how to reach me
  sudo hire charlie you know you want to
  history | clear | exit`;

const vitals = activity as { year: number; total: number; days: Record<string, number> };
const best = Object.entries(vitals.days).reduce((a, b) => (b[1] > a[1] ? b : a), ["", 0] as [string, number]);

const BEAT = "___/\\__|\\  /\\____";

function run(raw: string, history: string[]): { out: Line[]; clear?: boolean; close?: boolean } {
  const cmd = raw.trim();
  const [name, ...args] = cmd.split(/\s+/);
  const arg = args.join(" ");
  const out = (text: string, kind: Line["kind"] = "out") => ({ out: [{ kind, text }] });

  switch (name?.toLowerCase()) {
    case "":
      return { out: [] };
    case "help":
    case "?":
      return out(HELP);
    case "whoami":
      return out(`${siteConfig.name}\n${siteConfig.role}\n${siteConfig.tagline}`, "accent");
    case "ls":
      return out(Object.keys(FILES).filter((f) => arg.includes("-a") || !f.startsWith(".")).join("    "));
    case "cat":
      if (!arg) return out("cat: which file? (try `ls`)", "err");
      return FILES[arg] ? out(FILES[arg]) : out(`cat: ${arg}: No such file or directory`, "err");
    case "experience":
      return out(experiences.map((e) => `${e.period.padEnd(20)} ${e.role} @ ${e.company}`).join("\n"));
    case "pulse":
    case "vitals":
      return {
        out: [
          { kind: "accent", text: BEAT.repeat(4) },
          {
            kind: "out",
            text: `HR: steady.  ${vitals.total.toLocaleString()} contributions in ${vitals.year}.\nPeak: ${best[1]} on ${best[0]}.  ${Object.keys(vitals.days).length} days with a heartbeat.\nPatient is alive and shipping.`,
          },
        ],
      };
    case "open": {
      const url = LINKS[arg.toLowerCase()];
      if (!url) return out(`open: unknown target "${arg}". Try: ${Object.keys(LINKS).filter((k, i, a) => a.indexOf(k) === i).slice(0, 9).join(", ")}`, "err");
      window.open(url, "_blank", "noopener,noreferrer");
      return out(`Opening ${url} ...`);
    }
    case "contact":
      return out(`LinkedIn is the best way to reach me:\n${siteConfig.social.linkedin}`);
    case "neofetch":
      return out(
        [
          "   ___    charlie@beeman.cloud",
          "  /   \\   ---------------------",
          ` | <3  |  OS: Human, 20 yrs bedside uptime`,
          "  \\___/   Shell: bash, PowerShell, bedside manner",
          "   |||    Languages: Python, TypeScript, sarcasm",
          `          Stack: React, Node, Flask, Docker, Claude`,
          `          Commits ${vitals.year}: ${vitals.total.toLocaleString()}`,
          "          Awards: DAISY (2020)",
          "          Coffee: critical",
        ].join("\n"),
        "accent",
      );
    case "sudo":
      if (/hire\s+charlie/i.test(arg)) {
        setTimeout(() => window.open(siteConfig.social.linkedin, "_blank", "noopener,noreferrer"), 900);
        return {
          out: [
            { kind: "out", text: "[sudo] password for recruiter: ********" },
            { kind: "accent", text: "Permission granted. Excellent decision. Opening LinkedIn ..." },
          ],
        };
      }
      return out(`${arg || "that"}: you're not in the sudoers file. This incident will be charted.`, "err");
    case "rm":
      return out("Nice try. I've worked enough night shifts to know where the backups are.", "err");
    case "vim":
    case "vi":
    case "nano":
      return out("You're stuck in vim now. (Kidding. Nobody's ever left, though.)");
    case "coffee":
    case "brew":
      return out("418 I'm a teapot. Brewing anyway... done. ☕");
    case "hello":
    case "hi":
    case "hey":
      return out("Hey! Type `help` to look around.");
    case "date":
      return out(new Date().toString());
    case "echo":
      return out(arg);
    case "history":
      return out(history.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`).join("\n") || "(empty)");
    case "git":
      return arg.startsWith("log")
        ? out("2026-10-06  buriedinwork.com leaves WordPress\n2026-06-17  Heirloom & Tell: first commit\n2026-02-17  this site: first commit\n2006-..-..  Beeman Computer Services opens\n2006-..-..  LPN license")
        : out(`git: '${arg}' is not something I'll do on a portfolio site.`, "err");
    case "clear":
    case "cls":
      return { out: [], clear: true };
    case "exit":
    case "quit":
    case "logout":
      return { out: [], close: true };
    default:
      return out(`${name}: command not found. Type \`help\`.`, "err");
  }
}

const COMMANDS = ["help", "whoami", "ls", "cat", "experience", "pulse", "open", "neofetch", "contact", "sudo hire charlie", "history", "clear", "exit"];

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const show = useCallback(() => {
    opener.current = document.activeElement as HTMLElement;
    setOpen(true);
    setLines((l) =>
      l.length
        ? l
        : [
            { kind: "accent", text: "beeman.cloud terminal. You found it." },
            { kind: "out", text: "Type `help` to see what you can do." },
          ],
    );
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
    opener.current?.focus?.();
  }, []);

  // ~ or ` toggles, unless the visitor is typing in a field
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = t !== inputRef.current && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
      if ((e.key === "`" || e.key === "~") && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        if (open) hide();
        else show();
      } else if (e.key === "Escape" && open) {
        hide();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, show, hide]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const submit = () => {
    const cmd = input;
    const nextHistory = cmd.trim() ? [...history, cmd] : history;
    const res = run(cmd, nextHistory);
    setHistory(nextHistory);
    setCursor(-1);
    setInput("");
    if (res.close) return hide();
    setLines((l) => (res.clear ? [] : [...l, { kind: "in", text: cmd }, ...res.out]));
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const c = cursor < 0 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(c);
      setInput(history[c]);
    } else if (e.key === "ArrowDown" && cursor >= 0) {
      e.preventDefault();
      const c = cursor + 1;
      if (c >= history.length) {
        setCursor(-1);
        setInput("");
      } else {
        setCursor(c);
        setInput(history[c]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const [cmd, ...rest] = input.split(" ");
      const pool = rest.length ? (cmd === "cat" ? Object.keys(FILES) : cmd === "open" ? Object.keys(LINKS) : []) : COMMANDS;
      const partial = rest.length ? rest.join(" ") : cmd;
      const hits = pool.filter((c) => c.startsWith(partial));
      if (hits.length === 1) setInput(rest.length ? `${cmd} ${hits[0]}` : hits[0]);
      else if (hits.length > 1) setLines((l) => [...l, { kind: "in", text: input }, { kind: "out", text: hits.join("    ") }]);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <>
      <button
        onClick={show}
        className="fixed bottom-5 right-5 z-40 w-11 h-11 rounded-lg border border-border bg-card/80 backdrop-blur font-mono text-sm text-muted hover:text-accent hover:border-accent/50 transition-colors"
        aria-label="Open terminal (shortcut: ~)"
        title="Open terminal (~)"
      >
        &gt;_
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-6"
            onMouseDown={(e) => e.target === e.currentTarget && hide()}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Terminal"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-full sm:max-w-3xl h-[75vh] sm:h-[520px] flex flex-col rounded-t-xl sm:rounded-xl border border-border bg-[#0c0c0d] shadow-[0_30px_120px_rgba(0,0,0,0.7)] overflow-hidden"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card">
                <button onClick={hide} aria-label="Close terminal" className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" aria-hidden="true" />
                <span className="ml-3 font-mono text-xs text-muted">charlie@beeman.cloud — bash</span>
              </div>

              <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed" aria-live="polite">
                {lines.map((l, i) => (
                  <pre
                    key={i}
                    className={`whitespace-pre-wrap break-words font-mono ${
                      l.kind === "in" ? "text-foreground" : l.kind === "err" ? "text-red-400" : l.kind === "accent" ? "text-accent" : "text-muted"
                    }`}
                  >
                    {l.kind === "in" ? (
                      <>
                        <span className="text-accent">{PROMPT}</span> {l.text}
                      </>
                    ) : (
                      l.text
                    )}
                  </pre>
                ))}
                <div className="flex items-center gap-2">
                  <label htmlFor="term-input" className="text-accent shrink-0">
                    {PROMPT}
                  </label>
                  <input
                    id="term-input"
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onInputKey}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                    className="flex-1 min-w-0 bg-transparent outline-none text-foreground caret-accent"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
