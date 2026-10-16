import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/portfolio";

// The link-preview card shown when beeman.cloud is shared (LinkedIn, Slack, iMessage...).
export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0a0a0b",
          backgroundImage:
            "radial-gradient(circle at 15% 30%, rgba(233,115,22,0.18), transparent 45%), radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 24px 24px",
          color: "#e4e4e7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#e97316", letterSpacing: 4 }}>
          BEEMAN.CLOUD
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>
            Charles&nbsp;<span style={{ color: "#e97316" }}>Beeman</span>
          </div>
          <div style={{ display: "flex", fontSize: 40, color: "#a1a1aa", marginTop: 20 }}>
            {siteConfig.tagline}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#a1a1aa" }}>
          Full-stack developer · Nurse (LPN) · Technology at Buried in Work
        </div>
      </div>
    ),
    size,
  );
}
