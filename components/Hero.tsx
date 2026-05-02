"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const roles = ["Video Editing", "Motion Design", "Brand Design", "Creative Production"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yText       = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Headline split so "MOVES" gets its own motion-blur entrance
  const before  = "CRAFT THAT ";  // letter-stagger up
  const keyword = "MOVES";        // blasts in left→right with blur, renders lime
  const after   = " PEOPLE.";     // letter-stagger up, starts after MOVES lands

  const beforeLetters = before.split("");
  const afterLetters  = after.split("");
  const keyDelay = 0.8 + beforeLetters.length * 0.025;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-20 px-6 md:px-10 overflow-hidden"
    >
      {/* Ambient gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-[#FF3D00]/5 blur-[120px]" />
        <div className="absolute bottom-[15%] right-[5%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full bg-[#9E9EFF]/6 blur-[100px]" />
      </div>

      {/* Eyebrow */}
      <motion.p
        className="text-label text-[#666666] mb-6 md:mb-8"
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
          className="text-hero text-[#F5F0E8] leading-[0.9]"
          aria-label={`CRAFT THAT ${keyword} PEOPLE.`}
        >
          {/* "CRAFT THAT " — letter-by-letter rise */}
          {beforeLetters.map((char, i) => (
            <motion.span
              key={`b${i}`}
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.025, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}

          {/* "MOVES" — shoots in from the left with motion blur, lands lime */}
          <motion.span
            className="inline-block text-[#CDFF00]"
            initial={{ x: "-12%", opacity: 0, filter: "blur(32px)" }}
            animate={{ x: "0%",   opacity: 1, filter: "blur(0px)"  }}
            transition={{
              delay: keyDelay,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {keyword}
          </motion.span>

          {/* " PEOPLE." — letter-by-letter rise, starts once MOVES has landed */}
          {afterLetters.map((char, i) => (
            <motion.span
              key={`a${i}`}
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                delay: keyDelay + 0.38 + i * 0.025,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {char === " " ? " " : char}
            </motion.span>
          ))}
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
        {/* Discipline tags */}
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <span
              key={role}
              className="text-label text-[#666666] border border-[#1E1E1E] px-3 py-1.5 rounded-full"
            >
              {role}
            </span>
          ))}
        </div>

        {/* Scroll CTA */}
        <div className="flex items-center gap-6">
          <a
            href="#work"
            className="group flex items-center gap-3 text-label text-[#F5F0E8] hover:text-[#CDFF00] transition-colors duration-300"
          >
            <span className="w-8 h-8 rounded-full border border-[#1E1E1E] flex items-center justify-center group-hover:border-[#CDFF00] group-hover:bg-[#CDFF00] transition-all duration-300">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1v8M1 5l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#F5F0E8] group-hover:text-[#080808]"/>
              </svg>
            </span>
            View Work
          </a>
        </div>
      </motion.div>

      {/* Bottom rule */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-[#1E1E1E]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
      />

      {/* Name stamp top-right */}
      <motion.p
        className="absolute top-24 right-6 md:right-10 text-label text-[#333333]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        Apoorva Anand
      </motion.p>
    </section>
  );
}
