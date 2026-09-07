import { defineField, defineType } from "sanity";

/**
 * Shared shape for the site's page heroes (Home/About/What We Do/Churches
 * all use the same brand cliff video with page-specific headline copy;
 * OFFLINEFOR99 swaps in its own photo). `highlightWords` lists which word(s)
 * in `headline` render in brand-orange — see src/lib/highlight.tsx.
 */
export const heroBasic = defineType({
  name: "heroBasic",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow (optional small label above headline)", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "highlightWords",
      title: "Word(s) to highlight in orange",
      description: "Must match a word that already appears in the Headline above, exactly (case-insensitive) — this colors an existing word, it doesn't add new text.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "subcopy", title: "Subcopy", type: "text", rows: 2 }),
    defineField({ name: "ctaLabel", title: "Button label", type: "string" }),
    defineField({
      name: "ctaHref",
      title: "Button link",
      description: "Where the button goes — an internal path (e.g. /contact), an on-page anchor (e.g. #stats), or a full https:// URL.",
      type: "string",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background image",
      description: "Shown behind the headline (video pages use this as the poster/fallback frame).",
      type: "image",
    }),
  ],
});
