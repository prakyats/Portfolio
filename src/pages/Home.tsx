/**
 * Home — Performance fixes:
 *
 *  - REMOVED animated filter:blur() on the LiquidEther wrapper.
 *    Animating CSS `filter` on a fixed full-viewport element forces the browser
 *    to repaint the entire GPU layer every frame — the single biggest perf killer.
 *    Replaced with a static CSS blur that is applied only after the user has
 *    scrolled past the hero, using a CSS class toggle via IntersectionObserver.
 *    The class transition uses `transition: filter 600ms` which the browser can
 *    handle in a single composite step rather than per-scroll-event.
 *
 *  - opacity still driven by useTransform (cheap, compositor-only).
 *  - scale still driven by useTransform (compositor-only).
 *  - blur is now CSS class-based — zero JS per scroll frame for that property.
 */
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import LiquidEther from "../components/LiquidEther";

const Home = () => {
  const heroSentinelRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  // opacity and scale are compositor-only properties — safe to animate per-frame.
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.75], [0.55, 0.2, 0.1]);
  const scale   = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Swap the blur via IntersectionObserver + CSS class — no per-frame JS.
  useEffect(() => {
    const sentinel = heroSentinelRef.current;
    const bg = bgRef.current;
    if (!sentinel || !bg) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bg.classList.remove("bg-blurred");
        } else {
          bg.classList.add("bg-blurred");
        }
      },
      { threshold: 0.1 }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen bg-bg text-text w-full overflow-x-hidden">

      {/* Sentinel sits at the bottom of the hero — when it leaves view, blur kicks in */}
      <div ref={heroSentinelRef} className="absolute top-[90vh] h-px w-px pointer-events-none" aria-hidden />

      {/* LiquidEther background */}
      <motion.div
        ref={bgRef}
        style={{ opacity, scale }}
        className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden liquid-bg"
      >
        <div className="w-full max-w-[1240px] h-[600px] md:h-[800px]">
          <LiquidEther
            colors={['#e8623a', '#c94a8a', '#6644dd']}
            mouseForce={22}
            cursorSize={110}
            isViscous
            viscous={28}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo
            autoSpeed={0.45}
            autoIntensity={2.4}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </div>
    </main>
  );
};

export default Home;
