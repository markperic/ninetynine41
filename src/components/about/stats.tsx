"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react";
import { useScrollValue } from "@/registry/lib/motion-variants";
import { cn } from "@/lib/utils";

const BACKDROPS = [
  { src: "/images/world-map-web.jpg", alt: "Illuminated world map showing global connections" },
  { src: "/images/community-web.jpg", alt: "Ninetynine41 community project" },
];

type Stat = { figure: string; note: string };
type Align = "left" | "right";

/**
 * Real About-page numbers only — no invented figures. "13+" and "5+" are the
 * two stats the live About page itself states (its "Global Projects"
 * section); "7" is the actual count of donor logos in
 * src/components/home/donors.tsx; "6" is the actual count of countries
 * listed on the live About page (Cambodia, Thailand, Sri Lanka, Nepal,
 * Kenya, Australia) — one more than the page's own "5+" headline figure,
 * which reads as rounding down since Australia is home base rather than a
 * field country.
 */
const COLUMNS: { align: Align; stats: Stat[] }[] = [
  {
    align: "left",
    stats: [
      { figure: "13+", note: "Community projects funded, delivered and sustained since founding" },
      { figure: "7", note: "Corporate and community partners backing the mission today" },
    ],
  },
  {
    align: "right",
    stats: [
      { figure: "5+", note: "Countries reached across Asia, Africa and Australia" },
      { figure: "6", note: "Nations home to an active project: Cambodia, Thailand, Sri Lanka, Nepal, Kenya, Australia" },
    ],
  },
];

/** Left advances first, right follows — same ripple idea as module 89. */
const COLUMN_STEPS: number[][] = [
  [0, 0.28],
  [0, 0.38],
];

/** Scene/backdrop change only once both columns have completed their swap. */
const SCENE_STEPS = [0, 0.55];

const SCENES = ["Change for the ONE. Change for the community.", "You don't have to be rich to make a difference."];

/**
 * Opacity + offset for item `index` of a swapping set — copied verbatim from
 * module 89's `useSwap` (src/registry/modules/89-stats-column-scroller.tsx).
 * See that file's comment for why the ramp is built this way; not
 * re-explained here since it's the same function, just not exported from a
 * "use client" module page.
 */
function useSwap(progress: MotionValue<number>, steps: number[], index: number, fade = 0.035, travel = 115) {
  const isFirst = index === 0;
  const isLast = index === steps.length - 1;
  const start = steps[index];
  const next = isLast ? 1 : steps[index + 1];

  const input = isFirst ? [next - fade, next] : isLast ? [start - fade, start] : [start - fade, start, next - fade, next];
  const fades = isFirst ? [1, 0] : isLast ? [0, 1] : [0, 1, 1, 0];
  const travels = isFirst ? [0, -travel] : isLast ? [travel, 0] : [travel, 0, 0, -travel];

  return {
    opacity: useScrollValue(progress, input, fades),
    y: useTransform(progress, input, travels),
  };
}

/**
 * Same swap timing as `useSwap`, but for the scene tagline: scale + opacity
 * instead of travel + opacity, spring-smoothed exactly like Effect L's
 * `GiantFanLine` (motion-variants.tsx) so it reads as the same technique as
 * the homepage's giant scroll statement (BigStatement) — gathered small,
 * growing to full size — just at a caption scale, not a viewport-filling
 * one, and with a mirrored shrink-back-down on exit since this tagline
 * swaps out for a second one rather than staying revealed like the
 * homepage's one-shot statement.
 *
 * Can't reuse `GiantFanLine` itself: it drives its scale off its own
 * element's `useScroll` position, which assumes normal in-flow scrolling.
 * This tagline lives inside a `sticky` pinned frame that never moves on
 * screen, so it has to derive its animation from the shared pinned-section
 * `progress` instead, same as every other value in this file.
 */
function useGiantSwap(progress: MotionValue<number>, steps: number[], index: number, fade = 0.1) {
  const isFirst = index === 0;
  const isLast = index === steps.length - 1;
  const start = steps[index];
  const next = isLast ? 1 : steps[index + 1];

  const input = isFirst ? [next - fade, next] : isLast ? [start - fade, start] : [start - fade, start, next - fade, next];
  const fades = isFirst ? [1, 0] : isLast ? [0, 1] : [0, 1, 1, 0];
  const scales = isFirst ? [1, 0.6] : isLast ? [0.6, 1] : [0.6, 1, 1, 0.6];

  const spring = { stiffness: 110, damping: 20, mass: 0.4 };
  return {
    opacity: useSpring(useTransform(progress, input, fades), spring),
    scale: useSpring(useTransform(progress, input, scales), spring),
  };
}

const ALIGN_CLASS: Record<Align, string> = {
  left: "text-left",
  right: "sm:text-right",
};

function StatEntry({
  stat,
  progress,
  steps,
  index,
  align,
}: {
  stat: Stat;
  progress: MotionValue<number>;
  steps: number[];
  index: number;
  align: Align;
}) {
  const { opacity, y } = useSwap(progress, steps, index);

  return (
    <motion.div style={{ opacity, y }} className={cn("absolute inset-x-0 top-0", ALIGN_CLASS[align])}>
      <p className="text-[clamp(3rem,7.4vw,9rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.055em] text-white">
        {stat.figure}
      </p>
      <p
        className={cn(
          "mt-5 max-w-[36ch] text-[clamp(0.75rem,0.9vw,1rem)] font-bold uppercase leading-[1.3] tracking-[-0.01em] text-white",
          align === "right" && "sm:ml-auto",
        )}
      >
        {stat.note}
      </p>
    </motion.div>
  );
}

/**
 * The scroll range, within `progress`'s full 0-1, during which this scene is
 * actually sitting fully visible (after its entrance fade, before its exit
 * fade) — i.e. the window available for reading it, which is what the word
 * color sweep below divides up. Same start/next math as `useGiantSwap`.
 */
function plateau(steps: number[], index: number, fade: number): [number, number] {
  const isLast = index === steps.length - 1;
  return [steps[index], isLast ? 1 : steps[index + 1] - fade];
}

/**
 * One word of a Scene tagline, colored white-to-orange as scroll crosses its
 * slice of the plateau — same technique as module 78's `RevealWord`
 * (showcase-scroll-manifesto.tsx): `useTransform(progress, range, [from,
 * to])` for color, range being an even 1/N slice of the available window.
 * Module 78 divides the *entire* page's progress this way because its
 * statement is the whole section; here each tagline only owns its own
 * plateau (see above), since two taglines share this section and swap in
 * turn rather than one owning the full scroll.
 */
function SceneWord({ word, isLast, progress, range }: { word: string; isLast: boolean; progress: MotionValue<number>; range: [number, number] }) {
  const color = useTransform(progress, range, ["#ffffff", "#ff5b00"]);
  return (
    <motion.span style={{ color }}>
      {word}
      {!isLast ? " " : ""}
    </motion.span>
  );
}

function Scene({ text, progress, index }: { text: string; progress: MotionValue<number>; index: number }) {
  const { opacity, scale } = useGiantSwap(progress, SCENE_STEPS, index);
  const words = text.split(" ");
  const [start, end] = plateau(SCENE_STEPS, index, 0.1);
  const span = end - start;

  return (
    <motion.p
      style={{ opacity, scale }}
      className="absolute inset-x-0 top-0 mx-auto max-w-[24ch] text-center font-display text-[clamp(2.25rem,6.5vw,5.5rem)] font-extrabold uppercase leading-[1.02] tracking-tight"
    >
      {words.map((word, i) => (
        <SceneWord
          key={i}
          word={word}
          isLast={i === words.length - 1}
          progress={progress}
          range={[start + (i / words.length) * span, start + ((i + 1) / words.length) * span]}
        />
      ))}
    </motion.p>
  );
}

function Backdrop({ image, progress, index }: { image: { src: string; alt: string }; progress: MotionValue<number>; index: number }) {
  const { opacity } = useSwap(progress, SCENE_STEPS, index, 0.08);
  const scale = useTransform(progress, [0, 1], [1.3, 1]);
  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0">
      <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
    </motion.div>
  );
}

/**
 * About page stats — module 89 (Stats, Column Scroller) adapted for this
 * page's real numbers. Two columns instead of module 89's three, because
 * that's how many genuine metrics the live About page and this codebase's
 * own data (donors.tsx) actually support; padding out a third column with
 * an invented figure would misrepresent the charity's numbers. Same pinned
 * scroll-scrubbed mechanism as the catalog module, same `useSwap` helper
 * (copied rather than imported since the module doesn't export it) — see
 * MODULE-LIBRARY.md's convention of adapting a module's pattern into a
 * page-specific file with real content, same as every other src/components/
 * section in this project.
 */
export function AboutStats() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="stats" ref={ref} className="relative h-[260vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        {BACKDROPS.map((image, i) => (
          <Backdrop key={image.src} image={image} progress={scrollYProgress} index={i} />
        ))}
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative flex h-full flex-col px-5 pb-6 pt-[max(5rem,calc(var(--page-chrome)+1.5rem))] md:px-8 md:pb-8 md:pt-[max(6rem,calc(var(--page-chrome)+2rem))]">
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8">
            {COLUMNS.map((column, c) => (
              <div key={column.align} className="relative min-h-[clamp(9rem,14vw,15rem)]">
                {column.stats.map((stat, i) => (
                  <StatEntry key={stat.figure} stat={stat} progress={scrollYProgress} steps={COLUMN_STEPS[c]} index={i} align={column.align} />
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-1 items-center pb-[10vh]">
            <div className="relative w-full">
              {SCENES.map((text, i) => (
                <Scene key={text} text={text} progress={scrollYProgress} index={i} />
              ))}
            </div>
          </div>

          <p className="text-[0.6875rem] font-bold uppercase leading-none tracking-[-0.02em] text-white/70">Global Projects</p>
        </div>
      </div>
    </section>
  );
}
