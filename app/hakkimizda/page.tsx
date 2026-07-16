import type { Metadata } from "next";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RichText } from "@/components/ui/RichText";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Footer } from "@/components/layout/Footer";
import { getAboutContent } from "@/lib/sanity/content";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Hacıosmanoğlu Yapı'nın hikayesi, misyonu, vizyonu ve değerleri.",
  alternates: { canonical: "/hakkimizda" },
};

export default async function AboutPage() {
  const about = await getAboutContent();
  const historyIsRichText = Array.isArray(about.history);

  return (
    <div className="bg-canvas">
      <div className="container-page pb-10 pt-24 md:pt-32">
        <Breadcrumbs items={[{ label: "Ana Sayfa", href: "/" }, { label: "Hakkımızda" }]} />
        <div className="mt-6 max-w-2xl">
          <SectionEyebrow>Hakkımızda</SectionEyebrow>
          <h1 className="font-display text-display-lg text-ink">Hikayemiz.</h1>
          <div className="mt-6">
            {historyIsRichText ? (
              <RichText value={about.history as never} />
            ) : (
              <p className="text-base leading-relaxed text-inkMuted">{about.history as string}</p>
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-canvasAlt p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Misyon</p>
            <p className="mt-3 text-sm leading-relaxed text-inkMuted">{about.mission}</p>
          </div>
          <div className="rounded-3xl bg-canvasAlt p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Vizyon</p>
            <p className="mt-3 text-sm leading-relaxed text-inkMuted">{about.vision}</p>
          </div>
        </div>

        <h2 className="mt-16 font-display text-display-md text-ink">Değerlerimiz.</h2>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {about.values.map((v) => (
            <div key={v.title}>
              <p className="font-semibold text-gold">{v.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-inkMuted">{v.description}</p>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
}
