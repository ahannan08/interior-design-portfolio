import type { Metadata } from "next";
import Image from "next/image";
import about from "@/data/about.json";
import site from "@/data/site.json";

export const metadata: Metadata = {
  title: `About — ${site.brand}`,
  description: about.story[0],
};

export default function AboutPage() {
  return (
    <main className="site-page about-page">
      <div className="wrap">
        <header className="about-top">
          <div className="about-portrait">
            <Image
              src={about.quote.image}
              alt={about.quote.author}
              fill
              sizes="(max-width: 900px) 280px, 320px"
              className="about-portrait-img"
              priority
            />
          </div>
          <div className="about-intro">
            <small className="about-eyebrow">{about.eyebrow}</small>
            <h1 className="t">{about.title}</h1>
            <span className="rule" />
            <p className="about-lede">{about.story[0]}</p>
          </div>
        </header>

        <section className="about-quote" aria-label="Studio philosophy">
          <blockquote className="about-quote-text">
            <p>&ldquo;{about.quote.text}&rdquo;</p>
          </blockquote>
        </section>

        <section className="about-body">
          <p className="about-p">{about.story[1]}</p>
          <ul className="about-stats">
            {about.highlights.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}