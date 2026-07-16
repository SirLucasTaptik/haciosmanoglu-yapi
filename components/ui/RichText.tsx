import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "sanity";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed text-inkMuted last:mb-0">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-ink">{children}</strong>,
  },
};

export function RichText({ value }: { value: PortableTextBlock[] | undefined | null }) {
  if (!value || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}
