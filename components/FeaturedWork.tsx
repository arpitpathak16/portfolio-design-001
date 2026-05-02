"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";

function byAspect(list: Project[], aspect: Project["aspect"]) {
  return list.filter((p) => p.aspect === aspect);
}

export default function FeaturedWork() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(headRef, { once: true, margin: "-10%" });

  const landscapes = byAspect(projects, "landscape");
  const portraits  = byAspect(projects, "portrait");
  const squares    = byAspect(projects, "square");

  // Fixed slots
  const hero   = landscapes[0] ?? projects[0];
  const tall   = portraits[0]  ?? squares[0] ?? projects[1];
  const banner = landscapes[1] ?? landscapes[0];

  // Middle row: up to 3 squares
  const midCards = squares.slice(0, 3);

  // Anything not yet placed goes in the overflow row
  const placed = new Set([hero.id, tall.id, banner.id, ...midCards.map((p) => p.id)]);
  const overflow = projects.filter((p) => !placed.has(p.id));

  // chunk overflow into rows of 2 or 3 depending on count
  const overflowRows: Project[][] = [];
  let i = 0;
  while (i < overflow.length) {
    const remaining = overflow.length - i;
    const size = remaining === 2 || remaining % 3 === 2 ? 2 : 3;
    overflowRows.push(overflow.slice(i, i + size));
    i += size;
  }

  let cardIndex = 0;

  return (
    <section id="work" className="px-6 md:px-10 py-20 md:py-28">

      {/* Header */}
      <div ref={headRef} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
        <div className="overflow-hidden">
          <motion.h2
            className="text-display text-[#F5F0E8]"
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Selected
            <br />
            <em className="font-serif not-italic text-[#9E9EFF]">Work</em>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="md:max-w-xs"
        >
          <p className="text-[#666666] text-sm leading-relaxed">
            A selection of recent projects spanning brand film, motion design, and visual identity.
          </p>
          <a
            href="#"
            className="mt-4 inline-flex items-center gap-2 text-label text-[#CDFF00] hover:gap-4 transition-all duration-300"
          >
            All projects
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 5h12M8 1l4 4-4 4" stroke="#CDFF00" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* ── Grid ─────────────────────────────────────────────────── */}
      <div className="grid gap-3 md:gap-4">

        {/* Row 1: hero (2/3) + tall portrait (1/3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <ProjectCard project={hero} index={cardIndex++} className="md:col-span-2 h-[56vw] md:h-[40vw] max-h-[600px]" />
          <ProjectCard project={tall} index={cardIndex++} className="h-[75vw] md:h-[40vw] max-h-[600px]" />
        </div>

        {/* Row 2: up to three square cards */}
        {midCards.length > 0 && (
          <div className={`grid grid-cols-1 gap-3 md:gap-4 ${midCards.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
            {midCards.map((p) => (
              <ProjectCard key={p.id} project={p} index={cardIndex++} className="h-[80vw] sm:h-[30vw] max-h-[400px]" />
            ))}
          </div>
        )}

        {/* Row 3: full-width landscape banner */}
        <ProjectCard project={banner} index={cardIndex++} className="h-[50vw] md:h-[34vw] max-h-[500px]" />

        {/* Overflow rows: any projects not in the fixed slots above */}
        {overflowRows.map((row, ri) => (
          <div
            key={ri}
            className={`grid grid-cols-1 gap-3 md:gap-4 ${row.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}
          >
            {row.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={cardIndex++}
                className={row.length === 2 ? "h-[56vw] sm:h-[36vw] max-h-[500px]" : "h-[80vw] sm:h-[30vw] max-h-[400px]"}
              />
            ))}
          </div>
        ))}

      </div>
    </section>
  );
}
