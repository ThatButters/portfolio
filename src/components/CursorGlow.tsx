"use client";

import { useEffect, useState, useCallback } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setVisible(true);
  }, []);

  useEffect(() => {
    // Only show on devices with fine pointer (no touch)
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="absolute h-[600px] w-[600px] rounded-full"
        style={{
          left: position.x - 300,
          top: position.y - 300,
          background:
            "radial-gradient(circle, rgba(233,115,22,0.06) 0%, rgba(233,115,22,0.02) 30%, transparent 70%)",
        }}
      />
    </div>
  );
}
