import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

function getEncodedKey() {
  const secretKey = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
  if (!secretKey) throw new Error("ADMIN_PASSWORD (or ADMIN_SESSION_SECRET) is not set");
  return new TextEncoder().encode(secretKey);
}

export async function createAdminSession() {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(getEncodedKey());

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function destroyAdminSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function verifyAdminSession(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, getEncodedKey(), { algorithms: ["HS256"] });
    return payload.role === "admin";
  } catch {
    return false;
  }
}
