"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Slide = { image: string; alt: string; content: string };
type Ctas = { primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string };

export function TrustSectionClient({ slides, ctas }: { slides: Slide[]; ctas: Ctas }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  function go(delta: number) {
    setIndex((i) => (i + delta + slides.length) % slides.length);
  }

  return (
    <section className="bg-brand-orange px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid overflow-hidden rounded-3xl bg-white shadow-xl sm:grid-cols-2 sm:min-h-[520px]"
          >
            <div className="relative aspect-4/3 overflow-hidden sm:aspect-auto">
              <Image src={slide.image} alt={slide.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-14">
              <span className="text-sm font-semibold text-brand-orange">
                {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
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
            {slides.map((s, i) => (
              <button
                key={`${s.alt}-${i}`}
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
            href={ctas.primaryHref}
            className="rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green/90"
          >
            {ctas.primaryLabel}
          </a>
          <a
            href={ctas.secondaryHref}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
          >
            {ctas.secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
