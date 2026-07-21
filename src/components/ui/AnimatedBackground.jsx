import { useEffect, useRef } from "react";

/**
 * AnimatedBackground — a performant, fixed full-screen background
 * with floating gradient orbs, subtle particle dots, and a soft
 * ambient glow.  Designed to sit behind all page content and use
 * the app's existing colour palette.
 *
 * Uses CSS custom properties + requestAnimationFrame for smooth 60fps
 * animation without heavy JS re-renders.
 */
const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  // ── Canvas particle layer ──────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId = null;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create slow-floating particles
    const count = Math.min(
      40,
      Math.floor((canvas.width * canvas.height) / 18000),
    );
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 1,
        dx: (Math.random() - 0.5) * 0.35,
        dy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.35 + 0.08,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        // Move
        p.x += p.dx;
        p.y += p.dy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Subtle mouse influence (very gentle)
        const mx = mouseRef.current.x * canvas.width;
        const my = mouseRef.current.y * canvas.height;
        const dist = Math.hypot(mx - p.x, my - p.y);
        const maxDist = 300;
        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 0.006;
          p.x += (mx - p.x) * force;
          p.y += (my - p.y) * force;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 209, 197, ${p.alpha})`; // --color-aqua
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };
    draw();

    const onMouse = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouse);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full overflow-hidden"
      aria-hidden="true"
    >
      {/* ── Base gradient layer ─────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F7FAF9] via-white to-[#E8F4F2]" />

      {/* ── Animated gradient orbs ──────────────────────── */}
      {/* Orb 1 — top-left, aqua/primary */}
      <div
        className="absolute -left-[10%] -top-[10%] h-[55%] w-[55%] animate-orb-1 rounded-full opacity-40 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #4FD1C5 0%, #0F5C56 60%, transparent 80%)",
        }}
      />

      {/* Orb 2 — bottom-right, accent/gold */}
      <div
        className="absolute -bottom-[10%] -right-[8%] h-[50%] w-[50%] animate-orb-2 rounded-full opacity-30 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at 70% 70%, #F4A93B 0%, #DB8F1F 50%, transparent 75%)",
        }}
      />

      {/* Orb 3 — center-right, primary-dark */}
      <div
        className="absolute -right-[5%] top-[25%] h-[40%] w-[40%] animate-orb-3 rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, #17786F 0%, #0B4A45 60%, transparent 80%)",
        }}
      />

      {/* Orb 4 — subtle white highlight */}
      <div
        className="absolute left-[20%] top-[15%] h-[30%] w-[30%] animate-orb-4 rounded-full opacity-25 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, transparent 70%)",
        }}
      />

      {/* ── Canvas (floating dots) ──────────────────────── */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* ── Subtle grid overlay ─────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,92,86,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(15,92,86,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Soft radial vignette ────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(247,250,249,0.5)_80%)]" />
    </div>
  );
};

export default AnimatedBackground;
