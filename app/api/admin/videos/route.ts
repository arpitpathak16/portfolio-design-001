import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/session";
import { getExtra, addExtra, type ContentSection } from "@/lib/store";
import { extractYouTubeId } from "@/lib/youtube";
import type { AspectRatio } from "@/lib/data";

const SECTIONS: ContentSection[] = ["projects", "motionItems", "shortsItems"];

export async function GET() {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [projects, motionItems, shortsItems] = await Promise.all(
    SECTIONS.map((section) => getExtra(section))
  );

  return NextResponse.json({ projects, motionItems, shortsItems });
}

export async function POST(request: Request) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const section = body?.section as ContentSection;

  if (!SECTIONS.includes(section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const youtubeId = extractYouTubeId(String(body?.youtubeUrl ?? ""));
  if (!youtubeId) {
    return NextResponse.json(
      { error: "Could not find a YouTube video ID in that URL" },
      { status: 400 }
    );
  }

  const title = String(body?.title ?? "Untitled");
  const client = body?.client ? String(body.client) : undefined;
  const year = body?.year ? String(body.year) : undefined;

  try {
    if (section === "projects") {
      const entry = await addExtra(section, {
        title,
        client: client ?? "",
        category: body?.category ? String(body.category) : "",
        year: year ?? String(new Date().getFullYear()),
        aspect: (body?.aspect as AspectRatio) ?? "landscape",
        size: "wide",
        gradient: "from-zinc-950 via-stone-900 to-neutral-950",
        accentColor: "#D7D7D7",
        youtubeId,
        tags: Array.isArray(body?.tags) ? body.tags : [],
      });
      return NextResponse.json(entry);
    }

    const entry = await addExtra(section, {
      title,
      client,
      year,
      aspect: (body?.aspect as AspectRatio) ?? (section === "shortsItems" ? "portrait" : "landscape"),
      youtubeId,
      isShort: section === "shortsItems" ? true : undefined,
      gradient: "from-zinc-950 via-stone-900 to-neutral-950",
    });
    return NextResponse.json(entry);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to save video" },
      { status: 500 }
    );
  }
}
