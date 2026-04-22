/**
 * Contact — Performance fixes:
 *  - whileHover scale on <motion.a>: kept (it's isolated, single element).
 *  - No other changes needed — this component's animations are correct.
 *    useInView once:true + staggered delays = paint once, never repaint.
 */
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";

const LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/prakyatshetty" },
  { label: "GitHub",   href: "https://github.com/prakyats" },
  { label: "Email",    href: "mailto:shettyprakyat15@gmail.com" },
];

const Contact = () => {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const fadeUp = (delay = 0): Variants => ({
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } },
  });

  return (
    <SectionWrapper id="contact" className="relative pt-32 pb-16 md:pt-48 md:pb-24 flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] md:w-[35vw] md:h-[35vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(22,90%,62%,0.06) 0%, transparent 70%)" }}
      />

      <div ref={ref} className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto w-full">

        <motion.span
          variants={fadeUp(0)} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="text-[10px] md:text-xs text-[hsl(var(--accent))] uppercase tracking-[0.35em] block mb-8 font-medium"
        >
          Let's Talk
        </motion.span>

        <motion.h2
          variants={fadeUp(0.1)} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight leading-[1.05] mb-6 text-white"
        >
          Let's build something
          <br />
          <span className="italic text-white/45">meaningful together.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp(0.18)} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="text-white/45 text-base md:text-lg mb-14 max-w-[400px] leading-relaxed"
        >
          Open to internship opportunities, collaborations, or just a good conversation about technology.
        </motion.p>

        <motion.a
          variants={fadeUp(0.26)} initial="hidden" animate={inView ? "visible" : "hidden"}
          href="mailto:shettyprakyat15@gmail.com"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center justify-center gap-3 rounded-full px-10 py-5 text-sm font-medium text-white overflow-hidden mb-12"
          style={{ background: "hsla(22,90%,62%,0.1)", border: "1px solid hsla(22,90%,62%,0.3)" }}
        >
          <span className="relative z-10">Say Hi →</span>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "hsla(22,90%,62%,0.15)" }}
          />
        </motion.a>

        <motion.div
          variants={fadeUp(0.35)} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="w-full"
        >
          <div className="hr-glow mb-8" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-white/35 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-6">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="animated-underline hover:text-white/75 transition-colors duration-300"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))] glow-dot animate-pulse" />
              <span>Available for Projects</span>
            </div>
          </div>
          <p className="mt-8 text-[10px] text-white/15 tracking-wider">
            © 2025 Prakyat Shetty · Designed & built with care
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
