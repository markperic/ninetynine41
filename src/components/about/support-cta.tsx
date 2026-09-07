import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/registry/lib/motion-variants";
import { getAboutContent } from "@/lib/content/about";

export async function SupportCta() {
  const { supportCta } = await getAboutContent();
  return (
    <section className="border-t border-white/10 bg-brand-green px-6 py-8">
      <ScrollReveal
        effect="A"
        className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4"
      >
        <p className="text-white/85">{supportCta.text}</p>
        <a
          href={supportCta.linkHref}
          className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-brand-orange uppercase"
        >
          {supportCta.linkLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </ScrollReveal>
    </section>
  );
}
