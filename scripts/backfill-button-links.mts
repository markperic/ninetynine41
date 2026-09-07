/**
 * One-off backfill: adds the new button-link (ctaHref/linkHref/trustCtas)
 * fields to Sanity documents that were created before those fields existed
 * in the schema. Uses setIfMissing so it never overwrites a value Mark has
 * already edited in Studio — safe to rerun.
 *
 *   npx tsx scripts/backfill-button-links.mts
 */
import { createClient } from "@sanity/client";
import { config } from "dotenv";

config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function run() {
  console.log("Backfilling homePage...");
  await client
    .patch("homePage")
    .setIfMissing({
      "hero.ctaHref": "/about",
      "impactCta.ctaHref": "/contact",
      trustCtas: {
        primaryLabel: "Current Projects",
        primaryHref: "/projects",
        secondaryLabel: "What We Do",
        secondaryHref: "/what-we-do",
      },
    })
    .commit();

  console.log("Backfilling aboutPage...");
  await client
    .patch("aboutPage")
    .setIfMissing({ "hero.ctaHref": "#stats", "supportCta.linkHref": "/what-we-do" })
    .commit();

  console.log("Backfilling whatWeDoPage...");
  await client
    .patch("whatWeDoPage")
    .setIfMissing({ "hero.ctaHref": "#how-we-work", "ctaBanner.ctaHref": "/donate" })
    .commit();

  console.log("Backfilling offlinePage...");
  await client.patch("offlinePage").setIfMissing({ "hero.ctaHref": "#register" }).commit();

  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
