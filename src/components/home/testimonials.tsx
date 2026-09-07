import { getHomeContent } from "@/lib/content/home";
import { TestimonialsClient } from "./testimonials-client";

/**
 * Testimonials — horizontal autoplay carousel, one card at a time sliding
 * via transform. Content is editable via Sanity; the carousel state lives
 * in testimonials-client.tsx since it needs client-side interactivity.
 */
export async function Testimonials() {
  const { testimonialsHeading, testimonials } = await getHomeContent();
  return <TestimonialsClient heading={testimonialsHeading} testimonials={testimonials} />;
}
