import BagSVG from "@/assets/Bag SVG.svg"; // Import the SVG as a React component

// Data for Upper Section
const upperSectionData = {
  bannerLabel: "Services",
  heading: "Simplifying Hiring with Advanced Solutions",
  description:
    "Our range of innovative tools helps you streamline recruitment, from creating job events to scheduling interviews and shortlisting through quizzes.",
};

// Data for Cards
const cardData = [
  {
    heading: "Shortlisting",
    description:
      "Use custom quizzes to evaluate candidates based on skills and knowledge. Quickly assess their abilities and shortlist the most suitable candidates for your job roles, ensuring a better selection process.",
  },
  {
    heading: "Create Job Events",
    description:
      "Our platform helps you organize job events seamlessly, connecting you with the right candidates. From virtual job fairs to on-site meetups, we ensure your recruitment events are impactful and efficient.",
  },
  {
    heading: "Schedule Interviews",
    description:
      "Streamline your hiring process with our easy-to-use scheduling tool. Set up interviews with just a few clicks, and manage multiple candidates effortlessly, saving time and enhancing candidate experience.",
  },
];

// ServiceBanner Component
const ServiceBanner = ({ label }: { label: string }) => (
  <div className="servicebanner">
    <BagSVG className="servicelogo" />
    <div className="servicelabeltext">{label}</div>
  </div>
);

// ServiceHeading Component
const ServiceHeading = ({ text }: { text: string }) => (
  <div className="serviceheading">
    <b className="serviceheadingtextstyle">{text}</b>
  </div>
);

// ServiceDescription Component
const ServiceDescription = ({ text }: { text: string }) => (
  <div className="servicessectiondescription">{text}</div>
);

// Card Component
const Card = ({ heading, description }: { heading: string; description: string }) => (
  <div className="card">
    <div className="cardheading">{heading}</div>
    <div className="carddescription">{description}</div>
  </div>
);

// CardsSection Component
const CardsSection = () => (
  <div className="cardssection">
    {cardData.map((card, index) => (
      <Card key={index} heading={card.heading} description={card.description} />
    ))}
  </div>
);

// UpperSection Component
const UpperSection = () => (
  <div className="uppersection">
    <ServiceBanner label={upperSectionData.bannerLabel} />
    <ServiceHeading text={upperSectionData.heading} />
    <ServiceDescription text={upperSectionData.description} />
  </div>
);

export const Services = () => (
  <div className="servicesection">
    {/* Upper Section */}
    <UpperSection />

    {/* Cards Section */}
    <CardsSection />
  </div>
);
