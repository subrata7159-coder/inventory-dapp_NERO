import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { key: "home", label: "Home" },
  { key: "features", label: "Features" },
  { key: "how-it-works", label: "How It Works" },
  { key: "console", label: "Console" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useGSAP(() => {
    gsap.from(".nav-inner", {
      y: -30, opacity: 0, duration: 0.6, ease: "power3.out", delay: 0.3,
    });

    ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => {
        if (navRef.current) {
          navRef.current.classList.toggle("nav-scrolled", self.direction === 1 && self.scroll() > 80);
        }
      },
    });
  }, { scope: navRef });

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav ref={navRef} className="main-nav glass" id="main-nav">
      <div className="nav-inner">
        <button type="button" className="nav-logo" onClick={() => scrollTo("home")}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12 2a10 10 0 010 20M12 2a10 10 0 000 20M2 12h20" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <span>Soroban Inventory</span>
        </button>

        <div className={`nav-links${mobileOpen ? " nav-links-open" : ""}`}>
          {navLinks.map((link) => (
            <button
              key={link.key}
              type="button"
              className="nav-link"
              onClick={() => scrollTo(link.key)}
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className={`hamburger${mobileOpen ? " open" : ""}`}>
            <span /><span /><span />
          </span>
        </button>
      </div>
    </nav>
  );
}
