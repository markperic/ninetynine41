import type { Image as SanityImage } from "sanity";
import { getSingleton } from "@/lib/sanity/singleton";
import { resolveImage } from "@/lib/content/image";

type RawChurches = {
  hero?: { logo?: SanityImage; headline?: string; highlightWords?: string[] };
  intro?: { paragraph1?: string; paragraph2?: string };
  trust?: { heading?: string; paragraph?: string };
  callToAction?: {
    heading?: string;
    intro?: string;
    weeklyAmount?: string;
    weeklyYearly?: string;
    monthlyAmount?: string;
    monthlyYearly?: string;
    lglFormId?: string;
    closingHeading?: string;
    closingBody?: string;
  };
};

function mapChurches(doc: RawChurches | null) {
  const d = doc ?? {};
  const hero = d.hero ?? {};
  const intro = d.intro ?? {};
  const trust = d.trust ?? {};
  const cta = d.callToAction ?? {};

  return {
    hero: {
      logo: resolveImage(hero.logo, "/brand/9941-logo-stacked-reverse.png"),
      headline: hero.headline ?? "For the ONE who has no one.",
      highlightWords: hero.highlightWords ?? ["ONE"],
    },
    intro: {
      paragraph1:
        intro.paragraph1 ??
        "Feeling called to make a change but not sure where to start? Ninetynine41 is your answer.",
      paragraph2:
        intro.paragraph2 ??
        "Ninetynine41 fund, deliver and sustain real-world change through specific community projects, helping some of the world's poorest people. Ninetynine41 is a registered Australian charity with the ACNC (The Australian Charities and Not-for-profits Commission). Working closely with overarching Australian charity, Global Development Group, Ninetynine41 has the background, infrastructure and on-the-ground intel to bridge the gap between challenge and solution.",
    },
    trust: {
      heading: trust.heading ?? "Built on trust. Proven through action.",
      paragraph:
        trust.paragraph ??
        "Ninetynine41 chooses projects based on requests, reports and information provided to us by Global Development Group. Projects are assessed for their suitability, sustainability and maintainability. Ninetynine41 is committed to taking on only the projects we can see through to completion. Projects are monitored by GDG Project Officers through preliminary stages, during roll-out and beyond completion.",
    },
    callToAction: {
      heading: cta.heading ?? "Will you answer the call?",
      intro: cta.intro ?? "There are two simple ways to answer the call:",
      weeklyAmount: cta.weeklyAmount ?? "$99/week",
      weeklyYearly: cta.weeklyYearly ?? "$5,148/year",
      monthlyAmount: cta.monthlyAmount ?? "$99/month",
      monthlyYearly: cta.monthlyYearly ?? "$1,188/year",
      lglFormId: cta.lglFormId ?? "22QylqlNw7D4p-6Xvzlclg",
      closingHeading: cta.closingHeading ?? "We can do this TOGETHER.",
      closingBody: cta.closingBody ?? "Would you consider supporting Ninetynine41?",
    },
  };
}

export async function getChurchesContent() {
  const doc = await getSingleton<RawChurches>("churchesPage");
  return mapChurches(doc);
}
