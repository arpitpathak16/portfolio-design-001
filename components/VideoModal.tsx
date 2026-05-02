"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  client: string;
  // Pass one of these:
  youtubeId?: string;
  videoSrc?: string;
}

export default function VideoModal({
  isOpen, onClose, title, client, youtubeId, videoSrc,
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Lock scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Pause local video when modal closes
  useEffect(() => {
    if (!isOpen) videoRef.current?.pause();
  }, [isOpen]);

  const embedSrc = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&color=white`
    : null;

  return (
    <AnimatePresence>
      {isOpen && (
        // Backdrop
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Blurred dark overlay */}
          <div className="absolute inset-0 bg-[#080808]/92 backdrop-blur-md" />

          {/* Modal content — stop propagation so clicking inside doesn't close */}
          <motion.div
            className="relative z-10 w-full max-w-5xl"
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1,    opacity: 1, y: 0  }}
            exit={{   scale: 0.94, opacity: 0, y: 20  }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div>
                <p className="text-label text-[#666666]">{client}</p>
                <p className="text-sm font-display font-semibold text-[#F5F0E8] leading-tight">{title}</p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-[#333] flex items-center justify-center
                           hover:border-[#CDFF00] hover:bg-[#CDFF00] transition-all duration-300 group"
                aria-label="Close video"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1l8 8M9 1L1 9" stroke="#F5F0E8" strokeWidth="1.4"
                        strokeLinecap="round" className="group-hover:stroke-[#080808]" />
                </svg>
              </button>
            </div>

            {/* Video container — 16:9 */}
            <div className="relative w-full rounded-xl overflow-hidden bg-[#101010]"
                 style={{ paddingBottom: "56.25%" }}>
              {embedSrc ? (
                <iframe
                  src={embedSrc}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={title}
                />
              ) : videoSrc ? (
                <video
                  ref={videoRef}
                  src={videoSrc}
                  className="absolute inset-0 w-full h-full object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              ) : null}
            </div>

            {/* Hint */}
            <p className="text-center text-label text-[#333] mt-3">
              Press ESC or click outside to close
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
