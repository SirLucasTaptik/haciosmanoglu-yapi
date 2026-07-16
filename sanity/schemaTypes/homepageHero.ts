import { defineField, defineType } from "sanity";

export const homepageHero = defineType({
  name: "homepageHero",
  title: "Ana Sayfa - Hero",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Başlık",
      type: "string",
      initialValue: "Bakırköy'ün Güvenilir Kentsel Dönüşüm Firması",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheadline",
      title: "Alt Başlık",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "backgroundMedia",
      title: "Arka Plan Görseli",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Ana CTA Metni",
      type: "string",
      initialValue: "Ücretsiz Keşif Talebi",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "İkincil CTA Metni",
      type: "string",
      initialValue: "Devam Eden Projeler",
    }),
    defineField({
      name: "stats",
      title: "İstatistikler",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Etiket", type: "string" },
            { name: "value", title: "Değer", type: "string" },
          ],
        },
      ],
    }),
  ],
});
