import { SiteShell } from "@/components/SiteShell";
import { siteConfig } from "@/lib/site";

export const metadata = { title: "Privacy Policy" };

const sections = [
  {
    title: "Information We Collect",
    body: "We use Google Analytics to collect standard internet log information and details of visitor behavior patterns. This helps us understand how visitors use our site, but does not identify anyone personally. We do not collect any personal health information through our website.",
  },
  {
    title: "Cookies",
    body: "We use cookies to improve your experience on our site and to help us understand how you use it. These cookies do not contain any personally identifiable information or health-related data.",
  },
  {
    title: "How We Use Your Information",
    body: "The information we collect through our website is used solely for improving our website and enhancing user experience. We do not use this data for any clinical purposes or combine it with any health information.",
  },
  {
    title: "Data Security",
    body: "We implement a variety of security measures to maintain the safety of your personal information. However, no internet-based site can be 100% secure, so we cannot be held responsible for breaches of confidentiality due to Internet-based security failures.",
  },
  {
    title: "Third-Party Disclosure",
    body: "We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.",
  },
  {
    title: "HIPAA Compliance",
    body: "While this privacy policy governs our website's data practices, any health information you provide directly to our clinic is protected under the Health Insurance Portability and Accountability Act (HIPAA). For information about your HIPAA rights and how we protect your health information, please refer to our Notice of Privacy Practices provided during your clinic visit.",
  },
  {
    title: "Your Rights",
    body: "You have the right to request access to the information we have about you. If you would like a copy of this information, please contact us. You may also have other rights under applicable data protection laws.",
  },
  {
    title: "Changes to This Policy",
    body: "We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date below.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <SiteShell bg="privacy">
      <h1 className="heading-level-1">Privacy Policy</h1>
      <p className="body-text">
        At Teleemon Behavioral Health, we are committed to protecting your privacy and maintaining
        the confidentiality of your health information. This Privacy Policy explains how we collect,
        use, and safeguard your information when you visit our website.
      </p>

      {sections.map((section) => (
        <section key={section.title} className="section-card mb-4">
          <h2 className="mb-2 text-xl font-semibold text-teleemon-purple-800">{section.title}</h2>
          <p className="body-text mb-0">{section.body}</p>
        </section>
      ))}

      <section className="section-card">
        <h2 className="mb-2 text-xl font-semibold text-teleemon-purple-800">Contact Us</h2>
        <p className="body-text mb-0">
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <a href={`mailto:${siteConfig.email}`} className="underline">
            {siteConfig.email}
          </a>
          .
        </p>
      </section>
    </SiteShell>
  );
}
