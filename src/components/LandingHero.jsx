import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function LandingHero({ onLaunch }) {
  const heroRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-kicker", { y: 30, opacity: 0, duration: 0.7 })
      .from(".hero-title-line", { y: 60, opacity: 0, rotationX: 40, stagger: 0.15, duration: 0.9 }, "-=0.3")
      .from(".hero-subtitle", { y: 25, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(".hero-cta-group", { y: 30, opacity: 0, duration: 0.6 }, "-=0.3")
      .from(".hero-badge", { scale: 0.7, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.4");

    gsap.to(".hero-orb-1", { y: -20, x: 10, repeat: -1, yoyo: true, duration: 4, ease: "sine.inOut" });
    gsap.to(".hero-orb-2", { y: 15, x: -15, repeat: -1, yoyo: true, duration: 5, ease: "sine.inOut" });
    gsap.to(".hero-orb-3", { y: -12, x: 8, repeat: -1, yoyo: true, duration: 3.5, ease: "sine.inOut" });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="landing-hero" id="home">
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div className="hero-content perspective-container">
        <p className="hero-kicker">
          <span className="kicker-icon">◆</span> Built on Soroban · Stellar Blockchain
        </p>
        <h1 className="hero-title">
          <span className="hero-title-line">Inventory Management</span>
          <span className="hero-title-line accent-line">On The Blockchain</span>
        </h1>
        <p className="hero-subtitle">
          A production-grade decentralized inventory console powered by Soroban smart contracts.
          Add products, manage stock, track value — all on-chain with Freighter wallet.
        </p>
        <div className="hero-cta-group">
          <button type="button" className="btn-hero-primary" onClick={onLaunch}>
            <span>Launch Console</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <a href="https://developers.stellar.org/docs/build/smart-contracts/overview" target="_blank" rel="noopener noreferrer" className="btn-hero-outline">
            Read the Docs
          </a>
        </div>
        <div className="hero-badges">
          <span className="hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2"/></svg>
            Owner-Secured
          </span>
          <span className="hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            Real-Time Queries
          </span>
          <span className="hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
            100% On-Chain
          </span>
        </div>
      </div>
    </section>
  );
}
