"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import activity from "@/data/activity.json";
import SectionHeading from "./SectionHeading";

// One hue, getting brighter with volume (dark surface, so brighter = more).
const RAMP = ["#0f2a1a", "#145233", "#1c8a4c", "#2bc46a", "#8dffbd"];
const LEVELS = [1, 10, 30, 60, 100]; // lower bound of each step
const EMPTY = "#18181a";

const CELL = 12;
const GAP = 3;
const STEP = CELL + GAP;
const TOP = 20; // room for month labels
const LEFT = 28; // room for weekday labels

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function level(n: number) {
  let l = -1;
  LEVELS.forEach((min, i) => {
    if (n >= min) l = i;
  });
  return l;
}

const fmt = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

export default function Vitals() {
  const { year, asOf, total, days } = activity as {
    year: number;
    asOf: string;
    total: number;
    days: Record<string, number>;
  };
  const [hover, setHover] = useState<{ date: string; n: number; x: number; y: number } | null>(null);

  const data = useMemo(() => {
    const start = new Date(Date.UTC(year, 0, 1));
    const lead = start.getUTCDay(); // weekday of Jan 1, so week columns start on Sunday
    const cells: { date: string; n: number; col: number; row: number; future: boolean }[] = [];
    const monthCols: { label: string; col: number }[] = [];
    for (let d = new Date(start); d.getUTCFullYear() === year; d.setUTCDate(d.getUTCDate() + 1)) {
      const iso = d.toISOString().slice(0, 10);
      const idx = Math.round((d.getTime() - start.getTime()) / 86400000) + lead;
      const col = Math.floor(idx / 7);
      if (d.getUTCDate() === 1) monthCols.push({ label: MONTHS[d.getUTCMonth()], col });
      cells.push({ date: iso, n: days[iso] ?? 0, col, row: idx % 7, future: iso > asOf });
    }

    // Headline numbers
    const counts = Object.entries(days);
    const best = counts.reduce((a, b) => (b[1] > a[1] ? b : a), ["", 0] as [string, number]);
    let streak = 0;
    let run = 0;
    cells.forEach((c) => {
      if (c.future) return;
      run = c.n > 0 ? run + 1 : 0;
      streak = Math.max(streak, run);
    });
    const byMonth = new Array(12).fill(0);
    counts.forEach(([iso, n]) => (byMonth[Number(iso.slice(5, 7)) - 1] += n));
    const topMonth = byMonth.indexOf(Math.max(...byMonth));

    return {
      cells,
      monthCols,
      cols: cells[cells.length - 1].col + 1,
      activeDays: counts.length,
      best,
      streak,
      topMonth: { label: MONTHS[topMonth], n: byMonth[topMonth] },
    };
  }, [year, asOf, days]);

  const width = LEFT + data.cols * STEP;
  const height = TOP + 7 * STEP;

  const headline = [
    { value: total.toLocaleString(), label: `Contributions in ${year}` },
    { value: String(data.activeDays), label: "Days with a heartbeat" },
    { value: String(data.best[1]), label: `Best day · ${fmt(data.best[0])}` },
    { value: `${data.streak} days`, label: "Longest streak" },
  ];

  return (
    <section id="vitals" className="relative py-32 scroll-mt-16 overflow-x-clip">
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading number="04." title={`${year} Vitals`} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="max-w-2xl text-muted leading-relaxed mb-10">
            Every commit, pull request and review I made this year, across every repository I work in, public
            and private. Counts only, straight from GitHub. The quiet spring is real; so is the summer.
          </p>

          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-lg overflow-hidden border border-border bg-border mb-8">
            {headline.map((h) => (
              <div key={h.label} className="bg-card p-5">
                <dt className="sr-only">{h.label}</dt>
                <dd className="font-sans text-3xl font-bold text-accent">{h.value}</dd>
                <dd className="font-mono text-[11px] text-muted mt-1 tracking-wider uppercase">{h.label}</dd>
              </div>
            ))}
          </dl>

          <div className="relative rounded-lg border border-border bg-card/50 p-4 sm:p-6">
            <div className="overflow-x-auto -mx-1 px-1 pb-2">
              <svg
                viewBox={`0 0 ${width} ${height}`}
                className="min-w-[760px] w-full h-auto"
                role="img"
                aria-label={`Contribution heatmap for ${year}: ${total.toLocaleString()} contributions on ${data.activeDays} days, busiest month ${data.topMonth.label}, best day ${fmt(data.best[0])} with ${data.best[1]}.`}
                onMouseLeave={() => setHover(null)}
              >
                {data.monthCols.map((m) => (
                  <text key={m.label} x={LEFT + m.col * STEP} y={10} className="fill-muted font-mono" fontSize="9">
                    {m.label}
                  </text>
                ))}
                {["Mon", "Wed", "Fri"].map((d, i) => (
                  <text key={d} x={0} y={TOP + (1 + i * 2) * STEP + CELL - 2} className="fill-muted font-mono" fontSize="8">
                    {d}
                  </text>
                ))}

                {data.cells.map((c) => {
                  const l = level(c.n);
                  return (
                    <rect
                      key={c.date}
                      x={LEFT + c.col * STEP}
                      y={TOP + c.row * STEP}
                      width={CELL}
                      height={CELL}
                      rx={2.5}
                      fill={c.future ? "transparent" : l < 0 ? EMPTY : RAMP[l]}
                      stroke={c.future ? "#27272a" : hover?.date === c.date ? "#e4e4e7" : "none"}
                      strokeWidth={c.future ? 0.75 : 1.5}
                      onMouseEnter={() =>
                        !c.future &&
                        setHover({ date: c.date, n: c.n, x: LEFT + c.col * STEP + CELL / 2, y: TOP + c.row * STEP })
                      }
                    />
                  );
                })}

                {hover && (
                  <g pointerEvents="none" transform={`translate(${Math.min(Math.max(hover.x, 92), width - 92)}, ${Math.max(hover.y - 8, 26)})`}>
                    <rect x={-90} y={-24} width={180} height={20} rx={4} fill="#e4e4e7" />
                    <text x={0} y={-10} textAnchor="middle" fontSize="9.5" fill="#0a0a0b" className="font-mono">
                      {fmt(hover.date)} · {hover.n === 0 ? "no" : hover.n} contribution{hover.n === 1 ? "" : "s"}
                    </text>
                  </g>
                )}
              </svg>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-4 mt-4">
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted" aria-hidden="true">
                Less
                {[EMPTY, ...RAMP].map((c) => (
                  <span key={c} className="w-3 h-3 rounded-[3px]" style={{ background: c }} />
                ))}
                More
              </div>
            </div>
          </div>
          <p className="font-mono text-[11px] text-muted mt-3">Snapshot as of {fmt(asOf)}, {year}.</p>
        </motion.div>
      </div>
    </section>
  );
}
