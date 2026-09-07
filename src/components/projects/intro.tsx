import { getProjectsPageContent } from "@/lib/content/projects-page";
import { ProjectsIntroClient } from "./intro-client";

export async function ProjectsIntro() {
  const { intro } = await getProjectsPageContent();
  return <ProjectsIntroClient {...intro} />;
}
