import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apoorva Anand — Creative Producer",
  description:
    "A creative leader and design enthusiast shaping brands and supporting impactful ideas through video editing, motion design, and brand design.",
  openGraph: {
    title: "Apoorva Anand — Creative Producer",
    description:
      "Video editing, motion design, and brand design for impactful ideas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="antialiased">
      <body className="grain">
        {children}
      </body>
    </html>
  );
}
