import type site from "@/data/site.json";

type FooterProps = {
  footer: typeof site.footer;
};

export function Footer({ footer }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span>{footer.copyright}</span>
        <span>{footer.social.join(" · ")}</span>
      </div>
    </footer>
  );
}