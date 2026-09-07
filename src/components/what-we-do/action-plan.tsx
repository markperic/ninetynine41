import { getWhatWeDoContent } from "@/lib/content/what-we-do";
import { ActionPlanClient } from "./action-plan-client";

export async function ActionPlan() {
  const { actionPlan } = await getWhatWeDoContent();
  return <ActionPlanClient {...actionPlan} />;
}
