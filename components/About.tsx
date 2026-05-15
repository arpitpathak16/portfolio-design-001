"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const statement =
    "A creative leader and design enthusiast shaping brands and supporting impactful ideas — through video editing, motion design, and visual storytelling that makes people stop and feel something.";

  const words = statement.split(" ");

  return (
    <section id="about" className="bg-[#EEEAE3] text-[#080808] px-6 md:px-10 py-20 md:py-28">
      <div ref={ref}>

        {/* Eyebrow */}
        <motion.p
          className="text-label text-[#888888] mb-10 md:mb-14"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          — About
        </motion.p>

        {/* Statement with word-by-word reveal */}
        <p className="text-heading text-[#080808] max-w-5xl leading-tight mb-16 md:mb-20" aria-label={statement}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              initial={{ opacity: 0.12, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </p>

        {/* Portrait / bio row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-[1.08fr_0.72fr] gap-14 md:gap-20 lg:gap-28 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Bio text — left */}
          <div className="flex flex-col justify-center gap-6">
            <div className="w-fit">
              <p className="text-display text-[#080808] font-bold leading-none">Apoorva Anand</p>
              <p className="font-serif text-2xl text-[#888888] italic mt-2 text-right">Creative Producer</p>
            </div>
            <p className="text-subhead text-[#333333] leading-relaxed">
              Based in Pune, India — working at the intersection of video editing, motion design,
              and brand design to craft content that communicates clearly and resonates deeply.
            </p>
            <p className="text-subhead text-[#666666] leading-relaxed">
              From social reels and brand films to event collaterals and motion graphics,
              every project starts with a question: <em>what should this make someone feel?</em>{" "}
              The answer shapes everything — pacing, colour, type, movement.
            </p>
            <a
              href="#contact"
              className="mt-2 inline-flex items-center gap-3 group w-fit"
            >
              <span className="text-label text-[#080808] link-underline">Start a conversation</span>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="group-hover:translate-x-1.5 transition-transform duration-300">
                <path d="M1 6h14M9 1l5 5-5 5" stroke="#080808" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Studio portrait — right */}
          <div className="relative w-full max-w-[420px] justify-self-center md:justify-self-end aspect-[3/4] overflow-hidden">
            <Image
              src="/projects/portrait/apoorva-profile.jpg"
              alt="Apoorva Anand — Studio Portrait"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 92vw, 34vw"
              priority
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
