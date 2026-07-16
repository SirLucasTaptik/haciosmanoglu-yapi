import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Ad Soyad en az 2 karakter olmalı."),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\s()-]{10,}$/, "Geçerli bir telefon numarası girin."),
  email: z.string().trim().email("Geçerli bir e-posta girin."),
  message: z.string().trim().min(10, "Mesajınız en az 10 karakter olmalı."),
  // Honeypot field: real users never see or fill this (visually hidden).
  // Any non-empty value here means the submission came from a bot.
  company: z.string().max(0, "Spam tespit edildi.").optional().default(""),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
