import { MessageCircle } from "lucide-react";
import { getContactInfo } from "@/lib/sanity/content";

export async function WhatsAppButton() {
  const contact = await getContactInfo();

  return (
    <a
      href={`https://wa.me/${contact.whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[84px] right-4 z-40 flex items-center justify-center rounded-full shadow-lg md:bottom-6"
      style={{ width: 52, height: 52, background: "#25D366" }}
      aria-label="WhatsApp'tan yazın"
    >
      <MessageCircle size={24} color="#fff" fill="#fff" />
    </a>
  );
}
