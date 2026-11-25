import Link from "next/link";
import type navigation from "@/data/navigation.json";
import type site from "@/data/site.json";
import { IconMail, IconPhone, IconPin } from "./ContactIcons";
import { SocialIcon } from "./SocialIcons";

type FooterProps = {
  footer: typeof site.footer;
  contact: typeof site.contact;
  brand: typeof site.brand;
  brandByline: typeof site.brandByline;
  description: typeof site.description;
  links: typeof navigation.links;
};

export function Footer({
  footer,
  contact,
  brand,
  brandByline,
  description,
  links,
}: FooterProps) {
  const phoneHref = `tel:${contact.phone.replace(/\s/g, "")}`;

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link href="/" className="footer-brand-lockup">
            <span className="footer-brand-script">{brand}</span>
            <span className="footer-brand-by">{brandByline}</span>
          </Link>
          <p className="footer-tagline">{description}</p>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <h3 className="footer-heading">Explore</h3>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-contact">
          <h3 className="footer-heading">Contact</h3>
          <ul className="footer-contact-list">
            <li>
              <span className="footer-contact-icon" aria-hidden>
                <IconPin />
              </span>
              <span>
                {contact.addressLines.map((line) => (
                  <span key={line} className="footer-contact-line">
                    {line}
                  </span>
                ))}
              </span>
            </li>
            <li>
              <span className="footer-contact-icon" aria-hidden>
                <IconPhone />
              </span>
              <a href={phoneHref}>{contact.phone}</a>
            </li>
            <li>
              <span className="footer-contact-icon" aria-hidden>
                <IconMail />
              </span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap footer-bar">
        <span>{footer.copyright}</span>
        <ul className="footer-social">
          {footer.social.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
              >
                <SocialIcon network={item.network} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}