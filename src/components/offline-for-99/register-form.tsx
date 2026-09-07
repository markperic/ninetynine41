import { getOfflineContent } from "@/lib/content/offline";
import { OfflineFor99RegisterFormClient } from "./register-form-client";

export async function OfflineFor99RegisterForm() {
  const { registerForm } = await getOfflineContent();
  return <OfflineFor99RegisterFormClient {...registerForm} />;
}
