import { defineField, defineType } from "sanity";

export const donatePage = defineType({
  name: "donatePage",
  title: "Donate Page",
  type: "document",
  fields: [
    defineField({
      name: "panel",
      title: "Donate panel",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "heading", title: "Heading line 1", type: "string" },
        {
          name: "headingHighlight",
          title: "Highlighted word in line 1",
          description: "Must match a word that already appears in Heading line 1 above, exactly (case-insensitive). Shown in green here since this panel's background is already orange.",
          type: "string",
        },
        { name: "heading2", title: "Heading line 2", type: "string" },
        { name: "intro", title: "Intro paragraph", type: "text", rows: 2 },
        { name: "thankYouLabel", title: "\"Thank you\" label", type: "string" },
        { name: "legalText1", title: "Legal paragraph 1 (project partner note)", type: "text", rows: 3 },
        { name: "legalText2", title: "Legal paragraph 2 (tax deductibility note)", type: "text", rows: 3 },
      ],
    }),
    defineField({
      name: "embedHtml",
      title: "Donation form embed code",
      description: "Raw embed markup for the donation widget (currently Raisely). Only change this if the payment provider's embed snippet changes.",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "supportCta",
      title: "Support CTA",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "string" },
        { name: "paragraphs", title: "Paragraphs", type: "array", of: [{ type: "text", rows: 2 }] },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Donate Page" }) },
});
