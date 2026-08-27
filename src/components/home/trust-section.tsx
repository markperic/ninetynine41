"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PLACEHOLDER_IMAGES } from "@/registry/lib/placeholder-images";
import { cn } from "@/lib/utils";

/**
 * Orange band, module 64 (Content, Carousel Card) in place of the old
 * static white paragraph card — the "Ninetynine41 fund, deliver and
 * sustain..." copy split across its natural sentence breaks into three
 * slides instead of one wall of text. Images are placeholders from the
 * catalog's local media library (public/images/library) — swap for real
 * project photos once the client supplies them.
 */
const SLIDES = [
  {
    id: 1,
    image: PLACEHOLDER_IMAGES.landscape02.src,
    alt: PLACEHOLDER_IMAGES.landscape02.alt,
    content:
      "Ninetynine41 fund, deliver and sustain real-world change through specific community projects, helping the world's poorest people.",
  },
  {
    id: 2,
    image: PLACEHOLDER_IMAGES.landscape09.src,
    alt: PLACEHOLDER_IMAGES.landscape09.alt,
    content:
      "Ninetynine41 has the background, infrastructure and on-the-ground intel to bridge the gap between challenge and solution.",
  },
  {
    id: 3,
    image: PLACEHOLDER_IMAGES.landscape05.src,
    alt: PLACEHOLDER_IMAGES.landscape05.alt,
    content:
      "We don't take over; we strengthen what exists. We trust local knowledge and trust the process. We see each project through to completion.",
  },
];

export function TrustSection() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  function go(delta: number) {
    setIndex((i) => (i + delta + SLIDES.length) % SLIDES.length);
  }

  return (
    <section className="bg-brand-orange px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid overflow-hidden rounded-3xl bg-white shadow-xl sm:grid-cols-2"
          >
            <div className="relative aspect-4/3 overflow-hidden sm:aspect-auto">
              <Image src={slide.image} alt={slide.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <span className="text-sm font-semibold text-brand-orange">
                {String(slide.id).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </span>
              <p className="mt-3 text-lg text-zinc-700">{slide.content}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn("h-2 w-2 rounded-full transition-colors", i === index ? "bg-white" : "bg-white/35")}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/projects"
            className="rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green/90"
          >
            Current Projects
          </a>
          <a
            href="/what-we-do"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
          >
            What We Do
          </a>
        </div>
      </div>
    </section>
  );
}
