import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "email", title: "Contact email", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location", type: "string", validation: (r) => r.required() }),
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "footerTagline", title: "Footer tagline", type: "string" }),
    defineField({ name: "footerDescription", title: "Footer description", type: "text", rows: 3 }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
