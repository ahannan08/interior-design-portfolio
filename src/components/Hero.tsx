import type hero from "@/data/hero.json";

type HeroProps = {
  data: typeof hero;
};

export function Hero({ data }: HeroProps) {
  const headlineLines = data.headline.split("\n");

  return (
    <header className="hero" id="top">
      <div className="lamp" aria-hidden />
      <div className="sofa" aria-hidden />
      <div className="wrap">
        <small>{data.eyebrow}</small>
        <h1>
          {headlineLines.map((line, i) => (
            <span key={line}>
              {line}
              {i < headlineLines.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p>{data.subhead}</p>
        <a className="btn" href={data.primaryCta.href}>
          {data.primaryCta.label}
        </a>
        <a className="btn ghost" href={data.secondaryCta.href}>
          {data.secondaryCta.label}
        </a>
      </div>
      <div className="scrollcue">
        <i aria-hidden />
        {data.scrollLabel}
      </div>
    </header>
  );
}