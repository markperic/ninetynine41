import { NextResponse } from "next/server";
import { resend, FORM_FROM_EMAIL } from "@/lib/resend";
import { getSiteSettings } from "@/lib/content/site-settings";

export async function POST(request: Request) {
  const { name, email, phone, organisation, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const { email: to } = await getSiteSettings();

  const { error } = await resend.emails.send({
    from: FORM_FROM_EMAIL,
    to,
    replyTo: email,
    subject: `New contact form message from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      organisation ? `Organisation: ${organisation}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
