"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────
   Pixel-art arrow cursor
   Each cell in GRID is 3×3 CSS px (PIXEL_SIZE).
   Values: 0 = transparent | 1 = body (lime / orange on click) | 2 = outline (near-black)

   Visualised (* = outline, L = lime body, . = empty):
     Row  0:  * . . . . . . . .   ← tip / hotspot
     Row  1:  * * . . . . . . .
     Row  2:  * L * . . . . . .
     Row  3:  * L L * . . . . .
     Row  4:  * L L L * . . . .
     Row  5:  * L L L L * . . .
     Row  6:  * L L L L L * . .
     Row  7:  * L L L L L L * .
     Row  8:  * L L L L L L L *  ← widest (9 cells)
     Row  9:  * L L L L L L * .
     Row 10:  * L L L L L * . .
     Row 11:  * L L L L * . . .
     Row 12:  * L L L * . . . .
     Row 13:  * L L * . . . . .
     Row 14:  * L * . . . . . .
     Row 15:  * * . . . . . . .
     Row 16:  * . . . . . . . .  ← tail tip
   ───────────────────────────────────────────────────────────────── */
const PIXEL_SIZE = 3;

const GRID: number[][] = [
  [2],                                         // row  0 — tip
  [2, 2],                                      // row  1
  [2, 1, 2],                                   // row  2
  [2, 1, 1, 2],                                // row  3
  [2, 1, 1, 1, 2],                             // row  4
  [2, 1, 1, 1, 1, 2],                          // row  5
  [2, 1, 1, 1, 1, 1, 2],                       // row  6
  [2, 1, 1, 1, 1, 1, 1, 2],                    // row  7
  [2, 1, 1, 1, 1, 1, 1, 1, 2],                 // row  8 — widest
  [2, 1, 1, 1, 1, 1, 1, 2],                    // row  9
  [2, 1, 1, 1, 1, 2],                       // row 10
  [2, 1, 1, 1, 2],                          // row 11                                // row 14
  [2, 1, 2],                                      // row 15
  [2],                                         // row 16 — tail tip
];

const CURSOR_W = 9 * PIXEL_SIZE; // 27px
const CURSOR_H = GRID.length * PIXEL_SIZE; // 51px
const OUTLINE_COLOR = "#0A0A0A";
const BODY_LIME   = "#CDFF00";
const BODY_CLICK  = "#FF3D00"; // flashes orange on mousedown

/* ── Ring config per cursor state ── */
interface RingCfg { label: string; size: number }
const RING: Record<string, RingCfg> = {
  default:  { label: "",      size: 26 },
  hover:    { label: "VIEW",  size: 58 },
  clicking: { label: "",      size: 18 },
  text:     { label: "",      size: 0  },
  play:     { label: "PLAY",  size: 64 },
  drag:     { label: "DRAG",  size: 58 },
  open:     { label: "OPEN",  size: 58 },
};

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState("default");
  const [visible,     setVisible]     = useState(false);
  const [clicking,    setClicking]    = useState(false);

  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);

  /* Arrow nearly 1:1 — just enough spring to feel alive, not laggy */
  const arrowX = useSpring(rawX, { stiffness: 2400, damping: 90, mass: 0.15 });
  const arrowY = useSpring(rawY, { stiffness: 2400, damping: 90, mass: 0.15 });

  /* Ring trails behind with more spring lag */
  const ringX = useSpring(rawX, { stiffness: 200, damping: 24, mass: 0.55 });
  const ringY = useSpring(rawY, { stiffness: 200, damping: 24, mass: 0.55 });

  const resolveState = useCallback((el: Element | null) => {
    if (!el) return "default";
    const custom = el.getAttribute("data-cursor-label");
    if (custom) return custom.toLowerCase();
    const tag = el.tagName.toLowerCase();
    if (tag === "a" || tag === "button" || el.getAttribute("role") === "button") return "hover";
    if (window.getComputedStyle(el as HTMLElement).cursor === "text") return "text";
    return "default";
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
      setCursorState(resolveState(e.target as Element));
    };
    const onDown = () => setClicking(true);
    const onUp   = (e: MouseEvent) => {
      setClicking(false);
      setCursorState(resolveState(e.target as Element));
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove",     onMove,  { passive: true });
    window.addEventListener("mousedown",     onDown);
    window.addEventListener("mouseup",       onUp);
    document.addEventListener("mouseleave",  onLeave);
    document.addEventListener("mouseenter",  onEnter);

    return () => {
      window.removeEventListener("mousemove",    onMove);
      window.removeEventListener("mousedown",    onDown);
      window.removeEventListener("mouseup",      onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [rawX, rawY, resolveState]);

  const cfg         = RING[cursorState] ?? RING.default;
  const isExpanded  = cursorState !== "default" && cursorState !== "text" && !clicking;
  const bodyColor   = clicking ? BODY_CLICK : BODY_LIME;
  const arrowHidden = !visible || cursorState === "text";

  return (
    /* Wrapper is display:none on touch devices (hover:none media query) */
    <div className="hidden [@media(hover:hover)]:block" aria-hidden>

      {/* ── Trailing ring ───────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full flex items-center justify-center"
        style={{ x: ringX, y: ringY }}
        animate={{
          width:       cfg.size,
          height:      cfg.size,
          marginLeft:  -cfg.size / 2,
          marginTop:   -cfg.size / 2,
          opacity:     visible ? 1 : 0,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        initial={false}
      >
        <motion.div
          className="absolute inset-0 rounded-full border"
          animate={{
            borderColor:     isExpanded ? "rgba(205,255,0,0.6)" : "rgba(205,255,0,0.3)",
            backgroundColor: isExpanded ? "rgba(205,255,0,0.07)" : "transparent",
            scale: clicking ? 0.82 : 1,
          }}
          transition={{ duration: 0.2 }}
        />

        <AnimatePresence mode="wait">
          {cfg.label && (
            <motion.span
              key={cfg.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{   opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 select-none text-[8px] tracking-[0.22em] uppercase font-semibold text-[#CDFF00]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {cfg.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Pixel-art arrow ─────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{ x: arrowX, y: arrowY }}
        animate={{
          opacity: arrowHidden ? 0 : 1,
          scale:   clicking    ? 0.82 : 1,
        }}
        transition={{ duration: 0.12 }}
      >
        <svg
          width={CURSOR_W}
          height={CURSOR_H}
          viewBox={`0 0 ${CURSOR_W} ${CURSOR_H}`}
          shapeRendering="crispEdges"
          style={{ display: "block", imageRendering: "pixelated" }}
        >
          {GRID.map((row, rowIdx) =>
            row.map((cell, colIdx) => {
              if (cell === 0) return null;
              const fill = cell === 2 ? OUTLINE_COLOR : bodyColor;
              return (
                <rect
                  key={`${rowIdx}-${colIdx}`}
                  x={colIdx * PIXEL_SIZE}
                  y={rowIdx * PIXEL_SIZE}
                  width={PIXEL_SIZE}
                  height={PIXEL_SIZE}
                  fill={fill}
                />
              );
            })
          )}
        </svg>
      </motion.div>

    </div>
  );
}
