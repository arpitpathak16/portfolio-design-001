"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue, AnimatePresence } from "framer-motion";

// A4 portrait designs
const posts = [
  "/projects/portrait/s-blob-v1-IMAGE-5B-pP90PK8k.jpg",
  "/projects/portrait/s-blob-v1-IMAGE-9kLH00_mgx4.jpg",
  "/projects/portrait/s-blob-v1-IMAGE-LTqWpFa-oXM.jpg",
  "/projects/portrait/s-blob-v1-IMAGE-_1p6HZzgZGQ.jpg",
  "/projects/portrait/s-blob-v1-IMAGE-be6j8Ky_HfA.jpg",
  "/projects/portrait/s-blob-v1-IMAGE-fcwJ6Za3uoU.jpg",
];

// Square social media posts
const squares = [
  "/projects/square/s-blob-v1-IMAGE-EkhdcPa5YAQ.jpg",
  "/projects/square/s-blob-v1-IMAGE-Hxg0LAkb7hw.jpg",
  "/projects/square/s-blob-v1-IMAGE-RfyZqyfVQlo.jpg",
  "/projects/square/s-blob-v1-IMAGE-S5AYsnCB2GU.jpg",
  "/projects/square/s-blob-v1-IMAGE-kkJZlx2M0Dw.jpg",
  "/projects/square/s-blob-v1-IMAGE-oVbUS_XDhRE.jpg",
  "/projects/square/s-blob-v1-IMAGE-qEz76mIURuI.jpg",
  "/projects/square/s-blob-v1-IMAGE-vUQCRv_GW0M.jpg",
];

// Landscape posters
const landscapes = [
  "/projects/landscape/s-blob-v1-IMAGE-1cUM7t5ZTYE.jpg",
  "/projects/landscape/s-blob-v1-IMAGE-31lGZzkQW1I.jpg",
  "/projects/landscape/s-blob-v1-IMAGE-I3EAtm-HNEU.jpg",
  "/projects/landscape/s-blob-v1-IMAGE-UwGjQTlUXJo.jpg",
  "/projects/landscape/s-blob-v1-IMAGE-b8vCk3ObP5E.jpg",
];

// A4 track
const A4_W = 270;
const A4_H = Math.round(270 * 1.414);
const A4_UNIT = A4_W + 16;

// Square track
const SQ_W = 300;
const SQ_H = 300;
const SQ_UNIT = SQ_W + 16;

// Landscape track
const LS_W = 480;
const LS_H = Math.round(480 * (9 / 16));
const LS_UNIT = LS_W + 16;

const SPEED = 60;

function Track({
  images, cardW, cardH, unit, onOpen,
}: {
  images: string[]; cardW: number; cardH: number; unit: number; onOpen: (src: string) => void;
}) {
  const x      = useMotionValue(0);
  const paused = useRef(false);
  const totalW = images.length * unit;

  useAnimationFrame((_, delta) => {
    if (paused.current) return;
    x.set(x.get() - (delta / 1000) * SPEED);
    if (x.get() < -totalW) x.set(x.get() + totalW);
  });

  const items = [...images, ...images];

  return (
    <motion.div
      style={{ x }}
      className="flex"
      onHoverStart={() => { paused.current = true; }}
      onHoverEnd={()  => { paused.current = false; }}
    >
      {items.map((src, i) => (
        <button
          key={i}
          onClick={() => onOpen(src)}
          data-cursor-label="view"
          style={{ width: cardW, height: cardH, marginRight: 16 }}
          className="relative shrink-0 overflow-hidden border border-[#D8D3CA] hover:border-[#4A4A4A] transition-colors duration-300 focus:outline-none"
        >
          <Image
            src={src}
            alt={`Design ${(i % images.length) + 1}`}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes={`${cardW}px`}
          />
        </button>
      ))}
    </motion.div>
  );
}

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[#080808]/95 backdrop-blur-md px-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1,    opacity: 1 }}
        exit={{ scale: 0.92,    opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} alt="Design" className="max-w-[90vw] max-h-[90vh] object-contain" />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#333] flex items-center justify-center text-[#F5F0E8] hover:bg-[#4A4A4A] transition-colors duration-200"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function DesignStrip() {
  const [open,   setOpen]   = useState(false);
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="border-t border-[#D8D3CA] py-16 md:py-20">

      {/* Header row */}
      <div className="px-6 md:px-10 flex items-end justify-between mb-10">
        <div>
          <p className="text-label text-[#666666] mb-2">— Social Media &amp; Design</p>
          <h2 className="text-display text-[#080808]">
            Design<br />
            <em className="font-serif not-italic text-[#777777]">Work</em>
          </h2>
        </div>
        <button
          onClick={() => setOpen(true)}
          data-cursor-label="open"
          className="shrink-0 flex items-center gap-3 text-label text-[#555555] border border-[#D8D3CA] px-5 py-3 rounded-full hover:border-[#A8A8A8] hover:text-[#333333] transition-colors duration-300"
        >
          See All Designs
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 8L8 2M8 2H3M8 2v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Square social strip */}
      <div className="overflow-hidden mb-8 bg-[#ECECEC] py-8">
        <p className="text-label text-[#555555] px-6 md:px-10 mb-4">Social Media</p>
        <Track images={squares} cardW={SQ_W} cardH={SQ_H} unit={SQ_UNIT} onOpen={setActive} />
      </div>

      {/* A4 portrait strip */}
      <div className="overflow-hidden mb-8 bg-[#D8D8D8] py-8">
        <p className="text-label text-[#555555] px-6 md:px-10 mb-4">A4 Designs</p>
        <Track images={posts} cardW={A4_W} cardH={A4_H} unit={A4_UNIT} onOpen={setActive} />
      </div>

      {/* Landscape poster strip */}
      <div className="overflow-hidden bg-[#C7C7C7] py-8">
        <p className="text-label text-[#4F4F4F] px-6 md:px-10 mb-4">Landscape Posters</p>
        <Track images={landscapes} cardW={LS_W} cardH={LS_H} unit={LS_UNIT} onOpen={setActive} />
      </div>

      {/* All designs modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] bg-[#080808]/95 backdrop-blur-md overflow-y-auto"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="px-6 md:px-10 py-10">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-label text-[#666666] mb-1">— All Designs</p>
                  <h3 className="text-heading text-[#F5F0E8]">Design Work</h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-[#F5F0E8] hover:border-[#4A4A4A] hover:text-[#4A4A4A] transition-colors duration-200"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Square grid */}
              <p className="text-label text-[#666666] mb-4">Social Media</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
                {squares.map((src, i) => (
                  <motion.button
                    key={src}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => { setOpen(false); setActive(src); }}
                    data-cursor-label="view"
                    className="relative aspect-square overflow-hidden border border-[#333] hover:border-[#4A4A4A] transition-colors duration-300 focus:outline-none"
                  >
                    <Image src={src} alt={`Social post ${i + 1}`} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="(max-width: 640px) 50vw, 25vw" />
                  </motion.button>
                ))}
              </div>

              {/* A4 grid */}
              <p className="text-label text-[#666666] mb-4">A4 Designs</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
                {posts.map((src, i) => (
                  <motion.button
                    key={src}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => { setOpen(false); setActive(src); }}
                    data-cursor-label="view"
                    className="relative aspect-[210/297] overflow-hidden border border-[#333] hover:border-[#4A4A4A] transition-colors duration-300 focus:outline-none"
                  >
                    <Image src={src} alt={`A4 design ${i + 1}`} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="(max-width: 640px) 50vw, 25vw" />
                  </motion.button>
                ))}
              </div>

              {/* Landscape grid */}
              <p className="text-label text-[#666666] mb-4">Landscape Posters</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {landscapes.map((src, i) => (
                  <motion.button
                    key={src}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => { setOpen(false); setActive(src); }}
                    data-cursor-label="view"
                    className="relative aspect-video overflow-hidden border border-[#333] hover:border-[#4A4A4A] transition-colors duration-300 focus:outline-none"
                  >
                    <Image src={src} alt={`Landscape poster ${i + 1}`} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {active && <Lightbox src={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
