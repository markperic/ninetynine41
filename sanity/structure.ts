import type { StructureResolver } from "sanity/structure";
import { SINGLETON_TYPES } from "./schemaTypes";

const SINGLETON_LABELS: Record<string, string> = {
  siteSettings: "Site Settings",
  homePage: "Home Page",
  aboutPage: "About Page",
  whatWeDoPage: "What We Do Page",
  offlinePage: "OFFLINEFOR99 Page",
  donatePage: "Donate Page",
  churchesPage: "Churches Page",
  contactPage: "Contact Page",
  ourTeamPage: "Our Team Page",
  projectsPage: "Projects Page",
};

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...Object.entries(SINGLETON_LABELS).map(([type, title]) =>
        S.listItem()
          .id(type)
          .title(title)
          .child(S.document().schemaType(type).documentId(type)),
      ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() && !SINGLETON_TYPES.has(item.getId()!)),
    ]);
