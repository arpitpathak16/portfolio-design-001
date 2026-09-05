import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/session";
import { deleteExtra, type ContentSection } from "@/lib/store";

const SECTIONS: ContentSection[] = ["projects", "motionItems", "shortsItems"];

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ section: string; id: string }> }
) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { section, id } = await context.params;
  if (!SECTIONS.includes(section as ContentSection)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  await deleteExtra(section as ContentSection, Number(id));
  return NextResponse.json({ ok: true });
}
