import type { Metadata } from "next";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import portfolio from "@/data/portfolio.json";
import site from "@/data/site.json";

export const metadata: Metadata = {
  title: `${portfolio.pageTitle} — ${site.brand}`,
  description: portfolio.pageLede,
};

export default function ProjectsPage() {
  return (
    <main className="portfolio-page">
      <div className="wrap portfolio-hero">
        <h1 className="t">{portfolio.pageTitle}</h1>
        <span className="rule" />
        <p className="lede portfolio-lede">{portfolio.pageLede}</p>
      </div>
      <div className="wrap portfolio-body">
        <PortfolioGallery data={portfolio} />
      </div>
    </main>
  );
}