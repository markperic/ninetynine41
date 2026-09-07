import { HelpCircle, Handshake, Link2, Target, Users, Globe2, HeartHandshake, Repeat, type LucideIcon } from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  HelpCircle,
  Handshake,
  Link2,
  Target,
  Users,
  Globe2,
  HeartHandshake,
  Repeat,
};

export function getIcon(name: string): LucideIcon {
  return ICONS[name] ?? HelpCircle;
}
