"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Projects",  href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact",     href: "#contact" },
  { label: "About",     href: "#about" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        className={`fixed top-0 left-0 right-0 px-6 md:px-10 py-6 flex items-start justify-end ${menuOpen ? "z-[1000]" : "z-10"}`}
      >
        {/* Desktop links */}
        <nav className="hidden md:flex overflow-hidden rounded-md border border-[#D8D3CA] bg-[#F8F8F8] shadow-[0_0_0_1px_rgba(0,0,0,0.04)]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="border-l border-[#D8D3CA] px-4 py-3 text-sm leading-none text-[#080808] transition-colors duration-300 first:border-l-0 hover:bg-[#EFEFEF] hover:text-[#4A4A4A]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-md border border-[#D8D3CA] bg-[#F8F8F8]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block w-6 h-px bg-[#080808]" transition={{ duration: 0.3 }} />
          <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-px bg-[#080808]" transition={{ duration: 0.3 }} />
          <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-6 h-px bg-[#080808]" transition={{ duration: 0.3 }} />
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
            className="fixed inset-0 z-[999] bg-[#F5F0E8] flex flex-col justify-center px-8"
          >
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="absolute left-8 top-8 rounded-md border border-[#D8D3CA] bg-[#F8F8F8] px-4 py-3 text-label text-[#080808] transition-colors duration-300 hover:bg-[#EFEFEF]"
              aria-label="Close menu"
            >
              Close
            </button>
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                  className="text-display text-[#080808] hover:text-[#4A4A4A] transition-colors duration-300"
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
              <p className="text-label text-[#888888]">© 2026 Apoorva Anand</p>
              <a href="mailto:apoorv.anand1610@gmail.com" className="text-label text-[#888888] hover:text-[#4A4A4A] transition-colors">
                apoorv.anand1610@gmail.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
