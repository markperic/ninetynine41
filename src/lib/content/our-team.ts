import { getSingleton } from "@/lib/sanity/singleton";

type RawOurTeam = { heading?: string; subheading?: string };

export async function getOurTeamPageContent() {
  const doc = await getSingleton<RawOurTeam>("ourTeamPage");
  return {
    heading: doc?.heading ?? "Meet Our Team",
    subheading: doc?.subheading ?? "Collaboration is key.",
  };
}
