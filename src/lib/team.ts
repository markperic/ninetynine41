import type { Image } from "sanity";
import { sanityClient } from "@/lib/sanity/client";
import { TEAM_MEMBERS_QUERY } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";

export type TeamMember = {
  name: string;
  role: string;
  photo: string | null;
};

type TeamMemberDoc = {
  name: string;
  role: string;
  photo: Image | null;
};

export async function getTeamMembers(): Promise<TeamMember[]> {
  const docs = await sanityClient.fetch<TeamMemberDoc[]>(TEAM_MEMBERS_QUERY);
  return docs.map((doc) => ({
    name: doc.name,
    role: doc.role,
    photo: doc.photo ? urlForImage(doc.photo).width(224).height(224).url() : null,
  }));
}
