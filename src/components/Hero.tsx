import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const ROLES = ["Full Stack Developer", "System Architect", "Backend Engineer"];

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 28, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Typewriter
  useEffect(() => {
    const target = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIdx]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const xPct = (e.clientX / window.innerWidth - 0.5) * 2;
    const yPct = (e.clientY / window.innerHeight - 0.5) * 2;
    mouseX.set(xPct * 5);
    mouseY.set(yPct * 5);
  };

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden"
    >
      {/* Ambient ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] rounded-full border border-white/[0.03] animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute w-[500px] h-[500px] rounded-full border border-white/[0.04]" />
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

        {/* Typewriter role */}
        <motion.div variants={item} className="h-8 flex items-center justify-center mb-8">
          <span className="text-sm md:text-base font-mono text-[hsl(var(--accent))] tracking-wide">
            {displayed}
            <span className="cursor-blink ml-0.5 text-[hsl(var(--accent))]">|</span>
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap gap-4 justify-center">
          <a
            href="#work"
            className="group relative bg-white text-black px-8 py-3.5 rounded-full text-sm font-medium tracking-tight overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_hsla(22,90%,62%,0.25)]"
          >
            <span className="relative z-10">View Work</span>
            <div className="absolute inset-0 bg-[hsl(var(--accent))] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </a>
          <a
            href="/RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/15 text-white px-8 py-3.5 rounded-full text-sm font-medium tracking-tight hover:bg-white/8 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
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
