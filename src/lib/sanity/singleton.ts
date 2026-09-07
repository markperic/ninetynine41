import { sanityClient } from "./client";

export async function getSingleton<T>(id: string): Promise<T | null> {
  return sanityClient.fetch<T | null>(`*[_id == $id][0]`, { id });
}
