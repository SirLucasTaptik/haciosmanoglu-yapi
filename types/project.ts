import type { PortableTextBlock } from "sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type ProjectStatus = "ongoing" | "completed";

export type SanityImageWithAlt = SanityImageSource & { alt?: string };

export interface Project {
  _id: string;
  title: string;
  slug: string;
  status: ProjectStatus;
  district: string;
  progressPercentage?: number;
  description?: PortableTextBlock[];
  heroImage: SanityImageWithAlt;
  gallery?: SanityImageWithAlt[];
  featured?: boolean;
  publishedDate?: string;
}

/**
 * Flattened shape used by UI components. Real Sanity `Project` documents
 * (above) are mapped into this shape by `lib/sanity/mappers.ts`, and served
 * through `lib/sanity/content.ts` — components never touch raw Sanity docs.
 */
export interface ProjectCardData {
  id: string;
  title: string;
  slug: string;
  status: ProjectStatus;
  district: string;
  progressPercentage: number;
  heroImageUrl: string;
  galleryUrls: string[];
  description: PortableTextBlock[];
  featured?: boolean;
}
