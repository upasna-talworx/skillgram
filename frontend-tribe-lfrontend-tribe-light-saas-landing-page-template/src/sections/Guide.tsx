import Step1Icon from "@/assets/Step 1 Icon.svg";
import GuideLogo from "@/assets/Guide Logo.svg";
import Step2Icon from "@/assets/Step 2 Icon.svg";
import Step3Icon from "@/assets/Step 3 Icon.svg";
import Tick from "@/assets/SVG.svg";

// Guide data structure
const guideData = {
  heading: "Hire With Few Easy Steps",
  description: [
    "Streamline Your Hiring Process in Three Simple Steps. Schedule interviews effortlessly with just a few clicks.",
    "Save time and boost efficiency in three easy steps!",
  ],
  steps: [
    {
      icon: Step1Icon,
      title: "Add Your Candidates",
      description:
        "Simply add your candidate list and let the scheduling begin. Fast, efficient, and ready to go!",
      features: [
        "Bulk import from CSV",
        "Manual entry option available",
        "Easily manage and update lists",
      ],
      buttonText: "Get started",
      buttonClass: "card-button-primary",
    },
    {
      icon: Step2Icon,
      title: "Upload Job Description",
      description:
        "Easily upload the job details to get started. No hassle, just a quick upload to kick off the process.",
      features: [
        "Quick drag-and-drop upload",
        "No formatting required",
        "Effortless job detail input",
      ],
      buttonText: "Get started",
      buttonClass: "card-button-secondary",
    },
    {
      icon: Step3Icon,
      title: "Select Rounds",
      description:
        "Choose the number of interview rounds that fit your hiring needs. Tailor the process for a perfect candidate evaluation.",
      features: [
        "Customize based on role",
        "Choose from pre-set options",
        "Full flexibility included",
      ],
      buttonText: "Get started",
      buttonClass: "card-button-tertiary",
    },
  ],
};

export const Guide = () => (
  <div className="relative w-full flex flex-col items-center justify-start text-center text-[14px] text-primary-dark font-dm-sans py-0 px-px box-border gap-[81px] mb-16 mt-16">
    {/* Guide section content */}
    <div className="flex flex-col items-center justify-start py-0 px-px gap-[55px]">
      {/* Upper section */}
      <div className="w-full max-w-[1067px] flex flex-col items-center justify-center gap-4 px-4">
        {/* Guide Banner */}
        <div className="guide-banner">
          <GuideLogo className="w-3.5 relative h-3.5 overflow-hidden shrink-0" />
          <div className="relative leading-[16.8px] font-medium">Guide</div>
        </div>
        {/* Guide heading */}
        <div className="guide-heading">
          <b className="relative leading-[48px] inline-block">{guideData.heading}</b>
        </div>
        {/* Guide description */}
        <div className="guide-description">
          <span className="w-full text-center">
            {guideData.description.map((line, idx) => (
              <p key={idx} className="m-0">{line}</p>
            ))}
          </span>
        </div>
      </div>

      {/* Cards Section */}
      <div className="card-container">
        {guideData.steps.map(({ icon: Icon, title, description, features, buttonText, buttonClass }, index) => (
          <div key={index} className="card">
            <div className="card-header">
              <Icon className="w-8 h-8 mb-4" />
              <div className="card-title">{title}</div>
              <p className="card-description">{description}</p>
            </div>
            <div className="flex flex-col items-center justify-between flex-grow">
              <ul className="card-list">
                {features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Tick className="w-4 h-4 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`card-button ${buttonClass}`}>
                {buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
