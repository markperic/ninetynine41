import localFont from "next/font/local";
import { Inter } from "next/font/google";

/**
 * Anton, self-hosted.
 *
 * The display face for /examples/pilates. Self-hosted rather than loaded from
 * Google's CDN for the reason app/layout.tsx already gives: a build should not
 * depend on reaching a third-party host. `next/font/local` fingerprints the
 * file, emits the `@font-face` with `font-display: swap`, and preloads it on
 * routes that use the class — none of which happens if you hand-roll the
 * `@font-face` yourself.
 *
 * Anton is SIL Open Font License 1.1, so bundling and serving it from our own
 * origin is unrestricted. The file here is Google Fonts' `latin` subset
 * (12KB); the `latin-ext` subset sits alongside it unreferenced, for whenever
 * copy needs accented characters beyond the basic range.
 *
 * Weight is fixed at 400 because Anton ships one weight. Never ask for 700 or
 * 900 from it — the browser will synthesise the difference and smear the
 * stems, which at hero sizes is extremely visible.
 */
export const anton = localFont({
  src: [{ path: "./anton-latin.woff2", weight: "400", style: "normal" }],
  variable: "--font-anton",
  display: "swap",
  // Chosen so the fallback occupies close to the same width as Anton: both are
  // heavy condensed grotesques, so a swap does not reflow the whole page.
  fallback: ["Haettenschweiler", "Impact", "Arial Narrow", "sans-serif"],
  adjustFontFallback: false,
});

/**
 * Clash Grotesk, self-hosted.
 *
 * The text face for /examples/pilates, pairing with Anton — a slightly
 * squared grotesque with tight apertures, which is what stops the body copy
 * reading as generic system sans underneath such an assertive display face.
 *
 * Two weights, no more: 400 for body copy and 600 for the small uppercase
 * labels. ~19KB each, so the text family costs about 39KB. A 500 was fetched
 * first and then dropped — nothing on the page asked for it, and the browser
 * confirmed as much by never loading the file. Add a weight when some setting
 * needs it, not in anticipation.
 *
 * Licence: Fontshare / ITF Free Font License — free for personal and
 * commercial use, and self-hosting is expressly allowed, which is why these
 * sit in the repo rather than being pulled from Fontshare's CDN at runtime.
 * Keep this note with the files; the licence is the reason they can be here.
 */
export const clashGrotesk = localFont({
  src: [
    { path: "./clash-grotesk-400.woff2", weight: "400", style: "normal" },
    { path: "./clash-grotesk-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

/**
 * Site-wide brand face for Ninetynine41 — Inter, confirmed by the client as
 * the corporate font (both heading and body on the live WordPress theme:
 * `--et_global_heading_font` and `--et_global_body_font` are both 'Inter').
 * No separate display face — `--font-display` in globals.css just aliases
 * back to this.
 *
 * Uses `next/font/google` rather than a hand-subset local file: Next.js
 * fetches it once at build time and self-hosts the result from our own
 * origin same as `next/font/local` does (no runtime request to Google, no
 * layout shift), it's just that Inter ships enough weights/scripts that
 * subsetting it by hand isn't worth it the way it was for Anton's single
 * weight. This is the "your build environment has normal network access"
 * case the comment at the top of app/layout.tsx calls out.
 */
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
