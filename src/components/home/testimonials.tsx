import Image from "next/image";
import { ScrollReveal, StaggerGroup } from "@/registry/lib/motion-variants";

const TESTIMONIALS = [
  {
    quote:
      "Partnering with Ninetynine41 has helped us to make significant impact in a much shorter time than we expected. The team know how to find those small issues that become huge road blocks and turn them into practical solutions.",
    name: "SHE Rescue",
    role: null,
    photo: null,
  },
  {
    quote:
      "It has been a privilege to partner with Nathan and the team at Ninetynine41 in providing a first-ever toilet and bathroom for a hill tribe family in a remote village in northern Thailand. We have been greatly encouraged by their commitment to excellence and their clear dedication to transforming lives and communities through strategic partnerships.",
    name: "Tim Daniell",
    role: "Founder & Director, Building Strong Families Foundation",
    photo: "/brand/testimonial-bsf.jpg",
  },
];

/**
 * Testimonials — the live site runs these as a drag/autoplay carousel; this
 * is a static two-up grid instead, same content. Worth swapping for a real
 * carousel module later if that interaction matters to the client.
 *
 * Note: the SHE Rescue card has no background photo — the source image the
 * WordPress site references (kids-hero-web.jpg) 404s on the live site
 * itself, so there was nothing to pull.
 */
export function Testimonials() {
  return (
    <section className="bg-brand-green px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal effect="A" as="h2" className="text-center font-display text-3xl font-semibold text-white sm:text-4xl">
          What communities say about Ninetynine41
        </ScrollReveal>

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 p-8"
            >
              {t.photo && (
                <>
                  <Image src={t.photo} alt="" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/60" />
                </>
              )}
              <div className="relative">
                <p className="text-white/90">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-5 font-semibold text-white">{t.name}</p>
                {t.role && <p className="text-sm text-white/60">{t.role}</p>}
              </div>
            </div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
