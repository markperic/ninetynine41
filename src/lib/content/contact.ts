import { getSingleton } from "@/lib/sanity/singleton";

type RawContact = { heading?: string; description?: string };

export async function getContactContent() {
  const doc = await getSingleton<RawContact>("contactPage");
  return {
    heading: doc?.heading ?? "Contact Ninetynine41",
    description:
      doc?.description ??
      "We'd love to hear from you. Please fill in the form below and we will respond within 48 hours. We read every message.",
  };
}
