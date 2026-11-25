"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer || prefersReduced) return;

    document.documentElement.classList.add("has-cursor");
    document.body.classList.add("has-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      dot.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;

      const t = e.target as Element | null;
      ring.classList.toggle("h", !!t?.closest("a,button,.svc-tab"));
      ring.classList.toggle("t", !!t?.closest("input,textarea"));
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onEnter = () => {
      dot.style.opacity = "";
      ring.style.opacity = "";
    };

    let frame: number;
    const loop = () => {
      const { x, y } = pos.current;
      pos.current.rx += (x - pos.current.rx) * 0.18;
      pos.current.ry += (y - pos.current.ry) * 0.18;
      ring.style.transform = `translate(${pos.current.rx}px,${pos.current.ry}px)`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-cursor");
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div className="cr" ref={ringRef} aria-hidden />
      <div className="cd" ref={dotRef} aria-hidden />
    </>
  );
}