import Image from "next/image";
import { Highlighter } from "@/components/Highlighter";
import { SiteShell } from "@/components/SiteShell";
import { treatments } from "@/lib/site";

export const metadata = { title: "Treatments" };

export default function TreatmentsPage() {
  return (
    <SiteShell bg="treatments">
      <header className="mb-8">
        <h1 className="heading-level-1">Treatment Options</h1>
        <p className="body-text">
          Our goal is elevating the standard of mental healthcare, and ensuring that your journey is
          met with understanding and expert guidance. From initial consultation to ongoing support,
          we strive to create a welcoming atmosphere where you feel comfortable and empowered to
          take control of your mental health.
        </p>
        <p className="body-text">
          Our evidence-based treatment plans are tailored to your specific needs, with{" "}
          <Highlighter text="your input as our priority." /> We collaborate with local mental health
          therapists to ensure you receive the best care.
        </p>
      </header>

      <div className="treatment-grid">
        {treatments.map((item) => (
          <article key={item.slug} className="treatment-item section-card">
            <Image src={item.icon} alt="" width={64} height={64} />
            <div>
              <h2 className="mb-2 text-lg font-bold text-teleemon-purple-800">{item.title}</h2>
              <ul className="m-0 list-disc space-y-2 pl-5 text-teleemon-purple-1000">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </SiteShell>
  );
}
