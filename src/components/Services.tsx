"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type services from "@/data/services.json";

type ServicesProps = {
  data: typeof services;
};

export function Services({ data }: ServicesProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const go = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <section id="services">
      <div className="wrap">
        <div className="svc-head">
          <div>
            <h2 className="t">{data.title}</h2>
            <span className="rule" />
          </div>
          <p className="lede">{data.lede}</p>
        </div>
        <div className="svc-show">
          <div className="svc-tabs" role="tablist" aria-label="Services">
            {data.items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                className={`svc-tab${activeIndex === index ? " on" : ""}`}
                onMouseEnter={() => go(index)}
                onFocus={() => go(index)}
                onClick={() => go(index)}
              >
                <h3>{item.title}</h3>
                <small>{item.description}</small>
              </button>
            ))}
          </div>
          <div className="svc-stage" aria-live="polite">
            {data.items.map((item, index) => (
              <div
                key={item.id}
                className={`svc-slide${activeIndex === index ? " on" : ""}`}
                role="tabpanel"
                aria-hidden={activeIndex !== index}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 820px) 100vw, 55vw"
                  className="svc-slide-img"
                  priority={index === 0}
                />
                <div className="svc-slide-caption">
                  <h3>{item.title}</h3>
                  <div className="svc-chips">
                    {item.chips.map((chip) => (
                      <span key={chip}>{chip}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}