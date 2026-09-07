export type Project = {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  excerpt: string;
  body: string[];
  image: string;
  imageAlt: string;
};

/**
 * Local project data — the live site's Projects section runs on WordPress
 * posts, which this repo doesn't have a CMS wired up to yet (Sanity lands
 * in a later roadmap phase, see README). Until then this is the single
 * source of truth for both the listing page and the `[slug]` template, so
 * the two never drift out of sync with each other.
 *
 * Only two real projects exist on the live site — both about the same
 * Srey Oun story the About page's testimonial already tells (names
 * asterisked there too, standard practice for a minor's safety). Reusing
 * srey1.webp (the flood-safe house photo) for both rather than inventing
 * placeholder photos, since it's the one real photo this story actually has.
 */
export const PROJECTS: Project[] = [
  {
    slug: "srey-oun-small-business",
    title: "Small Business Success for Srey Oun*",
    date: "2025-06-09",
    displayDate: "Jun 9, 2025",
    excerpt:
      "We successfully assisted Srey Oun's* mother in launching a small business to support her family following her emergency surgery.",
    body: [
      "We successfully assisted Srey Oun's* mother in launching a small business to support her family following her emergency surgery.",
      "With a stable income back in the household, the family no longer carries the same day-to-day uncertainty — the same foundation Ninetynine41 helped put in place when it worked with volunteers to build the family's flood-safe home.",
    ],
    image: "/images/srey1.webp",
    imageAlt: "The flood-safe house built for Srey Oun's family",
  },
  {
    slug: "building-a-future-for-srey-oun",
    title: "Building a Future for Srey Oun*",
    date: "2025-06-09",
    displayDate: "Jun 9, 2025",
    excerpt:
      "At just 7 years old, Srey Oun* was welcomed into the SHE Rescue Home after surviving human trafficking and sexual exploitation by someone who had gained the family's trust.",
    body: [
      "At just 7 years old, Srey Oun* was welcomed into the SHE Rescue Home after surviving human trafficking and sexual exploitation by someone who had gained the family's trust.",
      "Because of generous supporters, Ninetynine41 was able to purchase land for the family, and a team of volunteers built a brand-new, flood-safe house in just four days.",
    ],
    image: "/images/srey1.webp",
    imageAlt: "The flood-safe house built for Srey Oun's family",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
