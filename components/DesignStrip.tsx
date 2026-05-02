"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue, AnimatePresence } from "framer-motion";

const posts = [
  "/projects/square/s-blob-v1-IMAGE-EkhdcPa5YAQ.jpg",
  "/projects/square/s-blob-v1-IMAGE-Hxg0LAkb7hw.jpg",
  "/projects/square/s-blob-v1-IMAGE-RfyZqyfVQlo.jpg",
  "/projects/square/s-blob-v1-IMAGE-S5AYsnCB2GU.jpg",
  "/projects/square/s-blob-v1-IMAGE-kkJZlx2M0Dw.jpg",
  "/projects/square/s-blob-v1-IMAGE-oVbUS_XDhRE.jpg",
  "/projects/square/s-blob-v1-IMAGE-qEz76mIURuI.jpg",
  "/projects/square/s-blob-v1-IMAGE-vUQCRv_GW0M.jpg",
];

const CARD_W = 380;
const GAP    = 16;
const UNIT   = CARD_W + GAP;
const SPEED  = 60;

function InfiniteTrack({ onOpen }: { onOpen: (src: string) => void }) {
  const x      = useMotionValue(0);
  const paused = useRef(false);
  const totalW = posts.length * UNIT;

  useAnimationFrame((_, delta) => {
    if (paused.current) return;
    const next = x.get() - (delta / 1000) * SPEED;
    x.set(next % -totalW);
  });

  const items = [...posts, ...posts];

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
          style={{ width: CARD_W, marginRight: GAP }}
          className="relative shrink-0 aspect-square rounded-2xl overflow-hidden border border-[#1E1E1E] hover:border-[#9E9EFF] transition-colors duration-300 focus:outline-none"
        >
          <Image
            src={src}
            alt={`Design post ${(i % posts.length) + 1}`}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="380px"
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
        <img
          src={src}
          alt="Design"
          className="max-w-[90vw] max-h-[90vh] rounded-2xl object-contain"
        />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#1E1E1E] flex items-center justify-center text-[#F5F0E8] hover:bg-[#FF3D00] transition-colors duration-200"
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
    // no overflow-hidden on the section — lightbox needs to escape
    <section className="border-t border-[#1E1E1E] py-16 md:py-20">
      {/* Header row */}
      <div className="px-6 md:px-10 flex items-end justify-between mb-10">
        <div>
          <p className="text-label text-[#666666] mb-2">— Social Media &amp; Design</p>
          <h2 className="text-display text-[#F5F0E8]">
            Design<br />
            <em className="font-serif not-italic text-[#9E9EFF]">Work</em>
          </h2>
        </div>
        <button
          onClick={() => setOpen(true)}
          data-cursor-label="open"
          className="shrink-0 flex items-center gap-3 text-label text-[#F5F0E8] border border-[#1E1E1E] px-5 py-3 rounded-full hover:border-[#9E9EFF] hover:text-[#9E9EFF] transition-colors duration-300"
        >
          See All Designs
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 8L8 2M8 2H3M8 2v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Marquee — clip overflow here only, not on the section */}
      <div className="overflow-hidden">
        <InfiniteTrack onOpen={setActive} />
      </div>

      {/* All designs modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] bg-[#080808]/95 backdrop-blur-md overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="px-6 md:px-10 py-10">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-label text-[#666666] mb-1">— All Designs</p>
                  <h3 className="text-heading text-[#F5F0E8]">Social Media &amp; Design Work</h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-full border border-[#1E1E1E] flex items-center justify-center text-[#F5F0E8] hover:border-[#FF3D00] hover:text-[#FF3D00] transition-colors duration-200"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {posts.map((src, i) => (
                  <motion.button
                    key={src}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => { setOpen(false); setActive(src); }}
                    data-cursor-label="view"
                    className="relative aspect-square rounded-xl overflow-hidden border border-[#1E1E1E] hover:border-[#9E9EFF] transition-colors duration-300 focus:outline-none"
                  >
                    <Image
                      src={src}
                      alt={`Design post ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Single lightbox — rendered at section level, never clipped */}
      <AnimatePresence>
        {active && <Lightbox src={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
