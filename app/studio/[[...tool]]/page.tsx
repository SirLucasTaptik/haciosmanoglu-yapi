/**
 * This route mounts the embedded Sanity Studio at /studio, editable from a
 * phone browser (per the brief's "manage everything from mobile" requirement).
 *
 * This file stays a Server Component (so metadata/viewport can be exported —
 * that export is only valid from a Server Component). The actual Studio is
 * rendered by <StudioClient />, a Client Component that loads NextStudio via
 * next/dynamic with `ssr: false`. That split is required, not stylistic:
 * Studio must never run through a server-side render pass (see StudioClient.tsx
 * for why), and `ssr: false` can only be used inside a Client Component.
 */
import type { Metadata, Viewport } from "next";
import { StudioClient } from "./StudioClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Sanity Studio",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function StudioPage() {
  return <StudioClient />;
}
