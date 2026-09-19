import Image from "next/image";
import { SiteShell } from "@/components/SiteShell";
import { Highlighter } from "@/components/Highlighter";

export const metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <SiteShell bg="services">
      <header className="mb-8 flex flex-col gap-6 lg:flex-row xl:flex-row 2xl:flex-row">
        <Image
          src="/img/flower.jpg"
          alt="Lotus Flower Image"
          width={250}
          height={250}
          className="mx-auto rounded-3xl object-cover"
        />
        <div>
          <h1 className="heading-level-1">Services</h1>
          <p className="body-text">
            Choosing Teleemon means opting for exceptional mental health services. Our passionate
            and knowledgeable team is devoted to providing top-notch care in a supportive
            environment.
          </p>
          <p className="body-text">
            <Highlighter text="We're here to assist you every step of the way," /> elevating the
            standard of care and ensuring that your journey is met with{" "}
            <em>understanding and expert guidance.</em>
          </p>
        </div>
      </header>

      {[
        {
          title: "Psychiatric Evaluation & Routine Follow Up",
          icon: "/svg/service-icon_evaluation.svg",
          text: "Understanding emotional, behavioral, or developmental disorders starts with a comprehensive psychiatric evaluation. This thorough assessment considers your symptoms alongside physical, environmental, social, cognitive, emotional, and educational factors to ensure an accurate diagnosis and effective treatment.",
        },
        {
          title: "Medication Evaluation & Management",
          icon: "/svg/service-icon_medication.svg",
          text: "Our approach to medication is evidence-based and cautious, focusing on maximizing benefits while minimizing risks. We carefully consider your input to ensure the treatment plan aligns with your unique needs and goals.",
        },
        {
          title: "Treatment & Long Term Planning",
          icon: "/svg/service-icon_planning.svg",
          text: "Our evidence-based treatment plans are tailored to your specific needs, with your input as our priority. We collaborate with local mental health therapists to ensure you receive the best care. If psychotherapy is recommended, we will connect you with a therapist immediately to enhance your treatment outcomes.",
        },
      ].map((item) => (
        <article key={item.title} className="service-row section-card">
          <Image src={item.icon} alt="" width={90} height={90} />
          <div>
            <h2 className="mb-2 text-[1.4rem] font-bold text-teleemon-purple-800">{item.title}</h2>
            <p className="body-text mb-0">{item.text}</p>
          </div>
        </article>
      ))}
    </SiteShell>
  );
}
