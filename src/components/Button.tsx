import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
};

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-blue-50 text-blue-800 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-white/10",
};

export function Button({ children, href, icon: Icon, variant = "primary", className = "", onClick, type = "button", ariaLabel }: ButtonProps) {
  const classes = `inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`;
  const content = (
    <>
      {Icon ? <Icon aria-hidden="true" className="h-4 w-4" /> : null}
      {children}
    </>
  );

  if (href) {
    return (
      <Link aria-label={ariaLabel} className={classes} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button aria-label={ariaLabel} className={classes} onClick={onClick} type={type}>
      {content}
    </button>
  );
}
