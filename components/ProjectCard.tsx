"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import type { Project } from "@/lib/data";
import VideoModal from "./VideoModal";

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
}

export default function ProjectCard({ project, index, className = "" }: ProjectCardProps) {
  const ref       = useRef<HTMLDivElement>(null);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const inView    = useInView(ref, { once: true, margin: "-10%" });
  const [modalOpen, setModalOpen] = useState(false);

  const youtubeThumbnail = project.youtubeId
    ? `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`
    : null;

  const isClickable  = !!(project.youtubeId || project.videoSrc);
  const youtubeLoop  = !!(project.youtubeId && project.loopVideo);
  const hoverDescription =
    project.description ??
    `${project.category} for ${project.client}, shaped through ${project.tags.join(", ").toLowerCase()}.`;

  // Play/pause local video based on scroll visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !project.videoSrc) return;
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
  }, [project.videoSrc]);

  // Play/pause YouTube loop iframe based on scroll visibility
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !youtubeLoop) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const func = entry.isIntersecting ? "playVideo" : "pauseVideo";
        iframe.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: "" }), "*");
      },
      { threshold: 0.25 }
    );
    observer.observe(iframe);
    return () => observer.disconnect();
  }, [youtubeLoop]);

  // Pause all background media while modal is open, resume when closed
  useEffect(() => {
    const video  = videoRef.current;
    const iframe = iframeRef.current;
    if (modalOpen) {
      video?.pause();
      iframe?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: "" }), "*");
    } else {
      video?.play().catch(() => {});
      iframe?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: "" }), "*");
    }
  }, [modalOpen]);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        className={`project-card relative overflow-hidden group cursor-none ${className}`}
        onClick={() => isClickable && setModalOpen(true)}
        data-cursor-label={isClickable ? "play" : undefined}
      >
        {/* ── Media layer ─────────────────────────────────── */}
        <div className="absolute inset-0">
          {youtubeLoop ? (
            // loopVideo: true — muted autoplay iframe in the card
            <>
              <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${project.youtubeId}&controls=0&playsinline=1&enablejsapi=1&rel=0&modestbranding=1`}
                allow="autoplay; encrypted-media"
                className="absolute inset-0 w-full h-full pointer-events-none transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:blur-[6px]"
                style={{ border: 0 }}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 rounded-full bg-[#080808]/60 border border-[#F5F0E8]/20
                                flex items-center justify-center
                                group-hover:bg-[#D7D7D7] group-hover:border-[#D7D7D7]
                                transition-all duration-300 scale-90 group-hover:scale-100">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5 3l9 5-9 5V3z" fill="#F5F0E8"
                          className="group-hover:fill-[#080808] transition-colors duration-300" />
                  </svg>
                </div>
              </div>
            </>
          ) : project.youtubeId ? (
            // loopVideo: false (default) — static thumbnail + play badge
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={youtubeThumbnail!}
                alt={project.title}
                className="project-media transition-[filter,transform] duration-700 group-hover:blur-[6px]"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#080808]/60 border border-[#F5F0E8]/20
                                flex items-center justify-center
                                group-hover:bg-[#D7D7D7] group-hover:border-[#D7D7D7]
                                transition-all duration-300 scale-90 group-hover:scale-100">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5 3l9 5-9 5V3z"
                          fill="#F5F0E8"
                          className="group-hover:fill-[#080808] transition-colors duration-300" />
                  </svg>
                </div>
              </div>
            </>
          ) : project.videoSrc ? (
            <>
              <video
                ref={videoRef}
                src={project.videoSrc}
                muted loop playsInline
                preload="metadata"
                poster={project.imageSrc}
                className="project-media transition-[filter,transform] duration-700 group-hover:blur-[6px]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#080808]/60 border border-[#F5F0E8]/20
                                flex items-center justify-center
                                group-hover:bg-[#D7D7D7] group-hover:border-[#D7D7D7]
                                transition-all duration-300 scale-90 group-hover:scale-100">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5 3l9 5-9 5V3z"
                          fill="#F5F0E8"
                          className="group-hover:fill-[#080808] transition-colors duration-300" />
                  </svg>
                </div>
              </div>
            </>
          ) : project.imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.imageSrc} alt={project.title} className="project-media transition-[filter,transform] duration-700 group-hover:blur-[6px]" />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:blur-[6px] ${project.gradient}`} />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[#080808]/0 group-hover:bg-[#080808]/20 transition-colors duration-500" />
        </div>

        {isClickable && (
          <div
            className="pointer-events-none absolute left-4 top-4 z-20 w-[min(72%,18rem)] -translate-x-3
                       border border-[#080808]/15 bg-[#FFF06A] px-4 py-3 text-[#080808] opacity-0 shadow-[0_8px_18px_rgba(0,0,0,0.18)]
                       transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100"
          >
            <p className="mb-2 text-[10px] font-bold uppercase leading-none tracking-[0.12em]">
              {project.title}
            </p>
            <p className="text-xs leading-snug md:text-sm">{hoverDescription}</p>
          </div>
        )}

        {/* ── Info overlay ────────────────────────────────── */}
        <div className="relative z-10 h-full flex flex-col justify-end p-5 md:p-6">
          <div className="overflow-hidden">
            <div className="info-reveal">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-label text-[#666666] mb-1.5">
                    {project.category} — {project.year}
                  </p>
                  <h3 className="font-display text-[#F5F0E8] text-xl md:text-2xl font-semibold leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-label text-[#888888] mt-1">{project.client}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-3 flex-wrap">
                {project.tags.map((tag) => (
                  <span key={tag}
                        className="text-[10px] tracking-wider uppercase text-[#555]
                                   border border-[#1E1E1E] px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={project.title}
        client={project.client}
        youtubeId={project.youtubeId}
        videoSrc={project.videoSrc}
      />
    </>
  );
}
