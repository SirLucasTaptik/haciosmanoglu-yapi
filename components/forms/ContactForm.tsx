"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { contactFormSchema } from "@/lib/validation/contact";

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
  company: string; // honeypot — must stay empty; hidden from real users via CSS
}

const initialState: FormState = { name: "", phone: "", email: "", message: "", company: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = () => {
    const result = contactFormSchema.safeParse(form);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors = result.error.flatten().fieldErrors;
    setErrors({
      name: fieldErrors.name?.[0],
      phone: fieldErrors.phone?.[0],
      email: fieldErrors.email?.[0],
      message: fieldErrors.message?.[0],
    });
    return false;
  };

  const handleSubmit = async () => {
    setServerError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error ?? "Bir şeyler ters gitti. Lütfen tekrar deneyin.");
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError("Bağlantı hatası. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const field = (
    key: keyof Omit<FormState, "company">,
    label: string,
    inputProps: React.InputHTMLAttributes<HTMLInputElement> = {}
  ) => (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-inkMuted">{label}</label>
      <input
        {...inputProps}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        className="w-full rounded-xl bg-canvasAlt px-4 py-3 text-sm text-ink outline-none"
        style={{ border: `1px solid ${errors[key] ? "#c0392b" : "rgba(0,0,0,0.12)"}` }}
      />
      {errors[key] && <p className="mt-1 text-xs text-[#e07a6b]">{errors[key]}</p>}
    </div>
  );

  if (submitted) {
    return (
      <div className="fade-up flex flex-col items-center gap-3 rounded-2xl bg-canvasAlt py-12 text-center">
        <CheckCircle2 size={32} className="text-gold" />
        <p className="font-semibold text-ink">Mesajınız alındı</p>
        <p className="max-w-[280px] text-sm text-inkMuted">
          En kısa sürede sizinle iletişime geçeceğiz.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm(initialState);
          }}
          className="mt-2 text-sm font-medium text-gold"
        >
          Yeni mesaj gönder
        </button>
      </div>
    );
  }

  return (
    <div className="flex max-w-lg flex-col gap-4">
      {field("name", "Ad Soyad")}
      {field("phone", "Telefon", { type: "tel", placeholder: "0533 000 00 00" })}
      {field("email", "E-posta", { type: "email", placeholder: "ornek@eposta.com" })}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-inkMuted">Mesaj</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full rounded-xl bg-canvasAlt px-4 py-3 text-sm text-ink outline-none"
          style={{ border: `1px solid ${errors.message ? "#c0392b" : "rgba(0,0,0,0.12)"}` }}
        />
        {errors.message && <p className="mt-1 text-xs text-[#e07a6b]">{errors.message}</p>}
      </div>

      {/* Honeypot — visually and semantically hidden from real users/screen readers */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="company">Şirket</label>
        <input
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
        />
      </div>

      {serverError && (
        <div className="flex items-start gap-2 rounded-xl border border-[#c0392b]/40 bg-[#c0392b]/10 p-3 text-sm text-[#e07a6b]">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="mt-2 w-full rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-obsidian transition-transform active:scale-95 disabled:opacity-60"
      >
        {isSubmitting ? "Gönderiliyor..." : "Gönder"}
      </button>
    </div>
  );
}
