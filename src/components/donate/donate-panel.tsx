import Image from "next/image";
import Script from "next/script";
import { Reveal } from "@/registry/lib/motion-variants";
import { getDonateContent } from "@/lib/content/donate";
import { renderHighlighted } from "@/lib/highlight";

/**
 * Donate panel — the live page's orange section: eyebrow, heading, tax/GDG
 * copy and logo on the left; the embedded donation form on the right.
 *
 * The form itself isn't ours to build — Ninetynine41's donations are
 * processed by Global Development Group via a Raisely-hosted widget. The
 * embed markup itself (`embedHtml`) is editable in Sanity — Donate Page →
 * "Donation form embed code" — so it can be swapped without a code change
 * if GDG ever reissues the embed. Raisely's own loader script (which
 * attaches to the `.raisely-donate` container by data attribute and handles
 * auto-resize via postMessage) is loaded here regardless of what the embed
 * markup itself contains, since it's infrastructure, not content.
 */
export async function DonatePanel() {
  const { panel, embedHtml } = await getDonateContent();
  return (
    <section className="bg-brand-orange px-6 pt-[calc(var(--page-chrome)+2.5rem)] pb-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-2">
        <div>
          <Reveal effect="A" as="p" className="text-sm font-semibold tracking-[0.2em] text-white/80 uppercase">
            {panel.eyebrow}
          </Reveal>

          <Reveal effect="B" as="h1" className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
            {renderHighlighted(panel.heading, [panel.headingHighlight], "text-brand-green")}
            <br />
            {panel.heading2}
          </Reveal>

          <Reveal effect="A" as="p" className="mt-6 max-w-md text-white/90">
            {panel.intro}
          </Reveal>

          <Reveal effect="A" as="p" className="mt-6 text-sm font-bold tracking-wide text-white uppercase">
            {panel.thankYouLabel}
          </Reveal>

          <Reveal effect="A" as="p" className="mt-4 max-w-md text-sm font-semibold text-white/90">
            {panel.legalText1}
          </Reveal>

          <Reveal effect="A" as="p" className="mt-4 max-w-md text-xs text-white/70">
            {panel.legalText2}
          </Reveal>

          <Reveal effect="E" as="div" className="mt-8">
            <Image src="/brand/gdg-logo.png" alt="Global Development Group" width={72} height={69} className="h-16 w-auto" />
          </Reveal>
        </div>

        <Reveal effect="A" as="div" className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <Script src="https://cdn.raisely.com/v3/public/embed.js" strategy="lazyOnload" />
          <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
        </Reveal>
      </div>
    </section>
  );
}
