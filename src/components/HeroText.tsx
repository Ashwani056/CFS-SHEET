"use client";

import { motion } from "framer-motion";

interface HeroTextProps {
  className?: string;
}

export function HeroText({ className = "" }: HeroTextProps) {
  return (
    <div className={"text-center " + className}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl text-6xl font-semibold leading-[1.15] tracking-tight sm:text-7xl lg:text-8xl"
      >
        We turn <span className="text-emerald-400">complex</span> into simple
        <br className="hidden sm:block" />
        — and simple into{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
          mastery
        </span>
        .
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="mx-auto mt-6 max-w-2xl text-base text-neutral-400"
      >
        Get ready to ace your interviews with battle‑tested tracks in DSA & System Design.
        <br className="hidden sm:block" />
        No fluff. Just outcomes.
      </motion.p>
    </div>
  );
}
