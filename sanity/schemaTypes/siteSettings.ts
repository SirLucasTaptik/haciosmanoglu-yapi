import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Ayarları",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Site Başlığı", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "defaultSeo", title: "Varsayılan SEO", type: "seo" }),
    defineField({
      name: "socialLinks",
      title: "Sosyal Medya Bağlantıları",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: { list: ["instagram", "facebook", "linkedin", "youtube"] },
            },
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
    }),
  ],
});
