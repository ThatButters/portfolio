import { marqueeWords } from "@/data/portfolio";

export default function Marquee() {
  // Duplicate for seamless loop
  const words = [...marqueeWords, ...marqueeWords];

  return (
    <div className="relative py-6 border-y border-border overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {words.map((word, i) => (
          <span key={i} className="mx-6 font-mono text-sm text-muted">
            {word}
            <span className="text-accent ml-6">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
