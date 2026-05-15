"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { motionItems } from "@/lib/data";
import type { MotionItem } from "@/lib/data";
import VideoModal from "./VideoModal";
import YouTubePreview from "./YouTubePreview";

function MotionCard({
  item,
  index,
  className = "",
}: {
  item: MotionItem;
  index: number;
  className?: string;
}) {
  const ref       = useRef<HTMLDivElement>(null);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const inView    = useInView(ref, { once: true, margin: "-10%" });
  const [modalOpen, setModalOpen] = useState(false);

  const isClickable = !!(item.youtubeId || item.videoSrc);
  const aspectClass = item.aspect === "portrait" ? "aspect-[9/16]"
                    : item.aspect === "square"   ? "aspect-square"
                    : "aspect-video";

  const hoverDescription =
    item.description ??
    `${item.title} explores motion, timing, and visual rhythm in a compact loop.`;

  // Autoplay local video on scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !item.videoSrc) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [item.videoSrc]);

  // Pause background media while modal is open
  useEffect(() => {
    const video  = videoRef.current;
    if (modalOpen) {
      video?.pause();
    } else {
      video?.play().catch(() => {});
    }
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
        className={`relative ${aspectClass} overflow-hidden group ${className}`}
      >
        {/* Media — priority: YouTube thumbnail > local video > GIF > gradient */}
        <div className="absolute inset-0">
          {item.youtubeId ? (
            <YouTubePreview
              videoId={item.youtubeId}
              title={item.title}
              variant={item.isShort ? "short" : "standard"}
              className="h-full w-full object-cover transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:blur-[6px]"
            />
          ) : item.videoSrc ? (
            <video
              ref={videoRef}
              src={item.videoSrc}
              muted loop playsInline preload="metadata"
              className="w-full h-full object-cover transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:blur-[6px]"
            />
          ) : item.gifSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.gifSrc} alt={item.title} className="w-full h-full object-cover transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:blur-[6px]" />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:blur-[6px] ${item.gradient}`} />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[#080808]/0 group-hover:bg-[#080808]/20 transition-colors duration-500" />
        </div>

        {isClickable && (
          <div
            className="pointer-events-none absolute left-4 top-4 z-20 w-[min(72%,18rem)] -translate-x-3
                       border border-[#080808]/15 bg-[#FFF06A] px-4 py-3 text-[#080808] opacity-0 shadow-[0_8px_18px_rgba(0,0,0,0.18)]
                       transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100"
          >
            <p className="mb-2 text-[10px] font-bold uppercase leading-none tracking-[0.12em]">
              {item.title}
            </p>
            <p className="text-xs leading-snug md:text-sm">{hoverDescription}</p>
          </div>
        )}

        {/* Info */}
        <div className="relative z-10 h-full flex flex-col justify-end p-5">
          <p className="text-label text-[#888888] mb-1">
            {item.client}{item.client && item.year ? " — " : ""}{item.year}
          </p>
          <h3 className="font-display text-[#080808] text-lg md:text-xl font-semibold leading-tight
                         group-hover:text-[#4A4A4A] transition-colors duration-300">
            {item.title}
          </h3>
        </div>
      </motion.div>

      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={item.title}
        client={item.client ?? ""}
        aspect={item.aspect}
        youtubeId={item.youtubeId}
        videoSrc={item.videoSrc}
      />
    </>
  );
}

export default function MotionWork() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(headRef, { once: true, margin: "-10%" });

  const landscapes = motionItems.filter(i => i.aspect === "landscape");
  const leadItems = landscapes.filter((_, index) => index % 3 === 0);
  const pairItems = landscapes.filter((_, index) => index % 3 !== 0);

  let cardIndex = 0;

  return (
    <section className="px-6 md:px-10 py-20 md:py-28 border-t border-[#D8D3CA]">
      {/* Header */}
      <div ref={headRef} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
        <div className="overflow-hidden pb-3">
          <motion.h2
            className="font-google-sans text-display font-normal text-[#080808] leading-[1.03]"
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Motion
            <br />
            <span className="font-semibold text-[#4A4A4A]">Design</span>
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

      <div className="mb-4 grid grid-cols-2 gap-3 border-y border-[#D8D3CA] py-3 md:flex md:items-center md:justify-between">
        <p className="text-label text-[#888888]">Landscape Motion Reels</p>
        <p className="text-label text-[#888888]">16:9 Frames</p>
      </div>

      {/* Landscape reel wall */}
      <div className="grid gap-5 md:gap-8">
        {leadItems.map((lead, groupIndex) => {
          const pair = pairItems.slice(groupIndex * 2, groupIndex * 2 + 2);

          return (
            <div key={lead.id} className="grid gap-4 md:gap-5">
              <MotionCard
                item={lead}
                index={cardIndex++}
                className="aspect-video w-full"
              />

              {pair.length > 0 && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                  {pair.map((item) => (
                    <MotionCard
                      key={item.id}
                      item={item}
                      index={cardIndex++}
                      className="aspect-video"
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
