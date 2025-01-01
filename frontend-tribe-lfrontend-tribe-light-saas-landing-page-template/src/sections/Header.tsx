import Image from "next/image";

// Data for Navigation Links
const navLinks = ["Guide", "Features", "Services", "Login", "Demo"];

const Logo = () => (
  <div className="logo">
    <div className="logo-skill">
      <span className="logo-skill-text">SKILL</span>
    </div>
    <div className="logo-gram">GRAM</div>
  </div>
);

const NavLinks = () => (
  <div className="nav-links">
    {navLinks.map((link, idx) => (
      <button key={idx} className="nav-button">
        {link}
      </button>
    ))}
  </div>
);

const BookDemoButton = () => (
  <div className="book-demo">
    <span className="book-demo-text">Book Demo</span>
  </div>
);

export const Header = () => (
  <header className="header">
    <div className="header-bg">
      <nav className="navbar">
        <Logo />
        <NavLinks />
        <BookDemoButton />
      </nav>
    </div>

    {/* Decorative Circle */}
    <div className="decorative-circle">
      <Image src="/assets/Circle.svg" alt="Decorative Circle" width={147} height={143} />
    </div>
  </header>
);
