"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type portfolio from "@/data/portfolio.json";

type PortfolioGalleryProps = {
  data: typeof portfolio;
};

function categoryLabel(id: string) {
  if (id === "residential") return "Residential";
  if (id === "commercial") return "Commercial";
  if (id === "corporate") return "Corporate";
  return id;
}

export function PortfolioGallery({ data }: PortfolioGalleryProps) {
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    if (active === "all") return data.items;
    return data.items.filter((item) => item.category === active);
  }, [active, data.items]);

  const counts = useMemo(() => {
    const tally: Record<string, number> = { all: data.items.length };
    for (const item of data.items) {
      tally[item.category] = (tally[item.category] ?? 0) + 1;
    }
    return tally;
  }, [data.items]);

  return (
    <>
      <div className="portfolio-filters" role="tablist" aria-label="Filter projects">
        {data.categories.map((cat) => {
          const count =
            cat.id === "all" ? counts.all : (counts[cat.id] ?? 0);
          const isOn = active === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isOn}
              className={`portfolio-filter${isOn ? " on" : ""}`}
              onClick={() => setActive(cat.id)}
            >
              {cat.label}
              <span className="portfolio-filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="portfolio-results" aria-live="polite">
        Showing <strong>{filtered.length}</strong>{" "}
        {filtered.length === 1 ? "project" : "projects"}
      </p>

      <ul className="portfolio-grid">
        {filtered.map((item, index) => (
          <li
            key={item.id}
            className="portfolio-card"
            style={{ animationDelay: `${Math.min(index * 40, 320)}ms` }}
          >
            <div className="portfolio-card-media media-blend-bottom">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="portfolio-card-img"
              />
              <div className="portfolio-card-caption">
                <span className="portfolio-card-tag">
                  {categoryLabel(item.category)}
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}