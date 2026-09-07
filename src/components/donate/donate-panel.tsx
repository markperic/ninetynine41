import Image from "next/image";
import Script from "next/script";
import { Reveal } from "@/registry/lib/motion-variants";

/**
 * Donate panel — the live page's orange section: eyebrow, heading, tax/GDG
 * copy and logo on the left; the embedded donation form on the right.
 *
 * The form itself isn't ours to build — Ninetynine41's donations are
 * processed by Global Development Group via a Raisely-hosted widget
 * (project J9941N), embedded here exactly as the live site does: the same
 * iframe src (including `targethost`, which is tied to GDG's Raisely
 * project config for ninetynine41.org) plus Raisely's own public embed
 * loader script, which handles the widget's auto-resize via postMessage.
 * No payment handling happens in this app; the iframe is Raisely/GDG's own
 * checkout, same as embedding a Stripe or PayPal donate button.
 *
 * The wrapping `.raisely-donate` div with its `data-campaign-path` /
 * `data-profile` / `data-width` / `data-height` attributes is load-bearing,
 * not decorative — embed.js queries for that exact container to attach to;
 * a bare iframe without it throws "Could not load in root to embed
 * Raisely" and the widget never initializes. `data-frame-id` on the iframe
 * has to match the `frameId` query param for the same reason. The live
 * site generates that id randomly per page load (for postMessage matching
 * across multiple embeds); this page only ever renders one instance, so a
 * fixed id avoids a server/client random-value hydration mismatch for no
 * real loss of function.
 *
 * This section also carries its own `pt-[calc(var(--page-chrome)+...)]`
 * rather than a page-level spacer div, same as every other page's hero —
 * see SiteHeader's comment on why: the fixed header is transparent until
 * scrolled, so a transparent spacer above a colored section would show the
 * page's white background through it, right where the header needs a dark
 * backdrop to keep its white logo/nav legible.
 */
const RAISELY_FRAME_ID = "9941-donate-embed";

export function DonatePanel() {
  return (
    <section className="bg-brand-orange px-6 pt-[calc(var(--page-chrome)+2.5rem)] pb-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-2">
        <div>
          <Reveal effect="A" as="p" className="text-sm font-semibold tracking-[0.2em] text-white/80 uppercase">
            Donate Today
          </Reveal>

          <Reveal effect="B" as="h1" className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
            Your legacy starts <span className="text-brand-green">here</span>.
            <br />
            Ninetynine41.
          </Reveal>

          <Reveal effect="A" as="p" className="mt-6 max-w-md text-white/90">
            Please use the form below to make your tax deductible donation. Payments are processed directly by
            Global Development Group.
          </Reveal>

          <Reveal effect="A" as="p" className="mt-6 text-sm font-bold tracking-wide text-white uppercase">
            Thank you
          </Reveal>

          <Reveal effect="A" as="p" className="mt-4 max-w-md text-sm font-semibold text-white/90">
            Ninetynine41 is a partner for Project J9941N with Global Development Group (ABN 57 102 400 993), an
            Australian NGO approved by the Minister for Foreign Affairs.
          </Reveal>

          <Reveal effect="A" as="p" className="mt-4 max-w-md text-xs text-white/70">
            Gifts over $2 are tax deductible in the USA, Australia, and over $5 New Zealand. In the UK, eligible
            donors can claim Gift Aid. All donations are received subject to GDG&rsquo;s donation and privacy
            policy (www.gdg.org.au/policy). If excess funds are received, they may be applied to other approved
            project activities.
          </Reveal>

          <Reveal effect="E" as="div" className="mt-8">
            <Image src="/brand/gdg-logo.png" alt="Global Development Group" width={72} height={69} className="h-16 w-auto" />
          </Reveal>
        </div>

        <Reveal
          effect="A"
          as="div"
          className="raisely-donate overflow-hidden rounded-2xl bg-white shadow-xl"
          data-campaign-path="global-development-group-project"
          data-profile="j9941n-ninetynine41?projectNum=J9941N&projectName=Ninetynine41"
          data-width="100%"
          data-height="500"
        >
          <Script src="https://cdn.raisely.com/v3/public/embed.js" strategy="lazyOnload" />
          <iframe
            src={`https://global-development-group-project.raisely.com/embed/j9941n-ninetynine41?projectNum=J9941N&projectName=Ninetynine41?targethost=https%3A%2F%2Fninetynine41.org&frameId=${RAISELY_FRAME_ID}`}
            data-frame-id={RAISELY_FRAME_ID}
            title="Embedded donation form"
            allow="payment"
            width="100%"
            height="500"
            style={{ border: 0, display: "block" }}
          />
        </Reveal>
      </div>
    </section>
  );
}
