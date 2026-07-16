import { urlForImage } from "@/lib/sanity/image";
import type { ProjectCardData, ProjectStatus } from "@/types/project";
import type { PortableTextBlock } from "sanity";

interface RawImage {
  asset?: { _ref?: string };
  alt?: string;
}

interface RawProject {
  _id: string;
  title: string;
  slug: string;
  status: ProjectStatus;
  district: string;
  progressPercentage?: number;
  description?: PortableTextBlock[];
  heroImage?: RawImage;
  gallery?: RawImage[];
  featured?: boolean;
}

const FALLBACK_IMAGE = "https://picsum.photos/seed/hy-placeholder/800/600";

function imageUrl(image?: RawImage, width = 800, height = 600) {
  if (!image?.asset) return FALLBACK_IMAGE;
  try {
    return urlForImage(image).width(width).height(height).fit("crop").url();
  } catch {
    return FALLBACK_IMAGE;
  }
}

export function mapProjectToCard(raw: RawProject): ProjectCardData {
  return {
    id: raw._id,
    title: raw.title,
    slug: raw.slug,
    status: raw.status,
    district: raw.district,
    progressPercentage: raw.progressPercentage ?? (raw.status === "completed" ? 100 : 0),
    heroImageUrl: imageUrl(raw.heroImage),
    galleryUrls: (raw.gallery ?? []).map((img) => imageUrl(img, 1200, 900)),
    description: raw.description ?? [],
    featured: raw.featured,
  };
}
