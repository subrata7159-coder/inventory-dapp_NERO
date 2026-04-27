import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Connect Wallet",
    desc: "Link your Freighter browser extension to authenticate with the Stellar testnet. Your public key becomes the owner identity.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="17" cy="15" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Manage Products",
    desc: "Add new inventory items, update stock quantities, adjust pricing, or discontinue products — all signed and committed on-chain.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Query Blockchain",
    desc: "Read the latest contract state in real-time. List products, check low-stock alerts, and calculate total inventory value instantly.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(".hiw-heading", {
      scrollTrigger: { trigger: ".hiw-heading", start: "top 85%" },
      y: 40, opacity: 0, duration: 0.7,
    });

    gsap.from(".hiw-step", {
      scrollTrigger: { trigger: ".hiw-steps", start: "top 78%" },
      y: 60, opacity: 0, stagger: 0.2, duration: 0.8, ease: "power3.out",
    });

    gsap.from(".hiw-connector", {
      scrollTrigger: { trigger: ".hiw-steps", start: "top 75%" },
      scaleX: 0, duration: 1, stagger: 0.3, ease: "power2.inOut", transformOrigin: "left center",
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="section-hiw" id="how-it-works">
      <div className="section-inner">
        <div className="hiw-heading">
          <p className="section-kicker">How It Works</p>
          <h2 className="section-title">Three Steps to Decentralized Inventory</h2>
        </div>
        <div className="hiw-steps">
          {steps.map((step, i) => (
            <div key={step.num} className="hiw-step-wrap">
              <article className="hiw-step glass">
                <div className="hiw-num">{step.num}</div>
                <div className="hiw-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </article>
              {i < steps.length - 1 && <div className="hiw-connector" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
