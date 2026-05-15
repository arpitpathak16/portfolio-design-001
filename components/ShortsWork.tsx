"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { shortsItems } from "@/lib/data";
import type { MotionItem } from "@/lib/data";
import VideoModal from "./VideoModal";
import YouTubePreview from "./YouTubePreview";

function ShortCard({ item, index }: { item: MotionItem; index: number }) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.button
        ref={ref}
        type="button"
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setModalOpen(true)}
        data-cursor-label="play"
        className="group relative aspect-[9/16] w-full overflow-hidden bg-[#101010] text-left"
        aria-label={`Play ${item.title}`}
      >
        <div className="absolute inset-0">
          {item.youtubeId ? (
            <YouTubePreview
              videoId={item.youtubeId}
              title={item.title}
              variant="short"
              className="h-full w-full object-cover transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:blur-[5px]"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/78 via-[#080808]/12 to-transparent" />
          <div className="absolute inset-0 bg-[#080808]/0 transition-colors duration-500 group-hover:bg-[#080808]/18" />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-end p-4">
          <p className="text-label mb-2 text-[#D7D7D7]">
            {item.client}{item.client && item.year ? " - " : ""}{item.year}
          </p>
          <h3 className="font-display text-sm font-semibold leading-tight text-[#F5F0E8] sm:text-base md:text-xl">
            {item.title}
          </h3>
          <p className="mt-3 hidden line-clamp-3 text-xs leading-snug text-[#D7D7D7]/78 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
            {item.description}
          </p>
        </div>
      </motion.button>

      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={item.title}
        client={item.client ?? ""}
        aspect="portrait"
        youtubeId={item.youtubeId}
      />
    </>
  );
}

export default function ShortsWork() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headRef, { once: true, margin: "-10%" });

  return (
    <section className="border-t border-[#D8D3CA] px-5 py-16 md:px-10 md:py-28">
      <div ref={headRef} className="mb-8 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
        <div className="overflow-hidden pb-3">
          <motion.h2
            className="font-google-sans text-display font-normal leading-[1.03] text-[#080808]"
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Portfolio
            <br />
            <span className="font-semibold text-[#4A4A4A]">Shorts</span>
          </motion.h2>
        </div>
        <motion.p
          className="text-subhead max-w-sm leading-relaxed text-[#666666]"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Vertical edits, mobile-first campaigns, and short-form stories built for fast viewing.
        </motion.p>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 border-y border-[#D8D3CA] py-3 md:flex md:items-center md:justify-between">
        <p className="text-label text-[#888888]">Short-Form Portfolio</p>
        <p className="text-label text-right text-[#888888] md:text-left">Vertical Campaign Edits</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
        {shortsItems.map((item, index) => (
          <div key={item.id} className="min-w-0">
            <ShortCard item={item} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
