"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, Info, Mail } from "lucide-react";
import { clsx } from "clsx";

const NAV_ITEMS = [
  { href: "/", label: "Ana Sayfa", icon: Home },
  { href: "/projeler", label: "Projeler", icon: Building2 },
  { href: "/hakkimizda", label: "Hakkımızda", icon: Info },
  { href: "/iletisim", label: "İletişim", icon: Mail },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-4 border-t border-white/8 bg-obsidian/95 backdrop-blur-md md:hidden">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link key={href} href={href} className="flex flex-col items-center gap-1 py-2.5">
            <Icon size={20} className={clsx(isActive ? "text-gold" : "text-porcelain/50")} strokeWidth={isActive ? 2.2 : 1.8} />
            <span className={clsx("text-[10px] font-medium", isActive ? "text-gold" : "text-porcelain/50")}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
