"use client";

import { useCallback, useState } from "react";
import type testimonials from "@/data/testimonials.json";

type TestimonialsProps = {
  items: typeof testimonials.items;
};

export function Testimonials({ items }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const show = useCallback(
    (next: number) => {
      setFading(true);
      window.setTimeout(() => {
        setIndex(next);
        setFading(false);
      }, 300);
    },
    [],
  );

  const current = items[index];

  return (
    <section className="testi">
      <div className="wrap">
        <span className="qm" aria-hidden>
          “
        </span>
        <blockquote style={{ opacity: fading ? 0 : 1 }}>
          {current?.quote}
        </blockquote>
        <cite>{current?.author}</cite>
        <div className="ctrl">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => show((index + items.length - 1) % items.length)}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => show((index + 1) % items.length)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}