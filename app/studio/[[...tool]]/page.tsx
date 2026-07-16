/**
 * This route mounts the embedded Sanity Studio at /studio, editable from a
 * phone browser (per the brief's "manage everything from mobile" requirement).
 * `dynamic = "force-static"` + the catch-all route follow next-sanity's
 * documented setup for Next.js App Router.
 */
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
