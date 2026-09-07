import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({ name: "hero", title: "Hero", type: "heroBasic" }),
    defineField({
      name: "bigStatement",
      title: "Big Statement (4 lines)",
      description: "The giant scroll statement under the hero. Exactly 4 lines expected — line sizing is tuned for that count.",
      type: "array",
      of: [{ type: "object", name: "bigStatementLine", fields: [
        { name: "text", title: "Text", type: "string" },
        { name: "highlighted", title: "Show in orange", type: "boolean", initialValue: false },
      ] }],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: "trustSlides",
      title: "Trust Section slides",
      type: "array",
      of: [{ type: "object", name: "trustSlide", fields: [
        { name: "image", title: "Image", type: "image" },
        { name: "alt", title: "Alt text", type: "string" },
        { name: "content", title: "Text", type: "text", rows: 3 },
      ] }],
    }),
    defineField({
      name: "trustCtas",
      title: "Trust Section buttons",
      description: "The two buttons under the Trust Section slides.",
      type: "object",
      fields: [
        { name: "primaryLabel", title: "Primary button label", type: "string" },
        { name: "primaryHref", title: "Primary button link", type: "string" },
        { name: "secondaryLabel", title: "Secondary button label", type: "string" },
        { name: "secondaryHref", title: "Secondary button link", type: "string" },
      ],
    }),
    defineField({
      name: "whatWeDoHeading",
      title: "\"What We Do\" heading",
      type: "string",
    }),
    defineField({
      name: "whatWeDoFeatures",
      title: "\"What We Do\" features",
      type: "array",
      of: [{ type: "iconFeature" }],
    }),
    defineField({
      name: "governance",
      title: "Governance",
      type: "object",
      fields: [
        { name: "heading", title: "Heading", type: "string" },
        { name: "body", title: "Body", type: "text", rows: 3 },
      ],
    }),
    defineField({ name: "donorsHeading", title: "Donors heading", type: "string" }),
    defineField({
      name: "donors",
      title: "Donors",
      type: "array",
      of: [{ type: "object", name: "donor", fields: [
        { name: "name", title: "Name", type: "string" },
        { name: "logo", title: "Logo", type: "image" },
      ] }],
    }),
    defineField({
      name: "impactCta",
      title: "Impact CTA",
      type: "object",
      fields: [
        { name: "lines", title: "Headline lines", type: "array", of: [{ type: "textLine" }], validation: (r: import("sanity").Rule) => r.max(2) },
        { name: "ctaLabel", title: "Button label", type: "string" },
        { name: "ctaHref", title: "Button link", type: "string" },
        { name: "backgroundImage", title: "Background image", type: "image" },
      ],
    }),
    defineField({ name: "testimonialsHeading", title: "Testimonials heading", type: "string" }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [{ type: "testimonialItem" }],
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
