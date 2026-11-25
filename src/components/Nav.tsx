"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type navigation from "@/data/navigation.json";
import type site from "@/data/site.json";

type NavProps = {
  brand: typeof site.brand;
  brandByline: typeof site.brandByline;
  links: typeof navigation.links;
  cta: typeof navigation.cta;
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav({ brand, brandByline, links, cta }: NavProps) {
  const pathname = usePathname();
  const [solid, setSolid] = useState(pathname !== "/");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setSolid(true);
      return;
    }

    const onScroll = () => setSolid(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`site-header${solid ? " solid" : ""}`}>
        <nav className="site-nav wrap" id="nav" aria-label="Main">
          <Link className="nav-brand" href="/">
            <span className="nav-brand-script">{brand}</span>
            <span className="nav-brand-by">{brandByline}</span>
          </Link>

          <div className="nav-center">
            <ul className="nav-pills">
              {links.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={active ? "active" : undefined}
                      aria-current={active ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="nav-end">
            <Link className="nav-cta" href={cta.href}>
              {cta.label}
            </Link>
            <button
              type="button"
              className="nav-toggle"
              aria-expanded={menuOpen}
              aria-controls="nav-drawer"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="nav-toggle-lines" aria-hidden />
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </nav>
      </header>

      <div
        id="nav-drawer"
        className={`nav-drawer${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className="nav-drawer-list">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={active ? "active" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              className="nav-drawer-cta"
              href={cta.href}
              onClick={() => setMenuOpen(false)}
            >
              {cta.label}
            </Link>
          </li>
        </ul>
      </div>
      {menuOpen && (
        <button
          type="button"
          className="nav-scrim"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}