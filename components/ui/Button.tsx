import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { clsx } from "clsx";

type Variant = "gold" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide transition-transform active:scale-95";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-obsidian hover:bg-gold-light",
  outline: "border border-porcelain/30 text-porcelain hover:border-gold hover:text-gold",
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

interface AsButton extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: undefined;
}

interface AsLink extends CommonProps {
  href: string;
}

export function Button({ children, variant = "gold", className, ...props }: AsButton | AsLink) {
  const classes = clsx(base, variants[variant], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
