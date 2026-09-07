import { getSiteSettings } from "@/lib/content/site-settings";
import { SiteHeaderClient } from "./site-header-client";

export async function SiteHeader({ light = false }: { light?: boolean }) {
  const { facebookUrl, instagramUrl } = await getSiteSettings();
  return <SiteHeaderClient light={light} facebookUrl={facebookUrl} instagramUrl={instagramUrl} />;
}
