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
    <span className={`inline-block overflow-hidden whitespace-nowrap align-baseline ${className}`}>
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "95%", opacity: 0, filter: "blur(10px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: startDelay + i * 0.035, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const yText       = useTransform(scrollY, [0, 600], ["0%", "18%"]);
  const opacityFade = useTransform(scrollY, [0, 420], [1, 0]);

  // Delays: each word starts after the previous word's letters finish
  const d1 = 0.8;                          // CRAFT
  const d2 = d1 + "CRAFT".length  * 0.035 + 0.04; // THAT
  const d3 = d2 + "THAT".length   * 0.035 + 0.04; // MOVES
  const d4 = d3 + "MOVES".length  * 0.035 + 0.04; // PEOPLE.

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex flex-col justify-end pb-16 md:pb-20 px-6 md:px-10 overflow-hidden"
    >
      {/* Background reel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          src="/projects/portrait/Adrish-Ghee.mp4"
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F5F0E8]/60" />
      </div>

      {/* Eyebrow */}


      {/* Hero headline */}
      <motion.div className="relative z-10" style={{ y: yText, opacity: opacityFade }}>
        <h1
          className="text-hero text-[#080808] leading-[0.9]"
          aria-label="CRAFT THAT MOVES PEOPLE."
        >
          <AnimatedWord word="CRAFT" startDelay={d1} />
          {" "}
          <AnimatedWord word="THAT" startDelay={d2} />
          {" "}
          <AnimatedWord word="MOVES" startDelay={d3} className="text-[#4A4A4A]" />
          {" "}
          <AnimatedWord word="PEOPLE." startDelay={d4} />
        </h1>
      </motion.div>

      {/* Descriptor row */}
      <motion.div
        className="relative z-10 mt-8 md:mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
          <a href="#work" className="group flex items-center gap-3 text-label text-[#080808] hover:text-[#4A4A4A] transition-colors duration-300">
            <span className="w-8 h-8 rounded-full border border-[#D8D3CA] flex items-center justify-center group-hover:border-[#4A4A4A] group-hover:bg-[#4A4A4A] transition-all duration-300">
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

    
    </section>
  );
}
