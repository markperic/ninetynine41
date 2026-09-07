import Image from "next/image";
import { ScrollReveal } from "@/registry/lib/motion-variants";
import { getHomeContent } from "@/lib/content/home";

/**
 * Donors — the live site uses a manual slider (arrows + dots); here it's an
 * infinite marquee instead, using the shared `animate-marquee` utility
 * (globals.css) that other catalog modules already use for logo rows.
 */
export async function Donors() {
  const { donorsHeading, donors } = await getHomeContent();
  const loop = [...donors, ...donors];

  return (
    <section className="overflow-hidden bg-brand-green py-20">
      <ScrollReveal effect="A" as="h2" className="text-center font-display text-3xl font-semibold text-brand-orange sm:text-4xl">
        {donorsHeading}
      </ScrollReveal>

      <div className="mt-14 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-16">
          {loop.map((donor, i) => (
            <div key={`${donor.name}-${i}`} className="flex h-16 w-40 shrink-0 items-center justify-center">
              <Image
                src={donor.logo}
                alt={donor.name}
                width={160}
                height={80}
                className="h-auto max-h-14 w-auto max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
