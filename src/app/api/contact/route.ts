import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "yucedagh1@gmail.com";

const reasonLabels: Record<string, { de: string; en: string }> = {
  job: { de: "Stelle / Recruiting", en: "Hiring / role" },
  project: { de: "Projektanfrage", en: "Project inquiry" },
  other: { de: "Sonstiges", en: "Other" },
};

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(params: {
  name: string;
  email: string;
  company: string;
  reasonLabel: string;
  message: string;
  locale: string;
}) {
  const { name, email, company, reasonLabel, message, locale } = params;
  const lines = [
    `<strong>Name:</strong> ${escapeHtml(name)}`,
    `<strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`,
    company ? `<strong>Company:</strong> ${escapeHtml(company)}` : null,
    `<strong>Reason:</strong> ${escapeHtml(reasonLabel)}`,
    `<strong>Locale:</strong> ${escapeHtml(locale)}`,
  ].filter(Boolean);

  return `
<!doctype html>
<html>
  <body style="font-family: -apple-system, Segoe UI, sans-serif; color: #0f172a; line-height: 1.55;">
    <h2 style="margin: 0 0 16px;">Neue Anfrage über das Portfolio</h2>
    <table style="border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
      ${lines.map((line) => `<tr><td style="padding: 4px 0;">${line}</td></tr>`).join("")}
    </table>
    <h3 style="margin: 0 0 8px; font-size: 14px;">Nachricht</h3>
    <div style="white-space: pre-wrap; padding: 12px 14px; background: #f1f5f9; border-radius: 8px; font-size: 14px;">${escapeHtml(message)}</div>
    <p style="margin: 24px 0 0; font-size: 12px; color: #64748b;">Gesendet via hasanyucedagportfolio.vercel.app · ${new Date().toISOString()}</p>
  </body>
</html>
  `.trim();
}

function buildText(params: {
  name: string;
  email: string;
  company: string;
  reasonLabel: string;
  message: string;
  locale: string;
}) {
  const { name, email, company, reasonLabel, message, locale } = params;
  return [
    "Neue Anfrage über das Portfolio",
    "",
    `Name:    ${name}`,
    `Email:   ${email}`,
    company ? `Company: ${company}` : null,
    `Reason:  ${reasonLabel}`,
    `Locale:  ${locale}`,
    "",
    "Nachricht:",
    message,
    "",
    `Gesendet: ${new Date().toISOString()}`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { name, email, company, reason, message, website } = parsed.data;
  const locale = (body as { locale?: string })?.locale === "en" ? "en" : "de";

  // Honeypot — silently accept but do not send
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const resend = new Resend(RESEND_API_KEY);
  const reasonLabel = reasonLabels[reason]?.[locale as "de" | "en"] ?? reason;
  const subject = `[Portfolio] ${reasonLabel} — ${name}`;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      html: buildHtml({
        name,
        email,
        company: company ?? "",
        reasonLabel,
        message,
        locale,
      }),
      text: buildText({
        name,
        email,
        company: company ?? "",
        reasonLabel,
        message,
        locale,
      }),
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json({ error: "Email send failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: result.data?.id });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
