import type { PortableTextBlock } from "@portabletext/react";
import type { Image } from "sanity";
import { sanityClient } from "@/lib/sanity/client";
import { PROJECTS_QUERY, PROJECT_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";

export type Project = {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  excerpt: string;
  body: PortableTextBlock[];
  image: string;
  imageAlt: string;
};

type ProjectDoc = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: PortableTextBlock[] | null;
  image: Image;
  imageAlt: string;
};

function toProject(doc: ProjectDoc): Project {
  return {
    slug: doc.slug,
    title: doc.title,
    date: doc.date,
    displayDate: new Date(doc.date).toLocaleDateString("en-AU", { year: "numeric", month: "short", day: "numeric" }),
    excerpt: doc.excerpt,
    body: doc.body ?? [],
    image: urlForImage(doc.image).width(1600).url(),
    imageAlt: doc.imageAlt,
  };
}

export async function getAllProjects(): Promise<Project[]> {
  const docs = await sanityClient.fetch<ProjectDoc[]>(PROJECTS_QUERY);
  return docs.map(toProject);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const doc = await sanityClient.fetch<ProjectDoc | null>(PROJECT_BY_SLUG_QUERY, { slug });
  return doc ? toProject(doc) : undefined;
}
