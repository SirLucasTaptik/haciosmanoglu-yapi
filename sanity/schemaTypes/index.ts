import type { SchemaTypeDefinition } from "sanity";

import { project } from "./project";
import { homepageHero } from "./homepageHero";
import { aboutContent } from "./aboutContent";
import { contactInfo } from "./contactInfo";
import { siteSettings } from "./siteSettings";
import { seo } from "./seo";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    project,
    homepageHero,
    aboutContent,
    contactInfo,
    siteSettings,
    // Reusable objects
    seo,
  ],
};
