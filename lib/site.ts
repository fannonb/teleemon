export const siteConfig = {
  name: "Teleemon Behavioral Health",
  tagline: "Greater Seattle Area",
  description:
    "Teleemon Behavioral Health is dedicated to empowering and supporting our patients on their mental health journey. We provide compassionate, personalized care to help individuals overcome challenges.",
  email: "info@teleemon.com",
  officePhone: "+1 425-615-9655",
  officePhoneHref: "tel:+14256159655",
  phone: "+1 425-615-8930",
  phoneHref: "tel:+14256158930",
  fax: "206-420-0376",
  address: "16301 NE 8th, Suite 233 Bellevue, WA 98008",
  mapsUrl: "https://maps.app.goo.gl/dZ6iWZvScGvPhKWNA",
  hours: "9:00 A.M.- 9:00 P.M. (Mon-Sat)",
  url: "https://www.teleemon.com",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/our-team", label: "Our Team" },
  { href: "/services", label: "Services" },
  { href: "/treatments", label: "Treatments" },
  { href: "/resources", label: "Resources" },
] as const;

export const focusAreas = [
  "AHDH/ADD",
  "Autism Spectrum",
  "Anxiety Disorder",
  "Bipolar Disorder",
  "Chronic Impulsivity",
  "Depression",
  "Mood Disorder",
  "Panic Disorder",
  "Schizophrenia",
  "Obsessive Compulsive Disorder (OCD)",
  "Sobriety Management",
  "Substance Use Disorder & Co-Occurring Mental Disorders",
];

export const insuranceCompanies = [
  "Aetna",
  "Amerigroup",
  "Cigna",
  "First Choice",
  "Healthnet",
  "Kaiser",
  "Magellan",
  "Medicare",
  "Railroad",
  "Molina",
  "Optum Humana",
  "Premera",
  "Providence",
  "Regence",
  "UHC",
];

export const treatments = [
  {
    slug: "adhd",
    title: "ADHD - Attention Deficit Hyperactivity Disorder",
    icon: "/img/treatment-icons/adhd.png",
    points: [
      "ADHD (Attention Deficit Hyperactivity Disorder) is a developmental condition characterized by persistent patterns of inattention, hyperactivity, and impulsivity.",
      "These symptoms can significantly disrupt daily activities and relationships, typically emerging in childhood and often continuing into adolescence and adulthood.",
    ],
  },
  {
    slug: "autism",
    title: "Autism Spectrum",
    icon: "/img/treatment-icons/autism.png",
    points: [
      "Autism Spectrum Disorder (ASD) is a developmental disorder characterized by challenges with social interaction, communication, and repetitive behaviors.",
      "Symptoms can vary widely in severity and may include difficulty in understanding social cues, restricted interests, and repetitive movements.",
      'ASD is called a "spectrum" disorder because it affects each person differently, with varying degrees of severity and different combinations of symptoms.',
    ],
  },
  {
    slug: "substance",
    title: "Substance Use and Co-Occurring Mental Disorders",
    icon: "/img/treatment-icons/substance.png",
    points: [
      "Substance Use Disorder (SUD) is a treatable mental health condition that affects a person's brain and behavior, making it difficult to control the use of substances such as drugs, alcohol, or medications.",
      "Symptoms can range from moderate to severe, with addiction being the most severe form. Individuals with SUD often have other mental health disorders, and vice versa.",
    ],
  },
  {
    slug: "mood",
    title: "Mood Disorders",
    icon: "/img/treatment-icons/mood.png",
    points: [
      "Mood disorders encompass a range of mental health conditions, including various types of depression and bipolar disorders.",
      "These conditions can affect individuals of all ages, though symptoms may vary between children, teens, and adults. Treatment options include therapy, antidepressants, support, and self-care strategies.",
    ],
  },
  {
    slug: "depression",
    title: "Depression",
    icon: "/img/treatment-icons/depression.png",
    points: [
      "Depression is a serious mood disorder that affects your entire body, including your mood and thoughts.",
      "It impacts every aspect of life and is caused by a chemical imbalance in the brain, not by personal weakness or character flaws.",
      "Experiencing one episode of depression increases the risk of recurrent episodes throughout life.",
    ],
  },
  {
    slug: "anxiety",
    title: "Anxiety Disorder",
    icon: "/img/treatment-icons/anxiety.png",
    points: [
      "While occasional anxiety is a normal part of life, anxiety disorders involve intense, excessive, and persistent worry and fear about everyday situations.",
      "These disorders often include repeated episodes of sudden, intense anxiety and fear (panic attacks) that peak within minutes.",
    ],
  },
  {
    slug: "panic",
    title: "Panic Disorder",
    icon: "/img/treatment-icons/panic.png",
    points: [
      "A panic attack is a sudden episode of intense fear that triggers severe physical reactions without any real danger or apparent cause.",
      "These episodes can be extremely frightening, making individuals feel as if they are losing control, having a heart attack, or even dying.",
    ],
  },
  {
    slug: "ocd",
    title: "OCD - Obsessive Compulsive Disorder",
    icon: "/img/treatment-icons/ocd.png",
    points: [
      "OCD is a mental health condition characterized by unwanted repetitive thoughts or sensations (obsessions) and the urge to perform certain actions repeatedly (compulsions).",
      "Some individuals experience both obsessions and compulsions.",
    ],
  },
  {
    slug: "bipolar",
    title: "Bipolar Disorder",
    icon: "/img/treatment-icons/bipolar.png",
    points: [
      "Bipolar disorder is a mood disorder characterized by extreme mood swings that go beyond normal ups and downs.",
      "Individuals experience periods of elevated mood and energy (mania) followed by periods of depression.",
      "Due to these alternating episodes, bipolar disorder is also known as manic depression.",
    ],
  },
  {
    slug: "sobriety",
    title: "Sobriety Management",
    icon: "/img/treatment-icons/sobriety.png",
    points: [
      "Achieving and maintaining sobriety can be a significant challenge, but effective support and medication can make all the difference.",
      "Our comprehensive approach ensures you receive the best care and support on your journey to a healthier, substance-free life.",
      "We offer medication-assisted treatment using options like Suboxone, Revia, or Vivitrol to help you manage cravings and sustain your commitment to sobriety.",
    ],
  },
  {
    slug: "schizophrenia",
    title: "Schizophrenia",
    icon: "/img/treatment-icons/schizophrenia.png",
    points: [
      "Schizophrenia is a severe mental illness that affects brain function, leading to significant issues with thinking, emotions, and perception of reality.",
      "Symptoms include hallucinations (hearing or seeing things that are not there) and delusions (strongly held false beliefs).",
    ],
  },
] as const;
