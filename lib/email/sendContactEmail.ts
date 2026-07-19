import { Resend } from "resend";
import type { ContactFormValues } from "@/lib/validation/contact";

const FROM_ADDRESS = "Hacıosmanoğlu Yapı Web Sitesi <onboarding@resend.dev>";
// NOTE: swap FROM_ADDRESS to a verified domain sender (e.g. no-reply@haciosmanoglu-yapi.com)
// once the sending domain is verified in the Resend dashboard. Until then,
// Resend's shared onboarding@resend.dev sender works for testing.

export async function sendContactEmail(data: Omit<ContactFormValues, "company">) {
  const recipient = process.env.CONTACT_FORM_RECIPIENT;
  if (!recipient) {
    throw new Error(
      "CONTACT_FORM_RECIPIENT is not set — see .env.example."
    );
  }

  // Instantiated here (not at module scope) so a missing RESEND_API_KEY only
  // surfaces when someone actually submits the form — not as a build-time
  // crash that would take down the whole deploy before Resend is configured.
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set — see .env.example.");
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { name, phone, email, message } = data;

  return resend.emails.send({
    from: FROM_ADDRESS,
    to: recipient,
    replyTo: email,
    subject: `Yeni İletişim Formu — ${name}`,
    text: [
      `Ad Soyad: ${name}`,
      `Telefon: ${phone}`,
      `E-posta: ${email}`,
      "",
      "Mesaj:",
      message,
    ].join("\n"),
    html: `
      <div style="font-family: sans-serif; max-width: 480px;">
        <h2 style="margin-bottom: 4px;">Yeni İletişim Formu</h2>
        <p style="color:#555; margin-top: 0;">Hacıosmanoğlu Yapı web sitesi</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 4px 0; color:#888;">Ad Soyad</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 4px 0; color:#888;">Telefon</td><td>${escapeHtml(phone)}</td></tr>
          <tr><td style="padding: 4px 0; color:#888;">E-posta</td><td>${escapeHtml(email)}</td></tr>
        </table>
        <p style="margin-top: 16px; white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    `,
  });
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
