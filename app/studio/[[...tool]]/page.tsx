/**
 * This route mounts the embedded Sanity Studio at /studio, editable from a
 * phone browser (per the brief's "manage everything from mobile" requirement).
 * `dynamic = "force-static"` + the catch-all route follow next-sanity's
 * documented setup for Next.js App Router.
 *
 * NOTE: metadata/viewport are defined here directly rather than re-exported
 * from "next-sanity/studio" — re-exporting them triggers a "use client"
 * boundary conflict with newer Next.js versions (metadata can only come
 * from a Server Component).
 */
import type { Metadata, Viewport } from "next";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

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
  return <NextStudio config={config} />;
}
