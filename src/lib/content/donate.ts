import { getSingleton } from "@/lib/sanity/singleton";

type RawDonate = {
  panel?: {
    eyebrow?: string;
    heading?: string;
    headingHighlight?: string;
    heading2?: string;
    intro?: string;
    thankYouLabel?: string;
    legalText1?: string;
    legalText2?: string;
  };
  embedHtml?: string;
  supportCta?: { heading?: string; paragraphs?: string[] };
};

const RAISELY_FRAME_ID = "9941-donate-embed";

const DEFAULT_EMBED_HTML = `<div class="raisely-donate" data-campaign-path="global-development-group-project" data-profile="j9941n-ninetynine41?projectNum=J9941N&projectName=Ninetynine41" data-width="100%" data-height="500">
  <iframe src="https://global-development-group-project.raisely.com/embed/j9941n-ninetynine41?projectNum=J9941N&projectName=Ninetynine41?targethost=https%3A%2F%2Fninetynine41.org&frameId=${RAISELY_FRAME_ID}" data-frame-id="${RAISELY_FRAME_ID}" title="Embedded donation form" allow="payment" width="100%" height="500" style="border:0;display:block"></iframe>
</div>`;

function mapDonate(doc: RawDonate | null) {
  const d = doc ?? {};
  const panel = d.panel ?? {};
  const supportCta = d.supportCta ?? {};

  return {
    panel: {
      eyebrow: panel.eyebrow ?? "Donate Today",
      heading: panel.heading ?? "Your legacy starts here.",
      headingHighlight: panel.headingHighlight ?? "here",
      heading2: panel.heading2 ?? "Ninetynine41.",
      intro:
        panel.intro ??
        "Please use the form below to make your tax deductible donation. Payments are processed directly by Global Development Group.",
      thankYouLabel: panel.thankYouLabel ?? "Thank you",
      legalText1:
        panel.legalText1 ??
        "Ninetynine41 is a partner for Project J9941N with Global Development Group (ABN 57 102 400 993), an Australian NGO approved by the Minister for Foreign Affairs.",
      legalText2:
        panel.legalText2 ??
        "Gifts over $2 are tax deductible in the USA, Australia, and over $5 New Zealand. In the UK, eligible donors can claim Gift Aid. All donations are received subject to GDG's donation and privacy policy (www.gdg.org.au/policy). If excess funds are received, they may be applied to other approved project activities.",
    },
    embedHtml: d.embedHtml ?? DEFAULT_EMBED_HTML,
    supportCta: {
      heading: supportCta.heading ?? "You don't have to be rich to make a difference.",
      paragraphs: supportCta.paragraphs?.length
        ? supportCta.paragraphs
        : [
            "Ever wondered how you can help others when your budget is already tight? Ninetynine41 is your answer.",
            "We have many avenues for donors just like you to lend a hand. Our Giving Legacy begins at $8.25/month.",
            "Perhaps you're a professional who has a skill or time to donate? We'd love to hear from you.",
          ],
    },
  };
}

export async function getDonateContent() {
  const doc = await getSingleton<RawDonate>("donatePage");
  return mapDonate(doc);
}
