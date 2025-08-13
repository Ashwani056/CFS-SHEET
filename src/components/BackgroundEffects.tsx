"use client";

import { motion } from "framer-motion";

interface BackgroundEffectsProps {
  className?: string;
}

export function BackgroundEffects({ className = "" }: BackgroundEffectsProps) {
  return (
    <>
      <motion.div
        aria-hidden
        className={"pointer-events-none absolute -top-40 -left-40 h-[38rem] w-[38rem] rounded-full bg-emerald-500/20 blur-[120px] " + className}
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[-12rem] right-[-12rem] h-[32rem] w-[32rem] rounded-full bg-cyan-500/10 blur-[110px]"
        animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1600\" height=\"900\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.35\"/></svg>')",
        }}
      />
    </>
  );
}
