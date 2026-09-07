import { defineField, defineType } from "sanity";

export const projectsPage = defineType({
  name: "projectsPage",
  title: "Projects Page",
  type: "document",
  fields: [
    defineField({
      name: "intro",
      title: "Intro section",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "heading", title: "Heading", type: "string" },
        { name: "paragraph1", title: "Paragraph 1", type: "text", rows: 3 },
        { name: "paragraph2", title: "Paragraph 2", type: "string" },
        { name: "image", title: "Image", type: "image" },
        { name: "progressLabel", title: "Progress bar label", type: "string" },
        { name: "progressPercent", title: "Progress percent", type: "number" },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Projects Page" }) },
});
