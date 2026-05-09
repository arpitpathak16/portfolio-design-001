"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

// Hero headline is temporarily hidden to keep the video clear.
// Renders a word as letter-by-letter animated spans inside a nowrap container
// so the browser can only line-break BETWEEN words, never inside one.
// function AnimatedWord({
//   word, startDelay, className = "",
// }: { word: string; startDelay: number; className?: string }) {
//   return (
//     <span className={`inline-block overflow-hidden whitespace-nowrap align-baseline ${className}`}>
//       {word.split("").map((char, i) => (
//         <motion.span
//           key={i}
//           className="inline-block"
//           initial={{ y: "95%", opacity: 0, filter: "blur(10px)" }}
//           animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
//           transition={{ delay: startDelay + i * 0.035, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
//         >
//           {char}
//         </motion.span>
//       ))}
//     </span>
//   );
// }

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const video = videoRef.current;
    if (!video) return;

    if (latest > window.innerHeight * 0.9) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  });

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  // Delays: each word starts after the previous word's letters finish
  // const d1 = 0.8;                          // CRAFT
  // const d2 = d1 + "CRAFT".length  * 0.035 + 0.04; // THAT
  // const d3 = d2 + "THAT".length   * 0.035 + 0.04; // MOVES
  // const d4 = d3 + "MOVES".length  * 0.035 + 0.04; // PEOPLE.

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex flex-col justify-end pb-16 md:pb-20 px-6 md:px-10 overflow-hidden"
    >
      {/* Background reel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/projects/landscape/Portfolio_Video2.mp4"
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#F5F0E8]/1" />
      </div>

      {/* Eyebrow */}


      {/* Hero headline
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
      */}

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
