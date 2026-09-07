import { defineField, defineType } from "sanity";

export const ourTeamPage = defineType({
  name: "ourTeamPage",
  title: "Our Team Page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "subheading", title: "Subheading", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Our Team Page" }) },
});
