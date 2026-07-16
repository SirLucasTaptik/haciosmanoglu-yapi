"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { clsx } from "clsx";

const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/projeler", label: "Projeler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

interface HeaderProps {
  companyName: string;
  phone: string;
  phoneHref: string;
}

export function Header({ companyName, phone, phoneHref }: HeaderProps) {
  const pathname = usePathname();
  const [firstWord, ...rest] = companyName.split(" ");

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-obsidian/85 backdrop-blur-md">
      <div className="container-page flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-[1.5px] border-gold bg-porcelain p-0.5">
            <Image src="/logo.jpeg" alt={companyName} width={40} height={40} className="rounded-full object-cover" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-semibold text-porcelain">{firstWord}</span>
            <span className="-mt-0.5 block font-mono text-[10px] tracking-[0.2em] text-gold">
              {rest.join(" ").toUpperCase()}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "text-sm font-medium transition-colors",
                  isActive ? "text-gold" : "text-porcelain/70 hover:text-porcelain"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <a
          href={`tel:${phoneHref}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-porcelain/25 md:hidden"
          aria-label="Ara"
        >
          <Phone size={16} className="text-porcelain" />
        </a>

        <a
          href={`tel:${phoneHref}`}
          className="hidden items-center gap-2 rounded-full border border-porcelain/25 px-4 py-2 text-sm font-medium text-porcelain transition-colors hover:border-gold hover:text-gold md:flex"
        >
          <Phone size={15} /> {phone}
        </a>
      </div>
    </header>
  );
}
