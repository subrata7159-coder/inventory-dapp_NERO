import { useRef, useEffect } from "react";

export default function Starfield({ starCount = 220 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let mouse = { x: 0, y: 0 };

    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + 0.3,
      baseOpacity: Math.random() * 0.6 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.0003 + 0.0001,
      drift: (Math.random() - 0.5) * 0.00008,
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of stars) {
        star.y += star.speed;
        star.x += star.drift;
        if (star.y > 1) star.y = 0;
        if (star.x > 1) star.x = 0;
        if (star.x < 0) star.x = 1;

        const twinkle = Math.sin(time * 0.001 + star.phase) * 0.3 + 0.7;
        const px = star.x * canvas.width + mouse.x * star.r * 12;
        const py = star.y * canvas.height + mouse.y * star.r * 12;
        const opacity = star.baseOpacity * twinkle;

        ctx.beginPath();
        ctx.arc(px, py, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 235, 255, ${opacity})`;
        ctx.fill();

        if (star.r > 1.2) {
          ctx.beginPath();
          ctx.arc(px, py, star.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 229, 200, ${opacity * 0.08})`;
          ctx.fill();
        }
      }
      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [starCount]);

  return (
    <canvas
      ref={canvasRef}
      className="starfield-canvas"
      aria-hidden="true"
    />
  );
}
