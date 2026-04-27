import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: "On-Chain Inventory",
    desc: "Every product, stock update, and price change is stored immutably on the Stellar blockchain via Soroban smart contracts.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Real-Time Queries",
    desc: "Read contract state instantly — list products, check low stock alerts, and calculate total inventory value without writing on-chain.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Owner-Secured Writes",
    desc: "All write operations require Freighter wallet signatures. Only the product owner can modify stock, pricing, or discontinue items.",
  },
];

export default function Features() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(".features-heading", {
      scrollTrigger: {
        trigger: ".features-heading",
        start: "top 85%",
      },
      y: 40, opacity: 0, duration: 0.7,
    });

    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: ".features-grid",
        start: "top 80%",
      },
      y: 80, opacity: 0, rotationX: 15,
      stagger: 0.15, duration: 0.8, ease: "power3.out",
    });
  }, { scope: sectionRef });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotationY: x * 12,
      rotationX: -y * 12,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <section ref={sectionRef} className="section-features" id="features">
      <div className="section-inner">
        <div className="features-heading">
          <p className="section-kicker">Why Soroban Inventory?</p>
          <h2 className="section-title">Built for the Decentralized Future</h2>
          <p className="section-subtitle">
            Manage your product inventory with the transparency and security of blockchain technology.
          </p>
        </div>
        <div className="features-grid">
          {features.map((f) => (
            <article
              key={f.title}
              className="feature-card glass"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="feature-icon-wrap">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <div className="card-glow" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
