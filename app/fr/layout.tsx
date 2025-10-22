import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = generateMetadata('fr');

export default function FrenchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StructuredData lang="fr" />
      {children}
    </>
  );
}
