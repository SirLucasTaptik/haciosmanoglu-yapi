import { defineField, defineType } from "sanity";

export const aboutContent = defineType({
  name: "aboutContent",
  title: "Hakkımızda İçeriği",
  type: "document",
  fields: [
    defineField({ name: "history", title: "Şirket Tarihçesi", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "mission", title: "Misyon", type: "text", rows: 4 }),
    defineField({ name: "vision", title: "Vizyon", type: "text", rows: 4 }),
    defineField({
      name: "values",
      title: "Değerler",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Başlık", type: "string" },
            { name: "description", title: "Açıklama", type: "text", rows: 2 },
          ],
        },
      ],
    }),
  ],
});
