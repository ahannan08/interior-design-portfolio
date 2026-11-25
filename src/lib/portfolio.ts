import portfolio from "@/data/portfolio.json";
import type projects from "@/data/projects.json";

export type PortfolioItem = (typeof portfolio.items)[number];
export type PortfolioCategory = PortfolioItem["category"];

export function getPortfolioById(id: string): PortfolioItem | undefined {
  return portfolio.items.find((item) => item.id === id);
}

export function resolveFeaturedProjects(featured: typeof projects.items) {
  return featured.map((entry) => {
    const item = getPortfolioById(entry.portfolioId);
    if (!item) return null;
    return {
      ...entry,
      title: item.title,
      image: item.image,
      location: "location" in item ? item.location : undefined,
    };
  }).filter(Boolean) as Array<
    (typeof projects.items)[number] & {
      title: string;
      image: string;
      location?: string;
    }
  >;
}

export { portfolio };