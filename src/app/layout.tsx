import type { Metadata } from "next";
import { LenisProvider } from "@/registry/lib/lenis-provider";
import { inter } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ninetynine41 | For the ONE who has no one",
  description:
    "Ninetynine41 funds, delivers and sustains real-world change through specific community projects, helping the world's poorest people.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable}`}>
      <body className="min-h-full flex flex-col font-sans">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
