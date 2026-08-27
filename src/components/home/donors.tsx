import Image from "next/image";
import { ScrollReveal } from "@/registry/lib/motion-variants";

const DONORS = [
  { name: "Every Bodies Physio", src: "/brand/donor-eb-physio.png" },
  { name: "KIND.SIR Leatherware", src: "/brand/donor-kindsir.png" },
  { name: "PBN Constructions", src: "/brand/donor-pbn.png" },
  { name: "Piwinski Constructions", src: "/brand/donor-piwinski.png" },
  { name: "Harcourts Newcastle", src: "/brand/donor-harcourts.png" },
  { name: "TS Projects", src: "/brand/donor-ts-projects.png" },
  { name: "ESME Property Staging", src: "/brand/donor-esme.png" },
];

/**
 * Donors — the live site uses a manual slider (arrows + dots); here it's an
 * infinite marquee instead, using the shared `animate-marquee` utility
 * (globals.css) that other catalog modules already use for logo rows. Same
 * content, a simpler and more "flare"-appropriate mechanism.
 */
export function Donors() {
  const loop = [...DONORS, ...DONORS];

  return (
    <section className="overflow-hidden bg-brand-green py-20">
      <ScrollReveal effect="A" as="h2" className="text-center font-display text-3xl font-semibold text-brand-orange sm:text-4xl">
        Donors
      </ScrollReveal>

      <div className="mt-14 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-16">
          {loop.map((donor, i) => (
            <div key={`${donor.name}-${i}`} className="flex h-16 w-40 shrink-0 items-center justify-center">
              <Image
                src={donor.src}
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
