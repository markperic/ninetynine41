import { cache } from "react";
import { medusa } from "./client";

/** The Australia/AUD region — memoized per request since every product page needs it for pricing. */
export const getAustraliaRegion = cache(async () => {
  const { regions } = await medusa.store.region.list();
  const region = regions.find((r: { countries?: { iso_2?: string }[] }) => r.countries?.some((c) => c.iso_2 === "au"));
  if (!region) throw new Error("No Australia region configured in Medusa.");
  return region;
});
