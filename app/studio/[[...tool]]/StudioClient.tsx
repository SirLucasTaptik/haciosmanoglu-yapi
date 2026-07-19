"use client";

import dynamicImport from "next/dynamic";
import config from "@/sanity.config";

/**
 * Sanity Studio is a heavy, browser-only React application: it relies on
 * canvas, IntersectionObserver, and React context providers that are not
 * designed to survive a server-side render pass. Loading it with
 * `ssr: false` guarantees it is ONLY ever rendered in the browser.
 *
 * Without this, Next.js's server-side render pass (which still happens for
 * Client Components — even under `force-static` or `force-dynamic`, Next
 * renders an initial HTML shell on the server) can hit
 * `TypeError: createContext is not a function` deep inside Studio's
 * dependency tree, because some of those dependencies assume a full browser
 * environment and break under Node's React SSR conditions.
 */
const NextStudio = dynamicImport(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false }
);

export function StudioClient() {
  return <NextStudio config={config} />;
}
