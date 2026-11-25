"use client";

import { FormEvent, useState } from "react";
import type contact from "@/data/contact.json";
import type site from "@/data/site.json";
import { IconMail, IconPhone, IconPin } from "./ContactIcons";

type ContactProps = {
  form: typeof contact;
  contactInfo: typeof site.contact;
  showMap?: boolean;
};

export function Contact({ form, contactInfo, showMap = false }: ContactProps) {
  const [status, setStatus] = useState<{ text: string; ok: boolean } | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus({ text: form.validationError, ok: false });
      return;
    }

    setStatus({ text: form.successMessage, ok: true });
    e.currentTarget.reset();
  };

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="contact-shell">
          <aside className="contact-aside">
            <h3>{form.sideTitle}</h3>
            <p className="contact-aside-lede">{form.sideText}</p>
            <ul className="contact-details">
              <li>
                <span className="contact-detail-icon" aria-hidden>
                  <IconPin />
                </span>
                <span>
                  {contactInfo.addressLines.map((line) => (
                    <span key={line} className="contact-detail-line">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              <li>
                <span className="contact-detail-icon" aria-hidden>
                  <IconPhone />
                </span>
                <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}>
                  {contactInfo.phone}
                </a>
              </li>
              <li>
                <span className="contact-detail-icon" aria-hidden>
                  <IconMail />
                </span>
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </li>
            </ul>
          </aside>

          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <div className="contact-field">
              <label htmlFor="contact-name">{form.fields.name}</label>
              <input
                id="contact-name"
                name="name"
                required
                autoComplete="name"
                placeholder="Your name"
              />
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">{form.fields.email}</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@email.com"
              />
            </div>
            <div className="contact-field contact-field--full">
              <label htmlFor="contact-message">{form.fields.message}</label>
              <textarea
                id="contact-message"
                name="message"
                required
                placeholder="Tell us about your space…"
                rows={5}
              />
            </div>
            <div className="contact-form-actions contact-field--full">
              <button className="contact-submit" type="submit">
                {form.submitLabel}
              </button>
              <span
                className="contact-status"
                role="status"
                data-error={status && !status.ok ? true : undefined}
              >
                {status?.text ?? ""}
              </span>
            </div>
          </form>
        </div>

        {showMap && (
          <div className="contact-map">
            <h3 className="contact-map-title">{form.mapTitle}</h3>
            <div className="contact-map-frame">
              <iframe
                title="Studio location map"
                src={contactInfo.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}