import type { Metadata } from "next";
import { Space_Grotesk, Sora, Inter } from "next/font/google";
import "./globals.css";
import { LenisWrapper } from "@/components/LenisWrapper";
import { rootMetadata } from "@/lib/metadata";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-grotesk",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sora",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

// Metadata pour la page racine - noindex car c'est juste la sélection de langue
export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${sora.variable} ${inter.variable}`}
    >
      <body>
        <LenisWrapper>{children}</LenisWrapper>
      </body>
    </html>
  );
}


