import Image from "next/image";
import { Reveal } from "@/registry/lib/motion-variants";

export function Governance() {
  return (
    <section className="bg-brand-cream px-6 py-24 text-center">
      <div className="mx-auto max-w-2xl">
        <Reveal effect="A" as="h2" className="font-display text-4xl font-semibold tracking-tight text-brand-green sm:text-5xl">
          Governance
        </Reveal>

        <Reveal effect="A" as="p" className="mt-6 text-lg text-zinc-700">
          <span className="font-semibold text-brand-orange">Ninetynine41</span> operates under the governance of
          leading Australian development charity, <span className="font-semibold text-zinc-900">Global Development Group.</span>
        </Reveal>

        <Reveal effect="E" as="div" className="mt-10 flex flex-col items-center gap-3">
          <Image src="/brand/gdg-logo.png" alt="Global Development Group" width={120} height={115} className="h-28 w-auto" />
          <span className="text-sm font-semibold text-zinc-600">Global Development Group</span>
        </Reveal>
      </div>
    </section>
  );
}
