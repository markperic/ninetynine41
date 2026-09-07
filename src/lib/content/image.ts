import type { Image as SanityImage } from "sanity";
import { urlForImage } from "@/lib/sanity/image";

/** Resolves a Sanity image field to a URL, or falls back to a local default while content hasn't been set yet. */
export function resolveImage(raw: SanityImage | null | undefined, fallback: string, width?: number, height?: number): string {
  if (!raw?.asset) return fallback;
  let builder = urlForImage(raw).width(width ?? 1600);
  if (height) builder = builder.height(height);
  return builder.url();
}
