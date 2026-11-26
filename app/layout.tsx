// Root layout: fonts, page metadata and the dark look shared by every page of the site.
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Unbounded } from "next/font/google";
import "./globals.css";

const displayFont = Unbounded({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-display",
});
const bodyFont = Inter({ subsets: ["latin"], variable: "--font-body" });
const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Godot Wingman",
  description:
    "A free MCP server that lets your AI app use the Godot editor: build scenes, write scripts, run and play the game.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
