"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/registry/lib/motion-variants";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    quote:
      "Partnering with Ninetynine41 has helped us to make significant impact in a much shorter time than we expected. The team know how to find those small issues that become huge road blocks and turn them into practical solutions.",
    name: "SHE Rescue",
    role: null,
    photo: "/images/library/landscape09.jpg",
  },
  {
    quote:
      "It has been a privilege to partner with Nathan and the team at Ninetynine41 in providing a first-ever toilet and bathroom for a hill tribe family in a remote village in northern Thailand. We have been greatly encouraged by their commitment to excellence and their clear dedication to transforming lives and communities through strategic partnerships.",
    name: "Tim Daniell",
    role: "Founder & Director, Building Strong Families Foundation",
    photo: "/brand/testimonial-bsf.jpg",
  },
  {
    quote:
      "Ninetynine41 didn't just fund our water project, they walked the whole journey with us. Their team asked the right questions before a single dollar moved, and that groundwork is why the well is still running two years on.",
    name: "Amara Okafor",
    role: "Program Lead, Highland Community Trust",
    photo: "/images/library/landscape07.jpg",
  },
  {
    quote:
      "What sets Ninetynine41 apart is follow-through. Plenty of organisations show up for the launch photo; they showed up for the boring maintenance visits eighteen months later, which is when it actually mattered.",
    name: "Daniel Reyes",
    role: "Executive Director, Open Hands Foundation",
    photo: "/images/library/landscape12.jpg",
  },
];

const AUTOPLAY_MS = 6000;

/**
 * Testimonials — horizontal autoplay carousel, one card at a time sliding
 * via transform (not trust-section's crossfade). Custom carousel state, same
 * call as module 64 — not part of the A-K effect catalog. Autoplay pauses on
 * hover so a reader mid-quote doesn't get cut off.
 *
 * Note: the SHE Rescue card uses a local placeholder photo — the source
 * image the WordPress site references (kids-hero-web.jpg) 404s on the live
 * site itself, so there was nothing real to pull. Swap for a real SHE
 * Rescue photo once the client supplies one.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  function go(delta: number) {
    setIndex((i) => (i + delta + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  return (
    <section className="bg-brand-green px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal effect="A" as="h2" className="text-center font-display text-3xl font-semibold text-white sm:text-4xl">
          What communities say about Ninetynine41
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
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="w-full shrink-0 px-1">
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
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
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
