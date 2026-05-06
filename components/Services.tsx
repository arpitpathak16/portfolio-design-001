"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { services } from "@/lib/data";

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="services" className="px-6 md:px-10 py-20 md:py-28 border-t border-[#D8D3CA]">
      <div ref={ref}>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-16">
          <div className="overflow-hidden">
            <motion.h2
              className="text-display text-[#080808]"
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              What I
              <br />
              <em className="font-serif not-italic text-[#4A4A4A]">Create</em>
            </motion.h2>
          </div>

          <motion.p
            className="text-subhead text-[#888888] max-w-sm leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Three disciplines, one through-line — every edit, motion, and design decision
            is made to make the audience feel something.
          </motion.p>
        </div>

        {/* Service list */}
        <div className="divide-y divide-[#D8D3CA]">
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-7 md:py-8 hover:pl-4 transition-all duration-300"
            >
              <div className="flex items-start gap-6 md:gap-10">
                <span className="text-label text-[#BBBBBB] shrink-0 mt-1">{service.num}</span>
                <div>
                  <h3 className="text-heading text-[#080808] group-hover:text-[#4A4A4A] transition-colors duration-300">
                    {service.title}
                  </h3>
                  {"tags" in service && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {(service as typeof service & { tags: string[] }).tags.map((tag) => (
                        <span key={tag} className="text-[10px] tracking-wider uppercase text-[#888888] border border-[#D8D3CA] px-2 py-0.5 rounded-full group-hover:border-[#BBBBBB] transition-colors duration-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm text-[#888888] leading-relaxed md:max-w-xs group-hover:text-[#555555] transition-colors duration-300 md:text-right shrink-0">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Process note */}
        <motion.div
          className="mt-16 p-6 md:p-8 border border-[#D8D3CA] bg-[#EEEAE3] flex flex-col md:flex-row items-start md:items-center gap-6 justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div>
            <p className="text-label text-[#4A4A4A] mb-2">My Process</p>
            <p className="text-subhead text-[#080808]">Discovery → Strategy → Concept → Craft → Ship</p>
          </div>
          <a
            href="#contact"
            className="shrink-0 text-label text-[#F5F0E8] bg-[#080808] px-6 py-3 rounded-full hover:bg-[#4A4A4A] transition-colors duration-300"
          >
            Start a Project
          </a>
        </motion.div>

      </div>
    </section>
  );
}
