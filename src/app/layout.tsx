import type { Metadata } from "next";
import { Alex_Brush, Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import "./globals.css";
import site from "@/data/site.json";
import navigation from "@/data/navigation.json";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const brandScript = Alex_Brush({
  variable: "--font-brand-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${nunito.variable} ${brandScript.variable}`}
    >
      <body>
        <Nav
          brand={site.brand}
          brandByline={site.brandByline}
          links={navigation.links}
          cta={navigation.cta}
        />
        {children}
        <Footer footer={site.footer} />
        <CustomCursor />
      </body>
    </html>
  );
}