export type AspectRatio = "landscape" | "portrait" | "square";
export type CardSize = "large" | "medium" | "small" | "wide";

export interface Project {
  id: number;
  title: string;
  client: string;
  category: string;
  year: string;
  aspect: AspectRatio;
  size: CardSize;
  gradient: string;        // fallback gradient when no real media
  accentColor: string;
  description?: string;
  // ── Media (pick one, or none for gradient fallback) ──────────────
  videoSrc?: string;       // local file: "/projects/my-reel.mp4"
  imageSrc?: string;       // local file: "/projects/thumb.jpg" — also used as video poster
  youtubeId?: string;      // YouTube video ID, e.g. "dQw4w9WgXcQ"
                           // thumbnail is fetched automatically; click opens lightbox
  loopVideo?: boolean;     // YouTube only: true = autoplay muted loop in card, false = static thumbnail (default)
  // ─────────────────────────────────────────────────────────────────
  tags: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// File placement guide
//   public/projects/landscape/   → widescreen videos/images (16:9, 21:9…)
//   public/projects/portrait/    → vertical videos/images  (9:16, 4:5…)
//   public/projects/square/      → square or near-square   (1:1…)
//
// Path convention
//   videoSrc:  "/projects/landscape/my-reel.mp4"
//   imageSrc:  "/projects/portrait/my-thumb.jpg"
//   youtubeId: "dQw4w9WgXcQ"   (no path needed — thumbnail is fetched automatically)
//
// The grid in FeaturedWork groups projects by `aspect` automatically, so
// landscape projects fill wide slots, portraits fill tall slots, squares fill
// the middle row. Just set aspect correctly and the layout handles itself.
// ─────────────────────────────────────────────────────────────────────────────

export const projects: Project[] = [

  // ── LANDSCAPE projects ────────────────────────────────────────────────────
  // Slot: hero (large, 2/3 width) and banner (full-width) — in that order
  {
    id: 10,
    title: "Priority Film 01",
    client: "Selected Work",
    category: "Brand Film",
    year: "2025",
    aspect: "landscape",
    size: "wide",
    gradient: "from-zinc-950 via-stone-900 to-neutral-950",
    accentColor: "#D7D7D7",
    description: "A selected 16:9 film piece added to the priority YouTube work set.",
    youtubeId: "xWlZkZnQVwQ",
    tags: ["Film", "Edit", "YouTube"],
  },
  {
    id: 11,
    title: "Priority Film 02",
    client: "Selected Work",
    category: "Brand Film",
    year: "2025",
    aspect: "landscape",
    size: "wide",
    gradient: "from-slate-950 via-zinc-900 to-stone-950",
    accentColor: "#D7D7D7",
    description: "A selected 16:9 film piece added to the priority YouTube work set.",
    youtubeId: "bkIVe0NLKS8",
    tags: ["Film", "Edit", "YouTube"],
  },
  {
    id: 12,
    title: "Priority Film 03",
    client: "Selected Work",
    category: "Brand Film",
    year: "2025",
    aspect: "landscape",
    size: "wide",
    gradient: "from-neutral-950 via-emerald-950 to-zinc-950",
    accentColor: "#D7D7D7",
    description: "A selected 16:9 film piece added to the priority YouTube work set.",
    youtubeId: "tUBHBtsUSBA",
    tags: ["Film", "Edit", "YouTube"],
  },
  {
    id: 13,
    title: "Priority Film 04",
    client: "Selected Work",
    category: "Brand Film",
    year: "2025",
    aspect: "landscape",
    size: "wide",
    gradient: "from-stone-950 via-neutral-900 to-neutral-950",
    accentColor: "#D7D7D7",
    description: "A selected 16:9 film piece added to the priority YouTube work set.",
    youtubeId: "my3Ubc-f_ME",
    tags: ["Film", "Edit", "YouTube"],
  },
  {
    id: 14,
    title: "Priority Film 05",
    client: "Selected Work",
    category: "Brand Film",
    year: "2025",
    aspect: "landscape",
    size: "wide",
    gradient: "from-cyan-950 via-slate-950 to-neutral-950",
    accentColor: "#D7D7D7",
    description: "A selected 16:9 film piece added to the priority YouTube work set.",
    youtubeId: "yXgBQYrWSV4",
    tags: ["Film", "Edit", "YouTube"],
  },
  {
    id: 1,
    title: "Adrish Ghee",
    client: "Adrish",
    category: "Brand Film",
    year: "2025",
    aspect: "landscape",
    size: "large",
    gradient: "from-stone-900 via-zinc-900 to-stone-950",
    accentColor: "#4A4A4A",
    description: "A warm product-led brand film shaped around craft, purity, and everyday ritual.",
    videoSrc: "/projects/portrait/Adrish-Ghee.mp4",
    // imageSrc: "/projects/landscape/Adrish-Ghee-thumb.jpg",  ← optional poster
    tags: ["Film", "Motion", "Brand"],
  },
  {
    id: 4,
    title: "Neon Dharma",
    client: "Amazon Prime Video",
    category: "Title Sequence",
    year: "2024",
    aspect: "landscape",
    size: "wide",
    gradient: "from-cyan-950 via-teal-900 to-slate-950",
    accentColor: "#D7D7D7",
    description: "A cinematic title treatment built with sharp type, atmosphere, and dramatic pacing.",
    youtubeId: "NqM0SGt_RZM",
    tags: ["Film", "Typography", "VFX"],
  },

  // ── PORTRAIT projects ─────────────────────────────────────────────────────
  // Slot: tall card (1/3 width, right side of hero row)
  {
    id: 2,
    title: "No Plastic",
    client: "Arani",
    category: "Title Design",
    year: "2025",
    aspect: "portrait",
    size: "medium",
    gradient: "from-violet-950 via-indigo-900 to-slate-950",
    accentColor: "#9E9EFF",
    description: "A direct motion piece using type and rhythm to frame a clean, anti-plastic message.",
    // youtubeId: "VIDEO_ID",   ← paste your YouTube ID here
    videoSrc: "/projects/portrait/Arani_No Plastic.mp4",
    tags: ["Typography", "Motion"],
  },


  // ── SQUARE projects ───────────────────────────────────────────────────────
  // Slot: three equal cards in the middle row
  {
    id: 5,
    title: "Bloom",
    client: "Lush Cosmetics",
    category: "Visual Identity",
    year: "2024",
    aspect: "square",
    size: "medium",
    gradient: "from-pink-900 via-rose-950 to-stone-950",
    accentColor: "#D7D7D7",
    description: "A social-first visual piece with expressive motion, soft product energy, and campaign polish.",
    // imageSrc: "/projects/square/bloom.jpg",
    videoSrc: "/projects/portrait/cocomama_reel.mp4",
    tags: ["Identity", "Art Direction"],
  },
  {
    id: 6,
    title: "Undercurrent",
    client: "Tanishq",
    category: "Brand Campaign",
    year: "2023",
    aspect: "square",
    size: "medium",
    gradient: "from-yellow-950 via-amber-900 to-stone-950",
    accentColor: "#D7D7D7",
    description: "A brand campaign edit balancing mood, identity, and motion-led storytelling.",
    youtubeId: "bNejx-mptFQ",
    // videoSrc: "/projects/portrait/cocomama_reel.mp4",
    // videoSrc: "/projects/square/undercurrent.mp4",
    tags: ["Film", "Identity"],
  },
    {
    id: 8,
    title: "Orbit",
    client: "Ola Electric",
    category: "Motion Graphics",
    year: "2024",
    aspect: "landscape",
    size: "wide",
    gradient: "from-emerald-950 via-teal-900 to-slate-950",
    accentColor: "#D7D7D7",
    description: "A motion graphics piece with fast transitions, clean product energy, and bold brand moments.",
    // videoSrc: "/projects/portrait/cocomama_reel.mp4",
    // videoSrc: "/projects/square/orbit.mp4",
    youtubeId: "fCdJaUdaxYc",
    tags: ["Motion", "Brand"],
    loopVideo: true, 
  },
  {
    id: 9,
    title: "Orbit",
    client: "Ola Electric",
    category: "Motion Graphics",
    year: "2024",
    aspect: "landscape",
    size: "wide",
    gradient: "from-emerald-950 via-teal-900 to-slate-950",
    accentColor: "#D7D7D7",
    description: "A compact motion edit built for momentum, clarity, and high-impact digital viewing.",
    // videoSrc: "/projects/square/orbit.mp4",
    youtubeId: "ZPal_EHbgGU",
    tags: ["Motion", "Brand"],
    loopVideo: true, 
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Motion Design items
//   videoSrc  → local file, e.g. "/projects/motion/my-animation.mp4"
//   gifSrc    → local GIF,  e.g. "/projects/motion/loop.gif"
//   youtubeId → YouTube ID, e.g. "dQw4w9WgXcQ" (thumbnail shown, click opens modal)
//   aspect    → controls card shape: landscape | portrait | square
// ─────────────────────────────────────────────────────────────────────────────
export interface MotionItem {
  id: number;
  title: string;
  client?: string;
  year?: string;
  aspect: AspectRatio;
  videoSrc?: string;
  gifSrc?: string;
  youtubeId?: string;
  loopVideo?: boolean;  // YouTube only: true = autoplay muted loop in card, false = thumbnail + click to play (default)
  description?: string;
  gradient: string;
}

export const motionItems: MotionItem[] = [
  { id: 1, title: "Motion Piece 1", aspect: "landscape", youtubeId: "k58PcKYfQMg", loopVideo: true, description: "Looping motion study with crisp timing, layered transitions, and editorial rhythm.", gradient: "from-slate-900 via-zinc-900 to-neutral-950" },
  { id: 2, title: "Motion Piece 2", aspect: "landscape", youtubeId: "D3cvdL24wy4", loopVideo: true, description: "A polished animation sequence built around movement, contrast, and visual pace.", gradient: "from-violet-950 via-indigo-900 to-slate-950" },
  { id: 3, title: "Motion Piece 3", aspect: "landscape", youtubeId: "FyT9WRZDLTM", loopVideo: true, description: "Energetic motion graphics with bold cuts and a punchy campaign-ready feel.", gradient: "from-zinc-950 via-neutral-900 to-stone-950" },
  { id: 4, title: "Motion Piece 4", aspect: "landscape", youtubeId: "thBymxP71pE", loopVideo: true, description: "A sleek title-style loop focused on timing, composition, and atmosphere.", gradient: "from-teal-950 via-cyan-900 to-slate-950" },
  { id: 5, title: "Motion Piece 5", aspect: "landscape", youtubeId: "MeyJKgAea_s", loopVideo: true, description: "A clean motion edit with smooth visual flow and brand-friendly pacing.", gradient: "from-emerald-950 via-green-900 to-slate-950" },
];

export const clients = [
  "Video Editing", "Reel Editing", "Creative Direction", "Motion Design", "Mockups",
  "Social Media Posts",
];

export const services = [
  {
    num: "01",
    title: "Creative Production",
    desc: "End-to-end creative support for brand films, campaigns, reels, and launch assets — from concept to final delivery.",
    tags: ["Concept", "Brand Films", "Campaigns", "Launch Assets"],
  },
  {
    num: "02",
    title: "Video Editing",
    desc: "Reels, brand films, and social videos cut with rhythm and purpose — from raw footage to final export.",
    tags: ["Reels", "Brand Films", "Social Video", "Short-form"],
  },
  {
    num: "03",
    title: "Motion Design",
    desc: "Animated graphics, title sequences, and transitions that make static ideas feel alive.",
    tags: ["Animated Graphics", "Title Sequences", "Motion Graphics"],
  },
  {
    num: "04",
    title: "Design",
    desc: "Mockups, brochures, infographics, event collaterals, and social media posts built to communicate and convert.",
    tags: ["Mockups", "Brochures & Infographics", "Event Collaterals", "Social Media"],
  },
];

export const stats = [
  { num: "05+", label: "Years of craft" },
  { num: "80+", label: "Projects delivered" },
  { num: "30+", label: "Brands elevated" },
  { num: "03", label: "Core disciplines" },
];
