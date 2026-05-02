import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

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
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${dmSerif.variable} antialiased`}
    >
      <body className="grain">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
