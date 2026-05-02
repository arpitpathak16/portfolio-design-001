"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { motionItems } from "@/lib/data";
import type { MotionItem } from "@/lib/data";
import VideoModal from "./VideoModal";

function MotionCard({ item, index }: { item: MotionItem; index: number }) {
  const ref      = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView   = useInView(ref, { once: true, margin: "-10%" });
  const [modalOpen, setModalOpen] = useState(false);

  const isClickable  = !!(item.youtubeId || item.videoSrc);
  const aspectClass  = item.aspect === "portrait"  ? "aspect-[9/16]"
                     : item.aspect === "square"    ? "aspect-square"
                     : "aspect-video";

  const thumbnail = item.youtubeId
    ? `https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`
    : null;

  // Autoplay local video / GIF on scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? video.play().catch(() => {}) : video.pause(); },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (modalOpen) video.pause(); else video.play().catch(() => {});
  }, [modalOpen]);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => isClickable && setModalOpen(true)}
        data-cursor-label={isClickable ? "play" : undefined}
        className={`relative ${aspectClass} rounded-2xl overflow-hidden group cursor-none`}
      >
        {/* Media */}
        <div className="absolute inset-0">
          {item.videoSrc ? (
            <video
              ref={videoRef}
              src={item.videoSrc}
              muted loop playsInline preload="metadata"
              className="w-full h-full object-cover"
            />
          ) : item.gifSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.gifSrc} alt={item.title} className="w-full h-full object-cover" />
          ) : item.youtubeId ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnail!}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#080808]/60 border border-[#F5F0E8]/20
                                flex items-center justify-center
                                group-hover:bg-[#CDFF00] group-hover:border-[#CDFF00]
                                transition-all duration-300 scale-90 group-hover:scale-100">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5 3l9 5-9 5V3z" fill="#F5F0E8"
                          className="group-hover:fill-[#080808] transition-colors duration-300" />
                  </svg>
                </div>
              </div>
            </>
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[#080808]/0 group-hover:bg-[#080808]/20 transition-colors duration-500" />
        </div>

        {/* Info */}
        <div className="relative z-10 h-full flex flex-col justify-end p-5">
          <p className="text-label text-[#888888] mb-1">
            {item.client}{item.client && item.year ? " — " : ""}{item.year}
          </p>
          <h3 className="font-display text-[#F5F0E8] text-lg md:text-xl font-semibold leading-tight
                         group-hover:text-[#CDFF00] transition-colors duration-300">
            {item.title}
          </h3>
        </div>
      </motion.div>

      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={item.title}
        client={item.client ?? ""}
        youtubeId={item.youtubeId}
        videoSrc={item.videoSrc}
      />
    </>
  );
}

export default function MotionWork() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(headRef, { once: true, margin: "-10%" });

  // Separate by aspect for layout
  const landscapes = motionItems.filter(i => i.aspect === "landscape");
  const portraits  = motionItems.filter(i => i.aspect === "portrait");
  const squares    = motionItems.filter(i => i.aspect === "square");

  let cardIndex = 0;

  return (
    <section className="px-6 md:px-10 py-20 md:py-28 border-t border-[#1E1E1E]">
      {/* Header */}
      <div ref={headRef} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
        <div className="overflow-hidden">
          <motion.h2
            className="text-display text-[#F5F0E8]"
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Motion
            <br />
            <em className="font-serif not-italic text-[#FF3D00]">Design</em>
          </motion.h2>
        </div>
        <motion.p
          className="text-subhead text-[#666666] max-w-sm leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Animated graphics, title sequences, and motion pieces that bring ideas to life.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid gap-4">
        {/* Landscape items — full width or 2-col */}
        {landscapes.length > 0 && (
          <div className={`grid gap-4 ${landscapes.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
            {landscapes.map(item => <MotionCard key={item.id} item={item} index={cardIndex++} />)}
          </div>
        )}

        {/* Portraits + squares — mixed row */}
        {(portraits.length > 0 || squares.length > 0) && (() => {
          const rest = [...portraits, ...squares];
          const cols = rest.length === 2 ? "grid-cols-2"
                     : rest.length === 3 ? "grid-cols-2 md:grid-cols-3"
                     : "grid-cols-2 md:grid-cols-4";
          return (
            <div className={`grid gap-4 ${cols}`}>
              {rest.map(item => <MotionCard key={item.id} item={item} index={cardIndex++} />)}
            </div>
          );
        })()}
      </div>
    </section>
  );
}
