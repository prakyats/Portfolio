import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import LiquidEther from "../components/LiquidEther";

const Home = () => {
  const { scrollYProgress } = useScroll();

  // Background atmospheric transitions
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.5], ["blur(0px)", "blur(12px)", "blur(18px)"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8], [0.5, 0.25, 0.15]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <main className="relative min-h-screen bg-bg text-text w-full overflow-x-hidden">
      {/* Seamless Global Background */}
      <motion.div 
        style={{ filter: blur, opacity, scale }}
        className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden"
      >
        <div className="w-full max-w-[1240px] h-[600px] md:h-[800px]">
          <LiquidEther
            colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
            mouseForce={20}
            cursorSize={100}
            isViscous
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>
      </motion.div>

      {/* Content Layers */}
      <div className="relative z-10">
        <Hero />
        <Projects />
        <Contact />
      </div>
    </main>
  );
};

export default Home;
