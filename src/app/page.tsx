import { Hero } from "@/components/Hero";
import { Metrics } from "@/components/Metrics";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { WhyUs } from "@/components/WhyUs";
import { Contact } from "@/components/Contact";
import { Testimonials } from "@/components/Testimonials";

import hero from "@/data/hero.json";
import metrics from "@/data/metrics.json";
import services from "@/data/services.json";
import projects from "@/data/projects.json";
import whyUs from "@/data/whyUs.json";
import contact from "@/data/contact.json";
import testimonials from "@/data/testimonials.json";
import site from "@/data/site.json";

export default function Home() {
  return (
    <>
      <Hero data={hero} />
      <Metrics items={metrics.items} />
      <Services data={services} />
      <Projects data={projects} />
      <WhyUs data={whyUs} />
      <Contact form={contact} contactInfo={site.contact} />
      <Testimonials items={testimonials.items} />
    </>
  );
}