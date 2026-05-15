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
  gradient: string;
  accentColor: string;
  description?: string;
  videoSrc?: string;
  imageSrc?: string;
  youtubeId?: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 10,
    title: "Indian Raga Album Trailer",
    client: "Indian Raga",
    category: "Launch Trailer",
    year: "2025",
    aspect: "landscape",
    size: "wide",
    gradient: "from-zinc-950 via-stone-900 to-neutral-950",
    accentColor: "#D7D7D7",
    description: "Led the editing for the launch trailer of the Indian Raga and Aim for Seva collaboration.",
    youtubeId: "xWlZkZnQVwQ",
    tags: ["Trailer", "Editing", "Collaboration"],
  },
  {
    id: 11,
    title: "Dastkari Promo",
    client: "Dastkari",
    category: "Promotional Film",
    year: "2025",
    aspect: "landscape",
    size: "wide",
    gradient: "from-slate-950 via-zinc-900 to-stone-950",
    accentColor: "#D7D7D7",
    description: "A behind-the-scenes promotional video for the premium furniture brand Dastkari.",
    youtubeId: "bkIVe0NLKS8",
    tags: ["BTS", "Furniture", "Promotion"],
  },
  {
    id: 12,
    title: "Vinyasa After Movie",
    client: "Vinyasa Earth",
    category: "Event Film",
    year: "2025",
    aspect: "landscape",
    size: "wide",
    gradient: "from-neutral-950 via-emerald-950 to-zinc-950",
    accentColor: "#D7D7D7",
    description: "From quiet residencies to soul-stirring gatherings — explore the workshops, retreats, and community events unfolding at Vinyasa Earth this season.",
    youtubeId: "tUBHBtsUSBA",
    tags: ["Film", "Community", "Events"],
  },
  {
    id: 13,
    title: "Naturaltein Packaging Relaunch",
    client: "Naturaltein",
    category: "Creative Direction",
    year: "2025",
    aspect: "landscape",
    size: "wide",
    gradient: "from-stone-950 via-neutral-900 to-neutral-950",
    accentColor: "#D7D7D7",
    description: "Creative direction for Naturaltein’s packaging relaunch, shaping the brand’s refreshed visual identity.",
    youtubeId: "my3Ubc-f_ME",
    tags: ["Creative Direction", "Packaging", "Identity"],
  },
  {
    id: 14,
    title: "Scorpio Post Event",
    client: "Scorpio",
    category: "Event Film",
    year: "2025",
    aspect: "landscape",
    size: "wide",
    gradient: "from-cyan-950 via-slate-950 to-neutral-950",
    accentColor: "#D7D7D7",
    description: "A post-event film shaped around atmosphere, audience energy, and branded moments.",
    youtubeId: "yXgBQYrWSV4",
    tags: ["Event", "Editing", "Promotion"],
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
    description: "A marketing promotional reel for the launch of Adrish Ghee.",
    videoSrc: "/projects/portrait/Adrish-Ghee_web.mp4",
    tags: ["Film", "Motion", "Brand"],
  },
  {
    id: 4,
    title: "Haji Documentary",
    client: "Haji",
    category: "Documentary",
    year: "2024",
    aspect: "landscape",
    size: "wide",
    gradient: "from-cyan-950 via-teal-900 to-slate-950",
    accentColor: "#D7D7D7",
    description: "A documentary film shaped around character, place, and lived experience.",
    youtubeId: "NqM0SGt_RZM",
    tags: ["Documentary", "Film", "Editing"],
  },
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
    videoSrc: "/projects/portrait/Arani_No Plastic_web.mp4",
    tags: ["Typography", "Motion"],
  },
  {
    id: 5,
    title: "Coco Mama",
    client: "Coco Mama",
    category: "Marketing Reel",
    year: "2024",
    aspect: "square",
    size: "medium",
    gradient: "from-pink-900 via-rose-950 to-stone-950",
    accentColor: "#D7D7D7",
    description: "A promotional marketing reel for Coco Mama, crafted entirely using stock footage.",
    videoSrc: "/projects/portrait/cocomama_reel_web.mp4",
    tags: ["Reel", "Stock Footage", "Marketing"],
  },
  {
    id: 6,
    title: "The Routine - Short Film",
    client: "India Film Project",
    category: "Short Film",
    year: "2023",
    aspect: "square",
    size: "medium",
    gradient: "from-yellow-950 via-amber-900 to-stone-950",
    accentColor: "#D7D7D7",
    description: "Short film for India Film Project made under 50 hours.",
    youtubeId: "bNejx-mptFQ",
    tags: ["Short Film", "Editing"],
  },
  {
    id: 8,
    title: "Worm App Promo",
    client: "Worm App",
    category: "App Promo",
    year: "2024",
    aspect: "landscape",
    size: "wide",
    gradient: "from-emerald-950 via-teal-900 to-slate-950",
    accentColor: "#D7D7D7",
    description: "A promotional app film with fast transitions, clean product energy, and bold brand moments.",
    youtubeId: "fCdJaUdaxYc",
    tags: ["Promo", "App", "Brand"],
  },
  {
    id: 9,
    title: "Pursuit of Passion - Episode 02",
    client: "The Misfits",
    category: "Documentary Series",
    year: "2024",
    aspect: "landscape",
    size: "wide",
    gradient: "from-emerald-950 via-teal-900 to-slate-950",
    accentColor: "#D7D7D7",
    description: "Direction work for these young boys from Uttarpara call themselves 'The Misfits' and aim to add their unique zing to the hip-hop culture. Their art speaks for the connection they share with each other since childhood.",
    youtubeId: "ZPal_EHbgGU",
    tags: ["Film", "Direction", "Documentary"],
  },
];

export interface MotionItem {
  id: number;
  title: string;
  client?: string;
  year?: string;
  aspect: AspectRatio;
  videoSrc?: string;
  gifSrc?: string;
  youtubeId?: string;
  isShort?: boolean;
  description?: string;
  gradient: string;
}

export const motionItems: MotionItem[] = [
  {
    id: 1,
    title: "Motion Piece 1",
    aspect: "landscape",
    youtubeId: "k58PcKYfQMg",
    description: "Looping motion study with crisp timing, layered transitions, and editorial rhythm.",
    gradient: "from-slate-900 via-zinc-900 to-neutral-950",
  },
  {
    id: 2,
    title: "Motion Piece 2",
    aspect: "landscape",
    youtubeId: "D3cvdL24wy4",
    description: "A polished animation sequence built around movement, contrast, and visual pace.",
    gradient: "from-violet-950 via-indigo-900 to-slate-950",
  },
  {
    id: 3,
    title: "Motion Piece 3",
    aspect: "landscape",
    youtubeId: "FyT9WRZDLTM",
    description: "Energetic motion graphics with bold cuts and a punchy campaign-ready feel.",
    gradient: "from-zinc-950 via-neutral-900 to-stone-950",
  },
  {
    id: 4,
    title: "Motion Piece 4",
    aspect: "landscape",
    youtubeId: "thBymxP71pE",
    description: "A sleek title-style loop focused on timing, composition, and atmosphere.",
    gradient: "from-teal-950 via-cyan-900 to-slate-950",
  },
  {
    id: 5,
    title: "Motion Piece 5",
    aspect: "landscape",
    youtubeId: "MeyJKgAea_s",
    description: "A clean motion edit with smooth visual flow and brand-friendly pacing.",
    gradient: "from-emerald-950 via-green-900 to-slate-950",
  },
];

export const shortsItems: MotionItem[] = [
  {
    id: 1,
    title: "Vinyasa Teaser",
    client: "Vinyasa",
    year: "2025",
    aspect: "portrait",
    youtubeId: "DOduV3QppHU",
    isShort: true,
    description: "A vertical teaser shaped for quick, atmospheric discovery.",
    gradient: "from-zinc-950 via-stone-900 to-neutral-950",
  },
  {
    id: 2,
    title: "Language Day",
    client: "U.S. Consulate Mumbai",
    year: "2025",
    aspect: "portrait",
    youtubeId: "dYaAApMGQJM",
    isShort: true,
    description: "Short-format event coverage with crisp pacing and a social-first frame.",
    gradient: "from-cyan-950 via-slate-950 to-neutral-950",
  },
  {
    id: 3,
    title: "Cloud Kitchen",
    client: "Kiran Bilgirri",
    year: "2025",
    aspect: "portrait",
    youtubeId: "R8T6s0n6h4c",
    isShort: true,
    description: "A compact food/business story edited for mobile viewing.",
    gradient: "from-emerald-950 via-green-900 to-slate-950",
  },
  {
    id: 4,
    title: "Invite Video",
    client: "Herbie Hancock",
    year: "2025",
    aspect: "portrait",
    youtubeId: "qoThfnlS7jg",
    isShort: true,
    description: "A punchy invite cut with a direct, personality-led rhythm.",
    gradient: "from-violet-950 via-indigo-900 to-slate-950",
  },
  {
    id: 5,
    title: "Day in the Life",
    client: "Editorial",
    year: "2025",
    aspect: "portrait",
    youtubeId: "qkM31BDtc68",
    isShort: true,
    description: "Everyday moments shaped into a fast, intimate vertical edit.",
    gradient: "from-stone-950 via-neutral-900 to-neutral-950",
  },
  {
    id: 7,
    title: "Coco Mama Ad 02",
    client: "Coco Mama",
    year: "2025",
    aspect: "portrait",
    youtubeId: "zV-JT6PjoD4",
    isShort: true,
    description: "A second compact product ad built for quick social recall.",
    gradient: "from-teal-950 via-cyan-900 to-slate-950",
  },
  {
    id: 12,
    title: "Weather Condition",
    client: "Healthcare",
    year: "2025",
    aspect: "portrait",
    youtubeId: "G9b_tNEbysw",
    isShort: true,
    description: "A mobile edit balancing script, visual beats, and legibility.",
    gradient: "from-slate-950 via-zinc-900 to-neutral-950",
  },
  {
    id: 13,
    title: "Product Motion Graphic",
    client: "Product",
    year: "2025",
    aspect: "portrait",
    youtubeId: "YmxYPZN-VPI",
    isShort: true,
    description: "A vertical product motion piece with clean graphic movement.",
    gradient: "from-emerald-950 via-green-900 to-slate-950",
  },
];

export const clients = [
  "Video Editing",
  "Reel Editing",
  "Creative Direction",
  "Motion Design",
  "Mockups",
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
