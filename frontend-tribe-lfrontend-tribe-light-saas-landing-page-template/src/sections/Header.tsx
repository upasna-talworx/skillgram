import Image from "next/image";
import SGLogo from "@/assets/Skillgram Logo.svg"; // Path to your logo as an SVG component
import Circleeffect from "@/assets/Circle.svg";

// Data for Navigation Links
const navLinks = ["Guide", "Features", "Services", "Login", "Demo"];

const Logo = () => (
  <div className="logo">
    <SGLogo className="logo-image" />
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
  <header className="header relative">
    <div className="header-bg">
      <nav className="navbar flex items-center justify-between px-6 relative z-10">
        <Logo />
        <NavLinks />
        <BookDemoButton />
      </nav>
    </div>

    {/* Decorative Circle */}
    <div className="decorative-circle absolute top-[-40px] left-[50px]">
      <Circleeffect width={147} height={143} />
    </div>
  </header>
);
