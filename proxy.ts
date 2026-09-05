import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE } from "@/lib/session";

async function hasValidSession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const secretKey = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
  if (!secretKey) return false;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secretKey), { algorithms: ["HS256"] });
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const authed = await hasValidSession(request.cookies.get(SESSION_COOKIE)?.value);

  if (!authed) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
