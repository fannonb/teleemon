import Image from "next/image";
import { SiteShell } from "@/components/SiteShell";
import { insuranceCompanies } from "@/lib/site";

export const metadata = { title: "Resources" };

export default function ResourcesPage() {
  return (
    <SiteShell bg="resources">
      <header className="mb-8 flex flex-col gap-6 lg:flex-row xl:flex-row 2xl:flex-row">
        <Image
          src="/img/frank-bw-photo-with-mask.jpg"
          alt="Photo of the Provider: Frank Bashumika"
          width={250}
          height={250}
          className="mx-auto rounded-3xl object-cover"
        />
        <div>
          <h1 className="heading-level-1">Resources</h1>
          <p className="body-text">
            Choosing Teleemon means opting for exceptional mental health services. Our passionate
            and knowledgeable team is devoted to providing top-notch care in a supportive
            environment.
          </p>
          <p className="body-text">
            We&apos;re here to assist you every step of the way, elevating the standard of care and
            ensuring that your journey is met with understanding and expert guidance.
          </p>
        </div>
      </header>

      <section className="section-card mb-6">
        <h2 className="mb-3 text-xl font-semibold text-teleemon-purple-800">In case of emergency:</h2>
        <ul className="m-0 list-disc space-y-2 pl-5 text-teleemon-purple-1000">
          <li>
            If you feel like you may be having a mental health emergency, please call 911 or go to
            the nearest emergency room immediately.
          </li>
          <li>Call 911 for any life-threatening situations.</li>
          <li>
            National Suicide Prevention Lifeline:{" "}
            <a href="tel:+18002738255" className="underline">
              +1 800-273-TALK (8255)
            </a>
          </li>
          <li>Text &quot;HELLO&quot; to 741741 for immediate support via text.</li>
        </ul>
        <p className="body-text mt-4 mb-0">
          If you or a loved one are experiencing a crisis, please take immediate action to ensure
          safety and well-being.
        </p>
      </section>

      <section className="section-card">
        <h3 className="mb-2 text-xl font-semibold text-teleemon-purple-800">Insurance Companies:</h3>
        <p className="body-text">We will collaborate your care with the insurance companies listed below:</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          {insuranceCompanies.map((name) => (
            <div key={name} className="rounded-lg border border-teleemon-purple-200 bg-white/80 px-3 py-2 text-teleemon-purple-900">
              {name}
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
