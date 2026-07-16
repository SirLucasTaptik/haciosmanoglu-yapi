import { groq } from "next-sanity";

const projectFields = groq`
  _id,
  title,
  "slug": slug.current,
  status,
  district,
  progressPercentage,
  description,
  heroImage,
  gallery,
  featured,
  publishedDate,
  seo
`;

export const projectsByStatusQuery = groq`
  *[_type == "project" && status == $status] | order(featured desc, publishedDate desc) {
    ${projectFields}
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    ${projectFields}
  }
`;

export const allProjectSlugsQuery = groq`*[_type == "project" && defined(slug.current)]{"slug": slug.current}`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;
export const homepageHeroQuery = groq`*[_type == "homepageHero"][0]`;
export const aboutContentQuery = groq`*[_type == "aboutContent"][0]`;
export const contactInfoQuery = groq`*[_type == "contactInfo"][0]{..., "mapCoordinates": mapCoordinates}`;
