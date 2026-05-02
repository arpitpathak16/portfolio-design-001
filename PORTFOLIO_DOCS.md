# Pathakji Portfolio — Documentation

A comprehensive reference for understanding, editing, and extending this portfolio website.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [File Structure](#3-file-structure)
4. [Design System](#4-design-system)
   - [Colors](#colors)
   - [Typography](#typography)
   - [Spacing & Layout](#spacing--layout)
   - [Animation Principles](#animation-principles)
5. [Component Reference](#5-component-reference)
6. [Data Layer — How Content Works](#6-data-layer--how-content-works)
7. [Adding & Editing Content](#7-adding--editing-content)
   - [Adding a New Project](#adding-a-new-project)
   - [Adding Images](#adding-images)
   - [Adding Videos (Portrait & Landscape)](#adding-videos-portrait--landscape)
   - [Adding GIFs](#adding-gifs)
   - [Editing the About Section](#editing-the-about-section)
   - [Editing Services](#editing-services)
   - [Editing Clients / Marquee](#editing-clients--marquee)
   - [Changing Contact Info](#changing-contact-info)
8. [Adding New Sections](#8-adding-new-sections)
9. [Customizing Fonts](#9-customizing-fonts)
10. [Customizing Colors](#10-customizing-colors)
11. [Cursor System](#11-cursor-system)
12. [Navigation](#12-navigation)
13. [Deployment (Vercel)](#13-deployment-vercel)
14. [Performance Notes](#14-performance-notes)
15. [Common Customizations](#15-common-customizations)

---

## 1. Project Overview

**Pathakji** is a portfolio website built for a New Delhi–based creative studio. It showcases motion design, brand identity, and art direction work.

Design philosophy: *typography-first, dark premium, moments of unexpected color*. Inspired by:
- **nvmbr.in** — editorial typographic rigour, single accent color strategy
- **buck.co** — imagery-forward, neutral base, confident grid
- **illo.tv** — vibrant color moments, playful professionalism
- **rabithaus.com** — gallery-like, motion-focused, premium minimalism

---

## 2. Tech Stack

| Tool | Version | Role |
|------|---------|------|
| Next.js | 16 | Framework, App Router, static export |
| React | 19 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Utility-first styling |
| Framer Motion | 12 | All animations |
| next/font | built-in | Self-hosted Google Fonts (zero layout shift) |

**No other dependencies.** Keep it lean.

---

## 3. File Structure

```
portfolio-design/
│
├── app/
│   ├── layout.tsx          ← Root layout: fonts, metadata, CustomCursor mount
│   ├── page.tsx            ← Page composition (imports all sections in order)
│   └── globals.css         ← Design tokens (@theme), base styles, animations
│
├── components/
│   ├── Navigation.tsx      ← Fixed top nav + mobile fullscreen overlay menu
│   ├── Hero.tsx            ← Full-screen opening section
│   ├── FeaturedWork.tsx    ← Asymmetric project grid layout
│   ├── ProjectCard.tsx     ← Individual project card (handles image/video/GIF)
│   ├── MarqueeStrip.tsx    ← Infinite horizontal marquee (clients/text)
│   ├── About.tsx           ← Studio bio, stats, portrait
│   ├── Services.tsx        ← Services list + process pill
│   ├── Contact.tsx         ← Email CTA + social links
│   ├── Footer.tsx          ← Minimal footer bar
│   └── CustomCursor.tsx    ← Custom arrow cursor with contextual states
│
├── lib/
│   └── data.ts             ← ALL editable content: projects, clients, services, stats
│
├── public/
│   └── projects/           ← Drop media files here (images, videos, GIFs)
│       └── .gitkeep
│
├── next.config.ts          ← Next.js config (image domains, headers)
├── tsconfig.json           ← TypeScript config
└── PORTFOLIO_DOCS.md       ← This file
```

**Golden rule:** 99% of content changes happen only in `lib/data.ts` and `public/projects/`. You should rarely need to touch component files for routine updates.

---

## 4. Design System

### Colors

All colors are defined as CSS custom properties in `app/globals.css` under the `@theme` block. They are also usable as Tailwind classes (e.g. `bg-ink`, `text-lime`).

| Token | Hex | Usage |
|-------|-----|-------|
| `ink` | `#080808` | Primary background — near-black, slightly warm |
| `surface` | `#101010` | Card backgrounds, inset panels |
| `border` | `#1E1E1E` | Dividers, card borders, hr elements |
| `warm-white` | `#F5F0E8` | Primary text on dark backgrounds |
| `cream` | `#F4F1EC` | About section background — the one light break |
| `muted` | `#666666` | Secondary text, descriptions, metadata |
| `orange` | `#FF3D00` | Primary CTA accent, hover states, energy moments |
| `lime` | `#CDFF00` | Secondary surprise accent, cursor, underlines, availability badge |
| `violet` | `#9E9EFF` | Tertiary accent, italic heading highlights |

**Why this palette:** The dark base reads premium and editorial. Warm-white instead of pure white reduces eye strain and feels more human. Orange and lime are complementary high-energy accents — orange is warm (Indian resonance), lime is unexpected (creative signal). Violet adds depth. The cream About section creates a "breath" in the layout — critical for pacing.

### Typography

Three fonts, each with a single job:

| Variable | Font | Weights | Job |
|----------|------|---------|-----|
| `--font-display` | Space Grotesk | 300–700 | All headings, display text, labels, navigation |
| `--font-body` | DM Sans | 300–600 | Body copy, descriptions, captions |
| `--font-serif` | DM Serif Display | 400 italic | Accent italic word in section titles only |

**Fluid type classes** (defined in `globals.css`, work at all screen sizes):

| Class | Size range | Usage |
|-------|-----------|-------|
| `.text-hero` | 3.5rem → 13rem | Main hero headline only |
| `.text-display` | 2.5rem → 7rem | Section titles |
| `.text-heading` | 1.75rem → 4rem | Sub-section titles, About statement |
| `.text-subhead` | 1rem → 1.5rem | Intro paragraphs, bio text |
| `.text-label` | 0.6875rem fixed | All caps labels, nav, tags, metadata |

### Spacing & Layout

- **Page padding:** `px-6` (mobile) → `px-10` (desktop). Applied consistently across all sections.
- **Section vertical padding:** `py-20` (mobile) → `py-28` (desktop).
- **Grid gaps:** `gap-3` (mobile) → `gap-4` (desktop).
- **Border radius on cards:** `rounded-xl` (12px) — consistent across all cards.

### Animation Principles

All animations use one of two easing curves:

```css
--ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1)   /* Snappy entry, feels fast */
--ease-in-out:    cubic-bezier(0.76, 0, 0.24, 1)   /* Smooth state changes */
```

**Rules:**
- Scroll-triggered animations use `useInView` with `once: true` — they play once and stay.
- Hover animations use Framer Motion `whileHover` or CSS `transition`.
- Never animate `width`, `height`, or `top/left` — only `transform` and `opacity` (GPU-accelerated).
- Spring physics on cursor only (not page content — too distracting).

---

## 5. Component Reference

### `Navigation.tsx`
- Fixed position, transparent background
- Becomes frosted glass (`backdrop-blur`) after scrolling 60px
- Desktop: inline links + "Available" pill
- Mobile: hamburger → fullscreen overlay with staggered link animations
- **To change nav links:** Edit the `navLinks` array at the top of the file

### `Hero.tsx`
- Full viewport height
- Headline uses letter-by-letter stagger (each letter is a `motion.span`)
- Parallax effect on scroll via `useScroll` + `useTransform`
- Background gradient orbs (pure CSS, no images)
- **To change the headline:** Edit the `headline` const
- **To change roles:** Edit the `roles` array

### `FeaturedWork.tsx`
- Pulls first 6 projects from `lib/data.ts`
- Three-row asymmetric grid: `2/3+1/3`, `1/3+1/3+1/3`, `full`
- **To change layout:** Adjust `grid-cols` and `h-[]` props
- **To show more/fewer projects:** Destructure more/fewer items from `projects`

### `ProjectCard.tsx`
- Handles three media types: video (autoplay on hover), image, gradient fallback
- Info overlay (`info-reveal`) slides up from bottom on hover
- `data-cursor` attribute on the card triggers cursor expansion
- Videos: `preload="none"`, play on mouseenter, reset on mouseleave

### `MarqueeStrip.tsx`
- CSS animation (`marquee-track` class from globals.css)
- Content doubles itself for seamless looping
- Two variants: `"dark"` (on dark bg) and `"light"` (on cream bg)
- **To change speed:** Edit `animation: marquee 22s` in `globals.css`
- **To pause on hover:** Already implemented (class `marquee-track:hover`)

### `About.tsx`
- Cream background — the single light-mode section
- Word-by-word reveal on the statement paragraph
- Stats grid pulls from `lib/data.ts → stats`
- Portrait placeholder — replace the `<div>` with `<Image>` when ready
- **To add your photo:** See [Adding Images](#adding-images)

### `Services.tsx`
- Pulls from `lib/data.ts → services`
- Hover interaction: row slides right
- Process pill CTA at bottom
- **To change process steps:** Edit the `<p>` content in Services.tsx directly

### `Contact.tsx`
- Email address is the hero of this section
- Each letter of "PATHAKJI" bounces independently on hover
- Social links array is inline in the component
- **To change email/socials:** Edit in `Contact.tsx`

### `CustomCursor.tsx`
- Hides the OS cursor (`cursor: none` on body)
- SVG arrow at exact mouse position (no lag)
- Spring-following ring that changes state based on `data-cursor-label` attributes
- Falls back to default cursor on touch devices
- See [Cursor System](#11-cursor-system) for full details

---

## 6. Data Layer — How Content Works

All portfolio content lives in `lib/data.ts`. This is the **only file you need to edit** for content updates.

### Project object shape

```typescript
{
  id: number,           // Unique ID (just increment)
  title: string,        // Project name shown on card
  client: string,       // Client name shown on card
  category: string,     // e.g. "Brand Film", "Visual Identity"
  year: string,         // e.g. "2025"
  aspect: "landscape" | "portrait" | "square",  // Media orientation
  size: "large" | "medium" | "small" | "wide",  // Hint for grid sizing
  gradient: string,     // Tailwind gradient classes — used when no media file
  accentColor: string,  // Hex — used in hover text (currently unused, reserved)
  videoSrc?: string,    // Path like "/projects/nike-reel.mp4"
  imageSrc?: string,    // Path like "/projects/zara-thumb.jpg"
  tags: string[],       // Shown as pills on the card
}
```

---

## 7. Adding & Editing Content

### Adding a New Project

1. Open `lib/data.ts`
2. Add a new object to the `projects` array:

```typescript
{
  id: 7,                          // next number in sequence
  title: "Pulse",
  client: "Spotify India",
  category: "Brand Campaign",
  year: "2025",
  aspect: "landscape",
  size: "medium",
  gradient: "from-green-900 via-emerald-950 to-stone-950",  // fallback color
  accentColor: "#1DB954",
  imageSrc: "/projects/spotify-thumb.jpg",  // optional
  videoSrc: "/projects/spotify-reel.mp4",   // optional
  tags: ["Campaign", "Motion", "Identity"],
}
```

3. In `FeaturedWork.tsx`, destructure the new project and place it in the grid:

```tsx
const [p1, p2, p3, p4, p5, p6, p7] = projects;
// Then add <ProjectCard project={p7} ... /> where you want it
```

### Adding Images

1. Put the file in `public/projects/` — supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`
2. Reference it in `lib/data.ts`:

```typescript
imageSrc: "/projects/your-file.jpg",
```

**Recommended sizes:**
- Landscape cards: 1600×900px minimum
- Portrait cards: 900×1200px minimum  
- Square cards: 1000×1000px minimum
- Keep files under 500KB — use WebP for best results

### Adding Videos (Portrait & Landscape)

Both orientations work automatically because cards use `object-fit: cover`.

1. Put the video in `public/projects/` — use `.mp4` (H.264, web-optimized)
2. Reference in `lib/data.ts`:

```typescript
videoSrc: "/projects/your-reel.mp4",
imageSrc: "/projects/your-poster.jpg",  // shown before video plays
```

**Video encoding tips for web:**
```bash
# Compress with ffmpeg (install via brew)
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -movflags +faststart -an output.mp4
```
- `-an` removes audio (not needed for autoplay hover reels)
- `-movflags +faststart` puts metadata at the front for faster streaming
- Target: under 8MB for a 6–10 second loop

**Portrait vs Landscape:** The card height is controlled by the `h-[]` class on `<ProjectCard>`. A tall `h-[70vw]` card with `aspect: "portrait"` video will show a portrait crop. No extra configuration needed.

### Adding GIFs

GIFs work identically to images — just reference them as `imageSrc`:

```typescript
imageSrc: "/projects/animation-loop.gif",
```

GIFs autoplay natively in `<img>` tags. For large GIFs (>2MB), prefer converting to `.mp4` with the ffmpeg command above — video files are typically 10× smaller.

### Editing the About Section

Open `components/About.tsx`:

- **Statement paragraph:** Change the `statement` const
- **Studio description:** Edit the two `<p>` tags in the bio column
- **Founder name:** Edit `<strong>Arpit Pathak</strong>`
- **Stats:** Edit `lib/data.ts → stats` array:

```typescript
export const stats = [
  { num: "08+", label: "Years of craft" },
  { num: "120+", label: "Projects shipped" },
  // add or edit entries here
];
```

- **Studio photo:** Replace the placeholder `<div>` with:

```tsx
import Image from "next/image";
// ...
<Image
  src="/about/studio.jpg"
  alt="Studio portrait"
  fill
  className="object-cover"
/>
```

### Editing Services

Open `lib/data.ts → services`:

```typescript
export const services = [
  { num: "01", title: "Brand Identity", desc: "Your description here." },
  { num: "02", title: "Motion Design",  desc: "Your description here." },
  // add more or edit existing
];
```

The component auto-renders however many items are in the array.

### Editing Clients / Marquee

Open `lib/data.ts → clients`:

```typescript
export const clients = [
  "Zara", "Sony Music", "Amazon", "Nike", // etc.
];
```

The `MarqueeStrip` component uses this array for both the dark and light marquee strips. Items are duplicated automatically for the seamless loop.

### Changing Contact Info

Open `components/Contact.tsx` — edit these at the top of the component:

```tsx
const email = "hello@pathakji.com";   // ← your email

const socials = [
  { label: "Instagram", href: "https://instagram.com/yourhandle" },
  { label: "Behance",   href: "https://behance.net/yourprofile" },
  { label: "Vimeo",     href: "https://vimeo.com/yourprofile" },
  { label: "LinkedIn",  href: "https://linkedin.com/in/yourprofile" },
];
```

---

## 8. Adding New Sections

To add a section (e.g. "Awards", "Process", "Testimonials"):

**Step 1** — Create the component file, e.g. `components/Awards.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Awards() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="awards" className="px-6 md:px-10 py-20 md:py-28 border-t border-[#1E1E1E]">
      <div ref={ref}>
        {/* your content */}
      </div>
    </section>
  );
}
```

**Step 2** — Import and place it in `app/page.tsx`:

```tsx
import Awards from "@/components/Awards";
// ...
<Services />
<Awards />      {/* ← add here */}
<Contact />
```

**Step 3** — Add a nav link in `components/Navigation.tsx`:

```tsx
const navLinks = [
  { label: "Work",    href: "#work" },
  { label: "Awards",  href: "#awards" },  // ← add here
  // ...
];
```

---

## 9. Customizing Fonts

Fonts are loaded in `app/layout.tsx` via `next/font/google`.

**To swap a font:**

1. Go to [fonts.google.com](https://fonts.google.com), pick a font
2. In `app/layout.tsx`, replace the import:

```tsx
import { Space_Grotesk, DM_Sans, DM_Serif_Display } from "next/font/google";
// Change Space_Grotesk to e.g. Cabinet_Grotesk or Clash_Display
```

3. Update the variable name and `--font-display` in `globals.css`

**Note:** `next/font` self-hosts the fonts on Vercel — no external requests, zero layout shift.

---

## 10. Customizing Colors

All colors are in `app/globals.css` inside the `@theme {}` block:

```css
@theme {
  --color-orange: #FF3D00;   /* ← change this for a new accent */
  --color-lime:   #CDFF00;   /* ← cursor + underlines */
  /* ... */
}
```

After changing, Tailwind automatically picks up the new values — no config restart needed.

**To add a new color:**

```css
@theme {
  --color-gold: #D4A017;
}
```

Then use it in components as `bg-gold`, `text-gold`, `border-gold`.

---

## 11. Cursor System

The custom cursor (`components/CustomCursor.tsx`) replaces the OS cursor on non-touch devices.

**Architecture:**
- **Arrow** — SVG arrow at exact mouse position, no spring lag. This is the "hotspot".
- **Ring** — Larger circle with spring physics, lags slightly behind. Expands on hover.
- **Label** — Text inside the ring on hover states.

**Cursor states:**

| State | Trigger | Visual |
|-------|---------|--------|
| Default | Anywhere | Arrow + small ring |
| Link hover | `<a>`, `<button>` | Ring expands + "VIEW" label |
| Media hover | `data-cursor-label="PLAY"` | Ring + "PLAY" label |
| Drag hint | `data-cursor-label="DRAG"` | Ring + "DRAG" label |
| Clicking | `mousedown` | Arrow + ring scale down |

**To add a custom cursor label to any element:**

```tsx
<div data-cursor-label="PLAY">...</div>
<div data-cursor-label="DRAG">...</div>
<div data-cursor-label="VIEW">...</div>
```

The cursor reads this attribute and displays it inside the ring.

---

## 12. Navigation

The nav has two states: transparent (hero) → frosted glass (scrolled).

**Scroll threshold:** Change `window.scrollY > 60` in `Navigation.tsx`

**To add/remove nav links:** Edit the `navLinks` array in `Navigation.tsx`

**Mobile breakpoint:** `md:` (768px) — below this the hamburger menu shows

**Logo:** The text "PATHAKJI" is in the `<a>` tag with `href="#"`. Replace with an SVG logo if needed:

```tsx
<a href="#">
  <Image src="/logo.svg" alt="Pathakji" width={100} height={24} />
</a>
```

---

## 13. Deployment (Vercel)

**One-click deploy:**

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project → select your repo
3. Framework: Next.js (auto-detected)
4. Click Deploy — done

**Environment variables:** None required for the base setup.

**Custom domain:** In Vercel dashboard → Project → Settings → Domains → Add domain.

**Media files in `public/`:** Vercel serves these from its CDN automatically. Large video files (>10MB) should be hosted on Cloudflare R2, AWS S3, or Vimeo and referenced by URL instead of placed in `public/`.

**For video hosted externally:**
```typescript
videoSrc: "https://your-cdn.com/project-reel.mp4",
```

---

## 14. Performance Notes

- **Fonts:** Loaded via `next/font` — no FOUT, no external requests
- **Videos:** `preload="none"` — only fetched on hover, never on page load
- **Animations:** Only `transform` and `opacity` are animated — both GPU-accelerated, no layout reflow
- **Images:** Use `next/image` when possible for automatic WebP conversion + lazy loading
- **Grain texture:** Pure SVG inline in CSS `content` — no image request
- **Static build:** The site pre-renders to HTML at build time — instant first load on Vercel Edge

---

## 15. Common Customizations

### Change the hero headline
```tsx
// components/Hero.tsx, line ~11
const headline = "YOUR NEW HEADLINE HERE.";
```

### Change studio location (hero + footer)
- Hero: `components/Hero.tsx` → `"Creative Studio — New Delhi, India"`
- Footer: `components/Footer.tsx` → first `<p>` tag

### Change the "Available" status in nav
```tsx
// components/Navigation.tsx
// Find the pill and change text or color:
<span className="... bg-[#CDFF00] ...">
  Available  // ← change to "On Pause" or remove the pill entirely
</span>
```

### Change marquee speed
```css
/* app/globals.css */
.marquee-track {
  animation: marquee 22s linear infinite; /* ← lower = faster */
}
```

### Change project card height in the grid
```tsx
// components/FeaturedWork.tsx
<ProjectCard ... className="h-[50vw] md:h-[36vw]" />
//                                   ↑ adjust these values
```

### Add a new section background style
If you need a section with a different background (not dark, not cream):
```tsx
// In any section component, change the className:
<section className="bg-[#0F0A00] ...">   // e.g. very dark amber
```

### Remove the grain texture
```css
/* app/globals.css — remove the .grain::after block entirely */
/* Also remove className="grain" from body in app/layout.tsx */
```

### Disable the custom cursor
```tsx
// app/layout.tsx — remove <CustomCursor /> 
// app/globals.css — remove cursor: none from body
```
