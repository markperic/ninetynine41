import { NextResponse } from "next/server";
import { resend, FORM_FROM_EMAIL } from "@/lib/resend";
import { getSiteSettings } from "@/lib/content/site-settings";

export async function POST(request: Request) {
  const { name, email, phone, registrationType, state, message } = await request.json();

  if (!name || !email || !registrationType || !state) {
    return NextResponse.json(
      { error: "Name, email, registration type, and state are required." },
      { status: 400 },
    );
  }

  const { email: to } = await getSiteSettings();

  const { error } = await resend.emails.send({
    from: FORM_FROM_EMAIL,
    to,
    replyTo: email,
    subject: `New Offline for 99 registration from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Registration type: ${registrationType}`,
      `State: ${state}`,
      message ? `\n${message}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send registration." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
