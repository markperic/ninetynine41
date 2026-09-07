import { getContactContent } from "@/lib/content/contact";
import { getSiteSettings } from "@/lib/content/site-settings";
import { ContactFormClient } from "./contact-form-client";

export async function ContactForm() {
  const [{ heading, description }, { location, email }] = await Promise.all([getContactContent(), getSiteSettings()]);
  return (
    <ContactFormClient
      heading={heading}
      description={description}
      info={[
        { label: "Office", value: location },
        { label: "Email", value: email },
      ]}
    />
  );
}
