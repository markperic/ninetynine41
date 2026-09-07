import Image from "next/image";
import { Handshake, Link2 } from "lucide-react";
import { ScrollReveal, StaggerGroup } from "@/registry/lib/motion-variants";

const POINTS = [
  {
    icon: Handshake,
    title: "We respect the locals.",
    body: "We listen to the needs of the community and, using the local information given, provide a sustainable solution to a pressing problem.",
  },
  {
    icon: Link2,
    title: "We stay connected.",
    body: "Sustainability is key. We deliver and fund the projects but our priority is providing a sustainable project everyone can be proud of.",
  },
];

/**
 * "We don't take over. We collaborate." — content split, photo left / copy
 * and two icon points right. Photo (about1.webp) is the same community
 * meeting shot the About page's Change for the ONE collage uses — the live
 * site reuses this exact photo across both pages too.
 */
export function Collaborate() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <ScrollReveal effect="E" className="relative aspect-4/3 w-full overflow-hidden rounded-md">
          <Image src="/images/about1.webp" alt="Ninetynine41 team meeting with the local community" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </ScrollReveal>

        <div>
          <ScrollReveal effect="B" as="h2" className="text-3xl font-semibold tracking-tight text-brand-orange sm:text-4xl">
            We don&rsquo;t take over.
            <br />
            We collaborate.
          </ScrollReveal>

          <ScrollReveal effect="A" as="p" className="mt-4 text-zinc-600">
            We strengthen, support and see it through.
          </ScrollReveal>

          <StaggerGroup className="mt-8 flex flex-col gap-6">
            {POINTS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-200">
                  <Icon className="h-5 w-5 text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-950">{title}</h3>
                  <p className="mt-1 text-sm text-zinc-600">{body}</p>
                </div>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
