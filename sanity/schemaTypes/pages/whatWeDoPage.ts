import { defineField, defineType } from "sanity";

export const whatWeDoPage = defineType({
  name: "whatWeDoPage",
  title: "What We Do Page",
  type: "document",
  fields: [
    defineField({ name: "hero", title: "Hero", type: "heroBasic" }),
    defineField({
      name: "actionPlan",
      title: "Action Plan section",
      type: "object",
      fields: [
        { name: "eyebrow", title: "Eyebrow", type: "string" },
        { name: "heading", title: "Heading", type: "string" },
        { name: "subcopy", title: "Subcopy", type: "string" },
        { name: "progressLabel", title: "Progress bar label", type: "string" },
        { name: "progressPercent", title: "Progress percent", type: "number" },
        { name: "image", title: "Image", type: "image" },
      ],
    }),
    defineField({
      name: "collaborate",
      title: "\"We collaborate\" section",
      type: "object",
      fields: [
        { name: "heading", title: "Heading line 1", type: "string" },
        { name: "heading2", title: "Heading line 2", type: "string" },
        { name: "subcopy", title: "Subcopy", type: "string" },
        { name: "image", title: "Image", type: "image" },
        { name: "points", title: "Points", type: "array", of: [{ type: "iconFeature" }] },
      ],
    }),
    defineField({
      name: "ctaBanner",
      title: "Closing CTA banner",
      type: "object",
      fields: [
        { name: "lines", title: "Headline lines", type: "array", of: [{ type: "textLine" }] },
        { name: "ctaLabel", title: "Button label", type: "string" },
        { name: "ctaHref", title: "Button link", type: "string" },
        { name: "backgroundImage", title: "Background image", type: "image" },
      ],
    }),
    defineField({
      name: "pillars",
      title: "Pillars",
      type: "array",
      of: [{ type: "iconFeature" }],
    }),
  ],
  preview: { prepare: () => ({ title: "What We Do Page" }) },
});
