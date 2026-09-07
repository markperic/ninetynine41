import type { Image as SanityImage } from "sanity";
import { getSingleton } from "@/lib/sanity/singleton";
import { resolveImage } from "@/lib/content/image";

type RawProjectsPage = {
  intro?: {
    eyebrow?: string;
    heading?: string;
    paragraph1?: string;
    paragraph2?: string;
    image?: SanityImage;
    progressLabel?: string;
    progressPercent?: number;
  };
};

export async function getProjectsPageContent() {
  const doc = await getSingleton<RawProjectsPage>("projectsPage");
  const intro = doc?.intro ?? {};
  return {
    intro: {
      eyebrow: intro.eyebrow ?? "Ninetynine41",
      heading: intro.heading ?? "Our Projects",
      paragraph1:
        intro.paragraph1 ??
        "Ninetynine41 fund, deliver and sustain real-world change through specific community projects. There is need and we want to help. We have the background, infrastructure and on-the-ground intel to bridge the gap between pressing issue and solution.",
      paragraph2: intro.paragraph2 ?? "We don't take over; we strengthen what exists. We see each project through to completion.",
      image: resolveImage(intro.image, "/images/srey1.webp"),
      progressLabel: intro.progressLabel ?? "Srey Oun Small Business",
      progressPercent: intro.progressPercent ?? 90,
    },
  };
}
