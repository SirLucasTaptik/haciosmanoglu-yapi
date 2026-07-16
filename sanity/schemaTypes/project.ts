import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Proje",
  type: "document",
  groups: [
    { name: "content", title: "İçerik", default: true },
    { name: "media", title: "Görseller" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Durum",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Devam Ediyor", value: "ongoing" },
          { title: "Tamamlandı", value: "completed" },
        ],
        layout: "radio",
      },
      initialValue: "ongoing",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "district",
      title: "İlçe / Bölge",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "progressPercentage",
      title: "İlerleme Yüzdesi",
      type: "number",
      group: "content",
      description: "0–100 arası. 'Tamamlandı' durumunda 100 olmalı.",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      type: "array",
      group: "content",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "heroImage",
      title: "Kapak Görseli",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        { name: "alt", title: "Alt metin", type: "string", validation: (Rule) => Rule.required() },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galeri",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt metin", type: "string" }],
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Öne Çıkan",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "publishedDate",
      title: "Yayın Tarihi",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "title", status: "status", media: "heroImage" },
    prepare({ title, status, media }) {
      return {
        title,
        subtitle: status === "ongoing" ? "Devam Ediyor" : "Tamamlandı",
        media,
      };
    },
  },
});
