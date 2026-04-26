"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { BootCopy } from "@/lib/portfolio-data";

type BootSequenceProps = {
  onComplete: () => void;
  reducedMotion?: boolean;
  copy: BootCopy;
};

export function BootSequence({ onComplete, reducedMotion = false, copy }: BootSequenceProps) {
  useEffect(() => {
    const timeout = window.setTimeout(onComplete, reducedMotion ? 180 : 1150);
    return () => window.clearTimeout(timeout);
  }, [onComplete, reducedMotion]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className="pointer-events-none fixed inset-0 z-[120] flex items-center justify-center bg-[#060909]"
      aria-hidden
    >
      <div className="w-[min(640px,88vw)] rounded-2xl border border-[#1b2a28] bg-[#0b1110] p-6 text-[#b8cbc7] shadow-[0_22px_60px_-32px_rgba(0,0,0,0.85)]">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#7b9791]">Hasan OS</p>
        <p className="mt-2 text-sm sm:text-base">{copy.initMessage}</p>

        <div className="mt-6 h-2 overflow-hidden rounded-full border border-[#24423c] bg-[#0e1615]">
          <motion.span
            className="block h-full bg-[linear-gradient(90deg,#1f7657,#6dc1a5)]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: reducedMotion ? 0.2 : 1.05, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="mt-5 grid gap-2 font-mono text-[0.72rem] text-[#8eaca4] sm:grid-cols-2">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.06 }}>
            {copy.steps[0]}
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.14 }}>
            {copy.steps[1]}
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}>
            {copy.steps[2]}
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            {copy.steps[3]}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
