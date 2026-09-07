import { defineField, defineType } from "sanity";

/** One line of a multi-line display headline, with optional orange word(s). */
export const textLine = defineType({
  name: "textLine",
  title: "Line",
  type: "object",
  fields: [
    defineField({ name: "text", title: "Text", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "highlightWords",
      title: "Word(s) to highlight in orange",
      description: "Must match a word that already appears in the Text above, exactly (case-insensitive) — this colors an existing word, it doesn't add new text.",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: { select: { title: "text" } },
});
