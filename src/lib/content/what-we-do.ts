import type { Image as SanityImage } from "sanity";
import { getSingleton } from "@/lib/sanity/singleton";
import { resolveImage } from "@/lib/content/image";

type RawWhatWeDo = {
  hero?: { eyebrow?: string; headline?: string; highlightWords?: string[]; subcopy?: string; ctaLabel?: string; ctaHref?: string };
  actionPlan?: { eyebrow?: string; heading?: string; subcopy?: string; progressLabel?: string; progressPercent?: number; image?: SanityImage };
  collaborate?: {
    heading?: string;
    heading2?: string;
    subcopy?: string;
    image?: SanityImage;
    points?: { icon?: string; title?: string; body?: string }[];
  };
  ctaBanner?: { lines?: { text?: string; highlightWords?: string[] }[]; ctaLabel?: string; ctaHref?: string; backgroundImage?: SanityImage };
  pillars?: { icon?: string; title?: string; body?: string }[];
};

function mapWhatWeDo(doc: RawWhatWeDo | null) {
  const d = doc ?? {};
  const actionPlan = d.actionPlan ?? {};
  const collaborate = d.collaborate ?? {};
  const ctaBanner = d.ctaBanner ?? {};

  return {
    hero: {
      eyebrow: d.hero?.eyebrow ?? "",
      headline: d.hero?.headline ?? "What We Do",
      highlightWords: d.hero?.highlightWords ?? ["Do"],
      subcopy: d.hero?.subcopy ?? "We are the bridge between need and impact.",
      ctaLabel: d.hero?.ctaLabel ?? "How We Work",
      ctaHref: d.hero?.ctaHref ?? "#how-we-work",
    },
    actionPlan: {
      eyebrow: actionPlan.eyebrow ?? "Ninetynine41",
      heading: actionPlan.heading ?? "An action-focused plan leads to a sustainable outcome.",
      subcopy: actionPlan.subcopy ?? "Actions speak louder than words.",
      progressLabel: actionPlan.progressLabel ?? "Project Funding Tracking",
      progressPercent: actionPlan.progressPercent ?? 90,
      image: resolveImage(actionPlan.image, "/images/about2.webp"),
    },
    collaborate: {
      heading: collaborate.heading ?? "We don't take over.",
      heading2: collaborate.heading2 ?? "We collaborate.",
      subcopy: collaborate.subcopy ?? "We strengthen, support and see it through.",
      image: resolveImage(collaborate.image, "/images/about1.webp"),
      points: collaborate.points?.length
        ? collaborate.points.map((p) => ({ icon: p.icon ?? "Handshake", title: p.title ?? "", body: p.body ?? "" }))
        : [
            {
              icon: "Handshake",
              title: "We respect the locals.",
              body: "We listen to the needs of the community and, using the local information given, provide a sustainable solution to a pressing problem.",
            },
            {
              icon: "Link2",
              title: "We stay connected.",
              body: "Sustainability is key. We deliver and fund the projects but our priority is providing a sustainable project everyone can be proud of.",
            },
          ],
    },
    ctaBanner: {
      lines: ctaBanner.lines?.length
        ? ctaBanner.lines.map((l) => ({ text: l.text ?? "", highlightWords: l.highlightWords ?? [] }))
        : [{ text: "For the ONE who has no one.", highlightWords: ["ONE"] }],
      ctaLabel: ctaBanner.ctaLabel ?? "Ways to help right now",
      ctaHref: ctaBanner.ctaHref ?? "/donate",
      backgroundImage: resolveImage(ctaBanner.backgroundImage, "/images/theone-web.jpg"),
    },
    pillars: d.pillars?.length
      ? d.pillars.map((p) => ({ icon: p.icon ?? "Target", title: p.title ?? "", body: p.body ?? "" }))
      : [
          {
            icon: "Target",
            title: "Strategy for Action & Maximum Impact",
            body: "Working with local community leaders, Ninetynine41 develop clear and realistic strategic plans to overcome specific challenges. We collaborate with the community to identify the need and create a sustainable answer to a pressing problem. Our partnership with Global Development Group gives us the clarity and insight to move community projects from intention to action, and from action to outcomes.",
          },
          {
            icon: "HeartHandshake",
            title: "Fundraising & Donor Confidence",
            body: "Ninetynine41 makes it simple for donors to support specific projects which bring lasting change to communities in need. Donors give to causes they trust, and trust is built through transparency, structure and consistent, open communication. We work closely with Global Development Group as our advisory body, so donor reporting stays consistent and available.",
          },
          {
            icon: "Repeat",
            title: "Fund | Deliver | Sustain",
            body: "Implementing a community project is challenging; maintaining it afterward is often more so. Our goal is to leave communities with the strategy to sustain the work long after we've finished. We provide practical delivery oversight so funded projects are managed well, milestones are met, and outcomes are reported and sustained with integrity.",
          },
        ],
  };
}

export async function getWhatWeDoContent() {
  const doc = await getSingleton<RawWhatWeDo>("whatWeDoPage");
  return mapWhatWeDo(doc);
}
