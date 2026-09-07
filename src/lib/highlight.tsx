import { Fragment } from "react";

/**
 * Splits `text` on any of `words` (case-insensitive, first match per word)
 * and wraps each match in a colored span — lets Sanity content editors move
 * or reword the emphasis without touching a component. Defaults to the
 * brand-orange every hero/heading uses; pass `colorClassName` on an
 * orange-background section (e.g. the Donate panel) where orange-on-orange
 * would be invisible.
 */
export function renderHighlighted(text: string, words: string[] = [], colorClassName = "text-brand-orange") {
  const targets = words.filter(Boolean);
  if (targets.length === 0) return text;

  const pattern = new RegExp(`(${targets.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, i) =>
    targets.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
      <span key={i} className={colorClassName}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
