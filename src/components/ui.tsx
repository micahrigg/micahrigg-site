import Link from "next/link";
import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  width = "default",
}: {
  children: React.ReactNode;
  className?: string;
  width?: "default" | "narrow" | "wide";
}) {
  const widths = {
    narrow: "max-w-2xl",
    default: "max-w-4xl",
    wide: "max-w-6xl",
  };
  return (
    <div className={cn("mx-auto w-full px-6 sm:px-8", widths[width], className)}>{children}</div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-ink-subtle font-mono text-xs tracking-[0.18em] uppercase", className)}>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <Tag className="text-3xl sm:text-4xl">{title}</Tag>
      {description ? <p className="text-ink-muted mt-4 text-lg">{description}</p> : null}
    </div>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const buttonVariants = {
  primary: "bg-accent text-accent-contrast hover:bg-accent-hover",
  secondary: "border border-line text-ink hover:border-accent hover:text-accent",
  ghost: "text-ink-muted hover:text-accent",
};

const buttonSizes = {
  sm: "h-9 px-4",
  md: "h-11 px-6",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  className?: string;
} = {}) {
  return cn(buttonBase, buttonVariants[variant], buttonSizes[size], className);
}

export function ButtonLink({
  href,
  children,
  variant,
  size,
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  className?: string;
  external?: boolean;
}) {
  const classes = buttonClasses({ variant, size, className });

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function Tag({
  children,
  className,
  active,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs tracking-wide transition-colors",
        active
          ? "border-accent bg-accent text-accent-contrast"
          : "border-line text-ink-muted group-hover:border-accent group-hover:text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "border-line bg-surface-raised hover:border-accent/40 rounded-lg border p-6 transition-colors",
        className,
      )}
    >
      {children}
    </div>
  );
}
