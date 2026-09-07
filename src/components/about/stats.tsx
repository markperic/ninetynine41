import { getAboutContent } from "@/lib/content/about";
import { AboutStatsClient } from "./stats-client";

export async function AboutStats() {
  const { stats } = await getAboutContent();

  return (
    <AboutStatsClient
      columns={[
        {
          align: "left",
          stats: [
            { figure: stats.column1Stat1Figure, note: stats.column1Stat1Note },
            { figure: stats.column1Stat2Figure, note: stats.column1Stat2Note },
          ],
        },
        {
          align: "right",
          stats: [
            { figure: stats.column2Stat1Figure, note: stats.column2Stat1Note },
            { figure: stats.column2Stat2Figure, note: stats.column2Stat2Note },
          ],
        },
      ]}
      backdrops={[
        { src: stats.backdrop1, alt: "Illuminated world map showing global connections" },
        { src: stats.backdrop2, alt: "Ninetynine41 community project" },
      ]}
      scenes={[stats.scene1Text, stats.scene2Text]}
      footerLabel={stats.footerLabel}
    />
  );
}
