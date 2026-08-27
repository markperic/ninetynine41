"use client";

/**
 * The animation effect catalog for the module library.
 *
 * This is the "Effect A / Effect B" vocabulary (eleven effects, A-K) referenced in registry/modules.json
 * and in MODULE-LIBRARY.md. Every animated element in every numbered module pulls
 * its animation from here — nothing improvises its own one-off animation.
 *
 * To change what "Effect B" looks like everywhere it's used, edit it once, here.
 * To add a new effect, add an entry to both `effectCatalog` (the human-readable
 * description Claude reads) and `variants` (the actual Motion values).
 */

import { useRef, type ReactNode, type ElementType, type CSSProperties } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
  type Variants,
  type MotionProps,
} from "motion/react";
import { cn } from "@/lib/utils";

export type AnimationEffect = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M";

export const effectCatalog: Record<
  AnimationEffect,
  { name: string; description: string; kind: "entrance" | "scroll" | "hover" }
> = {
  A: { name: "Fade Up", kind: "entrance", description: "Fades in while rising 24px on page load. Default for headings, cards, and CTAs." },
  B: { name: "Fade In", kind: "entrance", description: "Slow, plain opacity fade with no movement. Best for large hero titles that shouldn't feel busy." },
  C: { name: "Slide From Left", kind: "entrance", description: "Enters from the left with a fade. Good for alternating content-split sections." },
  D: { name: "Slide From Right", kind: "entrance", description: "Enters from the right with a fade. Pair with Slide From Left on the opposite section." },
  E: { name: "Scale In", kind: "entrance", description: "Scales up from 92% while fading in. Good for images, logos, badges, icons." },
  F: { name: "Stagger Group", kind: "entrance", description: "Applied to a container (e.g. a grid); each direct child plays Effect A in sequence, ~120ms apart." },
  G: { name: "Scroll Reveal", kind: "scroll", description: "Same motion as Fade Up, but triggers the moment the element scrolls into view instead of on page load. Plays once." },
  H: { name: "Scroll Parallax", kind: "scroll", description: "The element (usually an image) drifts at a different speed than the page as you scroll past it." },
  I: { name: "Hover Lift", kind: "hover", description: "Micro-interaction: lifts 4px and scales to 102% on hover/tap. Use on cards and buttons, not on entrance." },
  J: { name: "Gradient Shimmer", kind: "entrance", description: "An animated gradient sweeps across the text on load. Reserve for one hero title per page — it's a lot if overused." },
  K: { name: "Text Reveal (Split)", kind: "entrance", description: "Splits a heading into words that stagger in on load, each rising and fading. The 'expensive text reveal' look, built on Effect F's stagger rather than a separate text-splitting library. Use on at most one headline per page, same restraint as Effect J." },
  L: { name: "Giant Line Fan", kind: "scroll", description: "For a stack of large-type lines: each line starts scaled down and gathered at its own center, then grows to full size as the block scrolls through the viewport, fanning out to full width one line after another. A spring-smoothed, continuous scroll-linked transform (not a one-shot) — scrolling back up gathers it back in, exactly tracking scroll position, no shake from raw per-frame values. Words per line can be individually highlighted. One per page, same restraint as J/K." },
  M: { name: "Fly & Fan", kind: "entrance", description: "Enters from the left like Effect C, but the letters start tightly compressed (near-zero letter-spacing) and fan out to their normal tracking as it slides in and fades up — one coordinated move, not two. A one-shot on-load tween (unlike Effect L's continuous scroll scrub), so letter-spacing's reflow cost is a non-issue here: it runs once for ~1s, not every scroll frame. Good for a hero title that wants more presence than Effect B/C alone. Sets its own letter-spacing entirely — don't also apply a `tracking-*` class alongside it." },
};

export const variants: Record<Exclude<AnimationEffect, "H" | "I" | "J" | "K" | "L">, Variants> = {
  A: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  },
  B: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1.3, ease: "easeOut" } },
  },
  C: {
    hidden: { opacity: 0, x: -32 },
    show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  },
  D: {
    hidden: { opacity: 0, x: 32 },
    show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  },
  E: {
    hidden: { opacity: 0, scale: 0.92 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  },
  F: {
    hidden: {},
    show: { transition: { staggerChildren: 0.16, delayChildren: 0.08 } },
  },
  G: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  },
  M: {
    hidden: { opacity: 0, x: -140, letterSpacing: "-0.08em" },
    show: { opacity: 1, x: 0, letterSpacing: "-0.02em", transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
  },
};

type RevealProps = MotionProps & {
  effect?: Exclude<AnimationEffect, "H" | "I" | "J" | "K" | "L">;
  as?: ElementType;
  className?: string;
  children?: ReactNode;
};

/** Plays its effect once, on page load. Use for above-the-fold content (hero titles, etc). */
export function Reveal({ effect = "A", as = "div", className, children, ...props }: RevealProps) {
  const MotionTag = motion[as as "div"] ?? motion.div;
  return (
    <MotionTag
      initial="hidden"
      animate="show"
      variants={variants[effect]}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/** Plays its effect the moment it scrolls into view. Use for anything below the fold. Effect G is the intended default; A–F also work here. */
export function ScrollReveal({ effect = "G", as = "div", className, children, ...props }: RevealProps) {
  const MotionTag = motion[as as "div"] ?? motion.div;
  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants[effect]}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/** Effect F helper: wrap a grid/row of items in this, give each item <ScrollReveal effect="A"> (or Reveal) and they'll stagger. */
export function StaggerGroup({
  className,
  children,
  viewport = true,
  as = "div",
}: {
  className?: string;
  children: ReactNode;
  viewport?: boolean;
  as?: ElementType;
}) {
  const MotionTag = motion[as as "div"] ?? motion.div;
  return (
    <MotionTag
      initial="hidden"
      {...(viewport
        ? { whileInView: "show", viewport: { once: true, margin: "-80px" } }
        : { animate: "show" })}
      variants={variants.F}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Scroll-mapped value that Motion will not hardware-offload. Use this instead
 * of a bare `useTransform` whenever the result is bound to `opacity` on an
 * element inside a pinned (`position: sticky`) frame.
 *
 * Why it exists: when a value traceable to `useScroll` is bound to an
 * accelerable property, Motion compiles it into a native WAAPI animation
 * driven by a `ViewTimeline` attached to the animated element. For a normal
 * in-flow element that's a free performance win. For a child of a sticky
 * frame it is silently wrong — the element is pinned, so its own progress
 * through the viewport is not the section's scroll progress, and the two
 * clocks drift apart. Transforms are unaffected (Motion keeps those on its
 * own render loop), which is why the symptom is always "the fades are wrong
 * but the movement is right".
 *
 * Re-emitting through a plain `useMotionValue` breaks the provenance chain,
 * so Motion can no longer prove the value is scroll-derived and drives it on
 * the normal render loop against the progress we actually asked for.
 */
export function useScrollValue<T extends string | number>(
  source: MotionValue<number>,
  input: number[],
  output: T[],
): MotionValue<T> {
  const mapped = useTransform(source, input, output);
  const detached = useMotionValue<T>(mapped.get());
  useMotionValueEvent(mapped, "change", (latest) => detached.set(latest));
  return detached;
}

/** Effect H — scroll parallax. Wrap an image (or any element) that should drift as the page scrolls past it. */
export function ParallaxImage({
  className,
  strength = 60,
  children,
}: {
  className?: string;
  strength?: number;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y }} className="relative h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/** Effect I — hover lift. Wrap cards, buttons, anything clickable that should feel responsive. */
export function HoverLift({ className, children, as = "div" }: { className?: string; children: ReactNode; as?: ElementType }) {
  const MotionTag = motion[as as "div"] ?? motion.div;
  return (
    <MotionTag
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

const splitWordContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
};

const splitWordItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Effect K — text reveal. Splits a plain-string heading into words that
 * stagger in on load (or on scroll into view, with `viewport`). Use on at
 * most one headline per page — same restraint as Effect J.
 */
export function SplitReveal({
  as = "h2",
  className,
  children,
  viewport = false,
}: {
  as?: ElementType;
  className?: string;
  children: string;
  viewport?: boolean;
}) {
  const MotionTag = motion[as as "div"] ?? motion.div;
  const words = children.split(" ");
  return (
    <MotionTag
      initial="hidden"
      {...(viewport
        ? { whileInView: "show", viewport: { once: true, margin: "-80px" } }
        : { animate: "show" })}
      variants={splitWordContainer}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i}>
          <motion.span variants={splitWordItem} className="inline-block">
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </MotionTag>
  );
}

function GiantFanLine({
  text,
  className,
  highlight = [],
  highlightClassName,
  style,
  progress,
  start,
  end,
}: {
  text: string;
  className?: string;
  highlight?: string[];
  highlightClassName?: string;
  style?: CSSProperties;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  // Uniform `scale`, not letter-spacing: the line starts gathered small at
  // its own center (transform-origin defaults to 50% 50%) and grows to full
  // size, which reads as "fanning out to full width" without distorting any
  // glyph — and, being a `transform`, it's compositor-only, so it doesn't
  // force layout/reflow on every scroll tick the way animating
  // letter-spacing did (that was the source of the shake/wobble: the browser
  // re-laying-out a whitespace-nowrap, center-aligned line every frame).
  //
  // Raw scroll progress is jittery frame to frame — Lenis smooths the
  // scroll position itself, but a value re-derived from it every tick still
  // has no easing of its own. useSpring smooths that out and is what
  // supplies the "some easing" feel, while still continuously tracking
  // wherever the raw scroll-derived target currently is, in either
  // direction — unlike a duration-based animate() tween, a spring has no
  // notion of "done" to get stuck at when scroll direction reverses mid-flight.
  const rawScale = useTransform(progress, [start, end], [0.2, 1]);
  const scale = useSpring(rawScale, { stiffness: 110, damping: 20, mass: 0.4 });
  const rawOpacity = useTransform(progress, [start, end], [0.12, 1]);
  const opacity = useSpring(rawOpacity, { stiffness: 110, damping: 20, mass: 0.4 });
  const highlightSet = new Set(highlight.map((w) => w.toLowerCase()));
  const words = text.split(" ");

  return (
    <motion.div style={{ ...style, scale, opacity }} className={className}>
      {words.map((word, i) => {
        const bare = word.toLowerCase().replace(/[^a-z0-9]/g, "");
        const isHighlighted = highlightSet.has(bare);
        return (
          <span key={i} className={isHighlighted ? highlightClassName : undefined}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </motion.div>
  );
}

/**
 * Effect L — giant line fan. For a stack of large-type lines (e.g. a
 * statement broken one phrase per line): each line starts scaled down,
 * gathered at its own center, and grows to full size as the block scrolls
 * through the viewport — reading as the line fanning out to full width
 * (each line needs its own `text-center` via `lineClassName` or per-line
 * `className` so it's centered at rest, matching where it grows from).
 * Lines are staggered in sequence across the container's own scroll range —
 * line 1 fans out first, the last line finishes last. The scale/opacity are
 * `useSpring`-smoothed scroll-linked values (see `GiantFanLine`), not a
 * `whileInView` + `animate()` one-shot, so the whole thing runs in both
 * directions for free — scroll back up and the lines gather back in,
 * continuously tracking scroll position rather than playing once. Give
 * each line a `highlight` list for words that should render in
 * `highlightClassName` instead of the line's own color (matched
 * case-insensitively, punctuation ignored).
 */
export function GiantLineFan({
  className,
  lineClassName,
  highlightClassName = "text-inherit",
  lines,
  offset = ["start 0.9", "end 0.25"],
}: {
  className?: string;
  lineClassName?: string;
  highlightClassName?: string;
  lines: { text: string; className?: string; style?: CSSProperties; highlight?: string[] }[];
  offset?: [string, string];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as never });
  const count = lines.length;

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <GiantFanLine
          key={line.text}
          text={line.text}
          className={cn(lineClassName, line.className)}
          style={line.style}
          highlight={line.highlight}
          highlightClassName={highlightClassName}
          progress={scrollYProgress}
          start={i / count}
          end={(i + 1) / count}
        />
      ))}
    </div>
  );
}

/** Effect J — gradient shimmer. Use on at most one hero title per page. */
export function ShimmerText({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.span
      initial={{ backgroundPosition: "200% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "bg-[linear-gradient(110deg,var(--foreground)_35%,var(--muted-foreground,#888)_50%,var(--foreground)_65%)] bg-[length:200%_100%] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </motion.span>
  );
}
