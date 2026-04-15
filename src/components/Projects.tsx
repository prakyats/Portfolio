import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import SectionWrapper from "./SectionWrapper";

const Projects = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-100px" });
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!gridRef.current) return;
    const { scrollLeft, clientWidth } = gridRef.current;
    setActiveIndex(Math.round(scrollLeft / clientWidth));
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <SectionWrapper id="work" className="py-24 md:py-48 bg-bg relative mt-12 md:mt-16">
      <div className="max-w-[1240px] mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mb-16 lg:mb-24 px-6"
        >
          <motion.span variants={headerVariants} className="text-[10px] md:text-xs text-[hsl(var(--accent))] uppercase tracking-[0.35em] block mb-4 font-medium">
            Selected Work
          </motion.span>
          <motion.h2 variants={headerVariants} className="font-display text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.1] text-white max-w-[560px] mb-4">
            Systems I've built to solve
            <br />
            <span className="italic text-white/60">real-world problems.</span>
          </motion.h2>
          <motion.p variants={headerVariants} className="text-sm md:text-base text-white/45 max-w-[480px] leading-relaxed">
            Focused on reliability, performance, and actual usage — not just demos.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar px-6 md:px-0 md:px-6 lg:px-6"
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              isFirst={i === 0}
              index={i}
              onHover={(slug) => setHoveredSlug(slug)}
              isDimmed={hoveredSlug !== null && hoveredSlug !== project.slug}
            />
          ))}
        </motion.div>

        {/* Mobile dots */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-8 px-6">
          {projects.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 rounded-full transition-all duration-400 ${i === activeIndex ? "w-8 bg-white" : "w-2 bg-white/20"}`}
            />
          ))}
          <span className="ml-2 text-[10px] uppercase tracking-widest text-white/20">Swipe</span>
        </div>

        {/* Footer note */}
        <div className="mt-24 pt-8 mx-6 flex items-center justify-center gap-3">
          <div className="hr-glow flex-1 max-w-[200px]" />
          <p className="text-xs text-white/30 uppercase tracking-[0.2em] font-medium whitespace-nowrap">
            More coming soon
          </p>
          <div className="hr-glow flex-1 max-w-[200px]" />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Projects;
