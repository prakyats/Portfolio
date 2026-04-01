import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xPct = (clientX / innerWidth - 0.5) * 2;
    const yPct = (clientY / innerHeight - 0.5) * 2;
    mouseX.set(xPct * 4);
    mouseY.set(yPct * 4);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden"
    >
      {/* Content */}
      <motion.div
        style={{
          x: isMobile ? 0 : smoothX,
          y: isMobile ? 0 : smoothY,
          transform: isMobile ? 'translateY(-2%)' : 'translateY(-3%)'
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-[720px] mx-auto w-full text-center px-6 pointer-events-auto"
      >
        <motion.p
          variants={itemVariants}
          className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/40 mb-2"
        >
          FULL STACK DEVELOPER
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl font-medium tracking-wide text-white/85 mb-2"
        >
          Prakyat Shetty
        </motion.p>

        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: 'Georgia, serif',
            textShadow: '0 2px 20px rgba(0,0,0,0.6)'
          }}
          className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-white mb-4"
        >
          I build Systems <br className="hidden md:block" /> that actually work.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-white/60 mb-6 tracking-wide"
        >
          Full-stack • System-focused
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center"
        >
          <a
            href="#work"
            className="bg-white text-black px-8 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            View Work
          </a>
          <a
            href="/RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
