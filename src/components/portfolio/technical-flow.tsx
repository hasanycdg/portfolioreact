"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { title: "Client goal", detail: "Requirements + constraints" },
  { title: "Build layer", detail: "Code, APIs, and plugin logic" },
  { title: "Production result", detail: "Fast, measurable, maintainable" },
];

export function TechnicalFlow() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="card-surface rounded-2xl border border-line p-5 sm:p-6">
      <p className="eyebrow">System View</p>
      <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-ink">
        From problem to shipped product
      </h2>

      <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-stretch">
        {nodes.map((node, index) => (
          <div key={node.title} className="contents">
            <motion.article
              className="rounded-xl border border-line bg-white/90 p-4"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      borderColor: ["rgba(212,218,210,1)", "rgba(31,118,87,0.55)", "rgba(212,218,210,1)"],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 2.8,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.34,
                      ease: "easeInOut",
                    }
              }
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">{`0${index + 1}`}</p>
              <h3 className="mt-2 text-sm font-semibold text-ink">{node.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{node.detail}</p>
            </motion.article>

            {index < nodes.length - 1 ? (
              <>
                <div className="hidden sm:flex items-center px-1" aria-hidden>
                  <div className="relative h-px w-10 overflow-hidden bg-line">
                    {!reduceMotion ? (
                      <motion.span
                        className="absolute inset-y-0 left-0 w-4 bg-accent/70"
                        animate={{ x: ["-30%", "290%"] }}
                        transition={{
                          duration: 1.6,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.2,
                          ease: "linear",
                        }}
                      />
                    ) : null}
                  </div>
                </div>
                <div className="mx-auto h-6 w-px bg-line sm:hidden" aria-hidden />
              </>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
