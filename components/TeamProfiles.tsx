"use client";

import Image from "next/image";
import { useState } from "react";
import { Highlighter } from "@/components/Highlighter";

type Member = "frank" | "julian";

export function TeamProfiles() {
  const [active, setActive] = useState<Member>("frank");

  return (
    <div className="team-tabs">
      <div className="team-tablist" role="tablist" aria-label="Team members">
        <button
          type="button"
          role="tab"
          aria-selected={active === "frank"}
          className={`team-tab ${active === "frank" ? "is-active" : ""}`}
          onClick={() => setActive("frank")}
        >
          Meet Frank
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={active === "julian"}
          className={`team-tab ${active === "julian" ? "is-active" : ""}`}
          onClick={() => setActive("julian")}
        >
          Meet Julian
        </button>
      </div>

      {active === "frank" ? (
        <div role="tabpanel" className="team-panel">
          <div className="inner-body-bottom">
            <aside className="team-sidebar">
              <Image
                src="/img/photo-of-frank-b.jpg"
                alt="Photo of the Provider: Frank Bashumika"
                title="Photo of the Provider: Frank Bashumika"
                width={200}
                height={200}
                quality={100}
                className="profile-img"
              />
              <h2 className="team-name">Frank Bashumika</h2>
              <section className="credentials-body">
                <div className="creds-section">
                  <h3 className="creds-title">Tulane University School of Public Health</h3>
                  <h4 className="creds-text">Master of Public Health</h4>
                </div>
                <div className="creds-section">
                  <h3 className="creds-title">Walden University</h3>
                  <h4 className="creds-text">Master of Science in Nursing (MSN-PMHNP)</h4>
                </div>
                <div className="creds-section">
                  <h3 className="creds-title">Texas Tech University</h3>
                  <h4 className="creds-text">Bachelor of Science in Nursing (BSN)</h4>
                </div>
                <div className="creds-section">
                  <h3 className="creds-title">License</h3>
                  <h4 className="creds-text">Washington- AP61135663 California- 95017107</h4>
                  <p className="creds-text">Licensed in : CA, CO, RI, WA</p>
                </div>
              </section>
            </aside>

            <div className="inner-body-right">
              <blockquote className="blockquote">
                My personal experiences with ADHD & witnessing the impacts of substance use and
                mental health challenges on my close family members{" "}
                <em>have profoundly shaped the way I practice.</em>
              </blockquote>
              <p className="body-text">
                These experiences have fueled my drive to make a real difference,
                <em> even if it is for just one person.</em>
              </p>
              <p className="body-text">
                As an ADHD-dedicated provider, I understand the potential consequences of this
                condition firsthand. I specialize in substance use, medical detox, and subsequent
                management, and am fluent in assessing and managing a wide range of mental disorders.
              </p>
              <p className="body-text">
                I believe in flexible and integrative treatment approaches to fulfill your needs and
                desired objectives. My goal is to use my experience and compassion to work with you
                in addressing issues that will enhance your quality of life and help you achieve a
                sense of fulfillment.{" "}
                <Highlighter text="Open and honest communication with you is always my top priority." />
              </p>
              <p className="body-text font-semibold">
                I&apos;m committed to making positive impacts on your mental health.
              </p>
              <p className="body-text">
                Outside of my professional life, I enjoy ✈️ traveling with family and friends,
                listening to music, bowling, playing ⚽ , and volunteering to raise mental health
                awareness.
              </p>

              <div className="testimonials-container">
                <section className="testimonials-wrapper">
                  <div className="testimonials-heading">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#3007ad"
                      className="testimonials-icon"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97-1.94.284-3.916.455-5.922.505a.39.39 0 0 0-.266.112L8.78 21.53A.75.75 0 0 1 7.5 21v-3.955a48.842 48.842 0 0 1-2.652-.316c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <h2>What My Clients Say</h2>
                  </div>
                  <div className="testimonials">
                    <div className="testimonial-item">
                      <p className="index-content">
                        Frank is very professional and compassionate.
                      </p>
                      <p className="index-date">June 26, 2023</p>
                      <p className="index-name">Joseph C.</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div role="tabpanel" className="team-panel">
          <div className="inner-body-bottom">
            <aside className="team-sidebar">
              <Image
                src="/img/julian-photo-bw.jpg"
                alt="Photo of Care Coordinator: Julian Nelson"
                title="Photo of Care Coordinator: Julian Nelson"
                width={200}
                height={200}
                quality={100}
                className="profile-img"
              />
              <h2 className="team-name">Julian Nelson</h2>
              <h3 className="team-role">Teleemon Care Coordinator</h3>
            </aside>

            <div className="inner-body-right">
              <blockquote className="blockquote">
                My own personal experiences with mental health helps me to uniquely empathize and
                assist others on their mental health journeys.
              </blockquote>
              <p className="body-text">
                Julian is a proud Washingtonian, recently joining Teleemon with a wealth of
                experience in customer service and healthcare coordination. Julian&apos;s personal
                experience with mental health uniquely positions them to empathize and assist others
                on their mental health journeys. &quot;Helping someone struggling with mental health
                is meaningful to me,&quot; says Julian, who is determined to go above and beyond to
                ensure your needs are met.
              </p>
              <p className="body-text">
                Julian has also pursued international studies and speaks Japanese. Outside of their
                professional life, Julian enjoys playing video games, reading and writing, creating
                costumes, and hiking.
              </p>
              <p className="body-text">
                <Highlighter text="Julian is excited to work with you and support you on your mental health journey," />{" "}
                bringing both professional expertise and personal compassion to the table.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
