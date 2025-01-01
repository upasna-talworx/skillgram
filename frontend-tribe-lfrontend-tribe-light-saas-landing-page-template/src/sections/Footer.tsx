import Image from "next/image";

// Footer Data
const footerData = {
  logo: {
    text: "GRAM",
    subtext: "SKILL",
    description:
      "Have questions? We're here to help! Reach out to our support team for any assistance, Connect with us!",
  },
  sections: [
    {
      title: "Company",
      items: ["Service", "Resources", "About us"],
    },
    {
      title: "Help",
      items: ["Customer Support", "Terms & Conditions", "Privacy Policy"],
    },
  ],
  newsletter: {
    title: "Subscribe to Newsletter",
    placeholder: "Enter email address",
    buttonText: "Join",
  },
  copyright: "© Copyright 2024, All Rights Reserved by Skillgram",
};

export const Footer = () => {
  const { logo, sections, newsletter, copyright } = footerData;

  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo Section */}
          <div className="footer-logo-section">
            <div className="footer-logo">
              <div className="footer-logo-bg">
                <div className="footer-logo-main" />
                <div className="footer-logo-text">{logo.text}</div>
                <div className="footer-logo-subtext">{logo.subtext}</div>
              </div>
            </div>
            <div className="footer-description">{logo.description}</div>
          </div>

          {/* Sections */}
          {sections.map((section, index) => (
            <div key={index} className="footer-section">
              <b className="footer-section-title">{section.title}</b>
              <div className="footer-section-items">
                {section.items.map((item, idx) => (
                  <div key={idx} className="footer-section-item">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Newsletter Section */}
          <div className="footer-newsletter">
            <b className="footer-newsletter-title">{newsletter.title}</b>
            <div className="footer-newsletter-input-group">
              <input
                type="email"
                placeholder={newsletter.placeholder}
                className="footer-newsletter-input"
              />
              <button className="footer-newsletter-button">
                {newsletter.buttonText}
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Footer Text */}
        <div className="footer-copyright">{copyright}</div>
      </div>
    </div>
  );
};
