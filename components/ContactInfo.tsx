import { siteConfig } from "@/lib/site";

const emailHref = `mailto:${siteConfig.email}?subject=Email%20from%20Teleemon.com&body=Hello%20Teleemon%20Team,%0D%0A%0D%0AI%20am%20reaching%20out%20regarding%20your%20services.%0D%0A%0D%0A%0D%0AThank%20you!`;

type IconName = "office" | "cell" | "fax" | "email" | "address" | "hours";

const items: {
  label: string;
  value: string;
  icon: IconName;
  href?: string;
  title?: string;
  external?: boolean;
  wide?: boolean;
}[] = [
  {
    label: "Office",
    value: siteConfig.officePhone,
    icon: "office",
    href: siteConfig.officePhoneHref,
    title: "Give us a call on our primary office line.",
  },
  {
    label: "Cell phone",
    value: siteConfig.phone,
    icon: "cell",
    href: siteConfig.phoneHref,
    title: "Give us a call on our cell phone.",
  },
  {
    label: "Fax",
    value: siteConfig.fax,
    icon: "fax",
  },
  {
    label: "Email",
    value: siteConfig.email,
    icon: "email",
    href: emailHref,
    title: "Send us an email!",
  },
  {
    label: "Address",
    value: siteConfig.address,
    icon: "address",
    href: siteConfig.mapsUrl,
    title: "Open our map address in a new tab",
    external: true,
    wide: true,
  },
  {
    label: "Hours",
    value: siteConfig.hours,
    icon: "hours",
    wide: true,
  },
];

function ContactIcon({ name }: { name: IconName }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "office":
      return (
        <svg {...common}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "cell":
      return (
        <svg {...common}>
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <path d="M12 18h.01" />
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
    case "address":
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
          <path d="M12 6v6l4 2" />
        </svg>
      );
  }
}

const tileBase =
  "flex h-full items-center gap-3 rounded-2xl border border-teleemon-purple-200 bg-white/90 p-3.5 text-left shadow-sm backdrop-blur-sm";

const tileInteractive =
  "transition duration-200 hover:-translate-y-0.5 hover:border-teleemon-purple-400 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teleemon-purple-500";

export function ContactInfo() {
  return (
    <ul className="contact-grid" aria-label="Contact details">
      {items.map((item) => {
        const content = (
          <>
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teleemon-purple-600 text-white shadow-sm"
              aria-hidden="true"
            >
              <ContactIcon name={item.icon} />
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-teleemon-purple-500">
                {item.label}
              </span>
              <span className="break-words text-[1rem] font-semibold leading-snug text-teleemon-purple-1000">
                {item.value}
              </span>
            </span>
          </>
        );

        return (
          <li key={item.label} className={item.wide ? "contact-grid-wide" : undefined}>
            {item.href ? (
              <a
                href={item.href}
                title={item.title}
                className={`${tileBase} ${tileInteractive}`}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {content}
              </a>
            ) : (
              <div className={tileBase}>{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
