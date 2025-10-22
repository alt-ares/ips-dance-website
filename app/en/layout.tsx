import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = generateMetadata('en');

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StructuredData lang="en" />
      {children}
    </>
  );
}
