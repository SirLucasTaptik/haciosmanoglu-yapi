import { sanityClient } from "@/lib/sanity/client";
import {
  homepageHeroQuery,
  aboutContentQuery,
  contactInfoQuery,
  projectsByStatusQuery,
  projectBySlugQuery,
} from "@/lib/sanity/queries";
import { mapProjectToCard } from "@/lib/sanity/mappers";
import { urlForImage } from "@/lib/sanity/image";
import { DEFAULT_HERO, DEFAULT_ABOUT, DEFAULT_CONTACT } from "@/lib/data/fallback";
import type { ProjectCardData, ProjectStatus } from "@/types/project";
import type { PortableTextBlock } from "sanity";

export interface HomepageHeroData {
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  backgroundImageUrl: string;
  stats: { label: string; value: string }[];
}

export async function getHomepageHero(): Promise<HomepageHeroData> {
  if (!sanityClient) return DEFAULT_HERO;

  const doc = await sanityClient.fetch(homepageHeroQuery).catch(() => null);
  if (!doc) return DEFAULT_HERO;

  return {
    headline: doc.headline ?? DEFAULT_HERO.headline,
    subheadline: doc.subheadline ?? DEFAULT_HERO.subheadline,
    primaryCtaLabel: doc.primaryCtaLabel ?? DEFAULT_HERO.primaryCtaLabel,
    secondaryCtaLabel: doc.secondaryCtaLabel ?? DEFAULT_HERO.secondaryCtaLabel,
    backgroundImageUrl: doc.backgroundMedia
      ? urlForImage(doc.backgroundMedia).width(1600).height(2000).fit("crop").url()
      : DEFAULT_HERO.backgroundImageUrl,
    stats:
      doc.stats && doc.stats.length > 0
        ? doc.stats.map((s: { label: string; value: string }) => ({ label: s.label, value: s.value }))
        : DEFAULT_HERO.stats,
  };
}

export interface AboutContentData {
  history: PortableTextBlock[] | string;
  mission: string;
  vision: string;
  values: { title: string; description: string }[];
}

export async function getAboutContent(): Promise<AboutContentData> {
  if (!sanityClient) return DEFAULT_ABOUT;

  const doc = await sanityClient.fetch(aboutContentQuery).catch(() => null);
  if (!doc) return DEFAULT_ABOUT;

  return {
    history: doc.history ?? DEFAULT_ABOUT.history,
    mission: doc.mission ?? DEFAULT_ABOUT.mission,
    vision: doc.vision ?? DEFAULT_ABOUT.vision,
    values: doc.values && doc.values.length > 0 ? doc.values : DEFAULT_ABOUT.values,
  };
}

export async function getContactInfo() {
  if (!sanityClient) return DEFAULT_CONTACT;

  const doc = await sanityClient.fetch(contactInfoQuery).catch(() => null);
  if (!doc) return DEFAULT_CONTACT;

  return {
    companyName: doc.companyName ?? DEFAULT_CONTACT.companyName,
    phone: doc.phone ?? DEFAULT_CONTACT.phone,
    phoneHref: doc.phone ? `+${doc.phone.replace(/[^0-9]/g, "")}` : DEFAULT_CONTACT.phoneHref,
    whatsappNumber: doc.whatsappNumber ?? DEFAULT_CONTACT.whatsappNumber,
    email: doc.email ?? DEFAULT_CONTACT.email,
    address: doc.address ?? DEFAULT_CONTACT.address,
  };
}

export async function getProjectsByStatus(status: ProjectStatus): Promise<ProjectCardData[]> {
  if (!sanityClient) return [];

  const docs = await sanityClient.fetch(projectsByStatusQuery, { status }).catch(() => []);
  return (docs ?? []).map(mapProjectToCard);
}

export async function getProjectBySlug(slug: string): Promise<ProjectCardData | null> {
  if (!sanityClient) return null;

  const doc = await sanityClient.fetch(projectBySlugQuery, { slug }).catch(() => null);
  if (!doc) return null;
  return mapProjectToCard(doc);
}
