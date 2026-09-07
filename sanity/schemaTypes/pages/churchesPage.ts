import { defineField, defineType } from "sanity";

export const churchesPage = defineType({
  name: "churchesPage",
  title: "Churches Page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        { name: "logo", title: "Logo", type: "image" },
        { name: "headline", title: "Headline", type: "string" },
        {
          name: "highlightWords",
          title: "Word(s) to highlight in orange",
          description: "Must match a word that already appears in the Headline above, exactly (case-insensitive) — this colors an existing word, it doesn't add new text.",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "object",
      fields: [
        { name: "paragraph1", title: "Paragraph 1 (green band)", type: "text", rows: 2 },
        { name: "paragraph2", title: "Paragraph 2 (cream band)", type: "text", rows: 3 },
      ],
    }),
    defineField({
      name: "trust",
      title: "Trust section",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "string" },
        { name: "paragraph", title: "Paragraph", type: "text", rows: 3 },
      ],
    }),
    defineField({
      name: "callToAction",
      title: "Call to action",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "string" },
        { name: "intro", title: "Intro line", type: "string" },
        { name: "weeklyAmount", title: "Weekly amount", type: "string" },
        { name: "weeklyYearly", title: "Weekly → yearly total", type: "string" },
        { name: "monthlyAmount", title: "Monthly amount", type: "string" },
        { name: "monthlyYearly", title: "Monthly → yearly total", type: "string" },
        { name: "lglFormId", title: "LGL Forms ID", description: "Little Green Light form embed ID.", type: "string" },
        { name: "closingHeading", title: "Closing heading", type: "string" },
        { name: "closingBody", title: "Closing body", type: "string" },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Churches Page" }) },
});
