import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";

const SKILLS = [
  { label: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { label: "Backend", items: ["Node.js", "Express", "Fastify", "REST APIs"] },
  { label: "Data", items: ["MySQL", "PostgreSQL", "MongoDB", "Supabase"] },
  { label: "Tools", items: ["Git", "Docker", "JWT Auth", "WebSockets"] },
];

const STATS = [
  { value: "3+", label: "Production Projects" },
  { value: "6+", label: "Technologies" },
  { value: "2027", label: "Graduating" },
];

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <SectionWrapper id="about" className="relative py-28 md:py-36 mt-[-6vh] md:mt-[-8vh] max-md:mt-[-40px]">
      <div className="max-w-[900px] mx-auto px-6">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Label */}
          <motion.p variants={fadeUp} className="text-[10px] md:text-xs text-[hsl(var(--accent))] tracking-[0.35em] uppercase mb-4 font-medium">
            About
          </motion.p>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.1] text-white mb-6 max-w-[640px]"
          >
            I'm Prakyat — I build
            <br />
            <span className="italic text-white/65">systems, not just interfaces.</span>
          </motion.h2>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="text-white/60 text-base md:text-lg leading-relaxed max-w-[560px] mb-12"
          >
            Computer Science student at DSCE, Bangalore (Graduating 2027).
            Focused on full-stack systems that prioritize clean architecture,
            real performance, and actual usage in the wild — not demo-ware.
          </motion.p>

          {/* Stats */}
          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6 mb-12 max-w-[480px]">
            {STATS.map((s) => (
              <div key={s.label} className="text-left">
                <p className="font-display text-3xl md:text-4xl text-white font-normal mb-1">{s.value}</p>
                <p className="text-[11px] text-white/40 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeUp} className="hr-glow mb-12" />

          {/* Skills grid */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {SKILLS.map((group) => (
              <div key={group.label}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3 font-medium">{group.label}</p>
                <ul className="space-y-2">
                  {group.items.map((skill) => (
                    <li key={skill} className="text-sm text-white/65 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[hsl(var(--accent))] opacity-60 shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default About;
