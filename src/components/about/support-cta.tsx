import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/registry/lib/motion-variants";

/**
 * "You don't have to be rich to make a difference." — module 51's minimal
 * inline CTA pattern (a thin bar, no card), on the brand-green section that
 * closes out "We Focus On" on the live About page.
 */
export function SupportCta() {
  return (
    <section className="border-t border-white/10 bg-brand-green px-6 py-8">
      <ScrollReveal
        effect="A"
        className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4"
      >
        <p className="text-white/85">You don&rsquo;t have to be rich to make a difference.</p>
        <a
          href="/what-we-do"
          className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-brand-orange uppercase"
        >
          Ways to support Ninetynine41
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </ScrollReveal>
    </section>
  );
}
