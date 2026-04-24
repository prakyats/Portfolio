import { motion, Variants } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const SKILLS = [
  { label: "Frontend",  items: ["React", "React Native", "TypeScript", "Tailwind CSS"], color: "bg-bauhaus-red",    textColor: "text-white" },
  { label: "Backend",   items: ["Node.js", "Express", "Fastify", "REST APIs"],          color: "bg-bauhaus-blue",   textColor: "text-white" },
  { label: "Data",      items: ["Firestore", "PostgreSQL", "MySQL", "MongoDB"],          color: "bg-bauhaus-yellow", textColor: "text-black" },
  { label: "Tools",     items: ["Firebase", "Expo", "Git", "WebSockets"],                color: "bg-white",          textColor: "text-black" },
];

const STATS = [
  { value: "4+",   label: "Projects Built" },
  { value: "10+",  label: "Technologies" },
  { value: "2027", label: "Graduating" },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const item: Variants = {
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const About = () => {
  return (
    <SectionWrapper id="about" className="bg-[#EAEAEA] py-24 border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          {/* Left Column */}
          <div>
            <motion.span variants={item} className="section-label">About Me</motion.span>
            <motion.h2 variants={item} className="text-display-large mb-10">
              SYSTEMS OVER<br />
              <span className="italic text-bauhaus-red">INTERFACES.</span>
            </motion.h2>

            <motion.div variants={item} className="space-y-4 mb-10">
              <p className="font-display font-bold text-xl leading-snug">
                Computer Science student at DSCE, Bangalore — graduating 2027.
              </p>
              <p className="text-base leading-relaxed text-black/65">
                I build full-stack systems that prioritize clean architecture,
                real performance, and actual usage in the wild. I believe form
                must follow function — and function must be flawless.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="grid grid-cols-3 border-4 border-black bg-white shadow-hard-md">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`p-2 md:p-6 ${i !== STATS.length - 1 ? "border-r-4 border-black" : ""}`}
                >
                  <p className="font-display font-black text-2xl md:text-5xl mb-1">{s.value}</p>
                  <p className="font-display font-bold text-[10px] uppercase tracking-widest opacity-50 leading-tight">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column — Skill Matrix */}
          <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {SKILLS.map((group) => (
              <motion.div
                key={group.label}
                whileHover={{ y: -6, x: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`border-[3px] sm:border-4 border-black p-4 sm:p-6 md:p-8 shadow-hard-sm hover:shadow-hard-lg transition-all duration-200 ${group.color} ${group.textColor} cursor-default`}
              >
                <div className="flex justify-between items-center sm:items-start mb-3 sm:mb-5">
                  <h3 className="font-display font-black text-base sm:text-xl uppercase tracking-tighter">{group.label}</h3>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border-2 border-current rounded-full opacity-60" />
                </div>
                {/* Mobile: horizontal chips | Desktop: vertical list */}
                <ul className="flex flex-wrap sm:block gap-1.5 sm:space-y-2.5">
                  {group.items.map((skill) => (
                    <motion.li
                      key={skill}
                      whileHover={{ x: 4 }}
                      className="font-display font-bold text-[10px] sm:text-sm flex items-center gap-1.5 sm:gap-2.5 bg-black/5 sm:bg-transparent px-2 py-1 sm:p-0 rounded-none border-[1px] border-current sm:border-0"
                    >
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-current shrink-0" />
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default About;
