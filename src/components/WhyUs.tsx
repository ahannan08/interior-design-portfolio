"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type whyUs from "@/data/whyUs.json";
import { ReasonIcon } from "./ReasonIcon";

type WhyUsProps = {
  data: typeof whyUs;
};

export function WhyUs({ data }: WhyUsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const maxHRef = useRef(0);
  const maxNRef = useRef(1);

  const [fillHeight, setFillHeight] = useState(0);
  const [progress, setProgress] = useState(1);
  const [revealed, setRevealed] = useState(() => data.reasons.map(() => false));

  const tick = useCallback(() => {
    const list = listRef.current;
    if (!list) return;

    const vh = window.innerHeight;
    const lr = list.getBoundingClientRect();
    maxHRef.current = Math.max(
      maxHRef.current,
      Math.min(lr.height, vh * 0.55 - lr.top),
    );
    setFillHeight(Math.max(0, maxHRef.current));

    let maxN = 1;
    setRevealed((prev) => {
      const next = [...prev];
      let changed = false;
      itemRefs.current.forEach((it, k) => {
        if (!it) return;
        const b = it.getBoundingClientRect();
        const mid = b.top + b.height / 2;
        if (mid < vh * 0.72 && !next[k]) {
          next[k] = true;
          changed = true;
        }
        if (mid < vh * 0.62) maxN = Math.max(maxN, k + 1);
      });
      return changed ? next : prev;
    });

    maxNRef.current = Math.max(maxNRef.current, maxN);
    setProgress(maxNRef.current);
  }, []);

  useEffect(() => {
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, [tick]);

  return (
    <section className="why" id="why">
      <div className="wrap why-grid">
        <div className="why-left">
          <h2 className="t">{data.title}</h2>
          <span className="rule" />
          <p>{data.lede}</p>
          <div className="why-prog">
            <span>{progress}</span>
            <small>{data.progressLabel}</small>
          </div>
        </div>
        <div className="why-list" ref={listRef}>
          <div className="why-track" aria-hidden>
            <div className="why-fill" style={{ height: fillHeight }} />
          </div>
          {data.reasons.map((reason, index) => (
            <div
              key={reason.title}
              className={`why-it${revealed[index] ? " on" : ""}`}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
            >
              <ReasonIcon name={reason.icon} />
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
              <div className="why-stat">
                <b>{reason.stat.value}</b>
                <span>{reason.stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}