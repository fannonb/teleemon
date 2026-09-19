import { Highlighter } from "@/components/Highlighter";
import { SiteShell } from "@/components/SiteShell";
import { TeamProfiles } from "@/components/TeamProfiles";

export const metadata = { title: "Our Team" };

export default function OurTeamPage() {
  return (
    <SiteShell bg="our-team">
      <header className="mb-2">
        <h1 className="heading-level-1">
          <span className="waving-hand" aria-hidden="true">
            👋🏾
          </span>{" "}
          Meet Our Team
        </h1>
        <p className="body-text mb-2">
          Teleemon&apos;s guiding light is our patients. Our focus is on providing compassionate,
          expert, and caring support through every step of your mental health journey.
        </p>
        <p className="body-text mb-2">
          Our staff is passionate, knowledgeable, and committed to providing the very best in mental
          health care. We are dedicated to creating a supportive atmosphere and devoted to{" "}
          <Highlighter text="helping you achieve your unique mental health goals and objectives." />
        </p>
      </header>

      <TeamProfiles />
    </SiteShell>
  );
}
