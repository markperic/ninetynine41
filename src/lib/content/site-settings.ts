import { getSingleton } from "@/lib/sanity/singleton";

export type SiteSettings = {
  email: string;
  location: string;
  facebookUrl: string;
  instagramUrl: string;
  footerTagline: string;
  footerDescription: string;
};

const DEFAULTS: SiteSettings = {
  email: "info@ninetynine41.org",
  location: "Brisbane, Australia",
  facebookUrl: "https://www.facebook.com/profile.php?id=61574110970003",
  instagramUrl: "https://www.instagram.com/ninety_nine4one/",
  footerTagline: "Hope loading…",
  footerDescription:
    "We are an action-focused charity bringing hope and dignity to those who need it most. Ninetynine41 is a registered ACNC charity.",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const doc = await getSingleton<Partial<SiteSettings>>("siteSettings");
  return { ...DEFAULTS, ...doc };
}
