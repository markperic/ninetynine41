import { defineField, defineType } from "sanity";

export const testimonialItem = defineType({
  name: "testimonialItem",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role (optional)", type: "string" }),
    defineField({ name: "photo", title: "Photo", type: "image" }),
  ],
  preview: { select: { title: "name", subtitle: "quote" } },
});
