import { project } from "./project";
import { teamMember } from "./teamMember";
import { siteSettings } from "./siteSettings";
import { heroBasic } from "./objects/heroBasic";
import { textLine } from "./objects/textLine";
import { iconFeature } from "./objects/iconFeature";
import { testimonialItem } from "./objects/testimonialItem";
import { homePage } from "./pages/homePage";
import { aboutPage } from "./pages/aboutPage";
import { whatWeDoPage } from "./pages/whatWeDoPage";
import { offlinePage } from "./pages/offlinePage";
import { donatePage } from "./pages/donatePage";
import { churchesPage } from "./pages/churchesPage";
import { contactPage } from "./pages/contactPage";
import { ourTeamPage } from "./pages/ourTeamPage";
import { projectsPage } from "./pages/projectsPage";

export const schemaTypes = [
  // documents
  project,
  teamMember,
  siteSettings,
  homePage,
  aboutPage,
  whatWeDoPage,
  offlinePage,
  donatePage,
  churchesPage,
  contactPage,
  ourTeamPage,
  projectsPage,
  // reusable objects
  heroBasic,
  textLine,
  iconFeature,
  testimonialItem,
];

export const SINGLETON_TYPES = new Set([
  "siteSettings",
  "homePage",
  "aboutPage",
  "whatWeDoPage",
  "offlinePage",
  "donatePage",
  "churchesPage",
  "contactPage",
  "ourTeamPage",
  "projectsPage",
]);
