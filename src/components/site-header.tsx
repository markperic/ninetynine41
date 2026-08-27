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

/** Scroll distance, in px, before the bar solidifies and condenses. */
const SOLID_AT = 40;

/**
 * Site chrome, not a numbered catalog module — client-specific navigation.
 * A full-width bar, fixed over the page: transparent and tall (`h-24`) at
 * rest so it reads over the hero photo, solid brand-green and condensed
 * (`h-14`) once the page has scrolled past it — matching module 97's
 * "condense past a threshold" pattern, just on height instead of opacity.
 *
 * Nav links are centered on the *bar*, not merely in the space left over
 * between the logo and the social icons — they're `absolute` and
 * `left-1/2 -translate-x-1/2` rather than a plain flex sibling, so their
 * own width never fights the logo/icons for room, which is what was
 * clipping the Donate pill before (the nav's flex allocation had ~30px
 * less than its content needed).
 *
 * `--page-chrome` in globals.css is set to this bar's resting height
 * (`6rem`) so the hero's own top padding clears it — see hero.tsx.
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
      className={`fixed inset-x-0 top-0 z-50 flex items-center px-6 transition-[height,background-color] duration-300 ${
        solid ? "h-14 bg-brand-green shadow-sm" : "h-24 bg-transparent"
      }`}
    >
      <div className="relative flex w-full items-center justify-between">
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
            className={`w-auto brightness-0 invert transition-[height] duration-300 ${solid ? "h-5" : "h-7"}`}
          />
        </Link>

        {/* max-w reserves room for the logo + icon cluster + padding on
            both sides (~20rem total) so centering never overlaps them;
            overflow-x-auto is the fallback if links still don't fit below
            that, same trick module 97 doesn't need but this bar does since
            every link stays visible rather than collapsing to a hamburger. */}
        <nav className="absolute top-1/2 left-1/2 max-w-[calc(100vw-20rem)] -translate-x-1/2 -translate-y-1/2 overflow-x-auto">
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
                className="inline-block rounded-full bg-brand-orange px-5 py-2 normal-case tracking-normal text-white transition-colors hover:bg-brand-orange/90"
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
