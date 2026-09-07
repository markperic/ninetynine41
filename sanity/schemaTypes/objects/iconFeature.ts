import { defineField, defineType } from "sanity";

const ICONS = [
  "HelpCircle",
  "Handshake",
  "Link2",
  "Target",
  "Users",
  "Globe2",
  "HeartHandshake",
  "Repeat",
] as const;

/** Icon + title + body used by the feature-grid style sections across several pages. */
export const iconFeature = defineType({
  name: "iconFeature",
  title: "Feature",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: [...ICONS] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "eyebrow", title: "Eyebrow (optional, e.g. \"Why\")", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "title", subtitle: "icon" } },
});

export const ICON_NAMES = ICONS;
