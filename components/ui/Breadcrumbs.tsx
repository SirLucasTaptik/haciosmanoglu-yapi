import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://haciosmanoglu-yapi.com";

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? `${siteUrl}${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-inkMuted">
        {items.map((item, i) => (
          <span key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={12} />}
            {item.href ? (
              <Link href={item.href} className="hover:text-gold-dark">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink/70">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
