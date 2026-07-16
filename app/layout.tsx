import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { getContactInfo } from "@/lib/sanity/content";

// One neutral sans for everything — headlines included — at a wide weight
// range so heavy display type and light body copy share the same face.
// This is the Apple typographic approach: no separate display serif.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Utility face — for stats, dates, progress percentages: technical precision.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://haciosmanoglu-yapi.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hacıosmanoğlu Yapı | Bakırköy Kentsel Dönüşüm",
    template: "%s | Hacıosmanoğlu Yapı",
  },
  description:
    "Bakırköy ve İstanbul genelinde güvenilir kentsel dönüşüm ve inşaat hizmetleri sunan Hacıosmanoğlu Yapı.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "Hacıosmanoğlu Yapı",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const contact = await getContactInfo();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: contact.companyName,
    image: `${siteUrl}/logo.jpeg`,
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: "Bakırköy",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
    url: siteUrl,
  };

  return (
    <html lang="tr" className={`${inter.variable} ${plexMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header companyName={contact.companyName} phone={contact.phone} phoneHref={contact.phoneHref} />
        <main className="pb-24 md:pb-0">{children}</main>
        <WhatsAppButton />
        <MobileBottomNav />
      </body>
    </html>
  );
}
