"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
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
 *
 * `light` is for pages whose content is genuinely white/light all the way
 * to the top (no dark hero to float over) — Our Team, Contact. At rest
 * (`!solid`) the bar swaps to dark nav text and the full-color logo instead
 * of white-on-transparent, which would otherwise be invisible against a
 * white page. Once scrolled solid, the bar always shows white on its own
 * opaque brand-green background regardless of `light`, since that
 * background is never see-through. Pages with a dark/photo hero (the
 * default) don't pass this — white-on-transparent is exactly what they want
 * at rest. Don't pass `light` to fix an accidental white gap under the
 * header instead — that means the section below needs its own top padding
 * folded into its background, same as every hero already does (see
 * donate-panel.tsx's comment for that exact bug).
 *
 * Below `md`, the inline nav (with nine links plus Donate, already tight
 * even on desktop) has no room at all — it was previously left to
 * `overflow-x-auto`, which meant the links were technically present but
 * not visibly reachable on a phone: no visible scrollbar, no affordance
 * that there was more to scroll to. Below `md` it's replaced with a
 * hamburger button that drops down a solid full-width panel (its own
 * opaque bg-brand-green, not tied to `solid`/`dark`, since it needs to
 * read clearly regardless of scroll position or what's under it) listing
 * every link stacked vertically. `md` and up keeps the original inline
 * nav untouched.
 */
export function SiteHeader({ light = false }: { light?: boolean }) {
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dark = light && !solid;

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
        solid ? "h-14 bg-brand-green shadow-sm" : `h-24 bg-transparent ${dark ? "border-b border-zinc-100" : ""}`
      }`}
    >
      <div className="relative flex w-full items-center justify-between">
        <Link href="/" className="shrink-0">
          {/* Reversed to solid white over a dark/photo top — the full-color
              mark doesn't hold contrast there, and a nav logo being
              single-color is the standard trade for that. Over a light
              page (`dark`), the mark's own colors already contrast fine. */}
          <Image
            src="/brand/9941-logo-hoz.png"
            alt="Ninetynine41"
            width={169}
            height={28}
            priority
            className={`w-auto transition-[height] duration-300 ${dark ? "" : "brightness-0 invert"} ${solid ? "h-5" : "h-7"}`}
          />
        </Link>

        {/* max-w reserves room for the logo + icon cluster + padding on
            both sides (~20rem total) so centering never overlaps them;
            overflow-x-auto is the fallback if links still don't fit below
            that at md/lg widths — below md the hamburger panel takes over
            instead, since there's no room left to scroll into at all. */}
        <nav className="absolute top-1/2 left-1/2 hidden max-w-[calc(100vw-20rem)] -translate-x-1/2 -translate-y-1/2 overflow-x-auto md:block">
          <ul
            className={`flex min-w-max items-center gap-7 text-sm font-semibold tracking-wide whitespace-nowrap uppercase ${dark ? "text-zinc-950" : "text-white"}`}
          >
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

        <div className={`flex shrink-0 items-center gap-4 ${dark ? "text-zinc-950" : "text-white"}`}>
          <a
            href="https://www.facebook.com/profile.php?id=61574110970003"
            aria-label="Facebook"
            className="hidden transition-opacity hover:opacity-70 sm:block"
          >
            <FacebookIcon className="h-4 w-4" />
          </a>
          <a
            href="https://www.instagram.com/ninety_nine4one/"
            aria-label="Instagram"
            className="hidden transition-opacity hover:opacity-70 sm:block"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="md:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="absolute inset-x-0 top-full max-h-[calc(100vh-var(--page-chrome))] overflow-y-auto bg-brand-green px-6 py-6 shadow-lg md:hidden">
          <ul className="flex flex-col gap-1 text-base font-semibold tracking-wide text-white uppercase">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setMobileOpen(false)} className="block py-2.5 transition-colors hover:text-brand-orange">
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/donate"
                onClick={() => setMobileOpen(false)}
                className="inline-block rounded-full bg-brand-orange px-5 py-2 normal-case tracking-normal text-white transition-colors hover:bg-brand-orange/90"
              >
                Donate
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
