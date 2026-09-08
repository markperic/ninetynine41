import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

// Resend requires a verified sending domain — ninetynine41.org is set up for
// this (see the "send" subdomain SPF/DKIM records), so mail sends from the
// apex domain itself.
export const FORM_FROM_EMAIL = "Ninetynine41 Website <noreply@ninetynine41.org>";
