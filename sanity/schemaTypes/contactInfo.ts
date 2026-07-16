import { defineField, defineType } from "sanity";

export const contactInfo = defineType({
  name: "contactInfo",
  title: "İletişim Bilgileri",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Firma Adı",
      type: "string",
      initialValue: "Hacıosmanoğlu Yapı",
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
      initialValue: "0533 773 71 80",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Numarası (uluslararası format, örn. 905337737180)",
      type: "string",
      initialValue: "905337737180",
    }),
    defineField({
      name: "email",
      title: "E-posta",
      type: "string",
      initialValue: "farukhaciosmanoglu@ymail.com",
    }),
    defineField({
      name: "address",
      title: "Adres",
      type: "string",
      initialValue: "İncirli Cd. 11, 34145 Bakırköy / İstanbul",
    }),
    defineField({
      name: "mapCoordinates",
      title: "Harita Koordinatları",
      type: "geopoint",
    }),
  ],
});
