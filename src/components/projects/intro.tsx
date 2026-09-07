"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ScrollReveal } from "@/registry/lib/motion-variants";

const FUNDING_PROGRESS = 90;

/**
 * Projects page intro — content split, photo left / brand-green panel
 * right, same pattern and progress-bar treatment as What We Do's
 * action-plan.tsx. The live page's own version left this image slot
 * blank (broken lazy-load), so this uses the one real featured photo this
 * project story has (srey1.webp) rather than reproducing that gap.
 */
export function ProjectsIntro() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="relative aspect-4/3 w-full lg:aspect-auto">
        <Image src="/images/srey1.webp" alt="The flood-safe house built for Srey Oun's family" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>

      <div className="flex flex-col justify-center bg-brand-green px-8 py-16 sm:px-14 sm:py-20">
        <ScrollReveal effect="A" as="p" className="text-sm font-semibold tracking-[0.2em] text-brand-orange uppercase">
          Ninetynine41
        </ScrollReveal>

        <ScrollReveal effect="B" as="h1" className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
          Our Projects
        </ScrollReveal>

        <ScrollReveal effect="A" as="p" className="mt-4 max-w-md border-t border-white/15 pt-4 text-white/70">
          Ninetynine41 fund, deliver and sustain real-world change through specific community projects. There is
          need and we want to help. We have the background, infrastructure and on-the-ground intel to bridge the
          gap between pressing issue and solution.
        </ScrollReveal>

        <ScrollReveal effect="A" as="p" className="mt-4 max-w-md font-semibold text-white">
          We don&rsquo;t take over; we strengthen what exists. We see each project through to completion.
        </ScrollReveal>

        <ScrollReveal effect="A" as="div" className="mt-10 max-w-md">
          <div className="flex items-baseline justify-between text-sm font-semibold text-white">
            <span>Srey Oun Small Business</span>
            <span>{FUNDING_PROGRESS}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${FUNDING_PROGRESS}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="h-full rounded-full bg-brand-orange"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
