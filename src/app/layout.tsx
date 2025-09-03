import "./globals.css";
import type { Metadata } from "next";
import Chrome from "../components/Chrome";
import { Orbitron, Space_Grotesk } from "next/font/google";
import { I18nProvider } from "../lib/i18n";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-orbitron",
});
const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://itzkore.cz"),
  title: {
    default: "itzKORE | Osobní web",
    template: "%s | itzKORE",
  },
  description: "Osobní web — stavíme na Next.js + Tailwind",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className="dark">
      <body className={`${bodyFont.variable} ${orbitron.variable} font-body min-h-screen flex flex-col`}>
        {/* No-flash locale: set documentElement.lang asap from localStorage if available */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var l=localStorage.getItem('locale');if(l==='en'||l==='cs'){document.documentElement.lang=l}}catch{}`,
          }}
        />
  {/* Skip to content for keyboard users */}
  <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded focus:shadow-lg">Skip to content</a>
        <I18nProvider>
          <Chrome>{children}</Chrome>
        </I18nProvider>
      </body>
    </html>
  );
}
