import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import LiquidEther from "../components/LiquidEther";

const Home = () => {
  const { scrollYProgress } = useScroll();
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.5], ["blur(0px)", "blur(14px)", "blur(20px)"]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.7], [0.55, 0.22, 0.12]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <main className="relative min-h-screen bg-bg text-text w-full overflow-x-hidden">
      {/* Global liquid background */}
      <motion.div
        style={{ filter: blur, opacity, scale }}
        className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden"
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
