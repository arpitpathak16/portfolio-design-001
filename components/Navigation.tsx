"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Work",    href: "#work" },
  { label: "About",   href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="absolute top-0 left-0 right-0 z-[1000] px-6 md:px-10 py-5 flex items-center justify-between"
        style={{
          WebkitBackdropFilter: "blur(16px)",
          backdropFilter: "blur(16px)",
          background: "linear-gradient(to bottom, rgba(8,8,8,0.75) 0%, rgba(8,8,8,0.45) 60%, transparent 100%)",
        }}
      >
        {/* Logo */}
        <a href="#" className="text-label text-[#F5F0E8] tracking-[0.18em] hover:text-[#CDFF00] transition-colors duration-300">
          APOORVA
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-label text-[#666666] hover:text-[#F5F0E8] transition-colors duration-300 link-underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Availability pill */}
        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 text-label text-[#080808] bg-[#CDFF00] px-4 py-2 rounded-full hover:bg-[#F5F0E8] transition-colors duration-300"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#080808] animate-pulse" />
          Available
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-[#F5F0E8]"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-px bg-[#F5F0E8]"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-[#F5F0E8]"
            transition={{ duration: 0.3 }}
          />
        </button>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[999] bg-[#080808] flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                  className="text-display text-[#F5F0E8] hover:text-[#CDFF00] transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-10 left-8 right-8 flex justify-between items-end"
            >
              <p className="text-label text-[#666666]">© 2025 Apoorva Anand</p>
              <a href="mailto:hello@apoorvaanand.com" className="text-label text-[#666666] hover:text-[#CDFF00] transition-colors">
                hello@apoorvaanand.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
