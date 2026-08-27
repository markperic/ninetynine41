"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FacebookIcon, InstagramIcon } from "@/components/social-icons";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/projects", label: "Projects" },
  { href: "/offline-for-99", label: "Offline For 99" },
  { href: "/shop", label: "Shop2Give" },
  { href: "/churches", label: "Churches" },
  { href: "/our-team", label: "Our Team" },
  { href: "/contact", label: "Contact" },
];

/** Scroll distance, in px, before the bar solidifies to brand green. */
const SOLID_AT = 40;

/**
 * Site chrome, not a numbered catalog module — client-specific navigation.
 * A floating bar, fixed over the page: transparent with white text at rest
 * (so it reads over the hero photo), solid brand-green once the page has
 * scrolled past it. Height is fixed (`h-24`) — see `--page-chrome` in
 * globals.css, which the homepage sets to match so the hero's own content
 * clears it — same reasoning module 97 gives for a fixed-height wrapper
 * rather than one that resizes with the scroll state.
 */
export function SiteHeader() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > SOLID_AT);
    const first = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex h-24 items-center px-6 transition-colors duration-300 ${
        solid ? "bg-brand-green" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6">
        <Link href="/" className="shrink-0">
          {/* Reversed to solid white — the full-color mark doesn't hold
              contrast over a photo or the dark-green bar, and a nav logo
              being single-color is the standard trade for that. */}
          <Image
            src="/brand/9941-logo-hoz.png"
            alt="Ninetynine41"
            width={169}
            height={28}
            priority
            className="h-7 w-auto brightness-0 invert"
          />
        </Link>

        <nav className="overflow-x-auto">
          <ul className="flex min-w-max items-center gap-7 text-sm font-semibold tracking-wide whitespace-nowrap text-white uppercase">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-brand-orange">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/donate"
                className="rounded-full bg-brand-orange px-5 py-2 normal-case tracking-normal text-white transition-colors hover:bg-brand-orange/90"
              >
                Donate
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-4 text-white">
          <a href="https://www.facebook.com/profile.php?id=61574110970003" aria-label="Facebook" className="transition-opacity hover:opacity-70">
            <FacebookIcon className="h-4 w-4" />
          </a>
          <a href="https://www.instagram.com/ninety_nine4one/" aria-label="Instagram" className="transition-opacity hover:opacity-70">
            <InstagramIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
