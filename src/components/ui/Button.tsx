import Link from "next/link";
import { ComponentProps, PropsWithChildren } from "react";

const base =
  "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent focus-visible:ring-offset-background";

const variants: Record<string, string> = {
  primary:
    "bg-surface-soft border-border-soft text-foreground hover:bg-surface-strong shadow-glass backdrop-blur-sm",
  cyan: "bg-accent/10 border-accent/30 text-accent hover:bg-accent/20 shadow-sm hover:shadow-md",
  purple:
    "bg-accent-secondary/10 border-accent-secondary/30 text-accent-secondary hover:bg-accent-secondary/20 shadow-sm hover:shadow-md",
  green: "bg-[#1FAA5920] border-[#1FAA5940] text-[#1FAA59] hover:bg-[#1FAA5933]",
  pink: "bg-[#C000FF20] border-[#C000FF40] text-[#C000FF] hover:bg-[#C000FF33]",
};

export function Button(
  props: PropsWithChildren<{ variant?: keyof typeof variants } & ComponentProps<"button">>
) {
  const { variant = "primary", className = "", ...rest } = props;
  return <button className={[base, variants[variant], className].join(" ")} {...rest} />;
}

export function LinkButton(
  props: PropsWithChildren<{ href: string; variant?: keyof typeof variants } & ComponentProps<typeof Link>>
) {
  const { variant = "primary", className = "", href, ...rest } = props;
  return (
    <Link href={href} className={[base, variants[variant], className].join(" ")} {...rest} />
  );
}
