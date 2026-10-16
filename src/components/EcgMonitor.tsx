"use client";

import { useEffect, useRef } from "react";

/*
  A bedside-monitor ECG trace.

  The waveform is a textbook PQRST complex built from Gaussian bumps
  (P wave, Q dip, tall R spike, S dip, rounded T wave). A write-head sweeps
  left to right drawing it, with a short erase gap ahead of the head that wipes
  the previous pass, the way a real monitor redraws. Older trace fades a little
  (phosphor decay). Heart rate wanders gently around ~72 bpm.

  - onBeat(bpm) fires on every R spike, so a readout can blink in sync.
  - Pauses when off screen or when the tab is hidden.
  - prefers-reduced-motion: draws one still trace and stops.
*/

type Props = {
  className?: string;
  /** paper speed: how fast the write-head travels, like a monitor's 25 mm/s */
  pxPerSecond?: number;
  baseBpm?: number;
  color?: string;
  lineWidth?: number;
  onBeat?: (bpm: number) => void;
  label?: string;
};

const WAVES = [
  { c: 0.1, w: 0.022, a: 0.11 }, // P
  { c: 0.205, w: 0.008, a: -0.1 }, // Q
  { c: 0.23, w: 0.009, a: 1.0 }, // R
  { c: 0.255, w: 0.01, a: -0.24 }, // S
  { c: 0.43, w: 0.045, a: 0.28 }, // T
];
const R_PHASE = 0.23;

function ecg(phase: number) {
  let v = 0;
  for (const { c, w, a } of WAVES) v += a * Math.exp(-((phase - c) ** 2) / (2 * w * w));
  return v;
}

export default function EcgMonitor({
  className = "",
  pxPerSecond = 190,
  baseBpm = 72,
  color = "#33e07a",
  lineWidth = 2,
  onBeat,
  label,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beatRef = useRef(onBeat);
  useEffect(() => {
    beatRef.current = onBeat;
  }, [onBeat]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let sweepSeconds = 1; // derived from width / pxPerSecond
    let height = 0;
    let dpr = 1;
    let samples: Float32Array = new Float32Array(0); // one value per CSS pixel column
    let stamps: Float32Array = new Float32Array(0); // when each column was written
    let head = 0; // column the write-head is on (fractional)
    let phase = 0; // position within the current beat, 0..1
    let bpm = baseBpm;
    let raf = 0;
    let last = 0;
    let visible = true;
    let clock = 0;
    let colBest = 0; // most extreme sample in the column being written
    let colFresh = -1; // which column colBest belongs to

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      sweepSeconds = width / pxPerSecond;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      samples = new Float32Array(width).fill(NaN);
      stamps = new Float32Array(width);
      // Pre-fill one full sweep so the monitor never starts (or resizes to) empty.
      const pxPerSec = width / sweepSeconds;
      for (let x = 0; x < width; x++) {
        const t = x / pxPerSec;
        samples[x] = ecg(((t * baseBpm) / 60) % 1);
        stamps[x] = clock - sweepSeconds + t;
      }
      head = 0;
      phase = 0;
      draw();
    };

    const yOf = (v: number) => {
      const mid = height * 0.7;
      return mid - v * height * 0.48;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;

      const gap = Math.max(14, width * 0.025);
      const h = Math.floor(head);
      // Draw in short runs so alpha can fade with age.
      const RUN = 12;
      for (let x0 = 0; x0 < width; x0 += RUN) {
        const x1 = Math.min(width - 1, x0 + RUN);
        const ahead = (x0 - h + width) % width;
        if (!reduce && ahead > 0 && ahead < gap) continue; // erase gap in front of the head
        const age = reduce ? 0 : (clock - stamps[x0]) / sweepSeconds;
        ctx.globalAlpha = Math.max(0.28, 1 - age * 0.7);
        ctx.beginPath();
        let started = false;
        for (let x = x0; x <= x1; x++) {
          const ax = (x - h + width) % width;
          if (!reduce && ax > 0 && ax < gap) break;
          const v = samples[x];
          if (Number.isNaN(v)) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(x, yOf(v));
            started = true;
          } else ctx.lineTo(x, yOf(v));
        }
        ctx.stroke();
      }

      if (!reduce) {
        // Glowing write-head
        const v = samples[h];
        if (!Number.isNaN(v)) {
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 14;
          ctx.fillStyle = "#eafff1";
          ctx.beginPath();
          ctx.arc(h, yOf(v), 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) {
        last = now;
        return;
      }
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      clock += dt;

      const pxPerSec = width / sweepSeconds;
      let px = pxPerSec * dt; // distance the head travels this frame
      while (px > 1e-6) {
        // advance to the next column boundary (or as far as this frame goes)
        const col = Math.floor(head);
        const dx = Math.min(px, col + 1 - head);
        const dPhase = (dx / pxPerSec) * (bpm / 60);
        // keep the most extreme value seen in this column, so narrow R spikes never get skipped
        for (let k = 1; k <= 4; k++) {
          const v = ecg((phase + (dPhase * k) / 4) % 1);
          if (colFresh !== col || Math.abs(v) > Math.abs(colBest)) {
            colBest = v;
            colFresh = col;
          }
        }
        const before = phase;
        phase += dPhase;
        if (before < R_PHASE && phase >= R_PHASE) beatRef.current?.(Math.round(bpm));
        if (phase >= 1) {
          phase -= 1;
          // gentle heart-rate variability
          bpm += (Math.random() - 0.5) * 3 + (baseBpm - bpm) * 0.15;
        }
        samples[col] = colBest + (Math.random() - 0.5) * 0.01;
        stamps[col] = clock;
        head += dx;
        px -= dx;
        if (head >= width) head -= width;
      }
      draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let io: IntersectionObserver | undefined;
    const onVis = () => (visible = document.visibilityState === "visible" && onScreen);
    let onScreen = true;
    if (!reduce) {
      io = new IntersectionObserver(([e]) => {
        onScreen = e.isIntersecting;
        onVis();
      });
      io.observe(canvas);
      document.addEventListener("visibilitychange", onVis);
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [pxPerSecond, baseBpm, color, lineWidth]);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
      {label && (
        <span className="absolute top-1 left-2 font-mono text-[10px] tracking-wider text-accent/70 pointer-events-none">
          {label}
        </span>
      )}
    </div>
  );
}
