"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import Scene2077 from "./Scene2077";
import RouteGlitch from "./RouteGlitch";
import PreloadRoutes from "./PreloadRoutes";
import RouteReady from "./RouteReady";

export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  if (isHome) return (
    <main id="main" className="flex-1">
  <RouteGlitch theme="black" />
      <PreloadRoutes />
  <RouteReady />
      {children}
    </main>
  );
  return (
      <div className="flex-1 flex flex-col">
  <Scene2077 />
  <RouteGlitch theme="black" />
      <PreloadRoutes />
  <RouteReady />
      <Header />
        <main id="main" className="flex-1">{children}</main>
      <Footer />
      </div>
  );
}
