import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("İçerik")
    .items([
      S.listItem()
        .title("Projeler")
        .child(S.documentTypeList("project").title("Projeler")),
      S.divider(),
      S.listItem()
        .title("Ana Sayfa - Hero")
        .child(S.document().schemaType("homepageHero").documentId("homepageHero")),
      S.listItem()
        .title("Hakkımızda İçeriği")
        .child(S.document().schemaType("aboutContent").documentId("aboutContent")),
      S.listItem()
        .title("İletişim Bilgileri")
        .child(S.document().schemaType("contactInfo").documentId("contactInfo")),
      S.listItem()
        .title("Site Ayarları")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
