"use client";

import { clients } from "@/lib/data";

interface MarqueeStripProps {
  variant?: "dark" | "light";
}

export default function MarqueeStrip({ variant = "dark" }: MarqueeStripProps) {
  const isDark = variant === "dark";
  const items = [...clients, ...clients]; // double for seamless loop

  return (
    <div
      className={`py-5 border-y overflow-hidden ${
        isDark
          ? "bg-[#080808] border-[#1E1E1E]"
          : "bg-[#F4F1EC] border-[#D8D3CA]"
      }`}
    >
      <div className="marquee-track flex items-center gap-0 whitespace-nowrap w-max">
        {items.map((client, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`text-label px-8 ${
                isDark ? "text-[#333333]" : "text-[#AAAAAA]"
              }`}
            >
              {client}
            </span>
            <span
              className={`w-1 h-1 rounded-full ${
                isDark ? "bg-[#FF3D00]" : "bg-[#CCCCCC]"
              }`}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
