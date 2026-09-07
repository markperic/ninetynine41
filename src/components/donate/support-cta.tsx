import { ScrollReveal, StaggerGroup } from "@/registry/lib/motion-variants";

/**
 * "You don't have to be rich to make a difference." — the dark green
 * closing section under the donation panel.
 */
export function DonateSupportCta() {
  return (
    <section className="bg-brand-green px-6 py-24">
      <StaggerGroup className="mx-auto max-w-3xl text-center">
        <ScrollReveal effect="B" as="h2" className="text-3xl font-semibold text-white sm:text-4xl">
          You don&rsquo;t have to be rich to make a difference.
        </ScrollReveal>

        <ScrollReveal effect="A" as="p" className="mt-6 text-white/80">
          Ever wondered how you can help others when your budget is already tight?{" "}
          <span className="font-semibold text-brand-orange">Ninetynine41</span> is your answer.
        </ScrollReveal>

        <ScrollReveal effect="A" as="p" className="mt-4 text-white/80">
          We have many avenues for donors just like you to lend a hand. Our Giving Legacy begins at{" "}
          <span className="font-semibold text-white">$8.25/month</span>.
        </ScrollReveal>

        <ScrollReveal effect="A" as="p" className="mt-4 text-white/80">
          Perhaps you&rsquo;re a professional who has a skill or time to donate? We&rsquo;d love to hear from you.
        </ScrollReveal>
      </StaggerGroup>
    </section>
  );
}
