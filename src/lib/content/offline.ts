import type { Image as SanityImage } from "sanity";
import { getSingleton } from "@/lib/sanity/singleton";
import { resolveImage } from "@/lib/content/image";

type RawOffline = {
  hero?: {
    backgroundImage?: SanityImage;
    logo?: SanityImage;
    headline?: string;
    highlightWords?: string[];
    subcopy1?: string;
    subcopy2?: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
  intro?: { heading?: string; heading2?: string; paragraphs?: string[] };
  registerForm?: { heading?: string; formHeading?: string; registrationTypes?: string[]; states?: string[] };
};

function mapOffline(doc: RawOffline | null) {
  const d = doc ?? {};
  const hero = d.hero ?? {};
  const intro = d.intro ?? {};
  const registerForm = d.registerForm ?? {};

  return {
    hero: {
      backgroundImage: resolveImage(hero.backgroundImage, "/images/offlinehero-web.jpg"),
      logo: resolveImage(hero.logo, "/images/offline99-logo-stacked@2x.png"),
      headline: hero.headline ?? "OFFLINEFOR99",
      highlightWords: hero.highlightWords ?? ["99"],
      subcopy1: hero.subcopy1 ?? "Caught on the dreaded doomscroll? Get offline to get switched on.",
      subcopy2:
        hero.subcopy2 ??
        "Get offline for 99 minutes and feel alive. No catch. Your ONE life is waiting for you.",
      ctaLabel: hero.ctaLabel ?? "I Want In",
      ctaHref: hero.ctaHref ?? "#register",
    },
    intro: {
      heading: intro.heading ?? "Feeling tired & bored of your phone?",
      heading2: intro.heading2 ?? "Yup. Us too.",
      paragraphs: intro.paragraphs?.length
        ? intro.paragraphs
        : [
            "We want to FEEL more. Actually LIVE our life.",
            "Enter OFFLINEFOR99.",
            "OFFLINEFOR99 is an initiative where you put the phone down, jump offline for 99 minutes, feel alive and help those around the world who need it most. Get your friends and family involved — a group of mates doing the challenge together, raising money for communities who really need it, and feeling good doing it. Register your interest below to be the first to find out how to get OFFLINEFOR99 in your school, church or organisation.",
          ],
    },
    registerForm: {
      heading: registerForm.heading ?? "I Want In",
      formHeading: registerForm.formHeading ?? "Register Your Interest",
      registrationTypes: registerForm.registrationTypes?.length
        ? registerForm.registrationTypes
        : ["Individual", "School", "Church", "Organisation"],
      states: registerForm.states?.length ? registerForm.states : ["QLD", "NSW", "VIC", "ACT", "SA", "WA", "NT", "TAS"],
    },
  };
}

export async function getOfflineContent() {
  const doc = await getSingleton<RawOffline>("offlinePage");
  return mapOffline(doc);
}
