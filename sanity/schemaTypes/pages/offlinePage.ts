import { defineField, defineType } from "sanity";

export const offlinePage = defineType({
  name: "offlinePage",
  title: "OFFLINEFOR99 Page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        { name: "backgroundImage", title: "Background image", type: "image" },
        { name: "logo", title: "Logo", type: "image" },
        { name: "headline", title: "Headline", type: "string" },
        {
          name: "highlightWords",
          title: "Word(s) to highlight in orange",
          description: "Must match a word that already appears in the Headline above, exactly (case-insensitive) — this colors an existing word, it doesn't add new text.",
          type: "array",
          of: [{ type: "string" }],
        },
        { name: "subcopy1", title: "Subcopy line 1", type: "string" },
        { name: "subcopy2", title: "Subcopy line 2", type: "text", rows: 2 },
        { name: "ctaLabel", title: "Button label", type: "string" },
        { name: "ctaHref", title: "Button link", type: "string" },
      ],
    }),
    defineField({
      name: "intro",
      title: "Intro section",
      type: "object",
      fields: [
        { name: "heading", title: "Heading line 1", type: "string" },
        { name: "heading2", title: "Heading line 2", type: "string" },
        { name: "paragraphs", title: "Paragraphs", type: "array", of: [{ type: "text", rows: 2 }] },
      ],
    }),
    defineField({
      name: "registerForm",
      title: "Register form",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "string" },
        { name: "formHeading", title: "Form panel heading", type: "string" },
        { name: "registrationTypes", title: "Registration types", type: "array", of: [{ type: "string" }] },
        { name: "states", title: "States", type: "array", of: [{ type: "string" }] },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "OFFLINEFOR99 Page" }) },
});
