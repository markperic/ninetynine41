"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/registry/lib/motion-variants";
import { cn } from "@/lib/utils";

type Testimonial = { quote: string; name: string; role: string | null; photo: string | null };

const AUTOPLAY_MS = 6000;

export function TestimonialsClient({ heading, testimonials }: { heading: string; testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, testimonials.length]);

  function go(delta: number) {
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);
  }

  return (
    <section className="bg-brand-green px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal effect="A" as="h2" className="text-center font-display text-3xl font-semibold text-white sm:text-4xl">
          {heading}
        </ScrollReveal>

        <div
          className="relative mt-14 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <div key={`${t.name}-${i}`} className="w-full shrink-0 px-1">
                <div className="relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 p-8 sm:p-10">
                  {t.photo && (
                    <>
                      <Image src={t.photo} alt="" fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/60" />
                    </>
                  )}
                  <div className="relative">
                    <p className="text-lg text-white/90">&ldquo;{t.quote}&rdquo;</p>
                    <p className="mt-5 font-semibold text-white">{t.name}</p>
                    {t.role && <p className="text-sm text-white/60">{t.role}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={`${t.name}-${i}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={cn("h-2 w-2 rounded-full transition-colors", i === index ? "bg-white" : "bg-white/30")}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
