import { getHomeContent } from "@/lib/content/home";
import { TrustSectionClient } from "./trust-section-client";

/**
 * Orange band, module 64 (Content, Carousel Card) in place of the old
 * static white paragraph card — the "Ninetynine41 fund, deliver and
 * sustain..." copy split across its natural sentence breaks into three
 * slides instead of one wall of text. Slide content is editable via Sanity;
 * the carousel logic itself lives in trust-section-client.tsx since it
 * needs client-side state.
 */
export async function TrustSection() {
  const { trustSlides, trustCtas } = await getHomeContent();
  return <TrustSectionClient slides={trustSlides} ctas={trustCtas} />;
}
