import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "Stellar", label: "Blockchain Network" },
  { value: "Soroban", label: "Smart Contract Platform" },
  { value: "100%", label: "On-Chain Storage" },
  { value: "Testnet", label: "Deployment Target" },
];

export default function StatsSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(".stat-item", {
      scrollTrigger: { trigger: ".stats-band", start: "top 82%" },
      y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
    });

    gsap.to(".stats-orb", {
      y: "random(-18, 18)",
      x: "random(-10, 10)",
      repeat: -1,
      yoyo: true,
      duration: "random(3, 5)",
      ease: "sine.inOut",
      stagger: { each: 0.5, from: "random" },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="section-stats" id="stats">
      <div className="stats-orb stats-orb-1" />
      <div className="stats-orb stats-orb-2" />
      <div className="section-inner">
        <div className="stats-band glass">
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <span className="stat-item-value">{s.value}</span>
              <span className="stat-item-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
