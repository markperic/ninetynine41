import type { Image as SanityImage } from "sanity";
import { getSingleton } from "@/lib/sanity/singleton";
import { resolveImage } from "@/lib/content/image";

type RawHome = {
  hero?: { eyebrow?: string; headline?: string; highlightWords?: string[]; subcopy?: string; ctaLabel?: string; ctaHref?: string };
  bigStatement?: { text?: string; highlighted?: boolean }[];
  trustSlides?: { image?: SanityImage; alt?: string; content?: string }[];
  trustCtas?: { primaryLabel?: string; primaryHref?: string; secondaryLabel?: string; secondaryHref?: string };
  whatWeDoHeading?: string;
  whatWeDoFeatures?: { icon?: string; eyebrow?: string; title?: string; body?: string }[];
  governance?: { heading?: string; body?: string };
  donorsHeading?: string;
  donors?: { name?: string; logo?: SanityImage }[];
  impactCta?: { lines?: { text?: string; highlightWords?: string[] }[]; ctaLabel?: string; ctaHref?: string; backgroundImage?: SanityImage };
  testimonialsHeading?: string;
  testimonials?: { quote?: string; name?: string; role?: string; photo?: SanityImage }[];
};

export type HomeContent = {
  hero: { eyebrow: string; headline: string; highlightWords: string[]; subcopy: string; ctaLabel: string; ctaHref: string };
  bigStatement: { text: string; highlighted: boolean }[];
  trustSlides: { image: string; alt: string; content: string }[];
  trustCtas: { primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string };
  whatWeDoHeading: string;
  whatWeDoFeatures: { icon: string; eyebrow: string; title: string; body: string }[];
  governance: { heading: string; body: string };
  donorsHeading: string;
  donors: { name: string; logo: string }[];
  impactCta: { lines: { text: string; highlightWords: string[] }[]; ctaLabel: string; ctaHref: string; backgroundImage: string };
  testimonialsHeading: string;
  testimonials: { quote: string; name: string; role: string | null; photo: string | null }[];
};

const DEFAULTS: HomeContent = {
  hero: {
    eyebrow: "",
    headline: "For the ONE who has no one.",
    highlightWords: ["ONE"],
    subcopy:
      "Ever wanted to make a change in the world but didn’t know where to start? Ninetynine41 is your answer.",
    ctaLabel: "Change starts here",
    ctaHref: "/about",
  },
  bigStatement: [
    { text: "Built on", highlighted: false },
    { text: "Trust", highlighted: true },
    { text: "Proven through", highlighted: false },
    { text: "ACTION.", highlighted: true },
  ],
  trustSlides: [
    {
      image: "/images/slide1web.jpg",
      alt: "Ninetynine41 community project",
      content:
        "Ninetynine41 fund, deliver and sustain real-world change through specific community projects, helping the world's poorest people.",
    },
    {
      image: "/images/slide2web.jpg",
      alt: "Ninetynine41 community project",
      content:
        "Ninetynine41 has the background, infrastructure and on-the-ground intel to bridge the gap between challenge and solution.",
    },
    {
      image: "/images/slide3web.jpg",
      alt: "Ninetynine41 community project",
      content:
        "We don't take over; we strengthen what exists. We trust local knowledge and trust the process. We see each project through to completion.",
    },
  ],
  trustCtas: {
    primaryLabel: "Current Projects",
    primaryHref: "/projects",
    secondaryLabel: "What We Do",
    secondaryHref: "/what-we-do",
  },
  whatWeDoHeading: "What We Do",
  whatWeDoFeatures: [
    {
      icon: "HelpCircle",
      eyebrow: "Why",
      title: "Kindness",
      body: "We are all connected. What happens to ONE, happens to all. There is great need and we are moved to make a difference, no matter how small. No ONE should go without. Every ONE matters.",
    },
    {
      icon: "Handshake",
      eyebrow: "How",
      title: "Connection",
      body: "Change begins at a grassroots level. Ninetynine41 comes alongside local organisations, community leaders and volunteers to create meaningful outcomes. We don't take over. We seek to understand through collaboration, empower through ongoing support and implement solutions to sustain in the long-term.",
    },
    {
      icon: "Link2",
      eyebrow: "What",
      title: "Action",
      body: "Less talk. Better outcomes. Ninetynine41 is interested in lasting change and the projects we select reflect this. Working closely with leading Australian charity, Global Development Group, gives us insight into the most urgent needs around the globe. We share the same vision; to bring change to the ONE to bring change to many.",
    },
  ],
  governance: {
    heading: "Governance",
    body: "Ninetynine41 operates under the governance of leading Australian development charity, Global Development Group.",
  },
  donorsHeading: "Donors",
  donors: [
    { name: "Every Bodies Physio", logo: "/brand/donor-eb-physio.png" },
    { name: "KIND.SIR Leatherware", logo: "/brand/donor-kindsir.png" },
    { name: "PBN Constructions", logo: "/brand/donor-pbn.png" },
    { name: "Piwinski Constructions", logo: "/brand/donor-piwinski.png" },
    { name: "Harcourts Newcastle", logo: "/brand/donor-harcourts.png" },
    { name: "TS Projects", logo: "/brand/donor-ts-projects.png" },
    { name: "ESME Property Staging", logo: "/brand/donor-esme.png" },
  ],
  impactCta: {
    lines: [
      { text: "Bring change to ONE.", highlightWords: ["ONE"] },
      { text: "Bring change to many.", highlightWords: ["many"] },
    ],
    ctaLabel: "Let's get to work",
    ctaHref: "/contact",
    backgroundImage: "/brand/cta-running.jpg",
  },
  testimonialsHeading: "What communities say about Ninetynine41",
  testimonials: [
    {
      quote:
        "Partnering with Ninetynine41 has helped us to make significant impact in a much shorter time than we expected. The team know how to find those small issues that become huge road blocks and turn them into practical solutions.",
      name: "SHE Rescue",
      role: null,
      photo: "/images/library/landscape09.jpg",
    },
    {
      quote:
        "It has been a privilege to partner with Nathan and the team at Ninetynine41 in providing a first-ever toilet and bathroom for a hill tribe family in a remote village in northern Thailand. We have been greatly encouraged by their commitment to excellence and their clear dedication to transforming lives and communities through strategic partnerships.",
      name: "Tim Daniell",
      role: "Founder & Director, Building Strong Families Foundation",
      photo: "/brand/testimonial-bsf.jpg",
    },
    {
      quote:
        "Ninetynine41 didn't just fund our water project, they walked the whole journey with us. Their team asked the right questions before a single dollar moved, and that groundwork is why the well is still running two years on.",
      name: "Amara Okafor",
      role: "Program Lead, Highland Community Trust",
      photo: "/images/library/landscape07.jpg",
    },
    {
      quote:
        "What sets Ninetynine41 apart is follow-through. Plenty of organisations show up for the launch photo; they showed up for the boring maintenance visits eighteen months later, which is when it actually mattered.",
      name: "Daniel Reyes",
      role: "Executive Director, Open Hands Foundation",
      photo: "/images/library/landscape12.jpg",
    },
  ],
};

export async function getHomeContent(): Promise<HomeContent> {
  const doc = await getSingleton<RawHome>("homePage");
  if (!doc) return DEFAULTS;

  return {
    hero: { ...DEFAULTS.hero, ...doc.hero },
    bigStatement: doc.bigStatement?.length
      ? doc.bigStatement.map((l, i) => ({ text: l.text ?? DEFAULTS.bigStatement[i]?.text ?? "", highlighted: l.highlighted ?? false }))
      : DEFAULTS.bigStatement,
    trustSlides: doc.trustSlides?.length
      ? doc.trustSlides.map((s, i) => ({
          image: resolveImage(s.image, DEFAULTS.trustSlides[i]?.image ?? DEFAULTS.trustSlides[0].image),
          alt: s.alt ?? DEFAULTS.trustSlides[i]?.alt ?? "",
          content: s.content ?? DEFAULTS.trustSlides[i]?.content ?? "",
        }))
      : DEFAULTS.trustSlides,
    trustCtas: { ...DEFAULTS.trustCtas, ...doc.trustCtas },
    whatWeDoHeading: doc.whatWeDoHeading ?? DEFAULTS.whatWeDoHeading,
    whatWeDoFeatures: doc.whatWeDoFeatures?.length
      ? doc.whatWeDoFeatures.map((f) => ({ icon: f.icon ?? "HelpCircle", eyebrow: f.eyebrow ?? "", title: f.title ?? "", body: f.body ?? "" }))
      : DEFAULTS.whatWeDoFeatures,
    governance: { ...DEFAULTS.governance, ...doc.governance },
    donorsHeading: doc.donorsHeading ?? DEFAULTS.donorsHeading,
    donors: doc.donors?.length
      ? doc.donors.map((d, i) => ({ name: d.name ?? "", logo: resolveImage(d.logo, DEFAULTS.donors[i]?.logo ?? DEFAULTS.donors[0].logo, 320, 160) }))
      : DEFAULTS.donors,
    impactCta: {
      lines: doc.impactCta?.lines?.length
        ? doc.impactCta.lines.map((l, i) => ({ text: l.text ?? "", highlightWords: l.highlightWords ?? DEFAULTS.impactCta.lines[i]?.highlightWords ?? [] }))
        : DEFAULTS.impactCta.lines,
      ctaLabel: doc.impactCta?.ctaLabel ?? DEFAULTS.impactCta.ctaLabel,
      ctaHref: doc.impactCta?.ctaHref ?? DEFAULTS.impactCta.ctaHref,
      backgroundImage: resolveImage(doc.impactCta?.backgroundImage, DEFAULTS.impactCta.backgroundImage),
    },
    testimonialsHeading: doc.testimonialsHeading ?? DEFAULTS.testimonialsHeading,
    testimonials: doc.testimonials?.length
      ? doc.testimonials.map((t) => ({
          quote: t.quote ?? "",
          name: t.name ?? "",
          role: t.role ?? null,
          photo: t.photo ? resolveImage(t.photo, "") : null,
        }))
      : DEFAULTS.testimonials,
  };
}
