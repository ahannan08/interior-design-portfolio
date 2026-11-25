"use client";

import { useEffect, useRef, useState } from "react";
import type metrics from "@/data/metrics.json";

type MetricsProps = {
  items: typeof metrics.items;
};

function useCountUp(
  target: number,
  suffix: string,
  active: boolean,
) {
  const [display, setDisplay] = useState(`0${suffix}`);

  useEffect(() => {
    if (!active) return;
    const t0 = performance.now();
    let frame: number;

    const step = (t: number) => {
      const k = Math.min((t - t0) / 1400, 1);
      const eased = 1 - Math.pow(1 - k, 3);
      setDisplay(`${Math.round(target * eased)}${suffix}`);
      if (k < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, suffix, active]);

  return display;
}

function MetricCell({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const display = useCountUp(value, suffix, visible);

  return (
    <div className="m" ref={ref}>
      <b>{display}</b>
      <span>{label}</span>
    </div>
  );
}

export function Metrics({ items }: MetricsProps) {
  return (
    <div className="metrics">
      <div className="wrap">
        {items.map((item) => (
          <MetricCell
            key={item.label}
            value={item.value}
            suffix={item.suffix}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
}