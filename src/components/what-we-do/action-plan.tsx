"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ScrollReveal } from "@/registry/lib/motion-variants";

const FUNDING_PROGRESS = 90;

/**
 * "An action-focused plan leads to a sustainable outcome." — content split,
 * photo left / brand-green panel right, with a horizontal progress bar
 * ("Project Funding Tracking") the live page animates in on scroll. Simpler
 * than module 81's pinned scroll-scrubbed bar chart (see stats.tsx's
 * comment on that module for why it doesn't fit here) — this is one bar,
 * not a multi-bar scroll narrative, so a plain `whileInView` fill is the
 * right amount of effect.
 *
 * Photo (about2.webp) is reused from the About page's collage — the same
 * newly-built-project-house shot fits this section's "action-focused"
 * theme; no dedicated photo was supplied for this page yet.
 */
export function ActionPlan() {
  return (
    <section id="how-we-work" className="grid grid-cols-1 lg:grid-cols-2">
      <div className="relative aspect-4/3 w-full lg:aspect-auto">
        <Image src="/images/about2.webp" alt="Ninetynine41 team on a newly built project house" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>

      <div className="flex flex-col justify-center bg-brand-green px-8 py-16 sm:px-14 sm:py-20">
        <ScrollReveal effect="A" as="p" className="text-sm font-semibold tracking-[0.2em] text-brand-orange uppercase">
          Ninetynine41
        </ScrollReveal>

        <ScrollReveal effect="B" as="h2" className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
          An action-focused plan leads to a sustainable outcome.
        </ScrollReveal>

        <ScrollReveal effect="A" as="p" className="mt-4 max-w-md border-t border-white/15 pt-4 text-white/70">
          Actions speak louder than words.
        </ScrollReveal>

        <ScrollReveal effect="A" as="div" className="mt-10 max-w-md">
          <div className="flex items-baseline justify-between text-sm font-semibold text-white">
            <span>Project Funding Tracking</span>
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
