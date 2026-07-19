import { Resend } from "resend";
import type { ContactFormValues } from "@/lib/validation/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

// Eğer domain doğrulandıysa bunu kullan:
// const FROM_ADDRESS = "Hacıosmanoğlu Yapı <noreply@haciosmanogluyapi.com>";

// Şimdilik bunu bırakabilirsin:
const FROM_ADDRESS = "Hacıosmanoğlu Yapı Web Sitesi <onboarding@resend.dev>";

export async function sendContactEmail(
  data: Omit<ContactFormValues, "company">
) {
  const recipient = process.env.CONTACT_FORM_RECIPIENT;

  if (!recipient) {
    throw new Error("CONTACT_FORM_RECIPIENT is not set.");
  }

  const { name, phone, email, message } = data;

  const result = await resend.emails.send({
    from: FROM_ADDRESS,
    to: recipient,
    replyTo: email,
    subject: `Yeni İletişim Formu — ${name}`,
    text: `
Ad Soyad: ${name}
Telefon: ${phone}
E-posta: ${email}

Mesaj:
${message}
`,
    html: `
      <div style="font-family:sans-serif">
        <h2>Yeni İletişim Formu</h2>

        <p><strong>Ad Soyad:</strong> ${escapeHtml(name)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
        <p><strong>E-posta:</strong> ${escapeHtml(email)}</p>

        <hr>

        <p>${escapeHtml(message)}</p>
      </div>
    `,
  });

  console.log("========== RESEND ==========");
  console.log(result);
  console.log("============================");

  if (result.error) {
    throw new Error(JSON.stringify(result.error));
  }

  return result;
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
