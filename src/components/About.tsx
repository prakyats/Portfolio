import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="relative py-28 md:py-36 mt-[-6vh] md:mt-[-8vh] max-md:mt-[-40px]">
      <div className="max-w-[720px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="transform-gpu will-change-transform text-left md:text-center"
        >
          {/* Label */}
          <p className="text-white/25 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2">
            About
          </p>

          {/* Heading */}
          <h2
            className="text-2xl md:text-3xl leading-tight text-white/90 font-medium tracking-tight mt-3 max-w-[600px] mx-auto"
            style={{ fontFamily: "Georgia, serif" }}
          >
            I’m Prakyat — I build systems, not just interfaces.
          </h2>

          {/* Body */}
          <div className="mt-4 space-y-4 text-white/70 text-sm md:text-base leading-relaxed max-w-[600px] mx-auto">
            <p>
              I’m a Computer Science student at DSCE, Bangalore (Graduating 2027). 
              Focused on building full-stack systems that prioritize performance and clean architecture.
            </p>
          </div>

          {/* Footer Line */}
          <p className="mt-4 text-white/50 text-xs md:text-sm">
            Actively looking for internship opportunities.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
