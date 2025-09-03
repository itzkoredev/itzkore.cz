import { PropsWithChildren } from "react";

type SectionProps = PropsWithChildren<{ title?: string; desc?: string }>;

export default function Section({ title, desc, children }: SectionProps) {
  return (
    <section className="container py-10 space-y-6">
      {(title || desc) && (
        <header>
          {title && <h1 className="text-3xl font-bold drop-shadow-neonPurple">{title}</h1>}
          {desc && <p className="mt-2 text-gray-300 max-w-prose">{desc}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
