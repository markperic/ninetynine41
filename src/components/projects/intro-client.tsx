"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ScrollReveal } from "@/registry/lib/motion-variants";

export function ProjectsIntroClient({
  eyebrow,
  heading,
  paragraph1,
  paragraph2,
  image,
  progressLabel,
  progressPercent,
}: {
  eyebrow: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  image: string;
  progressLabel: string;
  progressPercent: number;
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="relative aspect-4/3 w-full lg:aspect-auto">
        <Image src={image} alt="The flood-safe house built for Srey Oun's family" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>

      <div className="flex flex-col justify-center bg-brand-green px-8 py-16 sm:px-14 sm:py-20">
        <ScrollReveal effect="A" as="p" className="text-sm font-semibold tracking-[0.2em] text-brand-orange uppercase">
          {eyebrow}
        </ScrollReveal>

        <ScrollReveal effect="B" as="h1" className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
          {heading}
        </ScrollReveal>

        <ScrollReveal effect="A" as="p" className="mt-4 max-w-md border-t border-white/15 pt-4 text-white/70">
          {paragraph1}
        </ScrollReveal>

        <ScrollReveal effect="A" as="p" className="mt-4 max-w-md font-semibold text-white">
          {paragraph2}
        </ScrollReveal>

        <ScrollReveal effect="A" as="div" className="mt-10 max-w-md">
          <div className="flex items-baseline justify-between text-sm font-semibold text-white">
            <span>{progressLabel}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progressPercent}%` }}
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
