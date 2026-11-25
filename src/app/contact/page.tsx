import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import contactPage from "@/data/contact-page.json";
import contact from "@/data/contact.json";
import site from "@/data/site.json";

export const metadata: Metadata = {
  title: `${contactPage.title} — ${site.brand}`,
  description: contactPage.lede,
};

export default function ContactPage() {
  return (
    <main className="site-page contact-page">
      <div className="wrap contact-page-intro">
        <h1 className="t">{contactPage.title}</h1>
        <span className="rule" />
        <p className="lede">{contactPage.lede}</p>
      </div>
      <Contact form={contact} contactInfo={site.contact} showMap />
    </main>
  );
}