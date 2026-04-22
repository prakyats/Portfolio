/**
 * Hero — Performance fixes:
 *
 *  1. isMobile: was useState+useEffect+addEventListener → now a single
 *     matchMedia().matches read at module level. Zero re-renders, zero listener.
 *
 *  2. Typewriter isolated into <TypewriterLine> sub-component. Its setState fires
 *     every 30–55ms; keeping it in Hero caused the entire Hero (including two
 *     useSpring instances, motion variants, mouse handler) to re-render on each
 *     character. Now only the 3-token span re-renders per tick.
 *
 *  3. "transition-all" on CTA: replaced with transition-shadow + transition-colors
 *     + transition-transform. "transition-all" forces the browser to track every
 *     CSS property for transitions, including layout-affecting ones.
 *
 *  4. backdrop-blur removed from Resume button. Each backdrop-blur element
 *     creates a compositor layer. The badge keeps it (small, important).
 *
 *  5. Outer ambient ring: removed animate-pulse (it was invisible at 0.03 opacity).
 *     Inner ring keeps the pulse (slightly more visible).
 */
import { motion, useMotionValue, useSpring, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ROLES = ["Full Stack Developer", "Mobile Developer", "System Architect"];

const isMobile =
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

// ── Typewriter isolated so its frequent setState doesn't re-render Hero ──────
const TypewriterLine = () => {
  const roleIdx = useRef(0);
  const typing  = useRef(true);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const target = ROLES[roleIdx.current];
    let t: ReturnType<typeof setTimeout>;
    if (typing.current) {
      if (displayed.length < target.length) {
        t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 55);
      } else {
        t = setTimeout(() => { typing.current = false; setDisplayed(target); }, 2000);
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), 30);
      } else {
        roleIdx.current = (roleIdx.current + 1) % ROLES.length;
        typing.current  = true;
        setDisplayed("");
      }
    }
    return () => clearTimeout(t);
  }, [displayed]);

  return (
    <span className="text-sm md:text-base font-mono text-[hsl(var(--accent))] tracking-wide">
      {displayed}
      <span className="cursor-blink ml-0.5">|</span>
    </span>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 28, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 28, stiffness: 120 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    mouseX.set((e.clientX / window.innerWidth - 0.5) * 10);
    mouseY.set((e.clientY / window.innerHeight - 0.5) * 10);
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden"
    >
      {/* Ambient rings — outer is static, inner pulses once every 4s */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
        <div className="w-[700px] h-[700px] rounded-full border border-white/[0.03]" />
        <div
          className="absolute w-[500px] h-[500px] rounded-full border border-white/[0.04] animate-pulse"
          style={{ animationDuration: "4s" }}
        />
      </div>

      <motion.div
        style={{ x: isMobile ? 0 : smoothX, y: isMobile ? 0 : smoothY, translateY: "-3%" }}
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-[780px] mx-auto w-full text-center px-6 pointer-events-auto"
      >
        {/* Status badge */}
        <motion.div variants={item} className="flex items-center justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))] glow-dot animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-white/50 font-medium">
              Available for Internships
            </span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.p
          variants={item}
          className="text-base md:text-lg font-light text-white/50 tracking-widest uppercase mb-3"
          style={{ letterSpacing: "0.3em" }}
        >
          Prakyat Shetty
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.05] text-white mb-4"
          style={{ textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}
        >
          I build Systems<br className="hidden md:block" />
          <span className="italic text-white/75"> that actually work.</span>
        </motion.h1>

        {/* Typewriter — isolated component, re-renders won't bubble up to Hero */}
        <motion.div variants={item} className="h-8 flex items-center justify-center mb-8">
          <TypewriterLine />
        </motion.div>

        {/* CTAs — specific transitions only, no transition-all */}
        <motion.div variants={item} className="flex flex-wrap gap-4 justify-center">
          <a
            href="#work"
            className="group relative bg-white text-black px-8 py-3.5 rounded-full text-sm font-medium tracking-tight overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_30px_hsla(22,90%,62%,0.25)]"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">View Work</span>
            <div className="absolute inset-0 bg-[hsl(var(--accent))] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </a>
          <a
            href="https://drive.google.com/file/d/1sVaHTtBRtKNGmlivaACbb4m0CN54uQSe/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/15 text-white px-8 py-3.5 rounded-full text-sm font-medium tracking-tight hover:bg-white/[0.08] hover:border-white/30 transition-colors duration-300"
          >
            Resume ↗
          </a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          variants={item}
          className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-white/0 via-white to-white/0"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
