"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, Cloud, Gauge, LayoutTemplate, Network, ServerCog } from "lucide-react";
import type { DiagramCopy } from "@/lib/portfolio-data";

const nodes = [
  { id: "frontend", x: 16, y: 24, icon: LayoutTemplate },
  { id: "backend", x: 46, y: 15, icon: ServerCog },
  { id: "ai", x: 70, y: 27, icon: Network },
  { id: "wordpress", x: 18, y: 70, icon: Activity },
  { id: "cloud", x: 47, y: 82, icon: Cloud },
  { id: "performance", x: 73, y: 70, icon: Gauge },
] as const;

const edges: Array<[string, string]> = [
  ["frontend", "backend"],
  ["backend", "ai"],
  ["frontend", "wordpress"],
  ["wordpress", "cloud"],
  ["cloud", "performance"],
  ["ai", "performance"],
  ["backend", "cloud"],
];

type DiagramNodeKey = keyof DiagramCopy["nodes"];

export function SystemDiagram({ copy }: { copy: DiagramCopy }) {
  const reduceMotion = useReducedMotion();
  const byId = Object.fromEntries(nodes.map((node) => [node.id, node]));

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#243030] bg-[#090f10] p-5 sm:p-6">
      {!reduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-[#244a42]/60"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{
            background:
              "conic-gradient(from 40deg, rgba(112,178,154,0.24), rgba(112,178,154,0.02) 56%, rgba(112,178,154,0.24))",
          }}
        />
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(110,145,136,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(110,145,136,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mb-4 flex items-center justify-between">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#88a8a0]">{copy.title}</p>
        <span className="rounded-full border border-[#2d4e46] px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[#9ec1b8]">
          {copy.online}
        </span>
      </div>

      <div className="relative h-[310px] sm:h-[350px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {edges.map(([from, to], index) => {
            const a = byId[from as keyof typeof byId];
            const b = byId[to as keyof typeof byId];

            return (
              <g key={`${from}-${to}`}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="rgba(141, 175, 166, 0.38)"
                  strokeWidth="0.45"
                  strokeDasharray="2.2 2.2"
                />
                {!reduceMotion ? (
                  <motion.circle
                    r="0.9"
                    fill="rgba(131, 227, 189, 0.9)"
                    animate={{
                      cx: [a.x, b.x],
                      cy: [a.y, b.y],
                      opacity: [0.15, 1, 0.15],
                    }}
                    transition={{
                      duration: 2 + index * 0.18,
                      delay: index * 0.12,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                ) : null}
              </g>
            );
          })}
        </svg>

        {nodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <motion.article
              key={node.id}
              className="absolute w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-[#2a3a38] bg-[#101718]/95 p-2.5 text-[#d5e6e1] sm:w-[136px]"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              whileHover={reduceMotion ? undefined : { y: -3, borderColor: "rgba(115,183,158,0.72)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.34, delay: index * 0.05 }}
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded border border-[#32564d] bg-[#162322]">
                  <Icon size={14} />
                </span>
                <p className="text-[0.72rem] font-medium tracking-[0.01em]">{copy.nodes[node.id as DiagramNodeKey]}</p>
              </div>
              {!reduceMotion ? (
                <motion.span
                  aria-hidden
                  className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#87e9c5]"
                  animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.45, 1] }}
                  transition={{
                    duration: 1.6 + index * 0.12,
                    delay: index * 0.08,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              ) : null}
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
