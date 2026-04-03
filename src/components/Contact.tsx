import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const Contact = () => {
  return (
    <SectionWrapper id="contact" className="relative py-48 md:py-64 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-white/[0.03] blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto w-full">
        <span className="text-[10px] md:text-xs text-white/30 uppercase tracking-[0.3em] block mb-8">
          Next Steps
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-12 text-white/90">
          Let's build something <span className="font-serif italic text-white/50">meaningful</span> together.
        </h2>

        <motion.a
          href="mailto:shettyprakyat15@gmail.com"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          whileTap={{ scale: 0.95 }}
          className="relative group inline-flex items-center justify-center gap-3 rounded-[32px] px-8 py-4 md:px-10 md:py-5 text-xs md:text-sm text-text border border-white/10 bg-surface/20 backdrop-blur-md transition-colors duration-300"
        >
          <span>Say Hi !</span>
          <span className="text-white/30 group-hover:text-white transition-colors duration-300">↗</span>
        </motion.a>

        <div className="mt-32 w-full flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-8 gap-8 text-[10px] md:text-xs text-white/40 uppercase tracking-[0.2em]">
          <div className="flex items-center justify-center gap-6 sm:gap-8">
            <a href="https://linkedin.com/in/prakyatshetty" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">LinkedIn</a>
            <a href="https://github.com/prakyats" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">GitHub</a>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_10px_var(--accent)]" />
            <span className="opacity-70">Available for projects</span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
