import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-content",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-48 md:py-64 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-white/[0.03] blur-[100px] pointer-events-none" />

      <div className="contact-content relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto w-full">
        <span className="text-[10px] md:text-xs text-muted/70 uppercase tracking-[0.3em] block mb-8">
          Next Steps
        </span>
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display text-text font-light tracking-tight leading-[1.1] md:leading-[1.1] mb-12">
          Let's build something <span className="italic text-muted">meaningful</span> together.
        </h2>

        <motion.a
          href="mailto:hello@prakyat.com"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          whileTap={{ scale: 0.95 }}
          className="relative group inline-flex items-center justify-center gap-3 rounded-[32px] px-8 py-4 md:px-10 md:py-5 text-xs md:text-sm text-text border border-stroke/50 bg-surface/20 backdrop-blur-md transition-colors duration-300"
        >
          <span>hello@prakyat.com</span>
          <span className="text-muted/50 group-hover:text-text transition-colors duration-300">↗</span>
        </motion.a>

        <div className="mt-32 w-full flex flex-col sm:flex-row items-center justify-between border-t border-stroke/20 pt-8 gap-8 text-[10px] md:text-xs text-muted/50 uppercase tracking-[0.2em]">
          <div className="flex items-center justify-center gap-6 sm:gap-8">
            <a href="https://twitter.com/prakyat" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors duration-300">Twitter</a>
            <a href="https://linkedin.com/in/prakyat" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors duration-300">LinkedIn</a>
            <a href="https://github.com/prakyats" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors duration-300">GitHub</a>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_10px_var(--accent)]" />
            <span className="opacity-70">Available for projects</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
