"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/fake_firangi" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/apoorva-anand-a12b47119" },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [hoveredEmail, setHoveredEmail] = useState(false);
  const [hoveredPhone, setHoveredPhone] = useState(false);

  const email = "apoorv.anand1610@gmail.com";
  const phone = "+91-7044257644";
  const letters = "APOORVA".split("");

  return (
    <section id="contact" className="px-6 md:px-10 py-24 md:py-32 border-t border-[#D8D3CA] overflow-hidden">
      <div ref={ref}>

        {/* Eyebrow */}
        <motion.p
          className="text-label text-[#666666] mb-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          — Get In Touch
        </motion.p>

        {/* Big CTA headline */}
        <div className="overflow-hidden mb-12 md:mb-16">
          <motion.h2
            className="text-display text-[#080808] max-w-4xl"
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Have something in mind?
            <br />
            <span className="text-[#666666]">Let&apos;s create it.</span>
          </motion.h2>
        </div>

        {/* Email + Phone CTAs */}
        <div className="flex flex-col gap-6 mb-16">
          {/* Email */}
          <motion.a
            href={`mailto:${email}`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHoveredEmail(true)}
            onMouseLeave={() => setHoveredEmail(false)}
            className="group inline-flex items-center gap-5"
          >
            <span className={`text-heading transition-colors duration-500 ${hoveredEmail ? "text-[#4A4A4A]" : "text-[#080808]"}`}>
              {email}
            </span>
            <motion.span
              animate={hoveredEmail ? { x: 6, y: -6 } : { x: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-[#D8D3CA] flex items-center justify-center group-hover:bg-[#4A4A4A] group-hover:border-[#4A4A4A] transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#080808] group-hover:text-[#F5F0E8] transition-colors duration-300">
                <path d="M2 12L12 2M12 2H4M12 2v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          </motion.a>

          {/* Phone */}
          <motion.a
            href={`tel:${phone.replace(/\s/g, "")}`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHoveredPhone(true)}
            onMouseLeave={() => setHoveredPhone(false)}
            className="group inline-flex items-center gap-5"
          >
            <span className={`text-heading transition-colors duration-500 ${hoveredPhone ? "text-[#4A4A4A]" : "text-[#080808]"}`}>
              {phone}
            </span>
            <motion.span
              animate={hoveredPhone ? { x: 6, y: -6 } : { x: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-[#D8D3CA] flex items-center justify-center group-hover:bg-[#4A4A4A] group-hover:border-[#4A4A4A] transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#080808] group-hover:text-[#F5F0E8] transition-colors duration-300">
                <path d="M2 12L12 2M12 2H4M12 2v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          </motion.a>
        </div>

        {/* Bottom row: social + logo stamp */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-t border-[#D8D3CA] pt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-label text-[#555555] hover:text-[#080808] transition-colors duration-300 link-underline"
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Animated logo stamp */}
          <div className="flex items-center gap-3">
            <div className="flex">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  className="text-label text-[#BBBBBB] hover:text-[#4A4A4A] transition-colors duration-200 cursor-default"
                  whileHover={{ y: -3, color: "#4A4A4A" }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {l}
                </motion.span>
              ))}
            </div>
            <span className="text-label text-[#888888]">© 2026</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
