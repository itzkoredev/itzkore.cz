import Link from "next/link";
import { ComponentProps, PropsWithChildren } from "react";

const base =
  "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00B3C6] focus-visible:ring-offset-black";

const variants: Record<string, string> = {
  primary:
    "bg-black/40 border-white/10 text-white hover:bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]",
  cyan: "bg-[#00B3C620] border-[#00B3C640] text-white hover:bg-[#00B3C633]",
  purple:
    "bg-[#7A00FF20] border-[#7A00FF40] text-white hover:bg-[#7A00FF33]",
  green: "bg-[#1FAA5920] border-[#1FAA5940] text-white hover:bg-[#1FAA5933]",
  pink: "bg-[#C000FF20] border-[#C000FF40] text-white hover:bg-[#C000FF33]",
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
