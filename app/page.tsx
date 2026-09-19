import Image from "next/image";
import { Highlighter } from "@/components/Highlighter";
import { SiteShell } from "@/components/SiteShell";
import { focusAreas, siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <SiteShell bg="home">
      <header className="relative mb-8 flex min-h-[300px] w-full items-start gap-5 md:min-h-0 md:flex-col sm:min-h-0 sm:flex-col">
        <div className="header-left relative w-3/12 px-0 pt-5 md:mx-auto md:w-full sm:mx-auto sm:w-full">
          <div className="absolute inset-0 flex justify-center p-5">
            <div className="absolute top-0 h-40 w-40 rounded-full bg-blue-400 opacity-[90%] mix-blend-multiply blur-2xl" />
            <div className="absolute top-[70px] h-40 w-40 rounded-full bg-pink-400 opacity-[60%] mix-blend-multiply blur-2xl" />
          </div>
          <div className="absolute -left-5 top-3 flex px-8 opacity-[.7] mix-blend-multiply md:relative md:left-0 md:top-8 md:mx-auto md:px-2 sm:relative sm:left-0 sm:top-2 sm:mx-auto sm:px-2 lg:top-3">
            <Image
              src="/svg/teleemon-logo-icon-only_purple.svg"
              alt="Teleemon Logo"
              title="Teleemon Logo"
              width={220}
              height={220}
              priority
              className="animate-in-slow relative mx-auto sm:mb-10 sm:max-w-[200px]"
            />
          </div>
        </div>
        <div className="header-right relative -mt-3 mb-12 w-9/12 pl-5 md:-mt-5 md:mb-12 md:w-full md:pl-0 sm:mb-5 sm:w-full sm:pl-0 lg:-mt-5 lg:mb-12">
          <h1 className="heading-level-1 py-2 font-semibold">Welcome!</h1>
          <p className="body-text intro-text">
            At our practice, we are deeply passionate about empowering and supporting our patients.
            Our dedication lies in helping you discover and embrace the best version of yourself.
            Whether you&apos;re seeking guidance for personal growth, managing a mental health
            condition, or looking to improve your overall well-being, we are here to provide the
            compassionate and personalized care you deserve.
          </p>
          <p className="body-text intro-text mt-3">
            At Teleemon, we welcome everyone, embracing all sexual orientations, races, ethnicities,
            and religions. Your well-being is our priority in a respectful and inclusive space. With a
            deep passion for empowering and supporting our patients, we&apos;re dedicated to helping
            you discover <Highlighter text="the best version of yourself!" />
          </p>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
        {[
          {
            title: "Evaluation",
            icon: "/svg/service-icon_evaluation.svg",
            text: "Uncover the impact of your symptoms on daily life and relationships with expert insights.",
          },
          {
            title: "Planning",
            icon: "/svg/service-icon_planning.svg",
            text: "Empower your recovery with personalized strategies tailored to your mental wellness journey.",
          },
          {
            title: "Medication",
            icon: "/svg/service-icon_medication.svg",
            text: "Experience tailored medication management designed to effectively address your unique needs and symptoms.",
          },
        ].map((item) => (
          <article key={item.title} className="section-card text-center">
            <Image src={item.icon} alt={`${item.title} icon`} width={80} height={80} className="mx-auto mb-3" />
            <h2 className="mb-2 text-xl font-bold text-teleemon-purple-800">{item.title}</h2>
            <p className="body-text mb-0">{item.text}</p>
          </article>
        ))}
      </div>

      <section className="focus-heading-wrap relative mt-10 flex w-full flex-col items-center justify-center">
        <h3 className="focus-heading relative z-[400] mt-3 flex w-full items-center justify-center rounded-tl-3xl rounded-tr-3xl bg-white pb-1.5 pl-3 pt-2.5 text-[1.3rem] font-bold text-teleemon-purple-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="#3007ad"
            className="relative top-1 mr-2 w-[20px]"
            aria-hidden="true"
          >
            <path d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z" />
          </svg>
          <span>Our Primary Areas of Focus</span>
        </h3>
      </section>

      <section className="home-body-bottom relative -top-[60px] mt-5 mb-5 flex w-full items-center justify-center gap-5 rounded-tl-3xl rounded-tr-3xl border-4 border-white pb-10 pt-2 md:flex-col sm:flex-col">
        <div className="body-left fade max-h-[400px] overflow-y-auto sm:max-h-[300px] sm:overflow-y-hidden">
          <div className="body-left-inner">
            <ul className="home-list flex flex-col text-2xl md:w-full md:justify-center md:text-center md:text-3xl sm:w-full sm:justify-center sm:text-center sm:text-3xl">
              {focusAreas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="body-right mt-10 h-full md:mt-5 sm:mt-5">
          <Image
            src="/img/stones-on-beach.jpg"
            alt="Photo of stones on beach"
            title="Photo of stones on beach"
            width={300}
            height={300}
            quality={100}
            className="img-outline animate-in-slow relative -left-10 top-[15px] mx-auto my-3 scale-125 rounded-3xl bg-white mix-blend-multiply md:left-0 md:mb-7 sm:left-0 sm:mb-7 sm:w-full"
          />
        </div>
      </section>

      <section className="contact-section relative -top-[50px] mx-auto flex w-full items-start justify-start px-[10%] pb-[50px] pt-10 md:flex-col md:justify-center md:px-[5%] md:text-center sm:flex-col sm:justify-center sm:px-[5%] sm:pb-[20px] sm:text-center">
        <div className="w-full pr-[30px] md:px-2.5 sm:px-2.5">
          <h3 className="heading-level-5 flex items-end justify-center pt-4 text-center leading-tight text-teleemon-purple-800 md:justify-center md:text-center sm:justify-center sm:pt-1 sm:text-center">
            Contact Info
          </h3>
          <div className="mt-2 text-center md:w-full md:justify-center md:text-center sm:w-full sm:justify-center sm:text-center">
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open our map address in a new tab"
              className="mt-5 text-base text-teleemon-purple-700 underline hover:cursor-pointer hover:text-teleemon-purple-500 md:mb-2 md:text-xl sm:mb-2 sm:text-xl"
            >
              {siteConfig.address}
            </a>
            <a
              href={siteConfig.officePhoneHref}
              title="Give us a call on our primary office line."
              className="mt-1 flex justify-center text-center text-[.9rem] font-bold text-teleemon-purple-600 hover:text-teleemon-purple-400 hover:underline md:mb-2 md:mt-2 md:justify-center md:text-[1.1rem] sm:mb-2 sm:mt-2 sm:justify-center sm:text-[1.1rem]"
            >
              Office: + 1 425-615-9655
            </a>
            <a
              href={siteConfig.phoneHref}
              title="Give us a call on our secondary line."
              className="my-1 flex justify-center text-center text-[.9rem] font-bold text-teleemon-purple-600 hover:text-teleemon-purple-400 hover:underline md:mb-2 md:justify-center md:text-[1.1rem] sm:mb-2 sm:justify-center sm:text-[1.1rem]"
            >
              Phone: + 1 425-615-8930
            </a>
            <div className="text-black text-[.9rem] md:mb-2 md:text-[1.1rem] sm:mb-2 sm:text-[1.1rem]">
              Fax: {siteConfig.fax}
            </div>
            <a
              href={`mailto:${siteConfig.email}?subject=Email%20from%20Teleemon.com&body=Hello%20Teleemon%20Team,%0D%0A%0D%0AI%20am%20reaching%20out%20regarding%20your%20services.%0D%0A%0D%0A%0D%0AThank%20you!`}
              title="Send us an email!"
              className="btn btn-tertiary btn-sm mt-2 text-sm text-black transition-all duration-200 hover:cursor-pointer hover:bg-teleemon-purple-800 hover:text-white"
            >
              {siteConfig.email}
            </a>
            <div className="mt-4 text-[1.1rem] text-teleemon-blue-900">Hours: {siteConfig.hours}</div>
          </div>
          <div className="mt-6 flex w-full flex-col items-center justify-center text-center md:my-5 sm:my-5">
            <h4 className="mb-2 font-semibold text-teleemon-purple-700">
              * Same day appointments available
            </h4>
            <p className="body-text mb-0 max-w-xl text-sm">
              If you feel like you may be having a mental health emergency, please call 911 or go to
              the nearest emergency room immediately.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
