"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const roles = ["Video Editing", "Motion Design", "Brand Design", "Creative Production"];

// Renders a word as letter-by-letter animated spans inside a nowrap container
// so the browser can only line-break BETWEEN words, never inside one.
function AnimatedWord({
  word, startDelay, className = "",
}: { word: string; startDelay: number; className?: string }) {
  return (
    <span className={`inline-block whitespace-nowrap ${className}`}>
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ delay: startDelay + i * 0.025, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yText       = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Delays: each word starts after the previous word's letters finish
  const d1 = 0.8;                          // CRAFT
  const d2 = d1 + "CRAFT".length  * 0.025 + 0.02; // THAT
  const d3 = d2 + "THAT".length   * 0.025 + 0.02; // MOVES (blur-in)
  const d4 = d3 + 0.38;                    // PEOPLE. starts after MOVES lands

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-20 px-6 md:px-10 overflow-hidden"
    >
      {/* Background reel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <iframe
          src="https://www.youtube.com/embed/bNejx-mptFQ?autoplay=1&mute=1&loop=1&playlist=bNejx-mptFQ&controls=0&playsinline=1&enablejsapi=1&rel=0&modestbranding=1&showinfo=0"
          allow="autoplay; encrypted-media"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ border: 0, width: "max(100vw, 177.78vh)", height: "max(56.25vw, 100vh)" }}
        />
        <div className="absolute inset-0 bg-[#F5F0E8]/60" />
      </div>

      {/* Eyebrow */}
      <motion.p
        className="text-label text-[#888888] mb-6 md:mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ opacity: opacityFade }}
      >
        Creative Producer — Pune, India
      </motion.p>

      {/* Hero headline */}
      <motion.div style={{ y: yText, opacity: opacityFade }}>
        <h1
          className="text-hero text-[#080808] leading-[0.9]"
          aria-label="CRAFT THAT MOVES PEOPLE."
        >
          <AnimatedWord word="CRAFT" startDelay={d1} />
          {" "}
          <AnimatedWord word="THAT" startDelay={d2} />
          {" "}
          {/* MOVES — blurs in from the left */}
          <motion.span
            className="inline-block whitespace-nowrap text-[#FF3D00]"
            initial={{ x: "-12%", opacity: 0, filter: "blur(32px)" }}
            animate={{ x: "0%",   opacity: 1, filter: "blur(0px)"  }}
            transition={{ delay: d3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            MOVES
          </motion.span>
          {" "}
          <AnimatedWord word="PEOPLE." startDelay={d4} />
        </h1>
      </motion.div>

      {/* Descriptor row */}
      <motion.div
        className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ opacity: opacityFade }}
      >
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <span key={role} className="text-label text-[#080808] border border-[#080808] px-3 py-1.5 rounded-full">
              {role}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <a href="#work" className="group flex items-center gap-3 text-label text-[#080808] hover:text-[#FF3D00] transition-colors duration-300">
            <span className="w-8 h-8 rounded-full border border-[#D8D3CA] flex items-center justify-center group-hover:border-[#FF3D00] group-hover:bg-[#FF3D00] transition-all duration-300">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1v8M1 5l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#080808] group-hover:text-[#F5F0E8]"/>
              </svg>
            </span>
            View Work
          </a>
        </div>
      </motion.div>

      {/* Bottom rule */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-[#D8D3CA]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
      />

      {/* Name stamp */}
      <motion.p
        className="absolute top-24 right-6 md:right-10 text-label text-[#BBBBBB]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        Apoorva Anand
      </motion.p>
    </section>
  );
}
