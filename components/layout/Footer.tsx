import { getContactInfo } from "@/lib/sanity/content";

export async function Footer() {
  const contact = await getContactInfo();

  return (
    <footer className="container-page mt-14 border-t border-black/8 py-10 text-center">
      <p className="font-display text-lg font-semibold text-ink">{contact.companyName}</p>
      <p className="mt-2 text-xs text-inkMuted">{contact.address}</p>
      <p className="mt-1 text-xs text-inkMuted">
        {contact.phone} · {contact.email}
      </p>
      <p className="mt-4 font-mono text-[10px] text-inkMuted/70">
        © {new Date().getFullYear()} {contact.companyName} — Tüm hakları saklıdır.
      </p>
    </footer>
  );
}
