"use client";

import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/social-icons";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/projects", label: "Projects" },
  { href: "/offline-for-99", label: "Offline For 99" },
  { href: "/donate", label: "Donate" },
  { href: "/shop", label: "Shop2Give" },
  { href: "/churches", label: "Churches" },
  { href: "/our-team", label: "Our Team" },
  { href: "/contact", label: "Contact" },
];

/**
 * Site chrome, not a numbered catalog module — client-specific navigation,
 * same reasoning as the starter's own SiteNav. Two-row header matching the
 * live WordPress site: a utility bar (social + search) over a full nav row.
 */
export function SiteHeader() {
  return (
    <header className="relative z-30">
      <div className="flex items-center justify-between gap-4 border-b border-black/5 bg-white px-6 py-3">
        <div className="flex items-center gap-3 text-brand-orange">
          <a href="https://www.facebook.com/profile.php?id=61574110970003" aria-label="Facebook" className="transition-opacity hover:opacity-70">
            <FacebookIcon className="h-4 w-4" />
          </a>
          <a href="https://www.instagram.com/ninety_nine4one/" aria-label="Instagram" className="transition-opacity hover:opacity-70">
            <InstagramIcon className="h-4 w-4" />
          </a>
        </div>

        <Link href="/" className="flex items-center">
          <Image src="/brand/9941-logo-hoz.png" alt="Ninetynine41" width={169} height={28} priority className="h-7 w-auto" />
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-400 sm:flex">
          <Search className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Search</span>
        </div>
      </div>

      <nav className="overflow-x-auto bg-brand-green px-6 py-3">
        <ul className="flex min-w-max items-center justify-center gap-7 text-sm font-semibold tracking-wide whitespace-nowrap text-white uppercase">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={link.href === "/" ? "text-brand-orange" : "transition-colors hover:text-brand-orange"}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
