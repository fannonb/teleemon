"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/site";

const BOOK_APPOINTMENT_URL =
  "https://patientportal.advancedmd.com/158995/onlinescheduling";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="site-nav">
        <div className="flex items-center gap-3">
          <Link href="/" title="Go to Home" className="flex items-center gap-2 font-semibold text-teleemon-purple-1000">
            <Image
              src="/svg/teleemon-logo-icon-only.svg"
              alt="Teleemon Logo"
              width={40}
              height={40}
              priority
              className="site-nav-logo"
            />
            <span className="site-nav-brand-name">
              Teleemon Behavioral Health &amp; Wellness, PLLC
            </span>
          </Link>
        </div>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={isActive(link.href) ? "active" : ""}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2" ref={menuRef}>
          <a
            href={BOOK_APPOINTMENT_URL}
            className="btn-primary desktop-book"
            title="Book an Appointment"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book an Appointment
          </a>
          <button
            type="button"
            className="mobile-menu-btn"
            aria-expanded={open}
            aria-label="Open menu"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth="2" d="M4 6h16M4 12h8M4 18h16" />
            </svg>
          </button>
          {open && (
            <ul className="mobile-drawer">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={isActive(link.href) ? "active" : ""}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <a
        href={BOOK_APPOINTMENT_URL}
        className="btn-primary mobile-book"
        title="Book an Appointment"
        target="_blank"
        rel="noopener noreferrer"
      >
        Book an Appointment
      </a>
    </>
  );
}
