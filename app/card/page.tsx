import type { Metadata } from "next";
import Image from "next/image";
import { ShareCardButton } from "@/components/ShareCardButton";
import { siteConfig } from "@/lib/site";
import "./card.css";

export const metadata: Metadata = {
  title: "Frank Bashumika | Digital Business Card",
  description:
    "Save Frank Bashumika’s contact — Teleemon Behavioral Health. MPH, ARNP, PMHNP-BC.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Frank Bashumika — Teleemon Behavioral Health",
    description: "Tap Save Contact to add Frank to your phone.",
    url: `${siteConfig.url}/card`,
    images: [{ url: "/img/frank-bw-photo-with-mask.jpg" }],
  },
};

const CARD_URL = `${siteConfig.url}/card`;
const VCARD_HREF = "/api/vcard";

const contacts = [
  {
    label: "Phone",
    value: "+1 833-711-4191",
    href: "tel:+18337114191",
    icon: "phone",
  },
  {
    label: "Fax",
    value: "+1 833-711-4191",
    href: "tel:+18337114191",
    icon: "fax",
  },
  {
    label: "Email",
    value: "info@teleemon.com",
    href: "mailto:info@teleemon.com",
    icon: "email",
  },
  {
    label: "Office",
    value: "16301 NE 8th Street, Suite 233, Bellevue, WA 98008",
    href: siteConfig.mapsUrl,
    icon: "pin",
    external: true,
  },
  {
    label: "Website",
    value: "www.teleemon.com",
    href: "https://www.teleemon.com",
    icon: "web",
    external: true,
  },
] as const;

function ContactIcon({ type }: { type: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "fax":
      return (
        <svg {...common}>
          <path d="M6 22h12a2 2 0 0 0 2-2v-5H4v5a2 2 0 0 0 2 2z" />
          <path d="M4 15V7a2 2 0 0 1 2-2h3" />
          <path d="M14 5h4a2 2 0 0 1 2 2v8" />
          <rect x="8" y="2" width="6" height="5" rx="1" />
        </svg>
      );
    case "email":
      return (
        <svg {...common}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <path d="m22 6-10 7L2 6" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
  }
}

export default function DigitalCardPage() {
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=${encodeURIComponent(CARD_URL)}`;

  return (
    <div className="digital-card-page">
      <div className="digital-card">
        <div className="card-actions-top">
          <a className="card-save-btn" href={VCARD_HREF} download="frank-bashumika.vcf">
            + Save Contact
          </a>
          <ShareCardButton
            url={CARD_URL}
            title="Frank Bashumika | Teleemon Behavioral Health"
            shareText="Here's Frank Bashumika's digital card (Teleemon Behavioral Health):"
            variant="primary"
            className="card-share-top"
          />
        </div>

        <header className="card-hero">
          <div className="card-hero-brand">
            <Image
              src="/svg/teleemon-logo-icon-only.svg"
              alt="Teleemon"
              width={36}
              height={36}
              className="card-hero-logo"
              priority
            />
            <div>
              <p className="card-brand-name">Teleemon</p>
              <p className="card-brand-sub">Behavioral Health</p>
            </div>
          </div>

          <div className="card-hero-person">
            <div className="card-hero-copy">
              <h1>Frank Bashumika</h1>
              <p className="card-credentials">MPH · ARNP · PMHNP-BC</p>
              <p className="card-role">Psychiatric Mental Health Nurse Practitioner</p>
            </div>
            <Image
              src="/img/frank-bw-photo-with-mask.jpg"
              alt="Frank Bashumika"
              width={112}
              height={112}
              className="card-avatar"
              priority
            />
          </div>
        </header>

        <section className="card-bio">
          <p>
            Compassionate, ADHD-dedicated care for evaluation, medication management, and recovery
            support — helping you discover the best version of yourself.
          </p>
        </section>

        <section className="card-contacts" aria-label="Contact details">
          {contacts.map((item) => (
            <a
              key={`${item.label}-${item.value}`}
              className="card-contact-row"
              href={item.href}
              {...("external" in item && item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span className="card-contact-icon" aria-hidden="true">
                <ContactIcon type={item.icon} />
              </span>
              <span className="card-contact-text">
                <strong>{item.value}</strong>
                <small>{item.label}</small>
              </span>
            </a>
          ))}
        </section>

        <section className="card-qr-block">
          <Image src={qrSrc} alt="QR code linking to this digital card" width={140} height={140} unoptimized />
          <p>Scan to open this card on another phone</p>
        </section>

        <p className="card-airdrop-note">
          Prefer AirDrop or Quick Share? Open this page, tap your browser’s Share icon, then send
          the live link — it opens automatically on their phone.
        </p>
      </div>
    </div>
  );
}
