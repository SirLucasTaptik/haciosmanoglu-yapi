import { createClient, type SanityClient } from "@sanity/client";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

// `sanityClient` is `null` when NEXT_PUBLIC_SANITY_PROJECT_ID hasn't been set
// yet (e.g. right after cloning this project, before Sanity is configured).
// Every function in lib/sanity/content.ts checks for this and falls back to
// sensible default content instead of crashing the build — this lets the
// site run and look right on day one, before the CMS has been populated.
export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

// Authenticated client for previews / draft content — never expose the
// token to the client bundle; only import this file from Server Components
// or Route Handlers.
export const sanityPreviewClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_READ_TOKEN,
      perspective: "previewDrafts",
    })
  : null;

if (!projectId && process.env.NODE_ENV !== "test") {
  console.warn(
    "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set — pages will render with default fallback content until Sanity is configured. See .env.example."
  );
}
