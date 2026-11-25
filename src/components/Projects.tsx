"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type projects from "@/data/projects.json";
import { resolveFeaturedProjects } from "@/lib/portfolio";

type ProjectsProps = {
  data: typeof projects;
};

function useRevealOnce(threshold = 0.14) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function Projects({ data }: ProjectsProps) {
  const items = resolveFeaturedProjects(data.items);
  const intro = useRevealOnce(0.2);

  return (
    <section className="projects" id="projects">
      <div className="wrap">
        <div
          ref={intro.ref as React.RefObject<HTMLDivElement>}
          className={`proj-intro${intro.visible ? " proj--visible" : ""}`}
        >
          <h2>{data.title}</h2>
          <span className="rule" />
          <p className="lede">{data.lede}</p>
        </div>

        {items.map((project) => (
          <ProjectBlock key={project.portfolioId} project={project} />
        ))}

        <div className="vall">
          <Link className="btn" href={data.viewAll.href}>
            {data.viewAll.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectBlock({
  project,
}: {
  project: ReturnType<typeof resolveFeaturedProjects>[number];
}) {
  const { ref, visible } = useRevealOnce();

  const inner =
    project.layout !== "j3" ? (
      <>
        <div className="shot shot--photo">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 820px) 100vw, 60vw"
            className="shot-img"
          />
          <div className="deco" aria-hidden />
        </div>
        <div className="txt proj-txt-card">
          <span className="tag">{project.tag}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          {project.location && <p className="proj-loc">{project.location}</p>}
          {project.facts.length > 0 && (
            <div className="facts">
              {project.facts.map((fact) => (
                <div key={fact.unit}>
                  <b>{fact.value}</b>
                  {fact.unit}
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    ) : (
      <div className="wrapper">
        <div className="shot shot--photo">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="100vw"
            className="shot-img"
          />
          <div className="deco" aria-hidden />
        </div>
        <div className="txt">
          <span className="tag">{project.tag}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          {project.location && (
            <p className="proj-loc proj-loc--on-dark">{project.location}</p>
          )}
        </div>
      </div>
    );

  return (
    <article
      ref={ref}
      className={`proj ${project.layout}${visible ? " proj--visible" : ""}`}
    >
      {inner}
    </article>
  );
}