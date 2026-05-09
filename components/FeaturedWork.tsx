"use client";

import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";

type WorkLayer =
  | { type: "split"; left?: Project; right?: Project; rightShape: "portrait" | "landscape" }
  | { type: "wide"; project: Project }
  | { type: "trio"; left?: Project; leftShape: "portrait" | "landscape"; middle?: Project; right?: Project; rightShape: "portrait" | "landscape" };

export default function FeaturedWork() {
  const headRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(headRef, { once: true, margin: "-10%" });

  const layout = useMemo<WorkLayer[]>(() => {
    const wides = [...projects.filter((project) => project.youtubeId)];
    const verticals = [...projects.filter((project) => project.videoSrc)];
    const layers: WorkLayer[] = [];
    const takePortraitOrLandscape = () => {
      const portrait = verticals.shift();
      if (portrait) return { project: portrait, shape: "portrait" as const };

      const landscape = wides.shift();
      if (landscape) return { project: landscape, shape: "landscape" as const };

      return { project: undefined, shape: "portrait" as const };
    };

    while (wides.length > 0 || verticals.length > 0) {
      const splitWide = wides.shift();
      const splitRight = takePortraitOrLandscape();
      if (splitWide || splitRight.project) {
        layers.push({ type: "split", left: splitWide, right: splitRight.project, rightShape: splitRight.shape });
      }

      const bigWide = wides.shift();
      if (bigWide) {
        layers.push({ type: "wide", project: bigWide });
      }

      const left = takePortraitOrLandscape();
      const middleWide = wides.shift();
      const right = takePortraitOrLandscape();
      if (left.project || middleWide || right.project) {
        layers.push({
          type: "trio",
          left: left.project,
          leftShape: left.shape,
          middle: middleWide,
          right: right.project,
          rightShape: right.shape,
        });
      }
    }

    return layers;
  }, []);

  let cardIndex = 0;

  return (
    <section id="work" className="px-6 md:px-10 py-20 md:py-28">

      <motion.p
        className="mb-10 max-w-4xl text-heading text-[#080808] md:mb-14"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        Partnering with brands to define,
        <br />
        structure, and scale motion.
      </motion.p>

      {/* Header */}
      <div ref={headRef} className="mb-10 md:mb-14">
        <div className="overflow-hidden">
          <motion.h2
            className="font-google-sans text-display font-normal text-[#080808]"
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Creative Direction & Editing
            <br />
            <span className="font-semibold text-[#4A4A4A]">Work</span>
          </motion.h2>
        </div>
      </div>

      {/* ── Layered video layout ─────────────────────────────────── */}
      <div className="mb-4 grid grid-cols-2 gap-3 border-y border-[#D8D3CA] py-3 md:flex md:items-center md:justify-between">
        <p className="text-label text-[#888888]">16:9 YouTube Films</p>
        <p className="text-label text-[#888888]">9:16 Reels</p>
      </div>

      <div className="grid gap-6 md:gap-8">
        {layout.map((layer, layerIndex) => {
          if (layer.type === "split") {
            return (
              <div key={`split-${layerIndex}`} className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-stretch md:gap-5 md:h-[46vw] md:max-h-[700px]">
                {layer.left && (
                  <ProjectCard
                    project={layer.left}
                    index={cardIndex++}
                    className={`aspect-video md:aspect-auto md:h-full ${layer.right ? "md:col-span-8" : "md:col-span-12"}`}
                  />
                )}
                {layer.right && (
                  <ProjectCard
                    project={layer.right}
                    index={cardIndex++}
                    className={`${layer.rightShape === "portrait" ? "aspect-[9/16]" : "aspect-video"} md:aspect-auto md:h-full ${layer.left ? "md:col-span-4" : "md:col-span-6 md:col-start-4"}`}
                  />
                )}
              </div>
            );
          }

          if (layer.type === "wide") {
            return (
              <div key={`wide-${layer.project.id}-${layerIndex}`} className="py-2 md:py-6">
                <ProjectCard
                  project={layer.project}
                  index={cardIndex++}
                  className="aspect-video w-full"
                />
              </div>
            );
          }

          return (
            <div key={`trio-${layerIndex}`} className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-stretch md:gap-5 md:h-[40vw] md:max-h-[620px]">
              {layer.left && (
                <ProjectCard
                  project={layer.left}
                  index={cardIndex++}
                  className={`${layer.leftShape === "portrait" ? "aspect-[9/16]" : "aspect-video"} md:aspect-auto md:h-full ${layer.right ? "md:col-span-3" : "md:col-span-4"}`}
                />
              )}
              {layer.middle && (
                <ProjectCard
                  project={layer.middle}
                  index={cardIndex++}
                  className={`aspect-video md:aspect-auto md:h-full ${layer.left && layer.right ? "md:col-span-6" : "md:col-span-8"}`}
                />
              )}
              {layer.right && (
                <ProjectCard
                  project={layer.right}
                  index={cardIndex++}
                  className={`${layer.rightShape === "portrait" ? "aspect-[9/16]" : "aspect-video"} md:aspect-auto md:h-full md:col-span-3`}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
