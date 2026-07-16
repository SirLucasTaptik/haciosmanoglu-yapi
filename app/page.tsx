import Image from "next/image";
import { SkylineBars } from "@/components/ui/SkylineBars";
import { Button } from "@/components/ui/Button";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, Clock3, Eye, Users, MapPin } from "lucide-react";
import { WHY_US, PROCESS_STEPS } from "@/lib/data/staticContent";
import { getHomepageHero, getContactInfo } from "@/lib/sanity/content";

const WHY_US_ICONS = [ShieldCheck, Clock3, Eye, Users] as const;

export default async function HomePage() {
  const [hero, contact] = await Promise.all([getHomepageHero(), getContactInfo()]);

  return (
    <div>
      {/* Hero — full-bleed image, huge centered sans headline, generous negative space */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-32 text-center md:min-h-[85vh]">
        <Image
          src={hero.backgroundImageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: "grayscale(35%) brightness(0.5)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.35) 60%, rgba(10,10,10,0.75) 100%)",
          }}
        />
        <div className="relative z-10 flex max-w-3xl flex-col items-center fade-up">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-gold">
            Kentsel Dönüşüm
          </p>
          <h1 className="font-display text-display-xl leading-[1.02] tracking-tight text-porcelain">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-md text-lg text-porcelain/80">{hero.subheadline}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/iletisim">{hero.primaryCtaLabel}</Button>
            <Button href="/projeler?status=ongoing" variant="outline">
              {hero.secondaryCtaLabel}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats — signature skyline motif, on the primary light canvas */}
      <FadeInSection className="bg-canvas py-24">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {hero.stats.map((s, i) => (
              <div key={s.label} className="fade-up text-center md:text-left" style={{ animationDelay: `${i * 90}ms` }}>
                <div className="mx-auto md:mx-0">
                  <SkylineBars compact />
                </div>
                <p className="mt-4 font-display text-4xl font-bold tracking-tight text-ink">{s.value}</p>
                <p className="mt-1 text-sm text-inkMuted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Why us — alternating light-grey section, Apple's classic rhythm */}
      <FadeInSection className="bg-canvasAlt py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-gold">Neden Biz</p>
            <h2 className="font-display text-display-md text-ink">Süreci güvenle yönetiyoruz.</h2>
          </div>
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2">
            {WHY_US.map((item, i) => {
              const Icon = WHY_US_ICONS[i]!;
              return (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-inkMuted">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </FadeInSection>

      {/* Process — a real sequence, numbering is justified here */}
      <FadeInSection className="bg-canvas py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-gold">Süreç</p>
            <h2 className="font-display text-display-md text-ink">Kentsel dönüşüm adımları.</h2>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
            {PROCESS_STEPS.map((p) => (
              <div key={p.step}>
                <p className="font-display text-3xl font-bold text-gold">{p.step}</p>
                <p className="mt-3 font-semibold text-ink">{p.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-inkMuted">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Map */}
      <FadeInSection className="bg-canvasAlt py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-gold">Konum</p>
            <h2 className="font-display text-display-md text-ink">Bizi ziyaret edin.</h2>
          </div>
          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl bg-white shadow-sm md:grid md:grid-cols-2">
            <iframe
              title="Hacıosmanoğlu Yapı Konum"
              src={`https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`}
              className="h-56 w-full md:h-full"
              style={{ border: 0 }}
              loading="lazy"
            />
            <div className="flex items-start gap-3 p-6">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
              <p className="text-sm text-inkMuted">{contact.address}</p>
            </div>
          </div>
        </div>
      </FadeInSection>

      <Footer />
    </div>
  );
}
