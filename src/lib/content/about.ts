import type { Image as SanityImage } from "sanity";
import { getSingleton } from "@/lib/sanity/singleton";
import { resolveImage } from "@/lib/content/image";

type RawAbout = {
  hero?: { eyebrow?: string; headline?: string; highlightWords?: string[]; subcopy?: string; ctaLabel?: string; ctaHref?: string };
  changeForOne?: {
    heading?: string;
    headingHighlight?: string;
    heading2?: string;
    image1?: SanityImage;
    image2?: SanityImage;
    paragraphs?: string[];
  };
  stats?: {
    column1Stat1Figure?: string;
    column1Stat1Note?: string;
    column1Stat2Figure?: string;
    column1Stat2Note?: string;
    column2Stat1Figure?: string;
    column2Stat1Note?: string;
    column2Stat2Figure?: string;
    column2Stat2Note?: string;
    backdrop1?: SanityImage;
    backdrop2?: SanityImage;
    scene1Text?: string;
    scene2Text?: string;
    footerLabel?: string;
  };
  supportCta?: { text?: string; linkLabel?: string; linkHref?: string };
  testimonial?: {
    eyebrow?: string;
    heading?: string;
    headingHighlight?: string;
    heading2?: string;
    image?: SanityImage;
    quote?: string;
    name?: string;
    role?: string;
  };
  weFocusOn?: { eyebrow?: string; heading?: string; features?: { icon?: string; title?: string; body?: string }[] };
};

export type AboutContent = ReturnType<typeof mapAbout>;

const DEFAULT_PARAGRAPHS = [
  "Ninetynine41 fund, deliver and sustain real-world change through specific community projects helping the world's poorest people.",
  "Our commitment begins at a local level. We foster relationships within the local neighbourhood; with local leaders and the community. We understand real change is a collaborative effort. We don't take over.",
  "By partnering with local organizations and bringing our support, we amplify the good already present in these communities.",
  "In a world where challenges often overshadow positivity, we're not just dreamers, we are an action-focused organisation.",
  "We provide strategy and practical support bridging the gap from idea, to impact, to sustainability.",
];

function mapAbout(doc: RawAbout | null) {
  const d = doc ?? {};
  const cfo = d.changeForOne ?? {};
  const stats = d.stats ?? {};
  const testimonial = d.testimonial ?? {};
  const weFocusOn = d.weFocusOn ?? {};

  return {
    hero: {
      eyebrow: d.hero?.eyebrow ?? "",
      headline: d.hero?.headline ?? "About Ninetynine41",
      highlightWords: d.hero?.highlightWords ?? [],
      subcopy:
        d.hero?.subcopy ??
        "Ninetynine41 fund, deliver and sustain specific community projects, bringing hope and dignity to those who need it most.",
      ctaLabel: d.hero?.ctaLabel ?? "Our Impact",
      ctaHref: d.hero?.ctaHref ?? "#stats",
    },
    changeForOne: {
      heading: cfo.heading ?? "Change for the ONE.",
      headingHighlight: cfo.headingHighlight ?? "ONE",
      heading2: cfo.heading2 ?? "Change for the community.",
      image1: resolveImage(cfo.image1, "/images/about1.webp"),
      image2: resolveImage(cfo.image2, "/images/about2.webp"),
      paragraphs: cfo.paragraphs?.length ? cfo.paragraphs : DEFAULT_PARAGRAPHS,
    },
    stats: {
      column1Stat1Figure: stats.column1Stat1Figure ?? "13+",
      column1Stat1Note: stats.column1Stat1Note ?? "Community projects funded, delivered and sustained since founding",
      column1Stat2Figure: stats.column1Stat2Figure ?? "7",
      column1Stat2Note: stats.column1Stat2Note ?? "Corporate and community partners backing the mission today",
      column2Stat1Figure: stats.column2Stat1Figure ?? "5+",
      column2Stat1Note: stats.column2Stat1Note ?? "Countries reached across Asia, Africa and Australia",
      column2Stat2Figure: stats.column2Stat2Figure ?? "6",
      column2Stat2Note: stats.column2Stat2Note ?? "Nations home to an active project: Cambodia, Thailand, Sri Lanka, Nepal, Kenya, Australia",
      backdrop1: resolveImage(stats.backdrop1, "/images/world-map-web.jpg"),
      backdrop2: resolveImage(stats.backdrop2, "/images/community-web.jpg"),
      scene1Text: stats.scene1Text ?? "Change for the ONE. Change for the community.",
      scene2Text: stats.scene2Text ?? "You don't have to be rich to make a difference.",
      footerLabel: stats.footerLabel ?? "Global Projects",
    },
    supportCta: {
      text: d.supportCta?.text ?? "You don't have to be rich to make a difference.",
      linkLabel: d.supportCta?.linkLabel ?? "Ways to support Ninetynine41",
      linkHref: d.supportCta?.linkHref ?? "/what-we-do",
    },
    testimonial: {
      eyebrow: testimonial.eyebrow ?? "Testimonials",
      heading: testimonial.heading ?? "Safety for the ONE",
      headingHighlight: testimonial.headingHighlight ?? "ONE",
      heading2: testimonial.heading2 ?? "Srey Oun",
      image: resolveImage(testimonial.image, "/images/srey1.webp"),
      quote:
        testimonial.quote ??
        "Because of generous supporters like you, we've been able to purchase land for the family, and thanks to a team of volunteers, we built a brand-new, flood-safe house in just four days.",
      name: testimonial.name ?? "Srey Oun",
      role: testimonial.role ?? "Project Participant",
    },
    weFocusOn: {
      eyebrow: weFocusOn.eyebrow ?? "Our Expertise",
      heading: weFocusOn.heading ?? "We Focus On",
      features: weFocusOn.features?.length
        ? weFocusOn.features.map((f) => ({ icon: f.icon ?? "Target", title: f.title ?? "", body: f.body ?? "" }))
        : [
            {
              icon: "Target",
              title: "Strategy & Structure",
              body: "Ninetynine41 brings strategy, structure and important on-the-ground information to create practical, cost-effective solutions to pressing community issues. A sustainable plan is paramount so projects are not only implemented but also supported and maintained.",
            },
            {
              icon: "Users",
              title: "Grassroots Connection",
              body: "We maintain close liaison with local community leaders to create practical strategy particular to the region. The communities we serve are our number one priority.",
            },
            {
              icon: "Globe2",
              title: "Global Vision",
              body: "We are an Australian organisation addressing important global issues by connecting like-minded people lending a hand where they can. Together, we're leaving a legacy both locally and globally.",
            },
          ],
    },
  };
}

export async function getAboutContent() {
  const doc = await getSingleton<RawAbout>("aboutPage");
  return mapAbout(doc);
}
