import "./globals.css";
import type { Metadata } from "next";
import Chrome from "../components/Chrome";
import { Exo_2, Space_Grotesk } from "next/font/google";
import { I18nProvider } from "../lib/i18n";
import { ThemeProvider } from "../components/ThemeProvider";
import ViewTransition from "../components/ViewTransition";
import RoutePreloader from "../components/RoutePreloader";
import PageTransitionLoader from "../components/PageTransitionLoader";

const exo2 = Exo_2({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-orbitron",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});
const bodyFont = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://itzkore.cz"),
  title: {
    default: "itzKORE | Music Producer, Sound Engineer & Developer",
    template: "%s | itzKORE",
  },
  description:
    "Profesionální hudební produkce zaměřená na trap a drill, mix & mastering služby, vývoj her a webových aplikací. Temné atmosférické beaty a moderní zvukové inženýrství.",
  keywords: [
    "trap producer",
    "drill producer",
    "mix master",
    "sound engineer",
    "beat maker",
    "music production",
    "game developer",
    "web developer",
    "Czech producer",
    "dark trap",
    "808 beats",
  ],
  authors: [{ name: "itzKORE" }],
  creator: "itzKORE",
  publisher: "itzKORE",
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      cs: "/",
      en: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    alternateLocale: ["en_US"],
    url: "https://itzkore.cz",
    siteName: "itzKORE",
    title: "itzKORE | Music Producer, Sound Engineer & Developer",
    description:
      "Profesionální hudební produkce zaměřená na trap a drill, mix & mastering služby, vývoj her a webových aplikací.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "itzKORE - Music Producer & Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "itzKORE | Music Producer, Sound Engineer & Developer",
    description:
      "Profesionální hudební produkce zaměřená na trap a drill, mix & mastering služby, vývoj her a webových aplikací.",
    images: ["/og-image.png"],
    creator: "@itzkore",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "T-p5CfmZpKjaP5MbHQAJRWann1obyqMZkQijSOsBJfA",
    // yandex: "your-yandex-verification-code", // Add if needed
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" data-theme="light" className="" suppressHydrationWarning>
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* No-flash scripts - MUST run before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var l=localStorage.getItem('locale');if(l==='en'||l==='cs'){document.documentElement.lang=l}}catch{}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var t=localStorage.getItem('itzkore-theme');if(t!=='light'&&t!=='dark'){t='light';}document.documentElement.setAttribute('data-theme',t);document.documentElement.classList.toggle('dark',t==='dark');}catch{document.documentElement.setAttribute('data-theme','light');document.documentElement.classList.remove('dark');}}();`,
          }}
        />
        {process.env.NODE_ENV === 'development' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `console.log('%c[DevMode] Route loading debug available. Set window.debugRouteLoading = true to enable.', 'color: #0ff');`,
            }}
          />
        )}
      </head>
      <body className={`${bodyFont.variable} ${exo2.variable} font-body min-h-screen flex flex-col`} suppressHydrationWarning>
  {/* Skip to content for keyboard users */}
  <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded focus:shadow-lg">Skip to content</a>
        <ThemeProvider>
          <I18nProvider>
            <PageTransitionLoader />
            <ViewTransition>
              <RoutePreloader />
              <Chrome>{children}</Chrome>
            </ViewTransition>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
