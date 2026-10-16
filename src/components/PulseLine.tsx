// A heart-monitor trace: a dim ECG line with a bright sweep running across it.
// Pure SVG + CSS animation; the global reduced-motion rule freezes the sweep.

const BEAT = "l60 0 l6 -4 l6 4 l8 0 l4 4 l6 -30 l6 48 l6 -22 l16 0 l10 -8 l12 8 l60 0";
const BEATS = 5;
const d = `M0 30 ${Array(BEATS).fill(BEAT).join(" ")}`;

export default function PulseLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${200 * BEATS} 60`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path d={d} pathLength={1000} fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <path
        d={d}
        pathLength={1000}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="pulse-sweep"
      />
    </svg>
  );
}
